# CreoNow 前端设计决策

> **状态**: 已锁定
> **更新日期**: 2026-01-30
> **来源**: 与创始人的产品讨论 + Variant 设计稿
> **参考设计稿**: `design/Variant/designs/` 目录下的 19 个 HTML 文件

---

## 1. 布局架构

### 1.1 整体布局

```
┌─────────────────────────────────────────────────────────────────────┐
│                        顶部标题栏 (可选，Electron)                    │
├────┬──────────┬─────────────────────────────────┬───────────────────┤
│    │          │                                 │                   │
│ I  │  Left    │         Main Content            │   Right Panel     │
│ c  │  Sidebar │         (Editor)                │   (AI/Info)       │
│ o  │          │                                 │                   │
│ n  │  可拖拽   │                                 │   可拖拽           │
│    │  ←→      │                                 │   ←→              │
│ B  │          │                                 │                   │
│ a  │          ├─────────────────────────────────┤                   │
│ r  │          │         底部状态栏               │                   │
└────┴──────────┴─────────────────────────────────┴───────────────────┘
```

### 1.2 页面类型

| 页面 | 布局 | 设计稿参考 |
|------|------|-----------|
| 登录/注册 | 全屏居中 | `01-login.html` |
| 引导页 | 全屏居中 | `02-onboarding.html` |
| Dashboard | 左侧导航 + 主内容 | `05-dashboard-sidebar-full.html` |
| 编辑器 | 三栏布局（Icon Bar + Sidebar + Main + Panel） | `09-editor-full-ide.html` |
| 禅模式 | 全屏纯编辑 | `07-editor-simple.html` |

### 1.3 禅模式
- **触发**: F11 键
- **效果**: 隐藏所有面板，仅保留编辑区和最小化工具栏
- **退出**: 再次按 F11 或 Esc

---

## 2. 尺寸与布局规范

### 2.1 固定尺寸

| 元素 | 尺寸 | 说明 |
|------|------|------|
| Icon Bar | 48px 宽 | 固定不可调整 |
| 底部状态栏 | 28px 高 | 固定不可调整 |
| 最小窗口宽度 | 1024px | Electron 窗口最小宽度 |
| 最小窗口高度 | 640px | Electron 窗口最小高度 |
| 主内容最小宽度 | 400px | 确保编辑区可用 |

### 2.2 可调整尺寸

| 元素 | 默认 | 最小 | 最大 | 拖拽 |
|------|------|------|------|------|
| 左侧 Sidebar | 240px | 180px | 400px | ✅ 可拖拽 |
| 右侧面板 | 320px | 280px | 480px | ✅ 可拖拽 |

### 2.3 拖拽调整规范

```
拖拽手柄:
- 宽度: 8px（可点击区域）
- 可见宽度: 1px（视觉分割线）
- 悬停时: 显示为 2px 高亮线 + cursor: col-resize
- 拖拽中: 显示实时预览线

行为:
- 双击手柄: 恢复默认宽度
- 拖拽时实时更新布局
- 释放后记住用户偏好（localStorage）
```

### 2.4 面板折叠

| 面板 | 折叠方式 | 快捷键 |
|------|----------|--------|
| 左侧 Sidebar | 点击 Icon Bar 当前图标 | Cmd/Ctrl+B |
| 右侧面板 | 点击折叠按钮 | Cmd/Ctrl+L (AI) |

折叠后:
- 左侧: 仅保留 Icon Bar (48px)
- 右侧: 完全隐藏 (0px)

---

## 3. Design Tokens（完整规范）

### 3.1 颜色系统 - 深色主题

```css
/* 背景层级（从深到浅） */
--color-bg-body: #080808;           /* 最深层背景 */
--color-bg-surface: #0f0f0f;        /* 卡片/面板/输入框背景 */
--color-bg-hover: #1a1a1a;          /* 悬停状态背景 */
--color-bg-active: #1f1f1f;         /* 激活/按下状态背景 */
--color-bg-selected: #222222;       /* 选中项背景 */

/* 文字层级 */
--color-text-primary: #ffffff;      /* 主要文字 */
--color-text-secondary: #888888;    /* 次要文字 */
--color-text-tertiary: #444444;     /* 最弱文字/占位符 */
--color-text-disabled: #333333;     /* 禁用文字 */

/* 边框 */
--color-border-default: #222222;    /* 默认边框 */
--color-border-hover: #333333;      /* 悬停边框 */
--color-border-focus: #444444;      /* 聚焦边框 */
--color-border-active: #888888;     /* 激活边框 */

/* 功能色 */
--color-primary: #ffffff;           /* 主要操作 */
--color-primary-hover: #e0e0e0;     /* 主要操作悬停 */
--color-error: #ff4444;             /* 错误/危险 */
--color-success: #22c55e;           /* 成功 */
--color-warning: #f59e0b;           /* 警告 */
--color-info: #3b82f6;              /* 信息 */

/* 强调色（知识图谱节点等） */
--color-accent-blue: #3b82f6;       /* 角色 */
--color-accent-green: #22c55e;      /* 地点 */
--color-accent-orange: #f97316;     /* 事件 */
--color-accent-cyan: #06b6d4;       /* 物品 */
--color-accent-purple: #8b5cf6;     /* 其他 */
```

### 3.2 颜色系统 - 浅色主题

```css
/* 背景层级（从浅到深） */
--color-bg-body: #ffffff;           /* 最深层背景 */
--color-bg-surface: #f8f8f8;        /* 卡片/面板/输入框背景 */
--color-bg-hover: #f0f0f0;          /* 悬停状态背景 */
--color-bg-active: #e8e8e8;         /* 激活/按下状态背景 */
--color-bg-selected: #e0e0e0;       /* 选中项背景 */

/* 文字层级 */
--color-text-primary: #1a1a1a;      /* 主要文字 */
--color-text-secondary: #666666;    /* 次要文字 */
--color-text-tertiary: #999999;     /* 最弱文字/占位符 */
--color-text-disabled: #cccccc;     /* 禁用文字 */

/* 边框 */
--color-border-default: #e0e0e0;    /* 默认边框 */
--color-border-hover: #d0d0d0;      /* 悬停边框 */
--color-border-focus: #c0c0c0;      /* 聚焦边框 */
--color-border-active: #999999;     /* 激活边框 */

/* 功能色（保持不变或微调） */
--color-primary: #1a1a1a;           /* 主要操作 */
--color-primary-hover: #333333;     /* 主要操作悬停 */
/* 其他功能色同深色主题 */
```

### 3.3 间距系统

```css
--space-0: 0px;
--space-1: 4px;      /* 最小间距 */
--space-2: 8px;      /* 紧凑间距 */
--space-3: 12px;     /* 常用间距 */
--space-4: 16px;     /* 标准间距 */
--space-5: 20px;
--space-6: 24px;     /* 区块间距 */
--space-8: 32px;     /* 大间距 */
--space-10: 40px;
--space-12: 48px;    /* 模块间距 */
--space-16: 64px;
--space-20: 80px;    /* 页面间距 */
```

### 3.4 圆角系统

```css
--radius-none: 0px;
--radius-sm: 4px;        /* 输入框、小按钮 */
--radius-md: 8px;        /* 一般按钮、弹窗 */
--radius-lg: 12px;       /* 对话框 */
--radius-xl: 16px;       /* 大卡片 */
--radius-2xl: 24px;      /* 特大卡片 */
--radius-full: 9999px;   /* 胶囊按钮、头像 */
```

### 3.5 字体系统

```css
/* 字体族 */
--font-family-ui: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-family-body: 'Lora', 'Crimson Pro', Georgia, serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

/* 字号 */
--font-size-xs: 10px;    /* 标签、徽章 */
--font-size-sm: 11px;    /* 辅助文字 */
--font-size-base: 13px;  /* 正文（UI） */
--font-size-md: 14px;    /* 正文（编辑器） */
--font-size-lg: 16px;    /* 小标题 */
--font-size-xl: 18px;    /* 标题 */
--font-size-2xl: 24px;   /* 大标题 */
--font-size-3xl: 32px;   /* 特大标题 */

/* 字重 */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;

/* 行高 */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.6;
--line-height-loose: 1.8;

/* 字间距 */
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em;
--letter-spacing-wider: 0.1em;    /* 大写标签 */
```

### 3.6 阴影系统

```css
/* 深色主题阴影 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.6);

/* 浅色主题阴影 */
--shadow-sm-light: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md-light: 0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-lg-light: 0 8px 16px rgba(0, 0, 0, 0.1);
--shadow-xl-light: 0 16px 32px rgba(0, 0, 0, 0.15);
```

### 3.7 动效系统

```css
/* 缓动曲线 */
--ease-default: cubic-bezier(0.2, 0.0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* 时长 */
--duration-fast: 100ms;      /* 微交互（hover） */
--duration-normal: 200ms;    /* 标准过渡 */
--duration-slow: 300ms;      /* 面板展开/折叠 */
--duration-slower: 500ms;    /* 页面切换 */
```

---

## 4. 组件规范

### 4.1 按钮

| 类型 | 背景 | 文字 | 边框 | 用途 |
|------|------|------|------|------|
| Primary | #ffffff | #080808 | 无 | 主要操作 |
| Secondary | transparent | #ffffff | 1px #222222 | 次要操作 |
| Ghost | transparent | #888888 | 无 | 轻量操作 |
| Danger | transparent | #ff4444 | 1px #ff4444 | 危险操作 |

**尺寸:**
| 尺寸 | 高度 | 内边距 | 字号 |
|------|------|--------|------|
| sm | 28px | 12px 水平 | 12px |
| md | 36px | 16px 水平 | 13px |
| lg | 44px | 20px 水平 | 14px |

**状态:**
- Hover: 背景变化 + translateY(-1px)
- Active: 背景加深 + translateY(0)
- Disabled: opacity: 0.5 + cursor: not-allowed
- Loading: 显示 spinner + 禁用点击

### 4.2 输入框

**基础样式:**
```css
height: 40px;
padding: 0 12px;
background: var(--color-bg-surface);
border: 1px solid var(--color-border-default);
border-radius: var(--radius-sm);
font-size: var(--font-size-base);
color: var(--color-text-primary);
```

**状态:**
- Hover: border-color: var(--color-border-hover)
- Focus: border-color: var(--color-border-focus) + 无 outline
- Error: border-color: var(--color-error) + 底部显示错误文字
- Disabled: opacity: 0.5 + cursor: not-allowed

### 4.3 卡片

```css
background: var(--color-bg-surface);
border: 1px solid var(--color-border-default);
border-radius: var(--radius-xl);  /* 24px */
padding: var(--space-6);          /* 24px */
```

**悬停效果:**
- border-color: var(--color-border-hover)
- 可选: box-shadow 增加

### 4.4 列表项

```css
height: 32px;                     /* 紧凑列表 */
height: 40px;                     /* 标准列表 */
padding: 0 12px;
border-radius: var(--radius-sm);
```

**状态:**
- Hover: background: var(--color-bg-hover)
- Selected: background: var(--color-bg-selected)
- Active (Icon Bar): 左侧 2px 白色指示条

---

## 5. 交互规范

### 5.1 悬停状态

所有可交互元素必须有悬停反馈:
- 背景色变化
- 或边框色变化
- 或文字色变化
- 过渡时长: 100ms

### 5.2 聚焦状态

- 键盘导航时显示明显的聚焦环
- 聚焦环: 2px solid var(--color-border-focus)
- 偏移: outline-offset: 2px

### 5.3 拖拽交互

**文件树拖拽:**
- 拖拽开始: 源项目半透明 (opacity: 0.5)
- 拖拽中: 目标位置显示蓝色指示线
- 放置区域: 目标文件夹背景高亮

**面板宽度拖拽:**
- 手柄悬停: cursor: col-resize + 高亮
- 拖拽中: 实时预览 + 显示当前宽度值

### 5.4 滚动行为

```css
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--color-border-default);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-hover);
}
```

### 5.5 键盘导航

| 按键 | 行为 |
|------|------|
| Tab | 移动焦点到下一个元素 |
| Shift+Tab | 移动焦点到上一个元素 |
| Enter | 激活当前元素 |
| Space | 激活按钮/切换复选框 |
| Escape | 关闭弹窗/取消操作 |
| Arrow Up/Down | 列表中移动选择 |
| Arrow Left/Right | 树形结构展开/折叠 |

---

## 6. 面板配置

### 6.1 左侧 Icon Bar (48px)

按顺序排列:
1. [files] 文件树 (默认)
2. [outline] 大纲
3. [character] 角色
4. [media] 媒体
5. [graph] 知识图谱
6. [settings] 设置 (底部固定)

**图标规格:**
- 尺寸: 24px
- 按钮区域: 40px × 40px
- 激活指示: 左侧 2px 白色条

### 6.2 左侧 Sidebar

- **默认宽度**: 240px
- **可拖拽范围**: 180px - 400px
- **记忆用户偏好**: 是
- **默认展开的面板**: 记住上次使用

### 6.3 右侧面板

- **默认宽度**: 320px（AI 和信息共用同一宽度）
- **可拖拽范围**: 280px - 480px
- **记忆用户偏好**: 是
- **切换方式**: 顶部标签 [AI] [信息]
- **默认显示**: AI 面板

**面板内容:**

**AI 面板:**
- 头部: 标签切换 + 新建对话 + 折叠按钮
- 对话区: 消息列表（用户右对齐，AI 左对齐）
- 底部: 多行输入框 + 发送按钮 + 技能选择

**信息面板:**
- 文档统计: 字数、阅读时间、创建/修改时间
- 版本历史: 最近版本列表
- 相关角色: 当前文档中的角色
- 批注: 文档批注列表

---

## 7. 快捷键规范

### 7.1 全局快捷键

| 功能 | Mac | Windows | 说明 |
|------|-----|---------|------|
| 命令面板 | Cmd+P | Ctrl+P | 搜索文件和命令 |
| AI 面板 | Cmd+L | Ctrl+L | 打开/关闭 AI 面板 |
| 左侧边栏 | Cmd+B | Ctrl+B | 折叠/展开左侧边栏 |
| 禅模式 | F11 | F11 | 全屏专注写作 |
| 设置 | Cmd+, | Ctrl+, | 打开设置 |
| 新建文件 | Cmd+N | Ctrl+N | 新建文件 |
| 新建项目 | Cmd+Shift+N | Ctrl+Shift+N | 新建项目 |
| 保存 | Cmd+S | Ctrl+S | 手动保存 |

### 7.2 编辑器快捷键

| 功能 | Mac | Windows |
|------|-----|---------|
| 当前搜索 | Cmd+F | Ctrl+F |
| 全局搜索 | Cmd+Shift+F | Ctrl+Shift+F |
| 加粗 | Cmd+B | Ctrl+B |
| 斜体 | Cmd+I | Ctrl+I |
| 撤销 | Cmd+Z | Ctrl+Z |
| 重做 | Cmd+Shift+Z | Ctrl+Y |
| 标题 1 | Cmd+1 | Ctrl+1 |
| 标题 2 | Cmd+2 | Ctrl+2 |
| 标题 3 | Cmd+3 | Ctrl+3 |

---

## 8. 状态显示

### 8.1 空状态

| 场景 | 显示内容 | 操作 |
|------|----------|------|
| 空项目 | 插图 + "开始创建你的第一个文件" | 新建文件按钮 |
| 空文件树 | 插图 + "暂无文件" | 新建文件按钮 |
| 空搜索结果 | 插图 + "未找到匹配结果" | 修改关键词建议 |
| 空角色列表 | 插图 + "暂无角色" | 创建角色按钮 |

### 8.2 加载状态

- **顶部进度条**: 2px 高，窗口最顶部，动画滚动
- **内容骨架屏**: 使用灰色占位块模拟内容形状
- **按钮 Loading**: 显示 spinner，禁用点击

### 8.3 错误状态

- **内联错误**: 输入框下方红色文字
- **Toast 通知**: 右上角短暂显示
- **错误对话框**: 严重错误，需用户确认

---

## 9. 文件系统

### 9.1 文件类型

| 类型 | 图标 | 扩展名 | 说明 |
|------|------|--------|------|
| 章节 | file | .md | 小说主体内容 |
| 角色 | user | .character.md | 角色卡片 |
| 笔记 | note | .note.md | 随手记录 |
| 世界观 | globe | .world.md | 设定/地点/物品 |
| 大纲 | list | .outline.md | 结构规划 |
| 资料 | book | .ref.md | 参考材料 |

### 9.2 保存行为

- **自动保存**: 停止输入 2 秒后自动保存
- **保存状态显示**: 底部状态栏 "已保存" / "保存中..."
- **手动保存**: Cmd/Ctrl+S

### 9.3 版本历史

- **自动快照**: 每次自动保存创建（保留最近 100 个）
- **手动版本**: 用户可标记重要版本，添加描述
- **差异对比**: 左右分栏，红色删除/绿色新增

### 9.4 导出

支持格式: Word (.docx)、PDF、Markdown (.md)、纯文本 (.txt)、电子书 (.epub)

---

## 10. 功能深度

### 10.1 AI 面板

**完整功能包含:**
- 多轮对话（支持上下文）
- 代码块渲染（语法高亮 + 复制 + 应用）
- 一键应用到编辑器（插入/替换）
- 技能选择器（写作助手/续写/润色/翻译等）
- 上下文管理（选择哪些内容发给 AI）
- 流式输出（打字机效果）

### 10.2 知识图谱

**完整功能包含:**
- 自定义节点类型（角色/地点/事件/物品/自定义）
- 节点颜色区分
- 自由编辑关系（拖拽连线）
- 关系标签（类型 + 描述）
- 可视化网络（力导向布局）
- 筛选器（按类型过滤）
- 缩放和平移
- 点击节点跳转详情

### 10.3 角色管理

**完整功能包含:**
- 详细角色卡片（姓名/年龄/身份/外貌/性格）
- 头像（上传或 AI 生成）
- 性格标签
- 角色关系（与其他角色）
- 出场统计（出现在哪些章节）
- 关系图可视化
- 时间线（角色事件）

---

## 11. 设计稿清单

### 已有设计稿（深色主题，19个）

| 编号 | 文件名 | 用途 | 状态 |
|------|--------|------|------|
| 01 | 01-login.html | 登录页 | ✅ 采用 |
| 02 | 02-onboarding.html | 引导页 | ✅ 采用 |
| 03 | 03-dashboard-bento-cards.html | Dashboard 大卡片 | ⏸ 备选 |
| 04 | 04-dashboard-list-progress.html | Dashboard 列表 | ⏸ 备选 |
| 05 | 05-dashboard-sidebar-full.html | Dashboard 侧边栏 | ✅ 采用 |
| 06 | 06-dashboard-sidebar-dark.html | Dashboard 深色 | ⏸ 备选 |
| 07 | 07-editor-simple.html | 禅模式参考 | ✅ 参考 |
| 08 | 08-editor-workspace.html | 编辑器工作区 | ⏸ 备选 |
| 09 | 09-editor-full-ide.html | 编辑器完整版 | ✅ 采用 |
| 10 | 10-settings.html | 设置页 | ✅ 采用 |
| 11 | 11-analytics.html | 数据分析 | ✅ 采用 |
| 12 | 12-sidebar-filetree.html | 文件树 | ✅ 采用 |
| 13 | 13-sidebar-outline.html | 大纲视图 | ✅ 采用 |
| 14 | 14-ai-panel.html | AI 面板 | ✅ 采用 |
| 15 | 15-info-panel.html | 信息面板 | ✅ 采用 |
| 16 | 16-create-project-dialog.html | 创建项目 | ✅ 采用 |
| 17 | 17-command-palette.html | 命令面板 | ✅ 采用 |
| 18 | 18-character-manager.html | 角色管理 | ✅ 采用 |
| 19 | 19-knowledge-graph.html | 知识图谱 | ✅ 采用 |

### 待补充设计稿

**浅色主题（P0）:** 所有现有设计稿的浅色版本（见 `LIGHT_THEME_PROMPTS.md`）

**缺失状态（P1）:**
- 禅模式界面
- 空状态（空项目、空文件树、空搜索）
- 加载状态（顶部进度条、骨架屏）
- 错误对话框
- 模板选择对话框
- 版本对比视图
- 导出对话框

**缺失交互（P2）:**
- 选中文字浮动工具栏
- 选中文字 AI 按钮
- 拖拽调整宽度指示器
- 右键菜单

---

## 12. 技术栈锁定

| 类别 | 选型 | 版本 |
|------|------|------|
| 框架 | React | 18.x |
| 语言 | TypeScript | 5.x |
| 构建 | Vite | 6.x |
| 样式 | Tailwind CSS + CSS Variables | 4.x |
| 组件原语 | Radix UI | latest |
| 富文本编辑器 | TipTap | 2.x |
| 路由 | React Router | 6.x |
| 状态管理 | Zustand | 4.x |
| Electron | electron-vite | latest |

---

## 附录: 如何使用本文档

### 开发时参考顺序

1. **布局**: 第 1-2 节
2. **样式**: 第 3 节 Design Tokens
3. **组件**: 第 4 节 + 对应设计稿 HTML
4. **交互**: 第 5 节
5. **具体功能**: 第 6-10 节

### 设计稿使用方式

1. 在浏览器中打开 `design/Variant/designs/XX-name.html`
2. 使用开发者工具检查具体样式
3. 提取颜色、间距、字体等到代码中
4. 遵循本文档的 Design Tokens 变量命名
