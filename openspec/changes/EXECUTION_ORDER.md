# Active Changes Execution Order

更新时间：2026-02-12 21:15

适用范围：`openspec/changes/` 下所有非 `archive/`、非 `_template/` 的活跃 change。

## 执行策略

- 当前活跃 change 数量为 **4**（Phase 1 — AI 可用）。
- 执行模式：**混合（串行 + 并行）**

## 活跃 Changes

| Change | Issue | 模块 | 上游依赖 | 状态 |
|--------|-------|------|---------|------|
| `ai-identity-prompt` | #456 | ai-service | 无 | spec-ready |
| `chat-skill` | #457 | skill-system | #456 | spec-ready |
| `multi-turn-conversation` | #458 | ai-service | #456 | spec-ready |
| `api-key-settings` | #459 | workbench | 无 | spec-ready |

## 执行顺序

```
阶段 1（并行）：
  ├── #456 ai-identity-prompt （无依赖）
  └── #459 api-key-settings   （无依赖）

阶段 2（并行，依赖 #456 完成）：
  ├── #457 chat-skill            （依赖 #456）
  └── #458 multi-turn-conversation（依赖 #456）
```

## 依赖关系

- **#457 → #456**: chat-skill 依赖 ai-identity-prompt 的 `assembleSystemPrompt` 函数
- **#458 → #456**: multi-turn-conversation 依赖 ai-identity-prompt 的 `assembleSystemPrompt` 函数
- **#459**: 无上游依赖，可与任何 change 并行

## 维护规则

- 当活跃 change 数量达到 2 个及以上时，需恢复多泳道顺序定义。
- 未同步本文件时，不得宣称执行顺序已确认。
- 任一 change 状态变更时必须同步更新本文件。
