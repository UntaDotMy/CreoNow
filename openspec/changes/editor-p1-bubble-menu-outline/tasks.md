## 1. Specification

- [ ] 1.1 审阅主 spec `editor/spec.md` 中「选中文本浮动工具栏（Bubble Menu）」的全部 Scenario（5 个）
- [ ] 1.2 审阅主 spec `editor/spec.md` 中「大纲视图（Outline View）」的全部 Scenario（4 个）
- [ ] 1.3 审阅 Bubble Menu 的可见性规则、定位逻辑、与固定工具栏共存规则
- [ ] 1.4 审阅 Outline 的交互矩阵（展开/折叠、搜索、拖拽、多选、键盘导航、行内重命名）
- [ ] 1.5 依赖同步检查（Dependency Sync Check）：上游 `editor-p0`；核对 TipTap editor 实例暴露方式、toolbar active 状态 hook

## 2. TDD Mapping（先测前提）

- [ ] 2.0 设定门禁：未出现 Red（失败测试）不得进入实现
- [ ] 2.1 S「Selection triggers Bubble Menu appearance」→ 测试文件
- [ ] 2.2 S「Applying format via Bubble Menu preserves selection」→ 测试文件
- [ ] 2.3 S「Bubble Menu hides when selection is collapsed」→ 测试文件
- [ ] 2.4 S「Bubble Menu suppressed inside Code Block」→ 测试文件
- [ ] 2.5 S「Bubble Menu repositions to avoid window boundary」→ 测试文件
- [ ] 2.6 S「Outline generated from document headings」→ 测试文件
- [ ] 2.7 S「Outline navigation scrolls editor to heading」→ 测试文件
- [ ] 2.8 S「Empty document shows empty state」→ 测试文件
- [ ] 2.9 S「Outline search filters items」→ 测试文件

## 3. Red（先写失败测试）

- [ ] 3.1 编写 Bubble Menu 全部 Scenario 的失败测试
- [ ] 3.2 编写 Outline 全部 Scenario 的失败测试
- [ ] 3.3 记录 Red 失败输出与关键日志至 RUN_LOG

## 4. Green（最小实现通过）

- [ ] 4.1 最小实现 Bubble Menu 组件（可见性、定位、操作集、active 同步）
- [ ] 4.2 最小实现 `deriveOutline()` 与 `OutlinePanel`（提取、显示、导航、高亮）
- [ ] 4.3 最小实现 Outline 交互（展开/折叠、搜索、拖拽、多选、键盘、行内重命名）

## 5. Refactor（保持绿灯）

- [ ] 5.1 抽象 Bubble Menu 按钮为共享 `InlineFormatButton` 组件（与工具栏复用）
- [ ] 5.2 优化 `deriveOutline` 性能（可取消任务，仅保留最新计算）
- [ ] 5.3 全量回归保持绿灯

## 6. Evidence

- [ ] 6.1 记录 RUN_LOG（含 Red 失败证据、Green 通过证据与关键命令输出）
- [ ] 6.2 记录 Dependency Sync Check 的输入、核对结论与后续动作
