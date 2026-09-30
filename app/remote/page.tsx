'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { presentationSlides } from '@/lib/presentation/slides';

const TOTAL = presentationSlides.length;

function RemoteInner() {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState<'connecting' | 'live' | 'lost'>('connecting');

  const slide = presentationSlides[current];

  /* ── Pair: verify the PIN, then subscribe to state ── */
  const pair = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setChecking(true);
    try {
      const res = await fetch(`/api/session?pin=${encodeURIComponent(pin)}`);
      if (!res.ok) {
        setError('That PIN is not valid.');
        setChecking(false);
        return;
      }
      setAuthed(true);
    } catch {
      setError('Could not reach the presentation.');
    }
    setChecking(false);
  };

  useEffect(() => {
    if (!authed) return;

    const es = new EventSource(`/api/session/stream?pin=${encodeURIComponent(pin)}`);
    es.onopen = () => setStatus('live');
    es.onerror = () => setStatus('lost');
    es.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'STATE') setCurrent(msg.slide);
      } catch {}
    };
    return () => es.close();
  }, [authed, pin]);

  const send = async (action: 'NEXT' | 'PREV' | 'GOTO', slideIndex?: number) => {
    // optimistic local update so the remote feels instant
    if (action === 'NEXT') setCurrent((c) => Math.min(c + 1, TOTAL - 1));
    else if (action === 'PREV') setCurrent((c) => Math.max(c - 1, 0));
    else if (typeof slideIndex === 'number') setCurrent(slideIndex);

    await fetch('/api/session/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin, action, slide: slideIndex }),
    }).catch(() => {});
  };

  /* ── Gate: PIN required before any control is shown ── */
  if (!authed) {
    return (
      <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center px-6 gap-6 font-mono">
        <div className="text-center space-y-2">
          <div className="text-xs text-purple-400 uppercase tracking-widest">Remote Control</div>
          <h1 className="text-3xl font-black text-white">Presenter unlock</h1>
          <p className="text-sm text-zinc-400 max-w-xs">
            Enter the PIN to take control of the deck.
          </p>
        </div>

        <form onSubmit={pair} className="w-full max-w-xs space-y-3">
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            aria-label="Pairing PIN"
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-center font-mono text-2xl tracking-[0.5em] placeholder:text-zinc-700 focus:outline-none focus:border-purple-500"
          />
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            disabled={pin.length !== 6 || checking}
            className="w-full py-3 rounded-lg border border-purple-500/60 bg-purple-950/40 text-purple-200 font-bold tracking-wider hover:bg-purple-950/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {checking ? 'CHECKING…' : 'PAIR'}
          </button>
        </form>

        <p className="text-[10px] text-zinc-600 text-center max-w-xs leading-relaxed">
          This remote only controls a live session with a valid PIN. Without it, the deck cannot be moved.
        </p>
      </div>
    );
  }

  /* ── Paired remote ── */
  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center px-6 py-8 gap-6 font-mono select-none">
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            status === 'live' ? 'bg-emerald-400' : status === 'lost' ? 'bg-red-400' : 'bg-amber-400'
          }`}
        />
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
          {status === 'live' ? 'Connected' : status === 'lost' ? 'Reconnecting…' : 'Connecting…'}
        </span>
      </div>

      <div className="text-center space-y-1">
        <div className="text-4xl font-black text-white">
          {String(current + 1).padStart(2, '0')}
          <span className="text-zinc-600 text-2xl"> / {TOTAL}</span>
        </div>
        <div className="text-sm text-zinc-400 max-w-xs truncate">{slide?.title}</div>
        <div className="text-xs text-zinc-600">{slide?.section}</div>
      </div>

      <div className="w-full max-w-xs h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
          style={{ width: `${TOTAL > 1 ? (current / (TOTAL - 1)) * 100 : 100}%` }}
        />
      </div>

      <div className="flex gap-6 w-full max-w-xs">
        <button
          onClick={() => send('PREV')}
          disabled={current === 0}
          className="flex-1 h-28 rounded-2xl border-2 border-zinc-700 bg-zinc-900 text-zinc-300 text-4xl hover:border-zinc-500 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ◀
        </button>
        <button
          onClick={() => send('NEXT')}
          disabled={current === TOTAL - 1}
          className="flex-1 h-28 rounded-2xl border-2 border-cyan-500/60 bg-cyan-950/40 text-cyan-300 text-4xl hover:border-cyan-400 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ▶
        </button>
      </div>

      <div className="w-full max-w-xs">
        <div className="flex gap-1 flex-wrap justify-center">
          {presentationSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => send('GOTO', i)}
              className={`w-7 h-7 rounded text-[10px] font-bold transition-colors ${
                i === current ? 'bg-cyan-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RemotePage() {
  return (
    <Suspense fallback={null}>
      <RemoteInner />
    </Suspense>
  );
}
