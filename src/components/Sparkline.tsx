/**
 * Pure-SVG sparkline. No client component. No ResizeObserver. SSR-safe.
 */

export function Sparkline({
  data,
  positive = true,
  height = 32,
  width = 120,
  strokeWidth = 1.5,
}: {
  data: { v: number }[];
  positive?: boolean;
  height?: number;
  width?: number;
  strokeWidth?: number;
}) {
  if (!data.length) {
    return <div style={{ height, width }} className="bg-bg-elevated rounded-xs" />;
  }
  const values = data.map((d) => d.v);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (data.length - 1 || 1);

  const points = data
    .map((d, i) => {
      const x = i * stepX;
      const y = height - ((d.v - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const color = positive ? '#00D9C0' : '#FF5C7C';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function generateSparkData(seed: number, len = 30): { v: number }[] {
  // deterministic pseudo-random walk for v1 visuals
  let v = 100;
  const out: { v: number }[] = [];
  let s = seed * 9301 + 49297;
  for (let i = 0; i < len; i++) {
    s = (s * 9301 + 49297) % 233280;
    const delta = (s / 233280 - 0.48) * 6;
    v = Math.max(20, v + delta);
    out.push({ v: Number(v.toFixed(2)) });
  }
  return out;
}
