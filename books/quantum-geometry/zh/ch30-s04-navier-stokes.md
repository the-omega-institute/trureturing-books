# 30.4 纳维—斯托克斯（Navier–Stokes）与 $P$ vs. $NP$ 的场化类比——兰姆双向量、三维涡管拉伸与阿诺德测地线 {#sec-coda-navier-stokes-and-p-vs-np}

> **作者原话**：“navier stokes与P/NP 问题, 都场化的话似乎很像”

把**纳维—斯托克斯（Navier–Stokes, NS）存在性与光滑性问题**和 **$P$ vs. $NP$ 问题**并置，可以比较全局状态、局部读数与二次反馈的不同角色（`MODEL`）。这里没有给出连接流体解与布尔实例的映射，也没有证明它保留演化、可解性或计算成本，因而不构成数学同构。涡管细长的形状与见证检查的线形图像并不把两个问题化为同一个问题；流体爆破与投影不闭合均不推出 $P\neq NP$。

## 30.4.1 内积势流与外积涡面的克利福德分离（`MODEL`） {#1-内积势流与外积涡面的克利福德分离model}

::: {.remark #rem-ch30-lamb-decomposition-literature title="不可压缩纳维—斯托克斯方程与兰姆对流分解的文献说明"}
**文献结果，未在本书形式化。** 经典连续介质流体力学中的不可压缩纳维—斯托克斯偏微分方程组及其兰姆（H. Lamb）矢量—双向量对流分解均属外部数学物理文献，未在本书锁定的连续偏微分方程层面形式化（本书锁定的离散五模态傅里叶平流闭合阻碍与二维傅里叶温和路径定理见下文 [@thm-coda-quadratic-advection-no-closure]）：不可压缩纳维—斯托克斯方程写作

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u} = -\nabla p + \nu \nabla^2 \mathbf{u}, \qquad \nabla\cdot\mathbf{u} = 0.
$$

用克利福德几何积导数 $\nabla \mathbf{u} = \nabla\cdot\mathbf{u} + \nabla\wedge\mathbf{u}$ 将非线性对流项 $(\mathbf{u}\cdot\nabla)\mathbf{u}$ 拆解为“内积势线梯度”与“外积双向量涡面”（对应经典兰姆分解，另参 [@rem-ch30-navier-stokes-forced-literature]）：

$$
(\mathbf{u}\cdot\nabla)\mathbf{u} = \underbrace{\frac{1}{2}\nabla(\|\mathbf{u}\|^2)}_{\substack{\text{无旋势能梯度} \\ \text{直接并入伯努利总压 } -\nabla(p + \frac{1}{2}\|\mathbf{u}\|^2) \text{ 约掉}}} + \underbrace{\mathbf{u}\cdot(\nabla\wedge\mathbf{u})}_{\substack{\text{双向量涡力耦合项 }(\boldsymbol{\omega}\times\mathbf{u}) \\ \text{一维流线与二维正交涡面积的耦合}}}.
$$

在经典连续介质流体力学中，由此可区分两类区域：当正交外积旋度为零（$\nabla\wedge\mathbf{u} = 0$，无旋势流）时，对流非线性退化为纯标量势梯度并直接并入伯努利总压抵消，单连通域上无散无旋流场归约为线性拉普拉斯势场 $\mathbf{u} = -\nabla\Phi$；当正交外积旋度非零（$\nabla\wedge\mathbf{u} \neq 0$，有旋涡流）时，由于标量势梯度的外微分恒为零，标量压强梯度无法抵消外积旋度 $\nabla\wedge\mathbf{u}$，流线与正交涡面发生非线性耦合。
:::

将 [@rem-ch30-lamb-decomposition-literature] 所载的无旋势流相与有旋涡流相映射回上一节“$P$ 是无旋导向场，$NP$ 是旋涡荒原中的细线”的几何类比模型（`MODEL`），无旋相在概念上对应光滑全局导向场（类比流体中的 $P$ 态），而有旋相则对应多尺度旋涡缠绕。

::: {.viz src="navier-stokes-p-np" preset="vortex" height="500"}
**对流项的两半。** 平面流 $\mathbf{u} = (1 - s)(x, -y) + s(-y, x)$ 在 $s = 0.8$ 时的流线，涡度 $\omega = 2s = 1.6$。琥珀色探针处，白色箭头是对流项 $(\mathbf{u}\cdot\nabla)\mathbf{u}$，它是青色的梯度那一半 $\nabla(\|\mathbf{u}\|^2/2)$ 与品红的兰姆那一半 $\boldsymbol{\omega}\times\mathbf{u}$ 之和；把 $s$ 调回 $0$（无旋的驻点流），品红箭头消失，白色箭头与青色箭头重合：整个对流项是一个梯度，并入压强。探针可以拖动。
:::

## 30.4.2 为什么两道难题都在“第 2 维 $\to$ 第 3 维”发生相变？（几何类比 `MODEL` 与开放猜想边界） {#2-为什么两道难题都在第-2-维--第-3-维发生相变几何类比-model-与开放猜想边界}

::: {.remark #rem-ch30-vorticity-transport-literature title="涡量输运方程、涡管拉伸项与细涡管环量标度的文献说明"}
**文献结果，未在本书形式化。** 对 [@rem-ch30-lamb-decomposition-literature] 中的动量方程取外积旋度，得到经典流体力学中涡量 $\boldsymbol{\omega} = \star(\nabla\wedge\mathbf{u})$ 的输运方程：

$$
\frac{\partial \boldsymbol{\omega}}{\partial t} + (\mathbf{u}\cdot\nabla)\boldsymbol{\omega} = \underbrace{(\boldsymbol{\omega}\cdot\nabla)\mathbf{u}}_{\text{涡管拉伸项}} + \nu \nabla^2 \boldsymbol{\omega}.
$$

在二维平面流 $\mathbf{u}(x_1, x_2, t) = (u_1, u_2, 0)$ 中，$\boldsymbol{\omega} = \omega\mathbf{e}_3$ 严格垂直于速度平面（$\partial_{x_3}\mathbf{u} = \mathbf{0}$），涡管拉伸项 $(\boldsymbol{\omega}\cdot\nabla)\mathbf{u} \equiv \mathbf{0}$ 恒等为零；而在三维空间中 $(\boldsymbol{\omega}\cdot\nabla)\mathbf{u}$ 一般非零。结合开尔文环量近似 $\Gamma \approx A\|\boldsymbol{\omega}\|$，经典细涡管**条件性坍缩情景**指出：若轴向拉伸局部持续压倒粘性扩散 $\nu\nabla^2\boldsymbol{\omega}$ 并使横截面积 $A \to 0$，则局部涡量幅值满足

$$
\text{轴向拉伸压倒粘性耗散且 } A \to 0 \implies \|\boldsymbol{\omega}\| \approx \frac{\Gamma}{A} \to \infty.
$$
:::

::: {.viz src="navier-stokes-p-np" preset="strain" height="500"}
**三维：越拉越细。** 沿轴以恒定拉伸率拉这根涡管，不计粘性：它越来越长、越来越细，青色回路的环量 $\Gamma = \omega A$ 不变，所以品红的涡度按 $\Gamma/A$ 一路变大，即上式的 $\|\boldsymbol{\omega}\| \approx \Gamma/A$（示意模型，`MODEL`）。
:::

对比 [@rem-ch30-vorticity-transport-literature] 与计算复杂性中的维度分水岭，结构相变同时出现在 **$2 \to 3$**（以下为跨领域结构类比 `MODEL`，而非复杂性理论中的形式逻辑等价）：

- **二维平面情形（[@rem-ch30-vorticity-transport-literature]）$\leftrightarrow$ 类比二元链 2-SAT（`MODEL`）**：
  将 [@rem-ch30-vorticity-transport-literature] 所载的二维平面流情形与二元链 2-SAT 并置对照（`MODEL`），在本书锁定的 `trureturing@dev` 库中，冻结定理 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path) 给出了二维周期傅里叶空间上的一项**条件性高阶正则性提升定理**：若已给定一条在 $[0, \tau]$ 上连续的加权 $H^2$ 零均值实无散温和解路径，且其初值在全部空间 Sobolev 阶数 $m \in \mathbb{N}$ 上可和，则该路径在每一空间阶数 $m$ 上皆满足强微分方程（无条件二维全局正则性经典定理另见 [@rem-ch30-navier-stokes-forced-literature]）。

::: {.viz src="navier-stokes-p-np" preset="flat" height="500"}
**二维：涡管不被拉伸。** 涡度垂直于流动的平面，没有东西去拉它：涡管不变细，粘性只让它慢慢变粗（截面 $A$ 从端面上虚线圈的 $1$ 涨到约 $2$），青色回路的环量 $\Gamma = \omega A$ 不变，品红的涡度只降不升（示意模型，`MODEL`）。
:::

- **三维细涡管条件坍缩情景（[@rem-ch30-vorticity-transport-literature]）$\leftrightarrow$ 类比三元面片 3-SAT（`MODEL`）**：
  将 [@rem-ch30-vorticity-transport-literature] 所载的三维条件性细涡管情景与三元面片 3-SAT 并置对照，在几何类比模型（`MODEL`）上，该条件坍缩图景好比把一张平滑三维“场（类比 $P$）”挤压向“一维细丝（类比 $NP$ 见证丝）”！

**二维这一侧能算到底的一个样本：把旋度压到有限个点上。** 二维平面流里涡管拉伸项恒为零（[@rem-ch30-vorticity-transport-literature]），一根垂直于平面的直涡丝在平面上只是一个被搬运的点。把这幅图像推到最干净的极端：平面流处处无旋，只在 $N$ 个点上各有这样一根涡丝穿过。在这幅经典图像里（[@rem-ch30-point-vortex-literature]），场没有独立的自由度，全部动力学就是这 $N$ 个穿孔点的运动，即 $\mathbb{R}^{2N}$ 上的一个常微分方程组。所钉的 `trureturing@dev` 库冻结了这类方程的一个版本（每个涡旋另带一项绕原点的进动）的完整线性理论：$2m$ 个涡旋正负相间排成正多边形，它在哪个半径上静止，静止点处的线性化有哪些本征值、各有几重、沿多少个方向发散。

::: {.remark #rem-ch30-point-vortex-literature title="点涡方程与囚禁凝聚体中的进动项（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在二维理想不可压缩流中，涡量随流体搬运（H. von Helmholtz, 1858）；把涡量集中到 $N$ 个点上，第 $k$ 个点带环量 $\Gamma_k$，则每个点以其余各点在该处诱导的速度运动（G. Kirchhoff, 1876）：

$$
\begin{aligned}
\dot{x}_j &= -\frac{1}{2\pi}\sum_{k \neq j}\Gamma_k\,\frac{y_j - y_k}{d_{jk}},\\
\dot{y}_j &= \frac{1}{2\pi}\sum_{k \neq j}\Gamma_k\,\frac{x_j - x_k}{d_{jk}},\\
d_{jk} &= (x_j - x_k)^2 + (y_j - y_k)^2 .
\end{aligned}
$$

囚禁玻色—爱因斯坦凝聚体中少数几个量子化涡旋的粒子模型，在此之外给每个涡旋加上一项绕阱心的进动，转向由涡旋自身的符号决定。[@def-ch30-alternating-vortex-polygon] 的方程与交错多边形构型取自 A. M. Barry 与 P. G. Kevrekidis 的论文 *Few-particle vortex cluster equilibria in Bose–Einstein condensates: existence and stability*（arXiv:1306.1545，2013）。下文冻结的是这组常微分方程本身的性质；它与 Gross–Pitaevskii 方程或纳维—斯托克斯方程的解之间的关系，不在本书的形式化范围内。
:::

::: {.definition #def-ch30-alternating-vortex-polygon title="带进动项的点涡场、无碰撞构型、交错正多边形与归一化雅可比矩阵" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.CollisionFree D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.charge D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.polygon D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.rotate D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.regular D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.radius D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.jacobian"}
设 $N \in \mathbb{N}$，$b, \Omega \in \mathbb{R}$。

1. **构型**是 $z = (x_1, \dots, x_N;\, y_1, \dots, y_N) \in \mathbb{R}^{2N}$，其中 $(x_j, y_j)$ 是第 $j$ 个涡旋的位置（Lean 中为 `Fin N ⊕ Fin N → ℝ`，下标从 $0$ 起，对应这里的 $j - 1$）。第 $j$ 个涡旋的**符号**是 $s_j = (-1)^{j+1}$。
2. 记 $d_{jk} = (x_j - x_k)^2 + (y_j - y_k)^2$。构型**无碰撞**，指对一切 $j \neq k$ 有 $d_{jk} \neq 0$。
3. **场** $F_{b,\Omega} : \mathbb{R}^{2N} \to \mathbb{R}^{2N}$ 在坐标 $x_j$ 与 $y_j$ 上的分量分别是

   $$
   \begin{aligned}
   F_{b,\Omega}(z)_{x_j} &= -s_j\,\Omega\,y_j - \frac{b}{2}\sum_{k \neq j} s_k\,\frac{y_j - y_k}{d_{jk}},\\
   F_{b,\Omega}(z)_{y_j} &= s_j\,\Omega\,x_j + \frac{b}{2}\sum_{k \neq j} s_k\,\frac{x_j - x_k}{d_{jk}} .
   \end{aligned}
   $$

   Lean 的除法是全函数（除以零得零），所以 $F_{b,\Omega}$ 对一切 $z$ 有定义；运动方程 $\dot{z} = F_{b,\Omega}(z)$ 只在无碰撞构型上有意义，下文的结论都在无碰撞构型处陈述。
4. **单位正多边形** $P_N$ 的顶点是 $x_j = \cos(2\pi j/N)$，$y_j = \sin(2\pi j/N)$。对 $\rho, \theta \in \mathbb{R}$，$P_N(\rho, \theta)$ 表示把 $P_N$ 的每个顶点绕原点转过角 $\theta$、再乘以 $\rho$ 所得的构型。**平衡半径**是 $R_{b,\Omega} = \sqrt{b/(4\Omega)}$（下文只在 $b > 0$、$\Omega > 0$ 时用到它）。
5. **归一化雅可比矩阵** $J_N$ 是 $F_{2,1/2}$ 在 $P_N$ 处的偏导数矩阵：$(J_N)_{pq}$ 是函数 $t \mapsto F_{2,1/2}(P_N + t\,e_q)_p$ 在 $t = 0$ 处的导数，$e_q$ 是第 $q$ 个坐标方向的单位向量（Lean 把 $b = 2$、$\Omega = \tfrac12$ 的场单独写出，[`normalized_field`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.normalized_field) 证明它等于 $F_{2,1/2}$）。
:::

两项各管一件事。求和项是其余涡旋吹过来的速度：第 $k$ 个涡旋在距离 $r$ 处诱导的速度大小为 $\frac{b}{2r}$，方向垂直于连线，转向由 $s_k$ 决定；对照 [@rem-ch30-point-vortex-literature]，这相当于取 $\Gamma_k = \pi b\,s_k$。第一项让每个涡旋自己绕原点转，角速度为 $s_j\Omega$：$\Omega > 0$ 时正涡旋逆时针，负涡旋顺时针。把偶数个涡旋正负相间摆在半径 $\rho$ 的圆上，两项在切向上对着干。手工推导（用到下面证明里的切向读数恒等式）：其余涡旋给第 $j$ 个涡旋的切向速度是 $-s_j\,\frac{b}{4\rho}$，进动给它的切向速度是 $s_j\,\Omega\rho$，两者相消当且仅当 $\rho^2 = \frac{b}{4\Omega}$。圆太小，邻居的推动占上风；圆太大，进动占上风；只有一个半径能让整圈停住。

::: {.figure src="ch30-vortex-radius"}
**只有一个半径能让整圈停住。** 横轴是正负相间的涡旋所在圆的半径 $\rho$。紫色的直线是进动给每个涡旋的切向速度大小 $\Omega\rho$，青色的曲线是其余涡旋吹来的切向速度大小 $\frac{b}{4\rho}$，两者方向相反，只在 $\rho = R_{b,\Omega} = \sqrt{b/(4\Omega)}$ 处相等（图中取 $b = 2$、$\Omega = \tfrac12$，$R = 1$）。交点左边邻居占上风，右边进动占上风；静止条件见 [@lem-ch30-vortex-polygon-equilibrium]。
:::

::: {.lemma #lem-ch30-vortex-polygon-equilibrium title="居中正多边形的静止条件与平衡点处的弗雷歇导数" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.regular_equilibrium_iff_radius D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.scaled_equilibrium D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalDerivative.physical_derivative"}
设 $b > 0$，$\Omega > 0$。

1. 对 $N \ge 3$、$\rho > 0$ 与任意 $\theta \in \mathbb{R}$：

   $$
   F_{b,\Omega}\bigl(P_N(\rho, \theta)\bigr) = 0 \iff N \text{ 为偶数且 } \rho = R_{b,\Omega} .
   $$

2. 对一切 $m \ge 1$，构型 $R_{b,\Omega}\,P_{2m}$ 无碰撞，且 $F_{b,\Omega}(R_{b,\Omega}\,P_{2m}) = 0$。
3. 对一切 $N \in \mathbb{N}$，$F_{b,\Omega}$ 在 $R_{b,\Omega}\,P_N$ 处弗雷歇可微，其导数是矩阵 $2\Omega\,J_N$ 所表示的线性映射。
:::

::: proof
第 1 条的“仅当”来自一个切向读数（[`angular_readout`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.angular_readout)）：若无碰撞构型 $z$ 的各涡旋到原点的距离同为 $\rho$，则对每个 $j$

$$
x_j\,F_{b,\Omega}(z)_{y_j} - y_j\,F_{b,\Omega}(z)_{x_j} = s_j\,\Omega\,\rho^2 + \frac{b}{4}\Bigl(\sum_{k} s_k - s_j\Bigr),
$$

因为等距时 $x_j(x_j - x_k) + y_j(y_j - y_k) = d_{jk}/2$，每个相互作用项恰好贡献 $\frac{b}{4}s_k$。$N$ 为奇数时 $\sum_k s_k = 1$，取 $j = 1$ 得右端为 $\Omega\rho^2 \neq 0$；$N$ 为偶数时 $\sum_k s_k = 0$，右端为 $s_j(\Omega\rho^2 - b/4)$。“当”的方向先用缩放恒等式 $F_{b,\Omega}(R\,w) = 2\Omega R\,F_{2,1/2}(w)$（其中 $R \neq 0$、$b = 4\Omega R^2$、$w$ 无碰撞，[`field_scaling`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field_scaling)）和场对公共转动的协变性把问题化到 $P_{2m}$；在 $P_{2m}$ 上，把第 $k$ 个涡旋与它关于过第 $j$ 个顶点的直径的镜像配成一对，两者符号相同，一对合起来贡献的是 $s_k$ 乘以第 $j$ 个涡旋自身的坐标，求和后恰好抵消进动项（[`equilibrium_all`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.equilibrium_all)，对一切 $m \ge 1$）。第 3 条：$F_{b,\Omega}$ 在无碰撞点处是分母不为零的有理式，因而可微，偏导数矩阵就是弗雷歇导数的矩阵；对缩放恒等式沿坐标方向求导，外层因子 $2\Omega R$ 与内层因子 $1/R$ 相乘，得到 $2\Omega\,J_N$（[`jacobian_scaling`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.jacobian_scaling)）。完整证明由 Lean 内核检查。
:::

第 3 条说明后面的“谱”指什么：它是场 $F_{b,\Omega}$ 本身在平衡点处的弗雷歇导数的谱，不是某个事先约化好的矩阵的谱。它也分清了两个参数的角色：$b$ 只出现在半径 $R_{b,\Omega}$ 里，不进入导数；$\Omega$ 除了影响半径，只给导数乘上因子 $2\Omega$，相当于换一个时间单位。于是只需研究一个不含参数的 $4m \times 4m$ 实矩阵 $J_{2m}$。

::: {.theorem #thm-ch30-vortex-polygon-spectrum title="交错涡旋多边形的完整特征多项式与 $2(m-2)$ 维的稳定、不稳定空间" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonModes.charpoly_factored D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physicalRealOperator_eq D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_positive_eigenvalue_iff D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_negative_eigenvalue_iff D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_unstable_exhaustive D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_stable_exhaustive D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_real_dimensions"}
设 $m \ge 3$。

1. $J_{2m}$ 的特征多项式 $\chi_{2m}(X) = \det(X\,I - J_{2m})$ 为

   $$
   \begin{aligned}
   \chi_{2m}(X) &= X^2\,\Bigl(X^2 + \frac{m^2}{2}\Bigr)\Bigl(X^2 + \frac{(m-1)^2}{4}\Bigr)^{2}\\
   &\quad\times \prod_{r=2}^{m-1}\Bigl(X^2 - \frac{(m-r)^2\,(r^2-2)}{4}\Bigr)^{2} .
   \end{aligned}
   $$

2. 设 $b > 0$，$\Omega > 0$，$A_{b,\Omega}$ 是 $\mathbb{R}^{4m}$ 上以 $F_{b,\Omega}$ 在 $R_{b,\Omega}\,P_{2m}$ 处的偏导数矩阵为矩阵的线性算子（[`physicalRealOperator`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physicalRealOperator)）。则 $A_{b,\Omega} = 2\Omega\,J_{2m}$。记

   $$
   \lambda_r = \Omega\,(m - r)\sqrt{r^2 - 2}, \qquad r = 2, \dots, m-1 .
   $$

   对每个实数 $\mu > 0$：$\mu$ 是 $A_{b,\Omega}$ 的本征值，当且仅当存在 $r \in \{2, \dots, m-1\}$ 使 $\mu = \lambda_r$。对每个实数 $\mu < 0$：$\mu$ 是 $A_{b,\Omega}$ 的本征值，当且仅当存在 $r \in \{2, \dots, m-1\}$ 使 $\mu = -\lambda_r$。
3. 在第 2 条的假设下，记 $E^{u}$ 为 $A_{b,\Omega}$ 的全部正实本征值的本征空间之和，$E^{s}$ 为全部负实本征值的本征空间之和。则

   $$
   \dim_{\mathbb{R}} E^{u} = \dim_{\mathbb{R}} E^{s} = 2(m - 2) .
   $$
:::

::: proof
把每个涡旋的位移分解成径向分量与切向分量，这是一个正交的坐标变换。在这组坐标下 $J_{2m}$ 变成反对角分块 $\begin{pmatrix} 0 & B \\ C & 0 \end{pmatrix}$，其中 $B = (\delta\,I - W)\,S$，$C = ((\delta + 1)\,I - W)\,S$；$W$ 的非对角元是 $P_{2m}$ 上弦长平方的倒数 $1/d_{jk}$，对角元为零，$S = \operatorname{diag}(s_j)$，$\delta = \frac{(2m)^2 - 1}{12} - \frac{m^2}{2}$（[`rotated_jacobian_all`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.rotated_jacobian_all)）。对 $x \neq 0$，舒尔补给出 $\chi_{2m}(x) = \det(x^2 I - CB)$。$W$ 是循环矩阵，离散傅里叶变换把它对角化，第 $k$ 个本征值是 $\frac{(2m)^2 - 1}{12} - \frac{k(2m - k)}{2}$（[`chordWeight_dft`](lean:D5/S3/FluidDynamics/Vortices/InverseChordCirculant.chordWeight_dft)）；交错符号 $S$ 把频率 $k$ 平移 $m$。于是 $\det(y\,I - CB) = \prod_{k=0}^{2m-1}(y - \gamma_k)$，其中 $\gamma_k = (m - r)^2(r^2 - 2)/4$，$r = \min(k, 2m - k)$。两个多项式在无穷多个点上取值相同，因而相等，故 $\chi_{2m}(X) = \prod_k (X^2 - \gamma_k)$（[`charpoly_mode_product`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.charpoly_mode_product)）。$r = 0$ 与 $r = m$ 各由一个 $k$ 给出，其余的 $r$ 各由两个 $k$ 给出，这就是第 1 条中的指数。$\gamma_k > 0$ 只发生在 $2 \le r \le m - 1$，而且不同的 $r$ 给出不同的值：对整数 $2 \le k < l < m$ 有 $(m-k)^2(k^2-2) \neq (m-l)^2(l^2-2)$（[`distinctness_certificate`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.distinctness_certificate)）。每个这样的实根在 $\mathbb{R}^{4m}$ 中有 $2$ 维的本征空间（[`real_geometric_multiplicity`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonRealSpaces.real_geometric_multiplicity)），不同本征值的本征空间线性无关，$m - 2$ 个 $2$ 维空间相加得到第 3 条。换到一般的 $b$、$\Omega$ 只是乘以 $2\Omega$：本征空间不变，本征值各乘 $2\Omega$。完整证明由 Lean 内核检查。
:::

四个因子是四类运动。$X^2$ 是零本征值，下面单独处理。两个带加号的因子给出纯虚根 $\pm i\,m/\sqrt{2}$ 与 $\pm i\,(m-1)/2$：围绕平衡位置的振荡，不增不减。带减号的因子给出实根对：正的一支发散，负的一支收缩。库里另有一条冻结定理（[`off_axis_is_real`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonRealBoundary.off_axis_is_real)）：$J_{2m}$ 的复本征值只要实部非零就是实数，所以 $E^{u}$ 与 $E^{s}$ 已经收尽全部增长与衰减的本征方向。六边形（$m = 3$）是第一个出现发散方向的多边形，此后每添两个涡旋，发散方向多两个。

::: {.viz src="vortex-polygon" preset="hexagon" height="500"}
**六边形：沿发散方向推一下，偏离按 $e^{\lambda t}$ 长大。** 六个涡旋正负相间（青色 $+$、品红 $-$）停在半径 $R = 1$ 的圆上（$b = 2$，$\Omega = \tfrac12$）；沿本征值 $\lambda = 1/\sqrt{2}$ 的一个本征方向推 $10^{-9}$，琥珀色的箭头是放大后的位移，到 $t = 10$ 长到初始的约 $1177$ 倍，与 $e^{10/\sqrt{2}}$ 一致（[@thm-ch30-vortex-polygon-spectrum]）。舞台上的运动是非线性方程的数值积分，不是冻结声明。
:::

::: {.proposition #prop-ch30-vortex-polygon-neutral-drift title="非零本征值半单、零本征值的二阶若尔当块与无界的线性漂移；偶极与正方形" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonDecomposition.geometric_eq_algebraic D5/S3/FluidDynamics/Vortices/AlternatingPolygonNeutral.neutral_generalized_finrank D5/S3/FluidDynamics/Vortices/AlternatingPolygonNeutral.neutral_geometric_finrank D5/S3/FluidDynamics/Vortices/AlternatingPolygonCartesianChain.cartesian_chain D5/S3/FluidDynamics/Vortices/AlternatingPolygonCartesianChain.unbounded_linear_drift D5/S3/FluidDynamics/Vortices/AlternatingPolygonSmallCases.dipole D5/S3/FluidDynamics/Vortices/AlternatingPolygonSmallCases.square"}
设 $m \ge 1$。第 1、2、4 条把 $J_{2m}$ 看作 $\mathbb{C}^{4m}$ 上的线性算子。

1. 对每个非零复数 $\mu$，$\mu$ 的本征空间的复维数等于 $\mu$ 作为 $J_{2m}$ 的特征多项式之根的重数。
2. 本征值 $0$ 的广义本征空间是 $2$ 维的，本征空间是 $1$ 维的。
3. 设 $(x_j, y_j)$ 为 $P_{2m}$ 的顶点，$\delta_m = 1 - m^2/2$，并取 $\mathbb{R}^{4m}$ 中的向量

   $$
   \begin{aligned}
   c_0 &= (-y_1, \dots, -y_{2m};\; x_1, \dots, x_{2m}),\\
   c_1 &= \frac{1}{\delta_m}\,(s_1 x_1, \dots, s_{2m} x_{2m};\; s_1 y_1, \dots, s_{2m} y_{2m}) .
   \end{aligned}
   $$

   则 $J_{2m}\,c_0 = 0$，$J_{2m}\,c_1 = c_0$；曲线 $v(t) = c_1 + t\,c_0$ 对一切 $t \in \mathbb{R}$ 满足 $v'(t) = J_{2m}\,v(t)$，且集合 $\{v(t) : t \in \mathbb{R}\}$ 无界。
4. $J_2$ 的特征多项式是 $X^2\bigl(X^2 + \tfrac12\bigr)$，其复本征值恰为 $0$ 与 $\pm i/\sqrt{2}$；$J_4$ 的特征多项式是 $X^2\bigl(X^2 + 2\bigr)\bigl(X^2 + \tfrac14\bigr)^2$，其复本征值恰为 $0$、$\pm i\sqrt{2}$ 与 $\pm i/2$。
:::

::: proof
在径向与切向坐标上再作离散傅里叶变换，$\mathbb{C}^{4m}$ 分成 $2m$ 个二维不变块。第 $q$ 块上算子的矩阵是 $\begin{pmatrix} 0 & \ell_q \\ \ell_{q+m} + 1 & 0 \end{pmatrix}$，其中 $\ell_q = -(m - q)^2/2$，下标模 $2m$ 取在 $\{0, \dots, 2m-1\}$ 中（[`actual_normal_form`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonJordan.actual_normal_form)）；两个非对角元之积就是上一个证明里的 $\gamma_q$。对非零的 $\mu$，在每个二维块上直接计算可知 $(T - \mu)^2 v = 0$ 推出 $(T - \mu)v = 0$（$T$ 记这个算子）：非零本征值没有若尔当链，广义本征空间等于本征空间，而广义本征空间的维数就是根的重数，由此得第 1 条。$T^2$ 在第 $q$ 块上是数乘 $\gamma_q$，所以本征值 $0$ 的广义本征空间恰是 $\gamma_q = 0$ 的那些块之和；这只发生在 $q = m$。那里 $\ell_m = 0$，另一个非对角元是 $\ell_0 + 1 = \delta_m$，它不为零，因为 $m^2 = 2$ 没有整数解。这一块是幂零的二阶若尔当块，由此得第 2 条。第 3 条在径向与切向坐标里直接验证：$c_0$ 是每个涡旋切向位移 $1$、径向位移 $0$，$c_1$ 是径向位移 $s_j/\delta_m$、切向位移 $0$；用上一个证明的记号，$W$ 的行和 $\sum_k W_{jk} = \frac{(2m)^2 - 1}{12}$ 与交错行和 $\sum_k s_k W_{jk} = s_j\,\delta$ 给出 $B\,\mathbf{1} = 0$ 与 $C\,(s/\delta_m) = \mathbf{1}$（$\mathbf{1}$ 为全一向量，$s/\delta_m$ 的第 $j$ 个分量是 $s_j/\delta_m$），即 $J_{2m}c_0 = 0$ 与 $J_{2m}c_1 = c_0$。于是 $J_{2m}(c_1 + t\,c_0) = c_0 = v'(t)$，无界性来自 $c_0 \neq 0$。第 4 条是把 $m = 1, 2$ 代入对一切 $m \ge 1$ 成立的折叠公式 $\chi_{2m}(X) = X^2\bigl(X^2 + \tfrac{m^2}{2}\bigr)\prod_{r=1}^{m-1}\bigl(X^2 - \tfrac{(m-r)^2(r^2-2)}{4}\bigr)^2$（[`charpoly_folded`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonModes.charpoly_folded)）。完整证明由 Lean 内核检查。
:::

$c_0$ 是整个多边形绕原点的无穷小转动：场对公共转动协变（[@lem-ch30-vortex-polygon-equilibrium] 的证明用过这一点），转过去的多边形仍然静止，所以这个方向落在 $J_{2m}$ 的核里。$c_1$ 让正涡旋沿半径移动 $1/\delta_m$，负涡旋反向移动同样的距离。把两种涡旋的半径这样错开之后，线性化方程的解不是振荡，而是整圈涡旋沿 $c_0$ 方向匀速转走。谱看不见这件事：零与纯虚数都算“不增长”，一个二阶若尔当块却让解随时间线性增大。偶极（$m = 1$）与正方形（$m = 2$）的全部本征值都在虚轴上，它们的线性化方程同样有这样一个无界的解。换回一般的 $b, \Omega > 0$，只需把 $c_1$ 除以 $2\Omega$（[`physical_cartesian_chain`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalDerivative.physical_cartesian_chain)）。

::: {.viz src="vortex-polygon" preset="drift" height="500"}
**正方形：谱全在虚轴上，整圈仍然转走。** 四个涡旋沿若尔当链 $c_1$ 推 $\varepsilon = 0.01$：青色的正涡旋退到半径 $0.99$，品红的负涡旋外移到 $1.01$，灰色的圈是出发的位置；整圈绕原点匀速转动，到 $t = 100$ 琥珀色的角约为 $57^\circ$，即 $1$ 弧度，正是线性化解给出的 $\varepsilon t$（[@prop-ch30-vortex-polygon-neutral-drift]）。转角来自非线性方程的数值积分。
:::

::: {.example #ex-ch30-vortex-octagon-spectrum title="正八边形的十六个本征值：从方程数值求出，再与冻结的重数逐项对照"}
取 $m = 4$、$b = 2$、$\Omega = \tfrac12$，于是 $R_{b,\Omega} = 1$，八个涡旋位于单位圆上，相空间是 $\mathbb{R}^{16}$。下面的数值只用到 [@def-ch30-alternating-vortex-polygon] 中的方程，不用任何闭式：把场逐项键入，用符号求导得到 $P_8$ 处的 $16 \times 16$ 偏导数矩阵（与步长 $10^{-12}$ 的中心差分逐元相差不超过 $3 \times 10^{-24}$），以 $40$ 位十进制精度求本征值；代数重数取数值上重合的本征值个数，几何重数取 $16 - \operatorname{rank}(J_8 - \lambda I)$。场在 $P_8$ 处的最大分量为 $8 \times 10^{-41}$。标号 $r$ 与 [@thm-ch30-vortex-polygon-spectrum] 的证明相同：$r = 0, 1$ 对应两个带加号的因子，$r = m$ 对应 $X^2$。本征值四舍五入到所示位数：

| 标号 $r$ | 冻结声明给出的根 | 数值本征值 | 代数重数 | 几何重数 |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $\pm 2\sqrt{2}\,i$ | $\pm 2.828427\,i$ | $1$ | $1$ |
| $1$ | $\pm \tfrac32\,i$ | $\pm 1.500000\,i$ | $2$ | $2$ |
| $2$ | $\pm\sqrt{2}$ | $\pm 1.414214$ | $2$ | $2$ |
| $3$ | $\pm\tfrac12\sqrt{7}$ | $\pm 1.322876$ | $2$ | $2$ |
| $4$ | $0$ | $0$（模小于 $2 \times 10^{-20}$） | $2$ | $1$ |

重数合计 $2 + 4 + 4 + 4 + 2 = 16$。正实本征值连重数共 $4 = 2(m - 2)$ 个，负实本征值同样 $4$ 个。$\operatorname{rank} J_8 = 15$，$\operatorname{rank} J_8^2 = \operatorname{rank} J_8^3 = 14$：零本征值恰有一个二阶若尔当块。两个正根 $1.414214$ 与 $1.322876$ 靠得很近但不相等：不同的 $r$ 给出不同的根，所以每个实根的重数恰好是 $2$，没有更大的。六边形（$m = 3$）用同样的办法得到 $\pm 0.707107$（各二重）、$\pm 1.000000\,i$（各二重）、$\pm 2.121320\,i$（各一重）与一个二重、几何重数为 $1$ 的零本征值，正实本征值共 $2 = 2(m - 2)$ 个。

**换参数。** 取 $b = 1$、$\Omega = 1$（$R_{b,\Omega} = 0.5$），八边形的两个正实本征值变为 $2.828427$ 与 $2.645751$；取 $b = 1.35$、$\Omega = 0.25$（$R_{b,\Omega} = 1.161895$），变为 $0.707107$ 与 $0.661438$。两组都是上表数值乘以 $2\Omega$，与 $b$ 无关。

**回到非线性方程。** 以上是线性化的结论。下面两个数值实验直接积分 $\dot{z} = F_{2,1/2}(z)$（四阶龙格—库塔法，$30$ 位精度；步长减半后所示数字不变）。其一，六边形：从 $P_6 + 10^{-9}u$ 出发，$u$ 是本征值 $1/\sqrt{2}$ 的一个单位本征向量，到 $t = 10$ 时与 $P_6$ 的距离增长到初始值的约 $1177.4$ 倍，与 $e^{10/\sqrt{2}} = 1177.405$ 的相对偏差小于 $10^{-6}$（这个本征空间是二维的，取其中哪一个单位向量都是如此）。其二，正方形：从 $P_4 + 10^{-3}c_1$ 出发（正涡旋半径 $0.999$，负涡旋半径 $1.001$），到 $t = 10$ 四个涡旋绕原点平均转过 $0.0100001$ 弧度，到 $t = 100$ 平均转过 $0.100001$ 弧度；线性化解 $10^{-3}(c_1 + t\,c_0)$ 给出的转角是 $10^{-3}t$。线性化解沿切线无界地走远；在非线性方程里，这段时间内看到的是整个环绕原点缓慢转动。这两个实验是数值观察，不是冻结声明。
:::

这个样本把三件容易混在一起的事分开了。方程右端在无碰撞构型处可微（[`field_differentiable_at`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field_differentiable_at)），平衡点正是这样的构型，那里没有任何奇异；可是从六边形起，线性化恰有 $2(m - 2)$ 维的发散方向；而谱上中性的偶极与正方形，线性化方程照样有无界的解。可微不等于稳定，谱中性不等于有界。放回本章的类比（`MODEL`）：这里的“线”已经缩成平面上的点，点与点之间没有可供缠绕的结构，发散方向却一个不少，它们不需要涡管拉伸。三维的问题在别处：那里的涡丝不只是被搬运的点，还会被拉长。

在正式陈述千禧年无外力开放猜想之前，我们先用专门的文献注记严格隔离二维全局光滑性定理与 **受迫情形（克雷陈述 C / D，含光滑外力 $\mathbf{f} \in C^\infty$）** 的外部文献结果，确保下方的红色 `OPEN` 猜想框纯粹聚焦于未决的无外力自治核心：

::: {.remark #rem-ch30-navier-stokes-forced-literature title="兰姆恒等式、二维全局正则性与 2026 年受迫陈述 C / D 有限时间爆破的文献说明"}
**文献结果，未在本书形式化。** 本节涉及的经典流体几何恒等式、二维无条件全局光滑性定理以及三维**受迫**纳维—斯托克斯爆破结果均属外部文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **兰姆恒等式、螺旋度霍普夫不变量与二维无条件全局正则性**：对流分解 $(\mathbf{u}\cdot\nabla)\mathbf{u} = \frac{1}{2}\nabla(\|\mathbf{u}\|^2) + \boldsymbol{\omega}\times\mathbf{u}$ 源于 H. Lamb（*Hydrodynamics*）、无粘涡通量守恒源于开尔文环量定理（Lord Kelvin, 1869）、无粘流体螺旋度 $\mathcal{H} = \int \mathbf{u}\cdot\boldsymbol{\omega}\,dV$ 与 $S^3$ 霍普夫链环不变量的对应源于 J. J. Moreau（1961）与 H. K. Moffatt（1969）；二维不可压缩纳维—斯托克斯方程在任意时间上的无条件全局光滑解存在唯一性由 O. A. Ladyzhenskaya（*The Mathematical Theory of Viscous Incompressible Flow*, 1969）严格证明（注意：本书行内引用的冻结定理 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path) 假设 $[0, \tau]$ 上连续温和解路径已给定，不等同于 Ladyzhenskaya 的无条件全局存在性定理）。
2. **OpenAI 的受迫三维纳维—斯托克斯解答（克雷陈述 C / D）**：[官方公告](https://openai.com/index/navier-stokes-solution/)、166 页论文 [*Finite time blowup for Navier–Stokes*](https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf)（定理 1.1、周期推论 10.6）与[固定源码](https://github.com/openai/NavierStokesAndEuler/tree/f9e8bc5b38b6e212696e8a30e3e91517af887bbd)给出同一项公开成果。对任意 $\nu>0$，从静止初态出发，构造光滑外力下的三维不可压缩解，使爆破前 $\sup_{t<T^*}\|\mathbf u(t)\|_{L^2}<\infty$ 而 $\limsup_{t\nearrow T^*}\|\mathbf u(t)\|_{L^\infty}=\infty$。能量界是速度场的性质；它不表示外力本身具有所谓“有界动能”。全空间 C 要求外力各阶时空导数速降，论文的光滑时空紧支外力满足更强条件；周期 D 的外力在空间周期、在时间速降，非零周期外力不能在整个 $\mathbb R^3$ 上空间紧支。[克雷原题](https://www.claymath.org/wp-content/uploads/2022/06/navierstokes.pdf#page=2)接受 A、B、C、D 中任一陈述的证明，故 C / D 本身就是官方题目的一条解答路线；零外力 A / B 仍为下文的 `OPEN`。源码的最终入口是 `NavierStokes.Comparator.navier_stokes_breakdown_R3` 与 `navier_stokes_breakdown_periodic`。这是外部文献及其发布的形式化，未进入本书冻结账本；本书的独立复验状态另记于工程审读记录。
3. **分别辨认 Euler 结果**：同一公告另附 57 页论文 [*Finite time blowup for the Euler equation*](https://cdn.openai.com/pdf/315b36cd-ec98-4023-8342-93345194ece1/euler.pdf)，其定理 1.1 针对 $\nu=0$、**无外力**、光滑紧支无散初值，给出有限时间梯度无界与涡量时间积分发散。公告将 Alpöge、Buckmaster 的同期工作明确归于**受迫 Euler**。这两项 Euler 工作与上述正粘性受迫 NS 构造的方程、数据和结论不同。
:::


::: {.viz src="navier-stokes-p-np" preset="burgers" height="500"}
**粘性拦住：伯格斯涡。** 恒定拉伸之外再加上粘性：变细的涡核同时向外扩散，截面 $A$ 停在 $4\pi\nu/\alpha$ 附近不再变小，品红的涡度也随之停住，青色回路的环量仍是 $1$。拉伸与粘性恰好相抵，涡管不会夹断（示意模型，`MODEL`）。
:::

::: {.conjecture #conj-coda-navier-stokes-regularity title="无外力三维不可压缩纳维—斯托克斯方程的全局光滑性猜想（克雷千禧年陈述 A / B）"}
给定严格正运动粘性系数 $\nu > 0$ 且**外力恒等于零（$\mathbf{f} \equiv \mathbf{0}$）**，考察全空间 $\mathbb{R}^3$（陈述 A）或三维环面 $\mathbb{T}^3 = \mathbb{R}^3/\mathbb{Z}^3$（陈述 B）上的自治三维不可压缩纳维—斯托克斯方程组：

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u} = -\nabla p + \nu \nabla^2 \mathbf{u}, \qquad \nabla\cdot\mathbf{u} = 0, \qquad \mathbf{u}(\mathbf{x}, 0) = \mathbf{u}_0(\mathbf{x}).
$$

对于任意光滑、无散度（$\nabla\cdot\mathbf{u}_0 = 0$）且在 $\mathbb{R}^3$ 上无穷远处满足施瓦茨速降条件（或在 $\mathbb{T}^3$ 上光滑周期）的初始速度场 $\mathbf{u}_0$，是否恒存在定义在全部非负时间 $\mathbb{R}^3 \times [0, \infty)$（或 $\mathbb{T}^3 \times [0, \infty)$）上且满足有限动能界的全局光滑解 $(\mathbf{u}, p) \in C^\infty$，抑或存在某个光滑无外力初值在有限时间 $T^* < \infty$ 内丧失光滑性（有限时间爆破）？这一无外力三维纳维—斯托克斯全局正则性问题至今悬而未决。
:::

::: {.viz src="navier-stokes-p-np" preset="runaway" height="500"}
**越拉越细（示意模型）。** 青色回路的环量 $\Gamma = \omega A$ 不变，淡影与虚线圈是出发时的涡管。这里让拉伸率正比于涡度本身（$\alpha = \kappa\omega$，示意性的闭合，不是纳维—斯托克斯方程的解）：$\kappa\Gamma = 0.50$ 大于 $4\pi\nu = 0.151$，到 $t = 2.4$ 截面已缩到 $0.162$，品红的涡度升到 $6.18$，截面将在 $t^* = 2.86$ 归零。真实的三维流体是否如此，正是上面的开放问题（`MODEL`）。
:::

## 30.4.3 场的自指与二次平流投影闭合阻碍定理（`LEAN ✓`） {#3-场的自指与二次平流投影闭合阻碍定理lean-}

为什么 [@rem-ch30-lamb-decomposition-literature] 中的二次非线性平流耦合如此凶险？因为在我们的几何诠释（`MODEL`）中，它正是第 24 章**元自指 $\psi(\psi)$ 的连续场版本**——在线性偏微分方程中“算子”与“状态”泾渭分明，而在流体平流中，**速度场 $\mathbf{u}$ 既是“被搬运的状态”，同时又是“执行搬运的微分算子”**！在傅里叶频率空间中，二次自指耦合将波矢两两相加（$\mathbf{k}_1 + \mathbf{k}_2 \to \mathbf{k}_3$），不断跨尺度输运能量。对于仅能分辨低频有限模态幂等投影 $P$（满足 $P^2 = P$）的场内有限观察者而言，这种二次跨尺度耦合直接击穿了局部自洽闭合——这正是 `trureturing@dev` 内核已机械验证的**二次矢量场投影闭合判据与五模态流体平流闭合不可能性定理**：

::: {.theorem #thm-coda-quadratic-advection-no-closure title="二次矢量场投影闭合判据与有限模态流体平流闭合不可能性定理" lean="D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure"}
设 $E$ 为实模，$L : E \to_{\mathbb{R}} E$ 为线性粘性漂移算子，$B : E \to_{\mathbb{R}} E \to_{\mathbb{R}} E$ 为双线性平流算子，定义二次矢量场 $V(x) = L x - B(x, x)$；设 $P : E \to_{\mathbb{R}} E$ 为满足 $\forall x,\; P(P(x)) = P(x)$ 的幂等有限分辨率观测投影。则：

1. **二次观测精确闭合充要判据**（[`quadratic_closure_iff`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff)）：存在精确马尔可夫闭合映射 $f : E \to E$ 使得 $\forall x \in E,\; P(V(x)) = f(P(x))$，当且仅当以下三项正交泄漏条件同时恒等于零：
   - **隐态线性泄漏归零**：$\forall b \in E,\; P(b) = 0 \implies P(L(b)) = 0$；
   - **隐态自平流二次泄漏归零**：$\forall b \in E,\; P(b) = 0 \implies P(B(b, b)) = 0$；
   - **显态—隐态跨尺度混合平流归零**：$\forall a, b \in E,\; P(a) = a \implies P(b) = 0 \implies P(B(a, b) + B(b, a)) = 0$。
2. **五模态傅里叶—伽辽金流体平流无精确闭合定理**（[`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)）：在带勒雷（Leray）无散投影的五模态傅里叶状态空间 $\operatorname{State} = \operatorname{Fin} 5 \to \operatorname{Amplitude}$ 中，显式低频波 $a = \operatorname{family}(1, 0)$（满足 $P(a) = a$）与隐式高频波 $b = \operatorname{family}(0, 1)$（满足 $P(b) = 0$）通过二次平流耦合在横向模态索引 $0$（对应波矢 $\mathbf{k}_0 = (0, 1)$，分量 $0$）上产生**非零投影跨尺度混合平流证人**（[`mixed_witness`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_witness)）：

   $$
   P\bigl(B(a, b) + B(b, a)\bigr)_{0, 0} = \frac{i}{4} \neq 0,
   $$

   从而直接证伪第三项跨尺度混合条件（[`mixed_condition_fails`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_condition_fails)），并经由 $V(x) = L_\nu x - B(x, x)$ 的负号产生等于 $-i/4$ 的**非零观测横向流体加速度差（缺口）**（[`fluid_gap_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.fluid_gap_from_mixed)）：

   $$
   \operatorname{acceleration}_\nu(1, 1)_{(0, 1), 0} - \operatorname{acceleration}_\nu(1, 0)_{(0, 1), 0} = -\frac{i}{4} \neq 0.
   $$

   因此，对任意粘性系数 $\nu \in \mathbb{R}$，有限低频观测投影下**不存在**任何精确自洽的闭合演化映射：

   $$
   \neg \exists f : \operatorname{State} \to \operatorname{State},\quad \forall x \in \operatorname{State},\; P\bigl(\operatorname{vectorField}(L_\nu, B, x)\bigr) = f(P(x)),
   $$

   亦不存在仅由低频观测预测横向流体加速度的精确标量预测算子（[`no_fluid_predictor_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_fluid_predictor_from_mixed)）。
:::

::: proof
第一部分由幂等分解 $x = P(x) + (x - P(x))$ 与观测增量恒等式 [`observed_increment`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.observed_increment)：

$$
P(V(a + b)) - P(V(a)) = P(L(b)) - P(B(a, b) + B(b, a)) - P(B(b, b))
$$

导出：必要性分别代入对偶隐态对 $\pm b$（分离出奇次项 $P(L(b)) = 0$ 与偶次项 $P(B(b, b)) = 0$）及显隐叠加态 $a + b$（分离出混合项 $P(B(a, b) + B(b, a)) = 0$）；充分性令 $a = P(x),\, b = x - P(x)$，由 $P(b) = 0$ 立得 $P(V(x)) = P(V(P(x)))$。第二部分在五模态勒雷投影平流实例中计算显隐波族 $\operatorname{family}(\alpha, \beta)$ 在模态 $0 = (0, 1)$ 上的卷积分量，得出投影混合平流项为 $+i/4$（[`mixed_witness`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_witness)），代入带负号二次场增量恒等式且利用隐态粘性核保持性 $P(L_\nu(b)) = 0$ 即得观测横向流体加速度差为 $-i/4 \neq 0$（[`fluid_gap_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.fluid_gap_from_mixed)），结合第一部分充要判据即证对一切 $\nu \in \mathbb{R}$ 均不存在精确闭合映射 $f$。完整证明由 Lean 内核检查。
:::

::: {.viz src="navier-stokes-p-np" preset="mixed" height="500"}
**看不见的变量漏进来。** 只看 $x$ 的观察者：每条曲线是固定一个 $x$ 时，看得见的加速度 $P(V)$ 随看不见的 $y$ 的变化。混合项打开后，曲线张成一把扇子：同一个 $x = 0.5$，青色是 $y = 0$ 时的加速度，琥珀色的点是当前 $y$ 时的加速度，琥珀色竖线是两者之差。差不为零，就没有只依赖 $x$ 的精确闭合（$\mathbb{R}^2$ 上的示意实例；一般判据与五模态实例见上面的定理）。把三项泄漏都关掉，每条曲线都变成水平线，琥珀色的点与青色的点重合，这是判据“当”的那一半。
:::

## 30.4.4 粘性兰道尔擦除、高维测地线视角与连续—离散六重类比总结（`MODEL`） {#4-粘性兰道尔擦除高维测地线视角与连续离散六重类比总结model}

围绕湍流耗散尺度、平均化流体逻辑门级联与无穷维微分同胚群测地线的三项经典文献定理汇总于以下注记中：

::: {.remark #rem-ch30-tao-arnold-literature title="柯尔莫哥洛夫湍流标度、陶哲轩平均化爆破与阿诺德测地线定理的文献说明"}
**文献结果，未在本书形式化。** 以下三项流体力学与几何分析经典结果均属外部文献，未在本书形式化：

1. **柯尔莫哥洛夫（A. N. Kolmogorov, *Dokl. Akad. Nauk SSSR* **30**, 1941）湍流级联与耗散微尺度标度**：在各向同性高雷诺数湍流唯象理论中，惯性区能谱服从 $E(k) \propto \varepsilon^{2/3} k^{-5/3}$，粘性耗散微尺度为 $\eta = (\nu^3/\varepsilon)^{1/4}$，解析到微尺度 $\eta$ 所需的三维空间自由度数按 $N_{\mathrm{DOF}} \sim (L/\eta)^3 \sim \mathrm{Re}^{9/4}$ 增长；
2. **陶哲轩（Terence Tao, *J. Amer. Math. Soc.* **29**, 601–674, 2016）平均化三维纳维—斯托克斯有限时间爆破定理**：对保持能量恒等式的一类双线性平均化三维纳维—斯托克斯算子，可通过嵌套涡环构造自相似流体逻辑门级联——母涡环将状态传递给空间尺度收缩为 $\lambda R$（$\lambda \in (0, 1)$）、局部时钟加快 $\lambda^{-2}$ 倍的子涡环，在超临界拉伸压倒粘性耗散时于有限时间 $T^* < \infty$ 内完成无穷步级联爆破；
3. **阿诺德（Vladimir Arnold, *Ann. Inst. Fourier* **16**, 319–361, 1966）$\operatorname{SDiff}(M)$ 测地线定理**：无粘不可压缩理想流体（欧拉方程，$\nu = 0$）的光滑演化轨迹，等价于无穷维保体积微分同胚群流形 $\operatorname{SDiff}(M)$ 在右不变 $L^2$ 动能度规下的常速**测地线**（该流形在众多二维截面上具有负截面曲率，导致相邻测地线指数发散；而当加入正粘性项 $\nu\nabla^2\mathbf{u}$ 时，纳维—斯托克斯流在 $\operatorname{SDiff}(M)$ 上受到偏离纯测地线流的耗散阻尼修正）。
:::

结合 [@thm-coda-quadratic-advection-no-closure] 与上述文献背景，我们在正交几何诠释模型（`MODEL`）中获得三点收官洞察：

- **粘性耗散的兰道尔擦除角色与形式见证丝（`MODEL`）**：运动粘性 $\nu$ 的耗散可与第八章热浴擦除作类比（对照球面梯度耗散定理 [`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)），但不同模型中的能量律并非同一条定律。陶哲轩平均化模型或 OpenAI 受迫 NS 证明一经写出，就可检查具体推演；把证明画成“一维丝”不限制证明长度、归约成本或内核运行时间，也不保证某一问题族有多项式长度证书。
- **连续统理想化与离散两子丈量的物理边界（`MODEL`）**：连续 PDE 的数学爆破促使我们追问连续介质近似的适用范围。真实流体是否出现可压缩效应、空化或分子尺度修正，取决于材料、状态与尺度，不能由这份爆破构造推出任何一种必然过程。作者的**“光滑的球永远只是近似！”**在这里表达有限分辨率的认识论立场；它不否定连续方程的精确数学意义，也不证明自然界只能采用某种离散本体。
- **离散逻辑场与连续流体场的六重正交几何类比表（`MODEL`）**：

::: {.remark #rem-ch30-six-row-analogy-table title="离散逻辑场与连续流体场的六重正交几何类比表（含文献结果，未在本书形式化）"}
**文献结果，未在本书形式化（针对表中交叉引用的外部计算复杂性与连续流体力学文献背景；已验证形式定理通过显式 GID 标注，三维无外力全局正则性标为 `OPEN`）。**

| 核心维度 | $P$ vs. $NP$ 问题（离散逻辑场） | 纳维—斯托克斯问题（连续流体场） | 正交几何类比模型（`MODEL`） |
| :--- | :--- | :--- | :--- |
| **高效求解的类比** | **部分 $P$ 算法的导向结构**（$P\subseteq NP$；无旋场非定义，见 [@rem-ch30-karmarkar-kasteleyn-literature]） | **无旋势流 / 低雷诺数层流**（$\nabla\wedge\mathbf{u}=0$ 或粘性主导，见 [@rem-ch30-lamb-decomposition-literature]） | 作者以局部导向描绘高效求解；仍需算法与成本分析 |
| **维度分水岭** | **2-SAT** vs. **3-SAT**（文献见 [@rem-ch30-query-sos-literature]） | **2D NS**（文献见 [@rem-ch30-navier-stokes-forced-literature]；条件温和路径正则性 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path)） vs. **3D 无外力 NS**（[@conj-coda-navier-stokes-regularity]，`OPEN`） | 二维平面流无第三轴涡管拉伸；三维允许轴向涡管拉伸（见 [@rem-ch30-vorticity-transport-literature]） |
| **复杂性引擎** | 自指递归与三元布尔阻挫环 | 二次对流非线性与涡管拉伸（[@rem-ch30-lamb-decomposition-literature]、[@rem-ch30-vorticity-transport-literature]）及跨尺度混合泄漏（[`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)） | 算子与状态自指耦合 $\psi(\psi)$，向高频正交模态 $\mathbf{k}_1+\mathbf{k}_2\to\mathbf{k}_3$ 级联 |
| **见证 / 奇异细丝的类比** | **$NP$ 见证丝**是检查过程的图像，不蕴含难解性 | 示意涡管的条件性截面坍缩；OpenAI 构造的核心相对细长（见 [@rem-ch30-vorticity-transport-literature]） | 线形图像相似，不建立复杂度与流体奇点的数学等价 |
| **物理防火墙** | 有限观察者 $90^\circ$ 视界与局部记忆截断 | 运动粘性耗散（[@rem-ch30-lamb-decomposition-literature]，对照 [`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)）与微观离散截断 | 耗散与擦除的模型类比，不保证阻止任何流体爆破 |
| **高维几何视角** | 无时间静态场全局交集（受限坍缩参照 [@rem-ch30-postselection-ctc-literature]） | 无穷维流形测地线视角（无粘文献参照 [@rem-ch30-tao-arnold-literature]） | 高维流形上的简洁几何运动在局部低维投影下展现为复杂的非线性能量传递 |

:::

## 30.4.5 三个手算对照：能量、反馈与不闭合 {#5-三个手算对照能量反馈与不闭合}

::: {.example #ex-ch30-core-energy-scaling title="局部速度无界而核心能量趋零：标度手算"}
**手工推导，未在本书形式化。** 取上述 NS 论文第 2 节的典型核心标度，令 $\tau=1-t$、$0<h<1/100$：

$$
\begin{aligned}
\ell_r&\asymp\tau^{1/2},\\
\ell_z&\asymp\tau^{1/2-h},\\
U&\asymp\tau^{-1/2-h},\\
V_{\mathrm{core}}&\asymp\ell_r^2\ell_z\asymp\tau^{3/2-h},\\
E_{\mathrm{core}}&\asymp U^2V_{\mathrm{core}}\asymp\tau^{1/2-3h}\longrightarrow0.
\end{aligned}
$$

$U$ 同时趋于无穷：积分能量控制不自动控制局部速度。这里仅估算典型核心的阶，不是论文完整的全空间能量证明；后者还须控制核心外的场和修正项。两种长度都趋零，$\ell_r/\ell_z\asymp\tau^h\to0$ 只表示相对细长，并非轴向长度增长，更不表示一整条曲线都是奇点。
:::

### 30.4.5.1 把显隐态分解用于 PDE：先列出交换条件 {#sec-ch30-projected-feedback}

::: {.remark #rem-ch30-projected-feedback title="Leray 投影、傅里叶截断与缺失的二次反馈"}
**手工推导，未在本书形式化。** 在 $\Omega=\mathbb T^3$ 或 $\mathbb R^3$ 上，固定 $s>5/2$。在爆破前任意紧时间区间 $I$ 上，假设无散速度 $u\in C(I;H^s(\Omega;\mathbb R^3))\cap C^1(I;H^{s-2})$、原外力 $f\in C(I;H^{s-2})$，且 NS 方程在 $H^{s-2}$ 中成立。压力取为 $\Omega$ 上的分布（环面情形为周期分布），满足 $\nabla p\in H^{s-2}$ 与 $\mathbb P\nabla p=0$。设 $\mathbb P$ 为 Leray 无散投影，令 $F=\mathbb P f$、$L=\nu\Delta$、$B(v,w)=\mathbb P((v\cdot\nabla)w)$，则 $\partial_tu=Lu-B(u,u)+F$。$F$ 是投影后的外力，不能把原外力 $f$ 的紧支性质直接赋给它。

取固定、与时间无关的有界傅里叶低通截断 $\Pi$，满足 $\Pi^2=\Pi$，并在所用 Sobolev 空间上与空间导数、$\Delta$、$\mathbb P$ 交换。例如固定 $K>0$，逐分量乘以频率集合 $\{|k|\le K\}$ 的示性函数。环面上的有限频率集给出有限维投影；全空间频率截断通常仍为无限维。$\Pi$ 的有界性及时间独立性保证 $\partial_t\Pi u=\Pi\partial_tu$。上述正则性保证双线性乘积与各等式在 $H^{s-2}$ 中有意义；不在奇点时刻使用这些交换。

令 $a=\Pi u$、$b=(1-\Pi)u$，直接展开得

$$
\begin{aligned}
\partial_t a={}&La-\Pi B(a,a)+\Pi F\\
&-\Pi\bigl(B(a,b)+B(b,a)\bigr)\\
&-\Pi B(b,b).
\end{aligned}
$$

后两行就是丢失的信息：两项显隐混合与一项隐态平方。上面的五模态见证为混合项 $+i/4$，向量场负号使加速度缺口为 $-i/4$；它不是隐态平方项的见证。

原论文的脉冲机制突出另一件事：柱坐标速度分量的角均值可以为零，二次动量通量的角平均仍非零，为背景流补足应力并修正动量残差。最简单的手算是 $w(\theta)=A\cos(m\theta)$（非零整数 $m$），其角均值为 $0$，而 $w^2$ 的角均值为 $A^2/2$。这个标量算例只说明平方反馈可以留下来；它没有验证论文的向量脉冲。角平均不同于上述低通 $\Pi$；柱坐标基底随角度变化，压力、几何项及导数交换必须在原论文中另行处理。二者尚无已形式化的构造间桥梁。从这条恒等式走到爆破，还缺跨尺度增长、粘性竞争、全阶残差控制与极限构造。
:::

::: {.example #ex-ch30-dissipative-no-closure title="不闭合而始终有界的耗散二次系统"}
**手工推导，未在本书形式化。** 在 $\mathbb R^2$ 上只观察第一坐标 $x$，考虑

$$
\begin{aligned}
\dot x&=-\nu x-y^2,\\
\dot y&=-\nu y+xy,\qquad\nu\ge0.
\end{aligned}
$$

$(0,0)$ 与 $(0,1)$ 的可见读数同为 $0$，可见导数却分别为 $0$ 与 $-1$；所以不存在对全部状态有效的 $\dot x=g(x)$。但交叉项恰好相消：

$$
\begin{aligned}
\frac{d}{dt}(x^2+y^2)
&=2x(-\nu x-y^2)\\
&\quad+2y(-\nu y+xy)\\
&=-2\nu(x^2+y^2),\\
x(t)^2+y(t)^2&=(x(0)^2+y(0)^2)e^{-2\nu t}.
\end{aligned}
$$

多项式向量场局部光滑，正向轨道有界，故可延拓到任意有限时间。$\nu>0$ 时能量衰减，$\nu=0$ 时守恒，均无正向有限时间爆破。这是对“不闭合就足以推出爆破”的一般推理的反例，不是 NS 方程的反例。不闭合只排除给定投影下对所有状态的精确瞬时预测；它不排除近似闭合、记忆项、增广状态或其他投影，也不给出复杂性下界。
:::

::: {.viz src="navier-stokes-p-np" height="640"}
**交互实验室 `ORTHO//VORTEX`**：本节的三个场景。对流项的两半：在驻点流与刚体旋转之间调 $s$，看兰姆那一半怎样随涡度出现；涡管：二维不被拉伸，三维在恒定拉伸下变细到伯格斯涡核 $4\pi\nu/\alpha$ 为止，示意性的自拉伸闭合则在有限时间夹断；闭合：只看 $x$ 的观察者何时能自己预测下一步（判据与五模态无闭合实例已由 Lean 验证）。涡管场景是示意模型，不是纳维—斯托克斯方程的数值解。
:::

---

