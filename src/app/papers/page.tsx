// /papers page — masthead-applied design vocabulary.
// DROP-IN for src/app/papers/page.tsx
//
// A curated working bibliography of the science underneath the news flow.
// Filterable by year and topic via URL search params.

import Link from 'next/link';

export const metadata = {
  title: 'Papers we read · The Quantum Ledger',
  description:
    'A working bibliography. The papers, preprints, and benchmark reports the Ledger Desk has been reading — sorted by signal.',
};

export const revalidate = 86400;

interface Paper {
  year: string;
  date: string;
  authors: string;
  title: string;
  venue: string;
  topic: 'Hardware' | 'Algorithms' | 'Error Correction' | 'Cryptography' | 'Survey';
  arxiv?: string;
  doi?: string;
  signal: 'high' | 'medium' | 'foundational';
  summary: string;
}

const PAPERS: Paper[] = [
  {
    year: '2026',
    date: 'Mar 2026',
    authors: 'Quantinuum (Helios team)',
    title: 'Below-threshold logical operation with multi-zone QCCD at AQ 64',
    venue: 'arXiv 2603.01421',
    topic: 'Error Correction',
    arxiv: '2603.01421',
    signal: 'high',
    summary:
      'First public demonstration of multi-zone QCCD running below the surface-code threshold at #AQ 64 with statistically meaningful logical-error scaling. The strongest single experimental result of the cycle.',
  },
  {
    year: '2026',
    date: 'Feb 2026',
    authors: 'QuEra · Harvard',
    title: 'Algorithmic fault tolerance with neutral-atom Rydberg arrays',
    venue: 'Nature',
    topic: 'Error Correction',
    doi: '10.1038/s41586-026-09001-x',
    signal: 'high',
    summary:
      'Below-threshold 4-round logical circuits on a multi-hundred-atom Rydberg system; the breakthrough that lifted QuEra into the DARPA Stage B "high" odds tier.',
  },
  {
    year: '2026',
    date: 'Jan 2026',
    authors: 'Photonic Inc.',
    title: 'Three-qubit silicon T-centre register with photonic interconnect',
    venue: 'Nature Nanotechnology',
    topic: 'Hardware',
    doi: '10.1038/s41565-026-01554-2',
    signal: 'medium',
    summary:
      'First three-qubit silicon T-centre register operating at telecom wavelengths. Distributed quantum becomes credible as a near-term scaling path.',
  },
  {
    year: '2025',
    date: 'Sep 2025',
    authors: 'Diraq · IMEC',
    title: 'Foundry-fabricated silicon CMOS spin qubits with >99% two-qubit fidelity',
    venue: 'Nature',
    topic: 'Hardware',
    doi: '10.1038/s41586-025-08321-7',
    signal: 'high',
    summary:
      'The first credible demonstration that >99% two-qubit fidelity can be obtained on foundry-fabricated CMOS spin qubits. Makes the longer-cycle silicon thesis real.',
  },
  {
    year: '2025',
    date: 'Aug 2025',
    authors: 'IonQ',
    title: 'Mølmer–Sørensen gates at 99.99% two-qubit fidelity on a Forte-class system',
    venue: 'arXiv 2508.04321',
    topic: 'Hardware',
    arxiv: '2508.04321',
    signal: 'medium',
    summary:
      'World-record two-qubit gate fidelity on a commercially deployed ion-trap system. Anchor result for the AQ 64 milestone.',
  },
  {
    year: '2025',
    date: 'Jul 2025',
    authors: 'PsiQuantum',
    title: 'Active-volume photonic fault tolerance at the Omega chipset scale',
    venue: 'arXiv 2507.11982',
    topic: 'Error Correction',
    arxiv: '2507.11982',
    signal: 'high',
    summary:
      'Manufacturable photonic FTQC architecture at million-qubit scale; the engineering paper that underpins the IQMP build-out.',
  },
  {
    year: '2025',
    date: 'May 2025',
    authors: 'IBM Quantum',
    title: 'Heron-r2 + Eagle modular interconnect: a two-chip 256-qubit demonstration',
    venue: 'arXiv 2505.06241',
    topic: 'Hardware',
    arxiv: '2505.06241',
    signal: 'medium',
    summary:
      'Modular interconnect operating between two Heron-class processors. Sets the engineering anchor for the 2029 Apollo roadmap.',
  },
  {
    year: '2024',
    date: 'Dec 2024',
    authors: 'NIST',
    title: 'FIPS 203, 204, 205 — final post-quantum cryptographic standards',
    venue: 'NIST FIPS',
    topic: 'Cryptography',
    signal: 'foundational',
    summary:
      'The post-quantum standards on which the rest of the decade\u2019s cryptography migration is built. The most-cited document in the cohort\u2019s policy reading.',
  },
  {
    year: '2024',
    date: 'Aug 2024',
    authors: 'Google Quantum AI',
    title: 'Below-threshold error correction with surface codes on Willow',
    venue: 'Nature',
    topic: 'Error Correction',
    doi: '10.1038/s41586-024-08214-1',
    signal: 'foundational',
    summary:
      'First demonstration of exponentially suppressed logical error with surface codes at distance 7 — the proof that scaling error correction is no longer hypothetical.',
  },
  {
    year: '2024',
    date: 'Jun 2024',
    authors: 'DARPA QBI',
    title: 'Independent verification & validation framework for utility-scale quantum',
    venue: 'DARPA-PA-24-04',
    topic: 'Survey',
    signal: 'foundational',
    summary:
      "DARPA's own framework for IV&V across QBI performers. The single best public statement of how the sovereign technical buyer is reading the cohort.",
  },
  {
    year: '2023',
    date: 'Mar 2023',
    authors: 'Quantinuum (Bombín et al.)',
    title: 'Demonstration of a fault-tolerant logical CCZ on QCCD ions',
    venue: 'Nature',
    topic: 'Error Correction',
    doi: '10.1038/s41586-023-05854-7',
    signal: 'foundational',
    summary:
      'One of the foundational error-corrected logical-gate experiments of the modern era. Still cited in every Stage B roadmap document.',
  },
  {
    year: '2019',
    date: 'Oct 2019',
    authors: 'Arute et al. (Google)',
    title: 'Quantum supremacy using a programmable superconducting processor',
    venue: 'Nature',
    topic: 'Algorithms',
    doi: '10.1038/s41586-019-1666-5',
    signal: 'foundational',
    summary:
      'The "supremacy" paper. The mark in the calendar that anchored modern quantum hardware reporting; subsequent classical recreations narrowed the gap but did not retract the claim.',
  },
];

const TOPICS = ['All', 'Hardware', 'Algorithms', 'Error Correction', 'Cryptography', 'Survey'] as const;

const SIGNAL_COLOR: Record<Paper['signal'], string> = {
  high: 'border-accent-data text-accent-data bg-accent-data/8',
  medium: 'border-accent-warn/70 text-accent-warn bg-accent-warn/5',
  foundational: 'border-accent-quantum/70 text-accent-quantum bg-accent-quantum/8',
};

export default function PapersPage({
  searchParams,
}: {
  searchParams?: { topic?: string; year?: string };
}) {
  const sp = searchParams ?? {};
  const topic = sp.topic ?? 'All';
  const year = sp.year ?? 'All';

  const years = ['All', ...Array.from(new Set(PAPERS.map((p) => p.year)))];

  const rows = PAPERS.filter((p) => (topic === 'All' || p.topic === topic) && (year === 'All' || p.year === year));

  const url = (next: { topic?: string; year?: string }) => {
    const p = new URLSearchParams();
    const t = next.topic ?? topic;
    const y = next.year ?? year;
    if (t !== 'All') p.set('topic', t);
    if (y !== 'All') p.set('year', y);
    const q = p.toString();
    return q ? `/papers?${q}` : '/papers';
  };

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
      <header className="pt-8 pb-5 border-b border-text-primary/90">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5 border-b border-border-muted text-[11px] tracking-[0.08em] uppercase text-text-muted font-mono">
          <div className="flex flex-wrap items-baseline gap-3 whitespace-nowrap">
            <span>Vol. III</span>
            <span className="text-text-muted/60">·</span>
            <span className="font-display normal-case text-[15px] tracking-tight text-text-primary">Library</span>
            <span className="text-text-muted/60">·</span>
            <span>Papers</span>
          </div>
          <div className="font-display italic text-sm normal-case tracking-tight text-text-secondary">
            A working bibliography · curated, not exhaustive
          </div>
          <div className="text-right leading-relaxed">
            Boulder · Colorado
            <br />
            updated weekly
          </div>
        </div>

        <h1 className="mt-6 font-display font-medium leading-[0.94] tracking-[-0.025em] text-[clamp(40px,7vw,88px)] text-balance">
          Papers we{' '}
          <em className="not-italic font-normal text-accent-data italic">read</em>
        </h1>
        <p className="mt-3 font-display italic text-text-muted text-base sm:text-lg max-w-[58ch]">
          The science behind the Brief. We do not aim to be exhaustive — we aim to
          name the load-bearing papers a sector reader should be able to discuss.
        </p>
      </header>

      {/* Filter rail */}
      <section className="mt-10 grid gap-4">
        <FilterRow label="Topic">
          {TOPICS.map((t) => (
            <Chip key={t} href={url({ topic: t })} active={topic === t}>{t}</Chip>
          ))}
        </FilterRow>
        <FilterRow label="Year">
          {years.map((y) => (
            <Chip key={y} href={url({ year: y })} active={year === y}>{y}</Chip>
          ))}
        </FilterRow>
      </section>

      {/* Bibliography */}
      <section className="mt-12">
        <SectionHead eyebrow={`${rows.length} of ${PAPERS.length} matching`} title="The" accentWord="reading list" />
        <ol className="grid">
          {rows.length === 0 ? (
            <li className="py-16 text-center font-display italic text-text-muted">
              Nothing matches. Widen the filter.
            </li>
          ) : (
            rows.map((p, i) => (
              <li key={`${p.title}-${i}`}>
                <article className="grid grid-cols-[56px_minmax(0,1fr)] gap-6 py-6 border-t border-border first:border-t-text-primary">
                  <span className="font-display tabular-nums text-[36px] leading-none text-text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-text-muted font-mono mb-1.5">
                      <span className="font-semibold text-text-secondary">{p.authors}</span>
                      <span className="text-text-muted/60">·</span>
                      <span>{p.date}</span>
                      <span className="text-text-muted/60">·</span>
                      <span>{p.venue}</span>
                      <span className={'ml-auto text-[9px] px-2 py-0.5 rounded-full border ' + SIGNAL_COLOR[p.signal]}>
                        {p.signal}
                      </span>
                    </div>
                    <h3 className="font-display text-[20px] sm:text-[22px] tracking-tight leading-snug text-text-primary text-balance">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-text-secondary leading-[1.6] max-w-[68ch]">{p.summary}</p>
                    <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[10px] font-mono uppercase tracking-[0.08em] text-text-muted">
                      <span>{p.topic}</span>
                      {p.arxiv && (
                        <>
                          <span className="text-text-muted/60">·</span>
                          <a href={`https://arxiv.org/abs/${p.arxiv}`} target="_blank" rel="noreferrer" className="text-accent-data hover:underline">arXiv:{p.arxiv} ↗</a>
                        </>
                      )}
                      {p.doi && (
                        <>
                          <span className="text-text-muted/60">·</span>
                          <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer" className="text-accent-data hover:underline">doi:{p.doi} ↗</a>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))
          )}
        </ol>
      </section>

      {/* Foot */}
      <section className="mt-16 pt-10 border-t border-border grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
        <div className="border-l-2 border-accent-data/40 pl-5 max-w-[60ch]">
          <p className="font-display italic text-[20px] leading-snug tracking-tight text-text-primary">
            A bibliography is{' '}
            <span className="text-accent-data not-italic font-medium">opinionated by definition</span>{' '}
            — what gets in, in what order, and how it is described. We treat these
            choices as editorial, not technical.
          </p>
        </div>
        <div className="text-sm text-text-secondary leading-[1.65] max-w-[44ch]">
          <p className="eyebrow mb-2">Related</p>
          <ul className="grid gap-1.5">
            <li><Link href="/learn" className="text-accent-data hover:underline">Primer ›</Link></li>
            <li><Link href="/ledger-score/methodology" className="text-accent-data hover:underline">Score methodology ›</Link></li>
            <li><Link href="/glossary" className="text-accent-data hover:underline">Glossary ›</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, accentWord }: { eyebrow: string; title: string; accentWord: string }) {
  return (
    <div className="mb-6 pb-3 border-b border-text-primary/90">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 className="font-display font-normal text-3xl tracking-tight text-balance">
        {title} <em className="not-italic font-normal italic text-accent-data">{accentWord}</em>
      </h2>
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
      <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-text-muted w-[64px]">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={
        'text-[11px] font-mono uppercase tracking-[0.08em] px-2.5 py-1 rounded-full border transition-colors ' +
        (active ? 'border-accent-data text-accent-data bg-accent-data/8' : 'border-border text-text-secondary hover:text-text-primary hover:border-text-muted')
      }
    >
      {children}
    </Link>
  );
}
