'use client';

import { useState, useEffect, useCallback } from 'react';

interface SlideControlsOptions {
  totalSlides: number;
  initialSlide?: number;
}

export function useSlideControls({ totalSlides, initialSlide = 0 }: SlideControlsOptions) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  const toggleNotes = useCallback(() => {
    setShowNotes((prev) => !prev);
  }, []);

  const toggleNav = useCallback(() => {
    setShowNav((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        toggleNotes();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleNav();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, toggleNotes, toggleFullscreen, toggleNav, totalSlides]);

  return {
    currentSlide,
    setCurrentSlide: goToSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    showNotes,
    toggleNotes,
    isFullscreen,
    toggleFullscreen,
    showNav,
    toggleNav,
    progressPercent: totalSlides > 1 ? (currentSlide / (totalSlides - 1)) * 100 : 100,
  };
}
