import { Suspense } from "react";

import { LiteratureBrowser } from "@/components/literature-browser";
import { LiteratureStatGrid } from "@/components/literature-stat-grid";
import {
  getLatestDigest,
  getLiteratureIndex,
  getPapersBySlugs,
} from "@/lib/literature";

export const metadata = {
  title: "文献监控",
  description: "每日结构化跟踪高影响因子论文与相关预印本，并提供证据型研究卡片。",
};

export default async function LiteraturePage() {
  const [index, latestDigest] = await Promise.all([getLiteratureIndex(), getLatestDigest()]);
  const [latestDigestPapers, featuredPapers] = latestDigest
    ? await Promise.all([
        getPapersBySlugs(latestDigest.paperSlugs),
        getPapersBySlugs(latestDigest.topRecommendedSlugs),
      ])
    : [[], []];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-16 px-6 py-12 md:px-10 md:py-16">
      <section className="grid gap-10 xl:grid-cols-[1fr_0.82fr] xl:items-end">
        <div className="space-y-6">
          <p className="eyebrow">Literature Watch v2</p>
          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-white md:text-6xl">
            用证据型研究卡片追踪高价值论文，而不是只看摘要
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
            这一页展示的是多源归并后的 canonical paper card。每篇卡片都带有质量分、证据等级、
            provenance 和推荐理由；未通过质量闸门的条目会自动进入 Provisional 分区。
          </p>
        </div>
        <div className="section-shell">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Quality Gate
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
            <p>1. Verified 代表证据覆盖、结构化抽取和来源可靠性达到自动发布阈值。</p>
            <p>2. Provisional 会保留，但会明确标记证据不足、全文缺失或元数据冲突。</p>
            <p>3. 列表默认按 `sourceStatus → relevance → rigor → publishedAt` 排序。</p>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
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
        }
      >
        <LiteratureBrowser
          featuredPapers={featuredPapers}
          index={index}
          latestDigest={latestDigest}
          latestDigestPapers={latestDigestPapers}
        />
      </Suspense>
    </main>
  );
}
