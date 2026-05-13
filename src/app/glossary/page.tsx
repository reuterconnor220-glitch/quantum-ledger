import { GLOSSARY } from '@/lib/data/glossary';
import { GlossaryGrid } from './GlossaryGrid';

export const metadata = {
  title: 'Quantum Glossary · Every Term, Defined',
  description: 'Searchable glossary of every important quantum computing and quantum technology term. From qubit to qLDPC codes, with audience tiers and cross-links.',
};

export const revalidate = 86400;

export default function GlossaryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-14 pb-10">
          <p className="eyebrow mb-3">Reference</p>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-3xl">
            Quantum glossary
          </h1>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-3xl">
            Every quantum term defined. Searchable. Filterable by topic and difficulty.
            {' '}<span className="font-mono text-accent-quantum">{GLOSSARY.length}</span> entries and growing.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <GlossaryGrid terms={GLOSSARY} />
      </section>
    </div>
  );
}
