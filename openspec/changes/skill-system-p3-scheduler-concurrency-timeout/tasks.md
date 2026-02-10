## 1. Specification

- [ ] 1.1 审阅主 spec `skill-system/spec.md` 中「多技能并发调度、超时与依赖管理」的全部 Scenario（2 个）
- [ ] 1.2 审阅调度策略（同会话 FIFO、全局并发上限 8、队列上限 20）
- [ ] 1.3 审阅超时机制（默认 30,000ms、最大 120,000ms、中断与资源释放）
- [ ] 1.4 审阅依赖声明与缺失阻断逻辑
- [ ] 1.5 审阅错误码定义（`SKILL_TIMEOUT` / `SKILL_DEPENDENCY_MISSING` / `SKILL_QUEUE_OVERFLOW`）
- [ ] 1.6 依赖同步检查（Dependency Sync Check）：上游 `skill-system-p0`；核对 SkillExecutor 接口、executionId 生命周期、cancel 机制

## 2. TDD Mapping（先测前提）

- [ ] 2.0 设定门禁：未出现 Red（失败测试）不得进入实现
- [ ] 2.1 S「多技能并发请求按队列执行」→ 测试文件
- [ ] 2.2 S「技能依赖缺失阻断执行」→ 测试文件
- [ ] 2.3 S-NFR「超时中断可验证」→ 测试文件
- [ ] 2.4 S-NFR「队列溢出被拒绝」→ 测试文件

## 3. Red（先写失败测试）

- [ ] 3.1 编写 FIFO 排队 + 全局并发上限的失败测试
- [ ] 3.2 编写超时中断 + 资源释放的失败测试
- [ ] 3.3 编写依赖缺失阻断的失败测试
- [ ] 3.4 编写队列溢出拒绝的失败测试
- [ ] 3.5 记录 Red 失败输出与关键日志至 RUN_LOG

## 4. Green（最小实现通过）

- [ ] 4.1 最小实现调度器（同会话串行 FIFO + 全局并发上限 8）
- [ ] 4.2 最小实现执行超时中断与资源释放
- [ ] 4.3 最小实现技能依赖校验与 SKILL_DEPENDENCY_MISSING 返回
- [ ] 4.4 最小实现队列溢出保护与 SKILL_QUEUE_OVERFLOW 返回
- [ ] 4.5 最小实现队列状态推送到 AI 面板

## 5. Refactor（保持绿灯）

- [ ] 5.1 抽象调度器为独立 `SkillScheduler` 模块，与 SkillExecutor 解耦
- [ ] 5.2 全量回归保持绿灯

## 6. Evidence

- [ ] 6.1 记录 RUN_LOG（含 Red 失败证据、Green 通过证据与关键命令输出）
- [ ] 6.2 记录 Dependency Sync Check 的输入、核对结论与后续动作
