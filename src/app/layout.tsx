import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TIRE PRESSURE GAUGE DESK",
    template: "%s | TIRE PRESSURE GAUGE DESK",
  },
  description:
    "面向内部管理层的胎压计行业研究专题站，包含总览、研究专题、数据监测、技术页与独立文献监控。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full">
        <div className="page-shell">
          <div className="page-aurora page-aurora-cyan" />
          <div className="page-aurora page-aurora-indigo" />
          <div className="page-aurora page-aurora-amber" />
          <div className="page-beam" />
          <div className="page-glow page-glow-cyan" />
          <div className="page-glow page-glow-amber" />
          <div className="page-grid" />
          <div className="page-noise" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
