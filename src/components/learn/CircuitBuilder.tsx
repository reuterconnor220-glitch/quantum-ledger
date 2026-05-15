'use client';

import { useState, useMemo } from 'react';
import {
  makeState,
  applyGate1,
  applyCNOT,
  sampleShots,
  type State,
  type SingleQubitGate,
} from '@/lib/quantum';

const N = 2;
const COLS = 5;

type GateChoice = SingleQubitGate | 'CNOT_C' | 'CNOT_T' | null;

interface Slot {
  gate: GateChoice;
  // For CNOT, the partner row is implied (the other row in same column)
}

const GATE_COLORS: Record<string, string> = {
  H: 'bg-accent-data',
  X: 'bg-accent-data',
  Y: 'bg-accent-data',
  Z: 'bg-accent-data',
  S: 'bg-accent-data',
  T: 'bg-accent-data',
  CNOT_C: 'bg-accent-data',
  CNOT_T: 'bg-accent-data',
};

function emptyCircuit(): Slot[][] {
  return Array.from({ length: N }, () =>
    Array.from({ length: COLS }, () => ({ gate: null }))
  );
}

function simulate(circuit: Slot[][]): State {
  let s = makeState(N);
  for (let col = 0; col < COLS; col++) {
    // Check for CNOT in this column
    let cnotControl = -1;
    let cnotTarget = -1;
    for (let q = 0; q < N; q++) {
      const g = circuit[q][col].gate;
      if (g === 'CNOT_C') cnotControl = q;
      if (g === 'CNOT_T') cnotTarget = q;
    }
    if (cnotControl >= 0 && cnotTarget >= 0) {
      s = applyCNOT(s, cnotControl, cnotTarget);
    }
    // Apply single-qubit gates in this column
    for (let q = 0; q < N; q++) {
      const g = circuit[q][col].gate;
      if (g && g !== 'CNOT_C' && g !== 'CNOT_T') {
        s = applyGate1(s, g, q, N);
      }
    }
  }
  return s;
}

export function CircuitBuilder() {
  const [circuit, setCircuit] = useState<Slot[][]>(emptyCircuit);
  const [palette, setPalette] = useState<GateChoice>('H');
  const [shots, setShots] = useState<number[] | null>(null);

  const state = useMemo(() => simulate(circuit), [circuit]);

  function placeAt(row: number, col: number) {
    setCircuit((c) => {
      const next = c.map((r) => r.map((s) => ({ ...s })));
      if (palette === null) {
        next[row][col].gate = null;
      } else if (palette === 'CNOT_C') {
        // Place control on clicked row, target on the OTHER row in same column
        const other = row === 0 ? 1 : 0;
        next[row][col].gate = 'CNOT_C';
        next[other][col].gate = 'CNOT_T';
      } else if (palette === 'CNOT_T') {
        // same as control but flipped
        const other = row === 0 ? 1 : 0;
        next[row][col].gate = 'CNOT_T';
        next[other][col].gate = 'CNOT_C';
      } else {
        next[row][col].gate = palette;
      }
      return next;
    });
    setShots(null);
  }

  function run(numShots: number) {
    setShots(sampleShots(state, numShots));
  }

  function reset() {
    setCircuit(emptyCircuit());
    setShots(null);
  }

  function loadPreset(name: 'bell' | 'ghz-like' | 'super') {
    const c = emptyCircuit();
    if (name === 'bell') {
      c[0][0].gate = 'H';
      c[0][1].gate = 'CNOT_C';
      c[1][1].gate = 'CNOT_T';
    } else if (name === 'super') {
      c[0][0].gate = 'H';
      c[1][0].gate = 'H';
    } else if (name === 'ghz-like') {
      c[0][0].gate = 'H';
      c[0][1].gate = 'CNOT_C';
      c[1][1].gate = 'CNOT_T';
      c[0][2].gate = 'X';
    }
    setCircuit(c);
    setShots(null);
  }

  const probs = state.map((c) => c.re * c.re + c.im * c.im);

  return (
    <div className="not-prose bg-bg-elevated border border-border rounded-md p-5 my-6 text-text-primary">
      {/* Gate palette */}
      <div className="mb-4">
        <p className="eyebrow mb-2">Gate palette · click then click a circuit cell</p>
        <div className="flex flex-wrap gap-1.5">
          {(['H', 'X', 'Y', 'Z', 'S', 'T'] as const).map((g) => (
            <PaletteBtn key={g} active={palette === g} onClick={() => setPalette(g)} colorClass={GATE_COLORS[g]}>
              {g}
            </PaletteBtn>
          ))}
          <PaletteBtn active={palette === 'CNOT_C'} onClick={() => setPalette('CNOT_C')} colorClass={GATE_COLORS.CNOT_C}>
            ● CNOT
          </PaletteBtn>
          <PaletteBtn active={palette === null} onClick={() => setPalette(null)} colorClass="bg-bg">
            ⌫ Erase
          </PaletteBtn>
        </div>
      </div>

      {/* Circuit grid */}
      <div className="mb-4 overflow-x-auto">
        <div className="inline-block min-w-full">
          {circuit.map((row, ri) => (
            <div key={ri} className="flex items-center gap-1 mb-1">
              <span className="font-mono text-xs text-text-secondary w-10">q{ri} :</span>
              <div className="flex-1 flex items-center relative">
                {/* wire line */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
                {row.map((slot, ci) => (
                  <button
                    key={ci}
                    onClick={() => placeAt(ri, ci)}
                    className="relative z-10 mx-1 first:ml-0 last:mr-0 w-12 h-12 rounded-sm bg-bg border border-border hover:border-accent-data flex items-center justify-center"
                  >
                    {slot.gate === 'CNOT_C' ? (
                      <span className="w-3 h-3 rounded-full bg-accent-data" />
                    ) : slot.gate === 'CNOT_T' ? (
                      <span className="w-5 h-5 rounded-full border-2 border-accent-data flex items-center justify-center text-accent-data text-xs leading-none">+</span>
                    ) : slot.gate ? (
                      <span className={`w-9 h-9 rounded-xs flex items-center justify-center text-bg font-mono text-sm font-bold ${GATE_COLORS[slot.gate] ?? 'bg-bg-surface'}`}>
                        {slot.gate}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
              <span className="font-mono text-xs text-text-muted w-12">→ |·⟩</span>
            </div>
          ))}
          {/* CNOT vertical lines */}
          <svg
            width="100%"
            height="0"
            style={{ marginTop: '-90px', height: '90px', pointerEvents: 'none', display: 'block' }}
            className="overflow-visible"
          >
            {circuit[0].map((_, col) => {
              const top = circuit[0][col].gate;
              const bot = circuit[1][col].gate;
              if ((top === 'CNOT_C' && bot === 'CNOT_T') || (top === 'CNOT_T' && bot === 'CNOT_C')) {
                const slotWidth = 56; // approximate
                const x = 40 + col * slotWidth + 24;
                return (
                  <line key={col} x1={x} y1={20} x2={x} y2={70} stroke="#00D9C0" strokeWidth="2" />
                );
              }
              return null;
            })}
          </svg>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <button onClick={() => run(100)} className="px-3 py-1.5 text-sm font-medium bg-accent-data text-bg rounded-sm hover:bg-accent-data/90">
          Run · 100 shots
        </button>
        <button onClick={() => run(1000)} className="px-3 py-1.5 text-sm font-medium bg-bg-surface text-text-primary border border-border hover:border-accent-data hover:text-accent-data rounded-sm">
          Run · 1,000 shots
        </button>
        <button onClick={reset} className="px-3 py-1.5 text-sm font-mono border border-border rounded-sm hover:bg-bg-surface">
          Clear
        </button>
        <span className="text-xs font-mono text-text-muted ml-2">Presets:</span>
        <button onClick={() => loadPreset('super')} className="px-2 py-0.5 text-xs font-mono border border-border rounded-xs hover:bg-bg-surface">
          Superposition
        </button>
        <button onClick={() => loadPreset('bell')} className="px-2 py-0.5 text-xs font-mono border border-border rounded-xs hover:bg-bg-surface">
          ★ Bell state
        </button>
        <button onClick={() => loadPreset('ghz-like')} className="px-2 py-0.5 text-xs font-mono border border-border rounded-xs hover:bg-bg-surface">
          Bell + X
        </button>
      </div>

      {/* Histogram */}
      <div className="border-t border-border pt-4">
        <p className="eyebrow mb-2">
          Outcome probabilities {shots && `· measured ${shots.reduce((s, c) => s + c, 0)} times`}
        </p>
        <div className="space-y-1.5">
          {['00', '01', '10', '11'].map((b, i) => {
            const prob = probs[i];
            const shotN = shots?.[i] ?? 0;
            const total = shots?.reduce((s, c) => s + c, 0) ?? 0;
            const shotPct = shots && total > 0 ? shotN / total : null;
            return (
              <div key={b} className="flex items-center gap-3 text-xs font-mono">
                <span className="w-10 text-text-secondary">|{b}⟩</span>
                <div className="flex-1 h-5 bg-bg rounded-xs overflow-hidden relative">
                  <div
                    className="h-full bg-text-muted/30 transition-all duration-300"
                    style={{ width: `${prob * 100}%` }}
                  />
                  {shotPct !== null && (
                    <div
                      className="absolute top-0 left-0 h-full bg-accent-data/70 border-r-2 border-accent-data"
                      style={{ width: `${shotPct * 100}%` }}
                    />
                  )}
                </div>
                <span className="w-24 text-right text-text-primary tabular-nums">
                  {(prob * 100).toFixed(1)}%
                  {shots && <span className="text-accent-data ml-1">({shotN})</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        The faded bar is the theoretical quantum probability. The brighter teal overlay shows actual
        measurement outcomes from your shots — they should converge toward the prediction as you run
        more. Try the <strong className="text-text-secondary">Bell state</strong> preset to see two
        qubits entangle and produce only |00⟩ and |11⟩.
      </p>
    </div>
  );
}

function PaletteBtn({
  active,
  onClick,
  children,
  colorClass,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  colorClass: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-mono font-medium rounded-sm transition border ${
        active
          ? `${colorClass} text-white border-transparent`
          : 'bg-bg-surface text-text-secondary border-border hover:bg-bg'
      }`}
    >
      {children}
    </button>
  );
}
