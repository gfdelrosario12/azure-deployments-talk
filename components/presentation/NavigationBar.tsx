'use client';

import React from 'react';

interface NavigationBarProps {
  currentSlide: number;
  totalSlides: number;
  sectionTitle: string;
  motifBadge?: string;
  showNotes: boolean;
  onToggleNotes: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
  onToggleNav: () => void;
  progressPercent: number;
}

export function NavigationBar({
  currentSlide,
  totalSlides,
  sectionTitle,
  motifBadge,
  showNotes,
  onToggleNotes,
  onPrev,
  onNext,
  onToggleFullscreen,
  onToggleNav,
  progressPercent,
}: NavigationBarProps) {
  return (
    <header className="w-full bg-black/90 backdrop-blur-md border-t border-zinc-800">
      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 h-[2px]">
        <div
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-[2px] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between font-mono text-xs">
        {/* Left: Branding & Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">localhost:8080</span>
          </div>

          <span className="text-zinc-600 hidden sm:inline">|</span>

          <span className="text-zinc-400 hidden sm:inline truncate max-w-[200px] md:max-w-xs">
            {sectionTitle}
          </span>

          {motifBadge && (
            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px]">
              {motifBadge}
            </span>
          )}
        </div>

        {/* Center: Slide Counter */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-200 font-bold">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">
            {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleNotes}
            className={`px-2.5 py-1 rounded border transition-colors ${
              showNotes
                ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300'
                : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
            }`}
            title="Toggle Speaker Notes (N)"
          >
            NOTES [N]
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              disabled={currentSlide === 0}
              className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous Slide (Left Arrow)"
            >
              ◀
            </button>
            <button
              onClick={onNext}
              disabled={currentSlide === totalSlides - 1}
              className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next Slide (Right Arrow / Space)"
            >
              ▶
            </button>
          </div>

          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors hidden md:block"
            title="Toggle Fullscreen (F)"
          >
            ⛶
          </button>

          <button
            onClick={() => window.open('/audience', '_blank')}
            className="px-2.5 py-1 rounded border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 hover:text-emerald-200 hover:border-emerald-400 transition-colors hidden md:block text-[10px]"
            title="Open Audience Window"
          >
            AUDIENCE ↗
          </button>

          <button
            onClick={() => window.open('/presenter', '_blank')}
            className="px-2.5 py-1 rounded border border-purple-500/40 bg-purple-950/20 text-purple-400 hover:text-purple-200 hover:border-purple-400 transition-colors hidden md:block text-[10px]"
            title="Open Presenter Console"
          >
            PRESENTER ↗
          </button>

          <button
            onClick={onToggleNav}
            className="px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
            title="Hide Navigation (M)"
          >
            HIDE [M]
          </button>
        </div>
      </div>
    </header>
  );
}
