# 三量子比特混合态 CKW：谱定义、有限系综与采用边界

本规格固定第 31 章 `rem-ch31-ckw-monogamy-literature` 第一款的完整数学接口，并供第 38 章 `rem-ch38-monogamy-shared-borrow-literature` 核对其适用范围。CKW 是经典文献结果；本规格没有完成它在 trureturing 中的形式化，也没有可供该完整陈述采用的冻结 GID。两章中的文献归属仍适用。

## 1. 来源与固定源码

- Coffman、Kundu 与 Wootters，*Distributed Entanglement*，Physical Review A **61**, 052306，DOI [10.1103/PhysRevA.61.052306](https://doi.org/10.1103/PhysRevA.61.052306)，[原始全文](https://arxiv.org/pdf/quant-ph/9907047)。式 (1)–(2) 给出二比特谱并发度，式 (3)–(12) 处理三比特纯态，式 (13)–(14) 通过有限纯态分解与二体 tangle 的凸性处理混合态。
- Wootters，*Entanglement of Formation of an Arbitrary State of Two Qubits*，Physical Review Letters **80**, 2245–2248，DOI [10.1103/PhysRevLett.80.2245](https://doi.org/10.1103/PhysRevLett.80.2245)，[原始全文](https://arxiv.org/pdf/quant-ph/9709029)。谱公式、tilde 正交分解及等并发度最优分解是连接谱定义与凸顶定义的文献依据。

下列仓内接口均指 trureturing 不可变提交 `6a0f255afa13cc86090ef0e4c64782f34a008ab6` 的源码。源码中存在某条声明，不等于本规格对它做过新的编译、冻结成员核对或完整应用核验。本文没有改动书仓锁文件，也没有新增 `lean` 引用。

## 2. 完整输入和目标

取 $H_A=H_B=H_C=\mathbb C^2$。输入为任意矩阵

$$
R\in M_8(\mathbb C),\qquad R\succeq0,\qquad \operatorname{Tr}R=1.
$$

矩阵索引为 $(a,b,c)\in\{0,1\}^3$，所有约化态必须由同一个 $R$ 作实际有限和偏迹：

$$
\begin{aligned}
(P_{AB})_{ab,a'b'}&=\sum_c R_{abc,a'b'c},\\
(P_{AC})_{ac,a'c'}&=\sum_b R_{abc,a'bc'},\\
(P_A)_{a,a'}&=\sum_{b,c} R_{abc,a'bc}.
\end{aligned}
$$

对任意二比特密度矩阵 $P$，定义

$$
\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\qquad
S=\sigma_y\otimes\sigma_y,\qquad
\widetilde P=S\overline P S.
$$

令 $\lambda_1\ge\lambda_2\ge\lambda_3\ge\lambda_4\ge0$ 为 $P\widetilde P$ 的四个特征值的非负平方根，计代数重数，并令

$$
C_{\rm sp}(P)=\max(0,\lambda_1-\lambda_2-\lambda_3-\lambda_4).
$$

$P\widetilde P$ 通常不是 Hermitian 矩阵；其谱为非负实数且有完整的四重代数计数，是必须证明的接口，不能直接以 Hermitian 谱定理代替。

令 $\mathcal E(R)$ 为所有实际有限纯态分解的集合。其元素包含一个有限指标集、实数 $p_j\ge0$ 和单位向量 $\psi_j\in\mathbb C^8$，满足

$$
\sum_j p_j=1,\qquad
R=\sum_j p_j\lvert\psi_j\rangle\langle\psi_j\rvert.
$$

零权重允许存在，其对应向量仍取单位向量。定义

$$
T_{A|BC}(R)=\inf_{(p,\psi)\in\mathcal E(R)}
\sum_jp_j\,4\operatorname{Re}\det\left(
\operatorname{Tr}_{BC}\lvert\psi_j\rangle\langle\psi_j\rvert\right).
$$

这里取所有有限分解的下确界，不输入最优分解的存在性。对 Hermitian 二阶矩阵，行列式为实数；写实部用于明确实数下确界的类型。$r_A$ 为 $P_A$ 的实际 Pauli 坐标，即

$$
r_A=\bigl(2\operatorname{Re}(P_A)_{01},
-2\operatorname{Im}(P_A)_{01},(P_A)_{00}-(P_A)_{11}\bigr),
$$

其中最后一个坐标取其实值。完整目标为

$$
C_{\rm sp}(P_{AB})^2+C_{\rm sp}(P_{AC})^2
\le T_{A|BC}(R)
\le4\operatorname{Re}\det P_A
=1-\|r_A\|^2\le1.
$$

任意秩、零谱、重复谱、复振幅和零系综权重都在范围内。不得预设谱并发度的凸性、谱与凸顶的等价、最优系综、CKW 或三比特标准形。纯态、X 态、固定标准态的结果均不能替代这个混合态目标。

## 3. 已有源码接口及其界限

表中路径均相对于上述固定提交的 `D5/S3/Quantum/`。

| 源码与声明 | 可复用关系 | 尚不能据此得到的结论 |
| --- | --- | --- |
| [`Information/SaleemNoisyCurvatureRefutation.lean`](https://github.com/the-omega-institute/trureturing/blob/6a0f255afa13cc86090ef0e4c64782f34a008ab6/D5/S3/Quantum/Information/SaleemNoisyCurvatureRefutation.lean)：`sigmaYY`、`concurrence` | 对 charpoly 根取实部平方根、排序并取非负差值的矩阵级谱定义 | 任意密度矩阵的非负实谱语义、凸性与凸顶等价；私有 `block_concurrence` 限于指定块矩阵族 |
| [`Information/PartialTraceMutualInformation.lean`](https://github.com/the-omega-institute/trureturing/blob/6a0f255afa13cc86090ef0e4c64782f34a008ab6/D5/S3/Quantum/Information/PartialTraceMutualInformation.lean)：`partialTraceLeft`、`partialTraceRight` 及正性、迹保持声明 | 实际有限和偏迹、约化态的正性与归一化 | 三因子重索引和任意系综下的完整应用仍需核对 |
| [`Entanglement/GraphDensity/FormationBounds.lean`](https://github.com/the-omega-institute/trureturing/blob/6a0f255afa13cc86090ef0e4c64782f34a008ab6/D5/S3/Quantum/Entanglement/GraphDensity/FormationBounds.lean)：`Ensemble`、`spectral_ensemble_nonempty`、`qubit_det_bounds` | 含真实矩阵重构的有限单位纯态系综；二阶密度行列式在 $[0,1/4]$ 内 | 模块中的 formation roof 使用熵代价，不是本规格的 determinant roof |
| [`Entanglement/GHZ/OddGhzTenSettingWitness.lean`](https://github.com/the-omega-institute/trureturing/blob/6a0f255afa13cc86090ef0e4c64782f34a008ab6/D5/S3/Quantum/Entanglement/GHZ/OddGhzTenSettingWitness.lean)：`density_ensemble` | 一般有限密度态的真实纯态分解接口 | 未给出谱并发度的最优分解 |
| [`Information/ActualPureQubitGeometry.lean`](https://github.com/the-omega-institute/trureturing/blob/6a0f255afa13cc86090ef0e4c64782f34a008ab6/D5/S3/Quantum/Information/ActualPureQubitGeometry.lean)：`bloch`、`bloch_geometry_of_isHermitian`；[`Information/ActualQubitChordObstruction.lean`](https://github.com/the-omega-institute/trureturing/blob/6a0f255afa13cc86090ef0e4c64782f34a008ab6/D5/S3/Quantum/Information/ActualQubitChordObstruction.lean)：`det_bloch` | 实际 Bloch 坐标、Hermitian 重构与行列式恒等式 | 未完成本规格中同一个 $P_A$ 的联合端点应用 |
| [`Entanglement/PurityTimeReversalOverlapMinimum.lean`](https://github.com/the-omega-institute/trureturing/blob/6a0f255afa13cc86090ef0e4c64782f34a008ab6/D5/S3/Quantum/Entanglement/PurityTimeReversalOverlapMinimum.lean)：`reducedState`、`sigmaYTensor`、`timeReversed` | 任意比特数的实际纯态偏迹和自旋翻转定义 | 不提供全混合态谱并发度 CKW；结果定理中的局部绑定也不是可跨模块调用的声明 |
| [`Entanglement/TwoQubitBinegativityUpperBoundRefutation.lean`](https://github.com/the-omega-institute/trureturing/blob/6a0f255afa13cc86090ef0e4c64782f34a008ab6/D5/S3/Quantum/Entanglement/TwoQubitBinegativityUpperBoundRefutation.lean)：`pureConcurrence`、`concurrence` | $2|\psi_{00}\psi_{11}-\psi_{01}\psi_{10}|$ 与有限纯态分解代价的下确界 | 这里的 `concurrence` 是凸顶定义，不能与上一谱定义按同名等同；分解谓词未显式写权重和为一，密度输入下须由迹另行连接 |

同固定源码中，`FourQubitResidualSumMonotoneRefutation.concurrence` 的输入是四比特纯态及一对位置，排序顺序也需另行对齐。`ThreeQubitGeometricTangleRefutation` 定义了 Cayley 四次式和受限五项标准态；它没有供应所有三比特态到该标准形的变换，也没有将四次式与本规格的谱差自动连接。

`FormationBounds` 的私有 `bloch_sq`、`bloch_mix` 已有相关恒等式。实际跨模块使用时应按原声明公开化规则复用，不能复制证明或因私有可见性把它们算作数学缺失。

## 4. 尚未闭合的桥梁

**谱语义。** 对每个二比特密度 $P$，证明 $P\widetilde P$ 的完整非负实谱与已有 `concurrence` 的 charpoly 根实现相符，包含低秩和重根。钉版 Mathlib 的 Hermitian 谱分解、正半定特征值非负及 `Matrix.charpoly_mul_comm` 是候选接口，不是这一联合桥梁的完成证据。

**谱量的有限混合控制。** 对任意有限概率权重 $w_j$ 与二比特密度 $Q_j$，需要

$$
C_{\rm sp}\!\left(\sum_jw_jQ_j\right)^2
\le\sum_jw_jC_{\rm sp}(Q_j)^2.
$$

一条足够路线是先证明谱公式等于有限纯态分解的并发度凸顶，再建立此有限混合不等式。不能把凸性写入假设后把应用 Jensen 当作桥梁已经证成。

**任意纯态的谱与自旋翻转连接。** 对每个单位三比特向量的实际约化态 $Q_{AB},Q_{AC},Q_A$，需要全退化范围的谱估计与迹恒等式，继而得到

$$
C_{\rm sp}(Q_{AB})^2+C_{\rm sp}(Q_{AC})^2
\le4\operatorname{Re}\det Q_A.
$$

固定 X 态的 charpoly 计算或单独的多项式迹消去，均不能代替此项。

**同一个系综上的组合及下确界。** 对每个 $R$ 的有限纯态分解，同时取其 AB、AC、A 边缘，按前两项对同一批权重组合，得到目标左端是所有 determinant 代价的下界。另由 Bloch 坐标的仿射性和平方范数凸性，核对每个系综代价不超过 $4\operatorname{Re}\det P_A$。最后使用系综非空、代价下有界和实下确界接口。现有通用 Jensen 与 infimum 定理只处理组合；它们不供应缺失的谱桥。

二比特的 $(\inf\sum_jp_jC(\psi_j))^2$ 与 $\inf\sum_jp_jC(\psi_j)^2$ 不可仅靠代数互换。Wootters 的等并发度最优系综负责该处的特殊关系。$A|BC$ 是 $2\times4$ 切分，本规格的 $T_{A|BC}$ 保留 determinant 代价定义，不能套用二比特谱公式。

## 5. 第三方供应与结论权限

限定源码检索未找到完整混合态链条的精确供应；该结论只涉及已检查范围，不是全生态不存在的证明。

- `Timeroot/Lean-QuantumInfo@56e83a9288a3c616285038748e273b3c0e1a36bf` 的 `QuantumInfo/Finite/Entanglement.lean` 有一般有限 convex-roof 接口。它没有给出所需谱等价；Lean 4.28.0、Mathlib `8f9d9cff6bd728b17a24e163c9402775d9e6a365` 与本规格基准的 Lean 4.35.0、Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679` 不同，未做兼容准入或编译。
- `physical-superintelligence/oqp-batch-2026@da37af2ae174687403fbd97e9673c819edee71fd` 的 `oqp02-three-copy-werner/lean/ThreeCopyQutritWerner/TakagiSquare.lean` 有 `exists_square_takagi`：任意有限复对称矩阵均有平方酉 Takagi 分解，包含零矩阵与奇异矩阵。其 Lean 4.35.0-rc4、Mathlib `1b3c41969602424bd2f04b3d4f731734e5b00cde` 不同于上述基准；尚未准入、移植或编译，且该分解本身不等于完整 Wootters 最优系综定理。

完整 CKW 在本规格中仍是未完成形式化的文献结果；没有新定理判形、冻结、覆盖或书中正式定理采用。现有声明的直接应用只能作为应用证据，不能新增没有真实消费者的绑定包装。已有文献定理不能仅因本地缺桥而被称为新数学内容。

## 6. 正文采用条件

主仓跟踪项为 [trureturing #29974](https://github.com/the-omega-institute/trureturing/issues/29974)。后续采用需要完整原始输入、同一个 $R$ 的三个实际边缘、谱语义、全部有限分解与同一条联合不等式的核验证据。若只取得其中一段，应按该段实际量词给出结果，完整链条继续保留文献标注。

本规格不覆盖 $n$ 比特推广的形式化，不把三体纯态残余量直接定义为混合态三缠结，也不从 CKW 推出线性类型所有权或页面缓存机制。第 38 章的计算机体系结构对应仍按正文的诠释模型边界处理。
