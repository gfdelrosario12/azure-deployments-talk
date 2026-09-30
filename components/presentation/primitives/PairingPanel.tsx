'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Pairing } from '@/lib/presentation/usePresentationChannel';

interface PairingPanelProps {
  pairing: Pairing | null;
  connected: boolean;
  remotePath?: string;
}

/**
 * Renders the pairing QR so a phone can open the remote.
 * The secret PIN is never rendered here — the remote prompts for it.
 */
export function PairingPanel({ pairing, connected, remotePath = '/remote' }: PairingPanelProps) {
  const [qr, setQr] = useState<string>('');

  useEffect(() => {
    if (!pairing) return;
    if (typeof window === 'undefined') return;

    const url = `${window.location.origin}${remotePath}`;

    let cancelled = false;
    QRCode.toString(url, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 1,
      color: { dark: '#0a0a0aff', light: '#ffffffff' },
      width: 220,
    })
      .then((svg) => { if (!cancelled) setQr(svg); })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [pairing, remotePath]);

  if (!pairing) {
    return (
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-zinc-500">
        <span className="w-2 h-2 rounded-full bg-zinc-600" />
        Offline mode — no remote pairing
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-zinc-800 bg-zinc-900">
        <span
          className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400' : 'bg-amber-400'}`}
        />
        <span className="text-[10px] uppercase tracking-wider text-zinc-400">
          {connected ? 'Remote live' : 'Pairing'}
        </span>
      </div>

      {qr && (
        <details className="relative">
          <summary className="px-2 py-1 rounded border border-purple-500/40 bg-purple-950/30 text-purple-300 text-[10px] uppercase tracking-wider cursor-pointer select-none hover:bg-purple-950/50">
            Remote QR
          </summary>
          <div className="absolute right-0 top-full mt-2 z-50 w-56 p-3 rounded-lg bg-zinc-950 border border-zinc-700 shadow-2xl space-y-2">
            <div
              className="w-full aspect-square bg-white rounded p-1.5 [&>svg]:w-full [&>svg]:h-full"
              dangerouslySetInnerHTML={{ __html: qr }}
            />
            <p className="text-[9px] text-zinc-500 text-center leading-snug">
              Scan to open the remote, then enter the PIN to pair.
            </p>
          </div>
        </details>
      )}
    </div>
  );
}
