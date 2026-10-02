'use client';

import React from 'react';
import { ClosingTakeawaySlideData } from '@/lib/presentation/types';

export function ClosingTakeawaySlide({ slide }: { slide: ClosingTakeawaySlideData }) {
  return (
    <div className="h-full flex flex-col justify-center px-10 lg:px-16 py-6 max-w-5xl mx-auto w-full animate-fadeIn overflow-hidden">

      <div className="shrink-0 mb-4 border-b border-zinc-800 pb-2 text-center">
        <h2 className="text-5xl font-bold text-white tracking-tight font-mono">{slide.title}</h2>
        {slide.motifBadge && (
          <span className="mt-1.5 inline-block font-mono text-sm tracking-widest uppercase text-cyan-400/70 border border-cyan-500/25 bg-cyan-950/30 px-3 py-0.5 rounded">
            {slide.motifBadge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {slide.takeaways.map((takeaway, idx) => (
          <div key={idx} className="px-5 py-3.5 rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase shrink-0">{`// 0${idx + 1}`}</span>
              <h3 className="text-2xl font-bold text-white font-mono leading-tight">{takeaway.title}</h3>
            </div>
            <p className="text-[1.1rem] text-zinc-300 leading-[1.35] pl-10">{takeaway.description}</p>
          </div>
        ))}
      </div>

      {slide.callToAction && (
        <div className="shrink-0 mt-4 text-center">
          <div className="inline-block px-7 py-2.5 rounded-lg border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 font-mono text-lg shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            🚀 {slide.callToAction}
          </div>
        </div>
      )}

      <div className="mt-3 w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
    </div>
  );
}
