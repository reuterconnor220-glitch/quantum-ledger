import { getRecentNews } from '@/lib/data/news';

export const dynamic = 'force-dynamic';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantumledger.report';
  const items = getRecentNews(30);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Quantum Ledger — Daily Signal</title>
    <link>${base}</link>
    <description>Investor-grade quantum computing news with sentiment scoring and valuation impact tagging.</description>
    <language>en-us</language>
    ${items
      .map(
        (n) => `
    <item>
      <title><![CDATA[${n.title}]]></title>
      <link>${n.sourceUrl}</link>
      <guid isPermaLink="false">${n.id}</guid>
      <pubDate>${new Date(n.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${n.summary}]]></description>
      <category>${n.source}</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
