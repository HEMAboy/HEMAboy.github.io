import type {
  ConfidenceLevel,
  PublishStatus,
  SourceReference,
} from "@/content/tire-pressure-schema";

const confidenceLabel: Record<ConfidenceLevel, string> = {
  high: "高置信",
  medium: "中置信",
  low: "低置信",
};

const publishStatusLabel: Record<PublishStatus, string> = {
  draft: "草稿",
  reviewed: "已复核",
  published: "已发布",
  needs_review: "待补证",
};

function confidenceClass(confidence: ConfidenceLevel) {
  if (confidence === "high") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
  }

  if (confidence === "medium") {
    return "border-[var(--accent)]/20 bg-[var(--accent)]/10 text-[var(--accent-soft)]";
  }

  return "border-amber-400/20 bg-amber-400/10 text-amber-200";
}

function publishStatusClass(status: PublishStatus) {
  if (status === "published") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
  }

  if (status === "reviewed") {
    return "border-white/12 bg-white/6 text-white/88";
  }

  if (status === "needs_review") {
    return "border-amber-400/20 bg-amber-400/10 text-amber-200";
  }

  return "border-white/10 bg-white/5 text-[var(--muted)]";
}

function sourceTypeLabel(sourceType: SourceReference["sourceType"]) {
  switch (sourceType) {
    case "official":
      return "官方";
    case "government-relay":
      return "官方转引";
    case "industry-association":
      return "行业协会";
    case "marketplace":
      return "渠道页面";
    case "commodity-tracker":
      return "行情站";
    case "research":
      return "研究";
    default:
      return "来源";
  }
}

type EvidenceMetaPillsProps = {
  confidence: ConfidenceLevel;
  publishStatus: PublishStatus;
  lastReviewedAt: string;
};

export function EvidenceMetaPills({
  confidence,
  publishStatus,
  lastReviewedAt,
}: EvidenceMetaPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={`rounded-full border px-3 py-1 text-[11px] tracking-[0.14em] ${confidenceClass(confidence)}`}
      >
        {confidenceLabel[confidence]}
      </span>
      <span
        className={`rounded-full border px-3 py-1 text-[11px] tracking-[0.14em] ${publishStatusClass(publishStatus)}`}
      >
        {publishStatusLabel[publishStatus]}
      </span>
      <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] tracking-[0.14em] text-[var(--muted)]">
        复核 {lastReviewedAt || "未设定"}
      </span>
    </div>
  );
}

type SourceLinksProps = {
  sources: SourceReference[];
  maxItems?: number;
};

export function SourceLinks({ sources, maxItems = 2 }: SourceLinksProps) {
  const visibleSources = sources.slice(0, maxItems);

  return (
    <div className="space-y-2">
      {visibleSources.map((source) => (
        <a
          key={source.id}
          href={source.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="block rounded-[1rem] border border-white/8 bg-white/4 px-4 py-3 hover:border-white/16 hover:bg-white/6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--accent-soft)]">
              {sourceTypeLabel(source.sourceType)}
            </span>
            <span className="text-[11px] tracking-[0.14em] text-[var(--muted)]">
              {source.quotedAt}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-white/88">{source.sourceTitle}</p>
          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{source.note}</p>
        </a>
      ))}
    </div>
  );
}
