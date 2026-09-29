'use client';

import React from 'react';
import { TextVisualSlideData } from '@/lib/presentation/types';

export function TextVisualSlide({ slide }: { slide: TextVisualSlideData }) {
  return (
    <div className="flex flex-col justify-center min-h-[70vh] px-6 sm:px-12 max-w-6xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-8 border-b border-zinc-800 pb-4 flex items-baseline justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase block mb-1">
            {slide.section}
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Text Blocks */}
        <div className="lg:col-span-7 space-y-6">
          {slide.contentBlocks.map((block, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm space-y-3"
            >
              {block.heading && (
                <h3 className="text-lg font-semibold text-zinc-200 font-mono flex items-center gap-2">
                  <span className="text-cyan-400 text-sm">#</span> {block.heading}
                </h3>
              )}
              <div className="space-y-2">
                {block.body.map((line, lIdx) => (
                  <p key={lIdx} className="text-zinc-300 text-base leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              {block.highlight && (
                <div className="mt-2 pt-2 border-t border-zinc-800/60 font-mono text-xs text-amber-400/90">
                  ⚡ {block.highlight}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Visual Cards */}
        {slide.visualCards && slide.visualCards.length > 0 && (
          <div className="lg:col-span-5 space-y-4">
            {slide.visualCards.map((card, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border border-zinc-800 bg-zinc-950/80 shadow-md space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-zinc-100">
                    {card.title}
                  </span>
                  {card.tag && (
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-300 bg-cyan-950/40">
                      {card.tag}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {card.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:border-zinc-500 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
