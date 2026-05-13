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

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantum-ledger-vert.vercel.app';

export function OrganizationLd() {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Quantum Ledger',
    alternateName: 'QuantumLedger',
    url: BASE,
    logo: `${BASE}/opengraph-image`,
    description:
      'Independent, investor-grade intelligence on the quantum computing sector. Daily news with sentiment scoring, live company tracker, hardware benchmarks, and a layered-depth primer.',
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
  image,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
}) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    datePublished,
    image: image ?? `${BASE}/opengraph-image`,
    author: { '@type': 'Organization', name: 'Quantum Ledger' },
    publisher: {
      '@type': 'Organization',
      name: 'Quantum Ledger',
      logo: { '@type': 'ImageObject', url: `${BASE}/opengraph-image` },
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
