import { PAPERS, PAPERS_CATEGORIES } from '@/lib/data/papers';
import { PapersGrid } from './PapersGrid';

export const metadata = {
  title: 'Landmark Quantum Papers · Repository',
  description: 'Curated index of the most important quantum computing papers from Feynman 1982 to today. Searchable by topic, era, and impact. Each with citation, summary, and modern relevance.',
};

export const revalidate = 86400;

export default function PapersPage() {
  return (
    <div>
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-14 pb-10">
          <p className="eyebrow mb-3">Repository</p>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-3xl">
            Landmark quantum papers
          </h1>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-3xl">
            The papers that built the field. Curated, summarized, source-linked. From Feynman&apos;s
            1982 proposal through Quantinuum Helios and Google&apos;s Quantum Echoes verifiable
            advantage paper.{' '}
            <span className="font-mono text-accent-quantum">{PAPERS.length}</span> papers and growing.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <PapersGrid papers={PAPERS} categories={PAPERS_CATEGORIES} />
      </section>
    </div>
  );
}
