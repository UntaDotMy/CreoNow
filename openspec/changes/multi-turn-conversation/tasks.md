# Tasks: multi-turn-conversation (#458)

## 1. Specification

引用 `proposal.md`：

- **REQ-AIS-MESSAGES**: 对话消息数组管理（add/clear/trim）
- **REQ-AIS-MULTITURN**: LLM 调用包含历史消息
- **Scenario S1**: 请求包含历史消息
- **Scenario S2**: Token 超预算时裁剪
- **Scenario S3**: 切换文档时清空

## 2. TDD Mapping（先测前提）

| Scenario | 测试用例 | 测试文件 |
|----------|---------|---------|
| S1 | `buildLLMMessages includes history messages in order` | `buildLLMMessages.test.ts` |
| S1 | `buildLLMMessages places system message first` | `buildLLMMessages.test.ts` |
| S1 | `buildLLMMessages includes current user message last` | `buildLLMMessages.test.ts` |
| S2 | `buildLLMMessages trims oldest non-system messages when over budget` | `buildLLMMessages.test.ts` |
| S2 | `buildLLMMessages always retains system message` | `buildLLMMessages.test.ts` |
| S2 | `buildLLMMessages keeps most recent messages within budget` | `buildLLMMessages.test.ts` |
| S3 | `ChatMessageManager.clear empties messages array` | `chatMessageManager.test.ts` |
| S3 | `ChatMessageManager.add appends message` | `chatMessageManager.test.ts` |
| — | `estimateTokenCount returns stable approximation` | `buildLLMMessages.test.ts` |

## 3. Red（先写失败测试）

测试文件：
- `apps/desktop/main/src/services/ai/__tests__/buildLLMMessages.test.ts`
- `apps/desktop/main/src/services/ai/__tests__/chatMessageManager.test.ts`

Red 失败证据要求：所有测试必须在实现前运行并失败。

## 4. Green（最小实现通过）

实现文件：
- `apps/desktop/main/src/services/ai/chatMessageManager.ts` — 消息数组管理
- `apps/desktop/main/src/services/ai/buildLLMMessages.ts` — 多轮消息组装

## 5. Refactor（保持绿灯）

- 确保 `estimateTokenCount` 复用 aiService.ts 中已有的实现
- 消息管理器为纯函数式设计

## 6. Evidence

测试通过证据记录到 `openspec/_ops/task_runs/ISSUE-458.md`。
