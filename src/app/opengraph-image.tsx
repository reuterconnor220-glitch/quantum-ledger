import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Quantum Ledger — Investor-Grade Quantum Computing Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          background: '#0B0D10',
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,92,255,0.25), transparent 70%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          color: '#E8EAED',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              background: '#7C5CFF',
              boxShadow: '0 0 24px rgba(124, 92, 255, 0.7)',
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Quantum Ledger
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 1000,
            }}
          >
            Investor-grade quantum computing intelligence.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 28,
              color: '#9CA3AF',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Daily news with sentiment. Live company tracker. Honest revenue landscape.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            color: '#6B7280',
            fontFamily: 'monospace',
          }}
        >
          <span>quantumledger.com</span>
          <span>16 companies tracked · daily brief · 6am MT</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
