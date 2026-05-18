import { essayOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/essay-og';

export const runtime = 'edge';
export const alt = 'The cohort sold off on a clean reporting cycle. Here is why. — Quantum Ledger';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return essayOg({
    title: 'The cohort sold off on a clean reporting cycle. Here is why.',
    date: '2026-05-15',
  });
}
