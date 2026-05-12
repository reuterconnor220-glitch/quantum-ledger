import { cn, sentimentLabel } from '@/lib/utils';
import type { ValuationImpact } from '@/lib/types';

export function SentimentChip({
  score,
  valuationImpact,
  className,
}: {
  score?: number;
  valuationImpact?: ValuationImpact;
  className?: string;
}) {
  const label = valuationImpact ?? (typeof score === 'number' ? sentimentLabel(score) : 'neutral');

  const map = {
    bull: { cls: 'chip-bull', text: 'Bullish' },
    bullish: { cls: 'chip-bull', text: 'Bullish' },
    bear: { cls: 'chip-bear', text: 'Bearish' },
    bearish: { cls: 'chip-bear', text: 'Bearish' },
    neutral: { cls: 'chip-neutral', text: 'Neutral' },
    mixed: { cls: 'chip-mixed', text: 'Mixed' },
  } as const;

  const entry = map[label as keyof typeof map] ?? map.neutral;
  return <span className={cn('chip', entry.cls, className)}>{entry.text}</span>;
}

export function MaterialityBadge({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-mono text-text-muted" title={`Materiality ${level}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={cn('w-1 h-2.5 rounded-xs', n <= level ? 'bg-accent-quantum' : 'bg-border')}
        />
      ))}
    </span>
  );
}
