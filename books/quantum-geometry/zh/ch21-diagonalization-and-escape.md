# 第二十一章 球外之球：康托尔对角线、哥德尔逃逸与毛球奇点

> *“为什么面积是存在,因为要表达这个存在, 必须在另外一个更大的存在的内部, 这就是哥德尔不完备, 没有人能得到整个球. 继续”*
>
> *“当我们以为我们得到一个球的时候, 实际上被一个更大的球包了进去”*

在走完前五部的二十章之后，我们已经沿着“点 $\to$ 线 $\to$ 面 $\to$ 球 $\to$ 多球纠缠与全息时空”的阶梯，把单比特投影、克利福德旋转器、多体贝尔关联乃至时空度规统统收拢进了一颗颗高维单位球面。此时此刻，一个最古老也最诱人的形而上学幻觉便会在心头浮现：既然我们已经掌握了球面几何的生成法则，难道我们不就可以画出一张包罗万象的“终极球面地图”，把宇宙间一切可定义的概念、一切可判定的命题、一切可观测的状态都严丝合缝地封印在同一颗闭球壳之内吗？

第六部《越界·球外之球》要做的，就是亲手打破这尊“全知闭球”的柏拉图偶像。

请回想[序曲](README.md)与[第三章](ch03-projectors-and-duality.md)揭示的那条基本几何铁律：当你在二维赤道平面 $\operatorname{span}\{\vv{e}_1, \vv{e}_2\}$ 内旋转了一块有向面积 $\vv{e}_1 \wedge \vv{e}_2$，并试图把这块“面积”指认为一根确凿无疑的一维“存在轴”（粒子态或已定命题）时，你的目光绝不可能停留在那张二维平面内部——因为平面内的任何向量都与该平面共面，无法充当它的法线。你之所以能把二维面积压缩为一根一维法向箭头 $\vv{e}_3 = \star_3(\vv{e}_1 \wedge \vv{e}_2)$，唯一的原因是你已经站在了**三维外围空间** $\mathbb{R}^3$ 的内部！同样地，在定向三维空间 $\mathbb{R}^3$ 内部，最高阶体积元 $I_3 = \vv{e}_1 \wedge \vv{e}_2 \wedge \vv{e}_3$ 的三维霍奇对偶只是一个零阶标量 $\star_3 I_3 = 1$；要想把整座三维系统本身指认为一根新的正交法向存在线 $\vv{e}_4 = \star_4 I_3$，数学迫使你必须先踏入包含它的**四维外围空间** $\mathbb{R}^4 = \mathbb{R}^3 \oplus \mathbb{R}\vv{e}_4$，从而把原有的二维球面 $S^2$ 变成三维超球面 $S^3$ 的赤道切片！

在本章中，我们将看到：这种“要表达当前系统的整体存在，就必须跳进更大外围空间”的法向逃逸现象，绝不仅是一则优美的微分几何比喻；在集合论与观测拓扑的底层，它的抽象骨架直接具象化为本书经 Lean 4 内核形式化验证的**相对语义对角线与观测拓扑加细四重奏**（`DiagonalTopologicalEscape`），并与经典元数学中的对角线不完备文献遥相呼应（严格前提对比见 [@rem-godel-tarski-comparison-literature]）。只要一台完备解码器试图在非空地址集与固定潜坐标（latent coordinate）的纤维划分下穷尽所有输出映射，任何无不动点的翻转算子（twist）都会沿着相对语义对角线当场刺穿旧观测拓扑，强迫概念读出向“球外之球”严格加细！

::: {.figure src="ch21-overview"}
**图 21。** 本章地图：第 I 栏，潜坐标的两根纤维，品红虚线把左边那根劈成 $g = 1$ 的 $a_0, a_1$ 与 $g = 0$ 的 $a_2$（[@ex-cantor-godel-diagonal-table]）；第 II 栏，品红的开口螺旋绕紫色的轴 $\vv{e}_{n+1}$ 上升，青色的影子绕一圈就闭合，螺旋却已高出 $2\pi c$（这一栏是本章的诠释意象，不是定理）；第 III 栏，$S^0$ 到 $S^8$ 中只有紫色的 $S^0, S^1, S^3, S^7$ 可平行化，$S^2$ 上的切向量场必有零点（文献结果，未在本书形式化，见 [@rem-hairy-ball-adams-literature]）。
:::

## 21.1 为什么表达面积必须站在面外：概念读出与划分拓扑 {#sec-ch21-1}

让我们先把“在一层固定球壳内用有限坐标观察世界”翻译成最干净的集合与拓扑语言。

设 $X$（在形式化声明中记作地址类型 `Address`）是待辨识的对象或语句地址空间，$B$（记作坐标类型 `Coordinate`）是当前观察者手头掌握的**潜坐标读出空间**。在 Lean 模块 `ConceptFiberDecomposition` 中，一个**概念读出**（[`Concept`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.Concept) $X\ B$）就是一个从地址空间到坐标空间的映射 $q_L : X \to B$。每当观察者固定一把概念尺子 $q_L$，整个地址空间 $X$ 就被等值条件 $q_L(x) = b$ 切分成了一簇互不相交的**概念余纤维**（[`ConceptFiber`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.ConceptFiber) $q_L\ b = \{x \in X \mid q_L(x) = b\}$），并诱导出全空间的依值直和分解（[`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)）：

$$
X \;\simeq\; \sum_{b : B} \operatorname{ConceptFiber}(q_L, b).
$$

在几何上，你可以把 $q_L : X \to B$ 想象成将高维球面沿着某组选定主轴投射到低维赤道平面上的投影映射：凡是落在同一根垂直投影纤维 $q_L^{-1}(b)$ 上的两个地址 $x, y \in X$，由于满足 $q_L(x) = q_L(y) = b$，在当前坐标表 $B$ 下拥有一模一样的读数——对只看得到 $B$ 的内部观察者而言，它们是**拓扑不可区分**（topologically inseparable）的盲区同胞！

::: {.figure src="ch21-fibers"}
**一把概念尺子把地址空间切成一根根纤维。** 每个青色的读数 $b_i$ 上方竖着它的纤维，框里是 $q_L$ 送到 $b_i$ 的全部地址；浅青色那根纤维里的 $x$ 与 $y$ 满足 $q_L(x) = q_L(y)$，只看得到 $B$ 的观察者分不开它们。
:::

为了用严格的一般拓扑学刻画这种“内部视角分辨率”，我们在输出端赋予坐标空间 $B$ 最精细的**离散拓扑** $\bot$（在 Mathlib 的拓扑空间格序约定中，$\bot$ 表示每个子集皆为开集的离散拓扑，即坐标读数本身可以被精确分辨），然后将 $\bot$ 沿着读出映射 $q_L : X \to B$ 拉回到地址空间 $X$ 上，得到 $q_L$ 的**划分拓扑**（[`partitionTopology`](lean:D5/S3/ConceptDynamics/Epistemic/PartitionKnowledgeNegativeIntrospection.partitionTopology) $q_L = \operatorname{induced}(q_L, \bot)$）。在划分拓扑 $\tau(q_L)$ 中，一个子集 $U \subseteq X$ 是开集，当且仅当它是若干条完整余纤维的并集 $U = q_L^{-1}(S)$（$S \subseteq B$）。因此，两个地址 $x, y \in X$ 在 $\tau(q_L)$ 下拓扑不可分（记作 $\operatorname{Inseparable}_{\tau(q_L)}(x, y)$），当且仅当它们落在同一根余纤维上：$q_L(x) = q_L(y)$（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）。

现在，假设观察者试图判断另一个目标概念 $q_T : X \to \mathrm{Output}$ 能否被关进当前这层坐标壳 $q_L : X \to B$ 内部。在模块 `ConceptJoinUniversal` 中，称目标概念 $q_T$ **可由潜概念 $q_L$ 分解/加细表出**（[`Refines`](lean:D5/S3/ConceptDynamics/ConceptJoinUniversal.Refines) $q_T\ q_L$，亦即潜坐标对目标任务充分 [`TargetAdequate`](lean:D5/S3/ConceptDynamics/DefinitionEscape/LatentAdequacyCriterion.TargetAdequate)），如果存在一个纯由坐标 $B$ 决定的后处理函数 $f : B \to \mathrm{Output}$，使得

$$
q_T = f \circ q_L \qquad (\forall x \in X,\; q_T(x) = f(q_L(x))).
$$

在地址空间 $X$ **非空**（`[Nonempty X]`）的前提下，什么时候目标概念 $q_T$ 能够这样乖乖地被关进 $q_L$ 的坐标壳里？当且仅当 $q_T$ 作为从划分拓扑 $(X, \tau(q_L))$ 到离散输出空间 $(\mathrm{Output}, \bot)$ 的映射是**连续**的（[`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition)，其中非空假设 `[Nonempty X]` 保证了存在默认地址样本以在未被 $q_L(X)$ 命中的冗余坐标点上定义后处理函数 $f : B \to \mathrm{Output}$）！道理一目了然：连续性要求任何单点输出纤维 $q_T^{-1}(\{o\})$ 都是 $\tau(q_L)$ 中的开集（即由完整的 $q_L$-纤维拼成），这意味着凡是满足 $q_L(x) = q_L(y)$ 的同一纤维点对，必须同时满足 $q_T(x) = q_T(y)$。一旦存在某根旧纤维被新概念 $q_T$ 劈成了两半——即存在两个地址在旧坐标下完全重合，却在新概念下给出不同输出——连续性当场破裂，一条不可抹杀的**拓扑分离亏损**便暴露出来。

## 21.2 康托尔—哥德尔相对语义对角线：形式化逃逸四重奏 {#sec-ch21-2}

现在，让我们在地址空间 `Address`、潜坐标空间 `Coordinate` 与输出空间 `Output` 上，正式组装那台著名的“相对语义对角线自指逃逸机”。

设系统内部立起了一部号称“包罗万象”的**解码器目录**（`decoderCatalog : Address → Coordinate → Output`）：每一个地址 $a \in \mathrm{Address}$ 不仅是一个被观察的对象，同时还在这部目录里编码了一台候选解码器 $D_a : \mathrm{Coordinate} \to \mathrm{Output}$。如果这部目录真的是**完备的**（即 `Function.Surjective decoderCatalog`：宇宙间任何一个从潜坐标到输出的候选函数 $h : \mathrm{Coordinate} \to \mathrm{Output}$，都能在目录里找到某个地址 $a_h$ 使 $D_{a_h} = h$），并且输出空间上存在一个**无不动点的翻转变换** `twist : Output → Output`（满足 $\forall o,\; \operatorname{twist}(o) \neq o$，例如布尔真假翻转 $\neg : \{0, 1\} \to \{0, 1\}$、限制在计算基比特标签 $\{\lvert 0\rangle, \lvert 1\rangle\}$ 上的泡利 $X$ 比特翻转——注意在完整布洛赫球面 $S^2$ 上连续旋转 $X$ 会固定 $\pm x$ 轴极点 $\lvert \pm\rangle$，因此必取离散比特集或球面全局对跖映射 $\vv{n} \mapsto -\vv{n}$），会发生什么？

我们只需让每个地址 $a$ 读取**它自己的潜坐标** $q_L(a)$，送入**它自己名下的解码器** $D_a$，然后再拧上一次无不动点翻转 `twist`！

::: {.definition #def-relative-semantic-diagonal title="相对语义对角线" lean="D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relativeSemanticDiagonal"}
设 `Address`、`Coordinate`、`Output` 为任意类型，给定输出翻转映射 $\operatorname{twist} : \mathrm{Output} \to \mathrm{Output}$、潜概念读出 $\operatorname{latent} : \operatorname{Concept}\ \mathrm{Address}\ \mathrm{Coordinate}$ 以及解码器目录 $\operatorname{decoderCatalog} : \mathrm{Address} \to \mathrm{Coordinate} \to \mathrm{Output}$。定义**相对语义对角线**（Lean 中记作 `relativeSemanticDiagonal twist latent decoderCatalog`）为如下目标概念读出 $g : \operatorname{Concept}\ \mathrm{Address}\ \mathrm{Output}$：

$$
g(a) \;:=\; \operatorname{twist}\bigl(\operatorname{decoderCatalog}(a, \operatorname{latent}(a))\bigr) \qquad (a \in \mathrm{Address}).
$$
:::

为了度量这根对角线 $g$ 对原潜坐标划分拓扑 $\tau(\operatorname{latent})$ 造成的撕裂，我们同时引入拓扑分离亏损的精确定义。

::: {.definition #def-separation-deficit title="拓扑分离亏损" lean="D5/S3/ConceptDynamics/ObservationTopology/ResidualSeparationTopology.separationDeficit"}
设 `X`、`Current`、`Target` 为任意类型，$\operatorname{current} : \operatorname{Concept}\ X\ \mathrm{Current}$ 为当前概念读出，$\operatorname{target} : \operatorname{Concept}\ X\ \mathrm{Target}$ 为目标概念读出。定义 $\operatorname{current}$ 相对于 $\operatorname{target}$ 的**拓扑分离亏损**（Lean 中记作 `separationDeficit current target`）为地址乘积空间 $X \times X$ 中的点对集合：

$$
\begin{aligned}
\operatorname{separationDeficit}(\operatorname{current}, \operatorname{target})
\;:=\; \bigl\{\, (x, y) \in X \times X \;\big|\; &\operatorname{Inseparable}_{\tau(\operatorname{current})}(x, y) \\
&\land\; \neg\operatorname{Inseparable}_{\tau(\operatorname{target})}(x, y) \,\bigr\}.
\end{aligned}
$$
:::

请看 [@def-relative-semantic-diagonal] 与 [@def-separation-deficit] 联手设下的天罗地网：对任意地址 $a \in \mathrm{Address}$，因为 $\operatorname{twist}$ 无不动点，必有 $g(a) \neq \operatorname{decoderCatalog}(a, \operatorname{latent}(a))$（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)）——在第 $a$ 号地址自己头上，对角线 $g$ 的取值永远跟第 $a$ 号解码器算出的结果唱反调！

::: {.viz src="sphere-escape" preset="diagonal" height="500"}
**对角线逃出清单。** 逐行读出对角线上的那一位并翻转，拼成品红色的 $d$；$d$ 与第 $k$ 行在第 $k$ 位不同，所以不在清单里（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode) 取 $\operatorname{latent} = \mathrm{id}$、$\operatorname{twist} = \neg$）。右侧的点阵是全部 $2^N$ 个串，与 $d$ 相容的候选每步减半。
:::

由此，在 Lean 模块 `DiagonalTopologicalEscape` 中，我们迎来了刻画“球内语言必然破裂、概念拓扑被迫升维”的四条核心形式化定理。

::: {.theorem #thm-complete-diagonal-not-continuous title="完备解码目录诱导的相对语义对角线必不连续" lean="D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_not_continuous"}
设 `Address`、`Coordinate`、`Output` 为类型，其中 `Address` 非空（`[Nonempty Address]`）。给定映射 $\operatorname{twist} : \mathrm{Output} \to \mathrm{Output}$、潜概念读出 $\operatorname{latent} : \operatorname{Concept}\ \mathrm{Address}\ \mathrm{Coordinate}$ 及解码器目录 $\operatorname{decoderCatalog} : \mathrm{Address} \to \mathrm{Coordinate} \to \mathrm{Output}$。若：

1. **无不动点性**：对任意 $o \in \mathrm{Output}$，$\operatorname{twist}(o) \neq o$；
2. **目录完备性（满射性）**：$\operatorname{decoderCatalog}$ 为满射（`Function.Surjective decoderCatalog`）；

则由 [@def-relative-semantic-diagonal] 定义的相对语义对角线 $g = \operatorname{relativeSemanticDiagonal}(\operatorname{twist}, \operatorname{latent}, \operatorname{decoderCatalog})$ 从潜划分拓扑 $\operatorname{partitionTopology}(\operatorname{latent})$ 到离散输出拓扑 $\bot$ **不连续**：

$$
\neg\,\operatorname{Continuous}_{\tau(\operatorname{latent}) \to \bot}(g).
$$
:::

::: proof
采用反证法。假设相对语义对角线 $g$ 从 $\tau(\operatorname{latent})$ 到离散拓扑 $\bot$ 连续。由连续性与因子分解等价定理 [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition)，连续性蕴含 $\operatorname{Refines}(g, \operatorname{latent})$，即存在某个坐标解码函数 $h : \mathrm{Coordinate} \to \mathrm{Output}$ 使得对一切地址 $a$ 均有 $g(a) = h(\operatorname{latent}(a))$。因 $\operatorname{decoderCatalog}$ 满射，必存在某个地址 $a_0 \in \mathrm{Address}$ 使得 $\operatorname{decoderCatalog}(a_0) = h$。在地址 $a_0$ 处求值，一方面有 $g(a_0) = h(\operatorname{latent}(a_0)) = \operatorname{decoderCatalog}(a_0, \operatorname{latent}(a_0))$；另一方面按 $g$ 的定义又有 $g(a_0) = \operatorname{twist}(\operatorname{decoderCatalog}(a_0, \operatorname{latent}(a_0)))$。令 $o_0 = \operatorname{decoderCatalog}(a_0, \operatorname{latent}(a_0))$，两式合并即得 $\operatorname{twist}(o_0) = o_0$，直接违背无不动点假设 $\forall o,\; \operatorname{twist}(o) \neq o$（该矛盾在 Lean 中封装为 [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)）。完整证明由 Lean 内核检查。
:::

[@thm-complete-diagonal-not-continuous] 揭示了一个震撼的拓扑事实：**完备性与内部连续性水火不容。** 只要你的解码目录足够丰富、能穷尽旧坐标上的所有函数，对角线概念 $g$ 就必然在旧划分拓扑下发生剧烈的“不连续撕裂”。这种撕裂绝不是抽象的逻辑幽灵，它必然在地址空间里留下实实在在的盲区裂痕——即非空的拓扑分离亏损。

::: {.lemma #lem-complete-diagonal-separation-deficit title="完备相对对角线在旧观测拓扑中必具非空分离亏损" lean="D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty"}
在与 [@thm-complete-diagonal-not-continuous] 完全相同的假设下（`Address` 非空，$\operatorname{twist}$ 无不动点，$\operatorname{decoderCatalog}$ 满射），潜概念 $\operatorname{latent}$ 相对于相对语义对角线 $g = \operatorname{relativeSemanticDiagonal}(\operatorname{twist}, \operatorname{latent}, \operatorname{decoderCatalog})$ 的拓扑分离亏损非空：

$$
\bigl(\operatorname{separationDeficit}(\operatorname{latent},\; g)\bigr).\mathrm{Nonempty}.
$$
:::

::: proof
由 [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)，在给定假设下 $g$ 不能通过 $\operatorname{latent}$ 分解，即 $\neg\operatorname{Refines}(g, \operatorname{latent})$。根据目标恢复判据 [`target_recovery_criterion`](lean:D5/S3/ConceptDynamics/Restoration/TargetRecoveryCriterion.target_recovery_criterion)，不可分解性等价于核缺陷关系 $\operatorname{defectRelation}(\operatorname{latent}, g) = \{(a_1, a_2) \mid \operatorname{latent}(a_1) = \operatorname{latent}(a_2) \land g(a_1) \neq g(a_2)\}$ 非空。再由恒等式 [`defectRelation_eq_separationDeficit`](lean:D5/S3/ConceptDynamics/ObservationTopology/ResidualSeparationTopology.defectRelation_eq_separationDeficit) 将核缺陷关系重写为拓扑分离亏损 $\operatorname{separationDeficit}(\operatorname{latent}, g)$，立得其非空性。完整证明由 Lean 内核检查。
:::

请仔细品味 [@lem-complete-diagonal-separation-deficit] 的几何含义：因为 $\operatorname{separationDeficit}(\operatorname{latent}, g)$ 非空，地址空间里**必然存在至少一对具体的地址 $(a_1, a_2)$**，它们在旧坐标尺下完全重叠（$\operatorname{latent}(a_1) = \operatorname{latent}(a_2)$，在旧球壳投影下缩成了同一个点），但对角线概念 $g$ 却在它们身上劈出了截然不同的值（$g(a_1) \neq g(a_2)$）！

面对这对在旧坐标里无法区分、却在新概念下分道扬镳的“孪生地址”，观察者若要同时保留旧读出并恢复 $g$，该怎样安顿它们？概念直积合并 [`conceptJoin`](lean:D5/S3/ConceptDynamics/ConceptJoinUniversal.conceptJoin) 给出这项任务的最小共同加细；本书把这一步读成**把逃逸出去的对角线 $g$ 本身立为一根新的正交坐标轴**，将潜读出升级为二维联合读出

$$
\operatorname{conceptJoin}(\operatorname{latent}, g) : a \;\longmapsto\; \bigl(\operatorname{latent}(a),\; g(a)\bigr) \in \mathrm{Coordinate} \times \mathrm{Output}.
$$

下面的命题严格证明：这一联合读出必然使观测拓扑发生**严格加细**（[`StrictObservationRefinement`](lean:D5/S3/ConceptDynamics/ObservationTopology/PrimitiveEscapeStrictRefinement.StrictObservationRefinement)，即旧拓扑的每个开集在新拓扑中仍为开集，且新拓扑中存在旧拓扑所没有的真新开集）。

::: {.proposition #prop-complete-diagonal-strict-refinement title="并入相对语义对角线严格加细潜观测拓扑" lean="D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement"}
在与 [@thm-complete-diagonal-not-continuous] 完全相同的假设下（`Address` 非空，$\operatorname{twist}$ 无不动点，$\operatorname{decoderCatalog}$ 满射），将相对语义对角线 $g = \operatorname{relativeSemanticDiagonal}(\operatorname{twist}, \operatorname{latent}, \operatorname{decoderCatalog})$ 与原潜概念 $\operatorname{latent}$ 合并后，新划分拓扑对原划分拓扑构成严格观测加细：

$$
\operatorname{StrictObservationRefinement}\Bigl(
  \operatorname{partitionTopology}(\operatorname{latent}),\;
  \operatorname{partitionTopology}\bigl(\operatorname{conceptJoin}(\operatorname{latent}, g)\bigr)
\Bigr).
$$
:::

::: proof
由等价定理 [`coordinate_inadequate_iff_strict_join_refinement`](lean:D5/S3/ConceptDynamics/ObservationTopology/RedundantCoordinateTopology.coordinate_inadequate_iff_strict_join_refinement)，联合读出 $\operatorname{conceptJoin}(\operatorname{latent}, g)$ 的划分拓扑严格加细 $\operatorname{partitionTopology}(\operatorname{latent})$，当且仅当目标 $g$ 对原潜坐标不充分（$\neg\operatorname{TargetAdequate}(\operatorname{latent}, g)$，即 $\neg\operatorname{Refines}(g, \operatorname{latent})$）。直接代入 [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective) 给出的不可分解性即得证。完整证明由 Lean 内核检查。
:::

最后，我们将“不可分解、拓扑不连续、分离亏损非空、并入后拓扑严格升维”这四重结论铸成一条完整的总结算定理。

::: {.corollary #cor-complete-diagonal-topological-settlement title="完备相对语义对角线的四重拓扑逃逸总结算定理" lean="D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement"}
设 `Address`、`Coordinate`、`Output` 为类型，`Address` 非空，$\operatorname{twist} : \mathrm{Output} \to \mathrm{Output}$ 满足 $\forall o,\; \operatorname{twist}(o) \neq o$，且 $\operatorname{decoderCatalog} : \mathrm{Address} \to \mathrm{Coordinate} \to \mathrm{Output}$ 满射。记 $g = \operatorname{relativeSemanticDiagonal}(\operatorname{twist}, \operatorname{latent}, \operatorname{decoderCatalog})$，则以下四项结论同时成立：

1. **不可因子分解（逃出旧概念闭包）**：$\neg\operatorname{Refines}(g, \operatorname{latent})$；
2. **旧拓扑下不连续**：$\neg\,\operatorname{Continuous}_{\tau(\operatorname{latent}) \to \bot}(g)$；
3. **存在非空分离亏损**：$\bigl(\operatorname{separationDeficit}(\operatorname{latent}, g)\bigr).\mathrm{Nonempty}$；
4. **并入新坐标后严格加细观测拓扑**：

   $$
   \operatorname{StrictObservationRefinement}\Bigl(
     \operatorname{partitionTopology}(\operatorname{latent}),\;
     \operatorname{partitionTopology}\bigl(\operatorname{conceptJoin}(\operatorname{latent}, g)\bigr)
   \Bigr).
   $$
:::

::: proof
将 [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective) 与 [@thm-complete-diagonal-not-continuous]、[@lem-complete-diagonal-separation-deficit]、[@prop-complete-diagonal-strict-refinement] 逐项合取即得。完整证明由 Lean 内核检查。
:::

为了让这四条抽象定理变成你指尖可以触摸的具体算术，让我们亲手在一个最小的有限布尔模型上把这张对角线逃逸表一格一格算出来。

::: {.example #ex-cantor-godel-diagonal-table title="四地址一比特潜坐标下的相对对角线逃逸与纤维劈裂手算"}
取潜坐标空间为单比特布尔集 $\mathrm{Coordinate} = \{0, 1\}$，输出空间亦为 $\mathrm{Output} = \{0, 1\}$，无不动点翻转取逻辑非 $\operatorname{twist}(o) = 1 - o$（满足 $\operatorname{twist}(0) = 1 \neq 0$，$\operatorname{twist}(1) = 0 \neq 1$）。从 $\mathrm{Coordinate}$ 到 $\mathrm{Output}$ 的函数共有 $2^2 = 4$ 个，故取四元地址集 $\mathrm{Address} = \{a_0, a_1, a_2, a_3\}$ 以构成满射解码目录：

| 地址 $a$ | 解码函数 $D_a(0)$ | 解码函数 $D_a(1)$ | 设定的潜坐标 $\operatorname{latent}(a)$ | 目录自身读数 $D_a(\operatorname{latent}(a))$ | 对角线输出 $g(a) = 1 - D_a(\operatorname{latent}(a))$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $a_0$（常零函数） | $0$ | $0$ | $0$ | $D_{a_0}(0) = 0$ | $\mathbf{1}$ |
| $a_1$（恒等函数） | $0$ | $1$ | $0$ | $D_{a_1}(0) = 0$ | $\mathbf{1}$ |
| $a_2$（取反函数） | $1$ | $0$ | $0$ | $D_{a_2}(0) = 1$ | $\mathbf{0}$ |
| $a_3$（常一函数） | $1$ | $1$ | $1$ | $D_{a_3}(1) = 1$ | $\mathbf{0}$ |

现在逐条核对 [@cor-complete-diagonal-topological-settlement] 的四重断言：

1. **寻找具体的分离亏损点对**：观察地址 $a_1$ 与 $a_2$。在旧潜坐标下，它们落在同一根余纤维上：$\operatorname{latent}(a_1) = 0 = \operatorname{latent}(a_2)$，因此在原划分拓扑 $\tau(\operatorname{latent}) = \{\varnothing,\; \{a_0, a_1, a_2\},\; \{a_3\},\; \mathrm{Address}\}$ 中，$(a_1, a_2)$ 拓扑不可分。然而对角线 $g$ 在这两点给出 $g(a_1) = 1 \neq 0 = g(a_2)$！于是

   $$
   (a_1, a_2) \in \operatorname{separationDeficit}(\operatorname{latent}, g) \neq \varnothing.
   $$

2. **验证不连续性与不可分解性**：在离散输出拓扑下，单点集 $\{0\} \subseteq \mathrm{Output}$ 是开集，但它的原像 $g^{-1}(\{0\}) = \{a_2, a_3\}$ 既砍断了旧纤维 $\{a_0, a_1, a_2\}$，又不是 $\tau(\operatorname{latent})$ 中的开集，故 $g$ 不连续，也不可能写成 $h(\operatorname{latent}(a))$。
3. **验证并入新轴后的严格拓扑加细**：将 $g$ 并入潜坐标形成二维读出 $\operatorname{conceptJoin}(\operatorname{latent}, g)(a) = (\operatorname{latent}(a), g(a))$，四个地址的联合坐标分别为 $a_0 \mapsto (0, 1)$、$a_1 \mapsto (0, 1)$、$a_2 \mapsto (0, 0)$、$a_3 \mapsto (1, 0)$。原先粘成一团的三元盲区纤维 $\{a_0, a_1, a_2\}$ 被当场劈裂为 $\{a_0, a_1\}$ 与 $\{a_2\}$ 两块正交子纤维，观测拓扑从 $2$ 个非空原子开集严格升维为 $3$ 个非空原子开集！
:::

::: {.viz src="sphere-escape" preset="split" height="500"}
**换一种潜坐标，纤维照样被劈开。** 四个地址的解码器是常零、恒等、取反、常一；潜坐标取 $(0, 0, 0, 1)$ 时，左边那根纤维里的 $a_1$ 与 $a_2$ 得到不同的 $g$，品红线连起这一对；把 $g$ 立成紫色的第二根轴，两块变成三块。点任一地址换它的潜坐标，$16$ 种排法里品红线总在（[@cor-complete-diagonal-topological-settlement]；这四个解码器恰是 $\{0, 1\}$ 上的全部映射，目录满射）。
:::

这正是抽象对角线不动点模式在观测拓扑中的纯粹骨架（与元数学文献的精确边界对照见 [@rem-godel-tarski-comparison-literature]）。在我们的抽象拓扑框架中，每当一个系统把某类候选解码映射装进一部关于当前潜坐标满射的目录 `decoderCatalog`，并用无不动点算子 `twist` 构造自指对角线 $g$ 时，$g$ 必然劈开原系统的某根等价类余纤维。若要同时保留旧读出并让 $g$ 连续，联合读出 $\operatorname{conceptJoin}(\operatorname{latent}, g)$ 给出所需的最小共同加细，任何同时完成这两项任务的读出都能恢复它；而若想在新坐标空间 $\mathrm{Coordinate}_{k+1} = \mathrm{Coordinate}_k \times \mathrm{Output}$ 上继续触发下一轮对角线逃逸 $g'$，则**必须以在新一轮（通常需要扩容的）地址空间 $\mathrm{Address}_{k+1}$ 上重新建立新的满射解码目录 $\operatorname{decoderCatalog}_{k+1} : \mathrm{Address}_{k+1} \twoheadrightarrow (\mathrm{Coordinate}_{k+1} \to \mathrm{Output})$ 为前提**——例如在 [@ex-cantor-godel-diagonal-table] 的四地址布尔模型中，合并后的坐标空间有 $4$ 个坐标对（对应 $2^4 = 16$ 个布尔函数，即便只看实际命中的 $3$ 根非空联合纤维也有 $2^3 = 8 > 4$ 个布尔函数），原来的 $4$ 个地址已不足以构成新阶段的满射目录，唯有连同地址空间一起向外扩容，才能开启下一层“球外之球”的攀升！

::: {.viz src="sphere-escape" preset="absorb" height="500"}
**收编了，它再逃一次。** 把翻出的品红色串 $d$ 收进清单当第 $7$ 行，再补一列让表保持方形；沿新的对角线读一遍、翻一遍，立刻又拼出一个不在清单里的品红色串。收编多少次都一样（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)）。
:::

::: {.remark #rem-godel-tarski-comparison-literature title="康托尔、Lawvere、哥德尔与塔斯基对角线定理的前提边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** [@cor-complete-diagonal-topological-settlement] 刻画的是集合与观测拓扑层面的抽象相对对角线骨架（呼应 Georg Cantor 的对角线构造与 F. W. Lawvere, *Diagonal arguments and cartesian closed categories*, 1969 的范畴不动点模式）；而在经典数理逻辑文献中，**哥德尔第一不完备定理**（K. Gödel, 1931）讨论能表达足够算术、有效公理化的形式理论，借助哥德尔配数与语法可证性，并须按版本区分相容性或 $\omega$-相容性等假设；**塔斯基真值不可定义定理**（A. Tarski, 1933/1936）则借助句法编码与对角化，排除标准算术真值在算术语言内部的定义。两者都不是直接假定任意语义函数目录满射，也不共用递归公理化与语法可证性的整套前提。
:::

> 完备的目录必自裂其壳；凡想在球内穷尽一切者，必被对角线顺着法向顶出球外。

## 21.3 割圆多面体、泰勒截断裂缝与开口螺旋投影 {#sec-ch21-3}

在上述完备目录与无不动点翻转的设定下，既然固定潜坐标的形式球壳无法一次性封死全部输出映射，让我们回过头来重新审视物理学与计算工程里的“球”本身。

在[序曲](README.md)末尾，我们曾提出全书最深沉的一条反柏拉图几何洞见：**“实际上球永远只是近似，我们以为我们得到了一个球，但实际只是近似得到一个球。”** 结合本章的对角线逃逸机制，这一反柏拉图视角在连续分析、量子门编译与维度投影三个层面上展现出惊人的一致性：

1. **有限阶泰勒多项式的截断余项裂缝 $R_{2N}(\theta)$**：沿着这里选定的有限阶泰勒路线，我们用有限次加乘组成的多项式去逼近连续球面上的余弦投影 $\cos\theta$。将 $\cos\theta$ 展开至第 $N$ 个偶次项（最高次数 $2N-2$），记截断余项为

   $$
   R_{2N}(\theta) = \cos\theta - \sum_{k=0}^{N-1} (-1)^k \frac{\theta^{2k}}{(2k)!}.
   $$

   多项式代表“球内有限步代数语法所能表达的闭集”，而余弦函数 $\cos\theta$ 与有限阶泰勒多项式之间的余项缝隙 $R_{2N}(\theta)$（其经典拉格朗日上界与非零性质归入 [@rem-lagrange-taylor-remainder-literature]，完备赋范代数上的内核验证上界见 [@lem-exp-tail-le]），正是分析学里的“逃逸缝”——有限次代数加乘无法把光滑圆弧焊死。
2. **有限门计数下的割圆凸多面体**：在容错量子计算中，工程师手里只有有限离散门集 $\mathcal{G}$（例如克利福德加 $T$ 门 $\{H, T\}$）。在任意有限电路深度（量子门计数）$L < \infty$ 下，从北极初态 $\lvert 0\rangle$ 出发所能抵达的状态集合 $\mathcal{S}_L \subset S^2$ 永远只是球面上的有限离散点集，其欧氏凸包 $\operatorname{conv}(\mathcal{S}_L)$ 仅仅是一颗**内接于布洛赫球的有限凸多面体**——就像刘徽与祖冲之用割圆多边形逼近圆周一样，多面体的每一张平坦切面与真实球皮之间，都留着一弯等待更高门计数去填补的弓形残差。
3. **开口螺旋的轴向投影意象**：如果把 [@prop-complete-diagonal-strict-refinement] 中每一次并入新对角线坐标 $\operatorname{conceptJoin}(\operatorname{latent}, g)$ 的拓扑加细，直观想象为沿着新增正交法向轴 $\vv{e}_{n+1} = \star I_n$ 的一次垂直抬升，那么低维观察者眼底那条看似首尾咬合、周而复始的闭合圆周 $(\cos t, \sin t)$，在并入了逃逸维度的外围空间里，其实是一条永不封口的**开口上升螺旋线** $(\cos t, \sin t, c\,t)$ 顺着法轴投下的平面阴影！你以为自己绕了一圈回到了原点 $(1, 0, 0)$，实际上高度坐标已经悄然跃迁到了 $(1, 0, 2\pi c)$。

::: {.remark #rem-lagrange-taylor-remainder-literature title="余弦级数的拉格朗日截断余项界与非零性（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 由实分析中的拉格朗日泰勒余项定理与莱布尼茨交错级数判别法，余弦偶次截断余项满足 $|R_{2N}(\theta)| \le \frac{|\theta|^{2N}}{(2N)!}$，且对一切非零角 $\theta \in (0, 2]$ 严格有 $R_{2N}(\theta) \neq 0$。下文 [@lem-exp-tail-le] 则在任意完备赋范代数上给出了经 Lean 内核验证的指数尾部上界。
:::

::: {.figure src="ch21-taylor-crack"}
**多一项，裂缝推远一些，却不合拢。** 墨色的粗曲线是 $\cos\theta$，三条青色曲线是取前 $N = 2, 3, 4$ 项的余弦多项式，在 $\theta$ 小时都贴着它，往右依次离开；品红的面积是 $N = 3$ 时的余项 $R_6(\theta)$，在左端薄得看不见，往右越张越大。余项的界见 [@rem-lagrange-taylor-remainder-literature]（文献结果）与 [@lem-exp-tail-le]。
:::

三条论断到这里都还只是话。下面把前两条换成可以核对的数字和已经冻结的定理。

**先看刘徽的割圆。** 取单位圆的内接正 $n$ 边形：其半周长为 $n\sin\frac{\pi}{n}$，每条边的中点到圆心的距离（边心距）为 $\cos\frac{\pi}{n}$，边的中点与圆弧之间的缝隙（弓高）为

$$
1 - \cos\frac{\pi}{n} \;=\; 2\sin^2\frac{\pi}{2n} .
$$

::: {.example #ex-liu-hui-polygon-sagitta title="刘徽割圆的数值表：半周长、边心距与弓高（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 单位圆内接正 $n$ 边形半周长 $n\sin\frac{\pi}{n}$ 从下方单调逼近 $\pi$、其与弓高的二阶泰勒渐近式以及刘徽正 $2n$ 边形面积恒等式属经典几何与实分析文献算例，未作为独立定理包含在本书锁定的形式化声明集中。以下数值以 40 位精度计算，四舍五入到所示位数。

| $n$ | 半周长 $n\sin\frac{\pi}{n}$ | $\pi - n\sin\frac{\pi}{n}$ | 边心距 $\cos\frac{\pi}{n}$ | 弓高 $1 - \cos\frac{\pi}{n}$ |
| :---: | :---: | :---: | :---: | :---: |
| $6$ | $3.0000000000$ | $1.42\times10^{-1}$ | $0.8660254038$ | $1.34\times10^{-1}$ |
| $12$ | $3.1058285412$ | $3.58\times10^{-2}$ | $0.9659258263$ | $3.41\times10^{-2}$ |
| $24$ | $3.1326286133$ | $8.96\times10^{-3}$ | $0.9914448614$ | $8.56\times10^{-3}$ |
| $48$ | $3.1393502030$ | $2.24\times10^{-3}$ | $0.9978589232$ | $2.14\times10^{-3}$ |
| $96$ | $3.1410319509$ | $5.61\times10^{-4}$ | $0.9994645875$ | $5.35\times10^{-4}$ |
| $192$ | $3.1414524723$ | $1.40\times10^{-4}$ | $0.9998661379$ | $1.34\times10^{-4}$ |
| $3072$ | $3.1415921060$ | $5.48\times10^{-7}$ | $0.9999994771$ | $5.23\times10^{-7}$ |

边数每翻一倍，两种残差都缩到约四分之一，与渐近式 $\pi - n\sin\frac{\pi}{n} \approx \frac{\pi^3}{6n^2}$、$1 - \cos\frac{\pi}{n} \approx \frac{\pi^2}{2n^2}$ 相符；但对每个有限的 $n$，两者都严格为正。（正 $n$ 边形的半周长等于正 $2n$ 边形的面积。刘徽用面积割圆，他的正 $192$ 边形面积对应表中 $n = 96$ 一行。）
:::

**泰勒余项的已验证版本。** 第 1 条引用的拉格朗日余项界是经典分析结果。所钉仓库里冻结着一条适用面更宽的余项界，它不只对实数上的余弦成立，而是对任意完备赋范代数里的指数级数成立。

::: {.lemma #lem-exp-tail-le title="完备赋范代数中指数级数的阶乘余项界" lean="D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le"}
设 $\mathbb{K}$ 为 $\mathbb{R}$ 或 $\mathbb{C}$（`[RCLike 𝕜]`），$A$ 为 $\mathbb{K}$ 上的完备赋范代数且 $\lVert 1\rVert = 1$（`[NormedRing A]`、`[NormedAlgebra 𝕜 A]`、`[CompleteSpace A]`、`[NormOneClass A]`）。设 $z \in A$，$r \in \mathbb{R}$，$n \in \mathbb{N}$，满足 $0 \le r$ 与 $\lVert z\rVert \le r$。则

$$
\Bigl\lVert\, \exp z \;-\; \sum_{k=0}^{n-1} \frac{1}{k!}\,z^k \,\Bigr\rVert \;\le\; \frac{r^n}{n!}\,e^{r} .
$$
:::

::: proof
$\exp z$ 是级数 $\sum_k z^k/k!$ 的和（`NormedSpace.exp_series_hasSum_exp'`），减去前 $n$ 项后剩下尾部 $\sum_{k \ge 0} z^{k+n}/(k+n)!$。逐项估计：$\lVert z^{k+n}\rVert \le r^{k+n}$，而 $n!\,k!$ 整除 $(k+n)!$（`Nat.factorial_mul_factorial_dvd_factorial_add`），故 $(k+n)! \ge n!\,k!$，于是尾部第 $k$ 项的范数不超过 $\frac{r^n}{n!}\cdot\frac{r^k}{k!}$。右端对 $k$ 求和得 $\frac{r^n}{n!}\,e^r$，由逐项控制即得结论。完整证明由 Lean 内核检查。
:::

把 [@lem-exp-tail-le] 用到两个具体的代数上（以下两步代入是本书的手工说明）：

- 取 $A = \mathbb{C}$、$z = i\theta$、$n = 2N$。部分和 $\sum_{k<2N}(i\theta)^k/k!$ 的实部正是余弦的前 $N$ 项偶次多项式，而复数实部的绝对值不超过它的模，所以 $\lvert R_{2N}(\theta)\rvert \le \frac{\lvert\theta\rvert^{2N}}{(2N)!}\,e^{\lvert\theta\rvert}$。它比拉格朗日界多一个因子 $e^{\lvert\theta\rvert}$，换来的是：它是已验证引理的直接代入（代入的这两步是手工推导）。
- 取 $A = M_2(\mathbb{C})$（算子范数）、$z = -\frac{i\theta}{2}\,\vv{n}\cdot\vv{\sigma}$（$\vv{n}$ 为单位向量，于是 $\lVert z\rVert = \frac{\lvert\theta\rvert}{2}$）。旋转器 $U = \exp z$ 的 $n$ 项截断满足 $\bigl\lVert U - \sum_{k<n} z^k/k!\bigr\rVert \le \frac{(\lvert\theta\rvert/2)^n}{n!}\,e^{\lvert\theta\rvert/2}$。

::: {.example #ex-taylor-remainder-three-bounds title="余弦与旋转器的截断余项：实际值、拉格朗日界与由已验证引理得到的界"}
（表中中间一列的拉格朗日界 $\frac{(\theta^*)^{2N}}{(2N)!}$ 属**文献结果，未在本书形式化**，见 [@rem-lagrange-taylor-remainder-literature]；右列已验证界由冻结引理 [@lem-exp-tail-le] 给出。）

**余弦，取 $\theta = \theta^* \approx 0.739085$（第二十四章的余弦不动点）。**

| $N$ | 实际余项 $\lvert R_{2N}(\theta^*)\rvert$ | 拉格朗日界 $\frac{(\theta^*)^{2N}}{(2N)!}$ | 由已验证引理代入的界 $\frac{(\theta^*)^{2N}}{(2N)!}\,e^{\theta^*}$ |
| :---: | :---: | :---: | :---: |
| $1$ | $2.61\times10^{-1}$ | $2.73\times10^{-1}$ | $5.72\times10^{-1}$ |
| $2$ | $1.22\times10^{-2}$ | $1.24\times10^{-2}$ | $2.60\times10^{-2}$ |
| $3$ | $2.24\times10^{-4}$ | $2.26\times10^{-4}$ | $4.74\times10^{-4}$ |
| $4$ | $2.19\times10^{-6}$ | $2.21\times10^{-6}$ | $4.62\times10^{-6}$ |
| $5$ | $1.33\times10^{-8}$ | $1.34\times10^{-8}$ | $2.81\times10^{-8}$ |
| $6$ | $5.53\times10^{-11}$ | $5.55\times10^{-11}$ | $1.16\times10^{-10}$ |

**旋转器，取 $\theta = \pi$（一次 $\pi$ 脉冲），$r = \pi/2$。**

| 截断项数 $n$ | 实际误差 $\bigl\lVert U - \sum_{k<n} z^k/k!\bigr\rVert$ | 已验证界 $\frac{(\pi/2)^n}{n!}\,e^{\pi/2}$ |
| :---: | :---: | :---: |
| $4$ | $2.45\times10^{-1}$ | $1.22$ |
| $8$ | $9.08\times10^{-4}$ | $4.42\times10^{-3}$ |
| $12$ | $4.68\times10^{-7}$ | $2.27\times10^{-6}$ |

每一行的实际余项都落在界内，也都严格为正。
:::

**有限记录的弓形残差。** 第 2 条论断说，有限步操作得到的只是内接多面体，平坦的面与球皮之间留着弓形残差。所钉仓库里有两条冻结定理，给这句话一个字面意义上的版本：把“有限的门计数”换成“只有有限格的记录指针”，残差的下界恰好由正多边形的弓高给出（相干损失至少为弓高，恢复误差至少为弓高的一半）。

物理图像是这样的。一台记录指针有 $N + 1$ 格，振幅为 $c(0), \dots, c(N)$。系统的第 $i$ 个分支带一个整数标签 $q_i$，记录的方式是把指针平移 $q_i$ 格。两个标签相差 $\ell$ 的分支，记录之后它们之间的相干项被乘上一个因子：指针与它自己平移 $\ell$ 格之后的重叠

$$
\gamma(\ell) \;=\; \sum_{k \in \mathbb{Z}} c(k + \ell)\,\overline{c(k)} .
$$

若 $\lvert\gamma(\ell)\rvert = 1$，平移前后的指针无法区分，这次记录什么也没记下，相干性完好；若 $\lvert\gamma(\ell)\rvert < 1$，相干性受损。问题是：有限格的指针能不能让 $\lvert\gamma(\ell)\rvert$ 等于 $1$？

::: {.lemma #lem-finite-support-autocorrelation-cosine title="有限支撑单位序列的自相关模长不超过割圆角的余弦" lean="D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.coefficient_gamma_le_cosine"}
设 $N \in \mathbb{N}$，$c : \mathbb{Z} \to \mathbb{C}$ 满足：

1. **有限支撑（`hsupport`）**：对一切 $k \in \mathbb{Z}$，若 $k < 0$ 或 $N < k$，则 $c(k) = 0$；
2. **归一化（`hnorm`）**：$\sum_{k \in \mathbb{Z}} \lVert c(k)\rVert^2 = 1$。

则对一切整数 $\ell \neq 0$，

$$
\Bigl\lVert \sum_{k \in \mathbb{Z}} c(k + \ell)\,\overline{c(k)} \Bigr\rVert \;\le\; \cos\frac{\pi}{\lfloor N/\lvert\ell\rvert\rfloor + 2},
$$

其中 $\lfloor N/\lvert\ell\rvert\rfloor$ 是自然数除法 $N / \ell.\mathrm{natAbs}$。
:::

::: proof
记 $d = \lvert\ell\rvert$，$m = \lfloor N/d\rfloor$。把支撑 $\{0, \dots, N\}$ 按模 $d$ 的剩余类分成 $d$ 条链，每条链上相邻两个下标恰好相差 $d$，链长不超过 $m + 1$；自相关的模长不超过各链上“相邻两项模长乘积之和”的总和，而各链的模长平方和加起来等于 $\sum_k \lVert c(k)\rVert^2$（`residue_block_bounds`）。在每条链上使用路径不等式 $\sum_{k<m} x_k x_{k+1} \le \cos\frac{\pi}{m+2}\sum_{k \le m} x_k^2$（`path_correlation_le_cos`，由最近邻平均的二次型界与柯西—施瓦茨不等式得到），对各链求和并代入归一化条件即得结论。完整证明由 Lean 内核检查。
:::

右端的 $\cos\frac{\pi}{m+2}$ 正是单位圆内接正 $(m+2)$ 边形的边心距（[@ex-liu-hui-polygon-sagitta]），它严格小于 $1$。所以答案是否定的：有限格的指针一旦被平移，就一定留下痕迹。下面的定理把这道痕迹换算成任何恢复操作都补不回来的误差。

::: {.theorem #thm-finite-record-cosine-obstruction title="有限记录信道的恢复误差具有严格为正的余弦下界" lean="D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.finite_record_cosine_obstruction"}
设 $\iota$ 为有限类型（`[Fintype ι]`、`[DecidableEq ι]`），$N \in \mathbb{N}$，$c : \mathbb{Z} \to \mathbb{C}$，$q : \iota \to \mathbb{Z}$，并设 $c$ 满足 [@lem-finite-support-autocorrelation-cosine] 的两条前提 `hsupport` 与 `hnorm`。记

- $\gamma(t) = \sum_{k \in \mathbb{Z}} c(k + t)\,\overline{c(k)}$（$t \in \mathbb{Z}$）；
- $Q = \sum_{i \in \iota} \lvert q_i\rvert$，$L = N + 2Q + 1$，$\operatorname{coord}(a) = a - Q$（$a \in \operatorname{Fin} L$）；
- $\operatorname{record}_i(a) = c(\operatorname{coord}(a) + q_i)$；
- $V$ 为 $(\iota \times \operatorname{Fin} L) \times \iota$ 复矩阵，$V_{(i', a),\, j} = \operatorname{record}_{i'}(a)$（当 $j = i'$），否则为 $0$；
- $\operatorname{partialTrace}(J)_{ij} = \sum_{a \in \operatorname{Fin} L} J_{(i, a), (j, a)}$；
- $\Lambda(A) = \operatorname{partialTrace}(V A V^\dagger)$（$A$ 为 $\iota \times \iota$ 复矩阵）。

则存在量子信道 $C$（`QuantumChannel ι ι`，即迹保持的完全正映射）使得：

1. 对一切 $\iota \times \iota$ 复矩阵 $A$：$\operatorname{act} C\ A = \Lambda(A)$；
2. 对一切 $A$ 与 $i, j \in \iota$：$\Lambda(A)_{ij} = \gamma(q_i - q_j)\,A_{ij}$；
3. 对一切 $i, j \in \iota$ 与整数 $\ell \neq 0$，若 $q_i - q_j = \ell$，则对每个量子信道 $R$（`QuantumChannel ι ι`），记

   $$
   f = \Bigl\lfloor \frac{N}{\lvert\ell\rvert} \Bigr\rfloor, \qquad \mathrm{bound} = \frac{1}{2}\Bigl(1 - \cos\frac{\pi}{f + 2}\Bigr),
   $$

   并记 $\mathrm{errors} = \bigl\{\, T\bigl(R(C(\rho)),\, \rho\bigr) \;\big|\; \rho \in \operatorname{DensityState}\ \iota \,\bigr\}$（$T$ 为迹距离 `traceDistance`），$\mathrm{matrixErrors} = \bigl\{\, \tfrac12\lVert \operatorname{act} R\ (\Lambda(\rho)) - \rho \rVert_1 \;\big|\; \rho \in \operatorname{DensityState}\ \iota \,\bigr\}$（$\lVert\cdot\rVert_1$ 为迹范数 `traceNorm`），以下五项同时成立：
   - $\mathrm{errors} = \mathrm{matrixErrors}$；
   - 对一切密度态 $\rho, \sigma$：$0 \le T(\rho, \sigma) \le 1$；
   - $\mathrm{errors}$ 非空且有上界；
   - $\mathrm{bound} \le \sup \mathrm{errors}$；
   - $0 < \mathrm{bound}$。
:::

::: proof
证明把三个模块的结论接在一起。其一，`FiniteShiftedRecordChannel` 证明 $\Lambda$ 是一个量子信道的作用，并给出逐元公式 $\Lambda(A)_{ij} = \gamma(q_i - q_j)\,A_{ij}$，这是结论 1 与 2。其二，`FiniteRecordRecoveryError` 证明：只要 $q_i \neq q_j$，对任何恢复信道 $R$，误差集合非空、有上界，且其上确界不小于 $\frac12\bigl(1 - \lVert\gamma(q_i - q_j)\rVert\bigr)$；同一模块给出迹距离落在 $[0, 1]$ 中。其三，[@lem-finite-support-autocorrelation-cosine] 给出 $\lVert\gamma(\ell)\rVert \le \cos\frac{\pi}{f+2}$，代入即得 $\mathrm{bound} \le \sup\mathrm{errors}$。最后，因 $0 < \frac{\pi}{f+2} \le \frac{\pi}{2}$，余弦严格小于 $\cos 0 = 1$，故 $\mathrm{bound} > 0$（`gap_floor_positive`）。完整证明由 Lean 内核检查。
:::

[@thm-finite-record-cosine-obstruction] 中的下界可以直接读成几何量：

$$
\mathrm{bound} \;=\; \frac12\Bigl(1 - \cos\frac{\pi}{m + 2}\Bigr), \qquad m = \Bigl\lfloor \frac{N}{\lvert\ell\rvert} \Bigr\rfloor,
$$

是单位圆内接正 $(m+2)$ 边形弓高的一半。$m = 0$（指针一步就被移出自己的支撑）时它等于 $\frac12$；$m = 1, 2, 4, 10, 98$ 时分别为 $0.2500$、$0.1464$、$0.0670$、$0.0170$、$2.47\times10^{-4}$；$m$ 很大时它按 $\frac{\pi^2}{4(m+2)^2}$ 趋于零。指针越长，记录可以越轻，留下的不可恢复误差越小，但对每个有限的 $N$ 它都严格为正。这条定理只针对这一种平移记录信道与一对标签差非零的分支，并不断言其他编码方式下也有同样的下界。

::: {.viz src="sphere-escape" preset="pointer" height="500"}
**有限指针的重叠就是多边形的边心距。** 青色是 $9$ 格指针的正弦形振幅，品红的轮廓是它平移 $\ell = 1$ 格的副本；两者的重叠 $\lvert\gamma(1)\rvert = 0.9511$（琥珀色的点）恰好落在正 $10$ 边形的边上，即边心距 $\cos\frac{\pi}{10}$，离圆上的 $1$ 还差一段品红的弓高。换指针的形状与长度、加大 $\ell$，琥珀色的点都越不过那条边（[@lem-finite-support-autocorrelation-cosine]、[@thm-finite-record-cosine-obstruction]；正弦形取到等号是页面的数值结果）。
:::

**有限门计数的硬下界。** 回到第 2 条论断本身。那里只说内接多面体与球皮之间“留着”残差，没有说至少留多少。一行球冠面积就能给出答案。

::: {.example #ex-cap-covering-gate-count title="球冠覆盖：N 个顶点的内接多面体至少留下 2/N 的残差，以及门计数的下界"}
**文献结果，未在本书形式化。** 本例调用阿基米德单位球冠面积公式（高为 $\delta$ 的单位球冠面积等于 $2\pi\delta$）给出初等覆盖下界，并与 [@rem-solovay-kitaev-literature] 对照。

**残差的定义。** 设 $S$ 为单位球面 $S^2$ 上的 $N$ 个点，$P = \operatorname{conv}(S)$ 为其凸包。对单位向量 $\vv{u}$，球面在这个方向上伸到 $1$，多面体伸到支撑函数值 $h_P(\vv{u}) = \max_{\vv{s} \in S} \vv{u}\cdot\vv{s}$。称 $1 - h_P(\vv{u})$ 为方向 $\vv{u}$ 上的残差。

**断言：存在方向 $\vv{u}$ 使残差不小于 $2/N$。** 设最大残差为 $\rho$，并假设 $\rho < 2/N$；取 $\delta$ 满足 $\rho < \delta < 2/N$。每个方向 $\vv{u}$ 都有某个 $\vv{s} \in S$ 使 $\vv{u}\cdot\vv{s} > 1 - \delta$，即 $\vv{u}$ 落在以 $\vv{s}$ 为顶、高为 $\delta$ 的球冠里。高为 $\delta$ 的球冠面积是 $2\pi\delta$（阿基米德：单位球面上球冠的面积等于 $2\pi$ 乘以它的高），$N$ 个这样的球冠总面积 $2\pi\delta N < 4\pi$，盖不住整个球面，矛盾。

**用正多面体核对。** 正多面体的最大残差出现在面心方向，等于 $1$ 减去内切球与外接球半径之比：

| 多面体 | 顶点数 $N$ | 实际最大残差 | 下界 $2/N$ |
| :---: | :---: | :---: | :---: |
| 正四面体 | $4$ | $0.6667$ | $0.5000$ |
| 正八面体 | $6$ | $0.4226$ | $0.3333$ |
| 正方体 | $8$ | $0.4226$ | $0.2500$ |
| 正二十面体 | $12$ | $0.2053$ | $0.1667$ |
| 正十二面体 | $20$ | $0.2053$ | $0.1000$ |

**换算成门计数。** 门集有 $g$ 个门时，从固定初态出发、长度不超过 $L$ 的门字至多 $1 + g + \dots + g^L = \frac{g^{L+1} - 1}{g - 1}$ 个，可达的点数不超过这个数。对 $g = 2$（例如 $\{H, T\}$），$N \le 2^{L+1} - 1$，于是最大残差至少为 $\frac{2}{2^{L+1} - 1}$，相应的角半径（球面上离可达点集最远的点的角距离）至少为 $\arccos\bigl(1 - \frac{2}{N}\bigr)$：

| 门长上限 $L$ | 点数上限 $2^{L+1} - 1$ | 残差下界 | 角半径下界 |
| :---: | :---: | :---: | :---: |
| $1$ | $3$ | $0.6667$ | $70.53^\circ$ |
| $2$ | $7$ | $0.2857$ | $44.42^\circ$ |
| $3$ | $15$ | $0.1333$ | $29.93^\circ$ |
| $5$ | $63$ | $0.0317$ | $14.48^\circ$ |
| $10$ | $2047$ | $9.77\times10^{-4}$ | $2.533^\circ$ |
| $20$ | $2097151$ | $9.54\times10^{-7}$ | $0.0791^\circ$ |

第十六章 [@ex-finite-ht-polytope] 中长度不超过 $3$ 的 $\{H, T\}$ 门字实际只到达 $5$ 个不同的点，按本例残差至少为 $2/5$，角半径至少为 $53.13^\circ$。

**反过来读。** 要让球面上每一点离可达点集的角距离都小于 $\varepsilon$，必须 $2^{L+1} - 1 \ge \frac{2}{1 - \cos\varepsilon}$，即 $L \ge \log_2\bigl(\frac{2}{1 - \cos\varepsilon} + 1\bigr) - 1 \approx 2\log_2\frac{1}{\varepsilon} + 1$。对 $\varepsilon = 10^{-2}, 10^{-3}, 10^{-6}$（弧度）分别给出 $L \ge 15, 21, 41$。这是一个只靠计数得到的下界：门长至少随 $\log\frac{1}{\varepsilon}$ 线性增长。Solovay–Kitaev 定理（[@rem-solovay-kitaev-literature]，文献结果）给出的是与之配对的上界：$L = O\bigl(\log^c\frac{1}{\varepsilon}\bigr)$，$c \approx 3.97$，关于 $\log\frac{1}{\varepsilon}$ 是多项式而不是线性的。
:::

把四种残差尺度并排放：正 $n$ 边形的弓高为 $1 - \cos\frac{\pi}{n} = 2\sin^2\frac{\pi}{2n}$（[@ex-liu-hui-polygon-sagitta]）；$N + 1$ 格指针的不可恢复误差至少是正 $(m+2)$ 边形弓高的一半（[@thm-finite-record-cosine-obstruction]）；$N$ 个顶点的内接多面体覆盖下界见 [@ex-cap-covering-gate-count]；前 $N$ 项余弦多项式的余项受 [@lem-exp-tail-le] 的阶乘界 $\frac{|\theta|^{2N}}{(2N)!}e^{|\theta|}$ 控制（数值对照见 [@ex-taylor-remainder-three-bounds]）。它们都随资源增长而趋于零，而对有限记录信道与有限算例均呈严格正残差。序曲里那句“我们以为我们得到了一个球，但实际只是近似得到一个球”，在这四个场合各有一个可以核对的数。

::: {.viz src="sphere-escape" preset="liuhui" height="500"}
**刘徽割圆。** 边数从 $6$ 翻倍到 $192$，多边形越来越像圆；右侧的放大镜始终把一条边与圆弧之间的缝放大到看得见。这条缝 $1 - \cos\frac{\pi}{n}$ 每翻一倍缩到约四分之一，对任何有限的 $n$ 都大于零（[@ex-liu-hui-polygon-sagitta]）。
:::

## 21.4 毛球定理、笛卡尔 $720^\circ$ 角亏与 Adams 除法代数球面 {#sec-ch21-4}

甚至哪怕我们退一步，不去跨维度构造哥德尔对角线，而是老老实实待在三维空间里那颗光滑的二维单比特布洛赫球面 $S^2$ 上，拓扑学本身也在球皮表面埋下了一颗无法抚平的奇点——这就是大名鼎鼎的**毛球定理（Hairy Ball Theorem）**，以及它在离散多面体上的孪生兄弟**笛卡尔总角亏定理**与高维球面上的 **Adams 可平行化定理**。

在单比特布洛赫球面 $S^2$ 上，能否设计出一套全局连续、无奇点的切向基准标架（给每一个纯态 $\vv{a} \in S^2$ 都连续指定一根垂直起跑方向 $\vv{v}(\vv{a}) \perp \vv{a}$）？在仅由度 $5$ 与度 $6$ 顶点拼成的封闭分片欧氏等边三角剖分球面（或其对偶的封闭三价富勒烯球笼）上，五重缺陷的个数受到怎样的拓扑约束？进而，若要求整座 $m$ 维切丛 $TS^m$ 拥有一套由 **$m$ 根处处线性无关切向量场组成的全局平行化标架（parallelization）**，究竟哪些维数的球面能够满足条件？

让我们在下面的经典文献注记中，把这三座横跨多面体组合学、微分拓扑与代数K理论的丰碑一次看清。

::: {.remark #rem-hairy-ball-adams-literature title="欧拉示性数、笛卡尔 720° 多面体总角亏、毛球定理与 Adams 可平行化球面定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 以下四项经典几何与拓扑定理从组合多面体、光滑切丛与赋范除法代数三个角度，严格锁定了球面内蕴标架的拓扑阻塞与维数奇迹：

1. **二维球面的欧拉示性数（Euler characteristic）**：对二维球面 $S^2$ 的任意凸多面体胞腔剖分（含 $V$ 个顶点、$E$ 条棱、$F$ 个面），欧拉公式恒给出拓扑不变量

   $$
   \chi(S^2) = V - E + F = 2.
   $$

   例如，正二十面体（icosahedron）拥有 $V = 12$ 个顶点、$E = 30$ 条棱与 $F = 20$ 个正三角形面，精确满足 $12 - 30 + 20 = 2$。
2. **笛卡尔总角亏定理与 $12 \times 60^\circ = 720^\circ = 4\pi$ 五边形缺陷锁（Descartes's total angular defect）**：需要严格区分**光滑圆球面上的球面测地线三角形**与**分片平坦（piecewise-Euclidean）多面体表面上的欧氏平面三角形**——在常曲率 $+1$ 的光滑圆球面 $S^2$ 上，非退化球面测地线三角形具有正的球面角盈 $\alpha + \beta + \gamma > \pi$（例如球面正二十面体剖分中每个球面正三角形内角为 $72^\circ$，$5$ 个角在光滑顶点处拼成 $5 \times 72^\circ = 360^\circ$，因为 $4\pi$ 的高斯曲率均匀分布在弯曲面片内部）；相反，考察同胚于 $S^2$ 的**封闭分片欧氏等边三角剖分多面体表面**，其每个面都是内角为 $\pi/3 = 60^\circ$ 的平坦欧氏等边三角形，所有高斯曲率都浓缩为顶点处的离散角亏。若某个顶点周围汇集了 $6$ 个平坦等边三角形（度为 $6$），其环绕内角和为 $6 \times 60^\circ = 360^\circ = 2\pi$，局部角亏（angular defect）为 $\delta_6 = 0$，因此纯由度 $6$ 顶点组成的平坦三角网格只能铺成欧氏平面或平坦环面（$\chi(T^2) = 0$），绝不可能合拢成封闭球面！若该封闭分片欧氏等边三角剖分球面仅含度 $5$ 与度 $6$ 顶点，则每个度为 $5$ 的顶点处环绕内角和为 $5 \times 60^\circ = 300^\circ$，留出局部正角亏

   $$
   \delta_5 = 2\pi - 5\times\frac{\pi}{3} = \frac{\pi}{3} = 60^\circ.
   $$

   由笛卡尔多面体总角亏定理（高斯—博内定理 $\int_{S^2} K\,dA = 2\pi\chi(S^2) = 4\pi$ 的离散原型），任何同胚于 $S^2$ 的封闭多面体所有顶点的角亏总和恒等于 $2\pi\chi(S^2) = 4\pi = 720^\circ$。既然度 $6$ 顶点角亏为 $0$，而每个度 $5$ 顶点贡献恰好 $60^\circ$ 角亏，整颗封闭分片平坦三角剖分球面上就**必须不多不少恰好存在 $720^\circ / 60^\circ = 12$ 个度 $5$ 角亏顶点**（$12 \times 60^\circ = 720^\circ = 4\pi$）！对偶地，在由正五边形（$F_5$ 个）与正六边形（$F_6$ 个）拼成的任意**封闭三价富勒烯多面体笼**（每个顶点度为 $3$，故 $3V = 2E = 5F_5 + 6F_6$）上，欧拉公式 $6(V - E + F) = 6F - 2E = (6-5)F_5 + (6-6)F_6 = 12$ 同样严格锁定**恰好存在 $F_5 = 12$ 个五边形面**。这正是[序曲](README.md)与本章“割圆多面体近似”在组合拓扑上的铁证：有限分片平坦多面体要想弯曲合拢成球，就必须把 $4\pi$ 的总曲率集中为离散顶点上的角亏接缝。
3. **庞加莱—布劳威尔毛球定理与奇偶维球面切向量场（Poincaré–Brouwer Hairy Ball Theorem）**：球面 $S^m$ 的欧拉示性数为 $\chi(S^m) = 1 + (-1)^m$。对任意**偶数维球面** $S^{2n}$，由于 $\chi(S^{2n}) = 2 \neq 0$（特别地 $\chi(S^2) = 2$），由庞加莱—霍普夫（Poincaré–Hopf）向量场指标定理，$S^{2n}$ 上的任何连续切向量场 $v : S^{2n} \to TS^{2n}$ 必然至少在一个奇点 $x_0 \in S^{2n}$ 处归零（$v(x_0) = 0$）；在量子力学中，这意味着单量子比特纯态流形 $S^2 \cong \mathbb{CP}^1$ 的切丛（以及其上的 $U(1)$ 霍普夫主丛 $S^3 \to S^2$）不存在全局连续无奇点的截面（狄拉克磁单极与贝里相位奇点的拓扑根源正在于此）。反之，对任意**奇数维球面** $S^{2n-1} \subset \mathbb{C}^n$，由于 $\chi(S^{2n-1}) = 0$，它总能容许**至少一根**处处非零的连续单位切向量场——例如将复坐标乘以虚数单位 $v(z) = iz$（在实坐标下即 $v(x_1, x_2, \dots, x_{2n-1}, x_{2n}) = (-x_2, x_1, \dots, -x_{2n}, x_{2n-1})$，如在 $S^5$ 上即无奇点）。
4. **Hurwitz 赋范除法代数与 Adams 可平行化球面定理（Adams, 1962）**：注意“存在**一根**无奇点切向量场”（所有奇数维球面 $S^{2n-1}$ 均具备）与“存在 **$m$ 根处处线性无关的全局切向量场标架**”（即切丛 $TS^m$ 全局平凡、流形**可平行化** parallelizable）之间的本质区别！例如 $S^5$ 虽有一根无奇点切场，却无法凑齐 $5$ 根处处线性无关的全局切标架。究竟哪些维数的单位球面 $S^m$ 是可平行化的？由 Hurwitz 定理，实数域 $\mathbb{R}$ 上的有限维赋范除法代数（满足乘积模长守恒 $\|xy\| = \|x\|\|y\|$）只有四个：**实数 $\mathbb{R}$（$1$ 维）、复数 $\mathbb{C}$（$2$ 维）、四元数 $\mathbb{H}$（$4$ 维）与八元数 $\mathbb{O}$（$8$ 维）**。它们的单位球面分别是零维球 $S^0 \subset \mathbb{R}^1$、一维圆周 $S^1 \subset \mathbb{C} \cong \mathbb{R}^2$、三维超球面 $S^3 \subset \mathbb{H} \cong \mathbb{R}^4$ 与七维超球面 $S^7 \subset \mathbb{O} \cong \mathbb{R}^8$，利用除法代数的虚部基元左乘即可直接构造出完备的全局正交切标架。J. Frank Adams（1960–1962）利用拓扑 K 理论解决了霍普夫不变量为一（Hopf invariant one）问题，严格证明：**在所有正维数球面中，唯有 $S^1, S^3, S^7$（连同零维伴侣 $S^0$）是可平行化的！**

将本注记的第 3 条与第 4 条并读，便可从经典拓扑视角回望[第一章](ch01-measurement.md)的几何伏笔：单比特观测球面 $S^2$（偶维数 $2 \notin \{0, 1, 3, 7\}$，$\chi(S^2) = 2$）上不存在处处非零的连续切向量场；而通过霍普夫纤维化包覆其外的三维超球面 $S^3 \cong \mathrm{SU}(2)$（四元数单位球面，属于 Adams 可平行化名单 $\{S^0, S^1, S^3, S^7\}$；注意 $S^3$ 的圆球黎曼度规仍具常正截面曲率 $+1$，并非欧氏平坦度规），其切丛 $TS^3$ 则借助四元数左不变标架获得了全局拓扑平凡化。
:::

::: {.figure src="ch21-angle-defect"}
**平坦的三角形要合成球，顶点处的角亏总得合成 $4\pi$。** 左边是一个顶点周围摊平的五个等边三角形，五个 $60^\circ$ 只凑出 $300^\circ$，下方品红的缺口就是 $60^\circ$ 的角亏；右边正二十面体的十二个品红顶点各缺 $60^\circ$，合起来 $12 \times 60^\circ = 720^\circ = 4\pi$（文献结果，未在本书形式化，见 [@rem-hairy-ball-adams-literature]）。
:::

图里只有十二个顶点。把每个三角形面再切成 $\nu^2$ 个小三角形、把新顶点推到球面上（测地穹顶），顶点从 $12$ 个增到 $42$、$92$、$162$ 个，每个顶点缺得越来越少，加起来却始终是 $4\pi$：

::: {.viz src="hairy-ball-normal-escape" preset="defect" height="500"}
**越切越细，角亏的总和不动。** 正二十面体的每个面切成 $\nu^2$ 个平的三角形，顶点推到球面上；品红圆点的面积是那个顶点的角亏。时间轴把每条边从 $\nu = 1$ 段切到 $\nu = 6$ 段，圆点越来越多、越来越小，左上角的读数一直是 $720^\circ = 4\pi$（文献结果，未在本书形式化，见 [@rem-hairy-ball-adams-literature]）。
:::

毛球定理只说零点躲不掉；庞加莱—霍普夫定理说得更细：每个零点带一个整数指标——绕它走一小圈，箭头跟着转几圈——所有零点的指标加起来等于 $\chi(S^2) = 2$。贝里回路一章那张梳不平的箭头场在南北两极各有一个 $+1$。零点可以推着走、可以合并，却不能把这个和推掉：

::: {.viz src="hairy-ball-normal-escape" preset="merge" height="500"}
**两个 $+1$ 合成一个 $+2$。** 青色的箭头从纬向场 $(-y, x, 0)$ 出发连续地变，时间轴把南极的零点沿经线推到北极；到北极只剩一个零点，它周围品红小圈上的青色箭头转了两圈。这就是偶极切场 $\vv{w} = \bigl(\frac{(1-z)^2 - x^2 + y^2}{2},\, -xy,\, x(1-z)\bigr)$，$\lVert\vv{w}\rVert = 1 - z$，只在北极为零。指标之和始终是 $2$（文献结果，未在本书形式化，见 [@rem-hairy-ball-adams-literature]；中间那一族场是为画面选定的）。
:::

零点除不掉，是因为箭头被要求贴在切平面里。若允许它沿外法向立起一部分，在三维空间里它就处处不为零。这是本书把“球外之球”读进画面的方式（`MODEL`），并不反驳毛球定理：立起来的箭头已经不是切向量。

::: {.viz src="hairy-ball-normal-escape" preset="escape" height="500"}
**沿法向立起，零点没了。** 偶极场的箭头按 $\widetilde{\vv{w}}_\lambda = (1-\lambda)\,\vv{w} + \lambda\,\frac{1+z}{2}\,\vv{x}$ 立起一半（$\lambda = \frac12$）：品红的短线是立起的部分，北极处琥珀色的箭头竖出灰色的切平面，长 $\frac12$；最短的箭头在品红虚线那一圈，长约 $0.447$，球面上没有一个零点。把抬升读作跳出切空间是诠释模型（`MODEL`）。
:::

下面的完整实验室把这几幅画放在一起，另有环面一景：换成欧拉示性数为 $0$ 的环面，箭头可以处处不为零，同余数椭圆曲线的环面还会回到这一点。

::: {.viz src="hairy-ball-normal-escape" height="640"}
交互实验室 `ORTHO//HAIRY`：球面上的纬向场与它的两个 $+1$ 零点、把它们推成一个 $+2$ 的那一族场、环面上处处长为 $1$ 的切场、逐级细分的测地穹顶与它们的顶点角亏、沿外法向的抬升 $\widetilde{\vv{w}}_\lambda$。每个指标、每个角亏与最短箭头的长度都由页面实算（`NUM`）；庞加莱—霍普夫定理与笛卡尔定理是文献结果（[@rem-hairy-ball-adams-literature]），抬升的读法是诠释模型（`MODEL`）。依据面板里的绿色框是 [@thm-complete-diagonal-not-continuous]，它讲的是对角线在划分拓扑下不连续，与毛球定理不是同一条陈述。
:::

把上述微分拓扑文献注记（[@rem-hairy-ball-adams-literature]）与本章经内核验证的相对语义对角线拓扑安顿推论（[@cor-complete-diagonal-topological-settlement]）对照阅读，可以看到同一条结构脉络：**球内的奇点与不完备，唯有借球外之球方能安顿。**

::: {.viz src="sphere-escape" height="640"}
交互实验室 `ORTHO//ESCAPE`：六个场景画同一件事——有限步之后总有东西留在外面。对角线翻出的串不在清单里（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)）；完备目录的对角线总劈开一根旧纤维；内接多边形与圆之间的缝永不为零；有限格的记录指针平移后与自己的重叠到不了 $1$；余弦迭代永远差一点；有限个素数乘起来加一，素因子都在清单之外。舞台下方的两张图画出“留在外面的量”随步数的变化。把六个场景并排是本书的读法（`MODEL`），它们在数学上是六个不同的事实；依据面板同时列出 [@thm-complete-diagonal-not-continuous]、[@cor-complete-diagonal-topological-settlement] 与第二十四章的两条不动点定理。
:::

那么，在这座无穷无尽的升维阶梯上，算术世界本身的那些“互不相干的正交坐标轴”究竟长什么模样？当我们用“两两比较、顺序无关”的几何眼光去打量全体自然数时，为什么每一个素数 $p = 2, 3, 5, 7, \dots$ 都自动站成了一根独立的正交基准轴？让我们推开[第二十二章](ch22-primes-euler-products-and-zeros.md)的大门。
