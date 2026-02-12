# Tasks: api-key-settings (#459)

## 1. Specification

引用 `proposal.md`：

- **REQ-WB-AICONFIG**: 设置面板 AI 配置区
- **REQ-WB-KEYSAFE**: API Key 安全存储
- **Scenario S1**: AI 配置区展示
- **Scenario S2**: 连接测试
- **Scenario S3**: 无 API Key 时的配置引导

## 2. TDD Mapping（先测前提）

| Scenario | 测试用例 | 测试文件 |
|----------|---------|---------|
| S1 | `AiSettingsSection renders provider mode selector` | `AiSettingsSection.test.tsx` |
| S1 | `AiSettingsSection renders API Key input field` | `AiSettingsSection.test.tsx` |
| S1 | `AiSettingsSection shows configured state when apiKeyConfigured is true` | `AiSettingsSection.test.tsx` |
| S2 | `AiSettingsSection calls ai:proxy:test on test button click` | `AiSettingsSection.test.tsx` |
| S2 | `AiSettingsSection shows success result with latency` | `AiSettingsSection.test.tsx` |
| S2 | `AiSettingsSection shows error result on test failure` | `AiSettingsSection.test.tsx` |
| S3 | `AiNotConfiguredGuide renders when no API key configured` | `AiNotConfiguredGuide.test.tsx` |
| S3 | `AiNotConfiguredGuide has settings navigation button` | `AiNotConfiguredGuide.test.tsx` |

## 3. Red（先写失败测试）

测试文件：
- `apps/desktop/renderer/src/features/settings/__tests__/AiSettingsSection.test.tsx`
- `apps/desktop/renderer/src/features/ai/__tests__/AiNotConfiguredGuide.test.tsx`

Red 失败证据要求：所有测试必须在实现前运行并失败。

## 4. Green（最小实现通过）

实现文件：
- `apps/desktop/renderer/src/features/settings/AiSettingsSection.tsx` — AI 配置区组件
- `apps/desktop/renderer/src/features/ai/AiNotConfiguredGuide.tsx` — 无 Key 引导组件

## 5. Refactor（保持绿灯）

- 抽取共享的测试连接状态逻辑
- 确保组件遵循设计规范

## 6. Evidence

测试通过证据记录到 `openspec/_ops/task_runs/ISSUE-459.md`。
