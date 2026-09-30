'use client';

import React, { useState, useEffect } from 'react';
import { usePresentationChannel } from '@/lib/presentation/usePresentationChannel';
import { presentationSlides } from '@/lib/presentation/slides';

const TOTAL = presentationSlides.length;

export default function RemotePage() {
  const [current, setCurrent] = useState(0);

  const { broadcast } = usePresentationChannel('remote', current, setCurrent);

  const next = () => {
    const n = Math.min(current + 1, TOTAL - 1);
    setCurrent(n);
    broadcast({ type: 'GOTO', slide: n });
  };

  const prev = () => {
    const n = Math.max(current - 1, 0);
    setCurrent(n);
    broadcast({ type: 'GOTO', slide: n });
  };

  const slide = presentationSlides[current];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center px-6 gap-8 font-mono select-none">

      <div className="text-center space-y-1">
        <div className="text-xs text-cyan-400 uppercase tracking-widest">Remote Control</div>
        <div className="text-4xl font-black text-white">
          {String(current + 1).padStart(2, '0')}
          <span className="text-zinc-600 text-2xl"> / {TOTAL}</span>
        </div>
        <div className="text-sm text-zinc-400 max-w-xs truncate">{slide?.title}</div>
        <div className="text-xs text-zinc-600">{slide?.section}</div>
      </div>

      {/* Progress */}
      <div className="w-full max-w-xs h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
          style={{ width: `${TOTAL > 1 ? (current / (TOTAL - 1)) * 100 : 100}%` }}
        />
      </div>

      {/* Big buttons */}
      <div className="flex gap-6 w-full max-w-xs">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex-1 h-24 rounded-2xl border-2 border-zinc-700 bg-zinc-900 text-zinc-300 text-3xl hover:border-zinc-500 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ◀
        </button>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex-1 h-24 rounded-2xl border-2 border-cyan-500/60 bg-cyan-950/40 text-cyan-300 text-3xl hover:border-cyan-400 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ▶
        </button>
      </div>

      {/* Slide strip */}
      <div className="w-full max-w-xs">
        <div className="flex gap-1 flex-wrap justify-center">
          {presentationSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); broadcast({ type: 'GOTO', slide: i }); }}
              className={`w-7 h-7 rounded text-[10px] font-bold transition-colors ${
                i === current ? 'bg-cyan-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-zinc-600 text-center max-w-xs">
        Open this page on your phone while the presentation is open in another tab on the same device, or on the same network via the deployed URL.
      </p>
    </div>
  );
}
