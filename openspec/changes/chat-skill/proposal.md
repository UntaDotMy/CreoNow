# Change: chat-skill

## 目标 Spec

`openspec/specs/skill-system/spec.md`

## 背景

当前内置技能全部是文本变换操作（润色、续写、改写等），不存在自由对话技能。用户输入"帮我想一个悬疑小说的开头"时，没有合适的技能处理。同时缺少意图路由——用户必须手动选择技能。

审计报告 `docs/audit/01-system-prompt-and-identity.md` §3.3、§3.4 分析了问题。

## Delta

### [ADDED] REQ-SKL-CHAT

技能系统必须包含 `chat` 内置技能，用于自由对话和问答：

- 技能 ID: `builtin:chat`
- 输入类型: 用户自由文本（不需要选中文本）
- AI 角色: collaborator
- system prompt: "与创作者对话，回答写作相关问题。如意图不明确，追问澄清。"
- 作用域: builtin，不可删除，可停用

### [ADDED] REQ-SKL-ROUTE

技能系统必须支持基础意图路由函数 `inferSkillFromInput`，根据用户输入和上下文推断目标技能：

- 规则优先级：显式指定 > 关键词匹配 > 上下文推断 > 默认 chat
- 关键词表：续写/写下去 → continue，帮我想想/头脑风暴 → brainstorm，大纲/提纲 → outline
- 上下文推断：有选中文本 + 短指令 → rewrite，有选中文本 + 无输入 → polish
- 默认回退：chat

### [ADDED] Scenario: 默认使用 chat 技能

GIVEN 用户发送自由文本 "帮我想一个悬疑小说的开头"
WHEN 未显式指定技能
THEN 技能路由返回 `builtin:chat`

### [ADDED] Scenario: 续写关键词路由

GIVEN 用户输入包含 "续写" 关键词
WHEN 技能路由分析
THEN 推断为 `builtin:continue` 技能

### [ADDED] Scenario: 头脑风暴关键词路由

GIVEN 用户输入包含 "头脑风暴" 关键词
WHEN 技能路由分析
THEN 推断为 brainstorm 技能（Phase 3 实现，当前返回技能 ID 字符串）

## 受影响模块

- **skill-system** — 新增 chat SKILL.md、技能路由函数

## 不做什么

- 不实现 brainstorm/roleplay/critique 等高级技能（Phase 3）
- 不实现 LLM-based 意图分类（仅关键词 + 启发式规则）
- 不修改技能执行流程（SkillExecutor 不变）

## 审阅状态

- Owner 审阅：`APPROVED`
