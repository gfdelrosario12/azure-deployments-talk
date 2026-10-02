'use client';

import React from 'react';
import { ComparisonSlideData } from '@/lib/presentation/types';

export function ComparisonSlide({ slide }: { slide: ComparisonSlideData }) {
  return (
    <div className="h-full flex flex-col justify-center px-10 lg:px-14 py-6 max-w-[1400px] mx-auto w-full animate-fadeIn overflow-hidden">

      {/* Header */}
      <div className="shrink-0 mb-3 border-b border-zinc-700/60 pb-2 flex items-center justify-between gap-6">
        <div className="min-w-0">
          <h2 className="text-4xl font-bold text-white tracking-tight font-mono leading-tight">{slide.title}</h2>
          <span className="mt-1 inline-block font-mono text-xs tracking-widest uppercase text-cyan-400/70 border border-cyan-500/25 bg-cyan-950/30 px-2.5 py-0.5 rounded">
            {slide.section}
          </span>
        </div>
        {slide.motifBadge && (
          <span className="shrink-0 font-mono text-xs px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
            {slide.motifBadge}
          </span>
        )}
      </div>

      {/* Columns — natural height, side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* Left */}
        <div className="px-5 py-4 rounded-xl border border-zinc-600/60 bg-zinc-900/60">
          <div className="mb-3 pb-2 border-b border-zinc-700/60">
            <h3 className="text-2xl font-bold text-zinc-100 font-mono leading-tight">{slide.left.title}</h3>
            {slide.left.subtitle && <p className="text-sub font-mono text-zinc-400 mt-0.5">{slide.left.subtitle}</p>}
            {slide.left.tag && (
              <span className="mt-1.5 inline-block px-2.5 py-0.5 text-xs font-mono rounded bg-zinc-800 border border-zinc-600 text-zinc-300">{slide.left.tag}</span>
            )}
          </div>
          <ul className="flex flex-col gap-0">
            {slide.left.points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-zinc-200 text-sub leading-[1.35] py-1.5 border-b border-zinc-800/60 last:border-0">
                <span className="font-mono text-zinc-500 shrink-0 mt-px">→</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="px-5 py-4 rounded-xl border border-cyan-500/40 bg-cyan-950/15 shadow-[0_0_24px_rgba(6,182,212,0.07)]">
          <div className="mb-3 pb-2 border-b border-cyan-500/30">
            <h3 className="text-2xl font-bold text-cyan-200 font-mono leading-tight">{slide.right.title}</h3>
            {slide.right.subtitle && <p className="text-sub font-mono text-cyan-300/80 mt-0.5">{slide.right.subtitle}</p>}
            {slide.right.tag && (
              <span className="mt-1.5 inline-block px-2.5 py-0.5 text-xs font-mono rounded bg-cyan-950/70 border border-cyan-400/50 text-cyan-200">{slide.right.tag}</span>
            )}
          </div>
          <ul className="flex flex-col gap-0">
            {slide.right.points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-zinc-100 text-sub leading-[1.35] py-1.5 border-b border-cyan-900/40 last:border-0">
                <span className="font-mono text-cyan-400 shrink-0 mt-px">✓</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Takeaway */}
      {slide.takeaway && (
        <div className="mt-3 px-5 py-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-center font-mono text-sub text-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.08)]">
          <span className="text-amber-400 font-bold mr-2">TAKEAWAY:</span>
          {slide.takeaway}
        </div>
      )}

      <div className="mt-3 w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
    </div>
  );
}
