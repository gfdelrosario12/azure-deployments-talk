'use client';

import React from 'react';
import { presentationSlides } from '@/lib/presentation/slides';
import { useSlideControls } from '@/lib/presentation/useSlideControls';
import { renderSlide } from '@/components/presentation/PresentationViewport';
import { PairingPanel } from '@/components/presentation/primitives/PairingPanel';

export default function PresenterPage() {
  const slides = presentationSlides;
  const {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    showNotes,
    toggleNotes,
    progressPercent,
    pairing,
    connected,
  } = useSlideControls({ totalSlides: slides.length, role: 'presenter' });

  const active = slides[currentSlide];
  const next   = slides[currentSlide + 1];

  return (
    <div className="h-screen h-[100dvh] bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden font-mono">

      {/* ── Top bar ── */}
      <header className="shrink-0 h-10 flex items-center justify-between px-4 bg-black border-b border-zinc-800 text-xs">
        <span className="text-cyan-400 font-bold tracking-widest uppercase">Presenter View</span>
        <div className="flex items-center gap-3">
          <PairingPanel pairing={pairing} connected={connected} />
          <button
            onClick={() => window.open('/audience', '_blank')}
            className="px-2.5 py-1 rounded border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/60 transition-colors text-[10px] uppercase tracking-wider"
          >
            Audience ↗
          </button>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="shrink-0 h-[2px] bg-zinc-900">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ── Main layout ── */}
      <div className="flex-1 min-h-0 grid grid-cols-[1fr_360px] gap-0">

        {/* Left: current slide preview */}
        <div className="flex flex-col min-h-0 border-r border-zinc-800">
          <div className="shrink-0 px-3 py-1.5 bg-zinc-900/60 border-b border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-widest">
            Current — {active?.title}
          </div>
          <div className="flex-1 min-h-0 overflow-hidden bg-black relative">
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.015]"
              style={{
                backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative z-10 w-full h-full overflow-y-auto flex items-center justify-center px-4 py-4">
              {active && <div className="w-full">{renderSlide(active)}</div>}
            </div>
          </div>
        </div>

        {/* Right: next preview + notes + controls */}
        <div className="flex flex-col min-h-0 bg-zinc-950">

          {/* Next slide thumbnail */}
          <div className="shrink-0 border-b border-zinc-800">
            <div className="px-3 py-1.5 bg-zinc-900/60 text-[10px] text-zinc-500 uppercase tracking-widest">
              Next — {next?.title ?? 'End of presentation'}
            </div>
            <div className="h-40 bg-black relative overflow-hidden">
              {next ? (
                <>
                  <div className="absolute inset-0 scale-[0.45] origin-top-left pointer-events-none"
                    style={{ width: '222%', height: '222%' }}>
                    {renderSlide(next)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/60 pointer-events-none" />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600 text-xs">— end —</div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="shrink-0 flex items-center justify-between gap-2 px-3 py-2 border-b border-zinc-800">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex-1 py-2 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
            >
              ◀ Prev
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex-1 py-2 rounded border border-cyan-500/50 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-950/60 hover:border-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold"
            >
              Next ▶
            </button>
          </div>

          {/* Slide jump */}
          <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider shrink-0">Jump to</span>
            <input
              type="number"
              min={1}
              max={slides.length}
              value={currentSlide + 1}
              onChange={(e) => goToSlide(Number(e.target.value) - 1)}
              className="w-16 px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-white text-xs text-center focus:outline-none focus:border-cyan-500"
            />
            <span className="text-[10px] text-zinc-600">/ {slides.length}</span>
          </div>

          {/* Speaker notes */}
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="shrink-0 px-3 py-1.5 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest">🎙 Speaker Notes</span>
              <button onClick={toggleNotes} className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors">
                {showNotes ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            {showNotes !== false && (
              <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-2">
                {active?.speakerNotes?.length ? (
                  active.speakerNotes.map((note, idx) => (
                    <p key={idx} className="text-zinc-300 text-xs leading-relaxed border-l-2 border-cyan-500/30 pl-2.5">
                      {note}
                    </p>
                  ))
                ) : (
                  <p className="text-zinc-600 text-xs italic">No notes for this slide.</p>
                )}
              </div>
            )}
          </div>

          {/* Slide strip */}
          <div className="shrink-0 border-t border-zinc-800 px-2 py-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(i)}
                  className={`shrink-0 w-8 h-6 rounded text-[9px] font-bold transition-colors ${
                    i === currentSlide
                      ? 'bg-cyan-500 text-black'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
