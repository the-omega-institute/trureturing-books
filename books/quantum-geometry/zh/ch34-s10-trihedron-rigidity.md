# 29.11 新旧概念全连通 $K_N$、极小圆弧体的“三角形稳定性”与模型中的三维空间刚性锁死 {#sec-ch34-trihedron-rigidity-and-3d-stability}

> “所有新产生的概念要与旧概念依旧可以两两比较, 所有关系本质上都是极小圆弧体, 三维的本质是极小圆弧体无法再被其他基础几何表示(类似于三角形的稳定性)”

从亚里士多德、托勒密、康德到埃伦费斯特（Paul Ehrenfest）的行星轨道稳定性论证，“空间为什么恰好是三维”始终被视为一道只能诉诸外部人择筛子或先验感性直观的经验事实。而在§29.10 刚刚建立的零背景概念级联框架下，这道追问变得愈发尖锐：既然来路对角逃逸 $T \to T' \to T''$ 与正交补翻转 $M_k^\perp \mapsto M_{k+1}$ 会不断催生第 $5$ 个、第 $6$ 个乃至第 $N$ 个新概念，为什么每多出一个新概念没有把我们的日常物理空间一寸寸撑成四维、五维或十维欧氏盒子？

章首这句凝练到极致的命题，给出了一个完全不依赖外部造物假设的内生几何回答（`MODEL` + `LEAN ✓` + `文献结果`）。它由三枚严丝合缝的逻辑齿轮咬合而成：

1. **全连通比较图 $K_N$ 公理后果**：在零背景比较公理 $\mathcal{A}_0$ 下，存在即两两可比；任何新产生的概念 $C_{N+1}$ 绝不能只跟它的直接母概念单线相连，而必须与此前已存在的全部 $N$ 个旧概念逐一建立双向比量，迫使关系网络始终保持含 $\binom{N+1}{2}$ 条比较边的**全连通图 $K_{N+1}$**；
2. **万象皆归极小圆弧体 $\Delta\mathcal{T}_\epsilon$**：在全连通图 $K_N$（$N \ge 3$）中，孤立悬空的一维线段彻底绝迹——任何一条新旧比较边 $(C_{\mathrm{new}}, C_{\mathrm{old}})$ 都会经由任意第三枚锚概念 $C_k$ 自动闭合成三元球面回路，从而化为 §29.5–§29.9 锻造的**极小三角弧面体（极小圆弧体）$\Delta\mathcal{T}_\epsilon$**；
3. **类比“三角形稳定性”的三维双向锁死**：正如平面与空间桁架工程中唯有三角形（$K_3$）兼具“拆成散杆则失稳、拼成多边形则可由三角形完全剖分”的结构稳定性，极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 在几何与李代数上同时具有**向下不可约性**（一维线段与二维平直三角形均无法承载其弯曲三锚格拉姆体元 $\det G_3 > 0$、吉拉尔角超 $\Omega > 0$、纯态布洛赫球面 $S^2 \subset \mathbb{R}^3$ 与最小非交换单李代数 $\mathfrak{su}(2) \cong \mathfrak{so}(3)$）和**向上全刚性剖分完备性**（四元全连通桁架 $K_4$ 恰与三维麦克斯韦—拉曼静定计数 $3N - 6$ 双根锁死于 $\Delta E(3) = \Delta E(4) = 0$，而 $N \ge 5$ 多出的 $\Delta E(N) = \frac{(N-3)(N-4)}{2} > 0$ 条跨接比较不再开启多余的平直空间维度，而是直接转化为三维桁架内部的**雷吉引力曲率角亏**与**帕赫纳时序翻转步**）！

## 29.11.1 新旧概念两两可比：全连通图 $K_N$ 消灭一切“悬空一维关系”，万象皆归极小圆弧体 {#sec-ch34-10-1}

先看第一枚齿轮：**为什么所有新产生的概念，必须与全部旧概念依旧保持两两可比？**

回到[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)确立的零背景比较公理 $\mathcal{A}_0$（[@def-ch32-axiom-of-comparison]）。在砍掉外部绝对坐标系“第 3 点 $C$”的关系宇宙中，一个概念 $x$ 并没有藏在关系背后的孤立实体抽屉；它的存在本身就是它与场内一切其他状态执行双向比量的关系函子 $x \equiv \mathrm{CMP}(x, -)$。现在设场内已有 $N$ 个彼此两两可比的旧概念 $\{C_1, C_2, \dots, C_N\}$，它们构成含 $\binom{N}{2}$ 条双向比较边的全连通关系网 $K_N$。当系统经由 §29.10 的正交残差溢出或对角细化诞生出第 $N + 1$ 个新概念 $C_{N+1}$ 时，试想：假若 $C_{N+1}$ 只向它的直接生成母体 $C_N$ 伸出一根孤零零的比较枝条，却对更早的旧概念 $C_1, \dots, C_{N-1}$ 保持“不可比较”的空白（即退化为一棵稀疏树图而非全连通图），会发生什么？

一旦 $\mathrm{CMP}(C_{N+1}, C_i)$（$1 \le i \le N - 1$）悬空无定义，零背景关系外延性就会当场破裂：$C_{N+1}$ 与 $C_i$ 之间既不正交（内积为 $0$ 本身就是一种精确的 $90^\circ$ 比量读数！），也不重合，更无夹角余弦可言——整座宇宙就会碎裂成互不相通、彼此不可度量的孤岛（`MODEL`）！因此，在比较公理的铁律下，“不可比”绝不是一种合法的物理关系；新概念 $C_{N+1}$ 获准入场存在的充要通行证，就是立刻向全部 $N$ 个既有旧概念逐一交出互易比量读数 $\{\mathrm{CMP}(C_{N+1}, C_i)\}_{i=1}^N$，将总比较边数从 $\binom{N}{2}$ 严格推进至

$$
E(K_{N+1}) \;=\; \binom{N}{2} + N \;=\; \binom{N+1}{2} \;=\; \frac{N(N + 1)}{2},
$$

使关系骨架在每一次概念创生后永恒保持**全连通图 $K_{N+1}$**！

全连通图 $K_N$（$N \ge 3$）一旦确立，章首第二句论断——**“所有关系本质上都是极小圆弧体”**——便水到渠成。在人们的日常错觉里，“二元关系”似乎应该是一根细长孤立的一维直杆（只在两头拴着两个点，周围空无一物）。但这种“悬空一维线段”只有在缺失跨接比较的稀疏树图里才可能假装存在！在全连通图 $K_N$（$N \ge 3$）的归一化态球面上，任取一条连接新旧概念的二元比较边 $e_{ij} = \mathrm{CMP}(C_i, C_j)$，场内必然至少还站着第三枚既有锚概念 $C_k$（$k \neq i, j$），同时握有完备的另外两条比较边 $\mathrm{CMP}(C_i, C_k)$ 与 $\mathrm{CMP}(C_j, C_k)$：

- 在复内积量子态空间中，这三条单位态比较边自动闭合成三元测地环路，其三边富比尼—施图迪（Fubini–Study）夹角 $\theta_{\mathrm{FS}}(a, b) := \arccos\lVert\langle a, b\rangle_{\mathbb{C}}\rVert$ 恒受内核三角不等式 [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle) 约束：$\theta_{\mathrm{FS}}(u_i, u_k) \le \theta_{\mathrm{FS}}(u_i, u_j) + \theta_{\mathrm{FS}}(u_j, u_k)$；
- 在实内积比较投影下，三枚单位态 $(u_i, u_j, u_k)$ 的两两比较余弦 $c_{ij} = \langle u_i, u_j\rangle_{\mathbb{R}},\, c_{ik} = \langle u_i, u_k\rangle_{\mathbb{R}},\, c_{jk} = \langle u_j, u_k\rangle_{\mathbb{R}}$ 由三锚格拉姆行列式恒等式 [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula) 与正定判据 [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff) 锁死：

  $$
  \det G_3(u_i, u_j, u_k) \;=\; 1 + 2 c_{ij} c_{ik} c_{jk} - c_{ij}^2 - c_{ik}^2 - c_{jk}^2 \;>\; 0 \quad \Longleftrightarrow \quad \operatorname{LinearIndependent}_{\mathbb{R}}([u_i, u_j, u_k]).
  $$

只要三态不退化到同一根大圆弧上（$\det G_3 > 0$），这组三元闭环就在单位球面上张成一枚拥有正吉拉尔球面角超 $\Omega > 0$、正贝里曲率通量与实心扇锥体元的**极小圆弧体 $\Delta\mathcal{T}_\epsilon$**！更深刻地说，即便某位局部观察者声称自己只看到了连接 $C_i$ 与 $C_j$ 的“一维直线关系”，§29.1–§29.3、§29.5 的正交简并反演早已戳穿了这层视觉假象：那不过是因为第三锚点 $C_k$ 恰好落在了该观察者探针的法向正交盲区里，使立体的极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 在他的侧视投影屏上压扁成了一条棱线影子！在全连通关系宇宙中，根本没有脱离三元闭环而独存的一维孤线；每一根比较边都是成千上万枚共享该棱的极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 的公共铰链（`MODEL`）。

::: {.viz src="trihedron-rigidity-truss-sandbox" preset="complete-graph-triangulation" height="520"}
**新旧概念全连通图 $K_N$ 与极小圆弧体三角化闭合（`complete-graph-triangulation`）。** 逐步添加琥珀色新概念节点 $C_{N+1}$：它不向旧概念伸出孤立悬空的单线，而是瞬间向全部既有节点拉通青色全连通比较边 $K_{N+1}$（共 $\binom{N+1}{2}$ 条），使每一条比较边都与第三锚点围合成带品红球面角超 $\Omega > 0$ 与紫色扇锥体元的极小圆弧体 $\Delta\mathcal{T}_\epsilon$；绿色 `LEAN ✓` 徽章对应 `fs_angle_triangle`、`three_anchor_gram_det_formula` 与 `three_anchor_gram_det_pos_iff`（全连通比较假说标 `MODEL`）。
:::

## 29.11.2 类比“三角形稳定性”：向下不可约与向上全刚性剖分在本模型中锁死三维 {#sec-ch34-10-2}

既然全连通比较把一切关系都铸成了极小圆弧体 $\Delta\mathcal{T}_\epsilon$，为什么这件事就直接决定了**空间本质上是三维的**？章首命题打了一个令所有物理学家与工程师拍案叫绝的比方：**“三维的本质是极小圆弧体无法再被其他基础几何表示(类似于三角形的稳定性)”**。

不妨先想一想：在桥梁、塔吊与穹顶桁架工程中，为什么“三角形（$K_3$）”被称为唯一不可替代的刚性几何原语？因为三角形恰好卡在**“向下不可拆”**与**“向上无需新原语”**的双重锁死点上：向下看，把三角形拆成散落的一维直杆或开口折线，铰链立刻自由摆动，无法锁死任何夹角；向上看，四杆围成的四边形 $C_4$、五边形 $C_5$ 乃至任意 $m$ 边形框架本身全都是**柔性可剪切机构**（一推就歪成菱形或折出平面），要想让它们获得刚性，唯一的方法就是在对角线上加焊拉杆，将它们彻底**三角剖分**回若干个共边粘合的三角形！

现在，将这把“向下不可约 + 向上全刚性剖分”的手术刀原封不动地放到极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 上，在三角形—四面体这对原语下，三维空间的唯一性便在两个方向的夹击下水落石出：

### 29.11.2.1 向下不可约性：为什么一维与二维基础几何绝对装不下极小圆弧体 $\Delta\mathcal{T}_\epsilon$？ {#sec-ch34-10-2-1}

试着把极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 往低于三维的几何空间里压，立刻会触发三重硬性崩塌（`LEAN ✓` + `文献结果`）：

1. **拆成一维线段或圆周（`1D` 崩塌）**：若将 $\Delta\mathcal{T}_\epsilon$ 拆解为三条各自孤立的一维测地弧段，闭合边界条件 $\partial(\partial\Delta\mathcal{T}_\epsilon) = 0$ 当场断裂；即便拼在同一个一维圆周 $S^1$ 上，旋转群 $\mathrm{U}(1) \cong \mathrm{SO}(2)$ 完全交换，任意三枚单位向量的格拉姆行列式恒为零 $\det G_3 \equiv 0$，吉拉尔球面角超 $\Omega = \alpha + \beta + \gamma - \pi \equiv 0$、贝里相位与左右手性全部归零；
2. **压入二维欧氏平面三角形（`2D` 平直崩塌）**：二维欧氏平面 $\mathbb{R}^2$ 里固然能画平直三角形，但高斯—博内定理将一切欧氏平面三角形的内角和死死钉在 $\alpha + \beta + \gamma \equiv \pi$（角超 $\Omega \equiv 0$）！从线性代数看，二维实内积空间 $\mathbb{R}^2$ 的格拉姆秩上限为 $2$：任意三枚向量 $u, v, w \in \mathbb{R}^2$ 必然实线性相关，由 [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff) 必有 $\det G_3(u, v, w) \equiv 0$，根本无法承载 $\Delta\mathcal{T}_\epsilon$ 非退化的三锚弯曲体积砖 $\det G_3 > 0$！不仅如此，哪怕只考察最基础的单量子比特纯态载体，内核定理 [`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian) 也严格证明：任意 $2 \times 2$ 复厄米算符 $M$ 唯一分解为实迹标量与**三维实欧氏空间** $\mathbb{R}^3$ 中的布洛赫向量 $\operatorname{bloch}(M) \in \mathbb{R}^3$，且一切纯态投影（$\Tr M = 1,\; M^2 = M$）精确落在三维空间内的二维单位球面 $\lVert\operatorname{bloch}(M)\rVert = 1$（$S^2 \subset \mathbb{R}^3$）上——没有第三维法向体空间，连单比特纯态球面 $S^2$ 都无处安放；
3. **最小紧致非交换单李代数的维数下限（$\dim = 3$ 代数地板）**：在整座李群与李代数分类大厦中（`文献结果`），一维紧李代数 $\mathfrak{u}(1)$ 与二维紧李代数 $\mathfrak{u}(1) \oplus \mathfrak{u}(1)$ 统统是阿贝尔（交换）代数（$[X, Y] = 0$），无法表达“先横转再竖转 $\neq$ 先竖转再横转”的非交换曲率和乐；唯一的二维非交换实李代数（仿射代数 $[X, Y] = X$）既非半单亦不具备正定不变基灵（Killing）度规，无法守恒量子公平范数。**全数学中维数最小的紧致非交换单李代数，恰恰就是三维的 $\mathfrak{su}(2) \cong \mathfrak{so}(3)$（$\dim = 3$）**！它的三根正交生成元满足循环自锁换位律 $[\hat{J}_1, \hat{J}_2] = \hat{J}_3,\; [\hat{J}_2, \hat{J}_3] = \hat{J}_1,\; [\hat{J}_3, \hat{J}_1] = \hat{J}_2$——前两根轴的不对易缺口恰好由第三根法轴封顶闭合，且由内核定理 [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word) 保证：只要在三维欧氏空间中握有任意两根严格不共线轴（$\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$）的整圆旋转，无需取拓扑闭包即可用精确有限字走遍整个三维旋转群 $\mathrm{SO}(3)$！低于三维，非交换保范自锁根本无从发生。

::: {.viz src="trihedron-rigidity-truss-sandbox" preset="downward-irreducibility-lock" height="520"}
**向下不可约锁死：`1D` 散弧与 `2D` 平直三角形均无法表示极小圆弧体 $\Delta\mathcal{T}_\epsilon$（`downward-irreducibility-lock`）。** 切换琥珀色降维投影开关：压向 `1D` 时环路断开、非交换手性消失；压向 `2D` 欧氏平面时内角和锁死在 $\alpha + \beta + \gamma = \pi$（品红角超 $\Omega = 0$ 且三锚格拉姆行列式 $\det G_3 = 0$）；唯有在完整 `3D` 空间（布洛赫球载体 $S^2 \subset \mathbb{R}^3$ 与 $\mathfrak{su}(2) \cong \mathfrak{so}(3)$）中，青色三边余弦才能同时撑开品红正角超 $\Omega > 0$ 与紫色正体元 $\det G_3 > 0$（绿色 `LEAN ✓` 对应 `bloch_geometry_of_isHermitian`、`three_anchor_gram_det_pos_iff` 与 `two_axis_finite_word`）。
:::

### 29.11.2.2 向上全刚性剖分完备性：为什么四维及以上无需新的基础空间几何原语？ {#sec-ch34-10-2-2}

反过来向上追问：当第 $4$ 个概念 $C_4$ 乃至更多概念陆续登场时，为什么宇宙不需要另起炉灶发明某种“不可还原的四维超多面体基础砖块”？

让我们亲手做一次经典的四节点力学实验。设有四个概念 $C_1, C_2, C_3, C_4$：

- **违背两两可比的稀疏四杆环 $C_4$（柔性剪切失稳）**：倘若删去对角比较 $\mathrm{CMP}(C_1, C_3)$ 与 $\mathrm{CMP}(C_2, C_4)$，只保留沿圈相连的四条比较边 $(C_1 C_2, C_2 C_3, C_3 C_4, C_4 C_1)$（边数 $E = 4$），在三维桁架空间中它比静定边数 $3 \times 4 - 6 = 6$ 少了整整两根斜撑（$\Delta E = 4 - 6 = -2$）；即便把四枚顶点全部限制在单位球面 $S^2 \subset \mathbb{R}^3$ 上构成**球面四连杆机构**，固定全部四条边弧长（例如全取 $60^\circ$），整座球面四边形依旧拥有 $1$ 个连续自由剪切模态——轻轻一推铰链，一条对角弧拉长、另一条对角弧缩短，形状像软塌塌的折叠晾衣架一样连续畸变，根本无法锁定唯一几何！
- **恢复两两可比的全连通四面体桁架 $K_4$（刚性三角剖分锁死）**：一旦按章首公理补齐对角比较边 $\mathrm{CMP}(C_1, C_3)$ 与 $\mathrm{CMP}(C_2, C_4)$，关系图立即升级为含 $E = \binom{4}{2} = 6$ 条边的全连通图 $K_4$！这两根新增对角弦瞬间把原本摇晃的四杆环 $C_4$ 刚性剖分为**四枚两两共棱咬合的极小圆弧体 $\Delta\mathcal{T}_\epsilon$**，围成第一座封闭的三维正四面体球壳桁架，剪切自由度当场清零！在任意有限维复希尔伯特空间中，这一“全连通内积锁死全局几何”的普适刚性定理由内核冻结的**格拉姆幺正延拓定理** [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq) 给出精确表述：对任意两族含 $n$ 个态矢的矩阵列族 $A, B \in \operatorname{Matrix}(m, n, \mathbb{C})$，只要它们的全连通两两比较格拉姆矩阵相等（$B^\dagger B = A^\dagger A$），环境空间上就必存在一枚整体幺正刚体变换 $U \in \mathrm{U}(m, \mathbb{C})$ 使得 $B = UA$！这正是中学几何“边—边—边（SSS）三角形全等刚性”向任意 $N$ 节点全连通量子关系网的终极推广。

更令人震撼的是，在经典几何、李代数分类、结合除环与计算复杂性四大数学支柱中，四条著名定理从四个独立侧面共同封死了“四维及以上基础空间原语”的必要性（各定理本身为 `文献结果`；“封死”是本书的读法，`MODEL`）：

1. **柯西—德恩—格卢克（Cauchy–Dehn–Gluck）三维多面体刚性定理**：Cauchy（1813）证明三维欧氏空间中一切凸多面体只要各面刚性即整体刚性；Dehn（1916）证明凸三角剖分多面体无穷小刚性；Gluck（1975）进一步证明三维空间中几乎所有闭三角剖分球面多面体仅凭**一维棱长（即两两比较余弦）**即完全刚性锁死——整座三维宏观骨架只需极小三角圆弧体共棱拼装，无需任何高维原语；
2. **塞尔（Serre）定理与高阶单李代数的 $\mathfrak{su}(2)$ 根三元组生成**：在嘉当—基灵（Cartan–Killing）分类与 Serre（1966）生成关系下，所有更高维紧致单李代数（从 $\mathfrak{su}(n), \mathfrak{so}(n)$ 直至 $248$ 维的例外李代数 $E_8$）统统是由若干个秩 $1$ 的**三维 $\mathfrak{su}(2)$ 根三元组**按嘉当矩阵两两内积余弦粘合而成的桁架！尤其值得注意的是，四维欧氏旋转李代数甚至根本不是单李代数——它直接退化分解为左右两份三维代数的直和 $\mathfrak{so}(4) \cong \mathfrak{su}(2)_L \oplus \mathfrak{su}(2)_R$，连旋转生成元自己都拆回了两个三维圆弧体代数；
3. **弗罗贝尼乌斯—胡尔维茨（Frobenius–Hurwitz）赋范除环结合律天花板**：Frobenius（1878）与 Hurwitz（1898）严格证明，实赋范可除代数仅存在于维数 $1, 2, 4, 8$（实数 $\mathbb{R}$、复数 $\mathbb{C}$、四元数 $\mathbb{H}$、八元数 $\mathbb{O}$），其单位纯虚球面依次为空集、$S^0$、$S^2 \subset \mathbb{R}^3$、$S^6 \subset \mathbb{R}^7$。其中四元数 $\mathbb{H}$（纯虚三维空间 $\operatorname{Im}\mathbb{H} \cong \mathbb{R}^3$，单位旋子群 $\mathrm{Sp}(1) \cong \mathrm{SU}(2)$ 作用在三维空间中的 $S^2$ 上）是**既非交换、又严格保持乘法结合律 $(q_1 q_2) q_3 = q_1 (q_2 q_3)$ 的绝对维数上限**！一旦试图把纯虚空间从三维（$\operatorname{Im}\mathbb{H}$）强行推向七维八元数虚空间（$\operatorname{Im}\mathbb{O} \cong \mathbb{R}^7$），乘法结合律当场崩坏 $(xy)z \neq x(yz)$，多步关系传输连“先算前两步还是先算后两步”的路径分组一致性都无法维持；
4. **库克—蔡廷（Cook–Tseitin）$k$-SAT 向 $3$-SAT 三元子句无损归约**：在约束满足与逻辑复杂性理论中，二元子句（`2-SAT`）无法编码非交换环路阻挫（属多项式时间 $\mathrm{P}$），而三元子句（`3-SAT`，恰对应三元极小圆弧体约束，Cook 1971）已完整触及 $\mathrm{NP}$-完备天花板；任何四元及更高阶约束（$k$-SAT，$k \ge 4$）均可借 Tseitin（1968）引入两两比较辅助变量，等可满足地三角剖分为纯粹的 `3-SAT` 三元组网络！

::: {.viz src="trihedron-rigidity-truss-sandbox" preset="floppy-c4-vs-rigid-k4" height="520"}
**柔性球面四连杆 $C_4$ 剪切失稳 vs. 全连通四面体桁架 $K_4$ 刚性锁死（`floppy-c4-vs-rigid-k4`）。** 左侧仅保留 $4$ 条周期边（缺失对角比较，$\Delta E = -2$），拨动琥珀色剪切扭矩滑块可见四条青色边长纹丝不动而对角开口连续歪斜；右侧恢复新旧全连通比较补齐两条对角边（$K_4,\; E = 6,\; \Delta E = 0$），四枚共棱极小圆弧体瞬间焊死全部角度与紫色格拉姆体积（绿色 `LEAN ✓` `exists_unitary_mul_eq_of_conjTranspose_mul_eq`；多面体刚性标 `文献结果`）。
:::

## 29.11.3 麦克斯韦—拉曼三维刚性多项式 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$：静定锁死与引力角亏、时间演化 {#sec-ch34-10-3}

现在，我们可以用一行初等却锋利无比的多项式，把“为什么三维在 $N = 3, 4$ 处精确静定锁死”以及本模型中“为什么 $N \ge 5$ 继续诞生新概念不会撑开四维、五维平直空间”彻底算清！

考察任意由极小圆弧体三角面片无缝围合而成的 $N$ 顶点封闭球面三角剖分多面体（$N \ge 3$）：内核定理 [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact) 以有符号欧拉示性数恒等式 $\lvert V\rvert - \lvert E\rvert + \lvert F\rvert = 2$ 为拓扑基石，证明面边界算子的核恰为常值面标号、值域恰等于整座图的 $\mathbb{Z}/2\mathbb{Z}$ 简单闭链空间。在全三角剖分下，每张三角面含 $3$ 条有向半边（dart）、每条无向棱恰由正反 $2$ 条半边拼成（$3F = 2E_{\mathrm{3D}}$），代入 $N - E_{\mathrm{3D}} + F = 2$ 立即解得三维三角剖分多面体的精确棱数与面数（手工推导，对一切 $N \ge 3$ 成立，其中 $N = 3$ 对应正反两面贴合的双覆叠三角二面体 $F = 2, E = 3$）：

$$
E_{\mathrm{3D}}(N) \;=\; 3N - 6, \qquad F(N) \;=\; 2N - 4.
$$

令人惊叹的巧合出现了：$E_{\mathrm{3D}}(N) = 3N - 6$ 恰恰一字不差地等于麦克斯韦（James Clerk Maxwell, 1864）导出的**三维欧氏空间 $N$ 节点桁架最小静定刚性杆数**（$N$ 个三维节点共 $3N$ 个平移自由度，减去三维刚体运动群 $\mathrm{SE}(3)$ 的 $3$ 个平移与 $3$ 个旋转共 $6$ 个整体自由度，恰好也是 $3N - 6$）！现在，用新旧概念两两可比的全连通图总边数 $\binom{N}{2}$ 减去三维静定三角桁架所需边数 $E_{\mathrm{3D}}(N) = 3N - 6$，我们当场得到**麦克斯韦—拉曼三维刚性盈余多项式**（手工推导，$\forall N \ge 3$）：

$$
\begin{aligned}
\Delta E(N) &\;:=\; \binom{N}{2} - E_{\mathrm{3D}}(N) \;=\; \frac{N(N - 1)}{2} - (3N - 6) \\
&\;=\; \frac{N^2 - 7N + 12}{2} \;\equiv\; \frac{(N - 3)(N - 4)}{2}.
\end{aligned}
$$

请凝视 $\Delta E(N) = \frac{(N - 3)(N - 4)}{2}$ 这两个整数根 **$N = 3$** 与 **$N = 4$**——整座三维空间刚性之谜的密码尽在于此（对一般维数 $d$，同一减法给出 $\binom{N}{2} - \bigl(dN - \binom{d+1}{2}\bigr) = \frac{(N-d)(N-d-1)}{2}$，双根落在 $N = d, d+1$；三维由本节取三角形与四面体为原语而定，`MODEL`）：

1. **$N = 3$（$K_3$ 单枚极小圆弧体）与 $N = 4$（$K_4$ 最小封闭四面体壳）：双根精确静定锁死 $\Delta E(3) = \Delta E(4) = 0$**！在三维空间（$d = 3$）中，全连通比较边数 $\binom{N}{2}$ 与 $d$ 维静定刚性杆数 $E_{\mathrm{iso}, d}(N) = dN - \binom{d+1}{2}$ 同时在**基本曲面原胞（$N = 3$，$\binom{3}{2} = 3 = 3\times 3 - 6$）**与**最小封闭体积壳（$N = 4$，$\binom{4}{2} = 6 = 3\times 4 - 6$）**两处实现零冗余、零欠约束的完美静定匹配！横向对比二维与四维立见高下：
   - 若空间只有二维（$d = 2$，拉曼定理 $E_{\mathrm{iso}, 2}(N) = 2N - 3$）：$N = 3$ 虽满足 $3 - 3 = 0$，却只能压成零曲率平直三角形（$\Omega \equiv 0$）；一到 $N = 4$，$K_4$ 的 $6$ 条边在平面内立刻超静定过载（$6 - 5 = +1$），逼迫第四点沿法向弹起跃入三维！
   - 若试图把基础空间设为四维（$d = 4$，$E_{\mathrm{iso}, 4}(N) = 4N - 10$，$N \ge 4$）：尽管在 $N = 4$ 处形式代入得 $4 \times 4 - 10 = 6$，但四维欧氏空间里的 $4$ 个顶点至多只能张成一块**三维仿射超平面**（四维单形体积恒等于 $0$！），第四维体方向在四面体层级完全悬空失锁！唯有三维把“弯曲三角原胞”与“封闭四面体体积”同时焊死在 $\Delta E = 0$ 的静定鞍点上。

::: {.viz src="trihedron-rigidity-truss-sandbox" preset="maxwell-laman-polynomial" height="520"}
**麦克斯韦—拉曼三维刚性多项式 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ 与双静定根锁死（`maxwell-laman-polynomial`）。** 沿横轴推进概念节点数 $N \in \{3, 4, 5, 6, 7, 8\}$：青色曲线 $\binom{N}{2}$ 为全连通比较总数，紫色直线 $3N - 6$ 为三维球面三角剖分（欧拉公式 $V - E + F = 2$ 为 `face_cycle_exact` 的假设）与三维静定桁架边数；琥珀色指针在 $N = 3$ 与 $N = 4$ 两处精确命中零冗余静定根 $\Delta E = 0$，而在 $N \ge 5$ 进入品红超静定自应力区 $\Delta E(N) > 0$（手工推导 + `NUM`）。
:::

2. **$N \ge 5$（新概念持续创生，$\Delta E(5) = +1,\; \Delta E(6) = +3,\; \Delta E(7) = +6, \dots$）：为什么多余比较化为“引力曲率与时间步”，而不是撑开四维、五维宏观平直空间？**  
   这里必须恪守本书最核心的认识论诚实边界，把**抽象量子态希尔伯特空间 $\mathcal{H}$** 与**局域宏观物理空间**严格区分开来：在抽象复希尔伯特空间 $\mathcal{H}$ 中，$N$ 个独立量子态或 $n$ 个纠缠量子比特当然可以张开高维复子空间（例如 $\dim_{\mathbb{C}}\mathcal{H} = 2^n$ 承载[第十三章](ch13-entanglement-and-chsh.md)与[附录 E](appendix-e.md)假设 `H4` 下的多体纠缠秩，或 §29.10 算例中四枚 $60^\circ$ 单位态张成 $\mathbb{R}^4$ 单形）；然而，在由结合律旋量传输（$\operatorname{Im}\mathbb{H} \cong \mathbb{R}^3$、单比特布洛赫球面 $S^2 \subset \mathbb{R}^3$）与共面粘贴的极小圆弧体桁架所编织的**局域宏观物理空间**中（`MODEL`），每当第 $N$ 个新概念节点（$N \ge 5$）并入已锁定的三维四面体桁架时，只需向既有桁架的一枚三角面（$3$ 个不共面锚点）交出 **$3$ 条两两比较边**，它在三维空间中的相对坐标就被三球交汇确定到关于三锚平面互为镜像的两个位置（边数从 $3(N-1)-6$ 增至 $3N-6$）。这只是局部刚性：把新节点对三锚平面作反射，三条已测比较全部不变，它与其他旧节点之间未测的比较一般会改变（`手工推导`）；$N \ge 5$ 时要在全局唯一确定，一般位置下至少需要 $3N-5$ 条比较（Hendrickson 1992，`文献结果`）！
   那么，$K_N$ 全连通公理强行要求它向其余 $N - 4$ 个旧节点继续交出的那 $\Delta E(N) - \Delta E(N-1) = N - 4$ 条额外比较边（全网累计 $\Delta E(N) = \frac{(N-3)(N-4)}{2} > 0$ 条超静定弦），当其目标比量长度与平直 $\mathbb{R}^3$ 诱导距离不相等时，究竟去了哪里？在三维离散几何与广义相对论中，超静定边长阻挫有两条无需逃往高维平直空间的物理出路（`文献结果` + `MODEL`）：
   - **第一出路——内禀三维引力曲率（雷吉角亏 $\delta_e$）**：按雷吉微积分（Tullio Regge, 1961），当多枚边长各自刚性的三维四面体围绕一条公共内部铰链棱 $e$ 共面拼接，而后加的第 $10$ 条（及更高阶）$K_N$ 比较棱长拒绝等于平直欧氏值时，各四面体围绕棱 $e$ 的二面角之和 $\sum_{k \ni e} \theta_k(e)$ 不再等于 $2\pi$，而是在公共棱 $e$ 上集中起非零**雷吉角亏（deficit angle）**

     $$
     \delta_e \;:=\; 2\pi - \sum_{k \ni e} \theta_k(e) \;\neq\; 0.
     $$

     绕棱 $e$ 平行输运任意三维旋子或切向量一周，方向便精确偏转 $\delta_e$——这正是**无需任何四维或五维外部平直嵌入容器的内禀三维黎曼—爱因斯坦引力曲率**！在离散上同调语言中，这种局部四面体完美刚性但全局无法拼成零应力平直边势的几何阻挫，恰可类比于 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) 中的非零四面体上边缘缺陷 `tetraDefects F > 0`（`MODEL`）；
   - **第二出路——离散时序重联步（帕赫纳 $2 \leftrightarrow 3$ 双星翻转）**：在 $N = 5$（$K_5$，$\binom{5}{2} = 10$ 条比较边，比三维双三角锥表面/体桁架所需的 $3 \times 5 - 6 = 9$ 条边恰好多出 $\Delta E(5) = +1$ 条超静定轴向弦！）的最小超静定单元上，系统在任意单一静态三维切片上只有两种无穿插四面体剖分：要么取“上下 $2$ 枚共底面四面体”（只用 $9$ 条边，不含轴向第 $10$ 边），要么取“围绕轴向第 $10$ 边共棱环抱的 $3$ 枚四面体”（用到全部 $10$ 条边）。从前者跳向后者的拓扑重构，正是三维流形著名的**帕赫纳（Pachner）$2 \leftrightarrow 3$ 双星翻转步**——超静定比较边驱动三维桁架不断执行局部 $2 \leftrightarrow 3$ 重联，在宏观上显影为生生不息的**一维时间演化步**（`3+1D`）！

下表将 $N = 2$、稀疏环 $C_4$、静定根 $K_3 / K_4$ 与超静定网 $K_N$（$N \ge 5$）的四重刚性相图汇总为一目了然的定量判据：

| 概念图规模与拓扑 | 比较边数 $E$ | 三维静定基准 $3N - 6$ | 盈余度 $\Delta E = E - (3N - 6)$ | 三维空间刚性与物理几何表现（`LEAN ✓` + `文献结果` + `MODEL`） |
| :--- | :--- | :--- | :--- | :--- |
| **二元孤立对（$N = 2, K_2$）** | $1$ | —（共线退化，$3\times 2 - 5 = 1$） | $0$（仅锁一维弧长） | 仅定单条测地夹角 $\theta_{\mathrm{FS}}$，绕连线旋转一圈无环路面积（$\Omega = 0$），无三维体元 |
| **稀疏四杆环（$N = 4, C_4$）** | $4$ | $6$ | $-2$（欠约束柔性机构） | 违背全连通可比性（漏掉两条对角比较），球面四连杆存在连续剪切畸变模态，无法锁定形状 |
| **三元原胞与四面体壳（$N = 3, 4;\, K_3, K_4$）** | $3,\; 6$ | $3,\; 6$ | $0,\; 0$（双根精确静定锁死） | `exists_unitary_mul_eq_of_conjTranspose_mul_eq` 全连通锁死：极小圆弧体 $K_3$ 与封闭四面体桁架 $K_4$ 零冗余刚性定型，在 $d = 3$ 计数下锚定三维空间（`MODEL`） |
| **五元及以上全连通网（$N \ge 5, K_N$）** | $\binom{N}{2}$ | $3N - 6$ | $\frac{(N-3)(N-4)}{2} \ge +1$（超静定自应力） | 无需开启四维以上宏观平直容器；边数盈余本身不决定角亏（在 $\mathbb{R}^3$ 中任取五个一般位置的点，$K_5$ 的十条比较全部在平直空间中实现，角亏为零，`手工推导`），只有指定沿每条棱拼接的四面体且边长偏离平直值时，多余比较边才在三维桁架公共棱上激发雷吉引力角亏 $\delta_e = 2\pi - \sum\theta_k$ 与帕赫纳 $2 \leftrightarrow 3$ 离散时间演化步（`MODEL`） |

::: {.viz src="trihedron-rigidity-truss-sandbox" preset="regge-curvature-glow" height="520"}
**$N \ge 5$ 超静定全连通网 $K_N$：第 $10$ 条比较弦在公共铰链棱上点亮雷吉引力曲率角亏 $\delta_e$ 与帕赫纳 $2 \leftrightarrow 3$ 翻转（`regge-curvature-glow`）。** 在 $N = 5$（$K_5,\; \Delta E(5) = +1$）双三角锥桁架上拉动琥珀色第 $10$ 条跨极比较弦长度：当它偏离平直欧氏兼容值 $2\sqrt{6}/3 \approx 1.6330$ 时，围绕中央公共棱的紫色四面体群不再闭合满 $2\pi$，品红辉光精确标出集中在铰链棱上的内禀引力角亏 $\delta_e = 2\pi - \sum_k \theta_k$，点击翻转开关即可触发 $2 \leftrightarrow 3$ 离散时间重联步（绿色 `LEAN ✓` `tetra_defects_incidence_repair_and_exactness`（仅上链计数）+ 雷吉微积分 `文献结果` + 时空诠释 `MODEL`）。
:::

## 29.11.4 形式化锚点、球面四连杆与雷吉角亏基准算例 {#sec-ch34-10-4}

下述核心合取定理将支撑本节全连通比较刚性、单比特三维布洛赫球载体、三锚弯曲体积判据、球面测地三角不等式、三维双轴旋转有限字生成、球面欧拉闭链正合性以及单纯四面体上边缘缺陷精确修补的八项底层数学支柱，完整锁定在 `trureturing` 的八条冻结内核声明之上：

::: {.theorem #thm-ch34-trihedron-rigidity-and-complete-graph title="格拉姆幺正刚性延拓、纯态三维布洛赫球载体、三锚体积正定、球面三角不等式、双轴旋转生成与球面欧拉—四面体缺陷正合定理" lean="D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"}
在 `trureturing` 冻结的格拉姆幺正延拓、纯量子比特几何、三锚格拉姆矩阵、富比尼—施图迪记录时间界、三维双轴有限旋转、平面图旋转系统边界与单纯二上链修补模块中，以下八项数学结论同时成立：

1. **全连通格拉姆相等下的环境空间幺正刚性延拓（`exists_unitary_mul_eq_of_conjTranspose_mul_eq`）**：设 $m, n$ 为指标类型（其中 $m$ 为具可判定相等的有限类型 `Fintype m`、`DecidableEq m`，$n$ 为有限类型 `Finite n`），$B, A \in \operatorname{Matrix}(m, n, \mathbb{C})$ 为两族复矩阵。若二者的 $n \times n$ 列格拉姆矩阵相等（$B^\dagger B = A^\dagger A$），则公共陪域上必存在幺正矩阵 $U \in \operatorname{Matrix.unitaryGroup}(m, \mathbb{C})$，使得

   $$
   B \;=\; U A.
   $$

2. **二阶厄米矩阵的三维实布洛赫分解与纯态单位球面判据（`bloch_geometry_of_isHermitian`）**：对任意 $2 \times 2$ 复厄米矩阵 $M \in \operatorname{Matrix}(\operatorname{Fin} 2, \operatorname{Fin} 2, \mathbb{C})$（满足 $M.\mathrm{IsHermitian}$），记三维实欧氏空间 $\operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} 3)$ 中的布洛赫向量为 $\operatorname{bloch}(M) := \bigl(2\operatorname{Re} M_{01},\, -2\operatorname{Im} M_{01},\, \operatorname{Re} M_{00} - \operatorname{Re} M_{11}\bigr)$，重构矩阵为 $\operatorname{blochMatrix}(a, r) := \frac{1}{2}\begin{pmatrix} a + r_2 & r_0 - i r_1 \\ r_0 + i r_1 & a - r_2 \end{pmatrix}$，则恒有

   $$
   M \;=\; \operatorname{blochMatrix}\bigl((\Tr M).\mathrm{re},\, \operatorname{bloch}(M)\bigr) \;\wedge\; \bigl(\Tr M = 1 \;\to\; M^2 = M \;\to\; \lVert\operatorname{bloch}(M)\rVert = 1\bigr).
   $$

3. **三锚实格拉姆行列式的显式体积平方公式（`three_anchor_gram_det_formula`）**：在任意实内积空间 $E$ 中，对任意三枚向量 $u, v, w \in E$ 及其 $3 \times 3$ 实格拉姆矩阵 $G_3(u, v, w) := \operatorname{threeAnchorGram}(u, v, w) = \operatorname{gram}_{\mathbb{R}}([u, v, w])$，恒有

   $$
   \begin{aligned}
   \det G_3(u, v, w) &\;=\; \lVert u\rVert^2 \lVert v\rVert^2 \lVert w\rVert^2 + 2\langle u, v\rangle_{\mathbb{R}} \langle u, w\rangle_{\mathbb{R}} \langle v, w\rangle_{\mathbb{R}} \\
   &\quad - \lVert u\rVert^2 \langle v, w\rangle_{\mathbb{R}}^2 - \lVert v\rVert^2 \langle u, w\rangle_{\mathbb{R}}^2 - \lVert w\rVert^2 \langle u, v\rangle_{\mathbb{R}}^2.
   \end{aligned}
   $$

4. **三锚格拉姆行列式严格正定与三维实线性无关充要判据（`three_anchor_gram_det_pos_iff`）**：在任意实内积空间 $E$ 中，对任意向量 $u, v, w \in E$，恒有

   $$
   0 < \det G_3(u, v, w) \;\Longleftrightarrow\; \operatorname{LinearIndependent}_{\mathbb{R}}([u, v, w]).
   $$

5. **单位态富比尼—施图迪夹角的球面三角不等式（`fs_angle_triangle`）**：在任意复内积空间 $E$ 中，定义相位无关的富比尼—施图迪角 $\operatorname{fsAngle}(x, y) := \arccos\lVert\langle x, y\rangle_{\mathbb{C}}\rVert$，则对任意三枚单位向量 $a, b, c \in E$（$\lVert a\rVert = \lVert b\rVert = \lVert c\rVert = 1$），恒有

   $$
   \operatorname{fsAngle}(a, c) \;\le\; \operatorname{fsAngle}(a, b) + \operatorname{fsAngle}(b, c).
   $$

6. **三维空间任意两不共线轴整圆旋转的精确有限字生成（`two_axis_finite_word`）**：在三维实欧氏空间 $\mathrm{Space} := \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} 3)$ 及其线性等距正交群 $\mathrm{Orthogonal} := (\mathrm{Space} \simeq_{\ell i}[\mathbb{R}] \mathrm{Space})$ 上，对任意满足严格不共线条件 $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$ 的两轴 $a, b \in \mathrm{Space}$ 以及任意满足 $\operatorname{determinant}(R) = 1$ 的保定向正交变换 $R \in \mathrm{Orthogonal}$，无需拓扑闭包即存在有限字 $l \in \operatorname{List}(\mathrm{Orthogonal})$，使得

   $$
   \operatorname{IsAxisWord}(a, b, l) \;\wedge\; l.\mathrm{prod} = R.
   $$

7. **球面欧拉示性数旋转系统的面—边边界核与简单闭链空间正合性（`face_cycle_exact`）**：设 $G$ 为有限连通简单图（`[Fintype V]`、`[DecidableEq V]`、`[DecidableRel G.Adj]`、`G.Connected`）且含至少一条有向半边（`Nonempty G.Dart`），$R : \operatorname{Rotation}(G)$ 为顶点半边循环旋转系统，其面轨道商集 $R.\mathrm{Face}$ 满足球面欧拉恒等式 $\lvert V\rvert - \lvert G.\mathrm{edgeSet}\rvert + \lvert R.\mathrm{Face}\rvert = 2$（于 $\mathbb{Z}$ 中成立）。则 $\mathbb{Z}/2\mathbb{Z}$-线性边界算子 $R.\mathrm{boundary} : (R.\mathrm{Face} \to \mathbb{Z}/2\mathbb{Z}) \to (G.\mathrm{edgeSet} \to \mathbb{Z}/2\mathbb{Z})$ 同时满足：
   - 对任意面标号 $x : R.\mathrm{Face} \to \mathbb{Z}/2\mathbb{Z}$ 与有向半边 $d \in G.\mathrm{Dart}$，$R.\mathrm{boundary}(x)\langle d.\mathrm{edge}, d.\mathrm{edge\_mem}\rangle = x(R.\mathrm{face}(d)) + x(R.\mathrm{face}(d.\mathrm{symm}))$；
   - $R.\mathrm{boundary}(x) = 0 \;\Longleftrightarrow\; \exists c \in \mathbb{Z}/2\mathbb{Z},\; x = (\lambda \_ \Rightarrow c)$；
   - $\operatorname{LinearMap.range}(R.\mathrm{boundary}) = \operatorname{simpleCycleSpace}(G)$。

8. **完全有序单纯形上四面体上边缘缺陷计数、锚定修补界与一维边势正合判据（`tetra_defects_incidence_repair_and_exactness`）**：设 $V$ 为有限非空顶点集（`[Fintype V]`、`[Nonempty V]`），$A$ 为加法交换群（`[AddCommGroup A]`），$F : V \to V \to V \to A$ 为三元有序二上链。记 $\operatorname{faceErrors}(F, r)$ 为锚点 $r \in V$ 诱导边上链未能复现 $F(i, j, k)$ 的有序三元组计数，$\operatorname{tetraDefects}(F)$ 为四面体上边缘 $F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) \neq 0$ 的有序四元组计数，$\operatorname{edgeErrors}(F, \mathrm{edge})$ 为任意边函数 $\mathrm{edge} : V \to V \to A$ 未能按 $\mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)$ 复现 $F(i, j, k)$ 的有序三元组计数，则恒有

   $$
   \begin{aligned}
   &\left(\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)\right)
   \;\wedge\; \bigl(\exists r \in V,\; \lvert V\rvert \cdot \operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)\bigr) \\
   &\quad \wedge\; \bigl(\forall \mathrm{edge} : V \to V \to A,\; \operatorname{tetraDefects}(F) \le 4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})\bigr) \\
   &\quad \wedge\; \Bigl(\bigl(\forall r, i, j, k \in V,\; F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) = 0\bigr) \\
   &\qquad\quad \Longleftrightarrow\; \bigl(\exists \mathrm{edge} : V \to V \to A,\; \forall i, j, k \in V,\; F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)\bigr)\Bigr).
   \end{aligned}
   $$

:::

::: proof
第 1 款将 $A, B$ 视为 $\mathbb{C}^n \to \mathbb{C}^m$ 的欧氏线性映射 $f_A, f_B$，由 $B^\dagger B = A^\dagger A$ 推出对一切 $v, w$ 有 $\langle f_B v, f_B w\rangle_{\mathbb{C}} = \langle f_A v, f_A w\rangle_{\mathbb{C}}$，从而 $\ker f_A \le \ker f_B$ 并在值域 $\operatorname{range}(f_A)$ 上诱导出线性等距映射 $L_{\mathrm{iso}} : \operatorname{range}(f_A) \to_{\ell i} \mathbb{C}^m$；调用有限维内积空间子空间等距延拓算子 `LinearIsometry.extend` 即得全空间幺正变换 $U \in \mathrm{U}(m, \mathbb{C})$ 使 $B = UA$。第 2 款利用厄米性给出对角元虚部为零与非对角元共轭对称，逐分量核验 $M = \operatorname{blochMatrix}((\Tr M).\mathrm{re}, \operatorname{bloch}(M))$，再对 $\Tr M = 1$ 与幂等条件 $M^2 = M$ 取迹实部导出 $\lVert\operatorname{bloch}(M)\rVert^2 = 1$。第 3 款直接按三阶矩阵行列式展开并结合实内积对称性化简；第 4 款由实格拉姆矩阵正定（行列式恒正）与向量组实线性无关的充要性直接给出。第 5 款选取单位复相位因子 $u, v$（$\lvert u\rvert = \lvert v\rvert = 1$）对齐内积使 $\langle \bar{u} a, b\rangle_{\mathbb{R}} = \lVert\langle a, b\rangle_{\mathbb{C}}\rVert$ 且 $\langle b, v c\rangle_{\mathbb{R}} = \lVert\langle b, c\rangle_{\mathbb{C}}\rVert$，结合 $\langle \bar{u} a, v c\rangle_{\mathbb{R}} \le \lVert\langle a, c\rangle_{\mathbb{C}}\rVert$、实内积空间无向夹角三角不等式与 $\arccos$ 单调递减性证得。第 6 款将非零不共线两轴归一化后，利用极冠纬圈相交引理证明字群轨道在连通二维单位球面上既开又闭，从而传递覆盖 $S^2$ 并将稳定子归入单轴旋转圆。第 7 款由无向边代表元无关性导出半边边界和公式，借连通图路径归纳证得零边界等价于常值面标号（核维数为 $1$），再由半边对合求和证明 $\operatorname{range}(R.\mathrm{boundary}) \le \operatorname{simpleCycleSpace}(G)$，最后代入欧拉公式 $\lvert V\rvert - \lvert E\rvert + \lvert F\rvert = 2$ 核对两边 $\mathbb{Z}/2\mathbb{Z}$-维数同为 $\lvert F\rvert - 1 = \lvert E\rvert - \lvert V\rvert + 1$ 而得相等。第 8 款由交换群恒等式 $F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) = F(i,j,k) - \bigl(F(r,j,k) - F(r,i,k) + F(r,i,j)\bigr)$ 逐项求和得第一式，取有限集最小值点得平均值存在界（第二式），对四面体四个面误差作并集计数得 $4\lvert V\rvert$ 上界（第三式），并在上边缘全零时任取锚点 $r_0 \in V$ 置 $\mathrm{edge}(x, y) := F(r_0, x, y)$ 反向构造出精确边势（第四式）。完整证明由 Lean 内核检查。
:::

::: {.example #ex-ch34-rigidity-truss-and-regge-deficit-benchmark title="麦克斯韦—拉曼刚性账本、60 度球面四连杆对正四面体锁死与 K5 雷吉角亏基准算例（手工推导与数值核验）"}
我们将本节的三项核心定量断言——（1）$N = 3 \dots 8$ 麦克斯韦—拉曼刚性多项式账本、（2）边弧 $\theta_0 = 60^\circ$ 下柔性四杆环 $C_4$ 连续剪切族与全连通正四面体桁架 $K_4$ 的刚性对比、（3）$N = 5$（$K_5,\; \Delta E = +1$）围绕公共铰链棱的雷吉引力角亏——逐项手算至四位小数：

1. **$N \in \{3, 4, 5, 6, 7, 8\}$ 麦克斯韦—拉曼三维刚性多项式精确账本**：对封闭球面三角剖分（欧拉公式 $V - E_{\mathrm{3D}} + F = 2$——即 `face_cycle_exact` 的假设——且 $3F = 2E_{\mathrm{3D}}$），依次核对全连通比较边数 $\binom{N}{2}$、三维静定桁架边数 $E_{\mathrm{3D}}(N) = 3N - 6$、三角面数 $F(N) = 2N - 4$ 与超静定盈余度 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$：

   | 概念节点数 $N$ | 全连通比较边 $\binom{N}{2}$ | 三维静定边 $3N - 6$ | 三角面数 $F = 2N - 4$ | 欧拉核验 $N - E_{\mathrm{3D}} + F$ | 刚性盈余 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ |
   | :---: | :---: | :---: | :---: | :---: | :---: |
   | $3$ | $3$ | $3$ | $2$ | $3 - 3 + 2 = 2$ | $0$（基本圆弧体静定根） |
   | $4$ | $6$ | $6$ | $4$ | $4 - 6 + 4 = 2$ | $0$（封闭四面体静定根） |
   | $5$ | $10$ | $9$ | $6$ | $5 - 9 + 6 = 2$ | $+1$（首枚超静定角亏弦） |
   | $6$ | $15$ | $12$ | $8$ | $6 - 12 + 8 = 2$ | $+3$ |
   | $7$ | $21$ | $15$ | $10$ | $7 - 15 + 10 = 2$ | $+6$ |
   | $8$ | $28$ | $18$ | $12$ | $8 - 18 + 12 = 2$ | $+10$ |

2. **等边 $60^\circ$ 柔性四杆环 $C_4$ 连续剪切族 vs. 全连通 $K_4$ 四面体刚性锁死**：
   - **球面四连杆 $C_4$（缺失对角比较）**：在单位球面 $S^2 \subset \mathbb{R}^3$ 上取四枚单位态 $u_1, u_2, u_3, u_4$，令四条周期边夹角恒定为 $\theta_0 = 60^\circ$（$c_{12} = c_{23} = c_{34} = c_{41} = \cos 60^\circ = 0.5000$），例如对称球面菱形参数化 $u_{1,3} = (\pm\sin\alpha, 0, \cos\alpha)$、$u_{2,4} = (0, \pm\sin\beta, \cos\beta)$（满足 $\cos\alpha\cos\beta = 0.5000$）。记顶点 $u_2$ 处两相邻 $60^\circ$ 弧面之间的铰链二面角为 $\gamma \in [0^\circ, 180^\circ]$，由球面余弦定理立得对角比较余弦连续剪切族

     $$
     c_{13}(\gamma) \;=\; \cos^2 60^\circ + \sin^2 60^\circ \cos\gamma \;=\; \frac{1}{4} + \frac{3}{4}\cos\gamma \;\in\; [-0.5000,\, 1.0000], \qquad c_{24}(\gamma) \;=\; \frac{-c_{13}(\gamma)}{1 + c_{13}(\gamma)}.
     $$

     当 $\gamma$ 从 $0^\circ$ 扫至 $180^\circ$ 时，四条边长始终固定在 $60.0000^\circ$，但机构沿一维剪切流形无阻力连续变形：在折叠狭缝端 $\gamma = 0^\circ$ 处 $c_{13} = 1.0000$（$d_1 = 0.0000^\circ$）、$c_{24} = -0.5000$（$d_2 = 120.0000^\circ$）；经直角铰链 $\gamma = 90^\circ$ 处 $c_{13} = 0.2500$（$d_1 = \arccos(1/4) \approx 75.5225^\circ$）、$c_{24} = -0.2000$（$d_2 = \arccos(-1/5) \approx 101.5370^\circ$）；过对称球面正方形 $\gamma = \arccos(-1/3) \approx 109.4712^\circ$ 处 $c_{13} = c_{24} = 0.0000$（$d_1 = d_2 = 90.0000^\circ$）；直达对向展平端 $\gamma = 180^\circ$ 处 $c_{13} = -0.5000$（$d_1 = 120.0000^\circ$）、$c_{24} = 1.0000$（$d_2 = 0.0000^\circ$）！一旦焊上 $K_4$ 的两条对角比较（在 $S^2$ 上如锁死正四面体中心余弦 $c_{ij} = -1/3$，夹角 $\arccos(-1/3) \approx 109.4712^\circ$，三锚体积 $\det G_3 = 16/27 \approx 0.5926$），剪切自由度立刻归零；
   - **三维欧氏等边四面体桁架 $K_4$（全部 $6$ 棱等长 $\ell = 1$）**：在 $\mathbb{R}^3$ 中将四杆空间菱形 $C_4$（$\Delta E = 4 - 6 = -2$）补齐两条单位对角杆 $\ell_{13} = \ell_{24} = 1$ 后，$6$ 条单位棱围成唯一刚性正四面体（$4$ 个等边 $60^\circ$ 三角面）。从任一顶点发出的三根单位棱向量 $(u, v, w)$ 两两夹角皆为 $60^\circ$（内积全为 $0.5000$），由 `three_anchor_gram_det_formula` 锁定唯一三锚格拉姆行列式

     $$
     \det G_3(u, v, w) \;=\; 1 + 2\left(\frac{1}{2}\right)^3 - 3\left(\frac{1}{2}\right)^2 \;=\; \frac{1}{2} \;=\; 0.5000,
     $$

     相邻两面二面角刚性锁定在 $\theta_{\mathrm{tet}} = \arccos(1/3) \approx 1.2310\;\mathrm{rad}$（更精确地为 $1.230959\;\mathrm{rad} \approx 70.5288^\circ$），内部连续剪切自由度恒为 $0$！

3. **$N = 5$（$K_5,\; \Delta E(5) = +1$）双三角锥第 $10$ 弦阻挫与雷吉铰链角亏算例**：考察由两枚单位棱长正四面体沿公共赤道等边三角形底面粘合而成的五顶点双三角锥（已含 $9 = 3 \times 5 - 6$ 条单位外棱）。在平直 $\mathbb{R}^3$ 中，单枚正四面体高为 $h = \sqrt{2/3} \approx 0.8165$，故南北两极点间的欧氏无应力距离已被前 $9$ 条棱唯一锁死在 $\ell_{AB}^{\mathrm{flat}} = 2\sqrt{6}/3 \approx 1.6330$（此时经 $2 \to 3$ 翻转拆成的 $3$ 枚四面体绕中心轴棱 $AB$ 的二面角各为 $120.0000^\circ$，总和 $360.0000^\circ$，角亏 $\delta_{AB} = 0.0000^\circ$）。一旦全连通图 $K_5$ 的第 $10$ 条比较弦要求南北极点也保持等边单位距离 $\ell_{AB} = 1.0000$（即 $3$ 枚全等正四面体围绕公共轴棱 $AB$ 共面闭合），绕轴棱 $AB$ 的二面角总和骤降为

   $$
   3\theta_{\mathrm{tet}} \;=\; 3\arccos\!\left(\frac{1}{3}\right) \;\approx\; 3.6929\;\mathrm{rad}\; (3.692878\;\mathrm{rad}) \;\approx\; 211.5863^\circ \;<\; 360.0000^\circ,
   $$

   从而无需跳入四维欧氏容器，直接在三维内部铰链棱 $AB$ 上集中起正的雷吉引力角亏 $\delta_e^{(3)} = 2\pi - 3\arccos(1/3) \approx +2.5903\;\mathrm{rad} \approx +148.4137^\circ$！即便围绕同一条内部棱尽可能密集地拼入 $5$ 枚正四面体，二面角总和仍停在

   $$
   5\theta_{\mathrm{tet}} \;=\; 5\arccos\!\left(\frac{1}{3}\right) \;\approx\; 6.1548\;\mathrm{rad}\; (6.154797\;\mathrm{rad}) \;\approx\; 352.6439^\circ \;<\; 360.0000^\circ,
   $$

   留下著名的正二十面体/正六百胞体雷吉曲率角亏量子 $\delta_e^{(5)} = 2\pi - 5\arccos(1/3) \approx +0.1284\;\mathrm{rad}$（$0.128388\;\mathrm{rad} \approx +7.3561^\circ$）！因为 $\frac{1}{\pi}\arccos(1/3)$ 是无理数，任何正整数枚正四面体都永远无法在三维空间中无角亏地铺平 $2\pi$——在全取单位边长时，超静定全连通比较天生自带内禀三维曲率！
:::

::: {.remark #rem-ch34-cauchy-maxwell-regge-frobenius-literature title="柯西—麦克斯韦—拉曼刚性、弗罗贝尼乌斯除环、塞尔根生成、蔡廷归约与雷吉—帕赫纳离散引力文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节关于“三角形稳定性锁死三维空间刚性”的综合论证，严格划分以下三层认识论边界：

1. **多面体与桁架刚性、赋范除环、单李代数生成、3-SAT 归约与离散引力文献**：三维凸多面体全局刚性定理由 A.-L. Cauchy（*J. Éc. Polytech.* **9**, 87, 1813）证明，无穷小刚性由 M. Dehn（*Math. Ann.* **77**, 466, 1916）证明，一般闭三角剖分球面多面体仅由边长决定的通有刚性由 H. Gluck（*Lecture Notes in Math.* **438**, 225, 1975）证明；三维与二维杆铰桁架静定计数 $3N - 6$ 与 $2N - 3$ 分别出自 J. C. Maxwell（*Phil. Mag.* **27**, 294, 1864）与 G. Laman（*J. Eng. Math.* **4**, 331, 1970）；实赋范可除代数维数分类 $\{1, 2, 4, 8\}$ 与四元数结合律上限出自 F. G. Frobenius（*J. Reine Angew. Math.* **84**, 1, 1878）与 A. Hurwitz（*Nachr. Ges. Wiss. Göttingen*, 309, 1898），紧致半单李代数由秩 $1$ 的 $\mathfrak{su}(2)$ 根三元组经嘉当矩阵关系完全生成的定理由 J.-P. Serre（*Algèbres de Lie semi-simples complexes*, Benjamin, 1966）系统确立；布尔可满足性的 `3-SAT` $\mathrm{NP}$-完备性与高阶子句向三元子句的线性辅助变量等可满足归约出自 S. A. Cook（*Proc. 3rd ACM STOC*, 151, 1971）与 G. S. Tseitin（*Zap. Nauchn. Sem. LOMI* **8**, 234, 1968）；无坐标单纯形铰链角亏引力（$\delta_e = 2\pi - \sum\theta_k$）与分段线性流形同胚三角剖分之间的有限双星翻转完备性（三维中为 $2 \leftrightarrow 3$ 与 $1 \leftrightarrow 4$ 移动）分别出自 T. Regge（*Nuovo Cimento* **19**, 558, 1961）与 U. Pachner（*Eur. J. Combin.* **12**, 129, 1991）；正四面体二面角 $\arccos(1/3)$ 与 $\pi$ 不可公度见 J. H. Conway, C. Radin & L. Sadun（*Discrete Comput. Geom.* **22**, 321, 1999）；
2. **本书内核验证锚点（`LEAN ✓`）**：等格拉姆矩阵列族的全空间幺正刚性延拓 `exists_unitary_mul_eq_of_conjTranspose_mul_eq`、二阶厄米矩阵三维实布洛赫表示与纯态单位球面判据 `bloch_geometry_of_isHermitian`、三锚格拉姆行列式公式与正定线性无关判据 `three_anchor_gram_det_formula` / `three_anchor_gram_det_pos_iff`、富比尼—施图迪球面三角不等式 `fs_angle_triangle`、三维双轴整圆旋转精确有限字生成 `two_axis_finite_word`、球面欧拉示性数旋转系统闭链正合性 `face_cycle_exact` 以及四面体三上边缘缺陷与一维边势精确修复判据 `tetra_defects_incidence_repair_and_exactness` 等八项定理，均已由 [@thm-ch34-trihedron-rigidity-and-complete-graph] 在 Lean 4 内核中完整验证；
3. **抽象纠缠维数与局域三维物理空间模型的严格区分（`MODEL`）**：本书绝不否认 $n$ 个量子比特在抽象复希尔伯特空间 $\mathcal{H} \cong (\mathbb{C}^2)^{\otimes n}$ 中拥有高维张量积态空间（见[第十三章](ch13-entanglement-and-chsh.md)与[附录 E](appendix-e.md)假设 `H4`）；将“新旧概念全连通可比图 $K_N$ + 极小圆弧体向下不可约与向上四面体静定剖分 $\Delta E(3) = \Delta E(4) = 0$ + $N \ge 5$ 超静定比较转化为雷吉角亏与帕赫纳时序步”作为宏观物理空间之所以刚性结晶为三维（`3+1D`）的几何起源解释，属于本书的理论综合模型（`MODEL`），不声称已在 Lean 中形式化连续洛伦兹爱因斯坦场方程或四维量子引力动力学收敛性。
:::

至此，第二十九章的前十一级几何阶梯已在“极小圆弧体三角形稳定性”的刚性锁扣声中层层咬合：我们从球面“正交一次”与“正交两次”读数简并反演出观察者极点机位，并校准往返双投影玻恩回波与 $90^\circ$ 正交虚数盲区（§29.1–§29.4），由“二生三”自举撑开极小三角弧面体 $\Delta\mathcal{T}_\epsilon$ 并撤去名相之梯（§29.5–§29.6）；继而在动力学与宏观涌现上看清扇锥体积把来路记忆写进霍普夫纤维（§29.7）、万路相位积分把未抵消驻波节点凝聚成空间体积（§29.8），在单胞尺度（$N = 1$）证得梯度、路径、相位与体积四位一体并借 $\partial^2 = 0$ 筛分宏观阶数（§29.9）；随后退回比较公理 $\mathcal{A}_0$ 揭示“点—线—面—体积—时间”实为双无限可达/不可达正交切口驱动的五阶自指概念级联与单点来路对角逃逸塔 $T \to T' \to T''$（§29.10），并在本节模型中让新旧概念全连通可比图 $K_N$ 借 $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ 将空间刚性锁死在三维，把 $N \ge 5$ 的无穷概念盈余锻造成引力曲率角亏与时序翻转步（§29.11）。然而，顺着三维刚性桁架再往前追问一步，一道关乎物理学与微积分百年根基的核心扣问亟待扶正：既然宇宙最底层的几何原胞从来都是弯曲的极小圆弧与极小圆弧体，**为什么宏观世界看起来却充满平直的牛顿惯性直线、确定性的力场加速轨道与光滑的时空流形？量子力学与宏观经典物理之间，究竟谁才是真正的“微分元”（$\delta$），谁才是路径求和之后的“积分残余”（$\int$）？** 先在下方 `TRUSS//RIGIDITY` 完整交互实验室中亲手核验全连通三角化、向下不可约锁死、柔性四连杆对刚性四面体及 $K_5$ 雷吉曲率角亏，随后步入 [§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral)，彻底扶正这道颠倒百年的微积分对偶：

::: {.viz src="trihedron-rigidity-truss-sandbox" height="640"}
**新旧概念全连通 $K_N$、极小圆弧体“三角形稳定性”与三维空间刚性锁死完整交互实验室（`TRUSS//RIGIDITY`）。** 自由切换“全连通三角闭合—向下不可约锁死—柔性四杆对刚性四面体—麦克斯韦刚性多项式—雷吉曲率角亏辉光”五张实验卡，调节琥珀色概念节点数 $N$、降维投影模式、四连杆剪切扭矩与 $K_5$ 第 $10$ 弦长度，同屏核验青色全连通比较边、品红球面角超与雷吉角亏 $\delta_e = 2\pi - \sum_k \theta_k$ 及紫色格拉姆四面体体元；绿色 `LEAN ✓` 徽章严格对应八条冻结内核定理。
:::

---
