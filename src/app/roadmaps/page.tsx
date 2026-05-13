import Link from 'next/link';
import { ROADMAPS } from '@/lib/data/roadmaps';
import { SENSING_ROADMAPS, COMMS_ROADMAPS, PQC_TIMELINES } from '@/lib/data/roadmaps-multitrack';
import { getCompany } from '@/lib/data/companies';

export const metadata = {
  title: 'Roadmaps · Computing, Sensing, Communications, PQC Migration',
  description: 'Four parallel quantum technology roadmaps — hardware computing, quantum sensing, communications/networking, and post-quantum cryptography government timelines. Side-by-side comparison with credibility scores.',
};

export const revalidate = 86400;

function credColor(score: number) {
  if (score >= 8) return 'text-accent-data';
  if (score >= 6) return 'text-accent-warn';
  if (score >= 4) return 'text-accent-warn';
  return 'text-accent-down';
}

const TRACKS = [
  { slug: 'computing', label: 'Computing', count: ROADMAPS.length },
  { slug: 'sensing', label: 'Sensing', count: SENSING_ROADMAPS.length },
  { slug: 'communications', label: 'Communications', count: COMMS_ROADMAPS.length },
  { slug: 'pqc', label: 'PQC Migration', count: PQC_TIMELINES.length },
];

const STATUS_COLOR: Record<string, string> = {
  shipped: 'bg-accent-data',
  announced: 'bg-accent-warn',
  aspirational: 'bg-text-muted',
};

export default function RoadmapsPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow mb-2">Multi-track Roadmaps</p>
        <h1 className="font-display text-display-2 font-medium tracking-tight">
          Four roadmaps · one quantum future
        </h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          Quantum is four distinct technology tracks — computing, sensing, communications, and the
          regulatory roadmap for post-quantum cryptography migration. Each has different physics,
          vendors, customers, and credibility profiles. Computing has the loudest narrative; sensing
          has the most shipped revenue today; communications splits US-vs-China policy; PQC is the
          one with hard government deadlines.
        </p>
      </header>

      {/* Track switcher */}
      <nav className="mb-12 flex flex-wrap gap-2 sticky top-16 z-30 bg-bg py-3 -mx-2 px-2 border-b border-border">
        {TRACKS.map((t) => (
          <a
            key={t.slug}
            href={`#${t.slug}`}
            className="px-4 py-2 text-sm font-mono uppercase tracking-wider border border-border rounded-sm text-text-secondary hover:text-text-primary hover:border-accent-quantum/40 transition"
          >
            {t.label} ({t.count})
          </a>
        ))}
      </nav>

      {/* COMPUTING */}
      <section id="computing" className="mb-16 scroll-mt-20">
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-quantum" />
            <p className="text-xs font-mono uppercase tracking-wider text-text-muted">Track 1 of 4</p>
          </div>
          <h2 className="font-display text-3xl tracking-tight">Quantum computing hardware roadmaps</h2>
          <p className="mt-3 text-text-secondary leading-relaxed max-w-3xl">
            Every major vendor&apos;s stated path to fault-tolerant quantum computing — with honest
            credibility scoring against their historical track record of slipped milestones.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="card p-4">
            <p className="eyebrow mb-1">Most credible</p>
            <p className="text-sm text-text-secondary">IBM · Google · Quantinuum · Atom+MS · IQM</p>
          </div>
          <div className="card p-4">
            <p className="eyebrow mb-1">Plausible · unproven</p>
            <p className="text-sm text-text-secondary">QuEra · Pasqal · IonQ · Alice &amp; Bob · Xanadu · Rigetti · D-Wave</p>
          </div>
          <div className="card p-4">
            <p className="eyebrow mb-1">Discount heavily</p>
            <p className="text-sm text-text-secondary">Microsoft Majorana · PsiQuantum</p>
          </div>
        </div>

        <div className="space-y-4">
          {[...ROADMAPS].sort((a, b) => b.credibilityScore - a.credibilityScore).map((r) => {
            const c = getCompany(r.companySlug);
            return (
              <article key={r.companySlug} className="card p-5">
                <header className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <h3 className="font-display text-xl tracking-tight">
                      <Link href={c ? `/companies/${c.slug}` : '#'} className="text-text-primary hover:text-accent-quantum">
                        {r.vendor}
                      </Link>
                    </h3>
                    <p className="text-xs text-text-muted font-mono mt-0.5">{r.modality}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">Credibility</p>
                    <p className={`font-mono text-xl ${credColor(r.credibilityScore)}`}>
                      {r.credibilityScore.toFixed(1)}<span className="text-text-muted text-xs">/10</span>
                    </p>
                  </div>
                </header>
                <p className="text-xs text-text-secondary leading-relaxed mb-3 italic">{r.credibilityNotes}</p>
                <ol className="space-y-1.5 text-sm">
                  {r.milestones.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-xs text-text-muted w-16 flex-shrink-0">{m.year}</span>
                      <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${STATUS_COLOR[m.status]}`} />
                      <span className={m.status === 'aspirational' ? 'text-text-muted' : 'text-text-primary'}>{m.label}</span>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>
      </section>

      {/* SENSING */}
      <section id="sensing" className="mb-16 scroll-mt-20">
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-data" />
            <p className="text-xs font-mono uppercase tracking-wider text-text-muted">Track 2 of 4</p>
          </div>
          <h2 className="font-display text-3xl tracking-tight">Quantum sensing roadmaps</h2>
          <p className="mt-3 text-text-secondary leading-relaxed max-w-3xl">
            The track with the most shipped product today. 3-5 year cycle vs 10-15 for computing.
            Defense-led (DARPA RoQS, AUKUS Pillar 2, NGA MagQuest, UK MoD), with medical OPM-MEG and
            commercial gravimetry on the way.
          </p>
        </header>

        <div className="space-y-4">
          {SENSING_ROADMAPS.map((r) => (
            <article key={r.slug} className="card p-5">
              <header className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h3 className="font-display text-xl tracking-tight text-text-primary">{r.vendor}</h3>
                  <p className="text-xs text-text-muted font-mono mt-0.5">{r.modality}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">Credibility</p>
                  <p className={`font-mono text-xl ${credColor(r.credibilityScore)}`}>
                    {r.credibilityScore.toFixed(1)}<span className="text-text-muted text-xs">/10</span>
                  </p>
                </div>
              </header>
              <p className="text-xs text-text-secondary leading-relaxed mb-3 italic">{r.credibilityNotes}</p>
              <ol className="space-y-1.5 text-sm">
                {r.milestones.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-xs text-text-muted w-16 flex-shrink-0">{m.year}</span>
                    <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${STATUS_COLOR[m.status]}`} />
                    <span className={m.status === 'aspirational' ? 'text-text-muted' : 'text-text-primary'}>{m.label}</span>
                  </li>
                ))}
              </ol>
              {r.partners && (
                <p className="mt-3 text-xs text-text-muted font-mono pt-3 border-t border-border-muted">
                  Partners: <span className="text-text-secondary">{r.partners}</span>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* COMMUNICATIONS */}
      <section id="communications" className="mb-16 scroll-mt-20">
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-warn" />
            <p className="text-xs font-mono uppercase tracking-wider text-text-muted">Track 3 of 4</p>
          </div>
          <h2 className="font-display text-3xl tracking-tight">Quantum communications &amp; networking</h2>
          <p className="mt-3 text-text-secondary leading-relaxed max-w-3xl">
            Bifurcated US vs China policy. The NSA does not recommend QKD for National Security Systems;
            China operates a 12,000-km national backbone with 145 nodes across 80 cities. EuroQCI is
            building the European equivalent. Distributed quantum computing is the longer-tail story.
          </p>
        </header>

        <div className="space-y-4">
          {COMMS_ROADMAPS.map((r) => (
            <article key={r.slug} className="card p-5">
              <header className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h3 className="font-display text-xl tracking-tight text-text-primary">{r.vendor}</h3>
                  <p className="text-xs text-text-muted font-mono mt-0.5">{r.modality}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono">Credibility</p>
                  <p className={`font-mono text-xl ${credColor(r.credibilityScore)}`}>
                    {r.credibilityScore.toFixed(1)}<span className="text-text-muted text-xs">/10</span>
                  </p>
                </div>
              </header>
              <p className="text-xs text-text-secondary leading-relaxed mb-3 italic">{r.credibilityNotes}</p>
              <ol className="space-y-1.5 text-sm">
                {r.milestones.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-xs text-text-muted w-16 flex-shrink-0">{m.year}</span>
                    <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${STATUS_COLOR[m.status]}`} />
                    <span className={m.status === 'aspirational' ? 'text-text-muted' : 'text-text-primary'}>{m.label}</span>
                  </li>
                ))}
              </ol>
              {r.partners && (
                <p className="mt-3 text-xs text-text-muted font-mono pt-3 border-t border-border-muted">
                  Partners: <span className="text-text-secondary">{r.partners}</span>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* PQC */}
      <section id="pqc" className="mb-16 scroll-mt-20">
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-down" />
            <p className="text-xs font-mono uppercase tracking-wider text-text-muted">Track 4 of 4</p>
          </div>
          <h2 className="font-display text-3xl tracking-tight">PQC migration · government timelines</h2>
          <p className="mt-3 text-text-secondary leading-relaxed max-w-3xl">
            This is a regulatory roadmap, not a vendor one. Hard deadlines from NSA, NIST, EU, UK,
            Canada, Japan all converge on 2030-2035 for federal/government completion. Realistic
            consensus among compliance vendors: median large-enterprise migration slips to 2037-2040.
          </p>
        </header>

        <div className="space-y-4">
          {PQC_TIMELINES.map((r) => (
            <article key={r.slug} className="card p-5">
              <header className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-accent-quantum">{r.jurisdiction}</p>
                  <h3 className="font-display text-xl tracking-tight text-text-primary mt-0.5">{r.framework}</h3>
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm whitespace-nowrap ${
                  r.status === 'in-effect' ? 'bg-accent-data/15 text-accent-data' :
                  r.status === 'phased' ? 'bg-accent-warn/15 text-accent-warn' :
                  'bg-text-muted/15 text-text-muted'
                }`}>
                  {r.status}
                </span>
              </header>
              <ol className="space-y-1.5 text-sm mb-4">
                {r.milestones.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-xs text-text-muted w-16 flex-shrink-0">{m.year}</span>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5 bg-accent-quantum" />
                    <div className="flex-1">
                      <span className="text-text-primary">{m.label}</span>
                      {m.phase && (
                        <span className="ml-2 text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-bg rounded-xs text-text-muted">
                          {m.phase}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-3 border-t border-border-muted">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono mb-1">Enforcement</p>
                  <p className="text-text-secondary leading-relaxed">{r.enforcement}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-accent-warn font-mono mb-1">Compliance challenge</p>
                  <p className="text-text-secondary leading-relaxed">{r.challenge}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border mt-12 pt-12">
        <h2 className="font-display text-2xl tracking-tight mb-4 max-w-3xl">
          Why &quot;universal FTQC by 2030&quot; claims should be discounted
        </h2>
        <ul className="space-y-3 text-text-secondary leading-relaxed text-sm max-w-3xl">
          <li>
            <strong className="text-text-primary">The word &quot;universal.&quot;</strong> Universal FTQC requires a complete logical-gate set including non-Clifford T-gates,
            which requires magic-state distillation overhead no vendor has demonstrated at scale.
          </li>
          <li>
            <strong className="text-text-primary">The word &quot;fully.&quot;</strong> A 100-logical-qubit machine running surface-code-protected circuits is FTQC but not at the
            scale that breaks RSA or simulates FeMoco. Vendors use &quot;FTQC&quot; to mean both.
          </li>
          <li>
            <strong className="text-text-primary">Roadmaps in this industry historically slip 12–24 months.</strong> Pasqal slipped openly. PsiQuantum slipped quietly.
            IonQ has reframed metrics multiple times. Apply a discount.
          </li>
        </ul>
      </section>
    </div>
  );
}
