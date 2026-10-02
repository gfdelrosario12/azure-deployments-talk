'use client';

import React from 'react';
import { SectionHeaderSlideData } from '@/lib/presentation/types';

export function SectionHeaderSlide({ slide }: { slide: SectionHeaderSlideData }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-10 py-6 text-center animate-fadeIn">
      <div className="max-w-4xl">
        {slide.sectionNumber && (
          <div className="font-mono text-base tracking-widest text-cyan-400/70 uppercase mb-1">
            {`// SECTION ${slide.sectionNumber}`}
          </div>
        )}
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-white font-mono leading-tight">
          {slide.title}
        </h1>
        {slide.description && (
          <p className="text-2xl text-zinc-300 font-light max-w-2xl mx-auto leading-snug mt-4">
            {slide.description}
          </p>
        )}
        {slide.motifBadge && (
          <div className="mt-4 inline-flex items-center gap-2 font-mono text-sm border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 px-5 py-2 rounded-full shadow-[0_0_16px_rgba(6,182,212,0.12)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {slide.motifBadge}
          </div>
        )}
      </div>
    </div>
  );
}
