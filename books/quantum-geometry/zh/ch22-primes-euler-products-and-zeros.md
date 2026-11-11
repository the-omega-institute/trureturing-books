# 第二十二章 素数是算术的正交基：欧拉乘积与黎曼零点

> *“我总感觉量子的本质就是,两两比较,永远一致,顺序无关”*

在[第二十一章](ch21-diagonalization-and-escape.md)中，我们看到任何企图用有限潜坐标封死一切概念的系统，都会被自指对角线顺着法向顶出旧球壳，开启无穷无尽的升维阶梯。现在，让我们把目光投向人类最古老、也最纯粹的一座无穷维大厦——**自然数的乘法算术**——并追问一个直指核心的几何问题：

当我们说“两两比较、永远一致、顺序无关”时，在正整数的乘法世界 $\mathbb{N}_{\ge 1}$ 里，究竟哪些数是真正彼此独立、互不投影的**正交基向量**？

初看之下，自然数 $1, 2, 3, 4, 5, 6, \dots$ 像是一条一维长线上均匀排列的刻度。然而，一旦你从加法切换到乘法，你会发现 $6 = 2 \times 3$ 根本不是一根独立的新方向，它只是方向 $2$ 与方向 $3$ 的合成对角线；$12 = 2^2 \times 3$ 则是沿方向 $2$ 走两步、再沿方向 $3$ 走一步！根据算术基本定理（唯一素因子分解定理），每一个正整数 $n \ge 1$ 都可以唯一地分解为素数幂的乘积，并且**无论你按什么顺序把这些素因子乘起来，结果永远一致、顺序无关**：

$$
n = \prod_{p \in \mathrm{Primes}} p^{v_p(n)} \quad\Longleftrightarrow\quad \ln n = \sum_{p \in \mathrm{Primes}} v_p(n)\,\ln p.
$$

看清上面这对映射的几何结构了吗？唯一素因子分解把每一个正整数 $n$ 嵌入了以形式基向量 $\{\vv{e}_p\}_{p \in \mathrm{Primes}}$ 张成的可数无穷维**形式指数晶格** $\bigoplus_{p \in \mathrm{Primes}} \mathbb{Z}\vv{e}_p$（若赋予这组形式基向量标准正交内积 $\langle \vv{e}_p, \vv{e}_q\rangle = \delta_{pq}$，指数 $v_p(n) \in \mathbb{N}$ 就是整数 $n$ 在第 $p$ 根形式素数轴 $\vv{e}_p$ 上的非负整数坐标）；与此同时，取自然对数给出了作用在该指数晶格上的线性权重泛函 $\ln n = \sum_p v_p(n)\,\ln p$，其中不同素数的对数权重 $\ln 2, \ln 3, \ln 5, \dots$ 在有理数域 $\mathbb{Q}$ 上线性无关（[@thm-prime-log-independence]）——没有任何一根素数轴能在另一根素数轴上投下一丝一毫的有理整除影子（下文所说的“素数正交基轴”，即指这一配备了 $\mathbb{Q}$-线性无关对数权重的形式指数坐标晶格几何）。

本章将沿着这一“素数即算术正交基”的几何直觉，严格建立**狄利克雷（Dirichlet）自然数级数**与**欧拉（Euler）无穷素数乘积**在绝对收敛半平面 $\operatorname{Re}(s) > 1$ 上的机器形式化恒等式，剖析有限素数筛的“多面体截断余项”，并在严谨的三层认识论契约下远眺数论皇冠上的开放猜想——**黎曼猜想（Riemann Hypothesis）**。

![素数正交基、欧拉乘积与黎曼临界线：Re(s) > 1 半平面上的狄利克雷—欧拉恒等式、有限素数筛截断余项与临界带 σ = 1/2 开放猜想](../assets/fig-22-euler-prime-resonator.svg)

## 22.1 算术正交基与因式分解消除无穷 {#sec-ch22-1}

为什么作者在手稿中反复强调“**处理无穷问题的本质就是进行因式分解，看如何把无穷‘约掉’**”？

想象你面前摆着一个对全部自然数 $n = 1, 2, 3, \dots$ 求和的无穷级数。在加法视角下，每一项 $n^{-s}$ 都和其它无穷多项纠缠在一起，看不出谁是谁的生成元。但是，一旦我们利用“两两比较、顺序无关”的唯一素因子分解，将每一个合数 $n = p_1^{a_1} \cdots p_r^{a_r}$ 还原为它在各根素数正交轴上的独立分量乘积 $n^{-s} = p_1^{-a_1 s} \cdots p_r^{-a_r s}$，奇迹便发生了：**原本横跨所有自然数的全局无穷求和，当场分解（factorize）成了每一根独立素数轴上局部几何级数的无穷乘积！**

在每一根单独的素数轴 $p$ 上，沿着坐标刻度 $a = 0, 1, 2, 3, \dots$ 的一维求和不过是最简单的公比为 $p^{-s}$ 的等比级数（当 $\operatorname{Re}(s) > 1$ 时 $|p^{-s}| = p^{-\operatorname{Re}(s)} < 1$）：

$$
1 + p^{-s} + p^{-2s} + p^{-3s} + \cdots \;=\; \frac{1}{1 - p^{-s}} \;=\; (1 - p^{-s})^{-1}.
$$

你看，单根素数轴上的无穷多项之和 $1 + p^{-s} + p^{-2s} + \cdots$，被等比求和公式一口气“约掉”成了干净利落的单因子 $(1 - p^{-s})^{-1}$！把所有相互正交的素数轴 $p \in \mathrm{Primes}$ 乘在一起，由于乘法分配律在展开时恰好不重不漏地遍历每一个非负整数坐标向量 $(v_2, v_3, v_5, \dots)$（仅有限个坐标非零），全体自然数的狄利克雷级数便与全体素数的欧拉乘积严丝合缝地合二为一。

::: {.viz src="euler-product-sieve" preset="two" height="500"}
**一根素数轴。** 清单上只有 $2$：青色曲线是等比级数 $1 + 2^{-s} + 4^{-s} + \cdots = (1 - 2^{-s})^{-1}$，在琥珀色竖线 $s = 2$ 处等于 $\frac{4}{3}$，比墨色的 $\zeta(2)$ 低一截。下方的整数里只有 $2$ 的幂 $1, 2, 4, 8, 16, 32, 64$ 是青色，其余都是品红，第一个品红格是 $3$。
:::

为了在 Lean 4 中把这一经典桥梁铸成零歧义的形式化定理，我们首先对齐 `trureturing` 仓库中模块 `D5/S3/Weil/Convention` 所采用的黎曼 $\zeta$ 函数约定。

::: {.definition #def-classical-zeta title="黎曼 ζ 函数的形式化约定与简单极点谓词" lean="D5/S3/Weil/Convention.classicalZeta D5/S3/Zeros/ZetaUpgrade.HasUniqueSimplePoleWithResidue"}
在复平面 $\mathbb{C}$ 上，记全函数 [`classicalZeta`](lean:D5/S3/Weil/Convention.classicalZeta) $: \mathbb{C} \to \mathbb{C}$ 为 Mathlib 标准库中的黎曼 $\zeta$ 函数 `riemannZeta`。同时，对任意复变函数 $f : \mathbb{C} \to \mathbb{C}$、极点位置 $z \in \mathbb{C}$ 与留数 $\mathrm{residue} \in \mathbb{C}$，定义谓词 [`HasUniqueSimplePoleWithResidue`](lean:D5/S3/Zeros/ZetaUpgrade.HasUniqueSimplePoleWithResidue) $f\ z\ \mathrm{residue}$ 为以下三项性质的合取：

1. **除极点外处处解析**：$f$ 在补集 $\{z\}^c = \mathbb{C} \setminus \{z\}$ 的开邻域上复解析（`AnalyticOnNhd ℂ f ({z}ᶜ)`）；
2. **一阶洛朗留数极限**：当 $s$ 在去心邻域滤子 $\mathcal{N}_{\neq}(z)$ 中趋近于 $z$ 时，$(s - z)f(s)$ 收敛于 $\mathrm{residue}$；
3. **非零留数**：$\mathrm{residue} \neq 0$。
:::

## 22.2 极点留数、狄利克雷级数与欧拉乘积的形式化恒等式 {#sec-ch22-2}

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
**格子全青，缺口还在。** 素数一个个加进清单，直到 $97$：下方 $1$ 到 $96$ 的格子全部变成青色，每一个都出现在乘积的展开里；在 $s = 2$ 处青色曲线离墨色的 $\zeta$ 只差 $0.0030$。放大镜里的品红缺口仍在，垫底的一段是 $101^{-s}$。只有把全体素数都乘进来，乘积才等于整个级数（[@cor-dirichlet-sum-eq-euler-product]）。
:::

::: {.viz src="sphere-escape" preset="euclid" height="500"}
**乘起来加一。** 清单里每多一个素数，就把它们全部乘起来再加一得到 $Q$。每只钟有 $p$ 个刻度，指针指着 $Q$ 除以 $p$ 的余数：全都指着 $1$，没有一只指着红色的 $0$，所以整除 $Q$ 的素数一定不在清单里（欧几里得的论证，文献结果）。全屏打开后，下方的图给出有限个素数的欧拉乘积离 $\zeta(2)$ 还差多少（[@thm-riemann-zeta-euler-product] 取 $s = 2$）。
:::

## 22.3 有限素数筛的“多面体截断余项”与相位共振手算 {#sec-ch22-3}

让我们把复变量写成 $s = \sigma + it$（其中实部 $\sigma = \operatorname{Re}(s)$ 控制振幅衰减，虚部 $t = \operatorname{Im}(s)$ 控制旋转角频率），看看 [@cor-dirichlet-sum-eq-euler-product] 中的每一个素数因子在几何上究竟在做什么：

$$
p^{-s} = p^{-\sigma - it} = p^{-\sigma} e^{-i t \ln p} = p^{-\sigma}\bigl(\cos(t\ln p) - i\sin(t\ln p)\bigr).
$$

在复平面上，每一个素数 $p$ 都可看作一只以固有对数角频率 $\omega_p = \ln p$ 匀速旋转的**相位指针（素数时钟）**！在 $t = 0$ 把所有时钟拨到十二点（读数 $1$）再放手：时钟 $2$ 每隔 $2\pi/\ln 2 \approx 9.0647$ 个时间单位回到十二点，时钟 $3$ 每隔 $2\pi/\ln 3 \approx 5.7192$ 个时间单位回到十二点。时钟 $2$ 走完第 $12$ 圈时，时钟 $3$ 走了 $12\ln 3/\ln 2 \approx 19.01955$ 圈，只越过十二点 $7.04^\circ$，差一点就对齐了。它们会不会在某个时刻 $t \neq 0$ 真正同时回到十二点？

假设会：$t\ln 2 = 2\pi a$，$t\ln 3 = 2\pi b$，$a, b$ 为整数。前式乘 $b$、后式乘 $a$ 再相减，得 $t\,(b\ln 2 - a\ln 3) = 0$；因为 $t \neq 0$，所以 $b\ln 2 = a\ln 3$。由于 $\ln 2, \ln 3 > 0$，$a$ 与 $b$ 要么同为零，要么同号；若同号，不妨都为正，两边取指数得 $2^{b} = 3^{a}$，左边是偶数，右边是奇数。所以 $a = b = 0$，于是 $t = 2\pi a/\ln 2 = 0$，与 $t \neq 0$ 矛盾。这里起作用的只有一个机制：取指数把对数之间的整系数关系变成素数幂的乘积等式，而唯一素因子分解不允许两组互不相交的素数幂乘出同一个整数。所钉仓库的模块 `D5/S3/Factorization/PrimeLogIndependence` 对任意有限个素数冻结了这一机制，模块 `D5/S3/Weil/PrimeAddress/PrimeLogIndependence` 再把它改写成 $\mathbb{Q}$ 上的线性无关。

::: {.theorem #thm-prime-log-independence title="素数对数在整数与有理数上线性无关" lean="D5/S3/Factorization/PrimeLogIndependence.prime_log_indep D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence"}
记 $\ln$ 为实自然对数（Mathlib 的 `Real.log`）。

1. **整数形式**：设 $S$ 是自然数的有限集，其中每个元素都是素数，$k : \mathbb{N} \to \mathbb{Z}$ 是任意函数。若实数等式

   $$
   \sum_{p \in S} k(p)\,\ln p \;=\; 0
   $$

   成立，则对每个 $p \in S$ 都有 $k(p) = 0$。
2. **有理数形式**：以素数类型 `Nat.Primes` 为指标的实数族 $p \mapsto \ln p$ 在 $\mathbb{Q}$ 上线性无关（`LinearIndependent ℚ`），即：对任意由素数组成的有限集 $F$ 与任意 $c : \mathrm{Nat.Primes} \to \mathbb{Q}$，若 $\sum_{p \in F} c(p)\,\ln p = 0$，则对每个 $p \in F$ 都有 $c(p) = 0$。
:::

::: proof
结论 1 沿 Lean 文件的骨架进行。按系数的符号把 $S$ 分成不相交的两部分 $A = \{p \in S : k(p) \ge 0\}$ 与 $B = \{p \in S : k(p) < 0\}$，把 $B$ 中的项移到等号另一边，得到两个非负整数系数的对数和相等：

$$
\sum_{p \in A} k(p)\,\ln p \;=\; \sum_{p \in B} \bigl(-k(p)\bigr)\ln p .
$$

两边取指数（素数为正，`Real.exp_log` 适用），得到实数等式 $\prod_{p \in A} p^{k(p)} = \prod_{p \in B} p^{-k(p)}$，再把它降回自然数之间的等式。对 $q \in A$，左边的素因子分解在 $q$ 处的指数是 $k(q)$；右边只含 $B$ 中的素数，而 $q \notin B$，那里的指数是 $0$（`Nat.factorization`）。于是 $k(q) = 0$；对 $B$ 中的素数同理。结论 2：[`prime_log_integer_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_integer_independence) 把有限个素数的集合嵌回 $\mathbb{N}$，由结论 1 得到 $\mathbb{Z}$ 上的线性无关；Mathlib 的 `LinearIndependent.iff_fractionRing` 再从 $\mathbb{Z}$ 过渡到它的分式域 $\mathbb{Q}$。在纸面上，这一步就是把有理系数乘以公分母，化成整数系数。完整证明由 Lean 内核检查。
:::

把结论 1 用在任意两个不同的素数 $p \neq q$ 上，开头的论证便推广到任意两只素数时钟（手工推导）：若某个 $t \neq 0$ 使 $t\ln p = 2\pi a$、$t\ln q = 2\pi b$，同样消去 $t$ 得 $b\ln p - a\ln q = 0$；取 $S = \{p, q\}$、$k(p) = b$、$k(q) = -a$，结论 1 给出 $a = b = 0$，于是 $t = 0$，矛盾。**两只素数时钟一旦从十二点出发，就再也不会同时回到十二点。**同理，两只钟的周期之比 $\ln q/\ln p$ 是无理数：若它等于 $m/n$（$n \neq 0$），则 $n\ln q - m\ln p = 0$，结论 1 迫使 $n = 0$。两个周期不可公度。

::: {.example #ex-prime-clock-commas title="几乎对齐的素数时钟：调音中的四个音差"}
把时钟 $p$ 的读数 $p^{-it}$ 自乘 $k_p$ 次（$k_p$ 为整数，负数表示倒着数），再把几只钟的结果乘起来，得到一只**合成指针**：

$$
\prod_{p} \bigl(p^{-it}\bigr)^{k_p} \;=\; \Bigl(\frac{A}{B}\Bigr)^{-it} \;=\; e^{-it\ln(A/B)},
$$

其中 $A = \prod_{k_p > 0} p^{k_p}$，$B = \prod_{k_p < 0} p^{-k_p}$。它以角速度 $\ln(A/B) = \sum_p k_p \ln p$ 旋转。[@thm-prime-log-independence] 说：只要系数不全为零，合成指针就不会静止。但它可以转得很慢。调音师熟悉下面这些整数组合，它们是纯五度 $3/2$、纯律大三度 $5/4$ 与八度 $2$ 之间的“音差”。各数四舍五入到所示位数：

| 来历 | $(k_2, k_3, k_5)$ | $A/B$ | $\ln(A/B)$ | 转一圈的时间 $2\pi/\ln(A/B)$ |
| :--- | :---: | :---: | :---: | :---: |
| 十二个纯五度对七个八度（毕达哥拉斯音差） | $(-19, 12, 0)$ | $\frac{3^{12}}{2^{19}}$ | $0.0135510$ | $463.67$ |
| 四个纯五度对两个八度加一个大三度 | $(-4, 4, -1)$ | $\frac{3^{4}}{2^{4} \cdot 5}$ | $0.0124225$ | $505.79$ |
| 第一行除以第二行 | $(-15, 8, 1)$ | $\frac{3^{8} \cdot 5}{2^{15}}$ | $0.0011285$ | $5567.67$ |
| 一个八度对三个大三度 | $(7, 0, -3)$ | $\frac{2^{7}}{5^{3}}$ | $0.0237165$ | $264.93$ |

第一行就是开头那次“差一点对齐”：$12\ln 3 - 19\ln 2 \approx 0.01955 \times \ln 2$，合成指针每 $463.67$ 个时间单位才转一圈。每一行的 $A$ 与 $B$（分子与分母）正是 Lean 证明中按系数符号分开的两半，由互不相交的素数组成，所以不可能相等：$3^{12} = 531441$ 是奇数而 $2^{19} = 524288$ 是偶数，$3^{4} = 81$ 不含因子 $2$ 与 $5$，其余两行同理。

定理只说 $\ln(A/B) \neq 0$，不给下限；证明里却藏着一个粗糙的下限（手工推导）：$A \neq B$ 是正整数，至少相差 $1$，所以 $\lvert\ln(A/B)\rvert \ge \ln\bigl(1 + 1/\min(A, B)\bigr)$。第二行 $81 = 80 + 1$ 恰好取到这个下限。$A$ 与 $B$ 随指数增长得飞快，这个下限也就迅速变小；它也只是下限，真实的转速并不随 $A$、$B$ 的大小单调变化：第三行用到的 $2$ 与 $3$ 的幂次都比第一行低（只多了一个因子 $5$），合成指针却慢了约 $12$ 倍。
:::

**不对齐，不等于走遍。** 永不重新对齐只说明联合读数回不到出发点；它们能不能靠近环面上**任意**指定的一组读数？先只看一只钟，并像频闪灯那样每隔 $2\pi$ 个时间单位闪一次光。闪光时刻 $t = 2\pi m$ 恰是角频率为 $1$ 的参照钟 $e^{-it}$（因为 $\ln e = 1$，它就是“数 $e$ 的时钟”）回到十二点的时刻。第 $m$ 次闪光时，时钟 $2$ 已转过 $m\ln 2$ 圈，零头（以圈为单位）依次是 $0.6931$、$0.3863$、$0.0794$、$0.7726$、$0.4657$、$0.1589$、$0.8520$、$0.5452$、$0.2383$、$0.9315$……这些位置永不重复：若第 $m$ 次与第 $m'$ 次的零头相同，则 $(m - m')\ln 2$ 是整数，$\ln 2$ 就成了有理数。下面的引理排除了这种可能。

::: {.lemma #lem-log-natural-irrational title="自然数的对数是无理数" lean="D5/S3/Constants/Irrationality/LogNaturalIrrationality.irrational_log_natCast"}
对每个满足 $n \ge 2$ 的自然数 $n$，实数 $\ln n$ 是无理数（`Irrational (Real.log n)`）：不存在有理数 $q$ 使 $\ln n = q$。
:::

::: proof
若 $\ln n = q$ 为有理数，则 $q > 0$（因为 $n > 1$），可写成 $q = u/v$，$u, v$ 为正整数，于是 $e^{u} = n^{v}$ 是正整数。剩下只需说明：对正整数 $a$，$e^{a}$ 不是有理数。Lean 文件为此借用 Mathlib 中林德曼—魏尔斯特拉斯定理证明的解析部分 `LindemannWeierstrass.exp_polynomial_approx`（只用这条逼近引理，不用超越性结论）：存在常数 $c$，使对每个足够大的素数 $p$，都有不被 $p$ 整除的整数 $z$ 与整系数多项式 $g$，满足 $\lvert z\,e^{a} - p\,g(a)\rvert \le c^{p}/(p-1)!$。若 $e^{a} = u'/v'$，把 $z\,e^{a} - p\,g(a)$ 乘以 $v'$ 得到整数 $z u' - p\,g(a)\,v'$，其绝对值不超过 $v' c^{p}/(p-1)!$，在 $p$ 足够大时小于 $1$，只能为 $0$；于是 $p$ 整除 $z u'$。可是 $p$ 不整除 $z$，又取得比 $u'$ 大，矛盾。完整证明由 Lean 内核检查。
:::

永不重复还不够：要知道闪光读数会落进圆周上的每一段小弧，需要描述幂轨道闭包的定理。

::: {.theorem #thm-torus-power-orbit-closure title="有限维环面上幂轨道的闭包与克罗内克稠密性" lean="D5/S3/Fourier/TorusOrbitClosure.result D5/S3/Fourier/BiquadraticKroneckerTimes.dense_circle_sequence"}
设 $I$ 是有限类型，$\mathbb{T}$ 是复平面上的单位圆周（Mathlib 的 `Circle`），$\mathbb{T}^I$ 带乘积拓扑，乘法与幂都按分量进行。

1. **轨道闭包的刻画**：对一切 $g, z \in \mathbb{T}^I$，$z$ 属于幂轨道 $\{g^n : n = 0, 1, 2, \dots\}$ 的闭包，当且仅当对每个 $k : I \to \mathbb{Z}$，由 $\prod_{j \in I} g_j^{k_j} = 1$ 可推出 $\prod_{j \in I} z_j^{k_j} = 1$。
2. **克罗内克稠密性**：设 $a : I \to \mathbb{R}$ 满足：对任意 $k : I \to \mathbb{Z}$ 与 $m \in \mathbb{Z}$，若 $\sum_{j \in I} k_j\, a_j = m$，则所有 $k_j = 0$。则对每个 $z \in \mathbb{T}^I$，存在自然数序列 $(m_n)_{n \in \mathbb{N}}$，使得当 $n \to \infty$ 时

   $$
   \bigl(e^{2\pi i\, a_j m_n}\bigr)_{j \in I} \;\longrightarrow\; z .
   $$
:::

::: proof
结论 1 的“仅当”一半：每个整特征 $\chi_k(w) = \prod_j w_j^{k_j}$ 是连续同态，它若在 $g$ 上取 $1$，就在每个 $g^n$ 上取 $1$，由连续性在闭包上也取 $1$。“当”一半是实质。正幂轨道的闭包与 $g$ 生成的子群的闭包相同，是一个紧子群 $G$；配上它的哈尔概率测度，比较连续函数在 $G$ 上与在平移 $zG$ 上的平均。对整特征 $\chi_k$：若 $\chi_k(g) = 1$，假设给出 $\chi_k(z) = 1$，两个平均相等；若 $\chi_k(g) \neq 1$，哈尔测度在平移 $g$ 下不变，迫使 $\chi_k$ 在 $G$ 上的平均为 $0$，两边都是 $0$。三角多项式在环面的连续函数中稠密，所以对一切连续函数两个平均都相等。若 $z \notin G$，乌雷松引理给出一个在 $G$ 上为 $0$、在 $zG$ 上为 $1$ 的连续函数，两个平均分别是 $0$ 与 $1$，矛盾。结论 2：取 $g_j = e^{2\pi i a_j}$，则 $\prod_j g_j^{k_j} = e^{2\pi i \sum_j k_j a_j}$，它等于 $1$ 当且仅当 $\sum_j k_j a_j$ 是整数，由假设此时 $k = 0$；于是结论 1 的右端对每个 $z$ 成立，$z$ 在轨道闭包中，再把闭包中的点写成序列的极限。完整证明由 Lean 内核检查。
:::

回到素数时钟（手工推导）。读数 $e^{-i\theta}$ 与角度 $\theta \bmod 2\pi$ 一一对应且双向连续，所以圆周 $\mathbb{T}$ 上的稠密就是角度的稠密。

**一只钟。** 在 [@thm-torus-power-orbit-closure] 结论 2 中取 $I$ 只含一个元素、$a = -\ln n$（$n \ge 2$），则 $e^{2\pi i a m} = e^{-2\pi i m\ln n}$ 正是时钟 $n$ 在第 $m$ 次闪光时的读数。假设要求：$k\ln n = -\ell$（$k, \ell$ 为整数）时 $k = 0$。若 $k \neq 0$，$\ln n = -\ell/k$ 将是有理数，与 [@lem-log-natural-irrational] 矛盾。所以闪光读数在圆周上稠密：时钟 $2$ 的那串零头会落进 $[0, 1)$ 的每一个小区间。

**$K$ 只钟。** 取不同的素数 $p_1, \dots, p_K$，改为每隔 $\tau > 0$ 闪一次光，即取 $a_j = -\tau\ln p_j/(2\pi)$。记 $L_k = \sum_j k_j \ln p_j$，假设要求：整数向量 $k \neq 0$ 时，对一切整数 $\ell$ 都有 $\tau L_k \neq -2\pi \ell$。由 [@thm-prime-log-independence] 结论 1，$k \neq 0$ 时 $L_k \neq 0$，所以使假设失效的 $\tau$ 只能是可数个数 $-2\pi \ell/L_k$ 之一；$(0, \infty)$ 不可数，满足假设的 $\tau$ 便存在。对这样的 $\tau$，闪光读数已在 $K$ 维环面上稠密，连续时间 $t \ge 0$ 的整条轨道更是如此：联合相位 $(t\ln p_1 \bmod 2\pi,\, \dots,\, t\ln p_K \bmod 2\pi)$ 稠密地缠满整个环面 $(\mathbb{R}/2\pi\mathbb{Z})^K$。这就是克罗内克（L. Kronecker, 1884）逼近定理的连续时间形式在素数时钟上的特例。注意分寸：$\tau$ 的存在来自可数性论证，推导没有给出一个具体的 $\tau$，也没有说要等多久才能把读数带到指定的误差之内。

更进一步，如果我们像[序曲](README.md)和[第二十一章](ch21-diagonalization-and-escape.md)讨论“有限门计数多面体”与“有限阶泰勒余项 $R_{2N}(\theta)$”那样，只用**前 $K$ 个素数** $\{p_1, p_2, \dots, p_K\}$ 搭建一座有限维的“**算术多面体素数筛**”，会发生什么？让我们在下面的具体算例中亲手展开前三个素数 $p \in \{2, 3, 5\}$，看看漏网的第一个余项是谁！

::: {.example #ex-prime-log-orthogonality-and-sieve title="前三个素数 (2, 3, 5) 的欧拉乘积有限筛展开与首项漏网素数 7（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下述半平面 $\operatorname{Re}(s) > 1$ 上的截断欧拉乘积余项展开及 $s = 2$ 处引用的欧拉巴塞尔恒等式 $\zeta(2) = \frac{\pi^2}{6}$（另参 [@ex-xi-mirror-values] 与 [@rem-euler-zeta-literature]）属经典解析数论文献算例，未作为独立定理包含在本书锁定的形式化声明集中。

设 $\operatorname{Re}(s) > 1$，取前 $K = 3$ 个素数 $p_1 = 2, p_2 = 3, p_3 = 5$（即只开启 $\ln 2, \ln 3, \ln 5$ 三根正交算术轴），计算截断欧拉乘积 $P_{\le 5}(s)$：

$$
\begin{aligned}
P_{\le 5}(s)
&= (1 - 2^{-s})^{-1}(1 - 3^{-s})^{-1}(1 - 5^{-s})^{-1} \\
&= \bigl(1 + 2^{-s} + 4^{-s} + 8^{-s} + \cdots\bigr)\bigl(1 + 3^{-s} + 9^{-s} + \cdots\bigr)\bigl(1 + 5^{-s} + \cdots\bigr) \\
&= 1 + 2^{-s} + 3^{-s} + 4^{-s} + 5^{-s} + 6^{-s} + 8^{-s} + 9^{-s} + 10^{-s} + 12^{-s} + \cdots
\end{aligned}
$$

现在，拿完整的黎曼 $\zeta(s) = \sum_{n=1}^\infty n^{-s}$ 减去这座三维素数多面体 $P_{\le 5}(s)$。在 $1$ 到 $10$ 之间，$1, 2, 3, 4 = 2^2, 5, 6 = 2\times 3, 8 = 2^3, 9 = 3^2, 10 = 2\times 5$ 被悉数抵消，唯独漏掉了谁？**首项漏网的恰恰是第四个素数 $7^{-s}$！** 在整个绝对收敛半平面 $\operatorname{Re}(s) > 1$ 上，严格写出有限素数筛的截断余项狄利克雷级数 $R_{> p_K}(s)$（其中 $P^+(n)$ 表示 $n$ 的最大素因子）：

$$
R_{> p_K}(s) \;:=\; \zeta(s) - \prod_{k=1}^K (1 - p_k^{-s})^{-1} \;=\; \sum_{\substack{n \ge 2 \\ P^+(n) > p_K}} n^{-s} \;=\; p_{K+1}^{-s} + \cdots
$$

由于其首项狄利克雷系数（在 $n = p_{K+1}$ 处为 $1$）非零，$R_{> p_K}(s)$ 作为半平面 $\operatorname{Re}(s) > 1$ 上的解析狄利克雷级数恒不等于零函数；特别地，**对一切实指数 $s \in (1, \infty)$**，级数中每一项被遗漏的 $n^{-s} > 0$ 均为严格正实数，不可能发生复相位相消（而在一般复点 $s = \sigma + it, t \neq 0$ 处，不同项的旋转相位 $n^{-it}$ 可能发生局部相消），从而在实半轴 $s > 1$ 上逐点严格成立

$$
R_{> p_K}(s) \;>\; p_{K+1}^{-s} \;>\; 0 \qquad (\forall s \in \mathbb{R},\; s > 1).
$$

在实数点 $s = 2$（$s > 1$）处做一次精确数值核验：已知欧拉巴塞尔恒等式 $\zeta(2) = \frac{\pi^2}{6} \approx 1.644934$，而前三个素数的有限乘积给出

$$
P_{\le 5}(2) = \frac{1}{1 - 1/4}\cdot\frac{1}{1 - 1/9}\cdot\frac{1}{1 - 1/25} = \frac{4}{3}\times\frac{9}{8}\times\frac{25}{24} = \frac{25}{16} = 1.5625.
$$

两者的严格正截断差值 $R_{> 5}(2) = \zeta(2) - P_{\le 5}(2) \approx 0.082434 > 0$，其领头项恰恰是第四根正交素数轴投下的平方反比权重 $7^{-2} = \frac{1}{49} \approx 0.020408$（紧接着是 $11^{-2} = \frac{1}{121} \approx 0.008264$、$13^{-2} = \frac{1}{169} \approx 0.005917$ 与混合合数项 $14^{-2} = (2\times 7)^{-2} = \frac{1}{196} \approx 0.005102$）！
:::

::: {.viz src="euler-product-sieve" preset="five" height="500"}
**漏网的第一个是 7。** 清单是 $2, 3, 5$：青色格子 $1, 2, 3, 4, 5, 6, 8, 9, 10, 12, \dots$ 是乘积展开出来的项，$7$ 是第一个品红格。在 $s = 2$ 处青色曲线是 $\frac{25}{16} = 1.5625$，墨色的 $\zeta(2) = 1.6449$；放大镜把缺口 $0.0824$ 自下而上拆成 $7^{-2}$、$11^{-2}$、$13^{-2}$ 和更薄的一段段，每一段是一个品红格的 $n^{-2}$。
:::

::: {.viz src="euler-product-sieve" preset="remainder" height="500"}
**余项垫底的总是 $7^{-s}$。** 清单仍是 $2, 3, 5$，琥珀色竖线从 $s = 4$ 扫到 $s = 1.3$：品红的缺口越来越宽，放大镜里最底下的一段始终是 $7^{-s}$。墨色与青色之间的品红虚线是乘积加上 $7^{-s}$，缺口从不比它窄，即 $R_{>5}(s) > 7^{-s}$（文献结果，页面只在画出的点上数值核对）。
:::

请看 [@ex-prime-log-orthogonality-and-sieve] 与[第二十一章](ch21-diagonalization-and-escape.md)欧几里得—哥德尔逃逸的绝妙同构：只要你只握有有限 $K$ 根素数正交轴 $\{p_1, \dots, p_K\}$，你张成的“算术多面体”就必然在 $n = p_{K+1}$ 处留下一道非恒零的狄利克雷余项裂缝（在全体实数 $s > 1$ 上逐点严格大于 $p_{K+1}^{-s} > 0$）；要想把这道首项裂缝补上，你必须把第 $K+1$ 个素数 $p_{K+1}$ 作为一根全新的正交基准轴并入系统——而素数有无穷多个，因此算术球面在有限截断下永远留有通向更高素数维度的生长之门！

::: {.viz src="euler-product-sieve" preset="thirtyone" height="500"}
**到 31，漏网从 37 起。** 清单是到 $31$ 为止的 $11$ 个素数：$1$ 到 $36$ 全是青色，第一个品红格是 $37$。在 $s = 2$ 处缺口缩到 $0.0102$，放大镜里垫底的仍是 $37^{-2}$：要补上这一段，只能把 $37$ 加进清单。
:::

::: {.viz src="sphere-escape" preset="thirteen" height="500"}
**加一之后不一定是素数。** 清单是 $2, 3, 5, 7, 11, 13$，$Q = 30031$：每只钟的指针都指着 $1$，没有一只指着 $0$。可 $Q = 59 \times 509$ 本身不是素数；欧几里得的论证（文献结果）只说 $Q$ 的素因子都不在清单里，新找到的 $59$ 也不是紧接着的 $17$。
:::

::: {.viz src="euler-product-sieve" height="560"}
欧拉乘积与筛的完整实验室：拖动时间轴加减素数，拖动琥珀色竖线改 $s$，点一个品红格把它的最大素因子放进清单。下方第一张小图里，墨色的 $(s - 1)\zeta(s)$ 走向绿色虚线 $1$（[@lem-riemann-zeta-residue-one]），青色的 $(s - 1)$ 乘以乘积走向 $0$；第二张小图是乘积与 $\zeta(s)$ 相差不到 $1\%$ 所需的素数个数。
:::

> 合数是素数正交轴张成的对角网格；欧拉乘积不过是把纠缠在自然数长线上的无穷和，顺着一根根互不相干的素数主轴正交投影拆解开来。

## 22.4 临界对称轴 $\sigma = 1/2$ 与黎曼猜想的认识论边界 {#sec-ch22-4}

如后文 [@prop-xi-zeros-strip-zeros] 及其后的一行手工推导所示，$\zeta(s)$ 在欧拉乘积绝对收敛半平面 $\operatorname{Re}(s) > 1$（乃至直线 $\operatorname{Re}(s) = 1$ 上）没有零点，而越过 $s = 1$ 一阶极点（其留数定理已冻结为上文 [@lem-riemann-zeta-residue-one]）向**临界带** $0 < \operatorname{Re}(s) < 1$ 解析延拓后，级数与欧拉乘积不再直接绝对收敛，无穷多只素数相位指针 $p^{-\sigma} e^{-it\ln p}$ 的叠加会在特定的复频率 $\rho = \sigma + it$ 处发生相消归零：$\zeta(\rho) = 0$！

为什么所有已被算出的非平凡零点，全都像被无形的几何准星锁死了一样，齐刷刷地排列在实部恰好等于二分之一的**临界线（critical line）** $\operatorname{Re}(s) = \frac{1}{2}$（即 Lean 模块 `D5/S3/Weil/Convention` 中定义的自对偶横坐标 [`criticalAbscissa`](lean:D5/S3/Weil/Convention.criticalAbscissa) $= 1/2$）上？

在直观的物理与几何图像中，完备化黎曼函数 $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)$ 满足精确的泛函反射对称方程 $\xi(s) = \xi(1 - s)$。在复平面上，映射 $s \mapsto 1 - s$ 与复共轭联手，以垂直线 $\operatorname{Re}(s) = \frac{1}{2}$ 为镜像对称轴（恰似量子力学里连接正演振幅与伴随振幅的幺正平衡中线，又似泊松求和公式中空间尺度与动量频率尺度的傅里叶自对偶不动线）。

上一段把反射对称 $\xi(s) = \xi(1 - s)$ 当作直观图像引用。这条对称性本身不是猜想，也不必停留在文献层面：所钉仓库的模块 `D5/S3/Zeros/CompletedZeta` 把它连同 $\xi$ 的整函数性一并冻结了。

::: {.definition #def-xi-reading title="完备 ζ 读数与去极点的 ξ 读数" lean="D5/S3/Zeros/CompletedZeta.completedZetaReading D5/S3/Zeros/CompletedZeta.xiReading"}
在模块 `CompletedZeta` 中：

1. **完备 $\zeta$ 读数** [`completedZetaReading`](lean:D5/S3/Zeros/CompletedZeta.completedZetaReading) $s$ 定义为 Mathlib 的 `completedRiemannZeta s`，即 $\Lambda(s) = \pi^{-s/2}\,\Gamma(s/2)\,\zeta(s)$ 的全纯延拓（在 $s = 0$ 与 $s = 1$ 处按 Mathlib 的约定取值）；
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

镜子的位置 $\operatorname{Re}(s) = \frac{1}{2}$ 已由 [@thm-xi-reading-entire-reflection] 的内核证明锁定；所有非平凡零点是否都站在镜面上，则仍然是本节末尾那条开放猜想。

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

[@thm-cayley-critical-line-criterion] 的结论 2 是黎曼猜想的一种**等价改写，不是证明**：它把“零点在一条直线上”换成“零点在一个圆上”，猜想本身仍然开放。还有一处措辞要对齐：结论 2 沿用 Mathlib 对“非平凡零点”的刻画，即既不是 $-2(n+1)$、也不等于 $1$ 的零点；[@conj-riemann-hypothesis] 说的却是临界带 $0 < \operatorname{Re}(s) < 1$ 内的零点。两种说法是不是同一个猜想，取决于 $\zeta$ 在临界带之外哪里可能为零。先看最容易手算的一条线：实轴。

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

::: {.theorem #thm-right-half-strip-rh-forms title="黎曼猜想只需检查右半带；Mathlib 的非平凡零点都在临界带内，两种表述等价" lean="D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh D5/S3/Zeros/ActualZeroGeometry.rh_iff_nontrivial_zeros_on_line D5/S3/Weil/Mertens/Cryptids/VonMangoldtCount/Foundation.mem_criticalStrip_of_isNontrivialZetaZero"}
记 `RiemannHypothesis` 为 Mathlib 的命题（内容见 [@thm-cayley-critical-line-criterion] 结论 2），$\zeta$ 是 `riemannZeta`。

1. **右半带归约**：若不存在 $\rho \in \mathbb{C}$ 同时满足 $\zeta(\rho) = 0$ 与 $\frac{1}{2} < \operatorname{Re}(\rho) < 1$，则 `RiemannHypothesis` 成立。
2. **两种表述等价**：`RiemannHypothesis` 成立，当且仅当对一切 $\rho \in \mathbb{C}$，若 $\zeta(\rho) = 0$ 且 $0 < \operatorname{Re}(\rho) < 1$，则 $\operatorname{Re}(\rho) = \frac{1}{2}$。
3. **Mathlib 的非平凡零点都在临界带内**：对一切 $\rho \in \mathbb{C}$，若 $\zeta(\rho) = 0$，且不存在自然数 $n$ 使 $\rho = -2(n + 1)$，且 $\rho \neq 1$，则 $0 < \operatorname{Re}(\rho) < 1$。
:::

::: proof
结论 1：任取 Mathlib 意义下的非平凡零点 $\rho$（不是 $-2(n+1)$，也不是 $1$），设 $\operatorname{Re}(\rho) \neq \frac{1}{2}$，按实部分四种情形导出矛盾。$\operatorname{Re}(\rho) \ge 1$：与 Mathlib 的“$\zeta$ 在该半平面无零点”矛盾。$\frac{1}{2} < \operatorname{Re}(\rho) < 1$：与假设矛盾。$0 < \operatorname{Re}(\rho) < \frac{1}{2}$：Mathlib 的函数方程 $\zeta(1 - \rho) = 2\,(2\pi)^{-\rho}\,\Gamma(\rho)\cos\bigl(\tfrac{\pi\rho}{2}\bigr)\,\zeta(\rho)$ 给出 $\zeta(1 - \rho) = 0$，而 $1 - \rho$ 落在右半带内，仍与假设矛盾。$\operatorname{Re}(\rho) \le 0$：先由 $\zeta(0) = -\frac{1}{2}$ 知 $\rho \neq 0$；令 $t = 1 - \rho$，则 $\operatorname{Re}(t) \ge 1$，函数方程把 $\zeta(\rho) = \zeta(1 - t)$ 写成 $2\,(2\pi)^{-t}\,\Gamma(t)\cos\bigl(\tfrac{\pi t}{2}\bigr)\,\zeta(t)$；其中 $(2\pi)^{-t}$、$\Gamma(t)$、$\zeta(t)$ 都不为零，只能 $\cos\bigl(\tfrac{\pi t}{2}\bigr) = 0$，即 $t = 2k + 1$，$k \ge 0$ 为整数，于是 $\rho = -2k$，而 $\rho \neq 0$ 迫使 $\rho = -2(n+1)$，与“非平凡”矛盾（这一步在模块 `RightHalfStripRiemannReduction` 中是一条私有辅助引理）。结论 2 的正向：临界带内的零点实部大于 $0$，不是 $-2(n+1)$；实部小于 $1$，也不是 $1$；`RiemannHypothesis` 直接适用。反向：右半带内的零点属于临界带，按假设实部为 $\frac{1}{2}$，与实部大于 $\frac{1}{2}$ 矛盾，再用结论 1。结论 3 在另一个冻结模块中证明，用的正是结论 1 首尾两种情形的论证：实部小于 $1$，因为 Mathlib 的 $\zeta$ 在 $\operatorname{Re}(s) \ge 1$ 上无零点；实部大于 $0$，因为若 $\operatorname{Re}(\rho) \le 0$，上面对 $t = 1 - \rho$ 使用函数方程的推理会迫使 $\rho = -2(n+1)$，与假设矛盾。在那个模块里，这一步是公开的冻结定理。完整证明由 Lean 内核检查。
:::

结论 1 就是本节的镜像图像：函数方程把左半带 $0 < \operatorname{Re}(s) < \frac{1}{2}$ 中的零点 $\rho$ 送到右半带的 $1 - \rho$，所以只需守住镜子的一侧。以后文 [@ex-quartic-mock-quartet] 的伪造四点组为例，左半带的 $\tfrac{1}{4} + 14i$ 在 $s \mapsto 1 - s$ 下落到右半带的 $\tfrac{3}{4} - 14i$。（Lean 证明用的是 Mathlib 关于 $\zeta$ 本身的函数方程，不是 [@thm-xi-reading-entire-reflection] 的 $\xi$ 反射；两者描述的是同一个对称 $s \mapsto 1 - s$。）结论 3 回答了开头那个措辞问题：Mathlib 意义下的非平凡零点都在临界带内；反过来，临界带内的零点实部严格介于 $0$ 与 $1$ 之间，既不是 $-2(n+1)$，也不是 $1$（一行手工推导）。两种说法圈出的是同一组零点。结论 2 的右端就是 [@conj-riemann-hypothesis] 中的公式，所以 Mathlib 的 `RiemannHypothesis`、[@thm-cayley-critical-line-criterion] 的径向形式与本节末尾的猜想框是同一个命题的三种等价写法。它们都是**改写与归约，不是证明**：黎曼猜想仍然开放。

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

上半平面里虚部最小的零点是 $t_1$，所以上半平面的全部非平凡零点（如果黎曼猜想成立）都挤在单位圆上辐角不超过 $4.06^\circ$ 的一小段弧里，并向 $w = 1$ 聚拢；下半平面的零点是它们的共轭。

**几个参照点。** $s = 2 \mapsto w = \frac{1}{2}$（圆内），它的反射像 $s = -1 \mapsto w = 2$（圆外），两者互为倒数；$s = 1 \mapsto w = 0$；$s = \frac{1}{2} \mapsto w = -1$。

**离线的点。** 取 $s = 0.6 + 14i$：$|w|^2 - 1 = \dfrac{1 - 1.2}{0.36 + 196} = -1.0185\times10^{-3}$，$|w| = 0.999491$。它的镜像 $1 - \overline{s} = 0.4 + 14i$：$|w|^2 - 1 = \dfrac{1 - 0.8}{0.16 + 196} = +1.0196\times10^{-3}$，$|w| = 1.000510$。两个模的乘积为 $1$，与反演一致。在高度 $14$ 处偏离临界线 $0.1$，只让凯莱比的模偏离 $1$ 约万分之五：高处的临界带在 $w$ 坐标里被压成贴着圆周的一层薄膜。
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

所以，证明黎曼猜想所需要的信息必然来自这两种对称性之外。这句话由 [@thm-full-symmetry-not-localization] 保证；至于那份额外的信息是什么——例如本章前半部分的欧拉乘积所携带的算术结构——本书不作断言。

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

[@thm-off-line-zero-robin-violation] 是蕴含式，不断言离线零点存在。它与本节的对称性合起来，可以手工推出：**若对每个 $n > 5040$ 都有 $\sigma(n)/n < e^{\gamma}\ln\ln n$，则 [@conj-riemann-hypothesis] 成立。** 理由（手工推导）：若猜想不成立，就有临界带内的零点 $\rho$ 满足 $\operatorname{Re}(\rho) \neq \frac{1}{2}$。在临界带内，$\zeta$ 的零点就是 $\xi$ 的零点（因子 $\frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)$ 在那里不为零），所以由 [@thm-xi-reading-entire-reflection] 之后讲过的四点一组，$\rho,\ \overline{\rho},\ 1 - \rho,\ 1 - \overline{\rho}$ 都是非平凡零点，其中至少一个满足 $\operatorname{Re} > \frac{1}{2}$ 且 $\operatorname{Im} \ge 0$；冻结结论 [`actual_height_gt_ten`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_height_gt_ten) 又排除了 $\operatorname{Im} = 0$。于是 [@thm-off-line-zero-robin-violation] 给出一个违反罗宾不等式的 $N > 5040$。反方向不在本书的冻结范围内（见 [@rem-robin-criterion-literature]），而“罗宾不等式对一切 $n > 5040$ 成立”本身与黎曼猜想一样仍是开放的：[@thm-robin-at-most-eight-primes] 只检验了 $\omega(n) \le 8$ 的片段。

定理中的界是显式的，却大得无法用来搜索。把 [@ex-cayley-unit-circle-zeros] 里的试验点 $0.6 + 14i$ 的坐标代入公式看量级（并不假定那里有零点）：$\delta = 0.1$，$D = 24$，$m_0 = 5760000$，$m_1 = 1.65888\times10^{10}$；峰的位置 $A \ge e^{23040000}$，以十进制写出要一千万位以上；$N$ 的上界 $\exp(B_0\ln B_0)$ 中 $\ln B_0 = 4(28m_1 + 20)^2 \approx 8.62990\times10^{23}$。定理保证违反者存在，却不给出一个可以实际执行的检验。

**尺子从哪里来。** 罗宾尺子 $e^{\gamma}\ln\ln n$ 的形状与常数，在所钉仓库中也有冻结的依据。格朗沃尔定理（T. H. Gronwall, 1913）的两条包络冻结为 [`gronwall_envelopes`](lean:D5/S3/Weil/GronwallLowerEnvelope.gronwall_envelopes)：对每个实数 $\varepsilon > 0$，

1. 存在 $N$，使一切自然数 $n \ge N$ 都满足 $\dfrac{\sigma(n)}{e^{\gamma}\,n\ln\ln n} \le 1 + \varepsilon$；
2. 对每个 $N$，都有自然数 $n \ge N$ 满足 $\dfrac{\sigma(n)}{e^{\gamma}\,n\ln\ln n} \ge 1 - \varepsilon$。

由此手工推出：把尺子的常数 $e^{\gamma}$ 换成任何更小的正数 $c$，第 2 条（取 $\varepsilon$ 使 $(1 - \varepsilon)e^{\gamma} > c$）就给出任意大的违反者；换成任何更大的 $c$，第 1 条就说不等式从某处起总成立。罗宾不等式问的恰是不留 $\varepsilon$ 余地的常数 $e^{\gamma}$ 本身，而且要求从 $5040$ 之后就成立。在 Lean 中，上包络的证明以一个截断把 $n$ 的素因子分成大小两组，小素数一侧补齐成截断以下的全部素数轴，再用同样已冻结的梅尔滕斯第三定理 [`E₃.bound''`](lean:D5/S3/Weil/Mertens/Third.E₃.bound'') 估计：当实数 $x \to \infty$ 时 $\prod_{p \le x}(1 - 1/p) \sim e^{-\gamma}/\ln x$；取倒数（手工推导），灌满 $x$ 以下全部素数轴的饱和值 $\prod_{p \le x}(1 - 1/p)^{-1}$ 渐近于 $e^{\gamma}\ln x$。下包络则取素数阶乘的幂作为见证。

::: {.remark #rem-robin-criterion-literature title="罗宾判据（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** **罗宾判据**（G. Robin, 1984）：黎曼猜想成立，当且仅当对一切 $n > 5040$ 有 $\sigma(n)/n < e^{\gamma}\ln\ln n$。其中“不等式蕴含猜想”的方向，在本书中可由 [@thm-off-line-zero-robin-violation] 与本节的对称性手工推出（见上文）；“猜想蕴含不等式”的方向没有以这一形式冻结在所钉仓库中。
:::

然而，直觉的优美绝不能替代证明的严酷。遵循本书第三层认识论契约（`OPEN`），我们将这一尚未解决的千年数学难题庄重地单列为开放猜想环境（不携带任何 `lean` 属性），并在紧随其后的文献注记中严格划定本书形式化定理与经典解析数论文献的边界。

::: {.conjecture #conj-riemann-hypothesis title="黎曼猜想（Riemann Hypothesis）"}
经解析延拓后的黎曼 $\zeta$ 函数 $\zeta(s)$ 的每一个非平凡零点（即位于临界带 $0 < \operatorname{Re}(s) < 1$ 内的零点 $\rho \in \mathbb{C}$）均位于临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 上：

$$
\forall \rho \in \mathbb{C},\qquad \bigl(0 < \operatorname{Re}(\rho) < 1 \;\land\; \zeta(\rho) = 0\bigr) \;\Longrightarrow\; \operatorname{Re}(\rho) = \frac{1}{2}.
$$

（本条目为**尚未解决的开放猜想**，故依规不附加 `lean` 形式化属性。）
:::

::: {.remark #rem-euler-zeta-literature title="Re(s) > 1 形式化恒等式与解析延拓、泛函方程及零点分布的边界审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 为严守三层认识论诚实标准，读者在阅读本章时须明确区分以下三个层次：

1. **已由本书所钉 Lean 内核验证的冻结定理（第一层 `LEAN ✓`）**：本章的十七条正式结论——$s = 1$ 处的单位留数极限（[@lem-riemann-zeta-residue-one]）、半平面 $\operatorname{Re}(s) > 1$ 上的狄利克雷级数恒等式（[@prop-riemann-zeta-dirichlet-sum]）、半平面 $\operatorname{Re}(s) > 1$ 上的欧拉素数乘积恒等式（[@thm-riemann-zeta-euler-product]）两者的直接相等（[@cor-dirichlet-sum-eq-euler-product]），素数对数在整数与有理数上的线性无关（[@thm-prime-log-independence]）、自然数对数的无理性（[@lem-log-natural-irrational]）、有限维环面幂轨道的闭包与克罗内克稠密性（[@thm-torus-power-orbit-closure]），$\xi$ 读数的整函数性、反射对称 $\xi(1 - s) = \xi(s)$ 与端点值（[@thm-xi-reading-entire-reflection]）、$\zeta$ 与 $\xi$ 的共轭协变（[@prop-zeta-conjugation-covariance]）、凯莱单位圆判据与黎曼猜想的径向等价形式（[@thm-cayley-critical-line-criterion]）、交错部分和收敛到 $(1 - 2^{1-s})\,\zeta(s)$（[@lem-alternating-zeta-partial-sums]）、$\zeta$ 在实轴上的符号与实零点（[@prop-zeta-real-axis-sign]）、$\xi$ 读数的零点恰是临界带内的 $\zeta$ 零点以及完备 $\zeta$ 在 $\operatorname{Re}(s) \ge 1$ 上不为零（[@prop-xi-zeros-strip-zeros]）、右半带归约与 Mathlib 表述和临界带表述的等价（[@thm-right-half-strip-rh-forms]）、完全对称性不蕴含定线局域化的四次反例（[@thm-full-symmetry-not-localization]）、至多八根素数轴上以及 $5040 < n < 223092870$ 范围内的罗宾不等式（[@thm-robin-at-most-eight-primes]），以及临界线右侧的零点迫使某个 $\operatorname{lcm}(1, \dots, \lfloor t\rfloor)$ 违反罗宾不等式（[@thm-off-line-zero-robin-violation]）——严格成立。注意欧拉乘积仅在 Lean 假设显式给出的绝对收敛半平面 `1 < s.re`（$\operatorname{Re}(s) > 1$）内被调用与核验。
2. **经典解析数论文献定理（第二层，已有严格纸面证明但未在本书形式化）**：
   - **黎曼解析延拓与平凡零点（Riemann, 1859）**：$\zeta(s)$ 可全纯延拓至 $\mathbb{C} \setminus \{1\}$，负偶数 $s = -2, -4, -6, \dots$ 为平凡零点（[@rem-zeta-zero-free-region-literature]）。（“临界带 $0 < \operatorname{Re}(s) < 1$ 之外没有其他零点”已不在这一层：它由 [@thm-right-half-strip-rh-forms] 的结论 3 与 [@prop-xi-zeros-strip-zeros] 之后的一行手工推导给出，实轴上的情形见 [@prop-zeta-real-axis-sign]。）（完备化函数 $\xi$ 的整函数性、反射对称 $\xi(s) = \xi(1 - s)$ 与共轭对称 $\xi(\overline{s}) = \overline{\xi(s)}$ 已不在这一层：它们由 [@thm-xi-reading-entire-reflection] 与 [@prop-zeta-conjugation-covariance] 借助 Mathlib 的完备 $\zeta$ 给出。）
   - **由边界线 $\operatorname{Re}(s) = 1$ 无零点到素数定理（Hadamard, de la Vallée Poussin, 1896）**：$\zeta(1 + it) \neq 0$（$t \neq 0$；$t = 0$ 即 $s = 1$ 处为一阶极点）本身已不在这一层，它由 [@prop-xi-zeros-strip-zeros] 经一行手工推导得到；由它通过围道积分或陶伯（Tauberian）定理导出素数定理 $\pi(x) \sim \frac{x}{\ln x}$ 的这一步，本书没有引用冻结声明；
   - **显式公式（von Mangoldt, Weil）**：将素数幂对数权重 $\Lambda(n)$ 的求和与 $\zeta(s)$ 非平凡零点 $\rho$ 的频谱求和通过对偶傅里叶变换联系起来。（它的一种积分形式已不在这一层：所钉仓库冻结了 [`actual_integrated_explicit_formula`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula)，即对每个实数 $y > 0$，按重数遍历全体非平凡零点的和 $\sum_{\rho} e^{\rho y}/(\rho(1 - \rho))$ 等于 $U(e^y) - \ln(2\pi) + \sum_{n \ge 1} e^{-2ny}/(2n(2n + 1))$，其中 $U$ 见 [@def-divisor-ratio-mertens-error]；[@thm-off-line-zero-robin-violation] 的证明用到它。）
3. **开放猜想（第三层 `OPEN`）**：[@conj-riemann-hypothesis]（黎曼猜想）断言所有非平凡零点均满足 $\operatorname{Re}(\rho) = 1/2$（等价于素数计数误差项满足平方根界 $\pi(x) = \operatorname{Li}(x) + O(x^{1/2}\ln x)$）。本章的冻结定理证明了 $\operatorname{Re}(s) > 1$ 内的级数—乘积分解、$s = 1$ 留数以及 $\xi$ 的反射对称，**并不证明黎曼猜想**：反射对称只说明零点关于 $s = \frac{1}{2}$ 成对出现，不说明它们落在临界线上；[@thm-cayley-critical-line-criterion] 只是把猜想等价地改写到单位圆上；[@thm-right-half-strip-rh-forms] 只是把猜想归约到右半带，并说明 Mathlib 的表述与临界带表述等价；[@thm-full-symmetry-not-localization] 则表明仅凭反射与共轭两种对称性不可能推出它；[@thm-off-line-zero-robin-violation] 只把一个离线零点变成罗宾不等式的反例，并不排除离线零点。
:::

从[第二十一章](ch21-diagonalization-and-escape.md)的概念余纤维到本章的素数正交基，我们看到了整数 $\mathbb{Z}$ 与素数在离散乘法世界里的精密刚性。可是，如果把整数 $\mathbb{Z}$ 放进看似稠密平滑、任意两点间都能无限平分的有理数大海 $\mathbb{Q}$ 里，我们还能单凭有理数的加法和乘法方程，把离散的整数骨架 $\mathbb{Z} \subset \mathbb{Q}$ 重新打捞并锁定出来吗？为什么这项困扰数学界数十年的可定义性难题，偏偏要靠我们在第 21 章末尾刚刚遇见的**四元数球面范数**与二次型迹投影来上锁？让我们翻开[第二十三章](ch23-diophantine-definability.md)。
