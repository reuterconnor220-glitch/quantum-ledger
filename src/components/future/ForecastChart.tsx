import type { ForecastYear } from '@/lib/data/future';

/**
 * Revenue forecast fan chart — median plus low-high band, plus key metrics overlaid.
 */
export function ForecastChart({ grid }: { grid: ForecastYear[] }) {
  const W = 1000;
  const H = 360;
  const padL = 60;
  const padR = 30;
  const padT = 30;
  const padB = 50;

  const years = grid.map((g) => g.year);
  const maxRevenue = Math.max(...grid.map((g) => g.revenueHigh));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const xScale = (y: number) => padL + ((y - minYear) / (maxYear - minYear)) * (W - padL - padR);
  const yScale = (v: number) => H - padB - (v / maxRevenue) * (H - padT - padB);

  const medianPath = grid.map((g, i) => `${i === 0 ? 'M' : 'L'} ${xScale(g.year)} ${yScale(g.revenueMedian)}`).join(' ');
  const bandPath = [
    ...grid.map((g, i) => `${i === 0 ? 'M' : 'L'} ${xScale(g.year)} ${yScale(g.revenueLow)}`),
    ...grid.slice().reverse().map((g) => `L ${xScale(g.year)} ${yScale(g.revenueHigh)}`),
    'Z',
  ].join(' ');

  return (
    <div className="card p-5">
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <p className="eyebrow">Sector revenue forecast ($B)</p>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1">
            <span className="inline-block w-4 h-0.5 bg-accent-quantum" /> Median
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-4 h-3 bg-accent-quantum/20 rounded-xs" /> Low-High band
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Y gridlines */}
        {[0, 20, 50, 100, 150].filter((v) => v <= maxRevenue).map((v) => (
          <g key={v}>
            <line x1={padL} y1={yScale(v)} x2={W - padR} y2={yScale(v)} stroke="#1F242B" strokeDasharray="2,3" />
            <text x={padL - 8} y={yScale(v) + 4} fill="#6B7280" fontSize="10" fontFamily="ui-monospace" textAnchor="end">
              ${v}B
            </text>
          </g>
        ))}
        {/* X gridlines */}
        {grid.map((g) => (
          <g key={g.year}>
            <line x1={xScale(g.year)} y1={padT} x2={xScale(g.year)} y2={H - padB} stroke="#1F242B" strokeOpacity={0.5} />
            <text x={xScale(g.year)} y={H - padB + 16} fill="#9CA3AF" fontSize="10" fontFamily="ui-monospace" textAnchor="middle">
              {g.year}
            </text>
          </g>
        ))}
        {/* Confidence band */}
        <path d={bandPath} fill="#7C5CFF" fillOpacity="0.18" />
        {/* Median line */}
        <path d={medianPath} fill="none" stroke="#7C5CFF" strokeWidth="2.5" />
        {/* Data points */}
        {grid.map((g) => (
          <g key={g.year}>
            <circle cx={xScale(g.year)} cy={yScale(g.revenueMedian)} r="3.5" fill="#7C5CFF" />
            <text x={xScale(g.year)} y={yScale(g.revenueMedian) - 8} fill="#E8EAED" fontSize="9" fontFamily="ui-monospace" textAnchor="middle">
              ${g.revenueMedian}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-3 text-xs text-text-muted leading-relaxed">
        Median synthesizes McKinsey, BCG, QED-C/IDC, and bottom-up vendor forecasts. The band widens
        sharply after 2029 because forecasters disagree by &gt;3× on the FTQC-era trajectory. The
        2035 spread alone is $46-97B (McKinsey range).
      </p>
    </div>
  );
}

export function MixChart({ data }: { data: { year: number; government: number; commercialCloud: number; hardware: number; pqc: number; sensing: number; consulting: number }[] }) {
  const W = 1000;
  const H = 280;
  const padL = 60;
  const padR = 30;
  const padT = 20;
  const padB = 40;

  const minYear = Math.min(...data.map((d) => d.year));
  const maxYear = Math.max(...data.map((d) => d.year));

  const xScale = (y: number) => padL + ((y - minYear) / (maxYear - minYear)) * (W - padL - padR);
  const yScale = (v: number) => padT + (1 - v / 100) * (H - padT - padB);

  const segments: { key: string; color: string; label: string }[] = [
    { key: 'government', color: '#FFB547', label: 'Government' },
    { key: 'commercialCloud', color: '#00D9C0', label: 'Commercial cloud' },
    { key: 'hardware', color: '#7C5CFF', label: 'Hardware sales' },
    { key: 'pqc', color: '#FF5C7C', label: 'PQC products' },
    { key: 'sensing', color: '#60A5FA', label: 'Sensing' },
    { key: 'consulting', color: '#A78BFA', label: 'Consulting' },
  ];

  // Compute cumulative for stacking
  const stacked = data.map((d) => {
    let acc = 0;
    return segments.map((s) => {
      const v = (d as any)[s.key] as number;
      const top = acc;
      acc += v;
      return { top, value: v };
    });
  });

  return (
    <div className="card p-5">
      <p className="eyebrow mb-3">Revenue mix evolution · % of total</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Stacked areas */}
        {segments.map((s, si) => {
          const pts = data.map((d, di) => ({
            x: xScale(d.year),
            yTop: yScale(stacked[di][si].top + stacked[di][si].value),
            yBot: yScale(stacked[di][si].top),
          }));
          const path = [
            `M ${pts[0].x} ${pts[0].yBot}`,
            ...pts.map((p) => `L ${p.x} ${p.yBot}`),
            ...pts.slice().reverse().map((p) => `L ${p.x} ${p.yTop}`),
            'Z',
          ].join(' ');
          return <path key={s.key} d={path} fill={s.color} fillOpacity="0.55" stroke={s.color} strokeWidth="0.5" />;
        })}
        {/* X labels */}
        {data.map((d) => (
          <text key={d.year} x={xScale(d.year)} y={H - padB + 14} fill="#9CA3AF" fontSize="10" fontFamily="ui-monospace" textAnchor="middle">
            {d.year}
          </text>
        ))}
        {/* Y labels */}
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={padL} y1={yScale(v)} x2={W - padR} y2={yScale(v)} stroke="#1F242B" strokeOpacity="0.3" />
            <text x={padL - 8} y={yScale(v) + 4} fill="#6B7280" fontSize="9" fontFamily="ui-monospace" textAnchor="end">{v}%</text>
          </g>
        ))}
      </svg>
      <div className="mt-3 flex flex-wrap gap-3 text-xs font-mono">
        {segments.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-3 h-3 rounded-xs" style={{ background: s.color, opacity: 0.7 }} />
            {s.label}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-text-muted leading-relaxed">
        Government share drops from 45% to 15% as commercial cloud crosses 33% in 2030 (BCG&apos;s
        phase boundary). PQC revenue ramps with NIST deprecation/disallow deadlines, peaks ~2032,
        then plateaus as migration concludes.
      </p>
    </div>
  );
}
