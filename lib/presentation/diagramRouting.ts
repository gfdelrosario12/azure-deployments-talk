import type { DiagramData } from './types';

// ── geometry ──────────────────────────────────────────────────────────────────
// Diagrams are laid out from the BFS depth of every node. The number of columns
// per band is chosen so the finished drawing best fills the box it is given, which
// keeps every slide on the same composition: heading, summary, one diagram block
// that fills the middle, highlights.

const NW   = 160;
const NH   = 68;
const CGAP = 88;
const RGAP = 24;
const PAD  = 16;

export { NW, NH, CGAP, RGAP, PAD };

function bfsColumns(nodes: DiagramData['nodes'], edges: DiagramData['edges']) {
  const inDeg: Record<string, number> = {};
  nodes.forEach((n) => (inDeg[n.id] = 0));
  edges.forEach((e) => (inDeg[e.to] = (inDeg[e.to] ?? 0) + 1));

  const colOf: Record<string, number> = {};
  const queue = nodes.filter((n) => inDeg[n.id] === 0).map((n) => n.id);
  queue.forEach((id) => (colOf[id] = 0));
  const seen = new Set<string>(queue);
  let qi = 0;
  while (qi < queue.length) {
    const id = queue[qi++];
    edges.filter((e) => e.from === id).forEach((e) => {
      colOf[e.to] = Math.max(colOf[e.to] ?? 0, colOf[id] + 1);
      if (!seen.has(e.to)) { seen.add(e.to); queue.push(e.to); }
    });
  }
  nodes.forEach((n) => { if (colOf[n.id] === undefined) colOf[n.id] = 0; });
  return colOf;
}

/** Places the nodes on `numCols` columns, wrapped into at most two bands. */
function place(nodes: DiagramData['nodes'], edges: DiagramData['edges'], numCols: number) {
  const colOf = bfsColumns(nodes, edges);
  const numBfsCols = Math.max(...Object.values(colOf), 0) + 1;

  const colNodes: Record<number, string[]> = {};
  nodes.forEach((n) => { const c = colOf[n.id]; (colNodes[c] = colNodes[c] ?? []).push(n.id); });

  const stackH = (k: number) => k * NH + Math.max(0, k - 1) * RGAP;

  // Split the flow into a leading band and a trailing band, at most numCols wide.
  const head = Math.max(numCols, numBfsCols - numCols);
  const bands = [head, numBfsCols - head]
    .map((len, i) => Array.from({ length: Math.max(0, len) }, (_, j) => (i === 0 ? j : head + j)))
    .filter((b) => b.length > 0);

  const BAND_GAP = RGAP * 3;
  const bandH = bands.map((b) => Math.max(...b.map((c) => stackH((colNodes[c] ?? []).length))));

  const cx: Record<string, number> = {};
  const cy: Record<string, number> = {};
  let bandTop = 0;
  bands.forEach((band, bi) => {
    band.forEach((c, j) => {
      const ids = colNodes[c] ?? [];
      const top = bandTop + (bandH[bi] - stackH(ids.length)) / 2;
      ids.forEach((id, r) => {
        cx[id] = j * (NW + CGAP) + NW / 2;
        cy[id] = top + r * (NH + RGAP) + NH / 2;
      });
    });
    bandTop += bandH[bi] + BAND_GAP;
  });

  const totalW = numCols * NW + (numCols - 1) * CGAP;
  const totalH = bandH.reduce((sum, h) => sum + h, 0) + BAND_GAP * (bands.length - 1);

  // Backward edges arc over the top, so leave room for them.
  const extraTopPad = edges.some(
    (e) => cx[e.from] !== undefined && cx[e.to] !== undefined && cx[e.to] <= cx[e.from],
  ) ? NH + 16 : 0;

  return {
    cx, cy,
    padTop: extraTopPad,
    vw: totalW + PAD * 2,
    vh: totalH + PAD * 2 + extraTopPad,
  };
}

/** Picks the column count whose drawing covers the most of a `boxAspect` box. */
export function layout(nodes: DiagramData['nodes'], edges: DiagramData['edges'], boxAspect: number) {
  const numBfsCols = Math.max(...Object.values(bfsColumns(nodes, edges)), 0) + 1;

  let best = place(nodes, edges, numBfsCols);
  let bestFill = 0;
  for (let numCols = Math.max(1, Math.ceil(numBfsCols / 2)); numCols <= numBfsCols; numCols++) {
    const plan = place(nodes, edges, numCols);
    // Fraction of the box the scaled drawing covers.
    const scale = Math.min(1 / plan.vw, boxAspect / plan.vh);
    const fill = Math.min(1, plan.vw * scale) * Math.min(1, (plan.vh * scale) / boxAspect);
    if (fill > bestFill) { bestFill = fill; best = plan; }
  }
  return best;
}

// ── edge routing ──────────────────────────────────────────────────────────────
// Every connection in every diagram speaks the same arrow language: right-angled
// runs joined by rounded elbows, one stroke weight, one arrowhead, one clearance
// from the card faces.
//
// A route is picked from a small set of candidates, tried in the order a reader
// expects them:
//   1. straight across the gap, when the two cards already share a line
//   2. an elbow through the corridor beside or below the source card
//   3. a detour around the outside of the drawing, for a target that sits behind
// The first candidate that does not pass through another card wins, so a flow can
// never cross a box. Parallel edges leaving or entering the same card are fanned
// onto their own channel and their own mouth, so they never overlap either.

const CORNER  = 8;    // elbow radius
const OUT     = 18;   // clearance of a detour around the outside
const CHAN    = 12;   // narrowest usable corridor
const SPREAD  = 14;   // gap between the channels of parallel edges
const FAN     = 7;    // gap between the mouths of parallel edges
const ALIGN   = 6;    // offset still counted as "on the same line"
const CUSHION = 5;    // space kept between a run and a card it does not connect to

export { CORNER, OUT, CHAN, SPREAD, FAN, ALIGN, CUSHION };

/** Edge label font size, in the diagram's user units. The renderer must use
 *  this same value, and labelSpot derives its clearance box from it. */
export const EDGE_FS = 8.5;

export type Pt = { x: number; y: number };
export type Box = { x: number; y: number; w: number; h: number };
export type Bounds = { x0: number; y0: number; x1: number; y1: number };
export type Route = { pts: Pt[]; tier: number; cost: number; col?: number; row?: number };

/**
 * True when the run p→q passes through the box.
 *
 * Liang–Barsky: the four sides give `num + den·t <= 0`, so a negative `den` raises
 * the entry parameter `t0` and a positive one lowers the exit parameter `t1`. The
 * run hits the box when that interval survives, i.e. `t0 <= t1`. Getting these two
 * branches the wrong way round silently reports "clear" for almost every box, so
 * the direction of each bound matters — `tests/diagramRouting.test.mjs` fuzzes this
 * against an independent reference.
 */
export function crosses(p: Pt, q: Pt, b: Box): boolean {
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  let t0 = 0;
  let t1 = 1;
  const sides: [number, number][] = [
    [p.x - b.x, -dx], [b.x + b.w - p.x, dx],
    [p.y - b.y, -dy], [b.y + b.h - p.y, dy],
  ];
  for (const [num, den] of sides) {
    if (den === 0) { if (num < 0) return false; continue; }
    const t = num / den;
    if (den < 0) { if (t > t0) t0 = t; }
    else { if (t < t1) t1 = t; }
  }
  return t0 <= t1;
}

export function routes(a: Box, b: Box, outSlot: number, outFan: number, inFan: number, bd: Bounds): Route[] {
  const ax = a.x + a.w / 2, ay = a.y + a.h / 2;
  const bx = b.x + b.w / 2, by = b.y + b.h / 2;
  const dx = bx - ax, dy = by - ay;
  const aL = a.x, aR = a.x + a.w, aT = a.y, aB = a.y + a.h;
  const bL = b.x, bR = b.x + b.w, bT = b.y, bB = b.y + b.h;
  const out: Route[] = [];
  // A straight run has no corridor to sit in, so it is shifted as one piece —
  // by the incoming fan where there is one, so arrowheads never stack.
  const flat = inFan !== 0 ? inFan : outFan;

  if (dx > 0 && Math.abs(dy) <= ALIGN) out.push({ tier: 0, cost: bL - aR, pts: [{ x: aR, y: ay + flat }, { x: bL, y: by + flat }] });
  if (dy > 0 && Math.abs(dx) <= ALIGN) out.push({ tier: 0, cost: bT - aB, pts: [{ x: ax + flat, y: aB }, { x: bx + flat, y: bT }] });

  // Elbow through the corridor beside the source, entered on the target's left face.
  const hGap = bL - aR;
  if (dx > 0 && hGap >= CHAN * 2) {
    const mid = (aR + bL) / 2;
    const lanes = outSlot === 0
      ? [mid, aR + CHAN, bL - CHAN]
      : [mid + outSlot, mid, mid - outSlot, aR + CHAN, bL - CHAN];
    lanes.forEach((chan, i) => out.push({
      tier: 1, cost: hGap + Math.abs(dy) + i / 10, col: mid,
      pts: [{ x: aR, y: ay + outFan }, { x: chan, y: ay + outFan }, { x: chan, y: by + inFan }, { x: bL, y: by + inFan }],
    }));
  }

  // Elbow through the corridor below the source, entered on the target's top face.
  const vGap = bT - aB;
  if (dy > 0 && vGap >= CHAN * 2) {
    const mid = (aB + bT) / 2;
    const lanes = outSlot === 0
      ? [mid, aB + CHAN, bT - CHAN]
      : [mid + outSlot, mid, mid - outSlot, aB + CHAN, bT - CHAN];
    lanes.forEach((chan, i) => out.push({
      tier: 1, cost: vGap + Math.abs(dx) + i / 10, row: chan,
      pts: [{ x: ax + outFan, y: aB }, { x: ax + outFan, y: chan }, { x: bx + inFan, y: chan }, { x: bx + inFan, y: bT }],
    }));
  }

  // Detours, for a target that is behind, above or below the source.
  const over  = Math.max(bd.y0, Math.min(aT, bT) - OUT);
  const under = Math.min(bd.y1, Math.max(aB, bB) + OUT);
  const wrapOver: Route = {
    tier: bT >= aB ? 3 : 2, cost: (aT - over) + (over - bT) + Math.abs(dx), row: over + 8,
    pts: [{ x: ax + outFan, y: aT }, { x: ax + outFan, y: over }, { x: bx + inFan, y: over }, { x: bx + inFan, y: bT }],
  };
  const wrapUnder: Route = {
    tier: bT >= aB ? 2 : 3, cost: (under - aB) + (under - bB) + Math.abs(dx), row: under - 8,
    pts: [{ x: ax + outFan, y: aB }, { x: ax + outFan, y: under }, { x: bx + inFan, y: under }, { x: bx + inFan, y: bB }],
  };
  const lx = Math.max(bd.x0, Math.min(aL, bR) - OUT);
  const rx = Math.min(bd.x1, Math.max(aR, bL) + OUT);
  const wrapLeft: Route = {
    tier: 4, cost: (aL - lx) + (bR - lx) + Math.abs(dy), col: lx - 8,
    pts: [{ x: aL, y: ay + outFan }, { x: lx, y: ay + outFan }, { x: lx, y: by + inFan }, { x: bR, y: by + inFan }],
  };
  const wrapRight: Route = {
    tier: 4, cost: (rx - aR) + (rx - bL) + Math.abs(dy), col: rx + 8,
    pts: [{ x: aR, y: ay + outFan }, { x: rx, y: ay + outFan }, { x: rx, y: by + inFan }, { x: bL, y: by + inFan }],
  };
  out.push(...(bT >= aB ? [wrapUnder, wrapOver] : [wrapOver, wrapUnder]), wrapLeft, wrapRight);
  return out;
}

/** The first candidate that clears every other card, else the preferred one. */
export function routeEdge(
  a: Box, b: Box, blockers: Box[],
  outSlot: number, outFan: number, inFan: number, bd: Bounds,
): Route {
  const ranked = routes(a, b, outSlot, outFan, inFan, bd).sort((p, q) => p.tier - q.tier || p.cost - q.cost);
  for (const r of ranked) {
    let blocked = false;
    for (let i = 0; i < r.pts.length - 1 && !blocked; i++) {
      for (const o of blockers) {
        if (crosses(r.pts[i], r.pts[i + 1], { x: o.x - CUSHION, y: o.y - CUSHION, w: o.w + CUSHION * 2, h: o.h + CUSHION * 2 })) { blocked = true; break; }
      }
    }
    if (!blocked) return r;
  }
  return ranked[0];
}

/**
 * Rounded right-angled polyline.
 *
 * Each corner becomes an arc whose centre is `from + to − corner`, which is what
 * makes it tangent to both runs. Of the two arcs joining `from` to `to`, that
 * centre is the one the sweep flag has to select; with y growing downwards, a
 * positive cross product `(in × out)` is the clockwise-on-screen case, which SVG
 * asks for with `sweep-flag = 1`.
 */
export function elbow(pts: Pt[]): string {
  const p: Pt[] = [pts[0]];
  for (const q of pts) {
    const last = p[p.length - 1];
    if (Math.abs(q.x - last.x) > 0.5 || Math.abs(q.y - last.y) > 0.5) p.push(q);
  }
  if (p.length < 2) return '';
  const f = (v: number) => Math.round(v * 100) / 100;
  let d = `M${f(p[0].x)},${f(p[0].y)}`;
  for (let i = 1; i < p.length - 1; i++) {
    const a = p[i - 1], c = p[i], b = p[i + 1];
    const inLen = Math.hypot(c.x - a.x, c.y - a.y);
    const outLen = Math.hypot(b.x - c.x, b.y - c.y);
    const r = Math.min(CORNER, inLen / 2, outLen / 2);
    if (r < 0.5) { d += ` L${f(c.x)},${f(c.y)}`; continue; }
    const from = { x: c.x - ((c.x - a.x) / inLen) * r, y: c.y - ((c.y - a.y) / inLen) * r };
    const to   = { x: c.x + ((b.x - c.x) / outLen) * r, y: c.y + ((b.y - c.y) / outLen) * r };
    const turn = (c.x - a.x) * (b.y - c.y) - (c.y - a.y) * (b.x - c.x);
    d += ` L${f(from.x)},${f(from.y)} A${f(r)},${f(r)} 0 0 ${turn > 0 ? 1 : 0} ${f(to.x)},${f(to.y)}`;
  }
  return `${d} L${f(p[p.length - 1].x)},${f(p[p.length - 1].y)}`;
}

/** Anchors a label in the middle of the run that has room for it. */
export function labelSpot(r: Route, cards: Box[], text: string): Pt {
  const seg: number[] = [];
  for (let i = 0; i < r.pts.length - 1; i++) seg.push(i);
  const run = (i: number) => Math.hypot(r.pts[i + 1].x - r.pts[i].x, r.pts[i + 1].y - r.pts[i].y);
  const flat = (i: number) => Math.abs(r.pts[i + 1].x - r.pts[i].x) >= Math.abs(r.pts[i + 1].y - r.pts[i].y);
  seg.sort((m, k) => run(k) - run(m));

  // The corridor the run travels through is the natural home for the label.
  const corridor = seg.find((i) => (flat(i) ? r.row : r.col) !== undefined);
  if (corridor !== undefined && corridor !== seg[0]) {
    seg.splice(seg.indexOf(corridor), 1);
    seg.unshift(corridor);
  }

  // Edge label metrics, derived from the one font size the renderer uses
  // (EDGE_FS). These used to be hardcoded for a 7.5px label; deriving them means
  // the clearance test keeps matching the text it is protecting.
  const CPX = EDGE_FS * 0.6; // monospace advance
  const half = EDGE_FS * 0.7;
  const hw = text.length * (CPX / 2) + 1;
  const free = (o: Pt) => {
    const lb = { x: o.x - hw, y: o.y - half, w: hw * 2, h: EDGE_FS + 2 };
    return !cards.some((c) => lb.x < c.x + c.w && c.x < lb.x + lb.w && lb.y < c.y + c.h && c.y < lb.y + lb.h);
  };
  let fallback: Pt | null = null;
  for (const i of seg) {
    const a = r.pts[i], b = r.pts[i + 1];
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const above = EDGE_FS * 1.4;
    const below = EDGE_FS * 1.5;
    const options = flat(i)
      ? [{ x: mx, y: r.row ?? my - above }, { x: mx, y: my + above },
         { x: mx, y: my - NH / 2 - above }, { x: mx, y: my + NH / 2 + below }]
      : [{ x: r.col ?? mx + 8, y: my + 3 }, { x: mx - hw - 4, y: my + 3 }, { x: mx + hw + 4, y: my + 3 }];
    for (const o of options) if (free(o)) return o;
    if (!fallback) fallback = options[0];
  }
  return fallback ?? r.pts[0];
}