'use client';

import React from 'react';
import Image from 'next/image';
import { SocialsSlideData } from '@/lib/presentation/types';
import { QrCode } from './QrCode';

const ICONS: Record<SocialsSlideData['socials'][number]['icon'], React.ReactNode> = {
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-full h-full">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.71h.05c.53-1 1.83-2.06 3.77-2.06C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.35 1.59-2.35 3.23V21H9z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-full h-full">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15 0 18M12 3c-2.5 2.7-2.5 15 0 18" />
    </svg>
  ),
};

export function SocialsSlide({ slide }: { slide: SocialsSlideData }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-6 sm:px-10 py-4 animate-fadeIn overflow-hidden">
      <span className="font-mono text-xs tracking-widest uppercase text-cyan-400/80 border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 rounded mb-3">
        {slide.section}
      </span>

      <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono text-center">
        <span className="text-cyan-500 mr-3 select-none">&gt;</span>
        <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
          {slide.headline}
        </span>
      </h2>

      {slide.subline && (
        <p className="text-zinc-300 text-sm sm:text-base font-light mt-2 text-center max-w-2xl">
          {slide.subline}
        </p>
      )}

      {slide.speaker && (
        <div className="mt-5 flex items-center justify-center gap-5 px-5 py-4 rounded-xl border border-cyan-500/25 bg-cyan-950/10 w-full max-w-3xl mx-auto">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-cyan-500/50 shadow-lg shadow-cyan-950/40">
            <Image
              src={slide.speaker.src}
              alt={slide.speaker.alt}
              fill
              className="object-cover object-top"
              sizes="96px"
              priority
            />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <div className="font-mono text-base sm:text-lg font-bold text-white truncate">
              {slide.speaker.name}
            </div>
            <ul className="mt-1.5 space-y-1">
              {slide.speaker.titles.map((title) => (
                <li
                  key={title}
                  className="flex items-start gap-2 font-mono text-[11px] sm:text-xs text-zinc-300 leading-snug"
                >
                  <span className="text-cyan-500 select-none">&gt;</span>
                  <span className="truncate">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mt-5 w-full max-w-5xl mx-auto">
        {slide.socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2.5 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-cyan-500/50 hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 w-full min-w-0">
              <span className="w-4 h-4 shrink-0 text-cyan-400">
                {ICONS[social.icon]}
              </span>
              <span className="font-mono text-xs font-bold text-white truncate">{social.label}</span>
            </div>
            <QrCode src={social.qrSrc} alt={`QR code for ${social.label}`} size={92} />
            <span className="font-mono text-[10px] text-zinc-400 text-center truncate w-full">{social.handle}</span>
          </a>
        ))}

        <a
          href={slide.presentation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2.5 p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
        >
          <div className="flex items-center justify-center gap-2 w-full min-w-0">
            <span className="w-4 h-4 shrink-0 text-emerald-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-full h-full">
                <rect x="2" y="4" width="20" height="13" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </span>
            <span className="font-mono text-xs font-bold text-white truncate">{slide.presentation.label}</span>
          </div>
          <QrCode src={slide.presentation.qrSrc} alt={`QR code for ${slide.presentation.label}`} size={92} />
          <span className="font-mono text-[10px] text-emerald-300/80 text-center truncate w-full">
            Scan for this deck
          </span>
        </a>
      </div>
    </div>
  );
}
