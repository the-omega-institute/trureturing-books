# A.1.1 量子态、算符与算法 {#sec-appendix-a-s01-s01-quantum-and-algorithms}

各词条的证据分级沿用[词典说明](appendix-a-s01-master-dictionary.md#rem-appendix-a-master-dictionary)。

**测量 / 物理量**<br/>(Measurement / Physical Quantity)

**本书几何直觉语言 (Geometric Intuition Term)：**
**动词“量（liáng）”与名词“量（liàng）”**：成对尺子比对算子 vs. 截断投影读数

**Lean 4 形式对象 / 锁定声明 GID：**
[`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\rho \succeq 0,\ \operatorname{Tr}\rho = 1 \implies \operatorname{bornProbability}(\rho, I) = 1$，且对投影可加、非负

**认识论状态 (Status)：**
`LEAN ✓`（第 1–2 章）

**量子纯态 $|\psi\rangle$**<br/>(Pure Quantum State)

**本书几何直觉语言 (Geometric Intuition Term)：**
**单位球面上的有向方向射线**（由成对测量余弦唯一锁定）

**Lean 4 形式对象 / 锁定声明 GID：**
[`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\operatorname{Tr}M = 1,\ M^2 = M \implies x^2 + y^2 + z^2 = 1$（$M$ 为 $2\times 2$ 厄米矩阵）

**认识论状态 (Status)：**
`LEAN ✓`（第 1–3 章、铸器与圣殿 · 单量子比特旋转器编译）

**可观测量与投影算符 $P$**<br/>(Observable & Projector)

**本书几何直觉语言 (Geometric Intuition Term)：**
**几何标尺与幂等正交投影方向**（$P^2 = P = P^\dagger$）

**Lean 4 形式对象 / 锁定声明 GID：**
[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho),\quad P_\psi^2 = P_\psi$

**认识论状态 (Status)：**
`LEAN ✓`（第 1、3 章、铸器与圣殿 · 走进 Lean 4 公理圣殿（上））

**玻恩概率法则 $P = |\langle\phi|\psi\rangle|^2$**<br/>(Born Probability Rule)

**本书几何直觉语言 (Geometric Intuition Term)：**
**内积投影平方与秩一迹配对**（勾股斜边在标尺轴上的面积分量）

**Lean 4 形式对象 / 锁定声明 GID：**
[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\rho = \lvert\psi\rangle\langle\psi\rvert,\ P_k = \lvert\phi\rangle\langle\phi\rvert \implies \operatorname{recordWeight}_k = \operatorname{Tr}(\rho P_k) = \lvert\langle\phi\mid\psi\rangle\rvert^2$

**认识论状态 (Status)：**
`LEAN ✓`（第 2 章、铸器与圣殿 · 走进 Lean 4 公理圣殿（下））

**正交态分解与完备性**<br/>(Orthogonal Decomposition)

**本书几何直觉语言 (Geometric Intuition Term)：**
**内积空间平行四边形与勾股定律**：正交向量一维不可加，平方后二维面积守恒

**Lean 4 形式对象 / 锁定声明 GID：**
[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\|u + v\|^2 + \|u - v\|^2 = 2(\|u\|^2 + \|v\|^2)$

**认识论状态 (Status)：**
`LEAN ✓`（仅平行四边形恒等式）（第 1 章、铸器与圣殿 · 走进 Lean 4 公理圣殿（上）、终章）

**全局相位 $e^{i\alpha}|\psi\rangle$**<br/>(Global Phase / Ray Equivalence)

**本书几何直觉语言 (Geometric Intuition Term)：**
**绕测量轴自身的规范空转**（连通射线测试下的幺正全局相位刚性）

**Lean 4 形式对象 / 锁定声明 GID：**
[`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$A$ 酉且保坐标射线与连通射线族 $\implies A = c\,I,\ |c| = 1$

**认识论状态 (Status)：**
`LEAN ✓`（第 1 章、铸器与圣殿 · 走进 Lean 4 公理圣殿（上））

**密度矩阵 $\rho$ 与混合态**<br/>(Density Matrix & Mixed State)

**本书几何直觉语言 (Geometric Intuition Term)：**
**布洛赫球体内部重心向量 $\mathbf{r} \in B^3$**（纯度亏损度量丢失的相位面积）

**Lean 4 形式对象 / 锁定声明 GID：**
[`norm_bloch_le_trace_of_posSemidef`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\|\mathbf{r}\| \le \operatorname{Tr}(\rho),\quad \operatorname{Tr}(\rho(\mathbf{r})) = 1$

**认识论状态 (Status)：**
`LEAN ✓`（第 3 章、铸器与圣殿 · 单量子比特旋转器编译）

**退相干与量子信道 $\Phi(\rho)$**<br/>(Decoherence & Quantum Channel)

**本书几何直觉语言 (Geometric Intuition Term)：**
**向测量轴的正交捏合投影（Pinching）**：横向圆周相干性向纵向直径坍缩

**Lean 4 形式对象 / 锁定声明 GID：**
[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\|\rho\|_{\mathrm{HS}}^2 = \|\mathcal{P}(\rho)\|_{\mathrm{HS}}^2 + \|\rho - \mathcal{P}(\rho)\|_{\mathrm{HS}}^2$

**认识论状态 (Status)：**
`LEAN ✓`（第 4、6 章）

**量子不可克隆原理**<br/>(No-Cloning Theorem)

**本书几何直觉语言 (Geometric Intuition Term)：**
**幺正内积刚性**：保内积映射无法同时复制非正交且非共线的未知方向

**Lean 4 形式对象 / 锁定声明 GID：**
[`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$s = s^2 \implies s = 0 \lor s = 1$

**认识论状态 (Status)：**
`LEAN ✓`（第 14 章）

**算符对易子 $[A, B] = AB - BA$**<br/>(Operator Commutator)

**本书几何直觉语言 (Geometric Intuition Term)：**
**克利福德外积有向面积 $2(\mathbf{a}\wedge\mathbf{b})$**：衡量两步测量顺序差异张开的旋转平面

**Lean 4 形式对象 / 锁定声明 GID：**
[`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum)（平衡和的混合乘积，见附录 B 的 B.5 行）

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\begin{aligned}&\mathbf{u}\wedge\mathbf{v}=-\mathbf{v}\wedge\mathbf{u},\\&A=A^\dagger,\ B=B^\dagger\\&\implies (AB-BA)^\dagger\\&\hspace{1em}=-(AB-BA)\end{aligned}$

**认识论状态 (Status)：**
`LEAN ✓`（平衡和混合乘积）/ `文献结果`（对易子恒等式，第 5–6 章）

**虚数单位 $i$ 与泡利矩阵 $\sigma_x, \sigma_y, \sigma_z$**<br/>(Imaginary Unit & Pauli Matrices)

**本书几何直觉语言 (Geometric Intuition Term)：**
**三维正交基向量 $e_1, e_2, e_3$ 与反自伴幺正双向量复结构 $\hat{\mathbf{I}}^2 = -1$**

**Lean 4 形式对象 / 锁定声明 GID：**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\hat{\mathbf{I}}^2 = -1,\quad ZX = -XZ$

**认识论状态 (Status)：**
`LEAN ✓`（第 5 章、铸器与圣殿 · 把矩阵还原为异或）

**单比特幺正门 $U \in \mathrm{SU}(2)$**<br/>(Single-Qubit Unitary Gate)

**本书几何直觉语言 (Geometric Intuition Term)：**
**双向量指数旋量（Rotor）$R = \cos(\theta/2) - \hat{B}\sin(\theta/2)$** 的校准幺正演化群

**Lean 4 形式对象 / 锁定声明 GID：**
[`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$U(0) = 1,\ U(s+t) = U(s)U(t),\ U^*U = 1,\ U$ 在 $0$ 可导 $\implies U(t) = \exp(-itH/\hbar)$，$H$ 自伴（$v \mapsto R v \widetilde{R}$ 不在该声明内）

**认识论状态 (Status)：**
`LEAN ✓`（第 7 章、铸器与圣殿 · 单量子比特旋转器编译）

**双比特纠缠与并发度（Concurrence）**<br/>(Two-Qubit Entanglement)

**本书几何直觉语言 (Geometric Intuition Term)：**
**复四维状态向量的外积楔面积与纯态边缘最大混合盲区**

**Lean 4 形式对象 / 锁定声明 GID：**
[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
贝尔态：$\rho_A = \frac{1}{2}I_2,\ \rho_A^2 \neq \rho_A$；一般纯态的并发度判据 $\psi_{00}\psi_{11} - \psi_{01}\psi_{10} \neq 0$ 为 `文献结果`

**认识论状态 (Status)：**
`LEAN ✓`（贝尔态边缘）/ `文献结果`（并发度判据）（第 8、13 章）

**量子态层析（State Tomography）**<br/>(Quantum State Tomography)

**本书几何直觉语言 (Geometric Intuition Term)：**
**三正交轴两步完备寻址与六轴有理开覆盖**

**Lean 4 形式对象 / 锁定声明 GID：**
[`rational_six_axis_open_cover`](lean:D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
六个开集 $C_1, \dots, C_6$ 覆盖 $S^2$，且同一 $C_i$ 内任意两点不正交

**认识论状态 (Status)：**
`LEAN ✓`（六轴有理开覆盖）（第 9 章）

**海森堡顺序依赖 vs. 潘查拉特纳姆—贝里相位**<br/>(Order Dependence vs. Berry Phase)

**本书几何直觉语言 (Geometric Intuition Term)：**
**“两两比较，永远一致，顺序无关”**：单位态重叠等于 $1$ 当且仅当两向量相等（`LEAN ✓`；一般投影射线相等当且仅当相对相位对齐）vs. 闭合环路立体角 $\Omega/2$（`文献结果`）

**Lean 4 形式对象 / 锁定声明 GID：**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\|u\|=\|v\|=1 \implies (\langle u,v\rangle = 1 \iff u = v);\; \gamma_{\mathrm{Berry}} = -\Omega/2$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果`（第 10 章）

**微波拉比脉冲与虚拟 $Z$ 门**<br/>(Microwave Pulse & Virtual-$Z$ Gate)

**本书几何直觉语言 (Geometric Intuition Term)：**
**旋转坐标系中的三脉冲有序迹界与观测者拉回迹恒等式**

**Lean 4 形式对象 / 锁定声明 GID：**
[`ordered_three_pulse_real_trace_bound`](lean:D5/S3/Quantum/Dynamics/OrderedThreePulseTrace.ordered_three_pulse_real_trace_bound)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\begin{aligned}&R_z(\phi)R_{\text{xy}}(\theta,0)\\&\quad\cdot R_z(-\phi)\\&=R_{\text{xy}}(\theta,\phi)\end{aligned}$

**认识论状态 (Status)：**
`LEAN ✓`（三脉冲迹界）/ `文献结果`（虚拟 $Z$ 恒等式，第 11 章）

**旋量 $4\pi$ 周期性与万向节死锁**<br/>(Spinor $4\pi$ Periodicity & Gimbal Lock)

**本书几何直觉语言 (Geometric Intuition Term)：**
**$S^3 \to \mathrm{SO}(3)$ 二重覆盖与毛球定理 $\chi(S^2) = 2$**：二维球面必有坐标奇点，升维至平行化 $S^3$（$\chi(S^3)=0$）方能消解

**Lean 4 形式对象 / 锁定声明 GID：**
[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$R(2\pi) = -1 \in S^3,\quad R(4\pi) = +1$（形式化的是圆周平方覆盖 $z \mapsto z^2$）

**认识论状态 (Status)：**
`LEAN ✓`（圆周二重覆盖）/ `文献结果`（$S^3 \to \mathrm{SO}(3)$ 二重覆盖、毛球定理与万向节死锁）（第 5、10 章）

**贝尔—CHSH 不等式与齐雷尔森界**<br/>(Bell–CHSH & Tsirelson Bound)

**本书几何直觉语言 (Geometric Intuition Term)：**
**经典 $\ell_1$ 八面体多面体（$\le 2$）vs. 量子 $\ell_2$ 勾股圆球（$2\sqrt{2}$）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest)<br/>[`bell_value_le`](lean:D5/S3/QuantumBounds/PeritoTsirelson.bell_value_le)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\begin{aligned}\mathcal S_{\text{classical}}&\le2,\\\mathcal S_{\text{quantum}}&\le2\sqrt2\end{aligned}$（量子上界可达）

**认识论状态 (Status)：**
`LEAN ✓`（第 13 章）

**稳定子码与克利福德群编织**<br/>(Stabilizer Codes & Clifford Braiding)

**本书几何直觉语言 (Geometric Intuition Term)：**
**有限域 $\mathbb{F}_2^{2n}$ 上的泡利词乘法与杨—巴克斯特自分配架（Rack）编织**

**Lean 4 形式对象 / 锁定声明 GID：**
[`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul), [`crossing_yang_baxter`](lean:D5/S0/Certificates/Quandles/BraidColoringTransport.crossing_yang_baxter)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$P_1 P_2 = P_2 P_1 \iff x_1 z_2 \oplus z_1 x_2 = 0$

**认识论状态 (Status)：**
`LEAN ✓`（第 14 章、铸器与圣殿 · 把矩阵还原为异或）

**Grover 搜索 / QFT / QSVT / 量子漫步**<br/>(Grover / QFT / QSVT / Szegedy Walk)

**本书几何直觉语言 (Geometric Intuition Term)：**
**二维子空间一致算子旋转、有限泊松求和与切比雪夫多项式谱变换**

**Lean 4 形式对象 / 锁定声明 GID：**
[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation), [`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$R_{\psi}\,R_{\perp} = \operatorname{Rot}(2\theta),\quad T_n(\cos\theta) = \cos(n\theta)$

**认识论状态 (Status)：**
`LEAN ✓`（二维子空间一致算子旋转、有限泊松求和）/ `文献结果`（切比雪夫恒等式、QSVT 与 Szegedy 漫步）（第 15–16 章）

**Solovay–Kitaev 门集编译定理**<br/>(Solovay–Kitaev Compilation)

**本书几何直觉语言 (Geometric Intuition Term)：**
**双轴有限旋转字、范数一迹递推与群换位子 $ABA^{-1}B^{-1}$ 面积螺旋**

**Lean 4 形式对象 / 锁定声明 GID：**
[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`trace_recurrence`](lean:D5/S1/Recurrence/NormOneTraceAddition.trace_recurrence)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\operatorname{Tr}(U^{n+1}) = \operatorname{Tr}(U)\operatorname{Tr}(U^n) - \operatorname{Tr}(U^{n-1})$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果`（第 16 章）

**洛伦兹变换与博戈留波夫变换**<br/>(Lorentz Boost & Bogoliubov Transform)

**本书几何直觉语言 (Geometric Intuition Term)：**
**闵可夫斯基双曲旋量（$\cosh\eta - \gamma_0\gamma_1\sinh\eta$）与零光锥刚性**

**Lean 4 形式对象 / 锁定声明 GID：**
[`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\cosh^2\eta-\sinh^2\eta=1$；实二次型 $Q$ 在 $\mathbb{R}\times\mathbb{R}^d$ 上：$\begin{aligned}&(\forall v,\\&\eta(v,v)=0\\&\implies Q(v)=0)\\&\implies\exists c\in\mathbb{R},\\&Q=c\,\eta\end{aligned}$

**认识论状态 (Status)：**
`LEAN ✓`（第 17 章）

**狄拉克旋量与阿贝尔规范场联络**<br/>(Dirac Spinor & Gauge Connection)

**本书几何直觉语言 (Geometric Intuition Term)：**
**左右手外尔分量之字形（Zitterbewegung）跃迁与生成树余切环路和乐（Holonomy）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$A(E) / \mathcal{G}_R \cong (U(1))^{|E \setminus T|} \times (U(1))^{|R| - 1}$

**认识论状态 (Status)：**
`LEAN ✓`（第 18 章）

**全息纠缠熵与 MERA 张量网络**<br/>(Holographic Entanglement & MERA)

**本书几何直觉语言 (Geometric Intuition Term)：**
**离散桥图量子最大流等于最小割定理与分片多面体容量锥**

**Lean 4 形式对象 / 锁定声明 GID：**
[`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
对 $\begin{aligned}&a,b,c,d\in\mathbb N,\\&0<a\le b,\ 0<c\le d,\\&a^2+b^2\le3ab,\\&c^2+d^2\le3cd:\\&\operatorname{QMaxFlow}(a,b,c,d)\\&=\min(3ac,\min(ad,bc))\end{aligned}$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果`（第 19 章）

**量子电路复杂度、CV 猜想与 ER=EPR**<br/>(Circuit Complexity, CV & ER=EPR)

**本书几何直觉语言 (Geometric Intuition Term)：**
**可积电路分割最小深度 $\lfloor N/(\kappa+1)\rfloor + 1$、奇偶相位 CNOT 下界与黑洞内部体积猜想**

**Lean 4 形式对象 / 锁定声明 GID：**
[`result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
对 $\begin{aligned}&N,\kappa\in\mathbb N,\\&1\le\kappa,\ 2\kappa\le N:\\&\operatorname{minDepth}(N,\kappa)\\&=\lfloor N/(\kappa+1)\rfloor+1\end{aligned}$

**认识论状态 (Status)：**
`LEAN ✓` / `OPEN`（第 20 章）

**康托尔对角线、停机问题与哥德尔不完备**<br/>(Cantor Diagonal, Halting & Gödel)

**本书几何直觉语言 (Geometric Intuition Term)：**
**完备语义对角线拓扑逃逸：分离亏损非空、不连续性与严格拓扑细化**

**Lean 4 形式对象 / 锁定声明 GID：**
[`complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\operatorname{separationDeficit} \neq \emptyset,\quad \tau_0 \subsetneq \tau_{\mathrm{diag}}$

**认识论状态 (Status)：**
`LEAN ✓`（第 21 章）

**黎曼 $\zeta(s)$、欧拉乘积与临界线**<br/>(Riemann Zeta, Euler Product & Critical Line)

**本书几何直觉语言 (Geometric Intuition Term)：**
**素数无穷维正交坐标系 $\bigoplus_p \mathbb{Z}\mathbf{e}_p$、狄利克雷级数等于欧拉乘积与临界轴 $\sigma = 1/2$**

**Lean 4 形式对象 / 锁定声明 GID：**
[`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\sum_{n=1}^\infty n^{-s} = \prod_p (1 - p^{-s})^{-1}\quad (\operatorname{Re}(s) > 1)$

**认识论状态 (Status)：**
`LEAN ✓` / `OPEN`（第 22 章）

**希尔伯特第十问题 $H_{10}(\mathbb{Q})$ 与四元数范数**<br/>(Hilbert's 10th over $\mathbb{Q}$ & Quaternion Norm)

**本书几何直觉语言 (Geometric Intuition Term)：**
**艾森斯坦交叉二次范数型簇 $Q_t$、黄金整数佩尔恒等式与四元数范数乘法锁**

**Lean 4 形式对象 / 锁定声明 GID：**
[`Qform_range_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm), [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$(2a+b)^2 - 5b^2 = 4(a^2 + ab - b^2)$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `OPEN`（$H_{10}(\mathbb{Q})$）（第 23 章）

**不动点定理与自指映射 $\psi = \psi(\psi)$**<br/>(Fixed-Point Theorems & Self-Reference)

**本书几何直觉语言 (Geometric Intuition Term)：**
**有限单调收缩有限步稳定、黄金不动点 $\varphi$、Dottie 实根 $\cos\theta^* = \theta^*$ 与语境分岔**

**Lean 4 形式对象 / 锁定声明 GID：**
[`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\exists N \le |S_0|,\; \forall n \ge N,\; S_n = S_N$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `OPEN`（第 24 章）

**三维克利福德代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$**<br/>(3D Clifford Geometric Algebra)

**本书几何直觉语言 (Geometric Intuition Term)：**
**3 比特掩码异或（XOR）与逆序偶奇符号驱动的 8 维基片引擎 `Cl3` 及外尔星代数**

**Lean 4 形式对象 / 锁定声明 GID：**
[`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star), [`B_formula_core`](lean:D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$ZX = -XZ,\quad e_a e_b = (-1)^{\operatorname{inv}(a,b)} e_{a \oplus b}$

**认识论状态 (Status)：**
`LEAN ✓`（Weyl 星代数与 Bloch 展开）/ `文献结果`、数值实现（XOR 基片引擎，铸器与圣殿 · 把矩阵还原为异或、附录 B）

**ZYZ 欧拉角分解与旋量级联**<br/>(ZYZ Euler Decomposition)

**本书几何直觉语言 (Geometric Intuition Term)：**
**单比特旋量三因子分解 $R_z(\alpha)R_y(\beta)R_z(\gamma)$ 与双轴有限旋转字合成**

**Lean 4 形式对象 / 锁定声明 GID：**
[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$R_z(\alpha)R_y(0)R_z(\gamma) = R_z(\alpha + \gamma)$

**认识论状态 (Status)：**
`LEAN ✓`（双轴有限旋转字）/ `文献结果`、数值实现（ZYZ 恒等式与编译，第 9、16 章、铸器与圣殿 · 单量子比特旋转器编译、附录 B）

**吕德斯（Lüders）状态更新与有限记录阻碍**<br/>(Lüders Rule & Finite-Record Obstruction)

**本书几何直觉语言 (Geometric Intuition Term)：**
**测量记录条件化后验态合法性与未读记录不动点判据**

**Lean 4 形式对象 / 锁定声明 GID：**
[`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\sum_i p_i \rho_i = \Phi(\rho),\quad p_i\ne0\implies\operatorname{Tr}(\rho_i) = 1$

**认识论状态 (Status)：**
`LEAN ✓`（第 3 章、铸器与圣殿 · 走进 Lean 4 公理圣殿（下））
