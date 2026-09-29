'use client';

import React from 'react';
import { StatementSlideData } from '@/lib/presentation/types';

export function StatementSlide({ slide }: { slide: StatementSlideData }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center animate-fadeIn">
      {slide.motifBadge && (
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 font-mono text-xs tracking-wider uppercase border border-cyan-500/40 bg-cyan-950/30 text-cyan-400 rounded shadow-[0_0_12px_rgba(6,182,212,0.15)]">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          {slide.motifBadge}
        </div>
      )}

      <div className="max-w-4xl space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight font-mono">
          <span className="text-zinc-500 mr-3 select-none">&gt;</span>
          <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            {slide.statement}
          </span>
        </h1>

        {slide.subtitle && (
          <p className="text-xl sm:text-2xl text-zinc-400 font-sans font-light max-w-2xl mx-auto pt-2 leading-relaxed">
            {slide.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
