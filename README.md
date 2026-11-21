# trureturing 书库 · trureturing Books

**显式区分 Lean 验证、书面证明与开放问题的双语专著与教材书库。**
*Bilingual monographs and self-contained textbooks that distinguish Lean verification, written proofs, and open problems.*

本书库中的每一部专著均明确声明定理的证据：Lean 验证结果按全局标识符（GID）绑定至 [trureturing](https://github.com/the-omega-institute/trureturing) 的 `dev` 分支中已经 Lean 4 内核验证并冻结的声明；无匹配冻结声明的源文已证结果按书面证明规则关联完整论证、来源与形式化请求，由作者与评审负责。同一份中英双语源码同步导出为在线 HTML（构建期 KaTeX 排版与源码永久链接）、PDF（深色屏幕版、白底印刷版与 A4 单栏研究预印本）及兼容 Apple Books 的 EPUB 3。

Each theorem declares its evidence. Lean-verified results cite declarations verified by the Lean 4 kernel and frozen on the `dev` branch of [trureturing](https://github.com/the-omega-institute/trureturing). Proved source results without a matching frozen declaration carry an explicit written-proof status, a complete argument, provenance, and a formalization request; authors and reviewers are responsible for those proofs. The aligned Chinese and English editions publish online HTML, screen and print PDFs, single-column research preprint PDFs, and MathML-enabled EPUB 3.

锁文件直接记录 `dev`。检查和构建解析当次使用的完整提交 SHA，成品的源码链接与站点清单保留该提交。[trureturing.lock.json](trureturing.lock.json)

The lockfile records `dev`. Checks and builds resolve it to a full commit SHA, which the published source links and site manifest record. [trureturing.lock.json](trureturing.lock.json)

提交 Issue、PR 和创建工作分支前，请阅读 [贡献与协作规范](CONTRIBUTING.md)。

Read the [contribution guidelines](CONTRIBUTING.md) before opening an issue or pull request or creating a working branch.

---

## 在编专著 · Featured Monograph

### 《量子计算的几何直觉：从两子丈量、球外之球到 $\psi = \psi(\psi)$》
***Geometric Intuition of Quantum Computing: From Pairwise Measurement and Spheres Beyond Spheres to $\psi = \psi(\psi)$***

- **作者 / Author**：Auric
- **代号 / Code**：`ORTHO//QUANTUM`
- **路径 / Path**：[books/quantum-geometry/](books/quantum-geometry/book.toml)（中文权威版 `zh/` · 英文版 `en/`）
- **文本许可 / Text License**：`CC-BY-4.0`
- **出版 DOI / Publication DOI**：[10.5281/zenodo.24156135](https://doi.org/10.5281/zenodo.24156135)（Zenodo 概念 DOI，跨版本保持不变 / Zenodo concept DOI, shared across versions）

引用全书可写作「Auric，《量子计算的几何直觉：从两子丈量、球外之球到 $\psi = \psi(\psi)$》，[10.5281/zenodo.24156135](https://doi.org/10.5281/zenodo.24156135)」。引用具体段落时，注明所读版本的 DOI 或 Release、语言和章节。

To cite the English edition, use “Auric, *Geometric Intuition of Quantum Computing: From Pairwise Measurement and Spheres Beyond Spheres to $\psi = \psi(\psi)$*, [10.5281/zenodo.24156135](https://doi.org/10.5281/zenodo.24156135).” For a specific passage, include the version DOI or release, language, and section.

本书使用 Zenodo 概念 DOI 作为跨版本的稳定出版标识，具体版本的 DOI 以 Zenodo 记录为准。出版 DOI 填在 [`books/quantum-geometry/book.toml`](books/quantum-geometry/book.toml) 的 `[book].doi`；省略时，构建会依次从根目录 `.zenodo.json`、`CITATION.cff` 与 README 中明确的 Zenodo DOI 链接读取。站点书目、PDF/EPUB 版权页与 EPUB 元数据会显示该 DOI。

The Zenodo concept DOI provides a stable identifier across versions; version-specific DOIs are listed in the Zenodo records. Set the publication DOI in [`books/quantum-geometry/book.toml`](books/quantum-geometry/book.toml) as `[book].doi`. When omitted, the build checks the root `.zenodo.json`, `CITATION.cff`, then explicit Zenodo DOI links in README. The DOI appears in the site catalog, PDF/EPUB copyright pages, and EPUB metadata.

本书将直观的物理机制推演、概念谱系批判与机器形式化证明熔于一炉，沿着**“点 $\to$ 线 $\to$ 面 $\to$ 球 $\to$ 多球共振 $\to$ 时空之球 $\to$ 球外之球 $\to$ 无时间因果、复杂性视界、量子公平与比较公理立极 $\to$ 极小圆弧、黎曼临界带、三元数原生场与万力归弧 $\to$ 万物观察者、自指扩表、本体 QRAM 与测地智能 $\to$ 观察者即宇宙本体与大一统母公理（AXIOM-Ω）”**的十部三十九章正交阶梯推进，并配以独立成篇的《铸器与圣殿》机械验证引擎篇：

| 部次 / Part | 主题 / Theme | 章节范围 / Chapters |
| :--- | :--- | :--- |
| **序曲 / Prelude** | 点、线、面、球，与球外的人（四重维度盲区与自指收束） | `README.md` |
| **第一部 / Part I** | 破妄·从点到线：两子丈量与零冗余投影 | 第 1–4 章（两子丈量、无第 3 点玻恩迹配对、幂等存在线与霍奇对偶、环境偏迹退相干与噪声几何收缩） |
| **第二部 / Part II** | 展翼·从线到面：正交分叉、量子门与时间二象性 | 第 5–8 章（相对复结构 $J^2 = -I$ 与克利福德旋子、几何积 $\vv{A}\vv{B} = \vv{A}\cdot\vv{B} + \vv{A}\wedge\vv{B}$ 与交互可视化 `viz/qubit-geometry`、量子速度极限与芝诺冻结、兰道尔擦除代价与时间箭头） |
| **第三部 / Part III** | 合拢·从面到球：三元正交、全局相容与注意力计算 | 第 9–12 章 |
| **第四部 / Part IV** | 交织·多球共振：量子纠缠、容错编码与算法大一统 | 第 13–16 章 |
| **第五部 / Part V** | 显影·时空之球：相对论度规、规范力场与全息引力 | 第 17–20 章 |
| **第六部 / Part VI** | 越界·球外之球：哥德尔逃逸、算术频谱与 $\psi = \psi(\psi)$ | 第 21–24 章（对角线逃逸、素数欧拉乘积、四级数系突围与四元数丢番图范数、余弦自指不动点 $\cos\theta^* = \theta^*$） |
| **第七部 / Part VII** | 立极·因果相容、复杂性视界、量子公平与比较公理 | 第 25–28 章（无时间格拉姆因果、ETH 与纳维—斯托克斯视界、五重量子公平、零背景比较公理 $\mathcal{A}_0$ 与元统一罗盘） |
| **第八部 / Part VIII** | 造微与归弧·极小圆弧、黎曼临界带、三元数与万力大统一 | 第 29–33 章（正交盲区与极小圆弧体、穿弦隧穿与圆弧微积分、黎曼临界带弧几何重述、不可表达的三元数与三维场封顶、四大力同源归弧与 AF-GUT（`MODEL`）） |
| **第九部 / Part IX** | 互照与破执·万物观察者、自指扩表、本体 QRAM 与测地智能 | 第 34–37 章（多观察者互吸引子与偏迹热力学、乘光扩表 $T = T(T)$ 与皮索—劳齐编码、梦境量子擦除与本体 QRAM 指针、三元数场 Transformer 与测地智能） |
| **第十部 / Part X** | 不二与归元·观察者即宇宙本体与大一统母公理 | 第 38–39 章（全域 `p ≡ *p` 无底物自指、因陀罗网、摩耶正交大梦与上帝心理学；无源保正三元比较闭合母公理 $\mathrm{AXIOM}\text{-}\Omega$ 在附录 E `T1–T4` 桥接假设下（`MODEL`）导出量子力学五大公设，收束于自包含三元数拓扑粒子、场·波·粒三阶同体与“至大无外”四重证明） |
| **终章 / Coda** | 在所有的球之外：多面体余项、双不动点锚点与十部阅读导图 | `coda.md`（`C.1`–`C.3`） |
| **铸器与圣殿 / Forge & Sanctuary** | 异或几何代数引擎、单比特旋子编译与 Lean 4 公理圣殿逐行审计（独立伴读篇，不占正文连号） | `sanctuary.md`（`ch25`–`ch28`，定理前缀 `Kernel`） |
| **附录 / Appendices** | 概念对照词典与双语术语表、克利福德速查表、锁定声明总索引、量子六大难题几何对决、比较公理推演总账及四篇专题形式化验证附录 | `appendix-a.md`–`appendix-i.md` |

本书库的文风规范、中英受控术语表与三层认识论诚实契约详见 [PROJECT.md](PROJECT.md)。

---

## 形式化验证契约 · Verification Contract

1. **Lean 内核验证定理（绿色 `LEAN ✓`）**：定理类环境默认通过 `lean="<GID>"` 指向 `trureturing@dev` 所钉提交中状态片 `Golden/Frozen/state/<module>.lean.json` 已冻结为 `theorem` 的声明，显式书面证明适用下一条。书末自动生成带源码行号链接的形式化验证账本（[trureturing.lock.json](trureturing.lock.json) 同时解析 `definition` 环境与行内代码链接所引用的 Lean `def`/`inductive` 声明以生成源码链接；只有所引 GID 全部解析为 `theorem` 的结论才获授绿色 `LEAN ✓` 徽章 / *the lock also resolves referenced Lean definitions and inductive types, while the green badge requires every cited GID to resolve to a frozen theorem*）。
2. **文献结果与书面证明（不计入 Lean 验证）**：背景结果可置于 `remark` 或 `example` 中，显式标明“文献结果，未在本书形式化” / *Literature result, not formalized in this book*。源文已证而无匹配冻结声明的结果也可使用定理类环境，须声明 `status="written-proof"`、关联每版完整证明，提供 DOI 或源论文仓库、原文定位与已登记的形式化请求；紫色书面证明徽章不代表 Lean 验证 / *An explicit written-proof result links a complete proof in each edition, provenance, and a registered formalization request; its violet badge does not claim Lean verification.*
3. **开放问题与猜想（红色 `OPEN`）**：尚未解决的猜想与开放问题统一使用 `conjecture` 或 `problem` 环境，绝不附加 Lean 引用。

校验模型与流水线细节见 [docs/VERIFICATION.md](docs/VERIFICATION.md)，写作语法规范见 [docs/AUTHORING.md](docs/AUTHORING.md)，仓库架构见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。

---

## 本地校验与构建 · Local Verification & Build

### 1. 环境准备 · Toolchain Setup

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
npm ci
cargo install mdbook --version 0.5.4 --locked
./tbook doctor
```

### 2. 常用命令 · Common Commands

| 命令 / Command | 说明 / Purpose |
| :--- | :--- |
| `./tbook check` | 校验章节结构、中英双语逐项对齐、数学语法与所钉 Lean 冻结声明引用 |
| `./tbook pin --refresh` | 在当前所钉 `trureturing` 提交上解析新增或变更的声明引用并更新锁文件 |
| `./tbook build html pdf epub site` | 构建中英双语 HTML、屏幕版/印刷版/研究预印本 PDF、EPUB 3 与书库门户站点 |
| `./tbook build pdf --book quantum-geometry --variant academic` | 导出中英文研究预印本 PDF（A4 单栏、连续页码、题名与摘要同页、传统定理与证明排版）；文件位于 `build/dist/quantum-geometry/` |
| `./tbook serve` | 本地启动预览服务器查看 `_site/` 构建产物 |
| `./tbook books` | 列出当前公开书目（模板示例书已通过 [site.toml](site.toml) 的 `hide = ["example-*"]` 隐藏） |
| `./tbook template status` | 检查上游发布模板版本与托管文件完整性 |

---

## 仓库目录结构 · Repository Layout

```text
site.toml                  站点与书目配置（下游所有）
PROJECT.md                 书库写作规范、受控术语表与诚实标注契约（下游所有）
trureturing.lock.json      所钉 trureturing 提交与已解析形式化声明账本（由 ./tbook pin 生成）
books/quantum-geometry/    《量子计算的几何直觉》双语源码（book.toml, zh/, en/, assets/）
theme/  tools/  docs/      上游模板托管的赛博朋克主题、构建工具链与技术契约文档
```

---

## 许可协议 · License

- 书库构建框架与工具代码采用 `Apache-2.0` 许可协议发布（见 [LICENSE](LICENSE)）。
- 专著《量子计算的几何直觉 / *Geometric Intuition of Quantum Computing*》文本与插图由作者 Auric 按 `CC-BY-4.0`（Creative Commons Attribution 4.0 International）许可协议发布（声明于 [books/quantum-geometry/book.toml](books/quantum-geometry/book.toml)）。
