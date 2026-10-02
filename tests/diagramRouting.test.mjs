// Regression tests for the diagram geometry: `crosses` is the predicate the whole
// router leans on (get its bounds backwards and every arrow silently passes
// through a card), and the elbow sweep flag decides whether a corner is a tangent
// fillet or a kinked arc on the wrong side of it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  NW, NH, PAD, SPREAD, FAN, CUSHION,
  crosses, routes, routeEdge, elbow, labelSpot, layout,
} from '../lib/presentation/diagramRouting.ts';

const BOUNDS = (vw, vh) => ({ x0: 6, y0: 6, x1: vw - 6, y1: vh - 6 });
const inflated = (b, by = CUSHION) => ({ x: b.x - by, y: b.y - by, w: b.w + by * 2, h: b.h + by * 2 });

/** Independent oracle: clip the run against the x and y slabs separately. */
function oracle(p, q, b) {
  const slab = (v0, v1, lo, hi) => {
    const d = v1 - v0;
    if (d === 0) return v0 >= lo && v0 <= hi ? [0, 1] : null;
    const t0 = (lo - v0) / d;
    const t1 = (hi - v0) / d;
    return t0 <= t1 ? [t0, t1] : [t1, t0];
  };
  const sx = slab(p.x, q.x, b.x, b.x + b.w);
  const sy = slab(p.y, q.y, b.y, b.y + b.h);
  if (!sx || !sy) return false;
  return Math.max(0, sx[0], sy[0]) <= Math.min(1, sx[1], sy[1]);
}

/** Deterministic PRNG so a failure is reproducible. */
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// ── crosses ───────────────────────────────────────────────────────────────────

test('crosses: reports a run that passes straight through a box', () => {
  // The case that the inverted bound assignment reported as "clear".
  assert.equal(
    crosses({ x: 0, y: 50 }, { x: 200, y: 50 }, { x: 40, y: 20, w: 100, h: 60 }),
    true,
  );
});

test('crosses: reports a run that stops short of, or misses, a box', () => {
  const b = { x: 40, y: 20, w: 100, h: 60 };
  assert.equal(crosses({ x: 0, y: 50 }, { x: 200, y: 50 }, { x: 300, y: 20, w: 10, h: 10 }), false);
  assert.equal(crosses({ x: 0, y: 5 },  { x: 200, y: 5 },  b), false);
  assert.equal(crosses({ x: 0, y: 200 }, { x: 200, y: 200 }, b), false);
  assert.equal(crosses({ x: 0, y: 50 }, { x: 30, y: 50 },  b), false);
});

test('crosses: handles a run lying exactly on a box edge', () => {
  const b = { x: 40, y: 20, w: 100, h: 60 };
  assert.equal(crosses({ x: 0, y: 20 }, { x: 200, y: 20 }, b), true);
  assert.equal(crosses({ x: 40, y: -50 }, { x: 40, y: 200 }, b), true);
  assert.equal(crosses({ x: 0, y: 19 }, { x: 200, y: 19 }, b), false);
});

test('crosses: handles a zero-length run', () => {
  const b = { x: 40, y: 20, w: 100, h: 60 };
  assert.equal(crosses({ x: 60, y: 40 }, { x: 60, y: 40 }, b), true);
  assert.equal(crosses({ x: 10, y: 10 }, { x: 10, y: 10 }, b), false);
});

test('crosses: agrees with an independent slab oracle over random cases', () => {
  const rand = rng(20261003);
  const point = () => ({ x: Math.floor(rand() * 400) - 100, y: Math.floor(rand() * 400) - 100 });
  let mismatches = 0;
  for (let i = 0; i < 100000; i++) {
    const p = point();
    const q = point();
    const b = { x: Math.floor(rand() * 200), y: Math.floor(rand() * 200), w: 20 + Math.floor(rand() * 150), h: 20 + Math.floor(rand() * 150) };
    if (crosses(p, q, b) !== oracle(p, q, b)) mismatches++;
  }
  assert.equal(mismatches, 0, `${mismatches} disagreements with the oracle`);
});

// ── elbow ─────────────────────────────────────────────────────────────────────

/**
 * The arc centre that makes a corner tangent to both of its runs is
 * `from + to - corner`. Returns the sweep flag that selects it.
 */
function filletSweep(from, to, corner) {
  const f = { x: from.x + to.x - corner.x, y: from.y + to.y - corner.y };
  const a0 = Math.atan2(from.y - f.y, from.x - f.x);
  const a1 = Math.atan2(to.y - f.y, to.x - f.x);
  let delta = (a1 - a0) % (2 * Math.PI);
  if (delta < 0) delta += 2 * Math.PI;
  return delta <= Math.PI ? 1 : 0;
}

const CORNERS = [
  { name: 'right then down',   a: { x: -60, y: 0 }, c: { x: 0, y: 0 },     b: { x: 0, y: 60 } },
  { name: 'right then up',     a: { x: -60, y: 0 }, c: { x: 0, y: 0 },     b: { x: 0, y: -60 } },
  { name: 'down then right',   a: { x: 0, y: -60 }, c: { x: 0, y: 0 },     b: { x: 60, y: 0 } },
  { name: 'down then left',    a: { x: 0, y: -60 }, c: { x: 0, y: 0 },     b: { x: -60, y: 0 } },
  { name: 'left then up',      a: { x: 60, y: 0 },  c: { x: 0, y: 0 },     b: { x: 0, y: -60 } },
  { name: 'left then down',    a: { x: 60, y: 0 },  c: { x: 0, y: 0 },     b: { x: 0, y: 60 } },
  { name: 'up then right',     a: { x: 0, y: 60 },  c: { x: 0, y: 0 },     b: { x: 60, y: 0 } },
  { name: 'up then left',      a: { x: 0, y: 60 },  c: { x: 0, y: 0 },     b: { x: -60, y: 0 } },
];

test('elbow: the sweep flag selects the tangent fillet for every turn direction', () => {
  for (const { name, a, c, b } of CORNERS) {
    const r = 8;
    const inLen = Math.hypot(c.x - a.x, c.y - a.y);
    const outLen = Math.hypot(b.x - c.x, b.y - c.y);
    const from = { x: c.x - ((c.x - a.x) / inLen) * r, y: c.y - ((c.y - a.y) / inLen) * r };
    const to = { x: c.x + ((b.x - c.x) / outLen) * r, y: c.y + ((b.y - c.y) / outLen) * r };
    const arc = elbow([a, c, b]).match(/A[\d.]+,[\d.]+ [\d.]+ [\d.]+ (\d)/);
    const sweep = arc ? Number(arc[1]) : NaN;
    assert.equal(sweep, filletSweep(from, to, c), `${name}: emitted sweep ${sweep} is not the fillet`);
  }
});

test('elbow: every run is axis-aligned and finite', () => {
  const d = elbow([{ x: 0, y: 0 }, { x: 40, y: 0 }, { x: 40, y: 40 }, { x: 80, y: 40 }]);
  assert.doesNotMatch(d, /NaN|undefined|Infinity/);
  for (const m of d.matchAll(/L(-?[\d.]+),(-?[\d.]+)/g)) {
    assert.ok(Number.isFinite(Number(m[1])) && Number.isFinite(Number(m[2])));
  }
  // Start and end survive untouched.
  assert.ok(d.startsWith('M0,0'));
  assert.ok(d.endsWith('L80,40'));
});

test('elbow: collapses repeated and zero-length points', () => {
  // A route that never moves has nothing to draw.
  assert.equal(elbow([{ x: 10, y: 10 }, { x: 10, y: 10 }]), '');
  assert.equal(elbow([{ x: 10, y: 10 }]), '');
  assert.doesNotMatch(elbow([{ x: 10, y: 10 }, { x: 10, y: 10 }, { x: 40, y: 10 }]), /A/);
});

// ── routing ───────────────────────────────────────────────────────────────────

const DIAGRAMS = {
  'single row': {
    nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
    edges: [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }],
  },
  'fan out then stack': {
    nodes: [{ id: 'src' }, { id: 'up' }, { id: 'mid' }, { id: 'down' }],
    edges: [{ from: 'src', to: 'up' }, { from: 'src', to: 'mid' }, { from: 'src', to: 'down' }],
  },
  'fan in': {
    nodes: [{ id: 'a' }, { id: 'b' }, { id: 'join' }],
    edges: [{ from: 'a', to: 'join' }, { from: 'b', to: 'join' }],
  },
  'feedback across bands': {
    nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'back' }],
    edges: [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'c', to: 'back' }],
  },
  'long chain': {
    nodes: Array.from({ length: 8 }, (_, i) => ({ id: `n${i}` })),
    edges: Array.from({ length: 7 }, (_, i) => ({ from: `n${i}`, to: `n${i + 1}` })),
  },
};

/** Lays a diagram out the way the component does, for every reachable column count. */
function placed(diagram) {
  const out = [];
  for (let aspect = 0.3; aspect <= 0.8001; aspect += 0.05) {
    const plan = layout(diagram.nodes, diagram.edges, aspect);
    const boxes = {};
    diagram.nodes.forEach((n) => {
      boxes[n.id] = {
        x: PAD + plan.cx[n.id] - NW / 2,
        y: PAD + plan.padTop + plan.cy[n.id] - NH / 2,
        w: NW,
        h: NH,
      };
    });
    out.push({ plan, boxes });
  }
  return out;
}

function fans(edges) {
  const outTotal = {};
  const inTotal = {};
  edges.forEach((e) => {
    outTotal[e.from] = (outTotal[e.from] ?? 0) + 1;
    inTotal[e.to] = (inTotal[e.to] ?? 0) + 1;
  });
  const outSeen = {};
  const inSeen = {};
  const map = {};
  edges.forEach((e) => {
    const key = `${e.from}>${e.to}`;
    const oi = outSeen[e.from] ?? 0;
    const ii = inSeen[e.to] ?? 0;
    outSeen[e.from] = oi + 1;
    inSeen[e.to] = ii + 1;
    const on = outTotal[e.from];
    const inn = inTotal[e.to];
    map[key] = {
      slot: on > 1 ? (oi - (on - 1) / 2) * SPREAD : 0,
      fan: on > 1 ? (oi - (on - 1) / 2) * FAN : 0,
      inFan: inn > 1 ? (ii - (inn - 1) / 2) * FAN : 0,
    };
  });
  return map;
}

const onEdge = (p, b) => p.x === b.x || p.x === b.x + b.w || p.y === b.y || p.y === b.y + b.h;

for (const [name, diagram] of Object.entries(DIAGRAMS)) {
  test(`routing (${name}): attaches to both card faces and clears every other card`, () => {
    const f = fans(diagram.edges);
    for (const { plan, boxes } of placed(diagram)) {
      const bounds = BOUNDS(plan.vw, plan.vh);
      for (const e of diagram.edges) {
        const a = boxes[e.from];
        const b = boxes[e.to];
        const fan = f[`${e.from}>${e.to}`];
        const blockers = diagram.nodes.filter((n) => n.id !== e.from && n.id !== e.to).map((n) => boxes[n.id]);
        const route = routeEdge(a, b, blockers, fan.slot, fan.fan, fan.inFan, bounds);

        assert.ok(onEdge(route.pts[0], a), `${e.from}->${e.to}: starts off the ${e.from} face`);
        assert.ok(onEdge(route.pts.at(-1), b), `${e.from}->${e.to}: ends off the ${e.to} face`);

        for (let i = 0; i < route.pts.length - 1; i++) {
          for (const o of blockers) {
            assert.equal(
              crosses(route.pts[i], route.pts[i + 1], inflated(o)),
              false,
              `${e.from}->${e.to}: run ${i} passes through ${JSON.stringify(o)}`,
            );
          }
          const p = route.pts[i];
          const q = route.pts[i + 1];
          assert.ok(
            p.x >= bounds.x0 && p.x <= bounds.x1 && p.y >= bounds.y0 && p.y <= bounds.y1,
            `${e.from}->${e.to}: run ${i} leaves the drawing`,
          );
          assert.ok(p.x === q.x || p.y === q.y, `${e.from}->${e.to}: run ${i} is not axis-aligned`);
        }
      }
    }
  });
}

test('routing: parallel edges never share a lane or a mouth', () => {
  const diagram = DIAGRAMS['fan out then stack'];
  const f = fans(diagram.edges);
  for (const { boxes } of placed(diagram)) {
    const seen = new Map();
    for (const e of diagram.edges) {
      const fan = f[`${e.from}>${e.to}`];
      const route = routeEdge(boxes[e.from], boxes[e.to], [], fan.slot, fan.fan, fan.inFan, { x0: 0, y0: 0, x1: 2000, y1: 2000 });
      const vertical = route.pts.filter((p, i) => i > 0 && p.x === route.pts[i - 1].x).map((p) => p.x);
      const key = JSON.stringify([route.pts[0], vertical, route.pts.at(-1)]);
      assert.equal(seen.has(key), false, `two edges from ${e.from} took the same lane`);
      seen.set(key, true);
    }
  }
});

test('routing: a preferred route is used when nothing is in the way', () => {
  const a = { x: 0, y: 0, w: NW, h: NH };
  const b = { x: NW + 88, y: 0, w: NW, h: NH };
  const route = routeEdge(a, b, [], 0, 0, 0, BOUNDS(688, 192));
  assert.equal(route.tier, 0);
  assert.deepEqual(route.pts, [{ x: NW, y: NH / 2 }, { x: NW + 88, y: NH / 2 }]);
});

test('routes: every candidate stays inside the drawing and starts and ends on a face', () => {
  const a = { x: PAD, y: PAD, w: NW, h: NH };
  const b = { x: PAD, y: PAD + 260, w: NW, h: NH };
  const bd = BOUNDS(688, 416);
  for (const r of routes(a, b, 0, 0, 0, bd)) {
    assert.ok(onEdge(r.pts[0], a));
    assert.ok(onEdge(r.pts.at(-1), b));
    for (const p of r.pts) {
      assert.ok(p.x >= bd.x0 && p.x <= bd.x1, `x ${p.x} outside`);
      assert.ok(p.y >= bd.y0 && p.y <= bd.y1, `y ${p.y} outside`);
    }
    assert.ok(Number.isFinite(r.cost), 'cost is not finite');
  }
});

// ── labels ────────────────────────────────────────────────────────────────────

test('labelSpot: keeps a short label clear of every card', () => {
  const cards = [
    { x: 0, y: 0, w: NW, h: NH },
    { x: NW + 88, y: 0, w: NW, h: NH },
  ];
  const route = routeEdge(cards[0], cards[1], [], 0, 0, 0, BOUNDS(688, 192));
  const spot = labelSpot(route, cards, 'invokes');
  const half = 'invokes'.length * 2.25 + 1;
  const box = { x: spot.x - half, y: spot.y - 6.5, w: half * 2, h: 9 };
  for (const c of cards) {
    assert.ok(
      !(box.x < c.x + c.w && c.x < box.x + box.w && box.y < c.y + c.h && c.y < box.y + box.h),
      'label landed on a card',
    );
  }
});

test('labelSpot: always returns a finite point, even for an unplaceable label', () => {
  const cards = [
    { x: 0, y: 0, w: NW, h: NH },
    { x: NW + 88, y: 0, w: NW, h: NH },
  ];
  const route = routeEdge(cards[0], cards[1], [], 0, 0, 0, BOUNDS(688, 192));
  for (const text of ['x', 'a very long label that cannot possibly fit in this corridor at all']) {
    const spot = labelSpot(route, cards, text);
    assert.ok(Number.isFinite(spot.x) && Number.isFinite(spot.y));
  }
});