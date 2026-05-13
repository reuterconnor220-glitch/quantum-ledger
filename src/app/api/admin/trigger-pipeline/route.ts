import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from '@/lib/auth/admin';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function POST() {
  const c = await cookies();
  const ok = await verifyAdminCookie(c.get(ADMIN_COOKIE_NAME)?.value, process.env.ADMIN_TOKEN ?? '');
  if (!ok) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantum-ledger-vert.vercel.app';
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 });

  // Run the daily pipeline inline so the admin sees results immediately.
  const r = await fetch(`${base}/api/cron/daily-pipeline`, {
    headers: { authorization: `Bearer ${secret}` },
  });
  const body = await r.json().catch(() => ({ ok: false, error: 'pipeline returned non-JSON' }));
  return NextResponse.json({ status: r.status, ...body });
}
