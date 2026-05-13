'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

const links = [
  { href: '/brief', label: 'Brief' },
  { href: '/today', label: 'Today' },
  { href: '/news', label: 'News' },
  { href: '/companies', label: 'Companies' },
  { href: '/benchmarks', label: 'Benchmarks' },
  { href: '/roadmaps', label: 'Roadmaps' },
  { href: '/revenue', label: 'Revenue' },
  { href: '/darpa-qbi', label: 'DARPA QBI' },
  { href: '/qnt-ipo-watch', label: 'QNT IPO' },
  { href: '/learn', label: 'Learn' },
  { href: '/faq', label: 'FAQ' },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname?.startsWith(l.href);
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
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 text-xs text-text-muted font-mono">
            <span className="qdot-live" /> Live
          </span>
        </div>
      </div>
      {/* Mobile nav */}
      <div className="md:hidden border-t border-border-muted overflow-x-auto">
        <div className="flex gap-1 px-4 py-2 whitespace-nowrap">
          {links.map((l) => {
            const active = pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'px-3 py-1 text-xs rounded-sm',
                  active ? 'text-accent-quantum bg-accent-quantum/10' : 'text-text-secondary'
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
