export interface Essay {
  slug: string;
  title: string;
  subtitle: string;
  publishDate: string;
  readMinutes: number;
  author: string;
  /** Short one-line teaser for index */
  teaser: string;
  /** Category for grouping */
  category: 'framework' | 'analysis' | 'deep_dive' | 'commentary';
}

export const ESSAYS: Essay[] = [
  {
    slug: 'quantinuum-s1-reading',
    title: "Reading Quantinuum's S-1",
    subtitle: "Six numbers that matter, four that don't, and where the IPO actually prices. The closest reading we have produced of any S-1 to date.",
    publishDate: '2026-05-13',
    readMinutes: 13,
    author: 'Connor Reuter',
    teaser: "The closest reading we have produced of any S-1 to date.",
    category: 'analysis',
  },
  {
    slug: 'how-to-think-about-quantum',
    title: 'How to think about quantum computing as an investor',
    subtitle: 'A framework for separating physics from financials, distinguishing utility from supremacy, and using DARPA to discount marketing budgets.',
    publishDate: '2026-05-13',
    readMinutes: 14,
    author: 'Connor Reuter',
    teaser: 'The piece I wish existed when I started looking at this sector.',
    category: 'framework',
  },
];

export const ESSAY_CATEGORY_LABEL: Record<Essay['category'], string> = {
  framework: 'Framework',
  analysis: 'Analysis',
  deep_dive: 'Deep dive',
  commentary: 'Commentary',
};
