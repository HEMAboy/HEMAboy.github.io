import type { AgentRole } from "@/content/tire-pressure-schema";

type AgentPipelinePanelProps = {
  compact?: boolean;
  agentRoles: AgentRole[];
  agentOutputBlocks: string[];
};

export function AgentPipelinePanel({
  compact = false,
  agentRoles,
  agentOutputBlocks,
}: AgentPipelinePanelProps) {
  return (
    <div className="section-shell">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="eyebrow">Agent Pipeline</p>
          <h3 className="text-2xl font-semibold text-white">
            研究编排按固定顺序运行
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {agentOutputBlocks.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className={`mt-8 grid gap-4 ${compact ? "lg:grid-cols-2" : "xl:grid-cols-3"}`}>
        {agentRoles.map((role) => (
          <article
            key={role.id}
            className="rounded-[1.5rem] border border-white/8 bg-white/4 px-5 py-5"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                {String(role.sequence).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-[var(--muted)]">
                {role.needsWeb ? "联网" : "离线"}
              </span>
            </div>
            <h4 className="mt-5 text-lg font-semibold text-white">{role.name}</h4>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {role.responsibility}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
