import Link from "next/link";

import type { LiteratureDigest } from "@/lib/literature";
import { formatLiteratureDate } from "@/lib/literature-utils";

type LiteratureDigestCardProps = {
  digest: LiteratureDigest;
};

export function LiteratureDigestCard({ digest }: LiteratureDigestCardProps) {
  return (
    <article className="section-shell">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Daily Digest</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {formatLiteratureDate(digest.date)}
          </h3>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          <span>{digest.verifiedPaperSlugs.length} Verified</span>
          <span>{digest.provisionalPaperSlugs.length} Provisional</span>
          <span>{digest.highImpactCount} 篇高 IF</span>
          <span>{digest.preprintCount} 篇预印本</span>
        </div>
      </div>

      <p className="mt-6 max-w-4xl text-base leading-8 text-[var(--muted)]">{digest.summary}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {digest.topicClusters.map((cluster) => (
          <span
            key={cluster}
            className="rounded-full border border-[var(--accent)]/18 bg-[var(--accent)]/8 px-3 py-1 text-xs text-[var(--accent-soft)]"
          >
            {cluster}
          </span>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {(digest.featuredPapers ?? []).map((paper) => (
          <Link
            key={paper.slug}
            href={`/literature/${paper.slug}`}
            className="rounded-[1.5rem] border border-white/8 bg-white/4 p-5 transition hover:border-[var(--accent)]/30 hover:bg-white/6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                {paper.sourceStatus}
              </span>
              <span className="text-xs text-[var(--muted)]">
                score {paper.overallScore.toFixed(2)}
              </span>
            </div>
            <h4 className="mt-4 text-lg font-semibold text-white">{paper.title}</h4>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{paper.whyItMatters}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 xl:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Theme Summaries</p>
          <div className="mt-4 space-y-4">
            {digest.themeSummaries.map((item) => (
              <div key={item.theme}>
                <p className="text-sm font-semibold text-white">{item.theme}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Watchlist</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {digest.watchlistSlugs.length > 0 ? (
              digest.watchlistSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/literature/${slug}`}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs text-[var(--muted)] transition hover:border-white/20 hover:text-white"
                >
                  {slug}
                </Link>
              ))
            ) : (
              <p className="text-sm leading-7 text-[var(--muted)]">当前没有 watchlist 条目。</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
