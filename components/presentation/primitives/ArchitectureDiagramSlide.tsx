'use client';

import React from 'react';
import { ArchitectureSlideData } from '@/lib/presentation/types';
import { DiagramEngine } from '../DiagramEngine';

export function ArchitectureDiagramSlide({ slide }: { slide: ArchitectureSlideData }) {
  return (
    <div className="flex flex-col justify-center min-h-[70vh] px-6 sm:px-12 max-w-6xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-6 border-b border-zinc-800 pb-4 flex items-baseline justify-between">
        <div>
          <span className="font-mono text-xs text-purple-400 tracking-wider uppercase block mb-1">
            {slide.section} {'// ARCHITECTURE'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
            {slide.title}
          </h2>
        </div>
        {slide.motifBadge && (
          <span className="hidden sm:inline-block font-mono text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            {slide.motifBadge}
          </span>
        )}
      </div>

      <p className="text-lg text-zinc-300 mb-8 max-w-3xl leading-relaxed">
        {slide.summary}
      </p>

      {/* Primary Diagram */}
      <div className="mb-6">
        <DiagramEngine diagram={slide.diagram} />
      </div>

      {/* Secondary / Variant Diagram if present */}
      {slide.secondaryDiagram && (
        <div className="mt-4 pt-4 border-t border-zinc-800/80">
          <div className="font-mono text-xs text-zinc-400 uppercase mb-3">
            {'// Containerized Variation'}
          </div>
          <DiagramEngine diagram={slide.secondaryDiagram} />
        </div>
      )}

      {/* Architecture Highlights / Key takeaways */}
      {slide.highlights && slide.highlights.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {slide.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2"
            >
              <span className="text-purple-400">❖</span>
              {highlight}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
