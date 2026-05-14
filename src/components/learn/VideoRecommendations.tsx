import { VIDEOS, type LearnTopic } from '@/lib/data/videos';

/**
 * "Watch first" curated video block for each Learn topic.
 * Renders a 2-3 video list with the "if you only watch one" pick promoted.
 *
 * Used inline in /learn (5 chapters), /learn/double-slit, /learn/bell-test, /learn/bb84.
 */
export function VideoRecommendations({ topic }: { topic: LearnTopic }) {
  const videos = VIDEOS[topic] ?? [];
  if (videos.length === 0) return null;

  const ifOnly = videos.find((v) => v.ifYouOnlyWatchOne);
  const rest = videos.filter((v) => v !== ifOnly);

  return (
    <aside className="not-prose my-8 bg-bg-elevated border border-border rounded-md p-5 text-text-primary">
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.08em] text-accent-data font-mono">
          Watch first
        </p>
        <span className="text-[10px] font-mono text-text-muted">
          {videos.length} hand-picked
        </span>
      </div>

      {ifOnly && (
        <a
          href={ifOnly.url}
          target="_blank"
          rel="noreferrer"
          className="block group p-4 bg-bg-surface rounded-sm mb-3 border border-border hover:border-accent-data transition-colors"
        >
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.08em] mb-1">
            <span className="px-1.5 py-0.5 rounded-xs bg-accent-data/15 text-accent-data font-semibold">
              {ifOnly.definitive ? 'Definitive' : 'If you only watch one'}
            </span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted">{ifOnly.lengthMin} min</span>
          </div>
          <h4 className="font-display text-lg leading-tight tracking-tight text-text-primary group-hover:text-accent-data transition-colors mt-1.5">
            {ifOnly.title}
          </h4>
          <p className="text-xs font-mono uppercase tracking-wider text-text-muted mt-0.5">
            {ifOnly.channel}
          </p>
          <p className="text-sm text-text-secondary mt-2 leading-snug">{ifOnly.pitch}</p>
          <p className="text-xs font-mono text-accent-data mt-2 group-hover:underline">
            Watch on YouTube ↗
          </p>
        </a>
      )}

      {rest.length > 0 && (
        <ul className="grid gap-2">
          {rest.map((v) => (
            <li key={v.url}>
              <a
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="block group p-3 bg-bg-surface/40 hover:bg-bg-surface rounded-sm border border-border/60 hover:border-border transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h5 className="font-display text-sm leading-tight tracking-tight text-text-primary group-hover:text-accent-data transition-colors">
                    {v.title}
                  </h5>
                  <span className="text-[10px] font-mono text-text-muted whitespace-nowrap">
                    {v.lengthMin} min
                  </span>
                </div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                  {v.channel}
                </p>
                <p className="text-xs text-text-secondary mt-1.5 leading-snug">{v.pitch}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
