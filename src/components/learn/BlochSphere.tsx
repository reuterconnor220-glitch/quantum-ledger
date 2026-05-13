'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * 2D Bloch sphere visualizer for v1.
 * Single-qubit state lives on the sphere; user can apply gates and see the rotation.
 * Future v1.1: swap for Three.js 3D version.
 */

type GateType = 'I' | 'X' | 'Y' | 'Z' | 'H' | 'S' | 'T';

interface State {
  theta: number;       // polar (0..π)
  phi: number;         // azimuthal (0..2π)
}

const PRESETS: Record<string, State> = {
  '|0⟩': { theta: 0, phi: 0 },
  '|1⟩': { theta: Math.PI, phi: 0 },
  '|+⟩': { theta: Math.PI / 2, phi: 0 },
  '|−⟩': { theta: Math.PI / 2, phi: Math.PI },
  '|i⟩': { theta: Math.PI / 2, phi: Math.PI / 2 },
};

function applyGate(s: State, g: GateType): State {
  // Compute amplitudes
  const a = { re: Math.cos(s.theta / 2), im: 0 };
  const bMag = Math.sin(s.theta / 2);
  const b = { re: bMag * Math.cos(s.phi), im: bMag * Math.sin(s.phi) };

  let na = { re: 0, im: 0 };
  let nb = { re: 0, im: 0 };

  switch (g) {
    case 'I':
      na = a; nb = b; break;
    case 'X':
      na = b; nb = a; break;
    case 'Y':
      // Y|0⟩ = i|1⟩, Y|1⟩ = -i|0⟩  => na = -i*b, nb = i*a
      na = { re: b.im, im: -b.re };
      nb = { re: -a.im, im: a.re };
      break;
    case 'Z':
      na = a;
      nb = { re: -b.re, im: -b.im };
      break;
    case 'H': {
      const inv = 1 / Math.sqrt(2);
      na = { re: inv * (a.re + b.re), im: inv * (a.im + b.im) };
      nb = { re: inv * (a.re - b.re), im: inv * (a.im - b.im) };
      break;
    }
    case 'S':
      na = a;
      // S = phase i on |1⟩
      nb = { re: -b.im, im: b.re };
      break;
    case 'T': {
      // T = phase e^(iπ/4) on |1⟩
      const c = Math.cos(Math.PI / 4);
      const si = Math.sin(Math.PI / 4);
      na = a;
      nb = { re: c * b.re - si * b.im, im: c * b.im + si * b.re };
      break;
    }
  }

  // Convert back to (theta, phi)
  const naMag = Math.sqrt(na.re ** 2 + na.im ** 2);
  const nbMag = Math.sqrt(nb.re ** 2 + nb.im ** 2);
  const theta = 2 * Math.acos(Math.min(1, Math.max(0, naMag)));
  const naPhase = Math.atan2(na.im, na.re);
  const nbPhase = Math.atan2(nb.im, nb.re);
  let phi = nbPhase - naPhase;
  while (phi < 0) phi += 2 * Math.PI;
  while (phi >= 2 * Math.PI) phi -= 2 * Math.PI;
  return { theta, phi };
}

export function BlochSphere() {
  const [state, setState] = useState<State>(PRESETS['|0⟩']);
  const [target, setTarget] = useState<State>(PRESETS['|0⟩']);
  const [history, setHistory] = useState<GateType[]>([]);
  const animRef = useRef<number | null>(null);

  // Smooth interpolation toward target
  useEffect(() => {
    function tick() {
      setState((s) => {
        const dt = 0.18;
        const dTheta = target.theta - s.theta;
        let dPhi = target.phi - s.phi;
        if (dPhi > Math.PI) dPhi -= 2 * Math.PI;
        if (dPhi < -Math.PI) dPhi += 2 * Math.PI;
        if (Math.abs(dTheta) < 0.001 && Math.abs(dPhi) < 0.001) {
          return { theta: target.theta, phi: target.phi };
        }
        return { theta: s.theta + dTheta * dt, phi: s.phi + dPhi * dt };
      });
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [target]);

  function gate(g: GateType) {
    setTarget((t) => applyGate(t, g));
    setHistory((h) => [...h.slice(-5), g]);
  }

  function reset(label: string) {
    setTarget(PRESETS[label]);
    setHistory([]);
  }

  // Render projection (orthographic)
  const R = 110;
  const cx = 150;
  const cy = 150;
  // Bloch coords
  const bx = Math.sin(state.theta) * Math.cos(state.phi);
  const by = Math.sin(state.theta) * Math.sin(state.phi);
  const bz = Math.cos(state.theta);
  // Project: x-axis horizontal, z-axis vertical, y-axis perspective
  const px = cx + bx * R - by * R * 0.3;
  const py = cy - bz * R + by * R * 0.15;

  // State amplitudes for readout
  const aRe = Math.cos(state.theta / 2);
  const bMag = Math.sin(state.theta / 2);
  const bRe = bMag * Math.cos(state.phi);
  const bIm = bMag * Math.sin(state.phi);
  const p0 = aRe ** 2;
  const p1 = bRe ** 2 + bIm ** 2;

  return (
    <div className="bg-bg-elevated border border-border rounded-md p-5 not-prose text-text-primary">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Sphere */}
        <div className="flex-shrink-0 mx-auto">
          <svg width={300} height={300} viewBox="0 0 300 300">
            {/* Equator */}
            <ellipse cx={cx} cy={cy} rx={R} ry={R * 0.3} fill="none" stroke="#2A2F37" strokeWidth="0.8" />
            {/* Sphere outline */}
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#3A3F47" strokeWidth="1" />
            {/* Axes */}
            <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke="#2A2F37" strokeWidth="0.8" />
            <line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke="#2A2F37" strokeWidth="0.8" />
            <line
              x1={cx + R * 0.3}
              y1={cy - R * 0.15}
              x2={cx - R * 0.3}
              y2={cy + R * 0.15}
              stroke="#2A2F37"
              strokeWidth="0.8"
            />
            {/* Labels */}
            <text x={cx + 4} y={cy - R - 4} fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace">
              |0⟩
            </text>
            <text x={cx + 4} y={cy + R + 14} fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace">
              |1⟩
            </text>
            <text x={cx + R + 4} y={cy + 4} fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace">
              |+⟩
            </text>
            <text x={cx - R - 18} y={cy + 4} fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace">
              |−⟩
            </text>
            {/* State vector */}
            <line x1={cx} y1={cy} x2={px} y2={py} stroke="#7C5CFF" strokeWidth="2" />
            <circle cx={px} cy={py} r="6" fill="#7C5CFF" />
            <circle cx={px} cy={py} r="10" fill="#7C5CFF" fillOpacity="0.25">
              <animate attributeName="r" from="6" to="14" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Controls + readout */}
        <div className="flex-1 w-full">
          <div>
            <p className="eyebrow mb-2">State</p>
            <p className="font-mono text-text-primary text-lg">
              |ψ⟩ = {aRe.toFixed(3)}|0⟩ + ({bRe.toFixed(3)}{bIm >= 0 ? '+' : ''}{bIm.toFixed(3)}i)|1⟩
            </p>
            <div className="mt-2 flex gap-3 text-xs font-mono text-text-secondary">
              <span>P(0) = {(p0 * 100).toFixed(1)}%</span>
              <span>P(1) = {(p1 * 100).toFixed(1)}%</span>
            </div>
          </div>

          <div className="mt-5">
            <p className="eyebrow mb-2">Apply gate</p>
            <div className="flex flex-wrap gap-2">
              {(['X', 'Y', 'Z', 'H', 'S', 'T'] as GateType[]).map((g) => (
                <button
                  key={g}
                  onClick={() => gate(g)}
                  className="px-3 py-1.5 bg-bg-surface border border-border rounded-sm hover:bg-accent-quantum hover:border-accent-quantum hover:text-white font-mono text-sm transition"
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="eyebrow mb-2">Presets</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(PRESETS).map((label) => (
                <button
                  key={label}
                  onClick={() => reset(label)}
                  className="px-2.5 py-1 bg-bg-surface border border-border rounded-sm hover:bg-bg-elevated font-mono text-xs text-text-secondary"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {history.length > 0 && (
            <div className="mt-5">
              <p className="eyebrow mb-2">Recent</p>
              <div className="font-mono text-sm text-text-muted">{history.join(' → ')}</div>
            </div>
          )}
        </div>
      </div>
      <p className="mt-5 text-xs text-text-muted leading-relaxed border-t border-border pt-3">
        Drag the gate buttons to rotate the qubit. Hadamard (H) puts the state into superposition;
        Z adds a phase; X is the quantum NOT. Probabilities are |amplitude|².
      </p>
    </div>
  );
}
