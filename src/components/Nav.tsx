'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
}

interface NavGroup {
  label: string;
  /** prefix paths this group should highlight on */
  matchPrefixes: string[];
  items: NavLink[];
}

const PRIMARY: NavLink[] = [
  { href: '/brief', label: 'Brief' },
  { href: '/news', label: 'News' },
  { href: '/today', label: 'Today' },
  { href: '/future', label: 'Future' },
];

const GROUPS: NavGroup[] = [
  {
    label: 'Sector',
    matchPrefixes: ['/companies', '/benchmarks', '/revenue', '/roadmaps', '/use-cases'],
    items: [
      { href: '/companies', label: 'Companies' },
      { href: '/benchmarks', label: 'Benchmarks' },
      { href: '/roadmaps', label: 'Roadmaps' },
      { href: '/use-cases', label: 'Use cases' },
      { href: '/revenue', label: 'Revenue landscape' },
    ],
  },
  {
    label: 'Learn',
    matchPrefixes: ['/learn', '/faq'],
    items: [
      { href: '/learn', label: 'Primer' },
      { href: '/learn/timeline', label: '5/10/15 yr timeline' },
      { href: '/learn/applications', label: 'Applications' },
      { href: '/learn/risks', label: 'Risks' },
      { href: '/learn/resources', label: 'Best books/podcasts' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    label: 'More',
    matchPrefixes: ['/darpa-qbi', '/qnt-ipo-watch', '/community', '/methodology', '/about'],
    items: [
      { href: '/darpa-qbi', label: 'DARPA QBI tracker' },
      { href: '/qnt-ipo-watch', label: 'QNT IPO watch' },
      { href: '/community', label: 'Community' },
      { href: '/methodology', label: 'Methodology' },
      { href: '/about', label: 'About' },
    ],
  },
];

function NavGroupDropdown({ group, pathname }: { group: NavGroup; pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = group.matchPrefixes.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 px-3 py-1.5 text-sm rounded-sm transition-colors',
          active
            ? 'text-accent-quantum bg-accent-quantum/10'
            : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
        )}
      >
        {group.label}
        <svg width="10" height="10" viewBox="0 0 10 10" className={cn('transition-transform', open && 'rotate-180')}>
          <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 min-w-[220px] bg-bg-surface border border-border rounded-md shadow-xl py-1 z-50">
          {group.items.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'text-accent-quantum bg-accent-quantum/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {PRIMARY.map((l) => {
            const active = pathname === l.href || pathname?.startsWith(l.href + '/');
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-sm transition-colors',
                  active
                    ? 'text-accent-quantum bg-accent-quantum/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                )}
              >
                {l.label}
              </Link>
            );
          })}
          {GROUPS.map((g) => (
            <NavGroupDropdown key={g.label} group={g} pathname={pathname} />
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 text-xs text-text-muted font-mono">
            <span className="qdot-live" /> Live
          </span>
        </div>
      </div>

      {/* Mobile / smaller screen — horizontal scrollable */}
      <div className="lg:hidden border-t border-border-muted overflow-x-auto">
        <div className="flex gap-1 px-4 py-2 whitespace-nowrap">
          {PRIMARY.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-1 text-xs rounded-sm text-text-secondary hover:text-text-primary">
              {l.label}
            </Link>
          ))}
          {GROUPS.flatMap((g) => g.items).map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-1 text-xs rounded-sm text-text-secondary hover:text-text-primary">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
