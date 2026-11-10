# trureturing 书库 · trureturing Books

**每一条定理都经 Lean 内核验证的双语形式化专著与教材书库。**  
*Bilingual formal monographs and self-contained textbooks in which every theorem is kernel-verified in Lean.*

本书库中的每一部专著均遵循“书负责解释，Lean 负责成立”的分工契约：所有正式的 `theorem`、`lemma`、`proposition` 与 `corollary` 均按全局标识符（GID）绑定至 [trureturing](https://github.com/the-omega-institute/trureturing)（`dev` 分支，精确提交锁定于 [trureturing.lock.json](trureturing.lock.json)）中已经 Lean 4 内核验证并冻结的声明。同一份中英双语源码同步导出为在线 HTML（构建期 KaTeX 排版与源码永久链接）、PDF（深色屏幕版与白底印刷版）及兼容 Apple Books 的 EPUB 3。

Every formal `theorem`, `lemma`, `proposition`, and `corollary` in this library cites a declaration verified by the Lean 4 kernel and frozen on the `dev` branch of [trureturing](https://github.com/the-omega-institute/trureturing), pinned in [trureturing.lock.json](trureturing.lock.json). A single aligned Chinese and English source builds cleanly into online HTML, screen and print PDFs, and MathML-enabled EPUB 3.

---

## 在编专著 · Featured Monograph

### 《量子计算的几何直觉：从两子丈量、球外之球到 $\psi = \psi(\psi)$》
***Geometric Intuition of Quantum Computing: From Pairwise Measurement and Spheres Beyond Spheres to $\psi = \psi(\psi)$***

- **作者 / Author**：Auric
- **代号 / Code**：`ORTHO//QUANTUM`
- **路径 / Path**：[books/quantum-geometry/](books/quantum-geometry/book.toml)（中文权威版 `zh/` · 英文版 `en/`）
- **文本许可 / Text License**：`CC-BY-4.0`

本书将直观的物理机制推演、概念谱系批判与机器形式化证明熔于一炉，沿着**“点 $\to$ 线 $\to$ 面 $\to$ 球 $\to$ 多球共振 $\to$ 时空之球 $\to$ 球外之球与机械法典”**的七部二十八章正交阶梯推进：

| 部次 / Part | 主题 / Theme | 章节范围 / Chapters |
| :--- | :--- | :--- |
| **序曲 / Prelude** | 点、线、面、球，与球外的人（四重维度盲区与自指收束） | `README.md` |
| **第一部 / Part I** | 破妄·从点到线：两子丈量与零冗余投影 | 第 1–4 章（已发布：两子丈量、无第 3 点玻恩迹配对、幂等存在线与霍奇对偶、环境偏迹退相干与噪声几何收缩） |
| **第二部 / Part II** | 展翼·从线到面：正交分叉、量子门与时间二象性 | 第 5–8 章 |
| **第三部 / Part III** | 合拢·从面到球：三元正交、全局相容与注意力计算 | 第 9–12 章 |
| **第四部 / Part IV** | 交织·多球共振：量子纠缠、容错编码与算法大一统 | 第 13–16 章 |
| **第五部 / Part V** | 显影·时空之球：相对论度规、规范力场与全息引力 | 第 17–20 章 |
| **第六部 / Part VI** | 越界·球外之球：哥德尔逃逸、算术频谱与 $\psi = \psi(\psi)$ | 第 21–24 章 |
| **第七部 / Part VII** | 铸剑·机械法典：零矩阵几何引擎与形式化证明库 | 第 25–28 章、终跋与附录 A–C |

本书库的文风规范、中英受控术语表与三层认识论诚实契约详见 [PROJECT.md](PROJECT.md)。

---

## 形式化验证契约 · Verification Contract

1. **Lean 内核验证定理（绿色 `LEAN ✓`）**：凡使用 `theorem`、`lemma`、`proposition`、`corollary` 环境的条目，均通过 `lean="<GID>"` 指向 `trureturing@dev` 所钉提交中状态片 `Golden/Frozen/state/<module>.lean.json` 已冻结为 `theorem` 的声明，书末自动生成带源码行号链接的形式化验证账本（[trureturing.lock.json](trureturing.lock.json) 同时解析 `definition` 环境与行内代码链接所引用的 Lean `def`/`inductive` 声明以生成源码链接，但仅有 `theorem` 类声明驱动正式定理盒并获授绿色 `LEAN ✓` 徽章 / *[trureturing.lock.json](trureturing.lock.json) also resolves referenced Lean `def`/`inductive` declarations for `definition` blocks and inline code links, while only `theorem`-kind declarations power formal theorem boxes and receive the green `LEAN ✓` badge*）。
2. **经典文献结果（常规边框 `remark` / `example`）**：数学物理文献中已有严格证明、但尚未在本书所钉仓库形式化的背景定理（如 Gleason 定理、Busch 定理、Stinespring 扩张定理、Lindemann–Weierstrass 定理），统一置于 `remark` 或 `example` 环境中，并显式标明“文献结果，未在本书形式化” / *Literature result, not formalized in this book*。
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
| `./tbook build html pdf epub site` | 构建中英双语 HTML、屏幕版/印刷版 PDF、EPUB 3 与书库门户站点 |
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
