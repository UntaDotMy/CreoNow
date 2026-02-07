# Active Changes Execution Order

更新时间：YYYY-MM-DD HH:mm

## 执行策略

- 当前活跃 change 数量为 <N>，采用<串行/并行>执行。

## 执行顺序

1. `<change-1>`
2. `<change-2>`

## 依赖说明

- `<change-2>` 依赖 `<change-1>` 的 <前置输出>。

## 维护规则

- 活跃 change 的范围/依赖/状态变化时，必须同步更新本文件。
