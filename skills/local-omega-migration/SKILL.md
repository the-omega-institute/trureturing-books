---
name: local-omega-migration
description: 把书中能用纯 Omega 数学（trureturing 的 OmegaInit 与 OmegaMath）表达的 Lean 引用迁移到“仅 Omega · 零公理”的冻结声明时使用：盘点、复核候选、推动上游形式化、回书改引用、在追踪 Issue 记账。
---

# 迁移到纯 Omega 数学

项目决策与追踪 Issue 见 [PROJECT.md 第 15 节](../../PROJECT.md)。本 skill 写一批迁移怎么做；批次划分、复核结论与进度只写在追踪 Issue 与对应 PR 里，不写进仓库（第 11 节）。

**用**：推进追踪 Issue 中的一批；复核某条引用能否迁移；迁移合入后记账。

**不用**：写新定理（`skills/theorem-formalize`）；只升级钉版（`skills/trureturing-pin`）；把实数结论改写成有理数版本（这是作者的写作决定，先问作者）。

## 1. 盘点

```bash
export TRURETURING_DIR="${TRURETURING_DIR:-$HOME/trureturing}"
git -C "$TRURETURING_DIR" fetch origin dev
python3 skills/local-omega-migration/omega_inventory.py                 # 全部书，约 4 分钟
python3 skills/local-omega-migration/omega_inventory.py --book quantum-geometry
```

脚本只读 `--ref`（默认 `origin/dev`）上的冻结状态片与源码，不改上游 checkout；输出在 `build/omega/`（不提交）：`inventory.json` 给每条引用的层级、两个后端各自的 `libraries` 与 `axioms`、签名与全部被引位置（含视频、演示文稿与可视化），`inventory.md` 按层级列出候选，并写明 `A-omega` 各条在官方端的公理。

| 层级 | 判定 |
| --- | --- |
| `A-omega` | 冻结行某一后端的测量中，`libraries` 是 `{OmegaInit, OmegaMath}` 的非空子集，且 `axioms` 为 `[]`：已迁移。主记录是官方端，`strict_omega` 是严格端；官方端把基础库记作 `Init`，所以 D5 的 Omega 出版引用靠严格端入选 |
| `C-exact` | 签名与模块源码只用自然数、整数、有理数、有限对象或纯逻辑：候选 |
| `B-structural` | 用到 Mathlib 的有限结构（`Finset`、`Matrix`、`ZMod`、图、群等）：候选，需先在 OmegaMath 补基础设施 |
| `D-analytic` | 需要实数、复数、极限、测度、拓扑或赋范空间：不迁移 |
| `N-definition` | 被引的是定义：随引用它的定理处理 |
| `X-bridge` | 有意读到 Mathlib 的桥接模块（`OmegaShadowBridge`）：不迁移 |
| `unresolved` | 在所读提交上解析不到：先查上游冻结状态 |

`A-omega`、`N-definition`、`X-bridge`、`unresolved` 由冻结字段与模块名确定；`C-exact`、`B-structural`、`D-analytic` 只是按签名与模块源码的初筛。`D-analytic` 偶有误判（陈述本身不含实数，只是同模块别处用了实数），复核时可转回候选。

## 2. 复核候选

逐条读被引声明的完整 Lean 陈述（含它用到的定义）与书中定理框：

1. 每个对象能否在严格 Omega 库中表达，换过去后**数学内容是否不变**。`ℕ` 换成 Peano 的 `Omega.Nat`、`ℤ` 换成 `Omega.Int`、`ZMod n` 换成余数映射、`Set.range` 换成双向存在都不改变内容；`ℝ` 换成有理数会改变内容，不算迁移。
2. 证明所需的基础在 OmegaMath 中有没有、缺多少。大规模有限枚举在 Peano 表示下能否由内核归约，先做小探针再排批次。
3. 同一 GID 在书中还被哪些定理框、正文链接与媒体引用；一个定理框引多条 GID 时，全部迁移后才算这个框迁移完成。

结论写进追踪 Issue：可迁的按主题排入批次并注明依托的 OmegaMath 模块与缺口，不迁的写明理由。

## 3. 上游形式化

在 trureturing 按它的 `CLAUDE.md` §3.1–3.2、`src/README.md` 与 `skills/codex-formalize/SKILL.md` 工作；本仓库不写 Lean。

- 项目自己的数学放 `src/OmegaMath/`，原创模块文档首行写 `Omega original.`。钉版 Lean Init 的严格移植放 `strict/OmegaInit/`，钉版 Mathlib 的严格移植放 `strict/OmegaMathlib/`。移植沿用上游定义模块的相对路径，声明全名前加 `Omega.`。`src/OmegaInit/` 与 `src/OmegaMathlib/` 是生成的官方接口。
- 面向书的结论放 D5 模块：`module`、`prelude`，只 `public import` 所需的 Omega 模块；一批按主题合成少数几个模块。
- PR 正文逐条写书中位置（文件与 `#id`）、被替换的原 GID 与新 GID；判形照实写 `bind-only`，准入依据是 §3.2 的“OmegaMath 的 D5 出版引用”，数学成果归于 OmegaMath 中的原证明。
- 合入 `dev` 并冻结后按书锁在冻结状态片中匹配声明行，核对官方端 `declarations[].libraries` 与 `declarations[].axioms`。历史行缺官方公理字段时只给出许可上界。有严格端测量时，同时核对该行的 `declarations[].strict_omega.libraries` 与 `declarations[].strict_omega.axioms`。库根的空内核重放可用 `lake test -- <严格库根>`，D5 消费模块先用 `make install-tools` 安装所钉检查器，再用 `python3 src/OmegaChecks/portable.py --backend both <消费模块名>` 检查双端编译和导出。写作与核验见 [local-content-accuracy](../local-content-accuracy/SKILL.md)。

## 4. 回到书库

1. `git -C "$TRURETURING_DIR" fetch origin dev`，`./tbook pin --refresh`。
2. 先改权威版本（`zh`）再同步 `en`：`lean="…"`、正文的 `lean:` 链接、视频 `film.json` 与 `scenes.js`、演示文稿的 `gid=`、可视化里的 GID，位置与顺序逐语言一致。
3. 定理框按新的 Lean 陈述重写，假设与结论逐项对齐：`IntRatio.Equivalent` 写“两个比值相等”，有限性、非零分母一类前提照写，不沿用旧声明的措辞。`proof` 块可以说明证据所覆盖的后端及其公理依赖，结语仍是固定句。
4. `lean=` 有增删时运行 `python3 books/quantum-geometry/viz/lean-declaration-map/gen-data.py` 与 `node tools/node/viz-thumbs.mjs quantum-geometry lean-declaration-map`；由锁文件算数的静态图运行 `./tbook fig build --book quantum-geometry`（`PROJECT.md` 第 6 节第 6 条）。
5. `./tbook check` 0 错误，构建并抽查受影响章节，提 PR，正文附上游 PR 链接与追踪 Issue。

## 5. 记账

合入后重跑盘点，在追踪 Issue 评论：批次、两仓 PR、各书 `A-omega` 与待迁候选的新条数、复核中确认不迁的条目与理由。

## 禁止

- 上游未合入 `dev` 并冻结前改书中引用或声称已迁移。
- 把实数、复数结论换成有理数版本后当作同一结论引用。
- 把定义、桥接声明或未复核的条目算作已迁移。
- 在仓库里保存批次清单、复核台账或进度快照。
- 手改 `trureturing.lock.json`。
