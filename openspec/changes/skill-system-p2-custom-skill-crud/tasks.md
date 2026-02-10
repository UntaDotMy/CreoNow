## 1. Specification

- [ ] 1.1 审阅主 spec `skill-system/spec.md` 中「自定义技能管理」的全部 Scenario（4 个）
- [ ] 1.2 审阅自定义技能数据结构（10 个字段）与 Zod schema 定义
- [ ] 1.3 审阅 `skill:custom:create/update/delete/list` 四个 IPC 通道的 schema
- [ ] 1.4 审阅 AI 辅助创建流程（自然语言 → LLM 生成配置 → 可编辑表单 → 确认保存）
- [ ] 1.5 依赖同步检查（Dependency Sync Check）：上游 `skill-system-p1` + AI Service（Phase 3）；核对作用域体系、LLM 调用接口、Zod 错误格式

## 2. TDD Mapping（先测前提）

- [ ] 2.0 设定门禁：未出现 Red（失败测试）不得进入实现
- [ ] 2.1 S「用户手动创建自定义技能」→ 测试文件
- [ ] 2.2 S「用户通过自然语言描述创建技能」→ 测试文件
- [ ] 2.3 S「删除自定义技能的确认流程」→ 测试文件
- [ ] 2.4 S「创建技能时 Zod 校验失败」→ 测试文件

## 3. Red（先写失败测试）

- [ ] 3.1 编写手动创建 + Zod 校验 Scenario 的失败测试
- [ ] 3.2 编写 AI 辅助创建 Scenario 的失败测试
- [ ] 3.3 编写删除确认 Scenario 的失败测试
- [ ] 3.4 记录 Red 失败输出与关键日志至 RUN_LOG

## 4. Green（最小实现通过）

- [ ] 4.1 最小实现自定义技能 Zod schema 与 SQLite DAO
- [ ] 4.2 最小实现 skill:custom:create/update/delete/list IPC 通道
- [ ] 4.3 最小实现技能管理界面表单（手动创建 + 编辑）
- [ ] 4.4 最小实现 AI 辅助创建流程（LLM 生成 → 可编辑表单 → 确认）
- [ ] 4.5 最小实现删除确认对话框

## 5. Refactor（保持绿灯）

- [ ] 5.1 统一 CRUD IPC 通道的 Zod 校验与错误返回格式
- [ ] 5.2 全量回归保持绿灯

## 6. Evidence

- [ ] 6.1 记录 RUN_LOG（含 Red 失败证据、Green 通过证据与关键命令输出）
- [ ] 6.2 记录 Dependency Sync Check 的输入、核对结论与后续动作
