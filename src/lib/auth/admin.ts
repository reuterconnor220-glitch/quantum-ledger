/**
 * Tiny HMAC-signed cookie auth for the single admin (Connor).
 * Uses Web Crypto (works in Edge runtime + Node).
 *
 * Cookie format: base64url(JSON.stringify(payload)) + '.' + hex(hmac-sha256(payload, secret))
 * Payload: { admin: true, exp: <unix ms> }
 */

const enc = new TextEncoder();
const dec = new TextDecoder();

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function b64urlEncode(s: string): string {
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(s: string): string {
  const pad = '='.repeat((4 - (s.length % 4)) % 4);
  return atob((s + pad).replace(/-/g, '+').replace(/_/g, '/'));
}

async function hmacHex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return bytesToHex(new Uint8Array(sig));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export const ADMIN_COOKIE_NAME = 'ql_admin';
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function signAdminCookie(secret: string): Promise<string> {
  const payload = JSON.stringify({ admin: true, exp: Date.now() + ADMIN_COOKIE_MAX_AGE * 1000 });
  const data = b64urlEncode(payload);
  const sig = await hmacHex(secret, data);
  return `${data}.${sig}`;
}

export async function verifyAdminCookie(value: string | undefined, secret: string): Promise<boolean> {
  if (!value || !secret) return false;
  const [data, sig] = value.split('.');
  if (!data || !sig) return false;
  const expected = await hmacHex(secret, data);
  if (!constantTimeEqual(sig, expected)) return false;
  try {
    const payload = JSON.parse(b64urlDecode(data));
    if (!payload?.admin) return false;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}
