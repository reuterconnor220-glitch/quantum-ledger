import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Presence heartbeat. Tracks who is currently on the site for the admin "live now" widget.
 * No cookies, no PII stored — just a random session id from sessionStorage (resets per tab).
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.session_id !== 'string' || typeof body.path !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (body.path.startsWith('/admin') || body.path.startsWith('/api')) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const country = req.headers.get('x-vercel-ip-country') ?? null;
  const ua = req.headers.get('user-agent') ?? '';
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  const isBot = /bot|crawler|spider|crawl/i.test(ua);
  if (isBot) return NextResponse.json({ ok: true, skipped: 'bot' });
  const device = isMobile ? 'mobile' : 'desktop';

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
    await sb.from('live_sessions').upsert({
      session_id: body.session_id.slice(0, 64),
      path: body.path.slice(0, 200),
      country,
      device,
      referrer,
      last_seen: new Date().toISOString(),
    });
  } catch {
    // best-effort
  }
  return NextResponse.json({ ok: true });
}
