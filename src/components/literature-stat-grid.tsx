type LiteratureStatGridProps = {
  stats: Array<[label: string, value: string, note: string]>;
};

export function LiteratureStatGrid({ stats }: LiteratureStatGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([label, value, note]) => (
        <article key={label} className="surface-panel min-h-[168px]">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {label}
          </p>
          <p className="mt-7 text-4xl font-semibold text-white">{value}</p>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{note}</p>
        </article>
      ))}
    </div>
  );
}
