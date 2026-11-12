# 第 29 章准确性修复记录 · 2026-11-12

本文件采用追加记录方式；本次是两次有限实施额度中的 assignment1，剩余 **1** 次留给实际外部依赖及当前主线整合和最终产物闭环。本次状态为 **fixed pending review**，不是第 29 章整体内容批准，也不改变历史汇总账本。

## 输入、范围与对应

- 指定工作目录：`/Users/auricstudio/trureturing-books-ch17-ch20-20261112`；指定分支：`fix/content-accuracy-ch29-20261112`。输入 HEAD 为调用方提供的 `e4455e5974f48d9357cdc4ff2ccc1c565c6cf9ab`；本次未执行 Git/GitHub 或目标生命周期操作。
- 当前出版目录为 44 个单元、39 个编号章节；两种语言的实际 `SUMMARY.md` 均有 39 个不同的编号章节。原始 35 单元审计集合保持不变；第 31–39 章属于新增出版依赖，不计作已审单元。
- 当前冻结 pin：`1d9bf98cab8306e67ec38a739359f2cdae63877a`。未改锁、Lean、托管文件、工具、主题、共享运行时、测试、静态图、实验卡静态图或媒体注册表。
- 本次只实施已确认 F02、F03、F04、F05、F06、F16，以及章首当前全书章数 32→39；先修中文，随后同步英文。其他问题不扩入本次。
- 已核对调用方给定的 `ch29-current-e445-correspondence.json`：实施前两种正文散列与当前对应记录相同；反向还原唯一的 30→32 计数替换后，与先前 d170 正文逐字节相同。28 个范围内 GID 的行号、种类、声明摘要与同 pin 的先前源码图谱相同。复用的是未变正文及源码核查证据，不是先前批准；先前 intake 没有批准修订。
- 只使用调用方许可的先前 intake 结论；未查看其诊断正文、其他工作者结果、受保护分支或活动工作目录。根级用户便笺未读未改，环境链接保留。

## 已确认修复与独立依据

| 项目 | 稳定位置 | 本次最小修复及依据 |
| --- | --- | --- |
| F02 | `sec-coda-finite-observer-time-field` | 在二面角定义及边界/内部两条充要关系之前加入 `0 < θ₁, θ₂ < π`，保证两旋转平面非退化。直接构造三个笛卡尔单位向量、展开 3×3 行列式，得 `det G = sin²θ₁ sin²θ₂ sin²φ`；域内系数严格正。七个算例包含 φ=0°、90°、180°、37°、251°及 θ₁=0°、180°退化点。θ₁=0°、θ₂=60°、φ=90°时行列式为零而参数余弦为零，且第一平面未定义，说明原定义域缺失确实影响充要关系。 |
| F03 | `rem-ch29-feynman-stationary-phase-literature` | 明确“半经典、相位快速振荡的驻相近似”，改为非驻相贡献受抑制、驻相轨线邻域主导；保留紧随其后的作者 `MODEL` 诠释。反例积分 `∫₀¹ exp(ix/ℏ)dx = (ℏ/i)(exp(i/ℏ)−1)` 在一般有限 ℏ 不为零，而模长≤2ℏ；ℏ=1、0.1、0.01时模长约为 0.958851、0.191785、0.00524750，显示抑制是渐近意义。 |
| F04 | `rem-ch29-elliptic-torus-literature` | 概述和具体构造两处均区分单条圆锥曲线与射影三维空间 P³ 中的两个二次曲面；具体构造注明齐次化。以 `[a:b:c:t]` 写出 `(a+b)²−c²−4dt²=0`、`(a−b)²−c²+4dt²=0`，等价于 `a²+b²−c²=0`、`ab−2dt²=0`。d>0 时两梯度在交线上独立：t≠0 时若相关，会迫使 a=b=c=0，与第二式矛盾；t=0 时 ab=0，与第一式合用可直接检查独立。完全交的次数为 4，伴随公式 `2g−2=(2+2−4)·2·2=0` 给出亏格 1。保留现有双有理公式；代入 d=ab/2 后残差 `dy²−x³+x=(a+c)(a²+b²−c²)/b³` 为零。五组有理数精确验算包括 (3,4,5)、d=6、x=2、y=1、X=12、Y=36。 |
| F05 | `rem-ch29-four-tier-sphere-table` | 仅将 Q̄ 标签改为“代数数 / Algebraic Numbers”；√2、φ及其他表格内容不变。1 是 x−1 的根，i 是 x²+1 的根，故 Q̄ 包含有理数及非实代数数，不能标成代数无理数。 |
| F06 | `rem-ch29-arithmetic-geometry-literature` | 仅修正四位作者 2011 年论文的期刊、卷期页码为 *Publ. Res. Inst. Math. Sci.* **47**(1), 29–98 (2011)。独立获取 [Crossref DOI 记录](https://api.crossref.org/works/10.2977/prims/31) 与 [EMS 出版社记录](https://ems.press/journals/prims/articles/4468)，两者均给出 Barnet-Lamb、Geraghty、Harris、Taylor，题名 *A Family of Calabi–Yau Varieties and Potential Automorphy II*；出版社摘要明确提及 Sato–Tate。 |
| F16 | `viz/timeless-causal-crystal/index.html` 的 Lagrange 依据抽屉 | 双语均改为“主子式是面积平方；半宽是两个主子式乘积的平方根，等于两块楔积面积的乘积”。θ₁=60°、θ₂=45°时主子式为 0.75、0.5，面积为 0.8660254038、0.7071067812，半宽为 0.6123724356957945；原错误说法给出约 0.7825422900。只改这一抽屉行的文字，不改动力学或数值实现。 |
| 当前计数 | `sec-coda-pythagoras-all-is-number` 首段 | 只将中英“全书 32 章”改为当前目录的 39 章；未扩展内容审计范围。 |

F16 另行新取精确 pin 上的 `D5/S3/QuantumBounds/LagrangeGramIdentity.lean` 与冻结状态，核对有限指标集上的实值 u、v 及完整求和恒等式；单位向量面积解释忠实于该式。源码 SHA256 为 `bc0067057cc6a5d2c4ddb7b2f330e6e17a268c0ddc2a0bb72dbb7e82b88f6672`，冻结状态 SHA256 为 `d339d581826040a45edf5a7f5a96364ba5706c245501f524400a00bb34008ae7`，statement_id 为 `sha256:ce9562e56d7264395e32b93db2bc4693a5f10348f777655ba261453542ca8f44`。28 项范围锁切片的规范 JSON SHA256 为 `dba1f28634c78d73c8b66eb9f0cebea92f98cf427b3beddfcc5b6b960651c614`。

## 文字、形式边界与媒体保留

每种语言相对输入均保留 9 个形式块、8 个证明块、3 处 blockquote（含作者题记）、15 个标题的逐字节内容；全部环境/媒体序列、稳定 ID 与 GID 不变。原有 1151 个数学片段顺序保留，只增加 P³ 和定义域所需片段。作者节奏、比喻及后续 `MODEL` 归属不作风格改写。

实验室文字修改由直接命令行实施完成，终态退出码 0、成功结束，未派生子任务；只获准读写指定 index 文件。终态会话标识 `a732f41d-5970-4039-8d38-d89e38fc9e4a`，开始时间 `2026-11-12T00:20:19.518955+00:00`，执行约 12.036 秒，终态用时 11321ms，4 轮，权限拒绝与安全中止均为零。完整终态元数据留在本次外部证据目录，不写入出版源码。

抽屉之前的舞台/卡片标记、main.js、style.css、共享运行时及已有静态图逐字节未变。抽屉不属于截图/静态图捕获舞台，故本次没有重生成不受影响的封面或卡片静态图；实际桌面、手机抽屉另行截图检查。

## 当前检查与实际阅读

- `./tbook check`：0 错误、0 警告；交接前在本记录加入后再次执行。
- `TBOOK_CACHE=0 ./tbook build html --book quantum-geometry` 及 `TBOOK_CACHE=0 ./tbook build pdf epub --book quantum-geometry`：两种语言 HTML、四份 PDF、两份 EPUB 均重新构建成功，未复用旧整书导出。
- `node books/quantum-geometry/viz/tests/timeless-causal-crystal.test.mjs`：95/95；`VIZ_SLOW_FRAMES=1000` 同一测试再次 95/95。已有独立 42 组 Gram 情形、动力学、完整状态放大和 `stageFirstChecks` 均通过，未增加照抄文案的测试。
- 官方 `viz-shots` 七种默认画面和额外中英桌面/手机抽屉四种画面均已查看。当前站点抽屉也在 1440px/390px 中英四种组合查看，无页面异常或横向溢出。
- `./tbook fig build --book quantum-geometry --check ch29-overview ch29-pell-seam ch29-four-tiers ch29-mod-four-dial ch29-gram-window`：5 图、0 过期、0 错误；10 份中英 SVG 的 XML 与内部引用检查均通过。
- 两份当前 EPUB 再次通过 EPUBCheck 5.3.0：0 错误、0 警告、未跳过；每份解析 223 个 XML/XHTML/OPF/NCX/SVG 文件。从真实 EPUB 提取第 29 章 `EPUB/text/ch039.xhtml`，在 Chromium 查看中英曲面/驻相/定义域六个画面，MathML 正常、无页面异常；这不代表 Apple Books 实机检查。
- 四份 PDF 共检查 32 页相关画面，未见检查页的源码泄漏或文字越出页面。中文 screen 共 869 页，查看 575/581/589/590/594/602/603/604；中文 print 共 908 页，查看 603/609/617/618/622/630/631/632；英文 screen 共 924 页，查看 594/600/609/610/614/622/623/624；英文 print 共 958 页，查看 618/624/633/634/638/646/647/648。
- `TBOOK_FILMS=skip TBOOK_CACHE=1 TBOOK_CACHE_REMOTE=0 ./tbook build site --book quantum-geometry` 成功，8 项视频未构建提示如实保留。站点构建附带生成的双语 39 页演示文稿及其 PDF 只记为产物完成，不赋予内容批准。
- `./tbook serve --port 8799` 下实际阅读第 29 章：中英 ×1440px/390px ×navy/light 共 8 种组合，六个修复位置共 48 个画面，无主文 KaTeX 错误、坏图、页面异常或文档横向溢出。主题菜单关闭后重新截图并查看。
- HTTP 下载的四份 PDF/两份 EPUB 与 `build/dist`、站点 downloads 逐字节相同。站点实验室 index 等于当前源码经现有 `viz.pin_links` 处理的结果，main.js/style.css 相同；站点章 HTML 与新构建 HTML 的差别仅为正常视频 fallback 的 `tr-film-unbuilt` 类和 preload `metadata`→`none`。

## 输入与输出身份

| 修订源码 | SHA256 |
| --- | --- |
| `books/quantum-geometry/zh/ch29-timeless-causality-and-gram-space.md` | `e1a1d1b8abc0aba053db348822675d83332dfaccb8b4e08523ec570215b2d8f8` |
| `books/quantum-geometry/en/ch29-timeless-causality-and-gram-space.md` | `f40f72b38fe95ff39075a7ce1faf171b2aee00c8f63c3d56b2956b2246a720d8` |
| `books/quantum-geometry/viz/timeless-causal-crystal/index.html` | `8fd934d8a305e80078ed0805de6240d97589a0ef16f1228ccedb8d6f549d9d10` |

| 当前整书构建单元 | 实际消费输入 key |
| --- | --- |
| HTML zh | `cfddb52b35c91023dc5d226a710e6d1f3646fc2c8747f101ebc16b2a6b440996` |
| HTML en | `4585c5323024fe506351ac69058aba523d31ed9356a906eb9882c4fe99abc9dd` |
| PDF zh screen | `62a6252b7b65f22849073b97556f3081ed1b3e0d159df2658428af57ef327924` |
| PDF zh print | `06e0a0b076ca8871341e02255e43154c30394e60baf8edd57f63dc316a80c92f` |
| PDF en screen | `fbc682d008dd3769934abaceb044cf0814694ebfb9337e62b29808e9bbff3b8e` |
| PDF en print | `9f631c28cee1ab2eda98cf9d369b735addb1b5319c77bd400d2cff84c84fc89f` |
| EPUB zh | `29653c7a77018c06773eae9c5b159c3861882de7b9c12e0e8c85a0878388b408` |
| EPUB en | `ee9e31269b648fc039fa7dfbfd3590f68b56d453668cd1431a59b82ffe98d526` |

完整消费路径/散列清单与 20 项输出散列位于本次外部证据目录 `/tmp/qg-ch29-assignment1-20261112/current-input-output-identity.json`。结束前重新核对全部 1376 个不同的实际文件输入及 20 项输出，均与清单一致；环境值另通过现有构建单元 key 核对。该目录同时保存独立算术、来源响应、保留性比较、检查结果及阅读截图，不是新验证框架。

| 当前下载产物 | SHA256 |
| --- | --- |
| zh screen PDF | `732eaa703021d286b1c17b57cc86f86061a538f586d5009758ba7a6af8e210a0` |
| zh print PDF | `b8dac1638a7ca704ffd54d9585e60a3b7b975c776c7825f953911838fdb4e690` |
| en screen PDF | `d99b40539736e0f17d3f1ff304b76ac832ebd326d5b39f64d369a963e8e501a3` |
| en print PDF | `243e2b58c749e5ba57a65614b734f56f530491a62896bff46db52a383fd9f83b` |
| zh EPUB | `66d4c59a3290c70424654f26039838d936acac3cd4a21fea9f7a9e1433170b59` |
| en EPUB | `ed3d7800f50559b661c43ad27627e3d2caa5f96f4abd655b8b6c25ab21264a2f` |

## 复用边界、实际失败与待办

当前整书产物来自 44 单元输入；构建与格式检查不能替代第 29 章或其他单元的内容批准。旧整书导出不复用；先前结论没有逐项媒体散列，不能由正文相同推称旧媒体画面已批准。输入清单覆盖的源码、工具、主题与资源本次除三份指定源码外不变。

film008 是未变的源码/数学依赖：已核对当前 60°/45°固定情形及半宽文字，源码、poster、运行时相对本次输入未变。其实际消费输入 key 为 `48b90ce3093fd13fdacbb96bde7d415c1a9fc251a49a8bc9f1019132c658b9ae`，本地没有对应视频缓存；没有为时间戳重渲染影片或音频。本地读者看到 poster 和“视频未构建”提示，故没有播放、音频或时序验收结论。

系统 Python 最初探测字体报 `ModuleNotFoundError: No module named 'typst'`；换用项目既有 `.venv/bin/python` 后原生发现成功，已有 Noto Serif SC、Noto Sans SC、Chakra Petch、JetBrains Mono，未使用控制字体配置、未安装任何共享依赖。原生 PDF 构建时 pypandoc 的 bundled 可执行文件先报 `OSError: [Errno 86] Bad CPU type in executable`，既有库随后正常回退到 PATH 中 Pandoc 3.9 并完成构建；未改工具规避。其余工具版本：Typst 0.15.2、mdBook 0.5.4、Node 25.8.1、EPUBCheck 5.3.0。

一次性 EPUB 证据脚本最初误用 `report.ok`，报 `AttributeError: 'EpubReport' object has no attribute 'ok'`；改用实际 API `report.valid` 后两份均复验通过，产物本身没有该错误。HTML 对应脚本最初漏计视频 preload 的正常差别，核实实际差异后修正比较并通过。以上属于检查调用问题；对普通读者的实际限制是未构建视频提示。未执行实体手机、Apple Books、CI 或已部署站点检查。因禁止 Git 操作，用新增行尾空白检查替代 `git diff --check`，正式候选的 Git 检查由生命周期负责人完成。

Pythagoras 的 F14/F15 和负半径问题仍由 PR127 独立负责；本次不检查该活动工作目录或结论，也不重复修改其源码、测试、静态图或注册表。当前官方 Pythagoras 仍是已知待修来源；当前导出因此不构成完整媒体通过。PR119 及其指定 head 独立保留且未查看。

剩余 assignment2 只用于实际依赖到位后的当前源码对应、必要整合与最终输出验证，不自动扩充问题范围。若当前主线改变，须比较最终正文、pin、相关媒体/工具/资源和消费输入；不能把本次 44 单元产物冒称后续版本产物。新 coda 及新增章节内容仍由其他工作负责。

调用方继续负责 staging、commit、push、draft PR、initial R1 三席独立审查、后续复审、当前 CI、merge、Pages；正式候选须与本次修订散列建立对应。所有阻塞问题及依赖闭环后再作批准，本次不返回批准结论。历史 original35 汇总和未审单元状态不改。
