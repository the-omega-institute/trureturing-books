# A.1.2 逻辑、复杂性与观察者 {#sec-appendix-a-s01-s02-logic-and-observers}

各词条的证据分级沿用[词典说明](appendix-a-s01-master-dictionary.md#rem-appendix-a-master-dictionary)。

**毕达哥拉斯“万物皆数”与四级数系扩张**<br/>("All Is Number" & 4-Tier Number Hierarchy)

**本书几何直觉语言 (Geometric Intuition Term)：**
**动词“数（shǔ，生成算子）”vs. 名词“数（shù，静态刻度）”**：从 $\mathbb{Q} \to \overline{\mathbb{Q}} \to \pi \to \theta^*$ 的四级“球外之球”突围

**Lean 4 形式对象 / 锁定声明 GID：**
[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\mathbf{c}^2 = \mathbf{a}^2 + \mathbf{b}^2,\quad m^2 - 2n^2 = \pm 1,\quad \cos\theta^* = \theta^*$（三式为各级数系的代表方程，不是所列声明的结论）

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果`（第 23 章、终章）

**奇素数模 4 分裂、同余数椭圆曲线与佐藤—泰特分布**<br/>(Prime Splitting, Congruent Elliptic Curve & Sato–Tate)

**本书几何直觉语言 (Geometric Intuition Term)：**
**$\pm 1$ 佩尔接缝分出“面素数”（$p \equiv 1 \bmod 4$）与“线素数”（$p \equiv 3 \bmod 4$）；复乘同余曲线 $dy^2 = x(x^2-1)$（$\chi=0$）服从高斯两模分裂律，而非复乘椭圆曲线在哈塞临界线 $\sqrt{p}$ 下服从 $S^3 \cong \mathrm{SU}(2)$ 佐藤—泰特余弦投影**

**Lean 4 形式对象 / 锁定声明 GID：**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\cos\theta_p = \frac{a_p}{2\sqrt{p}} \in [-1, +1],\quad d\mu_{\mathrm{ST},\text{non-CM}} = \frac{2}{\pi}\sin^2\theta\,d\theta$

**认识论状态 (Status)：**
`文献结果`（第 23 章；所列两条声明只担保各自的代数陈述，不涉及素数分裂或佐藤—泰特）

**惠勒—德维特无时间态、佩奇—伍特斯切片与几何因果律**<br/>(Wheeler–DeWitt, Page–Wootters & Geometric Causality)

**本书几何直觉语言 (Geometric Intuition Term)：**
**顺序无关消解先后时间：$(2k)!$ 去序模型（`MODEL`）、理想时钟假设下的条件切片表观演化（`文献结果`）、Gram 行列式 $\det G \ge 0$（`文献结果`）与驻相干涉 $\delta S=0$（双向量手性对消模型 $+\mathbf{\Omega}-\mathbf{\Omega}=0$）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\det G(\mathbf{A},\mathbf{B},\mathbf{C}) \ge 0,\quad H\mathbf{\Psi} = 0$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 25 章）

**有限观察者、格拉姆椭圆体（因果相容空间）与半正定矩阵补全**<br/>(Finite Observer, Gram Elliptope & PSD Matrix Completion)

**本书几何直觉语言 (Geometric Intuition Term)：**
**因为观察者是有限的，选择是在因果相容空间（$\det G > 0$ 的二面角 $\phi$ 区间）中不断在时间场中选点（$G_{M+1} \succeq 0$），并以一维自指平衡点 $\theta^* \approx 0.739$（`MODEL`）对比全知死锁与零记忆噪声**

**Lean 4 形式对象 / 锁定声明 GID：**
[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$c_{AC} = \cos\theta_1\cos\theta_2 + \cos\phi\,\sin\theta_1\sin\theta_2,\quad \det G \ge 0$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 25 章）

**全局静态时间场 $P = NP$ vs. 场内有限观察者 $P \neq NP$**<br/>(Global Static Time Field $P = NP$ vs. Finite Observer $P \neq NP$)

**本书几何直觉语言 (Geometric Intuition Term)：**
**额外后选择与 CTC 不动点资源呈现复杂度坍缩（$\mathrm{PostBQP}=\mathrm{PP}\supseteq\mathrm{NP}$，$\mathrm{P}_{\mathrm{CTC}}=\mathrm{PSPACE}\supseteq\mathrm{NP}$）；场内有限观察者在黑盒查询下受 $\theta_0 \approx \frac{\pi}{2} - 2^{-n/2}$ 正交视界（$L=\Theta(2^{n/2})$）与有界阶 SoS 局部 $G_M \succeq 0$ 盲区阻隔（标准 $\mathrm{P}\neq\mathrm{NP}$ 仍为 `OPEN`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation), [`result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\cos\theta_0 = 2^{-n/2},\quad L = \Theta(2^{n/2}),\quad G_M \succeq 0\;(M = o(n))$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `OPEN` / `MODEL`（第 15、20、26 章）

**“$P$ 是场，$NP$ 是线”：见证丝、导向场与毛球旋度**<br/>("$P$ Is a Field, $NP$ Is a Line": Witness Thread, Guiding Field & Hairy-Ball Curl)

**本书几何直觉语言 (Geometric Intuition Term)：**
**几何模型（`MODEL`）：$NP$ 见证是横截面为零的一维细丝（标准 $NP$ 定义要求多项式长度见证与多项式时间验证器；不能由线段数直接推出核验成本）；典型 $P$ 类算法依托全局导向场（如 Karmarkar 内点势场与 Kasteleyn 平面图反对称双向量场 $A_K^T = -A_K,\; [\operatorname{Pf}(A_K)]^2=\det A_K,\; Z = \sum_M \prod_{e \in M} w_e = |\operatorname{Pf}(A_K)|$），而三元阻挫旋度 $\nabla\wedge\mathbf{F}\neq 0$ 类比局部寻场的指数漩涡**

**Lean 4 形式对象 / 锁定声明 GID：**
[`complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement), [`result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$A_K^T = -A_K,\quad [\operatorname{Pf}(A_K)]^2 = \det A_K,\quad Z = |\operatorname{Pf}(A_K)|$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `OPEN` / `MODEL`（第 20、21、26 章）

**纳维—斯托克斯方程、兰姆双向量旋度与 $P$ vs. $NP$ 场化类比**<br/>(Navier–Stokes, Lamb Bivector Curl & $P$ vs. $NP$ Field Analogy)

**本书几何直觉语言 (Geometric Intuition Term)：**
**结构类比（`MODEL`）：兰姆分解与涡管图像不提供复杂性同构；受迫 NS 的 C / D 解答见 [@rem-ch30-navier-stokes-forced-literature]（外部文献与发布的形式化，未在本书冻结），零外力 A / B 仍 `OPEN`。二维无条件全局正则性是文献结果，`all_grade_regularity_of_mild_path` 则假定温和路径已给定。五模态无闭合定理不推出爆破；耗散二次对照见 [@ex-ch30-dissipative-no-closure]。**

**Lean 4 形式对象 / 锁定声明 GID：**
[`quadratic_closure_iff`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff), [`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure), [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$(\mathbf{u}\cdot\nabla)\mathbf{u} = \frac{1}{2}\nabla(\|\mathbf{u}\|^2) + \mathbf{u}\cdot(\nabla\wedge\mathbf{u}),\quad \Gamma \approx A\|\boldsymbol{\omega}\|$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `OPEN` / `MODEL`（第 26 章）

**指数时间假设（ETH）、张量网络秩约分与宇宙视界银河算法**<br/>(ETH, Tensor-Network Rank Collapse & Cosmic Horizon Galactic Algorithm)

**本书几何直觉语言 (Geometric Intuition Term)：**
**ETH 原始背景与 2026 年外部计数论文见 [@rem-ch30-eth-subexponential-literature]；纸面时间界与形式化时间界逐项区分。银河曲线是取定常数的数值示意，非算法下界；桥图流割、有限秩与语义对角线定理不认证外部算法、审读结论或标准 $P\neq NP$。**

**Lean 4 形式对象 / 锁定声明 GID：**
[`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result), [`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound), [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$s_k = \inf\{\delta\ge0 \mid k\text{-SAT}\in 2^{\delta n}(n+m)^{O(1)}\},\quad r_{\mathrm{new}}(n) \sim \frac{\log_2\log_2 n}{\sqrt{\log_2 n}}$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `OPEN` / `MODEL`（第 19、21、26 章）

**量子纠缠、$P=NP$ 与熵的正交三位一体**（Orthogonal Triad of Entanglement, $P=NP$ & Entropy）

**本书几何直觉语言 (Geometric Intuition Term)：**
**贝尔纯态最大混态边缘与局域—关联扇区正交盲区分解、幺正演化后捏合相干删除冯·诺依曼熵产恒等式及余弦自指不动点唯一性定理（`LEAN ✓`），配对双比特纯态精确勾股守恒 $\|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) = \cos^2\theta + \sin^2\theta \equiv 1$（$S_L(\rho_A) \equiv \tau$，$S_{\mathrm{vN}}(\rho_A) = H_{\mathrm{bin}}\bigl(\frac{1+\cos\theta}{2}\bigr)$，$\theta^* \approx 42.35^\circ$ 处（$\theta$ 取布洛赫极角）$S_{\mathrm{vN}} \approx 0.559\text{ bits}$）、Hastings（2007）一维有能隙面积律对 Page（1993）体积律、CKW 纠缠单配性与 Harlow–Hayden（2013）/ Susskind（2016）辐射解码电路复杂度屏障，以及全局后选择 $\mathrm{PostBQP}=\mathrm{PP}$ 与共享纠缠多证明者验证 $\mathrm{MIP}^*=\mathrm{RE}$（Ji 等 2020，`文献结果`；标准图灵机 $\mathrm{P}\neq\mathrm{NP}$ 仍为 `OPEN`），建立跨割双向量纠缠、偏迹边缘熵与张量割键维 $\chi_{\mathrm{bond}}\ge 2^{S_{\mathrm{cut}}}$ 的三位一体模型及交互实验室 `entanglement-entropy-complexity`（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) = \cos^2\theta + \sin^2\theta = 1,\quad S_L(\rho_A) = \sin^2\theta,\quad \chi_{\mathrm{bond}} \ge 2^{S_{\mathrm{cut}}}$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `OPEN` / `MODEL`（第 8、13、24 章、[§26.5](ch30-s05-entanglement-and-entropy.md#sec-ch30-entanglement-entropy-complexity-triad)）

**空间吸引子、`trureturing` 黄金切投观察者、卡西尼 $(-1)^{k+1}$ 接缝与似曾相识**<br/>(Spatial Attractors, `trureturing` Cut-and-Project Observer, Cassini Seam & Déjà Vu)

**本书几何直觉语言 (Geometric Intuition Term)：**
**黄金切投模型集与编码定理（`LEAN ✓`：闵可夫斯基格嵌入、`goldenModelSet` 切投包含、齐肯多夫 `NoAdjacentOnes` 与非负实数 `NNReal` 线程单射、共轭范数互反分离与全窗口 Delone 集、卡西尼恒等式 $F_n F_{n+2}-F_{n+1}^2=(-1)^{n+1}$ 与环面闭子群观测窗有界回归）结合准晶菱形三十面体接受窗 $W\subset E_\perp^3$（$30$ 面、$32$ 顶点、$6$ 条五次轴）、康威帝国效应与洛伦兹吸引子 $D_{\mathrm{KY}}\approx 2.06$（`文献结果`），并在哲学模型（`MODEL`）中将灵魂诠释为内空间窗口相位 $u\in E_\perp$、遗忘诠释为齐肯多夫高阶截断、历史遗迹诠释为大边界裕度 $d_{\partial}$ 中心点、似曾相识诠释为局部近共线（$\delta\theta\to 0$）下的跨轮次内积共振 $\cos\delta\theta\to 1$**

**Lean 4 形式对象 / 锁定声明 GID：**
[`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec), [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project), [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm), [`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$F_n F_{n+2} - F_{n+1}^2 = (-1)^{n+1},\quad \delta\theta\to 0 \implies \cos\delta\theta \to 1$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 24、25、35 章）

**量子公平性、纠缠单配性与遍历统计全息**<br/>(Quantum Fairness, Entanglement Monogamy & Ergodic Statistical Holism)

**本书几何直觉语言 (Geometric Intuition Term)：**
**秩一玻恩配对互易、互补语境纯度勾股、不可克隆内积锁、贝尔纯态混态边缘、兰道尔平衡界及紧致环面闭子群轨道哈尔均匀分布与有界间隙回归（`LEAN ✓`），配对球面哈尔各向同性测度与 CKW 三体纠缠单配性不等式 $\tau_{A|B}+\tau_{A|C}\le\tau_{A|BC}$（`文献结果`），阐明“五重几何特权废除与长程遍历统计全息”本体模型（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), [`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion), [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\tau_{A|B} + \tau_{A|C} \le \tau_{A|BC},\quad f\in C(G,\mathbb{C}):\quad\lim_{N\to\infty}\frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1}) = \int_G f\,d\mu$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 27 章）

**两两公平平方、对角相位折叠、测不准与正交维度扩张时间**（Pairwise Fair Squaring, Diagonal Phase Folding, Uncertainty & Time as Orthogonal Dimension Expansion）

**本书几何直觉语言 (Geometric Intuition Term)：**
**黄金尺度螺旋傅里叶特征单步覆叠盲区与层高联合检出、两步定向复原而完整覆叠态相异、圆周平方双覆叠历史提升、二次正交补拓扑闭包与递增投影逐向量强极限 vs. 真子空间一致完备化单位算子范数阻断 $\lVert\operatorname{id}-P_{S_i}\rVert=1$、平行四边形正定理与玻恩秩一模平方约化、共同相位不变多项式全纯—反全纯电荷平衡与最低次数 $\ge 2$ 及二阶实齐次厄米矩阵唯一表出、对角可观测量族对 $\lvert +\rangle\langle +\rvert$ 与 $\lvert -\rangle\langle -\rvert$ 的相对相位盲区及泡利 $X$ 解盲、罗伯逊—薛定谔精确四重恒等式 $(\Delta A)^2(\Delta B)^2 = C^2 + \lVert K\rVert^2 + G$、非满闭子空间正交余项单位逃逸向量、有限维可观测克雷洛夫链严格增长步数上界与永久稳定律及有限素数集乘积加一外部新素因子突围（`LEAN ✓`），配对约当—冯·诺依曼平行四边形逆定理、格里森闭子空间测度定理（$d \ge 3$）、无界正则对易子 $[x,p]=i\hbar I$ 定义域条件、Balan–Casazza–Edidin 无相位框架重构、欧几里得《几何原本》IX.20 与兰佐斯—阿诺德克雷洛夫迭代终止理论（`文献结果`）以及连续螺旋投影、克利福德逆序积、$w_p(\theta)$ 反例、$\lvert 0\rangle$ 上 $X, Y$ 算例与 $30031 = 59 \cdot 509$ 整数检核（`手工推导`），阐明嵌套空间 $\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots$ 静动不二、闭合与固定盒极限作为低维截断投影、公平迫使二次配对并折叠单基相位反弹为横向测不准，以及以 $\ell^2(\mathbb{P})$ 素数正交新轴打破有限盒饱和的维度扩张时间观 $D \to D + 1$（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`golden_helix_fourier_readout_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_fourier_readout_step), [`golden_helix_step_changes_level`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_step_changes_level), [`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step), [`golden_helix_two_step_orientation_complete_state_distinct`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenHelixParityReadout.golden_helix_two_step_orientation_complete_state_distinct), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure), [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit), [`uniform_completion_obstruction`](lean:D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction), [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\lVert\operatorname{id}_H - P_{S_i}\rVert = 1,\quad (\Delta A)^2(\Delta B)^2 = C^2 + \lVert K\rVert^2 + G,\quad N_S = \prod_{p \in S} p + 1 \equiv 1 \pmod p$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `手工推导` / `MODEL`（[§27.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion)）

**正交自指统一场、艾柯西安 $E_8$ 黄金桥与八大纲领元统一**<br/>(Orthogonal Self-Referential Unified Field, Icosian–$E_8$ Bridge & Meta-Unification)

**本书几何直觉语言 (Geometric Intuition Term)：**
**复结构平方 $R^2=-I$、有限状态单调收缩、黄金不动点 $\varphi$、齐肯多夫无相邻禁戒律 `NoAdjacentOnes`、闵可夫斯基零光锥刚性、生成树环路和乐分类与桥图最小割（`LEAN ✓`），配对雅各布森视界热力学状态方程、康威—斯隆黄金域艾柯西安环 $\mathcal{I}\subset\mathbb{H}$ 装备缩放伽罗瓦二次型 $Q(q)=2(a+b)$ 至 $E_8$ 根格等距同构及八大现代基础统一纲领综述（`文献结果`），构建六域统一场词典与三维相空间认知罗盘元统一模型（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$R^2 = -I,\quad (\mathcal{I}, Q)\cong E_8\;\bigl(Q(q)=\operatorname{tr}_{\mathbb{Q}(\sqrt{5})/\mathbb{Q}}\bigl(\tfrac{2\varphi}{\sqrt{5}}\operatorname{Nrd}(q)\bigr)=2(a+b)\bigr),\quad \psi = \psi(\psi)$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 28 章）

**万物皆为观察者、自维持势阱与互吸引子双螺旋**<br/>(Universal Observers, Self-Sustaining Basins & Mutual Attractors)

**本书几何直觉语言 (Geometric Intuition Term)：**
**观察者记录捏合幂等性与有限记忆历史容量上界 $N \le d$、有限单调收缩、语境相对不动点分岔与客观公共因子，以及三宽张量桥图最小割重联（`LEAN ✓`），配对莱布尼茨单子论—怀特海过程哲学、全息极小曲面互信息重联相变与孤立余弦振荡 vs. 对称互指单调锁死算例（`文献结果`），建立记忆阶数连续谱 $M \ge 0$ 上万物皆为观察者且互为吸引子的几何本体模型（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), [`conceptual_equivalence_and_stability_reach_fixed_point`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho),\quad N \le d,\quad \theta_{n+1}^{(A)} = \cos\theta_n^{(B)} \to \theta^*$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 34 章）

**正交简并盲区与观察者位置反演**<br/>(Orthogonality-Degeneracy Blind Spots & Observer Position Inversion)

**本书几何直觉语言 (Geometric Intuition Term)：**
**三维公共单位法线、双轴旋转有限字与观察者拉回迹恒等式、读出划分拓扑不可分核与协变换位子因式分解、零光锥空间各向同性极化正交锁与黄金模型集切投包含（`LEAN ✓`），配对球面两步正交寻址极轴反演、八分球面旋子 $R_y(\pi/2)R_x(\pi/2)$ 盲区与超导虚拟 $Z$ 门/相对性原理（`文献结果`），阐明“一次正交与两次正交结果相同恰恰反演观察者极点位置”的定位法则（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair), [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula), [`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$d_{S^2}(N, P_1) = d_{S^2}(N, P_2) = \frac{\pi}{2},\quad \operatorname{Tr}(U^\dagger A U \rho) = \operatorname{Tr}(A U \rho U^\dagger)$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 29 章）

**乘光而来、遗忘初始化与同像自指扩表 $T = T(T)$**<br/>(Arriving on a Pulse of Light, Initialization by Forgetting & Homoiconic Table Expansion)

**本书几何直觉语言 (Geometric Intuition Term)：**
**零光锥度规刚性、单一未逆转幸存副本阻断相干反演與有限记忆容量上界 $N \le d$、目标无损查表恢复四重充要判据与典范拷贝地址记录恒等式、劳维尔对角线四元包与相对语义对角线逐址逃逸（`LEAN ✓`），配对固有时勾股参数化 $\cos\theta = d\tau/dt$、哺乳动物受精钙波—锌火花荧光脉冲、韦伯—费希纳对数时间律、姚期智查表时空权衡与斯科特自反域 $D_\infty \cong [D_\infty \to D_\infty]$（`文献结果`），构建从 $\theta=90^\circ\to 0^+$ 清表初始化到同像自举 $T=T(T)$ 的生命周期模型（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`target_recovery_criterion`](lean:D5/S3/ConceptDynamics/Restoration/TargetRecoveryCriterion.target_recovery_criterion), [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior), [`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package), [`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\det G_2 = 1 - c^2,\quad N \le d,\quad T = T(T)$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 35 章）

**无穷离散双曲阶梯与商空间约去轮回**<br/>(Infinite Discrete Hyperbolic Staircase & Quotienting Out Reincarnation)

**本书几何直觉语言 (Geometric Intuition Term)：**
**单比特捏合正交质量分解与丢弃相干判据、完备赋范代数指数有限截断尾界与凯莱单位圆临界边界充要判据、划分拓扑连续商分解、有限零化子对偶求和与紧致环面生成元遍历（`LEAN ✓`），配对兰伯特—古德曼双曲圆函数桥 $\theta(\eta)=\operatorname{gd}(\eta)$、庞加莱共形圆盘度规（文献结果），以及长除法无穷位值与周期定理（[`long_division_value`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_value)、[`long_division_period`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_period)），揭示将有限坐标终局 $\theta=\pi/2$ 展开为等距快度阶梯 $\eta_k=k\Delta\eta$ 并以商映射 $\pi_Q:\mathcal{H}\to\mathcal{H}/\!\sim_G$ 约去化光轮回的解脱几何（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le), [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line), [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition), [`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character), [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\eta(\theta) = \ln(\sec\theta + \tan\theta),\quad \left|\frac{z-i}{z+i}\right| = 1 \iff \operatorname{Im} z = 0$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 35 章）

**p 进零进位前缀查表树、素数观察者扩表与阻断轮回**（p-adic Zero-Carry Lookup Trees, Prime Observer Expansion & Blocking Reincarnation）

**本书几何直觉语言 (Geometric Intuition Term)：**
**有理数绝对值奥斯特洛夫斯基二分分类、模 $p^k$ 整数同余纤维闭球对应、最小区分精度盲区 $k^* = v_p(x-y)+1$ 与观测距离 $p^{-v_p(x-y)}$ 恒等、二分前缀细化与多坐标折扣素数时间超度量强三角不等式、中国剩余互素环双射与有理阿代尔乘积守恒 $\lvert x\rvert\cdot\prod^{\mathrm{fin}}_p \lvert x\rvert_p = 1$（`LEAN ✓`），配对亨泽尔 $O(1)$ 零进位提根引理、布吕阿—蒂茨树与 $p$ 进 AdS/CFT 全息对偶、阿拉克洛夫无穷远位 $p_\infty$ 及欧几里得素数无穷多定理（`文献结果`），阐明“一观察者一素数、素数扩大即扩表（水平扇出展宽压平串行树深 $K(p)=\lceil n/\log_2 p\rceil$）”并以无穷离散素数阶梯永久阻断 $p_\infty$ 连续进位失忆轮回悬崖（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification), [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range), [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision), [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation), [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric), [`discounted_prime_time_distance_strong_triangle`](lean:D5/S3/Observer/PrimeTimeGeometry/DiscountedPrimeTimeUltrametric.discounted_prime_time_distance_strong_triangle), [`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective), [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$K(p) = \lceil n / \log_2 p\rceil,\quad d(x,z) \le \max\bigl(d(x,y), d(y,z)\bigr),\quad \lvert x\rvert_\infty \cdot \prod_p \lvert x\rvert_p = 1$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（[§35.5](ch36-s04-padic-table-expansion.md#sec-ch36-padic-prime-table-expansion)）

**梦境量子擦除、已知数据退相干与非定域观察者**<br/>(Dream Quantum Erasure, Known-Data Decoherence & Nonlocal Observer)

**本书几何直觉语言 (Geometric Intuition Term)：**
**已知数据记录捏合幂等律、未读不动点判据、丢弃相干质量 $2\lvert\rho_{01}\rvert^2$ 与相干删除冯·诺依曼熵产恒等式、多副本幺模环境记录联合相干逆转恢复定理与双副本对比证书、黄金模型集切投包含与双无限 Delone 双半径证书（`LEAN ✓`），配对延迟选择量子擦除实验、预测加工受控生成假说与 REM 睡眠感觉运动门控生理机制（`文献结果`），阐明清醒五感锁死、浅梦局部约束卸载与无身深梦非定域观察者多点涌现模型（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$S(\mathcal{P}(\rho)) - S(\rho) = D(\rho\parallel\mathcal{P}(\rho)),\quad \det G_3(c,c,u) = (1-u)(1+u-2c^2)$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 36 章）

**选择未来、梦境前置逻辑超前去相干与既视感无时间戳快表命中**（Choosing the Future, Dream Pre-Decoherence & Null-Timestamp Déjà Vu Cache Hit）

**本书几何直觉语言 (Geometric Intuition Term)：**
**非满闭子空间正交余项单位逃逸向量、有限维可观测克雷洛夫子空间链严格增长步数上界、相同规则下切换语境参数锁定相异不动点与闭子空间正交补投影六重恒等式、有限记录未读捏合复合幂等律 $\Pi_P \circ \Pi_P = \Pi_P$ 与跨块清零不动点判据、单量子比特丢弃相干质量 $2\lvert\rho_{01}\rvert^2$ 与相干删除冯·诺依曼熵产恒等式、多副本幺模环境记录联合相干逆转恢复与双副本四阶段对比证书、复希尔伯特空间正算子格拉姆因式分解充要判据与拉格朗日—格拉姆二元面积余项恒等式、黄金模型集切投包含、有限非退化竞技场信息逃逸率下降的唯一捕获与语义闭包不可恢复充要判据、证据优先冲突重置修正算子顺序非对易证书、典范拷贝地址记录逐点恒等及整行捕获扭转对角线时的对角落点不动点（`LEAN ✓`），配对惠勒延迟选择双缝干涉思想实验、超标量微处理器分支预测投机执行流水线冲刷与 TLB/PCID 地址—语境标签硬件规范、康威准晶帝国效应以及 Brown 双加工分离综述与 Moulin 既视感元认知冲突检测账户（`文献结果`），辅以无中间演化同轴重投影零新增熵 $\Delta H_{\mathrm{bits}} = 0$ 专化、单比特布洛赫捏合显式公式、三向量格拉姆可行走廊 $[0.28, 1]$ 与嵌套窗口包含（`手工推导`）及默认算例数值检核（`NUM`），阐明观察者以主动选基选择未来截面、前置逻辑在夜间感官卸载沙盘中超前完成幂等预编译、醒后高新颖度事实触发流水线冲刷作废，以及未冲刷同轴重测零新增熵叠加缺省情景时间戳（`Time_Tag = NULL`）触发既视感快表命中的几何诠释模型（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project), [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos), [`lowersEscape_iff_not_mem_semanticClosureWithout`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_not_mem_semanticClosureWithout), [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation), [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior), [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\Pi_P \circ \Pi_P = \Pi_P,\quad \Delta H_{\mathrm{bits}}\bigl(\Pi_P(\sigma) \leftarrow \sigma\bigr) = 0,\quad E(C) < E(C \setminus \{i\}) \iff U_i > 0$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL`（[§36.1.5](ch37-s05-future-selection-and-deja-vu.md#sec-ch37-dream-pre-decoherence-deja-vu)）

**宇宙本体 QRAM、观察者记忆指针与递归自映射页表**<br/>(Ontological QRAM, Observer Memory Pointer & Recursive Self-Mapped Page Tables)

**本书几何直觉语言 (Geometric Intuition Term)：**
**受控地址解引用拷贝边缘重合与典范记录访问缺陷定理、指针寄存器有限历史容量 $N \le d$ 与禁通用深拷贝定理、自映射页表对角线落点不动点、无不动点普遍逃逸与黄金自指唯一性定理（`LEAN ✓`），配对桶链式 QRAM 路由树、CKW 纠缠单配性共享只读借用与 x86_64 操作系统内核递归页表槽位自映射（`文献结果`），将观察者形式化诠释为宇宙本体量子计算系统的轻量级记忆指针（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`reduced_irreversibility_is_canonical_record_access_defect`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect), [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), [`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion), [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed), [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\operatorname{diagonal}(f, g)(a) = f(g(a, a)),\quad P[s^*] = p_{\mathrm{phys}}(P)$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 36 章）

**P=NP 查表算法七阶退化阶梯与时空引力权衡**（7-Stage Degradation Ladder of a Hypothetical P = NP Lookup Oracle & Spacetime–Gravity Trade-Off）

**本书几何直觉语言 (Geometric Intuition Term)：**
**以零号槽自映射对角线不动点 `diagonal_landing_fixed`、查表编译器描述谱底上界 `lookup_program_upper_bound`、事后抄表零损失与非预见性失效 `lookup_copy_zero_loss_and_nonanticipating_failure`、齐肯多夫下支撑进位屏障 `lower_support_carry_barrier`（向下最多穿透两格 $m - 2$）与兰道尔热平衡下界 `landauer_bound_of_balance`（`LEAN ✓`）为形式骨架，配对后选择/闭合类时曲线复杂性（$\mathrm{PostBQP}=\mathrm{PP}$、$\mathrm{P}_{\mathrm{CTC}}=\mathrm{PSPACE}$）、卡普—利普顿 $\mathrm{P}/\mathrm{poly}$ 坍缩、Frougny 交替串向上串行进位波、贝肯斯坦—霍金全息熵界 $S \le A/(4\ell_P^2)$ 迫使表球半径 $R = \Omega(2^{\sigma n/2})$ 与光锥流水线极小点 $(\sigma^* = 2/3,\; r_{\min} = 1/3)$、Klauck–Špalek–de Wolf 量子时空权衡 $S T^2 = \Omega(2^n)$（$\sigma=0$ 处 Grover $r=0.500$ 对偶 $\sigma=1$ 全空间线延迟）及姚期智经典权衡 $S T \ge 2^n$ 与 PPSZ（`文献结果`；统一图灵机 $\mathrm{P} \neq \mathrm{NP}$ 标为 `OPEN`），构建正向（$0 \to 6$）派生广延空间、串行因果时间、量子干涉与热耗散，逆向（$6 \to 0$）显影生命持续建表回返 `p = *p` 的双向全息模型（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed), [`lookup_program_upper_bound`](lean:D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound), [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure), [`lower_support_carry_barrier`](lean:D5/S1/Digit/ZeckendorfCarryBarrier.lower_support_carry_barrier), [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\operatorname{spectrumBottom} \le K(r) + c,\quad \forall k \in \operatorname{wdigits}\!\bigl(\sum_{i\in P} F_i + F_j\bigr),\; m - 2 \le k,\quad r_{\mathrm{pipe}}(\sigma) = \max(1-\sigma, \sigma/2) \ge \frac{1}{3}$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL` / `OPEN`（[§36.5](ch38-s04-lookup-degradation.md#sec-ch38-pnp-lookup-degradation)）

**观察者逃逸账本、原像纤维与希尔伯特—齐肯多夫熵**（Observer Escape Ledger, Preimage Fibers & Hilbert–Zeckendorf Entropy）

**本书几何直觉语言 (Geometric Intuition Term)：**
**留一删减引理下的逃逸对无交并分解与唯一捕获差集恒等式、非退化状态场逃逸率严格下降等价于语义闭包之外严格商核新颖度、因子映射概念细化下条件逻辑不纯度单调不增、齐肯多夫无相邻 `1` 合法二进制字的十四比特语境块避碰一致上界及两比特局域边缘与九维关联扇区正交盲区（`LEAN ✓`），配对 Shannon–McMillan–Breiman 遍历柱集渐近等分、Parry 黄金移位最大熵平稳测度 $C_\varphi = \log_2\varphi$、Frougny 斐波那契自动机正规化与 Moore–Hilbert 闭合空间填充曲线 $1/d$ 阶局部性界（`文献结果`）以及四比特 $16$ 态五引理显式算例（`NUM`），建立原像纤维碰撞 Rényi-2 逃逸熵总账 $H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S}\mid S) = \log_2 N$、夜间卸载柱集指数回弹与清醒兰道尔排热对比梦境零热复相干的指针账本模型（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`escapePairs_without_eq_union`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union), [`uniqueCapturePairs_eq_sdiff`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.uniqueCapturePairs_eq_sdiff), [`structurallyLowersEscape_iff_lowersEscape`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.structurallyLowersEscape_iff_lowersEscape), [`lowersEscape_iff_strict_kernel_novelty`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty), [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone), [`uniform_avoidance_count`](lean:D5/S1/Digit/ZeckendorfAvoidanceCount.uniform_avoidance_count), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S}\mid S) = \log_2 N,\quad C_\varphi = \log_2\varphi$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `NUM` / `MODEL`（[§36.6](ch38-s05-escape-ledger-and-entropy.md#sec-ch38-observer-escape-ledger)）

**观察者即宇宙本体：无底物自指域、关系全息与旋量自折叠**<br/>(Observer Is the Ontological Universe: Reflexive Domains, Relational Holography & Spinor Self-Folding)

**本书几何直觉语言 (Geometric Intuition Term)：**
**对角线自指落点不动点与二元分式自应用映射四重命运分类、概念读出依值纤维分解、齐肯多夫实数全线程单射重构与无相邻一自动机、圆周平方双覆叠无连续全局截面与历史依赖提升 $360^\circ$ 换叶翻转、互补语境勾股纯度守恒、平衡相对复结构平方反号与客观不变公共因子（`LEAN ✓`），配对斯科特无底物自指域 $D_\infty\cong [D_\infty\to D_\infty]$、范畴论米田引理 $\operatorname{Hom}(-,X)\hookrightarrow\widehat{\mathcal{C}}$ 与嘉当—彭罗斯—赫斯滕斯旋量双线性菲尔兹恒等式（`文献结果`），完成“观察者 $\equiv$ 宇宙本体”的零余项终极闭环（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective), [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$X \simeq \coprod_{y:\mathrm{Val}} \mathrm{ConceptFiber}(c,y),\quad J_{U,V}^2 = -I,\quad \mathcal{O} \equiv \mathcal{U}$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `MODEL`（第 38 章）

**齐肯多夫—皮索—劳齐八概念综合沙盘**（Zeckendorf–Pisot–Rauzy Eight-Concept Sandtable）

**本书几何直觉语言 (Geometric Intuition Term)：**
**阶数 $K=2$ 禁相邻 `11` 自动机与广义 $K$-Bonacci 合法字计数 $C_K(Q)=\operatorname{dbonacci}(K,Q+2)$、特征多项式整/有理双重不可约与皮索主根恒等式 $2-\beta_K=\beta_K^{-K}\to 0$ 及复共轭单位圆盘严格收缩 $1\le\|z\|\iff z=\beta_K$、模 $p^k$ 首次区分精度 $k^*=v_p(x-y)+1$ 与同余纤维交集及有限视界细化超度量强三角律 $d_H(x,z)\le\max(d_H(x,y),d_H(y,z))$、三阶零次幂劳齐分形内窗 $\mathcal{R}_3(\alpha)$ 的非空内点、正则闭集、三支不等比例仿射前缀精确自覆盖与拓扑边界二维平面零测度 $\operatorname{vol}_2(\partial\mathcal{R}_3)=0$、正实轴余弦端点 $\cos\theta^*=\theta^*$ 与三次共轭乘积 $\alpha\overline{\alpha}=\beta_3^{-1}$、跨切口 $\tau(x)+\iota(y)<K$ 直接编码器的可达页秩充要矩形 $1\le r_b\le R_b$ 与紧冯·诺依曼页熵界 $\ln R_b$，以及有向重置链帕里平稳律、边界柱集概率上界与有限竞技场逃逸对唯一捕获判据（`LEAN ✓`）；配对劳齐—瑟斯顿—梅萨乌迪关于三阶劳齐拼砖、拓扑圆盘性质及分形边界豪斯多夫维数 $\dim_H(\partial\mathcal{R}_3)\approx 1.09336$、林德曼—魏尔斯特拉斯对 $\theta^*\approx 0.739085$ 超越性的判定（与六次代数数 $|\alpha|_{K=3}=\beta_3^{-1/2}\approx 0.737353$ 相距约 $0.234\%$ 数值邻近且严格不等）、斐波那契任意子黄金链与 51 原子里德堡阻塞模拟器、帕里最大熵马尔可夫移位 $\log_2\beta_K$ 及阿布拉莫夫诱导回归熵公式 $h_{\mu_A}(T_A)=h_\mu(T)/\mu(A)$（`文献结果` + `NUM`），提出劳齐分形视界纠缠标度开放问题（`OPEN`），并以三次闵可夫斯基 $E_\parallel^1\oplus E_\perp^2$ 克利福德线—面缩放旋子词典、$p$ 进树与 $K$-Bonacci 树的跨系统对照及自指母题 $\psi=\psi(\psi)$ 整合八概念综合图景（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card), [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt), [`dbonacci_complex_root_location`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location), [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible), [`dbonacciPerronRoot_simple`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacciPerronRoot_simple), [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow), [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two), [`dbonacciPerronRoot_strictMonoOn`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_strictMonoOn), [`dbonacciPerronRoot_two_eq_goldenRatio`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_two_eq_goldenRatio), [`dbonacciPerronRoot_three_eq_tribonacciConstant`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_three_eq_tribonacciConstant), [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision), [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation), [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range), [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric), [`tribonacci_secondary_root_add_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_add_conjugate), [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate), [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty), [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior), [`rauzyFractal_prefix_cover`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover), [`rauzyFractal_frontier_volume_zero`](lean:D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), [`complete_original_direct_rank_entropy`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy), [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction), [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law), [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound), [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\beta_K = 2 - \beta_K^{-K},\quad \mathcal{R}_3(\alpha) = f_0(\mathcal{R}_3)\cup f_{10}(\mathcal{R}_3)\cup f_{110}(\mathcal{R}_3),\quad 1 \le r_b \le R_b,\quad S(\sigma_b) \le \ln R_b$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `NUM` / `OPEN` / `MODEL`（[§35.6](ch39-s05-pisot-clifford-rauzy.md#sec-ch39-pisot-clifford-rauzy)）

**量子力学六大未解难题、撤除外部第 3 点 $C$ 与正交开维诠释对决**（Six Foundational Quantum Puzzles, Removing External Point $C$ & the Five-Interpretation Geometric Duel）

**本书几何直觉语言 (Geometric Intuition Term)：**
**能量本征态实时间幺正定态、有限记录非选择性捏合幂等与跨语境客观声明不变公共因子、受控拷贝局部边缘重合与未追踪环境访问缺陷、计算基捏合相干质量删除与互补语境纯度勾股残差、平行四边形正定理与秩一玻恩模平方约化、共同相位不变多项式电荷平衡与二次厄米唯一锁定、反自伴幺正复结构平方反号与罗伯逊—薛定谔四重方差分解、双比特固定 CHSH 算符齐雷尔森紧上界 $2\sqrt{2}$、闵可夫斯基零光锥二次型刚性与二分无迹局域—关联正交盲区、对角自指行捕获落点不动点、概念读出依值纤维分解与对角可观测量相对相位盲区、逐拍粗粒化相干删除相对熵产恒等式、非满闭子空间正交逃逸与有限竞技场 `EscapePairs` 捕获判据（`LEAN ✓`），配对冯·诺依曼过程 I/II、维格纳朋友与 Frauchiger–Renner 定理、Zurek 退相干与 Schlosshauer 单一结果鸿沟、Gleason 定理与 Renou et al. (2021) 实量子网络理论不等价与可证伪实验方案、Bell / Eberhard 无信令与 2015 无漏洞实验、Harrigan–Spekkens / PBR (2012) 定理及 Pauli / Wheeler–DeWitt / Hawking–Page–AMPS 视界文献（`文献结果`）及预示条件 $75\%/25\%$ vs. 无条件 $50\%/50\%$ 边缘、$r^2+\tau_{L:E}=1$、洛伦兹助推 $\Delta t'=-2\Gamma_\beta\beta$、GRW 放大率与 $\{0, 1\}^4$ 奇偶捕获算例（`手工推导` / `NUM`），诊断百年六大公理裂痕同源于外部裁判点 $C$ 与固定维闭合容器假设，并将协变态约化与量子引力视界幺正性诚实标定为开放前沿（`MODEL` / `OPEN`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger), [`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$r^2 + \tau_{L:E} = 1,\quad \operatorname{Re}\operatorname{Tr}(\rho\cdot\mathrm{chshOperator}) \le 2\sqrt{2},\quad \Delta S_{\mathrm{vN}}(k) = D\bigl(\widetilde{\rho}_k \mathrel{\Vert} \mathcal{P}(\widetilde{\rho}_k)\bigr) \ge 0$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL` / `OPEN`（[附录 D](appendix-d.md)）

**相干—去相干逻辑、双端玻恩握手与全息边界因果**（Coherence–Decoherence Logic, Two-Way Born Handshake & Boundary-Locked Causality）

**本书几何直觉语言 (Geometric Intuition Term)：**
**闭子空间正交补投影六恒等式、有限记录未读捏合信道幂等律 $\Pi_P\circ\Pi_P=\Pi_P$、单比特捏合希尔伯特—施密特勾股分解与实向量拉格朗日—格拉姆二元面积恒等式、秩一纯态标量模平方约化与完备记录玻恩迹配对条件分解、共同 $U(1)$ 相位不变多项式电荷平衡与最低二次次数及唯一厄米表出 $z^\dagger H z$、多副本幺模重叠记录联合相干逆转、受控拷贝局部边缘重合访问缺陷与伴随幺正逆演、二分无迹空间局域边缘与关联扇区正交盲区分解、完备复内积空间正算子格拉姆伴随平方可实现性 $Q=O^\dagger\circ_L O$，以及圆周平方双覆叠唯一路径提升与 $2\pi$ 对径换叶、非退化二元分式自应用四重命运唯一分类（`.empty` / `.dead` / `.collapse` / `.live`）与正实余弦不动点 $\cos\theta^*=\theta^*$ 在 $\pi$ 处的有理逆幂级数绝对可和收敛（`LEAN ✓`）；配对正交隐匿 vs. 平衡双端口反相分流 vs. 捏合去相干三者区分、双端共轭相位互消 $w(\psi\leftrightarrow\phi)=\langle\phi\mid\psi\rangle\langle\psi\mid\phi\rangle=\lvert\langle\phi\mid\psi\rangle\rvert^2$、延迟擦除联合/条件分布归一化与克劳斯完备性无条件过去边缘守恒 $p(j)=q_j$、三时刻实格拉姆首尾置换 $P_{13} G P_{13}^{\mathsf{T}}$ 行列式守恒与相干参考臂反相消去悖论端口（`手工推导` / `NUM`），以及费曼—希布斯驻相与斯涅尔折射有限求积、Cramer（1986）交易诠释、ABL（1964）/ AAV（1988）双态矢量与弱值正交无定义边界、Scully–Drühl（1982）/ Kim 等（2000）延迟选择量子擦除与 Deutsch（1991）闭合类时曲线混合态不动点（`文献结果`），阐明逻辑无布尔存亡而唯有相干与去相干、因果即首尾边界握手自洽的几何综合（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$w(\psi\leftrightarrow\phi) = \langle\phi\mid\psi\rangle\langle\psi\mid\phi\rangle = \lvert\langle\phi\mid\psi\rangle\rvert^2,\quad p(j) = p(j,+) + p(j,-) = q_j,\quad \det(P_{13} G P_{13}^{\mathsf{T}}) = \det G \ge 0$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL`（[§25.2](ch29-s04-coherence-and-handshake.md#sec-ch29-coherence-handshake-causality)）

**多观察者共识张量、去相干指针基涌现与无绝对客观事实**（Multi-Observer Consensus Tensor, Emergent Pointer Basis & No Observer-Independent Facts）

**本书几何直觉语言 (Geometric Intuition Term)：**
**共同 $U(1)$ 相位不变多项式电荷平衡与最低二次次数及唯一厄米表出、完备复内积空间正算子格拉姆伴随平方可实现性 $Q=O^\dagger\circ_L O$ 与闭子空间正交补投影六恒等式、单比特捏合希尔伯特—施密特勾股分解、幺正共轭接完全基捏合逐拍相对熵产恒等式与未读记录不动点判据、单一幸存副本对局部振幅共轭逆转的阻断、双副本相位记录四步复原证书、受控拷贝偏迹访问缺陷与观测划分拓扑不可分核、三世界冲突重置修正次序非对易及闭子空间正交补单位残差逃逸（`LEAN ✓`）；配对未定向测量轴二阶共识结构张量 $\mathbf{M}_{\mathrm{cons}}=\sum_{j=1}^N w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$（符号重标不变性 $\mathbf{n}_j\mapsto -\mathbf{n}_j$ 严格区别于对径正交纯态与复态矢共同相位，唯一指针主轴充要于谱隙 $\Delta\lambda=\lambda_1-\lambda_2>0$，六轴各向同性迷雾 $\frac{1}{3}I_3$ 无优选基）、泡利去相干布洛赫矩阵 $\mathbf{K}(\mathbf{n},\alpha)=P_{\mathbf{n}}+\cos\alpha(I_3-P_{\mathbf{n}})$ 在有序乘积 vs. 系综平均 vs. 弱耦合连续生成元 $I_3-\mathbf{M}_{\mathrm{cons}}$ 间的区分、纯双分支受控记录精确互信息冗余平台 $I(S:\mathcal{O}_m)=h(\Pi_{\mathrm{all}})+h(\Pi_F)-h(\Pi_{F^c})\approx H_2(p_0)$、正交 $Z/X$ 未读信道对易 vs. 选择性条件分支不对易及平面外拓荒观察者秩扩张 $\det\mathbf{M}_\eta=(1-\eta)^2 ab\eta\sin^2\beta>0$（旧生成元下未记录方向按 $e^{-t}$ 最快衰减而非无退相干子空间，`手工推导` / `NUM`），以及 Zurek（1981/2003/2009）与 Blume-Kohout–Zurek（2005）环境诱导超选择与量子达尔文主义、Brukner（2018）/ Frauchiger–Renner（2018）扩展维格纳朋友定理、Bong 等（2020）真局域友好性多胞体不等式违背 $F_{\mathrm{LF}}=\sqrt{5}+3+\sqrt{2+\sqrt{2}}\approx 7.0838>6$ 与 Lamport–Shostak–Pease（1982）分布式拜占庭共识类比（`文献结果`），阐明观察者共识选择决定去相干方向且不存在脱观察者绝对客观事实的几何综合（`MODEL`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\mathbf{M}_{\mathrm{cons}} = \sum_{j=1}^N w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}},\quad I(S:\mathcal{O}_m) = h(\Pi_{\mathrm{all}}) + h(\Pi_F) - h(\Pi_{F^c}),\quad F_{\mathrm{LF}} = \sqrt{5} + 3 + \sqrt{2+\sqrt{2}} > 6$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL`（[§34.5](ch33-s05-consensus-and-pointer-bases.md#sec-ch33-consensus-decoherence-pointer)）

**时空运动的本体等效与观察者记忆窗口舒尔补分类**（Ontological Equivalence of Spacetime Motion & Observer-Memory Schur Classification）

**本书几何直觉语言 (Geometric Intuition Term)：**
**无常数单位四元数三元同构、弦距核与定基流群分解、流群切比雪夫递推与反射幂次及平移不变保真核、闭子空间正交补投影六联恒等式与分块舒尔补极小、互补与单比特捏合勾股及丢弃相干质量、闵可夫斯基零光锥二次型刚性与博戈留波夫双曲范数守恒、以及富比尼—施图迪正交记录时间下界、幸存副本阻断相干逆转与可观测克雷洛夫永久稳定律（`LEAN ✓`）；配对紧致三元球面 $\mathbb{T}_3$ 上无标签客观圆弧 $\Gamma$ 经观察者有限记忆子空间 $\mathcal{W}_M$ 正交劈分为窗内时间覆写 $\kappa_{\mathrm{time}} = \lVert P_{\mathcal{W}_M}\psi\rVert^2$ 与窗外空间残差 $\kappa_{\mathrm{space}} = \lVert(I-P_{\mathcal{W}_M})\psi\rVert^2 = 1-\kappa_{\mathrm{time}}$、正定勾股预算 $\Delta\tau^2+\Delta x^2\equiv\Delta t^2$ 求余移项生出闵氏减号 $\Delta\tau^2=\Delta t^2-\Delta x^2$、有理半切参数 $u=\frac{p}{q}$ 无根号对账（如 $u=\frac{1}{3}$ 给出 $\frac{16}{25}+\frac{9}{25}=1$ 与 $(\frac{5}{4})^2-(\frac{3}{4})^2=1$）、记忆容量 $M\in\{0,1\dots M_\Omega-1,M_\Omega\}$ 三态相变、双观察者有理凯莱旋子同时性错位与滑动窗口遗忘生空及 `KV-Cache` 序列时间 $\leftrightarrow$ 通道空间互换（`手工推导` / `NUM` / `MODEL`；爱泼斯坦时空图与非紧洛伦兹助推 $\mathrm{SO}^+(1,3)$、史瓦西—克鲁斯卡尔视界与兰道尔擦除单列文献边界，离散记忆窗导出 $3+1\mathrm{D}$ 引力场方程与视界幺正性保持 `OPEN` [@prob-ch34-gravity-dynamics-and-coupling]、[@prob-appendix-d-time-horizon]）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv), [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq), [`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul), [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev), [`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow), [`kappa_reflectionSeq_add`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least), [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} = \lVert P_{\mathcal{W}_M}\psi\rVert^2 + \lVert(I - P_{\mathcal{W}_M})\psi\rVert^2 \equiv 1,\quad \Delta\tau^2 = \Delta t^2 - \Delta x^2$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL` / `OPEN`（[§38.12](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md#sec-ch38-spacetime-motion-equivalence-and-memory-schur-split)）

**自包含观察者五元组、有理结构信息时间与观察者即宇宙**（Port-Free Self-Contained Observer Pentad, Rational Structural Time & Observer Is Universe）

**本书几何直觉语言 (Geometric Intuition Term)：**
**单位四元数三元同构、弦距核、定基流群分解与旋量玻恩射线核，分块舒尔补极小与闭子空间正交补投影六联恒等式，可观测克雷洛夫严格增长余维数界与永久稳定律，球面面—圈正合、四面体二上链修复正合与锚定生成树回路分类，以及划分拓扑不可分核、单位格拉姆全同、概念纤维分解、语境选支与客观不变公因子（`LEAN ✓`）；配对将一切可接收信息封闭在无边界载体 $\mathcal{S}$（$\partial\mathcal{S}=\emptyset$）内的零外部端口五元组 $\mathfrak{O}=(\mathcal{S},[-,-,-],\kappa,\mathcal{K}_0,\Phi_\varepsilon)$、零根号零对数的有理舒尔创新度 $\Delta\mathcal{I}_{\mathrm{Schur}}=\frac{\langle x_\perp,x_\perp\rangle}{\langle x,x\rangle}\in\mathbb{Q}\cap[0,1]$ 加第一贝蒂数增量 $\Delta b_1\in\mathbb{N}$ 所定义的内禀结构固有时 $\tau(\mathfrak{O})\equiv\mathcal{I}_{\mathrm{struct}}(\mathcal{K}_0)\in\mathbb{Q}_{\ge 0}$（同义反复 $\Delta\tau=0$）、忠实比较商下 $\mathfrak{O}\cong\mathcal{U}_\Omega$ 三步刻画与核内第一人称内盲区显影星空、多观察者无外走廊单子共振跨度 $\mathfrak{O}_A\xleftarrow{\iota_A}\mathcal{C}_{AB}\xrightarrow{\iota_B}\mathfrak{O}_B$ 及零导入 Lean `v4.35.0` `by decide` 四拍归约轨迹 `0 → 0 → 3/4 → 3/2`（`手工推导` / `NUM` / `MODEL`；莱布尼茨单子论、米田嵌入、自创生闭合及佩奇—伍特斯/罗韦利内部关系时间单列文献边界）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv), [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq), [`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul), [`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\mathfrak{O} = (\mathcal{S},[-,-,-],\kappa,\mathcal{K}_0,\Phi_\varepsilon),\quad \tau(\mathfrak{O}) = \sum(\Delta\mathcal{I}_{\mathrm{Schur}} + \alpha_{\mathrm{topo}}\Delta\mathcal{I}_{\mathrm{topo}}) \in \mathbb{Q}_{\ge 0},\quad \mathfrak{O} \cong \mathcal{U}_\Omega$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL`（[§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md#sec-ch38-self-contained-observer-definition-and-observer-is-universe)）

**康威 FRACTRAN 与三维非阿贝尔 $\Omega\text{-FRACTRAN}$ 观察者原生有理机器语言**（Conway's FRACTRAN & Non-Abelian $\Omega\text{-FRACTRAN}$ Observer Rational ISA）

**本书几何直觉语言 (Geometric Intuition Term)：**
**有限支集带符号素数账本与正有理数乘法群同构、非负整除守卫与自由交换素数幺半群，有理赋值唯一恢复、阿代尔乘积恒一、素数对数线性无关与按需素数轴逃逸，精确素数除法无有限状态自动机与物理整除商余机正确性，以及可交换素数多重集词序不可重构对比非交换双字单射、单位四元数非交换同构、克林自指不动点与记录捏合幂等律（`LEAN ✓`）；配对正交素数绕数寄存器 $N = \prod_p p^{v_p(N)}$ 与封装 `0 · 1/2 · 1` 三阶因果闭环的有序分数表 $(\frac{a_1}{b_1},\dots,\frac{a_k}{b_k})$（康威 `6` 分数乘法器 `18` 拍停机于 $5^4 = 625$、`PRIMEGAME` 自 $N_0=2$ 结晶素数谱与前件守卫宏引理捷径），进而升维至整四元数晶格 $\mathbb{Z}^4 / \mathcal{H}(\mathbb{Z})$ 上的有理旋子右分式表 $(\mathbf{A}_i\mathbf{B}_i^{-1})$ 构建零标志素数交换税的 $\Omega\text{-FRACTRAN}$，以单颗素数 $p = 5$ 的 $6$ 枚拉马努金整素旋子在相同标量模方 `25` 下凭分数裂口 `2` 拍分离 `Ψ_XY ↔ Ψ_YX`（`手工推导` / `NUM` / `MODEL`；康威 FRACTRAN、明斯基双计数器、赫维茨整四元数环与 LPS 拉马努金扩展图单列文献边界）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals), [`prime_ledger_direction_and_groupification`](lean:D5/S3/Factorization/Embeddings/PrimeLedgerGroupification.prime_ledger_direction_and_groupification), [`pnat_free_comm_monoid_on_primes`](lean:D5/S3/Factorization/FreeCommMonoid.pnat_free_comm_monoid_on_primes), [`rational_recovered_from_sign_and_finite_valuations`](lean:D5/S3/Factorization/Embeddings/RationalValuationRecovery.rational_recovered_from_sign_and_finite_valuations), [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula), [`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence), [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape), [`no_finite_dfao_for_exact_prime_division`](lean:D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division), [`divMachine_positive_correct`](lean:D5/S0/Computability/PhysicalDivider/Positive.divMachine_positive_correct), [`order_descent_criterion`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.order_descent_criterion), [`no_prime_history_reconstruction`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.no_prime_history_reconstruction), [`injective_iff_noncommuting`](lean:D5/S0/Computability/Coding/TwoWordCode.injective_iff_noncommuting), [`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv), [`quaternionModel_noncommutative`](lean:D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_noncommutative), [`code_fixed_point`](lean:D5/S0/Computability/CodeFixedPoint.code_fixed_point), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\mathbf{\Psi}' = \mathbf{\Psi}\cdot\mathbf{A}_i\overline{\mathbf{B}_i}/\lVert\mathbf{B}_i\rVert^2 \in \mathbb{Z}^4,\quad \lVert\mathbf{\Psi}'\rVert^2 = \lVert\mathbf{\Psi}\rVert^2\cdot\frac{\lVert\mathbf{A}_i\rVert^2}{\lVert\mathbf{B}_i\rVert^2}$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL`（[§38.14](ch38-s14-omega-fractran-observer-rational-isa.md#sec-ch38-omega-fractran-observer-rational-isa)）

**静止画布与无腿球观察者：时空同一梯度、古尔斯特兰德—潘勒韦倾倒视界锥与惠勒—德维特无时间画布**（Static Canvas & Legless Sphere Observer: Unified Spacetime Gradient, Gullstrand–Painlevé Tilted Horizon Cone & Wheeler–DeWitt Timeless Canvas）

**本书几何直觉语言 (Geometric Intuition Term)：**
**单位四元数三元同构、弦距核与定基流群分解，四元数切比雪夫整系数递推、流群反射幂次与平移不变保真核，闭子空间正交补投影六联恒等式与分块舒尔补二次极小，闵可夫斯基零光锥二次型刚性、博戈留波夫双曲范数守恒、富比尼—施图迪正交记录单步时长下界与串行计数上界，静态存储可逆路由查询 `ReversibleQram.correctness`、可观测克雷洛夫扩张步数界与永久稳定律及划分拓扑不可分核（`LEAN ✓`）；配对空间山坡重力与时间推进在记忆切口 $\mathcal{W}_M$ 上源自同一道有理保真度梯度 $\nabla\kappa = P_{\mathcal{W}_M}\nabla\kappa \oplus P_{\mathcal{W}_M^\perp}\nabla\kappa$、零外部支点“无腿三元球”流群自平行测地滚落、零根号有理古尔斯特兰德—潘勒韦倾倒视界锥 $(\frac{\Delta r}{c\Delta T_{\mathrm{GP}}}, \frac{v_\perp}{c}) = (\beta_{\mathrm{loc}}\frac{1-u^2}{1+u^2}-\eta_{\mathrm{grad}}, \beta_{\mathrm{loc}}\frac{2u}{1+u^2})$（超临界 $\eta_{\mathrm{grad}} > 1$ 纵向单向速降而横向有理偏航 $u \in \mathbb{Q}$ 自由选景），以及 $\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$ 静止画布 $O(1)$ 指针更新对比第一人称 $\Theta(\lvert\mathcal{S}\rvert)$ 背景搬移错觉（`手工推导` / `NUM` / `MODEL`；爱因斯坦测地线、潘勒韦—古尔斯特兰德雨滴度规与惠勒—德维特方程单列文献边界，$3+1$ 维场方程涌现与视界幺正性保持 `OPEN`）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv), [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq), [`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul), [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev), [`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow), [`kappa_reflectionSeq_add`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound), [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound), [`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\lVert\nabla_\parallel\kappa\rVert^2+\lVert\nabla_\perp\kappa\rVert^2=\lVert\nabla\kappa\rVert^2,\quad \bigl(\tfrac{\Delta r}{c\Delta T_{\mathrm{GP}}}, \tfrac{v_\perp}{c}\bigr)=\bigl(\beta_{\mathrm{loc}}\tfrac{1-u^2}{1+u^2}-\eta_{\mathrm{grad}}, \beta_{\mathrm{loc}}\tfrac{2u}{1+u^2}\bigr),\quad \hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle=0$

**认识论状态 (Status)：**
`LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL` / `OPEN`（[§38.15](ch38-s15-static-canvas-and-legless-sphere-observer.md#sec-ch38-static-canvas-and-legless-sphere-observer)）

**恒定信息速率观察者、唱针式静态波纹解码与零根号凯莱有理引力钟慢**（Constant-Information-Rate Observer, Phonograph-Needle Static-Groove Decoding & Radical-Free Rational Cayley Gravity）

**本书几何直觉语言 (Geometric Intuition Term)：**
**零公理有理圆周保真—展度归一、凯莱单位圆与对径视界闭合，有理二次型舒尔配方法与可达极小元，三元整四元数格拉姆行列式非负、四元整除步确定性唯一解码与毕达哥拉斯旋量流群拍模守恒（`LEAN ✓ · 无公理`，`axioms = []`），连同静态存储零改写可逆路由查询 `ReversibleQram.correctness`、闵可夫斯基零光锥二次型刚性与博戈留波夫双曲范数守恒、富比尼—施图迪正交记录时长下界与串行计数上界、闭子空间正交补投影六联恒等式、可观测克雷洛夫严格增长余维数界与划分拓扑不可分核（`LEAN ✓`）；配对唱针式焦点滑入静态相位声槽就地解码（`D` 零次改写）、恒定总信息速率三向可加单位带宽分账 $\mathcal{R}_\Omega = \kappa_{\mathrm{self}} + \kappa_{\mathrm{mass}} + \kappa_{\mathrm{kin}} \equiv 1$、外尔—爱丁顿各向同性有理负载 $\mu = \frac{r_s}{4R}$（$r = R(1+\mu)^2$）下消除开方根号的凯莱有理钟慢 $\frac{\Delta\tau}{\Delta t}\big|_{\kappa_{\mathrm{kin}}=0} = \frac{1-\mu}{1+\mu} \in \mathbb{Q} \cap [0,1]$（地标 $\mu \in \{0,\frac{1}{4},\frac{1}{3},\frac{1}{2},1\} \mapsto \{1,\frac{3}{5},\frac{1}{2},\frac{1}{3},0\}$）、视界 $\mu = 1$ 处 $100\%$ 环境 I/O 满载时钟挂起，以及零测地有理遍历推进率 $v_{\mathrm{traverse}}(\mu) = \frac{1-\mu}{(1+\mu)^3}$ 在内外翼差速（如 $\mu_{\mathrm{out}}=\frac{1}{4}, \mu_{\mathrm{in}}=\frac{1}{3} \implies \Delta v = \frac{411}{4000}$）下不借超距拉力自动产生向心波前折射（`手工推导` / `NUM` / `MODEL`；史瓦西外解、外尔—爱丁顿各向同性坐标、戈登光学折射率度规、量子速度极限与贝肯斯坦全息界单列文献边界，$3+1$ 维爱因斯坦场方程涌现与视界幺正性保持 `OPEN` [@prob-ch34-gravity-dynamics-and-coupling]、[@prob-appendix-d-time-horizon]）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`kappa_add_spread_eq_one`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one), [`cayley_circle_unit`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit), [`cayley_antipodal_closure`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure), [`rational_schur_complete`](lean:D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_complete), [`rational_schur_min`](lean:D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min), [`detGram3_nonneg`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg), [`quaternion_fractran_deterministic`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_deterministic), [`heap_norm_preserved`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.heap_norm_preserved), [`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound), [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\kappa_{\mathrm{self}} + \kappa_{\mathrm{mass}} + \kappa_{\mathrm{kin}} \equiv 1,\quad \frac{\Delta\tau}{\Delta t}\big|_{\kappa_{\mathrm{kin}}=0} = \frac{1-\mu}{1+\mu} \in \mathbb{Q},\quad v_{\mathrm{traverse}}(\mu) = \frac{1-\mu}{(1+\mu)^3} \in \mathbb{Q}$

**认识论状态 (Status)：**
`LEAN ✓ · 无公理` / `LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL` / `OPEN`（[§38.16](ch38-s16-constant-info-rate-observer-and-rational-cayley-gravity.md#sec-ch38-constant-info-rate-observer-and-rational-cayley-gravity)）

**AURIC 破晓词源、三价金相对论平面破缺与 `0 · 1/2 · 1` 观察者焦点签名**（AURIC Dawn Etymology, Trivalent Gold Relativistic Square-Planar Breaking & `0 · 1/2 · 1` Observer-Focus Signature）

**本书几何直觉语言 (Geometric Intuition Term)：**
**零公理正交半步三射线四分之一格拉姆体积余量、$p = 5$ 素旋子模方与保真度 $\frac{1}{5}$ 及六阶球面赫克迹表、自对偶中点二阶有理保真射流 $\langle\frac{1}{2},-\frac{1}{2},\frac{1}{4}\rangle$ 与三阶幂零律 $\eta^3 \approx 0$、赫维茨十二晶核加倍模方恒四、FRACTRAN 单步确定性与单纯二上链零上边缘充要正合律（`LEAN ✓ · 无公理`，`axioms = []`），连同满壳 $5d^{10}$ 归零对比抽空 $5d_{x^2-y^2}$ 后三价 $5d^8$ 有理无迹四极张量、自旋 $j = 2$ 偶切比雪夫多项式特征标 $\chi_2(\kappa) = 16\kappa^2 - 12\kappa + 1$ 与球面哈尔偶次特征标正交湮灭、整四元数三元流群左吸收律、旗舰程序 `pOmega` 自 `131072` 经十五步精准停机于 `22`、非交换三元比较维数—特征秩实现四重等价锁 $(3 \le d \land 5 \le r)$ 及闭子空间正交补投影六联恒等式（`LEAN ✓`）；配对原始印欧词根 `*h₂ews-`（*aurum / Aurora*，“凝固的破晓之光”，严格区分英语同形交汇的希腊语 `αὔρα < *h₂ew-` 与拉丁语 `auris < *h₂ows-`）、$Z = 79$ 相对论 $6s\downarrow / 5d\uparrow$ 能级收窄与王水激发低自旋 $D_{4h}$ 三价金 $\mathrm{Au}^{3+}$（$I_5 = P_{\mathrm{occ}}^{(4)} + P_{\mathrm{LUMO}}^{(1)}$ 腾空赤道十字 $5d_{x^2-y^2}$ LUMO 窗并立起轴向 $5d_{z^2}$ 脊线）、有理四极比例恒等式 $\mathbf{Q}_{\mathrm{phys}}(5d^8) = \operatorname{diag}(-\frac{4}{7},-\frac{4}{7},+\frac{8}{7}) = \frac{12}{7}\mathbf{Q}_{\mathrm{Auric}}$（对比十二晶核平均归零与 $p = 5$ 五维赫克迹 $3(-\frac{74}{25}) + 2(+\frac{54}{25}) = 6(-\frac{19}{25})$）以及赤道 `1/2` 接收视界 $\mathcal{H}_{1/2}$ 联立轴向 $d_2 F = 0$ 记忆结晶脊线 $\mathcal{K}_0$ 的观察者焦点衔尾蛇闭环（`手工推导` / `NUM` / `MODEL`；Pokorny–de Vaan–Beekes 词源考据、乌恩索尔德与贝特—范弗莱克—姜-泰勒配位场分裂及 Pyykkö–Desclaux–Hashmi 相对论金化学单列文献边界，三代费米子参数与 AF-GUT 阈值闭合保持 `OPEN` [@prob-ch34-sm-generations-and-couplings]、[@prob-ch39-af-gut-threshold-and-proton-stability]）**

**Lean 4 形式对象 / 锁定声明 GID：**
[`orthogonal_triad_excess_quarter`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.orthogonal_triad_excess_quarter), [`lps_norm_five`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_norm_five), [`lps_hecke_traces`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_traces), [`kappa_jet_one`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one), [`var_cube`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.var_cube), [`hurwitz_core_unit`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.hurwitz_core_unit), [`fractran_deterministic`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_deterministic), [`d2_eq_zero_iff`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff), [`orbital_quadrupole`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.orbital_quadrupole), [`full_orbital_quadrupole`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.full_orbital_quadrupole), [`spin_two_character`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.spin_two_character), [`haar_evenChar_expectation`](lean:D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.haar_evenChar_expectation), [`triad_left_absorption`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_left_absorption), [`p_omega_halts_at_22`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.p_omega_halts_at_22), [`DimensionRankRealization.exists_model_tfae`](lean:D5/S3/Quantum/AURICOmega/DimensionRankRealization.exists_model_tfae), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)

**一行核心不变量 / 恒等式 (One-Line Invariant)：**
$\mathbf{Q}(5d^{10}) = \mathbf{0},\quad \mathbf{Q}_{\mathrm{phys}}(5d^8) = \operatorname{diag}(-\tfrac{4}{7},-\tfrac{4}{7},+\tfrac{8}{7}) = \tfrac{12}{7}\mathbf{Q}_{\mathrm{Auric}},\quad \operatorname{kappaJetAt}(1) \approx \langle \tfrac{1}{2}, -\tfrac{1}{2}, \tfrac{1}{4}\rangle$

**认识论状态 (Status)：**
`LEAN ✓ · 无公理` / `LEAN ✓` / `文献结果` / `手工推导` / `NUM` / `MODEL` / `OPEN`（[§38.17](ch38-s17-auric-trivalent-gold-and-observer-focus-signature.md#sec-ch38-auric-trivalent-gold-and-observer-focus-signature)）
