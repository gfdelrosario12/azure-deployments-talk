'use client';

import React from 'react';
import { DiagramData } from '@/lib/presentation/types';

// ── colours ──────────────────────────────────────────────────────────────────
const C = {
  compute: { border: '#06b6d4', bg: 'rgba(6,182,212,0.12)',  text: '#67e8f9', type: '#22d3ee' },
  source:  { border: '#a855f7', bg: 'rgba(168,85,247,0.12)', text: '#d8b4fe', type: '#c084fc' },
  network: { border: '#f59e0b', bg: 'rgba(245,158,11,0.12)', text: '#fcd34d', type: '#fbbf24' },
  storage: { border: '#f43f5e', bg: 'rgba(244,63,94,0.12)',  text: '#fda4af', type: '#fb7185' },
  user:    { border: '#10b981', bg: 'rgba(16,185,129,0.12)', text: '#6ee7b7', type: '#34d399' },
  badge:   { border: '#71717a', bg: 'rgba(113,113,122,0.12)', text: '#e4e4e7', type: '#a1a1aa' },
} as const;

type NodeType = keyof typeof C;
function col(type: string | undefined) { return C[(type as NodeType)] ?? C.badge; }

// ── text wrapping ─────────────────────────────────────────────────────────────
function wrapText(text: string, maxPx: number, charPx: number): string[] {
  const maxChars = Math.max(1, Math.floor(maxPx / charPx));
  const words = text.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const candidate = cur ? cur + ' ' + w : w;
    if (candidate.length <= maxChars) { cur = candidate; }
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}

// ── layout ────────────────────────────────────────────────────────────────────
const MAX_COLS = 4;

function layout(
  nodes: DiagramData['nodes'],
  edges: DiagramData['edges'],
  NW: number, NH: number, CGAP: number, RGAP: number,
) {
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

  const numBfsCols = Math.max(...Object.values(colOf)) + 1;
  const effectiveColOf = { ...colOf };
  const effectiveRowOf: Record<string, number> = {};
  let numCols: number;

  if (numBfsCols > MAX_COLS) {
    const half = Math.ceil(numBfsCols / 2);
    nodes.forEach((n) => {
      const bc = colOf[n.id];
      effectiveColOf[n.id] = bc < half ? bc : bc - half;
      effectiveRowOf[n.id] = bc < half ? 0 : 1;
    });
    numCols = half;
  } else {
    const colGroups: Record<number, string[]> = {};
    nodes.forEach((n) => { const c = colOf[n.id]; (colGroups[c] = colGroups[c] ?? []).push(n.id); });
    Object.values(colGroups).forEach((ids) => ids.forEach((id, i) => (effectiveRowOf[id] = i)));
    numCols = numBfsCols;
  }

  const cx: Record<string, number> = {};
  const cy: Record<string, number> = {};

  if (numBfsCols > MAX_COLS) {
    const BAND_GAP = RGAP * 3;
    nodes.forEach((n) => {
      cx[n.id] = effectiveColOf[n.id] * (NW + CGAP) + NW / 2;
      cy[n.id] = effectiveRowOf[n.id] * (NH + BAND_GAP) + NH / 2;
    });
  } else {
    const colGroups: Record<number, string[]> = {};
    nodes.forEach((n) => { const c = effectiveColOf[n.id]; (colGroups[c] = colGroups[c] ?? []).push(n.id); });
    const maxRows = Math.max(...Object.values(effectiveRowOf), 0) + 1;
    const totalH = maxRows * NH + (maxRows - 1) * RGAP;
    nodes.forEach((n) => {
      const c = effectiveColOf[n.id], r = effectiveRowOf[n.id];
      const stackSize = colGroups[c].length;
      const stackH = stackSize * NH + (stackSize - 1) * RGAP;
      const topOffset = (totalH - stackH) / 2;
      cx[n.id] = c * (NW + CGAP) + NW / 2;
      cy[n.id] = topOffset + r * (NH + RGAP) + NH / 2;
    });
  }

  const totalW = numCols * NW + (numCols - 1) * CGAP;
  const totalH = Math.max(...Object.values(cy), 0) + NH / 2;
  return { cx, cy, totalW, totalH };
}

// ── edge routing ──────────────────────────────────────────────────────────────
// Returns an SVG path `d` string and a label anchor point {lx, ly}.
// Strategy:
//   - Determine exit/entry faces based on relative position of node centres.
//   - Forward (left→right): exit right face, enter left face → cubic bezier.
//   - Backward (right→left): exit top face, arc over the top → orthogonal U-turn.
//   - Same column (top→bottom): exit bottom, enter top → straight vertical.
//   - Same row (left→right adjacent): exit right, enter left → straight horizontal.
//   - Diagonal (different row AND column): exit right/left, enter left/right → bezier elbow.

function routeEdge(
  x1: number, y1: number,  // source centre
  x2: number, y2: number,  // target centre
  NW: number, NH: number,
  edgeIndex: number,        // for stagger offset among parallel edges
  totalEdgesFromSource: number,
): { d: string; lx: number; ly: number } {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  // Stagger offset so parallel edges from same source don't overlap
  const stagger = totalEdgesFromSource > 1
    ? (edgeIndex - (totalEdgesFromSource - 1) / 2) * 10
    : 0;

  // ── Same row (horizontal) ──────────────────────────────────────────────────
  if (absDy < 4) {
    if (dx > 0) {
      // forward horizontal
      const ex1 = x1 + NW / 2, ex2 = x2 - NW / 2;
      const sy = y1 + stagger;
      const d = `M${ex1},${sy} L${ex2},${sy}`;
      return { d, lx: (ex1 + ex2) / 2, ly: sy - 7 };
    } else {
      // backward horizontal — route over the top
      const ex1 = x1 - NW / 2, ex2 = x2 + NW / 2;
      const topY = Math.min(y1, y2) - NH * 0.8 - Math.abs(stagger);
      const d = `M${ex1},${y1} C${ex1 - 20},${topY} ${ex2 + 20},${topY} ${ex2},${y2}`;
      return { d, lx: (ex1 + ex2) / 2, ly: topY - 7 };
    }
  }

  // ── Same column (vertical) ─────────────────────────────────────────────────
  if (absDx < 4) {
    if (dy > 0) {
      const ey1 = y1 + NH / 2, ey2 = y2 - NH / 2;
      const sx = x1 + stagger;
      const d = `M${sx},${ey1} L${sx},${ey2}`;
      return { d, lx: sx + 8, ly: (ey1 + ey2) / 2 };
    } else {
      // upward same column — route to the right
      const ey1 = y1 - NH / 2, ey2 = y2 + NH / 2;
      const rightX = x1 + NW / 2 + 24 + Math.abs(stagger);
      const d = `M${x1},${ey1} C${rightX},${ey1} ${rightX},${ey2} ${x2},${ey2}`;
      return { d, lx: rightX + 6, ly: (ey1 + ey2) / 2 };
    }
  }

  // ── Forward diagonal (target is to the right) ─────────────────────────────
  if (dx > 0) {
    const ex1 = x1 + NW / 2;
    const ex2 = x2 - NW / 2;
    const mx = (ex1 + ex2) / 2;
    // Exit right face at a y offset based on stagger
    const sy = y1 + stagger;
    const ty = y2;
    const d = `M${ex1},${sy} C${mx},${sy} ${mx},${ty} ${ex2},${ty}`;
    return { d, lx: mx, ly: (sy + ty) / 2 - 6 };
  }

  // ── Backward diagonal (target is to the left) ─────────────────────────────
  // Route over the top: exit top of source, arc left, enter top of target
  const topClearance = NH * 1.0 + Math.abs(stagger) * 2;
  const topY = Math.min(y1, y2) - topClearance;
  const ex1 = x1 - NW / 2;
  const ex2 = x2 + NW / 2;
  const d = `M${ex1},${y1} C${ex1 - 30},${topY} ${ex2 + 30},${topY} ${ex2},${y2}`;
  return { d, lx: (x1 + x2) / 2, ly: topY - 7 };
}

// ── component ─────────────────────────────────────────────────────────────────
export function DiagramEngine({ diagram }: { diagram: DiagramData }) {
  const { nodes, edges } = diagram;

  const NW   = 160;
  const NH   = 68;
  const CGAP = 88;
  const RGAP = 24;
  const HPAD = 10;
  const textW = NW - HPAD * 2;

  const LABEL_FS  = 10;
  const LABEL_CPX = 6.0;
  const SUB_FS    = 8;
  const SUB_CPX   = 4.8;
  const TYPE_FS   = 6.5;

  const { cx, cy, totalW, totalH } = layout(nodes, edges, NW, NH, CGAP, RGAP);

  // Count outgoing edges per source node for stagger calculation
  const outCount: Record<string, number> = {};
  const outIndex: Record<string, number> = {};
  edges.forEach((e) => { outCount[e.from] = (outCount[e.from] ?? 0) + 1; });
  const tempIdx: Record<string, number> = {};
  edges.forEach((e) => {
    tempIdx[e.from] = tempIdx[e.from] ?? 0;
    outIndex[`${e.from}->${e.to}`] = tempIdx[e.from]++;
  });

  // Extra vertical padding for backward edges that arc over the top
  const extraTopPad = edges.some((e) => {
    if (!cx[e.from] || !cx[e.to]) return false;
    return cx[e.to] <= cx[e.from]; // backward or same-column-up
  }) ? NH + 16 : 0;

  const PAD = 16;
  const vw = totalW + PAD * 2;
  const vh = totalH + PAD * 2 + extraTopPad;
  const ox = PAD;
  const oy = PAD + extraTopPad; // shift nodes down to make room for arcs above

  const minHeightPx = NH + PAD * 2 + 40;

  return (
    <div
      className="w-full bg-zinc-950/90 border border-zinc-800 rounded-xl relative overflow-hidden shadow-xl"
      style={{ minHeight: minHeightPx }}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '14px 14px' }}
      />
      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        width="100%"
        style={{ display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0,7 2.5,0 5" fill="#71717a" />
          </marker>
          {nodes.map((node) => (
            <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
              <rect
                x={ox + cx[node.id] - NW / 2 + 2}
                y={oy + cy[node.id] - NH / 2 + 2}
                width={NW - 4}
                height={NH - 4}
                rx="5"
              />
            </clipPath>
          ))}
        </defs>

        {/* ── edges ── */}
        {edges.map((edge, i) => {
          if (cx[edge.from] === undefined || cx[edge.to] === undefined) return null;
          const x1 = ox + cx[edge.from], y1 = oy + cy[edge.from];
          const x2 = ox + cx[edge.to],   y2 = oy + cy[edge.to];
          const eIdx = outIndex[`${edge.from}->${edge.to}`] ?? 0;
          const eTotal = outCount[edge.from] ?? 1;
          const { d, lx, ly } = routeEdge(x1, y1, x2, y2, NW, NH, eIdx, eTotal);

          return (
            <g key={i}>
              <path d={d} fill="none" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arr)" />
              {edge.label && (
                <text x={lx} y={ly} textAnchor="middle" fontSize={7.5} fontFamily="monospace" fill="#a1a1aa"
                  style={{ paintOrder: 'stroke', stroke: '#09090b', strokeWidth: 3 }}>
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* ── nodes ── */}
        {nodes.map((node) => {
          const nx = ox + cx[node.id] - NW / 2;
          const ny = oy + cy[node.id] - NH / 2;
          const ncx = ox + cx[node.id];
          const c = col(node.type);

          const labelLines = wrapText(node.label, textW, LABEL_CPX);
          const subLines   = node.sublabel ? wrapText(node.sublabel, textW, SUB_CPX) : [];

          const labelH   = labelLines.length * (LABEL_FS + 3);
          const subH     = subLines.length   * (SUB_FS   + 2);
          const innerH   = NH - 16;
          const contentH = labelH + (subLines.length > 0 ? 4 + subH : 0);
          const labelStartY = ny + 16 + (innerH - contentH) / 2 + LABEL_FS;

          return (
            <g key={node.id} clipPath={`url(#clip-${node.id})`}>
              <rect x={nx} y={ny} width={NW} height={NH} rx="7" fill={c.bg} stroke={c.border} strokeWidth="1.5" strokeOpacity="0.7" />
              <text x={ncx} y={ny + 11} textAnchor="middle" fontSize={TYPE_FS} fontFamily="monospace" fill={c.type} letterSpacing="1">
                {(node.type ?? 'node').toUpperCase()}
              </text>
              {labelLines.map((line, li) => (
                <text key={li} x={ncx} y={labelStartY + li * (LABEL_FS + 3)} textAnchor="middle" fontSize={LABEL_FS} fontFamily="monospace" fontWeight="700" fill={c.text}>
                  {line}
                </text>
              ))}
              {subLines.map((line, li) => (
                <text key={li} x={ncx} y={labelStartY + labelH + 4 + li * (SUB_FS + 2)} textAnchor="middle" fontSize={SUB_FS} fontFamily="monospace" fill="#a1a1aa">
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
