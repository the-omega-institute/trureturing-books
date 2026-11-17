# 24.6 “$\pi$ 是 $\theta$ 的一个投影？”：互逆的两条级数、开普勒方程与半程落体 {#sec-ch24-6}

作者手稿里的追问 *“$\pi$ 是 $\theta$ 的一个投影？”* 在 [@conj-schanuel-dottie] 处得到的是一个否定方向的条件性回答：在沙努埃尔猜想之下，$\theta^*$ 与 $\pi$ 之间没有任何整系数多项式关系。但“没有代数关系”不等于“没有关系”。肯定方向的回答就藏在不动点方程里，一步就能读出来。

::: {.remark #rem-dottie-right-angle-split-literature title="不动点将直角切分为两段互补圆弧（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 对 $x \in [0, 1]$，方程 $\cos\theta = x$ 在 $[0, \pi/2]$ 上的唯一解是 $\theta = \arccos x = \frac{\pi}{2} - \arcsin x$。把 $x = \theta = \theta^*$ 代入：

$$
\cos\theta^* = \theta^* \quad\Longleftrightarrow\quad \frac{\pi}{2} \;=\; \theta^* + \arcsin\theta^* .
$$

在单位圆上看：点 $P = (\cos\theta^*, \sin\theta^*) = (\theta^*, \lambda)$ 把第一象限的四分之一圆弧切成两段。下段从 $(1, 0)$ 到 $P$，弧长是 $\theta^*$，恰好等于 $P$ 的横坐标；上段从 $P$ 到 $(0, 1)$，弧长是 $\arcsin\theta^*$。$P$ 是这段圆弧上唯一一个“弧长等于自己横坐标”的点。
:::

要把这段圆弧写成有理系数级数，先展开它的积分核。

::: {.lemma #lem-arcsin-binomial-kernel title="归一化中心二项系数与二项核" lean="D5/S3/Analytic/OriginalHalfBinomialIntegral.b_nonneg D5/S3/Analytic/OriginalHalfBinomialIntegral.b_le_one D5/S3/Analytic/OriginalHalfBinomialIntegral.binomial_hasSum"}
对每个 $n \in \mathbb{N}$，令 $b_n = \binom{2n}{n}/4^n \in \mathbb{R}$，则 $0 \le b_n \le 1$。对每个满足 $0 \le u < 1$ 的实数 $u$，

$$
\operatorname{HasSum}\left(n \mapsto b_n u^n,\;\frac{1}{\sqrt{1-u}}\right).
$$

这里 $\operatorname{HasSum}$ 同时指定级数收敛及其和。
:::

::: {.remark #rem-arcsin-series-derivation title="从二项核积分到含端点的反正弦级数（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 令

$$
c_n = \frac{\binom{2n}{n}}{4^n(2n+1)} \in \mathbb{Q}.
$$

下文以 $c_n$ 表示它在 $\mathbb{R}$ 中的像。固定任意 $y \in [0,1]$，并记

$$
\begin{aligned}
g(t)&=\frac{1}{\sqrt{1-t^2}},\\
F_N(t)&=\sum_{n<N}b_n t^{2n}\quad(N\in\mathbb{N}).
\end{aligned}
$$

在开区间 $0<t<y$ 上有 $0\le t^2<1$，所以 [@lem-arcsin-binomial-kernel] 给出 $F_N(t)\to g(t)$，并且 $0\le F_N(t)\le g(t)$。当 $y=1$ 时，核在右端点有奇性；这里只在开区间使用二项展开，端点可以任意补上有限值，因为两个端点的勒贝格测度为零。

可积性也能从原函数本身得到：$\arcsin$ 在 $[0,y]$ 上连续，在 $0<t<y$ 上的导数是非负的 $g(t)$。非负导数的自动可积性与微积分基本定理因此给出[^arcsin-ftc]

$$
\int_0^y g(t)\,\mathrm{d}t=\arcsin y-\arcsin 0=\arcsin y.
$$

这包括 $y=1$；$y=0$ 时积分为零。于是可用可积的 $g$ 控制非负多项式部分和，逐项积分[^arcsin-dct]：

$$
\begin{aligned}
\int_0^y F_N(t)\,\mathrm{d}t
&=\sum_{n<N}\frac{b_n}{2n+1}\,y^{2n+1}\\
&=\sum_{n<N}c_n y^{2n+1}\\
&\longrightarrow\arcsin y.
\end{aligned}
$$

因此端点 $y=1$ 的级数收敛由积分论证得到，无需预设端点级数的和。再用 $\arcsin(-y)=-\arcsin y$（`Real.arcsin_neg`）以及每个单项式的奇性，便覆盖所有 $x\in[-1,1]$，包括 $x=-1$。反正弦的完整展开为

$$
\begin{aligned}
\arcsin x&=\sum_{n\ge0}c_n x^{2n+1}\\
&=x+\frac{x^3}{6}+\frac{3x^5}{40}\\
&\quad+\frac{5x^7}{112}+\cdots
\qquad(\lvert x\rvert\le1).
\end{aligned}
$$

于是 $\pi$ 是 $\theta^*$ 的一条有理系数幂级数的值：

$$
\pi \;=\; A(\theta^*), \qquad A(x) \;=\; 2x + 2\arcsin x \;=\; 4x + \frac{x^3}{3} + \frac{3x^5}{20} + \frac{5x^7}{56} + \frac{35x^9}{576} + \cdots .
$$

这里使用的不动点条件是 $\theta^*\in[0,1]$ 与 $\cos\theta^*=\theta^*$。`Real.arccos_cos` 要求的 $0\le\theta^*\le\pi$ 由此区间条件保证；结合 `Real.arccos_eq_pi_div_two_sub_arcsin`，得到 $\theta^*=\pi/2-\arcsin\theta^*$，从而 $\pi=A(\theta^*)$。
:::

[^arcsin-ftc]: 连续性与导数使用 Mathlib 的 `Real.continuous_arcsin`、`Real.hasDerivAt_arcsin`；后者要求 $t\ne-1$ 且 $t\ne1$，在 $0<t<y\le1$ 上成立。自动可积性使用 `intervalIntegral.intervalIntegrable_deriv_of_nonneg`，除闭区间连续性与开区间导数外，还使用上述导数的非负性。积分恒等式使用 `intervalIntegral.integral_eq_sub_of_hasDerivAt_of_le`，其前提是 $0\le y$、同样的连续性与开区间导数，以及前一步建立的区间可积性。两者均不要求端点可导。

[^arcsin-dct]: 逐项积分使用 Mathlib 的 `intervalIntegral.hasSum_integral_of_dominated_convergence`：每项是可测多项式，在开区间上以非负项 $b_nt^{2n}$ 自身作界；这些界的和几乎处处等于可积的 $g(t)$。有限多项式的积分给出系数 $b_n/(2n+1)=c_n$。

::: {.remark #rem-arcsin-interior-tail title="内部区间上的几何截断误差（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 对每个 $N\in\mathbb{N}$，定义

$$
\begin{aligned}
S_N(x)&=\sum_{n<N}c_n x^{2n+1},\\
A_N(x)&=2x+2S_N(x).
\end{aligned}
$$

由 [@lem-arcsin-binomial-kernel]，$0\le c_n=b_n/(2n+1)\le1$。对任意实数 $q,x$，若 $0\le q<1$ 且 $|x|\le q$，则

$$
\begin{aligned}
\left|\arcsin x-S_N(x)\right|
&\le\sum_{n=N}^{\infty}c_n|x|^{2n+1}\\
&\le\sum_{n=N}^{\infty}q^{2n+1}
=\frac{q^{2N+1}}{1-q^2},\\
\left|A(x)-A_N(x)\right|
&\le\frac{2q^{2N+1}}{1-q^2}.
\end{aligned}
$$

这些界对 $N=0$ 也成立，此时部分和为空；对 $q=0$ 也成立，此时 $x=0$，余项和上界均为零。端点 $x=\pm1$ 的收敛来自 [@rem-arcsin-series-derivation] 的积分论证；此处的几何界只用于 $q<1$。对本章的 $\theta^*\in(0,1)$，选取 $\theta^*\le q<1$；给定任意误差容限 $\varepsilon>0$，总能选 $N$ 使 $2q^{2N+1}/(1-q^2)<\varepsilon$，于是 $|\pi-A_N(\theta^*)|<\varepsilon$。$A_N$ 是有理系数多项式，可用有限次加乘求值。这个结论约束的是精确输入下的级数截断误差；实际计算还需另给 $\theta^*$ 的输入误差、舍入控制与计算资源界。
:::

**反方向：从 $\pi$ 读出 $\theta^*$。** 指定反级数在 $y=\pi$ 处的绝对收敛与精确和由 [@thm-dottie-rational-inverse-endpoint] 给出；经典展开与部分和的数值核对见 [@ex-dottie-pi-series]。

::: {.definition #def-dottie-rational-inverse title="指定的有理反正弦级数与形式复合逆" lean="D5/S3/Analytic/PowerSeries/DottieInverseSeries.alpha D5/S3/Analytic/PowerSeries/DottieInverseSeries.arcsine D5/S3/Analytic/PowerSeries/DottieInverseSeries.forward D5/S3/Analytic/PowerSeries/DottieInverseSeries.inverse"}
对每个 $k\in\mathbb{N}$，定义有理系数

$$
\alpha(2k)=0,\qquad
\alpha(2k+1)=\frac{\binom{2k}{k}}{4^k(2k+1)}=c_k.
$$

在形式幂级数环 $\mathbb{Q}[[X]]$ 中，令

$$
\begin{aligned}
S&=\operatorname{mk}(\alpha)
  =\sum_{n\ge0}\alpha(n)X^n,\\
A&=2X+2S,\\
B&=A^{\langle-1\rangle}.
\end{aligned}
$$

这里 $B$ 是由 $A$ 的一次系数 $4$ 为单位元所指定的形式复合逆，满足 $B(0)=0$ 与 $A(B(X))=X$。记 $\beta_n=[X^n]B\in\mathbb{Q}$（$n\in\mathbb{N}$）；在下面的实数级数中，$\beta_n$ 表示这一有理数在 $\mathbb{R}$ 中的像。
:::

这里保留前文的 $A$、$B$ 记号：形式级数 $A$ 正是函数 $2x+2\arcsin x$ 在原点的展开，$B$ 是它的形式复合逆。前文 $c_k$ 仍只表示反正弦的第 $2k+1$ 次系数；$\beta_n$ 则按每一个自然数次数标记逆级数的系数。

$B$ 有一个不含级数的等价描述：先解 $\eta + \sin\eta = y/2$，再取 $B(y) = \sin\eta$。事实上若 $x = \sin\eta$ 且 $\eta \in [-\pi/2, \pi/2]$，则 $A(x) = 2\sin\eta + 2\eta = y$。取 $y = \pi$，方程 $\eta + \sin\eta = \pi/2$ 的解是 $\eta = \frac{\pi}{2} - \theta^* = \arcsin\theta^*$（代入即得 $\frac{\pi}{2} - \theta^* + \cos\theta^* = \frac{\pi}{2}$），于是 $B(\pi) = \sin\eta = \cos\theta^* = \theta^*$。要把这个函数值同时读成原来那条有理系数级数的和，还须证明级数确实收敛到这里；下面的定理给出绝对收敛与精确的和。

::: {.theorem #thm-dottie-rational-inverse-endpoint title="有理复合逆在 π 处绝对收敛到唯一正余弦不动点" lean="D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint"}
对 [@def-dottie-rational-inverse] 指定的系数 $\beta_n$，存在实数 $\theta^*$，使以下各项同时成立：

1. $0<\theta^*<1$ 且 $\cos\theta^*=\theta^*$；
2. 对每个实数 $t$，若 $0<t$ 且 $\cos t=t$，则 $t=\theta^*$；
3. $\operatorname{Summable}\bigl(n\mapsto|\beta_n|\pi^n\bigr)$；
4. $\operatorname{HasSum}\bigl(n\mapsto\beta_n\pi^n,\;\theta^*\bigr)$。

两条级数都取遍 $n\in\mathbb{N}$，包括 $n=0$。第三项是绝对收敛，第四项保留每个系数的符号并指定其和。
:::

::: proof
先给所有系数找一个共同的解析函数。考虑复函数 $f(z)=z+\sin z$；求 $f(z)=w$ 等价于求

$$
\Phi_w(z)=\frac{w+z-\sin z}{2}
$$

的不动点。在闭圆盘 $|z|\le1$ 上，正弦与余弦的余项界给出

$$
|\sin z-z|\le\frac15,\qquad
|\cos z-1|\le\frac35.
$$

因此当 $|w|<7/4$ 时，$|\Phi_w(z)|\le(|w|+1/5)/2<1$，而 $|\Phi_w'(z)|\le3/10$。闭圆盘完备，巴拿赫压缩原理在其中给出唯一解 $G(w)$，且 $|G(w)|<1$、$G(w)+\sin G(w)=w$。同一余弦界保证 $f'(G(w))=1+\cos G(w)\ne0$；解析局部反函数与这一唯一解在各点附近相同，于是 $G$ 在整个 $|w|<7/4$ 上解析。共轭保持方程和圆盘，唯一性遂使实数 $w$ 对应实数 $G(w)$，并给出 $G(0)=0$。

令

$$
H(Y)=\sin G(Y/2).
$$

它在 $|Y|<7/2$ 上解析，在该圆盘的实轴部分取实值，且 $H(0)=0$。柯西公式因而在半径 $13/4<7/2$ 的圆周上给出同一个 $H$ 的原点幂级数展开。

还须认出这个展开的每一项。对实数 $y$，$|y|<7/2$ 时记 $x=G(y/2)\in(-1,1)$，则 $H(y)=\sin x$，且主支恒等式 $\arcsin(\sin x)=x$ 给出

$$
2H(y)+2\arcsin H(y)=2\sin x+2x=y.
$$

在原点附近，反正弦的展开正是 $S$。把上式写成泰勒级数的复合，$H$ 在实轴上的泰勒级数 $T$ 满足 $T(0)=0$ 与 $A(T)=X$。一次系数为 $4$ 的形式级数只有一个零常数项复合逆，故 $T$ 就是 $B$ 的实系数像。由于 $H$ 在实轴附近取实值，实、复泰勒系数相同，于是对每个 $n\ge0$，

$$
\frac{H^{(n)}(0)}{n!}=\beta_n
$$

（右端在此取复数像）。这把全部原有理系数，包括零次系数，与同一个柯西展开逐项相连。因 $\pi<13/4$，圆盘内的绝对收敛给出 $\sum_{n\ge0}|\beta_n|\pi^n<\infty$；在 $Y=\pi$ 处求和再取实部，得到有符号级数的和 $H(\pi)$。

最后，令 $x=G(\pi/2)\in(-1,1)$。由 $x+\sin x=\pi/2>0$ 知 $x>0$：若 $x\le0$，这个区间内的 $\sin x$ 也非正。于是 $\theta^*=\sin x$ 满足 $0<\theta^*<x<1$，且 $\theta^*=\pi/2-x$，从而 $\cos\theta^*=\sin x=\theta^*$。任意正实数竞争者 $t=\cos t$ 先由 $\cos t\le1$ 落在 $(0,1]$，再由余弦在 $[0,\pi]$ 上严格递减排除 $t=1$；同一单调性使两个正不动点不可能互异。因此唯一性覆盖全部正实数 $t$。完整证明由 Lean 内核检查。
:::

::: {.example #ex-dottie-pi-series title="π 与 θ* 互逆的两条有理系数级数：部分和的数值核对"}
**文献结果，未在本书形式化：本例的经典反正弦展开、部分和表值与项比值比较。** $A$ 在 $0$ 处的一阶系数是 $4 \neq 0$，其形式反函数 $B = A^{-1}$ 逐阶反演给出有理系数奇次幂级数

$$
B(y) \;=\; \frac{y}{4} - \frac{y^3}{768} - \frac{y^5}{61440} - \frac{43\,y^7}{165150720} - \frac{223\,y^9}{47563407360} - \cdots .
$$

级数 $B$ 及等式 $\theta^* = B(\pi)$ 见 Kaplan（2007，*Mathematics Magazine* 第 80 卷，“The Dottie Number”）；[@thm-dottie-rational-inverse-endpoint] 给出了这条指定级数在 $\pi$ 处的绝对收敛与精确和。$A$ 的展开是经典的反正弦级数。下表的系数用精确有理数算术逐阶反演得到，部分和以 50 位精度计算，四舍五入到所示位数；这些表值与下述项比值仍是数值核对，端点定理不认证其舍入精度或收敛速度比较。

| 截断阶数 | $A$ 的部分和（趋于 $\pi$） | 与 $\pi$ 的差 | $B$ 的部分和（趋于 $\theta^*$） | 与 $\theta^*$ 的差 |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $2.9563405$ | $1.85\times10^{-1}$ | $0.7853982$ | $4.63\times10^{-2}$ |
| $3$ | $3.0909148$ | $5.07\times10^{-2}$ | $0.7450254$ | $5.94\times10^{-3}$ |
| $5$ | $3.1239947$ | $1.76\times10^{-2}$ | $0.7400446$ | $9.59\times10^{-4}$ |
| $7$ | $3.1347505$ | $6.84\times10^{-3}$ | $0.7392582$ | $1.73\times10^{-4}$ |
| $9$ | $3.1387490$ | $2.84\times10^{-3}$ | $0.7391185$ | $3.33\times10^{-5}$ |
| $11$ | $3.1403573$ | $1.24\times10^{-3}$ | $0.7390918$ | $6.70\times10^{-6}$ |
| $21$ | $3.1415655$ | $2.72\times10^{-5}$ | $0.7390851363$ | $3.10\times10^{-9}$ |

$A$ 的相邻项之比趋于 $(\theta^*)^2 \approx 0.546$。$B$ 的相邻非零项之比从 $0.12$（第 $5$ 阶）升到 $0.22$（第 $21$ 阶），数值上趋向 $1/4$：从 $\pi$ 读出 $\theta^*$ 比从 $\theta^*$ 读出 $\pi$ 收敛得快。
:::

所以两句话同时成立，并不矛盾：解析上，$\pi$ 与 $\theta^*$ 互为对方的有理系数幂级数的值（[@thm-dottie-rational-inverse-endpoint]、[@ex-dottie-pi-series]）；代数上，在沙努埃尔猜想（[@conj-schanuel-dottie]）之下，二者之间没有任何多项式关系。$A$ 与 $B$ 是无穷级数，不是多项式；上表列出的有限截断都留下非零的差。一般截断余项的非零性、系数符号规律及计算资源界均不包含在端点定理中。

::: {.figure src="ch24-two-series"}
**$\pi$ 与 $\theta^*$ 是同一条曲线上同一个点的两个坐标。** 青色曲线是 $A(x) = 2x + 2\arcsin x$；从横轴上的 $\theta^*$ 竖直往上、再向左，读出 $\pi = A(\theta^*)$，这是青色箭头；从纵轴上的 $\pi$ 向右、再竖直往下，读回 $\theta^* = B(\pi)$，走的是同一条路，这是叠在青色箭头上的品红虚线箭头。$B$ 在 $\pi$ 处的绝对收敛与和见 [@thm-dottie-rational-inverse-endpoint]；$\pi = A(\theta^*)$ 用到的反正弦展开见 [@rem-arcsin-series-derivation]（文献结果，未在本书形式化）。
:::

**不动点住在哪里：摆线的半程。** 辅助方程 $\eta + \sin\eta = \pi/2$ 在天体力学开普勒方程与径向自由落体中的物理化身汇总于下例（[@ex-dottie-free-fall]）。

::: {.example #ex-dottie-free-fall title="半程落体：下落时间过半时，离中心的距离还剩 (1 + sin θ*)/2"}
**文献结果，未在本书形式化。** 在 [@ex-dottie-pi-series] 的辅助方程 $\eta + \sin\eta = \pi/2$ 中令 $E = \pi - \eta$，它变成偏心率 $e = 1$、平近点角 $M = \pi/2$ 的开普勒方程 $E - \sin E = \frac{\pi}{2}$，其解为 $E = \frac{\pi}{2} + \theta^* \approx 132.35^\circ$。这里取的是束缚椭圆的零角动量退化极限（$e \to 1$），轨道退化成一条径向线段；沿它运动的就是牛顿力学中质点在中心质量 $M$ 的引力场里从距离 $r_0$ 处由静止径向下落的自由落体。能量守恒给出 $\dot{r}^2 = 2GM\left(\frac{1}{r} - \frac{1}{r_0}\right)$，其解是摆线参数化：

$$
r(\eta) \;=\; \frac{r_0}{2}\,(1 + \cos\eta), \qquad t(\eta) \;=\; \frac{t_{\mathrm{ff}}}{\pi}\,(\eta + \sin\eta), \qquad \eta \in [0, \pi],
$$

其中 $t_{\mathrm{ff}} = \frac{\pi}{2}\sqrt{\frac{r_0^3}{2GM}}$ 是落到中心的总时间。直接求导可验证：$\dot{r}^2 = \frac{r_0^2\pi^2}{4\,t_{\mathrm{ff}}^2}\cdot\frac{\sin^2\eta}{(1+\cos\eta)^2}$，而 $2GM\left(\frac{1}{r} - \frac{1}{r_0}\right) = \frac{2GM}{r_0}\cdot\frac{\sin^2\eta}{(1+\cos\eta)^2}$，两者相等当且仅当 $t_{\mathrm{ff}}$ 取上述值。

**半程时刻。** 令 $t = t_{\mathrm{ff}}/2$，即 $\eta + \sin\eta = \pi/2$。代入 $\eta = \frac{\pi}{2} - x$ 得 $\cos x = x$，所以 $x = \theta^*$，$\eta_{1/2} = \frac{\pi}{2} - \theta^* = \arcsin\theta^* \approx 47.65^\circ$，于是

$$
\frac{r(t_{\mathrm{ff}}/2)}{r_0} \;=\; \frac{1 + \cos\eta_{1/2}}{2} \;=\; \frac{1 + \sin\theta^*}{2} \;=\; \frac{1 + \lambda}{2} \;\approx\; 0.836806 .
$$

此刻的下落速率与 $r_0$ 处逃逸速率 $v_0 = \sqrt{2GM/r_0}$ 之比为

$$
\frac{\lvert\dot{r}\rvert}{v_0} \;=\; \frac{\sin\eta_{1/2}}{1 + \cos\eta_{1/2}} \;=\; \frac{\theta^*}{1 + \lambda} \;\approx\; 0.441611 .
$$

**对照与核对。** 在 $t/t_{\mathrm{ff}} = \frac14, \frac12, \frac34$ 三个时刻，$r/r_0$ 分别为 $0.960937$、$0.836806$、$0.597150$；只有中间一个能用 $\theta^*$ 写成闭式。对 $t(r) = \int_r^{r_0} \frac{\mathrm{d}r'}{\sqrt{2GM\left(\frac{1}{r'} - \frac{1}{r_0}\right)}}$ 作数值积分，得 $t(0.836806\,r_0)/t_{\mathrm{ff}} = 0.500000$，与闭式一致。

同一组参数方程也描述闭合的尘埃弗里德曼宇宙，只需把 $r$ 换成标度因子并把时间反向（文献结果，未在本书形式化）：这样的宇宙在膨胀期时间过半时，尺度已达到最大值的 $83.68\%$。

时间用掉一半，路程只走了不到六分之一：下落开始得很慢，绝大部分距离是在后半程走完的。而“一半”这个最朴素的分割点，落在的位置恰好由 $\theta^*$ 给出。余弦不动点不只住在计算器的余弦键上；凡是服从摆线律的过程——径向开普勒轨道、自由落体塌缩、闭合尘埃宇宙——在时间过半的那一刻，都在读它。
:::


::: {.figure src="ch24-half-fall"}
**时间过半，只落了不到六分之一。** 墨色曲线是径向自由落体的摆线解：横轴是 $t/t_{\mathrm{ff}}$，纵轴是 $r/r_0$。三个点标在 $\frac14, \frac12, \frac34$ 处，高度 $0.961$、$0.837$、$0.597$；青色的半程点高 $\frac{1 + \sin\theta^*}{2}$，右边的括号是这时落下的 $0.163$。按上例的公式实算；落体模型本身是文献结果，未在本书形式化。
:::
