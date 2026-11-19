# 附录 F 排除球、面极性与自旋因子定向分类 {#sec-appendix-f}

在[第二章](ch02-born-rule.md)中，我们以给定的有限维复矩阵代数 $M_n(\mathbb{C})$ 为舞台，一方面证明密度矩阵与幂等投影算子的迹配对满足概率测度公理（[@thm-born-probability-skeleton]），并从探针上的最小确认剥离出正对偶谱分解（[@def-confirmation-system]、[@thm-positive-dual-generation]）；另一方面通过有限维布施效应定理（[@thm-busch-effect-density]）与 $N \ge 3$ 有限复维格里森表示定理（[@thm-gleason-finite-projection]）回答了“可加读数何时必为迹配对”。随后在[附录 E](appendix-e.md) 中，我们沿两槽比较原语逐层审计了从抽象比较接口通往内积与量子公设的条件桥梁（[@rem-appe-layer-taxonomy]），严防将隐含几何前提当作无条件免费推论。本附录则退后一步，追问一个更底层的凸几何重构问题：**倘若不预先假定复希尔伯特空间与投影格，而是从有限维实向量空间中的一个抽象尖凸态锥 $(C, u)$ 出发，究竟在排除集（exclusion sets）与二元关系配对上施加哪些显式的几何与序论公理，态空间才会呈现出面极性二分、欧氏球图表以及带定向的四维自旋因子与 $2\times 2$ 泡利矩阵接口？**

围绕这一问题，本附录按阅读与构造次序串联四项经 Lean 内核冻结验证的结果（`LEAN ✓`，验证边界见[附录 C](appendix-c.md)）：

1. **二次排除约束的球心平移**（F.1 节，[@thm-appf-recentered-ball]）：揭示双能级对角权重 $t, 1-t$ 与非对角相干幅值 $b$ 之间的二次不等式 $b^2 \le t(1-t)$ 如何通过配方等价于以 $(1/2, 0)$ 为圆心、$1/2$ 为半径的欧氏闭圆盘；
2. **抽象尖凸态锥的排除球与面极性分类**（F.2 节，[@thm-appf-exclusion-face-polarity]）：在闭、严格正归一化且张成全空间的有限维实尖凸锥上，证明一旦显式假定每个纯态的排除集皆具正维欧氏球图表（`exclusionBalls`），则态底的一切非空真凸极子集必精确二分为单点纯态或某纯态的暴露排除面；再补入成对纯态真性条件（`pairProper`），任意两相异纯态生成的最小锥面切片亦必化为第三纯态的排除球（`wholePairBalls`）；
3. **三阶复厄米态锥中的具体球图表实现**（F.3 节，[@thm-appf-hermitian-exclusion-chart]）：在三能级量子系统（qutrit，$3 \times 3$ 复厄米半正定锥）中具体实现上述公理，证明每个纯态的排除面都携带实仿射维数为 $3$ 的球图表——即嵌入在正交补二维子空间上的单比特布洛赫球；
4. **四维自旋因子关系的定向分类与泡利矩阵接口**（F.4 节，[@thm-appf-spin-factor-classification]）：聚焦于与单比特态锥同构的四维载体 $E = \mathbb{R} \times \mathbb{R}^3$，证明任何满足二点格拉姆半正定公理 `P2` 与正交相位平衡公理 `PB` 的二元关系 $D$，必全局唯一锁定为右手或左手空间叉积 `crossD`，并同步导出任意有限阶格拉姆正性、约当—李结合子恒等式以及完整的 $2 \times 2$ 复泡利矩阵接口。

上述四节之间的箭头代表由浅入深的几何构造脉络，绝不冒充后一模块的前提可由前一模块无条件自动免除：抽象凸锥必须逐条检验各自公理，两个具体量子实现（三阶厄米锥与四维自旋因子）之间的维度对应与边界则在 F.5 节（[@rem-appf-epistemic-boundary]）中逐项立账。

---

## F.1 二次排除约束的球心平移 {#sec-appendix-f-1}

为什么一旦允许相干叠加，两个互斥纯态之间的状态集合就不再是一条扁平的经典概率线段，而是向外鼓成一枚圆盘或实心球？不妨先做一个最透明的二维实矩阵手算（`手工推导`）。考察迹为 $1$ 的 $2 \times 2$ 实对称测试矩阵

$$
M(t, b) = \begin{pmatrix} t & b \\ b & 1 - t \end{pmatrix}, \qquad (t, b) \in \mathbb{R}^2.
$$

这里 $t$ 与 $1 - t$ 是分配在两个正交基方向上的对角权重，$b$ 是连接两者的实相干幅值。矩阵 $M(t, b)$ 的迹恒为 $\Tr M(t, b) = t + (1 - t) = 1 > 0$，因此它半正定当且仅当其行列式非负：

$$
\det M(t, b) = t(1 - t) - b^2 \ge 0 \iff b^2 \le t(1 - t).
$$

我们先在三个特征位置亲手检验这条二次约束的几何轮廓（`手工推导`）：

- **中点横截（$t = 1/2$）**：此时两对角权重相等，约束化为 $b^2 \le \frac{1}{2}\left(1 - \frac{1}{2}\right) = \frac{1}{4}$，即 $|b| \le \frac{1}{2}$，横向相干半径达到最大值 $1/2$；
- **纯态端点（$t = 0$ 或 $t = 1$）**：此时右端 $t(1 - t) = 0$，实数平方的非负性迫使 $b^2 \le 0 \implies b = 0$。换言之，一旦某一方的对角权重被彻底排除（$t = 0$），与之相连的非对角相干项 $b$ 也必须当场归零，状态收缩为孤立纯态端点 $(0, 0)$ 或 $(1, 0)$；
- **区间外禁区（$t < 0$ 或 $t > 1$）**：此时 $t(1 - t) < 0$，没有任何实数 $b$ 能满足 $b^2 \le t(1 - t)$。

在纵向坐标 $t$ 上对二次项 $t - t^2$ 配方，有 $t(1 - t) = \frac{1}{4} - \left(t - \frac{1}{2}\right)^2$。将其移项合并，原本看似非对称的乘积界 $b^2 \le t(1 - t)$，瞬间还原为平面 $\mathbb{R}^2$ 上以 $(1/2, 0)$ 为圆心、$1/2$ 为半径的欧氏闭圆盘方程。下面的冻结定理精确记录了这一实代数等价关系。

::: {.theorem #thm-appf-recentered-ball title="二次排除约束的球心平移" lean="D5/S3/Quantum/OriginExclusionSegmentRigidity.b_constraint_recenter"}
对任意实数 $t, b \in \mathbb{R}$，成立等价关系

$$
b^2 \le t(1 - t) \iff \left(t - \frac{1}{2}\right)^2 + b^2 \le \left(\frac{1}{2}\right)^2.
$$
:::


::: proof
在实数域 $\mathbb{R}$ 中（常数分母 $2 \neq 0$），直接展开右端圆盘不等式的左半部并减去右半部：

$$
\left(t - \frac{1}{2}\right)^2 + b^2 - \left(\frac{1}{2}\right)^2 = \left(t^2 - t + \frac{1}{4}\right) + b^2 - \frac{1}{4} = b^2 - t(1 - t).
$$

因此 $\left(t - \frac{1}{2}\right)^2 + b^2 \le \left(\frac{1}{2}\right)^2$ 成立当且仅当 $b^2 - t(1 - t) \le 0$，即 $b^2 \le t(1 - t)$。完整证明由 Lean 内核检查。
:::

这里必须划清一条严格的认识论界线：尽管 [@thm-appf-recentered-ball] 所在的源码模块名为 `OriginExclusionSegmentRigidity`，但该冻结定理本身只是一条不含任何额外物理公设或无限维分析的实平面二次多项式恒等变形，绝不能单凭模块名称宣称“原点排除公理已经无条件重建了全部量子理论”。在一般凸态空间中，排除某个纯态后留下的截面未必自动具有二次圆盘或欧氏球结构；要把“球形排除截面”提升为刻画态空间面格极性的严格几何定理，必须在有限维实尖凸锥上把每一项定义与公理全部摊在明处。

---

## F.2 尖凸态锥、排除球与面极性分类 {#sec-appendix-f-2}

设 $V$ 为有限维实赋范向量空间（Lean 类型类为 `[NormedAddCommGroup V] [NormedSpace ℝ V] [FiniteDimensional ℝ V]`），$C : \operatorname{PointedCone}\;\mathbb{R}\;V$ 为 $V$ 上的实尖凸锥，$u : V \to_{\mathbb{R}} \mathbb{R}$ 为实线性归一化泛函。我们在陈述面极性定理之前，先逐项展开形式化库中涉及的全部凸几何对象：

1. **态底与纯态极点**（`base` 与 `pure`）：归一化截面与它的实极点集合分别定义为

   $$
   \operatorname{base}(C, u) := \{x \in V \mid x \in C \land u(x) = 1\}, \qquad \operatorname{pure}(C, u) := \operatorname{extremePoints}_{\mathbb{R}}\bigl(\operatorname{base}(C, u)\bigr).
   $$

   当定理对 `p : pure C u` 量化时，$p$ 取遍 $\operatorname{base}(C, u)$ 的全体实极点，并通过子类型强制转换回载体向量 $(p : V)$。
2. **合规效应与纯态确认泛函**（`proper` 与 `confirms`）：对实线性泛函 $f : V \to_{\mathbb{R}} \mathbb{R}$，称 $f$ 在 $(C, u)$ 上**合规**（`proper C u f`），若对一切 $x \in C$ 均有 $0 \le f(x) \le u(x)$；称 $f$ **确认**点 $p \in V$（`confirms C u p f`），若 $f$ 合规且 $f(p) = 1$。
3. **排除集**（`exclusion`）：点 $p \in V$ 的排除集定义为态底中可被某一个确认 $p$ 的合规泛函归零的状态集合：

   $$
   \operatorname{exclusion}(C, u, p) := \bigl\{x \in V \;\big|\; x \in \operatorname{base}(C, u) \land \exists f : V \to_{\mathbb{R}} \mathbb{R},\; \operatorname{confirms}(C, u, p, f) \land f(x) = 0\bigr\}.
   $$

   值得留心的是，`exclusion` 在定义中带有存在量词 $\exists f$——它是所有确认 $p$ 的泛函在态底上零点切片的**并集**，先验地既未假定凸性，也未假定由单一泛函暴露切出。
4. **排除球图表与排除球公理**（`ExclusionChart` 与 `exclusionBalls`）：给定 $p \in V$，一个排除球图表 `ExclusionChart C u p` 由正整数维数 $\mathrm{dim} \in \mathbb{N}$（满足 $0 < \mathrm{dim}$）与单射实仿射映射 $\mathrm{param} : \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin}\;\mathrm{dim}) \to^{\mathrm{aff}}_{\mathbb{R}} V$ 组成，且将欧氏空间中以原点为中心、半径为 $1$ 的闭单位球 $\overline{B}_2(0, 1)$（Lean 中 `Metric.closedBall 0 1`）满射到排除集上：

   $$
   \mathrm{param}\bigl(\overline{B}_2(0, 1)\bigr) = \operatorname{exclusion}(C, u, p).
   $$

   谓词 `exclusionBalls C u` 要求对每个纯态 `p : pure C u`，类型 `ExclusionChart C u p` 非空。
5. **成对纯态锥面切片与整对球图表**（`pairBase`、`pairProper`、`BallChart` 与 `wholePairBalls`）：对 $p, q \in V$，`pairBase C u p q` 定义为态底中落在一切同时包含 $p$ 与 $q$ 的锥面 $F : C.\mathrm{Face}$ 内的状态集合：

   $$
   \operatorname{pairBase}(C, u, p, q) := \bigl\{x \in V \;\big|\; x \in \operatorname{base}(C, u) \land \forall F : C.\mathrm{Face},\; p \in F \to q \in F \to x \in F\bigr\}.
   $$

   谓词 `pairProper C u` 断言对任意两相异纯态 $p \neq q$，切片 $\operatorname{pairBase}(C, u, p, q) \neq \operatorname{base}(C, u)$ 恒为态底的真子集；结构体 `BallChart C u p q` 则与 `ExclusionChart` 完全平行，要求存在正维数 $\mathrm{dim} > 0$ 及单射实仿射映射将 $\overline{B}_2(0, 1) \subset \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin}\;\mathrm{dim})$ 映满 $\operatorname{pairBase}(C, u, p, q)$；当任意相异纯态对 $p \neq q$ 皆存在 `BallChart C u p q` 时，记为 `wholePairBalls C u`。

在进入抽象定理之前，不妨拿三维复希尔伯特空间 $\mathbb{C}^3$（三能级系统 qutrit）作一次手算对照（`手工推导`），看清“排除面”“两态经典凸组合线段”与“成对锥面切片 `pairBase`”三者的本质区别：

- 取纯态 $p = \lvert 0\rangle\langle 0\rvert$。任何与 $\lvert 0\rangle$ 正交的态都支撑在二维子空间 $\operatorname{span}\{\lvert 1\rangle, \lvert 2\rangle\}$ 上，因此 $p$ 的排除面是 $\operatorname{span}\{\lvert 1\rangle, \lvert 2\rangle\}$ 上的整颗 $2 \times 2$ 密度矩阵布洛赫球（实仿射维数为 $3$，将在 F.3 节严格验证）；
- 若仅取 $\operatorname{span}\{\lvert 1\rangle, \lvert 2\rangle\}$ 中两个正交纯态 $\lvert 1\rangle\langle 1\rvert$ 与 $\lvert 2\rangle\langle 2\rvert$ 的**经典凸混合** $(1 - \lambda)\lvert 1\rangle\langle 1\rvert + \lambda\lvert 2\rangle\langle 2\rvert$（$0 \le \lambda \le 1$），得到的仅仅是对角矩阵 $\operatorname{diag}(0, 1 - \lambda, \lambda)$ 构成的一维线段——绝不能把这条经典混合线段误当作完整的排除面！然而，若考察包含 $\lvert 1\rangle\langle 1\rvert$ 与 $\lvert 2\rangle\langle 2\rvert$ 的**最小半正定锥面切片** `pairBase`，由于锥面包含中点 $\frac{1}{2}(\lvert 1\rangle\langle 1\rvert + \lvert 2\rangle\langle 2\rvert)$，凡值域落在 $\operatorname{span}\{\lvert 1\rangle, \lvert 2\rangle\}$ 内的相干叠加纯态投影亦必全部落入该锥面，于是 `pairBase` 从一维线段自动张满整颗三维布洛赫排除球，恰与 $\lvert 0\rangle\langle 0\rvert$ 的排除面重合！
- 反观不满足公理的情形（`手工推导`）：在四态经典概率单纯形 $\Delta_3$（实三维正四面体）中，排除一个顶点后留下的是二维正三角形面，具 $3$ 个角点而非严格凸的欧氏圆盘，故违背 `exclusionBalls`；而在单量子比特 $2 \times 2$ 态空间中，纯态 $\lvert 0\rangle\langle 0\rvert$ 的排除集仅含对跖单点 $\{\lvert 1\rangle\langle 1\rvert\}$（维数为 $0$，不满足 `ExclusionChart` 中 $0 < \mathrm{dim}$ 的正维要求），且任意两相异纯态的中点已是满秩内点，使 `pairBase` 填满整个态底而违背 `pairProper`。

看清上述几何分野后，下面的定理给出了满足 `exclusionBalls` 的闭生成尖凸锥的完整面极性分类。

::: {.theorem #thm-appf-exclusion-face-polarity title="排除球的面极性分类" lean="D5/S3/Quantum/Foundation/ExclusionBallFaces.exclusion_ball_faces"}
设 $V$ 为有限维实赋范向量空间，$C : \operatorname{PointedCone}\;\mathbb{R}\;V$ 为实尖凸锥，$u : V \to_{\mathbb{R}} \mathbb{R}$ 为实线性泛函。假定：

1. **锥闭性**（`hclosed`）：$C$ 作为 $V$ 的子集是闭集（`IsClosed (C : Set V)`）；
2. **严格正归一化**（`hstrict`）：对一切 $x \in C$，若 $x \neq 0$，则 $0 < u(x)$；
3. **线性生成全空间**（`hgen`）：$C$ 在 $\mathbb{R}$ 上的线性张成等于整个 $V$（`Submodule.span ℝ (C : Set V) = ⊤`）；
4. **排除球公理**（`hB`）：成立 `exclusionBalls C u`。

则同时成立以下三组结论：

1. **排除面的暴露极性与单一确认泛函刻画**：对每个纯态 $p \in \operatorname{pure}(C, u)$，排除集 $E_p := \operatorname{exclusion}(C, u, p)$ 满足非平凡（至少含两个相异点）、紧致、实凸、在 $\operatorname{base}(C, u)$ 中暴露（`IsExposed ℝ`）且极端（`IsExtreme ℝ`）、严格异于全底（$E_p \neq \operatorname{base}(C, u)$），并且存在单一实线性泛函 $f : V \to_{\mathbb{R}} \mathbb{R}$，使得 $\operatorname{confirms}(C, u, p, f)$ 且

   $$
   \operatorname{exclusion}(C, u, p) = \{x \in V \mid x \in \operatorname{base}(C, u) \land f(x) = 0\}.
   $$

2. **非空真极面的穷尽二分**：对任意子集 $F \subseteq V$，若 $F$ 非空、实凸、为 $\operatorname{base}(C, u)$ 的极子集（`IsExtreme ℝ (base C u) F`）且 $F \neq \operatorname{base}(C, u)$，则必成立其一：要么存在纯态 $p \in \operatorname{pure}(C, u)$ 使 $F = \{p\}$，要么存在纯态 $p \in \operatorname{pure}(C, u)$ 使 $F = \operatorname{exclusion}(C, u, p)$。
3. **条件成对面极性与整对球性质**：若进一步成立 `pairProper C u`，则对任意两相异纯态 $p, q \in \operatorname{pure}(C, u)$（$p \neq q$），必存在纯态 $r \in \operatorname{pure}(C, u)$ 使

   $$
   \operatorname{pairBase}(C, u, p, q) = \operatorname{exclusion}(C, u, r),
   $$

   且同时成立 `wholePairBalls C u`。
:::

::: proof
第 1 组结论：任取 $p \in \operatorname{pure}(C, u)$，前提 `hB` 给出正维数 $d = \mathrm{dim} > 0$ 上的单射实仿射映射 $\mathrm{param}$，将欧氏闭单位球 $\overline{B}_2(0, 1) \subset \mathbb{R}^d$ 映满 $E_p$。因 $d \ge 1$ 时 $\overline{B}_2(0, 1)$ 紧致、凸且包含相异点（如原点与单位基向量），连续实仿射单射直接保持非平凡性、紧致性与凸性；又因 $p \in \operatorname{base}(C, u)$ 在任何确认泛函下取值 $1 \neq 0$，故 $p \notin E_p$，从而 $E_p \neq \operatorname{base}(C, u)$。进一步结合有限维闭锥 `hclosed`、严格正泛函 `hstrict` 与全空间张成 `hgen`，在紧致排除球上将一组有限生成点处的确认泛函作凸组合黏合（源码 `FacetZeroGluing`），即可构造出一个同时在整颗球 $E_p$ 上恒为零且仍确认 $p$ 的单一合规泛函 $f$；由于 $f$ 在 $\operatorname{base}(C, u)$ 上非负，零点集 $\{x \in \operatorname{base}(C, u) \mid f(x) = 0\} = E_p$ 自然成为 $\operatorname{base}(C, u)$ 的暴露子集（从而也是极子集）。

第 2 组结论：设 $F \subsetneq \operatorname{base}(C, u)$ 为非空真凸极子集。利用闭尖凸锥上的支撑超平面分离与极值可达性，可找到在 $F$ 上恒为零、在某纯态 $r \in \operatorname{pure}(C, u)$ 处取到极大值 $1$ 的合规泛函，从而将 $F$ 嵌入排除球 $F \subseteq E_r$。因 $F$ 在 $\operatorname{base}(C, u)$ 中极端且 $E_r \subseteq \operatorname{base}(C, u)$，沿 $r$ 的单射仿射球图表拉回后，$\mathrm{param}^{-1}(F)$ 是欧氏闭单位球 $\overline{B}_2(0, 1)$ 的非空凸极子集。由欧氏 $\ell^2$ 范数的严格凸性，闭单位球的非空真极子集只能是球面上的单点集！因此拉回像要么是单点（推回得 $F = \{p\}$，且因 $\{p\}$ 在 $\operatorname{base}(C, u)$ 中极端而有 $p \in \operatorname{pure}(C, u)$），要么填满整颗闭单位球（推回得 $F = E_r$）。

第 3 组结论：在附加前提 `pairProper C u` 下，对任意相异纯态 $p \neq q$，锥面交截集 $\operatorname{pairBase}(C, u, p, q)$ 是包含两个相异点 $p, q$ 的实凸极子集，且严格小于 $\operatorname{base}(C, u)$。由于它至少含两个不同点，排除了第 2 组二分中的单点分支，故必存在纯态 $r \in \operatorname{pure}(C, u)$ 使 $\operatorname{pairBase}(C, u, p, q) = \operatorname{exclusion}(C, u, r)$；直接复用 $r$ 的 `ExclusionChart` 数据，即给出 $(p, q)$ 的 `BallChart`，从而确立 `wholePairBalls C u`。完整证明由 Lean 内核检查。
:::

请注意有限维假设与显式公理在 [@thm-appf-exclusion-face-polarity] 中的不可替代性：紧致性与支撑超平面极点可达性严格依赖 `FiniteDimensional ℝ V`、`hclosed` 与 `hstrict`，不能外推至无限维空间；同时，第 2 组“非单点即整颗排除面”的刚性完全源自 `exclusionBalls` 中欧氏闭单位球边界无平坦棱面的严格凸性，第 3 组整对球结论则必须额外提供 `pairProper C u`。

---

## F.3 三阶厄米态锥中的纯态排除图表 {#sec-appendix-f-3}

抽象的排除球公理 `exclusionBalls` 在真实量子力学中如何落地？我们现在进入三能级复量子系统（qutrit），考察 $3 \times 3$ 复厄米矩阵构成的实向量空间

$$
\operatorname{HermitianMat}(\operatorname{Fin} 3, \mathbb{C}) := \operatorname{selfAdjoint}\bigl(M_3(\mathbb{C})\bigr),
$$

其作为实向量空间的维数为 $3^2 = 9$。在形式化库 `HermitianExclusionKernel` 中，尖凸正锥 `cone` 取为该空间上的半正定正锥 `PointedCone.positive ℝ (HermitianMat (Fin 3) ℂ)`，归一化实线性泛函 `unit` 取为实值厄米迹 `HermitianMat.trace`（通过 `IsMaximalSelfAdjoint.selfadjMap` 将自伴矩阵的复迹无损投回实数域 $\mathbb{R}$）。于是 $\operatorname{base}(\mathrm{cone}, \mathrm{unit})$ 恰好是全体迹为 $1$ 的 $3 \times 3$ 半正定密度矩阵（实仿射维数为 $9 - 1 = 8$），$\operatorname{pure}(\mathrm{cone}, \mathrm{unit})$ 恰好是全体秩一纯态投影算子 $\lvert\psi\rangle\langle\psi\rvert$（$\norm{\psi}_2 = 1$）。

先对计算基纯态 $p = \lvert 0\rangle\langle 0\rvert = \operatorname{diag}(1, 0, 0)$ 作一次完整的矩阵手算（`手工推导`）。取确认泛函 $f_0(X) = \Tr(p X) = X_{00}$：对任意 $X \in \operatorname{base}(\mathrm{cone}, \mathrm{unit})$，半正定性保证对角元非负且 $0 \le X_{00} \le X_{00} + X_{11} + X_{22} = 1$，而 $f_0(p) = 1$，故 $f_0$ 确认 $p$。当 $X \in \operatorname{base}(\mathrm{cone}, \mathrm{unit})$ 满足排除条件 $X_{00} = 0$ 时，考察第一行与第 $j$ 行（$j \in \{1, 2\}$）组成的 $2 \times 2$ 主子式：

$$
\det\begin{pmatrix} X_{00} & X_{0j} \\ X_{j0} & X_{jj} \end{pmatrix} = X_{00} X_{jj} - |X_{0j}|^2 = -|X_{0j}|^2 \ge 0 \implies X_{01} = X_{10} = X_{02} = X_{20} = 0.
$$

第一行与第一列被迫全线归零！因此，$p = \lvert 0\rangle\langle 0\rvert$ 的排除集精准落在右下角 $\operatorname{span}\{\lvert 1\rangle, \lvert 2\rangle\}$ 的 $2 \times 2$ 子块内。用三维实坐标 $(x, y, z) \in \mathbb{R}^3$ 将该迹一厄米子块参数化为

$$
X(x, y, z) = \begin{pmatrix} 0 & 0 & 0 \\ 0 & \frac{1 + z}{2} & \frac{x - i y}{2} \\ 0 & \frac{x + i y}{2} & \frac{1 - z}{2} \end{pmatrix},
$$

则 $\Tr X(x, y, z) = 0 + \frac{1 + z}{2} + \frac{1 - z}{2} = 1$ 自动成立，而右下角 $2 \times 2$ 块的迹为 $1 > 0$、行列式为

$$
\frac{1 + z}{2}\cdot\frac{1 - z}{2} - \frac{x - i y}{2}\cdot\frac{x + i y}{2} = \frac{1 - (x^2 + y^2 + z^2)}{4}.
$$

故 $X(x, y, z)$ 半正定当且仅当 $x^2 + y^2 + z^2 \le 1$！映射 $(x, y, z) \mapsto X(x, y, z)$ 显然是单射实仿射映射，把三维欧氏闭单位球 $\overline{B}_2(0, 1) \subset \mathbb{R}^3$ 双射到 $\lvert 0\rangle\langle 0\rvert$ 的排除面上。借助幺正标架变换，这幅图像对三阶厄米态锥中的每一个纯态普遍成立。

::: {.theorem #thm-appf-hermitian-exclusion-chart title="三阶厄米态锥的纯态排除图表" lean="D5/S3/Quantum/Foundation/HermitianExclusionBall.all_pure_charts"}
设 $\mathrm{cone} : \operatorname{PointedCone}\;\mathbb{R}\;\bigl(\operatorname{HermitianMat}(\operatorname{Fin} 3, \mathbb{C})\bigr)$ 为 $3 \times 3$ 复厄米半正定矩阵尖凸锥，$\mathrm{unit} : \operatorname{HermitianMat}(\operatorname{Fin} 3, \mathbb{C}) \to_{\mathbb{R}} \mathbb{R}$ 为实值厄米迹泛函 `HermitianMat.trace`。则对每一个纯态 $p \in \operatorname{pure}(\mathrm{cone}, \mathrm{unit})$，均存在排除球图表 $a : \operatorname{ExclusionChart}\;\mathrm{cone}\;\mathrm{unit}\;(p : \operatorname{HermitianMat}(\operatorname{Fin} 3, \mathbb{C}))$，其仿射图表维数满足

$$
a.\mathrm{dim} = 3.
$$
:::

::: proof
三阶厄米态底 $\operatorname{base}(\mathrm{cone}, \mathrm{unit})$ 的每个极点 $p$ 对应 $\mathbb{C}^3$ 中某单位向量所张成的一维正交投影，其确认零核切片精确由支撑在二维复正交补子空间上的迹一半正定算子组成（源码 `HermitianExclusionKernel`）。在正交补子空间上选取一组标准正交基，利用等距截面标架（`SectionROGFrame`）将该二维压缩块等同于 $2 \times 2$ 复厄米矩阵空间。再将欧氏三维向量 $r \in \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} 3)$ 通过单比特布洛赫实仿射参数化 $r \mapsto \frac{1}{2}\operatorname{scalarB}(1, r) = \frac{1}{2}(I_2 + r_0\sigma_X + r_1\sigma_Y + r_2\sigma_Z)$ 嵌入 $3 \times 3$ 厄米矩阵空间：泡利矩阵的正交迹关系保证该实仿射映射单射，而 $2 \times 2$ 迹一厄米矩阵半正定的充要条件恰好是 $\norm{r}_2 \le 1$，从而闭单位球的像精确等于 $\operatorname{exclusion}(\mathrm{cone}, \mathrm{unit}, p)$，给出 $a.\mathrm{dim} = 3$ 的 `ExclusionChart`。完整证明由 Lean 内核检查。
:::

研读 [@thm-appf-hermitian-exclusion-chart] 时务必警惕一处常见的维数混淆：结论中的 $a.\mathrm{dim} = 3$ 是单比特 $2 \times 2$ 布洛赫球的**实仿射维数**（$2^2 - 1 = 3$），**绝不是**外围三能级希尔伯特空间 $\mathbb{C}^3$ 的复维数 $3$！事实上，整个三能级 qutrit 态底的实仿射维数是 $3^2 - 1 = 8$，它本身并不是一颗八维欧氏球（其极点流形是四维实流形 $\mathbb{C}\mathrm{P}^2$，边界充斥着三维排除球面片）；而且该声明固定指标类型为 `Fin 3`，并不声称四阶以上 $N \times N$（$N \ge 4$）厄米态锥的纯态排除面（即 $(N-1)\times(N-1)$ 态空间）仍是欧氏球——当 $N = 4$ 时，排除一个纯态剩下的是整个八维 qutrit 态底，已不再仿射等价于欧氏球！

---

## F.4 自旋因子关系的定向分类与泡利矩阵接口 {#sec-appendix-f-4}

在 F.3 节中，三阶厄米锥的每一张三维排除球图表若连同非负迹缩放一并展开，张成的恰是一座四维实圆锥——即相对论与约当代数中著名的**四维自旋因子（spin factor）正锥**。然而，单纯的球形凸锥只编码了无向的对称内积重叠（约当乘积）；若要从中恢复完整的复 $2 \times 2$ 泡利矩阵乘法与量子相干相位，还必须刻画与之配对的反对称方向关系 $D$。本节在四维实载体上严格展开这一分类定理及其矩阵接口。

先逐一列出形式化模块 `OriginalDContract`、`OriginalSpinConsumers` 与 `OriginalClassification` 中的精确定义：

1. **四维载体、约当积、正锥与范数**（`Vec`、`E`、`unit`、`jordan`、`cone`、`originalNorm`）：
   记三维实空间向量类型为 $\mathrm{Vec} := \operatorname{Fin} 3 \to \mathbb{R}$，带标准点积 $\operatorname{dot}(x, y) := \sum_{i=0}^2 x_i y_i$ 与欧氏模长 $\operatorname{vnorm}(x) := \sqrt{\operatorname{dot}(x, x)}$。四维自旋因子载体定义为

   $$
   E := \mathbb{R} \times \mathrm{Vec}, \qquad \mathrm{unit} := (1, 0) \in E.
   $$

   对任意 $a = (a_1, a_2), b = (b_1, b_2) \in E$（此处 $a_1 \in \mathbb{R}$ 为标量分量，$a_2 \in \mathrm{Vec}$ 为三维空间分量），对称约当积、正锥谓词与原始范数分别定义为

   $$
   \begin{aligned}
   \operatorname{jordan}(a, b) &:= \bigl(a_1 b_1 + \operatorname{dot}(a_2, b_2),\; a_1 b_2 + b_1 a_2\bigr), \\
   \operatorname{cone}(a) &:\Longleftrightarrow \operatorname{vnorm}(a_2) \le a_1, \qquad \operatorname{originalNorm}(a) := |a_1| + \operatorname{vnorm}(a_2).
   \end{aligned}
   $$

   注意：**正锥条件 `cone a` 仅要求 $\operatorname{vnorm}(a_2) \le a_1$（隐含 $a_1 \ge 0$），并不自动包含迹归一化 $a_1 = 1$**。连续性谓词 `OriginalContinuous D` 按上述 `originalNorm` 定义双变量 $\varepsilon$-$\delta$ 连续。
2. **正线性求值与定向空间叉积**（`Evaluation`、`evaluate`、`Orientation`、`crossD`）：
   给定标量质量 $m \in \mathbb{R}$ 与向量 $v \in \mathrm{Vec}$，实线性求值映射 $\operatorname{evaluationLinear}(m, v) : E \to_{\mathbb{R}} \mathbb{R}$ 定义为 $\operatorname{evaluate}(m, v, a) := m a_1 + \operatorname{dot}(v, a_2)$；对一般线性泛函 $\alpha : E \to_{\mathbb{R}} \mathbb{R}$，谓词 `PositiveEvaluation α` 指 $\forall a \in E,\; \operatorname{cone}(a) \to 0 \le \alpha(a)$；结构体 `Evaluation` 则打包满足 $\operatorname{vnorm}(v) \le m$ 的三元组 $(m, v, \text{positive})$。二元关系类型记作 $\mathrm{Relation} := E \to E \to E$。双值枚举类型 `Orientation` 仅含 `.plus` 与 `.minus` 两个构造子（由 `orientationBool` 分别映为布尔值 `true` 与 `false`）。设 $\operatorname{cross}(x, y) := (x_1 y_2 - x_2 y_1,\; x_2 y_0 - x_0 y_2,\; x_0 y_1 - x_1 y_0)$ 为标准三维叉积，则两种定向叉积关系定义为

   $$
   \operatorname{crossD}(\varepsilon, a, b) := \begin{cases} \bigl(0,\; \operatorname{cross}(a_2, b_2)\bigr), & \varepsilon = \mathrm{.plus}, \\ \bigl(0,\; -\operatorname{cross}(a_2, b_2)\bigr), & \varepsilon = \mathrm{.minus}. \end{cases}
   $$

3. **二点格拉姆正性公理 `P2` 与相位平衡公理 `PB`**：
   对关系 $D : \mathrm{Relation}$、求值态 $\alpha : \mathrm{Evaluation}$ 及元素 $a, b, c \in E$，定义复两槽读数

   $$
   \operatorname{readout}(D, \alpha, a, b) := \operatorname{evaluate}\bigl(\alpha, \operatorname{jordan}(a, b)\bigr) - i\,\operatorname{evaluate}\bigl(\alpha, D(a, b)\bigr) \in \mathbb{C},
   $$

   并排成 $2 \times 2$ 复矩阵 $\operatorname{gram2}(D, \alpha, a, b) := \begin{pmatrix} \operatorname{readout}(D, \alpha, a, a) & \operatorname{readout}(D, \alpha, a, b) \\ \operatorname{readout}(D, \alpha, b, a) & \operatorname{readout}(D, \alpha, b, b) \end{pmatrix}$。
   - **公理 `P2 D`**：对一切 $\alpha : \mathrm{Evaluation}$ 与 $a, b \in E$，二阶复矩阵 $\operatorname{gram2}(D, \alpha, a, b)$ 半正定（`PosSemidef`）；
   - **公理 `PB D`**：令实二次型 $\operatorname{squareReadout}(D, \alpha, b, c) := \operatorname{evaluate}(\alpha, \operatorname{jordan}(b, b)) + \operatorname{evaluate}(\alpha, \operatorname{jordan}(c, c)) + 2\operatorname{evaluate}(\alpha, D(b, c))$，并记正交相位混洗对 $\operatorname{phaseR}(D, a, b, c) := b + D(a, b) - \operatorname{jordan}(a, c)$ 与 $\operatorname{phaseS}(D, a, b, c) := c + \operatorname{jordan}(a, b) + D(a, c)$，则对一切 $\alpha : \mathrm{Evaluation}$ 与 $a, b, c \in E$，将生成元 $a$ 反向（即同步翻转 $D(a, \cdot)$ 与 $\operatorname{jordan}(a, \cdot)$ 的符号）保持 `squareReadout` 精确不变：

     $$
     \operatorname{squareReadout}\bigl(D, \alpha, \operatorname{phaseR}(D, a, b, c), \operatorname{phaseS}(D, a, b, c)\bigr) = \operatorname{squareReadout}\bigl(D, \alpha, b - D(a, b) + \operatorname{jordan}(a, c),\; c - \operatorname{jordan}(a, b) - D(a, c)\bigr).
     $$

4. **代数后果包 `Consequences D` 与 $2 \times 2$ 泡利矩阵接口 `MatrixInterfaces`**：
   记 $\mathrm{Mat} := M_2(\mathbb{C})$，标准泡利矩阵为 $\sigma_X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$（`qubitX`）、$\sigma_Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$（`qubitZ`）及 $\sigma_Y = i\sigma_X\sigma_Z = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}$。定义可观测量嵌入 $\phi(a) := a_1 I_2 + a_{2,0}\sigma_X + a_{2,1}\sigma_Y + a_{2,2}\sigma_Z$、未归一化密度矩阵 $\operatorname{density}(m, v) := \frac{1}{2}\phi(m, v) = \frac{1}{2}(m I_2 + v_0\sigma_X + v_1\sigma_Y + v_2\sigma_Z)$，以及带方向开关的矩阵乘积 $\operatorname{product}(\mathrm{opposite}, A, B)$（当 $\mathrm{opposite} = \mathrm{true}$ 时为反向乘积 $BA$，当 $\mathrm{opposite} = \mathrm{false}$ 时为标准乘积 $AB$）。
   - **`Consequences D`** 汇总 14 条性质：`P2 D` 与 `PB D`；左右单位元归零 $D(r\cdot\mathrm{unit}, b) = D(a, r\cdot\mathrm{unit}) = 0$ 与沿 `unit` 的平移不变性；左右加法线性与实数乘齐次性（双线性性）；次乘性范数界 $\operatorname{originalNorm}(D(a, b)) \le \operatorname{originalNorm}(a)\operatorname{originalNorm}(b)$、双线性差分界与 `OriginalContinuous D`；对任意阶数 $n \in \mathbb{N}$、满足 $\operatorname{vnorm}(v) \le m$ 的参数及任意 $n$ 元组 $a : \operatorname{Fin} n \to E$，$n \times n$ 复格拉姆矩阵 $\operatorname{gram}(D, m, v, a)_{jk} = \operatorname{evaluate}(m, v, \operatorname{jordan}(a_j, a_k)) - i\,\operatorname{evaluate}(m, v, D(a_j, a_k))$ 半正定；以及约当结合子与双交换子的精确等式

     $$
     \operatorname{jordan}\bigl(\operatorname{jordan}(a, b), c\bigr) - \operatorname{jordan}\bigl(a, \operatorname{jordan}(b, c)\bigr) = D\bigl(D(a, b), c\bigr) - D\bigl(a, D(b, c)\bigr).
     $$

   - **`MatrixInterfaces opposite D`** 汇总 9 条双向矩阵刻画：(i) $\operatorname{density}(m, v)$ 半正定 $\iff \operatorname{vnorm}(v) \le m$；(ii) $\Tr(\operatorname{density}(m, v)) = (m : \mathbb{C})$；(iii) $\operatorname{PositiveEvaluation}(\operatorname{evaluationLinear}(m, v)) \iff \operatorname{vnorm}(v) \le m$；(iv) 每个满足 `PositiveEvaluation` 的实线性泛函 $\alpha$ 均存在满足 $\operatorname{vnorm}(v) \le m$ 的 $(m, v)$ 使其表为 $\operatorname{evaluate}(m, v, \cdot)$；(v) 玻恩迹配对等式 $\Tr(\operatorname{density}(m, v)\,\phi(a)) = (\operatorname{evaluate}(m, v, a) : \mathbb{C})$；(vi) $\phi(a)$ 半正定 $\iff \operatorname{cone}(a)$；(vii) 算子区间双边半正定 $(r I_2 - \phi(a) \succeq 0 \land r I_2 + \phi(a) \succeq 0) \iff \operatorname{originalNorm}(a) \le r$；(viii) 每个半正定矩阵 $\rho \in M_2(\mathbb{C})$ 均可表为某个满足 $\operatorname{vnorm}(v) \le m$ 的 $\operatorname{density}(m, v)$；(ix) 结合代数乘积分解

     $$
     \operatorname{product}\bigl(\mathrm{opposite}, \phi(a), \phi(b)\bigr) = \phi\bigl(\operatorname{jordan}(a, b)\bigr) - i\,\phi\bigl(D(a, b)\bigr).
     $$

在陈述分类定理前，我们先亲手核验空间基上的手征定向与矩阵乘法方向开关为何如此精巧地咬合（`手工推导`）。在 $E = \mathbb{R} \times \mathbb{R}^3$ 中取纯空间基元 $e_1 = \bigl(0, (1, 0, 0)\bigr)$ 与 $e_2 = \bigl(0, (0, 1, 0)\bigr)$，对应泡利矩阵 $\phi(e_1) = \sigma_X$、$\phi(e_2) = \sigma_Y$，且对称部 $\operatorname{jordan}(e_1, e_2) = (0, 0)$：

- 在 `.plus` 定向下，$\operatorname{crossD}(\mathrm{.plus}, e_1, e_2) = \bigl(0, (0, 0, 1)\bigr) = +e_3$。由于分解式右端带有负虚号 $-i\,\phi(D(e_1, e_2)) = -i\sigma_Z$，它恰好匹配 `orientationBool .plus = true` 所选定的**反向矩阵乘积** $\operatorname{product}(\mathrm{true}, \sigma_X, \sigma_Y) = \sigma_Y \sigma_X = -i\sigma_Z$；
- 在 `.minus` 定向下，$\operatorname{crossD}(\mathrm{.minus}, e_1, e_2) = \bigl(0, (0, 0, -1)\bigr) = -e_3$，右端变为 $-i(-\sigma_Z) = +i\sigma_Z$，恰好匹配 `orientationBool .minus = false` 所选定的**标准矩阵乘积** $\operatorname{product}(\mathrm{false}, \sigma_X, \sigma_Y) = \sigma_X \sigma_Y = +i\sigma_Z$！
- 若再取归一化质量 $m = 1$ 与北极极化向量 $r = (0, 0, 1)$（满足 $\operatorname{vnorm}(r) = 1 \le 1$），则 $\operatorname{density}(1, r) = \frac{1}{2}(I_2 + \sigma_Z) = \operatorname{diag}(1, 0)$，迹为 $1$ 且给出计算基纯态投影。

下面的冻结分类定理证明：在四维载体 $E$ 上，仅凭 `P2` 与 `PB` 两条关系公理，就足以将任意二元关系 $D$ 全局锁定为上述两种手征定向之一，并一次性导出全部代数后果与泡利矩阵接口。

::: {.theorem #thm-appf-spin-factor-classification title="自旋因子关系的定向分类及矩阵接口" lean="D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences"}
设 $D : \mathrm{Relation}$（即 $D : E \to E \to E$，其中 $E = \mathbb{R} \times (\operatorname{Fin} 3 \to \mathbb{R})$）满足二点格拉姆半正定公理 `P2 D` 与相位平衡公理 `PB D`。则存在定向 $\varepsilon : \mathrm{Orientation}$，使得：

1. $\varepsilon = \mathrm{.plus}$ 或 $\varepsilon = \mathrm{.minus}$；
2. 对一切 $a, b \in E$，恒有

   $$
   D(a, b) = \operatorname{crossD}(\varepsilon, a, b);
   $$

3. 同时成立代数后果包 `Consequences D` 与关联定向的 $2 \times 2$ 复矩阵接口 `MatrixInterfaces (orientationBool ε) D`。
:::

::: proof
证明沿三个衔接模块推进。第一步是纯空间刚性（源码 `OriginalPureRigidity.global_pure`）：遍历全体满足 $\operatorname{vnorm}(v) \le m$ 的求值态 $\alpha$，二点半正定条件 `P2 D` 要求 $\operatorname{gram2}(D, \alpha, a, b)$ 的对角元为非负实数、非对角元共轭对称且行列式非负，由此迫使 $D(a, b)$ 的标量分量恒为零、反对称且消去单位元方向 `unit`，并给出空间模长上界；紧接着，相位平衡恒等式 `PB D` 在正交空间标架上提供精确的二次范数守恒等式，消除模长收缩自由度，迫使纯空间基上的 $D$ 成为保持欧氏叉积模长的三维正交叉积运算，并由连通标架上的符号一致性全局锁定单一手征 $\varepsilon \in \{\mathrm{.plus}, \mathrm{.minus}\}$。

第二步是全输入延拓（`OriginalResidual.all_inputs_of_pure`）：利用 `P2` 与 `PB` 对标量分量 $a_1 \cdot \mathrm{unit}$ 的零化与平移解耦性质，把纯空间子空间 $(0, a_2)$ 上的公式 $D\bigl((0, a_2), (0, b_2)\bigr) = \operatorname{crossD}\bigl(\varepsilon, (0, a_2), (0, b_2)\bigr)$ 延拓到全体四维元素 $a, b \in E$，确立全局点态等式 $D(a, b) = \operatorname{crossD}(\varepsilon, a, b)$。

第三步是消费者接口传输（`OriginalSpinConsumers.same_D_consequences`）：一旦 $D$ 在全空间上与 $\operatorname{crossD}(\varepsilon, \cdot, \cdot)$ 逐点相等，只需对显式叉积 $\operatorname{crossD}(\varepsilon, \cdot, \cdot)$ 核验 `Consequences` 与 `MatrixInterfaces (orientationBool ε)`。通过 $\phi : E \to M_2(\mathbb{C})$ 的泡利基展开、$2 \times 2$ 厄米矩阵本征值界 $m \pm \operatorname{vnorm}(v) \ge 0$、基于半正定矩阵 $\operatorname{density}(m, v)$ 平方根的任意 $n$ 阶格拉姆矩阵因式分解以及泡利乘法恒等式，全部 14 条代数后果与 9 条矩阵接口逐一闭合。完整证明由 Lean 内核检查。
:::

---

## F.5 条件边界与形式化审计总表 {#sec-appendix-f-5}

纵览 F.1–F.4 节，从平面二次圆盘配方、抽象尖凸锥的排除球极性分类，到三阶复厄米态锥的纯态三维球图表，再到四维自旋因子上二元关系的手征二分与泡利矩阵接口，四条定理各自在精确界定的前提下闭合。为彻底杜绝概念滑坡，下框将本附录全部四条 `LEAN ✓` 定理的前提、结论与严禁越界的外推边界统一收束备查。

::: {.remark #rem-appf-epistemic-boundary title="排除球、面极性与自旋因子接口的条件边界与形式化审计总表"}
**形式化审计总表与不可越过的认识论边界。**

| 节次与定理环境 | 冻结声明（`LEAN ✓`） | 显式类型域与核心前提 | 已验证精确结论 | 严禁越界外推的边界 |
| :--- | :--- | :--- | :--- | :--- |
| **F.1** [@thm-appf-recentered-ball] | [`b_constraint_recenter`](lean:D5/S3/Quantum/OriginExclusionSegmentRigidity.b_constraint_recenter) | 任意实数 $t, b \in \mathbb{R}$（常数除数 $2 \neq 0$，无额外物理假设） | $b^2 \le t(1 - t)$ 与圆心 $(1/2, 0)$、半径 $1/2$ 的欧氏闭圆盘不等式等价 | 纯实平面代数配方恒等式；绝不单凭模块名宣称原点排除已无条件导出量子力学 |
| **F.2** [@thm-appf-exclusion-face-polarity] | [`exclusion_ball_faces`](lean:D5/S3/Quantum/Foundation/ExclusionBallFaces.exclusion_ball_faces) | 有限维实赋范空间 $V$，闭尖凸锥 $C$，严格正泛函 $u$，线性张成全空间，且满足 `exclusionBalls C u`（第 3 项另需 `pairProper C u`） | 排除集非平凡、紧凸、由单一确认泛函暴露切出；非空真凸极面二分为单点纯态或排除面；在 `pairProper` 下相异纯态对的锥面切片即排除球且具 `wholePairBalls` | 不可省略有限维紧性、`exclusionBalls` 或 `pairProper`；任意凸态锥（如高维经典单纯形或多面体锥）不自动满足排除球公理 |
| **F.3** [@thm-appf-hermitian-exclusion-chart] | [`all_pure_charts`](lean:D5/S3/Quantum/Foundation/HermitianExclusionBall.all_pure_charts) | 固定 `Fin 3` 上的复厄米半正定锥 `cone` 与实值厄米迹泛函 `unit` | 每个纯态的排除面均存在实仿射维数 $a.\mathrm{dim} = 3$ 的 `ExclusionChart`（嵌入的 $2 \times 2$ 布洛赫球） | 图表实仿射维数 $3$ 绝非希尔伯特复维数 $3$；全 qutrit 态底实维数为 $8$ 且不仿射等价于欧氏球；结论不外推至 $N \ge 4$ 阶厄米锥 |
| **F.4** [@thm-appf-spin-factor-classification] | [`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences) | 固定四维载体 $E = \mathbb{R} \times (\operatorname{Fin} 3 \to \mathbb{R})$ 上的二元关系 $D$，显式满足二点正性 `P2 D` 与相位平衡 `PB D` | $D$ 必全局等于右手或左手空间叉积 `crossD ε`（$\varepsilon \in \{\mathrm{.plus}, \mathrm{.minus}\}$），并满足 `Consequences D` 与 `MatrixInterfaces (orientationBool ε) D` | `P2` 与 `PB` 是显式输入公理，不能从一张叉积示意图倒推；正锥 `cone` 不含迹一归一化；一般维数自旋因子 $\mathbb{R} \oplus \mathbb{R}^k$（$k \neq 3$）不等同于复量子态空间 |

综合上表可见，量子态空间之所以兼具“局部相干圆盘/布洛赫球截面”与“复矩阵非交换乘法”，在本附录的凸锥与关系公理下精确落定于两道显式门槛（充分条件方向）：第一，排除集必须摆脱多面体棱角而呈现严格凸的正维欧氏球结构（`exclusionBalls`），在三能级复厄米锥中体现为二维正交补子空间上的三维布洛赫球（[@thm-appf-exclusion-face-polarity]、[@thm-appf-hermitian-exclusion-chart]）；第二，在单个四维自旋因子锥上，若要从实对称约当积跨入复希尔伯特矩阵代数 $M_2(\mathbb{C})$，由二点格拉姆正性 `P2` 与相位平衡 `PB` 共同锁定空间三维叉积的模长与全局手征定向（[@thm-appf-spin-factor-classification]）。把每一道门槛如实标出，正是本书认识论诚实契约的题中之义。
:::

---

## F.6 整球球心图与固定球缘下界 {#sec-appendix-f-6}

设 $K$ 是 F.2 的归一化态底，$D_p$ 是纯态 $p$ 的原始排除球，$c_p$ 是该球的球心。取同一个 $D_p$ 中相交的两条弦。交点可以由两对球缘纯态各作一次二元凸组合得到。二元相容性（BC）要求把各纯态换成其排除球球心后，这两种凸组合仍给出同一点。这里的 BC 对所有原始纯态及两个独立的 $[0,1]$ 权重成立，允许端点重复和权重为零。

::: {.theorem #thm-appf-whole-ball-center-graph title="整球球心图与秩二分" lean="D5/S3/Quantum/Foundation/BinaryCenterGraph.whole_ball_center_graph"}
沿用 F.2 的有限维实赋范空间、闭尖凸锥、严格正归一化泛函、生成性和正维排除球图表，并设 BC 成立。对每个纯态 $p$ 及其任一维数为 $d$ 的排除球图表，存在唯一仿射映射 $g:\mathbb{R}^d\to V$，使单位球面上的点映到相应纯态的排除球球心。闭单位球的像包含在 $K$ 中。若 $p$ 是 $D_p$ 的唯一纯态标签，则 $g$ 单射且线性部分的秩为 $d$。若另有纯态标签具有相同的排除球，则 $g$ 为常值。
:::

::: proof
在图表中沿弦延拓球缘上的球心值。BC 保证不同弦给出的值一致，而同一条直线与闭球的交仍是一条弦，因此所定义的图为仿射图。球面张成整个图表的仿射空间，给出唯一性。非零核方向会把两个不同的对径球缘点送到同一球心，两点相交刚性与重复标签的配对关系把这两个点所在的球识别为同一配对球。重复标签分支中，整个球缘都映向配对球的球心。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appf-fixed-sphere-noncollapse title="固定排除球缘上的正直径下界" lean="D5/S3/Quantum/Foundation/BinaryCenterNoncollapse.fixed_sphere_noncollapse"}
沿用上述锥条件，设每个原始排除球有三维图表，且对应的 BC 成立。固定任一纯态 $p$，记 $S_p$ 为 $D_p$ 上的纯态集合。下式的最小值在 $S_p$ 上取得，并给出严格为正的下界。

$$
\delta_p=2\min_{q\in S_p}\lVert p-c_q\rVert,\qquad
\operatorname{diam}D_q\ge\delta_p\quad(q\in S_p).
$$

因此任一满足 $\operatorname{diam}D_{q_n}\to0$ 的纯态序列最终避开这个固定的 $S_p$。结论涵盖单标签与重复标签。
:::

::: proof
球心随球缘上的纯态连续变化。纯态 $p$ 与非纯球心 $c_q$ 不同，所以紧球缘上的距离函数取得正最小值。排除的对称性给出 $p\in D_q$，而 $D_q$ 关于 $c_q$ 中心对称，因此 $2c_q-p$ 也在 $D_q$ 中。两点的距离为 $2\lVert p-c_q\rVert$。完整证明由 Lean 内核检查。
:::

$\delta_p$ 依赖预先固定的球。全域正下界需要控制 $\inf_p\delta_p$。这些结论使用原始效应定义的排除球和原始归一化态底。

[原文 XI §138.2 与 §138.5](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/QUANTUM_ORIGIN_EXCLUSION_SEGMENT_RIGIDITY_AND_PURE_LOCUS_TOPOLOGY_XI.md#L1289)


## F.7 单标签排除球的截面与反射 {#sec-appendix-f-7}

沿用 F.6 的有限维实赋范空间、闭尖生成锥、严格正归一化泛函及记号。设 $V\ne\{0\}$，原排除球均有三维整球坐标，且满足二元相容性 BC。用 $\mathring A_{\mathrm{rel}}$ 和 $\partial_{\mathrm{rel}}A$ 表示集合 $A$ 在自身仿射包中的相对内部和相对边界。

::: {.theorem #thm-appf-singleton-center-sections title="单标签球心图的精确截面" lean="D5/S3/Quantum/Foundation/BinaryCenterSections.original_center_sections"}
归一化基底 $K$ 的仿射维数至少为六，并且存在单标签纯态。对每个这样的纯态 $p$，存在 $D_p$ 的三维整球坐标图 $b$ 及单射仿射映射 $g$，其线性部分秩为三。对每个单位向量 $x$，$g(x)=c_{b(x)}$。记闭单位球为 $\overline B$，单位球面为 $S$，则

$$
g(\mathring B)\subseteq\mathring K_{\mathrm{rel}},
\qquad
g(\overline B)=K\cap\operatorname{aff}(g(\overline B)).
$$

另有 $\partial_{\mathrm{rel}}g(\overline B)=g(S)\subseteq\partial_{\mathrm{rel}}K$。对每个 $x\in S$，$g$ 的线性像与原排除球 $D_{b(x)}$ 的方向空间只交于零。
:::

::: proof
若开球中的一点经球心图落在 $K$ 的相对边界，该点处的支撑面便包含整个闭球像。该面含有各球缘点所对应的球心，也就含有这些球心所在的整球。原排除球的极大性会迫使这些球相同，与球心图的单射性矛盾。球心图的球缘像位于 $K$ 的相对边界。从像球心沿射线延伸到球缘，会到达 $K$ 在该方向上的终点，这给出完整截面。若一个球缘点对应的排除球与该截面共享非零方向，就能沿该方向在其球心两侧取点，使该球心成为截面中一条线段的内点，与它在像球缘上的极端性矛盾。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appf-reflected-pure-sphere title="反射后的纯球缘与两种截面" lean="D5/S3/Quantum/Foundation/BinaryCenterReflection.original_reflected_alternatives"}
对每个单标签纯态 $p$，有三维整球坐标图 $b$ 和仿射映射 $g$、$k$，满足 $g(x)=c_{b(x)}$ 对一切 $x\in S$ 成立，且 $k(x)=2g(x)-p$ 对一切 $x$ 成立。$k$ 单射且秩为三。集合 $A=k(\overline B)$ 包含在 $K$ 中，关于 $k(0)$ 中心对称，且 $\partial_{\mathrm{rel}}A=k(S)$ 全由纯态组成。

若 $k(0)$ 在 $K$ 的相对边界，$A$ 等于某个原排除球 $D_r$。若 $k(0)$ 在 $K$ 的相对内部，则 $A=K\cap\operatorname{aff}(A)$，且 $A$ 不是 $K$ 的极端子集。等式 $A=D_p$ 成立当且仅当对每个 $x\in S$ 都有

$$
g(x)=\frac{p+2c_p-b(x)}{2}.
$$
:::

::: proof
对每个球缘点 $b(x)$，排除关系的对称性给出 $p\in D_{b(x)}$，在这个球内以 $c_{b(x)}$ 为中心反射 $p$ 就得到 $k(x)$。因此整个反射球缘都是纯态。反射球心的位置决定整球是原排除球还是穿过 $K$ 相对内部的截面。若反射球等于 $D_p$，$b(x)$ 与 $k(x)$ 都在 $D_p$ 中，且 $k(x)\in D_{b(x)}$。区分这两点的原效应在 $D_p$ 上分别取最大值和最小值，故这两点是对径点。反过来，所给公式使 $k(x)=b(-x)$ 遍及原球缘，取凸包即得整个 $D_p$。完整证明由 Lean 内核检查。
:::

## F.8 重复标签的有限相容性 {#sec-appendix-f-8}

沿用 F.6 的锥与归一化条件，并假设每个原排除球都有正维整球坐标。设 $p\ne s$ 是满足 $D_p=D_s$ 的纯态，取纯态 $q\in D_p$，记 $F=D_p$、$H=D_q$。原排除关系的两条纤维互为配对。$F$ 的纯态恰是标签为 $H$ 的纯态，$H$ 的纯态恰是标签为 $F$ 的纯态，两球不交。存在同一个原效应 $e$，其在 $K$ 上的零面与一面分别是整个 $F$ 与 $H$。球心替换在块内纯态上因此由下式给出，其中 $e$ 在原锥上满足 $0\le e\le u$ 且不是零效应或单位效应。

$$
J(x)=c_q+e(x)(c_p-c_q).
$$

::: {.theorem #thm-appf-repeated-finite-compatibility title="重复块内的有限仿射相容性" lean="D5/S3/Quantum/Foundation/BinaryCenterGeometry.repeated_block_finite_compatibility"}
在上述重复标签条件下，设两族有限纯态 $a_i,b_j$ 均取自 $F\cup H$，实系数分别满足 $\sum_i w_i=\sum_j v_j=1$。若 $\sum_i w_i a_i=\sum_j v_j b_j$，则 $\sum_i w_i c_{a_i}=\sum_j v_j c_{b_j}$。允许负系数，也包括有限凸组合。
:::

::: proof
由 $J$ 的仿射性及两边各自的系数和为一，替换后的每一边等于对原加权和应用 $J$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appf-repeated-one-outside title="排除一个块外端点与三个块内端点的交叉" lean="D5/S3/Quantum/Foundation/BinaryCenterGeometry.repeated_block_one_outside"}
在上述重复标签条件外再假设 BC。设 $r$ 为 $F\cup H$ 外的纯态，$a,b,d$ 为块内纯态。对任意 $0<t,v<1$，

$$
tr+(1-t)a\ne vb+(1-v)d.
$$
:::

::: proof
反设上式两边相等，BC 与严格正的 $t$ 会迫使 $c_r=J(r)$。由于 $0<e(r)<1$，$J(r)$ 是两个球心的严格凸组合。若该组合点属于某个原排除球，则该球的面性质将两个球心都纳入该球。每个球心都在对应球的相对内部，因而对应的整球也必须包含在该排除球内。整球极大性随即迫使两个不交的球相同。这与 $c_r\in D_r$ 矛盾。 完整证明由 Lean 内核检查。
:::

以上结论以重复标签对的存在为输入。两个块外端点的交叉、对所有排除球统一成立的正直径下界，以及三维排除球公理与 BC 能否推出全局混合相容性，仍是开放边界。

[原稿 XI §138.3、§138.4、§138.6](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/QUANTUM_ORIGIN_EXCLUSION_SEGMENT_RIGIDITY_AND_PURE_LOCUS_TOPOLOGY_XI.md#L1289)
