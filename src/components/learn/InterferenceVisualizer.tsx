'use client';

import { useState } from 'react';

/**
 * Two-path interferometer. User adjusts the phase of path B (φ).
 * Amplitudes are 1/√2 e^(iφ_A) and 1/√2 e^(iφ_B); they add at the detector.
 * Probability at detector = |A + B|² which oscillates between 0 (destructive) and 1 (constructive).
 *
 * Path A is fixed (phase 0). Path B phase is user-controlled.
 */

const INV_ROOT2 = 1 / Math.sqrt(2);

function amplitude(phase: number) {
  return { re: INV_ROOT2 * Math.cos(phase), im: INV_ROOT2 * Math.sin(phase) };
}

export function InterferenceVisualizer() {
  const [phi, setPhi] = useState(0);

  const ampA = amplitude(0);
  const ampB = amplitude(phi);
  const sumRe = ampA.re + ampB.re;
  const sumIm = ampA.im + ampB.im;
  const prob = sumRe * sumRe + sumIm * sumIm;

  const fmt = (v: number) => v.toFixed(3);
  const phiDeg = ((phi * 180) / Math.PI).toFixed(0);

  const W = 360;
  const H = 220;
  const scale = 70; // pixels per amplitude unit

  // Arrow rendering helper
  const arrow = (cx: number, cy: number, dx: number, dy: number, color: string, label?: string) => {
    const x2 = cx + dx * scale;
    const y2 = cy - dy * scale;
    const headSize = 6;
    const angle = Math.atan2(y2 - cy, x2 - cx);
    return (
      <g key={`${cx}-${cy}-${color}-${label ?? ''}`}>
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" />
        <polygon
          points={`${x2},${y2} ${x2 - headSize * Math.cos(angle - Math.PI / 6)},${y2 - headSize * Math.sin(angle - Math.PI / 6)} ${x2 - headSize * Math.cos(angle + Math.PI / 6)},${y2 - headSize * Math.sin(angle + Math.PI / 6)}`}
          fill={color}
        />
        {label && (
          <text x={x2 + 8} y={y2 + 4} fill={color} fontSize="11" fontFamily="ui-monospace">
            {label}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="not-prose bg-bg-elevated border border-border rounded-md p-5 my-6 text-text-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Visualization: complex plane */}
        <div>
          <p className="eyebrow mb-2">Complex amplitude plane</p>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="w-full">
            {/* axes */}
            <line x1={W / 2} y1={10} x2={W / 2} y2={H - 10} stroke="#2A2F37" />
            <line x1={10} y1={H / 2} x2={W - 10} y2={H / 2} stroke="#2A2F37" />
            <text x={W - 16} y={H / 2 - 6} fill="#6B7280" fontSize="10" fontFamily="ui-monospace">Re</text>
            <text x={W / 2 + 6} y={16} fill="#6B7280" fontSize="10" fontFamily="ui-monospace">Im</text>
            {/* unit circle for reference */}
            <circle cx={W / 2} cy={H / 2} r={scale} fill="none" stroke="#1F242B" strokeDasharray="2,3" />
            {/* path A — fixed amplitude */}
            {arrow(W / 2, H / 2, ampA.re, ampA.im, '#00D9C0', 'A')}
            {/* path B — variable phase */}
            {arrow(W / 2, H / 2, ampB.re, ampB.im, '#FFB547', 'B')}
            {/* sum vector — the actual amplitude at the detector */}
            {arrow(W / 2, H / 2, sumRe, sumIm, '#7C5CFF', 'A+B')}
          </svg>
        </div>

        {/* Controls + readout */}
        <div>
          <p className="eyebrow mb-2">Phase of path B · φ = {phiDeg}°</p>
          <input
            type="range"
            min={0}
            max={2 * Math.PI}
            step={0.01}
            value={phi}
            onChange={(e) => setPhi(parseFloat(e.target.value))}
            className="w-full accent-accent-quantum"
          />

          <div className="flex gap-1.5 flex-wrap mt-2 mb-4">
            <button onClick={() => setPhi(0)} className="px-2 py-0.5 text-xs font-mono border border-border rounded-xs hover:bg-bg-surface">φ=0</button>
            <button onClick={() => setPhi(Math.PI / 2)} className="px-2 py-0.5 text-xs font-mono border border-border rounded-xs hover:bg-bg-surface">φ=π/2</button>
            <button onClick={() => setPhi(Math.PI)} className="px-2 py-0.5 text-xs font-mono border border-border rounded-xs hover:bg-bg-surface">φ=π</button>
            <button onClick={() => setPhi((3 * Math.PI) / 2)} className="px-2 py-0.5 text-xs font-mono border border-border rounded-xs hover:bg-bg-surface">φ=3π/2</button>
          </div>

          <div className="space-y-1 text-sm font-mono">
            <Row label="A" color="#00D9C0" value={`${fmt(ampA.re)} + ${fmt(ampA.im)}i`} />
            <Row label="B" color="#FFB547" value={`${fmt(ampB.re)} + ${fmt(ampB.im)}i`} />
            <Row label="A+B" color="#7C5CFF" value={`${fmt(sumRe)} + ${fmt(sumIm)}i`} />
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <p className="text-xs uppercase tracking-wider text-text-muted font-mono mb-1">P(detector clicks)</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-4 bg-bg rounded-xs overflow-hidden">
                <div
                  className="h-full bg-accent-quantum transition-[width] duration-150"
                  style={{ width: `${prob * 100}%` }}
                />
              </div>
              <span className="font-mono text-text-primary text-lg w-14 text-right">{(prob * 100).toFixed(0)}%</span>
            </div>
            <p className="mt-2 text-xs text-text-secondary leading-relaxed">
              {prob > 0.95
                ? '↑ Maximum constructive interference — same direction.'
                : prob < 0.05
                  ? '↓ Maximum destructive interference — opposite directions cancel.'
                  : 'The amplitudes partially cancel. Classical probability would always be 100%.'}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        Each path contributes an amplitude — a 2D vector with magnitude and direction. The detector
        sees the <em>sum</em> of these vectors. When they align, you get constructive interference
        (probability up to 100%). When they oppose, destructive (probability 0%). This is the actual
        mechanism behind every quantum speedup.
      </p>
    </div>
  );
}

function Row({ label, color, value }: { label: string; color: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-text-primary">
      <span style={{ color }} className="font-bold w-10">{label}</span>
      <span className="text-text-secondary">=</span>
      <span>{value}</span>
    </div>
  );
}
