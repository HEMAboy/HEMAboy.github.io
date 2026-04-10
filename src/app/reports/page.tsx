import { AgentPipelinePanel } from "@/components/agent-pipeline-panel";
import { EvidenceMetaPills, SourceLinks } from "@/components/evidence-meta";
import { ReportExplorer } from "@/components/report-explorer";
import { SectionHeading } from "@/components/section-heading";
import { getOverviewData, getReportsData } from "@/lib/tire-pressure";

export default async function ReportsPage() {
  const { pageMeta, reportTags, reports } = await getReportsData();
  const { agentRoles, agentOutputBlocks } = await getOverviewData();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-16 px-6 py-12 md:px-10 md:py-16">
      <section className="grid gap-10 xl:grid-cols-[1fr_0.75fr] xl:items-end">
        <div className="space-y-6">
          <p className="eyebrow">Research Topics</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl">
            把胎压计市场判断拆成五类固定专题
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
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["专题条目", `${reports.length}`],
            ["固定分类", `${reportTags.length - 1}`],
            ["当前口径", "来源驱动"],
          ].map(([label, value]) => (
            <article key={label} className="surface-panel min-h-[150px]">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                {label}
              </p>
              <p className="mt-8 text-4xl font-semibold text-white">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr]">
        <SectionHeading
          eyebrow="Topic Design"
          title="研究专题围绕管理层最关心的五个问题组织"
          description="市场、外贸、成本和竞争格局是管理决策维度，不是内容标签。分类先按决策问题固定，再让后续数据持续补进去。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {[
            "国内市场: 判断渠道结构、价格带与工具化场景。",
            "国际市场: 判断区域机会、私牌客户与包装版本要求。",
            "外贸与认证: 判断出口资料、认证和标签门槛。",
            "原材料与成本: 判断 BOM、利润弹性和采购节奏。",
            "竞争格局: 判断你要进入哪一层竞争，而不是只看品牌排名。",
          ].map((item) => (
            <article key={item} className="surface-panel min-h-[150px]">
              <p className="text-sm leading-7 text-[var(--muted)]">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Report Explorer"
          title="当前专题条目"
          description="每条专题都带来源摘要、风险提示、推荐动作和发布状态。弱证据内容会明确标成待补证。"
        />
        <ReportExplorer reportTags={reportTags} reports={reports} />
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Workflow"
          title="后续如果设 agent，编排顺序也已经预留好"
          description="页面结构和内容字段已经和后续 agent 输出保持一致，方便从 demo 过渡到持续更新。"
        />
        <AgentPipelinePanel
          agentRoles={agentRoles}
          agentOutputBlocks={agentOutputBlocks}
        />
      </section>
    </main>
  );
}
