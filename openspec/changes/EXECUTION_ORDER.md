# Active Changes Execution Order

更新时间：2026-02-12 21:53

适用范围：`openspec/changes/` 下所有非 `archive/`、非 `_template/` 的活跃 change。

## 执行策略

- 当前活跃 change 数量为 **0**
- 路线图已更新为 36-change × 6-Phase 计划（见 `docs/plans/audit-roadmap.md`）
- 旧 Phase 1 的 4 个 change（#456-#459）已合并，对应目录已归档
- 新 Phase 1 的 7 个 change 尚未创建 Issue

## 下一步

新 Phase 1 包含 7 个 change（见 `docs/plans/phase1-agent-instruction.md`）：

| Change ID | 模块 | 上游依赖 | 预估 |
|-----------|------|---------|------|
| `p1-identity-template` | ai-service | 无 | 0.5d |
| `p1-assemble-prompt` | ai-service | p1-identity-template | 1d |
| `p1-chat-skill` | skill-system | 无 | 0.5d |
| `p1-aistore-messages` | ai-service | p1-assemble-prompt | 0.5d |
| `p1-multiturn-assembly` | ai-service | p1-aistore-messages | 1d |
| `p1-apikey-storage` | workbench | 无 | 1d |
| `p1-ai-settings-ui` | workbench | p1-apikey-storage | 1d |

推荐并行路径：
```
路径 A: p1-identity-template → p1-assemble-prompt → p1-aistore-messages → p1-multiturn-assembly
路径 B: p1-chat-skill （独立）
路径 C: p1-apikey-storage → p1-ai-settings-ui
```

## 维护规则

- 当活跃 change 数量达到 2 个及以上时，必须维护本文件
- 未同步本文件时，不得宣称执行顺序已确认
- 任一 change 状态变更时必须同步更新本文件
