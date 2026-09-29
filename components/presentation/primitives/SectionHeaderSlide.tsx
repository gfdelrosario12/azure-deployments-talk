'use client';

import React from 'react';
import { SectionHeaderSlideData } from '@/lib/presentation/types';

export function SectionHeaderSlide({ slide }: { slide: SectionHeaderSlideData }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center animate-fadeIn">
      <div className="max-w-3xl space-y-6">
        {slide.sectionNumber && (
          <div className="font-mono text-sm tracking-widest text-emerald-400 uppercase">
            {`// SECTION ${slide.sectionNumber}`}
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-mono">
          {slide.title}
        </h1>

        {slide.description && (
          <p className="text-xl text-zinc-400 font-sans font-light max-w-xl mx-auto pt-4 leading-relaxed">
            {slide.description}
          </p>
        )}

        {slide.motifBadge && (
          <div className="pt-6 inline-flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span className="text-zinc-600">STATE:</span>
            <span className="text-zinc-400 border-b border-zinc-800 pb-0.5">{slide.motifBadge}</span>
          </div>
        )}
      </div>
    </div>
  );
}
