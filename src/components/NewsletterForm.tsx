'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-sm text-accent-data font-mono flex items-center gap-2">
        <span className="qdot bg-accent-data" /> Subscribed. Check your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@institution.com"
        className="flex-1 bg-bg-surface border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent-quantum"
        required
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-accent-quantum text-white px-4 py-2 text-sm font-medium rounded-sm hover:bg-accent-quantum/90 disabled:opacity-50"
      >
        {status === 'loading' ? '…' : 'Subscribe'}
      </button>
    </form>
  );
}
