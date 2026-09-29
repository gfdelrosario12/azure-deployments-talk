'use client';

import React from 'react';
import { SlideData } from '@/lib/presentation/types';
import { StatementSlide } from './primitives/StatementSlide';
import { SectionHeaderSlide } from './primitives/SectionHeaderSlide';
import { TextVisualSlide } from './primitives/TextVisualSlide';
import { ArchitectureDiagramSlide } from './primitives/ArchitectureDiagramSlide';
import { ComparisonSlide } from './primitives/ComparisonSlide';
import { QuestionRevealSlide } from './primitives/QuestionRevealSlide';
import { CaseStudySlide } from './primitives/CaseStudySlide';
import { ClosingTakeawaySlide } from './primitives/ClosingTakeawaySlide';
import { NavigationBar } from './NavigationBar';
import { useSlideControls } from '@/lib/presentation/useSlideControls';

interface PresentationViewportProps {
  slides: SlideData[];
  initialSlide?: number;
}

export function PresentationViewport({ slides, initialSlide = 0 }: PresentationViewportProps) {
  const {
    currentSlide,
    nextSlide,
    prevSlide,
    showNotes,
    toggleNotes,
    toggleFullscreen,
    progressPercent,
  } = useSlideControls({ totalSlides: slides.length, initialSlide });

  const activeSlide = slides[currentSlide];

  const renderSlideContent = (slide: SlideData) => {
    switch (slide.type) {
      case 'statement':
        return <StatementSlide slide={slide} />;
      case 'section-header':
        return <SectionHeaderSlide slide={slide} />;
      case 'text-visual':
        return <TextVisualSlide slide={slide} />;
      case 'architecture':
        return <ArchitectureDiagramSlide slide={slide} />;
      case 'comparison':
        return <ComparisonSlide slide={slide} />;
      case 'question-reveal':
        return <QuestionRevealSlide slide={slide} />;
      case 'case-study':
        return <CaseStudySlide slide={slide} />;
      case 'closing-takeaway':
        return <ClosingTakeawaySlide slide={slide} />;
      default:
        return <div>Unsupported slide type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
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
        progressPercent={progressPercent}
      />

      {/* Main Slide Stage */}
      <main className="flex-1 flex items-center justify-center pt-16 pb-12 px-4 relative overflow-hidden">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="w-full relative z-10">
          {activeSlide && renderSlideContent(activeSlide)}
        </div>
      </main>

      {/* Speaker Notes Drawer */}
      {showNotes && activeSlide?.speakerNotes && (
        <aside className="fixed bottom-0 left-0 right-0 max-h-72 overflow-y-auto bg-zinc-950/95 border-t border-cyan-500/40 p-6 z-40 shadow-2xl backdrop-blur-md">
          <div className="max-w-5xl mx-auto space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <span>🎙 PRESENTER SCRIPT // SLIDE {currentSlide + 1}</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-300">{activeSlide.title}</span>
              </div>
              <button
                onClick={toggleNotes}
                className="text-zinc-500 hover:text-zinc-300 font-mono text-xs"
              >
                [ CLOSE ]
              </button>
            </div>

            <div className="space-y-2 text-zinc-300 text-sm leading-relaxed font-sans">
              {activeSlide.speakerNotes.map((note, idx) => (
                <p key={idx} className="border-l-2 border-cyan-500/30 pl-3">
                  {note}
                </p>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
