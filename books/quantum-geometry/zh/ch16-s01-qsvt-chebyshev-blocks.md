# 16.1 QSVT：二维块与切比雪夫递推 {#sec-qsvt-chebyshev-blocks}

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
