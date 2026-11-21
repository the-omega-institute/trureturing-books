# 19.1 纠缠层级与有限张量网络 {#sec-mera-hierarchy}

想象你手里有两块相互纠缠的多体量子区域：左边界输入端与右边界输出端。如果它们之间只靠一根一维标量线相连，那么无论两端各自的希尔伯特空间有多大，跨过这道接口的线性映射至多只有秩 $1$，相当于所有信息都被挤进了一根单模光纤。反之，如果接口处由多条内部张量腿（bond indices）并排桥接，跨越接口的算子秩（即施密特分解中非零奇异值的个数）就能够随内部腿维数的乘积而增长。

如[图 19](ch19-tensor-networks-and-holography.md) 第 I 栏所示，在物理文献中，研究者常借助多尺度纠缠重整化拟设（MERA）等层级张量网络来示意边界区域与深层“体空间（bulk）”截面之间的瓶颈关系。然而，在一般张量网络中，量子最大流（跨网络收缩所能达到的最大矩阵秩）甚至**不一定**等于量子最小割（切开网络所需截断的最小腿维数乘积）！（文献结果：S. X. Cui、M. H. Freedman、O. Sattath、R. Stong 与 G. Minton，*Quantum max-flow/min-cut*，J. Math. Phys. 57, 062206 (2016)，[arXiv:1508.04644](https://arxiv.org/abs/1508.04644)。）因此，要想得到经得起形式化内核检验的精确结论，我们必须先锚定一个结构完全显式、参数边界清清楚楚的有限维桥图模型。

::: {.viz src="layered-network-cut" preset="one" height="500"}
**一格的区间，割就是它自己那条腿。** 层级网络底边的第 16 格单独成为琥珀色区间，品红标出的最小割只割断它自己那一条腿。只有这一条键穿过割，跨过它的秩至多是这一条键的维数；割断的键越多，秩的上界才是它们维数的乘积。
:::

把区间从一格加长到连续四格，直接剪腿要割断 $4$ 条，最小割却可以钻进网络内部。

::: {.viz src="layered-network-cut" preset="four" height="500"}
**四格的区间，割从网络里面穿过。** 底边连续 4 格是琥珀色区间。直接剪断它们的 4 条腿不是最省的：品红的最小割钻进网络，只割断 3 条键，青色是割内侧的张量。页面数的是割断的腿，给出的只是秩的上界；正如上文所说，一般网络里最大流可以小于最小割，网络是示意模型。
:::

桥图模型、`QMaxFlow` 与 `QMinCut` 的定义以及下文锥域上“流等于割”的命题（原文猜想 3.15）出自 F. Gesmundo、V. Lysikov 与 V. Steffan，*Quantum max-flow in the bridge graph*，Transformation Groups 30 (2025) 1751–1784（DOI: [10.1007/s00031-024-09863-2](https://doi.org/10.1007/s00031-024-09863-2)，[arXiv:2212.09794](https://arxiv.org/abs/2212.09794)），原文记号 $(a, b, a', b')$ 对应这里的 $(a, b, c, d)$。在 Lean 的 `D5.S3.Quantum.TensorNetworks.BridgeGraph.QuantumMaxFlowBound` 模块中，这一模型由四个自然数维数参数 $a, b, c, d \in \mathbb{N}$ 与宽度为 $3$（指标 $r \in \operatorname{Fin} 3$）的桥接张量收缩给出：

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
