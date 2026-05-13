'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Privacy-friendly page-view beacon. Fires once per pathname change.
 * No cookies. No third-party tracker.
 */
export function PageViewBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return;
    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || null,
    });
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/log-view', blob);
    } else {
      fetch('/api/log-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
