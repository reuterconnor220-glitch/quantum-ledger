import { MetadataRoute } from 'next';
import { COMPANIES } from '@/lib/data/companies';
import { ESSAYS } from '@/lib/data/essays';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantumledger.report';
  const now = new Date();

  // Static routes with per-page priority + change frequency. Daily-updated pages
  // (brief, news, today) get the highest freshness signal. Flagship daily brief,
  // homepage, score, companies directory get the highest priorities.
  const staticRoutes: { path: string; priority: number; daily?: boolean }[] = [
    { path: '', priority: 1.0, daily: true },
    { path: '/brief', priority: 0.95, daily: true },
    { path: '/news', priority: 0.9, daily: true },
    { path: '/today', priority: 0.85, daily: true },
    { path: '/ledger-score', priority: 0.95 },
    { path: '/ledger-score/methodology', priority: 0.7 },
    { path: '/companies', priority: 0.95 },
    { path: '/essays', priority: 0.9 },
    { path: '/earnings', priority: 0.85 },
    { path: '/future', priority: 0.85 },
    { path: '/revenue', priority: 0.85 },
    { path: '/darpa-qbi', priority: 0.85 },
    { path: '/qnt-ipo-watch', priority: 0.85 },
    { path: '/pqc-migration', priority: 0.85 },
    { path: '/archive', priority: 0.8 },
    { path: '/learn', priority: 0.8 },
    { path: '/benchmarks', priority: 0.75 },
    { path: '/roadmaps', priority: 0.75 },
    { path: '/use-cases', priority: 0.75 },
    { path: '/glossary', priority: 0.7 },
    { path: '/papers', priority: 0.7 },
    { path: '/methodology', priority: 0.7 },
    { path: '/learn/double-slit', priority: 0.65 },
    { path: '/learn/bell-test', priority: 0.65 },
    { path: '/learn/bb84', priority: 0.65 },
    { path: '/learn/applications', priority: 0.65 },
    { path: '/learn/timeline', priority: 0.65 },
    { path: '/learn/risks', priority: 0.65 },
    { path: '/learn/resources', priority: 0.65 },
    { path: '/faq', priority: 0.6 },
    { path: '/community', priority: 0.5 },
    { path: '/about', priority: 0.5 },
  ];

  const pages = staticRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: (r.daily ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: r.priority,
  }));

  // Each company profile gets the canonical /companies/{slug} URL.
  const companies = COMPANIES.map((c) => ({
    url: `${base}/companies/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Essays drive directly from ESSAYS metadata so newly-published pieces appear
  // in the sitemap on the next deploy. lastmod is the essay's own publishDate
  // so Google's freshness signals are accurate per piece.
  const essays = ESSAYS.map((e) => ({
    url: `${base}/essays/${e.slug}`,
    lastModified: new Date(e.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...pages, ...companies, ...essays];
}
