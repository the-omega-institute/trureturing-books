# 第十九章 纠缠编织空间：张量网络、全息对偶与离散最小割定理 {#纠缠编织空间张量网络全息对偶与离散最小割定理}

> *“其实点 C并不是一个已知量,而是一个相融点的投影,因为实际上一条确定的量子态只能确定一条线,一组量子态才能对应一个面积.”*

在[第二章](ch02-born-rule.md)与[第三章](ch03-projectors-and-duality.md)中，我们反复强调过一条最质朴的维度铁律：在全局希尔伯特空间中，**单个确定的纯量子态只决定一根秩为 $1$ 的全局幂等投影线**（$\rho = \lvert\Psi\rangle\langle\Psi\rvert$，$\operatorname{rank}\rho = 1$）。然而，一旦我们将复合系统沿着二分接口 $\mathcal{H}_L \otimes \mathcal{H}_R$ 切开，把振幅张量展平（tensor flattening）为从右子空间到左子空间的线性算子（或对一侧求偏迹得到约化密度矩阵 $\rho_L = \Tr_R\lvert\Psi\rangle\langle\Psi\rvert$），情况就发生了本质跃升：单根直积基矢 $\lvert 0\rangle_L \otimes \lvert 0\rangle_R$ 在接口上的施密特秩（Schmidt rank）仍为 $1$；要想在二分截面上撑开大于 $1$ 的施密特秩、传递多路并行的可区分通道，就必须让**一组**正交的局部通道态在接口两侧相干叠加交织（例如双比特贝尔态 $\lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ 的全局纯态投影秩为 $1$，但它由两组正交局部态跨切口配对而成，其二分展平算子秩与约化密度矩阵秩均为 $\operatorname{rank}\rho_L = 2$）。

章首题记正是从这一线性代数事实出发，直指现代量子信息与全息几何交汇处的核心直觉：当我们将考察对象从单根量子态射线升级为由多组张量指标拼接而成的**张量网络**（tensor network）时，跨越网络接口所能传递的“最大纠缠秩（流）”是如何受制于网络内部最窄瓶颈处的“割容量（截面）”的？

遵循全书的三层认识论契约与离散多面体粘接原则（R3），本章严格区分三个层次：

1. **Lean 内核验证的有限维桥图与开边界 MPS 定理**：在 `BridgeGraph` 模块族中，针对宽度为 $3$（指标取 $\operatorname{Fin} 3$）的双节点克罗内克桥图收缩 $\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r$，我们逐条证明最大流可达引理（[@lemma-bridge-flow-attained]）、最大流不超过最小割上界命题（[@prop-bridge-flow-cut-bound]）、二次锥域内的最小割简化推论（[@cor-bridge-cone-mincut]），以及锥域内的离散量子最大流最小割定理（[@thm-bridge-quantum-maxflow-mincut]）；随后在键维数 $2$ 的一维齐次开边界矩阵乘积态（MPS）模块中，证明可观测图表内由三格点未归一化前缀边缘矩阵恢复全局纯态，至多相差一个全局单位相位（[@thm-mps-observable-phase-recovery]），以及链长 $3 + m \ge 5$ 时任意内部三格点未归一化边缘在非空开稠密主轨迹上具有同样恢复性质的内禀一般性（[@thm-mps-generic-interior-recovery]）；
2. **离散对数容量分片与接缝粘接图像（R3）**：通过对数腿容量坐标下的三张仿射超平面下包络（[@ex-log-capacity-facets]），展示有限维矩阵秩上界如何在离散格点上拼出多面体分片与瓶颈转移接缝；
3. **连续统全息对偶的文献边界**：将多尺度纠缠重整化拟设（MERA）与连续统 AdS/CFT 中的 Ryu–Takayanagi（RT）极小曲面公式严格置于文献注记（[@rem-ryu-takayanagi-literature]）内，绝不把特定宽度三桥图的有限维矩阵秩定理夸大为任意张量网络或连续时空全息对偶的普遍证明。

::: {.figure src="ch19-overview"}
**图 19。** 本章地图：第 I 栏，一棵普通的二叉树（不是后面实验卡里的层级网络）底边琥珀色的 4 条腿，只需割断品红标出的 2 条键就能切下来（示意模型）；第 II 栏，宽度三桥图 $(a, b, c, d) = (2, 3, 2, 3)$ 上面品红实线的 $ad$ 与下面品红虚线的 $bc$ 是两道最小割，$ad = bc = 6$，流与割相等（[@thm-bridge-quantum-maxflow-mincut]）；第 III 栏，对数容量里品红实线的 $ad$ 分片与品红虚线的 $bc$ 分片沿竖直虚线的接缝拼成一条折线。
:::

- [19.1 纠缠层级与有限张量网络](ch19-s01-mera-hierarchy.md)
- [19.2 宽度三桥图的秩与割容量](ch19-s02-bridge-flow-cut.md)
- [19.3 锥域与离散容量分片的拼接](ch19-s03-discrete-facet-stitching.md)
- [19.4 从离散桥图到 RT 文献边界](ch19-s04-rt-literature-bridge.md)
- [19.5 开边界矩阵乘积态：三格点边缘恢复与内禀一般性](ch19-s05-open-boundary-mps.md)
