import Link from 'next/link';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="font-display text-xl tracking-tight">Quantum Ledger</div>
          <p className="mt-2 text-sm text-text-secondary max-w-md leading-relaxed">
            Independent, investor-grade intelligence on the quantum computing sector. No advisory
            services, no banking, no consulting. Subscriber-funded.
          </p>
          <div className="mt-6 max-w-md">
            <p className="eyebrow mb-2">Daily Brief</p>
            <NewsletterForm />
            <p className="mt-2 text-xs text-text-muted">
              One short email per weekday with the day&apos;s most important quantum signals.
            </p>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-3">Sections</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/brief" className="text-text-secondary hover:text-text-primary">Daily Brief</Link></li>
            <li><Link href="/news" className="text-text-secondary hover:text-text-primary">News</Link></li>
            <li><Link href="/companies" className="text-text-secondary hover:text-text-primary">Companies</Link></li>
            <li><Link href="/revenue" className="text-text-secondary hover:text-text-primary">Revenue Landscape</Link></li>
            <li><Link href="/learn" className="text-text-secondary hover:text-text-primary">Learn Quantum</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Resource</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/qnt-ipo-watch" className="text-text-secondary hover:text-text-primary">QNT IPO Watch</Link></li>
            <li><Link href="/methodology" className="text-text-secondary hover:text-text-primary">Methodology</Link></li>
            <li><Link href="/about" className="text-text-secondary hover:text-text-primary">About</Link></li>
            <li><a href="/rss.xml" className="text-text-secondary hover:text-text-primary">RSS Feed</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border-muted">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} Quantum Ledger. All figures sourced from public filings, press releases, and reputable financial press.</p>
          <p className="font-mono">Not investment advice. Verify before trading.</p>
        </div>
      </div>
    </footer>
  );
}
