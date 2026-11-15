# 现行整书准确性基线

本基线固定记录整合快照 `8e3ebbb8e87990ece5144bc4e5fa2ef82231adb8`，主线比较基准为已整合的 maine6cd `e6cd4ab188769b56215280658e50978ad96064df`；以该主线的中英文 `SUMMARY.md` 为名册。本次检查候选为该快照上的两份准确性文档修订。PR #313 的第8章计数与第35章图注两项双语纠正来自分支提交 `c4b75f0f4fe462b0f2343e805c7ecba1a3a29924`，基于 main89 `89e45e6baeae05d4864945d300f70f5ec3da0c72`；此前 R1 文档修正由调用方提交为 `e906bc306128ca56fcc068ad1ebe173325fb4160`，main315 对应修订随后提交为 `0045856f`。c4、e906、0045 均为 8e3 整合快照的祖先，均不在上述 maine6cd 主线快照中；分支修正不称作主线已有内容。CI、合入与部署的动态状态以 [PR #313](https://github.com/the-omega-institute/trureturing-books/pull/313) 为准。每语 **58页、46个主单元**：序曲、39章、终章及附录A–E；两语文件、顺序与层级对应。所有正文、定理与证明、数值、物理条件、文献、图表、实验及影音说明均在整书目标内，保留作者风格与题记。

当前锁为 `trureturing@f010e3713174c4df2b28c8f8c4d9ff3c41e46a05`／`dev`，解析658条声明，锁 SHA-256 为 `b703269f73bf665e01edb2bac5bc38fe6dbfd706446e36867a71083880c3aff2`。历史 main89 的 pin 为 `a313d1ce217f58f284d14d3b7d8231c5773b8d55`；mainbe3 将其前进至 f010，至 mainfcf 仍为相同的610条记录。PR #314 在同一 f010 pin 新增48条解析声明，610条既有记录逐项保全，无移除。前一基线 `402b5a2e444b264cd5bd7776b024b346f3bdd5e2` 的 pin `a79bb042b93f03887703825ec4661602f43d976e`／604条与当时的检查、阅读和审查保持历史归属。旧[51页／45单元基线](CONTENT-ACCURACY-CURRENT-20261114.md)固定于 `b5a75e5932b73a8a97399a764ff81d63d528930d`；更早35单元／9/35仅保留各自历史归属。已有阅读与审查未被清零，也不因换名册自动升级为当前接受。

## 全部页面与身份对应

下表用正式 SUMMARY 解析器逐页排列，“对历史”列比较 8e3 整合快照与 `b5a75e59`。两语 SUMMARY 均与 `402b5a2e` 字节相同。历史 main9 与 mainbe3 的章源相同：各自相对 main89 每语57页相同、1页改变（第11章）；mainfcf 相对 main9 每语57页相同、1页改变（第39章），相对 main89 为56页相同、2页改变（第11、39章）。maine6cd 相对 mainfcf 每语56页相同、2页改变（第38章、附录C），相对 main89 为54页相同、4页改变（第11、38、39章及附录C）。8e3 另含第8／35章纠正，相对 maine6cd 每语56页相同、2页改变，相对 mainfcf 为54同／4变，相对 main89 为52同／6变（第8、11、35、38、39章及附录C）；相对 `402b5a2e` 为50页相同、8页改变（第8、11、32.1、32.2、35、38、39章及附录C），均无增删。8e3 相对 `b5a75e59` 仍为29页相同、22页改变、7页新增、0页移除。“同／变／新增”只比较对应文件字节。“待核”指当前完整页面接受仍未证明，不表示从未阅读；单处修正、构建与哈希相同均不能替代正文、pin、媒体、输出和独立审查的依赖核对。

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
| 11 | `ch11-pulses-and-virtual-z.md` | 变／变 | [待核](../../books/quantum-geometry/zh/ch11-pulses-and-virtual-z.md) | [待核](../../books/quantum-geometry/en/ch11-pulses-and-virtual-z.md) |
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

当前658条锁记录相对 mainfcf 的同 pin 610条新增48条、移除0条、既有记录变化0条；新增项均来自 `HannRouterProfiles` 与 `HannSignedCertificate` 两个模块，并在双语第38章引用。它们仍须逐项核对正文、完整声明与解释，不能因解析或主线合入取得准确性接受。相对 `402b5a2e` 的604条，当前新增54条、移除0条。

历史 main89／mainfcf 的610条相对 `402b5a2e` 新增6条、移除0条；唯一既有变化是 `HannRouterDephasing.result` 的模块级 `statement_id`，其名称、种类、行号与签名不变。当时新增引用为：

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

- PR #313 的第8章两语第二部总结按正式出版模型中的形式环境计数，由22条改为26条，第5／6／7／8章分布为5／5／9／7；不按GID数量或环境ID前缀推算。
- PR #313 的第35章 `ch35-gram-corridor` 两语图注改称已形式化格拉姆行列式公式的单位向量特例，保留原算例链接。当前 f010 精确 pin 的实内积空间定义、行列式与严格正性声明支持这一限定；`c=1,1/2,0` 及 `det=0,3/4,1` 与未改的图脚本、共用计算及两语SVG对应。数值代入不新增Lean声明，后续清表与生命解释仍属 `MODEL`。

第8章在 main89 输入已有完整双语源阅读与39项独立数值复算（`current-full-text-and-numerical-intake.json`）。8e3 整合快照的第8章相对 main89 每语只改了上述计数一行；其余章源字节对应，计数行已按当前正式出版模型另核。旧阅读／39项复算仅按此对应复用，不称当前全文重读或完整章节、媒体、输出接受。有限浴新增内容另有 `finite-bath-correspondence.json` 的精确源与Reeb–Wolf定理3原文对应；两份材料均来自 `qg-ch08-finite-bath-intake-20261115`，属于来源／数值 intake，不是完整章节、媒体、输出或独立接受。其余相关冻结模块、其他原始文献与媒体维度仍待补齐。第35章容量及Gram图注 intake 同样不批准完整章节；第39章在 `402b5a2e` 后已变，并随 main315 更新推导；第38章本次随 main314 新增内容。两章及附录C的完整页面仍须核对，不能沿用文件相同的推断。

每语58页的完整接受仍全部待核。后续继续逐页建立或映射双语正文、正式声明、独立计算、物理／文献、媒体、输出与独立审查证据；PR #313 修正及本次名册／依赖差分不授予整章或整书批准。普通HTML/PDF/EPUB按项目第9节构建与自动检查，只有规定触发时查看受影响页面；未改生产器和图片不新增截图或重生要求。最终提交对应、独立三席、CI导出、合入及Pages由调用方接续，旧额度和未解决事项保留原归属。


## 历史 mainfcf 整合快照的限定批次（2026-11-15）

以下段落及检查固定于上一轮 d20 `d20c811592cbeb4a4a4ce167161b1e25617b58a5`／mainfcf `fcf6fdda1a7fd6c4e94c2ff7fc2f6f2502a691f1` 候选，后来精确提交为 `0045856f`；其规范结果是 `integration-main-fcf6/evidence/implementation-result.json`，不替代 8e3／maine6cd 检查或整书接受。

PR #306 在 mainbe3 `be3e49085febd40a9f1a2cd9574746f6b4e037ba` 中为中英文第11章各加入144行原生 Dyson／演化与 C1 共振包络界说明；该页相对 main89、402b 均为新变化。统计文件、声明地图 `.stills.json` 与14张已发布声明地图静帧也随主线变化。main9 的 PR #312 又改变 `berry-sector-path-sandbox`、`stereographic-relativization-sandbox`、`quantum-interpretations-duel` 的生产器／测试／静帧等34个路径，未改章源、SUMMARY、pin 或工具。mainfcf 的 PR #315 随后仅改变中英文第39章的相邻耦合／分块谱隙推导及 `data/statistics.json`，共3个路径；未改第8／11／35章、SUMMARY、pin、媒体、工具或规则。上述来源、完整页面、媒体、派生产物与独立审查仍分别待核；主线合入与文件身份均不增加准确性接受。

d20 整合快照及本次文档修订的正式名册及差分见上表；相对 mainfcf 的出版差分严格为第8／35章中英各一行和两份准确性文档，共六路径。锁由 main89 的 `a313d1ce` 前进至 `f010e3713174c4df2b28c8f8c4d9ff3c41e46a05`，仍为 `dev`、610条，声明键与记录逐项相同；当前 pin 在 `/Users/auricstudio/trureturing` 的 `origin/dev` 祖先链上。两语第二部正式环境仍为5／5／9／7=26。

当前 f010 精确源与 Frozen state 对应支持 PR #313 的两项范围：第二部26个正式环境的锁定 GID 均与源／状态片的名称、种类和 `statement_id` 对应；第35章 `TwoAnchorGram` 的定义、行列式公式和严格正性三项也逐项对应，且其 source、Blueprint、state 相对 a313 字节相同。有限浴来源、完整章节、媒体、输出与独立审查仍分别待核；第11章和第39章新增内容不从 PR313 的第8章／第35章证据继承接受。

历史输入 `29d092932301f91a4b875bb9010649935e27a14e`／mainbe3 的 `integration-main-be3/evidence/` 保留原归属：当时 check 为0错误、9条既有警告，双语 HTML 及纠正文字／链接断言通过，英文搜索索引报告12,805,627 bytes。该历史构建元数据的字符计数不当作 UTF-8 字节数，也不升级为 b472 的检查。

历史 b472 加 R1 文档修正的候选（后提交为 e906）的空白、正式源／双语、check、双语 HTML 及纠正文字／链接检查均通过，check 为0错误、9条既有警告，英文搜索索引报告12,805,627 bytes。`repair-r1/evidence/` 的 `current-checks.json`、`html-current-assertions.json` 和 `final-candidate.json` 保留该输入，不替代 d20 整合后的检查。

本次 d20 加两份文档修订的候选另跑适用的空白、正式源／双语检查、`TRURETURING_DIR=/Users/auricstudio/trureturing TBOOK_REPO=the-omega-institute/trureturing-books ./tbook check`、双语 HTML 构建及两项纠正的文字／链接断言，均通过；check 为0错误、12条警告（1个未引用序曲图、8个历史影片 subject_commit，以及第16章形式化请求 #11／#12／#10 的3条 HTTP 403 在线核验警告），英文 HTML 报搜索索引12,812,919 bytes 大小警告。实际输入、警告数值、产物 UTF-8 字节数／Unicode 字符数及最终候选的依赖对应见外部 `integration-main-fcf6/evidence/` 的 `current-checks.json`、`html-current-assertions.json`、`preservation-and-doc-checks.json`、`validation-correspondence.json` 和 `final-candidate.json`；完整证据前缀为 `/private/tmp/qg-current-book-stale-claims-evidence-20261115/`。仅两份文档相对输入 d20 改动，四行章源纠正、其余 tracked bytes 与依赖链接保全，无生成的 tracked 变更。上述在线请求核验仍受限；自动输出证据只覆盖两项纠正，不接受第11／39章完整页面、main312 媒体或整书。未做截图／逐页阅读矩阵、本地 PDF／EPUB 或媒体重生成；最终提交对应、R2 三席、CI 的 PDF／EPUB 与适用导出校验、合入和成功 Pages 由调用方接续。


## maine6cd 整合快照的限定批次（2026-11-15）

PR #314 在 maine6cd `e6cd4ab188769b56215280658e50978ad96064df` 相对 mainfcf 改变36个路径：中英文第38章各新增589行异质路由剖面与带符号证书说明，锁在原 f010 pin 新增48条引用，同时更新双语附录C、统计、稳定声明序号、五组双语统计图、概览幻灯片及其图副本、声明地图数据／`.stills.json` 与13张已发布 JPG（12张卡片静帧及封面）。第38章每语当前共91个不同引用 GID，其中包括这48项。SUMMARY、pin、工具与规则未变；该批来源、完整页面、正式声明解释、统计、图件、幻灯片与地图的当前输出及独立审查分别待核，不能从主线已合入或 PR313 两项修正取得接受。第11／39章新增内容、main312 媒体和此前未完成维度继续保留。

8e3 及本次文档修订相对 maine6cd 的出版差分严格为第8／35章中英各一行和两份准确性文档，共六路径。四行与 c4、R1 修正及已封存的 0045 相同；相对输入 8e3 仅两份文档改变。当前正式出版解析器与双语检查、第二部5／5／9／7=26个正式环境、33个相关 GID 的源／Frozen state 绑定及第35章单位向量特例均另核；相关完整源与原生产器／SVG、四条章源修正与上一轮规范结果建立字节对应，仅支持原两项纠正，不扩大完整页、48项新增引用或媒体接受。

本次 8e3 加两份文档修订的候选另跑适用的空白、正式源／双语检查、`TRURETURING_DIR=/Users/auricstudio/trureturing TBOOK_REPO=the-omega-institute/trureturing-books ./tbook check`、中英文 HTML 构建及两项纠正的文字／链接断言，均通过；check 为0错误、12条警告（1个未引用序曲图、8个历史影片 subject_commit，以及第16章形式化请求 #11／#12／#10 的3条 HTTP 403 在线核验警告），英文 HTML 报搜索索引12,914,417 bytes 大小警告。四个受影响 HTML 页的文字、Gram 片段目标、f010 源链接、未解析引用及 KaTeX 错误检查通过；上述警告未指向这四页的版式，在线请求核验仍受限。正常构建同步后 tracked bytes 无生成差分，声明地图提示15张图保持最新、未启动浏览器；未改生产器或重生媒体。实际检查输入与最终文档摘要分别封存，最终仅两份文档补记结果，相关章源、SUMMARY、锁、配置、工具、生产器与媒体依赖均与检查／构建输入相同。证据在 `/private/tmp/qg-current-book-stale-claims-evidence-20261115/integration-main-e6cd/evidence/` 的 `current-check-input.json`、`current-checks.json`、`source-bilingual-current.json`、`incoming-main314-correspondence.json`、`html-current-assertions.json`、`preservation-and-doc-checks.json`、`validation-correspondence.json` 及 `final-candidate.json`；UTF-8 字节数与 Unicode 字符数分别记录。自动输出证据仅覆盖两项纠正，不授予第11／38／39章、附录C、48项新增引用、统计／图件／幻灯片／地图或整书准确性接受。

旧额度不重启。全部116个完整语言页面接受槽继续待核；本次未发现新章源缺陷，也未增加完整章节或整书批准。普通导出按项目第9节以构建及适用自动检查验收，规定触发时才查看受影响页面；本次不做截图／逐页阅读矩阵、本地 PDF／EPUB 或媒体重生成。调用方接续最终提交对应、已固定的 R2 三席、CI 的 PDF／EPUB 与适用导出校验、合入和成功 Pages；旧来源、媒体、输出与审查债务保留原归属。
