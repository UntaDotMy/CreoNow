## 1. Specification

- [ ] 1.1 审阅主 spec `version-control/spec.md` 中「分支管理、合并与冲突解决」的全部 Scenario（2 个）
- [ ] 1.2 审阅分支命名规则（`[a-z0-9-]{3,32}`）与元数据结构
- [ ] 1.3 审阅 `version:branch:create/list/switch/merge` 和 `version:conflict:resolve` 五个 IPC 通道的 schema
- [ ] 1.4 审阅三方合并策略（base/source/target）与超时阈值（5s → VERSION_MERGE_TIMEOUT）
- [ ] 1.5 审阅冲突解决 UI 交互（逐块 ours/theirs/manual 选取）
- [ ] 1.6 依赖同步检查（Dependency Sync Check）：上游 `version-control-p0/p2`；核对快照 CRUD 接口、Diff 组件 API、版本数据结构

## 2. TDD Mapping（先测前提）

- [ ] 2.0 设定门禁：未出现 Red（失败测试）不得进入实现
- [ ] 2.1 S「创建分支并无冲突合并」→ 测试文件
- [ ] 2.2 S「合并冲突进入人工解决流程」→ 测试文件

## 3. Red（先写失败测试）

- [ ] 3.1 编写分支 CRUD（创建/列出/切换）的失败测试
- [ ] 3.2 编写无冲突合并（三方合并 + branch-merge 快照）的失败测试
- [ ] 3.3 编写冲突检测与解决（冲突块列表 + ours/theirs/manual + 落盘）的失败测试
- [ ] 3.4 编写合并超时（VERSION_MERGE_TIMEOUT）的失败测试
- [ ] 3.5 记录 Red 失败输出与关键日志至 RUN_LOG

## 4. Green（最小实现通过）

- [ ] 4.1 最小实现分支数据模型与 SQLite DAO
- [ ] 4.2 最小实现 version:branch:create/list/switch IPC 通道
- [ ] 4.3 最小实现三方合并算法（无冲突路径 + 冲突检测）
- [ ] 4.4 最小实现 version:branch:merge IPC 通道（含超时保护）
- [ ] 4.5 最小实现冲突解决 UI（逐块选取）与 version:conflict:resolve 落盘

## 5. Refactor（保持绿灯）

- [ ] 5.1 抽象三方合并算法为独立模块（可测试、可替换）
- [ ] 5.2 全量回归保持绿灯

## 6. Evidence

- [ ] 6.1 记录 RUN_LOG（含 Red 失败证据、Green 通过证据与关键命令输出）
- [ ] 6.2 记录 Dependency Sync Check 的输入、核对结论与后续动作
