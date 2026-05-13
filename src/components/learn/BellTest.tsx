'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Bell test / CHSH inequality demonstrator.
 *
 * Source emits singlet pairs: |Ψ⁻⟩ = (|01⟩ - |10⟩) / √2
 * For polarizer angles θ_A and θ_B, P(opposite outcomes) = cos²((θ_A - θ_B)/2)
 *
 * Quantum correlation: E(θ_A, θ_B) = -cos(2(θ_A - θ_B))
 *  ... no wait. With outcomes ±1 measured along axes θ_A, θ_B, on a singlet:
 *  E(θ_A, θ_B) = -cos(θ_A - θ_B)
 *
 * CHSH operator: S = E(a,b) - E(a,b') + E(a',b) + E(a',b')
 * Classical (local hidden variable) bound: |S| ≤ 2
 * Quantum (Tsirelson) bound: |S| ≤ 2√2 ≈ 2.828
 *
 * Canonical violating angles: a=0°, a'=90°, b=45°, b'=135°  →  S = 2√2
 */

interface Outcome {
  aAngle: number;
  bAngle: number;
  aResult: 1 | -1;
  bResult: 1 | -1;
}

const CANONICAL = {
  a: 0,
  aPrime: 90,
  b: 45,
  bPrime: 135,
};

function singletProbabilityOpposite(thetaA: number, thetaB: number): number {
  const diff = ((thetaA - thetaB) * Math.PI) / 180;
  return Math.cos(diff / 2) ** 2;
}

function fireSinglet(thetaA: number, thetaB: number): { a: 1 | -1; b: 1 | -1 } {
  const pOpposite = singletProbabilityOpposite(thetaA, thetaB);
  const flip = Math.random() < pOpposite;
  // Whichever way Alice measures, Bob is anti-correlated with probability pOpposite.
  const a: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
  const b: 1 | -1 = flip ? (-a as 1 | -1) : a;
  return { a, b };
}

function computeE(outcomes: Outcome[], thetaA: number, thetaB: number): { value: number; n: number } {
  const matching = outcomes.filter((o) => o.aAngle === thetaA && o.bAngle === thetaB);
  if (matching.length === 0) return { value: 0, n: 0 };
  const sum = matching.reduce((s, o) => s + o.aResult * o.bResult, 0);
  return { value: sum / matching.length, n: matching.length };
}

export function BellTest() {
  const [aAngle, setAAngle] = useState(CANONICAL.a);
  const [aPrimeAngle, setAPrimeAngle] = useState(CANONICAL.aPrime);
  const [bAngle, setBAngle] = useState(CANONICAL.b);
  const [bPrimeAngle, setBPrimeAngle] = useState(CANONICAL.bPrime);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [autoFire, setAutoFire] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const Eab = computeE(outcomes, aAngle, bAngle);
  const EabPrime = computeE(outcomes, aAngle, bPrimeAngle);
  const EaPrimeB = computeE(outcomes, aPrimeAngle, bAngle);
  const EaPrimeBPrime = computeE(outcomes, aPrimeAngle, bPrimeAngle);
  const S = Eab.value - EabPrime.value + EaPrimeB.value + EaPrimeBPrime.value;
  const totalShots = Eab.n + EabPrime.n + EaPrimeB.n + EaPrimeBPrime.n;
  const minPerSetting = Math.min(Eab.n, EabPrime.n, EaPrimeB.n, EaPrimeBPrime.n);

  function fire(n: number) {
    setOutcomes((prev) => {
      const next = [...prev];
      const settings = [
        [aAngle, bAngle],
        [aAngle, bPrimeAngle],
        [aPrimeAngle, bAngle],
        [aPrimeAngle, bPrimeAngle],
      ];
      for (let i = 0; i < n; i++) {
        const [tA, tB] = settings[Math.floor(Math.random() * 4)];
        const { a, b } = fireSinglet(tA, tB);
        next.push({ aAngle: tA, bAngle: tB, aResult: a, bResult: b });
        if (next.length > 10000) next.shift();
      }
      return next;
    });
  }

  useEffect(() => {
    if (!autoFire) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    intervalRef.current = setInterval(() => fire(20), 60);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFire, aAngle, aPrimeAngle, bAngle, bPrimeAngle]);

  function reset() {
    setOutcomes([]);
    setAutoFire(false);
  }

  function setCanonical() {
    setAAngle(CANONICAL.a);
    setAPrimeAngle(CANONICAL.aPrime);
    setBAngle(CANONICAL.b);
    setBPrimeAngle(CANONICAL.bPrime);
    reset();
  }

  // Visualization scale: S goes from -2√2 to +2√2, classical bound at ±2
  const sQuantumMax = 2 * Math.SQRT2;
  const sPosition = Math.max(-sQuantumMax, Math.min(sQuantumMax, S));
  const inQuantumRegime = Math.abs(S) > 2;

  return (
    <div className="not-prose bg-bg-elevated border border-border rounded-md p-5 my-6 text-text-primary">
      {/* Diagram */}
      <div className="overflow-x-auto">
        <svg viewBox="0 0 720 200" className="w-full h-auto" style={{ minWidth: '600px' }}>
          {/* Background */}
          <rect x={0} y={0} width={720} height={200} fill="transparent" />

          {/* Entangled source in the middle */}
          <g>
            <circle cx={360} cy={100} r={30} fill="#7C5CFF" fillOpacity={0.15} />
            <circle cx={360} cy={100} r={14} fill="#7C5CFF">
              <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x={360} y={155} fill="#9CA3AF" fontSize={11} fontFamily="ui-monospace" textAnchor="middle">
              entangled source
            </text>
            <text x={360} y={170} fill="#7C5CFF" fontSize={10} fontFamily="ui-monospace" textAnchor="middle">
              |Ψ⁻⟩ = (|01⟩ − |10⟩)/√2
            </text>
          </g>

          {/* Lines from source to Alice and Bob */}
          <line x1={330} y1={100} x2={120} y2={100} stroke="#7C5CFF" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="6,4">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1={390} y1={100} x2={600} y2={100} stroke="#7C5CFF" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="6,4">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite" />
          </line>

          {/* Alice */}
          <g>
            <rect x={50} y={70} width={70} height={60} rx={4} fill="#1F2329" stroke="#3A3F47" />
            <text x={85} y={92} fill="#7C5CFF" fontSize={12} fontWeight={600} fontFamily="ui-monospace" textAnchor="middle">
              ALICE
            </text>
            <text x={85} y={108} fill="#9CA3AF" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
              detector
            </text>
            <text x={85} y={122} fill="#FFB547" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
              a = {aAngle}° / a&apos; = {aPrimeAngle}°
            </text>
          </g>

          {/* Bob */}
          <g>
            <rect x={600} y={70} width={70} height={60} rx={4} fill="#1F2329" stroke="#3A3F47" />
            <text x={635} y={92} fill="#00D9C0" fontSize={12} fontWeight={600} fontFamily="ui-monospace" textAnchor="middle">
              BOB
            </text>
            <text x={635} y={108} fill="#9CA3AF" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
              detector
            </text>
            <text x={635} y={122} fill="#FFB547" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
              b = {bAngle}° / b&apos; = {bPrimeAngle}°
            </text>
          </g>
        </svg>
      </div>

      {/* CHSH meter */}
      <div className="mt-4">
        <div className="flex justify-between text-xs font-mono mb-2">
          <span className="text-text-secondary">
            CHSH = E(a,b) − E(a,b&apos;) + E(a&apos;,b) + E(a&apos;,b&apos;)
          </span>
          <span className={inQuantumRegime ? 'text-accent-quantum font-semibold' : 'text-text-primary'}>
            S = {totalShots > 0 ? S.toFixed(3) : '—'}
          </span>
        </div>
        <div className="relative h-7 bg-bg rounded-sm border border-border overflow-hidden">
          {/* Classical regime bands (|S| <= 2) */}
          <div
            className="absolute top-0 h-full bg-text-muted/15"
            style={{
              left: `${((-2 + sQuantumMax) / (2 * sQuantumMax)) * 100}%`,
              width: `${(4 / (2 * sQuantumMax)) * 100}%`,
            }}
          />
          {/* Marker */}
          <div
            className={`absolute top-0 h-full w-1 transition-all ${
              inQuantumRegime ? 'bg-accent-quantum' : 'bg-text-secondary'
            }`}
            style={{
              left: `${((sPosition + sQuantumMax) / (2 * sQuantumMax)) * 100}%`,
              boxShadow: inQuantumRegime ? '0 0 8px rgba(124,92,255,0.7)' : 'none',
            }}
          />
          {/* Boundary lines */}
          <div className="absolute top-0 h-full w-px bg-accent-down/60" style={{ left: '14.6%' }} />
          <div className="absolute top-0 h-full w-px bg-accent-down/60" style={{ left: '85.4%' }} />
          <div className="absolute top-0 h-full w-px bg-text-muted/60" style={{ left: '50%' }} />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-text-muted mt-1">
          <span>−2√2</span>
          <span className="text-accent-down">−2 (classical)</span>
          <span>0</span>
          <span className="text-accent-down">+2 (classical)</span>
          <span>+2√2</span>
        </div>
      </div>

      {/* Verdict */}
      <div className="mt-4">
        {totalShots < 200 ? (
          <p className="text-sm text-text-secondary">
            Fire some photon pairs to start computing the CHSH correlation.{' '}
            {totalShots > 0 && `So far: ${totalShots} trials, ${minPerSetting} per setting.`}
          </p>
        ) : !inQuantumRegime && totalShots < 1000 ? (
          <p className="text-sm text-text-secondary">
            {totalShots} trials in. CHSH is still warming up — fire more to see the asymptotic behavior.
          </p>
        ) : inQuantumRegime ? (
          <p className="text-sm">
            <span className="text-accent-quantum font-semibold">|S| {'>'} 2.</span>{' '}
            <span className="text-text-primary">
              No local hidden-variable theory can explain this. Quantum mechanics predicts |S| ≤ 2√2 ≈ 2.828; classical correlations can never exceed 2.
            </span>
          </p>
        ) : (
          <p className="text-sm">
            <span className="text-text-secondary font-semibold">|S| ≤ 2.</span>{' '}
            <span className="text-text-secondary">
              These angle choices stay inside the classical bound. Try the canonical violating angles (0°/90°/45°/135°).
            </span>
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-accent-quantum font-mono mb-2">Alice angles</p>
          <AngleSlider label="a" value={aAngle} onChange={(v) => { setAAngle(v); reset(); }} />
          <AngleSlider label="a'" value={aPrimeAngle} onChange={(v) => { setAPrimeAngle(v); reset(); }} />
          <p className="text-[10px] uppercase tracking-[0.18em] text-accent-data font-mono mb-2 mt-4">Bob angles</p>
          <AngleSlider label="b" value={bAngle} onChange={(v) => { setBAngle(v); reset(); }} />
          <AngleSlider label="b'" value={bPrimeAngle} onChange={(v) => { setBPrimeAngle(v); reset(); }} />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-accent-quantum font-mono mb-2">Fire entangled pairs</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => setAutoFire((v) => !v)}
              className={`px-4 py-2 text-sm font-mono font-semibold rounded-sm transition ${
                autoFire
                  ? 'bg-accent-data text-white border border-accent-data shadow-[0_0_12px_rgba(0,217,192,0.4)]'
                  : 'bg-accent-quantum text-white border border-accent-quantum hover:bg-accent-quantum/85'
              }`}
            >
              {autoFire ? '■ Stop stream' : '▶ Start stream'}
            </button>
            <button onClick={() => fire(100)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-quantum hover:text-accent-quantum rounded-sm">+100</button>
            <button onClick={() => fire(1000)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-quantum hover:text-accent-quantum rounded-sm">+1000</button>
            <button onClick={reset} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-muted border border-border hover:text-text-primary rounded-sm">
              Reset
            </button>
          </div>
          <button onClick={setCanonical} className="text-xs font-mono text-accent-quantum hover:underline">
            ↺ Reset to canonical violating angles (0° / 90° / 45° / 135°)
          </button>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
            <CorrCell label={`E(a, b) — ${aAngle}°,${bAngle}°`} value={Eab.value} n={Eab.n} />
            <CorrCell label={`E(a, b') — ${aAngle}°,${bPrimeAngle}°`} value={EabPrime.value} n={EabPrime.n} />
            <CorrCell label={`E(a', b) — ${aPrimeAngle}°,${bAngle}°`} value={EaPrimeB.value} n={EaPrimeB.n} />
            <CorrCell label={`E(a', b') — ${aPrimeAngle}°,${bPrimeAngle}°`} value={EaPrimeBPrime.value} n={EaPrimeBPrime.n} />
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        <strong>What you&apos;re seeing:</strong> An entangled photon pair is created in the middle.
        Alice and Bob each measure one photon at a randomly chosen polarizer angle. The product of
        their two ±1 outcomes is averaged across many trials to compute the correlation E. CHSH (S) combines
        four correlation measurements. Any theory where each photon has a pre-existing answer to the
        question &quot;what would you do at angle X?&quot; must satisfy |S| ≤ 2. Quantum mechanics
        violates this, up to 2√2. The 1982 Aspect experiment, refined by Hensen (2015) and three 2022 Nobel-winning
        teams, confirmed the violation experimentally — proving the universe really is nonlocal.
      </p>
    </div>
  );
}

function AngleSlider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block mb-3">
      <div className="flex justify-between text-xs font-mono mb-1">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-primary">{value}°</span>
      </div>
      <input
        type="range"
        min={0}
        max={180}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full accent-accent-quantum"
      />
    </label>
  );
}

function CorrCell({ label, value, n }: { label: string; value: number; n: number }) {
  const sign = value >= 0 ? '+' : '';
  return (
    <div className="card p-2">
      <p className="text-[10px] text-text-muted truncate" title={label}>{label}</p>
      <p className="text-text-primary mt-0.5">
        {n === 0 ? '—' : `${sign}${value.toFixed(3)}`}
        <span className="text-text-muted text-[10px] ml-1">({n})</span>
      </p>
    </div>
  );
}
