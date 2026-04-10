# Tire Pressure Data Contract

这个目录用于承接后续 agent 自动写入的胎压计专题数据，并区分正式数据与待发布候选数据。

## 文件

- `overview.json`
  首页与 agent 编排展示数据。
- `reports.json`
  研究专题列表，单条专题内包含标准化 `agentOutput`。
- `dashboard.json`
  数据监测页的指标卡、时间序列、国家、材料与经营变量。
- `technology.json`
  技术页的技术方向、精度等级、测试方法和认证标准。
- `incoming/*.json`
  agent 生成的候选文件；通过校验后再覆盖正式数据。
- `archive/<timestamp>/*.json`
  每次发布前自动备份上一版正式数据。

## Schema

- `schemas/overview.schema.json`
- `schemas/reports.schema.json`
- `schemas/dashboard.schema.json`
- `schemas/technology.schema.json`
- `schemas/agent-output.schema.json`

## Agent 写入约束

- 所有文本字段写中文，必要时可保留英文缩写。
- 所有核心对象都必须包含：
  - `sources[]`
  - `confidence`
  - `publishStatus`
  - `lastReviewedAt`
  - `dataMethod`
- `agentOutput` 保留五段输出：
  - `conclusion`
  - `evidence`
  - `risk`
  - `visualizationSuggestion`
  - `updatedAt`
- `publishStatus` 使用：
  - `draft`
  - `reviewed`
  - `published`
  - `needs_review`
- 每个专题、监测模块、技术方向至少带 1 个可展示来源。

## 发布流程

```bash
pnpm tire-pressure:validate
pnpm tire-pressure:publish
```

- `tire-pressure:validate` 默认校验正式数据目录。
- `tire-pressure:publish` 默认校验 `incoming/`，通过后再覆盖正式数据。
