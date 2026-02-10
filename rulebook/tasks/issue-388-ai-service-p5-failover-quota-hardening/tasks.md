## 1. Specification

- [x] 1.1 审阅 `openspec/specs/ai-service/spec.md` 与 `ai-service-p5-failover-quota-hardening` delta
- [x] 1.2 完成 Dependency Sync Check（核对 p0/p1/p3/p4：数据结构、IPC 包络、错误码、阈值）
- [x] 1.3 确认 out-of-scope：不做 UI 重设计、不新增 provider 类型

## 2. TDD Mapping（先测前提）

- [x] 2.0 设定门禁：未出现 Red（失败测试）不得进入实现
- [x] 2.1 S1「主备切换与 half-open 探测闭环」→ `apps/desktop/main/src/services/ai/__tests__/provider-failover-half-open.test.ts`
- [x] 2.2 S2「会话预算与速率限制双阈值阻断」→ `apps/desktop/main/src/services/ai/__tests__/quota-rate-limit-guard.test.ts`
- [x] 2.3 S3「全 provider 不可用进入降级态」→ `apps/desktop/tests/integration/ai-provider-unavailable-degrade.test.ts`
- [x] 2.4 S4「降级恢复后审计链路连续」→ `apps/desktop/main/src/services/ai/__tests__/trace-audit-continuity.test.ts`
- [x] 2.5 S5「同会话并发入队遵循单执行上限」→ `apps/desktop/tests/integration/skill-session-queue-limit.test.ts`
- [x] 2.6 S6「会话消息容量超限被阻断且不丢失历史」→ `apps/desktop/tests/integration/ai-chat-capacity-guard.test.ts`

## 3. Red（先写失败测试）

- [x] 3.1 新增并运行 S1/S2 失败测试，记录失败断言
- [x] 3.2 新增并运行 S3/S4 失败测试，记录失败断言
- [x] 3.3 新增并运行 S5/S6 失败测试，记录失败断言
- [x] 3.4 RUN_LOG 落盘 Red 命令和失败输出

## 4. Green（最小实现通过）

- [x] 4.1 实现 provider failover + half-open + trace 审计连续
- [x] 4.2 实现会话预算与速率阈值守卫（错误码固定）
- [x] 4.3 实现全 provider 不可用降级态与恢复路径
- [x] 4.4 实现同会话并发入队上限与聊天容量阻断

## 5. Refactor（保持绿灯）

- [x] 5.1 收敛 provider 健康状态与切换日志抽象
- [x] 5.2 去重预算/限流与容量守卫路径，保持契约不变
- [x] 5.3 回归 AI 相关单测/集成测试保持全绿

## 6. Evidence

- [x] 6.1 新增并维护 `openspec/_ops/task_runs/ISSUE-388.md`
- [x] 6.2 记录 Dependency Sync Check 结论与关键核对项
- [ ] 6.3 记录 preflight/required checks/main 收口/归档证据
