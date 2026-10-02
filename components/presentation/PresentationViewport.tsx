'use client';

import React, { useState, useCallback } from 'react';
import { SlideData } from '@/lib/presentation/types';
import { StatementSlide } from './primitives/StatementSlide';
import { SectionHeaderSlide } from './primitives/SectionHeaderSlide';
import { TextVisualSlide } from './primitives/TextVisualSlide';
import { ArchitectureDiagramSlide } from './primitives/ArchitectureDiagramSlide';
import { ComparisonSlide } from './primitives/ComparisonSlide';
import { QuestionRevealSlide } from './primitives/QuestionRevealSlide';
import { CaseStudySlide } from './primitives/CaseStudySlide';
import { ClosingTakeawaySlide } from './primitives/ClosingTakeawaySlide';
import { ImageSlide } from './primitives/ImageSlide';
import { SocialsSlide } from './primitives/SocialsSlide';
import { CodeCompareSlide } from './primitives/CodeCompareSlide';
import { NavigationBar } from './NavigationBar';
import { useSlideControls } from '@/lib/presentation/useSlideControls';

interface PresentationViewportProps {
  slides: SlideData[];
  initialSlide?: number;
  role?: 'presenter' | 'audience' | 'remote';
}

const ZOOM_STEP = 0.1;
const ZOOM_MIN  = 0.5;
const ZOOM_MAX  = 2.0;
const ZOOM_DEFAULT = 1.0;

export function renderSlide(slide: SlideData) {
  switch (slide.type) {
    case 'statement':        return <StatementSlide slide={slide} />;
    case 'section-header':   return <SectionHeaderSlide slide={slide} />;
    case 'text-visual':      return <TextVisualSlide slide={slide} />;
    case 'architecture':     return <ArchitectureDiagramSlide slide={slide} />;
    case 'comparison':       return <ComparisonSlide slide={slide} />;
    case 'question-reveal':  return <QuestionRevealSlide slide={slide} />;
    case 'case-study':       return <CaseStudySlide slide={slide} />;
    case 'closing-takeaway': return <ClosingTakeawaySlide slide={slide} />;
    case 'image':            return <ImageSlide slide={slide} />;
    case 'socials':          return <SocialsSlide slide={slide} />;
    case 'code-compare':     return <CodeCompareSlide slide={slide} />;
    default:                 return <div>Unsupported slide type</div>;
  }
}

export function PresentationViewport({ slides, initialSlide = 0, role = 'presenter' }: PresentationViewportProps) {
  const {
    currentSlide,
    nextSlide,
    prevSlide,
    showNotes,
    toggleNotes,
    isFullscreen,
    toggleFullscreen,
    showNav,
    toggleNav,
    progressPercent,
  } = useSlideControls({ totalSlides: slides.length, initialSlide, role });

  const [zoom, setZoom] = useState(ZOOM_DEFAULT);
  const zoomIn    = useCallback(() => setZoom(z => Math.min(ZOOM_MAX,  +(z + ZOOM_STEP).toFixed(1))), []);
  const zoomOut   = useCallback(() => setZoom(z => Math.max(ZOOM_MIN,  +(z - ZOOM_STEP).toFixed(1))), []);
  const zoomReset = useCallback(() => setZoom(ZOOM_DEFAULT), []);

  const activeSlide = slides[currentSlide];
  const isAudience  = role === 'audience';
  const NAV_H = 58;

  return (
    <div className="h-screen h-[100dvh] overflow-hidden bg-black text-zinc-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* ── Slide stage ── */}
      <main
        className="flex-1 min-h-0 relative overflow-hidden"
        style={{ paddingBottom: (!isAudience && showNav) ? NAV_H : 0 }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Zoom wrapper — scales the entire slide uniformly from the centre */}
        <div className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center">
          <div
            className="w-full h-full"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            {activeSlide && (
              <div key={activeSlide.id} className="w-full h-full">{renderSlide(activeSlide)}</div>
            )}
          </div>
        </div>

        {/* ── Zoom controls (hidden in audience mode) ── */}
        {!isAudience && (
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-zinc-900/80 border border-zinc-700/60 rounded-lg px-1.5 py-1 backdrop-blur-sm shadow-lg">
            <button
              onClick={zoomOut}
              disabled={zoom <= ZOOM_MIN}
              title="Zoom out (−)"
              className="w-6 h-6 flex items-center justify-center rounded text-zinc-300 hover:text-white hover:bg-zinc-700/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-mono text-sm font-bold"
            >−</button>
            <button
              onClick={zoomReset}
              title="Reset zoom"
              className="px-1.5 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-cyan-300 hover:bg-zinc-700/60 transition-colors font-mono"
              style={{ fontSize: 10 }}
            >{Math.round(zoom * 100)}%</button>
            <button
              onClick={zoomIn}
              disabled={zoom >= ZOOM_MAX}
              title="Zoom in (+)"
              className="w-6 h-6 flex items-center justify-center rounded text-zinc-300 hover:text-white hover:bg-zinc-700/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-mono text-sm font-bold"
            >+</button>
          </div>
        )}
      </main>

      {/* ── Nav bar (hidden in audience mode) ── */}
      {!isAudience && (
        <div
          className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ease-in-out ${
            showNav ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <NavigationBar
            currentSlide={currentSlide}
            totalSlides={slides.length}
            sectionTitle={activeSlide?.section || ''}
            motifBadge={activeSlide?.motifBadge}
            showNotes={showNotes}
            onToggleNotes={toggleNotes}
            onPrev={prevSlide}
            onNext={nextSlide}
            onToggleFullscreen={toggleFullscreen}
            onToggleNav={toggleNav}
            progressPercent={progressPercent}
          />
        </div>
      )}

      {/* ── Speaker Notes Drawer ── */}
      {!isAudience && showNotes && activeSlide?.speakerNotes && (
        <aside className="fixed bottom-[58px] left-0 right-0 max-h-56 overflow-y-auto bg-zinc-950/95 border-t border-cyan-500/40 px-6 py-4 z-40 shadow-2xl backdrop-blur-md">
          <div className="max-w-5xl mx-auto space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <span>🎙 SCRIPT // SLIDE {currentSlide + 1}</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-300">{activeSlide.title}</span>
              </div>
              <button onClick={toggleNotes} className="text-zinc-500 hover:text-zinc-300 font-mono text-xs">[ CLOSE ]</button>
            </div>
            <div className="space-y-1.5 text-zinc-300 text-xs leading-relaxed font-sans">
              {activeSlide.speakerNotes.map((note, idx) => (
                <p key={idx} className="border-l-2 border-cyan-500/30 pl-3">{note}</p>
              ))}
            </div>
          </div>
        </aside>
      )}

      {!isAudience && !showNav && (
        <button
          onClick={toggleNav}
          title="Show Navigation (M)"
          className="fixed bottom-2 right-2 z-50 px-2.5 py-1.5 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/60 font-mono text-[10px] transition-colors"
        >
          NAV [M]
        </button>
      )}
    </div>
  );
}
