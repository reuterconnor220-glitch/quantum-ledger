import Link from 'next/link';

/**
 * Discord invite CTA. Reads NEXT_PUBLIC_DISCORD_INVITE; gracefully hides if unset.
 */
export function DiscordCTA({ variant = 'inline' }: { variant?: 'inline' | 'card' | 'footer' }) {
  const invite = process.env.NEXT_PUBLIC_DISCORD_INVITE;

  if (variant === 'footer') {
    if (!invite) {
      return (
        <Link href="/community" className="text-text-secondary hover:text-text-primary">
          Community
        </Link>
      );
    }
    return (
      <a
        href={invite}
        target="_blank"
        rel="noreferrer"
        className="text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5"
      >
        <DiscordIcon className="w-3.5 h-3.5" />
        Discord
      </a>
    );
  }

  if (variant === 'card') {
    return (
      <a
        href={invite ?? '/community'}
        target={invite ? '_blank' : undefined}
        rel={invite ? 'noreferrer' : undefined}
        className="card card-hover p-5 block group"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="w-9 h-9 rounded-md bg-[#5865F2] flex items-center justify-center text-white">
            <DiscordIcon className="w-5 h-5" />
          </span>
          <div>
            <p className="font-medium text-text-primary group-hover:text-accent-quantum">
              {invite ? 'Join our Discord' : 'Discord coming soon'}
            </p>
            <p className="text-xs text-text-muted">Real-time discussion with quantum readers</p>
          </div>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          {invite
            ? 'Live chat on quantum news, deep dives on technology and companies, off-topic banter, and a #ask-anything channel.'
            : "We're spinning up the Discord server now — check back shortly, or join the waitlist via the newsletter."}
        </p>
      </a>
    );
  }

  // inline (default)
  return invite ? (
    <a
      href={invite}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-sm text-sm font-medium transition"
    >
      <DiscordIcon className="w-4 h-4" />
      Join Discord
    </a>
  ) : (
    <Link
      href="/community"
      className="inline-flex items-center gap-2 border border-border bg-bg-surface text-text-primary px-4 py-2 rounded-sm text-sm font-medium hover:bg-bg-elevated"
    >
      <DiscordIcon className="w-4 h-4" />
      Community
    </Link>
  );
}

function DiscordIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export { DiscordIcon };
