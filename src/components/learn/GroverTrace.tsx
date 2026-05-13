'use client';

import { useState, useMemo } from 'react';

/**
 * Grover's algorithm visualizer.
 * - N items total, one marked
 * - Initial uniform superposition has amplitude 1/√N for each
 * - Each Grover iteration rotates the state vector by 2θ where sin(θ) = 1/√N
 * - Probability of measuring marked item = sin²((2k+1)θ)
 *
 * User picks N and iteration count k. We show:
 *  - amplitude bar chart (marked vs unmarked)
 *  - 2D rotation picture
 *  - probability curve vs iterations
 */

function groverProb(N: number, k: number): number {
  if (N <= 1) return 1;
  const theta = Math.asin(1 / Math.sqrt(N));
  const s = Math.sin((2 * k + 1) * theta);
  return s * s;
}

function classicalProb(N: number, queries: number): number {
  // Probability that random sampling without replacement found it in `queries` tries
  if (N <= 0) return 0;
  return Math.min(1, queries / N);
}

function optimalIterations(N: number): number {
  return Math.round((Math.PI / 4) * Math.sqrt(N));
}

export function GroverTrace() {
  const [N, setN] = useState(8);
  const [k, setK] = useState(0);

  const optK = optimalIterations(N);
  const pMarked = groverProb(N, k);
  const pEach = (1 - pMarked) / (N - 1);
  const theta = Math.asin(1 / Math.sqrt(N));
  const rotated = (2 * k + 1) * theta; // angle from "unmarked" axis

  // Probability curve data
  const curve = useMemo(() => {
    const out: { k: number; pq: number; pc: number }[] = [];
    const maxK = Math.max(15, optK + 5);
    for (let i = 0; i <= maxK; i++) {
      out.push({
        k: i,
        pq: groverProb(N, i),
        pc: classicalProb(N, i),
      });
    }
    return out;
  }, [N, optK]);

  const maxBarHeight = 80;

  return (
    <div className="not-prose bg-bg-elevated border border-border rounded-md p-5 my-6">
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div className="flex-1 min-w-[180px]">
          <label className="block">
            <span className="eyebrow block mb-1">Items to search (N)</span>
            <input
              type="range"
              min={2}
              max={64}
              step={1}
              value={N}
              onChange={(e) => {
                setN(parseInt(e.target.value));
                setK(0);
              }}
              className="w-full accent-accent-quantum"
            />
            <span className="font-mono text-text-primary">{N} items</span>
            <span className="font-mono text-text-muted text-xs ml-2">
              · classical avg: {(N / 2).toFixed(0)} queries · quantum optimal: ~{optK}
            </span>
          </label>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block">
            <span className="eyebrow block mb-1">Grover iterations (k)</span>
            <input
              type="range"
              min={0}
              max={Math.max(15, optK + 5)}
              step={1}
              value={k}
              onChange={(e) => setK(parseInt(e.target.value))}
              className="w-full accent-accent-quantum"
            />
            <span className="font-mono text-text-primary">k = {k}</span>
            {k === optK && (
              <span className="ml-2 text-xs font-mono text-accent-data">★ optimal</span>
            )}
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        {/* Amplitude bar chart */}
        <div>
          <p className="eyebrow mb-2">Amplitude per item</p>
          <div className="bg-bg p-3 rounded-sm border border-border">
            <div className="flex items-end gap-0.5 h-[100px]">
              {Array.from({ length: N }, (_, i) => {
                const isMarked = i === Math.floor(N / 2);
                const prob = isMarked ? pMarked : pEach;
                const h = prob > 0 ? Math.sqrt(prob) * maxBarHeight : 0;
                return (
                  <div
                    key={i}
                    className={`flex-1 transition-all duration-300 rounded-t-xs ${
                      isMarked ? 'bg-accent-quantum' : 'bg-text-muted/50'
                    }`}
                    style={{ height: `${h}px`, minHeight: '2px' }}
                    title={`Item ${i}${isMarked ? ' (target)' : ''}: P = ${(prob * 100).toFixed(2)}%`}
                  />
                );
              })}
            </div>
            <div className="mt-2 flex justify-between text-xs font-mono text-text-muted">
              <span>0</span>
              <span>{N - 1}</span>
            </div>
            <div className="mt-3 flex gap-3 text-xs font-mono">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-xs bg-accent-quantum" />
                target: {(pMarked * 100).toFixed(1)}%
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-xs bg-text-muted/50" />
                others: {(pEach * 100).toFixed(2)}% each
              </span>
            </div>
          </div>
        </div>

        {/* 2D rotation picture */}
        <div>
          <p className="eyebrow mb-2">Geometric rotation · 2D subspace</p>
          <div className="bg-bg p-3 rounded-sm border border-border">
            <RotationDiagram theta={theta} rotated={rotated} />
            <p className="mt-2 text-xs font-mono text-text-muted">
              θ = {((theta * 180) / Math.PI).toFixed(1)}°, rotated to{' '}
              <span className="text-text-primary">{((rotated * 180) / Math.PI).toFixed(1)}°</span> from "unmarked"
            </p>
          </div>
        </div>
      </div>

      {/* Probability curve */}
      <div>
        <p className="eyebrow mb-2">Probability vs iterations</p>
        <div className="bg-bg p-3 rounded-sm border border-border">
          <ProbabilityCurve curve={curve} k={k} optK={optK} />
          <div className="mt-2 flex gap-4 text-xs font-mono">
            <span className="flex items-center gap-1">
              <span className="inline-block w-4 h-0.5 bg-accent-quantum" /> quantum (Grover)
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-4 h-0.5 bg-text-muted" /> classical (linear)
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        Each Grover iteration rotates the state vector by 2θ in a 2D subspace, pulling amplitude
        from "unmarked" to "marked." Optimal stop is ~π/(4√N) ≈ {optK} iterations. Quantum: ~√N
        queries. Classical: ~N/2. The speedup is universal — works for any search where you can
        recognize the answer but can't construct it directly.
      </p>
    </div>
  );
}

function RotationDiagram({ theta, rotated }: { theta: number; rotated: number }) {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const r = 60;
  // x-axis = "unmarked" direction, y-axis = "marked" direction
  // theta is angle from x-axis. rotated is current angle.
  const ix = cx + r * Math.cos(theta);
  const iy = cy - r * Math.sin(theta);
  const cx_ = cx + r * Math.cos(rotated);
  const cy_ = cy - r * Math.sin(rotated);

  return (
    <svg width="100%" height={size + 10} viewBox={`0 0 ${size} ${size + 10}`}>
      {/* axes */}
      <line x1={cx} y1={cy + r} x2={cx} y2={cy - r - 10} stroke="#2A2F37" />
      <line x1={cx - r - 10} y1={cy} x2={cx + r + 10} y2={cy} stroke="#2A2F37" />
      <text x={cx + r + 4} y={cy + 4} fill="#6B7280" fontSize="9" fontFamily="ui-monospace">unmarked</text>
      <text x={cx + 4} y={cy - r - 4} fill="#6B7280" fontSize="9" fontFamily="ui-monospace">marked</text>
      {/* arc — first quadrant only */}
      <path d={`M ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx} ${cy - r}`} fill="none" stroke="#1F242B" strokeDasharray="2,3" />
      {/* initial state */}
      <line x1={cx} y1={cy} x2={ix} y2={iy} stroke="#6B7280" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x={ix + 4} y={iy + 4} fill="#9CA3AF" fontSize="9" fontFamily="ui-monospace">|init⟩</text>
      {/* current state */}
      <line x1={cx} y1={cy} x2={cx_} y2={cy_} stroke="#7C5CFF" strokeWidth="2.5" />
      <circle cx={cx_} cy={cy_} r="4" fill="#7C5CFF" />
    </svg>
  );
}

function ProbabilityCurve({
  curve,
  k,
  optK,
}: {
  curve: { k: number; pq: number; pc: number }[];
  k: number;
  optK: number;
}) {
  const W = 480;
  const H = 100;
  const pad = 20;
  const stepX = (W - 2 * pad) / Math.max(1, curve.length - 1);

  const pq = curve.map((c, i) => `${pad + i * stepX},${H - pad - c.pq * (H - 2 * pad)}`).join(' ');
  const pc = curve.map((c, i) => `${pad + i * stepX},${H - pad - c.pc * (H - 2 * pad)}`).join(' ');
  const curK = k;
  const curX = pad + curK * stepX;

  return (
    <svg width="100%" height={H + 10} viewBox={`0 0 ${W} ${H + 10}`} preserveAspectRatio="none">
      {/* y axis grid */}
      <line x1={pad} y1={pad} x2={W - pad} y2={pad} stroke="#1F242B" />
      <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="#2A2F37" />
      <text x={2} y={pad + 4} fill="#6B7280" fontSize="9" fontFamily="ui-monospace">100%</text>
      <text x={2} y={H - pad + 4} fill="#6B7280" fontSize="9" fontFamily="ui-monospace">0%</text>
      {/* classical */}
      <polyline points={pc} fill="none" stroke="#6B7280" strokeWidth="1.5" strokeDasharray="3,3" />
      {/* quantum */}
      <polyline points={pq} fill="none" stroke="#7C5CFF" strokeWidth="2" />
      {/* current k marker */}
      <line x1={curX} y1={pad - 4} x2={curX} y2={H - pad} stroke="#00D9C0" strokeWidth="1" />
      <circle cx={curX} cy={H - pad - groverProb(curve.length > 0 ? Math.round((curve.length - 1) / 1) : 1, curK) * (H - 2 * pad)} r="3" fill="#00D9C0" />
      {/* optimal marker */}
      <line x1={pad + optK * stepX} y1={pad} x2={pad + optK * stepX} y2={H - pad} stroke="#FFB547" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  );
}
