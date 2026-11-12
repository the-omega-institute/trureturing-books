# 第七章 时间的二象性：为什么线是经典时间，面积是量子时间？ {#ch07-geometric-time-and-speed-limits}

正如本书作者所言：

> *“我的直觉是,线是经典时间,面积是量子时间”*
>
> *“把观察者内生放进来思考,何时粒子、何时波,似乎是观察者的注意力问题”*

在[第六章](ch06-geometric-product.md)中，我们用一条克利福德几何积恒等式 $\vv{A}\vv{B} = \vv{A}\cdot\vv{B} + \vv{A}\wedge\vv{B}$ 完成了空间层面的波粒缝合：**粒子是共线的内积投影线（$\cos\theta$），波是正交的外积楔积面（$\sin\theta\,\vv{I}$）**。现在，只要顺着这条正交线索往前多走半步，物理学中最深邃的那个谜团——**时间究竟是什么？**——便当场露出了它的双面几何真容！

在牛顿与日常经验的世界里，时间被想象成一条均匀流淌的一维标量直线 $t \in \mathbb{R}$：钟摆“滴答、滴答”地敲击出一串排成一列的历史刻度，就像纸带上被打孔机打出的一排离散圆孔。然而，在薛定谔方程 $i\hbar\frac{d}{dt}\lvert\psi(t)\rangle = H\lvert\psi(t)\rangle$ 主宰的微观世界里，只要你不去打孔测量，状态矢量却在复希尔伯特空间里沿着二维相位平面连续旋转，甚至同时横跨多条历史路径发生相干叠加！

为什么同一个宇宙里会有两副截然不同的“时间面孔”？本章将严格证明作者的那句直觉洞见——**“线是经典时间，面积是量子时间”**：

1. **量子时间是二向量有向面积**：连续幺正演化 $U(t) = \exp\bigl((-it/\hbar)H_{\mathrm{op}}\bigr)$ 的无穷小生成元 $G = -(i/\hbar)H_{\mathrm{op}}$ 必为**反自伴算子**（$G^* = -G$），哈密顿量 $H_{\mathrm{op}} = i\hbar G$ 所度量的，恰恰是量子态在单位时间内扫过的**二向量旋转面积率**；
2. **经典时间是一维幂等投影线**：只有当观察者用幂等投影尺 $P^2 = P$ 去拦截这片旋转面积、每一次翻越 $90^\circ$ 正交墙（$\langle m_0, m_1\rangle = 0$）落下一枚不可混淆的离散记录时，连续扫掠的二维量子面积才被切分成了“滴答、滴答”的一维经典时间刻度！

::: {.figure src="ch07-overview"}
**图 7。** 本章地图：第 I 栏，琥珀色的箭头从 $m_0$ 转到与它垂直的 $m_1$，扫过一块品红的四分之一圆，两个端点是两声滴答；第 II 栏，横轴是转角 $\omega t$，灰色虚线是不看时留在 $\lvert 0\rangle$ 的概率，青色的线是测 $4$ 次时的概率，到 $180^\circ$ 还剩 $0.531$；第 III 栏，记账余量 $D_{\mathrm{freeze}} = \Delta E_{\mathrm{pass}} - \Delta S/\beta$ 随逆温度 $\beta$ 变化，在 $\beta_c$ 左边是品红的负余量，右边是青色的正余量。
:::

## 7.1 薛定谔方程的几何翻译：哈密顿量 $H$ 就是单位时间扫过的二向量面积率 {#sec-schrodinger-bivector-rate}

翻开任何一本大学量子力学课本，薛定谔方程 $i\hbar\partial_t\psi = H\psi$ 总是带着两个令人生疑的特征登场：第一，方程左边为什么要凭空塞进一个虚数单位 $i$？第二，为什么能量算符（哈密顿量 $H$）偏偏要是一个自伴（厄米）算符 $H^* = H$？

让我们用[第五章](ch05-complex-phase-and-rotors.md)建立的“二向量旋转生成元”视角，把薛定谔方程从头到尾翻译成大白话。

假设一个量子系统随实参数 $t \in \mathbb{R}$ 作连续保内积演化，即由一族单参数算子群 $U(t)$ 描述：初刻恒等 $U(0) = I$，时间可加 $U(s + t) = U(s)U(t)$，且处处保持模长与内积不变 $U(t)^* U(t) = I$。考察 $t = 0$ 处的瞬时变化率（导数生成元）$G := U'(0)$。对保模长恒等式 $U(t)^* U(t) = I$ 在 $t = 0$ 处求导，由乘积求导法则立即得到：

$$
\left.\frac{d}{dt}\bigl(U(t)^* U(t)\bigr)\right|_{t=0} = G^* U(0) + U(0)^* G = G^* + G = 0 \quad\Longrightarrow\quad G^* = -G!
$$

看清楚了吗？**任何保模长连续演化的真实几何生成元 $G$，天生必然是一个反自伴算子（$G^* = -G$）——也就是第五章证明的二维有向面积旋转生成元（bivector generator）！**

物理学家之所以在薛定谔方程里写出自伴的哈密顿量 $H_{\mathrm{op}}$（满足 $H_{\mathrm{op}}^* = H_{\mathrm{op}}$），仅仅是因为人类习惯用实数能量刻度来给仪表盘标定读数：人为地给反自伴的几何旋转生成元 $G$ 乘上一个旋转 $90^\circ$ 的因子 $i\hbar$（其中 $\hbar \neq 0$ 是把几何弧度换算为物理作用量焦耳·秒的校准常数），定义

$$
H_{\mathrm{op}} := (i\hbar) G \quad\Longleftrightarrow\quad G = -\frac{i}{\hbar} H_{\mathrm{op}}!
$$

因为 $i$ 和 $G$ 在取共轭伴随时双双变号（$(-i)(-G) = +iG$），两个负号相乘抵消，这才把反自伴的**二向量面积旋转率 $G$** 包装成了自伴的**厄米哈密顿量 $H_{\mathrm{op}}$**！薛定谔方程根本不是一条需要死记硬背的神秘波动方程，它不过是再朴素不过的刚体角速度公式“**瞬时转向率 $=$ 单位时间扫过的二向量面积 $G$**”。

::: {.figure src="ch07-area-rate"}
**保模长的生成元只把箭头往垂直方向推。** 在琥珀色箭头 $\psi(t)$ 的尖端，紫色的箭头 $G\psi$ 沿切线，与 $\psi$ 成直角，所以箭头只转不伸缩；淡灰的箭头是之前相隔 $\Delta t$ 的位置，每个 $\Delta t$ 扫过一块同样大的品红扇形。示意：把复相位的转动画成实平面上的转动；自伴性与指数律见 [@thm-calibrated-unitary-group]。
:::

在 Lean 4 形式化模块 `Quantum/Dynamics/CalibratedUnitaryGroup` 中，下面这条定理在完备复内积空间（希尔伯特空间）$H$ 上一次性严格证明了：从单参数保模长群出发，校准后的哈密顿量 $H_{\mathrm{op}} = (i\hbar)G$ 必自伴、有限时间演化必为指数旋子 $U(t) = \exp((-it/\hbar)H_{\mathrm{op}})$，且处处满足算子薛定谔微分方程！

::: {.theorem #thm-calibrated-unitary-group title="单参数幺正演化群的校准自伴哈密顿量与指数薛定谔方程定理" lean="D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group"}
设 $H$ 为完备复内积空间，$U : \mathbb{R} \to (H \to_L[\mathbb{C}] H)$ 为连续线性算子构成的单参数族，$G : H \to_L[\mathbb{C}] H$ 为 $U$ 在 $t = 0$ 处的导数（`HasDerivAt U G 0`）。若 $U$ 满足单参数幺正群条件：

1. **初刻恒等**：$U(0) = 1$；
2. **单参数群加法律**：$\forall s, t \in \mathbb{R},\, U(s + t) = U(s)U(t)$；
3. **处处左幺正保范**：$\forall t \in \mathbb{R},\, U(t)^* U(t) = 1$；

则对任意非零实校准常数 $\hbar \in \mathbb{R}$（$\hbar \neq 0$），定义校准哈密顿算子 $H_{\mathrm{op}} := (i\hbar)\cdot G$，以下三条结论同时成立：

1. **校准哈密顿量的自伴性**：$H_{\mathrm{op}}$ 为自伴算子（`IsSelfAdjoint H_op`，即 $H_{\mathrm{op}}^* = H_{\mathrm{op}}$）；
2. **有限时间指数旋子表示**：对一切 $t \in \mathbb{R}$，
   $$
   U(t) = \exp\Bigl(\bigl(-\frac{it}{\hbar}\bigr) H_{\mathrm{op}}\Bigr);
   $$
3. **全局薛定谔微分定律**：对一切 $t \in \mathbb{R}$，$U$ 在时刻 $t$ 具有导数 $-\frac{i}{\hbar} H_{\mathrm{op}} U(t)$（`HasDerivAt U ((-Complex.I / ↑ℏ) • (H_op * U t)) t`）。
:::

::: proof
首先在证明内部导出生成元 $G$ 的反自伴性：对双线性复合映射 $t \mapsto U(t)^* U(t)$ 在 $t = 0$ 处求导，由 $U(0) = 1$ 及乘积导数法则，其导数为 $G^* \cdot 1 + 1^* \cdot G = G^* + G$；另一方面因 $U(t)^* U(t) = 1$ 为常值映射，其在 $t = 0$ 处导数为 $0$，由导数唯一性得 $G^* + G = 0$，即 $G^* = -G$。由此计算校准哈密顿量 $H_{\mathrm{op}} = (i\hbar)G$ 的伴随：因 $\hbar \in \mathbb{R}$，有 $H_{\mathrm{op}}^* = \overline{i\hbar}\,G^* = (-i\hbar)(-G) = (i\hbar)G = H_{\mathrm{op}}$，证得结论 1。接着由单参数群性质 $U(t + s) = U(t)U(s)$ 将 $s = 0$ 处的导数 $G$ 平移至任意时刻 $t$，结合巴拿赫代数上常微分方程初值问题 $f'(t) = G f(t),\, f(0) = 1$ 解的唯一性，得 $U(t) = \exp(t G)$。注意到 $\hbar \neq 0$ 时 $\bigl(-\frac{it}{\hbar}\bigr)(i\hbar) = -i^2 t = t$，故 $\bigl(-\frac{it}{\hbar}\bigr)H_{\mathrm{op}} = t G$，代入即得结论 2 与结论 3。完整证明由 Lean 内核检查。
:::

接下来，如果我们在二维量子面积 $U(t) = e^{-itH}$（取自然单位 $\hbar = 1$，Lean 中定义为 [`hamiltonianPropagator`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.hamiltonianPropagator)）连续旋转的过程中，架起一把固定的一维幂等投影尺 $P$（满足 $P^2 = P = P^*$），那么演化密度矩阵 $\rho_t := e^{-itH}\rho e^{itH}$（[`evolvedDensity`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.evolvedDensity)）在这把尺子上的**粒子通过概率** $p(t) := \operatorname{Re}\Tr(\rho_t P)$（[`projectionProbability`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projectionProbability)）是如何随时间流动的？

下面的命题证明了一个极其优美的几何结论：**一维投影线上粒子概率的变化率 $p'(t)$，一分不差地由哈密顿量 $H$ 与投影尺 $P$ 的对易子二向量面积 $[H, P] = HP - PH$ 所驱动！**

::: {.proposition #prop-projection-probability-flow title="投影概率流的对易子流公式与对易守恒律" lean="D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow"}
设 $n$ 为有限可判等指标类型，$H, P \in M_n(\mathbb{C})$ 分别满足厄米性 $H^* = H$ 与星投影条件 $P^2 = P = P^*$，$\rho : \mathrm{DensityState}\,n$ 为密度态。记演化密度矩阵为 $\rho_t := e^{-itH}\rho e^{itH}$（[`evolvedDensity`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.evolvedDensity)），实投影概率为 $p(t) := \operatorname{Re}\operatorname{bornProbability}(\rho_t, P)$（[`projectionProbability`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projectionProbability)）。则同时成立：

1. **实值玻恩迹对偶**：对一切 $t \in \mathbb{R}$，$(p(t) : \mathbb{C}) = \operatorname{bornProbability}(\rho_t, P) = \Tr(\rho_t P)$；
2. **对易子概率流微分公式**：对一切 $t \in \mathbb{R}$，$p(t)$ 在时刻 $t$ 的导数为
   $$
   p'(t) = \operatorname{Re}\Bigl(i\Tr\bigl(\rho_t (H P - P H)\bigr)\Bigr),
   $$
   且复数 $i\Tr\bigl(\rho_t(H P - P H)\bigr)$ 本身已为纯实数：$\bigl(\operatorname{Re}(i\Tr(\rho_t(HP - PH))) : \mathbb{C}\bigr) = i\Tr\bigl(\rho_t(HP - PH)\bigr)$；
3. **对易投影定常守恒律**：若 $H$ 与 $P$ 对易（$H P - P H = 0$），则对一切 $t \in \mathbb{R}$ 恒有 $p(t) = p(0)$。
:::

::: proof
对结论 1，因 $\rho$ 为密度态且 $e^{-itH}$ 幺正，$\rho_t$ 仍为合法密度态，结合星投影条件 $P^2 = P = P^*$ 及[第二章](ch02-born-rule.md)玻恩概率实值定理，知 $\Tr(\rho_t P)$ 恒为实数。对结论 2，由生成元 [`hamiltonianGenerator`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.hamiltonianGenerator) $-iH$ 对 $\rho_t = e^{-itH}\rho e^{itH}$ 求导，得冯·诺依曼方程 $\frac{d}{dt}\rho_t = -i(H\rho_t - \rho_t H)$；乘以常矩阵 $P$ 后取迹，利用迹的线性性与循环交换律 $\Tr(H\rho_t P) = \Tr(\rho_t P H)$，化简得

$$
\frac{d}{dt}\Tr(\rho_t P) = -i\Tr\bigl((H\rho_t - \rho_t H)P\bigr) = i\Tr\bigl(\rho_t(HP - PH)\bigr).
$$

又因 $\rho_t^* = \rho_t, H^* = H, P^* = P$，取复共轭验证知 $i\Tr(\rho_t(HP - PH))$ 等于其自身共轭，故为纯实数，实部算子 $\operatorname{Re}$ 保持其值不变。最后，若 $HP - PH = 0$，则导数 $p'(t)$ 在 $\mathbb{R}$ 上恒等于 $0$，故 $p(t) = p(0)$ 处处守恒（结论 3）。完整证明由 Lean 内核检查。
:::

特别地，如果初态 $\psi$ 本身就是哈密顿量 $H$ 的能量本征态（$H\psi = E\psi$），那么在 Lean 模块 `Quantum/Dynamics/EnergyEigenstateStationarity` 中，定理 [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) 与 [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero) 严格证明了：它的能量涨落方差恒为零，演化态 $\psi(t) = e^{-itE/\hbar}\psi$ 仅仅在原方向线上乘了一个不可见的全局相位，其秩一密度矩阵与一切可观测量的期望值在所有时刻 $t$ 纹丝不动！**没有非零的对易子外积面积 $[H, P] \neq 0$，就没有一维投影线上可见的经典时间流逝！**

::: {.figure src="ch07-commutator-flow"}
**转轴与尺子不平行，影子才会动。** 单比特特例：尺子 $P = \lvert 0\rangle\langle 0\rvert$ 是青色的竖轴，紫色的转轴 $H$ 从竖直斜开 $40^\circ$。琥珀色的态从北极出发，绕紫色的轴走一圈虚线小圆，它在青色竖轴上的影子随之上下移动；右边青色的曲线是留在 $\lvert 0\rangle$ 的概率 $p(t)$，在 $1$ 与 $0.59$ 之间起伏。转轴与尺子重合时 $[H, P] = 0$，灰色的 $p(t)$ 一直是 $1$（[@prop-projection-probability-flow]；单比特的曲线是手工推导与数值）。
:::

## 7.2 量子速度极限（Mandelstam–Tamm 与 Margolus–Levitin）：翻越 $90^\circ$ 正交墙的最短时间 {#sec-quantum-speed-limit}

既然“线是经典时间，面积是量子时间”，那么**把一团连续旋转的二维量子面积，切分成两声毫不含糊、彼此绝不串扰的经典时钟“滴答”声，最短需要多少时间？**

让我们从纯几何的角度思考这个问题。在量子世界里，什么样的两个状态 $m_0$ 与 $m_1$ 才算得上“真正可区分的两个不同时刻刻度”？如果 $\langle m_0, m_1\rangle_{\mathbb{C}} \neq 0$，它们在投影时就会发生重叠混淆；只有当两个目标记录态**严格正交**（$\langle m_0, m_1\rangle_{\mathbb{C}} = 0$）时，它们的富比尼—施图迪（Fubini–Study）测地线夹角（Lean 中定义为 [`fsAngle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fsAngle) $\theta_{\mathrm{FS}}(x, y) := \arccos\|\langle x, y\rangle_{\mathbb{C}}\|$）才恰好等于直角：

$$
\theta_{\mathrm{FS}}(m_0, m_1) = \arccos\|0\| = \frac{\pi}{2} = 90^\circ!
$$

换句话说：**在经典时间轴上每往前迈出一步真正可区分的“滴答”，量子态在射影球面上就必须实打实地翻越一堵 $90^\circ$（$\pi/2$ 弧度）的正交墙！**

在 Lean 模块 `QuantumBounds/FubiniStudyRecordTime` 中，我们先证明了任意三根单位态向量 $a, b, c$ 之间的富比尼—施图迪球面三角不等式 $\theta_{\mathrm{FS}}(a, c) \le \theta_{\mathrm{FS}}(a, b) + \theta_{\mathrm{FS}}(b, c)$（[`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle)）。由此出发，如果从一个锚定中间态 $a$ 到两个正交目标记录态 $m_0, m_1$（$\langle m_0, m_1\rangle_{\mathbb{C}} = 0$）的角位移分别受限于速度上界 $\theta_{\mathrm{FS}}(a, m_k) \le \mathrm{energy}\cdot\tau / \hbar$（$k = 0, 1$），那么两段路程加起来至少要跨过 $\theta_{\mathrm{FS}}(m_0, m_1) = \pi/2$ 的正交鸿沟，从而直接锁死了单步记录时间 $\tau$ 的绝对下界与有限时长 $T$ 内的最大经典记录步数 $N$！

::: {.figure src="ch07-wall"}
**两段各不超过 $E\tau/\hbar$ 的路，加起来至少要跨过 $90^\circ$。** 赤道上的 $m_0$ 与 $m_1$ 正交，它们之间是品红的 $90^\circ$ 弧；从琥珀色的锚点 $a$ 到两者各有一段青色的弧，每段受速度界 $\le E\tau/\hbar$ 限制（$E$ 即定理中的 $\mathrm{energy}$）。两段青色弧之和不小于品红的弧，于是 $2E\tau/\hbar \ge \frac{\pi}{2}$（[@thm-fubini-study-record-time]）。示意：图中是实单位向量的球面，重叠为正时富比尼—施图迪夹角就是弧长。
:::

::: {.theorem #thm-fubini-study-record-time title="正交记录分辨的富比尼—施图迪时间下界与记录计数上界定理" lean="D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound"}
设 $E$ 为复内积空间，$a, m_0, m_1 \in E$ 为单位向量（$\|a\| = \|m_0\| = \|m_1\| = 1$），其中两个目标记录态正交：$\langle m_0, m_1\rangle_{\mathbb{C}} = 0$。记富比尼—施图迪夹角为 $\theta_{\mathrm{FS}}(x, y) := \arccos\|\langle x, y\rangle_{\mathbb{C}}\|$（[`fsAngle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fsAngle)）。设能量尺度参数 $\mathrm{energy} > 0$，普朗克常数 $\hbar > 0$，时间步长 $\tau \in \mathbb{R}$。若从锚定态 $a$ 到 $m_0, m_1$ 的角位移满足单步速度界

$$
\theta_{\mathrm{FS}}(a, m_0) \le \frac{\mathrm{energy}\cdot\tau}{\hbar}, \qquad \theta_{\mathrm{FS}}(a, m_1) \le \frac{\mathrm{energy}\cdot\tau}{\hbar},
$$

则单步记录时长 $\tau$ 必满足下界：

$$
\tau \ge \frac{\pi \hbar}{4 \cdot \mathrm{energy}}.
$$

进一步，对任意步数 $N \in \mathbb{N}$ 及指标族 $a, m_0, m_1 : \mathrm{Fin}\,N \to E$、步长族 $\tau : \mathrm{Fin}\,N \to \mathbb{R}$ 与总时长 $T \in \mathbb{R}$，若对每一步 $i \in \mathrm{Fin}\,N$ 均满足单位范数条件 $\|a(i)\| = \|m_0(i)\| = \|m_1(i)\| = 1$、正交条件 $\langle m_0(i), m_1(i)\rangle_{\mathbb{C}} = 0$、双侧角位移界 $\theta_{\mathrm{FS}}(a(i), m_0(i)) \le \frac{\mathrm{energy}\cdot\tau(i)}{\hbar}$ 与 $\theta_{\mathrm{FS}}(a(i), m_1(i)) \le \frac{\mathrm{energy}\cdot\tau(i)}{\hbar}$，且总时长预算满足 $\sum_{i \in \mathrm{Fin}\,N} \tau(i) \le T$（其中 $\mathrm{energy} > 0, \hbar > 0$），则总记录步数 $N$ 满足上界（[`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)）：

$$
N \le \frac{4 \cdot \mathrm{energy} \cdot T}{\pi \hbar}.
$$
:::

::: proof
因 $\langle m_0, m_1\rangle_{\mathbb{C}} = 0$，有 $\theta_{\mathrm{FS}}(m_0, m_1) = \arccos 0 = \frac{\pi}{2}$。对单位向量三元组 $(m_0, a, m_1)$ 调用富比尼—施图迪球面三角不等式 [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle)，并利用内积模长的对称性 $\theta_{\mathrm{FS}}(m_0, a) = \theta_{\mathrm{FS}}(a, m_0)$，得

$$
\frac{\pi}{2} = \theta_{\mathrm{FS}}(m_0, m_1) \le \theta_{\mathrm{FS}}(a, m_0) + \theta_{\mathrm{FS}}(a, m_1) \le \frac{\mathrm{energy}\cdot\tau}{\hbar} + \frac{\mathrm{energy}\cdot\tau}{\hbar} = \frac{2\cdot\mathrm{energy}\cdot\tau}{\hbar}.
$$

因 $\mathrm{energy} > 0$ 且 $\hbar > 0$，两边同乘 $\frac{\hbar}{2\cdot\mathrm{energy}} > 0$ 即得 $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$。对指标族情形，每一步 $i \in \mathrm{Fin}\,N$ 均由单步定理给出 $\tau(i) \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$；对 $N$ 步求和得 $N \cdot \frac{\pi\hbar}{4\cdot\mathrm{energy}} \le \sum_{i \in \mathrm{Fin}\,N} \tau(i) \le T$，两边同乘 $\frac{4\cdot\mathrm{energy}}{\pi\hbar} > 0$ 遂得 [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)：$N \le \frac{4\cdot\mathrm{energy}\cdot T}{\pi\hbar}$。完整证明由 Lean 内核检查。
:::

[@thm-fubini-study-record-time] 把“经典时间”与“量子时间”的转换关系刻画为一条有条件的几何约束：两段从共同锚态出发的路，各受 $\mathrm{energy}/\hbar$ 的速度界限制，合起来才跨得过正交墙。这里的 $\mathrm{energy}>0$ 是上界参数，不自动等于某个系统的实际能量；只有把制备与演化接上，才能把这幅“正交筹码”的图景用于具体时钟。

定理里的 $\mathrm{energy}$ 是一个抽象的速度参数。把它换成具体哈密顿量的能量涨落，就可以看到这条界什么时候取等、什么时候不取等，以及一个真实的量子比特翻一次墙要多久。

::: {.viz src="speed-limit-zeno" preset="equal" height="500"}
**二能级等权叠加：夹角贴着速度线撞墙。** 画面停在撞墙之前的 $t = 0.9\,\pi\hbar/E$：左边两支各长一半的青色箭头快要首尾相对，琥珀色的点离品红的圆心只剩 $0.16$，首尾相对时两支和为零，点落进圆心；右边青色的夹角曲线一路贴着虚线速度线 $\Delta H\,t/\hbar$，此刻 $81^\circ$，在 $t = \pi\hbar/E$ 撞上品红的 $90^\circ$ 墙。半途的点把它分成 $45^\circ + 45^\circ$ 两段，正是 [@thm-fubini-study-record-time] 取等的情形（[@ex-orthogonalization-times]）。
:::

::: {.example #ex-orthogonalization-times title="把速度极限算到底：二能级取等，三能级不取等，不等权叠加永远到不了墙"}
本例对具体哈密顿量直接计算。用到的两条一般界——Mandelstam–Tamm 界 $\tau_\perp \ge \frac{\pi\hbar}{2\,\Delta H}$ 与 Margolus–Levitin 界 $\tau_\perp \ge \frac{\pi\hbar}{2\langle H\rangle}$——是文献结果，未在本书形式化（见 [@rem-qsl-zeno-literature]）；其中 $\Delta H$ 是能量标准差，$\langle H\rangle$ 是从基态能量算起的平均能量。

**一、二能级等权叠加：取等。** 取能级 $0$ 与 $E$，初态 $\psi(0) = \frac{1}{\sqrt{2}}\bigl(\lvert 0\rangle + \lvert 1\rangle\bigr)$，则 $\psi(t) = \frac{1}{\sqrt{2}}\bigl(\lvert 0\rangle + e^{-iEt/\hbar}\lvert 1\rangle\bigr)$，

$$
\begin{aligned}
\bigl\lvert\langle\psi(0), \psi(t)\rangle\bigr\rvert &= \Bigl\lvert\frac{1 + e^{-iEt/\hbar}}{2}\Bigr\rvert = \Bigl\lvert\cos\frac{Et}{2\hbar}\Bigr\rvert, \\
\theta_{\mathrm{FS}}\bigl(\psi(0), \psi(t)\bigr) &= \frac{Et}{2\hbar} \qquad \Bigl(0 \le t \le \frac{\pi\hbar}{E}\Bigr).
\end{aligned}
$$

首次正交发生在 $\tau_\perp = \frac{\pi\hbar}{E}$。这个态的 $\langle H\rangle = \frac{E}{2}$、$\Delta H = \frac{E}{2}$，所以夹角恰好以速度 $\Delta H/\hbar$ 匀速增长，两条界都等于 $\frac{\pi\hbar}{E}$，同时取等。对照 [@thm-fubini-study-record-time]：取 $m_0 = \psi(0)$、$m_1 = \psi(\tau_\perp)$，锚点 $a = \psi(\tau_\perp/2)$，$\mathrm{energy} = \Delta H = \frac{E}{2}$，$\tau = \frac{\tau_\perp}{2}$。两段夹角都是 $\frac{\pi}{4} = \frac{\mathrm{energy}\cdot\tau}{\hbar}$，前提以等号成立，结论 $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}} = \frac{\pi\hbar}{2E}$ 也以等号成立。

**二、三能级等权叠加：不取等。** 取能级 $0, E, 2E$，初态 $\psi(0) = \frac{1}{\sqrt{3}}\bigl(\lvert 0\rangle + \lvert 1\rangle + \lvert 2\rangle\bigr)$。记 $z = e^{-iEt/\hbar}$，重叠为 $\frac{1}{3}(1 + z + z^2)$，它首次为零是在 $z$ 成为三次本原单位根时：

$$
\tau_\perp = \frac{2\pi\hbar}{3E} \approx 2.0944\,\frac{\hbar}{E} .
$$

能量统计为 $\langle H\rangle = E$、$\langle H^2\rangle = \frac{5}{3}E^2$、$\Delta H = \sqrt{\tfrac{2}{3}}\,E \approx 0.8165\,E$。

| 量 | 数值（单位 $\hbar/E$） |
| :--- | :---: |
| 实际正交时间 $\tau_\perp$ | $2.0944$ |
| Mandelstam–Tamm 界 $\frac{\pi\hbar}{2\,\Delta H}$ | $1.9238$ |
| Margolus–Levitin 界 $\frac{\pi\hbar}{2\langle H\rangle}$ | $1.5708$ |

两条界都成立，都不取等。原因可以算出来：态在射影空间里仍以速度 $\Delta H/\hbar$ 运动，到 $\tau_\perp$ 时走过的弧长是 $\Delta H\,\tau_\perp/\hbar \approx 1.7101$ 弧度，而起点与终点之间的测地线只有 $\frac{\pi}{2} \approx 1.5708$ 弧度。轨道是弯的，多走了约 $8.9\%$。沿途的夹角与弧长（$t$ 以 $\hbar/E$ 为单位，四舍五入到所示位数）：

| $t$ | 重叠 $\lvert\langle\psi(0), \psi(t)\rangle\rvert$ | 夹角 $\theta_{\mathrm{FS}}$（弧度） | 弧长 $\Delta H\,t/\hbar$（弧度） |
| :---: | :---: | :---: | :---: |
| $0.5$ | $0.9184$ | $0.4068$ | $0.4082$ |
| $1.0$ | $0.6935$ | $0.8044$ | $0.8165$ |
| $1.5$ | $0.3805$ | $1.1805$ | $1.2247$ |
| $2.0944$ | $0$ | $1.5708$ | $1.7101$ |

**三、不等权叠加：到不了墙。** 取 $\psi(0) = \cos\alpha\,\lvert 0\rangle + \sin\alpha\,\lvert 1\rangle$（能级仍为 $0, E$，$0 < \alpha \le 45^\circ$）。则

$$
\bigl\lvert\langle\psi(0), \psi(t)\rangle\bigr\rvert^2 = \cos^4\alpha + \sin^4\alpha + 2\cos^2\alpha\,\sin^2\alpha\,\cos\frac{Et}{\hbar} \;\ge\; \cos^2 2\alpha ,
$$

最小重叠是 $\lvert\cos 2\alpha\rvert$，最大夹角是 $2\alpha$。$\alpha = 30^\circ$ 时最多转到 $60^\circ$，$\alpha = 40^\circ$ 时最多转到 $80^\circ$；只有 $\alpha = 45^\circ$ 的等权叠加恰好够到 $90^\circ$。不是每个态都能敲出一声“滴答”：初态在两个能级上的权重不相等，它就永远与自己的过去保留着一份重叠。

**四、为什么只有二能级等权叠加取等。** Margolus–Levitin 界的证明用到不等式 $\cos x \ge 1 - \frac{2}{\pi}(x + \sin x)$（$x \ge 0$）：

| $x$ | $0$ | $\frac{\pi}{2}$ | $\pi$ | $\frac{3\pi}{2}$ | $2\pi$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $\cos x$ | $1$ | $0$ | $-1$ | $0$ | $1$ |
| $1 - \frac{2}{\pi}(x + \sin x)$ | $1$ | $-0.6366$ | $-1$ | $-1.3634$ | $-3$ |

等号只在 $x = 0$ 与 $x = \pi$ 处出现。取等要求每个能量分量在 $\tau_\perp$ 时刻的相位 $E_n\tau_\perp/\hbar$ 都落在这两点上，这正是第一种情形（相位 $0$ 与 $\pi$）；第二种情形的三个相位是 $0, \frac{2\pi}{3}, \frac{4\pi}{3}$，所以严格不取等。

**五、数量级。** 能级差 $E = hf$、$f = 5\,\mathrm{GHz}$ 的量子比特（$E \approx 20.7\,\mu\mathrm{eV}$）自由进动时，等权叠加态的正交时间是

$$
\tau_\perp = \frac{\pi\hbar}{E} = \frac{1}{2f} = 100\,\mathrm{ps} .
$$

按 [@thm-fubini-study-record-time] 的计数上界，取 $\mathrm{energy} = \Delta H = \frac{hf}{2}$，若各步的共同制备、双端位移界与顺序接触预算均满足定理前提，在 $T = 25\,\mathrm{ns}$ 内 $N \le \frac{4\cdot\mathrm{energy}\cdot T}{\pi\hbar} = 4fT = 500$。受驱时情形不同：[第十一章](ch11-pulses-and-virtual-z.md) [@ex-five-ghz-pi-over-two] 在旋转参考系里消去了载频，有效哈密顿量的能量尺度是拉比频率 $\Omega = 2\pi \times 10\,\mathrm{MHz}$，对初态 $\lvert 0\rangle$ 有 $\Delta H = \frac{\hbar\Omega}{2}$，正交时间 $\tau_\perp = \frac{\pi}{\Omega} = 50\,\mathrm{ns}$，正好是那里 $25\,\mathrm{ns}$ 四分之一转的两倍。这两种制备与演化协议的正交时间相差五百倍；应以各协议中产生相对于所选读出参考的演化的能量尺度计算。
:::

::: {.viz src="speed-limit-zeno" preset="three" height="500"}
**三能级等权叠加：弯着走，晚到。** 左边三支青色箭头在 $t = \frac{2\pi}{3}$ 围成三角形，琥珀色的点回到品红的圆心；右边青色曲线弯到虚线速度线下面，速度线在 MT $1.924$ 已到墙，曲线到 $\tau_\perp = 2.094$ 才碰到品红的墙，ML 刻度在 $1.571$。两条界是文献结果，未在本书形式化。
:::

三能级的态虽然晚到，终究碰到了墙；二能级的权重一旦离开等权，比如 $\alpha = 30^\circ$，夹角最多只升到 $2\alpha = 60^\circ$。

::: {.viz src="speed-limit-zeno" preset="unequal" height="500"}
**不等权叠加：到不了墙。** 权重角 $\alpha = 30^\circ$：左边长 $0.75$、短 $0.25$ 的两支青色箭头怎么转也抵消不完，琥珀色的点离品红的圆心最近 $0.5 = \lvert\cos 2\alpha\rvert$；右边夹角最多升到 $2\alpha = 60^\circ$，碰不到品红的墙。
:::


## 7.3 量子芝诺效应：被高频“内积丈量”强行冻结的“外积面积演化” {#sec-quantum-zeno-effect}

反过来问：如果量子态正准备沿着二维平面扫出外积面积 $\vv{A}\wedge\vv{B} = \sin(\omega t/2)\,\vv{I}$，但观察者却像一个焦躁不安的监工，还没等它转满 $90^\circ$ 正交角，就每隔极短的时间 $\delta t = T / N$ 频频掏出初始基准轴 $\vv{A}$ 的幂等投影尺 $P_{\vv{A}}^2 = P_{\vv{A}}$ 对它做一次“内积丈量”，会发生什么？

答案就是量子力学中大名鼎鼎的**量子芝诺效应（Quantum Zeno Effect）**——俗称“被盯着的开水永远烧不开”！

用我们的线面几何来看，芝诺效应的机制连半点玄机都没有：**因为在极短时间 $\delta t = T/N \ll 1$ 内，刚体旋转扫过的外积面积高度是弧长的一阶小量 $\sin(\omega\delta t/2) \approx \frac{\omega T}{2N}$，而投影回初始基准线 $\vv{A}$ 时损失的余弦长度却是二阶小量 $1 - \cos^2(\omega\delta t/2) = \sin^2(\omega\delta t/2) \approx \frac{\omega^2 T^2}{4N^2}$！** 当你用高频内积投影一次次把那丁点刚冒头的一阶外积面积强行拍扁回一维基准线上时，$N$ 次二阶小量加起来只有 $N \times O(N^{-2}) = O(N^{-1}) \to 0$，整个量子演化就被你密不透风的视线硬生生钉死在了原地！

::: {.figure src="ch07-zeno-n"}
**测得越勤，全程留在 $\lvert 0\rangle$ 的概率越接近 $1$。** 横轴是测量次数 $N$（对数刻度），青色的曲线是 $P_N = \bigl[\cos^2\frac{\pi}{2N}\bigr]^N$，青色的点是 $N = 1, 4, 16, 64$，依次为 $0$、$0.531$、$0.857$、$0.962$；灰色虚线是近似式 $1 - \frac{\pi^2}{4N}$，$N$ 越大越贴近青色曲线，缺口按 $\frac{1}{N}$ 缩小。数值由 [@ex-zeno-strobe-freezing] 的解析式算出。
:::

::: {.example #ex-zeno-strobe-freezing title="量子芝诺频闪观测的解析公式与四档频闪（N = 1, 4, 16, 64）数值验算"}
设单量子比特从北极初态 $\lvert 0\rangle$ 出发，在哈密顿量 $H = \frac{\hbar\omega}{2}\sigma_x$ 驱动下绕 $X$ 轴以角速度 $\omega$ 匀速旋转。若在总时长 $T = \pi / \omega$（本应恰好翻转 $180^\circ$ 抵达正交南极态 $\lvert 1\rangle$）内，观察者等间隔地插入 $N$ 次沿初始基 $\lvert 0\rangle\langle 0\rvert$ 的投影测量（步长 $\delta t = \frac{T}{N} = \frac{\pi}{\omega N}$）：

1. **单步留存概率**：经过短短一步 $\delta t$，布洛赫角仅转过 $\delta\theta = \omega\delta t = \frac{\pi}{N}$，按[第二章](ch02-born-rule.md)玻恩半角公式，系统留在初态 $\lvert 0\rangle$ 的概率为
   $$
   p_1 = \cos^2\Bigl(\frac{\omega T}{2N}\Bigr) = \cos^2\Bigl(\frac{\pi}{2N}\Bigr) = 1 - \frac{\pi^2}{4N^2} + O(N^{-4}).
   $$
2. **$N$ 步频闪总留存概率**：连续 $N$ 次投影检测均留在初态 $\lvert 0\rangle$ 的累积概率为
   $$
   P_N(T) = \left[\cos^2\Bigl(\frac{\pi}{2N}\Bigr)\right]^N = \left(1 - \frac{\pi^2}{4N^2} + O(N^{-4})\right)^N = 1 - \frac{\pi^2}{4N} + O(N^{-2}) \;\xrightarrow{\;N \to \infty\;}\; 1!
   $$

下表列出了在 $\omega T = \pi$（不测量时 $100\%$ 翻到 $\lvert 1\rangle$，留存率 $0\%$）下，随着观察者频闪抽检次数 $N$ 倍增，系统被冻结在初态 $\lvert 0\rangle$ 的真实留存率：

| 频闪测量次数 $N$ | 单步旋转角 $\delta\theta = \frac{180^\circ}{N}$ | 单步留存概率 $\cos^2(\frac{\pi}{2N})$ | 全程留存概率 $P_N = [\cos^2(\frac{\pi}{2N})]^N$ | 渐近近似 $1 - \frac{\pi^2}{4N}$ | 几何状态诊断 |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **$N = 1$**（仅终点测） | $180^\circ$ | $0.0000$ | **$0.0000$（$0.0\%$）** | — | 面积完整展开，成功翻越正交墙抵达 $\lvert 1\rangle$ |
| **$N = 4$** | $45^\circ$ | $0.8536$ | **$0.5308$（$53.1\%$）** | $0.3831$ | 过半概率被半途拉回北极 $\lvert 0\rangle$ |
| **$N = 16$** | $11.25^\circ$ | $0.9904$ | **$0.8569$（$85.7\%$）** | $0.8458$ | 外积面积刚露头即被削平，八成以上被冻结 |
| **$N = 64$** | $2.8125^\circ$ | $0.9994$ | **$0.9622$（$96.2\%$）** | $0.9614$ | 高频内积投影将量子旋转强行锁死在北极线 |
:::

::: {.viz src="speed-limit-zeno" preset="strobe4" height="500"}
**频闪 4 次：一半留下。** 箭头每转 $45^\circ$ 被拉回一次，青色的弧是每段走到的地方。画面停在第 $4$ 次测量之前，箭头刚转完这一段：离开线的品红横段长 $\sin 45^\circ \approx 0.71$，是一阶；青色的影子只短了 $1 - \cos 45^\circ \approx 0.29$，是二阶。右边留下的概率每次测量降一截，此刻还剩 $0.531$，而虚线（不看）到 $180^\circ$ 全部走掉。环形标记是 $N = 1, 16, 64$ 的终点（[@ex-zeno-strobe-freezing]）。
:::

[@ex-zeno-strobe-freezing] 只追踪了一条分支：每次探测都回答“还在 $\lvert 0\rangle$”的那一条。同一台频闪探测器还可以记另一本账。从初态 $v$ 出发，每做一步幺正演化 $U$ 就问一次“回到 $v$ 了吗”：回答“是”就停表；回答“否”，状态被投到 $v$ 的正交补上，继续下一步。于是有两列数：恰在第 $n$ 步首次返回的概率，和前 $n$ 步都没有返回的概率。这本账有一条冻结的 Lean 定理，对任意幺正演化都成立。

::: {.definition #def-monitored-return title="受监测的单步演化、返回振幅、返回概率与留存概率" lean="D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitoredStep D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitoredHistory D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.returnAmplitude D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.returnProbability D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.survivalProbability"}
设 $E$ 为完备的复内积空间（`[NormedAddCommGroup E]`、`[InnerProductSpace ℂ E]`、`[CompleteSpace E]`），$U : E \simeq_{\mathrm{li}}[\mathbb{C}] E$ 为线性等距同构，$v \in E$。记 $P_v$ 为到子空间 $\mathbb{C} v$（$v \neq 0$ 时为一维）的正交投影。在模块 `MonitoredReturnConservation` 中：

1. **受监测的单步** [`monitoredStep`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitoredStep) $U\ v = (\mathrm{id} - P_v) \circ U$：先演化一步，再投到“没有返回”的子空间上；
2. **监测历史** [`monitoredHistory`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitoredHistory) $U\ v\ n = (\operatorname{monitoredStep}\ U\ v)^n\, v$：连续 $n$ 次都回答“否”之后的未归一化状态；
3. **返回振幅** [`returnAmplitude`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.returnAmplitude) $U\ v\ n = \bigl\langle v,\ U\bigl(\operatorname{monitoredHistory}\ U\ v\ (n - 1)\bigr)\bigr\rangle$，其中 $n - 1$ 是自然数减法；
4. **返回概率** [`returnProbability`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.returnProbability) $U\ v\ n = \lVert\operatorname{returnAmplitude}\ U\ v\ n\rVert^2$；
5. **留存概率** [`survivalProbability`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.survivalProbability) $U\ v\ n = \lVert\operatorname{monitoredHistory}\ U\ v\ n\rVert^2$。
:::

下面把 $\operatorname{returnProbability}\ U\ v\ n$ 简记为 $p_n$，把 $\operatorname{survivalProbability}\ U\ v\ n$ 简记为 $s_n$。

::: {.proposition #prop-monitored-return-conservation title="受监测返回协议的逐步与有限守恒律" lean="D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation"}
沿用 [@def-monitored-return] 的记号，设 $\lVert v\rVert = 1$（`hv`）。则以下三项同时成立：

1. $s_0 = 1$；
2. 对一切 $n \in \mathbb{N}$：$p_{n+1} = s_n - s_{n+1}$；
3. 对一切 $N \in \mathbb{N}$：

   $$
   \sum_{n=0}^{N-1} p_{n+1} \;+\; s_N \;=\; 1 .
   $$
:::

::: proof
结论 1：零次监测的历史就是 $v$ 本身，范数平方为 $1$。结论 2：把向量 $U\bigl(\operatorname{monitoredHistory}\ U\ v\ n\bigr)$ 沿 $\mathbb{C}v$ 及其正交补作勾股分解（`Submodule.norm_sq_eq_add_norm_sq_starProjection`）。$U$ 是等距，左端的范数平方等于 $s_n$；沿 $\mathbb{C}v$ 的分量由一维投影公式（`Submodule.starProjection_singleton`）与 $\lVert v\rVert = 1$ 认出是返回振幅，范数平方为 $p_{n+1}$；正交补上的分量正是下一步的监测历史，范数平方为 $s_{n+1}$。结论 3 把结论 2 对 $n = 0, \dots, N - 1$ 求和，右端逐项相消（`Finset.sum_range_sub'`），再代入 $s_0 = 1$。完整证明由 Lean 内核检查。
:::

[@prop-monitored-return-conservation] 说的是概率一分不少：前 $N$ 步里首次返回的概率，加上至今没有返回的概率，恰好是 $1$。它不依赖 $U$ 是什么，也不依赖空间的维数。把它用到 [@ex-zeno-strobe-freezing] 的那只旋转比特上，会得到一个与芝诺冻结正好相对的结论。

在讨论平均返回时间之前，先看初态究竟能访问哪些方向。有限维复内积空间 $E$ 中，令 $U$ 为幺正算子，$v\in E$，并记

$$
C=\operatorname{span}_{\mathbb C}\{U^n v:n\in\mathbb N\},
\qquad
P_v=\text{到 }\mathbb C v\text{ 的正交投影}.
$$

$C$ 是这条轨道张成的循环空间。下面两个有限维论证说明：要找永久不响的探测器方向，必须区分 $C$ 内外。

::: {.proposition #rem-monitored-cyclic-observability title="循环空间里没有永久暗态" lean="D5/S3/QuantumChannels/ProjectionDiagnostics/CyclicMonitoredContraction.cyclic_future_kernel_eq_bot"}
沿用上面的有限维复内积空间 $E$、幺正算子 $U$、任意向量 $v\in E$ 及循环空间 $C$。令 $T=(I-P_v)U$。$U$ 保持 $C$，$P_v$ 的像包含在 $C$ 中，因此 $T$ 与 $P_vU$ 均可限制为 $C\to C$ 上的算子

$$
A=T|_C,\qquad B=(P_vU)|_C.
$$

则所有将来都不产生点击的方向组成零子空间：

$$
K=\bigcap_{n\in\mathbb N}\ker(BA^n)=\{0\}.
$$
:::

::: proof
若 $x\in K$，则 $Bx=0$，所以 $Ax=Ux$；把点击历史向前移一步又给出 $Ax\in K$。故 $U$ 保持 $K$。$U|_K$ 是有限维空间上的单射，因而满射，$U^{-1}$ 也保持 $K$。对任意 $x\in K$，可写成 $x=Uy$、$y\in K$，由 $By=P_vUy=0$ 得 $x\perp v$。再沿 $U^{-1}$ 迭代，便有 $x\perp U^nv$ 对每个 $n\ge0$ 成立。$x$ 同时属于这些向量张成的 $C$，只能为零：

$$
K=\{0\}.
$$

这段推导不要求 $v$ 是单位向量；$v=0$ 时 $C=\{0\}$。若不限制到实际循环空间，结论会失效：取 $U=I$、$v=e_1$，与 $e_1$ 正交的非零向量永远不会点击。这里讨论的是循环空间内的可观测性，还没有计算返回概率的无穷和。完整证明由 Lean 内核检查。
:::

::: {.proposition #rem-monitored-cyclic-power-contraction title="实际循环监测算子的严格幂收缩" lean="D5/S3/QuantumChannels/ProjectionDiagnostics/CyclicMonitoredPowerBound.cyclic_power_contraction"}
沿用 [@rem-monitored-cyclic-observability] 的有限维复内积空间 $E$、幺正算子 $U$、循环空间 $C$ 及其上的实际限制算子 $A=((I-P_v)U)|_C$，再设 $\norm v=1$。则存在 $N\in\mathbb N$ 与 $q\in\mathbb R$，使

$$
N\ge1,\qquad 0\le q<1,\qquad \norm{A^N}_{\mathrm{op}}\le q,
$$

其中范数是 $C\to C$ 上的算子范数。
:::

::: proof
记 $d=\dim_{\mathbb C}C\ge1$。对 $x\in C$，投影的勾股分解与 $U$ 的等距性给出

$$
\norm{Ax}^2+\norm{Bx}^2=\norm{x}^2.
$$

令 $K_m=\bigcap_{j=0}^{m-1}\ker(BA^j)$，其中 $K_0=C$。若某一步 $K_m=K_{m+1}$，把历史向前移一步可知 $A$ 保持 $K_m$，从而它已是永久暗空间。上一段证明这个空间为零。因此只要 $K_m\ne\{0\}$，它的维数就必须严格下降；至多 $d$ 步便有 $K_d=\{0\}$。

对任意单位向量 $x\in C$，有限守恒式于是给出

$$
\norm{A^d x}^2
=1-\sum_{j=0}^{d-1}\norm{BA^j x}^2<1.
$$

有限维单位球面紧致，连续函数 $x\mapsto\norm{A^dx}$ 能取到最大值，所以这个最大值也严格小于一。取 $N=d$、$q=\norm{A^d}_{\mathrm{op}}$，得到

$$
N\ge1,\qquad 0\le q<1,\qquad \norm{A^N}_{\mathrm{op}}\le q.
$$

紧致性在这里把“每个方向都有损失”变成“所有方向共享一个严格损失界”。形式证明通过正交坐标把 $A,B$ 化为保守的单通道矩阵系统，复用无暗空间的有限步收缩估计，取同样的 $N=d$ 与 $q=\norm{A^d}_{\mathrm{op}}$。完整证明由 Lean 内核检查。
:::

这个界可以依赖于 $U,v$，并未给出对所有系统统一的收缩常数。关于监测返回的文献背景，见 Grünbaum、Velázquez、Werner 与 Werner，*Recurrence for discrete time unitary evolutions*，arXiv:1202.3903v3，Theorem 2。

::: {.problem #prob-monitored-spectral-mean title="形式化缺口：从实际监测历史到占据谱点数"}
对任意有限维复内积空间、幺正 $U$ 与单位向量 $v$，沿用 [@def-monitored-return] 的 $p_{n+1}=\lvert\langle v,UT^nv\rangle\rvert^2$。定义占据谱集合

$$
S=\{\lambda\in\mathbb C:\exists w\in E,\ Uw=\lambda w\ \text{且}\ \langle w,v\rangle\ne0\}.
$$

需要完成的形式化陈述是：若 $\sum_{n=0}^{\infty}p_{n+1}=1$，则 $S$ 有限，且

$$
\sum_{n=0}^{\infty}(n+1)p_{n+1}=\#S.
$$

这是已知文献定理的形式化缺口，数学上不作为未解决猜想。上面的循环空间与收缩论证仍需连接到算子迹的收敛求和、生存概率尾和到首次返回均值的转换，以及 $\dim C=\#S$；最后一式数的是不同占据谱值，并非本征值的代数重数。有限步守恒或某个正次幂严格收缩，都不能单独替代这条完整结论。
:::

::: {.example #ex-first-return-qubit title="旋转比特的首次返回统计：平均返回时间恒为 2，与步长无关"}
设单比特每一步绕 $X$ 轴转过布洛赫角 $\delta$，即 $U = \cos\frac{\delta}{2}\,I - i\sin\frac{\delta}{2}\,X$，初态 $v = \lvert 0\rangle$。记 $c = \cos\frac{\delta}{2}$，$s = \sin\frac{\delta}{2}$，并设 $s \neq 0$。

**逐步手算。** 第一步：$U\lvert 0\rangle = c\,\lvert 0\rangle - i s\,\lvert 1\rangle$，所以 $p_1 = c^2$，没有返回的分量是 $-is\,\lvert 1\rangle$，$s_1 = s^2$。此后状态在 $\lvert 1\rangle$ 上：$U\lvert 1\rangle = c\,\lvert 1\rangle - is\,\lvert 0\rangle$，每一步以条件概率 $s^2$ 返回，以条件概率 $c^2$ 继续留在 $\lvert 1\rangle$。于是对 $n \ge 1$：

$$
\begin{aligned}
p_1 &= c^2, \\
p_{n+1} &= s^4\,c^{2(n-1)}, \\
s_n &= s^2\,c^{2(n-1)} .
\end{aligned}
$$

逐项核对 [@prop-monitored-return-conservation] 的结论 2：$s_n - s_{n+1} = s^2 c^{2(n-1)}(1 - c^2) = s^4 c^{2(n-1)} = p_{n+1}$。

**总返回概率与平均返回时间。** 用几何级数求和：

$$
\begin{aligned}
\sum_{n \ge 1} p_n &= c^2 + \frac{s^4}{1 - c^2} = c^2 + s^2 = 1, \\
\sum_{n \ge 1} n\,p_n &= c^2 + s^4\cdot\frac{2 - c^2}{(1 - c^2)^2} = c^2 + (2 - c^2) = 2 .
\end{aligned}
$$

平均首次返回时间恰为 $2$ 步，与 $\delta$ 无关。

**数值。**

| 步长 $\delta$ | $p_1$ | $p_2$ | $p_3$ | $s_3$ | $p_1 + p_2 + p_3 + s_3$ | 第一步未返回的概率 $s^2$ | 第一步未返回条件下的平均返回时间 $1 + \frac{1}{s^2}$ | 平均返回时间 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $\frac{\pi}{16}$ | $0.990393$ | $9.23\times10^{-5}$ | $9.14\times10^{-5}$ | $0.009424$ | $1.000000$ | $0.009607$ | $105.09$ | $2.000000$ |
| $\frac{\pi}{4}$ | $0.853553$ | $0.021447$ | $0.018306$ | $0.106694$ | $1.000000$ | $0.146447$ | $7.83$ | $2.000000$ |
| $\frac{\pi}{2}$ | $0.500000$ | $0.250000$ | $0.125000$ | $0.125000$ | $1.000000$ | $0.500000$ | $3.00$ | $2.000000$ |
| $2$ | $0.291927$ | $0.501368$ | $0.146363$ | $0.060343$ | $1.000000$ | $0.708073$ | $2.41$ | $2.000000$ |

$\delta = \frac{\pi}{4}$ 一行的 $p_1 = 0.853553$ 就是 [@ex-zeno-strobe-freezing] 中 $N = 4$ 的单步留存概率。各行的守恒和与均值已用数值模拟核对（迭代 $4000$ 步）。

**读法。** 步长越小，第一步就返回的概率越接近 $1$，这是芝诺冻结；可是万一第一步没有返回（概率 $s^2$），回来平均要再等 $\frac{1}{s^2}$ 步。两者相乘恰好补回 $1$ 步：$c^2\cdot 1 + s^2\cdot\bigl(1 + \frac{1}{s^2}\bigr) = 2$。探测得再勤，改变的只是分布的形状，改变不了均值。

**一般情形（文献结果，未在本书形式化）。** Grünbaum、Velázquez、Werner 与 Werner（Commun. Math. Phys. **320**, 543, 2013）证明：对有限维情形，只要返回是必然的，平均首次探测返回时间就取整数值，等于初态在 $U$ 的本征子空间上有非零分量的不同本征值的个数。本例中这个数是 $2$。对 $3$ 维与 $4$ 维的随机幺正所作的数值模拟给出均值 $3.000000$ 与 $4.000000$。
:::

::: {.viz src="speed-limit-zeno" preset="mean" height="500"}
**首次返回：平均恒为 2 步。** $\delta = 45^\circ$，每根柱子是又走一步之后的账目：青色是已经返回的概率，品红是还没回来的概率，每一根都恰好到 $1$ 这条线（[@prop-monitored-return-conservation]）。品红的总面积就是平均返回时间，随着步数从 $1$ 涨向 $2$（[@ex-first-return-qubit]）。品红的虚线台阶是步长 $\delta = 90^\circ$ 的同一本账：第一步就回来一半，形状完全不同，品红面积同样走到 $2$。
:::

芝诺效应说，看得够勤，状态就走不掉。首次返回的账目补上了另一半：看得再勤，平均两步回来一次这件事也不会变，因为它数的不是时间，而是这只比特一共有几个方向可去。

::: {.viz src="speed-limit-zeno" height="560"}
**速度极限与芝诺频闪：完整实验室。** 三个场景共用一条时间轴：重叠与夹角（换能级个数与权重）、布洛赫球上的频闪（换 $N$）、首次返回的账目（换步长 $\delta$）。
:::

## 7.4 观察者注意力与标量自由能记账判据：何时读出粒子节拍，何时计入热力学代价？ {#sec-observer-attention-freeze}

请把 7.2 节的“量子速度极限”与 7.3 节的“量子芝诺效应”放在一起对比，再读一遍本章开篇的第二句原话：

> *“把观察者内生放进来思考,何时粒子、何时波,似乎是观察者的注意力问题”*

这句话是对投影测量节奏的直观概括：

- 如果观察者**放慢采样频率**（或者把注意力从路径记录上移开，让 $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$），量子态就有充裕的时间在二维平面里舒展它的**外积波动面积** $\vv{A}\wedge\vv{B}$，展现出完整的波干涉与幺正旋转；
- 如果观察者**拉高采样频率**（把注意力死死盯在固定基轴上，以 $\delta t \ll \frac{\hbar}{\mathrm{energy}}$ 的高频不断索取非此即彼的粒子读数），二维外积面积就会被一次次强行捏合成一维**内积粒子线**，系统便表现为一颗被钉在初始基方向上的“粒子”。

需要严格区分的是：7.3 节的投影芝诺效应是高频投影测量造成的动力学留存机制；而在热力学账本层面，我们还常常关心另一件独立的事——当一个候选过程需要付出被动能量代价（passive energy shift）$\Delta E_{\mathrm{pass}} > 0$ 并伴随熵税（entropy tax）$\Delta S \in \mathbb{R}$ 时，在环境逆温度 $\beta = 1/(k_B T) > 0$ 下，它的**标量自由能记账净余量（scalar free-energy / freeze deposit）**何时为正？在 Lean 模块 `QuantumChannels/DecoherenceFreeze` 中，我们定义了这枚标量自由能记账量 [`freezeDeposit`](lean:D5/S3/QuantumChannels/DecoherenceFreeze.freezeDeposit)：

$$
D_{\mathrm{freeze}}(\beta, \Delta S, \Delta E_{\mathrm{pass}}) := \Delta E_{\mathrm{pass}} - \frac{\Delta S}{\beta},
$$

以及**临界逆温度（critical inverse temperature）** [`criticalInverseTemperature`](lean:D5/S3/QuantumChannels/DecoherenceFreeze.criticalInverseTemperature)：

$$
\beta_c(\Delta S, \Delta E_{\mathrm{pass}}) := \frac{\Delta S}{\Delta E_{\mathrm{pass}}}.
$$

下面的定理给出了一个**标量自由能记账阈值判据**：对正标量 $\beta > 0$ 与 $\Delta E_{\mathrm{pass}} > 0$，净自由能余量 $D_{\mathrm{freeze}} = \Delta E_{\mathrm{pass}} - \Delta S/\beta$ 严格为正，当且仅当逆温度 $\beta$ 严格高于临界比值 $\beta_c = \Delta S/\Delta E_{\mathrm{pass}}$。（注：该定理在 Lean 中仅证明这一标量代数等价关系本身；在未额外引入具体热浴动力学或势垒演化模型前，不应单凭该标量不等式宣称系统动力学演化被自动锁死或退相干被动力学抑制。）

::: {.figure src="ch07-freeze-threshold"}
**记账余量为正，当且仅当 $\beta$ 越过 $\beta_c = \Delta S/\Delta E_{\mathrm{pass}}$。** 取 $\Delta E_{\mathrm{pass}} = 1$：斜线 $\Delta S = \beta\,\Delta E_{\mathrm{pass}}$ 上 $D_{\mathrm{freeze}} = 0$，斜线下方的青色区里 $D_{\mathrm{freeze}} > 0$，上方的品红区里 $D_{\mathrm{freeze}} < 0$。琥珀色的虚线固定 $\Delta S = \frac{1}{2}$ 向右走，在 $\beta_c = \frac{1}{2}$ 穿过斜线进入青色区（[@thm-decoherence-freeze-critical]）。图只画这条标量不等式，不涉及任何动力学。
:::

::: {.theorem #thm-decoherence-freeze-critical title="标量自由能记账余量为正的临界逆温度充要判据" lean="D5/S3/QuantumChannels/DecoherenceFreeze.decoherence_freeze_iff_above_critical"}
设逆温度参数 $\beta \in \mathbb{R}$ 满足 $\beta > 0$，被动能量差 $\Delta E_{\mathrm{pass}} \in \mathbb{R}$ 满足 $\Delta E_{\mathrm{pass}} > 0$，熵税参数为 $\Delta S \in \mathbb{R}$。定义标量记账余量与临界逆温度分别为（[`freezeDeposit`](lean:D5/S3/QuantumChannels/DecoherenceFreeze.freezeDeposit)、[`criticalInverseTemperature`](lean:D5/S3/QuantumChannels/DecoherenceFreeze.criticalInverseTemperature)）

$$
D_{\mathrm{freeze}}(\beta, \Delta S, \Delta E_{\mathrm{pass}}) := \Delta E_{\mathrm{pass}} - \frac{\Delta S}{\beta}, \qquad \beta_c(\Delta S, \Delta E_{\mathrm{pass}}) := \frac{\Delta S}{\Delta E_{\mathrm{pass}}}.
$$

则标量记账余量严格为正，当且仅当逆温度 $\beta$ 严格高于临界逆温度 $\beta_c$：

$$
0 < D_{\mathrm{freeze}}(\beta, \Delta S, \Delta E_{\mathrm{pass}}) \;\Longleftrightarrow\; \beta_c(\Delta S, \Delta E_{\mathrm{pass}}) < \beta.
$$
:::

::: proof
按定义展开左端不等式：$0 < \Delta E_{\mathrm{pass}} - \frac{\Delta S}{\beta}$ 等价于 $\frac{\Delta S}{\beta} < \Delta E_{\mathrm{pass}}$。因题设 $\beta > 0$ 且 $\Delta E_{\mathrm{pass}} > 0$，在不等式 $\frac{\Delta S}{\beta} < \Delta E_{\mathrm{pass}}$ 两端同乘正数 $\frac{\beta}{\Delta E_{\mathrm{pass}}} > 0$ 不改变不等号方向，这当且仅当 $\frac{\Delta S}{\Delta E_{\mathrm{pass}}} < \beta$，即 $\beta_c(\Delta S, \Delta E_{\mathrm{pass}}) < \beta$。同理，由同一线性重排可知在临界点处 $D_{\mathrm{freeze}} = 0 \iff \beta = \beta_c$，在高温区 $D_{\mathrm{freeze}} < 0 \iff \beta < \beta_c$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-qsl-zeno-literature title="Mandelstam–Tamm、Margolus–Levitin 动力学速度极限与 Misra–Sudarshan 芝诺定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本章的 [@thm-fubini-study-record-time] 在 Lean 4 中从富比尼—施图迪球面三角不等式 [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle) 出发，将单步角位移上界 $\theta_{\mathrm{FS}}(a, m_k) \le \mathrm{energy}\cdot\tau/\hbar$ 作为显式输入条件，严格导出了正交记录分辨时间下界 $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$ 与记录步数上界 $N \le \frac{4\cdot\mathrm{energy}\cdot T}{\pi\hbar}$。下面先从薛定谔演化推导自治纯态的全局角位移界，再列出相关经典文献与芝诺极限的适用边界。

**自治轨道：从二能级到任意有限维。** [@ex-orthogonalization-times] 的二能级轨道已经把机制摆在眼前：在能量基底中，$A=\begin{pmatrix}0&0\\0&E\end{pmatrix}$，初态是等权叠加，演化只是第二个分量乘上 $e^{-iEt/\hbar}$。去掉平均能量 $\mu=E/2$ 产生的共同相位后，两个分量以相反相位转动，涨落为 $\Delta=E/2$。到第一次正交为止，夹角等于 $\Delta t/\hbar$；越过那里，$\arccos|\cos(Et/(2\hbar))|$ 折返，走过的路长却继续增加。全局速度界约束的是任意时刻的端点夹角，不要求夹角永远单调增长。

现在取任意有限维复内积空间 $E$、自伴连续复线性算子 $A:E\to E$、单位初态 $\psi$ 与 $\hbar>0$。这里 $E$ 表示空间，不再表示上例的能级差。内积对第二个变量线性。定义同一次制备中的平均能量、中心涨落及实际演化：

$$
\begin{aligned}
\mu&=\operatorname{Re}\langle\psi,A\psi\rangle,\\
\Delta&=\norm{A\psi-(\mu:\mathbb C)\psi},\\
\psi_t&=\exp\!\left(\frac{-it}{\hbar}A\right)\psi
\qquad(t\in\mathbb R).
\end{aligned}
$$

自伴性使能量期望为实数，且 $\Delta^2=\langle\psi,A^2\psi\rangle-\mu^2$；因此 $\Delta$ 正是这个哈密顿量在这个初态中的能量标准差，不是算子范数。经典 Mandelstam–Tamm 夹角界为

$$
\arccos\bigl|\langle\psi,\psi_t\rangle\bigr|
\le \frac{|t|\Delta}{\hbar}
\qquad\text{对所有 }t\in\mathbb R.
$$

这里的射影夹角就是 $\arccos$ 重叠模长，不额外乘 $2$。可参见 S. Deffner 与 S. Campbell，*Quantum speed limits: from Heisenberg's uncertainty principle to optimal quantum control*，J. Phys. A: Math. Theor. **50**, 453001 (2017)，[arXiv:1705.08023v2](https://arxiv.org/abs/1705.08023v2) §2.5，式 (23)、(28)–(33)，[DOI:10.1088/1751-8121/aa86c6](https://doi.org/10.1088/1751-8121/aa86c6)。下面将其自治纯态特例的推导展开，连同端点一并处理。

**去掉不改变射影态的相位。** 令 $I$ 为恒等算子，取

$$
\begin{aligned}
B&=A-\mu I,& G&=-iB/\hbar,\\
v(t)&=e^{tG}\psi,& w(t)&=v'(t)=Gv(t),\\
c&=\Delta/\hbar.&
\end{aligned}
$$

$B$ 自伴，$G^*=-G$，故 $e^{tG}$ 幺正，并且与 $B$ 对易。因此

$$
\begin{aligned}
\norm{v(t)}&=1,\\
\norm{w(t)}&=\norm{e^{tG}G\psi}=c,\\
\langle v(t),w(t)\rangle
&=-\frac{i}{\hbar}\langle\psi,B\psi\rangle=0.
\end{aligned}
$$

最后一个等式说明速度没有沿态本身的相位分量：这是水平运动；前两个等式说明它在单位球面上以恒速 $c$ 行进。

**把速度投到实重叠上。** 记 $r(t)=\operatorname{Re}\langle\psi,v(t)\rangle$，则 $-1\le r(t)\le1$，$r(0)=1$。把复空间看成实内积空间，$\psi-r(t)v(t)$ 是去掉沿 $v(t)$ 的实投影后的剩余向量，且

$$
\norm{\psi-r(t)v(t)}^2=1-r(t)^2.
$$

由于 $\langle v,w\rangle=0$，柯西—施瓦茨不等式给出

$$
\begin{aligned}
|r'(t)|
&=\bigl|\operatorname{Re}\langle\psi-r(t)v(t),w(t)\rangle\bigr|\\
&\le c\sqrt{1-r(t)^2}.
\end{aligned}
$$

**端点也能通过的积分。** 直接对 $\arccos r$ 求导会在 $r=\pm1$ 时出现零分母。先固定 $0\le q<1$，改看 $f_q(t)=\arccos(qr(t))$。分母处处严格为正，且

$$
\begin{aligned}
|f_q'(t)|
&=\frac{q|r'(t)|}{\sqrt{1-q^2r(t)^2}}\\
&\le c\frac{q\sqrt{1-r(t)^2}}{\sqrt{1-q^2r(t)^2}}
\le c.
\end{aligned}
$$

末步来自 $q^2(1-r^2)\le1-q^2r^2$，即 $q^2\le1$。在 $0$ 与任意实数 $t$ 之间应用中值定理，得

$$
|f_q(t)-f_q(0)|\le c|t|,
\qquad f_q(0)=\arccos q.
$$

取 $q=n/(n+1)$（$n\in\mathbb N$）并令 $n\to\infty$，由 $\arccos$ 在闭区间 $[-1,1]$ 上连续，得 $\arccos r(t)\le c|t|$。这一步没有在球面端点除法，也没有预设要证明的角位移界。

**还原实际哈密顿演化。** 因为 $A=B+\mu I$，

$$
\begin{aligned}
\psi_t&=e^{-i\mu t/\hbar}v(t),\\
r(t)&\le|\langle\psi,v(t)\rangle|
=|\langle\psi,\psi_t\rangle|.
\end{aligned}
$$

标量相位的模为 $1$；再用 $\arccos$ 的单调递减性，便得到所述全局界。它包含 $t=0$、负时间、任意大的实时间以及重叠模长为 $0$ 或 $1$ 的情形。左端始终在 $[0,\pi/2]$ 中；长时间时右端可以超过 $\pi/2$，无须截短时间域。若 $\Delta=0$，则 $B\psi=0$，$v(t)=\psi$，实际演化只剩共同相位，射影夹角恒为零，永远不能正交。若 $\Delta>0$，并在非负物理时长 $\tau_\perp$ 达到正交，则

$$
\tau_\perp\ge\frac{\pi\hbar}{2\Delta}.
$$

**怎样接到条件记录时间定理。** [@thm-fubini-study-record-time] 需要从同一个单位锚态 $a$ 到两个正交末态 $m_0,m_1$ 的两条位移界。一个充分的具体实现是：对每个 $k=0,1$，分别指定有限维空间上的自治自伴哈密顿量 $A_k$，从共同制备的初态 $a$ 出发，在时刻 $t_k$ 到达 $m_k$（允许相差单位模相位），并且

$$
\begin{aligned}
\mu_k&=\operatorname{Re}\langle a,A_ka\rangle,\\
\Delta_k&=\norm{A_ka-\mu_k a}\le\mathrm{energy},\\
|t_k|&\le\tau,\qquad \mathrm{energy}>0.
\end{aligned}
$$

本评注的界于是逐端给出 $\theta_{\mathrm{FS}}(a,m_k)\le\mathrm{energy}\cdot\tau/\hbar$。再加上两个末态确实正交，条件定理才给出 $\tau\ge\pi\hbar/(4\cdot\mathrm{energy})$。只把两个公式的符号改成一样，或只挑一个几何中点，并不能保证这些轨道、制备与共同资源界存在。上例的等权二能级轨道提供了这样的特定实现：以轨道中点为锚，两个端点位于相反的半程，$\tau=\tau_\perp/2$；因而半程的 $\pi/4$ 与全程的 $\pi/2$ 相容。

记录计数还独立需要总接触预算 $\sum_i\tau(i)\le T$；物理上用顺序且不重叠的接触区间来保证它时，应另行核对，不能从角位移界推出。这里得到的是给定有限维自治哈密顿量的文献速度界，不是任意开放、受驱或无界动力学的结论，也不是普适时钟滴答律。它不计算受监测的完整首次返回均值，也不补足 [@prob-monitored-spectral-mean] 中的谱计数与算子求和步骤。

1. **Mandelstam–Tamm 能量方差速度极限（L. Mandelstam & I. Tamm, 1945）**：*The uncertainty relation between energy and time in non-relativistic quantum mechanics*（J. Phys. USSR **9**, 249–254, 1945）及 Anandan–Aharonov 的射影几何表述（Phys. Rev. Lett. **65**, 1697, 1990）是上述推导的经典背景。轨道的路长速度是 $\Delta H/\hbar$；一般轨道不必沿测地线运动，但端点测地线夹角不超过路长。Deffner–Campbell 综述的精确定位已列于上文。
2. **Margolus–Levitin 平均能量速度极限（N. Margolus & L. B. Levitin, 1998）**：在 *The maximum speed of dynamical evolution*（Physica D **120**, 188–195, 1998）中，利用三角不等式 $\cos x \ge 1 - \frac{2}{\pi}(x + \sin x)$ 对谱展开求界，证明了相对于基态零点能 $E_0 = 0$ 的平均能量 $\langle H\rangle$ 同样限制正交演化时间：
   $$
   \tau_\perp \ge \frac{\pi\hbar}{2\,\langle H\rangle}.
   $$
3. **Misra–Sudarshan 量子芝诺定理（B. Misra & E. C. G. Sudarshan, 1977）**：在有限维（或有界自伴 $H$）与正交投影 $P$ 的有界特例中，等间隔投影测量次数 $N \to \infty$ 时可得到强收敛公式 $\lim_{N\to\infty} (P e^{-iHT/\hbar N} P)^N = P e^{-i(PHP)T/\hbar} P$，从而在该特例中阻断向正交补空间 $I-P$ 的跃迁。无界情形需要额外的定义域、半有界性和强极限存在条件；仅有有限能量期望并不足以推出这个一般结论。

上述连续时间积分界与强算子拓扑极限作为物理文献背景列出，不计入本书的 Lean 形式化验证账本。
:::

现在，我们已经看清了时间二象性的前半章：只要外积面积 $\vv{A}\wedge\vv{B}$ 还在幺正旋转，量子时间就是双向可逆的；一旦观察者用内积投影尺 $P$ 去切下离散的经典时间刻度，外积相干面积就被压扁成了对角粒子线。

但请紧接着问最后一个、也是最致命的问题：**被压扁的那块二维相干面积，真的能白白消失吗？为什么一旦写下了经典时间刻度，时间就突然长出了一支只能向前、不能倒流的“热力学单向箭头”？** 让我们翻开第二部的收官之章——[第八章](ch08-erasure-and-time-arrows.md)。
