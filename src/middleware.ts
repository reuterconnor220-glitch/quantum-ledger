import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from '@/lib/auth/admin';

/**
 * Middleware: gates every /admin/* route except /admin/login.
 * Page-view analytics are logged separately via a client-side beacon
 * (see PageViewBeacon component) for accuracy and to avoid edge cold-start
 * cost on every request.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page itself
  if (pathname === '/admin/login') return NextResponse.next();

  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_TOKEN;
  if (!secret) {
    // ADMIN_TOKEN not configured — redirect to login which will show a helpful message
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }
  const ok = await verifyAdminCookie(cookie, secret);
  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
