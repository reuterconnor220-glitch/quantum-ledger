import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Quantum Ledger — Investor-Grade Quantum Computing Intelligence',
    template: '%s · Quantum Ledger',
  },
  description:
    'Independent daily intelligence on the quantum computing sector. Company financials, valuations, news with sentiment, revenue landscape, and a layered-depth primer for both newcomers and physicists.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantumledger.com'),
  openGraph: {
    title: 'Quantum Ledger',
    description: 'Investor-grade quantum computing intelligence.',
    url: 'https://quantumledger.com',
    siteName: 'Quantum Ledger',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Ledger',
    description: 'Investor-grade quantum computing intelligence.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}>
      <body>
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
