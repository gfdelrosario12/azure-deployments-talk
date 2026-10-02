'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TextVisualSlideData } from '@/lib/presentation/types';
import { SUBTEXT_LADDER_PX, nextSubtextStep } from '@/lib/presentation/typeScale';

export function TextVisualSlide({ slide }: { slide: TextVisualSlideData }) {
  const hasImage = !!slide.image;
  const hasCards = !!(slide.visualCards && slide.visualCards.length > 0);
  const blockCount = slide.contentBlocks.length;
  const useBlockGrid = !hasImage && blockCount >= 3;

  // The densest walkthrough slides are taller than a short window can show at
  // full subtext size, and this root clips with overflow-hidden, so the overflow
  // is cut off at both edges. Measure instead of guessing: start at the top of
  // the ladder and step down only while the slide is actually overflowing.
  const rootRef = useRef<HTMLDivElement>(null);
  const [subStep, setSubStep] = useState(0);
  const subPx = SUBTEXT_LADDER_PX[subStep];

  // Re-check after every step: each step re-renders, this measures the new
  // height, and the ladder saturates at the floor, so it settles rather than
  // looping.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setSubStep((s) => nextSubtextStep(s, el.scrollHeight > el.clientHeight));
  }, [subStep]);

  // The root is h-full, so its own box never changes size; only the window does.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSubStep((s) => nextSubtextStep(s, el.scrollHeight > el.clientHeight));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="h-full flex flex-col justify-center px-10 lg:px-14 py-6 max-w-[1400px] mx-auto w-full animate-fadeIn overflow-hidden">

      {/* Header */}
      <div className="shrink-0 mb-3 border-b border-zinc-700/60 pb-2 flex items-center justify-between gap-6">
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

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

        {/* Image column */}
        {hasImage && slide.image && (
          <div className="lg:col-span-3 flex flex-col items-center gap-2">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-950/40 shrink-0">
              <Image src={slide.image.src} alt={slide.image.alt} fill className="object-cover object-top" sizes="176px" priority />
            </div>
            {slide.image.caption && (
              <span className="font-mono text-cap text-zinc-200 text-center leading-snug">{slide.image.caption}</span>
            )}
            {slide.affiliations && slide.affiliations.length > 0 && (
              <div className="w-full flex flex-col gap-1.5">
                {slide.affiliations.map((aff, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-zinc-700/70 bg-zinc-900/70">
                    <div className="relative w-7 h-7 rounded overflow-hidden shrink-0 bg-white">
                      <Image src={aff.src} alt={aff.alt} fill className="object-contain p-0.5" sizes="28px" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-cap text-zinc-100 truncate">{aff.alt}</span>
                      {aff.label && <span className="font-mono text-xs text-zinc-400 truncate">{aff.label}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Text blocks — document sections */}
        <div className={`${hasImage ? 'lg:col-span-6' : hasCards ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col`}>
          <div className={useBlockGrid ? 'grid grid-cols-2 gap-x-4 gap-y-2' : 'flex flex-col gap-2'}>
            {slide.contentBlocks.map((block, idx) => (
              <div
                key={idx}
                className={
                  block.accent
                    ? 'px-4 py-3 rounded-lg border border-cyan-500/35 bg-cyan-950/20'
                    : 'px-4 py-3 rounded-lg border border-zinc-700/50 bg-zinc-900/40'
                }
              >
                {block.heading && (
                  <div className={`flex items-center gap-2 mb-2 ${block.accent ? 'border-b border-cyan-500/20 pb-1.5' : 'border-b border-zinc-700/40 pb-1.5'}`}>
                    <span className="text-cyan-400 font-mono text-sm shrink-0">#</span>
                    {block.icon && (
                      <span className="relative inline-block w-4 h-4 shrink-0 rounded bg-white/90 p-0.5">
                        <Image src={block.icon.src} alt={block.icon.alt} fill className="object-contain" sizes="16px" />
                      </span>
                    )}
                    <h3 className={`font-mono font-bold ${block.accent ? 'text-white text-xl' : 'text-white text-lg'}`}>
                      {block.heading}
                    </h3>
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  {block.body.map((line, lIdx) =>
                    block.bulleted ? (
                      <div key={lIdx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono shrink-0 select-none leading-snug mt-px">→</span>
                        <p style={{ fontSize: subPx }} className={`leading-[1.35] ${block.accent ? 'text-zinc-100' : 'text-zinc-200'}`}>{line}</p>
                      </div>
                    ) : (
                      <p key={lIdx} style={{ fontSize: subPx }} className={`leading-[1.35] ${block.accent ? 'text-zinc-100' : 'text-zinc-200'}`}>
                        {line}
                      </p>
                    )
                  )}
                </div>
                {block.highlight && (
                  <div className="mt-2 pt-1.5 border-t border-zinc-700/40 font-mono text-cap text-amber-300">
                    ⚡ {block.highlight}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visual cards — compact sidebar */}
        {hasCards && (
          <div className={`${hasImage ? 'lg:col-span-3' : 'lg:col-span-4'} flex flex-col gap-2`}>
            {slide.visualCards!.map((card, idx) => (
              <div key={idx} className="px-3 py-2.5 rounded-lg border border-zinc-700/50 bg-zinc-950/70">
                <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-zinc-700/40">
                  <span className="font-mono text-cap font-bold text-white">{card.title}</span>
                  {card.tag && (
                    <span className="font-mono text-xs uppercase px-2 py-0.5 rounded border border-cyan-400/40 text-cyan-300 bg-cyan-950/50 shrink-0">
                      {card.tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  {card.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2">
                      <span className="text-cyan-500 shrink-0 text-sm leading-snug mt-px">▸</span>
                      <span className="font-mono text-cap leading-[1.35] text-zinc-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
    </div>
  );
}
