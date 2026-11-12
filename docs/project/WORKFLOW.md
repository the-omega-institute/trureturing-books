# 多智能体协同分工与五路并行工作流 · Multi-Agent Division of Labor & 5-Worktree Pipeline

本文件记录 `trureturing-books` 书库（首部专著《量子计算的几何直觉》，代号 `ORTHO//QUANTUM`）的人机协同分工、三席独立形式化审查机制与多 Worktree 并行出版流水线。本文件存放于下游书库专属文档目录 `docs/project/WORKFLOW.md`，并在 `PROJECT.md` 中索引，不受上游模板更新覆盖。

---

## 1. 角色分工（Division of Labor）

本书库严格遵循“思想原创、正文精写、工程自动化、媒体专精、异构严审”的五元协同分工：

| 角色 | 承担主体 | 核心职责与交付边界 |
| :--- | :--- | :--- |
| **作者与总架构师**<br>*(Author & Principal Architect)* | **Auric** | 提出全书核心几何直觉、物理图像与哲学命题（两子丈量、有向夹角面积、正交两次寻址、球外之球、割圆多面体近似与泰勒余项逃逸、毛球定理与 $720^\circ$ 角亏、余弦自指不动点 $\cos\theta^* = \theta^*$ 与 $\psi = \psi(\psi)$）；审定目录脉络、章节题记与学术标准。 |
| **中英双语正文主笔**<br>*(Chapter Prose Authoring)* | **Gemini**<br>*(Isolated Author Subagent)* | 负责全书 44 个单元（序曲、第一至第十部共 39 章、终章与附录 A–C）的中英文双语学术专著与教材正文撰写，融合费曼式物理机制手算教学与尼采式维度谱系批判，严格对齐冻结的 Lean 4 定理签名并逐字保留章首作者原话题记。 |
| **辅助工程与形式化对齐**<br>*(Auxiliary Engineering & Tooling)* | **Codex CLI**<br>*(`codex-cli`)* | 负责除正文写作外的全部工程性辅助工作：从 `trureturing@dev` 提取并核验冻结的 Lean 4 定理签名与状态切片（生成各批次 `spec-batch-*.md` 规格书）、编写静态图脚本（静态图一律按 `PROJECT.md` 第 6 节第 5 条由脚本 `figures/<name>.py` 生成，`assets/` 只放照片一类确实不能由脚本画的图片）、编写第七部零依赖 Python 几何代数与转子编译参考引擎及测试、执行 `./tbook pin / check / build / epubcheck` 工具链验证，以及管理 Git 分支、Worktree 与上游模板修复 PR。 |
| **交互可视化与讲解视频**<br>*(Interactive Viz & Explainer Films)* | **Claude CLI (Opus 5.5)**<br>*(`claude -p --model opus`，严禁使用 Claude Subagent)* | 直接通过命令行调用 `claude` CLI（不派生 Claude Subagent），严格遵循 `books/example-monograph/` 示例框架完成全部交互式可视化（`books/<slug>/viz/<id>/`，百分之百对齐 `golden-carry` 的三栏 `.app` 结构、`theme/viz/{theme.css,shell.js}` 与 `main.js` 契约，严禁自创主题按钮或非标类名）与讲解视频（`books/<slug>/films/<NNN>-<name>/`，百分之百对齐 `001-golden-deficit` 的 `film.json`、`script.json`、`scenes.js` 与 `poster.jpg` 规范）。 |
| **三席异构独立审查**<br>*(3-Seat Independent Verification)* | **GPT / Oracle + Codex CLI + Subagent**<br>*(`/sshx` `review_triplet_workers`)* | 对每个出版批次执行互不可见的独立三席审查（`architecture` 架构与契约席、`quality` 数学与教学质量席、`tests` 独立数值与构建验证席），所有阻塞性缺陷清零后方能合入主干。 |

---

## 2. 全面对齐示例专著（`books/example-monograph/`）硬性规范

本仓库的章节、视频与演示文稿必须与 `books/example-monograph/` 的规范保持一致；交互可视化遵守共享运行时、页面契约与质量门，版式服从内容：

1. **交互可视化（`books/<slug>/viz/<id>/`）按 `skills/book-viz` 的方法制作，细则见 `PROJECT.md` 第 6 节与 `skills/local-viz-cards/SKILL.md`**
   - **执行载体**：一律直接通过命令行调用 `claude` CLI（`claude -p --model opus ...`，**严禁派生 Claude Subagent**）。
   - **舞台优先**：按对象选舞台，舞台占页面主体；使用共享的实验室版式 `.app.lab` 与运行时 `theme/viz/{theme.css,shell.js,kit.js}`，不自造私有运行时、主题切换或非标徽章。
   - **按卡引用**：每张实验卡都是正文可引用的图（`::: {.viz src=… preset=…}`），中英文版本引用相同；PDF/EPUB 使用该卡的带标签静态图。
   - **验收**：`stageFirstChecks` 与页面自己的独立核对全部通过；看过 `viz-shots` 的全部截图；封面与静态图已重新生成并提交。
2. **讲解视频（`books/<slug>/films/<NNN>-<name>/`）对齐 `books/example-monograph/films/001-golden-deficit/`**
   - 固定包含 `film.json`、`script.json`、`scenes.js`、`poster.jpg`，由 `theme/film/film.sh` 渲染并执行 `FILM.init` 自检（0 `FILM_ERRORS`）。
3. **演示文稿（`books/<slug>/slides/<deck>/`）对齐 `books/example-monograph/slides/overview/`**
   - 固定包含 `slides.md` 与 `slides.en.md`，使用 `theme/slides` 标准版式与 `<TheoremCard>`、`<LeanBadge>`、`<Stat>`、`<Source>`、`<Tex>` 组件。
4. **章节与前言（`books/<slug>/{zh,en}/`）对齐 `books/example-monograph/{zh,en}/`**
   - 严格遵循 `ch01-golden-deficit.md` 的 `theorem / lemma / proposition / corollary / definition / proof / remark / example / conjecture / problem` 块结构与媒体嵌入语法。

---

## 3. 三席独立审查与算力调度策略（`/sshx` Verification Protocol）

为杜绝一切数学幻觉、定理越界包装或正负号/定义域疏漏，每一批次（Batch 1–8）均须通过 `/sshx` 协议的三席独立审查（`review_triplet_workers`）：

1. **`architecture`（架构、契约与认识论边界席）**
   - 核查三层认识论诚实分级：第一层 `theorem / lemma / proposition / corollary` 必须 100% 绑定 `trureturing.lock.json` 中 `kind = "theorem"` 的冻结声明（绿色 `LEAN ✓`）；第二层未形式化经典定理必须置于 `remark / example` 并标注 `文献结果，未在本书形式化` / `Literature result, not formalized in this book`；第三层开放问题必须使用无 `lean` 属性的 `conjecture / problem`（红色 `OPEN`）。
   - 核查中英双语章节文件、环境序列（`kind`、`#id`、`lean`）、可视化与视频嵌入、SVG 颜色令牌语义（`theme/tokens.json` 中 `#46ffb2` 仅限 Lean 验证徽章，`#ffc83d` 仅限当前选择焦点）及 `template.toml` 托管文件零篡改。
2. **`quality`（数学、物理与教学质量席）**
   - 逐行比对 `trureturing@dev` 所钉提交中的 `.lean` 源码与 `.lean.json` 状态记录，检查定理盒前提、隐式类型类假设、定义域限制与 `proof` 解释机制是否完全忠实。
   - 核查正文与文献评注中的每一个数学恒等式、矩阵展开、量子电路时序、极值角度与原始文献归属（精确到作者、论文与量词层级）。
3. **`tests`（独立数值验算与构建产物席）**
   - 编写独立 Python 验算脚本，对章内所有数值表格、角度/概率/范数/余项公式进行自动化验算。
   - 运行 `./tbook check`（0 错误 0 警告）、813 项工具单元测试、HTML（0 `katex-error`）、PDF（屏幕版/印刷版）、EPUB（`epubcheck` 0 错误 0 警告）、Playwright 可视化测试以及章首原话题记 100% 单轮子串匹配测试。
4. **审查轮次算力调度规则**
   - **第一轮审查（Round 1）**：启用三异构载体——`1 nyxid-oracle`（外部独立视角）+ `1 codex-cli` + `1 isolated-token-subagent`。
   - **第二轮及后续复审（Round 2+）**：由于 `nyxid-oracle` 响应延迟较高，复审轮次禁用 `nyxid-oracle`，改由 `2 codex-cli + 1 isolated-token-subagent` 高速完成修复验证闭环。

---

## 4. 五路 Git Worktree 并行流水线（5-Worktree Pipeline）

全书按 8 个分卷批次（PR #1 至 PR #8）推进。为使“审查/修复阶段”与“新章节创作/媒体制作阶段”完全解耦且保持跨章上下文连贯，仓库采用最多 **5 个并行 `git worktree`** 流水线：

```text
/Users/auricstudio/trureturing-books       (wt1) ──► 当前主批次审查 / 修复 / PR 合入
/Users/auricstudio/trureturing-books-wt3   (wt3) ──► 下一批次并行写作 / 审查 / 修复
/Users/auricstudio/trureturing-books-wt4   (wt4) ──► 后续批次并行写作 / 审查 / 修复
/Users/auricstudio/trureturing-books-wt5   (wt5) ──► 后续批次并行写作 / 审查 / 修复
/Users/auricstudio/trureturing-books-wt6   (wt6) ──► 后续批次并行写作 / 审查 / 修复
```

1. **阶段流水化（Pipelined Stages）**
   - **Step A（辅助先行）**：由 `codex-cli` 在对应 worktree 中完成该批次 16 条冻结 Lean 4 定理的源码核验、精确签名提取（生成 `spec-batch-N.md`）与静态 SVG 绘制。
   - **Step B（正文与媒体并行）**：由 Gemini 正文主笔 subagent 依据规格书撰写中英双语章节正文；同时直接通过命令行调用 `claude` CLI（`claude -p --model opus ...`，**禁止派生 Claude Subagent**），严格遵循 `books/example-monograph/` 示例框架制作该批次配套的交互可视化（`viz/`）与讲解视频（`films/`）。
   - **Step C（只读保护与三席审查）**：进入 `/sshx` 审查阶段后，目标 worktree 处于严格只读保护状态，三席审查员并行输出结构化 JSON 报告。
   - **Step D（靶向修复与复审合入）**：针对审查发现的所有阻塞项与建议项执行一次性闭环修复，通过复审与 GitHub Actions CI 后 Squash Merge 入 `main`，并将更新后的 `main`（含累积的 `SUMMARY.md` 与 `trureturing.lock.json`）变基同步至下一批次 worktree。
2. **上游模板缺陷回馈机制**
   - 凡 `template.toml` `[managed].paths` 下的托管文件（构建脚本、测试套件、主题样式、内置 skills）均不在本书库私自修改。若发现上游模板缺陷，由 `codex-cli` 在独立的 `trureturing-books-template` 仓库并行提交修复 PR、合入并升级模板版本后，通过 `./tbook template update` 零冲突同步回本书库。
3. **署名与零模型标识边界**
   - 除本工程工作流文档（`docs/project/WORKFLOW.md`）与 `PROJECT.md` 第 7 节如实记录多智能体协同分工外，**所有正式出版物文件**（`books/<slug>/**` 正文、图注、可视化与视频源码、代码注释、`site.toml`、根级 `README.md`）以及 **Git 提交说明与 PR 描述** 均严格执行零模型标识规则，仅署作者 `Auric` 之名。
