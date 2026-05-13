'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * BB84 — the original quantum key distribution protocol.
 *
 * Alice sends a stream of single photons. For each, she picks:
 *   - a random bit (0 or 1)
 *   - a random basis: rectilinear (+) or diagonal (×)
 * Encoding:
 *   + basis: 0 → |H⟩ (horizontal), 1 → |V⟩ (vertical)
 *   × basis: 0 → |D⟩ (+45°),        1 → |A⟩ (-45°)
 *
 * Bob measures in a random basis. If his basis matches Alice's, he gets the right bit
 * (in the noise-free case). If it doesn't match, his outcome is random.
 *
 * After the quantum transmission, Alice and Bob publicly compare bases and discard mismatches.
 * The remaining "sifted key" should be identical bits. To detect eavesdroppers, they sacrifice
 * a small sample of bits and compare — any disagreement signals tampering.
 *
 * Eve's intercept-resend attack: she picks a random basis, measures, re-encodes Alice's photon
 * in HER basis. This introduces ~25% errors in the sifted key when she eavesdrops, which Alice
 * and Bob detect during error-check sampling.
 */

type Basis = '+' | '×';
type Bit = 0 | 1;

interface Run {
  aliceBit: Bit;
  aliceBasis: Basis;
  eveActive: boolean;
  eveBasis: Basis | null;
  eveBit: Bit | null;
  bobBasis: Basis;
  bobBit: Bit;
  basesMatch: boolean;
  errorOnMatch: boolean;
}

function randomBit(): Bit {
  return Math.random() < 0.5 ? 0 : 1;
}

function randomBasis(): Basis {
  return Math.random() < 0.5 ? '+' : '×';
}

/**
 * Measure Alice's photon in `measureBasis`. If bases match → return alice's bit.
 * If bases mismatch → return a random bit (the photon's amplitude is split 50/50).
 */
function measure(aliceBit: Bit, aliceBasis: Basis, measureBasis: Basis): Bit {
  if (aliceBasis === measureBasis) return aliceBit;
  return randomBit();
}

function fireRun(eveActive: boolean): Run {
  const aliceBit = randomBit();
  const aliceBasis = randomBasis();

  // Eve intercept-resend
  let eveBasis: Basis | null = null;
  let eveBit: Bit | null = null;
  let photonAfterEveBit: Bit = aliceBit;
  let photonAfterEveBasis: Basis = aliceBasis;
  if (eveActive) {
    eveBasis = randomBasis();
    eveBit = measure(aliceBit, aliceBasis, eveBasis);
    // Eve re-encodes the photon in HER basis with HER measured bit
    photonAfterEveBit = eveBit;
    photonAfterEveBasis = eveBasis;
  }

  const bobBasis = randomBasis();
  const bobBit = measure(photonAfterEveBit, photonAfterEveBasis, bobBasis);
  const basesMatch = aliceBasis === bobBasis;
  const errorOnMatch = basesMatch && bobBit !== aliceBit;

  return {
    aliceBit,
    aliceBasis,
    eveActive,
    eveBasis,
    eveBit,
    bobBasis,
    bobBit,
    basesMatch,
    errorOnMatch,
  };
}

export function BB84() {
  const [eveActive, setEveActive] = useState(false);
  const [runs, setRuns] = useState<Run[]>([]);
  const [autoFire, setAutoFire] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function fire(n: number) {
    setRuns((prev) => {
      const next = [...prev];
      for (let i = 0; i < n && next.length < 4000; i++) {
        next.push(fireRun(eveActive));
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
    intervalRef.current = setInterval(() => fire(10), 80);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFire, eveActive]);

  function reset() {
    setRuns([]);
    setAutoFire(false);
  }

  // Stats
  const total = runs.length;
  const sifted = runs.filter((r) => r.basesMatch);
  const errors = sifted.filter((r) => r.errorOnMatch).length;
  const errorRate = sifted.length > 0 ? errors / sifted.length : 0;
  // Show last ~16 runs as a visual stream
  const recent = runs.slice(-12);

  // QBER thresholds: with no eavesdropper the error rate should be 0 in this idealized model.
  // With eve doing intercept-resend, expected QBER is 25%.
  const eveDetected = sifted.length >= 100 && errorRate > 0.10;

  return (
    <div className="not-prose bg-bg-elevated border border-border rounded-md p-5 my-6 text-text-primary">
      {/* Diagram */}
      <div className="overflow-x-auto">
        <svg viewBox="0 0 720 220" className="w-full h-auto" style={{ minWidth: '600px' }}>
          {/* Alice box */}
          <g>
            <rect x={30} y={70} width={90} height={70} rx={6} fill="#1F2329" stroke="#3A3F47" />
            <text x={75} y={92} fill="#7C5CFF" fontSize={13} fontWeight={700} fontFamily="ui-monospace" textAnchor="middle">
              ALICE
            </text>
            <text x={75} y={108} fill="#9CA3AF" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
              sender
            </text>
            <text x={75} y={124} fill="#9CA3AF" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
              picks bit + basis
            </text>
          </g>

          {/* Photon path Alice → Eve area */}
          <line x1={120} y1={105} x2={310} y2={105} stroke="#7C5CFF" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="6,4">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite" />
          </line>

          {/* Eve (only when active) */}
          {eveActive && (
            <g>
              <rect x={310} y={70} width={100} height={70} rx={6} fill="#3a1a1a" stroke="#A04545" />
              <text x={360} y={92} fill="#FF6B6B" fontSize={13} fontWeight={700} fontFamily="ui-monospace" textAnchor="middle">
                EVE
              </text>
              <text x={360} y={108} fill="#FFB0B0" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
                intercept-resend
              </text>
              <text x={360} y={124} fill="#FFB0B0" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
                eavesdropper
              </text>
            </g>
          )}
          {!eveActive && (
            <g>
              <line x1={310} y1={105} x2={410} y2={105} stroke="#7C5CFF" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="6,4">
                <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite" />
              </line>
              <text x={360} y={98} fill="#9CA3AF" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
                quantum channel
              </text>
            </g>
          )}

          {/* Eve → Bob (when active) */}
          {eveActive && (
            <line x1={410} y1={105} x2={600} y2={105} stroke="#7C5CFF" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="6,4">
              <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite" />
            </line>
          )}
          {!eveActive && (
            <line x1={410} y1={105} x2={600} y2={105} stroke="#7C5CFF" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="6,4">
              <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite" />
            </line>
          )}

          {/* Bob box */}
          <g>
            <rect x={600} y={70} width={90} height={70} rx={6} fill="#1F2329" stroke="#3A3F47" />
            <text x={645} y={92} fill="#00D9C0" fontSize={13} fontWeight={700} fontFamily="ui-monospace" textAnchor="middle">
              BOB
            </text>
            <text x={645} y={108} fill="#9CA3AF" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
              receiver
            </text>
            <text x={645} y={124} fill="#9CA3AF" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
              picks random basis
            </text>
          </g>

          {/* Public classical channel below */}
          <line x1={75} y1={180} x2={645} y2={180} stroke="#FFB547" strokeWidth={1} strokeOpacity={0.4} strokeDasharray="2,4" />
          <text x={360} y={172} fill="#FFB547" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
            public classical channel · bases compared after transmission
          </text>
          <text x={360} y={195} fill="#FFB547" fontSize={9} fontFamily="ui-monospace" textAnchor="middle">
            sampled bits compared → any mismatch reveals eavesdropping
          </text>
        </svg>
      </div>

      {/* Stats strip */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
        <Stat label="Photons sent" value={total.toLocaleString()} />
        <Stat label="Sifted bits (bases match)" value={sifted.length.toLocaleString()} sub={total > 0 ? `${((sifted.length / total) * 100).toFixed(0)}% kept` : ''} />
        <Stat label="QBER (quantum bit error rate)" value={sifted.length > 0 ? `${(errorRate * 100).toFixed(1)}%` : '—'} positive={!eveDetected && sifted.length > 0} negative={eveDetected} />
        <Stat label="Verdict" value={sifted.length < 100 ? 'collecting…' : eveDetected ? 'EAVESDROPPER!' : 'channel clean'} positive={!eveDetected && sifted.length >= 100} negative={eveDetected} />
      </div>

      {/* Eve toggle and controls */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={eveActive}
            onChange={(e) => { setEveActive(e.target.checked); reset(); }}
            className="accent-accent-down w-4 h-4"
          />
          <span className="text-sm text-text-primary">
            Enable Eve (intercept-resend attack)
          </span>
        </label>
        <span className="text-xs font-mono text-text-muted">
          {eveActive ? 'Eve measures each photon in a random basis and re-emits — this introduces ~25% errors.' : 'Channel is currently clean.'}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
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
        <button onClick={() => fire(10)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-quantum hover:text-accent-quantum rounded-sm">+10 photons</button>
        <button onClick={() => fire(100)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-quantum hover:text-accent-quantum rounded-sm">+100</button>
        <button onClick={() => fire(1000)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-quantum hover:text-accent-quantum rounded-sm">+1000</button>
        <button onClick={reset} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-muted border border-border hover:text-text-primary rounded-sm">
          Reset
        </button>
      </div>

      {/* Recent runs trace */}
      {recent.length > 0 && (
        <div className="mt-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-accent-quantum font-mono mb-2">Latest {recent.length} photons</p>
          <div className="card overflow-x-auto">
            <table className="ql-table w-full text-xs">
              <thead>
                <tr>
                  <th className="pl-3">Alice bit</th>
                  <th>Alice basis</th>
                  {eveActive && <th>Eve basis</th>}
                  {eveActive && <th>Eve bit</th>}
                  <th>Bob basis</th>
                  <th>Bob bit</th>
                  <th>Kept?</th>
                  <th className="pr-3">Error?</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i}>
                    <td className="pl-3 font-mono text-accent-quantum">{r.aliceBit}</td>
                    <td className="font-mono text-accent-quantum">{r.aliceBasis}</td>
                    {eveActive && <td className="font-mono text-accent-down">{r.eveBasis}</td>}
                    {eveActive && <td className="font-mono text-accent-down">{r.eveBit}</td>}
                    <td className="font-mono text-accent-data">{r.bobBasis}</td>
                    <td className="font-mono text-accent-data">{r.bobBit}</td>
                    <td className={r.basesMatch ? 'text-accent-data' : 'text-text-muted'}>
                      {r.basesMatch ? '✓' : '—'}
                    </td>
                    <td className={`pr-3 ${r.errorOnMatch ? 'text-accent-down font-semibold' : 'text-text-muted'}`}>
                      {r.basesMatch ? (r.errorOnMatch ? '✗' : '✓') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        <strong>What you&apos;re seeing:</strong> Alice picks a random bit and a random measurement
        basis (rectilinear &quot;+&quot; or diagonal &quot;×&quot;) for each photon. Bob picks a
        random basis to measure. After the quantum transmission, they publicly compare bases on the
        classical channel and keep only the bits where bases matched — the &quot;sifted key.&quot; To
        verify the channel was not eavesdropped, they sacrifice a sample of sifted bits and compare them publicly.
        With no Eve, sifted bits agree perfectly. With Eve doing intercept-resend, ~25% of sifted bits
        disagree — a clear signal of tampering. This impossibility-to-eavesdrop-undetected is the
        foundation of every commercial QKD product deployed today (China&apos;s backbone, EuroQCI, Swiss
        banks, Korean telcos).
      </p>
    </div>
  );
}

function Stat({ label, value, sub, positive, negative }: { label: string; value: string; sub?: string; positive?: boolean; negative?: boolean }) {
  return (
    <div className="bg-bg-surface p-3">
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p
        className={`mt-0.5 font-mono text-base ${
          negative ? 'text-accent-down' : positive ? 'text-accent-data' : 'text-text-primary'
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-[10px] font-mono text-text-muted mt-0.5">{sub}</p>}
    </div>
  );
}
