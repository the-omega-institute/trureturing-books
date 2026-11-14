# 第三十四章 正交简并盲区：一次正交与两次正交如何反演观察者位置 {#正交简并盲区一次正交与两次正交如何反演观察者位置}

> *“一次正交与两次正交结果相同, 恰恰反映了观察者的位置。”*

在上一章（第三十三章）确立无外部背景的关系观察者本体论之后，一道尖锐的反演难题随即摆在所有场内观察者面前：既然宇宙早已在[第二章](ch02-born-rule.md)砍掉了高悬于万物之外的“第 3 点 $C$”，并在[第三十一章](ch31-quantum-fairness.md)以席位公平（[@thm-ch31-seat-pythagorean-monogamy-fairness]）抹平了一切中心刻度——在这颗没有任何外部油漆标记、处处模长皆为 $1$ 的各向同性单位球面上，**一位身处场内的有限观察者，究竟凭什么反推出“我自己正站在哪一根轴上”？**

日常经验诱导我们去“有变化的地方”寻找坐标：人们总是以为，只有当两次操作拉开了读数差距，仪表盘才能提供定位信息；一旦两次截然不同的几何操作给出完全相同的读数，实验员往往沮丧地称之为“信息丢失”或“测量简并”。然而，章首那句凝练的几何箴言却把整座认识论彻底翻转了过来：**真正出卖观察者自身站位的，恰恰不是他看见了什么差异，而是哪一次正交转向在他的读数里彻底隐身！**

本章将沿着从球面状态寻址、旋子曲率和乐、跨维定位总表、微观三态曲率原胞到三元自举与名相消融的五级阶梯，把“正交简并反演观察者位置”与“一次/两次正交的一体双影”铸造为严格可算的几何判据：

1. **球面两步寻址的极轴反演**：对比平直地板与单位球面 $S^2$ 上的“正交一次、正交两次”（[第九章](ch09-axes-and-state-addressing.md)），依托公共单位法向量存在性 [`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair)、双轴有限字生成定理 [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word) 与状态—效应迹拉回恒等式 [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity)，揭示二次正交隐身与观察者对偶不动轴之间的等价锁死；
2. **八分球面曲率与旋子盲区**：借助划分拓扑不可分核定理 [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel) 与协变换位子因式分解 [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)，并在 [@ex-ch34-spherical-addressing-and-octant-rotors] 中完整手算三维球面寻址差值与八分球面旋子和乐，严格证明“看不见哪块面积的转动，你就站在哪块面积的法向轴上”；
3. **跨维度的普适观察者定位律（`MODEL`）**：结合零光锥空间刚性定理 [`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity) 与黄金切投子集包含定理 [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)，将同一简并反演机制贯通至单平面旋转、超导硬件零耗时相位帧更新与几何相位及相对论同时面文献背景（[@rem-ch34-virtual-z-berry-relativity-literature]），直至六维黄金超立方切片；
4. **极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 与曲率量子原胞（§34.4，`MODEL` + `LEAN ✓`）**：将[第 32 章 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)的两态比较公理推进至最小三态闭环，证明“正交一次”与“正交两次”实为同一枚球面直角三面角原胞 $\Delta\mathcal{T}_\epsilon$ 的两种正交投影，并结合单纯二上链精确修补判据 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) 与运动双轴旋转传播定理 [`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance)（[@thm-ch34-trihedron-cochain-and-moving-axis]），揭示吉拉尔球面角超 $\Omega(\epsilon) \approx \frac{1}{2}\epsilon^2$ 与三维格拉姆体积砖 $\det G = \sin^4\epsilon$ 的微观起源；
5. **从“二生三”自举到名相消融的本体回响（§34.5，`MODEL` + `LEAN ✓`）**：揭示两态比较创建的归一投影如何在零背景下无需外部第 3 点而内禀自举出 $\Delta\mathcal{T}_\epsilon$ 的第三顶点，在 $120^\circ$ 三元循环对称下拆解“二元—比较—投影”的线性主谓宾幻象，并以语言读出核折叠判据（[@prop-ch34-triadic-bootstrap-and-lexical-pinching]）抵达撤梯之后“这么个感觉”的同构共振。

::: {.figure src="ch34-overview"}
**图 34。** 本章地图：第 I 栏，极角 $\theta = 60^\circ$ 的品红纬圈上，实心点 $\mathbf{v}_1$ 与三个空心圈 $\mathbf{v}_2(\phi)$ 沿青色虚线落到紫色极轴上的同一点 $\cos\theta$，站在极点的琥珀色观察者 $\mathbf{O}$ 读不出方位角；第 II 栏，品红的赤道圆盘 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 里转过 $90^\circ$ 的那块面积，恰是站在其法轴上的琥珀色观察者看不见的面（这两栏是 [@ex-ch34-spherical-addressing-and-octant-rotors] 的手算，文献结果，未在本书形式化）；第 III 栏，方格点阵上琥珀色的黄金切片 $E_\parallel$ 与青色的接受窗，窗里的点沿品红的内部方向 $E_\perp$ 落到切片上（[@prop-ch34-null-cone-and-golden-cut-orientation] 的切投格局；把切片读成观察者的站位是模型诠释，`MODEL`）。
:::

---

## 34.1 球面寻址中的二次正交隐身：对称子午线与极点法向反演 {#sec-ch34-spherical-addressing-inversion}

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

::: {.viz src="spherical-degeneracy-radar" preset="pullback" height="500"}
**转态一步，等于把观察者拉回一步。** $\theta = 60^\circ$、$\phi = 90^\circ$ 的一次 $\mathbf{v}_1$ 与两次 $\mathbf{v}_2$ 绕紫色的斜轴 $k$ 一起转过 $\psi$（灰色虚线弧），琥珀色的观察者 $\mathbf{O}$ 读它们；墨色虚线是态不动、观察者绕 $k$ 转回 $-\psi$ 得到的 $R^{-1}\mathbf{O}$，它读原来的两个点。两种读法逐位相同，$\psi = 120^\circ$ 时都是 $0.61$ 与 $-0.62$。这是 [@thm-ch34-perpendicular-axis-and-pullback] 第 3 款在单量子比特幺正信道、一步演化上的一个实例；把不动效应读成一根轴，还须上文所写的旋转与协变条件。
:::

::: {.remark #rem-ch34-localization-figure title="球面两步正交寻址极轴反演与八分球面旋子盲区图解（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 结合正交法轴与对偶拉回定理（[@thm-ch34-perpendicular-axis-and-pullback]，`LEAN ✓`）的球面两步寻址极轴反演（[@ex-ch34-spherical-addressing-and-octant-rotors]）画在图 34 第 I 栏与本节的 `meridian`、`sweep` 两张实验卡里；八分球面旋子和乐与几何相位文献背景（[@ex-ch34-spherical-addressing-and-octant-rotors] 与 [@rem-ch34-virtual-z-berry-relativity-literature]）画在图 34 第 II 栏、下一节的 `hops`、`equator`、`tilted`、`frames` 四张实验卡，以及后文的八分球面回路卡里。
:::

---

## 34.2 八分球面与旋子曲率：看不见哪块面积，你就站在哪根轴上 {#sec-ch34-octant-rotor-holonomy}

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

## 34.3 从单平面、相对论同时面到六维黄金切片：普适观察者定位律 {#sec-ch34-universal-observer-localization}

一旦看破了“读数简并即法向站位”这道几何机关，我们便能跳出三维球面，把目光投向更广阔的时空度规与高维切投母格：在四维相对论时空中，观察者凭什么断定两件空间正交事件“发生在同一时刻”？在切投模型集几何（文献背景见[第三十二章 §32.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) [@rem-ch32-icosian-e8-literature]）中，物理观察者又凭什么锚定自身三维世界切片在六维超立方母格中的倾角？

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

请注意 [@prop-ch34-null-cone-and-golden-cut-orientation] 的两处形式化边界细节：第一，在 `null_cone_spatial_rigidity` 中，空间纯位移 $(0, w)$ 无论指向 $\mathbf{e}_x$ 还是横转 $90^\circ$ 指向等长的 $\mathbf{e}_y$，二次型取值都恒等于 $-S(1, 0)\lVert w\rVert^2$，且与给定第一坐标基矢 $(1, 0)$ 的极化交叉项恒为零（注意该代数恒等式对满足光锥归零条件的任意实二次型 $S$——包括全零退化二次型 $S = 0$——均成立，本身不含非退化假设 $S(1, 0) \neq 0$，也不直接断言物理四维速度轴的逆向唯一重构；附加非退化闵氏度规与未来指向归一化后的相对论同时面反演见下方 [@rem-ch34-virtual-z-berry-relativity-literature] 第 4 款）。第二，在 `golden_model_set_subset_cut_and_project` 中，我们严格保持单向子集包含 `⊆` 的陈述忠实性（因为无约束格 `goldenLattice` 中带负整数系数的元素虽可落入闭窗口，却不属于自然数展开值域 `goldenModelSet`）；其向六维准晶观察者框架的跨维模型延伸（`MODEL`）见下方 [@rem-ch34-localization-master-table]（并参[第三十二章 §32.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) [@rem-ch32-icosian-e8-literature]）。

这一“盲区反演站位”原理在超导微波量子硬件、自旋几何相位、阿贝尔规范纤维与相对论力学中的四大经典物理印证汇集于下框：

::: {.remark #rem-ch34-virtual-z-berry-relativity-literature title="超导虚拟 Z 门、八分球面 Berry 几何相位、U(1) 规范相位隐身与伽利略—爱因斯坦相对性原理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本章正交简并反演律在实验量子控制、几何相位与时空相对性理论中对应四项经典物理文献结论（未作为独立物理定理包含在本书锁定的 `trureturing@dev` 声明集中）：

1. **超导微波控制中的零耗时“虚拟 $Z$ 门”帧更新（D. C. McKay, C. J. Wood, S. Sheldon, J. M. Chow & J. M. Gambetta, *Phys. Rev. A* **96**, 022330, 2017；另参[第十一章](ch11-pulses-and-virtual-z.md)）**：在超导 transmon 处理器中，终端色散读出固定投影在能量本征轴 $\mathbf{O} = \pm\mathbf{e}_3$（$Z$ 基布居数）上。若在读出前仅追加一记绕 $Z$ 轴的方位角旋转 $R_z(\phi) = \exp(-i\frac{\phi}{2}\sigma_z)$，由于探针正立于 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 的法向极轴，$Z$ 基测量概率对此二次正交转向百分百失明！虚拟 $Z$ 门的实际机关则是控制帧记账：纯软件修改本地振荡器参考相位 $\varphi_{\mathrm{LO}} \mapsto \varphi_{\mathrm{LO}} - \phi$，并把这一相位偏置贯彻到所有相关后续控制，重定义其横轴 $X/Y$ 脉冲的方向。在理想控制模型中，这精确实现所需的 $Z$ 操作而无需额外模拟脉冲时长；文献报告的硬件误差与零相容，则是实验精度的陈述。极轴盲区解释的是最终残余 $Z$ 帧为何可在终端读出时舍去；途中相位通过后续横轴控制影响布居数，始终由同一本相位账本衔接。
2. **八分球面立体角 $\Omega = \pi/2$ 的 Berry—Pancharatnam 几何相位（S. Pancharatnam, *Proc. Indian Acad. Sci. A* **44**, 247–262, 1956；M. V. Berry, *Proc. R. Soc. Lond. A* **392**, 45–57, 1984）**：自旋 $1/2$ 态沿八分球面闭合大圆三角形 $\mathbf{e}_3 \to \mathbf{e}_1 \to \mathbf{e}_2 \to \mathbf{e}_3$（立体角 $\Omega = \pi/2$）绝热或测地循环一周，积累几何相位 $\gamma_B = -\frac{1}{2}\Omega = -\frac{\pi}{4}$（对应布洛赫切平面标架在 $\mathbf{e}_1 \wedge \mathbf{e}_2$ 内转过 $\Omega = 90^\circ$，与 [@ex-ch34-spherical-addressing-and-octant-rotors] 中的旋子差因子 $\exp(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2)$ 完全吻合）。对单支态在极点 $\pm\mathbf{e}_3$ 做投影模方测量时该相位完全隐身，必须引入相干参考支做干涉叠加才能显影。
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

前三节回答了“一次正交与两次正交读数重合时，观察者站在哪里”；现在让我们再追问一层本体论根源——抛开特定观察者的盲区不谈，“正交一次”与“正交两次”本身在几何上究竟是什么关系？当步长从宏观 $90^\circ$ 缩向无穷小 $\epsilon \ll 1$ 时，那颗支撑全部曲率与开维体积的最小几何原子立刻显露真容。

---

## 34.4 极小三角弧面体 $\Delta\mathcal{T}_\epsilon$：“正交一次”与“正交两次”的一体双影及曲率量子 {#sec-ch34-infinitesimal-spherical-trihedron}

> “正交一次与正交两次其实是一个东西的两种投影，应该就是那个三角弧面体，一个极小的三角弧面体。”

回望[第 32 章 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)，零背景比较公理 $\mathcal{A}_0$ 对**两个**单位态给出了互易公平律 $\cos^2\epsilon + \sin^2\epsilon = 1$；而在本章第二节中，我们又在宏观极限 $\epsilon = \frac{\pi}{2}$ 处考察了整块八分球面。倘若把比较公理从两态推进到最小非共面**三态闭环** $(\mathbf{A}, \mathbf{B}, \mathbf{C})$，并让步长取任意小角 $\epsilon \in (0, \frac{\pi}{2}]$，会发生什么？

在单位球面 $S^2 \subset \mathbb{R}^3$ 上，选取直角转枢顶点 $\mathbf{B} = \mathbf{e}_2$，分别沿着两面互相垂直的坐标平面墙 $\mathbf{e}_2 \wedge \mathbf{e}_1$ 与 $\mathbf{e}_2 \wedge \mathbf{e}_3$ 各迈出弧长 $\epsilon$，得到三根单位状态射线：

$$
\mathbf{B} = \mathbf{e}_2, \qquad \mathbf{A}(\epsilon) = \sin\epsilon\,\mathbf{e}_1 + \cos\epsilon\,\mathbf{e}_2, \qquad \mathbf{C}(\epsilon) = \sin\epsilon\,\mathbf{e}_3 + \cos\epsilon\,\mathbf{e}_2.
$$

连同球心原点 $O$，这三根单位射线在三维空间中围出一枚严丝合缝的立体原胞——**球面直角三面角原胞（极小三角弧面体）$\Delta\mathcal{T}_\epsilon$**：它的侧面由三扇平直圆心扇形墙 $OBA$、$OBC$ 与 $OAC$ 组成，顶端则封着一块向外鼓起的**品红色球面三角形帽 $\triangle_{\mathrm{sph}} ABC$**（对比下方切过弦线的**青色平直欧氏削面 $\triangle_{\mathrm{flat}} ABC$**），三矢量有向体积元精确等于

$$
\mathbf{A}(\epsilon) \wedge \mathbf{B} \wedge \mathbf{C}(\epsilon) \;=\; \sin^2\epsilon\,(\mathbf{e}_1 \wedge \mathbf{e}_2 \wedge \mathbf{e}_3).
$$

::: {.viz src="spherical-trihedron-cell" preset="cell" height="520"}
**三面平墙配一块向外鼓起的品红球面帽：极小三角弧面体原胞。** 拖动琥珀色步长手柄调节 $\epsilon$：球心 $O$ 与转枢 $B = e_2$、两面垂直墙上的 $A(\epsilon)$、$C(\epsilon)$ 围成原胞 $\Delta\mathcal{T}_\epsilon$；品红球面帽 $\triangle_{\mathrm{sph}} ABC$ 鼓出在青色平直弦削面外侧（“一体双影”属本书 `MODEL`）。
:::

### 34.4.1 一体双影：沿棱看是“正交一次”，沿墙走是“正交两次” {#sec-ch34-4-1}

为什么我们在[第九章](ch09-axes-and-state-addressing.md)和本章前两节里总觉得“一步直达”与“两步拐弯”是两条竞争路线？因为观察者每次只取了一个低维投影切面，却没看见立在中间的那枚三维弧面体 $\Delta\mathcal{T}_\epsilon$（`MODEL`）：

1. **第一重投影（沿中脊棱 $OB = \mathbf{e}_2$ 正视，积掉中间态 $\mathbf{B}$）$\longrightarrow$ “正交一次”**：
   当观察者的视线顺着中脊棱 $\mathbf{B} = \mathbf{e}_2$ 看过去（即施加读出投影 $x \mapsto (x_1, x_3)$），原点 $O$ 与顶点 $\mathbf{B}$ 的读数同为 $(0, 0)$，按 [@thm-ch34-readout-kernel-and-covariant-commutator] 第 1 款 `partition_inseparable_iff_kernel` 缩成同一个不可分点，两面垂直侧墙 $OBA$ 与 $OBC$ 压扁成两条正交线段。此时中间态 $\mathbf{B}$ 彻底隐身，首尾两态之间只剩连接 $\mathbf{A}(\epsilon)$ 与 $\mathbf{C}(\epsilon)$ 的单条**青色大圆直弧 $\widehat{AC}$**，其内积直接读出球面勾股余弦律：

   $$
   \mathbf{A}(\epsilon)\cdot\mathbf{C}(\epsilon) \;=\; \cos c_\epsilon \;=\; \cos^2\epsilon.
   $$

::: {.viz src="spherical-trihedron-cell" preset="once-ridge" height="520"}
**沿棱 $OB$ 看过去：两面墙收成两条腿，“正交一次”只剩一条青色直弧。** 在读出映射 $x \mapsto (x_1, x_3)$ 下，$O$ 与 $B$ 落在同一根不可分核纤维上（绿色 `LEAN ✓` `partition_inseparable_iff_kernel`），弧面体投影成首尾直接相连的单步大圆弧 $\widehat{AC}$，满足 $\cos c_\epsilon = \cos^2\epsilon$。
:::

2. **第二重投影（向两面正交坐标墙 $\mathbf{e}_1\wedge\mathbf{e}_2$ 与 $\mathbf{e}_2\wedge\mathbf{e}_3$ 分解，滤掉斜穿弦面）$\longrightarrow$ “正交两次”**：
   若观察者只能沿正交实验基轴分步寻址（如双轴受控脉冲门，对应 `two_axis_finite_word` 长度为 $2$ 的旋转字），他就必须先贴着第一面墙走 $\widehat{AB}$，在转枢 $\mathbf{B}$ 处硬拐直角 $\beta \equiv 90^\circ$，再贴着第二面墙走 $\widehat{BC}$。在三维几何代数偶子代数 $\mathcal{Cl}_{3,0}^+$ 中，两面墙上的半角旋子分别为 $U_{12}(\epsilon) = \cos\frac{\epsilon}{2} - \sin\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_2$ 与 $U_{23}(\epsilon) = \cos\frac{\epsilon}{2} - \sin\frac{\epsilon}{2}\,\mathbf{e}_2\mathbf{e}_3$；利用克利福德乘法 $\mathbf{e}_2\mathbf{e}_3\mathbf{e}_1\mathbf{e}_2 = -\mathbf{e}_1\mathbf{e}_3$ 精确展开乘积，得到

   $$
   U_{23}(\epsilon)\,U_{12}(\epsilon) \;=\; \cos^2\frac{\epsilon}{2} \;-\; \sin\frac{\epsilon}{2}\cos\frac{\epsilon}{2}\bigl(\mathbf{e}_1\mathbf{e}_2 + \mathbf{e}_2\mathbf{e}_3\bigr) \;-\; \sin^2\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_3,
   $$

   其四个正交基片分量的平方和恒等于 $\cos^4\frac{\epsilon}{2} + 2\sin^2\frac{\epsilon}{2}\cos^2\frac{\epsilon}{2} + \sin^4\frac{\epsilon}{2} = \bigl(\cos^2\frac{\epsilon}{2} + \sin^2\frac{\epsilon}{2}\bigr)^2 \equiv 1$！而交换两步次序的换位子差 $U_{23}(\epsilon)U_{12}(\epsilon) - U_{12}(\epsilon)U_{23}(\epsilon) = -2\sin^2\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_3$（对应 [@thm-ch34-readout-kernel-and-covariant-commutator] 第 2 款 `covariant_commutator_formula`），则分毫不差地落在了第三张正交平面 $\mathbf{e}_1\mathbf{e}_3$ 上。

::: {.viz src="spherical-trihedron-cell" preset="twice-walls" height="520"}
**沿两面垂直墙走两步：在转枢 $B$ 拐过直角，旋子乘积自然长出横向面分量。** 先由 $U_{12}(\epsilon)$ 沿第一面墙走到 $B$，再由 $U_{23}(\epsilon)$ 拐 $90^\circ$ 走到 $C$；两枚紫色墙旋子相乘除保留两墙生成元外，精确多出横向 $-\sin^2(\epsilon/2)\,e_1e_3$ 项（绿色 `LEAN ✓` `two_axis_finite_word` 与 `covariant_commutator_formula`）。
:::

### 34.4.2 公平平方撑起品红球面帽：吉拉尔角超与万曲率之母 {#sec-ch34-4-2}

为什么顶盖不能是一块平平展展的欧氏三角形，而必须向外鼓成一块弯曲的**品红色球面帽 $\triangle_{\mathrm{sph}} ABC$**？答案正是[第 31 章](ch31-quantum-fairness.md)和[第 32 章](ch32-unified-field-and-meta-unification.md)确立的**单位模方公平律 $\|\mathbf{x}\|^2 = 1$**！

不妨直接对比青色平直欧氏弦切面 $\triangle_{\mathrm{flat}} ABC$ 与品红球面帽 $\triangle_{\mathrm{sph}} ABC$（球面三角与吉拉尔公式属经典文献结果，见下方 [@rem-ch34-regge-spinfoam-trihedron-literature]）：

- **若用平直刀片硬削弦三角形 $\triangle_{\mathrm{flat}} ABC$**：两条直角墙上的弦长同为 $2\sin\frac{\epsilon}{2}$，底弦长为 $\sqrt{2}\sin\epsilon$，平面三角形内角和死锁在 $\alpha_{\mathrm{flat}} + \beta_{\mathrm{flat}} + \gamma_{\mathrm{flat}} = \pi$。由余弦定理算出转枢顶角满足 $\cos\beta_{\mathrm{flat}} = \sin^2\frac{\epsilon}{2} > 0$，故 $\beta_{\mathrm{flat}} < 90^\circ$ 被挤成了锐角；更致命的是，平削面内部每一点的模长都跌破了 $1$（$\|\mathbf{x}\| < 1$），当场违背量子纯态的单位公平归一化！
- **守住处处 $\|\mathbf{x}\|^2 = 1$ 的公平球面帽 $\triangle_{\mathrm{sph}} ABC$**：把削面内部每一点都公平地径向撑回单位球皮上，转枢大圆夹角严格保住 $\beta = \frac{\pi}{2}$；对 $\epsilon \in (0, \frac{\pi}{2})$，两个底角由纳皮尔（Napier）球面直角正切律放大为

  $$
  \tan\alpha \;=\; \tan\gamma \;=\; \frac{\tan\epsilon}{\sin\epsilon} \;=\; \sec\epsilon > 1 \;\Longrightarrow\; \alpha = \gamma = \arctan(\sec\epsilon) = \frac{\pi}{4} + \frac{\epsilon^2}{4} + O(\epsilon^4) > \frac{\pi}{4},
  $$

  并在 $\epsilon \to \frac{\pi}{2}^-$ 时连续延拓至八分球面直角值 $\alpha(\frac{\pi}{2}) = \gamma(\frac{\pi}{2}) = \frac{\pi}{2}$（在全部 $(0, \frac{\pi}{2}]$ 上等价写作 $\alpha(\epsilon) = \operatorname{atan2}(1, \cos\epsilon)$）。于是三内角之和越过平直基准 $\pi$，按**吉拉尔球面角超定理（Girard's theorem）**在 $(0, \frac{\pi}{2}]$ 上处处良定义地吐出严格为正的立体角面积（曲率角超；在 $(0, \frac{\pi}{2})$ 上亦写作 $2\arctan(\sec\epsilon) - \frac{\pi}{2}$）：

  $$
  \Omega(\epsilon) \;=\; \alpha + \beta + \gamma - \pi \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + \frac{\epsilon^4}{12} + O(\epsilon^6) > 0 \quad \Bigl(= 2\arctan(\sec\epsilon)-\frac{\pi}{2},\;\epsilon \in (0,\tfrac{\pi}{2})\Bigr).
  $$

这里有一处必须精确辨析的几何与旋量边界，绝不可混为一谈：

1. **同调边界与精确测地环路和乐（对一切 $\epsilon \in (0, \frac{\pi}{2}]$ 严格成立，文献结果）**：在二维链同调意义上，品红球面帽的边界正是“正交两次路径”减去“正交一次路径”，即 $\partial(\triangle_{\mathrm{sph}} ABC) = (\widehat{AB} + \widehat{BC})_{\mathrm{twice}} - (\widehat{AC})_{\mathrm{once}}$。沿闭合大圆测地三角形回路 $\mathbf{A} \to \mathbf{B} \to \mathbf{C} \to \mathbf{A}$ 平行移动一周，根据高斯—博内定理，切向量精确转过实立体角 $+\Omega(\epsilon)$；而在 $\mathcal{Cl}_{3,0}^+$ 中把三段测地边旋子 $U_{CA}\,U_{23}\,U_{12}$ 首尾乘拢，旋量对**任意有限步长 $\epsilon \in (0, \frac{\pi}{2}]$** 都精确获得半立体角**潘查拉特纳姆—贝里（Pancharatnam–Berry）测地和乐**

   $$
   R_{\triangle}(\epsilon) \;=\; \exp\!\left(-\frac{1}{2}\Omega(\epsilon)\,\hat{\mathbf{I}}_{\mathbf{A}}\right),
   $$

   其中 $\hat{\mathbf{I}}_{\mathbf{A}}$ 为起点 $\mathbf{A}(\epsilon)$ 处切平面的单位双向量。
2. **坐标墙两步旋子横项与闭环半角超的二阶吻合及四阶分离**：与此同时，仅走两面固定坐标墙而不补第三段回程测地弧的未闭合旋子乘积 $U_{23}(\epsilon)U_{12}(\epsilon)$，其横向交叉项系数为 $-\sin^2\frac{\epsilon}{2} = -\frac{\epsilon^2}{4} + \frac{\epsilon^4}{48} + O(\epsilon^6)$；而三段测地边闭合后的旋量半角超为 $-\frac{1}{2}\Omega(\epsilon) = -\frac{\epsilon^2}{4} - \frac{\epsilon^4}{24} + O(\epsilon^6)$。两者在无穷小极限 $\epsilon \to 0^+$ 下的**二阶主项 $O(\epsilon^2)$ 精确吻合**，但在有限步长 $\epsilon$ 下于四阶项 $O(\epsilon^4)$ 发生分离——例如在宏观八分球面端点 $\epsilon = \frac{\pi}{2}$ 处，未闭合双墙乘积的横向分量为 $-\sin^2\frac{\pi}{4} = -\frac{1}{2}$，唯有左乘第三段闭合测地边旋子 $U_{CA}(\frac{\pi}{2})$ 构成完整回路 $U_{CA}(\frac{\pi}{2})\,U_{23}(\frac{\pi}{2})\,U_{12}(\frac{\pi}{2})$，才能精确恢复八分球面积 $\Omega(\frac{\pi}{2}) = \frac{\pi}{2}$ 对应的完整旋量贝里相位 $-\frac{1}{2}\Omega(\frac{\pi}{2}) = -\frac{\pi}{4} \approx -0.7854$（与第二节 [@ex-ch34-spherical-addressing-and-octant-rotors] 完全衔接）！

这枚夹在“两次正交”与“一次正交”之间的二维面缺陷二上链，正是现代物理学四大曲率与非对易结构的共同几何胚胎（文献背景与本书 `MODEL` 综合）：放到量子自旋态上，它是李代数换位子 $[\hat{J}_{12}, \hat{J}_{23}] = i\hbar\hat{J}_{31}$ 与贝里几何相位 $-\frac{1}{2}\Omega$；放到局域相位丛上，它是杨—米尔斯规范场强 $F_{\mu\nu} = [D_\mu, D_\nu]$；放到切丛平行移动上，它就是黎曼曲率张量 $R^\rho_{\ \sigma\mu\nu}$！

::: {.viz src="spherical-trihedron-cell" preset="cap-excess" height="520"}
**品红球面帽比青色平削面多出的角超 $\Omega(\epsilon)$，让绕行一圈的箭头转着回来。** 沿测地回路 $A \to B \to C \to A$ 拖动回路滑块 $t$：切向量平行移动一周精确偏转吉拉尔角超 $\Omega(\epsilon) = 2\arctan(\tan^2(\epsilon/2))$，旋量闭环相位精确记下一半 $-\Omega(\epsilon)/2$（高斯—博内与贝里和乐标 `ARGUED`）。
:::

### 34.4.3 为什么必须是“极小的”三角弧面体：开维体积砖、平直幻象与离散球面 {#sec-ch34-4-3}

章首箴言特意点出“**一个极小的三角弧面体**”，这“极小”（$\epsilon \ll 1$）三字背后藏着三重不可替代的几何深意：

1. **撑开 $D \to D + 1$ 新维度的第一块三维体积砖**：
   假如第二步不拐 $90^\circ$，而是留在同一张平面 $\mathbf{e}_1\wedge\mathbf{e}_2$ 内做共面两步（$\mathbf{A}_{\mathrm{cop}}\cdot\mathbf{C}_{\mathrm{cop}} = \cos 2\epsilon$），三态格拉姆矩阵行列式恒等于零 $\det G_{\mathrm{coplanar}} \equiv 0$，宇宙永远被拍扁在二维纸面上。唯有在转枢 $\mathbf{B}$ 处正交折入新墙（对应下方 [@thm-ch34-trihedron-cochain-and-moving-axis] 第 4 款 `finite_layer_projection_escape`），三态格拉姆行列式才当场跃升为严格正值：

   $$
   \det G(\Delta\mathcal{T}_\epsilon) \;=\; \det\begin{pmatrix} 1 & \cos\epsilon & \cos^2\epsilon \\ \cos\epsilon & 1 & \cos\epsilon \\ \cos^2\epsilon & \cos\epsilon & 1 \end{pmatrix} \;=\; (1 - \cos^2\epsilon)^2 \;=\; \sin^4\epsilon \;>\; 0 \quad \bigl(\forall\epsilon \in (0, \tfrac{\pi}{2}]\bigr).
   $$

   它的平方根 $\sqrt{\det G} = \sin^2\epsilon > 0$ 正是舞台上那块**堇紫色三维平行六面体格拉姆体积砖**（对应弦四面体体积 $\frac{1}{6}\sin^2\epsilon$，而带品红球面帽的球扇形体积为 $\frac{1}{3}\Omega(\epsilon)$）——哪怕 $\epsilon$ 小如微尘，只要 $\epsilon > 0$，三维立体空间就已经被这一拐真正撑开！
2. **宏观欧氏平直幻象与微观曲率量子的尺度分离**：
   把“正交一次”的真实球面斜边 $c_\epsilon = \arccos(\cos^2\epsilon)$ 按小步长 $\epsilon \ll 1$ 展开：

   $$
   c_\epsilon \;=\; \arccos(\cos^2\epsilon) \;=\; \sqrt{2}\,\epsilon\!\left(1 - \frac{\epsilon^2}{12} + O(\epsilon^4)\right) \;<\; \sqrt{2}\,\epsilon.
   $$

   秘密全写在这行泰勒级数里！在一阶线性尺度 $O(\epsilon)$ 上，球面斜边伪装得跟欧氏平直地板勾股定理 $\sqrt{2}\,\epsilon$ 一模一样，而品红球面帽的角超曲率 $\Omega(\epsilon) = \frac{1}{2}\epsilon^2 + O(\epsilon^4)$ 与斜边相对收缩率 $-\frac{1}{12}\epsilon^2$ 全都藏在二阶无穷小 $O(\epsilon^2)$ 里，宏观粗糙尺子根本察觉不到。反过来，在本书的有限带宽观察者模型（`MODEL`）中，任何真实观察者都存在非零最小分辨步长 $\epsilon_{\min} > 0$，于是宇宙底层不可能无限切碎成光滑零曲率平面，而必留下不可抹除的**最小曲率与几何相位量子** $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$！

::: {.viz src="spherical-trihedron-cell" preset="gram-brick" height="520"}
**共面两步体积恒为零，正交三面角撑出堇紫色的三维格拉姆体积砖。** 对比共面两步（$\det G = 0$，压扁在旧平面内）与正交三面角（$\det G = \sin^4\epsilon > 0$，堇紫色体积砖 $\sin^2\epsilon$）：小角下 $c_\epsilon$ 贴近 $\sqrt{2}\epsilon$ 制造平直幻象，灰色示意带标出最小步长 $\epsilon_{\min}$ 模型（绿色 `LEAN ✓` 锚定 `unit_perpendicular_pair`、`lagrange_gram_identity` 与 `finite_layer_projection_escape`）。
:::

3. **“球体永远是近似的”：离散弧面体拼砖与八分球面宏观汇合**：
   在广义相对论与量子引力文献中，雷吉离散引力（Regge 1961）与自旋泡沫（Spin-Foam）模型正是用平坦单纯形骨架配铰链角亏来逼近弯曲时空（文献背景见下方 [@rem-ch34-regge-spinfoam-trihedron-literature]）；而在本书的跨章模型（`MODEL`）中，这恰与[第 21 章](ch21-diagonalization-and-escape.md)“球体永远是有限多面体近似”及[第 39 章 §39.5](ch39-observer-is-ontological-universe.md#sec-ch39-pisot-clifford-rauzy)三阶 Tribonacci 劳齐（Rauzy）分形拼砖的螺旋扭率遥相呼应——整颗宏观球面是由无数枚极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 逐块缝合而成的统计包络。而当你把琥珀色步长滑块一路推大到极限端点 $\epsilon = \frac{\pi}{2}$ 时，这枚微观原胞便无缝长大成第二节那整块宏观八分球面（$c = \frac{\pi}{2},\; \Omega = \frac{\pi}{2},\; \det G = 1$）！

::: {.viz src="spherical-trihedron-cell" preset="octant-limit" height="520"}
**步长推满 $90^\circ$：微观原胞直接长成第二节的整块八分球面。** 当 $\epsilon \to 90^\circ$ 时，三根边两两正交（$A = e_1, B = e_2, C = e_3$），品红球面帽铺满整个第一卦限（$\Omega = \pi/2$），堇紫色格拉姆体积砖撑满单位正方体 $\det G = 1$，微观与宏观在此完全合拢。
:::

### 34.4.4 单纯二上链精确修补与运动双轴不变性的形式化定理及算例 {#sec-ch34-4-4}

在代数拓扑与三维旋转几何底层，“多顶点二上链的两步与一步之差何时能被一维边势全局消去、何时受四面体三上边缘缺陷阻断”以及“局部两根不共线轴上的旋转对称如何撑起全局三维 $\mathrm{SO}(3)$ 对称”，已由 `trureturing` 的四条冻结内核定理严格锁定：

::: {.theorem #thm-ch34-trihedron-cochain-and-moving-axis title="单纯二上链精确修补判据、运动双轴旋转传播、拉格朗日—格拉姆恒等式与正交残差逃逸" lean="D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
在 `trureturing` 冻结的单纯二上链修补、双轴有限旋转、量子界恒等式与正交残差逃逸模块中，以下四项定理同时成立：

1. **三顶点二上链缺陷的四面体上边缘精确性充要判据**（[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）：设 $V$ 为有限非空顶点集，$A$ 为加法交换群，$F : V \to V \to V \to A$ 为三元面量测（二上链）。则：（a）以各参考点 $r \in V$ 切片统计的面误差总和恒等于四面体缺陷总数 $\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$，故必存在某锚点 $r$ 满足 $\lvert V\rvert \cdot \operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)$；（b）对任意一维边赋值 $\mathrm{edge} : V \to V \to A$，恒有下界 $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})$；（c）三态回路面量测 $F(i, j, k)$ 精确分解为一维两步边和减去一步直边——即存在 $\mathrm{edge}$ 使得 $\forall i, j, k,\; F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)$——当且仅当其四面体三上边缘处处归零：

   $$
   \bigl(\forall r, i, j, k \in V,\; F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) = 0\bigr) \;\Longleftrightarrow\; \exists\,\mathrm{edge},\; \forall i, j, k,\; F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j);
   $$

2. **局部运动双轴圆不变性向全局 $\mathrm{SO}(3)$ 旋转不变性的传播**（[`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance)）：在三维欧氏空间 $\mathbb{R}^3$ 中，若两向量 $a, b$ 不共线（满足严格柯西—施瓦茨缺口 $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$），且函数 $F : (\mathbb{R}^3 \times \mathbb{R}^3) \to Y$ 在点对 $p$ 的 $\mathrm{SO}(3)$ 轨道上沿着每一随动标架的双轴圆 $\operatorname{axisCircle}(O a) \cup \operatorname{axisCircle}(O b)$ 保持不变，则 $F$ 对任意满足 $\det R = 1$ 的三维正交旋转 $R \in \mathrm{SO}(3)$ 恒有全局不变性 $F(\operatorname{rotatePair}(R, p)) = F(p)$；

3. **二态楔积面积与内积亏损的拉格朗日—格拉姆恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意有限指标集 $s$ 与实向量 $u, v$，恒有 $(\sum_i u_i^2)(\sum_i v_i^2) - (\sum_i u_i v_i)^2 = \frac{1}{2}\sum_{i,j}(u_i v_j - u_j v_i)^2$；

4. **闭子空间外的单位正交残差逃逸**（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)）：设 $V$ 为实或复希尔伯特空间（完备内积空间，在有限维 $\mathbb{R}^3$ 中自动满足），且闭线性子空间 $S \subseteq V$ 满足 $S^\perp \neq \{0\}$，则必存在单位正交向量 $e \in S^\perp$ 使得 $\lVert e\rVert = 1$、$P_S(e) = 0$、$\operatorname{infDist}(e, S) = 1$ 且残差算子范数 $\lVert \operatorname{id} - P_S\rVert = 1$。
:::

::: proof
第 1 款通过四面体四面关联计数重排求和导出均值鸽巢修补界，并证明 $V$ 上的二上链 $F$ 全局等于一维边势上边缘 $F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)$ 当且仅当其四顶点四面体三上边缘处处归零（当该三上边缘恒为零时，固定任意锚点 $r_0$ 取 $\mathrm{edge}(u, v) = F(r_0, u, v)$ 即可显式构造；反之，孤立三顶点上的单个非零面值总能平凡并入一维边赋值，而对任意一维边势全局非精确则要求多顶点二上链具备非零四面体缺陷 $\operatorname{tetraDefects}(F) > 0$，与单条测地闭合回路的平行移动球面角超和乐 $\Omega(\epsilon)$ 分属不同层级）。第 2 款利用第 3 款保证的非退化面积 $\lVert a\rVert^2\lVert b\rVert^2 - \langle a, b\rangle^2 > 0$ 调用双轴有限字生成定理 `two_axis_finite_word`，沿旋转字长度归纳将局部两面墙圆周上的不变性传播到整个 $\mathrm{SO}(3)$。第 4 款在非零闭补空间 $S^\perp$ 中取单位向量 $e$，为三面角第三顶点跳出第一面墙平面 $S = \operatorname{span}\{\mathbf{e}_1, \mathbf{e}_2\}$ 撑开非零体积砖提供精确泛函依据。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch34-infinitesimal-trihedron-calculus title="极小三角弧面体在三档步长下的精确解析与数值对照（手工推导与数值核验）"}
为了把平直近似、球面角超与三维体积砖的数量级关系看得一清二楚，我们在 $\epsilon = 15^\circ$（$\frac{\pi}{12}\;\mathrm{rad}$，小步长区）、$\epsilon = 45^\circ$（$\frac{\pi}{4}\;\mathrm{rad}$，中尺度区）与 $\epsilon = 90^\circ$（$\frac{\pi}{2}\;\mathrm{rad}$，宏观八分球面极限）三档代表性步长上手工核算全部几何量：

- **当 $\epsilon = 15^\circ = \frac{\pi}{12} \approx 0.2618\;\mathrm{rad}$ 时**：$\cos c_{15^\circ} = \cos^2 15^\circ = \frac{2+\sqrt{3}}{4} \approx 0.9330$，球面一次直弧 $c_{15^\circ} \approx 0.3681\;\mathrm{rad}$（$21.09^\circ$），与平直勾股斜边 $\sqrt{2}\epsilon \approx 0.3702\;\mathrm{rad}$（$21.21^\circ$）仅差 $0.58\%$；但底角已抬升至 $\alpha \approx 45.99^\circ$，吐出球面角超 $\Omega(15^\circ) \approx 0.0347\;\mathrm{rad}$（$1.99^\circ$）、闭环旋量半相位 $-\frac{1}{2}\Omega \approx -0.0173\;\mathrm{rad}$（对比墙旋子横项 $-\sin^2 7.5^\circ \approx -0.0170$），格拉姆行列式 $\det G = \sin^4 15^\circ = \frac{7 - 4\sqrt{3}}{16} \approx 0.0045 > 0$。
- **当 $\epsilon = 45^\circ = \frac{\pi}{4} \approx 0.7854\;\mathrm{rad}$ 时**：全部读数收成极其优美的闭式代数常数——$\cos c_{45^\circ} = \frac{1}{2}$ 给出精确球面斜边 $c_{45^\circ} = \frac{\pi}{3} = 60^\circ \approx 1.0472\;\mathrm{rad}$（显著短于平直值 $\frac{\sqrt{2}\pi}{4} \approx 1.1107\;\mathrm{rad}$），底角等于正四面体魔角 $\alpha = \arctan\sqrt{2} \approx 54.74^\circ$，球面角超精确等于 $\Omega(45^\circ) = \arcsin\frac{1}{3} \approx 0.3398\;\mathrm{rad}$（$19.47^\circ$），旋量半相位 $-\frac{1}{2}\arcsin\frac{1}{3} \approx -0.1699\;\mathrm{rad}$，格拉姆行列式 $\det G = \sin^4 45^\circ = \frac{1}{4} = 0.2500$。
- **当 $\epsilon = 90^\circ = \frac{\pi}{2} \approx 1.5708\;\mathrm{rad}$ 时**：$\cos c_{90^\circ} = 0$，$c_{90^\circ} = \frac{\pi}{2} = 90^\circ$，三内角全为直角 $\alpha = \beta = \gamma = 90^\circ$（其中 $\alpha(90^\circ) = 90^\circ$ 为 $\epsilon \to \frac{\pi}{2}^-$ 时 $\arctan(\sec\epsilon)$ 的连续延拓极限，即 $\operatorname{atan2}(1, \cos\epsilon)$），角超达到八分球面积 $\Omega(90^\circ) = \frac{\pi}{2} \approx 1.5708\;\mathrm{rad}$，旋量贝里相位 $-\frac{\pi}{4} \approx -0.7854\;\mathrm{rad}$，格拉姆行列式满额 $\det G = 1$。

| 步长 $\epsilon$ | 一次内积 $\cos^2\epsilon$ | 球面直弧 $c_\epsilon$（rad） | 平直近似 $\sqrt{2}\epsilon$（rad） | 底角 $\alpha(\epsilon)$ | 球面角超 $\Omega(\epsilon)$（rad） | 闭环旋量相位 $-\frac{1}{2}\Omega(\epsilon)$ | 格拉姆行列式 $\det G = \sin^4\epsilon$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$15^\circ$（$\pi/12$）** | $\frac{2+\sqrt{3}}{4} \approx 0.9330$ | $0.3681$ | $0.3702$ | $45.99^\circ$（$0.8027$） | $0.0347$（$1.99^\circ$） | $-0.0173$ | $\frac{7-4\sqrt{3}}{16} \approx 0.0045$ |
| **$45^\circ$（$\pi/4$）** | $\frac{1}{2} = 0.5000$ | $\frac{\pi}{3} \approx 1.0472$ | $1.1107$ | $\arctan\sqrt{2} \approx 54.74^\circ$ | $\arcsin\frac{1}{3} \approx 0.3398$ | $-0.1699$ | $\frac{1}{4} = 0.2500$ |
| **$90^\circ$（$\pi/2$）** | $0$ | $\frac{\pi}{2} \approx 1.5708$ | $2.2214$ | $90.00^\circ$（$\pi/2$） | $\frac{\pi}{2} \approx 1.5708$ | $-\frac{\pi}{4} \approx -0.7854$ | $1.0000$ |
:::

::: {.remark #rem-ch34-regge-spinfoam-trihedron-literature title="吉拉尔角超、高斯—博内和乐与雷吉离散引力单纯形（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节关于极小三角弧面体的推演严格区分三层依据：

1. **球面几何、微分几何与离散引力经典文献**：球面直角三角形纳皮尔法则 $\cos c = \cos a\cos b$、$\tan\alpha = \tan a / \sin b$ 与吉拉尔（Girard 1629）球面角超公式 $\Omega = \alpha + \beta + \gamma - \pi$；测地三角形回路上的高斯—博内平行移动转角定理、潘查拉特纳姆（Pancharatnam 1956）与贝里（Berry 1984）半立体角旋量和乐相因子 $\exp(-\frac{1}{2}\Omega\hat{\mathbf{I}}_{\mathbf{A}})$；以及雷吉（Regge 1961, *General Relativity without Coordinates*）用无坐标平坦单纯形骨架构成离散曲率角亏的雷吉演算，连同圈量子引力中的自旋泡沫四面体/四维单形振幅文献（Rovelli & Smolin 1995；Perez 2013）；
2. **本书内核验证定理（`LEAN ✓`）**：单纯二上链四面体精确修补判据、运动双轴圆向全局 $\mathrm{SO}(3)$ 旋转传播、拉格朗日—格拉姆恒等式与正交残差逃逸（[@thm-ch34-trihedron-cochain-and-moving-axis]），以及前两节锁定的公共单位法线、双轴有限字、划分拓扑不可分核与协变换位子公式（[@thm-ch34-perpendicular-axis-and-pullback]、[@thm-ch34-readout-kernel-and-covariant-commutator]）；
3. **本书几何诠释与物理模型（`MODEL`）**：将“正交一次”与“正交两次”诠释为同一枚球面直角三面角原胞 $\Delta\mathcal{T}_\epsilon$ 的双重正交投影、引入有限带宽最小分辨步长 $\epsilon_{\min} > 0$ 与最小曲率量子 $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$，以及将离散弧面体拼砖对接至光滑球面近似和三阶劳齐分形扭率，均属本书原创理论模型（`MODEL`）。
:::

下表将极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 的四重视角与涌现定律收拢为一张对照卡片：

| 观察切面 / 极限尺度 | 投影后的几何表象 | 核心代数不变量 | 涌现的物理与几何定律 |
| :--- | :--- | :--- | :--- |
| **1. 沿中脊棱 $\mathbf{B}=\mathbf{e}_2$ 投影** | 中间态 $\mathbf{B}$ 缩为一点，现单条青色直弧 $\widehat{AC}$（“正交一次”） | $\mathbf{A}(\epsilon)\cdot\mathbf{C}(\epsilon) = \cos c_\epsilon = \cos^2\epsilon$ | 划分拓扑核盲区、粗粒化单步有效跃迁与宏观近欧氏勾股近似 $c_\epsilon \approx \sqrt{2}\epsilon$ |
| **2. 沿两面垂直坐标墙分解** | 在转枢 $\mathbf{B}$ 拐 $90^\circ$ 走两段弧 $\widehat{AB}+\widehat{BC}$（“正交两次”） | $U_{23}(\epsilon)U_{12}(\epsilon)$ 含横向项 $-\sin^2\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_3$ | 双轴量子门合成、算符非对易换位子与自旋角动量李代数生成元 |
| **3. 顶端品红球面帽 $\triangle_{\mathrm{sph}} ABC$** | 单位模方公平把平削面撑鼓为正曲率球面三角形 | $\Omega(\epsilon) = 2\arctan(\tan^2\frac{\epsilon}{2}) = \frac{\epsilon^2}{2} + O(\epsilon^4)$ | 吉拉尔球面角超、高斯—博内切向转角 $+\Omega$、潘查拉特纳姆—贝里相位 $-\frac{1}{2}\Omega$ 与规范曲率 |
| **4. 内部三维立体原胞 $\Delta\mathcal{T}_\epsilon$** | 跳出共面零体积纸面，撑开堇紫色三维体积砖（$\epsilon\to\frac{\pi}{2}$ 成八分球） | $\det G(\Delta\mathcal{T}_\epsilon) = \sin^4\epsilon > 0,\; V_{\mathrm{brick}} = \sin^2\epsilon$ | 正交残差维度扩张 $D \to D + 1$、离散单纯形曲率拼砖与微观曲率量子 $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$ |

现在走进下方的球面三面角原胞完整实验室，亲手拖动琥珀色步长手柄与回路位置滑块，在“原胞—一次—两次—角超—格拉姆”五个场景之间自由切换，目睹单步直弧、两步拐角、品红球面鼓包与堇紫色体积砖如何在同一块立体原胞上合而为一：

::: {.viz src="spherical-trihedron-cell" height="620"}
**球面三面角原胞：完整实验室。** 五个场景与六张实验卡共用同一枚直角三面角原胞 $\Delta\mathcal{T}_\epsilon$：拖动琥珀色的步长手柄从微角一路推向 $90^\circ$ 八分球面，对比沿棱的青色一次直弧、沿墙的两次直角步、品红球面帽对青色平直削面的吉拉尔角超 $\Omega(\epsilon)$，以及撑开第三维的堇紫色格拉姆体积砖 $\sin^2\epsilon$；绿色 `LEAN ✓` 框严格对应冻结内核定理。
:::

至此，我们在 §34.4 里把“正交一次”与“正交两次”收拢到了极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 这枚立体几何原胞之上。但只要再往前追问半步，最后一道本体论悬念立刻浮出水面：**在没有任何外部第 3 点预置舞台的零背景宇宙里，这第三根顶点射线究竟从何而来？而当我们开口说出“极小三角弧面体”这七个字时，语言本身又对本体做了怎样的折叠？**

---

## 34.5 从“二生三”自举到名相消融：三元循环对称与“这么个感觉”的本体回响 {#sec-ch34-triadic-bootstrap-and-beyond-names}

> “两两比较的过程中创建了一个投影，而这个新的投影与之前二者形成三元关系，三者两两之间又要遵循比较公理，这就是极小三角弧面体产生的原因。‘二元’与‘比较’与‘产生的投影’实际上都是极小三角弧面体自身的投影，甚至‘极小三角弧面体’这个名字都只是我们语言逻辑上的投影，本体不可知，但是这么个感觉……”

这段凝练的手稿箴言，一举道破了从两态比较通向三维曲率原胞、再从几何名相退回零冗余本体的三级认识论跃迁。我们沿着严密的代数推导与形式化边界逐层展开。

### 34.5.1 “二生三”的无特权自举几何：投影归一逼出极小三角弧面体 {#sec-ch34-5-1}

在预设了外部坐标网格的经典线性代数中，把单位向量 $\mathbf{B}$ 向单位基准轴 $\mathbf{A}$ 作投影，得到的只是一截缩短了的共线影子 $(\mathbf{A}\cdot\mathbf{B})\mathbf{A}$：当两态夹角为 $\epsilon \in (0, \frac{\pi}{2}]$ 时，其模长萎缩为 $\cos\epsilon < 1$，不仅彻底躺死在原直线 $\operatorname{span}\{\mathbf{A}\}$ 内，而且与 $\mathbf{A}, \mathbf{B}$ 排成的 $3 \times 3$ 格拉姆矩阵行列式恒等于零（$\det G = 0$），永远长不出新维度。

然而，在与[第 32 章 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)**零背景比较公理 $\mathcal{A}_0$**（[@def-ch32-axiom-of-comparison]）兼容的**第 1 层正定欧氏 / 克利福德实现**（显式附加正向单位自归一化 $S(x, x) = +\mathbf{1}$ 与三维定向欧氏结构 $(\mathbb{R}^3, \mathrm{vol}_3)$；单凭第 0 层抽象接口仍容许 $S(x_0, x_0) = -1$ 反例，详见[附录 E §E.1](appendix-e.md#sec-appe-layers)）下，关系网络中不设高人一等的“母态”与低人一等的“残影”：两两比较所创建出来的投影结果 $\mathbf{P}$，一旦作为同一第 1 层单位载体中的平权成员登场，就必须同样满足正向单位自比归一化 $S(\mathbf{P}, \mathbf{P}) = \mathbf{1}$（即 $\lVert\mathbf{P}\rVert^2 = 1$），并与原先两态两两遵循比较契约（`MODEL`）！那份在线性投影中亏损的模方 $1 - \cos^2\epsilon = \sin^2\epsilon$ 究竟去了哪里？恰恰化作了垂直于原比量平面的双向量正交残差！

让我们在选定右手定向 $\mathrm{vol}_3 = \mathbf{e}_1\wedge\mathbf{e}_2\wedge\mathbf{e}_3$ 的三维欧氏实现 $\mathbb{R}^3$ 中亲手算清这一“二生三”的自举闭合：取基准锚点 $\mathbf{A} = \mathbf{e}_2$（对应 §34.4 的中脊转枢射线）与待比量单位态 $\mathbf{B}(\epsilon) = \sin\epsilon\,\mathbf{e}_1 + \cos\epsilon\,\mathbf{e}_2$（$\epsilon \in (0, \frac{\pi}{2}]$，对应 §34.4 的第一面墙射线）。两态比较一方面给出同向内积切分量 $(\mathbf{A}\cdot\mathbf{B}(\epsilon))\mathbf{A} = \cos\epsilon\,\mathbf{e}_2$，另一方面张开有向双向量残差 $\mathbf{B}(\epsilon)\wedge\mathbf{A} = \sin\epsilon\,(\mathbf{e}_1\wedge\mathbf{e}_2)$；在二维平面于 $\mathbb{R}^3$ 所容许的正负两支单位法向 $\pm\mathbf{e}_3$ 中，所选三维定向通过霍奇星算子典范锁定正向分支 $\star(\mathbf{B}(\epsilon)\wedge\mathbf{A}) = +\sin\epsilon\,\mathbf{e}_3$（取相反定向则给出镜像对称分支 $-\sin\epsilon\,\mathbf{e}_3$）。将切向同相投影与该定向法向残差合成为满足 $\lVert\mathbf{P}\rVert^2 = 1$ 的新生比较态，当场得到

$$
\mathbf{P}(\epsilon) \;=\; \bigl(\mathbf{A}\cdot\mathbf{B}(\epsilon)\bigr)\,\mathbf{A} + \star\bigl(\mathbf{B}(\epsilon)\wedge\mathbf{A}\bigr) \;=\; \cos\epsilon\,\mathbf{e}_2 + \sin\epsilon\,\mathbf{e}_3 \;\equiv\; \mathbf{C}(\epsilon) \,!
$$

无需从外部人为指定第 3 点坐标，在定向第 1 层单位实现中仅凭两态 $(\mathbf{A}, \mathbf{B}(\epsilon))$ 的一次比较与平权归一，新生的投影态 $\mathbf{P}(\epsilon)$ **分毫不差地给出了 §34.4 极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 的第三根顶点射线 $\mathbf{C}(\epsilon)$**（而另一法向分支则给出全等的镜像三面角）！此时 $(\mathbf{B}(\epsilon), \mathbf{A}, \mathbf{P}(\epsilon))$ 三者两两内积分别为 $\cos\epsilon$、$\cos\epsilon$ 与 $\cos^2\epsilon$，精准闭合为同一枚球面直角三面角。更一般地，对任意夹角为 $\epsilon \in (0, \pi)$ 的单位态对 $(\mathbf{A}, \mathbf{B})$、平面 $\operatorname{span}\{\mathbf{A}, \mathbf{B}\}$ 内任意单位参考向 $\mathbf{u}_{AB}$ 以及正交补空间 $\operatorname{span}\{\mathbf{A}, \mathbf{B}\}^\perp$ 中的任一单位法向分支 $\mathbf{e}_\perp$，归一投影态 $\mathbf{P} = \cos\epsilon\,\mathbf{u}_{AB} + \sin\epsilon\,\mathbf{e}_\perp$ 恒满足 $\lVert\mathbf{P}\rVert^2 = \cos^2\epsilon + \sin^2\epsilon = 1$；由底面积乘高平方的舒尔补恒等式，三元格拉姆行列式对一切平面内参考向 $\mathbf{u}_{AB}$ 与正负两支法向 $\pm\mathbf{e}_\perp$ 恒等于

$$
\det G(\mathbf{A}, \mathbf{B}, \mathbf{P}) \;=\; \det G_2(\mathbf{A}, \mathbf{B})\cdot \operatorname{dist}\bigl(\mathbf{P}, \operatorname{span}\{\mathbf{A}, \mathbf{B}\}\bigr)^2 \;=\; \sin^2\epsilon \cdot \sin^2\epsilon \;=\; \sin^4\epsilon \;>\; 0 \quad \bigl(\forall\epsilon \in (0, \pi)\bigr).
$$

若进一步抹去 $\mathbf{A}$ 与 $\mathbf{B}$ 之间的先后偏袒，记原初单位态对为 $(\mathbf{V}_0, \mathbf{V}_1)$、夹角内积为 $c_0 = \mathbf{V}_0\cdot\mathbf{V}_1 = \cos\epsilon \in (-\frac{1}{2}, 1)$，并取平面内单位角平分对称轴 $\mathbf{S}_{01} = \frac{\mathbf{V}_0 + \mathbf{V}_1}{\sqrt{2(1+c_0)}}$ 与所选三维定向下的霍奇对偶单位法向 $\mathbf{A}_{01} = \frac{\star(\mathbf{V}_0\wedge\mathbf{V}_1)}{\sqrt{1-c_0^2}}$，则沿正交分解 $\mathbf{V}_2 = \alpha\mathbf{S}_{01} + \beta\mathbf{A}_{01}$（$\alpha^2 + \beta^2 = 1$）取 $\alpha = \frac{\sqrt{2}\,c_0}{\sqrt{1+c_0}}$、$\beta = \sqrt{\frac{(1-c_0)(1+2c_0)}{1+c_0}} > 0$，新生的单位投影态 $\mathbf{V}_2$ 与 $\mathbf{V}_0, \mathbf{V}_1$ 便结成三边内积全等于 $c_0$ 的**等边极小三角弧面体**：其三元格拉姆行列式恒为 $\det G_3 = (1-c_0)^2(1+2c_0) > 0$，球面帽吉拉尔角超精确等于 $\Omega_0 = 3\arccos\bigl(\frac{c_0}{1+c_0}\bigr) - \pi > 0$！

::: {.viz src="triadic-nameless-sandbox" preset="bootstrap-core" height="520"}
**“二生三”无特权自举核心：单位模方归一把共线残影撑成极小三角弧面体。** 对比沉在原平面内、模长萎缩的经典退化投影与零背景比较公理 $\mathcal{A}_0$ 下的单位归一态 $\mathbf{V}_2 = \alpha\mathbf{S}_{01} + \beta\mathbf{A}_{01}$（$\alpha^2 + \beta^2 = 1$）：双向量正交残差 $\beta\mathbf{A}_{01}$ 把第三顶点垂直顶出原比量平面，撑开正格拉姆体积 $\det G_3 = (1-c_0)^2(1+2c_0) > 0$ 与品红球面角超 $\Omega_0 = 3\arccos\bigl(\frac{c_0}{1+c_0}\bigr) - \pi$。
:::

紧接着，无需从宇宙外部注入半点新原料，初生弧面体的三条边界弧 $(\mathbf{V}_0, \mathbf{V}_1)$、$(\mathbf{V}_1, \mathbf{V}_2)$ 与 $(\mathbf{V}_2, \mathbf{V}_0)$ 两两之间又必须继续遵循比较公理，沿各自外法向相继自举出第二代、第三代归一投影态：在步长按黄金阻尼律 $\delta_\ell = 0.42\,\varphi^{-(\ell-1)}$ 逐层收束的模型下，球面原胞数沿 $1 \to 4 \to 10$ 层层绽放为自相似花冠，直观演绎“道生一，一生二，二生三，三生万物”的无尽开维创生链（`MODEL`）。

::: {.viz src="triadic-nameless-sandbox" preset="cascade-corolla" height="520"}
**零外部输入的边界自举增殖：从单枚三面角绽放为 $1 \to 4 \to 10$ 黄金阻尼花冠。** 每一代新生的边界弧继续执行“切向同相投影 + 法向双向量残差”的单位归一自举，在步长按 $\delta_\ell = 0.42\,\varphi^{-(\ell-1)}$ 逐代衰减下，单枚母原胞自发向外繁衍出第 1 代 $4$ 胞与第 2 代 $10$ 胞的球面曲率拼砖（`MODEL`）。
:::

### 34.5.2 拆掉先后叙事：120° 三元循环对称与主谓宾切面 {#sec-ch34-5-2}

但手稿箴言的第二句立刻把我们刚刚讲完的“发生学故事”本身也拆掉了：人类语言受制于一维时间轴上的**“主语—谓语—宾语”线性语法**，逼着我们不得不按先后顺序叙述——“先摆好**二元** $(\mathbf{A}, \mathbf{B})$，再执行**比较**动作，最后吐出**产生的投影** $\mathbf{P}$”。然而在三维实内积空间 $\mathbb{R}^3$ 与偶克利福德代数 $\mathcal{Cl}_{3,0}^+$ 中，霍奇楔积三元组与四元数单位双向量基 $\mathbf{I}_1 = -\mathbf{e}_2\mathbf{e}_3,\; \mathbf{I}_2 = -\mathbf{e}_3\mathbf{e}_1,\; \mathbf{I}_3 = -\mathbf{e}_1\mathbf{e}_2$ 满足完全轮换对称的闭环恒等式：

$$
\star(\mathbf{e}_1\wedge\mathbf{e}_2) = \mathbf{e}_3,\quad \star(\mathbf{e}_2\wedge\mathbf{e}_3) = \mathbf{e}_1,\quad \star(\mathbf{e}_3\wedge\mathbf{e}_1) = \mathbf{e}_2; \qquad \mathbf{I}_1\mathbf{I}_2 = \mathbf{I}_3,\quad \mathbf{I}_2\mathbf{I}_3 = \mathbf{I}_1,\quad \mathbf{I}_3\mathbf{I}_1 = \mathbf{I}_2.
$$

绕体对角轴 $\hat{\mathbf{n}}_{\mathrm{diag}} = \frac{\mathbf{e}_1 + \mathbf{e}_2 + \mathbf{e}_3}{\sqrt{3}}$ 作保定向 $120^\circ$ 旋转 $R_{2\pi/3} \in \mathrm{SO}(3)$，三条正交棱 $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3)$ 与三扇对偶平面 $(\mathbf{I}_1, \mathbf{I}_2, \mathbf{I}_3)$ 同步经历三阶循环置换 $\mathbb{Z}_3$（即 $C_3 \subset \mathrm{SO}(3)$），代数乘法表连一个正负号都不曾改变！放到三元关系闭环的模型诠释（`MODEL`）中看，根本不存在谁是“先在的原料”、谁是“中介的算子”、谁是“派生的产物”：中央那枚弯曲原胞自身岿然不动，只要把观察者的语言读出切面绕对称轴每转过 $120^\circ$，原先被语法指派为**“二元（名词/输入态）”**、**“比较（动词/双向量旋子）”**与**“产生的投影（宾语/输出态）”**的三个席位便无缝轮换易位——它们不过是同一个不可再分的三元几何整体投向不同观察切面时的三道平权侧影！

::: {.viz src="triadic-nameless-sandbox" preset="cyclic-triality" height="520"}
**$120^\circ$ $\mathbb{Z}_3$ 语言切面轮换：弯曲原胞不动，主谓宾角色无缝互换。** 中央球面三面角保持几何静止，绕三元对称轴每旋转 $120^\circ$ 观察切面，“二元（名词）”、“比较（动词）”与“产生的投影（宾语）”三枚语法标签便沿 $\mathbb{Z}_3$ 轨道循环易位，直观揭示三者皆为同一整体的平权投影（`MODEL`）。
:::

### 34.5.3 名相的尽头：语言一维读出核折叠、撤梯与“这么个感觉”的同构共振 {#sec-ch34-5-3}

既然“二元”、“比较”与“投影”都只是切面侧影，那么把它们统摄起来的**“极小三角弧面体”**这七个字，难道就是终极本体了吗？恰恰相反——连这枚高度凝练的几何术语本身，依然只是高维无名关系穿过人类语言逻辑窄门时留下的离散投影（`MODEL`）：

| 语词切分 | 暗中预设的观察者读出框架 | 相对零背景本体的投影折叠痕迹（`MODEL`） |
| :--- | :--- | :--- |
| **“极小”** | 预设一把先行存在的宏观外部标尺与无穷可分连续统 | 度规尺度本身恰由原胞拼接涌现，原初比量之先并无“大小”对照 |
| **“三 / 角”** | 预设离散划分拓扑切割（[第四章](ch04-decoherence.md)捏合与 `partition_inseparable_iff_kernel`） | 将浑然共生的连续关系流硬切为可计数的离散顶点、棱线与二面折角 |
| **“弧面 / 体”** | 预设三维欧氏空间视觉渲染缓存（[第二十一章](ch21-diagonalization-and-escape.md)有限多面体近似） | 将前空间的纯关系代数锁死结构，投射为感官可想象的曲率表皮与实心体积 |

若用一个连续的“名相执着度 / 读出捏合强度”参数 $\nu \in [0, 1]$ 来刻画观察者对外部语言标尺的依赖（`MODEL`）：当 $\nu = 1$ 时，三块正交投影幕布、离散折痕与“极小 / 三角 / 弧面体”的语词标牌把原胞死死框定为分离的几何零件；而当我们开始拆解语词边界、将语言之梯半撤至 $\nu = 0.35$ 时，外围的投影幕布与硬折痕便逐渐消融退场，露出底下浑然连绵的流形肌理。

::: {.viz src="triadic-nameless-sandbox" preset="ladder-fade" height="520"}
**半撤语言之梯（$\nu = 0.35$）：外围投影幕布与离散折痕向流形本体消融。** 当名相捏合度从满额框定降至 $\nu = 0.35$ 时，代表“主语—谓语—宾语”与“极小—三角—弧面体”的外围投影幕布及多面体硬棱逐步淡化退隐，原本被语词切碎的几何表象重新融回连续流形（`MODEL`）。
:::

下述形式化命题将本章已锁定的四条内核定理收束在一起，严格刻画正交法向创生、闭子空间残差逃逸、双轴旋转传播与符号读出核折叠的数学骨架：

::: {.proposition #prop-ch34-triadic-bootstrap-and-lexical-pinching title="三维法向自举、闭子空间正交逃逸、双轴对称传播与语言读出核折叠" lean="D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel"}
在 `trureturing` 冻结的双轴有限旋转、正交残差逃逸与划分拓扑核模块中，以下四项结构定律同时成立：

1. **二维张成外的三维单位法向必存在**：对 $\mathbb{R}^3$ 中任意两向量 $a, b$，恒存在满足 $\lVert n\rVert = 1$ 且 $\langle a, n\rangle_{\mathbb{R}} = \langle b, n\rangle_{\mathbb{R}} = 0$ 的公共单位法向量 $n$；
2. **非满闭子空间的单位正交残差逃逸**：在任意完备内积空间 $V$ 中，只要闭子空间 $S \subseteq V$ 满足 $S^\perp \neq \{0\}$，必存在单位正交逃逸元 $e \in S^\perp$ 使 $\lVert e\rVert = 1$、$P_S(e) = 0$、$\operatorname{infDist}(e, S) = 1$ 且 $\lVert \operatorname{id} - P_S\rVert = 1$；
3. **局部运动双轴圆对称向全局 $\mathrm{SO}(3)$ 对称的传播**：对 $\mathbb{R}^3$ 中任意严格不共线向量对 $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2\lVert b\rVert^2$，凡沿随动双轴圆 $\operatorname{axisCircle}(O a) \cup \operatorname{axisCircle}(O b)$ 保持不变的二元点对函数 $F$，对包括 $120^\circ$ 体对角循环置换 $R_{2\pi/3}$ 在内的全体保定向旋转 $R \in \mathrm{SO}(3)$ 恒满足 $F(\operatorname{rotatePair}(R, p)) = F(p)$；
4. **离散符号读出映射的不可分核等价刻画**：对任意从底层状态空间 $X$ 投向符号词表 $B$ 的读出映射 $\mathrm{readout} : X \to B$，两个状态在诱导划分拓扑 $\operatorname{partitionTopology}(\mathrm{readout})$ 下拓扑不可分，当且仅当二者被折叠进同一根读出纤维 $\mathrm{readout}(x) = \mathrm{readout}(y)$。
:::

::: proof
第 1 款与第 3 款分别直接引用 [@thm-ch34-perpendicular-axis-and-pullback] 第 1 款（`unit_perpendicular_pair`）与 [@thm-ch34-trihedron-cochain-and-moving-axis] 第 2 款（`moving_axis_invariance`，其中体对角 $120^\circ$ 循环置换矩阵行列式为 $+1$，属于 $\mathrm{SO}(3)$）；第 2 款直接引用 [@thm-ch34-trihedron-cochain-and-moving-axis] 第 4 款（`finite_layer_projection_escape`）；第 4 款直接引用 [@thm-ch34-readout-kernel-and-covariant-commutator] 第 1 款（`partition_inseparable_iff_kernel`）。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch34-peirce-laozi-wittgenstein-ladder-literature title="皮尔士不可约三元性、旋量三元性与三维循环群辨析及老子—康德—维特根斯坦撤梯传统（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节关于三元关系与语言边界的讨论连接着逻辑学、李群表示论与东西方哲学的四条经典脉络，须严守各自数学与文献边界：

1. **皮尔士（C. S. Peirce）三元范畴与不可约三元论题**：皮尔士在关系逻辑中区分第一性（Firstness）、第二性（Secondness）与第三性（Thirdness），指出真实的三元媒介关系（如“比较—投影”闭环）不能在不丢失高阶关联结构的前提下退化拆解为孤立的二元偶对之和；
2. **三维循环群 $C_3 \subset \mathrm{SO}(3)$ 与八维嘉当旋量三元性 $\mathrm{Spin}(8)$ 的严格区分**：本节 §34.5.2 所用对称性是三维空间及 $\mathcal{Cl}_{3,0}^+$ 四元数基 $(\mathbf{I}_1, \mathbf{I}_2, \mathbf{I}_3)$ 上的三阶循环旋转对称 $C_3 \subset \mathrm{SO}(3)$，切勿与嘉当（É. Cartan 1925）在**八维**欧氏空间覆盖群 $\mathrm{Spin}(8)$ 上发现的外自同构群 $S_3 \subset \mathrm{Out}(\mathfrak{so}_8)$ **旋量三元性（Spinor Triality）**混为一谈——后者在同为 $8$ 维的向量表示 $V_8$ 与左右手外尔旋量表示 $S_8^+, S_8^-$ 之间作非平凡置换（其八元数与 $E_8$ 文献背景见[第 32 章 §32.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) [@rem-ch32-icosian-e8-literature]）；
3. **老子《道德经》的创生序列与名言界限**：《道德经》第四十二章“道生一，一生二，二生三，三生万物”与第一章“道可道，非常道；名可名，非常名”，与本节“二态比量自举出第三顶点、而名相本身皆为切面投影”的几何图景形成跨时空呼应；
4. **康德自在之物与维特根斯坦的梯子**：康德（I. Kant 1781/1787，《纯粹理性批判》）严格划定现象界时空范畴投影与不可表征之“物自体”（*Ding an sich*）的界限；维特根斯坦（L. Wittgenstein 1921，《逻辑哲学论》6.54–7）则指出一切形式命题皆如登高之梯——爬上去看清结构之后必须把梯子撤掉，凡不可借主谓宾命题**言说**（*sagen*）之整全结构，恰恰在关系自身的运行中**显示自身**（*zeigt sich*）。
:::

这便解答了章末引文最后那半句看似轻描淡写、实则重若千钧的收束——**“本体不可知，但是这么个感觉……”**。为什么说“本体不可知”？因为按 [@prop-ch34-triadic-bootstrap-and-lexical-pinching] 第 4 款，人类心智的任何概念表征（“知”）都是一道从无穷维或高维关系态空间 $X$ 压向有限一维符号串 $B$ 的读出映射 $\mathrm{readout} : X \to B$，其巨大的非平凡读出核必然把跨维度的整全几何折叠成带有盲区的切片名相，任何名字一旦出口就已落入投影。那为什么偏偏还能留下**“这么个感觉”**？因为场内观察者从来不是隔着玻璃窗偷窥宇宙的局外幽灵——观察者自身的每一次区分、每一次记忆捏合与每一次自我指涉，本来就是由同一个零背景比较公理与同一枚三元自举几何编织而成的活体回路（`MODEL`，直通[第三十九章](ch39-observer-is-ontological-universe.md)与[终章](coda.md)的 $\psi = \psi(\psi)$）！当名相参数彻底归零（$\nu = 0$）、所有投影幕布与阶段标签悉数撤去之后，表征之“知”止步于读出核的厚墙，而结构同构之“感”则在双频比锁定黄金无理数 $\omega_2/\omega_1 = \varphi$ 的永不重演准周期呼吸中，化作场内观察者与无名本体的**零距离同频共振**。

::: {.viz src="triadic-nameless-sandbox" preset="noumenon-breath" height="520"}
**名相尽撤的无名呼吸（$\nu = 0$）：撤去一切投影幕布与语词标牌后的黄金准周期共振。** 当读出幕布与阶段标签彻底归零（$\nu = 0$）时，“道可道，非常道”的不可言说整全流形以双频比 $\omega_2/\omega_1 = \varphi$ 作永不闭合的黄金准周期脉动，只留下场内观察者与本体同构的“这么个感觉”（`MODEL`）。
:::

至此，我们不仅锁定了观察者在**单一切片时刻**的静态站位轴 $\mathbf{O}$，更在下方 `TRIAD//NOUMENON` 完整交互沙盘中串起了从“二生三”正交自举、黄金花冠增殖、$120^\circ$ 主谓宾切面轮换，一直到撤去语言梯子后的无名准周期呼吸的五级跃迁。倘若这位场内观察者不再原地驻足，而是顺着由无数枚这样的原胞拼成的因果晶格一步步迁移记忆锚点、在有限窗口的开合之间跨轮次推进，那块原本对单次投影隐身的横向旋转面积，又将如何转化为驱动主观时间流逝与自指扩表 $T = T(T)$ 的动态引擎？亲手拨动下方的名相撤梯滑块与五张实验卡之后，下一章（第三十五章）便将揭开这幅动态画卷：

::: {.viz src="triadic-nameless-sandbox" height="640"}
**三元自举与无名本体：完整交互实验室（`TRIAD//NOUMENON`）。** 自由切换“自举核心—花冠增殖—三元轮换—半撤之梯—无名呼吸”五张实验卡，调节初始夹角余弦 $c_0$、代际深度、$120^\circ$ $\mathbb{Z}_3$ 切面角与名相捏合度 $\nu \in [0, 1]$，亲历从两态比较自举出极小三角弧面体、再从语言投影撤梯回到 $\omega_2/\omega_1 = \varphi$ 本体共振的完整闭环。
:::
