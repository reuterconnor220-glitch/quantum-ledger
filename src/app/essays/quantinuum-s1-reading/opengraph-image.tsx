import { essayOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/essay-og';

export const runtime = 'edge';
export const alt = "Reading Quantinuum's S-1 — Quantum Ledger";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return essayOg({
    title: "Reading Quantinuum's S-1.",
    date: '2026-05-13',
  });
}
