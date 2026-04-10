import Link from "next/link";

import type { LiteraturePaper } from "@/lib/literature";
import { formatLiteratureDate } from "@/lib/literature-utils";

type LiteraturePaperCardProps = {
  paper: LiteraturePaper;
};

export function LiteraturePaperCard({ paper }: LiteraturePaperCardProps) {
  return (
    <article className="surface-panel group min-h-[420px] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/25">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
              paper.sourceStatus === "verified"
                ? "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent-soft)]"
                : "border-[var(--warm)]/30 bg-[var(--warm)]/10 text-[var(--warm)]"
            }`}
          >
            {paper.sourceStatus}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {paper.isPreprint ? "Preprint" : "Formal"}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {paper.evidenceLevel}
          </span>
        </div>
        <p className="text-xs tracking-[0.16em] text-[var(--muted)]">
          {formatLiteratureDate(paper.publishedAt)}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)]">
          {paper.journal}
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-white">{paper.title}</h3>
        <p className="text-sm leading-7 text-[var(--muted)]">{paper.whyReadNow}</p>
      </div>

      <div className="mt-8 grid gap-3 text-sm leading-7 text-white">
        <p>
          <span className="text-[var(--muted)]">研究问题:</span> {paper.mainQuestion}
        </p>
        <p>
          <span className="text-[var(--muted)]">设计 / 对象:</span> {paper.studyDesign} /{" "}
          {paper.speciesOrSystem}
        </p>
        <p>
          <span className="text-[var(--muted)]">样本量:</span> {paper.sampleSize}
        </p>
        <p>
          <span className="text-[var(--muted)]">方法:</span> {paper.methods}
        </p>
        <p>
          <span className="text-[var(--muted)]">主要发现:</span>{" "}
          {paper.mainFindings[0] ?? paper.keyFindings[0] ?? "unknown"}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-[var(--muted)]">
        <p>Quality {paper.qualityScore.toFixed(2)}</p>
        <p>Relevance {paper.relevanceScore.toFixed(2)}</p>
        <p>Rigor {paper.rigorScore.toFixed(2)}</p>
        <p>Actionability {paper.actionabilityScore.toFixed(2)}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {paper.changeAlerts.slice(0, 2).map((alert) => (
          <span
            key={`${paper.slug}-${alert.alertType}`}
            className={`rounded-full border px-3 py-1 text-xs ${
              alert.severity === "high"
                ? "border-[var(--warm)]/30 bg-[var(--warm)]/10 text-[var(--warm)]"
                : "border-white/10 bg-white/5 text-[var(--muted)]"
            }`}
          >
            {alert.alertType}
          </span>
        ))}
        {paper.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]"
          >
            #{tag}
          </span>
        ))}
        {paper.datasets.slice(0, 2).map((dataset) => (
          <span
            key={dataset}
            className="rounded-full border border-[var(--accent)]/18 bg-[var(--accent)]/8 px-3 py-1 text-xs text-[var(--accent-soft)]"
          >
            {dataset}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">{paper.authors.slice(0, 3).join(", ")}</p>
        <Link href={`/literature/${paper.slug}`} className="button-primary">
          查看证据卡片
        </Link>
      </div>
    </article>
  );
}
