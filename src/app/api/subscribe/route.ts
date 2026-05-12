import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from('subscribers').upsert({
    email: email.toLowerCase().trim(),
    source: 'footer_form',
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Best-effort Resend audience add (does not block success)
  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    try {
      await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
    } catch {
      // ignore — Supabase has the record
    }
  }

  return NextResponse.json({ ok: true });
}
