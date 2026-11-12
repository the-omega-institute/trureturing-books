# 正交简并盲区：一次正交与两次正交如何反演观察者位置

> *“一次正交与两次正交结果相同, 恰恰反映了观察者的位置。”*

在上一章（第三十三章）确立无外部背景的关系观察者本体论之后，一道尖锐的反演难题随即摆在所有场内观察者面前：既然宇宙早已在[第二章](ch02-born-rule.md)砍掉了高悬于万物之外的“第 3 点 $C$”，并在[第三十一章](ch31-quantum-fairness.md)以席位公平（[@thm-ch31-seat-pythagorean-monogamy-fairness]）抹平了一切中心刻度——在这颗没有任何外部油漆标记、处处模长皆为 $1$ 的各向同性单位球面上，**一位身处场内的有限观察者，究竟凭什么反推出“我自己正站在哪一根轴上”？**

日常经验诱导我们去“有变化的地方”寻找坐标：人们总是以为，只有当两次操作拉开了读数差距，仪表盘才能提供定位信息；一旦两次截然不同的几何操作给出完全相同的读数，实验员往往沮丧地称之为“信息丢失”或“测量简并”。然而，章首那句凝练的几何箴言却把整座认识论彻底翻转了过来：**真正出卖观察者自身站位的，恰恰不是他看见了什么差异，而是哪一次正交转向在他的读数里彻底隐身！**

本章将沿着从球面状态寻址、旋子曲率和乐到高维时空与切投切片的三级阶梯，把“正交简并反演观察者位置”铸造为一条严格可算的几何判据：

1. **球面两步寻址的极轴反演**：对比平直地板与单位球面 $S^2$ 上的“正交一次、正交两次”（[第九章](ch09-axes-and-state-addressing.md)），依托公共单位法向量存在性 [`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair)、双轴有限字生成定理 [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word) 与状态—效应迹拉回恒等式 [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity)，揭示二次正交隐身与观察者对偶不动轴之间的等价锁死；
2. **八分球面曲率与旋子盲区**：借助划分拓扑不可分核定理 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel) 与协变换位子因式分解 [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)，并在 [@ex-ch34-spherical-addressing-and-octant-rotors] 中完整手算三维球面寻址差值与八分球面旋子和乐，严格证明“看不见哪块面积的转动，你就站在哪块面积的法向轴上”；
3. **跨维度的普适观察者定位律（`MODEL`）**：结合零光锥空间刚性定理 [`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity) 与黄金切投子集包含定理 [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)，将同一简并反演机制贯通至单平面旋转、超导硬件零耗时相位帧更新与几何相位及相对论同时面文献背景（[@rem-ch34-virtual-z-berry-relativity-literature]），直至六维黄金超立方切片。

::: {.figure src="ch34-overview"}
**图 34。** 本章地图：第 I 栏，纬度 $\theta = 60^\circ$ 的品红纬圈上，实心点 $\mathbf{v}_1$ 与三个空心圈 $\mathbf{v}_2(\phi)$ 沿青色虚线落到紫色极轴上的同一点 $\cos\theta$，站在极点的琥珀色观察者 $\mathbf{O}$ 读不出方位角；第 II 栏，品红的赤道圆盘 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 里转过 $90^\circ$ 的那块面积，恰是站在其法轴上的琥珀色观察者看不见的面（这两栏是 [@ex-ch34-spherical-addressing-and-octant-rotors] 的手算，文献结果，未在本书形式化）；第 III 栏，方格点阵上琥珀色的黄金切片 $E_\parallel$ 与青色的接受窗，窗里的点沿品红的内部方向 $E_\perp$ 落到切片上（[@prop-ch34-null-cone-and-golden-cut-orientation] 的切投格局；把切片读成观察者的站位是模型诠释，`MODEL`）。
:::

---

## 球面寻址中的二次正交隐身：对称子午线与极点法向反演 {#sec-ch34-spherical-addressing-inversion}

::: {.example #ex-ch34-spherical-addressing-preview title="平直地板斜边与单位球面两步正交寻址读数反演导览（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下述欧氏平面勾股斜边对比与单位球面 $S^2 \subset \mathbb{R}^3$ 两步球坐标寻址的初等内积反演属经典欧氏几何结论（完整代数消元见下文 [@ex-ch34-spherical-addressing-and-octant-rotors] 第 1 部分），未作为独立连续球坐标引理包含在本书锁定的形式化声明集中：

1. **平直地板上的斜边递增**：站在无限延展的平直方格地板原点上，第一步沿正前方基准轴迈出长度 $1$（一次正交位移），离原点的径向距离等于 $1$；紧接着原地横拐 $90^\circ$，沿横向垂直轴再迈出长度 $1$（二次正交位移），直角三角形斜边定律立刻将径向距离推高到 $\sqrt{1^2 + 1^2} = \sqrt{2} \neq 1$——一次正交与两次正交的距离读数永不相等。
2. **单位球面 $S^2$ 上的两步正交寻址**：在[第九章](ch09-axes-and-state-addressing.md)建立的三元两两正交标架 $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3)$ 中，从基准极轴 $\mathbf{e}_3$ 出发抵达球面方向分两步转向：
   - **正交一次（极角倾转）**：在子午面 $\mathbf{e}_3 \wedge \mathbf{e}_1$ 内偏转极角 $\theta \in (0, \pi)$（$\sin\theta \neq 0$），送至 $\mathbf{v}_1(\theta) = \cos\theta\,\mathbf{e}_3 + \sin\theta\,\mathbf{e}_1$；
   - **正交两次（方位角旋拧）**：保持与 $\mathbf{e}_3$ 垂直的横向赤道平面 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 作旋转舞台，将横向分量再转过方位角 $\phi \in [0, 2\pi)$，送至 $\mathbf{v}_2(\theta, \phi) = \cos\theta\,\mathbf{e}_3 + \sin\theta(\cos\phi\,\mathbf{e}_1 + \sin\phi\,\mathbf{e}_2)$。
3. **读数相等对观察者机位的反向锁定**：当 $\phi \not\equiv 0 \pmod{2\pi}$ 时，$\mathbf{v}_1(\theta)$ 与 $\mathbf{v}_2(\theta, \phi)$ 指向不同方位；若内部观察者以单位探针轴 $\mathbf{O} \in S^2$ 比量两者而得相同内积 $\mathbf{O}\cdot\mathbf{v}_1(\theta) = \mathbf{O}\cdot\mathbf{v}_2(\theta, \phi)$——犹如在全黑大厅中俯看带倾角旋转陀螺顶端光斑画出等半径正圆的唯一轴向机位——则：
   - 单对 $90^\circ$ 横转（$\phi = \pi/2$）读数相同，将 $\mathbf{O}$ 约束在平分 $\mathbf{e}_1, \mathbf{e}_2$ 的**对称子午大圆**上；
   - 整圈方位角 $\phi \in [0, 2\pi)$ 读数全都相同，意味着横向旋转面 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 对该观察者彻底正交隐身，将探针轴唯一反演锁定在法向极点 $\mathbf{O} = \pm\mathbf{e}_3$ 上！
:::

::: {.viz src="spherical-degeneracy-radar" preset="meridian" height="500"}
**横拐 90°：读不出差别的观察者落在对称子午线上。** 实心点是一次正交的 $\mathbf{v}_1$，空心圈是两次正交的 $\mathbf{v}_2$，品红是第二次转动沿纬线扫过的横向面。琥珀色的观察者站在 $O_1 = O_2$ 的青色虚线大圆上，两道青色影子落在它轴上的同一点，读数差为零（[@ex-ch34-spherical-addressing-preview]）。
:::

对照 [@ex-ch34-spherical-addressing-preview] 的几何图景，传统测量理论之所以把简并视为“缺憾”，是因为它暗中站在一个全知外部坐标系里惋惜“丢掉了横向角”；而在无外部第 3 点的自包含几何里（`MODEL`），**横向自由度的简并隐身恰恰是宇宙颁给观察者的自定位罗盘**。

::: {.viz src="spherical-degeneracy-radar" preset="sweep" height="500"}
**方位角转一圈：每一条盲圈都经过的只有极轴。** 观察者站在北极，青色虚线的盲圈随 $\phi$ 绕紫色竖轴转动，淡青色的线是已经走过的盲圈；它们只在 $\pm\mathbf{e}_3$ 相交，北极上的两道影子始终重合在 $\cos\theta$。
:::

在形式化内核中，为什么三维空间里任意两根轴总能立起一根公共单位法向量、任意两根不共线轴的整圆旋转有限字足以走遍全部保定向正交变换，且作用在状态上的演化步总是等价于把测量效应向观察者一侧对偶拉回？下面这条合取定理将这三块基石严密锁定在同一座证明基座之上。

::: {.theorem #thm-ch34-perpendicular-axis-and-pullback title="三维公共单位法线、双轴旋转有限字生成与观察者迹拉回恒等式" lean="D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity"}
在 `trureturing` 冻结的三维双轴有限旋转几何模块与有限维量子动力学拉回模块中，记 $\mathrm{Space} = \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} 3)$ 为三维实内积空间，$\mathrm{Orthogonal} = (\mathrm{Space} \simeq_{\ell i}[\mathbb{R}] \mathrm{Space})$ 为其上的实线性等距同构群，$\operatorname{determinant}(R) = \det(R.\mathrm{toLinearMap})$ 为行列式，$\operatorname{axisCircle}(a) = \{R \in \mathrm{Orthogonal} \mid \operatorname{determinant}(R) = 1 \land R(a) = a\}$ 为固定轴 $a$ 的保定向整圆旋转子群，$\operatorname{IsAxisWord}(a, b, l)$ 表示列表 $l \in \operatorname{List}(\mathrm{Orthogonal})$ 中每个元素均属于 $\operatorname{axisCircle}(a) \cup \operatorname{axisCircle}(b)$。以下三项结论同时成立：

1. **任意两向量的公共单位法向量存在性**（[`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair)）：对任意两根向量 $a, b \in \mathrm{Space}$（无需非零、归一化或线性无关假设），恒存在单位法向量 $n \in \mathrm{Space}$，使得

   $$
   \lVert n\rVert = 1 \;\land\; \langle a, n\rangle_{\mathbb{R}} = 0 \;\land\; \langle b, n\rangle_{\mathbb{R}} = 0;
   $$

2. **双轴连续旋转整圆的精确有限字生成定理**（[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)）：设 $a, b \in \mathrm{Space}$ 满足严格不共线条件 $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$（无需对 $a, b$ 预先归一化）。则对任意满足 $\operatorname{determinant}(R) = 1$ 的保定向正交变换 $R \in \mathrm{Orthogonal}$，无需取拓扑闭包，恒存在精确有限字 $l \in \operatorname{List}(\mathrm{Orthogonal})$，使得

   $$
   \operatorname{IsAxisWord}(a, b, l) \;\land\; l.\mathrm{prod} = R;
   $$

3. **演化状态与对偶效应拉回的多步迹恒等式**（[`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity)）：设 $d$ 为有限可判等类型（`[Fintype d] [DecidableEq d]`），$\mathrm{channel} : \operatorname{QuantumChannel}\;d\;d$ 为量子信道，$\mathrm{heisenberg} : \operatorname{MatrixAlgebra}\;d \to_{\mathrm{CP}} \operatorname{MatrixAlgebra}\;d$ 为完全正映射，且满足单步迹对偶条件

   $$
   \forall\,\mathrm{state}, \mathrm{effect} \in \operatorname{MatrixAlgebra}\;d,\qquad \operatorname{Tr}\bigl(\mathrm{channel.toCompletelyPositiveMap}(\mathrm{state}) \cdot \mathrm{effect}\bigr) = \operatorname{Tr}\bigl(\mathrm{state} \cdot \mathrm{heisenberg}(\mathrm{effect})\bigr).
   $$

   则对任意演化步数 $t \in \mathbb{N}$、任意初始密度态 $\rho \in \operatorname{DensityState}\;d$ 及任意矩阵 $\mathrm{effect} \in \operatorname{MatrixAlgebra}\;d$，前向演化态 $\operatorname{evolvedState}(\mathrm{channel}, t, \rho)$ 的迹读数恒等于初始态对 $t$ 次拉回效应的迹读数：

   $$
   \operatorname{Tr}\bigl((\operatorname{evolvedState}(\mathrm{channel}, t, \rho)).1 \cdot \mathrm{effect}\bigr) \;=\; \operatorname{Tr}\Bigl(\rho.1 \cdot \bigl((\lambda A,\, \mathrm{heisenberg}(A))^{[t]}(\mathrm{effect})\bigr)\Bigr).
   $$
:::

::: proof
第 1 款令 $P = \operatorname{span}_{\mathbb{R}}\{a, b\} \subseteq \mathrm{Space}$，由生成元不超过两个得 $\operatorname{finrank}_{\mathbb{R}} P \le 2 < 3 = \operatorname{finrank}_{\mathbb{R}} \mathrm{Space}$，故正交补 $P^\perp \neq \bot$ 含非零向量 $v \neq 0$，归一化取 $n = \lVert v\rVert^{-1} v$ 即同时正交于 $a$ 与 $b$；第 2 款由严格不等式推出 $a \neq 0, b \neq 0$，先对单位化轴 $a' = \lVert a\rVert^{-1} a, b' = \lVert b\rVert^{-1} b$ 构造极冠附近纬圈交点与双反射保定向同纬传输，证得有限字轨道在连通单位球面上既开又闭从而覆盖整颗球面，再与稳定子群 $\operatorname{axisCircle}(a')$ 复合还原任意 $R$，最后利用非零标量缩放不变性 $\operatorname{axisCircle}(c\bullet a) = \operatorname{axisCircle}(a)$ 退回原始轴 $a, b$；第 3 款对步数 $t \in \mathbb{N}$ 关于任意矩阵 `effect` 作泛化数学归纳，$t = 0$ 为自反律，归纳步结合迭代展开 `Function.iterate_succ_apply'`、单步迹对偶假设 `hduality` 与右结合迭代恒等式 `Function.iterate_succ_apply` 直接合拢。完整证明由 Lean 内核检查。
:::

把 [@thm-ch34-perpendicular-axis-and-pullback] 的三款结论连起来看，观察者反演的底层几何豁然贯通：第 1 款保证只要二次正交转向扫过任意一对独立方向 $a, b$，三维空间必定留出一根与之同时垂直的单位法轴 $n$；第 2 款指出仅凭两根不共线轴的整圆旋转有限字即可无死角覆盖全部三维刚体旋转；而第 3 款则把“被测状态多转了一步”精确翻译为“观察者手里的测量效应 `effect` 被对偶映射往回拉了一步”——对自伴测量效应，若所有输入密度态的迹读数均不变，迹配对的分离性便使该效应成为对偶映射的不动点。要把这个不动效应读成一根轴，还须已知信道来自保定向旋转，且效应的非标量部分与非零探针方向 $\mathbf{O}$ 一一对应并随旋转协变；标量效应本身没有方向。在前述单位探针、非零倾转与全方位角扫描的设置下，这才落回熟悉的几何罗盘：**那族旋转固定探针轴，亦即属于 $\operatorname{axisCircle}(\mathbf{O})$！**

::: {.remark #rem-ch34-localization-figure title="球面两步正交寻址极轴反演与八分球面旋子盲区图解（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 结合正交法轴与对偶拉回定理（[@thm-ch34-perpendicular-axis-and-pullback]，`LEAN ✓`）的球面两步寻址极轴反演（[@ex-ch34-spherical-addressing-and-octant-rotors]）画在图 34 第 I 栏与本节的 `meridian`、`sweep` 两张实验卡里；八分球面旋子和乐与几何相位文献背景（[@ex-ch34-spherical-addressing-and-octant-rotors] 与 [@rem-ch34-virtual-z-berry-relativity-literature]）画在图 34 第 II 栏、下一节的 `hops`、`equator`、`tilted`、`frames` 四张实验卡，以及后文的八分球面回路卡里。
:::

---

## 八分球面与旋子曲率：看不见哪块面积，你就站在哪根轴上 {#sec-ch34-octant-rotor-holonomy}

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

[@thm-ch34-readout-kernel-and-covariant-commutator] 的两款结论一针见血地挑破了盲区的代数本质：在划分拓扑 $\operatorname{partitionTopology}(\mathrm{readout})$ 中，$x \neq y$ 而 $\mathrm{readout}(x) = \mathrm{readout}(y)$ 并不是拓扑失灵，而是精确标出了观察者读出纤维的切向核方向；而在协变换位子公式 $U f - f U = (\mathrm{translated} - f) U$ 中，一旦被测可观测量 $f$ 恰好是旋转 $U$ 的不动轴算符（$\mathrm{translated} = f$），换位子便当场归零（$U f - f U = 0$）！下面我们在三维实内积空间 $\mathbb{R}^3$ 与实三维几何代数偶子代数 $\mathcal{Cl}_{3,0}^+$ 中，把球面两步寻址与八分球面旋子和乐的每一个正负号完整手算出来。

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

## 从单平面、相对论同时面到六维黄金切片：普适观察者定位律 {#sec-ch34-universal-observer-localization}

一旦看破了“读数简并即法向站位”这道几何机关，我们便能跳出三维球面，把目光投向更广阔的时空度规与高维切投母格：在四维相对论时空中，观察者凭什么断定两件空间正交事件“发生在同一时刻”？在切投模型集几何（文献背景见[第三十二章](ch32-unified-field-and-meta-unification.md) [@rem-ch32-icosian-e8-literature]）中，物理观察者又凭什么锚定自身三维世界切片在六维超立方母格中的倾角？

答案依然是同一把钥匙！在不定度规空间 $\mathrm{Space}(d) = \mathbb{R} \times \mathbb{R}^d$ 中，一旦零光锥结构给定，下方的形式化命题证明：任何在零光锥上归零的二次型不仅在纯空间截面上只依赖各向同性范数平方 $\lVert w\rVert^2$（从而对空间截面内的正交转向完全简并），而且时间基矢 $(1, 0)$ 与任意空间位移 $(0, w)$ 之间的极化交叉项严格归零！与此同时，在代数整数切投模型中，典范自然数黄金展开集经物理嵌入后严格落入由共轭内部窗口筛选出的切投点集之内。

::: {.proposition #prop-ch34-null-cone-and-golden-cut-orientation title="零光锥空间各向同性极化正交锁与黄金模型集切投包含命题" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project"}
在 `trureturing` 冻结的光锥空间刚性证书模块与黄金切投模型集模块中，以下两项结论同时成立：

1. **零光锥约束下的空间范数简并与时空极化交叉项归零**（[`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity)）：设 $d \in \mathbb{N}$，记时空载体 $\mathrm{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$ 上的标准二次型为 $\operatorname{minkowski}_d(t, w) = t^2 - \lVert w\rVert^2$。若实二次型 $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\mathrm{Space}\;d)$ 在全部零光锥向量上取零（$\forall v,\; \operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$），则对任意空间向量 $w \in \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$，恒有

   $$
   S(0, w) = -S(1, 0)\cdot \lVert w\rVert^2 \;\land\; \operatorname{QuadraticMap.polar}\;S\;(1, 0)\;(0, w) = 0;
   $$

2. **典范黄金展开模型集向切投窗口点集的单向包含**（[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)）：设 $\operatorname{goldenModelSet} = \operatorname{range}(\operatorname{betaGolden}) \subseteq \operatorname{GoldenInt}$ 为典范自然数黄金展开值集，$\operatorname{embedding} : \operatorname{GoldenInt} \to \mathbb{R}$ 为实物理嵌入，$\operatorname{goldenLattice} \subseteq \mathbb{R} \times \mathbb{R}$ 为对偶嵌入像格，$\operatorname{goldenWindow} = [-\varphi^{-2}, \varphi^{-1}]$ 为闭共轭接受窗，$\operatorname{goldenCutAndProjectSet}$ 为内部投影落入 $\operatorname{goldenWindow}$ 的格点物理投影集。则成立子集包含关系：

   $$
   \operatorname{embedding} '' \operatorname{goldenModelSet} \;\subseteq\; \operatorname{goldenCutAndProjectSet}.
   $$
:::

::: proof
第 1 款对任意空间向量 $w$ 构造一对反向类光向量 $(\lVert w\rVert, w)$ 与 $(-\lVert w\rVert, w)$，验证 $\operatorname{minkowski}_d(\pm\lVert w\rVert, w) = \lVert w\rVert^2 - \lVert w\rVert^2 = 0$ 后代入假设得 $S(\pm\lVert w\rVert, w) = 0$；按二次型极化展开式 $S(t, w) = t^2 S(1, 0) + S(0, w) + t\,\operatorname{polar}_S((1, 0), (0, w))$ 将两式相加消去一次项即得 $S(0, w) = -S(1, 0)\lVert w\rVert^2$，两式相减并在 $w \neq 0$ 时消去非零因子 $\lVert w\rVert$（$w = 0$ 时直接由 `polar_zero_right`）证得极化交叉项为零。第 2 款任取 $y \in \operatorname{embedding} '' \operatorname{goldenModelSet}$，写 $y = \operatorname{embedding}(\operatorname{betaGolden}(v))$（$v \in \mathbb{N}$），取格点见证 $\operatorname{minkowskiEmbedding}(\operatorname{betaGolden}(v)) \in \operatorname{goldenLattice}$，其物理第一坐标恰为 $y$，而内部共轭第二坐标 $\operatorname{betaContraction}(v)$ 由窗口有界定理 `betaContraction_mem_window` 严格落入闭区间 $\operatorname{goldenWindow} = [-\varphi^{-2}, \varphi^{-1}]$。完整证明由 Lean 内核检查。
:::

请注意 [@prop-ch34-null-cone-and-golden-cut-orientation] 的两处形式化边界细节：第一，在 `null_cone_spatial_rigidity` 中，空间纯位移 $(0, w)$ 无论指向 $\mathbf{e}_x$ 还是横转 $90^\circ$ 指向等长的 $\mathbf{e}_y$，二次型取值都恒等于 $-S(1, 0)\lVert w\rVert^2$，且与给定第一坐标基矢 $(1, 0)$ 的极化交叉项恒为零（注意该代数恒等式对满足光锥归零条件的任意实二次型 $S$——包括全零退化二次型 $S = 0$——均成立，本身不含非退化假设 $S(1, 0) \neq 0$，也不直接断言物理四维速度轴的逆向唯一重构；附加非退化闵氏度规与未来指向归一化后的相对论同时面反演见下方 [@rem-ch34-virtual-z-berry-relativity-literature] 第 4 款）。第二，在 `golden_model_set_subset_cut_and_project` 中，我们严格保持单向子集包含 `⊆` 的陈述忠实性（因为无约束格 `goldenLattice` 中带负整数系数的元素虽可落入闭窗口，却不属于自然数展开值域 `goldenModelSet`）；其向六维准晶观察者框架的跨维模型延伸（`MODEL`）见下方 [@rem-ch34-localization-master-table]（并参[第三十二章](ch32-unified-field-and-meta-unification.md) [@rem-ch32-icosian-e8-literature]）。

这一“盲区反演站位”原理在超导微波量子硬件、自旋几何相位、阿贝尔规范纤维与相对论力学中的四大经典物理印证汇集于下框：

::: {.remark #rem-ch34-virtual-z-berry-relativity-literature title="超导虚拟 Z 门、八分球面 Berry 几何相位、U(1) 规范相位隐身与伽利略—爱因斯坦相对性原理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本章正交简并反演律在实验量子控制、几何相位与时空相对性理论中对应四项经典物理文献结论（未作为独立物理定理包含在本书锁定的 `trureturing@dev` 声明集中）：

1. **超导微波控制中的零耗时“虚拟 $Z$ 门”帧更新（D. C. McKay, C. J. Wood, S. Sheldon, J. M. Chow & J. M. Gambetta, *Phys. Rev. A* **96**, 022330, 2017；另参[第十一章](ch11-pulses-and-virtual-z.md)）**：在超导 transmon 处理器中，终端色散读出固定投影在能量本征轴 $\mathbf{O} = \pm\mathbf{e}_3$（$Z$ 基布居数）上。若在读出前仅追加一记绕 $Z$ 轴的方位角旋转 $R_z(\phi) = \exp(-i\frac{\phi}{2}\sigma_z)$，由于探针正立于 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 的法向极轴，$Z$ 基测量概率对此二次正交转向百分百失明！虚拟 $Z$ 门的实际机关则是控制帧记账：纯软件修改本地振荡器参考相位 $\varphi_{\mathrm{LO}} \mapsto \varphi_{\mathrm{LO}} - \phi$，并把这一相位偏置贯彻到所有相关后续控制，重定义其横轴 $X/Y$ 脉冲的方向。在理想控制模型中，这精确实现所需的 $Z$ 操作而无需额外模拟脉冲时长；文献报告的硬件误差与零相容，则是实验精度的陈述。极轴盲区解释的是最终残余 $Z$ 帧为何可在终端读出时舍去；途中相位通过后续横轴控制影响布居数，始终由同一本相位账本衔接。
2. **八分球面立体角 $\Omega = \pi/2$ 的 Berry—Pancharatnam 几何相位（S. Pancharatnam, *Proc. Indian Acad. Sci. A* **44**, 247–262, 1956；M. V. Berry, *Proc. R. Soc. Lond. A* **392**, 45–57, 1984）**：自旋 $1/2$ 态沿八分球面闭合大圆三角形 $\mathbf{e}_1 \to \mathbf{e}_2 \to \mathbf{e}_3 \to \mathbf{e}_1$（立体角 $\Omega = \pi/2$）绝热或测地循环一周，积累几何相位 $\gamma_B = -\frac{1}{2}\Omega = -\frac{\pi}{4}$（对应布洛赫切平面标架在 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 内转过 $\Omega = 90^\circ$，与 [@ex-ch34-spherical-addressing-and-octant-rotors] 中的旋子差因子 $\exp(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2)$ 完全吻合）。对单支态在极点 $\pm\mathbf{e}_3$ 做投影模方测量时该相位完全隐身，必须引入相干参考支做干涉叠加才能显影。
3. **$U(1)$ 规范纤维与全局射线相位的局部不可见性（H. Weyl, *Z. Phys.* **56**, 330–352, 1929；Y. Aharonov & D. Bohm, *Phys. Rev.* **115**, 485–491, 1959）**：量子态乘以全局相位 $\psi \mapsto e^{i\chi}\psi$ 在秩一投影算符 $\lvert\psi\rangle\langle\psi\rvert$ 下恒等抵消，表明局部物理观测者对共同的射线相位失明。跨环路磁通的和乐在两条相干路径干涉时显影为规范不变的相对相位；两支共同乘上的全局相位仍在投影中抵消。
4. **伽利略船舱相对性与爱因斯坦同时面反演（Galileo Galilei, *Dialogo*, 1632；A. Einstein, *Ann. Phys.* **17**, 891–921, 1905）**：伽利略指出密封船舱内的力学实验无法测出船自身的匀速直线运动速度；爱因斯坦在狭义相对论中进一步揭示，惯性观察者的四维速度 $\mathbf{u}_{\mathrm{obs}}$（自身静止时间轴）对外界空间方向满足闵可夫斯基正交 $\eta(\mathbf{u}_{\mathrm{obs}}, \Delta x) = 0 \iff \Delta t' = 0$。因此，只要看哪一族正交空间闪光事件在该观察者账本里“同时发生（时间差简并为零）”，那张三维同时超平面的唯一类时法向量就分毫不差地反演出观察者自身的四维速度 $\mathbf{u}_{\mathrm{obs}}$！
:::

::: {.viz src="berry-loop" preset="octant" height="500"}
**八分球面回路：箭头转过 $\pi/2$，内积的相位只记下一半。** 第十章的回路页：青色回路 $N \to +X \to +Y \to N$ 圈住品红面积 $\Omega = \pi/2$，沿回路搬运的琥珀色箭头回到起点时转过 $\pi/2$，右下角青色的指针停在 $\pi/4$；贝里相位约定 $\gamma_B = -\Omega/2$ 是文献结果，未在本书形式化（[@rem-ch34-virtual-z-berry-relativity-literature]）。
:::

最后，在本书的跨维度几何诠释框架（**`MODEL`（模型诠释）**）下，我们将从二维单平面、三维单位球面、四维相对论时空一直到六维黄金超立方母格的**普适观察者定位四阶总表**收束于下框：

::: {.remark #rem-ch34-localization-master-table title="普适观察者定位四阶总表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表汇总二维平面、三维旋子球面（[@ex-ch34-spherical-addressing-and-octant-rotors]）、四维相对论同时面（[@rem-ch34-virtual-z-berry-relativity-literature]）与六维切投母格（[@rem-ch32-icosian-e8-literature]）文献背景同本书 `MODEL` 及形式化内核定理（`LEAN ✓`）的对应关系：

| 几何舞台与维度（`MODEL`） | 一次正交操作 vs. 两次正交操作 | 发生读数简并的盲区核 | 由简并反演锁定的观察者位置 $\mathbf{O}$ |
| :--- | :--- | :--- | :--- |
| **1. 单旋转平面 $\hat{\mathbf{I}} = \mathbf{e}_1 \wedge \mathbf{e}_2$** | 从 $\mathbf{u}_0 = \mathbf{e}_1$ 经一次 $90^\circ$ 得 $\mathbf{u}_1 = \mathbf{e}_2$，经两次 $90^\circ$ 得反向 $\mathbf{u}_2 = -\mathbf{e}_1$ | 面外法向对一切面内旋转给出零内积；面内固定 $\mathbf{u}_0$ 时有符号内积满足 $O_2 = -O_1$，内积平方满足 $\lvert O_1\rvert = \lvert O_2\rvert$ | 面外法轴 $\mathbf{O} = \pm\mathbf{e}_3$（全向零读数）；面内反角平分线 $\pm(\mathbf{e}_1 - \mathbf{e}_2)/\sqrt{2}$（有符号等读数）及双角平分线 $\lvert O_1\rvert = \lvert O_2\rvert$（等模方 $1/2$） |
| **2. 三维球面两步寻址与八分旋子** | $\mathbf{v}_1(\theta)$ vs. $\mathbf{v}_2(\theta, \phi)$ 及一步旋子 $R_{\mathrm{once}}$ vs. 两步旋子 $R_{\mathrm{twice}}$（[@ex-ch34-spherical-addressing-and-octant-rotors]） | 单步 $\phi = \pi/2$ 下 $O_1 = O_2$；全角 $\forall\phi \in [0, 2\pi)$ 下整个横向双向量面 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 隐身（[@thm-ch34-readout-kernel-and-covariant-commutator]） | 单对锁定对称子午线 $O_1 = O_2$；全角简并唯一锁定极点法向轴 $\mathbf{O} = \pm\mathbf{e}_3 = \pm\star(\mathbf{e}_1 \wedge \mathbf{e}_2)$（[@thm-ch34-perpendicular-axis-and-pullback]） |
| **3. 四维相对论时空 $\mathbb{R}^{1,3}$** | 纯空间位移沿 $\mathbf{e}_x$ 与横转 $90^\circ$ 沿等范数 $\mathbf{e}_y$ 迈步（[@prop-ch34-null-cone-and-golden-cut-orientation] 与 [@rem-ch34-virtual-z-berry-relativity-literature]） | 等空间距离 $\lVert w\rVert$ 事件的时间偏置与时空极化交叉项 `polar S (1,0) (0,w)` 恒为零 | 在非退化闵氏度规（$S(1,0) \neq 0$）与未来指向单位归一化下，唯一反演出观察者静止四维速度轴 $\mathbf{u}_{\mathrm{obs}} = \mathbf{e}_0 = (1, \mathbf{0})$ 及其正交三维同时超平面 |
| **4. 六维黄金母格 $\mathbb{Z}^6 \subset \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$** | 幂等物理投影 $P_\parallel^2 = P_\parallel$ 与内部补空间 $E_\perp^3$ 内的正交转动（[@prop-ch34-null-cone-and-golden-cut-orientation] 推广之 `MODEL`） | 整个三维内部共轭子空间 $E_\perp^3 = \ker P_\parallel$ 在单次静态物理坐标投影下完全隐身 | 简并核的正交补 $(E_\perp^3)^\perp = E_\parallel^3$ 唯一锁定观察者三维物理世界在六维超立方中的黄金切片朝向 |
:::

::: {.figure src="ch34-three-localizations"}
**三个舞台上的同一条定位律：读数看不见的方向（品红）与观察者（琥珀）互相垂直。** 第 I 栏，单平面里 $\mathbf{u}_0 = \mathbf{e}_1$ 转一次到 $\mathbf{u}_1 = \mathbf{e}_2$（实心点）、转两次到 $\mathbf{u}_2 = -\mathbf{e}_1$（空心圈），琥珀色虚线是与品红弦 $\mathbf{u}_2 - \mathbf{u}_1$ 垂直的反角平分线 $O_2 = -O_1$，两点在它上面的影子落在同一个青色点；第 II 栏，时空图里运动观察者的世界线 $u$（琥珀）与它的同时线（品红）关于灰色光锥对称，二者闵氏正交（示意取 $v = 0.5c$；文献结果，未在本书形式化）；第 III 栏，黄金切片 $E_\parallel$ 与内部方向 $E_\perp$，青色窄带是接受窗 $[-\varphi^{-2}, \varphi^{-1}]$（[@prop-ch34-null-cone-and-golden-cut-orientation] 第 2 款；切片即站位是模型诠释，`MODEL`）。
:::

站在四阶总表前再读章首那句箴言，零背景宇宙里最幽微的一层认识论迷雾彻底散尽：有限观察者从来不需要祈求一颗悬浮在宇宙之外的“第 3 点 $C$”来替自己标定经纬。你的眼睛看不见自己的视网膜，你的尺子量不出沿自身视线法向旋拧的赤道圆环；然而，只要你在球面上做一次正交转向与两次正交转向，把所有令你读数归于沉寂的旋转平面收集起来——**凡简并处，皆是自身立锥之地。**

::: {.viz src="spherical-degeneracy-radar" height="640"}
**球面简并雷达。** 四个场景共用一颗球：寻址、旋子、测试态与标架。拖动琥珀色的观察者，看哪些转动在它的读数里隐身、哪些盲圈经过它的站位。
:::

不过，本章锁定的还只是观察者在**单一切片时刻**的静态站位轴 $\mathbf{O}$。倘若观察者不再原地驻足，而是顺着因果晶格一步步迁移记忆锚点、在有限窗口的开合之间跨轮次推进，那块原本对单次投影隐身的横向旋转面积，又将如何转化为驱动主观时间流逝与拓扑回响的动态引擎？这正是下一章（第三十五章）即将展开的篇章。
