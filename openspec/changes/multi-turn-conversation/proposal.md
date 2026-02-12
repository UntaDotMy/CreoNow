# Change: multi-turn-conversation

## 目标 Spec

`openspec/specs/ai-service/spec.md`

## 背景

当前 aiStore 仅管理单次 `input` → `output`，无 `messages` 数组。每次 AI 调用完全无状态，用户说"继续刚才的方向"时 AI 没有"刚才"的上下文。

审计报告 `docs/audit/02-conversation-and-context.md` §3.1、§3.2 分析了问题和方案。

## Delta

### [ADDED] REQ-AIS-MESSAGES

AI 服务必须维护对话消息数组，支持以下操作：

- `addMessage(msg: ChatMessage)` — 添加消息到历史
- `clearMessages()` — 清空历史（切换文档/项目时调用）
- `trimMessages(maxTokens: number)` — 从最早的非系统消息开始裁剪直到 token 预算内

ChatMessage 结构：
```typescript
type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  skillId?: string;
  metadata?: { tokenCount: number; model: string };
};
```

### [ADDED] REQ-AIS-MULTITURN

LLM 调用必须包含历史消息，按以下顺序组装：

1. system message（assembleSystemPrompt 输出）
2. 历史消息（ChatMessage[] 按时间序）
3. 当前用户输入

消息裁剪策略：从最早的非系统消息开始移除，直到总 token 数在预算内。默认 token 预算 4000。

### [ADDED] Scenario: 请求包含历史消息

GIVEN 用户发送第 3 条消息
WHEN LLM 调用
THEN 请求消息数组包含前 2 条历史消息 + 当前消息
AND system message 在最前面

### [ADDED] Scenario: Token 超预算时裁剪

GIVEN 历史消息总 token 超过预算（4000）
WHEN 组装消息
THEN 从最早的非系统消息开始裁剪
AND 保留最近的消息
AND system message 始终保留

### [ADDED] Scenario: 切换文档时清空

GIVEN 用户切换文档
WHEN 对话上下文变更
THEN 清空历史消息数组
AND 下次 LLM 调用只包含 system + 当前消息

## 受影响模块

- **ai-service** — 消息数组管理、LLM 调用组装逻辑

## 不做什么

- 不实现消息持久化到 SQLite（当前仅内存态）
- 不实现对话历史跨会话恢复
- 不修改流式响应逻辑

## 审阅状态

- Owner 审阅：`APPROVED`
