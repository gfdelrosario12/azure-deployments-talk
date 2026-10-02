'use client';

import React from 'react';
import { CaseStudySlideData } from '@/lib/presentation/types';

export function CaseStudySlide({ slide }: { slide: CaseStudySlideData }) {
  return (
    <div className="h-full flex flex-col justify-center px-10 lg:px-16 py-6 max-w-5xl mx-auto w-full animate-fadeIn overflow-hidden">

      <div className="shrink-0 mb-3 border-b border-zinc-800 pb-2">
        <h2 className="text-4xl font-bold text-white tracking-tight font-mono leading-snug">{slide.scenarioTitle}</h2>
      </div>

      <div className="flex flex-col gap-2.5">

        <div className="px-4 py-3 rounded-lg border border-red-500/20 bg-red-950/10">
          <div className="font-mono text-xs text-red-400 uppercase mb-1.5 font-bold tracking-wider">Problem Statement</div>
          <p className="text-zinc-200 text-[1.1rem] leading-[1.35]">{slide.problemStatement}</p>
        </div>

        <div className="px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900/60">
          <div className="font-mono text-xs text-cyan-400 uppercase mb-2 font-bold tracking-wider">Solution Approach</div>
          <ul className="flex flex-col gap-0">
            {slide.solutionItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-zinc-300 text-[1.1rem] leading-[1.35] py-1.5 border-b border-zinc-800/60 last:border-0">
                <span className="font-mono text-cyan-400 select-none shrink-0 mt-px">▶</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 py-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
          <div className="font-mono text-xs text-emerald-400 uppercase mb-1.5 font-bold tracking-wider">Outcome</div>
          <p className="text-emerald-200 font-mono text-[1.1rem] leading-[1.35]">{slide.outcome}</p>
        </div>
      </div>

      <div className="mt-3 w-24 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </div>
  );
}
