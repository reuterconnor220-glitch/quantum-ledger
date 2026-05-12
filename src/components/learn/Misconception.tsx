export function Misconception({
  myth,
  reality,
  children,
}: {
  myth: string;
  reality: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="not-prose border border-accent-down/30 bg-accent-down/5 rounded-md p-5 my-6">
      <p className="eyebrow text-accent-down mb-2">Common myth</p>
      <p className="font-display text-lg leading-snug mb-3">&quot;{myth}&quot;</p>
      <p className="eyebrow text-accent-data mb-1">What&apos;s actually true</p>
      <p className="text-text-secondary leading-relaxed text-[15px]">{reality}</p>
      {children}
    </div>
  );
}
