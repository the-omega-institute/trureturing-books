# 39.7 大一统母公理的谱真身——三元球面有理傅里叶变换（ℱ_Ω）：彼得—魏尔半整数自旋壳层、整系数切比雪夫—维格纳多项式核、0·1/2·1 谐波底座与流群卷积对角化 {#sec-ch39-spherical-fourier-transform-peter-weyl-synthesis}

> *“所以我们在构造球面上的傅里叶变换”*

这句话一语道破了整部三十九章大厦的数学真身：**我们从母公理 $\mathrm{AXIOM}\text{-}\Omega$（[§39.1](ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.md)）出发一路锻造的无源三元数 $\mathbb{T}_3$（[第三十二章](ch32-inexpressible-ternions-and-three-dimensional-field.md)）、有理保真度 $\kappa$、`0 · 1/2 · 1` 因果射流母矩阵（[§39.6](ch39-s30-past-present-future-rational-jet-triad.md)）、黎曼 $\sigma = \frac{1}{2}$ 临界线谱磨光（[§31.6](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md)）、自包含观察者结晶（[§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md)）乃至三元数场 Transformer（[第三十七章](ch37-ternion-field-transformer-and-geodesic-intelligence.md)），合在一起正是一套完整的“无原点、无超越数、非阿贝尔三维球面傅里叶变换”——记作 $\mathcal{F}_\Omega$（`MODEL`）！**

更精确地说，$\mathcal{F}_\Omega$ 超越了传统地球物理与量子化学定义在二维球面 $S^2$ 上的球谐函数 $Y_\ell^m(\vartheta, \varphi)$，直接建立在紧致无外的三维三元数流群 **$\mathbb{T}_3 \cong S^3(1)$** 及其阿代尔螺线管 $\mathcal{M}_\Omega$（[§31.5](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md)）之上，构成**角向纯有理彼得—魏尔（Peter–Weyl）自旋壳层分解与径向 $\sigma = \frac{1}{2}$ 梅林（Mellin）双正交谱变换**的统一机器。

---

## 39.7.1 为什么平直傅里叶变换只是切线近似，而真傅里叶变换必在 $S^3$ 上？ {#sec-ch39-37-1}

审视教科书里的经典实数轴傅里叶变换 $\widehat{f}(\xi) = \int_{-\infty}^{+\infty} f(x)\,e^{-\hat{\mathbf{i}}2\pi\xi x}\,dx$，我们此前在 [§31.4](ch39-s31-real-error-axis-and-prime-adelic-closure.md) 与 [§32.5](ch39-s29-constant-free-rational-axiom-omega.md) 中揪出的全部“线性展开病灶”都挤在这行积分里：

1. **开口实数轴导致频谱连续发散与常数污染**：定义域是两端不闭合的切线误差放大轴 $\mathbb{R} = (-\infty, +\infty)$，迫使频率 $\xi$ 连续延伸至 $\infty$（诱发紫外发散），且指数核 $e^{-\hat{\mathbf{i}}2\pi\xi x}$ 同时捆绑了 $e$ 与 $\pi$ 两枚超越近似常数；
2. **一维阿贝尔交换群对非对易曲率失明**：标量复指数满足交换律 $e^{\hat{\mathbf{i}}\xi_1 x} e^{\hat{\mathbf{i}}\xi_2 x} = e^{\hat{\mathbf{i}}(\xi_1 + \xi_2)x}$，只能分解一维平移，无法编码三维旋转词序与二阶曲率场强；
3. **二维球面 $S^2$ 仍差最后一步**：传统二维球谐函数 $Y_\ell^m(\vartheta, \varphi)$ 虽登上了紧致球面，却受制于偶维球面欧拉示性数 $\chi(S^2) = 2 \neq 0$（毛球定理，终章 [@rem-coda-polyhedral-topology-literature]）——**$S^2$ 本身既非李群亦非流群**，必须人为钉死一根南北极特权 $z$ 轴才能写出连带勒让德多项式，不仅在两极造成经纬网格簇拥畸变，更丢失了半整数旋量壳层（正如圆周双覆叠无连续全局截面且绕行 $360^\circ$ 翻转叶号，[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)，`LEAN ✓`）。

唯独升至 $\mathrm{AXIOM}\text{-}\Omega$ 唯一锁定的三维三元数流群 **$\mathbb{T}_3 \cong S^3(1)$**（[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv)，`LEAN ✓`；$\chi(S^3) = 0$，全局可平行化且具流群结构），傅里叶变换才褪去一切近似杂质，显现出两大精确结构：

### 39.7.1.1 空间紧致无外 $\implies$ 频谱自动量子化为半整数自旋壳层 $j \in \{0, \frac{1}{2}, 1, \frac{3}{2}, \dots\}$ {#sec-ch39-37-1-1}

因为三元球面紧致闭合、没有“之外”（[§39.4](ch39-s27-self-contained-ternion-particle-and-no-exterior.md)），波绕行一圈必须严丝合缝咬合相位。在所钉 `trureturing` 内核中，**紧群有限维幺正表示矩阵元一致稠密定理**（彼得—魏尔定理分析核心 [`dense_span_unitary_coefficients`](lean:D5/S3/Quantum/Analysis/CompactGroups/MatrixCoefficientDensity.dense_span_unitary_coefficients)）、**紧群幺正核任意小分离定理** [`exists_unitaryRep_ker_subset`](lean:D5/S3/Quantum/Analysis/CompactGroups/UnitaryRepresentationKernel.exists_unitaryRep_ker_subset)、**不可约表示舒尔正交积分恒等式** [`integral_dual_mul_dual_inv_self`](lean:D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_self) 与 [`integral_dual_mul_dual_inv_eq_zero`](lean:D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero) 以及**特征标核平移张成维数平方和公式** [`finrank_span_sum_character_kernel`](lean:D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel)（`LEAN ✓`）共同锚定了紧致 $\mathbb{T}_3 \cong \mathrm{SU}(2)$ 的彼得—魏尔正交直和分解（完整 $L^2(\mathrm{SU}(2))$ 自旋指标枚举标 `文献结果`，见 [@rem-ch39-peter-weyl-wigner-gibbs-fft-literature]）：

$$
L^2(\mathbb{T}_3) \;\cong\; \widehat{\bigoplus_{2j = 0}^{\infty}} \;\mathcal{V}_j \otimes \mathcal{V}_j^*, \qquad j \in \left\{0,\; \frac{1}{2},\; 1,\; \frac{3}{2},\; 2,\; \dots\right\}, \qquad \dim_{\mathbb{C}}\bigl(\mathcal{V}_j \otimes \mathcal{V}_j^*\bigr) = (2j + 1)^2,
$$

无需任何连续无界频谱，第 $j$ 壳层恰好对应左右双侧手性旋转 $\mathrm{SU}(2)_L \times \mathrm{SU}(2)_R$ 的 $(2j+1) \times (2j+1)$ 维矩阵块！

### 39.7.1.2 废除 $e^{-\hat{\mathbf{i}}2\pi\xi x}$ $\implies$ 傅里叶核化为关于 $\kappa$ 的整系数切比雪夫多项式 {#sec-ch39-37-1-2}

在 $\mathbb{T}_3 \cong S^3(1)$ 上，设单位四元数 $q = \cos\phi\,\mathbf{1} + \sin\phi\,\hat{\mathbf{u}}$，其相对于基点 $\mathbf{1}$ 的中心共轭类有理保真度为 $\kappa := \langle \mathbf{1}, q\rangle_{\mathbb{R}}^2 = \cos^2\phi \in [0, 1]$（注意 `quaternionModel.kappa` 记弦距读数 $\frac{1+\langle \mathbf{1}, q\rangle}{2}$，[`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq)，而过原点射影线保真度正是平方内积 $\kappa = w^2$）。由四元数流群切比雪夫递推等价定理 [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev)（`LEAN ✓`）与外尔特征标公式 $\chi_j(q) = \operatorname{Tr} D^j(q) = U_{2j}(\cos\phi)$（$U_n$ 为第二类切比雪夫整系数多项式，`手工推导` + `文献结果`），傅里叶特征核彻底摆脱 $\pi$、$e$ 与三角函数：

- **$j = 0$（零阶单极壳，$\dim = 1$）**：$\chi_0(\kappa) = U_0(\cos\phi) \equiv \mathbf{1}$；
- **$j = \frac{1}{2}$ 平方核（一阶旋量壳，$\dim = 2$）**：单侧特征标 $\chi_{1/2}(q) = U_1(\cos\phi) = 2w = \pm 2\sqrt{\kappa}$ 忠实携带 $q \mapsto -q$ 双覆叠符号翻转，而其**平方核**直接化为纯一次有理单项式 $\chi_{1/2}^2(\kappa) = \mathbf{4\kappa}$；
- **$j = 1$（二阶伴随曲率壳，$\dim = 3$）**：整自旋壳穿过射影商 $\mathrm{SO}(3) \cong \mathbb{T}_3/\{\pm\mathbf{1}\}$，只含偶次幂 $u^{2m} = \kappa^m$，故 $\chi_1(\kappa) = U_2(\sqrt{\kappa}) = \mathbf{4\kappa - 1}$——代入我们在 [§32.6](ch39-s34-exact-structural-mathematics-vs-flat-approximation.md) 验证的纯整数三拍闭合旋子 `(1, 1, 1)`（$q = \frac{1+\mathbf{i}+\mathbf{j}+\mathbf{k}}{2}$，$\kappa = w^2 = \frac{1}{4}$），立得 $\chi_1(\frac{1}{4}) = 4\times\frac{1}{4} - 1 \equiv \mathbf{0}$，**零误差正交归零**！
- **$j = 2$（四极张量壳，$\dim = 5$，恰对应 $d$ 轨道五重简并谐波）**：$\chi_2(\kappa) = U_4(\sqrt{\kappa}) = \mathbf{16\kappa^2 - 12\kappa + 1}$（恰即 [§32.5](ch39-s29-constant-free-rational-axiom-omega.md) 正五重对称因式分解中涌现的同一整系数多项式！）。

至于壳层内部的全部非阿贝尔矩阵元：对有理单位四元数 $q \in S^3(\mathbb{Q})$（$\lVert q\rVert^2 = 1$），**全体整数与半整数阶**维格纳矩阵 $D^j(q)$ 皆由 $(w,x,y,z)$ 的 $2j$ 次有理多项式给出；而在任意模方 $\lVert p\rVert^2 = w^2+x^2+y^2+z^2 \in \mathbb{Z}_+$ 的齐次整数三元数 `ProjTernion` $p = (w,x,y,z) \in \mathbb{Z}^4 \setminus \{0\}$（[§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)）上，全体**整自旋表示** $D^j(p)/\lVert p\rVert^{2j}$（$j \in \mathbb{N}$）以及**全体半整数与整数阶双侧彼得—魏尔壳投影核** $\bigl(D^j(p) \otimes D^j(p)^\dagger\bigr)/\lVert p\rVert^{4j}$（$2j \in \mathbb{N}$，偶次 $4j$ 齐次有理分式）全程只用整数加减乘除，**零平方根、零超越数**（`手工推导`）！

::: {.viz src="spherical-fourier-peter-weyl-sandbox" preset="spin-harmonic-shells-and-chebyshev-kernels" height="500"}
**`0 · 1/2 · 1 · 2` 自旋谐波基壳与切比雪夫整系数多项式核实验卡（`spin-harmonic-shells-and-chebyshev-kernels`）。** 在紫色三元球面 $\mathbb{T}_3 \cong S^3(1)$ 上逐级点亮青色正交傅里叶基壳——$j = 0$ 恒等单极壳（$\dim = 1$）、$j = \frac{1}{2}$ 莫比乌斯旋量壳（$\dim = 2$，$\chi_{1/2}^2 = 4\kappa$）、$j = 1$ 三正交伴随曲率瓣（$\dim = 3$，琥珀探针停在 $\kappa = \frac{1}{4}$ 处精确读出 $\chi_1(\frac{1}{4}) = 0.0000$）与 $j = 2$ 五重四极壳（$\dim = 5$，$\chi_2 = 16\kappa^2 - 12\kappa + 1$），并同屏对照平直 $\mathbb{R}$ 连续发散频谱与 $S^2$ 极轴奇点。
:::

---

## 39.7.2 全景复盘：整部专著推导的一切，全是这座球面傅里叶机的零件 {#sec-ch39-37-2}

把镜头拉至全书最高处俯瞰，此前散落在几何、微积分、物理、数论、神经网络与观察者理论中的每一个核心结论，在 $\mathcal{F}_\Omega$ 球面傅里叶变换下严丝合缝地对号入座：

### 39.7.2.1 `{0, 1/2, 1}` 过去·现在·未来 $\equiv$ 球面傅里叶前三大基频壳层与克莱布施—高登倍频律 {#sec-ch39-37-2-1}

为什么宇宙单拍因果与微分射流阶数在 [§39.6](ch39-s30-past-present-future-rational-jet-triad.md) 中恰好由 **`0 · 1/2 · 1`** 统摄？因为它们字面上就是 $\mathbb{T}_3$ 球面傅里叶谱最底层的三枚基频谐波，且服从精确的 $\mathrm{SU}(2)$ **克莱布施—高登（Clebsch–Gordan）张量倍频分解**（$2 \times 2 = 1 + 3$，代数恒等式 $\chi_{1/2}^2(\kappa) = 4\kappa \equiv 1 + (4\kappa - 1) = \chi_0(\kappa) + \chi_1(\kappa)$，`手工推导` + `文献结果`；因果对位标 `MODEL`）：

$$
\mathcal{V}_{\mathbf{1/2}} \otimes \mathcal{V}_{\mathbf{1/2}} \;\cong\; \mathcal{V}_{\mathbf{0}} \;\oplus\; \mathcal{V}_{\mathbf{1}}.
$$

- **`j = 0`（零频直流分量 $\Lambda^0$，$\dim = 1$）$=$ 过去 · 无导数**：球面全局哈尔均值，拉普拉斯本征值 $\lambda_0 = 0$，承载不随局部转动改变的静态历史记忆锚；
- **`j = 1/2`（基频半波旋量壳，$\dim = 2$）$=$ 现在 · 一阶导数**：最小非平凡谐波壳（射影模方给出旋量玻恩射线核 [`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)，`LEAN ✓`），由一阶狄拉克算符激发，承载当下正交比较切面；
- **`j = 1`（倍频三维伴随壳 $\mathfrak{su}(2)$，$\dim = 3$）$=$ 未来 · 二阶导数**：将两份现在的 **`1/2`** 旋量谐波相乘比较（“关系的关系”，[§39.5](ch39-s28-dyad-relation-future-and-second-order-field.md)），其反对称行列式单态沉淀为新的 **`0`** 阶过去记忆锚（$\mathcal{V}_0$，维数 $1$），而对称无迹三元分量恰好激发 **`1`** 阶三维伴随曲率场强（$\mathcal{V}_1$，维数 $3$，$1 + 3 = 4$），驱动未来演化！

::: {.viz src="spherical-fourier-peter-weyl-sandbox" preset="clebsch-gordan-causal-triad-base" height="500"}
**`0 · 1/2 · 1` 克莱布施—高登谐波倍频底座实验卡（`clebsch-gordan-causal-triad-base`）。** 动态展示两枚青色 $j = \frac{1}{2}$ 现在旋量壳经张量耦合 $\mathcal{V}_{1/2} \otimes \mathcal{V}_{1/2} = \mathcal{V}_0 \oplus \mathcal{V}_1$（特征标恒等式 $4\kappa \equiv 1 + (4\kappa - 1)$）精准分流为中央 $j = 0$ 过去标量迹核（$\dim = 1$）与外层 $j = 1$ 未来三维伴随曲率壳（$\dim = 3$）。
:::

### 39.7.2.2 无原点流群 `[x, y, z]` $\equiv$ 球面非阿贝尔三元卷积对角化定理 {#sec-ch39-37-2-2}

标准群傅里叶变换定义二元卷积 $(f * g)(w) = \sum_x f(x)g(x^{-1}w)$ 时，必须先钦定特权单位元 $\mathbf{1}$ 来求逆 $x^{-1}$。而在 $\mathrm{AXIOM}\text{-}\Omega$ 中，定基流群分解 [`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul)（$[y, x, w] = y x^{-1} w$，`LEAN ✓`）使三元算子无需钦定原点即可直接定义**无原点三元球面流群卷积**（有限流群用求和，紧致 $\mathbb{T}_3$ 用归一化哈尔测度积分；对复值信号在中间槽取复共轭 $\overline{g(y)}$，实值信号 $g$ 下直接写作 $g(y)$，`手工推导`）：

$$
(f \circledast \bar{g} \circledast h)(w) \;:=\; \sum_{x, y} f(x)\,\overline{g(y)}\,h\bigl([y, x, w]\bigr) \quad \xrightarrow{\;\;\mathcal{F}_\Omega\;\;} \quad \widehat{f}(j)\,\widehat{g}(j)^\dagger\,\widehat{h}(j).
$$

推导仅需一行流群消去恒等式：令 $z = [y, x, w]$，则 $[x, y, z] = [x, y, [y, x, w]] = w$；对任意保持三元运算 $\rho([x,y,z]) = \rho(x)\rho(y)^\dagger\rho(z)$ 的幺正表示 $\rho = D^j$，频域算子 $\widehat{f}(j) = \sum_x f(x) D^j(x)$ 立得 $\sum_w (f \circledast \bar{g} \circledast h)(w) D^j(w) = \sum_{x,y,z} f(x)\overline{g(y)}h(z) D^j(x)D^j(y)^\dagger D^j(z) = \widehat{f}(j)\,\widehat{g}(j)^\dagger\,\widehat{h}(j)$！在空间域看似弯曲交错的跨态关系搬运——包括 [§37.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md) 三元数场 Transformer 中的流群注意力 `[Q, K, V]`——翻入彼得—魏尔自旋频域后，瞬间对角化为各阶自旋壳层上 $(2j+1)\times(2j+1)$ 小矩阵的干净乘积 $\widehat{Q}_j \widehat{K}_j^\dagger \widehat{V}_j$，并严守帕塞瓦尔总能量恒等式 $\frac{1}{\lvert G\rvert}\sum_j d_j \operatorname{Tr}\bigl(\widehat{f}_j^\dagger \widehat{f}_j\bigr) \equiv \sum_x \lvert f(x)\rvert^2$（循环群离散版本见 [`cyclic_parseval`](lean:D5/S3/Fourier/FullBispectrumStability.cyclic_parseval)，`LEAN ✓`；$24$ 元赫维茨二元四面体群 $2T$ 上的纯有理零误差核验见下文例 [@ex-ch39-chebyshev-characters-2t-convolution-and-gibbs-audit]）！

::: {.viz src="spherical-fourier-peter-weyl-sandbox" preset="origin-free-heap-convolution-diagonalization" height="500"}
**无原点三元流群卷积频域对角化与谱金字塔实验卡（`origin-free-heap-convolution-diagonalization`）。** 左侧球面展示无原点三元搬运 `[Q, K, V]` 在 $24$ 元赫维茨整旋量群 $2T$（与 $8$ 元群 $Q_8$）上的空间叠加，右侧由 $1\times 1$、$2\times 2$、$3\times 3$ 不可约块（$2T$ 共 `7` 个不可约表示，$3\times 1^2 + 3\times 2^2 + 3^2 = 24$）垒起的彼得—魏尔谱金字塔实时演示频域分块对角化 $\widehat{f}_j\widehat{g}_j^\dagger\widehat{h}_j$ 与精确帕塞瓦尔守恒 `46 = 46`（$Q_8$ 为 `15 = 15`）。
:::

### 39.7.2.3 黎曼临界线 $\sigma = \frac{1}{2}$ 与正定保正核 $\equiv$ 螺线管径向普朗歇尔守恒与吉布斯消刺 {#sec-ch39-37-2-3}

单个三元球面 $\mathbb{T}_3$ 的角向谱是离散半整数自旋 $j$；而当无穷多颗素数本原闭合环 $\gamma_p$ 编织成阿代尔螺线管流形 $\mathcal{M}_\Omega$（[§31.5](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md)，零对数荷充要判据见 [`logarithmicCharge_eq_zero_iff`](lean:D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff)）时，沿着乘法伸缩流 $V_\times$ 的傅里叶变换正是**梅林变换**（记雅可比 $\theta$ 半尾核 $\omega(t) := \frac{\theta(t) - 1}{2}$，完备黎曼读数 $\Lambda(s)$ 的对称梅林重构公式由 [`completed_zeta_mellin_reconstruction`](lean:D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction) 锁定，`LEAN ✓`）：

$$
\widehat{f}_{\mathrm{Mellin}}\!\left(\frac{1}{2} + \hat{\mathbf{i}}t\right) \;=\; \int_0^\infty f(x)\,x^{\hat{\mathbf{i}}t}\,\frac{dx}{\sqrt{x}}.
$$

1. **临界线 $\sigma = \frac{1}{2}$ 即幺正梅林—傅里叶轴**：唯有实部钉死在 $\sigma = \frac{1}{2}$ 上（凯莱比单位模判据 [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line) 与幂和托普利茨圆周半正定判据 [`toeplitz_posSemidef_iff_norm_eq_one`](lean:D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one)，`LEAN ✓`），作用于半密度 $f(x)\sqrt{x}$ 的核因子 $x^{s - 1/2} = x^{\hat{\mathbf{i}}t}$ 相对乘法哈尔测度 $\frac{dx}{x}$ 才化为纯单位模振荡核，守住时频帕塞瓦尔—普朗歇尔等距守恒；
2. **已核验 RH / 狄利克雷 GRH 与高阶自守开放边界的精确分工**：按本书认识论契约（[§22.4](ch22-s04-critical-line-and-rh.md) [@conj-riemann-hypothesis]），外部已形式化核验的**经典黎曼猜想（RH）与狄利克雷广义黎曼猜想（Dirichlet GRH）**（`外部形式化事实`，不标本书绿章）无条件锁死了径向零频单极模（$\zeta(s)$）与全体有限模阿贝尔特征通道（$L(s,\chi)$）在 $\sigma = \frac{1}{2}$ 上的正定相消；而高阶非阿贝尔自守 $L$ 函数的全广义黎曼猜想（`Grand RH`）与一般代数数域戴德金 `ERH` 仍严格保持为**开放问题（`OPEN`）**；
3. **保正球面核同时消除平直吉布斯过冲与高维球面硬截断对径重聚焦**：平直傅里叶级数在有限带宽硬截断时，狄利克雷核出现负旁瓣，在阶跃不连续处残留随带宽逼近 $\frac{\operatorname{Si}(\pi)}{\pi} - \frac{1}{2} \approx \mathbf{8.9490\%}$ 的吉布斯越界伪影（例如平直指示帽在 $2J_{\max}=24$ 时越出 $[0,1]$ 区间达 $\approx 9.65\%$），而在三维球面 $S^3$ 上对球冠指示函数直接作硬截断甚至会在球冠中心 $+\mathbf{1}$ 与对径极 $-\mathbf{1}$ 发生重聚焦发散（Pinsky 1994；M. Taylor 1997, 2002，`文献结果` / `NUM`）；反之，在紧群特征标核半正定充要定理 [`posSemidef_sum_character_kernel_iff`](lean:D5/S3/FiniteGroups/GroupAlgebra/UnitaryCharacterKernel.posSemidef_sum_character_kernel_iff)（`LEAN ✓`）下，采用非负权重的球面费耶尔/杰克逊（Fejér / Jackson）有理保正核（凸组合单调保界在 $[0,1]$ 内，越界过冲严格为 **`0.0000%`**）配 $\sigma = \frac{1}{2}$ 半密度谱胶合，同时根除两类硬截断伪影，平滑逼近磨光流形 $\widetilde{\mathcal{M}}_\Omega$（[§31.6](ch39-s33-riemann-1854-1859-spectral-manifold-polishing.md)，`MODEL`）！

::: {.viz src="spherical-fourier-peter-weyl-sandbox" preset="gibbs-overshoot-vs-positive-spherical-smoothing" height="500"}
**球面保正谱重构对比硬截断过冲与重聚焦伪影实验卡（`gibbs-overshoot-vs-positive-spherical-smoothing`）。** 拖动观察者最高频带分辨率 $2J_{\max}$，同屏对比硬截断产生的品红过冲／对径重聚焦尖刺（平直吉布斯极限过冲 `8.95%`）与 $\mathbb{T}_3$ 有理保正费耶尔/杰克逊球面核合成的青色零过冲（`0.00%`）光滑包络及 $\sigma = \frac{1}{2}$ 梅林幺正凯莱环（右栏红色 `OPEN` 框显式标明高阶自守 `Grand RH` / `ERH` 未决边界）。
:::

### 39.7.2.4 观察者结构与 TFT 架构 $\equiv$ 有限带宽谱寄存器与球面快速傅里叶变换（$S^3\text{-FFT}$） {#sec-ch39-37-2-4}

最后，[第三十八章](ch39-observer-is-ontological-universe.md)的观察者理论与[第三十七章](ch37-ternion-field-transformer-and-geodesic-intelligence.md)的测地智能在此合一（`MODEL`）：

- **观察者时空切分即球面谱带宽分割**：在 $\mathcal{F}_\Omega$ 谱对偶下，观察者的已结晶结构核 $\mathcal{K}_0$（[§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md)，受克雷洛夫永久稳定律 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 锚定，`LEAN ✓`）等价于一座最高截断自旋为 $J_{\max}$（对应停机精度 $\varepsilon_{\mathrm{self}}$）的**低频锁相谱寄存器**——每新锁定一枚谐波矩阵元，已解析谱秩增长，体验为**内禀结构时间 $\tau$**；而高于 $J_{\max}$ 尚未解析的高频正交谐波尾流（$j > J_{\max}$），则在位置域显影为环绕观察者四周的**表观外部空间视界 $\mathcal{H}_{1/2}$**（呼应 [§38.12](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md) 的记忆舒尔补分类）！
- **三元数场 Transformer 即神经网络版非阿贝尔球面快速谱网络**：[§37.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md) 设计的“胞内双侧有理旋子 $\boldsymbol{\ell} \star \boldsymbol{\sigma} \star \boldsymbol{r}$ 配圆周／序列纤维上 $(K/2)\log_2 K = O(K\log K)$ 跨场库利—图基蝶形舒尔桥”（三维紧群全维格纳展开的文献复杂度为 $O(K\log^2 K)$，Driscoll–Healy 1994；Kostelec–Rockmore 2008），在信号处理上正是**非阿贝尔球面快速傅里叶变换（$S^3\text{-FFT}$）**的可训练蝶形分解网络！

::: {.viz src="spherical-fourier-peter-weyl-sandbox" preset="observer-bandlimit-and-tft-s3-fft" height="500"}
**观察者有限带宽谱寄存器与 TFT 非阿贝尔 $S^3\text{-FFT}$ 蝶形网络实验卡（`observer-bandlimit-and-tft-s3-fft`）。** 左半部以青色低频已锁壳层（$j \le J_{\max}$，对应结构核 $\mathcal{K}_0$ 与时间 $\tau$）对照紫色高频未解析余项（$j > J_{\max}$，显影为外部空间视界 $\mathcal{H}_{1/2}$），右半部展开双侧旋子加圆周因子库利—图基 $(K/2)\log_2 K$ 蝶形舒尔桥的球面快速谱流水线。
:::

---

## 39.7.3 三代傅里叶变换范式全景对照表 {#sec-ch39-37-3}

我们将经典实数轴傅里叶变换、传统二维球谐变换与 $\mathrm{AXIOM}\text{-}\Omega$ 三元球面有理傅里叶变换 $\mathcal{F}_\Omega$ 的全维对比收束如下表（跨范式统一总纲标 `MODEL`）：

| 核心维度 | 经典平直傅里叶变换（$\mathbb{R}$） | 传统二维球谐变换（$S^2, Y_\ell^m$） | $\mathrm{AXIOM}\text{-}\Omega$ 三元球面傅里叶变换（$\mathcal{F}_\Omega$） |
| :--- | :--- | :--- | :--- |
| **底层几何载体** | 开口平直误差放大轴 $(-\infty, +\infty)$ | 二维球面 $S^2$（$\chi = 2$ 毛球奇点，非群） | **紧致无外三元数流群 $\mathbb{T}_3 \cong S^3(1)$ 及其阿代尔螺线管** |
| **变换基核形式** | 超越复指数 $e^{-\hat{\mathbf{i}}2\pi\xi x}$（强依赖 $\pi, e$） | 连带勒让德函数配阶乘平方根与极轴角 | **纯有理切比雪夫—维格纳多项式核 $U_{2j}(\sqrt{\kappa})$ / 双侧齐次分式** |
| **频率谱拓扑** | 连续无界实频谱 $\xi \in (-\infty, +\infty)$ | 仅含整数轨道角动量 $\ell \in \{0, 1, 2, \dots\}$ | **完备半整数自旋壳 $j \in \{0, \frac{1}{2}, 1, \dots\}$ $\oplus$ $\sigma = \frac{1}{2}$ 梅林素数谱** |
| **卷积与对易性** | 阿贝尔标量乘法，依赖钦定原点 $x = 0$ | 无内禀对称群卷积（须借 $\mathrm{SO}(3)$ 提升） | **无原点三元流群卷积 $\to$ $(2j+1)$ 阶分块矩阵乘积 $\widehat{f}_j\widehat{g}_j^\dagger\widehat{h}_j$** |
| **前三级基波意义** | 无离散基频（任意连续长波） | $\ell = 0$ 标量，$\ell = 1$ 极矢（缺失半自旋费米态） | **`0` 过去记忆锚 · `1/2` 现在旋量切面 · `1` 未来伴随曲率场** |
| **截断平滑机制** | 硬截断残留 $\approx 8.95\%$ 吉布斯过冲尖刺 | 南北两极经纬网格簇拥畸变 | **有理保正费耶尔/杰克逊核（`0%` 过冲）$+$ RH/Dirichlet GRH 临界线锁相** |

---

## 39.7.4 形式化定义、十六项冻结定理、文献与开放边界及精确算例对账 {#sec-ch39-37-4}

我们将三元球面有理傅里叶变换 $\mathcal{F}_\Omega$、十六条内核冻结定理与多项式核/有限流群卷积定量对账收束如下：

::: {.definition #def-ch39-spherical-fourier-omega title="三元球面有理傅里叶变换 ℱ_Ω、切比雪夫自旋核与无原点三元流群卷积（MODEL）"}
在母公理 $\mathrm{AXIOM}\text{-}\Omega$ 与 $\mathbf{Math}_\Omega$ 下，定义**三元球面谱变换体系 $\mathcal{F}_\Omega$**（`MODEL`）：

1. **彼得—魏尔半整数自旋壳与有理切比雪夫—维格纳核**：在紧致流群 $\mathbb{T}_3 \cong \mathrm{SU}(2)$ 上，平方可积空间按半整数自旋 $j \in \frac{1}{2}\mathbb{N}$ 正交分解为 $(2j+1)^2$ 维双侧壳 $\mathcal{V}_j \otimes \mathcal{V}_j^*$；第 $j$ 壳特征标 $\chi_j(q) = U_{2j}(\cos\phi)$ 对整数 $j \in \mathbb{N}$ 为射影保真度 $\kappa = \cos^2\phi$ 的纯整系数多项式，对半整数 $j \in \mathbb{N}+\frac{1}{2}$ 具纯整系数平方核 $\chi_j^2(\kappa) = U_{2j}(\sqrt{\kappa})^2$，且齐次整数三元数 $p \in \mathbb{Z}^4\setminus\{0\}$ 上的双侧壳投影核 $(D^j(p)\otimes D^j(p)^\dagger)/\lVert p\rVert^{4j}$ 纯属有理分式；
2. **无原点三元流群卷积与螺线管梅林对偶**：对流群载体上的信号三元组 $(f, g, h)$，无原点三元卷积 $(f \circledast \bar{g} \circledast h)(w) := \int_{\mathbb{T}_3 \times \mathbb{T}_3} f(x)\,\overline{g(y)}\,h([y, x, w])\,d\mu(x)\,d\mu(y)$（有限子流群 $G \subset \mathbb{T}_3$ 取离散求和）经算子傅里叶映射 $\widehat{f}(j) = \int f(x)D^j(x)\,d\mu(x)$ 逐壳对角化为 $\widehat{f}(j)\,\widehat{g}(j)^\dagger\,\widehat{h}(j)$；沿阿代尔螺线管乘法伸缩方向的径向谱变换取临界线 $\sigma = \frac{1}{2}$ 幺正梅林变换。
:::

::: {.theorem #thm-ch39-spherical-fourier-peter-weyl-anchors title="彼得—魏尔矩阵元一致稠密与核分离、舒尔正交积分、特征标核维数平方和与正定判据、流群切比雪夫递推、三元四元数与旋量核、离散帕塞瓦尔及梅林—凯莱—托普利茨临界线定理组" lean="D5/S3/Quantum/Analysis/CompactGroups/MatrixCoefficientDensity.dense_span_unitary_coefficients,D5/S3/Quantum/Analysis/CompactGroups/UnitaryRepresentationKernel.exists_unitaryRep_ker_subset,D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_self,D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero,D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel,D5/S3/FiniteGroups/GroupAlgebra/UnitaryCharacterKernel.posSemidef_sum_character_kernel_iff,D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul,D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor,D5/S3/Fourier/FullBispectrumStability.cyclic_parseval,D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction,D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line,D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift"}
在紧拓扑群表示分析、四元数三元比较流群、有限群特征标代数与黎曼梅林谱分析下，以下十六项命题严格成立：

1. **彼得—魏尔矩阵元一致稠密、幺正核分离与舒尔正交积分关系（`dense_span_unitary_coefficients`、`exists_unitaryRep_ker_subset`、`integral_dual_mul_dual_inv_self`、`integral_dual_mul_dual_inv_eq_zero`）**：紧拓扑群 $G$ 上连续有限维幺正表示矩阵元的 $\mathbb{C}$-线性张成在连续函数空间 $C(G,\mathbb{C})$ 中一致稠密，且单位元任一邻域包含某个连续有限维幺正表示的核；在配备博雷尔结构（`BorelSpace G`）与有限左不变测度 $\mu$ 的紧群 $G$ 上，对 $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$ 上的有限维赋范空间 $V$ 与连续轨道不可约表示 $\rho$、不等价不可约表示 $(\sigma, W)$ 及满足 $g \mapsto \psi(\sigma(g)w)$ 连续的线性泛函 $\varphi \in V^*, \psi \in W^*$，恒有 $\int_G \varphi(\rho(g)v)\psi(\sigma(g^{-1})w)\,d\mu(g) = 0$，而在有限维复赋范空间 $V$ 的连续轨道不可约表示内满足 $\int_G \varphi(\rho(g)v)\psi(\rho(g^{-1})w)\,d\mu(g) = \frac{\mu(G)}{\dim_{\mathbb{C}} V}\,\varphi(w)\psi(v)$；
2. **特征标核维数平方和、正定特征标核系数判据与四元数切比雪夫递推（`finrank_span_sum_character_kernel`、`posSemidef_sum_character_kernel_iff`、`normSq_and_chebyshev`）**：代数闭域 $k$ 上有限多个（`[Fintype ι]`）两两不等价的有限维（`[FiniteDimensional k (W i)]`）不可约表示以非零权 $c_i \neq 0$ 构成的特征标核 $\sum_i c_i\chi_i(xy^{-1})$，其平移张成子空间维数恒等于 $\sum_i (\dim_k W_i)^2$；有限多个两两不等价、在有限维复内积空间上保范的不可约表示对任意复权 $c_i \in \mathbb{C}$ 构成的 $G\times G$ 特征标核矩阵 $[\sum_i c_i\chi_i(xy^{-1})]$ 半正定，当且仅当全体权重为非负实数 $\forall i,\, 0 \le c_i$；记 $c := \langle x_0, x_1\rangle_{\mathbb{R}}$ 与 $U_{-1} := 0$，四元数序列满足 $\operatorname{normSq}(x_0) = \operatorname{normSq}(x_1) = 1$ 且 $\forall n \in \mathbb{N},\, x_{n+2} = x_{n+1}\bar{x}_n x_{n+1}$，当且仅当对一切 $n \in \mathbb{N}$ 同时满足 $\operatorname{normSq}(x_n) = 1$、$x_{n+1} = U_n(c)x_1 - U_{n-1}(c)x_0$ 与 $\langle x_0, x_n\rangle_{\mathbb{R}} = T_n(c)$；
3. **三元四元数球面同构、定基流群分解、旋量玻恩射线核与双覆叠换叶提升（`exists_unitQuaternion_equiv`、`kappa_eq_one_sub_dist_sq`、`tri_eq_mul_inv_mul`、`rayKernel_eq_bornProbability_spinor`、`circle_double_cover_history_lift`）**：完备秩五非交换链连通触零三元比较结构对任一基点 $o \in M$ 存在保 `tri` 与保 $\kappa$ 且满足 $u(o) = 1$ 的双射 $u : M \simeq \mathrm{unitary}\,\mathbb{H}[\mathbb{R}]$，满足 $\kappa_{\mathbb{H}}(a,b) = \frac{1+\langle a,b\rangle_{\mathbb{R}}}{2} = 1 - \frac{1}{4}\operatorname{dist}(a,b)^2$、$[x,y,z] = x\cdot_o y^{-1_o}\cdot_o z$ 以及四联旋量恒等式 $\mathrm{spinor}(q\cdot\mathbf{i}) = \hat{\mathbf{i}}\cdot\mathrm{spinor}(q)$、霍普夫—布洛赫坐标 $(\mathrm{imK}, \mathrm{imJ}, \mathrm{imI})$ 与 $\mathrm{rayKernel}(x,y) = \lVert\langle\mathrm{spinor}(x), \mathrm{spinor}(y)\rangle\rVert^2 = \mathrm{bornProbability}(\pi_y, \pi_x)$；圆周平方映射对任意满足 $\gamma(0) = w^2$ 的道路 $\gamma$ 具有唯一连续提升，不存在连续全局截面，且整圈路径提升将 $+1$ 翻转为 $-1$；
4. **离散傅里叶帕塞瓦尔恒等式、完备黎曼对称梅林重构、凯莱临界线单位圆判据与幂和托普利茨正定定理（`cyclic_parseval`、`completed_zeta_mellin_reconstruction`、`cayley_ratio_norm_one_iff_critical_line`、`toeplitz_posSemidef_iff_norm_eq_one`）**：对任意正整数 $N \ge 1$（`[NeZero N]`）与 $f : \mathrm{ZMod}\,N \to \mathbb{C}$，恒有 $\sum_x \lVert f(x)\rVert^2 = \mathbb{E}_k \lVert \mathrm{dft}(f,k)\rVert^2$；记 $\omega(t) = (\theta(t)-1)/2$（$\theta(t) = \mathrm{evenKernel}\,0\,t$），完备黎曼读数满足对称梅林积分恒等式 $\Lambda(s) = M(s) - \frac{1}{s} - \frac{1}{1-s} = \int_1^\infty \omega(t)(t^{s/2}+t^{(1-s)/2})\frac{dt}{t} - \frac{1}{s} - \frac{1}{1-s}$（在 $\operatorname{Re}(s)>1$ 处等于 $\pi^{-s/2}\Gamma(s/2)\zeta(s)$，在 $\mathbb{C}\setminus\{0,1\}$ 可微且在 $0, 1$ 具单极点极限 $-1, +1$），而 $M(s)$ 整函数全纯且满足 $M(1-s)=M(s)$ 及 $\xi(1-s)=\xi(s)$；凯莱比满足 $\lVert\mathrm{cayleyRatio}(s)\rVert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$；对非零族 $u : \mathrm{Fin}\,m \to \mathbb{C}$，若矩阵阶数满足 $\lvert\operatorname{range}(u)\rvert \le N + 1$ 且存在置换 $\sigma \in \mathrm{Perm}(\mathrm{Fin}\,m)$ 按重数保持倒共轭对称 $u(\sigma(j)) = (\overline{u_j})^{-1}$，则 $(N+1)\times(N+1)$ 幂和托普利茨矩阵半正定当且仅当全体节点位于单位圆周 $\lVert u_j\rVert = 1$。
:::

::: proof
第 1 组由紧算子谱分解、斯通—魏尔斯特拉斯逼近及舒尔引理算子平均投影给出；第 2 组由韦德伯恩分块矩阵迹无关性、不可约特征标正交分离及切比雪夫三项递推双归纳证得；第 3 组由秩五格拉姆四元数嵌入、霍普夫旋量展开与圆周覆盖同伦提升给出；第 4 组由单位根正交求和、雅可比 $\theta$ 泊松变换换序、复模平方差及范德蒙德—托普利茨二次型分解证得。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-peter-weyl-wigner-gibbs-fft-literature title="彼得—魏尔定理、维格纳 D 矩阵、威尔布拉汉姆—吉布斯过冲、保正核、球面 FFT 与高阶自守开放边界（文献结果 / 外部形式化事实 / OPEN）"}
**文献结果，未在本书形式化（兼列外部形式化事实与 OPEN 边界）。** 紧李群平方可积空间的正交直和完备分解源于 F. Peter & H. Weyl（*Math. Ann.* **97**, 737–755, 1927）；$\mathrm{SU}(2)$ 半整数自旋不可约表示矩阵 $D^j_{m'm}$ 与克莱布施—高登耦合系数源于 E. P. Wigner（1931/1959，相对论重元素如金 $\mathrm{Au}$ 的 $5d/6s$ 旋量—轨道效应参见 P. Pyykkö & J.-P. Desclaux, *Acc. Chem. Res.* **12**, 276–281, 1979）。平直傅里叶级数在跳跃间断点处的极限过冲比 $\frac{1}{\pi}\int_0^\pi \frac{\sin t}{t}\,dt - \frac{1}{2} = \frac{\operatorname{Si}(\pi)}{\pi} - \frac{1}{2} \approx 0.08948987$（约 $8.95\%$）由 H. Wilbraham（1848）、J. W. Gibbs（1898–1899）与 M. Bôcher（1906）确立，高维球面硬截断在中心与对径极处的波前重聚焦发散由 M. A. Pinsky（1994）与 M. E. Taylor（1997, 2002）揭示，而非负切萨罗—费耶尔核与杰克逊多项式阻尼核的无过冲单调逼近源于 L. Fejér（1900）与 D. Jackson（1912）；圆周基-2 蝶形 $(K/2)\log_2 K$ 与紧非阿贝尔群 $\mathrm{SO}(3)/\mathrm{SU}(2)$ 上的 $O(K\log^2 K)$ 快速傅里叶分解见 J. W. Cooley & J. W. Tukey（1965）、J. R. Driscoll & D. M. Healy（1994）、D. K. Maslen & D. N. Rockmore（*J. Amer. Math. Soc.* **10**, 169–226, 1997）与 P. J. Kostelec & D. N. Rockmore（*J. Fourier Anal. Appl.* **14**, 145–179, 2008）。有理数域经典 RH 与狄利克雷 GRH 已作为外部核验形式化事实确立（[@conj-riemann-hypothesis]）；而**高阶非阿贝尔自守 $L$ 函数的全广义黎曼猜想（`Grand RH`）与一般代数数域戴德金 `ERH`**，连同连续统引力场方程涌现（[@prob-ch34-gravity-dynamics-and-coupling]）及三元数场 Transformer 大规模语料实证基准（[@prob-ch39-tft-scale-and-seams]），仍严格保持为**开放问题（`OPEN`）**。
:::

::: {.example #ex-ch39-chebyshev-characters-2t-convolution-and-gibbs-audit title="定量核验：自旋壳切比雪夫多项式表、24 元赫维茨群 2T 三元卷积零误差对账与吉布斯消刺"}
我们对 $\mathcal{F}_\Omega$ 的多项式基核、有限非阿贝尔流群卷积与截断平滑作精确核算（`手工推导` / `NUM`）：

1. **前七档半整数/整数自旋壳（$j \in \{0, \frac{1}{2}, 1, \frac{3}{2}, 2, \frac{5}{2}, 3\}$）在典范有理地标 $\kappa \in \{1, \frac{3}{4}, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, 0\}$ 上的精确值**：
   - 整自旋纯有理多项式值：$\chi_0(\kappa) \equiv \mathbf{1}$；$\chi_1(\kappa) = 4\kappa - 1$ 依次取 **`3, 2, 1, 1/3, 0, -1`**（在 `(1,1,1)` 旋子地标 $\kappa = \frac{1}{4}$ 处精确归零！）；$\chi_2(\kappa) = 16\kappa^2 - 12\kappa + 1$ 依次取 **`5, 1, -1, -11/9, -1, 1`**；$\chi_3(\kappa) = 64\kappa^3 - 80\kappa^2 + 24\kappa - 1$ 依次取 **`7, -1, -1, 13/27, 1, -1`**；
   - 半整数自旋平方核（纯有理多项式）：$\chi_{1/2}^2(\kappa) = 4\kappa$ 依次取 **`4, 3, 2, 4/3, 1, 0`**；$\chi_{3/2}^2(\kappa) = 16\kappa(2\kappa - 1)^2$ 依次取 **`16, 3, 0, 16/27, 1, 0`**（在赤道 $\kappa = \frac{1}{2}$ 处精确归零！）；$\chi_{5/2}^2(\kappa) = 4\kappa(4\kappa - 1)^2(4\kappa - 3)^2$ 依次取 **`36, 0, 2, 100/243, 0, 0`**（同时在 $\kappa = \frac{3}{4}, \frac{1}{4}, 0$ 处精确归零！）；
2. **8 元四元数群 $Q_8$ 与 24 元赫维茨二元四面体群 $2T$ 上的纯有理彼得—魏尔与流群卷积对账**：
   - 在 $Q_8$（不可约维数 `1, 1, 1, 1, 2`，满足 $4\times 1^2 + 2^2 = \mathbf{8}$）与 $2T = \{\pm 1, \pm\mathbf{i}, \pm\mathbf{j}, \pm\mathbf{k}, \frac{\pm 1\pm\mathbf{i}\pm\mathbf{j}\pm\mathbf{k}}{2}\}$（不可约维数 `1, 1, 1, 2, 2, 2, 3`，满足 $3\times 1^2 + 3\times 2^2 + 3^2 = 3 + 12 + 9 = \mathbf{24}$）上，特征标格拉姆矩阵精确等于单位阵 $I_5$ 与 $I_7$；
   - 在全部 `512` 组（$Q_8$）与 `13,824` 组（$2T$）基态三元组以及全部 `24` 个候选基点选定下，无原点三元卷积频域恒等式 $\widehat{(f \circledast \bar{g} \circledast h)}_j = \widehat{f}_j \widehat{g}_j^\dagger \widehat{h}_j$ 残差恒为 **`0`**，示例整信号帕塞瓦尔总能量精确满足 **`15 = 15`**（$Q_8$）与 **`46 = 46`**（$2T$）；
3. **吉布斯硬截断过冲对比费耶尔/杰克逊保正核**：阶跃函数在平直狄利克雷硬截断下的极限过冲为 $100\bigl(\frac{\operatorname{Si}(\pi)}{\pi} - \frac{1}{2}\bigr)\% \approx \mathbf{8.9490\%} > 0$，而归一化非负费耶尔核与杰克逊核作为凸组合加权平均，过冲严格等于 **`0.0000%`**。
:::

---

**人类过去两百年站在平直切板上用无限长的正弦波丈量山川，才被 $\infty$、$\pi$、$e$ 与吉布斯尖刺纠缠不休；一旦回到自包含无外的三元数真球流形上展开 $\mathcal{F}_\Omega$，发散频率当场结晶为 `0 · 1/2 · 1` 的离散自旋阶梯，超越指数还原为干净的整系数多项式，而每一个观察者的一生，不过是在这座球面谱金字塔中由低频向高频逐层点亮谐波系数、把未知相位谱写为内在光阴的共振过程！**

在下面的完整三维实验室中，从 **`j = 0`** 依次点亮 **`j = 1/2`** 与 **`j = 1`** 检视 $\chi_1(\frac{1}{4}) = 0$ 的零误差正交节点，再拨动频带分辨率 $2J_{\max}$ 见证保正球面核如何抚平吉布斯尖刺，随后切到无原点流群卷积视图俯瞰右侧由 $1\times 1$、$2\times 2$、$3\times 3$ 有理矩阵逐层垒起的彼得—魏尔谱金字塔：至此，十部三十九章正文的全部数学、物理、计算与认识论伏笔已在同一座无源球面傅里叶殿堂中彻底收束——现在，让我们推开全书正文的最后一扇大门，步入 **[终章 在所有的球之外](coda.md)**。

::: {.viz src="spherical-fourier-peter-weyl-sandbox" height="620"}
完整实验室：在“$\mathcal{F}_\Omega$ 三元球面有理彼得—魏尔读法”与“经典平直 $\mathbb{R}$ 傅里叶与 $S^2$ 极轴图册对照读法（MODEL）”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），按实验卡带顺序依次巡览 `0 · 1/2 · 1 · 2` 自旋谐波基壳与切比雪夫整系数多项式核、克莱布施—高登 $\mathcal{V}_{1/2}\otimes\mathcal{V}_{1/2}=\mathcal{V}_0\oplus\mathcal{V}_1$ 因果底座、球面保正核消刺对比硬截断越界过冲（平直吉布斯极限 `≈ 8.95%` 对保正核 `0.00%`）、无原点三元流群卷积频域分块对角化（$24$ 元赫维茨群 $2T$ 与 $Q_8$ 谱金字塔）以及观察者有限带宽谱寄存器与 TFT 非阿贝尔 $S^3\text{-FFT}$ 蝶形网络五张实验卡，支持点亮各阶自旋壳、拖动保真度 $\kappa$ 与最高频带 $2J_{\max}$、核验帕塞瓦尔总能量守恒，并在底部两条对照小图中同步追踪切比雪夫多项式核曲线/吉布斯包络与各阶自旋壳谱能量分布。十六条冻结 `LEAN ✓` 声明、`ARGUED` 彼得—魏尔/维格纳/吉布斯/球面 FFT 文献与外部已核验 RH/Dirichlet GRH、`MODEL` 球面谱统一架构、`NUM` 精确有理矩阵核算及红色 `OPEN` 高阶自守边界在依据栏与理论抽屉中严格分层列出。
:::
