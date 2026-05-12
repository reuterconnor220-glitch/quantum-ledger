import Link from 'next/link';
import { ROADMAPS } from '@/lib/data/roadmaps';
import { getCompany } from '@/lib/data/companies';

export const metadata = {
  title: 'Roadmaps · Side-by-Side Hardware Plans with Credibility Scores',
  description: 'Every major quantum hardware roadmap compared honestly — stated milestones, credibility audits, gating challenges. Discount aggressive 2030 universal FTQC claims by 12-24 months.',
};

export const revalidate = 86400;

function credColor(score: number) {
  if (score >= 8) return 'text-accent-data';
  if (score >= 6) return 'text-accent-warn';
  if (score >= 4) return 'text-accent-warn';
  return 'text-accent-down';
}

function credBg(score: number) {
  if (score >= 8) return 'bg-accent-data';
  if (score >= 6) return 'bg-accent-warn';
  if (score >= 4) return 'bg-accent-warn/70';
  return 'bg-accent-down';
}

export default function RoadmapsPage() {
  const sorted = [...ROADMAPS].sort((a, b) => b.credibilityScore - a.credibilityScore);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow mb-2">Roadmaps</p>
        <h1 className="font-display text-display-2 font-medium tracking-tight">Hardware roadmaps · honest comparison</h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          Quantum roadmaps are marketing documents wrapped around physics. Every vendor will tell you they
          are on track. They are not all on track. What follows is calibrated against three filters: (1) have
          they hit prior milestones on the dates they originally announced, (2) are they publishing physics or
          press releases, and (3) what does "fault tolerance" actually mean in their definition.
        </p>
        <p className="mt-3 text-text-secondary leading-relaxed text-sm">
          Credibility scored 0–10. Apply a 12–24 month discount to every public date in this industry.
        </p>
      </header>

      {/* Top synthesis */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        <SynthCard title="Most Credible" subtitle="Ship dates · published physics · real customers">
          IBM · Google · Quantinuum · Atom + Microsoft · IQM
        </SynthCard>
        <SynthCard title="Plausible · Unproven" subtitle="Real plans · physics not yet shown at scale">
          QuEra · Pasqal · IonQ · Alice &amp; Bob · Xanadu · Rigetti · D-Wave
        </SynthCard>
        <SynthCard title="Discount Heavily" subtitle="Weak evidence base or delayed execution">
          Microsoft Majorana · PsiQuantum
        </SynthCard>
      </section>

      {/* Roadmap cards */}
      <section className="space-y-5">
        {sorted.map((r) => {
          const c = getCompany(r.companySlug);
          return (
            <article key={r.companySlug} className="card p-6">
              <header className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div>
                  <h2 className="font-display text-2xl tracking-tight">
                    <Link href={c ? `/companies/${c.slug}` : '#'} className="text-text-primary hover:text-accent-quantum">
                      {r.vendor}
                    </Link>
                  </h2>
                  <p className="text-sm text-text-muted font-mono mt-0.5">{r.modality}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">Credibility</p>
                  <p className={`font-mono text-2xl ${credColor(r.credibilityScore)}`}>
                    {r.credibilityScore.toFixed(1)}<span className="text-text-muted text-sm">/10</span>
                  </p>
                </div>
              </header>

              <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-3xl italic">
                {r.credibilityNotes}
              </p>

              {/* Milestone timeline */}
              <div className="mb-5">
                <p className="eyebrow mb-3">Milestones</p>
                <ol className="space-y-2">
                  {r.milestones.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="font-mono text-text-muted w-20 flex-shrink-0">{m.year}</span>
                      <span
                        className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                          m.status === 'shipped'
                            ? 'bg-accent-data'
                            : m.status === 'announced'
                              ? 'bg-accent-warn'
                              : 'bg-text-muted'
                        }`}
                      />
                      <span className={m.status === 'aspirational' ? 'text-text-muted' : 'text-text-primary'}>
                        {m.label}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider ml-auto text-text-muted">
                        {m.status}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-t border-border-muted pt-4">
                <div>
                  <p className="eyebrow mb-1">Gating challenge</p>
                  <p className="text-text-secondary leading-relaxed">{r.gatingChallenge}</p>
                </div>
                <div>
                  <p className="eyebrow mb-1">Definition of success</p>
                  <p className="text-text-secondary leading-relaxed">{r.definitionOfSuccess}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl tracking-tight mb-4">Why "universal FTQC by 2030" claims should be discounted</h2>
        <ul className="space-y-3 text-text-secondary leading-relaxed text-sm">
          <li>
            <strong className="text-text-primary">The word "universal."</strong> Universal FTQC requires a
            complete logical-gate set including non-Clifford T-gates, which requires magic-state distillation
            overhead no vendor has demonstrated at scale.
          </li>
          <li>
            <strong className="text-text-primary">The word "fully."</strong> A 100-logical-qubit machine running
            surface-code-protected circuits is FTQC, but not at the scale that breaks RSA or simulates FeMoco.
            Vendors use "FTQC" to mean both. They are not the same.
          </li>
          <li>
            <strong className="text-text-primary">Roadmaps in this industry historically slip 12–24 months.</strong>{' '}
            Pasqal slipped openly. PsiQuantum slipped quietly. IonQ has reframed metrics multiple times.
          </li>
        </ul>
      </section>
    </div>
  );
}

function SynthCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <p className="eyebrow mb-1">{title}</p>
      <p className="text-xs text-text-muted mb-3">{subtitle}</p>
      <p className="text-sm text-text-secondary leading-relaxed">{children}</p>
    </div>
  );
}
