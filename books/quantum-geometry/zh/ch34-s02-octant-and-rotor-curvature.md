# 34.2 八分球面与旋子曲率：看不见哪块面积，你就站在哪根轴上 {#sec-ch34-octant-rotor-holonomy}

如果说球面点寻址还只是“静态向量投影”，那么当我们把目光投向图 34 第 II 栏的**八分球面正交回路模型（`MODEL`）**（一步路径与两步路径的旋子乘积、和乐差异与赤道测试态对比完整封装于下文归属算例 [@ex-ch34-spherical-addressing-and-octant-rotors] 第 2 部分，连续几何相位文献背景见 [@rem-ch34-virtual-z-berry-relativity-literature]）时，“一次正交 vs. 两次正交”的反演威力更会上升到**算子读出核与换位子盲区**的层面。

::: {.viz src="spherical-degeneracy-radar" preset="hops" height="500"}
**一步与两步：终点相同，随行的小旗差 90°。** 实线一步沿 $\mathbf{e}_1\wedge\mathbf{e}_3$ 直上 $+\mathbf{e}_3$，虚线两步先到 $\mathbf{e}_2$ 再上 $+\mathbf{e}_3$；两面小旗（$\mathbf{e}_2$ 的像）在 $\mathbf{e}_1\wedge\mathbf{e}_2$ 面里差出品红的 $90^\circ$，右下角紫色的差旋子 $\exp(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2)$ 整个落在这个面里（[@ex-ch34-spherical-addressing-and-octant-rotors]）。
:::

当两条不同演化路径在全状态空间中导出并不相同的末态，为什么某位场内观察者依然会把二者读成“同一个结果”？在观测拓扑与抽象环代数层面，答案由两条极其精炼的内核定理给出：**读出映射诱导的划分拓扑把一切同读数状态粘合成拓扑不可分等价类，而算符换位子的全部非零作用都通过半共轭平移差项 $(\mathrm{translated} - f)$ 右乘 $U$ 因式分解——故只要共轭作用不改变被测观测量（$\mathrm{translated} = f$），换位子便当场归零！**

::: {.viz src="spherical-degeneracy-radar" preset="equator" height="500"}
**末态不同，有的观察者仍读成同一个数。** 赤道测试态 $\alpha = 60^\circ$ 经一步旋子落到实线大圆、经两步落到虚线大圆，两圈只在紫色的 $\pm\mathbf{e}_3$ 相交。站在 $\mathbf{e}_2$ 的琥珀色观察者读出 $\frac{\sqrt{3}}{2}$ 与 $0$，品红一段就是这个差；青色虚线是 $O_1 + O_2 = 0$ 的盲圈，站在它上面的观察者把两个末态读成同一个数，两者落在读出的同一根纤维上（[@thm-ch34-readout-kernel-and-covariant-commutator]）。
:::

::: {.theorem #thm-ch34-readout-kernel-and-covariant-commutator title="读出划分拓扑不可分核刻画与协变换位子因式分解定理" lean="D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula"}
在 `trureturing` 冻结的观测划分拓扑模块与量子代数协变换位子模块中，以下两项定理同时成立：

1. **读出划分拓扑中的不可分性充要核判据**（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：设 $X, B$ 为任意类型，$\mathrm{readout} : \operatorname{Concept}\;X\;B$（即读出映射 $X \to B$），记 $\operatorname{partitionTopology}(\mathrm{readout}) = \operatorname{TopologicalSpace.induced}\;\mathrm{readout}\;\bot$ 为由离散拓扑 $\bot$ 拉回在 $X$ 上诱导的划分拓扑。则对任意两个状态 $x, y \in X$，它们在该划分拓扑下拓扑不可分，当且仅当它们落在读出核的同一根纤维上：

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \;\Longleftrightarrow\; \mathrm{readout}(x) = \mathrm{readout}(y);
   $$

2. **半共轭协变换位子的右乘因式分解公式**（[`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)）：设 $B$ 为任意环（`[Ring B]`），元素 $U, f, \mathrm{translated} \in B$ 满足半共轭关系 $\operatorname{SemiconjBy}\;U\;f\;\mathrm{translated}$（即 $U \cdot f = \mathrm{translated} \cdot U$）。则 $U$ 与 $f$ 的换位子精确分解为平移差与 $U$ 的右乘积：

   $$
   U \cdot f - f \cdot U \;=\; (\mathrm{translated} - f) \cdot U.
   $$
:::

::: proof
第 1 款赋予值域 $B$ 离散拓扑 $\bot$：正向若 $x, y$ 拓扑不可分，考察单点集原像纤维 $\mathrm{fiber} = \mathrm{readout}^{-1}(\{\mathrm{readout}(x)\})$，因单点集在离散拓扑中开，故 $\mathrm{fiber}$ 在诱导拓扑中为含 $x$ 的开集，由不可分定义 `Inseparable.mem_open_iff` 知 $y \in \mathrm{fiber}$，即 $\mathrm{readout}(x) = \mathrm{readout}(y)$；反向若 $\mathrm{readout}(x) = \mathrm{readout}(y)$，则对诱导拓扑中任意形如 $\mathrm{readout}^{-1}(\mathrm{coordinates})$ 的开集，$x$ 与 $y$ 的成员资格完全相同，故拓扑不可分。第 2 款将半共轭等式 $U \cdot f = \mathrm{translated} \cdot U$ 代入换位子左端，再应用环的右分配律 `sub_mul` 即得 $(\mathrm{translated} - f) \cdot U$。完整证明由 Lean 内核检查。
:::

[@thm-ch34-readout-kernel-and-covariant-commutator] 的两款结论一针见血地挑破了盲区的代数本质：在划分拓扑 $\operatorname{partitionTopology}(\mathrm{readout})$ 中，$x \neq y$ 而 $\mathrm{readout}(x) = \mathrm{readout}(y)$ 并不是拓扑失灵，而是精确标出了二者落在观察者读出映射的同一根纤维上；而在协变换位子公式 $U f - f U = (\mathrm{translated} - f) U$ 中，一旦被测可观测量 $f$ 恰好是旋转 $U$ 的不动轴算符（$\mathrm{translated} = f$），换位子便当场归零（$U f - f U = 0$）！下面我们在三维实内积空间 $\mathbb{R}^3$ 与实三维几何代数偶子代数 $\mathcal{Cl}_{3,0}^+$ 中，把球面两步寻址与八分球面旋子和乐的每一个正负号完整手算出来。

::: {.figure src="ch34-readout-fibers"}
**两个不同的末态落在同一根纤维上，就被读成同一个数。** 赤道测试态 $\alpha = 60^\circ$ 经一步与两步旋子得到 $\mathbf{s}_{\mathrm{once}}$（实心点）与 $\mathbf{s}_{\mathrm{twice}}$（空心圈）；两者的 $\mathbf{e}_3$ 分量同为 $\frac{1}{2}$，图中只画 $\mathbf{e}_1$–$\mathbf{e}_2$ 面。琥珀色的观察者 $\mathbf{O} = (-\mathbf{e}_1 + \mathbf{e}_2)/\sqrt{2}$ 满足 $O_1 + O_2 = 0$；青色的平行线是读数 $\mathbf{O}\cdot\mathbf{x}$ 相同的纤维，两个末态落在同一根上，读数都是 $\sin\alpha/\sqrt{2} \approx 0.61$，品红的差沿着纤维、落在读数的核里（[@thm-ch34-readout-kernel-and-covariant-commutator] 第 1 款）。
:::

::: {.example #ex-ch34-spherical-addressing-and-octant-rotors title="球面两步寻址反演与八分球面旋子和乐的完整解析推导（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下述第 1 部分为 $\mathbb{R}^3$ 标准正交基下的初等线性代数内积计算；第 2 部分采用实三维几何代数 $\mathcal{Cl}_{3,0}(\mathbb{R})$ 及其偶子代数 $\mathcal{Cl}_{3,0}^+$ 的标准双向量旋子指数与对偶记号（满足 $\mathbf{e}_i^2 = 1$ 及异轴反对易 $\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_j\mathbf{e}_i$，未作为独立连续旋子模块包含在本书锁定的形式化声明集中）：

1. **两步球面寻址的读数差与观察者极轴锁定**：
   固定标准正交基 $\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\} \subset \mathbb{R}^3$。对极角 $\theta \in (0, \pi)$（故 $\sin\theta \neq 0$）与方位角 $\phi \in [0, 2\pi)$，对比一次正交态与二次正交态：

   $$
   \mathbf{v}_1(\theta) = \cos\theta\,\mathbf{e}_3 + \sin\theta\,\mathbf{e}_1, \qquad
   \mathbf{v}_2(\theta, \phi) = \cos\theta\,\mathbf{e}_3 + \sin\theta\bigl(\cos\phi\,\mathbf{e}_1 + \sin\phi\,\mathbf{e}_2\bigr).
   $$

   设单位观察者探针向量为 $\mathbf{O} = O_1\mathbf{e}_1 + O_2\mathbf{e}_2 + O_3\mathbf{e}_3$（满足 $O_1^2 + O_2^2 + O_3^2 = 1$）。两次测量的内积读数差精确等于

   $$
   \Delta(\mathbf{O}) \;=\; \mathbf{O}\cdot\mathbf{v}_2(\theta, \phi) - \mathbf{O}\cdot\mathbf{v}_1(\theta) \;=\; \sin\theta\bigl[O_1(\cos\phi - 1) + O_2\sin\phi\bigr].
   $$

   由此立得三层反演结论：
   - **单对 $90^\circ$ 二次正交（$\phi = \pi/2$）**：因 $\sin\theta \neq 0$，此时 $\Delta(\mathbf{O}) = \sin\theta(-O_1 + O_2) = 0 \iff O_1 = O_2$，将 $\mathbf{O}$ 约束在穿过南北两极 $\pm\mathbf{e}_3$ 与赤道角平分方向 $\pm(\mathbf{e}_1 + \mathbf{e}_2)/\sqrt{2}$ 的**对称子午大圆**上；
   - **全方位角二次正交简并（$\forall \phi \in [0, 2\pi)$）**：要求 $\Delta(\mathbf{O}) \equiv 0$，依次代入 $\phi = \pi$ 得 $-2\sin\theta\,O_1 = 0 \implies O_1 = 0$，代入 $\phi = \pi/2$ 得 $\sin\theta\,O_2 = 0 \implies O_2 = 0$。结合单位模长 $O_1^2 + O_2^2 + O_3^2 = 1$，唯一解出 $O_3 = \pm 1$，即

     $$
     \Delta(\mathbf{O}) \equiv 0 \;\Longleftrightarrow\; O_1 = O_2 = 0 \;\Longleftrightarrow\; \mathbf{O} = \pm\mathbf{e}_3 = \pm\star(\mathbf{e}_1 \wedge \mathbf{e}_2),
     $$

     此时一次与二次正交读数恒等塌缩为 $\mathbf{O}\cdot\mathbf{v}_1(\theta) = \mathbf{O}\cdot\mathbf{v}_2(\theta, \phi) = \pm\cos\theta$；
   - **偏轴倾角破缺（$\beta_{\mathrm{obs}} \in (0, \pi)$）**：一旦观察者偏离极轴夹角为 $\beta_{\mathrm{obs}}$（横向分量模长 $\sqrt{O_1^2 + O_2^2} = \sin\beta_{\mathrm{obs}} > 0$，记横向方位角为 $\varphi_{\mathrm{obs}}$），读数差化为 $\Delta(\mathbf{O}) = \sin\theta\sin\beta_{\mathrm{obs}}\bigl[\cos(\phi - \varphi_{\mathrm{obs}}) - \cos\varphi_{\mathrm{obs}}\bigr]$，随 $\phi$ 扫描张开峰峰值正比于 $\lvert\sin\theta\rvert\sin\beta_{\mathrm{obs}}$ 的读数分裂。

2. **八分球面 $\mathcal{Cl}_{3,0}^+$ 旋子和乐与法向观察者盲区**：
   在 $\mathcal{Cl}_{3,0}^+$ 中，双明治作用 $\mathbf{s} \mapsto R\mathbf{s}\widetilde{R}$（其中逆序反演满足 $\widetilde{\mathbf{e}_i\mathbf{e}_j} = \mathbf{e}_j\mathbf{e}_i = -\mathbf{e}_i\mathbf{e}_j$）下，将 $\mathbf{e}_1$ 在 $\mathbf{e}_1 \wedge \mathbf{e}_3$ 面内直接转 $90^\circ$ 至 $\mathbf{e}_3$ 的一步旋子为

   $$
   R_{\mathrm{once}} \;=\; \exp\!\left(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_3\right) \;=\; \frac{1 - \mathbf{e}_1\mathbf{e}_3}{\sqrt{2}}.
   $$

   再计算先将 $\mathbf{e}_1 \to \mathbf{e}_2$（旋子 $\frac{1 - \mathbf{e}_1\mathbf{e}_2}{\sqrt{2}}$）、后将 $\mathbf{e}_2 \to \mathbf{e}_3$（旋子 $\frac{1 - \mathbf{e}_2\mathbf{e}_3}{\sqrt{2}}$）的两步复合旋子。利用 $(-\mathbf{e}_2\mathbf{e}_3)(-\mathbf{e}_1\mathbf{e}_2) = \mathbf{e}_2\mathbf{e}_3\mathbf{e}_1\mathbf{e}_2 = -\mathbf{e}_2\mathbf{e}_1\mathbf{e}_3\mathbf{e}_2 = +\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3\mathbf{e}_2 = -\mathbf{e}_1\mathbf{e}_2^2\mathbf{e}_3 = -\mathbf{e}_1\mathbf{e}_3 = +\mathbf{e}_3\mathbf{e}_1$，严格展开得

   $$
   \begin{aligned}
   R_{\mathrm{twice}}
   &= \left(\frac{1 - \mathbf{e}_2\mathbf{e}_3}{\sqrt{2}}\right)\left(\frac{1 - \mathbf{e}_1\mathbf{e}_2}{\sqrt{2}}\right)
   = \frac{1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_2\mathbf{e}_3 - \mathbf{e}_1\mathbf{e}_3}{2} \\
   &= \frac{1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_2\mathbf{e}_3 + \mathbf{e}_3\mathbf{e}_1}{2}
   = \exp\!\left(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2\right) R_{\mathrm{once}} \;\neq\; R_{\mathrm{once}}
   \end{aligned}
   $$

   （因 $(1 - \mathbf{e}_1\mathbf{e}_2)(1 - \mathbf{e}_1\mathbf{e}_3) = 1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_1\mathbf{e}_3 + \mathbf{e}_1\mathbf{e}_2\mathbf{e}_1\mathbf{e}_3 = 1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_2\mathbf{e}_3 - \mathbf{e}_1\mathbf{e}_3$）。将两枚旋子同时作用于赤道测试态 $\mathbf{s}(\alpha) = \cos\alpha\,\mathbf{e}_1 + \sin\alpha\,\mathbf{e}_2$：

   $$
   \mathbf{s}_{\mathrm{once}}(\alpha) = R_{\mathrm{once}}\mathbf{s}(\alpha)\widetilde{R}_{\mathrm{once}} = \cos\alpha\,\mathbf{e}_3 + \sin\alpha\,\mathbf{e}_2,
   \qquad
   \mathbf{s}_{\mathrm{twice}}(\alpha) = R_{\mathrm{twice}}\mathbf{s}(\alpha)\widetilde{R}_{\mathrm{twice}} = \cos\alpha\,\mathbf{e}_3 - \sin\alpha\,\mathbf{e}_1
   $$

   （当且仅当 $\sin\alpha \neq 0$ 时 $\mathbf{s}_{\mathrm{once}}(\alpha) \neq \mathbf{s}_{\mathrm{twice}}(\alpha)$；在 $\sin\alpha = 0$ 处两者同归于 $\pm\mathbf{e}_3$）。对单位观察者 $\mathbf{O}$，两者读数相等条件为 $\mathbf{O}\cdot\bigl(\mathbf{s}_{\mathrm{twice}}(\alpha) - \mathbf{s}_{\mathrm{once}}(\alpha)\bigr) = -\sin\alpha(O_1 + O_2) = 0$：对单个 $\sin\alpha \neq 0$ 迫使 $O_1 + O_2 = 0$；若对旋转后的初始赤道正交标架 $(\mathbf{e}_1(\gamma), \mathbf{e}_2(\gamma))$（$\gamma \in [0, 2\pi)$）均保持一次与两次正交结果相同，则必有 $O_1 = O_2 = 0$，即唯一锁定 $\mathbf{O} = \pm\mathbf{e}_3$！在 $\mathbf{O} = +\mathbf{e}_3$ 处，因 $\langle \mathbf{e}_3,\, \mathbf{e}_1 \wedge \mathbf{e}_2\rangle_0 = 0$ 且内缩并 $\langle \mathbf{e}_3(\mathbf{e}_1\wedge\mathbf{e}_2)\rangle_1 = 0$，两路读数同为 $\cos\alpha$；相反，站在赤道轴 $\mathbf{O} = \mathbf{e}_2$ 上的观察者则会读出 $\sin\alpha$ 与 $0$ 的鲜明反差！

3. **特例数值验算（$\theta = \alpha = \frac{\pi}{3},\; \phi = \frac{\pi}{2}$）**：
   代入 $\cos\frac{\pi}{3} = \frac{1}{2},\; \sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}$，立即得到两对显式三维单位向量：

   $$
   \mathbf{v}_1\!\left(\tfrac{\pi}{3}\right) = \left(\tfrac{\sqrt{3}}{2},\; 0,\; \tfrac{1}{2}\right), \qquad
   \mathbf{v}_2\!\left(\tfrac{\pi}{3}, \tfrac{\pi}{2}\right) = \left(0,\; \tfrac{\sqrt{3}}{2},\; \tfrac{1}{2}\right);
   $$

   $$
   \mathbf{s}_{\mathrm{once}}\!\left(\tfrac{\pi}{3}\right) = \left(0,\; \tfrac{\sqrt{3}}{2},\; \tfrac{1}{2}\right), \qquad
   \mathbf{s}_{\mathrm{twice}}\!\left(\tfrac{\pi}{3}\right) = \left(-\tfrac{\sqrt{3}}{2},\; 0,\; \tfrac{1}{2}\right).
   $$

   极点观察者 $\mathbf{O} = (0, 0, 1)$ 对四根向量的内积读数整齐划一地等于 $\frac{1}{2}$（模方配对权重均为 $\frac{1}{4}$）；而偏离极轴 $\beta_{\mathrm{obs}} = \frac{\pi}{2}$、站在 $\mathbf{O}' = (0, 1, 0)$ 处的赤道观察者对 $(\mathbf{v}_1, \mathbf{v}_2)$ 读出 $0$ 与 $\frac{\sqrt{3}}{2}$，对 $(\mathbf{s}_{\mathrm{once}}, \mathbf{s}_{\mathrm{twice}})$ 读出 $\frac{\sqrt{3}}{2}$ 与 $0$——可见一次正交旋子与两次正交旋子之间相差的八分球面和乐因子 $\exp\!\left(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2\right)$ 完全落在赤道双向量面 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 内，赤道观察者一眼就能分辨 $\sin\alpha$ 与 $0$ 的分裂，唯独法向极点观察者 $\pm\mathbf{e}_3$ 对整块 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 面积天然正交失明。
:::

::: {.viz src="spherical-degeneracy-radar" preset="tilted" height="500"}
**偏离极轴，读数随方位角张开。** 琥珀色的观察者离北极 $45^\circ$、站在 $\mathbf{e}_2\wedge\mathbf{e}_3$ 面里：两道青色影子分开，品红的读数差按 $\sin\theta\sin\beta_{\mathrm{obs}}\sin\phi$ 张开，峰峰值 $2\sin\theta\sin\beta_{\mathrm{obs}} \approx 1.22$；图中 $\phi = 90^\circ$，读数约为 $0.35$ 与 $0.97$。
:::

对照 [@ex-ch34-spherical-addressing-and-octant-rotors] 第 2 部分的旋子和乐核验，一句直抵几何本质的定位箴言便水落石出（`MODEL`）：**看不见哪块旋转平面的转动，你就恰恰站在那块平面的正交法向轴上。**

::: {.viz src="spherical-degeneracy-radar" preset="frames" height="500"}
**转动初始标架：极点始终在盲圈上。** 把赤道标架转过 $\gamma$ 再造两枚旋子（$\alpha = 60^\circ$），青色虚线的盲圈跟着标架绕竖轴转，淡青色是转过的盲圈；北极的琥珀色观察者在每一条上，两路读数始终都是 $\cos\alpha = \frac{1}{2}$。
:::

---
