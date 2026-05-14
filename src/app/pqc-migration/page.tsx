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
  title: 'PQC Migration Tracker · Who Has Actually Shipped',
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
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
      {/* ────────── Masthead ────────── */}
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span className="qdot-live" />
            <span>The Migration</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display text-[22px] tracking-tight text-text-primary normal-case">ML-KEM · ML-DSA · SLH-DSA</span>
            <span className="text-text-muted/60">·</span>
            <span>FIPS 203 / 204 / 205</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            NIST standards finalized 2024-08-13 · CNSA 2.0 deadlines 2027–2030
          </div>
          <div className="text-right leading-relaxed">
            {PQC_DEPLOYMENTS.length} organizations tracked
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.92] tracking-[-0.025em] text-[clamp(46px,8vw,112px)]">
          The <em className="not-italic font-normal text-accent-data">PQC</em> Migration.
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[60ch]">
          Who has shipped post-quantum cryptography, who has committed, who is silent.
        </p>
      </header>

      {/* ────────── Hero ────────── */}
      <section className="mt-9 py-7 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 border-b border-border">
        <div>
          <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-3">
            The largest commercial impact of quantum, by an order of magnitude
          </p>
          <p className="font-display italic text-xl text-text-secondary leading-snug mb-4 max-w-[60ch]">
            Is not buying a quantum computer. It is replacing the cryptographic plumbing on every
            system that needs to survive past 2030.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-[60ch]">
            NIST standardized ML-KEM, ML-DSA, and SLH-DSA in August 2024. Apple, Cloudflare, Google,
            Mozilla, and AWS have already migrated meaningful portions of TLS traffic to hybrid PQC.
            This page tracks who has actually shipped, who is hybrid-live, who has committed, and —
            the most interesting list — who is silent despite obvious exposure.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <StatusTotal label="Shipped" value={totals.shipped} color="text-accent-data" />
          <StatusTotal label="Hybrid live" value={totals.hybrid} color="text-accent-quantum" />
          <StatusTotal label="Announced" value={totals.announced} color="text-accent-warn" />
          <StatusTotal label="Committed" value={totals.committed} color="text-blue-300" />
          <StatusTotal label="Silent" value={totals.silent} color="text-accent-down" />
          <StatusTotal label="Total tracked" value={PQC_DEPLOYMENTS.length} color="text-text-primary" />
        </div>
      </section>

      {/* ────────── Status legend ────────── */}
      <section className="mt-9">
        <div className="mb-5 pb-3 border-b border-text-primary/90">
          <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
            Status taxonomy
          </p>
          <h2 className="font-display font-normal text-3xl tracking-tight">Five buckets, defined.</h2>
        </div>
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
        <section key={status} className="mt-14">
          <div className="mb-5 pb-3 border-b border-text-primary/90">
            <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
              {PQC_STATUS_LABEL[status]} · {byStatus[status].length} {byStatus[status].length === 1 ? 'entry' : 'entries'}
            </p>
            <h2 className="font-display font-normal text-3xl tracking-tight">
              {status === 'shipped' && 'Live in production — what runs today.'}
                {status === 'hybrid' && 'Hybrid deployments — PQC alongside classical.'}
                {status === 'announced' && 'Committed with a deadline.'}
                {status === 'committed' && 'Committed without a date.'}
                {status === 'silent' && 'Silent despite obvious exposure.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {byStatus[status].map((d, i) => (
              <DeploymentCard key={`${d.org}-${i}`} deployment={d} />
            ))}
          </div>
        </section>
      ))}

      {/* Why this matters */}
      <section className="mt-16 max-w-3xl">
        <div className="mb-5 pb-3 border-b border-text-primary/90">
          <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
            Why this tracker matters
          </p>
          <h2 className="font-display font-normal text-3xl tracking-tight">The PQC market is real today.</h2>
        </div>
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
      </section>
    </div>
  );
}

function StatusTotal({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="card p-3">
      <p className="text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono">{label}</p>
      <p className={`mt-1 font-display text-2xl tracking-tight tabular-nums ${color}`}>{value}</p>
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
