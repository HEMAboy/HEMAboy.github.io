# Incoming Agent Payloads

把 agent 生成的候选数据先写到这个目录，再执行：

```bash
pnpm tire-pressure:publish
```

默认行为：

- 先校验 `incoming/*.json` 是否符合 schema
- 校验失败时直接退出，不覆盖正式数据
- 校验通过后，把正式数据备份到 `archive/<timestamp>/`
- 再覆盖 `data/tire-pressure/*.json`
