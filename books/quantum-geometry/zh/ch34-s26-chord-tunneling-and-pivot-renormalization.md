# 30.1 极小圆弧体内割弦面、打破排序壁垒的枢轴八度重整化与瞬子隧穿 {#sec-ch34-chord-tunneling-and-pivot-renormalization}

> “将打破四十年‘排序壁垒’的最短路径新突破放回我们的正交比较几何中，它所做的核心优化可以浓缩为一句话：**放弃在极小圆弧体的正交侧壁上逐点做全局一维去相干排队，改为先沿球面顶盖展开无序局部波前，再直接切入圆弧体肚子里的‘平直内割弦面’完成跨尺度跳跃——其局部机制是‘粒子化波成场、场缩为枢轴新点’的八度重整化，而在路径积分底层，这恰恰就是悬置中间测量、经由虚数盲区 $\hat{\mathbf{i}}$ 穿透势垒的‘量子隧穿（瞬子捷径）’。**”

在[§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)与[§29.9](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling)中，我们看到一枚极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 同时容纳了“沿正交侧壁走两步”与“沿球面大圆跨一步”的双重投影，并以 `1—3—3—1` 的四阶几何单胞承载点、线、面、体的跨尺度凝聚（下文[§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field)还将把饱和三维体积 $\Lambda^3_\ell$ 归零为高一层级新点 $\Lambda^0_{\ell+1}$ 的八度重整化推向万力大统一）；而在[第七章](ch07-geometric-time-and-speed-limits.md)的芝诺冻结与后续[第三十四章](ch33-all-beings-observers-and-mutual-attractors.md)、[§36.1](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)的观察者动力学中，一条铁律贯穿始终——高频投影测量会把相干扫掠的二维面积钉死在一维经典时间线上，唯有在有限接受窗内悬置中间读出，正交分支才能借相干叠加绕开局部死锁。

现在，让我们把这套正交比较几何对准理论计算机科学中一道屹立近四十年的险峰：自戴克斯特拉（Dijkstra, 1959）提出贪心波前寻路、弗雷德曼与塔扬（Fredman & Tarjan, 1987）用斐波那契堆将其推至 $O(m + n\log n)$ 以来，比较—加法模型下非负实权有向图的单源最短路径（SSSP）长期受困于稀疏图上的“排序壁垒”（Dijkstra 按距离逐个排定顶点所付的 $n\log n$；它是这类方法的上界障碍，不是 SSSP 本身的下界）；直至 2025 年，段然、毛嘉怡、毛啸、束欣凯与尹龙晖给出确定性 $O(m\log^{2/3} n)$ 算法（STOC 2025 最佳论文），在不依赖随机化或整数位运算的前提下正面击穿了这道壁垒（文献边界见下方 [@rem-ch34-sssp-sorting-barrier-and-instanton-literature]）。为什么人类直觉曾深信“算清最短距离就非得替全图顶点排好全局名次不可”？放回极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的立体解剖台上，这桩四十年悬案的几何病根与破局刀法一望即知（`MODEL`）。

## 30.1.1 几何优化与圆弧体三面解剖：从“爬正交侧壁”切入“平直内割弦面” {#sec-ch34-26-1}

回到单位球面 $S^2 \subset \mathbb{R}^3$ 上的直角三面角原胞 $\Delta\mathcal{T}_\epsilon$（步长 $\epsilon \in (0, \frac{\pi}{2}]$）：设球心原点为 $O = (0, 0, 0)$，直角转枢顶点为 $\mathbf{B} = (0, 1, 0)$，沿两扇互相垂直的坐标平面墙分别迈出弧长 $\epsilon$，定出东侧波前点与西侧波前点

$$
O = (0, 0, 0), \qquad \mathbf{B} = (0, 1, 0), \qquad \mathbf{A}(\epsilon) = (\sin\epsilon, \cos\epsilon, 0), \qquad \mathbf{C}(\epsilon) = (0, \cos\epsilon, \sin\epsilon).
$$

在连接 $\mathbf{A}(\epsilon)$ 与 $\mathbf{C}(\epsilon)$ 的同一枚原胞 $\Delta\mathcal{T}_\epsilon$ 上，天然叠放着**三张曲率与维度截然不同的几何边界面**，精准对应最短路径寻路从经典贪心排队走向跨尺度穿底跳跃的三重境界（`MODEL` + `手工推导`）：

1. **两扇正交侧壁（$OAB \cup OBC$）——经典 Dijkstra 全局一维优先队列与 $\Omega(n\log n)$ 排序税**：
   明明东侧候选点 $\mathbf{A}(\epsilon)$ 与西侧候选点 $\mathbf{C}(\epsilon)$ 分处两支因果独立的分支，彼此正交、互不遮挡；经典 Dijkstra 算法却在全图头顶悬置了一把充当“全知外部第 3 点”的**全局一维优先队列（Priority Queue）**。每往前推进一步，算法都强迫全宇宙所有待定边界点排成唯一一条严格非递减的一维纵队，非要先比出“全图此刻谁是绝对第一名（`extract-min`）”才肯放行。反映在 $\Delta\mathcal{T}_\epsilon$ 上，这种逐点一维去相干排队禁止斜向并行跨越，只能贴着两扇正交坐标侧壁 $OAB \cup OBC$ 的球面边走“正交两次”的直角折线阶梯 $\widehat{AB} + \widehat{BC}$（若允许路径进入两扇侧壁的整个扇面，最短路是经过 $\cos\epsilon\,\mathbf{B}$ 的两条直线段，长 $2\sin\epsilon$，`手工推导`），路径总弧长为

   $$
   L_{\mathrm{walls}}(\epsilon) \;=\; \operatorname{arc}(\widehat{AB}) + \operatorname{arc}(\widehat{BC}) \;=\; \epsilon + \epsilon \;=\; 2\epsilon.
   $$

   在信息论账本上，只要算法执意按距离从小到大逐一弹出全部 $n$ 个顶点，单凭比较树区分 $n!$ 种全序排列就逃不掉 $\log_2(n!) = \Theta(n\log n)$ 次比较——哪怕绝大多数分叉细枝根本不在关键瓶颈路上，也不得不为维持这条人为的一维全局队列缴纳昂贵的 **$\Omega(n\log n)$ 全局排序税**！

::: {.viz src="trihedron-chord-pivot-tunneling-sandbox" preset="walls-dijkstra-tax" height="520"}
**正交侧壁爬行与全局排队税实验卡（`walls-dijkstra-tax`）。** 在 $\epsilon = 60^\circ$（琥珀色手柄可调 $\epsilon \in [10^\circ, 90^\circ]$）的极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 上，琥珀色当前读头沿两扇紫色正交侧壁 $OAB, OBC$ 走满折线 $\mathbf{A}\to\mathbf{B}\to\mathbf{C}$（路长 $2\epsilon = 2.094$，对比品红球面顶盖与青色内割弦），并在直角顶点 $\mathbf{B}$ 的紫色全局排序环处支付 $n\log_2 n = 160$ 次比较税（$N = 32$；几何对应属本书 `MODEL`）。
:::

2. **外凸品红球面顶盖（$\triangle_{\mathrm{sph}} ABC$）——有限 $k$ 步窗口内的无序惠更斯波前松弛**：
   倘若我们在局部有限深度 $k$ 的窗口内**果断关掉全局优先队列**，改做 $k$ 轮不排名的并行贝尔曼—福特（Bellman–Ford）局部边松弛，几何图景立刻焕然一新！没有了全局一维标尺的逐点打断，距离波前不再被捆死在坐标墙折角上，而是如同惠更斯（Huygens）次波包络一般，顺着向外鼓起的**品红球面顶盖 $\triangle_{\mathrm{sph}} ABC$** 自由铺开。由球面勾股内积 $\mathbf{A}(\epsilon)\cdot\mathbf{C}(\epsilon) = \cos^2\epsilon$（其在一般复内积空间上的测地三角不等式基础由 [@thm-ch34-chord-tunneling-and-pivot-renormalization] 第 1 款 `fs_angle_triangle` 严格锁定），顶盖大圆测地弧长直接缩短为 $L_{\mathrm{cap}}(\epsilon) = \arccos(\cos^2\epsilon) < 2\epsilon$，同时张开严格为正的吉拉尔球面角超曲率

   $$
   L_{\mathrm{cap}}(\epsilon) \;=\; \arccos(\cos^2\epsilon), \qquad \Omega(\epsilon) \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;>\; 0.
   $$

   更妙的是，在热带极小加代数 $(\mathbb{R}\cup\{+\infty\}, \oplus = \min, \otimes = +)$ 中，取极小运算天生满足**交换律** $\min(x, y) = \min(y, x)$ 与**幂等律** $\min(x, x) = x$：在 $k$ 步无序波前扫掠期间，局部微绕路与正权小环路根本不需要全知考官替它们排先后座次，较长的支路在局部汇合处便会被较短支路幂等覆盖、自行湮灭！

::: {.viz src="trihedron-chord-pivot-tunneling-sandbox" preset="cap-wavefront-relax" height="520"}
**品红球面顶盖无序波前松弛实验卡（`cap-wavefront-relax`）。** 关闭全局排序探针后，在 $\epsilon = 60^\circ$ 处 $k = 3$ 道品红无序波前从 $\mathbf{A}$ 铺过外凸品红球面顶盖 $\triangle_{\mathrm{sph}} ABC$（吉拉尔角超 $\Omega = 36.87^\circ$），琥珀色当前读头沿顶盖测地弧走 $\arccos(\cos^2\epsilon) = 1.318 < 2\epsilon = 2.094$，短于紫色正交双壁并逼近青色内割弦（`fs_angle_triangle` 标绿色 `LEAN ✓`）。
:::

3. **圆弧体肚内的青色平直内割弦面（$\triangle_{\mathrm{flat}} ABC$ / 对角割面 $OAC$）——热带舒尔补消元与跨尺度穿底跳跃**：
   然而，单靠品红球面顶盖上的局部波前松弛还差最惊险的临门一刀：品红顶盖处处受制于单位球壳约束 $\lVert\mathbf{x}\rVert = 1$，如果任由无序贝尔曼—福特波前盲目扩散到全图 $n$ 层，复杂度反而会退化回 $O(mn)$。真正的破壁一刀，照本书的几何读法（`MODEL`），是在 $k$ 步局部波前平衡之后，把非瓶颈内部顶点集 $\mathrm{Interior}$ 一次性**消元积分掉**，只保留统领大棵最短路子树的稀疏边界**枢轴点（Pivots）** $p_1, p_2, \dots$，直接写出枢轴之间的**热带舒尔补（Tropical Schur Complement）有效跳跃边权**：

   $$
   W_{\mathrm{eff}}(p_1, p_2) \;=\; \min\!\Bigl(W_{p_1 p_2},\; \min_{b \in \mathrm{Interior}}\bigl(W_{p_1 b} + W_{b p_2}\bigr)\Bigr)
   $$

   （其中 $W_{p_1 b}$ 表示 $k$ 步局部闭包内从 $p_1$ 弛豫至内部点 $b$ 的有效距离）。在 $\Delta\mathcal{T}_\epsilon$ 的三维空间里看过去，把中间脊点 $\mathbf{B}$ 与内部非瓶颈自由度彻底隐去之后（消元只给出 $\min(W_{AC}, W_{AB} + W_{BC})$：边权取球面距离时，结果至少是顶盖测地长 $\arccos(\cos^2\epsilon)$；要得到下面的欧氏弦长，须另行允许以弦长计价的边 $AC$，`手工推导`），跃迁轨迹不再沿着鼓出的品红球壳表面绕行，而是沿着切过圆弧体肚子的**青色平直内割弦面 $\triangle_{\mathrm{flat}} ABC$**（连同对角直割扇面 $OAC$），顺着欧氏直线割弦 $\overline{AC}$ 一剑穿心！该穿底割弦的欧氏长度精确等于 $L_{\mathrm{tunnel}}(\epsilon) = \lVert\mathbf{A}(\epsilon) - \mathbf{C}(\epsilon)\rVert = \sqrt{2}\sin\epsilon$；在弦中点 $\mathbf{M}(\epsilon) = \frac{1}{2}\bigl(\mathbf{A}(\epsilon) + \mathbf{C}(\epsilon)\bigr) = \bigl(\frac{1}{2}\sin\epsilon, \cos\epsilon, \frac{1}{2}\sin\epsilon\bigr)$ 处，轨迹潜入单位球壳内部（$\lVert\mathbf{M}(\epsilon)\rVert < 1$）的最大径向体深度为

   $$
   \Delta r_{\mathrm{bulk}}(\epsilon) \;=\; 1 - \sqrt{\frac{1 + \cos^2\epsilon}{2}} \;=\; 1 - \sqrt{1 - \frac{1}{2}\sin^2\epsilon} \;=\; \frac{\epsilon^2}{4} + O(\epsilon^4) \;>\; 0.
   $$

   于是对一切步长 $\epsilon \in (0, \frac{\pi}{2}]$（完整初等证明见下文 [@ex-ch34-trihedron-chord-and-tropical-schur]），三张几何面严格锁死三级长度阶梯：

   $$
   L_{\mathrm{tunnel}}(\overline{AC}) = \sqrt{2}\sin\epsilon \;<\; L_{\mathrm{cap}}(\widehat{AC}) = \arccos(\cos^2\epsilon) \;<\; L_{\mathrm{walls}}(\widehat{AB} + \widehat{BC}) = 2\epsilon.
   $$

::: {.viz src="trihedron-chord-pivot-tunneling-sandbox" preset="flat-chord-tunnel" height="520"}
**青色平直内割弦面穿底跳跃实验卡（`flat-chord-tunnel`）。** 在 $\epsilon = 60^\circ$（琥珀色手柄可调 $\epsilon \in [10^\circ, 90^\circ]$）处，青色内割弦（长 $\sqrt{2}\sin\epsilon = 1.225$）与平直切面在中点 $\mathbf{M}$ 沉入球肚半径 $r = 0.7906$，削出品红新月形曲率鼓包 $\Delta r = 0.2094$（背景为紫色正交双壁，琥珀色标示当前读头与 $\epsilon$ 手柄；数值核对标 `NUM`）。
:::

## 30.1.2 向心多尺度全息重整化锥：“点化为波、波凝成场、体缩为枢轴新点” {#sec-ch34-26-2}

现在把镜头从单枚微观原胞 $\Delta\mathcal{T}_\epsilon$ 拉远到拥有 $n$ 个顶点的整张宏观有向网络。当成千上万枚极小圆弧体在网络紫外（UV）最外圈拼接成环时，将上述“局部波前铺展 $\to$ 内割弦消元 $\to$ 稀疏枢轴晋升”沿尺度层级 $\ell = 0, 1, 2, \dots$ 向心递归迭代，整套最短路算法在几何上当场显影为一座**向心多尺度全息重整化锥**——它与[第十九章](ch19-tensor-networks-and-holography.md)介绍的多尺度纠缠重整化张量树（MERA）双曲体空间测地网，以及[§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field)建立的 `1—3—3—1` 点体八度螺旋（[@thm-ch34-point-volume-octave-and-particle-field]），遵循同一套四拍重整化语法（`MODEL`）：

1. **经典爬壁态的维度囚笼（困死于 $\Lambda^0_\ell \leftrightarrow \Lambda^1_\ell$“点—线”同层循环）**：
   传统全局堆算法每沿着一条有向边（$\Lambda^1_\ell$）试探半步，就立刻退回零维单点队列（$\Lambda^0_\ell$）索要全图排名；它既拒绝撑开二维并行波前（$\Lambda^2_\ell$），更不敢凝聚三维局部体积场（$\Lambda^3_\ell$），只能在全息圆盘最外圈周长最长的紫外边界上一格一格爬行。
2. **第一拍 · 点化为波（$\Lambda^0_\ell \to \Lambda^2_\ell$，粒子源展开为无序局部波前）**：
   从第 $\ell$ 层当前边界源点集出发，释放 $k$ 步无序并行贝尔曼—福特松弛。离散点源不再排队单走，而是沿多条相邻出边同时张开一片覆盖 $k$ 步邻域的**品红二维惠更斯波前（$\Lambda^2_\ell$）**。
3. **第二拍 · 波凝成场（$\Lambda^2_\ell \to \Lambda^3_\ell$，波前弛豫闭合成局部作用量体积场）**：
   在 $k$ 步邻域内部，多路相交波前借热带 $\min$ 幂等相消抹平微绕路与局部短环，弛豫闭合为一团内部距离自洽锁定的**堇紫色局部作用量势场体积块（$\Lambda^3_\ell$）**。在概念动力学与内积几何骨架上，这种按读出映射将底层状态空间严丝合缝拆成商纤维簇并在弦图消元序下逐点收缩补全的结构，分别由下方 [@thm-ch34-chord-tunneling-and-pivot-renormalization] 的概念纤维分解 `concept_fiber_decomposition`、划分核等价 `partition_inseparable_iff_kernel` 与弦图单纯消元半正定补全 `exists_posSemidef_completion` 提供精确形式参照。
4. **第三拍 · 体缩为枢轴新点（$\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$，斯托克斯边界浓缩与向心跨层跃升）**：
   在这团闭合的局部体积场 $\Lambda^3_\ell$ 中，凡在局部最短路森林里所辖子树规模不足 $k$ 个活跃顶点的节点，其最终最短距离已经在 $k$ 步波前内尘埃落定，当场作为内部体自由度被积分消去！唯有那些统领至少 $k$ 个活跃后代顶点的咽喉出口——至多只占边界规模 $\frac{1}{k}$ 的稀疏**枢轴点（Pivots）**——才承接整团局部体积的跨区通量（恰如[§29.9](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling)多胞内部对消后向边界浓缩的斯托克斯面纱），在 $\ell + 1$ 层粗粒化账本上收缩重整为一枚枚新的**点粒子（$\Lambda^0_{\ell+1}$）**！紧接着，高一层的递归过程直接在这些稀疏枢轴新点之间沿着圆盘深处的青色内割弦跨尺度飞跃，一口气免除了对底下 $(1 - \frac{1}{k})$ 绝大多数普通顶点的全局排序！

$$
\underbrace{\text{边界源点}}_{\Lambda^0_\ell\text{（点/粒子）}} \;\xrightarrow{\;k\text{ 步无序松弛}\;}\; \underbrace{\text{局部惠更斯波前}}_{\Lambda^2_\ell\text{（面/波）}} \;\xrightarrow{\;\text{热带幂等平衡}\;}\; \underbrace{\text{局部作用量闭合块}}_{\Lambda^3_\ell\text{（体/场）}} \;\equiv\; \underbrace{\text{稀疏枢轴新点}}_{\Lambda^0_{\ell+1}\text{（高一阶点）}}.
$$

::: {.viz src="trihedron-chord-pivot-tunneling-sandbox" preset="holographic-pivot-cone" height="520"}
**向心多尺度全息重整化锥实验卡（`holographic-pivot-cone`）。** 在三维八分球顶盖（$\epsilon = 90^\circ$）上，$N = 64$ 个青色谢尔宾斯基边界点（$\Lambda^0$）经品红波前面片（$\Lambda^2$）每 $k = 3$ 个凝聚为一颗紫色枢轴（$64 \to 22 \to 8 \to 3 \to 1$），由紫色树管逐层沉入体内至 $r = 0.707$（与青色内割弦中点 $\mathbf{M}$ 的 $r = 0.707$ 同深）；球壳 $r = 1$ 上的浅色细线描出 Dijkstra 结清全序，琥珀色标示唯一移动读头（全息锥对应属本书 `MODEL`，概念纤维分解 `concept_fiber_decomposition` 标绿色 `LEAN ✓`）。
:::

## 30.1.3 球面测地三角律、弦图消元补全与概念纤维分解的形式化定理及手算检验 {#sec-ch34-26-3}

在严格区分认识论层级的前提下，我们将本节涉及的五项有限维与一般内积/拓扑核心结构——**复射影富比尼—施图迪（Fubini–Study）测地夹角三角不等式、实拉格朗日—格拉姆双矢面积亏损恒等式、读出划分拓扑不可分核充要刻画、有限弦图按单纯顶点消元的半正定矩阵补全存在性，以及任意概念读出下的依赖和纤维分解**——汇总为经 `trureturing` Lean 4 内核验证的本节主定理：

::: {.theorem #thm-ch34-chord-tunneling-and-pivot-renormalization lean="D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle,D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity,D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel,D5/S3/QuadraticForms/ChordalPsdCompletion.exists_posSemidef_completion,D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition" title="富比尼—施图迪测地三角律、拉格朗日—格拉姆恒等式、划分不可分核、弦图单纯消元补全与概念纤维分解定理"}
在所钉 `trureturing` 冻结声明中，以下五项数学定理同时成立：

1. **复内积空间单位向量的富比尼—施图迪测地角三角不等式**（[`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle)）：设 $E$ 为复内积空间（`[NormedAddCommGroup E] [InnerProductSpace ℂ E]`），对任意 $x, y \in E$ 定义对标量相位不敏感的富比尼—施图迪夹角 $\operatorname{fsAngle}(x, y) := \arccos\lVert\langle x, y\rangle_{\mathbb{C}}\rVert \in \mathbb{R}$。则对任意满足 $\lVert a\rVert = 1$、$\lVert b\rVert = 1$、$\lVert c\rVert = 1$ 的三个单位向量 $a, b, c \in E$，恒有

   $$
   \operatorname{fsAngle}(a, c) \;\le\; \operatorname{fsAngle}(a, b) + \operatorname{fsAngle}(b, c);
   $$

2. **实向量对的拉格朗日—格拉姆双矢面积亏损恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）：对任意指标类型 $\iota$、有限子集 $s : \operatorname{Finset}\iota$ 以及实值函数 $u, v : \iota \to \mathbb{R}$，柯西—施瓦茨内积亏损精确等于两两反对称外积平方和的一半：

   $$
   \Bigl(\sum_{i \in s} u_i^2\Bigr)\Bigl(\sum_{i \in s} v_i^2\Bigr) - \Bigl(\sum_{i \in s} u_i v_i\Bigr)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s}(u_i v_j - u_j v_i)^2;
   $$

3. **观测读出划分拓扑不可分性与读出核等价刻画**（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：对任意状态类型 $X$、读出坐标类型 $B$、概念读出映射 $\operatorname{readout} : \operatorname{Concept} X B$（即 $X \to B$）以及任意两状态 $x, y \in X$，在由 $B$ 上离散拓扑拉回诱导的划分拓扑 $\operatorname{partitionTopology}(\operatorname{readout})$ 中，$x$ 与 $y$ 拓扑不可分当且仅当二者的读出值相等：

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\operatorname{readout})}(x, y) \;\Longleftrightarrow\; \operatorname{readout}(x) = \operatorname{readout}(y);
   $$

4. **有限弦图上团半正定实矩阵的全局半正定补全存在性**（[`exists_posSemidef_completion`](lean:D5/S3/QuadraticForms/ChordalPsdCompletion.exists_posSemidef_completion)）：设 $V$ 为有限顶点类型（`[Finite V]`，允许为空类型），$G : \operatorname{SimpleGraph} V$ 为弦图（`G.IsChordal`，即 $G$ 中每一条长度至少为 $4$ 的圈行走均存在连接该圈两非相邻顶点之间的弦边——两端点均在该圈上但不属于该圈边集的邻接边），$A \in M_{V\times V}(\mathbb{R})$ 为实矩阵。若对 $G$ 的每一个团 $C \subseteq V$（`G.IsClique C`），$A$ 限制在 $C$ 上的主子矩阵 $A.\operatorname{submatrix}(\operatorname{Subtype.val}, \operatorname{Subtype.val})$ 均为半正定矩阵（`PosSemidef`，无需假设各团子块非奇异），则必存在全局半正定实矩阵 $B \in M_{V\times V}(\mathbb{R})$（`B.PosSemidef`），保留 $A$ 的全部对角元与全部图边表项：

   $$
   \forall i, j \in V,\qquad \bigl(i = j \lor G.\operatorname{Adj}(i, j)\bigr) \;\Longrightarrow\; B_{ij} = A_{ij};
   $$

5. **任意概念读出映射下的典型概念纤维依赖和分解**（[`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)）：对任意源类型 $X$、基坐标类型 $B$ 与概念读出映射 $q_C : \operatorname{Concept} X B$，记各基坐标 $b \in B$ 上的概念余纤维为 $\operatorname{ConceptFiber}(q_C, b) := \operatorname{PSigma}(\lambda x : X \Rightarrow q_C(x) = b)$，则 $X$ 与全体余纤维依赖和之间的类型等价非空：

   $$
   \operatorname{Nonempty}\!\left(X \;\simeq\; \sum_{b : B} \operatorname{ConceptFiber}(q_C, b)\right).
   $$
:::

::: proof
第 1 款对复内积 $\langle a, b\rangle_{\mathbb{C}}$ 与 $\langle b, c\rangle_{\mathbb{C}}$ 分别选取模长为 $1$ 的相位对齐因子 $u, v \in \mathbb{C}$，转入底层实内积空间考察三单位向量 $(\overline{u}\cdot a,\, b,\, v\cdot c)$：此时前两段实内积分别等于 $\lVert\langle a, b\rangle_{\mathbb{C}}\rVert$ 与 $\lVert\langle b, c\rangle_{\mathbb{C}}\rVert$，而首尾实内积不超过模长 $\lVert\langle a, c\rangle_{\mathbb{C}}\rVert$，结合实内积空间无向夹角三角不等式与 $\arccos$ 在 $[-1, 1]$ 上的递减性即得结论（取实子空间嵌入 $\mathbb{R}^3 \hookrightarrow \mathbb{C}^3$ 及正交侧壁顶点 $a = \mathbf{A}(\epsilon),\, b = \mathbf{B},\, c = \mathbf{C}(\epsilon)$，左边即为顶盖大圆弧 $L_{\mathrm{cap}}(\epsilon)$，右边即为两扇侧壁弧长之和 $L_{\mathrm{walls}}(\epsilon) = 2\epsilon$）。第 2 款将右端反对称双和展开并交换求和指标 $i \leftrightarrow j$，直接化归为平方和乘积减去内积平方，锁定单位球面上两态弦向分离与内积亏损的精确代数关系。第 3 款与第 5 款刻画粗粒化重整化映射的商—纤维精确对偶：拉回离散拓扑中的单点纤维天然既开又闭，使同一读出核内的微观状态拓扑不可分，同时 `Equiv.sigmaFiberEquiv` 与 `Equiv.psigmaEquivSubtype` 将原空间 $X$ 无损重构为基空间坐标（对应下一层粗粒枢轴指标 $b \in B$）与各坐标上方内部纤维 $\operatorname{ConceptFiber}(q_C, b)$ 的依赖和。第 4 款对有限顶点集基数作强归纳：非空弦图由狄拉克（Dirac）极小团分隔子定理保证必含单纯顶点 $v$（其邻域构成完全团），归纳消去 $v$ 补全 $V \setminus \{v\}$ 上的诱导弦图后，利用等格拉姆压缩算子对齐邻域向量并补入一维正交残差坐标 $r = \sqrt{\lVert y_{\mathrm{root}}\rVert^2 - \lVert Z(y_{\mathrm{root}})\rVert^2}$ 完成全局格拉姆拼合。此处须恪守认识论边界：第 4 款在欧氏实内积空间中证明了沿单纯消元序的半正定矩阵存在性补全；有向图在热带 $(\min, +)$ 半环上的单顶点舒尔补行走压缩与下确界距离守恒紧接着由下方 [@prop-ch34-tropical-pivot-walk-distance] 给出机器验证，而比较—加法模型下的 $O(m\log^{2/3} n)$ 渐近算法时间复杂度上界仍属段然等人（2025）的计算机科学文献结论，不冒充内核已证复杂度定理。完整证明由 Lean 内核检查。
:::

::: {.proposition #prop-ch34-tropical-pivot-walk-distance lean="D5/S3/Combinatorics/Graph/Walks/TropicalSchurElimination.pivot_walks_and_distance" title="任意顶点类型有向箭图上单顶点热带舒尔补消元的行走压缩与下确界距离守恒"}
设 $V : \operatorname{Type}\;u$ 为任意宇宙层级的顶点类型（命题陈述无需假设 $V$ 有限，亦无需在 $V$ 上预设可判定相等实例），赋予完全有向箭图结构 $\operatorname{completeQuiver} V$（任意顶点对间态射类型为单点集 $\operatorname{PUnit}$，缺失有向边由扩展非负实数半环 $\mathbb{R}_{\ge 0}^\infty$ 中的无穷权值 $+\infty$ 表示）。给定边权函数 $W : V \to V \to \mathbb{R}_{\ge 0}^\infty$，记有向有限行走类型为 $\operatorname{Walk}(u, v) := \operatorname{Quiver.Path}(u, v)$，行走总权 $\operatorname{weight}(W, p) \in \mathbb{R}_{\ge 0}^\infty$ 对空行走取 $0$ 并沿有向边逐段累加，两点间的行走下确界距离定义为 $\operatorname{distance}(W, u, v) := \inf_{p : \operatorname{Walk}(u, v)} \operatorname{weight}(W, p)$（无需假设极小权行走可达）。选定待消去的内部顶点 $b : V$，在余下枢轴子类型 $V_{\neq b} := \{x : V \mid x \neq b\}$ 上定义单顶点热带 $(\min, +)$ 舒尔补边权算子

$$
\operatorname{schur}(W, b)(a, z) \;:=\; \min\bigl(W(a.\mathrm{val}, z.\mathrm{val}),\; W(a.\mathrm{val}, b) + W(b, z.\mathrm{val})\bigr).
$$

则对任意存活边界顶点 $a, z : V_{\neq b}$，下列三项结论同时成立（[`pivot_walks_and_distance`](lean:D5/S3/Combinatorics/Graph/Walks/TropicalSchurElimination.pivot_walks_and_distance)）：

1. **正向行走捷径压缩**：对原图中的任意有限行走 $p : \operatorname{Walk}(a.\mathrm{val}, z.\mathrm{val})$，在消元子图 $V_{\neq b}$ 上必存在有限行走 $q : \operatorname{Walk}(a, z)$，使得 $\operatorname{weight}\bigl(\operatorname{schur}(W, b),\, q\bigr) \le \operatorname{weight}(W, p)$；
2. **逆向行走精确展开**：对消元子图上的任意有限行走 $q : \operatorname{Walk}(a, z)$，在原图 $V$ 上必存在有限行走 $p : \operatorname{Walk}(a.\mathrm{val}, z.\mathrm{val})$，使得 $\operatorname{weight}(W, p) = \operatorname{weight}\bigl(\operatorname{schur}(W, b),\, q\bigr)$；
3. **行走下确界距离精确守恒**：$\operatorname{distance}\bigl(\operatorname{schur}(W, b),\, a,\, z\bigr) = \operatorname{distance}(W,\, a.\mathrm{val},\, z.\mathrm{val})$。
:::

::: proof
正向压缩沿原行走 $p$ 作结构归纳，并在中间步对顶点是否命中消元点 $b$ 作经典排中分案（`by_cases`）：凡接连穿过 $u \to b \to w$ 的两步内跳均被舒尔边权 $\operatorname{schur}(W, b)(u, w) \le W(u.\mathrm{val}, b) + W(b, w.\mathrm{val})$ 单步吸收，而任何在 $b$ 处原地盘旋的非负权短环 $b \to \dots \to b$ 因 $\mathbb{R}_{\ge 0}^\infty$ 加法单调非负而在删去后绝不增大总权。逆向展开对约化行走 $q$ 逐边归纳：由全序性，$\operatorname{schur}(W, b)(u, w)$ 必等于外表面直连边权 $W(u.\mathrm{val}, w.\mathrm{val})$（取原图单边行走）或两步穿底边权和 $W(u.\mathrm{val}, b) + W(b, w.\mathrm{val})$（取原图经由 $b$ 的双边行走 $u.\mathrm{val} \to b \to w.\mathrm{val}$），逐段拼接即得等权原图行走 $p$。最后在完备格 $\mathbb{R}_{\ge 0}^\infty$ 上对两侧行走下确界 `⨅` 应用反对称律（`le_antisymm`），无需有限性或最短路存在性假设即锁定 $\operatorname{distance}$ 恒等；对有限内部顶点集顺次复合该单步算子即可消去整团局部内部节点（认识论边界：本命题锁定单顶点热带舒尔消元的精确距离不变性，而多层分治调度的 $O(m\log^{2/3} n)$ 时间界属外部算法文献结论）。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch34-trihedron-chord-and-tropical-schur title="圆弧体三级路径严格不等式、五档角度六位小数基准表与六顶点有向图热带舒尔补消元（手工推导与数值核验）"}
我们分三步把本节的连续球面几何不等式、精确六位小数基准读数与离散有向图无排序消元算例逐项手算到底：

1. **对一切 $\epsilon \in (0, \frac{\pi}{2}]$ 严格成立的 $L_{\mathrm{tunnel}}(\epsilon) < L_{\mathrm{cap}}(\epsilon) < L_{\mathrm{walls}}(\epsilon)$ 与 $\Delta r_{\mathrm{bulk}}(\epsilon) > 0$ 初等证明**：
   - **第二步严格小于第三步（$L_{\mathrm{cap}}(\epsilon) < L_{\mathrm{walls}}(\epsilon)$）**：当 $\epsilon \in (0, \frac{\pi}{2}]$ 时，$\sin\epsilon > 0$，故 $1 - \cos^2\epsilon = \sin^2\epsilon > 0$。代入二倍角余弦公式得

     $$
     \cos(2\epsilon) \;=\; 2\cos^2\epsilon - 1 \;=\; \cos^2\epsilon - (1 - \cos^2\epsilon) \;=\; \cos^2\epsilon - \sin^2\epsilon \;<\; \cos^2\epsilon.
     $$

     注意到 $\cos(2\epsilon), \cos^2\epsilon \in [-1, 1]$ 且 $2\epsilon \in (0, \pi]$ 恰好落在主值反余弦 $\arccos : [-1, 1] \to [0, \pi]$ 的严格单调递减值域内（满足 $\arccos(\cos(2\epsilon)) = 2\epsilon$），两边同取 $\arccos$ 立得 $L_{\mathrm{cap}}(\epsilon) = \arccos(\cos^2\epsilon) < 2\epsilon = L_{\mathrm{walls}}(\epsilon)$。
   - **第一步严格小于第二步（$L_{\mathrm{tunnel}}(\epsilon) < L_{\mathrm{cap}}(\epsilon)$）**：由 $\mathbf{A}(\epsilon) = (\sin\epsilon, \cos\epsilon, 0)$ 与 $\mathbf{C}(\epsilon) = (0, \cos\epsilon, \sin\epsilon)$ 直接求欧氏距离，得内割直弦长 $L_{\mathrm{tunnel}}(\epsilon) = \lVert\mathbf{A}(\epsilon) - \mathbf{C}(\epsilon)\rVert = \sqrt{\sin^2\epsilon + 0 + \sin^2\epsilon} = \sqrt{2}\sin\epsilon$。另一方面，因 $L_{\mathrm{cap}}(\epsilon) \in (0, \frac{\pi}{2}]$，半角 $x := \frac{1}{2}L_{\mathrm{cap}}(\epsilon) \in (0, \frac{\pi}{4}]$ 严格为正；由半角正弦恒等式 $\sin x = \sqrt{\frac{1}{2}(1 - \cos L_{\mathrm{cap}}(\epsilon))} = \sqrt{\frac{1}{2}(1 - \cos^2\epsilon)} = \frac{\sqrt{2}}{2}\sin\epsilon$ 及初等严格不等式 $\sin x < x$（$\forall x > 0$），立得

     $$
     L_{\mathrm{tunnel}}(\epsilon) \;=\; \sqrt{2}\sin\epsilon \;=\; 2\sin\!\left(\frac{L_{\mathrm{cap}}(\epsilon)}{2}\right) \;<\; 2\cdot\frac{L_{\mathrm{cap}}(\epsilon)}{2} \;=\; L_{\mathrm{cap}}(\epsilon).
     $$

   - **内割弦中点潜入球肚的精确径向深度 $\Delta r_{\mathrm{bulk}}(\epsilon) > 0$**：沿直弦参数线段 $\mathbf{x}(t) = (1 - t)\mathbf{A}(\epsilon) + t\mathbf{C}(\epsilon)$（$t \in [0, 1]$），欧氏模方 $\lVert\mathbf{x}(t)\rVert^2 = 1 - 2t(1 - t)\sin^2\epsilon$ 在中点 $t = \frac{1}{2}$ 处取唯一极小值 $\lVert\mathbf{M}(\epsilon)\rVert^2 = 1 - \frac{1}{2}\sin^2\epsilon = \frac{1 + \cos^2\epsilon}{2} < 1$，故穿底最大径向体深度为 $\Delta r_{\mathrm{bulk}}(\epsilon) = 1 - \sqrt{\frac{1 + \cos^2\epsilon}{2}} > 0$。

2. **五档步长 $\epsilon \in \{15^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$ 的精确根式与六位小数基准对照表**（四舍五入至小数点后第 $6$ 位）：
   - 在 $\epsilon = 15^\circ = \frac{\pi}{12}$ 时，$L_{\mathrm{tunnel}}(15^\circ) = \frac{\sqrt{3}-1}{2} \approx 0.366025$，$L_{\mathrm{cap}}(15^\circ) = \arccos\frac{2+\sqrt{3}}{4} \approx 0.368100$，$L_{\mathrm{walls}}(15^\circ) = \frac{\pi}{6} \approx 0.523599$，体深度 $\Delta r_{\mathrm{bulk}}(15^\circ) = 1 - \frac{\sqrt{12+2\sqrt{3}}}{4} \approx 0.016889$，较爬墙省去 $1 - \frac{3(\sqrt{3}-1)}{\pi} \approx 0.300943$（$30.09\%$）；
   - 在 $\epsilon = 45^\circ = \frac{\pi}{4}$ 时，内割直弦恰为单位长 $L_{\mathrm{tunnel}}(45^\circ) = 1.000000$，顶盖弧 $L_{\mathrm{cap}}(45^\circ) = \frac{\pi}{3} \approx 1.047198$，侧壁折线 $L_{\mathrm{walls}}(45^\circ) = \frac{\pi}{2} \approx 1.570796$，体深度 $\Delta r_{\mathrm{bulk}}(45^\circ) = 1 - \frac{\sqrt{3}}{2} \approx 0.133975$，较爬墙省去 $1 - \frac{2}{\pi} \approx 0.363380$（$36.34\%$）；
   - 在宏观八分球极限 $\epsilon = 90^\circ = \frac{\pi}{2}$ 时，$L_{\mathrm{walls}}(90^\circ) = \pi \approx 3.141593$，$L_{\mathrm{cap}}(90^\circ) = \frac{\pi}{2} \approx 1.570796$，$L_{\mathrm{tunnel}}(90^\circ) = \sqrt{2} \approx 1.414214$，体深度 $\Delta r_{\mathrm{bulk}}(90^\circ) = 1 - \frac{1}{\sqrt{2}} \approx 0.292893$，较爬墙足足省去 $1 - \frac{\sqrt{2}}{\pi} \approx 0.549842$（$54.98\%$）！

| 步长角 $\epsilon$ | 侧壁爬行 $L_{\mathrm{walls}} = 2\epsilon$ | 顶盖测地弧 $L_{\mathrm{cap}} = \arccos(\cos^2\epsilon)$ | 内割隧穿弦 $L_{\mathrm{tunnel}} = \sqrt{2}\sin\epsilon$ | 穿底体深度 $\Delta r_{\mathrm{bulk}}$ | 割弦节省率 $1 - L_{\mathrm{tunnel}}/L_{\mathrm{walls}}$ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **$15^\circ$（$\pi/12$）** | $0.523599$ | $0.368100$ | $0.366025$ | $0.016889$ | $0.300943$（$30.09\%$） |
| **$30^\circ$（$\pi/6$）** | $1.047198$ | $0.722734$ | $0.707107$ | $0.064586$ | $0.324763$（$32.48\%$） |
| **$45^\circ$（$\pi/4$）** | $1.570796$ | $1.047198$ | $1.000000$ | $0.133975$ | $0.363380$（$36.34\%$） |
| **$60^\circ$（$\pi/3$）** | $2.094395$ | $1.318116$ | $1.224745$ | $0.209431$ | $0.415227$（$41.52\%$） |
| **$90^\circ$（$\pi/2$）** | $3.141593$ | $1.570796$ | $1.414214$ | $0.292893$ | $0.549842$（$54.98\%$） |

3. **六顶点有向图的局部 $k$ 步无序松弛与热带舒尔补消元手算**：
   考察顶点集 $V_6 = \{p_1, b_1, b_2, b_3, b_4, p_2\}$，其中 $p_1, p_2$ 为两枚边界枢轴点，$\mathrm{Interior} = \{b_1, b_2, b_3, b_4\}$ 为待消元的 $4$ 个局部内部点。给定正实权有向边：外表面直连边 $w(p_1 \to p_2) = 11$；入口边 $w(p_1 \to b_1) = 2$、$w(p_1 \to b_2) = 5$；内部边含次优绕路与一条正权短有向环（$b_2 \leftrightarrow b_3$，环长 $2 + 1 = 3 > 0$），具体为 $w(b_1 \to b_2) = 1$、$w(b_1 \to b_4) = 6$、$w(b_2 \to b_3) = 2$、$w(b_3 \to b_2) = 1$、$w(b_3 \to b_4) = 1$；出口边为 $w(b_2 \to p_2) = 6$、$w(b_3 \to p_2) = 4$、$w(b_4 \to p_2) = 1$（无边记为 $+\infty$）。
   - **第一阶段（$k = 4$ 步局部无序并行波前松弛，零优先队列比较）**：从 $p_1$（初值 $0$）对内部子图做 $4$ 轮同步松弛：第 $1$ 轮得 $(d^{(1)}_{b_1}, d^{(1)}_{b_2}, d^{(1)}_{b_3}, d^{(1)}_{b_4}) = (2, 5, +\infty, +\infty)$；第 $2$ 轮并行更新得 $(2, \min(5, 2+1), 5+2, 2+6) = (2, 3, 7, 8)$（次优直跳边 $5$ 自动被 $2+1=3$ 覆盖）；第 $3$ 轮并行更新得 $(2, \min(3, 7+1), \min(7, 3+2), \min(8, 7+1)) = (2, 3, 5, 8)$（正权短环 $b_2 \to b_3 \to b_2$ 试图回写 $8$，被热带幂等律 $\min(3, 8) = 3$ 静默吸收）；第 $4$ 轮平衡收敛于内部作用量势场不动点

     $$
     \bigl(W^{\mathrm{relax}}_{p_1 b_1},\; W^{\mathrm{relax}}_{p_1 b_2},\; W^{\mathrm{relax}}_{p_1 b_3},\; W^{\mathrm{relax}}_{p_1 b_4}\bigr) \;=\; (2,\; 3,\; 5,\; 6).
     $$

   - **第二阶段（热带舒尔补消去全部 $4$ 个内部顶点，合成单条内割有效弦）**：完全不必对 $\{b_1, b_2, b_3, b_4\}$ 与外部远方节点做全局堆排序，直接沿出口边压缩求极小：

     $$
     W_{\mathrm{eff}}(p_1, p_2) \;=\; \min\!\Bigl(11,\; \min\bigl(2 + \infty,\; 3 + 6,\; 5 + 4,\; 6 + 1\bigr)\Bigr) \;=\; \min\bigl(11,\; \min(+\infty, 9, 9, 7)\bigr) \;=\; 7.
     $$

     $4$ 枚内部点连同内部短环被一次性折叠为单条有效割弦 $p_1 \xrightarrow{7} p_2$，将外表面直跳代价 $11$（以及单步浅层内跳代价 $9$）一步削减至全局精确最短路 $7$（对应微观折线 $p_1 \to b_1 \to b_2 \to b_3 \to b_4 \to p_2$：$2 + 1 + 2 + 1 + 1 = 7$）！代数上，对内部点集 $\{b_1, b_2, b_3, b_4\}$ 顺次迭代四次 [@prop-ch34-tropical-pivot-walk-distance] 的单顶点热带舒尔消元算子 $\operatorname{schur}(\cdot, b_i)$，即机器验证地保证枢轴对 $(p_1, p_2)$ 间的行走下确界距离精确守恒为 $W_{\mathrm{eff}}(p_1, p_2) = 7$（而全局多层调度的确定性 $O(m\log^{2/3} n)$ 渐近复杂度上界仍属段然等人 2025 年的算法文献结论）。
:::

## 30.1.4 与量子隧穿的三重同源：阿格蒙瞬子测地线、悬置排序抗芝诺阻尼与共振枢轴中继 {#sec-ch34-26-4}

为什么章首原声命题断言，这套最短路径突破在路径积分底层“**恰恰就是悬置中间测量、经由虚数盲区 $\hat{\mathbf{i}}$ 穿透势垒的量子隧穿（瞬子捷径）**”？这不是表面的辞藻联想，而是横跨**变分方程、观测去相干与多尺度散射**的三重数学物理同源（第一重是文献中的数学恒等，后两重是类比）（`MODEL` + `文献结果，未在本书形式化`）：

1. **第一重同源（数学泛函恒等）：威克虚数旋转下的阿格蒙（Agmon）欧氏瞬子作用量字面就是最短路径泛函**：
   在经典允许区 $E > V(x)$ 中，动量 $p(x) = \sqrt{2m(E - V(x))}$ 为实数，费曼路径积分累加振荡旋转器相因子 $\exp\bigl(\frac{i}{\hbar}\int_\Gamma p\,ds\bigr)$。一旦撞上高耸的势垒 $V(x) > E$，经典实轨迹被迫在转折点碰壁折返；然而在量子力学中，动量解析延拓进正交虚数盲区 $p(x) \mapsto \hat{\mathbf{i}}\sqrt{2m(V(x) - E)}$（等价于威克虚时间旋转 $t \mapsto -i\tau$），振荡相位瞬间翻转为实指数衰减权重 $\exp(-S_E[\Gamma]/\hbar)$！在半经典极限 $\hbar \to 0^+$（热带去量子化极限 $-\hbar\ln\sum_\alpha e^{-S_\alpha/\hbar} \to \min_\alpha S_\alpha$）下，一切绕远路的势垒下轨迹都被指数级抹杀，唯一主导隧穿振幅的**欧氏瞬子（Instanton）鞍点轨迹**，字面解的正是以**阿格蒙度规** $ds_{\mathrm{Agmon}} = \sqrt{2m(V(x) - E)}\,ds$ 为边权的**单源最短路径问题**：

   $$
   \exp\!\left(\frac{i}{\hbar}\int_\Gamma p\,ds\right) \;\xrightarrow{\;p \,\mapsto\, \hat{\mathbf{i}}\sqrt{2m(V-E)}\;}\; \exp\!\left(-\frac{S_E[\Gamma]}{\hbar}\right), \qquad S_E^*(A \to C) \;=\; \min_{\Gamma : A \to C} \int_\Gamma \sqrt{2m\bigl(V(x) - E\bigr)}\,ds!
   $$

   圆弧体肚内那条跌破单位球壳（$\lVert\mathbf{x}\rVert < 1$）的青色内割直弦 $\overline{AC}$，在几何上恰恰对应穿过经典禁戒势垒底部的阿格蒙瞬子测地捷径！
2. **第二重同源（测量动力学类比）：在 $k$ 步窗口内悬置全局排序，类比于撤除高频投影监测以解除量子芝诺冻结**：
   既然势垒底下一直横着那条更短的内割弦，为什么传统 Dijkstra 四十年来视而不见？回想[第七章](ch07-geometric-time-and-speed-limits.md)揭示的**量子芝诺效应（Quantum Zeno Effect）**：只要外部观察者以极高频率反复追问投影读数“此刻粒子究竟在哪一格？”，连续的去相干捏合就会实时斩断非对角二向量旋转面积，把量子隧穿死死冻结在零概率上！传统全局堆算法每松弛一步就向全图追问“此刻谁是全局第一名”，正是算法世界里的**高频芝诺投影监控**——它迫使状态处处留在完全排好经典名次的正交侧壁上，寸步不得潜入未定序盲区。反过来，新算法在 $k$ 步局部窗口内**悬置全局序测量**，允许内部点在不排名的叠加松弛态中自由干涉对消，恰恰是撤去中间芝诺监控锁、放行跨势垒隧穿的计算实现（关于虚数盲区弦与实测去相干的更深层相位机制，我们将在紧随其后的[§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit)继续推演）！
3. **第三重同源（多尺度中继类比）：稀疏枢轴（Pivots）类比于法布里—珀罗（Fabry–Pérot）共振隧穿准束缚中继站**：
   反过来问：既然悬置排序能隧穿，为什么不干脆把窗口放宽到整张图（$k = n$，彻底退化为全局贝尔曼—福特）？物理答案同样一针见血：面对一堵厚度趋于无穷的宽势垒，毫无中继的单次盲目隧穿振幅会随厚度指数衰减归零——对应全局贝尔曼—福特在深层网络中沦为 $O(mn)$ 的漫散波耗散！介观凝聚态物理中，朱兆祥与江崎玲於奈（Tsu & Esaki, 1973）发现大自然穿透厚势垒的绝技是**共振隧穿（Resonant Tunneling）**：在厚势垒内部每隔固定尺度布设一座双势垒量子阱（法布里—珀罗谐振腔），让衰减波在准束缚能级上锁相驻波放大，再接力隧穿下一段势垒，透射率竟可直逼 $100\%$！算法中统领子树规模 $\ge k$ 的稀疏**枢轴点**，扮演的分毫不差就是这排**共振锁相中继站**——只在至多 $\lvert U\rvert / k$ 个高容量枢轴节点上重新锚定实距离，把厚重势垒切分为一段段可控的 $k$ 步相干隧穿窗，既打碎了 $n\log n$ 的芝诺排序墙，又锁住了 $O(m\log^{2/3} n)$ 的零耗散确定性收敛！

下表将“传统全局排序爬壁态”与“枢轴波前重整穿弧隧穿态”在五个维度上一一对齐：

| 对照维度 | 传统全局排序寻路（经典爬壁态） | 枢轴波前重整突破（穿弧隧穿态） |
| :--- | :--- | :--- |
| **1. 圆弧体几何轨迹** | 贴着两扇正交侧壁 $OAB \cup OBC$ 逐点直角爬行，$L_{\mathrm{walls}}(\epsilon) = 2\epsilon$ | 先沿品红球面顶盖铺开波前（$L_{\mathrm{cap}} = \arccos(\cos^2\epsilon)$），再切入青色平直内割弦面穿底跳跃，$L_{\mathrm{tunnel}}(\epsilon) = \sqrt{2}\sin\epsilon$ |
| **2. 外代数与八度层级** | 囚禁在同层“点 $\leftrightarrow$ 线”（$\Lambda^0_\ell \leftrightarrow \Lambda^1_\ell$）单列粒子排队循环 | 走完“点化波 $\Lambda^2_\ell \to$ 波凝场 $\Lambda^3_\ell \to$ 体缩为高一阶枢轴新点 $\Lambda^0_{\ell+1}$”全息八度重整化 |
| **3. 观测与芝诺动力学** | 每步强行提取全局最小名次（高频投影去相干），触发算法芝诺冻结与 $\Omega(n\log n)$ 排序税 | 在 $k$ 步局部窗口内悬置全局序测量，借热带 $\min$ 幂等相消绕开非瓶颈内部点的全局比序 |
| **4. 路径积分与作用量同源** | 经典实动量粒子在势垒前折返，被迫沿外表面曲率山脊绕行 | 威克虚数旋转下沿阿格蒙度规取欧氏瞬子极小测地线 $\min_\Gamma \int_\Gamma \sqrt{2m(V-E)}\,ds$ |
| **5. 多尺度中继与时间复杂度** | 全图 $n$ 个顶点逐一进出全局优先队列，稀疏实权有向图受困于 $O(m + n\log n)$ | 稀疏枢轴（子树规模 $\ge k$）充当法布里—珀罗共振隧穿中继站，确定性复杂度突破至 $O(m\log^{2/3} n)$（`文献结果`） |

::: {.viz src="trihedron-chord-pivot-tunneling-sandbox" preset="resonant-pivot-relay" height="520"}
**阿格蒙瞬子捷径与法布里—珀罗共振枢轴中继实验卡（`resonant-pivot-relay`）。** 在 $\epsilon = 75^\circ$ 的三维圆弧体舞台中，无中继厚势垒透射率跌至 $T_{\mathrm{thick}} = 7.18 \times 10^{-5}$（$\kappa L = 5.46$），而青色瞬子内割弦穿过两段紫色半势垒，在弦中点 $\mathbf{M}$ 借带琥珀色当前高亮环的紫色共振枢轴将透射率拉回 $T = 1.0000$，琥珀色同时标示移动读头（瞬子与共振中继类比标 `MODEL`，复杂度与物理文献标 `ARGUED`）。
:::

::: {.remark #rem-ch34-sssp-sorting-barrier-and-instanton-literature title="最短路径排序壁垒突破、阿格蒙瞬子度规与全息张量网络重整化（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节严守三层认识论边界，将经典与前沿文献结论同本书内核验证定理及几何模型明确区分如下：

1. **单源最短路径（SSSP）与排序壁垒文献**：戴克斯特拉（Dijkstra, *Numer. Math.* **1**, 269–271, 1959）创立非负权贪心波前算法；弗雷德曼与塔扬（Fredman & Tarjan, *J. ACM* **34**, 596–615, 1987）以斐波那契堆实现比较—加法模型下的 $O(m + n\log n)$ 上界；海乌普勒等（Haeupler, Hladík, Rozhoň, Tarjan & Tětek, *FOCS 2024*）证明在要求按距离顺序输出全体顶点的前提下，配工作集堆的 Dijkstra 具有普遍最优性；段然、毛嘉怡、毛啸、束欣凯与尹龙晖（Duan, Mao, Mao, Shu & Yin, *STOC 2025* Best Paper, DOI `10.1145/3717823.3718179`, `arXiv:2504.17033`）给出有向非负实权图在比较—加法模型下的确定性 $O(m\log^{2/3} n)$ 单源最短路径算法。此处有一条至关重要的信息论边界必须交代清楚：**计算单源最短路径距离值（及最短路树）之所以能突破 $O(m + n\log n)$（在 $m = O(n)$ 的稀疏图上达到 $o(n\log n)$），恰恰因为它不需要按距离从小到大的排好序列表输出全部 $n$ 个顶点**——若强制要求输出全体顶点的距离全序排列，比较排序的信息论下界 $\Omega(n\log n)$ 依然严格有效；
2. **欧氏瞬子、阿格蒙度规、芝诺冻结、共振隧穿与 MERA 全息文献**：阿格蒙（Agmon, *Lectures on Exponential Decay of Solutions of Second-Order Elliptic Equations*, Princeton Univ. Press, 1982）建立势垒禁戒区 $V(x) > E$ 上的黎曼度规 $ds_{\mathrm{Agmon}}^2 = 2m(V(x)-E)_+\,dx^2$ 与指数衰减测地界；科尔曼（Coleman, *Phys. Rev. D* **15**, 2929, 1977）奠定虚时间欧氏瞬子半经典隧穿理论；米斯拉与苏达山（Misra & Sudarshan, *J. Math. Phys.* **18**, 756, 1977）严格表述高频投影观测下的量子芝诺效应；朱兆祥与江崎玲於奈（Tsu & Esaki, *Appl. Phys. Lett.* **22**, 562, 1973）提出超晶格有限多势垒准束缚态共振隧穿；维达尔（Vidal, *Phys. Rev. Lett.* **99**, 220405, 2007）与斯温格尔（Swingle, *Phys. Rev. D* **86**, 065007, 2012）建立多尺度纠缠重整化拟设（MERA）及其离散双曲全息几何对应；
3. **本书内核锚点（`LEAN ✓`）与原创几何模型（`MODEL`）**：[@thm-ch34-chord-tunneling-and-pivot-renormalization] 锁定富比尼—施图迪测地三角律、拉格朗日—格拉姆恒等式、划分不可分核、弦图单纯消元半正定补全与概念纤维分解五项有限维/拓扑骨架，[@prop-ch34-tropical-pivot-walk-distance]（`pivot_walks_and_distance`）进一步在宇宙多态任意顶点类型上锁定单顶点热带 $(\min, +)$ 舒尔补消元的行走压缩与下确界距离精确守恒；而将 SSSP 的“爬墙—顶盖波前—内割弦消元—稀疏枢轴递归”映射至极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的三张几何面、`1—3—3—1` 点体八度重整化以及阿格蒙瞬子/共振隧穿中继，则属本书原创跨学科几何诠释模型（`MODEL`）。
:::

在离开本节之前，不妨走进下方的完整交互实验室，亲手做两个令整幅图景豁然贯通的动作：第一，在三维极小圆弧体视图中把步长角 $\epsilon$ 推大，凝视向外鼓起的**品红球面顶盖**与切在球肚里的**青色平直内割弦面**之间那弯清晰可见的新月形空隙——那弯被削掉的曲率鼓包，就是省去逐点排队所免缴的几何税；第二，在全息重整化锥视图中把局部窗口步数从 $k = 1$ 拨向 $k = 3$，目睹外圈密密麻麻的青色边界节点如何跨过品红波前面片、逐层凝成稀疏的紫色枢轴新点，并顺着紫色树管沉入与青色内割弦中点 $\mathbf{M}$ 同深的体内，引导琥珀色读头跨尺度一跃而过。而在下一节[§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit)中，我们将顺着这根潜入球肚盲区的内割弦继续追问：**当穿过虚数盲区 $\hat{\mathbf{i}}$ 的瞬子捷径在时间轴上张开双缝时，“虚弦隧穿”与“时间双缝干涉”将如何揭示同一枚圆弧体在观测前后的波粒真容？**

::: {.viz src="trihedron-chord-pivot-tunneling-sandbox" height="640"}
**圆弧体内割弦面、枢轴八度重整化与瞬子隧穿：完整实验室。** 自由切换双壁、顶盖、内割弦、多尺度枢轴锥与共振中继五大三维场景，连续调节步长角 $\epsilon \in [10^\circ, 90^\circ]$、局部窗口步数 $k \in \{1, 2, 3, 4\}$、叶子规模 $N = 2^D$ 与芝诺探针（紫色绘出正交双壁、全局排序环与多尺度枢轴，品红绘出外凸顶盖与新月形曲率鼓包，青色绘出穿底内割弦与边界点，琥珀色仅标示当前读头与可拖动手柄），同屏对照底部辅助曲线条（含三条 $\log_{10} T$ 透射曲线）、六顶点热带舒尔补消元账本与五枚绿色 `LEAN ✓` 冻结定理依据框。
:::
