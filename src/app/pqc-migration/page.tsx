import Link from 'next/link';
import {
  PQC_DEPLOYMENTS,
  PQC_DOMAIN_LABEL,
  PQC_STATUS_LABEL,
  PQC_STATUS_COLOR,
  type PqcStatus,
  type PqcDomain,
} from '@/lib/data/pqc-migration';

export const metadata = {
  title: 'PQC Migration Tracker · Who Has Actually Shipped · Quantum Ledger',
  description:
    "The definitive tracker of post-quantum cryptography migration status across consumer messaging, browsers, cloud, government, and finance. Who has shipped, who has committed, who is silent.",
};

export const revalidate = 86400;

export default function PqcMigrationPage() {
  const byStatus: Record<PqcStatus, typeof PQC_DEPLOYMENTS> = {
    shipped: [],
    hybrid: [],
    announced: [],
    committed: [],
    silent: [],
  };
  for (const d of PQC_DEPLOYMENTS) byStatus[d.status].push(d);

  const totals = {
    shipped: byStatus.shipped.length,
    hybrid: byStatus.hybrid.length,
    announced: byStatus.announced.length,
    committed: byStatus.committed.length,
    silent: byStatus.silent.length,
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="qdot-live" />
            <span className="eyebrow">PQC migration · live tracker</span>
          </div>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-4xl">
            Who has actually shipped post-quantum.
          </h1>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-3xl">
            NIST standardized ML-KEM, ML-DSA, and SLH-DSA in August 2024. The most consequential
            quantum-driven enterprise project is not buying a quantum computer; it is replacing the
            cryptographic plumbing on every system that needs to survive past 2030. This page tracks
            who has actually shipped, who is hybrid-live, who has committed, and — the most
            interesting list — who is silent despite obvious exposure.
          </p>
        </div>
      </section>

      {/* Status totals */}
      <section className="border-b border-border bg-bg-elevated/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border rounded-md overflow-hidden">
            <StatusTotal label="Shipped" value={totals.shipped} color="text-accent-data" />
            <StatusTotal label="Hybrid live" value={totals.hybrid} color="text-accent-quantum" />
            <StatusTotal label="Announced" value={totals.announced} color="text-accent-warn" />
            <StatusTotal label="Committed" value={totals.committed} color="text-blue-300" />
            <StatusTotal label="Silent" value={totals.silent} color="text-accent-down" />
          </div>
        </div>
      </section>

      {/* Status legend + framing */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          <Legend
            badge="Shipped"
            color="bg-accent-data/15 text-accent-data"
            text="Post-quantum cryptography live in production traffic or signed code, default-on."
          />
          <Legend
            badge="Hybrid live"
            color="bg-accent-quantum/15 text-accent-quantum"
            text="PQC running alongside classical, often as opt-in or in preview for specific workloads."
          />
          <Legend
            badge="Announced"
            color="bg-accent-warn/15 text-accent-warn"
            text="Public commitment with a specific date or regulatory deadline."
          />
          <Legend
            badge="Committed"
            color="bg-blue-500/15 text-blue-300"
            text="Public commitment without a specific date — often a published roadmap with TBD milestones."
          />
          <Legend
            badge="Silent"
            color="bg-accent-down/15 text-accent-down"
            text="No public PQC roadmap despite obvious exposure. The most interesting list."
          />
        </div>
      </section>

      {/* Full table grouped by status */}
      {(['shipped', 'hybrid', 'announced', 'committed', 'silent'] as PqcStatus[]).map((status) => (
        <section
          key={status}
          className={
            status === 'hybrid' || status === 'committed'
              ? 'border-y border-border bg-bg-elevated/40'
              : ''
          }
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
            <header className="mb-5">
              <p className="eyebrow mb-2">
                {PQC_STATUS_LABEL[status]} · {byStatus[status].length} {byStatus[status].length === 1 ? 'entry' : 'entries'}
              </p>
              <h2 className="font-display text-2xl tracking-tight">
                {status === 'shipped' && 'Live in production — what runs today.'}
                {status === 'hybrid' && 'Hybrid deployments — PQC alongside classical.'}
                {status === 'announced' && 'Committed with a deadline.'}
                {status === 'committed' && 'Committed without a date.'}
                {status === 'silent' && 'Silent despite obvious exposure.'}
              </h2>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {byStatus[status].map((d, i) => (
                <DeploymentCard key={`${d.org}-${i}`} deployment={d} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Why this matters */}
      <section className="border-t border-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
          <p className="eyebrow mb-3">Why this tracker matters</p>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              The largest commercial impact of quantum computing, by an order of magnitude, is not
              the new compute paradigm but the cryptographic transition forced by Shor&apos;s
              algorithm. Every TLS connection, every signed firmware blob, every long-lived signed
              document is potentially exposed to a future cryptographically-relevant quantum
              computer (CRQC). Harvest-now-decrypt-later attacks make the calendar urgent even
              though a CRQC does not yet exist.
            </p>
            <p>
              The PQC market is forecast at $50B+ cumulative through 2035 (McKinsey, BCG mid-cases).
              Most of that spend is software services and HSM replacement, not new product sales.
              The names with shipping PQC products today — Cloudflare, Apple, Google, NIST-aligned
              vendors — capture the first wave; the names silent at scale (notably Meta, X) are
              accumulating risk that auditors will start to price.
            </p>
            <p>
              See <Link href="/glossary" className="text-accent-quantum hover:underline">/glossary</Link> for
              ML-KEM, ML-DSA, SLH-DSA, HNDL, Q-Day, CNSA 2.0 definitions. See{' '}
              <Link href="/learn/bb84" className="text-accent-quantum hover:underline">/learn/bb84</Link> for
              the QKD alternative architecture and the NSA&apos;s reasoning for preferring PQC over QKD.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatusTotal({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-bg-surface p-4">
      <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{label}</p>
      <p className={`mt-1 font-mono text-2xl ${color}`}>{value}</p>
    </div>
  );
}

function Legend({ badge, color, text }: { badge: string; color: string; text: string }) {
  return (
    <div className="card p-3">
      <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs ${color}`}>
        {badge}
      </span>
      <p className="text-xs text-text-secondary mt-2 leading-relaxed">{text}</p>
    </div>
  );
}

function DeploymentCard({ deployment }: { deployment: (typeof PQC_DEPLOYMENTS)[number] }) {
  return (
    <article className="card p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-tight">{deployment.org}</h3>
          <p className="text-xs text-text-muted font-mono mt-0.5">{deployment.product}</p>
        </div>
        <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs whitespace-nowrap ${PQC_STATUS_COLOR[deployment.status]}`}>
          {PQC_STATUS_LABEL[deployment.status]}
        </span>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted mb-2">
        <span className="uppercase tracking-wider">{PQC_DOMAIN_LABEL[deployment.domain as PqcDomain]}</span>
        {deployment.date && (
          <>
            <span>·</span>
            <span>{deployment.date}</span>
          </>
        )}
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{deployment.details}</p>
      <p className="text-[10px] font-mono text-text-muted mt-2">
        Algorithm: <span className="text-text-secondary">{deployment.algorithm}</span>
      </p>
      {deployment.source && (
        <a href={deployment.source} target="_blank" rel="noreferrer" className="inline-block mt-2 text-[10px] font-mono text-accent-quantum hover:underline">
          source ↗
        </a>
      )}
    </article>
  );
}
