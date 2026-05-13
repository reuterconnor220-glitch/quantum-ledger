import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Privacy-friendly page-view logger. No cookies, no IPs, no PII.
 * Called by <PageViewBeacon> on every page navigation.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.path !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Skip admin and api pages — don't pollute analytics
  if (body.path.startsWith('/admin') || body.path.startsWith('/api')) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const country = req.headers.get('x-vercel-ip-country') ?? null;
  const ua = req.headers.get('user-agent') ?? '';
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  const isBot = /bot|crawler|spider|crawl/i.test(ua);
  const device = isBot ? 'bot' : isMobile ? 'mobile' : 'desktop';

  // Truncate referrer to host + path (no query)
  let referrer: string | null = null;
  if (typeof body.referrer === 'string' && body.referrer) {
    try {
      const u = new URL(body.referrer);
      referrer = u.host + (u.pathname === '/' ? '' : u.pathname);
    } catch {
      referrer = body.referrer.slice(0, 200);
    }
  }

  try {
    const sb = createAdminClient();
    await sb.from('page_views').insert({
      path: body.path.slice(0, 200),
      referrer,
      country,
      device,
      user_agent: ua.slice(0, 200),
    });
  } catch {
    // best-effort — don't fail the request
  }
  return NextResponse.json({ ok: true });
}
