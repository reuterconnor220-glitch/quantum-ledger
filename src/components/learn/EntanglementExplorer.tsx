'use client';

import { useState } from 'react';
import {
  makeState,
  applyGate1,
  applyCNOT,
  reducedBloch,
  fmtState,
  probs,
  sampleShots,
  type State,
} from '@/lib/quantum';

const N = 2;

interface HistoryItem {
  label: string;
}

export function EntanglementExplorer() {
  const [state, setState] = useState<State>(() => makeState(N));
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [shots, setShots] = useState<number[] | null>(null);

  function applyAndLog(label: string, fn: (s: State) => State) {
    setState((s) => fn(s));
    setHistory((h) => [...h, { label }]);
    setShots(null);
  }

  function reset() {
    setState(makeState(N));
    setHistory([]);
    setShots(null);
  }

  function measure() {
    const counts = sampleShots(state, 200);
    setShots(counts);
  }

  // Bloch for each qubit (reduced — if entangled, |r| < 1, sphere "shrinks")
  const b0 = reducedBloch(state, 0, N);
  const b1 = reducedBloch(state, 1, N);
  const purity0 = Math.sqrt(b0.x * b0.x + b0.y * b0.y + b0.z * b0.z);
  const purity1 = Math.sqrt(b1.x * b1.x + b1.y * b1.y + b1.z * b1.z);
  const entangled = purity0 < 0.999;

  const p = probs(state);
  const stateStr = fmtState(state, N);

  return (
    <div className="not-prose bg-bg-elevated border border-border rounded-md p-5 my-6 text-text-primary">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Two Bloch spheres */}
        <div className="flex gap-3 mx-auto md:mx-0">
          <BlochQubit label="Q1" coords={b0} purity={purity0} />
          <BlochQubit label="Q2" coords={b1} purity={purity1} />
        </div>

        <div className="flex-1 w-full">
          <p className="eyebrow mb-2">Joint state</p>
          <div className="bg-bg p-3 rounded-sm border border-border font-mono text-sm break-all min-h-[44px] text-text-primary">
            |ψ⟩ = {stateStr}
          </div>

          {entangled && (
            <p className="mt-2 text-xs text-accent-quantum font-mono">
              ⚡ Q1 and Q2 are entangled — neither has a defined Bloch direction on its own.
            </p>
          )}

          <p className="eyebrow mt-4 mb-2">Gates · click to apply</p>
          <div className="flex flex-wrap gap-2">
            <Btn onClick={() => applyAndLog('H₁', (s) => applyGate1(s, 'H', 0, N))}>H on Q1</Btn>
            <Btn onClick={() => applyAndLog('H₂', (s) => applyGate1(s, 'H', 1, N))}>H on Q2</Btn>
            <Btn onClick={() => applyAndLog('X₁', (s) => applyGate1(s, 'X', 0, N))}>X on Q1</Btn>
            <Btn onClick={() => applyAndLog('X₂', (s) => applyGate1(s, 'X', 1, N))}>X on Q2</Btn>
            <Btn onClick={() => applyAndLog('Z₁', (s) => applyGate1(s, 'Z', 0, N))}>Z on Q1</Btn>
            <Btn onClick={() => applyAndLog('CNOT', (s) => applyCNOT(s, 0, 1))}>CNOT (Q1→Q2)</Btn>
          </div>

          <p className="eyebrow mt-4 mb-2">Try presets</p>
          <div className="flex flex-wrap gap-2">
            <PresetBtn onClick={() => { reset(); }}>Reset |00⟩</PresetBtn>
            <PresetBtn
              onClick={() => {
                reset();
                setTimeout(() => {
                  setState((s) => applyCNOT(applyGate1(s, 'H', 0, N), 0, 1));
                  setHistory([{ label: 'H₁' }, { label: 'CNOT' }]);
                }, 0);
              }}
            >
              ★ Bell state Φ⁺
            </PresetBtn>
            <PresetBtn
              onClick={() => {
                reset();
                setTimeout(() => {
                  let s = applyGate1(makeState(N), 'X', 1, N);
                  s = applyGate1(s, 'H', 0, N);
                  s = applyCNOT(s, 0, 1);
                  setState(s);
                  setHistory([{ label: 'X₂' }, { label: 'H₁' }, { label: 'CNOT' }]);
                }, 0);
              }}
            >
              Bell Φ⁻
            </PresetBtn>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={measure} className="px-3 py-1.5 text-sm font-medium bg-accent-quantum text-white rounded-sm hover:bg-accent-quantum/90">
              Measure (200 shots)
            </button>
            <button onClick={reset} className="px-3 py-1.5 text-sm font-mono border border-border rounded-sm hover:bg-bg-surface">
              Reset
            </button>
          </div>

          {history.length > 0 && (
            <p className="mt-3 text-xs font-mono text-text-muted">
              Applied: {history.map((h) => h.label).join(' → ')}
            </p>
          )}
        </div>
      </div>

      {/* Probability bars / shot histogram */}
      <div className="mt-5 border-t border-border pt-4">
        <p className="eyebrow mb-3">Outcome probabilities {shots && '· 200 measurements'}</p>
        <div className="space-y-1.5">
          {['00', '01', '10', '11'].map((b, i) => {
            const prob = p[i];
            const shotPct = shots ? shots[i] / 200 : null;
            return (
              <div key={b} className="flex items-center gap-3 text-xs font-mono">
                <span className="w-10 text-text-secondary">|{b}⟩</span>
                <div className="flex-1 h-5 bg-bg rounded-xs overflow-hidden relative">
                  <div
                    className="h-full bg-accent-quantum/30 transition-all duration-300"
                    style={{ width: `${prob * 100}%` }}
                  />
                  {shotPct !== null && (
                    <div
                      className="absolute top-0 left-0 h-full bg-accent-data/70 border-r-2 border-accent-data"
                      style={{ width: `${shotPct * 100}%` }}
                    />
                  )}
                </div>
                <span className="w-20 text-right text-text-primary tabular-nums">
                  {(prob * 100).toFixed(1)}%
                  {shots && <span className="text-accent-data ml-1">({shots[i]})</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        Try the <strong className="text-text-secondary">Bell state Φ⁺</strong> preset (apply H to Q1 then
        CNOT). Notice both Bloch spheres collapse to the origin — neither qubit has a definite
        direction. Yet 200 measurements give you either 00 or 11 (never 01 or 10) — the two qubits
        are perfectly correlated even though individually they look random.
      </p>
    </div>
  );
}

function BlochQubit({
  label,
  coords,
  purity,
}: {
  label: string;
  coords: { x: number; y: number; z: number };
  purity: number;
}) {
  const R = 50;
  const cx = 70;
  const cy = 70;
  const px = cx + coords.x * R - coords.y * R * 0.3;
  const py = cy - coords.z * R + coords.y * R * 0.15;

  return (
    <div className="text-center">
      <p className="text-xs font-mono text-accent-quantum mb-1">{label}</p>
      <svg width={140} height={140} viewBox="0 0 140 140">
        {/* sphere outline + equator */}
        <ellipse cx={cx} cy={cy} rx={R} ry={R * 0.3} fill="none" stroke="#2A2F37" strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#3A3F47" strokeWidth="1" />
        <line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke="#2A2F37" strokeWidth="0.6" />
        <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke="#2A2F37" strokeWidth="0.6" />
        <text x={cx + 4} y={cy - R - 2} fill="#9CA3AF" fontSize="9" fontFamily="ui-monospace">|0⟩</text>
        <text x={cx + 4} y={cy + R + 12} fill="#9CA3AF" fontSize="9" fontFamily="ui-monospace">|1⟩</text>
        {/* State vector — fade when purity < 1 (mixed state, entangled) */}
        {purity > 0.001 && (
          <>
            <line
              x1={cx}
              y1={cy}
              x2={px}
              y2={py}
              stroke="#7C5CFF"
              strokeWidth="2"
              strokeOpacity={purity}
            />
            <circle cx={px} cy={py} r="4" fill="#7C5CFF" fillOpacity={purity} />
          </>
        )}
        {/* mixed-state fade indicator: dot at origin */}
        {purity < 0.999 && (
          <circle cx={cx} cy={cy} r="3" fill="#FF5C7C" fillOpacity={1 - purity} />
        )}
      </svg>
      <p className="text-[10px] font-mono text-text-muted">
        |r| = {purity.toFixed(2)} {purity < 0.999 && '(mixed)'}
      </p>
    </div>
  );
}

function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-xs font-mono bg-bg-surface border border-border rounded-sm hover:bg-accent-quantum hover:border-accent-quantum hover:text-white transition"
    >
      {children}
    </button>
  );
}

function PresetBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-xs font-mono bg-bg-surface border border-border rounded-sm hover:bg-bg-elevated text-text-secondary"
    >
      {children}
    </button>
  );
}
