# Editor Specification

## Purpose

基于 TipTap 2 的富文本编辑器集成，覆盖创作场景下的文本编辑、格式化、AI 协作交互、文档大纲、Diff 对比和禅模式。

### Scope

| Layer    | Path                                                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | `renderer/src/features/editor/`, `renderer/src/features/outline/`, `renderer/src/features/diff/`, `renderer/src/features/zen-mode/` |
| Store    | `renderer/src/stores/editorStore.tsx`                                                                                               |

## Requirements

### Requirement: 富文本编辑器基础排版

The system SHALL provide a WYSIWYG rich text editor based on TipTap 2, with bottom storage format as TipTap JSON (users need not be aware of this). The editor SHALL support the following formatting capabilities via toolbar buttons and keyboard shortcuts:

- **Inline marks**: Bold, Italic, Underline, Strikethrough, Inline Code
- **Block nodes**: Heading (H1–H3), Bullet List, Ordered List, Blockquote, Code Block, Horizontal Rule
- **History**: Undo, Redo

The editor SHALL use `@tiptap/starter-kit` as the base extension bundle. Underline SHALL be provided via the `@tiptap/extension-underline` extension (not included in StarterKit). Additional extensions MAY be added as separate TipTap extensions when needed.

The editor body text SHALL use the `--font-family-body` font family at `--text-editor-size` (16px) with `--text-editor-line-height` (1.8), as defined in `design/system/01-tokens.css`.

#### Scenario: User applies heading format via toolbar

- **GIVEN** the cursor is positioned within a paragraph of text
- **WHEN** the user clicks the H1 toolbar button
- **THEN** the paragraph is converted to an H1 heading node
- **AND** the H1 toolbar button enters the active state (`bg-[var(--color-bg-selected)]`)
- **AND** the change is reflected immediately in the editor

#### Scenario: User toggles bold via keyboard shortcut

- **GIVEN** the user has selected a range of text
- **WHEN** the user presses `Cmd/Ctrl+B`
- **THEN** the selected text is wrapped in a bold mark
- **AND** pressing `Cmd/Ctrl+B` again removes the bold mark (toggle behavior)

#### Scenario: Unsupported paste content graceful handling

- **GIVEN** the user copies content from an external source containing unsupported formatting (e.g., font color, background highlight, embedded objects)
- **WHEN** the user pastes into the editor
- **THEN** the system strips unsupported formatting and preserves plain text structure (paragraphs, line breaks)
- **AND** supported formatting (bold, italic, lists, headings) from the source is preserved where possible
- **AND** no error is thrown

---

### Requirement: 编辑器工具栏

The system SHALL render an `EditorToolbar` component above the editor content area. The toolbar SHALL expose buttons for all supported formatting operations grouped by category:

1. **Text formatting**: Bold, Italic, Strikethrough, Inline Code
2. **Headings**: H1, H2, H3
3. **Lists**: Bullet List, Ordered List
4. **Blocks**: Blockquote, Code Block, Horizontal Rule
5. **History**: Undo, Redo

Each toolbar button SHALL:

- Display an `aria-label` and a tooltip showing the action name and keyboard shortcut (if any)
- Reflect the current active state of the formatting at the cursor position (`aria-pressed`)
- Be disabled when the action is not applicable (e.g., Undo when history is empty)

Groups SHALL be separated by a visual `ToolbarSeparator` (1px vertical line using `--color-border-default`).

The toolbar background SHALL use `--color-bg-surface` with a bottom border using `--color-border-default`.

#### Scenario: Toolbar reflects active formatting state

- **GIVEN** the cursor is inside a bold, H2 heading
- **WHEN** the toolbar renders
- **THEN** the Bold button and H2 button both show active state
- **AND** all other formatting buttons show default (inactive) state

#### Scenario: Undo button disabled when no history

- **GIVEN** a fresh document with no edits
- **WHEN** the toolbar renders
- **THEN** the Undo button is disabled (`cursor-not-allowed`, `opacity: 0.4`)
- **AND** clicking the Undo button has no effect

---

### Requirement: 选中文本浮动工具栏（Floating Toolbar / Bubble Menu）

The system SHALL provide a floating toolbar (Bubble Menu) that appears above the user's text selection, offering quick access to inline formatting operations. The implementation SHALL use TipTap's `@tiptap/extension-bubble-menu` extension.

**Visibility rules:**

- The Bubble Menu SHALL appear only when the user has an active text selection (non-empty range)
- The Bubble Menu SHALL NOT appear when the cursor has no selection (collapsed cursor)
- The Bubble Menu SHALL NOT appear when the selection is inside a Code Block node (code blocks do not support inline formatting)
- The Bubble Menu SHALL NOT appear when the editor is in read-only mode

**Positioning:**

- The Bubble Menu SHALL be positioned above the selection by default
- The Bubble Menu SHALL automatically reposition to below the selection when there is insufficient space above (window boundary avoidance)
- The Bubble Menu SHALL follow the selection as the user adjusts it (e.g., Shift+Arrow)

**Actions:**

- The Bubble Menu SHALL contain a subset of inline formatting actions: Bold, Italic, Underline, Strikethrough, Inline Code, Link
- The Bubble Menu SHALL NOT contain block-level actions (Headings, Lists, Blockquote, etc.) — those remain exclusive to the fixed `EditorToolbar`
- Each button SHALL reflect the current active state of the mark at the selection (same as `EditorToolbar` behavior)

**Coexistence:**

- The Bubble Menu and the fixed `EditorToolbar` SHALL coexist without conflict — both may be visible simultaneously
- Applying a format via the Bubble Menu SHALL update the `EditorToolbar` active state, and vice versa

**Styling:**

- The Bubble Menu container SHALL use `--color-bg-raised` background, `--shadow-lg` for elevation, `--radius-md` for border radius, and `--color-border-default` for border
- Buttons SHALL use the same sizing and icon style as `EditorToolbar` buttons
- The Bubble Menu SHALL render at `z-index: var(--z-dropdown)` to float above the editor content

**Storybook:**

- The Bubble Menu component SHALL have a Storybook story covering: visible state with selection, active formatting state, and hidden state (per §13.2)

#### Scenario: Selection triggers Bubble Menu appearance

- **GIVEN** the editor is in normal editing mode with content
- **WHEN** the user selects a range of text by click-dragging
- **THEN** the Bubble Menu appears above the selection within 100ms
- **AND** the menu contains buttons for Bold, Italic, Underline, Strikethrough, Inline Code, and Link

#### Scenario: Applying format via Bubble Menu preserves selection

- **GIVEN** the Bubble Menu is visible with a text selection
- **WHEN** the user clicks the Bold button on the Bubble Menu
- **THEN** the selected text is wrapped in a bold mark
- **AND** the selection remains active (not collapsed)
- **AND** the Bubble Menu remains visible
- **AND** the Bold button on both the Bubble Menu and the fixed `EditorToolbar` shows active state

#### Scenario: Bubble Menu hides when selection is collapsed

- **GIVEN** the Bubble Menu is visible with a text selection
- **WHEN** the user clicks elsewhere in the editor (collapsing the selection)
- **THEN** the Bubble Menu disappears
- **AND** no formatting action is applied

#### Scenario: Bubble Menu suppressed inside Code Block

- **GIVEN** the document contains a code block with content
- **WHEN** the user selects text inside the code block
- **THEN** the Bubble Menu does NOT appear
- **AND** the fixed `EditorToolbar` inline formatting buttons are disabled for the code block context

#### Scenario: Bubble Menu repositions to avoid window boundary

- **GIVEN** the user selects text in the first line of the editor (near the top edge)
- **WHEN** there is insufficient space above the selection to render the Bubble Menu
- **THEN** the Bubble Menu renders below the selection instead
- **AND** no part of the Bubble Menu is clipped by the window boundary

---

### Requirement: 选中内容自动引用到 AI 对话输入框

The system SHALL automatically capture the user's editor text selection and present it as a contextual reference in the AI panel's input area. This enables the user to direct AI operations at specific content without manual copy-paste.

**Capture behavior:**

- When the user selects text in the editor, the system SHALL capture the selection text and its positional reference (`SelectionRef` with `range` and `selectionTextHash`) via `captureSelectionRef()`
- The captured selection SHALL be stored in `aiStore` as `selectionText` and `selectionRef`
- If the user selects new text while an existing reference exists, the reference SHALL be automatically replaced with the new selection

**Reference card display:**

- When `selectionText` is non-empty in `aiStore`, a reference card SHALL be displayed above the AI input textarea
- The reference card SHALL show a truncated preview of the selected text (max 120 characters, with "..." suffix if truncated)
- The reference card SHALL display with `--color-bg-raised` background, `--color-border-default` border, and `--radius-sm` border radius
- The reference card SHALL include a close button (×) to manually dismiss the reference
- The reference card SHALL display a label indicating the source (e.g., "Selection from editor")

**Sticky behavior:**

- Once captured, the reference SHALL persist (sticky) even if the user collapses the editor selection — it SHALL NOT auto-dismiss on selection collapse
- The reference SHALL be cleared only when:
  1. The user clicks the close button on the reference card
  2. The user sends an AI request (the reference is consumed and cleared after sending)
  3. The user starts a new chat via the "New Chat" button
  4. The user selects new text (the old reference is replaced)

**AI request integration:**

- When the user sends an AI request with an active reference, the `selectionText` and `selectionRef` SHALL be passed to the AI skill/service as `context`
- After the AI response is received and produces a proposal, the `selectionRef` SHALL be used for conflict detection during `applySelection()` — if the referenced content has changed since capture, the apply SHALL fail with `CONFLICT` error
- After sending a request, the reference card SHALL be cleared from the input area (the reference is now part of the conversation context)

**Edge cases:**

- If the editor has no document loaded (`bootstrapStatus !== "ready"`), selection capture SHALL be disabled
- If the selected text is empty (e.g., user selected whitespace only), no reference card SHALL appear

#### Scenario: Selection creates reference card in AI panel

- **GIVEN** the AI panel is open and the editor has content
- **WHEN** the user selects a paragraph of text in the editor
- **THEN** a reference card appears above the AI input textarea
- **AND** the card shows a truncated preview of the selected text
- **AND** the card has a close (×) button

#### Scenario: User manually dismisses reference

- **GIVEN** a reference card is displayed in the AI panel
- **WHEN** the user clicks the close (×) button on the reference card
- **THEN** the reference card disappears
- **AND** `selectionText` and `selectionRef` in `aiStore` are cleared to `null`
- **AND** the AI input textarea remains unchanged

#### Scenario: Sending AI request with reference

- **GIVEN** a reference card is displayed and the user has typed a prompt (e.g., "润色这段话")
- **WHEN** the user presses Enter to send the request
- **THEN** the AI skill receives the `selectionText` as context along with the prompt
- **AND** the reference card is cleared from the input area
- **AND** the AI response is generated based on both the prompt and the referenced content

#### Scenario: New selection replaces existing reference

- **GIVEN** a reference card is displayed showing "第一章的开头..."
- **WHEN** the user selects a different paragraph in the editor
- **THEN** the reference card updates to show the newly selected text
- **AND** the old `selectionRef` is replaced with the new selection's reference

#### Scenario: No reference card when no selection exists

- **GIVEN** the AI panel is open and no text is selected in the editor
- **WHEN** `selectionText` in `aiStore` is `null` or empty
- **THEN** no reference card is displayed above the AI input textarea
- **AND** the AI input area renders normally without the card

---

### Requirement: 自动保存

The system SHALL automatically save editor content to the database via IPC after content changes, with the following behavior:

- Autosave SHALL be debounced with a 500ms delay after the last `update` event from TipTap
- Autosave SHALL use `actor: "auto"` and `reason: "autosave"` when invoking the save IPC channel (`file:document:save`)
- The autosave state machine SHALL track four states: `idle` → `saving` → `saved` | `error`
- On component unmount, if there is a pending (queued but unsent) change, the system SHALL flush it immediately
- Autosave SHALL be suppressed during programmatic content replacement (e.g., loading a document) via a `suppressRef` flag to avoid saving stale content
- Manual save (via `Cmd/Ctrl+S`) SHALL use `actor: "user"` and `reason: "manual-save"`

#### Scenario: Content change triggers debounced autosave

- **GIVEN** autosave is enabled and a document is loaded
- **WHEN** the user types a character
- **THEN** the autosave status transitions to `saving`
- **AND** after 500ms of inactivity, the system invokes the IPC save channel
- **AND** on successful response, the status transitions to `saved`

#### Scenario: Autosave failure with retry

- **GIVEN** autosave is enabled and a document is loaded
- **WHEN** the IPC save call returns an error
- **THEN** the autosave status transitions to `error`
- **AND** the error details are stored in `autosaveError`
- **AND** the user can trigger `retryLastAutosave()` to re-attempt the save

#### Scenario: Autosave suppressed during document load

- **GIVEN** the editor is loading a new document's content via `setContent()`
- **WHEN** the `suppressRef` is set to `true` before `setContent` and reset after
- **THEN** no autosave is triggered by the content replacement
- **AND** subsequent user edits trigger autosave normally

---

### Requirement: 文档加载与持久化（IPC）

The system SHALL load and persist document content through typed IPC channels following the Schema-first principle (意图定义书 §12.2). The editor domain IPC channels SHALL include:

| Channel                    | Mode             | Direction       | Purpose                                   |
| -------------------------- | ---------------- | --------------- | ----------------------------------------- |
| `file:document:getCurrent` | Request-Response | Renderer → Main | Get the current document ID for a project |
| `file:document:list`       | Request-Response | Renderer → Main | List all documents in a project           |
| `file:document:create`     | Request-Response | Renderer → Main | Create a new document                     |
| `file:document:read`       | Request-Response | Renderer → Main | Read document content (TipTap JSON)       |
| `file:document:save`       | Request-Response | Renderer → Main | Save document content                     |

All IPC calls SHALL go through the typed `invoke` function exposed via `contextBridge`. The editor store (`editorStore`) SHALL orchestrate the bootstrap sequence:

1. `bootstrapForProject(projectId)` → get current document → fallback to first document → fallback to create new document → load content
2. `openDocument({ projectId, documentId })` → read document content → set editor content

#### Scenario: Bootstrap loads existing project with current document

- **GIVEN** a project has been opened and has a current document set
- **WHEN** `bootstrapForProject(projectId)` is called
- **THEN** the store invokes `file:document:getCurrent` to get the document ID
- **AND** invokes `file:document:read` to load the content
- **AND** sets `bootstrapStatus` to `ready`

#### Scenario: Bootstrap creates document when project is empty

- **GIVEN** a project has no documents
- **WHEN** `bootstrapForProject(projectId)` is called
- **THEN** `file:document:getCurrent` returns `NOT_FOUND`
- **AND** `file:document:list` returns an empty list
- **AND** the store invokes `file:document:create` to create a default document
- **AND** the new document is loaded and `bootstrapStatus` is set to `ready`

#### Scenario: Bootstrap handles IPC failure

- **GIVEN** the main process is unreachable or returns an error
- **WHEN** `bootstrapForProject(projectId)` is called
- **THEN** `bootstrapStatus` transitions to `error`
- **AND** no document content is loaded
- **AND** the error is surfaced to the UI (not swallowed silently)

---

### Requirement: AI 协作 Inline Diff

The system SHALL display AI modification results directly within the editor area using an inline diff experience, similar to mainstream IDE/CLI diff patterns. This requirement covers the presentation of AI-generated changes before user acceptance.

- AI modifications SHALL be rendered via the `UnifiedDiffView` component (or `SplitDiffView` when the user selects split mode)
- Deleted content SHALL be displayed with a red-tinted background (`--color-error-subtle`) and red text with strikethrough
- Added content SHALL be displayed with a green-tinted background (`--color-success-subtle`) and green text
- The system SHALL display statistics: number of added lines and removed lines (via `DiffStats`)
- The original document content SHALL NOT be overwritten until the user explicitly confirms the changes
- The user SHALL be able to accept or reject AI modifications **per change hunk** (逐条接受或拒绝), not only as a bulk operation
- The user SHALL also be able to accept all or reject all changes at once via the DiffFooter action buttons
- The user SHALL be able to navigate between changes using Previous/Next controls, with the current change highlighted by an accent ring (`--color-accent`)

#### Scenario: AI suggestion displayed as inline diff

- **GIVEN** the user has triggered an AI skill (e.g., "润色") on a selected paragraph
- **WHEN** the AI returns a modified version of the text
- **THEN** the system enters compare mode (`compareMode: true` in `editorStore`)
- **AND** displays a `DiffViewPanel` showing the unified diff between the original and AI-modified text
- **AND** the diff header shows version selectors and navigation controls
- **AND** the diff footer shows statistics (e.g., "+12 lines, −3 lines")

#### Scenario: User rejects AI suggestion

- **GIVEN** the DiffViewPanel is displaying an AI suggestion
- **WHEN** the user clicks the Close button in the DiffViewPanel
- **THEN** the system exits compare mode (`compareMode: false`)
- **AND** the original document content is preserved unchanged
- **AND** the editor returns to normal editing mode

#### Scenario: User accepts AI suggestion in bulk

- **GIVEN** the DiffViewPanel is displaying an AI suggestion with multiple change hunks
- **WHEN** the user clicks the "Accept All" button in the DiffFooter
- **THEN** all AI-modified content replaces the relevant portions of the document
- **AND** the change is saved as a new version (via autosave with `actor: "auto"`)
- **AND** the system exits compare mode

#### Scenario: User selectively accepts individual change hunks

- **GIVEN** the DiffViewPanel is displaying an AI suggestion with 3 change hunks
- **WHEN** the user accepts hunk 1 and hunk 3, but rejects hunk 2
- **THEN** only the accepted hunks are applied to the document
- **AND** the rejected hunk's original content is preserved
- **AND** the resulting document reflects the partial merge

---

### Requirement: Diff 对比模式（多版本）

The system SHALL support comparing document versions in a dedicated diff view, with up to 4 versions displayed simultaneously.

- Two-version comparison SHALL use the `DiffViewPanel` with unified or split view modes
- Multi-version comparison (3–4 versions) SHALL use the `MultiVersionCompare` component, displaying each version in its own pane arranged in a 2×2 grid
- When 3 versions are compared, the last pane SHALL span two columns
- Sync scroll SHALL be supported: when enabled, scrolling one pane scrolls all panes to the same position
- Each version pane SHALL display a label (e.g., "Version from 2h ago", "Current Version") and a type indicator (`manual` | `auto` | `current`)
- Diff coloring SHALL use semantic tokens only: `--color-error` / `--color-error-subtle` for removals, `--color-success` / `--color-success-subtle` for additions — no raw color values in component code

#### Scenario: Two-version comparison with navigation

- **GIVEN** the user has selected "Compare with version" from the version history
- **WHEN** the DiffViewPanel renders with the selected version and the current version
- **THEN** the header displays version selectors for "before" and "after"
- **AND** the navigation shows "Change 1 of N" with Previous/Next buttons
- **AND** clicking Next scrolls to and highlights the next change hunk

#### Scenario: Four-version simultaneous comparison

- **GIVEN** the user has selected 4 versions for comparison
- **WHEN** the `MultiVersionCompare` renders
- **THEN** 4 panes are displayed in a 2×2 grid layout
- **AND** each pane shows the version label and content
- **AND** with `syncScroll` enabled, scrolling one pane synchronizes all others

#### Scenario: Empty diff when versions are identical

- **GIVEN** the user compares two identical versions
- **WHEN** the DiffViewPanel renders
- **THEN** the diff area displays "No changes to display"
- **AND** statistics show "+0 lines, −0 lines"

---

### Requirement: 禅模式（Zen Mode）

The system SHALL provide a fullscreen (application-internal, not OS-level) distraction-free writing mode called 禅模式 (Zen Mode). In Zen Mode:

- ALL UI elements SHALL be hidden: sidebar, right panel, toolbar, status bar
- The writing area SHALL be centered with a max-width of 720px and generous padding (120px vertical, 80px horizontal)
- The background SHALL be a near-black color (`#050505`) with a subtle radial gradient glow
- The document title SHALL be displayed at 48px font size using `--font-family-body`
- Body text SHALL use 18px font size with 1.8 line height using `--font-family-body`
- A blinking cursor SHALL be displayed at the end of the last paragraph when `showCursor` is enabled
- NO AI assistance is available in Zen Mode — the purpose is pure manual writing immersion

**Entry/Exit:**

- The user SHALL enter Zen Mode by pressing **F11** (as defined in `DESIGN_DECISIONS.md` §1.3)
- The user SHALL exit Zen Mode by pressing **Escape** or **F11** again
- A subtle exit hint ("Press Esc or F11 to exit") SHALL always be visible at the top-right
- On hover at the top area, a more prominent exit button SHALL appear with a close icon

**Status bar:**

- A bottom hover-triggered status bar SHALL display: word count, save status, read time (minutes), and current time

#### Scenario: User enters and exits Zen Mode

- **GIVEN** the user is editing a document in normal mode
- **WHEN** the user presses F11
- **THEN** a fullscreen overlay renders at `z-index: var(--z-modal)` covering the entire application
- **AND** only the document title and body text are visible, centered on screen
- **AND** pressing Escape closes the overlay and returns to normal editing mode

#### Scenario: Zen Mode hides all distractions

- **GIVEN** Zen Mode is active
- **WHEN** the user looks at the screen
- **THEN** the sidebar, right panel (AI/Info), editor toolbar, and main status bar are not visible
- **AND** hovering over the bottom edge reveals word count, save status, and read time
- **AND** hovering over the top edge reveals the exit button

#### Scenario: Zen Mode with empty document

- **GIVEN** the current document has no content (empty paragraphs)
- **WHEN** the user enters Zen Mode
- **THEN** the title is displayed (or a placeholder if no title)
- **AND** the body area is empty with a blinking cursor
- **AND** the word count shows 0

---

### Requirement: 大纲视图（Outline View）

The system SHALL provide an outline view as an accessory feature of the editor (not a standalone module). The outline SHALL be derived from headings in the current document.

- The `deriveOutline()` function SHALL extract all H1–H3 heading nodes from the TipTap document JSON and return a flat array of `OutlineItem` objects with stable IDs
- H4–H6 headings SHALL be ignored in the outline
- Empty headings SHALL display the text "(untitled heading)"
- The outline SHALL be displayed in the `OutlinePanel` component in the left sidebar (under the "outline" Icon Bar entry)

**Display:**

- H1 items SHALL be displayed at 14px, font-weight 600, using `--color-fg-default`, with a document icon
- H2 items SHALL be indented (32px) at 13px, font-weight 400
- H3 items SHALL be further indented (48px) at 12px, font-weight 400, using `--color-fg-muted`

**Navigation:**

- Clicking an outline item SHALL scroll the editor to the corresponding heading position (via `findHeadingPosition()`)
- The currently active heading (based on cursor position) SHALL be highlighted with a left accent bar (`--color-accent`)
- `findActiveOutlineItem()` SHALL determine the active item by finding the last heading before the cursor position

**Interaction:**

- The outline SHALL support expand/collapse of sections (H1 can collapse its H2/H3 children)
- The outline SHALL support search/filter by heading text
- The outline SHALL support drag-and-drop reordering with before/after/into drop positions
- The outline SHALL support multi-select via Ctrl/Cmd+Click and Shift+Click for batch operations
- The outline SHALL support keyboard navigation: Arrow keys (up/down/expand/collapse), Enter (navigate), F2 (rename), Delete (remove), Escape (clear selection)
- Inline rename SHALL be triggered by double-click or F2, committed by Enter or blur, cancelled by Escape

**Storybook:**

- The `OutlinePanel` component SHALL have a Storybook story covering: default state, empty state, search/filter state, drag-and-drop state, and multi-select state (per §13.2 of the UI architecture规范)

#### Scenario: Outline generated from document headings

- **GIVEN** a document contains: H1 "第一章", H2 "场景一", H3 "对话", H2 "场景二"
- **WHEN** `deriveOutline(doc)` is called
- **THEN** it returns 4 `OutlineItem` objects with levels `h1`, `h2`, `h3`, `h2` respectively
- **AND** each item has a stable ID derived from level, position, and title hash

#### Scenario: Outline navigation scrolls editor to heading

- **GIVEN** the outline panel displays items for a long document
- **WHEN** the user clicks on the "场景二" outline item
- **THEN** the editor scrolls to bring the "场景二" heading into view
- **AND** the "场景二" item shows the active indicator (left accent bar)

#### Scenario: Empty document shows empty state

- **GIVEN** the document contains no headings (only paragraphs)
- **WHEN** the outline panel renders
- **THEN** the empty state is displayed: an icon and the text "No outline yet. Headings appear here automatically."

#### Scenario: Outline search filters items

- **GIVEN** the outline has 10 items
- **WHEN** the user types "场景" in the search input
- **THEN** only items whose title contains "场景" are displayed
- **AND** clearing the search restores all items

---

### Requirement: 编辑器键盘快捷键

The system SHALL support the following keyboard shortcuts in the editor, consistent with `DESIGN_DECISIONS.md` §10.2:

| Action        | macOS         | Windows/Linux  |
| ------------- | ------------- | -------------- |
| Bold          | `Cmd+B`       | `Ctrl+B`       |
| Italic        | `Cmd+I`       | `Ctrl+I`       |
| Strikethrough | `Cmd+Shift+X` | `Ctrl+Shift+X` |
| Heading 1     | `Cmd+1`       | `Ctrl+1`       |
| Heading 2     | `Cmd+2`       | `Ctrl+2`       |
| Heading 3     | `Cmd+3`       | `Ctrl+3`       |
| Undo          | `Cmd+Z`       | `Ctrl+Z`       |
| Redo          | `Cmd+Shift+Z` | `Ctrl+Y`       |
| Save          | `Cmd+S`       | `Ctrl+S`       |
| Find in doc   | `Cmd+F`       | `Ctrl+F`       |
| Zen Mode      | `F11`         | `F11`          |

`Cmd/Ctrl+B` SHALL be reserved for Bold — sidebar toggle uses `Cmd/Ctrl+\` to avoid conflict.

#### Scenario: Platform-appropriate shortcut displayed in tooltip

- **GIVEN** the user is on macOS
- **WHEN** the user hovers over the Bold toolbar button
- **THEN** the tooltip displays "Bold (⌘B)"

#### Scenario: Shortcut triggers correct action regardless of focus

- **GIVEN** the editor has focus
- **WHEN** the user presses `Cmd/Ctrl+S`
- **THEN** a manual save is triggered with `actor: "user"` and `reason: "manual-save"`
- **AND** the autosave timer is not affected

---

### Requirement: 编辑器无障碍性（Accessibility）

The editor and its sub-components SHALL meet basic accessibility requirements:

- All toolbar buttons SHALL have `aria-label` attributes describing the action
- Toggle buttons (Bold, Italic, etc.) SHALL use `aria-pressed` to indicate active state
- The outline panel SHALL use `role="tree"` and items SHALL use `role="treeitem"` with `aria-selected` and `aria-expanded` attributes
- Keyboard navigation SHALL follow `DESIGN_DECISIONS.md` §7.5: Tab for focus movement, Arrow keys for list navigation, Enter for activation, Escape for dismissal
- Focus rings SHALL use `--color-ring-focus` with `--ring-focus-width` (2px) and `--ring-focus-offset` (2px), displayed only on `:focus-visible`

#### Scenario: Keyboard-only user navigates toolbar

- **GIVEN** the user is navigating with keyboard only
- **WHEN** the user Tabs into the toolbar and presses Enter on the Bold button
- **THEN** the Bold formatting is toggled
- **AND** the Bold button shows a visible focus ring

#### Scenario: Screen reader announces toolbar button state

- **GIVEN** a screen reader is active
- **WHEN** focus lands on the Bold button which is currently active
- **THEN** the screen reader announces "Bold, pressed" (or equivalent)

---

### Requirement: 模块级可验收标准（适用于本模块全部 Requirement）

- 量化阈值：
  - 键入到渲染延迟 p95 < 16ms（60fps）
  - 自动保存提交延迟 p95 < 500ms（去抖后）
  - Diff 面板打开延迟 p95 < 200ms
- 边界与类型安全：
  - `TypeScript strict` + zod
  - 编辑器状态机必须显式区分 `ready/saving/error/compare/zen`
- 失败处理策略：
  - 自动保存失败必须可见并可重试
  - 文档加载失败进入 error state，不可静默
  - AI 应用冲突返回 `CONFLICT` 并保留原文
- Owner 决策边界：
  - 快捷键主绑定、Zen Mode 入口、Diff 接受语义由 Owner 固定
  - Agent 不得更改核心快捷键冲突优先级

#### Scenario: 编辑性能达标

- **假设** 文档长度 100,000 字
- **当** 用户连续键入 2 分钟
- **则** 键入延迟 p95 < 16ms
- **并且** 无明显掉帧（< 55fps）

#### Scenario: AI 应用冲突阻断覆盖

- **假设** 引用选择区间在生成后被用户改动
- **当** 用户点击「应用到编辑器」
- **则** 返回 `CONFLICT`
- **并且** 不覆盖当前编辑内容

---

### Requirement: 异常与边界覆盖矩阵

| 类别         | 最低覆盖要求                                |
| ------------ | ------------------------------------------- |
| 网络/IO 失败 | IPC 保存失败、文档读取失败                  |
| 数据异常     | TipTap JSON 非法、selectionRef 失配         |
| 并发冲突     | 自动保存与手动保存并发、Diff 应用与撤销并发 |
| 容量溢出     | 超长文档、超大粘贴内容                      |
| 权限/安全    | 非当前项目文档写入、非法快捷键注入          |

#### Scenario: 自动保存与手动保存竞态

- **假设** autosave 正在进行
- **当** 用户同时按下 `Cmd/Ctrl+S`
- **则** 手动保存优先并复用同一写入队列
- **并且** 最终状态为 `saved`

#### Scenario: 超大粘贴触发分块处理

- **假设** 用户粘贴 2MB 文本
- **当** 编辑器处理 paste
- **则** 分块解析并在 1s 内完成首屏渲染
- **并且** 超限部分提示用户确认继续

---

### Non-Functional Requirements

**Performance**

- 键入渲染：p50 < 8ms，p95 < 16ms，p99 < 25ms
- 自动保存：p50 < 200ms，p95 < 500ms，p99 < 900ms
- Diff 打开：p95 < 200ms

**Capacity**

- 单文档建议上限：1,000,000 字符
- 单次粘贴上限：2 MB
- 大纲项上限：10,000

**Security & Privacy**

- 编辑日志不得记录正文全量，仅记录统计指标
- AI 参考卡片在发送后必须清理内存引用
- IPC 写入必须校验 `projectId/documentId`

**Concurrency**

- 保存队列串行，渲染可并发
- Diff 应用与撤销互斥
- 大纲重算采用可取消任务（仅保留最新）

#### Scenario: 大纲重算取消旧任务

- **假设** 用户快速输入触发 10 次大纲重算
- **当** 新任务到达
- **则** 取消旧任务，仅保留最后一次
- **并且** UI 无卡顿

#### Scenario: 文档容量超限提示

- **假设** 文档达到 1,000,000 字符上限
- **当** 用户继续输入
- **则** 状态栏提示容量上限并建议拆分文档
- **并且** 不出现崩溃
