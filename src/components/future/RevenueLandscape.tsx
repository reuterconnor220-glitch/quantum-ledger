// Revenue landscape: forecast band chart + regime-break callout cards.
// Used on /future (in-place) and /earnings (embedded below the calls list).
//
// Design notes for the chart legibility rewrite:
//  - Inline labels INSIDE the SVG plot area were overlapping each other and
//    being clipped at the right edge. They've been removed in favor of short
//    year chips anchored above the plot, plus the existing regime-break cards
//    underneath that already carry the full label + reason.
//  - Regime-break dots/verticals were the retired purple. They're now amber
//    (accent-warn) so they pop against the teal forecast line without color
//    competition.
//  - Right padding bumped so the 2034/2035/2036 tail doesn't clip.

export interface ForecastEntry {
  y: number;
  v: number;
  expand?: { label: string; reason: string };
}

export function RevenueLandscape({
  forecast,
  eyebrow = '2024 → 2034 · central estimate with bands',
  title = 'Where the revenue is',
  accentWord = 'going',
  showSectionHead = true,
}: {
  forecast: ForecastEntry[];
  eyebrow?: string;
  title?: string;
  accentWord?: string;
  showSectionHead?: boolean;
}) {
  return (
    <section>
      {showSectionHead && (
        <div className="mb-6 pb-3 border-b border-text-primary/90">
          <p className="eyebrow mb-2">{eyebrow}</p>
          <h2 className="font-display font-normal text-3xl tracking-tight text-balance">
            {title}{' '}
            <em className="not-italic font-normal italic text-accent-data">{accentWord}</em>
          </h2>
        </div>
      )}
      <div className="bg-bg-surface border border-border rounded-md p-6">
        <ForecastBands forecast={forecast} />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
          {forecast
            .filter((f) => f.expand)
            .map((f) => (
              <div key={f.y} className="bg-bg-surface p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-accent-warn font-mono mb-1.5">
                  {f.y} · regime break
                </p>
                <p className="font-display text-[16px] leading-snug text-text-primary tracking-tight">
                  {f.expand!.label}
                </p>
                <p className="mt-1.5 text-[12px] text-text-secondary leading-[1.55]">
                  {f.expand!.reason}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function ForecastBands({ forecast }: { forecast: ForecastEntry[] }) {
  if (forecast.length === 0) {
    return (
      <p className="font-display italic text-text-muted py-12 text-center">
        Forecast data not available.
      </p>
    );
  }
  const W = 920;
  const H = 340;
  // Top padding now leaves room for the year chips above the plot.
  const pad = { l: 52, r: 56, t: 44, b: 38 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const minY = forecast[0].y;
  const maxY = forecast[forecast.length - 1].y;
  const maxV = Math.max(...forecast.map((f) => f.v)) * 1.05;

  const x = (yr: number) => pad.l + ((yr - minY) / (maxY - minY)) * innerW;
  const y = (v: number) => pad.t + innerH - (v / maxV) * innerH;

  const mid = forecast.map((f) => [x(f.y), y(f.v)] as [number, number]);
  const upper = forecast.map(
    (f, i) => [x(f.y), y(f.v * (1 + 0.35 * (i / (forecast.length - 1))))] as [number, number],
  );
  const lower = forecast.map(
    (f, i) => [x(f.y), y(f.v * (1 - 0.35 * (i / (forecast.length - 1))))] as [number, number],
  );

  const linePath = 'M ' + mid.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L ');
  const bandPath =
    'M ' +
    upper.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L ') +
    ' L ' +
    lower
      .slice()
      .reverse()
      .map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`)
      .join(' L ') +
    ' Z';

  // Show every other year as a tick label so the axis doesn't get crowded.
  const xTickYears = forecast.filter((f) => f.y % 2 === 0 || f.y === minY || f.y === maxY).map((f) => f.y);
  const yTicks = [0, 20, 40, 60, 80];
  const lastPoint = forecast[forecast.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full text-accent-data" preserveAspectRatio="xMidYMid meet">
      {/* y gridlines + labels */}
      {yTicks.map((t) => (
        <g key={t}>
          <line
            x1={pad.l}
            y1={pad.t + innerH - (t / maxV) * innerH}
            x2={W - pad.r}
            y2={pad.t + innerH - (t / maxV) * innerH}
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.15"
          />
          <text
            x={pad.l - 10}
            y={pad.t + innerH - (t / maxV) * innerH + 4}
            textAnchor="end"
            className="fill-current text-text-muted font-mono"
            style={{ fontSize: 11, opacity: 0.7 }}
          >
            ${t}B
          </text>
        </g>
      ))}

      {/* x ticks */}
      {forecast.map((f) => {
        const showLabel = xTickYears.includes(f.y);
        return (
          <g key={f.y}>
            <line
              x1={x(f.y)}
              y1={pad.t + innerH}
              x2={x(f.y)}
              y2={pad.t + innerH + 4}
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.3"
            />
            {showLabel && (
              <text
                x={x(f.y)}
                y={pad.t + innerH + 20}
                textAnchor="middle"
                className="fill-current text-text-muted font-mono"
                style={{ fontSize: 11, opacity: 0.75 }}
              >
                {f.y}
              </text>
            )}
          </g>
        );
      })}

      {/* forecast band */}
      <path d={bandPath} fill="currentColor" opacity="0.12" />

      {/* central forecast line */}
      <path
        d={linePath}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}
      />

      {/* terminal value callout — anchored to the last data point */}
      {lastPoint && (
        <g>
          <circle cx={x(lastPoint.y)} cy={y(lastPoint.v)} r="3.5" fill="currentColor" />
          <text
            x={x(lastPoint.y) - 8}
            y={y(lastPoint.v) - 12}
            textAnchor="end"
            className="fill-current text-accent-data font-mono"
            style={{ fontSize: 11, fontWeight: 600 }}
          >
            ${lastPoint.v.toFixed(0)}B · {lastPoint.y}
          </text>
        </g>
      )}

      {/* regime-break markers — verticals + numbered dots only, no inline label text */}
      {forecast
        .filter((f) => f.expand)
        .map((f, idx) => (
          <g key={f.y}>
            {/* vertical guide */}
            <line
              x1={x(f.y)}
              y1={pad.t}
              x2={x(f.y)}
              y2={pad.t + innerH}
              stroke="#FFB547"
              strokeWidth="0.8"
              strokeDasharray="3 5"
              opacity="0.55"
            />
            {/* year chip floating above the plot — replaces the long inline labels */}
            <g transform={`translate(${x(f.y)}, ${pad.t - 22})`}>
              <rect x="-22" y="-11" width="44" height="20" rx="3" fill="#FFB547" fillOpacity="0.14" stroke="#FFB547" strokeWidth="0.8" />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                className="font-mono"
                style={{ fontSize: 11, fontWeight: 600, fill: '#FFB547' }}
              >
                {f.y}
              </text>
            </g>
            {/* small numbered badge tying chip to the card below */}
            <circle cx={x(f.y)} cy={y(f.v)} r="5" fill="#FFB547" />
            <circle cx={x(f.y)} cy={y(f.v)} r="9" fill="none" stroke="#FFB547" strokeWidth="0.8" opacity="0.4" />
            <text
              x={x(f.y)}
              y={y(f.v) + 3.5}
              textAnchor="middle"
              className="font-mono"
              style={{ fontSize: 9, fontWeight: 700, fill: '#1A1D21' }}
            >
              {idx + 1}
            </text>
          </g>
        ))}
    </svg>
  );
}
