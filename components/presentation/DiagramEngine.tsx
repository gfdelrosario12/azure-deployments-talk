'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DiagramData } from '@/lib/presentation/types';
import {
  NW, NH, PAD, SPREAD, FAN, EDGE_FS, layout, routeEdge, elbow, labelSpot,
  type Box, type Bounds, type Pt,
} from '@/lib/presentation/diagramRouting';

// The geometry, card placement and edge routing live in
// lib/presentation/diagramRouting.ts so they can be unit tested; this file renders
// the result.

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

// ── component ─────────────────────────────────────────────────────────────────
/** Aspect ratio assumed until the real box has been measured. */
const DEFAULT_ASPECT = 0.47;

export function DiagramEngine({ diagram }: { diagram: DiagramData }) {
  const { nodes, edges } = diagram;

  const HPAD = 10;
  const textW = NW - HPAD * 2;

  // Node text, +10% over the original scale. LABEL_CPX/SUB_CPX and the line
  // steps below are the wrap and stack metrics that must track these two --
  // the node clip path is NH tall, so growing one without the others
  // silently truncates multi-line labels.
  const LABEL_FS  = 11;
  const LABEL_CPX = 6.6;
  const SUB_FS    = 8.8;
  const SUB_CPX   = 5.28;
  const TYPE_FS   = 7;
  const ICON_SIZE = 16;

  // The diagram block fills the space the slide gives it; the drawing is then
  // scaled to fit that box and centred inside it.
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxAspect, setBoxAspect] = useState(DEFAULT_ASPECT);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) setBoxAspect(height / width);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { cx, cy, vw, vh, padTop } = useMemo(() => layout(nodes, edges, boxAspect), [nodes, edges, boxAspect]);

  const ox = PAD;
  const oy = PAD + padTop; // shift nodes down to make room for arcs above

  // Card rectangles in drawing space — the router works on these.
  const cards = useMemo(() => {
    const m: Record<string, Box> = {};
    nodes.forEach((n) => {
      m[n.id] = { x: ox + cx[n.id] - NW / 2, y: oy + cy[n.id] - NH / 2, w: NW, h: NH };
    });
    return m;
  }, [nodes, cx, cy, ox, oy]);

  // Fanning: the channel and the mouth each parallel edge gets, so arrows that
  // share a card never overlap — not on the way out, not on the way in.
  const fans = useMemo(() => {
    const outTotal: Record<string, number> = {};
    const inTotal: Record<string, number> = {};
    edges.forEach((e) => {
      outTotal[e.from] = (outTotal[e.from] ?? 0) + 1;
      inTotal[e.to] = (inTotal[e.to] ?? 0) + 1;
    });
    const outSeen: Record<string, number> = {};
    const inSeen: Record<string, number> = {};
    const map: Record<string, { slot: number; fan: number; inFan: number }> = {};
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
  }, [edges]);

  const cardList = useMemo(() => Object.values(cards), [cards]);

  // Routed once, then painted in two passes so a label is never drawn under an
  // arrow that belongs to a neighbouring connection.
  const routed = useMemo(() => {
    const bounds: Bounds = { x0: 6, y0: 6, x1: vw - 6, y1: vh - 6 };
    return edges.map((edge, i) => {
      const a = cards[edge.from];
      const b = cards[edge.to];
      if (!a || !b) return null;
      const fan = fans[`${edge.from}>${edge.to}`] ?? { slot: 0, fan: 0, inFan: 0 };
      const blockers = nodes.filter((n) => n.id !== edge.from && n.id !== edge.to).map((n) => cards[n.id]);
      const route = routeEdge(a, b, blockers, fan.slot, fan.fan, fan.inFan, bounds);
      return {
        key: i,
        d: elbow(route.pts),
        text: edge.label,
        spot: edge.label ? labelSpot(route, cardList, edge.label) : null,
      };
    }).filter(Boolean) as { key: number; d: string; text?: string; spot: Pt | null }[];
  }, [edges, nodes, cards, fans, cardList, vw, vh]);

  return (
    <div
      ref={boxRef}
      className="w-full h-full bg-zinc-950/90 border border-zinc-800 rounded-xl relative overflow-hidden shadow-xl"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '14px 14px' }}
      />
      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="arr" markerWidth="9" markerHeight="7" refX="8.4" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0 0,9 3.5,0 7" fill="#71717a" />
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

        {/* ── edges: runs first, then their labels on top ── */}
        {routed.map((e) => (
          <path
            key={e.key}
            d={e.d}
            fill="none"
            stroke="#52525b"
            strokeWidth="1.5"
            strokeLinecap="round"
            markerEnd="url(#arr)"
          />
        ))}

        {/* ── edge labels ── */}
        {routed.map((e) => e.spot && (
          <text
            key={`l-${e.key}`}
            x={e.spot.x}
            y={e.spot.y}
            textAnchor="middle"
            fontSize={EDGE_FS}
            fontFamily="monospace"
            fill="#a1a1aa"
            style={{ paintOrder: 'stroke', stroke: '#09090b', strokeWidth: 3 }}
          >
            {e.text}
          </text>
        ))}

        {/* ── nodes ── */}
        {nodes.map((node) => {
          const nx = ox + cx[node.id] - NW / 2;
          const ny = oy + cy[node.id] - NH / 2;
          const ncx = ox + cx[node.id];
          const c = col(node.type);

          const labelLines = wrapText(node.label, textW, LABEL_CPX);
          const subLines   = node.sublabel ? wrapText(node.sublabel, textW, SUB_CPX) : [];

          const labelH   = labelLines.length * (LABEL_FS + 3.3);
          const subH     = subLines.length   * (SUB_FS   + 2.2);
          const iconH    = node.icon ? ICON_SIZE + 4 : 0;
          const innerH   = NH - 16;
          const contentH = labelH + (subLines.length > 0 ? 4 + subH : 0) + iconH;
          const labelStartY = ny + 16 + (innerH - contentH) / 2 + LABEL_FS + iconH;

          return (
            <g key={node.id} clipPath={`url(#clip-${node.id})`}>
              <rect x={nx} y={ny} width={NW} height={NH} rx="7" fill={c.bg} stroke={c.border} strokeWidth="1.5" strokeOpacity="0.7" />
              {!node.hideType && (
                <text x={ncx} y={ny + 11} textAnchor="middle" fontSize={TYPE_FS} fontFamily="monospace" fill={c.type} letterSpacing="1">
                  {(node.type ?? 'node').toUpperCase()}
                </text>
              )}
              {node.icon && (
                <g transform={`translate(${ncx - ICON_SIZE / 2}, ${labelStartY - iconH})`}>
                  <rect x={-2} y={-2} width={ICON_SIZE + 4} height={ICON_SIZE + 4} rx={3} fill="#ffffff" fillOpacity="0.92" />
                  <image href={node.icon.src} x={0} y={0} width={ICON_SIZE} height={ICON_SIZE} preserveAspectRatio="xMidYMid meet" />
                </g>
              )}
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
