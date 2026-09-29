'use client';

import React from 'react';
import { ComparisonSlideData } from '@/lib/presentation/types';

export function ComparisonSlide({ slide }: { slide: ComparisonSlideData }) {
  return (
    <div className="flex flex-col justify-center min-h-[70vh] px-6 sm:px-12 max-w-6xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-8 border-b border-zinc-800 pb-4 flex items-baseline justify-between">
        <div>
          <span className="font-mono text-xs text-amber-400 tracking-wider uppercase block mb-1">
            {slide.section} {'// COMPARISON'}
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

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left Column */}
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white font-mono">{slide.left.title}</h3>
                {slide.left.subtitle && (
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">{slide.left.subtitle}</p>
                )}
              </div>
              {slide.left.tag && (
                <span className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                  {slide.left.tag}
                </span>
              )}
            </div>

            <ul className="space-y-3">
              {slide.left.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="font-mono text-zinc-500 mt-0.5 select-none">→</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-6 rounded-xl border border-cyan-500/30 bg-cyan-950/10 backdrop-blur flex flex-col justify-between shadow-[0_0_20px_rgba(6,182,212,0.05)]">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-cyan-500/20 pb-3">
              <div>
                <h3 className="text-xl font-bold text-cyan-200 font-mono">{slide.right.title}</h3>
                {slide.right.subtitle && (
                  <p className="text-xs font-mono text-cyan-400/80 mt-0.5">{slide.right.subtitle}</p>
                )}
              </div>
              {slide.right.tag && (
                <span className="px-2.5 py-1 text-xs font-mono rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                  {slide.right.tag}
                </span>
              )}
            </div>

            <ul className="space-y-3">
              {slide.right.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-200">
                  <span className="font-mono text-cyan-400 mt-0.5 select-none">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Takeaway / Summary footer */}
      {slide.takeaway && (
        <div className="mt-8 p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-center font-mono text-sm text-zinc-300">
          <span className="text-amber-400 font-bold mr-2">TAKEAWAY:</span>
          {slide.takeaway}
        </div>
      )}
    </div>
  );
}
