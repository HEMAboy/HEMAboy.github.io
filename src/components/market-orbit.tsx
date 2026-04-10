export function MarketOrbit() {
  return (
    <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,#1ae3cf22,transparent_40%),linear-gradient(180deg,#11192b_0%,#0a101c_100%)] p-8 shadow-[0_30px_120px_rgba(3,8,20,0.55)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] opacity-60" />
      <div className="pointer-events-none absolute inset-6 rounded-[1.75rem] border border-white/8" />
      <div className="hero-orb hero-orb-lg" />
      <div className="hero-orb hero-orb-sm" />
      <div className="relative z-10 w-full space-y-8">
        <div className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Factory-linked Radar
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              制造能力映射市场机会
            </p>
          </div>
          <div className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs text-[var(--accent)]">
            demo
          </div>
        </div>
        <div className="surface-panel overflow-hidden">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Opportunity Fit
              </p>
              <p className="mt-2 text-4xl font-semibold text-white">A-</p>
            </div>
            <p className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              出口导向
            </p>
          </div>
          <div className="relative mt-7 h-48 overflow-hidden rounded-[1.7rem] border border-white/8 bg-[radial-gradient(circle_at_50%_0%,rgba(82,240,218,0.15),transparent_55%)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute h-56 w-56 rounded-full border border-white/6" />
              <div className="absolute h-40 w-40 rounded-full border border-white/8" />
              <div className="absolute h-24 w-24 rounded-full border border-[var(--accent)]/24" />
              <div className="absolute h-px w-full bg-[linear-gradient(90deg,transparent,rgba(82,240,218,0.4),transparent)]" />
              <div className="absolute h-full w-px bg-[linear-gradient(180deg,transparent,rgba(82,240,218,0.22),transparent)]" />
              <div className="h-3.5 w-3.5 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(82,240,218,0.6)]" />
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["注塑", "外壳与护套"],
              ["压铸", "接头与内构"],
              ["包装印刷", "私牌交付"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.4rem] border border-white/8 bg-white/4 px-4 py-4"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/90">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid h-16 grid-cols-7 items-end gap-3">
            {[32, 41, 38, 54, 48, 61, 74].map((height) => (
              <div key={height} className="flex h-full items-end">
                <div
                  className="w-full rounded-full bg-[linear-gradient(180deg,#5df7e1_0%,#123945_100%)] shadow-[0_0_18px_rgba(26,227,207,0.18)]"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
            {["精度", "包装", "外观", "交付", "认证", "客户", "利润"].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="mt-6 rounded-[1.4rem] border border-white/8 bg-white/4 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Current Reading
            </p>
            <p className="mt-3 text-sm leading-6 text-white/88">
              这类产品的竞争不只在单价，而在于能否把精度、外观、包装、说明和交付节奏作为一个整体交给客户。对具备完整产线的工厂，这比单点成本更关键。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
