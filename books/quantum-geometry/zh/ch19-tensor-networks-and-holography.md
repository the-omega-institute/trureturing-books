# 第十九章 纠缠编织空间：张量网络、全息对偶与离散最小割定理 {#纠缠编织空间张量网络全息对偶与离散最小割定理}

> *“其实点 C并不是一个已知量,而是一个相融点的投影,因为实际上一条确定的量子态只能确定一条线,一组量子态才能对应一个面积.”*

在[第二章](ch02-born-rule.md)与[第三章](ch03-projectors-and-duality.md)中，我们反复强调过一条最质朴的维度铁律：在全局希尔伯特空间中，**单个确定的纯量子态只决定一根秩为 $1$ 的全局幂等投影线**（$\rho = \lvert\Psi\rangle\langle\Psi\rvert$，$\operatorname{rank}\rho = 1$）。然而，一旦我们将复合系统沿着二分接口 $\mathcal{H}_L \otimes \mathcal{H}_R$ 切开，把振幅张量展平（tensor flattening）为从右子空间到左子空间的线性算子（或对一侧求偏迹得到约化密度矩阵 $\rho_L = \Tr_R\lvert\Psi\rangle\langle\Psi\rvert$），情况就发生了本质跃升：单根直积基矢 $\lvert 0\rangle_L \otimes \lvert 0\rangle_R$ 在接口上的施密特秩（Schmidt rank）仍为 $1$；要想在二分截面上撑开大于 $1$ 的施密特秩、传递多路并行的可区分通道，就必须让**一组**正交的局部通道态在接口两侧相干叠加交织（例如双比特贝尔态 $\lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ 的全局纯态投影秩为 $1$，但它由两组正交局部态跨切口配对而成，其二分展平算子秩与约化密度矩阵秩均为 $\operatorname{rank}\rho_L = 2$）。

章首题记正是从这一线性代数事实出发，直指现代量子信息与全息几何交汇处的核心直觉：当我们将考察对象从单根量子态射线升级为由多组张量指标拼接而成的**张量网络**（tensor network）时，跨越网络接口所能传递的“最大纠缠秩（流）”是如何受制于网络内部最窄瓶颈处的“割容量（截面）”的？

遵循全书的三层认识论契约与离散多面体粘接原则（R3），本章严格区分三个层次：

1. **Lean 内核验证的有限维桥图与开边界 MPS 定理**：在 `BridgeGraph` 模块族中，针对宽度为 $3$（指标取 $\operatorname{Fin} 3$）的双节点克罗内克桥图收缩 $\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r$，我们逐条证明最大流可达引理（[@lemma-bridge-flow-attained]）、最大流不超过最小割上界命题（[@prop-bridge-flow-cut-bound]）、二次锥域内的最小割简化推论（[@cor-bridge-cone-mincut]），以及锥域内的离散量子最大流最小割定理（[@thm-bridge-quantum-maxflow-mincut]）；随后在开边界键维数 $2$ 的一维矩阵乘积态（MPS）模块中，证明可观测图表内由三格点前缀边缘矩阵唯一恢复全局相位态（[@thm-mps-observable-phase-recovery]），以及链长 $3 + m \ge 5$ 时任意内部三格点边缘恢复在主开稠密轨迹上的内禀一般性（[@thm-mps-generic-interior-recovery]）；
2. **离散对数容量分片与接缝粘接图像（R3）**：通过对数腿容量坐标下的三张仿射超平面下包络（[@ex-log-capacity-facets]），展示有限维矩阵秩上界如何在离散格点上拼出多面体分片与瓶颈转移接缝；
3. **连续统全息对偶的文献边界**：将多尺度纠缠重整化拟设（MERA）与连续统 AdS/CFT 中的 Ryu–Takayanagi（RT）极小曲面公式严格置于文献注记（[@rem-ryu-takayanagi-literature]）内，绝不把特定宽度三桥图的有限维矩阵秩定理夸大为任意张量网络或连续时空全息对偶的普遍证明。

::: {.figure src="ch19-overview"}
**图 19。** 本章地图：第 I 栏，一棵普通的二叉树（不是后面实验卡里的层级网络）底边琥珀色的 4 条腿，只需割断品红标出的 2 条键就能切下来（示意模型）；第 II 栏，宽度三桥图 $(a, b, c, d) = (2, 3, 2, 3)$ 上面品红实线的 $ad$ 与下面品红虚线的 $bc$ 是两道最小割，$ad = bc = 6$，流与割相等（[@thm-bridge-quantum-maxflow-mincut]）；第 III 栏，对数容量里品红实线的 $ad$ 分片与品红虚线的 $bc$ 分片沿竖直虚线的接缝拼成一条折线。
:::

## 19.1 纠缠层级与有限张量网络 {#sec-mera-hierarchy}

想象你手里有两块相互纠缠的多体量子区域：左边界输入端与右边界输出端。如果它们之间只靠一根一维标量线相连，那么无论两端各自的希尔伯特空间有多大，跨过这道接口的线性映射至多只有秩 $1$，相当于所有信息都被挤进了一根单模光纤。反之，如果接口处由多条内部张量腿（bond indices）并排桥接，跨越接口的算子秩（即施密特分解中非零奇异值的个数）就能够随内部腿维数的乘积而增长。

如上图左栏（Panel I）所示，在物理文献中，研究者常借助多尺度纠缠重整化拟设（MERA）等层级张量网络来示意边界区域与深层“体空间（bulk）”截面之间的瓶颈关系。然而，在一般张量网络中，量子最大流（跨网络收缩所能达到的最大矩阵秩）甚至**不一定**等于量子最小割（切开网络所需截断的最小腿维数乘积）！（文献结果：S. X. Cui、M. H. Freedman、O. Sattath、R. Stong 与 G. Minton，*Quantum max-flow/min-cut*，J. Math. Phys. 57, 062206 (2016)，arXiv:1508.04644。）因此，要想得到经得起形式化内核检验的精确结论，我们必须先锚定一个结构完全显式、参数边界清清楚楚的有限维桥图模型。

::: {.viz src="layered-network-cut" preset="one" height="500"}
**一格的区间，割就是它自己那条腿。** 层级网络底边的第 16 格单独成为琥珀色区间，品红标出的最小割只割断它自己那一条腿。只有这一条键穿过割，跨过它的秩至多是这一条键的维数；割断的键越多，秩的上界才是它们维数的乘积。
:::

把区间从一格加长到连续四格，直接剪腿要割断 $4$ 条，最小割却可以钻进网络内部。

::: {.viz src="layered-network-cut" preset="four" height="500"}
**四格的区间，割从网络里面穿过。** 底边连续 4 格是琥珀色区间。直接剪断它们的 4 条腿不是最省的：品红的最小割钻进网络，只割断 3 条键，青色是割内侧的张量。页面数的是割断的腿，给出的只是秩的上界；正如上文所说，一般网络里最大流可以小于最小割，网络是示意模型。
:::

桥图模型、`QMaxFlow` 与 `QMinCut` 的定义以及下文锥域上“流等于割”的命题（原文猜想 3.15）出自 F. Gesmundo、V. Lysikov 与 V. Steffan，*Quantum max-flow in the bridge graph*，Transformation Groups 30 (2025) 1751–1784（DOI: `10.1007/s00031-024-09863-2`，arXiv:2212.09794），原文记号 $(a, b, a', b')$ 对应这里的 $(a, b, c, d)$。在 Lean 的 `D5.S3.Quantum.TensorNetworks.BridgeGraph.QuantumMaxFlowBound` 模块中，这一模型由四个自然数维数参数 $a, b, c, d \in \mathbb{N}$ 与宽度为 $3$（指标 $r \in \operatorname{Fin} 3$）的桥接张量收缩给出：

- 设 $M : \operatorname{Fin} 3 \to M_{a\times b}(\mathbb{C})$ 为三个 $a\times b$ 复矩阵，$N : \operatorname{Fin} 3 \to M_{d\times c}(\mathbb{C})$ 为三个 $d\times c$ 复矩阵；
- 定义**宽度三桥图流矩阵** `flow` 为三项克罗内克积（Kronecker product）之和：

$$
\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r \in M_{(a\times d)\times (b\times c)}(\mathbb{C}),
$$

其行指标取自乘积类型 $\operatorname{Fin} a \times \operatorname{Fin} d$（共 $ad$ 行），列指标取自 $\operatorname{Fin} b \times \operatorname{Fin} c$（共 $bc$ 列）；

- 定义可达秩集合 $\operatorname{attainable}(a, b, c, d) = \bigl\{\, r \in \mathbb{N} \;\big|\; \exists M, N,\; \operatorname{rank}(\operatorname{flow}(M, N)) = r \,\bigr\}$，并将**量子最大流** `QMaxFlow` 定义为可达秩的上确界：

$$
\operatorname{QMaxFlow}(a, b, c, d) = \sup\operatorname{attainable}(a, b, c, d) \in \mathbb{N}.
$$

由于 $\operatorname{flow}(M, N)$ 的秩是自然数且受行数 $ad$ 上界约束，该上确界不仅良定义，而且必定能被某对具体的复矩阵三元组 $(M, N)$ 精确达到。

::: {.lemma #lemma-bridge-flow-attained title="最大秩可达到" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_attained"}
对任意自然数 $a, b, c, d \in \mathbb{N}$（允许取 $0$），存在复矩阵族 $M : \operatorname{Fin} 3 \to M_{a\times b}(\mathbb{C})$ 与 $N : \operatorname{Fin} 3 \to M_{d\times c}(\mathbb{C})$，使得

$$
\operatorname{rank}\bigl(\operatorname{flow}(M, N)\bigr) = \operatorname{QMaxFlow}(a, b, c, d).
$$

:::

::: proof
取全零矩阵族 $M = 0, N = 0$ 可知可达秩集合 $\operatorname{attainable}(a, b, c, d) \subseteq \mathbb{N}$ 非空；同时，由于 $\operatorname{flow}(M, N)$ 的行指标集为 $\operatorname{Fin} a \times \operatorname{Fin} d$，任意矩阵的秩都不超过其行数 $ad$，故 $\operatorname{attainable}(a, b, c, d)$ 在自然数集 $\mathbb{N}$ 中有上界。非空有上界的自然数子集必包含其上确界 $\sup\operatorname{attainable}(a, b, c, d)$，因此存在证人 $(M, N)$ 使 $\operatorname{rank}(\operatorname{flow}(M, N)) = \operatorname{QMaxFlow}(a, b, c, d)$。完整证明由 Lean 内核检查。
:::

在阅读 [@lemma-bridge-flow-attained] 时，请记住形式化陈述的诚实准则：该引理经由自然数良序与有界性证明了最大秩证人 $(M, N)$ 的**存在性**，但存在性本身并不等同于在一般张量网络中高效搜寻满秩参数的构造性多项式算法。

## 19.2 宽度三桥图的秩与割容量 {#sec-bridge-flow-cut}

现在我们来数一数：源码用哪三项割容量上界，来约束 $\operatorname{flow}(M, N) = \sum_{r=0}^2 M_r \otimes N_r$ 从输入端 $(\operatorname{Fin} b \times \operatorname{Fin} c)$ 到输出端 $(\operatorname{Fin} a \times \operatorname{Fin} d)$ 的信息通道的秩？

1. **左外边界割（行空间瓶颈）**：矩阵 $\operatorname{flow}(M, N)$ 只有 $|\operatorname{Fin} a \times \operatorname{Fin} d| = ad$ 行，因此其秩绝不可能超过 $ad$；
2. **右外边界割（列空间瓶颈）**：矩阵 $\operatorname{flow}(M, N)$ 只有 $|\operatorname{Fin} b \times \operatorname{Fin} c| = bc$ 列，因此其秩绝不可能超过 $bc$；
3. **中间三桥内部割（跨桥瓶颈）**：对每个桥指标 $r \in \operatorname{Fin} 3$，$M_r \in M_{a\times b}(\mathbb{C})$ 的秩至多为 $a$，$N_r \in M_{d\times c}(\mathbb{C})$ 的秩至多为 $c$，故单个克罗内克积 $M_r \otimes N_r$ 的秩至多为 $ac$；将 $r = 0, 1, 2$ 三路相加，由矩阵秩的次可加性知总秩至多为 $3ac$。

把源码采用的这三项割容量上界取最小值，就是 Lean 模块中定义的**离散量子最小割容量** `QMinCut`：

$$
\operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr) \in \mathbb{N}.
$$

一般维数下，图中另有容量为 $3bd$ 的第四道割；当 $a \le b$ 且 $c \le d$ 时，$3bd \ge 3ac$，这一项冗余。

::: {.figure src="ch19-three-cuts"}
**图中画出源码采用的三项割容量上界，QMinCut 取三者中最小的。** 取 $(a, b, c, d) = (2, 3, 2, 3)$：上面的虚线横切腿 $a$、$d$，容量 $ad = 6$；下面的虚线横切腿 $b$、$c$，容量 $bc = 6$；斜着的灰色虚线切过腿 $a$、三条桥与腿 $c$，容量 $3ac = 12$。两道品红的外割并列最小，$\operatorname{QMinCut} = 6$。
:::

下面的命题证明了：无需任何额外参数限制，对一切自然数 $a, b, c, d \in \mathbb{N}$，宽度三桥图的量子最大流永远不超过这一最小割容量。

::: {.proposition #prop-bridge-flow-cut-bound title="秩不超过割容量" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut"}
对任意自然数 $a, b, c, d \in \mathbb{N}$，恒有

$$
\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr).
$$

:::

::: proof
由 [@lemma-bridge-flow-attained] 取达到最大流 $\operatorname{QMaxFlow}(a, b, c, d)$ 的矩阵对 $(M, N)$。一方面，矩阵 $\operatorname{flow}(M, N)$ 的维数为 $(ad)\times (bc)$，矩阵的秩不超过其行数 $ad$ 且不超过其列数 $bc$，故 $\operatorname{rank}(\operatorname{flow}(M, N)) \le \min(ad, bc)$（对应源码中的 `flow_rank_le_outer`）。另一方面，源码通过显式矩阵因式分解 $\operatorname{flow}(M, N) = \operatorname{cutLeft}(N) \cdot \operatorname{cutRight}(M)$（`flow_factor`）将桥流拆成经过中间指标集 $\operatorname{Fin} 3 \times (\operatorname{Fin} a \times \operatorname{Fin} c)$（维数恰为 $3ac$）的两个矩阵乘积，从而由乘积秩不等式得 $\operatorname{rank}(\operatorname{flow}(M, N)) \le 3ac$（对应源码中的 `flow_rank_le_inner`）。两项上界合并即得 $\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$。完整证明由 Lean 内核检查。
:::

必须明确的是：[@prop-bridge-flow-cut-bound] 中的 $\operatorname{QMinCut}(a, b, c, d)$ 是纯粹的**有限维矩阵秩上界**，而不是连续弯曲时空中的微分几何面积。为了直观看到三路克罗内克积（各自秩不超过 $ac = 4$，具体秩分别为 $4, 1, 1$）如何协同撑满边界割容量 $\min(ad, bc) = 6$，让我们亲手构造一个 $a = c = 2, b = d = 3$ 的满秩算例。

::: {.example #ex-bridge-two-three title="a = c = 2、b = d = 3 时六阶满秩桥流的手算构造"}
取维数参数 $a = c = 2$，$b = d = 3$。首先核对二次锥不等式：

$$
a^2 + b^2 = c^2 + d^2 = 2^2 + 3^2 = 13 \le 3 \cdot 2 \cdot 3 = 18.
$$

此时三道候选割的容量分别为 $3ac = 12$、$ad = 6$、$bc = 6$，最小割容量为 $\operatorname{QMinCut}(2, 3, 2, 3) = \min(12, \min(6, 6)) = 6$。虽然单路张量积 $M_r \otimes N_r$ 的秩至多只有 $ac = 2 \times 2 = 4 < 6$，但把三路（$r = 0, 1, 2$）叠加起来，就能恰好拼出一张满秩的 $6\times 6$ 置换矩阵！显式取如下三对矩阵：

$$
\begin{aligned}
M_0 &= \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix}, \qquad
&N_0 &= \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}, \\
M_1 &= \begin{pmatrix} 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}, \qquad
&N_1 &= \begin{pmatrix} 0 & 0 \\ 0 & 0 \\ 1 & 0 \end{pmatrix}, \\
M_2 &= \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}, \qquad
&N_2 &= \begin{pmatrix} 0 & 0 \\ 0 & 0 \\ 0 & 1 \end{pmatrix}.
\end{aligned}
$$

让我们直接核对三项克罗内克积之和 $\operatorname{flow}(M, N) = M_0 \otimes N_0 + M_1 \otimes N_1 + M_2 \otimes N_2$ 的作用：

- $M_0 \otimes N_0$ 将输入子空间 $\{0, 1\} \times \{0, 1\}$（共 $4$ 个基向量）恒等映射到输出行 $\{0, 1\} \times \{0, 1\}$，贡献秩 $4$；
- $M_1 \otimes N_1$ 仅在列指标 $(2, 0)$、行指标 $(0, 2)$ 处取 $1$，单独补上第 $5$ 个独立基方向；
- $M_2 \otimes N_2$ 仅在列指标 $(2, 1)$、行指标 $(1, 2)$ 处取 $1$，单独补上第 $6$ 个独立基方向。

将列指标 $\operatorname{Fin} 3 \times \operatorname{Fin} 2$ 与行指标 $\operatorname{Fin} 2 \times \operatorname{Fin} 3$ 的六个基配对逐一列出，即可一眼看清这三路桥通道是如何做到“零重叠、全覆盖”的：

| 通道指标 $r \in \operatorname{Fin} 3$ | 输入列指标 $(j, l) \in \operatorname{Fin} 3 \times \operatorname{Fin} 2$ | 输出行指标 $(i, k) \in \operatorname{Fin} 2 \times \operatorname{Fin} 3$ | 对应非零矩阵元 $(M_r)_{i,j}(N_r)_{k,l}$ |
| :---: | :---: | :---: | :---: |
| $r = 0$ | $(0, 0),\; (0, 1),\; (1, 0),\; (1, 1)$ | $(0, 0),\; (0, 1),\; (1, 0),\; (1, 1)$ | $(M_0)_{i,i}(N_0)_{k,k} = 1 \cdot 1 = 1$ |
| $r = 1$ | $(2, 0)$ | $(0, 2)$ | $(M_1)_{0,2}(N_1)_{2,0} = 1 \cdot 1 = 1$ |
| $r = 2$ | $(2, 1)$ | $(1, 2)$ | $(M_2)_{1,2}(N_2)_{2,1} = 1 \cdot 1 = 1$ |

三项之和共有 $6$ 个互不同行、互不同列的非零元 $1$，构成一个标准的 $6\times 6$ 置换矩阵，故 $\operatorname{rank}(\operatorname{flow}(M, N)) = 6 = \operatorname{QMinCut}(2, 3, 2, 3)$，结合 [@prop-bridge-flow-cut-bound] 当场证实 $\operatorname{QMaxFlow}(2, 3, 2, 3) = 6$！
:::

::: {.figure src="ch19-permutation"}
**三条桥合起来正好铺满一张 $6 \times 6$ 置换矩阵。** 青色的格是 $\operatorname{flow}(M, N)$ 的非零元，格里的数是放下它的桥 $r$：桥 $0$ 铺满左上的 $4$ 格，桥 $1$、桥 $2$ 各补 $1$ 格；六格互不同行、互不同列，秩为 $6$（[@ex-bridge-two-three]）。
:::

上面的六阶置换矩阵还满足一个比满秩更精确的等式：它的每一列都是不同的标准基向量，故 $F^*F=I_6$。把右侧因子的输入、输出维数写成 $c=2q$、$d=3q$，同一构造可以延伸到全部允许的左侧维数。关键是把每个输入坐标放到唯一的输出坐标，并保证不同输入不会相撞。

::: {.theorem #thm-bridge-native-saturation-iff title="原生三项张量和的精确列 Gram 饱和条件" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeSaturation.native_saturation_iff"}
对任意自然数 $a,b,q\in\mathbb N$，若 $q>0$，则存在复矩阵族

$$
\begin{aligned}
M_r&\in M_{a\times b}(\mathbb C),\\
N_r&\in M_{3q\times2q}(\mathbb C)
\qquad(r=0,1,2),
\end{aligned}
$$

使其张量和满足

$$
\begin{aligned}
F&=\sum_{r=0}^2M_r\otimes N_r,\\
F^*F&=I_{2bq},
\end{aligned}
$$

当且仅当 $2b\le3a$。这里 $F^*$ 是共轭转置，$F$ 的行指标为 $\operatorname{Fin}a\times\operatorname{Fin}(3q)$，列指标为 $\operatorname{Fin}b\times\operatorname{Fin}(2q)$，而 $I_{2bq}$ 是该列指标集上的单位矩阵。
:::

::: {.proof #pf-bridge-native-saturation-iff}
先证必要性。若 $F^*F=I_{2bq}$，由乘积秩上界和 $F$ 的行数可得

$$
\begin{aligned}
2bq&=\operatorname{rank}(F^*F)\\
&\le\operatorname{rank}F\le3aq.
\end{aligned}
$$

由于 $q>0$，消去 $q$ 即得 $2b\le3a$。

反过来，设 $2b\le3a$。以下指标全部从 $0$ 开始，范围为

$$
\begin{aligned}
0\le i<a,&\qquad0\le j<b,\\
0\le\ell<3q,&\qquad0\le k<2q.
\end{aligned}
$$

用 $\mathbf1_{\{P\}}$ 表示条件 $P$ 成立时为 $1$、否则为 $0$ 的数。取左侧三张切片

$$
\begin{aligned}
(M_0)_{ij}&=\mathbf1_{\{i=j\}},\\
(M_1)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)\}},\\
(M_2)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)+1\}},
\end{aligned}
$$

以及右侧三张切片

$$
\begin{aligned}
(N_0)_{\ell k}&=\mathbf1_{\{\ell=k\}},\\
(N_1)_{\ell k}&=\mathbf1_{\{k<q,\ \ell=2q+k\}},\\
(N_2)_{\ell k}&=\mathbf1_{\{q\le k,\ \ell=q+k\}}.
\end{aligned}
$$

左侧后两式在 $j<a$ 时均为 $0$；其中的差 $j-a$ 只在 $j\ge a$ 时起作用，因而是非负整数差。

先看这些切片如何搬动一列。对输入指标 $(j,k)$，定义输出路由

$$
\rho(j,k)=
\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,2q+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,q+k\bigr),&j\ge a,\ q\le k.
\end{cases}
$$

这个输出确实落在规定范围内。第一分支中 $j<a$ 且 $k<2q<3q$。后两分支中令 $t=j-a$；由 $j+1\le b$ 和 $2b\le3a$ 得

$$
2(t+1)\le2(b-a)\le a.
$$

所以 $2t$、$2t+1$ 都小于 $a$，而输出第二坐标都落在 $[2q,3q)$。当 $b\le a$ 时，全部输入都走第一分支。

记输入标准基为 $E_{j,k}=e_j\otimes e_k$，输出标准基为 $U_{i,\ell}=e_i\otimes e_\ell$。当 $j<a$ 时，只有第 $0$ 项作用；当 $j\ge a$ 时，第 $0$ 项为零，第 $1$、$2$ 项再按 $k<q$ 或 $k\ge q$ 分工。因此每列恰有一个非零元，且等于 $1$：

$$
F E_{j,k}=U_{\rho(j,k)}.
$$

还要检查不同列是否会落到同一行。第一分支的输出第二坐标小于 $2q$，与后两分支不交；后两分支的输出第一坐标分别为偶数和奇数，彼此也不交。在每个分支内，输出又能唯一恢复 $j,k$：第一分支直接读出二者；第二分支由 $i=2t$、$k=\ell-2q$ 恢复；第三分支由 $i=2t+1$、$k=\ell-q$ 恢复，后两者再用 $j=a+t$。故 $\rho$ 是单射。

这就确定了完整的列 Gram，而不只是它的秩。以 $x=(j,k)$、$y=(j',k')$ 简记输入指标，并用通常的复内积（第一变量共轭线性），有

$$
\begin{aligned}
(F^*F)_{x,y}
&=\langle F E_x,F E_y\rangle\\
&=\langle U_{\rho(x)},U_{\rho(y)}\rangle\\
&=\delta_{x,y}.
\end{aligned}
$$

这里 $\delta$ 是 Kronecker 符号。把三项展开，也能逐一看见全部交叉项的去向：第 $0$ 项与另外两项的输出第二坐标区间不交，第 $1$ 项与第 $2$ 项的输出第一坐标奇偶相异，故 $r\ne s$ 时

$$
(M_r^*M_s)\otimes(N_r^*N_s)=0.
$$

每个对角项则是其输入分支上的坐标投影，而三个分支恰好分割全部输入指标。因此

$$
\begin{aligned}
F^*F
&=\sum_{r,s=0}^2(M_r^*M_s)\otimes(N_r^*N_s)\\
&=I_{2bq}.
\end{aligned}
$$

零维情形也包含在内。若 $b=0$，$F$ 没有输入列，$F^*F$ 与 $I_0$ 都是唯一的空方阵，上述等式成立，且 $2b\le3a$ 总成立。若 $a=0$，阈值迫使 $b=0$；若反而 $b>0$，则 $q>0$ 使输入维数为正而输出维数为零，必要性的秩不等式已排除此情形。完整证明由 Lean 内核检查。
:::

取 $a=2$、$b=3$、$q=1$，这六张切片就是 [@ex-bridge-two-three] 中列出的矩阵：前四个输入基向量保持其坐标，另外两个按

$$
\begin{aligned}
(2,0)&\longmapsto(0,2),\\
(2,1)&\longmapsto(1,2)
\end{aligned}
$$

补齐六个输出基向量。[@thm-bridge-native-saturation-iff] 因而是该置换例子在 $c=2q$、$d=3q$ 这一族中的全参数延伸；一般情形只需占据不同的输出坐标，不要求铺满全部输出。

在 $a<b$ 且 $2b\le3a$ 的区间，这族构造有 $3c=6q=2d$。这一等号直接来自所取的 $c=2q$、$d=3q$。定理确定的是这一固定右侧维数族中原始矩阵三元组的存在性，恒等列 Gram 由上述因子的坐标路由直接给出。这一构造本身没有证明：对于任意 $c,d$，$a<b$ 与正标量列 Gram 条件 $F^*F=\lambda I_{bc}$（$\lambda>0$）必然推出 $3c\le2d$。后文 [@thm-bridge-native-rectangular-bound] 的必要界 $2c\le d$ 使用严格阈值 $3a<2b$，其假设与这里的 $2b\le3a$ 分处阈值两侧。

右侧的两段其实不必等长。把 $c$ 个输入坐标分成长度为 $\lfloor c/2\rfloor$ 与 $\lceil c/2\rceil$ 的两段，让它们分别使用左侧的偶数槽与奇数槽，就能沿用同一套路由。因此，$c$ 为偶数、$d$ 恰好等于 $3c/2$ 都不是这一存在性构造所必需的限制；右侧只需容纳原来的 $c$ 行和长度为 $\lceil c/2\rceil$ 的余带。

::: {.theorem #thm-bridge-native-scalar-gram-exists title="第一区域内原生三项张量和的正标量列 Gram 存在性" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeScalarGram.native_scalar_gram_exists"}
对任意自然数 $a,b,c,d\in\mathbb N$，若

$$
2b\le3a,\qquad3c\le2d,
$$

则对每个满足 $\lambda>0$ 的实数 $\lambda$，存在复矩阵族

$$
\begin{aligned}
M&:\operatorname{Fin}3\longrightarrow M_{a\times b}(\mathbb C),\\
N&:\operatorname{Fin}3\longrightarrow M_{d\times c}(\mathbb C),
\end{aligned}
$$

使原始张量和满足

$$
\begin{aligned}
F&=\sum_{r=0}^2M_r\otimes N_r,\\
F^*F&=\lambda I_{bc}.
\end{aligned}
$$

这里 $F^*$ 是共轭转置，$F$ 的行指标为 $\operatorname{Fin}a\times\operatorname{Fin}d$，列指标为 $\operatorname{Fin}b\times\operatorname{Fin}c$；$I_{bc}$ 是该列指标集上的单位矩阵，实数 $\lambda$ 经自然嵌入视为复标量。不要求 $a<b$、$c$ 的奇偶性、$d$ 取某个精确值、因子线性无关或任何维数严格为正。
:::

::: {.proof #pf-bridge-native-scalar-gram-exists}
先构造列 Gram 为单位矩阵的张量和，再作实标量缩放。令

$$
q=\lfloor c/2\rfloor,\qquad c-q=\lceil c/2\rceil.
$$

全部指标从 $0$ 开始，范围为

$$
\begin{aligned}
0\le i<a,&\qquad0\le j<b,\\
0\le s<d,&\qquad0\le k<c.
\end{aligned}
$$

仍用 $\mathbf1_{\{P\}}$ 表示条件 $P$ 的指示数。左侧取上一构造的同三张未缩放切片，记为 $L_r$：

$$
\begin{aligned}
(L_0)_{ij}&=\mathbf1_{\{i=j\}},\\
(L_1)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)\}},\\
(L_2)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)+1\}}.
\end{aligned}
$$

右侧取 $d\times c$ 切片

$$
\begin{aligned}
(N_0)_{sk}&=\mathbf1_{\{s=k\}},\\
(N_1)_{sk}&=\mathbf1_{\{k<q,\ s=c+k\}},\\
(N_2)_{sk}&=\mathbf1_{\{q\le k,\ s=c+(k-q)\}}.
\end{aligned}
$$

差 $j-a$、$k-q$ 分别只在 $j\ge a$、$k\ge q$ 时起作用，均为非负整数差。对 $G=\sum_{r=0}^2L_r\otimes N_r$，这些因子给出的路由是

$$
\rho(j,k)=
\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,c+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,c+(k-q)\bigr),&j\ge a,\ q\le k.
\end{cases}
$$

逐一检查坐标范围。若 $j\ge a$，令 $t=j-a$；由 $j+1\le b$ 和 $2b\le3a$ 得

$$
2(t+1)\le2(b-a)\le a.
$$

因此 $2t<a$ 且 $2t+1<a$。若 $b\le a$，这一余支根本没有输入，所有列都走第一分支。

右侧所需的整数界是

$$
\begin{aligned}
d&\ge\lceil3c/2\rceil\\
&=c+\lceil c/2\rceil=c+(c-q)\ge c.
\end{aligned}
$$

这恰由 $3c\le2d$ 得到。具体地，写 $c=2q+\varepsilon$，其中 $\varepsilon\in\{0,1\}$，则 $2d\ge6q+3\varepsilon$，而 $d$ 是整数，故 $d\ge3q+2\varepsilon=c+(c-q)$。第一分支有 $k<c\le d$；第二分支有

$$
c\le c+k<c+q\le c+(c-q)\le d;
$$

第三分支有

$$
c\le c+(k-q)<c+(c-q)\le d.
$$

故 $\rho(j,k)$ 总是合法的输出坐标。两段右侧输入的长度可以不同，所需余带只取其中较长的 $c-q$ 行。

令 $E_{j,k}=e_j\otimes e_k$ 为输入标准基，$U_{i,s}=e_i\otimes e_s$ 为输出标准基。当 $j<a$ 时，$L_1,L_2$ 的该列为零，只剩第 $0$ 项；当 $j\ge a$ 时，因 $i<a$ 而有 $(L_0)_{ij}=0$，另外两项又由 $k<q$ 与 $q\le k$ 分开。因此每列恰有一个非零元，等于 $1$，且

$$
G E_{j,k}=U_{\rho(j,k)}.
$$

不同输入也不会相撞。第一分支的输出第二坐标小于 $c$，其余两支的第二坐标至少为 $c$。后两支虽共用右侧余带，输出第一坐标却分别为偶数与奇数，故彼此不交。在每支内部，输出 $(i,s)$ 唯一恢复输入：第一支有 $(j,k)=(i,s)$；第二支有 $j=a+i/2$、$k=s-c$；第三支有 $j=a+(i-1)/2$、$k=q+s-c$，其中除法在相应奇偶分支上都是整除。故 $\rho$ 为单射。于是对任意输入指标 $x,y$，通常的复内积给出

$$
\begin{aligned}
(G^*G)_{x,y}
&=\langle G E_x,G E_y\rangle\\
&=\langle U_{\rho(x)},U_{\rho(y)}\rangle
=\delta_{x,y}.
\end{aligned}
$$

这直接确定全部 Gram 元素。最后实际选取的原始因子为

$$
\begin{aligned}
M_r&=\sqrt{\lambda}\,L_r,\qquad N_r\ \text{保持上述取值},\\
F&=\sqrt{\lambda}\,G,\\
F^*F&=\overline{\sqrt{\lambda}}\sqrt{\lambda}\,G^*G
=\lambda I_{bc},
\end{aligned}
$$

因为 $\lambda>0$，$\sqrt{\lambda}$ 为实数且平方等于 $\lambda$。整个论证始终使用所列的 $a\times b$ 与 $d\times c$ 原始因子。

零维情形仍在两条维数前提下讨论：若 $b=0$ 或 $c=0$，输入指标集为空，$F^*F$ 与 $\lambda I_0$ 都是唯一的空方阵。若 $a=0$，$2b\le3a$ 迫使 $b=0$；若 $d=0$，$3c\le2d$ 迫使 $c=0$。也不需要 $q>0$：$c=1$ 时 $q=0$，第二分支为空，第三分支按原式工作。零矩阵或线性相关的因子无需排除。完整证明由 Lean 内核检查。
:::

::: {.example #ex-bridge-native-scalar-gram-odd title="奇数右输入维数的九列路由"}
取

$$
(a,b,c,d,\lambda)=(2,3,3,5,2).
$$

此时 $2b=6=3a$、$3c=9\le10=2d$，$q=1$，两段右侧输入的长度分别为 $1$ 和 $2$。原始左因子是三张 $2\times3$ 矩阵：

$$
\begin{aligned}
M_0&=\sqrt2\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix},\\
M_1&=\sqrt2\begin{pmatrix}0&0&1\\0&0&0\end{pmatrix},\\
M_2&=\sqrt2\begin{pmatrix}0&0&0\\0&0&1\end{pmatrix}.
\end{aligned}
$$

原始右因子都是 $5\times3$ 矩阵。$N_0$ 的非零元为 $(N_0)_{00}=(N_0)_{11}=(N_0)_{22}=1$；$N_1$ 只有 $(N_1)_{30}=1$；$N_2$ 只有 $(N_2)_{31}=(N_2)_{42}=1$，其余元素均为零。由此 $F=\sum_{r=0}^2M_r\otimes N_r$ 有 $10$ 行、$9$ 列。前六列 $(j,k)$（$j=0,1$，$k=0,1,2$）分别等于 $\sqrt2\,U_{j,k}$；其余三列为

$$
\begin{aligned}
F E_{2,0}&=\sqrt2\,U_{0,3},\\
F E_{2,1}&=\sqrt2\,U_{1,3},\\
F E_{2,2}&=\sqrt2\,U_{1,4}.
\end{aligned}
$$

九个输出坐标互异，只有输出坐标 $(0,4)$ 未被占据。因此每列范数平方为 $2$，任意两列内积为零，直接得到 $F^*F=2I_9$。这说明右侧两段不等长时，原始三项因子仍能给出精确的标量列 Gram。
:::

[@thm-bridge-native-scalar-gram-exists] 把存在性构造延伸到满足 $3c\le2d$ 的任意自然数右侧维数，但仍保留左侧前提 $2b\le3a$。它是充分条件，不把 $3c\le2d$ 宣称为任意原始因子的普遍必要条件，也没有给出全维数的充要分类。后文的必要界分别在 $3a<2b$ 下给出 $2c\le d$（[@thm-bridge-native-rectangular-bound]），在更强的 $2a<b$ 下给出 $3c\le d$（[@thm-bridge-scalar-gram-obstruction]）。这里得到的只是精确有限维原生矩阵模型中的 Gram 恒等式；它不提供近似平坦谱的误差间隙、物理实现或 RT 公式的推导。

## 19.3 锥域与离散容量分片的拼接 {#sec-discrete-facet-stitching}

在 [@ex-bridge-two-three] 中，中间桥割容量 $3ac = 12$ 远大于两侧外边界割 $ad = bc = 6$，因此中间桥不会成为卡死流量的瓶颈。为什么二次锥条件 $a^2 + b^2 \le 3ab$ 与 $c^2 + d^2 \le 3cd$ 恰好落在保证中间三桥不构成瓶颈的自然区域之内？

不妨做一步初等代数检验：当 $a > 0$ 时，不等式 $a^2 + b^2 \le 3ab$ 意味着 $b^2 < a^2 + b^2 \le 3ab$，消去正因子 $b$（若 $b > 0$）即得 $b < 3a$，同理 $c > 0$ 与 $c^2 + d^2 \le 3cd$ 意味着 $d < 3c$。换言之，两个外边界比值 $b/a$ 与 $d/c$ 都被严格关在宽度因子 $3$ 以内：一旦乘上桥宽 $3$，就有 $3ac > bc$ 且 $3ac > ad$！因此，只要参数 $(a, b)$ 与 $(c, d)$ 落在二次锥域 $a^2 + b^2 \le 3ab$ 与 $c^2 + d^2 \le 3cd$（且 $a > 0, c > 0$）之内，中间割 $3ac$ 就永远大于或等于外边界割 $\min(ad, bc)$，从而最小割公式自动脱去外层的 $3ac$！

::: {.viz src="eth-horizon-crossover" preset="narrow" height="500"}
**桥太窄：三条桥成了瓶颈。** 桥图 $(a, b, c, d) = (1, 5, 1, 5)$：两道外割都是 $5$，三条桥却只能过 $3ac = 3$，品红虚线标出的最小割切过腿 $a$、三条桥与腿 $c$。右边的流矩阵是 $5 \times 5$ 的，青色的奇异值在第三个之后归零，秩只有 $3$。$1^2 + 5^2 = 26 > 3 \cdot 1 \cdot 5$，这组维数在锥域之外（[@prop-bridge-flow-cut-bound]）。
:::

::: {.corollary #cor-bridge-cone-mincut title="锥域内最小割" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.cone_QMinCut"}
设自然数 $a, b, c, d \in \mathbb{N}$ 满足 $0 < a$、$0 < c$，且满足二次锥不等式

$$
a^2 + b^2 \le 3ab \qquad\text{与}\qquad c^2 + d^2 \le 3cd.
$$

则最小割容量化简为

$$
\operatorname{QMinCut}(a, b, c, d) = \min(ad, bc).
$$

:::

::: proof
按定义 $\operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$，故只需证明 $\min(ad, bc) \le 3ac$。由假设 $a^2 + b^2 \le 3ab$ 与 $c^2 + d^2 \le 3cd$，结合自然数算术，若 $ad \le bc$ 且 $3ac < ad$，则 $3c < d$（由 $a > 0$ 消去 $a$），代入 $c^2 + d^2 \le 3cd$ 将导出 $c^2 + d^2 < d^2$ 的矛盾；同理若 $bc \le ad$ 且 $3ac < bc$，则 $3a < b$（由 $c > 0$ 消去 $c$），代入 $a^2 + b^2 \le 3ab$ 亦导出矛盾。故必有 $\min(ad, bc) \le 3ac$。完整证明由 Lean 内核检查。
:::

请注意 [@cor-bridge-cone-mincut] 的精确前提：本条推论只要求 $0 < a$、$0 < c$ 及两条二次锥不等式 $a^2 + b^2 \le 3ab$、$c^2 + d^2 \le 3cd$，**并不额外要求顺序条件 $a \le b$ 或 $c \le d$**（顺序条件将在下一节构造满秩下界时才引入）。

现在，让我们用本书的**离散分片与粘接视角（R3）**来审视 $\operatorname{QMinCut}(a, b, c, d) = \min(3ac, ad, bc)$ 的几何图景。对正整数维数 $a, b, c, d > 0$，取对数容量坐标

$$
u = \ln a, \qquad v = \ln b, \qquad w = \ln c, \qquad z = \ln d.
$$

由于对数函数严格单调递增，乘积变成加法，最小割的对数容量恰好化为**三张仿射超平面的下包络（lower envelope）**：

$$
\ln\operatorname{QMinCut}(a, b, c, d) = \min(\ln 3 + u + w,\; u + z,\; v + w).
$$

在四维参数空间 $(u, v, w, z)$ 中，这三张仿射平面像多面体的屋顶一样彼此交截，切出三片离散容量分片（facets）：当参数落在锥域内部时，屋顶的最高层 $\ln 3 + u + w$ 退居上方，下方由左边界分片 $u + z = \ln(ad)$ 与右边界分片 $v + w = \ln(bc)$ 沿**粘接接缝**（seam）$u + z = v + w$（即 $ad = bc$）拼接而成。

> 离散张量网络不直接生成光滑流形；它在对数容量的参数空间里切出一张张仿射多面体分片，而瓶颈割的跃迁正是跨越两张分片粘接接缝的折痕。

::: {.example #ex-log-capacity-facets title="对数容量多面体分片与接缝跨越（d = 2 → 3 → 4）"}
固定 $a = 2, b = 3, c = 2$（满足 $0 < a \le b$ 且 $a^2 + b^2 = 13 \le 3ab = 18$），让外腿维数 $d$ 依次取 $2 \to 3 \to 4$，追踪 $\operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$ 从左边界分片穿过粘接接缝进入右边界分片的完整轨迹：

1. **左分片内部点 $(a, b, c, d) = (2, 3, 2, 2)$（$d = 2$）**：首先核对 $0 < c \le d$（$2 \le 2$）及二次锥条件 $c^2 + d^2 = 2^2 + 2^2 = 8 \le 3 \cdot 2 \cdot 2 = 12$。此时三道候选割容量为 $(3ac, ad, bc) = (12, 4, 6)$，对数坐标下三张仿射平面取值为 $(\ln 12, \ln 4, \ln 6)$，最小割容量为 $\operatorname{QMinCut}(2, 3, 2, 2) = \min(12, \min(4, 6)) = 4 = ad$。该格点严格落在 $ad < bc$（$4 < 6$）的左边界分片内部，全局最大秩由左边界割 $ad = 4$ 唯一控制。
2. **粘接接缝点 $(a, b, c, d) = (2, 3, 2, 3)$（$d = 3$）**：对数坐标为 $(u, v, w, z) = (\ln 2, \ln 3, \ln 2, \ln 3)$，三张仿射平面的取值分别为

$$
\ln 3 + u + w = \ln 12, \qquad u + z = \ln 6, \qquad v + w = \ln 6.
$$

此时 $(3ac, ad, bc) = (12, 6, 6)$，$ad = 6 = bc$，该格点恰好踩在左分片 $u + z$ 与右分片 $v + w$ 的粘接接缝 $ad = bc$ 上，最小割容量为 $\operatorname{QMinCut}(2, 3, 2, 3) = \min(12, \min(6, 6)) = 6$。

3. **跨越接缝进入右分片 $(a, b, c, d) = (2, 3, 2, 4)$（$d = 4$）**：将 $d$ 从 $3$ 增大到 $4$。首先核对 $(c, d) = (2, 4)$ 依然留在二次锥域内：

$$
c^2 + d^2 = 2^2 + 4^2 = 20 \le 3 \cdot 2 \cdot 4 = 24.
$$

此时三道候选割容量变为 $(3ac, ad, bc) = (12, 8, 6)$，对数容量下包络给出 $\operatorname{QMinCut}(2, 3, 2, 4) = \min(12, \min(8, 6)) = 6 = bc$。综观 $d = 2 \to 3 \to 4$ 的三步演进，候选割三元组依次走过 $(12, 4, 6) \to (12, 6, 6) \to (12, 8, 6)$，完整展示了格点如何从 $ad < bc$ 分片穿过接缝 $ad = bc$ 跃迁入 $ad > bc$ 分片，使控制全局最大秩的唯一瓶颈割由左边界割 $ad$ 切换为右边界割 $bc$。必须强调的是，本章的有限维秩定理只严格标定这些多面体分片上的离散整数维数格点，而不作连续实数维数插值。
:::

::: {.figure src="ch19-facet-seam"}
**最小割是三张平面的下包络，格点越过接缝就换了瓶颈。** 固定 $a = 2, b = 3, c = 2$，横轴是 $\ln d$：粗线先沿蓝色的 $\ln ad$ 上升，在竖直虚线 $ad = bc$ 处折到橙色的 $\ln bc$ 上，灰色的 $\ln 3ac$ 一直在上方。三个格点 $d = 2, 3, 4$ 标着候选割 $(12, 4, 6)$、$(12, 6, 6)$、$(12, 8, 6)$（[@ex-log-capacity-facets]）；定理只标定这些整数格点。
:::

## 19.4 从离散桥图到 RT 文献边界 {#sec-rt-literature-bridge}

在确立了任意参数下的上界 $\operatorname{QMaxFlow} \le \operatorname{QMinCut}$（[@prop-bridge-flow-cut-bound]）以及锥域内的最小割化简 $\operatorname{QMinCut} = \min(ad, bc)$（[@cor-bridge-cone-mincut]）之后，最后一步硬骨头是反方向的下界：在有序锥域 $0 < a \le b$、$0 < c \le d$ 且 $a^2 + b^2 \le 3ab$、$c^2 + d^2 \le 3cd$ 内，能否总是显式构造出三对矩阵 $(M, N)$，使 $\operatorname{flow}(M, N)$ 的秩精确达到 $\min(ad, bc)$？

Lean 的 `D5.S3.Quantum.TensorNetworks.BridgeGraph.QuantumMaxFlowMinCut` 模块给出了肯定的形式化证明。在源码中，目标命题 `claim` 展开为对全部六个前提条件的全称蕴含，并由主定理 [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) 彻底锁定。

::: {.theorem #thm-bridge-quantum-maxflow-mincut title="离散桥图量子最大流最小割" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result"}
对任意自然数 $a, b, c, d \in \mathbb{N}$，若同时满足正性与顺序条件 $0 < a$、$a \le b$、$0 < c$、$c \le d$ 以及二次锥条件

$$
a^2 + b^2 \le 3ab \qquad\text{与}\qquad c^2 + d^2 \le 3cd,
$$

则宽度三桥图的量子最大流与量子最小割相等，且同时等于外边界割容量：

$$
\operatorname{QMaxFlow}(a, b, c, d) = \operatorname{QMinCut}(a, b, c, d) \qquad\text{且}\qquad \operatorname{QMinCut}(a, b, c, d) = \min(ad, bc).
$$

:::

::: proof
第二项等式 $\operatorname{QMinCut}(a, b, c, d) = \min(ad, bc)$ 直接由 [@cor-bridge-cone-mincut] 给出，而上界 $\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d)$ 已由 [@prop-bridge-flow-cut-bound] 确立。为证核心等式 $\operatorname{QMaxFlow}(a, b, c, d) = \min(ad, bc)$，模块 [`QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) 中的 `claim_of_hypotheses` 对外腿维数之和 $n = b + d$ 施加强归纳法（`Nat.strong_induction_on`）：

1. **等宽与混合宽度区间的显式有理证人（`widthTwo_proved`）**：当 $a = b$ 或 $c = d$（`square_left`、`square_right`），或一侧处于大比值区间而另一侧处于小比值区间（$2a \le b \land d \le 2c$ 的 `mixed_left`，及由转置对偶 `witness_swap` 诱导的 $b \le 2a \land 2c \le d$ 的 `mixed_right`）时，直接用分块部分单位矩阵构造有理矩阵证人（`RationalWitness`），在 $\operatorname{flow}(M, N)$ 中嵌出阶数为 $\min(ad, bc)$ 的单位子矩阵；
2. **双小比值基底区间（`base_witness`）**：当 $a < b < 2a$ 且 $c < d < 2c$ 时，调用基底模块构造满秩有理证人；
3. **双大比值区间的二次锥同步无穷递降（`cone_descent` 与 `full_rank_of_descent`）**：当 $2a \le b$ 且 $2c \le d$ 时，利用整系数恒等式 $(3a - b)^2 + a^2 - 3(3a - b)a = a^2 + b^2 - 3ab \le 0$，将四元组映射为严格更小的锥域四元组 $(a', b', c', d') = (3a - b,\, a,\, 3c - d,\, c)$（其外腿和 $b' + d' = a + c < b + d$）。由归纳假设知较小四元组达到满秩 $\min((3a-b)c,\, a(3c-d))$，再结合移位易位亏格守恒恒等式（`castling_proved`：$u y - \operatorname{QMaxFlow}(u, x, v, y) = x(3y - v) - \operatorname{QMaxFlow}(x, 3x - u, y, 3y - v)$）与割容量平衡关系 $(3a - b)c + bc = a(3c - d) + ad$，推出原四元组 $(a, b, c, d)$ 的亏格为零，即 $\operatorname{QMaxFlow}(a, b, c, d) = \min(ad, bc)$。

完整证明由 Lean 内核检查。
:::

请务必看清 [@thm-bridge-quantum-maxflow-mincut] 的严格适用范围：

- 定理中的“桥图”并非附加的抽象几何类型，而是特指由三路克罗内克积求和定义的显式矩阵收缩 $\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r$；
- 等式 $\operatorname{QMaxFlow} = \operatorname{QMinCut} = \min(ad, bc)$ 严格依赖于桥宽 $\operatorname{Fin} 3$ 以及显式列出的正性、顺序与二次锥不等式（$0 < a \le b$，$0 < c \le d$，$a^2 + b^2 \le 3ab$，$c^2 + d^2 \le 3cd$）；
- 该定理**不能**无条件推广到任意拓扑的张量网络、完整的 MERA 多尺度重整化树、连续统 AdS/CFT 对偶或 Ryu–Takayanagi 极小曲面公式。

[@thm-bridge-quantum-maxflow-mincut] 确定的是可达秩，而不是奇异值的分布。设非零桥流 $F$ 的非零奇异值为 $\sigma_1,\ldots,\sigma_R$；将它作为行、列两侧的纯态振幅矩阵归一化后，施密特权重为 $p_j=\sigma_j^2/\sum_k\sigma_k^2$。秩只数有多少个 $p_j$ 非零；纠缠熵达到 $\ln R$ 还要求它们全部等于 $1/R$。[@ex-bridge-two-three] 的置换矩阵恰好兼具满秩与平坦谱，但秩定理本身没有保证每组允许维数都能如此。

仍按 19.1 节的原始分组，取 $M_r\in M_{a\times b}(\mathbb C)$、$N_r\in M_{d\times c}(\mathbb C)$，并令

$$
F=\sum_{r=0}^2 M_r\otimes N_r:
\mathbb C^b\otimes\mathbb C^c\longrightarrow
\mathbb C^a\otimes\mathbb C^d.
$$

这里 $F^*$ 表示共轭转置。比秩可达更强的要求，是存在同一组矩阵族 $M,N$ 和同一个正实数 $\lambda$，使

$$
\begin{aligned}
bc\le ad&\ \Longrightarrow\ F^*F=\lambda I_{bc},\\
ad\le bc&\ \Longrightarrow\ FF^*=\lambda I_{ad}.
\end{aligned}
$$

它们分别要求列或行构成范数为 $\sqrt{\lambda}$ 的正交族，使较小一侧的奇异值全部等于 $\sqrt{\lambda}$。在接缝 $ad=bc$ 上，两项蕴含同时生效，使用的是同一个 $F$ 与同一个 $\lambda$。下面的必要条件说明，这种加强受到秩本身看不见的限制。

先看结论中 $2c$ 的几何含义。当 $c=1$，若能从右侧因子中组合出 $y_0,y_1\in\mathbb C^d$，满足 $y_0^*y_0=y_1^*y_1=1$、$y_0^*y_1=0$，就必须有 $d\ge2$。推广到一般 $c$，所需的是两个等距映射 $J_0,J_1:\mathbb C^c\to\mathbb C^d$，满足 $J_\alpha^*J_\beta=\delta_{\alpha\beta}I_c$：两个 $c$ 维像彼此正交，因而 $d\ge2c$。下面先找出共同的两个系数方向，再从原始 Gram 恒等式导出这样的映射。

::: {.theorem #thm-bridge-common-coefficient-plane title="所有 Hermitian 系数核的共同复二维中性平面" lean="D5/S3/Quantum/Algebra/GenericCommonCoefficientPlane.common_plane"}
设 $a,b\in\mathbb N$ 满足严格阈值 $3a<2b$。令

$$
X:\operatorname{Fin}3\longrightarrow M_{a\times b}(\mathbb C)
$$

是复线性无关的三元组，并令系数指标在前的堆叠 $S=\operatorname{stack}(X)$（行指标为 $(r,i)\in\operatorname{Fin}3\times\operatorname{Fin}a$）满足 $S$ 的线性映射是单射。则存在复二维子空间 $L\subset\mathbb C^3$，使得对每个 Hermitian 系数矩阵 $T\in M_3(\mathbb C)$，只要

$$
S^*(T\otimes I_a)S=0,
$$

就有完整的复半双线性配对

$$
u^*Tv=0\qquad(u,v\in L).
$$

这里的量词包含 Hermitian 系数核只有零矩阵的情形；定理没有另加非零核、签名或正性假设。
:::

::: proof
记

$$
\Phi_X(T)=S^*(T\otimes I_a)S=\sum_{r,s}T_{rs}X_r^*X_s,
$$

即源码的 [compression](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.compression) 与 [compression_eq_sum](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.compression_eq_sum)。两次乘积秩下界给出 $\operatorname{rank}\Phi_X(T)\ge a\operatorname{rank}T-2(3a-b)$。若 $\Phi_X(T)=0$ 且 $\operatorname{rank}T=3$，便有 $2b\le3a$，矛盾，所以每个系数核矩阵的秩至多为 $2$。若 $T$ 半正定，将它写成 $C^*C$，对 $\Phi_X(T)=0$ 取迹得到若干矩阵范数平方之和为零，迫使 $C$ 的每行给出 $\sum_r C_{jr}X_r=0$；独立性使 $C=0$。对 $-T$ 同理。因此每个非零 Hermitian 核形式都有一正、一负和一个零特征值。

若 Hermitian 核只有零矩阵，任意复二维平面都满足结论。否则，对一个非零核形式作可逆伴随合同，将其化为 $\operatorname{diag}(1,-1,0)$，并配对变换 $X$；独立性和堆叠单射性均保留。以下暂在这组坐标中工作。等列 Gram $X_0^*X_0=X_1^*X_1$ 给出 $X_1=UX_0$，其中 $U$ 是余域 $\mathbb C^a$ 上的酉矩阵。令

$$
\begin{aligned}
D&=\operatorname{range}X_0,& E&=X_2(\ker X_0),\\
r&=\dim D,&s&=\dim E.
\end{aligned}
$$

堆叠单射性使 $X_2$ 在 $\ker X_0$ 上单射，故 $r+s=b$；由 $r,s\le a$ 与 $3a<2b$ 得 $2r>a$。对任意 Hermitian 核形式 $Q$，在 $\ker X_0$ 上配对先得到 $Q_{22}=0$，再在任意输入向量间配对得到

$$
(Q_{20}I_a+Q_{21}U)D\perp E.
$$

若某个 $Q$ 的交叉系数不全为零，记 $K=Q_{20}I_a+Q_{21}U$。上式给出 $\dim\ker(K|_D)\ge r+s-a=b-a$，所以

$$
\dim\bigl(\ker(K|_D)\cap E\bigr)\ge b+s-2a\ge2b-3a>0.
$$

取其中非零 $v$，则 $Q_{21}\ne0$，且 $Uv=wv$，其中 $w=-Q_{20}/Q_{21}$、$|w|=1$。把同一个 $v\in D\cap E$ 代入每个核形式的交叉关系，得到所有形式共有的 $Q_{20}+wQ_{21}=0$；取 $v$ 在 $X_0$ 下的原像再配对，得到 $(1,w,0)^*Q(1,w,0)=0$。

若所有交叉系数都为零，令

$$
A(Q)=(Q_{00}+Q_{11})I_a+Q_{01}U+Q_{10}U^*.
$$

由 $X_0^*A(Q)X_0=0$ 与 $2r>a$，每个 $A(Q)$ 都奇异。一次对角化同一个 $U$ 后，这些对角元是 Hermitian 核这个实向量空间上的有限个实线性泛函。它们的零空间覆盖整个核；实向量空间不可能被有限个真线性子空间覆盖，故至少一个固定对角元对整个核恒为零。它的酉特征值给出同一个单位相位 $w$，也使 $(1,w,0)^*Q(1,w,0)=0$ 对所有 $Q$ 成立。

两种分支都使 $L=\operatorname{span}_{\mathbb C}\{(0,0,1),(1,w,0)\}$ 上的四个基向量配对全部为零：用到 $Q_{22}=0$、交叉关系、其共轭与最后的二次关系。由共轭线性与线性延拓，完整的 $u^*Qv$ 对任意 $u,v\in L$ 为零。可逆系数合同把这一共同平面运回原坐标，保持复维数与完整配对。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-bridge-native-rectangular-bound title="原生三项矩形张量和的列 Gram 维数界" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeRectangularBound.bound"}
对任意自然数 $a,b,c,d$，任取复矩阵族

$$
M_r\in M_{a\times b}(\mathbb C),\qquad N_r\in M_{d\times c}(\mathbb C)\qquad(r=0,1,2),
$$

令原始收缩（行指标为 $\operatorname{Fin}a\times\operatorname{Fin}d$，列指标为 $\operatorname{Fin}b\times\operatorname{Fin}c$）

$$
F=\sum_{r=0}^2M_r\otimes N_r:
\mathbb C^b\otimes\mathbb C^c\longrightarrow\mathbb C^a\otimes\mathbb C^d.
$$

若 $\lambda\in\mathbb R$ 满足 $\lambda>0$，且

$$
F^*F=\lambda I_{bc},\qquad 3a<2b,
$$

则

$$
2c\le d.
$$

不要求原始三元组独立、白化或归一化，也不加维数正性、顺序或二次锥条件；所有自然维数都在量词内，包括零维情形。
:::

::: proof
若 $c=0$，结论为 $0\le d$。以下设 $c>0$；严格阈值给出 $b>0$。若 $a=0$ 或 $d=0$，$F$ 的所有列为零，与 $F^*F=\lambda I_{bc}$ 矛盾；$b=0$ 则不满足阈值。因此没有暗中删去任何零维情形。另在更强的 $2a<b$ 区间，下面的 [@thm-bridge-scalar-gram-obstruction] 已给出更强结论 $3c\le d$；以下解释一般的 $2c\le d$ 机制。

把同一个 $F$ 写成项数最少的精确张量和，记为 $\sum_{r<k}A_r^{(0)}\otimes D_r$，其中 $0\le k\le3$。若任一侧因子线性相关，从非零系数关系解出一个因子并把该项吸收到其余项，就可减少宽度。因此最小分解两侧各自复线性无关。令 $A_r=A_r^{(0)}/\sqrt\lambda$，得到

$$
\widehat F=\frac{F}{\sqrt\lambda}=\sum_{r<k}A_r\otimes D_r,\qquad
\widehat F^*\widehat F=I_{bc}.
$$

这是对原始假设的推导，不是附加的独立性或归一化前提。

对 $c>0$，右侧独立性使归一 Hilbert–Schmidt Gram

$$
H_{rs}=\frac1c\Tr(D_r^*D_s)
$$

正定：$z^*Hz=c^{-1}\|\sum_r z_rD_r\|_{\mathrm{HS}}^2$，非零 $z$ 时严格为正。故 $H=B^*B$，其中 $B$ 可逆。作配对的系数白化

$$
\begin{aligned}
X_r&=\sum_sB_{rs}A_s,\\
Y_r&=\sum_s(B^{-T})_{rs}D_s,\\
B^{-T}&=(B^T)^{-1}.
\end{aligned}
$$

这里用逆转置，因为张量和的系数配对是双线性的：$B^TB^{-T}=I_k$ 保证 $\sum_rX_r\otimes Y_r=\widehat F$。这一步不改变已归一的收缩，也保留因子独立性。对 $\widehat F^*\widehat F=I_b\otimes I_c$ 的第二因子取偏迹并除以 $c$，有

$$
\begin{aligned}
\sum_{r,s}H_{rs}A_r^*A_s&=I_b,\\
\sum_rX_r^*X_r&=I_b.
\end{aligned}
$$

因此系数在前的堆叠 $S:\mathbb C^b\to\mathbb C^k\otimes\mathbb C^a$ 满足 $S^*S=I_b$，给出单射及 $b\le ka$。宽度 $k=0,1$ 都与 $b>a$ 矛盾。

对余下的 $k=2,3$，定义压缩与每个右侧指标对的 Gram 缺陷

$$
\begin{aligned}
\Phi_X(T)&=S^*(T\otimes I_a)S
=\sum_{r,s}T_{rs}X_r^*X_s,\\
(G_{\ell m})_{rs}&=(Y_r^*Y_s)_{\ell m},\\
R_{\ell m}&=G_{\ell m}-\delta_{\ell m}I_k
\qquad(0\le\ell,m<c).
\end{aligned}
$$

这里 $\delta$ 为 Kronecker 符号，所有复右 Gram 缺陷统一为 $R=G-\delta I$。展开 $\widehat F^*\widehat F=I_{bc}$，取第二因子的 $(\ell,m)$ 矩阵元，再减去 $\delta_{\ell m}\sum_rX_r^*X_r$，就得 $\Phi_X(R_{\ell m})=0$。

$k=2$ 时，$\operatorname{rank}S=b$。两次乘积秩下界给出

$$
\operatorname{rank}\Phi_X(T)\ge a\operatorname{rank}T-2(2a-b).
$$

若非零 $T$ 的压缩为零，则 $\operatorname{rank}T\ge1$ 迫使 $2b\le3a$，矛盾。因此压缩核为零，所有 $R_{\ell m}=0$，即 $Y_r^*Y_s=\delta_{rs}I_c$。当 $c=1$，$Y_0,Y_1$ 就是 $\mathbb C^d$ 中两根正交单位向量。一般 $c$ 时，$Y_0,Y_1:\mathbb C^c\to\mathbb C^d$ 是等距映射，且其两个 $c$ 维像彼此正交；拼接 $[\,Y_0\ Y_1\,]$ 有 $2c$ 根正交归一列，故 $2c\le d$。

$k=3$ 时，[@thm-bridge-common-coefficient-plane] 的独立性与堆叠单射前提已经导出。其共同平面 $L$ 对整个 Hermitian 压缩核有效，包括该核为零的情形。每个复缺陷 $R=G-\delta I_3$ 未必 Hermitian，尤其不能略过 $\ell\ne m$。由于 $\Phi_X(R^*)=\Phi_X(R)^*$，两个 Hermitian 部分

$$
\begin{aligned}
R_{\mathrm R}&=\frac{R+R^*}{2},\\
R_{\mathrm I}&=\frac{R-R^*}{2i},\\
R&=R_{\mathrm R}+iR_{\mathrm I}.
\end{aligned}
$$

都在核中。同一个 $L$ 同时消去每个块的两部分的完整配对，故 $u^*R_{\ell m}v=0$ 对全部 $\ell,m$ 与 $u,v\in L$ 成立；这些是伴随意义的 Hermitian 部分，不是逐元素的实部与虚部。

取 $L$ 的正交归一基组成 $V\in M_{3\times2}(\mathbb C)$，令

$$
W=[\,Y_0\ Y_1\ Y_2\,],\qquad C=V\otimes I_c.
$$

全部块关系与 $V^*V=I_2$ 给出

$$
\begin{aligned}
(WC)^*(WC)&=I_{2c},\\
2c&=\operatorname{rank}(WC)\le d.
\end{aligned}
$$

当 $c=1$，$WC$ 的两列是正交单位向量；一般 $c$ 时，两组列张成两个彼此正交的 $c$ 维像。这个结论来自张量 Gram 的全部块，而非仅靠环境维数不等式 $bc\le ad$。最小分解、白化、堆叠与压缩都是证明辅助操作，原始 $F$ 的行指标 $(a,d)$ 与列指标 $(b,c)$ 始终不变。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-bridge-scalar-gram-obstruction title="宽度三桥流的标量 Gram 障碍" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/RestrictedFlatSpectrum.obstruction"}
设 $a,b,c,d\in\mathbb N$，$c>0$、$b>2a$。对任意三个 $a\times b$ 复矩阵 $M_r$、三个 $d\times c$ 复矩阵 $N_r$ 及正实数 $\lambda$，若

$$
F=\sum_{r=0}^2M_r\otimes N_r,\qquad
F^*F=\lambda I_{bc},
$$

则 $d\ge3c$。不另要求 $a>0$，也不加顺序条件或二次锥条件。
:::

::: {.proof #pf-bridge-scalar-gram-obstruction}
先把三张 $M_r$ 竖直堆叠为辅助映射

$$
V:\mathbb C^b\longrightarrow\mathbb C^3\otimes\mathbb C^a,\qquad
Vx=\sum_{r=0}^2e_r\otimes M_rx.
$$

若 $Vx=0$，则所有 $M_rx=0$，故 $F(x\otimes y)=0$。取非零 $y\in\mathbb C^c$，由 $F^*F=\lambda I_{bc}$ 得 $\lambda\|x\|^2\|y\|^2=0$，所以 $x=0$。因此 $W=\operatorname{range}V$ 的维数为 $b$。

固定任意非零系数方向 $z=(z_0,z_1,z_2)\in\mathbb C^3$。子空间 $z\otimes\mathbb C^a$ 的维数为 $a$，而环境空间的维数为 $3a$；因为 $b+a>3a$，有 $W\cap(z\otimes\mathbb C^a)\ne\{0\}$。于是存在非零 $x,u$，使 $Vx=z\otimes u$，即对每个 $r$ 都有 $M_rx=z_ru$。

这使九个 $M_r^*M_s$ 线性无关。事实上，若复系数矩阵 $T=(t_{rs})$ 满足 $\sum_{r,s}t_{rs}M_r^*M_s=0$，用上面选出的 $x$ 在两侧配对便得

$$
0=\sum_{r,s}t_{rs}\langle M_rx,M_sx\rangle
=\|u\|^2z^*Tz.
$$

因此 $z^*Tz=0$ 对所有 $z$ 成立（$z=0$ 时亦然）。分别代入 $e_r$，再对 $r\ne s$ 代入 $e_r+e_s$ 与 $e_r+i e_s$，得到

$$
t_{rr}=0,\qquad t_{rs}+t_{sr}=0,\qquad
it_{rs}-it_{sr}=0.
$$

故所有 $t_{rs}=0$。这里同时用了实、虚两个方向，不能只检验实向量 $z$。

接着展开原来的列 Gram 恒等式：

$$
\sum_{r,s}(M_r^*M_s)\otimes(N_r^*N_s)
=\lambda I_b\otimes I_c.
$$

由 $c>0$ 固定一个坐标 $k$，定义 $H_{rs}=(N_r^*N_s)_{kk}$，并记 $\delta_{ij}$ 为 Kronecker 符号。对任意 $i,j$，取上式在第二个张量因子上的 $(i,j)$ 矩阵元，再减去 $(k,k)$ 矩阵元对应等式的 $\delta_{ij}$ 倍，得到

$$
\sum_{r,s}\bigl((N_r^*N_s)_{ij}-\delta_{ij}H_{rs}\bigr)M_r^*M_s=0.
$$

由九个 $M_r^*M_s$ 的线性无关性，每个系数均为零，因而全部交叉 Gram 都是标量矩阵：$N_r^*N_s=H_{rs}I_c$。同时，$(k,k)$ 矩阵元对应的等式可用竖直堆叠 $V$ 写为

$$
V^*(H\otimes I_a)V=\lambda I_b.
$$

因为 $\lambda>0$，右边的秩为 $b$；乘积的秩不超过中间因子的秩，所以

$$
b\le\operatorname{rank}(H\otimes I_a)
=a\operatorname{rank}H.
$$

$H$ 是 $3\times3$ 矩阵，秩至多为 $3$；若其秩至多为 $2$，就有 $b\le2a$，与假设矛盾。因此 $\operatorname{rank}H=3$。最后横向拼接

$$
C=[\,N_0\ N_1\ N_2\,]\in M_{d\times3c}(\mathbb C).
$$

其 Gram 矩阵为 $C^*C=H\otimes I_c$，于是

$$
3c=c\operatorname{rank}H
=\operatorname{rank}(C^*C)
\le\operatorname{rank}C\le d.
$$

辅助堆叠与拼接只用于证明，原来的三项收缩及行列分组始终不变。完整证明由 Lean 内核检查。
:::

::: {.example #ex-bridge-two-five-flat-spectrum title="秩达到 10，谱却不能平坦：$(2,5,2,5)$"}
取 $(a,b,c,d)=(2,5,2,5)$。正性、顺序条件与两条二次锥条件全部成立：

$$
\begin{aligned}
0<a=2&\le b=5,\qquad 0<c=2\le d=5,\\
a^2+b^2=c^2+d^2&=29\le30=3ab=3cd.
\end{aligned}
$$

即使再加上两条比值限制 $2b\le5a$、$2d\le5c$，这一点仍被允许，因为 $2b=5a=10$ 且 $2d=5c=10$。

此时 $ad=bc=10$、$3ac=12$，所以 [@thm-bridge-quantum-maxflow-mincut] 给出 $\operatorname{QMaxFlow}=\operatorname{QMinCut}=10$；由 [@lemma-bridge-flow-attained]，确有某组三对矩阵使 $F$ 的秩达到 $10$。然而 $b=5>2a=4$，列 Gram 恒等式 $F^*F=\lambda I_{10}$ 若对某个 $\lambda>0$ 成立，[@thm-bridge-scalar-gram-obstruction] 就要求 $d\ge3c=6$，与 $d=5$ 矛盾。因此，对任意这样的复矩阵三元组和任意正 $\lambda$，该恒等式都不成立。

这个反例恰好位于 $ad=bc$ 的接缝，两项标量 Gram 要求同时生效；列恒等式的不可能性已经排除了它们在同一证人下的联合成立。这里存在满秩桥流，却不存在十个奇异值全部相等且为正的桥流：在这一行列二分下，秩达到 $10$ 并不使归一化纠缠熵达到 $\ln10$。
:::

上述施密特权重与熵的讨论是归一化纯态的谱解释；定理本身只给出矩阵维数的必要条件。这一障碍针对既定分组下的三项复矩阵收缩与精确平坦谱；它不给出近似平坦的误差界，也不建立一般张量网络、物理实现或连续统全息对偶的结论。

那么，把比值收紧为 $b\le2a$、$d\le2c$，能否保证精确平坦谱？$b>2a$ 的旧障碍不再适用，但 [@thm-bridge-native-rectangular-bound] 仍可能排除它。下面保留已经给出的固定尺寸结果及其来源；它也是一般界在 $(3,5,3,5)$ 处的特例。

::: {.theorem #thm-bridge-three-five-flat-spectrum-obstruction title="$(3,5,3,5)$ 的正标量 Gram 障碍" lean="D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.positive_scalar_obstruction"}
对任意复矩阵三元组 $M_r\in M_{3\times5}(\mathbb C)$、$N_r\in M_{5\times3}(\mathbb C)$（$r=0,1,2$）以及任意实数 $\lambda>0$，令

$$
F=\sum_{r=0}^2M_r\otimes N_r:
\mathbb C^5\otimes\mathbb C^3\longrightarrow
\mathbb C^3\otimes\mathbb C^5.
$$

则 $F^*F\ne\lambda I_{15}$，其中 $I_{15}$ 的指标集为 $\operatorname{Fin}5\times\operatorname{Fin}3$。
:::

::: {.proof #pf-bridge-three-five-flat-spectrum-obstruction}
反设 $F^*F=\lambda I_{15}$。由于 $3a=9<10=2b$，[@thm-bridge-native-rectangular-bound] 要求 $2c=6\le d=5$，矛盾。一般证明在此正是把两个正交的三维像放入五维空间的不可能性；原固定尺寸 [common_plane](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.common_plane) 也给出这里所用的共同系数平面。本条保留其独立来源 [positive_scalar_obstruction](lean:D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.positive_scalar_obstruction)。完整证明由 Lean 内核检查。
:::

::: {.example #ex-bridge-three-five-flat-spectrum title="八个前提成立，秩达到 15，谱仍不能平坦：$(3,5,3,5)$"}
取 $(a,b,c,d)=(3,5,3,5)$。逐项核对原始全称主张 [`claim`](lean:D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.claim) 的八个前提：

$$
\begin{aligned}
0<a&:\quad0<3,& a\le b&:\quad3\le5,\\
0<c&:\quad0<3,& c\le d&:\quad3\le5,\\
a^2+b^2\le3ab&:\quad34\le45,\\
c^2+d^2\le3cd&:\quad34\le45,\\
b\le2a&:\quad5\le6,& d\le2c&:\quad5\le6.
\end{aligned}
$$

前六个正是 [@thm-bridge-quantum-maxflow-mincut] 的全部前提；该秩定理没有额外的平坦谱承诺。由于 $ad=bc=15$、$3ac=27$，它给出 $\operatorname{QMaxFlow}=\operatorname{QMinCut}=15$；再由 [@lemma-bridge-flow-attained]，存在某组矩阵使 $\operatorname{rank}F=15$。这里是在相同 `flow` 定义与行列指标下组合已有声明的结论。

然而 [@thm-bridge-three-five-flat-spectrum-obstruction] 排除了任意矩阵三元组在任意 $\lambda>0$ 下满足 $F^*F=\lambda I_{15}$，因此不可能有长度为 $15$ 的精确正平坦奇异值谱。旧的 [@thm-bridge-scalar-gram-obstruction] 不能用于这一点，因为 $b=5\le2a=6$。

原始全称主张要求同一组 $M,N$ 和同一个正 $\lambda$ 同时见证本节开头的两条条件 Gram 等式。此处 $ad=bc$ 使两条条件都生效，而列等式单独就与新定理矛盾。因此，即便补上 $b\le2a$、$d\le2c$，也不能把锥域中的秩可达性加强为精确平坦谱可达性。
:::

这一算例没有确定最小反例、最优比值阈值或完整的维数分类，也没有给出近似平坦谱的定量间隙。它仍只讨论既定行列二分下的有限维收缩，不建立物理实现或 RT 公式饱和。

### 19.4.1 矩形分块与同一算子的精确分解宽度 {#sec-bridge-rectangular-partition}

[@thm-bridge-native-scalar-gram-exists] 用坐标路由给出了三项张量和的充分构造，后面的障碍则限制了三项精确平坦谱。现在保留原始局部输入、输出空间，把项数从固定三项放宽为任意有限项：将整个坐标矩形分成两侧等势的分块，块内的双射就能同时给出一个酉算子及其最少乘积项数。

::: {.theorem #thm-bridge-rectangular-partition title="矩形分块的酉路由与精确分解宽度" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/RectangularBlockPartition.unitary_exact_width"}
设 $X,Y,T$ 为任意有限集。每个 $t\in T$ 给出子集 $I_t\subseteq X$、$J_t\subseteq Y$ 和双射 $\phi_t:J_t\to I_t$，且每个 $(x,y)\in X\times Y$ 恰属于一个矩形 $I_t\times J_t$。定义矩阵 $A_t\in M_{X\times Y}(\mathbb C)$：当 $j\in J_t$ 且 $i=\phi_t(j)$ 时 $(A_t)_{ij}=1$，其余为零。令

$$
\begin{aligned}
U&=\sum_{t\in T}A_t\otimes A_t^*,\\
U&:\mathbb C^Y\otimes\mathbb C^X\longrightarrow\mathbb C^X\otimes\mathbb C^Y,\\
T_+&=\{t\in T:J_t\ne\varnothing\}.
\end{aligned}
$$

这里 $A_t^*$ 表示 $A_t$ 的共轭转置。按原始局部指标定义重排矩阵

$$
\begin{aligned}
\mathcal R(U)_{(i,j),(k,l)}&=U_{(i,k),(j,l)},\\
i,l&\in X,\qquad j,k\in Y.
\end{aligned}
$$

则 $U^*U=I_{Y\times X}$、$UU^*=I_{X\times Y}$，且

$$
\begin{aligned}
\operatorname{rank}\mathcal R(U)&=|T_+|,\\
U&=\sum_{t\in T_+}A_t\otimes A_t^*.
\end{aligned}
$$

此外，存在行映射 $r:T_+\to X\times Y$、列映射 $s:T_+\to Y\times X$，使 $\mathcal R(U)_{r(t),s(u)}=\delta_{tu}$ 对所有 $t,u\in T_+$ 成立。对任何有限集 $R$ 及任意复矩阵 $M_r\in M_{X\times Y}(\mathbb C)$、$N_r\in M_{Y\times X}(\mathbb C)$，若同一个 $U=\sum_{r\in R}M_r\otimes N_r$，必有 $|T_+|\le|R|$。允许空指标集和空分块；任意分解中的因子无需线性无关或非零。
:::

::: {.proof #pf-bridge-rectangular-partition}
先展开张量和的坐标：

$$
U_{(i,k),(j,l)}=
\sum_{u\in T}(A_u)_{ij}\overline{(A_u)_{lk}}.
$$

给定输入标准基指标 $(j,l)\in Y\times X$，选取满足 $l\in I_t$、$j\in J_t$ 的唯一分块。若第 $u$ 项非零，两个因子的支撑分别要求 $j\in J_u$ 和 $l\in I_u$，唯一覆盖便迫使 $u=t$。剩下这一项恰在 $i=\phi_t(j)$、$k=\phi_t^{-1}(l)$ 时等于 $1$，其余为零。因此每个输入被送到

$$
(j,l)\longmapsto\bigl(\phi_t(j),\phi_t^{-1}(l)\bigr).
$$

记此路由为 $\rho$。输出 $(i,k)$ 仍属于同一矩形 $I_t\times J_t$，所以可由唯一覆盖恢复 $t$，再用

$$
\rho^{-1}(i,k)=\bigl(\phi_t^{-1}(i),\phi_t(k)\bigr)
$$

恢复输入；两种复合都是恒等映射。于是 $U_{w,p}=\delta_{w,\rho(p)}$。对 $p,q\in Y\times X$ 和 $w,z\in X\times Y$，逐项计算得到

$$
\begin{aligned}
(U^*U)_{p,q}
&=\sum_{w\in X\times Y}\overline{U_{w,p}}U_{w,q}\\
&=\delta_{\rho(p),\rho(q)}=\delta_{p,q},\\
(UU^*)_{w,z}
&=\sum_{p\in Y\times X}U_{w,p}\overline{U_{z,p}}\\
&=\delta_{\rho^{-1}(w),\rho^{-1}(z)}=\delta_{w,z}.
\end{aligned}
$$

这就给出原始输入、输出空间上的两侧 Gram 恒等式。

对每个非空块选 $j_t\in J_t$，令 $i_t=\phi_t(j_t)$。唯一覆盖保证

$$
(A_u)_{i_tj_t}=\delta_{ut}.
$$

于是重排矩阵的实际子矩阵满足

$$
\begin{aligned}
\mathcal R(U)_{(i_t,j_t),(j_s,i_s)}
&=\sum_u(A_u)_{i_tj_t}\overline{(A_u)_{i_sj_s}}\\
&=\delta_{ts}.
\end{aligned}
$$

所取的行映射为 $r(t)=(i_t,j_t)$，列映射为 $s(t)=(j_t,i_t)$。不同分块的代表格点互异，故两张映射均为单射。这给出所需的实际单位子矩阵，并推出 $\operatorname{rank}\mathcal R(U)\ge|T_+|$。空块对应零矩阵，删去它们不改变 $U$，所以已有 $|T_+|$ 项的实际分解。

最后，任何分解 $U=\sum_{r\in R}M_r\otimes N_r$ 都给出因式分解 $\mathcal R(U)=BC$，其中

$$
\begin{aligned}
B_{(i,j),r}&=(M_r)_{ij},\\
C_{r,(k,l)}&=(N_r)_{kl}.
\end{aligned}
$$

这里 $C$ 直接使用 $N_r$ 的矩阵元，不再取共轭。故 $\operatorname{rank}\mathcal R(U)\le\operatorname{rank}B\le|R|$。将这一界用于非空块分解得到相反的秩上界，再用于任意复因子分解得到最少项数下界。

若 $J_t$ 为空，双射也使 $I_t$ 为空，且 $A_t=0$。若 $X$ 或 $Y$ 为空，所有分块都为空，$T_+$ 为空，$U$ 是两个零维空间之间的唯一映射，两侧 Gram 等式都是空方阵上的恒等式。反过来，若 $T_+$ 为空（特别地，若 $T$ 为空），唯一覆盖迫使 $X\times Y$ 为空；此时重排秩为 $0$，单位子矩阵和达到宽度 $0$ 的分解均为空，下界为 $0\le|R|$。完整证明由 Lean 内核检查。
:::

这里的“精确宽度”针对已构造的同一个 $U$：它的分解恰需 $|T_+|$ 项。另一个具有相同局部维数的酉算子能否使用更少项，仍须另行研究。也没有通过复合一次物理交换操作，把这里的局部空间换成另一种算子 Schmidt 分割。

::: {.example #ex-bridge-rectangular-partition-5-6 title="一个恰需五项的三十维酉算子"}
取 $X=\{0,1,2,3,4\}$、$Y=\{0,1,2,3,4,5\}$，按下表划分五个矩形：

| $t$ | $I_t$ | $J_t$ | 大小 |
| :--- | :--- | :--- | :--- |
| $0$ | $\{0,1,2\}$ | $\{0,1,2\}$ | $3\times3$ |
| $1$ | $\{0,1,2\}$ | $\{3,4,5\}$ | $3\times3$ |
| $2$ | $\{3,4\}$ | $\{0,1\}$ | $2\times2$ |
| $3$ | $\{3,4\}$ | $\{2,3\}$ | $2\times2$ |
| $4$ | $\{3,4\}$ | $\{4,5\}$ | $2\times2$ |

例如，在各自的 $J_t$ 上具体取

$$
\begin{aligned}
\phi_0(j)&=j,&\phi_1(j)&=j-3,\\
\phi_2(j)&=j+3,&\phi_3(j)&=j+1,\\
\phi_4(j)&=j-1.
\end{aligned}
$$

这些都是从表中 $J_t$ 到 $I_t$ 的双射；表中每块内的任意双射也都适用。前三行被两个 $3\times3$ 块覆盖，后两行被三个 $2\times2$ 块覆盖，每个格点恰出现一次。五个块都非空，所以上述构造给出

$$
\begin{aligned}
U&:\mathbb C^6\otimes\mathbb C^5\longrightarrow
\mathbb C^5\otimes\mathbb C^6,\\
\operatorname{rank}\mathcal R(U)&=5.
\end{aligned}
$$

对上述具体双射，可依次选取代表格点

$$
(0,0),\quad(0,3),\quad(3,0),\quad(3,2),\quad(3,4).
$$

以它们为重排矩阵的行指标，以各对坐标颠倒后的格点为列指标，得到实际的 $5\times5$ 单位子矩阵。五个块同时给出五项分解，所以下界确实达到。

这个 $U$ 是三十维酉算子，并且它在所示原始局部分割下恰需五项。此例给出该维数下的五项实现；另一个同维酉算子能否用四项实现，在这里仍是开放问题。此例没有确定所有同维酉算子的全局最小项数。
:::

::: {.figure src="ch19-discrete-vs-rt"}
**本章证明的只到左边为止。** 左边是宽度三桥图，绿色标签是锥域内的最大流等于最小割（[@thm-bridge-quantum-maxflow-mincut]）；右边圆盘是连续体时空的一张切片，青色的弧是边界区域 $A$，紫色的弧 $\gamma_A$ 从 $A$ 两端垂直于边界伸入内部，是 RT 公式里的极小曲面（文献结果，未在本书形式化）。中间被划掉的箭头：从左到右的连续极限，本书没有证明。
:::

为了将这一精确的有限维离散定理与高能物理文献中的连续统全息纠缠熵公式清晰对照而不越界，我们在下述文献注记中给出 Ryu–Takayanagi 公式的标准界定。

::: {.remark #rem-ryu-takayanagi-literature title="Ryu–Takayanagi 全息纠缠熵公式与适用边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在静态、经典引力背景下的领先阶半经典反德西特/共形场论（AdS/CFT）全息对偶中（采用光速 $c = 1$ 的单位制），边界共形场论子区域 $A$ 的冯·诺依曼纠缠熵 $S(A) = -\Tr(\rho_A \ln\rho_A)$ 由著名的 **Ryu–Takayanagi（RT）公式**给出：

$$
S(A) = \frac{\operatorname{Area}(\gamma_A)}{4 G_N \hbar},
$$

其中 $G_N$ 为高维体时空（bulk）的牛顿引力常数，$\gamma_A$ 为体时空中以边界子区域边缘 $\partial A$ 为锚定边界（$\partial\gamma_A = \partial A$）、且与 $A$ 满足同调条件（homologous to $A$）的**极小面积余维二曲面**（minimal codimension-two surface）。体量子场纠缠修正（Faulkner–Lewkowycz–Maldacena 修正）以及非静态含时背景下的协变极值曲面推广（Hubeny–Rangamani–Takayanagi，简称 HRT 公式）均不在本章冻结陈述的范围之内。

在将本章的离散桥图定理与全息文献作启发式对比时，必须严守两条红线：

1. **绝不将纠缠熵写成双矢量外积 $S(A) = a \wedge b$**，也绝不宣称任意张量网络在任意参数下都普遍达到最小割饱和；
2. **严守 R3 离散分片边界**：本章从 [@thm-bridge-quantum-maxflow-mincut] 到全息几何的联系，仅限于 [@ex-log-capacity-facets] 所示的“离散对数容量多面体分片、最小割瓶颈与分片接缝粘接”的数学结构示意，并不证明张量网络的连续统极限或连续时空的全息对偶。

参见 S. Ryu & T. Takayanagi, *Phys. Rev. Lett.* **96**, 181602 (2006), DOI: `10.1103/PhysRevLett.96.181602`；B. Swingle, *Phys. Rev. D* **86**, 065007 (2012), DOI: `10.1103/PhysRevD.86.065007`；以及 J. D. Bekenstein, *Phys. Rev. D* **7**, 2333 (1973), DOI: `10.1103/PhysRevD.7.2333`。
:::

::: {.viz src="layered-network-cut" preset="grow" height="500"}
**区间翻倍，割只多约两条腿。** 琥珀色区间右端不动，从 1 格长到 16 格；品红的最小割一层层往上爬，只从 1 条长到 8 条，而直接剪断每条腿要 16 条。这张 32 格网络的每一段区间，割都不超过 $2\log_2 L + 1$（页面逐个算过）。把割断的腿数读作 RT 极小曲面的“面积”，是 Swingle 用 MERA 作的类比（文献结果，未在本书形式化）。
:::

区间不止一段时，候选割也不止一道：两段可以各割各的，也可以用一道大割把它们连同中间的空隙一起包住、再单独剪断空隙的腿；最小割取割断键数最少的那种割法。

::: {.viz src="layered-network-cut" preset="two" height="500"}
**两段区间：分开割，还是一起割。** 琥珀色的 A、B 之间空 2 格，A 从 1 格往左长。A 短时，品红的最小割是两道各自的割；A 长到 7 格起，一道包住 A、B 与空隙的大割，加上剪断空隙两条腿的小割，反而更省：A 长 10 格时一起割 10 条，分开割 13 条。最小割总是在候选割中取最少的那道，宽度三桥图上的同类上界见 [@prop-bridge-flow-cut-bound]。
:::

## 19.5 开边界矩阵乘积态：三格点边缘恢复与内禀一般性 {#sec-open-boundary-mps-recovery}

宽度三桥图刻画了固定拓扑截面上纠缠秩的容量上限；而在一维多体物理中，由键维数 $2$ 的局部核张量串联而成的**开边界矩阵乘积态**（open-boundary matrix product state, MPS）进一步回答了另一个关键的反问题：**仅凭一条局部连续三格点窗口的未归一化约化矩阵，何时足以在差一个全局单位相位 $z$（$\|z\| = 1$）的意义下唯一锁死整条链的全局纯态？**

按源码精确记号，设键矩阵空间为 `Bond := Matrix (Fin 2) (Fin 2) ℂ`，链长 $n$ 的比特词空间为 `Word n := Fin n → Fin 2`。给定局部核对 $a_0, a_1 \in \mathrm{Bond}$ 与左右开边界向量 $b_0, b_1 \in \mathbb{C}^2$，开边界 MPS 态矢与态集定义为

$$
\operatorname{mpsState}(n, a_0, a_1, b_0, b_1)(w) := b_0 \cdot_{\mathrm{v}} \Bigl(\Bigl(\prod_{j \in \mathrm{Fin}\,n} a_{w(j)}\Bigr) *_{\mathrm{v}} b_1\Bigr), \qquad \operatorname{openBoundaryMPS}(n) := \bigl\{\psi \;\big|\; \exists a_0, a_1, b_0, b_1,\; \psi = \operatorname{mpsState}(n, a_0, a_1, b_0, b_1)\bigr\},
$$

其中 $\cdot_{\mathrm{v}}$ 为不带复共轭的双线性点积 `dotProduct`。将链长拆为 $k + m$ 时，按前 $k$ 位与后 $m$ 位拼接展平得振幅列矩阵 $\operatorname{amplitudeColumns}(k, m, \psi)_{u, b} := \psi(\operatorname{append}(u, b))$，并定义**未归一化**前 $k$ 格点约化矩阵为

$$
\operatorname{rawPrefix}(k, m, \psi) := \operatorname{amplitudeColumns}(k, m, \psi)\,\bigl(\operatorname{amplitudeColumns}(k, m, \psi)\bigr)^* \in M_{\mathrm{Word}\,k}(\mathbb{C}).
$$

先做两个手算核对：第一，在 $3$ 格点链上取对角玩具核 $a_0 = I_2$、$a_1 = \operatorname{diag}(1, 2)$ 与边界 $b_0 = b_1 = (1, 1)^T$，在词 $w = 010$ 处的振幅为 $(1, 1)\cdot \operatorname{diag}(1, 2)(1, 1)^T = 1 + 2 = 3$；若将整条态矢乘以单位相位 $i$，因 $i\overline{i} = 1$，$\psi\psi^*$ 与任意 $\operatorname{rawPrefix}$ 保持不变（同时注意：这一可交换对角玩具例的转移算子不可单射，故落在下文非退化图表之外）。第二，取内部恢复所需的最小链长 $m = 2$（总链长 $3 + m = 5$，共 $2^5 = 32$ 个复振幅）：此时 $\operatorname{rawPrefix}(3, 2, \psi)$ 是 $8\times 8$ 厄米半正定矩阵；若在左端留 $p = 1$ 格、右端留 $q = 1$ 格（$p + q = 2$），消去左右边界单格后同样得到中间三格点 $\{1, 2, 3\}$ 上的 $8\times 8$ 未归一化内部边缘矩阵 $\operatorname{rawInterior}(1, 3, 1, \psi)$。

为排除奇异退化点，对任意核族 $A : \mathrm{Fin}\,2 \to \mathrm{Bond}$ 定义完全正转移映射 $\operatorname{transfer}(A)(X) := \sum_{i \in \mathrm{Fin}\,2} A_i X A_i^*$ 与对偶转移映射 $\operatorname{dualTransfer}(A)(X) := \sum_{i \in \mathrm{Fin}\,2} A_i^* X A_i$。在三格点切片 $t : \mathrm{Word}\,3 \to \mathbb{C}$ 上，源码由子式与伴随多项式构造有理重构核 $\operatorname{canonicalCore}(t) : \mathrm{Fin}\,2 \to \mathrm{Bond}$ 及判别多项式 `chartPoly : MvPolynomial (Word 3) ℂ`，并定义**可观测图表条件** `ObservableChart m ψ` 为：存在探测向量 $v : \mathrm{Word}\,3 \to \mathbb{C}$，记 $t := \operatorname{rawPrefix}(3, m, \psi) *_{\mathrm{v}} v$，使得 $\operatorname{eval}_t(\mathrm{chartPoly}) \neq 0$ 且线性映射 $\operatorname{transfer}(\operatorname{canonicalCore}(t))$ 在 $M_2(\mathbb{C})$ 上单射。

::: {.theorem #thm-mps-observable-phase-recovery title="可观测图表内的 MPS 相位恢复" lean="D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery"}
设 $m \in \mathbb{N}$，$\psi, \varphi : \mathrm{Word}\,(3 + m) \to \mathbb{C}$ 均属于开边界键维数 $2$ 矩阵乘积态集 $\operatorname{openBoundaryMPS}(3 + m)$，且 $\psi$ 满足可观测图表条件 $\operatorname{ObservableChart}(m, \psi)$。则两态的前三格点未归一化约化矩阵相等，当且仅当两态仅相差一个模长为 $1$ 的全局复相位因子：

$$
\operatorname{rawPrefix}(3, m, \varphi) = \operatorname{rawPrefix}(3, m, \psi) \iff \exists z \in \mathbb{C},\; \|z\| = 1 \;\land\; \varphi = z \cdot \psi.
$$

:::

::: proof
右推左直接由共轭双线性得出：若 $\varphi = z \cdot \psi$ 且 $\|z\| = 1$，则展平列矩阵满足 $\operatorname{amplitudeColumns}(3, m, \varphi) = z\,\operatorname{amplitudeColumns}(3, m, \psi)$，右乘共轭转置后因子 $z\overline{z} = \|z\|^2 = 1$ 抵消，故 $\operatorname{rawPrefix}(3, m, \varphi) = \operatorname{rawPrefix}(3, m, \psi)$。反之设 $\operatorname{rawPrefix}(3, m, \varphi) = \operatorname{rawPrefix}(3, m, \psi)$：由 $\operatorname{ObservableChart}(m, \psi)$ 取出探测向量 $v$，两态生成完全相同的三格点切片 $t = \operatorname{rawPrefix}(3, m, \psi) *_{\mathrm{v}} v$，满足分母多项式 $\operatorname{eval}_t(\mathrm{chartPoly}) \neq 0$（从而有理核重构不会落入除以零的退化分支）且 $\operatorname{transfer}(\operatorname{canonicalCore}(t))$ 单射。利用键维数 $2$ 转移算子单射下的规范相似唯一性与边界格拉姆矩阵满秩传递，可由共同的 $8\times 8$ 前缀矩阵 $\operatorname{rawPrefix}(3, m, \cdot)$ 将 $\varphi$ 与 $\psi$ 压缩到同一条一维复射线上；再比对两者相等的非零矩阵迹 $\Tr(\operatorname{rawPrefix}(3, m, \varphi)) = \Tr(\operatorname{rawPrefix}(3, m, \psi)) > 0$，即锁死比例系数模长 $\|z\| = 1$。完整证明由 Lean 内核检查。
:::

进一步问：满足这种局部可恢复性的非退化态在 $\operatorname{openBoundaryMPS}(3 + m)$ 中究竟是孤立特例，还是普遍常态？当右侧余链长度满足 $m \ge 2$（总链长 $3 + m \ge 5$，足以容纳至少一个左边界格点 $p \ge 1$ 与至少一个右边界格点 $q \ge 1$，$p + q = m$）时，对任意拆分 $(p + 3) + q = 3 + m$，将左 $p$ 格与右 $q$ 格合并求偏迹即得内部三格点未归一化约化矩阵 $\operatorname{rawInterior}(p, 3, q, \cdot) \in M_{\mathrm{Word}\,3}(\mathbb{C})$。记 $\mathrm{ObsIndex} := \mathrm{Word}\,3 \times \mathrm{Word}\,3$，源码在子空间拓扑下将目标命题 `intrinsicInteriorRecovery m` 定义为：存在非零实多元多项式 $R \in \mathrm{MvPolynomial}\,(\mathrm{ObsIndex} \oplus \mathrm{ObsIndex})\,\mathbb{R}$（作用在 $\operatorname{rawPrefix}(3, m, \psi)$ 各矩阵元的实部与虚部上），使其在子类型 $\operatorname{openBoundaryMPS}(3 + m)$ 内的非零主轨迹 $\operatorname{actualPrincipalLocus}(m, R)$ 同时满足**非空**、**开集**（`IsOpen`）、**稠密**（`Dense`）与**单位模相位不变**；并且对该主轨迹中的任意 $\psi$，提取其 $13$ 维实商坐标 $x$ 与典范代表参数 $\theta = \operatorname{positiveRepresentative}(x)$ 后，同时成立：（i）尺度因子 $\sigma(x) > 0$ 且存在 $\|z\| = 1$ 使 $\psi = z \cdot \operatorname{state}(3 + m, \theta)$；（ii）重构核满足两格点张成性 $\operatorname{TwoSiteSpanning}(\operatorname{core}(\theta))$（四个乘积 $A_i A_j$ 张满 $M_2(\mathbb{C})$）且 $\operatorname{transfer}(\operatorname{core}(\theta))$ 单射；（iii）对一切步数 $k \ge 1$，左边界经 $k$ 次 $\operatorname{dualTransfer}$ 迭代与右边界经 $k$ 次 $\operatorname{transfer}$ 迭代所得的 $2\times 2$ 边界格拉姆矩阵均严格正定（`PosDef`）；（iv）对任意满足 $p \ge 1, q \ge 1, p + q = m$（配指标对齐映射 $\mathrm{cast}_h : \mathrm{Word}\,((p + 3) + q) \to \mathrm{Word}\,(3 + m)$）的**内部**三格点窗口及任意 $\varphi \in \operatorname{openBoundaryMPS}(3 + m)$，均有

$$
\operatorname{rawInterior}(p, 3, q, \varphi \circ \mathrm{cast}_h) = \operatorname{rawInterior}(p, 3, q, \psi \circ \mathrm{cast}_h) \iff \exists z \in \mathbb{C},\; \|z\| = 1 \;\land\; \varphi = z \cdot \psi.
$$

::: {.theorem #thm-mps-generic-interior-recovery title="MPS 内部恢复的内禀一般性" lean="D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorGenericity.intrinsic_interior_recovery"}
对任意满足 $2 \le m$ 的自然数 $m \in \mathbb{N}$（即开边界链总长度 $3 + m \ge 5$），内禀一般性命题 $\operatorname{intrinsicInteriorRecovery}(m)$ 成立：存在关于前三格点约化矩阵实虚部坐标的非零实多项式 $R \neq 0$，其在子空间 $\operatorname{openBoundaryMPS}(3 + m)$ 中切出的主非零轨迹非空、开、稠密且对全局单位相位不变，且该轨迹上的每个态不仅具备典范正代表重构、两格点张成性、单射转移算子与正定迭代边界格拉姆矩阵，而且可由任意满足 $p \ge 1, q \ge 1, p + q = m$ 的内部连续三格点未归一化约化矩阵在 $\operatorname{openBoundaryMPS}(3 + m)$ 内唯一恢复至全局单位相位。
:::

::: proof
固定 $m \ge 2$。源码首先将两格点张成性、转移算子单射性、商坐标非退化判别式 $\sigma(x) > 0$ 以及开边界左右正定传递条件合并编码为关于 $\operatorname{rawPrefix}(3, m, \psi)$ 实部与虚部坐标的单个实代数主判别多项式 $R$，并通过显式构造一个满足两格点张成性与双端正定边界的五格点以上模型实例证明 $R$ 在 $\operatorname{openBoundaryMPS}(3 + m)$ 上非恒零，从而确立主轨迹非空与 $R \neq 0$。因参数化映射 $\theta \mapsto \operatorname{state}(3 + m, \theta)$ 是复多项式连续映射，实多项式非零集在诱导子空间拓扑下自动为开集；而在任意给定 MPS 参数附近沿非退化主参数方向做微扰时，单变量实解析多项式至多只有有限个孤立根，故主轨迹在 $\operatorname{openBoundaryMPS}(3 + m)$ 中稠密。最后在主轨迹任一点 $\psi$ 上，由（ii）与（iii）知左端 $p \ge 1$ 步对偶转移与右端 $q \ge 1$ 步正转移均给出严格正定（从而满秩可逆）的 $2\times 2$ 边界格拉姆矩阵，使内部三格点窗口 $\operatorname{rawInterior}(p, 3, q, \cdot)$ 完备保留局部核的商不变量，继而将任意具有相同内部三格点边缘的 $\varphi \in \operatorname{openBoundaryMPS}(3 + m)$ 唯一锁定为 $z \cdot \psi$（$\|z\| = 1$）。完整证明由 Lean 内核检查。
:::

在解读 [@thm-mps-observable-phase-recovery] 与 [@thm-mps-generic-interior-recovery] 时，必须严守三条精确边界：第一，$\operatorname{rawPrefix}$ 与 $\operatorname{rawInterior}$ 均为**未归一化**振幅外积（定理无需预设 $\|\psi\| = 1$，其迹直接携带范数平方 $\|\psi\|^2$）；第二，非退化假设 $\operatorname{ObservableChart}(m, \psi)$ 与主多项式判据 $R \neq 0$ 绝不可省去——诸如直积态、GHZ 态或上文手算的对角可交换 MPS 真实存在于 $\operatorname{openBoundaryMPS}(3 + m)$ 的低维退化补集中，并不能仅凭单个三格点边缘唯一重构；第三，这里的“一般性”严格指子空间拓扑下的开集与稠密性（`IsOpen` 与 `Dense`），既未引入概率测度声称“测度为 $1$”，也不等同于抗噪数值层析的多项式时间复杂度上界。

在宽度三桥图与一维开边界 MPS 链上，我们已经看到局部键维数如何一面通过最小割容量 $\min(ad, bc)$ 约束跨截面秩（[@thm-bridge-quantum-maxflow-mincut]），一面在非退化主轨迹上凭三格点边缘锁死全局纯态相位（[@thm-mps-observable-phase-recovery]、[@thm-mps-generic-interior-recovery]）。秩饱和并不保证纠缠熵饱和，[@ex-bridge-two-five-flat-spectrum] 已给出精确反例。若在后续模型中额外假设纠缠熵已达到割容量对数给出的上限，这仍是独立的情景假设，并不等同于热平衡。接下来转向量子电路的深度与门计数：它们受到哪些严格限制，与全息复杂性的猜想又有怎样的边界？进入第五部的收官之章——[第二十章](ch20-complexity-and-spacetime.md)。

::: {.viz src="layered-network-cut" height="560"}
层级网络与割的完整实验室：在底边拖动一段或两段区间，看品红的最小割怎样穿过网络、割断几条键。网络是示意模型，割的条数由页面算出；RT 公式与 MERA 的类比是文献结果，未在本书形式化，绿色只给 [@prop-bridge-flow-cut-bound]。
:::
