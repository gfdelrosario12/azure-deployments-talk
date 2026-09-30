'use client';

import React, { useState } from 'react';
import { QuestionRevealSlideData } from '@/lib/presentation/types';

export function QuestionRevealSlide({ slide }: { slide: QuestionRevealSlideData }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col justify-center min-h-[70vh] px-6 sm:px-12 max-w-5xl mx-auto animate-fadeIn">
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
          {slide.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {slide.options.map((opt) => (
          <div
            key={opt.id}
            className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-zinc-200 font-mono text-base hover:border-emerald-500/40 transition-colors"
          >
            <span>{opt.label}</span>
            {opt.count && (
              <span className="text-xs px-2.5 py-1 rounded bg-zinc-800 text-emerald-400 font-mono">
                {opt.count}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col items-center">
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="px-6 py-2.5 rounded-lg border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 font-mono text-sm hover:bg-emerald-900/40 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            [ REVEAL INSIGHT ]
          </button>
        ) : (
          <div className="w-full p-6 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-center animate-fadeIn">
            {slide.revealedAnswer && (
              <div className="font-mono text-xl font-bold text-emerald-300 mb-2">
                {slide.revealedAnswer}
              </div>
            )}
            {slide.explanation && (
              <p className="text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                {slide.explanation}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="mt-6 w-24 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />
    </div>
  );
}
