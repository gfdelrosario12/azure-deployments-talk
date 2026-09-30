'use client';

import React from 'react';
import { ClosingTakeawaySlideData } from '@/lib/presentation/types';

export function ClosingTakeawaySlide({ slide }: { slide: ClosingTakeawaySlideData }) {
  return (
    <div className="flex flex-col justify-center min-h-[70vh] px-6 sm:px-12 max-w-5xl mx-auto animate-fadeIn">
      <div className="mb-8 border-b border-zinc-800 pb-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
          {slide.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 my-6 max-w-3xl mx-auto w-full">
        {slide.takeaways.map((takeaway, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur space-y-2"
          >
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase">
              {`// 0${idx + 1}`}
            </div>
            <h3 className="text-lg font-bold text-white font-mono">{takeaway.title}</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{takeaway.description}</p>
          </div>
        ))}
      </div>

      {slide.callToAction && (
        <div className="mt-6 text-center">
          <div className="inline-block px-6 py-3 rounded-lg border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 font-mono text-sm shadow-[0_0_20px_rgba(6,182,212,0.1)]">
            🚀 {slide.callToAction}
          </div>
        </div>
      )}

      {/* Bottom accent line */}
      <div className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
    </div>
  );
}
