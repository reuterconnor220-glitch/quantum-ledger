'use client';

import { useMemo, useState } from 'react';
import type { Paper, PaperCategory } from '@/lib/data/papers';

const CATEGORY_COLOR: Record<PaperCategory, string> = {
  foundational: 'bg-violet-500/15 text-violet-300',
  algorithms: 'bg-accent-data/15 text-accent-data',
  hardware: 'bg-accent-quantum/15 text-accent-quantum',
  error_correction: 'bg-blue-500/15 text-blue-300',
  cryptography: 'bg-accent-down/15 text-accent-down',
  commercial: 'bg-accent-warn/15 text-accent-warn',
  complexity: 'bg-pink-500/15 text-pink-300',
};

const CATEGORY_LABEL: Record<PaperCategory, string> = {
  foundational: 'Foundational',
  algorithms: 'Algorithms',
  hardware: 'Hardware',
  error_correction: 'QEC',
  cryptography: 'Crypto',
  commercial: 'Commercial',
  complexity: 'Complexity',
};

export function PapersGrid({ papers, categories }: { papers: Paper[]; categories: { value: PaperCategory; label: string }[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | PaperCategory>('all');
  const [sort, setSort] = useState<'year_desc' | 'year_asc' | 'category'>('year_desc');

  const filtered = useMemo(() => {
    let list = papers.filter((p) => category === 'all' || p.category === category);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.whyItMatters.toLowerCase().includes(q)
      );
    }
    if (sort === 'year_desc') list.sort((a, b) => b.year - a.year);
    else if (sort === 'year_asc') list.sort((a, b) => a.year - b.year);
    else list.sort((a, b) => a.category.localeCompare(b.category) || b.year - a.year);
    return list;
  }, [papers, search, category, sort]);

  return (
    <div>
      {/* Filter bar */}
      <div className="card p-4 mb-6 space-y-3 sticky top-16 z-20 bg-bg-surface/95 backdrop-blur">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, author, summary…"
          className="w-full bg-bg-elevated border border-border rounded-sm px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-quantum"
        />
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono mb-1.5">Category</p>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={category === 'all'} onClick={() => setCategory('all')} label={`All · ${papers.length}`} />
              {categories.map((c) => {
                const count = papers.filter((p) => p.category === c.value).length;
                if (!count) return null;
                return (
                  <Chip key={c.value} active={category === c.value} onClick={() => setCategory(c.value)} label={`${c.label} · ${count}`} />
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono mb-1.5">Sort</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-bg-elevated border border-border rounded-sm px-2 py-1 text-xs font-mono text-text-primary"
            >
              <option value="year_desc">Newest first</option>
              <option value="year_asc">Oldest first</option>
              <option value="category">By category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Papers */}
      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-text-muted">No papers match.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((p, i) => (
            <article key={i} className="card p-5">
              <header className="flex items-start justify-between gap-3 flex-wrap mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs ${CATEGORY_COLOR[p.category]}`}>
                      {CATEGORY_LABEL[p.category]}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">{p.year}</span>
                    <span className="text-[10px] font-mono text-text-muted">·</span>
                    <span className="text-[10px] font-mono text-text-secondary italic">{p.venue}</span>
                  </div>
                  <h3 className="font-display text-xl tracking-tight text-text-primary leading-tight">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noreferrer" className="hover:text-accent-quantum">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="text-sm text-text-secondary font-mono mt-1">{p.authors}</p>
                </div>
              </header>
              <p className="text-sm text-text-primary italic leading-relaxed mt-3">{p.whyItMatters}</p>
              <p className="text-sm text-text-secondary leading-relaxed mt-2">{p.summary}</p>
              {p.modernRelevance && (
                <p className="text-xs text-text-secondary leading-relaxed mt-3 pt-3 border-t border-border-muted">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-quantum mr-1">Modern relevance:</span>
                  {p.modernRelevance}
                </p>
              )}
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer" className="inline-block mt-3 text-xs font-mono text-accent-quantum hover:underline">
                  Read paper →
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-sm font-mono transition ${
        active ? 'bg-accent-quantum text-white' : 'bg-bg-elevated text-text-secondary hover:bg-bg'
      }`}
    >
      {label}
    </button>
  );
}
