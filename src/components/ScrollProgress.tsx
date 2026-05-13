'use client';

// Thin scroll-progress line that sits across the very top of the viewport.
// Pair with <SectionNav /> — typical mount order in RootLayout:
//
//   <body>
//     <ScrollProgress />
//     <Masthead />        {/* if you have one outside the page */}
//     <SectionNav />
//     {children}
//   </body>
//
// No knobs by default — colour is accent-data, height 2px, fixed at top:0.
// Uses requestAnimationFrame + passive scroll listener; cheap.

import { useEffect, useRef, useState } from 'react';

export function ScrollProgress({
  height = 2,
  className = '',
}: {
  height?: number;
  className?: string;
}) {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const v = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      setProgress(v);
      ticking.current = false;
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={'fixed top-0 left-0 right-0 z-40 pointer-events-none ' + className}
      style={{ height }}
    >
      <div
        className="h-full bg-accent-data origin-left transition-[transform] duration-100 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          boxShadow:
            progress > 0.001
              ? '0 0 8px currentColor'
              : undefined,
        }}
      />
    </div>
  );
}
