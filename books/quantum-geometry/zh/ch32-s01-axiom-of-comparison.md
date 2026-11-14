# 32.1 零背景比较公理 $\mathcal{A}_0$：关系外延、奇偶正交与双向互易公平 {#sec-ch32-axiom-of-comparison}

> “那我们可以使用‘比较公理’，推理出数学、量子物理等的所有公理。”

回望[第一章](ch01-measurement.md)与[第二章](ch02-born-rule.md)拆掉外部坐标架“第 3 点 $C$”的第一刀，一个直抵公理化根部的追问迎面而来：两千五百年来，人类为集合论写了 ZFC 公理，为算术写了皮亚诺公理，为几何写了欧几里得与希尔伯特公设，又为量子力学写了狄拉克—冯·诺依曼五大公设、为狭义相对论写了光速不变公设——**倘若彻底清空外部参考原点、预设背景流形与全局绝对时钟，只保留对象与对象相遇时的唯一原初动作“两两比较”，这些分立在各门学科扉页上的公理体系，能否从同一条零背景元公理中同源生长出来？**

要使这一公理化纲领经得起最严苛的形式化审视，我们绝不能把高阶几何或动力学偷塞进定义暗格，而必须先把原初比较契约与后续逐层附加的实现结构拆解得清清楚楚。在本书的纲领性综合模型（`MODEL`）中，我们将这条零背景起点正式铸造为**零背景比较公理 $\mathcal{A}_0$**（因 $\mathcal{A}_0$ 刻画统摄跨学科推演的元公理接口而非单一辅助 `def`，定义框不绑定单一 `lean=` 标签；其有限维与拓扑核切片紧接着由下方 [@thm-ch32-comparison-extensionality-and-lagrange] 严格锁定）：

::: {.definition #def-ch32-axiom-of-comparison title="零背景比较公理 A₀（本书模型）"}
设 $X$ 为剔除一切外部参考点 $C$、预设流形与全局时钟的原始对象集，$\mathcal{A}$ 为特征非 $2$（即 $2$ 在 $\mathcal{A}$ 中可逆）的含幺结合 `*`-代数，二元比较映射为 $\mathrm{CMP} : X \times X \to \mathcal{A}$。**零背景比较公理 $\mathcal{A}_0$** 由以下三条不可再分的关系条款组成（`MODEL`）：

1. **条款 I：双向关系外延性（Relational Extensionality）**。不存在脱离比较而孤立自存的“私藏内禀态”。定义双侧比较不可分等价关系

   $$
   x \sim_{\mathrm{CMP}} y \;\Longleftrightarrow\; \forall z \in X,\quad \mathrm{CMP}(x, z) = \mathrm{CMP}(y, z) \;\land\; \mathrm{CMP}(z, x) = \mathrm{CMP}(z, y),
   $$

   则 $\mathrm{CMP}$ 典范下沉至比较外延商集 $\widetilde{X} := X / {\sim_{\mathrm{CMP}}}$，并在商集上满足严格关系外延同一律：$[x] = [y] \iff \forall [z] \in \widetilde{X},\; \mathrm{CMP}([x], [z]) = \mathrm{CMP}([y], [z]) \land \mathrm{CMP}([z], [x]) = \mathrm{CMP}([z], [y])$。

2. **条款 II：奇偶正交分解（Orthogonal Parity Decomposition）**。利用 $\frac{1}{2} \in \mathcal{A}$ 将主客体对换算子拆解为偶对称的**求同通道** $S(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) + \mathrm{CMP}(y, x)\bigr)$ 与奇反对称的**求异通道** $A(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) - \mathrm{CMP}(y, x)\bigr)$，且 `*`-对合精确反转比较方向 $\mathrm{CMP}(x, y)^* = \mathrm{CMP}(y, x)$：

   $$
   \mathrm{CMP}(x, y) \;=\; S(x, y) + A(x, y), \qquad S(y, x) = S(x, y) = S(x, y)^*, \qquad A(y, x) = -A(x, y) = -A(x, y)^*.
   $$

3. **条款 III：双向互易公平（Bidirectional Reciprocal Fairness）**。在单位比较载体 $X$ 上，对任意对象对 $(x, y) \in X \times X$，交换主客体次序后的往返比较乘积守恒代数单位元总预算：

   $$
   \mathrm{CMP}(x, y)\,\mathrm{CMP}(y, x) \;=\; \bigl(S(x, y) + A(x, y)\bigr)\bigl(S(x, y) - A(x, y)\bigr) \;=\; \mathbf{1}.
   $$

   特别地，当 $S(x, y)$ 与 $A(x, y)$ 对易（例如 $S(x, y) = \cos\theta\,\mathbf{1}$ 落在标量中心）且简单求异元满足负平方闭合 $A(x, y)^2 = -\|A(x, y)\|^2\mathbf{1}$ 时，往返乘积直接化为勾股公平圆 $S^2 - A^2 = \cos^2\theta + \sin^2\theta = 1$。
:::

为了确保在[第 32.3 节](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries)推导各学科推论时**零偷运隐含假设**，我们必须显式区分从抽象比较接口通往具体物理世界的**三重结构层级**（每层的独立性证明与极小反例详见[附录 E §E.1](appendix-e.md#sec-appe-layers)）：

- **第 0 层（抽象双槽比较接口，Layer 0）**：仅假定原始对象集 $X$ 与 $2$ 可逆的含幺结合 `*`-代数 $\mathcal{A}$ 上的条款 I–III。单凭第 0 层本身**绝不会**自动锁死欧氏几何或量子态空间——它依然合法容许幂零对偶数反例 $\mathrm{CMP}(x, y) = 1 \pm \varepsilon$（$\varepsilon^2 = 0$，此时 $A^2 = 0$，差异不消耗求同预算）、双曲分裂复数反例 $\cosh\eta + j\sinh\eta$（$j^2 = +1$，此时 $S^2 - \|A\|^2 = 1$）、负自配对分支 $S(x_0, x_0) = -\mathbf{1}$（满足 $(-1)^2 = +1$ 却违背正自同一度量），以及不满足传递链式的三点非平凡和乐。
- **第 1 层（正定克利福德 / 内积实现层，Layer 1）**：在第 0 层之上显式附加三条几何实现条件：（a）**正向自归一化** $S(x, x) = +\mathbf{1}$（由条款 II 的 $A(x, x) = -A(x, x) \implies A(x, x) = 0$ 锁定 $\mathrm{CMP}(x, x) = +\mathbf{1}$）；（b）**简单二阶双向量闭合** $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1} \le 0$——注意在四维及以上克利福德代数 $\mathcal{Cl}_{4,0}$ 中，非简单四秩双向量 $B = e_1\wedge e_2 + e_3\wedge e_4$ 的平方为 $B^2 = -2 + 2e_1e_2e_3e_4 \notin \mathbb{R}\mathbf{1}$ 带有四阶伪标量尾巴，唯有两向量外积生成的**简单（秩 2）双向量**才恒有纯标量负平方；（c）**多点格拉姆半正定性** $G = [S(x_i, x_j)]_{i,j=1}^n \succeq 0$（排除三点违背三角不等式的伪相似度表）。
- **第 2 层（局域纤维联络、复合层析与多观察者粗粒化捏合层，Layer 2）**：在单一全局克利福德纤维上，若单位向量 $a, b, c$ 满足 $b^2 = 1$，结合律强制三点拼接恒有 $a b b c = a c$，单纤维纯态比较环路无法凭空生出非平凡规范场强！要从两态比较迈向真实的规范曲率、多体纠缠与热力学时间箭头，必须显式升入第 2 层：引入跨基点的局域纤维联络传输、以局域层析极小性选定复张量积 $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$，以及在有限带宽多观察者读出下引入抹除块外相干性的基捏合粗粒化映射。

在 `trureturing` 的冻结形式化库中，支撑 $\mathcal{A}_0$ 条款 I（有限比较字外延残差核与观测划分不可分核）、条款 II–III 实空间奇偶平方折叠（拉格朗日—格拉姆恒等式）以及纯差异复结构负平方签名（$R^2 = -I_n$）的四块核心基石，已由以下定理一次性严密锁定：

::: {.theorem #thm-ch32-comparison-extensionality-and-lagrange title="比较外延性残差核、观测不可分核、拉格朗日—格拉姆恒等式与复结构平方律" lean="D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary"}
在 `trureturing` 冻结的量子代数残差、观测划分拓扑、量子界恒等式与幺正复结构模块中，以下四项定理同时成立：

1. **有限效应比较字的外延性与正交残差核充要判据**（[`future_word_orthogonal_residual`](lean:D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual)）：设 $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$ 为实或复标量域（`[RCLike 𝕜]`），$E$ 为有限维 $\mathbb{K}$-内积空间，$\mathrm{effect} : \operatorname{Fin}(m+1) \to E$ 为有限比较效应族，$X : \mathrm{State} \to E$ 为状态嵌入，记可见效应张成子空间为 $V_{\mathrm{vis}} = \operatorname{visibleEffectSubspace}(\mathrm{effect})$。则任意两状态 $\rho, \sigma$ 在全体效应上的比较期望字完全一致，当且仅当其嵌入差落在正交补 $V_{\mathrm{vis}}^\perp$ 中，亦当且仅当它们在 $V_{\mathrm{vis}}$ 上的正交投影相等：

   $$
   \operatorname{futureExpectationWord}(\mathrm{effect}, X, \rho) = \operatorname{futureExpectationWord}(\mathrm{effect}, X, \sigma) \;\Longleftrightarrow\; X(\rho) - X(\sigma) \in V_{\mathrm{vis}}^\perp \;\Longleftrightarrow\; P_{V_{\mathrm{vis}}}\bigl(X(\rho)\bigr) = P_{V_{\mathrm{vis}}}\bigl(X(\sigma)\bigr);
   $$

2. **读出划分拓扑不可分性与比较读数相等的核等价**（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：对任意状态类型 $X$、读出陪域 $B$ 与比较读出映射 $\mathrm{readout} : \operatorname{Concept}(X, B)$（即 $X \to B$），两点在拉回划分拓扑 $\operatorname{partitionTopology}(\mathrm{readout})$ 下拓扑不可区分，当且仅当它们的比较读数相等：

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \;\Longleftrightarrow\; \mathrm{readout}(x) = \mathrm{readout}(y);
   $$

3. **有限维拉格朗日—格拉姆奇偶平方折叠恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意指标类型 $\iota$ 上的有限集 $s : \operatorname{Finset}\;\iota$ 与实元组 $u, v : \iota \to \mathbb{R}$，模方乘积减去偶对称内积平方，精确等于全体二元奇反对称楔积面积分量的半平方和：

   $$
   \left(\sum_{i \in s} u_i^2\right)\!\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2;
   $$

4. **纯差异反自伴幺正复结构的平方负一锁定**（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)）：对任意有限可判定指标类型 $n$（`[Fintype n] [DecidableEq n]`）上的复矩阵 $R \in M_n(\mathbb{C})$，若 $R$ 同时满足奇反自伴性 $R^\dagger = -R$ 与互易幺正性 $R R^\dagger = I_n$，则必有

   $$
   R^2 \;=\; -I_n.
   $$
:::

::: proof
第 1 款利用有限维 $\mathbb{K}$-内积空间上的内积线性性，将逐分量期望相等 $\forall i \in \operatorname{Fin}(m+1),\; \langle\mathrm{effect}_i, X(\rho)\rangle = \langle\mathrm{effect}_i, X(\sigma)\rangle$ 等价改写为差向量 $X(\rho) - X(\sigma)$ 正交于生成元集 $\operatorname{range}(\mathrm{effect})$，从而充要地落在有限维闭子空间的正交补 $V_{\mathrm{vis}}^\perp$ 中，并与正交投影算子核 $\ker P_{V_{\mathrm{vis}}} = V_{\mathrm{vis}}^\perp$ 等价；特别地，当可见效应完备张成全空间 $V_{\mathrm{vis}} = E$ 时，$V_{\mathrm{vis}}^\perp = \{0\}$ 给出 $X(\rho) = X(\sigma)$（若嵌入 $X$ 单射即得 $\rho = \sigma$）。第 2 款将离散拓扑 $\perp$ 沿 $\mathrm{readout}$ 拉回，由单点闭开纤维直接证得不可分关系与函数核重合。第 3 款在有限集 $s \times s$ 上展开 $(u_i v_j - u_j v_i)^2 = u_i^2 v_j^2 - 2u_i v_i u_j v_j + u_j^2 v_i^2$，重排求和哑指标合并首尾两项为 $2(\sum_{i\in s} u_i^2)(\sum_{j\in s} v_j^2)$ 并因式分解交叉项为 $-2(\sum_{i\in s} u_i v_i)^2$，除以 $2$ 即得。第 4 款由矩阵结合律直接计算 $-(R^2) = R(-R) = R R^\dagger = I_n$，两端取负即得 $R^2 = -I_n$。完整证明由 Lean 内核检查。
:::

看清 [@def-ch32-axiom-of-comparison] 与 [@thm-ch32-comparison-extensionality-and-lagrange] 的咬合方式了吗？第 1–2 款告诉我们，只要把观测不到的冗余正交核 $V_{\mathrm{vis}}^\perp$ 或读出纤维商掉，关系外延性就不是一句哲学口号，而是精确的核商定理；第 3–4 款则告诉我们，一旦进入第 1 层实内积与反自伴幺正实现，偶对称求同平方与奇反对称楔积面积平方自动严丝合缝地拼成总几何容量，并内生出平方为 $-1$ 的四分之一转复结构。

更深一层看，在与 $\mathcal{A}_0$ 兼容的**第 1 层正定向三维欧氏 / 克利福德单位球面实现**（即附加 $S(x, x) = +\mathbf{1}$ 与选定三维定向体积元 $\mathrm{vol}_3$，见[附录 E §E.1](appendix-e.md#sec-appe-layers)）中，两态比较还自然呈现出**“二生三”**与微观弯曲球面三面角原胞 $\Delta\mathcal{T}_\epsilon$ 的自举构造（`MODEL`）：在零背景平权诠释下，“初始态” $(\mathbf{A}, \mathbf{B})$（设夹角为 $\epsilon \in (0, \pi)$，$\mathbf{A}\cdot\mathbf{B} = \cos\epsilon$）与由两者比较所生成的“投影态” $\mathbf{P}$ 之间不设高低等级；一旦要求 $\mathbf{P}$ 作为同一第 1 层单位载体上的平权成员服从正向单位自比较 $S(\mathbf{P}, \mathbf{P}) = \mathbf{1}$（$\|\mathbf{P}\|^2 = 1$）并与 $\mathbf{A}, \mathbf{B}$ 两两遵循比较契约，经典线性代数中蜷缩于二维平面 $\operatorname{span}(\mathbf{A}, \mathbf{B})$ 内、模长萎缩为 $|\cos\epsilon| < 1$ 且 $\det G = 0$ 的退化投影 $(\mathbf{A}\cdot\mathbf{B})\mathbf{A}$ 便不足以闭合预算。在选定三维定向所给出的霍奇正交法向分支 $\mathbf{e}_\perp = \star\hat{\mathbf{I}}_{AB}$（另一相反定向分支 $-\mathbf{e}_\perp$ 给出镜像等价原胞且格拉姆体积完全相同）上，反对称求异残差 $\sin\epsilon$ 沿 $\mathbf{e}_\perp$ 竖立起来，将单位投影态托举为 $\mathbf{P} = \cos\epsilon\,\mathbf{u}_{AB} + \sin\epsilon\,\mathbf{e}_\perp$（取平面内单位载轴 $\mathbf{u}_{AB} = \mathbf{A}$，满足 $\|\mathbf{P}\|^2 = \cos^2\epsilon + \sin^2\epsilon = 1$），从而令三态格拉姆行列式在两个法向分支上均严格翻正为 $\det G(\mathbf{A}, \mathbf{B}, \mathbf{P}) = \sin^4\epsilon > 0$（$\forall\epsilon \in (0, \pi)$）——这正是微观弯曲球面三面角原胞 $\Delta\mathcal{T}_\epsilon$ 的几何生成机制，并进一步通向“二元、比较、投影”三者互为同一无名三元体之切面投影的循环对称（详见[第 34 章 §34.5](ch34-orthogonality-degeneracy-and-observer-position.md#sec-ch34-triadic-bootstrap-and-beyond-names)）。下一节（[32.2](ch32-s02-oisc-comparison-engine.md#sec-ch32-oisc-comparison-engine)），我们将先把这条抽象比较公理落地为一台可触摸、可计步的**单指令集（OISC）几何比较机**，再于[第 32.3 节](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries)把数学与物理的核心公理逐条锻造成它的形式化推论。
