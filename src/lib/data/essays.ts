export interface Essay {
  slug: string;
  title: string;
  subtitle: string;
  publishDate: string;
  /** Alias for publishDate used by the homepage redesign */
  publishedAt: string;
  readMinutes: number;
  /** Alias for readMinutes used by the homepage redesign */
  readTime: string;
  author: string;
  /** Short one-line teaser for index */
  teaser: string;
  /** Alias used by the homepage redesign */
  abstract: string;
  /** Kicker label used by the homepage redesign */
  kicker: string;
  /** Category for grouping */
  category: 'framework' | 'analysis' | 'deep_dive' | 'commentary';
}

export const ESSAYS: Essay[] = [
  {
    slug: 'doe-2028-rfi',
    title: 'The DOE 2028 RFI is the most important quantum document of 2026',
    subtitle:
      "An RFI is not a contract — it is something more durable: a procurement spec that credentials a narrow field. Two vendors. Maybe three. Other roadmaps now lose the federal-procurement narrative that has been supporting their valuations.",
    publishDate: '2026-05-15',
    publishedAt: '2026-05-15',
    readMinutes: 11,
    readTime: '11 min read',
    author: 'Connor Reuter',
    teaser:
      'The most important quantum procurement signal of the year, with a date attached and a comp spec already written.',
    abstract:
      'The Department of Energy issued an RFI on May 15 for a fault-tolerant quantum computer at a national laboratory by 2028. We read this as a two-vendor procurement spec disguised as an open inquiry.',
    kicker: 'Government · Analysis',
    category: 'analysis',
  },
  {
    slug: 'cohort-sold-off-clean-reporting',
    title: 'The cohort sold off on a clean reporting cycle. Here is why.',
    subtitle:
      "Q1 2026 was the strongest collective reporting season the public quantum pure-plays have ever delivered. Every name closed lower. This is not noise. It is the beginning of multiple compression in a cohort whose valuations have been priced for execution that hasn't happened.",
    publishDate: '2026-05-15',
    publishedAt: '2026-05-15',
    readMinutes: 10,
    readTime: '10 min read',
    author: 'Connor Reuter',
    teaser:
      'When the strongest reporting cycle yet fails to lift the cohort, valuation is the problem.',
    abstract:
      'D-Wave bookings +2,000%. Rigetti UK win. IonQ +755% revenue. Photonic Inc. $2B mark. Every public pure-play closed lower. Why, and what the trade is now.',
    kicker: 'Markets · Commentary',
    category: 'commentary',
  },
  {
    slug: 'quantinuum-s1-reading',
    title: "Reading Quantinuum's S-1",
    subtitle: "Six numbers that matter, four that don't, and where the IPO actually prices. The closest reading we have produced of any S-1 to date.",
    publishDate: '2026-05-13',
    publishedAt: '2026-05-13',
    readMinutes: 13,
    readTime: '13 min read',
    author: 'Connor Reuter',
    teaser: "The closest reading we have produced of any S-1 to date.",
    abstract: "The closest reading we have produced of any S-1 to date.",
    kicker: 'IPO Watch · Analysis',
    category: 'analysis',
  },
  {
    slug: 'how-to-think-about-quantum',
    title: 'How to think about quantum computing as an investor',
    subtitle: 'A framework for separating physics from financials, distinguishing utility from supremacy, and using DARPA to discount marketing budgets.',
    publishDate: '2026-05-13',
    publishedAt: '2026-05-13',
    readMinutes: 14,
    readTime: '14 min read',
    author: 'Connor Reuter',
    teaser: 'The piece I wish existed when I started looking at this sector.',
    abstract: 'The piece I wish existed when I started looking at this sector.',
    kicker: 'Framework · Essay',
    category: 'framework',
  },
];

export const ESSAY_CATEGORY_LABEL: Record<Essay['category'], string> = {
  framework: 'Framework',
  analysis: 'Analysis',
  deep_dive: 'Deep dive',
  commentary: 'Commentary',
};
