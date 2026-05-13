import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminCookie } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Returns currently-active sessions for the admin live presence widget.
 * Active = last_seen within the last 90 seconds.
 */
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('ql_admin')?.value;
  const ok = await verifyAdminCookie(token, process.env.ADMIN_TOKEN ?? '');
  if (!ok) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    const sb = createAdminClient();
    const cutoff = new Date(Date.now() - 90 * 1000).toISOString();
    const { data, error } = await sb
      .from('live_sessions')
      .select('session_id, path, country, device, referrer, first_seen, last_seen')
      .gte('last_seen', cutoff)
      .order('last_seen', { ascending: false });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, sessions: data ?? [] });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
