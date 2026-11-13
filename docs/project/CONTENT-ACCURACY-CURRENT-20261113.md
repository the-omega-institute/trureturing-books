# 现行 45 单元双语准确性基线 · 2026-11-13

本表对应《量子计算的几何直觉》输入 main `4df588e257aa4561465f9e0c74354d643a33fe74`，以当前 [中文 SUMMARY](../../books/quantum-geometry/zh/SUMMARY.md) 和 [英文 SUMMARY](../../books/quantum-geometry/en/SUMMARY.md) 为准：序曲、39 章、终章、附录 A–D，共 **45 单元、90 个语言状态槽**。中文为权威版本，保留作者原文风格与题记。此为未提交的文档／本地 skill 候选；提交后仍须对应最终路径与摘要。

出版来源为 `trureturing@e526f0f5e3a1e84b05f05c0c009eab920bc3a06f`／`dev`、549 条锁记录，模板 `0.7.0`。这些是当前输入身份，不是本次逐条核验 Lean 声明或正文的结论。当前 SUMMARY 的 SHA-256：中文 `78d2eba36fa2ecd37f7e69b9fd327d5e5f8c42054238080d7e5124fceca42fe2`；英文 `18dea468e166d789f29c3569cafd3ae9b62edbc059448ecb8a4358da120be7f8`。

历史 [44 单元表](CONTENT-ACCURACY-CURRENT-20261112.md) 第 3–52 行属于 `a6db32bc0717bea3445811e5935acb156732e85a`、附录 A–C；其后的局部实施与复审追加也各有原输入。它的全部字节保留。总台账开头的 [35 单元／9/35](CONTENT-ACCURACY.md#全书覆盖) 同样保留历史归属。当前目标包括第 31–39 章及附录 D 的内容准确性，不再仅把它们列作旧 35 单元的出版依赖；扩大目标没有增加批准数。

## 对应依据与状态含义

调用方提供的不可变 intake 位于 `/private/tmp/qg-main4df-current-coverage-intake-20261113/`：`caller-input-manifest.json` 与 `caller-supplement-input-manifest.json` 所列六份副本均与本次输入逐字节对应。它们是 intake 依据，不是独立审查。

先核对当前 SUMMARY，再使用 `/private/tmp/qg-main347-current-baseline-20261113/current-unit-roster.json`：90 行的语言、0–44 次序、文件名及源摘要全部对应当前输入，**90 相同、0 改变、0 缺失、0 多余**。这是章源身份桥，不能把旧执行、图像、分页、原生阅读器或独立审查移作当前证据。该名册记载的 exact-pin 依赖对应只按其原有同一断言范围保留；本次没有重新验证导入闭包或运行 Lean。

下表每种语言各有一个状态槽，链接指向相应当前章源。`P` 均表示**当前完整单元接受待办**；后缀说明已有证据，绝不表示“从未读过”：

- `P-H`：保留所列历史阅读／修订／审查的限定范围，当前相关依赖与待办仍须逐项结案。
- `P-Δ`：已有明确的增量源阅读记录；不把该范围扩大到整章或媒体。
- `P-R`：已有双语完整源阅读记录；确认问题、文献、修复、独立审查与输出仍按原范围待办。
- `P-M`：已有部分增量源证据，仍欠当前源／消费者的完整对应。
- `P-E`：本次所用记录未建立完整单元证据；保留已有局部记录，不断言未曾阅读。

每槽共同待办分别为：当前内容准确性结案、相关 Lean／数学／物理／文献与双语／媒体证据对应、当前输出实际阅读、独立审查、最终候选生命周期对应。没有任何槽因哈希、计数或 CI 获得内容批准。H 编号见表后的证据入口。

## 当前名册

| 序号 | SUMMARY 文件 | zh 状态／章源 | en 状态／章源 | 限定证据入口 |
| --- | --- | --- | --- | --- |
| 0 | `README.md` | [P-H](../../books/quantum-geometry/zh/README.md) | [P-H](../../books/quantum-geometry/en/README.md) | H01 |
| 1 | `ch01-measurement.md` | [P-H](../../books/quantum-geometry/zh/ch01-measurement.md) | [P-H](../../books/quantum-geometry/en/ch01-measurement.md) | H01 |
| 2 | `ch02-born-rule.md` | [P-H](../../books/quantum-geometry/zh/ch02-born-rule.md) | [P-H](../../books/quantum-geometry/en/ch02-born-rule.md) | H02 |
| 3 | `ch03-projectors-and-duality.md` | [P-Δ](../../books/quantum-geometry/zh/ch03-projectors-and-duality.md) | [P-Δ](../../books/quantum-geometry/en/ch03-projectors-and-duality.md) | H02、H14 |
| 4 | `ch04-decoherence.md` | [P-H](../../books/quantum-geometry/zh/ch04-decoherence.md) | [P-H](../../books/quantum-geometry/en/ch04-decoherence.md) | H02 |
| 5 | `ch05-complex-phase-and-rotors.md` | [P-H](../../books/quantum-geometry/zh/ch05-complex-phase-and-rotors.md) | [P-H](../../books/quantum-geometry/en/ch05-complex-phase-and-rotors.md) | H03 |
| 6 | `ch06-geometric-product.md` | [P-H](../../books/quantum-geometry/zh/ch06-geometric-product.md) | [P-H](../../books/quantum-geometry/en/ch06-geometric-product.md) | H03 |
| 7 | `ch07-geometric-time-and-speed-limits.md` | [P-H](../../books/quantum-geometry/zh/ch07-geometric-time-and-speed-limits.md) | [P-H](../../books/quantum-geometry/en/ch07-geometric-time-and-speed-limits.md) | H03 |
| 8 | `ch08-erasure-and-time-arrows.md` | [P-H](../../books/quantum-geometry/zh/ch08-erasure-and-time-arrows.md) | [P-H](../../books/quantum-geometry/en/ch08-erasure-and-time-arrows.md) | H03 |
| 9 | `ch09-axes-and-state-addressing.md` | [P-H](../../books/quantum-geometry/zh/ch09-axes-and-state-addressing.md) | [P-H](../../books/quantum-geometry/en/ch09-axes-and-state-addressing.md) | H04 |
| 10 | `ch10-gram-geometry-and-order.md` | [P-H](../../books/quantum-geometry/zh/ch10-gram-geometry-and-order.md) | [P-H](../../books/quantum-geometry/en/ch10-gram-geometry-and-order.md) | H04 |
| 11 | `ch11-pulses-and-virtual-z.md` | [P-H](../../books/quantum-geometry/zh/ch11-pulses-and-virtual-z.md) | [P-H](../../books/quantum-geometry/en/ch11-pulses-and-virtual-z.md) | H04 |
| 12 | `ch12-measurement-computation-and-gradients.md` | [P-H](../../books/quantum-geometry/zh/ch12-measurement-computation-and-gradients.md) | [P-H](../../books/quantum-geometry/en/ch12-measurement-computation-and-gradients.md) | H04 |
| 13 | `ch13-entanglement-and-chsh.md` | [P-H](../../books/quantum-geometry/zh/ch13-entanglement-and-chsh.md) | [P-H](../../books/quantum-geometry/en/ch13-entanglement-and-chsh.md) | H05 |
| 14 | `ch14-cloning-codes-and-braids.md` | [P-Δ](../../books/quantum-geometry/zh/ch14-cloning-codes-and-braids.md) | [P-Δ](../../books/quantum-geometry/en/ch14-cloning-codes-and-braids.md) | H05、H14 |
| 15 | `ch15-grover-qft-and-period-finding.md` | [P-H](../../books/quantum-geometry/zh/ch15-grover-qft-and-period-finding.md) | [P-H](../../books/quantum-geometry/en/ch15-grover-qft-and-period-finding.md) | H05 |
| 16 | `ch16-qsvt-walks-and-compilation.md` | [P-Δ](../../books/quantum-geometry/zh/ch16-qsvt-walks-and-compilation.md) | [P-Δ](../../books/quantum-geometry/en/ch16-qsvt-walks-and-compilation.md) | H05、H14 |
| 17 | `ch17-lorentz-geometry.md` | [P-H](../../books/quantum-geometry/zh/ch17-lorentz-geometry.md) | [P-H](../../books/quantum-geometry/en/ch17-lorentz-geometry.md) | H06 |
| 18 | `ch18-spinors-and-gauge-curvature.md` | [P-H](../../books/quantum-geometry/zh/ch18-spinors-and-gauge-curvature.md) | [P-H](../../books/quantum-geometry/en/ch18-spinors-and-gauge-curvature.md) | H06 |
| 19 | `ch19-tensor-networks-and-holography.md` | [P-H](../../books/quantum-geometry/zh/ch19-tensor-networks-and-holography.md) | [P-H](../../books/quantum-geometry/en/ch19-tensor-networks-and-holography.md) | H06 |
| 20 | `ch20-complexity-and-spacetime.md` | [P-H](../../books/quantum-geometry/zh/ch20-complexity-and-spacetime.md) | [P-H](../../books/quantum-geometry/en/ch20-complexity-and-spacetime.md) | H06 |
| 21 | `ch21-diagonalization-and-escape.md` | [P-H](../../books/quantum-geometry/zh/ch21-diagonalization-and-escape.md) | [P-H](../../books/quantum-geometry/en/ch21-diagonalization-and-escape.md) | H07 |
| 22 | `ch22-primes-euler-products-and-zeros.md` | [P-H](../../books/quantum-geometry/zh/ch22-primes-euler-products-and-zeros.md) | [P-H](../../books/quantum-geometry/en/ch22-primes-euler-products-and-zeros.md) | H07 |
| 23 | `ch23-diophantine-definability.md` | [P-H](../../books/quantum-geometry/zh/ch23-diophantine-definability.md) | [P-H](../../books/quantum-geometry/en/ch23-diophantine-definability.md) | H07、H14 |
| 24 | `ch24-cosine-fixed-points-and-self-reference.md` | [P-H](../../books/quantum-geometry/zh/ch24-cosine-fixed-points-and-self-reference.md) | [P-H](../../books/quantum-geometry/en/ch24-cosine-fixed-points-and-self-reference.md) | H07、H14 |
| 25 | `ch25-rewriting-and-xor.md` | [P-H](../../books/quantum-geometry/zh/ch25-rewriting-and-xor.md) | [P-H](../../books/quantum-geometry/en/ch25-rewriting-and-xor.md) | H08、H14 |
| 26 | `ch26-single-qubit-rotor-compilation.md` | [P-H](../../books/quantum-geometry/zh/ch26-single-qubit-rotor-compilation.md) | [P-H](../../books/quantum-geometry/en/ch26-single-qubit-rotor-compilation.md) | H08、H14 |
| 27 | `ch27-reading-frozen-proofs-i.md` | [P-H](../../books/quantum-geometry/zh/ch27-reading-frozen-proofs-i.md) | [P-H](../../books/quantum-geometry/en/ch27-reading-frozen-proofs-i.md) | H08、H14 |
| 28 | `ch28-reading-frozen-proofs-ii.md` | [P-H](../../books/quantum-geometry/zh/ch28-reading-frozen-proofs-ii.md) | [P-H](../../books/quantum-geometry/en/ch28-reading-frozen-proofs-ii.md) | H08、H14 |
| 29 | `ch29-timeless-causality-and-gram-space.md` | [P-Δ](../../books/quantum-geometry/zh/ch29-timeless-causality-and-gram-space.md) | [P-Δ](../../books/quantum-geometry/en/ch29-timeless-causality-and-gram-space.md) | H09、H14 |
| 30 | `ch30-fields-lines-eth-and-navier-stokes.md` | [P-Δ](../../books/quantum-geometry/zh/ch30-fields-lines-eth-and-navier-stokes.md) | [P-Δ](../../books/quantum-geometry/en/ch30-fields-lines-eth-and-navier-stokes.md) | H10、H14 |
| 31 | `ch31-quantum-fairness.md` | [P-H](../../books/quantum-geometry/zh/ch31-quantum-fairness.md) | [P-H](../../books/quantum-geometry/en/ch31-quantum-fairness.md) | H11 |
| 32 | `ch32-unified-field-and-meta-unification.md` | [P-H](../../books/quantum-geometry/zh/ch32-unified-field-and-meta-unification.md) | [P-H](../../books/quantum-geometry/en/ch32-unified-field-and-meta-unification.md) | H07 |
| 33 | `ch33-all-beings-observers-and-mutual-attractors.md` | [P-E](../../books/quantum-geometry/zh/ch33-all-beings-observers-and-mutual-attractors.md) | [P-E](../../books/quantum-geometry/en/ch33-all-beings-observers-and-mutual-attractors.md) | H00 |
| 34 | `ch34-orthogonality-degeneracy-and-observer-position.md` | [P-E](../../books/quantum-geometry/zh/ch34-orthogonality-degeneracy-and-observer-position.md) | [P-E](../../books/quantum-geometry/en/ch34-orthogonality-degeneracy-and-observer-position.md) | H00 |
| 35 | `ch35-light-pulse-and-self-referential-table.md` | [P-E](../../books/quantum-geometry/zh/ch35-light-pulse-and-self-referential-table.md) | [P-E](../../books/quantum-geometry/en/ch35-light-pulse-and-self-referential-table.md) | H00 |
| 36 | `ch36-hyperbolic-steps-and-quotienting-reincarnation.md` | [P-E](../../books/quantum-geometry/zh/ch36-hyperbolic-steps-and-quotienting-reincarnation.md) | [P-E](../../books/quantum-geometry/en/ch36-hyperbolic-steps-and-quotienting-reincarnation.md) | H00 |
| 37 | `ch37-dreams-quantum-eraser-and-nonlocal-observer.md` | [P-R](../../books/quantum-geometry/zh/ch37-dreams-quantum-eraser-and-nonlocal-observer.md) | [P-R](../../books/quantum-geometry/en/ch37-dreams-quantum-eraser-and-nonlocal-observer.md) | H13、H14 |
| 38 | `ch38-observer-memory-pointer-and-ontological-qram.md` | [P-R](../../books/quantum-geometry/zh/ch38-observer-memory-pointer-and-ontological-qram.md) | [P-R](../../books/quantum-geometry/en/ch38-observer-memory-pointer-and-ontological-qram.md) | H13、H14、H15 |
| 39 | `ch39-observer-is-ontological-universe.md` | [P-H](../../books/quantum-geometry/zh/ch39-observer-is-ontological-universe.md) | [P-H](../../books/quantum-geometry/en/ch39-observer-is-ontological-universe.md) | H13 |
| 40 | `coda.md` | [P-M](../../books/quantum-geometry/zh/coda.md) | [P-M](../../books/quantum-geometry/en/coda.md) | H12、H14 |
| 41 | `appendix-a.md` | [P-H](../../books/quantum-geometry/zh/appendix-a.md) | [P-H](../../books/quantum-geometry/en/appendix-a.md) | H12 |
| 42 | `appendix-b.md` | [P-H](../../books/quantum-geometry/zh/appendix-b.md) | [P-H](../../books/quantum-geometry/en/appendix-b.md) | H12 |
| 43 | `appendix-c.md` | [P-M](../../books/quantum-geometry/zh/appendix-c.md) | [P-M](../../books/quantum-geometry/en/appendix-c.md) | H12、H14 |
| 44 | `appendix-d.md` | [P-H](../../books/quantum-geometry/zh/appendix-d.md) | [P-H](../../books/quantum-geometry/en/appendix-d.md) | H14 |

## 限定证据入口

以下入口定位历史事实与待办；每份文档中的“当前”只相对于它所写的输入，不改作本表 main 的批准。没有完整依赖桥的部分保留原输入，按变化重核，不要求仅因工具变化就重读全部未变正文。

| 入口 | 保留的范围及当前边界 |
| --- | --- |
| H00 | [历史 44 单元名册](CONTENT-ACCURACY-CURRENT-20261112.md) 的待办行及上述 90 行来源名册；没有从待办推导“从未阅读”。 |
| H01 | [总台账首批](CONTENT-ACCURACY.md#首批序曲第-1-章固定源码与冻结条目) 的源、计算、阅读与历史审查；[四项事实修订](CONTENT-ACCURACY-FOUR-FACTS-20261113.md) 仅覆盖其列明问题，未取得当前完整单元批准。 |
| H02 | [第 2–4 章增量记录](CONTENT-ACCURACY-OPENING-DELTA-20261112.md) 与总台账历史全文记录；新增段落及消费者按各输入限定。 |
| H03 | [总台账第 5–8 章及后续修复](CONTENT-ACCURACY.md#第-58-章重审结论与有界修复清单)、[第八章 DPI](CONTENT-ACCURACY-CH08-DPI-20261112.md)、[四项事实修订](CONTENT-ACCURACY-FOUR-FACTS-20261113.md)；历史 9/35 不变，当前媒体／复审义务保留。 |
| H04 | [总台账第 9–12 章](CONTENT-ACCURACY.md#第-912-章当前有界准确性修复待独立复审) 及其末尾 2026-11-13 追加：完整双语原文阅读、三项有限修订和 `0771be14` 的受影响实际输出均有记录；Berry 两项缺陷未关闭。 |
| H05 | [总台账第 13–16 章](CONTENT-ACCURACY.md#第-1316-章实施完成待独立复审) 与 [综合迁移／复审](CONTENT-ACCURACY-CONSOLIDATED-20261112.md)：保留有限数学修订、旧输出及否决／遮挡观察，不继承逐来源批准。 |
| H06 | [第 17–20 章](CONTENT-ACCURACY-CH17-CH20-20261112.md)：历史源与有界修订／输出，对当前新增导读等仍需相关依赖对应。 |
| H07 | [总台账第 21–24 章及 PR127 后续](CONTENT-ACCURACY.md#ch2124-首次实施的历史证据8ca77e2待独立复审)、[Dottie 局部修复及 R1 后追加](CONTENT-ACCURACY-CURRENT-20261112.md)：第 24／32 章相关媒体的局部证据不等于整章批准；短高度、HUD 与其他版式债保留。 |
| H08 | [第 25–28 章](CONTENT-ACCURACY-CH25-CH28-20261112.md) 的源与受影响消费者记录；旧 pin、unit-ball 修订、声明地图及输出各保留其身份。 |
| H09 | [第 29 章](CONTENT-ACCURACY-CH29-20261112.md) 的历史修订；较新有界计算／消费者与七项增量问题见 H14，不能把普通套件通过扩大为读者／独立审查通过。 |
| H10 | [第 30 章](CONTENT-ACCURACY-CH30-20261112.md) 与总台账量词／样本图注历史；较新双语增量见 H14。 |
| H11 | [第 31 章](CONTENT-ACCURACY-CH31-20261112.md)：`a6db32bc` 完整双语阅读及 `b2616878` 有限修订／新增注记核查在案，不称从未读过；完整现行单元、原文献、消费者、首次独立审查等仍待结案。 |
| H12 | [终章与附录 A–C](CONTENT-ACCURACY-ENDING-APPENDICES-20261112.md) 的原 35 范围及后续有限输出；终章／附录 C 较新计数、熵源增量另见 H14，不继承整书分页结论。 |
| H13 | [第 37–39 章三项有界修订](CONTENT-ACCURACY-CH37-CH39-20261113.md)：六份原章全文阅读属于 `a6db32bc`；原生补完的实际 PDF／EPUB 阅读属于 `45687dfb`／`37ac4a0d`，原生 Books／iOS、字体／溢出、布局、全片／音频等限制保留。 |
| H14 | 上述调用方 90 行名册中的行级与 `scoped_audit_observations` 记录，按下段限定复用；本次只核对章源摘要桥，未打开其引用的其他任务或证据目录。 |
| H15 | 调用方提供的已封存 `caller-adjudication-20261113-0949.json`（路径见下段），仅证明第一次返回候选的静态裁决，不证明新的活动修复状态。 |

H14 的重要限定：第 3／14 章在 `13dfca93` 的新段落源核查无确认修订，阅读上下文不等于整章批准；第 16 章 `817af9a5` 每语新增 46 行的数学／双语 delta 已读、无确认问题，名册中较早的“待审”字段不应覆盖此后记录，独立准确性审查仍待办。第 23–28 章有旧源对应，声明地图／部分派生图仍是不同依赖；第 29／30 章的新 delta 已核查并确认七项问题，后续修复／输出状态不据旧名册推定。终章／附录 C 已有 `a6a6001f` 熵／索引／计数增量源检查，未完成当前消费者接受。附录 D 的 D01–D06 有局部修订记录，手机／媒体阅读失败、新回归及 N01 等限制未因本表消失。

第 37／38 章在 `13dfca93`／`3b3ab588` 已有完整双语源审计，分别确认四项与十四项问题；名册记载到 `347ef8d1`／`e526f0f5` 的限定源对应，本次再建立到 `4df588e2` 的章源字节桥。原文献缺口、修复与输出／独立审查仍按原范围保留；不把“完整源已读”改为“当前完整单元已批准”。名册中的 PR／在途状态只保留原观察时间；本次未查询更新，当前修复、PR、CI、合入及 Pages 状态未知／待调用方核实。

H15 为 `/private/tmp/qg-main13df-ch38-minimal-factual-repair-20261113/caller-adjudication-20261113-0949.json`，09:49 静态裁决拒绝第一次返回候选的全部十四项完成／可合入说法：原 `pnp` 生产器 `main.js:758` 按 regime 给出 pipeline 极值，`tests:297–301` 对两种 wire 也期待同一 pipeline 值。裁决的独立算术区分 serial 端点最小值与 pipeline 交点最小值，支持本次既有定量域规则的精化。它不是本次的新源检查、浏览器执行或对活动修复的评价；没有另建问题登记表。

## 距离全书目标仍欠的工作

逐个当前单元建立／补齐正文、正式环境与证明、公式／数值／表格、文献归属、物理适用条件、双语及媒体可见内容的证据链。冻结声明须核对完整 exact-pin 假设、类型、定义域、量词及结论；已有源阅读只在同一断言的相关依赖对应范围内复用。已确认缺陷作最小必要修订，保留作者原声与题记；需要新定理时走现有形式化／冻结流程。

对每个有变化或未覆盖的生产器、共享运行时、图像／静帧／海报、字幕／旁白、引用卡及既有导出消费者分别核对。源身份、实际输出阅读、独立内容审查与 PR 生命周期分列；历史实际看过的页／图保留原输入，当前 HTML／六种 PDF／两语 EPUB／site／幻灯片的构建、EPUBCheck 与实际阅读，以及原生 Books／iOS、影片连续播放／音频等未验范围，均不由本次文档检查结案。既有 Berry、HUD／手机重叠与裁切、字形／字体／横向溢出、原始文献等未尽事项沿用原记录，不自动关闭，也不重复立项。

调用方负责本候选与后续提交的对应及独立 R1，严格保留 [PROJECT 第 7 节](../../PROJECT.md#7-多智能体协同分工与五路并行工作流)／[WORKFLOW 第 3 节](WORKFLOW.md#3-三席独立审查与算力调度策略sshx-verification-protocol) 的初轮和后续轮次组成；实施自检不代替该审查。旧台账中的 initial R1／R2+ 等债务及已花费额度全部保留；本次有界实施 assignment 总 1／已用 1／剩余 0，最终整书输出／采纳保留 **1 未使用**。Git／PR／CI／合入／Pages 全归调用方；旧主线或其他 PR 的成功不能给本候选新增批准。后续 main 变动按实际相关依赖增量复核，当前全书目标继续进行。
