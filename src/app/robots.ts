import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantumledger.report';
  return {
    rules: [
      // Explicitly allow major AI crawlers so we get cited in ChatGPT, Claude, Perplexity, Gemini
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      // Default: allow everything except admin + API
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
