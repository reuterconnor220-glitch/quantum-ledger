import Link from 'next/link';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" className="text-accent-quantum">
        <circle cx="11" cy="11" r="3" fill="currentColor" />
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="0.8" />
        <circle cx="11" cy="11" r="10" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8" />
      </svg>
      <span className="font-display text-lg tracking-tight text-text-primary">
        Quantum<span className="text-text-secondary"> Ledger</span>
      </span>
    </Link>
  );
}
