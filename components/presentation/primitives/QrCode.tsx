'use client';

import React from 'react';
import Image from 'next/image';

interface QrCodeProps {
  src: string;
  alt: string;
  size?: number;
}

export function QrCode({ src, alt, size = 96 }: QrCodeProps) {
  return (
    <div
      className="shrink-0 rounded-lg bg-white p-1.5 border border-zinc-700 shadow-[0_0_18px_rgba(6,182,212,0.12)]"
      style={{ width: size + 12, height: size + 12 }}
    >
      <Image src={src} alt={alt} width={size} height={size} className="block" unoptimized />
    </div>
  );
}
