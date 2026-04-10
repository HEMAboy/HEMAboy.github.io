import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatLiteratureDate,
  getAllPaperSlugs,
  getPaperBySlug,
} from "@/lib/literature";

type LiteratureDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPaperSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LiteratureDetailPageProps) {
  const { slug } = await params;
  const paper = await getPaperBySlug(slug);
  if (!paper) {
    return {
      title: "文献未找到",
    };
  }
  return {
    title: paper.title,
    description: paper.whyReadNow,
  };
}

export default async function LiteratureDetailPage({
  params,
}: LiteratureDetailPageProps) {
  const { slug } = await params;
  const paper = await getPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-6 py-12 md:px-10 md:py-16">
      <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Link href="/literature" className="eyebrow inline-flex items-center gap-2">
            ← 返回文献监控
          </Link>
          <div className="flex flex-wrap gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                paper.sourceStatus === "verified"
                  ? "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent-soft)]"
                  : "border-[var(--warm)]/30 bg-[var(--warm)]/10 text-[var(--warm)]"
              }`}
            >
              {paper.sourceStatus}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              {paper.isPreprint ? "Preprint" : "Formal"}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              {paper.evidenceLevel}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              quality {paper.qualityScore.toFixed(2)}
            </span>
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {paper.title}
          </h1>
          <p className="max-w-4xl text-lg leading-8 text-[var(--muted)]">{paper.whyReadNow}</p>
          <p className="max-w-4xl text-base leading-8 text-[var(--muted)]">{paper.whyItMatters}</p>
        </div>

        <div className="section-shell">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">速读层</p>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-[var(--muted)]">
            <p>
              <span className="text-white">研究问题:</span> {paper.mainQuestion}
            </p>
            <p>
              <span className="text-white">研究类型:</span> {paper.articleType}
            </p>
            <p>
              <span className="text-white">设计 / 系统:</span> {paper.studyDesign} /{" "}
              {paper.speciesOrSystem}
            </p>
            <p>
              <span className="text-white">方法概览:</span> {paper.methods}
            </p>
            <p>
              <span className="text-white">一句话结论:</span>{" "}
              {paper.mainFindings[0] ?? paper.keyFindings[0] ?? "unknown"}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="surface-panel">
          <p className="eyebrow">评估层</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
            <p>
              <span className="text-white">样本量:</span> {paper.sampleSize}
            </p>
            <p>
              <span className="text-white">Cohort:</span> {paper.cohortInfo}
            </p>
            <p>
              <span className="text-white">方法细节:</span> {paper.methodsDetailed}
            </p>
            <p>
              <span className="text-white">证据等级:</span> {paper.evidenceLevel}
            </p>
            <p>
              <span className="text-white">全文可用:</span> {paper.fulltextAvailable ? "yes" : "no"}
            </p>
            <p>
              <span className="text-white">相关性:</span> {paper.relevanceReason}
            </p>
          </div>
        </article>

        <article className="surface-panel">
          <p className="eyebrow">排序与推荐</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
            <p>
              <span className="text-white">Novelty:</span> {paper.noveltyScore.toFixed(2)}
            </p>
            <p>
              <span className="text-white">Rigor:</span> {paper.rigorScore.toFixed(2)}
            </p>
            <p>
              <span className="text-white">Relevance:</span> {paper.relevanceScore.toFixed(2)}
            </p>
            <p>
              <span className="text-white">Actionability:</span> {paper.actionabilityScore.toFixed(2)}
            </p>
            <p>
              <span className="text-white">总体解释:</span> {paper.explanation}
            </p>
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="surface-panel">
          <p className="eyebrow">主要发现与局限性</p>
          <div className="mt-5 space-y-4">
            {paper.mainFindings.map((finding) => (
              <div
                key={finding}
                className="rounded-[1.25rem] border border-white/8 bg-white/4 px-4 py-4 text-sm leading-7 text-[var(--muted)]"
              >
                {finding}
              </div>
            ))}
            <div className="rounded-[1.25rem] border border-white/8 bg-white/4 px-4 py-4 text-sm leading-7 text-[var(--muted)]">
              <p className="text-white">局限性</p>
              <ul className="mt-3 space-y-2">
                {paper.limitationsStructured.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
        <article className="surface-panel">
          <p className="eyebrow">元数据与溯源</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
            <p>
              <span className="text-white">来源:</span> {paper.source}
            </p>
            <p>
              <span className="text-white">期刊 / 平台:</span> {paper.journal}
            </p>
            <p>
              <span className="text-white">发布日期:</span>{" "}
              {formatLiteratureDate(paper.publishedAt)}
            </p>
            <p>
              <span className="text-white">DOI / PMID:</span> {paper.doi} / {paper.pmid}
            </p>
            <p>
              <span className="text-white">PMCID:</span> {paper.pmcid}
            </p>
            <p>
              <span className="text-white">作者:</span> {paper.authors.join(", ")}
            </p>
            <p>
              <span className="text-white">Datasets:</span>{" "}
              {paper.datasets.length > 0 ? paper.datasets.join(", ") : "unknown"}
            </p>
          </div>
        </article>
      </section>

      <section className="surface-panel">
        <p className="eyebrow">证据片段</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {paper.evidenceSnippets.map((item) => (
            <article
              key={`${item.fieldName}-${item.section}`}
              className="rounded-[1.25rem] border border-white/8 bg-white/4 px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">
                  {item.fieldName} / {item.section}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  conf {item.confidence.toFixed(2)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-panel">
        <p className="eyebrow">Provenance</p>
        <div className="mt-5 space-y-4">
          {paper.sourceProvenance.map((item) => (
            <article
              key={`${item.fieldName}-${item.source}-${item.method}`}
              className="rounded-[1.25rem] border border-white/8 bg-white/4 px-4 py-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">
                  {item.fieldName} / {item.source}
                </p>
                <p className="text-xs text-[var(--muted)]">{item.method}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.excerpt}</p>
              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm text-[var(--accent-soft)] hover:text-white"
                >
                  打开来源
                </a>
              ) : (
                <p className="mt-3 text-sm text-[var(--muted)]">当前记录未提供直接来源 URL。</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="surface-panel">
        <p className="eyebrow">Change Alerts</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {paper.changeAlerts.length > 0 ? (
            paper.changeAlerts.map((alert) => (
              <article
                key={`${alert.alertType}-${alert.detectedAt}`}
                className="rounded-[1.25rem] border border-white/8 bg-white/4 px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{alert.alertType}</p>
                  <p className="text-xs text-[var(--muted)]">{alert.severity}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{alert.summary}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{alert.details}</p>
              </article>
            ))
          ) : (
            <p className="text-sm leading-7 text-[var(--muted)]">当前没有检测到版本或状态警示。</p>
          )}
        </div>
      </section>

      <section className="section-shell">
        <p className="eyebrow">Source Links</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {paper.sourceLinks.length > 0 ? (
            paper.sourceLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                {link.label}
              </a>
            ))
          ) : (
            <p className="text-sm leading-7 text-[var(--muted)]">当前记录没有可直接打开的来源链接。</p>
          )}
        </div>
      </section>
    </main>
  );
}
