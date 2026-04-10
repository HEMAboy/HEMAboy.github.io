import Link from "next/link";

import { navigation, siteName } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.24em] text-white/86">
            {siteName}
          </p>
          <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
            面向内部管理层的胎压计行业研究 demo。当前为结构化占位内容，后续可以逐步接入真实市场、外贸、技术和成本数据。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent)]/40 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
