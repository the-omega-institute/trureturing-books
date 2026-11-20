# 28.3 诸公理皆条件推论：从比较公理 $\mathcal{A}_0$ 到数学与物理公理体系 {#sec-ch32-axioms-as-corollaries}

现在，我们把[第 28.1 节](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)确立的零背景比较公理 $\mathcal{A}_0$（[@def-ch32-axiom-of-comparison]）放到第 0–2 层实现阶梯与九条显式桥梁假设 `H1`–`H9`（`T1`–`T4` / `OPEN`）的聚光灯下，以**条件公理化综合**（conditional axiomatic synthesis）的严格姿态展开“**诸公理皆推论**”的蓝图：单凭抽象第 0 层绝不会无条件抹平有限与可数反例，但凡属比较核商化、内积奇偶折叠、效应可加延拓、生成树规范分解、内生秩一巴格曼—贝里射影和乐与离散路径乘积所能严格锁定的核心骨架，一律铸造为带 `lean=` 锚点的**六条形式化推论**（[@cor-ch32-extensionality-and-quotient]–[@cor-ch32-bargmann-holonomy-and-path-product]）；凡需跨越范畴商完备化、操作极小性筛选、曲率/估值/度规分支选择或高阶集合存在与连续统正则化的中间桥梁假设 `H1`–`H9`，一律在正文中亮明底牌，并在[附录 E](appendix-e.md) 中给出逐条反例审计。

## 28.3.1 数学基础公理的推论重铸：逻辑商集、算术素数与格拉姆几何 {#sec-ch32-6-1}

在传统数学基础中，莱布尼茨同一律、ZFC 外延与分类公理、皮亚诺后继与无穷素数、以及欧氏内积平行四边形律与格拉姆度规，分别散落在逻辑、算术与几何三套互不相干的公理表里。而在 $\mathcal{A}_0$ 下，它们依次是**比较核商化**、**正交与乘法新轴逃逸**及**第 1 层偶对称二次型刚性**的三条条件推论：

::: {.corollary #cor-ch32-extensionality-and-quotient title="关系外延性、连续划分因式分解、纤维重构与对角线逃逸" lean="D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode"}
在 `trureturing` 冻结的观测划分拓扑、概念纤维分解与相对语义对角线模块中，以下四项逻辑与集合论基础结论同时成立：

1. **比较核不可分性与商外延性**（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：对任意对象域 $X$、读出域 $B$ 与比较读出 $\mathrm{readout} : \operatorname{Concept}(X, B)$，划分拓扑不可分关系精确等于读出核，$\operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \iff \mathrm{readout}(x) = \mathrm{readout}(y)$；
2. **连续划分因式分解充要判据**（[`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition)）：在**非空**源域 $X$（`[Nonempty X]`）上，目标概念 $\mathrm{target} : \operatorname{Concept}(X, \mathrm{Output})$ 可经由比较坐标单值分解（$\operatorname{Refines}(\mathrm{target}, \mathrm{readout})$，即 $\exists f : B \to \mathrm{Output},\; \mathrm{target} = f \circ \mathrm{readout}$），当且仅当 $\mathrm{target}$ 从 $(X, \operatorname{partitionTopology}(\mathrm{readout}))$ 到离散空间 $(\mathrm{Output}, \perp)$ 连续；
3. **概念原像纤维无损重构**（[`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)）：对任意概念读出 $q_C : \operatorname{Concept}(X, B)$，原始域与比较纤维依值总和之间存在典范双射等价 $X \simeq \Sigma_{b : B}\,\operatorname{ConceptFiber}(q_C, b)$；
4. **无不动点扭转下的对角线逃逸**（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)）：设扭转映射 $\mathrm{twist} : \mathrm{Output} \to \mathrm{Output}$ 无不动点（$\forall y,\; \mathrm{twist}(y) \neq y$），给定任意潜坐标 $\mathrm{latent} : \operatorname{Concept}(\mathrm{Address}, \mathrm{Coordinate})$ 与解码目录 $\mathrm{decoderCatalog} : \mathrm{Address} \to \mathrm{Coordinate} \to \mathrm{Output}$，相对语义对角线映射对每一地址 $a$ 均严格逃逸出目录解码：$\operatorname{relativeSemanticDiagonal}(\mathrm{twist}, \mathrm{latent}, \mathrm{decoderCatalog}) \neq \mathrm{decoderCatalog}(a) \circ \mathrm{latent}$。
:::

::: proof
第 1 款由离散拓扑单点闭开集沿 $\mathrm{readout}$ 拉回直接给出；第 2 款利用第 1 款将向离散拓扑的连续性化为每条读出纤维上的常值性，并在 `[Nonempty X]` 下构造商因子映射 $f$；第 3 款把每个 $x \in X$ 映至依值对 $\langle q_C(x), \langle x, \mathrm{rfl}\rangle\rangle$ 并验证投影互逆；第 4 款在地址 $a$ 处展开对角线定义 $\mathrm{twist}(\mathrm{decoderCatalog}(a, \mathrm{latent}(a)))$，直接调用无不动点假设得严格不等。完整证明由 Lean 内核检查。
:::

[@cor-ch32-extensionality-and-quotient] 第 1–3 款表明，在桥梁 `H1`（`T1` 核商化）下，ZFC 外延公理与等价类商分解无需在原始集合上硬设，而可以重述为 $\mathcal{A}_0$ 条款 I 比较核商化的产物（范畴层面对齐忠实满米田嵌入 $y(X) = \mathrm{Hom}_{\mathcal{C}}(-, X)$，见 [@rem-ch32-comparison-axiom-literature]）；第 4 款则揭示了为什么无限制概括公理在二值布尔否定 $\mathrm{twist}(y) = \neg y$ 下必触发罗素—哥德尔式对角线逃逸，迫使 ZFC 分层受限，并与[§36.7–§36.8](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 的自指盲点及北极球极投影对偶遥相呼应（注：遗传有限集宇宙 $V_\omega$ 满足配对、幂集、替换与有限族选择而否定无穷，有限阶累积谱 $V_5$ 还在顶阶破坏配对与幂集，二者表明无穷集合以及顶阶配对与幂集仍属桥梁 `H9` 的外部集合论公理强度；替换与选择不由这两个模型见证，因为 $V_\omega$ 内部满足二者，而 $\mathcal{A}_0$ 本身有可定义的有限模型（取值 $1 \in \mathbb{F}_3$ 的单点），不在背景集合论之上增添任何存在强度，`手工推导`，完整边界与反例见[附录 E §E.2](appendix-e-s02-logic-and-quotients.md#sec-appe-logic)）。

接着看算术与数系：在第 1 层正自归一 $S(x, x) = +1$ 与开放正交余量假设下，加法步进、乘法素数新轴、复虚数单位与无进位齐肯多夫编码收束为第二条推论：

::: {.corollary #cor-ch32-successor-primes-and-zeckendorf title="正交余项后继逃逸、素数新轴突围、复四分之一转与齐肯多夫禁邻编码推论" lean="D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/Axis/PrimeAxisEscape.prime_axis_escape D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes"}
在 `trureturing` 冻结的正交残差逃逸、素数新轴突围、幺正复结构与齐肯多夫自动机模块中，以下四项算术与数系基础推论同时成立：

1. **正交余项单位后继逃逸**（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)）：设 $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$（`[RCLike 𝕜]`），$V$ 为完备希尔伯特空间，$S \le V$ 为完备闭子空间且正交补非平凡 $S^\perp \neq \bot$，则必存在单位正交新轴 $e \in S^\perp$ 满足 $\|e\| = 1$、$P_S(e) = 0$、$\operatorname{infDist}(e, S) = 1$ 且 $\|\mathrm{id}_V - P_S\| = 1$；
2. **欧几里得素数新轴突围**（[`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)）：对任意有限素数集 $S \subset \mathbb{N}$（$\forall p \in S,\; \operatorname{Nat.Prime}(p)$），记 $N_S := \prod_{r \in S} r + 1$，则对一切 $p \in S$ 恒有 $N_S \equiv 1 \pmod p$，且必存在新素数 $q \notin S$ 整除 $N_S$；
3. **纯差异反自伴幺正四分之一转**（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)）：对有限维复矩阵 $R \in M_n(\mathbb{C})$（`[Fintype n] [DecidableEq n]`），$R^\dagger = -R$ 与 $R R^\dagger = I_n$ 推出 $R^2 = -I_n$；
4. **齐肯多夫无进位禁邻编码**（[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)）：对任意二进制字 $\mathrm{word} \in \operatorname{List}(\operatorname{Fin} 2)$，自动机 `binaryZeckendorfBase` 接受该字当且仅当 $\operatorname{NoAdjacentOnes}(\mathrm{word})$。
:::

::: proof
第 1 款在非零正交补 $S^\perp$ 中取非零元归一化得 $\|e\| = 1$ 与 $P_S(e) = 0$，由勾股分解 $\|e - s\|^2 = 1 + \|s\|^2 \ge 1$ 锁定极小距离 $1$ 与残差算子范数 $1$；第 2 款由 $\prod_{r\in S} r \ge 1$ 得 $N_S \ge 2$，取其最小素因子 $q \mid N_S$，若 $q \in S$ 则 $q \mid \prod_{r\in S} r$ 迫使 $q \mid 1$ 矛盾；第 3 款由 $R^2 = -R R^\dagger = -I_n$ 直接得出；第 4 款对字长与前驱位归纳核验自动机转移表。完整证明由 Lean 内核检查。
:::

在桥梁 `H4` 的无穷维正交余量不竭假设（$\forall n,\; S_n^\perp \neq \bot$）下，[@cor-ch32-successor-primes-and-zeckendorf] 第 1–2 款分别驱动永不坍缩的后继步进与无穷素数正交基谱，第 3 款给出虚数单位 $i^2 = -1$ 的纯差异互易读法——该定理陈述在复矩阵上，作起源读法需改到实矩阵（见[附录 E §E.3](appendix-e-s03-arithmetic-and-completions.md#sec-appe-arithmetic)）（注意固定有限维 $D$ 上的北极球极同胚 $\Pi_N : S^D\setminus\{N\}\xrightarrow{\sim}\mathbb{R}^D$ 与三维桁架刚性锁死的是底空间拓扑/静力维数，并不自动免除希尔伯特维数不竭假设 `H4`，见[§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) 与[§36.8](ch38-s07-blindspot-and-relativization.md#sec-ch38-stereographic-blindspot-relativization-suspension)）；至于有理数域 $\mathbb{Q}$ 完备化为阿基米德实数域 $\mathbb{R}$ 抑或非阿基米德 $p$ 进域 $\mathbb{Q}_p$ 的二分法与阿代尔乘积守恒，以及从 $\mathbb{Q}[i]$ 到 $\mathbb{C}$ 的柯西完备化（`H3`），详见[第 35 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)（[@thm-ch36-ostrowski-padic-ball-and-blind-spot]、[@thm-ch36-crt-and-adelic-product-formula]）与[附录 E §E.3](appendix-e-s03-arithmetic-and-completions.md#sec-appe-arithmetic)。

在几何层面，第 1 层内积与共同相位不变性直接锁定平行四边形律、厄米二次型、拉格朗日面积分解与幺正格拉姆重构刚性：

::: {.corollary #cor-ch32-parallelogram-quadratic-and-gram title="实平行四边形律、共同相位二次代数、拉格朗日—格拉姆恒等式与幺正格拉姆重构推论" lean="D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq"}
在 `trureturing` 冻结的内积范数、共同相位多项式、量子界恒等式与格拉姆幺正延拓模块中，以下四项几何推论同时成立：

1. **实内积空间平行四边形范数律**（[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)）：在任意实内积空间 $E$（`[InnerProductSpace ℝ E]`）中，对一切 $x, y \in E$ 恒有 $\|x + y\|^2 + \|x - y\|^2 = 2(\|x\|^2 + \|y\|^2)$；
2. **共同相位不变多项式的二次厄米唯一表示**（[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)）：在有限指标集 $\iota$（`[Fintype ι]`）上，复坐标多项式的笛卡尔转换双射保持总次数与齐次性，全局共同相位不变性 $z \mapsto e^{i\theta}z$ 等价于共轭次数平衡且生成的代数恰为二次代数，每个实值二次齐次不变多项式具有**唯一**厄米表示矩阵 $H \in M_\iota(\mathbb{C})$（$p(z) = z^\dagger H z$，且非负性等价于 $H \succeq 0$）；
3. **拉格朗日—格拉姆二态面积恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意有限集 $s : \operatorname{Finset}\;\iota$ 与 $u, v : \iota \to \mathbb{R}$，恒有 $(\sum_{i\in s} u_i^2)(\sum_{i\in s} v_i^2) - (\sum_{i\in s} u_i v_i)^2 = \frac{1}{2}\sum_{i\in s}\sum_{j\in s}(u_i v_j - u_j v_i)^2$；
4. **成对格拉姆矩阵相等蕴含整体幺正合同刚性**（[`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)）：设 $m$ 为有限可判定类型（`[Fintype m] [DecidableEq m]`），$n$ 为有限类型（`[Finite n]`），对任意复矩阵 $A, B \in M_{m \times n}(\mathbb{C})$，若两两内积格拉姆矩阵相等 $B^\dagger B = A^\dagger A$，则必存在幺正矩阵 $U \in \operatorname{unitaryGroup}(m, \mathbb{C})$ 使得 $B = U A$。
:::

::: proof
第 1 款展开 $\|x \pm y\|^2 = \|x\|^2 \pm 2\langle x, y\rangle_{\mathbb{R}} + \|y\|^2$ 相加消去交叉项；第 2 款利用傅里叶模式正交性筛出 $z_j \bar{z}_k$ 平衡单项式，并由极化恒等式唯一确定厄米核 $H$；第 3 款展开反对称平方双重和即得；第 4 款在列空间上构造保持内积的部分等距算子，再把正交补子空间标准正交基等距配对延拓为全空间幺正阵 $U$。完整证明由 Lean 内核检查。
:::

由范数反向恢复内积需调用约当—冯·诺依曼逆定理（`H3`），由一般实对称半正定表 $G \succeq 0$ 嵌入欧氏空间需调用勋伯格定理（`H2`，均属文献结果，见 [@rem-ch32-comparison-axiom-literature]）；而欧几里得第五平行公设在切平面线性化（零曲率）、第 1 层单位球面公平（正曲率倾斜三面角原胞 $\Delta\mathcal{T}_\epsilon$ 与三元自举，见[§29.5–§29.6](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)）与双曲相对快度（负曲率）间的 `T3` 三分机制，以及完全图 $K_N$ 麦克斯韦—拉曼三维刚性锁（[§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)），详见[附录 E §E.4](appendix-e-s04-metric-and-gram-curvature.md#sec-appe-geometry)。

## 28.3.2 量子力学核心公设的推论重铸 {#sec-ch32-6-2}

传统量子力学教材将复希尔伯特态空间、玻恩迹定则与投影更新、海森堡测不准、薛定谔幺正流及复合多粒子规则列为五条独立公设。在 $\mathcal{A}_0$ 下，尤其是把概率可加性从正交投影格（经桥梁 `H5`）延拓到全部测量效应 $0 \le E \le I$ 后，连格里森定理留下的二维单量子比特缺口（投影可加性在 $d = 2$ 下容许光滑奇三次反例 $f(P_{\mathbf{r}}) = \frac{1}{2}(1 + r_z^3)$）也被有限维布施效应定理一举封死：

::: {.corollary #cor-ch32-quantum-postulates-core title="有限维效应可加玻恩密度定理、秩一配对坍缩权重、罗伯逊—薛定谔测不准与连通射线刚性推论" lean="D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests"}
在 `trureturing` 冻结的效应概率延拓、秩一条件化、罗伯逊—薛定谔界与连通射线相位刚性模块中，以下四项量子基础核心推论同时成立：

1. **有限维布施效应可加玻恩密度唯一表示**（[`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation)）：设 $d$ 为有限可判定指标类型（`[Fintype d] [DecidableEq d]`），若映射 $p : \operatorname{CStarMatrix}\;d\;d\;\mathbb{C} \to \mathbb{R}$ 在一切效应 $0 \le E \le I$ 上非负（$p(E) \ge 0$）、对满足 $0 \le E, F$ 且 $E + F \le I$ 的效应对有限可加（$p(E + F) = p(E) + p(F)$）且归一化 $p(I) = 1$，则**存在唯一**密度矩阵 $\rho \in M_d(\mathbb{C})$ 满足 $\rho \succeq 0$、$\operatorname{Tr}\rho = 1$ 且对一切效应 $E$ 恒有 $\operatorname{Tr}(\rho E) = p(E)$；
2. **秩一记录测量的玻恩重叠模方权重与未读凸分解**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：在有限维空间（`[Fintype n] [DecidableEq n] [Fintype kappa]`）上，对记录测量族 $P$（`IsRecordMeasurement P`）、密度态 $\rho \succeq 0$（$\operatorname{Tr}\rho = 1$）、秩一投影 $P_k = |\phi\rangle\langle\phi|$ 与纯态 $\rho = |\psi\rangle\langle\psi|$，第 $k$ 支记录权重精确等于重叠模方 $w_k = |\langle\phi \mid \psi\rangle|^2 = \operatorname{Tr}(\rho P_k)$，且未读态等于条件态按记录权重的凸组合 $\rho_{\mathrm{unread}} = \sum_j w_j\,\rho_{|j}$；
3. **罗伯逊—薛定谔方差—协方差—对易子面积精确分解**（[`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)）：在任意复内积空间 $E$（`[InnerProductSpace ℂ E]`）上，对对称 $\mathbb{C}$-线性算子 $A, B : E \to_l E$ 与单位态 $\|\psi\| = 1$，中心化涨落 $u = (A - \langle A\rangle)\psi$、$v = (B - \langle B\rangle)\psi$ 满足 $\|u\|^2\|v\|^2 = \mathrm{cov}^2 + \|C_{1/2}\|^2 + G$，其中格拉姆楔积亏量 $G \ge 0$，$\operatorname{Re}\langle u, v\rangle_{\mathbb{C}} = \mathrm{cov}$ 且 $(\operatorname{Im}\langle u, v\rangle_{\mathbb{C}} : \mathbb{C}) = C_{1/2} = \frac{1}{2i}\langle\psi, (AB - BA)\psi\rangle_{\mathbb{C}}$；
4. **连通射线测试族下的幺正全局相位刚性**（[`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)）：在有限维空间（`[Fintype ι] [DecidableEq ι]`）上，若幺正矩阵 $A \in U(\iota, \mathbb{C})$ 保持全部坐标基射线 $e_i$ 及支集连通测试族 $T \subseteq (\iota \to \mathbb{C})$（`RaySupportConnected T`）中的每一条射线不变，则必存在单位模复标量 $c \in \mathbb{C}$（$\|c\| = 1$）使得 $A = c I$。
:::

::: proof
第 1 款由非负性与有限可加性推出效应单调性与实齐次性，正齐次延拓至半正定锥并按正负部与自伴实虚部延拓为全矩阵代数上的正线性泛函 $L$，取对偶得 $\rho \succeq 0$ 且由效应张成全矩阵证得唯一性；第 2 款直接计算迹配对 $\operatorname{Tr}(|\psi\rangle\langle\psi|\,|\phi\rangle\langle\phi|) = |\langle\phi\mid\psi\rangle|^2$ 并按非零权重分支核验条件态归一化还原；第 3 款将 $\langle u, v\rangle_{\mathbb{C}}$ 拆为对称反对易实部 $\mathrm{cov}$ 与反对称对易虚部 $C_{1/2}$，结合柯西—施瓦茨亏量 $G \ge 0$ 即得；第 4 款由坐标射线不变性先将 $A$ 对角化为相位阵 $\operatorname{diag}(d_i)$，再沿支集连通图边将两两叠加测试态相位逐边锁齐为同一单位复数 $c$。完整证明由 Lean 内核检查。
:::

把 [@cor-ch32-parallelogram-quadratic-and-gram] 与 [@cor-ch32-quantum-postulates-core] 的 `LEAN ✓` 核心同[附录 E §E.5](appendix-e-s05-quantum-postulates.md#sec-appe-quantum) 审计的操作桥梁假设并排对照，五大公设的逻辑地基纤毫毕现：（I）平行四边形极化对称配度量柯西完备化（`H3`）给出复希尔伯特空间；（II）有限维效应有限可加性（`H5`）唯一钉死玻恩迹公式 $\operatorname{Tr}(\rho E)$，而**可重复最小扰动**操作假设（`H6`）将吕德斯投影更新同抹除原态的固定重置信道区分开；（III）奇偶平方折叠直接给出罗伯逊—薛定谔测不准恒等式；（IV）保持两两比较内积只保证等距算子 $U^\dagger U = I$（无穷维 $\ell^2(\mathbb{N})$ 上的单侧移位算子即保持全部内积却非满射），必须显式附加**双侧动力学可逆满射性** $UU^\dagger = I$（有限维自动满足）、时间强连续单参数群假设以及**特定自伴哈密顿生成元 $H$ 的选定**（`H6`，再经斯通定理导出薛定谔演化，因为 $H = 0$ 与 $H = \sigma_z$ 共居同一态空间却生成截然不同的演化）；（V）复合系统由**复局域层析完备极小性**（`H7`）唯一选定复张量积 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$（排除具有多余局域双线性不变量 $J\otimes J$ 的实双比特空间及含暗扇区的 $(\mathcal{H}_1\otimes\mathcal{H}_2)\oplus\mathcal{K}$），而全同费米子泡利不相容则源于置换群**奇反对称外幂支段 $\bigwedge^N\mathcal{H}$** 上的自身零外积 $e_i \wedge e_i = 0$。

## 28.3.3 相对论零光锥、规范和乐、内生贝里几何、离散路径乘积与热力学第二定律推论 {#sec-ch32-6-3}

当比较预算扩展到宏观时空、多站点局域纤维与粗粒化开放演化时，将单位公平圆 $\cos^2\theta + \sin^2\theta = 1$ 的求同分量读作固有时留存比 $d\tau/dt$、求异分量读作空间推进比 $dx/(c\,dt)$，移项即重排为闵可夫斯基线元 $c^2 d\tau^2 = c^2 dt^2 - dx^2$（`MODEL`）；而在内核定理层，零光锥度规刚性、有向图规范和乐分类、捏合相干删除熵产与有偿比较步数共同凝结为第五条推论：

::: {.corollary #cor-ch32-minkowski-holonomy-and-second-law title="闵可夫斯基零光锥度规刚性、生成树锚定规范和乐、捏合相干删除熵产与付费名字比较推论" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity D5/S0/Computability/BinaryNameComparison.name_compare_run"}
在 `trureturing` 冻结的光锥刚性证书、锚定相位分类、相干删除熵产与二元名字比较模块中，以下四项时空、规范、热力学与计算推论同时成立：

1. **闵可夫斯基零光锥二次型标量刚性**（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)）：对任意空间维数 $d \in \mathbb{N}$ 与 $\mathrm{Space}(d) = \mathbb{R} \times \mathbb{R}^d$ 上的实二次型 $S$，若 $\forall v,\; \operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$，则必有 $S = S(1, 0)\bullet \operatorname{minkowski}_d$；
2. **生成树锚定规范相位的余切弦和乐完备分类**（[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)）：在带命名生成树 `NamedSpanningTree s t T` 与非空锚集 $r \in R \subseteq V$（$|V|=n, |E|=m, |R|=k$）的有限有向图上，圆值边相位模去锚定上边缘子群 $N$ 的规范商群满足连续群同构 $(E \to \mathrm{Circle})/N \simeq_{\mathrm{top}*} \operatorname{Coordinates}(T, R, r) \simeq_{\mathrm{top}*} (\operatorname{Fin}(m + k - n) \to \mathrm{Circle})$；
3. **幺正演化接基捏合的相干删除非负熵产恒等式**（[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)）：在有限维空间（`[Fintype n] [DecidableEq n]`）上，对幺正矩阵 $U \in U(n, \mathbb{C})$ 与递推 $\rho(k+1) = \operatorname{basisPinchingState}(U\rho(k)U^\dagger)$，单步冯·诺依曼熵增精确等于非负量子相对熵 $S_{\mathrm{vN}}(\rho(k+1)) - S_{\mathrm{vN}}(\rho(k)) = D\bigl(\rho_U(k) \,\Vert\, \Pi(\rho_U(k))\bigr) \ge 0$，且 $N$ 步总熵增等于逐拍相对熵累加和；
4. **可逆二元名字比较的线性步数代价**（[`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)）：有限状态机 `compareMachine` 在至多 $2(|a| + |b|) + 4$ 步内输出相等判别位 $\operatorname{decide}(a = b)$ 并无损复原输入纸带 $a, b$ 与上下文栈。
:::

::: proof
第 1 款在反向类光向量对 $(\pm\|w\|, w)$ 上极化消去时空交叉项并锁定空间各向同性比例 $-S(1,0)\|w\|^2$；第 2 款沿唯一树路径建立连续规范截面，把物理自由度分解为 $m+1-n$ 条余切弦回路与 $k-1$ 个相对锚点相位；第 3 款利用幺正等谱性 $S_{\mathrm{vN}}(\rho_U) = S_{\mathrm{vN}}(\rho)$ 与基捏合勾股迹恒等式 $\operatorname{Tr}(\rho_U \log \Pi(\rho_U)) = \operatorname{Tr}(\Pi(\rho_U)\log\Pi(\rho_U))$ 将熵差化为非负相对熵并裂项求和；第 4 款由扫描栈与复原栈两趟计数给出。完整证明由 Lean 内核检查。
:::

沿着下方预算光锥实验卡拖动倾角 $\theta$，可以直观看到单位公平圆如何随项序重排展开为闵可夫斯基零光锥：

::: {.viz src="comparison-oisc-engine" preset="budget-cone" height="520"}
**同一笔公平预算改写项序，预算圆就打开成闵可夫斯基光锥。** 拖动圆上的琥珀色分配点将倾角 $\theta$ 从 $0^\circ$ 扫向 $90^\circ$：青色分量 $\cos\theta = d\tau/dt$ 是固有时留存，品红分量 $\sin\theta = dx/(c\,dt)$ 是空间存异推进；当 $\theta = 90^\circ$ 时 $dx = c\,dt$、$d\tau = 0$，世界线贴上光锥（预算重排读法属 `MODEL`，零锥二次型刚性 `eq_smul_minkowski_of_null` 标 `LEAN ✓`）。
:::

进一步回望[第 28.1 节](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)对第 1 层与第 2 层边界的校准：既然单纤维上未经投影的原始克利福德向量边乘法满足 $(ab)(bc)(ca) = a b^2 c^2 a = \mathbf{1}$，第 1 层内部究竟能否不假外求地生出非平凡射影和乐与离散历史振幅？答案就锁在秩一布洛赫矩阵闭环与离散外积链的**第六条形式化推论**中：

::: {.corollary #cor-ch32-bargmann-holonomy-and-path-product title="单比特三态巴格曼迹分解、正交卦限定向和乐与离散秩一路径乘积推论" lean="D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product"}
在 `trureturing` 冻结的单比特巴格曼不变量与离散巴格曼路径模块中，记布洛赫仿射矩阵 $P(\mathbf{r}) := \frac{1}{2}(I_2 + \mathbf{r}\cdot\boldsymbol{\sigma})$（$\mathbf{r} \in \mathbb{R}^3$；注意下述迹恒等式本身**无需**预设单位模长，而 $P(\mathbf{r})$ 成为秩一纯态投影算子当且仅当 $\|\mathbf{r}\| = 1$）与外积矩阵 $R_j := \Psi_j \Psi_j^\dagger$，以下三项有限阶精确结论同时成立：

1. **三态巴格曼—布洛赫迹的实偶内积与虚奇混合积分解**（[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)）：对**任意**三个三维实向量 $\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3 \in \mathbb{R}^3$，三矩阵闭环乘积的迹精确拆分为实部对称两两内积和与虚部反对称有向体积（标量三重积）：

   $$
   \operatorname{Tr}\bigl(P(\mathbf{r}_1)P(\mathbf{r}_2)P(\mathbf{r}_3)\bigr) \;=\; \frac{1 + \mathbf{r}_1\cdot\mathbf{r}_2 + \mathbf{r}_2\cdot\mathbf{r}_3 + \mathbf{r}_3\cdot\mathbf{r}_1}{4} \;+\; i\,\frac{\mathbf{r}_1\cdot(\mathbf{r}_2 \times \mathbf{r}_3)}{4};
   $$

2. **标准正交八分卦限上的非零内生射影和乐与定向手性反转**（[`explicit_qubit_orientation`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation)）：取标准正交单位坐标轴 $(\mathbf{e}_3, \mathbf{e}_1, \pm\mathbf{e}_2)$，单纤维三态投影闭环给出非零虚部 $\pm\frac{1}{4}$ 与幅角 $\pm\frac{\pi}{4}$（直接与原始未投影克利福德乘法 $(ab)(bc)(ca) = \mathbf{1}$ 的平坦性形成鲜明对照）：

   $$
   \operatorname{Tr}\bigl(P(\mathbf{e}_3)P(\mathbf{e}_1)P(\mathbf{e}_2)\bigr) \;=\; \frac{1 + i}{4}, \qquad \operatorname{Tr}\bigl(P(\mathbf{e}_3)P(\mathbf{e}_1)P(-\mathbf{e}_2)\bigr) \;=\; \frac{1 - i}{4};
   $$

3. **任意有限步离散秩一链的巴格曼循环重叠乘积恒等式**（[`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product)）：对任意步数 $n \in \mathbb{N}$ 与任意二分量复向量序列 $\Psi : \operatorname{Fin}(n+1) \to \mathbb{C}^2$（无需预设单位模长），记外积算子 $R_j := \Psi_j \Psi_j^\dagger$ 并采用第一变元共轭内积约定 $\langle u, v\rangle := u^\dagger v$，则有限外积链的迹精确等于逐拍相邻内积与首尾闭合内积的循环乘积：

   $$
   \operatorname{Tr}(R_0 R_1 \cdots R_n) \;=\; \left(\prod_{j=0}^{n-1} \langle \Psi_j, \Psi_{j+1}\rangle\right)\langle \Psi_n, \Psi_0\rangle.
   $$
:::

::: proof
第 1 款将 $P(\mathbf{r}_k) = \frac{1}{2}(I_2 + \mathbf{r}_k\cdot\boldsymbol{\sigma})$ 代入三因子乘积，利用泡利矩阵代数 $(\mathbf{a}\cdot\boldsymbol{\sigma})(\mathbf{b}\cdot\boldsymbol{\sigma}) = (\mathbf{a}\cdot\mathbf{b})I_2 + i(\mathbf{a}\times\mathbf{b})\cdot\boldsymbol{\sigma}$ 与无迹性 $\operatorname{Tr}(\sigma_c) = 0$、$\operatorname{Tr}(I_2) = 2$ 逐项收集实部与虚部（详见[第 10 章](ch10-gram-geometry-and-order.md) [@thm-qubit-bargmann-bloch]）；第 2 款在两两正交基 $\mathbf{e}_a\cdot\mathbf{e}_b = 0$（$a\neq b$）与右手混合积 $\mathbf{e}_3\cdot(\mathbf{e}_1\times(\pm\mathbf{e}_2)) = \pm 1$ 上直接求值；第 3 款沿有限列表归纳，利用结合律将相邻秩一外积收缩为标量内积 $(\Psi_j\Psi_j^\dagger)(\Psi_{j+1}\Psi_{j+1}^\dagger) = \langle\Psi_j, \Psi_{j+1}\rangle\,\Psi_j\Psi_{j+1}^\dagger$，最终对首尾秩一矩阵取迹 $\operatorname{Tr}(\Psi_0\Psi_n^\dagger) = \Psi_n^\dagger\Psi_0 = \langle\Psi_n, \Psi_0\rangle$（一般有限维原型见[第 3 章](ch03-projectors-and-duality.md) [@thm-rank-one-chain-trace]）。完整证明由 Lean 内核检查。
:::

把 [@cor-ch32-bargmann-holonomy-and-path-product] 的有限阶精确结论同[§29.5–§29.13](ch34-s04-infinitesimal-trihedron.md)、[§33.1–§33.4](ch34-s13-point-volume-octave.md) 及[§36.7–§36.8](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 的后续推进合并审视，我们可以将“哪些物理问题已在第 1 层内生解决、哪些仍受 `H1`–`H9` 严格界定”彻底厘清（完整反例审计见[附录 E §E.6](appendix-e-s06-spacetime-gauge-and-thermodynamics.md#sec-appe-spacetime)）：

- **第 1 层内生贝里—霍普夫射影和乐与球扇形锥体积锁死（[§29.7](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)）**：在单位布洛赫纯态射线 $\|\mathbf{n}\| = 1$ 上，三维斯托克斯定理将球扇形锥体积严格锁死为球冠面积与立体角的三分之一，$V_{\mathrm{sector}}(\Sigma_2) = \frac{1}{3}A_{\mathrm{cap}}(\Sigma_2) = \frac{1}{3}\Omega(\Sigma_2)$（`手工推导`）；与此同时，霍普夫纤维丛 $S^1 \hookrightarrow S^3 \to S^2$ 上的潘查拉特纳姆—巴格曼—西蒙—贝里几何将旋量水平抬升和乐锁定为半立体角与负二分之三锥体积，$\gamma_B \equiv -\frac{1}{2}\Omega = -\frac{3}{2}V_{\mathrm{sector}} \pmod{2\pi}$（`文献结果`；此处必须严格区分 $S^3 \to S^2$ 上的连续 $\mathrm{U}(1)$ 霍普夫联络水平抬升与[第 5 章](ch05-complex-phase-and-rotors.md)及 §29.7 中 `circle_double_cover_history_lift` 所刻画的一维平方映射 $z \mapsto z^2$ 离散 $\mathbb{Z}_2$ 双叶符号翻转 $(-1)^k$ 原型）。这意味着单纤维射影 $\mathrm{U}(1)$ 几何相位已在第 1 层内生闭环，唯有**跨时空基点独立索引的局域纤维丛 $\{\mathcal{H}_x, U_{xy}\}$ 与杨—米尔斯场方程**才真正属于第 2 层桥梁 `H8`–`H9`。
- **平稳作用量原理 $\delta S = 0$ 的四阶条件桥梁阶梯**：上述推论框架尚未显式纳入经典分析力学的核心公设——哈密顿平稳作用量原理 $\delta S = 0$；结合 [@cor-ch32-bargmann-holonomy-and-path-product] 第 3 款，它并非无条件纯态恒等式，而是经由**四级显式条件阶梯**逐级浮现：（i）`bargmann_path_product`（`LEAN ✓`）精确给出**单条**离散秩一比较链的循环重叠乘积，本身尚非对一切中间历史的求和；（ii）在离散时间切片间插入完备分解 $I = \sum_\alpha P_\alpha$ 并赋予跨拍演化权重，必须引入桥梁 `H6` 下的**外部哈密顿生成元 $H$**（在同一态空间上取 $H = 0$ 与 $H = \sigma_z$ 会产生截然不同的传播子，直接证伪“单凭纯运动学态空间自动生出动力学”）；（iii）从有限切片过渡到连续时间自旋相干态或位形空间路径积分，必须引入桥梁 `H9` 下的**连续统泛函测度与正则化输入**（`文献结果`：Klauder 1979 相干态正则化、Wiener/Kac 欧氏测度，以及 Cameron 1960 复测度不可行定理；并见[§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) 对光滑群流 `trotter_product` 矢高 $O(1/N)$ 消隐与费曼—伊藤扩散标度 $\epsilon \sim 1/\sqrt{N}$ 下 $O(1)$ 矢高存留的精确区分）；（iv）最终在短波 / 大相位渐近极限下，偏离极值轨道的科纽螺线（Cornu spiral）高频相位相消干涉筛选出平稳作用量轨道 $\delta S = 0$（`文献结果`，NIST/Olver 稳相近似；注意平稳点 $\delta S = 0$ 未必是全局极小值，且有限尺度下始终伴随 $O(\hbar)$ 量子修正，详见[第 25 章](ch29-timeless-causality-and-gram-space.md)与[§29.7–§29.8](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral)）。
- **三维桁架刚性、八度概念塔与相对化复杂性盲点的精确边界（§29.11–§29.13、§33.1–§33.4，§36.7–§36.8）**：[§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) 证明完全图 $K_N$ 的麦克斯韦—拉曼自由度赤字在三维满足 $\Delta E(3) = \Delta E(4) = 0$（$d$ 维中同样在 $N = d, d+1$ 处为零，故这一计数并不单独锁定三维，取宏观底空间为三维属 `MODEL`），但希尔伯特态空间维数 `H4` 与复合张量层析 `H7` 依然保持独立；[§29.13](ch34-s12-triadic-duality.md)、[§33.1–§33.4](ch34-s13-point-volume-octave.md) 进一步建立有限泊松粒子—场对偶互易（`finite_poisson_summation`，`LEAN ✓`）、外代数 `1—3—3—1` 层级重置 $\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$ 与德洛内紫外装球下界 $r_{\mathrm{pack}} = \frac{1}{2} > 0$、$\mathcal{Cl}_{3,0}(\mathbb{R})$ 体积伪标量 $\mathbf{I}_3^2 = -1$ 代数负号、量子门对易子曲率 $\gamma_{\mathrm{gate}}(\epsilon) = \Omega(\Delta\mathcal{T}_\epsilon) + O(\epsilon^4)$ 以及嘉当—CCWZ 陪集 $G/H$ 破缺—守恒二象分解（`MODEL` / `文献结果`），而全局双曲偏微分方程因果光锥、时空规范场 $A_\mu(x)$ 动力学、手征标准模型汤川参数以及四维杨—米尔斯质量间隙仍严格留驻于 `H8`–`H9`（`OPEN`）；与此同时，[§36.7–§36.8](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) 以哥德尔对角线逃逸、北极球极投影 $\Pi_N : S^D\setminus\{N\} \xrightarrow{\sim} \mathbb{R}^D$ 与贝克—吉尔—索洛维（Baker–Gill–Solovay）神谕相对化定理阐明了围绕自指盲点的双投影张力，同时将无神谕标准图灵机猜想 $\mathrm{P}\stackrel{?}{=}\mathrm{NP}$ 严格保持为开放问题 `OPEN`（[@prob-ch38-unrelativized-p-vs-np-and-independence]）。

## 28.3.4 中间桥梁假设四分类总览与外部文献边界 {#sec-ch32-6-4}

将上述六条形式化推论链中的全部中间桥梁假设汇总审视，它们与[附录 E §E.7](appendix-e-s07-intermediate-hypotheses-audit.md#sec-appe-audit-table) 的权威主审计表（[@rem-appe-master-audit-table]）严格一一对齐，落入四个层次分明的认识论类别：

::: {.remark #rem-ch32-comparison-axiom-literature title="比较公理推论链的中间假设四分类总览与外部文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 为严守认识论透明性，本节从 $\mathcal{A}_0$ 通往各学科公理的九条桥梁假设 `H1`–`H9` 与[附录 E §E.7](appendix-e-s07-intermediate-hypotheses-audit.md#sec-appe-audit-table) 逐号锁定，按性质分为四类——**`T1` 典范商化与完备化构造**（由泛性质唯一决定的数学闭操作）、**`T2` 操作测量与复合极小性归约**（由实验室操作可区分性导出的结构筛选）、**`T3` 符号差 / 估值 / 曲率 / 置换奇偶分支选择**（同一母方程下的有限分类相分支）与 **`T4` 实质公理 / 动力学强度及开放问题**（超出有限两两比较的无穷存在性、连续统泛函测度或未决难题 `OPEN`）：

| 编号 | 中间桥梁假设（与附录 E §E.7 一一对应） | 分类 | 作用的推论链与被排除的极小反例 | 核心 `LEAN ✓` / 外部文献锚点 |
| :--- | :--- | :---: | :--- | :--- |
| **`H1`** | 比较核商化 $X/{\sim_{\mathrm{CMP}}}$（并保留 $2 \in \mathcal{A}^\times$；仅有 $\operatorname{char}\neq 2$ 不够，$\mathbb{Z}/6\mathbb{Z}$ 中 $2\cdot 3 = 0$，`手工推导`） | `T1` | 消除不可测冗余核导出商外延性；排除非商集重名对象与特征 $2$ 奇偶坍缩反例 | `partition_inseparable_iff_kernel`、`future_word_orthogonal_residual`（`LEAN ✓`）；Yoneda（1954） |
| **`H2`** | 正自配对 $S(x,x)=+1$、简单二阶椭圆双向量 $(x\wedge y)^2=-\|x\wedge y\|^2\mathbf{1}$ 与 $n$ 点格拉姆半正定 $G \succeq 0$ | `T3` + 第 1 层 | 第 0 层升第 1 层并解锁球面三面角角超 $\Omega(\epsilon)>0$（对比切平面 $\kappa=0$ 与双曲 $\kappa<0$ 分支）；排除 $S=-1$、对偶数 $A^2=0$、分裂复数 $j^2=+1$、$\mathcal{Cl}_{4,0}$ 公平元 $\tfrac{1}{2}(1+e_1e_2)(1+e_3e_4)$ 的四秩奇部（平方非标量，`手工推导`）与违背三角不等式的伪表 $\det S=-3<0$ | `lagrange_gram_identity`、`tetra_defects_incidence_repair_and_exactness`（`LEAN ✓`）；Schoenberg（1935） |
| **`H3`** | 平行四边形极化对称性与度量柯西完备化 | `T2` + `T1` | 由范数唯一恢复内积并填平有理缝隙；排除 $\ell^p$（$p\neq 2$）范数空间与未完备内积前希尔伯特空间 $\mathbb{Q}^n$、$\mathbb{Q}[i]^n$ | `inner_product_norm_parallelogram_law`（`LEAN ✓`）；Jordan & von Neumann（1935） |
| **`H4`** | 正交余量不竭 $S_n^\perp \neq \bot$、$R^2=-I$ 偶数实维/复载体与奥斯特洛夫斯基估值选择（$\mathbb{R}$ 对 $\mathbb{Q}_p$） | `T2`/`T4` + `T3` | 供给无限后继步与复结构载体并选定阿基米德或 $p$ 进完备分支；排除有限维封顶 $\mathbb{C}^N$、奇数实维空间 $\mathbb{R}^{2m+1}$（注：固定维 $\Pi_N:S^D\setminus\{N\}\xrightarrow{\sim}\mathbb{R}^D$ 与三维 $K_N$ 桁架刚性不自动免除 $\dim\mathcal{H}=\infty$） | `finite_layer_projection_escape`、`prime_axis_escape`、`square_eq_neg_one_of_skewAdjoint_unitary`（`LEAN ✓`）；Ostrowski（1918） |
| **`H5`** | 有限维全效应（POVM）有限可加性 $0 \le E \le I$ 或有限复维 $d \ge 3$ 星投影正交可加性（实空间与无穷维格另需可数可加性） | `T2` | 唯一钉死有限维玻恩密度迹公式 $p(E)=\operatorname{Tr}(\rho E)$（$d \ge 2$）与星投影实部迹公式 $p(P)=\operatorname{Re}\operatorname{Tr}(\rho P)$（有限复维 $d \ge 3$）；封死 $d=2$ 仅在正交投影上可加的不连续半球示性函数与光滑奇三次反例 $f(P_{\mathbf{r}})=\frac{1}{2}(1+r_z^3)$ | `effect_density_representation`、`gleason_representation`（`LEAN ✓`）；实希尔伯特空间与无穷维投影／效应格上的 Gleason（1957）、Busch（2003） |
| **`H6`** | 可重复最小扰动吕德斯条件化、双侧可逆满射性 $UU^\dagger=I$ 及时间强连续性 + 特定哈密顿量 $H$ 选定 | `T2` + `T4` | 排除抹除原态的固定重置仪器、$\ell^2(\mathbb{N})$ 单侧移位等距算子与时间哈默尔基型不连续自同构；为薛定谔流与平稳作用量阶梯供给动力学相位输入（对比同一态空间上 $H=0$ 与 $H=\sigma_z$） | `rank_one_born_pairing_weight`、`unitary_phase_of_connected_ray_tests`（`LEAN ✓`）；Stone（1932） |
| **`H7`** | 复局域层析极小性 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$ 与全同置换奇反对称表示 $\bigwedge^N\mathcal{H}$ | `T2` + `T3` | 唯一锁定复合复张量积并导出费米子泡利不相容原理；排除含多余双线性不变量 $J\otimes J$ 的实双比特、暗直和扇区 $\oplus\mathcal{K}$ 与对称玻色支 $\operatorname{Sym}^N\mathcal{H}$ | Hardy（2001），Chiribella–D'Ariano–Perinotti（2011），Pauli（1940） |
| **`H8`** | 洛伦兹因果锥符号差 $(1,d)$、跨时空基点局域纤维联络 $U_{xy}$（超越第 1 层内生射影贝里 $\mathrm{U}(1)$ 和乐）与保单位基捏合 $\mathcal{E}_P(I)=I$ | `T3` + `T2` | 区分正定欧氏无因果锥指标、原始克利福德平坦回路 $(ab)(bc)(ca)=\mathbf{1}$、第 1 层单纤维内生贝里和乐与第 2 层时空规范丛，并排除破坏热量守恒或等距零熵增的可逆扩维；导出光锥刚性与 $\Delta S_{\mathrm{vN}} \ge 0$ | `eq_smul_minkowski_of_null`、`anchored_phase_classification`、`triple_bargmann_bloch`、`entropy_production_coherence_deletion_identity`（`LEAN ✓`）；Bargmann（1964），Simon（1983），Berry（1984），Wilczek & Zee（1984），Yang & Mills（1954） |
| **`H9`** | 高阶 ZFC 集合存在（无穷 / 幂集 / 替换 / 选择）、连续统路径积分与 `3+1D` 相互作用量子场论泛函测度及复杂性下界 | `T4` / `OPEN` | 有限模型 $V_5$（$65{,}536$ 元，否定无穷与顶阶配对/幂集）及可数模型 $V_\omega$（满足配对/幂集/替换但否定无穷）表明无穷与顶阶配对、幂集不可由商外延推出（替换与选择在 $V_\omega$ 内部成立，不由这两个模型见证；$\mathcal{A}_0$ 有可定义的有限模型，不增添存在强度，`手工推导`）；支撑条件稳相阶梯 $\delta S=0$，而 `3+1D` 杨—米尔斯质量间隙与无神谕 $\mathrm{P}\stackrel{?}{=}\mathrm{NP}$ 严格保持 `OPEN` | `relative_semantic_diagonal_ne_listed_decode`、`bargmann_path_product`、`trotter_product`、`name_compare_run`（`LEAN ✓`）；Feynman（1948），Klauder（1979），Baker–Gill–Solovay（1975），Mavaddat & Parhami（1988） |

全部外部经典文献定理——Mavaddat & Parhami（1988）的单指令计算机（URISC）图灵完备性、米田引理（Yoneda 1954）、Ostrowski（1918）有理数绝对值分类定理、Jordan & von Neumann（1935）平行四边形逆定理、Schoenberg（1935）半正定等距嵌入定理、实希尔伯特空间与无穷维闭子空间上的 Gleason（1957）测度定理及无穷维 Busch（2003）效应测度定理、Stone（1932）单参数幺正群定理、Bargmann（1964）射影相位不变量、Simon（1983）与 Berry（1984）阿贝尔几何相位联络、Wilczek & Zee（1984）简并子空间非阿贝尔和乐、Feynman（1948）与 Klauder（1979）路径积分表示、Hardy（2001）与 Chiribella–D'Ariano–Perinotti（2011）局域层析张量重构定理、Pauli（1940）自旋—统计定理、Yang & Mills（1954）非阿贝尔规范场论以及 Baker–Gill–Solovay（1975）神谕相对化屏障定理——均严格作为文献边界引用，详细推导与反例核验见[附录 E](appendix-e.md)。
:::

走进下方的宇宙极简比较机与零背景比较公理完整交互沙盘，读者可以在“原语—显影—折痕—开维”四个场景与六张实验卡之间自由切换，亲手核验本节各推论核心的几何对应：

::: {.viz src="comparison-oisc-engine" height="620"}
**宇宙极简比较机与零背景比较公理：完整实验室。** 四个场景与六张实验卡共用一套两两比较原语：拖动琥珀色控制项，依次核验八槽同异拆分与 $\hat{I}^2 = -1$、二十八次比较谱分解出的三维八角盒、公平平方的同² 加楔² 下界、预算圆改写光锥、残差立为新轴以及前缀树逃逸对与自比较蛛网；绿色 `LEAN ✓` 严格对应页面引用的冻结定理，文献结果、`OPEN` 与本书 `MODEL` 分层标定。
:::

至此，在第 0–2 层实现结构与九条透明桥梁假设 `H1`–`H9`（`T1`–`T4` / `OPEN`）的严密分层下，统摄数学与物理公理核心的六条形式化推论（[@cor-ch32-extensionality-and-quotient]–[@cor-ch32-bargmann-holonomy-and-path-product]）已完成条件公理化合龙，既纳入了第 1 层内生贝里几何与离散路径乘积的全新突破，又毫不妥协地保留了每一道有限/可数反例与开放问题边界。在接下来的后半章（[28.4](ch32-s04-generative-laws.md#sec-ch32-generative-laws)–[28.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians)）中，我们将把这枚比较原语进一步折回自身（$\psi = \psi(\psi)$），升起《正交自指统一场论》的三条宏观创生铁律、六大疆域全息同构总表与八大基础纲领的元统一罗盘。
