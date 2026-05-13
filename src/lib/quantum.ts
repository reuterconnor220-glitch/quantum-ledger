/**
 * Tiny browser-side quantum simulator used by the /learn interactive widgets.
 * Supports up to ~4 qubits — state vector approach. Pure functions, no deps.
 */

export interface Complex {
  re: number;
  im: number;
}

export const cx = (re: number, im = 0): Complex => ({ re, im });
export const cAdd = (a: Complex, b: Complex): Complex => ({ re: a.re + b.re, im: a.im + b.im });
export const cSub = (a: Complex, b: Complex): Complex => ({ re: a.re - b.re, im: a.im - b.im });
export const cMul = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});
export const cScale = (a: Complex, s: number): Complex => ({ re: a.re * s, im: a.im * s });
export const cMag = (a: Complex): number => Math.sqrt(a.re * a.re + a.im * a.im);
export const cMag2 = (a: Complex): number => a.re * a.re + a.im * a.im;
export const cPhase = (a: Complex): number => Math.atan2(a.im, a.re);
export const cConj = (a: Complex): Complex => ({ re: a.re, im: -a.im });

/** Format a complex number for display */
export function fmtComplex(c: Complex, precision = 3): string {
  if (Math.abs(c.im) < 1e-6) return c.re.toFixed(precision);
  if (Math.abs(c.re) < 1e-6) return `${c.im.toFixed(precision)}i`;
  const sign = c.im >= 0 ? '+' : '−';
  return `${c.re.toFixed(precision)}${sign}${Math.abs(c.im).toFixed(precision)}i`;
}

/** State vector — length 2^n, each entry a complex amplitude */
export type State = Complex[];

export function makeState(n: number): State {
  const s: State = new Array(1 << n).fill(null).map(() => cx(0, 0));
  s[0] = cx(1, 0); // |00...0⟩
  return s;
}

export function clone(s: State): State {
  return s.map((c) => ({ ...c }));
}

const ROOT_HALF = 1 / Math.sqrt(2);

const GATES: Record<string, Complex[][]> = {
  I: [[cx(1), cx(0)], [cx(0), cx(1)]],
  X: [[cx(0), cx(1)], [cx(1), cx(0)]],
  Y: [[cx(0), cx(0, -1)], [cx(0, 1), cx(0)]],
  Z: [[cx(1), cx(0)], [cx(0), cx(-1)]],
  H: [[cx(ROOT_HALF), cx(ROOT_HALF)], [cx(ROOT_HALF), cx(-ROOT_HALF)]],
  S: [[cx(1), cx(0)], [cx(0), cx(0, 1)]],
  T: [[cx(1), cx(0)], [cx(0), cx(Math.cos(Math.PI / 4), Math.sin(Math.PI / 4))]],
};

export type SingleQubitGate = keyof typeof GATES;

/** Apply a single-qubit gate to a state vector on qubit `q` (0-indexed from least significant) */
export function applyGate1(state: State, gate: SingleQubitGate, q: number, nQubits: number): State {
  const M = GATES[gate];
  const out: State = new Array(state.length).fill(null).map(() => cx(0, 0));
  for (let i = 0; i < state.length; i++) {
    const bit = (i >> q) & 1;
    const partnerIdx = i ^ (1 << q); // flip qubit q
    const i0 = bit === 0 ? i : partnerIdx;
    const i1 = bit === 0 ? partnerIdx : i;
    // For row `bit`, we sum M[bit][0]*amp[i0] + M[bit][1]*amp[i1]
    out[i] = cAdd(
      cMul(M[bit][0], state[i0]),
      cMul(M[bit][1], state[i1])
    );
  }
  return out;
}

/** Apply CNOT with `control` and `target` qubits */
export function applyCNOT(state: State, control: number, target: number): State {
  const out = clone(state);
  for (let i = 0; i < state.length; i++) {
    const ctl = (i >> control) & 1;
    if (ctl === 1) {
      // swap amplitudes between i and i ^ (1 << target)
      const partner = i ^ (1 << target);
      if (partner > i) {
        const tmp = out[i];
        out[i] = out[partner];
        out[partner] = tmp;
      }
    }
  }
  return out;
}

/** Probability of measuring qubit q to be in |1⟩ */
export function prob1(state: State, q: number): number {
  let p = 0;
  for (let i = 0; i < state.length; i++) {
    if ((i >> q) & 1) p += cMag2(state[i]);
  }
  return p;
}

/** Full probability distribution over basis states */
export function probs(state: State): number[] {
  return state.map(cMag2);
}

/** Single-shot measurement of the entire state — returns the basis state index that was measured */
export function measure(state: State, rng: () => number = Math.random): number {
  const r = rng();
  let acc = 0;
  for (let i = 0; i < state.length; i++) {
    acc += cMag2(state[i]);
    if (r < acc) return i;
  }
  return state.length - 1;
}

/** Multi-shot sampling for histograms */
export function sampleShots(state: State, n: number, rng: () => number = Math.random): number[] {
  const counts = new Array(state.length).fill(0);
  for (let i = 0; i < n; i++) {
    counts[measure(state, rng)]++;
  }
  return counts;
}

/** Format a state vector as Dirac notation, dropping near-zero terms */
export function fmtState(state: State, nQubits: number, precision = 3): string {
  const terms: string[] = [];
  for (let i = 0; i < state.length; i++) {
    if (cMag(state[i]) < 1e-6) continue;
    const bin = i.toString(2).padStart(nQubits, '0');
    const amp = fmtComplex(state[i], precision);
    // Pretty-print if amp is exactly ±1
    if (Math.abs(state[i].re - 1) < 1e-6 && Math.abs(state[i].im) < 1e-6) {
      terms.push(`|${bin}⟩`);
    } else if (Math.abs(state[i].re + 1) < 1e-6 && Math.abs(state[i].im) < 1e-6) {
      terms.push(`−|${bin}⟩`);
    } else {
      terms.push(`(${amp})|${bin}⟩`);
    }
  }
  if (!terms.length) return '0';
  return terms.join(' + ').replaceAll(' + −', ' − ').replaceAll(' + (−', ' − (');
}

/** Bloch coordinates (x, y, z) for a single-qubit state |ψ⟩ = α|0⟩ + β|1⟩ */
export function blochCoords(alpha: Complex, beta: Complex): { x: number; y: number; z: number } {
  // <X> = 2 Re(α*β), <Y> = 2 Im(α*β), <Z> = |α|² - |β|²
  const ab = cMul(cConj(alpha), beta);
  return {
    x: 2 * ab.re,
    y: 2 * ab.im,
    z: cMag2(alpha) - cMag2(beta),
  };
}

/** Get reduced single-qubit Bloch coordinates from a multi-qubit state by partial tracing */
export function reducedBloch(state: State, q: number, nQubits: number): { x: number; y: number; z: number } {
  // <X_q> = sum over basis states i where bit q is flipped of 2*Re(state[i] * conj(state[i^(1<<q)]))
  // Use simple formulas via density matrix elements
  let p0 = 0, p1 = 0;
  let offRe = 0, offIm = 0;
  for (let i = 0; i < state.length; i++) {
    const bit = (i >> q) & 1;
    if (bit === 0) {
      p0 += cMag2(state[i]);
      // off-diagonal: <0_q|ρ|1_q> with other qubits matching
      const partner = i ^ (1 << q);
      // For reduced density of qubit q: ρ_01 = sum over other-qubits of psi_0,other * conj(psi_1,other)
      const psi0 = state[i];
      const psi1 = state[partner];
      const term = cMul(psi0, cConj(psi1));
      offRe += term.re;
      offIm += term.im;
    } else {
      p1 += cMag2(state[i]);
    }
  }
  return { x: 2 * offRe, y: 2 * offIm, z: p0 - p1 };
}
