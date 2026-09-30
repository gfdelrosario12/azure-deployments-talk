'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePresentationChannel } from './usePresentationChannel';

interface SlideControlsOptions {
  totalSlides: number;
  initialSlide?: number;
  role?: 'presenter' | 'audience' | 'remote';
}

export function useSlideControls({ totalSlides, initialSlide = 0, role = 'presenter' }: SlideControlsOptions) {
  const [currentSlide, setCurrentSlideState] = useState(initialSlide);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlideState(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  const { broadcast } = usePresentationChannel(role, currentSlide, goToSlide);

  const nextSlide = useCallback(() => {
    setCurrentSlideState((prev) => {
      const next = Math.min(prev + 1, totalSlides - 1);
      broadcast({ type: 'GOTO', slide: next });
      return next;
    });
  }, [totalSlides, broadcast]);

  const prevSlide = useCallback(() => {
    setCurrentSlideState((prev) => {
      const next = Math.max(prev - 1, 0);
      broadcast({ type: 'GOTO', slide: next });
      return next;
    });
  }, [broadcast]);

  const goToSlideAndBroadcast = useCallback((index: number) => {
    const next = Math.max(0, Math.min(index, totalSlides - 1));
    setCurrentSlideState(next);
    broadcast({ type: 'GOTO', slide: next });
  }, [totalSlides, broadcast]);

  const toggleNotes = useCallback(() => setShowNotes((p) => !p), []);
  const toggleNav    = useCallback(() => setShowNav((p) => !p), []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (role === 'audience') return; // audience is read-only
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); nextSlide(); }
      else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') { e.preventDefault(); prevSlide(); }
      else if (e.key === 'Home')  { e.preventDefault(); goToSlideAndBroadcast(0); }
      else if (e.key === 'End')   { e.preventDefault(); goToSlideAndBroadcast(totalSlides - 1); }
      else if (e.key.toLowerCase() === 'n') { e.preventDefault(); toggleNotes(); }
      else if (e.key.toLowerCase() === 'f') { e.preventDefault(); toggleFullscreen(); }
      else if (e.key.toLowerCase() === 'm') { e.preventDefault(); toggleNav(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlideAndBroadcast, toggleNotes, toggleFullscreen, toggleNav, totalSlides, role]);

  return {
    currentSlide,
    setCurrentSlide: goToSlideAndBroadcast,
    nextSlide,
    prevSlide,
    goToSlide: goToSlideAndBroadcast,
    showNotes,
    toggleNotes,
    isFullscreen,
    toggleFullscreen,
    showNav,
    toggleNav,
    progressPercent: totalSlides > 1 ? (currentSlide / (totalSlides - 1)) * 100 : 100,
  };
}
