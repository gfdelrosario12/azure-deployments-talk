'use client';

import React from 'react';
import Image from 'next/image';
import { ArchitectureSlideData } from '@/lib/presentation/types';
import { DiagramEngine } from '../DiagramEngine';

export function ArchitectureDiagramSlide({ slide }: { slide: ArchitectureSlideData }) {
  return (
    <div className="h-full flex flex-col px-10 lg:px-14 py-5 max-w-[1400px] mx-auto w-full animate-fadeIn">

      {/* Header */}
      <div className="shrink-0 mb-2 border-b border-zinc-700/60 pb-2 flex items-center justify-between gap-6">
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

      {/* Summary — tight, no excess margin */}
      <p className="shrink-0 text-sub text-zinc-300 mb-3 leading-[1.35] max-w-5xl">{slide.summary}</p>

      {/* Diagram — fills remaining height */}
      <div className="flex-1 min-h-0 flex flex-col gap-3">
        <div className="flex-1 min-h-0">
          <DiagramEngine diagram={slide.diagram} />
        </div>

        {slide.secondaryDiagram && (
          <div className="flex-1 min-h-0 flex flex-col pt-2 border-t border-zinc-700/60">
            <div className="shrink-0 font-mono text-xs text-zinc-400 uppercase mb-2">// Containerized Variation</div>
            <div className="flex-1 min-h-0">
              <DiagramEngine diagram={slide.secondaryDiagram} />
            </div>
          </div>
        )}
      </div>

      {/* Highlights */}
      {slide.highlights && slide.highlights.length > 0 && (
        <div className="shrink-0 mt-3 flex flex-wrap gap-2">
          {slide.highlights.map((h, idx) => {
            const text = typeof h === 'string' ? h : h.text;
            const logo = typeof h === 'string' ? undefined : h.logo;
            return (
              <div key={idx} className="px-3 py-1.5 rounded bg-zinc-900/80 border border-purple-500/30 text-sub font-mono text-zinc-100 flex items-center gap-2 shadow-[0_0_8px_rgba(168,85,247,0.08)]">
                <span className="text-purple-400 shrink-0">❖</span>
                {logo && (
                  <div className="relative w-4 h-4 shrink-0">
                    <Image src={logo} alt="" fill className="object-contain" sizes="16px" />
                  </div>
                )}
                {text}
              </div>
            );
          })}
        </div>
      )}

      <div className="shrink-0 mt-3 w-20 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
    </div>
  );
}
