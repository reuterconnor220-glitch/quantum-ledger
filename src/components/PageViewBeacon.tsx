'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const HEARTBEAT_MS = 30_000;

function getSessionId(): string {
  try {
    const KEY = 'ql_sid';
    let id = sessionStorage.getItem(KEY);
    if (!id) {
      id = (crypto.randomUUID?.() ?? `s_${Date.now()}_${Math.random().toString(36).slice(2)}`);
      sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return `anon_${Date.now()}`;
  }
}

/**
 * Privacy-friendly page-view beacon + live presence heartbeat.
 * No cookies set on visitors. Session id lives in sessionStorage (cleared on tab close).
 */
export function PageViewBeacon() {
  const pathname = usePathname();

  // Page view: one shot per pathname change
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

  // Presence heartbeat: every 30s while tab is visible
  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return;
    const sid = getSessionId();

    const ping = () => {
      if (document.visibilityState === 'hidden') return;
      const payload = JSON.stringify({
        session_id: sid,
        path: pathname,
        referrer: document.referrer || null,
      });
      try {
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          navigator.sendBeacon('/api/heartbeat', new Blob([payload], { type: 'application/json' }));
        } else {
          fetch('/api/heartbeat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {}
    };

    ping();
    const interval = setInterval(ping, HEARTBEAT_MS);
    const onVis = () => { if (document.visibilityState === 'visible') ping(); };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [pathname]);

  return null;
}
