# 现行整书准确性基线

目录输入为已合入 main `89e45e6baeae05d4864945d300f70f5ec3da0c72`，以该提交的中英文 `SUMMARY.md` 为名册；本次未提交修订仅涉及第8章计数与第35章图注及两份准确性文档。每语 **58页、46个主单元**：序曲、39章、终章及附录A–E；两语文件、顺序与层级对应。所有正文、定理与证明、数值、物理条件、文献、图表、实验及影音说明均在整书目标内，保留作者风格与题记。

当前锁为 `trureturing@a313d1ce217f58f284d14d3b7d8231c5773b8d55`／`dev`，解析610条声明。前一基线 `402b5a2e444b264cd5bd7776b024b346f3bdd5e2` 的 pin `a79bb042b93f03887703825ec4661602f43d976e`／604条与当时的检查、阅读和审查保持历史归属。旧[51页／45单元基线](CONTENT-ACCURACY-CURRENT-20261114.md)固定于 `b5a75e5932b73a8a97399a764ff81d63d528930d`；更早35单元／9/35仅保留各自历史归属。已有阅读与审查未被清零，也不因换名册自动升级为当前接受。

## 全部页面与身份对应

下表用正式 SUMMARY 解析器逐页排列，对照 `89e45e6b` 的已提交源码。两语 SUMMARY 均与 `402b5a2e` 字节相同；每语相对该输入52页相同、6页改变（第8章、32.1、32.2、第35章、第39章、附录C），无增删。相对 `b5a75e59`，每语30页相同、21页改变、7页新增、0页移除；“同／变／新增”只比较对应文件字节。“待核”指当前完整页面接受仍未证明，不表示从未阅读；单处修正、构建与哈希相同均不能替代正文、pin、媒体、输出和独立审查的依赖核对。

| 主单元 | SUMMARY页面 | 对历史中／英 | 中文完整接受 | 英文完整接受 |
| --- | --- | --- | --- | --- |
| 序曲 | `README.md` | 变／变 | [待核](../../books/quantum-geometry/zh/README.md) | [待核](../../books/quantum-geometry/en/README.md) |
| 1 | `ch01-measurement.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch01-measurement.md) | [待核](../../books/quantum-geometry/en/ch01-measurement.md) |
| 2 | `ch02-born-rule.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch02-born-rule.md) | [待核](../../books/quantum-geometry/en/ch02-born-rule.md) |
| 3 | `ch03-projectors-and-duality.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch03-projectors-and-duality.md) | [待核](../../books/quantum-geometry/en/ch03-projectors-and-duality.md) |
| 4 | `ch04-decoherence.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch04-decoherence.md) | [待核](../../books/quantum-geometry/en/ch04-decoherence.md) |
| 5 | `ch05-complex-phase-and-rotors.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch05-complex-phase-and-rotors.md) | [待核](../../books/quantum-geometry/en/ch05-complex-phase-and-rotors.md) |
| 6 | `ch06-geometric-product.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch06-geometric-product.md) | [待核](../../books/quantum-geometry/en/ch06-geometric-product.md) |
| 7 | `ch07-geometric-time-and-speed-limits.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch07-geometric-time-and-speed-limits.md) | [待核](../../books/quantum-geometry/en/ch07-geometric-time-and-speed-limits.md) |
| 8 | `ch08-erasure-and-time-arrows.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch08-erasure-and-time-arrows.md) | [待核](../../books/quantum-geometry/en/ch08-erasure-and-time-arrows.md) |
| 9 | `ch09-axes-and-state-addressing.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch09-axes-and-state-addressing.md) | [待核](../../books/quantum-geometry/en/ch09-axes-and-state-addressing.md) |
| 10 | `ch10-gram-geometry-and-order.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch10-gram-geometry-and-order.md) | [待核](../../books/quantum-geometry/en/ch10-gram-geometry-and-order.md) |
| 11 | `ch11-pulses-and-virtual-z.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch11-pulses-and-virtual-z.md) | [待核](../../books/quantum-geometry/en/ch11-pulses-and-virtual-z.md) |
| 12 | `ch12-measurement-computation-and-gradients.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch12-measurement-computation-and-gradients.md) | [待核](../../books/quantum-geometry/en/ch12-measurement-computation-and-gradients.md) |
| 13 | `ch13-entanglement-and-chsh.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch13-entanglement-and-chsh.md) | [待核](../../books/quantum-geometry/en/ch13-entanglement-and-chsh.md) |
| 14 | `ch14-cloning-codes-and-braids.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch14-cloning-codes-and-braids.md) | [待核](../../books/quantum-geometry/en/ch14-cloning-codes-and-braids.md) |
| 15 | `ch15-grover-qft-and-period-finding.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch15-grover-qft-and-period-finding.md) | [待核](../../books/quantum-geometry/en/ch15-grover-qft-and-period-finding.md) |
| 16 | `ch16-qsvt-walks-and-compilation.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch16-qsvt-walks-and-compilation.md) | [待核](../../books/quantum-geometry/en/ch16-qsvt-walks-and-compilation.md) |
| 17 | `ch17-lorentz-geometry.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch17-lorentz-geometry.md) | [待核](../../books/quantum-geometry/en/ch17-lorentz-geometry.md) |
| 18 | `ch18-spinors-and-gauge-curvature.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch18-spinors-and-gauge-curvature.md) | [待核](../../books/quantum-geometry/en/ch18-spinors-and-gauge-curvature.md) |
| 19 | `ch19-tensor-networks-and-holography.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch19-tensor-networks-and-holography.md) | [待核](../../books/quantum-geometry/en/ch19-tensor-networks-and-holography.md) |
| 20 | `ch20-complexity-and-spacetime.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch20-complexity-and-spacetime.md) | [待核](../../books/quantum-geometry/en/ch20-complexity-and-spacetime.md) |
| 21 | `ch21-diagonalization-and-escape.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch21-diagonalization-and-escape.md) | [待核](../../books/quantum-geometry/en/ch21-diagonalization-and-escape.md) |
| 22 | `ch22-primes-euler-products-and-zeros.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch22-primes-euler-products-and-zeros.md) | [待核](../../books/quantum-geometry/en/ch22-primes-euler-products-and-zeros.md) |
| 23 | `ch23-diophantine-definability.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch23-diophantine-definability.md) | [待核](../../books/quantum-geometry/en/ch23-diophantine-definability.md) |
| 24 | `ch24-cosine-fixed-points-and-self-reference.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch24-cosine-fixed-points-and-self-reference.md) | [待核](../../books/quantum-geometry/en/ch24-cosine-fixed-points-and-self-reference.md) |
| 25 | `ch25-rewriting-and-xor.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch25-rewriting-and-xor.md) | [待核](../../books/quantum-geometry/en/ch25-rewriting-and-xor.md) |
| 26 | `ch26-single-qubit-rotor-compilation.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch26-single-qubit-rotor-compilation.md) | [待核](../../books/quantum-geometry/en/ch26-single-qubit-rotor-compilation.md) |
| 27 | `ch27-reading-frozen-proofs-i.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch27-reading-frozen-proofs-i.md) | [待核](../../books/quantum-geometry/en/ch27-reading-frozen-proofs-i.md) |
| 28 | `ch28-reading-frozen-proofs-ii.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch28-reading-frozen-proofs-ii.md) | [待核](../../books/quantum-geometry/en/ch28-reading-frozen-proofs-ii.md) |
| 29 | `ch29-timeless-causality-and-gram-space.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch29-timeless-causality-and-gram-space.md) | [待核](../../books/quantum-geometry/en/ch29-timeless-causality-and-gram-space.md) |
| 30 | `ch30-fields-lines-eth-and-navier-stokes.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch30-fields-lines-eth-and-navier-stokes.md) | [待核](../../books/quantum-geometry/en/ch30-fields-lines-eth-and-navier-stokes.md) |
| 30 | 子页：`ch30-s01-global-field.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch30-s01-global-field.md) | [待核](../../books/quantum-geometry/en/ch30-s01-global-field.md) |
| 30 | 子页：`ch30-s02-witness-lines.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch30-s02-witness-lines.md) | [待核](../../books/quantum-geometry/en/ch30-s02-witness-lines.md) |
| 30 | 子页：`ch30-s03-eth-and-horizons.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch30-s03-eth-and-horizons.md) | [待核](../../books/quantum-geometry/en/ch30-s03-eth-and-horizons.md) |
| 30 | 子页：`ch30-s04-navier-stokes.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch30-s04-navier-stokes.md) | [待核](../../books/quantum-geometry/en/ch30-s04-navier-stokes.md) |
| 30 | 子页：`ch30-s05-entanglement-and-entropy.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch30-s05-entanglement-and-entropy.md) | [待核](../../books/quantum-geometry/en/ch30-s05-entanglement-and-entropy.md) |
| 30 | 子页：`ch30-s06-summary.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch30-s06-summary.md) | [待核](../../books/quantum-geometry/en/ch30-s06-summary.md) |
| 31 | `ch31-quantum-fairness.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch31-quantum-fairness.md) | [待核](../../books/quantum-geometry/en/ch31-quantum-fairness.md) |
| 32 | `ch32-unified-field-and-meta-unification.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch32-unified-field-and-meta-unification.md) | [待核](../../books/quantum-geometry/en/ch32-unified-field-and-meta-unification.md) |
| 32 | 子页：`ch32-s01-axiom-of-comparison.md` | 新增／新增 | [待核](../../books/quantum-geometry/zh/ch32-s01-axiom-of-comparison.md) | [待核](../../books/quantum-geometry/en/ch32-s01-axiom-of-comparison.md) |
| 32 | 子页：`ch32-s02-oisc-comparison-engine.md` | 新增／新增 | [待核](../../books/quantum-geometry/zh/ch32-s02-oisc-comparison-engine.md) | [待核](../../books/quantum-geometry/en/ch32-s02-oisc-comparison-engine.md) |
| 32 | 子页：`ch32-s03-axioms-as-corollaries.md` | 新增／新增 | [待核](../../books/quantum-geometry/zh/ch32-s03-axioms-as-corollaries.md) | [待核](../../books/quantum-geometry/en/ch32-s03-axioms-as-corollaries.md) |
| 32 | 子页：`ch32-s04-generative-laws.md` | 新增／新增 | [待核](../../books/quantum-geometry/zh/ch32-s04-generative-laws.md) | [待核](../../books/quantum-geometry/en/ch32-s04-generative-laws.md) |
| 32 | 子页：`ch32-s05-physical-fields-and-six-domains.md` | 新增／新增 | [待核](../../books/quantum-geometry/zh/ch32-s05-physical-fields-and-six-domains.md) | [待核](../../books/quantum-geometry/en/ch32-s05-physical-fields-and-six-domains.md) |
| 32 | 子页：`ch32-s06-meta-unification-and-icosian-bridge.md` | 新增／新增 | [待核](../../books/quantum-geometry/zh/ch32-s06-meta-unification-and-icosian-bridge.md) | [待核](../../books/quantum-geometry/en/ch32-s06-meta-unification-and-icosian-bridge.md) |
| 33 | `ch33-all-beings-observers-and-mutual-attractors.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch33-all-beings-observers-and-mutual-attractors.md) | [待核](../../books/quantum-geometry/en/ch33-all-beings-observers-and-mutual-attractors.md) |
| 34 | `ch34-orthogonality-degeneracy-and-observer-position.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch34-orthogonality-degeneracy-and-observer-position.md) | [待核](../../books/quantum-geometry/en/ch34-orthogonality-degeneracy-and-observer-position.md) |
| 35 | `ch35-light-pulse-and-self-referential-table.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch35-light-pulse-and-self-referential-table.md) | [待核](../../books/quantum-geometry/en/ch35-light-pulse-and-self-referential-table.md) |
| 36 | `ch36-hyperbolic-steps-and-quotienting-reincarnation.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch36-hyperbolic-steps-and-quotienting-reincarnation.md) | [待核](../../books/quantum-geometry/en/ch36-hyperbolic-steps-and-quotienting-reincarnation.md) |
| 37 | `ch37-dreams-quantum-eraser-and-nonlocal-observer.md` | 同／同 | [待核](../../books/quantum-geometry/zh/ch37-dreams-quantum-eraser-and-nonlocal-observer.md) | [待核](../../books/quantum-geometry/en/ch37-dreams-quantum-eraser-and-nonlocal-observer.md) |
| 38 | `ch38-observer-memory-pointer-and-ontological-qram.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch38-observer-memory-pointer-and-ontological-qram.md) | [待核](../../books/quantum-geometry/en/ch38-observer-memory-pointer-and-ontological-qram.md) |
| 39 | `ch39-observer-is-ontological-universe.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch39-observer-is-ontological-universe.md) | [待核](../../books/quantum-geometry/en/ch39-observer-is-ontological-universe.md) |
| 终章 | `coda.md` | 变／变 | [待核](../../books/quantum-geometry/zh/coda.md) | [待核](../../books/quantum-geometry/en/coda.md) |
| 附录A | `appendix-a.md` | 变／变 | [待核](../../books/quantum-geometry/zh/appendix-a.md) | [待核](../../books/quantum-geometry/en/appendix-a.md) |
| 附录B | `appendix-b.md` | 同／同 | [待核](../../books/quantum-geometry/zh/appendix-b.md) | [待核](../../books/quantum-geometry/en/appendix-b.md) |
| 附录C | `appendix-c.md` | 变／变 | [待核](../../books/quantum-geometry/zh/appendix-c.md) | [待核](../../books/quantum-geometry/en/appendix-c.md) |
| 附录D | `appendix-d.md` | 同／同 | [待核](../../books/quantum-geometry/zh/appendix-d.md) | [待核](../../books/quantum-geometry/en/appendix-d.md) |
| 附录E | `appendix-e.md` | 新增／新增 | [待核](../../books/quantum-geometry/zh/appendix-e.md) | [待核](../../books/quantum-geometry/en/appendix-e.md) |

## 当前钉版与历史差分

相对 `402b5a2e` 的604条锁记录，当前新增6条、移除0条；唯一既有变化是 `HannRouterDephasing.result` 的模块级 `statement_id`，其名称、种类、行号与签名不变。新增引用为：

- `D5/S3/Geometry/BooleanRotationCodebook.finite_codebook_lower_bound`
- `D5/S3/Geometry/BooleanRotationCodebook.finite_codebook_upper_bound`
- `D5/S3/Quantum/Divergence/SpectralCeilingRelativeEntropy.actual_matrix_spectral_ceiling_strong_klein`
- `D5/S3/Quantum/Information/StrongSubadditivity.entropy_relabelState`
- `D5/S3/Quantum/Information/StrongSubadditivity.entropy_toMState`
- `D5/S3/Quantum/Information/StrongSubadditivity.strong_subadditivity`

Hann 模块在这两次精确 pin 之间仅将 `initialized_clean`、`address_card`、`sum_ket`、`sum_ket_conj` 四个辅助声明由私有改为公开；完整 `result` 陈述、证明及其后源码字节相同。这只支持第38章相关依赖的钉版对应，不构成该章或导入闭包接受。新增6条引用也仍须结合各自正文核对。

历史 `402b5a2e`／604条相对 `b5a75e59` 的锁 `d77855ba196f70517af8fb7a3d7004b3022460a8`／578条，新增26条、移除0条；3个既有条目只改变模块级 `statement_id`，锁内名称、种类、行号与签名均相同：`RotationFaces.cycle_face_sides`、`RotationFaces.face_odd_nice_cycle_orientation` 与 `CyclicMonitoredContraction.cyclic_future_kernel_eq_bot`。当时完整源码差分确认仅 `cycle_boundary_walk` 及 `initial_mem`、`unitary_mem`、`step_pow_coe` 从私有改为公开，其余字节一致。此历史对应与其覆盖限制保留，不改称当前整书或媒体批准。

## 历史局部证据的归属

第33章六处事实／范围修正已有[限定来源与三席记录](CONTENT-ACCURACY-CH33-SCOPE.md)，对应[PR #302](https://github.com/the-omega-institute/trureturing-books/pull/302)。第36章与视频009的同类限定修正见[PR #305](https://github.com/the-omega-institute/trureturing-books/pull/305)，其审查与发布范围不扩张为完整影片或章节接受。各自动态CI、合入与部署状态以关联PR为准。

`402b5a2e` 基线记录的实验目录修正仅使 `mutual-observer-attractors` 中英简介中的每轮0.454、每拍0.674明确为局部渐近因子，未改舞台或数值引擎。依据为 `g(x)=cos(cos x)` 在 `r=cos r` 处的导数 `1−r²≈0.453753166`，从0.1出发首轮比值约0.304475456。当时同步、目录构建与 `./tbook check` 通过（0错误、9条既有警告），候选 `6bc02a3a` 的三席审查两席批准、质量席非阻塞意见、0阻塞，见[PR #307](https://github.com/the-omega-institute/trureturing-books/pull/307)。这些检查与外部快照均属当时输入，不替代当前检查；目录措辞修正未增加实验室或整页接受。

## 本次限定修正与未完成维度

- 第8章两语第二部总结按正式出版模型中的形式环境计数，由22条改为26条，第5／6／7／8章分布为5／5／9／7；不按GID数量或环境ID前缀推算。
- 第35章 `ch35-gram-corridor` 两语图注改称已形式化格拉姆行列式公式的单位向量特例，保留原算例链接。当前精确 pin 的实内积空间定义、行列式与严格正性声明支持这一限定；`c=1,1/2,0` 及 `det=0,3/4,1` 与未改的图脚本、共用计算及两语SVG对应。数值代入不新增Lean声明，后续清表与生命解释仍属 `MODEL`。

第8章已有当前完整双语源阅读与39项独立数值复算（`current-full-text-and-numerical-intake.json`）；本次与其章源摘要对应，除上述计数修正外字节保全。有限浴新增内容另有 `finite-bath-correspondence.json` 的精确源与Reeb–Wolf定理3原文对应；两份材料均来自 `qg-ch08-finite-bath-intake-20261115`，属于来源／数值 intake，不是完整章节、媒体、输出或独立接受。其余相关冻结模块、其他原始文献与媒体维度仍待补齐。第35章容量及Gram图注 intake 同样不批准完整章节；第39章在 `402b5a2e` 后已变，须核对当前内容，不能沿用文件相同的推断。

每语58页的完整接受仍全部待核。后续继续逐页建立或映射双语正文、正式声明、独立计算、物理／文献、媒体、输出与独立审查证据；本次修正及名册／依赖差分不授予整章或整书批准。普通HTML/PDF/EPUB按项目第9节构建与自动检查，只有规定触发时查看受影响页面；未改生产器和图片不新增截图或重生要求。最终提交对应、独立三席、CI导出、合入及Pages由调用方接续，旧额度和未解决事项保留原归属。
