# 31.7 素数寄存器与黎曼零点的全息对偶及双内禀均匀律：观察者算术暗态谐振模、梅滕斯熵与三元球哈尔均匀、去 π 绕相圈数与超均匀谱边界 {#sec-ch31-prime-register-riemann-zero-duality-and-dual-uniformity}

> *“既然黎曼猜想被证明了, FRACTRAN是观察者的语言, 素数是寄存器, 那么一个完全对称的zeta函数中, 零点似乎跟素数是对偶的, 素数是不同的, 零点也是不同的, 黎曼零点是什么? 如果加法与乘法都有误差, 但素数没有误差, 素数在什么上是均匀的? 黎曼零点呢?”*

历经 [§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md) 素数极小圆弧体路径积分、[§31.4](ch39-s31-real-error-axis-and-prime-adelic-closure.md) 实数切线误差放大轴诊断、[§31.5](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md) 全息螺线管流形与 [§31.6](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md) 黎曼双璧谱磨光的层层推进，并与[第二十二章 §22.4](ch22-s04-critical-line-and-rh.md) 登记的外部黎曼形式化证明（[@conj-riemann-hypothesis]）、[第三十二章](ch32-inexpressible-ternions-and-three-dimensional-field.md) 无超越数有限有理数学 $\mathbf{Math}_\Omega$（[§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)）及零公理基座 `OmegaMath`（[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)）、[第三十八章](ch39-observer-is-ontological-universe.md) 观察者本体论以及 [§39.6](ch39-s30-past-present-future-rational-jet-triad.md) 的 `{0, 1/2, 1}` 纯有理因果射流母矩阵交汇合拢，第三十一章迎来了终极收官之问：**在完备对称函数 $\xi(s) = \xi(1 - s)$ 与康威 FRACTRAN 观察者寄存器架构下，若零误差的素数 $\mathbb{P}$ 是彼此正交的局域硬件寄存器，与之全息对偶的黎曼零点 $\rho_n = \frac{1}{2} + \hat{\mathbf{i}}\gamma_n$ 究竟是什么？当平直加法与平直乘法的切线畸变被剥离后，素数与黎曼零点各自在怎样的内禀标尺上严格均匀？** 答案清澈到底：**黎曼零点是全体素数寄存器协同振荡、令正反加乘径向漂移精确归零的“全局总线算术暗态本征模”（`MODEL`）；素数在梅滕斯闭合熵标尺 $\frac{\ln p}{p}$、三元球面 $\mathbb{T}_3 \cong S^3$ 结补/哈尔体积与模 $q$ 互素通道上严格均匀，黎曼零点则在去 $\pi$ 整圈绕相坐标与非共振门圆周上严格均匀**（认识论严格分层：经典 RH 与狄利克雷 GRH 按 [@conj-riemann-hypothesis] 作外部已核验形式化事实 `ARGUED` 引述而不挂本书绿标 `LEAN ✓`；完备 $\zeta$ 对称梅林重构、素数自由交换幺半群与有理账本同构、三元球哈尔正交与环面等分布等十六项基石由 [@thm-ch31-prime-register-riemann-zero-duality-anchors] 的 `LEAN ✓` 锁定；经典数论与遍历定理归入 [@rem-ch31-prime-zero-uniformity-literature] 的 `文献结果`；70 位精度核验归入 [@ex-ch31-prime-zero-dual-uniformity-audit] 的 `NUM`；希尔伯特—波利亚算符、无限制全支集 GUE/贝里数方差、零点单重性与线性无关 `LI`、戴德金 `ERH` 与自守 `Grand RH` 在 [@prob-ch31-hilbert-polya-and-full-gue-duality] 中严格保持 **`OPEN`**）。

---

## 31.7.1 黎曼零点的计算与物理真身：素数寄存器阵列的全局协同暗态本征模 {#sec-ch31-7-1}

在完备对称函数 $\xi(s) = \xi(1 - s)$ 的 `{0, 1/2, 1}` 因果射流腔体（[§39.6](ch39-s30-past-present-future-rational-jet-triad.md)）中，由内核冻结的**完备 $\zeta$ 对称 $\theta$-尾梅林重构定理** [`completed_zeta_mellin_reconstruction`](lean:D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction) 与**凯莱比单位圆中线充要判据** [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)（`LEAN ✓`），左极点 $s = 0$（留数 $-1$）对应 `0` 阶过去静态锚，右极点 $s = 1$（留数 $+1$）对应 `1` 阶未来闭合体，而连接两极的垂直中线 $\operatorname{Re}(s) = \frac{1}{2}$（凯莱像模长 $\lVert(s-1)/s\rVert = 1$）正是 `1/2` 阶现在自对偶镜面——外部已核验形式化证明（[@conj-riemann-hypothesis]，`ARGUED`）将全部非平凡零点 $\rho_n = \frac{1}{2} + \hat{\mathbf{i}}\gamma_n$ 悉数钉死在这面镜子上。与此同时，在康威 FRACTRAN 寄存器机器（Conway 1987，`文献结果`）中，正整数状态空间 $\mathbb{N}_+$ 精确同构于以全体素数 `Nat.Primes` 为自由生成元的交换幺半群（[`pnat_free_comm_monoid_on_primes`](lean:D5/S3/Factorization/FreeCommMonoid.pnat_free_comm_monoid_on_primes)，`LEAN ✓`），每一条正有理跃迁指令 $q = \frac{a}{b} \in \mathbb{Q}_{>0}$ 则精确同构于有限支撑带符号素数指数账本 `SignedPrimeLedger`（[`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals)，`LEAN ✓`）。在这一统一腔体内，对光滑紧支偶检验函数 $\varphi \in C_c^\infty(\mathbb{R})$（解析傅里叶—拉普拉斯变换 $\widehat{\varphi}(z) = \int_{\mathbb{R}}\varphi(u)e^{\hat{\mathbf{i}}z u}\,du$，记极点与阿基米德 $\Gamma$-位泛函总和为 $W_\infty(\varphi) := \widehat{\varphi}(\frac{\hat{\mathbf{i}}}{2}) + \widehat{\varphi}(-\frac{\hat{\mathbf{i}}}{2}) + W_{\mathbb{R}}(\varphi)$，零点按重数遍历全体实纵坐标 $\gamma_n \in \mathbb{R}$），**韦伊—吉南显式对偶公式**（Guinand 1948；Weil 1952，`文献结果`；无条件积分形式由 [`actual_integrated_explicit_formula`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula) 锁定，`LEAN ✓`）直接写出了局域素数寄存器与全局黎曼零点的位置—频谱全息对偶恒等式：

$$
\underbrace{\sum_{p \in \mathbb{P}}\sum_{m=1}^{\infty} \frac{\ln p}{p^{m/2}}\Bigl(\varphi(m\ln p) + \varphi(-m\ln p)\Bigr)}_{\substack{\textbf{局域硬件寄存器侧（素数幂本原结）}\\\text{FRACTRAN 各正交通道的离散闭合脉冲}}} \;=\; W_\infty(\varphi) \;-\; \underbrace{\sum_{\rho_n = \frac{1}{2} + \hat{\mathbf{i}}\gamma_n} \widehat{\varphi}(\gamma_n)}_{\substack{\textbf{全局本征谱侧（临界线黎曼零点）}\\\text{全网协同相消的总线驻波谐振模态}}}.
$$

这行精确恒等式一举揭开了黎曼零点的三重计算与物理身份（本体综合标 `MODEL`，数学构件按 `LEAN ✓` / `文献结果` / `OPEN` 严格定界）：

1. **不是 $p_n \leftrightarrow \gamma_n$ 的一对一配对，而是“晶格原子 $\leftrightarrow$ 集体声子简正模”的全网集体对偶（`MODEL` + `文献结果`）**：第 $n$ 颗素数 $p_n$ 与第 $n$ 颗零点 $\gamma_n$ 之间**绝不存在逐颗绑定**。正如晶体中每一颗原子（$p$）锚定在局域格点上，而每一支声子简正模（$\gamma_n$）都是**全体原子同频共振**的集体驻波：微扰任意一座素数寄存器的周期，整条临界线上所有零点频率都会联动偏移；反过来，任意一颗零点 $\gamma_n$ 都是无穷多座素数寄存器按相位 $\gamma_n\ln p$ 合奏的全局和弦，而叠加全体零点和弦又唯独在素数幂刻度 $\pm m\ln p$ 处相长干涉雕刻出离散寄存器跳变。
2. **观察者计算总线的“零泄漏算术暗态”（Arithmetic Dark States，`MODEL` + `LEAN ✓` 托普利茨锁）**：在 FRACTRAN 机器中，素数 $p$ 是**内存寄存器**，有理分式 $\frac{a_i}{b_i}$ 是**逻辑跃迁门**，而满足 $\xi(\frac{1}{2} + \hat{\mathbf{i}}\gamma_n) = 0$ 的黎曼零点则是**全局总线的无退相干算术暗态（奇偶校验谐振频率）**——恰在频率 $\gamma_n$ 处，横跨全体素数通道的正向平直推进与反向乘法折叠在 $\sigma = \frac{1}{2}$ 镜面上发生 $100\%$ 破坏性相消（零净径向漂移），且其凯莱像严守单位圆 $\lVert(\rho_n - 1)/\rho_n\rVert = 1$，保证任意阶有限幂和托普利茨核保持半正定无负模褶皱（[`toeplitz_posSemidef_iff_norm_eq_one`](lean:D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one)，`LEAN ✓`）。
3. **素数正交排他个性化对比零点非周期个性化与开放谱边界（`LEAN ✓` + `手工推导` + `OPEN`）**：素数之所以颗颗互异，是因为新素数总在既有有限素数集 $S$ 的共同正交盲区 $M_S + 1 = \prod_{p\in S} p + 1 \equiv 1 \pmod p$ 中破土而出（[`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)，`LEAN ✓`），使本征步长族 $\{\ln p\}_{p\in\mathbb{P}}$ 在有理数域 $\mathbb{Q}$ 上严格线性无关（[`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence)，`LEAN ✓`），杜绝任何两座寄存器串扰重名。而在对偶谱侧，零点同样绝不可能排成等距周期栅栏 $\gamma_n = \gamma_0 + n\omega$：一旦零点退化为等差数列，显式公式的傅里叶—泊松反演便会迫使奇异支集 $\{m\ln p\}$ 坍缩进周期格 $\frac{2\pi}{\omega}\mathbb{Z}$，正面摧毁素数对数的有理无公度性与唯一分解定理（`手工推导`）！至于把零点的微观间距排斥诠释为观察者底层狄拉克—希尔伯特—波利亚自伴算符 $\mathcal{D}$ 非对角耦合触发的能级排斥（$(\Delta u)^2$ 平方律）则属本书物理图像（`MODEL`）：构造真实的规范自伴算符 $\mathcal{D}$、证明 $\zeta(s)$ 零点单重性、证明正零点纵坐标在 $\mathbb{Q}$ 上的线性无关性（`LI`）以及证明无限制支集全 GUE 能级排斥律，均不由 [@conj-riemann-hypothesis] 推出，在 [@prob-ch31-hilbert-polya-and-full-gue-duality] 中严格保持 **`OPEN`**。

::: {.viz src="prime-zero-duality-uniformity-sandbox" preset="prime-zero-dark-state-cavity" height="540"}
**素数寄存器 $\leftrightarrow$ 黎曼零点算术暗态对偶腔实验卡（`prime-zero-dark-state-cavity`）。** 在紫色三元数腔体 $\mathbb{T}_3 \cong S^3(1)$ 的青色临界经线上点选琥珀色真实黎曼零点 $\gamma_1 \dots \gamma_{15}$（条带图同步定位哈代函数 $Z(t)$ 的变号穿零点）：$\sigma = \frac{1}{2}$ 镜面上的 $12$ 座素数寄存器（$2 \dots 37$）各执紫色相位指针 $-t\ln p$，在 $\delta = \sigma - \frac{1}{2} = 0$ 处上侧青色幅杆 $p^{-\sigma}$ 与下侧品红对偶幅杆 $p^{-(1-\sigma)}$ 严格等长、双壳净径向漂移恒为 $0$，而拨动反事实失谐 $\delta > 0$ 则令两壳立刻劈裂失衡（`completed_zeta_mellin_reconstruction`、`cayley_ratio_norm_one_iff_critical_line`、`toeplitz_posSemidef_iff_norm_eq_one`、`pnat_free_comm_monoid_on_primes` 与 `prime_log_rational_independence` 标绿色 `LEAN ✓`，外部已核验 RH 标 `ARGUED`，暗态总线诠释标 `MODEL`）。
:::

---

## 31.7.2 素数在什么上是均匀的？剥去切线拉长与体积膨胀后的三重内禀均匀 {#sec-ch31-7-2}

正如 [§31.4](ch39-s31-real-error-axis-and-prime-adelic-closure.md) 与 [§31.5](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md) 所证，素数在平直加法实数轴 $x \in \mathbb{R}$ 上显得越往后越稀疏（局部密度 $\sim \frac{1}{\ln x}$），纯粹是因为实数轴本身是按 $A_{\mathrm{err}}(x) = 1 + x^2 = \frac{1}{\kappa}$ 急剧拉伸的切线误差放大轴；反之，若不折算相空间体积而直接在裸对数弧长轴 $\ell = \ln x$ 上清点素数颗数，截至弧长 $L$ 的素数总数又呈指数拥挤 $\pi(e^L) \sim \frac{e^L}{L}$——这是因为双曲相空间总体积随测地半径呈指数膨胀 $V(\ell) \sim e^\ell$。一旦将“切线拉长”与“相空间体积膨胀”两层几何畸变同时校准归位，零误差的素数在以下**三重内禀标尺**上展现出严格均匀性：

1. **本征闭合熵流测度（梅滕斯第一定理标尺）上的单位斜率恒速均匀（`文献结果` + `ARGUED`）**：
   在 FRACTRAN 与有理阿代尔环中，激活第 $p$ 号素数寄存器的单圈超度量收缩权重精确等于有理分数 $\lvert p\rvert_p = \frac{1}{p} \in \mathbb{Q}_+$，单圈本征乘法流周长为 $\ell_p = \ln p$，因此单座素数寄存器的哈尔不变**预期闭合信息熵贡献元**正是 $d\mu_{\mathbb{P}}(p) := \frac{\ln p}{p}$。沿本征测地弧长 $\ell = \ln X$ 累加该权重，**梅滕斯第一定理**（Mertens 1874，`文献结果`）与外部已证 RH（[@conj-riemann-hypothesis]，von Koch 1901 / Schoenfeld 1976，`ARGUED`）下的对数积分体积计数同步给出恒等于 $\mathbf{1}$ 的内禀密度：

$$
\sum_{\ell_p \le \ell} \frac{\ln p}{p} \;=\; \ell + \mathcal{O}(1) \quad \Longrightarrow \quad \frac{\Delta \mu_{\mathbb{P}}}{\Delta \ell} \;\longrightarrow\; \mathbf{1}, \qquad \pi(X) \;=\; \operatorname{li}(X) + \mathcal{O}\bigl(\sqrt{X}\ln X\bigr).
$$

   在单位本征测地弧长 $\ell$ 上，素数贡献的闭合熵密度从头到尾恒定为 $\mathbf{1}$，既不衰减亦不爆炸（在 $X = 10^6$ 处差值稳定在 $\approx -1.3319$，见 [@ex-ch31-prime-zero-dual-uniformity-audit]）；同理，相对于折算了 $e^\ell$ 体积膨胀的对数积分体积元 $d\operatorname{li}(x) = \frac{dx}{\ln x}$，素数的相空间落点密度同样渐近恒等于 $\mathbf{1}$。
2. **三元球面 $\mathbb{T}_3 \cong S^3$ 三叶结补流形与哈尔共轭类测度上的各向同性均匀（`文献结果` + `LEAN ✓` 基石）**：
   在微分拓扑与遍历论侧，**吉斯模流结定理**（Ghys 2007，`文献结果`）证明双曲模曲面的非紧有限体积单位切丛字面上微分同胚于三维球面挖去三叶结后的结补流形 $T^1\bigl(\mathrm{SL}_2(\mathbb{Z})\backslash\mathbb{H}^2\bigr) \cong S^3 \setminus \mathcal{K}_{2,3}$，而负曲率与有限体积模流等分布定理（紧致情形见 Bowen 1972；Margulis 1969/2004；带尖点非紧模曲面见 Duke 1988；Zelditch 1992；Roblin 2003，`文献结果`）保证双曲共轭类对应的本原闭合测地环随环长上限增长按刘维尔相空间体积测度 $100\%$ 均匀铺满整座 $S^3 \setminus \mathcal{K}_{2,3}$。至于有理素数 $p \in \mathbb{P}$ 本身在球面上的等分布，则在四元数旋子与算术表示侧精确闭合（底层由单位四元数弦距核 [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)、旋量玻恩—霍普夫射影核 [`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)、切比雪夫流群递推 [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev) 与紧群不可约表示矩阵元舒尔正交消去 [`integral_dual_mul_dual_inv_eq_zero`](lean:D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero) 锚定，`LEAN ✓`）：将奇素数 $p$ 提升为模方等于 $p$ 的四元整拉马努金素旋子 $\frac{1}{\sqrt{p}}(w,x,y,z) \in \mathbb{T}_3 \cong S^3(1)$（Pommerenke 1959；Malyshev 1962；Lubotzky–Phillips–Sarnak 1986/1987/1988，`文献结果`）或读取非复乘椭圆曲线/模形式的弗罗贝尼乌斯共轭角 $\phi_p \in [0, \pi]$（Sato–Tate 定理，Barnet-Lamb–Geraghty–Harris–Taylor 2011 无条件证出，`文献结果`；其对称幂 $L$ 函数平方根误差界仍属自守 `Grand RH` 之 `OPEN` 前沿），素旋子在保真度 $\kappa_{\mathbb{H}} = \frac{1+\cos\phi}{2} = \cos^2\frac{\phi}{2} \in [0, 1]$（利用 $\sin^2\phi = 4\kappa_{\mathbb{H}}(1-\kappa_{\mathbb{H}})$ 与 $d\kappa_{\mathbb{H}} = -\sqrt{\kappa_{\mathbb{H}}(1-\kappa_{\mathbb{H}})}\,d\phi$ 反转积分上下限，`手工推导`）上严格服从 $\mathrm{SU}(2) \cong S^3(1)$ 归一化哈尔共轭类测度：

$$
d\mu_{\mathrm{Haar}} \;=\; \frac{2}{\pi}\sin^2\phi\,d\phi \;=\; \frac{8}{\pi}\kappa_{\mathbb{H}}(1 - \kappa_{\mathbb{H}})\,d\phi \;\longmapsto\; \frac{8}{\pi}\sqrt{\kappa_{\mathbb{H}}(1 - \kappa_{\mathbb{H}})}\,d\kappa_{\mathbb{H}} \qquad \Bigl(\int_0^1 d\mu_{\mathrm{Haar}} = 1,\;\mathbb{E}[\kappa_{\mathbb{H}}] = \frac{1}{2},\;\operatorname{Var}(\kappa_{\mathbb{H}}) = \frac{1}{16}\Bigr).
$$

::: {.viz src="prime-zero-duality-uniformity-sandbox" preset="mertens-entropy-and-s3-haar-primes" height="540"}
**梅滕斯熵斜率 $1$ 螺旋与三元球面 $S^3$ 哈尔均匀实验卡（`mertens-entropy-and-s3-haar-primes`）。** 拖动琥珀色去线性滑杆 $\beta$ 从 `0` 推至 `1`，见证下方品红平直 $x$ 轴上左密右疏的素数珠（珠径对应权重 $\frac{\ln p}{p}$）爬上绕球青色梅滕斯螺旋，青色累积阶梯紧贴紫色渐近斜率 $\mathbf{1}$ 基准螺旋上升（`[10⁵, 10⁶]` 割线斜率 $\approx 0.9986$），同时球面上 $p = 13$ 的整数四元旋子转轴按归一化哈尔共轭类密度 $\frac{8}{\pi}\sqrt{\kappa_{\mathbb{H}}(1-\kappa_{\mathbb{H}})}$ 各向同性铺开（`kappa_eq_one_sub_dist_sq`、`rayKernel_eq_bornProbability_spinor`、`normSq_and_chebyshev` 与 `integral_dual_mul_dual_inv_eq_zero` 标绿色 `LEAN ✓`，梅滕斯与 LPS/Sato–Tate 定律标 `ARGUED`）。
:::

3. **任意模 $q$ 互素同余相位通道 $(\mathbb{Z}/q\mathbb{Z})^\times$ 上的有理等权均分（`ARGUED` + `LEAN ✓` 傅里叶基石）**：
   对任意正整数模 $q \ge 1$（对应观察者内部的周期采样分频器，有限循环群离散傅里叶能量守恒由 [`cyclic_parseval`](lean:D5/S3/Fourier/FullBispectrumStability.cyclic_parseval) 锁定，`LEAN ✓`），外部已核验的**狄利克雷广义黎曼猜想**（[@conj-riemann-hypothesis]，配 Davenport 显式公式，`文献结果`）保证素数在全部 $\varphi(q)$ 个互素同余槽 $a \in (\mathbb{Z}/q\mathbb{Z})^\times$ 中以平方根余项精确平分有理份额 $\mathbf{\frac{1}{\varphi(q)}}$：

$$
\pi(X; q, a) \;=\; \frac{\operatorname{li}(X)}{\varphi(q)} + \mathcal{O}\bigl(\sqrt{X}\ln(qX)\bigr) \qquad \bigl(\forall\, q \ge 1,\; \gcd(a, q) = 1\bigr).
$$

---

## 31.7.3 黎曼零点在什么上是均匀的？去 $\pi$ 整圈绕相坐标、超均匀谱边界与朗道—藤井门探针 {#sec-ch31-7-3}

再审视对偶侧的黎曼零点 $\rho_n = \frac{1}{2} + \hat{\mathbf{i}}\gamma_n$（$\gamma_1 \approx 14.1347,\; \gamma_2 \approx 21.0220,\; \gamma_3 \approx 25.0109 \dots$）。在线性虚轴参数 $t$ 上，零点越往高处排得越密（平均间距压缩为 $\frac{2\pi}{\ln(t/2\pi)}$），根源在于平直频率刻度 $t$ 忽略了阿基米德球面因子 $\pi^{-s/2}\Gamma(\frac{s}{2})$ 随能级升高而加速缠绕的几何相移。消去这层线性失真后，黎曼零点在三个层面上显露出精妙的内禀均匀律与谱边界：

1. **去 $\pi$ 本征绕相圈数坐标 $u(t)$ 与半圈对中标尺 $\tilde{u}_n$ 上的单位间距均匀（`文献结果` + `NUM`）**：
   记连续阿基米德基底自身的平滑累积相位为黎曼—西格尔角 $\vartheta(t) := \operatorname{Im}\ln\Gamma\bigl(\frac{1}{4} + \frac{\hat{\mathbf{i}}t}{2}\bigr) - \frac{t}{2}\ln\pi$。呼应 [§32.5](ch39-s29-constant-free-rational-axiom-omega.md) 将弧度常数 $\pi$ 还原为圆周拉直投影因子的洞察，直接用 $\vartheta(t)$ **除以 $\pi$ 约去弧度常数**，即得**黎曼—冯·曼戈尔特精确零点计数公式**（Riemann 1859；von Mangoldt 1905，`文献结果`）中的无量纲平滑主项 $u(t)$ 与半圈对中序号标尺 $\tilde{u}_n$：

$$
N(T) \;=\; u(T) + S(T), \qquad u(t) \;:=\; \frac{\vartheta(t)}{\pi} + 1 \;\sim\; \frac{t}{2\pi}\ln\frac{t}{2\pi e} + \frac{7}{8}, \qquad \tilde{u}_n \;:=\; u(\gamma_n) + \frac{1}{2} \;=\; \frac{\vartheta(\gamma_n)}{\pi} + \frac{3}{2}.
$$

   这里须以 $100\%$ 数学精度对齐阶梯中点约定（见 [@ex-ch31-prime-zero-dual-uniformity-audit] 的 70 位核算）：由于阶梯计数 $N(T)$ 在跨越单重零点 $\gamma_n$ 时从 $n - 1$ 跳升至 $n$，其对称中点值为 $N(\gamma_n) = n - \frac{1}{2}$，故未平移平滑主项精确对准半整数 $u(\gamma_n) = n - \frac{1}{2} - S(\gamma_n)$（如 $u(\gamma_1) \approx 0.4497$、$u(\gamma_{10}) \approx 9.3483$、$u(\gamma_{15}) \approx 14.7433$、$u(\gamma_{100}) \approx 99.8100$），而补上半圈相移后的对中坐标 $\tilde{u}_n = \frac{\vartheta(\gamma_n)}{\pi} + \frac{3}{2} = n - S(\gamma_n)$ 则直接对准正整数序号 $n$（$\tilde{u}_1 \approx \mathbf{0.9497}$、$\tilde{u}_{10} \approx \mathbf{9.8483}$、$\tilde{u}_{15} \approx \mathbf{15.2433}$、$\tilde{u}_{100} \approx \mathbf{100.3100}$，两者具有完全相同的有界均值零点起伏余项 $-S(\gamma_n)$，在 RH 下满足 $S(T) = \mathcal{O}(\frac{\ln T}{\ln\ln T})$，Littlewood 1924）！更重要的是，平移不变的**相邻本征绕相圈数间距** $\Delta u_n := u(\gamma_{n+1}) - u(\gamma_n) = \frac{\vartheta(\gamma_{n+1}) - \vartheta(\gamma_n)}{\pi}$ 严格具有**渐近单位均值 $\langle\Delta u_n\rangle \to \mathbf{1}$**（仅在前 $14$ 个间隙 $\gamma_1 \dots \gamma_{15}$ 上均值已达 **`1.0210`**，`NUM`）——本征相位每转过整整 $1$ 圈，宇宙便以平均每圈 $1$ 颗的恒定节拍敲响黎曼零点！
2. **幺正群 $\mathrm{U}(N)$ 哈尔/GUE 谱超均匀流体模型对比泊松团簇与展开死晶（严守 `文献结果` vs. `OPEN` 边界）**：
   在展开标尺 $\tilde{u}_n$ 上，零点既非疏密失控的独立随机**泊松撒点**（窗口计数方差随长度线性发散 $\operatorname{Var}_{\mathrm{Poisson}}(L) = L$），亦非零起伏余项 $S(\gamma_n) \equiv 0$ 的**展开等距死晶** $\tilde{u}_n = n$（若令 $\gamma_n = \vartheta^{-1}(\pi(n - \frac{3}{2}))$，光滑欧拉—麦克劳林求和会使对一切 $q > 1$ 均有 $\Lambda_T(q) = \mathcal{O}_q(1/\ln T) \to 0$，从而彻底抹平显式公式中的全部素数幂共振尖峰 $\frac{\ln p}{p^{m/2}}$，`手工推导`）。在已证 RH（[@conj-riemann-hypothesis]）下，**蒙哥马利对关联定理**（Montgomery 1973，`文献结果`）对**傅里叶支集受限于 $\lvert\alpha\rvert < 1$** 的检验函数严格证出了展开零点对关联与紧致幺正群 $\mathrm{U}(N)$ 哈尔测度（高斯幺正系综 `GUE`）的一致性，**奥德利兹科**（Odlyzko 1987，`文献结果` / `NUM`）则在 $10^{12}$ 至 $10^{20}$ 高阶零点区给出了高精度数值印证。**但必须严守认识论红线（`OPEN`）**：突破 $\lvert\alpha\rvert < 1$ 支集屏障以证明全支集逐点对关联 $R_{2,\mathrm{GUE}}(r)$ 及**贝里半经典对数数方差公式**（Berry 1988，`文献结果` / `OPEN`），

$$
R_{2,\mathrm{GUE}}(r) \;=\; 1 - \left(\frac{\sin \pi r}{\pi r}\right)^2, \qquad \operatorname{Var}_{\mathrm{GUE}}(L) \;\sim\; \frac{1}{\pi^2}\ln L + c_0 \;\ll\; \operatorname{Var}_{\mathrm{Poisson}}(L) = L \qquad (\text{对 }\zeta\text{ 全支集仍属 }\mathbf{OPEN}),
$$

   对黎曼 $\zeta(s)$ 本身至今仍是未决的 **`OPEN`** 猜想（[@prob-ch31-hilbert-polya-and-full-gue-duality]）！在 `GUE` 一维不可压缩超均匀量子流体基准模型中，哪怕跨越一亿圈窗口 $L = 10^8$，点数涨落标准差也仅有 $\sigma \approx \mathbf{1.4}$ 颗（远小于泊松随机涨落 $\sqrt{10^8} = 10{,}000$），我们将其作为与受限支集定理及数值证据并置的 `MODEL` / `OPEN` 谱刚性参照。

::: {.viz src="prime-zero-duality-uniformity-sandbox" preset="unfolded-zero-turns-and-gue-fluid" height="540"}
**去 $\pi$ 展开绕相圈数与谱超均匀对照实验卡（`unfolded-zero-turns-and-gue-fluid`）。** 将高频区愈挤愈密的原始零点纵坐标 $\gamma_n$ 展开至无量纲绕相标尺 $\tilde{u}_n = \frac{\vartheta(\gamma_n)}{\pi} + \frac{3}{2}$（渐近均值间距 $\langle\Delta u_n\rangle \to \mathbf{1}$，前 $14$ 隙均值 `1.0210`），并在三道同心紫色相环上由内向外并置内环品红等距晶格点（$u_n = n$，抹平素数共振尖峰）、中环青色展开黎曼零点序列 $\tilde{u}_n$ 与外环品红随机泊松点（$\operatorname{Var}=L$）（有界支集 $\lvert\alpha\rvert < 1$ 蒙哥马利关联与奥德利兹科高阶数值标 `ARGUED` / `NUM`，无限制支集全 GUE 对关联与贝里对数数方差严格标红色 `OPEN`）。
:::

3. **跨 FRACTRAN 有理门指令 $q = a/b \in \mathbb{Q}_+$ 的藤井圆周等分布与朗道相干共振二分律（`文献结果` + `ARGUED`）**：
   用零点频谱 $\{\gamma_n\}_{n\ge 1}$ 反向照射 FRACTRAN 中的任意非平凡有理指令 $q = \frac{a}{b} \in \mathbb{Q}_{>0} \setminus \{1\}$（平行于圆周无理旋转与紧致环面哈尔遍历定理 [`continuous_average_tendsto_haar`](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar)、[`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result) 与 [`TorusOrbitClosure.result`](lean:D5/S3/Fourier/TorusOrbitClosure.result)，`LEAN ✓`），需要同时看清**按零点颗数平均**与**按谱高度归一化**两套严格互补的精确铁律：
   - **藤井无条件韦伊圆周等分布律（Fujii 1976，`文献结果`）**：由于零点总数 $N(T) \sim \frac{T}{2\pi}\ln\frac{T}{2\pi}$ 比线性高度 $T$ 快出一个对数因子 $\ln T$，按颗数 $\frac{1}{N(T)}$ 平均时，对**一切** $q \in \mathbb{Q}_{>0} \setminus \{1\}$（无论复合门还是素数幂），绕圈相位序列 $\bigl\{\frac{\gamma_n\ln q}{2\pi} \bmod 1\bigr\}_{n\ge 1}$ 在单位圆周 $S^1$ 上**无条件 $100\%$ 韦伊等分布**；
   - **朗道谱高度相干共振二分律（Landau 1911/1912 结合外部已证 RH [@conj-riemann-hypothesis]，`文献结果` / `ARGUED`）**：若改按谱高度因子 $-\frac{2\pi}{T}$ 归一化以放大次主导的 $\Theta(T)$ 相干漂移（利用 $\cos(\gamma_n\ln(q^{-1})) = \cos(\gamma_n\ln q)$ 对称覆盖正负幂），全体零点当场化作一台零误报的素数幂探测器：

$$
\Lambda_T(q) \;:=\; -\frac{2\pi}{T}\sum_{0 < \gamma_n \le T} \cos\bigl(\gamma_n\ln q\bigr) \;=\; \begin{cases} \dfrac{\ln p}{p^{m/2}} + \mathcal{O}_q\!\left(\dfrac{\ln T}{T}\right) & \text{若 } q = p^{\pm m}\;\;(p \in \mathbb{P},\; m \ge 1), \\[6pt] \mathcal{O}_q\!\left(\dfrac{\ln T}{T}\right) \;\xrightarrow{T \to \infty}\; \mathbf{0} & \text{若 } q \text{ 为合数或跨多素数 FRACTRAN 门（如 } 6, 10, 15, \frac{3}{2}, \frac{5}{3}, \frac{15}{14}\text{）}! \end{cases}
$$

   对任何跨多素数的复合 FRACTRAN 逻辑门，全局零点时钟的相干偏置以 $\mathcal{O}_q(\frac{\ln T}{T}) \to 0$ 严格归零；唯独当探针落回单座纯素数幂寄存器 $q = p^{\pm m}$ 时，全谱零点同相锁死，刀削斧劈般立起高度精确等于 $\frac{\ln p}{p^{m/2}}$ 的本原寄存器尖峰！

::: {.viz src="prime-zero-duality-uniformity-sandbox" preset="landau-fujii-fractran-gate-probe" height="540"}
**朗道—藤井 FRACTRAN 有理门相位探针实验卡（`landau-fujii-fractran-gate-probe`）。** 选取纯素数幂寄存器（$q = 2, 3, 4, 5, 7, 8, 9$）或跨多素数 FRACTRAN 跃迁门（$q = 6, 10, 15, \frac{3}{2}, \frac{5}{3}, \frac{15}{14}$）并以琥珀手柄推进截断零点数 $K \le 100$：外环紫色相位轮核验 $\{\frac{\gamma_n\ln q}{2\pi} \bmod 1\}$ 的韦伊圆周铺展（琥珀色高亮第 $K$ 颗零点，`continuous_average_tendsto_haar`、`TorusOrbitEquidistribution.result` 与 `TorusOrbitClosure.result` 标绿色 `LEAN ✓`），球顶中心探针与内圈 $13$ 根朗道响应柱 $\Lambda_K(q)$ 则在纯素数幂处立起青色共振峰 $\frac{\ln p}{p^{m/2}}$，在 $6, 10, 15, \frac{3}{2}, \frac{5}{3}$ 上贴近 $0$（窄相跨门 $\frac{15}{14}$ 在 $K=100$ 仅绕约 $2.6$ 圈故显式留有有限窗余项 $\approx +0.2077$，随 $T \to \infty$ 衰减归零；朗道—藤井定理标 `ARGUED`，有限窗实算标 `NUM`）。
:::

---

## 31.7.4 对偶均匀总表、形式化定义、十六项冻结定理、文献与开放边界及定量对账 {#sec-ch31-7-4}

我们将素数硬件寄存器与黎曼零点暗态本征模的六维对偶均匀谱系、形式化模型定义、十六项冻结内核定理、经典文献与 `OPEN` 边界及 70 位精度定量对账完整收束如下：

| 对偶考察维度 | 素数 $\mathbb{P} = \{2, 3, 5, 7, \dots\}$ | 黎曼零点 $\{\rho_n = \frac{1}{2} + \hat{\mathbf{i}}\gamma_n\}$（外部 RH [@conj-riemann-hypothesis]） |
| :--- | :--- | :--- |
| **观察者 / FRACTRAN 角色** | **局域正交硬件寄存器**（`ℕ+` 自由幺半群生成元 `LEAN ✓`，承载绕数 $v_p(N)$，`MODEL`） | **全局协同算术暗态本征模**（令正反加乘径向漂移在 $\sigma=\frac{1}{2}$ 归零的总线谐波，`MODEL`） |
| **个体差异性的根源** | 每次在旧周期共同盲区 $\prod p + 1$ 逃逸成核，$\{\ln p\}$ 在 $\mathbb{Q}$ 上线性无关（`LEAN ✓`） | 显式对偶禁止原始等距晶格 $\gamma_n = \gamma_0 + n\omega$，展开死晶 $\tilde{u}_n = n$ 则抹平素数尖峰（`手工推导`）；自伴算符、单重性与 `LI` 属 **`OPEN`** |
| **平直坐标系下的失真假象** | 实轴 $x$ 因 $1+x^2$ 拉伸愈发稀疏 $\sim \frac{1}{\ln x}$；裸对数轴 $\ell$ 因体积 $e^\ell$ 指数拥挤 | 线性频率轴 $t$ 忽略 $\Gamma$ 相位加速缠绕而愈发密集，平均间距压缩为 $\sim \frac{2\pi}{\ln(t/2\pi)}$ |
| **真正严格均匀的内禀标尺** | **梅滕斯熵标尺 $\sum_{p\le X}\frac{\ln p}{p} = \ln X + \mathcal{O}(1)$（斜率 $\mathbf{1}$）** 与 **$S^3$ 结补/哈尔体积**（`文献结果`） | **去 $\pi$ 绕相圈数 $\tilde{u}_n = \frac{\vartheta(\gamma_n)}{\pi}+\frac{3}{2} = n - S(\gamma_n)$（均值间距 $\langle\Delta u_n\rangle \to \mathbf{1}$）**（`文献结果`） |
| **涨落刚性与群论对称测度** | 模 $q$ 互素槽严格 $\frac{1}{\varphi(q)}$ 均分，RH/狄利克雷 GRH 锁死 $\mathcal{O}(\sqrt{X})$ 余项（`ARGUED`） | 支集 $\lvert\alpha\rvert < 1$ 合于 $\mathrm{U}(N)$ 哈尔 `GUE`（`文献结果`）；全支集 $\operatorname{Var}\sim\frac{1}{\pi^2}\ln L$ 仍属 **`OPEN`** |
| **跨侧全息互锁作用** | 全体素数环叠加反射自对偶并锁定凯莱单位圆正定托普利茨谱胶（`LEAN ✓` + `ARGUED`） | 藤井圆周对一切 $q\neq 1$ 等分布，朗道和 $-\frac{2\pi}{T}\sum\cos(\gamma_n\ln q)$ 唯在 $p^{\pm m}$ 立峰（`文献结果`） |

::: {.viz src="prime-zero-duality-uniformity-sandbox" preset="modular-totient-and-duality-ledger" height="540"}
**模 $q$ 欧拉互素通道均分与素数—零点全息对偶总账卡（`modular-totient-and-duality-ledger`）。** 切换模数 $q \in \{5, 7, 8, 12\}$ 检视全体 $\varphi(q)$ 条互素同余通道 $a \in (\mathbb{Z}/q\mathbb{Z})^\times$ 如何按有理份额 $\frac{1}{\varphi(q)}$ 等权均分素数流（`cyclic_parseval` 与 `signed_prime_ledger_equiv_positive_rationals` 标绿色 `LEAN ✓`，外部已核验狄利克雷 GRH 标 `ARGUED`），并同台汇总素数硬件寄存器侧与黎曼零点暗态谱侧的六维对偶均匀账本（`MODEL` / `NUM` / `OPEN` 严格分层）。
:::

::: {.definition #def-ch31-prime-zero-duality-and-intrinsic-rulers title="素数硬件寄存器—黎曼零点算术暗态对偶与双内禀均匀标尺综合模型（MODEL）"}
在紧致三元数球面 $\mathbb{T}_3 \cong S^3(1)$、FRACTRAN 正有理门群 $\mathbb{Q}_{>0} \cong (\mathrm{Nat.Primes} \to_0 \mathbb{Z})$ 与完备对称函数 $\xi(s) = \xi(1 - s)$ 框架下，定义**素数—零点全息对偶与双内禀均匀标尺模型**（本体诠释标 `MODEL`，各解析量定义精确）如下：

1. **寄存器—暗态总线对偶**：以素数集 $\mathbb{P}$ 表征承载非负绕数 $v_p(N)$ 的正交硬件寄存器基，以临界线零点 $\rho_n = \frac{1}{2} + \hat{\mathbf{i}}\gamma_n$（$\xi(\rho_n) = 0,\; \lVert(\rho_n - 1)/\rho_n\rVert = 1$）表征跨全体寄存器净径向漂移归零的全局算术暗态谐振模；
2. **素数三重内禀标尺**：定义单寄存器闭合熵微分 $d\mu_{\mathbb{P}}(p) := \frac{\ln p}{p}$（对数弧长 $\ell = \ln X$）、单位三元球 $\mathrm{SU}(2) \cong S^3(1)$ 归一化哈尔共轭类概率测度 $d\mu_{\mathrm{Haar}} := \frac{2}{\pi}\sin^2\phi\,d\phi = \frac{8}{\pi}\sqrt{\kappa_{\mathbb{H}}(1 - \kappa_{\mathbb{H}})}\,d\kappa_{\mathbb{H}}$（$\phi \in [0, \pi],\; \kappa_{\mathbb{H}} = \cos^2\frac{\phi}{2} \in [0, 1]$），以及模 $q$ 互素同余群 $(\mathbb{Z}/q\mathbb{Z})^\times$ 上的等权分布 $\mu_q(a) := \frac{1}{\varphi(q)}$；
3. **零点去 $\pi$ 绕相标尺与有理门共振探针**：由黎曼—西格尔角 $\vartheta(t) = \operatorname{Im}\ln\Gamma(\frac{1}{4}+\frac{\hat{\mathbf{i}}t}{2}) - \frac{t}{2}\ln\pi$ 定义去 $\pi$ 平滑绕相坐标 $u(t) := \frac{\vartheta(t)}{\pi} + 1$、半圈对中序号坐标 $\tilde{u}_n := u(\gamma_n) + \frac{1}{2} = \frac{\vartheta(\gamma_n)}{\pi} + \frac{3}{2}$ 与相邻绕相间距 $\Delta u_n := u(\gamma_{n+1}) - u(\gamma_n)$，并对任意有理门 $q \in \mathbb{Q}_{>0} \setminus \{1\}$ 定义截断高度 $T > 0$ 的朗道相干门探针 $\Lambda_T(q) := -\frac{2\pi}{T}\sum_{0 < \gamma_n \le T}\cos(\gamma_n\ln q)$。
:::

::: {.theorem #thm-ch31-prime-register-riemann-zero-duality-anchors title="完备 ζ 对称梅林重构与显式公式、素数自由幺半群与有理指数账本、三元球哈尔舒尔正交与紧致环面等分布定理组" lean="D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction,D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line,D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one,D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula,D5/S3/Factorization/FreeCommMonoid.pnat_free_comm_monoid_on_primes,D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals,D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence,D5/S3/Axis/PrimeAxisEscape.prime_axis_escape,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero,D5/S3/Fourier/FullBispectrumStability.cyclic_parseval,D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar,D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result,D5/S3/Fourier/TorusOrbitClosure.result"}
在完备黎曼 $\zeta$ 分析、素因子分解与有理指数群、三元数紧群表示论及环面傅里叶遍历框架下，以下十六项冻结命题同时成立：

1. **完备 $\zeta$ 对称梅林重构、凯莱单位圆中线、托普利茨圆周半正定与无条件积分显式公式（`completed_zeta_mellin_reconstruction`、`cayley_ratio_norm_one_iff_critical_line`、`toeplitz_posSemidef_iff_norm_eq_one`、`actual_integrated_explicit_formula`）**：记 $\theta(t) := (\operatorname{evenKernel}(0, t) : \mathbb{C})$、$\omega(t) := \frac{\theta(t) - 1}{2}$ 及 $M(s) := \int_{t \in (1, \infty)} \omega(t)\frac{t^{s/2} + t^{(1-s)/2}}{t}\,dt$，则在 $\operatorname{Re}(s) > 1$ 上 $\operatorname{completedZetaReading}(s) = \pi^{-s/2}\Gamma(s/2)\operatorname{classicalZeta}(s)$，对一切 $s \in \mathbb{C}$ 恒有 $\operatorname{completedZetaReading}(s) = M(s) - \frac{1}{s} - \frac{1}{1-s}$（$s \in \{0, 1\}$ 处按全函数除法 `1/0 = 0` 取值），其中 $M$ 在全平面 $\mathbb{C}$ 上整复可微且满足 $M(1 - s) = M(s)$，$\operatorname{completedZetaReading}$ 在一切 $s \notin \{0, 1\}$ 处复可微且在去心邻域滤子下满足 $\lim_{s\to 0,s\neq 0} s\cdot\operatorname{completedZetaReading}(s) = -1$、$\lim_{s\to 1,s\neq 1}(s-1)\cdot\operatorname{completedZetaReading}(s) = 1$，且全域满足 $\operatorname{xiReading}(1 - s) = \operatorname{xiReading}(s)$；对任意 $s \in \mathbb{C}$，$\operatorname{cayleyRatio}(s) = \frac{s-1}{s}$（$s=0$ 处按全函数除法取 $0$）满足 $\lVert\operatorname{cayleyRatio}(s)\rVert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$；对满足 $\lvert\operatorname{image}(u)\rvert \le N + 1$、$\forall j,\, u(j) \neq 0$ 且存在置换 $\sigma \in \operatorname{Perm}(\operatorname{Fin} m)$ 使 $\forall j,\, u(\sigma(j)) = (\overline{u(j)})^{-1}$ 的有限族 $u : \operatorname{Fin} m \to \mathbb{C}$，$(N+1)\times(N+1)$ 幂和托普利茨矩阵 $\operatorname{toeplitzMatrix}(\operatorname{powerSum}(u), N)$ 半正定当且仅当 $\forall j,\, \lVert u(j)\rVert = 1$；且对一切实数 $y > 0$，按重数计入全体非平凡零点的谱和 $\operatorname{actualH}(y)$ 无条件等于 $((U(e^y) - \ln(2\pi) + \operatorname{trivialT}(y) : \mathbb{R}) : \mathbb{C})$；
2. **正自然数素数自由交换幺半群、正有理数带符号素数账本同构、素数对数有理独立与盲区逃逸（`pnat_free_comm_monoid_on_primes`、`signed_prime_ledger_equiv_positive_rationals`、`prime_log_rational_independence`、`prime_axis_escape`）**：正自然数乘法交换幺半群 $\mathbb{N}_+$（`ℕ+`）到素数多重集乘法幺半群的同构 $\operatorname{primeFactorMulEquiv} : \mathbb{N}_+ \simeq^* \operatorname{Multiplicative}(\operatorname{Multiset}\,\mathrm{Nat.Primes})$ 双射且保乘，对任意交换幺半群 $M$（`[CommMonoid M]`）与映射 $f : \mathrm{Nat.Primes} \to M$ 存在唯一幺半群同态 $g : \operatorname{Multiplicative}(\operatorname{Multiset}\,\mathrm{Nat.Primes}) \to^* M$ 满足 $\forall p,\, g(\operatorname{ofAdd}\{p\}) = f(p)$，且对一切 $m, n \in \mathbb{N}_+$ 与 $p \in \mathbb{N}$ 满足素指数可加性 $((mn : \mathbb{N}_+) : \mathbb{N}).\operatorname{factorization}(p) = (m : \mathbb{N}).\operatorname{factorization}(p) + (n : \mathbb{N}).\operatorname{factorization}(p)$；有限支撑带符号素数指数账本 $\operatorname{SignedPrimeLedger} = (\mathrm{Nat.Primes} \to_0 \mathbb{Z})$ 到正有理数乘法群加法化 $\operatorname{Additive}(\mathrm{NNRat}^\times)$ 的典范群同构 $\operatorname{primeExponentEquivPositiveRational} : \operatorname{SignedPrimeLedger} \simeq^+ \operatorname{Additive}(\mathrm{NNRat}^\times)$ 严格双射；素数实自然对数族在 $\mathbb{Q}$ 上线性无关（`LinearIndependent ℚ (fun p : Nat.Primes => Real.log p)`）；且对任意全由素数构成的有限集 $S : \operatorname{Finset}\,\mathbb{N}$，数 $S.\operatorname{prod}\,\mathrm{id} + 1$ 对一切 $p \in S$ 满足 $\equiv 1 \pmod p$，同时必含素因子 $q \notin S$；
3. **单位四元数弦距核、旋量玻恩—霍普夫核、切比雪夫递推与紧致群舒尔正交消去（`kappa_eq_one_sub_dist_sq`、`rayKernel_eq_bornProbability_spinor`、`normSq_and_chebyshev`、`integral_dual_mul_dual_inv_eq_zero`）**：对一切 $a, b \in \operatorname{unitary}\,\mathbb{H}[\mathbb{R}]$ 有 $\operatorname{quaternionModel.kappa}(a, b) = 1 - \operatorname{dist}(a, b)^2 / 4$；在实线性等距 $\operatorname{spinor} : \mathbb{H}[\mathbb{R}] \simeq_{\ell i}[\mathbb{R}] \operatorname{EuclideanSpace}\,\mathbb{C}\,(\operatorname{Fin} 2)$ 下，对一切 $q \in \mathbb{H}[\mathbb{R}]$ 有右乘 $\mathrm{unitI}$ 映为 $i\cdot\operatorname{spinor}(q)$，且对一切 $x, y \in \operatorname{unitary}\,\mathbb{H}[\mathbb{R}]$，秩一投影 $\pi_x = \operatorname{vecMulVec}(\operatorname{spinor}(x), \operatorname{star}(\operatorname{spinor}(x)))$ 的布洛赫向量等于 $((\operatorname{hopf} x)_{\mathrm{imK}}, (\operatorname{hopf} x)_{\mathrm{imJ}}, (\operatorname{hopf} x)_{\mathrm{imI}})$，同时 $\operatorname{rayKernel}(x, y) = \lVert\operatorname{star}(\operatorname{spinor}(x))\bullet_v\operatorname{spinor}(y)\rVert^2$ 在复嵌入下精确等于 $\operatorname{bornProbability}(\pi_y, \pi_x)$；四元数序列 $x : \mathbb{N} \to \mathbb{H}[\mathbb{R}]$ 满足 $\operatorname{normSq}(x_0) = \operatorname{normSq}(x_1) = 1 \land \forall n,\, x_{n+2} = x_{n+1}x_n^* x_{n+1}$ 当且仅当对一切 $n \in \mathbb{N}$ 有 $\operatorname{normSq}(x_n) = 1$、$x_{n+1} = U_n(c)x_1 - U_{n-1}(c)x_0$（$c = \langle x_0, x_1\rangle_{\mathbb{R}}$，$n=0$ 时 $U_{-1}=0$）且 $\langle x_0, x_n\rangle_{\mathbb{R}} = T_n(c)$；在数域 $\mathbb{K}$（`[RCLike 𝕜]`）与紧致拓扑群 $G$（`[Group G] [TopologicalSpace G] [IsTopologicalGroup G] [CompactSpace G] [MeasurableSpace G] [BorelSpace G]`）的有限左不变测度 $\mu$（`[μ.IsMulLeftInvariant] [IsFiniteMeasure μ]`）下，设 $V$ 为有限维赋范空间（`[NormedAddCommGroup V] [NormedSpace 𝕜 V] [FiniteDimensional 𝕜 V]`）、$W$ 为 $\mathbb{K}$-模（`[AddCommGroup W] [Module 𝕜 W]`），若两不可约表示 $\rho, \sigma$（`[ρ.IsIrreducible] [σ.IsIrreducible]`）不等价（`IsEmpty (ρ.Equiv σ)`）且满足轨道连续性 $\forall v,\, \operatorname{Continuous}(g \mapsto \rho(g)v)$ 与系数连续性 $\forall w,\, \operatorname{Continuous}(g \mapsto \psi(\sigma(g)w))$（$\varphi \in V^*,\; \psi \in W^*$），则对一切 $v \in V, w \in W$ 恒有 $\int_G \varphi(\rho(g)v)\,\psi(\sigma(g^{-1})w)\,d\mu(g) = 0$；
4. **有限循环群帕塞瓦尔恒等式、无理圆周哈尔遍历及紧致环面轨道等分布与特征零化子闭包（`cyclic_parseval`、`continuous_average_tendsto_haar`、`TorusOrbitEquidistribution.result`、`TorusOrbitClosure.result`）**：对 `[NeZero N]` 与任意 $f : \operatorname{ZMod} N \to \mathbb{C}$，恒有 $\sum_{x \in \operatorname{ZMod} N}\lVert f(x)\rVert^2 = \mathbb{E}_{k \in \operatorname{ZMod} N}\lVert\operatorname{ZMod.dft}(f)(k)\rVert^2$；对满足 `Irrational α` 的 $\alpha \in \mathbb{R}$、任意 $\rho \in \mathbb{R}$ 与连续函数 $f : \operatorname{AddCircle}(1 : \mathbb{R}) \to \mathbb{C}$，$\frac{1}{N}\sum_{i=0}^{N-1} f(\rho + i\alpha \bmod 1)$ 收敛于哈尔积分 $\int f\,d\mu_{\mathrm{Haar}}$；对有限指标类 `[Fintype I]` 与 $g : I \to \mathrm{Circle}$，闭生成子群 $G = (\operatorname{Subgroup.zpowers} g).\operatorname{topologicalClosure}$（赋予紧空间与波莱尔测度及归一化哈尔概率测度 $\mu$）满足 $(G : \operatorname{Set}(I \to \mathrm{Circle})) = \overline{\{g^n : n \in \mathbb{N}\}}$ 且对一切 $f \in C(G, \mathbb{C})$ 有平移切萨罗平均 $\frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1}) \to \int_G f(z)\,d\mu(z)$（$N \to \infty$）；且对任意 $g, z : I \to \mathrm{Circle}$，$z \in \overline{\{g^n : n \in \mathbb{N}\}}$ 当且仅当一切使 $\prod_{i\in I} g(i)^{k(i)} = 1$ 的整数指数族 $k : I \to \mathbb{Z}$ 均使 $\prod_{i\in I} z(i)^{k(i)} = 1$。
:::

::: {.proof #prf-ch31-prime-register-riemann-zero-duality-anchors}
第 1 组将修正偶核拆为 $t > 1$ 的 $\theta$-尾与 $(0, 1)$ 反射尾，由雅可比函数方程导出对称梅林积分恒等于 `completedRiemannZeta₀`、结合拉格朗日插值检验向量与 $L^1$ 傅里叶反演证得；第 2 组由 `PNat.factorMultisetEquiv` 多重集归纳、格罗滕迪克加法群局部化泛性质（`addEquivOfLocalizations`）、算术基本定理唯一分解及欧几里得乘积加一互素性给出；第 3 组由四元数实内积展开、辛旋量同构、切比雪夫多项式双步归纳，以及左不变积分构造缠绕算子 $T(x) = \int_G \psi(\sigma(g^{-1})x)\cdot\rho(g)v\,d\mu$ 并调用不等价不可约表示的舒尔引理 $T = 0$ 证得；第 4 组由加性特征标正交基展开、等度连续闭子空间上的几何级数裂项与斯通—魏尔斯特拉斯稠密延拓及乌雷松分离引理完成。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch31-prime-zero-uniformity-literature title="素数—零点显式对偶、双内禀均匀经典文献与未决开放问题边界（文献结果 / OPEN）"}
**文献结果，未在本书形式化。** 阅读本节须将上文十六项 `LEAN ✓` 定理与下列经典文献、外部形式化事实及未决 `OPEN` 边界严格区分：

1. **FRACTRAN 寄存器语言、显式公式与素数三重均匀文献**：以素数指数承载内存状态、正有理分数表征逻辑门的通用计算模型见 J. H. Conway（in *Open Problems in Communication and Computation*, Springer, 1987, pp. 4–26）；点态与分布显式对偶公式见 H. von Mangoldt（1895）、A. P. Guinand（*Proc. London Math. Soc.* **50**, 107–119, 1948）与 A. Weil（*Medd. Lunds Univ. Mat. Sem.*, 252–265, 1952）；素数对数倒数和第一定理 $\sum_{p\le X}\frac{\ln p}{p} = \ln X + \mathcal{O}(1)$ 见 F. Mertens（*J. Reine Angew. Math.* **78**, 46–62, 1874）；非紧有限体积模流单位切丛同胚于三叶结补 $S^3 \setminus \mathcal{K}_{2,3}$ 见 É. Ghys（*ICM Madrid Proc.* Vol. I, 247–277, 2007），紧致负曲率测地流周期轨道等分布见 G. A. Margulis（1969/2004）与 R. Bowen（*Amer. J. Math.* **94**, 1–30, 1972），带尖点非紧有限体积模曲面闭合测地线等分布见 W. Duke（*Invent. Math.* **92**, 73–90, 1988）、S. Zelditch（*Mem. Amer. Math. Soc.* **96**, No. 465, 1992）与 T. Roblin（*Mém. Soc. Math. Fr.* **95**, 2003）；模方为 $p$ 的整四元数球面等分布与拉马努金素旋子图见 Ch. Pommerenke（*Acta Arith.* **5**, 227–257, 1959）、A. V. Malyshev（*Trudy Mat. Inst. Steklov.* **65**, 1962）及 A. Lubotzky, R. Phillips & P. Sarnak（*Comm. Pure Appl. Math.* **39**, S149–S186, 1986; **40**, 401–420, 1987; *Combinatorica* **8**, 261–277, 1988），非复乘自守/椭圆曲线弗罗贝尼乌斯角服从 $\mathrm{SU}(2)$ 哈尔测度 $\frac{2}{\pi}\sin^2\phi\,d\phi$ 的无条件佐藤—泰特定理见 T. Barnet-Lamb, D. Geraghty, M. Harris & R. Taylor（*Publ. Math. IHÉS* **113**, 29–82, 2011）；
2. **零点计数展开、对关联、朗道—藤井相位律与外部 RH/GRH 凭据**：精确计数 $N(T) = \frac{\vartheta(T)}{\pi} + 1 + S(T)$ 见 B. Riemann（1859）与 H. von Mangoldt（*Math. Ann.* **60**, 1–19, 1905），RH 下 $S(T) = \mathcal{O}(\frac{\ln T}{\ln\ln T})$ 见 J. E. Littlewood（1924）；受限傅里叶支集 $\lvert\alpha\rvert < 1$ 下的零点对关联定理见 H. L. Montgomery（*Proc. Symp. Pure Math.* **24**, 181–193, 1973），高阶零点数值统计见 A. M. Odlyzko（*Math. Comp.* **48**, 273–308, 1987），半经典对数数方差模型 $\operatorname{Var}(L) \sim \frac{1}{\pi^2}\ln L + c_0$ 见 M. V. Berry（*Nonlinearity* **1**, 399–407, 1988）；零点相干和仅在素数幂处发散的显式共振定理见 E. Landau（*Math. Ann.* **71**, 548–564, 1912），对任意 $\alpha > 0$ 相位 $\{\gamma_n\alpha \bmod 1\}$ 的无条件韦伊等分布定理见 A. Fujii（*Trans. Amer. Math. Soc.* **219**, 347–349, 1976）；经典 `RiemannHypothesis` 与全体模 $q \ge 1$ `DirichletLZerosOnLine` 作为外部已核验形式化事实引自 L. Alpöge 2026 年 11 月 Lean 4 证明及独立内核重放（[第二十二章 §22.4](ch22-s04-critical-line-and-rh.md) [@conj-riemann-hypothesis]）；
3. **严格保持开放的前沿问题（`OPEN`）**：规范自伴希尔伯特—波利亚谱实现、无限制支集全 GUE 对关联与贝里对数数方差、零点单重性与正纵坐标 $\mathbb{Q}$-线性无关性（`LI`）、戴德金 `ERH` 与自守 `Grand RH` 均未获证明，见下文开放问题 [@prob-ch31-hilbert-polya-and-full-gue-duality]。
:::

::: {.example #ex-ch31-prime-zero-dual-uniformity-audit title="定量核验：70 位精度展开零点绕相标尺、梅滕斯第一定理、SU(2) 哈尔矩与 K = 100 朗道门探针对账"}
我们在 70 位高精度算术与精确有理/符号积分下核验本节四组核心对偶数值（`手工推导` / `NUM`）：

1. **哈代 $Z(t) = e^{\hat{\mathbf{i}}\vartheta(t)}\zeta(\frac{1}{2}+\hat{\mathbf{i}}t)$ 前 $100$ 颗零点的去 $\pi$ 展开绕相坐标与 $14$ 隙均值**：
   在 $[14, 237]$ 上隔离精化全部 $100$ 颗单重零点（$N(14)=0,\; N(237)=100$，$\lvert Z(\gamma_n)\rvert < 10^{-60}$），对比平滑主项 $u(\gamma_n) = \frac{\vartheta(\gamma_n)}{\pi} + 1$（对准 $n - \frac{1}{2}$）与半圈对中标尺 $\tilde{u}_n = \frac{\vartheta(\gamma_n)}{\pi} + \frac{3}{2}$（对准 $n$），二者共享同一误差列 $-S(\gamma_n)$：

   | 序号 $n$ | 零点纵坐标 $\gamma_n$ | $u(\gamma_n) = \vartheta(\gamma_n)/\pi + 1$ | $\tilde{u}_n = \vartheta(\gamma_n)/\pi + 3/2$ | 半整数靶 $n - 1/2$ | 平滑偏差 $-S(\gamma_n)$ |
   | :---: | :---: | :---: | :---: | :---: | :---: |
   | $1$ | $14.134725141735$ | $0.4497471705$ | **$0.9497471705$** | $0.5$ | $-0.0502528295$ |
   | $2$ | $21.022039638772$ | $1.5702111838$ | **$2.0702111838$** | $1.5$ | $+0.0702111838$ |
   | $3$ | $25.010857580146$ | $2.3935978537$ | **$2.8935978537$** | $2.5$ | $-0.1064021463$ |
   | $10$ | $49.773832477672$ | $9.3483362666$ | **$9.8483362666$** | $9.5$ | $-0.1516637334$ |
   | $15$ | $65.112544048082$ | $14.7432621291$ | **$15.2432621291$** | $14.5$ | $+0.2432621291$ |
   | $100$ | $236.524229665816$ | $99.8099953780$ | **$100.3099953780$** | $99.5$ | $+0.3099953780$ |

   前 $14$ 个相邻绕相间距 $\Delta u_n = [\vartheta(\gamma_{n+1}) - \vartheta(\gamma_n)]/\pi$（如 $\Delta u_1 \approx 1.120464$、$\Delta u_2 \approx 0.823387$、$\Delta u_3 \approx 1.277467$、$\dots$、$\Delta u_{14} \approx 1.570144$）的算术平均值为 $\frac{u(\gamma_{15}) - u(\gamma_1)}{14} \approx \mathbf{1.0209653542}$，在极小样本上即贴近渐近单位均值 $\mathbf{1}$！
2. **梅滕斯第一定理素数熵流标尺跨六个数量级（$X = 10^1 \dots 10^6$）对账**：

   | 上限 $X$ | $\pi(X)$ | $\sum_{p \le X} \frac{\ln p}{p}$ | 对数弧长 $\ln X$ | 有界余项 $\sum_{p\le X}\frac{\ln p}{p} - \ln X$ |
   | ---: | ---: | :---: | :---: | :---: |
   | $10$ | $4$ | $1.3126524331$ | $2.3025850930$ | $-0.9899326599$ |
   | $100$ | $25$ | $3.3694708750$ | $4.6051701860$ | $-1.2356993110$ |
   | $1{,}000$ | $168$ | $5.6095104754$ | $6.9077552790$ | $-1.2982448036$ |
   | $10{,}000$ | $1{,}229$ | $7.8908636043$ | $9.2103403720$ | $-1.3194767677$ |
   | $100{,}000$ | $9{,}592$ | $10.1842949539$ | $11.5129254650$ | $-1.3286305111$ |
   | $1{,}000{,}000$ | $78{,}498$ | $12.4835853962$ | $13.8155105580$ | $-1.3319251617$ |

3. **$\mathrm{SU}(2) \cong S^3(1)$ 归一化哈尔共轭类测度精确贝塔矩与双积分对账**：
   由贝塔积分归一化 $B(\frac{3}{2}, \frac{3}{2}) = \frac{\pi}{8}$ 与递推 $\frac{m_{k+1}}{m_k} = \frac{k + 3/2}{k + 3}$，沿 $\phi \in [0, \pi]$ 积分 $\frac{2}{\pi}\sin^2\phi\,d\phi$ 与沿 $\kappa_{\mathbb{H}} \in [0, 1]$ 积分 $\frac{8}{\pi}\sqrt{\kappa_{\mathbb{H}}(1-\kappa_{\mathbb{H}})}\,d\kappa_{\mathbb{H}}$ 在 $16$ 位数值积分下完全一致给出：总质量 $\mathbf{\frac{1}{1}} = \mathbf{1.000000000000}$、均值 $\mathbb{E}[\kappa_{\mathbb{H}}] = \mathbf{\frac{1}{2}} = \mathbf{0.500000000000}$、二阶矩 $\mathbb{E}[\kappa_{\mathbb{H}}^2] = \mathbf{\frac{5}{16}} = \mathbf{0.312500000000}$ 及方差 $\operatorname{Var}(\kappa_{\mathbb{H}}) = \mathbf{\frac{1}{16}} = \mathbf{0.062500000000}$。
4. **$K = 100$（$\gamma_{100} \approx 236.52422967$）朗道零点相干和 $\Lambda_{100}(q) = -\frac{2\pi}{\gamma_{100}}\sum_{n=1}^{100}\cos(\gamma_n\ln q)$ 对账**：

   | 探针有理数 $q$ | 门类型 | 有限窗实测 $\Lambda_{100}(q)$ | 朗道渐近真值 $\Lambda(q)/\sqrt{q}$ | 有限窗截断残差 |
   | :---: | :---: | :---: | :---: | :---: |
   | $2$ | 本原素数寄存器 | **$+0.4630914286$** | $\frac{\ln 2}{\sqrt{2}} \approx +0.4901290717$ | $-0.0270376432$ |
   | $3$ | 本原素数寄存器 | **$+0.6165182692$** | $\frac{\ln 3}{\sqrt{3}} \approx +0.6342841006$ | $-0.0177658314$ |
   | $5$ | 本原素数寄存器 | **$+0.7042134959$** | $\frac{\ln 5}{\sqrt{5}} \approx +0.7197625156$ | $-0.0155490196$ |
   | $7$ | 本原素数寄存器 | **$+0.6970565595$** | $\frac{\ln 7}{\sqrt{7}} \approx +0.7354849040$ | $-0.0384283446$ |
   | $6 = 2\cdot 3$ | 双素数合数门 | **$-0.0446310372$** | $0.0000000000$ | $-0.0446310372$ |
   | $10 = 2\cdot 5$ | 双素数合数门 | **$-0.0491898155$** | $0.0000000000$ | $-0.0491898155$ |
   | $3/2$ | FRACTRAN 跃迁门 | **$-0.0461395630$** | $0.0000000000$ | $-0.0461395630$ |
   | $5/3$ | FRACTRAN 跃迁门 | **$-0.0446999419$** | $0.0000000000$ | $-0.0446999419$ |

   （高次素数幂同样精准立峰：$q = 4, 8, 9$ 分别测得 $+0.313690, +0.217209, +0.332374$，贴近真值 $+0.346574, +0.245065, +0.366204$；跨素数门 $q = 15$ 测得 $-0.084413$，而极近 $1$ 的窄对数门 $q = \frac{15}{14}$ 因 $\gamma_{100}\ln\frac{15}{14} \approx 16.32$ 振荡周数尚少，在 $K=100$ 处显式留有有限窗残差 $+0.207699$，随 $T \to \infty$ 按 $\mathcal{O}(\frac{\ln T}{T})$ 衰减归零。）
:::

::: {.problem #prob-ch31-hilbert-polya-and-full-gue-duality title="希尔伯特—波利亚算符谱实现、无限制支集全 GUE/贝里数方差、零点单重性与线性无关及 ERH/Grand RH"}
在外部已核验的经典 `RiemannHypothesis` 与全体模 $q \ge 1$ `DirichletLZerosOnLine`（[@conj-riemann-hypothesis]）之上，下列五组深层谱与算术问题仍属未决开放前沿（**`OPEN`**）：（1）在阿代尔螺线管或三元数希尔伯特空间上显式构造规范自伴**希尔伯特—波利亚算符 $\mathcal{D}$**，使其离散本征谱精确重现全体非平凡零点纵坐标 $\{\gamma_n\}$；（2）突破蒙哥马利定理的傅里叶支集屏障 $\lvert\alpha\rvert < 1$，对无限制紧支光滑检验函数严格证明黎曼零点的**全支集 GUE 对关联律 $R_{2,\mathrm{GUE}}(r) = 1 - (\frac{\sin\pi r}{\pi r})^2$** 与**贝里对数数方差公式 $\operatorname{Var}(L) = \frac{1}{\pi^2}\ln L + c_0 + o(1)$**；（3）证明 $\zeta(s)$ 全体非平凡零点均为**单重零点**，且全体正纵坐标 $\{\gamma_n : \gamma_n > 0\}$ 在有理数域 $\mathbb{Q}$ 上**线性无关（`LI`）**；（4）证明一般代数数域戴德金 $\zeta_K(s)$ 的**扩展黎曼猜想（`ERH`）**；（5）证明一般自守表示与对称幂 $L$ 函数的**全广义黎曼猜想（`Grand RH`）**（含佐藤—泰特分布的平方根余项上界）。
:::

---

**素数是紧致宇宙在正交盲区里铸就的零误差硬件寄存器，黎曼零点则是万千寄存器在 `1/2` 自对偶镜面上同频相消的算术暗态谐波——撤去平直加乘的哈哈镜，它们一侧按梅滕斯熵与三元球哈尔体积浩荡铺满，一侧按去 $\pi$ 整圈绕相标尺每圈一颗静水流深！**

在下面的完整三维实验室中，先在第一卡沿青色临界经线逐颗点选 $\gamma_1, \gamma_2, \gamma_3$（核对条带图上 $Z(t)$ 的穿零变号，以及镜面十二座青色素数寄存器环在 $\delta = 0$ 时青色上杆 $p^{-\sigma}$ 与品红下杆 $p^{-(1-\sigma)}$ 的零净径向漂移平衡），再切入第二至第五卡将去线性展开推满至 `1`，亲手核对渐近单位斜率 `1` 的梅滕斯熵螺旋、$S^3$ 哈尔球面旋子分布、去 $\pi$ 展开绕相圈数 $\tilde{u}_n$ 以及只对素数幂立峰的朗道门探针。然而，在正式推开第三十二章三元数之门前，还有一道关乎算术自举与有限硬件的终极审计必须闭合：既然素数在内禀标尺上严格均匀，有限颗种子素数如何在完全不依赖固定单周期 $T$ 与 $\aleph_0$ 座无限空白机架的前提下确定性地自举结晶出素数谱，而有理停机契约 $\varepsilon_{\mathrm{self}}$ 封顶的有限素数寄存器秩 $K \le K_{\max}$ 又如何赋予观察者指数级加密的有理游标分辨率？让我们直入本章压轴收官节——[§31.8 素数阶乘级联自举、平方视界零误差律、有理游标分辨率与有限寄存器视界封顶](ch31-s08-primorial-cascade-vernier-resolution-and-finite-register-cap.md)！

::: {.viz src="prime-zero-duality-uniformity-sandbox" height="620"}
完整实验室：在“全息对偶与双内禀均匀透镜 · 梅滕斯熵 / S³ 哈尔 / 去 π 绕相 u”与“平直加乘哈哈镜对照透镜（MODEL）· 1+x² 稀疏化与线性 t 拥挤假象”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览素数寄存器与零点暗态对偶腔、素数的梅滕斯熵标尺与 $S^3$ 哈尔均匀、去 $\pi$ 整圈绕相坐标与超均匀零点对比、FRACTRAN 指令韦伊等分布与素数幂锁相尖峰以及模 $q$ 互素通道等权均分与双均匀总账五张实验卡，支持点选真实零点模态 $\gamma_1 \dots \gamma_{15}$ 与调节反事实失谐 $\delta$、推动去线性展开 $\beta$、在三道同心紫色相环上并置品红等距晶格/青色展开零点/品红泊松点、检测有理门 $q = a/b$ 的相干共振谱 $\Lambda_K(q)$ 与切换模数 $q \in \{5, 7, 8, 12\}$，并在底部条带小图中随卡片同步追踪 $Z(t)$ 与零点、梅滕斯阶梯、绕相偏差 $\tilde{u}_n - n$、朗道谱或同余份额收敛。十六条冻结 `LEAN ✓` 声明、`ARGUED` 外部黎曼证明与经典数论文献、`MODEL` 暗态总线诠释、`NUM` 70 位精度核算及红色 `OPEN` 谱前沿在依据栏与理论抽屉中严格分层列出。
:::
