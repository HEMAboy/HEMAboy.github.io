"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { LiteratureDigestCard } from "@/components/literature-digest-card";
import { LiteraturePaperCard } from "@/components/literature-paper-card";
import { LiteratureStatGrid } from "@/components/literature-stat-grid";
import { SectionHeading } from "@/components/section-heading";
import type {
  LiteratureDigest,
  LiteratureIndex,
  LiteraturePaper,
} from "@/lib/literature";
import {
  filterPapers,
  parseLiteratureFiltersFromUrl,
  sortPapers,
} from "@/lib/literature-utils";

type LiteratureBrowserProps = {
  featuredPapers: LiteraturePaper[];
  index: LiteratureIndex;
  latestDigest: LiteratureDigest | null;
  latestDigestPapers: LiteraturePaper[];
};

export function LiteratureBrowser({
  featuredPapers,
  index,
  latestDigest,
  latestDigestPapers,
}: LiteratureBrowserProps) {
  const searchParams = useSearchParams();
  const filters = parseLiteratureFiltersFromUrl(searchParams);

  const sortedPapers = sortPapers(filterPapers(latestDigestPapers, filters));
  const filteredFeatured = sortPapers(filterPapers(featuredPapers, filters)).slice(0, 3);
  const verifiedPapers = sortedPapers.filter(
    (paper) => paper.sourceStatus === "verified",
  );
  const provisionalPapers = sortedPapers.filter(
    (paper) => paper.sourceStatus === "provisional",
  );

  const buildFilterHref = (next: Record<string, string | null>) => {
    const params = new URLSearchParams();
    const current = {
      status: filters.status,
      publication: filters.publication,
      topic: filters.topic,
      studyDesign: filters.studyDesign,
    };

    for (const [key, value] of Object.entries({ ...current, ...next })) {
      if (value && value !== "all") {
        params.set(key, value);
      }
    }

    const query = params.toString();
    return query ? `/literature?${query}` : "/literature";
  };

  return (
    <>
      <section className="space-y-8">
        <LiteratureStatGrid
          stats={[
            ["收录卡片", `${index.paperCount}`, "进入网页端 canonical card 的文献总数"],
            ["Verified", `${index.verifiedCount}`, "通过质量闸门的条目"],
            ["Provisional", `${index.provisionalCount}`, "自动发布但待重点复核的条目"],
            ["Change Alerts", `${index.alertCount}`, "版本更新、跨源归并或状态警示"],
            [
              "高 IF / 预印本",
              `${index.highImpactCount} / ${index.preprintCount}`,
              "正式高 IF 与相关预印本的并行观察",
            ],
          ]}
        />
      </section>

      {index.interestProfile ? (
        <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <SectionHeading
            eyebrow="Interest Profile"
            title="当前排序所依据的兴趣画像"
            description="这是系统当前用于 relevance 排序和推荐的显式假设，不是黑箱偏好推断。"
          />
          <article className="section-shell">
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Preferred Topics
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {index.interestProfile.preferredTopics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Preferred Methods
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {index.interestProfile.preferredMethods.slice(0, 8).map((method) => (
                    <span
                      key={method}
                      className="rounded-full border border-[var(--accent)]/18 bg-[var(--accent)]/8 px-3 py-1 text-xs text-[var(--accent-soft)]"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Preferred Evidence
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {index.interestProfile.preferredEvidenceTypes.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      ) : null}

      {latestDigest ? (
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Latest Digest"
            title="最新日报"
            description="日报现在不仅统计数量，还给出主题总结、重点推荐和 watchlist。"
          />
          <LiteratureDigestCard
            digest={{
              ...latestDigest,
              featuredPapers: filteredFeatured,
            }}
          />
        </section>
      ) : null}

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Filters"
          title="筛选与切换"
          description="这些筛选只作用于网页展示层，不会改写源数据。"
        />
        <div className="flex flex-wrap gap-3">
          {[
            {
              label: "全部状态",
              href: buildFilterHref({ status: "all" }),
              active: filters.status === "all",
            },
            {
              label: "Verified",
              href: buildFilterHref({ status: "verified" }),
              active: filters.status === "verified",
            },
            {
              label: "Provisional",
              href: buildFilterHref({ status: "provisional" }),
              active: filters.status === "provisional",
            },
            {
              label: "全部发表状态",
              href: buildFilterHref({ publication: "all" }),
              active: filters.publication === "all",
            },
            {
              label: "正式发表",
              href: buildFilterHref({ publication: "formal" }),
              active: filters.publication === "formal",
            },
            {
              label: "预印本",
              href: buildFilterHref({ publication: "preprint" }),
              active: filters.publication === "preprint",
            },
          ].map(({ label, href, active }) => (
            <Link
              key={label}
              href={href}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-[var(--accent)]/35 bg-[var(--accent)]/12 text-white"
                  : "border-white/10 text-[var(--muted)] hover:border-white/20 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {index.topics.slice(0, 8).map((topic) => {
            const active = filters.topic === topic;

            return (
              <Link
                key={topic}
                href={buildFilterHref({ topic: active ? null : topic })}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-[var(--warm)]/35 bg-[var(--warm)]/12 text-white"
                    : "border-white/10 text-[var(--muted)] hover:border-white/20 hover:text-white"
                }`}
              >
                #{topic}
              </Link>
            );
          })}
          {index.studyDesigns.slice(0, 6).map((studyDesign) => {
            const active = filters.studyDesign === studyDesign;

            return (
              <Link
                key={studyDesign}
                href={buildFilterHref({ studyDesign: active ? null : studyDesign })}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-[var(--accent-soft)]/35 bg-white/10 text-white"
                    : "border-white/10 text-[var(--muted)] hover:border-white/20 hover:text-white"
                }`}
              >
                {studyDesign}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-12 xl:grid-cols-[0.72fr_1.28fr]">
        <SectionHeading
          eyebrow="Top Recommended"
          title="最值得读的 3 篇"
          description="这里优先展示综合排序靠前的卡片，便于你快速决定今天先读哪几篇。"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredFeatured.length > 0 ? (
            filteredFeatured.map((paper) => (
              <LiteraturePaperCard key={paper.slug} paper={paper} />
            ))
          ) : (
            <article className="surface-panel">
              <p className="text-sm leading-7 text-[var(--muted)]">
                当前筛选条件下没有推荐论文。
              </p>
            </article>
          )}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Verified"
          title="通过质量闸门"
          description="这些条目拥有更完整的证据覆盖与更稳定的结构化抽取结果。"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {verifiedPapers.length > 0 ? (
            verifiedPapers.map((paper) => (
              <LiteraturePaperCard key={paper.slug} paper={paper} />
            ))
          ) : (
            <article className="surface-panel">
              <p className="text-sm leading-7 text-[var(--muted)]">
                当前筛选条件下没有 Verified 条目。
              </p>
            </article>
          )}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Provisional"
          title="待重点复核"
          description="这些条目自动发布，但存在证据不足、全文缺失或结构化抽取不够稳定的问题。"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {provisionalPapers.length > 0 ? (
            provisionalPapers.map((paper) => (
              <LiteraturePaperCard key={paper.slug} paper={paper} />
            ))
          ) : (
            <article className="surface-panel">
              <p className="text-sm leading-7 text-[var(--muted)]">
                当前筛选条件下没有 Provisional 条目。
              </p>
            </article>
          )}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Digest History"
          title="历史日报"
          description="日报会保留主题总结、top recommended、watchlist 和状态分层。"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {index.digests.map((digest) => (
            <article key={digest.date} className="surface-panel min-h-[260px]">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                  {digest.date}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {digest.verifiedPaperSlugs.length} Verified /{" "}
                  {digest.provisionalPaperSlugs.length} Provisional
                </p>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                {digest.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {digest.topicClusters.map((cluster) => (
                  <span
                    key={cluster}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]"
                  >
                    {cluster}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
