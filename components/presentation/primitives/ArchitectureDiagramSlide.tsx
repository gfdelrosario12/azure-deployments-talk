'use client';

import React from 'react';
import { ArchitectureSlideData } from '@/lib/presentation/types';
import { DiagramEngine } from '../DiagramEngine';

export function ArchitectureDiagramSlide({ slide }: { slide: ArchitectureSlideData }) {
  return (
    <div className="px-8 sm:px-14 py-6 max-w-7xl mx-auto w-full animate-fadeIn overflow-hidden">

      {/* Header */}
      <div className="mb-5 border-b border-zinc-700/60 pb-4 flex items-baseline justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">{slide.title}</h2>
          <span className="mt-2 inline-block font-mono text-xs tracking-widest uppercase text-cyan-400/70 border border-cyan-500/25 bg-cyan-950/30 px-2.5 py-0.5 rounded">
            {slide.section}
          </span>
        </div>
        {slide.motifBadge && (
          <span className="hidden sm:inline-block font-mono text-sm px-3 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
            {slide.motifBadge}
          </span>
        )}
      </div>

      <p className="text-base text-zinc-200 mb-5 leading-relaxed max-w-4xl">{slide.summary}</p>

      <DiagramEngine diagram={slide.diagram} />

      {slide.secondaryDiagram && (
        <div className="mt-5 pt-4 border-t border-zinc-700/60">
          <div className="font-mono text-xs text-zinc-400 uppercase mb-2">// Containerized Variation</div>
          <DiagramEngine diagram={slide.secondaryDiagram} />
        </div>
      )}

      {slide.highlights && slide.highlights.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {slide.highlights.map((h, idx) => (
            <div key={idx} className="px-3 py-2 rounded bg-zinc-900/80 border border-purple-500/30 text-sm font-mono text-zinc-100 flex items-center gap-2 shadow-[0_0_8px_rgba(168,85,247,0.08)]">
              <span className="text-purple-400">❖</span>
              {h}
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 w-20 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
    </div>
  );
}
