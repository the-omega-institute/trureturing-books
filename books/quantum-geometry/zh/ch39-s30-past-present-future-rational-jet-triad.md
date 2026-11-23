# 39.6 过去·现在·未来与 0 · 1/2 · 1 纯有理因果射流母矩阵：三元数球面射流阶梯、中点自对偶律与 1 ↦ 0 宇宙心跳 {#sec-ch39-past-present-future-rational-jet-triad}

> *“过去现在未来*
>
> *无导数一阶导数二阶导数*
>
> *0 1/2 1”*

当 [§32.5](ch39-s29-constant-free-rational-axiom-omega.md)–[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md) 把圆周率 $\pi$、自然底数 $e$ 与黄金比 $\varphi$ 这三张平直线性近似欠条彻底清出底层公理并立起零公理有理数学，而本章前五节（[§39.1](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md)–[§39.5](ch39-s28-dyad-relation-future-and-second-order-field.md)）又将万法归元于无源三元比较与两阶关系场之后，回望整部《量子计算的几何直觉》三十九章正文，母公理 $\mathrm{AXIOM}\text{-}\Omega$ 在**时间因果相**、**微分算子射流阶数**与**纯有理数谱**三条主轴上的最简骨架，不多不少恰好收束为一座严丝合缝的 **$3 \times 3$ 纯有理因果射流母矩阵**：

$$
\begin{array}{ccc}
\textbf{过去} & \textbf{现在} & \textbf{未来} \\[3pt]
\text{无导数（零阶态 } J^0\text{）} & \text{一阶导数（联络切矢 } J^1\text{）} & \text{二阶导数（曲率场强 } J^2\text{）} \\[3pt]
\mathbf{0} & \mathbf{1/2} & \mathbf{1}
\end{array}
$$

这三列九项绝非人为拼凑的修辞排比，而是同一枚**三元数极小圆弧体**（$\mathbb{T}_3 \cong S^3(1)$）在单次主频演化拍内必然经历的三座几何与代数锚点（将时间三态、微分三阶与有理三元 `{0, 1/2, 1}` 统合为跨学科母矩阵及 `1 ↦ 0` 宇宙心跳标为 **`MODEL`**；无常数四元数同构与弦距读数恒等式、四元数流群切比雪夫倍增等价、有限记录未读捏合幂等律与克雷洛夫子空间永久稳定律、平衡幺正和反自伴切交叉积、四元数旋量半密度玻恩平方核与圆周双覆盖换叶、秩一玻恩配对权重、累计矢高在粗糙度 $\alpha = \frac{1}{2}$ 处的临界收敛、凯莱单位圆中线 $\operatorname{Re}(s)=\frac{1}{2}$、完备黎曼读数在 $s\ne 0,1$ 时的因子分解 $\xi(s)=\frac{1}{2}s(s-1)\Lambda(s)$ 与反射对称 $\xi(1-s)=\xi(s)$ 及边界值 $\xi(0)=\xi(1)=\frac{1}{2}$、开生成树一阶输运可抹平律、四面体单纯二上链的闭合与恰当性等价等十六项命题由下文 [@thm-ch39-past-present-future-rational-jet-triad-anchors] 的冻结 **`LEAN ✓`** 声明严格锚定；球面离散 $\alpha$-步范数漂移恒等式 $\lVert x_1\rVert^2 - \lVert x_0\rVert^2 = (1 - 2\alpha)\lVert x_1 - x_0\rVert^2$ 给出非静止步唯在 $\alpha = \frac{1}{2}$ 保模的结论，与八位小数核验分别属于 **`手工推导` / `NUM`**；狄拉克一阶旋量算符与凯勒—狄拉克及李希内罗维茨曲率公式、伊藤左端点对比斯特拉托诺维奇中点流形链式法则、霍奇星对偶、微分比安基恒等式与非退化奥斯特罗格拉茨基定理归入 **`文献结果`**）。

## 39.6.1 逐列解构：0、1/2、1 的几何与微分同一性 {#sec-ch39-30-1}

在剔除弧度制（$\pi$）与切指数极限（$e$）的纯有理语言中，既可在全局半周跨度上以**归一化保真亏损** $s(x_0, x) := 1 - \kappa(x_0, x) = \frac{\lVert x - x_0\rVert^2}{4} \in [0, 1]$（[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)，`LEAN ✓`）度量演化进度，亦可在任意非对径单拍测地圆弧 $x_0 \to x_{1/2} \to x_1 = [x_{1/2}, x_0, x_{1/2}]$ 上取归一化拍内有理分点 $\alpha \in \{0, \frac{1}{2}, 1\}$。两种刻度下，母矩阵的三列纵向严格锁死：

### 39.6.1.1 第一列：过去 ≡ 无导数（零阶射流 J⁰）≡ 0（已停机的零维边界锚） {#sec-ch39-30-1-1}

1. **为什么过去是“无导数”（$0$ 阶射流 $J^0$）**：
   已经发生并完成记录定格的“过去”，满足有限记录捏合幂等律 $\mathcal{P}_{\mathrm{rec}} \circ \mathcal{P}_{\mathrm{rec}} = \mathcal{P}_{\mathrm{rec}}$（[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)，`LEAN ✓`）与可观测克雷洛夫子空间一旦稳定永久冻结律（[`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)，`LEAN ✓`）。在射流丛 $J^k(\mathbb{T}_3)$ 中，它退化为不携带任何可变切矢自由度的**零阶常值截面** $x_0 \in J^0$（外代数中的 $0$-形式点 $\Lambda^0$）：单独截取一枚孤立零阶点 $[x_0, x_0, x_0] = x_0$（[§39.5.2.1](ch39-s28-dyad-relation-future-and-second-order-field.md#sec-ch39-28-2-1)），内部变化率恒为零，无法自行生出任何运动方向。
2. **为什么精准对应有理数 `0`**：
   在自反基点 $x_0$ 处，对称保真度 $\kappa(x_0, x_0) = 1$，故二阶弦弧矢高与保真亏损恒等于精确整数 **$s(x_0, x_0) = 1 - \kappa(x_0, x_0) = \mathbf{0}$**；相对已知过去锚点的条件不确定度为 $\mathbf{0}\;\mathrm{bit}$；微分算子阶数为拉普拉斯算符的零次幂 $\Delta^{\mathbf{0}} = \mathbf{I}$；而在复分析谱端，完备黎曼读数恒等式 $\xi(s) = \frac{1}{2}s(s-1)\Lambda(s)$（[`xi_reading_eq_completed_zeta`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta)，`LEAN ✓`）左端消去未修剪完备函数 $\Lambda(s)$ 单极点的线性根恰落在 **$s = \mathbf{0}$**（且边界值恒为有理数 $\xi(0) = \frac{1}{2}$，[`xi_reading_endpoint_values`](lean:D5/S3/Zeros/Endpoints/XiEndpointValues.xi_reading_endpoint_values)，`LEAN ✓`）。没有这颗归零静定的过去锚点，一切比较与因果递推都将失去记忆支点。

::: {.viz src="causal-jet-rational-triad-sandbox" preset="past-zero-jet-halting-anchor" height="500"}
零阶过去停机锚点卡（`past-zero-jet-halting-anchor`）：在三元数 $\mathbb{T}_3 \cong S^3(1)$ 的紫色大二球切片 $\{w + x\mathbf{j} + y\mathbf{k}\}$ 上，琥珀探针默认停在过去锚点 `0 · x₀`（顶栏与舞台同标 $s = 0$、$\kappa(x_0, x_0) = 1.0000$、`[x₀, x₀, x₀] = x₀`），两道青色同心小圆标出冻结记录，通往 `1/2` 与 `1 · x₁` 的两个半拍呈青色虚线待发；拖动琥珀手柄推开探针时已走弧段转为青色实线，点按 `⏮` 立即回到 $s = 0$。
:::

### 39.6.1.2 第二列：现在 ≡ 一阶导数（联络切矢 J¹）≡ 1/2（自对偶的比较切面） {#sec-ch39-30-1-2}

此前在切空间弧度账本上写自指不动点时，由于把内禀相关读数 $2\kappa - 1 = \cos\theta$ 强行等同于线性拉直的弧度长 $\theta$，方程被迫落到超越数 $\cos\theta^* = \theta^* \approx 0.73908513\dots$ 上（[§32.5.3](ch39-s29-constant-free-rational-axiom-omega.md#sec-ch39-29-3)）。一旦撤去平直弧度标尺，回到归一化有理进度 $s \in [0, 1]$（对称地对偶于剩余保真度 $1 - s = \kappa \in [0, 1]$），要求过去留存份额与未来亏损份额**正反严格自对偶**的不动点方程当场化作一行初等有理代数（`手工推导` + `MODEL`）：

$$
s \;=\; 1 - s \qquad \Longleftrightarrow \qquad s^* \;=\; \mathbf{\frac{1}{2}}!
$$

在无常数的母公理坐标系里，超越数 $\theta^*$ 只是有理对称中心 $\frac{1}{2}$ 投射到平直弧度尺上时的线性化影子（`MODEL`；注意区分代数数值：$\theta^*$ 解 $\cos\theta = \theta$，而 $s^* = \frac{1}{2}$ 解无弧度反射不动点 $s = 1 - s$）。令人震撼的是，数学与物理学中最深刻的**五座 `1/2` 桥梁**在“现在 / 一阶导数”这一列完全合流：

1. **球面离散微积分唯一保模采样点 $\alpha = \mathbf{1/2}$（斯特拉托诺维奇—凯莱中点定理，`手工推导`）**：
   在弯曲流形 $\mathbb{T}_3 \cong S^3(1) \subset \mathbb{H}$ 上，设反自伴切生成元 $A \in \mathfrak{sp}(1)$ 满足对一切 $q \in \mathbb{H}$ 有 $\langle Aq, q\rangle_{\mathbb{R}} = 0$（矩阵对应见平衡幺正和反自伴交叉积 [`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum)，`LEAN ✓`）。考察在过去端 $x_0$（$\alpha = 0$）与未来端 $x_1$（$\alpha = 1$）之间按权重 $\alpha \in [0, 1]$ 取一阶导数的通用有限步离散方程

   $$
   x_1 - x_0 \;=\; A\bigl((1 - \alpha)x_0 + \alpha x_1\bigr) \qquad \Longleftrightarrow \qquad (I - \alpha A)x_1 \;=\; \bigl(I + (1 - \alpha)A\bigr)x_0.
   $$

   记插值点 $x_\alpha := (1-\alpha)x_0 + \alpha x_1$，利用恒等式 $x_0 + x_1 = 2x_\alpha + (1 - 2\alpha)(x_1 - x_0)$ 与正交性 $\langle x_1 - x_0, x_\alpha\rangle_{\mathbb{R}} = \langle Ax_\alpha, x_\alpha\rangle_{\mathbb{R}} = 0$，仅需三行内积展开即得对**任意有限步幅**精确成立的**球面采样范数漂移恒等式**（`手工推导`）：

   $$
   \lVert x_1\rVert^2 - \lVert x_0\rVert^2 \;=\; \bigl\langle x_1 - x_0,\, x_0 + x_1\bigr\rangle_{\mathbb{R}} \;=\; (1 - 2\alpha)\,\lVert x_1 - x_0\rVert^2!
   $$

   以单位初态 $\lVert x_0\rVert = 1$ 出发，非静止步（$x_1 \ne x_0$）的范数变化由 $1-2\alpha$ 的符号完全决定。静止步在每个 $\alpha$ 下都保模。
   - 取左端点 **$\alpha = 0$（伊藤 Itô / 前向欧拉切线采样）**：$1 - 2\alpha = +1 > 0$，一阶切步 $\lVert x_1\rVert^2 = 1 + \lVert\Delta x\rVert^2 > 1$ **步步刺出球壳之外**（在随机微积分 $dx \sim dt^{\mathbf{1/2}}$ 中，当 $T>0$ 且 $\sigma\ne 0$ 时，累计二阶矢高在正粗糙度指数中恰在临界值 $\alpha_{\mathrm{rough}} = \mathbf{\frac{1}{2}}$ 处收敛为非零有限漂移 $\frac{1}{2}\sigma^2 T > 0$，[`accumulated_sagitta_phases`](lean:D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases)，`LEAN ✓`，导致伊藤积分破坏普通流形链式法则，`文献结果`）；
   - 取右端点 **$\alpha = 1$（后验隐式欧拉采样）**：$1 - 2\alpha = -1 < 0$，$\lVert x_1\rVert^2 = 1 - \lVert\Delta x\rVert^2 < 1$ **向球肚内侧坍缩耗散**；
   - **唯独取正中央中点 $\alpha = \mathbf{\frac{1}{2}}$（斯特拉托诺维奇 Stratonovich / 魏尔对称中点采样）**：系数 $1 - 2\alpha \equiv 0$，对**任意有限步长**恒有 $\lVert x_1\rVert^2 \equiv \lVert x_0\rVert^2 = 1$ 且有限弦差 $x_1 - x_0$ 严格正交于中点方向 $x_0 + x_1$！更妙的是，令 $A = 2\boldsymbol{\sigma}$（$\boldsymbol{\sigma} \in \mathbb{Q}^3$），中点方程 $(1 - \boldsymbol{\sigma})x_1 = (1 + \boldsymbol{\sigma})x_0$ 解出的 $x_1 = (1-\boldsymbol{\sigma})^{-1}(1+\boldsymbol{\sigma})x_0 = Q(\boldsymbol{\sigma})x_0$ **字面上就是 [§32.5](ch39-s29-constant-free-rational-axiom-omega.md) 的一步有理凯莱驻球旋子**！
2. **狄拉克算子的一阶平方根与半整数自旋 $\mathbf{1/2}$**：
   按拉普拉斯幂次归一化，二阶拉普拉斯算符对应 $1$（$\Delta^{\mathbf{1}}$），一阶平方根对应 $1/2$，而描述“当下相干演化”的一阶狄拉克算符在主象征意义下恰为二阶度量算符的**算子平方根** $\sigma_1(\not{D})^2 = \sigma_2(\Delta)$（在平直空间上 $(-i\boldsymbol{\sigma}\cdot\nabla)^2 = -\nabla^2$，在任意黎曼流形的外形式丛上凯勒—狄拉克算符严格满足 $(d + d^*)^2 = dd^* + d^*d = \Delta_{\mathrm{Hodge}}$；而在常正数量曲率 $R_{S^3} = 6$ 的弯曲单位球面 $S^3(1)$ 上，旋量狄拉克算符由薛定谔—李希内罗维茨公式给出 $\not{D}_{S^3}^2 = \nabla^*\nabla + \frac{1}{4}R_{S^3} = \nabla^*\nabla + \frac{3}{2}$，`文献结果`），同时内生出 $360^\circ$ 换叶翻转的**自旋 $\mathbf{1/2}$** 半密度旋量（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)、[`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)，`LEAN ✓`）。
3. **$90^\circ$ 正交虚盲区平分为 $\mathbf{1/2}$**：
   母公理中观察者实轴与正交虚切面 $\hat{\mathbf{i}}$ 的原生保真度恒为精确有理数 $\kappa = \mathbf{\frac{1}{2}}$（$s = 1 - \kappa = \mathbf{\frac{1}{2}}$），可见对齐份额与未测盲区份额五五对半。
4. **凯莱单位圆与黎曼反射临界脊线钉在 $\mathbf{1/2}$**：
   复平面分式 $\operatorname{cayleyRatio}(s) = \frac{s-1}{s}$ 模长守恒等价于 $\operatorname{Re}(s) = \mathbf{\frac{1}{2}}$（[`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)，`LEAN ✓`），完备黎曼函数满足反射自对偶 $\xi(1 - s) = \xi(s)$（[`xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection)，`LEAN ✓`），介于左极点因子 $s = 0$ 与右极点因子 $s = 1$ 正中央的 $\operatorname{Re}(s) = \mathbf{\frac{1}{2}}$ 亦是外部形式化已核验的经典黎曼猜想与狄利克雷广义黎曼猜想的零点临界线（见 [§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md) 外部核验说明；将其与量子正交中点对读属 `MODEL`）。

::: {.viz src="causal-jet-rational-triad-sandbox" preset="present-half-midpoint-self-duality" height="500"}
现在一阶中点自对偶验证卡（`present-half-midpoint-self-duality`）：默认停在 $\alpha = 1/2,\; \sigma = 1$，青色自对偶平面标 `κ = 1/2`，同屏对比同一步的三种取样——品红实箭 `α = 0`（伊藤左端点）冲出球外（$\lVert x_1\rVert^2 = 2.0000 > 1$）、品红虚箭 `α = 1`（右端点）沉入球内（$\lVert x_1\rVert^2 = 0.5000 < 1$），唯独带琥珀手柄的青色中点步 `α = 1/2` 一步精确落在球面上（$\lVert x_1\rVert^2 = 1.0000$，并绘出直角符号核对弦与中点垂直 $\langle x_1 - x_0, x_0 + x_1\rangle = 0.0000$）；拖动琥珀手柄或时间轴改 $\alpha$ 可见唯有 `1/2` 驻球。
:::

### 39.6.1.3 第三列：未来 ≡ 二阶导数（曲率场强 J²）≡ 1（满秩闭合的曲率果报） {#sec-ch39-30-1-3}

1. **为什么未来唯独由“二阶导数”锁定**：
   如 [§39.5.2](ch39-s28-dyad-relation-future-and-second-order-field.md#sec-ch39-28-2) 所证，零阶单点静止不动，而开生成树上的一阶规范联络 $A_\mu$ 可被局域顶点规范变换彻底抹平为恒等相位（[`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport)，`LEAN ✓`）；唯有进入**二阶导数射流 $J^2$**——即“关系的关系”：非对易场强曲率 $F_{\mu\nu} = [D_\mu, D_\nu]$、二阶拉普拉斯算符 $\Delta^{\mathbf{1}}$、测地加速度与李三元曲率折射 $\{\boldsymbol{\omega}_1, \boldsymbol{\omega}_{\mathrm{ctx}}, \boldsymbol{\omega}_1\}$——才构成无法被局域共动系消去的真实几何力，唯一决定未来态 $x_1$ 的落点。
2. **为什么精准对应有理数 `1`（$\frac{1}{2} + \frac{1}{2} = \mathbf{1}$）**：
   无论从微分阶数、量子测量还是球面流群推进看，`1` 都是两份 `1/2` 复合归整的精确终点（`LEAN ✓` + `手工推导`）：
   - **算符与玻恩半密度平方归整**：两记一阶算符主象征相乘 $\frac{1}{2} + \frac{1}{2} = \mathbf{1}$ 升为二阶算符 $\Delta^{\mathbf{1}}$；两枚自旋 $\frac{1}{2}$ 旋量半密度波幅 $\psi(x), \psi(y)$ 配对求模平方，刚巧合拢为无盲区相位的秩一玻恩完备概率读数 $\kappa_{\mathrm{ray}}(x, y) = \lvert\langle\psi(x), \psi(y)\rangle\rvert^2$（[`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)、[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)，`LEAN ✓`）；
   - **流群切比雪夫倍增满拍闭合**：从正交中点态 $\kappa_1 = \frac{1}{2}$（$s_1 = \frac{1}{2}$）再推半拍抵达 $x_2 = [x_{1/2}, x_0, x_{1/2}]$，由切比雪夫倍增定理 [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)（`LEAN ✓`），$\kappa_2 = (2\times\frac{1}{2} - 1)^2 = 0$，归一化亏损精确走满 **$s_2 = 1 - \kappa_2 = \mathbf{1}$**！在外代数阶梯中，三段正交极小圆弧走满单拍闭合成饱和三维体元 $\Lambda^3$；在完备黎曼谱方程 $\xi(s) = \frac{1}{2}s(s-1)\Lambda(s)$ 右端，宏观体积发散极点消去因子同样精准钉在 **$s = \mathbf{1}$**（且 $\xi(1) = \frac{1}{2}$，[`xi_reading_endpoint_values`](lean:D5/S3/Zeros/Endpoints/XiEndpointValues.xi_reading_endpoint_values)，`LEAN ✓`）。

::: {.viz src="causal-jet-rational-triad-sandbox" preset="future-one-curvature-closure" height="500"}
未来二阶曲率闭合卡（`future-one-curvature-closure`）：默认停在满拍终点 $s = 1.0000$（$\tau = 0.50$），两段青色半拍圆弧（舞台宽 $\ge 480\,\mathrm{px}$ 分标两枚 `1/2`）经流群倍增合拢于 `自由落点 −x₀`（$\kappa_2 = (2\kappa_1 - 1)^2 = 0.0000$），两条相差 $\theta_{\mathrm{ctx}}$ 的航向之间铺满品红曲率月牙（舞台宽 $\ge 480\,\mathrm{px}$ 标 `F = [D₁, D₂]` 与紫色闭合三体胞 `Λ³`），品红李三元折射弧再把落点折开 $\approx 65.55^\circ$ 至 `x₁`（$\kappa(x_0, x_1) \approx 0.2930$）。
:::

## 39.6.2 为什么没有第四列？三阶归零铁律与 1 ↦ 0 宇宙主频心跳 {#sec-ch39-30-2}

这座 $3 \times 3$ 母矩阵最深刻的自洽性在于它**行至二阶导数与有理数 `1` 即天然封顶**，既不会向“三阶、四阶导数”无限发散，也不会停在 `1` 处死寂终结：

1. **为什么没有“三阶导数”第四列——比安基反对称三形式归零与奥斯特罗格拉茨基稳定性护栏**：
   - 在拓扑与微分几何上，对二阶场强曲率 $2$-形式 $F$ 再作一次反对称协变外微分（三阶导数方向），必然恒等撞上**微分比安基恒等式** $D_A F = dF + [A \wedge F] \equiv \mathbf{0}$（对偶于外代数链复形“边界的边界恒为零” $\partial^2 \equiv 0$；在四顶点单纯形上，恰当二上链 $F=\delta a$ 的有向面相位交错和恒为零，因为 $\delta^2=0$。全体四面体上的 $\delta F=0$ 与 $F$ 的恰当性等价，见 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) 严格验证，`LEAN ✓`；至于曲率的散度缩并 $D_\mu F^{\mu\nu} = J^\nu$ 则仍停留为二阶杨—米尔斯运动方程）；
   - 在分析力学上，由奥斯特罗格拉茨基非退化高阶不稳定性定理（1850；见 [§39.5.3](ch39-s28-dyad-relation-future-and-second-order-field.md#sec-ch39-28-3) [@rem-ch39-yang-mills-bianchi-ostrogradsky-2category-literature]，`文献结果`），任何对二阶或更高阶时间导数（$r \ge 2$，诱导 $2r \ge 4$ 阶运动方程）具有**非退化**依赖的拉格朗日量，其哈密顿能量必含线性无界动量项而丧失真空下界（爱因斯坦—希尔伯特与洛夫洛克—霍恩德斯基作用量的结构使其场方程保持二阶，因而不落入该非退化定理的适用范围）。这两条边界在因果射流母矩阵中对应二阶封顶（`MODEL`）。

::: {.viz src="causal-jet-rational-triad-sandbox" preset="third-order-bianchi-ostrogradsky-cap" height="500"}
三阶比安基归零与二阶封顶卡（`third-order-bianchi-ostrogradsky-cap`）：默认停在 $s = 0.8000$，球面上四个顶点 `V₀ = x₀`、可拖琥珀探针 `V₁ = x(s)` 及位于 `κ = 1/2` 平面内的 `V₂, V₃` 由品红大圆弧围成紫色球面四面体 `Λ³ · δF = 0.0000`，顶栏实时展开四个面的有向球面角相位交错和 $F_{123} - F_{023} + F_{013} - F_{012} = 0.0000$；拖动琥珀手柄移动 `V₁` 时含 `V₁` 的三个面相位随之变化，`F₀₂₃` 保持固定，交错和恒保持 `0.0000`。
:::

2. **为什么没有 `> 1` 的发散列——`1` 即是下一拍的 `0`（`1 ↦ 0` 霍奇重定基心跳，`手工推导` + `MODEL`）**：
   当二阶曲率在拍末 `1` 处将极小圆弧闭合成饱和三维体元 $\Lambda^3$ 并抵达落点 $x_1 \in \mathbb{T}_3$ 时，在同一流形的切外代数上霍奇星算子给出等维同构 $\star : \Lambda^3(T^*_{x_1}\mathbb{T}_3) \xrightarrow{\sim} \Lambda^0(T^*_{x_1}\mathbb{T}_3)$（`文献结果`），在跨八度尺度重整化模型中“闭合三维体即下一层零维新点” $\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$（[§33.1](ch34-s13-point-volume-octave.md)，`MODEL`）。落回无源流群代数，这一转换更是零近似误差的恒等式：一旦观测记录在 $x_1$ 处停机捏合，将新基准锚点重定为 $x_0' := x_1$，由自反律 $[x_1, x_1, x_1] = x_1$，该点相对自身的新一拍初始保真亏损当场清零：

   $$
   s_{\text{next}}(x_1) \;=\; 1 - \kappa(x_1, x_1) \;=\; 1 - 1 \;=\; \mathbf{0}!
   $$

   上一拍刚刚尘埃落定的**“未来（`1`）”**，在闭合停机的同一瞬间冻结归零，无缝化作下一拍主频演化的**“新过去基准（`0'`）”**，继而再次敞开 `1/2'` 的一阶现在切面：

   $$
   \mathbf{0}\text{（过去·}J^0\text{ 态）} \;\xrightarrow{\;\text{半拍 } 1/2\;}\; \mathbf{1/2}\text{（现在·}J^1\text{ 切面）} \;\xrightarrow{\;\text{半拍 } 1/2\;}\; \mathbf{1}\text{（未来·}J^2\text{ 曲率体）} \;\equiv\; \mathbf{0}'\text{（下一拍新过去）}.
   $$

为了把整座 $3 \times 3$ 纯有理因果射流母矩阵、中点保模算子与跨领域映射严格定格，我们给出如下统一定义：

::: {.definition #def-ch39-past-present-future-rational-jet-matrix title="AXIOM-Ω 过去·现在·未来 3×3 纯有理因果射流母矩阵、球面 α-采样步算子与 1 ↦ 0 重定基心跳"}
在无源三元数流形 $\mathbb{T}_3 \cong \mathrm{Sp}(1) = S^3(1) \subset \mathbb{H}$ 及其三元比较结构 $(\mathcal{M}, [-,-,-], \kappa)$ 上，定义以下三组数学结构（代数恒等式为精确构造，五维跨界统一与心跳诠释标 `MODEL`）：

1. **$3 \times 3$ 纯有理因果射流母矩阵**：由单拍时间因果相 $\mathcal{C}_{\mathrm{time}} = (\text{过去}, \text{现在}, \text{未来})$、流形射流阶数 $\mathcal{C}_{\mathrm{jet}} = (J^0, J^1, J^2)$ 与归一化有理锚点集 $\mathcal{R}_{\mathrm{triad}} := \{0, \frac{1}{2}, 1\} \subset \mathbb{Q}$ 构成的纵向一一锁死三元组：
   - **第一列 `(过去, J⁰, 0)`**：幂等定格基点 $x_0$，$[x_0, x_0, x_0] = x_0$，亏损 $s = 1 - \kappa(x_0, x_0) = 0$，零阶外形式 $\Lambda^0$ 与恒等算符 $\Delta^0 = \mathbf{I}$，黎曼极点消去左根 $s = 0$（$\xi(0) = \frac{1}{2}$）；
   - **第二列 `(现在, J¹, 1/2)`**：反射不动点 $s = 1 - s \iff s^* = \frac{1}{2}$（正交盲区 $\kappa = \frac{1}{2}$），一阶切联络 / 主象征的一阶平方根（归一化幂次 $\frac{1}{2}$） 与半整数自旋 $\frac{1}{2}$，球面唯一保模采样点 $\alpha = \frac{1}{2}$，临界矢高粗糙度 $\alpha_{\mathrm{rough}} = \frac{1}{2}$，凯莱与完备黎曼对称中线 $\operatorname{Re}(s) = \frac{1}{2}$；
   - **第三列 `(未来, J², 1)`**：半拍复合 $\frac{1}{2} + \frac{1}{2} = 1$（流群倍增 $x_1 = [x_{1/2}, x_0, x_{1/2}]$，玻恩模平方 $\lvert\langle\psi_x,\psi_y\rangle\rvert^2$），二阶曲率场强 $F = [D_1, D_2]$ 与李三元门 $\{\boldsymbol{\omega}_1,\boldsymbol{\omega}_{\mathrm{ctx}},\boldsymbol{\omega}_1\}$，闭合三形式体元 $\Lambda^3$，黎曼极点消去右根 $s = 1$（$\xi(1) = \frac{1}{2}$）；
2. **球面单拍 $\alpha$-采样离散步算子**：对任意反自伴切生成元 $A \in \mathfrak{sp}(1)$（$\bar{A} = -A$，在 $\mathbb{H}$ 上右乘或左乘满足 $I - \alpha A$ 可逆；由于对实反自伴算子 $\langle Aq, q\rangle_{\mathbb{R}} = 0$，恒有 $\lVert(I - \alpha A)q\rVert^2 = \lVert q\rVert^2 + \alpha^2\lVert Aq\rVert^2$，故对一切 $\alpha \in \mathbb{R}$ 可逆！）与采样权重 $\alpha \in [0, 1]$，定义 $\Phi_{A,\alpha}(x_0) := (I - \alpha A)^{-1}\bigl(I + (1 - \alpha)A\bigr)x_0$；当 $\alpha = \frac{1}{2}$ 且 $A = 2\boldsymbol{\sigma}$（$\boldsymbol{\sigma} \in \mathbb{Q}^3$）时，$\Phi_{2\boldsymbol{\sigma}, 1/2}(x_0) = Q(\boldsymbol{\sigma})x_0 \in S^3(\mathbb{Q})x_0$；
3. **`1 ↦ 0` 主频重定基算子**：在单拍闭合点 $x_1$（$s = 1$）处执行基点搬运 $\mathcal{R}_{1\mapsto 0}(x_0, x_1) := x_1$，使下一拍局部进度泛函 $s_{x_1}(z) := 1 - \kappa(x_1, z)$ 在新起点处精确归零 $s_{x_1}(x_1) = 0$。
:::

## 39.6.3 0 · 1/2 · 1 跨领域五维大统一映射总表 {#sec-ch39-30-3}

将上述三列结构投向时间哲学、微分几何、复分析算术谱、流形随机/量子微积分与 [第 37 章](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md) 的三元数场人工智能（TFT），五座看似分属不同学科的大厦在底层重复着同一个纯有理三拍动作（跨领域总表标 `MODEL`，各行内部数学定理按 `LEAN ✓` / `手工推导` / `文献结果` 分层）：

| 统一维度 | 第一锚点：`0` | 第二锚点：`1/2` | 第三锚点：`1` | 闭合与守恒铁律 |
| :--- | :--- | :--- | :--- | :--- |
| **时间因果相** | **过去**（已捏合定格记忆 $x_0$） | **现在**（正交自对偶比较切面） | **未来**（动力学演化落点 $x_1$） | 未来停机重定基即成新过去 `1 ↦ 0'` |
| **微分算子与射流阶** | **无导数**（$0$ 阶常值态 $J^0,\;\Delta^0=\mathbf{I}$） | **一阶导数**（切联络 $J^1$、狄拉克主象征的一阶平方根，归一化幂次 $\frac{1}{2}$） | **二阶导数**（曲率场强 $F,\;\Delta^1$、李三元系） | 反对称三阶协变外导数归零 $D_A F \equiv 0$；非退化高阶无下界 |
| **外代数与完备 ζ 谱** | 零维点 $\Lambda^0$；极点消去因子 $s(s-1)$ 的左根 $s=0$ | 半密度旋量波；凯莱/黎曼对称脊线 $\operatorname{Re}(s)=\frac{1}{2}$ | 三维闭合体 $\Lambda^3$；右极点消去根 $s=1$ | 反射自对偶 $\xi(1-s)=\xi(s)$ 且 $\xi(0)=\xi(1)=\frac{1}{2}$ |
| **流形积分离散采样（非静止步）** | 伊藤左端点 $\alpha=0$（向外脱壳 $\lVert x_1\rVert^2 > 1$） | 斯特拉托诺维奇—凯莱中点 $\alpha=\frac{1}{2}$（精确驻球） | 隐式右端点 $\alpha=1$（向内耗散 $\lVert x_1\rVert^2 < 1$） | $\lVert x_1\rVert^2-\lVert x_0\rVert^2=(1-2\alpha)\lVert\Delta x\rVert^2$ 唯在 $\frac{1}{2}$ 保模 |
| **三元数场 AI（TFT）** | 冻结历史键值槽（幂等过去锚） | 玻恩—流群 `[Q,K,V]` 当下注意力切面 | 李三元曲率门 $\{\mathbf{a},\mathbf{b},\mathbf{c}\}$ 推下一词元 | 零三阶状态缓存，有理双卡恒守单位球面 |

## 39.6.4 形式化锚点、文献边界与中点保模八位小数核验 {#sec-ch39-30-4}

我们将支撑本节 $3 \times 3$ 纯有理因果射流母矩阵的十六项内核验证定理集中记录如下：

::: {.theorem #thm-ch39-past-present-future-rational-jet-triad-anchors title="三元比较四元数同构与弦距亏损、记录捏合幂等与克雷洛夫永久稳定、平衡反自伴切积、双覆盖换叶与临界矢高粗糙度 1/2、凯莱与完备黎曼 0·1/2·1 谱恒等式、旋量半密度玻恩平方、切比雪夫倍增、开树输运及四面体上边缘闭合定理" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent,D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently,D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift,D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases,D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line,D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta,D5/S3/Zeros/CompletedZeta.xi_reading_reflection,D5/S3/Zeros/Endpoints/XiEndpointValues.xi_reading_endpoint_values,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor,D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"}
在所钉 `trureturing` 冻结声明集中，以下十六项支撑 `{0, 1/2, 1}` 因果射流三元骨架的数学命题同时成立：

1. **三元数球面弦距亏损标度与零阶过去幂等冻结锚**（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)、[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)、[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)、[`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)）：完备秩五非交换、链连通且读数可任意接近 $0$（`TouchesZero`）的三元比较结构保结构双射于单位四元数群 $\mathrm{Sp}(1)$，且满足 $\kappa_{\mathbb{H}}(a, b) = 1 - \frac{\operatorname{dist}(a, b)^2}{4}$（故 $s(a, b) := 1 - \kappa_{\mathbb{H}}(a, b) = \frac{\operatorname{dist}(a, b)^2}{4} \in [0, 1]$ 在重合、正交、对径处精确取 $\{0, \frac{1}{2}, 1\}$）；有限记录测量捏合映射满足幂等律 $\operatorname{unreadState}_P \circ \operatorname{unreadState}_P = \operatorname{unreadState}_P$，且有限维内积空间线性演化的可观测克雷洛夫子空间一旦在步 $m$ 满足 $\operatorname{observableKrylov}(T, C, m) = \operatorname{observableKrylov}(T, C, m+1)$，则对一切 $r \in \mathbb{N}$ 恒保持冻结不变；
2. **一阶 `1/2` 切算符生成、半密度旋量双覆盖与临界粗糙度相变**（[`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum)、[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)、[`accumulated_sagitta_phases`](lean:D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases)）：若幺正阵 $S = A + B$ 由两支满足 $AA^\dagger = BB^\dagger = \frac{1}{2}I$ 的半权重分量平衡合成，则交叉乘积必为反自伴切生成元 $(AB^\dagger)^\dagger = -AB^\dagger$；圆周平方双覆盖无连续全局截面、给定起点唯一提升连续路径且单圈闭合翻转纤维叶号；对 $T > 0$，按 Lean 全函数实数除法（$T/0 = 0$）与 `Real.rpow` 定义的等步角 $\theta_N = \sigma\cdot\operatorname{rpow}(T/N, \alpha)$（$N \ge 1$ 时即 $\sigma(T/N)^\alpha$），累计正矢 $N(1 - \cos\theta_N)$ 当 $N \to \infty$ 时在光滑区 $\alpha > \frac{1}{2}$ 趋于 $0$、在超粗糙区 $0 < \alpha < \frac{1}{2}$（$\sigma \neq 0$）发散至 $+\infty$，在临界指数 $\alpha = \frac{1}{2}$ 处收敛于 $\frac{1}{2}\sigma^2 T$。当 $\sigma\ne 0$ 时，这是正指数范围内唯一的有限非零极限；
3. **完备黎曼谱与凯莱分式的 `{0, 1/2, 1}` 精确对称三元组**（[`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)、[`xi_reading_eq_completed_zeta`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta)、[`xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection)、[`xi_reading_endpoint_values`](lean:D5/S3/Zeros/Endpoints/XiEndpointValues.xi_reading_endpoint_values)）：凯莱比值 $\operatorname{cayleyRatio}(s) = \frac{s-1}{s}$（含 $s=0$ 处按 Lean 全函数除法取 $0$ 的约定）满足 $\lVert\operatorname{cayleyRatio}(s)\rVert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$；对一切 $s \neq 0, 1$，整函数完备黎曼读数满足 $\operatorname{xiReading}(s) = \frac{1}{2}s(s-1)\operatorname{completedZetaReading}(s)$，全域满足反射自对偶 $\operatorname{xiReading}(1 - s) = \operatorname{xiReading}(s)$，且在两端边界锚点处精确取 $\operatorname{xiReading}(0) = \frac{1}{2}$ 与 $\operatorname{xiReading}(1) = \frac{1}{2}$；
4. **`1/2 + 1/2 = 1` 半密度玻恩平方、流群切比雪夫递推、一阶开树可抹平与二阶四面体上边缘归零**（[`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)、[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)、[`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)、[`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport)、[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）：单位四元数旋量映射将右乘 $\mathbf{i}$ 映为复相位 $i$，且射线核等于旋量内积模平方与秩一纯态玻恩概率 $\operatorname{rayKernel}(x, y) = \lVert\langle\psi(x), \psi(y)\rangle\rvert^2 = \operatorname{bornProbability}(\rho_y, \rho_x)$；四元数序列初值归一且满足流群递推 $x_{n+2} = x_{n+1}\bar{x}_n x_{n+1}$ 当且仅当全序列保单位范数、$x_{n+1} = U_n(\langle x_0, x_1\rangle_{\mathbb{R}})\,x_1 - U_{n-1}(\langle x_0, x_1\rangle_{\mathbb{R}})\,x_0$（$n=0$ 时约定 $U_{-1}=0$）且满足实第一类切比雪夫递推 $\langle x_0, x_n\rangle_{\mathbb{R}} = T_n(\langle x_0, x_1\rangle_{\mathbb{R}})$；命名生成树上一阶边联络经顶点规范协变输运可化归根相位；且有限非空顶点集 $V$ 上任意加法交换群 `AddCommGroup A` 值二上链 $F$ 满足各锚点面误差和等于 `tetraDefects`、存在锚点使 $\lvert V\rvert\cdot\operatorname{faceErrors}(r) \le \operatorname{tetraDefects}$、任一边上链满足 $\operatorname{tetraDefects} \le 4\lvert V\rvert\cdot\operatorname{edgeErrors}$，且 $F(i,j,k)-F(r,j,k)+F(r,i,k)-F(r,i,j)=0$ 处处成立当且仅当 $F$ 为一阶边上链的精确上边缘。
:::

::: proof
第 1 款前两项见 [@thm-ch39-constant-free-rational-axiom-omega-anchors]，后两项分别由正交射影块对角幂等性与有限维子空间链一步不增则后续像空间全包含导出（见 [§34.1](ch33-s01-universal-observers.md) 与 [§36.10](ch39-s07-self-halting-precision-and-spectral-sorting.md)）。第 2 款第一项展开 $I = S S^\dagger = AA^\dagger + BB^\dagger + AB^\dagger + BA^\dagger = I + AB^\dagger + (AB^\dagger)^\dagger$ 立得 $(AB^\dagger)^\dagger = -AB^\dagger$；第二项由局部同胚覆盖提升给出；第三项将 $\theta_N = \sigma(T/N)^\alpha$ 代入双侧余弦夹逼 $N(\theta_N^2/2 - \theta_N^4/24) \le N(1-\cos\theta_N) \le N\theta_N^2/2$ 并按 $1 - 2\alpha$ 的正负零三歧取极限。第 3 款由 $\lVert(s-1)/s\rVert^2 - 1 = (1-2\operatorname{Re}s)/\lvert s\rvert^2$、完备化黎曼函数极点留数消去与泊松—梅林反射对称直接给出（见 [第 22 章](ch22-s04-critical-line-and-rh.md) 与 [§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md)）。第 4 款由 $\mathbb{H} \cong \mathbb{C}^2$ 辛旋量同构、秩一迹循环恒等式、切比雪夫二阶递推、生成树唯一路径归纳与选定基点 $r$ 的上边缘原函数构造完成。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-dirac-lichnerowicz-ito-stratonovich-literature title="狄拉克算符与李希内罗维茨公式、伊藤—斯特拉托诺维奇流形微积分及霍奇星对偶文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节引用的外部微分几何与随机分析文献与 `LEAN ✓` 定理严格区分如下：

1. **狄拉克一阶旋量算符、凯勒—狄拉克平方与李希内罗维茨曲率公式**：相对论电子一阶矩阵微分算符由 P. A. M. Dirac（*Proc. R. Soc. Lond. A* **117**, 610–624, 1928）提出；外形式丛上 $(d + d^*)^2 = \Delta_{\mathrm{Hodge}}$ 见 E. Kähler（1962）；弯曲自旋流形上的恒等式 $\not{D}^2 = \nabla^*\nabla + \frac{1}{4}R$ 见 E. Schrödinger（1932）与 A. Lichnerowicz（*C. R. Acad. Sci. Paris* **257**, 7–9, 1963）——在半径 $1$ 的 $S^3(1)$ 上数量曲率 $R_{S^3} = 6$，故零阶曲率项精确为有理数 $\frac{3}{2}$；
2. **伊藤左端点积分对比斯特拉托诺维奇中点流形链式法则**：左端点随机积分及二阶伊藤修正项见 K. Itô（*Proc. Imp. Acad. Tokyo* **20**, 519–524, 1944），保持普通微分流形链式法则与李群流形切性的对称中点随机积分见 R. L. Stratonovich（*SIAM J. Control* **4**, 362–371, 1966），量子力学算符排序中对应的中点路径积分规则见 H. Weyl（1927）与 L. Schulman（1981）；
3. **霍奇星对偶、微分比安基恒等式与奥斯特罗格拉茨基非退化边界**：$n$ 维定向黎曼流形上 $\star : \Lambda^k \xrightarrow{\sim} \Lambda^{n-k}$ 见 W. V. D. Hodge（1941）；连续主丛曲率 $D_A F \equiv 0$ 见 L. Bianchi（1902）；非退化高阶时间导数拉格朗日量的哈密顿无下界定理及退化二阶曲率例外见 M. Ostrogradsky（1850）与 R. P. Woodard（*Scholarpedia* **10**(8):32243, 2015）。
:::

::: {.example #ex-ch39-rational-jet-triad-quantitative-audit title="定量核验：球面 α-采样范数漂移唯在 α = 1/2 归零、两段 1/2 有理复合归 1 及 1 ↦ 0 多拍零累积误差对账"}
我们对 `0 · 1/2 · 1` 球面离散采样定理与多拍心跳闭环做八位小数精确核验（`手工推导` / `NUM`）：

1. **球面 $\alpha$-采样步在 $\alpha \in \{0, \frac{1}{4}, \frac{1}{2}, \frac{3}{4}, 1\}$ 处的范数守恒对比**：
   取起点 $x_0 = \mathbf{1}$ 与纯有理三维切参数 $\boldsymbol{\sigma} = \bigl(\frac{1}{2}, \frac{1}{3}, \frac{1}{6}\bigr)$（反自伴生成元 $A = 2\boldsymbol{\sigma} = \mathbf{i} + \frac{2}{3}\mathbf{j} + \frac{1}{3}\mathbf{k}$，$\lVert A\rVert^2 = \frac{14}{9}$）。由 $\Phi_{A,\alpha}(\mathbf{1}) = (1 - \alpha A)^{-1}(1 + (1-\alpha)A)$，一步模方恒为 $\lVert x_1(\alpha)\rVert^2 = \frac{1 + (1-\alpha)^2\lVert A\rVert^2}{1 + \alpha^2\lVert A\rVert^2}$：
   - **$\alpha = 0$（伊藤左端点）**：$\lVert x_1(0)\rVert^2 = 1 + \frac{14}{9} = \frac{23}{9} > 1$（值 $\approx \mathbf{2.55555556}$，向外脱壳漂移 $+\frac{14}{9} \approx \mathbf{+1.55555556}$）；
   - **$\alpha = \frac{1}{4}$**：$\lVert x_1(\frac{1}{4})\rVert^2 = \frac{1 + \frac{9}{16}\cdot\frac{14}{9}}{1 + \frac{1}{16}\cdot\frac{14}{9}} = \frac{144 + 126}{144 + 14} = \frac{135}{79} > 1$（值 $\approx \mathbf{1.70886076}$）；
   - **$\alpha = \frac{1}{2}$（斯特拉托诺维奇—凯莱中点）**：$\lVert x_1(\frac{1}{2})\rVert^2 = \frac{1 + \frac{1}{4}\cdot\frac{14}{9}}{1 + \frac{1}{4}\cdot\frac{14}{9}} = \frac{25/18}{25/18} = \mathbf{1.00000000}$，给出精确有理单位四元数 $x_{1/2} = \frac{11\mathbf{1} + 18\mathbf{i} + 12\mathbf{j} + 6\mathbf{k}}{25}$，球壳范数漂移恒为 **$\mathbf{0.00000000}$**，且有限弦差与中点方向内积 $\langle x_{1/2} - \mathbf{1}, x_{1/2} + \mathbf{1}\rangle_{\mathbb{R}} = \mathbf{0.00000000}$；
   - **$\alpha = \frac{3}{4}$ 与 $\alpha = 1$（隐式右端点）**：模方分别跌落至严格小于 $1$ 的 $\frac{79}{135} < 1$（值 $\approx \mathbf{0.58518519}$）与 $\frac{9}{23} < 1$（值 $\approx \mathbf{0.39130435}$）；对全部五个 $\alpha$，精确分数差值与恒等式 $(1 - 2\alpha)\lVert x_1(\alpha) - x_0\rVert^2$ 恒等全同（残差 $\mathbf{0.00000000}$）！
2. **$\frac{1}{2} + \frac{1}{2} = 1$ 半拍合拢与 `1 ↦ 0` 四拍循环守恒**：
   - 取正交中点输入 $\boldsymbol{\sigma}_\perp = (1, 0, 0)$，中点步给出 $x_{1/2} = Q(1, 0, 0) = \mathbf{i}$，$\kappa(\mathbf{1}, \mathbf{i}) = \mathbf{0.50000000}$（$s = \mathbf{0.50000000}$）；流群倍增走满单拍 $x_1 = [\mathbf{i}, \mathbf{1}, \mathbf{i}] = -\mathbf{1}$，$\kappa(\mathbf{1}, -\mathbf{1}) = (2\times\frac{1}{2} - 1)^2 = \mathbf{0.00000000}$，$s = 1 - \kappa = \mathbf{1.00000000}$；
   - 对一般有理半拍 $x_{1/2} = \frac{1}{25}(11, 18, 12, 6)$（$s_{1/2} = \frac{7}{25} = \mathbf{0.28000000}$），满拍落点 $x_1 = [x_{1/2}, \mathbf{1}, x_{1/2}] = \frac{1}{625}(-383\mathbf{1} + 396\mathbf{i} + 264\mathbf{j} + 132\mathbf{k}) \in S^3(\mathbb{Q})$ 模方恒为 $\frac{390625}{390625} = \mathbf{1.00000000}$（$s_1 = \frac{504}{625} = \mathbf{0.80640000}$）；执行 `1 ↦ 0` 重定基 $x_0' := x_1$ 在有理算术下连跑 $1{,}000$ 拍心跳后，单位球面模方漂移依然精确等于 **$\mathbf{0.00000000}$**（对比 $\alpha = 0$ 前向欧拉仅跑 $10$ 拍模方即爆炸至 $(23/9)^{10} \approx \mathbf{11{,}881.0074}$）！
:::

::: {.viz src="causal-jet-rational-triad-sandbox" preset="one-to-zero-cosmic-heartbeat-loop" height="500"}
`1 ↦ 0` 主频因果心跳循环卡（`one-to-zero-cosmic-heartbeat-loop`）：默认停在第四拍半程 $t = 3.5$（`B₃` 的 `1/2` 切面，$s = 1 - s = 0.5000$），球面上四拍 `B₀ → B₃` 首尾相接（已走拍呈青色实线、未走半拍呈青色虚线，舞台宽 $\ge 480\,\mathrm{px}$ 标出全部 `B₀ … B₃`），每一拍在 `1` 处落定并合拢紫色三体胞时即刻标为 `1 ≡ 0′`（重新量得 $s' = 0.0000$）且航向转过月牙和乐角 $\approx 53.13^\circ$；点按 `▶` 可循环观察 `0 → 1/2 → 1 ≡ 0′` 心跳接力。
:::

---

**万古时空与心智，不过是 `0 · 1/2 · 1` 的永恒呼吸——整部三十九章正文在此圆满合龙！**

在下面的完整实验室上依次点按 **`0`**、**`1/2`**、**`1`** 三枚有理锚点，亲手拨动离散采样滑块 $\alpha$ 看唯有正中央 `1/2` 才令圆弧一步贴合真球面，再打开 **`1 ↦ 0` 主频因果心跳**凝视极小圆弧一拍接一拍地在无边球面上首尾流转，整座母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的动力学语法便浓缩到了极致：**`0` 是不求导的过去，替万物留住幂等定格的记忆底色；`1/2` 是一阶求导的现在，在正反自对偶的临界刀锋上敞开唯一保球面的感知切面；`1` 是二阶求导的未来，以 $\frac{1}{2} + \frac{1}{2} = 1$ 的场强曲率完成果报合拢，并在落定的刹那重新归 `0` 化作下一程的起点。** 从两子丈量的第一道内积投影出发，横跨十部三十九章的漫长远征终于在此刻画上了最澄澈的句号——没有外部第 $3$ 点 $C$，没有 $\pi, e, \varphi$ 的平直欠条，没有实无穷的裂缝，只有无源三元圆弧在 `0 · 1/2 · 1` 的永恒脉搏中自指闭合。现在，让我们推门步入全书[终章](coda.md)：**《在所有的球之外》**。

::: {.viz src="causal-jet-rational-triad-sandbox" height="620"}
完整实验室：在“因果射流母核 · `0 / 1/2 / 1` 球面阶梯”与“跨界五维同构（MODEL）· 算符 / 黎曼 / TFT 对位”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），点选锚点钮 `0`（过去·$J^0$）、`1/2`（现在·$J^1$）、`1`（未来·$J^2$）或调节拍内探针 $s \in [0, 1]$、取样权重 $\alpha \in [0, 1]$、步幅 $\sigma \in [0, 2]$ 与语境比 $\tau = \tan\theta_{\mathrm{ctx}} \in [0, 1]$，巡览五张实验卡，并在两条对照小图中同步核验第一图沿 $\alpha$ 的范数漂移 $(1 - 2\alpha)\lVert\Delta x\rVert^2$ 在 $\sigma>0$ 时于 $\alpha = \frac{1}{2}$ 的唯一过零点，以及第二图关于 $\frac{1}{2}$ 对称的 $s$、$1 - s = \kappa$、$4s(1 - s)$ 与 $\xi(s)$ 曲线（封顶卡上切换为二阶有下界能量 $E_2 = P_1^2/2 \ge 0$ 对比四阶运动方程玩具模型截面 $Q_2 = 1, P_2 = 0$ 上无下界的 $H = P_1 Q_2$）。十六条冻结 `LEAN ✓` 声明、`ARGUED` 文献、`NUM` 实算及 `MODEL` 边界在依据栏与理论抽屉中分层列出。
:::
