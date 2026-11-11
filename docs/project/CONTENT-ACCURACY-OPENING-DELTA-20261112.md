# 第 2–4 章当前增量：有界准确性修复

当前封存输入候选：`7830d18c014a60add122988b420f66cae806d4af`（调用方提供，含 main `ac508fe` 与第一次实施修正；本实施者未运行 Git/GitHub 操作）。第一次实施输入：`ac508fe6b9f2cc26aa278835125c5511452f73a6`；历史正文基线：`dacc884`。当前 pin：`1d9bf98cab8306e67ec38a739359f2cdae63877a`，两次实施均未改锁。调用方已封存、推送候选并建立草稿 PR #120；本次只关闭有界 PDF 输出调查项并更新本账本，独立 R1、CI、合入与 Pages 仍待调用方。

本轮只复核三个已确认问题及 PR #107 新增的双语 ch04 定理、证明解释、算例、有限维回归论证和第一部小结。五份 ch02/ch03 正文/绘图脚本输入与历史 intake 逐字节相同；新 ch04 原始差异与 `dacc884` 至输入 HEAD 的差异逐字节相同。历史覆盖、当前源码增量核查、当前输出检查和独立批准分别记录。原 35 单元集合不变，历史 9/35 覆盖不等于当前新增内容获批；其余 26 单元及新增第 31–32 章不计为本轮全文通过。

## 修正与证据

| 问题 | 最小双语修正 | 核对证据 |
| --- | --- | --- |
| F1：把舍入后的乘积称为精确值 | 两个四位小数概率用近似号；精确性归于未舍入值 | 十进制打印乘积为 `0.72503104`，与 `29/40` 相差 `0.00003104`；在有理数域扩张中直接相乘，未舍入两项之和严格为 `29/40` |
| F3：图三每片均乘一半 | 正文图注、脚本 ALT 与生成 SVG 的 title/aria-label 明示首片制备后为 1，后两片各乘一半 | 直接投影矩阵计算得 `1, 1/2, 1/4`；若相对于原始未偏振光束则为 `1/2, 1/4, 1/8`。生成 SVG 的绘图元素逐字节不变 |
| F4：Busch 证明少写非负性 | 前三步只用非负性与有限可加性 | 锁定 `EffectProbabilityExtension.lean:57–74` 的齐次性/单调性证明使用 `hpos`、`hadd`；`:245–252` 的正线性延拓同样使用二者 |
| F5：新 ch04 构造维数断言少写非零条件 | 仅增加“当 E 非零时” / “For nonzero E” | 锁定 `UnitaryPowerDilation.lean:57–60` 无非平凡性假设，`:205–209` 定义 `H = ℓ²(ℤ; E ⊕ E)`；E 为零空间时 H 也为零空间，维数为 0。非零 E 则可在不同格点放置同一非零向量，得到无限线性无关族 |

题记与所有引用行、正式定理/定义块、ID/GID、环境与媒体序列保持不变，中英序列仍对齐。未修改交互实验、其他图、视频、幻灯片、锁、Lean 或托管文件；共享 rotor/state-return 问题仍由 PR #90 负责。本轮未做序曲及其新增媒体的准确性 intake。

## PR #107 新增源码核查

`UnitaryPowerDilation.exists_unitary_power_dilation` 在所钉源码第 533 行，冻结记录 kind 为 `theorem`，模块 statement_id 为 `sha256:0b24c66dfd0fb41da8947e3e6f71c85367246a5dbc85d1d6f46805d7e78f46a0`，与锁一致。完备复内积空间、有界复线性压缩算子、保内积 V、同一个酉 U、所有自然数幂（含 0）及伴随压缩式均与双语定理一致；未额外声称有限维、可分性、唯一性或有效算法。

源码 `:62–201` 的自伴非对角算子、函数演算平方根与右乘 flip 给出 Halmos 一步扩张；`:205–240` 定义整数格点的 Hilbert 直和、零格嵌入及其伴随读出；`:242–466` 先逐点作用 J，再仅将环境分量右移；`:485–530` 同时归纳零格系统为 T^n x、零格环境为零、负格点全零，确为正文所述碰撞模型。另查 exact pin 的 mathlib 依赖 `56a005855ea17e0b0958f73ec801ae140b0a1679` 中函数演算酉性、直和内积、ℓ² 单点配对及伴随约定。

独立的高斯有理数矩阵乘法和逐格相互作用/右移模拟核对双语各 24 个表值；到第 39 步零格振幅精确为 `(4/5)^n`，总范数平方精确为 1，漏出概率精确为 `1-(4/5)^(2n)`，支持只在 0 至 n 格。第 39 步复归振幅与目标振幅分别舍入为 `0.99934`、`0.00017`；角度为 `36.86989764584401°`。数表无需修改。

手工有限维论证有效：紧性给出 U 的幂的收敛子列，再递归稀疏化使相邻指数差趋于无穷；差幂趋于单位算子。压缩及等距性令内积趋于 1，单位向量衰减与柯西–施瓦茨则令其模趋于 0，产生矛盾。此论证仍在定理/证明块之外明确标为手工推导。第一部小结新增句与共同幂扩张结论一致。除 F5 限定外，未确认此新切片的其他问题。

## 第一次实施的实际验证与限制（保留历史边界）

- `./tbook check`：最终正文 0 错误、0 警告；`git diff --check` 通过。
- `./tbook fig build --book quantum-geometry ch03-overview`：双语 SVG 从同一脚本重生成。两文件 XML 可解析，title 与 aria-label 一致，内部引用检查通过（均无内部 ID/引用）；除两项无障碍文本外绘图树不变。整书生成图 freshness 检查通过，仅表示脚本/产物一致，不是新图内容批准。
- `TBOOK_FILMS=skip ./tbook build html pdf epub site --book quantum-geometry`：成功。双语 HTML、四份 PDF、两份 EPUB 为当前正文产物；最终调用复用同一当前输入键下刚构建的缓存。站点提示八部视频未构建；视频不属本轮验收。此前两次构建分别因增补 F5、默认站点开始无关视频渲染而中断，均不冒称完整成功调用。
- 双语 EPUBCheck 5.3.0：各 0 错误、0 警告，无跳过；逐包 XML 解析与修正文句/无障碍标签核对通过。未在 Apple Books 图形界面打开。
- `./tbook serve --port 18765` 下实际运行 Chromium：ch02/ch03/ch04 × zh/en × 深浅主题 × 1280/390 px，共 24 个页面组合通过；无脚本/KaTeX 错误、整页横向溢出，新增定理链接指向 exact pin 的第 533 行。改动段落及图注已逐组合看图，图三四种预览各两语言已查看。未把未改交互页面的语义计为通过。
- 实际 PDF：四版修正文句、图三第三栏与 ch04 表格均渲染查看，文本扫描无所查源码标记。局部页码见 `pdf-evidence.json`。**输出限制**：图三第二栏原有公式标签在四份本地 PDF 中显示缺字方框；绘图元素未变，根因未定，不能称 PDF 已获完整视觉批准。`fig shots` 的打印辅助页另裁掉第三栏；实际 PDF 三栏完整。未为此改写原图或托管渲染工具，交由后续输出调查。
- 工具、交互源码未改，未重跑工具单元测试、实验专项浏览器测试或 Lean 编译。独立三席复审、最终候选对应、PR/CI/合入与 Pages 均待负责方执行。

可复核证据在 `build/content-accuracy/opening-delta-ac508-20261112/`：`source-evidence.json`、`numeric-evidence.json`、`verify-numerics.py`、`preservation-evidence.json`、`svg-evidence.json`、`browser-evidence.json`、`pdf-evidence.json`、`epubcheck-evidence.json`、`epub-content-evidence.json`、相应局部截图及 exact-pin 源码/冻结片。该证据是实施验证，不是独立复审批准。

## 第二次且最后一次实施：PDF 字体调查闭环

本次在原始加一次纠正的限额内执行最后一次输出调查，未新增实施轮次。开始前，第一次实施清单中的 10 个路径（含账本）及 6 份下载产物全部 SHA256 匹配。除本账本外，封存候选的九份出版源码、题记、正式块、证明边界、ID/GID、环境和媒体序列均逐字节保持；用户的未跟踪第 5–8 章笔记未读、未写、未暂存。未改锁、Lean、托管工具、其他正文、交互或视频；未委派工作。

**根因有实际证据。** 四份原 PDF 图三第二栏的公式文字均被选择为 `LastResort`，不是 SVG 丢失字符：原 SVG 保留 `⋆e₃ = e₁∧e₂` 的字符与下标。将实际暂存 SVG 不作任何字节修改，送入 Typst 0.15.2：默认系统字体时出现方框；只设置 `font_paths=[本仓库 .cache/fonts]`、`ignore_system_fonts=True` 后，公式完整显示，相关回退字形为内置 `NewCM10-Regular`。再在隔离配置中仅加入实际 `/System/Library/Fonts/LastResort.otf` 的逐字节副本，重新出现方框，且最小 PDF 与默认配置 PDF 的 SHA256 完全相同。该三路实验与四份原 PDF 的字形资源、文字跨度及实际页面截图共同确认本机系统字体选择为原因，故无需修改数学文字或绘图源。

**使用现有导出控制。** 通过仓库 `pandoc.typst_source` 在证据目录重新生成两种语言的 PDF 输入；每种语言的 `main.typ`、`book.md`、`meta.json`、`_book/`、`_theme/` 共 725 个文件均与既有暂存逐字节匹配。保留原有发布地址 `https://the-omega-institute.github.io/trureturing-books/`、仓库地址、书籍日期对应的时间戳 `1794268800`、现有十一份 `.cache/fonts` 字体及 Typst 内置字体；仅对四次 `typst.compile_with_warnings` 显式传入上述字体路径与 `ignore_system_fonts=True`。未安装或修改共享字体，也未改变默认导出工具。可复跑命令：`PYTHONDONTWRITEBYTECODE=1 .venv/bin/python build/content-accuracy/opening-delta-ac508-20261112/assignment2/controlled-export.py`。具体路径、版本、输入及字体哈希见 `controlled-export.json`、`input-output-correspondence.json`。

四份当前 PDF 的图三整图、第二栏公式、归一化图注、近似概率/未舍入说明、Busch 非负性/有限可加性、ch04 非零条件及数表均已从实际 PDF 渲染并查看；五类检查各四版，共 20 条页面记录（中文印刷版两项在同页）。页码与原输出相同：

| 版本 | Busch 说明 | 舍入说明 | 图三 | 非零条件 | 数表 | 当前 PDF SHA256 |
| --- | --- | --- | --- | --- | --- | --- |
| zh screen | 49 | 50 | 53 | 79 | 80 | `621af9ac68445545a301f5b02cd09e0e2b2a123d26836214f36178a2eceeb65b` |
| zh print | 54 | 54 | 59 | 86 | 87 | `3be3a3420facbef2356f818ee7e05c711cf578b89e8b5c7ffc9346ba63ee6431` |
| en screen | 52 | 53 | 57 | 85 | 86 | `68e2288fe49c22d71b2cd67010479769e8bf874a37c97974f010ca3bf6067127` |
| en print | 56 | 57 | 61 | 90 | 91 | `84990573898b3944bc2bc7b81dafcd3ac58aab64832be0fb56525ad0dc104651` |

以上为物理页码。全书新 PDF 的所查源码标记扫描为零，字体资源中无 `LastResort`；目标页面文字未超出物理页面。这里批准的观察范围为本批目标页，并非整本逐页视觉批准。`pdf-validation.json`、`current-formula-contact.png`、五份 `current-contact-*.png` 与逐页 PNG 留下实际输出证据。

**复用与下载对应。** 根据已有构建缓存清单，两种语言各 1341 项 HTML 文件输入、1353 项 PDF/EPUB 文件输入均与当前文件匹配；HTML 各 101 个输出文件及两份 EPUB 的字节也与原清单匹配。因此复用第一次实施的结构检查 0 错误/0 警告、24 组章节浏览器结果、双语 EPUBCheck 各 0 错误/0 警告、内容/数值及保护证据，未重跑完整 HTML、EPUB、工具单元测试或交互语义套件。新 PDF 从同一当前源重新编译，不能复用旧 PDF 的视觉结论。

四份新 PDF 已同步至 `build/dist/quantum-geometry/` 与 `_site/quantum-geometry/downloads/`。调用现有站点发布函数刷新下载、首页/书籍页文件大小与 `manifest.json`；六份下载文件在规范目录、站点副本及清单中的大小/SHA256 全部一致。没有重新构建无关媒体或封面。站点章节内容与原结果保持逐字节对应。通过 `./tbook serve --port 18765` 实际请求六份下载，HTTP 200 且收到的字节大小/SHA256 与规范产物一致；中英界面的首页/书籍页 × 1280/390 px 共八组浏览器检查通过，文件大小标签正确、无脚本错误或整页横向溢出，八张下载区域截图已查看。该站点页面沿用现有固定夜间主题，不冒称新增浅色主题检查；章节深浅主题的 24 组历史结果按未变内容复用。预览服务已停止。

**剩余边界。** 当前控制配置解决了该本地 PDF 缺字项；默认 macOS 字体配置仍能复现问题，现有默认缓存保留旧配置产物。本次控制配置未写入默认构建缓存，不声称默认命令、CI 或 Pages 会产生相同字节；后续导出须保留已记录配置，或按其实际环境重新检查目标页。缺少某些候选字体族的回退警告仍记录在 `controlled-export.json`，目标页实际可读。`fig shots` 打印辅助页裁掉第三栏是另一项辅助工具限制；当前四份真实 PDF 三栏完整，未追改该辅助工具。未验证 Apple Books 原生界面、设备阅读器、音频/视频或新增章节内容；站点沿用八部视频未构建的海报状态。原 35 单元审计集合、历史 9/35 及其余 26 单元待办边界不变。

第二次实施证据目录：`build/content-accuracy/opening-delta-ac508-20261112/assignment2/`。本账本更新后须由调用方封存最终文档差异并对同一候选实施独立三席 R1；草稿 PR #120、CI、合入、Pages 及默认发布环境的输出核对仍由调用方负责。本批两次实施额度至此用尽，不再请求或启动新实施轮次。

## 封存候选出版源码 SHA256（第二次实施逐项复核，均未改变）

| 路径 | SHA256 |
| --- | --- |
| `books/quantum-geometry/en/ch02-born-rule.md` | `5914287733ba664d5b5340c56b60a9abf93e85376ca4a9d2fd55e56bad6baa34` |
| `books/quantum-geometry/en/ch03-projectors-and-duality.md` | `e683af6be3baf5a95ea6be499896692a986019b8ff18fd1ee61be10eef0a4869` |
| `books/quantum-geometry/en/ch04-decoherence.md` | `e1239b5f67156afdf300b861a70150429fe5b17f2ae1af24e7e9bf6e1ae7d97c` |
| `books/quantum-geometry/figures/ch03-overview.en.svg` | `3199390050051858767098620539f303322da7c9510fa670547380a6883e68e4` |
| `books/quantum-geometry/figures/ch03-overview.py` | `c8befb4fda1f63ed4d95e067c0ee29f570ec8e3d465e938e080a1f383af6b442` |
| `books/quantum-geometry/figures/ch03-overview.zh.svg` | `1420809973338030d28163e6d11fc0a9d296b4dccbdf58dcdaaac50f9900b363` |
| `books/quantum-geometry/zh/ch02-born-rule.md` | `2c0ad2e01102881d3d9e7d09398ac51581a3fec822fe930165e69fa304830b38` |
| `books/quantum-geometry/zh/ch03-projectors-and-duality.md` | `bdfa54c6fb17d357a1417bb66c0374440f7ebe1a5b945ba0d8de1fd4f43ebbc6` |
| `books/quantum-geometry/zh/ch04-decoherence.md` | `a5888d1c2f82428ef6690f935a1812d11424a7fde213a3d769353005e0e8abca` |
