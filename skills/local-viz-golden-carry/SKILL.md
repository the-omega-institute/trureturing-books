---
name: local-viz-golden-carry
description: Enforce 1:1 form, layout, DOM element, CSS class, and thumbnail alignment with books/example-monograph/viz/golden-carry/ via direct claude CLI execution.
---

# `local-viz-golden-carry` · 可视化 1:1 对齐 `golden-carry` 规范

在本书库创建或修改任何交互可视化（`books/<slug>/viz/<id>/`）时，必须 **100% 对齐 `books/example-monograph/viz/golden-carry/` 的形式与元素**，严禁脱离示例框架“自创”布局、私有主题控件或画布内文字堆砌。

## 1. 唯一执行载体：直接调用 `claude` CLI

- **必须直接通过命令行调用 `claude` CLI**（`/Users/auricstudio/.local/bin/claude -p --model opus --dangerously-skip-permissions ...`）。
- **严禁派生 Claude Subagent**。
- 在每次调用前，要求 `claude` CLI 先完整读取：
  - `books/example-monograph/viz/golden-carry/index.html`
  - `books/example-monograph/viz/golden-carry/style.css`
  - `books/example-monograph/viz/golden-carry/main.js`
  - `books/example-monograph/viz/tests/golden-carry.test.mjs`

## 2. 三栏网格与响应式样式（`style.css`）

- 直接复用 `books/example-monograph/viz/golden-carry/style.css` 的结构规则：
  - `.app`：`grid-template-columns: minmax(270px, 310px) minmax(0, 1fr) minmax(320px, 400px); grid-template-rows: auto minmax(0, 1fr); gap: 10px; padding-block: 10px; padding-inline: var(--gutter);`
  - 完整保留 `@media (max-width: 1180px)`、`@media (max-width: 760px)`、`:root[data-embed]`（`@media (min-width: 640px)` 双列 + `.side` 跨列双格）与 `:root[data-thumb-mode] .heatpanel` 规则。

## 3. 左栏 `<aside class="col deck">`（`#inputs` + `#readouts`）

1. **`<section class="panel sec" id="inputs">`**：
   - 标题：`<h2><span class="zh">输入</span><span class="en">Inputs</span><span class="aside">...</span></h2>`
   - 2–3 组 `.num-field`：每组含 `<label>`、`.stepper`（`<button>−</button><input type="number"><button>+</button>`）与 `<input type="range">`。
   - `<div class="chips presets" id="presets">`：4–6 个典型预设芯片按钮 + `Swap` / `Random` / `Reset` 动作按钮。
2. **`<section class="panel sec" id="readouts" aria-live="polite">`**：
   - 标题：`<h2><span class="zh">读数</span><span class="en">Readouts</span><span class="aside">...</span></h2>`
   - `<dl class="ro">` 严禁堆砌十余行稠密文字，必须对齐 `golden-carry` 的三层结构：
     - **6 项半宽精炼读数**：`<div><dt>...</dt><dd>...<span class="sub">...</span></dd></div>`；
     - **1 项全宽发光主读数（Hero Readout）**：`<div class="wide deficit"><dt>...</dt><dd><b class="vpos|vneg|vzero">...</b><span class="sub">...</span><span class="okmark">✓</span></dd></div>`（24px 发光大字）；
     - **2 项全宽定理核验行**：`<div class="wide"><dt>...</dt><dd><b class="vpos">...</b> <span class="okmark">✓</span></dd></div>`；
   - 底部说明：`<p class="note" id="roNote">...</p>`。

## 4. 中栏 `<main class="center">`（`#ledgerPanel` + `footer.rail`）

1. **`<section class="panel ledger" id="ledgerPanel" aria-labelledby="ledgerTitle">`**：
   - **`.head`**：`<h2 id="ledgerTitle">...</h2><span class="aside">...</span>`
   - **`.rules` 规则栏**：4 枚 `.rule`（`.r0`、`.r1`、`.rj`、`.ra`）公式/改写规则徽章（`<b>...</b> ... <i>...</i>`）。
   - **几何舞台 `.stage`（可选，位于 `.sheetwrap` 上方）**：配 `.scan`、四角 `.bracket.tl/.tr/.bl/.br`、`.hud-tl`（`.big` + `.sub`）、`.hud-tr.chips`；画布内只绘制干净的几何图形，**严禁在 `<canvas>` 内手绘多框文字表格或产生任何文字重叠**。
   - **分步交互账本 `.sheetwrap > .digits#ledger > .drow`**：
     - 必须用真实 HTML DOM 渲染 `.drow.hdr`、`.drow.input`、`.drow.sum`、`.drow.pass`（当前步 `.drow.now` 琥珀色发光边框，未来步 `.drow.future` 半透明，点击任意 `[data-pass]` 行跳转到对应步）与 `.drow.final`；
     - 每行包含 `<span class="lab">`、`<div class="cells"><span class="d0|d1|d2 touch">...</span></div>` 与 `<span class="what"><span class="sgn pos|neg|zero">...</span><code>...</code><span class="name">...</span></span>`。
   - **底部符号带 `.tape-row`**：
     - `<span class="tape-label">` + `<div class="tape" id="tape">`（可点击 `<i class="pos|neg|zero now|future" data-pass="..."></i>` 方块序列）+ `<span class="tape-sum" id="tapeSum">`。
   - **`<div class="toast" id="toast" role="status" aria-live="polite"></div>`**。
2. **`<footer class="rail" id="rail">`**：
   - 必须包含完整的三段式传输控制栏：
     - `.transport`：`#first` (`⏮`)、`#prev` (`◀`)、`#play` (`▶`)、`#next` (`▶▶`)、`#last` (`⏭`)；
     - `.clock`：`<span class="tau" id="passLabel">` + `<input type="range" id="pass">`；
     - `.keys`：键盘快捷键提示。

## 5. 右栏 `<aside class="col side">`（`#heatPanel[data-thumb]` + `#evidence`）

1. **上方二维相图面板 `<section class="panel sec heatpanel" id="heatPanel" data-thumb>`**：
   - `<h2 class="thumb-hide">...<span class="aside" id="heatRange">...</span></h2>`
   - `<div class="heatwrap"><canvas id="heat" role="img" ...></canvas><div class="scan"></div></div>`（1:1 交互二维相图/矩阵，带琥珀色十字准星与当前选中格琥珀色发光框，支持点击/拖拽选点）
   - `<div class="chips thumb-hide" id="nChips" role="group">`
   - `<ul class="legend thumb-hide">` 四色图例（`.sw.pos`、`.sw.zero`、`.sw.neg`、`.sw.cur`）
   - `<p class="note thumb-hide" id="heatCounts">` 与 `<p class="note thumb-hide" id="heatHover">`
2. **下方依据面板 `<section class="panel sec" id="evidence">`**：
   - 仅使用 `theme/viz/theme.css` 定义的标准类名 `.lean`（`LEAN ✓` + `data-lean-gid`）、`.lean.num`（`NUM`）、`.lean.model`（`MODEL`）、`.lean.argued`（`ARGUED`）、`.lean.open`（`OPEN`）；
   - 配 `<button class="chip" id="infoBtn">` 打开 `<div class="drawer" id="drawer" hidden><div class="sheet">...</div></div>`。

## 6. 无文字左右分栏缩略图封面（`?thumb=1` `drawCover()`）

- 当 `TRV.thumbMode` 为真时，`drawCover()` 在 `canvas#heat`（`1280×720`）上按 `golden-carry/main.js` 绘制：
  - 径向青色辉光背景；
  - **左半幅（`ox = 64*u, side = 600*u`）**：二维相图/矩阵 + 琥珀色十字准星与选中框；
  - **右半幅（`x0 = 760*u`）**：数学账本行 `#1..#k` + 青/品红格 + 符号徽章 + 琥珀色发光末行边框；
  - **严禁在缩略图上绘制任何自然语言散文标题或说明文字**。

## 7. 必跑校验与视觉截图对比

```bash
node tools/node/viz-thumbs.mjs <book>
node tools/node/viz-validate.mjs <book>
node tools/node/viz-test.mjs <book>
```

并在桌面端（`1440×900`）、内嵌模式（`?embed=1` `740×560`）与缩略图（`thumb.jpg` `1280×720`）下与 `golden-carry` 截图逐项核对。
