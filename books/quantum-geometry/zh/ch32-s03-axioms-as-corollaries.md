# 32.3 诸公理皆推论：从比较公理 $\mathcal{A}_0$ 到数学与物理公理体系 {#sec-ch32-axioms-as-corollaries}

现在，我们把[第 32.1 节](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)确立的零背景比较公理 $\mathcal{A}_0$（[@def-ch32-axiom-of-comparison]）及其第 0–2 层实现结构全面铺开，正式兑现“**诸公理皆推论**”的公理化蓝图：凡属比较核商化、内积奇偶折叠、效应可加延拓与离散联络分解所能严格锁定的核心骨架，一律铸造为带 `lean=` 锚点的形式化**推论（`corollary`）**；凡需跨越范畴、分析完备化、复合层析或不可逆粗粒化的中间桥梁假设，一律在正文中亮明底牌，并在[附录 E](appendix-e.md) 中给出完整推导与极小反例审计。

## 32.3.1 数学基础公理的推论重铸：逻辑商集、算术素数与格拉姆几何 {#sec-ch32-6-1}

在传统数学基础中，莱布尼茨同一律、ZFC 外延与分类公理、皮亚诺后继与无穷素数、以及欧氏内积平行四边形律与格拉姆度规，分别散落在逻辑、算术与几何三套互不相干的公理表里。而在 $\mathcal{A}_0$ 下，它们依次是**比较核商化**、**正交与乘法新轴逃逸**及**第 1 层偶对称二次型刚性**的三条直接推论：

::: {.corollary #cor-ch32-extensionality-and-quotient title="从比较核商化推出关系外延性、连续划分因式分解、纤维重构与对角线逃逸" lean="D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode"}
在 `trureturing` 冻结的观测划分拓扑、概念纤维分解与相对语义对角线模块中，比较读出核商化导出以下四项逻辑与集合论基础结论：

1. **比较核不可分性与商外延性**（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：对任意对象域 $X$、读出域 $B$ 与比较读出 $\mathrm{readout} : \operatorname{Concept}(X, B)$，划分拓扑不可分关系精确等于读出核，$\operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \iff \mathrm{readout}(x) = \mathrm{readout}(y)$，使外延同一律成为商空间 $X/{\sim_{\mathrm{CMP}}}$ 上的典范定理；
2. **连续划分因式分解充要判据**（[`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition)）：在**非空**源域 $X$（`[Nonempty X]`）上，目标概念 $\mathrm{target} : \operatorname{Concept}(X, \mathrm{Output})$ 可经由比较坐标单值分解（$\operatorname{Refines}(\mathrm{target}, \mathrm{readout})$，即 $\exists f : B \to \mathrm{Output},\; \mathrm{target} = f \circ \mathrm{readout}$），当且仅当 $\mathrm{target}$ 从 $(X, \operatorname{partitionTopology}(\mathrm{readout}))$ 到离散空间 $(\mathrm{Output}, \perp)$ 连续；
3. **概念原像纤维无损重构**（[`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)）：对任意概念读出 $q_C : \operatorname{Concept}(X, B)$，原始域与比较纤维依值总和之间存在典范双射等价 $X \simeq \Sigma_{b : B}\,\operatorname{ConceptFiber}(q_C, b)$；
4. **无不动点扭转下的对角线逃逸**（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)）：设扭转映射 $\mathrm{twist} : \mathrm{Output} \to \mathrm{Output}$ 无不动点（$\forall y,\; \mathrm{twist}(y) \neq y$），给定任意潜坐标 $\mathrm{latent} : \operatorname{Concept}(\mathrm{Address}, \mathrm{Coordinate})$ 与解码目录 $\mathrm{decoderCatalog} : \mathrm{Address} \to \mathrm{Coordinate} \to \mathrm{Output}$，相对语义对角线映射对每一地址 $a$ 均严格逃逸出目录解码：$\operatorname{relativeSemanticDiagonal}(\mathrm{twist}, \mathrm{latent}, \mathrm{decoderCatalog})(a) \neq \mathrm{decoderCatalog}(a, \mathrm{latent}(a))$。
:::

::: proof
第 1 款由离散拓扑单点闭开集沿 $\mathrm{readout}$ 拉回直接给出；第 2 款利用第 1 款将向离散拓扑的连续性化为每条读出纤维上的常值性，并在 `[Nonempty X]` 下构造商因子映射 $f$；第 3 款把每个 $x \in X$ 映至依值对 $\langle q_C(x), \langle x, \mathrm{rfl}\rangle\rangle$ 并验证投影互逆；第 4 款在地址 $a$ 处展开对角线定义 $\mathrm{twist}(\mathrm{decoderCatalog}(a, \mathrm{latent}(a)))$，直接调用无不动点假设得严格不等。完整证明由 Lean 内核检查。
:::

[@cor-ch32-extensionality-and-quotient] 第 1–3 款表明，ZFC 外延公理与等价类商分解无需在原始集合上硬设，而是 $\mathcal{A}_0$ 条款 I 比较核商化的必然产物（范畴层面对齐忠实满米田嵌入 $y(X) = \mathrm{Hom}_{\mathcal{C}}(-, X)$，见 [@rem-ch32-comparison-axiom-literature]）；第 4 款则揭示了为什么无限制概括公理在二值布尔否定 $\mathrm{twist}(y) = \neg y$ 下必触发罗素对角线逃逸，迫使 ZFC 分层受限（注：无穷集合、幂集与替换等高阶存在性阶段仍属额外集合论公理强度，完整边界与反例见[附录 E §E.2](appendix-e.md#sec-appe-logic)）。

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

在无穷维正交余量不竭假设（$\forall n,\; S_n^\perp \neq \bot$）下，[@cor-ch32-successor-primes-and-zeckendorf] 第 1–2 款分别驱动永不坍缩的后继步进与无穷素数正交基谱，第 3 款直接给出虚数单位 $i^2 = -1$ 的纯差异互易起源；至于有理数域 $\mathbb{Q}$ 完备化为阿基米德实数域 $\mathbb{R}$ 抑或非阿基米德 $p$ 进域 $\mathbb{Q}_p$ 的二分法与阿代尔乘积守恒，以及从 $\mathbb{Q}[i]$ 到 $\mathbb{C}$ 的柯西完备化，详见[第 36 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)（[@thm-ch36-ostrowski-padic-ball-and-blind-spot]、[@thm-ch36-crt-and-adelic-product-formula]）与[附录 E §E.3](appendix-e.md#sec-appe-arithmetic)。

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

由范数反向恢复内积需调用约当—冯·诺依曼逆定理，由一般实对称半正定表 $G \succeq 0$ 嵌入欧氏空间需调用勋伯格定理（均属文献结果，见 [@rem-ch32-comparison-axiom-literature]）；而欧几里得第五平行公设在切平面线性化（零曲率）、单位球面公平（正曲率三态弧面体 $\Delta\mathcal{T}_\epsilon$，见[第 34 章 §34.4](ch34-orthogonality-degeneracy-and-observer-position.md#sec-ch34-infinitesimal-spherical-trihedron)）与双曲相对快度（负曲率）间的三分机制详见[附录 E §E.4](appendix-e.md#sec-appe-geometry)。

## 32.3.2 量子力学核心公设的推论重铸 {#sec-ch32-6-2}

传统量子力学教材将复希尔伯特态空间、玻恩迹定则与投影更新、海森堡测不准、薛定谔幺正流及复合多粒子规则列为五条独立公设。在 $\mathcal{A}_0$ 下，尤其是把概率可加性从正交投影格自然延拓到全部测量效应 $0 \le E \le I$ 后，连格里森定理留下的二维单量子比特缺口（投影可加性在 $d = 2$ 下容许光滑奇三次反例 $f(P_{\mathbf{r}}) = \frac{1}{2}(1 + r_z^3)$）也被有限维布施效应定理一举封死：

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

把 [@cor-ch32-parallelogram-quadratic-and-gram] 与 [@cor-ch32-quantum-postulates-core] 的 `LEAN ✓` 核心同[附录 E §E.5](appendix-e.md#sec-appe-quantum) 审计的操作桥梁假设并排对照，五大公设的逻辑地基纤毫毕现：（I）平行四边形律配度量完备化给出复希尔伯特空间；（II）有限维效应有限可加性唯一钉死玻恩迹公式 $\operatorname{Tr}(\rho E)$，而**可重复性（repeatability）**操作假设将吕德斯投影更新同抹除原态的固定重置信道区分开；（III）奇偶平方折叠直接给出罗伯逊—薛定谔测不准恒等式；（IV）保持两两比较内积只保证等距算子 $U^\dagger U = I$（无穷维 $\ell^2(\mathbb{N})$ 上的单侧移位算子即保持全部内积却非满射），必须显式附加**动力学可逆满射性**（有限维自动满足）与强连续单参数群假设，再经斯通定理导出薛定谔方程；（V）复合系统由**局域层析完备极小性**唯一选定复张量积 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$（排除具有多余局域双线性不变量 $J\otimes J$ 的实双比特空间及含暗扇区的 $(\mathcal{H}_1\otimes\mathcal{H}_2)\oplus\mathcal{K}$），而全同费米子泡利不相容则源于置换群**奇反对称外幂支段 $\bigwedge^N\mathcal{H}$** 上的自身零外积 $e_i \wedge e_i = 0$。

## 32.3.3 相对论零光锥、规范和乐、热力学第二定律与付费比较推论 {#sec-ch32-6-3}

当比较预算扩展到宏观时空、多站点局域纤维与粗粒化开放演化时，将单位公平圆 $\cos^2\theta + \sin^2\theta = 1$ 的求同分量读作固有时留存比 $d\tau/dt$、求异分量读作空间推进比 $dx/(c\,dt)$，移项即重排为闵可夫斯基线元 $c^2 d\tau^2 = c^2 dt^2 - dx^2$（`MODEL`）；而在内核定理层，零光锥度规刚性、有向图规范和乐分类、捏合相干删除熵产与有偿比较步数共同凝结为第五条推论：

::: {.corollary #cor-ch32-minkowski-holonomy-and-second-law title="闵可夫斯基零光锥度规刚性、生成树锚定规范和乐、捏合相干删除熵产与付费名字比较推论" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity D5/S0/Computability/BinaryNameComparison.name_compare_run"}
在 `trureturing` 冻结的光锥刚性证书、锚定相位分类、相干删除熵产与二元名字比较模块中，以下四项时空、规范、热力学与计算推论同时成立：

1. **闵可夫斯基零光锥二次型标量刚性**（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)）：对任意空间维数 $d \in \mathbb{N}$ 与 $\mathrm{Space}(d) = \mathbb{R} \times \mathbb{R}^d$ 上的实二次型 $S$，若 $\forall v,\; \operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$，则必有 $S = S(1, 0)\bullet \operatorname{minkowski}_d$；
2. **生成树锚定规范相位的余切弦和乐完备分类**（[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)）：在带命名生成树 `NamedSpanningTree s t T` 与非空锚集 $r \in R \subseteq V$（$|V|=n, |E|=m, |R|=k$）的有限有向图上，圆值边相位模去锚定上边缘子群 $N$ 的规范商群满足连续群同构 $(E \to \mathrm{Circle})/N \simeq_{\mathrm{top}*} \operatorname{Coordinates}(T, R, r) \simeq_{\mathrm{top}*} (\operatorname{Fin}(m + k - n) \to \mathrm{Circle})$；
3. **幺正演化接基捏合的相干删除非负熵产恒等式**（[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)）：在有限维空间（`[Fintype n] [DecidableEq n]`）上，对幺正矩阵 $U \in U(n, \mathbb{C})$ 与递推 $\rho(k+1) = \operatorname{basisPinchingState}(U\rho(k)U^\dagger)$，单步冯·诺依曼熵增精确等于非负量子相对熵 $S_{\mathrm{vN}}(\rho(k+1)) - S_{\mathrm{vN}}(\rho(k)) = D\bigl(\rho_U(k) \,\Vert\, \Pi(\rho_U(k))\bigr) \ge 0$，且 $N$ 步总熵增等于逐拍相对熵累加和；
4. **可逆二元名字比较的精确线性步数代价**（[`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)）：有限状态机 `compareMachine` 在至多 $2(|a| + |b|) + 4$ 步内输出相等判别位 $\operatorname{decide}(a = b)$ 并无损复原输入纸带 $a, b$ 与上下文栈。
:::

::: proof
第 1 款在反向类光向量对 $(\pm\|w\|, w)$ 上极化消去时空交叉项并锁定空间各向同性比例 $-S(1,0)\|w\|^2$；第 2 款沿唯一树路径建立连续规范截面，把物理自由度分解为 $m+1-n$ 条余切弦回路与 $k-1$ 个相对锚点相位；第 3 款利用幺正等谱性 $S_{\mathrm{vN}}(\rho_U) = S_{\mathrm{vN}}(\rho)$ 与基捏合勾股迹恒等式 $\operatorname{Tr}(\rho_U \log \Pi(\rho_U)) = \operatorname{Tr}(\Pi(\rho_U)\log\Pi(\rho_U))$ 将熵差化为非负相对熵并裂项求和；第 4 款由扫描栈与复原栈两趟计数给出。完整证明由 Lean 内核检查。
:::

沿着下方预算光锥实验卡拖动倾角 $\theta$，可以直观看到单位公平圆如何随项序重排展开为闵可夫斯基零光锥：

::: {.viz src="comparison-oisc-engine" preset="budget-cone" height="520"}
**同一笔公平预算改写项序，预算圆就打开成闵可夫斯基光锥。** 拖动圆上的琥珀色分配点将倾角 $\theta$ 从 $0^\circ$ 扫向 $90^\circ$：青色分量 $\cos\theta = d\tau/dt$ 是固有时留存，品红分量 $\sin\theta = dx/(c\,dt)$ 是空间存异推进；当 $\theta = 90^\circ$ 时 $dx = c\,dt$、$d\tau = 0$，世界线贴上光锥（预算重排读法属 `MODEL`，零锥二次型刚性 `eq_smul_minkowski_of_null` 标 `LEAN ✓`）。
:::

在[附录 E §E.6](appendix-e.md#sec-appe-spacetime) 中，我们进一步审计了这四条物理桥梁的不可省边界：不定度规符号差 $(1, d)$ 的选择、从单纤维平凡回路 $abbc = ac$ 到跨点局域联络 $D_\mu = \partial_\mu + A_\mu$ 的第 2 层纤维提升、从静态等距扩维（熵不变）到丢弃块外相干性的基捏合开放动力学假设，以及局部指数分桶搜索屏障与标准图灵机复杂性猜想 $\mathrm{P} \neq \mathrm{NP}$（始终严格标定为开放问题 `OPEN`）之间的精确界线。

## 32.3.4 中间桥梁假设四分类总览与外部文献边界 {#sec-ch32-6-4}

将上述五大推论链中的全部中间桥梁假设汇总审视，它们既不是一团模糊的哲学跳跃，也不是同等重量的任意假定，而是严格落入四个层次分明的认识论类别（完整逐域证明与极小反例总表见[附录 E](appendix-e.md#sec-appe-audit-table)）：

::: {.remark #rem-ch32-comparison-axiom-literature title="比较公理推论链的中间假设四分类总览与外部文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 为严守认识论透明性，本节从 $\mathcal{A}_0$ 通往各学科公理的桥梁假设按性质分为四类——**`T1` 典范商化与完备化构造**（由泛性质唯一决定的数学闭操作）、**`T2` 操作测量与复合极小性归约**（由实验室操作可区分性导出的结构筛选）、**`T3` 符号差 / 估值 / 置换奇偶分支选择**（同一母方程下的有限分类相分支）与 **`T4` 实质公理 / 动力学强度及开放问题**（超出有限两两比较的无穷存在性、连续正则性或未决难题 `OPEN`）：

| 编号 | 中间桥梁假设（`H1`–`H9`） | 分类 | 作用的推论链与被排除的极小反例 | 核心 `LEAN ✓` / 外部文献锚点 |
| :--- | :--- | :---: | :--- | :--- |
| **`H1`** | 比较核商化 $X/{\sim_{\mathrm{CMP}}}$ 与度量柯西完备化 | `T1` | 消除不可测冗余核与有理缝隙，完成商外延与完备空间构造 | `partition_inseparable_iff_kernel`（`LEAN ✓`）；Yoneda（1954） |
| **`H2`** | 正自归一 $S(x,x)=+1$、简单二阶双向量与 $G \succeq 0$ | `T3` | 第 0 层升第 1 层；排除 $S=-1$、对偶数 $A^2=0$、分裂复数 $j^2=+1$ 与 $\mathcal{Cl}_{4,0}$ 四秩双向量 | `lagrange_gram_identity`（`LEAN ✓`）；Schoenberg（1935） |
| **`H3`** | 无穷集合、幂集与替换等高阶集合存在阶段 | `T4` | 无限制自属被无不动点对角线阻断；高阶无穷基数由外部集合论公理供给 | `relative_semantic_diagonal_ne_listed_decode`（`LEAN ✓`） |
| **`H4`** | 正交余量不竭 $S_n^\perp \neq \bot$ 与有理非平凡估值分支 | `T4` / `T3` | 供给无限后继步（排除有限维封顶）；在 $\mathbb{R}$ 与 $\mathbb{Q}_p$ 间作阿代尔估值分支选择 | `finite_layer_projection_escape`、`prime_axis_escape`（`LEAN ✓`）；Ostrowski（1918） |
| **`H5`** | 比较步长归一化曲率三分法（切线 / 单位球 / 双曲快度） | `T3` | 区分欧氏平直 $\kappa=0$、黎曼球面角超 $\Omega(\epsilon)>0$ 与双曲负曲率 $\kappa<0$ | `inner_product_norm_parallelogram_law`（`LEAN ✓`）；Jordan–von Neumann（1935） |
| **`H6`** | 全体效应有限可加性 $0 \le E \le I$ 与可重复吕德斯更新 | `T2` | 封死 $d=2$ 投影可加奇三次反例 $\frac{1}{2}(1+r_z^3)$；排除擦除原态的固定重置信道 | `effect_density_representation`、`rank_one_born_pairing_weight`（`LEAN ✓`）；Gleason（1957），Busch（2003） |
| **`H7`** | 跨拍演化可逆满射性 $UU^\dagger=I$ 与强连续单参数群 | `T2` / `T4` | 排除 $\ell^2(\mathbb{N})$ 单侧移位非满射等距算子；由时间强连续性导出自伴哈密顿生成元 | `unitary_phase_of_connected_ray_tests`（`LEAN ✓`）；Stone（1932） |
| **`H8`** | 局域层析完备极小张量积与全同置换奇偶支段 | `T2` / `T3` | 唯一选定 $\mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2$（排除实双比特 $J\otimes J$ 与暗直和项 $\oplus\mathcal{K}$）；在 $\bigwedge^N\mathcal{H}$ 上导出泡利原理 | Hardy（2001），Chiribella–D'Ariano–Perinotti（2011），Pauli（1940） |
| **`H9`** | 局域纤维联络、基捏合粗粒化动力学与复杂性边界 | `T2` / `T4` / `OPEN` | 超越单纤维平凡环路 $abbc=ac$ 生规范曲率；由基捏合导出 $\Delta S_{\mathrm{vN}} \ge 0$；标准 $\mathrm{P}\neq\mathrm{NP}$ 保持 `OPEN` | `eq_smul_minkowski_of_null`、`anchored_phase_classification`、`entropy_production_coherence_deletion_identity`、`name_compare_run`（`LEAN ✓`）；Mavaddat & Parhami（1988），Yang & Mills（1954） |

全部外部经典文献定理——Mavaddat & Parhami（1988）的 `SUBLEQ` 单指令图灵完备性、米田引理（Yoneda 1954）、Ostrowski（1918）完备化定理、Jordan & von Neumann（1935）平行四边形逆定理、Schoenberg（1935）半正定等距嵌入定理、Gleason（1957）闭子空间测度定理与 Busch（2003）效应测度定理、Stone（1932）单参数幺正群定理、Hardy（2001）与 Chiribella–D'Ariano–Perinotti（2011）局域层析张量重构定理、Pauli（1940）自旋—统计定理及 Yang & Mills（1954）非阿贝尔规范场论——均严格作为文献边界引用，详细推导与反例核验见[附录 E](appendix-e.md)。
:::

走进下方的宇宙极简比较机与零背景比较公理完整交互沙盘，读者可以在“原语—显影—折痕—开维”四个场景与六张实验卡之间自由切换，亲手核验本节全部推论的几何对应：

::: {.viz src="comparison-oisc-engine" height="620"}
**宇宙极简比较机与零背景比较公理：完整实验室。** 四个场景与六张实验卡共用一套两两比较原语：拖动琥珀色控制项，依次核验八槽同异拆分与 $\hat{I}^2 = -1$、二十八次比较谱分解出的三维八角盒、公平平方的同² 加楔² 下界、预算圆改写光锥、残差立为新轴以及前缀树逃逸对与自比较蛛网；绿色 `LEAN ✓` 严格对应页面引用的冻结定理，文献结果、`OPEN` 与本书 `MODEL` 分层标定。
:::

至此，数学与物理的核心公理骨架已从比较公理 $\mathcal{A}_0$ 中逐条生长完毕。在接下来的后半章（[32.4](ch32-s04-generative-laws.md#sec-ch32-generative-laws)–[32.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians)）中，我们将把这枚比较原语进一步折回自身（$\psi = \psi(\psi)$），升起《正交自指统一场论》的三条宏观创生铁律、六大疆域全息同构总表与八大基础纲领的元统一罗盘。
