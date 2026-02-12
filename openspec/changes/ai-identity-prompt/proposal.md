# Change: ai-identity-prompt

## 目标 Spec

`openspec/specs/ai-service/spec.md`

## 背景

当前 `combineSystemText` 仅拼接技能级 systemPrompt 和动态 overlay，无全局身份层。LLM 可能在无任何角色定义的情况下被调用。`modeSystemHint` 只有一行，缺乏写作专业素养和角色流动定义。

审计报告 `docs/audit/01-system-prompt-and-identity.md` §3.1、§3.2 详细分析了问题和方案。

## Delta

### [ADDED] REQ-AIS-IDENTITY

AI 服务必须支持全局身份提示词模板，包含五个 XML 区块：

- `<identity>` — AI 创作伙伴身份定义
- `<writing_awareness>` — 写作素养（blocking、POV、节奏、Show don't tell、伏笔）
- `<role_fluidity>` — 角色流动（ghostwriter/muse/editor/actor/painter）
- `<behavior>` — 行为约束（语言、风格尊重、追问优先、输出格式）
- `<context_awareness>` — 上下文感知声明

身份提示词模板存储为独立模块 `identityPrompt.ts`，约 800-1200 tokens。

### [ADDED] REQ-AIS-ASSEMBLY

系统提示词必须按分层顺序组装，替代现有 `combineSystemText`：

1. 身份层（globalIdentity）— 始终在最前
2. 用户规则（userRules）
3. 技能指令（skillSystemPrompt）
4. 模式提示（modeHint）
5. 记忆覆盖（memoryOverlay）
6. 上下文覆盖（contextOverlay）

新函数 `assembleSystemPrompt` 替代 `combineSystemText`，保证身份层始终存在，不可能返回 null。

### [ADDED] Scenario: 身份层始终包含写作素养和角色流动

GIVEN AI 服务启动
WHEN 组装系统提示词（无任何可选层）
THEN 返回的系统提示词包含 `<identity>` 区块
AND 包含 `<writing_awareness>` 区块
AND 包含 `<role_fluidity>` 区块
AND 返回值为非空字符串（不可能为 null）

### [ADDED] Scenario: 技能 prompt 在身份层之后

GIVEN 技能指定了 system prompt "Polish the text"
WHEN 组装系统提示词
THEN 技能 prompt 出现在身份层之后
AND 技能 prompt 出现在上下文层之前

### [ADDED] Scenario: 记忆层注入到上下文层之前

GIVEN 用户有记忆偏好 "偏好短句，节奏紧凑"
WHEN 组装系统提示词
THEN 记忆层内容出现在上下文层之前
AND 记忆层内容出现在技能指令之后

### [MODIFIED] combineSystemText → assembleSystemPrompt

**Before**: `combineSystemText` 接受 `{systemPrompt?, system?}`，可返回 `null`。
**After**: `assembleSystemPrompt` 接受 `{globalIdentity, skillSystemPrompt?, modeHint?, memoryOverlay?, contextOverlay?, userRules?}`，始终返回 `string`（非 null）。所有调用点需迁移。

## 受影响模块

- **ai-service** — 核心变更：新增身份模板、替换组装函数
- **skill-system** — 调用侧适配新的 assembleSystemPrompt 签名

## 不做什么

- 不实现动态上下文注入（Context Engine fetcher 接入属 Phase 2）
- 不实现 memory 注入逻辑（仅预留参数位）
- 不修改 SKILL.md 格式

## 审阅状态

- Owner 审阅：`APPROVED`
