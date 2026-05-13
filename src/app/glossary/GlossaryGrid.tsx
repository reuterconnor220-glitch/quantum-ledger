'use client';

import { useMemo, useState } from 'react';
import type { GlossaryTerm, GlossaryAudience, GlossaryCategory } from '@/lib/data/glossary';
import { GLOSSARY_CATEGORIES, termSlug } from '@/lib/data/glossary';

const AUDIENCE_LABEL: Record<GlossaryAudience, string> = {
  newbie: 'Newbie',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const AUDIENCE_COLOR: Record<GlossaryAudience, string> = {
  newbie: 'bg-accent-data/15 text-accent-data',
  intermediate: 'bg-accent-warn/15 text-accent-warn',
  advanced: 'bg-accent-down/15 text-accent-down',
};

export function GlossaryGrid({ terms }: { terms: GlossaryTerm[] }) {
  const [search, setSearch] = useState('');
  const [audience, setAudience] = useState<'all' | GlossaryAudience>('all');
  const [category, setCategory] = useState<'all' | GlossaryCategory>('all');

  const filtered = useMemo(() => {
    return terms
      .filter((t) => audience === 'all' || t.audience === audience)
      .filter((t) => category === 'all' || t.category === category)
      .filter((t) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          t.term.toLowerCase().includes(q) ||
          t.aliases?.some((a) => a.toLowerCase().includes(q)) ||
          t.short.toLowerCase().includes(q) ||
          t.long.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [terms, search, audience, category]);

  // Group by first letter for the index
  const grouped = useMemo(() => {
    const g: Record<string, GlossaryTerm[]> = {};
    for (const t of filtered) {
      const letter = t.term[0].toUpperCase();
      const key = /[A-Z]/.test(letter) ? letter : '#';
      (g[key] ||= []).push(t);
    }
    return g;
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  return (
    <div>
      {/* Filter bar */}
      <div className="card p-4 mb-6 space-y-3 sticky top-16 z-20 bg-bg-surface/95 backdrop-blur">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search 80+ quantum terms…"
          className="w-full bg-bg-elevated border border-border rounded-sm px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-quantum"
        />

        <div className="flex flex-wrap gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono mb-1.5">Difficulty</p>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={audience === 'all'} onClick={() => setAudience('all')} label="All" />
              <Chip active={audience === 'newbie'} onClick={() => setAudience('newbie')} label="Newbie" />
              <Chip active={audience === 'intermediate'} onClick={() => setAudience('intermediate')} label="Intermediate" />
              <Chip active={audience === 'advanced'} onClick={() => setAudience('advanced')} label="Advanced" />
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-mono mb-1.5">Topic</p>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={category === 'all'} onClick={() => setCategory('all')} label="All" />
              {GLOSSARY_CATEGORIES.map((c) => {
                const count = terms.filter((t) => t.category === c.value).length;
                if (count === 0) return null;
                return (
                  <Chip
                    key={c.value}
                    active={category === c.value}
                    onClick={() => setCategory(c.value)}
                    label={`${c.label} (${count})`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-2 border-t border-border-muted">
          <span>{filtered.length} of {terms.length} terms</span>
          {(search || audience !== 'all' || category !== 'all') && (
            <button
              onClick={() => { setSearch(''); setAudience('all'); setCategory('all'); }}
              className="text-accent-quantum hover:underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Alphabet index */}
      {filtered.length > 12 && (
        <nav className="mb-6 flex flex-wrap gap-1">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="font-mono text-xs text-text-secondary hover:text-accent-quantum px-1.5 py-0.5 rounded-xs border border-border"
            >
              {letter}
            </a>
          ))}
        </nav>
      )}

      {/* Terms */}
      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-text-muted">
          No terms match your filters.
        </div>
      ) : (
        letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-32">
            <h2 className="font-display text-3xl tracking-tight mb-4 text-accent-quantum">{letter}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {grouped[letter].map((t) => (
                <article key={t.term} id={termSlug(t.term)} className="card p-5 scroll-mt-32">
                  <header className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                    <div>
                      <h3 className="font-display text-lg tracking-tight text-text-primary">{t.term}</h3>
                      {t.aliases && t.aliases.length > 0 && (
                        <p className="text-xs text-text-muted font-mono mt-0.5">also: {t.aliases.join(', ')}</p>
                      )}
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm whitespace-nowrap ${AUDIENCE_COLOR[t.audience]}`}>
                      {AUDIENCE_LABEL[t.audience]}
                    </span>
                  </header>
                  <p className="text-sm text-text-primary italic leading-relaxed mb-2">{t.short}</p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-2">{t.long}</p>
                  {t.whyItMatters && (
                    <p className="text-xs text-text-secondary leading-relaxed mt-2 pt-2 border-t border-border-muted">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent-quantum mr-1">Why it matters:</span>
                      {t.whyItMatters}
                    </p>
                  )}
                  {t.related && t.related.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {t.related.map((r) => (
                        <a key={r} href={`#${termSlug(r)}`} className="text-[10px] font-mono px-1.5 py-0.5 bg-bg-elevated rounded-xs text-text-secondary hover:text-accent-quantum">
                          → {r}
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))
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
