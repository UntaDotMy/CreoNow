# Tasks: ai-identity-prompt (#456)

## 1. Specification

引用 `proposal.md`：

- **REQ-AIS-IDENTITY**: 全局身份提示词模板，含 5 个 XML 区块
- **REQ-AIS-ASSEMBLY**: 分层组装函数 `assembleSystemPrompt`，替代 `combineSystemText`
- **Scenario S1**: 身份层始终包含写作素养和角色流动
- **Scenario S2**: 技能 prompt 在身份层之后、上下文层之前
- **Scenario S3**: 记忆层注入到上下文层之前

## 2. TDD Mapping（先测前提）

| Scenario | 测试用例 | 测试文件 |
|----------|---------|---------|
| S1 | `assembleSystemPrompt with no optional layers includes identity blocks` | `assembleSystemPrompt.test.ts` |
| S1 | `assembleSystemPrompt never returns null or empty string` | `assembleSystemPrompt.test.ts` |
| S1 | `GLOBAL_IDENTITY_PROMPT contains <identity> <writing_awareness> <role_fluidity>` | `identityPrompt.test.ts` |
| S2 | `skill prompt appears after identity, before context overlay` | `assembleSystemPrompt.test.ts` |
| S3 | `memory overlay appears after skill prompt, before context overlay` | `assembleSystemPrompt.test.ts` |
| — | `assembleSystemPrompt preserves all non-empty layers in correct order` | `assembleSystemPrompt.test.ts` |

## 3. Red（先写失败测试）

测试文件：
- `apps/desktop/main/src/services/ai/__tests__/identityPrompt.test.ts`
- `apps/desktop/main/src/services/ai/__tests__/assembleSystemPrompt.test.ts`

Red 失败证据要求：所有测试必须在实现前运行并失败，失败输出记录到 RUN_LOG。

## 4. Green（最小实现通过）

实现文件：
- `apps/desktop/main/src/services/ai/identityPrompt.ts` — 全局身份模板常量
- `apps/desktop/main/src/services/ai/assembleSystemPrompt.ts` — 分层组装函数
- `apps/desktop/main/src/services/ai/aiService.ts` — 迁移调用点

## 5. Refactor（保持绿灯）

- 移除 `combineSystemText` 死代码
- 确保 `modeSystemHint` 集成到新组装链

## 6. Evidence

测试通过证据记录到 `openspec/_ops/task_runs/ISSUE-456.md`。
