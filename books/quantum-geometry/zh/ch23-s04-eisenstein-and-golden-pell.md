# 23.4 艾森斯坦范数剪切不变性与黄金佩尔恒等式的形式化证明 {#sec-ch23-2}

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

::: {.viz src="norm-lattice" height="560"}
**范数格：完整实验室。** 两个场景共用一条时间轴：艾森斯坦场景推动参数 $t$，可在整数坐标 $(P, Q)$ 与复平面之间切换；黄金场景数乘 $\varphi$ 的次数，可把坐标轴转 45° 读出迹。点任一格点让它成为琥珀色的当前点。
:::
