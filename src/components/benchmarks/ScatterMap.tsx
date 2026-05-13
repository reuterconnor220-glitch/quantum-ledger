'use client';

import { useState } from 'react';
import type { Benchmark } from '@/lib/data/benchmarks';
import { getCompany } from '@/lib/data/companies';

const MODALITY_COLOR: Record<string, string> = {
  superconducting: '#7C5CFF',
  trapped_ion: '#00D9C0',
  neutral_atom: '#FFB547',
  photonic: '#FF5C7C',
  silicon_spin: '#60A5FA',
  topological: '#94A3B8',
  annealing: '#A78BFA',
  nv_center: '#10B981',
  bosonic: '#F472B6',
};

const MODALITY_LABEL: Record<string, string> = {
  superconducting: 'Superconducting',
  trapped_ion: 'Trapped Ion',
  neutral_atom: 'Neutral Atom',
  photonic: 'Photonic',
  silicon_spin: 'Silicon Spin',
  topological: 'Topological',
  annealing: 'Annealing',
  nv_center: 'NV-Center',
  bosonic: 'Bosonic',
};

/**
 * Scatter plot: log(physical qubits) vs 2Q gate fidelity.
 * Bubble size encodes logical qubits demonstrated (if any).
 * Color = modality. Click to filter; hover for details.
 */
export function ScatterMap({ benchmarks }: { benchmarks: Benchmark[] }) {
  const [activeModality, setActiveModality] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Benchmark | null>(null);

  const W = 760;
  const H = 380;
  const padL = 60;
  const padR = 20;
  const padT = 20;
  const padB = 50;

  // Only show entries with both physical qubits and 2Q fidelity disclosed
  const data = benchmarks.filter((b) => b.physicalQubits && b.twoQFidelity && b.confidence !== 'disputed');

  // X = log10(physical qubits) → 0..log10(5000) ≈ 3.7
  const xMin = 0;
  const xMax = Math.log10(5000);
  // Y = 2Q fidelity error (1 - fid) on log scale → from 0.001 (99.9%) to 0.1 (90%)
  const yMin = -4; // 99.99% → log10(0.0001)
  const yMax = -1; // 90%   → log10(0.1)

  const toX = (b: Benchmark) =>
    padL + (Math.log10(b.physicalQubits!) - xMin) / (xMax - xMin) * (W - padL - padR);
  const toY = (b: Benchmark) => {
    const err = 1 - b.twoQFidelity!;
    const ly = Math.log10(Math.max(err, 1e-5));
    return padT + (ly - yMin) / (yMax - yMin) * (H - padT - padB);
  };

  // Bubble radius from logical qubits
  const radius = (b: Benchmark) => {
    const lq = b.logicalQubits ?? 0;
    return 5 + Math.min(20, Math.sqrt(lq) * 2);
  };

  const modalities = Array.from(new Set(data.map((d) => d.modality)));

  return (
    <div className="card p-5">
      {/* Modality legend / filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveModality(null)}
          className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider border rounded-sm ${
            activeModality === null
              ? 'border-accent-quantum bg-accent-quantum text-white'
              : 'border-border text-text-secondary hover:bg-bg-surface'
          }`}
        >
          All ({data.length})
        </button>
        {modalities.map((m) => {
          const count = data.filter((d) => d.modality === m).length;
          return (
            <button
              key={m}
              onClick={() => setActiveModality(activeModality === m ? null : m)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider border rounded-sm ${
                activeModality === m
                  ? 'text-text-primary'
                  : 'border-border text-text-secondary hover:bg-bg-surface'
              }`}
              style={{ borderColor: activeModality === m ? MODALITY_COLOR[m] : undefined }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: MODALITY_COLOR[m] }} />
              {MODALITY_LABEL[m]} ({count})
            </button>
          );
        })}
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* Gridlines + axes */}
          {/* X gridlines at 1, 10, 100, 1000 */}
          {[1, 10, 100, 1000].map((tick) => {
            const x = padL + (Math.log10(tick) - xMin) / (xMax - xMin) * (W - padL - padR);
            return (
              <g key={tick}>
                <line x1={x} y1={padT} x2={x} y2={H - padB} stroke="#1F242B" strokeDasharray="2,3" />
                <text x={x} y={H - padB + 16} fill="#6B7280" fontSize="10" fontFamily="ui-monospace" textAnchor="middle">
                  {tick}
                </text>
              </g>
            );
          })}
          {/* Y gridlines at 99%, 99.9%, 99.99% */}
          {[
            { fid: 0.99, label: '99%' },
            { fid: 0.999, label: '99.9%' },
            { fid: 0.9999, label: '99.99%' },
          ].map(({ fid, label }) => {
            const err = 1 - fid;
            const ly = Math.log10(err);
            const y = padT + (ly - yMin) / (yMax - yMin) * (H - padT - padB);
            return (
              <g key={label}>
                <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#1F242B" strokeDasharray="2,3" />
                <text x={padL - 6} y={y + 3} fill="#6B7280" fontSize="10" fontFamily="ui-monospace" textAnchor="end">
                  {label}
                </text>
              </g>
            );
          })}
          {/* Axis labels */}
          <text x={(W - padR + padL) / 2} y={H - 8} fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace" textAnchor="middle">
            Physical qubits (log)
          </text>
          <text
            x={-(H - padB + padT) / 2}
            y={14}
            fill="#9CA3AF"
            fontSize="11"
            fontFamily="ui-monospace"
            textAnchor="middle"
            transform="rotate(-90)"
          >
            2Q Gate Fidelity
          </text>

          {/* "Fault-tolerant frontier" diagonal hint */}
          <line
            x1={padL}
            y1={padT}
            x2={W - padR}
            y2={padT}
            stroke="#00D9C0"
            strokeDasharray="3,4"
            strokeWidth="1"
            opacity="0.5"
          />
          <text x={W - padR - 8} y={padT - 4} fill="#00D9C0" fontSize="9" fontFamily="ui-monospace" textAnchor="end">
            FTQC threshold ~99.99%
          </text>

          {/* Data points */}
          {data.map((b) => {
            const x = toX(b);
            const y = toY(b);
            const r = radius(b);
            const dim = activeModality && activeModality !== b.modality;
            return (
              <g
                key={b.systemName}
                onMouseEnter={() => setHovered(b)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={MODALITY_COLOR[b.modality]}
                  fillOpacity={dim ? 0.1 : 0.35}
                  stroke={MODALITY_COLOR[b.modality]}
                  strokeWidth={dim ? 0.5 : 1.5}
                  strokeOpacity={dim ? 0.3 : 1}
                />
                {!dim && (b.logicalQubits ?? 0) > 5 && (
                  <text x={x} y={y + 3} fill="#E8EAED" fontSize="9" fontFamily="ui-monospace" textAnchor="middle">
                    {b.logicalQubits}L
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hovered && (
          <div className="absolute top-2 right-2 max-w-xs bg-bg border border-accent-quantum/40 rounded-sm p-3 text-xs font-mono shadow-lg pointer-events-none">
            <p className="text-text-primary font-sans font-medium mb-1">{hovered.systemName}</p>
            <p className="text-text-muted text-[10px] uppercase tracking-wider">{MODALITY_LABEL[hovered.modality]}</p>
            <div className="mt-2 space-y-0.5 text-text-secondary">
              <div>Physical: <span className="text-text-primary">{hovered.physicalQubits?.toLocaleString()}</span></div>
              <div>2Q Fid: <span className="text-text-primary">{(hovered.twoQFidelity! * 100).toFixed(2)}%</span></div>
              {hovered.logicalQubits != null && <div>Logical: <span className="text-text-primary">{hovered.logicalQubits}</span></div>}
              {hovered.notes && <div className="mt-1 text-text-muted italic text-[10px]">{hovered.notes.slice(0, 80)}{hovered.notes.length > 80 && '…'}</div>}
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-text-muted leading-relaxed">
        Each circle is a quantum system. <strong>X-axis</strong> = number of physical qubits (log scale).{' '}
        <strong>Y-axis</strong> = two-qubit gate fidelity. <strong>Bubble size</strong> ∝ logical qubits
        demonstrated (number shown when ≥5). The teal dashed line marks the ~99.99% fault-tolerance
        threshold. The corner you want to be in is <span className="text-text-primary">top-right</span>:
        high qubit count AND high fidelity. Today, no system is there yet.
      </p>
    </div>
  );
}

export const MODALITY_COLOR_MAP = MODALITY_COLOR;
