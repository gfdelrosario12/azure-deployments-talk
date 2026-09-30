'use client';

import { useEffect, useCallback, useRef } from 'react';

export type PresentationMessage =
  | { type: 'GOTO'; slide: number }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'SYNC_REQUEST' }
  | { type: 'SYNC_RESPONSE'; slide: number };

const CHANNEL = 'presentation-sync';

export function usePresentationChannel(
  role: 'presenter' | 'audience' | 'remote',
  currentSlide: number,
  onGoto: (slide: number) => void,
) {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ch = new BroadcastChannel(CHANNEL);
    channelRef.current = ch;

    ch.onmessage = (e: MessageEvent<PresentationMessage>) => {
      const msg = e.data;
      if (msg.type === 'GOTO') { onGoto(msg.slide); }
      if (msg.type === 'SYNC_REQUEST' && role === 'presenter') {
        ch.postMessage({ type: 'SYNC_RESPONSE', slide: currentSlide } satisfies PresentationMessage);
      }
      if (msg.type === 'SYNC_RESPONSE' && role !== 'presenter') { onGoto(msg.slide); }
    };

    // audience/remote: ask for current state on mount
    if (role !== 'presenter') {
      ch.postMessage({ type: 'SYNC_REQUEST' } satisfies PresentationMessage);
    }

    return () => ch.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const broadcast = useCallback((msg: PresentationMessage) => {
    channelRef.current?.postMessage(msg);
  }, []);

  return { broadcast };
}
