import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsd(n: number | undefined | null, opts?: { compact?: boolean; precision?: number }): string {
  if (n === undefined || n === null || Number.isNaN(n)) return '—';
  const { compact = true, precision = 1 } = opts ?? {};
  if (compact) {
    const abs = Math.abs(n);
    if (abs >= 1e12) return `$${(n / 1e12).toFixed(precision)}T`;
    if (abs >= 1e9) return `$${(n / 1e9).toFixed(precision)}B`;
    if (abs >= 1e6) return `$${(n / 1e6).toFixed(precision)}M`;
    if (abs >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
    return `$${n.toFixed(0)}`;
  }
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: precision })}`;
}

export function formatPct(n: number | undefined | null, opts?: { signed?: boolean; precision?: number }): string {
  if (n === undefined || n === null || Number.isNaN(n)) return '—';
  const { signed = false, precision = 1 } = opts ?? {};
  const v = (n * 100).toFixed(precision);
  if (signed && n > 0) return `+${v}%`;
  return `${v}%`;
}

export function formatDate(iso: string, opts?: { style?: 'short' | 'long' }): string {
  const d = new Date(iso);
  if (opts?.style === 'long') {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function timeAgo(iso: string): string {
  const d = new Date(iso);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

export function sentimentLabel(score: number): 'bull' | 'bear' | 'neutral' | 'mixed' {
  if (score > 0.25) return 'bull';
  if (score < -0.25) return 'bear';
  if (Math.abs(score) < 0.1) return 'neutral';
  return 'mixed';
}

/**
 * Google News and similar aggregators tack a trailing " - Publisher" onto every
 * headline. The publisher is already shown in the source-chip on the row, so
 * stripping it produces a cleaner, less redundant title in the rendered list.
 *
 *   "Saudi Arabia Launches Its First Quantum Computer - ForkLog"
 *   → "Saudi Arabia Launches Its First Quantum Computer"
 */
export function cleanNewsTitle(title: string | null | undefined): string {
  if (!title) return '';
  return title.replace(/\s+[-–—]\s+[A-Z][\w &.,'’!?:|/]*$/, '').trim();
}

/**
 * Some ingestion sources (notably google_news) populate the article summary
 * with the title itself. Rendering that next to the headline produces a
 * doubled-headline display. Return the summary only when it adds information.
 */
export function displaySummary(
  title: string | null | undefined,
  summary: string | null | undefined,
): string | null {
  if (!summary) return null;
  const norm = (s: string) => s.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  const t = norm(cleanNewsTitle(title ?? ''));
  const s = norm(summary);
  if (!t) return summary;
  if (s === t) return null;
  const cutoff = Math.min(60, t.length);
  if (s.startsWith(t.slice(0, cutoff))) return null;
  if (t.startsWith(s.slice(0, Math.min(60, s.length)))) return null;
  return summary;
}
