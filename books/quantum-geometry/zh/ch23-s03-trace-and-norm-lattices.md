# 23.3 为什么连续有理数里藏着离散晶格：二次范数与迹投影 {#sec-ch23-1}

为什么单靠一次线性方程 $ax + b = 0$ 在有理数域 $\mathbb{Q}$ 里永远筛不出整数 $\mathbb{Z}$？因为线性方程对有理缩放毫无抵抗力：任何非零有理数都能解线性方程。要想在允许任意分母的 $\mathbb{Q}$ 中卡住分母，经典做法是借助**二次范数形式（quadratic norm forms）**——正如在实哈密顿单位四元数（或归一化双复振幅）的 $S^3$ 球面上，线性坐标本身无法固定单位球壳，唯有二次模长约束 $x_0^2 + x_1^2 + x_2^2 + x_3^2 = 1$ 才能把向量死死锁在球面上！

在二次代数整数环与四元数序（quaternion orders）中，每一个代数元素 $g$ 都同时携带两把天然的无坐标几何不变量（与我们在[第一章](ch01-measurement.md)和[铸器与圣殿](sanctuary.md)讨论 $2\times 2$ 矩阵的迹与行列式如出一辙）：

1. **迹投影（Trace）** $\operatorname{Tr}(g) = g + \bar{g}$：元素与共轭相加所得的代数迹；在艾森斯坦复平面与哈密顿四元数空间中，它就是向一维实主轴正交投影的两倍相融刻度（对应量子门旋转器的标量部 $2\cos(\theta/2)$）；
2. **范数（Norm）** $\operatorname{N}(g) = g\bar{g}$：元素与其共轭相乘所得的二次代数范数（对应行列式与旋转器的单位范数锁）；在上述复平面与哈密顿空间中，它是欧氏长度的平方，而下文黄金整数的范数可正可负，单位范数锁住的是双曲线。

在上述整数环与序中，这两把尺子一旦联手，立刻织成一张刚性的丢番图筛网：当范数 $\operatorname{N}(g)$ 被固定在离散整数值（如单位圆/双曲线 $\operatorname{N}(g) = \pm 1$）时，迹投影 $\operatorname{Tr}(g)$ 便被强行量子化在一族离散的代数整数格点上！

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
**同一批格点，斜着读。** 改用整数坐标 $(P, Q)$、取 $t = 2$，二次型成了 $P^2 - 5PQ + 7Q^2$，范数 7 的圆被拉成一只又细又斜的青色椭圆，琥珀色的点落在 $(8, 3)$。淡色的点与青色虚线圆是同一批格点在复平面里的位置：切回复平面，椭圆变回圆，细线把每个格点的两处位置连起来，$(8, 3)$ 连到 $(-1, 3)$（[@thm-qform-eq-eisnorm]）。
:::
