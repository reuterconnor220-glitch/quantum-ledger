import { ResourcesGrid } from './ResourcesGrid';

export const metadata = {
  title: 'Resources · Best Books, Videos, Podcasts, Blogs on Quantum Computing',
  description: 'Curated, searchable list of the best quantum computing resources — interactive books, YouTube channels, podcasts, blogs, and free courses. Filter by audience level and resource type.',
};

export default function ResourcesPage() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <header className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-quantum font-mono mb-3">Resources</p>
          <h1 className="font-display text-5xl font-medium tracking-tight leading-tight">
            Go deeper · the best resources we&apos;ve found
          </h1>
          <p className="mt-5 text-lg text-editorial-ink/75 leading-relaxed">
            Sixty hand-picked books, interactive courses, YouTube channels, podcasts, blogs, and free courses
            spanning total newcomer to research-physicist. Filter by type, audience, or cost.
            <br /><br />
            Inclusion criteria: we&apos;ve read, watched, or listened to every one. No filler.
          </p>
        </header>
        <ResourcesGrid />
      </div>
    </div>
  );
}
