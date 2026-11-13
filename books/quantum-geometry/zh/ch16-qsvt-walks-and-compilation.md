# 算法大一统（QSVT）、图上游走与门编译的因式约分

> *“P/NP 跟初始结构相关，有的初始结构可以推出 P=NP 处理无穷问题的本质就是进行因式分解，看如何把无穷 “约掉 ” ，本质不断的用已知关于无穷的结论构造，约 P/NP 跟查表算法，顺序，记忆顺序有关，全部用量子门计数最核心的问题其实是证明一个命题的通用方式”*

在[第十五章](ch15-grover-qft-and-period-finding.md)的收尾处，我们留下了一个统摄全局的几何追问：为什么从 Grover 搜索到量子相位估计，几乎所有量子算法都在交替执行“酉块嵌入”与“受控相位旋转”？在本章——第四部“高维球体——纠缠、拓扑与量子算法”的收官之章——我们将从代数递推、图上游走与离散门编译三个维度完成这场收束（注：章首题记中关于 `P/NP`、初始结构与门计数的论述仅作为作者关于计算结构与量子门计数的原始哲学思考引文，本书不声称解决数学上悬而未决的 $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$ 问题）。

我们将依次证明与剖析四项核心事实：

1. **切比雪夫（Chebyshev）多项式递推的代数母体**：在任意交换环 $R$ 中，任何满足 $ab = 1$ 的互逆对 $(a, b)$ 的幂和 $t_m = a^m + b^m$ 都天然服从二阶线性递推 $t_{m+2} = (a+b)t_{m+1} - t_m$；把这根标量脊梁放进 $\mathrm{SU}(2)$ 二维信号块 $W(x)$，便是量子奇异值变换（QSVT）用旋转门拼出多项式滤波器的代数起点；
2. **离散量子游走的对称硬币极值与适用边界**：在循环图 $\mathrm{ZMod}\,p$ 的 Hadamard 量子游走中，正交对称硬币 $c_* = (1, i)/\sqrt{2}$ 在一切步数 $n$ 与圈长 $p$ 下最大化全体模式的单激发 W 态几何纠缠；但相干游走的加速严格依赖于图对称性与问题结构，绝非对任意迷宫都能消除所有回头路；
3. **两轴连续旋转生成与离散 $\{H, T\}$ 门集的三维割圆多面体**：在连续正交群 $\mathrm{SO}(3)$ 中，绕两根不共线轴的连续轴圆经有限步乘积即可精确到达任意三维旋转；然而一旦落回真实量子计算机的有限离散门集 $\{H, T\}$，在任意有限门长预算 $L < \infty$ 下，固定初态的可达点集 $\mathcal{S}_L \subset S^2$ 张成的凸包 $P_L = \operatorname{conv}(\mathcal{S}_L)$ 永远只是一座由平直弦面拼接而成的**三维割圆多面体**，球皮与弦面之间恒存在严格为正的逼近残差 $\varepsilon_L > 0$；
4. **精确振幅放大的源查询计数与渐近门编译的区分**：当已知初始成功概率 $p$ 时，借助辅助硬币旋转调慢步长，可以用至多 $\frac{\pi/2 + 2}{\sqrt{p}}$ 次源算子查询实现零残差的精确振幅放大；同时我们将严格区分这一“源查询次数（`sourceQueries`）”与 $\{H, T\}$ 离散门集的渐近门编译字长（详见章末 [@rem-solovay-kitaev-literature]）。

::: {.figure src="ch16-overview"}
**图 16。** 本章地图：面板 I，区间 $[-1, 1]$ 上青色的切比雪夫多项式 $T_3(x) = 4x^3 - 3x$ 在 $-1$ 与 $1$ 之间来回摆动，灰色的直线是 $T_1(x) = x$；面板 II，从北极出发、长度不超过 $6$ 的 $\{H, T\}$ 门字落在球面上的 $19$ 个青色顶点，它们的凸包用平直的弦面包住球心，与球皮之间留着缝；面板 III，青色的阶梯是精确振幅放大的源查询次数 $2n + 1$，始终在绿色的上界 $(\pi/2 + 2)/\sqrt{p}$ 之下（[@cor-exact-source-query-count]），三个点是本章表格里的 $3$、$7$、$13$。
:::

## QSVT：二维块与切比雪夫递推 {#sec-qsvt-chebyshev-blocks}

为什么当代量子算法可以把搜索、特征值过滤、哈密顿量模拟与矩阵求逆统统归结为“对矩阵的奇异值做多项式变换”？因为在幺正算子的世界里，最自然的标量输入不是任意实数，而是落在 $[-1, 1]$ 区间内的投影余弦 $x = \cos\theta$；而当一个二维旋转块被反复迭代 $m$ 次时，角度从 $\theta$ 翻倍为 $m\theta$，投影余弦 $\cos(m\theta)$ 就自动生成了第 $m$ 阶**第一类切比雪夫多项式** $T_m(x) = \cos(m\arccos x)$！

从最底层的代数学来看，切比雪夫三项递推关系根本不需要三角函数或复分析，它直接源于任意交换环 $R$ 中满足乘积为 $1$（$ab = 1$）的两个元素 $a, b \in R$ 的幂和恒等式。源码模块 `D5/S1/Recurrence/NormOneTraceAddition.lean` 在零分析前提下证明了这一交换环迹递推定理。

::: {.theorem #thm-chebyshev-trace-recurrence title="交换环中单位乘积元素对的二阶幂和递推定理" lean="D5/S1/Recurrence/NormOneTraceAddition.trace_recurrence"}
设 $R$ 为任意交换环，$a, b \in R$ 满足 $a \cdot b = 1$，$m \in \mathbb{N}$ 为任意自然数。则 $a, b$ 的幂和满足二阶线性递推恒等式：

$$
a^{m + 2} + b^{m + 2} = (a + b)\bigl(a^{m + 1} + b^{m + 1}\bigr) - (a^m + b^m).
$$
:::

::: proof
在交换环 $R$ 中，按乘法分配律与交换律直接展开右端第一项：

$$
\begin{aligned}
(a + b)\bigl(a^{m + 1} + b^{m + 1}\bigr)
&= a^{m + 2} + a b^{m + 1} + b a^{m + 1} + b^{m + 2} \\
&= a^{m + 2} + b^{m + 2} + (a \cdot b)\bigl(a^m + b^m\bigr).
\end{aligned}
$$

将前提 $a \cdot b = 1$ 代入交叉项，得 $(a \cdot b)(a^m + b^m) = 1 \cdot (a^m + b^m) = a^m + b^m$。再减去右端第二项 $(a^m + b^m)$，交叉项精确抵消，立得 $a^{m + 2} + b^{m + 2}$。完整证明由 Lean 内核检查。
:::

让我们亲手架起从 [@thm-chebyshev-trace-recurrence] 的交换环标量递推通往二维量子信号处理块的几何桥梁（见图 16 面板 I）：

记 $t_m = a^m + b^m$（$ab = 1$），则初值为 $t_0 = a^0 + b^0 = 2$、$t_1 = a + b$，递推律为 $t_{m+2} = (a+b)t_{m+1} - t_m$。现在取交换环 $R = \mathbb{C}$，对任意信号参数 $x = \cos\theta \in [-1, 1]$，令 $a = e^{i\theta}$、$b = e^{-i\theta}$，则显然满足 $ab = e^{i\theta}e^{-i\theta} = 1$ 且 $a + b = 2\cos\theta = 2x$。此时 $t_m = e^{im\theta} + e^{-im\theta} = 2\cos(m\theta) = 2 T_m(x)$，两边同除以 $2$ 即得切比雪夫多项式递推：

$$
T_0(x) = 1, \qquad T_1(x) = x, \qquad T_{m+2}(x) = 2x\,T_{m+1}(x) - T_m(x).
$$

这里取 $\theta = \arccos x \in [0, \pi]$。在二维量子电路中，考察以 $x \in [-1, 1]$ 为左上角块编码的 $\mathrm{SU}(2)$ 信号旋转矩阵

$$
W(x) = \begin{pmatrix} x & i\sqrt{1 - x^2} \\ i\sqrt{1 - x^2} & x \end{pmatrix} = \begin{pmatrix} \cos\theta & i\sin\theta \\ i\sin\theta & \cos\theta \end{pmatrix} = \exp(i\theta \sigma_X) \in \mathrm{SU}(2).
$$

它的两个特征值恰为 $a = e^{i\theta}$ 与 $b = e^{-i\theta}$（满足 $\det W(x) = ab = 1$，$\Tr W(x) = a + b = 2x$），因此每将 $W(x)$ 迭代乘 $m$ 次，其左上角矩阵元便直接吐出 $T_m(x) = \cos(m\theta)$！

::: {.figure src="ch16-chebyshev-shadows"}
**转 $m$ 次，影子就是 $T_m(x)$。** 取 $x = \cos\theta = \frac{1}{2}$（$\theta = 60^\circ$）：四支箭头依次转过紫色的角 $\theta$，停在 $0^\circ$、$60^\circ$、$120^\circ$ 与琥珀色的 $180^\circ$；它们落在横轴上的青色影子依次是 $T_0 = 1$、$T_1 = \frac{1}{2}$、$T_2 = -\frac{1}{2}$、$T_3 = -1$，与 [@thm-chebyshev-trace-recurrence] 的递推逐项相符。两条紫色虚线把第 $0$ 支与第 $2$ 支箭头补成菱形，对角线是第 $1$ 支箭头的 $2\cos\theta = 2x$ 倍（这里正好落在它的尖端上），影子随之给出 $T_0 + T_2 = 2xT_1$，即 $1 - \frac{1}{2} = 2 \cdot \frac{1}{2} \cdot \frac{1}{2}$。
:::

**严格的理论边界**：必须明确指出，[@thm-chebyshev-trace-recurrence] 的前提仅涉及任意交换环 $R$ 中的标量对 $ab = 1$，完全不包含矩阵块编码、奇异值谱或相位角序列的假设；将标量递推接到二维旋转块 $W(x) \in \mathrm{SU}(2)$ 是上述显式手算桥接，而非由 [@thm-chebyshev-trace-recurrence] 直接证出完整的量子奇异值变换（QSVT）定理。尤其不能误以为仅凭该递推就能把“任意多项式”塞进量子电路（完整 QSVT 的多项式可实现性定理详见下文 [@rem-qsvt-walks-literature]）。

## 图上游走：相干叠加与适用边界 {#sec-quantum-walk-interference}

当量子态不再停留在单个二维旋转块内，而是携带一枚二能级“硬币（coin）”在图的顶点之间做相干转移时，我们就进入了**离散时间量子游走（Discrete-Time Quantum Walk）**的世界。

在源码模块 `D5/S3/Quantum/Walks/SymmetricCoinMaximalWalkEntanglement.lean` 中，游走舞台设为具有 $p$ 个顶点的有限循环圈图 $\mathrm{ZMod}\,p$（$p \in \mathbb{N}$，$1 \le p$），硬币空间为二元类型 $\mathrm{Fin}\,2$。单步 Hadamard 游走演化算子 `hadamardStep p` 作用在联合波函数 $\psi : \mathrm{Fin}\,2 \times \mathrm{ZMod}\,p \to \mathbb{C}$ 上，精确定义为

$$
\mathrm{hadamardStep}(p)(\psi)(j) = \begin{cases}
\dfrac{\psi(0, j.2 + 1) + \psi(1, j.2 + 1)}{\sqrt{2}} & \text{若 } j.1 = 0, \\[8pt]
\dfrac{\psi(0, j.2 - 1) - \psi(1, j.2 - 1)}{\sqrt{2}} & \text{若 } j.1 = 1.
\end{cases}
$$

对于初始局域在原点 $j.2 = 0$、硬币处于旋量 $c : \mathrm{Fin}\,2 \to \mathbb{C}$ 的初态，演化 $n \in \mathbb{N}$ 步后的游走波函数定义为

$$
\mathrm{walkState}(p, n, c) = \bigl(\mathrm{hadamardStep}(p)\bigr)^{[n]}\bigl(j \mapsto \text{if } j.2 = 0 \text{ then } c(j.1) \text{ else } 0\bigr),
$$

其中单位硬币旋量条件 `UnitSpinor c` 定义为 $\sum_{b \in \mathrm{Fin}\,2} \mathrm{Complex.normSq}(c_b) = |c_0|^2 + |c_1|^2 = 1$，而正交对称硬币旋量定义为

$$
\mathrm{cStar} = c_* = \begin{pmatrix} 1/\sqrt{2} \\ i/\sqrt{2} \end{pmatrix}.
$$

::: {.viz src="walk-spreading" preset="fifty" height="500"}
**同一个原点，两种走法；走 50 步，宽度差近四倍。** 从原点出发、硬币取 $c_*$，按上面的单步规则走 $50$ 步：上方青色的量子分布左右对称，两个尖峰已经跑到 $\pm 34$，全都落在虚线 $\pm 50$ 之内；下方灰色的经典随机游走只铺开到 $\pm 7$ 左右。量子宽度 $\sigma = 27.07$，经典 $\sigma = \sqrt{50} = 7.07$。
:::
为了衡量 $n$ 步游走波函数在全部位置与硬币模式 $\iota = \mathrm{Fin}\,2 \times \mathrm{ZMod}\,p$ 上展开的多模相干纠缠度，源码将归一化模式振幅 $\lambda : \iota \to \mathbb{C}$ 映射为全体模式上的单激发 W 态 $\mathrm{wState}(\lambda)$（在布尔占据配置 $s : \iota \to \mathrm{Bool}$ 上，当且仅当恰好仅有一个模式 $k \in \iota$ 为 `true` 时取振幅 $\lambda_k$，其余配置取 $0$），定义逐模式乘积态 $\mathrm{productState}(z)(s) = \prod_{k \in \iota} z_k(\text{if } s_k \text{ then } 1 \text{ else } 0)$（其中每个局部因子 $z_k$ 满足 `UnitSpinor (z k)`，记作 `unitFactors z`），并以模式振幅 $\lambda : \iota \to \mathbb{C}$ 为第一宗量、局部旋量族 $z : \iota \to \mathrm{Fin}\,2 \to \mathbb{C}$ 为第二宗量定义内积重叠辅助函数及最大重叠模平方：

$$
\begin{aligned}
\mathrm{overlap}(\lambda, z) &= \sum_{s : \iota \to \mathrm{Bool}} \overline{\mathrm{productState}(z, s)}\,\mathrm{wState}(\lambda, s), \\
\mathrm{gMax}(\lambda) &= \sup\Bigl\{\,\mathrm{Complex.normSq}\bigl(\mathrm{overlap}(\lambda, z)\bigr) \;\Big|\; \mathrm{unitFactors}(z)\,\Bigr\}, \qquad
\mathrm{geometricEntanglement}(\lambda) = 1 - \mathrm{gMax}(\lambda).
\end{aligned}
$$

下面的引理（在源码中声明头写为 `theorem result : claim`）证明：对一切圈长 $p \ge 1$、一切演化步数 $n \in \mathbb{N}$ 以及一切单位硬币初态 $c$，对称硬币 $\mathrm{cStar} = (1, i)/\sqrt{2}$ 恒使游走态的多模单激发几何纠缠达到最大值！

::: {.viz src="walk-spreading" preset="ring" height="500"}
**绕回来，镜像还在。** 圈上只有 $p = 9$ 个点，硬币取 $c_*$，走 $20$ 步：游走早已绕回来，青色的柱和灰色的柱一样摊满整圈，不再有往外跑的前沿；但青色的柱仍然左右成镜像，没有品红。[@lemma-symmetric-coin-walk] 对一切圈长 $p \ge 1$ 与一切步数 $n$ 成立。
:::


::: {.lemma #lemma-symmetric-coin-walk title="循环图 Hadamard 量子游走中对称硬币最大化多模几何纠缠引理" lean="D5/S3/Quantum/Walks/SymmetricCoinMaximalWalkEntanglement.result"}
源码声明 `theorem result : claim` 中的命题 `claim` 完整展开如下：对任意自然数 $p \in \mathbb{N}$（满足 $1 \le p$，由此赋予 `NeZero p`）、任意步数 $n \in \mathbb{N}$ 以及任意硬币旋量 $c : \mathrm{Fin}\,2 \to \mathbb{C}$，若 $c$ 满足单位归一化条件 `UnitSpinor c`，则恒有

$$
\mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, c)\bigr) \le \mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, \mathrm{cStar})\bigr).
$$
:::

::: proof
在源码模块 `SymmetricCoinMaximalWalkEntanglement` 中，首先由线性分解引理 `walk_linearity` 与实反射对称引理 `walk_reflection` 推出 `walk_pair_probabilities`：对任意位置 $x \in \mathrm{ZMod}\,p$ 与任意单位硬币 $c$，镜像配对模式 $(0, x)$ 与 $(1, -x)$ 的占据概率之和保持定值 $|\mathrm{walkState}(p, n, c)(0, x)|^2 + |\mathrm{walkState}(p, n, c)(1, -x)|^2 = a^2 + b^2$，而正交对称硬币 $\mathrm{cStar} = (1/\sqrt{2}, i/\sqrt{2})$ 使每一对镜像模式的概率恰好均分为 $(a^2 + b^2)/2$。随后源码通过固定和配对均衡引理 `pair_balancing` 与有限集归纳引理 `pair_average_le`（逐对作用于 $((0, x), (1, -x))$，利用在两项和固定时相等分配最大化乘积并最小化 $\mathrm{gMax}$），证明 $\mathrm{gMax}\bigl(\mathrm{walkState}(p, n, \mathrm{cStar})\bigr) \le \mathrm{gMax}\bigl(\mathrm{walkState}(p, n, c)\bigr)$，两边同被 $1$ 相减即得 $\mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, c)\bigr) \le \mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, \mathrm{cStar})\bigr)$。完整证明由 Lean 内核检查。
:::

::: {.viz src="walk-spreading" preset="coin" height="500"}
**一半一半还不够，要那个 $i$。** 证明梗概里的那一对：每个位置 $x$ 一根柱，下段是模式 $(0, x)$ 的概率，上段是镜像模式 $(1, -x)$ 的概率，短横标出一半。换成同样一半一半的实硬币 $(1, 1)/\sqrt{2}$，走 $50$ 步：每一对的总高仍正好落在虚线上（虚线是硬币取 $c_*$ 时同一对的总高），两段却一高一低，品红是下段离一半的差，一对里两段最多差 $0.145$。硬币取 $c_*$ 时两段等高，品红消失。图里画的是概率，不是 [@lemma-symmetric-coin-walk] 所说的几何纠缠。
:::
在理解 [@lemma-symmetric-coin-walk] 时，必须严格划清两条概念边界：

1. **多模单激发 W 态几何纠缠 vs 硬币—位置二分约化熵**：定理中的 `geometricEntanglement` 是把全部 $2p$ 个（硬币 $\times$ 位置）模式视作单粒子占据模，计算单激发 W 态相对于 $2p$ 个模式逐模乘积态的几何纠缠 $1 - \mathrm{gMax}$，**绝不能将其篡改或简写为通常教材里的“硬币对位置求偏迹后的二分冯·诺依曼纠缠熵”**。
2. **量子游走不等于“无条件消除一切回头路或迷宫指数加速”**：[@lemma-symmetric-coin-walk] 刻画的是有限圈图 $\mathrm{ZMod}\,p$ 上硬币初态相位对模式分布对称性的影响，它**并不证明**量子游走在任意图或迷宫上都具有指数加速，也**不意味着**相消干涉能让任意图上的所有回头路振幅恒等于零，更不是黏合树（glued trees）黑盒分离定理本身。

::: {.viz src="walk-spreading" preset="width" height="500"}
**一条直线对一条 $\sqrt{n}$。** 宽度随步数：青色的量子宽度是一条直线（$\sigma / n$ 停在 $0.54$ 附近），灰色的经典宽度是 $\sqrt{n}$；走到 $60$ 步是 $32.5$ 对 $7.75$。在一条线上，两者之差是平方关系，不是指数；黏合树上特定黑盒穿行任务的指数分离及其适用边界见 [@rem-qsvt-walks-literature] 第 2 条（文献结果，未在本书形式化），图中曲线是页面的数值。
:::

::: {.remark #rem-qsvt-walks-literature title="完整 QSVT 可实现性与黏合树加速（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 这里登记完整 QSVT 与图游走的文献结论。Theorem 3 在旋转约定下的充分性，以及同一补全的有符号圆分解，已在下文 [@thm-polynomial-phase-synthesis]、[@thm-signed-circle-phase-factorization] 中单独形式化；以下完整充要刻画、算子提升与查询语义仍按文献边界陈述。

1. **量子奇异值变换（QSVT）的复幺正补全与实目标多项式提取定理**（A. Gilyén, Y. Su, G. H. Low, and N. Wiebe, *Quantum singular value transformation and beyond: exponential improvements for quantum matrix arithmetics*, Proc. 51st ACM STOC, 193–204, 2019, doi:10.1145/3313276.3316366，Theorem 3 与 Theorem 17 / Corollary 18）：设矩阵 $A$ 通过块编码（block encoding）嵌入幺正算子 $U$ 的投影块 $\tilde{\Pi} U \Pi = A$（$\norm{A}_{\mathrm{op}} \le 1$）。文献严格区分两层可实现性定理：
   - **直接二维复多项式量子信号处理（QSP，Theorem 3）**：复多项式对 $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ 能直接作为单一交替相位序列算子 $U_{\Phi}(x)$ 的二维矩阵元实现，当且仅当 $\deg(P_{\mathrm{c}}) \le d$、$\deg(Q_{\mathrm{c}}) \le d - 1$，$P_{\mathrm{c}}$ 具有确定奇偶性 $d \bmod 2$，$Q_{\mathrm{c}}$ 具有相反奇偶性 $(d-1) \bmod 2$，且在一切 $x \in [-1, 1]$ 上满足复模方幺正归一恒等式 $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$。
   - **一般有界实多项式 QSVT 的复补全与实部投影实现（Theorem 17 / Corollary 18）**：对于一般有界实目标多项式 $P_{\mathrm{target}} \in \mathbb{R}[x]$——满足 (i) $\deg(P_{\mathrm{target}}) \le d$；(ii) 具有确定奇偶性 $d \bmod 2$；(iii) 在区间 $[-1, 1]$ 上满足一致范数界 $|P_{\mathrm{target}}(x)| \le 1$（例如奇一次实多项式 $P_{\mathrm{target}}(x) = x/2$，其在端点 $x = 1$ 处 $P_{\mathrm{target}}(1)^2 = 1/4 < 1$，因此不可能直接用实多项式配成 $P_{\mathrm{target}}(x)^2 + (1 - x^2)Q(x)^2 = 1$）——由 Fejér–Riesz 因式分解定理，总存在满足上述 Theorem 3 条件的复多项式补全对 $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ 使得 $\operatorname{Re} P_{\mathrm{c}}(x) = P_{\mathrm{target}}(x)$ 且 $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$。在电路上引入一颗额外的 $\lvert +\rangle$ 控制辅助比特，相干叠加相位序列 $U_{\Phi}$ 与相位取负的序列 $U_{-\Phi}$ 得到实部组合 $\frac{1}{2}(U_{\Phi} + U_{-\Phi})$，最后配合辅助比特向 $\langle +\rvert$ 的投影以及依奇偶性选取的块投影（$d$ 为奇时取 $\tilde{\Pi}(\cdot)\Pi$，$d$ 为偶时取 $\Pi(\cdot)\Pi$），即仅调用 $d$ 次 $U$ 与 $U^*$ 精确实现奇异值实多项式变换 $P_{\mathrm{target}}^{(\mathrm{SV})}(A)$。

   **从整条 Laurent 环到有序因子。** 上述 QSP 序列还有一种直接以矩阵系数表述的分解层：J. Haah, *Product Decomposition of Periodic Functions in Quantum Signal Processing*, Quantum **3**, 190 (2019), [doi:10.22331/q-2019-10-07-190](https://doi.org/10.22331/q-2019-10-07-190)，[arXiv:1806.10236v4，Definition 1 与 Theorem 2](https://arxiv.org/html/1806.10236v4#Thmlemma1)。以下陈述与归纳思路均为该文的**文献结果，未在本书形式化**。

   给定任意整数指标上的有限支撑系数族 $C:\mathbb{Z}\to M_2(\mathbb{C})$，写成形式 Laurent 多项式 $F(t)=\sum_{j\in\mathbb{Z}}C_jt^j$。Haah 的 $\mathcal{P}_n$ 要求 $C_j=0$（$|j|>n$），且对每个 $|\eta|=1$ 都有 $F(\eta)\in\mathrm{SU}(2)$，即 $F(\eta)^*F(\eta)=I$、$\det F(\eta)=1$；其中星号是求值后矩阵的共轭转置。子集 $\mathcal{E}_n$ 另要求支撑落在 $\{-n,-n+2,\ldots,n\}$，即非零项的指数与 $n$ 同奇偶。**实际次数为 $n$** 的条件是 $C_n\ne0$ **或** $C_{-n}\ne0$，不是只有次数上界。

   对秩一正交投影 $P$（$P^*=P$、$P^2=P$、$\operatorname{rank}P=1$），定义原始因子

   $$
   E_P(t)=tP+t^{-1}(I-P).
   $$

   它在投影线及其正交补上分别乘以 $t$ 与 $t^{-1}$；例如 $P=\operatorname{diag}(1,0)$ 时就是 $\operatorname{diag}(t,t^{-1})$。在单位圆上，这两个特征值模长均为 $1$、乘积为 $1$，故 $E_P\in\mathcal{E}_1$。Haah 的 Theorem 2 说明：对每个 $n\ge0$、每个实际次数为 $n$ 的 $F\in\mathcal{E}_n$，存在唯一的 $E_0\in\mathrm{SU}(2)$ 与**长度恰为 $n$ 的有序**秩一正交投影列表 $(P_1,\ldots,P_n)$，使

   $$
   F(t)=E_0\prod_{k=1}^{n}\bigl(tP_k+t^{-1}(I-P_k)\bigr).
   $$

   乘积按 $k=1,\ldots,n$ 从左到右排列，等式是逐系数的 Laurent 多项式恒等式。$n=0$ 时，$F=C_0$ 是任意的 $\mathrm{SU}(2)$ 常矩阵，$E_0=C_0$、投影列表为空；这里从不对 $t=0$ 求值。反方向，任意 $n$ 个原始因子的乘积都属于 $\mathcal{E}_n$，但实际次数可能小于 $n$。例如直接展开并用 $P(I-P)=0$ 得 $E_P(t)E_{I-P}(t)=I$：人为补长的列表不具有上述唯一性。

   **为何能从末端剥去一个因子？** Haah 的 Definition 1 把系数取伴随定义为 $F^{\dagger}(t)=\sum_j C_j^{\dagger}t^j$；它不反转指数。因此在单位圆上应写 $F(\eta)^*=F^{\dagger}(\eta^{-1})$，一般不能写成 $F^{\dagger}(\eta)$。圆上无穷多个取值把幺正与行列式关系提升为 Laurent 恒等式：对每个矩阵元乘以足够高的 $t$ 次幂后，普通多项式在无穷多个点为零，故各系数为零。对于 $n>0$，比较极端系数得到

   $$
   \begin{aligned}
   \det C_n&=\det C_{-n}=0,\\
   C_{-n}^{\dagger}C_n&=0,\qquad C_nC_{-n}^{\dagger}=0.
   \end{aligned}
   $$

   非零的端点矩阵于是秩为一。文献利用这些关系选出唯一的末端投影 $P$，满足 $C_n(I-P)=0$ 与 $C_{-n}P=0$。在 $n>0$ 且 $C_n\ne0$ 的分支，投影到 $C_n$ 的行空间便给出

   $$
   P=P_n=\frac{C_n^{\dagger}C_n}{\Tr(C_n^{\dagger}C_n)}.
   $$

   分母在这个分支严格为正；常数情形不使用此式。若选用非零的负端点，文献的平行论证从 $C_{-n}$ 的行空间选出互补投影，同样满足两条消去条件；无需把原假设中的“或”改成额外的正端点假设。

   令 $G(t)=F(t)\bigl(t^{-1}P+t(I-P)\bigr)=F(t)E_P(t)^{-1}$。把支撑外的 $C_j$ 约定为零，乘法的系数更新是

   $$
   G_j=C_{j+1}P+C_{j-1}(I-P).
   $$

   两条消去条件使 $t^{n+1}$ 与 $t^{-n-1}$ 项消失，奇偶支撑再把次数上界降至 $n-1$；单位圆上的 $\mathrm{SU}(2)$ 性质仍保留。次数恰为 $n-1$：否则由 $F=GE_P$、$\deg F\le\deg G+1$ 会与 $F$ 的实际次数 $n$ 矛盾。这样可对 $G\in\mathcal{E}_{n-1}$ 归纳，再在右侧接回 $P_n=P$。任一长度恰为 $n$ 的分解，其末端投影都必须满足同样的端点消去条件，因而被非零端点唯一确定；逐步剥离便得到整个有序列表及剩余常矩阵的唯一性。这是 Haah 纸面证明的骨架，不是本书新增的内核证明。

   **精确合成的边界。** Theorem 2 分解的是已经给定、在整个单位圆上取值于 $\mathrm{SU}(2)$ 且满足上述奇偶条件的完整矩阵环。把有界实目标多项式补全到这样的环、选定 $t$ 与信号变量的相位约定、以及在特定 QSP 约定下由反演对称性限制各 $P_k$ 到布洛赫赤道，仍需额外条件与论证（见 Haah §3.1 及本条前述 Gilyén 等人的补全结果）。再把二维信号作用提升为矩阵奇异值变换，还需块编码与投影桥梁。因此这里的有序投影唯一性不等于实角代表的唯一性，不覆盖补长列表，也不单独给出数值稳定性、效率或硬件实现保证。

2. **量子游走指数加速的图结构与黑盒边界**（A. M. Childs, R. Cleve, E. Deotto, E. Farhi, S. Gutmann, and D. A. Spielman, *Exponential algorithmic speedup by a quantum walk*, Proc. 35th ACM STOC, 59–68, 2003, doi:10.1145/780542.780552, arXiv:quant-ph/0209131）：在两棵深度为 $n$ 的二叉树在叶节点随机交错黏合而成的“黏合树（glued trees）”图族上，给定邻接表黑盒（oracle）访问，从入口根顶点出发的连续时间量子游走因在每一层等距列子空间上保持对称均匀叠加，把指数多顶点的图坍缩为长度为 $2n+2$ 的一维链，从而在 $\mathrm{poly}(n)$ 时间内以有界概率穿透到出口根顶点 `EXIT`；而 Childs 等人证明，任何最多执行 $2^{n/6}$ 次黑盒查询的经典算法找到 `EXIT` 顶点的概率至多为 $4\cdot 2^{-n/6}$（即要达到常数成功概率必须付出 $2^{\Omega(n)}$ 次经典黑盒查询）。这一指数优势严格依赖于图族的层对称约简、黑盒访问模型与特定穿行任务定义；对于缺乏此类对称结构的任意一般图或无结构迷宫，量子游走的干涉相消并不能自动把所有回头路径清零。

:::

## 从区间平方和到连续矩阵补全 {#sec-interval-sos-completion}


**先看端点缺了什么。** 取 $p(x)=x/2$。若坚持把实目标 $p$ 本身放在对角线上，要求 $p(x)^2+(1-x^2)Q(x)^2=1$，那么 $x=1$ 立即给出不可能的 $1/4=1$。缺口可以放进对角元的虚部：取

$$
\begin{aligned}
B(X)&=\frac{\sqrt3}{2}X, & C(X)&=1,\\
1-p(X)^2&=B(X)^2+(1-X^2)C(X)^2,\\
P(X)&=p(X)+iB(X)\\
&=\left(\frac12+i\frac{\sqrt3}{2}\right)X.
\end{aligned}
$$
这样端点处 $|P(1)|=1$，同时 $\operatorname{Re}P(x)=p(x)$。实目标仍被保留，只是归一化所需的其余分量有了容身之处。

区间平方和的文献依据是 Gilyén、Su、Low 与 Wiebe 上述论文的 [arXiv:1806.01838v1，Lemma 6 与 Theorems 3、5](https://arxiv.org/abs/1806.01838v1)（STOC 2019，doi:10.1145/3313276.3316366）。以下按该引理及 shosonoda 的 [lean-qsvt 固定版本](https://github.com/auto-res/lean-qsvt/tree/42c4b9149d5957db497e4226bc02da92d10f7a3c) 中 `exists_sumsq_decomposition`、`exists_complement` 的证明路线展开；该源码版权归 shosonoda（2026），采用 Apache-2.0 许可。[@thm-interval-sumsq-decomposition] 引用主仓对原平方和证明的复用，[@thm-phase-unitary-completion] 引用其原生连续矩阵场应用；不主张数学新颖性。

记 $c(R)=R.\mathrm{map}(\mathrm{algebraMap}\,\mathbb R\,\mathbb C)$ 为实多项式的复化。源码中的 $\operatorname{IsEven}(c(R))$ 表示所有奇次系数为零，$\operatorname{HasParity}(c(R),m)$ 表示与 $m$ 奇偶性相反的系数为零；对实多项式，这分别写成 $R(-X)=R(X)$ 与 $R(-X)=(-1)^mR(X)$。以下 $k-1$ 的自然数减法均取截断值 $\max(k-1,0)$，$\operatorname{natDegree}0=0$。

::: {.theorem #thm-interval-sumsq-decomposition title="任意次数预算下的偶多项式区间平方和" lean="D5/S3/ContinuousObservables/IntervalSOSCompletion.exists_sumsq_decomposition"}

给定任意 $k\in\mathbb N$ 与实多项式 $A\in\mathbb R[X]$，假设

$$
\begin{aligned}
A(-X)&=A(X),\\
\operatorname{natDegree}A&\le 2k,\\
A(x)&\ge0\quad(-1\le x\le1).
\end{aligned}
$$
则存在实多项式 $B,C$，使下面是**多项式恒等式**，而不只是区间内的数值等式：

$$
\begin{aligned}
A&=B^2+(1-X^2)C^2,\\
\operatorname{natDegree}B&\le k,\\
\operatorname{natDegree}C&\le \max(k-1,0),\\
B(-X)&=(-1)^kB(X),\\
C(-X)&=(-1)^{\max(k-1,0)}C(X),\\
k=0&\ \Longrightarrow\ C=0.
\end{aligned}
$$
:::

::: proof
这里自然数减法取截断值 $\max(k-1,0)$，零多项式的 $\operatorname{natDegree}$ 为 $0$；零多项式同时具有偶性与奇性。特别地，$\operatorname{natDegree}C\le0$ 只说明 $C$ 为常数，**不能替代** $k=0$ 时的 $C=0$ 条件。若 $A=0$，任意 $k$ 都可取 $B=C=0$；若 $k=0$，$A=a\ge0$ 为常数，可取 $B=\sqrt a$、$C=0$。

**为何因子能逐个补全？** 偶性与实系数使非零多项式的根按 $s,-s,\bar s,-\bar s$ 配对，连重数也保留。区间内部的实根必须具有偶重数，否则穿过根时会变号；原证明据此先剥出二重因子。具体可剥出的非负因子有三类：

- 对 $s^2=v\in\mathbb R$、$v\notin(0,1)$，选择符号后的二次因子为 $F_v=|1-v|X^2+|v|(1-X^2)$。它等于 $X^2-v$（$v\le0$）或 $v-X^2$（$v\ge1$），取 $B_v=\sqrt{|1-v|}X$、$C_v=\sqrt{|v|}$ 即得其平方和；$v=0$ 包括因子 $X^2$。
- 对内部非零实根 $\pm r$（$0<r^2<1$），剥出 $F=(X^2-r^2)^2$，取 $B=X^2-r^2$、$C=0$。
- 对 $a=s^2\notin\mathbb R$，共轭配对给出四次实因子。原证明采用的系数是

$$
\begin{aligned}
F_a&=(X^2-a)(X^2-\bar a)\\
&=X^4-2\operatorname{Re}(a)X^2+|a|^2,\\
\alpha&=|a|+|a-1|\ge1,\\
B_a&=\alpha X^2-|a|,\\
C_a&=\sqrt{\alpha^2-1}\,X.
\end{aligned}
$$

展开即有 $F_a=B_a^2+(1-X^2)C_a^2$。其中 $|a-1|^2=|a|^2-2\operatorname{Re}a+1$ 保证二次项系数正确；三角不等式保证根号内非负。

写成 $A=FG$ 后，余因子 $G$ 仍是偶多项式。在 $F>0$ 处，$G=A/F\ge0$；不能在 $F$ 的零点直接作除法。所剥因子只在有限多个区间点为零，由多项式的连续性，非负性从这些点之外延伸到零点，包括端点的单侧极限。这正是对余因子继续归纳所需的条件。

各因子的补全通过带权 Brahmagupta 恒等式相乘。令 $w=1-X^2$，则

$$
\begin{aligned}
&(B_1^2+wC_1^2)(B_2^2+wC_2^2)\\
&\quad=(B_1B_2-wC_1C_2)^2\\
&\qquad\quad+w(B_1C_2+B_2C_1)^2.
\end{aligned}
$$

原证明对次数预算 $k$ 作强归纳：常数用平方根起步；剥去次数 $2j$ 的上述因子（$j=1$ 或 $2$），余因子的次数至多 $2(k-j)$，再以此恒等式接回，次数与奇偶性同时相加。便于相乘的等价记账方式是同时控制 $B$ 与 $XC$ 的次数不超过 $k$、奇偶性同为 $k$。

若实际次数较低，还可以在区间上把 $B+i\sqrt{1-x^2}C$ 乘以模长为 $1$ 的 $x+i\sqrt{1-x^2}$，对应多项式变换

$$
\begin{aligned}
\widetilde B&=XB-(1-X^2)C,\\
\widetilde C&=B+XC.
\end{aligned}
$$

同一恒等式说明平方和不变；预算由 $k$ 增至 $k+1$，奇偶性随之翻转。因此次数不足时也能补到指定的奇偶预算，不要求 $\deg A=2k$。

完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-phase-unitary-completion title="有界奇偶多项式的原生连续酉补全" lean="D5/S3/ContinuousObservables/IntervalSOSCompletion.exists_phase_unitary_completion"}
设 $k\in\mathbb N$、$p\in\mathbb R[X]$ 满足 $\operatorname{HasParity}(c(p),k)$，且

$$
\begin{aligned}
\operatorname{natDegree}p&\le k,\\
p(x)^2&\le1\quad(x\in[-1,1]).
\end{aligned}
$$

令 $T=\operatorname{AddCircle}(1:\mathbb R)=\mathbb R/\mathbb Z$，$z(t)=\operatorname{windingPhase}(t)$，$x(t)=\operatorname{Re}z(t)$、$y(t)=\operatorname{Im}z(t)$。则存在 $B,C\in\mathbb R[X]$ 与 $U:\mathrm{CyclicObservable}\,2$，其中该类型是 $T$ 上以 $\mathrm{ZMod}\,2$ 为行列指标的连续复矩阵场，使

$$
\begin{aligned}
1-p^2&=B^2+(1-X^2)C^2,\\
\operatorname{natDegree}B&\le k,\\
\operatorname{natDegree}C&\le\max(k-1,0),\\
k=0&\ \Longrightarrow\ C=0.
\end{aligned}
$$

并有 $\operatorname{HasParity}(c(B),k)$ 与 $\operatorname{HasParity}(c(C),\max(k-1,0))$。这里第一行是 $\mathbb R[X]$ 中的恒等式。矩阵场见证满足 $U=\operatorname{phaseCompletion}(p,B,C)$，即对每个 $t\in T$，

$$
U(t)=
\begin{pmatrix}
p(x(t))+iB(x(t))&iy(t)C(x(t))\\
iy(t)C(x(t))&p(x(t))-iB(x(t))
\end{pmatrix}.
$$

在连续矩阵场代数中，$\operatorname{star}$ 是逐点共轭转置，$1$ 是常值单位矩阵场，同时有

$$
\begin{aligned}
\operatorname{star}(U)\,U&=1,\\
U\,\operatorname{star}(U)&=1,\\
\det U(t)&=1\quad(t\in T),\\
\operatorname{Re}(U(t)_{00})&=p(x(t))\quad(t\in T).
\end{aligned}
$$
:::

::: proof
$A=1-p^2$ 满足 [@thm-interval-sumsq-decomposition] 的偶性、次数与闭区间非负条件，故得到具有所列全部约束的 $B,C$。对原生圆坐标有 $x(t)^2+y(t)^2=1$，求值平方和恒等式得 $p(x(t))^2+B(x(t))^2+y(t)^2C(x(t))^2=1$。各矩阵元由连续坐标与多项式求值组成；直接相乘给出左右两条星乘积与行列式等式，左上角实部则由矩阵公式读出。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-interval-sos-completion-bridges title="补全的手算展开与适用边界"}
以下保留补全的显式代数展开。复多项式配对、逐矩阵元实部与 Hermitian 部分的完整等式、以及与区间平方根拉回的比较，是手算说明，未包含在上述两条 Lean 声明的结论中；这两条声明本身不含相位乘积分解与查询界；同一补全的相位分解由下一节 [@thm-signed-circle-phase-factorization] 另行给出。

**把亏量变成矩阵的其余分量。** 现在令实多项式 $p$ 满足 $\operatorname{natDegree}p\le k$、$p(-X)=(-1)^kp(X)$，以及 $p(x)^2\le1$（$x\in[-1,1]$）。对偶多项式 $A=1-p^2$ 应用上述分解，保留所得 $B,C$ 的全部次数、奇偶与 $k=0$ 条件，再置 $P=p+iB$、$Q=C$。于是

$$
\begin{aligned}
P\bar P+(1-X^2)Q\bar Q&=1,\\
\operatorname{Re}P&=p.
\end{aligned}
$$

此处横线是系数共轭，实数求值后就是普通复共轭；$P,Q$ 分别具有次数上界 $k$、$\max(k-1,0)$ 与相应奇偶性，且 $k=0$ 时 $Q=0$。这给出了 Theorem 3 所用的补全数据。Theorem 5 可以同时指定 $P,Q$ 的实部；本处原源码选用 $Q=C$，只要求 $\operatorname{Re}P=p$，**没有要求 $\operatorname{Re}Q=0$**。

在区间上令 $s=\sqrt{1-x^2}$。Theorem 3 的一般复补全矩阵是

$$
U_{\mathrm{int}}(x)=
\begin{pmatrix}
P(x)&isQ(x)\\
is\overline{Q(x)}&\overline{P(x)}
\end{pmatrix}.
$$

对这里的实 $Q=C$，令 $K=B(x)\sigma_z+sC(x)\sigma_x$，其中

$$
\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$

因为 $\sigma_z\sigma_x+\sigma_x\sigma_z=0$，直接相乘得到

$$
\begin{aligned}
U_{\mathrm{int}}&=p(x)I+iK, & K^*&=K,\\
K^2&=\bigl(B(x)^2+s^2C(x)^2\bigr)I\\
&=(1-p(x)^2)I,\\
U_{\mathrm{int}}^*U_{\mathrm{int}}&=p(x)^2I+K^2=I,\\
U_{\mathrm{int}}U_{\mathrm{int}}^*&=p(x)^2I+K^2=I.
\end{aligned}
$$

**圆上的连续性与符号。** 用圆自身的坐标 $z=e^{2\pi it}$（$t\in\mathbb R/\mathbb Z$）、$x=\operatorname{Re}z$、$y=\operatorname{Im}z$，以有符号的 $y$ 取代 $s$，定义

$$
U_{\mathrm{circ}}(z)=
\begin{pmatrix}
p(x)+iB(x)&iyC(x)\\
iyC(x)&p(x)-iB(x)
\end{pmatrix}.
$$

由于 $x^2+y^2=1$，有 $p(x)^2+B(x)^2+y^2C(x)^2=1$。把上面的 $K$ 换成 $K_z=B(x)\sigma_z+yC(x)\sigma_x$，同样的相乘给出

$$
\begin{aligned}
U_{\mathrm{circ}}^*U_{\mathrm{circ}}&=I,\\
U_{\mathrm{circ}}U_{\mathrm{circ}}^*&=I,\\
\det U_{\mathrm{circ}}&=p(x)^2+B(x)^2+y^2C(x)^2\\
&=1,\\
\operatorname{Re}_{\mathrm{entry}}U_{\mathrm{circ}}&=p(x)I,\\
\frac{U_{\mathrm{circ}}+U_{\mathrm{circ}}^*}{2}&=p(x)I.
\end{aligned}
$$

$\operatorname{Re}_{\mathrm{entry}}$ 表示逐矩阵元取实部，末行则是 Hermitian 部分。这两种取法在这个实 $C$ 的补全中恰好相同。所有矩阵元都是连续坐标 $x,y$ 的多项式组合，所以这是连续的 $\mathrm{SU}(2)$ 圆环；在 $x=\pm1$ 处没有除法，也不需选平方根的符号。$k=0$ 时 $C=0$，得到常对角相位矩阵 $\operatorname{diag}(p+iB,p-iB)$。

与区间拉回 $U_{\mathrm{int}}(\operatorname{Re}z)$ 的同一性只在上半圆 $y\ge0$ 上得到保证，因为 $\sqrt{1-\cos^2\theta}=|\sin\theta|$。例如合法补全 $P=X,Q=1$ 在 $\theta=-\pi/3$ 时，区间拉回的两个非对角元为 $i\sqrt3/2$，有符号圆环的则为 $-i\sqrt3/2$。两者都幺正，却不是同一个圆环。这里得到的是多项式亏量的补全及其连续矩阵后果；其中整个有符号圆的相位分解将由下一节单独证明；这两条补全声明本身不提供相位选择的连续性、查询复杂度或完整块编码 QSVT 的结论，也不涉及经验物理断言。
:::

## 从完整多项式对到整个有符号圆的相位分解 {#sec-phase-synthesis}

上一节给出了矩阵的四个分量，现在还要回答一个不同的问题：能否把这**同一个矩阵场**写成有限个信号与相位的有序乘积？先在多项式层剥掉最后一步，再把每一步接回圆上的矩阵，便能保持补全见证不变。

以下结果复用 shosonoda 的 [auto-res/lean-qsvt 固定版本](https://github.com/auto-res/lean-qsvt/tree/42c4b9149d5957db497e4226bc02da92d10f7a3c) 中 `QSVT/QSP/Existence.lean` 的 `exists_phases` 及其在 `QSP/PolyW.lean`、`QSP/Poly.lean`、`Polynomial/Parity.lean` 中的辅助证明。原作 Copyright (c) 2026 shosonoda，采用 Apache-2.0；主仓在 `docs/reports/licenses/auto-res-lean-qsvt-LICENSE.txt` 保留完整许可。数学依据是 Gilyén–Su–Low–Wiebe，[arXiv:1806.01838v1，Theorem 3，式 (4)–(8)，印刷页 8–9](https://arxiv.org/abs/1806.01838v1)，即旋转约定下的充分性方向。主仓适配命名空间、导入与可见性，再接上原生有符号圆应用；这里不主张数学新颖性。完整[源码](lean:D5/S3/ContinuousObservables/PhaseSynthesis.exists_phases)位于 `D5/S3/ContinuousObservables/PhaseSynthesis.lean`，对应冻结状态与 Blueprint 分别位于 `Golden/Frozen/state/D5/S3/ContinuousObservables/PhaseSynthesis.lean.json` 与 `Blueprint/D5/S3/ContinuousObservables/PhaseSynthesis.md`；这些文件及上述许可均以本书所钉源码树 [{commit}](trureturing:) 为准。

记 $R^\#=\sum_j\overline{r_j}X^j$ 为 $R=\sum_jr_jX^j\in\mathbb C[X]$ 的**系数共轭**（源码 `conjP`），不反转指数；对实数 $x$，$R^\#(x)=\overline{R(x)}$。令 $e(\phi)=\exp(i\phi)$，公式中标量乘法均指乘相应的常多项式。$\operatorname{HasParity}(R,m)$ 仍表示与 $m$ 奇偶性相反的系数全为零；$k-1=\max(k-1,0)$ 是自然数截断减法，$\operatorname{natDegree}0=0$。

::: {.definition #def-phase-polynomial-fold title="相位步与多项式对的左折叠" lean="D5/S3/ContinuousObservables/PhaseSynthesis.stepW D5/S3/ContinuousObservables/PhaseSynthesis.qspPolyW"}
对 $\phi\in\mathbb R$、$R,S\in\mathbb C[X]$ 定义

$$
\operatorname{stepW}_\phi(R,S)=
\bigl(e(\phi)[XR+(X^2-1)S],\ e(-\phi)[XS+R]\bigr).
$$

给定实数 $\phi_0$ 与实数列表 $\Phi=[\phi_1,\ldots,\phi_\ell]$，从 $(R_0,S_0)=(e(\phi_0),0)$ 开始，按列表次序令 $(R_j,S_j)=\operatorname{stepW}_{\phi_j}(R_{j-1},S_{j-1})$。定义 $\operatorname{qspPolyW}(\phi_0,\Phi)=(R_\ell,S_\ell)$；空列表给出 $(e(\phi_0),0)$。初始相位 $\phi_0$ 不占列表长度。
:::

::: {.theorem #thm-polynomial-phase-synthesis title="任意合法预算下完整复多项式对的精确相位合成" lean="D5/S3/ContinuousObservables/PhaseSynthesis.exists_phases"}
对每个 $k\in\mathbb N$ 及每对 $P,Q\in\mathbb C[X]$，若

$$
\begin{aligned}
\operatorname{natDegree}P&\le k,\\
\operatorname{natDegree}Q&\le k-1,\\
k=0&\ \Longrightarrow\ Q=0,\\
\operatorname{HasParity}(P,k)&,\qquad
\operatorname{HasParity}(Q,k-1),\\
PP^\#+(1-X^2)QQ^\#&=1\quad\text{在 }\mathbb C[X]\text{ 中},
\end{aligned}
$$

则存在一个实数 $\phi_0$ 和一个实数列表 $\Phi$，同时满足

$$
\begin{aligned}
\operatorname{length}\Phi&=k,\\
\operatorname{qspPolyW}(\phi_0,\Phi)&=(P,Q).
\end{aligned}
$$
:::

::: proof
**从预算 $k=n+1$ 剥去一步。** 写 $a=[X^{n+1}]P$、$b=[X^n]Q$。归一恒等式的 $X^{2n+2}$ 系数为零，次数上界保证没有更高项来贡献，因而

$$
a\overline a=b\overline b.
$$

若 $b\ne0$，$a/b$ 的模为 $1$；选实角 $\theta$ 使 $a/b=e(\theta)$，再取 $\phi=\theta/2$，即有 $e(-\phi)a=e(\phi)b$。若 $b=0$，上式迫使 $a=0$，直接取 $\phi=0$，不作除法。这包括实际次数低于预算的情形。

按源码 [`unstepW`](lean:D5/S3/ContinuousObservables/PhaseSynthesis.unstepW) 置

$$
\begin{aligned}
R&=e(-\phi)XP+e(\phi)(1-X^2)Q,\\
S&=e(\phi)XQ-e(-\phi)P.
\end{aligned}
$$

直接展开给出 $\operatorname{stepW}_\phi(R,S)=(P,Q)$，并给出保留归一化的恒等式

$$
RR^\#+(1-X^2)SS^\#=PP^\#+(1-X^2)QQ^\#=1.
$$

这里 $R$ 的粗次数界为 $n+2$，其最高系数是 $e(-\phi)a-e(\phi)b=0$；而 $R$ 具有奇偶性 $n$，故 $X^{n+1}$ 系数也为零，得到 $\operatorname{natDegree}R\le n$。$S$ 的粗次数界为 $n+1$，其最高系数是相反数，同样为零；$S$ 具有奇偶性 $n+1$，故 $X^n$ 系数为零，得到 $\operatorname{natDegree}S\le n-1$。当 $n>0$，$n+1$ 与 $n-1$ 同奇偶；当 $n=0$，粗降阶已使 $S$ 为常数，而其常数项为零，因此 $S=0$，也具有截断预算 $n-1=0$ 所需的偶性。不能仅凭 $\operatorname{natDegree}S\le0$ 就断言 $S=0$。

因此 $(R,S)$ 满足预算 $n$ 的全部假设。归纳给出 $\phi_0,\Phi'$ 后，在列表右端接回 $\phi$，即 $\Phi=\Phi'\mathbin{\text{++}}[\phi]$；长度由 $n$ 增为 $n+1$，左折叠精确返回原多项式对。即使 $a=b=0$，也逐次降低的是预算，不能跳到实际次数再丢掉所要求的长度。

**零预算与零分量。** $k=0$ 时显式条件给出 $Q=0$，而 $P$ 为常数 $u$，归一化给出 $|u|=1$。取 $e(\phi_0)=u$、$\Phi=[]$ 即可；没有把 $u$ 限定为 $1$。零多项式同时具有两种奇偶性，证明中的消项与次数界也覆盖零分量；整对 $(0,0)$ 则因归一化不可能成为输入。完整证明由 Lean 内核检查。
:::

::: {.definition #def-phase-field-product title="原生信号、对角相位与有序矩阵场乘积" lean="D5/S3/ContinuousObservables/PhaseSynthesis.phaseDiagonal D5/S3/ContinuousObservables/PhaseSynthesis.phaseProduct"}
令 $T=\operatorname{AddCircle}(1:\mathbb R)=\mathbb R/\mathbb Z$，$z(t)=\operatorname{windingPhase}(t)=e^{2\pi it}$，$x(t)=\operatorname{Re}z(t)$、$y(t)=\operatorname{Im}z(t)$。记

$$
\mathcal A_2=C\bigl(T,M_{\mathrm{ZMod}\,2}(\mathbb C)\bigr)
=\mathrm{CyclicObservable}\,2
$$

为以 $\mathrm{ZMod}\,2$ 作行列指标的连续复矩阵场代数；乘法逐点进行，星号为逐点共轭转置，$1$ 为常值单位矩阵场。定义常值场与信号场

$$
\begin{aligned}
D(\phi)(t)&=\operatorname{phaseDiagonal}(\phi)(t)
=\begin{pmatrix}e(\phi)&0\\0&e(-\phi)\end{pmatrix},\\
W(t)&=\operatorname{phaseCompletion}(X,0,1)(t)
=\begin{pmatrix}x(t)&iy(t)\\iy(t)&x(t)\end{pmatrix}.
\end{aligned}
$$

$\operatorname{phaseProduct}(\phi_0,\Phi)$ 是从 $D(\phi_0)$ 起，按 $\Phi$ 的次序反复作 $V\mapsto V\,W\,D(\phi)$ 的左折叠。因此

$$
\operatorname{phaseProduct}(\phi_0,[\phi_1,\ldots,\phi_\ell])
=D(\phi_0)(WD(\phi_1))\cdots(WD(\phi_\ell)).
$$

这里有序乘积从左至右按列表排列，作用于列向量时最右侧因子先作用；$y(t)$ 保留符号。
:::

::: {.theorem #thm-signed-circle-phase-factorization title="同一平方和见证的整个有符号圆相位分解" lean="D5/S3/ContinuousObservables/PhaseSynthesis.exists_phase_factorization"}
对每个 $k\in\mathbb N$ 与每个 $p\in\mathbb R[X]$，假设

$$
\begin{aligned}
\operatorname{natDegree}p&\le k,\\
\operatorname{HasParity}(c(p),k)&,\\
p(x)^2&\le1\quad(x\in[-1,1]).
\end{aligned}
$$

则存在**同一组** $B,C\in\mathbb R[X]$、$U\in\mathcal A_2$、$\phi_0\in\mathbb R$ 与 $\Phi\in\operatorname{List}(\mathbb R)$，使以下全部条件同时成立：

$$
\begin{aligned}
1-p^2&=B^2+(1-X^2)C^2\quad\text{在 }\mathbb R[X]\text{ 中},\\
\operatorname{natDegree}B&\le k,\\
\operatorname{natDegree}C&\le k-1,\\
k=0&\ \Longrightarrow\ C=0,\\
\operatorname{HasParity}(c(B),k)&,\qquad
\operatorname{HasParity}(c(C),k-1).
\end{aligned}
$$

其中 $c$ 为实系数的复化，$k-1$ 取自然数截断减法。矩阵场见证满足

$$
\begin{aligned}
U&=\operatorname{phaseCompletion}(p,B,C),\\
U(t)&=\begin{pmatrix}
p(x(t))+iB(x(t))&iy(t)C(x(t))\\
iy(t)C(x(t))&p(x(t))-iB(x(t))
\end{pmatrix}\quad(t\in T),\\
\operatorname{star}(U)U&=1,\qquad U\operatorname{star}(U)=1,\\
\det U(t)&=1\quad(t\in T),\\
\operatorname{Re}(U(t)_{00})&=p(x(t))\quad(t\in T).
\end{aligned}
$$

而且，对于精确的多项式对 $P=c(p)+i\,c(B)$、$Q=c(C)$，这些相位见证满足

$$
\begin{aligned}
\operatorname{length}\Phi&=k,\\
\operatorname{qspPolyW}(\phi_0,\Phi)&=(c(p)+i\,c(B),c(C)),\\
\operatorname{phaseProduct}(\phi_0,\Phi)&=U\quad\text{在 }\mathcal A_2\text{ 中}.
\end{aligned}
$$
:::

::: proof
先从 [@thm-phase-unitary-completion] **只取一次** $B,C,U$，保留其平方和、次数、奇偶性、零预算条件与全部矩阵场结论。置 $P=c(p)+i\,c(B)$、$Q=c(C)$。实系数经共轭不变，所以 $P^\#=c(p)-i\,c(B)$、$Q^\#=Q$，平方和恒等式的复化恰好给出 $PP^\#+(1-X^2)QQ^\#=1$。次数与奇偶性满足 [@thm-polynomial-phase-synthesis]，于是得到长度恰为 $k$ 的相位列表与整个多项式对等式。

还需把一对多项式的等式送到**四个矩阵元**。对任意实数 $x,y$ 满足 $x^2+y^2=1$，记

$$
E_{x,y}(R,S)=\begin{pmatrix}
R(x)&iyS(x)\\iyS^\#(x)&R^\#(x)
\end{pmatrix}.
$$

直接矩阵相乘给出

$$
E_{x,y}(R,S)\begin{pmatrix}x&iy\\iy&x\end{pmatrix}D(\phi)
=E_{x,y}\bigl(\operatorname{stepW}_\phi(R,S)\bigr).
$$

此处只用 $y^2=1-x^2$，未假定 $y\ge0$。空列表给出 $D(\phi_0)$；逐步接回列表后，对每个 $t\in T$，整个相位乘积等于 $E_{x(t),y(t)}(P,Q)$。因 $Q=c(C)$ 为实系数，这恰是先前那一个 $\operatorname{phaseCompletion}(p,B,C)(t)$。连续矩阵场的逐点外延性给出 $\operatorname{phaseProduct}(\phi_0,\Phi)=U$；没有另换补全见证，也没有只取左上角实部。完整证明由 Lean 内核检查。
:::

::: {.example #ex-phase-zero-and-padded-budget title="零预算与低次数输入的较大合法预算（手算）"}
以下是对定义的显式验算，不是额外的形式定理。

**$k=0$ 保留任意单位常数。** 给定任意 $u\in\mathbb C$、$|u|=1$，$(P,Q)=(u,0)$ 满足全部假设；取 $e(\phi_0)=u$ 与空列表。对实目标 $p=1/2$，取 $B=\sqrt3/2,C=0$，则 $1-p^2=B^2=3/4$，$\phi_0=\pi/3$ 给出

$$
U=D(\pi/3)=\begin{pmatrix}
\frac12+i\frac{\sqrt3}{2}&0\\0&\frac12-i\frac{\sqrt3}{2}
\end{pmatrix}.
$$

**实际次数 $1$，指定预算 $3$。** 取 $(P,Q)=(X,1)$。它满足 $X^2+(1-X^2)=1$；$X$ 为奇多项式、$1$ 为偶多项式，故预算 $k=3$ 合法，虽然 $\operatorname{natDegree}P=1<3$。取

$$
\phi_0=-\pi/2,\qquad\Phi=[\pi/2,0,0].
$$

逐步代入定义，整个多项式对依次为

$$
(-i,0)\ \xrightarrow{\ \pi/2\ }\ (X,-1)
\ \xrightarrow{\ 0\ }\ (1,0)
\ \xrightarrow{\ 0\ }\ (X,1).
$$

第一步用 $e(\pi/2)=i$、$e(-\pi/2)=-i$；第二步的第一分量为 $X^2-(X^2-1)=1$，第二分量为 $-X+X=0$。这既核对长度恰为 $3$，也展示反向降阶中 $k=3$ 与 $k=2$ 的最高系数同时为零时仍能剥步。

对第二个定理，取 $p=X,B=0,C=1$，同样满足预算 $3$ 的全部平方和约束；上述列表给出 $U=W$ 的整个圆分解。取 $t=-1/6$，则 $x=1/2,y=-\sqrt3/2$，所得两个非对角元均为 $-i\sqrt3/2$。这与上一节的区间正平方根拉回的 $+i\sqrt3/2$ 不同。预算 $1$ 时也可取 $\phi_0=0,\Phi=[0]$，说明本定理规定的是给定合法预算的存在性，不是最短列表。
:::

::: {.remark #rem-phase-synthesis-boundaries title="精确存在性已经闭合，实施与提升仍须另证"}
[@thm-polynomial-phase-synthesis] 与 [@thm-signed-circle-phase-factorization] 闭合了合法多项式对的相位存在性，以及同一平方和补全在**整个原生有符号圆**上的精确分解。初始相位是列表之外另行存在量化的实数，并非可任意预先指定的实数。它们不声称最优或可计算的相位求解器、相位唯一性、随输入连续的选择或数值稳定性。

本次所钉源码也未由这两条结论给出完整正向充要刻画、旋转与反射约定的传输、任意投影算子的提升、实部辅助比特实现或原始黑盒查询的精确语义；这些仍需各自明确的冻结依据。尤其 $\Phi\mapsto-\Phi$ 是相位取负，不是把物理门字取伴随或颠倒次序。进行中的 [issue 29935](https://github.com/the-omega-institute/trureturing/issues/29935) 属于后续提升研究，不是本节形式结论。上半圆上的正平方根相等，不能代替整个有符号圆上的场相等。
:::

::: {.viz src="walk-spreading" height="560"}
**游走扩散实验室。** 拖时间轴改步数，改硬币的份额 $w$ 与相位 $\varphi$，或把圈变短：上方青色是量子游走，下方灰色是经典随机游走，品红是量子分布比它的镜像多出的部分。绿色框是 [@lemma-symmetric-coin-walk]；宽度与失衡都是页面的数值。
:::

## 有限门字与三维割圆多面体 {#sec-finite-gate-polytope}

在前两节和[第十五章](ch15-grover-qft-and-period-finding.md)里，我们一直在理想化的连续角度空间里自由取用任意旋转角 $\theta$ 或 $\phi_k$。然而，当你真正坐到一台容错量子计算机的控制台前（回想[第十四章](ch14-cloning-codes-and-braids.md)的稳定子纠错码），硬件为你提供的容错基本逻辑门并不是无穷无尽的连续旋钮，而仅仅是屈指可数的几个**离散生成元**——最典型的就是由 Hadamard 门 $H$ 与 $\pi/8$ 相位门 $T$ 组成的双门字母表 $\{H, T\}$！

这立刻把我们推向了一个直击几何本原的尖锐问题：**用两把固定角度的离散扳手 $H$ 和 $T$ 反复拧有限次 $L$，真能拧出整颗光滑的球面吗？**

为了把“连续两轴旋转的精确有限字分解”与“离散有限门集的多面体逼近”彻底辨析清楚，让我们先看源码模块 `D5/S3/Geometry/TwoAxisFiniteRotation.lean` 证明的连续两轴有限字命题。设三维实欧氏空间为 $\mathrm{Space} = \mathrm{EuclideanSpace}\,\mathbb{R}\,(\mathrm{Fin}\,3) \cong \mathbb{R}^3$，其上的线性等距等价群为 $\mathrm{Orthogonal} = \mathrm{Space} \simeq_{\mathrm{li}}[\mathbb{R}] \mathrm{Space}$，行列式映射为 $\mathrm{determinant}(R) = \mathrm{LinearMap.det}(R.\mathrm{toLinearMap})$。对任意向量 $a \in \mathrm{Space}$，绕轴 $a$ 的**完整连续轴圆**定义为

$$
\mathrm{axisCircle}(a) = \bigl\{R : \mathrm{Orthogonal} \;\big|\; \mathrm{determinant}(R) = 1 \land R(a) = a\bigr\}.
$$

若有限列表 $l : \mathrm{List}\,\mathrm{Orthogonal}$ 中的每一个元素都属于 $\mathrm{axisCircle}(a)$ 或 $\mathrm{axisCircle}(b)$，则称 $l$ 为两轴旋转字，记作 `IsAxisWord a b l`（其生成的子群 `wordGroup` 仅取有限字乘积 `l.prod`，**不取拓扑闭包**）。下面的命题证明：只要两根轴向量 $a, b \in \mathrm{Space}$ 不共线（即它们的格拉姆行列式严格为正 $\langle a, b\rangle_{\mathbb{R}}^2 < \norm{a}^2\norm{b}^2$；注意此处**不要求 $a, b$ 单位归一化**），$\mathrm{SO}(3)$ 中的任何旋转 $R$ 都可以精确写成有限个来自 $\mathrm{axisCircle}(a) \cup \mathrm{axisCircle}(b)$ 的连续轴旋转之积！

::: {.proposition #prop-two-axis-finite-word title="三维空间中任意两个不共线连续旋转轴圆的有限字精确生成命题" lean="D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word"}
设 $a, b \in \mathrm{Space}$ 为三维欧氏空间中的两个向量，满足严格柯西—施瓦茨不等式

$$
\langle a, b\rangle_{\mathbb{R}}^2 < \norm{a}^2 \cdot \norm{b}^2.
$$

则对任意满足 $\mathrm{determinant}(R) = 1$ 的正交等距变换 $R : \mathrm{Orthogonal}$，必存在有限列表 $l : \mathrm{List}\,\mathrm{Orthogonal}$，使得

$$
\mathrm{IsAxisWord}(a, b, l) \;\land\; l.\mathrm{prod} = R.
$$
:::

::: proof
条件 $\langle a, b\rangle_{\mathbb{R}}^2 < \norm{a}^2 \norm{b}^2$ 保证 $a, b$ 线性无关，张成 $\mathbb{R}^3$ 的一个二维平面且两单位轴方向夹角 $\alpha \in (0, \pi)$ 满足 $\sin\alpha > 0$。在源码中，首先利用绕轴 $a$ 与绕轴 $b$ 的连续旋转可以调整向量在轴向上的投影高度（广义欧拉角分解）：因为每一步允许从完整连续圆群 $\mathrm{axisCircle}(a)$ 或 $\mathrm{axisCircle}(b)$ 中选取**任意连续实角度**，通过交替绕 $a$ 与 $b$ 的有限次旋转即可将轴 $a$ 搬运到球面上任意目标方向 $R(a)$，最后再补乘一个属于 $\mathrm{axisCircle}(a)$ 的轴向旋转对齐垂直平面方向，从而以有限字乘积 $l.\mathrm{prod}$ 精确拼出任意满足 $\mathrm{determinant}(R) = 1$ 的三维旋转 $R$。完整证明由 Lean 内核检查。
:::

**关键警示：切勿把 [@prop-two-axis-finite-word] 的“连续两轴有限字精确可达”误当作离散量子门 $\{H, T\}$ 的性质！**

在 [@prop-two-axis-finite-word] 中，每一个字母都可以从无穷连续圆 $\mathrm{axisCircle}(a)$ 或 $\mathrm{axisCircle}(b)$ 中任选连续实角度，而且定理没有对字长或离散化误差给出定量约束。与此相反，在离散量子门编译中，我们必须严格采用与上面连续字群不同的记号，直面**有限字长 $L$ 下的离散轨道与刘徽三维割圆术几何**（见图 16 面板 II）：

1. **门算子群 $\mathrm{SU}(2)/\mathrm{PU}(2)$ 与单比特状态球面 $S^2$ 的拓扑区分**：单比特 Hadamard 门与 $T$ 门定义为

   $$
   H = \frac{X + Z}{\sqrt{2}}, \qquad T = \operatorname{diag}\bigl(1,\, e^{i\pi/4}\bigr).
   $$

   忽略全局相位后，射影等价类 $[H], [T] \in \mathrm{PU}(2) \cong \mathrm{SO}(3)$；若在幺模特殊酉群 $\mathrm{SU}(2)$ 中工作，则需取行列式为 $1$ 的幺模提升（unimodular lifts）$\tilde{H} = i H$ 与 $\tilde{T} = e^{-i\pi/8} T$（满足 $\det\tilde{H} = \det\tilde{T} = 1$）。请务必分清底层流形：**$\mathrm{SU}(2) \to \mathrm{SO}(3)$ 是二对一的二重覆盖映射，其中 $\mathrm{SU}(2) \cong S^3$（三维球面），$\mathrm{SO}(3) \cong \mathbb{R}\mathrm{P}^3$（三维实射影空间）——这两座三维群流形都不等于二维单比特布洛赫球面 $S^2$！**
2. **固定初态的有限字可达轨道 $\mathcal{S}_L \subset S^2$**：固定一根初始布洛赫单位向量 $\vv{r}_0 \in S^2$（例如北极 $\vv{r}_0 = \vv{e}_z$）。对任意给定的有限门数预算 $L \in \mathbb{N}$，定义长度不超过 $L$（包含空字 $\epsilon$）的离散门字集合为

   $$
   \mathcal{W}_L = \bigl\{w \in \{H, T\}^* \;\big|\; |w| \le L\bigr\},
   $$

   并定义这些门字作用在固定初态 $\vv{r}_0$ 上在球面 $S^2$ 上留下的可达点集为

   $$
   \mathcal{S}_L = \bigl\{R_w \vv{r}_0 \;\big|\; w \in \mathcal{W}_L\bigr\} \subset S^2.
   $$

   注意两点：(i) $\mathcal{S}_L$ 只是**固定初态 $\vv{r}_0$ 的单态可达轨迹点集**，而不是三参数门算子全空间；(ii) 采用 $|w| \le L$（而非 $|w| = L$）才保证单调嵌套 $\mathcal{S}_L \subseteq \mathcal{S}_{L+1}$，且点数满足上界 $|\mathcal{S}_L| \le \sum_{j=0}^L 2^j = 2^{L+1} - 1$（代数关系如 $H^2 = I$ 及稳定子不动点可产生碰撞重复，使实际点数小于该上界）。

::: {.viz src="gate-word-polytope" preset="one" height="500"}
**门长 1：一条线段。** 北极是 $T$ 的不动点，只有 $H$ 把它送到 $\vv{e}_x$：两个青色的点只连成一条线段，还谈不上多面体。琥珀色的目标落在 $\vv{e}_x$ 上，门字 $H$ 精确命中，没有品红的缺口；紫色是 $H$ 与 $T$ 的转轴。
:::

3. **欧氏凸多面体 $P_L = \operatorname{conv}(\mathcal{S}_L)$ 与测地多面体网格**：取有限点集 $\mathcal{S}_L$ 在 $\mathbb{R}^3$ 中的欧氏凸包

   $$
   P_L = \operatorname{conv}(\mathcal{S}_L) \subset \mathbb{R}^3.
   $$

   这是一座内接于单位球体的有限顶点凸多面体。当 $L$ 很小时（如 $L = 0, 1, 2$），$P_L$ 退化为单点、线段或平面多边形（绝不能声称对每一个 $L$，$P_L$ 都已经是满三维多面体！）。当 $P_L$ 达到满三维时，它的每一个二维面（facet）都是削过球体内部的**平直欧氏弦面（flat chordal polygon）**——绝不能把这些欧氏平面多边形称作“球面 $S^2$ 上本身平坦的面”。当 $L$ 足够大使得球心落入多面体内部（$0 \in \operatorname{int} P_L$）时，将 $P_L$ 的棱与面沿径向投影（radial projection）回球皮 $S^2$，平直棱投影为大圆劣弧，便在 $S^2$ 上切出一张球面三角/多边形网格，通常称为“**测地多面体（geodesic polytope）**”（注意该术语仅指径向投影到球面上的大圆弧网格，而 $\operatorname{conv}(\mathcal{S}_L)$ 本身始终是欧氏平直多面体）。

::: {.viz src="gate-word-polytope" preset="six" height="500"}
**门长 6：包住球心，投回球皮。** $19$ 个可达点的凸包已经包住球心，把它的棱沿半径投到球皮上，就成了一张青色的大圆弧网格（测地多面体）。网格里最大的洞是品红虚线圈住的空球冠，半径 $\varepsilon_6 = 47.27^\circ$，琥珀色的箭头指着它的中心。这里画的是有限门字在球面上的落点，不是 [第二十一章](ch21-diagonalization-and-escape.md) 平面割圆里的多边形。
:::

4. **有限门长下的正逼近残差 $\varepsilon_L > 0$ 与曲率失配**：对于任何有限门长 $L < \infty$，由于 $S^2$ 是紧致二维连续统而 $\mathcal{S}_L$ 是有限点集，球面上最坏方向离最近可达顶点的测地角距离（覆盖半径）

   $$
   \varepsilon_L = \max_{\vv{r} \in S^2}\, \min_{\vv{s} \in \mathcal{S}_L} \arccos(\vv{r} \cdot \vv{s}) > 0
   $$

   **严格大于零**（且随 $L$ 增大单调不增 $\varepsilon_{L+1} \le \varepsilon_L$；至于离散通用门集在渐近编译层面的文献条件见章末 [@rem-solovay-kitaev-literature]，不能从连续轴圆定理 [@prop-two-axis-finite-word] 直接推出）。
   对于任意不落在有限点集 $\mathcal{S}_L$ 中的单位外法向 $\vv{n} \in S^2$，平直弦面的欧氏支持高度 $h = \max_{\vv{s} \in \mathcal{S}_L} (\vv{n} \cdot \vv{s}) < 1$ 与球面支持高度 $1$ 之间恒隔着一道严格为正的**径向支撑间隙** $1 - h > 0$（尽管落在 $\mathcal{S}_L$ 上的顶点本身在球面上并可被相应门字精确命中；关于圆球面曲率与多面体离散角亏的经典微分几何与拓扑文献对照，详见[第二十一章](ch21-diagonalization-and-escape.md) [@rem-hairy-ball-adams-literature]）。

::: {.viz src="gate-word-polytope" preset="nearest" height="500"}
**离目标最近的点与它的门字。** 门长 $L \le 10$ 时有 $64$ 个可达点。琥珀色的目标在 $\theta = 110^\circ$、$\varphi = 200^\circ$：离它最近的可达点由门字 $HTHTTTTTH$ 到达，相隔 $17.04^\circ$（品红的弧）；平直多面体在这个方向的支持高度 $h = 0.956$，与球皮之间的径向间隙 $1 - h = 0.044$（品红的半径段）。
:::

5. **刘徽“三维割圆术”的教学类比与单态/全门误差区分**：公元三世纪中国数学家刘徽在《九章算术注》中创立“割圆术”，用内接正多边形的平直弦段逼近圆周（“割之弥细，所失弥少，割之又割，以至于不可割”）。在三维量子门编译中，随着门字预算 $L$ 递增，有限顶点层 $\mathcal{S}_L$、内接平直弦面层 $P_L$ 与外包光滑球面层 $S^2$ 构成了鲜明的**三维割圆术**图像（注：这纯粹是“用越来越细的离散弦面逼近光滑曲面”的几何教学类比，绝非声称古代割圆术已证明现代量子编译或给出 Solovay–Kitaev 误差指数）。最后务必牢记：单态球面覆盖误差 $\varepsilon_L$ 会放过绕初态 $\vv{r}_0$ 旋转的稳定子相位，因此不能直接代替整个门算子在 $\mathrm{PU}(2)/\mathrm{SU}(2)$ 上的算子范数编译误差 $\delta(U, V) = \min_{\varphi \in \mathbb{R}}\norm{U - e^{i\varphi}V}_{\mathrm{op}}$。

::: {.viz src="sphere-escape" preset="zu" height="500"}
**割到 $24576$ 边，缝还在。** 祖冲之把割圆推到 $24576$ 边：青色的内接多边形与圆已经分不开，品红的缝 $1 - \cos\frac{\pi}{n}$ 只剩 $8.17\times10^{-9}$；放大镜纵向放大约 $7.5\times10^{7}$ 倍之后，它和第一步时一样清楚。这是平面里的割圆；拿它比照弦面逼近球面，只是上面第 5 条的教学类比（割圆数值表见[第二十一章](ch21-diagonalization-and-escape.md) [@ex-liu-hui-polygon-sagitta]）。
:::

## 编译误差、查询计数与渐近门长 {#sec-compilation-error-and-count}

既然离散门编译不可避免地受制于有限字长与误差权衡，那么在包含黑盒源算子 $C$ 的振幅放大算法中，我们能否至少在**已知初始成功概率 $p \in (0, 1]$** 且允许调节一枚连续辅助硬币旋转门 `coinRotation q` 的前提下，把[第十五章](ch15-grover-qft-and-period-finding.md)遗留的整数步过冲残差彻底削成**精确的零**，并给出严格的源算子查询次数上界？

源码模块 `CoherentUniformAmplification` 的收官定理给出了肯定的回答。设 $J \in M_{l \times s}(\mathbb{C})$、$C, P \in M_{l \times l}(\mathbb{C})$ 满足与 [@thm-grover-uniform-rotation] 相同的均匀放大前提。引入一比特辅助硬币空间，将 $l$ 维算子提升为 $2l \times 2l$（或 $2l \times s$）分块矩阵：

$$
\begin{aligned}
\mathrm{coinEmbed}(J) &= \begin{pmatrix} J \\ 0 \end{pmatrix}, &\qquad
\mathrm{coinLift}(C) &= \begin{pmatrix} C & 0 \\ 0 & C \end{pmatrix}, \\
\mathrm{coinRotation}(q) &= \begin{pmatrix} \sqrt{q}\,I_l & -\sqrt{1-q}\,I_l \\ \sqrt{1-q}\,I_l & \sqrt{q}\,I_l \end{pmatrix}, &\qquad
\mathrm{coinGood}(P) &= \begin{pmatrix} P & 0 \\ 0 & 0 \end{pmatrix}.
\end{aligned}
$$

定义六元门字母表归纳类型 `AmplificationGate`：

- `.source` 与 `.sourceAdjoint`：分别对应矩阵 $\mathrm{coinLift}(C)$ 与其共轭转置 $\mathrm{coinLift}(C)^*$；
- `.coin` 与 `.coinAdjoint`：分别对应矩阵 $\mathrm{coinRotation}(q)$ 与其共轭转置 $\mathrm{coinRotation}(q)^*$；
- `.initializedReflection`：对应关于初始源嵌入 $K = \mathrm{coinEmbed}(J)$ 的反射 $2 K K^* - I_{2l}$；
- `.goodReflection`：对应关于扩展目标投影的反射 $I_{2l} - 2\,\mathrm{coinGood}(P)$。

对任意门字列表 $w : \mathrm{List}\,\mathrm{AmplificationGate}$，`evaluateWord J C P q w` 将每个符号映射为上述矩阵后取列表乘积 `List.prod`（最右侧的门最先作用于状态）；单步反射块定义为

$$
\mathrm{reflectionBlock} = \bigl[\mathrm{.coin},\; \mathrm{.source},\; \mathrm{.initializedReflection},\; \mathrm{.sourceAdjoint},\; \mathrm{.coinAdjoint},\; \mathrm{.goodReflection}\bigr],
$$

递归门字定义为 $\mathrm{amplificationWord}(0) = [\mathrm{.coin},\, \mathrm{.source}]$，且 $\mathrm{amplificationWord}(n + 1) = \mathrm{reflectionBlock} \mathbin{\text{++}} \mathrm{amplificationWord}(n)$。最后，定义**源查询计数** `sourceQueries w` 为门字 $w$ 中出现 `.source` 与 `.sourceAdjoint` 的总次数（注意：当 $p = 1$ 时最终门字仅取单元素列表 `[.source]`，绝不能把 $p < 1$ 的通式 $2n+1$ 误套到 $p = 1$ 分支上）。

::: {.corollary #cor-exact-source-query-count title="精确相干振幅放大的零残差门字构造与源查询次数上界推论" lean="D5/S3/Quantum/Recovery/CoherentUniformAmplification.exact_coherent_amplification"}
设 $s, l$ 为有限可判等指标类型，$J \in M_{l \times s}(\mathbb{C})$、$C, P \in M_{l \times l}(\mathbb{C})$、$p \in \mathbb{R}$，满足

$$
J^* J = 1, \quad C^* C = 1, \quad P^* = P, \quad P^2 = P, \quad
\bigl(P(CJ)\bigr)^*\bigl(P(CJ)\bigr) = (p : \mathbb{C}) \bullet (1 : M_s(\mathbb{C})), \quad 0 < p \le 1.
$$

令

$$
\begin{aligned}
n &:= \Bigl\lceil \frac{\pi}{4\arcsin(\sqrt{p})} - \frac{1}{2} \Bigr\rceil_+, &\qquad
r &:= \sin^2\Bigl(\frac{\pi}{4(n : \mathbb{R}) + 2}\Bigr), \qquad q := \frac{r}{p}, \\
w &:= \text{if } p = 1 \text{ then } [\mathrm{AmplificationGate.source}] \text{ else } \mathrm{amplificationWord}(n), \\
V &:= \mathrm{evaluateWord}(J, C, P, q, w) \cdot \mathrm{coinEmbed}(J).
\end{aligned}
$$

则以下六条结论同时成立：

1. **精确命中目标成功块**：$V = \mathrm{coinEmbed}\bigl(\mathrm{success}(CJ, P, p)\bigr)$；
2. **失败分量严格清零**：$\bigl(1 - \mathrm{coinGood}(P)\bigr) V = 0$；
3. **任意参考系统下的克罗内克精确性**：对一切类型 $z$ 与矩阵 $R \in M_z(\mathbb{C})$，

   $$
   V \otimes_{\mathrm{K}} R = \mathrm{coinEmbed}\bigl(\mathrm{success}(CJ, P, p)\bigr) \otimes_{\mathrm{K}} R;
   $$

4. **源查询次数的显式上界**：

   $$
   \bigl(\mathrm{sourceQueries}(w) : \mathbb{R}\bigr) \le \frac{\pi/2 + 2}{\sqrt{p}};
   $$

5. **完整门字演化的幺正性**：$\bigl(\mathrm{evaluateWord}(J, C, P, q, w)\bigr)^* \cdot \mathrm{evaluateWord}(J, C, P, q, w) = 1$；
6. **分情况精确参数性质**：若 $p = 1$，则 $\mathrm{sourceQueries}(w) = 1$；否则（当 $0 < p < 1$ 时）同时有

   $$
   \begin{aligned}
   &0 < r \;\land\; r \le p \;\land\; r < 1 \;\land\; 0 < q \;\land\; q \le 1 \\
   &\land\; \bigl(2(n : \mathbb{R}) + 1\bigr)\arcsin(\sqrt{r}) = \frac{\pi}{2} \;\land\; \mathrm{sourceQueries}(w) = 2n + 1 \\
   &\land\; \bigl(\mathrm{coinRotation}(q)\bigr)^* \mathrm{coinRotation}(q) = 1 \\
   &\land\; \mathrm{success}\Bigl(\bigl(\mathrm{coinRotation}(q)\cdot\mathrm{coinLift}(C)\bigr)\cdot\mathrm{coinEmbed}(J),\, \mathrm{coinGood}(P),\, r\Bigr) = \mathrm{coinEmbed}\bigl(\mathrm{success}(CJ, P, p)\bigr).
   \end{aligned}
   $$
:::

::: proof
当 $p = 1$ 时，$w = [\mathrm{.source}]$，仅调用 $1$ 次 `.source`（故 $\mathrm{sourceQueries}(w) = 1 \le \pi/2 + 2$），且 $\mathrm{coinLift}(C)\cdot\mathrm{coinEmbed}(J) = \mathrm{coinEmbed}(CJ) = \mathrm{coinEmbed}(\mathrm{success}(CJ, P, 1))$，各项直接成立。

当 $0 < p < 1$ 时，取非负整数天花板 $n = \lceil \frac{\pi}{4\arcsin\sqrt{p}} - \frac{1}{2}\rceil_+$，保证 $\frac{\pi}{4n + 2} \le \arcsin\sqrt{p} < \frac{\pi}{2}$，从而修饰后的有效成功概率 $r = \sin^2(\frac{\pi}{4n + 2})$ 满足 $0 < r \le p < 1$，比例 $q = r/p$ 满足 $0 < q \le 1$，且 $\mathrm{coinRotation}(q)$ 为实正交（从而复幺正）分块矩阵。将复合制备算子取为 $U_q = (\mathrm{coinRotation}(q)\cdot\mathrm{coinLift}(C))\cdot\mathrm{coinEmbed}(J)$，它在扩展目标投影 $\mathrm{coinGood}(P)$ 下的成功格拉姆矩阵恰为 $(\sqrt{q})^2 p I_s = q p I_s = r I_s$，且归一化成功块保持为 $\mathrm{coinEmbed}(\mathrm{success}(CJ, P, p))$。由于 $\theta_r = \arcsin\sqrt{r} = \frac{\pi}{4n + 2}$ 满足 $(2n + 1)\theta_r = \frac{\pi}{2}$，将 [@thm-grover-uniform-rotation] 应用于 $U_q$ 与步数 $n$，即得 $\sin((2n+1)\theta_r) = \sin(\pi/2) = 1$、$\cos((2n+1)\theta_r) = \cos(\pi/2) = 0$，从而 $V$ 精确等于 $\mathrm{coinEmbed}(\mathrm{success}(CJ, P, p))$，失败分量 $(1 - \mathrm{coinGood}(P))V = 0$。最后，门字 $\mathrm{amplificationWord}(n)$ 包含初始 $1$ 次 `.source` 与 $n$ 个 `reflectionBlock` 中各 $2$ 次源调用（`.source` 与 `.sourceAdjoint`），故 $\mathrm{sourceQueries}(w) = 2n + 1$；利用天花板下界 $n < \frac{\pi}{4\arcsin\sqrt{p}} + \frac{1}{2}$ 及 $\arcsin\sqrt{p} \ge \sqrt{p}$，即得 $2n + 1 \le \frac{\pi/2}{\arcsin\sqrt{p}} + 2 \le \frac{\pi/2 + 2}{\sqrt{p}}$。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch16-slowed-steps"}
**步子调慢一点，整数步正好落在目标上。** 取 $p = 1/16$，$n = 3$：左栏按原步长 $\theta \approx 14.48^\circ$ 走，紫色的三步之后琥珀色的箭头越过成功方向 $W$，品红的弧多转了 $11.3^\circ$；右栏用硬币把每步调慢到 $\theta_r = \pi/14 = 180^\circ/14$，同样三步，琥珀色的箭头正好落在 $W$ 上，即 $(2n+1)\theta_r = \pi/2$，见 [@cor-exact-source-query-count]。
:::

**重要概念区分（见图 16 面板 III）**：[@cor-exact-source-query-count] 中的 `sourceQueries(w)` **仅仅统计门字 $w$ 中调用 `.source` 与 `.sourceAdjoint` 的次数**（在 $p = 1$ 时为 $1$，在 $p < 1$ 时等于 $2n + 1 \le \frac{\pi/2 + 2}{\sqrt{p}}$），而且该构造假设已知成功概率 $p$ 并直接使用了依赖 $q = r/p$ 的连续硬币旋转门 `coinRotation q`。因此，`sourceQueries(w)` 既不是门字 $w$ 的全部门数，**更绝不能与离散 $\{H, T\}$ 门集的渐近门编译字长（见章末 [@rem-solovay-kitaev-literature]）混为一谈**。

现在，让我们通过一个四步综合算例，把切比雪夫递推在 $x = 1/2$ 处的数值、$\{H, T\}$ 门集在 $L = 0, 1, 2, 3$ 下的精确球面顶点与三维割圆多面体支撑间隙，以及 $p = 1/4, 1/16, 1/64$ 下的精确源查询计数逐一复核。

::: {.example #ex-finite-ht-polytope title="切比雪夫 x=1/2 递推、L≤3 离散 {H,T} 多面体五顶点与精确源查询阶梯验算"}
本例分四步给出可逐项复核的数值与几何计算：

**第一步：$x = 1/2 = \cos(\pi/3)$ 处的标量幂和递推与二维块 $W(x)^3 = -I_2$。**
取 $\theta = \pi/3 = 60^\circ$，则 $x = \cos(\pi/3) = \frac{1}{2}$，$a = e^{i\pi/3} = \frac{1 + i\sqrt{3}}{2}$，$b = e^{-i\pi/3} = \frac{1 - i\sqrt{3}}{2}$，满足 $ab = 1$ 且 $a + b = 2x = 1$。按 [@thm-chebyshev-trace-recurrence] 的递推律 $t_{m+2} = (a+b)t_{m+1} - t_m = t_{m+1} - t_m$ 逐步计算：

$$
t_0 = 2, \qquad t_1 = 1, \qquad t_2 = 1 \cdot 1 - 2 = -1, \qquad t_3 = 1 \cdot (-1) - 1 = -2.
$$

折半即得切比雪夫多项式值 $T_0(\frac{1}{2}) = 1$、$T_1(\frac{1}{2}) = \frac{1}{2}$、$T_2(\frac{1}{2}) = -\frac{1}{2}$、$T_3(\frac{1}{2}) = 4(\frac{1}{2})^3 - 3(\frac{1}{2}) = -1 = \frac{t_3}{2}$。代入二维信号旋转矩阵 $W(\frac{1}{2}) = \begin{pmatrix} 1/2 & i\sqrt{3}/2 \\ i\sqrt{3}/2 & 1/2 \end{pmatrix}$，直接三次自乘得

$$
W\Bigl(\frac{1}{2}\Bigr)^3 = \begin{pmatrix} \cos\pi & i\sin\pi \\ i\sin\pi & \cos\pi \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix} = -I_2,
$$

左上角元素恰为 $T_3(1/2) = -1$。

**第二步：固定初态 $\vv{r}_0 = \vv{e}_z$ 在 $L = 0, 1, 2, 3$ 下的精确 $\{H, T\}$ 球面轨道 $\mathcal{S}_L$ 与五顶点多面体 $P_3$。**
在三维布洛赫空间 $\mathbb{R}^3$ 中，$H$ 门与 $T$ 门诱导的正交旋转矩阵分别为：

$$
R_H(x, y, z) = (z,\, -y,\, x), \qquad R_T(x, y, z) = \Bigl(\frac{x - y}{\sqrt{2}},\, \frac{x + y}{\sqrt{2}},\, z\Bigr).
$$

从北极单点集 $\mathcal{S}_0 = \{\vv{e}_z = (0, 0, 1)\}$ 出发，每一层对前一层全体点作用 $R_H, R_T$ 并与旧集合求并（$\mathcal{S}_{L} = \mathcal{S}_{L-1} \cup R_H(\mathcal{S}_{L-1}) \cup R_T(\mathcal{S}_{L-1})$）：

- **$L = 0$（$|\mathcal{S}_0| = 1$，零维单点）**：$\mathcal{S}_0 = \bigl\{(0, 0, 1)\bigr\}$；
- **$L = 1$（$|\mathcal{S}_1| = 2$，一维线段）**：因 $R_T\vv{e}_z = \vv{e}_z$（北极是 $T$ 门的不动点），唯独 $R_H\vv{e}_z = (1, 0, 0) = \vv{e}_x$ 产生新点，故 $\mathcal{S}_1 = \bigl\{\vv{e}_z,\; \vv{e}_x\bigr\}$；
- **$L = 2$（$|\mathcal{S}_2| = 3$，二维平面三角形）**：对 $\vv{e}_x$ 作用 $R_H$ 退回 $\vv{e}_z$，作用 $R_T$ 生出赤道 $45^\circ$ 点 $\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}} = (\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0)$，故

  $$
  \mathcal{S}_2 = \Bigl\{\, \vv{e}_z,\; \vv{e}_x,\; \frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}} \,\Bigr\};
  $$

- **$L = 3$（$|\mathcal{S}_3| = 5$，首次张成满三维凸多面体 $P_3$）**：对新点 $\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}}$ 作用 $R_T$ 得到正东偏左的 $+Y$ 极点 $R_T\bigl(\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}}\bigr) = (0, 1, 0) = \vv{e}_y$，作用 $R_H$ 得到子午斜点 $R_H\bigl(\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}}\bigr) = (0, -\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}) = \frac{\vv{e}_z - \vv{e}_y}{\sqrt{2}}$。因此 $L = 0, 1, 2, 3$ 的可达点数依次为 **$1, 2, 3, 5$**，且 $P_3 = \operatorname{conv}(\mathcal{S}_3)$ 的全部五个顶点精确为：

  $$
  \mathcal{S}_3 = \Bigl\{\, \vv{e}_z,\; \vv{e}_x,\; \frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}},\; \vv{e}_y,\; \frac{\vv{e}_z - \vv{e}_y}{\sqrt{2}} \,\Bigr\}.
  $$

  注意：$L = 3$ 虽首次达到满三维，但这五个顶点的 $x$ 坐标与 $z$ 坐标全部满足 $x \ge 0, z \ge 0$，因此**球心原点 $(0,0,0)$ 并不在 $P_3$ 的内部**（图 16 面板 II 展示的包裹球心的多面体对应更大门长 $L$ 下的可达轨道示意，绝非把 $L = 3$ 的五点画成包裹原点的球面网格）。

**第三步：$P_3$ 的方向支撑间隙与独立正八面体参照面的弦面曲率间隙。**
在 $L = 3$ 的五顶点集 $\mathcal{S}_3$ 上：沿 $+\vv{e}_y$ 方向的最大内积支持高度为 $\max_{\vv{s} \in \mathcal{S}_3} (\vv{e}_y \cdot \vv{s}) = 1$（由顶点 $\vv{e}_y$ 精确达到，间隙为 $0$）；然而沿 $-\vv{e}_x = (-1, 0, 0)$ 方向，由于五个顶点的第一分量均非负（$\min x = 0$），支持高度仅为

$$
h_{-\vv{e}_x}(P_3) = \max_{\vv{s} \in \mathcal{S}_3}\bigl((-\vv{e}_x)\cdot\vv{s}\bigr) = 0,
$$

而单位球面在该方向的支持高度为 $1$，支撑间隙高达 $1 - 0 = 1$！这清楚表明 $L = 3$ 远非全方向的小误差球面近似（更细阶段的几何覆盖误差严格按 $\varepsilon_L = \max_{\vv{r}\in S^2}\min_{\vv{s}\in\mathcal{S}_L}\arccos(\vv{r}\cdot\vv{s})$ 评估，不宣称小 $L$ 服从统一的渐近幂律）。

为了单独直观对照“平直弦面与弯曲球皮的径向间隙”，我们另取由六个坐标极点张成的独立参考正八面体 $\operatorname{conv}\{\pm\vv{e}_x, \pm\vv{e}_y, \pm\vv{e}_z\}$（注意：并非声称这六个轴点在 $L = 3$ 时已全部可达）：其第一卦限三角形弦面的单位外法向为 $\vv{n} = \frac{1}{\sqrt{3}}(1, 1, 1)$，面支持高度为 $h = \vv{n}\cdot\vv{e}_x = \frac{1}{\sqrt{3}}$，故球面顶点到平直弦面的径向支撑间隙为

$$
1 - \frac{1}{\sqrt{3}} \approx 0.4226497308103742 > 0.
$$

**第四步：[@cor-exact-source-query-count] 在 $p = 1/4, 1/16, 1/64$ 下的精确源查询计数核对表。**
对三个典型成功概率 $p \in \{1/4,\, 1/16,\, 1/64\}$，代入 [@cor-exact-source-query-count] 的公式计算整数步数 $n = \lceil\frac{\pi}{4\arcsin\sqrt{p}} - \frac{1}{2}\rceil_+$、源查询次数 $\mathrm{sourceQueries}(w) = 2n + 1$、修饰成功概率 $r = \sin^2(\frac{\pi}{4n+2})$、硬币缩放比 $q = r/p$ 以及理论上界 $\frac{\pi/2 + 2}{\sqrt{p}}$：

| 初始成功概率 $p$ | 步数 $n$ | 源查询次数 $\mathrm{sourceQueries} = 2n+1$ | 修饰概率 $r = \sin^2\bigl(\frac{\pi}{4n+2}\bigr)$ | 硬币参数 $q = r/p \in (0, 1]$ | 上界 $\dfrac{\pi/2 + 2}{\sqrt{p}}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $1/4 = 0.25$ | $1$ | $3$ | $0.25$ | $1$ | $\approx 7.14159265$ |
| $1/16 = 0.0625$ | $3$ | $7$ | $\approx 0.049515566048790434$ | $\approx 0.7922490567806469$ | $\approx 14.28318531$ |
| $1/64 = 0.015625$ | $6$ | $13$ | $\approx 0.014529091286973985$ | $\approx 0.9298618423663351$ | $\approx 28.56637061$ |

表中每一行均严格满足 $0 < q \le 1$、$(2n+1)\arcsin\sqrt{r} = \frac{\pi}{2}$ 以及 $2n + 1 \le \frac{\pi/2 + 2}{\sqrt{p}}$。再次强调：这一阶梯给出的是已知 $p$ 时的振幅放大源算子查询次数，而非离散 $\{H, T\}$ 编译门数。
:::

::: {.viz src="gate-word-polytope" preset="three" height="500"}
**门长 3：五个顶点，球心在外。** 例中的五个青色顶点第一次围成立体，但它们都在 $x \ge 0$、$z \ge 0$ 的一侧。琥珀色的目标指向 $-\vv{e}_x$：最近的顶点在 $90^\circ$ 外，支持高度 $h = 0$，品红的径向间隙从球心一直到球皮，整整为 $1$，与第三步的计算一致。
:::

<!-- alias: #rem-qsvt-solovay-kitaev-literature -->
::: {.remark #rem-solovay-kitaev-literature title="Solovay–Kitaev 门编译定理与对数多面体逼近复杂度（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 当我们将目标从连续两轴旋转（[@prop-two-axis-finite-word]）转向离散有限门集编译时，其渐近字长由量子编译理论中的 **Solovay–Kitaev 定理**（参见 C. M. Dawson and M. A. Nielsen, *The Solovay–Kitaev algorithm*, Quantum Inf. Comput. **6**, 81–95, 2006, arXiv:quant-ph/0505030）给出：

1. **多对数渐近字长 $L = O(\log^c(1/\varepsilon))$**：设 $\mathcal{G} \subset \mathrm{SU}(2)$ 为有限、含逆元（$\mathcal{G} = \mathcal{G}^{-1}$）且生成稠密子群 $\langle\mathcal{G}\rangle$ 的离散门集。则对任意目标幺正门 $U \in \mathrm{SU}(2)$ 及任意足够小的精度 $\varepsilon > 0$，存在长度 $L = O\bigl(\log^c(1/\varepsilon)\bigr)$ 的门字 $w \in \mathcal{G}^*$ 使得算子范数误差满足 $\norm{U - w}_{\mathrm{op}} \le \varepsilon$。在 Dawson–Nielsen 的经典五因子群换位子递归构造中，每一层递归用 $5$ 个前一层近似字拼出精度从 $\varepsilon_{k-1}$ 提升至 $\varepsilon_k = O(\varepsilon_{k-1}^{3/2})$ 的修正字，从而给出幂指数

   $$
   c = \frac{\ln 5}{\ln(3/2)} \approx 3.97
   $$

   （其中的隐含常数依赖于具体门集与所选误差度量）。
2. **门集 $\{H, T\}$ 的逆门封闭与射影规范**：对于标准容错门集 $\{H, T\}$，由于 $H$ 自身是二阶对合门（$H^{-1} = H$），而 $T$ 是八阶相位门（在射影群 $\mathrm{PU}(2)$ 中 $T^{-1} = T^7$；若在 $\mathrm{SU}(2)$ 中使用幺模提升 $\tilde{H} = iH, \tilde{T} = e^{-i\pi/8}T$，则 $\tilde{H}^{-1} = -\tilde{H} = \tilde{H}^3$、$\tilde{T}^{-1} = -\tilde{T}^7 = \tilde{T}^{15}$，中心符号 $\pm I_2$ 需在提升中一致追踪），逆门均可用常数个正向门拼出，因此在射影距离 $\delta(U, V) = \min_{\varphi}\norm{U - e^{i\varphi}V}_{\mathrm{op}}$ 下同样继承 $L = O(\log^c(1/\varepsilon))$ 的渐近长度结论，仅有限前因子发生相应缩放。
3. **李代数换位子步长的精确尺度（切勿线性化误写）**：Solovay–Kitaev 递归步的核心局部恒等式是群换位子的 Baker–Campbell–Hausdorff 展开

   $$
   \exp(A)\exp(B)\exp(-A)\exp(-B) = \exp\bigl([A, B] + O(\norm{A}^3 + \norm{B}^3)\bigr).
   $$

   这里要合成步长为 $O(\varepsilon)$ 的微小旋转修正 $\exp([A, B])$，必须取两根步长为 **$O(\sqrt{\varepsilon})$** 的旋转生成元 $A, B$，使换位子主项 $[A, B]$ 落在 $O(\sqrt{\varepsilon})\cdot O(\sqrt{\varepsilon}) = O(\varepsilon)$ 量级，而高阶残差落在 $O\bigl((\sqrt{\varepsilon})^3\bigr) = O(\varepsilon^{3/2})$ 量级（绝不能错写成换位子对原步长呈线性关系）。
4. **反柏拉图边界重申**：Solovay–Kitaev 定理是一个关于 $\varepsilon \to 0$ 时字长增长率的渐近逼近定理——它**既不意味着**在任何有限字长 $L < \infty$ 下最坏目标门 $U \notin \mathcal{W}_{\le L}$ 的覆盖残差可以归零（虽然恰好已属于有限字集 $\mathcal{W}_{\le L}$ 的离散顶点如 $I, H, T$ 本身具有零误差，但在整个连续群或球面上，最坏覆盖半径 $\varepsilon_L > 0$ 对一切有限 $L$ 恒成立），**也不允许**把固定初态在 $S^2$ 上的单态覆盖误差 $\varepsilon_L$ 直接等同于 $\mathrm{SU}(2)/\mathrm{PU}(2)$ 上的全门编译误差。
:::

::: {.viz src="gate-word-polytope" preset="shrink" height="500"}
**最大的缺口一级级缩小，却补不上。** 门长从 $0$ 走到 $20$：青色的可达点一层层变密，品红虚线圈出的最大空球冠从 $180^\circ$ 缩到 $\varepsilon_{20} = 9.10^\circ$，有几层一点也不缩；到 $L = 20$ 有 $971$ 个点，洞仍然在。旁边品红的台阶是页面对每个 $L$ 实算的覆盖半径 $\varepsilon_L$（琥珀色的是 $L = 20$），不拟合任何渐近速率；渐近字长是 [@rem-solovay-kitaev-literature] 的文献结果。
:::

至此，第四部“高维球体——纠缠、拓扑与量子算法”的四章旅程全部合拢：我们从双比特 $6 + 9 = 15$ 的关联扇区与贝尔 $45^\circ$ 余弦破缺（[第十三章](ch13-entanglement-and-chsh.md)）出发，用泡利稳定子与架编织把脆弱的局部线藏进正交综合征子空间（[第十四章](ch14-cloning-codes-and-braids.md)），在不变平面旋转与有限群对偶零化子相消中看清了 Grover 与 Shor 算法的几何引擎（[第十五章](ch15-grover-qft-and-period-finding.md)），最终在切比雪夫递推与三维割圆多面体 $P_L$ 中直面了有限离散门字逼近连续球面的永恒残差 $\varepsilon_L > 0$（本章）。正是这道在任何有限步内都无法彻底抹平的多面体缝隙，为我们打开了通往第五部与第六部——时空与观察者复杂性、不完备性对角线逃逸与余弦自指不动点（其经典分析与算术性质见[第二十四章](ch24-cosine-fixed-points-and-self-reference.md) [@rem-banach-dottie-hairy-ball-literature]）——的深层大门。

::: {.viz src="gate-word-polytope" height="560"}
**门字多面体实验室。** 拖时间轴改门长 $L$，在球上拖动琥珀色的目标，或换成最坏方向：青色是长度不超过 $L$ 的 $\{H, T\}$ 门字的落点与它们的凸包，品红是到最近可达点的弧、径向间隙与空球冠。绿色框是 [@prop-two-axis-finite-word]，作为连续轴圆的对照；其余都是页面的数值。
:::

