'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminControls() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function triggerPipeline() {
    setBusy(true);
    setResult(null);
    try {
      const r = await fetch('/api/admin/trigger-pipeline', { method: 'POST' });
      const j = await r.json();
      if (j.ok) {
        setResult(`✓ ${j.kept ?? 0} new articles · ${j.pricesFetched ?? 0} prices · ${(j.durationMs / 1000).toFixed(1)}s`);
        router.refresh();
      } else {
        setResult(`✗ ${j.error || 'failed'}`);
      }
    } catch (e) {
      setResult(`✗ ${String(e).slice(0, 80)}`);
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={triggerPipeline}
        disabled={busy}
        className="bg-accent-quantum hover:bg-accent-quantum/90 text-white px-4 py-2 text-sm font-medium rounded-sm disabled:opacity-50"
      >
        {busy ? 'Running pipeline…' : '⟳ Refresh now'}
      </button>
      <button
        onClick={logout}
        className="border border-border bg-bg-surface text-text-secondary hover:text-text-primary px-3 py-2 text-xs font-mono rounded-sm"
      >
        Logout
      </button>
      {result && (
        <span className="text-xs font-mono text-text-secondary ml-2">{result}</span>
      )}
    </div>
  );
}
