import Link from 'next/link';
import { ESSAYS, ESSAY_CATEGORY_LABEL } from '@/lib/data/essays';
import { CollectionPageLd } from '@/components/JsonLd';

export const metadata = {
  alternates: { canonical: '/essays' },
  title: 'Essays',
  description:
    'Long-form analysis and frameworks for thinking about the quantum sector. Opinionated, sourced, signed by Connor Reuter.',
};

export default function EssaysPage() {
  const sorted = [...ESSAYS].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  return (
    <div>
      <CollectionPageLd
        name="Quantum Ledger Essays"
        description="Long-form opinion and frameworks for the quantum sector — signed, sourced, and held accountable over time."
        url="https://quantumledger.report/essays"
        items={sorted.map((e) => ({
          name: e.title,
          url: `https://quantumledger.report/essays/${e.slug}`,
        }))}
      />
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-14 pb-10">
          <p className="eyebrow mb-3">Essays</p>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-3xl">
            Long-form frameworks for the quantum sector.
          </h1>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-3xl">
            One signed essay each month. Frameworks I use to evaluate companies, deep dives on
            specific milestones, and commentary on cycles that move money. Opinionated, sourced, and
            updated when the underlying picture changes.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="space-y-4">
          {sorted.map((e) => (
            <Link key={e.slug} href={`/essays/${e.slug}`} className="card card-hover block p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-2">
                <span className="uppercase tracking-wider text-accent-quantum">{ESSAY_CATEGORY_LABEL[e.category]}</span>
                <span>·</span>
                <span>{e.publishDate}</span>
                <span>·</span>
                <span>{e.readMinutes} min read</span>
                <span>·</span>
                <span>{e.author}</span>
              </div>
              <h2 className="font-display text-2xl tracking-tight text-text-primary leading-tight mb-2">{e.title}</h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">{e.subtitle}</p>
              <p className="text-xs text-text-muted italic">{e.teaser}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
