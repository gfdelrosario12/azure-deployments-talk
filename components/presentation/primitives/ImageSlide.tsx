'use client';

import React from 'react';
import Image from 'next/image';
import { ImageSlideData } from '@/lib/presentation/types';

export function ImageSlide({ slide }: { slide: ImageSlideData }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 sm:px-12 animate-fadeIn">
      <div className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          width={1200}
          height={675}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      {slide.image.caption && (
        <p className="mt-4 text-zinc-400 font-mono text-sm text-center">
          {slide.image.caption}
        </p>
      )}
    </div>
  );
}