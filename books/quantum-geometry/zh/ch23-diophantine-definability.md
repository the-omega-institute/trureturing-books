# 第二十三章 有理数里的整数骨架：四元数范数与丢番图可定义性

> *“Z在 Q中是丢番图的,你查一下最新的一个研究,结合分析一下”*

在[第一章](ch01-measurement.md)中，我们曾追问：连续旋转的球面箭头，如何通过一维快门切出离散的“量子（liàng）”刻度？现在，让我们把完全相同的几何追问投向数论与逻辑的深海：

考察有理数域 $\mathbb{Q}$。在 $\mathbb{Q}$ 里，任意两个有理数 $r_1 < r_2$ 之间都挤着无穷多个有理数 $\frac{r_1 + r_2}{2}$；加法和乘法在 $\mathbb{Q}$ 上处处平滑可逆（非零元皆可作除法），表面上看不出任何离散的“台阶”或“网格”。然而，就在这片稠密无间断的有理数大海内部，却潜伏着一副坚硬无比的**离散整数骨架** $\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\} \subset \mathbb{Q}$！

如果只允许你使用有理数的加法 $+$、乘法 $\times$、常数 $0, 1$ 以及逻辑量词（即一阶域语言 $\mathcal{L}_{\mathrm{ring}} = \{+, -, \times, 0, 1\}$），完全不准事先偷看“分子分母是否整除”的外部标签，你能不能仅凭多项式方程在有理数大海 $\mathbb{Q}$ 里把整数集 $\mathbb{Z}$ 精准地筛选出来？

更令人拍案叫绝的是：在现代算术几何的一阶可定义性文献中（见章末 [@rem-diophantine-z-in-q-literature]），数学家用来在有理数域 $\mathbb{Q}$ 中刻画整数骨架的核心几何工具，恰恰是我们全书反复锤炼的老朋友——**四元数代数（quaternion algebras）的约化范数球面 $\operatorname{Nrd}(\alpha)$ 与约化迹投影 $\operatorname{Trd}(\alpha)$**，以及二元二次范数型的判别式不变量！

本章将沿着“范数球面与迹投影如何锁住离散整格”这一主线，首先在 Lean 4 中严格建立两条最核心的二次代数整数范数锁——判别式恒为 $\Delta = -3$ 的**艾森斯坦（Eisenstein / Löschian）六角交越范数型**与判别式为 $\Delta = +5$ 的**黄金整数佩尔（Pell）迹—范数恒等式**；随后在第三层认识论边界审计框（[@rem-diophantine-z-in-q-literature]）中，剖析有理数域中一阶定义整数集的文献脉络、量词前缀（$\forall$、$\forall\exists$ 与存在性丢番图 $\exists$）的本质分野，以及它与希尔伯特第十问题 $\mathrm{H10}(\mathbb{Q})$ 的关联。

::: {.figure src="ch23-overview"}
**图 23。** 本章地图：第 I 栏，艾森斯坦六角格上青色的范数 $7$ 圆穿过 $12$ 个格点，$t = -1$ 与 $t = 2$ 两块品红的格子一正一斜、面积相同（§23.1–§23.2）；第 II 栏，黄金单位 $\varphi^n$ 交替落在 $g\bar{g} = +1$ 与 $-1$ 两支品红双曲线上，点旁是 $(L_n, F_n)$（§23.2）；第 III 栏，按分母排开的有理数里，分母为 $1$ 的青色一行就是 $\mathbb{Z}$，紫色标签是用全称量词定义 $\mathbb{Z}$ 的文献结果，红色标签是“只用存在量词能否定义”这一开放问题（§23.3）。
:::

## 23.1 为什么连续有理数里藏着离散晶格：二次范数与迹投影 {#sec-ch23-1}

为什么单靠一次线性方程 $ax + b = 0$ 在有理数域 $\mathbb{Q}$ 里永远筛不出整数 $\mathbb{Z}$？因为线性方程对有理缩放毫无抵抗力：任何非零有理数都能解线性方程。要想在允许任意分母的 $\mathbb{Q}$ 中卡住分母，必须依靠**二次范数形式（quadratic norm forms）**——正如在布洛赫球面上，线性坐标本身无法固定单位球壳，唯有二次模长约束 $x_0^2 + x_1^2 + x_2^2 + x_3^2 = 1$ 才能把向量死死锁在球面上！

在二次代数整数环与四元数序（quaternion orders）中，每一个代数元素 $g$ 都同时携带两把天然的无坐标几何不变量（与我们在[第一章](ch01-measurement.md)和第七部分讨论 $2\times 2$ 矩阵的迹与行列式如出一辙）：

1. **迹投影（Trace）** $\operatorname{Tr}(g) = g + \bar{g}$：将二维复平面或四维四元数空间正交投影到一维实主轴上的两倍相融刻度（对应量子门旋转器的标量部 $2\cos(\theta/2)$）；
2. **范数（Norm）** $\operatorname{N}(g) = g\bar{g}$：元素与其共轭相乘所得的二次模长（对应行列式与旋转器的单位模长锁）。

这两把尺子一旦联手，立刻织成一张刚性的丢番图筛网：当范数 $\operatorname{N}(g)$ 被固定在离散整数值（如单位圆/双曲线 $\operatorname{N}(g) = \pm 1$）时，迹投影 $\operatorname{Tr}(g)$ 便被强行量子化在一族离散的代数整数格点上！

::: {.figure src="ch23-trace-norm"}
**范数钉住，迹就只剩几个整数。** 以艾森斯坦整数为例：两个青色的圆是范数 $\operatorname{N} = 1$ 与 $\operatorname{N} = 3$，各穿过 $6$ 个格点；从每个格点向下引虚线，落到下面的迹尺 $\operatorname{Tr} = g + \bar{g} = 2\operatorname{Re} g$ 上，$\operatorname{N} = 1$ 的点只落在 $-2, -1, 1, 2$，$\operatorname{N} = 3$ 的点只落在 $-3, 0, 3$。
:::

让我们先考察复平面上最对称的二维晶格——由三次本原单位根 $\omega = e^{2\pi i/3} = \frac{-1 + i\sqrt{3}}{2}$（满足 $\omega^2 + \omega + 1 = 0$，即 $120^\circ$ 与 $60^\circ$ 六角对称）生成的**艾森斯坦整数环** $\mathbb{Z}[\omega]$。

::: {.viz src="norm-lattice" preset="hex" height="500"}
**艾森斯坦整数排成六角格。** 每个格点到原点距离的平方就是它的范数 $x^2 + xy + y^2$：实线圆 1、3、4、7、9、12、13 都穿过格点，虚线圆 2、5、6 一个格点也碰不到。青色的圆是范数 7，上面有 12 个格点，琥珀色的点是 $(-1, 3)$；品红的平行四边形是两根基矢 $u_1$、$u_2$ 张成的格子。
:::

在 Lean 模块 `D5/S3/PrimeForms/Crossing/CrossingNormForm` 中，我们同时考察主艾森斯坦（Löschian）范数型与一族由整数参数 $t \in \mathbb{Z}$ 标记的**单参数交越二元二次型**（crossing binary quadratic form）。

::: {.definition #def-qform-and-eisnorm title="单参数交越二次型 Qform 与艾森斯坦主范数型 eisNorm" lean="D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform D5/S3/PrimeForms/Crossing/CrossingNormForm.eisNorm"}
对任意整数 $t, P, Q, x, y \in \mathbb{Z}$，定义：

1. **单参数交越二次型** [`Qform`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform)：

   $$
   \operatorname{Qform}(t, P, Q) \;:=\; P^2 - (2t + 1)PQ + (t^2 + t + 1)Q^2 \in \mathbb{Z} \,;
   $$

2. **艾森斯坦（Löschian）主范数型** [`eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.eisNorm)（即 $\mathbb{Z}[\omega]$ 中 $x - y\omega$ 的代数范数）：

   $$
   \operatorname{eisNorm}(x, y) \;:=\; x^2 + xy + y^2 \in \mathbb{Z}.
   $$
:::

表面上看，当整数参数 $t \in \mathbb{Z}$ 跑遍无穷多个整数时，$\operatorname{Qform}(t, P, Q) = P^2 - (2t+1)PQ + (t^2+t+1)Q^2$ 的系数随着 $t$ 剧烈变化，似乎生成了无穷多张彼此不同的二次曲面。然而，只要我们用几何的眼光审视二元二次型的幺模剪切变换（$\mathrm{SL}_2(\mathbb{Z})$ 基变换），就会发现这无穷多张二次型在整数格 $\mathbb{Z}^2$ 上其实是**同一颗六角范数球**在不同斜交基底下的投影！

::: {.viz src="norm-lattice" preset="skew" height="500"}
**同一批格点，斜着读。** 改用整数坐标 $(P, Q)$、取 $t = 2$，二次型成了 $P^2 - 5PQ + 7Q^2$，范数 7 的圆被拉成一只又细又斜的青色椭圆，琥珀色的点落在 $(8, 3)$；切回复平面，椭圆变回圆，$(8, 3)$ 回到 $(-1, 3)$（[@thm-qform-eq-eisnorm]）。
:::

## 23.2 艾森斯坦范数剪切不变性与黄金佩尔恒等式的形式化证明 {#sec-ch23-2}

让我们用三条经 Lean 内核验证的定理，把单参数交越二次型族 $\operatorname{Qform}(t, \cdot, \cdot)$ 的剪切约化、判别式锁定与值域坍缩完整建立起来。

::: {.theorem #thm-qform-eq-eisnorm title="单参数交越二次型向艾森斯坦主范数型的幺模剪切归约" lean="D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm"}
对任意整数 $t, P, Q \in \mathbb{Z}$，单参数交越二次型在显式整系数剪切代换 $(P, Q) \mapsto (P - (t + 1)Q,\; Q)$ 下恒等于艾森斯坦主范数型：

$$
\operatorname{Qform}(t, P, Q) \;=\; \operatorname{eisNorm}\bigl(P - (t + 1)Q,\; Q\bigr).
$$
:::

::: proof
按 [@def-qform-and-eisnorm] 展开右端的艾森斯坦范数型，令 $x = P - (t + 1)Q$、$y = Q$：

$$
\begin{aligned}
\operatorname{eisNorm}\bigl(P - (t + 1)Q,\; Q\bigr)
&= \bigl(P - (t + 1)Q\bigr)^2 + \bigl(P - (t + 1)Q\bigr)Q + Q^2 \\
&= P^2 - 2(t + 1)PQ + (t + 1)^2 Q^2 + PQ - (t + 1)Q^2 + Q^2 \\
&= P^2 - (2t + 1)PQ + \bigl((t^2 + 2t + 1) - (t + 1) + 1\bigr)Q^2 \\
&= P^2 - (2t + 1)PQ + (t^2 + t + 1)Q^2 = \operatorname{Qform}(t, P, Q).
\end{aligned}
$$

Lean 中展开 `Qform` 与 `eisNorm` 后由交换环策略 `ring` 一步核验。完整证明由 Lean 内核检查。
:::

为什么无论参数 $t \in \mathbb{Z}$ 怎么变，$\operatorname{Qform}(t, P, Q)$ 都能通过行列式为 $1$ 的整矩阵 $\begin{pmatrix} 1 & -(t+1) \\ 0 & 1 \end{pmatrix} \in \mathrm{SL}_2(\mathbb{Z})$ 无损还原回 $x^2 + xy + y^2$？因为它的二次型判别式 $\Delta = b^2 - 4ac$ 被死死钉在了艾森斯坦六角晶格的基本判别式 $-3$ 上，连一丝一毫对 $t$ 的依赖都已在代数抵消中蒸发殆尽！

::: {.lemma #lem-qform-discriminant title="单参数交越二次型的判别式恒为 -3" lean="D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_discriminant"}
对任意整数 $t \in \mathbb{Z}$，二次型 $\operatorname{Qform}(t, P, Q)$ 的判别式与参数 $t$ 无关，恒等于 $-3$：

$$
(2t + 1)^2 - 4(t^2 + t + 1) = -3.
$$
:::

::: proof
将左端按整系数多项式展开：$(4t^2 + 4t + 1) - (4t^2 + 4t + 4) = -3$。二次项 $4t^2$ 与一次项 $4t$ 精确相消。完整证明由 Lean 内核检查。
:::

::: {.viz src="norm-lattice" preset="shear" height="500"}
**基矢在滑，格子的面积不动。** 复平面里 $t$ 从 $-1$ 走到 $2$：格点与圆一动不动，只有琥珀色的基矢 $u_2$ 沿琥珀色虚线滑过去，品红的格子被剪斜，面积始终是 $\sqrt{3}/2$；二次型的判别式等于 $-4$ 乘这块面积的平方，所以恒为 $-3$（[@lem-qform-discriminant]）。
:::

由于剪切变换 $(P, Q) \mapsto (P - (t+1)Q, Q)$ 在整数格 $\mathbb{Z} \times \mathbb{Z}$ 上拥有显式整系数逆变换 $(x, y) \mapsto (x + (t+1)y, y)$，整族无穷多个二次型 $\operatorname{Qform}(t, \cdot, \cdot)$ 在 $\mathbb{Z} \times \mathbb{Z}$ 上所能表出的整数集合，当场坍缩为同一个集合——艾森斯坦主范数型的值域！

::: {.corollary #cor-qform-range-eq-eisnorm title="单参数交越二次型族的值域恒等于艾森斯坦范数集" lean="D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm"}
对任意整数 $t \in \mathbb{Z}$，映射 $(P, Q) \mapsto \operatorname{Qform}(t, P, Q)$ 在 $\mathbb{Z} \times \mathbb{Z}$ 上的值域（`Set.range`）恒等于艾森斯坦主范数型 $(x, y) \mapsto \operatorname{eisNorm}(x, y)$ 的值域：

$$
\operatorname{ Set.range }\bigl(\lambda p : \mathbb{Z} \times \mathbb{Z} \Rightarrow \operatorname{Qform}(t, p.1, p.2)\bigr)
\;=\;
\operatorname{ Set.range }\bigl(\lambda p : \mathbb{Z} \times \mathbb{Z} \Rightarrow \operatorname{eisNorm}(p.1, p.2)\bigr).
$$
:::

::: proof
对外延相等的两侧包含关系分别取证：（$\subseteq$）若 $n = \operatorname{Qform}(t, P, Q)$，由 [@thm-qform-eq-eisnorm] 知 $n = \operatorname{eisNorm}(P - (t+1)Q, Q)$，故 $n$ 属于右端值域；（$\supseteq$）若 $n = \operatorname{eisNorm}(x, y)$，取整点对 $(P, Q) = (x + (t+1)y,\; y) \in \mathbb{Z} \times \mathbb{Z}$，由 [@thm-qform-eq-eisnorm] 及整环消去 $(x + (t+1)y) - (t+1)y = x$ 知 $\operatorname{Qform}(t, x + (t+1)y, y) = \operatorname{eisNorm}(x, y) = n$，故 $n$ 属于左端值域。完整证明由 Lean 内核检查。
:::

::: {.viz src="norm-lattice" preset="range" height="500"}
**每个 $t$ 取到的值都一样。** 整数坐标里 $t$ 从 $-1$ 走到 $2$：每一行格点沿着自己那一行滑动（细线是走过的路），青色椭圆越拉越斜；每到整数 $t$，格点又正好填满整数网格，右下角亮起的值始终是 0、1、3、4、7、9、12、13（[@cor-qform-range-eq-eisnorm]）。
:::

看过了判别式 $\Delta = -3 < 0$ 的正定椭圆（六角晶格）范数锁，让我们再转向实二次域 $\mathbb{Q}(\sqrt{5})$ 中判别式 $\Delta = +5 > 0$ 的**不定双曲范数锁**——黄金整数环 $\mathbb{Z}[\varphi]$（其中黄金比 $\varphi = \frac{1 + \sqrt{5}}{2}$ 满足自指二次方程 $\varphi^2 = \varphi + 1$，我们将在[第二十四章](ch24-cosine-fixed-points-and-self-reference.md)证明它是正实数上连分数算子 $x \mapsto 1 + 1/x$ 的唯一不动点）。

在 Lean 模块 `D5/S0/Carrier/Ring` 与 `D5/S0/Carrier/Norm` 中，黄金整数及其代数范数定义如下。

::: {.definition #def-golden-int-and-norm title="黄金整数环 GoldenInt 及其二次代数范数 norm" lean="D5/S0/Carrier/Ring.GoldenInt D5/S0/Carrier/Norm.norm"}
**黄金整数**（Lean 中记作结构体 [`GoldenInt`](lean:D5/S0/Carrier/Ring.GoldenInt)）由一对整数坐标 $(a, b) \in \mathbb{Z} \times \mathbb{Z}$ 表示（对应代数整数 $g = a + b\varphi \in \mathbb{Z}[\varphi]$），其加法按分量相加，乘法按关系 $\varphi^2 = \varphi + 1$ 定义为

$$
(a_1, b_1) \cdot (a_2, b_2) \;:=\; \bigl(a_1 a_2 + b_1 b_2,\; a_1 b_2 + b_1 a_2 + b_1 b_2\bigr).
$$

对任意 $g = (a, b) \in \mathrm{GoldenInt}$，定义其**黄金代数范数**（[`norm`](lean:D5/S0/Carrier/Norm.norm) $g$，等于 $g$ 与其代数共轭 $\bar{g} = (a + b) - b\varphi$ 的乘积）为

$$
\operatorname{norm}(g) \;:=\; a^2 + ab - b^2 \in \mathbb{Z}.
$$
:::

::: {.viz src="norm-lattice" preset="norm" height="500"}
**黄金范数是一块矩形的面积。** 把 $g = a + b\varphi$ 画在 $(g, \bar{g})$ 平面上：琥珀色的 $g = 2 + \varphi$ 与原点张成的品红矩形，面积 $g\bar{g} = 2^2 + 2 \cdot 1 - 1^2 = 5$；品红双曲线上每一点张出的矩形面积都是 $\pm 5$，灰色双曲线属于其余的范数。
:::

在黄金整数 $g = a + b\varphi$ 中，由于 $\varphi + \bar{\varphi} = 1$，其**代数迹**恰好是整数线性组合 $\operatorname{trace}(g) = g + \bar{g} = (a + b\varphi) + (a + b - b\varphi) = 2a + b$！当我们拿迹的平方 $(2a + b)^2$ 减去五倍的副坐标平方 $5b^2$ 时，便得到了连接迹投影与代数范数的**黄金佩尔（Pell）恒等式**。

::: {.proposition #prop-pell-form-eq-four-mul-norm title="黄金整数的佩尔判别二次型等于四倍代数范数" lean="D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm"}
对任意黄金整数 $g = (a, b) \in \mathrm{GoldenInt}$，其迹坐标 $2a + b$ 与副坐标 $b$ 构成的佩尔二次型恒等于 $\operatorname{norm}(g)$ 的四倍：

$$
(2a + b)^2 - 5b^2 \;=\; 4\,\operatorname{norm}(g).
$$
:::

::: proof
按 [@def-golden-int-and-norm] 展开右端的 `norm_def`：

$$
4\,\operatorname{norm}(g) = 4(a^2 + ab - b^2) = 4a^2 + 4ab - 4b^2.
$$

同时展开左端：$(2a + b)^2 - 5b^2 = (4a^2 + 4ab + b^2) - 5b^2 = 4a^2 + 4ab - 4b^2$。两侧整系数多项式恒等。完整证明由 Lean 内核检查。
:::

::: {.viz src="norm-lattice" preset="pell" height="500"}
**转 45° 去读：迹与佩尔恒等式。** 青色对角线上的影子是迹 $2a + b = 5$，虚线对角线上的是 $\sqrt{5}\,b$；$5^2 - 5 \cdot 1^2 = 20 = 4 \times 5$，品红双曲线在这对新坐标里就是 $x^2 - 5y^2 = 20$（[@prop-pell-form-eq-four-mul-norm]）。
:::

请看 [@prop-pell-form-eq-four-mul-norm] 的惊人威力：在同一个模块 `GoldenPell` 中，正是凭借 $(2a + b)^2 - 5b^2 = 4\,\operatorname{norm}(g)$ 这座桥梁，Lean 进一步验证了著名的**佩尔—卢卡斯—斐波那契锁定定理** [`pell_pm_four_iff_signed_lucas_fib`](lean:D5/S3/Arith/GoldenPell.pell_pm_four_iff_signed_lucas_fib)：两个整数 $(x, y) \in \mathbb{Z}^2$ 满足不定二次丢番图方程

$$
x^2 - 5y^2 = \pm 4,
$$

**当且仅当** $g = \bigl(\frac{x-y}{2}, y\bigr) \in \mathrm{GoldenInt}$ 是范数为 $\operatorname{norm}(g) = \pm 1$ 的黄金整数可逆单位元（[`isUnit_iff_norm_eq_one_or_neg_one`](lean:D5/S0/Carrier/Units.isUnit_iff_norm_eq_one_or_neg_one)），这又**当且仅当** $(x, y)$ 恰好是同号整指数卢卡斯数（Lucas number $L_n = \operatorname{trace}(\varphi^n)$）与斐波那契数（Fibonacci number $F_n$）的配对 $(\pm L_n, \pm F_n)$！

::: {.viz src="norm-lattice" preset="units" height="500"}
**乘 $\varphi$：沿双曲线一格一格地跳。** 从 $1$ 出发，每乘一次 $\varphi$，琥珀色的点就在 $g\bar{g} = +1$ 与 $-1$ 两支品红双曲线之间跳一次：矩形越来越细长，面积在 $+1$ 与 $-1$ 之间翻转。点旁的数对 $(2a + b, b)$ 依次是 $(2, 0)$、$(1, 1)$、$(3, 1)$、$(4, 2)$、$(7, 3)$，正是 $(L_n, F_n)$。
:::

让我们在一个具体的数值算例中亲手体验这两把二次范数锁（$\Delta = -3$ 椭圆六角锁与 $\Delta = +5$ 双曲卢卡斯—斐波那契锁）如何把离散整数点锁死在二次曲线上。

::: {.example #ex-eisenstein-and-golden-pell-lattice title="艾森斯坦交越二次型 (t = 2) 与黄金佩尔双曲线 (L_n, F_n) 的显式手算"}
**第一部分：$\Delta = -3$ 艾森斯坦交越二次型的剪切还原。** 取参数 $t = 2$，写出 [@def-qform-and-eisnorm] 中的交越二次型：

$$
\operatorname{Qform}(2, P, Q) = P^2 - 5PQ + 7Q^2, \qquad \Delta = 5^2 - 4\times 7 = 25 - 28 = -3.
$$

任取整点 $(P, Q) = (8, 3)$，直接代入得 $\operatorname{Qform}(2, 8, 3) = 64 - 120 + 63 = 7$。现在按 [@thm-qform-eq-eisnorm] 作幺模剪切代换 $x = P - (t+1)Q = 8 - 3\times 3 = -1$，$y = Q = 3$，立刻还原为标准六角范数：

$$
\operatorname{eisNorm}(-1, 3) = (-1)^2 + (-1)(3) + 3^2 = 1 - 3 + 9 = 7!
$$

无论 $t$ 取多么庞大的整数，整张二次型曲面所表示的整数永远分毫不差地锁在洛施（Löschian）数集 $\{0, 1, 3, 4, 7, 9, 12, 13, 16, 19, 21, \dots\}$ 上。

**第二部分：$\Delta = +5$ 黄金整数单位元与卢卡斯—斐波那契佩尔锁。** 考察黄金单位元的幂次 $\varphi^n = a_n + b_n\varphi \in \mathrm{GoldenInt}$：

| 指数 $n$ | 黄金整数坐标 $g_n = (a_n, b_n)$ | 代数范数 $\operatorname{norm}(g_n) = a_n^2 + a_n b_n - b_n^2$ | 迹投影 $x_n = 2a_n + b_n = L_n$ | 副坐标 $y_n = b_n = F_n$ | 佩尔检验 $x_n^2 - 5y_n^2 = 4\operatorname{norm}(g_n)$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $0$ | $(1, 0)$ | $+1$ | $2(1)+0 = 2$ | $0$ | $2^2 - 5(0)^2 = +4$ |
| $1$ | $(0, 1)$ | $-1$ | $2(0)+1 = 1$ | $1$ | $1^2 - 5(1)^2 = -4$ |
| $2$ | $(1, 1)$ | $+1$ | $2(1)+1 = 3$ | $1$ | $3^2 - 5(1)^2 = +4$ |
| $3$ | $(1, 2)$ | $-1$ | $2(1)+2 = 4$ | $2$ | $4^2 - 5(2)^2 = -4$ |
| $4$ | $(2, 3)$ | $+1$ | $2(2)+3 = 7$ | $3$ | $7^2 - 5(3)^2 = +4$ |
| $5$ | $(3, 5)$ | $-1$ | $2(3)+5 = 11$ | $5$ | $11^2 - 5(5)^2 = -4$ |

看！只要把黄金范数锁在单位群 $\operatorname{norm}(g) = \pm 1$ 上，[@prop-pell-form-eq-four-mul-norm] 就自动把迹坐标 $x = 2a + b$ 与副坐标 $y = b$ 锁死在离散的卢卡斯—斐波那契整数格点 $(L_n, F_n)$ 上！
:::

::: {.viz src="pythagoras-number-escape" preset="golden" height="500"}
**$d = 5$：卢卡斯与斐波那契。** 渐近分数沿直线 $m = \sqrt{5}\,n$ 越贴越近，青色在线上方、品红在线下方；绿圈标出分母为斐波那契数、分子为卢卡斯数的格点 $(n, m) = (F_k, L_k)$，它们都落在 $m^2 - 5n^2 = \pm 4$ 上。加上正负号，这些配对恰是该方程的全部整数解（[`pell_pm_four_iff_signed_lucas_fib`](lean:D5/S3/Arith/GoldenPell.pell_pm_four_iff_signed_lucas_fib)）。
:::

::: {.viz src="norm-lattice" height="560"}
**范数格：完整实验室。** 两个场景共用一条时间轴：艾森斯坦场景推动参数 $t$，可在整数坐标 $(P, Q)$ 与复平面之间切换；黄金场景数乘 $\varphi$ 的次数，可把坐标轴转 45° 读出迹。点任一格点让它成为琥珀色的当前点。
:::

## 23.3 从二次型到四元数范数球面：$\mathbb{Z}$ 在 $\mathbb{Q}$ 中的可定义性全景 {#sec-ch23-3}

现在，让我们回答本章题记提出的那个核心问题：**如何把这种“用范数与迹锁定离散整数”的几何机制，从二元二次型推广到四维四元数代数，从而在有理数域 $\mathbb{Q}$ 的内部一阶定义出整数集 $\mathbb{Z}$？**

在二元二次型 $x^2 + xy + y^2$ 或 $x^2 - 5y^2$ 中，元素生活在二维平面（复二次域或实二次域）里；而在有理数域 $\mathbb{Q}$ 上构造的四维**四元数代数**（quaternion algebra）

$$
H_{a, b}(\mathbb{Q}) \;=\; \mathbb{Q} \oplus \mathbb{Q}\mathbf{i} \oplus \mathbb{Q}\mathbf{j} \oplus \mathbb{Q}\mathbf{k} \qquad (\mathbf{i}^2 = a,\; \mathbf{j}^2 = b,\; \mathbf{i}\mathbf{j} = -\mathbf{j}\mathbf{i} = \mathbf{k})
$$

中，每一个四元数 $\alpha = x_0 + x_1\mathbf{i} + x_2\mathbf{j} + x_3\mathbf{k} \in H_{a,b}(\mathbb{Q})$ 同样拥有**约化迹（reduced trace）**与**约化范数（reduced norm）**：

$$
\operatorname{Trd}(\alpha) = \alpha + \bar{\alpha} = 2x_0, \qquad
\operatorname{Nrd}(\alpha) = \alpha\bar{\alpha} = x_0^2 - a x_1^2 - b x_2^2 + ab x_3^2.
$$

::: {.figure src="ch23-quaternion-norm"}
**四维里还是同一把锁。** 取 $a = b = -1$（哈密顿四元数），$\operatorname{Nrd}(\alpha) = x_0^2 + x_1^2 + x_2^2 + x_3^2$。横轴是标量部 $x_0$（迹的一半），纵轴是向量部长度 $\lvert v\rvert$；四个青色半圆是 $\operatorname{Nrd} = 1, 2, 3, 4$，点旁的数是落在该点的整四元数个数，四个半圆上分别共 $8, 24, 32, 24$ 个（穷举计数）。半圆之间没有点，迹 $\operatorname{Trd} = 2x_0$ 只取 $-4$ 到 $4$ 的偶数。
:::

四元数范数 $\operatorname{Nrd}(\alpha)$ 如何在 $\mathbb{Q}$ 上完成局部—整体锁定，以及“存在性丢番图（$\exists$）”与“一阶可定义（$\forall$ 或 $\forall\exists$）”之间的量词边界，全部汇总于下面的文献边界审计框中（[@rem-diophantine-z-in-q-literature]）。

::: {.remark #rem-diophantine-z-in-q-literature title="Koenigsmann (2016) 在 ℚ 中一阶定义 ℤ 的量词结构、四元数范数锁与希尔伯特第十问题边界审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 四元数约化范数 $\operatorname{Nrd}(\alpha)$ 之所以能胜任二元二次型做不到的全局锁定工作，核心依赖两条代数数论机制：(a) **Hasse–Minkowski 局部—整体原理与有限素数分歧集**——四元二次型在 $\mathbb{Q}$ 上有非零解当且仅当它在 $\mathbb{R}$ 与每个 $p$-进数域 $\mathbb{Q}_p$ 上都有解，调节参数 $(a, b)$ 可控制四元数代数在指定素数集合上分歧，把单个素数 $p$ 处的局部整性条件 $t \in \mathbb{Z}_{(p)}$ 编码进迹—范数二次型可解性；(b) **二次互反律与四元数序遍历全部素数**——由 Robinson（1949）、Poonen（2009）与 Koenigsmann（2016）建立的参数化技巧，可用有限个有理参数同时扫过全部素数，经 $\bigcap_{p \text{ prime}} \mathbb{Z}_{(p)} = \mathbb{Z}$ 合拢为全局整数集。关于该研究脉络、量词复杂度及与本章四个冻结 Lean 定理的严格边界如下：

1. **概念澄清：丢番图定义（$\exists$）与一般一阶可定义性（$\forall, \forall\exists, \dots$）的严格区分**：
   - 在数理逻辑与算术几何中，域 $K$ 的一个子集 $S \subseteq K$ 称为在 $K$ 中是**丢番图的（Diophantine，即存在性可定义的 $\exists$）**，是指存在整系数（或 $K$-系数）多项式 $P(t, x_1, \dots, x_m)$，使得

     $$
     t \in S \quad\Longleftrightarrow\quad \exists x_1, \dots, x_m \in K,\; P(t, x_1, \dots, x_m) = 0.
     $$

   - 若定义公式允许同时使用全称量词 $\forall$ 与存在量词 $\exists$，则称为在域语言中的**一阶可定义（first-order definable）**。日常口语有时将“用多项式方程加量词刻画 $\mathbb{Z} \subset \mathbb{Q}$”宽泛地统称为“丢番图可定义性研究”，但在严格学术意义上，**量词前缀是决定可计算性命运的分水岭**：由于 Matiyasevich–Robinson–Davis–Putnam 定理（1970）已证明整数环上的希尔伯特第十问题 $\mathrm{H10}(\mathbb{Z})$（判定整系数多项式方程是否有整数解）不可判定，一旦 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中拥有纯存在性（$\Sigma_1$，即 $\exists$）丢番图定义，就立即可以将 $\mathrm{H10}(\mathbb{Z})$ 归约为有理数域上的希尔伯特第十问题 $\mathrm{H10}(\mathbb{Q})$，从而直接证明 $\mathrm{H10}(\mathbb{Q})$ 不可判定！相反，正如 Bjorn Poonen 在综述《*Mazur's work relating logic and arithmetic geometry*》中所阐明的，算术几何中著名的 **Mazur 实拓扑猜想**（断言任意 $\mathbb{Q}$-代数簇的有理点集 $V(\mathbb{Q})$ 在实点空间 $V(\mathbb{R})$ 中的拓扑闭包只有有限多个连通分支）一旦成立，反而会**直接排除** $\mathbb{Z}$ 在 $\mathbb{Q}$ 中存在纯存在性（$\exists$）丢番图定义的可能（因为离散无限集 $\mathbb{Z} \subset \mathbb{R}$ 拥有无穷多个实连通分支）！**直到今天，“$\mathbb{Z}$ 在 $\mathbb{Q}$ 中是否是纯存在性（$\exists$）丢番图的”以及“$\mathrm{H10}(\mathbb{Q})$ 是否可判定”仍然是尚未解决的重大开放问题（`OPEN`）。**
2. **从 Robinson (1949)、Poonen (2009) 到 Koenigsmann (2016) 及后续工作的精确量词压缩脉络**：
   - **Julia Robinson（1949，*Journal of Symbolic Logic* 14(2), 98–114，〈Definability and decision problems in arithmetic〉）**：首次证明 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中是一阶可定义的，其公式利用二次型局部—整体原理构造，量词复杂度为 $\Pi_3$（即 $\forall\exists\forall$，交替三层量词）；
   - **Bjorn Poonen（2009，*American Journal of Mathematics* 131(3), 675–682，〈Characterizing integers among rational numbers with a universal-existential formula〉）**：引入四元数代数的约化范数与迹条件，将定义 $\mathbb{Z} \subset \mathbb{Q}$ 的量词前缀大幅压缩至 $\Pi_2$（即 $\forall^2\exists^7$，仅含 $2$ 个全称量词与 $7$ 个存在量词）；
   - **Jochen Koenigsmann（2016，*Annals of Mathematics* 183(1), 73–93，〈Defining $\mathbb{Z}$ in $\mathbb{Q}$〉，`arXiv:1011.3424`）**：利用四元数代数与四元二次范数型、Hasse–Minkowski 局部—整体原理、**Jacobson 根（Jacobson radical）的存在性可定义性**（其证明 §2 Step 3 的核心技巧）以及二次互反律，建立了**两项彼此独立的核心定理**：
     1. **Theorem 1（$\mathbb{Z} \subset \mathbb{Q}$ 的纯全称 $\Pi_1$ 定义 / $\mathbb{Q} \setminus \mathbb{Z}$ 的存在性 $\Sigma_1$ 丢番图定义）**：证明了非整数补集 $\mathbb{Q} \setminus \mathbb{Z}$ 在 $\mathbb{Q}$ 中是丢番图的（$\Sigma_1$，含 $418$ 个存在量词）；在允许不等号 $\neq$（即等号之否定）的标准一阶环语言中直接取否定，等价于证明 **$\mathbb{Z}$ 在 $\mathbb{Q}$ 中是纯全称（$\Pi_1$，仅含一层全称量词）可定义的**：

        $$
        t \in \mathbb{Z} \quad\Longleftrightarrow\quad \forall x_1, \dots, x_{418} \in \mathbb{Q},\; g(t, x_1, \dots, x_{418}) \neq 0.
        $$

     2. **Corollary 21（单全称量词 $\forall^1\exists$ 算术压缩构造）**：并非靠将 $\neq 0$ 作语法改写，而是通过另一套独立的算术编码将素数局部条件打包进单个全称变量，证明了 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中可由**仅含 $1$ 个全称量词**的 $\forall\exists$ 公式（形如 $\forall y\,\exists z_1, \dots, \exists z_M$）一阶定义。
   - **后续具名文献进展（Dittmann 2018；Daans 2021；Zhang–Sun 2022；Daans 2023/2024）**：
     1. **Philip Dittmann（2018，*Compositio Mathematica* 154(4), 761–772，〈Irreducibility of polynomials over global fields is Diophantine〉，`DOI: 10.1112/S0010437X17007977`，`arXiv:1601.07829`）**：利用四元数代数范数型与局部—整体 Hasse 原理证明了全局域上多项式不可约性是丢番图的，从而给出了全局域（global fields）中赋值环与整数环 $\mathcal{O}_K$ 的纯全称（$\Pi_1$）定义；
     2. **Nicolas Daans（2021，*Documenta Mathematica* 26, 1851–1869，〈Universally defining finitely generated subrings of global fields〉，`DOI: 10.4171/dm/858`，`arXiv:1812.04372`）**：建立了全局域有限生成子环的纯全称定义，并将定义 $\mathbb{Z} \subset \mathbb{Q}$ 所需的全称量词个数压缩至 **$37$ 个**（$\forall^{37}$）；
     3. **张耿瑞与孙智伟（Geng-Rui Zhang and Zhi-Wei Sun，2022，*Bulletin of the Polish Academy of Sciences: Mathematics* 70(2), 93–106，〈$\mathbb{Q}\setminus\mathbb{Z}$ is diophantine over $\mathbb{Q}$ with $32$ unknowns〉，`DOI: 10.4064/ba221231-19-3`，`arXiv:2104.02520`）**：证明了 $\mathbb{Q} \setminus \mathbb{Z}$ 在 $\mathbb{Q}$ 上可用 $32$ 个未知量给出丢番图（$\Sigma_1$）定义，等价地将 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中的纯全称定义压缩至 **$32$ 个全称量词**（$\forall^{32}$）；
     4. **Nicolas Daans（2023 预印本 / 2024，*Journal of the London Mathematical Society* 109(2), e12864，〈Universally defining $\mathbb{Z}$ in $\mathbb{Q}$ with $10$ quantifiers〉，`DOI: 10.1112/jlms.12864`，`arXiv:2301.02107`）**：结合二次型范数方程与精化的局部—整体互反律，将 $\mathbb{Z}$ 在 $\mathbb{Q}$ 中的纯全称（$\Pi_1$）定义大幅压缩至**仅需 $10$ 个全称量词**（$\forall^{10}$）。这些工作推进了全称（$\Pi_1$）与 $\forall\exists$（$\Pi_2$）可定义性的边界，但均未宣称解决 $\mathbb{Z} \subset \mathbb{Q}$ 的存在性（$\Sigma_1$）丢番图定义问题。
3. **本章四个冻结 Lean 定理的精确认领边界**：本章经 Lean 内核验证的四个正式条目——[@thm-qform-eq-eisnorm]（`Qform_eq_eisNorm`）、[@lem-qform-discriminant]（`Qform_discriminant`）、[@cor-qform-range-eq-eisnorm]（`Qform_range_eq_eisNorm`）与 [@prop-pell-form-eq-four-mul-norm]（`pell_form_eq_four_mul_norm`）——证明的是整数环 $\mathbb{Z}$ 上 $\Delta = -3$ 艾森斯坦交越范数型的幺模剪切不变性、值域等同以及 $\Delta = +5$ 黄金整数环的佩尔迹—范数恒等式。它们以具体、完全形式化的二次代数范数锁展示了“迹投影与二次范数如何锁定离散整数格”的核心代数机制，**并不直接构成 Koenigsmann (2016) 关于 $\mathbb{Z} \subset \mathbb{Q}$ 一阶可定义性定理的形式化证明**。
:::

> 有理数的汪洋看似无边无际、随处可分；但只要把二次范数球面与迹投影的准星扣紧，离散的整数骨架便从连续的迷雾里浮现出来。

至此，在第六部的前三章里，我们已经走过了逻辑的逃逸（第 21 章）、素数的正交基（第 22 章）与整数的范数骨架（第 23 章）。现在，整部《量子计算的几何直觉》前六部的全部线索，终于要在第六部的压轴之章——[第二十四章](ch24-cosine-fixed-points-and-self-reference.md)——汇聚成那道终极的闪电：

当丈量的算子（$\cos$）不再向外寻找别的刻度，而是拿自己丈量出的相融投影当场作为下一轮张开的角度（$\cos\theta = \theta$），那个名叫 $\cos$ 的外衣究竟是从哪里生出来的？余弦自指不动点 $\theta^* \approx 0.7390851332$（其经典分析与算术性质见第二十四章文献注记）又是如何在自指的尽头化作 $\psi = \psi(\psi)$ 的？让我们翻开[第二十四章](ch24-cosine-fixed-points-and-self-reference.md)。
