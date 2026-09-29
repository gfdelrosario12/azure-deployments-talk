'use client';

import React from 'react';
import { CaseStudySlideData } from '@/lib/presentation/types';

export function CaseStudySlide({ slide }: { slide: CaseStudySlideData }) {
  return (
    <div className="flex flex-col justify-center min-h-[70vh] px-6 sm:px-12 max-w-5xl mx-auto animate-fadeIn">
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <span className="font-mono text-xs text-indigo-400 tracking-wider uppercase block mb-1">
          {slide.section} {'// CASE STUDY'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
          {slide.scenarioTitle}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="p-5 rounded-lg border border-red-500/20 bg-red-950/10">
          <div className="font-mono text-xs text-red-400 uppercase mb-1">PROBLEM STATEMENT</div>
          <p className="text-zinc-200 text-base">{slide.problemStatement}</p>
        </div>

        <div className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/60">
          <div className="font-mono text-xs text-cyan-400 uppercase mb-2">SOLUTION APPROACH</div>
          <ul className="space-y-2">
            {slide.solutionItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                <span className="font-mono text-cyan-400 select-none">▶</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
          <div className="font-mono text-xs text-emerald-400 uppercase mb-1">OUTCOME</div>
          <p className="text-emerald-200 font-mono text-sm">{slide.outcome}</p>
        </div>
      </div>
    </div>
  );
}
