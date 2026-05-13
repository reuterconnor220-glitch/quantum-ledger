// VolatilityHistory — right-rail heatmap of sector returns over the last N weeks.
//
// Pure SVG, server-rendered. No client JS. Drop into the brief aside:
//
//   import { VolatilityHistory } from '@/components/brief/VolatilityHistory';
//   ...
//   <VolatilityHistory />        {/* uses the inline fallback matrix */}
//   <VolatilityHistory matrix={...} />   {/* pass real data when wired */}
//
// Matrix shape: rows are sectors (top → bottom), columns are weeks (oldest → newest).
// Cell value is a daily-return-equivalent in %, e.g. +2.4 means +2.4%.
//
// Colour encoding: accent-data (teal) for positive, accent-down for negative,
// alpha-scaled to magnitude up to ±5%. Zero / near-zero → near-empty cell so
// the active heat reads at a glance.
//
// Tokens used: accent-data, accent-down, text-text-muted, border, font-mono,
// font-display. No hardcoded hex — all colour comes from CSS currentColor or
// the tailwind config, so warmer tone tweaks flow through automatically.

type Row = { label: string; values: number[] };

const DEFAULT_MATRIX: Row[] = [
  { label: 'Superconducting', values: [+1.2, -0.4, +2.1, +0.8, -1.6, +3.2, -2.4, +0.9] },
  { label: 'Trapped-ion',     values: [+0.4, +1.1, -2.2, +1.4, +0.6, +2.8, +1.1, -0.8] },
  { label: 'Photonic',        values: [-1.8, -0.9, +0.4, -3.1, +1.4, +0.7, -2.1, +1.6] },
  { label: 'Neutral atom',    values: [+2.4, +1.6, +0.9, +2.2, +1.8, -0.6, +1.4, +2.7] },
  { label: 'Annealing',       values: [-0.6, -1.2, -2.4, -0.9, -1.8, +0.2, -3.1, -1.4] },
  { label: 'Topological',     values: [+0.1, -0.2, +0.3, -0.4, +0.6, -0.8, +0.4, -0.3] },
  { label: 'Sector index',    values: [+0.6, +0.0, -0.2, +0.4, +0.2, +0.9, -0.9, +0.5] },
];

const WEEK_LABELS = ['W-7', 'W-6', 'W-5', 'W-4', 'W-3', 'W-2', 'W-1', 'W-0'];

export function VolatilityHistory({
  matrix = DEFAULT_MATRIX,
  weekLabels = WEEK_LABELS,
  title = 'Sector heat',
  subtitle = 'Eight weeks · daily-return equivalent',
}: {
  matrix?: Row[];
  weekLabels?: string[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="card p-5 border border-border bg-bg-surface rounded-sm">
      <div className="flex items-baseline justify-between mb-1">
        <p className="eyebrow">{title}</p>
        <span className="text-[10px] font-mono text-text-muted tracking-wider">
          ± 5%
        </span>
      </div>
      <p className="font-display italic text-text-muted text-[13px] mb-4 leading-snug">
        {subtitle}
      </p>

      <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-2 gap-y-1 items-center">
        {matrix.map((row) => (
          <RowLine key={row.label} row={row} />
        ))}

        {/* Footer: week ticks aligned under the cells */}
        <span />
        <div
          className="grid mt-1"
          style={{
            gridTemplateColumns: `repeat(${weekLabels.length}, minmax(0, 1fr))`,
            gap: '2px',
          }}
        >
          {weekLabels.map((w, i) => (
            <span
              key={w}
              className="text-[8.5px] font-mono uppercase tracking-[0.08em] text-text-muted text-center"
              style={{ opacity: i === weekLabels.length - 1 ? 1 : 0.5 }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[10px] font-mono text-text-muted tracking-wider">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-accent-down/70 rounded-[1px]" />
          <span>−</span>
          <span className="inline-block w-2.5 h-2.5 bg-border rounded-[1px]" />
          <span>0</span>
          <span className="inline-block w-2.5 h-2.5 bg-accent-data/70 rounded-[1px]" />
          <span>+</span>
        </div>
        <span>weekly · close-to-close</span>
      </div>
    </div>
  );
}

function RowLine({ row }: { row: Row }) {
  const last = row.values[row.values.length - 1];
  return (
    <>
      <span className="text-[10px] font-mono uppercase tracking-[0.06em] text-text-secondary truncate">
        {row.label}
      </span>
      <div
        className="grid items-stretch"
        style={{
          gridTemplateColumns: `repeat(${row.values.length}, minmax(0, 1fr))`,
          gap: '2px',
        }}
      >
        {row.values.map((v, i) => (
          <Cell key={i} value={v} isLast={i === row.values.length - 1} />
        ))}
      </div>
      <span />
      <span
        className={
          'text-[10px] font-mono tabular-nums text-right -mt-1 ' +
          (last >= 0 ? 'text-accent-data' : 'text-accent-down')
        }
      >
        {last >= 0 ? '+' : ''}
        {last.toFixed(1)}%
      </span>
    </>
  );
}

function Cell({ value, isLast }: { value: number; isLast: boolean }) {
  const a = Math.min(1, Math.abs(value) / 5);
  const op = 0.08 + a * 0.78;
  const cls = value >= 0 ? 'bg-accent-data' : 'bg-accent-down';
  return (
    <span
      title={`${value >= 0 ? '+' : ''}${value.toFixed(1)}%`}
      className={
        'block h-4 rounded-[1.5px] ' +
        cls +
        ' ' +
        (isLast ? 'ring-1 ring-text-primary/40' : '')
      }
      style={{ opacity: op }}
    />
  );
}
