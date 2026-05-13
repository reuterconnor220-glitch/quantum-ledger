import Link from 'next/link';
import { DiscordCTA } from '@/components/DiscordCTA';
import { Giscus } from '@/components/Giscus';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata = {
  title: 'Community · Join the Quantum Ledger Discussion',
  description: 'Discuss quantum computing news, companies, technology, and applications with other readers. Real-time on Discord; threaded discussion on every learn page; weekly digest by email.',
};

export default function CommunityPage() {
  const hasDiscord = !!process.env.NEXT_PUBLIC_DISCORD_INVITE;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-12">
          <p className="eyebrow mb-3">Community</p>
          <h1 className="font-display text-display-1 font-medium tracking-tight max-w-3xl">
            Where quantum people meet.
          </h1>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-2xl">
            Investors making sense of public quantum stocks. Engineers picking apart the latest QEC paper.
            Curious learners trying to understand whether their bank accounts are about to break. All in
            one place, signal-first.
          </p>
        </div>
      </section>

      {/* Three ways to participate */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <p className="eyebrow mb-3">Three ways to join the conversation</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DiscordCTA variant="card" />

            <Link href="/learn" className="card card-hover p-5 block group">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-9 h-9 rounded-md bg-accent-quantum/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-quantum" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.24" />
                    <path d="M8 12l2 2 6-6" />
                  </svg>
                </span>
                <div>
                  <p className="font-medium text-text-primary group-hover:text-accent-quantum">
                    Comment on any learn page
                  </p>
                  <p className="text-xs text-text-muted">GitHub login · open source</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Threaded discussion under every section of the primer, brief, and FAQ. Backed by GitHub
                Discussions — you own your comments, they&apos;re indexed by Google.
              </p>
            </Link>

            <div className="card p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-9 h-9 rounded-md bg-accent-data/15 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-data" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <p className="font-medium text-text-primary">Weekly digest</p>
                  <p className="text-xs text-text-muted">One email, Monday morning</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                The week&apos;s most important quantum signals, sentiment-scored and editorially
                contextualized. No spam, unsubscribe anytime.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Community guidelines */}
      <section className="border-b border-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
          <p className="eyebrow mb-3">House rules</p>
          <h2 className="font-display text-2xl tracking-tight mb-5">
            Keep the signal high
          </h2>
          <ul className="space-y-4 text-text-secondary leading-relaxed">
            <li>
              <strong className="text-text-primary">Source claims.</strong> If you cite a number, link
              to the filing or paper. We&apos;re here to learn from each other, not amplify rumors.
            </li>
            <li>
              <strong className="text-text-primary">Disagree well.</strong> "I think X is wrong because
              of Y" is welcome. "You&apos;re an idiot" is not.
            </li>
            <li>
              <strong className="text-text-primary">No pumping, no shilling.</strong> Talking about
              quantum stocks is fine. "BUY $QUBT TO $1000" gets you banned.
            </li>
            <li>
              <strong className="text-text-primary">No quantum quackery.</strong> Quantum healing,
              quantum supplements, quantum jewelry — there are other communities for that.
            </li>
            <li>
              <strong className="text-text-primary">Be skeptical of hype.</strong> If a paper or
              press release sounds too good, it probably is. We celebrate the people who ask the
              hard follow-up question.
            </li>
            <li>
              <strong className="text-text-primary">English by default.</strong> Other languages OK
              but please include an English summary so everyone can follow.
            </li>
          </ul>

          <p className="mt-8 text-sm text-text-muted leading-relaxed">
            Moderation is human-driven. Reports go to the Quantum Ledger team. Repeat violations →
            permanent ban. We&apos;d rather lose a difficult user than degrade the conversation for
            everyone else.
          </p>
        </div>
      </section>

      {/* Discussion on this page */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <h2 className="font-display text-2xl tracking-tight mb-3">Say hi</h2>
        <p className="text-text-secondary mb-6">
          {hasDiscord
            ? 'Drop into Discord, or leave a comment below — happy to chat about anything in the quantum world.'
            : 'Drop a comment below — happy to chat about anything in the quantum world.'}
        </p>
        <Giscus />
      </section>
    </div>
  );
}
