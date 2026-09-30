'use client';

import React from 'react';
import { ComparisonSlideData } from '@/lib/presentation/types';

export function ComparisonSlide({ slide }: { slide: ComparisonSlideData }) {
  return (
    <div className="px-6 sm:px-12 py-5 max-w-7xl mx-auto w-full animate-fadeIn overflow-hidden">

      {/* Header */}
      <div className="mb-5 border-b border-zinc-700/60 pb-3 flex items-baseline justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">{slide.title}</h2>
          <span className="mt-1.5 inline-block font-mono text-xs tracking-widest uppercase text-cyan-400/70 border border-cyan-500/25 bg-cyan-950/30 px-2.5 py-0.5 rounded">
            {slide.section}
          </span>
        </div>
        {slide.motifBadge && (
          <span className="hidden sm:inline-block font-mono text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
            {slide.motifBadge}
          </span>
        )}
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left — neutral/muted side */}
        <div className="p-5 rounded-xl border border-zinc-600/60 bg-zinc-900/60">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-700/60">
            <div>
              <h3 className="text-base font-bold text-zinc-100 font-mono">{slide.left.title}</h3>
              {slide.left.subtitle && <p className="text-xs font-mono text-zinc-400 mt-0.5">{slide.left.subtitle}</p>}
            </div>
            {slide.left.tag && (
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-zinc-800 border border-zinc-600 text-zinc-300">{slide.left.tag}</span>
            )}
          </div>
          <ul className="space-y-2">
            {slide.left.points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-200">
                <span className="font-mono text-zinc-400 shrink-0 mt-0.5">→</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — primary/highlighted side */}
        <div className="p-5 rounded-xl border border-cyan-500/40 bg-cyan-950/15 shadow-[0_0_24px_rgba(6,182,212,0.07)]">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-cyan-500/30">
            <div>
              <h3 className="text-base font-bold text-cyan-200 font-mono">{slide.right.title}</h3>
              {slide.right.subtitle && <p className="text-xs font-mono text-cyan-300/80 mt-0.5">{slide.right.subtitle}</p>}
            </div>
            {slide.right.tag && (
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-cyan-950/70 border border-cyan-400/50 text-cyan-200">{slide.right.tag}</span>
            )}
          </div>
          <ul className="space-y-2">
            {slide.right.points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-100">
                <span className="font-mono text-cyan-400 shrink-0 mt-0.5">✓</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {slide.takeaway && (
        <div className="mt-4 px-4 py-3 rounded-lg bg-amber-950/30 border border-amber-500/40 text-center font-mono text-sm text-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.08)]">
          <span className="text-amber-400 font-bold mr-2">TAKEAWAY:</span>
          {slide.takeaway}
        </div>
      )}

      <div className="mt-4 w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
    </div>
  );
}
