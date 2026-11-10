# 本书库的项目规则 · Project Rules for `trureturing-books`

本文件归本书库所有，模板更新不会覆盖它；仓库根级托管守则会自动引入本文件。本书库出版形式化专著与教材，首部著作是 Auric 所著《量子计算的几何直觉：从两子丈量、球外之球到 $\psi = \psi(\psi)$》（代号 `ORTHO//QUANTUM`，目录 `books/quantum-geometry/`）。

## 1. 读者定位与双重身份

本书库中的专著同时承担双重使命：

1. **经 Lean 内核验证的严格学术专著**：全书每一条正式的 `theorem`、`lemma`、`proposition` 与 `corollary`，都严格对应 `the-omega-institute/trureturing` 主干（`dev` 分支）中一条已被 Lean 4 内核验证并冻结的声明；假设、定义域、类型与结论必须与 Lean 源码百分之百一致。
2. **自包含、直觉通透的现代物理与计算教材**：面向物理学家、计算机科学家、数学研究者、工程师以及具备基本线性代数素养的求知读者。任何抽象代数对象（投影算子、迹配对、克利福德双矢量、信道压缩、部分迹）在引入之前，都必须先给出可触摸的几何图像与手算推演（如 $2\times 2$ 矩阵显式展开、球面截线与角度换算），绝不把结论藏在黑箱符号背后。

## 2. 文风与教学方法论

本书采用双轨交织的写作传统，同时严格划定“散文阐释”与“形式化陈述”的边界：

- **作者原声箴言与核心命题的忠实呈现**：各章章首题记（blockquote）直接引述作者 Auric 原始手稿（`ignore/量子与量子门的几何本质.pdf` 与 `ignore/量子与量子门的几何本质.md`）中的原句（中文版除空白符与标点/数学排版规范化外逐字保留原话，英文版配以洗练地道的格言体对译），以作者本人的思考原声自然展开，绝不掺杂任何对话体痕迹或旁白转述腔调。
- **费曼（Richard Feynman）式的物理机制与手算教学法**：拒绝从空洞的公理教条出发。用快门截断转盘、偏振片级联、手电筒迎面照射、球面赤道投影、旋转参考系等具体机制切入；先算最透明的 $2\times 2$ 特例与极点数值，再上升到任意有限维或完备内积空间的一般定理。
- **尼采（Friedrich Nietzsche）式的谱系学批判与格言锋芒**：追问传统量子力学教科书中“孤立粒子”“外部绝对坐标系（第 3 点 $C$）”“波包神秘坍缩”等概念偶像的认知起源，诊断观察者因维度遮蔽而产生的四重视觉盲区；在关键转折处凝练出短促、锐利、可铭记的几何格言。
- **定理盒内的绝对克制**：一切比喻、谱系批判与哲学格言都只写在定理盒之外的散文评注中。进入 `theorem / lemma / proposition / corollary / definition` 环境内部时，语言必须纯粹、精确、无修辞夸张，逐项对齐所引 Lean 声明的前提与结论。`proof` 环境紧随定理盒之后（绝不嵌套在定理盒内），用直觉透明的语言解释证明骨架，并以固定结语收束：
  - 中文：`完整证明由 Lean 内核检查。`
  - 英文：`The full proof is checked by the Lean kernel.`

## 3. 中英双语受控术语表

中文版（`zh`）为权威版本，英文版（`en`）须自然、地道、准确，严禁逐字生硬直译。核心概念在全书各卷与双语版本之间统一采用下表译名：

| 中文术语 | 英文受控译名 | 核心几何与代数记号 |
| :--- | :--- | :--- |
| 两子丈量 | pairwise measurement | 以已知态 $\vv{a}$ 直接比量目标态 $\vv{b}$，无需外部第 3 点 $C$ |
| 相融度 / 内积投影 | compatibility / inner-product overlap | $\vv{a}\cdot\vv{b} = \cos\theta$，内生相融向量 $\vv{c} = (\vv{a}\cdot\vv{b})\vv{a}$ |
| 玻恩配对权重 | Born pairing weight / record weight | $\operatorname{bornProbability}(\rho, P) = \Tr(\rho P) = \norm{\phi^*\psi}^2$ |
| 幂等存在线 | idempotent line | $P^* = P,\; P^2 = P$ |
| 记录测量 | record measurement | `IsRecordMeasurement P`（自伴、幂等、两两正交、完备） |
| 未读态 / 捏合投影 | unread state / pinching projection | $\operatorname{unreadState}(P, \rho) = \sum_k P_k \rho P_k$，$\mathcal{P}(\rho)$ |
| 有向夹角面积 / 双矢量 | oriented bivector area | $A \wedge B = \sin\theta\,\hat{I}$ |
| 旋转器 | rotor | $U(\theta) = \cos(\theta/2) - \hat{I}\sin(\theta/2) \in \mathrm{Cl}^+_{3,0}$ |
| 正交一次 / 正交两次 | first / second orthogonal step | 极角偏转 $\theta$ 与方位角偏转 $\phi$ 的两步球面寻址 |
| 量子门计数 | gate count | 最小正交门序列长度 $L$ |
| 球外之球 | sphere beyond spheres | 霍奇对偶法向逃逸 $\vv{e}_{n+1} = \star I_n$ |
| 自指不动点 | self-referential fixed point | $\cos\theta^* = \theta^*$（镜像方程 $\cos\theta = -\theta$ 根为 $-\theta^*$），算子与状态合一 $\psi = \psi(\psi)$ |
| 割圆多面体近似 / 开口螺旋投影 | polytope approximation / open-helix projection | 离散门集有限门计数 $L$ 多面体拼接、泰勒余项 $R_{2N}(\theta)$、法向 $\star$ 螺旋抬升与有限精度残差 $\lvert\cos q - q\rvert > 0$ |

## 4. 三层认识论诚实契约

全书对每一条数学与物理断言实行严格的三层分级，严禁越级包装：

1. **第一层：Lean 内核验证定理（绿色 `LEAN ✓`）**  
   凡使用 `theorem`、`lemma`、`proposition`、`corollary` 环境的条目，必须通过 `lean="<GID>"` 指向 `trureturing@dev` 所钉提交中已冻结且 `kind = "theorem"` 的声明；`definition` 环境建议指向对应的冻结定义或结构。正文中不为未经 Lean 验证的论断手写“已验证”或勾选符号。
2. **第二层：经典文献定理（`remark` 或 `example` 显式归属）**  
   凡数学或物理学界已有严格纸面证明、但尚未在 `trureturing` 中形式化的经典结论（如 Gleason 定理、Busch 定理、Lindemann–Weierstrass 定理等），一律放入 `remark` 或 `example` 环境，并在标题或正文中明确标注：`文献结果，未在本书形式化` / `Literature result, not formalized in this book`。
3. **第三层：开放问题与猜想（红色 `OPEN`）**  
   凡尚未解决的数学或物理猜想（如黎曼猜想、复杂度等于体积猜想等），一律使用 `conjecture` 或 `problem` 环境，严禁附加 `lean` 属性。

## 5. 数学排版与零模型标识铁律

- **数学宏规范**：行内公式用 `$...$`，独立公式块用单独成行且前后留空的 `$$...$$`，多行推导用 `\begin{aligned} ... \end{aligned}`。禁用反斜杠圆括号与反斜杠方括号数学定界符；禁用 `physics` 宏包中未在 `tools/tbook/mathrender.py` 注册的左矢、右矢与内积简写命令，一律写为标准命令 `\lvert\psi\rangle`、`\langle\phi\rvert`、`\langle\phi\mid\psi\rangle`（或 `tools/tbook/mathrender.py` 已注册的 `\ketbra`、`\dyad`、`\Tr`、`\vv`、`\norm`）。
- **零模型标识（正式出版物与提交记录）**：除工程工作流文档 `docs/project/WORKFLOW.md` 与本文件第 7 节按项目治理要求如实记录多智能体协同分工外，所有正式出版物文件（`books/**` 正文、代码注释、图注、可视化与视频源码、`site.toml`、根级 `README.md`）以及 Git 提交说明与 PR 描述中，严禁出现任何语言模型、智能体或自动生成工具的名称与标识。

## 6. 全面对齐示例专著（`books/example-monograph/`）规范

本书库的章节、视频与演示文稿一律严格对齐模板自带的权威示例专著 `books/example-monograph/` 与 `templates/`；交互可视化遵守共享运行时、页面契约与质量门，版式则服从内容：

1. **交互可视化（`books/<slug>/viz/<id>/`）按模板技能 `skills/book-viz` 的方法制作：舞台优先，每张实验卡都是正文可以单独引用的图**（本书的颜色用语、卡片与引用位置见 `skills/local-viz-cards/SKILL.md`）：
   - **执行载体**：一律通过命令行直接调用 `claude` CLI（`claude -p --model opus ...`，**严禁使用 Claude Subagent**）。
   - **版式服从内容**：按对象选舞台（布洛赫球、格点、矩阵、曲线），舞台占页面主体，读者直接拖动对象本身；不把不同主题套进同一副骨架。`books/example-monograph/viz/golden-carry/` 是“分步账本”这一种形态的示例，只在对象本身是逐步改写的记号串时采用。
   - **硬约束**：页面只加载 `../assets/theme.css`、`style.css`、`../assets/shell.js`、`../assets/kit.js` 与底部的 `main.js`，使用共享的实验室版式 `.app.lab`；依据框只用 `theme/viz/theme.css` 定义的 `.lean`、`.lean.num`、`.lean.model`、`.lean.argued`、`.lean.open`；不自造主题切换、私有运行时或非标徽章；颜色语义全书一致（绿色只给 Lean 已验证，琥珀色只给当前选择）。
   - **按卡引用**：正文讲到哪个情形，就在那句话旁用 `::: {.viz src="<id>" preset="<卡>" height="500"}` 引用那张卡，中英文版本的位置与卡名相同；每个可视化在所属章节末尾保留一处不带 `preset` 的完整实验室。卡片说明与图注只说图里看得见的东西，并使用与图例相同的颜色词和符号。
   - **质量门**：每个页面的浏览器测试先过 `stageFirstChecks`，再用测试里另写的独立算法核对页面声称的每条性质；改动后运行 `node tools/node/viz-shots.mjs quantum-geometry <id>` 亲眼看桌面、书内、手机与封面四种画面，并用 `node tools/node/viz-thumbs.mjs quantum-geometry <id>` 重新生成封面与被引用卡的静态图。
2. **讲解视频（`books/<slug>/films/<NNN>-<name>/`）严格对齐 `books/example-monograph/films/001-golden-deficit/`**：
   - 目录固定由 `film.json`、`script.json`、`scenes.js` 与 `poster.jpg` 组成，统一通过 `theme/film/film.sh` 构建与校验。
3. **演示文稿（`books/<slug>/slides/<deck>/`）严格对齐 `books/example-monograph/slides/overview/`**：
   - 采用 `slides.md` 与 `slides.en.md` 双语对齐，仅使用 `theme/slides` 标准版式与组件（`<TheoremCard>`、`<LeanBadge>`、`<Stat>`、`<Source>`、`<Tex>`）。
4. **章节正文、前言与附录（`books/<slug>/{zh,en}/`）严格对齐 `books/example-monograph/{zh,en}/`**：
   - 定理环境、证明块、文献注记、开放问题、数值示例表格及文末可视化/视频嵌入块完全遵循 `ch01-golden-deficit.md` 的标准写法。

## 7. 多智能体协同分工与五路并行工作流

本书库采用“人机协同、专精分工、三席异构审查、五路 Worktree 流水线”方式组织生产（完整细则见 `docs/project/WORKFLOW.md`）：

1. **五元角色分工**
   - **作者与总架构师（Auric）**：提出全书核心几何与哲学命题（两子丈量、球外之球、割圆多面体近似与泰勒余项、毛球定理与 $720^\circ$ 角亏、余弦自指不动点 $\psi = \psi(\psi)$），审定章节脉络与原话题记。
   - **中英双语正文主笔（Gemini Subagent）**：负责全书 33 个单元的中英文学术专著与教材正文撰写，严格对齐冻结的 Lean 4 定理签名。
   - **辅助工程与形式化对齐（`codex-cli`）**：负责冻结 Lean 4 定理核验与批次规格书（`spec-batch-*.md`）、静态矢量图（`assets/fig-*.svg`）、第七部 Python 几何代数参考引擎、`./tbook` 工具链构建检验、Git Worktree 管理及上游模板修复 PR。
   - **交互可视化与讲解视频（`claude` CLI · Opus 5.5）**：直接通过命令行调用 `claude` CLI（`claude -p --model opus ...`，**禁止使用 Claude Subagent**），严格按照 `books/example-monograph/` 示例框架完成全部交互可视化（`books/quantum-geometry/viz/<id>/`）与讲解视频（`books/quantum-geometry/films/<NNN>-<name>/`）的实现与测试。
   - **三席异构独立审查（`/sshx` `review_triplet_workers`）**：每批次由 `architecture`、`quality`、`tests` 三席独立审查；第一轮（Round 1）采用 `1 nyxid-oracle + 1 codex-cli + 1 isolated-token-subagent`，第二轮及后续复审（Round 2+）禁用响应较慢的 `nyxid-oracle`，采用 `2 codex-cli + 1 isolated-token-subagent` 高速完成修复验证闭环。
2. **五路 Git Worktree 流水线**：最多并行开启 5 个 `git worktree`（主仓库 `wt1` 及 `wt3`–`wt6`），使当前批次的审查/修复与后续批次的辅助规格、正文写作和可视化/视频制作并行推进、互不阻塞。
