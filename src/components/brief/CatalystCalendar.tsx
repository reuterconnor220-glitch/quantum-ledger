// CatalystCalendar — right-rail panel of upcoming sector catalysts.
//
// Server-rendered, no client JS. Drop into the brief aside:
//
//   import { CatalystCalendar } from '@/components/brief/CatalystCalendar';
//   ...
//   <CatalystCalendar />
//   <CatalystCalendar events={...} now={...} />
//
// Each event is one row: date (mono day/month), event headline (italic-serif),
// category chip, and a small "days to" tabular-num. Past events are not
// rendered; the panel auto-trims to the next N upcoming.
//
// Tokens used: accent-data, accent-warn, accent-quantum, accent-down,
// text-text-primary, text-text-secondary, text-text-muted, border,
// font-mono, font-display, tabular-nums. No hardcoded hex.

import Link from 'next/link';

type Weight = 'high' | 'medium' | 'low';
type Category =
  | 'Earnings'
  | 'Policy'
  | 'Product'
  | 'Capital'
  | 'Science'
  | 'Conference';

interface Event {
  date: string; // ISO date — YYYY-MM-DD
  label: string;
  category: Category;
  weight?: Weight;
  href?: string;
}

const DEFAULT_EVENTS: Event[] = [
  { date: '2026-05-19', label: 'IonQ · Q1 2026 earnings (AMC)', category: 'Earnings', weight: 'high' },
  { date: '2026-05-22', label: 'IBM Quantum Summit (Yorktown)', category: 'Conference', weight: 'medium' },
  { date: '2026-05-28', label: 'Quantinuum S-1 pricing range expected', category: 'Capital', weight: 'high' },
  { date: '2026-06-04', label: 'D-Wave · Q1 earnings (BMO)', category: 'Earnings', weight: 'medium' },
  { date: '2026-06-09', label: 'NIST PQC FIPS finalization window', category: 'Policy', weight: 'high' },
  { date: '2026-06-17', label: 'IonQ algorithmic-qubit roadmap update', category: 'Product', weight: 'medium' },
  { date: '2026-06-24', label: 'APS DAMOP — neutral-atom showcase', category: 'Conference', weight: 'low' },
  { date: '2026-07-08', label: 'IonQ annual user conference (DC)', category: 'Conference', weight: 'medium' },
  { date: '2026-10-14', label: 'DARPA QBI · Stage B mid-term reviews', category: 'Policy', weight: 'medium' },
  { date: '2026-12-09', label: 'DARPA QBI · Stage C decisions (Q4)', category: 'Policy', weight: 'high' },
];

const CATEGORY_COLOR: Record<Category, string> = {
  Earnings: 'border-accent-data/60 text-accent-data bg-accent-data/8',
  Policy: 'border-accent-warn/60 text-accent-warn bg-accent-warn/5',
  Product: 'border-text-secondary/40 text-text-secondary bg-bg-elevated/40',
  Capital: 'border-accent-quantum/60 text-accent-quantum bg-accent-quantum/8',
  Science: 'border-accent-data/40 text-accent-data/80 bg-accent-data/5',
  Conference: 'border-border text-text-muted bg-transparent',
};

export function CatalystCalendar({
  events = DEFAULT_EVENTS,
  now = new Date(),
  limit = 6,
  title = 'Catalysts',
  subtitle = 'Next on the wire',
}: {
  events?: Event[];
  now?: Date;
  limit?: number;
  title?: string;
  subtitle?: string;
}) {
  const today = startOfDay(now);
  const upcoming = events
    .map((e) => ({ ...e, d: new Date(e.date + 'T00:00:00') }))
    .filter((e) => e.d.getTime() >= today.getTime())
    .sort((a, b) => a.d.getTime() - b.d.getTime())
    .slice(0, limit);

  return (
    <div className="card p-5 border border-border bg-bg-surface rounded-sm">
      <div className="flex items-baseline justify-between mb-1">
        <p className="eyebrow">{title}</p>
        <Link
          href="/calendar"
          className="text-[10px] font-mono text-text-muted hover:text-accent-data tracking-wider"
        >
          full calendar ›
        </Link>
      </div>
      <p className="font-display italic text-text-muted text-[13px] mb-4 leading-snug">
        {subtitle}
      </p>

      {upcoming.length === 0 ? (
        <p className="font-display italic text-text-muted text-sm py-6">
          No catalysts on the immediate horizon.
        </p>
      ) : (
        <ol className="grid">
          {upcoming.map((e, i) => (
            <li key={`${e.date}-${i}`}>
              <div className="grid grid-cols-[48px_minmax(0,1fr)_auto] gap-3 py-3 border-t border-border first:border-t-0 items-baseline">
                <DateBlock d={e.d} />
                <div className="min-w-0">
                  <p
                    className={
                      'font-display tracking-tight leading-snug ' +
                      (e.weight === 'high'
                        ? 'text-[15px] text-text-primary'
                        : 'text-[14px] text-text-secondary')
                    }
                  >
                    {e.href ? (
                      <Link href={e.href} className="hover:text-accent-data">
                        {e.label}
                      </Link>
                    ) : (
                      e.label
                    )}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={
                        'text-[9px] font-mono uppercase tracking-[0.1em] px-1.5 py-px rounded-sm border ' +
                        CATEGORY_COLOR[e.category]
                      }
                    >
                      {e.category}
                    </span>
                    {e.weight === 'high' && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full bg-accent-data"
                        style={{ boxShadow: '0 0 6px currentColor' }}
                        aria-hidden
                      />
                    )}
                  </div>
                </div>
                <DaysTo d={e.d} now={today} />
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-3 pt-3 border-t border-border text-[10px] font-mono text-text-muted tracking-wider flex items-center justify-between">
        <span>updated nightly</span>
        <span className="tabular-nums">{upcoming.length} upcoming</span>
      </div>
    </div>
  );
}

function DateBlock({ d }: { d: Date }) {
  const day = d.getDate();
  const mon = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  return (
    <div className="text-center leading-none">
      <div className="font-display tabular-nums text-[24px] tracking-tight text-text-primary">
        {String(day).padStart(2, '0')}
      </div>
      <div className="mt-0.5 text-[9px] font-mono uppercase tracking-[0.1em] text-text-muted">
        {mon}
      </div>
    </div>
  );
}

function DaysTo({ d, now }: { d: Date; now: Date }) {
  const days = Math.round((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    return (
      <span className="font-mono text-[10px] tracking-wider text-accent-data tabular-nums">
        today
      </span>
    );
  }
  if (days === 1) {
    return (
      <span className="font-mono text-[10px] tracking-wider text-accent-data tabular-nums">
        T-1
      </span>
    );
  }
  return (
    <span className="font-mono text-[10px] tracking-wider text-text-muted tabular-nums">
      T-{days}
    </span>
  );
}

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}
