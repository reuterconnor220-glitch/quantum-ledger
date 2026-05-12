export function DepthToggle({
  level = 'intermediate',
  children,
}: {
  level?: 'intermediate' | 'advanced' | 'math' | 'code';
  children: React.ReactNode;
}) {
  const labels = {
    intermediate: 'Go deeper · intermediate',
    advanced: 'Go deeper · advanced',
    math: 'Show the math',
    code: 'Show the code',
  } as const;

  return (
    <details className="my-6 border-l-2 border-accent-quantum/40 pl-5 py-1 not-prose">
      <summary className="cursor-pointer font-sans text-xs uppercase tracking-wider text-accent-quantum font-medium select-none">
        {labels[level]}
      </summary>
      <div className="mt-3 text-text-secondary text-[15px] leading-relaxed space-y-3">{children}</div>
    </details>
  );
}
