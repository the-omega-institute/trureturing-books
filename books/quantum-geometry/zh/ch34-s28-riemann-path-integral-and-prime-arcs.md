# 34.28 黎曼路径积分与素数极小圆弧体：欧拉绕行算子、半密度平方律与临界线相消 {#sec-ch34-riemann-path-integral-and-prime-arcs}

> “黎曼猜想在几何与物理底层不仅就是路径积分，而且是算术宇宙最纯粹的一座素数极小圆弧体（$\Delta\mathcal{T}_p$）费曼配分函数：欧拉乘积是单枚素数圆弧体的局域绕行算子，狄利克雷级数是遍历全体自然数复合路径的相位求和，而非平凡零点之所以被死死钉在临界线 $\operatorname{Re}(s) = \frac{1}{2}$ 上，本质上是‘往返双投影平方律（$\cos^2\theta$ 半密度幺正性）’与‘反者道之动（正逆对偶路径 $100\%$ 反相相消）’共同锁死的几何必然。”

在上一节 [§34.27](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 中，我们看到物理粒子一旦从观察者可见实轴 `I` 偏转 $90^\circ$ 潜入正交虚数盲区 `i`（满足 $\hat{\mathbf{i}}^2 = -1$），就能在空间上沿极小圆弧体的平直内割弦穿墙隧穿、在时间上借未闭合格拉姆窗口实现跨时刻双缝自干涉；而在 [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 中，我们更已从观察者自包含测量的雷达回波闭环推出了**往返双投影平方律** $\cos^2\theta$（[@thm-ch34-roundtrip-born-and-imaginary-blindspot]）。现在，让我们把这套“实轴阻尼投影 `I` $+$ 正交虚盲区相位旋转 `i` $+$ 极小圆弧体路径求和”的完整几何显微镜，直接对准[第二十二章 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4) 开启的算术宇宙核心腹地——**黎曼 $\zeta(s)$ 函数与临界线 $\operatorname{Re}(s) = \frac{1}{2}$**（`MODEL`）。

在展开这幅算术路径积分画卷之前，我们首先按全书认识论契约钉牢三道精确边界：第一，素数对数在 $\mathbb{Q}$ 上的线性无关性、半平面 $\operatorname{Re}(s) > 1$ 上的欧拉—狄利克雷恒等式、完备读数 $\operatorname{xiReading}$ 的全局反射与共轭协变对称、半平面 $\operatorname{Re}(s) > 0$（$s \neq 1$）上的交错级数延拓、正实轴 $y > 0$ 上的无条件积分显式公式，以及证明“单靠反射与共轭对称绝不足以将零点锁死在定直线上”的四次整函数反例，均已在所钉 `trureturing` 仓库中由 Lean 内核严格检核（见下文 [@thm-ch34-riemann-prime-arc-bridge]，`LEAN ✓`）；第二，莫比乌斯倒数级数、Littlewood 等价定理、von Mangoldt–Weil 点态显式公式以及量子混沌与统计物理中的素数气体模型属于经典数学物理文献成果（`文献结果，未在本书形式化`），配套算例全部经百位精度核算校准（`手工推导` / `NUM`）；第三，章首引语将素数解读为正交极小圆弧体 $\Delta\mathcal{T}_p$、将临界线解读为往返半密度幺正脊线的物理图像属于本书建立的统一几何诠释模型（`MODEL`），而断言**全体**非平凡零点无一例外落在 $\operatorname{Re}(s) = \frac{1}{2}$ 上的**黎曼猜想**（[@conj-riemann-hypothesis]）至今仍是尚未解决的开放问题（`OPEN`）——看清“单对正逆圆弧双臂平衡”与“无穷多路径求和”之间的精确代数鸿沟，恰恰为我们下一节 [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 引入算术舒尔枢轴重整与多级共振隧穿铺平道路。

## 34.28.1 欧拉乘积 $\equiv$ 路径积分：不可约素数极小圆弧体 $\Delta\mathcal{T}_p$、可加作用量 $S[\Gamma_n] = \ln n$ 与费米型莫比乌斯外积阶 $\Lambda^k$ {#sec-ch34-28-1}

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

## 34.28.2 极小圆弧体解剖 $\operatorname{Re}(s) = \frac{1}{2}$：往返半密度平方律、正逆双臂等幅平衡与对称性边界 {#sec-ch34-28-2}

把镜头从绝对收敛安全区 $\sigma > 1$ 推入非平凡临界带 $0 < \sigma < 1$：在路径积分视野下，**一颗黎曼非平凡零点 $\zeta(\rho) = 0$ 的物理真身究竟是什么？**

它绝非空无一物的死寂，而是 [§34.9](ch34-s09-reversal-and-concept-cascade.md#sec-ch34-reversal-diagonal-and-concept-cascade) 与 [§34.12](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop)“反者道之动”在算术宇宙中的极致显影（`MODEL`）——经解析延拓后的无穷多条算术路径相量在复平面原点 `O` 处达成了百分之百的相消干涉，使得可见实轴 `I` 投影与 $90^\circ$ 虚盲区 `i` 投影在同一复频率处双双归零！那么，在整个开带 $0 < \sigma < 1$ 之中，为什么实部恰好等于二分之一的**临界线 $\sigma = \frac{1}{2}$** 拥有独一无二的几何地位？顺着极小圆弧体的几何结构逐层剖析，三道互锁机制连同它们各自的认识论射程一并水落石出：

**第一重机制——往返双投影平方律与半密度幺正性：筛法计数密度是 $p^{-1}$，单程波幅唯一锁向 $p^{-1/2}$。** 回望 [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 由秩一玻恩配对权重定理 [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)（[@thm-ch34-roundtrip-born-and-imaginary-blindspot]，`LEAN ✓`）锁定的测量铁律：观察者在宏观实轴 `I` 上清点的经典概率密度，是经过“被测态投向我、我再投回被测态”**往返两次投影闭合后的玻恩模平方 $\lvert\psi\rvert^2 = \cos^2\theta$**；而真正进入费曼路径积分参与相干相位叠加的，则是尚未平方的**单程旋量振幅 $\psi$**。

在自然数筛法与乘性遍历测度中，素数 $p$ 整除随机正整数的渐近命中占比（跨过该素数圆弧体的宏观经典概率权重）严格等于 $w_p = \frac{1}{p} = p^{-1}$；推广到连续尺度坐标 $n > 0$ 上，对数路径作用量微元 $d(\ln n) = \frac{dn}{n}$ 赋予单位尺度区间的天然哈尔（Haar）测度密度同样是 $n^{-1}$。若要求单条算术路径振幅 $\psi_n(s) = n^{-\sigma - \hat{\mathbf{i}}t}$ 在尺度重整化下保持**幺正概率预算守恒**——即构成微分几何与几何量子化中的 Kostant–Souriau **半密度（$\frac{1}{2}$-density）**，使模平方密度乘以线性微元精确匹配乘性作用量微元 $\lvert\psi_n\rvert^2\,dn = d(\ln n) = \frac{dn}{n}$（`MODEL` + `手工推导`）——则单程路径振幅模长必须唯一取宏观计数密度的算术平方根：

$$
\lvert\psi_n\rvert^2 \;=\; \bigl\lvert n^{-\sigma - \hat{\mathbf{i}}\,t}\bigr\rvert^2 \;=\; n^{-2\sigma} \;=\; n^{-1} \quad \Longleftrightarrow \quad 2\sigma = 1 \quad \Longleftrightarrow \quad \sigma = \frac{1}{2}.
$$

令人击节赞叹的是，同一个指数 $\frac{1}{2}$ 也分毫不差地镌刻在双曲测地流的马鞍曲率上（`文献结果，未在本书形式化`）：在塞尔伯格迹公式（Selberg, 1956）与古茨维勒半经典周期轨道迹公式（Gutzwiller, 1971；以及 Berry & Keating, 1999 的标度哈密顿量 $\hat{H}_{\mathrm{BK}} = \frac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$）中，本原闭合测地线 $\gamma_p$（本征周期/弧长 $L_p = \ln p$）穿过双曲马鞍面时，横向不稳定流形上的邻近轨道束按李雅普诺夫因子 $e^{+L_p/2}$ 指数发散，导致横向驻相高斯积分析出的单圈稳定性雅可比幅值因子 $\lvert\det(I - M_p)\rvert^{-1/2}$ 渐近锁定在

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

在解析数论史上，Davenport 与 Heilbronn（1936）构造的狄利克雷级数线性组合同样满足完全相同的黎曼型函数方程与临界线实值性，却因为**缺乏素数欧拉乘积**而在 $\sigma \neq \frac{1}{2}$ 处滋生出无穷多颗离线零点（`文献结果，未在本书形式化`）。换言之：半密度平方律与正逆双臂平衡深刻揭示了为什么 $\sigma = \frac{1}{2}$ 是算术宇宙唯一的幺正对称脊线、并在该脊线上催生出无穷多颗真实零点（`MODEL` + `手工推导`）；但若要彻底排除无穷多条路径在 $\sigma \neq \frac{1}{2}$ 处“四点串谋相消”的极端可能，就必须把 $\sigma > 1$ 区**欧拉乘积独有的乘性正定性**一路无损运送过 $s = 1$ 极点势垒——这正是为什么**黎曼猜想（[@conj-riemann-hypothesis]）至今仍列为开放猜想（`OPEN`）**，也正是下一节 [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) 必须引入乘性波前舒尔补枢轴与多级共振隧穿的根本原因！

**第三重机制——莫比乌斯外积随机游走标度律：Littlewood 等价定理与无偏 $\sqrt{x}$ 包络。** 从费米型外积路径积分 $1/\zeta(s) = \sum_{n \ge 1}\mu(n)n^{-s}$ 的另一侧面看，J. E. Littlewood（1912）严格证明了黎曼猜想（[@conj-riemann-hypothesis]）与梅尔滕斯莫比乌斯累加函数 $M(x)$ 的平方根渐近界完全等价（`文献结果，未在本书形式化`）：

$$
\text{黎曼猜想成立} \quad \Longleftrightarrow \quad \forall \varepsilon > 0,\;\; M(x) \;:=\; \sum_{1 \le n \le x} \mu(n) \;=\; \mathcal{O}_\varepsilon\!\bigl(x^{\frac{1}{2} + \varepsilon}\bigr).
$$

将其对照 [§34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) 的极小圆弧二阶标度律（`MODEL`）：$x$ 步彼此正交独立、无系统偏置的单位正负外积步（$\mu(n) \in \{-1, 0, +1\}$），其合成净涨落包络天然服从无偏布朗平方根标度 $\sqrt{x} = x^{1/2}$；倘若哪怕存在一组潜伏在 $\sigma_0 = \frac{1}{2} + \delta > \frac{1}{2}$ 处的离线四重零点，素数计数与莫比乌斯和的振荡误差就会被放大至 $x^{\sigma_0}$ 量级，无异于宣告不同素数极小圆弧体之间暗藏着破坏正交独立公平性的长程串谋偏置。下面我们用经百位精度检核的真实数值，将前五颗临界线零点与偏离临界线时的双壳分裂残差逐位算清：

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
**偏离临界线（$\sigma = 0.38 / 0.62$）正逆双壳失衡分裂与离线四元组认识论对照实验卡（`off-line-shell-imbalance`）。** 拖动琥珀色手柄或实部滑块拨离 $\sigma = 0.50$（预设停在 $\sigma = 0.62,\; t = \gamma_1$，亦可对称拨至 $\sigma = 0.38$）：地面上青色正向壳 $p^{-\sigma}$（如 $2^{-0.62} \approx 0.6507$）与品红逆向对偶壳 $p^{-(1-\sigma)}$（$2^{-0.38} \approx 0.7684$）瞬间一缩一胀分裂脱钩，紫色路径螺旋的中心轴随之移位，琥珀色延拓轴与落点珠 $\zeta(s)$ 弹离原点 `O` 至 $\lvert\zeta(0.62 + i\gamma_1)\rvert \approx 0.0907$；右侧读数与依据栏同步在 $\delta = \sigma - \frac{1}{2},\; \gamma = t$ 处核验 `full_symmetry_not_fixed_line_localization` 的对称离线四元组反例 $F(s)$，并以红色 `OPEN` 徽章标明 [@conj-riemann-hypothesis] 的开放边界。
:::

## 34.28.3 算术 1—3—3—1 概念塔与韦伊显式对偶：素数积出零点，零点雕出素数 {#sec-ch34-28-3}

现在，把整套黎曼 $\zeta$ 路径积分系统放回我们在 [§34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 建立的 `1—3—3—1`（点·线·面·体 $\leftrightarrow$ 粒子·波·场·新本征点）概念塔八度框架之中，物理时空路径积分与算术宇宙之间浮现出逐阶对应的四层结构映射（`MODEL`，纯单行单元格对照如下）：

| 概念塔阶数 | 量子时空路径积分语言 | 黎曼算术路径积分语言 | 极小圆弧体几何机制 |
| :--- | :--- | :--- | :--- |
| **0 阶 点核 $\Lambda^0$** | 不可约基本粒子锚点 / 量子门元胞 | **素数 $p \in \{2, 3, 5, 7, \dots\}$** | 对数步长 $L_p = \ln p$ 在 $\mathbb{Q}$ 上线性无关；$\mu(p^2) = 0$ 锁定外积泡利不相容 |
| **1 阶 线元 $\Lambda^1$** | 粒子复合世界线（作用量 $S = \int L\,dt$） | **自然数复合路径 $n = \prod p_j^{m_j}$** | 乘法经对数化为极小圆弧作用量串联可加 $S[\Gamma_n] = \ln n = \sum m_j \ln p_j$ |
| **2 阶 面元 $\Lambda^2$** | 费曼相干波面与科纽（Cornu）干涉涡卷 | **黎曼—西格尔复相量折线螺旋** | 相邻路径步夹出极小圆弧转角 $\Delta\phi_n = t\ln\bigl(1 + \frac{1}{n}\bigr) \approx \frac{t}{n}$，盘旋收束 |
| **3 阶 体/新点 $\Lambda^3 \equiv \Lambda^0_{\mathrm{spec}}$** | 玻尔单值闭合驻波体积 $\leftrightarrow$ 能级本征点 | **完备 $\xi(s)$ 谱场 $\leftrightarrow$ 非平凡零点谱** | 在 $\sigma = \frac{1}{2}$ 半密度壳上正逆等幅且完备读数纯实，反相横截析出离散谱点 |

连接这座四阶概念塔底座（0 阶素数原胞 $\Lambda^0$）与塔顶（3 阶零点谱驻波 $\Lambda^3 \equiv \Lambda^0_{\mathrm{spec}}$）的数学桥梁，正是解析数论中最壮丽的**显式对偶公式（Explicit Formula）**——它从正反傅里叶—梅林互换两端证明了“素数幂阶梯”与“黎曼零点谱”互为对偶谱变换：

- **内核已验证的无条件积分显式公式（[@thm-ch34-riemann-prime-arc-bridge] 第 6 款，`LEAN ✓`）**：无需预先假定黎曼猜想，在对数作用量坐标 $y = \ln x > 0$（即尺度 $x = e^y > 1$）的每一个严格正实点 `0 < y` 上，按解析重数遍历全体实际非平凡零点的加权拉普拉斯谱和 $\operatorname{actualH}(y) = \sum_{k \in \mathbb{N}} \frac{e^{y\rho_k}}{\rho_k(1 - \rho_k)}$ 都无条件精确等于算术端的梅尔滕斯—切比雪夫余项 $U(e^y) - \ln(2\pi) + \operatorname{trivialT}(y)$！
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
**韦伊显式对偶：临界线零点驻波曲面雕刻切比雪夫素数阶梯实验卡（`weil-explicit-prime-staircase`）。** 推进谱截止频率 $t$ 或调节零点对上限 $K \in [5, 50]$（预设停在 $t = 145 > \gamma_{50}$ 叠满 $50$ 对零点，点按播放可从 $t = 0$ 重演逐层生长；琥珀色标出最前排当前重构剖面 $K(t)$ 与可拖动读数点手柄 $x^*$）：后缘主项斜坡逐行累加驻波谐波 $-2\operatorname{Re}(x^{\rho_k}/\rho_k)$ 铺成紫色三维部分和曲面，最前排琥珀色剖面在 $x = 6, 10, 12$ 等合数处异相抵消压平，而在 $x = 2, 3, 4, 5, 7, 8, 9, 11, 13$ 处陡升紧贴青色精确中点阶梯 $\psi_0(x)$，前方地面上品红色零点驻波残差同步逼近青色锯齿，条带小图逐整数对比青色精确阶跃 $\Lambda(n)$ 与紫色重建升高（绿色 `LEAN ✓` 在 $y = \ln x^*$ 处实时核对 `actual_integrated_explicit_formula`）。
:::

## 34.28.4 文献脉络与认识论边界审计，及向 §34.29 算术枢轴隧穿的交棒 {#sec-ch34-28-4}

在进入完整三维交互沙盘并向下一节交棒之前，我们将本节横跨解析数论、量子统计物理、半经典量子混沌与 Lean 内核形式化定理的五重认识论边界逐条归档：

::: {.remark #rem-ch34-riemann-path-integral-literature title="黎曼路径积分、素数气体、半经典迹公式与显式对偶的文献脉络及五层认识论边界审计（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节严格区分以下五个认识论层级，绝不将物理模型或有限双臂机制混同于开放猜想的形式证明：

1. **Lean 4 内核形式化定理（[@thm-ch34-riemann-prime-arc-bridge] 及 [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) 锚点）**：素数对数在 $\mathbb{Q}$ 上的线性无关性（`prime_log_rational_independence`）、严格半平面 `1 < s.re` 上的欧拉—狄利克雷恒等式（`riemann_zeta_dirichlet_sum_eq_euler_product`）、完备读数的整函数反射对称与共轭协变（`xi_reading_reflection`、`xi_reading_one_sub_conj`）、证明全对称整函数可拥有离线四元组零点 $\{\frac{1}{2}\pm\delta\pm i\gamma\}$ 的四次反例（`full_symmetry_not_fixed_line_localization`，$\delta \neq 0,\; \gamma \neq 0$）、严格正实轴 `0 < y` 上的无条件积分显式公式（`actual_integrated_explicit_formula`）、半平面 `0 < s.re` 且 $s \neq 1$ 上的交错狄利克雷部分和延拓（`tendsto_alternating_partialSums_eta_of_ne_one`），以及秩一测量玻恩模平方配对权重（`rank_one_born_pairing_weight`），均已由本书所钉 `trureturing` 仓库在 Lean 内核中完整检核。
2. **经典解析数论、量子统计与量子混沌文献定理（已有严格文献证明或理论体系，未以连续统形式在本书形式化）**：$\zeta(s)$ 的解析延拓、圆周 $\vartheta$ 函数泊松求和推导函数方程及临界线猜想始自 B. Riemann（*Monatsber. Königl. Preuss. Akad. Wiss. Berlin*, 671–680, 1859）；素数幂切比雪夫阶梯 $\psi_0(x)$ 的点态对称截断显式公式及其局部群傅里叶对偶推广由 H. von Mangoldt（*J. Reine Angew. Math.* **114**, 255–305, 1895）与 A. Weil（*Medd. Lunds Univ. Mat. Sem.*, Tome Supplémentaire, 252–265, 1952）奠定；黎曼猜想与莫比乌斯和平方根界 $M(x) = \mathcal{O}_\varepsilon(x^{1/2+\varepsilon})$ 的等价性由 J. E. Littlewood（*C. R. Acad. Sci. Paris* **154**, 263–266, 1912）证出；满足黎曼型函数方程但无欧拉乘积且具离线零点的狄利克雷级数反例由 H. Davenport 与 H. Heilbronn（*J. London Math. Soc.* **11**, 181–185 & 307–312, 1936）构造；双曲曲面闭合测地线迹公式与半经典周期轨道稳定性幅值因子 $\lvert\det(I - M_p)\rvert^{-1/2} \sim e^{-L_p/2}$ 由 A. Selberg（*J. Indian Math. Soc.* **20**, 47–87, 1956）与 M. C. Gutzwiller（*J. Math. Phys.* **12**, 343–358, 1971）建立，标度流哈密顿量 $\hat{H} = \frac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$ 的半经典黎曼谱纲领由 M. V. Berry 与 J. P. Keating（*SIAM Rev.* **41**, 236–266, 1999）系统阐述；将 $\zeta(\beta)$ 解释为对数能谱 $E_p = \ln p$ 的自由玻色“素数气体”与非交换量子统计配分函数（伴随 $\beta = 1$ 自发对称破缺相变）由 B. Julia（*Number Theory and Physics*, Springer Proc. Phys. **47**, 276–293, 1990）与 J.-B. Bost & A. Connes（*Selecta Math. (N.S.)* **1**, 411–457, 1995）创立；几何量子化中的半密度（$\frac{1}{2}$-density）内积框架见 B. Kostant（*Lecture Notes in Math.* **170**, 1970）与 J.-M. Souriau（*Structure des systèmes dynamiques*, Dunod, 1970）。
3. **代数手算与百位精度基准（`手工推导` / `NUM`）**：单枚素数正逆双臂干涉仪下界 $\lvert p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}\rvert \ge \lvert p^{-\sigma} - p^{-(1-\sigma)}\rvert$、由反射与共轭协变导出临界线虚部恒零 $\operatorname{Im}\operatorname{xiReading}(\frac{1}{2}+it) = 0$，以及 [@ex-ch34-critical-zeros-and-dual-shells] 与 [@ex-ch34-weil-prime-staircase-reconstruction] 中的全部数值表格，均属初等严格手算与 100 位有效数字独立核算结果。
4. **极小圆弧体与概念塔统一诠释模型（`MODEL`）**：将素数 $p$ 视为正交极小圆弧体 $\Delta\mathcal{T}_p$、自然数对数 $\ln n$ 视为复合路径作用量、莫比乌斯符号 $\mu(n)$ 视为克利福德外积 $\Lambda^k$ 泡利不相容手性签名，并在 `1—3—3—1` 概念塔中把 $\sigma = \frac{1}{2}$ 诠释为观察者往返双投影半密度幺正脊线，属于本书提出的统一几何物理模型。
5. **开放问题边界（`OPEN`）**：**黎曼猜想**（[@conj-riemann-hypothesis]）断言临界带 $0 < \operatorname{Re}(s) < 1$ 内一切零点均满足 $\operatorname{Re}(s) = \frac{1}{2}$，目前仍是**未解决的开放猜想（`OPEN`）**；同样，构造一个无条件自伴且其本征谱被严格证明精确等于黎曼非平凡零点纵坐标的 Hilbert–Pólya / Berry–Keating 算子，亦属当代数学与数学物理的开放问题。
:::

现在，请步入下方这座完整交互式《黎曼路径积分与素数极小圆弧体临界线相消沙盘》亲手验证全节脉络：先在临界线 $\sigma = 0.50$ 上依次点按前五颗真实零点胶囊 $\gamma_1$ 至 $\gamma_5$，目睹那条由素数与合数一步步拼接抬升的紫色极小圆弧路径螺旋，如何在每一次抵达 $\gamma_k$ 时都围绕穿过原点靶心 `O` 的琥珀色延拓轴盘旋张开、令琥珀色落点珠分毫不差归零（$\lvert\zeta\rvert = 0.0000$）；随后轻轻拖动琥珀色手柄或“实部 $\sigma$”滑块离开 $0.50$ 哪怕 $0.05$ 或 $0.12$，观察地面上代表正向路径 $p^{-\sigma}$ 的青色壳环与代表逆向对偶路径 $p^{-(1-\sigma)}$ 的品红壳环如何瞬间一缩一胀分道扬镳，将原本严丝合缝归零的琥珀色延拓落点当场弹离原点；最后切入“素数阶梯”场景，看临界线上的零点驻波曲面如何反过来在连续实轴上雕琢出刀削般的青色素数阶梯！

与此同时，这座沙盘也把整部数论最惊心动魄的悬念摆到了我们面前：既然在右侧 $\sigma > 1$ 的欧拉乘积安全区里，每一枚素数极小圆弧体 $\Delta\mathcal{T}_p$ 原本完全乘性解耦、严格无零点且具备天然正定性，为什么过去一百多年的传统解析数论一旦试图把这份正定性推过 $s = 1$ 发散极点山峰去猎杀假想的离线四元组 $\frac{1}{2} \pm \delta \pm i\gamma_0$，就会在按自然数大小 $n = 1, 2, \dots, M$ 排队截断时迎头撞上**算术一维排序壁垒**与**图兰（Turán）芝诺假零点陷阱**，甚至连最强的单级磨光器也卡在 $\vartheta = \frac{4}{7}$ 衰减墙前？把 [§34.26](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) 破除排序壁垒的**局部波前稀疏舒尔枢轴重整**与 [§34.27](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) 潜入 $90^\circ$ 盲区的**内割弦多级共振隧穿**双剑合璧——请翻开下一节 [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)！

::: {.viz src="riemann-prime-arc-path-integral-sandbox" height="640"}
**黎曼路径积分与素数极小圆弧体临界线相消完整交互实验室（`riemann-prime-arc-path-integral-sandbox`）。** 在统一暗色三栏实验台中自由切换全部四张递进实验卡——“欧拉局域绕行、复合路径螺旋与莫比乌斯外积对偶”、“临界线 $\sigma = \frac{1}{2}$ 半密度双壳锁相与零点归零”、“偏离临界线正逆双壳失衡分裂”以及“韦伊显式对偶：零点驻波曲面雕刻素数阶梯”——实时联动实部滑块 $\sigma \in [0.20, 2.00]$、路径数 $N \in [20, 400]$、前五颗真实黎曼零点胶囊 $\gamma_1\text{–}\gamma_5$、莫比乌斯外积对偶开关与显式公式零点对数 $K \in [5, 50]$（紫色绘制自然数复合路径链 $\sum n^{-s}$、欧拉部分乘积、零点驻波部分和曲面与 `ARGUED` 文献依据，青色绘制地面正向壳环 $p^{-\sigma}$ 与精确切比雪夫阶梯 $\psi_0(x)$ 及 $\Lambda(n)$ 阶跃，品红色标示逆向对偶壳环 $p^{-(1-\sigma)}$、莫比乌斯外积链 $\sum\mu(n)n^{-s}$ 与零点驻波残差，琥珀色标出延拓竖轴与落点珠 $\zeta(s)$、当前零点胶囊 $\gamma_k$、最前排重构剖面 $K(t)$ 及交互手柄，红色专用于标示 [@conj-riemann-hypothesis] 的 `OPEN` 开放边界，绿色 `LEAN ✓` 实时核验 [@thm-ch34-riemann-prime-arc-bridge] 的全部七项 `trureturing` 内核定理实例）。
:::
