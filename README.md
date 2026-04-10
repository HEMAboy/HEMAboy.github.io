# Tire Pressure Gauge Desk

`market-research-site` 是一个基于 Next.js App Router 的静态研究站，包含两条内容主线：

- 胎压计市场调研专题
- 文献监控与证据卡片系统

## 本地开发

```bash
pnpm install
pnpm dev
```

## 数据校验

```bash
node scripts/validate-tire-pressure-data.mjs --json
pnpm tire-pressure:validate
```

## GitHub Pages 部署

仓库按 GitHub Pages 静态导出配置：

- `next.config.ts` 使用 `output: "export"`
- `public/CNAME` 写入 `www.shizhoujie.com`
- GitHub Actions 负责构建并部署 `out/`

本地验证：

```bash
pnpm lint
pnpm build
```

构建成功后，静态文件位于 `out/`。
