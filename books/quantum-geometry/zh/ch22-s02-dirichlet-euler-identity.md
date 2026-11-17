# 22.2 极点留数、狄利克雷级数与欧拉乘积的形式化恒等式 {#sec-ch22-2}

在进入 $\operatorname{Re}(s) > 1$ 的级数与乘积展开之前，让我们先锁定 $\zeta(s)$ 在复平面上最醒目的地标：位于 $s = 1$ 处的**唯一一阶极点（调和级数发散奇点）**。

从几何上看，当 $s \to 1^+$ 时，调和级数 $\sum_{n=1}^\infty n^{-s}$ 之所以发散，正是因为无穷多根素数正交轴上的放大因子 $(1 - p^{-1})^{-1} = \frac{p}{p-1}$ 源源不断地累积发散；而它发散的速度，恰好由 $(s - 1)^{-1}$ 以单位留数 $1$ 精准标定！

::: {.viz src="euler-product-sieve" preset="near" height="500"}
**越靠近 1，缺口越宽。** 清单是到 $31$ 为止的 $11$ 个素数，琥珀色竖线在 $s = 1.1$：青色的乘积只有 $4.93$，墨色的 $\zeta(1.1) = 10.58$，品红的缺口比乘积本身还大。往左走缺口只会更宽：在 $s = 1$ 处青色曲线停在有限值 $\prod_{p \le 31} \frac{p}{p-1} \approx 6.54$，墨色的 $\zeta$ 却冲出画面，那里是 [@lem-riemann-zeta-residue-one] 的极点。
:::

::: {.lemma #lem-riemann-zeta-residue-one title="黎曼 ζ 函数在 s = 1 处的留数为 1" lean="D5/S3/Zeros/ZetaIdentities.riemann_zeta_residue_one"}
对 [@def-classical-zeta] 中的黎曼 $\zeta$ 函数 $\operatorname{classicalZeta} : \mathbb{C} \to \mathbb{C}$，当复变量 $s \in \mathbb{C}$ 沿去心邻域滤子 $\mathcal{N}_{\neq}(1)$ 趋近于 $1$ 时，有极限

$$
\lim_{\substack{s \to 1 \\ s \neq 1}} (s - 1)\,\operatorname{classicalZeta}(s) = 1.
$$
:::

::: proof
在 Lean 模块 `ZetaIdentities` 中，展开 [`classicalZeta`](lean:D5/S3/Weil/Convention.classicalZeta) 的定义，直接调用 Mathlib 中利用赫尔维茨（Hurwitz）$\zeta$ 函数解析延拓建立的留数定理 `riemannZeta_residue_one` 即得（在模块 `ZetaUpgrade` 中进一步与 $\{1\}^c$ 上的解析性合并封装为 [`classical_zeta_unique_simple_pole_residue_one`](lean:D5/S3/Zeros/ZetaUpgrade.classical_zeta_unique_simple_pole_residue_one)）。完整证明由 Lean 内核检查。
:::

接下来，我们把目光投向绝对收敛右半平面 $\operatorname{Re}(s) > 1$（Lean 中显式记作假设 `hs : 1 < s.re`）。请特别注意：依照全书认识论诚实契约，**下面的级数与乘积恒等式均严格携带半平面前提 $\operatorname{Re}(s) > 1$**——正是这一实部大于 $1$ 的阻尼衰减条件，保证了自然数求和与素数无穷乘积在各自拓扑下绝对收敛，从而令“顺序无关”的重排与因式分解在分析学上完全合法。

::: {.proposition #prop-riemann-zeta-dirichlet-sum title="半平面 Re(s) > 1 上黎曼 ζ 函数的狄利克雷级数展开" lean="D5/S3/Zeros/ZetaIdentities.riemann_zeta_dirichlet_sum"}
设复数 $s \in \mathbb{C}$ 满足实部条件 $\operatorname{Re}(s) > 1$（`1 < s.re`）。则自然数上的无条件可和级数（`tsum`）精确等于 $\operatorname{classicalZeta}(s)$：

$$
\sum_{n : \mathbb{N}} (n : \mathbb{C})^{-s} = \operatorname{classicalZeta}(s).
$$
:::

::: proof
当 $\operatorname{Re}(s) > 1$ 时，$-s \neq 0$，故在 Mathlib 的复幂次约定下 $n = 0$ 项满足 $(0 : \mathbb{C})^{-s} = 0$，因此遍历全体自然数 $n \in \mathbb{N}$ 的拓扑级数 $\sum'_{n : \mathbb{N}} (n : \mathbb{C})^{-s}$ 与遍历正整数 $n \ge 1$ 的经典狄利克雷级数完全一致。展开 [`classicalZeta`](lean:D5/S3/Weil/Convention.classicalZeta) 后，由 Mathlib 在半平面 `1 < s.re` 上的级数表示定理 `tsum_riemannZetaSummand` 直接得证。完整证明由 Lean 内核检查。
:::

紧接着，在同一半平面 $\operatorname{Re}(s) > 1$ 上，我们将视角从“逐个自然数线性累加”切换到“逐根素数正交轴独立相乘”。

::: {.theorem #thm-riemann-zeta-euler-product title="半平面 Re(s) > 1 上黎曼 ζ 函数的欧拉素数乘积展开" lean="D5/S3/Zeros/ZetaIdentities.riemann_zeta_euler_product"}
设复数 $s \in \mathbb{C}$ 满足实部条件 $\operatorname{Re}(s) > 1$（`1 < s.re`）。则遍历全体素数类型 `Nat.Primes` 的无穷乘积（`tprod`）精确等于 $\operatorname{classicalZeta}(s)$：

$$
\prod_{p : \mathrm{Nat.Primes}} \bigl(1 - (p : \mathbb{C})^{-s}\bigr)^{-1} = \operatorname{classicalZeta}(s).
$$
:::

::: proof
在半平面假设 `hs : 1 < s.re` 下，函数 $n \mapsto (n : \mathbb{C})^{-s}$ 为完全积性函数且级数绝对可和。由唯一素因子分解与完全积性函数的欧拉乘积一般定理，局部几何级数因子 $(1 - p^{-s})^{-1} = \sum_{k=0}^\infty p^{-ks}$ over $p \in \mathrm{Nat.Primes}$ 的无穷乘积收敛于同一极限 `riemannZeta s`（Mathlib 定理 `riemannZeta_eulerProduct_tprod`）。展开 [`classicalZeta`](lean:D5/S3/Weil/Convention.classicalZeta) 即完成证明。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch22-euler-staircase"}
**有限个素数的欧拉乘积一级级爬向 $\zeta(2)$，却总差一截。** 青色的阶梯是前 $K$ 个素数的乘积在 $s = 2$ 处的值，$K = 3$ 时是 $\frac{25}{16}$；墨色的线是 $\zeta(2) = \frac{\pi^2}{6}$。两者之间品红的缝越来越窄，用到 $97$ 为止的 $25$ 个素数仍差 $0.0030$；只有乘进全体素数，乘积才等于 $\zeta(s)$（[@thm-riemann-zeta-euler-product]）。图中数值为数值结果。
:::

现在，消去中间桥梁 $\operatorname{classicalZeta}(s)$，[@prop-riemann-zeta-dirichlet-sum] 与 [@thm-riemann-zeta-euler-product] 在半平面 $\operatorname{Re}(s) > 1$ 上直接会师，给出全书第六部最璀璨的一条算术—几何恒等式：加法端遍历全体自然数，乘法端只遍历素数正交基！

::: {.corollary #cor-dirichlet-sum-eq-euler-product title="半平面 Re(s) > 1 上自然数狄利克雷级数与素数欧拉乘积的恒等定理" lean="D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product"}
设复数 $s \in \mathbb{C}$ 满足实部条件 $\operatorname{Re}(s) > 1$（`1 < s.re`）。则自然数狄利克雷级数与素数欧拉无穷乘积直接相等：

$$
\sum_{n : \mathbb{N}} (n : \mathbb{C})^{-s}
\;=\;
\prod_{p : \mathrm{Nat.Primes}} \bigl(1 - (p : \mathbb{C})^{-s}\bigr)^{-1}.
$$
:::

::: proof
在假设 `hs : 1 < s.re` 下，由 [@prop-riemann-zeta-dirichlet-sum] 知左端等于 $\operatorname{classicalZeta}(s)$，再由 [@thm-riemann-zeta-euler-product] 的对称形式将 $\operatorname{classicalZeta}(s)$ 替换为右端的素数无穷乘积即得。完整证明由 Lean 内核检查。
:::

::: {.viz src="euler-product-sieve" preset="all" height="500"}
**格子全青，缺口还宽。** 素数一个个加进清单，直到 $97$：下方 $1$ 到 $96$ 的格子全部变成青色，每一个都出现在乘积的展开里。琥珀色竖线在 $s = 1.2$：青色的乘积只有 $4.37$，墨色的 $\zeta(1.2) = 5.59$，品红的缺口 $1.23$ 仍占 $\zeta$ 的五分之一以上，放大镜里垫底的一段是 $101^{-s}$。只有把全体素数都乘进来，乘积才等于整个级数（[@cor-dirichlet-sum-eq-euler-product]）。
:::

**加法里的同一个窍门。** 欧拉乘积靠的是乘法分解：每个 $n$ 唯一地写成素数幂之积，每根素数轴各自贡献一个等比级数。把“乘”换成“加”，同一个窍门照样成立。把 $N$ 拆成若干正整数部件之和（不计顺序），部件大小 $n$ 就是一根轴，它出现的次数 $m_n$ 是这根轴上的坐标；沿这根轴求和仍是等比级数 $1 + x^n + x^{2n} + \cdots = (1 - x^n)^{-1}$。如果大小为 $n$ 的部件有 $c_n$ 种颜色，同色同大小的部件不加区分，这根轴就分裂成 $c_n$ 根，因子变成 $(1 - x^n)^{-c_n}$。下面这条定理把这件事落在真正的有限集合上：左边是形式幂级数的系数，右边是一个有限类型的元素个数，两边分别定义、互不依赖。

::: {.theorem #thm-coloured-partition-euler-product title="彩色分拆计数：加法型欧拉乘积的系数等于彩色分拆数" lean="D5/S3/Combinatorics/Partitions/ColouredEulerLedger.coloured_coefficient"}
给定颜色数 $c : \mathbb{N} \to \mathbb{N}$（$c_n$ 可以为 $0$）。对 $N \in \mathbb{N}$，称 $N$ 的一个**彩色分拆**为如下资料：$N$ 的一个整数分拆，连同对其中每个出现的部件大小 $d$（重数记为 $m_d$），从 $c_d$ 种颜色中可重复地选取的一个 $m_d$ 元多重集。在整系数形式幂级数环 $\mathbb{Z}[[x]]$ 中记

$$
E_c(x) = \prod_{n \ge 1} (1 - x^n)^{-c_n}, \qquad (1 - x^n)^{-c} = \sum_{k \ge 0} \binom{c + k - 1}{k}\, x^{kn},
$$

其中 $E_c$ 的 $x^N$ 系数取前 $N$ 个因子 $n = 1, \dots, N$ 之积的 $x^N$ 系数（更后面的因子从 $x^{N+1}$ 起才有非常数项，不影响它）。则

$$
[x^N]\, E_c(x) = \#\{\, N \text{ 的彩色分拆} \,\}.
$$
:::

::: proof
Lean 的证明不从乘积出发去“猜”系数，而是两头各算各的，再在中间相遇。

（1）数右边。彩色分拆的集合是一个依赖和：先选分拆 $p$，再对 $p$ 中每个出现的大小 $d$ 独立地选一个多重集。从 $c$ 种颜色可重复地选 $m$ 个，方法数是 $\binom{c + m - 1}{m}$（隔板法），所以总数是 $\sum_p \prod_d \binom{c_d + m_d - 1}{m_d}$。这正是 Mathlib 中加权分拆生成函数（大小 $d$、重数 $m$ 配权 $\binom{c_d + m - 1}{m}$）的 $x^N$ 系数。

（2）数左边。同一个生成函数又是局部因子 $1 + \sum_{j \ge 1} \binom{c_d + j - 1}{j}\, x^{dj}$ 在逐系数收敛意义下的无穷乘积；逐系数比较可知，这个局部因子就是 $(1 - x^d)^{-c_d}$。无穷乘积的极限唯一，而 $E_c$ 的每个系数已经由前有限个因子决定，于是两边相等。完整证明由 Lean 内核检查。
:::

**玻色子的态数（手工推导）。** 设想一组彼此独立的谐振模式：频率为 $n\omega$ 的模式有 $c_n$ 个（$n = 1, 2, 3, \dots$），每个模式可以容纳任意多个全同玻色子，每个粒子带能量 $n\hbar\omega$（不计零点能）。一个福克态就是给每个模式指定一个占据数。把频率为 $n\omega$ 的 $c_n$ 个模式看成 $c_n$ 种颜色：这些模式的占据数之和记为 $m_n$，一组占据数恰好就是从 $c_n$ 种颜色可重复地取 $m_n$ 个的一个多重集；总能量是 $\sum_n n\, m_n$ 个 $\hbar\omega$。所以总能量为 $N\hbar\omega$ 的福克态与 $N$ 的彩色分拆一一对应，它们的个数就是 [@thm-coloured-partition-euler-product] 里 $E_c$ 的 $x^N$ 系数。令 $x = e^{-\hbar\omega/k_B T}$，$E_c(x)$ 就是这团玻色气体的正则配分函数。不过定理只管形式幂级数的系数；把 $x$ 换成一个数，还需要乘积收敛（例如 $c_n$ 有界、$0 \le x < 1$ 时，$\sum_n c_n x^n < \infty$，乘积收敛）。

::: {.example #ex-coloured-partitions-small title="一种、两种与 n 种颜色：手算前几项，并与逐个枚举的福克态核对"}
**一种颜色（$c_n = 1$）。** 这就是普通分拆数 $p(N)$。$N = 4$ 的分拆有 $5$ 个：$4$、$3 + 1$、$2 + 2$、$2 + 1 + 1$、$1 + 1 + 1 + 1$。

**两种颜色（$c_n = 2$）。** 以 $N = 2$ 为例：分拆 $2$ 只有一个部件，颜色有 $2$ 种选法；分拆 $1 + 1$ 要从 $2$ 种颜色可重复地选 $2$ 个，多重集有 $\binom{3}{2} = 3$ 个（两红、两蓝、一红一蓝）。合计 $5$。在物理上，这是每个频率各有两个偏振方向的一维腔：能量 $2\hbar\omega$ 的态有 $5$ 个。

**$n$ 种颜色（$c_n = n$）。** 以 $N = 2$ 为例：部件 $2$ 有 $2$ 种颜色，给出 $2$ 个；$1 + 1$ 只有一种颜色可用，给出 $1$ 个。合计 $3$。

把三个乘积展开到 $x^{10}$：

| $N$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $c_n = 1$ | $1$ | $1$ | $2$ | $3$ | $5$ | $7$ | $11$ | $15$ | $22$ | $30$ | $42$ |
| $c_n = 2$ | $1$ | $2$ | $5$ | $10$ | $20$ | $36$ | $65$ | $110$ | $185$ | $300$ | $481$ |
| $c_n = n$ | $1$ | $1$ | $3$ | $6$ | $13$ | $24$ | $48$ | $86$ | $160$ | $282$ | $500$ |

表中每一项都用两种互不依赖的办法算过：一是按定理把乘积逐项展开，二是不碰乘积，直接对每个模式枚举占据数，数出总能量为 $N$ 的福克态。对 $N \le 10$ 的三行，两种办法完全一致。

**文献结果，未在本书形式化。** $c_n = n$ 这一行恰是平面分拆的个数（MacMahon，1916），把它与彩色分拆对上的双射不在本书范围之内。普通分拆数的增长由哈代—拉马努金渐近式 $p(N) \sim \dfrac{e^{\pi\sqrt{2N/3}}}{4\sqrt{3}\,N}$ 给出（Hardy & Ramanujan，1918）；下表把主项与精确值作比较，相对误差只像 $1/\sqrt{N}$ 那样缓慢地缩小：

| $N$ | $p(N)$ | 主项 $\dfrac{e^{\pi\sqrt{2N/3}}}{4\sqrt{3}\,N}$ | 主项 $/\, p(N) - 1$ |
| ---: | ---: | ---: | ---: |
| $10$ | $42$ | $48.10$ | $+14.5\%$ |
| $50$ | $204226$ | $2.176 \times 10^{5}$ | $+6.5\%$ |
| $100$ | $190569292$ | $1.993 \times 10^{8}$ | $+4.6\%$ |
| $200$ | $3972999029388$ | $4.100 \times 10^{12}$ | $+3.2\%$ |
:::

**欧拉乘积本身就是一团玻色气体。** 把同一个读法搬回 [@cor-dirichlet-sum-eq-euler-product]：让每个素数 $p$ 成为一个玻色模式，单粒子能量取 $\ln p$。一个福克态给每个素数指定占据数 $a_p$（只有有限个非零），对应整数 $n = \prod_p p^{a_p}$，总能量是 $\sum_p a_p \ln p = \ln n$；唯一素因子分解保证这是一一对应（手工推导）。于是 $\sum_n n^{-s} = \sum_{\text{态}} e^{-s E}$：$\zeta(s)$ 是这团“素数气体”在逆温度 $s$ 下的配分函数，而欧拉乘积就是每个模式各自的等比级数之积。[@lem-riemann-zeta-residue-one] 说 $s \to 1^{+}$ 时 $\zeta(s)$ 像 $1/(s - 1)$ 那样发散：温度升到 $1$ 时配分函数爆掉；温度再高（$s \le 1$），级数 $\sum_n n^{-s}$ 本身就发散（与调和级数比较）。这个物理读法来自文献（B. Julia，1990；D. Spector，1990），本书不对它作任何形式化断言。

> 乘法拆成素数，加法拆成部件；两次都是把一个无穷和拆成许多互不相干的等比级数。
