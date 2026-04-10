"use client";

import { startTransition, useState } from "react";

import { EvidenceMetaPills, SourceLinks } from "@/components/evidence-meta";
import type { ResearchTopic } from "@/content/tire-pressure-schema";

type ReportExplorerProps = {
  reportTags: string[];
  reports: ResearchTopic[];
};

export function ReportExplorer({ reportTags, reports }: ReportExplorerProps) {
  const [activeTag, setActiveTag] = useState("全部");

  const visibleReports =
    activeTag === "全部"
      ? reports
      : reports.filter((report) => report.category === activeTag);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {reportTags.map((tag) => {
          const active = tag === activeTag;

          return (
            <button
              key={tag}
              type="button"
              onClick={() => {
                startTransition(() => {
                  setActiveTag(tag);
                });
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-[var(--accent)]/45 bg-[var(--accent)]/12 text-white"
                  : "border-white/10 bg-white/4 text-[var(--muted)] hover:border-white/20 hover:text-white"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {visibleReports.map((report) => (
          <article
            key={report.id}
            className="surface-panel group min-h-[320px] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/25"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]">
                {report.category}
              </span>
              <span className="text-xs tracking-[0.18em] text-[var(--muted)]">
                {report.agentOutput.updatedAt}
              </span>
            </div>
            <div className="mt-6 space-y-4">
              <h3 className="max-w-lg text-2xl font-semibold tracking-tight text-white">
                {report.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--muted)]">
                {report.summary}
              </p>
            </div>
            <div className="mt-8 grid gap-3 rounded-[1.4rem] border border-white/8 bg-white/4 px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  证据等级
                </span>
                <span className="text-sm text-white">{report.evidenceLevel}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  来源摘要
                </span>
                <span className="max-w-[70%] text-right text-sm leading-6 text-white/88">
                  {report.sourceSummary}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  推荐动作
                </span>
                <span className="max-w-[70%] text-right text-sm leading-6 text-white/88">
                  {report.recommendedAction}
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-white">
                {report.region}
              </span>
              {report.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/8 px-3 py-1 text-xs text-[var(--muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-sm leading-7 text-[var(--muted)]">
                {report.agentOutput.conclusion}
              </p>
              <p className="text-sm leading-7 text-[var(--accent-soft)]">
                风险: {report.agentOutput.risk}
              </p>
              <EvidenceMetaPills
                confidence={report.confidence}
                publishStatus={report.publishStatus}
                lastReviewedAt={report.lastReviewedAt}
              />
              <SourceLinks sources={report.sources} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
