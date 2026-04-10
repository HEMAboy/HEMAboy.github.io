import Link from "next/link";

import { navigation, siteName } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--surface-strong)]/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/6 text-xs font-semibold tracking-[0.28em] text-[var(--accent)]">
            TP
          </span>
          <div className="space-y-1">
            <p className="text-sm font-semibold tracking-[0.24em] text-white/88">
              {siteName}
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Industry Research Demo
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-transparent px-4 py-2 text-sm text-[var(--muted)] transition hover:border-white/12 hover:bg-white/7 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
