import { NextResponse } from 'next/server';
import { signAdminCookie, ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE } from '@/lib/auth/admin';

export async function POST(req: Request) {
  const { token } = await req.json().catch(() => ({}));
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return NextResponse.json({ error: 'ADMIN_TOKEN not configured on server' }, { status: 500 });
  if (typeof token !== 'string' || token.length === 0) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }
  // constant-time compare
  if (token.length !== expected.length) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  if (mismatch !== 0) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const cookieValue = await signAdminCookie(expected);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}
