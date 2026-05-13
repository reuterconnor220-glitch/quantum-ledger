'use client';

import { useState, useMemo } from 'react';
import type { FutureEvent, EventCategory } from '@/lib/data/future';

const CATEGORY_COLOR: Record<EventCategory, string> = {
  tech: '#7C5CFF',
  commercial: '#00D9C0',
  government: '#FFB547',
  market: '#60A5FA',
  crypto: '#FF5C7C',
  science: '#A78BFA',
  industry: '#F472B6',
};

const CATEGORY_LABEL: Record<EventCategory, string> = {
  tech: 'Technical',
  commercial: 'Commercial',
  government: 'Government',
  market: 'Market',
  crypto: 'Crypto',
  science: 'Science',
  industry: 'Industry',
};

/**
 * Interactive horizontal timeline 2026-2036.
 * X = year. Y = jittered to avoid overlap. Color = category. Size ∝ impact.
 * Opacity ∝ probability.
 */
export function TimelineChart({ events }: { events: FutureEvent[] }) {
  const [activeCategory, setActiveCategory] = useState<EventCategory | null>(null);
  const [hovered, setHovered] = useState<FutureEvent | null>(null);

  const filtered = activeCategory
    ? events.filter((e) => e.category === activeCategory)
    : events;

  const W = 1000;
  const H = 460;
  const padL = 60;
  const padR = 30;
  const padT = 40;
  const padB = 60;

  const minYear = 2026;
  const maxYear = 2036;
  const xScale = (year: number, quarter?: string) => {
    const q = quarter === 'Q1' ? 0 : quarter === 'Q2' ? 0.25 : quarter === 'Q3' ? 0.5 : quarter === 'Q4' ? 0.75 : 0.5;
    return padL + ((year + q - minYear) / (maxYear - minYear)) * (W - padL - padR);
  };

  // Jitter Y based on event ID hash, but pack tighter
  const yScale = (e: FutureEvent) => {
    const seed = (e.id * 13) % 100;
    return padT + (seed / 100) * (H - padT - padB);
  };

  const radius = (impact: number) => 4 + impact * 1.2;

  const categories = Array.from(new Set(events.map((e) => e.category)));

  return (
    <div className="card p-5">
      {/* Category filter */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider border rounded-sm ${
            activeCategory === null
              ? 'border-accent-quantum bg-accent-quantum text-white'
              : 'border-border text-text-secondary hover:bg-bg-surface'
          }`}
        >
          All ({events.length})
        </button>
        {categories.map((c) => {
          const count = events.filter((e) => e.category === c).length;
          const isActive = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(isActive ? null : c)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider border rounded-sm ${
                isActive ? 'text-text-primary' : 'border-border text-text-secondary hover:bg-bg-surface'
              }`}
              style={{ borderColor: isActive ? CATEGORY_COLOR[c] : undefined }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLOR[c] }} />
              {CATEGORY_LABEL[c]} ({count})
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="relative overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[800px]">
          {/* Year gridlines */}
          {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((year) => (
            <g key={year}>
              <line x1={xScale(year)} y1={padT} x2={xScale(year)} y2={H - padB} stroke="#1F242B" strokeDasharray="2,3" />
              <text x={xScale(year)} y={H - padB + 18} fill="#9CA3AF" fontSize="11" fontFamily="ui-monospace" textAnchor="middle">
                {year}
              </text>
            </g>
          ))}

          {/* "Now" marker */}
          <line x1={xScale(2026, 'Q2')} y1={padT - 10} x2={xScale(2026, 'Q2')} y2={H - padB} stroke="#00D9C0" strokeWidth="1.5" />
          <text x={xScale(2026, 'Q2') + 4} y={padT - 14} fill="#00D9C0" fontSize="10" fontFamily="ui-monospace">
            Now (May 2026)
          </text>

          {/* Phase regions */}
          <text x={xScale(2026.5)} y={H - 10} fill="#6B7280" fontSize="9" fontFamily="ui-monospace" textAnchor="middle">
            IPO super-cycle
          </text>
          <text x={xScale(2029)} y={H - 10} fill="#6B7280" fontSize="9" fontFamily="ui-monospace" textAnchor="middle">
            Logical-qubit credibility era
          </text>
          <text x={xScale(2033)} y={H - 10} fill="#6B7280" fontSize="9" fontFamily="ui-monospace" textAnchor="middle">
            Cryptographic reckoning &amp; commercial inversion
          </text>

          {/* Events */}
          {filtered.map((e) => {
            const x = xScale(e.year, e.quarter);
            const y = yScale(e);
            const r = radius(e.impact);
            const dimOther = activeCategory && activeCategory !== e.category;
            return (
              <g
                key={e.id}
                onMouseEnter={() => setHovered(e)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={CATEGORY_COLOR[e.category]}
                  fillOpacity={(e.probability / 100) * (dimOther ? 0.1 : 0.6)}
                  stroke={CATEGORY_COLOR[e.category]}
                  strokeWidth={dimOther ? 0.5 : 1.5}
                  strokeOpacity={dimOther ? 0.2 : 1}
                />
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hovered && (
          <div className="absolute top-12 right-4 max-w-sm bg-bg border-2 border-accent-quantum/40 rounded-sm p-4 text-xs font-mono shadow-xl pointer-events-none z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLOR[hovered.category] }} />
              <span className="text-[10px] uppercase tracking-wider text-text-muted">
                {hovered.year}{hovered.quarter && ` ${hovered.quarter}`} · {CATEGORY_LABEL[hovered.category]}
              </span>
            </div>
            <p className="text-text-primary font-sans font-medium leading-tight mb-2">{hovered.title}</p>
            <div className="grid grid-cols-2 gap-2 mb-2 text-text-secondary">
              <div>Probability: <span className="text-text-primary">{hovered.probability}%</span></div>
              <div>Impact: <span className="text-text-primary">{hovered.impact}/10</span></div>
            </div>
            <p className="text-text-muted italic text-[10px] leading-relaxed font-sans">{hovered.rationale}</p>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-text-muted leading-relaxed">
        <strong>Bubble size</strong> ∝ expected impact. <strong>Opacity</strong> ∝ probability —
        faded bubbles are less likely. <strong>Color</strong> = category. Click a category chip to
        filter. Hover any event for details. The teal vertical line marks today (May 2026).
      </p>
    </div>
  );
}
