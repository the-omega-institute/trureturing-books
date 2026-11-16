# 29.4 相干与去相干、双端握手与全息边界因果 {#sec-ch29-coherence-handshake-causality}

> “逻辑没有什么存在于不存在, 只有相干与去相干, 所以未来对过去有了干涉, 这也不稀奇, 这就是因果”

在前一节（[“顺序无关、无时间之网与几何因果的必然性”](ch29-s03-timeless-gram-causality.md#sec-coda-timeless-causality)）中，我们从单位向量族的 Gram 矩阵刚性（[@thm-ch29-gram-rigidity-and-pell]）看见了无时间关联网络如何消解“前推后”的机械多米诺骨牌时间观。然而，日常直觉之所以一听见“未来对过去发生干涉”便觉得违反逻辑，根源在于把经典布尔逻辑的“存在（`1`）对不存在（`0`）”误当成了宇宙最底层的本体语法。本章收官之际，我们围绕这句收拢因果本质的命题（原话台账见[附录 A](appendix-a-s03-verbatim-ledger.md#sec-appendix-a-verbatim-ledger) `A75`），沿着“正交隐匿与捏合去相干—双端玻恩握手与共同相位锁定—驻相、弱值、延迟擦除无信令与格拉姆端点置换—反相悖论相消与自洽不动点”四根支柱展开严格拆解，并逐项标清 Lean 4 内核定理（`LEAN ✓`）、手工代数推导（`手工推导`）、外部物理文献（`文献结果`）、双精度数值检验（`NUM`）与本书正交几何诠释（`MODEL`）的各自边界。

## 29.4.1 破除布尔“存在与不存在”幻觉：正交隐匿、双路相消与捏合去相干 {#sec-ch29-handshake-boolean-illusion}

当局部探测器屏幕上报出读数 `0` 时，布尔直觉习惯宣称“那里什么都不存在”；报出确定结果时，又宣称“客观事实已经绝对生成”。事实上，仅凭单个零读数本身并不能反推背后的机制（空输入本身同样给出零读数），而在受控线性与算子模型中，看似同为“归零”或“定格为经典事实”的现象背后，严格对应着三种截然不同的几何与代数操作（以下分项算式为初等手工推导，`手工推导`；将其读作“逻辑无所谓存亡、唯有相干与去相干”属本书诠释，`MODEL`）：

1. **正交子空间隐匿（Orthogonal Hiding，向量范数毫发无损）**：在二维实平面中取单位标尺 $\mathbf{A} = (1, 0)$ 与单位态向量 $\mathbf{B} = (\cos\theta, \sin\theta)$，记可见子空间为 $M = \operatorname{span}(\mathbf{A})$。分解 $\mathbf{B} = \mathbf{B}_\parallel + \mathbf{B}_\perp$ 得 $\mathbf{B}_\parallel = (\cos\theta, 0)$、$\mathbf{B}_\perp = (0, \sin\theta)$，满足勾股范数守恒 $\|\mathbf{B}\|^2 = \|\mathbf{B}_\parallel\|^2 + \|\mathbf{B}_\perp\|^2 = 1$。当 $\theta = \pi/2$ 时，沿 $\mathbf{A}$ 轴的内积读数 $\mathbf{A}\cdot\mathbf{B} = 0$（$\mathbf{B}_\parallel = \mathbf{0}$），但 $100\%$ 的向量范数平方完整驻留在正交补空间（$\|\mathbf{B}_\perp\|^2 = 1$），双矢量面积的范数平方 $\|\mathbf{A}\wedge\mathbf{B}\|^2 = \sin^2\theta = 1$，且两单位向量叠加的范数平方为 $\|\mathbf{A} + \mathbf{B}\|^2 = 2$——这是**正交侧身隐匿**，绝非振幅湮灭。
2. **双路标量反相相消与双端口守恒（Two-Path Anti-Phase Cancellation）**：取非负实束幅 $a = \cos\xi, b = \sin\xi$（$a^2 + b^2 = 1$），将全部相对相位收入 $\Delta \in [0, 2\pi]$。单路标量叠加的原始强度为

   $$
   I_{\mathrm{raw}} = \bigl|a + b e^{i\Delta}\bigr|^2 = a^2 + b^2 + 2ab\cos\Delta.
   $$

   当 $\Delta = \pi$（利用标量恒等式 $e^{i\pi} = -1$，故 $e^{iu} + e^{i(u+\pi)} = 0$）时，$I_{\mathrm{raw}} = (a - b)^2$，**当且仅当两束幅严格相等 $a = b$ 时才精确归零**。更关键的是，在物理幺正平衡双端口合束器 $b_\pm = (a \pm b e^{i\Delta})/\sqrt{2}$ 中，两出口概率 $p_+ = |b_+|^2 = \frac{1}{2}I_{\mathrm{raw}}$ 与 $p_- = |b_-|^2$ 恒满足 $p_+ + p_- = 1$：在 $a = b = 1/\sqrt{2}, \Delta = \pi$ 处，暗端口 $p_+ = 0$ 恰与亮端口 $p_- = 1$ 成对出现，总概率从未凭空消失。
3. **捏合去相干与“已定格经典事实”（Pinching Decoherence）**：对归一化双路态构造保留相干度 $\gamma \in [0, 1]$ 的密度矩阵族

   $$
   \rho_\gamma = \begin{pmatrix} a^2 & \gamma ab e^{-i\Delta} \\ \gamma ab e^{i\Delta} & b^2 \end{pmatrix}, \qquad p_\pm = \frac{1}{2}\bigl(1 \pm 2\gamma ab\cos\Delta\bigr).
   $$

   对一切 $\gamma \in [0, 1]$，$\rho_\gamma$ 均为迹 $1$ 半正定态，纯度为 $\operatorname{Tr}(\rho_\gamma^2) = a^4 + b^4 + 2\gamma^2 a^2 b^2 = 1 - 2(1 - \gamma^2)a^2 b^2$。当执行未读记录捏合 $\gamma = 0$ 时，非对角相干元被精准归零（相对于纯态 $\gamma = 1$ 丢弃了 $2a^2 b^2$ 的希尔伯特—施密特质量），而对角权重 $a^2, b^2$ 原封不动，双端口输出拉平为 $p_\pm = 1/2$。这里必须严格区分**信道的幂等性**与**输出矩阵的幂等性**：未读捏合信道满足 $\Pi_P(\Pi_P(\rho)) = \Pi_P(\rho)$（重复去相干不再改变块对角记录），但捏合后的混合密度矩阵本身通常并不满足 $\rho_0^2 = \rho_0$（例如等权时 $\rho_0 = I/2$，而 $(I/2)^2 = I/4 \neq I/2$）。

下面这条冻结定理将正交补投影六恒等式、有限记录捏合信道幂等律、单比特捏合希尔伯特—施密特勾股分解与拉格朗日—格拉姆面积恒等式统一锁定于 Lean 4 内核：

::: {.theorem #thm-ch29-coherence-complement-and-pinching title="正交补投影六恒等式、有限记录捏合幂等律、希尔伯特—施密特勾股分解与拉格朗日—格拉姆恒等式" lean="D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities, D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent, D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean, D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
关于正交投影分解、有限记录未读信道与二阶面积余项，以下四项陈述在各自精确前提下成立：

1. **闭子空间正交补投影六恒等式**（[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)）：设 $\mathbb{K}$（`RCLike`，实或复）上的完备内积空间为 $E$，$M \le E$ 为闭子空间，记 $P_M = M.\mathrm{starProjection}$ 与 $P_{M^\perp} = M^\perp.\mathrm{starProjection}$ 为对应的连续线性正交投影算子，则同时成立

   $$
   P_{M^\perp} = \mathrm{id}_E - P_M,\quad P_M \circ_L P_M = P_M,\quad P_{M^\perp} \circ_L P_{M^\perp} = P_{M^\perp},\quad P_M \circ_L P_{M^\perp} = 0,\quad P_{M^\perp} \circ_L P_M = 0,\quad P_M + P_{M^\perp} = \mathrm{id}_E.
   $$

2. **有限记录未读捏合信道的幂等律**（[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)）：设有限维指标集为 $n$（`[Fintype n] [DecidableEq n]`），有限记录指标集为 $\kappa$（`[Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 满足完备正交自伴幂等记录族条件 `IsRecordMeasurement P`（各 $P_k$ 自伴幂等、两两正交且 $\sum_k P_k = 1$），定义未读态映射 $\operatorname{unreadState}(P)(\rho) = \sum_k P_k \rho P_k$，则信道复合严格幂等：

   $$
   \operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P).
   $$

3. **单比特捏合投影的希尔伯特—施密特勾股分解**（[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)）：对任意二阶复矩阵 $\rho \in M_2(\mathbb{C})$（`QubitMatrix`，定理本身不要求 $\rho$ 厄米或半正定），在希尔伯特—施密特内积 $\langle A, B\rangle_{\mathrm{HS}} = \operatorname{Tr}(A^\dagger B)$ 与标准基对角捏合 $\operatorname{pinching}(\rho)$ 下，恒有

   $$
   \langle \rho, \rho\rangle_{\mathrm{HS}} = \bigl\langle \operatorname{pinching}(\rho),\, \operatorname{pinching}(\rho)\bigr\rangle_{\mathrm{HS}} + \bigl\langle \rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho)\bigr\rangle_{\mathrm{HS}}.
   $$

4. **实向量组的拉格朗日—格拉姆二元面积恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意有限指标集 $s$（`Finset ι`）与实向量 $u, v : \iota \to \mathbb{R}$（无需归一化假设），恒有

   $$
   \Bigl(\sum_{i \in s} u_i^2\Bigr)\Bigl(\sum_{i \in s} v_i^2\Bigr) - \Bigl(\sum_{i \in s} u_i v_i\Bigr)^2 = \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
   $$
:::

::: proof
第 1 款由希尔伯特空间闭子空间正交分解 $E = M \oplus M^\perp$ 直接验证伴随正交投影的互补差、各自幂等、相互正交归零与恒等分解。第 2 款将双重求和 $\sum_j P_j \bigl(\sum_k P_k \rho P_k\bigr) P_j$ 展开，利用 `IsRecordMeasurement P` 中 $j \neq k$ 时 $P_j P_k = 0$ 与 $j = k$ 时 $P_k^2 = P_k$ 消去全部交叉项。第 3 款在 $M_2(\mathbb{C})$ 上验证对角部分 $\operatorname{pinching}(\rho)$ 与非对角余项 $\rho - \operatorname{pinching}(\rho)$ 的希尔伯特—施密特内积为零，从而导出勾股平方和分解。第 4 款展开右端双重和 $\sum_{i,j}(u_i^2 v_j^2 + u_j^2 v_i^2 - 2 u_i v_i u_j v_j)$ 并除以 $2$，与左端逐项相等。完整证明由 Lean 内核检查。
:::

结合 [@thm-ch29-coherence-complement-and-pinching] 第 1、4 款可见：当可见投影 $P_M(v) = 0$ 时，互补投影 $P_{M^\perp}(v) = v$ 原样保留全部向量；在二维或三维有序坐标下，拉格朗日—格拉姆恒等式右端化为 $\sum_{i<j}(u_i v_j - u_j v_i)^2$（三维下即 $\|\mathbf{u}\times\mathbf{v}\|^2$），精确托起正交隐匿时的单位双向量面积。而在第 2、3 款中，若高秩记录投影元维数大于 $1$，$\operatorname{unreadState}(P)(\rho)$ 保留块对角结构而非必为逐元对角；仅当把第 3 款专门化到迹 $1$ 厄米半正定密度矩阵时，$\langle\rho, \rho\rangle_{\mathrm{HS}} = \operatorname{Tr}(\rho^2)$ 才对应态纯度，丢弃项 $2|\rho_{01}|^2$ 才对应被去相干抹除的相干质量。下方实验卡将正交隐匿、反相分流与捏合去相干三项开关并置，使三者的区别一目了然：

::: {.viz src="coherence-handshake-causality" preset="boolean-illusion" height="500"}
**零读数并非“不存在”：正交隐匿、反相分流与捏合去相干对照卡（`boolean-illusion`）**：左栏展示单位向量 $\mathbf{B}$ 对标尺轴 $\mathbf{A}$ 的分解——在 $\theta = \pi/2$ 处青色轴向投影归零，品红正交分量与有向面积平方保持 $1$，且 $\|\mathbf{A}+\mathbf{B}\|^2 = 2$；中栏展示平衡双端口合束器——在等幅反相 $\Delta = \pi$ 时 `+` 端口归零而 `-` 端口得 $1$（总输出恒为 $1$）；右栏展示 $2\times 2$ 路径密度矩阵 $\rho_\gamma$——捏合 $\gamma = 0$ 抹去品红非对角相干元、保留对角权重并将双端口拉平为 $1/2$。
:::

## 29.4.2 因果作为双端玻恩握手与共同相位公平锁定 {#sec-ch29-handshake-born-reciprocity}

为什么单向复交叠 $\langle\phi|\psi\rangle$ 本身还不能直接充当客观的物理因果权重？对两个归一化态分别施加**各自独立**的全局相位旋转 $|\psi\rangle \mapsto e^{i\theta_\psi}|\psi\rangle$ 与 $|\phi\rangle \mapsto e^{i\theta_\phi}|\phi\rangle$（注意：若对两者施加同一个公共相位 $\theta_\psi = \theta_\phi$，内积 $\langle\phi|\psi\rangle$ 本就保持不变），手工计算（`手工推导`）立即给出

$$
\langle\phi\mid\psi\rangle \longmapsto e^{i(\theta_\psi - \theta_\phi)}\langle\phi\mid\psi\rangle, \qquad \langle\psi\mid\phi\rangle = \overline{\langle\phi\mid\psi\rangle} \longmapsto e^{-i(\theta_\psi - \theta_\phi)}\langle\psi\mid\phi\rangle.
$$

单向振幅携带相对规范相位 $e^{i(\theta_\psi - \theta_\phi)}$，因而不是投影射线的内禀不变量；唯有将正向交叠 $\langle\phi|\psi\rangle$ 与逆向共轭回波 $\langle\psi|\phi\rangle = \overline{\langle\phi|\psi\rangle}$ 成对相乘，相对相位才精确互消，锁出实非负、规范不变且双端对称的玻恩握手权重（`手工推导`）：

$$
w(\psi \leftrightarrow \phi) = \langle\phi\mid\psi\rangle\langle\psi\mid\phi\rangle = \bigl|\langle\phi\mid\psi\rangle\bigr|^2 = \bigl|\langle\psi\mid\phi\rangle\bigr|^2 = \operatorname{Tr}(P_\phi P_\psi) = \operatorname{Tr}(P_\psi P_\phi),
$$

且对单位向量成立秩一投影夹持恒等式 $P_\psi P_\phi P_\psi = |\psi\rangle\langle\psi|\phi\rangle\langle\phi|\psi\rangle\langle\psi| = |\langle\phi|\psi\rangle|^2 P_\psi$（当中间插有幺正演化算符 $U$ 时，逆向实验须取伴随演化 $U^\dagger$，满足 $|\langle\phi|U|\psi\rangle|^2 = |\langle\psi|U^\dagger|\phi\rangle|^2$，这并不意味着固定单向传播算符在不取伴随时自动对称）。在共同 $U(1)$ 相位不变多项式层面，为什么实值非负的最低阶非平凡不变量恰好落在二次厄米双线性型上？下面这条冻结定理给出了秩一模平方约化、条件系综配对权重与共同相位多项式不变代数的完整核验结果：

::: {.theorem #thm-ch29-born-handshake-and-phase-fairness title="秩一纯态模平方约化、玻恩配对条件分解与共同相位不变多项式定理" lean="D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction, D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight, D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem"}
在有限维复矩阵记录框架与多变量复多项式代数中，以下三项陈述成立：

1. **秩一投影与秩一纯态的标量模平方约化**（[`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction)）：设有限指标集为 $n$（`[Fintype n]`），$P : \kappa \to M_n(\mathbb{C})$，$\rho \in M_n(\mathbb{C})$，$\phi, \psi : n \to \mathbb{C}$（此款无需假设向量归一化或记录族完备）。若在分支 $k \in \kappa$ 上有 $P_k = \operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$ 且 $\rho = \operatorname{vecMulVec}(\psi, \operatorname{star}\psi)$，则标量记录权重恒等于复内积模平方：

   $$
   \operatorname{recordWeight}(P, \rho, k) = \bigl((\|\operatorname{star}\phi \mathbin{\cdot_v} \psi\|^2 : \mathbb{R}) : \mathbb{C}\bigr).
   $$

2. **完备记录族下的玻恩迹配对与未读条件系综分解**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：在有限可判定指标集 $n$ 与有限记录集 $\kappa$ 上，若 $P$ 满足完备正交记录条件 `IsRecordMeasurement P`，$\rho$ 满足物理密度态条件 $\rho.\mathrm{PosSemidef} \land \operatorname{Tr}\rho = 1$，且 $P_k = \operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$、$\rho = \operatorname{vecMulVec}(\psi, \operatorname{star}\psi)$，则同时成立

   $$
   \operatorname{recordWeight}(P, \rho, k) = \bigl((\|\operatorname{star}\phi \mathbin{\cdot_v} \psi\|^2 : \mathbb{R}) : \mathbb{C}\bigr) = \operatorname{Tr}(\rho P_k),
   $$

   且未读态精确分解为各记录分支条件态的玻恩加权和：$\operatorname{unreadState}(P, \rho) = \sum_j \operatorname{recordWeight}(P, \rho, j) \bullet \operatorname{conditionalState}(P, \rho, j)$。
3. **共同 $U(1)$ 相位不变多项式的电荷平衡、最低二次次数与唯一厄米表出**（[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)）：设有限指标集为 $\iota$（`[Fintype ι]`），形式多项式 $p \in \operatorname{Poly}(\iota) = \operatorname{MvPolynomial}(\iota \oplus \iota, \mathbb{C})$ 在复向量 $(z, \overline{z})$ 上的求值记为 $\operatorname{actual}(p)(z)$。则：（a）$p$ 存在唯一保持总次数与各阶齐次性的笛卡尔坐标表示；（b）共同相位不变性 `Invariant p`（所有坐标同步乘 $e^{i\theta}$ 下不变）当且仅当每个支撑单项式的全纯与反全纯总次数相等（`Balanced p`），亦当且仅当 $p$ 属于由二次生成元 $z_i\overline{z}_j$ 生成的二次不变子代数 `quadraticAlgebra`；（c）任何非常数共同相位不变多项式必满足总次数 $\ge 2$，且每个对角生成元 $z_i\overline{z}_i$ 均为总次数 $2$ 的不变量；（d）若 $p$ 为 $2$ 次齐次、处处实值（$\forall z,\, \operatorname{Im}(\operatorname{actual}(p)(z)) = 0$）且共同相位不变，则存在唯一矩阵 $H \in M_\iota(\mathbb{C})$ 使得 $H$ 厄米、$H_{ji} = p.\mathrm{coeff}(\operatorname{pairExponent}(i, j))$、对一切 $z$ 有 $\operatorname{actual}(p)(z) = z^\dagger H z$，且 $(\forall z,\, \operatorname{Re}(\operatorname{actual}(p)(z)) \ge 0) \iff H.\mathrm{PosSemidef}$。
:::

::: proof
第 1 款将外积矩阵乘积 $\operatorname{vecMulVec}(\psi, \operatorname{star}\psi)\operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$ 的迹按有限求和重排为 $(\operatorname{star}\phi \mathbin{\cdot_v} \psi)\overline{(\operatorname{star}\phi \mathbin{\cdot_v} \psi)} = \|\operatorname{star}\phi \mathbin{\cdot_v} \psi\|^2$。第 2 款结合 `recordWeight` 的迹定义与完备正交投影族对未读态 $\sum_j P_j \rho P_j$ 的归一化条件态展开直接得出。第 3 款通过全纯—反全纯双向次数分解刻画 $e^{i(d - \bar{d})\theta} = 1$ 的系数支撑判据，证明非零平衡单项式至少含一个 $z_i$ 与一个 $\overline{z}_j$（故次数 $\ge 2$），并在二次实值情形下由极化恒等式唯一确定厄米系数矩阵 $H$ 及其半正定性等价判据。完整证明由 Lean 内核检查。
:::

需要注意 [@thm-ch29-born-handshake-and-phase-fairness] 的精确边界：第 1 款给出的结论是标量记录权重恒等式而非算子夹持式 $P_\psi P_\phi P_\psi = |\langle\phi|\psi\rangle|^2 P_\psi$（后者为上文归一化向量上的手工矩阵推导），第 3 款在单复变量情形下给出非负二次型 $c|z|^2$（$c \ge 0$），还需附加单位概率定标才固定 $c = 1$；定理本身属于多项式不变量与矩阵迹代数，并不单独证明物理超前波传播。取单比特参数化 $|\psi_\chi\rangle = e^{i\chi}(1, 0)^{\mathsf{T}}$ 与 $|\phi_\theta\rangle = (\cos(\theta/2), \sin(\theta/2))^{\mathsf{T}}$（布洛赫球面夹角为 $\theta$，希尔伯特空间交叠半角为 $\theta/2$，并用 $I - P_\phi$ 补全二元正交记录族以契合第 2 款前提），正向振幅 $a_{\mathrm{fwd}} = \cos(\theta/2)e^{i\chi}$ 与共轭回波 $a_{\mathrm{echo}} = \cos(\theta/2)e^{-i\chi}$ 随参考相位 $\chi$ 反向旋转，而它们的握手乘积纹丝不动地锁在 $p = \cos^2(\theta/2)$（在本书的 `MODEL` 诠释与下文 [@rem-ch29-transactional-tsvf-eraser-literature] 引述的交易诠释文献中，可将这对共轭因子直观读作跨越首尾边界的双向握手锁扣）：

::: {.viz src="coherence-handshake-causality" preset="born-handshake" height="500"}
**单向振幅旋转而双端握手锁定卡（`born-handshake`）**：布洛赫夹角 $\theta \in [0, \pi]$ 与参考相位 $\chi \in [0, 2\pi]$ 均可调节；固定 $\theta$ 扫描 $\chi$ 时，青色正向交叠箭头 $a_{\mathrm{fwd}} = \langle\phi|\psi\rangle$ 与紫罗兰共轭回波箭头 $a_{\mathrm{echo}} = \langle\psi|\phi\rangle$ 反向旋转，而二者相乘结出的实数握手权重 $\operatorname{Tr}(P_\phi P_\psi) = \cos^2(\theta/2)$ 与两侧投影算子锁定不变；调节 $\theta$ 则改变 $P_\phi$ 与握手权重。
:::

## 29.4.3 未来与过去的双向干涉：驻相束、弱值、延迟擦除无信令与格拉姆端点置换 {#sec-ch29-handshake-future-past}

一旦明白物理概率由首尾两端的厄米配对共同锁定，所谓“未来对过去发生干涉”便褪去了全部神秘色彩：局部观察者之所以觉得过去已经不可逆转，仅仅是因为自身偏迹视角丢失了环境与关联扇区的相干相位；而在未作不可逆丢弃的联合系统中，幺模相位记录支持相干逆转，未来测量基的选择则在不改动过去无条件边缘总和的前提下，将联合记录分拣为互补的干涉子系综。我们先将联合相干逆转、局部偏迹访问缺陷、二分边缘关联盲区与正算子格拉姆因式分解四条核心定理形式化锁定，再集中梳理对应的物理文献与手工无信令及置换恒等式：

::: {.theorem #thm-ch29-reversal-access-and-gram-realizability title="多副本幺模记录相干逆转、受控记录偏迹访问缺陷、局域边缘关联盲区与正算子格拉姆可实现性" lean="D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal, D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect, D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot, D5/S3/QuantumBounds/GramRealizability.gram_realizability"}
关于环境记录逆转、局部约化不可逆性、二分关联正交盲区与希尔伯特空间正算子内积实现，以下四项陈述成立：

1. **有限多副本幺模重叠记录的联合相干逆转**（[`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal)）：设有限可判定副本指标集为 `Copy`（`[Fintype Copy] [DecidableEq Copy]`），环境记录族为 $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$，$\rho \in M_2(\mathbb{C})$，$i, j \in \operatorname{Fin} 2$。若在所选矩阵元 $(i, j)$ 上**每一份副本的记录交叠均为幺模复数**（$\forall k,\, \overline{\gamma_k(i, j)}\,\gamma_k(i, j) = 1$，其中 $\gamma_k = \operatorname{recordOverlap}(\mathrm{records}(k))$），则对全体副本同步执行共轭逆转映射 `reverseOn Finset.univ` 后精确恢复原始矩阵元：

   $$
   \operatorname{multiRecordChannel}\bigl(\operatorname{reverseOn}\,\mathrm{Finset.univ}\,\mathrm{records}\bigr)\bigl(\operatorname{multiRecordChannel}\,\mathrm{records}\,\rho\bigr)_{ij} = \rho_{ij}.
   $$

2. **受控拷贝记录的局部约化不可逆性即访问缺陷**（[`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect)）：对任意具有相同对角元（$\forall i,\, \rho_{ii} = \sigma_{ii}$）但不同非对角相干元（$\exists i \neq j,\, \rho_{ij} \neq \sigma_{ij}$）的两个二阶复矩阵 $\rho, \sigma \in M_2(\mathbb{C})$，受控拷贝算符 $\mathrm{copyUnitary} \in \mathrm{U}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$ 将空白环境初态分别演化为相异的联合受控记录态，但对环境求偏迹后的单比特约化态完全重合（$\operatorname{traceEnvironment}(\widetilde{\rho}) = \operatorname{traceEnvironment}(\widetilde{\sigma})$）；因此不存在任何仅从约化态出发的恢复映射能同时还原两个联合态，而全局伴随幺正演化 $\operatorname{unitaryEvolution}(\operatorname{star}\mathrm{copyUnitary})$ 则精确恢复各自的原始空白环境直积态。
3. **二分无迹厄米算子空间中局域边缘与关联扇区的正交盲区分解**（[`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)）：对满足 $1 \le m$、$1 \le n$ 且 $1 < mn$ 的正整数 $m, n$，视为实希尔伯特空间的二分厄米算子空间 `BipartiteHermitian m n` 中的无迹子空间 `bipartiteTraceZero m n`（实维数 $m^2 n^2 - 1$）直和分解为局域边缘扇区与关联扇区，其实维数分别为 $(m^2 - 1) + (n^2 - 1)$ 与 $(m^2 - 1)(n^2 - 1)$（例如双比特 $m = n = 2$ 时在 $4^2 - 1 = 15$ 维无迹厄米实空间中局域扇区占 $6$ 维、关联扇区占 $9$ 维，占比 $9/15 = 3/5$），且两扇区在实希尔伯特—施密特内积下严格正交；同时，双比特贝尔纯态密度矩阵 `bellDensity`（秩 $1$）与经典关联混态 `classicalCorrelatedDensity`（非幂等，$\rho_{\mathrm{cl}}^2 \neq \rho_{\mathrm{cl}}$）两侧偏迹完全一致而全局态严格不等。
4. **完备复内积空间正算子的格拉姆伴随平方可实现性**（[`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)）：设 $V$ 为完备复内积空间，$Q : V \to_L[\mathbb{C}] V$ 为连续线性算子，则 $Q$ 为正算子（$0 \le Q$）当且仅当存在连续线性算子 $O : V \to_L[\mathbb{C}] V$ 使得

   $$
   Q = O^\dagger \circ_L O \quad \land \quad \forall x, y \in V,\; \langle Q x, y\rangle_{\mathbb{C}} = \langle O x, O y\rangle_{\mathbb{C}}.
   $$
:::

::: proof
第 1 款沿有限副本集展开多记录信道对矩阵元 $(i, j)$ 的逐副本交叠连乘因子，利用每个副本满足 $|\gamma_k(i, j)|^2 = 1$ 得共轭逆转连乘积等于 $1$。第 2 款直接计算受控拷贝幺正门作用后的联合分块矩阵与环境偏迹，验证偏迹仅依赖输入对角元 $\rho_{ii} = \sigma_{ii}$，由单值函数不可能把同一输入映成两个相异联合态排除局部恢复映射，并用幺正群元伴随逆元复原初态。第 3 款通过无迹泡利/基算子张量积子空间的实维数计数与迹正交检验建立 $(m^2-1)+(n^2-1)$ 对 $(m^2-1)(n^2-1)$ 的正交直和，并核验双比特贝尔态与对角经典关联态的双侧偏迹均为 $I_2/2$。第 4 款正向对正连续自伴算子取有界平方根 $O = Q^{1/2}$，反向由 $\langle O^\dagger O x, x\rangle = \|O x\|^2 \ge 0$ 证得算子正性。完整证明由 Lean 内核检查。
:::

这里同样须守住形式边界：[@thm-ch29-reversal-access-and-gram-realizability] 第 1 款的 `reverseOn` 仅将记录交叠取复共轭，当 $|\gamma_k| < 1$ 时给出 $|\gamma_k|^2 < 1$ 而无法撤销正交零交叠（$\gamma_k = 0$），真正给出联合系统物理幺正逆演化的是第 2 款中的显式 `star copyUnitary`；第 3、4 款本身亦不直接陈述任意未来测量仪器的无信令定理或三元实格拉姆行列式置换公式。下面这则注记将经典文献背景与两项精确手工推导逐一列出：

::: {.remark #rem-ch29-transactional-tsvf-eraser-literature title="驻相折射束、交易诠释、双态矢量弱值、延迟擦除无信令与格拉姆端点置换（文献结果与手工推导）"}
**文献结果，未在本书形式化。** 围绕双端边界条件与未来—过去关联，经典物理学文献与初等矩阵演算分别给出以下五项精确结果：

1. **费曼路径求和与斯涅尔折射界面的有限求积模型**（R. P. Feynman & A. R. Hibbs, *Quantum Mechanics and Path Integrals*, McGraw-Hill, 1965）：固定过去源点 $A(0, 1)$ 与未来终点 $B(1, -1)$，考虑穿过折射率 $n_1, n_2$ 分界面 $y = 0$ 横坐标 $s$ 的光程 $L(s) = n_1\sqrt{s^2 + 1} + n_2\sqrt{(1 - s)^2 + 1}$ 与相位 $S(s)/\hbar = k_0 L(s)$（$k_0 = 2\pi/\lambda$）。导数归零条件 $L'(s^*) = 0$ 恰为斯涅尔折射定律 $n_1\sin\theta_1 = n_2\sin\theta_2$（因 $L''(s) > 0$，此处驻点 $s^*$ 为唯一极小值点；一般作用量泛函的驻点不必是极小值）。在 $M$ 条候选路径的有限求积模型 $A_M = M^{-1/2}\sum_{k=0}^{M-1} e^{i S_k/\hbar}$（有界相干度指标 $C = |A_M|^2/M \le 1$，并非连续路径积分的极限证明）中，满足 $|k_0(L(s) - L(s^*))| \le \pi/4$ 的驻相邻域同相累加，而远离驻点的路径束因快速卷绕发生**近似相消**（`NUM` / `MODEL`：有限孔径与有限 $M$ 下通常留有边界余项，唯有理想单位根子模型 $\sum_{k=0}^{M-1} e^{2\pi i k/M} = 0$ 或成对反相向量 $+\mathbf{\Omega} - \mathbf{\Omega} = \mathbf{0}$ 才精确为零）。
2. **交易诠释中的推迟提供波与超前确认波**（J. G. Cramer, *Rev. Mod. Phys.* **58**, 647, 1986）：将标准单时刻量子力学中的玻恩乘积 $\langle\phi|\psi\rangle\langle\psi|\phi\rangle = |\langle\phi|\psi\rangle|^2$ 诠释为从过去发射体发出的推迟提供波 $\psi$ 与从未来吸收体回传的超前确认回波 $\phi^*$ 在四维时空边界之间达成的驻波交易握手（此四维驻波图景属于诠释文献与本书 `MODEL` 视角，与标准教科书单时刻演化表述相区分）。
3. **双态矢量形式体系（TSVF）、弱值奇异边界与延迟选择量子擦除实验**（Y. Aharonov, P. G. Bergmann & J. L. Lebowitz, *Phys. Rev.* **134**, B1410, 1964；Y. Aharonov, D. Z. Albert & L. Vaidman, *Phys. Rev. Lett.* **60**, 1351, 1988；M. O. Scully & K. Drühl, *Phys. Rev. A* **25**, 2208, 1982；Y.-H. Kim et al., *Phys. Rev. Lett.* **84**, 1, 2000）：在给定前选择态 $|\Psi\rangle$ 与非正交后选择态 $\langle\Phi|$（$\langle\Phi|\Psi\rangle \neq 0$）的双边界子系综 $(\langle\Phi|\;|\Psi\rangle)$ 中，算符 $\hat{O}$ 的弱值定义为 $O_w = \langle\Phi|\hat{O}|\Psi\rangle / \langle\Phi|\Psi\rangle$（一般为复数，可超出本征值区间 $[-1, 1]$，绝非概率）。例如取 $|\Psi\rangle = |+\rangle$、$|\Phi_\eta\rangle = \cos\eta\,|+\rangle + \sin\eta\,|-\rangle$、$\hat{O} = Z$，则后选择成功概率为 $p_{\mathrm{post}} = |\langle\Phi_\eta|\Psi\rangle|^2 = \cos^2\eta$，弱值为 $Z_w = \tan\eta$；当 $\eta \to \pi/2$ 时 $p_{\mathrm{post}} \to 0$，而在精确正交点 $\eta = \pi/2$（$\langle\Phi_{\pi/2}|\Psi\rangle = 0$）处后选择概率为零，**弱值分母为零、在数学与物理上严格无定义**（绝非可实现的有限读数 $\infty$）。
4. **延迟擦除的联合/条件归一化与克劳斯完备性无信令证明**（`手工推导`）：在路径 $\otimes$ 标记双比特态 $\rho_{PM} = \frac{1}{2}(|00\rangle\langle 00| + |11\rangle\langle 11| + V|00\rangle\langle 11| + V|11\rangle\langle 00|)$（$V \in [0, 1]$）、屏幕完备正算子测度 $E_j = q_j\begin{pmatrix}1 & e^{-i\varphi_j} \\ e^{i\varphi_j} & 1\end{pmatrix}$（$\sum_j q_j = 1,\; \sum_j E_j = I$）与未来标记基角 $\beta \in [0, \pi/2]$（$|f_+\rangle = \cos(\beta/2)|0\rangle + \sin(\beta/2)|1\rangle$，$|f_-\rangle = -\sin(\beta/2)|0\rangle + \cos(\beta/2)|1\rangle$）的精确 $4\times 4$ 模型中，必须严格区分三种分布：联合概率 $p(j, \pm) = \frac{1}{2}q_j(1 \pm V\sin\beta\cos\varphi_j)$，预示条件概率 $p(j \mid \pm) = q_j(1 \pm V\sin\beta\cos\varphi_j)$，以及归一化条纹轮廓 $F_\pm(j) = p(j, \pm)/q_j = \frac{1}{2}(1 \pm V\sin\beta\cos\varphi_j)$。从 $\beta = 0$（路径读出，条纹平坦）转到 $\beta = \pi/2$（量子擦除，正反互补条纹显现），无条件过去边缘分布恒满足 $p(j) = p(j, +) + p(j, -) = \frac{1}{2}p(j \mid +) + \frac{1}{2}p(j \mid -) = q_j$。更一般地，对未来标记端任意完备量子仪器 $\{K_r\}$（$\sum_r K_r^\dagger K_r = I$），由迹的循环性与完备性立得

   $$
   \sum_r \operatorname{Tr}\!\Bigl[(I \otimes K_r)\rho_{PM}(I \otimes K_r^\dagger)(E_j \otimes I)\Bigr] = \operatorname{Tr}\!\Bigl[\rho_{PM}\Bigl(E_j \otimes \sum_r K_r^\dagger K_r\Bigr)\Bigr] = \operatorname{Tr}\bigl[\rho_{PM}(E_j \otimes I)\bigr] = q_j,
   $$

   即未来的选基只能在事后符合计数中分拣子系综，**绝不可能改写过去屏幕的总计边缘分布或逆时传递超光速信号**。
5. **三时刻实格拉姆矩阵的首尾端点置换不变性**（`手工推导`，对照单位重叠等价判据 [@thm-ch29-gram-rigidity-and-pell]）：对过去、现在、未来三支实单位向量 $\mathbf{A}_{\mathrm{past}}, \mathbf{B}_{\mathrm{now}}, \mathbf{C}_{\mathrm{future}}$，记 $x = c_{AB}, y = c_{BC}, z = c_{AC}$。用首尾对调置换阵 $P_{13} = \begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix}$ 作双侧合同变换：

   $$
   G(x, y, z) = \begin{pmatrix} 1 & x & z \\ x & 1 & y \\ z & y & 1 \end{pmatrix} \longmapsto G' = P_{13} G P_{13}^{\mathsf{T}} = \begin{pmatrix} 1 & y & z \\ y & 1 & x \\ z & x & 1 \end{pmatrix} = G(y, x, z).
   $$

   注意当 $x \neq y$ 时矩阵元 $x$ 与 $y$ 互换位置，故 **$G' \neq G$**（仅在反射对称特例 $x = y$ 时才有逐元相等 $G' = G$）；然而对称性、全部特征值、矩阵秩、半正定性（$G' \succeq 0 \iff G \succeq 0$）、有向体积平方 $(\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C}))^2$（带符号混合积本身会变号）以及行列式 $\det G' = (\det P_{13})^2\det G = \det G = 1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ 在首尾对调下严格保持不变。
:::

把上述文献与手工恒等式放到直观几何舞台上，首先看到的是固定过去源点与未来终点时，有限折射路径扇如何围绕斯涅尔驻点 $s^*$ 聚拢相干度，而扇面两侧的高频相位卷绕如何近似抵消：

::: {.viz src="coherence-handshake-causality" preset="feynman-stationary" height="500"}
**首尾双端锁定的有限驻相折射扇卡（`feynman-stationary`）**：连接过去源点 $A$ 与未来终点 $B$ 的 $M$ 条候选折射路径按横坐标 $s$ 排成首尾相接的复相量扇——青色标出满足 $L'(s^*) = 0$（默认 $s^* \approx 0.6232$）的斯涅尔驻点及 $|\Delta\phi| \le \pi/4$ 同相束，琥珀色标出当前加入的路径，两侧非驻相路径盘旋近似相消，并附单位根精确归零校准子图。
:::

再看双态矢量与延迟选择量子擦除舞台：旋转未来标记测量角 $\beta$ 时，符合分拣出的两支条件条纹 $p(j \mid +)$ 与 $p(j \mid -)$ 此起彼伏、反相互补，但过去屏幕的无条件总边缘 $p(j) = q_j$ 如磐石般纹丝不动（数值计算允许浮点舍入误差）；一旁的弱值小窗则在后选择趋近正交 $\eta \to \pi/2$ 时清晰标出成功率归零与分母无定义边界：

::: {.viz src="coherence-handshake-causality" preset="tsvf-eraser" height="500"}
**未来选基擦除分拣与无条件边缘守恒卡（`tsvf-eraser`）**：调节未来标记基角 $\beta \in [0, \pi/2]$ 与可见度 $V \in [0, 1]$，直接由 $4\times 4$ 矩阵迹算出联合分布 $p(j, \pm)$、条件分布 $p(j \mid \pm)$ 与无条件过去总和 $p(j) = q_j$——未来擦除在符合子系综中显影反相条纹却绝不改动过去边缘；右侧弱值子窗展示 $Z_w = \tan\eta$ 并在 $\eta = \pi/2$（$p_{\mathrm{post}} = 0$）处显式标明“无定义”。
:::

最后回到本章核心的三元格拉姆相容空间（对照 [@thm-ch29-gram-rigidity-and-pell] 与 [@thm-ch29-reversal-access-and-gram-realizability] 第 4 款）：将过去 $\mathbf{A}_{\mathrm{past}}$ 与未来 $\mathbf{C}_{\mathrm{future}}$ 作首尾置换 $P_{13} G P_{13}^{\mathsf{T}}$，非对称输入（如默认 $x = 0.2, y = 0.6, z = 0.1$）下非对角元 $x, y$ 忠实互换，而特征谱、半正定相容性与三维体积平方 $\det G = 0.614$ 毫厘不爽：

::: {.viz src="coherence-handshake-causality" preset="gram-symmetry" height="500"}
**三时刻格拉姆矩阵首尾置换与行列式不变量卡（`gram-symmetry`）**：对实单位向量 $\mathbf{A}_{\mathrm{past}}, \mathbf{B}_{\mathrm{now}}, \mathbf{C}_{\mathrm{future}}$ 执行首尾置换 $G' = P_{13} G P_{13}^{\mathsf{T}}$——当 $x \neq y$ 时矩阵元 $x$ 与 $y$ 互换（$G' \neq G$，切换到对称点 $x = y = 0.5$ 时 $G' = G$），而半正定性、特征值谱与体积平方 $\det G' = \det G = (\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C}))^2 \ge 0$ 全程守恒。
:::

## 29.4.4 为何因果闭环从不自毁：反相悖论相消与自洽不动点锁定 {#sec-ch29-handshake-loop-consistency}

这套相干—去相干因果观还能干净地回答最后一个经典诘难：假如未来与过去真能构成闭合因果环路，“外祖母悖论”（回到过去阻止自己出发，即布尔逻辑里的 $P \leftrightarrow \neg P$）为何不会把宇宙逻辑炸毁？答案在于严格区分三种常被混为一谈的闭环自洽机制（`手工推导` + `文献结果` + `MODEL`）：

1. **相干参考臂下的反相悖论端口相消（而非孤立负号湮灭）**：首先必须澄清，孤立态向量 $|\psi\rangle$ 与全局反号态 $-|\psi\rangle$ 代表同一条物理射线与同一个密度矩阵 $(-|\psi\rangle)(-\langle\psi|) = |\psi\rangle\langle\psi|$，单个全局负号本身既不是逻辑矛盾，也不是振幅归零！要让“绕环一圈翻出 $\pi$ 相位”转化为观测禁戒，必须存在**与闭环臂相干合束的参考臂**（`手工推导`）：设输出振幅为

   $$
   A_{\mathrm{loop}}(\delta) = \frac{1}{2}\bigl(1 + e^{i\delta}\bigr), \qquad A_{\mathrm{other}}(\delta) = \frac{1}{2}\bigl(1 - e^{i\delta}\bigr),
   $$

   则 $|A_{\mathrm{loop}}(\delta)|^2 = \cos^2(\delta/2)$、$|A_{\mathrm{other}}(\delta)|^2 = \sin^2(\delta/2)$，恒有 $p_{\mathrm{loop}} + p_{\mathrm{other}} = 1$。在自否相位 $\delta = \pi$ 处，悖论端口振幅精确相消为 $|A_{\mathrm{loop}}(\pi)|^2 = 0$，全部概率 $1$ 转向相容互补端口 $A_{\mathrm{other}}(\pi)$；而在同相自洽点 $\delta = 0$ 处，闭环端口以概率 $1$ 稳定通行。从覆叠拓扑看，圆周平方双覆叠沿底空间绕行 $2\pi$ 一整圈会将纤维起点 $+1$ 连续提升至对径点 $-1$（绕满两圈 $4\pi$ 才回到 $+1$），唯有与未绕行的参考支路比对时，这一拓扑换叶负号才显现为干涉相消。
2. **Deutsch 闭合类时曲线（CTC）的混合态不动点**（**文献结果**，D. Deutsch, *Phys. Rev. D* **44**, 3197, 1991）：在量子电路模型中，经典“外祖母翻转门”对应比特翻转幺正门 $X = \begin{pmatrix}0&1\\1&0\end{pmatrix}$（注意 $X$ 绝非全局相位 $-I$）。虽然经典布尔值 $\{0, 1\}$ 在 $x \mapsto 1 - x$ 下无不动点，但 Deutsch 提出的密度矩阵自洽条件 $\rho_{\mathrm{CTC}} = \Phi(\rho_{\mathrm{CTC}})$ 在混合态空间中恒有不动点——对纯共轭映射 $\rho \mapsto X\rho X^\dagger$，最大混态 $\rho_{\mathrm{CTC}} = I/2$ 满足 $X(I/2)X^\dagger = I/2$（需诚实指出：单靠幺正共轭 $X\rho X^\dagger = \rho$ 时不动点并不唯一，所有形如 $\frac{1}{2}(I + r_x X)$、$|r_x| \le 1$ 的态——包括纯态 $|+\rangle\langle+|$ 与 $|-\rangle\langle-|$——同样是不动点；若具体取计算（$Z$）基的完全捏合 $\Pi_Z$，则信道 $\Phi(\rho) = \Pi_Z(X\rho X^\dagger)$ 的唯一不动点才是 $I/2$，这是该模型的手工计算）。
3. **离散分式自应用四重命运与连续余弦自指不动点**：在对角线与自应用映射层面，任意类型的条件对角线落点定理 [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed) 表明一旦某行落上对角线 $g(a_0) = \operatorname{diagonal}(f, g)$，对角元即满足自洽方程 $f(g(a_0, a_0)) = g(a_0, a_0)$；系数取自二元系数集 `Fin 2`（即 $\{0,1\}$，嵌入整数／有理数计算）的非退化分式自应用映射精确划分为四种代数命运；而在实区间 $[0, 1]$ 的连续标量投影反馈下，单调压缩曲线 $y = \cos\theta$ 与对角线 $y = \theta$ 唯一锁定正实自指不动点 $\cos\theta^* = \theta^* \approx 0.7390851332$（`NUM`：50 步二分法残差 $\le 10^{-15}$；注意 $\theta^*$ 与前文光学驻点 $s^*$、干涉相位 $\delta = 0$ 及黄金比互不相同，各自代表不同数学层面的自洽条件）。

下面这条冻结定理将圆周双覆叠路径提升、二元分式自应用四重命运分类与 Dottie 有理逆幂级数端点统一收入内核保证：

::: {.theorem #thm-ch29-double-cover-fates-and-dottie title="圆周双覆叠历史路径提升、二元分式自应用四重命运分类与余弦不动点有理逆级数定理" lean="D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift, D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates, D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint"}
关于圆周平方双覆叠单值性换叶、二元分式自应用分类与正实余弦不动点级数表示，以下三项陈述成立：

1. **圆周平方双覆叠的唯一路径提升、无连续全局截面与 $2\pi$ 对径换叶**（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)）：记单位圆周映射 $\operatorname{square}(z) = z^2$ 及其二叶商覆叠映射 `covering`。则：（a）对任意连续底路径 $\mathrm{basePath} : C(I, \mathrm{Circle})$ 与满足 $\mathrm{basePath}(0) = \operatorname{square}(\mathrm{initial})$ 的纤维初值 $\mathrm{initial}$，存在唯一连续提升路径 $\mathrm{lifted}$ 使得 $\operatorname{square} \circ \mathrm{lifted} = \mathrm{basePath}$ 且 $\mathrm{lifted}(0) = \mathrm{initial}$；（b）不存在连续全局截面 $\mathrm{selector} : \mathrm{Circle} \to \mathrm{Circle}$ 使得对所有点成立 $\operatorname{square}(\mathrm{selector}(z)) = z$；（c）将底空间整圈路径 $\mathrm{fullTurn}(t) = \operatorname{Circle.exp}(2\pi t)$ 从初值 $1$ 提升，所得路径满足 $\operatorname{square} \circ \mathrm{lifted} = \mathrm{fullTurn}$、$\mathrm{lifted}(0) = 1$ 且终点翻至对径叶 $\mathrm{lifted}(1) = -1$。
2. **非退化二元分式自应用映射的四重命运唯一分类**（[`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates)）：对系数取自 $\operatorname{Fin} 2$ 且满足非退化条件 $ad - bc \neq 0$（`Nondegenerate m`）的任意二元分式映射 $m = \langle a, b, c, d\rangle$（其不动点二次型系数三元组为 $(c, d - a, -b)$，判别式为 $\Delta = (d - a)^2 + 4bc$），$m$ 唯一归属于空命运 `.empty`、死锁命运 `.dead`、坍缩命运 `.collapse` 与活性黄金命运 `.live` 四者之一（$\exists!\,\mathrm{fate},\, \operatorname{HasFate}(m, \mathrm{fate})$）；且 $\operatorname{HasFate}(m, \mathrm{.live}) \iff \operatorname{IsPhiFamily}(m)$，此时不动点系数三元组必为 $(1, -1, -1)$ 或 $(1, 1, -1)$，判别式恒为 $\Delta = 1^2 + 4 = 5$。
3. **正实余弦不动点的存在唯一性与 $\pi$ 处有理逆幂级数绝对可和收敛**（[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)）：存在实数 $\theta \in (0, 1)$ 满足 $\cos\theta = \theta$，且该根在全体正实数 $t > 0$ 中是 $\cos t = t$ 的唯一解；同时，有理系数形式复合逆幂级数 `inverse`（对应 $2X + 2\arcsin X$ 在 $\mathbb{Q}$ 上的形式逆级数）在 $\pi$ 处绝对可和并精确收敛于 $\theta$：

   $$
   \operatorname{Summable}\Bigl(n \mapsto \bigl|(\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\bigr|\,\pi^n\Bigr) \;\land\; \operatorname{HasSum}\Bigl(n \mapsto (\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\,\pi^n,\; \theta\Bigr).
   $$
:::

::: proof
第 1 款调用二叶覆叠映射的同伦路径提升存在唯一性，对整圈路径 $t \mapsto e^{2\pi i t}$ 直接检验提升曲线 $t \mapsto e^{\pi i t}$ 在 $t = 0$ 取 $1$、在 $t = 1$ 取 $-1$；若存在连续全局截面，则将整圈路径复合该截面会导出起点与终点相等但又必须等于唯一提升终点 $-1 \neq 1$ 的矛盾。第 2 款在二元系数集 $\operatorname{Fin} 2$ 的全部 $16$ 个四元组中，以整数行列式筛出非退化元，逐一核验二次系数与判别式对四类命运的互斥完备划分及黄金族判别式 $1^2 + 4 = 5$。第 3 款由 $z+\sin z$ 的解析逆函数 $G$ 构造 $H(Y)=\sin(G(Y/2))$，将其泰勒系数与有理形式逆级数逐项识别；利用 $\pi < 13/4$ 位于已证解析圆盘内部得到绝对可和与求和值 $H(\pi)=\theta$，再由余弦单调性排除其他正实根。完整证明由 Lean 内核检查。
:::

下方实验卡将双臂相对相位干涉端口、Deutsch 比特翻转密度矩阵不动点小窗、圆周双覆叠 $2\pi$ 换叶提升与实标量 $\cos\theta^* = \theta^*$ 二分收敛曲线并列呈现，清晰展示不同数学机制如何各自消解自否振荡：

::: {.viz src="coherence-handshake-causality" preset="paradox-cancel" height="500"}
**闭环反相端口分流、混合态自洽与余弦不动点对照卡（`paradox-cancel`）**：主舞台展示参考臂与闭环臂合束——在 $\delta = \pi$ 处闭环端口相消为 $0$、互补端口得 $1$（总和恒为 $1$，并区分孤立射线 $(-|\psi\rangle)(-\langle\psi|) = |\psi\rangle\langle\psi|$）；附图并列展示圆周双覆叠 $2\pi$ 换叶 $+1 \to -1$、Deutsch 翻转门 $X(I/2)X^\dagger = I/2$（连同纯不动点 $|+\rangle\langle+|$）以及 $[0, 1]$ 上 $\cos\theta^* = \theta^* \approx 0.739085$ 的唯一交点。
:::

至此，我们可以将传统多米诺骨牌式的布尔因果观与本章建立的正交相干—双端握手因果观汇总为一张清晰的四维对照表：

::: {.remark #rem-ch29-coherence-causality-comparison title="传统多米诺骨牌因果观与正交相干—双端握手因果观的四维对照"}
**模型综合与三层依据边界说明（`MODEL` / `LEAN ✓` / `文献结果`）。** 下表将日常经典因果直觉与本节四重机制逐项对比；表中凡涉正交投影、记录捏合、模平方配对、幺模逆转、偏迹盲区、正算子格拉姆分解、双覆叠提升与不动点级数之处均以 [@thm-ch29-coherence-complement-and-pinching]–[@thm-ch29-double-cover-fates-and-dottie] 为形式锚点（`LEAN ✓`），凡涉驻相折射、交易诠释、弱值、延迟擦除与 Deutsch CTC 之处均按 [@rem-ch29-transactional-tsvf-eraser-literature] 归入经典物理文献与手工推导（`文献结果` / `手工推导`），而“逻辑只有相干与去相干、因果即双向边界握手”的哲学总括属本书几何诠释模型（`MODEL`）：

| 对照维度 | 传统多米诺骨牌因果观（经典布尔直觉） | 正交相干与双端握手因果观（本书形式—几何综合） |
| :--- | :--- | :--- |
| **1. 逻辑底层状态** | 非此即彼的二值布尔开关：读数为 `0` 被等同于本体“不存在”，读数为 `1` 被等同于绝对静态实体 | 无布尔存亡之分，唯有相干保持与去相干捏合：零读数可源于正交子空间隐匿（$\|\mathbf{B}_\perp\|^2 = 1$）或双端口反相分流（$p_+ = 0, p_- = 1$），经典记录则是幂等捏合信道 $\Pi_P \circ \Pi_P = \Pi_P$ 抹去跨块相干后的块对角不动点（[@thm-ch29-coherence-complement-and-pinching]） |
| **2. 因果作用机制** | 单向时间箭头里的机械推撞：过去单方面决定未来，单向跃迁振幅似乎无需未来参与即可独立定格 | 首尾共轭配对的双端玻恩握手：单向交叠 $\langle\phi\mid\psi\rangle$ 携带相对相位，唯有乘上共轭回波 $\langle\psi\mid\phi\rangle$ 才结出规范不变的二次厄米权重 $w(\psi\leftrightarrow\phi) = \lvert\langle\phi\mid\psi\rangle\rvert^2 = \operatorname{Tr}(P_\phi P_\psi)$（[@thm-ch29-born-handshake-and-phase-fairness]） |
| **3. 未来对过去的干涉** | 被视为颠倒先后次序的“逆时改写历史”怪谈，似乎一旦允许未来参与就会触发超光速传信 | 联合相干态的条件切片与格拉姆边界刚性：局部不可逆仅是偏迹丢失关联扇区的访问缺陷；未来选基在符合子系综中分拣互补条纹 $p(j\mid\pm)$，而克劳斯完备性锁死无条件边缘 $p(j) = q_j$ 绝不逆时传信，首尾置换 $P_{13} G P_{13}^{\mathsf{T}}$ 严格保持 $\det G \ge 0$（[@thm-ch29-reversal-access-and-gram-realizability]、[@rem-ch29-transactional-tsvf-eraser-literature]） |
| **4. 逻辑悖论消解** | 闭合回路一旦遇上自否翻转 $P \leftrightarrow \neg P$ 即陷入无穷振荡与逻辑崩溃 | 相对相位分流与自洽不动点锁定：双覆叠 $2\pi$ 换叶在相干参考臂比对下使反相悖论端口 $\delta = \pi$ 归零并将概率导入互补端口，混合态翻转门满足 $X(I/2)X^\dagger = I/2$，实投影自应用收敛于唯一正根 $\cos\theta^* = \theta^*$（[@thm-ch29-double-cover-fates-and-dottie]） |
:::

请进入下方完整交互实验室，在同一座舞台上自由切换全部六个场景，亲手拨动正交夹角、双束相位、捏合保留度、参考相位、折射波长、未来擦除基角、三元格拉姆二面角与闭环相位，核验每一条绿色形式定理、手工守恒残差与文献边界如何严丝合缝地扣合在一起：

::: {.viz src="coherence-handshake-causality" height="640"}
**交互实验室 `ORTHO//HANDSHAKE`**：相干与去相干、双端玻恩握手与全息边界因果沙盘。集成 `boolean-illusion`（正交隐匿、双端口反相分流与捏合去相干）、`born-handshake`（正向振幅与共轭回波的规范不变乘积）、`feynman-stationary`（斯涅尔折射界面的有限驻相相量扇）、`tsvf-eraser`（未来标记选基分拣条纹、无条件过去边缘守恒 $p(j)=q_j$ 与弱值正交无定义边界）、`gram-symmetry`（三时刻实格拉姆矩阵首尾置换 $P_{13} G P_{13}^{\mathsf{T}}$ 与 $\det G$ 守恒）及 `paradox-cancel`（参考臂反相消去悖论端口、Deutsch 混合态不动点与 $\cos\theta^*=\theta^*$）六大实验场景。绿色徽章仅标记本节引用的十四条 Lean 验证定理；驻相、交易诠释、弱值、延迟擦除与 CTC 模型标为文献与模型依据。
:::


---
