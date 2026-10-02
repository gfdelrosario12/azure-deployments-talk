'use client';

import React from 'react';
import { CodeCompareSlideData } from '@/lib/presentation/types';

// ── Minimal JS/TS/Dart syntax highlighter ────────────────────────────────────

const KEYWORDS = new Set([
  'async', 'await', 'function', 'const', 'let', 'var', 'return',
  'try', 'catch', 'throw', 'new', 'if', 'else', 'true', 'false', 'null',
  'Future', 'List', 'final', 'void', 'class', 'import', 'from', 'export',
]);

type Token = { kind: 'keyword' | 'string' | 'comment' | 'number' | 'plain'; text: string };

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ kind: 'comment', text: line.slice(i) });
      break;
    }
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && !(line[j] === q && line[j - 1] !== '\\')) j++;
      tokens.push({ kind: 'string', text: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      tokens.push({ kind: 'number', text: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\w$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      tokens.push({ kind: KEYWORDS.has(word) ? 'keyword' : 'plain', text: word });
      i = j;
      continue;
    }
    const last = tokens[tokens.length - 1];
    if (last?.kind === 'plain') last.text += line[i];
    else tokens.push({ kind: 'plain', text: line[i] });
    i++;
  }
  return tokens;
}

const COLOR: Record<Token['kind'], string> = {
  keyword: 'text-violet-400',
  string:  'text-amber-300',
  comment: 'text-zinc-500 italic',
  number:  'text-cyan-300',
  plain:   'text-zinc-200',
};

function HighlightedLine({ line }: { line: string }) {
  if (line.trim() === '') return <span>&nbsp;</span>;
  return (
    <>
      {tokenize(line).map((tok, i) => (
        <span key={i} className={COLOR[tok.kind]}>{tok.text}</span>
      ))}
    </>
  );
}

// ── Pane ─────────────────────────────────────────────────────────────────────

function CodePane({ label, code, variant }: { label: string; code: string; variant: 'before' | 'after' }) {
  const lines = code.split('\n');
  const fs = lines.length <= 10 ? 15 : lines.length <= 16 ? 14 : 13;
  const lh = 1.65;

  const border = variant === 'before' ? 'border-red-500/40'     : 'border-emerald-500/40';
  const badge  = variant === 'before'
    ? 'bg-red-950/60 border-red-500/40 text-red-300'
    : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300';
  const glow   = variant === 'before'
    ? 'shadow-[0_0_20px_rgba(239,68,68,0.06)]'
    : 'shadow-[0_0_20px_rgba(16,185,129,0.08)]';

  return (
    <div className={`flex flex-col rounded-xl border ${border} bg-zinc-950/80 overflow-hidden ${glow} min-h-0`}>
      <div className={`shrink-0 flex items-center gap-3 px-4 py-2.5 border-b ${border} bg-zinc-900/60`}>
        <span className={`font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded border ${badge} shrink-0 font-bold`}>
          {variant === 'before' ? '✗ BEFORE' : '✓ AFTER'}
        </span>
        <span className="font-mono text-sm text-zinc-400 truncate">{label}</span>
      </div>
      <div className="flex-1 min-h-0 px-4 py-3 overflow-hidden">
        <pre className="h-full font-mono" style={{ fontSize: fs, lineHeight: lh }}>
          {lines.map((line, idx) => (
            <div key={idx} className="flex">
              <span className="select-none shrink-0 text-right text-zinc-600 mr-4" style={{ width: 24, fontSize: fs - 1, lineHeight: lh }}>
                {idx + 1}
              </span>
              <span className="flex-1"><HighlightedLine line={line} /></span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// ── Slide ─────────────────────────────────────────────────────────────────────

export function CodeCompareSlide({ slide }: { slide: CodeCompareSlideData }) {
  return (
    <div className="h-full flex flex-col px-10 lg:px-14 py-5 max-w-[1400px] mx-auto w-full animate-fadeIn">

      {/* Header */}
      <div className="shrink-0 mb-2 border-b border-zinc-700/60 pb-2 flex items-center justify-between gap-6">
        <div className="min-w-0">
          <h2 className="text-4xl font-bold text-white tracking-tight font-mono leading-tight">{slide.title}</h2>
          <span className="mt-1 inline-block font-mono text-xs tracking-widest uppercase text-cyan-400/70 border border-cyan-500/25 bg-cyan-950/30 px-2.5 py-0.5 rounded">
            {slide.section}
          </span>
        </div>
        {slide.motifBadge && (
          <span className="shrink-0 font-mono text-xs px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
            {slide.motifBadge}
          </span>
        )}
      </div>

      {slide.summary && (
        <p className="shrink-0 mb-3 text-[1.05rem] text-zinc-400 font-mono leading-[1.35]">{slide.summary}</p>
      )}

      {/* Code panes — fill remaining height */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <CodePane label={slide.before.label} code={slide.before.code} variant="before" />
        <CodePane label={slide.after.label}  code={slide.after.code}  variant="after"  />
      </div>

      {slide.callout && (
        <div className="shrink-0 mt-3 px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 font-mono text-[1.05rem] text-cyan-200">
          ⚡ {slide.callout}
        </div>
      )}

      <div className="shrink-0 mt-3 w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
    </div>
  );
}
