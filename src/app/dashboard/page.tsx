import { EvidenceMetaPills, SourceLinks } from "@/components/evidence-meta";
import { DashboardConsole } from "@/components/dashboard-console";
import { SectionHeading } from "@/components/section-heading";
import { getDashboardData } from "@/lib/tire-pressure";

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();
  const { pageMeta } = dashboardData;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-16 px-6 py-12 md:px-10 md:py-16">
      <section className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-end">
        <div className="space-y-6">
          <p className="eyebrow">Monitoring Console</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl">
            数据监测页先只显示公开且可复核的真实信号
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {pageMeta.conclusion}
          </p>
          <p className="max-w-3xl text-sm leading-7 text-white/78">{pageMeta.evidence}</p>
          <EvidenceMetaPills
            confidence={pageMeta.confidence}
            publishStatus={pageMeta.publishStatus}
            lastReviewedAt={pageMeta.lastReviewedAt}
          />
          <SourceLinks sources={pageMeta.sources} />
        </div>
        <div className="section-shell">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Tracking Notes
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
            <p>1. 当前序列采用公开网页可复核的关键点，不伪装成企业采购价或海关全量时序。</p>
            <p>2. 每个模块都带口径说明、来源链接和复核状态，便于后续自动发布。</p>
            <p>3. 后续若接后端或 agent 管线，只需要覆盖 `data/tire-pressure/dashboard.json`。</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Analyst Console"
          title="当前监测结构"
          description="这里固定承接外部快照、材料环境序列、重点市场卡片和关键管理信号，后续只改数据不改布局。"
        />
        <DashboardConsole {...dashboardData} />
      </section>
    </main>
  );
}
