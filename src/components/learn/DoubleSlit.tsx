'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The double-slit experiment — pedagogical version.
 *
 * Three modes:
 *  - 1 slit: single diffraction bump
 *  - 2 slits, unobserved: interference fringes from single photons
 *  - 2 slits, observed: pattern collapses to two bumps (= classical prediction)
 *
 * Visual hooks:
 *  - Photon hits drawn large with a teal glow so they're unmistakable.
 *  - Two prediction curves overlaid: the classical "sum of two slits" expectation (gray
 *    dashed) and the actual quantum probability density (cyan). In observed mode the
 *    two curves coincide — that's the whole pedagogical point.
 *  - Clear "what you should expect" vs "what you actually got" callouts under the SVG.
 */

const SCREEN_W = 760;
const SCREEN_H = 420;
const SOURCE_X = 50;
const WALL_X = 320;
const DETECTOR_X = 700;
const CENTER_Y = SCREEN_H / 2;
const SLIT_HEIGHT = 28;

function sinc(x: number) {
  if (Math.abs(x) < 1e-6) return 1;
  return Math.sin(x) / x;
}

function classicalDensity(y: number, opts: {
  slits: 1 | 2;
  wavelength: number;
  slitWidth: number;
  slitSep: number;
  L: number;
}): number {
  const { slits, wavelength, slitWidth, slitSep, L } = opts;
  const x = y - CENTER_Y;
  if (slits === 1) {
    return sinc((Math.PI * slitWidth * x) / (wavelength * L)) ** 2;
  }
  const e1 = sinc((Math.PI * slitWidth * (x - slitSep / 2)) / (wavelength * L)) ** 2;
  const e2 = sinc((Math.PI * slitWidth * (x + slitSep / 2)) / (wavelength * L)) ** 2;
  return 0.5 * (e1 + e2);
}

function quantumDensity(y: number, opts: {
  slits: 1 | 2;
  measureWhich: boolean;
  wavelength: number;
  slitWidth: number;
  slitSep: number;
  L: number;
}): number {
  const { slits, measureWhich, wavelength, slitWidth, slitSep, L } = opts;
  if (slits === 1 || measureWhich) {
    return classicalDensity(y, opts);
  }
  const x = y - CENTER_Y;
  const envelope = sinc((Math.PI * slitWidth * x) / (wavelength * L)) ** 2;
  const fringe = Math.cos((Math.PI * slitSep * x) / (wavelength * L)) ** 2;
  return envelope * fringe;
}

function sampleY(opts: Parameters<typeof quantumDensity>[1], rng: () => number = Math.random): number {
  for (let attempts = 0; attempts < 200; attempts++) {
    const y = rng() * SCREEN_H;
    const p = quantumDensity(y, opts);
    if (rng() < p) return y;
  }
  return CENTER_Y;
}

interface Hit {
  x: number;
  y: number;
  t: number;
}

export function DoubleSlit() {
  const [slits, setSlits] = useState<1 | 2>(2);
  const [measureWhich, setMeasureWhich] = useState(false);
  const [wavelength, setWavelength] = useState(70);
  const [slitSep, setSlitSep] = useState(70);
  const [slitWidth, setSlitWidth] = useState(20);
  const [hits, setHits] = useState<Hit[]>([]);
  const [showCurves, setShowCurves] = useState(true);
  const [autoFire, setAutoFire] = useState(false);
  const tCounter = useRef(0);

  const opts = { slits, measureWhich, wavelength, slitWidth, slitSep, L: 360 };

  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    const seedOpts = { slits: 2 as 1 | 2, measureWhich: false, wavelength: 70, slitWidth: 20, slitSep: 70, L: 360 };
    setHits(() => {
      const seed: Hit[] = [];
      for (let i = 0; i < 60; i++) {
        seed.push({ x: DETECTOR_X + (Math.random() - 0.5) * 4, y: sampleY(seedOpts), t: tCounter.current++ });
      }
      return seed;
    });
  }, []);

  useEffect(() => {
    if (!autoFire) return;
    const interval = setInterval(() => {
      setHits((h) => {
        if (h.length >= 1000) return h;
        const y = sampleY(opts);
        return [...h, { x: DETECTOR_X + (Math.random() - 0.5) * 4, y, t: tCounter.current++ }];
      });
    }, 28);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFire, slits, measureWhich, wavelength, slitSep, slitWidth]);

  function fire(n: number) {
    setHits((h) => {
      const next = [...h];
      for (let i = 0; i < n && next.length < 1500; i++) {
        const y = sampleY(opts);
        next.push({ x: DETECTOR_X + (Math.random() - 0.5) * 4, y, t: tCounter.current++ });
      }
      return next;
    });
  }

  function reset() {
    setHits([]);
    tCounter.current = 0;
    setAutoFire(false);
  }

  // Build curves
  const curveSamples = 100;
  const classicalSamples: number[] = [];
  const quantumSamples: number[] = [];
  let classicalMax = 0;
  let quantumMax = 0;
  for (let i = 0; i <= curveSamples; i++) {
    const y = (i / curveSamples) * SCREEN_H;
    const c = classicalDensity(y, opts);
    const q = quantumDensity(y, opts);
    classicalSamples.push(c);
    quantumSamples.push(q);
    if (c > classicalMax) classicalMax = c;
    if (q > quantumMax) quantumMax = q;
  }
  const sharedMax = Math.max(classicalMax, quantumMax);
  const classicalPoints: string[] = [];
  const quantumPoints: string[] = [];
  for (let i = 0; i <= curveSamples; i++) {
    const y = (i / curveSamples) * SCREEN_H;
    classicalPoints.push(`${DETECTOR_X + 18 + (classicalSamples[i] / sharedMax) * 38},${y}`);
    quantumPoints.push(`${DETECTOR_X + 18 + (quantumSamples[i] / sharedMax) * 38},${y}`);
  }

  const slit1Y = CENTER_Y + (slits === 2 ? -slitSep / 2 : 0);
  const slit2Y = CENTER_Y + slitSep / 2;

  const curvesMatch = slits === 1 || measureWhich;

  return (
    <div className="not-prose bg-bg-elevated border border-border rounded-md p-5 my-6 text-text-primary">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${SCREEN_W} ${SCREEN_H}`} className="w-full h-auto" style={{ minWidth: '640px' }}>
          <defs>
            <radialGradient id="ds-photon-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D9C0" stopOpacity="1" />
              <stop offset="60%" stopColor="#00D9C0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00D9C0" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ds-source-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D9C0" stopOpacity="1" />
              <stop offset="100%" stopColor="#00D9C0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Source */}
          <circle cx={SOURCE_X} cy={CENTER_Y} r="22" fill="url(#ds-source-glow)" />
          <circle cx={SOURCE_X} cy={CENTER_Y} r="7" fill="#00D9C0">
            <animate attributeName="r" values="7;10;7" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x={SOURCE_X} y={CENTER_Y + 42} fill="#9CA3AF" fontSize="13" fontFamily="ui-monospace" textAnchor="middle">
            photon source
          </text>

          {/* Rays */}
          <line x1={SOURCE_X + 8} y1={CENTER_Y} x2={WALL_X - 6} y2={slit1Y} stroke="#00D9C0" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="5,4" />
          {slits === 2 && (
            <line x1={SOURCE_X + 8} y1={CENTER_Y} x2={WALL_X - 6} y2={slit2Y} stroke="#00D9C0" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="5,4" />
          )}

          {/* Wall */}
          <rect x={WALL_X - 5} y={0} width={10} height={slit1Y - SLIT_HEIGHT / 2} fill="#3A3F47" />
          {slits === 1 ? (
            <rect x={WALL_X - 5} y={slit1Y + SLIT_HEIGHT / 2} width={10} height={SCREEN_H - (slit1Y + SLIT_HEIGHT / 2)} fill="#3A3F47" />
          ) : (
            <>
              <rect x={WALL_X - 5} y={slit1Y + SLIT_HEIGHT / 2} width={10} height={slit2Y - SLIT_HEIGHT / 2 - (slit1Y + SLIT_HEIGHT / 2)} fill="#3A3F47" />
              <rect x={WALL_X - 5} y={slit2Y + SLIT_HEIGHT / 2} width={10} height={SCREEN_H - (slit2Y + SLIT_HEIGHT / 2)} fill="#3A3F47" />
            </>
          )}

          {/* Observers */}
          {measureWhich && slits === 2 && (
            <>
              <circle cx={WALL_X + 18} cy={slit1Y} r="11" fill="#FFB547" fillOpacity="0.18" />
              <circle cx={WALL_X + 18} cy={slit1Y} r="6" fill="#FFB547" />
              <circle cx={WALL_X + 18} cy={slit2Y} r="11" fill="#FFB547" fillOpacity="0.18" />
              <circle cx={WALL_X + 18} cy={slit2Y} r="6" fill="#FFB547" />
              <text x={WALL_X + 36} y={slit1Y + 4} fill="#FFB547" fontSize="12" fontFamily="ui-monospace">
                detector
              </text>
              <text x={WALL_X + 36} y={slit2Y + 4} fill="#FFB547" fontSize="12" fontFamily="ui-monospace">
                detector
              </text>
            </>
          )}

          {/* Wavefronts (only unobserved) */}
          {!measureWhich && [0, 1, 2, 3, 4].map((i) => (
            <g key={`wf-${i}`} opacity={0.22 - i * 0.04}>
              <ellipse cx={WALL_X + 5} cy={slit1Y} rx={30 + i * 40} ry={30 + i * 40} fill="none" stroke="#00D9C0" strokeWidth="0.9" />
              {slits === 2 && (
                <ellipse cx={WALL_X + 5} cy={slit2Y} rx={30 + i * 40} ry={30 + i * 40} fill="none" stroke="#00D9C0" strokeWidth="0.9" />
              )}
            </g>
          ))}

          {/* Detector wall */}
          <line x1={DETECTOR_X} y1={20} x2={DETECTOR_X} y2={SCREEN_H - 20} stroke="#6B7280" strokeWidth="2.5" />
          <text x={DETECTOR_X} y={SCREEN_H - 4} fill="#9CA3AF" fontSize="13" fontFamily="ui-monospace" textAnchor="middle">
            detector screen
          </text>

          {/* Hits — with glow */}
          {hits.map((h, i) => (
            <g key={i}>
              <circle cx={h.x} cy={h.y} r="5" fill="url(#ds-photon-glow)" />
              <circle cx={h.x} cy={h.y} r="2.2" fill="#00D9C0" />
            </g>
          ))}

          {/* Prediction curves */}
          {showCurves && (
            <>
              {!curvesMatch && (
                <polyline
                  points={classicalPoints.join(' ')}
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="1.6"
                  strokeOpacity="0.85"
                  strokeDasharray="6,4"
                />
              )}
              <polyline
                points={quantumPoints.join(' ')}
                fill="none"
                stroke="#00D9C0"
                strokeWidth="2"
                strokeOpacity="0.95"
              />
            </>
          )}

          {/* Top headers */}
          <text x={WALL_X} y={18} fill="#E8EAED" fontSize="13" fontFamily="ui-monospace" fontWeight="600" textAnchor="middle">
            {slits === 1 ? 'ONE SLIT' : measureWhich ? 'TWO SLITS · OBSERVED' : 'TWO SLITS · UNOBSERVED'}
          </text>
          <text x={(WALL_X + DETECTOR_X) / 2 + 30} y={18} fill="#9CA3AF" fontSize="13" fontFamily="ui-monospace" textAnchor="middle">
            {hits.length} photons fired
          </text>

          {/* Legend (curves) */}
          {showCurves && (
            <g transform={`translate(${DETECTOR_X - 200}, ${SCREEN_H - 32})`}>
              <line x1="0" y1="0" x2="22" y2="0" stroke="#00D9C0" strokeWidth="2" />
              <text x="28" y="4" fill="#E8EAED" fontSize="11" fontFamily="ui-monospace">
                quantum prediction
              </text>
              {!curvesMatch && (
                <g transform="translate(0, 14)">
                  <line x1="0" y1="0" x2="22" y2="0" stroke="#9CA3AF" strokeWidth="1.6" strokeDasharray="6,4" />
                  <text x="28" y="4" fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace">
                    classical (particle) prediction
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Verdict bar */}
      <div className={`mt-4 rounded-sm border px-4 py-3 text-sm leading-snug ${
        curvesMatch
          ? 'bg-accent-warn/10 border-accent-warn/40 text-text-primary'
          : 'bg-accent-data/10 border-accent-data/40 text-text-primary'
      }`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] block mb-1 text-text-muted">
          {curvesMatch ? 'matches classical expectation' : 'defies classical expectation'}
        </span>
        {slits === 1 && (
          <>One slit produces a single diffraction bump. A classical-particle model predicts the same thing. Nothing weird yet.</>
        )}
        {slits === 2 && !measureWhich && (
          <>Classical physics says two slits should give two bumps (gray dashed line). Quantum reality gives <strong>interference fringes</strong> (cyan) — even when photons go through one at a time.</>
        )}
        {slits === 2 && measureWhich && (
          <>Adding which-slit detectors collapses the wave. The interference pattern <strong>vanishes</strong> and the result matches the classical two-bump prediction exactly.</>
        )}
      </div>

      {/* Mode toggles */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <ModeCard
          title="1 slit"
          subtitle="control"
          active={slits === 1}
          onClick={() => {
            setSlits(1);
            setMeasureWhich(false);
            reset();
          }}
          description="Single diffraction bump. Boring on purpose — the baseline."
        />
        <ModeCard
          title="2 slits · unobserved"
          subtitle="the famous result"
          active={slits === 2 && !measureWhich}
          onClick={() => {
            setSlits(2);
            setMeasureWhich(false);
            reset();
          }}
          description="Interference fringes appear — even with one photon at a time."
          highlight
        />
        <ModeCard
          title="2 slits · observed"
          subtitle="add a detector"
          active={slits === 2 && measureWhich}
          onClick={() => {
            setSlits(2);
            setMeasureWhich(true);
            reset();
          }}
          description="Watching the slits collapses the wave. Pattern reverts to two bumps."
        />
      </div>

      {/* Controls */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="space-y-3">
          <Slider label="Wavelength λ" value={wavelength} min={20} max={140} step={1} onChange={setWavelength} />
          {slits === 2 && (
            <Slider label="Slit separation d" value={slitSep} min={30} max={140} step={1} onChange={setSlitSep} />
          )}
          <Slider label="Slit width a" value={slitWidth} min={6} max={50} step={1} onChange={setSlitWidth} />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-accent-data font-mono mb-2">Fire photons</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => setAutoFire((v) => !v)}
              className={`px-4 py-2 text-sm font-mono font-semibold rounded-sm transition border ${
                autoFire
                  ? 'bg-accent-data text-bg border-accent-data shadow-[0_0_12px_rgba(0,217,192,0.4)]'
                  : 'bg-bg-surface text-text-primary border-border hover:border-accent-data hover:text-accent-data'
              }`}
            >
              {autoFire ? '■ Stop stream' : '▶ Start stream'}
            </button>
            <button onClick={() => fire(1)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-data hover:text-accent-data rounded-sm">+1</button>
            <button onClick={() => fire(10)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-data hover:text-accent-data rounded-sm">+10</button>
            <button onClick={() => fire(100)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-data hover:text-accent-data rounded-sm">+100</button>
            <button onClick={reset} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-muted border border-border hover:text-text-primary rounded-sm">
              Reset
            </button>
          </div>
          <label className="flex items-center gap-2 text-xs font-mono text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={showCurves}
              onChange={(e) => setShowCurves(e.target.checked)}
              className="accent-accent-data"
            />
            Show prediction curves (classical vs quantum)
          </label>
        </div>
      </div>

      <p className="mt-5 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        <strong className="text-text-secondary">Try this:</strong> Start on{' '}
        <strong className="text-text-secondary">2 slits · unobserved</strong>. Hit{' '}
        <em>Start stream</em>. Watch single photons hit apparently random spots — but the
        pattern that <em>emerges</em> tracks the cyan curve, not the gray classical one.
        Then switch to <strong className="text-text-secondary">2 slits · observed</strong>.
        The moment you peek at which slit each photon went through, the interference vanishes
        and the cyan curve snaps onto the classical one. The act of measurement physically
        changes the experiment.
      </p>
    </div>
  );
}

function ModeCard({
  title,
  subtitle,
  description,
  active,
  onClick,
  highlight = false,
}: {
  title: string;
  subtitle: string;
  description: string;
  active: boolean;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-3 rounded-sm border transition ${
        active
          ? 'bg-accent-data/15 border-accent-data text-text-primary'
          : highlight
            ? 'bg-bg-surface border-accent-data/40 hover:border-accent-data text-text-primary'
            : 'bg-bg-surface border-border hover:border-text-secondary text-text-primary'
      }`}
    >
      <p className="font-display text-base leading-tight text-text-primary">{title}</p>
      <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-text-muted mt-0.5">{subtitle}</p>
      <p className="text-xs mt-1.5 leading-relaxed text-text-secondary">{description}</p>
    </button>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex justify-between text-xs font-mono text-text-secondary mb-1">
        <span>{label}</span>
        <span className="text-text-primary">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-accent-data"
      />
    </label>
  );
}
