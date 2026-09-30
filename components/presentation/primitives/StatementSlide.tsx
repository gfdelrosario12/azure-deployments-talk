'use client';

import React from 'react';
import Image from 'next/image';
import { StatementSlideData } from '@/lib/presentation/types';
import { QrCode } from './QrCode';

export function StatementSlide({ slide }: { slide: StatementSlideData }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-6 text-center animate-fadeIn overflow-hidden">

      <span className="font-mono text-xs tracking-widest uppercase text-cyan-400/80 border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 rounded mb-3">
        {slide.section}
      </span>

      {slide.motifBadge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs tracking-wider uppercase border border-cyan-400/50 bg-cyan-950/50 text-cyan-300 rounded mb-5 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          {slide.motifBadge}
        </div>
      )}

      {slide.logos && slide.logos.length > 0 && (
        <div className="flex items-center justify-center gap-6 mb-6">
          {slide.logos.map((logo, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white/5 p-2 border border-zinc-600/60 shadow-lg shadow-black/40">
                <Image src={logo.src} alt={logo.alt} fill className={`object-contain p-1 ${logo.className || ''}`} sizes="80px" priority />
              </div>
              <span className="font-mono text-[10px] text-zinc-400 text-center leading-tight max-w-[80px]">{logo.alt}</span>
            </div>
          ))}
        </div>
      )}

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight font-mono max-w-5xl">
        {slide.statement.split('\n').map((line, i) => (
          <div key={i}>
            {i === 0 && <span className="text-cyan-500 mr-3 select-none">&gt;</span>}
            <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
              {line}
            </span>
          </div>
        ))}
      </h1>

      {slide.subtitle && (
        <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          {slide.subtitle}
        </p>
      )}

      {slide.presentationLink && (
        <a
          href={slide.presentationLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center gap-4 px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-950/15 hover:border-emerald-400/60 hover:bg-emerald-950/30 transition-colors"
        >
          <QrCode src={slide.presentationLink.qrSrc} alt={`QR code for ${slide.presentationLink.label}`} size={128} />
          <span className="text-left">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-emerald-400/80">
              {slide.presentationLink.label}
            </span>
            <span className="block font-mono text-xs text-emerald-300/90 truncate">{slide.presentationLink.url}</span>
          </span>
        </a>
      )}

      <div className="mt-8 w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
    </div>
  );
}
