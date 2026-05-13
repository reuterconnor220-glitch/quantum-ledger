import { Suspense } from 'react';
import { LoginForm } from './LoginForm';

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="eyebrow mb-2">Admin · Quantum Ledger</p>
          <h1 className="font-display text-3xl tracking-tight">Sign in</h1>
          <p className="mt-3 text-sm text-text-secondary">
            Paste your admin token. Session lasts 30 days.
          </p>
        </div>
        <Suspense fallback={<div className="card p-6 text-text-muted text-sm">Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
