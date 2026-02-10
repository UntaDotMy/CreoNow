## 1. Specification

- [ ] 1.1 审阅主 spec `version-control/spec.md` 中「版本快照生成与存储」的全部 Scenario（3 个）
- [ ] 1.2 审阅主 spec 中「版本历史入口与展示」的全部 Scenario（2 个）
- [ ] 1.3 审阅四种触发时机的 actor/reason 映射
- [ ] 1.4 审阅快照数据结构（8 个字段）与 IPC 通道 schema
- [ ] 1.5 审阅自动保存版本合并策略（5 分钟窗口、保留手动/AI 快照）
- [ ] 1.6 依赖同步检查（Dependency Sync Check）：上游 IPC（Phase 0）+ Document Management（Phase 1）+ Editor p0（Phase 4）；核对文档 ID 格式、保存事件触发方式、IPC 错误码

## 2. TDD Mapping（先测前提）

- [ ] 2.0 设定门禁：未出现 Red（失败测试）不得进入实现
- [ ] 2.1 S「用户手动保存生成版本快照」→ 测试文件
- [ ] 2.2 S「AI 修改被接受后生成版本快照」→ 测试文件
- [ ] 2.3 S「自动保存版本合并」→ 测试文件
- [ ] 2.4 S「用户打开版本历史」→ 测试文件
- [ ] 2.5 S「版本历史中的 actor 标识」→ 测试文件

## 3. Red（先写失败测试）

- [ ] 3.1 编写快照生成（四种触发时机）的失败测试
- [ ] 3.2 编写自动保存合并策略的失败测试
- [ ] 3.3 编写版本历史列表（展示、排序、actor 图标）的失败测试
- [ ] 3.4 记录 Red 失败输出与关键日志至 RUN_LOG

## 4. Green（最小实现通过）

- [ ] 4.1 最小实现快照数据模型与 SQLite DAO
- [ ] 4.2 最小实现 version:snapshot:create/list/read IPC 通道
- [ ] 4.3 最小实现四种触发时机的快照创建钩子
- [ ] 4.4 最小实现 autosave 合并策略（5 分钟窗口）
- [ ] 4.5 最小实现版本历史面板（时间线列表、actor 图标、字数变化）

## 5. Refactor（保持绿灯）

- [ ] 5.1 抽象快照触发为事件驱动（解耦 Editor 与 Version Control）
- [ ] 5.2 全量回归保持绿灯

## 6. Evidence

- [ ] 6.1 记录 RUN_LOG（含 Red 失败证据、Green 通过证据与关键命令输出）
- [ ] 6.2 记录 Dependency Sync Check 的输入、核对结论与后续动作
