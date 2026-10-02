'use client';

import React, { useState } from 'react';
import { QuestionRevealSlideData } from '@/lib/presentation/types';

export function QuestionRevealSlide({ slide }: { slide: QuestionRevealSlideData }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="h-full flex flex-col justify-center px-10 lg:px-16 py-6 max-w-5xl mx-auto w-full animate-fadeIn overflow-hidden">

      <div className="shrink-0 mb-4 border-b border-zinc-800 pb-3">
        {/* text-4xl, not text-5xl: the question is a 240-270 character paragraph,
            not a title, and at 48px it consumed most of the slide box, leaving the
            revealed card no room to grow. The root is justify-center +
            overflow-hidden, so the card's border was sliced at both edges. 36px
            matches every other slide's title. */}
        <h2 className="text-4xl font-bold text-white tracking-tight font-mono leading-snug">{slide.question}</h2>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {slide.options.map((opt) => (
          <div
            key={opt.id}
            className="flex items-center justify-between px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-200 font-mono text-sub leading-snug"
          >
            <span>{opt.label}</span>
            {opt.count && (
              <span className="text-sm px-3 py-1 rounded bg-zinc-800 text-emerald-400 font-mono ml-3 shrink-0">{opt.count}</span>
            )}
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col items-center">
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="px-8 py-3 rounded-lg border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 font-mono text-base hover:bg-emerald-900/40 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            [ REVEAL INSIGHT ]
          </button>
        ) : (
          <div className="w-full px-5 py-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-center animate-fadeIn">
            {slide.revealedAnswer && (
              <div className="font-mono text-3xl font-bold text-emerald-300 mb-2">{slide.revealedAnswer}</div>
            )}
            {slide.explanation && (
              <p className="text-sub text-zinc-300 max-w-2xl mx-auto leading-[1.35]">{slide.explanation}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 w-24 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />
    </div>
  );
}
