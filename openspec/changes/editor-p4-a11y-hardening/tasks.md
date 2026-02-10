## 1. Specification

- [ ] 1.1 审阅主 spec `editor/spec.md` 中「编辑器无障碍性（Accessibility）」的全部 Scenario（2 个）
- [ ] 1.2 审阅主 spec 中「模块级可验收标准」的量化阈值、边界与类型安全、失败处理策略
- [ ] 1.3 审阅主 spec 中「异常与边界覆盖矩阵」的 5 类覆盖要求及 Scenario（2 个）
- [ ] 1.4 审阅 NFR 中 Performance / Capacity / Security / Concurrency 全部指标及 Scenario（2 个）
- [ ] 1.5 依赖同步检查（Dependency Sync Check）：上游 `editor-p0` ~ `editor-p3`；核对所有组件 aria 属性、焦点管理、状态机边界

## 2. TDD Mapping（先测前提）

- [ ] 2.0 设定门禁：未出现 Red（失败测试）不得进入实现
- [ ] 2.1 S「Keyboard-only user navigates toolbar」→ 测试文件
- [ ] 2.2 S「Screen reader announces toolbar button state」→ 测试文件
- [ ] 2.3 S「编辑性能达标」→ 测试文件（性能基准测试）
- [ ] 2.4 S「AI 应用冲突阻断覆盖」→ 测试文件
- [ ] 2.5 S「自动保存与手动保存竞态」→ 测试文件
- [ ] 2.6 S「超大粘贴触发分块处理」→ 测试文件
- [ ] 2.7 S「大纲重算取消旧任务」→ 测试文件
- [ ] 2.8 S「文档容量超限提示」→ 测试文件

## 3. Red（先写失败测试）

- [ ] 3.1 编写 a11y（aria/焦点/键盘导航）Scenario 的失败测试
- [ ] 3.2 编写性能基准 Scenario 的失败测试
- [ ] 3.3 编写异常矩阵（竞态/容量/粘贴/冲突）Scenario 的失败测试
- [ ] 3.4 记录 Red 失败输出与关键日志至 RUN_LOG

## 4. Green（最小实现通过）

- [ ] 4.1 补齐所有组件的 aria 属性与 role 标注
- [ ] 4.2 实现焦点环样式与 `:focus-visible` 规则
- [ ] 4.3 实现大纲重算取消旧任务逻辑
- [ ] 4.4 实现文档容量超限检测与提示
- [ ] 4.5 实现超大粘贴分块处理
- [ ] 4.6 实现自动保存与手动保存竞态 → 手动优先复用队列

## 5. Refactor（保持绿灯）

- [ ] 5.1 统一 aria 属性工厂函数，减少各组件重复声明
- [ ] 5.2 全量回归保持绿灯

## 6. Evidence

- [ ] 6.1 记录 RUN_LOG（含 Red 失败证据、Green 通过证据与关键命令输出）
- [ ] 6.2 记录 Dependency Sync Check 的输入、核对结论与后续动作
- [ ] 6.3 记录性能基准测试结果（键入延迟 / 自动保存延迟 / Diff 打开延迟）
