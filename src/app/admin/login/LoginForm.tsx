'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/admin';
  const [token, setToken] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        router.push(next);
        router.refresh();
      } else {
        const j = await res.json().catch(() => ({}));
        setErr(j.error || 'Invalid token');
      }
    } catch {
      setErr('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-wider text-text-muted font-mono mb-2">
          Admin token
        </label>
        <input
          type="password"
          autoFocus
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="paste the 64-char token"
          className="w-full bg-bg-elevated border border-border rounded-sm px-3 py-2 text-sm font-mono text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-quantum"
          required
        />
      </div>
      {err && <p className="text-sm text-accent-down font-mono">{err}</p>}
      <button
        type="submit"
        disabled={loading || !token}
        className="w-full bg-accent-quantum hover:bg-accent-quantum/90 text-white px-4 py-2.5 text-sm font-medium rounded-sm disabled:opacity-50"
      >
        {loading ? 'Verifying…' : 'Sign in'}
      </button>
      <p className="text-xs text-text-muted leading-relaxed">
        This page is not indexed. Only the holder of <code className="font-mono">ADMIN_TOKEN</code>
        {' '}can sign in. Sessions are stored in an HTTP-only cookie and last 30 days.
      </p>
    </form>
  );
}
