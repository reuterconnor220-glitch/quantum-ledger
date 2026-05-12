import Link from 'next/link';
import { COMPANIES, publicCompanies } from '@/lib/data/companies';
import { formatPct, formatUsd } from '@/lib/utils';

export const metadata = {
  title: 'Revenue Landscape · Where Quantum Money Actually Comes From',
  description: 'The honest revenue picture: $1-1.5B sector revenue against $11.1B private capital and $30-40B government commitments. Source taxonomy, forecasts, burn-to-revenue reality check.',
};

export const revalidate = 86400;

const REVENUE_BUCKETS = [
  { name: 'Government contracts', low: 400, high: 600, share: 0.45, recurring: false, color: 'bg-accent-quantum', notes: 'DARPA QBI, DOE QIS Centers, AFRL, NQCC, EU Quantum Flagship' },
  { name: 'Hardware sales / on-prem', low: 200, high: 350, share: 0.22, recurring: false, color: 'bg-accent-data', notes: 'IBM System One/Two deals dominate; IQM leads in unit count' },
  { name: 'Consulting & services', low: 150, high: 250, share: 0.17, recurring: true, color: 'bg-accent-warn', notes: 'Accenture, IBM Consulting, Deloitte, Capgemini' },
  { name: 'Cloud / QCaaS', low: 80, high: 150, share: 0.10, recurring: true, color: 'bg-accent-down', notes: 'AWS Braket, Azure Quantum, IBM Quantum Platform, IonQ Cloud' },
  { name: 'Research grants & partnerships', low: 60, high: 100, share: 0.07, recurring: false, color: 'bg-blue-500/60', notes: 'NSF, EPSRC, NSERC channeled through industry' },
  { name: 'Post-quantum cryptography', low: 40, high: 80, share: 0.05, recurring: true, color: 'bg-pink-500/60', notes: 'Arqit, ID Quantique, PQShield, SandboxAQ' },
  { name: 'Software & licensing', low: 30, high: 60, share: 0.04, recurring: true, color: 'bg-emerald-500/60', notes: 'Classiq, Zapata legacy, Quantinuum InQuanto, QC Ware' },
];

const FORECASTS = [
  { source: 'McKinsey QC Monitor 2026', target: 2028, value: 4.4e9 },
  { source: 'BCC Research', target: 2029, value: 5.3e9 },
  { source: 'IDC / Hyperion', target: 2027, value: 9.5e9 },
  { source: 'McKinsey (implied)', target: 2030, value: 20e9 },
  { source: 'McKinsey (computing only)', target: 2035, value: 55e9 },
  { source: 'BCG (vendor)', target: 2040, value: 130e9 },
  { source: 'BCG (economic value)', target: 2040, value: 650e9 },
];

const GOV_CONTRACTS = [
  { date: '2025-11-01', label: 'DOE renews 5 National QIS Centers', amount: 625e6, recipient: 'BNL, Fermilab, Argonne, LBNL, ORNL' },
  { date: '2024-04-29', label: 'Australian Govt + Queensland → PsiQuantum', amount: 620e6, recipient: 'PsiQuantum Brisbane facility' },
  { date: '2024-07-25', label: 'Illinois + DARPA Chicago package', amount: 760e6, recipient: 'PsiQuantum (Illinois Quantum Park anchor)' },
  { date: '2025-11-11', label: 'DARPA QBI Stage B selections', amount: 165e6, recipient: '11 companies (~$15M each)' },
  { date: '2024-09-15', label: 'AFRL → IonQ networking contract', amount: 54.5e6, recipient: 'IonQ' },
  { date: '2025-01-15', label: 'AFRL → IonQ (Qubitekk)', amount: 21.1e6, recipient: 'IonQ' },
  { date: '2025-06-01', label: 'UK National Quantum Strategy', amount: 908e6, recipient: 'NQCC + £670M over 10 years' },
  { date: '2026-03-15', label: 'UK ProQure procurement program', amount: 2670e6, recipient: '£2B national procurement' },
];

export default function RevenuePage() {
  const totalLow = REVENUE_BUCKETS.reduce((s, b) => s + b.low, 0);
  const totalHigh = REVENUE_BUCKETS.reduce((s, b) => s + b.high, 0);

  const pureplays = publicCompanies().filter((c) => c.purity === 'pure_play' && c.revenueTtmUsd);
  const totalPurePlayRev = pureplays.reduce((s, c) => s + (c.revenueTtmUsd ?? 0), 0);
  const totalPurePlayMcap = pureplays.reduce((s, c) => s + (c.marketCapUsd ?? 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      {/* Hero */}
      <header className="max-w-3xl mb-12">
        <p className="eyebrow mb-2">Revenue Landscape</p>
        <h1 className="font-display text-display-2 font-medium tracking-tight">
          Where quantum money actually comes from
        </h1>
        <p className="mt-5 text-text-secondary leading-relaxed text-lg">
          The quantum computing sector produced roughly <span className="text-accent-quantum font-mono">$1.0–1.5B</span> in
          vendor revenue in 2025 against <span className="text-accent-quantum font-mono">~$11.1B</span> in cumulative
          private capital and <span className="text-accent-quantum font-mono">$30–40B</span> in government commitments.
          Approximately 70–80% of "quantum revenue" today is non-recurring: government contracts, R&amp;D services,
          one-off hardware installations. McKinsey calls this a commercial tipping point. The data suggests it
          is more accurately the end of the pre-revenue phase for a small handful of vendors.
        </p>
      </header>

      {/* Reality check gauges */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border mb-16 rounded-md overflow-hidden">
        <Gauge label="Sector revenue (2025)" value={`${formatUsd(totalLow * 1e6)}–${formatUsd(totalHigh * 1e6)}`} sub="McKinsey + triangulation" />
        <Gauge label="Private capital raised" value="$11.1B" sub="cumulative, all-time (Tracxn)" />
        <Gauge label="Govt commitments" value="$30–40B" sub="announced 2018–2026 globally" />
        <Gauge label="Capital ÷ revenue" value="25–35×" sub="hype-to-reality ratio" emphasis />
      </section>

      {/* Revenue source taxonomy */}
      <section className="mb-16">
        <p className="eyebrow mb-2">Where the revenue comes from</p>
        <h2 className="font-display text-3xl tracking-tight mb-6">2025 revenue source mix</h2>

        {/* Stacked bar */}
        <div className="card p-6">
          <div className="flex h-12 rounded-sm overflow-hidden mb-4">
            {REVENUE_BUCKETS.map((b) => (
              <div
                key={b.name}
                style={{ width: `${b.share * 100}%` }}
                className={`${b.color} relative group cursor-help`}
                title={`${b.name}: ${(b.share * 100).toFixed(0)}%`}
              >
                <div className="absolute inset-0 hover:bg-white/10 transition" />
              </div>
            ))}
          </div>

          <table className="ql-table w-full">
            <thead>
              <tr>
                <th>Source</th>
                <th className="num">2025 Est. ($M)</th>
                <th className="num">% Sector</th>
                <th>Recurring?</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {REVENUE_BUCKETS.map((b) => (
                <tr key={b.name}>
                  <td className="font-sans text-text-primary">
                    <span className={`inline-block w-3 h-3 rounded-xs ${b.color} mr-2 align-middle`} />
                    {b.name}
                  </td>
                  <td className="num">${b.low}–{b.high}M</td>
                  <td className="num">{(b.share * 100).toFixed(0)}%</td>
                  <td className={b.recurring ? 'text-accent-data text-xs' : 'text-text-muted text-xs'}>
                    {b.recurring ? 'Yes' : 'No'}
                  </td>
                  <td className="text-text-secondary text-xs font-sans">{b.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Public pure-play burn check */}
      <section className="mb-16">
        <p className="eyebrow mb-2">Burn-to-revenue check</p>
        <h2 className="font-display text-3xl tracking-tight mb-2">Public pure-plays — the brutal math</h2>
        <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">
          Combined market cap of public pure-plays: <span className="font-mono text-text-primary">{formatUsd(totalPurePlayMcap)}</span>{' '}
          on combined TTM revenue of <span className="font-mono text-text-primary">{formatUsd(totalPurePlayRev)}</span>.
          IonQ alone accounts for {((187 / (totalPurePlayRev / 1e6)) * 100).toFixed(0)}% of the cohort&apos;s revenue.
          The other four combined generated less than $35M against a combined market cap of ~$18B.
        </p>

        <div className="card overflow-x-auto">
          <table className="ql-table min-w-[680px]">
            <thead>
              <tr>
                <th className="pl-5">Company</th>
                <th className="num">Mkt Cap</th>
                <th className="num">Rev TTM</th>
                <th className="num">Mkt Cap ÷ Rev</th>
                <th className="num">Cash</th>
                <th className="pr-5 num">Runway</th>
              </tr>
            </thead>
            <tbody>
              {pureplays.map((c) => {
                const mult = c.revenueTtmUsd && c.marketCapUsd ? c.marketCapUsd / c.revenueTtmUsd : null;
                return (
                  <tr key={c.slug}>
                    <td className="pl-5">
                      <Link href={`/companies/${c.slug}`} className="text-text-primary hover:text-accent-quantum font-sans font-medium">
                        {c.name} <span className="text-text-muted text-xs ml-1">{c.ticker}</span>
                      </Link>
                    </td>
                    <td className="num">{formatUsd(c.marketCapUsd)}</td>
                    <td className="num">{formatUsd(c.revenueTtmUsd)}</td>
                    <td className="num text-accent-warn">{mult ? `${mult.toFixed(0)}×` : '—'}</td>
                    <td className="num">{formatUsd(c.cashUsd)}</td>
                    <td className="pr-5 num">{c.runwayQuarters ? `${(c.runwayQuarters / 4).toFixed(1)}y` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* TAM Forecasts */}
      <section className="mb-16">
        <p className="eyebrow mb-2">Forecasts</p>
        <h2 className="font-display text-3xl tracking-tight mb-2">TAM disagrees by an order of magnitude</h2>
        <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">
          Analyst forecasts disagree by an order of magnitude — primarily because some count direct vendor
          revenue while others count downstream economic value. McKinsey&apos;s $1B 2025 figure is the only one
          near current reality. Every 2030+ forecast assumes a logical-qubit inflection that has not yet
          been demonstrated commercially.
        </p>

        <div className="card p-6">
          <ul className="space-y-3">
            {FORECASTS.map((f, i) => {
              const max = Math.max(...FORECASTS.map((x) => x.value));
              const width = (f.value / max) * 100;
              return (
                <li key={i}>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-mono text-text-secondary">
                      {f.source} · {f.target}
                    </span>
                    <span className="font-mono text-text-primary">{formatUsd(f.value)}</span>
                  </div>
                  <div className="h-2 bg-bg-elevated rounded-xs overflow-hidden">
                    <div className="h-full bg-accent-quantum/70" style={{ width: `${width}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Government contracts */}
      <section className="mb-16">
        <p className="eyebrow mb-2">Government tracker</p>
        <h2 className="font-display text-3xl tracking-tight mb-6">Recent major contracts &amp; programs</h2>

        <div className="card overflow-x-auto">
          <table className="ql-table min-w-[640px]">
            <thead>
              <tr>
                <th className="pl-5">Date</th>
                <th>Program</th>
                <th>Recipient</th>
                <th className="num pr-5">Amount</th>
              </tr>
            </thead>
            <tbody>
              {GOV_CONTRACTS
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((g, i) => (
                  <tr key={i}>
                    <td className="pl-5 text-text-secondary">{g.date}</td>
                    <td className="font-sans text-text-primary">{g.label}</td>
                    <td className="text-text-secondary text-xs font-sans">{g.recipient}</td>
                    <td className="num pr-5 text-accent-quantum">{formatUsd(g.amount)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Inflection */}
      <section className="mb-16">
        <p className="eyebrow mb-2">Inflection</p>
        <h2 className="font-display text-3xl tracking-tight mb-4">What needs to be true for revenue to scale</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-display text-lg mb-3">Today (2026)</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>· IBM Condor: 1,121 physical qubits</li>
              <li>· Atom Computing: 1,180 atoms</li>
              <li>· Quantinuum Helios: 96 physical / 48 logical</li>
              <li>· Two-qubit fidelity: 99.5–99.9% best systems</li>
              <li>· Logical error rate: ~10⁻³ to 10⁻⁴</li>
              <li>· Hours-scale logical demonstrations</li>
            </ul>
          </div>
          <div className="card p-5 border-l-2 border-l-accent-quantum">
            <h3 className="font-display text-lg mb-3 text-accent-quantum">Required for utility</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>· 10,000–1M+ physical qubits</li>
              <li>· 100–1,000 logical qubits</li>
              <li>· Two-qubit fidelity &gt;99.99%</li>
              <li>· Logical error rate &lt;10⁻⁷ to 10⁻⁹</li>
              <li>· Days-to-weeks of continuous logical computation</li>
              <li>· New algorithms beyond Shor/Grover/VQE with proven speedup</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm text-text-secondary leading-relaxed max-w-3xl">
          Use-case readiness ranking (analyst consensus): <span className="text-text-primary">chemistry/materials simulation</span> first
          (2028–2032), then <span className="text-text-primary">optimization</span> (slower, classical keeps improving), then
          <span className="text-text-primary"> machine learning</span> (most speculative — QML advantage remains theoretically contested).
        </p>
      </section>

      <p className="text-xs text-text-muted leading-relaxed max-w-2xl">
        Sources: McKinsey Quantum Technology Monitor 2026, BCG, BCC Research, IDC/Hyperion, Tracxn,
        Crunchbase, SEC filings, DARPA, DOE, agency press releases. Figures rounded; pre-IFRS adjustments
        noted where material. Last verified May 12, 2026. See{' '}
        <Link href="/methodology" className="text-accent-quantum hover:underline">
          methodology
        </Link>
        .
      </p>
    </div>
  );
}

function Gauge({
  label,
  value,
  sub,
  emphasis = false,
}: {
  label: string;
  value: string;
  sub: string;
  emphasis?: boolean;
}) {
  return (
    <div className={`bg-bg-surface p-5 ${emphasis ? 'border-l-2 border-l-accent-warn' : ''}`}>
      <p className="eyebrow mb-2">{label}</p>
      <p className={`font-mono text-2xl ${emphasis ? 'text-accent-warn' : 'text-text-primary'}`}>{value}</p>
      <p className="mt-1 text-xs text-text-muted">{sub}</p>
    </div>
  );
}
