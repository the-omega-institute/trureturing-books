# 第九章 流群精确积分、单纯形锥同伦与吻合三元球流形

在[第七章](ch07-second-order-jet-calculus.md)与[第八章](ch08-dfinite-jets-and-cayley-unification.md)中，我们以二阶与任意阶有理射流环彻底清除了微分算子中的 $\epsilon\text{-}\delta$ 极限。现在必须直面微积分与微分几何的全局半壁江山：**积分、斯托克斯定理与流形本身。**

传统分析深信两道教条：第一，曲线与曲面积分必须将区域无限细分（网格步长 $h \to 0$），否则离散斯托克斯公式必然残留 $O(h^2)$ 截断误差；第二，弯曲流形必须靠局部拍平的欧氏坐标卡 $\mathbb{R}^n$、每点外挂的平直切空间铁板 $T_p M \cong \mathbb{R}^n$ 以及非解析 $C^\infty$ 单位分解隆起函数勉强缝合。本章将这两道教条一并翻案：先利用流群法则 I 消去律 $[\mathbf{y}, \mathbf{x}, \mathbf{x}] \equiv \mathbf{y}$ 在有限网格上建立**无细分精确斯托克斯公式**，非交换乘积按相容的路径与次序拼接；再以零公理内核定理锁死任意顶点类型与交换群上的**有限链端点伸缩消去、上边缘普适幂零律与无选择公理顶点锥同伦正合性**，并衔接冻结的交换群四面体上链修复定理；最后彻底撤除黎曼 1854 年的平直切板与 $C^\infty$ 隆起补丁，以有理共形莫比乌斯群缝合**二阶吻合三元球流形 $\mathcal{M}_\Omega$**，并由冻结的复幂螺线管零荷定理锚定其紧致螺线管编织。

## 9.1 无细分精确斯托克斯定理：流群折叠与粗网格面和乐相消 {#sec-ch09-telescoping-heap-stokes}

为什么经典微积分基本定理与斯托克斯定理看似依赖网格步长趋于零的极限？纯粹因为人们先用平直矩形去硬逼近弯曲积分，再把逼近误差与拓扑边界消去混为一谈。把积分直接定义为**无原点三元流群上的有向折叠**，就能在有限网格上追踪准确相消的项。非阿贝尔面和乐还要追踪每次拼接的路径与乘序。

::: {.definition #def-ch09-heap-line-integral title="流群有向链折叠线积分与有限网格面和乐"}
设 $(\mathcal{M}, [-,-,-])$ 为[第四章](ch04-heaps-and-lie-triple-curvature.md)确立的无原点三元流群（核心实现为有理三元球 $\mathbb{T}_3(\mathbb{Q}) = S^3(\mathbb{Q})$，满足法则 I 左右吸收律 $[\mathbf{x}, \mathbf{x}, \mathbf{y}] = \mathbf{y}$、$[\mathbf{y}, \mathbf{x}, \mathbf{x}] = \mathbf{y}$ 与三元结合律）。

1. **精确流群线积分**：对任意有限有向顶点链 $\Gamma = (\mathbf{x}_0, \mathbf{x}_1, \dots, \mathbf{x}_n)$，归纳定义沿 $\Gamma$ 的**流群折叠线积分**为

   $$
   \mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0) := \mathbf{x}_0, \qquad \mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0, \dots, \mathbf{x}_k, \mathbf{x}_{k+1}) := \bigl[\mathbf{x}_{k+1},\; \mathbf{x}_k,\; \mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0, \dots, \mathbf{x}_k)\bigr].
   $$

2. **一般非阿贝尔离散联络与锚定面和乐**：在有限定向三角剖分曲面 $\Sigma$ 的有向边 $e_{ij}$ 上赋予有理单位旋子输运 $\mathbf{U}_{ij} \in S^3(\mathbb{Q})$（满足反向求逆 $\mathbf{U}_{ji} = \mathbf{U}_{ij}^{-1}$），沿路径 $\gamma = (v_0 \to v_1 \to \dots \to v_m)$ 的路径和乐按自右向左复合定义为 $\operatorname{Hol}(\gamma) := \mathbf{U}_{v_{m-1} v_m}\cdots \mathbf{U}_{v_0 v_1}$。给定从边界根点 $r$ 到面元回路起点 $v_k$ 的路径，记其输运为 $\mathbf{P}_{r \to v_k}$。将该面边界回路的和乐 $\mathbf{W}_k$ 拉回根点，得**锚定面和乐** $\widetilde{\mathbf{W}}_k^{(r)} := \mathbf{P}_{r \to v_k}^{-1}\,\mathbf{W}_k\,\mathbf{P}_{r \to v_k}$。
:::

由法则 I 消去律 $[\mathbf{y}, \mathbf{x}, \mathbf{x}] \equiv \mathbf{y}$ 与结合律，一维与二维精确积分定理无需任何细分极限即刻成立（非阿贝尔流群与面和乐情形为手工推导；任意交换加群中的一维链伸缩消去与闭合回路归零则在下节 [@thm-ch09-chain-telescope-and-nilpotency] 中获零公理内核认证）：

1. **一维链的零余项伸缩消去**：对任意有限长度 $n$ 的链 $\Gamma = (\mathbf{x}_0, \dots, \mathbf{x}_n)$，归纳假设 $\mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0, \dots, \mathbf{x}_k) = \mathbf{x}_k$，则下一步直接由法则 I 消去：

   $$
   \mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0, \dots, \mathbf{x}_k, \mathbf{x}_{k+1}) \;=\; \bigl[\mathbf{x}_{k+1},\; \mathbf{x}_k,\; \mathbf{x}_k\bigr] \;\equiv\; \mathbf{x}_{k+1}.
   $$

   在任意定基群表示中，所有中继节点 $\mathbf{x}_1, \dots, \mathbf{x}_{n-1}$ 经 $(\mathbf{x}_n \bar{\mathbf{x}}_{n-1})(\mathbf{x}_{n-1}\bar{\mathbf{x}}_{n-2})\cdots(\mathbf{x}_1\bar{\mathbf{x}}_0) \equiv \mathbf{x}_n \bar{\mathbf{x}}_0$ 严格成对抵消，不留半点步长残差。
2. **二维粗网格无细分斯托克斯定理**：设有限定向圆盘 $\Sigma$ 被任意粗糙地剖分为 $M$ 枚三角形面元 $\{\Delta_k\}_{k=1}^M$。
   - **阿贝尔上链情形**：当边赋值取自交换加群 $A$（$\Phi(e_{BA}) = -\Phi(e_{AB})$）时，每条内部共享边被相邻两面以正反各走一次，故 $\Phi(e_{AB}) + \Phi(e_{BA}) \equiv 0$，面通量总和 $\sum_{k=1}^M (\delta\Phi)(\Delta_k) \equiv \sum_{e \subset \partial\Sigma} \Phi(e)$ 零误差归结为外边界环流；
   - **非阿贝尔旋子情形（手工推导）**。从含根点 $r$ 的第一面出发。设每次贴入一面，都能把当前从 $r$ 出发的定向边界写成三段连续路径：前缀、共享边链、后缀。新边界只把共享边链换成新面的外侧边链，前缀和后缀照旧。记前缀、旧链、新链、后缀的输运分别为 $P,B,C,D$。共享链与外侧链同起同终，新面的正向回路先走外侧链、再沿共享链折返，故以拼接起点为基点的面和乐是 $B^{-1}C$。

     $$
     DCP = (DBP)\bigl(P^{-1}B^{-1}CP\bigr).
     $$

     因此每一步都沿**当前边界前缀**取锚定路径，在旧和乐**右侧**乘入新因子。若拼接序列始终保留这样的定根边界，反复应用等式就得到 $\operatorname{Hol}(\partial\Sigma)=\widetilde{\mathbf{W}}_1^{(r)}\cdots\widetilde{\mathbf{W}}_M^{(r)}$。第一因子直接以 $r$ 为基点。等式依靠相邻逆元的精确消去，粗到只剩两块三角形也分毫不差。

::: {.example #ex-ch09-coarse-two-plaquette-stokes title="四顶点双面元粗网格上的非阿贝尔精确斯托克斯手算"}
考虑四顶点圆盘 $\Sigma = (0, 1, 2, 3)$，由一条内部对角线 $(1, 3)$ 粗剖为仅有的两枚三角形 $\Delta_1 = (0 \to 1 \to 3 \to 0)$ 与 $\Delta_2 = (1 \to 2 \to 3 \to 1)$，外边界为 $\partial\Sigma = (0 \to 1 \to 2 \to 3 \to 0)$。在五条有向边上赋予纯有理凯莱单位旋子（手工推导）：

$$
\begin{aligned}
\mathbf{U}_{01} &= \bigl(\tfrac{3}{5}, \tfrac{4}{5}, 0, 0\bigr), &
\mathbf{U}_{12} &= \bigl(\tfrac{3}{5}, 0, \tfrac{4}{5}, 0\bigr), &
\mathbf{U}_{23} &= \bigl(\tfrac{3}{5}, 0, 0, \tfrac{4}{5}\bigr), \\
\mathbf{U}_{30} &= \bigl(\tfrac{1}{2}, \tfrac{1}{2}, \tfrac{1}{2}, \tfrac{1}{2}\bigr), &
\mathbf{U}_{13} &= \bigl(\tfrac{4}{5}, \tfrac{3}{5}, 0, 0\bigr).
\end{aligned}
$$

取根点 $r = 0$，以边 $\mathbf{U}_{01}$ 为面元 $\Delta_2$ 的锚定须：

1. **第一面元（直锚于 $0$）**：因 $\mathbf{U}_{13}\mathbf{U}_{01} = (0, 1, 0, 0) = \mathbf{i}$，立得 $\mathbf{W}_1 = \mathbf{U}_{30}\mathbf{U}_{13}\mathbf{U}_{01} = \bigl(-\frac{1}{2}, \frac{1}{2}, \frac{1}{2}, -\frac{1}{2}\bigr)$；
2. **第二面元（经 $\mathbf{U}_{01}$ 共轭锚定至 $0$）**：$\mathbf{F}_2 = \mathbf{U}_{13}^{-1}\mathbf{U}_{23}\mathbf{U}_{12} = \bigl(-\frac{12}{125}, -\frac{91}{125}, \frac{84}{125}, \frac{12}{125}\bigr)$，经须共轭得 $\widetilde{\mathbf{W}}_2 = \mathbf{U}_{01}^{-1}\mathbf{F}_2\mathbf{U}_{01} = \bigl(-\frac{12}{125}, -\frac{91}{125}, -\frac{12}{125}, -\frac{84}{125}\bigr)$；
3. **精确剥壳乘积核验**：在第一面的和乐右侧乘入第二面的锚定和乐，得到

   $$
   \mathbf{W}_1\,\widetilde{\mathbf{W}}_2 \;=\; \left(\frac{31}{250},\; -\frac{17}{250},\; \frac{7}{10},\; \frac{7}{10}\right) \;=\; \mathbf{U}_{30}\mathbf{U}_{23}\mathbf{U}_{12}\mathbf{U}_{01} \;=\; \operatorname{Hol}(\partial\Sigma),
   $$

   展开乘积，$(\mathbf{U}_{30}\mathbf{U}_{13}\mathbf{U}_{01})(\mathbf{U}_{01}^{-1}\mathbf{U}_{13}^{-1}\mathbf{U}_{23}\mathbf{U}_{12}\mathbf{U}_{01})$ 中的逆元依次相邻，正好消去。若颠倒乘序，$\widetilde{\mathbf{W}}_2\mathbf{W}_1=\bigl(\frac{31}{250}, \frac{7}{10}, -\frac{7}{10}, \frac{17}{250}\bigr)\ne\operatorname{Hol}(\partial\Sigma)$。

再用同一剖分检验路径条件。取 $\mathbf{U}_{01}=\mathbf{U}_{12}=\mathbf{U}_{30}=1$、$\mathbf{U}_{23}=\mathbf{j}$、$\mathbf{U}_{13}=\mathbf{i}$，则外边界和乐是 $\mathbf{j}$，两个面回路分别给出 $\mathbf{W}_1=\mathbf{i}$ 与 $\mathbf{F}_2=-\mathbf{k}$。经边 $0\to1$ 锚定第二面，得到 $\mathbf{i}(-\mathbf{k})=\mathbf{j}$。若改沿树 $\{03,31,12\}$ 的 $0\to3\to1$ 路径，输运为 $-\mathbf{i}$，第二面经共轭变成 $\mathbf{k}$，同一乘序却给出 $\mathbf{i}\mathbf{k}=-\mathbf{j}$。
:::

## 9.2 粗单纯形上链微积分与无选择公理顶点锥同伦 {#sec-ch09-simplicial-cone-homotopy}

将上节的二维面元推广到三维四面体与任意维单纯形，我们直接进入离散外微分复形的核心定律：一维有限链伸缩、上边缘幂零律 $\delta^2 = 0$ 以及无需任何选择公理的显式庞加莱引理。

对任意顶点类型 $V$ 与任意加法交换群 $(A, G)$（满足结合、交换、左零元与左逆元群律 `G.Laws`），在全部有序顶点元组（允许顶点重复）上定义 $j$-上链空间 $C^0(V, A) := V \to A$、$C^1(V, A) := V \to V \to A$、$C^2(V, A) := V \to V \to V \to A$ 与 $C^3(V, A) := V \to V \to V \to V \to A$，并定义交错上边缘算子

$$
\begin{aligned}
(\delta_0 f)(x, y) &:= f(y) - f(x), \\
(\delta_1 e)(x, y, z) &:= \bigl(e(y, z) + e(x, y)\bigr) - e(x, z), \\
(\delta_2 F)(x, y, z, w) &:= \bigl(F(y, z, w) + F(x, y, w)\bigr) - \bigl(F(x, z, w) + F(x, y, z)\bigr).
\end{aligned}
$$

（若将 $V$ 取作有限有序完全单纯形 $K_n = \{0, 1, \dots, n-1\}$ 并限制在严格递增 $(j+1)$-元组上的交错上链，则一般阶 $(\delta_j \omega)(v_0, \dots, v_{j+1}) = \sum_{i=0}^{j+1}(-1)^i \omega(v_0, \dots, \widehat{v_i}, \dots, v_{j+1})$ 满足 $\delta_{j+1} \circ \delta_j = 0$，高阶情形为手工推导。）在任意顶点类型 $V$ 与任意加法交换群 $A$ 上，有限链伸缩消去、闭合回路归零以及零阶至二阶的普适上边缘幂零律均已在零公理 `OmegaInit` 与 `OmegaMath` 内核中冻结认证：

::: {.theorem #thm-ch09-chain-telescope-and-nilpotency title="有限顶点链端点伸缩消去、闭环归零与上边缘普适幂零律" lean="D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0 D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0_loop D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_d0 D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_d1"}
设 $V$ 为任意顶点类型（`V : Sort u`），$A$ 为配备加法交换群结构 $G$ 且满足群律 `G.Laws` 的类型。对任意端点 $v_{\mathrm{first}}, v_{\mathrm{last}} \in V$，以 $\operatorname{VertexChain}(V, v_{\mathrm{first}}, v_{\mathrm{last}})$ 记从 $v_{\mathrm{first}}$ 至 $v_{\mathrm{last}}$ 的有限有向顶点链，以 $\operatorname{sum}_G(\gamma, e)$ 记 $1$-上链 $e$ 沿链 $\gamma$ 各有向边之和（空链之和为 $0$）。则以下四条零公理等式严格成立：

1. **有限顶点链端点伸缩消去**（[`sum_d0`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0)）：对任意 $f \in C^0(V, A)$ 与任意有限链 $\gamma : \operatorname{VertexChain}(V, v_{\mathrm{first}}, v_{\mathrm{last}})$，

   $$
   \operatorname{sum}_G(\gamma,\, \delta_0 f) \;=\; (\delta_0 f)(v_{\mathrm{first}}, v_{\mathrm{last}}) \;=\; f(v_{\mathrm{last}}) - f(v_{\mathrm{first}}).
   $$

2. **闭合顶点回路归零**（[`sum_d0_loop`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0_loop)）：对任意基点 $b \in V$ 与任意闭合链 $\gamma : \operatorname{VertexChain}(V, b, b)$，

   $$
   \operatorname{sum}_G(\gamma,\, \delta_0 f) \;=\; 0.
   $$

3. **普适逐点上边缘幂零律**（[`d1_d0`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_d0)、[`d2_d1`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_d1)）：对任意 $f \in C^0(V, A)$、$e \in C^1(V, A)$ 及一切顶点 $x, y, z, w \in V$，

   $$
   \delta_1(\delta_0 f)(x, y, z) \;=\; 0, \qquad \delta_2(\delta_1 e)(x, y, z, w) \;=\; 0.
   $$
:::

::: {.proof}
第 1 款按有限链结构归纳：零步链在顶点 $v$ 处由 $0 = f(v) - f(v)$ 成立；归纳步沿首边 $(x, y)$ 展开得 $(f(y) - f(x)) + (f(z) - f(y)) = f(z) - f(x)$，中间顶点严格抵消。第 2 款将 $v_{\mathrm{first}} = v_{\mathrm{last}} = b$ 代入第 1 款并由 $f(b) - f(b) = 0$ 立得。第 3 款中，$\delta_1(\delta_0 f)(x, y, z) = \bigl((f(z) - f(y)) + (f(y) - f(x))\bigr) - (f(z) - f(x)) = 0$；而展开 $\delta_2(\delta_1 e)(x, y, z, w)$ 时，正部与负部经交换群结合律与交换律重排均精确化简为 $\bigl(e(z, w) + e(y, z) + e(x, y)\bigr) - e(x, w)$，相减恒为零。完整证明由 Lean 内核检查。
:::

更进一步，只要显式指定任意一枚基点 $b \in V$，我们可以完全不用选择公理（`Classical.choice`）直接写出反演闭上链的顶点锥同伦算子。

::: {.definition #def-ch09-cone-homotopy title="无选择公理顶点锥同伦算子"}
在任意顶点类型 $V$ 与加法交换群 $(A, G)$ 上，给定显式基点 $b \in V$，通过前置基点 $b$ 定义**顶点锥同伦算子** $H_j b : C^j(V, A) \to C^{j-1}(V, A)$（$j \in \{1, 2, 3\}$）：

$$
(H_1 b\, e)(x) := e(b, x), \qquad (H_2 b\, F)(x, y) := F(b, x, y), \qquad (H_3 b\, D)(x, y, z) := D(b, x, y, z).
$$

当特化为有序完全单纯形 $K_n = \{0, 1, \dots, n-1\}$ 上取 $b = 0$ 的交错上链时，含重复顶点的元组值自动为零，即还原为仅在不含 $0$ 的严格递增元组上取 $\omega(0, v_0, \dots, v_{j-1})$、含 $0$ 时取 $0$ 的分段形式。
:::

在零公理 `OmegaInit` 与 `OmegaMath` 内核中，一阶与二阶顶点锥收缩恒等式以及构造性二阶单纯形庞加莱正合性均以空公理闭包逐点成立：

::: {.theorem #thm-ch09-cone-homotopy-exactness title="无选择公理顶点锥同伦恒等式与二阶单纯形庞加莱正合性" lean="D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d0_H1_add_H2_d1 D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_H2_add_H3_d2 D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_H2_of_d2_eq_zero D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff"}
设 $V$ 为任意顶点类型，$(A, G)$ 为满足群律 `G.Laws` 的加法交换群，$b \in V$ 为任意显式选定的基点顶点。则以下四条零公理结论严格成立：

1. **一阶顶点锥同伦恒等式**（[`d0_H1_add_H2_d1`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d0_H1_add_H2_d1)）：对任意 $e \in C^1(V, A)$ 与一切 $x, y \in V$，

   $$
   \delta_0(H_1 b\, e)(x, y) + H_2 b\,(\delta_1 e)(x, y) \;=\; e(x, y).
   $$

2. **二阶顶点锥同伦恒等式**（[`d1_H2_add_H3_d2`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_H2_add_H3_d2)）：对任意 $F \in C^2(V, A)$ 与一切 $x, y, z \in V$，

   $$
   \delta_1(H_2 b\, F)(x, y, z) + H_3 b\,(\delta_2 F)(x, y, z) \;=\; F(x, y, z).
   $$

3. **闭 $2$-上链的显式锥原势**（[`d1_H2_of_d2_eq_zero`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_H2_of_d2_eq_zero)）：若 $F \in C^2(V, A)$ 满足全局闭合条件 $\forall x, y, z, w \in V,\; (\delta_2 F)(x, y, z, w) = 0$，则对一切 $x, y, z \in V$ 成立

   $$
   \delta_1(H_2 b\, F)(x, y, z) \;=\; F(x, y, z).
   $$

4. **构造性二阶庞加莱正合充要判据**（[`d2_eq_zero_iff`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff)）：对任意 $F \in C^2(V, A)$，闭合性与恰当性充要等价，

   $$
   \bigl(\forall x, y, z, w \in V,\; (\delta_2 F)(x, y, z, w) = 0\bigr) \;\Longleftrightarrow\; \bigl(\exists e \in C^1(V, A),\; \forall x, y, z \in V,\; (\delta_1 e)(x, y, z) = F(x, y, z)\bigr),
   $$

   且正向直接由 $e := H_2 b\, F$ 显式见证，全程不依赖选择公理。
:::

::: {.proof}
第 1 款与第 2 款皆归结为交换群恒等式 $(u - v) + \bigl((c + v) - u\bigr) = c$：一阶时取 $u = e(b, y)$、$v = e(b, x)$、$c = e(x, y)$；二阶时取 $u = F(b, y, z) + F(b, x, y)$、$v = F(b, x, z)$、$c = F(x, y, z)$，所有含基点 $b$ 的项逐点两两抵消。第 3 款在全局闭合假设下将 $H_3 b\,(\delta_2 F)(x, y, z) = (\delta_2 F)(b, x, y, z) = 0$ 代入第 2 款立得 $\delta_1(H_2 b\, F)(x, y, z) = F(x, y, z)$。第 4 款正向直接给出显式见证 $e := H_2 b\, F$ 并调用第 3 款；反向由 $\delta_1 e = F$ 与 [@thm-ch09-chain-telescope-and-nilpotency] 的 $\delta_2 \circ \delta_1 = 0$ 即得 $\delta_2 F = 0$。完整证明由 Lean 内核检查。
:::

回到有限有序完全单纯形 $K_n = \{0, \dots, n-1\}$（$n \ge 4$）上的交错有理上链空间 $C^j(K_n; \mathbb{Q})$，由 [@thm-ch09-cone-homotopy-exactness] 的二阶拆分 $F = \delta_1(H_2 0\, F) + H_3 0\,(\delta_2 F)$ 还可直接读出精确秩与零第二贝蒂数（手工推导）：限制到含顶点 $0$ 的三角形诱导同构 $\ker\delta_2 = \operatorname{im}\delta_1 \cong \mathbb{Q}^{\binom{n-1}{2}}$，故 $\operatorname{rank}\delta_1 = \binom{n-1}{2}$、$\operatorname{rank}\delta_2 = \binom{n-1}{3}$ 且 $\beta_2(K_n) = 0$。

下图直观并置了这两套无细分代数骨架：左侧标出四顶点双面元粗网格的反向共边与第二面的锚定路径 $0	o1$，右侧展示由显式基点 $b$ 发起的顶点锥同伦算子 $e = H_2 b\, F$ 如何将任意闭 $2$-上链（$\delta_2 F = 0$）无选择公理地拉回为边势 $1$-上链。

::: {.figure src="ch09-coarse-stokes-cone"}
**粗网格内边伸缩相消与无选择公理顶点锥同伦。** 左侧呈现四顶点双面元圆盘（[@ex-ch09-coarse-two-plaquette-stokes]）上的内部对角线 $(1,3)$ 与锚定边 $0	o1$。以该边锚定第二面，按 $\mathbf{W}_1\widetilde{\mathbf{W}}_2$ 相乘，逆元相邻消去，得到青色外边界的和乐；右侧呈现以显式基点 $b$ 为锥顶的单纯形锥同伦算子 $e(x, y) = (H_2 b\, F)(x, y) = F(b, x, y)$（[@def-ch09-cone-homotopy]），直观展现闭 $2$-上链经 $\delta_1(H_2 b\, F) = F$ 构造性还原为精确边势（[@thm-ch09-cone-homotopy-exactness]）。
:::

而在不预先指定基点 $b$、仅假定有限非空顶点集 `[Fintype V]`、`[Nonempty V]` 的一般情形下，上述正合性判据及其面向**非闭合上链**的定量缺陷计数双侧界，已由所钉内核的另一条冻结定理严格验证：

::: {.theorem #thm-ch09-simplex-cochain-repair title="完全有序单纯形四面体缺陷计数、最优锚点界与边势正合充要判据" lean="D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"}
设 $V$ 为有限非空顶点集（`[Fintype V]`、`[Nonempty V]`），$A$ 为加法交换群（`[AddCommGroup A]`），$F : V \to V \to V \to A$ 为任意三元 $2$-上链。分别记 $r$-锚定面误差数、四面体上边缘缺陷总数及给定边势 $\mathrm{edge} : V \to V \to A$ 的面误差数为

$$
\begin{aligned}
\operatorname{faceErrors}(F, r) &:= \bigl\lvert\{(i, j, k) \in V^3 \mid F(i,j,k) \neq F(r,j,k) - F(r,i,k) + F(r,i,j)\}\bigr\rvert, \\
\operatorname{tetraDefects}(F) &:= \bigl\lvert\{(r, i, j, k) \in V^4 \mid F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) \neq 0\}\bigr\rvert, \\
\operatorname{edgeErrors}(F, \mathrm{edge}) &:= \bigl\lvert\{(i, j, k) \in V^3 \mid F(i,j,k) \neq \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)\}\bigr\rvert.
\end{aligned}
$$

则以下四项同时成立：

1. **关联计数恒等式**：$\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$；
2. **最优参考顶点上界**：存在锚点 $r \in V$ 使 $\lvert V\rvert \cdot \operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)$；
3. **任意边势线性下界**：对一切 $\mathrm{edge} : V \to V \to A$ 恒有 $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})$；
4. **精确边势修复充要判据**：

   $$
   \bigl(\forall r, i, j, k \in V,\; F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) = 0\bigr) \;\Longleftrightarrow\; \bigl(\exists\,\mathrm{edge} : V \to V \to A,\; \forall i, j, k \in V,\; F(i,j,k) = \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)\bigr).
   $$
:::

::: {.proof}
第 1 款由 $F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) = F(i,j,k) - (F(r,j,k) - F(r,i,k) + F(r,i,j))$ 逐项核对四重求和即得；第 2 款在非空有限集 $V$ 上取使 $\operatorname{faceErrors}(F, r)$ 最小的顶点 $r$，由平均值不等式立得；第 3 款观察到每个非零四面体缺陷至少在其四个边界面 $(i,j,k),(r,j,k),(r,i,k),(r,i,j)$ 之一上违反边势方程，对全部 $(r,i,j,k) \in V^4$ 求和并重排四重指标即得 $4\lvert V\rvert\cdot\operatorname{edgeErrors}(F,\mathrm{edge})$；第 4 款正向任选锚点 $r \in V$ 置 $\mathrm{edge}(i,j) := F(r,i,j)$，反向代入边势展开并由交换群加减两两消去完成。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch09-choice-free-boundary title="显式基点零公理正合性与抽象有限集定量修复的公理边界"}
请对照本节两条内核认证定理的公理边界：[@thm-ch09-cone-homotopy-exactness] 接收显式基点 $b \in V$ 作为输入，对**任意**顶点类型 $V$（无须有限性，亦无须 `[Nonempty V]`）均以空公理闭包认证锥同伦恒等式与二阶正合性，完全免除 `Classical.choice`；而 [@thm-ch09-simplex-cochain-repair] 则在未指定基点的抽象 `[Fintype V]`、`[Nonempty V]` 上借 `Classical.choice` 挑出最优参考锚点 $r \in V$，将结论推进至非闭合 $2$-上链的定量近似修复双侧界。
:::

## 9.3 二阶吻合三元球流形 $\mathcal{M}_\Omega$ 与紧致螺线管编织 {#sec-ch09-osculating-manifold}

当微分与积分都归位到有理圆弧之后，我们终于可以直指 1854 年以来现代微分几何最深层的基底假设：**为什么经典黎曼流形看似光滑，实则在构造层面处处隐含着切板鳞片与非解析死区？**

传统黎曼流形 $(M, g)$ 在每一点 $p \in M$ 外挂一块曲率恒为零的一阶平直切空间铁板 $T_p M \cong \mathbb{R}^n$，再借 $C^\infty$ 单位分解隆起函数（典型如柯西平坦函数 $\beta(u) = e^{-1/u^2}\mathbf{1}_{u \neq 0}$，在 $u = 0$ 处各阶导数全为零却在远处任意隆起）将局部坐标卡粘成整体（文献结果）。这套“先压平、再打补丁”的工艺在两个方向上付出了高昂代价：其一，一阶平直面片抹去二阶矢高，迫使跨点比较依赖坐标卡相关的克里斯托费尔联络补丁 $\Gamma^k_{ij}$，甚至在细密多面体网格上也会引爆法向高频震荡——例如高 $H = 1$、半径 $R = 1$ 的圆柱内接施瓦茨灯笼（H. A. Schwarz，1880；文献结果）取 $m = n^2$ 时径向距离趋于 $0$，面积比却飙升至伪极限 $\sqrt{1 + \pi^4/4} \approx 5.0351$，而外切单位球面的正十二面体 $12$ 块平直切板将总亏角 $20 \times 36^\circ = 720^\circ = 4\pi$ 锁死在离散棱角上；其二，$C^\infty$ 隆起函数切断了“一弧定全圆”的解析刚性。

在 $\mathrm{AXIOM}\text{-}\Omega$ 之下，我们以**二阶吻合三元球流形 $\mathcal{M}_\Omega$** 彻底重构流形底座：

::: {.definition #def-ch09-osculating-manifold title="二阶吻合三元球流形与有理共形莫比乌斯缝合模型"}
定义**二阶吻合三元球流形** $\mathcal{M}_\Omega$（`MODEL`）由以下三层几何结构耦合而成：

1. **局部二阶吻合三元球基底**：废除一阶零曲率切板 $T_p M \cong \mathbb{R}^n$，在每一点 $p$ 处改配原生具备正曲率（沿两正交切向满足二阶主曲率配平 $\frac{1}{2} + \frac{1}{2} = 1$）的有理三元球冠 $\mathbb{T}_3^{(p)}(\mathbb{Q}) \cong S^3(\mathbb{Q})$；
2. **有理共形莫比乌斯群无隆起缝合**：废除 $C^\infty$ 单位分解隆起函数，重叠吻合球冠之间通过四元数有理分式线性变换——即**有理共形莫比乌斯群** $\mathrm{PSL}_2(\mathbb{H}, \mathbb{Q})$

   $$
   \mathbf{q} \;\longmapsto\; (\mathbf{a}\mathbf{q} + \mathbf{b})(\mathbf{c}\mathbf{q} + \mathbf{d})^{-1} \qquad \bigl(\mathbf{a}, \mathbf{b}, \mathbf{c}, \mathbf{d} \in \mathbb{H}(\mathbb{Q})\bigr)
   $$

   保持球面、角度与实解析刚性地无缝拼接；在任意常曲率（各向同性）片区上，局部吻合球 $\mathbb{T}_3^{(p)}$ 与底层空间完全重合，原生流群平行输运自动贴合测地大圆，**相对克里斯托费尔联络补丁恒等归零（$\Gamma^k_{ij} \equiv 0$）**；
3. **极大圆周纤维上的紧致螺线管编织**：沿三元球内单连通基底所承载的极大圆周纤维 $S^1 \subset \mathbb{T}_3$（因 $\pi_1(S^3) = 0$，多匝覆盖严格作用于极大圆周纤维而非整只 $S^3$），将不同整数分频尺度的相容幂提升编织为紧致连通的一维叶向实解析螺线管层叠 $\mathcal{S}_{\mathbb{A}} = \lim_{\longleftarrow\,(N,\,\mid)} S^1_{(N)}$。
:::

正是这条紧致螺线管纤维，将微分几何的圆弧流形与第五卷的阿代尔算术无缝焊接起来。在所钉内核中，以下冻结定理精确刻画了何时一束跨尺度的复幂线程严丝合缝地锁在紧致单位模螺线管之上，而不发生径向发散或坍缩：

::: {.theorem #thm-ch09-solenoid-zero-charge title="复幂螺线管线程零对数荷与全域单位模充要判据" lean="D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff"}
设 $z$ 为一条相容非零复幂线程（`ComplexPowerThread`），即对每个正整数层级 $m \in \mathbb{N}_+$ 指定非零复坐标 $z_m \in \mathbb{C} \setminus \{0\}$，且对一切 $m, n \in \mathbb{N}_+$ 满足幂相容律 $z_{mn}^n = z_m$。定义其阿基米德对数荷为 $\operatorname{logarithmicCharge}(z) := \ln\lVert z_1\rVert$。则

$$
\operatorname{logarithmicCharge}(z) = 0 \;\Longleftrightarrow\; \forall m \in \mathbb{N}_+,\; \lVert z_m\rVert = 1.
$$
:::

::: {.proof}
由幂相容律取 $m = 1$ 得 $z_n^n = z_1$，取模与实对数即得层级对数荷守恒律 $n \ln\lVert z_n\rVert = \ln(\lVert z_n\rVert^n) = \ln\lVert z_n^n\rVert = \ln\lVert z_1\rVert = \operatorname{logarithmicCharge}(z)$。若对数荷为零，因 $n > 0$ 立得 $\ln\lVert z_n\rVert = 0$；再由各层坐标严格非零（$\lVert z_n\rVert > 0$）排除 Lean 全函数对数的零点分支 $\ln 0 = 0$，推出对一切 $n \in \mathbb{N}_+$ 恒有 $\lVert z_n\rVert = 1$。反向直接取 $m = 1$ 得 $\ln 1 = 0$。完整证明由 Lean 内核检查。
:::

[@thm-ch09-solenoid-zero-charge] 构成了 $\mathcal{M}_\Omega$ 中紧致螺线管编织的严格锚点：任何非零对数荷都会触发径向因子 $\exp(q/m)$ 的发散膨胀或坍缩，唯有零对数荷截面把无穷多整数分频层级同时锁死在单位圆周 $\lVert z_m\rVert \equiv 1$ 上，构成紧致无边界的普适螺线管相位纤维。

::: {.remark #rem-ch09-anisotropic-obstruction-boundary title="常曲率片区零联络与一般各向异性流形的曲率边界"}
**文献结果与精确几何边界。** 为严守数学诚实，须明确区分常曲率与一般各向异性流形。在维数 $n \ge 3$ 的一般黎曼流形上，代数曲率张量正交分解为标量曲率部 $R_{\mathrm{Scal}}$、无迹里奇张量部 $R_{\mathring{\mathrm{Ric}}}$ 与外尔共形潮汐张量 $W$（I. M. Singer 与 J. A. Thorpe，1969；A. L. Besse，*Einstein Manifolds*，1987；文献结果），从而单只截面曲率为 $K$ 的常曲率吻合球满足精确残差公式（手工推导）：

$$
\lVert R - R^{(K)}\rVert^2 \;=\; \lVert W\rVert^2 \;+\; \frac{4}{n - 2}\lVert\mathring{\mathrm{Ric}}\rVert^2 \;+\; \frac{2}{n(n - 1)}\bigl(\mathrm{Scal} - n(n - 1)K\bigr)^2.
$$

因此，单只常曲率吻合球 $\mathbb{T}_3^{(p)}$ 在最优标量曲率 $K_* = \frac{\mathrm{Scal}}{n(n-1)}$ 处完全吸收全部各向同性二阶曲率（并在常曲率片区上令相对克里斯托费尔联络补丁恒为零）；而在真正各向异性的潮汐流形上，不可约残差 $\lVert W\rVert^2 + \frac{4}{n-2}\lVert\mathring{\mathrm{Ric}}\rVert^2 > 0$ 则如实留在相邻吻合球之间的莫比乌斯过渡上闭链之中。
:::

## 9.4 第三卷全景对照与迈向第四卷球面调和分析 {#sec-ch09-volume3-synthesis}

至此，第三卷完成了无极限射流微积分与全息圆弧流形的完整重建。下表对照经典实分析微分几何与第三卷的有理重构框架：

| 核心主题 | 传统经典微积分与黎曼流形 | 第三卷无极限有理微积分与 $\mathcal{M}_\Omega$ | 消除的根本顽疾 |
| :--- | :--- | :--- | :--- |
| **一阶与二阶导数** | 柯西 $\epsilon\text{-}\delta$ 极限 $\lim_{h \to 0}$ 与割线差商 | 二阶幂零射流环 $\mathcal{J}_2(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^3)$ 两项闭式逆 | 根除 $0/0$ 幽灵与有限割线偏差 |
| **离散球面演化** | 左端点伊藤 / 显式欧拉切步（$\alpha = 0$） | 对称中点凯莱步（$\alpha = \frac{1}{2}$）与前后半拍保真守恒 | 消除切线外漂与链式法则破缺 |
| **超越函数与 $\pi$** | 无穷收敛级数与先验实常数 $\pi, e$ | 任意阶 D-有限射流 $J_N(\mathbb{Q})$、凯莱统一与无 $\pi$ 马青包络 | 以有理递推与按需有理区间取代超越数 |
| **积分与斯托克斯** | $h \to 0$ 细网格黎曼和与 $O(h^2)$ 离散余项 | 流群伸缩折叠、相容路径与乘序下的面和乐、无选择公理锥同伦 | 精确的有限边界消去 |
| **流形基底与粘合** | 一阶平直切板 $T_p M \cong \mathbb{R}^n$ 与 $C^\infty$ 隆起补丁 | 二阶吻合三元球 $\mathbb{T}_3^{(p)}(\mathbb{Q})$、莫比乌斯缝合与零荷螺线管 | 消除常曲率联络补丁与非解析死区 |

下面的短片沿本章主线，用几个可以手算的例子把这张表中“积分与斯托克斯”与“流形基底”两行演示一遍。

::: {.film src="exact-on-a-coarse-grid"}
**粗网格上，积分只剩边界（2 分 49 秒）。** 片中先以流群法则 I $[\mathbf{y},\mathbf{x},\mathbf{x}]=\mathbf{y}$ 沿五点链逐点折叠，积分塌缩为终点（紫色，手工推导）；交换群中的伸缩相消“各步之和等于终点减起点”标绿色 LEAN ✓（[@thm-ch09-chain-telescope-and-nilpotency]），屏幕上的 $-4+7-5+3=1=6-5$ 为计算。随后在四顶点双面元圆盘上放整数边值：两面环流 $9$ 与 $0$，紫色对角线正反各走一次而相消，琥珀色外缘环流仍为 $9$（青色 `NUM`，一般交换情形为手工推导）。换成 [@ex-ch09-coarse-two-plaquette-stokes] 的有理单位四元数后，$\mathbf{W}_1\widetilde{\mathbf{W}}_2=\bigl(\frac{31}{250},-\frac{17}{250},\frac{7}{10},\frac{7}{10}\bigr)=\operatorname{Hol}(\partial\Sigma)$，颠倒乘序或改沿琥珀色虚线 $0\to3\to1$ 锚定则结果改变，$\mathbf{j}$ 变为 $-\mathbf{j}$（精确计算；剥壳恒等式为手工推导）。锥同伦一幕以琥珀色基点 $b$ 为锥顶，绿色标签给出 $\delta_2\circ\delta_1=0$、拆分 $F=\delta_1(H_2 b\,F)+H_3 b\,(\delta_2 F)$ 与闭即恰当的显式见证 $H_2 b\,F$（[@thm-ch09-chain-telescope-and-nilpotency]、[@thm-ch09-cone-homotopy-exactness]），四顶点算例 $10=9+1$ 为屏幕计算。最后，吻合三元球冠与莫比乌斯缝合按模型示意（紫色，[@def-ch09-osculating-manifold]）；螺线管线程的零对数荷判据标绿色（[@thm-ch09-solenoid-zero-charge]），品红色一行 $\lvert z_1\rvert=2$ 的线程漂离单位圆为屏幕计算；全片以第三卷对照表收尾。
:::

在下面的交互实验卡中，读者可以在粗粒度单纯形网格上亲手检验双面元的加法环流相消，并在读数中对照非交换和乐对锚定路径和乘序的依赖，切换显式锥顶基点 `base` 与任意 $2$-上链赋值 $F$，实时构造无选择公理边势 `e = H2(base, F)` 并逐面核对同伦分解 $\delta_1(H_2 b\, F) + H_3 b\,(\delta_2 F) = F$（[@thm-ch09-chain-telescope-and-nilpotency]、[@thm-ch09-cone-homotopy-exactness]）。

::: {.viz src="dfinite-algebraic-schur-lab" preset="simplicial-stokes-cone" height="520"}
**无细分粗网格斯托克斯与单纯形锥同伦实验卡（`simplicial-stokes-cone`）。** 擦去紫色共边，观察两面的整数环流之和等于外边界环流。读数另比较双面元的四元数因子在换路或逆序后的乘积（[@ex-ch09-coarse-two-plaquette-stokes]）。切换显式锥顶基点 `base` 实时生成构造性原势 `e = H2(base, F)`，对照闭 $2$-上链（$\delta_2 F = 0$）时的精确还原 $\delta_1 e = F$ 与非闭情形下的四面体缺陷项 $H_3 b\,(\delta_2 F)$（[@thm-ch09-cone-homotopy-exactness]）。
:::

既然微积分的局部导数、任意阶射流、粗网格积分与吻合球流形均已在有理三元球 $\mathbb{T}_3(\mathbb{Q}) \cong S^3(\mathbb{Q})$ 上全面落成，下一个自然而必然的问题随之浮现：**经典紧致实三维球面上的傅里叶谱如何分壳？其中哪些谱读数能用有理多项式和有限阶乘比精确算出？** 这正是第四卷（[第十章](ch10-peter-weyl-rational-spin-shells.md)至[第十二章](ch12-algebraic-extensions-and-schur-positivity.md)）将要展开的壮阔图景——彼得—魏尔有理自旋壳、无 $\pi$ 阶乘哈尔积分与零公理舒尔正定性。
