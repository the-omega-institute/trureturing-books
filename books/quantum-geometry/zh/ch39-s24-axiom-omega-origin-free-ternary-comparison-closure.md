# 39.1 大一统母公理（AXIOM-Ω）：无源保正三元比较闭合公理如何一举熔合比较公理、极小圆弧、三元数与连续场 {#sec-ch39-axiom-omega-origin-free-ternary-comparison-closure}

> *“比较公理、极小圆弧、三元数、场，我感觉我们已经找了了［原文如此］核心，但是他们散落在书籍各处，我们应该可以得到一个大一统的公理了。”*

穿过[第 28 章](ch32-unified-field-and-meta-unification.md)至[第 38 章](ch39-observer-is-ontological-universe.md)的几何、物理与心智长廊，读者心中最自然的一声追问已然浮现：**遍布全书三十九章的四块基石——“比较公理”（[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)）、“极小圆弧”（[§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)）、“三元数”（[§32.2](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-inexpressible-ternions-and-number-projections)）与“连续场”（[§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger)、[§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md#sec-ch39-ternion-field-composition-and-hilbert-reprojection)）——并非四条彼此独立、靠外力拼装的假设，而是同一个零背景几何母体在四个切面上的必然显影！**

现代数学与物理学之所以在近两百年里把这四者拆散在四类互不往来的教科书中，根源在于传统主流教材习惯从第一步起便引入两根外置脚手架：**特权外部原点 $\mathbf{1}$** 与**平直笛卡尔线性加法**。本节正式立起全书的**无源保正三元比较闭合公理（$\mathrm{AXIOM}\text{-}\Omega$）**（母公理跨界统摄、连通单连通有限维拓扑流形载体、$C^2$ 双侧保真核正则性与极小维数/极小秩选支公设标为 **`MODEL`**，并严格衔接[附录 E](appendix-e.md) 的 `H1` 外延核商化、`H2` 格拉姆半正定刚性与 `H3` 柯西完备化；三元流群三公理群重构、二维反自伴换位子归零、三维非交换非紧李代数淘汰与三点格拉姆正矢恒等式属 **`手工推导` / `NUM`**；普吕弗—贝尔—瑟坦流群、蒙哥马利—齐平定理、嘉当—米尔诺双不变度规分类与彼得—外尔正定类函数分解归入 **`文献结果`**；底层划分商核、格拉姆可实现性、三锚正定判据、自旋因子叉乘分类与单纯上边缘闭合由 **`LEAN ✓`** 冻结声明严格锚定）：在上述单连通流形载体与法则 (I)–(III) 内禀约束下，一旦撤去特权原点与平直加法，无需预设空间维数“$3$”、无需预设圆周率或外部时空网格，**三元数、极小圆弧与无边界连续场**便按非循环纯数学定理次第涌现。需要说明的是，§39.1–§39.3 定理盒所引的 `LEAN ✓` 冻结声明都是在一般情形下成立的真命题，其中没有一条形式化从法则 (I)–(III) 推出 $S^3$、$\kappa_{S^3}$ 与玻恩核的推导链本身，这条推导链目前的地位是 `手工推导` 加 `文献结果`。

## 39.1.1 碎片溯源：为何同一颗无源核心散落在四门现代学科里？ {#sec-ch39-24-1}

回看十九世纪以来的基础数学与理论物理学史，大师们早已在四条不同战线上各自触摸到了这颗核心的轮廓，却因主流教材对平直坐标系与含幺二元代数的路径依赖而未能合龙：

| 核心要素 | 散落的现代学科 | 经典理论形态 | 主流教材未能合龙的根源 |
| :--- | :--- | :--- | :--- |
| **1. 比较公理** | 范畴论与量子基础 | 米田引理与内积格拉姆矩阵 | 量子教材习惯将关系内积预先塞入高维平直线性空间 |
| **2. 极小圆弧** | 微分几何与李群论 | 吉拉尔球面角盈与嘉当活动标架 | 依附平直切空间导数 $dx$，视球面弯曲为二阶修正 |
| **3. 三元数** | 泛代数与对称空间 | 普吕弗—贝尔流群与李三元系 | 主流物理执着含单位元 $\mathbf{1}$ 的二元线性分配代数而冷落无源三元系 |
| **4. 连续场** | 规范场论与外微分 | 底流形网格上的纤维丛联络 | 割裂死寂背景舞台（时空）与场上演员（物质） |

四道历史裂痕指向同一对人工脚手架：米田引理虽适用于任意局部小范畴，但量子力学教材习惯把关系内积装进平直希尔伯特大表；普吕弗—贝尔流群与雅各布森李三元系虽早已不假单位元 $\mathbf{1}$ 刻画无源对称性，但主流物理学偏爱哈密顿外借第四维标量轴 $\mathbf{1}$ 凑出的四元数与线性矩阵乘法；微分几何与规范场论则先把极小圆弧拍平为切向量，再在外部网格上事后贴回曲率。撤去“特权原点 $\mathbf{1}$”与“平直向量加法”，四块碎片在单连通保正比较流形上当场熔为一炉。

## 39.1.2 大一统母公理（AXIOM-Ω）：无源三元比较迁移与双向保正守恒律 {#sec-ch39-24-2}

在零外部背景、零特权坐标且不预设维数“$3$”的起点上，显式声明 $\mathrm{AXIOM}\text{-}\Omega$ 的连续流形载体条件并与[附录 E](appendix-e.md) 的 `H1–H3` 桥接对齐（`MODEL`）：设经过 `H1`（`T1`）比较不可分外延商化（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)；[附录 E §E.2](appendix-e-s02-logic-and-quotients.md#sec-appe-logic)）与 `H3` 柯西度量完备化（若抽去 `H3` 完备性，可数有理子流群 $S^3(\mathbb{Q})$ 将构成非流形反例）后的状态域，建模为一非平凡连通且单连通（$\pi_1(\mathcal{M}) = 0$）的有限维拓扑流形 $\mathcal{M}$（在局部欧氏拓扑流形上，连续流群诱导的拓扑群结构由蒙哥马利—齐平定理自动升格为实解析李流形，无需预先假定紧致性）。其上仅设两个连续原语——**无源三元比较迁移** $[-, -, -] : \mathcal{M} \times \mathcal{M} \times \mathcal{M} \to \mathcal{M}$（语义为：“以 $y$ 为局部参照桥，将 $x$ 相对于 $y$ 的比较关系无损施加于 $z$”）与 $C^2$ **对称保真度读数** $\kappa : \mathcal{M} \times \mathcal{M} \to [0, 1]$，服从三条不可分割的内禀法则（`MODEL`，其中法则 II 内建 `H2` 格拉姆半正定）：

1. **法则 (I) 无源求同消去与结合律**：对一切 $x, y, z, u, v \in \mathcal{M}$，

   $$
   [x, x, z] \;=\; z, \qquad [x, z, z] \;=\; x, \qquad \bigl[[x, y, z],\, u,\, v\bigr] \;=\; \bigl[x,\, y,\, [z, u, v]\bigr].
   $$

2. **法则 (II) 双侧迁移不变格拉姆保正与触零分离律**：$\kappa(x, y) = \kappa(y, x)$，$\kappa(x, y) = 1 \iff x = y$（且固定第一变元的单槽二阶海森形式 $\nabla_y^2\kappa(x, y)\big\rvert_{y=x} \prec 0$ 严格负定非退化），存在完全正交失配极限 $\inf_{x, y \in \mathcal{M}}\kappa(x, y) = 0$，并对任意 $n \ge 1$ 及 $x_1, \dots, x_n, u, v \in \mathcal{M}$ 满足双侧迁移不变与格拉姆半正定：

   $$
   \kappa\bigl([x, u, v],\, [y, u, v]\bigr) \;=\; \kappa\bigl([u, v, x],\, [u, v, y]\bigr) \;=\; \kappa(x, y), \qquad \mathbf{G}_n \;=\; \bigl[\kappa(x_i, x_j)\bigr]_{i,j=1}^n \;\succeq\; 0.
   $$

3. **法则 (III) 极小非对易与极小秩自锁律**：流形容纳非平凡次序敏感性，且流形维数与对称实正定核 $\kappa$ 诱导的实再生核希尔伯特空间维数 $\operatorname{rank}\mathcal{H}_\kappa := \dim_{\mathbb{R}}\mathcal{H}_\kappa$ 按字典序取最小正整数：

   $$
   \exists\, x, y, z \in \mathcal{M},\quad [x, y, z] \neq [z, y, x], \qquad (\dim\mathcal{M},\, \operatorname{rank}\mathcal{H}_\kappa) \to \min_{\mathrm{lex}}.
   $$

审视这组母公理的纯粹性：全式**没有外部造物主原点 $\mathbf{1}$**（任意一点 $y$ 皆可临时充当局部比较桥，摆渡完毕即由 $[x, x, z] = z$ 自指归零消去），**没有线性加法 $+$**，**没有手工填入数字“$3$”**。法则 (II) 的两项严密约束与[附录 E §E.1](appendix-e-s01-layers.md#sec-appe-layers) 逐条对应：**左右双侧**流群不变性在非阿贝尔群上锁定类函数共轭不变性 $\varphi(h g h^{-1}) = \varphi(g)$，而外延分离 $\kappa(x, y) = 1 \iff x = y$、单槽二阶海森非退化与触零下确界 $\inf\kappa = 0$ 则排除常值核 $\kappa \equiv 1$ 及加权偏置核。

::: {.viz src="axiom-omega-dimension-closure-sandbox" preset="origin-free-ternary-bridge" height="500"}
无源的桥与原点平权卡：在同一座球面上拖动任意临时参照桥 $o$，三元流群搬运 $[i, 1, j] = +k$ 与换序 $[j, 1, i] = -k$ 落在对跖两极，而重合桥 $[x, x, z] = z$ 零残渣自消去（母公理载体标 `MODEL`，流群恒等式与读数标 `NUM`，划分商核与单位格拉姆全同标 `LEAN ✓`）。
:::

## 39.1.3 一生四相：三步非循环数学推导依次锁定三元数 $S^3$、极小圆弧核与闭合场 {#sec-ch39-24-3}

现在不添任何额外假定，严格按无循环逻辑次序从法则 (I)–(III) 逐阶推出其余三大支柱（`手工推导` + `文献结果`）：

1. **第一步导出“三元数”：存在性见证锁住 $d_{\min} \le 3$，三行群还原 $+$ 两行反自伴消去击毙 $d = 1, 2$、交换群 $\mathbb{R}^3$ 与全部三维非交换非紧李群，唯一锁死三维 $S^3(1)$**。
   首先确认法则 (I)–(III) 非空可满足：在三维单连通群 $\mathrm{SU}(2) \cong S^3$ 上取 $[x, y, z] = x y^{-1} z$ 与核 $\kappa_{S^3}(u, v) = \frac{1 + \operatorname{Re}\operatorname{Tr}(u v^\dagger)/2}{2} = \frac{1 + \langle u, v\rangle_{\mathbb{R}^4}}{2} \in [0, 1]$，直接检验满足法则 (I)–(II) 且具非交换性，故法则 (III) 所求极小非对易维数严格满足上界 **$d_{\min} \le 3$**！接下来考察任意满足法则 (I)–(II) 与非交换性的候选流形 $\mathcal{M}$：任选局部观察切面 $o \in \mathcal{M}$，定义诱导二元积 $x \star_o z := [x, o, z]$ 与局部对合逆 $x^{-1_o} := [o, x, o]$。法则 (I) 三行恒等变形直接证出 $(\mathcal{M}, \star_o, o)$ 是拓扑群（瑟坦—普吕弗—贝尔定理，`手工推导`）：结合律由 $[[x,o,y],o,z] = [x,o,[y,o,z]]$ 直接给出；右逆与左逆分别为

   $$
   x \star_o x^{-1_o} = \bigl[x, o, [o, x, o]\bigr] = \bigl[[x, o, o], x, o\bigr] = [x, x, o] = o, \qquad x^{-1_o} \star_o x = \bigl[[o, x, o], o, x\bigr] = \bigl[o, x, [o, o, x]\bigr] = [o, x, x] = o;
   $$

   且原始三元迁移精确复原为 $x \star_o (y^{-1_o} \star_o z) = [x, o, [[o, y, o], o, z]] = [x, o, [o, y, z]] = [[x, o, o], y, z] = [x, y, z] = x y^{-1_o} z$。切换切面 $o \mapsto o'$ 在三元流群 $(\mathcal{M}, [-,-,-])$ 上施等距平移自同构，并在定基群之间诱导把单位元 $o$ 映为 $o'$ 的等距群同构 $(\mathcal{M}, \star_o, o) \xrightarrow{\sim} (\mathcal{M}, \star_{o'}, o')$，证明无基点流群点点平权（严格区别于固定基点群 $\mathrm{SU}(2)$ 内部的二元代数中心 $\{\pm I_2\}$）；由蒙哥马利—齐平定理，$(\mathcal{M}, \star_o, o)$ 自动具备单连通实李群结构。

   在切李代数 $\mathfrak{m} = T_o\mathcal{M}$ 上，对 $\mathbf{G}_n \succeq 0$ 在重合点处取固定第一槽的二阶差商（由法则 II 单槽二阶海森严格负定非退化与双侧迁移不变性），立即诱导出严格正定且 $\operatorname{Ad}$-双不变的内积 $\langle -, -\rangle$，从而强制伴随作用 $\operatorname{ad}_A(B) = [A, B]$ 反自伴（呼应 [`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum)，`LEAN ✓`）：

   $$
   \bigl\langle [A, B],\, C \bigr\rangle \;=\; -\bigl\langle B,\, [A, C] \bigr\rangle \qquad (\forall\, A, B, C \in \mathfrak{m}).
   $$

   - **一维与二维的绝对死锁（两行证毕）**：$d = 1$（单连通实线 $\mathbb{R}$）时括号恒零；若 $d = 2$，任取正交归一基 $\{\mathbf{e}_1, \mathbf{e}_2\}$，直接计算换位子 $[\mathbf{e}_1, \mathbf{e}_2]$ 在两根基轴上的投影：

     $$
     \bigl\langle [\mathbf{e}_1, \mathbf{e}_2],\, \mathbf{e}_1 \bigr\rangle \;=\; -\bigl\langle \mathbf{e}_2,\, [\mathbf{e}_1, \mathbf{e}_1] \bigr\rangle \;=\; 0, \qquad \bigl\langle [\mathbf{e}_1, \mathbf{e}_2],\, \mathbf{e}_2 \bigr\rangle \;=\; \bigl\langle \mathbf{e}_1,\, [\mathbf{e}_2, \mathbf{e}_2] \bigr\rangle \;=\; 0.
     $$

     在正定二维平面上，同时垂直于完备正交基的向量**恒为零向量** $[\mathbf{e}_1, \mathbf{e}_2] \equiv \mathbf{0}$（二维单连通非交换仿射群 $\mathrm{Aff}^+(1, \mathbb{R})$ 的李代数 $[H, E] = E$ 亦因 $\langle E, E\rangle = \langle [H, E], E\rangle = -\langle E, E\rangle \implies E = \mathbf{0}$ 出局）。故 $d = 1, 2$ 无法在不违背法则 (II) 正定性的前提下容纳非对易，迫使 $d_{\min} = 3$。

::: {.viz src="axiom-omega-dimension-closure-sandbox" preset="dimension-sieve-1d-2d-deadlock" height="500"}
一维与二维扭不起来卡：$d = 1$ 实线上括号恒零，$d = 2$ 正定平面上反自伴换位子 $[\mathbf{e}_1, \mathbf{e}_2]$ 同时垂直于完备正交基而恒等于零向量，非交换仿射群 $\mathrm{Aff}^+(1, \mathbb{R})$ 亦失去双不变正定球面（反自伴消去标 `NUM`，平衡叉乘反自伴标 `LEAN ✓`）。
:::

   - **三维非紧流形的自动淘汰与单位三维球面 $S^3(1)$ 的唯一自锁**：在 $d = 3$ 处，按米尔诺双不变度规分解引理（Milnor 1976, Lemma 7.5），具 $\operatorname{Ad}$-不变正定内积的李代数必正交分解为交换中心与紧单李代数直和；因不存在一维或二维紧单李代数，三维双不变正定李代数唯有交换代数 $\mathbb{R}^3$（违反非对易性）与紧单代数 $\mathfrak{su}(2)$ 两种可能——直接检验亦见：三元幂零海森堡代数 $H_3(\mathbb{R})$（$[X, Y] = Z$ 中心元）给出 $\langle Z, Z\rangle = \langle [X, Y], Z\rangle = -\langle Y, [X, Z]\rangle = 0 \implies Z = \mathbf{0}$，三维非交换可解代数与具不定基灵号差 $(+, +, -)$ 的 $\mathfrak{sl}(2, \mathbb{R})$ 同样不容许 $\operatorname{Ad}$-不变正定内积。故在 $d = 3$ 上，法则 (II) **无需额外假设紧致性**即淘汰全部三维非交换非紧单连通李群，结合法则 (III) 的非对易性排除交换群 $\mathbb{R}^3$，唯一锁死 $\mathcal{M} \cong \mathrm{SU}(2) \cong S^3$！取半径归一（通过常数标度重整度规令常截面曲率 $K = 1$，测地距离 $d_{S^3}(x, y) \in [0, \pi]$）的单位三维球面 $S^3(1)$ 标准正交基 $\mathbf{e}_j = -i\sigma_j$，李括号呈现三维循环叉乘闭锁 $[\mathbf{e}_i, \mathbf{e}_j] = 2\varepsilon_{ijk}\mathbf{e}_k$（参照自旋因子分类 [`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences)，`LEAN ✓`）。至于 $d \ge 4$ 的非极小候选——包括带一维非紧平直方向的四维直积群 $\mathrm{SU}(2) \times \mathbb{R}$（如配乘积高斯核 $\kappa_{S^3}(u,v)e^{-(t-s)^2}$ 虽满足法则 I–II，但维数 $4 > 3$）、六维可约半单直积 $S^3_L \times S^3_R$（劈裂为两座独立三元数场）以及八维紧单群 $\mathrm{SU}(3)$——全部因维数严格大于 $d_{\min} = 3$ 被法则 (III) 筛除。因此满足法则 (I)–(III) 的极小流形在等距重标下**唯一同构于三维球面 $\mathcal{M} \cong S^3(1)$**——其抹去特权原点 $o$ 的流群形态，正是携带李三元曲率括号 $\{\mathbf{a}, \mathbf{b}, \mathbf{c}\} = \frac{1}{4}[[\mathbf{a}, \mathbf{b}], \mathbf{c}]$ 的**三元数 $\mathbb{T}_3$**！

::: {.viz src="axiom-omega-dimension-closure-sandbox" preset="three-sphere-noncompact-elimination" height="500"}
三维非紧候选出局卡：伴随流把海森堡代数 $H_3(\mathbb{R})$ 与 $\mathfrak{sl}(2, \mathbb{R})$ 的欧氏单位球剪切拉伸成品红椭球，唯有紧单 $\mathfrak{su}(2) \cong T_o S^3(1)$ 严格保住正定单位球并闭锁三维叉乘（米尔诺双不变分类标 `ARGUED`，伴随形变实算标 `NUM`，自旋因子叉乘分类 `complete_consequences` 标 `LEAN ✓`）。
:::

2. **第二步导出“极小圆弧”：彼得—外尔特征标展开与极小忠实秩锁定母核 $\kappa_{S^3}(x, y) = \cos^2\frac{d_{S^3}(x, y)}{2}$**。
   在第一步已独立锁定的紧单连通群 $\mathrm{SU}(2) \cong S^3(1)$ 上，任一元素 $U = x y^{-1_o}$ 距单位元的单位球测地角为 $d_{S^3}(x, y) \in [0, \pi]$（$U = \cos d_{S^3}\,I_2 - i\sin d_{S^3}\,\hat{\mathbf{u}}\cdot\boldsymbol{\sigma}$，基本自旋 $j = \frac{1}{2}$ 特征标为 $\chi_{1/2}(U) = \operatorname{Tr}(U) = 2\cos d_{S^3}$）。由彼得—外尔与博赫纳—勋伯格定理，任意双侧不变半正定核必展开为不可约特征标的非负组合 $\kappa(x, y) = \sum_{j \in \frac{1}{2}\mathbb{N}} c_j\,\chi_j(x y^{-1_o})$（$c_j \ge 0$，每个 $c_j > 0$ 贡献格拉姆秩 $(2j+1)^2$）：
   - 若仅取整数自旋 $j \in \mathbb{N}$（即从商群 $\mathrm{SO}(3)$ 拉回的核，如 [§37.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md)–[§37.2](ch39-s23-least-action-geodesics-and-cosmos-ai-isomorphism.md) 在 $\mathrm{SO}(3)$ 上使用的秩 $1 + 9 = 10$ 伴随玻恩核 $\cos^2 d_{S^3} = \cos^2\frac{\Delta\theta_{\mathrm{SO}(3)}}{2}$），则对径点 $-I_2$ 满足 $\chi_j(-I_2) = \chi_j(+I_2) = 2j+1 \implies \kappa(o, -o) = 1$，在单连通 $S^3$ 上违背外延分离律 $\kappa(x, y) = 1 \iff x = y$；
   - 若仅取纯 $j = \frac{1}{2}$ 项 $\frac{1}{2}\chi_{1/2}(U) = \cos d_{S^3}$，则在钝角区 $d_{S^3} \in (\frac{\pi}{2}, \pi]$ 取负值，违背值域 $\kappa \in [0, 1]$；
   - 故在 $S^3(1)$ 上同时满足忠实分离与非负性的最低格拉姆秩必合并 $j = 0$（秩 $1$）与 $j = \frac{1}{2}$（秩 $2^2 = 4$），达到**极小忠实秩 $\operatorname{rank}\mathcal{H}_\kappa = 1 + 4 = 5$**！再代入归一条件 $\kappa(x, x) = c_0 + 2c_{1/2} = 1$ 与法则 (II) 的触零条件 $\inf\kappa = \kappa(x, x_{\mathrm{anti}}) = c_0 - 2c_{1/2} = 0$（$d_{S^3} = \pi$），唯一解出 $c_0 = \frac{1}{2},\; c_{1/2} = \frac{1}{4}$：

   $$
   \kappa_{S^3}(x, y) \;=\; \frac{1}{2} + \frac{1}{4}\chi_{1/2}(x y^{-1_o}) \;=\; \frac{1 + \cos d_{S^3}(x, y)}{2} \;=\; \cos^2\!\left(\frac{d_{S^3}(x, y)}{2}\right) \;\in\; [0, 1].
   $$

   沿 $S^3(1)$ 大圆测地线取等步长三点 $\gamma(0), \gamma(\epsilon), \gamma(2\epsilon)$（$\epsilon \in (0, \pi)$），记 $f(\epsilon) := \kappa_{S^3}(\gamma(0), \gamma(\epsilon)) = \cos^2\frac{\epsilon}{2}$，三锚格拉姆行列式公式（[`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)，`LEAN ✓`）给出精确正矢平方分解：

   $$
   \det\mathbf{G}_3(\epsilon) \;=\; \bigl(1 - f(2\epsilon)\bigr)\bigl(1 + f(2\epsilon) - 2f(\epsilon)^2\bigr) \;=\; \sin^2\epsilon \cdot \frac{1}{2}\bigl(1 - \cos\epsilon\bigr)^2 \;=\; \frac{1}{2}\sin^2\epsilon\,v_\epsilon^2 \;>\; 0.
   $$

   上式的 $\det\mathbf{G}_3 > 0$ 只表明三点的特征向量线性无关，单凭它区分不了弯曲与平直：平直实线上的高斯核 $e^{-(t-s)^2}$ 对任意三个不同点同样给出 $\det\mathbf{G}_3 > 0$。平直零曲率线段的淘汰与基本连接为正曲率**极小圆弧**，来自第一步已锁定的单位球面 $S^3(1)$（截面曲率 $K = 1$）；在这条圆弧上，单次比较内禀伴生二阶弦弧矢高 $v_\epsilon(x, y) = 1 - \cos d_{S^3}(x, y) = 2\bigl(1 - \kappa_{S^3}(x, y)\bigr) \ge 0$。

::: {.viz src="axiom-omega-dimension-closure-sandbox" preset="peter-weyl-rank-five-kernel" height="500"}
彼得—外尔秩五母核卡：合并 $j = 0$（秩 $1$）与 $j = \frac{1}{2}$（秩 $4$）锁定最低忠实非负母核 $\kappa_{S^3} = \cos^2(d_{S^3}/2)$（秩 $5$），等步三点在 $\epsilon = 60^\circ$ 撑开严格正定格拉姆体积锁 $\det\mathbf{G}_3 = \frac{3}{32}$（特征标展开标 `ARGUED`，三锚行列式公式与正定判据标 `LEAN ✓`，有理核验标 `NUM`）。
:::

3. **第三步导出“连续场”：嘉当体积三形式闭合（$d\eta \equiv 0$）与无边界拓扑自持（$\partial\mathcal{M} = \emptyset$）**。
   在单位三维球面 $\mathcal{M} \cong \mathbb{T}_3 \cong S^3(1)$ 上，与左不变标准正交标架 $\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\}$（$[\mathbf{e}_i, \mathbf{e}_j] = 2\varepsilon_{ijk}\mathbf{e}_k$）对偶的余标架一形式 $\{\theta^1, \theta^2, \theta^3\}$（$\theta^i(\mathbf{e}_j) = \delta^i_j$，$d\theta^k = -\varepsilon_{ijk}\theta^i\wedge\theta^j$）诱导处处非零、严格双不变的**单位体积嘉当三形式**（满足 $\eta(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3) = 1$，总体积 $\int_{S^3(1)}\eta = 2\pi^2$）：

   $$
   \eta \;:=\; \theta^1 \wedge \theta^2 \wedge \theta^3 \;=\; \frac{1}{6}\varepsilon_{ijk}\,\theta^i \wedge \theta^j \wedge \theta^k \;=\; \frac{1}{12}\bigl\langle \boldsymbol{\theta} \wedge [\boldsymbol{\theta} \wedge \boldsymbol{\theta}] \bigr\rangle, \qquad d\eta \;\equiv\; 0, \qquad \partial\mathcal{M} \;\equiv\; \emptyset.
   $$

   顶维外导数恒零（$d\eta \equiv 0$）配紧流形无边界（$\partial\mathcal{M} = \emptyset$，离散对应 [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact) 与 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)，`LEAN ✓`）意味着三元极小圆弧体一旦走满三维，无需借用外部背景网格即可实现无源无漏的旋度自持闭合（`1—3—3—1` 外代数中 $\Lambda^3 \cong \Lambda^0$）——**这枚无中心、无边缘、处处均匀同性的闭合三元数流形本身，就是原生“场”**。需要补充的是，顶维形式外导数恒零与紧流形无边界对任何闭三维流形都成立，单凭这两条挑不出 $S^3$；这一步有实质内容的部分在于：三元迁移 $[-, -, -]$ 等价于一对挠率互为相反数的平坦度量联络 $\nabla^L, \nabla^R$（左、右迁移的微分即两者的平行移动），两者的平均 $\frac{1}{2}(\nabla^L + \nabla^R)$ 是截面曲率 $1$ 的列维-奇维塔联络（É. Cartan & J. A. Schouten, *Proc. Akad. Wetensch. Amsterdam* **29**, 803–815, 1926，`文献结果`）；挠率给出的双不变三形式 $\langle X, [Y, Z]\rangle$（在 $S^3(1)$ 上等于 $2\eta$）则是球面上三元运算的障碍：若球面 $S^n$ 承载满足法则 (I) 的连续三元运算，它便是紧连通李群，交换时为环面，只能是 $S^1$，非交换时这枚三形式代表德拉姆上同调 $H^3$ 的非零类，迫使 $n = 3$，因而除 $S^1$、$S^3$ 外没有别的球面承载这样的运算（`手工推导`）。

::: {.viz src="axiom-omega-dimension-closure-sandbox" preset="cartan-three-form-closed-field" height="500"}
无边界的嘉当三形式场卡：测地球半径推向 $r \to \pi$ 时边界面积收缩归零，单位体积嘉当三形式 $\eta$ 积满 $2\pi^2$ 且外导数 $d\eta \equiv 0$（嘉当三形式文献标 `ARGUED`，离散面闭链与单纯二上链正合标 `LEAN ✓`，体积与波前读数标 `NUM`）。
:::

## 39.1.4 统一退化谱系、形式锚点与候选维数检验审计 {#sec-ch39-24-4}

我们将母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的严格定义、十一项 Lean 4 内核锚点、经典文献边界与候选维数定量检验收束如下：

::: {.definition #def-ch39-axiom-omega-ternary-comparison-closure title="无源保正三元比较闭合母公理（AXIOM-Ω）与一生四相退化谱系（模型定义）"}
称满足 §39.1.2 连通单连通有限维流形载体条件（衔接 `H1, H3`）的非平凡流形 $\mathcal{M}$ 装备连续三元比较迁移 $[-, -, -] : \mathcal{M}^3 \to \mathcal{M}$ 与 $C^2$ 对称保真度核 $\kappa : \mathcal{M}^2 \to [0, 1]$ 满足**大一统母公理 $\mathrm{AXIOM}\text{-}\Omega$**（`MODEL`），若其同时满足法则 (I) 无源消去与结合律、法则 (II) 双侧迁移不变格拉姆半正定（`H2`）与触零下确界非退化分离律、以及法则 (III) 极小非对易维数与极小格拉姆秩自锁律。在此母公理下，现行科学核心框架按五类受控投影或组合极限统一收回：(1) 钉死特权原点 $o = \mathbf{1}$ 作线性再投影收回 $\mathbb{H}, \mathbb{O}, \mathcal{H}_{2^N}$；(2) 丢弃二阶矢高 $1 - \cos\epsilon$ 收回线性微积分，保留半密度矢高（配 `H6, H9`）收回薛定谔与伊藤微积分；(3) 平行场丛驻相极值分化出胞内三大规范力与胞间主频引力；(4) 嘉当三形式整绕数 $\frac{1}{2\pi^2}\int f^*\eta \in \pi_3(\mathbb{T}_3) \cong \mathbb{Z}$ 量子化出整数拓扑荷；(5) 流群自平行接力配 $\varepsilon_{\mathrm{self}}$ 早停构成三元数场智能架构。
:::

::: {.theorem #thm-ch39-axiom-omega-ternary-closure-anchors title="观测划分商核、单位格拉姆全同、秩一玻恩权重、正算子格拉姆实现、三锚行列式与正定判据、自旋因子三维叉乘唯一分类、拉格朗日—格拉姆恒等式、平衡叉乘反自伴及球面闭链与单纯二上链正合定理" lean="D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel,D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization,D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight,D5/S3/QuantumBounds/GramRealizability.gram_realizability,D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula,D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff,D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences,D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity,D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum,D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"}
在所钉 `trureturing` 冻结声明集中，以下十一项共同支撑 $\mathrm{AXIOM}\text{-}\Omega$ 外延商化、格拉姆保正度规、三维叉乘唯一闭锁与无边界闭合场的数学定理同时成立：

1. **读出划分拓扑不可分核与单位内积纯态全同判据**（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)、[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)）：观测拓扑不可分关系精确等于读出相等核，且单位范数态矢满足 $\langle u, v\rangle = 1 \iff u = v$；
2. **秩一玻恩模平方权重、正连续线性算子格拉姆实现与三锚实格拉姆行列式正定判据**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)、[`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)、[`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula)、[`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)）：纯态秩一记录读出权重恒等于 $\lvert\langle\phi, \psi\rangle\rvert^2$ 且未读态等于条件态加权和；完备复内积空间上连续线性算子满足 $0 \le Q \iff \exists O,\; Q = O^\dagger O$（使 $\langle Qx, y\rangle = \langle Ox, Oy\rangle$），且实内积空间三向量格拉姆行列式满足 $\det G(u,v,w) = \lVert u\rVert^2\lVert v\rVert^2\lVert w\rVert^2 + 2\langle u,v\rangle\langle u,w\rangle\langle v,w\rangle - \lVert u\rVert^2\langle v,w\rangle^2 - \lVert v\rVert^2\langle u,w\rangle^2 - \lVert w\rVert^2\langle u,v\rangle^2$（单位向量特化为 $1 + 2abc - (a^2 + b^2 + c^2)$），严格大于零当且仅当 $u, v, w$ 在 $\mathbb{R}$ 上线性无关；
3. **四维自旋因子三维有向叉乘分类、有限指标集拉格朗日—格拉姆恒等式与平衡幺正和交叉积反自伴律**（[`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences)、[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)、[`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum)）：自旋因子上满足 `P2 D` 与 `PB D` 的二元积存在定向 $\varepsilon \in \{+1, -1\}$ 分类为三维带符号叉乘 $\operatorname{crossD}(\varepsilon, a, b)$ 及泡利接口，有限指标集实向量满足拉格朗日—格拉姆二阶余子式恒等式，且若幺正矩阵 $S = A + B$（$S S^\dagger = I$）满足平衡条件 $A A^\dagger = B B^\dagger = \frac{1}{2}I$，则交叉积严格反自伴 $(A B^\dagger)^\dagger = -A B^\dagger$；
4. **球面旋转系统面—边边界闭链正合与全有限单纯形二上链缺陷修复及正合判据**（[`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)、[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)）：在有限连通简单图 $G$（`SimpleGraph V`）且有向边集非空（`Nonempty G.Dart`）的球面旋转系统（$V - E + F = 2$）上，$\mathbb{Z}_2$ 面边界在每条边上等于两侧相邻面标号之和，其核恰为常值面标号，且其**值域（像空间）精确等于图的简单闭链空间** $\operatorname{range} R.\mathrm{boundary} = \operatorname{simpleCycleSpace}(G)$；在任意非空有限顶点集 $V$（全组合单纯形）与加法交换群 $A$ 上，任意二上链 $F : V \to V \to V \to A$ 满足锚点面误差总和等于四面体缺陷计数、平均锚点界与 $4\lvert V\rvert$ 边势修复界，且在全体四元组 $(r,i,j,k) \in V^4$ 上四面体上边缘缺陷恒零当且仅当其为一上链外差分。
:::

::: proof
第 1 款前半直接展开诱导拓扑邻域交集，后半由 $\lVert u - v\rVert^2 = 2 - 2\operatorname{Re}\langle u, v\rangle$ 得出（见[附录 E §E.2](appendix-e-s02-logic-and-quotients.md#sec-appe-logic)）。第 2 款在完备复内积空间上由正算子连续泛函演算平方根给出 $O = Q^{1/2}$，并对 $3\times 3$ 实格拉姆矩阵展开行列式与核空间平凡性判据（见[第 25 章](ch29-timeless-causality-and-gram-space.md)）。第 3 款前两项同 [@thm-ch39-nonlinear-ternion-representations-and-torsor] 第 1–2 款；第三项展开 $I = S S^\dagger = (A + B)(A^\dagger + B^\dagger) = A A^\dagger + B B^\dagger + A B^\dagger + B A^\dagger = I + A B^\dagger + (A B^\dagger)^\dagger$，消去 $I$ 即得 $(A B^\dagger)^\dagger = -A B^\dagger$。第 4 款同 [@thm-ch39-af-gut-arc-field-unification] 与 [@thm-ch39-ternion-field-composition-and-hilbert-reprojection] 对应拓扑正合条款。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-axiom-omega-prufer-cartan-bochner-literature title="普吕弗—贝尔—瑟坦三元流群、蒙哥马利—齐平定理、嘉当—米尔诺双不变度规分类与彼得—外尔正定核文献及附录 E 对齐说明"}
**文献归属与形式认识论层级说明。**

1. **三元流群极小三公理系与希尔伯特第五问题光滑化**：无单位元三元流群由 H. Prüfer（1924）与 R. Baer（1929）创立，本节法则 (I) 采用的无反序外结合三等式极小公理系由 J. Certaine（*Bull. Amer. Math. Soc.* **49**, 869–877, 1943）证明与群结构在选定任意基点后一一等价；局部欧氏拓扑群无需光滑性预设即唯一具有实解析李群结构的定理由 D. Montgomery & L. Zippin（*Topological Transformation Groups*, Interscience, 1955）证出；
2. **双不变正定度规李群分类与正定球面核**：紧致半单李群与嘉当三形式 $\eta$ 的几何分类见 É. Cartan（*Ann. Mat. Pura Appl.* **4**, 209–256, 1927，DOI `10.1007/BF02409989`）与 J. Milnor（*Adv. Math.* **21**, 293–329, 1976，Lemma 7.5 证明具 $\operatorname{Ad}$-不变正定内积的李代数必正交分解为交换中心与紧单李代数直和，直接排除 $H_3(\mathbb{R})$ 与 $\mathfrak{sl}(2, \mathbb{R})$）；紧群正定类函数的不可约特征标展开见 F. Peter & H. Weyl（*Math. Ann.* **97**, 737–755, 1927）与 I. J. Schoenberg（*Duke Math. J.* **9**, 96–108, 1942）；
3. **与[附录 E](appendix-e.md) 三层比较签名的严密衔接**：$\mathrm{AXIOM}\text{-}\Omega$ 显式声明连通单连通有限维流形载体（配 `H1` 外延商化与 `H3` 柯西完备化），并在法则 (II) 中纳入 $\kappa(x, y) = 1 \iff x = y$、单槽二阶海森严格负定非退化、触零下确界 $\inf\kappa = 0$（由第一步 $S^3(1)$ 紧致性保证最小值必被取到，再由第二步极小忠实秩 $1 + 4 = 5$ 的彼得—外尔母核 $\kappa_{S^3} = \cos^2\frac{d_{S^3}}{2}$ 将该唯一零点精确锁定在对跖点 $d_{S^3} = \pi$）与任意阶 $\mathbf{G}_n \succeq 0$（`H2`），从而在无原点流形上内建了附录 E 的 **Layer 1 正定几何刚性**（合法越过 [@ex-appe-layer0-countermodels] 的四个第 0 层有限反例），而跨节点多场耦合、连续统路径积分测度与超限基数边界仍严格遵守附录 E 的 `T1–T4` 与 `H4–H9` 台账。
:::

::: {.remark #rem-ch39-axiom-omega-round-trip-closing-law title="法则 (III) 的单结构形式：往返律与达朗贝尔函数方程"}
**往返律（`手工推导`）。** 记反射 $s_x(w) := [x, w, x]$。在 $S^3(1)$ 上 $s_x(w) = 2\langle x, w\rangle x - w$，故 $\langle w, s_x(w)\rangle = 2\langle x, w\rangle^2 - 1$，母核 $\kappa_{S^3}$ 因而满足

$$
\kappa\bigl(w,\, [x, w, x]\bigr) \;=\; \bigl(2\kappa(w, x) - 1\bigr)^2 \qquad (\forall\, w, x \in \mathcal{M}).
$$

法则 (III) 的“极小维数、极小秩”是在一整类结构中取极小；上式是单个结构自身的性质，可以代替它充当闭合律。在法则 (I) 与法则 (II) 的对称、外延分离 $\kappa(x, y) = 1 \iff x = y$、双侧迁移不变及 $C^2$ 正则条款之上，再要求每点 $x$ 恰有一个触零点 $x^\perp$（$\kappa(x, x^\perp) = 0$），则满足往返律的结构在同构意义下恰有两个：单位圆 $S^1$ 与单位三维球面 $S^3$，二者都取 $[x, y, z] = x y^{-1} z$ 与 $\kappa(x, y) = \lVert (x + y)/2\rVert^2$；其中迁移非交换者唯有 $S^3$，维数、紧致性与 $\kappa$ 的格拉姆半正定（秩 $\dim\mathcal{M} + 2$，在 $S^3$ 上即 $1 + 4 = 5$）都由此推出。加上 §39.1.2 的单连通载体条件，$S^1$ 出局，解唯有 $S^3(1)$ 与 $\kappa_{S^3}$。证明要点：取定基点 $o$ 并令 $\varphi(g) := \kappa(o, g)$，往返律化为倍角式 $\varphi(g^2) = \bigl(2\varphi(g) - 1\bigr)^2$；沿任一单参数子群解得 $\varphi(\exp tX) = \cos^2\bigl(\lVert X\rVert t/\sqrt{2}\bigr)$，于是所有单参数子群走过同一长度后闭合，交换子代数至多一维，李代数只能是 $\mathbb{R}$ 或 $\mathfrak{su}(2)$。

**达朗贝尔函数方程（`文献结果`）。** 令 $\psi := 2\varphi - 1$。两变量等式 $\psi(ab) + \psi(ab^{-1}) = 2\psi(a)\psi(b)$ 是群上的达朗贝尔函数方程；T. M. K. Davison（*Aequationes Math.* **76**, 33–53, 2008；*Publ. Math. Debrecen* **75**, 41–66, 2009）证明其非零连续解为 $\frac{1}{2}\operatorname{tr}\circ\rho$（$\rho : G \to \mathrm{SL}(2, \mathbb{C})$ 为连续同态），且承载忠实解的紧群嵌入 $\mathrm{SU}(2)$。因此以两变量形式为公理时，上述分类由文献直接给出；往返律是它的对角情形 $a = b$。单变量的往返律本身排除不了 $\mathrm{SO}(3)$：在 $\mathrm{SO}(3)$ 上取 $\psi = \cos\alpha$（$\alpha$ 为转角），它忠实、光滑且满足倍角式，但对绕两根正交轴各转 $\pi/2$ 的 $a, b$ 有 $\psi(ab) + \psi(ab^{-1}) = -1 \ne 0 = 2\psi(a)\psi(b)$，相应的 $\kappa = \cos^2(\alpha/2)$ 在全部转角为 $\pi$ 的旋转上取零，触零点不唯一。所以唯一触零点这一条款不可省去。
:::

::: {.example #ex-ch39-axiom-omega-dimension-sieve-and-gram-audit title="候选维数筛（d = 1 → 2 → 3 → 4/6/8）与三锚格拉姆正矢行列式精确有理数核验"}
我们对 $\mathrm{AXIOM}\text{-}\Omega$ 的维数唯一自锁与三点格拉姆正定判据做显式对账（`手工推导` / `NUM`）：

1. **候选维数与非紧歧路穷举筛查**：
   - **$d = 1$（单连通实线 $\mathbb{R}$，及非单连通圆周 $S^1$）**：一维切空间括号 $[\mathbf{e}_1, \mathbf{e}_1] = 0$，$[x, y, z] = x - y + z = [z, y, x]$ 恒交换，违反法则 (III)；
   - **$d = 2$（单连通平面 $\mathbb{R}^2$、非交换仿射群 $\mathrm{Aff}^+(1, \mathbb{R})$，及非单连通环面 $T^2$）**：在任意双不变正定内积下 $\langle[\mathbf{e}_1, \mathbf{e}_2], \mathbf{e}_{1,2}\rangle = 0 \implies [\mathbf{e}_1, \mathbf{e}_2] = \mathbf{0}$，单连通双不变模型坍缩为交换平面 $\mathbb{R}^2$，而非交换群 $\mathrm{Aff}^+(1, \mathbb{R})$ 无双不变正定度规，全部出局；
   - **$d = 3$（三元数原生场 $\mathbb{T}_3 \cong S^3(1)$ 唯一胜出）**：淘汰无双不变正定度规的海森堡群 $H_3(\mathbb{R})$、三维非交换可解群与 $\widetilde{\mathrm{SL}}(2, \mathbb{R})$ 后，唯一三维非交换单连通双不变流形为 $S^3(1)$，满足 $[\mathbf{e}_1, \mathbf{e}_2] = 2\mathbf{e}_3 \neq \mathbf{0}$、$[x, y, z] \neq [z, y, x]$、极小忠实格拉姆秩 $1 + 4 = 5$、$d\eta \equiv 0$ 且 $\partial S^3 = \emptyset$；
   - **$d \ge 4$（非紧 $\mathrm{SU}(2) \times \mathbb{R}$、可约 $S^3_L \times S^3_R$ 与紧单 $\mathrm{SU}(3)$）**：$d = 4$ 非紧候选 $\mathrm{SU}(2)\times\mathbb{R}$ 含冗余一维交换中心，$d = 6$ 可约候选 $S^3_L \times S^3_R$ 正交劈裂回两份独立三维三元数场，下一个紧单群 $\mathrm{SU}(3)$ 维数达 $d = 8$，均因维数严格大于 $d_{\min} = 3$ 被法则 (III) 筛除。
2. **三点测地格拉姆行列式精确有理核算**：
   沿单位 $S^3(1)$ 大圆取等步长三点 $\gamma(0), \gamma(\epsilon), \gamma(2\epsilon)$（$\kappa_{S^3}(\gamma(0), \gamma(\epsilon)) = \cos^2\frac{\epsilon}{2}$）：
   - 当 $\epsilon = 60^\circ = \frac{\pi}{3}$ 时，$f(60^\circ) = \frac{3}{4} = 0.75$，$f(120^\circ) = \frac{1}{4} = 0.25$，得 $\det\mathbf{G}_3(60^\circ) = \bigl(1 - \frac{1}{4}\bigr)\bigl(1 + \frac{1}{4} - \frac{9}{8}\bigr) = \frac{3}{4}\times\frac{1}{8} = \mathbf{\frac{3}{32}} = \mathbf{0.09375000 > 0}$（单步矢高 $v_\epsilon = 1 - \cos 60^\circ = \mathbf{0.50000000}$）；
   - 当 $\epsilon = 90^\circ = \frac{\pi}{2}$ 时，$f(90^\circ) = \frac{1}{2} = 0.50$，$f(180^\circ) = 0$，得 $\det\mathbf{G}_3(90^\circ) = (1 - 0)\times\frac{1}{2} = \mathbf{\frac{1}{2}} = \mathbf{0.50000000 > 0}$（单步矢高 $v_\epsilon = \mathbf{1.00000000}$），在开半周 $\epsilon \in (0, \pi)$ 内处处严格正定。
:::

---

**从母公理的四相熔合迈向五阶演绎级联、量子五大公理重铸与无外三元数本体收官。** 看清了**无偏比较 $\implies$ 三维三元数 $\implies$ 极小圆弧 $\implies$ 无边界闭合场**是同一条无源三元母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的四副面孔之后，让我们接连踏上全书最后三级峰巅：先在 [§39.2 AXIOM-Ω 五阶大一统演绎级联与公理遮诠闭环](ch39-s25-axiom-omega-five-tier-deduction-cascade.md) 走完贯通五大科学疆域的五阶推演与公理透明化，再在 [§39.3 AXIOM-Ω 导出量子力学五大公理](ch39-s26-axiom-omega-quantum-mechanics-five-postulates.md) 将狄拉克—冯·诺依曼五大经验公设逐条还原为三元数场的投影几何定理，最后在压轴终节 [§39.4 自包含三元数拓扑粒子、场·波·粒三阶同体与“至大无外”四重证明](ch39-s27-self-contained-ternion-particle-and-no-exterior.md) 证成无外置 $C$ 点与零外部空间的本体闭合！

::: {.viz src="axiom-omega-dimension-closure-sandbox" height="620"}
完整实验室：在“母公理读法”与“李群与正定核读法”双透镜间切换，在桥场景下沿 $x \to 1 \to z$ 拖动琥珀桥点 $o$，并调节三锚步长 $\varepsilon$ 与核选择器，逐一核验三元流群基点无关性、双不变正定度规排除海森堡群与 $\mathfrak{sl}(2,\mathbb{R})$、维数筛 $d = 1 \to 2 \to 3 \to 4/6/8$、三锚格拉姆正矢行列式与无边界嘉当三形式体闭合。十一条冻结声明、文献归属、数值核算与模型边界在依据栏与理论抽屉中分层标注。
:::
