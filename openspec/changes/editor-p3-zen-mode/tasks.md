## 1. Specification

- [ ] 1.1 审阅主 spec `editor/spec.md` 中「禅模式（Zen Mode）」的全部 Scenario（3 个）
- [ ] 1.2 审阅进入/退出触发方式（F11 / Escape）、覆盖层 z-index、背景样式
- [ ] 1.3 审阅底部 hover 状态栏的四项指标（字数、保存状态、阅读时间、当前时间）
- [ ] 1.4 审阅空文档边界行为（占位标题、闪烁光标、字数 0）
- [ ] 1.5 依赖同步检查（Dependency Sync Check）：上游 `editor-p0`；核对 editorStore 实例、autosave 状态字段、wordCount 计算方式

## 2. TDD Mapping（先测前提）

- [ ] 2.0 设定门禁：未出现 Red（失败测试）不得进入实现
- [ ] 2.1 S「User enters and exits Zen Mode」→ 测试文件
- [ ] 2.2 S「Zen Mode hides all distractions」→ 测试文件
- [ ] 2.3 S「Zen Mode with empty document」→ 测试文件

## 3. Red（先写失败测试）

- [ ] 3.1 编写禅模式进入/退出 + 覆盖层渲染的失败测试
- [ ] 3.2 编写 UI 隐藏 + hover 状态栏的失败测试
- [ ] 3.3 编写空文档边界的失败测试
- [ ] 3.4 记录 Red 失败输出与关键日志至 RUN_LOG

## 4. Green（最小实现通过）

- [ ] 4.1 最小实现 ZenMode 覆盖层组件（F11/Escape 切换、z-index、背景）
- [ ] 4.2 最小实现退出提示 + 顶部 hover 关闭按钮
- [ ] 4.3 最小实现底部 hover 状态栏（字数/保存状态/阅读时间/当前时间）
- [ ] 4.4 最小实现空文档占位显示

## 5. Refactor（保持绿灯）

- [ ] 5.1 将禅模式样式抽取为 design token 引用，消除硬编码值
- [ ] 5.2 全量回归保持绿灯

## 6. Evidence

- [ ] 6.1 记录 RUN_LOG（含 Red 失败证据、Green 通过证据与关键命令输出）
- [ ] 6.2 记录 Dependency Sync Check 的输入、核对结论与后续动作
