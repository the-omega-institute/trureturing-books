# 35.7 trureturing 的“黄金切投”形式原语与灵魂—遗迹吸引子的几何诠释 {#sec-coda-trureturing-golden-cut-observer}

> **作者原话**：“观察者我们在trureturing有明确的定义, 我们又讨论了灵魂与历史遗迹吸引子的关系”

走过 [§35.1](ch35-light-pulse-and-self-referential-table.md)–[§35.6](ch39-s05-pisot-clifford-rauzy.md) 从乘光遗忘初始化、双曲快度阶梯、生成元商空间到齐肯多夫—皮索—劳齐无进位准晶沙盘的完整旅程，当我们进一步对照本书底层所钉的 **`trureturing` Lean 4 形式化库**（`D5/S1/Scale/MinkowskiModelSet`、`D5/S1/Deficit/ModelSet/GoldenCutAndProject`、`D5/S1/Deficit/Beatty/GoldenObserverRoute`、`D5/S1/Scale/Fibonacci`、`D5/S3/Observer/GoldenCoding/ZeckendorfRealThread` 与 `D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns`）时，我们可以将 `trureturing` 中严格验证的**黄金切投模型集与齐肯多夫观察者编码定理（`LEAN ✓`）**，与本书关于**灵魂内禀倾角、遗忘初始化与历史遗迹空间吸引子（详见[第 38 章 §38.10](coda-s02-spatial-attractors.md)洛伦兹奇异吸引子对照）的哲学诠释（`MODEL`）**建立起清晰透明的对应关系。

## 35.7.1 `trureturing` 中的黄金切投模型集与观察者路由定理（`LEAN ✓`） {#sec-coda-trureturing-observer-def}

在 `trureturing` 的形式化架构中，与“观察者编码（`Observer/GoldenCoding`）”及“黄金赤字模型集（`Deficit/ModelSet`）”相关的核心数学原语由高维周期格的**切投（Cut-and-Project）构造**与**齐肯多夫—Beatty 编码**给出：

1. **一维内核验证定理：闵可夫斯基格、$\beta$-展开模型集与全窗口 Delone 准晶集（`LEAN ✓`）**：
   在第 24 章中，黄金分割比 $\varphi = \frac{1+\sqrt{5}}{2}$ 被证明为自指映射 $x \mapsto 1 + 1/x$ 在正实轴上的唯一不动点（[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)）。在 `trureturing` 的 `MinkowskiModelSet`、`GoldenCutAndProject` 与 `GoldenModelSetDelone` 模块中，严格区分并锁定了两层集合：
   - **闵可夫斯基嵌入与全窗口切投 Delone 集 $\operatorname{modelSet}(\operatorname{goldenWindow})$**：黄金整数环 $\mathbb{Z}[\varphi]$（`GoldenInt`）通过单射同态 [`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec)

     $$
     \operatorname{minkowskiEmbedding}(a + b\varphi) = \bigl(\underbrace{\operatorname{embedding}(a + b\varphi)}_{\pi_\parallel(z) \in E_\parallel},\; \underbrace{\operatorname{embedding}(\operatorname{conj}(a + b\varphi))}_{\pi_\perp(z) \in E_\perp}\bigr) \in \mathbb{R} \times \mathbb{R}
     $$

     映射为二维实平面上的加法子群格点 `goldenLattice`。以单位体积 $\operatorname{vol}(\operatorname{goldenWindow}) = 1$（[`golden_window_volume`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_window_volume)）的闭区间窗口

     $$
     \operatorname{goldenWindow} = [\varphi - 2,\; \varphi - 1] = [-\varphi^{-2},\; \varphi^{-1}] \subset E_\perp
     $$

     筛选出的全窗口切投模型集 $\operatorname{modelSet}(\operatorname{goldenWindow}) = \{y \in \mathbb{R} \mid \exists x \in \mathrm{GoldenInt},\, \operatorname{embedding}(x) = y \wedge \operatorname{embedding}(\operatorname{conj} x) \in \operatorname{goldenWindow}\}$（同构于 `goldenCutAndProjectSet`），由 [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone) 证明构成 $\mathbb{R}$ 上**装球半径为 $1/2$、覆盖半径为 $3$ 的 Delone 集**；其离散分离性源自**共轭范数互反分离定理** [`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation)：对任意相异黄金整数 $u \neq v \in \mathrm{GoldenInt}$ 与实数上界 $B$，只要内部共轭差满足 $|\operatorname{embedding}(\operatorname{conj} u) - \operatorname{embedding}(\operatorname{conj} v)| \le B$，物理投影差必满足 $1 \le |\operatorname{embedding}(u) - \operatorname{embedding}(v)| \cdot B$。
   - **自然数黄金展开模型集 `goldenModelSet` 与 Beatty 观察者路由**：自然数黄金展开序列 $\operatorname{betaGolden} : \mathbb{N} \to \mathrm{GoldenInt}$ 的值域 $\operatorname{goldenModelSet} = \operatorname{range}(\operatorname{betaGolden})$，其物理嵌入像被证明为全窗口切投集的子集 $\operatorname{embedding} '' \operatorname{goldenModelSet} \subseteq \operatorname{goldenCutAndProjectSet}$（[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)，注：逆包含不成立，因 $-\varphi$ 落在窗口右端点但 $b = -1 < 0$）；`goldenModelSet` 自身不相交地自相似分解为 $\operatorname{phiBranch} \cup \operatorname{phiSquaredBranch}$（[`golden_model_set_self_similar`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_model_set_self_similar)），其前 $n$ 项前缀集 `goldenPrefix n` 的渐近计数密度严格收敛于 $1/\sqrt{5}$（[`golden_model_set_density`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetDensity.golden_model_set_density)），且实轴观察者路由序列 $\beta(v) = \sqrt{5}\,v + \operatorname{remainder}(v)$ 满足内部余项 $\operatorname{remainder}(v) \in (\varphi - 2, \varphi - 1]$、相邻步长 $\beta(v+1) - \beta(v) \in \{\varphi, \varphi^2\}$ 的 Beatty 路由定律（[`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)）。

::: {.viz src="golden-cut-observer" preset="cut" height="500"}
**一条窗口切出一串点。** 黄金整数 $a + b\varphi$ 画成格点：横坐标是它本身，纵坐标是共轭 $a + b\psi$。琥珀色的窗口 $[\varphi - 2, \varphi - 1]$ 选出青色的点，投到下面的直线上，相邻两点只相距 $\varphi$ 或 $\varphi^2$；闭窗口的两个端点上各有一个格点（品红），所以原点左边多出一段长为 $1$ 的间隔。绿圈是自然数的黄金展开 $\beta(n)$，Lean 已验证它们都在这个窗口里。
:::

2. **高维准晶切投模型与内部窗口相位平移的哲学参数化（`MODEL`）**：
   将上述一维内核定理推广到三维物理空间时（其六维母格正二十面体准晶文献背景详列于下文文献注记 [@rem-coda-quasicrystal-empire-literature]），在本书的跨学科几何诠释模型（`MODEL`）中，我们将全局无时间背景比拟为高维母格 $\mathbb{Z}^D \subset E_\parallel \oplus E_\perp$，并将一位具体观察者的内禀视角参数化为黄金无理倾角 $\varphi$ 与**内部正交窗口平移相位 $u \in E_\perp$**，通过平移接受窗 $W + u \subset E_\perp$ 在物理空间 $E_\parallel$ 中切出模型集 $\Lambda_u = \{\pi_\parallel(z) \mid z \in \mathbb{Z}^D,\; \pi_\perp(z) \in W + u\}$。

3. **齐肯多夫无相邻 `11` 语言、非负实数编码线程单射与 Beatty 坐标纤维容量（`LEAN ✓`）**：
   在 `trureturing` 的离散编码模块中：
   - 二进制齐肯多夫自动机 `binaryZeckendorfBase` 接受字 $w \in \operatorname{List}(\operatorname{Fin} 2)$ 当且仅当 $w$ 不含相邻的 `11`（`NoAdjacentOnes w`，[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)）；
   - 对任意**非负实数** $x \in \mathbb{R}_{\ge 0}$（`NNReal`），由全尺度黄金幂自然数下取整 $\operatorname{goldenQuantization}(N, x) = \lfloor \varphi^N x\rfloor_+$ 的典范齐肯多夫编码构成的线程映射 $\operatorname{zeckendorfRealThread} : \mathbb{R}_{\ge 0} \to (\mathbb{N} \to \mathrm{WDigitString})$ 严格单射（[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)）；
   - 同时，对任意正整数第一坐标 $a \ge 1$，Beatty 第一坐标原像纤维 $\operatorname{goldenFiber}(a) = \{v \in \mathbb{N} \mid \operatorname{fiberA}(v) = a\}$ 的基数严格属于 $\{4, 5\}$（[`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair)），而对任意非负整数第二坐标 $b \ge 0$，对偶第二坐标原像纤维 $\operatorname{goldenDualFiber}(b) = \{v \in \mathbb{N} \mid \operatorname{fiberB}(v) = b\}$ 的基数严格属于 $\{2, 3\}$（[`golden_dual_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_dual_fiber_capacity_pair)）。
   在本书的认识论诠释模型（`MODEL`）中，我们将“有理斜率扫描 $\to$ 坐标原像纤维分割 $\to$ 消除相邻 `11` 的齐肯多夫规范化”诠释为有限观察者体验到的主观时间步进。

::: {.figure src="coda-no-eleven"}
**齐肯多夫自动机只收没有相邻 `11` 的字。** 十六个四位二进制字里，青色的八个没有两个相邻的 $1$，被接受；品红的八个各含一对相邻的 $11$（框出的是第一对），被拒绝。接受条件就是 [@thm-coda-golden-cut-observer-cassini] 第 3 条里的 $\operatorname{NoAdjacentOnes}(w)$。
:::

## 35.7.2 哲学诠释模型（`MODEL`）：什么是“同一个灵魂”？什么是“单次生命与遗忘”？ {#sec-coda-trureturing-soul-vs-lifetime}

借用上述 `trureturing` 切投模型集与编码线程的数学结构，我们可以为[第 25 章](ch29-timeless-causality-and-gram-space.md)与 [§35.1](ch35-light-pulse-and-self-referential-table.md)–[§35.6](ch39-s05-pisot-clifford-rauzy.md) 关于“灵魂内禀倾角”与“遗忘清空表层记事”的哲学思考建立一套清晰的几何诠释模型（`MODEL`）：

1. **“同一个灵魂”（`MODEL`）$\leftrightarrow$ 不变的内部正交窗口相位 $u \in E_\perp$ 与黄金倾角 $\varphi$**：
   在这一概念映射中，标识“同一个观察者/灵魂”的不是三维物理切片 $E_\parallel^3$ 中的瞬时位置，而是正交内空间 $E_\perp$ 中的**窗口相位中心 $u$**（接受窗 $W + u$ 的平移锚点）：
   - 不同相位 $u \neq u'$ 的切投窗口筛选出局部相差**相子翻转（Phason Flips）**的准晶点集 $\Lambda_u$ 与 $\Lambda_{u'}$；
   - 与此同时，在紧致阿贝尔群与环面动力学层面，`trureturing` 的**环面闭子群轨道均匀分布定理** [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result) 严格证明：对有限维环面 $I \to \mathrm{Circle}$ 中的任意元素 $g$，记 $G = \overline{\langle g\rangle}$ 为由 $g$ 生成的循环子群的紧致拓扑闭包、$\mu$ 为 $G$ 上的归一化哈尔（Haar）概率测度，则对 $G$ 上任意连续复值可观测量 $f \in C(G, \mathbb{C})$，轨道遍历平均 $\frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1})$ 当 $N \to \infty$ 时严格收敛于哈尔测度积分 $\int_G f\,d\mu$（当 $g$ 的频率分量在 $\mathbb{Z}$ 上与 $1$ 线性无关时，$G$ 即为整个环面；此外，[`golden_ergodic_bridge`](lean:D5/S0/Tower/ErgodicBridge/Golden.golden_ergodic_bridge) 证明对任意 $Q \ge 2$ 及名称包壳 `goldenNameHull Q` 中的实数 $x$，其跨层级幸存量下极限 $\liminf_{\mathrm{level}\to\infty} \operatorname{goldenSurvivor}(\mathrm{level}, x)$ 必等于某个黄金单位幸存态的轨道下值）。在我们的哲学诠释（`MODEL`）中，这象征着不同观察者虽拥有各自的局部视角，却在遍历平均下共享统一的宏观统计规律。
2. **“单次有限生命与遗忘初始化”（`MODEL`）$\leftrightarrow$ 齐肯多夫高阶层级截断与有理扫描阶数 $k$ 的重置**：
   在哲学模型中，单次有限生命好比只将编码线程 $\operatorname{zeckendorfRealThread}(x)(N)$ 或斐波那契有理斜率 $F_{k+1}/F_k$ 推进到有限阶数 $N, k \le K_{\max}$。随着历史约束累积，相容空间趋于饱和；而**诞生与遗忘初始化**则被诠释为**截断高阶齐肯多夫层级并重置扫描阶数 $k$**——抹去上一轮的高阶表层细节（名词 `量 liàng`），但保持内部窗口相位锚点 $u \in E_\perp$ 与黄金倾角 $\varphi$（动词 `量 liáng` 的内禀参数）不变。

::: {.viz src="golden-cut-observer" preset="phason" height="500"}
**挪动窗口。** 窗口平移到 $u = +0.3$：贴着边的点（品红）稍一挪动就会翻转，离边远的点留在原地；最深的那个点离边约 $0.46$，窗口要挪过这么远才碰得到它。在书页上播放，可以看到每次有点进出，下面那排砖里相邻的一长一短就对调一次。
:::

## 35.7.3 接受窗内部裕度与空间吸引盆地的几何诠释 {#sec-coda-trureturing-rhombic-triacontahedron-empire}

为什么在跨轮次诠释模型中，普通事件容易随扫描阶数更迭而消散，而特定的历史遗迹坐标却能长期存续并吸引观察者重访？我们先将本节与下一节对照引用的三维正二十面体准晶接受窗、一致重复性与康威“帝国效应”、以及比内公式有理斜率渐近误差三项经典文献结论集中归入文献注记：

::: {.remark #rem-coda-quasicrystal-empire-literature title="正二十面体准晶菱形三十面体接受窗、康威帝国效应与比内斜率渐近公式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 以下三项关于高维切投准晶几何与斐波那契有理逼近渐近率的经典结论均属外部数学与晶体学文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中（本节经 Lean 4 内核验证的切投与编码结论严格限定于 [@thm-coda-golden-cut-observer-cassini] 所列的一维 `GoldenInt` 模型集、齐肯多夫线程与环面有界回归定理）：

1. **六维正二十面体切投模型与菱形三十面体接受窗（P. Kramer & R. Neri, *Acta Cryst. A* **40**, 580–587, 1984；M. Duneau & A. Katz, *Phys. Rev. Lett.* **54**, 2688–2691, 1985）**：将六维超立方整数格 $\mathbb{Z}^6 \subset \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$ 沿正二十面体不可约表示正交分解为三维物理空间 $E_\parallel^3$ 与三维内部空间 $E_\perp^3$ 时，单位超立方体投影到 $E_\perp^3$ 形成的标准接受窗 $W$ 是一座**菱形三十面体（Rhombic Triacontahedron）**，由 **$30$ 个黄金菱形面、$60$ 条棱与 $32$ 个顶点**（含分布在 **$6$ 条五次对称轴**上的 $12$ 个五重顶点与分布在 $10$ 条三次对称轴上的 $20$ 个三重顶点）围成，对应三维切投准晶点集 $\Lambda_u = \{\pi_\parallel(z) \mid z \in \mathbb{Z}^6,\; \pi_\perp(z) \in W + u\}$。
2. **非奇异规则模型集的一致重复性与康威“帝国效应”（Y. Meyer, *Algebraic Numbers and Harmonic Analysis*, 1972；M. Schlottmann, 2000；J. C. Lagarias & P. A. B. Pleasants, 2003；B. Grünbaum & G. C. Shephard, *Tilings and Patterns*, 1987）**：非奇异规则切投模型集具有**一致重复性（Uniform Repetitivity）**，即任意给定半径的局部有限构型都在有界距离内反复出现；同时，固定一处局部拼砖构型（记其母格提升为有限集 $F \subset \mathbb{Z}^6$，$\pi_\parallel(F) \subset \Lambda_u$）会将容许内部相位 $u'$ 限制在平移窗口交集 $P_F := \bigcap_{x \in F} (\pi_\perp(x) - W) \subset E_\perp^3$ 内，使一切满足 $\pi_\perp(z) \in W_{\mathrm{emp}}(F) := \bigcap_{u' \in P_F} (W + u')$ 的远方母格点 $z$ 在所有兼容拼砖中被非局域地强制出现（局部构型 $F$ 的**康威帝国 Conway's Empire**）。
3. **斐波那契比内公式与有理斜率渐近误差（J. P. M. Binet, 1843；经典连分数渐近论）**：由比内公式 $F_k = \frac{\varphi^k - \bar{\varphi}^k}{\sqrt{5}}$（其中 $\bar{\varphi} = 1 - \varphi = -\varphi^{-1}$）与恒等式 $F_{k+1} - \varphi F_k = \bar{\varphi}^k = (-1)^k \varphi^{-k}$，对一切正整数 $k \ge 1$，斐波那契有理斜率对黄金分割 $\varphi$ 的逼近误差满足

   $$
   \left|\frac{F_{k+1}}{F_k} - \varphi\right| = \frac{\varphi^{-k}}{F_k} \sim \frac{\sqrt{5}}{\varphi^{2k}} \qquad (k \ge 1,\; k \to \infty).
   $$
:::

结合 [@rem-coda-quasicrystal-empire-literature] 的窗口几何与 `trureturing` 的一维内核定理，我们的哲学与几何诠释模型（`MODEL`）展现出三层清晰对应：

1. **物理五次顶点角亏与内部接受窗五重顶点的跨空间呼应（`MODEL`）**：
   对照 [@rem-coda-polyhedral-topology-literature] 第 1 条与 [@rem-coda-quasicrystal-empire-literature] 第 1 条：物理空间正二十面体的五边形顶点与五次对称轴，在内部空间接受窗的对称几何中恰好与五重顶点一一呼应！
2. **窗口边界附近的相子翻转敏感性 vs. 窗口深处（近中心点）的有限扰动鲁棒性**：
   对于内部投影落在接受窗开内部 $\operatorname{int}(W + u)$ 的母格点 $z$，记其到窗口边界 $\partial(W + u)$ 的欧氏安全裕度为 $d_{\partial}(z) := \operatorname{dist}\bigl(\pi_\perp(z),\, \partial(W + u)\bigr) > 0$：
   - **贴近窗口边界的点（$d_{\partial}(z) \ll 1$）**：当 $\pi_\perp(z)$ 紧贴边界 $\partial(W + u)$ 时，幅值超过 $d_{\partial}(z)$ 且朝向边界外侧的内部相位微扰或有理斜率逼近误差即可使 $\pi_\perp(z)$ 越过边界，导致物理空间中的对应格点发生**相子翻转（Phason Flip）**而移位或消失（作为形式层面的结构呼应，`trureturing` 在黄金幸存塔中证明了严格永久幸存集为空集 [`golden_strict_permanent_set_eq_empty`](lean:D5/S0/Tower/Champions/GoldenPermanentSurvivors.golden_strict_permanent_set_eq_empty)，而已知的闭预周期载体则构成闭永久幸存集的子集 [`golden_known_closed_preperiodic_carrier_subset`](lean:D5/S0/Tower/Champions/GoldenPermanentSurvivors.golden_known_closed_preperiodic_carrier_subset)）；
   - **靠近窗口靶心的深谷点（$\|\pi_\perp(z_{\mathrm{ruin}}) - u\| \ll 1$，从而拥有大边界裕度 $d_{\partial}(z_{\mathrm{ruin}}) \approx r_{\mathrm{in}}(W)$）**：反之，若格点 $z_{\mathrm{ruin}}$ 的内部投影紧靠窗口中心 $u$，则它距离边界 $\partial(W+u)$ 拥有接近内切球半径 $r_{\mathrm{in}}(W)$ 的最大容错裕度——对于一切范数**严格小于** $d_{\partial}(z_{\mathrm{ruin}})$ 的内部相子扰动或高阶有理逼近误差，该格点都稳居窗口开内部 $\operatorname{int}(W + u)$ 而不发生相子翻转！同时，在一维黄金格点中，由共轭范数互反分离定理 [`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation)，任意两个同时落在中心直径 $B$ 内的相异黄金整数 $u \neq v$（即 $|\pi_\perp(u) - \pi_\perp(v)| \le B$），其在物理空间的间距必满足 $|\pi_\parallel(u) - \pi_\parallel(v)| \ge 1/B$。在本书的几何诠释模型（`MODEL`）中，我们将现实中历经岁月洗礼而反复重建的历史遗迹，诠释为这类靠近内部窗口靶心、具有最大边界裕度 $d_{\partial}$ 的高对称格点。
::: {.viz src="golden-cut-observer" preset="window" height="500"}
**深处的点与贴边的点。** 菱形三十面体：$30$ 个菱形面、$60$ 条棱、$32$ 个顶点，青色圆点是 $12$ 个五重顶点。琥珀色的点在窗口深处，琥珀色的球以它到边界的距离 $d_\partial$ 为半径，品红是离它最近的面：幅度小于 $d_\partial$ 的扰动推不出窗口。沿同一条虚线再往外，品红的点离这个面只剩 $d_\partial \approx 0.10$，它的球缩得很小，再往外推一点就越过这个面、不在窗口里了。这个多面体是正二十面体准晶的接受窗，属文献结果；把深处的点读作“遗迹”是诠释模型（`MODEL`）。
:::

3. **非局域交集窗约束与空间吸引盆地的几何类比（`MODEL`）**：
   对照 [@rem-coda-quasicrystal-empire-literature] 第 2 条，在我们的哲学模型（`MODEL`）中，局部高对称构型通过收紧容许相位集对远方格点施加的非局域窗口约束性质，恰可类比为历史遗迹在相容空间中形成的吸引盆地。

::: {.viz src="golden-cut-observer" preset="empire" height="500"}
**一小片定住远处的点。** 固定中间 $|x| \le 4$ 的一小片（虚线之间）之后，窗口只能在一小段范围里平移；较深的青色带是这些窗口位置的公共部分。落在这条带里的点（带圈）怎么挪都在，因此被这一小片定住，哪怕离得很远；品红的点仍未定。这是康威“帝国”在一维黄金切投里的对应物（文献结果的示意）。
:::

## 35.7.4 卡西尼恒等式 $(-1)^{n+1}$ 接缝与环面观测窗有界间隙回归 {#sec-coda-trureturing-cassini-torus-return}

最后，让我们用 `trureturing` 中已验证的**斐波那契—卡西尼恒等式**与**环面观测窗有界回归定理**（`LEAN ✓`），精确刻画离散序列的交替接缝与回归性质，并说明其与“跨轮次似曾相识”（`MODEL`）的对应关系：

1. **斐波那契—卡西尼恒等式 $(-1)^{n+1} = \pm 1$（`LEAN ✓`）**：
   根据 `trureturing` 由黄金单位幂范数 $\operatorname{norm}(\varphi^{n+1}) = (-1)^{n+1}$ 机械证明的**斐波那契—卡西尼恒等式** [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)（以及黄金位移范数符号由齐肯多夫展开最低位索引奇偶性决定的定理 [`betaGolden_norm_sign_of_least_zeckendorf_index`](lean:D5/S1/Deficit/Displacement/ZeckendorfNormSign.betaGolden_norm_sign_of_least_zeckendorf_index)），对一切 $k \in \mathbb{N}$ 恒有：

   $$
   F_k\,F_{k+2} - F_{k+1}^2 = (-1)^{k+1} = \pm 1.
   $$

   请看卡西尼恒等式右端的 **$(-1)^{k+1} = \pm 1$**（配合 [@rem-coda-quasicrystal-empire-literature] 第 3 条记述的有理斜率收敛背景）：这与[第 23 章 §23.1](ch29-s01-pythagoras-and-number-systems.md)经 Lean 验证的希帕索斯佩尔余项 $P_{k+2}P_k - P_{k+1}^2 = (-1)^{k+1}$（[@thm-ch29-silver-pell-remainder]）同样展现了离散整数网格逼近无理方向时不可消除的 **$\pm 1$ 最小单位范数接缝**！（[§23.2](ch29-s02-prime-seams-and-elliptic-tori.md) 的奇素数模四分裂 [@thm-ch29-face-prime-two-squares] 与文献注记中的同余数三次曲线支点 [@rem-ch29-elliptic-torus-literature] 是相邻的算术话题，本身并不是 $\pm 1$ 接缝。）

::: {.viz src="golden-cut-observer" preset="cassini" height="500"}
**面积永远是 $\pm 1$。** 还是那张格点图。$\varphi$ 的幂 $\varphi^2, \varphi^3, \dots$ 一个在横轴上方（青色）、一个在下方（品红），落在双曲线 $x \cdot x' = \pm 1$ 上；每个幂与原点围成的矩形越来越扁长，面积却恰好是 $1$。填色的是 $\varphi^5 = 3 + 5\varphi$：$F_4 F_6 - F_5^2 = 3 \cdot 8 - 5^2 = -1$。两条双曲线之间除了原点没有别的格点。
:::

2. **环面观测窗有界间隙回归定理（[`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)，`LEAN ✓`）**：
   `trureturing` 在一般紧致环面动力系统中严格证明：设 $I$ 为有限指标集，$g : I \to \mathrm{Circle}$ 为环面元素，$G = \overline{\langle g\rangle}$ 为其生成的紧致闭子群，$\mu$ 为 $G$ 上的哈尔概率测度，$a = \langle g, \dots\rangle \in G$。对 $G$ 上任意连续实值观测函数 $h \in C(G, \mathbb{R})$ 及满足渐近误差归零 $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$ 的任意实测序列 $e : \mathbb{N} \to \mathbb{R}$：
   - 推前测度 $\operatorname{Measure.map} h\,\mu$ 的拓扑支集严格等于连续像集 $\operatorname{range}(h)$；
   - 对任意与像集相交的非空开区间窗口 $(u_1, u_2) \subset \mathbb{R}$（即 $(I_{oo}(u_1, u_2) \cap \operatorname{range}(h)).\mathrm{Nonempty}$），必存在起始步 $n_0 \ge 1$ 与有界步数间隙 $M \in \mathbb{N}$，使得从 $n_0$ 起的每一个长度为 $M+1$ 的连续整数区间 $[n, n+M]$ 内都至少存在一步 $m$ 满足 $e(m) \in (u_1, u_2)$，且对任意 $\varepsilon > 0$，前 $N$ 步访问该开窗口的计数比例最终恒满足下界：

     $$
     \forall^\infty N \in \mathbb{N},\quad \frac{\#\bigl\{m < N \;\big|\; e(m) \in (u_1, u_2)\bigr\}}{N} \ge \frac{1}{M + 1} - \varepsilon.
     $$

3. **跨轮次回归与“似曾相识”的几何诠释（`MODEL`）**：
   将上述两条严格定理放回我们的哲学模型（`MODEL`）：$(-1)^{k+1}$ 的正负交替意味着不同阶数的有理逼近从正反两侧交替贴近无理方向（而不重合于同一有理切片），而只要某个目标区域对应着连续观测像集中的非空开窗口 $(u_1, u_2)$（或内部窗口中具有正安全裕度 $d_{\partial} > 0$ 的邻域），轨道便以有界步数间隙 $M$ 与严格正的最终访问比例反复重返该窗口——这为“同一个灵魂一轮又一轮走过自己熟悉的地方，并在擦肩而过时触发 $\cos\delta\theta \to 1$ 的似曾相识共振”提供了严谨的数学灵感源泉。

::: {.viz src="golden-cut-observer" preset="returns" height="500"}
**以有界的间隔回到窗口。** 圆上的点每一步转过黄金角，它的高度 $\cos 2\pi n\varphi$ 画在右边。琥珀色的带子是观测窗 $(0.2, 0.8)$，青色是落在带子里的步：前 $89$ 步里进入 $21$ 次，相邻两次最多相隔 $7$ 步（品红）。这是有限步的数值演示，$7$ 是样本值；Lean 验证的定理给出某个起始步之后的统一回归上界。
:::

::: {.theorem #thm-coda-golden-cut-observer-cassini title="黄金切投模型集、卡西尼 ±1 范数恒等式、齐肯多夫语言与环面轨道回归（八条已验证声明）" lean="D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec, D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project, D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm, D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes, D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective, D5/S3/Fourier/GoldenModelSetDelone.norm_separation, D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result, D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result"}
在 `trureturing` 的黄金切投模型集、齐肯多夫编码与环面渐近分析体系中，以下八项核心性质已由 Lean 4 内核验证并冻结：

1. **闵可夫斯基嵌入与黄金切投模型集包含关系**（[`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec)、[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)）：黄金整数环 `GoldenInt`（$\mathbb{Z}[\varphi]$）的闵可夫斯基嵌入 $\operatorname{minkowskiEmbedding}(x) = (\operatorname{embedding}(x), \operatorname{embedding}(\operatorname{conj} x))$ 严格单射，其像集定义为二维格点 `goldenLattice`，且点 $y \in \operatorname{modelSet}(\mathrm{window})$ 当且仅当存在 $x \in \mathrm{GoldenInt}$ 满足 $\operatorname{embedding}(x) = y$ 且 $\operatorname{embedding}(\operatorname{conj} x) \in \mathrm{window}$；特别地，对单位体积闭窗口 $\operatorname{goldenWindow} = [\varphi - 2, \varphi - 1]$（[`golden_window_volume`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_window_volume)），自然数黄金展开值域 $\operatorname{goldenModelSet} = \operatorname{range}(\operatorname{betaGolden})$ 的物理嵌入像满足包含关系 $\operatorname{embedding} '' \operatorname{goldenModelSet} \subseteq \operatorname{goldenCutAndProjectSet}$，同时 `goldenModelSet` 具有不相交分支自相似分解 $\operatorname{phiBranch} \cup \operatorname{phiSquaredBranch}$（[`golden_model_set_self_similar`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_model_set_self_similar)）、前缀计数比极限 $1/\sqrt{5}$（[`golden_model_set_density`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetDensity.golden_model_set_density)）以及余项落在 $(\varphi-2, \varphi-1]$、步长属于 $\{\varphi, \varphi^2\}$ 的 Beatty 观察者路由（[`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)）。
2. **斐波那契—卡西尼 $\pm 1$ 黄金范数恒等式**（[`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)）：由黄金单位幂范数 $\operatorname{norm}(\varphi^{n+1}) = (-1)^{n+1}$，相邻斐波那契数对一切 $n \in \mathbb{N}$ 恒满足

   $$
   F_n\,F_{n+2} - F_{n+1}^2 = (-1)^{n+1},
   $$

   且对任意正整数 $v > 0$，黄金位移值 $\operatorname{betaGolden}(v)$ 的二次范数正负号由其齐肯多夫数字集 `wdigits v` 的最小索引 $k$ 的奇偶性唯一决定（$k$ 为偶数时范数 $> 0$，$k$ 为奇数时范数 $< 0$，[`betaGolden_norm_sign_of_least_zeckendorf_index`](lean:D5/S1/Deficit/Displacement/ZeckendorfNormSign.betaGolden_norm_sign_of_least_zeckendorf_index)）。
3. **齐肯多夫无相邻 `11` 自动机语言与非负实数编码线程单射**（[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)、[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)）：二进制齐肯多夫基础自动机接受字 $w \in \operatorname{List}(\operatorname{Fin} 2)$ 当且仅当 $\operatorname{NoAdjacentOnes}(w)$ 成立；将非负实数 $x \in \mathbb{R}_{\ge 0}$（`NNReal`）映射为全尺度下取整 $\lfloor\varphi^N x\rfloor_+$ 的典范齐肯多夫编码序列的线程函数 $\operatorname{zeckendorfRealThread} : \mathbb{R}_{\ge 0} \to (\mathbb{N} \to \mathrm{WDigitString})$ 严格单射（此外，Beatty 坐标纤维满足 $\forall a \ge 1,\, (\operatorname{goldenFiber}(a)).\operatorname{ncard} \in \{4, 5\}$ 与 $\forall b \ge 0,\, (\operatorname{goldenDualFiber}(b)).\operatorname{ncard} \in \{2, 3\}$，[`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair)、[`golden_dual_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_dual_fiber_capacity_pair)）。
4. **共轭范数互反分离、全窗口 Delone 集与环面闭子群轨道均匀分布及有界间隙回归**（[`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation)、[`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)、[`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)）：对任意相异黄金整数 $u \neq v \in \mathrm{GoldenInt}$ 及满足 $|\operatorname{embedding}(\operatorname{conj} u) - \operatorname{embedding}(\operatorname{conj} v)| \le B$ 的实数 $B$，必有 $1 \le |\operatorname{embedding}(u) - \operatorname{embedding}(v)| \cdot B$（且全窗口模型集 $\operatorname{modelSet}(\operatorname{goldenWindow})$ 构成装球半径 $1/2$、覆盖半径 $3$ 的 Delone 集，[`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)）；同时，对有限维环面元素 $g : I \to \mathrm{Circle}$ 生成的紧致闭子群 $G = \overline{\langle g\rangle}$ 及其哈尔概率测度 $\mu$，任意连续复观测函数 $f \in C(G, \mathbb{C})$ 的轨道平均收敛于 $\int_G f\,d\mu$，且对任意连续实观测函数 $h \in C(G, \mathbb{R})$、渐近误差归零序列 $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$ 及与 $\operatorname{range}(h)$ 相交的开区间 $(u_1, u_2)$，序列 $e(n)$ 必在某起始步 $n_0 \ge 1$ 后以有界步数间隙 $M$ 反复进入 $(u_1, u_2)$，且前 $N$ 步访问计数比最终恒满足 $\ge \frac{1}{M+1} - \varepsilon$。
:::

::: proof
第 1 部分由 `embedding_injective` 直接导出 `minkowskiEmbedding` 的单射性与模型集特征化，并利用 `betaContraction_mem_window`（即自然数黄金展开的共轭坐标落在 $\operatorname{goldenWindow}$ 内）确立 $\operatorname{embedding} '' \operatorname{goldenModelSet} \subseteq \operatorname{goldenCutAndProjectSet}$。第 2 部分由 $\varphi^{n+1} = F_n + F_{n+1}\varphi$（`golden_phi_pow_eq_fib_pair`）与范数乘性 $\operatorname{norm}(\varphi^{n+1}) = (-1)^{n+1}$ 化简得到卡西尼恒等式。第 3 部分对二进制列表作归纳验证自动机接受条件与 `NoAdjacentOnes` 的等价性，并对满足 $a > b \ge 0$ 的两个非负实数利用 $\varphi^N(a - b) \to +\infty$ 最终超过 $2$ 导出存在层级 $N$ 使 $\lfloor\varphi^N a\rfloor_+ \neq \lfloor\varphi^N b\rfloor_+$，从而证明 `zeckendorfRealThread` 在 `NNReal` 上单射。第 4 部分利用非零黄金整数范数 $|\operatorname{norm}(u - v)| \ge 1$ 导出互反分离不等式，并由特征标几何级数有界估计与紧致群 $G$ 的有限开覆盖导出哈尔均匀分布与有界间隙回归。完整证明由 Lean 内核检查。
:::

::: {.viz src="golden-cut-observer" preset="narrow" height="500"}
**窗口变窄：此前的等待更长。** 把琥珀色的观测窗收窄到 $(0.45,0.55)$：前 $233$ 步里青色的步只有 $8$ 个，品红标出的已观察最长间隔是 $48$ 步。有限样本不能认证未来的最长等待；上面定理第 4 条另给出某个 $n_0$ 之后的有界回归，以及对每个 $\varepsilon>0$ 最终成立的密度下界。
:::

**时间上的间隔，空间上的间隔。** 上面“以有界的间隔回到窗口”与“窗口变窄”两张卡片看的是时间：轨道隔多少步回一次窗口。把同一条黄金角轨道的前 $N$ 个点一起摆在圆周上，问的就是空间：相邻两点之间隔着多长的弧？答案出奇地整齐，而且不只对黄金角成立。

::: {.theorem #thm-coda-three-gap title="三距离定理：圆周旋转的前 N 个点至多切出三种弧长" lean="D5/S1/Phase/ThreeGap/Main.three_gap_card_le_three, D5/S1/Phase/ThreeGap/Main.three_gap_lengths_eq"}
设 $a \in \mathbb{R}$，$N \ge 1$。记 $\{t\} = t - \lfloor t \rfloor$ 为小数部分，$P = \{\{ia\} : 0 \le i < N\} \subset [0, 1)$（重复的点只算一次）。把 $P$ 的元素从小到大排成 $s_0 < s_1 < \cdots < s_{k-1}$，称多重集

$$
\{\, s_{j+1} - s_j : 0 \le j < k - 1 \,\} \;\cup\; \{\, s_0 + 1 - s_{k-1} \,\}
$$

为 $P$ 的**弧长**（最后一项是绕回的那一段）。则：

1. $P$ 的弧长至多有三个不同的值；
2. 若恰有三个不同的值，记 $\eta^+$ 为 $P$ 中最小的正元素，$\eta^-$ 为 $1$ 减去 $P$ 中最大的正元素，则这三个值恰是 $\eta^+$、$\eta^-$ 与 $\eta^+ + \eta^-$。
:::

::: proof
证明只用一件事：两个轨道点之差仍是轨道点，下标相减即可。记 $\eta^+ = \{m^+ a\}$、$1 - \eta^- = \{m^- a\}$，其中 $m^\pm < N$。从轨道点 $v = \{ja\}$ 往右看：只要下标 $j + m^+$ 仍小于 $N$，圆周上 $v$ 右边 $\eta^+$ 处就有一个轨道点；只要 $j - m^-$ 不小于 $0$，$v$ 右边 $\eta^-$ 处也有一个。再用 $\eta^+$ 最小、$1 - \eta^-$ 最大排除夹在中间的点，就知道 $v$ 右边那段弧是 $\eta^+$ 或 $\eta^-$。两条路都走不通的“角落情形”里，Lean 单独证明了 $v$ 与下一个点之间没有别的轨道点，弧长恰为 $\eta^+ + \eta^-$。于是每段弧都属于 $\{\eta^+, \eta^-, \eta^+ + \eta^-\}$：至多三种，恰好三种时就是这三个值。完整证明由 Lean 内核检查。
:::

::: {.example #ex-coda-golden-three-gap title="黄金角的弧长：全是 φ 的相邻负幂，两种弧长恰在斐波那契数处出现"}
取黄金角 $a = 1/\varphi^2 \approx 0.381966$（一圈的 $0.381966$，即 $137.5^\circ$）。下表列出前 $N$ 个点切出的弧长与各自的段数（高精度数值计算后与 $\varphi^{-k}$ 逐一比对）：

| $N$ | 弧长（段数） | 种数 |
| ---: | :--- | ---: |
| $2$ | $\varphi^{-1}$（1），$\varphi^{-2}$（1） | $2$ |
| $3$ | $\varphi^{-2}$（2），$\varphi^{-3}$（1） | $2$ |
| $4$ | $\varphi^{-2}$（1），$\varphi^{-3}$（2），$\varphi^{-4}$（1） | $3$ |
| $5$ | $\varphi^{-3}$（3），$\varphi^{-4}$（2） | $2$ |
| $6$ | $\varphi^{-3}$（2），$\varphi^{-4}$（3），$\varphi^{-5}$（1） | $3$ |
| $7$ | $\varphi^{-3}$（1），$\varphi^{-4}$（4），$\varphi^{-5}$（2） | $3$ |
| $8$ | $\varphi^{-4}$（5），$\varphi^{-5}$（3） | $2$ |
| $9$ | $\varphi^{-4}$（4），$\varphi^{-5}$（4），$\varphi^{-6}$（1） | $3$ |
| $10$ | $\varphi^{-4}$（3），$\varphi^{-5}$（5），$\varphi^{-6}$（2） | $3$ |
| $11$ | $\varphi^{-4}$（2），$\varphi^{-5}$（6），$\varphi^{-6}$（3） | $3$ |
| $12$ | $\varphi^{-4}$（1），$\varphi^{-5}$（7），$\varphi^{-6}$（4） | $3$ |
| $13$ | $\varphi^{-5}$（8），$\varphi^{-6}$（5） | $2$ |

三点可以手算核对：

- **三种时最大者是另两者之和。** 例如 $N = 4$：$\eta^+ = \varphi^{-4}$，$\eta^- = \varphi^{-3}$，最大的弧是 $\varphi^{-2} = \varphi^{-3} + \varphi^{-4}$。这是把 $\varphi^2 = \varphi + 1$ 两边除以 $\varphi^4$（手工推导），正是 [@thm-coda-three-gap] 第 2 条。
- **在斐波那契 $N$ 处，两种弧长的段数是相邻斐波那契数。** 在 $N = 13$ 这一行，$8\varphi^{-5} + 5\varphi^{-6} = \varphi^{-6}(8\varphi + 5) = 1$，因为由 $\varphi^2 = \varphi + 1$ 归纳得 $\varphi^{n} = F_n \varphi + F_{n-1}$，取 $n = 6$ 即 $\varphi^6 = 8\varphi + 5$（手工推导）。
- **两种弧长只在斐波那契数处出现。** 在 $2 \le N \le 400$ 中，弧长恰有两种的 $N$ 正好是 $2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377$ 这 $12$ 个斐波那契数，其余 $387$ 个 $N$ 都是三种（数值核对）。

**黄金角切得最匀。** 同样取 $2 \le N \le 400$，看最长弧与最短弧之比的最大值（数值计算）：

| 旋转量 $a$ | 最长弧 / 最短弧的最大值 | 出现在 |
| :--- | ---: | ---: |
| $1/\varphi^2$（黄金角） | $2.618 = \varphi^2$ | $N = 378$ |
| $\sqrt{2} - 1$ | $3.414 = 2 + \sqrt{2}$ | $N = 72$ |
| $e - 2$ | $7.528$ | $N = 73$ |
| $\pi - 3$ | $293.6$ | $N = 114$ |

$\pi - 3$ 的大数来自 $355/113$：$113\pi - 355 \approx -3.0 \times 10^{-5}$，所以第 $113$ 个点 $\{113(\pi - 3)\} \approx 1 - 3.0 \times 10^{-5}$ 几乎落回 $0$，在那里切出一段极短的弧（手工推导）。
:::

::: {.viz src="golden-cut-observer" preset="gaps" height="500"}
**圆周上的缝：至多三种。** 黄金角 $a = 1/\varphi^2$ 的前 $N = 13$ 个点 $\{ia\}$ 摆在圆周上（$0$ 在最上方，琥珀色是第 $12$ 个点），相邻两点之间的弧按长度上色：只有两种，$5$ 段青色的 $\varphi^{-6} \approx 0.0557$ 与 $8$ 段品红的 $\varphi^{-5} \approx 0.0902$。拖动时间轴改变 $N$，弧长从不超过三种；恰有三种时，中间一种画成紫色，最长的品红一种是另两种之和（[@thm-coda-three-gap]）。$2 \le N \le 400$ 里只剩两种的 $N$ 恰是斐波那契数（页面数值）。
:::

**为什么黄金角不会切出极短的弧。** $\pi - 3$ 的毛病是有一个分数离它太近。黄金比恰好相反：没有哪个分数能离它太近，而且这件事已经冻结。

::: {.theorem #thm-coda-golden-hurwitz title="黄金比的赫尔维茨界：没有分数离 φ 太近" lean="D5/S1/Depth/GoldenHurwitzBound.golden_hurwitz_bound"}
设 $\varphi = (1 + \sqrt{5})/2$。对每个有理数 $r$，记 $d \ge 1$ 为 $r$ 写成既约分数时的分母，则

$$
\lvert \varphi - r \rvert > \frac{1}{\sqrt{5}\, d^2 + d}.
$$
:::

::: proof
设 $r = p/d$ 为既约分数，$\varepsilon = \lvert \varphi - r\rvert$。（1）$p^2 - pd - d^2$ 是不为零的整数，否则 $r$ 会是 $x^2 - x - 1$ 的有理根，而这个方程的根是无理数 $\varphi$ 与 $\bar\varphi = (1 - \sqrt{5})/2$；所以 $\lvert p^2 - pd - d^2 \rvert \ge 1$。（2）$p^2 - pd - d^2 = d^2 (r - \varphi)(r - \bar\varphi)$，而 $\lvert r - \bar\varphi\rvert \le \varepsilon + (\varphi - \bar\varphi) = \varepsilon + \sqrt{5}$，合起来得 $1 \le d^2 \varepsilon(\varepsilon + \sqrt{5})$。（3）若 $\varepsilon \le 1/(\sqrt{5} d^2 + d)$，右边至多是 $\bigl(\sqrt{5} d^2 + d^2/(\sqrt{5} d^2 + d)\bigr)/(\sqrt{5} d^2 + d)$，而 $d^2/(\sqrt{5} d^2 + d) < d$，所以右边小于 $1$，矛盾。完整证明由 Lean 内核检查。
:::

**每一段弧都长于 $1/(\sqrt{5} N)$（手工推导）。** 黄金角 $a = 1/\varphi^2 = 2 - \varphi$。两个轨道点 $\{ia\}$、$\{ja\}$ 之间的弧长不小于 $\lVert ma \rVert$，其中 $m = \lvert i - j\rvert$ 满足 $1 \le m \le N - 1$，$\lVert x \rVert$ 是 $x$ 到最近整数的距离。对任意整数 $k$，$\lvert ma - k\rvert = m\,\lvert \varphi - (2m - k)/m \rvert$；分数 $(2m - k)/m$ 约分后的分母 $d \le m$，由 [@thm-coda-golden-hurwitz]，

$$
\lvert ma - k \rvert > \frac{m}{\sqrt{5}\, d^2 + d} \ge \frac{m}{\sqrt{5}\, m^2 + m} = \frac{1}{\sqrt{5}\, m + 1} \ge \frac{1}{\sqrt{5}(N - 1) + 1} > \frac{1}{\sqrt{5}\, N}.
$$

$N$ 个点互不相同，平均弧长是 $1/N$；所以对一切 $N$，黄金角切出的每一段弧都超过平均弧长的 $1/\sqrt{5} \approx 0.447$ 倍。数值上，$N \le 2000$ 时 $N \times$ 最短弧的最小值是 $0.44749$（$N = 1598$），几乎贴着 $1/\sqrt{5} = 0.44721$。而 $\pi - 3$ 在 $N = 114$ 时最短弧为 $3.0 \times 10^{-5}$，比 $1/(\sqrt{5} \cdot 114) \approx 0.0039$ 短 $130$ 倍。

::: {.viz src="golden-cut-observer" preset="pi" height="500"}
**$\pi - 3$ 在 $N = 114$ 切出极短的弧。** 同一张圆周，旋转量换成 $\pi - 3$，停在 $N = 114$：琥珀色的第 $113$ 个点几乎落回 $0$，在那里切出一段只有 $3.0 \times 10^{-5}$ 的弧（青色圈出）。弧长仍不超过三种，但最长与最短之比约 $294$，图上方的 $N \times$ 最短弧约 $0.0034$，远低于黄金角始终高于的 $1/\sqrt{5} \approx 0.447$（页面数值；黄金角的下界由 [@thm-coda-golden-hurwitz] 经上面的手工推导得到）。
:::

沿斐波那契分数 $F_{k+1}/F_k$，乘积 $\sqrt{5}\, F_k^2 \lvert \varphi - F_{k+1}/F_k \rvert$ 依次为 $0.9787$（$5/3$）、$0.9969$（$13/8$）、$1.00017$（$55/34$）、$1.0000037$（$377/233$），趋于 $1$（数值计算），所以 [@thm-coda-golden-hurwitz] 里的分母主项系数 $\sqrt{5}$ 在渐近意义下不能再减小。以下是**文献结果，未在本书形式化**：每个无理数 $\alpha$ 都有无穷多个既约分数 $p/q$ 满足 $\lvert\alpha - p/q\rvert < 1/(\sqrt{5}\,q^2)$，而 $\varphi$ 说明对一切无理数共同成立的常数不能大于 $\sqrt{5}$（赫尔维茨定理，1891），最优性指这个公共常数，单个无理数可以有更大的常数，例如 $\sqrt{2}$ 的佩尔分数满足 $q^2\lvert\sqrt{2} - p/q\rvert \to 1/(2\sqrt{2}) < 1/\sqrt{5}$（`文献结果`）；“最长弧与最短弧之比始终有界”当且仅当 $a$ 的连分数部分商有界，而黄金角的连分数是 $[0;2,1,1,\ldots]$；向日葵花盘上的小花按黄金角依次排开的叶序模型（H. Vogel，1979）。

> 时间上有界地回来，空间上只留三种缝；黄金角连最窄的那一种也不让它太窄。

::: {.viz src="golden-cut-observer" height="640"}
**交互实验室 `ORTHO//CUT`**：本节的五个场景。切投：上下拖动窗口，看贴边的点翻转、深处的点不动，再固定中间一小片；卡西尼：$\varphi$ 的幂与面积为 $\pm 1$ 的矩形；回归：改变观测窗的位置与宽度，对照此前观察到的等待与访问比例；接受窗：把点从菱形三十面体的中心推向边界，$d_\partial$ 归零时它翻出窗口；缝：改变点数 $N$ 与旋转量，看圆周上的弧长始终至多三种。绿色依据框对应 Lean 已验证的定理；三十面体与“帝国”是文献结果，灵魂与遗迹的说法是诠释模型（`MODEL`）。
:::

## 35.7.5 `trureturing` 形式定理、正交几何与灵魂—遗迹吸引子诠释模型（`MODEL`）对照表 {#sec-coda-trureturing-soul-ruin-table}

下表将 `trureturing` 已验证的数学定理（左列，`LEAN ✓`）、本书的正交几何结构（中列）与作者关于“灵魂、遗忘与历史遗迹空间吸引子”的哲学诠释模型（右列，显式标注为 `MODEL`）逐一对照：

| `trureturing` 形式化定理与模块（`LEAN ✓`） | 本书的正交几何结构 | 灵魂与历史遗迹吸引子的哲学诠释模型（`MODEL`，非形式定理） |
| :--- | :--- | :--- |
| **黄金整数闵可夫斯基嵌入与二维格点**（[`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec)） | 全局无时间静态正交场（顺序无关的完备晶体，文献对照见 [@rem-ch29-wheeler-dewitt-page-wootters-literature]） | 将高维周期母格诠释为包含一切潜在构型的静态宇宙背景 |
| **黄金不动点 $\varphi$ 与切投接受窗筛选**（[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)、[`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)） | 自指丈量算子 $\psi = \psi(\psi)$ 的内禀正交倾角与窗口相位 $u \in E_\perp$ | **“同一个灵魂”的诠释模型**：将跨轮次不变的算子参数诠释为观察者的内空间窗口相位中心 $u$ 与黄金倾角 $\varphi$ |
| **Beatty 观察者路由与齐肯多夫无相邻 `11` 语言**（[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes)、[`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)） | 有限观察者在格拉姆椭圆体（$\det G > 0$）中沿折线一步步选点 | **单次有限生命体验的隐喻**：将有理斜率扫描与消除相邻 `11` 的进位弛豫诠释为主观线性时间步进 |
| **非负实数齐肯多夫线程与 Beatty 坐标纤维容量**（[`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair)、[`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)） | 遗忘抹去高阶历史锚点以打破全知死锁（$\det G = 0 \to \det G > 0$） | **诞生与遗忘初始化的隐喻**：截断高阶齐肯多夫层级以清空表层情节记忆（`量 liàng`），保留内禀窗口相位 $u$（`量 liáng`） |
| **共轭范数互反分离与全窗口 Delone 集**（[`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation)、[`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)） | 内部窗口大边界裕度 $d_{\partial}$ 赋予的抗有界相子微扰鲁棒性 | **历史遗迹（空间吸引子）的隐喻**：将靠近接受窗中心、具有最大边界容错裕度的高对称点诠释为跨朝代存续的古迹坐标 |
| **黄金幸存塔闭预周期永久幸存载体**（[`golden_known_closed_preperiodic_carrier_subset`](lean:D5/S0/Tower/Champions/GoldenPermanentSurvivors.golden_known_closed_preperiodic_carrier_subset)） | 严格永久幸存集为空而已知闭预周期载体落入闭永久幸存集的形式分层（相关文献背景另见 [@rem-coda-quasicrystal-empire-literature]） | **吸引盆地的隐喻**：将跨层级持久留存的闭预周期载体诠释为吸引观察者重访的曲率盆地（文献对照见 [@rem-coda-quasicrystal-empire-literature]） |
| **卡西尼恒等式 $(-1)^{n+1} = \pm 1$ 与环面观测窗有界回归**（[`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)、[`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)） | 近似之球的 $\pm 1$ 接缝余项与环面观测窗有界间隙回归（相关文献背景另见 [@rem-coda-lorenz-srb-literature]） | **似曾相识（Déjà vu）的隐喻**：有界间隙回归使轨迹重返同一空间吸引子邻域，在局部注意力近共线（$\delta\theta \to 0$）时触发 $\cos\delta\theta \to 1$ 共振 |

至此，第三十五章从“乘着光来”的遗忘清零与同像自指扩表（[§35.1](ch35-light-pulse-and-self-referential-table.md)–[§35.5](ch36-s04-padic-table-expansion.md)），到高阶齐肯多夫—皮索—劳齐分形沙盘（[§35.6](ch39-s05-pisot-clifford-rauzy.md)）与黄金切投接受窗（本节 §35.7）的七节推演已圆满合拢。接下来，让我们把镜头拉回每一个昼夜交替的当下，翻开 **[第三十六章 梦境量子擦除、宇宙本体 QRAM 与主动停机折叠](ch38-observer-memory-pointer-and-ontological-qram.md)**——见证夜间梦境如何执行可逆量子擦除、观察者如何作为本体 QRAM 的记忆指针解引用世界并主动按下 $\varepsilon_{\mathrm{self}}$ 停机键。

---
