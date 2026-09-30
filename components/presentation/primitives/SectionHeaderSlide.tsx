'use client';

import React from 'react';
import { SectionHeaderSlideData } from '@/lib/presentation/types';

export function SectionHeaderSlide({ slide }: { slide: SectionHeaderSlideData }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-10 text-center animate-fadeIn overflow-hidden">
      <div className="max-w-3xl space-y-5">
        {slide.sectionNumber && (
          <div className="font-mono text-sm tracking-widest text-cyan-400/70 uppercase">
            {`// SECTION ${slide.sectionNumber}`}
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-mono">
          {slide.title}
        </h1>
        {slide.description && (
          <p className="text-lg text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            {slide.description}
          </p>
        )}
        {slide.motifBadge && (
          <div className="pt-4 inline-flex items-center gap-2 font-mono text-xs border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 px-4 py-2 rounded-full shadow-[0_0_16px_rgba(6,182,212,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {slide.motifBadge}
          </div>
        )}
      </div>
    </div>
  );
}
