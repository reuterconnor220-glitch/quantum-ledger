'use client';

// Shared horizontal section navigation strip.
// Drop into RootLayout.tsx between the header and {children}, or inline at the
// top of any page below the masthead.
//
// Active-state detection uses Next.js usePathname() — matches the route prefix
// so /companies/ibm correctly highlights "Companies".
//
// Visual vocabulary:
//   - Mono eyebrow labels in 11px tracking-wider uppercase
//   - Small geometric SVG glyphs per item (squares / diamonds / rings — no figurative iconography)
//   - Hairline border-y border-text-primary/90 (same weight as masthead lower rule)
//   - Active item gets the accent-data underline + text-text-primary
//   - Backdrop-blur sticky so it floats over content cleanly on long pages
//
// Pair with <ScrollProgress /> from the same folder to render the thin scroll
// line above this strip.

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  label: string;
  glyph: 'brief' | 'news' | 'markets' | 'companies' | 'usecases' | 'policy' | 'archive';
};

// Order is editorial: where readers most often go, left to right.
// Rename freely — the glyph keys are the only thing the SVG switch depends on.
const NAV: NavItem[] = [
  { href: '/brief', label: 'Brief', glyph: 'brief' },
  { href: '/news', label: 'News', glyph: 'news' },
  { href: '/ledger-score', label: 'Score', glyph: 'markets' },
  { href: '/companies', label: 'Companies', glyph: 'companies' },
  { href: '/today', label: 'Deployments', glyph: 'usecases' },
  { href: '/pqc-migration', label: 'Policy', glyph: 'policy' },
  { href: '/essays', label: 'Essays', glyph: 'archive' },
];

export function SectionNav({ sticky = true }: { sticky?: boolean }) {
  const pathname = usePathname() ?? '/';

  return (
    <nav
      aria-label="Section navigation"
      className={
        'border-y border-text-primary/90 bg-bg/95 backdrop-blur-sm ' +
        (sticky ? 'sticky top-0 z-30' : '')
      }
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <ul className="flex items-stretch overflow-x-auto no-scrollbar -mx-2">
          {NAV.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className={
                    'group relative flex items-center gap-2 px-3 py-3 text-[11px] uppercase tracking-[0.1em] font-mono transition-colors ' +
                    (active
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-secondary')
                  }
                >
                  <SectionGlyph kind={item.glyph} active={active} />
                  <span>{item.label}</span>
                  <span
                    className={
                      'absolute left-3 right-3 -bottom-px h-[2px] transition-opacity ' +
                      (active
                        ? 'bg-accent-data opacity-100'
                        : 'bg-accent-data opacity-0 group-hover:opacity-30')
                    }
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function SectionGlyph({
  kind,
  active,
}: {
  kind: NavItem['glyph'];
  active: boolean;
}) {
  const stroke = active ? 'currentColor' : 'currentColor';
  const fill = active ? 'currentColor' : 'none';
  switch (kind) {
    case 'brief':
      return (
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
          <circle cx="6" cy="6" r="5" fill="none" stroke={stroke} strokeWidth="1" />
          <path
            d="M6 1 A5 5 0 0 1 6 11 Z"
            fill={fill}
            opacity={active ? 1 : 0.5}
          />
        </svg>
      );
    case 'news':
      return (
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
          <rect x="1" y="2" width="10" height="1.4" fill={stroke} />
          <rect x="1" y="5.3" width="10" height="1.4" fill={stroke} opacity="0.7" />
          <rect x="1" y="8.6" width="7" height="1.4" fill={stroke} opacity="0.5" />
        </svg>
      );
    case 'markets':
      return (
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
          <polyline
            points="1,9 4,6 7,8 11,2"
            fill="none"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinecap="square"
          />
        </svg>
      );
    case 'companies':
      return (
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
          <rect x="1" y="1" width="4.5" height="4.5" fill={fill} stroke={stroke} />
          <rect
            x="6.5"
            y="1"
            width="4.5"
            height="4.5"
            fill="none"
            stroke={stroke}
          />
          <rect
            x="1"
            y="6.5"
            width="4.5"
            height="4.5"
            fill="none"
            stroke={stroke}
          />
          <rect
            x="6.5"
            y="6.5"
            width="4.5"
            height="4.5"
            fill="none"
            stroke={stroke}
            opacity="0.7"
          />
        </svg>
      );
    case 'usecases':
      return (
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
          <polygon
            points="6,1 11,6 6,11 1,6"
            fill={fill}
            stroke={stroke}
            strokeWidth="1"
          />
        </svg>
      );
    case 'policy':
      return (
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
          <circle cx="6" cy="6" r="4.5" fill="none" stroke={stroke} strokeWidth="1.4" />
          <circle cx="6" cy="6" r="1.5" fill={stroke} />
        </svg>
      );
    case 'archive':
      return (
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
          <rect x="1" y="1" width="10" height="3" fill={fill} stroke={stroke} />
          <rect x="1" y="5" width="10" height="6" fill="none" stroke={stroke} />
          <line x1="4.5" y1="7.5" x2="7.5" y2="7.5" stroke={stroke} />
        </svg>
      );
  }
}
