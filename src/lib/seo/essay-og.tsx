/**
 * Shared OG-image renderer for Quantum Ledger essays.
 *
 * next/og can't share components across opengraph-image.tsx route files via
 * normal React composition (the function form is what's exported per route),
 * but it CAN share a renderer function that returns the JSX tree. Each essay
 * route imports `essayOg` and calls it with its own title + date.
 *
 * Notes on next/og constraints I keep tripping over:
 *  - Every <div> with more than one child must declare `display: flex`. Single-
 *    child <div>s can omit it; the moment you add a second child, missing
 *    display:flex silently produces a 0-byte PNG.
 *  - Tailwind classes are not supported; everything is inline style.
 *  - Custom fonts must be loaded explicitly. We're sticking to system fonts
 *    + a slightly-elevated weight to avoid the font-fetch hop entirely.
 */

import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export function essayOg({ title, date }: { title: string; date: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          background: '#0B0D10',
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,217,192,0.18), transparent 65%)',
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
              width: 22,
              height: 22,
              borderRadius: 11,
              background: '#00D9C0',
              boxShadow: '0 0 24px rgba(0,217,192,0.65)',
            }}
          />
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Quantum Ledger
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              fontFamily: 'monospace',
              fontSize: 14,
              color: '#9CA3AF',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Essay
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 80 ? 56 : 64,
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              maxWidth: 1056,
            }}
          >
            {title}
          </div>
        </div>

        {/* Foot — byline and date */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            color: '#9CA3AF',
            fontFamily: 'monospace',
          }}
        >
          <div style={{ display: 'flex' }}>By Connor Reuter</div>
          <div style={{ display: 'flex' }}>{date} · quantumledger.report</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
