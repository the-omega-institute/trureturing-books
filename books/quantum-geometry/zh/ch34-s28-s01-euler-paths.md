# 31.1.1 欧拉乘积 $\equiv$ 路径积分：不可约素数极小圆弧体 $\Delta\mathcal{T}_p$、可加作用量 $S[\Gamma_n] = \ln n$ 与费米型莫比乌斯外积阶 $\Lambda^k$ {#sec-ch34-28-1}

将复谱变量按观察者实轴阻尼刻度 $\sigma = \operatorname{Re}(s) \in \mathbb{R}$ 与 $90^\circ$ 正交虚盲区旋转频率 $t = \operatorname{Im}(s) \in \mathbb{R}$ 拆写为 $s = \sigma + \hat{\mathbf{i}}\,t$（在标准复分析中将双向量虚单位 $\hat{\mathbf{i}}$ 等同于复虚数单位 $i \in \mathbb{C}$）。在绝对收敛右半平面 $\sigma = \operatorname{Re}(s) > 1$ 内，黎曼 $\zeta(s)$ 函数的欧拉—狄利克雷恒等式（[第二十二章 §22.2](ch22-s02-dirichlet-euler-identity.md#sec-ch22-2) [@cor-dirichlet-sum-eq-euler-product]）给出一座从“单枚素数局域绕行生成元”通往“全体自然数复合路径全局振幅求和”的精确字典：

$$
\begin{aligned}
\zeta(\sigma + \hat{\mathbf{i}}\,t)
&\;=\; \prod_{p \in \mathbb{P}} \frac{1}{1 - p^{-s}} \;=\; \prod_{p \in \mathbb{P}} \left(\sum_{m=0}^{\infty} e^{-m s \ln p}\right) \\
&\;=\; \sum_{n=1}^{\infty} e^{-\sigma \ln n}\cdot e^{-\hat{\mathbf{i}}\,t \ln n} \qquad (\sigma = \operatorname{Re}(s) > 1).
\end{aligned}
$$

为了将本节从素数正交寻址、欧拉—狄利克雷路径展开、跨过 $s = 1$ 的交错延拓、完备谱对称性、对称性非局域化反例直到积分显式公式的全部形式支点一次性锚定，我们先陈述由 `trureturing` 内核联合锁定的七款桥接定理：

::: {.theorem #thm-ch34-riemann-prime-arc-bridge lean="D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence,D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product,D5/S3/Zeros/CompletedZeta.xi_reading_reflection,D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj,D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization,D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula,D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.tendsto_alternating_partialSums_eta_of_ne_one" title="素数对数有理独立性、欧拉—狄利克雷恒等式、完备 $\xi$ 对称与非局域化反例、无条件积分显式公式及交错延拓桥接定理"}
在所钉 `trureturing` 仓库声明下，以下七项定理同时成立：

1. **素数对数族在有理数域上的线性无关性（`prime_log_rational_independence`）**：以全体素数类型 `Nat.Primes` 为指标的实对数映射 $p \mapsto \ln p$ 在有理数域 $\mathbb{Q}$ 上严格线性无关，即 `LinearIndependent ℚ (fun p : Nat.Primes => Real.log p)`（见 [@thm-prime-log-independence]）；
2. **右半平面 $\operatorname{Re}(s) > 1$ 上的狄利克雷级数—欧拉素数乘积恒等式（`riemann_zeta_dirichlet_sum_eq_euler_product`）**：对任意满足 `1 < s.re`（$\operatorname{Re}(s) > 1$）的复数 $s \in \mathbb{C}$，无条件级数与无条件无穷乘积在 $\mathbb{C}$ 中严格相等（见 [@cor-dirichlet-sum-eq-euler-product]，其中 $\operatorname{Re}(s) > 1$ 蕴含 $-s \neq 0$，故 Mathlib 全域化复幂在 $n = 0$ 处取 `(0 : ℂ) ^ (-s) = 0`）：

   $$
   \sum_{n \in \mathbb{N}} (n : \mathbb{C})^{-s} \;=\; \prod_{p \in \mathbb{P}} \bigl(1 - (p : \mathbb{C})^{-s}\bigr)^{-1} \qquad (\operatorname{Re}(s) > 1);
   $$

3. **完备 $\xi$ 读数的整函数反射对称律（`xi_reading_reflection`）**：记完备读数 $\operatorname{xiReading}(s) := \frac{1}{2}\bigl(s(s - 1)\,\operatorname{completedRiemannZeta}_0(s) + 1\bigr)$（见 [@def-xi-reading]），则对一切 $s \in \mathbb{C}$ 恒成立（见 [@thm-xi-reading-entire-reflection]）：

   $$
   \operatorname{xiReading}(1 - s) \;=\; \operatorname{xiReading}(s);
   $$

4. **完备 $\xi$ 读数的反射—复共轭协变律（`xi_reading_one_sub_conj`）**：对一切 $s \in \mathbb{C}$ 恒成立（见 [@prop-zeta-conjugation-covariance]）：

   $$
   \operatorname{xiReading}(1 - \bar{s}) \;=\; \overline{\operatorname{xiReading}(s)};
   $$

5. **完全对称性不蕴含定直线零点局域化定理（`full_symmetry_not_fixed_line_localization`）**：对任意满足 $\delta \neq 0$ 且 $\gamma \neq 0$ 的实数 $\delta, \gamma \in \mathbb{R}$，定义四次整函数 $F(s) := \operatorname{offCriticalQuartic}(\delta, \gamma) = \bigl((s - \frac{1}{2} - \delta)^2 + \gamma^2\bigr)\bigl((s - \frac{1}{2} + \delta)^2 + \gamma^2\bigr)$（见 [@def-off-critical-quartic]），则 $F$ 在 $\mathbb{C}$ 上全纯可微（`Differentiable ℂ F`），同时具备反射对称与共轭协变（`HasFullZetaSymmetry F`，即 $\forall s,\; F(1 - s) = F(s) \land F(\bar{s}) = \overline{F(s)}$），其零点集恰好是基数为 $4$ 的离线四元组 $\operatorname{sourceZeros}(\delta, \gamma) = \{\frac{1}{2} \pm \delta \pm i\gamma\}$ 且每个零点均满足 $\operatorname{Re}(s) \neq \frac{1}{2}$；由此在全称蕴含层面严格成立（见 [@thm-full-symmetry-not-localization]）：

   $$
   \neg\,\bigl(\forall F : \mathbb{C} \to \mathbb{C},\; \operatorname{Differentiable}\;\mathbb{C}\;F \;\longrightarrow\; \operatorname{HasFullZetaSymmetry}\;F \;\longrightarrow\; \operatorname{FixedLineLocalization}\;F\bigr);
   $$

6. **正实轴上的无条件积分显式公式（`actual_integrated_explicit_formula`）**：记 $\operatorname{actualH}(y) := \sum_{k \in \mathbb{N}} \frac{e^{y\,\rho_k}}{\rho_k(1 - \rho_k)}$ 为按解析重数遍历 $\zeta$ 全体实际非平凡零点族 $\rho_k = \operatorname{actualZero}(k)$ 的绝对收敛级数，记梅尔滕斯—切比雪夫余项函数 $U(t) := t\sum_{0 < k \le \lfloor t\rfloor} \frac{\Lambda(k)}{k} - \psi(t) - t\ln t + (1 + \gamma_{\mathrm{EM}})t$（[@def-divisor-ratio-mertens-error]，其中 $\gamma_{\mathrm{EM}}$ 为欧拉—马斯刻若尼常数）及平凡零点修正级数 $\operatorname{trivialT}(y) := \sum_{n \in \mathbb{N}} \frac{e^{-2(n+1)y}}{2(n+1)(2(n+1)+1)}$，则对一切严格正实数 $y > 0$（`0 < y`）无条件成立：

   $$
   \operatorname{actualH}(y) \;=\; \bigl(U(e^y) - \ln(2\pi) + \operatorname{trivialT}(y) : \mathbb{C}\bigr) \qquad (y > 0);
   $$

7. **右半平面 $\operatorname{Re}(s) > 0$（$s \neq 1$）上的狄利克雷交错级数解析延拓（`tendsto_alternating_partialSums_eta_of_ne_one`）**：对任意满足 `0 < s.re`（$\operatorname{Re}(s) > 0$）且 $s \neq 1$ 的复数 $s \in \mathbb{C}$，交错部分和序列在 $\mathbb{C}$ 的范数拓扑下收敛于狄利克雷 $\eta$ 读数（见 [@lem-alternating-zeta-partial-sums]）：

   $$
   \lim_{N \to \infty} \sum_{n = 0}^{N - 1} (-1)^n (n + 1 : \mathbb{C})^{-s} \;=\; \bigl(1 - 2^{1 - s}\bigr)\,\zeta(s) \qquad (\operatorname{Re}(s) > 0,\; s \neq 1).
   $$
:::

::: proof
第 1 款中，先由算术基本定理证明素数对数在 $\mathbb{Z}$ 上线性无关——任何非零整系数关系 $\sum c_i \ln p_i = 0$ 按正负系数移项取指数即给出两组互异素数幂乘积相等，矛盾——再对有理系数的公分母清分母提升至 $\mathbb{Z} \to \mathbb{Q}$（见 [@thm-prime-log-independence]）。第 2 款中，在严格假设 `1 < s.re` 下分别将 Mathlib 中的 `zeta_eq_tsum_one_div_nat_cpow` 与 `riemannZeta_eulerProduct_tprod` 对接到同一对象 `riemannZeta s`，消去中间项即得级数等于无穷乘积（见 [@cor-dirichlet-sum-eq-euler-product]）。第 3 款中，对整函数核 `completedRiemannZeta₀` 代入函数方程 $\Lambda_0(1 - s) = \Lambda_0(s)$ 与多项式对称因子 $(1 - s)\bigl((1 - s) - 1\bigr) = s(s - 1)$ 即得反射不变（见 [@thm-xi-reading-entire-reflection]）。第 4 款中，在除去极点的稠密开集 $\mathbb{C}\setminus\{0, 1\}$ 上结合施瓦茨共轭协变 $\operatorname{xiReading}(\bar{s}) = \overline{\operatorname{xiReading}(s)}$ 与第 3 款反射律，再由整函数连续性延拓至全平面 $\mathbb{C}$（见 [@prop-zeta-conjugation-covariance]）。第 5 款中，在中心坐标 $z = s - \frac{1}{2}$ 下直接展开偶实系数四次多项式 $\operatorname{offCriticalQuartic}(\delta, \gamma)$，由 $\delta \neq 0,\; \gamma \neq 0$ 检验四个互异根 $\frac{1}{2} \pm \delta \pm i\gamma$ 无一落在 $\operatorname{Re}(s) = \frac{1}{2}$ 上，从而反驳“全对称整函数零点必落定线”的全称命题（见 [@thm-full-symmetry-not-localization]）。第 6 款中，利用非平凡零点虚部倒数平方可和性建立全实轴绝对收敛的零点拉普拉斯和 `actualH`，在右半平面变换线 $\operatorname{Re}(s) = 2 > 1$ 上将 `actualH`、`U ∘ exp` 与 `trivialT` 的拉普拉斯变换与 $\operatorname{xiReading}$ 对数导数、双伽马级数逐项对消，证得加权残差在全频率轴上的 $L^1$ 傅里叶变换恒为零（零频点由 $L^1$ 傅里叶变换连续性闭合，无需越界调用双伽马整数极点），最后对任意满足 `0 < y` 的连续点 $y$ 施行傅里叶反演即得等式。第 7 款中，在 `0 < s.re` 且 $s \neq 1$ 下利用欧拉—麦克劳林一阶余项将偶截断部分和 $\sum_{n < 2M}(-1)^n(n+1)^{-s} = H_{2M}(s) - 2^{1-s}H_M(s)$ 收束至 $(1 - 2^{1-s})\zeta(s)$，再由尾项 $(2M+1)^{-s} \to 0$（因 `0 < s.re`）拼合奇截断子列（见 [@lem-alternating-zeta-partial-sums]）。完整证明由 Lean 内核检查。
:::

用比较公理（$\mathrm{CMP}$）与极小圆弧体的几何语言逐项拆解 [@thm-ch34-riemann-prime-arc-bridge] 第 1、2、7 款及关联数论结构，算术宇宙与量子路径积分的三大核心构件严丝合缝地合二为一（`MODEL` + `手工推导`）：

1. **素数 $p$ 是向下不可约的“正交极小圆弧体 $\Delta\mathcal{T}_p$”**：由 [@thm-ch34-riemann-prime-arc-bridge] 第 1 款（`prime_log_rational_independence`），全体素数的对数步长集合 $\{L_2, L_3, L_5, L_7, \dots\} = \{\ln 2, \ln 3, \ln 5, \ln 7, \dots\}$ 在有理数域 $\mathbb{Q}$ 上严格线性无关——任意两枚不同素数圆弧的本征作用量步长之间不存在任何整数倍公度共振（$\sum_i q_i \ln p_i = 0 \implies \forall i,\; q_i = 0$）。回到概念塔语言，每一个素数 $p$ 正是一枚无法拆解为更低阶算术概念的**本源正交比较原胞（极小圆弧体 $\Delta\mathcal{T}_p$）**；在 $\sigma = \operatorname{Re}(s) > 1$ 内，单步收缩模长 $\lvert p^{-s}\rvert = p^{-\sigma} < 1$，局部欧拉因子展开为绝对收敛的几何级数（`手工推导`）：

   $$
   \bigl(1 - p^{-s}\bigr)^{-1} \;=\; 1 + p^{-s} + p^{-2s} + \cdots \;=\; \sum_{m=0}^{\infty} e^{-m s L_p} \qquad (\operatorname{Re}(s) > 1),
   $$

   精确对应波包围绕第 $p$ 枚极小圆弧体连续缠绕 $m = 0, 1, 2, \dots$ 圈的局部闭合回路振幅和。
2. **自然数 $n$ 是串联拼接的“复合路径 $\Gamma_n$”，对数 $\ln n$ 即路径作用量 $S[\Gamma_n]$**：任一正整数 $n = p_1^{m_1} p_2^{m_2}\cdots p_r^{m_r}$ 都唯一编码了一条在无穷维素数圆弧体正交桁架上穿行的复合路径 $\Gamma_n$。乘法经对数映射直接转化为路径作用量的严格可加性（`手工推导`）：

   $$
   S[\Gamma_n] \;:=\; \ln n \;=\; \sum_{k=1}^{r} m_k \ln p_k \;=\; \sum_{k=1}^{r} m_k L_{p_k}.
   $$

   于是，狄利克雷级数中的每一项 $n^{-s} = e^{-\sigma S[\Gamma_n]}\,e^{-\hat{\mathbf{i}}\,t S[\Gamma_n]}$（在 $\operatorname{Re}(s) > 1$ 内由第 2 款直接绝对求和；跨入临界带 $0 < \operatorname{Re}(s) < 1$ 时，只要避开 $1 - 2^{1-s} = 0$ 的对偶周期点，即可由第 7 款的交错部分和 $\bigl(1 - 2^{1-s}\bigr)^{-1}\lim_{N\to\infty}\sum_{n=0}^{N-1}(-1)^n(n+1)^{-s}$ 无缝延拓读出）都是一条同时携带**实轴 `I` 衰减权重 $e^{-\sigma S[\Gamma_n]}$** 与**虚盲区 `i` 贝里旋转相位 $e^{-\hat{\mathbf{i}}\,t S[\Gamma_n]}$** 的费曼路径振幅。在量子统计物理中，这绝非文学比喻：在 Julia（1990）的自由相对论“素数气体（Primon Gas）”与 Bost–Connes（1995）的非交换量子统计 $C^*$-动力系统中，取算术哈密顿量 $\hat{H}\lvert n\rangle = (\ln n)\lvert n\rangle$ 与逆温度 $\beta = \sigma > 1$，$\zeta(\beta) = \operatorname{Tr}\bigl(e^{-\beta\hat{H}}\bigr)$ 字面上就是多玻色子热真空配分函数（`文献结果，未在本书形式化`）！
3. **倒数 $1/\zeta(s)$ 是服从泡利不相容原理的“费米型外积路径积分 $\Lambda^k$”**：在右半平面 $\operatorname{Re}(s) > 1$ 上将欧拉乘积逐因子取倒数展开，立刻浮现出数论中最核心的莫比乌斯函数 $\mu(n)$（`文献结果，未在本书形式化`）：

   $$
   \frac{1}{\zeta(s)} \;=\; \prod_{p \in \mathbb{P}} \bigl(1 - p^{-s}\bigr) \;=\; \sum_{n=1}^{\infty} \mu(n)\,n^{-\sigma} e^{-\hat{\mathbf{i}}\,t\ln n} \qquad (\operatorname{Re}(s) > 1).
   $$

   审视 $\mu(n)$ 的三值规则，便可认出它在克利福德外代数 $\bigoplus_{k \ge 0}\Lambda^k$ 中的精确手性身份（`MODEL` + `手工推导`）：一旦某条复合路径在同一枚素数圆弧体上重复踩踏两次（$p^2 \mid n$），立即触发自比较去同存异归零 $\mathbf{e}_p \wedge \mathbf{e}_p = 0 \implies \mu(n) = 0$（**严格泡利不相容，禁止同轴二次缠绕自交**）；唯有当路径由 $k$ 枚互异素数圆弧体正交楔积 $\mathbf{e}_{p_1}\wedge\mathbf{e}_{p_2}\wedge\cdots\wedge\mathbf{e}_{p_k}$ 构成无平方因子整数 $n = p_1 p_2\cdots p_k$ 时，才存活并携带外积阶交替反相符号 $\mu(n) = (-1)^k$！

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="euler-dirichlet-phasor-spiral" height="520"}
**欧拉局域绕行算子、狄利克雷复合路径相量螺旋与莫比乌斯外积对偶实验卡（`euler-dirichlet-phasor-spiral`）。** 在绝对收敛区 $\sigma = 1.50,\; t = \gamma_1 \approx 14.1347$ 下，将整数 $n \le 160$ 的箭头 $n^{-\sigma}e^{-\hat{\mathbf{i}}t\ln n}$ 首尾相接抬升至作用量高度 $\ln n = \sum m_p\ln p$（素数幂台阶永不同高）：紫色复合路径链 $\sum n^{-s}$ 与紫色欧拉部分乘积 $\prod_{p \le 160}(1 - p^{-s})^{-1}$ 共同收拢于琥珀色延拓轴与落点珠 $\zeta(s) \approx 0.5421 + 0.0499i$（地面围以青色正向壳 $p^{-\sigma}$ 及其上的琥珀色 $\sigma$ 拖动手柄），而品红色莫比乌斯外积链 $\sum\mu(n)n^{-s}$ 在 $n = 4, 8, 9, 12, \dots$ 处原地只升不走（$\mu = 0$）并收拢于品红落点珠 $1/\zeta(s) \approx 1.8291 - 0.1683i$；读数栏同步核验 $\operatorname{Re}(s) > 0$ 上的交错 $\eta$ 延拓（绿色 `LEAN ✓` 对应 `prime_log_rational_independence`、`riemann_zeta_dirichlet_sum_eq_euler_product` 与 `tendsto_alternating_partialSums_eta_of_ne_one`）。
:::
