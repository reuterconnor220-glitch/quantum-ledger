import { essayOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/essay-og';

export const runtime = 'edge';
export const alt = 'The DOE 2028 RFI is the most important quantum document of 2026 — Quantum Ledger';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return essayOg({
    title: 'The DOE 2028 RFI is the most important quantum document of 2026.',
    date: '2026-05-15',
  });
}
