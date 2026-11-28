# 本书库的项目规则 · Project Rules for `trureturing-books`

本文件归本书库所有，模板更新不会覆盖它；仓库根级托管守则会自动引入本文件。本书库出版形式化专著与教材，首部著作是 Auric 所著《量子计算的几何直觉：从两子丈量、球外之球到 $\psi = \psi(\psi)$》（代号 `ORTHO//QUANTUM`，目录 `books/quantum-geometry/`）。

## 1. 读者定位与双重身份

本书库中的专著同时承担双重使命：

1. **证据明确的严格学术专著**：全书正式的 `theorem`、`lemma`、`proposition` 与 `corollary` 默认对应 `the-omega-institute/trureturing` 主干（`dev` 分支）在当次校验或构建解析出的提交中已被 Lean 4 内核验证并冻结的声明；假设、定义域、类型与结论必须与 Lean 源码一致。无匹配冻结声明而源文已有证明时，按根级守则与第 4 节显式声明书面证明，由作者与评审负责，不计入 Lean 验证。
2. **自包含、直觉通透的现代物理与计算教材**：面向物理学家、计算机科学家、数学研究者、工程师以及具备基本线性代数素养的求知读者。任何抽象代数对象（投影算子、迹配对、克利福德双矢量、信道压缩、部分迹）在引入之前，都必须先给出可触摸的几何图像与手算推演（如 $2\times 2$ 矩阵显式展开、球面截线与角度换算），绝不把结论藏在黑箱符号背后。

## 2. 文风与教学方法论

本书采用双轨交织的写作传统，同时严格划定“散文阐释”与“形式化陈述”的边界：

- **作者原声箴言与核心命题的忠实呈现**：各章章首题记（blockquote）直接引述作者 Auric 原始手稿（`ignore/量子与量子门的几何本质.pdf` 与 `ignore/量子与量子门的几何本质.md`）中的原句（中文版除空白符与标点/数学排版规范化外逐字保留原话，英文版配以洗练地道的格言体对译），以作者本人的思考原声自然展开，绝不掺杂任何对话体痕迹或旁白转述腔调。
- **费曼（Richard Feynman）式的物理机制与手算教学法**：拒绝从空洞的公理教条出发。用快门截断转盘、偏振片级联、手电筒迎面照射、球面赤道投影、旋转参考系等具体机制切入；先算最透明的 $2\times 2$ 特例与极点数值，再上升到任意有限维或完备内积空间的一般定理。
- **尼采（Friedrich Nietzsche）式的谱系学批判与格言锋芒**：追问传统量子力学教科书中“孤立粒子”“外部绝对坐标系（第 3 点 $C$）”“波包神秘坍缩”等概念偶像的认知起源，诊断观察者因维度遮蔽而产生的四重视觉盲区；在关键转折处凝练出短促、锐利、可铭记的几何格言。
- **定理盒内的绝对克制**：一切比喻、谱系批判与哲学格言都只写在定理盒之外的散文评注中。进入 `theorem / lemma / proposition / corollary / definition` 环境内部时，语言必须纯粹、精确、无修辞夸张，逐项对齐所引 Lean 声明或书面证明来源的前提与结论。`proof` 环境紧随定理盒之后（绝不嵌套在定理盒内）；Lean 结果用直觉透明的语言解释证明骨架，并以固定结语收束：
  - 中文：`完整证明由 Lean 内核检查。`
  - 英文：`The full proof is checked by the Lean kernel.`

  书面证明结果则给出完整、忠实且注明出处的论证，不使用上述 Lean 验证结语。
- **严禁把专著写成流水账，保持正文浅层流畅，超大技术节一律下沉专题附录**：本书是按核心几何问题与读者理解次序层层推进的专著与教材，不是研究日志、形式化进度流水或 PR 追加清册（遵守根级守则第 12 条、[写作手册“论证结构与禁止流水账”](docs/AUTHORING.md#论证结构与禁止流水账)、[“正文流畅与超大技术节下沉附录”](docs/AUTHORING.md#正文流畅与超大技术节下沉附录)与[“新增章节与子节的归位原则”](docs/AUTHORING.md#新增章节与子节的归位原则)）。编号主章只承担中心问题、几何直觉、关键手算、推进主线的核心定理与证明骨架及核心交互实验，保持目录浅层连贯（不得超过主章嵌套深度上限，一般至多三层：`章 → 节 X.Y → 子节 X.Y.Z`）。严禁按研究、形式化或 PR 提交的时间顺序往页末、章末或书末顺手粘贴新定理、新小节或新主章；严禁连续堆砌缺乏物理动机、几何图像与承上启下过渡的“定理—证明”清单；严禁把批次、回合、补丁痕迹或工作流视角写入正文；严禁为规避 `max_page_lines = 1000` 在编号主章内层层套娃切出第 4、5 级深层子页、空壳中转目录或微型子页；**更严禁突破第 6 节规定的 39 章封顶，或把收官第 39 章及终章当作“万能尾巴”无脑堆放分属各专章的新课题**。成熟书稿技术体量膨胀时，不动既定 39 章框架、不轻率另拆新书，而是将多页连续引理链、参数族扰动／分类穷举、细密组合计数与资源账本整体下沉至 `[numbering.unnumbered]` 专题附录；正文保留核心结论、直觉意义、主线实验／静图与流畅过渡，阶段性铺路副产物留在上游源码与认领 Issue，不必强行塞入书稿。

## 3. 中英双语受控术语表与英文版零中文铁律

中文版（`zh`）为权威版本，英文版（`en`）须自然、地道、准确，严禁逐字生硬直译。**英文版零中文硬约束**：英文版所有文件（`books/<slug>/en/**/*.md`、可视化与图表的英文文案及英文元数据）严禁出现任何中文汉字或中文全角标点（如 `，。；：！？、“”‘’《》【】（）` 中的汉字与中文专有标点）；凡需提及中文原词读音、双声调分化或古典术语词源之处，一律使用拉丁拼音斜体（如 *liáng* / *liàng*、*shǔ* / *shù*、*gēyuánshù*）配地道英文阐释，附录对照词典与命题总表在英文版中仅保留纯英文条目。核心概念在全书各卷与双语版本之间统一采用下表译名：

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
   使用 `theorem`、`lemma`、`proposition`、`corollary` 环境的条目默认通过 `lean="<GID>"` 指向 `trureturing@dev` 在当次校验或构建解析出的提交中已冻结且 `kind = "theorem"` 的声明；显式书面证明适用第二层。`definition` 环境建议指向对应的冻结定义或结构。正文中不为未经 Lean 验证的论断手写“已验证”或勾选符号。
2. **第二层：文献结果与书面证明（紫色，不计入 Lean 验证）**
   数学或物理学界已有严格纸面证明、但尚无匹配冻结声明的结论，可在 `remark` 或 `example` 中明确标注：`文献结果，未在本书形式化` / `Literature result, not formalized in this book`。需要定理类环境时，必须先检索冻结库，使用 `status="written-proof" proof="<proof-id>"` 且不带 `lean`，每版关联完整证明，并提供支持同一陈述的 DOI 或源论文仓库、原文定位与已登记的 `trureturing-requests` issue；遵守根级守则及 `docs/FORMALIZATION-REQUESTS.md`。紫色书面证明由作者与评审负责，不能声称内核验证。
3. **第三层：开放问题与猜想（红色 `OPEN`）**  
   凡尚未解决的数学或物理猜想（如扩展黎曼猜想 ERH、$\mathrm{P}\neq\mathrm{NP}$、复杂度等于体积猜想等），一律使用 `conjecture` 或 `problem` 环境，严禁附加 `lean` 属性。已获外部形式化证明但尚未在 `trureturing@dev` 冻结的结果按第 14 节处理，不再标作开放猜想。

书内条目、原始文献、外部代码和媒体依照[写作手册第 4 节](docs/AUTHORING.md#4-引用与链接)引用。引用本书时注明中英文版和条目或章节。第 14 节的外部证明引用分别指向固定版本的命题定义、终端定理和独立核验记录。

**Lean 公理与重放的忠实性。** 正文、图注、可视化、演示文稿及影片凡声称零公理或内核重放，须写明所钉提交、后端和受检范围。先在冻结状态片的 `declarations` 数组中匹配所引声明。书库据该声明的官方测量 `declarations[].axioms` 生成徽章与统计。历史行缺此字段时，只能给出三个标准公理的许可上界。`declarations[].strict_omega.axioms` 记录该声明的严格端测量，缺项表示该端未提供测量记录。严格库的空内核重放须标明所选库根及其导入闭包。D5 双后端冻结证据须标明双端编译、接口对照与分端测量。每个复现命令须与文字所述对象一致。两端记录不同的例子及复核方法见 [《OMEGA MATH》附录 A](books/omega-math/zh/appendix-a.md#sec-om-appa-audit-checklist)。

## 5. 数学排版与零模型标识铁律

- **数学宏规范**：行内公式用 `$...$`，独立公式块用单独成行且前后留空的 `$$...$$`，多行推导用 `\begin{aligned} ... \end{aligned}`。禁用反斜杠圆括号与反斜杠方括号数学定界符；禁用 `physics` 宏包中未在 `tools/tbook/mathrender.py` 注册的左矢、右矢与内积简写命令，一律写为标准命令 `\lvert\psi\rangle`、`\langle\phi\rvert`、`\langle\phi\mid\psi\rangle`（或 `tools/tbook/mathrender.py` 已注册的 `\ketbra`、`\dyad`、`\Tr`、`\vv`、`\norm`）。
- **零模型标识（正式出版物）**：除工程工作流文档 `docs/project/WORKFLOW.md` 与本文件第 7 节按项目治理要求如实记录多智能体协同分工外，所有正式出版物文件（`books/**` 正文、代码注释、图注、可视化与视频源码、`site.toml`、根级 `README.md`）中，严禁出现任何语言模型、智能体或自动生成工具的名称与标识。Git 提交记录（提交说明与作者字段）与 PR 描述不受此限。

## 6. 全面对齐示例专著（`books/example-monograph/`）规范

本书库的章节、视频与演示文稿一律严格对齐模板自带的权威示例专著 `books/example-monograph/` 与 `templates/`；交互可视化遵守共享运行时、页面契约与质量门，版式则服从内容：

1. **交互可视化（`books/<slug>/viz/<id>/`）按模板技能 `skills/book-viz` 的方法制作：舞台优先，每张实验卡都是正文可以单独引用的图**（本书的颜色用语、卡片与引用位置见 `skills/local-viz-cards/SKILL.md`）：
   - **执行载体**：一律通过命令行直接调用 `claude` CLI（`claude -p --model opus ...`，**严禁使用 Claude Subagent**）。
   - **版式服从内容**：按对象选舞台（布洛赫球、格点、矩阵、曲线），舞台占页面主体，读者直接拖动对象本身；不把不同主题套进同一副骨架。`books/example-monograph/viz/golden-carry/` 是“分步账本”这一种形态的示例，只在对象本身是逐步改写的记号串时采用。
   - **硬约束**：页面只加载 `../assets/theme.css`、`style.css`、`../assets/shell.js`、`../assets/kit.js` 与底部的 `main.js`，使用共享的实验室版式 `.app.lab`；全书交互页面统一遵循与 `triadic-nameless-sandbox` 一致的三栏暗色实验室壳层（左栏 `#rail` 放双透镜切换与递进实验卡，中栏为主舞台 `#stage`、舞台外下方的对照小图条 `.strip` 与底部播放条 `.bar`，右栏 `#evidence` 放顶部原理抽屉按钮 `#infoBtn`、参数控件/实时读数与依据框），严禁另起双栏或顶栏覆盖层布局，严禁把 `.strip` 辅助小图塞进 `#stage` 内部抢占三维视口，严禁在实验室页面内混入 `data-tr-palette` 浅色切换；依据框只用 `theme/viz/theme.css` 定义的 `.lean`、`.lean.num`、`.lean.model`、`.lean.argued`、`.lean.open`；不自造主题切换、私有运行时或非标徽章；颜色语义全书一致（绿色只给 Lean 已验证，琥珀色只给当前选择）。
   - **按卡引用**：正文讲到哪个情形，就在那句话旁用 `::: {.viz src="<id>" preset="<卡>" height="500"}` 引用那张卡，中英文版本的位置与卡名相同；每个可视化在所属章节末尾保留一处不带 `preset` 的完整实验室。卡片说明与图注只说图里看得见的东西，并使用与图例相同的颜色词和符号。
   - **质量门**：每个页面的浏览器测试先过 `stageFirstChecks`，再用测试里另写的独立算法核对页面声称的每条性质；改动后运行 `node tools/node/viz-shots.mjs quantum-geometry <id>` 亲眼看桌面、书内、手机与封面四种画面，并用 `node tools/node/viz-thumbs.mjs quantum-geometry <id>` 重新生成封面与被引用卡的静态图。
2. **讲解视频（`books/<slug>/films/<name>/`）严格对齐 `books/example-monograph/films/golden-deficit/`**：
   - 目录固定由 `film.json`、`script.json`、`scenes.js` 与 `poster.jpg` 组成，统一通过 `theme/film/film.sh` 构建与校验。视频只用具体片名，目录用片名的 kebab-case 写法；`film.json` 不另填视频 ID 或所属章节，各端不显示视频编号。
3. **演示文稿（`books/<slug>/slides/<deck>/`）严格对齐 `books/example-monograph/slides/overview/`**：
   - 采用 `slides.md` 与 `slides.en.md` 双语对齐，仅使用 `theme/slides` 标准版式与组件（`<TheoremCard>`、`<LeanBadge>`、`<Stat>`、`<Source>`、`<Tex>`）。
4. **章节正文、前言与附录（`books/<slug>/{zh,en}/`）严格对齐 `books/example-monograph/{zh,en}/`**：
   - 主章使用 `chNN-topic.md`，子章节使用 `chNN-sNN-topic.md`，更深一级继续追加 `-sNN`；数字至少两位，主题用英文 kebab-case，各语言同名。目录用每级两个空格表达父子关系，主章保留导言和入口，完整小节连同证明与媒体整体移动；编号与阅读顺序以 `SUMMARY.md` 为准。拆分不改环境 id、Lean 引用和主章定理计数，更新移动内容的片段链接；详见 `docs/AUTHORING.md` 的“章节命名与长章拆分”。
   - 标题格式全书统一：主章用“第三十章 标题”／“Chapter 30 Title”；子页面用“30.1 标题”，其页内二级标题继续为“30.1.1 标题”，再下一级继续追加数字。序曲与终章的一级标题用“序曲 标题／Prelude Title”“终章 标题／Coda Title”；序曲页内用 `0.x`，终章由 `book.toml` 的 `[numbering.unnumbered]` 排除章号，其子页与页内标题均不加编号，定理环境共享 `Coda.n` 前缀。附录一级标题用“附录 A 标题／Appendix A Title”，页内用 `A.1`、`A.1.1`。编号与标题之间只用一个空格，不再叠加中文顿号或罗马序号。每页恰有一个一级标题，文字与本语言目录一致，中英文层级序列相同；已经发布的标题改名时保留原片段 id。
   - 定理环境、证明块、文献注记、开放问题、数值示例表格及文末可视化/视频嵌入块完全遵循 `ch01-golden-deficit.md` 的标准写法。
   - **《量子计算的几何直觉》39 章封顶（`max_chapters = 39`）与十部主题归位铁律**：`books/quantum-geometry/book.toml` 显式锁定 `max_chapters = 39`，全书顶层编号主章严格封顶为 39 章（第一章至第三十九章，由 `./tbook check` 与 `./tbook new-chapter` 强制拦截），严禁新增第四十章及后续编号主章。未来引入任何新内容时，必须严格按“（1）原位融合进既有小节 →（2）按学科主题归入既有主章并用 `--parent <主章> --before|--after <相邻节>` 插入逻辑位置 →（3）纯技术引理、细密证明与参考表入附录 A–P（其中附录 J–P 专责承接第 4、15、16、31、34、35、36 章的超长技术推导），中间副产物留上游 →（4）章内容量膨胀时在既有 39 章内跨章主题分流或合并重整”执行，严禁顺手往全书末尾或第 38／39 章末尾无脑堆叠。各主题在十部版图中的固定归口如下：
     - **第一至六部（第 1–23 章）**：两子丈量、投影与克利福德旋子基础、单比特与多球纠缠、时空之球、霍奇对偶法向越界（球外之球）；
     - **第七部（第 24–28 章）**：余弦自指不动点、无时间因果与不可逆记录、视界热力学、公平平方与正交扩维、零背景比较公理；
     - **第八部（第 29–32 章）**：正交退化与观察者位置（第 29 章）；极小圆弧微积分与四大力几何统一（第 30 章）；乘性素数谱、实轴误差与素数阿代尔闭合、全息圆弧流形及黎曼谱磨光（第 31 章）；原生三元数三维场、无常数／无无穷／无超越数有理数学与 Lean 4 零公理 `OmegaMath` 形式化基座（第 32 章）；
     - **第九部（第 33–37 章）**：三元数场网络（TFT）与有理旋子智能（第 33 章）；场内观察者、记忆指针、本体 QRAM 与最小作用量测地智能（第 34–37 章）；
     - **第十部（第 38–39 章）**：观察者内部自包含结构、因陀罗网、记忆窗时空舒尔分类与观察者原生有理指令集（第 38 章）；母公理 `AXIOM-Ω` 大一统收束、因果二阶射流与三维球面彼得—魏尔谱综合（第 39 章，仅作全书主线最高层统一收官，严禁充当跨学科杂物筐）；
     - **无编号卷（`[numbering.unnumbered]`）**：终章（`coda.md`）、铸器与圣殿（`sanctuary.md`）与附录 A–P（`appendix-a.md`–`appendix-p.md`；其中附录 J 承接第 4 章有限环境历史，附录 K 承接第 15 章 Shor 采样与取阶证书，附录 L 承接第 16 章游走森林计数与 QSVT 相位合成，附录 M 承接第 31 章算术窗口与频谱扰动，附录 N 承接第 34 章算术消元资源账本，附录 O 承接第 35 章禁 $1^K$ 编码与拟阵组合，附录 P 承接第 36 章静态本体 QRAM 物理轮廓）。每次在既有章内插入新子节，必须同步改写中英文章导言与相邻小节的承上启下过渡段。
   - **正文浅层流畅与超大技术节下沉专题附录契约（主章深度 ≤ 2，不动章架、不轻拆新书）**：
     - **正文只留主线，大节与深树下沉附录**：39 章编号主章保持浅层可读（目标由 `book.max_chapter_depth = 2` 强制约束，即顶层主章 `depth = 0` → 节 `X.Y` → 至多一级子节 `X.Y.Z`；禁止在编号主章内新建第 4 级及更深子页或空壳中转目录）。当某节因多页技术证明链、参数族扰动、组合穷举或细密资源账本触及 `max_page_lines = 1000` 或使全章失衡时，不在编号主章内继续向深处套娃拆分，也不轻率另拆新书，而是将完整技术子树整体下沉至对应的 `[numbering.unnumbered]` 专题附录（附录树豁免主章深度上限，定理自动采用独立字母前缀如 `J.n`、`M.n`）。
     - **正文自洽流畅与媒体留位**：下沉技术节后，原主章位置必须保留核心结论、几何直觉与指向专题附录的双语流畅过渡段；支撑主线理解的静态图、实验卡与完整实验室留在讨论它们的正文句旁（保持媒体块不连排），仅专属于该技术分支的独立实验室或图件随分支整体迁入附录。
     - **零破链迁移**：下沉既有子页入附录时保留原文件名、环境 `#id`、`lean` 属性、书面证明字段与既有 `{#sec-...}` 锚点；双语同步更新 `SUMMARY.md` 层级、一级／节内显示编号、同章顺移子节编号及交叉引用文字，并通过 `./tbook check --book quantum-geometry` 与受影响格式构建核验。
5. **静态图（`books/<slug>/figures/<name>.py`）按模板技能 `skills/book-figure` 制作**，成品示例是 `books/example-monograph/figures/`：
   - **一张图只讲一件事**，由脚本按数学生成（`./tbook fig new|build|shots`），只写颜色角色、不写色值；每种语言一版标签，随深浅主题与印刷版变化。颜色与用语同交互页面（青色=线、内积、留在里面的；品红=面积、外积、逃出去的；琥珀只给当前的态与当前这一步；紫色=转轴、体积、旋子；绿色只给正文用 `lean=` 引用的已验证结论；红色只标开放问题；见 `skills/local-viz-cards/SKILL.md`）。
   - **节内图**命名 `chNN-<主题>`（序曲 `prelude-…`，终章 `coda-…`，附录 `appa-…`、`appb-…`、`appc-…`），用 `::: {.figure src="…"}` 放在讲到它的那句话之后、两个段落之间，中英文版本位置与 `src` 相同。图注先用一句加粗的话说出这张图讲的那件事，再只说图里看得见的东西，用与图上相同的颜色词和符号；涉及的定理用 `[@thm-…]` 指过去。图不新增任何定理级断言：文献结果、示意模型与开放问题在图注里照正文的分层写明。
   - **章首总览图**命名 `chNN-overview`，是三栏的“本章地图”（脚本里 `WRAP = True`，手机上三栏叠放）。正文以“图 N 第 I、II、III 栏”引用它（N 为章号），所以三栏的主题与次序以正文的引用为准，图注以“**图 N。**”开头；每一栏只画那一节最要紧的一个图景，不堆公式。
   - 与同章的实验卡分工：实验卡给能亲手推的情形，静态图给印刷版与 EPUB 也要看得见的构造；两者紧邻时不画同一个画面。
   - **章节里的图一律用 `::: {.figure}`** 引用脚本生成的静态图，不放手绘或直接嵌入的图片文件。
   - **媒体块不连排**：静态图、实验卡、视频不三块连排，相邻两块之间要隔着正文，每块紧跟在讲到它的那句话之后。
6. **全书统计作为可选编译产物**：源码不维护全书计数、排名、声明总索引或统计地图的数据副本；正文可用 `.stats` 引用块选择生成视图，按需嵌入表格或链接 HTML、Markdown、CSV、JSON 产物。视图、显示方式与分区由本书选择，中英文逐项对齐；逐条数学证据仍在所属章节给出。确需统计时执行 `./tbook stats --book quantum-geometry --write`，只生成被忽略的 `build/statistics/quantum-geometry.json`，消费者读取编译产物，不把快照、索引、序号表或统计图片提交回源码。站点与导出验证账本继续由构建生成。其他 SVG、幻灯片的 SVG 副本、可视化封面／静帧与 `.stills.json` 仍按消费者生成，不提交；书内 `.gitignore` 明确列出自有输出，`./tbook artifacts check` 阻止回流。锁文件与模板基线继续提交。旧分支的产物修改／删除冲突保留删除，合并源文件后重建；不能把这一规则套到作者正文与锁文件。未变的画面证据按依赖复用，实际改变的画面执行对应测试与看图。详见 `docs/AUTHORING.md` 的“统计与派生产物”及 `docs/SOURCE-ONLY.md`。

## 7. 多智能体协同分工与五路并行工作流

本书库采用“人机协同、专精分工、三席异构审查、五路 Worktree 流水线”方式组织生产（完整细则见 `docs/project/WORKFLOW.md`）：

1. **五元角色分工**
   - **作者与总架构师（Auric）**：提出全书核心几何与哲学命题（两子丈量、球外之球、割圆多面体近似与泰勒余项、毛球定理与 $720^\circ$ 角亏、余弦自指不动点 $\psi = \psi(\psi)$），审定章节脉络与原话题记。
   - **中英双语正文主笔（优先 Gemini，可选，严格仅限文字内容）**：优先使用现有可用的 Gemini 作者；没有可用渠道时，可由 `codex-cli` 或其他可用模型承接，不以特定调用方式或凭据配置作为写作前置。正文作者角色仅负责本书的中英文学术专著与教材纯文字/散文内容撰写与修订，严格对齐冻结的 Lean 4 定理签名。**严禁**使用 Gemini（含主代理与 `self` 子代理）编写或修改任何非文字内容（包括但不限于 `viz/` 交互可视化、`films/` 视频、`figures/*.py` 静态图脚本、测试代码、工具脚本、构建与 Git 变基/归并/PR 工程操作）。
   - **辅助工程与形式化对齐**：负责冻结 Lean 4 定理核验、静态图脚本（一律按第 6 节第 5 条由脚本生成，`figures/<name>.py`；`assets/` 只放照片一类确实不能由脚本画的图片）、第七部 Python 几何代数参考引擎、`./tbook` 工具链构建检验、Git Worktree 管理及上游模板修复 PR。签名与状态直接读取所钉源码和冻结声明，不生成批次规格书或声明摘录副本。
   - **交互可视化与讲解视频（`claude` CLI · Opus 5.5）**：直接通过命令行调用 `claude` CLI（`claude -p --model opus ...`，**禁止使用 Claude Subagent**），严格按照 `books/example-monograph/` 示例框架完成全部交互可视化（`books/quantum-geometry/viz/<id>/`）与讲解视频（`books/quantum-geometry/films/<name>/`）的实现与测试。
   - **三席异构独立审查（`/sshx` `review_triplet_workers`）**：每批次由 `architecture`、`quality`、`tests` 三席独立审查；第一轮（Round 1）采用 `1 nyxid-oracle + 1 codex-cli + 1 isolated-token-subagent`，第二轮及后续复审（Round 2+）禁用响应较慢的 `nyxid-oracle`，采用 `2 codex-cli + 1 isolated-token-subagent` 高速完成修复验证闭环。
2. **五路 Git Worktree 流水线**：最多并行开启 5 个 `git worktree`（主仓库 `wt1` 及 `wt3`–`wt6`），使当前批次的审查/修复与后续批次的源码核验、正文写作和可视化/视频制作并行推进、互不阻塞。

## 8. 持续模型研究

使用 [skills/local-assumption-research/SKILL.md](skills/local-assumption-research/SKILL.md) 接续模型假设研究。skill 提供可泛化的研究方法，不内置具体假设清单、编号或登记系统；可采用的实质成果按归属分别落地——推进正文主线的按第 2 节与根级守则第 12 条归位融合进对应浅层主章，大块技术证明链与参数族变体直接下沉对应的 `[numbering.unnumbered]` 专题附录，其余阶段性或铺路性成果留在上游正式源码与认领 Issue，严禁把持续研究写成章末追加的流水账或在编号主章内层层套娃拆页。开始长推理或研究前按[贡献规范](CONTRIBUTING.md#长推理与研究)查重并在 Issue 认领具体问题，结束时在同一 Issue 记录结论、残余问题与验证结果，及时关闭已结项的 Issue，遵守第 11 节，不另建研究报告。研究同时推进可证明的数学结构、有效近似误差与可检验物理后果；基本假说和哲学诠释保留其身份，不因相邻数学定理已验证而自动升级。跨仓库成果先在 `trureturing` 合入并冻结，再钉版回写本书，两个仓库的数学状态与发布状态分别说明。

## 9. 导出页面按需查看

普通 HTML/PDF/EPUB 修改先运行 `./tbook check`、受影响格式的构建及适用的自动检查；没有相关异常、任务也未要求视觉检查时即完成输出验收，不默认截图、拼图、逐页阅读或遍历中英／深浅主题／桌面手机组合。公式或表格改动仍构建对应格式，但不单独触发看图。

仅在构建或自动校验出现相关错误、警告，或任务明确要求视觉／版式检查与修复时，按 [book-export](skills/book-export/SKILL.md) 排查受影响页面；修复已知可读性问题仍核对问题处。可视化舞台、实验卡与静态图保留第 6 节及各自 skill 的看图要求。内容准确性审查继续阅读源文、核对声明与独立计算，普通导出页面的视觉检查按本节触发，不另设默认全套看图要求。

## 10. 本地与 CI 按改动范围测试

常规验证只测本次改动影响的部分，本地与 CI 使用相同的影响选择规则。先运行 `./tbook test --list` 核对改动、测试与浏览器套件清单，再运行 `./tbook test`；基准默认是 `origin/main` 的分支点，`--base <ref>` 可指定。正文改动只触发相关章节实际引用的实验室及显式读取正文的测试；单个媒体改动只测对应媒体，共享运行时改动覆盖其实际依赖者。若清单因模板、工具或共享运行时改动扩展到大部分或全部浏览器套件，立即停止本地执行，交给 CI 的并行矩阵验证，禁止在开发机上串行跑完。

**只改正文文字时本地不运行测试。** 改动仅限章节 Markdown 的文字（叙述、公式、定理环境及其 `lean`、`status` 等属性、交叉引用），以及为解析其中 Lean 引用而由 `./tbook pin` 更新的锁文件时，本地验证只做 `./tbook check --book quantum-geometry`（0 错误）与写作 skill 要求的构建，不运行 `./tbook test`，也不为此安装浏览器或导出依赖；`--list` 选中的浏览器套件、影片、幻灯片与导出检查由 PR 的 CI 按同一选择规则执行，PR 的验证一节写明这一点。增删或修改媒体引用块（`.figure`、`.viz`、`.film`、`.slides`），或改动可视化、静态图、视频、幻灯片、工具、主题与工作流，不属于此例，仍按上一段在本地运行所选测试。

PR 在实际合并树上按相对第一父提交的文件变化选择任务；主干推送使用事件的起止提交。只有选中的任务才分配运行器、安装工具和恢复构建缓存。钉版提交变化会影响把它写入画面的影片；仅用钉版改写链接的可视化保留证据检查。PDF 与 EPUB 只为截图输入或所引用卡片发生变化的页面调度静帧分片，所需图片缺失时由导出任务补齐。

只运行可视化时，`node tools/node/viz-test.mjs [book ...]` 同样默认只测受影响套件；书名仅过滤范围，`--list` 先列清单，`--base <ref>` 更换基准。没有受影响套件时不启动服务器或浏览器；缺少比较历史时补充基准，不自动转全量。`--full` 仅用于明确要求的全量验收，`--slow` 仍只作用于所选套件。新增或扩展套件时须在 `books/<slug>/viz/tests/dependencies.json` 登记完整的额外读取；漏登记会使无关改动也保守选中该套件。

浏览器测试、截图、静帧和人工看图都限受影响对象，输入未变且范围仍适用时复用既有证据，不默认遍历全部实验室、章节、语言、主题或屏宽。只有时钟、异步等待或已知慢帧问题需要 `./tbook test --slow`；全量测试仅在明确要求时用 `--full`。工具修改不再要求全目录单元测试；结构检查限受影响书籍，构建限受影响格式。第 6 节与第 9 节的看图要求均在本范围内执行。

审查人员同样只运行改动及依赖相关的数值、构建、浏览器和视觉检查；历史检查中未变部分可以按依赖关系复用，不以固定测试数量或全套重跑作为接受条件。

## 11. 文档准入与过程产物禁令

**目标：项目文档只保存持续有效、会被实际使用的操作约定；任务的交付物是正文、源码与必要证据，不是另一份工作报告。**

`docs/project/` 采用文件白名单，目前只保留 [WORKFLOW.md](docs/project/WORKFLOW.md)，用于说明协作、交接与合入流程。项目规则统一写在本文件；章节命名、统计、导出等共享规范链接模板文档，不在项目目录复制。只有用户明确要求新增需要长期维护的独立文档时，才在同一改动中扩展白名单、说明用途和维护位置；日常执行任务不得自行扩展。

以下内容禁止在仓库内自动生成、恢复、续写或提交，禁令同时覆盖未跟踪文件，不得通过改名、换目录、拆分、合并或归档绕过：

- 按日期、章节、PR、批次或会话生成的研究笔记、研究报告、工作计划、进度总结、交接材料、缺口台账和后续目标清单。
- 修订准确性台账、修订实施记录、PR 整合记录、阶段性校对报告、排版复核报告、验收日志及同类历史状态文档。
- `spec-batch-*` 批次规格书、Lean 签名摘录、冻结声明目录、钉版／统计快照，以及正文、锁文件或上游源码已有信息的副本。
- 只服务于一次探索、验算或检查的脚本、输出与截图；不得放进 `docs/project/`，也不得移到书稿或 skill 中充当长期源码。

正式回归测试、出版契约要求的画面证据、构建产物、锁文件、稳定编号和模板基线继续遵循各自契约，不属于上述过程文档。

信息按用途直接归位：

- 已可靠论证且适合出版的内容按写作与验证契约及第 2 节要求归位融合进入对应双语章节（纯技术细部归附录）；形式化成果在上游维护，书库只引用冻结声明。尚未采用的推导与残余问题在任务回复或已有 PR／Issue 中说明，不为保存过程另建文档，也不把过程流水变相追加进书稿充当正文或为清理文档擅自扩写书稿。
- 一次性检查留在命令输出、CI 与任务回复中；需要临时脚本时使用仓库外的临时目录，完成后移除。只有用户要求交付、确有长期消费者的可复用代码才按所属源码目录及其测试规范维护。
- 可复用的项目决策更新本文件或现有工作流；通用研究方法更新已有本地 skill，不能把具体批次、研究结论或检查历史塞入指引。统计与派生产物继续按第 6 节及 [源文件规则](docs/SOURCE-ONLY.md) 生成。

提交前检查新增文件是否属于明确交付物、是否已有权威来源、是否命中上述禁令，并核对 `docs/project/` 白名单及被删文档的引用。被清理的历史材料从 Git 历史查询，不建立归档目录或清理台账。`docs/CHANGELOG.md` 只随模板版本更新，不作为本书库的修订流水账。

## 12. Issue、PR 与分支规范

本书库与上游模板共用 [CONTRIBUTING.md](CONTRIBUTING.md)、Issue 表单和 PR 模板。Issue 与 PR 标题使用 `type(scope): 摘要`，例如 `docs(ch19): 补充证明的非空条件`；普通工作分支使用 `<type>/<lowercase-topic>`，例如 `fix/ch19-proof-scope`。模板升级和冻结声明钉版保留贡献规范列出的自动化分支。所有修改通过 PR 合入 `main`，等待适用的 CI 与命名检查通过；规则同样约束管理员。跨仓库事项附完整上下游链接，并分别确认完成。

## 13. 正确且取最强：数学断言的处理标准

**目标：每一句数学与逻辑断言都为真；在为真的表述里取数学上最强的一个。** 作者的原话是“只要是正确的逻辑就可以”“用数学上最‘强’的表达”。逐条表述的取舍不需要作者裁决，按本节处理；题记是作者原句的引文，仍按第 2 节逐字保留。

1. **最强的含义。** 假设取最弱，结论取最强；等价或完全分类成立时写等价或分类，不停在单向蕴含或存在性；常数、界与适用范围写到精确，并给出假设不可去掉的例子。强弱按蕴含判断：改后的句子须推出原句，或在原句为假时取代它；篇幅更长、措辞更一般不等于更强。
2. **不超出证据。** 一句话能写多强，取决于第 4 节的证据：Lean 冻结声明、带出处的书面证明、文献结果与手工推导各按其层标注。定理盒条目与所引 Lean 声明的前提、定义域和结论一致，声明没有陈述的内容移到盒外并标注其真实依据；绿色标签只贴在声明实际陈述的句子上。由几条声明组合才得到的结论，组合一步标 `手工推导`。
3. **原文正确时只补证据。** 不为迁就已形式化的陈述而改写正确的句子；上游已有对应冻结声明的，补上引用，并在证据允许时把表述加强到该声明的强度。
4. **原文有误或言过其实时直接更正。** 改为能证明的最强正确表述；不保留已知为假的句子，也不把它弱化成空洞为真的说法。改动尽量小：保留作者的行文、标题、图与论证次序；诠释（`MODEL`）不因其是诠释而删除，只需标明身份、不写成推导。两句相互矛盾时改正确的一侧；凭正文与所引来源判断不了哪一侧正确时不猜，保留原文并在 PR 中说明。无法离线核实的经验数值不改，列入后续事项。
5. **需要新定理时先上游、后回写。** 最强的正确陈述尚无冻结声明时，先在 `trureturing` 按其规则形式化并冻结（[theorem-formalize](skills/theorem-formalize/SKILL.md)），再回写本书；在此之前正文按现有证据标注，不提前升级标签。上游判定只是已有结果的改写、不新增声明的，正文保持 `手工推导` 或直接引用已有冻结声明。
6. **逐条交代。** 每处实质更正在 PR 描述中按“原文 → 改后 → 为何为真 → 依据”列出，补引用与改标签分列；中文先改，英文同位置对齐，环境序列不变。可视化与静态图的图注随其页面一并修改，口径与正文一致。

## 14. 已知外部形式化事实：黎曼猜想（RH）与狄利克雷广义黎曼猜想（GRH）

本书库将**经典黎曼猜想（RH）**与**全体狄利克雷 $L$ 函数的广义黎曼猜想（Dirichlet GRH）**登记为**已确立的外部形式化数学事实**，供全库写作与后续数学推理直接作为已知前提使用，不再将二者表述为“尚未解决的开放猜想”：

2026 年 11 月 21 日，Lean 与 Mathlib 社群发表了由 Lean FRO 和 Mathlib Initiative 背书的联合声明，认证 Alpöge 对经典黎曼假设的命题与证明均正确。两种独立工具 `comparator` 和 `con-leche --compare` 均确认库中所证命题与仅导入 Mathlib 时陈述的 `RiemannHypothesis` 完全一致。[Lean 与 Mathlib 社群联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)

经典黎曼猜想与狄利克雷广义黎曼猜想的 Lean 形式化主仓库由 Lean 社群维护。[leanprover-community/riemann-hypothesis](https://github.com/leanprover-community/riemann-hypothesis)

1. **原版出处、复现仓库与终端声明**：Levent Alpöge 于 2026 年 11 月 20 日在 [`alpo.ge/remark.pdf`](https://alpo.ge/remark.pdf) 公布覆盖 RH 与狄利克雷 GRH 的 Lean 4（`v4.33.1` + 固定官方 Mathlib）形式化证明（175,187 个模块）；本组织维护的可复现构建与分片分发仓库为 [`the-omega-institute/riemann-hypothesis`](https://github.com/the-omega-institute/riemann-hypothesis)（公开重放表与构建工作流见提交 [`b14f2bd19e5e`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/README.md#public-kernel-replay-results) 及 [`6977b88c83a1`](https://github.com/the-omega-institute/riemann-hypothesis/blob/6977b88c83a1254561b4d79476211d7a7ed945d7/README.md#public-kernel-replay-results)），其中 [`src/Statements.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Statements.lean) 定义所用命题，[`src/Main.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Main.lean) 导出五条终端定理：`riemannHypothesis : RiemannHypothesis`、`riemannZeta_eq_zero_re : RiemannZetaZerosOnLine`、`LFunction_ne_zero_of_half_lt_re : DirichletLNonvanishingRightOfHalf`、`LFunction_eq_zero_re : DirichletLZerosOnLine` 与 `LFunction_eq_zero_re_of_isPrimitive : PrimitiveDirichletLZerosOnLine`；本组织配套双语导读专著 *Symmetry on the Critical Line: How the Riemann Hypothesis Is Proved* 见 [英文线上版](https://rh.trureturing.org/riemann-hypothesis/en/) 与 [`the-omega-institute/riemann-hypothesis-book`](https://github.com/the-omega-institute/riemann-hypothesis-book)。
2. **全球多方独立内核重放与公理审计**：仓库固定的源码静态扫描（[`verification/static-scan.txt`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/verification/static-scan.txt)）确认全库不含 `sorry`、`admit`、`opaque`、`native_decide` 或自定义 `axiom`；五条终端定理的公理审计（[MIT `audit.log`](https://math.mit.edu/~drew/grh/audit.log)）确认其公理闭包仅含 Lean 标准三大公理 `{propext, Classical.choice, Quot.sound}`。截至 2026 年 11 月 21 日，全球多支独立团队已在不同机器与多个独立内核上完成重放验证：
   - **Andrew Sutherland（MIT）**：`leanchecker` 与 `lean4lean`（含五枚提高步数上限后通过的模块）零拒收重放全部 `175,187` 个模块；独立 Rust 内核 `nanoda` 与 `con-leche --verified` 接受完整导出产物，另行运行的 `con-leche` 对照纯 Mathlib 挑战确认全部五条定理成立（[运行报告](https://math.mit.edu/~drew/grh/) · [五定理公理审计](https://math.mit.edu/~drew/grh/audit.log) · [lean4lean 复核](https://math.mit.edu/~drew/grh/lean4lean-raised-fuel.log) · [nanoda](https://math.mit.edu/~drew/grh/nanoda.log) · [con-leche 命题比对](https://math.mit.edu/~drew/grh/con-leche-compare.log)；截至 2026 年 11 月 21 日 12:55 UTC，其状态页仍将端到端 `lake comparator` 以及导出物的默认与 paranoid Lean 内核重放列为进行中）。
   - **`mrubinst/grh-lean-verification`**：独立构建并通过 Lean 4.33.1 `replayFromImports` 逐模块复核全部 `175,187` 个模块，成功重放清单与编译清单 175,187 / 175,187 完全一致（[独立重放记录](https://github.com/mrubinst/grh-lean-verification/blob/cd2dad86c884ab17f348189edae2e5c3248533a9/replay_summary.txt)）。
   - **Elliot Arledge 与 Luis Rivera（两套独立构建）**：二者导出的五定理归档文件具有逐字节一致的 SHA-256 校验和 `4301ce4828d397c728e87f3e6a1251aa42abe5e12809bb9e0b73cc3d33072e7e`，各自独立运行的 `nanoda` 均零错误通过全部 `1,484,729` 条声明，Rivera 并附公开的纯 Mathlib 挑战 `con-leche` 比对结果（[Arledge 回执](https://github.com/Infatoshi/rh-verification-receipts/blob/ac99f18cef21952de094234fab95db342ed16638/VERIFICATION_RESULT.txt) · [Rivera 校验和](https://github.com/chubakueno/riemann-lean-verification/blob/975074872445beee5af4ea2d8e296b4b59f1d592/evidence/export/main.ndjson.sha256) · [Rivera nanoda](https://github.com/chubakueno/riemann-lean-verification/blob/975074872445beee5af4ea2d8e296b4b59f1d592/evidence/nanoda/nanoda-out.txt) · [Rivera con-leche](https://github.com/chubakueno/riemann-lean-verification/blob/975074872445beee5af4ea2d8e296b4b59f1d592/evidence/con-leche-compare/compare-out-windows.txt)）。
   - **LUMI 超算团队**：全沙盒构建全部 `175,187` 个模块最终零失败（含 718 次重试），产出 `Main.olean` 的 SHA-256 为 `9146dfb4148e24d2252e04c50742f3e49dd126dfcc5006d10bf5f873ddf796ad`，与 MIT 构建完全一致（[LUMI 构建记录](https://github.com/aapolipponen/rh-lean-check-lumi/blob/82d91dbbd04d71f2cb45c3f2898f421b91c1c9d7/results/build-summary.json)）。
3. **本书库的证据分级与写作口径**：
   - 后续推导可直接引用参考库已经证明的算术定理。正文写明所用 Lean 声明及其在本书论证中推出的那一步。
   - 因该外部证明尚未合入并冻结在 `the-omega-institute/trureturing@dev`，RH 与狄利克雷 GRH **不**使用本书库的绿色 `LEAN ✓`（`lean=`）徽章，也不以未展开的二十五万页自然语言稿冒充 `status="written-proof"`；正文将其作为**外部已核验形式化事实**（`remark` 或普通段落）明确引述上述永久链接与核验回执。由其结合本书冻结定理或经典分析推得的后续命题，按第 4 节与第 13 节据实标注 `手工推导`、`文献结果` 或 `NUM`。
   - 正式出版物（`books/**`）严格遵守第 5 节的零模型标识铁律：只署名作者 Levent Alpöge、镜像仓库与独立内核重放证据，不写入任何语言模型或智能体名称。
4. **严格范围边界（仍保持 `OPEN` 或 `MODEL` 的事项）**：上述证明只覆盖有理数域 $\mathbb{Q}$ 上的黎曼 $\zeta$ 函数与全部模 $N \ge 1$ 的狄利克雷 $L$ 函数。以下命题**不由** RH 与狄利克雷 GRH 推出，在本书库中继续严格保持各自身份：
   - **仍为数学开放问题（`OPEN`）**：一般代数数域戴德金 $\zeta_K$ 函数的扩展黎曼猜想（ERH）、高阶自守 $L$ 函数的全广义黎曼猜想（Grand RH）、零点单重性猜想（$\zeta'(\rho) \neq 0$）、蒙哥马利 GUE 对关联猜想与希尔伯特—波利亚自伴算子构造、梅滕斯无余量界 $M(x) = O(\sqrt{x})$、乘性子树移位纠缠面积律（`prob-ch34-arithmetic-pivot-area-law`），以及不依赖上述外部证明而独立给出乘性舒尔枢轴修饰证明的方法论问题。
   - **仍为物理假说或诠释模型（`MODEL` / `OPEN`）**：玻恩规则、连续统自旋-$2$ 引力动力学（`prob-ch34-gravity-dynamics-and-coupling`）、宇宙学常数 $\Lambda \sim 10^{-122}$ 与过去假设（`prob-ch34-past-hypothesis-and-cosmological-constant`）、标准模型手征反常抵消与规范耦合统一阈值（`prob-ch34-sm-generations-and-couplings`、`prob-ch39-af-gut-threshold-and-proton-stability`），以及三元数场网络的大规模实证性质（`prob-ch39-tft-scale-and-seams`）。不得把纯数论定理越级包装为对这些物理假说的证明。

## 15. 迁移到纯 Omega 数学

trureturing `dev` 的 `OmegaInit` 与 `OmegaMath` 是不依赖 Mathlib、零公理的严格库。书中凡能用它陈述、且换过去数学内容不变的形式化结论，逐步改为引用冻结行 `libraries` 为 `{OmegaInit, OmegaMath}` 的非空子集、`axioms` 为 `[]` 的 D5 声明（“仅 Omega · 零公理”）。需要实数、复数、极限、测度、拓扑或赋范空间的结论不在此列；把它们改写成有理数版本是作者的写作决定，不算迁移。上游一律走 trureturing `CLAUDE.md` §3.2 的“OmegaMath 的 D5 出版引用”：项目自己的数学进 `src/OmegaMath/`，钉版 Init 和 Mathlib 的严格移植分别进 `strict/OmegaInit/` 和 `strict/OmegaMathlib/`，书用结论放在只导入 Omega 模块的 `prelude` D5 模块，合入并冻结后再回书改引用。方法与盘点脚本见 [skills/local-omega-migration/SKILL.md](skills/local-omega-migration/SKILL.md)；批次、复核结论与进度只记在追踪 Issue [#1217](https://github.com/the-omega-institute/trureturing-books/issues/1217)，遵守第 11 节。
