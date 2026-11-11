# 第 2–4 章当前增量：有界准确性修复

输入 HEAD：`ac508fe6b9f2cc26aa278835125c5511452f73a6`。历史正文基线：`dacc884`。当前 pin：`1d9bf98cab8306e67ec38a739359f2cdae63877a`，本轮未改锁。状态：局部纠错已实施，待独立复审；未执行提交、PR、合入或部署。

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

## 实际验证与限制

- `./tbook check`：最终正文 0 错误、0 警告；`git diff --check` 通过。
- `./tbook fig build --book quantum-geometry ch03-overview`：双语 SVG 从同一脚本重生成。两文件 XML 可解析，title 与 aria-label 一致，内部引用检查通过（均无内部 ID/引用）；除两项无障碍文本外绘图树不变。整书生成图 freshness 检查通过，仅表示脚本/产物一致，不是新图内容批准。
- `TBOOK_FILMS=skip ./tbook build html pdf epub site --book quantum-geometry`：成功。双语 HTML、四份 PDF、两份 EPUB 为当前正文产物；最终调用复用同一当前输入键下刚构建的缓存。站点提示八部视频未构建；视频不属本轮验收。此前两次构建分别因增补 F5、默认站点开始无关视频渲染而中断，均不冒称完整成功调用。
- 双语 EPUBCheck 5.3.0：各 0 错误、0 警告，无跳过；逐包 XML 解析与修正文句/无障碍标签核对通过。未在 Apple Books 图形界面打开。
- `./tbook serve --port 18765` 下实际运行 Chromium：ch02/ch03/ch04 × zh/en × 深浅主题 × 1280/390 px，共 24 个页面组合通过；无脚本/KaTeX 错误、整页横向溢出，新增定理链接指向 exact pin 的第 533 行。改动段落及图注已逐组合看图，图三四种预览各两语言已查看。未把未改交互页面的语义计为通过。
- 实际 PDF：四版修正文句、图三第三栏与 ch04 表格均渲染查看，文本扫描无所查源码标记。局部页码见 `pdf-evidence.json`。**输出限制**：图三第二栏原有公式标签在四份本地 PDF 中显示缺字方框；绘图元素未变，根因未定，不能称 PDF 已获完整视觉批准。`fig shots` 的打印辅助页另裁掉第三栏；实际 PDF 三栏完整。未为此改写原图或托管渲染工具，交由后续输出调查。
- 工具、交互源码未改，未重跑工具单元测试、实验专项浏览器测试或 Lean 编译。独立三席复审、最终候选对应、PR/CI/合入与 Pages 均待负责方执行。

可复核证据在 `build/content-accuracy/opening-delta-ac508-20261112/`：`source-evidence.json`、`numeric-evidence.json`、`verify-numerics.py`、`preservation-evidence.json`、`svg-evidence.json`、`browser-evidence.json`、`pdf-evidence.json`、`epubcheck-evidence.json`、`epub-content-evidence.json`、相应局部截图及 exact-pin 源码/冻结片。该证据是实施验证，不是独立复审批准。

## 未提交源码 SHA256

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
