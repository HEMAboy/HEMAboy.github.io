export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const siteName = "TIRE PRESSURE GAUGE DESK";

export const navigation: NavItem[] = [
  { label: "总览", href: "/" },
  { label: "研究专题", href: "/reports" },
  { label: "数据监测", href: "/dashboard" },
  { label: "技术页", href: "/technology" },
  { label: "文献监控", href: "/literature" },
];
