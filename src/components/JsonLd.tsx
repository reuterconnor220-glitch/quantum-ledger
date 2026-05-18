/**
 * JSON-LD structured data injectors. Drop into a page or layout.
 * Helps Google Search, ChatGPT/Claude citations, and other AI surfaces
 * understand exactly what this site is.
 */

type SchemaObject = Record<string, unknown>;

function jsonLd(data: SchemaObject) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantumledger.report';

export function OrganizationLd() {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'Quantum Ledger',
    alternateName: 'QuantumLedger',
    url: BASE,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    description:
      'Independent, investor-grade intelligence on the quantum computing sector. Daily news with sentiment scoring, live company tracker, hardware benchmarks, and a layered-depth primer.',
    foundingDate: '2026',
    founder: {
      '@type': 'Person',
      name: 'Connor Reuter',
      url: `${BASE}/about`,
      jobTitle: 'Investor',
      affiliation: { '@type': 'Organization', name: 'Caruso Ventures' },
    },
    diversityPolicy: `${BASE}/about`,
    ethicsPolicy: `${BASE}/methodology`,
    sameAs: [],
    knowsAbout: [
      'Quantum Computing',
      'Quantum Hardware',
      'Quantum Cryptography',
      'Post-Quantum Cryptography',
      'Quantum Error Correction',
      'Trapped Ion Qubits',
      'Superconducting Qubits',
      'Neutral Atom Qubits',
      'Photonic Quantum Computing',
      'IonQ',
      'Quantinuum',
      'PsiQuantum',
      'D-Wave',
      'Rigetti',
      'IBM Quantum',
      'Google Quantum AI',
    ],
  });
}

export function WebsiteLd() {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Quantum Ledger',
    url: BASE,
    description: 'Investor-grade quantum computing intelligence — daily news, company tracker, benchmarks, primer.',
    publisher: { '@type': 'Organization', name: 'Quantum Ledger' },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/news?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  });
}

export function ArticleLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  image,
  authorName,
  articleType = 'Article',
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  /** When provided, renders a Person author (preferred for signed essays/briefs). */
  authorName?: string;
  /** Use 'NewsArticle' for daily briefs, 'BlogPosting' for opinion essays, 'Article' (default) for everything else. */
  articleType?: 'Article' | 'NewsArticle' | 'BlogPosting';
}) {
  const author = authorName
    ? {
        '@type': 'Person',
        name: authorName,
        url: `${BASE}/about`,
      }
    : { '@type': 'Organization', name: 'Quantum Ledger' };
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': articleType,
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: image ?? `${BASE}/opengraph-image`,
    author,
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'Quantum Ledger',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  });
}

/** ItemList schema for ranked / curated lists (ledger-score, companies directory). */
export function ItemListLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description?: string;
  url: string;
  items: { name: string; url: string; description?: string }[];
}) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: it.url,
      name: it.name,
      ...(it.description ? { description: it.description } : {}),
    })),
  });
}

/** CollectionPage schema for index pages (essays index, archive, news firehose). */
export function CollectionPageLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: it.url,
        name: it.name,
      })),
    },
  });
}

export function DatasetLd({
  name,
  description,
  url,
  keywords,
}: {
  name: string;
  description: string;
  url: string;
  keywords: string[];
}) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    creator: { '@type': 'Organization', name: 'Quantum Ledger' },
    keywords,
  });
}

export function BreadcrumbLd({ items }: { items: { name: string; url: string }[] }) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function FAQLd({ items }: { items: { question: string; answer: string }[] }) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  });
}
