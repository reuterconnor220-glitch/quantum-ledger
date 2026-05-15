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
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,217,192,0.20), transparent 70%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          color: '#E8EAED',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              background: '#00D9C0',
              boxShadow: '0 0 28px rgba(0,217,192,0.7)',
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em', display: 'flex' }}>
            Quantum Ledger
          </div>
        </div>

        {/* Heading + sub */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
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
              display: 'flex',
              marginTop: 32,
              fontSize: 28,
              color: '#9CA3AF',
              maxWidth: 980,
              lineHeight: 1.4,
            }}
          >
            Daily news with sentiment. Live company tracker. Honest revenue landscape.
          </div>
        </div>

        {/* Foot */}
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
          <div style={{ display: 'flex' }}>quantumledger</div>
          <div style={{ display: 'flex' }}>16 companies · daily brief · 6am MT</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
