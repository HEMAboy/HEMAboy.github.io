import Link from "next/link";

import { AgentPipelinePanel } from "@/components/agent-pipeline-panel";
import { EvidenceMetaPills, SourceLinks } from "@/components/evidence-meta";
import { MarketOrbit } from "@/components/market-orbit";
import { SectionHeading } from "@/components/section-heading";
import { siteName } from "@/content/site";
import { getOverviewData } from "@/lib/tire-pressure";

export default async function Home() {
  const {
    briefing,
    metrics,
    capabilityModules,
    marketSnapshots,
    routeGateways,
    agentRoles,
    agentOutputBlocks,
  } = await getOverviewData();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-28 px-6 py-12 md:px-10 md:py-20">
      <section className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
        <div className="space-y-10">
          <p className="eyebrow">Tire pressure gauge / 管理层专题站</p>
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent-soft)]">
              {siteName}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
              用一个专题站同时回答
              <span className="block text-[var(--accent)]">市场、制造与交付三个问题</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
              {briefing.conclusion}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-white/78">
              {briefing.evidence}
            </p>
          </div>
          <EvidenceMetaPills
            confidence={briefing.confidence}
            publishStatus={briefing.publishStatus}
            lastReviewedAt={briefing.lastReviewedAt}
          />
          <div className="flex flex-wrap gap-4">
            <Link href="/reports" className="button-primary">
              进入研究专题
            </Link>
            <Link href="/dashboard" className="button-secondary">
              查看数据监测
            </Link>
            <Link href="/technology" className="button-secondary">
              打开技术页
            </Link>
          </div>
          <SourceLinks sources={briefing.sources} />
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map((metric) => (
              <article key={metric.id} className="surface-panel min-h-[188px]">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    {metric.label}
                  </p>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-[var(--accent-soft)]">
                    {metric.confidence === "high"
                      ? "高置信"
                      : metric.confidence === "medium"
                        ? "中置信"
                        : "低置信"}
                  </span>
                </div>
                <p className="mt-5 text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {metric.note}
                </p>
                <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  复核 {metric.lastReviewedAt}
                </p>
              </article>
            ))}
          </div>
        </div>
        <MarketOrbit />
      </section>

      <section className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
        <SectionHeading
          eyebrow="Factory-linked Advantage"
          title="制造能力不是企业宣传，而是你进入市场的方式"
          description="这里不单独讲工厂规模，而是把具体产线能力和它能服务的产品结构、包装版本和客户类型直接绑定。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {capabilityModules.map((capability) => (
            <article key={capability.id} className="surface-panel min-h-[260px]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold text-white">
                  {capability.title}
                </h3>
                <div className="space-y-2 text-right">
                  <span className="block text-xs uppercase tracking-[0.16em] text-[var(--accent-soft)]">
                    {capability.machineSet.join(" / ")}
                  </span>
                  <span className="block text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {capability.publishStatus}
                  </span>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                {capability.advantage}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {capability.fitProducts.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-white/88">
                {capability.marketLink}
              </p>
              <p className="mt-5 text-[11px] leading-6 text-[var(--muted)]">
                {capability.dataMethod}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
        <SectionHeading
          eyebrow="Management View"
          title="管理层先看三类判断，再决定去哪一页深挖"
          description="首页不铺开所有细节，而是先回答值不值得做、出口看哪里、利润卡在哪。"
        />
        <div className="grid gap-5 xl:grid-cols-3">
          {marketSnapshots.map((snapshot) => (
            <article key={snapshot.id} className="surface-panel min-h-[280px]">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {snapshot.region}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] ${
                    snapshot.trend === "up"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : snapshot.trend === "mixed"
                        ? "bg-white/8 text-[var(--muted)]"
                        : "bg-amber-400/10 text-amber-300"
                  }`}
                >
                  {snapshot.timeframe}
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">
                {snapshot.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                {snapshot.summary}
              </p>
              <p className="mt-6 text-sm leading-7 text-white/88">
                {snapshot.implication}
              </p>
              <div className="mt-6 space-y-4">
                <EvidenceMetaPills
                  confidence={snapshot.confidence}
                  publishStatus={snapshot.publishStatus}
                  lastReviewedAt={snapshot.lastReviewedAt}
                />
                <SourceLinks sources={snapshot.sources} maxItems={1} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1fr_0.95fr] xl:items-start">
        <div className="grid gap-5 xl:grid-cols-3">
          {routeGateways.map((gateway) => (
            <article key={gateway.id} className="surface-panel min-h-[300px]">
              <p className="eyebrow">{gateway.title}</p>
              <h3 className="mt-6 text-2xl font-semibold text-white">
                {gateway.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {gateway.description}
              </p>
              <div className="mt-6 space-y-2">
                {gateway.highlights.map((item) => (
                  <p key={item} className="text-sm text-white/88">
                    {item}
                  </p>
                ))}
              </div>
              <Link href={gateway.href} className="button-secondary mt-8">
                进入 {gateway.title}
              </Link>
            </article>
          ))}
        </div>
        <AgentPipelinePanel
          compact
          agentRoles={agentRoles}
          agentOutputBlocks={agentOutputBlocks}
        />
      </section>
    </main>
  );
}
