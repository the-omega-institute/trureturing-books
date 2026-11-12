# 第八章 DPI：2026-11-12 的限定准确性修订

输入为 `57f8a40ff508bf05d0de9ed1cfee112075ea31c4`，目标分支 `fix/content-accuracy-ch08-dpi-20261112`。调用方提供的仅含已跟踪源文件归档 SHA-256 为 `55aaa4e1608d94d09c6755d3608421cf6685f9aa7df292dda2ae0fda80aad931`，已独立核对。中文权威。本次是历史 PR90 之后新加入 DPI 内容的局部修订，状态为**已修订，待独立审查**；不继承其内容批准，不增加审计单元。

原 35 单元的准确性目标保持；历史 9/35 的记录与其余 26 单元待办不变。当前出版目录的 44 单元包含新增第 31–39 章，这九章仅作出版依赖，本次没有新增内容覆盖或批准。锁仍为 `trureturing@1d9bf98cab8306e67ec38a739359f2cdae63877a`、分支 `dev`，448 个 GID（317 theorem、123 def、8 inductive）。模板仍为支持的 0.5.0。

## 确认问题与最小改动

| 事项 | 处理与证据 |
| --- | --- |
| DPI-STEIN | 仅限定原文献列表第二条：独立同分布副本的渐近检验，在固定 `0 < ε < 1` 的第一类错误上界下，取最优第二类错误指数。中文先修，英文自然对应，保留原来“D 只降不升”的读法。 |
| DPI-LITERATURE-BOUNDARY | 将原有三条文献说明包入一个无 `lean` 属性的 `remark`，双语 ID 均为 `rem-channel-dpi-literature`，标题分别为“文献结果，未在本书形式化”与“Literature result, not formalized in this book”。三条说明的顺序、其余两条文字和框外格言逐字保留。 |
| 派生计数与 DEP-DECK-ALT | 依据现有生成器的逐行规则独立统计，中英均为正式环境 212、文献环境 165、开放环境 6。文献环境原为 164；新增注记恰好增加 1。通过 `./tbook fig build --book quantum-geometry prelude-three-tiers` 生成双语 SVG 及现有 deck img 副本；只改第 37 页对应 Stat 和 ALT，ALT 同时纠正继承的 210/313 为 212/317。 |

直接读了序曲双语图注与对应 deck 的来源行、计数、ALT；图注按中文正文统计且未手写旧数，不需更改。搜索所得其他 `164` 属于数值、坐标或声明序号，没有确认的本次计数漂移。生成器及其断言未改，没有硬编码全局 165；声明图的数据与控制源码均保持输入字节。第 28 章图注以及第 30 章、终章、附录、其他 deck 设计与媒体问题仍归既定负责人，不在本补丁修复。

## 主文献与独立推导

重新下载并阅读 Ogawa–Nagaoka, *Strong Converse and Stein’s Lemma in the Quantum Hypothesis Testing*, [quant-ph/9906090](https://arxiv.org/abs/quant-ph/9906090)，§1 与 Theorem 2（PDF 第 1–2、4–5 页）。本次读取的原文 PDF SHA-256 为 `ff95d23c83d72e074e22016d18f7b4a70f7916da747779b1a9185a37bdae5bbd`。

原假设为 ρ，备择假设为 σ；0 ≤ Aₙ ≤ I 表示接受 ρ，αₙ = Tr[ρ⊗ⁿ(I−Aₙ)]，βₙ = Tr[σ⊗ⁿAₙ]。在 αₙ ≤ ε 下最小化 βₙ，Theorem 2 给出 `(1/n) log βₙ*(ε) → −D(ρ||σ)`，所以正的错误指数为 `−(1/n) log βₙ* → D`。文中 `e^(−nr)` 的指数约定确定这里采用自然对数、单位为每份副本的 nats，与本章一致。这是非对称检验的第二类错误指数。

§1 假设 Im ρ ⊆ Im σ；它不要求两个态全局满秩。支撑内的奇异情形可限制到 supp σ。对于支撑不包含的扩展值情形，令 P 为 ker σ 上的投影，p = Tr(ρP) > 0；只要任一副本出现 P 的结果就接受 ρ，则 βₙ = 0，αₙ = (1−p)ⁿ → 0，因此任意固定正 ε 最终允许无穷指数。这与本章 D 的支撑约定相符，无需增加满秩、保单位或输入输出等维假设。新正式 DPI 的钉版源码也重新读取了实际签名与支撑分支；本次未改其文字、证明或 GID。

另以可交换 Bernoulli 态 ρ = diag(0.9,0.1)、σ = I/2 做独立似然阈值核对：D = 0.3680642071684971 nats；固定 ε = 0.1，n = 100、1000、10000 时满足约束的 α 分别为 0.072573、0.095408、0.094507，对应 `−log β/n` 为 0.308150、0.345556、0.360000，趋向 D 的方向正确。它只检验所修正的协议与指数约定，不把有限样本数值当作 Stein 引理的证明。原章既有算例和两个手工推论与 intake 输入完全相同，其既有证据按该依赖边界保留；本次未借计数维护重审其他有效主张。

## 实际验证与产物

所有重构和构建均在 `/tmp/qg-ch08-dpi-implementation-20261112/source` 的私有副本进行，输出留在该副本 `build/`、`_site/`。只读使用现有依赖，字体及冻结状态缓存复制到私有目录，构建缓存关闭。现有依赖包通过链接读取，Vite 缓存与幻灯片临时文件均留在私有目录。未复制根目录未跟踪文件。

- 完整 `./tbook check`：1 本书，0 错误、0 警告。
- `./tbook fig build --book quantum-geometry --check`：150 图，0 过期、0 错误。四份改变的 SVG 均通过 XML 和内部引用验证；双语深色、浅色、手机、印刷共八张实际预览均已查看。
- `node tools/node/slides-check.mjs`：1 套 deck、2 语言、各 39 页，通过。`./tbook build slides --book quantum-geometry` 和随后 site 的重构均完成全部版面/字体检查及双语 39 页 PDF 导出。
- `./tbook build html pdf epub --book quantum-geometry`：双语 HTML、screen/print 四 PDF、两 EPUB 完成；扫描 96 个生成的 HTML 页面，0 个实际 `katex-error` 节点。
- EPUBCheck 5.3.0：两 EPUB 均 valid，0 错误、0 警告、未跳过；每份 EPUB 的 223 个 XML/XHTML/SVG/OPF 等成员均可解析，新增注记恰好出现一次，修正的协议文字存在。
- PDF 实际查看：中文 screen 第 153–154 页、print 第 161–162 页，英文 screen 第 164 页、print 第 174 页；计数图分别在第 20、21、23、25 页。限定条件可读、数学未泄漏为源码；中文印刷版的第三条文献说明续到下一页，框外格言保持独立。四 PDF 页数分别为中文 871/912、英文 929/962；此处均指文件页序。
- `TBOOK_FILMS=skip ./tbook build site --book quantum-geometry`：成功。八部影片使用海报与“视频未构建”回退，未渲染、未验收 MP4 或音频。
- 通过实际 `./tbook serve --port 18868` 的 `/trureturing-books/` 子路径检查第八章和序曲：2 语言 × ayu/light × 1440/390 px × 2 页面，共 16 个组合均已截图查看；无页面横向溢出或 KaTeX 错误，三条文献说明在同一注记内、无 Lean 徽章、格言在框外。另查看双语第 37 页的 1440/390 px 四画面，实际内联 SVG、Stat 与 ALT 均为最终计数。

可复核的私有证据包括工作目录上一级的 `source-verification.json`、`output-identity.json`、`epub-validation.json`、`reader/inspection.json`、`reader/slides-inspection.json`、`pdf-inspection/pdf-inspection.json` 与截图。`output-identity.json` 逐项记录输出 SHA-256，另有 HTML、slides、site 完整路径摘要清单；调用方应在输入相关依赖改变后重新比较，不能冒称后续集成版本的整书字节。

## 限制与后续归属

本机 `/opt/homebrew/bin/pandoc` 实际为 3.13，而非预期 3.9；未使用可能不兼容的捆绑可执行文件，也未安装或修改共享环境。EPUB 构建因此有 `--mathml` 弃用警告，EPUBCheck 没有警告。首次工具体检因 PATH 未包含 mdBook 失败，实际构建以现有 mdBook 0.5.4 的绝对路径完成。PDF 使用现有 Noto Serif/Sans SC、Chakra Petch、JetBrains Mono，以及模板的系统/嵌入字体回退；日志列出的缺失备选字体保持原状，不声称与 CI 默认字体完全等价。未测试原生 Apple Books、真实手机、音频或硬件设备。

浏览器幻灯片有 `Wake Lock permission request denied`，没有其他运行错误；固定 1920×1080 画布在 390 px 下按约 0.203 倍整体缩放，不能据此声称手机阅读排版已优化。首次私有检查脚本的跨行正则、结果字段名和内联 SVG 定位问题均已纠正，最终检查完成；这些是验证脚本问题，没有改出版工具或放宽质量门。工具源码未改，未运行不必要的工具全套测试；交互与视频源码、测试、静帧均未改。

以归档逐路径比较：只增加一个双语文献环境，原 ID/GID、完整正式块与证明、题记、格言、数值、引用集、媒体及其顺序均保持；反向应用本次两处章内改动可精确还原输入字节。锁、Lean、托管文件、模板、生成器、声明图、其他章及 skill 源码均不变。全局台账只追加本记录的指针。预览服务和本次所有构建/检查进程在交接前停止。

调用方仍需核对最终路径摘要，及时封存并推送草稿，按现有首轮三席流程独立审查，再负责提交、PR、CI、合入及 Pages。不得把本次实现或输出检查当作内容批准、原 35 单元完成或新增第 31–39 章批准。PR139 后续集成应保留本次限定计数修订；PR130 的第 28 章图注与声明图归属、本来另有负责人的第 30 章/终章修订继续独立。

可供后续已授权 skill 迭代的一条候选经验：新增“文献结果”环境会改变以标记环境计数的图表，修复时应沿现有生成规则闭合 SVG、deck Stat 与 ALT，再以当前输出复核；本次不改 skill。

## 出版源文件 SHA-256

| 路径（相对仓库） | SHA-256 |
| --- | --- |
| `books/quantum-geometry/en/ch08-erasure-and-time-arrows.md` | `612e9d931d191f5c9c85639a7993b6cd37dfa800af48b2f6b59c1e858b6a86ac` |
| `books/quantum-geometry/figures/prelude-three-tiers.en.svg` | `c0b8f4119f53cd92639199512f2bcc969ad3eb18135925f995b4fdc9693e713e` |
| `books/quantum-geometry/figures/prelude-three-tiers.zh.svg` | `d76b55819411162df6c92fb04e3c543b344ea4deff450e6ddf672829a57b0656` |
| `books/quantum-geometry/slides/overview/img/prelude-three-tiers.en.svg` | `fee121389ff3c7c2cfb785a2d4d677c2d7f9a6b5381d76592307d002d3ffd9a6` |
| `books/quantum-geometry/slides/overview/img/prelude-three-tiers.zh.svg` | `17881caa5b9eaab97b78645ad40d0542df494242e36ab3a6300615ff55545991` |
| `books/quantum-geometry/slides/overview/slides.en.md` | `546e8e004de5a4f7203c4d3176fea77891b9e98424218ca2e853b5c6b971c625` |
| `books/quantum-geometry/slides/overview/slides.md` | `7209aaec7a38eb0ba75fc54455140d7b81859e0a4dd9d7fa486c733d51e01f5e` |
| `books/quantum-geometry/zh/ch08-erasure-and-time-arrows.md` | `c7ea81e6e63a51f8c5bb803f8d61a92ecf646f176ca77d7cb06cb35513db7602` |
