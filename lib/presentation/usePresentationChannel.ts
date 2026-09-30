'use client';

import { useEffect, useCallback, useRef, useState } from 'react';

export type PresentationMessage =
  | { type: 'GOTO'; slide: number }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'SYNC_REQUEST' }
  | { type: 'SYNC_RESPONSE'; slide: number };

const CHANNEL = 'presentation-sync';

export interface Pairing {
  id: string;
  total: number;
}

export function usePresentationChannel(
  role: 'presenter' | 'audience' | 'remote',
  currentSlide: number,
  onGoto: (slide: number) => void,
  credential?: string | null,
  total = 1,
) {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const sourceRef = useRef<EventSource | null>(null);
  const [pairing, setPairing] = useState<Pairing | null>(null);
  const [connected, setConnected] = useState(false);
  const slideRef = useRef(currentSlide);
  useEffect(() => {
    slideRef.current = currentSlide;
  });

  /* ── Same-browser sync (audience tabs / local windows) ── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ch = new BroadcastChannel(CHANNEL);
    channelRef.current = ch;

    ch.onmessage = (e: MessageEvent<PresentationMessage>) => {
      const msg = e.data;
      if (msg.type === 'GOTO') onGoto(msg.slide);
      if (msg.type === 'SYNC_REQUEST' && role === 'presenter') {
        ch.postMessage({ type: 'SYNC_RESPONSE', slide: slideRef.current } satisfies PresentationMessage);
      }
      if (msg.type === 'SYNC_RESPONSE' && role !== 'presenter') onGoto(msg.slide);
    };

    if (role !== 'presenter') ch.postMessage({ type: 'SYNC_REQUEST' } satisfies PresentationMessage);

    return () => ch.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  /* ── Presenter: open a pairing session ── */
  useEffect(() => {
    if (role !== 'presenter' || credential) return;
    let cancelled = false;

    fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('failed'))))
      .then((data) => {
        if (!cancelled && data?.id) setPairing({ id: data.id, total: data.total });
      })
      .catch(() => {
        /* server unavailable — same-browser sync still works */
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, credential]);

  /* ── Subscribe to server state (presenter + paired remote) ── */
  useEffect(() => {
    const cred = credential || pairing?.id;
    if (!cred || role === 'audience') return;

    const es = new EventSource(`/api/session/stream?pin=${encodeURIComponent(cred)}`);
    sourceRef.current = es;

    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'STATE') {
          onGoto(msg.slide);
          if (role === 'presenter') {
            channelRef.current?.postMessage({ type: 'GOTO', slide: msg.slide } satisfies PresentationMessage);
          }
        }
      } catch {
        /* ignore malformed frames */
      }
    };

    return () => {
      es.close();
      sourceRef.current = null;
      setConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credential, pairing?.id, role]);

  const broadcast = useCallback((msg: PresentationMessage) => {
    channelRef.current?.postMessage(msg);
  }, []);

  /** Publish a presenter-side change to paired remotes. */
  const publish = useCallback(
    async (slide: number) => {
      broadcast({ type: 'GOTO', slide });
      const cred = credential || pairing?.id;
      if (!cred) return;
      fetch('/api/session/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: cred, action: 'GOTO', slide }),
      }).catch(() => {});
    },
    [broadcast, credential, pairing?.id],
  );

  /** Send a command from a paired remote. */
  const send = useCallback(
    async (action: 'NEXT' | 'PREV' | 'GOTO', slide?: number) => {
      broadcast(action === 'GOTO' ? { type: 'GOTO', slide: slide! } : { type: action });
      const cred = credential || pairing?.id;
      if (!cred) return;
      fetch('/api/session/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: cred, action, slide }),
      }).catch(() => {});
    },
    [broadcast, credential, pairing?.id],
  );

  return { broadcast, publish, send, pairing, connected };
}
