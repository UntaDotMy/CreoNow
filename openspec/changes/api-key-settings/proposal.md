# Change: api-key-settings

## 目标 Spec

`openspec/specs/workbench/spec.md`

## 背景

后端已有 provider 配置逻辑（OpenAI / Anthropic / 代理），有 `aiProxySettingsService` 支持 API Key 加密存储和连接测试。但前端无 AI 配置界面，用户完全无法配置 AI 提供商。

审计报告 `docs/audit/06-onboarding-ux-config.md` §3.1 分析了问题。

## Delta

### [ADDED] REQ-WB-AICONFIG

设置面板必须包含 AI 配置区，提供以下功能：

- Provider 模式选择（OpenAI Compatible / OpenAI BYOK / Anthropic BYOK）
- API Key 输入框（密码类型，可切换显示/隐藏）
- Base URL 输入框
- 模型选择（从 provider 动态获取模型列表）
- 连接测试按钮（显示成功/失败/延迟）

AI 配置区位于设置面板中，与现有的外观设置、代理设置并列。

### [ADDED] REQ-WB-KEYSAFE

API Key 通过已有的 `aiProxySettingsService` 安全存储（Electron safeStorage 加密）。前端不持有明文 API Key，仅显示 `apiKeyConfigured: boolean` 状态。

### [ADDED] Scenario: AI 配置区展示

GIVEN 用户打开设置
WHEN 进入 AI 配置区
THEN 显示 Provider 模式选择、API Key 输入框、Base URL 输入框、模型选择
AND API Key 已配置时显示 "已配置" 状态

### [ADDED] Scenario: 连接测试

GIVEN 用户输入 API Key 和 Base URL
WHEN 点击测试连接
THEN 调用 `ai:proxy:test` IPC 通道
AND 显示成功（绿色 + 延迟 ms）或失败（红色 + 错误信息）

### [ADDED] Scenario: 无 API Key 时的配置引导

GIVEN 无可用 API Key
WHEN 用户尝试使用 AI 功能（aiStore.run）
THEN AI 面板显示 "请先在设置中配置 AI 服务" 引导
AND 提供跳转到设置的按钮

## 受影响模块

- **workbench** — 设置面板新增 AI 配置区

## 不做什么

- 不修改后端 `aiProxySettingsService`（已完备）
- 不实现 Onboarding AI 配置步骤（后续 Phase）
- 不实现用量统计展示（后续 Phase）

## 审阅状态

- Owner 审阅：`APPROVED`
