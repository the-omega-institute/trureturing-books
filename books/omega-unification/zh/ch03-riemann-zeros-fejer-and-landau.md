# 第三章 黎曼零点谱底座：费耶尔碰撞、兰道围道与候选零点窗 {#sec-ou-ch03}

[第二章](ch02-quaternion-clocks-and-haar-zeros.md)用一个极其诱人的结果收尾：借助十九点贝伦德球壳的 $22$ 个有理独立频率，沿密度为 $1/(2\pi)$ 的正黎曼零点子序列做无权平均，即可复现整个标准模型规范群的哈尔积分。然而老练的解析数论学家和物理学家都会在同一秒提出尖锐质疑：**无穷远处的等分布极限是一回事，有限截断高度 $T$ 下的定量相位抵消、四阶碰撞矩与真实零点窗口的选点行为则是另一回事！**

本章正式摊开第一卷最底层的解析数论谱底座，并同时把**形式化证明的疆界**与**有限物理窗的实算证据**放在一张对照图上。我们按四步层层推进：

1. 先明确界定经典黎曼猜想（RH）与狄利克雷广义黎曼猜想（Dirichlet GRH）的**外部形式化事实状态**，并用 Lean 4 冻结定理立起临界线上的费耶尔临界差额与凯莱单位圆判据；
2. 再沿 `trureturing@dev` 冻结的四条核心解析定理，完整走通“调和权配对矩比 $\to$ 倒高度与周期相位亏损 $\to$ 无条件兰道左右竖边积分界 $\to$ 调和加权零点谱的高斯硬碰撞极限 $1/\sqrt{\pi}$”的严密链条，并求出固定原弧模态的截断端点项；
3. 随后把镜头拉进具体的有限零点窗口，展示第 $11431$ 枚零点在 $[10000, 12999]$ 中的中点隔离、费耶尔对角占比、最大额外配对份额与有限观察半径（$111521$ / $111532$），以及第 $8236$ 与第 $8359$ 枚零点如何踏入三物理窗口筛选；
4. 最后毫不粉饰地划出**全局调和平均界**与**单枚零点双钟选点**之间仍未合龙的比较定理鸿沟。

## 3.1 RH 与狄利克雷 GRH 的外部形式化状态及费耶尔—凯莱判据 {#sec-ou-3-1}

按[前言](README.md#rem-ou-epistemic-contract)立下的六层认识论诚实契约，我们在动用任何带 `RiemannHypothesis` 前提的定理之前，先清点它的外部形式化凭证（`EXT-LEAN`）：

- 经典黎曼猜想与狄利克雷广义黎曼猜想的 Lean 形式化主仓库由 Lean 社群维护。[leanprover-community/riemann-hypothesis](https://github.com/leanprover-community/riemann-hypothesis)
- **权威出处与联合认证**：Levent Alpöge 于 2026 年 11 月 20 日公布覆盖经典黎曼猜想（RH）与有理数域 $\mathbb{Q}$ 上全体狄利克雷 $L$ 函数广义黎曼猜想（Dirichlet GRH）的 Lean 4（`v4.33.1`，共 $175{,}187$ 个模块）形式化证明；2026 年 11 月 21 日，Lean FRO 与 Mathlib Initiative 发表[联合声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)，确认经 `comparator` 与 `con-leche --compare` 双重核验，该证明导出的终端命题与纯 Mathlib 陈述 `RiemannHypothesis` 完全一致。
- **独立重放与公理边界**：组织镜像与可复现构建仓库 [`the-omega-institute/riemann-hypothesis`](https://github.com/the-omega-institute/riemann-hypothesis) 的源码静态扫描与公理审计证实全库零 `sorry`、零 `admit`、零自定义公理，公理闭包仅为 Lean 标准三公理 $\{\mathrm{propext}, \mathrm{Classical.choice}, \mathrm{Quot.sound}\}$，并已通过多支独立团队在 `leanchecker`、`lean4lean`、`nanoda` 与 `con-leche` 上的全模块重放。
- **本书的严格书写纪律**：因该外部工程尚未冻结进入 `the-omega-institute/trureturing@dev`，**RH 与狄利克雷 GRH 本身不佩戴本书的绿色 `lean=` 徽章**；同时，其范围严格止于 $\mathbb{Q}$ 上的 $\zeta(s)$ 与狄利克雷 $L$ 函数——戴德金 $\zeta_K$ 函数的扩展黎曼猜想（ERH）、自守 $L$ 函数的全广义黎曼猜想（Grand RH）、零点单重性、蒙哥马利 GUE 对关联、希尔伯特—波利亚算子以及物理大统一假说均保持 `OPEN` 或 `MODEL`。

在 `trureturing@dev` 内部，下列 Lean 4 冻结定理直接把经典 RH 等价地改写为两道几何—分析刚性判据：一侧是实轴上积分曼戈尔特（Mangoldt）余项 $U(x)$ 相对第一李质量包络 $M\sqrt{x}$ 的**对数平方费耶尔差额**，另一侧则是复平面上凯莱变换把临界线 $\operatorname{Re} s = \frac{1}{2}$ 精确卷成单位圆的**零径向亏量准则**：

::: {.theorem #thm-ou-ch03-fejer-gap title="曼戈尔特费耶尔临界差额与凯莱单位圆临界线判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtFejerGap.rh_iff_eventually_fejer_gap D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion"}
1. **费耶尔临界差额充要判据**（[`rh_iff_eventually_fejer_gap`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtFejerGap.rh_iff_eventually_fejer_gap)）：记第一李质量 $M := \mathrm{firstLiMass} = 2 + \gamma_{\mathrm{EM}} - \ln(4\pi)$，记 $U(x)$ 为完整积分曼戈尔特余项。经典黎曼假设（`RiemannHypothesis`）成立，当且仅当对每个实数 $c < \frac{1}{48}$，存在充分大的门槛使所有充分大的实数 $x$ 均满足

   $$
   U(x) \;\le\; M\sqrt{x} - c\,(\log x)^2.
   $$

2. **凯莱单位圆临界线判据**（[`cayley_critical_line_zeta_criterion`](lean:D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion)）：对一切复数 $s \in \mathbb{C}$，凯莱系数 $\mathrm{cayleyCoefficient}(s)$ 满足单位圆条件

   $$
   \bigl|\mathrm{cayleyCoefficient}(s)\bigr| = 1 \;\Longleftrightarrow\; \operatorname{Re} s = \frac{1}{2};
   $$

   且经典黎曼假设（`RiemannHypothesis`）成立，当且仅当对每一个满足 $\zeta(\rho) = 0$、$\rho \neq 1$ 且对一切自然数 $n$ 有 $\rho \neq -2(n + 1)$ 的非平凡零点 $\rho \in \mathbb{C}$，其对数径向亏量恒为零：

   $$
   \mathrm{logarithmicRadialDefect}(\rho) = 0.
   $$

:::

::: proof
第一款正向在 RH 下对谱中各零点的余弦项赋非负权，取 $N \ge 2$ 个等距相位构成非负费耶尔核 $\sum_{j,k=0}^{N-1} \cos((j-k)\theta) = |\sum_{j=0}^{N-1} e^{ij\theta}|^2 \ge 0$。取步长 $b_{jk} y e^{-y/2}$（其中 $y = \log x$、$b_{jk} = |j-k|/(2N)$），将谱亏量的二阶差分与曼戈尔特斜坡的中点上界逐对比较并按 $y^2 e^{-y/2}$ 归一化，平均系数给出 $C_N = \frac{1 - N^{-2}}{48} \to \frac{1}{48}$；对任意给定 $c < 1/48$ 选定有限 $N$ 使 $c < C_N$ 即可得出最终尾部不等式。反向取 $c = 1/128$ 即可推出差额趋于正无穷并由临界包络判据回到 RH。第二款由凯莱莫比乌斯映射 $(s - 1)/s$ 把有限临界线 $\operatorname{Re} s = 1/2$ 逐点双射映到除去 $1$ 点的单位圆 $S^1 \setminus \{1\}$，再将对数径向亏量归零等价于 $|\mathrm{cayleyCoefficient}(\rho)| = 1$ 代入全部非平凡零点即得。完整证明由 Lean 内核检查。
:::

## 3.2 调和权配对矩比、倒高度亏损与兰道围道竖边界 {#sec-ou-3-2}

把目光从实轴素数余项转向零点纵坐标自身：若要量化零点相位和 $Z_T(t) = \sum_{0 < \gamma \le T} w_\gamma e^{i\gamma t}$ 在多大时间窗口内绝不会重新同步回峰（即 $1 - |Z_T(t)|$ 保持严格正下界），最自然的全局权选法是**临界线调和权**。对所有满足 $0 < \gamma \le T$ 的正零点纵坐标，按解析重数 $m_\gamma$ 赋权

$$
a_\gamma := \frac{m_\gamma \gamma}{\frac{1}{4} + \gamma^2}, \qquad W(T) := \sum_{0 < \gamma \le T} a_\gamma, \qquad w_\gamma := \frac{a_\gamma}{W(T)},
$$

并定义第 $k$ 阶频率差配对矩 $P_k(T) := \sum_{\gamma, \gamma'} w_\gamma w_{\gamma'} (\gamma - \gamma')^k$。以下冻结定理在 RH 前提下先锁定四阶与二阶配对矩的比值上界，并立即推导出短非中心时间区间的定量相位亏损：

::: {.theorem #thm-ou-ch03-harmonic-pair-ratio title="调和加权零点配对矩比与倒高度时间相位亏损界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_pair_ratio D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_reciprocal_time_deficit"}
假设经典黎曼假设（`RiemannHypothesis`）成立，沿用上述截至高度 $T$ 的归一化调和权重 $w_\gamma$、配对矩 $P_2(T), P_4(T)$ 与复相位得分 $Z_T(t) := \sum_{0 < \gamma \le T} w_\gamma e^{i\gamma t}$。则以下两条结论成立：

1. **四阶与二阶配对矩比值上界**（[`harmonic_pair_ratio`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_pair_ratio)）：对所有充分大的实数 $T$，归一化权重非负且和为 $1$，$P_2(T) > 0$，且满足

   $$
   \frac{P_4(T)}{P_2(T)^2} \;\le\; 4096\,\log T.
   $$

2. **倒高度时间区的相位亏损下界**（[`harmonic_reciprocal_time_deficit`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_reciprocal_time_deficit)）：存在常数 $L > 1$，使对所有满足 $T \ge L$ 与 $\frac{1}{T} \le |t| \le \frac{1}{L}$ 的实数 $T, t$，皆有

   $$
   1 - |Z_T(t)| \;\ge\; \frac{\log(|t|^{-1})}{524288\,(\log T)^2}.
   $$

:::

::: proof
记 $c = 1/(2\pi)$。在第一款中，黎曼—冯·曼戈尔特计数渐近式给出充分大 $T$ 时上段 $(3T/4, T]$ 的计数至少为 $cT\log T / 8$，且该段内 $a_\gamma \ge m_\gamma / (2T)$，结合总质量界 $W(T) \le c(\log T)^2$ 与下段质量下界 $W(T/2) \ge c(\log T)^2 / 16$，知下段与上段的归一化权重分别至少为 $1/16$ 与 $1/(16\log T)$、段间频差至少为 $T/4$。仅保留跨段有序对即得 $P_2(T) \ge T^2 / (4096\log T) > 0$；又因全部正纵坐标不超过 $T$，恒有 $P_4(T) \le T^2 P_2(T)$，两式相除即得 $P_4(T)/P_2(T)^2 \le 4096\log T$。在第二款中，令截断高度 $X := 1/|t| \in [L, T]$。因为 $X^2 t^2 = 1$，四阶余项界对截断和 $Z_X(t)$ 给出 $1 - |Z_X(t)| \ge 1/(32768\log X)$；将全和 $Z_T(t)$ 按高度 $X$ 拆为保留项与尾项并施三角不等式得 $W(T)(1 - |Z_T(t)|) \ge W(X)(1 - |Z_X(t)|)$，代入 $W(X) \ge c(\log X)^2/16$ 与 $W(T) \le c(\log T)^2$ 即得所述亏损下界。完整证明由 Lean 内核检查。
:::

为了把相位亏损的控制一路推过中间时间 $b/\log T$ 直到对数时间 $\log T$，必须把兰道（Landau）有限矩形围道上的 $-\zeta'(s)/\zeta(s)$ 积分误差一项项钉牢。下面这条 Lean 4 冻结定理**完全不依赖 RH**，无条件给出有限兰道围道左、右两条竖边的显式范数上界：

::: {.theorem #thm-ou-ch03-landau-vertical title="有限兰道围道左、右竖边积分的显式上界" lean="D5/S3/Weil/ZetaExplicit/LandauLeftVertical.norm_left_vertical_integral D5/S3/Weil/ZetaExplicit/LandauRightVertical.norm_right_vertical_integral"}
以下两条估计无条件成立（不预设 RH）：

1. **左竖边 $\operatorname{Re} s = -\frac{1}{4}$ 上界**（[`norm_left_vertical_integral`](lean:D5/S3/Weil/ZetaExplicit/LandauLeftVertical.norm_left_vertical_integral)）：对一切实数 $x > 1$ 与 $V \ge 1$，令 $s = -\frac{1}{4} + i u$，则

   $$
   \left|\int_1^V x^s \frac{-\zeta'(s)}{\zeta(s)}\,du\right| \;\le\; x^{-1/4}\left(80(V - 1) + \frac{20(1 + \log V)}{\log x}\right).
   $$

2. **右竖边 $\operatorname{Re} s = 1 + \frac{1}{\log(3x)}$ 上界**（[`norm_right_vertical_integral`](lean:D5/S3/Weil/ZetaExplicit/LandauRightVertical.norm_right_vertical_integral)）：对一切实数 $x > 1$ 与 $V > 1$，令 $c := 1 + \frac{1}{\log(3x)}$ 与 $s = c + i u$，则

   $$
   \left|\int_1^V x^s \frac{-\zeta'(s)}{\zeta(s)}\,du\right| \;\le\; 400\Bigl(V\log(2x) + x\bigl(\log(2x)\bigr)^2\Bigr).
   $$

:::

::: proof
在第一款中，借助 $\zeta$ 函数的函数方程将 $-\zeta'(s)/\zeta(s)$ 拆成 $\log(\frac{3}{4} + iu) + r(u)$；由双伽马递推、Binet 估计与反射直线 $\operatorname{Re}(1 - s) = \frac{5}{4}$ 上的绝对收敛级数可得一致界 $|r(u)| \le 80$。提出 $x^{-1/4}$ 后，余项积分至多为 $80(V - 1)$，而对数项用原函数 $e^{iu\log x}/(i\log x)$ 分部积分并利用 $|\frac{d}{du}\log(\frac{3}{4} + iu)| \le 1/u$ 给出 $\frac{20(1+\log V)}{\log x}$。在第二款中，在绝对收敛半平面 $\operatorname{Re} s = c > 1$ 逐项积分冯·曼戈尔特级数：最接近 $x$ 的整数项由区间长度控制（$n = 1$ 时 $\Lambda(1) = 0$）；$[x/2, 2x]$ 内其余整数以 $|\log x - \log n| \ge |x - n|/(2x)$ 化为两段调和和；区间外则 $|\log x - \log n| \ge 1/2$ 由积分判别控制，最后代入 $x^c \le 3x$ 即得统一界。完整证明由 Lean 内核检查。
:::

[§2.3 的外尔平均](ch02-quaternion-clocks-and-haar-zeros.md#sec-ou-2-3)用到固定非零弧度频率 $\lambda$ 的零点和。令 $S_\lambda(T)=\sum_{0<\gamma\le T}e^{i\lambda\gamma}$，按解析重数计并纳入上端点。

先看计数误差如何进入这项相位读数。记 $N(t)$ 为同一右闭截断下的零点数，$L(t)=\frac{t}{2\pi}(\log\frac{t}{2\pi}-1)+\frac78$，$Q(t)=N(t)-L(t)$。黎曼–冯·曼戈尔特公式给出 $Q(t)=S(t+0)+O(1/t)$，其中 $S(t+0)$ 是计数公式中辐角项的右极限。Littlewood 的积分界给出 $\int_1^T Q(t)\,dt=O(\log T)$。[Brent、Platt 与 Trudgian，*Accurate Estimation of Sums over Zeros of the Riemann Zeta-Function*（2021），§2，引理 2 与式 (12)](https://doi.org/10.1090/mcom/3652)

对 $dN=dL+dQ$ 分部积分，将误差拆成端点读数与频率累积（手工推导，`ARGUED`）。

$$
\begin{aligned}
S_\lambda(T)-\frac{e^{i\lambda T}}{2\pi i\lambda}\log\frac{T}{2\pi}
  &=e^{i\lambda T}Q(T)-i\lambda\int_1^T e^{i\lambda t}Q(t)\,dt\\
  &\quad+O_\lambda(1).
\end{aligned}
$$

若左侧沿全部实数高度为 $o_\lambda(\log T)$，则在任意固定长度 $H$ 内，可以对相邻硬窗作差，再乘反相位分部求和，得到 $Q(T+u)=Q(T)+o_{\lambda,H}(\log T)$，对 $0\le u\le H$ 一致。用上面的积分界取 $[T,T+H]$ 的平均，再令 $H$ 趋于无穷，便有 $Q(T)=o(\log T)$。因此端点渐近式要求且只要求 $Q(T)$ 和 $\int_1^T e^{i\lambda t}Q(t)\,dt$ 都是 $o(\log T)$。

取 $\lambda=1$ 可看出为何普通积分界不够。在合成谱中，令 $t\ge32$ 时的计数为 $\lfloor L(t)+1/2+\cos(t)/(10t)\rfloor$。取整产生的零均值锯齿在相位 $1$ 和 $e^{it}$ 下积分都有界，因为其各非零谐波的相位导数单调且远离零。剩下的 $\cos(t)/(10t)$ 使普通积分有界，却在乘上 $e^{it}$ 后留下 $\frac1{20}\log T+O(1)$。这个例子刻画的是仅靠计数输入的边界。对实际 $\zeta$ 零点，仍需控制带相位的积分。

设冯·曼戈尔特函数满足 $\Lambda(e^{|\lambda|})=0$。在 RH 下，沿全部实数高度 $T\to\infty$ 有（手工推导，`ARGUED`）

$$
S_\lambda(T)=\frac{e^{i\lambda T}}{2\pi i\lambda}\log\frac{T}{2\pi}
  +O_\lambda\!\left(\frac{\log T}{\log\log T}\right).
$$

[§2.3](ch02-quaternion-clocks-and-haar-zeros.md#sec-ou-2-3) 已由原弧的代数相位推出本书任一非零整数模态都满足 $\Lambda(e^{|\lambda|})=0$。

保留每枚零点的实部权重，取固定 $X=e^\lambda>1$ 且 $\Lambda(X)=0$。以下手工推导（`ARGUED`）刻画端点渐近式沿全部实数高度成立的条件。

$$
\sum_{0<\gamma\le T}X^{\rho-1/2}
=\frac{e^{i\lambda T}}{2\pi i\lambda}\log\frac{T}{2\pi}+o_X(\log T)
\quad\Longleftrightarrow\quad
\text{Lindelöf 猜想成立}.
$$

这里按解析重数计且纳入上端点。令 $\delta_\rho=\operatorname{Re}\rho-1/2$。Backlund 的局部零点计数判据等价于 $\sum_{|\gamma-T|\le1}\delta_\rho^2=o(\log T)$。临界线反射把两侧配对，且半径为 $1$ 的高度窗共有 $O(\log T)$ 枚零点，因此可以先固定距临界线的阈值，再让阈值趋零。Lindelöf 猜想还给出计数公式的辐角余项 $S(T)=o(\log T)$。[Titchmarsh，第二版，定理 13.5 与 13.6(A)](https://sites.math.rutgers.edu/~zeilberg/EM18/TitchmarshZeta.pdf)

充分性沿用下文的平滑窗口，先固定带宽 $B$。无条件显式公式在 $\gamma-i\delta_\rho$ 处取样。把窗口值移回实轴时，同高反射消去关于 $\delta_\rho$ 的一次项，二次误差由距端点的衰减核加权。局部平方质量界使这项误差为 $o_{X,B}(\log T)$。实轴上恢复硬窗的代价为 $O_X(\log T/B)+o_{X,B}(\log T)$，其中第二项来自 $S$。先令 $T$ 趋于无穷，再令 $B$ 趋于无穷。[Carneiro 与 Milinovich，引理 4](https://arxiv.org/pdf/2403.17803v1#page=5)

必要性来自一个正差。设 $P_a(u)=a/(\pi(a^2+u^2))$，取 $a>1/2$ 且 $a^2-1/4\ge4/\lambda^2$。若硬窗渐近式成立，分部求和给出 $\sum_{\gamma>0}e^{\lambda\delta_\rho}P_a(\gamma-T)=\log(T/(2\pi))/(2\pi)+o_X(\log T)$。另一方面，$\xi$ 的哈达玛积在 $1/2+a+iT$ 处的对数导数给出 $\sum_\rho\operatorname{Re}P_a(\gamma-T-i\delta_\rho)=\log(T/(2\pi))/(2\pi)+O_a(1)$。负纵坐标的贡献是 $O_a(\log T/T)$。配对后，前一和的权重变为 $\cosh(\lambda\delta_\rho)$，并有

$$
\cosh(\lambda\delta)P_a(u)-\operatorname{Re}P_a(u-i\delta)
\ \ge\ \frac{\lambda^2}{4}\delta^2P_a(u)
\qquad (u\in\mathbb R,\ |\delta|\le1/2).
$$

事实上，$\operatorname{Re}P_a(u-i\delta)/P_a(u)\le 1+\delta^2/(a^2-1/4)$，而 $\cosh(\lambda\delta)\ge1+\lambda^2\delta^2/2$。两和之差为 $o_X(\log T)$ 就迫使半径为 $1$ 的窗内平方质量同样为 $o(\log T)$。[Titchmarsh，第二版，式 (2.12.5)](https://sites.math.rutgers.edu/~zeilberg/EM18/TitchmarshZeta.pdf) · [NIST DLMF，式 5.11.2](https://dlmf.nist.gov/5.11.E2)

上面的 RH 估计还给出了定量余项。

把窗口 $(0,T]$ 的指标函数同非负、积分为 $1$ 的核 $K_B(u)=\frac{3B}{8\pi}\bigl(\frac{\sin(Bu/4)}{Bu/4}\bigr)^4$ 卷积，再乘 $e^{i\lambda u}$。在核对应的角频带 $[-B,B]$ 内，Guinand–Weil 显式公式的素幂项采样的是离 $\lambda$ 至多 $B$ 的有符号对数频率 $\pm\log n$。每项包含 $\int_0^T e^{i(\lambda\mp\log n)v}\,dv$，因固定频率与所有素幂频率有正距离，该积分关于 $T$ 一致有界。因此素幂项合计为 $O_\lambda((1+B)e^{B/2})$。测试函数在 $\pm i/2$ 的极点项由核在这两条水平线上的衰减界为 $O_\lambda(e^{B/2})$。[Carneiro、Chandee 与 Milinovich，引理 5](https://arxiv.org/pdf/1309.1526#page=6)

窗口平移 $u$ 只影响两个端点各 $|u|$ 以内的零点。对 $|u|\le T/2$，RH 下的零点计数余项将这些零点的总数界为 $O(|u|\log T+\log T/\log\log T)$，并允许端点计入。对更大的 $|u|$，全局计数给出 $O(|u|\log(2+|u|))$。用 $K_B$ 平均，凭其 $O(1/B)$ 的一阶绝对矩及四次衰减，恢复硬截断的代价为 $O(\log T/B+\log T/\log\log T)$。[Carneiro、Chandee 与 Milinovich，第 1 节及定理 1](https://arxiv.org/pdf/1503.00955)

对显式公式中的伽马密度 $\bigl(\operatorname{Re}(\Gamma^\prime/\Gamma)(1/4+it/2)-\log\pi\bigr)/(2\pi)$ 同样恢复硬截断，误差为 $O(\log T/B)$。在 $t\ge 1$ 时该密度为 $\log(t/(2\pi))/(2\pi)+O(t^{-2})$。分部积分给出上式中的端点项及 $O_\lambda(1)$。剩余的振荡积分 $\int_1^T e^{i\lambda t}\,dt/t$ 一致有界。取 $B=\log\log T$，各项误差合并即得所示余项。因此固定模态的 $|S_\lambda(T)|/\log T$ 收敛到 $1/(2\pi|\lambda|)$。[NIST DLMF，式 5.11.2](https://dlmf.nist.gov/5.11.E2)

去掉 RH 作为解析输入后，保留零点实部的权重仍可在高度平均下读出同一个端点项。固定 $X>1$，令 $\lambda=\log X$，继续要求 $\Lambda(X)=0$。记 $\rho=\beta+i\gamma$，按重数计并纳入上端点。令 $S(t)$ 为黎曼–冯·曼戈尔特公式中的辐角项，即离开零点高度时 $N(t)=1+\vartheta(t)/\pi+S(t)$，其中 $\vartheta$ 是黎曼–西格尔 $\vartheta$ 函数。把光滑端点项从加权零点和中扣除

$$
R_X(t)=\sum_{0<\gamma\le t} X^{\rho-1/2}
       -\frac{e^{it\lambda}}{2\pi i\lambda}\log\frac{t}{2\pi}.
$$

手工推导（`ARGUED`）给出

$$
\frac1U\int_U^{2U}\bigl|e^{-it\lambda}R_X(t)-S(t)\bigr|^2\,dt=O_X(1),
\qquad
\frac1U\int_U^{2U}|R_X(t)|^2\,dt\sim\frac{\log\log U}{2\pi^2}.
$$

这次固定带宽 $B=1$。无条件的 Guinand–Weil 公式在复纵坐标 $\gamma-i(\beta-1/2)$ 处取样。恢复尖锐窗口时，同高的镜像零点 $\beta+i\gamma$ 与 $1-\beta+i\gamma$ 使复移位误差的一阶项抵消，只留下按 $(\beta-1/2)^2$ 加权的端点误差。Selberg 零点密度界给出 $\sum_{0<\gamma\le U}(\beta-1/2)^2=O(U/\log U)$。将这些权重按距窗口上端点的距离作立方衰减加权，所得误差的高度平均为 $O(1/\log U)$，逐点上界为 $O(\log U)$。二者相乘给出均方上界，下端点的误差则一致有界。[Carneiro 与 Milinovich，*On Littlewood's Estimate for the Modulus of the Zeta Function on the Critical Line*（2024），引理 4](https://arxiv.org/pdf/2403.17803v1#page=5) · [Simonič，*Explicit Zero Density Estimate for the Riemann Zeta-Function Near the Critical Line*（2019），式 (3)](https://arxiv.org/pdf/1910.08274v2)

实轴上的截断修正可用零点计数公式分部积分。上端点留下 $e^{it\lambda}S(t)$，其余为有界项和 $S_1(t)=\int_0^t S(u)\,du$ 与一个有限测度的卷积。该测度在原点有一个原子，其余部分的密度呈立方衰减。Selberg 对 $S_1$ 的均方界控制后一项，对 $S$ 的二阶矩给出上式的渐近常数。因此，对任意固定 $\varepsilon>0$，误差超过 $\varepsilon\log t$ 的高度在 $[U,2U]$ 中所占比例至多为 $O_X(\varepsilon^{-2}\log\log U/(\log U)^2)$。逐高度界仍需控制这些例外处的误差。下一节的碰撞估计还需要在随高度增长的频带内控制零点和。[Selberg（1946），定理 6、7，见 Chirre 与 Quesada-Herrera 的 *The Second Moment of $S_n(t)$ on the Riemann Hypothesis*（2021），式 (1.4)–(1.5)](https://arxiv.org/pdf/2006.08503v2#page=2)

## 3.3 周期相位亏损、兰道窗转移与高斯碰撞极限 $1/\sqrt{\pi}$ {#sec-ou-3-3}

现在把倒高度时间区、周期相位区与对数时间区三段无缝焊在一起！在 `trureturing@dev` 中，下面这条三位一体的冻结定理首先在倒对数时间段 $16\pi/T \le |t| \le b/\log T$ 用相反相位弧证明 $1/(4096\log T)$ 的一致亏损，再在接收一致兰道零点和包络的前提下把亏损推进至 $b/\log T \le |t| \le \log T$（常数跃升为 $1/(32\log T)$），最终锁定调和加权实际 $\zeta$ 零点谱的**高斯硬碰撞极限 $1/\sqrt{\pi}$**：

::: {.theorem #thm-ou-ch03-harmonic-collision-limit title="周期相位亏损、兰道对数窗转移与调和零点高斯碰撞极限" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHPeriodicPhaseCoverage.harmonic_periodic_phase_deficit D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLandauWindowTransfer.harmonic_landau_window_deficit D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLogarithmicCollisionLimit.harmonic_zeta_collision_limit"}
假设经典黎曼假设（`RiemannHypothesis`）成立，沿用 [@thm-ou-ch03-harmonic-pair-ratio] 中的 $a_\gamma, W(T), w_\gamma, P_2(T)$ 与 $Z_T(t)$。

1. **周期相反相位弧亏损界**（[`harmonic_periodic_phase_deficit`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHPeriodicPhaseCoverage.harmonic_periodic_phase_deficit)）：存在常数 $L > 1$ 与 $b > 0$，使对一切 $T \ge L$ 及 $\frac{16\pi}{T} \le |t| \le \frac{b}{\log T}$，皆有

   $$
   1 - |Z_T(t)| \;\ge\; \frac{1}{4096\,\log T}.
   $$

2. **一致兰道包络下的对数时间亏损转移**（[`harmonic_landau_window_deficit`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLandauWindowTransfer.harmonic_landau_window_deficit)）：给定 $b > 0$ 与 $C > 0$，若对一切 $V > 1$ 与 $t \neq 0$ 成立一致兰道零点和包络

   $$
   \left|\sum_{0 < \gamma \le V} m_\gamma e^{i\gamma t}\right| \;\le\; C\left(V + e^{|t|/2}(1 + |t|)^2 + e^{|t|/2}(1 + \log V) + \frac{\log V}{|t|}\right),
   $$

   则存在常数 $L > 1$，使对一切 $T \ge L$ 及 $\frac{b}{\log T} \le |t| \le \log T$，皆有

   $$
   1 - |Z_T(t)| \;\ge\; \frac{1}{32\,\log T}.
   $$

3. **调和加权 $\zeta$ 零点的高斯硬碰撞极限**（[`harmonic_zeta_collision_limit`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLogarithmicCollisionLimit.harmonic_zeta_collision_limit)）：在存在 $C > 0$ 使上述一致兰道包络成立的前提下，设实数列 $T_n \to \infty$、$\eta_n$ 最终为正，记方差尺度 $s_n := \sqrt{n P_2(T_n)/2}$。若满足 $(\log T_n)^2 / n \to 0$、$\eta_n / s_n \to 0$ 且 $\eta_n \log T_n \to \infty$，则频率差绝对值不超过 $\eta_n$ 的有序占用向量对加权碰撞和 $E_n(\eta_n)$ 精确满足

   $$
   \frac{s_n\,E_n(\eta_n)}{\eta_n\,W(T_n)^{2n}} \;\longrightarrow\; \frac{1}{\sqrt{\pi}}.
   $$

:::

::: proof
在第一款中，置周期 $H := 2\pi/|t|$，则在区间 $[T/2, T]$ 内可排入至少 $T/(8H)$ 个完整周期；每个周期内以相位 $0$ 与 $\pi$ 为起点各取宽 $H/16$ 的半开区间，短窗零点计数下界赋予两族相反相位弧各自至少 $\log T / (4096\pi)$ 的调和质量。把总得分投影到自身单位方向，按其实部正负挑选相反符号那一族（投影至多 $1/2$），即得亏损至少 $1/(4096\log T)$。在第二款中，在 $b/\log T \le |t| \le \log T$ 上对 $V = T$ 与 $V = 3T/4$ 分别套用一致兰道包络，差和模长至多 $2C(7 + 1/b)T$，对充分大 $T$ 严格低于 $(3T/4, T]$ 内解析重数计数下界 $T\log T / (16\pi)$ 的一半；用三角不等式与 $a_\gamma \ge m_\gamma/(2T)$ 转移给 $Z_T(t)$ 即得 $1/(32\log T)$。在第三款中，[@thm-ou-ch03-harmonic-pair-ratio] 保证中心窗 $|t| \le 1/T_n$ 的移动费耶尔积分给出高斯主项 $1/(2\sqrt{\pi})$；倒高度、周期相位与兰道转移三段拼接覆盖整个 $1/T_n \le |t| \le \log T_n$，统一亏损 $c/\log T_n$ 使 $|Z_{T_n}(t)|^{2n} \le \exp(-2cn/\log T_n)$ 压垮多项式前因子；再由全线相对截尾界（依托 $\eta_n \log T_n \to \infty$）将极限传回全实轴，最后对 $\eta_n$ 的固定正倍数作割线夹逼即得硬碰撞极限 $1/\sqrt{\pi}$。完整证明由 Lean 内核检查。
:::

值得一提的是上下游之间的完整衔接（`ARGUED / EXT-LEAN`）：在 `trureturing@dev` 中，[@thm-ou-ch03-landau-vertical] 的左右竖边界结合上边对数平方界已经推出含端点的一致的兰道零点包络（`actual_cutoff_landau_envelope`），从而在 RH 下自动满足 [@thm-ou-ch03-harmonic-collision-limit] 第 2、3 款所需的兰道前提；而 Alpöge 的外部形式化证明（`EXT-LEAN`）又直接给出了 `RiemannHypothesis`。至此，从零点分布到全局调和碰撞极限的纯数论主干已完全打通。

## 3.4 有限候选零点窗：第 $11431$ 枚的中点隔离与第 $8236$ / $8359$ 枚的三窗筛选 {#sec-ou-3-4}

现在把视角从 $T \to \infty$ 的全局渐近切回十九点贝伦德球壳实际读取的**具体有限零点窗口**。全书后续卷目中反复出现两组最具代表性的零点地标——**第 $11431$ 枚周围的十九零点局部窗**，以及**第 $8236$ / $8359$ 枚首次通过三物理窗口的零点**。让我们用严格区间算术（`CERT`）看清它们为何脱颖而出，以及各自的准确边界。

### 3.4.1 第 $11431$ 枚零点在 $[10000, 12999]$ 中的中点隔离、费耶尔份额与有限观察半径

在全书第二卷的规范交汇与两步质量算子检验中，第 $11431$ 枚正零点是一处核心样本。把它放进左右各九枚的十九零点局部窗口 $\#11422$ 至 $\#11440$，立刻浮现出四组经 $160$ 位 Arb 球算术认证的精确数字（`CERT`，复算脚本 [`ch39-zero-midpoint-fejer.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-zero-midpoint-fejer.py)、[`ch39-midpoint-weight-bound.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-midpoint-weight-bound.py)、[`ch39-finite-fejer-observation.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-finite-fejer-observation.py) 与 [`ch39-harmonic-local-observation.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-harmonic-local-observation.py)）：

1. **三千枚中心里的唯一孤立中点（$35.60$ 倍锐度优势）**：对每个中心编号 $n$，定义九邻域中点偏差 $E_n := \min_{1 \le i, j \le 9} |\gamma_{n - i} + \gamma_{n + j} - 2\gamma_n|$。在 $n = 10000$ 至 $12999$ 的全部 $3000$ 个中心（合计比较 $243{,}000$ 个三元组）中，无论是否除以局部平均间距，**第 $11431$ 枚均唯一排第一**：其几乎精准落在第 $11427$ 与第 $11436$ 枚正中，最小偏差

   $$
   \Delta = |\gamma_{11427} + \gamma_{11436} - 2\gamma_{11431}| \in (1.6812114283,\; 1.6812114285)\times 10^{-6},
   $$

   次小偏差者第 $11628$ 枚的偏差竟是它的 **$35.60$ 倍**（严格落在 $(35.59, 35.60)$ 内）！但切忌把这一局部特征神话为全谱唯一：由于黎曼—冯·曼戈尔特计数公式给出 $\gamma_N / N \to 0$，逐项求和立证 $E_n \le \gamma_{n+1} - \gamma_{n-1}$ 的均值趋零，因此在更高处满足绝对偏差小于 $E_{11431}$ 的中心具有自然密度 $1$（`ARGUED`）。
2. **占据对角主导的四阶费耶尔矩（$94.62\%$）**：在十九零点窗上取等权 $1/19$ 与分辨率 $\eta = 0.01$，无序对自身配对的占据对角背景恒为 $B = (19 + 4\times 171)/19^4 = 703/130321$，而总四阶费耶尔矩落在 $(0.00570094240512, 0.00570094240513)$，其中整整 **$94.62\%$**（精确值 $94.6224672\%$）来自自身占据对角。
3. **孤立碰撞带内的最大额外配对占比（$23.657\%$ / $23.670\%$）**：窗口内第二小异对间距为 $\Delta_2 \in (0.0023277388, 0.0023277390)$。只要分辨率落在 $\Delta < \eta \le \Delta_2$，三角核中唯一新冒头的非对角信号就是 $\gamma_{11427} + \gamma_{11436} \approx 2\gamma_{11431}$！允许自由调节十九枚零点的非负概率权重时，额外配对在三角核下的最大份额为 **$23.657017\%$**，在闭带指示核下的最大份额为 $4/(12 + 2\sqrt{6}) \approx \mathbf{23.670068\%}$。闭带取 $\Delta \le \eta < \Delta_2$，使第二组配对仍在带外。若十九枚零点一律等权，闭带份额为 $4/707 \approx 0.565771\%$。
4. **首次辨出额外碰撞的有限观察半径（$111521$ 与 $111532$）**。在 $[-T,T]$ 上，把四次相位读数 $\bigl|\sum_j p_j e^{it\gamma_j}\bigr|^4$ 对费耶尔核 $K_\eta(t)=(1-\cos(\eta t))/(\pi\eta t^2)$ 积分，记为 $I_\eta(T)$。因为被积函数非负，$I_\eta(T)$ 随 $T$ 单调不减。若它超过整线上的占据对角基线 $B$，整线积分也超过 $B$，必有额外碰撞。在 $\eta=1/1000$ 时，等权下 $B=703/19^4$，球算术给出的有符号余量为

   $$
   \begin{aligned}
   I_\eta(111520)-B &\in (-1.864,-1.863)\times10^{-11},\\
   I_\eta(111521)-B &\in (2.960,2.961)\times10^{-10}.
   \end{aligned}
   $$

   两次读数各有至多 $1.8\times10^{-11}$ 的绝对积分误差时，仍能判定 $111521$ 是首次过阈值的整数半径。复算时，展开四次方，把频差 $d$ 的余弦积分写成 $\bigl(F_T(d+\eta)+F_T(d-\eta)-2F_T(d)\bigr)/(\pi\eta)$，其中 $F_T(a)=a\operatorname{Si}(aT)-(1-\cos(aT))/T$，由对 $(1-\cos(at))/t^2$ 分部积分得到。局部调和权下，首过阈值的整数半径为 $111532$（$111531$ 时仍低于相应的基线）。通用相对截尾界分别给出 $11{,}330{,}943$（等权）与 $11{,}331{,}843$（局部调和权）的充分半径。

::: {.example #ex-ou-ch03-fejer-11431 title="孤立碰撞带 23.670% 锐上限的三行初等推导"}
在 $\Delta < \eta \le \Delta_2$ 的孤立分辨率带内，记 $\#11427, \#11436, \#11431$ 三个零点的概率权重依次为 $x, y, z \ge 0$，令 $q := 1 - \Delta/\eta \in (0, 1]$。额外配对贡献恰为 $4q x y z^2$，而占据对角为 $D = \sum_i p_i^4 + 4\sum_{i < j} p_i^2 p_j^2$；其余十六个权重只能增大分母。对 $x, y > 0$ 设 $t := z^2 / (xy)$，由 $x^2 + y^2 \ge 2xy$ 立得

$$
D \;\ge\; x^4 + y^4 + z^4 + 4(x^2 y^2 + x^2 z^2 + y^2 z^2) \;\ge\; (xy)^2\bigl(6 + 8t + t^2\bigr).
$$

从而额外信号与对角之比受均值不等式 $t + 6/t \ge 2\sqrt{6}$ 精确封顶：

$$
\frac{4q x y z^2}{D} \;\le\; \frac{4q}{8 + t + 6/t} \;\le\; \frac{4q}{8 + 2\sqrt{6}} \quad \Longrightarrow \quad \frac{\text{额外贡献}}{\text{总四阶矩}} \;\le\; \frac{4q}{8 + 2\sqrt{6} + 4q}.
$$

等号恰在 $x = y \approx 0.280498$、$z = 6^{1/4}x \approx 0.439003$、其余十六项归零时取到。闭带指示核在 $\Delta \le \eta < \Delta_2$ 取 $q=1$。三角核下的最大份额在 $\eta=\Delta_2$ 取得，因为此时 $q$ 最大，而第二处间距恰落在核的零点上。若改用等权 $x=y=z=1/19$，闭带额外项为 $4/19^4$，占据对角为 $703/19^4$，所以额外项占总和的 $4/707$。
:::

### 3.4.2 第 $8236$ 枚与第 $8359$ 枚如何跨入三物理窗口筛选

把单窗统计升级为[第二卷](ch04-gauge-crossings-and-monotone-barriers.md)–[第四卷](ch10-regge-gravity-and-spin2.md)共同使用的**三物理窗口筛选**——同时要求（i）五种规范荷各留恰好三个轻模、（ii）两圈尖阈值强耦合落入 $0.117 < \alpha_s(M_Z) < 0.119$、（iii）四层一圈曲率比相对目标误差低于 $0.2\%$——逐枚编号穷举揭示出另一幕极具戏剧性的图景（`CERT / MODEL`，复算脚本 [`ch39-first-three-mode-observables.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-first-three-mode-observables.py) 与 [`ch39-neutral-site-variance-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-neutral-site-variance-gap.py)）：

| 轻重谱分界方案 | 穷举范围 | 五荷各三轻模数 | 强耦合合格数 | 曲率合格数 | 首次三窗全通零点 | 首枚实测读数（$\alpha_s$ / 曲率比） |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| 常数分界 $9$ | $\#1\text{–}\#8192$ | $67$ | $22$ | $2$（$\#6514, \#8035$） | 无（$0$ 枚） | — |
| 常数分界 $9$ | $\#1\text{–}\#8359$ | $69$ | $23$ | $3$ | **$\#8359$**（$\gamma \approx 8462.07$） | $(0.1184112, 0.1184213)$ / $0.99935102$ |
| 站点方差最小割 $T = 9 + (1 - \delta)^2$ | $\#1\text{–}\#8359$ | — | — | — | **$\#8236$**（$\gamma \approx 8354.92$） | $(0.1183058, 0.1183120)$ / $1.00093826$ |

细节本身就是最好的教材：在常数分界 $9$ 下，前 $8192$ 枚零点中强耦合窗与曲率窗的交集完全为空，直到第 **$8359$** 枚才首次同时通过三项检验（但把先前校准的味张量移到第 $8359$ 枚时，留出检验读出的 $|V_{ub}| \approx 0.00287268$ 比参考值低 $23.026\%$）。一旦把人工常数 $9$ 换为全壳非平凡二分的最小跨界边权平方和——即内禀的**站点方差分界** $T = 9 + (1 - \delta)^2$——原本因荷六第三本征值略高于 $9$（约 $9.2061$）而被挡在门外的第 **$8236$** 枚立刻率先过关，与第 $8359$ 枚并列成为前 $8359$ 枚中的全部两枚三窗命中（类似地，更高处的第 $148341$ 枚也在分界 $9$ 时荷六仅留两模，而在站点方差分界下五荷各三模且通过全部三窗）。

::: {.figure src="ch03-zero-window-landscape"}
**第 $11431$ 枚零点的中点隔离与三条谐波相位亏额时间窗。** 左栏展示扫描区间 $10{,}000\text{–}12{,}999$（中心两侧各取 $9$ 枚邻零点）内的相对中点偏差：第 $\#11431$ 枚（琥珀色基准 $1\times$）比次优中心 $\#11628$ 小约 $35.60\times$，下方两条进度条对照等权 Fejér 对角占比（$\eta = 0.01$ 时 $94.62\%$，青色）与孤立碰撞带自由重配的额外配对上限（$23.66\%$，紫色）。右栏在对数 $|t|$ 轴上示意 [@thm-ou-ch03-harmonic-pair-ratio] 与 [@thm-ou-ch03-harmonic-collision-limit] 中经 Lean 冻结的三条谐波相位亏额时间窗：倒高度短窗 $1/T \le |t| \le 1/L$（青色）、周期窗 $16\pi/T \le |t| \le b/\log T$（紫色）以及附加朗道界的长窗 $b/\log T \le |t| \le \log T$（青色，三窗均以黎曼猜想为条件）。
:::

## 3.5 全局平均界与单零点选点之间的诚实缺口及卷一收束 {#sec-ou-3-5}

走完第一卷全部三章，我们必须以尼采式的清醒审视刚刚架起的整座桥梁——看看哪几跨已经由 Lean 内核与 Arb 区间焊死，又在哪一跨正悬着断口（`OPEN`）：

- **已经焊死的跨段**：（1）十九点贝伦德球壳的完整整数解剖、$22$ 个有理独立频率、射影三元流群与最小 $21$ 维有理格拉姆障碍；（2）四元数双时钟的非交换逆谱唯一性、三探针全局单射、密度 $1/(2\pi)$ 的零点标准模型哈尔积分与 $D = 0$ 威尔逊扩散检验；（3）在外部核验的 RH 基础上，由 Lean 4 内核锁死的费耶尔临界差额、调和配对矩比、倒高度与周期相位亏损、无条件兰道左右竖边积分界以及全局高斯硬碰撞极限 $1/\sqrt{\pi}$；（4）第 $11431$ 枚与第 $8236$ / $8359$ 枚等具体有限零点窗的高精度区间复算。
- **尚未闭合的真实断口（`OPEN`）**：第一，[@thm-ou-ch03-harmonic-pair-ratio]–[@thm-ou-ch03-harmonic-collision-limit] 全部控制的是**截至高度 $T$ 的整段调和加权谱平均量**，而十九点球壳上的规范阈值、轻模计数与味读数读取的是**单枚零点的双钟相位**或极少数离散零点的谱权组合——从全局相位和平均界走向单个球壳的质量谱或指定相位窗内的双钟同时命中，至今仍缺少桥梁比较定理。第二，第 $11431$ 枚的中点孤立性依赖于选定的搜索区间与邻域宽度，而第 $8236$ / $8359$ 枚的率先命中仍需外部指定场表、质量标尺与轻重分界。究竟是哪一条物理作用量决定了零点谱权与选点律？

::: {.film src="zero-windows"}
**全局平均界已由 Lean 焊死，从平均走到单枚零点的选点仍是缺口（2 分 45 秒）。** 片头把 RH 与狄利克雷 GRH 标为紫色外部形式化事实（`EXT-LEAN`），不佩绿色徽章，其范围之外的全广义黎曼猜想等标为红色 `OPEN`。青色临界线 $\operatorname{Re} s = \frac{1}{2}$ 经 $(s-1)/s$ 卷成单位圆：琥珀色点留在圆上，品红色离线点（$\operatorname{Re} s = 0.85$）落入圆内，$|w|$ 读数为屏幕计算；绿色标签对应 [@thm-ou-ch03-fejer-gap] 的凯莱判据与费耶尔临界差额，下方的费耶尔核曲线 $|\sum_{j<6} e^{ij\theta}|^2 \ge 0$ 是屏幕计算的证明骨架示意。一串示意零点的调和加权相位箭头在 $t = 0$ 对齐成长度 $1$、随后散开；对数 $|t|$ 轴（位置示意）上的三段时间窗与配对矩比带着 [@thm-ou-ch03-harmonic-pair-ratio] 与 [@thm-ou-ch03-harmonic-collision-limit] 的绿色标签。兰道矩形的两条青色竖边对应无条件的 [@thm-ou-ch03-landau-vertical]，紫色虚线顶边表示由竖边与顶边合成包络只是论证；示意高斯曲线标出碰撞极限 $1/\sqrt{\pi} = 0.5641895835\ldots$。第 $11431$ 枚零点窗中的中点弧、$35.60\times$ 偏差条、$94.62\%$ 对角占比、$23.657017\%$ 额外配对上限与观察半径 $111521$ / $111532$ 均为球算术证书（青色 `NUM`），闭式 $4/(12+2\sqrt{6})$ 在屏幕上复算；第 $8359$ 与第 $8236$ 枚的三窗命中依赖紫色 `MODEL` 标出的选定输入；全局平均与单枚零点之间的红色断桥是开放问题。
:::

带着这份毫不含糊的算术装备与问题清单，第一卷就此收束。下一章起，我们正式步入[第二卷：第一问](ch04-gauge-crossings-and-monotone-barriers.md)，把这颗十九点磁球壳直接架到标准模型三支规范耦合的火线上，直面[第四章 磁球壳质量算子、三力交汇阈值与单调质量障碍](ch04-gauge-crossings-and-monotone-barriers.md)。
