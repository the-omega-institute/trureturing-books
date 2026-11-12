# Chapter 30 内容准确性局部修正 · 2026-11-12

## 身份与边界

原目标 ORIGINAL35 不变。本次是两次有界实施中的 **assignment 1/2**，完成后恰余 **1 次保留的最终依赖/输出实施**；不重置任何先前额度，不构成全 35 单元完成或批准。输入 HEAD 为 `38d4170af944de421e82e4ea6fa699b9456a5749`，pin 为 `1d9bf98cab8306e67ec38a739359f2cdae63877a`（`dev`），锁 447 条；当前出版 44 单元，新增 ch31–39 仅作依赖。调用方的 official cd4d 整合及其空行增量另行记录，本档不声称已整合该输入。

实施仅在指定 intake archive；开始时逐一比较 intake 明列的 530 路径 SHA256，全部与封存输入相同。哈希证明对应关系，不证明内容正确性。先验为 `repo-prior-exposed`，其余未知/不可控，不作无先验或多样性声明。AGENTS 指向不存在的 CLAUDE.md；已按可用 PROJECT、WORKFLOW、local-content-accuracy 及其完整 style/review 参考执行。本次只作已确认事实纠正，未重写题记、哲学修辞或章节结构。

## 完整 intake 与本次修正的区别

调用方提供的完成 intake（结论 revise，非未来补丁审查）覆盖中文 631 / 英文 632 行、每语言 48 环境及 5 证明；正文 61 GID、媒体 11 GID，合计 64 个不同声明（11 定义 / 53 定理），34 模块 / 68 份完整 exact-pin 源码与冻结片；媒体覆盖四图脚本/辅助、八双语 SVG、三实验室、24 preset、三既有测试及 49 JPG。独立图、代数、流体计算及来源限制均留在原 intake evidence manifest。本次复核了 530 路径身份、受影响双语完整上下文、完整 RelativeSemanticDiagonal 源码与证明、相关文献及局部独立计算；不把旧 intake 当成当前补丁的独立批准，也未展开新的全书审计。

| finding | 当前位置（zh/en） | 最小双语修正与确认依据 |
| --- | --- | --- |
| C1 | rem-ch30-query-sos-literature，第 71 行 | 限于独立均匀抽取互异变量三元组和随机符号、固定且充分大的常数密度；区分 XOR 奇偶等式和 SAT 子句满足的标准布尔多项式编码。Schoenebeck 作者站完整论文《Linear Level Lasserre Lower Bounds for Certain k-CSPs》§2 的随机模型与定理 12 的常数密度特例支持此表述；已补双语原文链接。另独立核对相反 XOR 等式及八个 SAT 不满足指标之和，说明不能删去模型/密度前提。仍按文献结果归属。 |
| C2 | rem-ch30-karmarkar-kasteleyn-literature，第 120 行 | Pfaffian 展开的完美匹配项同号，替换“非平面交叉项相消”。独立四圈反对称矩阵计算给出两个正匹配项、Pfaffian 为 2。 |
| C3 | 五边形着色例开头，第 130 行 | “一个奇圈 / an odd cycle”；三角形已是更小的奇圈，保留全部五边形构造。 |
| C4 | 形式内核核验/顶层规约审计段，第 293 行 | 解码目录覆盖潜坐标上的全部解码函数 / lists every decoder on the latent coordinate space。完整源码中 `decoderCatalog : Address → Coordinate → Output`，满射的余域是函数空间 `Coordinate → Output`；证明用 `complete decoder` 取得列出该解码函数的地址。 |
| C7 | 章末导图指向，zh631/en632 | 删去过时的三十二章计数，保留“全书总导图 / the complete dependency map”；仅字面核对 coda 的当前三十九章导图。 |

Schoenebeck 完整论文来自 `https://schoeneb.people.si.umich.edu/papers/LasserreNew.pdf`，SHA256 `b909449375ade807c55f4992b08ea9c4c57e412605edf947b56a199226c15413`。RelativeSemanticDiagonal 完整源码 SHA256 `2ad84fdc9715efc76d6fe62bb77360d4df5105c174c75f4c3b548e1768678953`，与 intake exact-pin 下载清单及 evidence manifest 一致。新来源解决了旧 intake 的 Schoenebeck 原文不可用限制；未据此扩展其他文献审计。

每语言恰五行更动；题记、标题、环境边界、正式 ID/GID、媒体顺序及证明固定结语保持逐字节相同，其余准确正文保留。skill 只增加一句可复用教训：将定理联系到抽样构造时保留优化/存在量词，可达最优值不保证由展示的样本达到。没有将 C5/C6 的产品修复并入本次。

## 实际验证与不可冒称的结果

- 既有 skill-creator quick validator：`python3 /Users/auricstudio/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/local-content-accuracy`，返回 `Skill is valid!`。
- 直接在 archive 执行 `./tbook check --offline`（既有 Python 依赖只读复用）：**1134 错误 / 499 警告**。archive 只包含封存的 530 文件，其他章节引用的图、实验室、视频、演示文稿缺失；没有授权补齐这些出版依赖。此结果不是通过。
- 将 intake 中经 manifest SHA256 核对的 34 份 exact-pin Frozen state 放入**私有构建副本**缓存，再执行同一既有 check：**1134 错误 / 418 警告**。Chapter30 正文路径诊断为 **0 错误 / 0 警告**，正文 61 GID 的 Frozen 身份、名称、kind、statement 均与锁对应；这不等于全书 check 通过。418 警告为 366 个其余声明未能离线重新验证、1 个分支祖先关系未重验、18 个缺失本地链接、33 个缺失实验室测试。未伪造 ancestry 缓存，未编译 Lean。**要求的 archive-wide 零错误 check 尚未满足，须由完整依赖的最终 assignment 闭环。**
- 使用既有 `tbook.html.build_edition` 为 zh/en 各生成 HTML 成功；没有调用顶层构建的重画图步骤。`tbook.site.build` 生成部分站点后因完整 registry 的缺失实验室返回 SiteError，**完整站点构建未通过**。仅将 archive 已有的三份不变实验室及共享资源按既有发布函数复制至私有站点，以检查 ch30；未生成或更改媒体源码/测试/静帧/锁。所有输出位于私有证据目录，不是当前完整出版产物。
- 通过既有 `./tbook serve --port 18763` 的实际站点挂载路径 `/`，Chromium 检查 ch30 × zh/en × 1440/390 px × navy/light，共 8 组合；五处改句共 40 截图及五张 contact sheet 均已查看。HTTP 200、无脚本错误、无失败 HTTP 响应、无 KaTeX error/fallback、无缺图或整页横向溢出。此观察仅验收修正文段的排版与可见语义；未对不变实验室控件或惰性加载舞台作新批准。预览服务及浏览器已退出。
- 未运行 PDF/EPUB/EPUBCheck、全媒体/整片重渲染或输出验收；这些明确留给最后依赖 assignment。工具与媒体未改，未新增实现镜像测试、工具框架或共享安装。因禁止 Git，本次用保存的输入字节作差异/保护与空白核对，不执行 Git diff。

## 继承与剩余责任

C5/C6 是 **PR119** 的共享 optimum/sample/mincut 家族：正文最大可达秩与当前抽样秩的区别、退化抽样、冻结三项量与完整四图割 `ad, bc, 3ac, 3bd`、3ac 分隔线外腿均由该 owner 完成；本次没有重复实现。**PR134** drawer 与 **PR99** formalization 仍由各自 owner 负责；PR114 pulse ranks 的独立归属保持。A1–A3 仅 advisory，不授权产品改动；2026 ETH/forced-NS 文献及其外部形式化/审计者仍按原文归属与限制保留，未认证不升级，搜索失败不证明不存在。原始题记手稿、作者 RK4 细节的旧来源限制继续保留；P≠NP 与无外力三维 NS 仍为 OPEN。

调用方需整合本补丁、对应 official cd4d 的空行增量与 PR119 等真实依赖，完成保留的 assignment 2/2：在完整最终输入上取得零错误 check、完整双语站点及 PDF/EPUB/EPUBCheck 和相关媒体输出验证；再按初轮三席协议执行 **initial R1**，必要复审、封存/及时 draft PR、push、CI、合入与 Pages。以上均 pending；未访问活跃分支/工件或受保护根笔记，未作 Git/GitHub/goal/lifecycle 操作、委派、provider/Heca/凭据探查或发布副作用。未审单元和新增依赖保持原有 pending 状态，不新增任何全书/新章批准。

## 可复核交接

输入 HEAD 加以下 SHA256 标识本次出版/skill 补丁；两份文档自身的最终摘要在 worker envelope 与私有 `handoff.json` 中，避免自引用摘要：

| 路径 | SHA256 |
| --- | --- |
| books/quantum-geometry/zh/ch30-fields-lines-eth-and-navier-stokes.md | `d6856f17ddc94108740fa2f84509beb63b7cf6bbca5f49bbbd71ffcd36928431` |
| books/quantum-geometry/en/ch30-fields-lines-eth-and-navier-stokes.md | `a63e3afc826e805abcb7a2339f9484f52d025b27fe3b328374991f39cb6ac229` |
| skills/local-content-accuracy/SKILL.md | `37f3c50f3566f423f3217c95dbcec6c938080e9a913c06c54986e41a12e0c6a2` |

原 intake evidence manifest：`/var/folders/7r/h8yjr2y927n8m2kh38c18n9w0000gp/T/ch30-intake-private-uvqs0nw3/evidence-manifest.json`。本次私有证据根：`/var/folders/7r/h8yjr2y927n8m2kh38c18n9w0000gp/T/ch30-implementation-20261112-7t8cslc_`；入口为 `input-correspondence.json`、`independent-evidence.json`、`primary-paper.json`、`sos-source-excerpts.txt`、`chapter-frozen-recheck.json`、`preservation.json`、`check-summary.json`、`check-with-states-summary.json`、`build-summary.json`、`browser-inspection.json`、`service-shutdown.json` 与最终 `handoff.json`。原始计算、完整源码/构建/浏览器输出留在该私有目录，不复制进出版文本或本账本。

## 调用方在完整当前仓库中的整合与源码校验

本补丁已按逐行差异接入官方主线 `57f8a40ff508bf05d0de9ed1cfee112075ea31c4`，保留其新增空行；与实施交付相比，两份章节没有任何非空白内容差别。上述私有副本缺失依赖导致的失败保留为历史环境限制。在完整仓库重新执行 `./tbook check` 已退出 0，1 本可见书、0 错误、0 警告；校对 skill 的现有快速校验及 `git diff --check` 也通过。这只补齐当前源码门禁，不替代内容批准、整书输出或独立复审。

仍保留原定最后一个实施阶段：接入实际批准的共享割图与模板依赖，核对第 30 章自身的最大可达秩／当前样本措辞与共享实验室的对应，完成当前 site、PDF、EPUB/EPUBCheck 等受影响输出，再做初轮三席独立审查。当前新增的数据处理不等式只作为已发布输入进入校验，其内容结论由另行核对负责。原 35 单元审计范围不变；源手稿已在本地定位，题记与附录引语的专项来源核对正在独立进行，尚不据此宣称通过。
