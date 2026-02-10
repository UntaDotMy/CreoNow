## 1. Specification

- [ ] 1.1 审阅主 spec `version-control/spec.md` 中「版本对比（Diff）」的全部 Scenario（2 个）
- [ ] 1.2 审阅主 spec 中「版本回滚」的全部 Scenario（3 个）
- [ ] 1.3 审阅 `version:diff` 和 `version:rollback` IPC 通道的 schema
- [ ] 1.4 审阅回滚三步流程（pre-rollback → 设置当前 → rollback 快照）
- [ ] 1.5 审阅 AI 修改区分在 Diff 中的虚线下划线渲染规则
- [ ] 1.6 依赖同步检查（Dependency Sync Check）：上游 `version-control-p0/p1` + `editor-p2`；核对快照 CRUD 接口、DiffViewPanel/MultiVersionCompare 组件 API、AI 标记偏好字段

## 2. TDD Mapping（先测前提）

- [ ] 2.0 设定门禁：未出现 Red（失败测试）不得进入实现
- [ ] 2.1 S「用户对比历史版本与当前版本」→ 测试文件
- [ ] 2.2 S「两个版本内容完全相同」→ 测试文件
- [ ] 2.3 S「用户回滚到历史版本」→ 测试文件
- [ ] 2.4 S「回滚后再次回滚（可撤销的回滚）」→ 测试文件
- [ ] 2.5 S「回滚确认被取消」→ 测试文件

## 3. Red（先写失败测试）

- [ ] 3.1 编写版本对比（Diff 渲染 / 无差异 / 同步滚动）的失败测试
- [ ] 3.2 编写版本回滚（三步流程 / 可撤销 / 取消）的失败测试
- [ ] 3.3 记录 Red 失败输出与关键日志至 RUN_LOG

## 4. Green（最小实现通过）

- [ ] 4.1 最小实现 version:diff IPC 通道与 diff 数据计算
- [ ] 4.2 最小实现版本对比 UI（复用 DiffViewPanel / MultiVersionCompare）
- [ ] 4.3 最小实现 version:rollback IPC 通道（pre-rollback + 设置当前 + rollback 快照）
- [ ] 4.4 最小实现回滚确认对话框与取消逻辑
- [ ] 4.5 最小实现 AI 修改虚线下划线渲染（条件开启）

## 5. Refactor（保持绿灯）

- [ ] 5.1 统一 Diff 数据格式（version-control 与 editor 共享类型）
- [ ] 5.2 全量回归保持绿灯

## 6. Evidence

- [ ] 6.1 记录 RUN_LOG（含 Red 失败证据、Green 通过证据与关键命令输出）
- [ ] 6.2 记录 Dependency Sync Check 的输入、核对结论与后续动作
