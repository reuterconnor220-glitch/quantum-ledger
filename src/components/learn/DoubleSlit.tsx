'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The double-slit experiment — interactive single-photon-at-a-time build-up.
 *
 * Three modes:
 *  - 1 slit: single diffraction bump (boring)
 *  - 2 slits, no observation: interference fringes emerge from random photons
 *  - 2 slits, "which-slit" measurement on: interference collapses to two bumps
 *
 * Math: I(x) ∝ cos²(πd·x / λL) × sinc²(πa·x / λL)
 * where d = slit separation, a = slit width, λ = wavelength, L = screen distance
 */

const SCREEN_W = 720;
const SCREEN_H = 380;
const SOURCE_X = 50;
const WALL_X = 320;
const DETECTOR_X = 680;
const CENTER_Y = SCREEN_H / 2;
const SLIT_HEIGHT = 26;

function sinc(x: number) {
  if (Math.abs(x) < 1e-6) return 1;
  return Math.sin(x) / x;
}

/** Probability density along the detector y position, given config */
function probDensity(y: number, opts: {
  slits: 1 | 2;
  measureWhich: boolean;
  wavelength: number;     // arbitrary unit
  slitWidth: number;
  slitSep: number;
  L: number;              // screen distance
}): number {
  const { slits, measureWhich, wavelength, slitWidth, slitSep, L } = opts;
  const x = y - CENTER_Y;
  const envelope = sinc((Math.PI * slitWidth * x) / (wavelength * L)) ** 2;
  if (slits === 1) {
    return envelope;
  }
  // Two slits
  if (measureWhich) {
    // Classical: sum of two slit envelopes shifted
    const e1 = sinc((Math.PI * slitWidth * (x - slitSep / 2)) / (wavelength * L)) ** 2;
    const e2 = sinc((Math.PI * slitWidth * (x + slitSep / 2)) / (wavelength * L)) ** 2;
    return 0.5 * (e1 + e2);
  }
  // Quantum: interference
  const fringe = Math.cos((Math.PI * slitSep * x) / (wavelength * L)) ** 2;
  return envelope * fringe;
}

/** Sample y from the probability density using rejection sampling */
function sampleY(opts: Parameters<typeof probDensity>[1], rng: () => number = Math.random): number {
  // Probability density peaks at center (= 1). Rejection sample over [0, SCREEN_H]
  for (let attempts = 0; attempts < 200; attempts++) {
    const y = rng() * SCREEN_H;
    const p = probDensity(y, opts);
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
  const [showOverlay, setShowOverlay] = useState(true);
  const [autoFire, setAutoFire] = useState(false);
  const tCounter = useRef(0);

  const opts = { slits, measureWhich, wavelength, slitWidth, slitSep, L: 360 };

  // First-render seed: fire a few photons so the widget visibly demonstrates itself.
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    const seedOpts = { slits: 2 as 1 | 2, measureWhich: false, wavelength: 70, slitWidth: 20, slitSep: 70, L: 360 };
    setHits(() => {
      const seed: Hit[] = [];
      for (let i = 0; i < 40; i++) {
        seed.push({ x: DETECTOR_X + (Math.random() - 0.5) * 3, y: sampleY(seedOpts), t: tCounter.current++ });
      }
      return seed;
    });
  }, []);

  // Auto-fire mode — adds particles continuously
  useEffect(() => {
    if (!autoFire) return;
    const interval = setInterval(() => {
      setHits((h) => {
        if (h.length >= 800) return h;
        const y = sampleY(opts);
        return [...h, { x: DETECTOR_X + (Math.random() - 0.5) * 3, y, t: tCounter.current++ }];
      });
    }, 30);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFire, slits, measureWhich, wavelength, slitSep, slitWidth]);

  function fire(n: number) {
    setHits((h) => {
      const next = [...h];
      for (let i = 0; i < n && next.length < 1000; i++) {
        const y = sampleY(opts);
        next.push({ x: DETECTOR_X + (Math.random() - 0.5) * 3, y, t: tCounter.current++ });
      }
      return next;
    });
  }

  function reset() {
    setHits([]);
    tCounter.current = 0;
    setAutoFire(false);
  }

  // Probability curve points
  const curvePoints: string[] = [];
  const curveSamples = 80;
  let curveMax = 0;
  const samples: number[] = [];
  for (let i = 0; i <= curveSamples; i++) {
    const y = (i / curveSamples) * SCREEN_H;
    const p = probDensity(y, opts);
    samples.push(p);
    if (p > curveMax) curveMax = p;
  }
  for (let i = 0; i <= curveSamples; i++) {
    const y = (i / curveSamples) * SCREEN_H;
    const x = DETECTOR_X + 18 + (samples[i] / curveMax) * 60;
    curvePoints.push(`${x},${y}`);
  }

  const slit1Y = CENTER_Y + (slits === 2 ? -slitSep / 2 : 0);
  const slit2Y = CENTER_Y + slitSep / 2;

  return (
    <div className="not-prose bg-bg-elevated border border-border rounded-md p-5 my-6 text-text-primary">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${SCREEN_W} ${SCREEN_H}`} className="w-full h-auto" style={{ minWidth: '600px' }}>
          {/* Source area */}
          <circle cx={SOURCE_X} cy={CENTER_Y} r="14" fill="#7C5CFF" fillOpacity="0.2" />
          <circle cx={SOURCE_X} cy={CENTER_Y} r="6" fill="#7C5CFF">
            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={SOURCE_X} y={CENTER_Y + 36} fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace" textAnchor="middle">
            source
          </text>

          {/* Animated light rays from source to slits */}
          <line x1={SOURCE_X + 6} y1={CENTER_Y} x2={WALL_X} y2={slit1Y} stroke="#7C5CFF" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4,3" />
          {slits === 2 && (
            <line x1={SOURCE_X + 6} y1={CENTER_Y} x2={WALL_X} y2={slit2Y} stroke="#7C5CFF" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4,3" />
          )}

          {/* Wall with slits */}
          <rect x={WALL_X - 4} y={0} width={8} height={slit1Y - SLIT_HEIGHT / 2} fill="#2A2F37" />
          {slits === 1 ? (
            <rect x={WALL_X - 4} y={slit1Y + SLIT_HEIGHT / 2} width={8} height={SCREEN_H - (slit1Y + SLIT_HEIGHT / 2)} fill="#2A2F37" />
          ) : (
            <>
              <rect x={WALL_X - 4} y={slit1Y + SLIT_HEIGHT / 2} width={8} height={slit2Y - SLIT_HEIGHT / 2 - (slit1Y + SLIT_HEIGHT / 2)} fill="#2A2F37" />
              <rect x={WALL_X - 4} y={slit2Y + SLIT_HEIGHT / 2} width={8} height={SCREEN_H - (slit2Y + SLIT_HEIGHT / 2)} fill="#2A2F37" />
            </>
          )}

          {/* Which-slit detectors (when measuring) */}
          {measureWhich && slits === 2 && (
            <>
              <circle cx={WALL_X + 12} cy={slit1Y} r="6" fill="#FFB547" fillOpacity="0.6" />
              <circle cx={WALL_X + 12} cy={slit2Y} r="6" fill="#FFB547" fillOpacity="0.6" />
              <text x={WALL_X + 12} y={slit1Y - 12} fill="#FFB547" fontSize="9" fontFamily="ui-monospace" textAnchor="middle">👁</text>
              <text x={WALL_X + 12} y={slit2Y - 12} fill="#FFB547" fontSize="9" fontFamily="ui-monospace" textAnchor="middle">👁</text>
            </>
          )}

          {/* Wavefronts after slits (visual hint) */}
          {!measureWhich && [0, 1, 2, 3].map((i) => (
            <g key={`w1-${i}`} opacity={0.15 - i * 0.03}>
              <ellipse cx={WALL_X} cy={slit1Y} rx={30 + i * 30} ry={30 + i * 30} fill="none" stroke="#7C5CFF" strokeWidth="0.6" />
              {slits === 2 && (
                <ellipse cx={WALL_X} cy={slit2Y} rx={30 + i * 30} ry={30 + i * 30} fill="none" stroke="#7C5CFF" strokeWidth="0.6" />
              )}
            </g>
          ))}

          {/* Detector screen */}
          <line x1={DETECTOR_X} y1={20} x2={DETECTOR_X} y2={SCREEN_H - 20} stroke="#3A3F47" strokeWidth="2" />
          <text x={DETECTOR_X} y={SCREEN_H - 4} fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace" textAnchor="middle">
            detector
          </text>

          {/* Particle hits */}
          {hits.map((h, i) => (
            <circle key={i} cx={h.x} cy={h.y} r="1.8" fill="#00D9C0" fillOpacity="0.85" />
          ))}

          {/* Probability density curve overlay */}
          {showOverlay && (
            <polyline points={curvePoints.join(' ')} fill="none" stroke="#7C5CFF" strokeWidth="1.5" strokeOpacity="0.85" />
          )}

          {/* Labels at top */}
          <text x={WALL_X} y={16} fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace" textAnchor="middle">
            {slits === 1 ? '1 slit' : '2 slits'}{measureWhich ? ' (observed)' : ''}
          </text>
          <text x={(WALL_X + DETECTOR_X) / 2} y={16} fill="#9CA3AF" fontSize="10" fontFamily="ui-monospace" textAnchor="middle">
            {hits.length} photons
          </text>
        </svg>
      </div>

      {/* Mode toggles */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <ModeCard
          title="One slit"
          active={slits === 1}
          onClick={() => {
            setSlits(1);
            setMeasureWhich(false);
            reset();
          }}
          description="Diffraction only. Single bump on the detector."
        />
        <ModeCard
          title="Two slits"
          active={slits === 2 && !measureWhich}
          onClick={() => {
            setSlits(2);
            setMeasureWhich(false);
            reset();
          }}
          description="Interference fringes — even from single photons."
          highlight
        />
        <ModeCard
          title="Two slits, observed"
          active={slits === 2 && measureWhich}
          onClick={() => {
            setSlits(2);
            setMeasureWhich(true);
            reset();
          }}
          description="Add 'which-slit' detectors. Pattern collapses."
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
          <p className="text-[10px] uppercase tracking-[0.18em] text-accent-quantum font-mono mb-2">Fire photons</p>
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
            <button onClick={() => fire(1)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-quantum hover:text-accent-quantum rounded-sm">+1</button>
            <button onClick={() => fire(10)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-quantum hover:text-accent-quantum rounded-sm">+10</button>
            <button onClick={() => fire(100)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-quantum hover:text-accent-quantum rounded-sm">+100</button>
            <button onClick={reset} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-muted border border-border hover:text-text-primary rounded-sm">
              Reset
            </button>
          </div>
          <label className="flex items-center gap-2 text-xs font-mono text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={showOverlay}
              onChange={(e) => setShowOverlay(e.target.checked)}
              className="accent-accent-quantum"
            />
            Show probability density curve
          </label>
        </div>
      </div>

      <p className="mt-5 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        <strong>Try this:</strong> Pick &quot;Two slits.&quot; Hit <em>Stream</em>. Watch hits land
        at apparently random spots — but the <em>pattern that emerges</em> is interference fringes.
        Now switch to &quot;Two slits, observed&quot; — the moment you peek at which slit each
        photon goes through, the interference vanishes and you get two bumps. The act of measuring
        physically changes the experiment. This is quantum mechanics&apos;s strangest result and the
        clearest demonstration that &quot;particle&quot; and &quot;wave&quot; are inadequate labels.
      </p>
    </div>
  );
}

function ModeCard({
  title,
  description,
  active,
  onClick,
  highlight = false,
}: {
  title: string;
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
          ? 'bg-accent-quantum/15 border-accent-quantum text-text-primary'
          : highlight
            ? 'bg-bg-surface border-accent-quantum/30 hover:border-accent-quantum/60 text-text-secondary'
            : 'bg-bg-surface border-border hover:border-text-muted text-text-secondary'
      }`}
    >
      <p className="font-display text-base leading-tight">{title}</p>
      <p className="text-xs mt-1 leading-relaxed opacity-80">{description}</p>
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
        className="w-full accent-accent-quantum"
      />
    </label>
  );
}
