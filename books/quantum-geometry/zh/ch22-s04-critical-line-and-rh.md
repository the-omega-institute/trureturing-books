# 22.4 临界对称轴 $\sigma = 1/2$ 与黎曼猜想的认识论边界 {#sec-ch22-4}

如后文 [@prop-xi-zeros-strip-zeros] 及其后的一行手工推导所示，$\zeta(s)$ 在欧拉乘积绝对收敛半平面 $\operatorname{Re}(s) > 1$（乃至直线 $\operatorname{Re}(s) = 1$ 上）没有零点，而越过 $s = 1$ 一阶极点（其留数定理已冻结为上文 [@lem-riemann-zeta-residue-one]）向**临界带** $0 < \operatorname{Re}(s) < 1$ 解析延拓后，级数与欧拉乘积不再直接绝对收敛，无穷多只素数相位指针 $p^{-\sigma} e^{-it\ln p}$ 的叠加——形象地说——会在特定的复频率 $\rho = \sigma + it$ 处发生相消归零：$\zeta(\rho) = 0$！

为什么所有已被算出的非平凡零点，全都像被无形的几何准星锁死了一样，齐刷刷地排列在实部恰好等于二分之一的**临界线（critical line）** $\operatorname{Re}(s) = \frac{1}{2}$（即 Lean 模块 `D5/S3/Weil/Convention` 中定义的自对偶横坐标 [`criticalAbscissa`](lean:D5/S3/Weil/Convention.criticalAbscissa) $= 1/2$）上？

在直观的物理与几何图像中，完备化黎曼函数 $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)$ 满足精确的泛函反射对称方程 $\xi(s) = \xi(1 - s)$。在复平面上，映射 $s \mapsto 1 - s$ 与复共轭联手，以垂直线 $\operatorname{Re}(s) = \frac{1}{2}$ 为镜像对称轴（恰似量子力学里连接正演振幅与伴随振幅的幺正平衡中线，又似泊松求和公式中空间尺度与动量频率尺度的傅里叶自对偶不动线）。

上一段把反射对称 $\xi(s) = \xi(1 - s)$ 当作直观图像引用。这条对称性本身不是猜想，也不必停留在文献层面：所钉仓库的模块 `D5/S3/Zeros/CompletedZeta` 把它连同 $\xi$ 的整函数性一并冻结了。

::: {.definition #def-xi-reading title="完备 ζ 读数与去极点的 ξ 读数" lean="D5/S3/Zeros/CompletedZeta.completedZetaReading D5/S3/Zeros/CompletedZeta.xiReading"}
在模块 `CompletedZeta` 中：

1. **完备 $\zeta$ 读数** [`completedZetaReading`](lean:D5/S3/Zeros/CompletedZeta.completedZetaReading) $s$ 定义为 Mathlib 的 `completedRiemannZeta s`，即 $\Lambda(s) = \pi^{-s/2}\,\Gamma(s/2)\,\zeta(s)$ 的亚纯延拓（在 $s = 0$ 与 $s = 1$ 处按 Mathlib 的约定取值）；
2. **$\xi$ 读数** [`xiReading`](lean:D5/S3/Zeros/CompletedZeta.xiReading) 定义为

   $$
   \operatorname{xiReading}\ s \;=\; \frac{1}{2}\Bigl(s\,(s - 1)\,\Lambda_0(s) + 1\Bigr),
   $$

   其中 $\Lambda_0$ 是 Mathlib 的 `completedRiemannZeta₀`：把 $\Lambda$ 在 $s = 0$ 与 $s = 1$ 处的两个一阶极点减掉之后得到的整函数，满足 $\Lambda(s) = \Lambda_0(s) - \frac{1}{s} - \frac{1}{1 - s}$。
:::

::: {.theorem #thm-xi-reading-entire-reflection title="ξ 读数的四条性质：与完备 ζ 的关系、整函数性、反射对称与端点值" lean="D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta D5/S3/Zeros/CompletedZeta.xi_reading_differentiable D5/S3/Zeros/CompletedZeta.xi_reading_reflection D5/S3/Zeros/Endpoints/XiEndpointValues.xi_reading_endpoint_values"}
对 [@def-xi-reading] 中的 $\operatorname{xiReading}$，以下四项成立：

1. **与完备 $\zeta$ 的关系**：对一切 $s \in \mathbb{C}$，若 $s \neq 0$ 且 $s \neq 1$，则

   $$
   \operatorname{xiReading}\ s \;=\; \frac{1}{2}\,s\,(s - 1)\,\operatorname{completedZetaReading}\ s ;
   $$

2. **整函数性**：$\operatorname{xiReading}$ 在整个 $\mathbb{C}$ 上复可微（`Differentiable ℂ xiReading`）；
3. **反射对称**：对一切 $s \in \mathbb{C}$，

   $$
   \operatorname{xiReading}\ (1 - s) \;=\; \operatorname{xiReading}\ s ;
   $$

4. **端点值**：$\operatorname{xiReading}\ 0 = \frac{1}{2}$ 且 $\operatorname{xiReading}\ 1 = \frac{1}{2}$。
:::

::: proof
结论 1 把 Mathlib 的恒等式 `completedRiemannZeta_eq`（$\Lambda(s) = \Lambda_0(s) - \frac{1}{s} - \frac{1}{1-s}$）代入定义，在 $s \neq 0$、$1 - s \neq 0$ 的前提下通分化简。结论 2 由 $\Lambda_0$ 的整函数性（`differentiable_completedZeta₀`）与多项式因子的可微性得到。结论 3 由 $\Lambda_0$ 的反射对称 `completedRiemannZeta₀_one_sub`（$\Lambda_0(1 - s) = \Lambda_0(s)$）得到，因为因子 $s\,(s - 1)$ 在 $s \mapsto 1 - s$ 下不变。结论 4 在 $s = 0$ 与 $s = 1$ 处因子 $s\,(s - 1)$ 为零，定义直接给出 $\frac{1}{2}$。完整证明由 Lean 内核检查。
:::

[@thm-xi-reading-entire-reflection] 的结论 3 有一个立即的推论（一行手工推导）：若 $\operatorname{xiReading}\ \rho = 0$，则 $\operatorname{xiReading}\ (1 - \rho) = 0$。映射 $s \mapsto 1 - s$ 是复平面绕点 $s = \frac{1}{2}$ 的半周旋转，所以零点关于这一点成对出现。再加上共轭对称 $\xi(\overline{s}) = \overline{\xi(s)}$（见下文 [@prop-zeta-conjugation-covariance]），零点便按 $\rho,\ \overline{\rho},\ 1 - \rho,\ 1 - \overline{\rho}$ 四个一组出现；对非实的 $\rho$，这四个点两两重合、缩成一对的充要条件，正是 $\operatorname{Re}(\rho) = \frac{1}{2}$（$\xi$ 的零点恰是临界带内的 $\zeta$ 零点，见 [@prop-xi-zeros-strip-zeros]；其中没有实数，见 [@prop-zeta-real-axis-sign]）。黎曼猜想说的就是：每一组都缩成了一对。

::: {.viz src="critical-mirror" preset="quartet" height="500"}
**四个一组，离开镜面就分开。** 琥珀色的 $\rho = 0.6 + 2i$ 与它的三个品红伴 $\overline{\rho}$、$1 - \rho$、$1 - \overline{\rho}$ 绕 $s = \frac{1}{2}$ 排成矩形，青色虚线是镜面 $\operatorname{Re}(s) = \frac{1}{2}$；右边是它们在 $w = (s - 1)/s$ 下的像，两个在单位圆内、两个在圆外。拖动时间轴把 $\rho$ 推到镜面上，四点两两重合成青色的两点（[@thm-xi-reading-entire-reflection]、[@prop-zeta-conjugation-covariance]）。
:::

反射对称把看上去毫不相干的数值配成了镜像对。

::: {.example #ex-xi-mirror-values title="镜像两侧的同一个数：ζ(2) 与 ζ(−1)、ζ(4) 与 ζ(−3)"}
本例用到的特殊值 $\zeta(2) = \frac{\pi^2}{6}$、$\zeta(4) = \frac{\pi^4}{90}$、$\zeta(6) = \frac{\pi^6}{945}$、$\zeta(-1) = -\frac{1}{12}$、$\zeta(-3) = \frac{1}{120}$、$\zeta(-5) = -\frac{1}{252}$ 与 $\Gamma$ 函数在半整数处的取值都是文献结果，未在本书形式化；各行由 $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)$ 直接代入算出，并以 30 位精度数值核对。

**在 $s = 2$ 与 $s = -1$ 处手算。** 由 $\Gamma(1) = 1$：

$$
\xi(2) \;=\; \frac{1}{2}\cdot 2\cdot 1\cdot \pi^{-1}\cdot\Gamma(1)\cdot\frac{\pi^2}{6} \;=\; \frac{\pi}{6} .
$$

由 $\Gamma\bigl(-\tfrac{1}{2}\bigr) = -2\sqrt{\pi}$：

$$
\xi(-1) \;=\; \frac{1}{2}\cdot(-1)\cdot(-2)\cdot\pi^{1/2}\cdot\bigl(-2\sqrt{\pi}\bigr)\cdot\Bigl(-\frac{1}{12}\Bigr) \;=\; \frac{\pi}{6} .
$$

两边相等，正如 [@thm-xi-reading-entire-reflection] 的结论 3 在 $s = 2$ 处所断言的 $\xi(-1) = \xi(2)$。

| 镜像对 $(s,\ 1 - s)$ | 右侧所用的值 | 左侧所用的值 | 共同的 $\xi$ 值 | 数值 |
| :---: | :---: | :---: | :---: | :---: |
| $(2,\ -1)$ | $\zeta(2) = \frac{\pi^2}{6}$ | $\zeta(-1) = -\frac{1}{12}$，$\Gamma(-\frac{1}{2}) = -2\sqrt{\pi}$ | $\frac{\pi}{6}$ | $0.5235988$ |
| $(4,\ -3)$ | $\zeta(4) = \frac{\pi^4}{90}$ | $\zeta(-3) = \frac{1}{120}$，$\Gamma(-\frac{3}{2}) = \frac{4\sqrt{\pi}}{3}$ | $\frac{\pi^2}{15}$ | $0.6579736$ |
| $(6,\ -5)$ | $\zeta(6) = \frac{\pi^6}{945}$ | $\zeta(-5) = -\frac{1}{252}$，$\Gamma(-\frac{5}{2}) = -\frac{8\sqrt{\pi}}{15}$ | $\frac{2\pi^3}{63}$ | $0.9843262$ |
| $(1,\ 0)$ | — | — | $\frac{1}{2}$ | $0.5000000$ |
| $(\frac{1}{2},\ \frac{1}{2})$ | — | — | — | $0.4971208$ |

第四行是 [@thm-xi-reading-entire-reflection] 的结论 4；第五行是镜像的不动点 $s = \frac{1}{2}$ 处的数值。

**沿临界线。** 在 $s = \frac{1}{2} + it$（$t$ 为实数）上 $\xi$ 取实值。数值计算给出 $\xi\bigl(\tfrac{1}{2} + 14i\bigr) \approx +2.01\times10^{-4}$ 与 $\xi\bigl(\tfrac{1}{2} + 15i\bigr) \approx -7.06\times10^{-4}$：符号在两者之间改变，与文献所载的第一个非平凡零点 $\rho_1 \approx \frac{1}{2} + 14.134725\,i$ 相符。由此可见，常被单独拿出来渲染的 $\zeta(-1) = -\frac{1}{12}$ 与巴塞尔问题的 $\zeta(2) = \frac{\pi^2}{6}$，其实是同一个数 $\frac{\pi}{6}$ 在镜子两侧的两个读数。
:::

::: {.figure src="ch22-critical-line"}
**沿临界线往上走，$\lvert\zeta\rvert$ 一次次落到零。** 墨色的曲线是 $\lvert\zeta(\frac{1}{2} + it)\rvert$，$0 \le t \le 50$；十个灰色的点是它落到零的地方，第一个在 $t \approx 14.13$，与上例中 $\xi$ 在 $t = 14$ 与 $t = 15$ 之间变号相符。曲线与零点位置是数值结果；图中红色标注指向 1859 年以来的经典黎曼问题（所有非平凡零点是否均在这条线上），该结论已于 2026 年由外部 Lean 4 形式化证明确立，但尚未冻结入本书所钉仓库（[@conj-riemann-hypothesis]）。
:::

镜子的位置 $\operatorname{Re}(s) = \frac{1}{2}$ 已由 [@thm-xi-reading-entire-reflection] 的内核证明锁定；而所有非平凡零点均位于镜面这一经典断言，则已于 2026 年由外部 Lean 4 形式化工程确立（见本节末尾 [@conj-riemann-hypothesis]，但本书所钉仓库本身不冻结该证明）。

镜子的位置已经确定，但 [@thm-xi-reading-entire-reflection] 的反射 $s \mapsto 1 - s$ 只是绕点 $s = \frac{1}{2}$ 的半周旋转，它的不动点只有一个；要让整条直线 $\operatorname{Re}(s) = \frac{1}{2}$ 不动，还要再叠上复共轭。共轭这一半在所钉仓库的模块 `D5/S3/Zeros/Symmetry/ZetaConjugationCovariance` 中同样已经冻结。

::: {.proposition #prop-zeta-conjugation-covariance title="ζ 与 ξ 读数的共轭协变" lean="D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.riemann_zeta_conj D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_conj D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj"}
对一切 $s \in \mathbb{C}$，记 $\overline{s}$ 为 $s$ 的复共轭，则：

1. $\operatorname{riemannZeta}\ \overline{s} = \overline{\operatorname{riemannZeta}\ s}$，其中 `riemannZeta` 是 Mathlib 的黎曼 $\zeta$ 函数（[@def-classical-zeta] 中 `classicalZeta` 展开后的函数）；
2. $\operatorname{xiReading}\ \overline{s} = \overline{\operatorname{xiReading}\ s}$；
3. $\operatorname{xiReading}\ (1 - \overline{s}) = \overline{\operatorname{xiReading}\ s}$。
:::

::: proof
结论 2：[@def-xi-reading] 中的 $\Lambda_0$ 是一个实值函数的梅林变换，而实值函数的梅林变换与复共轭交换；因子 $s\,(s - 1)$ 与常数 $\frac{1}{2}$、$1$ 的系数都是实数。结论 1：$s = 0$ 时两端都等于 $-\frac{1}{2}$；$s \neq 0$ 时用 Mathlib 的 `riemannZeta_def_of_ne_zero` 把 $\zeta(s)$ 写成完备 $\zeta$ 除以 $\Gamma_{\mathbb{R}}(s) = \pi^{-s/2}\Gamma(s/2)$，两者各自与共轭交换（后者用 `Complex.Gamma_conj`）。结论 3 是结论 2 与 [@thm-xi-reading-entire-reflection] 的反射对称的复合。完整证明由 Lean 内核检查。
:::

在结论 3 中取 $s = \frac{1}{2} + it$（$t$ 为实数）：此时 $1 - \overline{s} = s$，于是 $\operatorname{xiReading}\ s = \overline{\operatorname{xiReading}\ s}$，即 $\xi$ 在临界线上取实值（一行手工推导）。[@ex-xi-mirror-values] 末尾“沿临界线取实值”的说法由此有了内核依据。那里的两个数值 $\xi\bigl(\tfrac{1}{2} + 14i\bigr) > 0$ 与 $\xi\bigl(\tfrac{1}{2} + 15i\bigr) < 0$ 仍然只是数值计算；承认这两个数值，实值连续函数 $t \mapsto \xi\bigl(\tfrac{1}{2} + it\bigr)$ 在 $14$ 与 $15$ 之间就必有零点（介值定理），而且这个零点恰在临界线上。

**把临界线卷成单位圆。** 本书从第一章起就在单位圆与单位球上做几何。临界线是一条直线，但换一个坐标，它就是一个圆。

::: {.definition #def-cayley-ratio title="凯莱比与对数径向亏量" lean="D5/S3/Midline/CayleyCriticalLine.cayleyRatio D5/S3/Midline/Cayley/CayleyUnitarityDefect.cayleyCoefficient D5/S3/Midline/Cayley/LogarithmicRadialDefect.logarithmicRadialDefect"}
对 $s \in \mathbb{C}$：

1. **凯莱比** [`cayleyRatio`](lean:D5/S3/Midline/CayleyCriticalLine.cayleyRatio) $s$ 定义为 $\dfrac{s - 1}{s}$。模块 `CayleyUnitarityDefect` 中的 [`cayleyCoefficient`](lean:D5/S3/Midline/Cayley/CayleyUnitarityDefect.cayleyCoefficient) $s$ 是同一个表达式 $\dfrac{s - 1}{s}$。按 Lean 的全函数除法约定，$s = 0$ 时两者取值 $0$。
2. **对数径向亏量** [`logarithmicRadialDefect`](lean:D5/S3/Midline/Cayley/LogarithmicRadialDefect.logarithmicRadialDefect) $s$ 定义为 $\operatorname{Real.log}\,\norm{\operatorname{cayleyCoefficient}\ s}$，其中 `Real.log` 是 Mathlib 的实对数（约定 $\operatorname{Real.log}\ 0 = 0$）。
:::

::: {.theorem #thm-cayley-critical-line-criterion title="凯莱比落在单位圆上当且仅当点在临界线上；黎曼猜想的径向等价形式" lean="D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion"}
沿用 [@def-cayley-ratio] 的记号。

1. **单位圆判据**：对一切 $s \in \mathbb{C}$，

   $$
   \norm{\operatorname{cayleyRatio}\ s} = 1 \;\Longleftrightarrow\; \operatorname{Re}(s) = \frac{1}{2},
   $$

   对 $\operatorname{cayleyCoefficient}$ 同样成立。
2. **径向等价形式**：Mathlib 的命题 `RiemannHypothesis`——对一切 $s \in \mathbb{C}$，若 $\operatorname{riemannZeta}\ s = 0$，且不存在自然数 $n$ 使 $s = -2(n + 1)$，且 $s \neq 1$，则 $\operatorname{Re}(s) = \frac{1}{2}$——成立，当且仅当：对一切 $\rho \in \mathbb{C}$，若 $\operatorname{riemannZeta}\ \rho = 0$，且不存在自然数 $n$ 使 $\rho = -2(n + 1)$，且 $\rho \neq 1$，则

   $$
   \operatorname{logarithmicRadialDefect}\ \rho = 0 .
   $$
:::

::: proof
结论 1：$s = 0$ 时凯莱比为 $0$，模不是 $1$，实部也不是 $\frac{1}{2}$，两端同假。$s \neq 0$ 时 $\norm{(s - 1)/s} = 1$ 等价于 $|s - 1| = |s|$，即 $s$ 到点 $1$ 与到点 $0$ 等距，这正是线段 $[0, 1]$ 的垂直平分线 $\operatorname{Re}(s) = \frac{1}{2}$；代数上 $|s - 1|^2 - |s|^2 = 1 - 2\operatorname{Re}(s)$。结论 2 的正向：零点在临界线上，则凯莱比的模为 $1$，对数为 $0$。反向：$\zeta(0) = -\frac{1}{2} \neq 0$，故零点 $\rho \neq 0$；又 $\rho \neq 1$，故凯莱比非零、模为正；正数的对数为 $0$ 迫使模等于 $1$，再用结论 1。完整证明由 Lean 内核检查。
:::

[@thm-cayley-critical-line-criterion] 的结论 2 本身是黎曼猜想的一种**等价改写，不是证明**：它把“零点在一条直线上”换成“零点在一个圆上”。结合本节末尾登记的外部 Lean 4 形式化证明（[@conj-riemann-hypothesis]），如今一切非平凡零点确实满足 $\operatorname{logarithmicRadialDefect}\ \rho = 0$（见 [@rem-rh-grh-direct-consequences]）。在此之前还有一处措辞要对齐：结论 2 沿用 Mathlib 对“非平凡零点”的刻画，即既不是 $-2(n+1)$、也不等于 $1$ 的零点；[@conj-riemann-hypothesis] 中的临界带表述说的却是 $0 < \operatorname{Re}(s) < 1$ 内的零点。两种说法是不是同一个命题，取决于 $\zeta$ 在临界带之外哪里可能为零。先看最容易手算的一条线：实轴。

**把偶数项减两遍。** 在 $\operatorname{Re}(s) > 1$ 上，从 $\zeta(s)$ 中把偶数项减去两遍，正负号就交替出现（手工推导，用到 $2\,(2m)^{-s} = 2^{1-s}\,m^{-s}$）：

$$
\begin{aligned}
\bigl(1 - 2^{1-s}\bigr)\,\zeta(s)
&= \sum_{n \ge 1} n^{-s} \;-\; 2\sum_{m \ge 1} (2m)^{-s} \\
&= 1 - 2^{-s} + 3^{-s} - 4^{-s} + \cdots .
\end{aligned}
$$

右端在 $\operatorname{Re}(s) > 0$ 时仍然收敛：相邻两项配成一对 $(2n+1)^{-s} - (2n+2)^{-s}$，每一对的模不超过 $\lvert s\rvert\,(2n+1)^{-\operatorname{Re}(s)-1}$，可以求和。在实数 $s = x > 0$ 上，每一对都是正数。这与 [@ex-prime-log-orthogonality-and-sieve] 中的余项 $R_{>p_K}(s)$ 在实半轴上逐项为正是同一种机制，只是“每一项”换成了“每一对”：正数加正数，无从相消。

::: {.lemma #lem-alternating-zeta-partial-sums title="交错部分和收敛到 $(1 - 2^{1-s})\,\zeta(s)$（$\operatorname{Re}(s) > 0$，$s \neq 1$）" lean="D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.tendsto_alternating_partialSums_eta_of_ne_one D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.alternating_partialSums_eta_atom_fails_at_one"}
对 $s \in \mathbb{C}$ 与自然数 $N$，记 $S_N(s) = \sum_{n=0}^{N-1} (-1)^n\,(n+1)^{-s}$，其中 $(n+1)^{-s} = e^{-s\ln(n+1)}$；$\zeta$ 是 Mathlib 的 `riemannZeta`（[@def-classical-zeta]）。

1. 若 $\operatorname{Re}(s) > 0$ 且 $s \neq 1$，则当 $N \to \infty$ 时 $S_N(s) \to \bigl(1 - 2^{1-s}\bigr)\,\zeta(s)$。
2. 在 $s = 1$ 处同一公式不成立：$S_N(1)$ 不收敛于 $\bigl(1 - 2^{1-1}\bigr)\,\zeta(1)$。这里 $\zeta(1)$ 是 Mathlib 在极点处约定的值；由于 $1 - 2^{0} = 0$，这个右端等于 $0$。
:::

::: proof
结论 1：偶数个项的部分和是配对和，$S_{2N}(s) = \sum_{n<N}\bigl[(2n+1)^{-s} - (2n+2)^{-s}\bigr]$。由中值定理，每一对的模不超过 $\lvert s\rvert\,(2n+1)^{-\operatorname{Re}(s)-1}$；这个优级数在 $s$ 的一个小邻域内一致可和，所以配对级数收敛，并且在 $\operatorname{Re}(s) > 0$ 上全纯。奇数个项的部分和只多出一项，它的模 $(2N+1)^{-\operatorname{Re}(s)}$ 趋于 $0$。在 $\operatorname{Re}(s) > 1$ 上，把狄利克雷级数拆成奇数项与偶数项，得到配对级数等于 $(1 - 2\cdot 2^{-s})\,\zeta(s)$。两边在两个凸集 $\{\operatorname{Re}(s) > 0,\ \operatorname{Im}(s) > 0\}$ 与 $\{\operatorname{Re}(s) > 0,\ \operatorname{Im}(s) < 0\}$ 上都全纯（它们不含极点 $s = 1$），又在 $2 \pm i$ 附近相等，由恒等定理在这两个区域上处处相等；正实轴上的点 $x \neq 1$ 沿 $x + \frac{i}{n+1} \to x$ 取极限得到。最后 $2\cdot 2^{-s} = 2^{1-s}$。结论 2：右端为 $0$；$S_N(1)$ 的实部是交错调和级数的部分和，各项绝对值 $\frac{1}{n+1}$ 单调递减，所以它的任何极限都不小于 $S_2(1) = 1 - \frac{1}{2} = \frac{1}{2}$，不可能是 $0$。完整证明由 Lean 内核检查。
:::

在实轴上，[@lem-alternating-zeta-partial-sums] 的左端逐对为正，右端的因子 $1 - 2^{1-x}$ 在 $0 < x < 1$ 时为负，于是 $\zeta(x)$ 只能是负数。

::: {.proposition #prop-zeta-real-axis-sign title="ζ 在实轴上的符号与实零点" lean="D5/S3/Analytic/Isolation/RiemannZetaPositiveRealSign.riemannZeta_ofReal_sign D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.riemannZeta_ne_zero_of_real_mem_Ioo D5/S3/Weil/ZetaBridge/RealAxisNonvanishing.riemannZeta_real_zero_outside_Ioo"}
设 $x$ 为实数，$\zeta(x)$ 指 Mathlib 的 `riemannZeta` 在复数 $x + 0i$ 处的值。

1. 若 $x > 0$ 且 $x \neq 1$，则 $\operatorname{Im}\zeta(x) = 0$，并且或者 $x < 1$ 且 $\operatorname{Re}\zeta(x) < 0$，或者 $x > 1$ 且 $\operatorname{Re}\zeta(x) > 0$。
2. 若 $0 < x < 1$，则 $\zeta(x) \neq 0$。
3. 若“$0 < x < 1$”不成立且 $\zeta(x) = 0$，则存在自然数 $n$ 使 $x = -2(n + 1)$。
:::

::: proof
结论 1：模块 `RiemannZetaPositiveRealSign` 独立重建了 [@lem-alternating-zeta-partial-sums] 证明中的配对级数 $P(s) = \sum_n \bigl[(2n+1)^{-s} - (2n+2)^{-s}\bigr]$，同样借助恒等定理（这里只用上半个区域）与取极限，得到 $P(x) = (1 - 2\cdot 2^{-x})\,\zeta(x)$（$x > 0$，$x \neq 1$）。$t \mapsto t^{-x}$ 严格递减，所以每一对都是正实数，$P(x)$ 是正实数。$0 < x < 1$ 时 $2^{-x} > \frac{1}{2}$，实因子 $1 - 2\cdot 2^{-x}$ 为负；比较两边虚部得 $\operatorname{Im}\zeta(x) = 0$，比较实部得 $\operatorname{Re}\zeta(x) < 0$。$x > 1$ 时直接用 Mathlib 的两条定理：$\zeta(x)$ 是实数且实部为正。结论 2 由结论 1 得到：零的实部是 $0$，不是负数。结论 3：若 $x > 0$，则 $x \ge 1$，与 Mathlib 的“$\zeta$ 在 $\operatorname{Re}(s) \ge 1$ 上无零点”矛盾。若 $x \le 0$：$\zeta(0) = -\frac{1}{2}$，故 $x \neq 0$，于是 $\zeta(x) = \Lambda(x)/\Gamma_{\mathbb{R}}(x)$，其中 $\Lambda$ 是完备 $\zeta$，$\Gamma_{\mathbb{R}}(s) = \pi^{-s/2}\,\Gamma(s/2)$。冻结定理 [`completedRiemannZeta_ne_zero_of_re_nonpos`](lean:D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_ne_zero_of_re_nonpos) 说 $\Lambda$ 在 $\operatorname{Re}(s) \le 0$ 上不为零，所以商为零只能是分母为零：Mathlib 的 $\Gamma$ 在它的极点（非正整数）处取约定值 $0$，按 Lean 的全函数除法约定，商随之为 $0$。$\Gamma_{\mathbb{R}}(x) = 0$ 恰当 $x = -2n$（$n \in \mathbb{N}$），而 $x \neq 0$ 迫使 $n \ge 1$。完整证明由 Lean 内核检查。
:::

::: {.example #ex-alternating-eta-real-axis title="在 s = 1/2 处逐项累加交错级数：配对和为正，因子为负"}
本例的数值由高精度数值计算（40 位有效数字）得出，四舍五入到所示位数；末段用到的交错调和级数之和 $\ln 2$ 是文献结果，未在本书形式化。

**部分和被两边夹住。** 取 $s = \frac{1}{2}$，记 $S_N = S_N(\tfrac{1}{2})$。前四个部分和是 $S_1 = 1$、$S_2 = 1 - \tfrac{1}{\sqrt{2}} = 0.292893$、$S_3 = 0.870243$、$S_4 = 0.370243$。偶数个项的部分和每次加上一个正的配对，逐个增大；奇数个项的部分和每次加上 $-(2k)^{-1/2} + (2k+1)^{-1/2} < 0$，逐个减小。[@lem-alternating-zeta-partial-sums] 的极限 $L = (1 - \sqrt{2})\,\zeta(\tfrac{1}{2}) = 0.604899$ 被夹在两者之间：

| $N$ | $S_N$ | $S_N - L$ |
| :---: | :---: | :---: |
| $1$ | $1.000000$ | $+0.395101$ |
| $2$ | $0.292893$ | $-0.312005$ |
| $3$ | $0.870243$ | $+0.265345$ |
| $4$ | $0.370243$ | $-0.234655$ |
| $100$ | $0.555024$ | $-0.049875$ |
| $101$ | $0.654527$ | $+0.049629$ |
| $1000$ | $0.589091$ | $-0.015807$ |
| $1001$ | $0.620698$ | $+0.015800$ |

$N$ 较大时，误差大约是下一项 $(N+1)^{-1/2}$ 的一半，收敛很慢；但符号从第二个部分和起就定了：$L > S_2 = 1 - 2^{-1/2} > 0$。

**除以负的因子。** 因子 $1 - 2^{1 - 1/2} = 1 - \sqrt{2} = -0.414214$ 是负数，所以 $\zeta(\tfrac{1}{2}) = L/(1 - \sqrt{2}) = -1.460355$：正数除以负数，得到 [@prop-zeta-real-axis-sign] 结论 1 所说的负号。

**沿实轴扫一遍。** 记 $\eta(x) = (1 - 2^{1-x})\,\zeta(x)$，即交错级数的和：

| $x$ | $1 - 2^{1-x}$ | $\eta(x)$ | $\zeta(x)$ | $(x - 1)\,\zeta(x)$ |
| :---: | :---: | :---: | :---: | :---: |
| $0.1$ | $-0.866066$ | $0.522270$ | $-0.603038$ | $0.542734$ |
| $0.5$ | $-0.414214$ | $0.604899$ | $-1.460355$ | $0.730177$ |
| $0.9$ | $-0.071773$ | $0.676832$ | $-9.430114$ | $0.943011$ |
| $1.1$ | $0.066967$ | $0.708809$ | $10.584448$ | $1.058445$ |
| $1.5$ | $0.292893$ | $0.765147$ | $2.612375$ | $1.306188$ |
| $2$ | $0.500000$ | $0.822467$ | $1.644934$ | $1.644934$ |

$\eta$ 在整段上是平稳变化的正数；$\zeta$ 的符号翻转全部来自因子 $1 - 2^{1-x}$，它在 $x = 1$ 处由负变正。在 $x = 1$ 附近因子约为 $(x - 1)\ln 2$（一阶展开，手工推导），而 $\eta$ 接近 $\ln 2 = 0.693147$，所以 $\zeta(x) \approx \frac{1}{x - 1}$：最后一列在 $x = 0.9$ 与 $x = 1.1$ 处分别是 $0.943011$ 与 $1.058445$，从两侧靠近 [@lem-riemann-zeta-residue-one] 的单位留数。在 $x = 1$ 本身，交错调和级数的部分和 $S_{10}(1) = 0.645635$、$S_{100}(1) = 0.688172$、$S_{1000}(1) = 0.692647$ 趋于 $\ln 2$（文献结果，未在本书形式化），而公式的右端 $(1 - 2^{0})\,\zeta(1)$ 是 $0$：这正是 [@lem-alternating-zeta-partial-sums] 结论 2 排除的情形。
:::

**从实轴到整个平面。** 离开实轴，逐对为正的论证就失效了，因为配对和变成了复数。所钉仓库给出的是完备函数 $\Lambda$ 与 $\xi$ 读数的零点位置。

::: {.proposition #prop-xi-zeros-strip-zeros title="ξ 读数的零点恰是临界带内的 ζ 零点；完备 ζ 在 Re(s) ≥ 1 上不为零" lean="D5/S3/Analytic/ShiftedXiPoisson/ShiftedPoissonSemigroup.xiReading_eq_zero_iff_nontrivial D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_eq_zero_iff_of_re_pos D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_ne_zero_of_one_le_re"}
沿用 [@def-xi-reading] 的记号：$\Lambda(s)$ 是 Mathlib 的 `completedRiemannZeta s`（即 $\operatorname{completedZetaReading}\ s$），$\zeta$ 是 `riemannZeta`。

1. 对一切 $s \in \mathbb{C}$：$\operatorname{xiReading}\ s = 0$ 当且仅当 $\zeta(s) = 0$ 且 $0 < \operatorname{Re}(s) < 1$。
2. 对一切满足 $\operatorname{Re}(s) > 0$ 的 $s \in \mathbb{C}$：$\Lambda(s) = 0$ 当且仅当 $\zeta(s) = 0$。
3. 对一切满足 $\operatorname{Re}(s) \ge 1$ 的 $s \in \mathbb{C}$：$\Lambda(s) \neq 0$。
:::

::: proof
结论 2：$\operatorname{Re}(s) > 0$ 时 $s \neq 0$ 且 $\Gamma_{\mathbb{R}}(s) \neq 0$，Mathlib 的关系 $\zeta(s) = \Lambda(s)/\Gamma_{\mathbb{R}}(s)$ 可改写为 $\Lambda(s) = \Gamma_{\mathbb{R}}(s)\,\zeta(s)$，两边同时为零。结论 3 由结论 2 与 Mathlib 的“$\zeta$ 在 $\operatorname{Re}(s) \ge 1$ 上无零点”得到。结论 1：若 $\operatorname{xiReading}\ s = 0$，由 [@thm-xi-reading-entire-reflection] 的结论 4 知 $s \neq 0, 1$，再由其结论 1，$\operatorname{xiReading}\ s = \frac{1}{2}\,s\,(s - 1)\,\Lambda(s)$，前面的因子不为零，故 $\Lambda(s) = 0$。冻结定理 [`completedRiemannZeta_eq_zero_iff`](lean:D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_eq_zero_iff) 说 $\Lambda$ 的零点恰是临界带内的 $\zeta$ 零点：$\Lambda$ 在 $\operatorname{Re}(s) \ge 1$ 上不为零（结论 3），由 $\Lambda(1 - s) = \Lambda(s)$ 在 $\operatorname{Re}(s) \le 0$ 上也不为零，带内用结论 2。反方向沿同一条链倒推。完整证明由 Lean 内核检查。
:::

由结论 2 与结论 3 可作一行手工推导：若 $\operatorname{Re}(s) \ge 1$ 而 $\zeta(s) = 0$，结论 2 给出 $\Lambda(s) = 0$，与结论 3 矛盾。所以 $\zeta$ 在闭半平面 $\operatorname{Re}(s) \ge 1$ 上没有零点；其中直线 $\operatorname{Re}(s) = 1$ 上的部分，是 Hadamard 与 de la Vallée Poussin（1896）为证明素数定理建立的。这条事实在 Lean 中以 Mathlib 定理的身份进入结论 3 的证明；上面的推导说明，它也能从冻结的陈述直接读出。结论 1 则说明，[@thm-xi-reading-entire-reflection] 与 [@prop-zeta-conjugation-covariance] 为 $\xi$ 给出的四点一组的对称，就是临界带内 $\zeta$ 零点的对称；由 [@prop-zeta-real-axis-sign]，这些零点没有一个是实数。

**从无零点到数素数。** 直线 $\operatorname{Re}(s) = 1$ 上没有零点，为什么能拿来数素数？对欧拉乘积取对数再求导，素数以权重 $\ln p$ 出现（手工推导，在 $\operatorname{Re}(s) > 1$ 上逐项求导）：

$$
-\frac{\zeta'(s)}{\zeta(s)} = \sum_{p} \frac{\ln p \cdot p^{-s}}{1 - p^{-s}} = \sum_{n \ge 1} \Lambda(n)\, n^{-s} .
$$

这里的 $\Lambda$ 是冯·曼戈尔特函数：$\Lambda(p^j) = \ln p$（$p$ 为素数，$j \ge 1$），其余为 $0$；它与上面的完备函数 $\Lambda(s)$ 只是同用一个字母。把这些权重累加到 $x$，得到切比雪夫函数 $\psi(x) = \sum_{n \le x} \Lambda(n)$。例如 $\psi(10) = 3\ln 2 + 2\ln 3 + \ln 5 + \ln 7 = \ln 2520$，而 $2520$ 恰是 $1, 2, \dots, 10$ 的最小公倍数：一般地 $\psi(x) = \ln \operatorname{lcm}(1, \dots, \lfloor x\rfloor)$，因为最小公倍数里素数 $p$ 的指数正是满足 $p^j \le x$ 的最大 $j$（手工推导）。“素数铺得均匀”，说的就是 $\psi(x)$ 与 $x$ 一样快地增长。$\zeta$ 在 $s = 1$ 处有单极点（[@lem-riemann-zeta-residue-one]），所以 $-\zeta'/\zeta$ 在那里有留数为 $1$ 的单极点，它贡献主项 $x$；按经典的显式公式（文献结果，未在本书形式化），每个零点 $\rho$ 再贡献一项大小约为 $x^{\operatorname{Re}\rho}$ 的起伏，零点离直线 $\operatorname{Re}(s) = 1$ 越远，起伏越小。所钉仓库冻结了这一机制的一个定量版本。

::: {.theorem #thm-medium-pnt title="带误差项的素数定理（切比雪夫函数形式）" lean="D5/S3/Weil/PrimeNumberTheorem/MediumPNT.MediumPNT"}
对实数 $x$，记 $\psi(x) = \sum_{1 \le n \le \lfloor x\rfloor} \Lambda(n)$（Mathlib 的 `Chebyshev.psi`；$\lfloor x\rfloor$ 为自然数下取整 `⌊x⌋₊`，$\Lambda$ 为冯·曼戈尔特函数）。存在常数 $c > 0$，使得当 $x \to +\infty$ 时

$$
\psi(x) - x = O\bigl(x\, e^{-c\,(\ln x)^{1/10}}\bigr),
$$

即存在常数 $C$ 与 $x_0$，使一切 $x \ge x_0$ 满足 $\lvert\psi(x) - x\rvert \le C\,\bigl\lvert x\, e^{-c\,(\ln x)^{1/10}}\bigr\rvert$。
:::

::: proof
Lean 的证明改编自 PrimeNumberTheoremAnd 项目，走经典的围道积分路线，分五步。

（1）平滑。取一个光滑、非负、支撑在 $[\tfrac{1}{2}, 2]$ 内且 $\int_0^\infty \nu(u)\,\tfrac{du}{u} = 1$ 的鼓包 $\nu$，按宽度 $\varepsilon$ 压窄后与 $\psi$ 作梅林卷积，得到平滑的 $\psi_\varepsilon$。存在常数 $C$，使 $X > 3$、$0 < \varepsilon < 1$、$X\varepsilon > 2$ 时 $\lvert\psi_\varepsilon(X) - \psi(X)\rvert \le C\,\varepsilon X \ln X$。

（2）积分表示。$\psi_\varepsilon(X)$ 写成竖直线 $\operatorname{Re}(s) = 1 + 1/\ln X$ 上的围道积分，被积函数是 $-\zeta'(s)/\zeta(s)$、平滑核的梅林变换与 $X^s$ 三者之积。

（3）推移路径。在 $\lvert t\rvert > 3$、$\operatorname{Re}(s) \ge 1 - A/(\ln\lvert t\rvert)^9$ 的区域内 $\lvert\zeta'(s)/\zeta(s)\rvert \le C\,(\ln\lvert t\rvert)^9$，在 $\lvert t\rvert \le 3$ 的一块矩形内 $\zeta'/\zeta$ 除 $s = 1$ 外全纯。这是“直线 $\operatorname{Re}(s) = 1$ 上没有零点”的定量加强（无零区）。把积分路径推进这块区域，越过 $s = 1$ 时拾起留数，它与 $X$ 相差不超过 $c\,\varepsilon X$。

（4）逐段估计。新路径上其余各段的积分逐段估计，用到的只是（3）的界、平滑核梅林变换的衰减，以及 $\lvert X^s\rvert = X^{\operatorname{Re}(s)}$。

（5）选取参数。取 $\varepsilon = e^{-c_1(\ln X)^{1/10}}$、截断高度 $T = e^{c_2(\ln X)^{1/10}}$，各项误差都化为 $X e^{-c(\ln X)^{1/10}}$ 的倍数；指数 $1/10$ 来自无零区宽度中的 $(\ln\lvert t\rvert)^9$。完整证明由 Lean 内核检查。
:::

两点说明。第一，$c$ 与大 $O$ 里的常数都只断言存在，定理不给出数值；有限的数表检验不了渐近命题，下面的例子只用来看清它说的是什么。第二，由定理可作一行手工推导：$e^{-c(\ln x)^{1/10}} \to 0$，所以 $\psi(x)/x \to 1$。从 $\psi$ 过渡到素数计数函数 $\pi(x) \sim x/\ln x$，经典上用分部求和（文献结果，未在本书形式化）；本书没有引用 $\pi(x)$ 形式的冻结声明。

::: {.example #ex-chebyshev-psi-table title="ψ(x) 贴着 x 走，π(x) ln x / x 慢慢落向 1"}
下表由逐个累加素数幂的精确计算得出，四舍五入到所示位数。

| $x$ | $\psi(x)$ | $\psi(x)/x$ | $\psi(x) - x$ | $\pi(x)$ | $x/\ln x$ | $\pi(x)\ln x/x$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $10$ | $7.832$ | $0.783201$ | $-2.168$ | $4$ | $4.3$ | $0.9210$ |
| $10^2$ | $94.045$ | $0.940453$ | $-5.955$ | $25$ | $21.7$ | $1.1513$ |
| $10^3$ | $996.681$ | $0.996681$ | $-3.319$ | $168$ | $144.8$ | $1.1605$ |
| $10^4$ | $10013.397$ | $1.001340$ | $13.397$ | $1229$ | $1085.7$ | $1.1320$ |
| $10^5$ | $100051.564$ | $1.000516$ | $51.564$ | $9592$ | $8685.9$ | $1.1043$ |
| $10^6$ | $999586.597$ | $0.999587$ | $-413.403$ | $78498$ | $72382.4$ | $1.0845$ |

$\psi(x)/x$ 在 $x = 10^6$ 时与 $1$ 只差 $0.00041$，而 $\pi(x)\ln x/x$ 在同一处还差 $0.08$：用 $\ln p$ 加权的计数比逐个点数的计数更快贴近主项。$\psi(x) - x$ 的符号来回变动（$10^4$、$10^5$ 为正，$10^6$ 为负），按显式公式的经典图像，这正是零点起伏在小范围内的样子。

定理保证的误差界收得极慢。即使取 $c = 1$，$(\ln x)^{1/10}$ 在 $x = 10^6$ 时只有 $1.3003$，相对误差界 $e^{-1.3003} = 0.2725$；到 $x = 10^{100}$ 仍有 $e^{-1.7227} = 0.1786$。实际的相对误差 $\lvert\psi(x)/x - 1\rvert$ 在 $x = 10^6$ 时只有 $0.00041$。作为形状的对照，de la Vallée Poussin 的经典误差项 $x e^{-c\sqrt{\ln x}}$（文献结果，未在本书形式化）取 $c = 1$ 时在 $x = 10^6$ 处的相对值是 $0.0243$。冻结的版本换来的是一份可以逐行检查的证明，而不是最好的误差项。
:::

::: {.figure src="ch22-chebyshev-psi"}
**$\psi(x)$ 贴着 $x$ 走，$\pi(x)\ln x/x$ 落得慢。** 上图：青色阶梯是 $\psi(x)$，在每个素数幂 $p^k$ 处跳 $\ln p$，紧贴着墨色的直线 $y = x$ 往上爬。下图（对数横轴，$10 \le x \le 10^6$）：青色的 $\psi(x)/x - 1$ 很快贴到零线上，灰色的 $\pi(x)\ln x/x - 1$ 到 $10^6$ 还有 $0.08$。曲线是数值结果；[@thm-medium-pnt] 是渐近陈述、不给常数，有限的图只用来看清它说的是什么；$\pi(x)$ 形式的素数定理是文献结果。
:::

素数定理只用到直线 $\operatorname{Re}(s) = 1$ 上没有零点；黎曼猜想断言的则是更靠里的事：临界带内的全体零点都落在 $\operatorname{Re}(s) = \frac{1}{2}$ 上。回到开头那个措辞问题。

::: {.theorem #thm-right-half-strip-rh-forms title="黎曼猜想只需检查右半带；Mathlib 的非平凡零点都在临界带内，两种表述等价" lean="D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh D5/S3/Zeros/ActualZeroGeometry.rh_iff_nontrivial_zeros_on_line D5/S3/Weil/Mertens/Cryptids/VonMangoldtCount/Foundation.mem_criticalStrip_of_isNontrivialZetaZero"}
记 `RiemannHypothesis` 为 Mathlib 的命题（内容见 [@thm-cayley-critical-line-criterion] 结论 2），$\zeta$ 是 `riemannZeta`。

1. **右半带归约**：若不存在 $\rho \in \mathbb{C}$ 同时满足 $\zeta(\rho) = 0$ 与 $\frac{1}{2} < \operatorname{Re}(\rho) < 1$，则 `RiemannHypothesis` 成立。
2. **两种表述等价**：`RiemannHypothesis` 成立，当且仅当对一切 $\rho \in \mathbb{C}$，若 $\zeta(\rho) = 0$ 且 $0 < \operatorname{Re}(\rho) < 1$，则 $\operatorname{Re}(\rho) = \frac{1}{2}$。
3. **Mathlib 的非平凡零点都在临界带内**：对一切 $\rho \in \mathbb{C}$，若 $\zeta(\rho) = 0$，且不存在自然数 $n$ 使 $\rho = -2(n + 1)$，且 $\rho \neq 1$，则 $0 < \operatorname{Re}(\rho) < 1$。
:::

::: proof
结论 1：任取 Mathlib 意义下的非平凡零点 $\rho$（不是 $-2(n+1)$，也不是 $1$），设 $\operatorname{Re}(\rho) \neq \frac{1}{2}$，按实部分四种情形导出矛盾。$\operatorname{Re}(\rho) \ge 1$：与 Mathlib 的“$\zeta$ 在该半平面无零点”矛盾。$\frac{1}{2} < \operatorname{Re}(\rho) < 1$：与假设矛盾。$0 < \operatorname{Re}(\rho) < \frac{1}{2}$：Mathlib 的函数方程 $\zeta(1 - \rho) = 2\,(2\pi)^{-\rho}\,\Gamma(\rho)\cos\bigl(\tfrac{\pi\rho}{2}\bigr)\,\zeta(\rho)$ 给出 $\zeta(1 - \rho) = 0$，而 $1 - \rho$ 落在右半带内，仍与假设矛盾。$\operatorname{Re}(\rho) \le 0$：先由 $\zeta(0) = -\frac{1}{2}$ 知 $\rho \neq 0$；令 $t = 1 - \rho$，则 $\operatorname{Re}(t) \ge 1$，函数方程把 $\zeta(\rho) = \zeta(1 - t)$ 写成 $2\,(2\pi)^{-t}\,\Gamma(t)\cos\bigl(\tfrac{\pi t}{2}\bigr)\,\zeta(t)$；其中 $(2\pi)^{-t}$、$\Gamma(t)$、$\zeta(t)$ 都不为零，只能 $\cos\bigl(\tfrac{\pi t}{2}\bigr) = 0$，即 $t = 2k + 1$，$k \ge 0$ 为整数，于是 $\rho = -2k$，而 $\rho \neq 0$ 迫使 $\rho = -2(n+1)$，与“非平凡”矛盾（这一步在模块 `RightHalfStripRiemannReduction` 中是一条私有辅助引理）。结论 2 的正向：临界带内的零点实部大于 $0$，不是 $-2(n+1)$；实部小于 $1$，也不是 $1$；`RiemannHypothesis` 直接适用。反向：右半带内的零点属于临界带，按假设实部为 $\frac{1}{2}$，与实部大于 $\frac{1}{2}$ 矛盾，再用结论 1。结论 3 在另一个冻结模块中证明，用的正是结论 1 首尾两种情形的论证：实部小于 $1$，因为 Mathlib 的 $\zeta$ 在 $\operatorname{Re}(s) \ge 1$ 上无零点；实部大于 $0$，因为若 $\operatorname{Re}(\rho) \le 0$，上面对 $t = 1 - \rho$ 使用函数方程的推理会迫使 $\rho = -2(n+1)$，与假设矛盾。在那个模块里，这一步是公开的冻结定理。完整证明由 Lean 内核检查。
:::

结论 1 就是本节的镜像图像：函数方程把左半带 $0 < \operatorname{Re}(s) < \frac{1}{2}$ 中的零点 $\rho$ 送到右半带的 $1 - \rho$，所以只需守住镜子的一侧。以后文 [@ex-quartic-mock-quartet] 的伪造四点组为例，左半带的 $\tfrac{1}{4} + 14i$ 在 $s \mapsto 1 - s$ 下落到右半带的 $\tfrac{3}{4} - 14i$。（Lean 证明用的是 Mathlib 关于 $\zeta$ 本身的函数方程，不是 [@thm-xi-reading-entire-reflection] 的 $\xi$ 反射；两者描述的是同一个对称 $s \mapsto 1 - s$。）结论 3 回答了开头那个措辞问题：Mathlib 意义下的非平凡零点都在临界带内；反过来，临界带内的零点实部严格介于 $0$ 与 $1$ 之间，既不是 $-2(n+1)$，也不是 $1$（一行手工推导）。两种说法圈出的是同一组零点。结论 2 的右端就是 [@conj-riemann-hypothesis] 中的临界带公式，所以 Mathlib 的 `RiemannHypothesis`、[@thm-cayley-critical-line-criterion] 的径向形式与 [@conj-riemann-hypothesis] 是同一个命题的三种等价写法。本章的这几条冻结定理本身只是**改写与归约，不是证明**；但正因这一经内核验证的等价性，外部 Lean 4 工程对 Mathlib 命题 `RiemannHypothesis` 的证明（[@conj-riemann-hypothesis]）直接将上述三种表述一并确立。

::: {.remark #rem-zeta-zero-free-region-literature title="ζ 的平凡零点（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 负偶数 $-2, -4, -6, \dots$ 确实都是 $\zeta$ 的零点（Riemann, 1859）。上面的冻结结论只管另一个方向：[@prop-zeta-real-axis-sign] 的结论 3 说 $(0, 1)$ 之外的实零点只能是这些负偶数；[@thm-right-half-strip-rh-forms] 的结论 3 说临界带之外的零点只能是这些负偶数或 $s = 1$，而 $s = 1$ 已被 [@prop-xi-zeros-strip-zeros] 之后的手工推导排除。“这些负偶数确实是零点”本身在 Mathlib 中是定理 `riemannZeta_neg_two_mul_nat_add_one`，所钉仓库只在证明中用到它，没有把它冻结为可引用的声明。
:::

现在回到凯莱坐标，看反射与共轭在单位圆上的样子。

记 $w = \dfrac{s - 1}{s}$。三种对称在 $w$ 坐标里各有一个干净的样子（各一行手工推导）：

$$
\begin{aligned}
s \mapsto 1 - s &:\qquad w \mapsto \frac{(1 - s) - 1}{1 - s} = \frac{s}{s - 1} = \frac{1}{w}, \\
s \mapsto \overline{s} &:\qquad w \mapsto \overline{w}, \\
s \mapsto 1 - \overline{s} &:\qquad w \mapsto \frac{1}{\overline{w}} .
\end{aligned}
$$

第三行是关于单位圆的**反演**：它把圆内的点换到圆外同一条射线上，圆周上的点不动。“临界线是镜面”与“单位圆是反演的不动圆”是同一句话。一个离线零点 $\rho$ 的四点轨道 $\rho,\ \overline{\rho},\ 1 - \rho,\ 1 - \overline{\rho}$ 在 $w$ 坐标里是 $w,\ \overline{w},\ \frac{1}{w},\ \frac{1}{\overline{w}}$：两个在圆内，两个在圆外。偏出圆周的量也有闭式（由 $|s - 1|^2 - |s|^2 = 1 - 2\sigma$，记 $s = \sigma + it$）：

$$
|w|^2 - 1 \;=\; \frac{1 - 2\sigma}{\sigma^2 + t^2} .
$$

::: {.viz src="critical-mirror" preset="cayley" height="500"}
**临界线卷成单位圆。** $\rho = \frac{1}{2} + 14.134725\,i$ 在镜面上，它的像 $w$ 落在青色的单位圆上，辐角 $4.05^\circ$；灰点是前五个零点（数值结果）在两个平面里的位置，在右边都落在圆上、靠近 $w = 1$。$s \mapsto 1 - \overline{s}$ 在这里是关于圆的反演，圆上的点不动（[@thm-cayley-critical-line-criterion]）。
:::

::: {.example #ex-cayley-unit-circle-zeros title="前五个零点在单位圆上的位置，以及离线的点偏出圆周多少"}
**临界线上的点。** 对 $s = \frac{1}{2} + it$ 有 $s - 1 = -\overline{s}$，故 $w = -\overline{s}/s$，$|w| = 1$。当 $t > 0$ 时 $\arg s = \arctan(2t)$，于是

$$
\arg w \;=\; \pi - 2\arctan(2t) \;=\; 2\arctan\frac{1}{2t} .
$$

$t = 0$（即 $s = \frac{1}{2}$）落在 $w = -1$；$t \to +\infty$ 时 $w \to 1$。上半条临界线被卷成上半圆周，从 $-1$ 走到 $1$。

**前五个零点。** 零点的虚部 $t_n$ 取自文献（文献结果，未在本书形式化），其余各列由上式算出，四舍五入到所示位数：

| $n$ | $t_n$ | $\arg w_n$（弧度） | $\arg w_n$（度） | $w_n$ |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $14.134725$ | $0.070718$ | $4.0519^\circ$ | $0.997501 + 0.070659\,i$ |
| $2$ | $21.022040$ | $0.047560$ | $2.7250^\circ$ | $0.998869 + 0.047542\,i$ |
| $3$ | $25.010858$ | $0.039977$ | $2.2905^\circ$ | $0.999201 + 0.039967\,i$ |
| $4$ | $30.424876$ | $0.032865$ | $1.8830^\circ$ | $0.999460 + 0.032859\,i$ |
| $5$ | $32.935062$ | $0.030360$ | $1.7395^\circ$ | $0.999539 + 0.030356\,i$ |

上半平面里虚部最小的零点是 $t_1$，于是结合外部已验证的黎曼猜想（[@conj-riemann-hypothesis]）与 [@thm-cayley-critical-line-criterion]，上半平面的全部非平凡零点都挤在单位圆上辐角不超过 $4.06^\circ$（精确上界 $2\arctan\frac{1}{2t_1} \approx 4.0519^\circ$）的一小段弧里，并向 $w = 1$ 聚拢；下半平面的零点是它们的共轭。

**几个参照点。** $s = 2 \mapsto w = \frac{1}{2}$（圆内），它的反射像 $s = -1 \mapsto w = 2$（圆外），两者互为倒数；$s = 1 \mapsto w = 0$；$s = \frac{1}{2} \mapsto w = -1$。

**离线的点。** 取 $s = 0.6 + 14i$：$|w|^2 - 1 = \dfrac{1 - 1.2}{0.36 + 196} = -1.0185\times10^{-3}$，$|w| = 0.999491$。它的镜像 $1 - \overline{s} = 0.4 + 14i$：$|w|^2 - 1 = \dfrac{1 - 0.8}{0.16 + 196} = +1.0196\times10^{-3}$，$|w| = 1.000510$。两个模的乘积为 $1$，与反演一致。在高度 $14$ 处偏离临界线 $0.1$，只让凯莱比的模偏离 $1$ 约万分之五：高处的临界带在 $w$ 坐标里被压成贴着圆周的一层薄膜。
:::

::: {.viz src="critical-mirror" preset="thin" height="500"}
**高处的临界带是贴着圆周的一层薄膜。** $\rho = 0.6 + 14i$ 离镜面 $0.1$，它的像只偏出圆周约万分之五：$\lvert w\rvert = 0.999491$，反演的像 $1.000510$。左下的放大镜把辐角与 $\ln\lvert w\rvert$ 拉开，青色的圆周在镜中成了一条直线，四个像在它两侧排成矩形（数值取自 [@ex-cayley-unit-circle-zeros]）。
:::

**对称性本身锁不住零点。** 既然 $\xi$ 同时具有反射与共轭两种对称，能不能单凭这两种对称推出零点必在镜面上？不能，而且反例只需要一个四次多项式。所钉仓库的模块 `D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization` 把它写了出来。

::: {.definition #def-off-critical-quartic title="离线四次式、完全 ζ 对称性与定线局域化" lean="D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.offCriticalQuartic D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.sourceZeros D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.HasFullZetaSymmetry D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.FixedLineLocalization"}
对实数 $\delta, \gamma$ 与函数 $F : \mathbb{C} \to \mathbb{C}$：

1. **离线四次式** [`offCriticalQuartic`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.offCriticalQuartic) $\delta\ \gamma\ s$ 定义为

   $$
   \bigl((z - \delta)^2 + \gamma^2\bigr)\,\bigl((z + \delta)^2 + \gamma^2\bigr), \qquad z = s - \frac{1}{2} ;
   $$

2. [`sourceZeros`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.sourceZeros) $\delta\ \gamma$ 是有限集 $\bigl\{\tfrac{1}{2} + \delta + i\gamma,\ \tfrac{1}{2} + \delta - i\gamma,\ \tfrac{1}{2} - \delta + i\gamma,\ \tfrac{1}{2} - \delta - i\gamma\bigr\}$；
3. $F$ 具有**完全 $\zeta$ 对称性** [`HasFullZetaSymmetry`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.HasFullZetaSymmetry) $F$，指对一切 $s$ 有 $F(1 - s) = F(s)$，且对一切 $s$ 有 $F(\overline{s}) = \overline{F(s)}$；
4. $F$ 满足**定线局域化** [`FixedLineLocalization`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.FixedLineLocalization) $F$，指对一切 $s$，$F(s) = 0$ 蕴含 $\operatorname{Re}(s) = \frac{1}{2}$。
:::

::: {.theorem #thm-full-symmetry-not-localization title="具有完全 ζ 对称性的整函数可以没有任何零点在临界线上" lean="D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization"}
设 $\delta, \gamma \in \mathbb{R}$，$\delta \neq 0$，$\gamma \neq 0$，并沿用 [@def-off-critical-quartic] 的记号。则：

1. 函数 $F = \operatorname{offCriticalQuartic}\ \delta\ \gamma$ 在整个 $\mathbb{C}$ 上复可微，具有完全 $\zeta$ 对称性；对一切 $s$，$F(s) = 0$ 当且仅当 $s \in \operatorname{sourceZeros}\ \delta\ \gamma$；$\operatorname{sourceZeros}\ \delta\ \gamma$ 恰有 $4$ 个元素；$F$ 的每个零点 $s$ 都满足 $\operatorname{Re}(s) \neq \frac{1}{2}$。
2. 因此，命题“每个在 $\mathbb{C}$ 上复可微且具有完全 $\zeta$ 对称性的函数 $F : \mathbb{C} \to \mathbb{C}$ 都满足定线局域化”不成立。
:::

::: proof
由 $(z \mp \delta)^2 + \gamma^2 = (z \mp \delta - i\gamma)(z \mp \delta + i\gamma)$，四次式分解成四个一次因子，零点恰为 $z = \pm\delta \pm i\gamma$。反射 $s \mapsto 1 - s$ 即 $z \mapsto -z$，它交换两个二次因子；系数全为实数，故与共轭交换。多项式处处复可微。四个零点的实部是 $\frac{1}{2} \pm \delta$，$\delta \neq 0$ 时都不等于 $\frac{1}{2}$；$\delta \neq 0$ 且 $\gamma \neq 0$ 时四点两两不同。结论 2 把结论 1 的 $F$ 代入全称命题即得矛盾。完整证明由 Lean 内核检查。
:::

::: {.example #ex-quartic-mock-quartet title="一组伪造的离线四点零点：δ = 1/4，γ = 14"}
取 $\delta = \frac{1}{4}$、$\gamma = 14$。[@thm-full-symmetry-not-localization] 给出的四个零点是

$$
\tfrac{1}{4} \pm 14i, \qquad \tfrac{3}{4} \pm 14i ,
$$

全部在临界带 $0 < \operatorname{Re}(s) < 1$ 内，高度与 $\zeta$ 的第一个零点相仿，却没有一个在临界线上。

**对称性的数值核对。** 在 $s = 0.3 + 2i$ 处 $F(s) = 36903.7205 - 307.1640\,i$；$F(1 - s) = F(0.7 - 2i)$ 给出同一个数；$F(\overline{s}) = 36903.7205 + 307.1640\,i$ 是它的共轭。

**在临界线上。** 代入 $z = it$ 并展开（手工推导）：

$$
F\bigl(\tfrac{1}{2} + it\bigr) \;=\; \bigl(\delta^2 + \gamma^2 - t^2\bigr)^2 + 4\delta^2 t^2 .
$$

它是实数——这是完全对称性的必然结果，与 $\xi$ 在临界线上取实值是同一个道理——而且严格为正。对 $t^2$ 求极小，最小值在 $t^2 = \gamma^2 - \delta^2$ 处取到，等于 $4\delta^2\gamma^2 = 49$；在 $t = 14$ 处 $F = 49.0039$。这个函数沿临界线从不变号。

**在凯莱坐标里。** 四个零点的像满足 $|w| = 0.998727$（对 $\frac{3}{4} \pm 14i$）与 $|w| = 1.001274$（对 $\frac{1}{4} \pm 14i$）：两个在单位圆内，两个在圆外，两两互为反演，对数径向亏量为 $\mp 1.2735\times10^{-3}$，都不为零。

对照 [@ex-xi-mirror-values]：$\xi$ 沿临界线同样取实值，但它在 $t = 14$ 与 $t = 15$ 之间变了号。对称性只保证“在镜面上取实值”，不保证“在镜面上变号”。
:::

::: {.viz src="critical-mirror" preset="quartic" height="500"}
**对称锁不住零点。** 伪造的四点组 $\frac{1}{2} \pm \frac{1}{4} \pm 14i$ 都不在镜面上（左）。右上是同样对称的四次式沿临界线的值 $F(\frac{1}{2} + it)$：实数、处处为正，琥珀色的点是最低处 $49$；右下是 $\xi(\frac{1}{2} + it)$，在 $14$ 与 $15$ 之间穿过零（灰点是第一个零点，数值结果）。两条曲线各用各的标尺（[@thm-full-symmetry-not-localization]）。
:::

所以，任何证明黎曼猜想的论证所需要的信息都必然来自这两种对称性之外。这句话由 [@thm-full-symmetry-not-localization] 保证；2026 年的外部 Lean 4 形式化证明同样超越了单纯对称性（详见 [@conj-riemann-hypothesis]），而本书所钉仓库不冻结其内部证明细节。

::: {.viz src="critical-mirror" height="560"}
**镜子与凯莱圆：完整实验室。** 两个场景共用一条时间轴，它是 $\rho$ 到镜面的距离 $\delta$：镜子场景把临界带与凯莱坐标 $w = (s - 1)/s$ 并排，四次式场景把同样对称的四次式与 $\xi$ 沿临界线并排。在左边拖动 $\rho$ 改它的位置。页面不画“全部零点”，也不提供全谱证明；证据抽屉仍保留本书所钉 `trureturing` 仓库未冻结该证明时的标注，2026 年外部形式化证明见 [@conj-riemann-hypothesis]。
:::

**在 $s = 1$ 处读欧拉乘积：罗宾不等式。** 欧拉乘积的算术与零点之间，有一条已经被内核检查过的单向通道，而通道的整数一端连复数都用不着。取正整数 $n$，把它的全部因子之和 $\sigma(n)$ 除以 $n$。按 22.1 节的素数轴分解（手工推导），$\sigma(n)/n = \sum_{d \mid n} 1/d$ 恰好是欧拉乘积在 $s = 1$ 处的一个有限截断：只开启 $n$ 实际占据的素数轴，每根轴上的等比级数截在指数 $v_p(n)$ 处。对 $n \ge 2$，

$$
\frac{\sigma(n)}{n} \;=\; \prod_{p \mid n}\Bigl(1 + \frac{1}{p} + \cdots + \frac{1}{p^{v_p(n)}}\Bigr) \;<\; \prod_{p \mid n}\Bigl(1 - \frac{1}{p}\Bigr)^{-1} .
$$

右端把 $n$ 的每根素数轴都灌满到无穷深度，它的每个因子就是 [@thm-riemann-zeta-euler-product] 中的局部因子 $(1 - p^{-s})^{-1}$ 在 $s = 1$ 处的值（完整乘积在 $s = 1$ 处发散：把 $x$ 以下各素数的这些因子乘开，每个 $1/n$（$n \le x$）都出现一次，所以部分积不小于 $\sum_{n \le x} 1/n$；$s = 1$ 也正是 [@lem-riemann-zeta-residue-one] 的极点）。例如 $5040 = 2^4\cdot 3^2\cdot 5\cdot 7$：

$$
\frac{\sigma(5040)}{5040} \;=\; \frac{31}{16}\cdot\frac{13}{9}\cdot\frac{6}{5}\cdot\frac{8}{7} \;=\; \frac{403}{105} \;\approx\; 3.8381,
$$

而它的饱和值是 $2\cdot\frac{3}{2}\cdot\frac{5}{4}\cdot\frac{7}{6} = \frac{35}{8} = 4.375$。一个整数要让 $\sigma(n)/n$ 变大，就得同时占据许多小素数轴，可占据的轴越多，整数本身也越大。两者之间的平衡由尺子 $e^{\gamma}\ln\ln n$ 刻画，其中 $\gamma = 0.5772\ldots$ 是欧拉—马歇罗尼常数；这把尺子的来历见这一小段的末尾，它与黎曼猜想的经典联系记录在 [@rem-robin-criterion-literature] 中。所钉仓库的模块 `D5/S3/Arith/Robin/FewDistinctPrimes` 与 `D5/S3/Arith/Robin/OffLinePeak/OriginalLocalA` 冻结了这条联系中的两块。

::: {.definition #def-divisor-ratio-mertens-error title="除数比、完全曼戈尔特累积误差与非平凡零点" lean="D5/S3/Arith/Robin/PrimeFiberPropagation.divisorRatio D5/S3/Arith/Robin/CompleteMertensPeak.U D5/S3/Weil/ZeroSum.IsNontrivialZero"}
记 $\sigma(n) = \sum_{d \mid n} d$ 为因子和（Mathlib 的 `ArithmeticFunction.sigma 1`），$\gamma$ 为欧拉—马歇罗尼常数（`Real.eulerMascheroniConstant`），$\ln$ 为 Mathlib 的实对数 `Real.log`。

1. **除数比** [`divisorRatio`](lean:D5/S3/Arith/Robin/PrimeFiberPropagation.divisorRatio) $n$ 对自然数 $n$ 定义为实数 $\sigma(n)/n$（按 Lean 的全函数除法，$n = 0$ 时取值 $0$）。
2. **完全曼戈尔特累积误差** [`U`](lean:D5/S3/Arith/Robin/CompleteMertensPeak.U) 对实数 $t$ 定义为

   $$
   U(t) \;=\; t\sum_{0 < k \le \lfloor t\rfloor}\frac{\Lambda(k)}{k} \;-\; \psi(t) \;-\; t\ln t \;+\; (1 + \gamma)\,t ,
   $$

   其中 $\lfloor t\rfloor$ 是自然数下取整 `⌊t⌋₊`，$\Lambda$ 是冯·曼戈尔特函数（$\Lambda(p^j) = \ln p$，$p$ 为素数、$j \ge 1$；其余为 $0$；它定义在自然数上，与 [@def-xi-reading] 中的 $\Lambda(s)$ 不是同一个函数），$\psi(t) = \sum_{0 < k \le \lfloor t\rfloor}\Lambda(k)$ 是切比雪夫函数（Mathlib 的 `Chebyshev.psi`）。
3. **非平凡零点** [`IsNontrivialZero`](lean:D5/S3/Weil/ZeroSum.IsNontrivialZero) $\rho$ 指：$\operatorname{classicalZeta}(\rho) = 0$，且 $0 < \operatorname{Re}(\rho) < 1$（$\operatorname{classicalZeta}$ 见 [@def-classical-zeta]）。
:::

::: {.theorem #thm-robin-at-most-eight-primes title="至多八根素数轴上的罗宾不等式，以及 $5040 < n < 223092870$ 的全部整数" lean="D5/S3/Arith/Robin/FewDistinctPrimes.robin_of_card_primeFactors_le_eight D5/S3/Arith/Robin/FewDistinctPrimes.robin_lt_223092870"}
沿用 [@def-divisor-ratio-mertens-error] 的记号，记 $\omega(n)$ 为 $n$ 的不同素因子个数（`n.primeFactors.card`）。

1. 对一切自然数 $n$，若 $5040 < n$ 且 $\omega(n) \le 8$，则

   $$
   \frac{\sigma(n)}{n} \;<\; e^{\gamma}\,\ln\ln n .
   $$

2. 对一切自然数 $n$，若 $5040 < n < 223092870$，则同一不等式成立。这里 $223092870 = 2\cdot 3\cdot 5\cdot 7\cdot 11\cdot 13\cdot 17\cdot 19\cdot 23$。
:::

::: proof
结论 1 分两段。**(i) $5040 < n < 6000$。** 若 $n$ 的素因子都在 $\{2, 3, 5, 7, 11\}$ 中，直接用同一库中已冻结的 11-光滑情形 [`robin_eleven_smooth`](lean:D5/S3/Arith/Robin/ElevenSmooth.robin_eleven_smooth)。否则 $n$ 有素因子 $p \ge 13$，把 $n$ 拆成 $p^a\cdot r$（$r$ 与 $p$ 互素）：$p^a \ge 13$ 迫使 $r < 462$；$p$ 轴上的因子小于 $\frac{p}{p-1} \le \frac{13}{12}$，内核对 $r < 462$ 逐一检查 $\sigma(r)/r \le \frac{13}{4}$，故 $\sigma(n)/n \le \frac{169}{48} \approx 3.521$，而 $e^{\gamma} > \frac{89}{50}$ 与 $\ln\ln 5040 > \frac{1071}{500}$ 给出 $e^{\gamma}\ln\ln n > 3.8127$。

**(ii) $n \ge 6000$。** 只要某个较大素数上的指数大于某个较小素数上的指数，就把这两个指数对调；反复对调，得到 $m \le n$，它与 $n$ 的不同素因子个数相同、指数沿素数不增，且 $\sigma(n)/n \le \sigma(m)/m$（冻结定理 [`exists_antitone_exponent_form`](lean:D5/S3/Arith/ExponentExchange/PrefixNormalForm.exists_antitone_exponent_form)）。指数不增意味着 $m$ 的素因子是素数表开头的一段，至多八个就只能取自 $2, 3, \dots, 19$。若 $m \le 5040$：冻结定理 [`golden_resource_unique_optimum`](lean:D5/S3/Arith/GoldenResourceOptimalInteger.golden_resource_unique_optimum) 说 $5040$ 是 $\ln(\sigma(n)/n) - \frac{1}{25}\ln n$ 在全体正整数上的唯一最大点，由此 $\sigma(m)/m \le \frac{403}{105} \approx 3.8381$，而 $e^{\gamma}\ln\ln n > \frac{89}{50}\cdot\frac{54}{25} \approx 3.8448$。若 $m > 5040$：在 $m < 10^{12}$ 时，内核枚举 $2, 3, \dots, 19$ 的全部指数不增乘积，在十二个区间上给出 $\sigma(m)/m \le K/100$，并与每个区间左端的 $\ln\ln$ 有理下界比较；在 $m \ge 10^{12}$ 时，用饱和界 $\sigma(m)/m \le \prod_{p \le 19}\frac{p}{p-1} = \frac{323323}{55296} < 5.85 \le \frac{89}{50}\cdot\frac{3317}{1000}$。最后 $\ln\ln$ 递增且 $m \le n$，把 $m$ 处的严格不等式搬回 $n$。所有 $\ln\ln$ 下界都是有理数，由二进分解 $t = 2^k y$（$1 \le y < 2$）与 $\operatorname{artanh}$ 级数的部分和得到；$e^{\gamma} > \frac{89}{50}$ 来自 $\gamma$ 的小数下界与指数级数的前几项。

**结论 2。** 若 $n < 223092870$ 却有至少九个不同素因子，取其中九个，它们的积整除 $n$，又不小于前九个素数之积 $223092870$，矛盾；故 $\omega(n) \le 8$，用结论 1。完整证明由 Lean 内核检查。
:::

::: {.example #ex-robin-5040-threshold title="门槛为什么是 5040：除数比与罗宾尺子的对照表"}
**门槛本身。** 接着上文的手算：$\ln 5040 = 8.5251614$，$\ln\ln 5040 = 2.1430220$，$e^{\gamma}\ln\ln 5040 = 3.8168773$，而 $\sigma(5040)/5040 = 3.8380952$，超出 $0.0212180$。所以 $5040$ 违反罗宾不等式，[@thm-robin-at-most-eight-primes] 的前提 $5040 < n$ 一步也不能放松。对 $3 \le n \le 5040$ 逐个计算（数值计算，不是 Lean 定理），恰好有 $26$ 个整数满足 $\sigma(n)/n \ge e^{\gamma}\ln\ln n$：

$$
\begin{aligned}
&3,\ 4,\ 5,\ 6,\ 8,\ 9,\ 10,\ 12,\ 16,\ 18,\ 20,\ 24,\ 30,\ 36, \\
&48,\ 60,\ 72,\ 84,\ 120,\ 180,\ 240,\ 360,\ 720,\ 840,\ 2520,\ 5040 .
\end{aligned}
$$

[@thm-robin-at-most-eight-primes] 的结论 2 说：$5040$ 之后直到 $223092870$，再没有一个。

**对照表。** 各列四舍五入到所示位数，最后一列标出覆盖该整数的结论：

| $n$ | 素因子分解 | $\omega(n)$ | $\sigma(n)/n$ | $e^{\gamma}\ln\ln n$ | 覆盖 |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $5040$ | $2^4\cdot 3^2\cdot 5\cdot 7$ | $4$ | $3.8380952$ | $3.8168773$ | 违反，不在范围内 |
| $5041$ | $71^2$ | $1$ | $1.0142829$ | $3.8169187$ | 结论 1、2 |
| $10080$ | $2^5\cdot 3^2\cdot 5\cdot 7$ | $4$ | $3.9000000$ | $3.9561030$ | 结论 1、2 |
| $55440$ | $2^4\cdot 3^2\cdot 5\cdot 7\cdot 11$ | $5$ | $4.1870130$ | $4.2583230$ | 结论 1、2 |
| $720720$ | $2^4\cdot 3^2\cdot 5\cdot 7\cdot 11\cdot 13$ | $6$ | $4.5090909$ | $4.6339957$ | 结论 1、2 |
| $223092870$ | $2\cdot 3\cdot 5\cdots 23$ | $9$ | $3.7476568$ | $5.2650506$ | 都不覆盖 |
| $3491888400$ | $2^4\cdot 3^3\cdot 5^2\cdot 7\cdot 11\cdot 13\cdot 17\cdot 19$ | $8$ | $5.3262898$ | $5.5032407$ | 结论 1 |

紧挨门槛的 $5041 = 71^2$ 只占一根大素数轴，除数比只有尺子的 $26.6\%$。危险的是从 $2$ 起依次占据开头几根轴、指数逐轴不增的整数：$10080$、$55440$、$720720$ 分别达到尺子的 $98.6\%$、$98.3\%$、$97.3\%$，这正是证明中“把较大的指数对调到较小素数上”的用意。$223092870$ 占了九根轴，却每根只走一步，只到尺子的 $71.2\%$；它满足不等式只是数值事实，两条结论都不覆盖它。$3491888400$ 大于 $223092870$，但只占八根轴，由结论 1 覆盖。

**$10^{12}$ 以上为何只需饱和界。** 八根轴 $2, 3, \dots, 19$ 全部灌满时，$\prod_{p \le 19}\frac{p}{p-1} = 5.8471318$，而 $\ln\ln 10^{12} = 3.3189391$，$e^{\gamma}\ln\ln 10^{12} = 5.9112709$：在 $10^{12}$ 以上，至多占八根轴的整数无论指数多大都碰不到尺子。每多一根轴，饱和值就再乘一个大于 $1$ 的因子 $\frac{p}{p-1}$，这就是证明必须给轴数设上限的原因。
:::

::: {.figure src="ch22-robin-ruler"}
**越过尺子的整数全在 5040 左边。** 横轴是对数刻度的 $n$，墨色曲线是罗宾的尺子 $e^{\gamma}\ln\ln n$；$3 \le n \le 5040$ 中有 $26$ 个品红点在它上方，最后一个是 $5040$。竖虚线右边只剩尺子下方的淡青点云（只画出离尺子 $15\%$ 以内的整数），青色圆圈是 $10080$、$55440$、$720720$，从下方贴着尺子。绿色箭头标出 [@thm-robin-at-most-eight-primes] 覆盖的范围：$5040 < n < 223092870$ 中没有一个越过。点是数值结果；罗宾判据是文献结果（[@rem-robin-criterion-literature]），结合外部已验证的 [@conj-riemann-hypothesis]，该不等式对一切 $n > 5040$ 成立（[@rem-rh-grh-direct-consequences]），但本书所钉仓库仅内核验证了绿色箭头所示片段。
:::

**反方向：离线零点在整数上留下证据。** [@thm-robin-at-most-eight-primes] 检验的是一个片段：至多占八根素数轴的整数。另一侧是一个蕴含式：只要 $\zeta$ 在临界线右侧有一个零点，就一定有一个大于 $5040$ 却违反罗宾不等式的整数，而且它的形状是确定的——$1, 2, \dots, \lfloor t\rfloor$ 的最小公倍数，占据 $t$ 以下的每一根素数轴。

::: {.theorem #thm-off-line-zero-robin-violation title="临界线右侧的零点迫使某个 $\operatorname{lcm}(1, \dots, \lfloor t\rfloor)$ 违反罗宾不等式" lean="D5/S3/Arith/Robin/OffLinePeak/OriginalLocalA.original_zero_robin5040_localA"}
沿用 [@def-divisor-ratio-mertens-error] 的记号。设 $\rho \in \mathbb{C}$ 满足 $\operatorname{IsNontrivialZero}\ \rho$，且 $\operatorname{Re}(\rho) > \frac{1}{2}$、$\operatorname{Im}(\rho) > 0$。令

$$
\begin{aligned}
\delta &= \operatorname{Re}(\rho) - \tfrac{1}{2}, \qquad D = \operatorname{Im}(\rho) + 10, \\
m_0 &= \frac{100\,D^2}{\delta^2}, \qquad m_1 = \frac{500\,D^4}{\delta^2}, \\
B_0 &= \exp\bigl(4\,(28\,m_1 + 20)^2\bigr) .
\end{aligned}
$$

则存在实数 $A$ 满足 $e^{4m_0} \le A \le e^{28m_1}$ 与

$$
\sqrt{A}\,\bigl(4\ln A + 9\bigr) \;<\; U(A),
$$

并且对这个 $A$，存在实数 $t$ 满足 $A \le t \le \exp\bigl(4(\ln A + 20)^2\bigr)$，使得 $N = \operatorname{lcm}(1, 2, \dots, \lfloor t\rfloor)$（Mathlib 的 `Nat.lcmUpto ⌊t⌋₊`）同时满足

$$
5040 < N, \qquad \operatorname{divisorRatio}\ N \;>\; e^{\gamma}\ln\ln N, \qquad N \;\le\; \exp\bigl(B_0\ln B_0\bigr) .
$$
:::

::: proof
证明分两步，与 Lean 模块 `OriginalLocalA` 的两段一致。

**第一步：从零点到峰。** 所钉仓库的冻结结论 [`actual_height_gt_ten`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_height_gt_ten) 说每个非平凡零点都满足 $|\operatorname{Im}\rho| > 10$，故 $D > 20$；又 $0 < \delta < \frac{1}{2}$，于是 $m_0 > 160000$。先由一个谱选择引理挑出尺度 $m \in [m_0, m_1]$，使 $\rho$ 本身的贡献压过其余零点，再用一个以 $y = 16m$ 为中心、宽度与 $\sqrt{m}$ 同阶、以频率 $\operatorname{Im}\rho$ 调制的高斯核去检测零点项 $H(y)$（对全体非平凡零点求和）。零点 $\rho$ 让这个响应至少为 $\frac{1}{2}e^{am}$，其中 $a = \operatorname{Re}(\rho)^2 + 16\operatorname{Re}(\rho) = \frac{33}{4} + 17\delta + \delta^2$。由 $e^x \ge x^2/2$ 与 $m \ge m_0$ 得 $4000\,mD^2 < e^{17\delta m}$。现在用反证法：假设在整个窗口 $[e^{4m_0}, e^{28m_1}]$ 上都有 $U(A) \le \sqrt{A}(4\ln A + 9)$。积分形式的显式公式给出 $H(y) \le U(e^y)$，于是在 $y \in [4m, 28m]$ 上 $H(y) \le (4y + 11)e^{y/2}$，高斯核的质量集中在这一段内（段外部分另有估计），响应因此不超过 $2000\,mD^2e^{33m/4} < \frac{1}{2}e^{am}$，矛盾。指数里多出的 $17\delta + \delta^2$ 就是零点离开临界线的代价：$\delta = 0$ 时上下界的指数相同，矛盾不再出现。

**第二步：从峰到整数。** 由一条冻结的尾部恒等式，对 $A \ge 2$ 有 $U(A) = -A\int_A^{\infty}\frac{\psi(u) - u}{u^2}\,du$：$U(A)$ 大，意味着从 $A$ 往后 $\psi(u)$ 平均落在直线 $u$ 的下方。把 $e^y$ 之后切比雪夫尾部的一个加权平均看作 $y$ 的函数，它乘上一个正权重之后在 $[\ln A,\ 4(\ln A + 20)^2]$ 上的高斯平均几乎为零（绝对值不超过 $1000/(A\ln A)$，小于 $\frac{1}{2\sqrt{A}}$ 乘以权重本身的高斯平均），所以可以在这一段中选出 $y$，使该加权平均大于 $-\frac{1}{2\sqrt{A}}$。于是在 $[A, e^y]$ 上，梅尔滕斯误差 $E_3(t) = \sum_{p \le t}\ln(1 - 1/p) + \ln\ln t + \gamma$ 不可能处处不低于 $-4/\sqrt{t} - (\psi(t) - t)/(t\ln t)$，否则积回去会与峰矛盾（冻结定理 [`finite_mertens_peak_of_signed_endpoint`](lean:D5/S3/Arith/Robin/CompleteMertensPeak.finite_mertens_peak_of_signed_endpoint)）。在 $E_3(t)$ 跌破门槛的点 $t$ 取 $N = \operatorname{lcm}(1, \dots, \lfloor t\rfloor)$：$\ln N = \psi(t)$，$N$ 的除数比是 $t$ 以下每根素数轴上截断欧拉因子之积，与饱和值 $\prod_{p \le t}\frac{p}{p-1}$ 的对数差不超过 $4/\sqrt{t}$；尺子一侧取对数是 $\ln\bigl(e^{\gamma}\ln\ln N\bigr) = \gamma + \ln\ln\psi(t)$，再用切线不等式 $\ln\ln\psi(t) \le \ln\ln t + \frac{\psi(t) - t}{t\ln t}$ 把它与 $\ln\ln t$ 比较（这正是门槛中第二项的来历），$E_3(t)$ 的下跌就变成 $\operatorname{divisorRatio}\ N > e^{\gamma}\ln\ln N$（冻结定理 [`common_robin_response`](lean:D5/S3/Arith/Robin/LcmRobinResponse.common_robin_response)）。最后，由 Mathlib 的切比雪夫上界推出 $\psi(t) \le t\ln t$，故 $N \le e^{t\ln t}$；再由 $t \le \exp(4(\ln A + 20)^2)$ 与 $\ln A \le 28m_1$ 得 $N \le \exp(B_0\ln B_0)$。完整证明由 Lean 内核检查。
:::

[@thm-off-line-zero-robin-violation] 是蕴含式，不断言离线零点存在。它与本节的对称性合起来，可以手工推出：**若对每个 $n > 5040$ 都有 $\sigma(n)/n < e^{\gamma}\ln\ln n$，则 [@conj-riemann-hypothesis] 成立。** 理由（手工推导）：若命题不成立，就有临界带内的零点 $\rho$ 满足 $\operatorname{Re}(\rho) \neq \frac{1}{2}$。在临界带内，$\zeta$ 的零点就是 $\xi$ 的零点（因子 $\frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)$ 在那里不为零），所以由 [@thm-xi-reading-entire-reflection] 之后讲过的四点一组，$\rho,\ \overline{\rho},\ 1 - \rho,\ 1 - \overline{\rho}$ 都是非平凡零点，其中至少一个满足 $\operatorname{Re} > \frac{1}{2}$ 且 $\operatorname{Im} \ge 0$；冻结结论 [`actual_height_gt_ten`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_height_gt_ten) 又排除了 $\operatorname{Im} = 0$。于是 [@thm-off-line-zero-robin-violation] 给出一个违反罗宾不等式的 $N > 5040$。反方向不在本书的冻结范围内（见 [@rem-robin-criterion-literature]）：结合经典罗宾判据与外部已验证的 [@conj-riemann-hypothesis]，罗宾不等式对一切 $n > 5040$ 均已成立（[@rem-rh-grh-direct-consequences]），而本书所钉仓库本身仅内核检验了 [@thm-robin-at-most-eight-primes] 中 $\omega(n) \le 8$ 的片段。

定理中的界是显式的，却大得无法用来搜索。把 [@ex-cayley-unit-circle-zeros] 里的试验点 $0.6 + 14i$ 的坐标代入公式看量级（并不假定那里有零点）：$\delta = 0.1$，$D = 24$，$m_0 = 5760000$，$m_1 = 1.65888\times10^{10}$；峰的位置 $A \ge e^{23040000}$，以十进制写出要一千万位以上；$N$ 的上界 $\exp(B_0\ln B_0)$ 中 $\ln B_0 = 4(28m_1 + 20)^2 \approx 8.62990\times10^{23}$。定理保证违反者存在，却不给出一个可以实际执行的检验。

**尺子从哪里来。** 罗宾尺子 $e^{\gamma}\ln\ln n$ 的形状与常数，在所钉仓库中也有冻结的依据。格朗沃尔定理（T. H. Gronwall, 1913）的两条包络冻结为 [`gronwall_envelopes`](lean:D5/S3/Weil/GronwallLowerEnvelope.gronwall_envelopes)：对每个实数 $\varepsilon > 0$，

1. 存在 $N$，使一切自然数 $n \ge N$ 都满足 $\dfrac{\sigma(n)}{e^{\gamma}\,n\ln\ln n} \le 1 + \varepsilon$；
2. 对每个 $N$，都有自然数 $n \ge N$ 满足 $\dfrac{\sigma(n)}{e^{\gamma}\,n\ln\ln n} \ge 1 - \varepsilon$。

由此手工推出：把尺子的常数 $e^{\gamma}$ 换成任何更小的正数 $c$，第 2 条（取 $\varepsilon$ 使 $(1 - \varepsilon)e^{\gamma} > c$）就给出任意大的违反者；换成任何更大的 $c$，第 1 条就说不等式从某处起总成立。罗宾不等式问的恰是不留 $\varepsilon$ 余地的常数 $e^{\gamma}$ 本身，而且要求从 $5040$ 之后就成立。在 Lean 中，上包络的证明以一个截断把 $n$ 的素因子分成大小两组，小素数一侧补齐成截断以下的全部素数轴，再用同样已冻结的梅尔滕斯第三定理 [`E₃.bound''`](lean:D5/S3/Weil/Mertens/Third.E₃.bound'') 估计：当实数 $x \to \infty$ 时 $\prod_{p \le x}(1 - 1/p) \sim e^{-\gamma}/\ln x$；取倒数（手工推导），灌满 $x$ 以下全部素数轴的饱和值 $\prod_{p \le x}(1 - 1/p)^{-1}$ 渐近于 $e^{\gamma}\ln x$。下包络则取素数阶乘的幂作为见证。

::: {.remark #rem-robin-criterion-literature title="罗宾判据（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** **罗宾判据**（G. Robin, 1984）：黎曼猜想成立，当且仅当对一切 $n > 5040$ 有 $\sigma(n)/n < e^{\gamma}\ln\ln n$。其中“不等式蕴含黎曼猜想”的方向，在本书中可由 [@thm-off-line-zero-robin-violation] 与本节的对称性手工推出（见上文）；“黎曼猜想蕴含不等式”的方向没有以这一形式冻结在所钉仓库中，但结合外部已验证的 [@conj-riemann-hypothesis]，它立即给出全体 $n > 5040$ 上的无条件罗宾不等式（见 [@rem-rh-grh-direct-consequences]）。
:::

正如 [@thm-full-symmetry-not-localization] 所示，直觉的对称优美绝不能替代证明的严酷；任何真正封死临界带零点的证明都必须动用对称性之外的深层算术结构。2026 年 11 月 20 日，经典黎曼猜想与全部狄利克雷 $L$-函数的广义黎曼猜想由外部独立 Lean 4 形式化工程确立并经多重独立内核重放验证。遵循本书认识论契约——既不把已有独立内核验证的数学事实继续标记为 `OPEN`，也不把尚未冻结入本书所钉 `trureturing` 仓库的外部声明伪装成 `LEAN ✓`——我们将该已知事实登记为下方的正式注记（保留原有交叉引用锚点 `#conj-riemann-hypothesis` 且不附加 `lean` 属性），并在其后系统推导其直接数学推论与仍然开放的邻近前沿。

::: {.remark #conj-riemann-hypothesis title="黎曼猜想与狄利克雷广义黎曼猜想（已知外部形式化事实，未冻结于本书所钉仓库）"}
**已知外部形式化事实（未冻结于本书所钉 `trureturing` 提交）。** 经解析延拓后的黎曼 $\zeta$ 函数 $\zeta(s)$ 的每一个非平凡零点（即位于临界带 $0 < \operatorname{Re}(s) < 1$ 内的零点 $\rho \in \mathbb{C}$）均位于临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 上：

$$
\forall \rho \in \mathbb{C},\qquad \bigl(0 < \operatorname{Re}(\rho) < 1 \;\land\; \zeta(\rho) = 0\bigr) \;\Longrightarrow\; \operatorname{Re}(\rho) = \frac{1}{2}.
$$

同一外部形式化归档同步确立了全部模 $q \ge 1$ 狄利克雷特征 $\chi$ 的**狄利克雷广义黎曼猜想（Dirichlet GRH）**：对任一狄利克雷特征 $\chi \pmod q$ 及满足 $0 < \operatorname{Re}(\rho) < 1$ 的零点 $L(\rho, \chi) = 0$（对本原特征则等价于 $\operatorname{Re}(\rho) > 0$ 的全部零点），恒有 $\operatorname{Re}(\rho) = \frac{1}{2}$。

经典黎曼猜想与狄利克雷广义黎曼猜想的 Lean 形式化主仓库由 Lean 社群维护。[leanprover-community/riemann-hypothesis](https://github.com/leanprover-community/riemann-hypothesis)

**外部证明来源、组织仓库与全球多方独立重放凭据。** 该证明由 Levent Alpöge 于 2026 年 11 月 20 日发布（技术说明见 [`alpo.ge/remark.pdf`](https://alpo.ge/remark.pdf)，按紧致定正幺正群上的 $\theta$-提升链、Rallis 跷跷板内积对偶、Gan–Gross–Prasad 周期与 Bost 斜率正定不等式将有限域曲线的 Stepanov 重数法移植至 $\mathbb{Z}$ 情形），共 175,187 个 Lean 4（`v4.33.1` + 固定 `Mathlib`）模块；2026 年 11 月 21 日 Lean 与 Mathlib 联合声明核验并确认了经典 RH 规约 `Mathlib.RiemannHypothesis`（[联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)）。本组织仓库 [`the-omega-institute/riemann-hypothesis`](https://github.com/the-omega-institute/riemann-hypothesis/tree/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6) 维护其可复现分片构建与公开重放清单（[`Statements.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Statements.lean) 定义所用命题，[`Main.lean`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Main.lean#L4-L12) 导出五条顶层定理：`riemannHypothesis : RiemannHypothesis`、`riemannZeta_eq_zero_re : RiemannZetaZerosOnLine`、`LFunction_ne_zero_of_half_lt_re : DirichletLNonvanishingRightOfHalf`、`LFunction_eq_zero_re : DirichletLZerosOnLine` 与 `LFunction_eq_zero_re_of_isPrimitive : PrimitiveDirichletLZerosOnLine`；配套导读专著 *Symmetry on the Critical Line: How the Riemann Hypothesis Is Proved* 见 [英文线上版](https://rh.trureturing.org/riemann-hypothesis/en/) 与 [源码仓库](https://github.com/the-omega-institute/riemann-hypothesis-book)）。固定源码静态扫描（[`static-scan.txt`](https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/verification/static-scan.txt)）确认不含 `sorry`、`admit`、`opaque`、`native_decide` 或自定义 `axiom`，五条终端定理的公理审计（[公理审计](https://math.mit.edu/~drew/grh/audit.log)）确认仅依赖 Lean 标准三大公理 `{propext, Classical.choice, Quot.sound}`。全球多方独立重放凭据汇总如下：Andrew Sutherland（MIT）使用 `leanchecker` 与 `lean4lean` 零拒收重放全部 `175,187` 个模块，独立 Rust 内核 `nanoda` 与 `con-leche --verified` 接受完整导出产物，另行运行的 `con-leche` 对照纯 Mathlib 挑战确认全部五条定理成立（[`math.mit.edu/~drew/grh/`](https://math.mit.edu/~drew/grh/) · [公理审计](https://math.mit.edu/~drew/grh/audit.log) · [con-leche 比对](https://math.mit.edu/~drew/grh/con-leche-compare.log)）；`mrubinst/grh-lean-verification` 通过 Lean 4.33.1 `replayFromImports` 逐模块复核全部 `175,187` 个模块（[重放摘要](https://github.com/mrubinst/grh-lean-verification/blob/cd2dad86c884ab17f348189edae2e5c3248533a9/replay_summary.txt)）；Elliot Arledge 与 Luis Rivera 两套独立构建的五定理导出归档具有逐字节一致的 SHA-256（`4301ce4828d397c728e87f3e6a1251aa42abe5e12809bb9e0b73cc3d33072e7e`），各自 `nanoda` 零错误检验全部 `1,484,729` 条声明且 Rivera 同步完成纯 Mathlib 挑战 `con-leche` 比对（[Arledge 回执](https://github.com/Infatoshi/rh-verification-receipts/blob/ac99f18cef21952de094234fab95db342ed16638/VERIFICATION_RESULT.txt) · [Rivera 校验和](https://github.com/chubakueno/riemann-lean-verification/blob/975074872445beee5af4ea2d8e296b4b59f1d592/evidence/export/main.ndjson.sha256) · [Rivera nanoda](https://github.com/chubakueno/riemann-lean-verification/blob/975074872445beee5af4ea2d8e296b4b59f1d592/evidence/nanoda/nanoda-out.txt) · [Rivera con-leche](https://github.com/chubakueno/riemann-lean-verification/blob/975074872445beee5af4ea2d8e296b4b59f1d592/evidence/con-leche-compare/compare-out-windows.txt)）；LUMI 超算团队完成全部 `175,187` 个模块的全沙盒构建且最终零失败（含 718 次重试），产出 `Main.olean` 的 SHA-256（`9146dfb4148e24d2252e04c50742f3e49dd126dfcc5006d10bf5f873ddf796ad`）与 MIT 一致（[LUMI 记录](https://github.com/aapolipponen/rh-lean-check-lumi/blob/82d91dbbd04d71f2cb45c3f2898f421b91c1c9d7/results/build-summary.json)）。截至 2026 年 11 月 21 日 12:55 UTC，MIT 状态页仍将端到端 `lake comparator` 以及导出物的默认与 paranoid Lean 内核重放列为进行中；因该 175,187 模块工程未冻结入本书所钉 `trureturing` 仓库，本条目依规不附加 `lean` 属性，不计入本书绿标 `LEAN ✓` 统计。
:::

::: {.remark #rem-rh-grh-direct-consequences title="黎曼猜想与狄利克雷广义黎曼猜想确立后的直接数学推论（手工推导与经典文献结果，未在本书形式化）"}
**手工推导与经典解析数论文献结果（未在本书形式化），以 [@conj-riemann-hypothesis] 为前提。** 经典黎曼猜想与狄利克雷 GRH 一经确立，数论与算法中以下五组严格蕴含即无条件成立；同时须划清尚未被其覆盖的开放边界：

1. **凯莱单位圆零亏量与窄弧聚拢（冻结等价 $+$ [@conj-riemann-hypothesis]）**：由本章已冻结的 [@thm-cayley-critical-line-criterion] 结论 2 与 [@thm-right-half-strip-rh-forms] 结论 2，全体非平凡零点 $\rho$ 满足 $\operatorname{logarithmicRadialDefect}\ \rho = 0$，其凯莱像 $w_\rho = (\rho - 1)/\rho$ 全部落在单位圆 $\lvert w\rvert = 1$ 上；结合已知首颗正虚部零点 $t_1 \approx 14.134725$（[@ex-cayley-unit-circle-zeros]），上半平面全体非平凡零点的像全部压缩在辐角 $0 < \arg w \le 2\arctan\frac{1}{2t_1} \approx 4.0519^\circ$ 的极窄圆弧内并唯一聚向 $w = 1$。
2. **初等除数和不等式终结（Robin 1984；Lagarias 2002）**：由经典罗宾判据（[@rem-robin-criterion-literature]）与 J. C. Lagarias（*Amer. Math. Monthly* **109**, 534–543, 2002）的等价定理，以下两条初等算术不等式对全体目标整数无条件成立：
   $$
   \forall n > 5040,\quad \frac{\sigma(n)}{n} < e^{\gamma}\ln\ln n; \qquad\qquad \forall n \ge 1,\quad \sigma(n) \le H_n + e^{H_n}\ln H_n \quad \left(H_n := \sum_{k=1}^n \frac{1}{k}\right).
   $$
3. **素数定理显式平方根误差、素数间隙与梅尔滕斯渐近界（Schoenfeld 1976；Cramér 1936；Littlewood 1912）**：由 L. Schoenfeld（*Math. Comp.* **30**, 337–360, 1976，定理 10 与推论 1），切比雪夫函数与素数计数函数分别锁定在显式平方根包络内：
   $$
   \lvert\psi(x) - x\rvert < \frac{1}{8\pi}\sqrt{x}\,\ln^2 x \quad (x \ge 73.2), \qquad \lvert\pi(x) - \operatorname{li}(x)\rvert < \frac{1}{8\pi}\sqrt{x}\,\ln x \quad (x \ge 2657).
   $$
   对照高精度数值（`NUM`）：$x = 10^4$ 时 $\pi(10^4) = 1229$、$\lvert\pi(10^4) - \operatorname{li}(10^4)\rvert \approx 17.1372 < \frac{1}{8\pi}\sqrt{10^4}\ln 10^4 \approx 36.6468$；$x = 10^6$ 时 $\pi(10^6) = 78498$、$\lvert\pi(10^6) - \operatorname{li}(10^6)\rvert \approx 129.5492 < \frac{1}{8\pi}\sqrt{10^6}\ln 10^6 \approx 549.7017$。相邻素数间隙满足 Cramér 条件界 $p_{n+1} - p_n = O(\sqrt{p_n}\ln p_n)$（H. Cramér, 1936）。莫比乌斯和函数 $M(x) = \sum_{n \le x}\mu(n)$ 满足 Littlewood 渐近界 $M(x) = O_\varepsilon(x^{1/2 + \varepsilon})$（$\forall \varepsilon > 0$）——务必注意：**更强的无 $\varepsilon$ 界 $M(x) = O(\sqrt{x})$ 并不由黎曼猜想推出，目前依然未知**（参见下文 §22.4.1）。
4. **狄利克雷 GRH 的算术级数均分与确定性多项式算法（Davenport；Lamzouri–Li–Soundararajan 2015；Bach 1990）**：由 `DirichletLZerosOnLine`，对任一模 $q \ge 1$ 及 $\gcd(a, q) = 1$，算术级数中的素数计数满足单模平方根误差界 $\pi(x; q, a) = \frac{\operatorname{li}(x)}{\varphi(q)} + O(\sqrt{x}\ln(qx))$（H. Davenport, *Multiplicative Number Theory*, Ch. 20），且对一切 $q > 3$（即 $q \ge 4$），同余类 $a \pmod q$ 中的最小素数满足显式林尼克上界 $p_{\min}(q, a) \le (\varphi(q)\ln q)^2$（Y. Lamzouri, X. Li, K. Soundararajan, *Math. Comp.* **84**, 2391–2412, 2015，推论 1.2）。由 E. Bach（*Math. Comp.* **55**, 355–380, 1990，定理 2），模奇素数 $p$ 的最小二次非剩余严格满足 $n_p < 2(\ln p)^2$，且 Miller–Rabin 素性测试只需确定性检验全部基底 $a < 2(\ln n)^2$ 即可在 $\tilde{O}((\ln n)^4)$ 比特运算内作出 $100\%$ 无随机性的精确素性裁决（例如对 $2048$ 比特整数，$2(\ln 2^{2048})^2 \approx 4{,}030{,}331.996$，即只需遍历不超过 $4{,}030{,}331$ 个基底）。必须澄清：**确定性快速素性判定与大整数因式分解是本质不对称的两个计算问题**；RH 与狄利克雷 GRH 并不给出大合数 $N = pq$ 的多项式时间分解算法，RSA 公钥体制的困难性假设不受动摇。
5. **仍保持开放的邻近前沿（`OPEN`）**：上述外部形式化工程锁定的范围是 $\zeta(s)$ 与 $\mathbb{Q}$ 上的狄利克雷 $L$-函数；以下密切相关的数学问题**并不由 [@conj-riemann-hypothesis] 推出，依然保持开放（`OPEN`）**：一般数域戴德金 $\zeta$ 函数的**扩展黎曼猜想（ERH）**（从而 Hooley 关于阿廷原根猜想的条件定理与 Weinberger 关于主理想整环必为欧几里得整环的条件分类亦尚未无条件化）、一般自守 $L$-函数的**大黎曼猜想（Grand RH）**、$\zeta(s)$ 与 $L(s,\chi)$ 零点的**单零点猜想（Simple Zeros）**、蒙哥马利对关联与随机矩阵 GUE 统计猜想，以及给出真实自伴算符的希尔伯特—波利亚谱实现问题。谱核正定、托普利茨超指数坍缩、本原复特征埃尔米特—比勒核与模散射带等进一步推导见[第三十一章 §31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#sec-ch34-arc-calculus-riemann-and-hermite-biehler)。
:::

::: {.remark #rem-euler-zeta-literature title="Re(s) > 1 形式化恒等式、解析延拓与外部形式化证明的边界审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 为严守认识论诚实标准，读者在阅读本章时须明确区分以下三个层次：

1. **已由本书所钉 Lean 内核验证的冻结定理（第一层 `LEAN ✓`）**：本章的十九条正式结论——$s = 1$ 处的单位留数极限（[@lem-riemann-zeta-residue-one]）、半平面 $\operatorname{Re}(s) > 1$ 上的狄利克雷级数恒等式（[@prop-riemann-zeta-dirichlet-sum]）、半平面 $\operatorname{Re}(s) > 1$ 上的欧拉素数乘积恒等式（[@thm-riemann-zeta-euler-product]）两者的直接相等（[@cor-dirichlet-sum-eq-euler-product]）与加法型欧拉乘积的系数等于彩色分拆数（[@thm-coloured-partition-euler-product]），素数对数在整数与有理数上的线性无关（[@thm-prime-log-independence]）、自然数对数的无理性（[@lem-log-natural-irrational]）、有限维环面幂轨道的闭包与克罗内克稠密性（[@thm-torus-power-orbit-closure]），$\xi$ 读数的整函数性、反射对称 $\xi(1 - s) = \xi(s)$ 与端点值（[@thm-xi-reading-entire-reflection]）、$\zeta$ 与 $\xi$ 的共轭协变（[@prop-zeta-conjugation-covariance]）、凯莱单位圆判据与黎曼猜想的径向等价形式（[@thm-cayley-critical-line-criterion]）、交错部分和收敛到 $(1 - 2^{1-s})\,\zeta(s)$（[@lem-alternating-zeta-partial-sums]）、$\zeta$ 在实轴上的符号与实零点（[@prop-zeta-real-axis-sign]）、$\xi$ 读数的零点恰是临界带内的 $\zeta$ 零点以及完备 $\zeta$ 在 $\operatorname{Re}(s) \ge 1$ 上不为零（[@prop-xi-zeros-strip-zeros]）、切比雪夫函数形式的素数定理及其误差项（[@thm-medium-pnt]）、右半带归约与 Mathlib 表述和临界带表述的等价（[@thm-right-half-strip-rh-forms]）、完全对称性不蕴含定线局域化的四次反例（[@thm-full-symmetry-not-localization]）、至多八根素数轴上以及 $5040 < n < 223092870$ 范围内的罗宾不等式（[@thm-robin-at-most-eight-primes]），以及临界线右侧的零点迫使某个 $\operatorname{lcm}(1, \dots, \lfloor t\rfloor)$ 违反罗宾不等式（[@thm-off-line-zero-robin-violation]）——严格成立。注意欧拉乘积仅在 Lean 假设显式给出的绝对收敛半平面 `1 < s.re`（$\operatorname{Re}(s) > 1$）内被调用与核验。
2. **经典解析数论文献定理（第二层，已有严格纸面证明但未在本书形式化）**：
   - **黎曼解析延拓与平凡零点（Riemann, 1859）**：负偶数 $s = -2, -4, -6, \dots$ 为平凡零点（[@rem-zeta-zero-free-region-literature]）。（$\zeta(s)$ 在 $\mathbb{C} \setminus \{1\}$ 上的解析性已不在这一层：所钉仓库冻结了 [`classical_zeta_unique_simple_pole_residue_one`](lean:D5/S3/Zeros/ZetaUpgrade.classical_zeta_unique_simple_pole_residue_one)。）（“临界带 $0 < \operatorname{Re}(s) < 1$ 之外没有其他零点”已不在这一层：它由 [@thm-right-half-strip-rh-forms] 的结论 3 与 [@prop-xi-zeros-strip-zeros] 之后的一行手工推导给出，实轴上的情形见 [@prop-zeta-real-axis-sign]。）（完备化函数 $\xi$ 的整函数性、反射对称 $\xi(s) = \xi(1 - s)$ 与共轭对称 $\xi(\overline{s}) = \overline{\xi(s)}$ 已不在这一层：它们由 [@thm-xi-reading-entire-reflection] 与 [@prop-zeta-conjugation-covariance] 借助 Mathlib 的完备 $\zeta$ 给出。）
   - **素数定理的 $\pi(x)$ 形式（Hadamard, de la Vallée Poussin, 1896）**：$\zeta(1 + it) \neq 0$（$t \neq 0$；$t = 0$ 即 $s = 1$ 处为一阶极点）已不在这一层，它由 [@prop-xi-zeros-strip-zeros] 经一行手工推导得到；切比雪夫函数形式的素数定理连同误差项也已不在这一层，见 [@thm-medium-pnt]。仍在这一层的是由 $\psi(x) \sim x$ 经分部求和得到 $\pi(x) \sim \frac{x}{\ln x}$ 的一步，以及 de la Vallée Poussin 的误差项 $O\bigl(x e^{-c\sqrt{\ln x}}\bigr)$；
   - **显式公式（von Mangoldt, Weil）**：将素数幂对数权重 $\Lambda(n)$ 的求和与 $\zeta(s)$ 非平凡零点 $\rho$ 的频谱求和通过对偶傅里叶变换联系起来。（它的一种积分形式已不在这一层：所钉仓库冻结了 [`actual_integrated_explicit_formula`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula)，即对每个实数 $y > 0$，按重数遍历全体非平凡零点的和 $\sum_{\rho} e^{\rho y}/(\rho(1 - \rho))$ 等于 $U(e^y) - \ln(2\pi) + \sum_{n \ge 1} e^{-2ny}/(2n(2n + 1))$，其中 $U$ 见 [@def-divisor-ratio-mertens-error]；[@thm-off-line-zero-robin-violation] 的证明用到它。）
3. **已知外部形式化事实与仍开放的邻近前沿（区别于本书所钉仓库与 `OPEN`）**：[@conj-riemann-hypothesis]（经典黎曼猜想与狄利克雷 GRH）已由外部 Lean 4 形式化工程确立并经 `nanoda` 与 `con-leche` 独立核验，其直接数论与算法推论汇编于 [@rem-rh-grh-direct-consequences]。与此同时，本章所钉的十九条冻结定理自身**并不证明黎曼猜想**：反射对称只说明零点关于 $s = \frac{1}{2}$ 成对出现，不说明它们落在临界线上；[@thm-cayley-critical-line-criterion] 只是把命题等价地改写到单位圆上；[@thm-right-half-strip-rh-forms] 只是把命题归约到右半带，并说明 Mathlib 的表述与临界带表述等价；[@thm-full-symmetry-not-localization] 则表明仅凭反射与共轭两种对称性不可能推出它；[@thm-off-line-zero-robin-violation] 只把一个离线零点变成罗宾不等式的反例，并不自行排除离线零点。另一方面，一般数域的扩展黎曼猜想（ERH）、自守 $L$-函数的大黎曼猜想（Grand RH）、单零点猜想、GUE 对关联以及 $M(x) = O(\sqrt{x})$ 等命题仍保持为**开放问题（`OPEN`）**。
:::

在全书第八部，我们将在观察者往返双投影与极小圆弧体内割弦隧穿的几何底座上重返这片临界带（`MODEL` + `LEAN ✓` + `OPEN`）：[第三十一章 §31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs) 将欧拉—狄利克雷恒等式置于素数极小圆弧体 $\Delta\mathcal{T}_p$ 路径积分模型下，结合往返半密度双壳平衡与韦伊显式对偶重构素数幂阶梯；[§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 则进一步引入自卷积乘性波前、分块舒尔补算术枢轴 $\widetilde{G}_{PP}^{(\ell)}$ 与跨 $s = 1$ 极点势垒的多级凯莱共振中继，并将跨枢轴子树移位卷积纠缠的面积律衰减定格为开放问题（[@prob-ch34-arithmetic-pivot-area-law]）。

从[第二十一章](ch21-diagonalization-and-escape.md)的概念余纤维到本章的素数正交基，我们看到了整数 $\mathbb{Z}$ 与素数在离散乘法世界里的精密刚性。可是，如果把整数 $\mathbb{Z}$ 放进看似稠密平滑、任意两点间都能无限平分的有理数大海 $\mathbb{Q}$ 里，我们还能单凭有理数的加法和乘法方程，把离散的整数骨架 $\mathbb{Z} \subset \mathbb{Q}$ 重新打捞并锁定出来吗？为什么这项困扰数学界数十年的可定义性难题，偏偏要靠我们在第 21 章末尾刚刚遇见的**四元数球面范数**与二次型迹投影来上锁？让我们翻开[第二十三章](ch23-diophantine-definability.md)。

## 22.4.1 从相量到素数幂阶梯：截断与延拓不能互换 {#sec-ch22-4-1}

本章前半部分建立了素数对数在整数与有理数上的线性无关（[@thm-prime-log-independence]），本节又借助完备读数的整函数性与泛函反射（[@thm-xi-reading-entire-reflection]）刻画了临界带零点的镜像配对。当读者把“素数频率相量”与“零点谱振荡”放在同一幅图景里审视时，第一道必须守住的分析边界是**收敛域并严格区分各自收敛到的极限量**：在绝对收敛半平面 $\operatorname{Re}(s) > 1$ 上，狄利克雷级数与欧拉乘积绝对收敛且相等，二者共同等于非零的 $\zeta(s)$：

$$
\zeta(s) \;=\; \sum_{n=1}^{\infty} n^{-s} \;=\; \prod_{p}\bigl(1 - p^{-s}\bigr)^{-1}, \qquad \operatorname{Re}(s) > 1;
$$

而莫比乌斯狄利克雷级数并非等于 $\zeta(s)$，而是绝对收敛到**倒数极限 $1/\zeta(s)$**：

$$
\frac{1}{\zeta(s)} \;=\; \sum_{n=1}^{\infty} \mu(n)\,n^{-s}, \qquad \operatorname{Re}(s) > 1,
$$

其中 $\mu(n)$ 为数论**莫比乌斯函数**（$\mu(1) = 1$；$n$ 为 $k$ 个互异素数之积时取 $(-1)^k$；含平方素因子 $p^2 \mid n$ 时取 $0$，切勿与量子干涉中的路径标记重叠度记号混淆）。即便在 $\operatorname{Re}(s) > 1$ 内，取有限上限 $N$ 截断时，部分和 $S_N(s) = \sum_{n=1}^N n^{-s}$ 与有限欧拉乘积逼近的是 $\zeta(s)$，有限莫比乌斯和 $\sum_{n=1}^N \mu(n)n^{-s}$ 逼近的则是 $1/\zeta(s)$：有限 $N$ 下这三者（乃至有限莫比乌斯和的倒数）并无恒等式保证相等，数值通常彼此不同（不排除特定截断或参数下的偶然重合），收拢快慢随虚部 $t = \operatorname{Im}(s)$ 显著变化，绝不能声称有限截断已达到无穷收敛极限。在直观语言里，常把欧拉乘积比作“素数路径配分函数”，把 $\mu(n)n^{-s}$ 比作每根素数轴至多取一次的“莫比乌斯外积”；但二者均属启发式**诠释**。在严格代数上，$\zeta(s)\cdot\bigl(\sum_{n\ge 1}\mu(n)n^{-s}\bigr) = 1$ 是算术函数交换环上的**狄利克雷卷积反演**（$\sum_{d \mid n}\mu(d) = [n = 1]$），**并非真正外代数上的反对称楔积**——整数乘法完全交换，平方项 $p^2$ 靠算术系数 $\mu(p^2) = 0$ 筛除，而非由反对易生成元自行湮灭。

::: {.viz src="zeta-spectrum-lab" preset="domain" height="500"}
**$\sigma = 1.6$ 处的三维有限部分和与有限欧拉积折线（`domain`）。** 三维舞台沿紫色坐标轴同时绘制 $(\log n, \operatorname{Re} S_n, \operatorname{Im} S_n)$ 的青色有限部分和折线与品红色有限欧拉积折线及两者在远端复平面上的各自投影，琥珀色圆点标示当前项 $n$。画面仅执行未作解析延拓的有限项计算，折线盘旋形态随参数变化，且不提供通往无穷极限的余项证书。
:::

一旦越过 $s = 1$ 极点进入临界带 $0 < \operatorname{Re}(s) < 1$，**“有限项截断”与“解析延拓”便绝不能互换**。在临界线 $\sigma = 0.5$ 上，有限部分和 $S_N(s) = \sum_{n=1}^{N} n^{-s}$ 只是一段有限指数多项和，绝非延拓后的 $\zeta(s)$ 本身：由于通项模长 $n^{-1/2}$ 不绝对可和，$S_N(\frac{1}{2} + it)$ 在空间中持续回绕；有限和偶然穿过零轴的“假零点”随上限 $N$ 移动，**不可直接称为 $\zeta(s)$ 的零点**，而对自然数硬切一刀的上限 $n \le N$ 既**不是图搜索中的 Dijkstra 最短路算法**，也**不是连续观测下的物理芝诺效应**。同样需要甄别的是梅尔滕斯函数 $M(x) := \sum_{1 \le n \le x}\mu(n)$：把 $\mu(n)$ 类比为独立随机游走虽会引出 $O(\sqrt{x})$ 的粗糙联想，但 **$M(x) = O(\sqrt{x})$ 并非已知定理，也绝不能声称它可由黎曼猜想推出**；真正与 [@conj-riemann-hypothesis] 等价——从而如今随 [@conj-riemann-hypothesis] 一并无条件成立（[@rem-rh-grh-direct-consequences]）——的是带任意正指数余量的渐近界：

$$
\forall \varepsilon > 0,\qquad M(x) \;=\; O_\varepsilon\!\bigl(x^{1/2 + \varepsilon}\bigr) \quad (x \to +\infty).
$$

此外，正如上文 `critical-mirror` 实验的四次离轴反例（[@thm-full-symmetry-not-localization]、[@ex-quartic-mock-quartet]）所示，[@thm-xi-reading-entire-reflection] 给出的等幅对称 $|\xi(s)| = |\xi(1-s)|$ **只能使非实零点结成对称四元组 $\{\rho,\ \overline{\rho},\ 1 - \rho,\ 1 - \overline{\rho}\}$**，绝不会单凭对称性把零点逼到临界线上。

::: {.viz src="zeta-spectrum-lab" preset="partial" height="500"}
**$\sigma = 0.5$ 处的三维有限部分和折线（`partial`）。** 三维舞台沿紫色坐标轴绘制 $(\log n, \operatorname{Re} S_n, \operatorname{Im} S_n)$ 的青色有限部分和折线并隐藏欧拉积，琥珀色圆点标示当前项 $n$。画面仅呈现当前参数下未作解析延拓的有限项计算轨迹，不提供通往无穷极限的余项证书。
:::

真正把临界带零点谱与离散算术阶梯精确连接起来的经典桥梁，是 $x > 1$ 上的完整冯·曼戈尔特（von Mangoldt）显式公式（以下 $\log$ 均表自然对数）：

$$
\psi_0(x) \;=\; x \;-\; \lim_{T \to \infty} \sum_{|\operatorname{Im}\rho| \le T} \frac{x^\rho}{\rho} \;-\; \log(2\pi) \;-\; \frac{1}{2}\log\bigl(1 - x^{-2}\bigr), \qquad x > 1.
$$

使用该完整公式须严守五项精确约定：第一，求和遍历临界带 $0 < \operatorname{Re}(\rho) < 1$ 内的**全体非平凡零点 $\rho$**，并**按零点重数计入**；第二，级数仅条件收敛，外层极限必须按**对称高度截断 $|\operatorname{Im}\rho| \le T$（$T \to \infty$）** 取（围道积分推导中沿适当避开零点纵坐标的对称高度序列取极限）；第三，在素数幂跳跃点处必须取**端点两侧均值** $\psi_0(x) := \frac{1}{2}\bigl(\psi(x^+) + \psi(x^-)\bigr)$；第四，$-\log(2\pi)$ 与 $-\frac{1}{2}\log(1 - x^{-2})$ 分别精确归集原点常数项与负偶数平凡零点贡献；第五，$\psi(x) = \sum_{n \le x}\Lambda(n)$ **计入所有素数幂 $p^k$（包括 $4, 8, 9$ 等合数素数幂），而非只计素数**。虽然经典解析数论对截断及平滑显式公式已有现成的解析余项上界，但本页交互实验的真实谱模式**仅展示前 $10$ 对正虚部临界线零点共轭对，且本实验尚无配套可计算误差证书**，绝不能将此类短零点采样当作数学证明。

::: {.example #ex-ch22-psi0-prime-powers-and-sampling title="x ≤ 10 上的素数幂跳跃（含 4, 8, 9）手算与前 10 对零点采样边界"}
在 $1 < x \le 10$ 上，莫比乌斯前十项 $\mu(1),\dots,\mu(10)$ 依次为 $1, -1, -1, 0, -1, 1, -1, 0, 0, 1$（平方素因子倍数 $4, 8, 9$ 处为 $0$），累加得 $M(10) = -1$。而在阶梯 $\psi(x)$ 上，恰在 $4 = 2^2$、$8 = 2^3$ 与 $9 = 3^2$ 三个合数素数幂处发生幅度为 $\log 2$、$\log 2$ 与 $\log 3$ 的真实跃升：在跳跃点 $x = 8$ 处，$\psi(8^-) = 2\log 2 + \log 3 + \log 5 + \log 7 = \log 420$，$\psi(8^+) = \log 840$，端点两侧均值给出精确值

$$
\psi_0(8) \;=\; \frac{5}{2}\log 2 + \log 3 + \log 5 + \log 7 \;=\; \log\bigl(420\sqrt{2}\bigr),
$$

由中点 $\psi_0(8)$ 向右先补足 $x = 8$ 处余下的半跳 $\frac{1}{2}\log 2$（至 $\psi(8^+)$），跨过 $x = 9 = 3^2$ 后再完整跳升 $\log 3$ 抵达 $\psi_0(9.5) = 3\log 2 + 2\log 3 + \log 5 + \log 7 = \log 2520$；显式公式右端在 $x = 8$ 处的光滑修正项则为 $8 - \log(2\pi) - \frac{1}{2}\log(1 - 8^{-2}) = 8 - \log(2\pi) + \frac{1}{2}\log\frac{64}{63}$。反观本页真实零点样本，它**仅展示前 $10$ 对正虚部零点共轭对**，既未附带针对 $|\operatorname{Im}\rho| > T$ 高频零点尾项的误差证书，也不能把任何短截断采样本身当作全谱完备性或 [@conj-riemann-hypothesis] 的证明；合成四元组（`quartet`）则是人工构造的离线对称对照模型。
:::

::: {.viz src="zeta-spectrum-lab" preset="powers" height="500"}
**素数幂阶梯 $\psi_0(x)$ 与有限零点谱的三维曲线对照（`powers`）。** 三维舞台沿紫色坐标轴同时绘出计入素数幂跃升的青色精确阶梯曲线 $\psi_0(x)$ 与前 $10$ 对正虚部零点共轭对重构的品红色有限谱曲线。琥珀色标记指示当前选定 $x$ 位置，两条三维曲线的偏差直观显示短零点样本存在截断振荡且不含误差证书。
:::

::: {.remark #rem-ch22-dlmf-zeta-explicit-literature title="狄利克雷级数、莫比乌斯反演与显式公式文献索引"}
**形式化边界与文献分工。** 本书前文带有冻结 Lean 引用的相应定理各自负责其已验证范围（包括 $\operatorname{Re}(s) > 1$ 上 $\zeta(s)$ 的狄利克雷级数与欧拉乘积恒等式、$\xi(s)$ 的整性与反射关系及部分零点结论），而本段额外引用的莫比乌斯倒数与反演、梅尔滕斯等价定理及完整点态显式公式均按经典文献结果使用，既未在本书形式化，也不声称由本页有限计算验证。相关标准定义与定理须分源核查：$\zeta(s)$ 在 $\operatorname{Re}(s) > 1$ 上的狄利克雷级数、欧拉乘积与解析延拓见 [DLMF §25.2](https://dlmf.nist.gov/25.2)；莫比乌斯倒数级数 $1/\zeta(s) = \sum_{n=1}^{\infty}\mu(n)n^{-s}$ 见 [DLMF 27.4.E5](https://dlmf.nist.gov/27.4.E5)，狄利克雷卷积与莫比乌斯反演见 [DLMF §27.5](https://dlmf.nist.gov/27.5)；临界带非平凡零点性质见 [DLMF §25.10](https://dlmf.nist.gov/25.10)；切比雪夫函数 $\psi(x)$ 的定义与素数定理主项渐近式见 [DLMF §25.16](https://dlmf.nist.gov/25.16)（如 [DLMF 25.16.E2](https://dlmf.nist.gov/25.16.E2)），但该页仅给 $\psi(x)$ 的定义与渐近式，并不包含莫比乌斯倒数、梅尔滕斯等价定理或完整点态显式公式的完整证明。作为经典解析数论文献结果，梅尔滕斯渐近界 $M(x) = O_\varepsilon(x^{1/2+\varepsilon})$（$\forall \varepsilon > 0$）与黎曼猜想的等价性以及狄利克雷级数与零点分布基础可参阅 E. C. Titchmarsh, *The Theory of the Riemann Zeta-Function*, second edition (revised by D. R. Heath-Brown), Chapters 3, 4, and 14；$x > 1$ 上的完整点态冯·曼戈尔特显式公式（含全体非平凡零点、重数、对称高度极限与端点均值约定）亦见 H. Davenport, *Multiplicative Number Theory*, third edition, Chapter 17。
:::

::: {.remark #rem-ch22-integrated-explicit-certificate title="由冻结积分显式公式导出的零平滑误差三点差分恒等式与双轨可计算误差证书（手工推导与高精度数值，未在本书形式化）"}
**手工推导与高精度区间算术核验（`NUM`，未在本书形式化），以本书已冻结的四个 Lean 声明为分析起点。** 本页 `powers` 视图绘制精确素数幂阶梯 $\psi_0(x)$ 与可选截断 $K = 0, \dots, 10$ 的未平滑逐点截断曲线（其满截断对照曲线为 $\psi^{(10)}(x) = x - 2\sum_{j=1}^{10}\operatorname{Re}(x^{\rho_j}/\rho_j) - \log(2\pi) - \frac{1}{2}\log(1 - x^{-2})$）。此类未平滑逐点截断之所以难以附带严格证书，根源在于逐点零点级数 $\sum_\rho x^\rho/\rho$ 仅按对称高度**条件收敛**，尾项无法仅凭零点总权重绝对控制。改用本书所钉仓库已冻结的积分显式公式，即可彻底绕过这一障碍并一次性消除平滑窗误差（本段沿用上文约定，以 $\log$ 表自然对数）：

1. **冻结积分恒等式与平凡零点级数的初等闭式**：由 [@def-divisor-ratio-mertens-error] 中冻结的 [`U`](lean:D5/S3/Arith/Robin/CompleteMertensPeak.U) 与冻结定理 [`actual_integrated_explicit_formula`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula)（其定义域为 $y > 0$，即 $x = e^y > 1$），对一切 $x > 1$ 成立精确恒等式

   $$
   U(x) \;=\; \sum_{\rho}\frac{x^\rho}{\rho(1-\rho)} \;+\; \log(2\pi) \;-\; T(x),
   \qquad
   T(x) \;:=\; \sum_{m=1}^{\infty}\frac{x^{-2m}}{2m(2m+1)},
   $$

   其中求和按重数遍历临界带 $0 < \operatorname{Re}(\rho) < 1$ 内全体非平凡零点（含正负虚部）。利用部分分式 $\frac{1}{2m(2m+1)} = \frac{1}{2m} - \frac{1}{2m+1}$ 与对数、双曲反正切级数，平凡零点修正项在 $x > 1$ 上具有**无截断的初等闭式**：

   $$
   T(x) \;=\; 1 \;-\; \frac{1}{2}\log\bigl(1 - x^{-2}\bigr) \;-\; \frac{x}{2}\log\frac{x + 1}{x - 1}
   \qquad \bigl(x > 1,\;\text{例如 } T(2) \approx 0.045229\bigr).
   $$

2. **零平滑误差的三点中心差分恒等式（精确提取 $\Lambda(n)$）**：令 $(v)_+ := \max(v, 0)$。由 [`U`](lean:D5/S3/Arith/Robin/CompleteMertensPeak.U) 的算术定义，对一切 $x > 0$ 有

   $$
   U(x) + x\log x \;=\; (1 + \gamma)\,x \;+\; \sum_{m=1}^{\infty}\frac{\Lambda(m)}{m}\,(x - m)_+.
   $$

   对任一整数 $n \ge 2$ 及满足 $0 < h \le 1$ 且 $n - h > 1$ 的步长 $h$（从而三节点 $n - h,\ n,\ n + h$ 均落在积分公式定义域 $(1, \infty)$ 内），定义中心二阶差分 $\Delta_h^2 f(n) := f(n+h) - 2f(n) + f(n-h)$。线性项 $(1+\gamma)x$ 与常数项 $\log(2\pi)$ 在 $\Delta_h^2$ 下恒为零，而对每个正整数 $m$ 都有 $\Delta_h^2(x - m)_+\big|_{x=n} = (h - \lvert n - m\rvert)_+$；因 $0 < h \le 1$，该三角形核在全体整数 $m \neq n$ 处**严格为零**，仅在 $m = n$ 处取值 $h$。由此（结合下方第 3 条所证的绝对收敛性）得到**平滑窗误差恒为零**的精确提取公式：

   $$
   \Lambda(n) \;=\; \frac{n}{h}\,\Delta_h^2\bigl(U(x) + x\log x\bigr)\Big|_{x=n} \;=\; \frac{n}{h}\,\Delta_h^2(x\log x)\Big|_{x=n} \;+\; \frac{n}{h}\sum_{\rho}\frac{(n+h)^\rho - 2n^\rho + (n-h)^\rho}{\rho(1-\rho)} \;-\; \frac{n}{h}\,\Delta_h^2 T(n).
   $$

   300 比特 Arb 区间算术在 $n = 2, \dots, 10$ 上按下表采用的步长方案（$n = 2$ 取 $h = \frac{1}{2}$，$n = 3, \dots, 10$ 取 $h = 1$）直接验算了该算术差分恒等式（无穷零点和通过冻结积分公式代换），全部残差落入半径小于 $1.1 \times 10^{-86}$ 的含零区间。
3. **基于冻结总谱质量 $2\lambda_1$ 的双轨可计算尾项证书（RH 轨与完全无条件轨）**：冻结定理 [`actual_complex_pairWeight_hasSum`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_complex_pairWeight_hasSum) 确立了全体非平凡零点（按重数计）的精确谱权总量

   $$
   \sum_{\rho}\frac{1}{\rho(1-\rho)} \;=\; 2\lambda_1 \;=\; 2 + \gamma - 2\log(2\sqrt{\pi}) \;=\; 2 + \gamma - \log(4\pi) \;\approx\; 0.0461914179.
   $$

   设 $\rho_j = \frac{1}{2} + i\gamma_j$（$1 \le j \le K$，$0 < \gamma_1 < \dots < \gamma_K =: T_K$）为前 $K$ 个正虚部临界线零点，且经有限区间算术验证：它们均为单零点，并穷尽区域 $0 < \operatorname{Im}(\rho) \le T_K$ 内的全部非平凡零点（文献中 D. Platt & T. Trudgian，*The Riemann hypothesis is true up to $3\cdot 10^{12}$*，*Bull. London Math. Soc.* **53**(3), 792–797, 2021，定理 1 与 §2，[10.1112/blms.12460](https://doi.org/10.1112/blms.12460)，在 §2 中借助图灵方法将临界线变号零点数与临界带总零点计数精确匹配，从而同时确立单零点性与无遗漏性，将该有限验证推进至 $3 \times 10^{12}$；下述 $K \le 3000$ 的临界截断及其前驱亦经 FLINT/Arb 零点隔离与临界带零点计数独立复核）。结合冻结定理 [`actual_height_gt_ten`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_height_gt_ten)（$\lvert\operatorname{Im}\rho\rvert > 10$，排除实轴零点）以及共轭对称性（[@prop-zeta-conjugation-covariance]、[@prop-xi-zeros-strip-zeros]），对总权恒等式取实部并减去前 $K$ 个共轭对的精确贡献，即得**仅由前 $K$ 个纵坐标完全决定的精确尾项实部质量**：

   $$
   R_K \;:=\; \sum_{\lvert\operatorname{Im}\rho\rvert > T_K}\operatorname{Re}\!\left(\frac{1}{\rho(1-\rho)}\right) \;=\; 2\lambda_1 \;-\; 2\sum_{j=1}^{K}\frac{1}{\frac{1}{4} + \gamma_j^2} \;>\; 0.
   $$

   （例如 Arb 区间中心值给出 $R_{10} \approx 0.019121$、$R_{50} \approx 0.009108$、$R_{100} \approx 0.006222$、$R_{500} \approx 0.002298$、$R_{1000} \approx 0.001439$、$R_{2000} \approx 0.000885$、$R_{3000} \approx 0.000660$，各区间半径均小于 $5 \times 10^{-66}$。）记前 $K$ 对临界线零点给出的截断重构为

   $$
   U_K(x) \;:=\; \sum_{j=1}^{K}\frac{2\sqrt{x}\cos(\gamma_j\log x)}{\frac{1}{4} + \gamma_j^2} \;+\; \log(2\pi) \;-\; T(x),
   \qquad
   \Lambda_K(n; h) \;:=\; \frac{n}{h}\,\Delta_h^2\bigl(U_K(x) + x\log x\bigr)\Big|_{x=n}.
   $$

   对任一被截去的非平凡零点 $\rho = \beta + i\gamma$（$0 < \beta < 1$，$\lvert\gamma\rvert > T_K > 0$），记 $z = \rho(1-\rho) = \bigl(\beta(1-\beta) + \gamma^2\bigr) + i\,\gamma(1 - 2\beta)$。因 $\beta(1-\beta) > 0$ 且 $\lvert 1 - 2\beta\rvert < 1$，恒有 $\operatorname{Re}(z) > \gamma^2 > 0$ 且 $\lvert\operatorname{Im}(z)\rvert < \lvert\gamma\rvert$，故 $\lvert\operatorname{Im}(z)\rvert / \operatorname{Re}(z) < 1/\lvert\gamma\rvert < T_K^{-1}$；代入 $\operatorname{Re}(z) > 0$ 时的初等恒等式 $\frac{1}{\lvert z\rvert} = \sqrt{1 + (\operatorname{Im}(z)/\operatorname{Re}(z))^2}\,\operatorname{Re}(1/z)$，立即推出**无需任何零点定线假设的逐项绝对控制**：

   $$
   \frac{1}{\lvert\rho(1-\rho)\rvert} \;<\; C_K\,\operatorname{Re}\!\left(\frac{1}{\rho(1-\rho)}\right),
   \qquad
   C_K \;:=\; \sqrt{1 + T_K^{-2}}
   $$

   （同式以 $\lvert\gamma\rvert > 10$ 亦直接保证全级数 $\sum_\rho x^\rho / (\rho(1-\rho))$ 对每个 $x > 1$ 绝对收敛）。由此对任意 $x > 1$ 与任意容许 $(n, h)$ 同时导出两条严格可计算余项证书：
   - **RH 轨（调用 [@conj-riemann-hypothesis] 所登记的外部终端声明 `riemannZeta_eq_zero_re : RiemannZetaZerosOnLine`，从而全部尾项满足 $\operatorname{Re}(\rho) = \frac{1}{2}$、$\lvert x^\rho\rvert = \sqrt{x}$ 且 $\frac{1}{\lvert\rho(1-\rho)\rvert} = \operatorname{Re}\!\left(\frac{1}{\rho(1-\rho)}\right) = \frac{1}{\frac{1}{4}+\gamma^2}$）**：

     $$
     \lvert U(x) - U_K(x)\rvert \;\le\; \sqrt{x}\,R_K,
     \qquad
     \lvert\Lambda(n) - \Lambda_K(n; h)\rvert \;\le\; B_{\mathrm{RH}}(n, h; K) \;:=\; \frac{n}{h}\bigl(\sqrt{n+h} + 2\sqrt{n} + \sqrt{n-h}\bigr)\,R_K.
     $$

   - **完全无条件轨（完全独立于 [@conj-riemann-hypothesis]，仅利用有限验证至 $T_K$ 与 $\lvert x^\rho\rvert = x^\beta < x$）**：

     $$
     \lvert U(x) - U_K(x)\rvert \;\le\; x\,C_K\,R_K,
     \qquad
     \lvert\Lambda(n) - \Lambda_K(n; h)\rvert \;\le\; B_{\mathrm{uncond}}(n, h; K) \;:=\; \frac{4n^2}{h}\,C_K\,R_K
     $$

     （其中 $(n+h) + 2n + (n-h) = 4n$ 恰好消去分子中的步长 $h$）。
4. **$[2, 10]$ 上的高精度数值认证与未平滑展品对照（`NUM`）**：
   - **前 $10$ 对零点（$K = 10$，$T_{10} = \gamma_{10} \approx 49.773832$）的连续函数对照**：在 $[2, 10]$ 上，积分截断误差的连续最大值 $\max_{x \in [2, 10]}\lvert U(x) - U_{10}(x)\rvert \approx 0.012682$（在 $x = 7$ 取得，该点处 RH 与无条件逐点界分别为 $\approx 0.050589$ 与 $\approx 0.133874$），全程稳居一致证书 $\sqrt{10}\,R_{10} \approx 0.060466$（RH 轨）与 $10\,C_{10}\,R_{10} \approx 0.191249$（无条件轨）之内（将精确纵坐标换为展品代码存储的 IEEE-754 双精度数组 `GAMMAS` 时，$U_{10}(x)$ 的一致舍入偏差小于 $2.671 \times 10^{-16}$）。作为鲜明反差，本页 `powers` 视图的满截断未平滑曲线 $\psi^{(10)}(x)$（无论按精确纵坐标还是按展品代码存储的双精度 `GAMMAS` 计算，下述六位小数结果均完全一致）在整数节点的最大偏差约 $0.110045$（$x = 9$）、半整数节点最大偏差约 $0.189644$（$x = 6.5$），而连续上确界 $\sup_{x \in [2, 10]}\lvert\psi_0(x) - \psi^{(10)}(x)\rvert \approx 1.023368$（当 $x \to 7^-$ 时趋近 $\psi^{(10)}(7) - \log 60$），已远超单级素数幂判决半门槛 $\frac{1}{2}\log 2 \approx 0.346574$。
   - **单级素数幂分辨的一致半隙门槛与逐节点区间门槛**：因对任意整数 $n \ge 2$ 有谱隙 $\Lambda(n) \in \{0\} \cup [\log 2, \infty)$（$\log 2 \approx 0.693147$），只要可计算误差界满足一致半隙充分条件 $B(n, h; K) < \frac{1}{2}\log 2 \approx 0.346574$，认证区间 $[\Lambda_K - B,\ \Lambda_K + B]$ 便自动严格隔开 $0$ 与 $[\log 2, \infty)$（$\Lambda_K > \frac{1}{2}\log 2$ 严格证实 $n$ 为素数幂，$\Lambda_K < \frac{1}{2}\log 2$ 严格证实 $n$ 非素数幂）。固定 $[2, 10]$ 上的容许步长（$n = 2$ 取 $h = \frac{1}{2}$，$n = 3, \dots, 10$ 取 $h = 1$），两条上界的最紧节点恒为 $n = 10$ 且随 $K$ 严格单调递减：
     - **一致半隙条件 $B < \frac{1}{2}\log 2$ 的 RH 轨最小截断为 $K = 382$**：$K = 381$ 时 $B_{\mathrm{RH}}(10, 1; 381) \approx 0.346915 > \frac{1}{2}\log 2$ 尚差一步；$K = 382$ 时 $B_{\mathrm{RH}}(10, 1; 382) \approx 0.346327 < \frac{1}{2}\log 2$，使全部九行同时满足一致半隙条件并严格认证 $\{2, 3, 4, 5, 7, 8, 9\}$ 为素数幂、$\{6, 10\}$ 非素数幂（基准 $K = 500$ 时该界进一步降至 $\approx 0.290441$，实际误差仅 $\approx 0.013743$）。
     - **一致半隙条件 $B < \frac{1}{2}\log 2$ 的完全无条件轨最小截断为 $K = 2060$**：$K = 2059$ 时 $B_{\mathrm{uncond}}(10, 1; 2059) \approx 0.346593 > \frac{1}{2}\log 2$；$K = 2060$ 时 $B_{\mathrm{uncond}}(10, 1; 2060) \approx 0.346472 < \frac{1}{2}\log 2$（实际误差仅 $\approx 0.004330$），**在不援引 [@conj-riemann-hypothesis] 的前提下以一致半隙条件严格认证 $[2, 10]$ 上全部九个整数的素数幂与非素数幂分类**。
     - **逐节点区间直接分类的更紧截断与 $K = 10$ 对照**：若不要求统一满足 $B < \frac{1}{2}\log 2$，而直接检验各节点自身认证区间 $[\Lambda_K - B,\ \Lambda_K + B]$ 是否排除 $0$（素数幂：$\Lambda_K - B > 0$）或排除 $[\log 2, \infty)$（非素数幂：$\Lambda_K + B < \log 2$），则同一组上界在 **$K = 137$（RH 轨）**与 **$K = 778$（完全无条件轨）**处即已完整分类全部九个整数。回到 $K = 10$，全部九行均未满足一致半隙条件 $B < \frac{1}{2}\log 2$；仅就单个认证区间是否排除 $0$ 而言，RH 轨可单独证实 $n \in \{2, 3, 4, 5, 7\}$ 为素数幂，无条件轨仅能证实 $n \in \{2, 3\}$，而合数素数幂 $8, 9$ 与非素数幂合数 $6, 10$ 在两条轨道下都无法与另一类严格分离。下表汇总关键截断处的 Arb 核验结果（表中数值均四舍五入至小数点后六位）：

| $n$ | $h$ | $\Lambda(n)$ | $\Lambda_{10}$ | $B_{\mathrm{RH}}^{(10)}$ | $B_{\mathrm{uncond}}^{(10)}$ | $\Lambda_{382}$ | $B_{\mathrm{RH}}^{(382)}$ | $\Lambda_{2060}$ | $B_{\mathrm{uncond}}^{(2060)}$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $2$ | $1/2$ | $0.693147$ | $0.668602$ | $0.430935$ | $0.611996$ | $0.690421$ | $0.061745$ | $0.692466$ | $0.027718$ |
| $3$ | $1$ | $1.098612$ | $1.087448$ | $0.394561$ | $0.688496$ | $1.097461$ | $0.056533$ | $1.098314$ | $0.031183$ |
| $4$ | $1$ | $0.693147$ | $0.721527$ | $0.609434$ | $1.223992$ | $0.695755$ | $0.087320$ | $0.693799$ | $0.055436$ |
| $5$ | $1$ | $1.609438$ | $1.512954$ | $0.852953$ | $1.912488$ | $1.603260$ | $0.122212$ | $1.607880$ | $0.086618$ |
| $6$ | $1$ | $0$ | $0.169280$ | $1.122113$ | $2.753982$ | $0.010388$ | $0.160777$ | $0.002629$ | $0.124730$ |
| $7$ | $1$ | $1.945910$ | $1.787942$ | $1.414686$ | $3.748476$ | $1.935019$ | $0.202697$ | $1.943158$ | $0.169771$ |
| $8$ | $1$ | $0.693147$ | $0.778065$ | $1.728939$ | $4.895969$ | $0.699462$ | $0.247723$ | $0.694755$ | $0.221742$ |
| $9$ | $1$ | $1.098612$ | $1.035803$ | $2.063470$ | $6.196460$ | $1.092223$ | $0.295655$ | $1.096966$ | $0.280643$ |
| $10$ | $1$ | $0$ | $0.148596$ | $2.417122$ | $7.649951$ | $0.016891$ | $0.346327$ | $0.004330$ | $0.346472$ |

:::

::: {.remark #rem-ch22-higher-order-bspline-certificate title="任意偶阶 $2q$ 零平滑误差基数 B 样条证书族与大区间 $\Theta(N\log^2 N)$ 压缩律（手工推导与高精度数值，未在本书形式化）"}
**手工推导与 350 比特 FLINT/Arb 区间算术核验（`NUM`，未在本书形式化），沿用 [@rem-ch22-integrated-explicit-certificate] 中的同一组四个冻结 Lean 声明。** [@rem-ch22-integrated-explicit-certificate] 的三点差分相当于 $q = 1$ 阶中心基数 B 样条，仅利用了 $\lvert\rho(1-\rho)\rvert^{-1} = O(\gamma^{-2})$ 的零点衰减，因此在区间 $[2, N]$ 上满足一致半隙条件的所需零点对数按 $N^{3/2}\log^2 N$（RH 轨）与 $N^2\log^2 N$（无条件轨）增长。将冻结积分显式公式连续不定积分 $2q - 2$ 次并施以 $2q$ 阶中心差分，可在**保持平滑窗误差恒为零、且不引入任何无穷平凡零点级数**的前提下，把尾项衰减加速至 $O(\gamma^{-2q})$，从而在大区间上把两轨截断数同时压缩为拟线性阶 $\Theta(N\log^2 N)$（下文仍以 $\log$ 表自然对数）：

1. **统一初等闭式光滑势 $A_q(x)$ 与任意偶阶 $2q$ 精确提取恒等式**：设整数 $q \ge 1$，记 $m := 2q - 1$，$H_m := \sum_{\ell=1}^{m} 1/\ell$（并约定 $H_0 := 0$）。在 $x > 1$ 上把 [@rem-ch22-integrated-explicit-certificate] 中的平凡零点闭式展开（利用 $\log(1 - x^{-2}) = \log(x - 1) + \log(x + 1) - 2\log x$），得到

   $$
   x\log x - T(x) \;=\; (x - 1)\log x \;+\; \frac{x + 1}{2}\log(x + 1) \;-\; \frac{x - 1}{2}\log(x - 1) \;-\; 1.
   $$

   对任意 $q \ge 1$ 与 $x > 1$，定义不含任何无穷级数的初等光滑势

   $$
   A_q(x) \;:=\; \frac{1}{m!}\!\left[\bigl(x^m - m x^{m-1}\bigr)\log x \;+\; \frac{(x+1)^m}{2}\log(x+1) \;-\; \frac{(x-1)^m}{2}\log(x-1)\right].
   $$

   将逐次求导公式 $\frac{d^{m-1}}{dx^{m-1}}\!\left(\frac{u^m\log u}{m!}\right) = u(\log u + H_m - 1)$ 与 $\frac{d^{m-1}}{dx^{m-1}}\!\left(\frac{u^{m-1}\log u}{(m-1)!}\right) = \log u + H_{m-1}$ 分别代入 $u \in \{x,\ x + 1,\ x - 1\}$，直接验证得 $A_q^{(m-1)}(x) = x\log x - T(x) + (H_m - 1)x + \frac{1}{m}$，故 $A_q(x)$ 与 $x\log x - T(x)$ 的任意 $(m - 1)$ 次不定积分仅差一个次数不超过 $m = 2q - 1$ 的多项式。定义 $2q$ 阶中心差分算子 $\Delta_\eta^{2q} f(n) := \sum_{j=-q}^{q}(-1)^{q-j}\binom{2q}{q+j}f(n + j\eta)$（它恒等消去一切次数不超过 $2q - 1$ 的多项式），并定义中心基数 B 样条峰值常数

   $$
   c_q \;:=\; \frac{1}{m!}\sum_{j=1}^{q}(-1)^{q-j}\binom{2q}{q+j}\,j^m \;=\; \frac{2}{\pi}\int_0^\infty \left(\frac{\sin t}{t}\right)^{2q}\,dt,
   $$

   其中右端积分经傅里叶反演给出 $[-1/2, 1/2]$ 上均匀密度 $2q$ 重卷积在原点处的值，而将该样条密度写成截断幂的中心差分即证其与左端有限和相等（前六个精确有理值为 $c_1 = 1$、$c_2 = \frac{2}{3}$、$c_3 = \frac{11}{20}$、$c_4 = \frac{151}{315}$、$c_5 = \frac{15619}{36288}$、$c_6 = \frac{655177}{1663200}$）。对任意整数 $n \ge 2$ 及满足 $0 < q\eta \le 1$ 且 $n - q\eta > 1$ 的步长 $\eta$（使全部 $2q + 1$ 个节点 $x_j := n + j\eta$ 均严格落在 $(1, \infty)$ 内），将冻结算术表示 $U(x) + x\log x = (1 + \gamma)x + \sum_{k=1}^{\infty}\frac{\Lambda(k)}{k}(x - k)_+$（来自 [`U`](lean:D5/S3/Arith/Robin/CompleteMertensPeak.U)）连续积分 $m - 1$ 次得 $\sum_{k=1}^{\infty}\frac{\Lambda(k)}{k}\frac{(x-k)_+^m}{m!}$（模次数不超过 $m$ 的多项式）。因 $q\eta \le 1$，对任意异于 $n$ 的整数 $k$，截断幂 $(x - k)_+^m$ 在全部 $2q + 1$ 个节点上要么恒为零（$k \ge n + 1$），要么与单一 $m$ 次多项式 $(x - k)^m$ 重合（$k \le n - 1$），因而在 $\Delta_\eta^{2q}$ 下严格为零；仅在 $k = n$ 处由 $j > 0$ 项给出 $\Delta_\eta^{2q}\!\left[\frac{(x-k)_+^m}{m!}\right]_{x=n} = c_q\,\eta^m\,\delta_{k,n}$。在谱侧，冻结定理 [`actual_integrated_explicit_formula`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula) 的零点级数由 [`actual_complex_pairWeight_hasSum`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_complex_pairWeight_hasSum) 与 [`actual_height_gt_ten`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_height_gt_ten) 保证在 $(1, \infty)$ 上绝对且局部一致收敛（且 $\operatorname{Re}(\rho + \ell) > \ell \ge 1 > 0$），允许逐项积分 $m - 1$ 次；积分多项式、常数 $\log(2\pi)$ 与 $A_q^{(m-1)}$ 的仿射修正均被 $\Delta_\eta^{2q}$ 精确消去，从而对一切 $q \ge 1$ 与容许 $(n, \eta)$ 得到**平滑窗误差恒为零的任意偶阶精确提取恒等式**：

   $$
   \Lambda(n) \;=\; \frac{n}{c_q\,\eta^{2q-1}}\,\Delta_\eta^{2q}\!\left[\,A_q(x) \;+\; \sum_{\rho}\frac{x^{\rho + 2q - 2}}{\rho(1-\rho)\prod_{\ell=1}^{2q-2}(\rho + \ell)}\,\right]_{x=n}
   $$

   （$q = 1$ 时空乘积取 $1$，即退化为 [@rem-ch22-integrated-explicit-certificate] 的三点差分恒等式）。符号验算与 350 比特 Arb 区间算术在 $q = 1, \dots, 4$、$n = 2, \dots, 10$ 以及下述三种 $n = 2$ 步长方案（共 $108$ 组情形，通过精确算术原函数代换无穷零点和）上直接核对上述恒等式，全部残差区间均含零且绝对上界低于 $5.48 \times 10^{-93}$。

2. **一般对称高度截断重构与双轨可计算尾项证书**：对任意截断高度 $T > 0$，保留临界带内满足 $0 < \lvert\operatorname{Im}\rho\rvert \le T$ 的全体非平凡零点（按重数计入，且在无条件框架下不预设其必在临界线上或单重），定义 $2q$ 阶高度截断重构与精确尾项实部质量

   $$
   \Lambda^{(q)}(n,\eta;T) \;:=\; \frac{n}{c_q\,\eta^{2q-1}}\,\Delta_\eta^{2q}\!\left[\,A_q(x) \;+\; \sum_{0 < \lvert\operatorname{Im}\rho\rvert \le T}\frac{x^{\rho + 2q - 2}}{\rho(1-\rho)\prod_{\ell=1}^{2q-2}(\rho + \ell)}\,\right]_{x=n},
   \qquad
   R(T) \;:=\; \sum_{\lvert\operatorname{Im}\rho\rvert > T}\operatorname{Re}\!\left(\frac{1}{\rho(1-\rho)}\right) \;=\; 2\lambda_1 \;-\; \sum_{0 < \lvert\operatorname{Im}\rho\rvert \le T}\operatorname{Re}\!\left(\frac{1}{\rho(1-\rho)}\right).
   $$

   特别地，若 $T = T_K := \gamma_K$ 处的前 $K$ 个正虚部零点 $\rho_j = \frac{1}{2} + i\gamma_j$（$0 < \gamma_1 < \dots < \gamma_K$）经有限验证均为临界线单零点且穷尽 $0 < \operatorname{Im}\rho \le T_K$ 内全体非平凡零点（此时共轭对满足 $\rho_j(1 - \rho_j) = \frac{1}{4} + \gamma_j^2 > 0$），则 $R(T_K)$ 即 [@rem-ch22-integrated-explicit-certificate] 中的 $R_K = 2\lambda_1 - 2\sum_{j=1}^{K}(\frac{1}{4} + \gamma_j^2)^{-1}$，上述截断重构化简为显式实部和

   $$
   \Lambda_K^{(q)}(n;\eta) \;:=\; \Lambda^{(q)}(n,\eta;T_K) \;=\; \frac{n}{c_q\,\eta^{2q-1}}\,\Delta_\eta^{2q}\!\left[\,A_q(x) \;+\; \sum_{j=1}^{K} 2\,\operatorname{Re}\!\left(\frac{x^{2q - 3/2 + i\gamma_j}}{\bigl(\frac{1}{4} + \gamma_j^2\bigr)\prod_{\ell=1}^{2q-2}\bigl(\ell + \frac{1}{2} + i\gamma_j\bigr)}\right)\,\right]_{x=n}.
   $$

   记 $C(T) := \sqrt{1 + T^{-2}}$（在 $T = T_K$ 处即 $C_K$）与二项加权节点幂和 $S_p(n,\eta;q) := \sum_{j=-q}^{q}\binom{2q}{q+j}(n + j\eta)^p$（对整数幂 $m = 2q - 1$，$S_m = \left.\frac{d^m}{dz^m}\bigl[e^{nz}(2\cosh(\eta z/2))^{2q}\bigr]\right|_{z=0}$ 是关于 $(n, \eta^2)$ 的整系数多项式，因而在本文全部有理步长 $\eta \in \mathbb{Q}$ 下为精确有理数，且恒满足 $4^q n^m \le S_m < 4^q (n + 1)^m$）。对每一颗被截去的零点 $\rho = \beta + i\gamma$（$0 < \beta < 1$，$\lvert\gamma\rvert > T$）应用三角不等式，立得两条适用于任意高度 $T > 0$ 的严格可计算余项证书：
   - **RH 轨（调用 [@conj-riemann-hypothesis] 所登记的外部终端声明 `riemannZeta_eq_zero_re : RiemannZetaZerosOnLine`，从而 $\beta = \frac{1}{2}$、$\lvert x_j^{\rho+m-1}\rvert = x_j^{m-1/2}$ 且 $\lvert\rho + \ell\rvert = \sqrt{(\ell + \frac{1}{2})^2 + \gamma^2} > \sqrt{T^2 + (\ell + \frac{1}{2})^2}$）**：

     $$
     \lvert\Lambda(n) - \Lambda^{(q)}(n,\eta;T)\rvert \;\le\; B_{\mathrm{RH}}^{(q)}(n,\eta;T) \;:=\; \frac{n\,R(T)}{c_q\,\eta^{2q-1}}\,S_{2q-3/2}(n,\eta;q)\,\prod_{\ell=1}^{2q-2}\!\bigl(T^2 + (\ell + \tfrac{1}{2})^2\bigr)^{-1/2}.
     $$

   - **完全无条件轨（完全独立于 [@conj-riemann-hypothesis]，仅利用 $\lvert x_j^{\rho+m-1}\rvert < x_j^{m}$、$\lvert\rho(1-\rho)\rvert^{-1} < C(T)\operatorname{Re}((\rho(1-\rho))^{-1})$ 与 $\lvert\rho + \ell\rvert > \sqrt{T^2 + \ell^2}$）**：

     $$
     \lvert\Lambda(n) - \Lambda^{(q)}(n,\eta;T)\rvert \;\le\; B_{\mathrm{uncond}}^{(q)}(n,\eta;T) \;:=\; \frac{n\,C(T)\,R(T)}{c_q\,\eta^{2q-1}}\,S_{2q-1}(n,\eta;q)\,\prod_{\ell=1}^{2q-2}\!\bigl(T^2 + \ell^2\bigr)^{-1/2}.
     $$

   因全部节点满足 $x_j > 1$，上述两界恒有严格序 $B_{\mathrm{RH}}^{(q)} < B_{\mathrm{uncond}}^{(q)}$（且在 $q \ge 2$ 时第一个不等号亦严格成立）。在覆盖 $q = 1, \dots, 6$、$n = 2, \dots, 100$、$K = 1, \dots, 4672$ 以及下方三种 $n = 2$ 步长方案的全部 $2{,}831{,}232$ 组 350 比特 Arb 实测比较中（记 $B_{\mathrm{RH}}^{(q)}(n,\eta;K) := B_{\mathrm{RH}}^{(q)}(n,\eta;T_K)$ 等），均严格验证了 $\lvert\Lambda(n) - \Lambda_K^{(q)}(n;\eta)\rvert < B_{\mathrm{RH}}^{(q)} < B_{\mathrm{uncond}}^{(q)}$。

3. **$[2, 10]$ 与 $[2, 100]$ 上的 350 比特 Arb 门槛压缩表及 $K = 10$ 展品对照（`NUM`）**：对一切 $n \ge 3$ 取最大容许步长 $\eta = 1/q$（支撑半宽 $q\eta = 1$）；在边界节点 $n = 2$ 处取 $\eta_2 = h_2/q$ 并对比 $h_2 \in \{\frac{1}{2}, \frac{4}{5}, \frac{9}{10}\}$ 三种支撑半宽（均保持 $2 - h_2 > 1$）。三套步长方案在下述两张表中给出**完全相同**的全部截断整数，因为区间右端点（$n = 10$ 或 $n = 100$）始终是两轨一致界的唯一最紧节点（而在 $n = 2$ 局部，增大 $h_2$ 会显著收紧该节点自身误差界，例如在 $q = 5,\ K = 10$ 时 $B_{\mathrm{RH}}^{(5)}$ 在 $n = 2$ 处由 $h_2 = \frac{1}{2}$ 的 $1.007828$ 降至 $h_2 = \frac{4}{5}$ 的 $0.019161$）。对下表每一个决定性截断 $K$ 及其前驱 $K - 1$（含 $K = 10$ 与 $K = 3000$，直至最大截断 $K = 4672,\ T_{4672} \approx 5142.447908$），该范围远在 D. Platt & T. Trudgian（2021，定理 1 与 §2，[10.1112/blms.12460](https://doi.org/10.1112/blms.12460)）的 $3 \times 10^{12}$ 界限之内，且本节核验另调用 FLINT/Arb 的 `acb_dirichlet_zeta_zeros` 与 `acb_dirichlet_zeta_nzeros`（接口规范见 [FLINT `acb_dirichlet` 文档](https://flintlib.org/doc/acb_dirichlet.html)，完整核验摘要见书库 [Issue #873](https://github.com/the-omega-institute/trureturing-books/issues/873#issuecomment-7070334594)）独立复核了 $57$ 次索引零点隔离与 Hardy $Z$ 变号以及 $80$ 次分离高度上的精确全临界带零点计数。表中已达到有限截断的各行括号内给出 $K - 1 \to K$ 处最紧节点界（四舍五入至小数点后六位），恰好跨越半隙 $\frac{1}{2}\log 2 \approx 0.346574$（唯一例外是 $[2, 100]$ 表的 $q = 1$ 行，括号内仅报告 $K = 3000$ 处仍高于半隙的下界测试值）；逐节点分类门槛则枚举了此前全部正整数 $K$ 以防振荡早过：

   | 阶数 $q$ | $c_q$ | $[2,10]$ 一致半隙 RH 轨 | $[2,10]$ 一致半隙无条件轨 | $[2,10]$ 逐节点 RH 轨 | $[2,10]$ 逐节点无条件轨 |
   | :---: | :---: | :---: | :---: | :---: | :---: |
   | $1$ | $1$ | **$382$** ($0.346915 \to 0.346327$) | **$2060$** ($0.346593 \to 0.346472$) | **$137$** | **$778$** |
   | $2$ | $2/3$ | **$44$** ($0.357818 \to 0.345499$) | **$80$** ($0.350669 \to 0.337080$) | **$31$** | **$56$** |
   | $3$ | $11/20$ | **$42$** ($0.383079 \to 0.341197$) | **$60$** ($0.355012 \to 0.336184$) | **$34$** | **$49$** |
   | $4$ | $151/315$ | **$49$** ($0.352584 \to 0.328722$) | **$62$** ($0.356983 \to 0.333463$) | **$42$** | **$54$** |
   | $5$ | $15619/36288$ | **$57$** ($0.366927 \to 0.337006$) | **$69$** ($0.361672 \to 0.334966$) | **$51$** | **$62$** |

   在 $[2, 10]$ 上，升至 $q = 3$ 即将一致半隙截断从 $382 \to 42$（RH 轨，压缩逾 $9$ 倍）与 $2060 \to 60$（无条件轨，压缩逾 $34$ 倍）；逐节点分类则低至 $K = 31$（RH 轨，$q = 2$）与 $K = 49$（无条件轨，$q = 3$）。回到展品自带的 $K = 10$ 截断（对全部三种 $h_2$ 结果相同）：对 $q = 1, 2, 3$，RH 轨可单独认证的素数幂集合分别为 $\{2, 3, 4, 5, 7\}$、$\{2, 3, 4, 5, 7\}$ 与 $\{2, 3, 4, 5\}$，无条件轨则由 $\{2, 3\}$（$q = 1$）扩大至 $\{2, 3, 4, 5\}$（$q = 2, 3$），即升至 $q = 2$ 即可在 $K = 10$ 处额外无条件认证 $4 = 2^2$ 与 $5$ 为素数幂，但非素数幂合数 $6, 10$ 在上述各阶的 $K = 10$ 下仍无法分离。

   将区间右端点扩大十倍至 $[2, 100]$（共 $99$ 个整数节点）后，高阶加速的优势更为悬殊：

   | 阶数 $q$ | $c_q$ | $[2,100]$ 一致半隙 RH 轨 | $[2,100]$ 一致半隙无条件轨 |
   | :---: | :---: | :---: | :---: |
   | $1$ | $1$ | $> 3000$（$B(3000) \approx 2.641721$） | $> 3000$（$B(3000) \approx 26.417376$） |
   | $2$ | $2/3$ | **$1797$** ($0.346699 \to 0.346179$) | **$4672$** ($0.346645 \to 0.346408$) |
   | $3$ | $11/20$ | **$1307$** ($0.347110 \to 0.345655$) | **$2313$** ($0.346895 \to 0.346396$) |
   | $4$ | $151/315$ | **$1305$** ($0.346977 \to 0.345839$) | **$1957$** ($0.346980 \to 0.346479$) |
   | $5$ | $15619/36288$ | **$1404$** ($0.346725 \to 0.345952$) | **$1920$** ($0.348061 \to 0.346395$) |
   | $6$ | $655177/1663200$ | **$1541$** ($0.347510 \to 0.344974$) | **$1989$** ($0.347149 \to 0.345885$) |

   对 $q = 1$ 的 $[2, 100]$ 基准，Arb 严格证得 $K > 3000$（将下文尾项主项式解出的估算高度代入含 $\frac{7}{8}$ 常数项的光滑黎曼–冯·曼戈尔特计数 $\frac{T}{2\pi}\log\frac{T}{2\pi e} + \frac{7}{8}$，得估算值约 $43{,}030.08$ 与 $724{,}059.31$，而 Arb 在对应估算高度上的精确零点计数为 $43{,}030$ 与 $724{,}060$，越过无条件估算高度的首个序号为 $724{,}061$）；而取 $q = 4$（RH 轨）仅需 **$K = 1305$** 对零点，取 $q = 5$（无条件轨）仅需 **$K = 1920$** 对零点——**完全不依赖 [@conj-riemann-hypothesis] 地认证整个 $[2, 100]$ 上九十九个整数所需的零点对数，甚至少于 $q = 1$ 在 $[2, 10]$ 上所需的 $2060$ 对**。

4. **本证书族内精确最优渐近压缩律 $\Theta(N\log^2 N)$（匹配上下界）**：记整数右端点为 $N \ge 3$（使 $\eta = 1/q$ 对节点 $N$ 容许）并令 $N \to \infty$，以 $s = \frac{3}{2}$ 表 RH 轨、$s = 2$ 表无条件轨，采用第 2 条对任意截断高度 $T > 0$ 定义的一般对称高度重构 $\Lambda^{(q)}(n,\eta;T)$ 与计数 $K(T) := N(T)$（按重数计入 $0 < \operatorname{Im}\rho \le T$ 内全部非平凡零点；在无条件轨上允许保留项含一般临界带零点，在 RH 轨上则由 `riemannZeta_eq_zero_re` 落在临界线上，但均不依赖高高度处的单零点假设）。按经典黎曼–冯·曼戈尔特计数公式（E. C. Titchmarsh, *The Theory of the Riemann Zeta-Function*, second edition, revised by D. R. Heath-Brown, Chapter 9, §9.3–9.4，给出 $N(T) = \frac{T}{2\pi}\log\frac{T}{2\pi e} + O(\log T)$，从而任一目标高度 $X_N \to \infty$ 的 $O(1)$ 邻域内均存在零点纵坐标）与分部求和，连同 $0 < \beta < 1$ 上一致成立的 $\operatorname{Re}((\rho(1-\rho))^{-1}) = \gamma^{-2} + O(\gamma^{-4})$，尾项实部质量满足

   $$
   R(T) \;=\; \frac{\log\bigl(T/(2\pi)\bigr) + 1}{\pi T} \;+\; O\!\left(\frac{\log T}{T^2}\right).
   $$

   对峰值常数 $c_q$，在 $[0, \pi/2]$ 上有 $\log(\frac{\sin t}{t}) = -\frac{t^2}{6} + O(t^4) \le -\frac{t^2}{6}$，将积分变量缩放为 $t = u/\sqrt{q}$ 即获可积高斯控制函数 $e^{-u^2/3}$，而尾段满足 $\int_{\pi/2}^{\infty}(\frac{\sin t}{t})^{2q}\,dt \le \int_{\pi/2}^{\infty} t^{-2q}\,dt = \frac{1}{2q-1}(\frac{2}{\pi})^{2q-1}$ 随 $q$ 指数衰减，由控制收敛定理得 $c_q \sim \sqrt{\frac{3}{\pi q}}$；而对一切 $q \ge 1$，限制积分于 $0 \le t \le \sqrt{3/q}$ 并结合 $\frac{\sin t}{t} \ge 1 - \frac{t^2}{6}$ 与伯努利不等式 $(\frac{\sin t}{t})^{2q} \ge 1 - \frac{qt^2}{3}$，直接得到全 $q$ 初等双边界

   $$
   1 \;\ge\; c_q \;\ge\; \frac{2}{\pi}\int_0^{\sqrt{3/q}}\!\left(1 - \frac{q t^2}{3}\right)dt \;=\; \frac{4\sqrt{3}}{3\pi\sqrt{q}} \;>\; \frac{1}{\sqrt{\pi q}}
   $$

   （上界 $c_q \le c_1 = 1$ 来自 $(\frac{\sin t}{t})^{2q} \le (\frac{\sin t}{t})^2$）。取 $\eta = 1/q$（$n \ge 3$）并利用精确组合恒等式 $4^q q^{2q-1} = 4q(2q)^{2q-2}$，在 $q = O(\log N)$ 与 $T \asymp N\log N$ 区域内有 $S_p(N, 1/q; q) = 4^q N^p\bigl(1 + O(q/N)\bigr)$ 与分母乘积 $T^{-(2q-2)}\bigl(1 + O(q^3/T^2)\bigr)$，从而右端点 $N$ 上的主项在两条轨道上统一写作

   $$
   B^{(q)}(N, 1/q; T) \;\sim\; \frac{4q}{c_q}\,N^s\!\left(\frac{2qN}{T}\right)^{2q-2} R(T).
   $$

   关于全区间 $[2, N]$ 的右端点支配性：对 $n \ge 3$，固定步长 $\eta = 1/q$ 下的节点因子 $n S_p(n, 1/q; q)$ 随 $n$ 严格递增；对比 $n = 2$（$\eta_2 = h_2/q$，$h_2 \in (0, 1)$ 固定）与 $n = N$，当 $q \ge 2$ 时由 $S_p(2, h_2/q; q) < 4^q(2 + h_2)^p$ 与延森不等式 $S_p(N, 1/q; q) \ge 4^q N^p$（$p = 2q - 2 + s - 1 > 1$）得

   $$
   \frac{B^{(q)}(2, h_2/q; T)}{B^{(q)}(N, 1/q; T)} \;<\; \frac{2}{N h_2}\!\left(\frac{2 + h_2}{N}\right)^{s-1}\!\left(\frac{2 + h_2}{N h_2}\right)^{2q-2},
   $$

   只要 $N > (2 + h_2)/h_2$（如 $h_2 = \frac{1}{2}$ 时 $N \ge 6$，$h_2 \in \{\frac{4}{5}, \frac{9}{10}\}$ 时 $N \ge 4$），右端全部三个因子均严格小于 $1$；而 $q = 1$ 时无条件轨比值为 $\frac{4}{h_2 N^2} < 1$，RH 轨虽为凹幂 $x^{1/2}$，但逐节点比较直接给出 $S_{1/2}(2, h_2; 1) < S_{1/2}(N, 1; 1)$ 且前因子 $\frac{2}{N h_2} < 1$，故右端点 $N$ 对一切 $q \ge 1$ 与两轨均严格支配整个 $[2, N]$。
   - **上界构造**：令 $T \sim b N\log N$（亦可在其 $O(1)$ 邻域内取零点纵坐标 $T_K$）并选取随尺度缓慢增长的样条阶数 $q = \bigl\lfloor\frac{b}{2e}\log N\bigr\rfloor$，则 $R(T) \sim \frac{1}{\pi b N}$ 且 $\log B^{(q)}(N, 1/q; T) = \bigl(s - 1 - \frac{b}{e} + o(1)\bigr)\log N$。因此任意 $b > e(s - 1)$ 均使大 $N$ 时 $B^{(q)}(N, 1/q; T) \to 0 < \frac{1}{2}\log 2$。
   - **本证书族内的匹配下界**：对任意整数 $N \ge 3$、$q \ge 2$ 与高度 $T > 0$，由 $x \mapsto x^p$（$p \ge 5/2$）的凸性与延森不等式得 $S_p(N, 1/q; q) \ge 4^q N^p$，又 $c_q \le 1$、$C(T) > 1$ 且对 $1 \le \ell \le 2q - 2$ 有 $\sqrt{T^2 + (\ell + \frac{1}{2})^2} < T + 2q$，故两条轨道均满足

     $$
     B^{(q)}(N, 1/q; T) \;\ge\; 4q\,N^s\,R(T)\!\left(\frac{2qN}{T + 2q}\right)^{2q-2}.
     $$

     若括号内比值小于 $1$，则 $T > 2q(N - 1)$，代数上等价于 $\frac{2qN}{T + 2q} > \frac{2q(N - 1)}{T} =: u \in (0, 1)$，由 $u\log u \ge -1/e$ 得该次幂严格大于 $u^{2q} = \exp\!\bigl(\frac{T}{N-1}u\log u\bigr) \ge \exp\!\bigl(-\frac{T}{e(N-1)}\bigr)$；比值不小于 $1$ 时同一指数下界显然亦成立。于是对任意 $q \ge 2$ 与 $T > 0$ 一致有 $B^{(q)}(N, 1/q; T) > 8\,N^s\,R(T)\exp\!\bigl(-\frac{T}{e(N-1)}\bigr)$。任取 $\varepsilon \in (0, e(s - 1))$ 并记 $X_N := \bigl(e(s - 1) - \varepsilon\bigr)N\log N$；因正函数 $R(T)$ 随 $T$ 单调不增（在相邻零点纵坐标间取常值）且 $\exp\!\bigl(-\frac{T}{e(N-1)}\bigr)$ 随 $T$ 严格递减，对一切 $0 < T \le X_N$ 一致成立 $B^{(q)}(N, 1/q; T) > 8\,N^s\,R(X_N)\exp\!\bigl(-\frac{X_N}{e(N-1)}\bigr) = N^{\varepsilon/e - o(1)} \to \infty$，从而在 $N$ 充分大时一致排除全部 $T \le X_N$ 与全部 $q \ge 2$。结合 $K(T) \sim \frac{T}{2\pi}\log T$，在 $B_{\mathrm{RH}}^{(q)}$ 与 $B_{\mathrm{uncond}}^{(q)}$ 这组一致半隙证书内，按实高度 $T > 0$ 取下确界所得截断高度 $T_{\inf}(N)$（以及在零点纵坐标集上取最小值所得高度，二者相差 $O(1)$ 从而共享同一渐近式）与最小零点计数 $K_{\min}(N)$（按重数计）的精确渐近律为

     $$
     T_{\inf}(N) \;=\; \begin{cases}\bigl(\tfrac{e}{2} + o(1)\bigr)N\log N & \text{（RH 轨），} \\ (e + o(1))N\log N & \text{（无条件轨），}\end{cases}
     \qquad
     K_{\min}(N) \;=\; \begin{cases}\bigl(\tfrac{e}{4\pi} + o(1)\bigr)N\log^2 N & \text{（RH 轨），} \\ \bigl(\tfrac{e}{2\pi} + o(1)\bigr)N\log^2 N & \text{（无条件轨）。}\end{cases}
     $$

     相比之下，固定 $q = 1$ 时按同一对称高度截断求解 $4N^s R(T) \sim \frac{1}{2}\log 2$ 仅给出 $K_{\min}^{(1)}(N) \sim \frac{4s^2}{\pi^2\log 2}N^s\log^2 N$；沿 $q \sim c\log N$ 优化样条阶数，在 RH 轨上严格省去 $N^{1/2}$ 阶因子，在完全无条件轨上严格省去整整一个 $N$ 阶因子。
:::

::: {.problem #prob-ch22-truncated-explicit-remainder-resolution title="交互展品的实时证书接入与超越 B 样条逐节点界的常数优化（开放问题）"}
[@rem-ch22-integrated-explicit-certificate] 与 [@rem-ch22-higher-order-bspline-certificate] 已从分析上完整解决了基于冻结积分显式公式的零平滑误差证书构造与大区间高阶压缩问题：通过统一初等闭式势 $A_q(x)$ 与任意偶阶 $2q$ 基数 B 样条差分，$[2, 10]$ 上的一致半隙截断已压缩至 $K = 42$（RH 轨）与 $K = 60$（完全独立于 [@conj-riemann-hypothesis] 的无条件轨），逐节点分类压缩至 $K = 31$ 与 $K = 49$；将区间右端点扩大十倍至 $[2, 100]$（$99$ 个整数节点）后，一致半隙截断压缩至 $K = 1305$（$q = 4$，RH 轨）与 $K = 1920$（$q = 5$，无条件轨）；在 $N \to \infty$ 时沿 $q \asymp \log N$ 优化样条阶数把 $B_{\mathrm{RH}}^{(q)}$ 与 $B_{\mathrm{uncond}}^{(q)}$ 证书族内的两轨最小零点计数同步压降至精确的 $\Theta(N\log^2 N)$（首项常数分别为 $\frac{e}{4\pi}$ 与 $\frac{e}{2\pi}$）。由此，剩余的开放工程与分析问题进一步收窄为两项明确目标：第一，本页交互展品 `zeta-spectrum-lab` 的 `powers` 视图目前仍绘制精确素数幂阶梯与可选 $K = 0, \dots, 10$ 的未平滑截断曲线（其满截断曲线即上文对照的 $\psi^{(10)}(x)$），尚未接入上述实时可计算误差带与可选阶数 $q$ 的积分差分视图，将其安全、可审计地集成到交互界面仍待工程实现；第二，[@rem-ch22-higher-order-bspline-certificate] 第 4 条的匹配下界仅针对上述两条先对各节点 $x_j$ 分别取模再求和的显式界 $B_{\mathrm{RH}}^{(q)}$、$B_{\mathrm{uncond}}^{(q)}$ 成立，能否通过先对单颗零点的整体差分 $\Delta_\eta^{2q}(x^{\rho+2q-2})$ 直接定界再求和、改用紧支撑光滑 Gevrey 类梅林核或频域紧支撑的带限 Beurling–Selberg 型极值优函数（以可计算的空间尾项界换取更优频域截断），抑或借助相位感知的部分和相消机制，在保持严格可计算平滑窗误差界的同时进一步压低 $\Theta(N\log^2 N)$ 的首项常数，乃至在 $K = 10$ 附近实现对 $[2, 10]$ 其余节点 $\{6, 8, 9, 10\}$ 的严格分离，仍属开放的分析优化问题。
:::

下方完整频谱实验室在三维主舞台内整合部分和折线、合成离线四元组对照与素数幂三维曲线，供读者核对有限截断与延拓零点谱的边界：

::: {.viz src="zeta-spectrum-lab" height="640"}
**黎曼部分和折线与有限零点谱三维交互实验室（`zeta-spectrum-lab`）。** 三维主舞台沿紫色坐标轴呈现 $(\log n, \operatorname{Re} S_n, \operatorname{Im} S_n)$ 的青色部分和折线，以及素数幂视图下的青色精确阶梯与品红色有限谱三维曲线。琥珀色标记指示当前选定点，完整实验室右侧控件与读数支持切换预设并核查有限截断同解析延拓的界限。
:::
