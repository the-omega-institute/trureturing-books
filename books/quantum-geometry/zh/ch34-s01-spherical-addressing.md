# 29.1 球面寻址中的二次正交隐身：对称子午线与极点法向反演 {#sec-ch34-spherical-addressing-inversion}

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
