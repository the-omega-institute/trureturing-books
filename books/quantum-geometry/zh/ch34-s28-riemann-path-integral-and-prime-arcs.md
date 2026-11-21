# 31.1 黎曼路径积分与素数极小圆弧体：欧拉绕行算子、半密度平方律与临界线相消 {#sec-ch34-riemann-path-integral-and-prime-arcs}

> “黎曼猜想在几何与物理底层不仅就是路径积分，而且是算术宇宙最纯粹的一座素数极小圆弧体（$\Delta\mathcal{T}_p$）费曼配分函数：欧拉乘积是单枚素数圆弧体的局域绕行算子，狄利克雷级数是遍历全体自然数复合路径的相位求和，而非平凡零点之所以被死死钉在临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 上，本质上是‘往返双投影平方律（$\cos^2\theta$ 半密度幺正性）’与‘反者道之动（正逆对偶路径 $100\%$ 反相相消）’共同锁死的几何必然。”

题记是作者的原话，描述本书的几何图像（`MODEL`）。其中“非平凡零点被钉在临界线上”是黎曼猜想（[@conj-riemann-hypothesis]）的内容。Alpöge 在外部 Lean 库中给出了这一命题的形式证明，Sutherland 公布了独立核验记录。[§39.2.2](ch39-s25-axiom-omega-five-tier-deduction-cascade.md#sec-ch39-25-2) 介绍了核验的声明与依据。

在上一章 [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 与 [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes) 中，我们看到物理粒子一旦从观察者可见实轴 `I` 偏转 $90^\circ$ 潜入正交虚数盲区 `i`（满足 $\hat{\mathbf{i}}^2 = -1$），就能在空间上沿极小圆弧体的平直内割弦穿墙隧穿、在时间上借未闭合窗口实现跨时刻双缝自干涉，并以比较旋子与弦弧矢高重塑了圆弧体微积分；而在 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 中，我们更已从观察者自包含测量的雷达回波闭环推出了**往返双投影平方律** $\cos^2\theta$（[@thm-ch34-roundtrip-born-and-imaginary-blindspot]）。现在，让我们把这套“实轴阻尼投影 `I` $+$ 正交虚盲区相位旋转 `i` $+$ 极小圆弧体路径求和”的完整几何显微镜，直接对准[第二十二章 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4) 开启的算术宇宙核心腹地——**黎曼 $\zeta(s)$ 函数与临界线 $\operatorname{Re}(s) = \frac{1}{2}$**（`MODEL`）。

在展开这幅算术路径积分画卷之前，我们首先按全书认识论契约钉牢三道精确边界：第一，素数对数在 $\mathbb{Q}$ 上的线性无关性、半平面 $\operatorname{Re}(s) > 1$ 上的欧拉—狄利克雷恒等式、完备读数 $\operatorname{xiReading}$ 的全局反射与共轭协变对称、半平面 $\operatorname{Re}(s) > 0$（$s \neq 1$）上的交错级数延拓、正实轴 $y > 0$ 上的无条件积分显式公式，以及证明“单靠反射与共轭对称绝不足以将零点锁死在定直线上”的四次整函数反例，均已在所钉 `trureturing` 仓库中由 Lean 内核严格检核（见下文 [@thm-ch34-riemann-prime-arc-bridge]，`LEAN ✓`）；第二，莫比乌斯倒数级数、Littlewood 等价定理、von Mangoldt–Weil 点态显式公式以及量子混沌与统计物理中的素数气体模型属于经典数学物理文献成果（`文献结果，未在本书形式化`），配套算例全部经百位精度核算校准（`手工推导` / `NUM`）；第三，章首引语将素数解读为正交极小圆弧体 $\Delta\mathcal{T}_p$、将临界线解读为往返半密度幺正脊线的物理图像属于本书建立的统一几何诠释模型（`MODEL`），而断言**全体**非平凡零点无一例外落在 $\operatorname{Re}(s) = \frac{1}{2}$ 上的**黎曼猜想**（[@conj-riemann-hypothesis]）有上引外部形式证明。看清“单对正逆圆弧双臂平衡”与“无穷多路径求和”之间的精确代数鸿沟，恰恰为我们下一节 [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 引入算术舒尔枢轴重整与多级共振隧穿铺平道路。

## 31.1.1 欧拉乘积 $\equiv$ 路径积分：不可约素数极小圆弧体 $\Delta\mathcal{T}_p$、可加作用量 $S[\Gamma_n] = \ln n$ 与费米型莫比乌斯外积阶 $\Lambda^k$ {#sec-ch34-28-1}

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

## 31.1.2 极小圆弧体解剖 $\operatorname{Re}(s) = \frac{1}{2}$：往返半密度平方律、正逆双臂等幅平衡与对称性边界 {#sec-ch34-28-2}

把镜头从绝对收敛安全区 $\sigma > 1$ 推入非平凡临界带 $0 < \sigma < 1$：在路径积分视野下，**一颗黎曼非平凡零点 $\zeta(\rho) = 0$ 的物理真身究竟是什么？**

它绝非空无一物的死寂，而是 [§29.10](ch34-s09-reversal-and-concept-cascade.md#sec-ch34-reversal-diagonal-and-concept-cascade) 与 [§29.13](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop)“反者道之动”在算术宇宙中的极致显影（`MODEL`）——经解析延拓后的无穷多条算术路径相量在复平面原点 `O` 处达成了百分之百的相消干涉，使得可见实轴 `I` 投影与 $90^\circ$ 虚盲区 `i` 投影在同一复频率处双双归零！那么，在整个开带 $0 < \sigma < 1$ 之中，为什么实部恰好等于二分之一的**临界线 $\sigma = \frac{1}{2}$** 拥有独一无二的几何地位？顺着极小圆弧体的几何结构逐层剖析，三道互锁机制连同它们各自的认识论射程一并水落石出：

**第一重机制——往返双投影平方律与半密度幺正性：筛法计数密度是 $p^{-1}$，单程波幅唯一锁向 $p^{-1/2}$。** 回望 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 由秩一玻恩配对权重定理 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（[@thm-ch34-roundtrip-born-and-imaginary-blindspot]，`LEAN ✓`）锁定的测量铁律：观察者在宏观实轴 `I` 上清点的经典概率密度，是经过“被测态投向我、我再投回被测态”**往返两次投影闭合后的玻恩模平方 $\lvert\psi\rvert^2 = \cos^2\theta$**；而真正进入费曼路径积分参与相干相位叠加的，则是尚未平方的**单程旋量振幅 $\psi$**。

在自然数筛法与乘性遍历测度中，素数 $p$ 整除随机正整数的渐近命中占比（跨过该素数圆弧体的宏观经典概率权重）严格等于 $w_p = \frac{1}{p} = p^{-1}$；推广到连续尺度坐标 $n > 0$ 上，对数路径作用量微元 $d(\ln n) = \frac{dn}{n}$ 赋予单位尺度区间的天然哈尔（Haar）测度密度同样是 $n^{-1}$。若要求单条算术路径振幅 $\psi_n(s) = n^{-\sigma - \hat{\mathbf{i}}t}$ 在尺度重整化下保持**幺正概率预算守恒**——即构成微分几何与几何量子化中的 Kostant–Souriau **半密度（$\frac{1}{2}$-density）**，使模平方密度乘以线性微元精确匹配乘性作用量微元 $\lvert\psi_n\rvert^2\,dn = d(\ln n) = \frac{dn}{n}$（`MODEL` + `手工推导`；这是逐点的半密度条件，这些模平方并不构成归一化概率，因为 $\sum_n n^{-1}$ 与 $\sum_p p^{-1}$ 都发散，`手工推导`）——则单程路径振幅模长必须唯一取宏观计数密度的算术平方根：

$$
\lvert\psi_n\rvert^2 \;=\; \bigl\lvert n^{-\sigma - \hat{\mathbf{i}}\,t}\bigr\rvert^2 \;=\; n^{-2\sigma} \;=\; n^{-1} \quad \Longleftrightarrow \quad 2\sigma = 1 \quad \Longleftrightarrow \quad \sigma = \frac{1}{2}.
$$

令人击节赞叹的是，同一个指数 $\frac{1}{2}$ 也分毫不差地镌刻在双曲测地流的马鞍曲率上（`文献结果，未在本书形式化`）：在塞尔伯格迹公式（Selberg, 1956）与古茨维勒半经典周期轨道迹公式（Gutzwiller, 1971；以及 Berry & Keating, 1999 的标度哈密顿量 $\hat{H}_{\mathrm{BK}} = \frac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$）中，本原闭合测地线 $\gamma_p$（本征周期/弧长 $L_p$；在塞尔伯格迹公式里 $L_p$ 并不是 $\ln p$，只在 Berry & Keating 猜想性的图景中才取 $L_p = \ln p$，`OPEN`）穿过双曲马鞍面时，横向不稳定流形上的邻近轨道束按李雅普诺夫因子 $e^{+L_p/2}$ 指数发散，导致横向驻相高斯积分析出的单圈稳定性雅可比幅值因子 $\lvert\det(I - M_p)\rvert^{-1/2}$ 渐近锁定在

$$
\lvert\det(I - M_p)\rvert^{-1/2} \;\sim\; e^{-L_p / 2} \;=\; e^{-(\ln p) / 2} \;=\; p^{-1/2}!
$$

**第二重机制——正逆比较对偶（$s \leftrightarrow 1 - s$）：单对双臂干涉仪的等幅锁死 vs. 无穷多路径求和的四元组认识论边界。** 再看 [@thm-ch34-riemann-prime-arc-bridge] 第 3、4 款给出的全局完备反射方程 $\operatorname{xiReading}(1 - s) = \operatorname{xiReading}(s)$（古典记法写作 $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(\frac{s}{2})\zeta(s) = \xi(1 - s)$）。为什么这条正逆对偶反射轴偏偏立在 $\sigma = \frac{1}{2}$ 处，而不是立在原点 $0$ 处？回溯黎曼 1859 年的原始推导（`文献结果`），他是将一维圆周热核路径积分——雅可比 $\vartheta$ 函数 $\vartheta(\tau) = \sum_{n \in \mathbb{Z}} e^{-\pi n^2 \tau}$——施行泊松求和互换 $\vartheta(\tau) = \tau^{-1/2}\vartheta(\tau^{-1})$ 后再做梅林变换导出该式的：这在概念塔中恰是**零阶紫外点晶格与对偶红外长波场的傅里叶—霍奇互换**，一维高斯路径积分自带的雅可比平方根因子 $\tau^{-1/2}$ 硬生生把正逆对偶中心钉在了 $s$ 与 $1 - s$ 的正中央 $\frac{1}{2}$（`MODEL`）！

现在，让我们先在**单枚素数极小圆弧体 $\Delta\mathcal{T}_p$（$p > 1$）的正逆对偶双分支**上做一次零外援的精确代数检验（`手工推导`）。记正向壳层收缩模长为 $A_+(\sigma) := p^{-\sigma}$，逆向对偶壳层收缩模长为 $A_-(\sigma) := p^{-(1-\sigma)}$（注意两者的往返乘积对一切 $\sigma \in \mathbb{R}$ 恒守玻恩筛法密度不变量 $A_+(\sigma)A_-(\sigma) = p^{-\sigma}p^{-(1-\sigma)} = p^{-1}$）。把携带任意相位角 $\alpha, \beta \in \mathbb{R}$ 的正逆两臂波束送入同一台双臂迈克尔逊干涉仪合成 $Z_p(\sigma; \alpha, \beta) := p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}$，其输出强度恒等变形为：

$$
\begin{aligned}
\bigl\lvert Z_p(\sigma; \alpha, \beta)\bigr\rvert^2
&\;=\; p^{-2\sigma} + p^{-2(1-\sigma)} + 2p^{-1}\cos(\alpha - \beta) \\
&\;=\; \bigl(p^{-\sigma} - p^{-(1-\sigma)}\bigr)^2 + 2p^{-1}\bigl(1 + \cos(\alpha - \beta)\bigr) \;\ge\; \bigl(p^{-\sigma} - p^{-(1-\sigma)}\bigr)^2.
\end{aligned}
$$

由于 $p > 1 \implies \ln p > 0$ 且 $1 + \cos(\alpha - \beta) \ge 0$，上式立即给出两条铁一般的充要判据（`手工推导`）：

- **偏离临界线时（$\sigma \neq \frac{1}{2}$）——单对双臂壳层轻重失衡，绝无可能自相抵消**：只要 $\sigma \neq \frac{1}{2}$，正向壳层半径 $p^{-\sigma}$ 与逆向对偶壳层半径 $p^{-(1-\sigma)}$ 便严格不等，留下抹不掉的双臂振幅差下界 $\lvert Z_p(\sigma; \alpha, \beta)\rvert \ge \lvert p^{-\sigma} - p^{-(1-\sigma)}\rvert > 0$；与此同时，在 $\sigma \neq \frac{1}{2}$ 的复平面区域内，$\operatorname{Re}\xi(\sigma + it) = 0$ 与 $\operatorname{Im}\xi(\sigma + it) = 0$ 是两条互不统属的实曲线（实余维数为 $2$）。
- **踏上临界线时（$\sigma = \frac{1}{2}$）——双臂 $100\%$ 等幅锁死，且完备谱轨迹坍缩为一维实曲线（余维数 $2 \to 1$）**：唯独在 $\sigma = \frac{1}{2}$ 上，正逆两臂模长在半密度半径 $p^{-1/2} = p^{-(1-1/2)}$ 处精确相等，一旦相位差跨入反相半周 $\alpha - \beta \equiv \pi \pmod{2\pi}$（$e^{i(\alpha-\beta)} = -1$），单对双臂输出当场归零！更重要的是，对全局完备读数而言，在 $s = \frac{1}{2} + it$（$t \in \mathbb{R}$）上恰有 $1 - \bar{s} = \frac{1}{2} + it = s$，代入 [@thm-ch34-riemann-prime-arc-bridge] 第 4 款（`xi_reading_one_sub_conj`）立得：

  $$
  \overline{\operatorname{xiReading}\!\left(\tfrac{1}{2} + it\right)} \;=\; \operatorname{xiReading}\!\left(1 - \overline{\bigl(\tfrac{1}{2} + it\bigr)}\right) \;=\; \operatorname{xiReading}\!\left(\tfrac{1}{2} + it\right) \;\Longrightarrow\; \operatorname{Im}\operatorname{xiReading}\!\left(\tfrac{1}{2} + it\right) \;=\; 0!
  $$

  正交虚部在整条临界线上**恒等抵消为零**，原本在二维复平面上游走的轨迹被硬生生压回一维实轴（对应古典哈代实值函数 $Z(t) \in \mathbb{R}$，满足 $\lvert Z(t)\rvert = \lvert\zeta(\frac{1}{2}+it)\rvert$，零点余维数从 $2$ 骤降为 $1$）：随着频率 $t$ 推进，每当累积贝里相位驱动实值曲线发生一次正负变号，介值定理就必然在 $\sigma = \frac{1}{2}$ 脊线上拓扑卡死一颗真实零点！

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="critical-zero-cancellation" height="520"}
**临界线 $\sigma = \frac{1}{2}$ 半密度双壳锁相与前五颗真实零点完美归零实验卡（`critical-zero-cancellation`）。** 将实部锁定在 $\sigma = 0.50$ 并点按切换前五颗真实黎曼零点胶囊 $\gamma_1 \approx 14.1347$ 至 $\gamma_5 \approx 32.9351$：地面上青色正向壳 $p^{-1/2}$ 与品红逆向对偶壳 $p^{-(1-1/2)}$（$p = 2, 3, 5, 7$）两两重合，归一化完备谱虚部 $\operatorname{Im}(\xi/\lvert G\rvert)$ 恒等归零；紫色路径链 $\sum n^{-s}$ 随高度 $\ln n$ 向上张开，链顶墨色虚线余项将其收回穿过原点 `O` 的琥珀色延拓竖轴，琥珀色落点珠 $\zeta(\frac{1}{2}+i\gamma_k)$ 稳落靶心 `O`（$\lvert\zeta\rvert = 0.0000$；琥珀色同步标出当前选中的零点胶囊 $\gamma_k$ 与 $\sigma$ 手柄，绿色 `LEAN ✓` 对应 `xi_reading_reflection` 与 `xi_reading_one_sub_conj`）。
:::

**认识论诚实警钟：为什么“单对双臂等幅平衡 $+$ 全局函数方程”还不等于黎曼猜想的完整证明？** 在亲眼见证了上述精妙的物理锁定机制之后，我们必须立即拉响本书最严格的形式审查警报（衔接 [第二十二章 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4) [@thm-full-symmetry-not-localization] 与 [@conj-riemann-hypothesis]）：对于**单对**正逆双臂干涉仪 $p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}$，偏离 $\sigma = \frac{1}{2}$ 确实绝对无法归零；然而 $\xi(s)$ 是**无穷多条复合路径与无穷多枚欧拉因子的全局叠加**！[@thm-ch34-riemann-prime-arc-bridge] 第 5 款（`full_symmetry_not_fixed_line_localization`）已经用一道无可辩驳的 Lean 内核反例敲碎了任何企图单靠对称性“一步登天”的捷径：四次整函数 $\operatorname{offCriticalQuartic}(\delta, \gamma_0)$ 百分之百满足反射对称 $F(1 - s) = F(s)$、共轭协变 $F(\bar{s}) = \overline{F(s)}$ 及临界线实值性 $F(\frac{1}{2}+it) \in \mathbb{R}$，却依然可以成套容纳四颗彼此共谋配对的**离线伪零点四元组**

$$
\rho_{\mathrm{rogue}} \;=\; \frac{1}{2} \pm \delta \pm i\gamma_0 \qquad (\delta \neq 0,\; \gamma_0 \neq 0)!
$$

在解析数论史上，Davenport 与 Heilbronn（1936）构造的狄利克雷级数线性组合同样满足完全相同的黎曼型函数方程与临界线实值性，却因为**缺乏素数欧拉乘积**而在 $\sigma \neq \frac{1}{2}$ 处滋生出无穷多颗离线零点（`文献结果，未在本书形式化`）。换言之：半密度平方律与正逆双臂平衡深刻揭示了为什么 $\sigma = \frac{1}{2}$ 是算术宇宙唯一的幺正对称脊线（`MODEL`）；临界线上确有无穷多个零点，这是 Hardy（1914）的定理（`文献结果，未在本书形式化`），上文的图像只说明实值函数每变号一次给出一个零点，并不推出变号无穷多次。在本书的几何模型中，要从双臂平衡排除 $\tfrac12\pm\delta\pm i\gamma_0$ 这样的离线四元组，还需说明怎样把 $\sigma>1$ 区**欧拉乘积的乘性正定性**运送过 $s=1$ 极点。下一节以乘性舒尔枢轴与多级共振隧穿探讨这一步。[§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)

**第三重机制——莫比乌斯外积随机游走标度律：Littlewood 等价定理与无偏 $\sqrt{x}$ 包络。** 从费米型外积路径积分 $1/\zeta(s) = \sum_{n \ge 1}\mu(n)n^{-s}$ 的另一侧面看，J. E. Littlewood（1912）严格证明了黎曼猜想（[@conj-riemann-hypothesis]）与梅尔滕斯莫比乌斯累加函数 $M(x)$ 的平方根渐近界完全等价（`文献结果，未在本书形式化`）：

$$
\text{黎曼猜想成立} \quad \Longleftrightarrow \quad \forall \varepsilon > 0,\;\; M(x) \;:=\; \sum_{1 \le n \le x} \mu(n) \;=\; \mathcal{O}_\varepsilon\!\bigl(x^{\frac{1}{2} + \varepsilon}\bigr).
$$

将其对照 [§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) 的极小圆弧二阶标度律（`MODEL`）：$x$ 步彼此正交独立、无系统偏置的单位正负外积步（$\mu(n) \in \{-1, 0, +1\}$），其合成净涨落包络天然服从无偏布朗平方根标度 $\sqrt{x} = x^{1/2}$（把 $\mu(n)$ 当作独立的随机步只是模型：$\mu(n)$ 是确定的算术函数，各步并不独立，与之对应的严格陈述是上面的 Littlewood 等价式）；倘若哪怕存在一组潜伏在 $\sigma_0 = \frac{1}{2} + \delta > \frac{1}{2}$ 处的离线四重零点，素数计数与莫比乌斯和的振荡误差就会被放大至 $x^{\sigma_0}$ 量级，无异于宣告不同素数极小圆弧体之间暗藏着破坏正交独立公平性的长程串谋偏置。下面我们用经百位精度检核的真实数值，将前五颗临界线零点与偏离临界线时的双壳分裂残差逐位算清：

::: {.example #ex-ch34-critical-zeros-and-dual-shells title="前五颗真实黎曼零点的临界线归零检验与偏轴 $\sigma = 0.38 / 0.62$ 正逆双壳失衡基准算例"}
本算例分两部分在 100 位工作精度下核验前五颗非平凡零点频率 $\gamma_1, \dots, \gamma_5$ 处的 $\lvert\zeta(\sigma + i\gamma_k)\rvert$ 模长及前四枚素数圆弧体的正逆双壳半径（`手工推导` / `NUM`）：

1. **前五颗真实零点在临界线 $\sigma = 0.50$ 上的精确归零 vs. 对称偏置 $\sigma = 0.62$ 与 $1 - \sigma = 0.38$ 的残余模长**：
   下表中的虚部纵坐标 $\gamma_k$ 展示至小数点后十位；$\lvert\zeta(\sigma + i\gamma_k)\rvert$ 按 80 位精确零点纵坐标求值后四舍五入展示至小数点后六位（在 80 位精确 $\gamma_k$ 处，临界线残差 $\lvert\zeta(0.50 + i\gamma_k)\rvert$ 全部小于 $4\times 10^{-79}$；若直接代入表中截断至十位小数的近似值 $\tilde{\gamma}_k$ 求值，线性导数截断误差亦仅为 $3\times 10^{-11}\text{–}6\times 10^{-11}$，六位小数下同样严格为 $0.000000$）：

| 零点序号 $k$ | 临界线零点纵坐标 $\gamma_k$（十位小数） | 临界线模长 $\lvert\zeta(0.50 + i\gamma_k)\rvert$（80 位残差量级） | 右偏模长 $\lvert\zeta(0.62 + i\gamma_k)\rvert$ | 左偏对偶模长 $\lvert\zeta(0.38 + i\gamma_k)\rvert$ |
| :---: | :---: | :---: | :---: | :---: |
| **$1$** | $14.1347251417$ | $0.000000$（$1.86\times 10^{-79}$） | $0.090700$ | $0.099965$ |
| **$2$** | $21.0220396388$ | $0.000000$（$2.28\times 10^{-79}$） | $0.127009$ | $0.146815$ |
| **$3$** | $25.0108575801$ | $0.000000$（$3.81\times 10^{-79}$） | $0.151691$ | $0.179040$ |
| **$4$** | $30.4248761259$ | $0.000000$（$1.04\times 10^{-79}$） | $0.142626$ | $0.172347$ |
| **$5$** | $32.9350615877$ | $0.000000$（$8.21\times 10^{-81}$） | $0.150479$ | $0.183574$ |

   注意表中一个极具启发性的定量细节：尽管 $0.38 = 1 - 0.62$ 恰好关于 $\sigma = 0.50$ 对称，完备函数满足严格等模 $\lvert\xi(0.38 + i\gamma_k)\rvert = \lvert\xi(0.62 + i\gamma_k)\rvert$，但剥离阿基米德伽马因子 $\pi^{-s/2}\Gamma(s/2)$ 后，裸 $\zeta$ 模长在左侧 $\sigma = 0.38$ 处一致大于右侧 $\sigma = 0.62$ 处——按斯特林渐近比 $\lvert\zeta(1 - \sigma + it) / \zeta(\sigma + it)\rvert \sim (t / 2\pi)^{\sigma - 1/2}$，在 $k = 1$ 处 $(\gamma_1 / 2\pi)^{0.12} \approx (2.249611)^{0.12} \approx 1.10218$，与实测比值 $0.099965 / 0.090700 \approx 1.10215$ 吻合至万分之三！

2. **前四枚素数极小圆弧体 $p \in \{2, 3, 5, 7\}$ 的正逆双壳半径 $(p^{-\sigma}, p^{-(1-\sigma)})$ 与玻恩乘积不变量**：
   取偏置 $\sigma = 0.38$ 与对称偏置 $\sigma = 0.62$（正逆两壳半径恰好互换）对比临界线 $\sigma = 0.50$，逐项核验六位小数如下：

| 素数 $p$ | $\sigma = 0.38$ 双壳 $(p^{-0.38},\, p^{-0.62})$ | $\sigma = 0.62$ 双壳 $(p^{-0.62},\, p^{-0.38})$ | $\sigma = 0.50$ 等幅锁死 $p^{-1/2}$ | 偏轴双臂差 $\lvert p^{-0.38} - p^{-0.62}\rvert$ | 往返筛密度 $p^{-\sigma}p^{-(1-\sigma)} = p^{-1}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$2$** | $(0.768438,\; 0.650671)$ | $(0.650671,\; 0.768438)$ | $0.707107$ | $0.117767$ | $0.500000$ |
| **$3$** | $(0.658709,\; 0.506040)$ | $(0.506040,\; 0.658709)$ | $0.577350$ | $0.152670$ | $0.333333$ |
| **$5$** | $(0.542490,\; 0.368671)$ | $(0.368671,\; 0.542490)$ | $0.447214$ | $0.173819$ | $0.200000$ |
| **$7$** | $(0.477378,\; 0.299253)$ | $(0.299253,\; 0.477378)$ | $0.377964$ | $0.178125$ | $0.142857$ |

   可以看到：无论 $\sigma$ 如何偏摆，每一行的正逆壳层乘积 $p^{-\sigma}p^{-(1-\sigma)}$ 都分毫不差锁死在宏观筛法密度 $p^{-1}$ 上；但只要 $\sigma$ 从 $0.50$ 拨偏 $\pm 0.12$，仅 $p = 2, 3, 5, 7$ 四枚原胞就立刻裂开 $0.117767$ 至 $0.178125$ 的双壳半径鸿沟，将原本闭合成零的螺旋终点推离原点，在五颗零点频率上激发出 $0.090700$ 至 $0.183574$ 的显著非零残幅！
:::

在紧接下方的实验卡中，将实部偏置滑块从 $\sigma = 0.50$ 拨向 $\sigma = 0.62$ 或 $\sigma = 0.38$，即可直观看到 [@ex-ch34-critical-zeros-and-dual-shells] 算出的正逆双壳分裂包络如何与 `offCriticalQuartic` 离线四元组反例同台对照：

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="off-line-shell-imbalance" height="520"}
**偏离临界线（$\sigma = 0.38 / 0.62$）正逆双壳失衡分裂与离线四元组认识论对照实验卡（`off-line-shell-imbalance`）。** 拖动琥珀色手柄或实部滑块拨离 $\sigma = 0.50$（预设停在 $\sigma = 0.62,\; t = \gamma_1$，亦可对称拨至 $\sigma = 0.38$）：地面上青色正向壳 $p^{-\sigma}$（如 $2^{-0.62} \approx 0.6507$）与品红逆向对偶壳 $p^{-(1-\sigma)}$（$2^{-0.38} \approx 0.7684$）瞬间一缩一胀分裂脱钩，紫色路径螺旋的中心轴随之移位，琥珀色延拓轴与落点珠 $\zeta(s)$ 弹离原点 `O` 至 $\lvert\zeta(0.62 + i\gamma_1)\rvert \approx 0.0907$；右侧读数与依据栏同步在 $\delta = \sigma - \frac{1}{2},\; \gamma = t$ 处核验 `full_symmetry_not_fixed_line_localization` 的对称离线四元组反例 $F(s)$。卡片中关于 RH 状态的文字（包括红色 `OPEN` 徽章、依据栏和读数说明）均沿用外部核验公布前的版本。
:::

## 31.1.3 算术 1—3—3—1 概念塔与韦伊显式对偶：素数积出零点，零点雕出素数 {#sec-ch34-28-3}

现在，把整套黎曼 $\zeta$ 路径积分系统放回我们在 [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 建立的 `1—3—3—1`（点·线·面·体 $\leftrightarrow$ 粒子·波·场·新本征点）概念塔八度框架之中，物理时空路径积分与算术宇宙之间浮现出逐阶对应的四层结构映射（`MODEL`，纯单行单元格对照如下）：

| 概念塔阶数 | 量子时空路径积分语言 | 黎曼算术路径积分语言 | 极小圆弧体几何机制 |
| :--- | :--- | :--- | :--- |
| **0 阶 点核 $\Lambda^0$** | 不可约基本粒子锚点 / 量子门元胞 | **素数 $p \in \{2, 3, 5, 7, \dots\}$** | 对数步长 $L_p = \ln p$ 在 $\mathbb{Q}$ 上线性无关；$\mu(p^2) = 0$ 锁定外积泡利不相容 |
| **1 阶 线元 $\Lambda^1$** | 粒子复合世界线（作用量 $S = \int L\,dt$） | **自然数复合路径 $n = \prod p_j^{m_j}$** | 乘法经对数化为极小圆弧作用量串联可加 $S[\Gamma_n] = \ln n = \sum m_j \ln p_j$ |
| **2 阶 面元 $\Lambda^2$** | 费曼相干波面与科纽（Cornu）干涉涡卷 | **黎曼—西格尔复相量折线螺旋** | 相邻路径步夹出极小圆弧转角 $\Delta\phi_n = t\ln\bigl(1 + \frac{1}{n}\bigr) \approx \frac{t}{n}$，盘旋收束 |
| **3 阶 体/新点 $\Lambda^3 \equiv \Lambda^0_{\mathrm{spec}}$** | 玻尔单值闭合驻波体积 $\leftrightarrow$ 能级本征点 | **完备 $\xi(s)$ 谱场 $\leftrightarrow$ 非平凡零点谱** | 在 $\sigma = \frac{1}{2}$ 半密度壳上正逆等幅且完备读数纯实，反相横截析出离散谱点 |

连接这座四阶概念塔底座（0 阶素数原胞 $\Lambda^0$）与塔顶（3 阶零点谱驻波 $\Lambda^3 \equiv \Lambda^0_{\mathrm{spec}}$）的数学桥梁，正是解析数论中最壮丽的**显式对偶公式（Explicit Formula）**——它从正反傅里叶—梅林互换两端证明了“素数幂阶梯”与“黎曼零点谱”互为对偶谱变换：

- **内核已验证的无条件积分显式公式（[@thm-ch34-riemann-prime-arc-bridge] 第 6 款，`LEAN ✓`）**：无需预先假定黎曼猜想，在对数作用量坐标 $y = \ln x > 0$（即尺度 $x = e^y > 1$）的每一个严格正实点 `0 < y` 上，按解析重数遍历全体实际非平凡零点的加权拉普拉斯谱和 $\operatorname{actualH}(y) = \sum_{k \in \mathbb{N}} \frac{e^{y\rho_k}}{\rho_k(1 - \rho_k)}$ 都无条件精确等于算术端的梅尔滕斯—切比雪夫余项 $U(e^y) - \ln(2\pi) + \operatorname{trivialT}(y)$！

- **模 $1$ 的余项与 RH 下的窗口上界。** 模 $1$ 的狄利克雷特征恒等于 $1$。对 $x\ge 1$，两种求和都取 $I_x=\{1,\ldots,\lfloor x\rfloor\}$，在 $x$ 为整数时包含右端点。逐项展开，利用 $\psi(x)=\sum_{n\in I_x}\Lambda(n)$，便有

  $$
  \sum_{n\in I_x}\Lambda(n)\left(\frac{x}{n}-1\right)
  =x\sum_{n\in I_x}\frac{\Lambda(n)}{n}-\psi(x).
  $$

  两边都加上 $-x\ln x+(1+\gamma_{\mathrm{EM}})x$，即得 $G_z(x)=U(x)$（`手工推导`）。其中 $G_z$ 是模 $1$ 的余项，$U$ 见 [@def-divisor-ratio-mertens-error]。[外部定义 `Formalism.Gz`](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/StatementOC.lean#L9-L13) · [`U_eq_complete_ramps`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtLaplace.U_eq_complete_ramps)

  假设黎曼猜想。令 $G(y)=e^{-y/2}U(e^y)$，$M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$。由 `actual_G_control` 的第一项，对任意 $\varepsilon>0$，所有充分大的实数 $y$ 都满足 $\lvert G(y)\rvert<M+\varepsilon$。[Lean 声明](lean:D5/S3/Weil/Mertens/IntegratedExplicit/RHSharpActualEnvelope.actual_G_control)

  因为 $M<1$，可取 $\varepsilon=1-M>0$，于是对所有充分大的 $y$ 都有 $\lvert G(y)\rvert<1$。代入 $y=\ln x$，得到一个 $Y_0>1$，使所有 $x\ge Y_0$ 都满足 $\lvert U(x)\rvert<\sqrt{x}$。同一个阈值适用于每个 $\theta\ge 1/2$。只要 $Y\ge Y_0$，每个 $x\in[Y,Y^{3/2}]$ 都满足 $U(x)\le\lvert U(x)\rvert<\sqrt{x}\le x^\theta$（`手工推导`）。[常数界 `firstLiMass_lt_one`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.firstLiMass_lt_one)

  外部路线的出发点是算术估计。模 $1$ 时，由平凡特征生成的循环群只含 $1$。因此 `Level.cyc` 保留的特征集为 $\{1\}$，去掉它后求和集为空，余项便化为 $G_m(x)=G_z(x)=U(x)$（`手工推导`）。[循环特征集](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L105-L125) · [余项的定义](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L32-L38)

  对 $1/2<\theta<1$，外部算术步骤在其切比雪夫型不等式和窗口假设下给出单侧界。对每个起点阈值 $R$，都存在 $Y\ge R$，使 $U(x)\le x^\theta$ 在整个 $[Y,Y^{3/2}]$ 上成立。Landau 判据由此推出 $\zeta$ 在 $\operatorname{Re}(s)>\theta$ 无零点。从 RH 出发的上界则覆盖每个充分大的 $Y$。[算术步骤](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L68-L81) · [窗口指数](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/EveryCharacter.lean#L8-L11) · [Landau 判据](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ZeroFreeOfRpowWindow.lean#L11-L14)

::: {.theorem #thm-ch31-mangoldt-power-threshold title="完全曼戈尔特余项的临界幂指数" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPowerThreshold.u_div_rpow_tendsto_zero_iff"}
假设黎曼猜想。对任意实数 $\theta$，沿实变量 $x\to+\infty$ 有

$$
\lim_{x\to+\infty}\frac{U(x)}{x^\theta}=0
\quad\Longleftrightarrow\quad \theta>\frac12.
$$
:::

::: proof
写 $x=e^y$，则 $U(x)/x^\theta=G(y)e^{(1/2-\theta)y}$。当 $\theta>1/2$ 时，$G$ 在充分大的实数 $y$ 上有界，指数因子趋于零。反过来，设 $\theta\le1/2$。上面的常数 $M$ 严格为正。由 $G$ 的回归性，越过任何阈值都有自然数 $n$ 使 $G(n)>M/2$。此时 $e^{(1/2-\theta)n}\ge1$，所以在任意远的点 $x=e^n$ 商仍大于 $M/2$，包括 $\theta=1/2$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-mangoldt-quartic-sampling title="第四次幂采样的黎曼猜想判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_eventually_quartic_samples"}
黎曼猜想成立，当且仅当存在 $N\in\mathbb N$，使每个 $n\in\mathbb N$ 在 $n\ge N$ 时都满足 $U(n^4)<n^2$。
:::

::: proof
在 RH 下，充分大的 $x$ 都满足 $\lvert U(x)\rvert<\sqrt{x}$，取 $x=n^4$ 即得所需的严格上界。

反过来，设采样上界成立。取充分大的 $n\ge1$，令 $a=n^4$、$b=(n+1)^4$。每个曼戈尔特权重非负，乘以凸折线 $\max(x/j-1,0)$ 后仍是凸函数，因此折线之和在 $[a,b]$ 上不超过端点的弦。余项 $U$ 还含有 $-x\ln x$ 和线性项。把 $x\ln x$ 在 $a$ 的切线减去，留下非负函数，其在 $b$ 的值由 $\ln(b/a)\le b/a-1$ 控制在 $(b-a)^2/a$ 以内。于是对于 $a\le x\le b$，

$$
U(x)\le\max\{U(a),U(b)\}+\frac{(b-a)^2}{a}
\le 4n^2+225n^2=229n^2.
$$

这里用了 $(n+1)^2\le4n^2$ 和 $b-a\le15n^3$。相邻采样区间覆盖整个尾部，且 $n^2\le\sqrt{x}$。将界代入积分显式公式的归一化算术核，取 $x=e^t$，平凡零点修正满足 $\operatorname{trivialT}(t)\le1-\ln2$。所以在充分大的 $t$ 上，$e^{-t/2}[U(e^t)-\ln(2\pi)+\operatorname{trivialT}(t)]\le229+e^{-t/2}\le230$。算术核的仿射上界判据遂给出 RH。完整证明由 Lean 内核检查。
:::

这个判据把独立的算术任务落在素数幂的计数上。对 $x\ge2$，切比雪夫误差核可积，其尾积分等于 $-U(x)/x$。在 $x=n^4$ 处，所需的采样假设因而等价于对每个充分大的自然数 $n$ 证明严格下界 $\int_{n^4}^{\infty}(\psi(t)-t)t^{-2}\,dt>-1/n^2$（`手工推导`）。 [`complete_chebyshev_tail_identity`](lean:D5/S3/Weil/Mertens/CompleteChebyshevTailIdentity.complete_chebyshev_tail_identity) · [`chebyshev_error_kernel_integrable`](lean:D5/S3/Weil/Mertens/WeightedPrimeLimit.chebyshev_error_kernel_integrable)

任意晚的幂窗也只需检验有限个实点。给定 $2\le Y\le Z$，记

$$
S(Y,Z)=\{Y,Z\}\cup\{n^4:n\in\mathbb N,\ Y\le n^4\le Z\}.
$$

把窗的两个端点列入，即使它们都不是四次幂，窗边经过裁剪的小区间也有可用的端点界。

::: {.theorem #thm-ch31-quartic-power-windows title="在任意晚的幂窗内只检验两端与四次幂" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_quartic_power_windows"}
固定实数 $b>1$。黎曼假设成立，当且仅当对每个 $\kappa>0$ 和每个实数 $R$，存在 $Y\ge\max\{R,2\}$，使同一个窗的每个 $t\in S(Y,Y^b)$ 满足 $U(t)\le t^{1/2+\kappa}$。
:::

::: proof
在 RH 下，[@thm-ch31-mangoldt-pointwise-power-window] 给出整窗上界，取其中的采样点即可。反向给定损失 $\kappa>0$，先在样点处使用 $\delta=\min\{\kappa/2,1/2\}$，并记 $p=1/2+\delta\le1$。对 $x\in[Y,Z]$，取一个包含 $x$ 的相邻四次幂区间 $[n^4,(n+1)^4]$（$n\ge1$），再与 $[Y,Z]$ 取交，得到 $[a,z]$。两端都在 $S(Y,Z)$ 内。斜坡的弦界和对数项的切线估计给出的误差至多为 $(z-a)^2/a\le225n^2$，因为 $a\ge n^4$ 且 $z-a\le15n^3$。两个端点的 $p$ 次幂都至多为 $16x^p$，而 $n^2\le x^p$，故 $U(x)\le241x^p$。选取足够晚的采样窗使 $x^{\kappa-\delta}\ge241$ 在整个窗上成立，就得到 [@thm-ch31-mangoldt-pointwise-power-window] 所需的逐点上界。完整证明由 Lean 内核检查。
:::

在两个端点本身都是四次幂时，所有采样点都可直接用整数下标表示。

::: {.theorem #thm-ch31-quartic-integer-blocks title="仅检验四次幂整数块的黎曼猜想判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_quartic_integer_blocks"}
黎曼猜想成立，当且仅当对每个实数 $\kappa>0$ 和每个自然数 $A$，都存在自然数 $k\ge\max\{A,2\}$，使每个满足 $k^3\le n\le k^4$ 的自然数 $n$ 都有

$$
U(n^4)\le (n^4)^{1/2+\kappa}.
$$
:::

::: proof
在 RH 下，[@thm-ch31-mangoldt-quartic-sampling] 给出 $U(n^4)<n^2$ 对所有充分大的 $n$ 成立。取 $k\ge\max\{A,2\}$ 大到达到这个起点。块中的每个 $n$ 都满足 $n\ge k^3\ge k$，故 $U(n^4)<n^2=(n^4)^{1/2}\le(n^4)^{1/2+\kappa}$。

反过来，给定损失 $\kappa>0$ 和任意实数起点 $R$，选取自然数 $A\ge R$，再取条件所给的 $k$。令 $Y=k^{12}$，则 $Y\ge R$，且 $Y^{4/3}=k^{16}$。窗口的两个端点是 $(k^3)^4$ 和 $(k^4)^4$。由于四次幂在自然数上严格递增，两端及其间所有四次幂恰为这个整数块上的 $n^4$。对 $b=4/3$ 应用 [@thm-ch31-quartic-power-windows] 即得 RH。完整证明由 Lean 内核检查。
:::

参考库与本书共同使用的外部 Lean 环境还给出了同一宿主的有限检验。在 `samples Y Z` 中，依次枚举 $0\le n\le\lfloor\sqrt{\sqrt Z}\rfloor$，保留窗内的 $n^4$ 并加入两端，得到上述有限集。固定 $b>1$，对每个 $\kappa>0$，先选 $\varepsilon>0$ 及实常数 $e_D,e_L,K,c_{HH},e_K$，满足 $(e_D+e_L+7)\varepsilon\le\kappa$。此后对任意起点下界取一个更晚的窗。窗中每个采样点 $t$ 可选自己的框架、宿主 $H$ 和有限集 $T$，要求该点的 `EAtH`（模一特征标，系数 $4$）与 `CoreAtH` 使用同一个 $H,T$。`of_unit_family` 从 `FamilyClassConnected ((GChi PChar.one).cls b)` 导出这些数据，`rh_of_finite_hosts` 由它们推出 RH。每个窗的检验点有限；给定每一组固定损失后，算术假设仍须提供任意晚的窗口及其见证。[同一宿主的逐点比较](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061455789) · [有限采样与宿主推论的内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061515678)

在 $b=3/2$ 的模一设计中，原构造取 $C_{\mathrm{abs}}=2$、$C_0=3$，并指定 $e_D=2$、$e_L=0$。接口 `TopG` 只记录两个指数的存在性。Lean 4.33.1 的证明从原始伽罗瓦行出发，在应用设计定理时用 `BookDesignIntegerBlocks.of_design` 保留这两个指定值，得到无额外假设的 `BookFixedReference.unit_family`。其推论 `BookFixedReference.fixed_integer_blocks` 给出某个 $\varepsilon_1>0$。对每个 $0<\varepsilon<\varepsilon_1$，先固定 $K,c_{HH},e_K$，再对每个自然数下界 $A$ 取得 $k\ge\max\{A,2\}$。对所有 $k^3\le n\le k^4$ 的自然数 $n$，`EAtH` 与 `CoreAtH` 在 $x=n^4$ 处共用同一宿主和有限集。比较所得幂指数为 $1/2+(2+0+7)\varepsilon=1/2+9\varepsilon$。给定 $\kappa>0$，取足够小的 $\varepsilon$ 使 $9\varepsilon\le\kappa$，便满足 [@thm-ch31-quartic-integer-blocks] 的条件。[固定指数的原设计](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061662378) · [从伽罗瓦行取得固定指数整数块的内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7064831569)

Alpöge 原证明的声明是 `riemannHypothesis : RiemannHypothesis`，其右端为 Mathlib 的定义。Sutherland 公布的审计日志列出该声明的三个公理 `propext`、`Classical.choice`、`Quot.sound`。本节参考算术模块所钉的 `ddf1d5f8` 与登记公开核验的 `6977b88c` 有相同的 `src` 源码树、Lean 工具链与 Lake 锁文件。[原证明公理审计](https://math.mit.edu/~drew/grh/audit.log) · [公开核验文件](https://math.mit.edu/~drew/grh/)

整数块路线的局部模块 `DesignIntegerBlocks` 和 `RawDesignIntegerBlocks` 各有定向重放。在 Lean 4.35.0 中，`BookNativeDesign.rh_of_unit_design` 以平滑扭曲设计的存在性、两个族类包含关系和九项闭合估计为输入。模一特征标的族类给出 `HypV`。`topDesWin` 的构造保留给定的 $e_D,e_L$。给定目标损失 $\kappa>0$，先取充分小的 $\varepsilon>0$ 使 $(e_D+e_L+7)\varepsilon\le\kappa$，再取 $k$ 达到比较估计 `core_gm` 的起点。于是块内每个 $n^4\ge k$ 都处于估计范围内，[@thm-ch31-quartic-integer-blocks] 即给出 RH。[设计条件与冻结整数块判据的内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7064767463)

在同一 Lean 4.35.0 环境中，设 `C` 为族类。算术构造把有理矩阵有限群的 Minkowski 整除界 `minkowski_bound_rat` 代入 `MinkDiv → DesignChoices C 3 cT`，得到所需的族选择。薄尺度估计 `GlobalTheory.ThinScaleLiterature.litThin` 给出 `chosenThin_closed`。若另有两个在 `C` 上闭合的条件，即每个族 `Fm` 的尺寸估计 `cT ε Fm.CYL ≤ Fm.CTu → TuSize Fm` 和特征标条件 `ChosenProviso Fm 3`，则 `designExists_of_choices` 给出 `DesignExists C 3`。

具体应用取决于族类。`BookNativeRawDesign.arithmetic_design_of_reference_choice` 把原库在 `GlobalTheory.EX.DC.WithTw 𝒜` 上的扭曲选择提升到 `WithTw (WithSm (Enriched 𝒜))`，并在上述两个条件对该增广族类闭合时得到其设计存在性。`BookNativeRawDesign.rh_of_arithmetic_choices` 则以 `C = WithTw (WithSm 𝒞')` 上的选择和相应的两个闭合条件为输入，取 $C_{\mathrm{abs}}=2,C_0=3,e_D=2,e_L=0$。加上两个族类包含关系和九项闭合估计，冻结的整数块判据即给出 RH。[算术选择、薄尺度估计与两条条件定理的内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065062798)

对参考族，特征标条件中的格秩输入可以写成一次维数计数。外部 Lean 4.35.0 研究源码中的 `BookNativeLowestSpace.rank_iff_eventual_dimension` 给出如下等价。对每个参考族 `Fm`，`RankTiesF Fm` 成立，当且仅当存在一个实数门槛 $x_0$，使每个 $x\ge x_0$、每个指标 $i\in\mathrm{Fm.Ix}(x)$ 和相应数据 $D=\mathrm{Fm.D}(x,i)$ 的每个字 $u$ 都满足

$$
\dim_{\mathbb C}\mu_0(D,u)
= \lvert\mathrm{cls}_{D,u}(0)\rvert
  \prod_{\rho}\mathrm{dimV}\bigl(\mathrm{uColR}(D,u,\rho)\bigr).
$$

左边是最低空间的复维数。右边把零层类的个数乘以各 $\rho$ 处的局部因子。参考数据保证两个宿主素数和 $u$ 的层素数都在宿主的全实域中完全分裂。从秩条件出发，把其门槛增至 $\max\{x_0,3,x_1+1\}$（$x_1=\mathrm{Fm.x1}$），便同时得到 `GBig` 和层数据。此时各列的稳定子平凡，秩条件即给出所列等式。反过来，若等式在某一门槛后成立，在该门槛上配合已知分裂即可恢复秩条件。

参考设计仍需提供这个维数等式。`BookNativeLowestSpace.design_of_lowest_dimension` 使用原扭曲族类上的算术选择，并要求三个条件在增广族类 `WithTw (WithSm (Enriched 𝒜))` 上闭合。它们是上文的尺寸条件、对每个 $x>x_1$ 和每个指标成立的类数公式 `ClassNumberFormula₂`，以及上述最终维数等式。这些输入给出该族类在参数 $3$ 的设计存在性。[最低空间秩等价与条件设计的源码及内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065658421)

另一条路线从原始伽罗瓦行取得模一算术族，再由 `BookIntegerHostBlocks.of_reference` 得到整数块。其算术模块只向这一论证提供 `TopG`。在参考库的 Lean 4.33.1 环境中，`leanchecker` 已分别重放算术模块、最终结论模块与独立审计模块。审计文件 `IntegerBlockAudit.lean` 确认声明 `BookReference.riemannHypothesis_via_integer_blocks` 的类型为 Mathlib 的 `RiemannHypothesis`，并打印出以下证明项。

```lean
BookIntegerHostBlocks.rh_of_blocks
  (BookReference.integer_blocks_of_row
    UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter)
```

该声明的公理仅为 `propext`、`Classical.choice` 和 `Quot.sound`，入口未导入原库的 `Main` 与 `MainConclusion`。本节四次幂窗口判据的冻结声明来自书库所引的 Lean 4.35 环境。[完整整数块证明与内核回执](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7063096204)

**单调性本身对负部窗口给出什么限制？**

::: {.theorem #thm-ch31-monotone-window-sharpness title="单调计数的二次深度与三次窗口质量" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MonotoneTailSharpness.monotone_tail_quadratic_depth_cubic_mass"}
对每个实数 $0<s\le1/2$，存在单调不减的实函数 $A_s$，在 $t\ge1$ 时非负，在 $[2-s,2+s]$ 外等于 $t$，且 $(A_s(t)-t)/t^2$ 在实轴上可积。令 $Q_s(z)=\int_z^\infty (A_s(t)-t)t^{-2}\,dt$，则

$$
-Q_s(2)=\frac{s^2}{32},
\qquad
\int_1^3\frac{\max\{-Q_s(z),0\}}{\sqrt z}\,dz\le\frac{s^3}{16}.
$$
:::

::: proof
取 $0<s\le 1/2$。在 $2-s<t\le 2+s$ 令 $A_s(t)=t-t^2(t-2)/16$，其余地方令 $A_s(t)=t$。区间内的多项式在 $[3/2,5/2]$ 上单调递增。在左端代入多项式得到不小于 $2-s$ 的值，在右端得到不大于 $2+s$ 的值。因此接上两边的直线后，$A_s$ 在实轴上单调不减，在 $t\ge1$ 时非负。

令 $Q_s(z)=\int_z^\infty(A_s(t)-t)t^{-2}\,dt$。被积函数在选定区间内为 $(2-t)/16$，其余地方为零。全区间的积分为零，所以 $Q_s$ 在闭区间外恒为零，区间内等于 $((z-2)^2-s^2)/32$。

积分界来自长度 $2s$、最大负部 $s^2/32$ 和区间上的权重 $1/\sqrt z\le1$。 完整证明由 Lean 内核检查。
:::

令 $s\to0^+$，任何形如“深度不超过常数乘窗口质量的 $\alpha$ 次幂”的统一界，在 $\alpha>2/3$ 时都会被这一族违反。实际素数计数如果允许更强的估计，就需要使用超出单调性的信息。

**模 $1$ 的 Mellin 变换怎样看见零点？** 令 $U$ 为 [@thm-ch34-riemann-prime-arc-bridge] 第 6 款的余项。对每个满足 $\operatorname{Re}(s)>1$ 的 $s\in\mathbb C$，$y\mapsto e^{-sy}U(e^y)$ 在 $(0,\infty)$ 上绝对可积，其 Laplace 积分可无条件求出。换元 $x=e^y$ 后，$e^{-sy}\,dy=x^{-s-1}\,dx$，便得到下式左端的 Mellin 积分。[完全余项的半平面变换](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtHalfPlane.u_laplace_half_plane)

每个素数幂 $n$ 的权重 $\Lambda(n)$ 乘以折线 $\max(x/n-1,0)$，在 $x=n$ 处起步。折线的 Mellin 积分是 $n^{-s}/[s(s-1)]$。按 $\Lambda(n)$ 求和，分子成为对数导数 $-\zeta'(s)/\zeta(s)$。$U$ 中两个初等修正项的积分分别为 $-1/(s-1)^2$ 和 $(1+\gamma_{\mathrm{EM}})/(s-1)$。将三项通分，就得到外部模 $1$ 公式的写法

$$
\Phi(s)=\int_1^\infty U(x)x^{-s-1}\,dx
=-\frac{\zeta'(s)/\zeta(s)+(s-1)^{-1}+1-(1+\gamma_{\mathrm{EM}})s}{s(s-1)}.
$$

上式右端给出积分的亚纯延拓。对 $\zeta$ 的每一个零点 $\rho$，包括负偶整数，记 $m$ 为该点的解析重数。写 $\zeta(s)=(s-\rho)^m h(s)$，其中 $h(\rho)\ne0$，便从对数导数中取出 $m/(s-\rho)$。显式函数 $\Phi$ 在 $\rho$ 的某个去心邻域满足

$$
\Phi(s)=\frac{c}{s-\rho}+H(s),\qquad c=\frac{m}{\rho(1-\rho)}\ne0,
$$

其中 $m\ge1$，$H$ 在 $\rho$ 处解析。因此无论重数多大，$\Phi$ 在该点都有一阶极点。对非平凡零点，$c$ 正是积分显式公式中同一零点按重数相加的系数。[零点的局部展开](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtLaurent.transform_integral_and_zero_germs) · [模 $1$ 的 Mellin 恒等式](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/mellinGchiModOne.lean#L115-L121) · [留数计算](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L63-L83)

**单侧窗口上界为何能排除极点？** 固定 $1/2<\theta<1$。外部算术论证在群的大小、特征权重和误差的假设下，利用尺度约束 $m\le x^{1/2+\varepsilon/2}$ 得到特征和的估计 $G_{m,A}(x)\le x^{1/2+(C+3)\varepsilon}+\Sigma_A(x)$，其中 $\Sigma_A$ 是仍须控制的余项。再用 `gmA_eq` 将左端写成目标余项，用 `sigA_le` 控制 $\Sigma_A$。当 $x$ 充分大时，剩下的常数因子可吸收到 $x^\varepsilon$ 中，窗口上的切比雪夫型上界便是 $x^{1/2+(e_D+e_L+7)\varepsilon}$。损失指数 $e_D,e_L$ 先固定，随后选充分小的 $\varepsilon>0$ 使 $(e_D+e_L+7)\varepsilon\le\theta-1/2$。若满足该论证的窗口假设，便能对任意远的阈值找到 $Y$，使模 $1$ 的余项在整个 $[Y,Y^{3/2}]$ 上满足 $U(x)\le x^\theta$。[特征和估计的假设](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L343-L351) · [余项与常数的控制](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreGm.lean#L55-L74) · [选取指数的次序](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L68-L81)

在 $s=1$ 附近，把 $\zeta$ 的极点提出，写成 $h(s)=(s-1)\zeta(s)$，并补 $h(1)=1$。令 $B=h'/h$，于是 $B(1)=\gamma$。通分后，$\Phi(s)=(1+\gamma)/s-(B(s)-\gamma)/(s(s-1))$ 在 $1$ 的去心邻域成立。差商给出唯一的连续补值 $\Phi_*(1)=1+\gamma-B'(1)$。补值后的函数在每个 $s\ne0$ 且 $\zeta(s)\ne0$ 的点解析。 [变换在一处的解析延拓](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtAtOne.completed_disk_cauchy)

换元 $u=\ln x$，令 $g(u)=U(e^u)$。对每个非负整数 $k$ 和每个 $\operatorname{Re}(z)>1$，$\Phi^{(k)}(z)$ 等于 $(-u)^k e^{-zu}g(u)$ 在正半轴上的绝对收敛积分。一次求导带出一个 $-u$，故 $D_k(z)=(-1)^k\Phi^{(k)}(z)/k!$ 的积分核是 $u^k e^{-zu}/k!$。固定实部 $\sigma>2$ 且 $k>0$ 时，核的模在 $u=k/\sigma$ 取得最大值，可以调节 $k$ 来控制窗口外的积分。设 $a=\ln Y$。在窗口内，$g\le e^{\theta u}$ 给出 $\lvert g\rvert+g\le 2e^{\theta u}$。这解释了源证明为何同时保留实中心的导数项。存在固定的 $\sigma>2$ 和常数 $C$。对每个 $\eta>0$，可以选到任意远的窗口及相应的阶数 $k\ge a$，使所有实数 $t$ 都满足 $\lvert D_k(\sigma+it)\rvert+\operatorname{Re}D_k(\sigma)\le C e^{\eta a}/(\sigma-\theta)^k$。[导数积分](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/LandauCoeff.lean#L10-L18) · [窗口估计](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L40-L56) [完整变换的各阶导数](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtMoments.iterated_derivative_moment)

::: {.theorem #thm-signed-mangoldt-window title="实轴导数与复导数给出指定符号的窗口上界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtSignedWindow.signed_window_moment_bound"}
用在 $1$ 处解析补值的 $\Phi_*$ 定义 $D_k(s)=(-1)^k\Phi_*^{(k)}(s)/k!$。给定非负整数 $k$ 和复数 $p$，设 $\sigma=\operatorname{Re}(p)>1$、$K_k(u)=u^ke^{-\sigma u}/k!$。对任意 $0<a\le b$、$\alpha<\sigma$ 和 $e\in\{-1,1\}$，

$$
|D_k(p)|+e\operatorname{Re}D_k(\sigma)
\le \frac{2}{(\sigma-\alpha)^k}\int_a^b\max\{eg(u),0\}e^{-\alpha u}\,du
+2\int_{(0,\infty)\setminus[a,b]}|g(u)|K_k(u)\,du.
$$
:::

::: proof
在复点取模给出 $\int |g|K_k$ 的上界项。在实点保留符号项 $e\int gK_k$，将两项合并成 $2\int\max\{eg,0\}K_k$。窗内由指数级数得到 $K_k(u)\le(\sigma-\alpha)^{-k}e^{-\alpha u}$，窗外用 $|g|$ 控制。 完整证明由 Lean 内核检查。
:::

$e=1$ 给出上面极点论证所需的正部估计，$e=-1$ 时可用同一个核控制负部。窗外项仍需独立的衰减估计。

若有极点在 $\operatorname{Re}(s)>\theta$，源证明选取中心 $z=\sigma+it$ 及其最近极点 $\rho$，使 $d=|z-\rho|<r\le\sigma-\theta$，半径 $r$ 内只有这一个极点。它给 $D_k(z)$ 贡献 $c/(z-\rho)^{k+1}$。取内圈半径 $r'=(d+r)/2$，减去极点项后的解析函数在这条圆周上有界，因此 Cauchy 估计给出误差 $O((r')^{-k})$。在选取非实中心的情形，以 $\sigma$ 为中心、半径 $r'$ 的闭圆盘内无极点，Cauchy 估计给出 $\operatorname{Re}D_k(\sigma)\ge-M'(r')^{-k}$，其中 $M'$ 与 $k$ 无关。若隔离出实极点，则取 $z=\sigma$。其留数 $c>0$，故 $\operatorname{Re}D_k(\sigma)$ 的主项为 $c/d^{k+1}>0$，出现在窗口所控制的 $\lvert D_k(\sigma)\rvert+\operatorname{Re}D_k(\sigma)$ 中。将窗口上界与之比较，再乘以 $d^k$，极点项留下常数 $|c|/d>0$，解析误差为 $O((d/r')^k)$。取 $\eta>0$ 足够小，使 $e^\eta d/(\sigma-\theta)<1$，则窗口项也随 $k\ge a\to\infty$ 趋于零，矛盾。 [极点与 Cauchy 估计](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L83-L166) 对于 $\zeta$ 的零点，这个误差估计也可直接应用于 $\Phi_*$。设以 $p\ne\rho$ 为中心、半径 $r'>0$ 的闭圆盘避开 $0$，盘中的每个 $\zeta$ 零点都等于 $\rho$。则存在与 $k$ 无关的 $B\ge0$，满足 $|D_k(p)-c/(p-\rho)^{k+1}|\le B/(r')^k$，这里 $D_k$ 由补值后的变换定义。即使圆盘经过 $1$，减去极点主部后的函数仍在盘上解析。 [完整变换的圆盘估计](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtAtOne.completed_disk_cauchy)

外部仓库的完整路线还用 $\theta$ 提升构造伽罗瓦表示，并用 Artin 互反律确定局部 Langlands 参数中所用的 Artin 映射，最终从全体狄利克雷特征的无零点结论推出 RH。[$\theta$ 提升](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/Foundations/GaloisRepresentations/IntegralStructures/RowSrc.lean#L1-L6) · [Artin 互反律](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/Foundations/LocalLanglands/LocalCentralUnits/ArtEx.lean#L7-L15) · [外部仓库的最终声明](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean#L7-L14)

**窗口内只需控制切比雪夫误差尾积分的负部。** 对 $x\ge2$，记 $Q(x)=\int_x^\infty(\psi(t)-t)t^{-2}\,dt=-U(x)/x$，$Q^-(x)=\max\{-Q(x),0\}$。以下等价条件的逆向推导用到外部 Landau 判据（`手工推导`）。令

$$
A(Y)=\int_Y^{Y^{3/2}}\frac{Q^-(x)}{\sqrt{x}}\,dx .
$$

黎曼猜想成立，当且仅当对每个 $\eta>0$ 和每个 $Y_0\ge2$，都存在 $Y\ge Y_0$ 使 $A(Y)\le Y^\eta$。在 RH 下，先前的上界给出 $Q^-(x)\le x^{-1/2}$ 对所有充分大的 $x$ 成立，于是 $A(Y)\le\tfrac12\ln Y\le Y^\eta$ 对每个充分大的 $Y$ 成立。

反过来，在 $u=\ln x$ 坐标写 $g(u)=U(e^u)$。外部窗口条件要求存在非负函数 $R\ge g$ 使 $\int R(u)e^{-\theta u}\,du$ 足够小。最小可取 $R(u)=\max\{g(u),0\}$，它在紧窗口上连续，因为 $U$ 在有界区间上是有限个连续折线与初等修正项之和。因 $U(x)=-xQ(x)$，换元后的最小积分就是 $I_\theta(Y)=\int_Y^{Y^{3/2}} Q^-(x)x^{-\theta}\,dx$。在 $\theta=1/2$ 处它等于 $A(Y)$。应用外部模 $1$ 特征族的极点数据和窗口判据 $\delta=1/2$，所有实部为正的 $\zeta$ 零点均满足 $\operatorname{Re}(\rho)\le1/2$。零点关于临界线的对称性遂给出 RH。 [窗口假设](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauZeroFreeCriterion.lean#L25-L29) · [模一族所用的极点数据](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L248-L261) · [Landau 判据](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L83-L90)

临界窗口的导数上界还可以写出常数（`手工推导`）。取 $a=\ln Y\ge1$、$\sigma=512$、$k=\lfloor640a\rfloor$，这时 $k\ge a$。从 $\Lambda(n)/n\le1$ 和 $x\ln x\le x^2$（$x\ge1$）可在 $U$ 的有限和中逐项估计，得 $|g(u)|\le M e^{2u}$，可取 $M=2+|1+\gamma|$。对每个实数 $t$，三角不等式把 $|D_k(512+it)|+\operatorname{Re}D_k(512)$ 控制为 $\max(g,0)$ 对实核积分的两倍。窗口内 $u^k e^{-(512-1/2)u}/k!\le(512-1/2)^{-k}$。窗口外，对 $|g|$ 使用带显式常数的 Gamma 积分估计。两部分相加得到

$$
|D_k(512+it)|+\operatorname{Re}D_k(512)
\le \frac{2A(Y)}{(512-1/2)^k}
 +\frac{2M}{512^k}\left(\frac{1}{542}+\frac{1}{478}\right).
$$

左尾和右尾分别贡献 $1/542$ 与 $1/478$。这一步给出了窗口外的误差。右端的 $A(Y)$ 正是上文留给素数分布的量。 [Gamma 核的双尾积分估计](lean:D5/S3/Analytic/Laplace/CriticalGammaWindow.critical_window_off_mass)

当 $1/2<\theta<1$ 时，同一窗口上有 $I_\theta(Y)\le Y^{1/2-\theta}A(Y)$。反过来，$A(Y)\le Y^{(3/2)(\theta-1/2)}I_\theta(Y)$，所以若每个这样的 $\theta$ 和每个 $\eta'>0$ 都有任意远的窗口满足 $I_\theta(Y)\le Y^{\eta'}$，取 $(3/2)(\theta-1/2)+\eta'\le\eta$ 就得到临界条件。

还可以只数素数。记 $\vartheta(t)=\sum_{p\le t}\ln p$，用它替换 $\psi$ 来定义 $Q_\vartheta$ 和 $A_\vartheta$。素数幂给尾积分带来的修正满足 $\sqrt{x}(Q(x)-Q_\vartheta(x))\to2$。取一个常数 $C$ 使 $\psi(t)-\vartheta(t)\le C\sqrt{t}$ 对所有 $t\ge1$ 成立，这样的 $C$ 无条件存在。负部随尾积分递减，窗口定理给出 $0\le A_\vartheta(Y)-A(Y)\le 2C\ln(Y^{3/2}/Y)=C\ln Y$。于是临界条件也可写成对每个 $\eta>0$ 都有任意远的窗口满足 $A_\vartheta(Y)\le Y^\eta$。从 $A$ 的条件取指数 $\eta/2$，再用 $Y^{\eta/2}+C\ln Y\le Y^\eta$ 对充分大的 $Y$ 成立即可。独立的算术任务是从素数分布证明这个负部积分界。 [素数幂修正的窗口估计](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.prime_power_window_correction)

外部算术窗口若已给出 $U(x)\le x^{1/2+\varepsilon}$，可以直接把它传给只计素数的条件（`手工推导`）。在同一个 $[Y,Y^{3/2}]$ 上，$Q^-(x)/\sqrt{x}=\max(U(x),0)/x^{3/2}\le x^{\varepsilon-1}$，故 $A(Y)\le \tfrac12 Y^{3\varepsilon/2}\ln Y$。再加素数幂修正 $C\ln Y$。给定 $\eta>0$，取 $\varepsilon=\min(\eta/3,1/4)$，则和式在充分大的此类窗口上至多为 $Y^\eta$。这里用的算术输入是在任意远处都有一整个窗口满足点态界。

Levent Alpöge 提出的证明在模 $1$ 使用外部算术输入构造这族整窗。在该路线中，外库用 $\theta$ 提升、伽罗瓦表示、余体积界与局部匹配构造 `HypsAlt`，再取得 `TopG`。取 $\lambda=3/2$，构造中固定的损失为 $e_D=2,e_L=0$。每个充分小的 $\varepsilon>0$ 都在同一族中给出任意远的整窗、统一误差界和 `ChainTied` 条件。提高起点下限后，模 $1$ 的算术估计在整窗上给出 $U(x)\le x^{1/2+9\varepsilon}$。这一步发生在应用无零点判据之前。取 $9\varepsilon\le\min(\eta/3,1/4)$，上段的积分便在这族窗口上给出 $A_\vartheta(Y)\le Y^\eta$（`手工推导`）。据此得到的窗口存在性以外库的这些算术输入为前提。[外库对证明的说明](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/README.md#L1-L5) · [构造 HypsAlt 的算术输入](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/SiegelEisensteinSecondTermHypotheses.lean#L44-L68) · [从 HypsAlt 到 TopG](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopPlug.lean#L12-L15) · [损失参数](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopShape.lean#L48-L54) · [同一族的三个条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/ZeroFreeAllOfTopG.lean#L19-L33) · [窗内的算术估计](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimitiveCosets/LevelGmLeOnFamilyScales.lean#L28-L30)

针对上述手工衔接，已有一次条件性的外部 Lean 内核复核。固定在参考库的 Lean 4.33.1 环境中，`rh_of_family_and_unit_host` 从族输入 `TopG` 和模一特征标的宿主输入 `HostExW (3/2) (GChi PChar.one).req` 推出黎曼猜想。对每个 $\kappa>0$，两个输入共同给出任意远的 $[Y,Y^{3/2}]$，使同一族在窗内每个实数 $x$ 处都有 $\mathrm{Gz}(x)\le x^{1/2+\kappa}$。这里 $\mathrm{Gz}(x)=U(x)$ 正是本书的完整 Mangoldt 余项，故可应用上文的素数窗口判据。此次内核重放以这两个输入为假设，参考库中提供它们的构造在重放范围之外。复现记录给出兼容补丁及成功的内核重放，其中 `PinnedTop`、`WindowConsumer` 和 `UnifiedWindowRH` 核验这条条件推论，`PinnedMesh` 核验另一条固定特征标的窗口判据。[固定环境中的条件推论与复现源码](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059461340)

外部参考库的均方定理 `QH.pairEx` 给出了同时覆盖内窗的素数对。取模数 $1$、$0<\varepsilon<1/52$ 与 $A\ge1$。对每个充分大的 $Y$，存在一对素数 $q,d$ 满足 `PairGood 1 ε Y (Y^A) q d`，其中 `WinPair` 的大小、同余与分裂条件都在固定尺度 $Y$ 处计算。对三组扭转指标 $(i,j)=(1,0),(0,1),(1,1)$，诱导相应二次扭转的每个本原特征标 $\chi$ 在整个 $Y\le y\le Y^A$ 上同时满足 $|g_\chi(y)|\le y^{1/2+\varepsilon/2}$ 与 $|D_\chi|\le4\log y$；对于导子整除 $8$ 的实本原基特征标，定义还要求这三组扭转的本原诱导特征标在指定矩形内无零点。这里选择 $q,d$ 只用参考库已核验的均方定理。[固定素数对与外窗的量词](https://github.com/the-omega-institute/trureturing/issues/32627#issuecomment-7059642097)

从内窗到模一宿主另用上同调输入 `VWinAt PChar.one`，记其截断指数为 $C$。对每个上述 $\varepsilon$ 以及每个在 $x\ge1$ 满足 $x^{2+8\varepsilon}\le2^{e(x)}\le2x^{2+8\varepsilon}$ 的秩指数函数 $e\colon\mathbb R\to\mathbb N$，该输入给出 $J\ge1$ 与起点。对于起点以后的每个 $X$ 以及每对满足 `WinPair ε (X^(1/J)) q d` 的素数，它给出共同子窗 $[W,W^2]\subseteq[X^{1/J},X]$。子窗内每个 $x$ 的估计适用于匹配该特征标、$e(x),q,d$ 的每个数域（`IsChiField`）。固定这样的数域、任意代数闭包，以及一族按素数 $\ell$ 编号的局部系数数据，令 $t=\lfloor x^C\rfloor$。对于每个素数 $\ell$ 与 $1\le j<t$，上同调长度 $\operatorname{shaLen}(\ell,j)$ 都有限，且对每个有限素数集 $S$ 有

$$
\sum_{\ell\in S}\log\ell\sum_{1\le j<t}\operatorname{shaLen}(\ell,j)\le\sqrt{\exp(x^\varepsilon)}.
$$

取 $C=401$ 时，共同子窗的构造先选好 $Y,q,d$，再量化外窗 $[Z,Z^{3/2}]$ 内的实点。`supplyChi` 给出上段所需的模一宿主。同一外部 Lean 环境由此核验了 `TopG → VWinAt PChar.one 401 → RiemannHypothesis`。[上同调窗口的条件推论](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059734329)

模一特征标 $\chi$ 生成的群只有一个元素。数域构造给出 $1\le c\le|\langle\chi\rangle|$，所以宿主构造中的阶 $c2^e$ 等于 $2^e$，直接满足上述秩估计。这使模一情形的截断指数可以从 $401$ 降到 $400$，求和只用 $1\le j<\lfloor x^{400}\rfloor$。在指数 $400$ 的窗口假设下，`fixed_of_400` 对每个上述 $\varepsilon$ 给出 $J\ge1$，使得超过任意给定起点都能找到外窗 $[Z,Z^{3/2}]$ 与一组共同的 $Y,q,d$，其中 $Y\le Z\le Z^{3/2}\le Y^J$。这对素数在 $[Y,Y^J]$ 上满足 `PairGood`，外窗内每个 $x$ 又有与之匹配的 $e(x)$ 和上述长度界。同一外部环境核验了 `TopG → VWinAt PChar.one 400 → RiemannHypothesis`。族输入与这个较弱的模一窗口输入都是该推论的假设。[指数 400 的源码与内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059864808)

在模一上同调窗口中，参考库还在同一外部 Lean 环境重放了正特征子空间的计数归约。模一的例外素数集恰为 $\{3,7\}$。参考证明给出情形 IV，并由主特征标的消失定理推出情形 Z。情形 I 归结到判别式 $-7$ 的虚二次数域 $\mathbb Q(\sqrt{-7})$ 上的一项轨道估计。测试素数可以固定为 $11,13$，当选窗的两个辅助素数 $q,d$ 均大于 $13$ 时，这一对测试对同一宿主同时适用。轨道估计仍要求一个实常数对所有相容的有理数域代数闭包、允许的指数、模数、特征标轨道、系数数据与有限素数集统一有效。[模一的例外素数集](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7060326962) · [计数 I、IV、Z 与条件推论](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061140456)

情形 V 的两个高导子计数只用扭转指标 $e=1$。令 $c_2(\psi)$ 为宿主特征标 $\psi$ 在素数 $2$ 处局部分量的导子中 $2$ 的指数。去掉 $2$ 处分量后，剩余特征标的平方为主特征标。于是对 $\ell=3,7$，定义中的阶数 $f_0$ 都等于 $\ell$ 模 $4$ 的乘法阶 $2$。门槛 $R_1=16\ell^2\,4^{v_2(\ell^2-1)}$ 在 $\ell=3$ 处等于 $9216$，在 $\ell=7$ 处等于 $200704$。把 $R_1$ 与 $2^{c_2(\psi)}$ 比较就得到确切分界。

| 例外素数 $\ell$ | $v_2(\ell^2-1)$ | 情形 V | 对应的情形 Vs |
| --- | --- | --- | --- |
| $3$ | $3$ | $c_2(\psi)\ge14$ | $c_2(\psi)\le13$ |
| $7$ | $4$ | $c_2(\psi)\ge18$ | $c_2(\psi)\le17$ |

`unit_countV_iff` 表明，模一的情形 V 等价于存在一个共同的自然数指数 $A$，使上述两个高导子族都满足参考库的 `VLe` 界 $(\ell N)^A$，其中 $N$ 是宿主模数。该界量化每个模一宿主、满足 `h.Big t` 的 $t>1$、每个允许的代数闭包与系数系统，以及这种宿主在扭转 $1$ 处的每个合格特征标。表中的数字给出被计入的条件；每个具体宿主提供哪些特征标由其自身决定。[两项高导子计数的等价式与内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061244097)

把这两项计数作为假设代入 `rh_of_one_orbit_estimate`，还须给定算术族 `TopG`、模一几何窗口 `UnitB K 400`、奇素数界 `Odd.PrimeBound`、上述固定域轨道估计和模一情形 II。情形 Vs 所用的输入为 Poitou–Tate 对偶、局部有限性、局部 Tate 对偶，以及某个实数 $C_K$ 对应的次数估计 `LemmaK`。在这些假设下，外部内核复核的推论由本章的 Mangoldt 窗口判据得到 RH。

**怎样让同一个判别式在几个素数处都分裂？** 对奇素数 $p$，记 $J(-d,p)=\bigl(\frac{-d}{p}\bigr)$。值为 $1$ 的意思是 $t^2\equiv-d\pmod p$ 有非零解。取 $B=3$，要检查的小奇素数只有 $3$。素数 $d=23$ 满足 $d\equiv7\pmod{16}$ 及 $-23\equiv1\pmod3$。再取素数 $q=59\equiv3\pmod8$，有 $-23\equiv36=6^2\pmod{59}$。这一对满足所需的两个分裂条件。下面的构造用特定剩余类一次保证所有有限条件，这些剩余类只占可用素数的一部分。

::: {.theorem #thm-ch31-split-prime-host-series title="满足局部分裂条件的辅助素数的加权级数" lean="D5/S3/CharacterSums/SplitPrimeHostSeries.split_prime_host_series"}
给定自然数 $B$，令 $D_B$ 为所有满足 $d\equiv7\pmod{16}$ 且对每个奇素数 $p\le B$ 有 $J(-d,p)=1$ 的素数 $d$ 所成的集合。对 $d\in D_B$，令 $Q_d$ 为所有满足 $q\equiv3\pmod8$ 且 $J(-d,q)=1$ 的素数 $q$ 所成的集合。则

$$
\begin{aligned}
\lim_{X\to\infty}\sum_{\substack{d\in D_B\\d<X}}\frac{\ln d}{d}&=+\infty,\\
\lim_{X\to\infty}\sum_{\substack{q\in Q_d\\q<X}}\frac{\ln q}{q}&=+\infty\quad(d\in D_B).
\end{aligned}
$$

这里 $X$ 取自然数。对每个自然数 $N$，存在 $d\in D_B$ 使 $d>N$。对每个 $d\in D_B$ 和每个自然数 $Q$，存在 $q\in Q_d$ 使 $q>Q$。反过来，若先给素数 $q\equiv3\pmod8$，令 $S_{B,q}=\{d\in D_B:q\in Q_d\}$，则 $\sum_{d\in S_{B,q},\,d<X}(\ln d)/d\to+\infty$，且对每个自然数 $N$ 都有 $d\in S_{B,q}$ 满足 $d>N$。
:::

::: proof
先选 $d$。在参考库的构造中，令 $P=\prod_{i=0}^{B-1}(2i+1)$，空积取 $1$。$P$ 是奇数，每个奇素数 $p\le B$ 都是其中一项。剩余类 $8P-1\pmod{16P}$ 与模数互素。其中的素数 $d$ 满足 $d\equiv7\pmod{16}$，并且对每个这样的 $p$ 都有 $-d\equiv1\pmod p$。固定这个 $d$ 后，再在与模数互素的类 $1+6d\pmod{8d}$ 中选素数 $q$。于是 $q\equiv3\pmod8$，且 $q\equiv1\pmod d$。由于 $d,q$ 都模 $4$ 余 $3$，二次互反律的负号与 $\bigl(\frac{-1}{q}\bigr)=-1$ 抵消，给出 $J(-d,q)=\bigl(\frac{q}{d}\bigr)=1$。本库证明取小奇素数本身的乘积，用中国剩余定理合并同余条件。在每个既约剩余类中，素数的 $\ln p/p$ 之和发散。把这些非负项分别计入 $D_B$ 和 $Q_d$ 即得两式。完整证明由 Lean 内核检查。
:::

若先指定一个满足 $q\equiv3\pmod8$ 的素数，则把小素数的截点提高到 $\max(B,q)$。此时 $q$ 自己就是必须分裂的小奇素数之一，所以在 $D_{\max(B,q)}$ 中任取 $d$，都有 $d\in D_B$ 且 $J(-d,q)=1$。删去任意有限前缀仍保留发散性，两种选取顺序都允许最后选定的素数超过任给下限。外库的初等构造先选 $d$、再选 $q$，陈述的是超过给定下限的素数存在性。上面的加权发散刻画了两次选择各自有多少素数可用。[外库的两次素数选择](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimeDiscriminants/ExistsHost.lean#L39-L97)

整窗估计还要在给定尺度上同时选好这一对素数。外库的定量命题在其解析假设下，固定 $0<\varepsilon<1/52$ 后，先给出 $x_0$ 和一个常数 $C>0$，再对每个实数 $x\ge x_0$ 先选 $q$ 再为它选 $d$，使同一对素数满足 $\sqrt{X_1}<q\le X_1$、$\sqrt{X_2}<d\le X_2$，其中 $X_1,X_2$ 由 $x,\varepsilon$ 决定。`QDq` 以同一常数 $C$ 控制三个二次特征标在尺度 $x$ 的估计（对应 $q$、$d$ 及两者的乘积），`Boxq` 对特征标及其扭曲给出六个无零点区域条件。对所有整数 $1\le n\le2x^{2+8\varepsilon}$，同一对素数还须满足 `Rowq` 的分裂及 $\ln(4nqd)$ 上界。这些条件对每个 $x$ 选一对素数。令 $t=\varepsilon/5$，由 $X_1=\exp(x^t)$ 得 $x^t/2<\ln q\le x^t$。若 $Y$ 和 $Y^b$ 两端沿用同一个 $q$，就有 $Y^{bt}/2<\ln q\le Y^t$，从而 $Y^{(b-1)t}<2$。固定 $b>1$ 后，要在充分远窗口的两个端点都满足 `Rowq` 的大小限制，必须换用不同的 $q$（`手工推导`）。从逐尺度选择到上文的整窗误差界，还需外库的特征标估计及算术构造。[先选 $q$ 再选 $d$ 的定量构造](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBounds.lean) · [定量选取的假设与量词](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBoundsStatement.lean#L17) · [特征标与范围条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L166-L185)

**怎样在整个窗口内沿用同一对辅助素数？** 固定素数 $q\equiv3\pmod8$，记 $L=\ln q>1$，固定实数 $b>1$。给定窗口起点 $Y\ge e^5$，取在窗内固定的损失 $\varepsilon>0$。对每个实数 $x\in[Y,Y^b]$ 记 $u=x^{\varepsilon/5}$。外库的 `Rowq` 在给定 $x,n$ 处对 $q,d$ 施加条件。下面要求一个素数 $d\equiv7\pmod{16}$ 在整窗上满足

$$
u/2<L\le u,\qquad u(\ln x)^2/2<\ln d\le u(\ln x)^2 .
$$

还要求 $(-d/q)=1$，每个奇素数 $p\le u$ 都有 $(-d/p)=1$，在 $2$ 处有 $-d\equiv1\pmod8$。当 $1\le n\le2x^{2+8\varepsilon}$ 为整数时，还要验证 $\ln(4nqd)\le2u(\ln x)^2$。[外库的逐点算术条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L179-L185)

::: {.theorem #thm-ch31-fixed-prime-row-width title="整窗沿用同一对辅助素数的宽度" lean="D5/S3/CharacterSums/MovingPrimeRowWidth.prime_pair_power_window_iff"}
固定上述 $q,b$。以下两条等价。

1. 对任意实数 $R$ 和任意 $\eta>0$，存在 $Y\ge\max(R,e^5)$、损失 $0<\varepsilon<\min(\eta,1/52)$ 及素数 $d$，使上述条件对每个实数 $x\in[Y,Y^b]$ 成立。
2. 窗宽满足 $b^2L^{b-1}<2$。
:::

::: proof
先看两端。令 $u_0=Y^{\varepsilon/5}$，于是 $L\le u_0$，右端的 $u$ 为 $u_0^b$。把右端的严格下界和左端的上界合起来，有 $b^2u_0^b(\ln Y)^2/2<\ln d\le u_0(\ln Y)^2$，故 $b^2L^{b-1}<2$。等号处，右端所需的严格下界已经达到左端容许的最大值。

反过来，取 $B=\lceil L^b\rceil$，先固定 $q$，可选到任意大的 $d$，使 $q$ 和所有奇素数 $p\le B$ 均分裂。[先固定 $q$ 的素数供给](lean:D5/S3/CharacterSums/SplitPrimeHostSeries.split_prime_host_series)

置 $a=\sqrt{\ln d/L}$、$Y=e^a$、$\varepsilon=5\ln L/a$。增大 $d$ 同时使 $Y$ 趋于无穷、$\varepsilon$ 趋于零。把整窗上的 $x$ 写成 $e^{sa}$，其中 $1\le s\le b$。于是

$$
u=L^s,\qquad \frac{u(\ln x)^2}{\ln d}=s^2L^{s-1}\in[1,b^2L^{b-1}].
$$

这给出 $d$ 的两个尺寸界，且 $u\le L^b<2L$ 给出 $q$ 的严格下界。由于 $u\ge L$，另一个界 $L\le u$ 也成立。最后令 $t=\ln x\ge5$。对给定范围的 $n$，由 $L\le u$、$\ln 8<4$、$2+8\varepsilon<3$ 得 $\ln(4nq)\le4+3t+u\le ut^2$。最后一个不等式利用 $u\ge1$ 和 $t^2-1\ge4+3t$。再加上 $\ln d\le ut^2$ 即得导子估计。完整证明由 Lean 内核检查。
:::

取素数 $q=60083\equiv3\pmod8$ 和 $b=9/8$。因 $11<L<12$ 且 $12<(3/2)^8$，有 $b^2L^{b-1}<(81/64)(3/2)=243/128<2$。这给出一族整窗，在每一点都有 $u\ge L>11$。

外库选取 $q$ 的解析证明还在起点要求 $(\ln Y)^2\ln(8)/4\le Y^{\varepsilon/5}$。这里的构造有 $Y^{\varepsilon/5}=L$，而左端随 $Y$ 趋于无穷。若要求满足这个解析门槛，窗口两端的 $u$ 之比 $(Y^{\varepsilon/5})^{b-1}$ 至少为 $((\ln Y)^2\ln(8)/4)^{b-1}$。对任意自然数 $k$，后者最终超过 $2^k$。沿窗取 $u$ 依次加倍的 $k+1$ 个点，相应的半开区间 $(u/2,u]$ 两两不交。因此覆盖整窗至少需要 $k+1$ 个不同的 $q$，即使 $\varepsilon$ 可按窗选取。外库使用其解析输入，先固定 $0<\varepsilon<1/52$ 并取得门槛 $x_0$ 和常数 $C$，对每个 $x\ge x_0$ 选择 $q,d$，再使这对素数适用于给定范围的所有 $n$。 [外库筛选的尺度条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean#L83-L92) · [外库逐点选对的定理](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBoundsStatement.lean#L17) · [该条件的两次调用](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean#L131-L156)

这里 $\varepsilon$ 随所选窗口而变。要从这些窗口取得余项 $U$ 的点态界，仍须在同一对 $q,d$ 上证明外库的 `QDq` 与 `Boxq` 特征标估计，并控制比较门槛对 $\varepsilon$ 的依赖。[外库的特征标估计与逐点算术条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L166-L192)

对任一固定的实数 $b>1$，记

$$
A_{\vartheta,b}(Y)=\int_Y^{Y^b}\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx,\qquad Y\ge2.
$$

上文的 $A_\vartheta$ 即 $A_{\vartheta,3/2}$。

::: {.theorem #thm-ch31-prime-window-mean title="RH 下窗口质量的对数主项" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPrimeWindowMean.prime_tail_logarithmic_mass_of_rh"}
假设黎曼猜想成立。存在一个常数 $C\ge0$，对所有实数端点 $B\ge A\ge2$ 同时有

$$
\left|\int_A^B\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx-2\ln(B/A)\right|\le C.
$$
:::

::: proof
在素数幂层中，$\psi(x)-\vartheta(x)$ 与 $\psi(\sqrt{x})$ 的差由较高幂控制。对 $\sqrt{x}$ 应用 Schoenfeld 界，再积分得 $\sqrt{x}(Q(x)-Q_\vartheta(x))=2+O(x^{-1/12})$。取 $y=\ln x$ 后，这个误差在正向尾部绝对可积。归一化的完全余项由零点级数和一个指数衰减项组成。在 RH 下，零点级数的总系数绝对可和，其模小于 $2$，每个频率的绝对值大于 $10$。对每一项积分，将系数除以对应的频率，故零点级数在任意区间上的积分有同一个界。归一化素数尾项的负部 $\max\{-\sqrt{x}Q_\vartheta(x),0\}$ 可用 $2$ 加上零点级数的实部近似，因为该近似非负，且取正部保留可积误差的界。在有限的起始区间上用连续性控制误差。这样，$2$ 的积分给出对数主项，其余贡献对两端点一致有界。 完整证明由 Lean 内核检查。
:::

特别地，$A_{\vartheta,b}(Y)=2(b-1)\ln Y+O(1)$。同一个常数也适用于变动的 $b>1$。Zhao 的式 (14) 把这里的 $Q_\vartheta$ 写成第一 Mertens 误差的累积积分及端点项。这里的主项来自对该尾项作一次带权窗口积分，并以 RH 为前提。[Zhao，式 (14)](https://arxiv.org/html/2411.18903v2#S2.E14)

::: {.theorem #thm-ch31-rh-prime-window-remainder title="临界线情形的端点余项与簇集" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPrimeWindowRemainder.prime_window_remainder_of_rh"}
在 RH 条件下，把素数尾项负部质量减去主项，记作 $E(a,B)=N(a,B)-2\ln(B/a)$。这里 $N(a,B)=\int_a^B\max(-Q_\vartheta(x),0)x^{-1/2}\,dx$。按重数枚举全部非平凡零点，记 $\rho_k=1/2+i\gamma_k$、$c_k=1/[\rho_k(1-\rho_k)]$。令 $\phi(u)_k=e^{i\gamma_k u}$，并令 $H$ 为这条实参数轨道在单位圆乘积空间中的闭包。在 $H$ 上定义连续函数

$$
P(h)=\operatorname{Re}\sum_k\frac{c_k h_k}{i\gamma_k}.
$$

令 $e(u)=\max(-e^{u/2}Q_\vartheta(e^u),0)-2-\operatorname{Re}\sum_k c_k\phi(u)_k$。对所有实数 $B\ge a\ge2$，有精确等式

$$
E(a,B)-P\bigl(\phi(\ln B)\bigr)+P\bigl(\phi(\ln a)\bigr)=\int_{\ln a}^{\ln B}e(u)\,du.
$$

对任意 $\varepsilon>0$，存在 $X\ge2$，使所有实数 $B\ge a\ge X$ 都满足

$$
\left|E(a,B)-P\bigl(\phi(\ln B)\bigr)+P\bigl(\phi(\ln a)\bigr)\right|<\varepsilon .
$$

对每个固定的 $a\ge2$，当 $B\to\infty$ 时，$E(a,B)$ 的全部簇值组成一个非退化的紧区间

$$
C(a)+P(H),\qquad
C(a)=\int_{\ln a}^\infty e(u)\,du-P\bigl(\phi(\ln a)\bigr).
$$
:::

::: proof
零点虚部有远离零的一致下界，因而逐项积分后的系数仍绝对可和。对数坐标下，积分的两个端点给出同一个 $P$ 的差。剩下的误差绝对可积，所以其在任何 $[\ln a,\ln B]$ 上的绝对积分都受整个左端尾积分控制。对固定 $a$，剩余积分趋于常数。实际轨道在任意晚的时刻逼近闭包中的每个相位，因而实现所给区间的每个簇值。相位闭包紧且连通，而沿轨道的原函数在零时刻有严格正的斜率，因此区间两端不同。结论只用实际联合相位关系。 完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-prime-window-rh title="素数尾的小窗口与黎曼猜想" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.rh_iff_frequently_small_prime_windows"}
固定实数 $b>1$。黎曼猜想成立，当且仅当对每个 $\eta>0$ 和每个实数 $R\ge2$，都存在实数 $Y\ge R$ 使 $A_{\vartheta,b}(Y)\le Y^\eta$。
:::

::: proof
在 RH 下，$|U(x)|/\sqrt{x}$ 对充分大的 $x$ 有界。将这个界与素数幂修正在 $[Y,Y^b]$ 上积分，得到 $A_{\vartheta,b}(Y)\le C_b\ln Y$，故每个充分大的 $Y$ 都满足所需的幂次上界。

反过来，设 $\zeta(\rho)=0$，$\beta=\operatorname{Re}\rho>1/2$。对每个 $\varepsilon>0$，所有充分大的 $Y$ 都满足 $A_{\vartheta,b}(Y)\ge Y^{b(\beta-1/2)-\varepsilon}$。固定 $1<h<b$ 及小量 $0<\delta<\beta-1/2$，再选 $\sigma$ 足够大，使两侧 Gamma 尾的衰减率均为正。半径相同的两个圆盘把极点贡献与误差分开。复中心 $p$ 到所隔离极点的距离 $d<\sigma-\beta+\delta$，其中 $\sigma=\operatorname{Re}p$。这个极点可以对应另一个零点。实中心的无零点圆盘给出 Cauchy 误差界。取导数阶数 $k=\lfloor\sigma h\ln Y\rfloor$，Gamma 核的峰便在 $h\ln Y$ 附近。用 $d^k$ 归一化后，窗外贡献为 $O((d/\sigma)^k)$，随 $k$ 增大而消失。窗内留下的增长率满足 $h\sigma\ln((\sigma-1/2)/d)>h(\beta-1/2-\delta)$。取 $h$ 足够接近 $b$、$\delta$ 足够小，指数损失便小于 $\varepsilon$。[偏线零点迫使窗口积分增长](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.off_line_zero_forces_window_mass)

取 $\varepsilon=\eta=b(\beta-1/2)/3$，下界就成为 $Y^{2\eta}$，与任意远处仍有 $A_{\vartheta,b}(Y)\le Y^\eta$ 矛盾。因此临界线右侧无零点，再用非平凡零点关于临界线的对称性即得 RH。完整证明由 Lean 内核检查。
:::

对完整 Mangoldt 余项 $U(x)=-xQ(x)$，也可以直接限制每个实点上的函数值。下列两个判据都只要求上界。窗口指数 $b>1$ 固定后，窗口的对数长度为 $(b-1)\ln Y$，随起点 $Y$ 增长。

::: {.theorem #thm-ch31-mangoldt-pointwise-power-window title="完整 Mangoldt 余项的逐点幂窗判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtPointwiseWindows.rh_iff_pointwise_power_windows"}
固定实数 $b>1$。黎曼假设成立，当且仅当对每个 $\kappa>0$、每个实数起点下界 $R$，都存在 $Y\ge\max\{R,2\}$，使得同一个闭区间 $[Y,Y^b]$ 内的每个实数 $x$ 都满足

$$
U(x)\le x^{1/2+\kappa}.
$$
:::

::: proof
在 RH 下，前述绝对包络对所有充分大的 $x$ 给出 $|U(x)|\le\sqrt{x}$，故可对每个 $\kappa>0$ 取任意充分晚的窗口。

反过来，给定素数尾项的质量损失 $\eta>0$，取 $\kappa=\eta/(2b)$。素数幂修正满足 $\sqrt{x}(Q(x)-Q_\vartheta(x))\to2$，所以充分晚的窗口内该修正至多为 $3$。把 $U(x)/\sqrt{x}=-\sqrt{x}Q(x)$ 代入逐点上界，同时取正部，得到 $\max\{-\sqrt{x}Q_\vartheta(x),0\}\le x^\kappa+3$。除以 $x$ 后在窗上积分，便有

$$
A_{\vartheta,b}(Y)\le4Y^{b\kappa}(b-1)\ln Y\le Y^\eta
$$

对所有充分晚且满足逐点上界的窗口成立。这样的 $Y$ 任意大，故 [@thm-ch31-prime-window-rh] 给出 RH。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-mangoldt-pointwise-sqrt-window title="固定平方根系数的完整 Mangoldt 窗口判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtPointwiseWindows.rh_iff_pointwise_sqrt_windows"}
记第一 Li 质量为 $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$，其中 $\gamma_{\mathrm{EM}}$ 为欧拉常数。固定实数 $b>1$ 与 $C>M$。黎曼假设成立，当且仅当对每个实数 $R$，都存在 $Y\ge\max\{R,2\}$，使得对每个 $x\in[Y,Y^b]$ 都有

$$
U(x)\le C\sqrt{x}.
$$
:::

::: proof
在 RH 下，对归一化余项 $U(x)/\sqrt{x}$ 的绝对包络取正损失 $C-M$，即得充分大 $x$ 处的上界 $C\sqrt{x}$。反过来，对任意 $\kappa>0$，起点取得足够大时，整个窗口上都有 $C\le x^\kappa$。同一窗口因此满足逐点幂界，由 [@thm-ch31-mangoldt-pointwise-power-window] 得到 RH。完整证明由 Lean 内核检查。
:::

临界系数 $C=M$ 涉及原始余项与曲线 $M\sqrt{x}$ 的**可加差额**。将其除以 $\sqrt{x}$ 会掩去固定尺度的节省。

::: {.theorem #thm-ch31-mangoldt-critical-gap title="临界包络下的可加差额趋于正无穷" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtCriticalGap.rh_iff_critical_gap_tendsto_atTop"}
令 $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$。黎曼假设成立，当且仅当沿实数 $x\to+\infty$ 有

$$
M\sqrt{x}-U(x)\longrightarrow+\infty.
$$

换言之，对每个固定实数 $D$，存在 $X$，使所有实数 $x\ge X$ 都满足 $U(x)\le M\sqrt{x}-D$。
:::

::: proof
令 $y=\ln x$。在 RH 下，归一化零点和的实部可写成 $F(y)=\sum_k a_k\cos(\gamma_k y)$，其中 $a_k\ge0$ 且 $\sum_k a_k=M$。记 $d(y)=M-F(y)$。利用 $(1-\cos(\gamma_k y))(1+\cos(\gamma_k h))\ge0$ 并逐项求和，得到

$$
2d(h)-4d(y)\le2F(y)-F(y+h)-F(y-h).
$$

在原点右侧，显式公式给出 $d(h)/h\to+\infty$。在远端取 $h=e^{-y/2}$。各个 Mangoldt 斜坡的带权中点不等式与归一化余项的显式公式误差一起，将右端从上方控制为 $O(h)$。除以 $h$，得到 $d(y)/h\to+\infty$。由于 $|e^{-y/2}U(e^y)-F(y)|=O(e^{-y/2})$，换回 $x=e^y$ 后，可加差额与 $d(y)/h$ 只差一个有界量。

反过来，差额趋于正无穷蕴含 $U(x)\le M\sqrt{x}$ 在整个尾部成立。对任意 $\kappa>0$，充分大时 $M\le x^\kappa$，从而满足 [@thm-ch31-mangoldt-pointwise-power-window] 的逐点幂窗条件。完整证明由 Lean 内核检查。
:::

**手工推导。** 固定 $b>1$。对每个实数 $R$ 都存在 $Y\ge\max\{R,2\}$，使同一个 $[Y,Y^b]$ 上每一点都满足 $U(x)\le M\sqrt{x}$，这一条件等价于 RH。在 RH 下取上一定理中的 $D=0$，每个充分晚的窗口都成立。反向只假设任意晚存在这样的窗口。给定 $\kappa>0$，把起点下界提到 $x^\kappa\ge M$ 的阈值以上，再取这样一个窗口，应用 [@thm-ch31-mangoldt-pointwise-power-window] 即可。

::: {.theorem #thm-ch31-mangoldt-bounded-gap-peak title="归一化余项在整数对数时间上有界间隔地回近临界质量" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtWindowPhase.bounded_gap_actual_G_peak"}
设 RH 成立，记 $G(y)=e^{-y/2}U(e^y)$。对每个 $\delta>0$ 存在自然数 $L$，使每个自然数 $n$ 都有某个自然数 $k\le L$ 满足

$$
|G(n+k)-M|<\delta.
$$
:::

::: proof
在 RH 下，归一化零点和是相位紧群上连续函数沿整数次幂的取值，单位元处的函数值为 $M$。取单位元的开邻域，使其上相位和到 $M$ 的距离小于 $\delta/2$。在相位生成的循环子群的闭包上，回到这个邻域所需的非负整数步数有统一上界，这来自开覆盖的有限子覆盖。归一化余项与零点和实部之差最终小于 $\delta/2$，故有界等待时间内的一个整数对数时刻给出所需估计。增大 $L$ 可把有限的初始时段一并计入。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-mangoldt-no-windows-below-mass title="低于第一 Li 质量的系数排除任意晚的整窗" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtWindowPhase.no_windows_below_mass"}
固定实数 $b>1$ 与 $C<M$。无条件地，存在实数 $R$，使每个 $Y\ge\max\{R,2\}$ 都有某个 $x\in[Y,Y^b]$ 满足 $U(x)>C\sqrt{x}$。
:::

::: proof
若任意晚都有一个整窗满足 $U(x)\le C\sqrt{x}$，同一批窗口也满足较大的系数 $M+1$ 的上界。由 [@thm-ch31-mangoldt-pointwise-sqrt-window] 得到 RH。取 $\delta=M-C>0$，在 [@thm-ch31-mangoldt-bounded-gap-peak] 中从 $n=\lceil\ln Y\rceil$ 出发。充分大的 $Y$ 满足 $(b-1)\ln Y\ge L+1$，故 $n+k\in[\ln Y,b\ln Y]$。取 $x=e^{n+k}$，便在同一窗内得到 $U(x)/\sqrt{x}>M-\delta=C$，与假设矛盾。完整证明由 Lean 内核检查。
:::

**手工推导。** 令 $P_b(Y)=\max_{Y\le x\le Y^b}U(x)/\sqrt{x}$。对 $Y\ge2$，归一化余项连续，故闭窗上能取到最大值。对任意 $a<M$，上一条定理给出充分大 $Y$ 处的 $P_b(Y)>a$。在 RH 下，绝对包络对每个 $c>M$ 又给出充分大的 $Y$ 处 $P_b(Y)<c$，所以 $P_b(Y)\to M$。若 RH 不成立，给定任意实数 $T$，取 $C=\max\{T,M+1\}$，则 [@thm-ch31-mangoldt-pointwise-sqrt-window] 的逆否命题给出充分大的 $Y$ 处 $P_b(Y)>C\ge T$。此时 $P_b(Y)\to+\infty$。[整窗最大值的外部内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7060137372)

::: {.theorem #thm-ch31-wide-prime-window title="宽窗口质量的下界与 RH 失败时的一致发散" lean="D5/S3/Weil/Mertens/IntegratedExplicit/WidePrimeWindowMass.prime_tail_wide_window_mass"}
对于实际素数尾项，记实端点 $2\le A\le B$ 的窗口质量为

$$
N(A,B)=\int_A^B \frac{\max\{-Q_\vartheta(x),0\}}{\sqrt x}\,dx .
$$

固定 $b>1$。在 $2\le A$、$A^b\le B$ 的范围内，存在一个只依赖于 $b$ 的常数 $C_b\ge0$，使 $N(A,B)\ge 2\ln(B/A)-C_b$。如果 RH 不成立，对每个实数 $K$，存在一个右端点阈值 $S$，对所有 $B\ge S$ 及所有满足上述条件的 $A$，都有 $N(A,B)-2\ln(B/A)\ge K$。
:::

::: proof
为看出阈值为何与 $A$ 无关，从右端点取 $Y=B^{1/b}$。条件 $A^b\le B$ 保证 $[Y,B]=[Y,Y^b]\subseteq[A,B]$，同一非负被积函数使大窗的质量至少等于子窗的质量。RH 若失败，对称性给出实部 $\beta>1/2$ 的零点。固定幂窗口的下界允许任意正的指数损失，所以可取损失 $b(\beta-1/2)/2$，对所有充分大的 $B$ 及所有允许的 $A$ 给出 $N(A,B)\ge B^{(\beta-1/2)/2}$。当 $B$ 增大时，此幂超过 $2\ln B$ 加任意固定常数。用 $2\ln(B/A)\le2\ln B$ 即得一致发散。在阈值以下，对数项有界且质量非负，故可补齐下界。RH 成立时，所有 $2\le A\le B$ 上的有界余项直接给出所需下界。 完整证明由 Lean 内核检查。
:::

这里需要预先固定 $b>1$。在对数坐标下，$B\ge A^b$ 仍要求随尺度增大而加宽窗口。对于固定比率 $B/A$ 的窗口，当前推导的子窗包含关系未提供相同结论。

**在哪些尺度上能选到特征标和小的素数？** 固定 $\varepsilon>0$。对整数 $k\ge1$，把素数的上界定为 $X_k=2^k$，再选 $x_k=(k\ln2)^{5/\varepsilon}$，于是 $\exp(x_k^{\varepsilon/5})=X_k$。这一块只用 $X_k/2\le q<X_k$ 中模 $8$ 余 $3$ 的素数。第 $k$ 块与第 $k+1$ 块互不相交。对足够大的 $k$，块的下端已超过 $\sqrt{X_k}$，所以它整个落在外库为 $q$ 指定的大小范围内。

为计算二次矩，对块内每个正奇整数 $q$ 都用 Jacobi 符号定义这个和。取 $N_k=\lfloor x_k^{400}\rfloor$，记

$$
T_k(q)=\sum_{n=1}^{N_k}\Lambda(n)\min\{1,x_k/n\}\left(\frac{n}{q}\right).
$$

其中 $p$ 为素数，整数 $j\ge1$ 时 $\Lambda(p^j)=\ln p$，其余正整数的权重为零。小于等于 $x_k$ 的项保留原权重，较大的项乘以 $x_k/n$。仅对块内模 $8$ 余 $3$ 的素数 $q$ 计权。若 $|T_k(q)|\le x_k^{1/2+\varepsilon}/2$，把 $(\ln q)/q$ 计入 $G_k$，否则计入 $B_k$。等号属于 $G_k$。

::: {.theorem #thm-ch31-dyadic-mangoldt-prime-supply title="二进尺度上截断 Mangoldt 和的好素数" lean="D5/S3/CharacterSums/DyadicMangoldtPrimeSupply.dyadic_quadratic_mangoldt_supply"}
对每个固定的实数 $\varepsilon>0$，坏素数的总权重有限，而好素数的部分和趋于正无穷：

$$
\begin{aligned}
\sum_{k=1}^{\infty} B_k&<\infty,\\
\lim_{K\to\infty}\sum_{k=1}^K G_k&=+\infty.
\end{aligned}
$$
:::

::: proof
为估计坏素数，先把 $|T_k|^2$ 在块内所有模 $8$ 余 $3$ 的整数上求和。这些非负项包含了所需的素数项。高次素数幂的截断权重总量为 $O(\sqrt{x_k})$。对不同奇素数的交叉项，二次互反律把分母的变化转成一个周期和，完整周期相消，只剩两端的余项。对固定 $\varepsilon$，充分大块的二次矩至多为 $(X_k/2)x_k^{1+\varepsilon}$。每个坏素数的平方贡献都超过 $x_k^{1+2\varepsilon}/4$。再用块内 $(\ln q)/q\le 2\ln(X_k)/X_k$，并代入 $x_k^\varepsilon=(k\ln 2)^5$，得到对所有充分大的 $k$ 有 $B_k\le 4/(k\ln 2)^4$，故坏素数的总权重有限。另一方面，模 $8$ 余 $3$ 的素数上 $(\ln q)/q$ 的总和发散。把它按这些不相交的块相加，再扣除有限的坏权重，就得到好权重的发散。完整证明由 Lean 内核检查。
:::

因此每个起始块 $K_0$ 之后，都有某个 $k\ge K_0$ 和该块的一个素数 $q$ 达到上述界。发散允许部分块内没有好素数。这里估计的是外库在第一次选 $q$ 时使用的有限和，对应附加扭曲 $\kappa=1$。在外库规定的解析、大小与无零点条件下，对应特征标的平滑中心化和 $g_\chi(x_k)$ 满足 $|g_\chi(x_k)+T_k(q)|\le x_k^\varepsilon$，近似项的符号为负。第一次选 $q$ 时还须同时满足两个无零点条件。随后选 $d$ 时的扭曲和模数随 $q,x$ 变化，相应的对数导数估计与无零点盒条件仍需分别论证。[参考库的有限和](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/GL3MeanSquares/SmoothedRemainderRealIntegralFormula.lean#L139-L147) · [平滑和的近似](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/GChiApproximationSumStatement.lean#L14) · [第一次选素数的条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean)

**如果先指定实高度，仍然能选出素数吗？** 现在先给定实数 $x$，令 $T=x^{\varepsilon/5}$。把前面的截断和写成 $T_x(q)$，即在同一个 $x$ 上取权重 $\Lambda(n)\min\{1,x/n\}$，乘上雅可比符号 $(n/q)$，一直加到 $\lfloor x^{400}\rfloor$。选素数的区间随 $x$ 移动。为给随后要避开的整数留出余地，再给定一个有限集 $E\subset\mathbb N$。记 $S_x(E)$ 为满足下列条件的素数之集：

$$
e^{T/2}<q\le e^T,\qquad q\equiv3\pmod8,\qquad
q\notin E,\qquad |T_x(q)|\le \tfrac12 x^{1/2+\varepsilon}.
$$

::: {.theorem #thm-ch31-real-scale-mangoldt-prime-supply title="每个充分大实高度的好素数权重" lean="D5/S3/CharacterSums/DyadicMangoldtPrimeSupply.real_scale_quadratic_mangoldt_supply"}
对每个固定的 $\varepsilon>0$，存在 $x_0(\varepsilon)$，使得对每个实数 $x\ge x_0(\varepsilon)$ 和每个满足 $|E|\le e^{T/3}$ 的有限集 $E\subset\mathbb N$，都有

$$
\sum_{q\in S_x(E)}\frac{\ln q}{q}\ \ge\ \frac{T}{173065984000}.
$$

:::

::: proof
令 $D=86532992000$。在上述区间内，所有模 $8$ 余 $3$ 的素数的总权重最终至少为 $T/D$。按二进块估计二次矩，在每块中都保持同一个实高度 $x$ 和截点 $\lfloor x^{400}\rfloor$。超过阈值的素数的总权重最终至多为 $36T^2/x^\varepsilon$，除以 $T$ 后趋于零。上述区间内每个素数的权重至多为 $Te^{-T/2}$，删去至多 $e^{T/3}$ 项所损失的权重至多为 $Te^{-T/6}$。当 $x$ 充分大时，两项损失各不超过 $T/(4D)$，余下至少 $T/(2D)$。完整证明由 Lean 内核检查。
:::

**手工推导。** 下界为正，故每个这样的 $x$ 都有合格素数；所选的 $q$ 可以随 $x$ 与 $E$ 改变。由每个素数的权重上界 $Te^{-T/2}$ 还可得 $|S_x(E)|\ge e^{T/2}/173065984000$。若能把违反参考库两个无零点条件中任一项的候选素数全部装入这样的 $E$，定理就会给出同时满足两项的素数。把这些素数装入规定大小的集合，还需要独立的估计。

**第二枚素数落在移动的同余类里。** 先选 $q$ 后，选 $d$ 的模数 $m$ 可以随高度增大。要从区间 $(D/2,D]$ 中删去未通过测试的整数，需要先知道指定同余类里实际有多少素数。对固定 $m$ 的渐近式，其起算点可能依赖 $m$。这里需要对所有 $m$ 同时有效的起算条件。

取整数 $m\ge3$ 及模 $m$ 的可逆剩余类 $a$。在分圆域 $\mathbb Q(\zeta_m)$ 中，记 $\sigma_a(\zeta_m)=\zeta_m^a$，$\Pi_a(t)$ 为不超过 $t$、在此扩张中非分歧且 Frobenius 为 $\sigma_a$ 的有理素数个数。令 $Q$ 为此 Galois 群所有特征标的原始导子的最大值。记 $\operatorname{Li}(t)=\int_2^t du/\log u$。

::: {.theorem #thm-ch31-cyclotomic-tz title="带例外零点项的分圆素数计数" status="written-proof" proof="pf-ch31-cyclotomic-tz" doi="10.2140/ant.2019.13.1039" source="Theorems 1.4 and 3.3, pp. 1042 and 1052" request="https://github.com/the-omega-institute/trureturing-requests/issues/455"}
存在绝对有效常数 $A,c_2,c_3,s>0$。这里的例外零点是某个实特征标对应的原始 Dirichlet $L$ 函数在 $0<\lambda<1/8$、$\beta=1-\lambda/\log Q$ 范围内的实零点。若无例外零点，取 $F(t)=\operatorname{Li}(t)$。若有，例外实特征标唯一，记为 $\chi$，其例外零点为 $\beta=1-\lambda/\log Q$，其中 $sQ^{-2}\le\lambda<1/8$。此时取 $F(t)=\operatorname{Li}(t)-\chi(a)\operatorname{Li}(t^\beta)$。对每个 $m,a$ 和每个 $t\ge Q^{c_2}$ 都有

$$
\left|\varphi(m)\Pi_a(t)-F(t)\right|
\le A\left(e^{-c_3\log t/\log Q}+e^{-\sqrt{c_3\log t}}\right)F(t).
$$

:::

::: {.proof #pf-ch31-cyclotomic-tz}
在 Thorner 与 Zaman 的定理 1.4 中取 $L=\mathbb Q(\zeta_m)$，基域为 $\mathbb Q$，阿贝尔子群取 $H=G=(\mathbb Z/m\mathbb Z)^\times$，共轭类取 $\{\sigma_a\}$。于是固定域为 $\mathbb Q$，其判别式和次数均为 $1$。原文式 (1–11)、(3–1) 中的两个导子参数都化为这里的 $Q$，密度系数为 $1/\varphi(m)$。每个原始导子整除 $m$，而 $m\ge3$ 时群有非平凡特征标，其原始导子至少为 $3$，所以 $3\le Q\le m$。定理 1.4 给出所写相对误差和例外项，定理 3.3 给出 $\lambda\ge sQ^{-2}$。两者的常数均绝对有效。Jesse Thorner and Asif Zaman, “A unified and improved Chebotarev density theorem,” *Algebra & Number Theory* **13**(5) (2019), 1039–1068. [10.2140/ant.2019.13.1039](https://doi.org/10.2140/ant.2019.13.1039) · [原刊定理 1.4](https://msp.org/ant/2019/13-5/ant-v13-n5-p02-s.pdf#page=5) · [原刊定理 3.3](https://msp.org/ant/2019/13-5/ant-v13-n5-p02-s.pdf#page=15)
:::

**手工推导。** 存在绝对有效常数 $c,K,D_0>0$，使每个 $m\ge3$、每个可逆类 $a$ 和每个 $D\ge\max\{D_0,(4m)^K\}$ 都满足下界

$$
\#\{Y<p\le2Y:p\text{ 为素数},\ p\equiv a\pmod m\}
\ \ge\ c\,m^{-3}\frac{Y}{\log Y},\qquad Y=D/2.
$$

先取充分大的 $K\ge2$，再取充分大的 $D_0$。由 $\log Y/\log Q\ge K-1$ 和 $Y\ge D_0/2$，可使 $Y>m$、$Y\ge Q^{c_2}$，且定理在 $Y,2Y$ 处的相对误差均不超过 $1/100$。区间中的素数 $p>m$ 非分歧，其 Frobenius 把 $\zeta_m$ 送到 $\zeta_m^p$。故两端计数之差正是所求素数个数。

若例外零点存在且 $\chi(a)=1$，置 $\delta=1-\beta$，$W=1-Y^{-\delta}$；其余情形置 $W=1$。在 $[Y,2Y]$ 上有 $F'(t)\ge W/\log(2Y)$，故 $F(2Y)-F(Y)\ge WY/(2\log Y)$。在发生抵消的情形，$\beta>1/2$，从 $t^\beta$ 到 $t$ 积分得 $0\le F(t)\le2t(1-t^{-\delta})/\log t$。又因 $1-(2Y)^{-\delta}\le1-Y^{-2\delta}\le2W$，两端之和至多为 $10WY/\log Y$。其余情形有 $0\le F(t)\le2\operatorname{Li}(t)\le6t/\log t$（$t$ 充分大），故各情形都满足 $F(Y)+F(2Y)\le18WY/\log Y$。减去两端误差后，$\varphi(m)(\Pi_a(2Y)-\Pi_a(Y))\ge WY/(4\log Y)$。

在发生抵消的情形，$\delta\log Y\ge s/m^2$。由 $1-e^{-u}\ge(1-e^{-1})\min\{u,1\}$ 得 $W\ge (1-e^{-1})\min\{s,1\}m^{-2}$；$W=1$ 时也成立。再除以 $\varphi(m)\le m$ 即得下界。对选 $d$ 所用的 $y=x^{\varepsilon/5}$、$m\le e^{4y}$ 和 $D=e^{y(\log x)^2}$，有 $\log D/\log(4m)\ge y(\log x)^2/(\log4+4y)\to\infty$，因此同一门槛适用于每个充分大的 $x$。若该类里未通过任一测试的整数数目小于这个素数下界，就至少留下一枚同时通过两项测试的素数。[参考库中的计数假设](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Definitions/GlobalTwisting/GeneralHyps.lean#L113-L118)

**怎样在同一枚 $d$ 上通过两项测试？** 固定 $\varepsilon>0$，记 $y=x^{\varepsilon/5}$、$D=\exp(y(\log x)^2)$、$N=\lfloor x^{400}\rfloor$。沿同余类取 $d_i=b+m(A+i)$，其中 $0\le i<L$。写 $J(n,r)$ 为把 $r$ 的各素因子按重数取 Legendre 符号后相乘的值，$r=0,1$ 时取空积 $1$。素因子 $2$ 对奇数 $n$ 贡献 $1$，对偶数 $n$ 贡献 $0$；对正奇数分母，$J$ 就是雅可比符号。置 $w_n=\Lambda(n)\min\{1,x/n\}$。在同一个 $i$ 上计算

$$
S_i=\sum_{n=1}^N w_n J(n,d_i),\qquad
S_{q,i}=\sum_{n=1}^N w_n J(n,d_i)J(n,q).
$$

索引集合 $H$ 收录满足 $|S_i|>x^{1/2+\varepsilon}/2$ 或 $|S_{q,i}|>x^{1/2+\varepsilon}/2$ 的 $i$。于是 $i\notin H$ 表示两个和同时达到所需界。

::: {.theorem #thm-ch31-splitting-progression-power-tail title="同一分裂同余类上两项测试的例外索引" lean="D5/S3/CharacterSums/SplittingProgressionExponentialTail.splitting_progression_power_tail"}
对每个固定的 $\varepsilon>0$ 和每个充分大的实数 $x$，任取自然数 $q,b,m,A,L$，设 $b\equiv3\pmod4$、$4\mid m$，且每个整除 $m$ 的素数 $p$ 都满足 $p\le x^{1/2+\varepsilon/2}$ 或 $p>N$。若 $L\ge D/(4e^{4y})$，则

$$
|H|\le L D^{-\min\{\varepsilon,1\}/38400}.
$$

:::

::: proof
从两个和中取出不整除 $m$ 的奇素数项。较高素数幂、$2$ 和整除 $m$ 的素数项由截断权重及因子条件控制，对每项测试的误差最终至多为 $x^{1/2+\varepsilon}/4$。因 $d_i\equiv3\pmod4$，二次互反律把每个 $J(p,d_i)$ 写为固定符号乘以 $d_i\bmod p$ 的二次特征标。在剩余素数乘积的完整周期上，对每个保留的素数 $p$，由于 $p\nmid m$，模 $p$ 的每个剩余类出现的次数相同。中国剩余定理给出各坐标的独立性。每个特征标有界且均值为零，因此各系数的平方和控制高偶次矩。在实际长度 $L$ 的区间上展开同一个矩，每个素数元组在完整周期之外只留下端点余项。取矩阶 $2\lfloor y\log x/4800\rfloor$，给定的长度门槛足以吸收这些余项。在任何失败索引上，至少一个剩余素数和的绝对值达到 $x^{1/2+\varepsilon}/4$；用两个非负偶次幂之和同时控制全部失败索引即得所示界。完整证明由 Lean 内核检查。
:::

**手工推导。** 对每个固定的 $B>0$，$D^{-\min\{\varepsilon,1\}/38400}\le e^{-By}$ 最终成立。要把整数索引变成真正的素数，可取上一段的 $(D/2,D]$ 并只枚举其中指定同余类的元素。若 $m\ge3$、$m\le e^{4y}$、$a=b\bmod m$ 为可逆类，且这个枚举满足定理的诸条件，则 $L\le D+1$。失败索引至多 $(D+1)D^{-\min\{\varepsilon,1\}/38400}$，它与素数个数下界 $c m^{-3}(D/2)/\log(D/2)$ 的比值趋于零，因为 $m^3\le e^{12y}$ 而 $\log D=y(\log x)^2$。所以在每个这样的充分大高度，至少一枚素数 $d$ 同时通过两项测试。

对前文选出的第一枚素数 $e^{y/2}<q\le e^y$，取 $M=q\prod_{2<p\le y,\ p\text{ 为素数}}p$，$m=16M$，$b=8M-1$。此时 $b\equiv3\pmod4$ 且 $\gcd(b,m)=1$。由 $\vartheta(y)\le y\log4$ 得 $\log m\le\log16+(1+\log4)y\le4y$（$x$ 充分大）。整除 $m$ 的素数或者不超过 $\max\{2,y\}$，或者是 $q>e^{y/2}>N$。在 $(D/2,D]$ 中枚举该类，索引数至少为 $D/(2m)-1\ge D/(4m)$，从而满足长度门槛。在同一个 $x$ 上，第一枚素数 $q$ 与由此获得的 $d$ 使第一项测试以及上述两项测试全部通过。

**六个系数分别属于哪个导子？** 取互异的奇素数 $q,d$，写 $j_p(n)=J(n,p)$。令 $e(n)=\chi_8(n)$，它在偶数上取零，在模 $8$ 余 $1,7$ 时取 $1$，余 $3,5$ 时取 $-1$。称 $f$ 在模 $a$ 上有本原表示，是指存在导子为 $a$ 的模 $a$ Dirichlet 特征标，在每个自然数 $n$ 处都取值 $f(n)$。这里的取值包含非单位。

::: {.theorem #thm-ch31-six-primitive-quadratic-levels title="六个二次系数的本原表示" lean="D5/S3/CharacterSums/PrimitiveQuadraticConductors.six_quadratic_levels"}
对每一对互异奇素数 $q,d$，下列六对函数与模数均给出复 Dirichlet 特征标的本原表示：

$$
(j_q,q),\quad(ej_q,8q),\quad(j_d,d),\quad(ej_d,8d),\quad
(j_qj_d,qd),\quad(ej_qj_d,8qd).
$$

:::

::: proof
奇素数模的二次特征标非平凡，因此在该素数模上本原。模 $8$ 的特征标 $e$ 在 $1$ 和 $5$ 上取相反值，这两个数模 $4$ 同余，因此它不能经由 $4$ 或其因子下降。将互素模数的本原特征标提升至乘积模数后相乘，导子是原导子的乘积。逐次用于 $8,q,d$ 即得六个表示；若一个整数与乘积模数不互素，相应因子取零，故乘积取值公式在该整数上也成立。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-primitive-inducing-level title="从互素处的取值恢复本原导子" lean="D5/S3/CharacterSums/PrimitiveQuadraticConductors.inducing_level_and_values"}
令 $R$ 为带零交换幺半群，$r,a,M$ 为正整数，$\chi$ 为模 $r$ 的本原 $R$ 值 Dirichlet 特征标。设 $f:\mathbb N\to R$ 在模 $a$ 上有本原表示，且对所有与 $M$ 互素的 $n$ 都有 $\chi(n)=f(n)$。则 $r=a$，且对每个自然数 $n$ 都有 $\chi(n)=f(n)$。
:::

::: proof
把 $\chi$ 和表示 $f$ 的特征标都提升到模 $raM$。该模数的每个单位都能用与 $M$ 互素的整数代表，故两个提升在单位上相同，进而是同一特征标。提升保持导子，所以两个本原导子相等。此时从同一原模数出发的提升是单射，两者的全部取值相同。完整证明由 Lean 内核检查。
:::

**进入右半平面时，特征标本身提供什么界？** 记 $h$ 为特征标的模数，$s=\sigma+it$。下面的估计也适用于非本原的非主特征标。

::: {.theorem #thm-ch31-nonprincipal-half-totient title="非主 Dirichlet L 函数的严格半欧拉函数界" lean="D5/S3/CharacterSums/NonprincipalCharacterGrowth.nonprincipal_growth"}
对每个正整数 $h$、每个模 $h$ 的非主复 Dirichlet 特征标 $\chi$ 和每个满足 $\sigma=\operatorname{Re}s>0$ 的复数 $s$，都有

$$
|L(s,\chi)|<\frac{\varphi(h)}{2}\frac{|s|}{\sigma}.
$$

:::

::: proof
令 $A(u)=\sum_{1\le n\le u}\chi(n)$。完整周期的和为零，一个周期内的前缀与余段的和互为相反数。两段中单位的总数为 $\varphi(h)$，用其中较少的一段估计就得 $|A(u)|\le\varphi(h)/2$。在 $\sigma>1$ 上，部分求和给出 $L(s,\chi)=s\int_1^\infty A(u)u^{-s-1}\,du$。由于 $A$ 有界，右端积分在 $\sigma>0$ 上局部一致收敛并定义全纯函数；由恒等定理，上述等式在整个右半平面 $\sigma>0$ 上成立。当 $h<u<h+1$ 时，$A(u)$ 恰好是一个完整周期的和，等于零，而用来估计积分的函数 $\varphi(h)u^{-\sigma-1}/2$ 在该区间为正。因此被积函数模长的积分严格小于上界函数的积分。对复积分用三角不等式并乘以 $|s|$，即得所述严格不等式。完整证明由 Lean 内核检查。
:::

**手工推导。** 系数 $ej_qj_d$ 的本原导子为 $8qd>1$，而主特征标的导子为 $1$，因此它满足非主条件，可以在上式中代入 $h=8qd$。要进一步估计 $L'/L$，仍需在所指定的区域控制 $L$ 的零点。

**从同一实端点控制 $L'/L$。** 取正整数模数 $h$、模 $h$ 的非主复 Dirichlet 特征标 $\chi$，记 $D_\chi=L'(1,\chi)/L(1,\chi)$。在正实数 $x$ 处定义斜坡和及非主分支的平滑中心化和

$$
R_\chi(x)=\sum_{1\le n\le\lfloor x\rfloor}\Lambda(n)\max(x/n-1,0)\chi(n),
\qquad g_\chi(x)=R_\chi(x)+xD_\chi .
$$

这里的和包含素数幂；当 $x$ 本身是整数时，新进入的一项权重为零。记 $I(x)=\int_x^\infty(\psi(u)-u)u^{-2}\,du$，其中 $\psi(u)=\sum_{n\le u}\Lambda(n)$，$\gamma$ 为欧拉常数。

::: {.theorem #thm-ch31-log-derivative-ramp-tail title="同一端点的斜坡和与带符号尾积分" lean="D5/S3/CharacterSums/DirichletRampEndpoint.logDerivative_le_ramp_tail"}
对每个正整数 $h$、每个模 $h$ 的非主复 Dirichlet 特征标 $\chi$ 和每个实数 $x>0$，有

$$
|D_\chi|\le\frac{|g_\chi(x)|}{x}+\log x-1-\gamma-I(x).
$$

:::

::: proof
在 $xD_\chi=g_\chi(x)-R_\chi(x)$ 中用三角不等式。由于 $|\chi(n)|\le1$，$|R_\chi(x)|/x$ 至多为 $\sum_{n\le x}\Lambda(n)/n-\psi(x)/x$。对 $x\ge2$，完整的 Chebyshev 尾积分恒等式把后一式写成 $\log x-1-\gamma-I(x)$，保留了尾项的符号。对 $0<x<2$，斜坡和为零；在 $(x,2)$ 上尾积分的被积函数为 $-1/u$，从端点 $2$ 积回 $x$ 给出同一公式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-uniform-log-derivative-ramp title="平方根尺度斜坡界给出的统一对数导数估计" lean="D5/S3/CharacterSums/DirichletRampEndpoint.uniform_logDerivative_of_ramp"}
对所有实数 $\varepsilon<1/2$、$\eta>0$，存在 $X\ge2$，使得对每个 $x\ge X$、每个正整数 $h$ 及每个模 $h$ 的非主复 Dirichlet 特征标 $\chi$，都有

$$
|g_\chi(x)|\le x^{1/2+\varepsilon}
\quad\Longrightarrow\quad
|D_\chi|\le\log x-1-\gamma+\eta .
$$

:::

::: proof
用中心化和 $|g_\chi(x)|$ 的界除以 $x$，得 $|g_\chi(x)|/x\le x^{\varepsilon-1/2}\to0$。Chebyshev 误差核绝对可积，故 $I(x)\to0$。取 $X$ 使这两项的误差各小于 $\eta/2$，代入上一条端点界即可。二者只依赖实端点和误差参数，所以同一个起点适用于所有模数与特征标。完整证明由 Lean 内核检查。
:::

**手工推导。** 非主分支上，前文使用的参考库平滑中心化和 `An.gChi` 与上式的 $g_\chi$ 定义一致。对宿主有界集合中的每个特征标及诱导它的每个非主本原特征标 $\chi$，宿主条件 `EAtH.bdG` 在同一端点 $x$ 给出 $|g_\chi(x)|\le x^{1/2+\varepsilon}$。若 $\varepsilon<1/2$，取 $\eta=1$，则每个充分大的 $x$ 都有 $|D_\chi|\le\log x-\gamma\le4\log x$。这给出 `EAtH.bdL` 对该 $\chi$ 要求的系数 $4$ 的不等式。主特征标有单独的分支。[中心化和与对数导数的定义](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Analytic.lean#L9-L27) · [宿主的两个逐点条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L144-L151)

对同一非主特征标，整窗上的 $g_\chi$ 还可由有限个结点控制。记 $D_\chi=L'(1,\chi)/L(1,\chi)$，并将 $g_\chi(x)=R_\chi(x)+xD_\chi$ 的同一斜坡公式用于所有实数 $x$。给定 $Y\le Z$，把两个端点与所有满足 $Y<n<Z$、$\Lambda(n)\chi(n)\ne0$ 的自然数 $n$ 合并成有限集 $T_\chi(Y,Z)$。内部结点是特征标值非零的素数幂。

::: {.theorem #thm-ch31-character-concave-window title="用端点与有效结点检验凹包络" lean="D5/S3/CharacterSums/DirichletRampWindow.concave_window_iff"}
取正整数模数 $N$ 和模 $N$ 的非主复 Dirichlet 特征标 $\chi$。对任意实数 $Y\le Z$ 及在 $[Y,Z]$ 上凹的实值函数 $B$，整窗上每点都满足 $|g_\chi(x)|\le B(x)$，当且仅当 $T_\chi(Y,Z)$ 的每个点都满足这个不等式。
:::

::: proof
相邻检验点之间，已经开始的各个斜坡都是仿射函数，还未开始的斜坡取零。可能在两点之间进入的项系数为零。因此复值函数 $g_\chi$ 在这一段上仿射。把内部点写成两端的凸组合，三角不等式将其范数控制在端点范数的弦之下，而 $B$ 的凹性把端点函数值的弦控制在 $B(x)$ 之下。端点重合时只需该点的不等式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-character-power-log-window title="幂包络与对数导数的有限联合检验" lean="D5/S3/CharacterSums/DirichletRampWindow.power_log_window_iff"}
取上述模数与特征标。设 $0<Y\le Z$，$0\le p\le1$，$A,c\ge0$。整窗上每个 $x\in[Y,Z]$ 都同时满足

$$
|g_\chi(x)|\le A x^p,\qquad |D_\chi|\le c\ln x
$$

当且仅当 $|g_\chi(t)|\le A t^p$ 对每个 $t\in T_\chi(Y,Z)$ 成立，并且 $|D_\chi|\le c\ln Y$。
:::

::: proof
在给定指数范围内，$x\mapsto A x^p$ 在正实轴上凹，故第一项可直接应用 [@thm-ch31-character-concave-window]。第二项的左边不随 $x$ 改变，而 $c\ln x$ 在窗上单调不减，在 $Y$ 处检验即可。完整证明由 Lean 内核检查。
:::

**窗口预算怎样限制内点的负值？** 沿用上文的素数尾项，记

$$
Q_{\vartheta}(x)=\int_x^\infty\frac{\vartheta(t)-t}{t^2}\,dt,
\qquad N(a,b)=\int_a^b\frac{\max\{-Q_{\vartheta}(z),0\}}{\sqrt z}\,dz.
$$

::: {.theorem #thm-ch31-prime-tail-negative-window title="内点负值给出的窗口积分下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.prime_tail_negative_window_lower"}
设 $a,b,x,r$ 为实数，满足 $0<r\le 1/2$、$1\le a\le(1-r)x$ 和 $(1+r)x\le b$。若 $Q_{\vartheta}(x)\le-4r^2$，则 $N(a,b)\ge r^3\sqrt{x}$。
:::

::: proof
这个估计适用于实数截点，包括素数处的跃迁。

由 $\vartheta$ 的单调性，将局部积分中的 $\vartheta(t)$ 与 $\vartheta(x)$ 比较，得到
$Q_{\vartheta}(z)-Q_{\vartheta}(x)\le\ln(z/x)+\vartheta(x)(1/z-1/x)$。
当 $\vartheta(x)\le x$ 时取左侧，反之取右侧。在所选方向上，右端由 $\ln(z/x)+x/z-1$ 控制，而 $\ln t\le t-1$ 将它进一步控制在 $(z-x)^2/(zx)\le 2r^2$ 以内。于是长度为 $rx$ 的那一侧都有 $-Q_{\vartheta}(z)\ge 2r^2$，且 $\sqrt{z}\le2\sqrt{x}$。积分即得下界。 完整证明由 Lean 内核检查。

:::

因此，只要已知窗口预算严格小于 $r^3\sqrt{x}$，就可以排除该内点的深度 $4r^2$。两侧余量决定可用的 $r$。这个局部估计以窗口预算为前提。在上文列出的外库算术输入下，模 $1$ 构造给出任意远的小预算窗口。

::: {.theorem #thm-ch31-prime-fixed-ratio-mass title="偏线零点给出的固定比例窗口质量下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeFixedRatioWindowMass.prime_tail_fixed_ratio_mass_of_zero"}
设 $\rho$ 是非平凡零点，且 $\beta=\operatorname{Re}\rho>1/2$。存在实数 $\kappa>1$、$c>0$ 和 $S$，使每个 $B\ge S$、$A\ge2$ 且 $B\ge\kappa A$ 的实窗口都满足

$$
N(A,B)\ge cB^{\beta-1/2}.
$$
:::

::: proof

取 $\rho$ 与其共轭中虚部为正的一项。选实部在 $1/2$ 与 $\beta$ 之间的截线，以紧支撑的概率测度保留这对零点，并消去截线右侧的其余零点。令 $Q$ 为以 $\psi$ 定义的完全余项。在对数坐标 $t=\ln x$ 中，$-Q(e^t)$ 的平移平均以尺度 $e^{(\beta-1)t}$ 的余弦为主项。截线给出的严格指数差使误差最终小于余弦振幅的四分之一。

取一段固定长度的子窗，使余弦至少为 $1/2$。交换对子窗和概率测度的积分后，每个平移后的子窗都落在由滤波支撑加宽后的同一大窗内。每个有符号积分都由大窗中 $-Q(e^t)$ 的正部积分控制。在大窗 $[T,T+W]$ 上，换元 $x=e^t$ 带来至少 $e^{T/2}$ 的权重，且 $Q_\vartheta\le Q$。于是素数尾积分的下界具有尺度 $e^{(\beta-1/2)T}$。取 $T=\ln B-W$ 和 $\kappa=e^W$，子窗就成为 $[B/\kappa,B]$，包含在每个允许的 $[A,B]$ 内。

完整证明由 Lean 内核检查。
:::

比例、系数和阈值都可随给定零点改变。论证适用于任一符合前提的偏线零点，且所给幂指数没有损失。任意预先指定的 $\kappa>1$ 是否可用，需要进一步控制滤波支撑和振荡周期。

::: {.theorem #thm-ch31-prime-prescribed-ratio-mass title="上确界未取到时的预定比例质量下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePrescribedRatioWindowMass.prime_tail_prescribed_ratio_mass_of_unattained"}
记 $\Theta$ 为黎曼 ζ 函数非平凡零点实部的上确界，并设每个非平凡零点的实部都严格小于 $\Theta$。任取实数 $\kappa>1$ 与 $1/2<\sigma<\Theta$。存在常数 $c>0$ 和 $S$，使每对满足 $B\ge S$、$A\ge2$、$\kappa A\le B$ 的实端点都有

$$
N(A,B)\ge cB^{\sigma-1/2}.
$$
:::

::: proof

给定对数宽度 $W=\ln\kappa$，为概率滤波器预留 $W/2$ 的支撑宽度。上确界未取到时，可把任意有限高度范围内的零点留在一条低于 $\Theta$ 的截线左侧，再选择截线右侧的共轭零点对。所留零点的实部 $\beta$ 大于 $\sigma$，虚部足够大，使两个余弦周期与滤波器支撑合在一起仍能放入宽度 $W$。平滑后的余弦在一个固定长度的子区间内压过误差。交换概率平均与子区间积分，把下界传给原始尾项在同一窗口内的负部质量。

经 $x=e^t$ 换元，并使用 $Q_\vartheta\le Q$，区间 $[\ln B-W,\ln B]$ 给出 $[B/\kappa,B]$ 上的下界，幂指数为 $\beta-1/2$。这个子窗包含于每个允许的 $[A,B]$，且对充分大的 $B$，相同常数也适用于较低的幂指数 $\sigma-1/2$。完整证明由 Lean 内核检查。
:::

比例和目标指数先给定，系数和阈值可依赖二者。该陈述的范围是 $\sigma<\Theta$ 且上确界未取到。

::: {.theorem #thm-ch31-prime-unattained-endpoint-mass title="未取到上确界时的端点指数" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeUnattainedEndpointMass.prime_tail_endpoint_mass_tendsto_zero"}
设 $\Theta>1/2$ 是黎曼 ζ 函数非平凡零点实部的上确界，且每个非平凡零点的实部都严格小于 $\Theta$。令 $p=\Theta-1/2$。当实数 $B\to+\infty$ 时，

$$
\frac{N(2,B)}{B^p}\longrightarrow0.
$$
:::

::: proof
以 $x^{1-\Theta}$ 归一化完全尾项。每个零点的贡献在这一尺度上趋于零，而零点系数的绝对和给出统一的支配界，因此可将极限移入级数。平凡零点和常数项在这一尺度上消失。素数幂修正原为 $O(x^{-1/2})$，因 $\Theta>1/2$，归一化后也趋于零。因此 $x^{1-\Theta}Q_\vartheta(x)\to0$。

任给 $\varepsilon>0$，选定一个阈值 $X\ge2$，使 $x\ge X$ 时质量的被积函数至多为 $\varepsilon p x^{p-1}$。于是在 $[X,B]$ 上积分至多为 $\varepsilon(B^p-X^p)$。固定的初段质量 $N(2,X)$ 除以 $B^p$ 后趋于零。这个论证同样适用于 $\Theta=1$。 完整证明由 Lean 内核检查。
:::

质量非负，故对每个 $2\le A\le B$，都有 $0\le N(A,B)\le N(2,B)$。端点极限因而同时控制所有这些窗口。预定比例的下界可取每个严格低于 $\Theta-1/2$ 的正幂，在端点幂上，归一化后的质量趋于零。

::: {.theorem #thm-ch31-prime-attained-short-windows title="上确界取到时的零质量短窗口" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeAttainedShortWindows.prime_tail_positive_short_windows_of_attained_zero"}
设有非平凡零点 $\rho$，其 $\beta=\operatorname{Re}\rho>1/2$，且所有非平凡零点的实部都不超过 $\beta$。存在实数 $\kappa_0>1$、$K\ge1$ 和 $X_0\ge2$，使每个 $X\ge X_0$ 都有 $A\in[X,KX]$，满足

$$
Q_\vartheta(x)>0\quad(A\le x\le\kappa_0 A),
\qquad N(A,\kappa A)=0\quad(1\le\kappa\le\kappa_0).
$$
:::

::: proof
在对数坐标中，紧支撑正滤波器保留一对达到最右实部的共轭零点。平滑信号的正峰迫使未平滑的完全尾项在每个充分晚、某个固定宽度的对数窗口内达到正值，且用 $e^{(1-\beta)t}$ 归一化后，峰高有统一的正下界。

在同一归一化下，实部小于 $\beta$ 的零点项趋于零。零点系数的绝对可和性给出支配界，允许任意接近最右线的低实部零点。最右线上的零点项构成一致连续的函数。素数幂修正的归一化量也趋于零，因为 $\beta>1/2$。因此，足够晚的正峰可延伸为一段固定的右向对数宽度，在整个区间内仍有 $Q_\vartheta>0$。指数换元将找到下一处正峰所需的固定对数距离变成倍数 $K$，并将正号区间的固定宽度变成比例 $\kappa_0$。 完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-prime-mass-no-finite-limit title="最大实部取到时的固定比例质量无有限极限" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeAttainedMassNonconvergence.prime_tail_mass_no_finite_limit_of_attained_zero"}
假设某个非平凡零点 $\rho$ 取到最大实部 $\beta=\operatorname{Re}\rho>1/2$。对任意固定的实数 $\kappa>1$，设

$$
M_\kappa(B)=\frac{N(B/\kappa,B)}{B^{\beta-1/2}}.
$$

当实数 $B\to+\infty$ 时，$M_\kappa(B)$ 没有有限极限。
:::

::: proof
取 $p=\beta-1/2$ 及 $1<\lambda\le\min(\kappa,\kappa_0)$。把同一窗口 $[B/(\lambda\kappa),B]$ 分别在 $B/\lambda$ 和 $B/\kappa$ 处分割，得到

$$
M_\lambda(B)-\kappa^{-p}M_\lambda(B/\kappa)
=M_\kappa(B)-\lambda^{-p}M_\kappa(B/\lambda).
$$

若 $M_\kappa$ 趋于有限值 $L$，则 $0\le M_\lambda\le M_\kappa$ 给出晚期有界性。上式右边趋于 $(1-\lambda^{-p})L$，而 $0<\kappa^{-p}<1$，所以递推迫使 $M_\lambda$ 趋于 $(1-\lambda^{-p})L/(1-\kappa^{-p})$。将候选极限从递推两边扣除。固定迭代次数 $n$ 后，初始误差乘以 $\kappa^{-np}$，其余项由趋于零的误差和收敛的几何级数控制。任意晚的零质量短窗使这个极限为零，从而 $L=0$。

取一个固定整数 $m$，使 $\kappa^m$ 至少达到固定比例幂下界所要求的比例。将 $[B/\kappa^m,B]$ 划分为 $m$ 个比例为 $\kappa$ 的相邻窗口。归一化总质量是 $m$ 项带有固定权重的 $M_\kappa$ 之和，因此也趋于零。这与该较大窗口在同一指数 $p$ 下的正下界矛盾。 完整证明由 Lean 内核检查。
:::

Bingham 和 Gashi 在离散对数移动平均中也使用几何展开，将延迟平均与累积平均相联。[Bingham–Gashi，式（2.3）–（2.4）](https://arxiv.org/abs/1408.1301)

::: {.theorem #thm-positive-average-prime-window title="正平均序列给出每个充分晚的窗口下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.eventual_prime_window_lower_of_log_frequency"}
沿用完全曼戈尔特余项 $U$ 和素数负部质量 $N$，对实数 $v$ 记 $H(v)=\int_{v-\ln 2}^v U(e^t)\,dt$。给定实序列 $u_n\to+\infty$，满足 $u_{n+1}/u_n\to1$，并且对某些 $c>0$、$\beta>1/2$ 和 $M\in\mathbb R$，充分大的 $n$ 都满足 $H(u_n)\ge c e^{\beta u_n}/u_n^M$。那么对每个 $\varepsilon>0$，充分大的 $Y$ 都有

$$
N(Y,Y^{3/2})\ge Y^{(3/2)(\beta-1/2)-\varepsilon}.
$$
:::

::: proof
写 $y=\ln Y$。固定 $1<k<3/2$，在足够大的指标后取首个满足 $u_n\ge ky$ 的指标。前一项小于 $ky$，相邻项比例最终小于 $3/(2k)$，所以 $ky\le u_n\le3y/2$。当 $(k-1)y\ge\ln 2$ 时，$[e^{u_n}/2,e^{u_n}]$ 全部落在 $[Y,Y^{3/2}]$ 内。用 $U(x)=-xQ(x)$ 换元后，$H(u_n)=-\int_{e^{u_n}/2}^{e^{u_n}}Q(x)\,dx$。素数幂修正给出 $Q_\vartheta\le Q$，而短区间上 $\sqrt x\le e^{u_n/2}$，因此 $H(u_n)\le e^{u_n/2}N(Y,Y^{3/2})$。取 $k$ 充分接近 $3/2$，留出任意小的指数损失来吸收 $c$ 和 $u_n^M$。 完整证明由 Lean 内核检查。
:::

**从 ζ 零点取得正平均。** 把 $U$ 在 $0<x<1$ 上置零，所得函数记为 $U_0$。令 $H_*(x)=\int_1^2 U_0(x/v)\,dv/v$，则 $x>2$ 时 $H_*(x)=H(\ln x)$。在 $\operatorname{Re}(s)>1$ 上交换两个绝对收敛的积分，得到 $H_*$ 的 Mellin 变换 $k(s)\Phi_*(s)$，其中 $\Phi_*$ 是在 $1$ 处补值的完全曼戈尔特变换，$k(s)=(1-2^{-s})/s$。$H_*$ 在对数坐标中局部 Lipschitz，在 $x<1$ 时为零，并满足 $O(x\ln^2 x)$ 界。由于 $|2^{-\rho}|=2^{-\operatorname{Re}(\rho)}<1$，这个平均保留所有非平凡零点处的极点。每个极点的实部都至多是 $H_*$ 的增长横坐标，否则原 Mellin 积分会在该点全纯。

在 $\operatorname{Re}(s)>-3/4$ 上使用亚纯延拓，取弱有界性条件中的左端 $\sigma_0=-1/2$。这样所有非平凡零点都计入单位高度区间的重数和，Riemann–von Mangoldt 公式将该和控制在 $O(\ln t)$。局部的 $\zeta'/\zeta$ 公式给出零点倒距离和与 $O(\ln t)$ 余项。对 $\operatorname{Re}(s)\le2$，每个倒距离可用 $\exp(\sum_{|\operatorname{Im}\rho-t|\le1} m_\rho|\ln|s-\rho||)$ 控制，右侧半平面则用绝对收敛的 Dirichlet 级数。在余下的有界高度范围，减去有限个极点的主部，再用紧性控制全纯余项。乘上 $k(s)$ 和 $1/[s(s-1)]$ 后仍满足振荡定理所需的竖向界。从 $-1/4$ 起绕实轴奇点的围道只需计入 $0$ 处的简单极点，所得主项是常数。[Srinivas，引理 3 和 4](https://www.impan.pl/shop/en/publication/transaction/download/product/83372?download.pdf)

给定实部为 $\beta>1/2$ 的非平凡零点，Radziejewski 的定理给出交替振荡，幅度下界为常数乘 $x^\beta/(\ln x)^M$。有界主项可被吸收，偶数子序列给出正平均，两个相邻对数比的乘积仍趋于 $1$。因此由 [@thm-positive-average-prime-window] 得到同一窗口下界。这一步使用文献中的振荡定理，Lean 定理的范围是从正平均序列到窗口质量。小预算上界另由 [@thm-ch31-prime-window-rh] 的正向给出。取外部证明的 RH，对每个固定的 $b>1$ 和 $\eta>0$，所有充分大的 $Y$ 都满足 $A_{\vartheta,b}(Y)\le Y^\eta$。[Radziejewski，定理 3.2，DOI 10.4064/aa163-2-7](https://www.impan.pl/shop/en/publication/transaction/download/product/82009?download.pdf#page=8)

::: {.theorem #thm-ch31-prime-attained-critical-width title="归一化负部质量的临界宽度" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeAttainedCriticalWidth.prime_tail_zero_liminf_iff_le_critical_width"}
设某个非平凡零点取到最大实部 $\beta>1/2$，令 $p=\beta-1/2$。对每个固定对数宽度 $W\ge0$，定义

$$
a(W)=\liminf_{B\to+\infty}\frac{N(Be^{-W},B)}{B^p}.
$$
存在唯一的实数 $W_*>0$，使得对每个 $W\ge0$，$a(W)=0$ 当且仅当 $W\le W_*$。
:::

::: proof
增大 $W$ 只会向左扩展积分区间，因此 $a$ 非负且非减。积分显式公式用最右线零点级数实部的相反数逼近归一化后的完整尾项。级数的绝对值受系数绝对值之和控制，归一化后的素数幂修正趋于零，因此充分远处有 $|x^{1-\beta}Q_\vartheta(x)|\le C$，质量密度至多为 $Cx^{p-1}$。将宽度从 $U$ 增至 $W$，归一化后只增加区间 $[Be^{-W},Be^{-U}]$ 的质量，其上界为 $(C/p)(e^{-pU}-e^{-pW})$。对右端点取下极限得到连续性。

反复出现的零质量短窗使零点集包含一段正宽度。较宽的窗口具有精确幂次的统一正下界，因此零点集有界。连续性使零点集包含自己的上确界。完整证明由 Lean 内核检查。
:::

在该定理的假设下，宽度恰为 $W_*$ 时，任意晚都有归一化质量任意小的窗口。超过 $W_*$ 后，每个足够晚的窗口都有严格正下界，该下界可依赖宽度。黎曼 ζ 函数的所有非平凡零点都在临界线上，因而这里定义 $W_*$ 所需的假设（有零点达到最大实部 $\beta>1/2$）对它不成立。

::: {.theorem #thm-ch31-prime-phase-cluster title="固定宽度窗口的全部簇值" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePhaseCluster.prime_tail_mass_cluster_iff_of_upper_bound"}
设 $\beta>1/2$ 是所有黎曼 ζ 函数非平凡零点实部的上界，令 $p=\beta-1/2$。对固定实数 $W\ge0$，记 $M_W(B)=N(Be^{-W},B)/B^p$。将非平凡零点按重数列为 $\rho_k$，记 $\gamma_k=\operatorname{Im}\rho_k$。设 $a_k=1/[\rho_k(1-\rho_k)]$ 当 $\operatorname{Re}\rho_k=\beta$，其余 $a_k=0$。在单位圆的乘积空间中，记 $H$ 为相位轨道 $\phi(t)=(e^{i\gamma_k t})_k$（$t\in\mathbb R$）的闭包。对 $h\in H$，定义

$$
F_h(u)=-\operatorname{Re}\sum_k a_k h_k e^{i\gamma_k u},
\qquad I_W(h)=\int_0^W e^{-ps}\max\{-F_h(-s),0\}\,ds.
$$

实数 $y$ 是 $B\to+\infty$ 时 $M_W(B)$ 的簇值，当且仅当存在 $h\in H$ 使 $y=I_W(h)$。
:::

::: proof
令 $B=e^t$，以 $x=e^{t-s}$ 换元。归一化质量成为对 $0\le s\le W$ 的加权积分，负部的输入是 $e^{(1-\beta)(t-s)}Q_\vartheta(e^{t-s})$。积分显式公式与素数幂修正给出该输入与 $F_{\phi(t)}(-s)$ 之差趋于零。由于 $t-s\ge t-W$，误差在全窗上一致趋于零。取负部至多保留原误差，积分之后仍趋于零。

相位乘积空间是紧空间。整数时刻的相位任意晚都能回到单位元的任意邻域，平移这个回归就能在任意晚的时刻逼近每一个轨道点。再取闭包，得到 $H$ 内每一点都可由晚期相位逼近。系数绝对可和使 $I_W$ 连续，所以它在 $H$ 上的像闭合。结合全窗误差，簇集恰为 $I_W(H)$。完整证明由 Lean 内核检查。
:::

簇值的集合是一个紧区间，因为实相位轨道的闭包连通，窗口泛函连续。若没有零点实部等于 $\beta$，或 $W=0$，该区间退化为 $\{0\}$。当某个非平凡零点取到最大实部 $\beta>1/2$ 且 $W>0$ 时，这个区间的左端点等于临界宽度定理中的下极限。零属于簇集只要求任意晚的窗口质量可在归一化下逼近零。

**零质量窗口与中间零点。** 设 $\beta>1/2$ 是所有非平凡零点实部的上界，记 $p=\beta-1/2$，并令 $C=2+\gamma_{\mathrm E}-\ln(4\pi)$，其中 $\gamma_{\mathrm E}$ 是欧拉常数。用上文按重数列出的 $\rho_k$ 定义

$$
G_\beta(u)=
\sum_{1/2<\operatorname{Re}\rho_k<\beta}
\frac{\exp((\operatorname{Re}\rho_k-1/2)u)}{|\rho_k(1-\rho_k)|}.
$$

::: {.theorem #thm-ch31-prime-critical-residual title="晚期零质量窗口的三种情形" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalResidual.prime_tail_mass_pos_or_intermediate_or_wider_zero_cluster"}
记 $G_\beta$ 如上。 任取 $0<d<2-C$。存在实数 $T$，对每个上述上界 $\beta$，每个 $W>0$、$t-W\ge T$ 的窗口至少满足以下一项。

- $N(e^{t-W},e^t)>0$。
- 存在 $u\in[t-W,t]$ 使 $G_\beta(u)\ge d$。
- 存在 $W'>W$，使零是 $N(Be^{-W'},B)/B^p$ 在实数 $B\to+\infty$ 时的簇值。
:::

[平方根尺度的余项界](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalResidual.eventually_prime_tail_root_scale)。

在平方根尺度上，从完整尾项减去素数幂的修正趋于 $2$。临界线上的系数为正实数，它们的总和至多为第一 Li 系数 $C$。临界线左侧的零点项由可和的系数模支配，且每项随 $u\to+\infty$ 衰减，故其总和趋于零。$G_\beta$ 控制其余低于上界线的零点。对充分大的 $u$，从上界线的贡献减去 $d$ 并加上 $G_\beta(u)$，仍得到 $e^{u/2}Q_\vartheta(e^u)$ 的上界。若窗口质量为零且整窗都有 $G_\beta<d$，连续性给出 $Q_\vartheta\ge0$，上界线的相位曲线因而在整窗上严格为正。它在左端点连续，可以向左延伸一点。延伸后的相位曲线在更宽的窗口上给出零负部质量，固定宽度簇集公式随即给出相应的零簇值。中间谱和 $G_\beta(u)$ 随 $u$ 单调不减。因此，若右端点满足 $G_\beta(t)\le d<2-C$，可选 $d<d'<2-C$，用 $d'$ 的阈值保证整窗的严格余量。

若某个非平凡零点取到最大实部 $\beta>1/2$，且实部小于 $\beta$ 的非平凡零点都满足 $\operatorname{Re}\rho\le1/2$，则 $G_\beta=0$。第一 Li 系数满足 $C<1/3$，故可取 $d=1$。现在令 $W=W_*$。更宽窗口的下极限严格为正，排除了第三项，所以每个充分晚的临界宽度窗口都有严格正的质量。任何同一右端点、更宽且左端点至少为 $2$ 的窗口都包含这个临界窗口，因而质量也严格为正。临界宽度的归一化质量仍可任意接近零。若存在实部严格介于 $1/2$ 和 $\beta$ 的零点，临界宽度下精确零质量窗口是否反复出现仍待确定。

::: {.theorem #thm-ch31-growing-prime-tail-clusters title="增长对数宽度的全部簇值" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthCluster.prime_tail_growing_width_cluster_iff_of_upper_bound"}
设 $β>1/2$ 是所有非平凡零点实部的上界。仍取 $p=\beta-1/2>0$ 和同一轨道闭包 $H$。设实数左端点 $A(B)$ 对所有充分大的 $B$ 满足 $2\le A(B)\le B$，且 $\ln(B/A(B))\to+\infty$。$N(A(B),B)/B^p$ 的簇集为
$$
\left\{I_\infty(h):h\in H\right\},\qquad
I_\infty(h)=\int_0^\infty e^{-ps}\max(-F_h(-s),0)\,ds .
$$
其中包括 $A(B)=2$，也允许 $A(B)$ 随 $B$ 非连续或非单调地变化。
:::

固定 $L\ge0$。当 $B$ 充分大，窗口包含 $[Be^{-L},B]$。存在充分大的 $X\ge2$，使负部密度在 $[X,\infty)$ 上由 $Cx^{p-1}$ 控制。在 $\max(A(B),X)$ 处分开 $Be^{-L}$ 左侧的部分，归一化后的贡献至多为 $N(2,X)/B^p+(C/p)e^{-pL}$。相位积分在 $L$ 之后的尾部至多为 $(S/p)e^{-pL}$，其中 $S=\sum_k |1/(\rho_k(1-\rho_k))|$。前一个估计对允许的左端点一致成立，后一个对相位一致成立。先选 $L$，再令 $B$ 增长，便得到由 $\ln B$ 处实际相位给出的近似，与固定宽度情形相同。有限宽度相位积分的一致收敛给出 $I_\infty$ 的连续性。轨道闭包紧且连通，故簇集是紧区间。当实部为 $\beta$ 的直线没有零点时，相位积分恒为零，归一化质量趋于零。

::: {.theorem #thm-ch31-growing-prime-tail-error title="同一右端点下的统一误差界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthCluster.prime_tail_window_extent_bound_of_upper_bound"}
仍设 $\beta>1/2$ 是所有非平凡零点实部的上界。存在依赖于 $\beta$ 的 $K\ge0$，使对每个 $\varepsilon>0$，当 $B$ 充分大时，所有 $a\in[2,B]$ 都满足
$$
\left|\frac{N(a,B)}{B^p}-I_\infty(\phi(\ln B))\right|
\le \varepsilon+K(a/B)^p .
$$
有符号误差 $N(a,B)/B^p-I_\infty(\phi(\ln B))$ 也至多为 $\varepsilon$。
:::

先与从 $2$ 开始的累积质量比较。移去 $[2,a]$ 时，质量减少 $N(2,a)$。沿用早期区间的固定积分与后期的幂函数界，可得 $N(2,a)\le Ka^p$。因此幂函数项控制移动左端点损失的质量，$\varepsilon$ 来自累积质量的相位近似。省略质量的误差随对数宽度指数衰减。移去的质量非负，所以有符号误差的上界没有幂函数项。

**两条谱线在临界窗口的共同触点。** 设某个非平凡零点取到最大实部 $\beta>1/2$，并设 $1/2<\gamma<\beta$，使所有实部小于 $\beta$ 的非平凡零点的实部都至多为 $\gamma$。用 $F_{\alpha,h}(u)$ 表示把上文相位级数的系数限制到实部为 $\alpha$ 的直线后得到的曲线。两条曲线都使用同一个 $h\in H$。先从完整零点级数中精确扣除 $\beta$ 线，再在 $\gamma$ 尺度归一化，得到
$$
e^{(1-\gamma)u}Q_\vartheta(e^u)=
e^{(\beta-\gamma)u}F_{\beta,\phi(u)}(0)
 +F_{\gamma,\phi(u)}(0)+o(1).
$$
余项在每个固定宽度的晚期窗口上一致趋于零。 [两条谱线的归一化展开](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalTwoLines.prime_tail_two_line_approx)。扣除后，实部低于 $\gamma$ 的每个项趋于零，系数模的可和性控制它们的总和。平方根尺度的素数幂修正在 $\gamma$ 尺度趋于零。

临界宽度 $W_*$ 的触点是 $h\in H$ 与 $s\in[0,W_*]$，满足 $F_{\beta,h}(-s)=0$，且 $F_{\beta,h}(-v)\ge0$ 对每个 $v\in[0,W_*]$ 成立。若每个这样的触点都满足 $F_{\gamma,h}(-s)<0$，则存在 $c>0$，使对每个充分大的 $t$，区间 $[t-W_*,t]$ 中都有某个 $u$ 满足 $e^{(1-\gamma)u}Q_\vartheta(e^u)\le-c$。连续性随即给出实际窗口负部质量严格为正。

这个判据允许只检查一部分触点。设 $K$ 是 $H\times[0,W_*]$ 中的紧集，每个 $(h,s)\in K$ 的 $s$ 都是最高谱线在该窗口的最低点，且每个 $h\in H$ 至少对应 $K$ 中一个最低点。只需在 $K$ 中满足 $F_{\beta,h}(-s)=0$ 的点检查 $F_{\gamma,h}(-s)<0$。取 $K$ 为全体最低点组成的紧集，就得到上面的判据。 [临界窗口的共同触点判据](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalTwoLines.prime_tail_negative_windows_of_two_line_contact)。

每个相位下，最高谱线在窗口内的最小值至多为零。否则，左端的严格正性允许把窗口拓宽，产生与临界宽度定理冲突的零簇值。在 $K$ 上，$F_\beta$ 或 $F_\gamma$ 至少一个严格为负，所以二者较小值的最大值严格为负。当最高谱线有这份负余量时，增长因子压过次高谱线的有界贡献。当次高谱线给出负余量时，最高谱线仍非正。于是同一相位的同一个窗口内存在所需的负点。若精确零质量的临界窗口任意晚地出现，则至少有一个共同触点满足 $F_\gamma\ge0$。两条谱线的实部条件及共同触点的符号条件在这里仍是前提。


::: {.theorem #thm-ch31-prime-window-spectral-error title="谱隙下的统一窗口误差" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthRate.prime_tail_window_error_of_lower_spectral_bound"}
设 $\beta>1/2$ 是非平凡零点实部的上界，并设 $1/2\le\gamma<\beta$，使所有实部小于 $\beta$ 的零点都满足 $\operatorname{Re}\rho\le\gamma$。仍取 $p=\beta-1/2$，并记
$$
E(a,B)=\frac{N(a,B)}{B^p}-I_\infty(\phi(\ln B)).
$$
存在 $K>0$，对所有 $2\le a\le B$ 有
$$
|E(a,B)|\le K\left[(a/B)^p+
\begin{cases}
\dfrac{B^{\gamma-1/2}-a^{\gamma-1/2}}{B^p},&\gamma>1/2,\\
B^{-p}\ln(B/a),&\gamma=1/2.
\end{cases}\right]
$$
:::

::: proof
扣除 $\beta$ 线后，零点项的绝对可和性把负部积分的误差密度控制为常数倍的 $x^{\gamma-3/2}$。取负部的映射是 $1$-Lipschitz，平方根尺度的素数幂修正也可由同一个幂函数控制。在 $[a,B]$ 上积分时保留两个端点。$\gamma>1/2$ 给出幂差，$\gamma=1/2$ 给出对数。两个谱误差项都在 $a=B$ 时为零。无限相位积分在 $\ln(B/a)$ 之后的尾部给出 $(a/B)^p$ 项。 完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-prime-window-cumulative-log-error title="临界谱隙下累积误差的对数阶" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthRate.prime_tail_cumulative_error_log_order"}
若某个非平凡零点取到最大实部 $\beta>1/2$，且所有实部更小的零点都在临界线或其左侧，则存在 $c,C>0$，对所有充分大的 $B$ 有
$$
c\ln B\le N(2,B)-B^p I_\infty(\phi(\ln B))\le C\ln B .
$$
:::

::: proof
平方根尺度上的有符号余项最终有严格负的上界。因而当最高谱线的曲线为非正时，实际负部比相位模型至少多出一个固定的平方根尺度余量。取任意固定宽度 $W>W_*$，该宽度的相位负部质量在紧相位闭包上有严格正的最小值。曲线有界，因此每个长度为 $W$ 的对数窗口都贡献一份统一为正的误差。拼接相邻窗口便得到下界，初始有限区间与无限相位尾部只改变一个有界项。对数阶成立于上述谱隙条件，精确的对数系数仍待确定。 完整证明由 Lean 内核检查。
:::

- **经典的 von Mangoldt–Weil 点态中点显式公式（`文献结果，未在本书形式化`：von Mangoldt, 1895；Weil, 1952）**：记切比雪夫素数幂阶梯函数为 $\psi(x) := \sum_{n \le x}\Lambda(n) = \sum_{p^m \le x}\ln p = \ln\operatorname{lcm}(1, 2, \dots, \lfloor x\rfloor)$，并在整数跃迁点处取左右极限算术平均定义吉布斯（Gibbs）中点阶梯 $\psi_0(x) := \frac{1}{2}\bigl(\psi(x^+) + \psi(x^-)\bigr) = \psi(x) - \frac{1}{2}\Lambda(x)$（当 $x \in \mathbb{N}_{\ge 2}$ 为素数幂 $p^m$ 时减去半阶跃 $\frac{1}{2}\ln p$，为无素数幂合数时 $\Lambda(x) = 0$ 故 $\psi_0(x) = \psi(x)$），则对一切 $x > 1$，对称截断极限给出：

  $$
  \psi_0(x) \;=\; x \;-\; \lim_{T \to \infty}\sum_{\lvert\operatorname{Im}\rho\rvert < T} \frac{x^{\rho}}{\rho} \;-\; \ln(2\pi) \;-\; \frac{1}{2}\ln\bigl(1 - x^{-2}\bigr) \qquad (x > 1).
  $$

在已知严格位于临界线 $\operatorname{Re}(\rho) = \frac{1}{2}$ 上的前 $K$ 对共轭真实零点 $\rho_{\pm k} = \frac{1}{2} \pm i\gamma_k$（$1 \le k \le K$）处做有限谱重构时，右端零点和显式化为 $K$ 列对数空间驻波谐波的实部叠加（`手工推导`）：

$$
\begin{aligned}
\psi_{0, K}(x)
&\;:=\; x \;-\; 2\sum_{k=1}^{K} \operatorname{Re}\!\left(\frac{x^{\frac{1}{2} + i\gamma_k}}{\frac{1}{2} + i\gamma_k}\right) \;-\; \ln(2\pi) \;-\; \frac{1}{2}\ln\bigl(1 - x^{-2}\bigr) \\
&\;=\; x \;-\; 2x^{1/2}\sum_{k=1}^{K} \frac{\frac{1}{2}\cos(\gamma_k\ln x) + \gamma_k\sin(\gamma_k\ln x)}{\frac{1}{4} + \gamma_k^2} \;-\; \ln(2\pi) \;-\; \frac{1}{2}\ln\bigl(1 - x^{-2}\bigr).
\end{aligned}
$$

请细细品味这组公式背后的双向雕刻奇观：单独拎出任何一对零点 $\frac{1}{2} \pm i\gamma_k$，它在整个正半轴上只不过是一列处处光滑起伏的半密度对数余弦—正弦波，哪有一丝一毫“离散整数或素数判别”的棱角？然而当你把 $K = 5$、$K = 20$、$K = 50$ 乃至成千上万对零点的驻波叠加起来时，它们在 $x = 6, 10, 12, \dots$ 等普通合数区间内波峰对波谷正负抵消、抹出平坦台阶，唯独在素数与素数幂位置 $x = 2, 3, 4 = 2^2, 5, 7, 8 = 2^3, 9 = 3^2, 11, 13, \dots$ 上同相锁死，刀削斧劈般拉起垂直跃升的素数幂阶梯！

::: {.example #ex-ch34-weil-prime-staircase-reconstruction title="零点驻波雕刻素数阶梯：切比雪夫函数 $\psi(x)$、中点目标值 $\psi_0(x)$ 与 $K = 5, 20, 50$ 对零点谱重构精确算例"}
在 100 位工作精度下对整数刻度 $x \in \{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13\}$ 逐点计算精确阶梯值 $\psi(x) = \ln\operatorname{lcm}(1, \dots, x)$、中点显式公式目标值 $\psi_0(x) = \psi(x) - \frac{1}{2}\Lambda(x)$，以及分别叠加前 $K = 5$、$K = 20$ 与 $K = 50$ 对临界线共轭零点 $\frac{1}{2} \pm i\gamma_k$ 所得的驻波重构值 $\psi_{0, K}(x)$，四舍五入至小数点后六位对照如下（`手工推导` / `NUM`）：

| 刻度 $x$ | 精确符号值 $\psi(x)$ | 阶梯全值 $\psi(x)$ | 中点真值 $\psi_0(x)$ | $K = 5$ 重构 $\psi_{0,5}(x)$ | $K = 20$ 重构 $\psi_{0,20}(x)$ | $K = 50$ 重构 $\psi_{0,50}(x)$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$2$** | $\ln 2$ | $0.693147$ | $0.346574$ | $0.370087$ | $0.331858$ | $0.359332$ |
| **$3$** | $\ln 6$ | $1.791759$ | $1.242453$ | $1.240233$ | $1.207704$ | $1.236060$ |
| **$4$** | $\ln 12$ | $2.484907$ | $2.138333$ | $2.172732$ | $2.162383$ | $2.162495$ |
| **$5$** | $\ln 60$ | $4.094345$ | $3.289626$ | $3.264668$ | $3.326996$ | $3.289860$ |
| **$6$** | $\ln 60$ | $4.094345$ | $4.094345$ | $4.006066$ | $4.113273$ | $4.062410$ |
| **$7$** | $\ln 420$ | $6.040255$ | $5.067300$ | $4.923719$ | $5.044654$ | $5.071181$ |
| **$8$** | $\ln 840$ | $6.733402$ | $6.386828$ | $6.396516$ | $6.435392$ | $6.345021$ |
| **$9$** | $\ln 2520$ | $7.832014$ | $7.282708$ | $7.493937$ | $7.209355$ | $7.256965$ |
| **$10$** | $\ln 2520$ | $7.832014$ | $7.832014$ | $7.571751$ | $7.904979$ | $7.880802$ |
| **$11$** | $\ln 27720$ | $10.229909$ | $9.030962$ | $9.147872$ | $9.111861$ | $9.065247$ |
| **$13$** | $\ln 360360$ | $12.794859$ | $11.512384$ | $11.381487$ | $11.466362$ | $11.500926$ |

表中三组特征现象把显式公式的傅里叶几何刻画得一目了然：

1. **跃迁中点锁相**：在素数（$x = 2, 3, 5, 7, 11, 13$）与高次素数幂（$x = 4 = 2^2,\; 8 = 2^3,\; 9 = 3^2$）处，零点谐波和并非收敛向台阶上沿 $\psi(x)$，而是按傅里叶级数狄利克雷中点收敛律精准穿过跳变中点 $\psi_0(x) = \psi(x) - \frac{1}{2}\ln p$——例如在 $x = 5$ 处，仅用 $K = 50$ 对零点就给出 $\psi_{0,50}(5) \approx 3.289860$，距精确中点 $\psi_0(5) = \ln 60 - \frac{1}{2}\ln 5 \approx 3.289626$ 误差仅 $2.35\times 10^{-4}$；在 $x = 7$ 与 $x = 13$ 处误差亦分别收敛至 $3.88\times 10^{-3}$ 与 $1.15\times 10^{-2}$！
2. **非素数幂合数平台消平**：在 $x = 6 = 2\times 3$ 与 $x = 10 = 2\times 5$ 处，冯·芒戈尔特权重 $\Lambda(6) = \Lambda(10) = 0$（因为跨越两根互异素数轴的复合路径不贡献单轴对数新跃迁），故 $\psi(x) = \psi_0(x)$，光滑零点波在此自动异相抵消，压平出 $\ln 60 \approx 4.094345$ 与 $\ln 2520 \approx 7.832014$ 两段水平平台。
3. **素数阶梯与零点驻波的双向互生**：素数极小圆弧体的无穷复合路径积分凝结出了零点谱，而零点谱驻波反向叠加又将全体素数与素数幂从连续实轴中分毫不差地雕刻出来！
:::

下面的第四张实验卡将 [@ex-ch34-weil-prime-staircase-reconstruction] 的双向对偶搬上交互舞台，让你亲手滑动零点对截断数 $K$，目睹平滑谐波如何一步步咬合耸立为锐利的素数阶梯：

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="weil-explicit-prime-staircase" height="520"}
**韦伊显式对偶：临界线零点驻波曲面雕刻切比雪夫素数阶梯实验卡（`weil-explicit-prime-staircase`）。** 推进谱截止频率 $t$ 或调节零点对上限 $K \in [5, 50]$（预设停在 $t = 145 > \gamma_{50}$ 叠满 $50$ 对零点，点按播放可从 $t = 0$ 重演逐层生长；琥珀色标出最前排当前重构剖面 $K(t)$ 与可拖动读数点手柄 $x^*$）：后缘主项斜坡逐行累加驻波谐波 $-2\operatorname{Re}(x^{\rho_k}/\rho_k)$ 铺成紫色三维部分和曲面，最前排琥珀色剖面在 $x = 6, 10, 12$ 等合数处异相抵消压平，而在 $x = 2, 3, 4, 5, 7, 8, 9, 11, 13$ 处陡升紧贴青色精确中点阶梯 $\psi_0(x)$，前方地面上品红色零点驻波残差同步逼近青色锯齿，条带小图逐整数对比青色精确阶跃 $\Lambda(n)$ 与紫色重建升高（绿色 `LEAN ✓` 标出 `actual_integrated_explicit_formula`）。
:::

## 31.1.4 文献脉络与认识论边界审计，及向 §31.2 算术枢轴隧穿的交棒 {#sec-ch34-28-4}

在进入完整三维交互沙盘并向下一节交棒之前，我们将本节横跨解析数论、量子统计物理、半经典量子混沌与 Lean 内核形式化定理的五重认识论边界逐条归档：

::: {.remark #rem-ch34-riemann-path-integral-literature title="黎曼路径积分、素数气体、半经典迹公式与显式对偶的文献脉络及五层认识论边界审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 以下五项分别列出本节涉及的定理、文献、计算、几何模型与尚待实现的谱构造。

1. **Lean 4 内核形式化定理（[@thm-ch34-riemann-prime-arc-bridge] 及 [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 锚点）**：素数对数在 $\mathbb{Q}$ 上的线性无关性（`prime_log_rational_independence`）、严格半平面 `1 < s.re` 上的欧拉—狄利克雷恒等式（`riemann_zeta_dirichlet_sum_eq_euler_product`）、完备读数的整函数反射对称与共轭协变（`xi_reading_reflection`、`xi_reading_one_sub_conj`）、证明全对称整函数可拥有离线四元组零点 $\{\frac{1}{2}\pm\delta\pm i\gamma\}$ 的四次反例（`full_symmetry_not_fixed_line_localization`，$\delta \neq 0,\; \gamma \neq 0$）、严格正实轴 `0 < y` 上的无条件积分显式公式（`actual_integrated_explicit_formula`）、半平面 `0 < s.re` 且 $s \neq 1$ 上的交错狄利克雷部分和延拓（`tendsto_alternating_partialSums_eta_of_ne_one`），以及秩一测量玻恩模平方配对权重（`rank_one_born_pairing_weight`），均已由本书所钉 `trureturing` 仓库在 Lean 内核中完整检核。
2. **经典解析数论、量子统计与量子混沌文献定理（已有严格文献证明或理论体系，未以连续统形式在本书形式化）**：$\zeta(s)$ 的解析延拓、圆周 $\vartheta$ 函数泊松求和推导函数方程及临界线猜想始自 B. Riemann（*Monatsber. Königl. Preuss. Akad. Wiss. Berlin*, 671–680, 1859）；素数幂切比雪夫阶梯 $\psi_0(x)$ 的点态对称截断显式公式及其局部群傅里叶对偶推广由 H. von Mangoldt（*J. Reine Angew. Math.* **114**, 255–305, 1895）与 A. Weil（*Medd. Lunds Univ. Mat. Sem.*, Tome Supplémentaire, 252–265, 1952）奠定；黎曼猜想与莫比乌斯和平方根界 $M(x) = \mathcal{O}_\varepsilon(x^{1/2+\varepsilon})$ 的等价性由 J. E. Littlewood（*C. R. Acad. Sci. Paris* **154**, 263–266, 1912）证出；满足黎曼型函数方程但无欧拉乘积且具离线零点的狄利克雷级数反例由 H. Davenport 与 H. Heilbronn（*J. London Math. Soc.* **11**, 181–185 & 307–312, 1936）构造；双曲曲面闭合测地线迹公式与半经典周期轨道稳定性幅值因子 $\lvert\det(I - M_p)\rvert^{-1/2} \sim e^{-L_p/2}$ 由 A. Selberg（*J. Indian Math. Soc.* **20**, 47–87, 1956）与 M. C. Gutzwiller（*J. Math. Phys.* **12**, 343–358, 1971）建立，标度流哈密顿量 $\hat{H} = \frac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$ 的半经典黎曼谱纲领由 M. V. Berry 与 J. P. Keating（*SIAM Rev.* **41**, 236–266, 1999）系统阐述；将 $\zeta(\beta)$ 解释为对数能谱 $E_p = \ln p$ 的自由玻色“素数气体”与非交换量子统计配分函数（伴随 $\beta = 1$ 自发对称破缺相变）由 B. Julia（*Number Theory and Physics*, Springer Proc. Phys. **47**, 276–293, 1990）与 J.-B. Bost & A. Connes（*Selecta Math. (N.S.)* **1**, 411–457, 1995）创立；几何量子化中的半密度（$\frac{1}{2}$-density）内积框架见 B. Kostant（*Lecture Notes in Math.* **170**, 1970）与 J.-M. Souriau（*Structure des systèmes dynamiques*, Dunod, 1970）。
3. **代数手算与百位精度基准（`手工推导` / `NUM`）**：单枚素数正逆双臂干涉仪下界 $\lvert p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}\rvert \ge \lvert p^{-\sigma} - p^{-(1-\sigma)}\rvert$、由反射与共轭协变导出临界线虚部恒零 $\operatorname{Im}\operatorname{xiReading}(\frac{1}{2}+it) = 0$，以及 [@ex-ch34-critical-zeros-and-dual-shells] 与 [@ex-ch34-weil-prime-staircase-reconstruction] 中的全部数值表格，均属初等严格手算与 100 位有效数字独立核算结果。
4. **极小圆弧体与概念塔统一诠释模型（`MODEL`）**：将素数 $p$ 视为正交极小圆弧体 $\Delta\mathcal{T}_p$、自然数对数 $\ln n$ 视为复合路径作用量、莫比乌斯符号 $\mu(n)$ 视为克利福德外积 $\Lambda^k$ 泡利不相容手性签名，并在 `1—3—3—1` 概念塔中把 $\sigma = \frac{1}{2}$ 诠释为观察者往返双投影半密度幺正脊线，属于本书提出的统一几何物理模型。
5. **开放的谱构造（`OPEN`）**。Hilbert–Pólya / Berry–Keating 路线仍需构造自伴算子，并证明其谱精确给出黎曼非平凡零点的纵坐标。黎曼猜想本身的外部形式证明及独立核验见 [§39.2.2](ch39-s25-axiom-omega-five-tier-deduction-cascade.md#sec-ch39-25-2)。
:::

现在，请步入下方这座完整交互式《黎曼路径积分与素数极小圆弧体临界线相消沙盘》亲手验证全节脉络：先在临界线 $\sigma = 0.50$ 上依次点按前五颗真实零点胶囊 $\gamma_1$ 至 $\gamma_5$，目睹那条由素数与合数一步步拼接抬升的紫色极小圆弧路径螺旋，如何在每一次抵达 $\gamma_k$ 时都围绕穿过原点靶心 `O` 的琥珀色延拓轴盘旋张开、令琥珀色落点珠分毫不差归零（$\lvert\zeta\rvert = 0.0000$）；随后轻轻拖动琥珀色手柄或“实部 $\sigma$”滑块离开 $0.50$ 哪怕 $0.05$ 或 $0.12$，观察地面上代表正向路径 $p^{-\sigma}$ 的青色壳环与代表逆向对偶路径 $p^{-(1-\sigma)}$ 的品红壳环如何瞬间一缩一胀分道扬镳，将原本严丝合缝归零的琥珀色延拓落点当场弹离原点；最后切入“素数阶梯”场景，看临界线上的零点驻波曲面如何反过来在连续实轴上雕琢出刀削般的青色素数阶梯！

与此同时，这座沙盘也把整部数论最惊心动魄的悬念摆到了我们面前：既然在右侧 $\sigma > 1$ 的欧拉乘积安全区里，每一枚素数极小圆弧体 $\Delta\mathcal{T}_p$ 原本完全乘性解耦、严格无零点且具备天然正定性，为什么过去一百多年的传统解析数论一旦试图把这份正定性推过 $s = 1$ 发散极点山峰去猎杀假想的离线四元组 $\frac{1}{2} \pm \delta \pm i\gamma_0$，就会在按自然数大小 $n = 1, 2, \dots, M$ 排队截断时迎头撞上**算术一维排序壁垒**与**图兰（Turán）芝诺假零点陷阱**，甚至连最强的单级磨光器也卡在 $\vartheta = \frac{4}{7}$ 衰减墙前？把 [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 破除排序壁垒的**局部波前稀疏舒尔枢轴重整**与 [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 潜入 $90^\circ$ 盲区的**内割弦多级共振隧穿**双剑合璧——请翻开下一节 [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)！

::: {.viz src="riemann-prime-arc-path-integral-sandbox" height="640"}
**黎曼路径积分与素数极小圆弧体临界线相消完整交互实验室（`riemann-prime-arc-path-integral-sandbox`）。** 在统一暗色三栏实验台中自由切换全部四张递进实验卡——“欧拉局域绕行、复合路径螺旋与莫比乌斯外积对偶”、“临界线 $\sigma = \frac{1}{2}$ 半密度双壳锁相与零点归零”、“偏离临界线正逆双壳失衡分裂”以及“韦伊显式对偶：零点驻波曲面雕刻素数阶梯”——实时联动实部滑块 $\sigma \in [0.20, 2.00]$、路径数 $N \in [20, 400]$、前五颗真实黎曼零点胶囊 $\gamma_1\text{–}\gamma_5$、莫比乌斯外积对偶开关与显式公式零点对数 $K \in [5, 50]$（紫色绘制自然数复合路径链 $\sum n^{-s}$、欧拉部分乘积、零点驻波部分和曲面与 `ARGUED` 文献依据，青色绘制地面正向壳环 $p^{-\sigma}$ 与精确切比雪夫阶梯 $\psi_0(x)$ 及 $\Lambda(n)$ 阶跃，品红色标示逆向对偶壳环 $p^{-(1-\sigma)}$、莫比乌斯外积链 $\sum\mu(n)n^{-s}$ 与零点驻波残差，琥珀色标出延拓竖轴与落点珠 $\zeta(s)$、当前零点胶囊 $\gamma_k$、最前排重构剖面 $K(t)$ 及交互手柄，红色 `OPEN` 徽章及其配套的 RH 状态文字沿用外部核验公布前的版本，绿色 `LEAN ✓` 标出 [@thm-ch34-riemann-prime-arc-bridge] 的全部七项 `trureturing` 内核定理实例）。
:::
