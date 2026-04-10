"use client";

import { startTransition, useState } from "react";

import { EvidenceMetaPills, SourceLinks } from "@/components/evidence-meta";
import type { DashboardData, MetricSeries } from "@/content/tire-pressure-schema";

const ranges = ["30D", "90D", "12M"] as const;

function buildPolylinePoints(series: MetricSeries) {
  const max = Math.max(...series.points.map((point) => point.value));
  const min = Math.min(...series.points.map((point) => point.value));
  const spread = Math.max(max - min, 1);

  return series.points
    .map((point, index) => {
      const x = index * (220 / Math.max(series.points.length - 1, 1));
      const y = 96 - ((point.value - min) / spread) * 72;

      return `${x},${y}`;
    })
    .join(" ");
}

type DashboardConsoleProps = DashboardData;

export function DashboardConsole({
  dashboardMetrics,
  dashboardSeriesByRange,
  tradeSeriesByRange,
  materialTrendsByRange,
  operatingSignalsByRange,
  moduleMeta,
}: DashboardConsoleProps) {
  const [activeRange, setActiveRange] = useState<(typeof ranges)[number]>("90D");

  const series = dashboardSeriesByRange[activeRange] ?? [];
  const tradeRows = tradeSeriesByRange[activeRange] ?? [];
  const materialRows = materialTrendsByRange[activeRange] ?? [];
  const operatingSignals = operatingSignalsByRange[activeRange] ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {ranges.map((range) => {
            const active = range === activeRange;

            return (
              <button
                key={range}
                type="button"
                onClick={() => {
                  startTransition(() => {
                    setActiveRange(range);
                  });
                }}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-[var(--accent)]/45 bg-[var(--accent)]/10 text-white"
                    : "border-white/10 text-[var(--muted)] hover:border-white/20 hover:text-white"
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-[var(--muted)]">
          {moduleMeta.series.dataMethod}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <article key={metric.id} className="surface-panel">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              {metric.label}
            </p>
            <div className="mt-5 flex items-end justify-between gap-4">
              <p className="text-4xl font-semibold text-white">{metric.value}</p>
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  metric.trend === "up"
                    ? "bg-emerald-400/10 text-emerald-300"
                    : metric.trend === "down"
                      ? "bg-amber-400/10 text-amber-300"
                      : "bg-white/8 text-[var(--muted)]"
                }`}
              >
                {metric.delta}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="surface-panel">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Signal Trend
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {moduleMeta.series.title}
              </h3>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              {activeRange}
            </p>
          </div>
          <div className="mt-4 space-y-4">
            <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
              {moduleMeta.series.scope}
            </p>
            <EvidenceMetaPills
              confidence={moduleMeta.series.confidence}
              publishStatus={moduleMeta.series.publishStatus}
              lastReviewedAt={moduleMeta.series.lastReviewedAt}
            />
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {series.map((item) => {
              const polylinePoints = buildPolylinePoints(item);

              return (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-white/8 bg-white/4 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-white">{item.label}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        单位 {item.unit}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-[var(--accent)]">
                      {item.points.at(-1)?.value}
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 220 110"
                    className="mt-6 h-32 w-full overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id={`gradient-${item.label}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#52f0da" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#52f0da" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                      points="0,96 220,96"
                    />
                    <polyline
                      fill="none"
                      stroke="#52f0da"
                      strokeWidth="2.5"
                      points={polylinePoints}
                    />
                    <polygon
                      fill={`url(#gradient-${item.label})`}
                      points={`0,96 ${polylinePoints} 220,96`}
                    />
                  </svg>
                  <div className="mt-2 flex justify-between text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                    {item.points.map((point) => (
                      <span key={point.period}>{point.period}</span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <SourceLinks sources={item.sources} maxItems={1} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-panel">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Market Window
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {moduleMeta.trade.title}
            </h3>
            <div className="mt-4 space-y-4">
              <p className="text-sm leading-7 text-[var(--muted)]">
                {moduleMeta.trade.scope}
              </p>
              <EvidenceMetaPills
                confidence={moduleMeta.trade.confidence}
                publishStatus={moduleMeta.trade.publishStatus}
                lastReviewedAt={moduleMeta.trade.lastReviewedAt}
              />
            </div>
            <div className="mt-6 space-y-4">
              {tradeRows.map((row) => (
                <div
                  key={row.country}
                  className="rounded-[1.5rem] border border-white/8 bg-white/4 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-white">{row.country}</span>
                    <span className="text-[var(--accent-soft)]">{row.marketSignal}</span>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
                    <p>{row.channelSignal}</p>
                    <p>{row.complianceNote}</p>
                    <p>{row.watchPoint}</p>
                  </div>
                  <div className="mt-4">
                    <SourceLinks sources={row.sources} maxItems={1} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Material Watch
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {moduleMeta.materials.title}
            </h3>
            <div className="mt-4 space-y-4">
              <p className="text-sm leading-7 text-[var(--muted)]">
                {moduleMeta.materials.scope}
              </p>
              <EvidenceMetaPills
                confidence={moduleMeta.materials.confidence}
                publishStatus={moduleMeta.materials.publishStatus}
                lastReviewedAt={moduleMeta.materials.lastReviewedAt}
              />
            </div>
            <div className="mt-6 space-y-5">
              {materialRows.map((material) => (
                <div
                  key={material.material}
                  className="rounded-[1.4rem] border border-white/8 bg-white/4 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-white">{material.material}</p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] ${
                        material.priceDirection === "up"
                          ? "bg-amber-400/10 text-amber-300"
                          : material.priceDirection === "down"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-white/8 text-[var(--muted)]"
                      }`}
                    >
                      {material.period}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[var(--accent-soft)]">
                    {material.costImpact}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {material.note}
                  </p>
                  <div className="mt-4">
                    <SourceLinks sources={material.sources} maxItems={1} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="surface-panel">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Operating Signals
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-white">
          {moduleMeta.operations.title}
        </h3>
        <div className="mt-4 space-y-4">
          <p className="text-sm leading-7 text-[var(--muted)]">
            {moduleMeta.operations.scope}
          </p>
          <EvidenceMetaPills
            confidence={moduleMeta.operations.confidence}
            publishStatus={moduleMeta.operations.publishStatus}
            lastReviewedAt={moduleMeta.operations.lastReviewedAt}
          />
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {operatingSignals.map((signal) => (
            <article
              key={signal.label}
              className="rounded-[1.5rem] border border-white/8 bg-white/4 px-5 py-5"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-white">{signal.label}</p>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] ${
                    signal.status === "positive"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : signal.status === "watch"
                        ? "bg-amber-400/10 text-amber-300"
                        : "bg-white/8 text-[var(--muted)]"
                  }`}
                >
                  {signal.value}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                {signal.note}
              </p>
              <div className="mt-4">
                <SourceLinks sources={signal.sources} maxItems={1} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
