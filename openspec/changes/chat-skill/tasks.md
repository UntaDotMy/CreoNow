# Tasks: chat-skill (#457)

## 1. Specification

引用 `proposal.md`：

- **REQ-SKL-CHAT**: chat 内置技能，自由对话和问答
- **REQ-SKL-ROUTE**: 基础意图路由 `inferSkillFromInput`
- **Scenario S1**: 默认使用 chat 技能
- **Scenario S2**: 续写关键词路由
- **Scenario S3**: 头脑风暴关键词路由

## 2. TDD Mapping（先测前提）

| Scenario | 测试用例 | 测试文件 |
|----------|---------|---------|
| S1 | `inferSkillFromInput returns chat for free text without keywords` | `skillRouter.test.ts` |
| S1 | `inferSkillFromInput returns chat for question-like input` | `skillRouter.test.ts` |
| S2 | `inferSkillFromInput returns continue for input containing 续写` | `skillRouter.test.ts` |
| S2 | `inferSkillFromInput returns continue for input containing 写下去` | `skillRouter.test.ts` |
| S3 | `inferSkillFromInput returns brainstorm for input containing 头脑风暴` | `skillRouter.test.ts` |
| S3 | `inferSkillFromInput returns brainstorm for input containing 帮我想想` | `skillRouter.test.ts` |
| — | `chat SKILL.md is valid and parseable` | `chatSkill.test.ts` |
| — | `inferSkillFromInput returns rewrite when hasSelection + short input` | `skillRouter.test.ts` |
| — | `inferSkillFromInput returns polish when hasSelection + empty input` | `skillRouter.test.ts` |

## 3. Red（先写失败测试）

测试文件：
- `apps/desktop/main/src/services/skills/__tests__/skillRouter.test.ts`
- `apps/desktop/main/src/services/skills/__tests__/chatSkill.test.ts`

Red 失败证据要求：所有测试必须在实现前运行并失败。

## 4. Green（最小实现通过）

实现文件：
- `apps/desktop/main/skills/packages/pkg.creonow.builtin/1.0.0/skills/chat/SKILL.md` — chat 技能定义
- `apps/desktop/main/src/services/skills/skillRouter.ts` — 意图路由函数

## 5. Refactor（保持绿灯）

- 提取关键词表为常量
- 确保路由函数纯函数、无副作用

## 6. Evidence

测试通过证据记录到 `openspec/_ops/task_runs/ISSUE-457.md`。
