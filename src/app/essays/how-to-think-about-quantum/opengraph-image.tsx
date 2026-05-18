import { essayOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/essay-og';

export const runtime = 'edge';
export const alt = 'How to think about quantum computing as an investor — Quantum Ledger';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return essayOg({
    title: 'How to think about quantum computing as an investor.',
    date: '2026-05-13',
  });
}
