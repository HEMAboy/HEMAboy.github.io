import { EvidenceMetaPills, SourceLinks } from "@/components/evidence-meta";
import { SectionHeading } from "@/components/section-heading";
import { getOverviewData, getTechnologyData } from "@/lib/tire-pressure";

export const metadata = {
  title: "技术页",
  description: "胎压计产品代际、精度等级、测试方法、材料工艺与标准认证的结构化技术页。",
};

export default async function TechnologyPage() {
  const { capabilityModules } = await getOverviewData();
  const {
    pageMeta,
    technologyTracks,
    accuracyBands,
    testMethods,
    certificationStandards,
  } = await getTechnologyData();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-16 px-6 py-12 md:px-10 md:py-16">
      <section className="grid gap-10 xl:grid-cols-[1fr_0.85fr] xl:items-end">
        <div className="space-y-6">
          <p className="eyebrow">Technology Page</p>
          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-white md:text-6xl">
            把技术路线、测试方法和制造工艺放在同一个页面里看
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
            ["技术方向", `${technologyTracks.length}`],
            ["测试方法", `${testMethods.length}`],
            ["标准/认证", `${certificationStandards.length}`],
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

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Technology Tracks"
          title="当前最值得跟踪的技术方向"
          description="首版先把成熟、成长和前瞻方向拆清，不把不同成熟度的技术混成一个结论。"
        />
        <div className="grid gap-5 xl:grid-cols-3">
          {technologyTracks.map((track) => (
            <article key={track.title} className="surface-panel min-h-[290px]">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]">
                  {track.maturity}
                </span>
                <span className="text-[11px] tracking-[0.14em] text-[var(--accent-soft)]">
                  {track.applicableRegion}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                {track.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                {track.differentiator}
              </p>
              <div className="mt-6 space-y-3 text-sm leading-6">
                <p className="text-white/88">适用场景: {track.application}</p>
                <p className="text-[var(--muted)]">
                  标准约束: {track.standardConstraint}
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <EvidenceMetaPills
                  confidence={track.confidence}
                  publishStatus={track.publishStatus}
                  lastReviewedAt={track.lastReviewedAt}
                />
                <SourceLinks sources={track.sources} maxItems={1} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr]">
        <SectionHeading
          eyebrow="Accuracy & Testing"
          title="精度等级要和测试能力配套看"
          description="如果测试体系、校准流程和批次一致性跟不上，高精度宣传会直接转化为售后与退货风险。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {accuracyBands.map((band) => (
            <article key={band.grade} className="surface-panel min-h-[210px]">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                {band.tolerance}
              </p>
              <h3 className="mt-5 text-2xl font-semibold text-white">{band.grade}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {band.scenario}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--accent-soft)]">
                风险: {band.risk}
              </p>
              <div className="mt-5">
                <EvidenceMetaPills
                  confidence={band.confidence}
                  publishStatus={band.publishStatus}
                  lastReviewedAt={band.lastReviewedAt}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-12 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Test Methods"
            title="测试方法"
            description="测试不是技术页附属品，而是制造能力可否兑现为市场承诺的关键。"
          />
          <div className="space-y-5">
            {testMethods.map((method) => (
              <article key={method.name} className="surface-panel">
                <h3 className="text-xl font-semibold text-white">{method.name}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {method.purpose}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {method.keyCheckpoints.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-white/88">
                  工艺关联: {method.linkedProcess}
                </p>
                <div className="mt-5 space-y-4">
                  <EvidenceMetaPills
                    confidence={method.confidence}
                    publishStatus={method.publishStatus}
                    lastReviewedAt={method.lastReviewedAt}
                  />
                  <SourceLinks sources={method.sources} maxItems={1} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Process & Standards"
            title="材料工艺与标准认证"
            description="这里既要看产品，也要看交付。材料、结构、包装和标准资料必须能在同一供应链里闭环。"
          />
          <div className="space-y-5">
            {capabilityModules.map((capability) => (
              <article key={capability.id} className="surface-panel">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {capability.machineSet.join(" / ")}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {capability.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {capability.marketLink}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {capability.fitProducts.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="space-y-4">
            {certificationStandards.map((standard) => (
              <article
                key={standard.name}
                className="rounded-[1.5rem] border border-white/8 bg-white/4 px-5 py-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{standard.name}</h3>
                  <span className="text-xs text-[var(--accent-soft)]">{standard.region}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {standard.scope}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--accent-soft)]">
                  适用品类: {standard.applicableProduct}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/88">
                  {standard.implication}
                </p>
                <div className="mt-5 space-y-4">
                  <EvidenceMetaPills
                    confidence={standard.confidence}
                    publishStatus={standard.publishStatus}
                    lastReviewedAt={standard.lastReviewedAt}
                  />
                  <SourceLinks sources={standard.sources} maxItems={1} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
