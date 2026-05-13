import Link from 'next/link';
import { getCompany } from '@/lib/data/companies';
import { getNewsForCompany } from '@/lib/data/news';
import { formatDate, formatUsd } from '@/lib/utils';
import { SentimentChip } from '@/components/SentimentChip';

export const metadata = {
  title: 'QNT IPO Watch · Quantinuum\'s Pricing Event for Public Quantum',
  description: 'Live tracker for Quantinuum (QNT) Nasdaq listing — pricing range, roadshow signals, and ripple effects on every public quantum pure-play comp.',
};

const TIMELINE = [
  { date: '2021-12-01', label: 'Quantinuum formed (Honeywell + Cambridge Quantum)', status: 'past' },
  { date: '2024-01-15', label: 'JPMorgan-led $300M raise at $5B valuation', status: 'past' },
  { date: '2025-09-15', label: '$600M raise at $10B pre-money (Honeywell + JPMorgan)', status: 'past' },
  { date: '2025-11-05', label: 'Helios commercial launch — 96 physical / 48 logical qubits', status: 'past' },
  { date: '2026-05-08', label: 'S-1 publicly filed targeting $20B+ valuation under ticker QNT', status: 'current' },
  { date: 'TBD', label: 'Roadshow + investor education', status: 'future' },
  { date: 'TBD', label: 'Pricing range and book building', status: 'future' },
  { date: 'TBD', label: 'IPO pricing and Nasdaq listing', status: 'future' },
  { date: 'TBD', label: 'First post-IPO Q1 earnings print (180-day lockup)', status: 'future' },
];

export default function QntPage() {
  const q = getCompany('quantinuum');
  const news = getNewsForCompany('quantinuum');

  if (!q) return null;

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <header className="mb-12 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="qdot-live" />
          <span className="eyebrow">Active Catalyst Tracker</span>
        </div>
        <h1 className="font-display text-display-2 font-medium tracking-tight">
          QNT IPO Watch
        </h1>
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          Quantinuum publicly filed its S-1 on May 8, 2026 targeting a Nasdaq listing under ticker{' '}
          <span className="font-mono text-accent-quantum">QNT</span> at a $20B+ valuation. This is the
          single most important pricing event for the public quantum cohort in 2026 — it sets a ceiling
          (or floor) that every pure-play trades against.
        </p>
      </header>

      {/* Key facts */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
          <Stat label="Target valuation" value="$15–20B+" />
          <Stat label="Target raise" value="Up to $1.5B" />
          <Stat label="2025 revenue" value="$30.9M" />
          <Stat label="Implied P/S" value="~485–650×" emphasis />
        </div>
        <p className="mt-3 text-xs font-mono uppercase tracking-wider text-text-muted">
          Bookrunners: J.P. Morgan · Morgan Stanley · Jefferies · Evercore ISI · Exchange: Nasdaq Global Select (proposed)
        </p>
      </section>

      {/* Valuation history */}
      <section className="mb-12">
        <p className="eyebrow mb-4">Valuation history</p>
        <div className="card overflow-x-auto">
          <table className="ql-table w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Round / event</th>
                <th className="num">Size</th>
                <th className="num">Valuation</th>
                <th className="text-text-secondary text-xs">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono text-xs">Jan 2024</td>
                <td>Equity raise</td>
                <td className="num">$300M</td>
                <td className="num">$5B pre</td>
                <td className="text-text-secondary text-xs font-sans">JPMorgan-led</td>
              </tr>
              <tr>
                <td className="font-mono text-xs">Sep 2025</td>
                <td>Equity raise</td>
                <td className="num">$600M</td>
                <td className="num">$10B pre</td>
                <td className="text-text-secondary text-xs font-sans">2× step-up in 20 months</td>
              </tr>
              <tr className="bg-accent-quantum/5">
                <td className="font-mono text-xs text-accent-quantum">Jun 2026 (target)</td>
                <td className="text-text-primary">IPO pricing (proposed)</td>
                <td className="num">Up to $1.5B</td>
                <td className="num text-accent-quantum">$15–20B</td>
                <td className="text-text-secondary text-xs font-sans">~485–650× P/S</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-text-muted leading-relaxed max-w-3xl">
          At the $20B high end, IPO valuation is roughly 2× the September 2025 private mark and ~485–650×
          trailing revenue. Every dollar of IPO valuation above ~$5B is effectively a call option on
          Apollo&apos;s 2029 fault-tolerant target — the single most consequential forward-looking
          statement in the filing.
        </p>
      </section>

      {/* Why this matters */}
      <section className="mb-12">
        <h2 className="font-display text-3xl tracking-tight mb-4">Why this matters for everyone else</h2>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            A $20B price tag against $30.9M of 2025 revenue is roughly <span className="font-mono text-text-primary">650× sales</span>.
            That multiple either drags every public pure-play upward (IonQ at ~111×, Rigetti at ~900×,
            D-Wave at ~670×, QUBT at ~460×) or — if QNT prices badly — becomes the ceiling everyone
            else trades against.
          </p>
          <p>
            Honeywell (HON) holders are the most direct beneficiaries: ~54% pre-IPO ownership translates
            into partial liquidity and a likely special dividend at listing. IonQ holders should expect
            their multiple compressed against a higher-fidelity competitor with Microsoft Azure
            distribution. The narrative shifts from &quot;IonQ is the only public quantum company&quot; to
            &quot;Quantinuum vs IonQ vs everyone else.&quot;
          </p>
          <p>
            <strong className="text-accent-warn">Float-management warning:</strong> Xanadu (XNDU) dropped
            67% premarket on May 4 after filing to register 294M resale shares. The lesson for QNT —
            and for Pasqal&apos;s pending SPAC — is that newly-public quantum names must manage post-IPO
            float carefully or retail flows turn fast.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-12">
        <p className="eyebrow mb-4">Path to pricing</p>
        <ol className="relative border-l-2 border-border ml-3 space-y-6">
          {TIMELINE.map((t, i) => (
            <li key={i} className="ml-6">
              <span
                className={`absolute -left-[10px] mt-0.5 w-4 h-4 rounded-full border-2 border-bg ${
                  t.status === 'current'
                    ? 'bg-accent-quantum animate-pulse-dot'
                    : t.status === 'past'
                      ? 'bg-text-muted'
                      : 'bg-bg-elevated'
                }`}
              />
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs text-text-muted">{t.date}</span>
                {t.status === 'current' && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-accent-quantum/15 text-accent-quantum rounded-xs uppercase tracking-wider">
                    Now
                  </span>
                )}
              </div>
              <p
                className={`mt-1 ${
                  t.status === 'future' ? 'text-text-muted' : 'text-text-primary'
                } leading-snug`}
              >
                {t.label}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Quantinuum financials snapshot */}
      <section className="mb-12">
        <p className="eyebrow mb-4">Filed financials (from S-1)</p>
        <div className="card p-6">
          <table className="ql-table w-full">
            <thead>
              <tr>
                <th>Metric</th>
                <th className="num">FY 2024</th>
                <th className="num">FY 2025</th>
                <th className="num">Q1 2026</th>
                <th className="text-text-secondary text-xs">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-sans text-text-primary">Revenue</td>
                <td className="num">$23M</td>
                <td className="num">$30.9M</td>
                <td className="num">$5.2M</td>
                <td className="text-text-secondary text-xs font-sans">Q1 dropped from $19.1M YoY</td>
              </tr>
              <tr>
                <td className="font-sans text-text-primary">YoY growth</td>
                <td className="num">—</td>
                <td className="num text-accent-data">+34%</td>
                <td className="num text-accent-down">-73%</td>
                <td className="text-text-secondary text-xs font-sans">Revenue lumpy on system sales</td>
              </tr>
              <tr>
                <td className="font-sans text-text-primary">Net loss</td>
                <td className="num">$155M</td>
                <td className="num">$192.6M</td>
                <td className="num">$136.6M</td>
                <td className="text-text-secondary text-xs font-sans">Widening with Helios ramp</td>
              </tr>
              <tr>
                <td className="font-sans text-text-primary">Honeywell ownership</td>
                <td className="num">~58%</td>
                <td className="num">~54%</td>
                <td className="num">~54%</td>
                <td className="text-text-secondary text-xs font-sans">Pre-IPO dilution</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Risk factors */}
      <section className="mb-12">
        <p className="eyebrow mb-4">Key risk factors disclosed in S-1</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RiskCard
            title="Customer concentration"
            severity="High"
            body="RIKEN (Japan's national research institute) accounted for ~60% of 2025 revenue, driven by the System Model H2 delivery to RIKEN Wako (April 2026). Q1 2026 revenue dropped 73% YoY because the prior-year quarter included the RIKEN hardware sale recognition. Lumpy enterprise-system revenue, not subscription."
          />
          <RiskCard
            title="National Security Agreement"
            severity="Material"
            body="Quantinuum operates under an NSA with the U.S. government restricting foreign-national hiring and requiring government approval for certain executive appointments. Constrains talent pool and M&A optionality."
          />
          <RiskCard
            title="Isotope supply chain"
            severity="Material"
            body="Trapped-ion qubits depend on a specific isotope (likely ytterbium-171 or barium-137) sourced from the U.S. Department of Energy with no long-term commercial contract in place. Single-supplier risk on a foundational input."
          />
          <RiskCard
            title="Tax Receivable Agreement (Up-C)"
            severity="Material"
            body="Standard Up-C structure: Quantinuum Inc. must pay Continuing Common Unitholders — primarily Honeywell and Cambridge Quantum legacy holders — 85% of cash tax savings realized from the IPO and subsequent unit exchanges. Pre-empts a portion of future cash flow."
          />
          <RiskCard
            title="Honeywell overhang"
            severity="High"
            body="~54–55% Honeywell ownership pre-IPO; Honeywell will retain ~45–50% post-listing and has stated it will gradually reduce. Multi-year supply pressure as lock-ups expire. Up to two Honeywell-designated board seats while ≥40% holding."
          />
          <RiskCard
            title="Apollo 2029 execution"
            severity="High"
            body="Net losses are widening with Helios ramp. Apollo (fault-tolerant) not slated until 2029–2030. Failure to deliver Apollo on time, or any negative IV&V signal from DARPA QBI, would compress the multiple meaningfully."
          />
        </div>
      </section>

      {/* Peer multiples */}
      <section className="mb-12">
        <p className="eyebrow mb-4">Peer multiples · public quantum cohort</p>
        <div className="card overflow-x-auto">
          <table className="ql-table w-full">
            <thead>
              <tr>
                <th>Company</th>
                <th>Ticker</th>
                <th className="num">2025 revenue</th>
                <th className="num">Market cap</th>
                <th className="num">EV / revenue</th>
                <th className="text-text-secondary text-xs">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IonQ</td>
                <td className="font-mono text-xs">IONQ</td>
                <td className="num">$130.0M</td>
                <td className="num">~$19.4B</td>
                <td className="num">~150×</td>
                <td className="text-text-secondary text-xs font-sans">+202% YoY; only pure-play &gt;$100M revenue</td>
              </tr>
              <tr>
                <td>Rigetti</td>
                <td className="font-mono text-xs">RGTI</td>
                <td className="num">$7.1M</td>
                <td className="num">~$6.3B</td>
                <td className="num text-accent-down">~890×</td>
                <td className="text-text-secondary text-xs font-sans">Revenue declined 34%; $590M cash</td>
              </tr>
              <tr>
                <td>D-Wave</td>
                <td className="font-mono text-xs">QBTS</td>
                <td className="num">$24.6M</td>
                <td className="num">~$8.0B</td>
                <td className="num">~325×</td>
                <td className="text-text-secondary text-xs font-sans">+179%; annealing not gate-model</td>
              </tr>
              <tr>
                <td>Arqit Quantum</td>
                <td className="font-mono text-xs">ARQQ</td>
                <td className="num">$0.5M</td>
                <td className="num">~$235M</td>
                <td className="num">~440×</td>
                <td className="text-text-secondary text-xs font-sans">Crypto, not compute</td>
              </tr>
              <tr className="bg-accent-quantum/5">
                <td className="text-accent-quantum">Quantinuum (proposed)</td>
                <td className="font-mono text-xs text-accent-quantum">QNT</td>
                <td className="num">$30.9M</td>
                <td className="num text-accent-quantum">$15–20B</td>
                <td className="num text-accent-quantum">~485–650×</td>
                <td className="text-text-secondary text-xs font-sans">Highest growth; 60% RIKEN concentration</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-text-muted leading-relaxed max-w-3xl">
          Quantinuum is priced at a premium to the cohort despite revenue concentration. The bull case:
          Helios is the highest-fidelity gate-model quantum computer publicly benchmarked, and the Apollo
          2029 commitment is more credible than peers&apos;. The bear case: 60% RIKEN concentration plus
          the Q1 2026 revenue collapse means the multiple is supported by narrative, not run rate. EV/Revenue
          shown as Market Cap / FY2025 revenue without net-cash adjustment — directional, not precise.
        </p>
      </section>

      {/* Product roadmap */}
      <section className="mb-12">
        <p className="eyebrow mb-4">Product roadmap (as disclosed)</p>
        <div className="card overflow-x-auto">
          <table className="ql-table w-full">
            <thead>
              <tr>
                <th>System</th>
                <th>Status / target</th>
                <th className="num">Physical qubits</th>
                <th className="num">Logical qubits</th>
                <th className="text-text-secondary text-xs">Key spec</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-text-primary">Helios</td>
                <td>Commercial launch Nov 2025</td>
                <td className="num">98</td>
                <td className="num">48</td>
                <td className="text-text-secondary text-xs font-sans">99.921% 2Q fidelity</td>
              </tr>
              <tr>
                <td className="text-text-primary">Sol (interim)</td>
                <td>~2027 (est.)</td>
                <td className="num">~200</td>
                <td className="num">~50+</td>
                <td className="text-text-secondary text-xs font-sans">Bridge system</td>
              </tr>
              <tr>
                <td className="text-text-primary">Apollo</td>
                <td>2029 target</td>
                <td className="num">Thousands</td>
                <td className="num">Hundreds</td>
                <td className="text-text-secondary text-xs font-sans">Universal, fully fault-tolerant</td>
              </tr>
              <tr>
                <td className="text-text-primary">Lumos</td>
                <td>2030+</td>
                <td className="num">&gt;1M physical</td>
                <td className="num">—</td>
                <td className="text-text-secondary text-xs font-sans">Utility-scale</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Coverage */}
      {news.length > 0 && (
        <section className="mb-12">
          <p className="eyebrow mb-4">QNT-related coverage</p>
          <ul className="space-y-2">
            {news.map((n) => (
              <li key={n.id}>
                <a href={n.sourceUrl} target="_blank" rel="noreferrer" className="card card-hover block p-4">
                  <div className="flex items-center gap-2 text-xs text-text-muted font-mono mb-1">
                    <span className="uppercase">{n.source.replace('_', ' ')}</span>
                    <span>·</span>
                    <span>{formatDate(n.publishedAt)}</span>
                    <SentimentChip valuationImpact={n.valuationImpact} className="ml-auto" />
                  </div>
                  <p className="text-text-primary leading-snug">{n.title}</p>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed line-clamp-2">{n.summary}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="text-xs text-text-muted leading-relaxed border-t border-border pt-6">
        Honeywell (NYSE: HON) is the closest public-market proxy for Quantinuum pre-IPO — see the{' '}
        <Link href="/companies/honeywell" className="text-accent-quantum hover:underline">
          Honeywell company page
        </Link>{' '}
        for the parent&apos;s context. For the broader pricing context, see the{' '}
        <Link href="/companies" className="text-accent-quantum hover:underline">
          full company tracker
        </Link>{' '}
        and{' '}
        <Link href="/revenue" className="text-accent-quantum hover:underline">
          revenue landscape
        </Link>
        .
      </div>
    </div>
  );
}

function Stat({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className={`bg-bg-surface p-4 ${emphasis ? 'border-l-2 border-l-accent-warn' : ''}`}>
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p className={`mt-1 font-mono text-xl ${emphasis ? 'text-accent-warn' : 'text-text-primary'}`}>{value}</p>
    </div>
  );
}

function RiskCard({ title, severity, body }: { title: string; severity: 'High' | 'Material'; body: string }) {
  const color = severity === 'High' ? 'text-accent-down border-accent-down/40 bg-accent-down/5' : 'text-accent-warn border-accent-warn/40 bg-accent-warn/5';
  return (
    <article className="card p-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-display text-base leading-tight text-text-primary">{title}</h3>
        <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs border ${color}`}>
          {severity}
        </span>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{body}</p>
    </article>
  );
}
