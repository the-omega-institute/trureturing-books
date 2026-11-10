# 第二十二章 素数是算术的正交基：欧拉乘积与黎曼零点

> *“我总感觉量子的本质就是,两两比较,永远一致,顺序无关”*

在[第二十一章](ch21-diagonalization-and-escape.md)中，我们看到任何企图用有限潜坐标封死一切概念的系统，都会被自指对角线顺着法向顶出旧球壳，开启无穷无尽的升维阶梯。现在，让我们把目光投向人类最古老、也最纯粹的一座无穷维大厦——**自然数的乘法算术**——并追问一个直指核心的几何问题：

当我们说“两两比较、永远一致、顺序无关”时，在正整数的乘法世界 $\mathbb{N}_{\ge 1}$ 里，究竟哪些数是真正彼此独立、互不投影的**正交基向量**？

初看之下，自然数 $1, 2, 3, 4, 5, 6, \dots$ 像是一条一维长线上均匀排列的刻度。然而，一旦你从加法切换到乘法，你会发现 $6 = 2 \times 3$ 根本不是一根独立的新方向，它只是方向 $2$ 与方向 $3$ 的合成对角线；$12 = 2^2 \times 3$ 则是沿方向 $2$ 走两步、再沿方向 $3$ 走一步！根据算术基本定理（唯一素因子分解定理），每一个正整数 $n \ge 1$ 都可以唯一地分解为素数幂的乘积，并且**无论你按什么顺序把这些素因子乘起来，结果永远一致、顺序无关**：

$$
n = \prod_{p \in \mathrm{Primes}} p^{v_p(n)} \quad\Longleftrightarrow\quad \ln n = \sum_{p \in \mathrm{Primes}} v_p(n)\,\ln p.
$$

看清上面这对映射的几何结构了吗？唯一素因子分解把每一个正整数 $n$ 嵌入了以形式基向量 $\{\vv{e}_p\}_{p \in \mathrm{Primes}}$ 张成的可数无穷维**形式指数晶格** $\bigoplus_{p \in \mathrm{Primes}} \mathbb{Z}\vv{e}_p$（若赋予这组形式基向量标准正交内积 $\langle \vv{e}_p, \vv{e}_q\rangle = \delta_{pq}$，指数 $v_p(n) \in \mathbb{N}$ 就是整数 $n$ 在第 $p$ 根形式素数轴 $\vv{e}_p$ 上的非负整数坐标）；与此同时，取自然对数给出了作用在该指数晶格上的线性权重泛函 $\ln n = \sum_p v_p(n)\,\ln p$，其中不同素数的对数权重 $\ln 2, \ln 3, \ln 5, \dots$ 在有理数域 $\mathbb{Q}$ 上线性无关——没有任何一根素数轴能在另一根素数轴上投下一丝一毫的有理整除影子（下文所说的“素数正交基轴”，即指这一配备了 $\mathbb{Q}$-线性无关对数权重的形式指数坐标晶格几何）。

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

## 22.3 有限素数筛的“多面体截断余项”与相位共振手算 {#sec-ch22-3}

让我们把复变量写成 $s = \sigma + it$（其中实部 $\sigma = \operatorname{Re}(s)$ 控制振幅衰减，虚部 $t = \operatorname{Im}(s)$ 控制旋转角频率），看看 [@cor-dirichlet-sum-eq-euler-product] 中的每一个素数因子在几何上究竟在做什么：

$$
p^{-s} = p^{-\sigma - it} = p^{-\sigma} e^{-i t \ln p} = p^{-\sigma}\bigl(\cos(t\ln p) - i\sin(t\ln p)\bigr).
$$

在复平面上，每一个素数 $p$ 都是一只以固有对数频率 $\omega_p = \ln p$ 匀速旋转的**独立相位振子（时钟）**！因为不同素数的对数频率 $\ln 2, \ln 3, \ln 5, \dots$ 在 $\mathbb{Q}$ 上线性无关，这无穷多只素数时钟的旋转周期彼此不可公度（incommensurable）——就像无穷多根彼此正交的陀螺轴，无论时间 $t$ 走多久，它们在单位圆周上的相位角 $(t\ln 2 \bmod 2\pi,\, t\ln 3 \bmod 2\pi,\, \dots)$ 都会按克罗内克（Kronecker）稠密流遍历高维环面！

更进一步，如果我们像[序曲](README.md)和[第二十一章](ch21-diagonalization-and-escape.md)讨论“有限门计数多面体”与“有限阶泰勒余项 $R_{2N}(\theta)$”那样，只用**前 $K$ 个素数** $\{p_1, p_2, \dots, p_K\}$ 搭建一座有限维的“**算术多面体素数筛**”，会发生什么？让我们在下面的具体算例中亲手展开前三个素数 $p \in \{2, 3, 5\}$，看看漏网的第一个余项是谁！

::: {.example #ex-prime-log-orthogonality-and-sieve title="前三个素数 (2, 3, 5) 的欧拉乘积有限筛展开与首项漏网素数 7"}
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

请看 [@ex-prime-log-orthogonality-and-sieve] 与[第二十一章](ch21-diagonalization-and-escape.md)欧几里得—哥德尔逃逸的绝妙同构：只要你只握有有限 $K$ 根素数正交轴 $\{p_1, \dots, p_K\}$，你张成的“算术多面体”就必然在 $n = p_{K+1}$ 处留下一道非恒零的狄利克雷余项裂缝（在全体实数 $s > 1$ 上逐点严格大于 $p_{K+1}^{-s} > 0$）；要想把这道首项裂缝补上，你必须把第 $K+1$ 个素数 $p_{K+1}$ 作为一根全新的正交基准轴并入系统——而素数有无穷多个，因此算术球面在有限截断下永远留有通向更高素数维度的生长之门！

> 合数是素数正交轴张成的对角网格；欧拉乘积不过是把纠缠在自然数长线上的无穷和，顺着一根根互不相干的素数主轴正交投影拆解开来。

## 22.4 临界对称轴 $\sigma = 1/2$ 与黎曼猜想的认识论边界 {#sec-ch22-4}

在半平面 $\operatorname{Re}(s) > 1$ 内，由于欧拉乘积 $\prod_p (1 - p^{-s})^{-1}$ 的每一个因子都不为零且绝对收敛，$\zeta(s)$ 在 $\operatorname{Re}(s) > 1$ 内没有任何零点。然而，当通过解析延拓穿过 $s = 1$ 极点（[@lem-riemann-zeta-residue-one]）、踏入**临界带** $0 < \operatorname{Re}(s) < 1$ 时，级数与欧拉乘积不再直接绝对收敛，无穷多只素数相位时钟 $p^{-\sigma} e^{-it\ln p}$ 的相干叠加开始产生剧烈的相消干涉——在特定的复频率 $\rho = \sigma + it$ 处，所有素数模式的振幅彻底相消归零：$\zeta(\rho) = 0$！

为什么所有已被算出的非平凡零点，全都像被无形的几何准星锁死了一样，齐刷刷地排列在实部恰好等于二分之一的**临界线（critical line）** $\operatorname{Re}(s) = \frac{1}{2}$（即 Lean 模块 `D5/S3/Weil/Convention` 中定义的自对偶横坐标 [`criticalAbscissa`](lean:D5/S3/Weil/Convention.criticalAbscissa) $= 1/2$）上？

在直观的物理与几何图像中，完备化黎曼函数 $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)$ 满足精确的泛函反射对称方程 $\xi(s) = \xi(1 - s)$。在复平面上，映射 $s \mapsto 1 - s$ 与复共轭联手，以垂直线 $\operatorname{Re}(s) = \frac{1}{2}$ 为镜像对称轴（恰似量子力学里连接正演振幅与伴随振幅的幺正平衡中线，又似泊松求和公式中空间尺度与动量频率尺度的傅里叶自对偶不动线）。

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

1. **已由本书所钉 Lean 内核验证的冻结定理（第一层 `LEAN ✓`）**：本章的四条正式结论——$s = 1$ 处的单位留数极限（[@lem-riemann-zeta-residue-one]）、半平面 $\operatorname{Re}(s) > 1$ 上的狄利克雷级数恒等式（[@prop-riemann-zeta-dirichlet-sum]）、半平面 $\operatorname{Re}(s) > 1$ 上的欧拉素数乘积恒等式（[@thm-riemann-zeta-euler-product]）以及两者的直接相等（[@cor-dirichlet-sum-eq-euler-product]）——严格成立。注意欧拉乘积仅在 Lean 假设显式给出的绝对收敛半平面 `1 < s.re`（$\operatorname{Re}(s) > 1$）内被调用与核验。
2. **经典解析数论文献定理（第二层，已有严格纸面证明但未在本书形式化）**：
   - **黎曼解析延拓与泛函方程（Riemann, 1859）**：$\zeta(s)$ 可全纯延拓至 $\mathbb{C} \setminus \{1\}$，其完备化函数 $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)$ 为整函数且满足反射对称性 $\xi(s) = \xi(1 - s)$，负偶数 $s = -2, -4, -6, \dots$ 为平凡零点；
   - **边界线 $\operatorname{Re}(s) = 1$ 无零点与素数定理（Hadamard, de la Vallée Poussin, 1896）**：对一切非零实数 $t \in \mathbb{R} \setminus \{0\}$ 均有 $\zeta(1 + it) \neq 0$（而在 $t = 0$ 即 $s = 1$ 处为一阶极点），该边界无零点性通过围道积分或陶伯（Tauberian）定理直接导出素数定理 $\pi(x) \sim \frac{x}{\ln x}$；
   - **显式公式（von Mangoldt, Weil）**：将素数幂对数权重 $\Lambda(n)$ 的求和与 $\zeta(s)$ 非平凡零点 $\rho$ 的频谱求和通过对偶傅里叶变换联系起来。
3. **开放猜想（第三层 `OPEN`）**：[@conj-riemann-hypothesis]（黎曼猜想）断言所有非平凡零点均满足 $\operatorname{Re}(\rho) = 1/2$（等价于素数计数误差项满足平方根界 $\pi(x) = \operatorname{Li}(x) + O(x^{1/2}\ln x)$）。本章的四个冻结定理证明了 $\operatorname{Re}(s) > 1$ 内的级数—乘积分解与 $s = 1$ 留数，**并不证明黎曼猜想**。
:::

从[第二十一章](ch21-diagonalization-and-escape.md)的概念余纤维到本章的素数正交基，我们看到了整数 $\mathbb{Z}$ 与素数在离散乘法世界里的精密刚性。可是，如果把整数 $\mathbb{Z}$ 放进看似稠密平滑、任意两点间都能无限平分的有理数大海 $\mathbb{Q}$ 里，我们还能单凭有理数的加法和乘法方程，把离散的整数骨架 $\mathbb{Z} \subset \mathbb{Q}$ 重新打捞并锁定出来吗？为什么这项困扰数学界数十年的可定义性难题，偏偏要靠我们在第 21 章末尾刚刚遇见的**四元数球面范数**与二次型迹投影来上锁？让我们翻开[第二十三章](ch23-diophantine-definability.md)。
