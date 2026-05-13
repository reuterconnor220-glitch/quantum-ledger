import { MetadataRoute } from 'next';
import { COMPANIES } from '@/lib/data/companies';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantumledger.com';
  const now = new Date();

  const pages = [
    '',
    '/brief',
    '/today',
    '/news',
    '/companies',
    '/benchmarks',
    '/roadmaps',
    '/revenue',
    '/darpa-qbi',
    '/qnt-ipo-watch',
    '/future',
    '/use-cases',
    '/ledger-score',
    '/ledger-score/methodology',
    '/pqc-migration',
    '/earnings',
    '/essays',
    '/essays/how-to-think-about-quantum',
    '/essays/quantinuum-s1-reading',
    '/learn',
    '/learn/double-slit',
    '/learn/bell-test',
    '/learn/bb84',
    '/learn/applications',
    '/learn/timeline',
    '/learn/risks',
    '/learn/resources',
    '/glossary',
    '/papers',
    '/faq',
    '/community',
    '/methodology',
    '/about',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === '' || p === '/brief' || p === '/news' ? ('daily' as const) : ('weekly' as const),
    priority: p === '' ? 1.0 : p === '/companies' || p === '/revenue' ? 0.9 : 0.7,
  }));

  const companies = COMPANIES.map((c) => ({
    url: `${base}/companies/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...pages, ...companies];
}
