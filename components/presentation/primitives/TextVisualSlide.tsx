'use client';

import React from 'react';
import Image from 'next/image';
import { TextVisualSlideData } from '@/lib/presentation/types';

export function TextVisualSlide({ slide }: { slide: TextVisualSlideData }) {
  const hasImage = !!slide.image;
  const hasCards = !!(slide.visualCards && slide.visualCards.length > 0);

  const textColSpan = hasImage ? 'lg:col-span-5' : hasCards ? 'lg:col-span-7' : 'lg:col-span-12';
  const cardsColSpan = hasImage ? 'lg:col-span-3' : 'lg:col-span-5';

  return (
    <div className="px-6 sm:px-12 py-5 max-w-7xl mx-auto w-full animate-fadeIn overflow-hidden">

      {/* Header */}
      <div className="mb-5 border-b border-zinc-700/60 pb-3 flex items-baseline justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">{slide.title}</h2>
          <span className="mt-1.5 inline-block font-mono text-xs tracking-widest uppercase text-cyan-400/70 border border-cyan-500/25 bg-cyan-950/30 px-2.5 py-0.5 rounded">
            {slide.section}
          </span>
        </div>
        {slide.motifBadge && (
          <span className="hidden sm:inline-block font-mono text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
            {slide.motifBadge}
          </span>
        )}
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Image column */}
        {hasImage && slide.image && (
          <div className="lg:col-span-4 flex flex-col items-center gap-3">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-950/40">
              <Image src={slide.image.src} alt={slide.image.alt} fill className="object-cover object-top" sizes="192px" priority />
            </div>
            {slide.image.caption && (
              <span className="font-mono text-sm text-zinc-200 text-center leading-snug">{slide.image.caption}</span>
            )}
            {slide.affiliations && slide.affiliations.length > 0 && (
              <div className="w-full flex flex-col gap-2 mt-1">
                {slide.affiliations.map((aff, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-700/70 bg-zinc-900/70">
                    <div className="relative w-7 h-7 rounded overflow-hidden shrink-0 bg-white">
                      <Image src={aff.src} alt={aff.alt} fill className="object-contain p-0.5" sizes="28px" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-sm text-zinc-100 truncate">{aff.alt}</span>
                      {aff.label && <span className="font-mono text-[10px] text-zinc-400">{aff.label}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Text blocks */}
        <div className={`${textColSpan} space-y-4`}>
          {slide.contentBlocks.map((block, idx) => (
            <div key={idx}>
            <div
              className={
                block.accent
                  ? 'p-5 rounded-xl border border-cyan-500/40 bg-cyan-950/20 space-y-2.5 shadow-[0_0_25px_rgba(6,182,212,0.08)]'
                  : 'p-4 rounded-lg border border-zinc-700/60 bg-zinc-900/50 space-y-2'
              }
            >
              {block.heading && (
                <h3
                  className={
                    block.accent
                      ? 'text-lg font-bold text-white font-mono flex items-center gap-2'
                      : 'text-base font-semibold text-white font-mono flex items-center gap-2'
                  }
                >
                  <span className="text-cyan-400">#</span> {block.heading}
                </h3>
              )}
              <div className="space-y-1.5">
                {block.body.map((line, lIdx) => (
                  block.bulleted ? (
                    <div key={lIdx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono shrink-0 mt-0.5 select-none">→</span>
                      <p className={block.accent ? 'text-zinc-100 text-sm leading-relaxed' : 'text-zinc-200 text-sm leading-relaxed'}>{line}</p>
                    </div>
                  ) : (
                    <p
                      key={lIdx}
                      className={block.accent ? 'text-zinc-100 text-sm leading-relaxed' : 'text-zinc-200 text-sm leading-relaxed'}
                    >
                      {line}
                    </p>
                  )
                ))}
              </div>
              {block.highlight && (
                <div
                  className={
                    block.accent
                      ? 'pt-2.5 border-t border-cyan-500/25 font-mono text-xs text-amber-300'
                      : 'pt-2 border-t border-zinc-700/50 font-mono text-xs text-amber-300'
                  }
                >
                  ⚡ {block.highlight}
                </div>
              )}
            </div>
          </div>
          ))}
        </div>

        {/* Visual cards */}
        {hasCards && (
          <div className={`${cardsColSpan} space-y-3`}>
            {slide.visualCards!.map((card, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-zinc-700/60 bg-zinc-950/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-white">{card.title}</span>
                  {card.tag && (
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded border border-cyan-400/40 text-cyan-300 bg-cyan-950/50">
                      {card.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {card.items.map((item, iIdx) => (
                    <span key={iIdx} className="px-2 py-0.5 text-xs font-mono rounded bg-zinc-800 border border-zinc-600/80 text-zinc-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
    </div>
  );
}
