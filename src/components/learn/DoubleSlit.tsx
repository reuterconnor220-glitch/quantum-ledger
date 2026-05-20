'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The double-slit experiment — beginner-friendly version.
 *
 * Pedagogical premise: the experiment's only point is to show that *observing*
 * which slit a photon goes through collapses the wave behavior into particle
 * behavior. Everything else (slit width, wavelength, slit count) is secondary.
 *
 * UI consequence: one big toggle — "Are you watching the slits?" — and the
 * scene visibly changes when you flip it. Hits reset on every toggle so the
 * fresh accumulation makes the two patterns unambiguously different. No
 * sliders, no second mode, no curve overlay clutter on first viewing.
 *
 * Advanced controls (single-slit mode, sliders, curve overlay) are tucked
 * behind a "Show controls" disclosure so the beginner sees the lesson first.
 */

const SCREEN_W = 760;
const SCREEN_H = 420;
const SOURCE_X = 60;
const WALL_X = 320;
const DETECTOR_X = 700;
const CENTER_Y = SCREEN_H / 2;
const SLIT_HEIGHT = 28;

function sinc(x: number) {
  if (Math.abs(x) < 1e-6) return 1;
  return Math.sin(x) / x;
}

const WAVELENGTH = 70;
const SLIT_SEP = 70;
const SLIT_WIDTH = 20;
const L = 360;

function quantumDensity(y: number, slits: 1 | 2, watching: boolean): number {
  const x = y - CENTER_Y;
  const envelope = sinc((Math.PI * SLIT_WIDTH * x) / (WAVELENGTH * L)) ** 2;
  if (slits === 1) return envelope;
  if (watching) {
    const e1 = sinc((Math.PI * SLIT_WIDTH * (x - SLIT_SEP / 2)) / (WAVELENGTH * L)) ** 2;
    const e2 = sinc((Math.PI * SLIT_WIDTH * (x + SLIT_SEP / 2)) / (WAVELENGTH * L)) ** 2;
    return 0.5 * (e1 + e2);
  }
  const fringe = Math.cos((Math.PI * SLIT_SEP * x) / (WAVELENGTH * L)) ** 2;
  return envelope * fringe;
}

function sampleY(slits: 1 | 2, watching: boolean): number {
  for (let attempts = 0; attempts < 200; attempts++) {
    const y = Math.random() * SCREEN_H;
    if (Math.random() < quantumDensity(y, slits, watching)) return y;
  }
  return CENTER_Y;
}

interface Hit {
  x: number;
  y: number;
  t: number;
}

export function DoubleSlit() {
  const [watching, setWatching] = useState(false);
  const [slits, setSlits] = useState<1 | 2>(2);
  const [hits, setHits] = useState<Hit[]>([]);
  const [autoFire, setAutoFire] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const tCounter = useRef(0);

  // Seed with ~80 photons on first mount so the user sees a pattern immediately,
  // not an empty screen waiting for them to figure out which button to click.
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    setHits(() => {
      const seed: Hit[] = [];
      for (let i = 0; i < 80; i++) {
        seed.push({
          x: DETECTOR_X + (Math.random() - 0.5) * 4,
          y: sampleY(2, false),
          t: tCounter.current++,
        });
      }
      return seed;
    });
  }, []);

  // Auto-fire — keeps a stream of photons flowing so the pattern is alive
  // and the difference between modes becomes visible quickly.
  useEffect(() => {
    if (!autoFire) return;
    const interval = setInterval(() => {
      setHits((h) => {
        if (h.length >= 800) return h;
        return [...h, {
          x: DETECTOR_X + (Math.random() - 0.5) * 4,
          y: sampleY(slits, watching),
          t: tCounter.current++,
        }];
      });
    }, 25);
    return () => clearInterval(interval);
  }, [autoFire, slits, watching]);

  function toggleWatching() {
    // Clear the screen on every toggle. Otherwise the previous mode's hits
    // sit on top of the new mode's hits and the user can't tell what's changed.
    setHits([]);
    tCounter.current = 0;
    setWatching((w) => !w);
  }

  function setSlitsAndReset(n: 1 | 2) {
    setHits([]);
    tCounter.current = 0;
    setSlits(n);
  }

  function fire(n: number) {
    setHits((h) => {
      const next = [...h];
      for (let i = 0; i < n && next.length < 1500; i++) {
        next.push({
          x: DETECTOR_X + (Math.random() - 0.5) * 4,
          y: sampleY(slits, watching),
          t: tCounter.current++,
        });
      }
      return next;
    });
  }

  function reset() {
    setHits([]);
    tCounter.current = 0;
  }

  const slit1Y = CENTER_Y + (slits === 2 ? -SLIT_SEP / 2 : 0);
  const slit2Y = CENTER_Y + SLIT_SEP / 2;
  const isWaveBehavior = !watching && slits === 2;
  const isParticleBehavior = watching || slits === 1;

  return (
    <div className="not-prose bg-bg-elevated border border-border rounded-md p-5 my-6 text-text-primary">
      {/* ────────── The toggle — the only control most beginners need ────────── */}
      <div className="mb-5 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-accent-data font-mono mb-1.5">
            The one thing to play with
          </p>
          <p className="font-display text-[20px] leading-tight tracking-tight text-text-primary">
            Are you watching which slit each photon goes through?
          </p>
        </div>
        <button
          onClick={toggleWatching}
          className={`group relative inline-flex items-center gap-3 px-5 py-3 rounded-md border transition-all ${
            watching
              ? 'bg-accent-warn/15 border-accent-warn text-accent-warn'
              : 'bg-accent-data/10 border-accent-data text-accent-data'
          }`}
        >
          <span
            className={`text-2xl leading-none transition-transform ${
              watching ? 'scale-110' : 'scale-100 opacity-70'
            }`}
          >
            {watching ? '👁' : '🚫'}
          </span>
          <div className="text-left">
            <p className="text-[9px] uppercase tracking-[0.15em] font-mono opacity-70">
              {watching ? 'watching' : 'not watching'}
            </p>
            <p className="font-display text-base leading-tight font-medium">
              {watching ? 'Click to stop watching' : 'Click to start watching'}
            </p>
          </div>
        </button>
      </div>

      {/* ────────── Verdict bar — tells you what the screen is showing right now ────────── */}
      <div
        className={`mb-4 rounded-md border px-4 py-3 text-sm leading-snug ${
          isWaveBehavior
            ? 'bg-accent-data/10 border-accent-data/40 text-text-primary'
            : 'bg-accent-warn/10 border-accent-warn/40 text-text-primary'
        }`}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] font-mono block mb-1 text-text-muted">
          {isWaveBehavior ? 'Wave behavior — striped pattern' : 'Particle behavior — two-bump pattern'}
        </span>
        {isWaveBehavior && (
          <>
            Each photon is going through <strong>both slits at once</strong>, interfering with
            itself, and landing in the bright bands. The dark gaps are where it cancels itself
            out. <em>This is not what particles do.</em>
          </>
        )}
        {watching && slits === 2 && (
          <>
            Adding a detector at the slits forces each photon to <strong>pick one slit</strong>{' '}
            (like a particle). The interference vanishes. The screen shows two clumps — exactly
            what classical bullets would do.{' '}
            <em>The act of watching changed the result.</em>
          </>
        )}
        {slits === 1 && (
          <>
            With only one slit open there&apos;s nothing to interfere with. A single diffraction
            bump — boring on purpose, this is the control.
          </>
        )}
      </div>

      {/* ────────── The SVG scene ────────── */}
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
          <circle cx={SOURCE_X} cy={CENTER_Y} r="24" fill="url(#ds-source-glow)" />
          <circle cx={SOURCE_X} cy={CENTER_Y} r="7" fill="#00D9C0">
            <animate attributeName="r" values="7;10;7" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x={SOURCE_X} y={CENTER_Y + 42} fill="#9CA3AF" fontSize="13" fontFamily="ui-monospace" textAnchor="middle">
            photon gun
          </text>

          {/* Wall with slits */}
          <rect x={WALL_X - 5} y={0} width={10} height={slit1Y - SLIT_HEIGHT / 2} fill="#3A3F47" />
          {slits === 1 ? (
            <rect x={WALL_X - 5} y={slit1Y + SLIT_HEIGHT / 2} width={10} height={SCREEN_H - (slit1Y + SLIT_HEIGHT / 2)} fill="#3A3F47" />
          ) : (
            <>
              <rect x={WALL_X - 5} y={slit1Y + SLIT_HEIGHT / 2} width={10} height={slit2Y - SLIT_HEIGHT / 2 - (slit1Y + SLIT_HEIGHT / 2)} fill="#3A3F47" />
              <rect x={WALL_X - 5} y={slit2Y + SLIT_HEIGHT / 2} width={10} height={SCREEN_H - (slit2Y + SLIT_HEIGHT / 2)} fill="#3A3F47" />
            </>
          )}
          <text x={WALL_X} y={SCREEN_H - 6} fill="#9CA3AF" fontSize="13" fontFamily="ui-monospace" textAnchor="middle">
            {slits === 2 ? 'two slits' : 'one slit'}
          </text>

          {/* WAVE MODE: visible wavefronts emerge from both slits and overlap.
              PARTICLE MODE: instead show clean straight paths and a watcher eye. */}
          {!watching && slits === 2 && (
            <g>
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={`wf-${i}`} opacity={0.28 - i * 0.05}>
                  <ellipse cx={WALL_X + 5} cy={slit1Y} rx={32 + i * 44} ry={32 + i * 44} fill="none" stroke="#00D9C0" strokeWidth="1.1" />
                  <ellipse cx={WALL_X + 5} cy={slit2Y} rx={32 + i * 44} ry={32 + i * 44} fill="none" stroke="#00D9C0" strokeWidth="1.1" />
                </g>
              ))}
            </g>
          )}
          {watching && slits === 2 && (
            <g>
              {/* Watcher eyes at each slit + a clean ray from source through each slit (particle behavior) */}
              <line x1={SOURCE_X + 8} y1={CENTER_Y} x2={WALL_X - 8} y2={slit1Y} stroke="#FFB547" strokeWidth="1.4" strokeOpacity="0.5" />
              <line x1={SOURCE_X + 8} y1={CENTER_Y} x2={WALL_X - 8} y2={slit2Y} stroke="#FFB547" strokeWidth="1.4" strokeOpacity="0.5" />
              <line x1={WALL_X + 8} y1={slit1Y} x2={DETECTOR_X - 5} y2={slit1Y} stroke="#FFB547" strokeWidth="1.4" strokeOpacity="0.5" />
              <line x1={WALL_X + 8} y1={slit2Y} x2={DETECTOR_X - 5} y2={slit2Y} stroke="#FFB547" strokeWidth="1.4" strokeOpacity="0.5" />
              <g>
                <circle cx={WALL_X + 20} cy={slit1Y} r="14" fill="#FFB547" fillOpacity="0.18" />
                <circle cx={WALL_X + 20} cy={slit1Y} r="8" fill="#FFB547" />
                <text x={WALL_X + 20} y={slit1Y + 4} fontSize="14" textAnchor="middle">👁</text>
              </g>
              <g>
                <circle cx={WALL_X + 20} cy={slit2Y} r="14" fill="#FFB547" fillOpacity="0.18" />
                <circle cx={WALL_X + 20} cy={slit2Y} r="8" fill="#FFB547" />
                <text x={WALL_X + 20} y={slit2Y + 4} fontSize="14" textAnchor="middle">👁</text>
              </g>
              <text x={WALL_X + 80} y={slit1Y - 18} fill="#FFB547" fontSize="11" fontFamily="ui-monospace">
                detector watching
              </text>
            </g>
          )}
          {slits === 1 && (
            <line x1={SOURCE_X + 8} y1={CENTER_Y} x2={WALL_X - 8} y2={slit1Y} stroke="#00D9C0" strokeWidth="1.4" strokeOpacity="0.4" />
          )}

          {/* Detector screen */}
          <line x1={DETECTOR_X} y1={20} x2={DETECTOR_X} y2={SCREEN_H - 20} stroke="#6B7280" strokeWidth="2.5" />
          <text x={DETECTOR_X} y={SCREEN_H - 6} fill="#9CA3AF" fontSize="13" fontFamily="ui-monospace" textAnchor="middle">
            detector
          </text>

          {/* Photon hits with halo glow */}
          {hits.map((h, i) => (
            <g key={i}>
              <circle cx={h.x} cy={h.y} r="5" fill="url(#ds-photon-glow)" />
              <circle cx={h.x} cy={h.y} r="2.2" fill="#00D9C0" />
            </g>
          ))}

          {/* Top status banner */}
          <text x={WALL_X} y={20} fill="#E8EAED" fontSize="14" fontFamily="ui-monospace" fontWeight="700" textAnchor="middle">
            {isWaveBehavior ? 'WAVE BEHAVIOR' : 'PARTICLE BEHAVIOR'}
          </text>
          <text x={(WALL_X + DETECTOR_X) / 2 + 40} y={20} fill="#9CA3AF" fontSize="13" fontFamily="ui-monospace" textAnchor="middle">
            {hits.length} photons
          </text>
        </svg>
      </div>

      {/* ────────── Photon-firing controls — small and below ────────── */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setAutoFire((v) => !v)}
          className={`px-4 py-2 text-sm font-mono font-semibold rounded-sm transition border ${
            autoFire
              ? 'bg-accent-data text-bg border-accent-data shadow-[0_0_12px_rgba(0,217,192,0.4)]'
              : 'bg-bg-surface text-text-primary border-border hover:border-accent-data hover:text-accent-data'
          }`}
        >
          {autoFire ? '■ Pause stream' : '▶ Start stream'}
        </button>
        <button onClick={() => fire(10)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-data hover:text-accent-data rounded-sm">
          +10
        </button>
        <button onClick={() => fire(100)} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-primary border border-border hover:border-accent-data hover:text-accent-data rounded-sm">
          +100
        </button>
        <button onClick={reset} className="px-3 py-2 text-xs font-mono bg-bg-surface text-text-muted border border-border hover:text-text-primary rounded-sm">
          Clear screen
        </button>
        <button
          onClick={() => setShowAdvanced((v) => !v)}
          className="ml-auto px-3 py-2 text-xs font-mono text-text-muted border border-border rounded-sm hover:border-text-primary hover:text-text-primary"
        >
          {showAdvanced ? 'Hide controls' : 'Show more controls'}
        </button>
      </div>

      {showAdvanced && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-border pt-4">
          <button
            onClick={() => setSlitsAndReset(slits === 2 ? 1 : 2)}
            className={`text-left p-3 rounded-sm border transition bg-bg-surface text-text-primary ${
              slits === 1 ? 'border-accent-warn/60' : 'border-border hover:border-accent-data'
            }`}
          >
            <p className="font-display text-base leading-tight">
              Slits: <span className="text-accent-data">{slits === 2 ? 'two (default)' : 'one (control)'}</span>
            </p>
            <p className="text-xs mt-1 leading-relaxed text-text-secondary">
              Click to {slits === 2 ? 'switch to one slit' : 'switch back to two slits'}. One slit
              gives a single boring bump — that&apos;s the control case proving the interference
              isn&apos;t coming from the slit edges.
            </p>
          </button>
          <div className="text-xs text-text-muted leading-relaxed p-3 bg-bg-surface/50 border border-border rounded-sm">
            <p className="font-mono uppercase tracking-[0.12em] text-text-secondary mb-1.5 text-[10px]">
              What you&apos;re watching for
            </p>
            <p>
              With two slits and no detector, photons land in <strong>vertical stripes</strong>{' '}
              of bright and dark — like waves overlapping on water. Add the detector and the
              stripes vanish; you get <strong>two solid clumps</strong> — like classical bullets.
              That is the experiment.
            </p>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        <strong className="text-text-secondary">Try this in 30 seconds:</strong> the stream is
        already running. Watch the pattern build up — bright stripes, dark gaps. Now click the
        toggle to start watching the slits. The stripes vanish and two solid clumps emerge. Toggle
        back and the stripes return. That is the whole experiment. Richard Feynman called it{' '}
        <em>the only mystery in quantum mechanics</em> — every other quantum weirdness eventually
        reduces back to this.
      </p>
    </div>
  );
}
