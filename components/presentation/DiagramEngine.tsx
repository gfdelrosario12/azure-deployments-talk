'use client';

import React from 'react';
import { DiagramData } from '@/lib/presentation/types';

export function DiagramEngine({ diagram }: { diagram: DiagramData }) {
  return (
    <div className="w-full bg-zinc-950/90 border border-zinc-800 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Nodes visual flow */}
      <div className="relative z-10 flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 sm:gap-4">
        {diagram.nodes.map((node, index) => {
          const isLast = index === diagram.nodes.length - 1;
          const matchingEdge = diagram.edges.find((e) => e.from === node.id);

          return (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <div
                className={`flex-1 min-w-[140px] max-w-[200px] p-4 rounded-lg border text-center transition-all duration-300 transform hover:-translate-y-1 ${
                  node.type === 'compute'
                    ? 'border-cyan-500/50 bg-cyan-950/20 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    : node.type === 'source'
                    ? 'border-purple-500/50 bg-purple-950/20 text-purple-200'
                    : node.type === 'network'
                    ? 'border-amber-500/50 bg-amber-950/20 text-amber-200'
                    : node.type === 'user'
                    ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-200'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-200'
                }`}
              >
                <div className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-1">
                  {node.type || 'NODE'}
                </div>
                <div className="font-bold font-mono text-sm sm:text-base text-white tracking-tight">
                  {node.label}
                </div>
                {node.sublabel && (
                  <div className="font-mono text-[11px] text-zinc-400 mt-1 truncate">
                    {node.sublabel}
                  </div>
                )}
              </div>

              {/* Edge connector / Arrow */}
              {!isLast && (
                <div className="flex flex-col items-center justify-center px-1">
                  {matchingEdge?.label && (
                    <span className="font-mono text-[10px] text-zinc-500 uppercase mb-1">
                      {matchingEdge.label}
                    </span>
                  )}
                  <div className="flex items-center text-zinc-600">
                    <div className="h-[2px] w-4 sm:w-6 bg-gradient-to-r from-zinc-700 to-zinc-500" />
                    <span className="font-mono text-xs text-zinc-400 -ml-1">►</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
