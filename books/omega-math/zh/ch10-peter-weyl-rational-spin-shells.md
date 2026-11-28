# 第十章 彼得—魏尔有理自旋壳与整系数切比雪夫核

> *“把波放回紧致无外的三维球面，连续发散的频率瞬间结晶为离散自旋阶梯，超越复指数退场为纯整数切比雪夫多项式。”*

第三卷（[第七章](ch07-second-order-jet-calculus.md)–[第九章](ch09-telescoping-stokes-and-arc-manifold.md)）已经清除了微积分中的极限幽灵：在二阶幂零射流环与流群望远镜求和下，微分与积分都归约为有限步有理代数。从本章开始，第四卷进入调和分析的核心战场——在经典实三维球面上辨认谱壳，并把可精确计算的整数自旋读数写成有理多项式。

经典教材把傅里叶变换奉为分析学的万用钥匙，却鲜少追问一个谱系学问题：为什么我们在展开周期或局域波场时，要默认站在一条两端无限敞开的平直实数轴上，去吞咽 $\pi$、$e$、连续无界频率与截断振铃？答案与第一卷的诊断如出一辙——平直傅里叶变换只是把弯曲闭合的三元球面强行摊平后的切线近似。一旦把函数空间放回经典紧群——实单位四元数群 $S^3(1)\cong\mathrm{SU}(2)$，彼得—魏尔（Peter–Weyl）分解立刻将频谱量子化为离散的半整数自旋壳层，而所有整数自旋的球面特征标都直接坍缩为关于保真度 $\kappa$ 的整系数切比雪夫多项式；其中的佩尔律、倍阶律、偶壳消根号与奇壳有号因子分解、自旋 $j = 2$ 二次特征标、全阶整数自旋克莱布施—高登乘积律以及 $5d^{10}/5d^8$ 轨道角向四极平衡，均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由 Lean 内核直接证成。

---

## 10.1 废除平直实轴积分：为什么紧致三维球面天然量子化频谱 {#sec-ch10-flat-fourier-pathology}

审视经典一维傅里叶变换的招牌公式：

$$
\widehat{f}(\xi) \;=\; \int_{-\infty}^{+\infty} f(x)\,e^{-\hat{\mathbf{i}}2\pi\xi x}\,dx.
$$

这一行短短的积分，把平直连续统分析的全部结构性病灶打包在了一起：

1. **开口实轴诱发连续紫外发散与吉布斯振铃**：定义域 $(-\infty, +\infty)$ 没有闭合边界，迫使对偶频谱 $\xi$ 连续延伸至无穷大；而在有限带宽处强行做狄利克雷硬截断，又会在阶跃不连续点留下永不消散的威尔布拉汉姆—吉布斯（Wilbraham–Gibbs）过冲振铃，极限越界高度锁定在 $\frac{\operatorname{Si}(\pi)}{\pi} - \frac{1}{2} \approx 8.9490\%$。
2. **超越核与阿贝尔失明**：指数核 $e^{-\hat{\mathbf{i}}2\pi\xi x}$ 同时捆绑了 $e$ 与 $\pi$ 两枚超越常数，必须借助无穷幂级数与实数完备性才能求值；更致命的是，标量复指数服从交换律 $e^{\hat{\mathbf{i}}\xi_1 x}e^{\hat{\mathbf{i}}\xi_2 x} = e^{\hat{\mathbf{i}}(\xi_1+\xi_2)x}$，只能忠实编码一维平直平移，对三维旋转的非对易顺序与二阶曲率完全失明。
3. **二维球面 $S^2$ 仍缺临门一脚**：传统球谐函数 $Y_\ell^m(\vartheta, \varphi)$ 虽登上了紧致球面，却受制于偶维球面欧拉示性数 $\chi(S^2) = 2 \neq 0$（毛球拓扑障碍）。$S^2$ 本身既非李群亦非流群，必须人为钉死一根特权南北极轴才能写出连带勒让德多项式，由此不仅在两极引入坐标奇点，还把半整数旋量壳层统统拒之门外。

本章在[第三章](ch03-canonical-ternion-manifold.md)与[第四章](ch04-heaps-and-lie-triple-curvature.md)讨论的经典紧群模型 $S^3(1)\cong\mathrm{SU}(2)$ 上做调和分析。$S^3$ 紧致无外、欧拉示性数为零、处处可平行化且自带非阿贝尔群与流群乘法。波函数绕球面闭合一周必须严丝合缝咬合相位，因此其对偶谱自动从连续无界的实直线收缩为离散的半整数自旋阶梯 $j \in \{0, \frac{1}{2}, 1, \frac{3}{2}, 2, \dots\}$。

在紧拓扑群表示分析的经典阴影层中，这一离散化由三条已经 Lean 内核验证的基石定理牢牢锚定。首先，紧群上的有限维幺正表示足以分辨单位元附近的任意微小尺度。

::: {.theorem #thm-ch10-unitary-kernel-separation title="紧群单位元邻域的有限维幺正核分离" lean="D5/S3/Quantum/Analysis/CompactGroups/UnitaryRepresentationKernel.exists_unitaryRep_ker_subset"}
设 $G$ 为紧拓扑群，$U \subseteq G$ 为单位元 $1$ 的任意邻域。则存在自然数 $n \in \mathbb{N}$ 与连续有限维幺正矩阵表示 $\rho : G \to U(n, \mathbb{C})$，使得 $\rho$ 的核完全落入 $U$ 内：对一切 $g \in G$，若 $\rho(g) = I_n$，则必有 $g \in U$。
:::

::: {.proof}
在紧群 $G$ 上赋予博雷尔结构与归一化哈尔测度 $\mu$，取支撑落在足够小对称邻域内的连续隆起函数 $\varphi$，构造左右平移核对应的紧积分算子 $T$ 与自伴紧正算子 $S = T T^\dagger$。因 $S$ 与左正则表示交换，其每个非零特征值对应的特征子空间都是有限维且在左正则作用下不变的幺正表示空间。对 $U$ 外部的每一点都存在某个有限维特征空间将其与单位元分开，借紧性抽取有限多个特征子空间的直和，即得核被包含于 $U$ 内的有限维幺正表示 $\rho$。完整证明由 Lean 内核检查。
:::

一旦有限维幺正表示能够分离点对，斯通—魏尔斯特拉斯逼近便立刻确立彼得—魏尔调和分析的核心稠密定理：紧群上一切连续函数都可被有限维幺正矩阵元的有限线性组合一致逼近。

::: {.theorem #thm-ch10-matrix-coeff-density title="彼得—魏尔有限维幺正矩阵元一致稠密性" lean="D5/S3/Quantum/Analysis/CompactGroups/MatrixCoefficientDensity.dense_span_unitary_coefficients"}
设 $G$ 为紧拓扑群（无需额外假设豪斯多夫分离公理）。则 $G$ 上全部连续有限维幺正矩阵表示 $\rho : G \to U(n, \mathbb{C})$ 的矩阵元函数 $g \mapsto \rho(g)_{ij}$ 在 $\mathbb{C}$ 上张成的线性子空间，在连续函数空间 $C(G, \mathbb{C})$ 中一致稠密。
:::

::: {.proof}
经分离商把问题归约到紧豪斯多夫群。矩阵元线性张成包含常值函数（对应平凡一维表示），在逐点乘法下封闭（由表示的张量积实现），且在复共轭下封闭（由对偶/共轭幺正表示实现），从而构成 $C(G, \mathbb{C})$ 中的含幺星子代数。对任意不同两点 $x \neq y$，对 $x y^{-1} \neq 1$ 的补邻域应用 [@thm-ch10-unitary-kernel-separation] 即得某个矩阵元在 $x$ 与 $y$ 处取值不同。由复数版斯通—魏尔斯特拉斯定理，该星子代数在 $C(G, \mathbb{C})$ 中一致稠密。完整证明由 Lean 内核检查。
:::

紧接着，每个不可约自旋壳究竟携带多少独立自由度？下述特征标核秩定理以纯粹的线性代数精确钉死了每个不可约壳层的维数平方和法则。

::: {.theorem #thm-ch10-character-kernel-rank title="特征标核平移张成子空间的维数平方和" lean="D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel"}
设 $k$ 为代数闭域，$G$ 为群，$\{\rho_i : G \to \mathrm{GL}_k(W_i)\}_{i \in \iota}$ 为有限族两两不等价的有限维不可约表示，$c : \iota \to k$ 为处处非零的权重函数。则特征标核截面族

$$
y \;\longmapsto\; \Bigl(x \;\mapsto\; \sum_{i \in \iota} c_i\,\chi_{\rho_i}(x y^{-1})\Bigr)
$$

在函数空间 $G \to k$ 中张成的 $k$-线性子空间，其维数精确等于

$$
\dim_k \operatorname{span}_k \Bigl\{\, x \mapsto \sum_{i \in \iota} c_i\,\chi_{\rho_i}(x y^{-1}) \;\Big|\; y \in G \,\Bigr\} \;=\; \sum_{i \in \iota} (\dim_k W_i)^2.
$$

:::

::: {.proof}
构造由端同态直和 $\prod_{i \in \iota} \operatorname{End}_k(W_i)$ 映至函数空间 $G \to k$ 的线性映射 $\Phi(A)(x) = \sum_i c_i \operatorname{Tr}(\rho_i(x) A_i)$。由特征标的乘积展开，截面族恰是像集 $\{\rho_i(y^{-1})\}_i$ 在 $\Phi$ 下的像。因各 $\rho_i$ 不可约且两两不等价，在代数闭域上伯恩赛德—韦德伯恩定理给出 $\{\rho_i(g)\}_i$ 张满整个 $\prod_i \operatorname{End}_k(W_i)$；同时，因所有权重 $c_i \neq 0$ 且迹配对在每个矩阵代数上非退化，$\Phi$ 是单射。故截面族张成的空间同构于 $\prod_i \operatorname{End}_k(W_i)$，其维数精确为 $\sum_i (\dim_k W_i)^2$。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch10-peter-weyl-su2-literature title="彼得—魏尔正交分解与吉布斯截断边界（文献结果）"}
**文献结果，未在本书形式化。** 对紧致单连通李群 $S^3(\mathbb{R}) \cong \mathrm{SU}(2)$，全部有限维不可约表示由半整数自旋 $j \in \{0, \frac{1}{2}, 1, \frac{3}{2}, 2, \dots\}$ 唯一标定，第 $j$ 不可约空间 $\mathcal{V}_j \cong \operatorname{Sym}^{2j}(\mathbb{C}^2)$ 维数为 $2j + 1$，从而彼得—魏尔定理（F. Peter & H. Weyl，*Math. Ann.* **97**, 737–755, 1927；E. P. Wigner，1931）给出希尔伯特空间正交直和分解

$$
L^2(S^3(\mathbb{R})) \;\cong\; \widehat{\bigoplus_{2j = 0}^{\infty}} \;\mathcal{V}_j \otimes \mathcal{V}_j^*, \qquad \dim_{\mathbb{C}}(\mathcal{V}_j \otimes \mathcal{V}_j^*) \;=\; (2j + 1)^2,
$$

与 [@thm-ch10-character-kernel-rank] 的平方和维数法则逐壳吻合。平直狄利克雷硬截断在跳跃点处的极限过冲 $\frac{\operatorname{Si}(\pi)}{\pi} - \frac{1}{2} \approx 8.9490\%$ 源于 Wilbraham（1848）与 Gibbs（1898–1899）；三维球面上的硬截断对径重聚焦现象见 Pinsky（1994）与 Taylor（1997），而非负费耶尔/杰克逊平滑核的零过冲单调保界见 Fejér（1900）与 Jackson（1912）。
:::

---

## 10.2 前三座基频壳层：过去·现在·未来与倍频融合律 {#sec-ch10-causal-triad-shells}

将紧致球面 $S^3(\mathbb{R})$ 的彼得—魏尔自旋谱按维数从小到大排开，最底层的三座壳层——$j = 0$（维数 $1$）、$j = \frac{1}{2}$（维数 $2$）与 $j = 1$（维数 $3$）——并不是三组毫无干系的特殊函数。它们与[第七章](ch07-second-order-jet-calculus.md)二阶射流中“过去（零阶值）·现在（一阶切向）·未来（二阶曲率）”的三元因果母核逐一咬合。

给定非零实四元数 $p=(w,x,y,z)$，取有号单位四元数 $q=p/\lVert p\rVert\in S^3(\mathbb{R})$。其相对基准锚点 $p_0=(1,0,0,0)$ 的射影保真度为

$$
\kappa(p_0, p) \;=\; \frac{w^2}{w^2 + x^2 + y^2 + z^2} \;=\; \frac{w^2}{\lVert p\rVert^2} \;\in\; [0, 1].
$$

记 $c=\operatorname{Re}(q)=w/\lVert p\rVert$，则 $\kappa=c^2$。外尔特征标公式对任意 $j\in\frac12\mathbb{N}$ 给出 $\chi_j(q)=\Tr D^j(q)=U_{2j}(c)$。有理齐次坐标给出有理数 $\kappa$。在实单位四元数群上，$\kappa$ 的值遍及 $[0,1]$。

::: {.definition #def-ch10-causal-spin-shells title="前三阶基础自旋壳与因果母核对位"}
在实单位四元数群上，射影保真度 $\kappa \in [0,1]$ 是共轭类不变量；对于有理齐次坐标，$\kappa$ 是有理数。由此定义前三座基础自旋壳的特征核（跨学科因果对位属理论模型诠释）：

1. **$j = 0$ 单极常值壳（维数 $2j + 1 = 1$，壳层双侧维数 $1^2 = 1$）**：特征标恒为 $\chi_0(\kappa) \equiv 1$，对应球面全局直流均值与不随局部转动改变的**过去记忆锚**；
2. **$j = \frac{1}{2}$ 基础旋量壳（维数 $2j + 1 = 2$，壳层双侧维数 $2^2 = 4$）**：单侧特征标 $\chi_{1/2}(q) = 2c$ 携带双覆叠符号翻转 $q \mapsto -q$，其**平方核**直接化为纯一次有理单项式 $\chi_{1/2}^2(\kappa) = 4\kappa$，对应承载当下比较切面的一阶**现在狄拉克旋量切片**；
3. **$j = 1$ 三维伴随曲率壳（维数 $2j + 1 = 3$，壳层双侧维数 $3^2 = 9$）**：穿透射影商 $\mathrm{SO}(3) \cong S^3(\mathbb{R})/\{\pm 1\}$ 后仅依赖 $\kappa$，特征标为精确一次整系数多项式 $\chi_1(\kappa) = 4\kappa - 1$，对应驱动后续演化的二阶**未来三维伴随曲率场**。
:::

这三座壳层并非彼此孤立，而是被一条最简洁的代数恒等式焊为一体：

$$
\chi_{1/2}^2(\kappa) \;=\; 4\kappa \;\equiv\; 1 \;+\; (4\kappa - 1) \;=\; \chi_0(\kappa) \;+\; \chi_1(\kappa).
$$

在表示论上，这正是 $\mathrm{SU}(2)$ 的**克莱布施—高登（Clebsch–Gordan）倍频融合律**（维数算账 $2 \times 2 = 1 + 3$）：

$$
\mathcal{V}_{1/2} \otimes \mathcal{V}_{1/2} \;\cong\; \mathcal{V}_0 \;\oplus\; \mathcal{V}_1.
$$

它的几何含义直抵物理直觉的核心：把两份“现在”的 $j = \frac{1}{2}$ 旋量状态摆在一起作张量比较（“关系的关系”），其反对称行列式单态沉淀为一条旋转不变的 $j = 0$ 过去标量记忆（维数 $1$），而对称无迹的三元分量恰好激发一座 $j = 1$ 的三维伴随曲率场（维数 $3$）。在纯整数三拍闭合旋子 $g_{120} = (1, 1, 1, 1)$ 处（[第三章](ch03-canonical-ternion-manifold.md)与[第五章](ch05-rational-cayley-rotations.md)），有 $\lVert g_{120}\rVert^2 = 4$ 且 $\kappa = \frac{1}{4}$，代入 $\chi_1(\kappa)$ 立即给出

$$
\chi_1\!\left(\frac{1}{4}\right) \;=\; 4 \cdot \frac{1}{4} - 1 \;=\; 0,
$$

无需一个小数或三角函数，便验证了 $120^\circ$ 正交三拍旋转在伴随空间中的零迹正交节点。下表总结了平直 $\mathbb{R}$、二维球面 $S^2$ 与有号实单位四元数群 $S^3(\mathbb{R})$ 上三种调和分析范式的根本分水岭。

| 比较维度 | 平直傅里叶变换（$\mathbb{R}$） | 二维球谐展开（$S^2, Y_\ell^m$） | 彼得—魏尔谱（$\mathrm{SU}(2)$） |
| :--- | :--- | :--- | :--- |
| **空间拓扑与代数** | 开口非紧实轴 $(-\infty, +\infty)$ | 紧致但非群（$\chi(S^2) = 2$ 毛球障碍） | 紧致的有号实单位四元数群 $S^3(\mathbb{R})$ |
| **频谱结构** | 连续无界实频谱 $\xi \in \mathbb{R}$ | 仅含整数角动量 $\ell \in \mathbb{N}$ | 完备半整数自旋壳 $j \in \frac{1}{2}\mathbb{N}$，维数 $(2j+1)^2$ |
| **基本核函数** | 超越复指数 $e^{-\hat{\mathbf{i}}2\pi\xi x}$ | 连带勒让德函数配极轴奇点 | 矩阵元 $D^j_{ab}(q)$。矩阵的迹给出特征标 $\chi_j(q)=U_{2j}(c)$，整数自旋 $j=n$ 时等于 $E_n(\kappa)$。 |
| **底层基波意义** | 无离散基频，依赖原点平移 | $\ell = 0$ 标量与 $\ell = 1$ 极矢 | $j = 0$ 过去锚、$j = \frac{1}{2}$ 现在旋量、$j = 1$ 未来曲率 |
| **卷积结构** | 依赖原点的阿贝尔标量乘积 | 无内禀群卷积 | $\mathrm{SU}(2)$ 上归一化哈尔测度下的 $L^1$ 三元卷积 $\to$ 矩阵乘积 $\widehat{f}_j \widehat{g}_j^\dagger \widehat{h}_j$ |

---

## 10.3 偶次切比雪夫多项式 $E_n(\kappa)$：彻底清除全部整数自旋壳的根号 {#sec-ch10-even-chebyshev-kernels}

为什么第二类切比雪夫多项式会从三维三元数流群里自然长出来，而不是我们从教科书里生搬硬套进来的？因为流群的等步反射递推本身就是切比雪夫多项式的母引擎。下面这条已经 Lean 内核验证的等价定理，将四元数三次流群反射与两类切比雪夫多项式彻底锁死为同一件事。

::: {.theorem #thm-ch10-heap-chebyshev-recurrence title="四元数流群反射递推与切比雪夫多项式的等价性" lean="D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev"}
设 $x : \mathbb{N} \to \mathbb{H}[\mathbb{R}]$ 为实四元数序列，记首步实内积 $c := \langle x_0, x_1\rangle_{\mathbb{R}}$，并约定 $U_{-1} := 0$。则 $x$ 满足单位归一化与三次流群反射递推

$$
\operatorname{normSq}(x_0) = 1, \qquad \operatorname{normSq}(x_1) = 1, \qquad \forall n \in \mathbb{N},\;\; x_{n+2} = x_{n+1}\bar{x}_n x_{n+1},
$$

当且仅当对一切 $n \in \mathbb{N}$ 同时成立：

$$
\operatorname{normSq}(x_n) = 1, \qquad x_{n+1} = U_n(c)\,x_1 - U_{n-1}(c)\,x_0, \qquad \langle x_0, x_n\rangle_{\mathbb{R}} = T_n(c),
$$

其中 $T_n$ 与 $U_n$ 分别为第一类与第二类整系数切比雪夫多项式。
:::

::: {.proof}
在单位四元数球面上，四元数反射恒等式给出 $u \bar{v} u = 2\langle u, v\rangle_{\mathbb{R}}\,u - \operatorname{normSq}(u)\,v$。正向由归纳法先证相邻步内积恒等于常数 $c$ 且模方恒为 $1$，从而三次非线性流群递推化为二阶线性递推 $x_{n+2} = 2c\,x_{n+1} - x_n$，与 $U_n$ 的三项递推逐项重合，再取与 $x_0$ 的内积并利用 $T_n(c) = U_n(c) - c U_{n-1}(c)$ 得 $\langle x_0, x_n\rangle_{\mathbb{R}} = T_n(c)$；反向直接由切比雪夫递推还原相邻内积为 $c$ 并代回四元数反射恒等式。完整证明由 Lean 内核检查。
:::

[@thm-ch10-heap-chebyshev-recurrence] 揭示了一个关键事实：当步长为半角余弦 $c$ 时，$U_m(c)$ 是关于 $c$ 的整系数多项式。可是在规范齐次代表元 `CanonProjTernion` 上，不引入开方运算所能直接读出的原生有理量不是 $c = \pm\sqrt{\kappa}$，而是它的平方 $\kappa = c^2 \in \mathbb{Q} \cap [0, 1]$！如果 $U_{2n}(c)$ 里混有任何奇次幂 $c^{2k+1}$，我们就会在计算高阶自旋特征标时被迫退回无理平方根 $\sqrt{\kappa}$。幸运的是，对于**一切整数自旋** $j = n \in \mathbb{N}$，偶指标多项式 $U_{2n}(c)$ 是偶函数，只含 $c$ 的偶次幂。因此我们可以完全绕开 $c$ 与 $\sqrt{\kappa}$，直接在整系数多项式环 $\mathbb{Z}[\kappa]$ 内定义偶次切比雪夫族 $E_n(\kappa)$。

::: {.definition #def-ch10-even-chebyshev title="偶次整系数切比雪夫特征多项式族"}
在整系数多项式环 $\mathbb{Z}[\kappa]$ 上，通过二阶线性递推递归定义多项式序列 $\{E_n(\kappa)\}_{n \in \mathbb{N}}$：

$$
E_0(\kappa) \;=\; 1, \qquad E_1(\kappa) \;=\; 4\kappa - 1, \qquad E_{n+1}(\kappa) \;=\; (4\kappa - 2)\,E_n(\kappa) - E_{n-1}(\kappa) \quad (n \ge 1).
$$

:::

我们来手工给出**普遍消根号恒等式 $E_n(c^2) = U_{2n}(c)$** 的完整初等归纳证明（不借任何三角函数或复数）。对 $n = 0$，$E_0(c^2) = 1 = U_0(c)$；对 $n = 1$，$U_1(c) = 2c$，故 $U_2(c) = 2c\,U_1(c) - U_0(c) = 4c^2 - 1 = E_1(c^2)$。设对所有不大于 $n$ 的非负整数已有 $E_k(c^2) = U_{2k}(c)$（$n \ge 1$）。连用两次标准切比雪夫递推 $U_{m+1}(c) = 2c\,U_m(c) - U_{m-1}(c)$：

$$
\begin{aligned}
U_{2n+2}(c) &\;=\; 2c\,U_{2n+1}(c) - U_{2n}(c) \\
&\;=\; 2c\bigl(2c\,U_{2n}(c) - U_{2n-1}(c)\bigr) - U_{2n}(c) \\
&\;=\; (4c^2 - 1)\,U_{2n}(c) - 2c\,U_{2n-1}(c).
\end{aligned}
$$

与此同时，对下标 $2n$ 写下同一递推 $U_{2n}(c) = 2c\,U_{2n-1}(c) - U_{2n-2}(c)$，移项即得 $2c\,U_{2n-1}(c) = U_{2n}(c) + U_{2n-2}(c)$。将其代入上式，奇下标项 $U_{2n-1}(c)$ 干净消失：

$$
U_{2n+2}(c) \;=\; (4c^2 - 1)\,U_{2n}(c) - \bigl(U_{2n}(c) + U_{2n-2}(c)\bigr) \;=\; (4c^2 - 2)\,U_{2n}(c) - U_{2n-2}(c).
$$

由归纳假设，右端正是 $(4c^2 - 2)\,E_n(c^2) - E_{n-1}(c^2) = E_{n+1}(c^2)$。归纳完成！这意味着**全套整数自旋壳层 $j = 0, 1, 2, 3, \dots$ 的球面特征标 $\chi_j(\kappa) = E_j(\kappa)$ 统统是纯整系数有理多项式，平方根 $\sqrt{\kappa}$ 在全谱范围内恒等消去**。

对 $j=n+\frac12$，有号特征标为 $U_{2n+1}(c)=c\,\operatorname{oddFactor}_n(\kappa)$。将 $q$ 换为 $-q$ 会翻转其符号。射影读数确定它的绝对值 $\sqrt{\kappa}\,\lvert\operatorname{oddFactor}_n(\kappa)\rvert$ 和平方 $\kappa\,\operatorname{oddFactor}_n(\kappa)^2$。有理齐次输入下，该平方及所有整数自旋特征标都取有理值。例如 $p=(1,1,0,0)$ 给出 $\kappa=1/2$，基础特征标的绝对值却为 $\sqrt{2}$。在 $\operatorname{Sym}^{2j}(\mathbb C^2)$ 的单项式基中，每个矩阵元都是单位四元数坐标的 $2j$ 次齐次式。矩阵元与共轭矩阵元相乘，在整数输入上分母为 $\lVert p\rVert^{4j}=(\lVert p\rVert^2)^{2j}$，因而双侧读数也消去根号和提升的符号。

上述切比雪夫母引擎的五条单壳核心恒等式——有号佩尔关系、第一类倍阶律、全体整数自旋壳的普遍消根号律、全体半整数自旋壳的有号因子分解，以及有理自旋 $j = 2$ 特征标公式——均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由 Lean 内核直接证成：

::: {.theorem #thm-ch10-zero-axiom-chebyshev-shells title="切比雪夫佩尔律、倍阶律、偶奇自旋壳消根号与自旋二特征标" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.pell_chebyshev D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.chebyshev_doubling D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.even_chebyshev D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.odd_chebyshev D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.spin_two_character"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。记整数环上的第一、二类切比雪夫多项式为 $T_n(x), U_n(x)$，偶次壳多项式为 $E_n(k)$，奇次壳因子多项式为 $\operatorname{oddFactor}_n(k)$，则以下五条定理严格成立：

1. **有号佩尔恒等式**（`pell_chebyshev`）：对任意整数 `x : Omega.Int` 与自然数 `n : Omega.Nat`，整数精确相等

   $$
   T_{n+1}(x)^2 - (x^2 - 1)\,U_n(x)^2 \;=\; 1.
   $$

2. **第一类切比雪夫倍阶律**（`chebyshev_doubling`）：对任意 `x : Omega.Int` 与 `n : Omega.Nat`，整数精确相等

   $$
   T_{2n}(x) \;=\; 2\,T_n(x)^2 - 1.
   $$

3. **全体整数自旋壳的普遍消根号律**（`even_chebyshev`）：对任意 `x : Omega.Int` 与 `n : Omega.Nat`，整数精确相等

   $$
   E_n(x^2) \;=\; U_{2n}(x).
   $$

4. **全体半整数自旋壳的有号因子分解**（`odd_chebyshev`）：对任意 `x : Omega.Int` 与 `n : Omega.Nat`，整数精确相等

   $$
   x \cdot \operatorname{oddFactor}_n(x^2) \;=\; U_{2n+1}(x).
   $$

5. **有理自旋二特征标封闭式**（`spin_two_character`）：对任意有限有理数 `k : Omega.FiniteRatio`，在有理等价关系 `Omega.FiniteRatio.Equivalent` 下恒有

   $$
   E_2(k) \;\equiv\; 16 k^2 - 12 k + 1.
   $$

:::

::: {.proof}
五条命题均在 `module` $+$ `prelude` 隔离环境中直接由抽象交换环上的切比雪夫三项递推归约证毕，并分别实例化至整数环 `intRing` 与有限有理环 `rationalRing`。第 1 款借关系 $T_{n+1}(x) = U_{n+1}(x) - x U_n(x)$ 将左端改写为二阶递推不变量 $U_{n+1}(x)^2 - 2x U_{n+1}(x) U_n(x) + U_n(x)^2$，对 $n$ 归纳立得其恒等于初值 $1$；第 2 款由和差复合律与第 1 款归纳锁死 $T_{2n}(x) = 2 T_n(x)^2 - 1$；第 3 款按前文两步递推消去奇下标项归纳证得 $E_n(x^2) = U_{2n}(x)$；第 4 款由 $U_{2n+1}(x) = 2x U_{2n}(x) - U_{2n-1}(x)$ 配合第 3 款归纳抽出公因子 $x$；第 5 款在 `rationalRing` 中直接展开 $E_2(k) = (4k - 2)(4k - 1) - 1$ 并在 `Omega.FiniteRatio.Equivalent` 下化为 $16k^2 - 12k + 1$。完整证明由 Lean 内核检查。
:::

更进一步，不止单座自旋壳的内部结构，任意两座整数自旋壳之间的**全阶克莱布施—高登（Clebsch–Gordan）特征标融合律**——也就是 §10.2 低阶倍频融合律在全部整数自旋 $(m, n) \in \mathbb{N}^2$ 上的普遍推广——同样已作为纯有理系数表恒等式在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由 Lean 内核直接证成。

::: {.theorem #thm-ch10-even-char-product-sum title="全阶整数自旋特征标乘积律" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.evenChar_product_sum"}
所引 D5 声明的严格端记录为 `strict_omega.axioms: []`。将 [@def-ch10-even-chebyshev] 递推生成的第 $r$ 阶偶次切比雪夫特征多项式 $E_r(\kappa)$ 按 $\kappa$ 的升幂表为有理系数表 `evenCharPoly r : CoefficientList`（对应 $2r$ 次切比雪夫特征标 $U_{2r}(\sqrt{\kappa})$），并记 `evenCharProductSum m n` 为闭区间和 $\sum_{r = \lvert m - n\rvert}^{m + n} E_r(\kappa)$ 的有理系数表（起点为 `gap m n` $= \lvert m - n\rvert$，跨度为 `span m n` $= 2\min(m, n)$，终点 $\lvert m - n\rvert + 2\min(m, n) = m + n$）。则对一切自然数 $m, n \in \mathbb{N}$，多项式卷积乘积与该有限特征标和在逐次幂系数等价关系 `Poly.RatioSame`（缺省高次项视作 $0$，每阶系数满足 `Omega.IntRatio.Equivalent`）下严格相等：

$$
E_m(\kappa)\,E_n(\kappa) \;\equiv\; \sum_{r = \lvert m - n\rvert}^{m + n} E_r(\kappa).
$$
:::

::: {.proof}
先在整系数多项式列表 `Poly` 上处理有序情形 $n = d + m$（此时 $\lvert m - n\rvert = d$ 且 $m + n = d + 2m$），对 $m$ 施以相邻双阶归纳。基步 $m = 0$ 为平凡乘积 $E_0 E_d = E_d$；基步 $m = 1$ 将 $E_1(\kappa) = 4\kappa - 1$ 改写为 $(4\kappa - 2) + 1$，由定义递推立得 $E_1 E_{d+1} = E_{d+2} + E_{d+1} + E_d$。归纳步将 $E_{m+2} = (4\kappa - 2)E_{m+1} - E_m$ 乘以 $E_n$：由线性递推算子对连续和的作用规律，$(4\kappa - 2)\sum_{r = d+1}^{d+2m+1} E_r = \sum_{r = d+2}^{d+2m+2} E_r + \sum_{r = d}^{d+2m} E_r$，再减去下阶归纳假设 $\sum_{r = d+2}^{d+2m} E_r$，重叠中段望远镜式抵消，恰余 $\sum_{r = d}^{d+2m+2} E_r$。对一般 $m, n \in \mathbb{N}$，由自然数差值二分法必有 $n = d + m$ 或 $m = d + n$，借多项式乘法交换律与两端点 $\lvert m - n\rvert, m + n$ 的对称性化归至有序情形；最后借 `Poly.ratios_mul` 将整系数逐项相等 `Poly.Same` 提升为 `CoefficientList` 上的 `Poly.RatioSame`。完整证明由 Lean 内核检查。
:::

在[第十一章](ch11-pi-free-haar-integration.md)中，这条零公理全阶多项式乘积律将直接充当总开关，一步锁死全体整数自旋壳层上的无 $\pi$ 彼得—魏尔正交归一性。

::: {.example #ex-ch10-spin-character-table title="低阶自旋特征核在典范有理地标上的精确求值表"}
由 [@def-ch10-even-chebyshev]、[@thm-ch10-zero-axiom-chebyshev-shells] 与 [@thm-ch10-even-char-product-sum] 逐项展开前四阶整数自旋核与前两阶半整数平方核：

- $E_0(\kappa) = 1$，$E_1(\kappa) = 4\kappa - 1$，
- $E_2(\kappa) = (4\kappa - 2)(4\kappa - 1) - 1 = 16\kappa^2 - 12\kappa + 1$，
- $E_3(\kappa) = (4\kappa - 2)(16\kappa^2 - 12\kappa + 1) - (4\kappa - 1) = 64\kappa^3 - 80\kappa^2 + 24\kappa - 1$，
- $\chi_{1/2}^2(\kappa) = 4\kappa$，$\chi_{3/2}^2(\kappa) = \bigl(U_3(\sqrt{\kappa})\bigr)^2 = \bigl(8\kappa^{3/2} - 4\kappa^{1/2}\bigr)^2 = 16\kappa(2\kappa - 1)^2 = 64\kappa^3 - 64\kappa^2 + 16\kappa$。

在六个典范有理保真度地标 $\kappa \in \{1, \frac{3}{4}, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, 0\}$ 上，精确有理值汇总如下：

| 特征核 | $\kappa = 1$ | $\kappa = \frac{3}{4}$ | $\kappa = \frac{1}{2}$ | $\kappa = \frac{1}{3}$ | $\kappa = \frac{1}{4}$ | $\kappa = 0$ |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| $\chi_0(\kappa) = 1$ | $1$ | $1$ | $1$ | $1$ | $1$ | $1$ |
| $\chi_1(\kappa) = 4\kappa - 1$ | $3$ | $2$ | $1$ | $1/3$ | $0$ | $-1$ |
| $\chi_2(\kappa) = 16\kappa^2 - 12\kappa + 1$ | $5$ | $1$ | $-1$ | $-11/9$ | $-1$ | $1$ |
| $\chi_3(\kappa) = 64\kappa^3 - 80\kappa^2 + 24\kappa - 1$ | $7$ | $-1$ | $-1$ | $13/27$ | $1$ | $-1$ |
| $\chi_{1/2}^2(\kappa) = 4\kappa$ | $4$ | $3$ | $2$ | $4/3$ | $1$ | $0$ |
| $\chi_{3/2}^2(\kappa) = 16\kappa(2\kappa - 1)^2$ | $16$ | $3$ | $0$ | $16/27$ | $1$ | $0$ |

注意表中的两处精确有理节点：在三拍整旋子地标 $\kappa = \frac{1}{4}$ 处，$\chi_1(\frac{1}{4}) = 0$；在正交赤道地标 $\kappa = \frac{1}{2}$ 处，$\chi_{3/2}^2(\frac{1}{2}) = 0$。在 $q=1$ 处，$\chi_j(q)=2j+1$，表中整数自旋给出 $1,3,5,7$。两个提升 $q=\pm1$ 均有 $\kappa=1$，其 $\chi_{1/2}(q)=\pm2$，平方均为 $4$。
:::

---

## 10.4 无原点三元流群卷积与 $j = 2$ 四极物理检验台 {#sec-ch10-heap-convolution-and-quadrupole}

拥有了离散自旋壳层与纯有理特征核之后，调和分析还必须回答两道硬问题：第一，在没有特权单位元 $1$ 的无原点流群上，卷积如何定义并在频域对角化？第二，高阶整自旋壳层（例如五维的 $j = 2$ 四极壳）在真实物理世界中究竟对应什么可检验结构？

### 10.4.1 无原点三元流群卷积的频域分块对角化 {#sec-ch10-ternary-convolution}

传统群卷积 $(f * g)(w) = \mathbb{E}_x[f(x)g(x^{-1}w)]$ 暗中依赖一个钦定原点 $1$ 才能写下逆元 $x^{-1}$。三元运算 $[\mathbf{x}, \mathbf{y}, \mathbf{z}]$ 则无需钦定单位元（[第四章](ch04-heaps-and-lie-triple-curvature.md)）。这里在经典紧群 $SU(2)\cong S^3(\mathbb{R})$ 上取归一化哈尔测度 $\mu$，多变量期望使用乘积测度。对连续复值信号 $f,g,h$，以下积分在每个 $\mathbf{w}$ 处绝对收敛。对 $f,g,h\in L^1(\mu)$，同一公式几乎处处定义**无原点三元流群卷积**：

$$
(f \circledast g \circledast h)(\mathbf{w}) \;:=\; \mathbb{E}_{\mathbf{x},\,\mathbf{y}}\!\Bigl[f(\mathbf{x})\,\overline{g(\mathbf{y})}\,h\bigl([\mathbf{y}, \mathbf{x}, \mathbf{w}]\bigr)\Bigr].
$$

固定 $\mathbf{x},\mathbf{y}$，映射 $\mathbf{w}\mapsto\mathbf{z}=[\mathbf{y},\mathbf{x},\mathbf{w}]$ 是保哈尔测度的左平移，逆映射为 $\mathbf{w}=[\mathbf{x},\mathbf{y},\mathbf{z}]$。由 Tonelli 定理，被积函数绝对值在 $\mathbf{x},\mathbf{y},\mathbf{w}$ 上的积分恰为 $\|f\|_1\|g\|_1\|h\|_1$。因此卷积属于 $L^1(\mu)$，所得等价类与三个输入代表元的选择无关。

设 $D^j$ 为第 $j$ 阶 $(2j+1)$ 维幺正表示，满足 $D^j([\mathbf{x}, \mathbf{y}, \mathbf{z}]) = D^j(\mathbf{x})\,D^j(\mathbf{y})^\dagger\,D^j(\mathbf{z})$。定义第 $j$ 壳矩阵傅里叶系数 $\widehat{f}_j := \mathbb{E}_{\mathbf{x}}[f(\mathbf{x})\,D^j(\mathbf{x})]$。表示有界，故上述绝对可积性也适用于逐矩阵元的计算。用 Fubini 定理和同一换元便可手工推出卷积的傅里叶分块公式：

$$
\begin{aligned}
\widehat{(f \circledast g \circledast h)}_j
&\;=\; \mathbb{E}_{\mathbf{w}}\!\Bigl[(f \circledast g \circledast h)(\mathbf{w})\,D^j(\mathbf{w})\Bigr] \\
&\;=\; \mathbb{E}_{\mathbf{x},\,\mathbf{y},\,\mathbf{z}}\!\Bigl[
    f(\mathbf{x})\,\overline{g(\mathbf{y})}\,h(\mathbf{z})\,
    D^j(\mathbf{x})\,D^j(\mathbf{y})^\dagger\,D^j(\mathbf{z})\Bigr] \\
&\;=\; \widehat{f}_j\,\widehat{g}_j^\dagger\,\widehat{h}_j.
\end{aligned}
$$

仅有逐点有限的 Borel 函数仍可能使积分发散。取 $g=h=1$，令 $f(q)=(1-q_0)^{-2}$（$q\ne 1$，$q_0$ 为四元数的实部），并置 $f(1)=0$。在单位元附近，用 $q=(\sqrt{1-|u|^2},u)$ 作坐标，则 $1-q_0\le |u|^2$，哈尔密度相对于三维体积在此处有正下界。积分因此至少发散如 $\int_0^\epsilon r^{-2}\,dr$，每个 $\mathbf{w}$ 处的卷积以及 $j=0$ 的傅里叶系数都无有限值。

空间域中的曲面三元搬运——从三维旋转滤波到三元数场注意力机制 $[\mathbf{Q}, \mathbf{K}, \mathbf{V}]$——翻入彼得—魏尔频域后，拆解为每一阶自旋壳上的矩阵三连乘。在有限非阿贝尔群上，归一化哈尔期望就是有限平均，所有复值函数都可用同样的分块公式。例如 $8$ 元四元数群 $Q_8$ 的不可约维数满足 $4 \times 1^2 + 2^2 = 8$，$24$ 元赫维茨二元四面体群 $2T$（[第十四章](ch14-adelic-closure-and-hurwitz-primes.md)）的七个不可约块满足 $3 \times 1^2 + 3 \times 2^2 + 3^2 = 24$。

### 10.4.2 凝聚态 $j = 2$ 有理谐波：$d^{10}$ 各向同性与 $d^8$ 四极张量平衡 {#sec-ch10-d10-vs-d8-quadrupole}

$j = 0, \frac{1}{2}, 1$ 之后的第一座高阶整数自旋壳就是五维四极壳 $j = 2$，其特征标正是前面算出的 $E_2(\kappa) = 16\kappa^2 - 12\kappa + 1$。它在原子与凝聚态物理中有现成的天然实验台：重过渡金属金离子价层 $5d$ 轨道张成的恰恰是自旋/轨道角动量 $j = 2$ 的五维实谐波壳层 $\{d_{z^2}, d_{xz}, d_{yz}, d_{xy}, d_{x^2-y^2}\}$。

考察单位球面上的无迹角向电四极算符 $\widehat{Q}_{ab} = 3 n_a n_b - \delta_{ab}$（$a, b \in \{x, y, z\}$，$\Tr\widehat{\mathbf{Q}} = 0$；实际物理电四极矩另乘径向电荷因子 $-e\langle r^2\rangle_{5d}$ 并叠加以配体晶格贡献，属配位场文献背景）。对五条归一化实 $d$ 谐波逐一求无迹角向期望，全部结果竟然都是分母仅为 $7$ 的纯有理分数，不含半个 $\pi$ 或无理根号；而且五轨道满壳归零、$d^{10}$ 闭壳各轴归零与抽去一枚双占据轨道后的无迹 $d^8$ 精确有理对角平衡，均已在使用 `OmegaInit` 与 `OmegaMath` 的 D5 形式化（`strict_omega.axioms: []`）中由 Lean 内核直接锁死：

::: {.theorem #thm-ch10-zero-axiom-orbital-quadrupole title="$d^{10}$ 与 $d^8$ 轨道角向四极张量归零与无迹对角平衡" lean="D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.orbital_quadrupole D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.full_orbital_quadrupole"}
所引 D5 声明各自的严格端记录为 `strict_omega.axioms: []`，官方端记录为 `axioms: ["propext"]`。于有号精确比值等价 `Omega.IntRatio.Equivalent` 下，五条实 $d$ 轨道角向四极对角账本满足以下两条定理：

1. **$d^{10}$ 闭壳归零与双空轨道 $d^8$ 无迹对角平衡**（`orbital_quadrupole`）：

   - 对每一条笛卡尔坐标轴 $a \in \{x, y, z\}$（`Orbitals.Axis`），双占据闭壳对角元恒为零：`Orbitals.closedShell a` $\equiv 0$；
   - 从闭壳中抽去一枚双占据轨道后，残留的 $d^8$ 对角张量精确等于

     $$
     \operatorname{deletedShell}(x) \equiv -\frac{4}{7}, \qquad \operatorname{deletedShell}(y) \equiv -\frac{4}{7}, \qquad \operatorname{deletedShell}(z) \equiv +\frac{8}{7},
     $$

     且三轴对角迹和严格为零：$\operatorname{deletedShell}(x) + \operatorname{deletedShell}(y) + \operatorname{deletedShell}(z) \equiv 0$。

2. **五条实 $d$ 轨道等权和全轴归零**（`full_orbital_quadrupole`）：对每一条笛卡尔坐标轴 $a \in \{x, y, z\}$（`Orbitals.Axis`），五条实 $d$ 轨道的角向四极对角元之和恒为零：`Orbitals.fullShell a` $\equiv 0$。
:::

::: {.proof}
按七分之一分母对五条实 $d$ 轨道对角元直接执行精确整数求和：沿 $x$ 轴分子和为 $(-2) + 2 + (-4) + 2 + 2 = 0$，沿 $y$ 轴为 $(-2) + (-4) + 2 + 2 + 2 = 0$，沿 $z$ 轴为 $4 + 2 + 2 + (-4) + (-4) = 0$，遂在 `Omega.IntRatio.Equivalent` 下逐轴证毕 `full_orbital_quadrupole`，并由双占据加倍立得 `closedShell a` $\equiv 0$。从零闭壳中减去双占据轨道对角贡献 $(+\frac{4}{7}, +\frac{4}{7}, -\frac{8}{7})$，即得精确三元组 $(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7})$，且分子和 $(-4) + (-4) + 8 = 0$ 验证无迹性。完整证明由 Lean 内核检查。
:::

下图把本章两条主线合绘于同一视野：左侧呈现偶次切比雪夫整数自旋特征壳 $E_0(\kappa), E_1(\kappa), E_2(\kappa), E_3(\kappa)$ 在 $[0, 1]$ 上的无根号有理曲线与典范节点，右侧直观对照五维 $j = 2$ 壳层中 $5d^{10}$ 闭壳各轴归零与 $5d^8$ 无迹四极对角张量 $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$ 的精确有理平衡。

::: {.figure src="ch10-chebyshev-spin-shells"}
**偶次切比雪夫整数自旋壳与 $5d^{10}/5d^8$ 四极张量平衡。** 左侧在保真度区间 $\kappa \in [0, 1]$ 上绘出纯整系数偶次切比雪夫特征标 $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$（[@def-ch10-even-chebyshev]、[@thm-ch10-zero-axiom-chebyshev-shells]），标明单位锚 $\kappa = 1$ 处的维数阶梯 $1, 3, 5, 7$ 与三拍节点 $\kappa = \frac{1}{4}$ 处的 $E_1(\frac{1}{4}) = 0$；右侧对照五条实 $d$ 轨道在满壳 $5d^{10}$ 中的三轴精确归零与抽去双占据 $d_{x^2-y^2}$ 轨道后残留的 $5d^8$ 无迹有理四极对角元 $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$（[@thm-ch10-zero-axiom-orbital-quadrupole]）。
:::

::: {.example #ex-ch10-d10-d8-quadrupole-ledger title="五维 $j = 2$ 壳层角向四极期望账本：$d^{10}$ 归零与 $d^8$ 精确平衡"}
在笛卡尔方向余弦 $(n_x, n_y, n_z)$ 上，五条归一化实 $d$ 谐波关于角向四极算符 $\widehat{Q}_{ab} = 3n_a n_b - \delta_{ab}$ 的非对角元全为 $0$（手算推导），其对角元 $(\langle \widehat{Q}_{xx}\rangle, \langle \widehat{Q}_{yy}\rangle, \langle \widehat{Q}_{zz}\rangle)$ 精确构成下述支撑 [@thm-ch10-zero-axiom-orbital-quadrupole] 的纯有理账本：

| 实 $d$ 谐波轨道 | 角向多项式形式 | $\langle \widehat{Q}_{xx}\rangle$ | $\langle \widehat{Q}_{yy}\rangle$ | $\langle \widehat{Q}_{zz}\rangle$ | 迹和检验 |
| :--- | :--- | ---: | ---: | ---: | ---: |
| $d_{z^2}$ | $\propto 3n_z^2 - 1$ | $-2/7$ | $-2/7$ | $+4/7$ | $0$ |
| $d_{xz}$ | $\propto n_x n_z$ | $+2/7$ | $-4/7$ | $+2/7$ | $0$ |
| $d_{yz}$ | $\propto n_y n_z$ | $-4/7$ | $+2/7$ | $+2/7$ | $0$ |
| $d_{xy}$ | $\propto n_x n_y$ | $+2/7$ | $+2/7$ | $-4/7$ | $0$ |
| $d_{x^2 - y^2}$ | $\propto n_x^2 - n_y^2$ | $+2/7$ | $+2/7$ | $-4/7$ | $0$ |
| **五轨道等权和** | **$j = 0$ 标量闭壳** | **$0$** | **$0$** | **$0$** | **$0$** |

由此立得两类氧化态的精确有理四极平衡：

1. **一价金 $\mathrm{Au}^+$（$5d^{10}$ 满壳层）**：五条实 $d$ 轨道全部双占据（各乘权重 $2$），逐列相加精确抵消，退化回 $j = 0$ 单极球对称，角向四极张量恒等于零矩阵 $\mathbf{Q}(5d^{10}) = \mathbf{0}_{3\times 3}$；
2. **平面四方三价金 $\mathrm{Au}^{3+}$（$5d^8$ 强平面配位场）**：强 $D_{4h}$ 平面配位场将平面内反键轨道 $5d_{x^2-y^2}$ 推高并抽空其两枚电子，等价于从满壳层中减去 $2\,\mathbf{Q}(d_{x^2-y^2}) = \diag(+\frac{4}{7}, +\frac{4}{7}, -\frac{8}{7})$，留下精确有理无迹角向四极张量：

   $$
   \mathbf{Q}_{\mathrm{phys}}(5d^8) \;=\; \mathbf{Q}(5d^{10}) - 2\,\mathbf{Q}(d_{x^2-y^2}) \;=\; \diag\!\left(-\frac{4}{7},\; -\frac{4}{7},\; +\frac{8}{7}\right) \;=\; \frac{12}{7}\,\diag\!\left(-\frac{1}{3},\; -\frac{1}{3},\; +\frac{2}{3}\right).
   $$

单个 $5d^8$ 配位中心具有本征强平面各向异性；唯有对无择优取向的多晶粉末在旋转群 $\mathrm{SO}(3)$ 上（等价地在其有号双覆盖 $\mathrm{SU}(2)$ 上）执行全域哈尔平均，无迹 $j = 2$ 壳层才正反相消归零 $\langle\mathbf{Q}_{\mathrm{phys}}(5d^8)\rangle_{\mathrm{Haar}} = \mathbf{0}_{3\times 3}$，在宏观上恢复统计各向同性。
:::

下面的影片把本章的四条线索——闭合谱、前三座壳、偶次切比雪夫消根号与 $j = 2$ 四极检验台——串成一段连续讲解。

::: {.film src="spin-shells-on-the-three-sphere"}
**把波放回三维球面，整数自旋壳的特征标就成为不含根号的整系数多项式（2 分 52 秒）。** 画面先把开口实轴上的波与闭合回路上首尾咬合的波并排（示意），再列出自旋壳阶梯 $j$ 与每壳 $(2j+1)^2$ 个函数（[@rem-ch10-peter-weyl-su2-literature]，文献结果），绿色标签指向 [@thm-ch10-matrix-coeff-density]；三张壳卡读出 $1$、$4\kappa$、$4\kappa - 1$，紫色的“过去·现在·未来”是模型诠释，$4\kappa = 1 + (4\kappa - 1)$、$2 \times 2 = 1 + 3$ 与整数旋子 $(1, 1, 1, 1)$ 处的 $\chi_1(\frac{1}{4}) = 0$ 为屏幕计算。$E_0$ 至 $E_3$ 的曲线与六个有理地标上的精确表（屏幕计算，同 [@ex-ch10-spin-character-table]）旁，绿色标签指向 [@thm-ch10-zero-axiom-chebyshev-shells] 中的消根号律、奇壳因子分解与自旋二特征标；$p = (1, 1, 0, 0)$ 处旋量特征标为 $\pm\sqrt{2}$、平方为 $2$（屏幕计算）。$3 \times 5$ 个点重排为 $3 + 5 + 7$，$E_1 E_2 = E_1 + E_2 + E_3 = 64\kappa^3 - 64\kappa^2 + 16\kappa - 1$ 为屏幕计算，绿色标签指向 [@thm-ch10-even-char-product-sum]；流群括号 $y\bar{x}w$ 与逐壳矩阵三连乘 $\widehat{f}_j \widehat{g}_j^\dagger \widehat{h}_j$ 是紫色的书面推导。最后，五条实 $d$ 轨道的四极账本（七分之几，屏幕计算）各列归零，青色与品红柱给出 $d^8$ 的 $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$，绿色标签指向 [@thm-ch10-zero-axiom-orbital-quadrupole]；金的氧化态属配位场背景。
:::

在下面的交互实验卡中，读者可以在有理保真度区间 $\kappa \in [0, 1]$ 上滑动或点选典范地标，实时检验消根号恒等式 $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$ 与全阶整数自旋克莱布施—高登融合展开 $E_m(\kappa)E_n(\kappa) = \sum_{r=\lvert m-n\rvert}^{m+n} E_r(\kappa)$（[@thm-ch10-zero-axiom-chebyshev-shells]、[@thm-ch10-even-char-product-sum]），并在 $j = 2$ 四极面板中切换轨道占据态，亲手核对 $5d^{10}$ 闭壳归零与 $5d^8$ 无迹对角三元组 $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$（[@thm-ch10-zero-axiom-orbital-quadrupole]）。

::: {.viz src="dfinite-algebraic-schur-lab" preset="peter-weyl-even-chebyshev" height="520"}
**彼得—魏尔偶次切比雪夫自旋壳与四极平衡实验卡（`peter-weyl-even-chebyshev`）。** 沿有理保真度 $\kappa$ 扫过偶次切比雪夫核 $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$ 的曲线与典范有理节点（[@ex-ch10-spin-character-table]），任选两座整数自旋壳 $(m, n)$ 实时展开融合乘积 $\sum_{r=\lvert m-n\rvert}^{m+n} E_r(\kappa)$，并在五维 $j = 2$ 轨道账本中比对 $5d^{10}$ 全轴归零与 $5d^8$ 无迹四极对角元 $\bigl(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7}\bigr)$（[@thm-ch10-zero-axiom-orbital-quadrupole]、[@ex-ch10-d10-d8-quadrupole-ledger]）。
:::

至此，一个悬而未决的核心难题浮上水面：无论是验证彼得—魏尔特征标正交性 $\langle \chi_j, \chi_{j'}\rangle = \delta_{jj'}$，计算三元流群卷积期望 $\mathbb{E}_{\mathbf{x},\mathbf{y}}[\cdots]$，还是证明 $5d^8$ 四极张量的球面旋转平均严格为零，我们都在反复调用**三维球面 $S^3(\mathbb{R})$ 上的全局哈尔期望 $\mathbb{E}_{S^3(\mathbb{R})}[\cdot]$**。按传统教科书的做法，求球面平均非得写出含 $\pi$ 的球面积分 $\frac{1}{2\pi^2}\int_{S^3}\cdots\,d\sigma$ 与无穷黎曼和极限不可。果真如此吗？下一章将揭晓三维球面最惊人的算术奇迹：在维度 $3$ 上，$\pi^2$ 在分子与分母之间百分之百精确抵消，多项式信号的哈尔积分可用有限整数阶乘比精确计算。
