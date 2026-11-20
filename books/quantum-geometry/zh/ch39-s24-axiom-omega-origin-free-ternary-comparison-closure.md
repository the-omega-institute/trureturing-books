# 39.1 大一统母公理（AXIOM-Ω）：无源保正三元比较闭合公理如何一举熔合比较公理、极小圆弧、三元数与连续场 {#sec-ch39-axiom-omega-origin-free-ternary-comparison-closure}

> *“比较公理、极小圆弧、三元数、场，我感觉我们已经找了了［原文如此］核心，但是他们散落在书籍各处，我们应该可以得到一个大一统的公理了。”*

穿过[第 28 章](ch32-unified-field-and-meta-unification.md)至[第 38 章](ch39-observer-is-ontological-universe.md)的几何、物理与心智长廊，读者心中最自然的一声追问已然浮现：**遍布全书三十九章的四块基石——“比较公理”（[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)）、“极小圆弧”（[§29.5](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron)）、“三元数”（[§32.2](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-inexpressible-ternions-and-number-projections)）与“连续场”（[§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger)、[§32.3](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md#sec-ch39-ternion-field-composition-and-hilbert-reprojection)）——并非四条彼此独立、靠外力拼装的假设，而是同一个零背景几何母体在四个切面上的必然显影！**

现代数学与物理学之所以在近两百年里把这四者拆散在四类互不往来的教科书中，根源在于传统主流教材习惯从第一步起便引入两根外置脚手架：**特权外部原点 $\mathbf{1}$** 与**平直笛卡尔线性加法**。本节正式立起全书的**无源保正三元比较闭合公理（$\mathrm{AXIOM}\text{-}\Omega$）**（母公理跨界统摄与法则 (III) 的极小特征秩选支标为 **`MODEL`**，并严格衔接[附录 E](appendix-e.md) 的 `H1` 外延核商化、`H2` 格拉姆半正定刚性与 `H3` 柯西完备化；从公理到 $S^3(1)$ 与 $\kappa_{S^3}$ 的主结论——特征秩不低于五、单位四元数模型的特征秩恰为五、读数完备的秩五结构同构于单位四元数——由 **`LEAN ✓`** 冻结声明锚定，其中把前两条合成“极小值恰为 $5$”的一步是 `手工推导`；流形、维数“$3$”与可微性不是假设，而是经同构双射从 $S^3(1)$ 搬来的推论，搬运属 `手工推导`；$\kappa \le 1$、$\cos^2$ 改写、二维反自伴换位子归零、三维非交换非紧李代数淘汰与三点格拉姆正矢恒等式属 **`手工推导` / `NUM`**，其中低维李代数的纯代数一步另由 [@thm-ch39-axiom-omega-invariant-form-low-dimension] 内核检查；流形表述下沿李理论走的经典路线所用的普吕弗—贝尔—瑟坦流群、蒙哥马利—齐平定理、嘉当—米尔诺双不变度规分类与彼得—外尔正定类函数分解归入 **`文献结果`**，其中彼得—外尔定理的分离形式与特征标核秩的计数另由 [@thm-ch39-axiom-omega-compact-group-unitary-kernel]、[@thm-ch39-axiom-omega-character-kernel-rank] 内核检查；底层划分商核、格拉姆可实现性、三锚正定判据、自旋因子叉乘分类与单纯上边缘闭合同样由 **`LEAN ✓`** 冻结声明锚定）：在法则 (I)–(III) 与链连通、读数完备两条载体条件下，一旦撤去特权原点与平直加法，无需预设空间维数“$3$”、无需预设圆周率或外部时空网格，连拓扑与可微结构也不预设，**三元数、极小圆弧与无边界连续场**便按非循环纯数学定理次第涌现。需要说明的是，从母公理到 $S^3$ 与 $\kappa_{S^3}$ 的主结论现已形式化：非交换、链连通、触零、特征秩为五且读数完备的三元比较结构同构于单位四元数模型（[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding]、[@thm-ch39-axiom-omega-complete-rank-five-isomorphism]，`LEAN ✓`）；该模型上由读数构成的射线核等于玻恩权重（[@thm-ch39-axiom-omega-ray-kernel-born-weight]，`LEAN ✓`），把射线读作物理态、把这个量读作概率仍是 `MODEL`。§39.1–§39.3 原有定理盒所引的 `LEAN ✓` 冻结声明都是在一般情形下成立的真命题；本节先前带流形载体的写法现作为等价的经典表述（流形表述）保留，它与母公理的对应及其中仍属 `手工推导` 与 `文献结果` 的各步，逐条见 [@rem-ch39-axiom-omega-formalization-bridge]。

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

在零外部背景、零特权坐标且不预设维数“$3$”的起点上，$\mathrm{AXIOM}\text{-}\Omega$ 以假设最少的形式陈述，并与[附录 E](appendix-e.md) 的 `H1–H3` 桥接对齐（母公理本身标 `MODEL`；其条款与 Lean 形式化的 [@def-ch39-ternary-comparison-structure] 逐条对应）：载体只是一个经 `H1`（`T1`）比较不可分外延商化（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)；[附录 E §E.2](appendix-e-s02-logic-and-quotients.md#sec-appe-logic)）的非空集合 $\mathcal{M}$——不预设拓扑、流形与可微结构，也不预设基点或二元运算。其上仅设两个原语——**无源三元比较迁移** $[-, -, -] : \mathcal{M} \times \mathcal{M} \times \mathcal{M} \to \mathcal{M}$（语义为：“以 $y$ 为局部参照桥，将 $x$ 相对于 $y$ 的比较关系无损施加于 $z$”）与**对称保真度读数** $\kappa : \mathcal{M} \times \mathcal{M} \to \mathbb{R}$，二者都不要求连续或可微。载体只须满足两条用读数本身写出的条件：

- **链连通**：无论把“足够接近”的门槛 $1 - \varepsilon$ 抬得多高，任意两点总能用一串相邻读数都越过门槛的有限链连起来，

  $$
  \forall\, \varepsilon > 0,\ \forall\, x, y \in \mathcal{M},\ \exists\, x = x_0, x_1, \dots, x_k = y:\qquad \kappa(x_{i-1}, x_i) \;>\; 1 - \varepsilon \quad (1 \le i \le k);
  $$

- **读数完备**：读数意义下的柯西序列在读数意义下收敛，即对 $\mathcal{M}$ 中每个序列 $(x_n)_{n \in \mathbb{N}}$，

  $$
  \bigl(\forall\, \varepsilon > 0\ \exists\, N\ \forall\, m, n \ge N:\ \kappa(x_m, x_n) > 1 - \varepsilon\bigr) \;\implies\; \exists\, a \in \mathcal{M}\ \forall\, \varepsilon > 0\ \exists\, N\ \forall\, n \ge N:\ \kappa(x_n, a) > 1 - \varepsilon.
  $$

  这正是[附录 E](appendix-e.md) `H3` 柯西完备化在弦距 $d_\kappa(x, y) := 2\sqrt{1 - \kappa(x, y)}$ 下的写法：$\kappa(x_m, x_n) > 1 - \varepsilon$ 即 $d_\kappa(x_m, x_n) < 2\sqrt{\varepsilon}$，所以读数完备与“$(\mathcal{M}, d_\kappa)$ 是完备度量空间”逐字等价（$d_\kappa$ 是度量，见 [@rem-ch39-axiom-omega-formalization-bridge] 第 4 条）。

两原语服从三条不可分割的内禀法则（`MODEL`，其中法则 II 内建 `H2` 格拉姆半正定）：

1. **法则 (I) 无源求同消去与结合律**：对一切 $x, y, z, u, v \in \mathcal{M}$，

   $$
   [x, x, z] \;=\; z, \qquad [x, z, z] \;=\; x, \qquad \bigl[[x, y, z],\, u,\, v\bigr] \;=\; \bigl[x,\, y,\, [z, u, v]\bigr].
   $$

2. **法则 (II) 双侧迁移不变格拉姆保正与触零分离律**：$\kappa(x, y) = \kappa(y, x)$，$\kappa(x, y) = 1 \iff x = y$，$\kappa(x, y) \ge 0$，读数**触零**——存在完全正交失配极限 $\inf_{x, y \in \mathcal{M}}\kappa(x, y) = 0$，即对每个 $\varepsilon > 0$ 都有一对点的读数低于 $\varepsilon$——并对任意 $n \ge 1$、$x_1, \dots, x_n, u, v \in \mathcal{M}$ 与一切实系数 $c_1, \dots, c_n$ 满足双侧迁移不变与格拉姆半正定（即 $\mathbf{G}_n = \bigl[\kappa(x_i, x_j)\bigr]_{i,j=1}^n \succeq 0$）：

   $$
   \kappa\bigl([x, u, v],\, [y, u, v]\bigr) \;=\; \kappa\bigl([u, v, x],\, [u, v, y]\bigr) \;=\; \kappa(x, y), \qquad \sum_{i,j=1}^{n} c_i c_j\,\kappa(x_i, x_j) \;\ge\; 0.
   $$

   上界 $\kappa \le 1$ 不必另设：取 $n = 2$、点对 $(x, y)$、系数 $(1, -1)$ 即得 $2 - 2\kappa(x, y) \ge 0$，故读数自动落在 $[0, 1]$ 内（`手工推导`）。

3. **法则 (III) 极小非对易与极小秩自锁律**：迁移容纳非平凡次序敏感性，且读数的**特征秩** $\operatorname{rk}\kappa$——读数能在欧氏空间 $\mathbb{R}^r$ 中实现为内积的最小 $r$（不存在这样的 $r$ 时记 $\operatorname{rk}\kappa = \infty$）——在全体满足法则 (I)–(II) 的非交换、链连通结构中取最小：

   $$
   \exists\, x, y, z \in \mathcal{M},\quad [x, y, z] \neq [z, y, x], \qquad \operatorname{rk}\kappa \;:=\; \min\bigl\{ r \in \mathbb{N} : \exists\, \varphi : \mathcal{M} \to \mathbb{R}^r,\ \kappa(x, y) = \langle\varphi(x), \varphi(y)\rangle \bigr\} \;\to\; \min.
   $$

这个最小值恰为 $5$：满足法则 (I)–(II) 的非交换链连通结构，特征秩都不低于 $5$（[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 4 款，`LEAN ✓`）；单位四元数模型属于这一结构类，其读数可在 $\mathbb{R}^5$ 中实现（同一定理第 3 款，`LEAN ✓`）；两条合起来即“极小值恰为 $5$”（`手工推导`）。于是满足母公理的结构非交换、链连通、触零、读数完备且特征秩为 $5$，它与单位四元数模型同构：对任一基点 $o \in \mathcal{M}$，存在把 $o$ 送到 $1$、保持迁移与读数的双射 $u : \mathcal{M} \to \mathrm{Sp}(1)$，迁移变成 $u(x)u(y)^{-1}u(z)$，读数变成 $\frac{1 + \langle u(x), u(y)\rangle}{2}$（[@thm-ch39-axiom-omega-complete-rank-five-isomorphism] 第 2 款，`LEAN ✓`）。单位四元数群 $\mathrm{Sp}(1)$ 就是 $\mathbb{R}^4$ 中的单位球面 $S^3(1)$；记 $d_{S^3}(x, y) := \arccos\langle u(x), u(y)\rangle \in [0, \pi]$ 为两像点的大圆距离，读数即 $\kappa(x, y) = \cos^2\frac{d_{S^3}(x, y)}{2}$（`手工推导`）。

**推论：流形、维数与可微性（`手工推导`）。** 经这个双射，$\mathcal{M}$ 获得 $S^3(1)$ 的全部结构：它是紧、连通、单连通（$\pi_1(\mathcal{M}) = 0$）的三维流形，取定基点后的群 $(\mathcal{M}, \star_o, o)$ 是实解析李群 $\mathrm{SU}(2)$，读数 $\kappa = \cos^2\frac{d_{S^3}}{2}$ 光滑，且固定第一变元的单槽二阶海森形式 $\nabla_y^2\kappa(x, y)\big\rvert_{y=x} \prec 0$ 严格负定非退化。由于 $u$ 保持读数，它把弦距 $d_\kappa$ 变成 $\mathbb{R}^4$ 中的弦长，所以搬来的拓扑就是 $d_\kappa$ 的度量拓扑。这些都不是假设，而是结论；搬运本身属 `手工推导`，双射在何种意义下唯一未形式化。数字“$3$”也由此得出：特征秩 $5 = 1 + 4$，扣去公共常数方向后剩下四个坐标，其平方和为 $1$，于是载体是 $\mathbb{R}^4$ 中的三维单位球面——它不是填进公理的，也不是在各种维数之间比出来的。

**读数完备不可省（`手工推导`）。** 抽去读数完备，有理单位四元数构成的子群 $S^3(\mathbb{Q})$ 连同同样的迁移与读数满足其余全部条款：它含 $\pm 1$ 与 $i, j$，故触零且非交换；有理点在 $S^3$ 中稠密，故链连通；读数在 $\mathbb{R}^5$ 中实现，特征秩取到最小值 $5$。它经包含映射单射嵌入 $S^3$，却铺不满：可数集与 $S^3$ 之间没有双射。这正是 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 5 款只给出单射、[@thm-ch39-axiom-omega-complete-rank-five-isomorphism] 须加读数完备的原因。

**等价的经典表述：流形表述。** 本节先前的写法（下称**流形表述**）把载体建模为经 `H3` 柯西度量完备化后的非平凡连通单连通有限维拓扑流形，要求迁移连续、读数为 $C^2$ 且单槽二阶海森严格负定非退化，法则 (III) 则令流形维数与再生核希尔伯特空间维数 $\operatorname{rank}\mathcal{H}_\kappa := \dim_{\mathbb{R}}\mathcal{H}_\kappa$ 按字典序取极小，$(\dim\mathcal{M}, \operatorname{rank}\mathcal{H}_\kappa) \to \min_{\mathrm{lex}}$。它与上面的写法选出同一个结构，即单位四元数模型 $S^3(1)$ 与 $\kappa_{S^3}$；但这一等价要用到经典文献定理：流形表述先比维数，须先知道维数 $1$、$2$ 的连通流形上不存在满足法则 (I)–(II) 的非交换结构（读数特征秩为无穷的候选也在其内），这一步靠蒙哥马利—齐平定理与 §39.1.3 的李代数淘汰，整体属 `文献结果` 加 `手工推导`，其中李代数淘汰的纯代数一步由 [@thm-ch39-axiom-omega-invariant-form-low-dimension] 内核检查。母公理只比特征秩，不经过这一步。逐条对应与分层见 [@rem-ch39-axiom-omega-formalization-bridge]。

审视这组母公理的纯粹性：全式**没有外部造物主原点 $\mathbf{1}$**（任意一点 $y$ 皆可临时充当局部比较桥，摆渡完毕即由 $[x, x, z] = z$ 自指归零消去），**没有线性加法 $+$**，**没有手工填入数字“$3$”**，连拓扑与可微性都没有预设。法则 (II) 的两项严密约束与[附录 E §E.1](appendix-e-s01-layers.md#sec-appe-layers) 逐条对应：**左右双侧**流群不变性在非阿贝尔群上锁定类函数共轭不变性 $\varphi(h g h^{-1}) = \varphi(g)$，而外延分离 $\kappa(x, y) = 1 \iff x = y$ 与触零下确界 $\inf\kappa = 0$ 则排除常值核 $\kappa \equiv 1$ 及加权偏置核。

::: {.viz src="axiom-omega-dimension-closure-sandbox" preset="origin-free-ternary-bridge" height="500"}
无源的桥与原点平权卡：在同一座球面上拖动任意临时参照桥 $o$，三元流群搬运 $[i, 1, j] = +k$ 与换序 $[j, 1, i] = -k$ 落在对跖两极，而重合桥 $[x, x, z] = z$ 零残渣自消去（母公理载体标 `MODEL`，流群恒等式与读数标 `NUM`，划分商核与单位格拉姆全同标 `LEAN ✓`）。
:::

## 39.1.3 一生四相：三步非循环数学推导依次锁定三元数 $S^3$、极小圆弧核与闭合场 {#sec-ch39-24-3}

现在不添任何额外假定，严格按无循环逻辑次序从母公理逐阶推出其余三大支柱（三元群还原与秩路线为 `LEAN ✓`；流形表述下的李理论路线为 `文献结果` 加 `手工推导`，其中低维李代数的纯代数一步为 `LEAN ✓`，作为同一结论的经典路线保留）：

1. **第一步导出“三元数”：三行群还原，再由两条路线走向 $S^3(1)$——内核验证的秩路线（特征秩下界五、秩五嵌入、加读数完备得同构），与流形表述下的经典路线（存在性见证锁住 $d_{\min} \le 3$，两行反自伴消去击毙 $d = 1, 2$、交换群 $\mathbb{R}^3$ 与全部三维非交换非紧李群，唯一锁死 $S^3(1)$）**。
   首先确认母公理非空可满足：在三维单连通群 $\mathrm{SU}(2) \cong S^3$ 上取 $[x, y, z] = x y^{-1} z$ 与核 $\kappa_{S^3}(u, v) = \frac{1 + \operatorname{Re}\operatorname{Tr}(u v^\dagger)/2}{2} = \frac{1 + \langle u, v\rangle_{\mathbb{R}^4}}{2} \in [0, 1]$，直接检验满足法则 (I)–(II) 且具非交换性——这正是单位四元数模型，其非交换、触零、链连通与读数在 $\mathbb{R}^5$ 中的实现均经内核检查（[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 3 款，`LEAN ✓`），故法则 (III) 所求极小特征秩至多为 $5$；在流形表述中，它也给出极小非对易维数的上界 **$d_{\min} \le 3$**！接下来考察任意满足法则 (I)–(II) 与非交换性的候选结构 $\mathcal{M}$：任选局部观察切面 $o \in \mathcal{M}$，定义诱导二元积 $x \star_o z := [x, o, z]$ 与局部对合逆 $x^{-1_o} := [o, x, o]$。法则 (I) 三行恒等变形直接证出 $(\mathcal{M}, \star_o, o)$ 是群（瑟坦—普吕弗—贝尔定理；内核检查的正是同一组三行改写，[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 1 款，`LEAN ✓`）：结合律由 $[[x,o,y],o,z] = [x,o,[y,o,z]]$ 直接给出；右逆与左逆分别为

   $$
   x \star_o x^{-1_o} = \bigl[x, o, [o, x, o]\bigr] = \bigl[[x, o, o], x, o\bigr] = [x, x, o] = o, \qquad x^{-1_o} \star_o x = \bigl[[o, x, o], o, x\bigr] = \bigl[o, x, [o, o, x]\bigr] = [o, x, x] = o;
   $$

   且原始三元迁移精确复原为 $x \star_o (y^{-1_o} \star_o z) = [x, o, [[o, y, o], o, z]] = [x, o, [o, y, z]] = [[x, o, o], y, z] = [x, y, z] = x y^{-1_o} z$（第 1 款，`LEAN ✓`）；法则 (III) 的次序敏感也恰好等价于任一基点群 $(\mathcal{M}, \star_o, o)$ 不交换（同款）。切换切面 $o \mapsto o'$ 的映射 $x \mapsto [x, o, o']$ 是 $\mathcal{M}$ 上的双射（同款，`LEAN ✓`）；再手算 $[[x, o, z], o, o'] = [x, o, [z, o, o']] = \bigl[[x, o, o'], o', [z, o, o']\bigr]$、$[o, o, o'] = o'$ 与法则 (II) 的右侧不变性 $\kappa([x, o, o'], [y, o, o']) = \kappa(x, y)$，可见它在三元流群 $(\mathcal{M}, [-,-,-])$ 上施等距平移自同构，并在定基群之间诱导把单位元 $o$ 映为 $o'$ 的等距群同构 $(\mathcal{M}, \star_o, o) \xrightarrow{\sim} (\mathcal{M}, \star_{o'}, o')$（`手工推导`），证明无基点流群点点平权（严格区别于固定基点群 $\mathrm{SU}(2)$ 内部的二元代数中心 $\{\pm I_2\}$）。

   **内核验证的秩路线（主线）。** 群还原之后，母公理其余条款直接落到 [@def-ch39-ternary-comparison-structure] 的谓词上：法则 (III) 的次序敏感即非交换，法则 (II) 的 $\inf\kappa = 0$ 即触零，链连通与读数完备就是载体的两条条件。特征秩为何至少是五、秩五为何只能是单位四元数，见 §39.1.4 中紧接在 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 之前的“内核验证路线”一段：先手算单位四元数模型，再把手算倒过来走。结论是该定理第 4、5 款（`LEAN ✓`）：非交换链连通结构的特征秩不低于 $5$；特征秩为 $5$ 且读数触零时，存在保持迁移与读数的单射 $u : \mathcal{M} \to \mathrm{Sp}(1)$。连同第 3 款，法则 (III) 的极小特征秩恰为 $5$（`手工推导`，见 §39.1.2）。**加上读数完备，单射成为双射**（[@thm-ch39-axiom-omega-complete-rank-five-isomorphism] 第 2 款，`LEAN ✓`）：$\mathcal{M}$ 同构于单位四元数群 $\mathrm{Sp}(1) = S^3(1)$，读数为 $\kappa_{S^3} = \cos^2\frac{d_{S^3}}{2}$；缺了读数完备，有理点子群 $S^3(\mathbb{Q})$ 便只占球面的一部分（§39.1.2）。可约候选 $S^3_L \times S^3_R$ 在这条路线上也由内核直接排除：两份单位四元数模型的乘积非交换、链连通、触零，但读数不能在 $\mathbb{R}^5$ 中实现（[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 7 款，`LEAN ✓`）。至此，“三元数 $\mathbb{T}_3 \cong S^3(1)$”已由内核验证的定理得出，没有经过流形、李代数或维数比较；下面的经典路线从流形表述的另一组假设出发，走到同一处。

   **流形表述下的经典路线（`文献结果` + `手工推导`）。** 以下在 §39.1.2 末所述流形表述的假设下进行：载体为连通单连通有限维流形，迁移连续，读数为 $C^2$ 且单槽二阶海森严格负定非退化；此时“极小维数 $3$”是中间结论。由蒙哥马利—齐平定理，$(\mathcal{M}, \star_o, o)$ 自动具备单连通实李群结构。在切李代数 $\mathfrak{m} = T_o\mathcal{M}$ 上，读数双侧迁移不变，故 $\varphi := \kappa(o, \cdot)$ 是基点群上的类函数，$\varphi(h g h^{-1}) = \varphi(g)$，它在单位元处的海森形式因而 $\operatorname{Ad}$ 不变；正定性来自海森严格负定这一假设，格拉姆半正定在这一步不起作用。于是 $\langle A, B\rangle := -\nabla^2\varphi(o)(A, B)$ 是严格正定且 $\operatorname{Ad}$-双不变的内积，从而强制伴随作用 $\operatorname{ad}_A(B) = [A, B]$ 反自伴（呼应第 5 章 [@thm-balanced-sum-skew-adjoint] 中平衡幺正和交叉项的反自伴律 [`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum)，其 `LEAN ✓` 属于那条定理）。下面的不变性恒等式由类函数在单位元处求导得到，属 `手工推导`；它正是 [@thm-ch39-axiom-omega-invariant-form-low-dimension] 的不变性前提：

   $$
   \bigl\langle [A, B],\, C \bigr\rangle \;=\; -\bigl\langle B,\, [A, C] \bigr\rangle \qquad (\forall\, A, B, C \in \mathfrak{m}).
   $$

   - **一维与二维的绝对死锁（两行证毕）**：$d = 1$（单连通实线 $\mathbb{R}$）时括号恒零；若 $d = 2$，任取正交归一基 $\{\mathbf{e}_1, \mathbf{e}_2\}$，直接计算换位子 $[\mathbf{e}_1, \mathbf{e}_2]$ 在两根基轴上的投影：

     $$
     \bigl\langle [\mathbf{e}_1, \mathbf{e}_2],\, \mathbf{e}_1 \bigr\rangle \;=\; -\bigl\langle \mathbf{e}_2,\, [\mathbf{e}_1, \mathbf{e}_1] \bigr\rangle \;=\; 0, \qquad \bigl\langle [\mathbf{e}_1, \mathbf{e}_2],\, \mathbf{e}_2 \bigr\rangle \;=\; \bigl\langle \mathbf{e}_1,\, [\mathbf{e}_2, \mathbf{e}_2] \bigr\rangle \;=\; 0.
     $$

     在正定二维平面上，同时垂直于完备正交基的向量**恒为零向量** $[\mathbf{e}_1, \mathbf{e}_2] \equiv \mathbf{0}$（二维单连通非交换仿射群 $\mathrm{Aff}^+(1, \mathbb{R})$ 的李代数 $[H, E] = E$ 亦因 $\langle E, E\rangle = \langle [H, E], E\rangle = -\langle E, E\rangle \implies E = \mathbf{0}$ 出局）。故在流形表述中，$d = 1, 2$ 无法在不违背上述正定内积的前提下容纳非对易，迫使 $d_{\min} = 3$。这一步的一般形式已由内核检查：任意域上维数至多二、带不变且左可分的双线性型的李代数必交换（[@thm-ch39-axiom-omega-invariant-form-low-dimension] 第 1 款，`LEAN ✓`），不需要对称与正定。

::: {.viz src="axiom-omega-dimension-closure-sandbox" preset="dimension-sieve-1d-2d-deadlock" height="500"}
一维与二维扭不起来卡：$d = 1$ 实线上括号恒零，$d = 2$ 正定平面上反自伴换位子 $[\mathbf{e}_1, \mathbf{e}_2]$ 同时垂直于完备正交基而恒等于零向量，非交换仿射群 $\mathrm{Aff}^+(1, \mathbb{R})$ 亦失去双不变正定球面（反自伴消去标 `NUM`，平衡叉乘反自伴标 `LEAN ✓`）。
:::

   - **三维非紧流形的自动淘汰与单位三维球面 $S^3(1)$ 的唯一自锁**：在 $d = 3$ 处，按米尔诺双不变度规分解引理（Milnor 1976, Lemma 7.5），具 $\operatorname{Ad}$-不变正定内积的李代数必正交分解为交换中心与紧单李代数直和；因不存在一维或二维紧单李代数，三维双不变正定李代数唯有交换代数 $\mathbb{R}^3$（违反非对易性）与紧单代数 $\mathfrak{su}(2)$ 两种可能。本章只用到三维情形，而三维情形已不依赖该引理：[@thm-ch39-axiom-omega-invariant-form-low-dimension] 第 2 款（`LEAN ✓`）直接给出，三维非交换实李代数只要带一个不变且在非零向量上取正值的双线性型，就有一组正交归一基，使括号在这组基下的坐标是叉积的正倍数。直接检验亦见：三元幂零海森堡代数 $H_3(\mathbb{R})$（$[X, Y] = Z$ 中心元）给出 $\langle Z, Z\rangle = \langle [X, Y], Z\rangle = -\langle Y, [X, Z]\rangle = 0 \implies Z = \mathbf{0}$；三维非交换可解代数与具不定基灵号差 $(+, +, -)$ 的 $\mathfrak{sl}(2, \mathbb{R})$ 同样不容许 $\operatorname{Ad}$-不变正定内积，这由上一条推出（`手工推导`）：叉积的正倍数满足 $[L, L] = L$，且每个非零元 $x$ 的 $\operatorname{ad}_x$ 在正交归一基下是非零反对称矩阵，其非零特征值是一对纯虚数；可解代数（含 $H_3(\mathbb{R})$）的导代数 $[L, L]$ 是 $L$ 的真子代数，不满足前者；$\mathfrak{sl}(2, \mathbb{R})$ 中 $\operatorname{ad}_H$ 有实特征值 $\pm 2$，不满足后者。故在 $d = 3$ 上，法则 (II) 连同流形表述的海森条款**无需额外假设紧致性**即淘汰全部三维非交换非紧单连通李群，结合法则 (III) 的非对易性排除交换群 $\mathbb{R}^3$，唯一锁死 $\mathcal{M} \cong \mathrm{SU}(2) \cong S^3$！取半径归一（通过常数标度重整度规令常截面曲率 $K = 1$，测地距离 $d_{S^3}(x, y) \in [0, \pi]$）的单位三维球面 $S^3(1)$ 标准正交基 $\mathbf{e}_j = -i\sigma_j$，李括号呈现三维循环叉乘闭锁 $[\mathbf{e}_i, \mathbf{e}_j] = 2\varepsilon_{ijk}\mathbf{e}_k$（对这组基直接计算，属 `手工推导`；[@thm-ch39-axiom-omega-invariant-form-low-dimension] 第 2 款（`LEAN ✓`）说明这个形状是必然的：带不变正定型的三维非交换实李代数，在某组正交归一基下括号必是叉积的正倍数，在单位球面度量下这个倍数为 $2$；另参照自旋因子分类 [`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences)）。至于 $d \ge 4$ 的非极小候选——包括带一维非紧平直方向的四维直积群 $\mathrm{SU}(2) \times \mathbb{R}$（如配乘积高斯核 $\kappa_{S^3}(u,v)e^{-(t-s)^2}$ 虽满足法则 I–II，但维数 $4 > 3$）、六维可约半单直积 $S^3_L \times S^3_R$（劈裂为两座独立三元数场）以及八维紧单群 $\mathrm{SU}(3)$——全部因维数严格大于 $d_{\min} = 3$ 被流形表述的字典序（先比维数）筛除。因此在流形表述下，字典序极小的流形在等距重标下**唯一同构于三维球面 $\mathcal{M} \cong S^3(1)$**，与秩路线的结论相同——其抹去特权原点 $o$ 的流群形态，正是携带李三元曲率括号 $\{\mathbf{a}, \mathbf{b}, \mathbf{c}\} = \frac{1}{4}[[\mathbf{a}, \mathbf{b}], \mathbf{c}]$ 的**三元数 $\mathbb{T}_3$**！

::: {.viz src="axiom-omega-dimension-closure-sandbox" preset="three-sphere-noncompact-elimination" height="500"}
三维非紧候选出局卡：伴随流把海森堡代数 $H_3(\mathbb{R})$ 与 $\mathfrak{sl}(2, \mathbb{R})$ 的欧氏单位球剪切拉伸成品红椭球，唯有紧单 $\mathfrak{su}(2) \cong T_o S^3(1)$ 严格保住正定单位球并闭锁三维叉乘（米尔诺双不变分类标 `ARGUED`，伴随形变实算标 `NUM`，自旋因子叉乘分类 `complete_consequences` 标 `LEAN ✓`）。
:::

2. **第二步导出“极小圆弧”：秩路线直接给出母核 $\kappa_{S^3}(x, y) = \cos^2\frac{d_{S^3}(x, y)}{2}$，彼得—外尔特征标展开解释极小忠实秩为何是 $1 + 4 = 5$**。
   秩路线已直接给出读数公式 $\kappa(x, y) = \frac{1 + \langle u(x), u(y)\rangle}{2}$（[@thm-ch39-axiom-omega-complete-rank-five-isomorphism] 第 2 款，`LEAN ✓`）；下面的彼得—外尔展开作为经典解释保留，说明极小忠实秩为何恰是 $1 + 4 = 5$（展开定理为 `文献结果`，其中秩的计数与表示的分离性为 `LEAN ✓`，见下）。在第一步已独立锁定的紧单连通群 $\mathrm{SU}(2) \cong S^3(1)$ 上，任一元素 $U = x y^{-1_o}$ 距单位元的单位球测地角为 $d_{S^3}(x, y) \in [0, \pi]$（$U = \cos d_{S^3}\,I_2 - i\sin d_{S^3}\,\hat{\mathbf{u}}\cdot\boldsymbol{\sigma}$，基本自旋 $j = \frac{1}{2}$ 特征标为 $\chi_{1/2}(U) = \operatorname{Tr}(U) = 2\cos d_{S^3}$）。由彼得—外尔与博赫纳—勋伯格定理，任意双侧不变半正定核必展开为不可约特征标的非负组合 $\kappa(x, y) = \sum_{j \in \frac{1}{2}\mathbb{N}} c_j\,\chi_j(x y^{-1_o})$（$c_j \ge 0$，每个 $c_j > 0$ 贡献格拉姆秩 $(2j+1)^2$）：
   - 若仅取整数自旋 $j \in \mathbb{N}$（即从商群 $\mathrm{SO}(3)$ 拉回的核，如 [§37.1](ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.md)–[§37.2](ch39-s23-least-action-geodesics-and-cosmos-ai-isomorphism.md) 在 $\mathrm{SO}(3)$ 上使用的秩 $1 + 9 = 10$ 伴随玻恩核 $\cos^2 d_{S^3} = \cos^2\frac{\Delta\theta_{\mathrm{SO}(3)}}{2}$），则对径点 $-I_2$ 满足 $\chi_j(-I_2) = \chi_j(+I_2) = 2j+1 \implies \kappa(o, -o) = 1$，在单连通 $S^3$ 上违背外延分离律 $\kappa(x, y) = 1 \iff x = y$；
   - 若仅取纯 $j = \frac{1}{2}$ 项 $\frac{1}{2}\chi_{1/2}(U) = \cos d_{S^3}$，则在钝角区 $d_{S^3} \in (\frac{\pi}{2}, \pi]$ 取负值，违背值域 $\kappa \in [0, 1]$；
   - 故在 $S^3(1)$ 上同时满足忠实分离与非负性的最低格拉姆秩必合并 $j = 0$（秩 $1$）与 $j = \frac{1}{2}$（秩 $2^2 = 4$），达到**极小忠实秩 $\operatorname{rank}\mathcal{H}_\kappa = 1 + 4 = 5$**（$1^2 + 2^2 = 5$ 这一计数即 [@thm-ch39-axiom-omega-character-kernel-rank] 在两个分量上的情形，`LEAN ✓`，连同上面两步 `手工推导`；“更低的秩不可能”在秩路线上另有内核检查的下界，见 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 4 款）！再代入归一条件 $\kappa(x, x) = c_0 + 2c_{1/2} = 1$ 与法则 (II) 的触零条件 $\inf\kappa = \kappa(x, x_{\mathrm{anti}}) = c_0 - 2c_{1/2} = 0$（$d_{S^3} = \pi$），唯一解出 $c_0 = \frac{1}{2},\; c_{1/2} = \frac{1}{4}$：

   $$
   \kappa_{S^3}(x, y) \;=\; \frac{1}{2} + \frac{1}{4}\chi_{1/2}(x y^{-1_o}) \;=\; \frac{1 + \cos d_{S^3}(x, y)}{2} \;=\; \cos^2\!\left(\frac{d_{S^3}(x, y)}{2}\right) \;\in\; [0, 1].
   $$

   这段经典解释里有两处已由内核检查，其余仍是 `文献结果`。其一，“系数非零的不可约分量各贡献 $(\dim)^2$、各分量的贡献相加”这一计数（[@thm-ch39-axiom-omega-character-kernel-rank]，`LEAN ✓`）：它在代数闭域上、对任意群的有限多个两两不等价的有限维不可约表示成立，核的秩取各截面 $x \mapsto \kappa(x, y)$ 张成空间的维数；用到这里要取复数域 $\mathbb{C}$，并用“实值核在实数域与复数域上的秩相等”“$\mathrm{SU}(2)$ 的平凡表示与二维基本表示不可约且互不等价”两步，这两步是 `手工推导`。其二，“紧群有足够多的有限维酉表示”，即表示的核可落在单位元的任意邻域内，这是彼得—外尔定理的分离形式（[@thm-ch39-axiom-omega-compact-group-unitary-kernel] 第 2 款，`LEAN ✓`）。展开定理本身——双侧不变半正定核是不可约特征标的非负组合——仍是 `文献结果`：彼得—外尔定理的完备性与博赫纳—勋伯格定理都没有形式化，无穷多个系数非零的展开也不在上述计数定理的范围内。

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

   顶维外导数恒零（$d\eta \equiv 0$）配紧流形无边界（$\partial\mathcal{M} = \emptyset$，离散对应 [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact) 与 [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)，`LEAN ✓`）意味着三元极小圆弧体一旦走满三维，无需借用外部背景网格即可实现无源无漏的旋度自持闭合（`1—3—3—1` 外代数中 $\Lambda^3 \cong \Lambda^0$）——**这枚无中心、无边缘、处处均匀同性的闭合三元数流形本身，就是原生“场”**。需要补充的是，顶维形式外导数恒零与紧流形无边界对任何闭三维流形都成立，单凭这两条挑不出 $S^3$；这一步有实质内容的部分在于：三元迁移 $[-, -, -]$ 等价于一对挠率互为相反数的平坦度量联络 $\nabla^L, \nabla^R$（左、右迁移的微分即两者的平行移动），两者的平均 $\frac{1}{2}(\nabla^L + \nabla^R)$ 是截面曲率 $1$ 的列维-奇维塔联络（É. Cartan & J. A. Schouten, *Proc. Akad. Wetensch. Amsterdam* **29**, 803–815, 1926，`文献结果`）；挠率给出的双不变三形式 $\langle X, [Y, Z]\rangle$（在 $S^3(1)$ 上等于 $2\eta$）则是球面上三元运算的障碍：若球面 $S^n$（$n \ge 1$）承载满足法则 (I) 的连续三元运算，它便是紧连通李群，交换时为环面，只能是 $S^1$，非交换时这枚三形式代表德拉姆上同调 $H^3$ 的非零类，迫使 $n = 3$，因而在 $n \ge 1$ 的球面中，除 $S^1$、$S^3$ 外没有别的球面承载这样的运算（$S^0 = \{\pm 1\}$ 作为群也满足法则 (I)，故须限定 $n \ge 1$；`手工推导`）。把法则 (I) 的第三条恒等式减弱为只在两个元素生成的子系统中成立时，单位八元数 $S^7$ 连同 $[x, y, z] = (x\bar{y})z$ 与 $\kappa(x, y) = \lVert (x + y)/2\rVert^2$ 满足减弱后的法则 (I)、法则 (II) 与往返律；只保留前两条恒等式时，$n \ge 1$ 的球面中承载这种运算的只能是 $S^1$、$S^3$、$S^7$（J. F. Adams, *Ann. of Math.* **72**, 20–104, 1960，`文献结果`）。更一般地，若取定基点后的乘法 $x \cdot y := [x, o, y]$ 是实解析的二结合环（每两个元素生成的子环都是群），且 $\kappa$ 满足法则 (II) 与往返律，则其切代数只能是 $\mathbb{R}$、$\mathfrak{su}(2)$ 或 $\operatorname{Im}\mathbb{O}$，基点附近局部同构于 $S^1$、$S^3$ 或单位八元数 $S^7$；该环自动是穆方环（见 [@rem-ch39-axiom-omega-heap-rigidity]），因而整体同构于三者之一并取 $\kappa = \lVert (x + y)/2\rVert^2$（`手工推导`；所用解析环的标准事实见 A. I. Mal'cev, *Mat. Sb.* **36(78)**, 569–576, 1955；A. N. Grishkov, *Izv. Akad. Nauk SSSR Ser. Mat.* **44**, 999–1030, 1980；F. S. Kerdman, *Algebra i Logika* **18**, 523–555, 1979，`文献结果`）。

::: {.viz src="axiom-omega-dimension-closure-sandbox" preset="cartan-three-form-closed-field" height="500"}
无边界的嘉当三形式场卡：测地球半径推向 $r \to \pi$ 时边界面积收缩归零，单位体积嘉当三形式 $\eta$ 积满 $2\pi^2$ 且外导数 $d\eta \equiv 0$（嘉当三形式文献标 `ARGUED`，离散面闭链与单纯二上链正合标 `LEAN ✓`，体积与波前读数标 `NUM`）。
:::

## 39.1.4 统一退化谱系、形式锚点与候选维数检验审计 {#sec-ch39-24-4}

我们将三元比较结构与母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的严格定义、§39.1.2 结论句所引的两条内核验证主定理、十一项既有 Lean 4 内核锚点、经典文献边界、母公理与流形表述的对应以及候选维数定量检验收束如下。先定义三元比较结构及其谓词，它们与 §39.1.2 的条款逐字对应；母公理随后写成这些谓词的合取：

::: {.definition #def-ch39-ternary-comparison-structure title="三元比较结构及其非交换、触零、链连通、特征秩与读数完备谓词" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.Noncommutative,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.TouchesZero,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.ChainConnected,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.GramRankLE,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.HasFeatureRank,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.ReadingComplete"}
集合 $M$ 上的**三元比较结构**由迁移 $[-, -, -] : M \times M \times M \to M$ 与读数 $\kappa : M \times M \to \mathbb{R}$ 组成，满足：对一切 $x, y, z, u, v \in M$，$[x, x, z] = z$，$[x, z, z] = x$，$[[x, y, z], u, v] = [x, y, [z, u, v]]$；$\kappa(x, y) = \kappa(y, x)$；$\kappa(x, y) = 1 \iff x = y$；$\kappa(x, y) \ge 0$；$\kappa([x, u, v], [y, u, v]) = \kappa(x, y)$ 且 $\kappa([u, v, x], [u, v, y]) = \kappa(x, y)$；对一切 $n \in \mathbb{N}$、$x_1, \dots, x_n \in M$ 与 $c_1, \dots, c_n \in \mathbb{R}$，$\sum_{i,j=1}^{n} c_i c_j\,\kappa(x_i, x_j) \ge 0$。对这样的结构与 $r \in \mathbb{N}$ 定义：

1. **非交换**：存在 $x, y, z \in M$ 使 $[x, y, z] \neq [z, y, x]$；
2. **触零**：对每个 $\varepsilon > 0$ 存在 $x, y \in M$ 使 $\kappa(x, y) < \varepsilon$；
3. **链连通**：对每个 $\varepsilon > 0$ 与任意 $x, y \in M$，存在有限序列 $x = x_0, x_1, \dots, x_k = y$（$k \ge 0$），使 $\kappa(x_{i-1}, x_i) > 1 - \varepsilon$ 对 $1 \le i \le k$ 成立；
4. **格拉姆秩至多 $r$**：对一切 $n \in \mathbb{N}$ 与 $x_1, \dots, x_n \in M$，矩阵 $[\kappa(x_i, x_j)]_{i,j=1}^n$ 的秩不超过 $r$；
5. **特征秩至多 $r$**（读数可在欧氏 $r$ 维空间实现）：存在 $\varphi : M \to \mathbb{R}^r$，使对一切 $x, y \in M$ 有 $\kappa(x, y) = \langle\varphi(x), \varphi(y)\rangle$；
6. **读数完备**：对 $M$ 中每个序列 $(x_n)_{n \in \mathbb{N}}$，若对每个 $\varepsilon > 0$ 存在 $N \in \mathbb{N}$ 使一切 $m, n \ge N$ 有 $\kappa(x_m, x_n) > 1 - \varepsilon$，则存在 $a \in M$，使对每个 $\varepsilon > 0$ 存在 $N \in \mathbb{N}$ 使一切 $n \ge N$ 有 $\kappa(x_n, a) > 1 - \varepsilon$。
:::

::: {.definition #def-ch39-axiom-omega-ternary-comparison-closure title="无源保正三元比较闭合母公理（AXIOM-Ω）与一生四相退化谱系（模型定义）"}
设 $\mathcal{M}$ 为经 `H1` 外延商化的非空集合，$(\mathcal{M}, [-, -, -], \kappa)$ 为其上的三元比较结构（[@def-ch39-ternary-comparison-structure]；其公理即法则 (I) 无源消去与结合律，以及法则 (II) 中的对称、外延分离、读数非负、双侧迁移不变与格拉姆半正定（`H2`））。称它满足**大一统母公理 $\mathrm{AXIOM}\text{-}\Omega$**（`MODEL`），若它触零（法则 (II) 的 $\inf\kappa = 0$）、链连通、读数完备，且满足法则 (III)：它非交换，且其特征秩——使读数可由某个 $\varphi : \mathcal{M} \to \mathbb{R}^r$ 实现的最小 $r \in \mathbb{N}$，不存在这样的 $r$ 时为 $\infty$——等于全体非交换、触零且链连通的三元比较结构的特征秩的最小值。在此母公理下，现行科学核心框架按五类受控投影或组合极限统一收回：(1) 钉死特权原点 $o = \mathbf{1}$ 作线性再投影收回 $\mathbb{H}, \mathbb{O}, \mathcal{H}_{2^N}$；(2) 丢弃二阶矢高 $1 - \cos\epsilon$ 收回线性微积分，保留半密度矢高（配 `H6, H9`）收回薛定谔与伊藤微积分；(3) 平行场丛驻相极值分化出胞内三大规范力与胞间主频引力；(4) 嘉当三形式整绕数 $\frac{1}{2\pi^2}\int f^*\eta \in \pi_3(\mathbb{T}_3) \cong \mathbb{Z}$ 量子化出整数拓扑荷；(5) 流群自平行接力配 $\varepsilon_{\mathrm{self}}$ 早停构成三元数场智能架构。
:::

下面两条定理就是 §39.1.2 结论句所引的主定理：第一条给出特征秩下界五与秩五单射嵌入，第二条在读数完备下把单射升为双射；[@thm-ch39-axiom-omega-ray-kernel-born-weight] 与 [@thm-ch39-axiom-omega-two-point-homogeneity] 再在所得的模型上接到玻恩权重与两点齐性。它们都由 Lean 内核检查，假设中不出现流形、拓扑或可微性。

**内核验证路线：特征秩为何至少是五，秩五为何只能是单位四元数。** 先手算最透明的例子。单位四元数模型的特征映射是 $\varphi(q) = \frac{1}{\sqrt{2}}(1, q_0, q_1, q_2, q_3) \in \mathbb{R}^5$，$\langle\varphi(p), \varphi(q)\rangle = \frac{1 + \langle p, q\rangle}{2} = \kappa(p, q)$。取对跖的一对 $\pm 1$：

$$
\varphi(1) = \tfrac{1}{\sqrt{2}}(1, 1, 0, 0, 0), \qquad \varphi(-1) = \tfrac{1}{\sqrt{2}}(1, -1, 0, 0, 0), \qquad \langle\varphi(1), \varphi(-1)\rangle = 0,
$$

读数触零；两点连线上离原点最近的是中点 $m = \frac{1}{\sqrt{2}}(1, 0, 0, 0, 0)$，$\lVert m\rVert^2 = \frac{1}{2}$。每个特征向量在 $m$ 上的分量都一样，$\langle m, \varphi(q)\rangle = \frac{1}{2} = \lVert m\rVert^2$；减掉 $m$，剩下的 $\varphi(q) - m = \frac{1}{\sqrt{2}}(0, q_0, q_1, q_2, q_3)$ 恰是四元数自己的四个坐标。读数于是拆成“公共常数 $+$ 四维球面上的内积”：$\kappa(p, q) = \frac{1}{2} + \frac{1}{2}\langle p, q\rangle$。这五栏一栏也省不掉：取五个点 $1, -1, i, j, k$，读数表的对角元是 $1$，$\kappa(1, -1) = 0$，其余非对角元都是 $\frac{1}{2}$，它的行列式是 $\frac{1}{8} \neq 0$，秩为 $5$，所以这个模型的读数不能在 $\mathbb{R}^4$ 中实现（`手工推导`；与 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 2 款相合）。一般情形的证明（[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 4–5 款，`LEAN ✓`）就是把这次手算倒过来走：

- **单位向量与两族等距**：$\kappa(x, x) = 1$ 与 $\kappa \ge 0$ 使特征向量是两两夹角不超过 $90^\circ$ 的单位向量，其闭凸包不含零向量，离原点最近的点 $m \neq 0$。固定基点 $o$，左平移 $x \mapsto [g, o, x]$ 与右平移 $x \mapsto [x, o, h]$ 保持读数（法则 II），延拓为特征张成空间上的线性等距，并由结合律 $[[g, o, x], o, h] = [g, o, [x, o, h]]$ 彼此交换；左平移置换特征向量，故固定 $m$，每个 $\varphi(x)$ 在 $m$ 上的分量都是 $\lVert m\rVert^2$。
- **四元数坐标**：在 $m$ 的正交补 $E$（维数至多 $r - 1$）上，中心化向量 $\varphi(x) - m$ 的格拉姆核是 $\kappa - \lVert m\rVert^2$。设 $\dim E \le 4$。链连通使左平移由贴近恒等、不把任何非零向量翻成反向的平移生成，于是不变直线会被逐点固定（与左平移没有公共非零不动向量矛盾）；若 $E$ 拆成两张不变平面，平面上只剩两两交换的旋转，整群随之交换（与非交换矛盾）。所以左平移在 $E$ 上不可约，与之交换而自身互不交换的右平移迫使 $E$ 带上四元数坐标（舒尔与弗罗贝尼乌斯的经典代数），$\dim E = 4$。总之 $\dim E \ge 4$，故 $r \ge 5$。
- **秩五时系数锁死**：$r = 5$ 时读数写成 $\kappa(x, y) = a + (1 - a)\langle q(x), q(y)\rangle$，其中 $a = \lVert m\rVert^2 < 1$，$q$ 是到单位四元数的单射。触零配 $\langle q(x), q(y)\rangle \ge -1$ 给出 $a \le \frac{1}{2}$；单位四元数 $p \neq 1$ 总有某个幂的实部不超过 $-\operatorname{Re}p$，于是不同两点的读数都不超过 $2a$，而链连通提供不同两点间任意接近 $1$ 的读数，给出 $a \ge \frac{1}{2}$。$a = \frac{1}{2}$ 正是上面手算出的数。

::: {.theorem #thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding title="三元比较结构的基点群还原、特征秩下界五与秩五单射嵌入单位四元数" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.baseChange_bijective,D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.noncommutative_iff,D5/S3/Quantum/AURICOmega/GramRankFeatureMap.gramRankLE_iff_hasFeatureRank,D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_noncommutative,D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_touchesZero,D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_chainConnected,D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_hasFeatureRank_five,D5/S3/Quantum/AURICOmega/TernaryComparisonRankFive.five_le_of_hasFeatureRank,D5/S3/Quantum/AURICOmega/TernaryComparisonRankFive.exists_unitQuaternion_embedding,D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow,D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add,D5/S3/Quantum/AURICOmega/TernaryComparisonProduct.prod_hasFeatureRank,D5/S3/Quantum/AURICOmega/QuaternionProductRank.prod_quaternionModel_not_hasFeatureRank_five"}
设 $(M, [-, -, -], \kappa)$ 为三元比较结构（[@def-ch39-ternary-comparison-structure]），$\mathrm{Sp}(1) = \{q \in \mathbb{H} : \lVert q\rVert = 1\}$ 为单位四元数群，$\langle -, -\rangle$ 为 $\mathbb{H} \cong \mathbb{R}^4$ 与 $\mathbb{R}^r$ 上的标准实内积，“读数可由 $\varphi : M \to \mathbb{R}^r$ 实现”指对一切 $x, y \in M$ 有 $\kappa(x, y) = \langle\varphi(x), \varphi(y)\rangle$。则：

1. 对任意 $o \in M$，在以 $x \star_o z := [x, o, z]$ 为乘法、$o$ 为单位元、$x^{-1_o} := [o, x, o]$ 为逆元的群中，对一切 $x, y, z \in M$ 有 $[x, y, z] = x \star_o y^{-1_o} \star_o z$；对任意 $o, o' \in M$，映射 $x \mapsto [x, o, o']$ 是 $M$ 到自身的双射；对任意 $o \in M$，结构非交换当且仅当存在 $x, y \in M$ 使 $[x, o, y] \neq [y, o, x]$。
2. 对任意 $r \in \mathbb{N}$，读数的一切有限格拉姆矩阵 $[\kappa(x_i, x_j)]_{i,j=1}^n$ 的秩都不超过 $r$，当且仅当读数可由某个 $\varphi : M \to \mathbb{R}^r$ 实现。
3. 在 $\mathrm{Sp}(1)$ 上取 $[x, y, z] = x y^{-1} z$ 与 $\kappa(x, y) = \frac{1 + \langle x, y\rangle}{2}$ 所得的三元比较结构非交换、触零、链连通，且其读数可由某个 $\varphi : \mathrm{Sp}(1) \to \mathbb{R}^5$ 实现。
4. 若结构非交换且链连通，且对某个 $r \in \mathbb{N}$ 读数可由某个 $\varphi : M \to \mathbb{R}^r$ 实现，则 $r \ge 5$。
5. 若结构非交换、链连通、触零，且读数可由某个 $\varphi : M \to \mathbb{R}^5$ 实现，则存在单射 $u : M \to \mathrm{Sp}(1)$，使对一切 $x, y, z \in M$ 有 $u([x, y, z]) = u(x)\,u(y)^{-1}\,u(z)$，且对一切 $x, y \in M$ 有 $\kappa(x, y) = \frac{1 + \langle u(x), u(y)\rangle}{2}$。
6. 对任意 $a, b \in M$，令 $x_0 = a$、$x_1 = b$、$x_{n+2} = [x_{n+1}, x_n, x_{n+1}]$，则对一切 $n \in \mathbb{N}$，在第 1 款以 $a$ 为基点的群中 $x_n = b^n$；且对一切 $m, n \in \mathbb{N}$ 有 $\kappa(x_m, x_{m+n}) = \kappa(a, x_n)$。
7. 对三元比较结构 $(M, [-, -, -]_M, \kappa_M)$ 与 $(N, [-, -, -]_N, \kappa_N)$，记 $M \times N$ 上逐分量迁移、读数 $\kappa\bigl((x, x'), (y, y')\bigr) = \kappa_M(x, y)\,\kappa_N(x', y')$ 的结构为乘积结构。若两因子的读数分别可由进入 $\mathbb{R}^r$ 与 $\mathbb{R}^s$ 的映射实现，则乘积读数可由进入 $\mathbb{R}^{rs}$ 的映射实现。第 3 款的结构与自身的乘积结构非交换、链连通、触零，但其读数不能由任何进入 $\mathbb{R}^5$ 的映射实现。
:::

::: proof
第 1 款即 §39.1.3 第一步的三行改写；$x \mapsto [x, o', o]$ 是基点切换的逆映射；基点群若交换，则 $x y^{-1} z = z y^{-1} x$ 处处成立。第 2 款经读数的再生核希尔伯特空间，取至多 $r$ 个线性无关核函数张成空间的标准正交坐标并补零；反向由格拉姆矩阵是 $r \times n$ 坐标矩阵的转置乘自身。第 3 款取特征映射 $q \mapsto \frac{1}{\sqrt{2}}(1, q_0, q_1, q_2, q_3)$，以 $i \cdot 1^{-1} \cdot j = k \neq -k = j \cdot 1^{-1} \cdot i$、$\kappa(1, -1) = 0$ 与单位三维球面的连通性分别见证非交换、触零与链连通。第 4–5 款的骨架即本定理之前“内核验证路线”一段所述，最后取 $u$ 为 $q$ 的共轭，把反序乘法变回 $u(x)u(y)^{-1}u(z)$。第 6 款对 $n$ 归纳，再用左侧迁移不变性把点对 $(x_m, x_{m+n})$ 平移成 $(a, x_n)$。第 7 款前半取两特征映射的张量积；后半若乘积读数可在 $\mathbb{R}^5$ 中实现，第 5 款的单射 $u$ 经基点归一化为 $p \mapsto u(1, 1)^{-1}u(p)$ 后，会把基点群单位元 $(1, 1)$ 的两个不同的非平凡平方根 $(-1, 1)$ 与 $(1, -1)$ 都送到 $-1$，与单射矛盾。完整证明由 Lean 内核检查。
:::

第 5 款只给出单射，原因在于结构可以只占单位四元数的一部分：有理单位四元数组成的可数子群满足第 5 款的全部假设，却不可能与 $\mathrm{Sp}(1)$ 一一对应（`手工推导`）。补上读数完备，单射就成为双射：

::: {.theorem #thm-ch39-axiom-omega-complete-rank-five-isomorphism title="读数完备的秩五三元比较结构同构于单位四元数" lean="D5/S3/Quantum/AURICOmega/UnitQuaternionClosedSubgroup.eq_top_of_isClosed_of_chainConnected,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv"}
沿用 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 的记号，并对 $p, q \in \mathrm{Sp}(1)$ 记 $\kappa_{\mathbb{H}}(p, q) := \frac{1 + \langle p, q\rangle}{2}$。

1. 设 $H$ 是 $\mathrm{Sp}(1)$ 的子群，在 $\mathrm{Sp}(1)$（取 $\mathbb{H}$ 的子空间拓扑）中是闭集；存在 $x, y \in H$ 使 $xy \neq yx$；且对每个 $\varepsilon > 0$ 与任意 $x, y \in H$，存在 $H$ 中的有限序列 $x = h_0, h_1, \dots, h_k = y$（$k \ge 0$），使 $\kappa_{\mathbb{H}}(h_{i-1}, h_i) > 1 - \varepsilon$ 对 $1 \le i \le k$ 成立。则 $H = \mathrm{Sp}(1)$。
2. 设三元比较结构 $(M, [-, -, -], \kappa)$（[@def-ch39-ternary-comparison-structure]）非交换、链连通、触零、读数完备，且读数可由某个 $\varphi : M \to \mathbb{R}^5$ 实现。则对任意 $o \in M$，存在双射 $u : M \to \mathrm{Sp}(1)$，使 $u(o) = 1$，对一切 $x, y, z \in M$ 有 $u([x, y, z]) = u(x)\,u(y)^{-1}\,u(z)$，且对一切 $x, y \in M$ 有 $\kappa(x, y) = \kappa_{\mathbb{H}}(u(x), u(y))$。
:::

::: proof
第 1 款分三步。其一，取 $H$ 中一个不等于 $1$ 的元素，从 $1$ 到它的链里必有一步从 $1$ 走到一个不等于 $1$ 的元素，所以 $H$ 含有读数 $\kappa_{\mathbb{H}}(1, h)$ 任意接近 $1$ 的非平凡元素 $h$。其二，把这些元素写成极形式 $h = \cos\theta + \sin\theta\,n$（$n$ 为单位纯虚四元数，$\theta \to 0$），单位纯虚四元数构成紧的二维球面，$n$ 沿某个子列趋于某个 $a$；由棣莫弗公式 $(\cos\theta + \sin\theta\,n)^N = \cos N\theta + \sin N\theta\,n$，指数取 $\lfloor t/\theta\rfloor$ 的幂沿该子列趋于 $\cos t + \sin t\,a$，而 $H$ 是闭的，所以绕轴 $a$ 的整个圆 $\{\cos t + \sin t\,a\}$ 都在 $H$ 中。其三，$H$ 不交换，所以有元素不与这根轴交换（与轴交换的元素都落在 $1$ 与 $a$ 张成的平面内，彼此交换）；以读数阈值 $\frac{1}{2}$ 取一条从 $1$ 到该元素的链，其中某一步从与轴交换的元素走到不交换的元素，这一步的商 $g$ 不与轴交换且读数 $\kappa_{\mathbb{H}}(1, g) > \frac{1}{2}$，用 $g$ 共轭这根轴，得到既不是 $a$ 也不是 $-a$ 的第二根轴；再用一根轴上的圆去共轭另一根轴，能达到的轴越来越多，最终每个单位纯虚四元数都是轴。每个单位四元数都是某根轴上的 $\cos t + \sin t\,n$，故 $H = \mathrm{Sp}(1)$。

第 2 款：取 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 5 款的单射，左乘 $u(o)^{-1}$ 归一化，使 $o$ 映到 $1$；左乘单位四元数保持实内积，所以迁移与读数仍被保持。像集 $H$ 是子群：$[x, o, y]$ 映到两像之积，$[o, x, o]$ 映到像的逆。在单位四元数上 $\kappa_{\mathbb{H}}(p, q) = 1 - \frac{\lVert p - q\rVert^2}{4}$，所以 $H$ 中在 $\mathbb{H}$ 里收敛的序列，其原像的读数一致趋于 $1$；读数完备给出 $M$ 中一点，其像正是该序列的极限，故 $H$ 是闭的。$M$ 中的链映为 $H$ 中的链；由 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 1 款，以 $o$ 为基点的群中有不交换的两点，它们映为不交换的两个像。于是第 1 款给出 $H = \mathrm{Sp}(1)$，归一化后的单射也是满射。完整证明由 Lean 内核检查。
:::

秩路线到此不经过李代数。流形表述下的经典路线（§39.1.3 第一步）则要用 $\operatorname{Ad}$ 不变正定内积淘汰低维非交换李代数，其中纯代数的一步由下面这条定理内核检查；它只服务于经典路线，秩路线不需要它。

::: {.theorem #thm-ch39-axiom-omega-invariant-form-low-dimension title="带不变型的低维李代数" lean="D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.isLieAbelian_of_finrank_le_two,D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.exists_basis_bracket_eq_smul_cross"}
设 $L$ 为域 $K$ 上的李代数，$\Phi : L \times L \to K$ 为双线性型（不假设对称）。称 $\Phi$ **不变**，若对一切 $x, y, z \in L$ 有 $\Phi([x, y], z) = -\Phi(y, [x, z])$；称 $\Phi$ **左可分**，若对 $x \in L$，由 $\Phi(x, y) = 0$ 对一切 $y \in L$ 成立可推出 $x = 0$。对 $L$ 的一组基 $b_0, b_1, b_2$ 与 $v \in L$，记 $v_b \in K^3$ 为 $v$ 在这组基下的坐标。

1. （[`isLieAbelian_of_finrank_le_two`](lean:D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.isLieAbelian_of_finrank_le_two)）若 $L$ 有限维，$\dim_K L \le 2$，且 $\Phi$ 不变、左可分，则 $L$ 交换：对一切 $x, y \in L$ 有 $[x, y] = 0$。
2. （[`exists_basis_bracket_eq_smul_cross`](lean:D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.exists_basis_bracket_eq_smul_cross)）设 $K = \mathbb{R}$，$\dim_{\mathbb{R}} L = 3$，$L$ 不交换，$\Phi$ 不变，且对一切 $x \in L$，$x \neq 0$，有 $\Phi(x, x) > 0$。则存在 $L$ 的基 $b_0, b_1, b_2$ 与实数 $c > 0$，使对一切 $i, j \in \{0, 1, 2\}$ 有 $\Phi(b_i, b_j) = \delta_{ij}$，且对一切 $x, y \in L$ 有 $[x, y]_b = c\,(x_b \times y_b)$，其中 $\times$ 为 $\mathbb{R}^3$ 上的叉积。
:::

::: proof
两款都从同一个观察出发：对不变型，括号 $[x, y]$ 与 $x$、$y$ 在 $\Phi$ 的两个槽位上都正交。由不变性与 $[x, x] = 0$，$\Phi([x, y], x) = -\Phi(y, [x, x]) = 0$，$\Phi(x, [x, y]) = -\Phi([x, x], y) = 0$；再用 $[x, y] = -[y, x]$，$\Phi([x, y], y) = \Phi(x, [y, y]) = 0$，$\Phi(y, [x, y]) = -\Phi([x, y], y) = 0$。

第 1 款：设有 $x, y$ 使 $[x, y] \neq 0$。则 $x \neq 0$，且 $x, y$ 线性无关：若 $s x + t y = 0$，与 $x$ 取括号得 $t\,[x, y] = 0$，故 $t = 0$，再由 $s x = 0$ 得 $s = 0$。维数至多二，所以 $x, y$ 张成 $L$。线性泛函 $\Phi([x, y], \cdot)$ 在 $x$ 与 $y$ 上为零，从而在 $L$ 上恒为零，左可分给出 $[x, y] = 0$，矛盾。

第 2 款：取 $x, y$ 使 $[x, y] \neq 0$，则 $x \neq 0$；又由不变性 $\Phi([x, [x, y]], y) = -\Phi([x, y], [x, y]) < 0$，故 $[x, [x, y]] \neq 0$。于是 $x$、$[x, y]$、$[x, [x, y]]$ 都非零，且由上面的观察两两在两个槽位上正交。把 $x$ 与 $[x, y]$ 按 $\Phi$ 正倍数归一化为 $e_1, e_2$；$[e_1, e_2]$ 是 $[x, [x, y]]$ 的正倍数，把它归一化为 $e_3$，得 $[e_1, e_2] = c\,e_3$，$c > 0$。三个两两正交的单位向量线性无关，在维数三时构成基（即定理中的 $b_0, b_1, b_2$），任一向量的第 $k$ 个坐标就是它与 $e_k$ 的 $\Phi$ 值。由不变性，$\Phi([e_2, e_3], e_1) = -\Phi(e_3, [e_2, e_1]) = c\,\Phi(e_3, e_3) = c$，而 $[e_2, e_3]$ 与 $e_2$、$e_3$ 正交，故 $[e_2, e_3] = c\,e_1$；同理 $\Phi([e_3, e_1], e_2) = -\Phi(e_1, [e_3, e_2]) = c$，得 $[e_3, e_1] = c\,e_2$。连同反对称，基向量之间的全部括号恰是 $c$ 乘以叉积的结构常数，两边对 $x, y$ 都是双线性的，在基上相等即处处相等。完整证明由 Lean 内核检查。
:::

§39.1.3 第二步保留的彼得—外尔选核是经典解释，其中有两处可以交给内核：特征标核的秩如何计数，以及紧群是否有足够多的有限维酉表示。下面两条定理只服务于这一经典解释，秩路线不需要它们。

::: {.theorem #thm-ch39-axiom-omega-character-kernel-rank title="特征标核的秩" lean="D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel"}
设 $k$ 为代数闭域，$G$ 为群（不假设有限，也不带拓扑），$\iota$ 为有限指标集。对每个 $i \in \iota$，设 $W_i$ 为有限维 $k$-线性空间，$\rho_i$ 为 $G$ 在 $W_i$ 上的表示（群同态 $G \to \mathrm{GL}(W_i)$），其特征标为 $\chi_i(g) := \operatorname{tr}\rho_i(g)$；设 $c_i \in k$。假设：

1. 每个 $\rho_i$ 不可约：$W_i \neq 0$，且 $W_i$ 中在一切 $\rho_i(g)$ 下不变的子空间只有 $0$ 与 $W_i$；
2. 两两不等价：对 $i \neq j$，不存在线性同构 $\varphi : W_i \to W_j$ 使 $\varphi \circ \rho_i(g) = \rho_j(g) \circ \varphi$ 对一切 $g \in G$ 成立；
3. 对一切 $i \in \iota$，$c_i \neq 0$。

则函数族 $\{\, x \mapsto \sum_{i \in \iota} c_i\,\chi_i(x y^{-1}) \;:\; y \in G \,\}$ 在 $G$ 上全体 $k$ 值函数构成的空间中张成的 $k$-子空间，维数等于 $\sum_{i \in \iota} (\dim_k W_i)^2$。
:::

::: proof
把每个 $W_i$ 看作群代数 $k[G]$ 上的模，取乘积模 $\prod_i W_i$。设 $\phi$ 是它的 $k[G]$-模自同态。由舒尔引理（这里用到 $k$ 代数闭），$\phi$ 从第 $i$ 个因子到自身的分量是标量 $a_i$；不可约表示之间的非零交结映射是同构，而两两不等价排除了同构，所以 $\phi$ 从第 $j$ 个因子到第 $i$ 个因子（$i \neq j$）的分量为零。于是 $\phi$ 在每个因子上作用为标量，任意 $(A_i)_i \in \prod_i \operatorname{End}_k(W_i)$ 都与 $\phi$ 交换。乘积模在其自同态环上有限生成，雅各布森稠密定理给出：每个 $(A_i)_i$ 都是群代数中某个元素的作用，从而算子族 $\{(\rho_i(g))_i : g \in G\}$ 张成 $\prod_i \operatorname{End}_k(W_i)$（多个表示情形的伯恩赛德定理）。

定义线性映射 $\Phi : \prod_i \operatorname{End}_k(W_i) \to k^G$，$\Phi(A)(x) := \sum_i c_i \operatorname{tr}\bigl(\rho_i(x) A_i\bigr)$。由 $\chi_i(x y^{-1}) = \operatorname{tr}\bigl(\rho_i(x)\rho_i(y^{-1})\bigr)$，题中以 $y$ 为参数的函数正是 $\Phi\bigl((\rho_i(y^{-1}))_i\bigr)$；$y \mapsto y^{-1}$ 是 $G$ 上的双射，所以这些函数张成的空间就是 $\Phi$ 的像。若 $\Phi(A) = 0$，则加权迹配对 $(B, A) \mapsto \sum_i c_i \operatorname{tr}(B_i A_i)$ 在张成全空间的诸 $B = (\rho_i(x))_i$ 上为零，从而对一切 $B$ 为零；取 $B$ 只在第 $j$ 个分量非零、且为秩一算子 $w \mapsto \psi(w)\,v$，配对值为 $c_j\,\psi(A_j v)$，权重非零给出 $A_j = 0$。所以 $\Phi$ 单射，像的维数等于 $\dim_k \prod_i \operatorname{End}_k(W_i) = \sum_i (\dim_k W_i)^2$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch39-axiom-omega-compact-group-unitary-kernel title="紧群的有限维酉表示的核可任意小" lean="D5/S3/Quantum/Analysis/CompactGroups/UnitaryRepresentationKernel.exists_unitaryRep_ker_subset,D5/S3/Quantum/Analysis/CompactGroups/ContinuousKernelCompact.exists_isCompactOperator_kernel"}
1. （[`exists_isCompactOperator_kernel`](lean:D5/S3/Quantum/Analysis/CompactGroups/ContinuousKernelCompact.exists_isCompactOperator_kernel)）设 $X$、$Y$ 为紧拓扑空间，$Y$ 上的可测结构包含全部开集，$\mu$ 为 $Y$ 上的有限测度；设标量域 $\mathbb{K}$ 为 $\mathbb{R}$ 或 $\mathbb{C}$（Lean 中为 `RCLike` 域），$p \in [1, \infty]$，$K : X \times Y \to \mathbb{K}$ 连续。记 $C(X)$ 为 $X$ 上 $\mathbb{K}$ 值连续函数的空间，取上确界范数。则存在连续线性映射 $T : L^p(\mu) \to C(X)$，它是紧算子（$0$ 的某个邻域的像含于一个紧集），且对一切 $f \in L^p(\mu)$ 与 $x \in X$ 有 $(Tf)(x) = \int_Y K(x, y)\,f(y)\,d\mu(y)$。
2. （[`exists_unitaryRep_ker_subset`](lean:D5/S3/Quantum/Analysis/CompactGroups/UnitaryRepresentationKernel.exists_unitaryRep_ker_subset)）设 $G$ 为紧拓扑群（不假设任何分离公理），$U \subseteq G$ 为单位元的邻域。则存在自然数 $n$ 与连续群同态 $\rho : G \to \mathrm{U}(n)$（$\mathrm{U}(n)$ 为 $n \times n$ 复酉矩阵群），使对一切 $g \in G$，由 $\rho(g) = I_n$ 可推出 $g \in U$。
:::

::: proof
第 1 款：$\mu$ 有限，所以每个 $f \in L^p(\mu)$ 可积，且 $\int_Y \lvert f\rvert\,d\mu \le C\,\lVert f\rVert_p$，其中 $C = \mu(Y)^{1 - 1/p}$。于是 $\lvert (Tf)(x)\rvert \le \lVert K\rVert_\infty\,C\,\lVert f\rVert_p$，且 $\lvert (Tf)(x) - (Tf)(x')\rvert \le \sup_{y} \lvert K(x, y) - K(x', y)\rvert \cdot C\,\lVert f\rVert_p$。$K$ 连续而 $Y$ 紧，$x \mapsto K(x, \cdot)$ 是从 $X$ 到 $Y$ 上连续函数空间（上确界范数）的连续映射，所以 $Tf$ 连续，$T$ 是有界线性映射；单位球的像一致有界且等度连续，阿尔泽拉—阿斯科利定理给出其闭包紧。

第 2 款：取哈尔测度 $\mu$ 与 $L^2(\mu)$ 上的左正则表示 $(\pi(g)f)(x) = f(g^{-1}x)$，它保持范数且强连续。取单位元的邻域 $V$，使 $v w^{-1}$（$v, w \in V$）都落在 $U$ 的内部，再取连续实函数 $\varphi$，$\varphi(1) = 1$，在 $V$ 外为零，于是 $\int \varphi^2\,d\mu > 0$。以 $\varphi(x^{-1}y)$ 为核的积分算子由第 1 款是从 $L^2(\mu)$ 到 $C(G)$ 的紧算子，再并入 $L^2(\mu)$ 得紧算子 $T$，它与每个 $\pi(g)$ 交换。连续函数 $T\varphi$ 在 $1$ 处取值 $\int \varphi^2\,d\mu \neq 0$，而对 $U$ 的内部之外的 $g$，它在 $g$ 处取值 $0$，所以 $\pi(g)$ 移动 $T\varphi$。$S = T T^\dagger$ 是紧自伴算子，也与每个 $\pi(g)$ 交换。由谱定理，$S$ 的特征空间张成稠密子空间，所以保持 $S$ 的每个非零特征值特征空间逐点不动的连续算子，保持 $S$ 的值域的闭包逐点不动，而这个闭包包含 $T$ 的值域。于是对 $U$ 的内部之外的每个 $c$，有一个非零特征值的特征空间——它有限维且在平移下不变——含有被 $\pi(c)$ 移动的向量，由强连续性，该向量也被 $c$ 某个邻域里的每个元素移动。$U$ 的内部的补集是紧集，有限个这样的特征空间就够；它们的和 $W$ 有限维且在平移下不变，$\pi$ 在 $W$ 的一组正交归一基下的矩阵就是所求的连续酉表示 $\rho$：若 $\rho(g) = I_n$，则 $\pi(g)$ 保持 $W$ 逐点不动，$g$ 不在上述任一邻域中，故 $g \in U$。第 2 款是彼得—外尔定理的分离形式，不是完整的彼得—外尔定理：矩阵系数的稠密性、$L^2(\mu)$ 按不可约表示的分解与正定类函数的特征标展开都不在本定理之内。完整证明由 Lean 内核检查。
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

1. **三元流群极小三公理系与希尔伯特第五问题光滑化**：无单位元三元流群由 H. Prüfer（1924）与 R. Baer（1929）创立，本节法则 (I) 采用的无反序外结合三等式极小公理系由 J. Certaine（*Bull. Amer. Math. Soc.* **49**, 869–877, 1943）证明与群结构在选定任意基点后一一等价（其基点群还原现已由 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 1 款内核检查）；局部欧氏拓扑群无需光滑性预设即唯一具有实解析李群结构的定理由 D. Montgomery & L. Zippin（*Topological Transformation Groups*, Interscience, 1955）证出，只在流形表述下的经典路线中使用；
2. **双不变正定度规李群分类与正定球面核**：紧致半单李群与嘉当三形式 $\eta$ 的几何分类见 É. Cartan（*Ann. Mat. Pura Appl.* **4**, 209–256, 1927，DOI `10.1007/BF02409989`）与 J. Milnor（*Adv. Math.* **21**, 293–329, 1976，Lemma 7.5 证明具 $\operatorname{Ad}$-不变正定内积的李代数必正交分解为交换中心与紧单李代数直和，直接排除 $H_3(\mathbb{R})$ 与 $\mathfrak{sl}(2, \mathbb{R})$），其中本章用到的维数至多三的情形已由 [@thm-ch39-axiom-omega-invariant-form-low-dimension] 内核检查，一般维数的分解仍是文献结果；紧群正定类函数的不可约特征标展开见 F. Peter & H. Weyl（*Math. Ann.* **97**, 737–755, 1927）与 I. J. Schoenberg（*Duke Math. J.* **9**, 96–108, 1942），其中分离形式与特征标核的秩计数已由 [@thm-ch39-axiom-omega-compact-group-unitary-kernel]、[@thm-ch39-axiom-omega-character-kernel-rank] 内核检查，完备性与正定类函数的展开仍是文献结果。这些分类与展开只服务于流形表述下的经典路线；母公理下的极小特征秩 $5$ 与同构由 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 3–5 款与 [@thm-ch39-axiom-omega-complete-rank-five-isomorphism] 第 2 款内核检查；
3. **与[附录 E](appendix-e.md) 三层比较签名的严密衔接**：$\mathrm{AXIOM}\text{-}\Omega$ 以经 `H1` 外延商化的集合为载体，以链连通表达载体连通，以读数完备表达 `H3` 柯西完备化（取弦距 $d_\kappa$，见 [@rem-ch39-axiom-omega-formalization-bridge] 第 4 条），不预设流形、拓扑或可微性；并在法则 (II) 中纳入 $\kappa(x, y) = 1 \iff x = y$、触零下确界 $\inf\kappa = 0$（同构所得 $S^3(1)$ 的紧致性保证最小值必被取到，母核 $\kappa_{S^3} = \cos^2\frac{d_{S^3}}{2}$ 将该唯一零点精确锁定在对跖点 $d_{S^3} = \pi$）与任意阶 $\mathbf{G}_n \succeq 0$（`H2`），从而在无原点载体上内建了附录 E 的 **Layer 1 正定几何刚性**（合法越过 [@ex-appe-layer0-countermodels] 的四个第 0 层有限反例），而跨节点多场耦合、连续统路径积分测度与超限基数边界仍严格遵守附录 E 的 `T1–T4` 与 `H4–H9` 台账。
:::

::: {.remark #rem-ch39-axiom-omega-formalization-bridge title="母公理与流形表述的对应"}
**对应与分层。** §39.1.2 的母公理与 [@def-ch39-axiom-omega-ternary-comparison-closure] 的各条款，逐条就是 [@def-ch39-ternary-comparison-structure] 的公理与谓词，二者之间只有两处换写：法则 (II) 的 $\mathbf{G}_n \succeq 0$ 即格拉姆二次型非负（实对称矩阵半正定当且仅当其二次型非负，$n = 0$ 的情形平凡）；因 $\kappa \ge 0$，$\inf\kappa = 0$ 即触零。以下逐条说明本节先前的流形表述（§39.1.2 末）与母公理的关系，以及每一步的地位。

1. **两种表述共有的条款（直接对应）。** 法则 (I) 的三条恒等式，法则 (II) 的对称、外延分离 $\kappa(x, y) = 1 \iff x = y$（即 `H1` 外延商化的结果）、读数非负、双侧迁移不变、格拉姆半正定与触零，以及法则 (III) 的次序敏感 $\exists\, x, y, z,\; [x, y, z] \neq [z, y, x]$，在两种表述中相同。流形表述把读数写成取值于 $[0, 1]$；上界不必单列，对两点 $x, y$ 取系数 $(1, -1)$，格拉姆二次型给出 $2 - 2\kappa(x, y) \ge 0$。
2. **特征秩与 $\operatorname{rank}\mathcal{H}_\kappa$ 相当（`手工推导` 加 `LEAN ✓`）。** 流形表述的 $\operatorname{rank}\mathcal{H}_\kappa = \dim_{\mathbb{R}}\mathcal{H}_\kappa$ 等于有限格拉姆矩阵秩的上确界，因为 $\mathcal{H}_\kappa$ 由核函数 $\kappa(x, \cdot)$ 张成并完备化、核函数之间的内积就是读数（`手工推导`）；配合 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 2 款（`LEAN ✓`），$\operatorname{rank}\mathcal{H}_\kappa \le r$ 当且仅当读数可在 $\mathbb{R}^r$ 中实现，所以 $\operatorname{rank}\mathcal{H}_\kappa$ 就是特征秩，二者同时为有限或同时为 $\infty$。
3. **载体连通、$\kappa$ 连续 $\Rightarrow$ 链连通（`手工推导`）。** 固定 $\varepsilon > 0$ 与 $x \in \mathcal{M}$，令 $A$ 为从 $x$ 出发、经相邻读数都大于 $1 - \varepsilon$ 的有限链能到达的点集。若 $a \in A$，由 $\kappa(a, \cdot)$ 连续与 $\kappa(a, a) = 1$，$a$ 的某个邻域里的点都能再走一步到达，故 $A$ 是开集；若 $b \notin A$，$b$ 的某个邻域里的点 $c$ 都满足 $\kappa(c, b) > 1 - \varepsilon$，其中若有一点在 $A$ 中则 $b$ 也在 $A$ 中，故该邻域与 $A$ 不交，$A$ 的补集也是开集。$A$ 含 $x$，载体连通，所以 $A = \mathcal{M}$。这里只用到 $\kappa$ 对每个变元连续（$C^2$ 已蕴含）与 $\kappa(a, a) = 1$；[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 3 款中单位四元数模型的链连通，在 Lean 中正是这样由三维球面的连通性证出的。母公理不谈拓扑，直接以链连通代替“载体连通”。
4. **`H3` 柯西度量完备取弦距时即读数完备（`手工推导`）。** [附录 E](appendix-e.md) 的 `H3` 含平行四边形极化与柯西度量完备化两项（[§E.7](appendix-e-s07-intermediate-hypotheses-audit.md) 总表），与读数完备有关的只是后一项。取由读数本身定义的弦距 $d_\kappa(x, y) := \sqrt{2 - 2c(x, y)} = 2\sqrt{1 - \kappa(x, y)}$（$c = 2\kappa - 1$ 为 [@rem-ch39-axiom-omega-round-trip-closing-law] 中的相关度；与附录 E [@ex-appe-layer0-countermodels] 第 4 款和 [@rem-appe-gram-from-flatness] 第 2 款中的弦距同形），则 $d_\kappa(x, y)$ 是读数的再生核希尔伯特空间中核函数 $\kappa(x, \cdot)$ 与 $\kappa(y, \cdot)$ 之间距离的 $\sqrt{2}$ 倍（该距离的平方为 $2 - 2\kappa(x, y)$），由外延分离知它是度量，在单位四元数模型上恰为 $\mathbb{R}^4$ 中的弦长 $\lVert x - y\rVert$；而 $\kappa(x_m, x_n) > 1 - \varepsilon$ 即 $d_\kappa(x_m, x_n) < 2\sqrt{\varepsilon}$，所以读数完备与“$(\mathcal{M}, d_\kappa)$ 是完备度量空间”逐字等价。若流形表述的完备化改用与读数无关的度量（例如流形上另给的距离），两种完备性一般不是同一条件，需另证二者的柯西列与极限相同。§39.1.2 的有理点子群 $S^3(\mathbb{Q})$ 正是缺这一条的例子：它满足 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 5 款的全部假设（有理点在 $S^3$ 中稠密，给出链连通），却不读数完备（`手工推导`）。
5. **字典序极小 $\Rightarrow$ 特征秩为 $5$（`文献结果` 加 `手工推导`）。** 由 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 4 款，满足法则 (I)、(II) 且非交换、链连通的结构都有特征秩 $\ge 5$；由第 3、4 款，单位四元数模型的特征秩恰为 $5$：这两点是 `LEAN ✓`。但流形表述的法则 (III) 先比维数后比秩，字典序极小者是在 $\dim\mathcal{M} = d_{\min}$ 的候选中取秩最小者；要断言它的秩恰为 $5$，还须知道 $d_{\min} = 3$，使维数为 $3$ 的单位四元数模型进入这一候选类。这就要排除维数 $1$、$2$ 的连通流形上满足法则 (I)–(II) 的一切非交换结构，其中也包括读数特征秩为 $\infty$、因而在秩上无从比较的候选；§39.1.3 的经典路线由蒙哥马利—齐平定理得到李群结构，再用 $\operatorname{Ad}$ 不变正定内积淘汰低维非交换李代数，这一论证不涉及秩，所以把无穷秩候选一并排除。其中李代数一步——维数一、二的李代数带不变正定型必交换，维数三的非交换者括号是叉积的正倍数——现由 [@thm-ch39-axiom-omega-invariant-form-low-dimension] 第 1、2 款内核检查（`LEAN ✓`）；仍属 `文献结果` 加 `手工推导` 的是：流形上的拓扑群自动是李群（蒙哥马利—齐平定理），从群过渡到带不变正定型的李代数（海森形式的 $\operatorname{Ad}$ 不变性与李群—李代数对应），以及对无穷秩候选的覆盖。所以这一步整体仍是 `文献结果` 加 `手工推导`。有了 $d_{\min} = 3$，候选类中秩的最小值为 $5$。
6. **流形表述 $\Rightarrow$ 母公理。** 满足流形表述的结构，由第 1 条满足共有条款，由第 3 条链连通，由第 4 条（完备化取弦距时）读数完备，由第 5 条特征秩为 $5$，而 $5$ 正是母公理法则 (III) 所求的最小值（第 4 款与第 3 款，`LEAN ✓`），所以它满足母公理，从而由 [@thm-ch39-axiom-omega-complete-rank-five-isomorphism] 第 2 款同构于单位四元数模型。这一方向的分层取决于第 3–5 条中最弱的一环，即 `文献结果` 加 `手工推导`。
7. **母公理 $\Rightarrow$ 流形表述。** 满足母公理的结构经 [@thm-ch39-axiom-omega-complete-rank-five-isomorphism] 第 2 款的双射同构于单位四元数模型（`LEAN ✓`）。单位四元数模型满足流形表述的各条款：$S^3(1)$ 是连通单连通的三维流形，迁移 $x y^{-1} z$ 连续，$\kappa = \frac{1 + \langle x, y\rangle}{2}$ 光滑且单槽二阶海森为 $-\frac{1}{2}$ 倍单位形式，严格负定非退化，$S^3$ 紧致故在弦距下完备（`手工推导`）；其中“$(\dim\mathcal{M}, \operatorname{rank}\mathcal{H}_\kappa) = (3, 5)$ 字典序极小”同样依赖第 5 条的 $d_{\min} = 3$（`文献结果` 加 `手工推导`）。经双射把这些结构搬到 $\mathcal{M}$ 上是 `手工推导`；由于双射保持读数，搬来的拓扑就是弦距 $d_\kappa$ 的度量拓扑。双射在何种意义下唯一，未形式化。
8. **不再作为假设的条款。** 有限维流形、单连通、$C^2$ 正则性、单槽二阶海森非退化与迁移的连续性，都不出现在 [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 与 [@thm-ch39-axiom-omega-complete-rank-five-isomorphism] 的假设中，也不出现在母公理中；在母公理之下它们是第 7 条所述的推论。
:::

::: {.remark #rem-ch39-axiom-omega-round-trip-closing-law title="法则 (III) 的单结构形式：往返律与达朗贝尔函数方程"}
**往返律（`手工推导`）。** 记反射 $s_x(w) := [x, w, x]$。在 $S^3(1)$ 上 $s_x(w) = 2\langle x, w\rangle x - w$，故 $\langle w, s_x(w)\rangle = 2\langle x, w\rangle^2 - 1$，母核 $\kappa_{S^3}$ 因而满足

$$
\kappa\bigl(w,\, [x, w, x]\bigr) \;=\; \bigl(2\kappa(w, x) - 1\bigr)^2 \qquad (\forall\, w, x \in \mathcal{M}).
$$

法则 (III) 的极小特征秩（流形表述中的“极小维数、极小秩”）是在一整类结构中取极小；上式是单个结构自身的性质，可以代替它充当闭合律。在流形表述的载体上，于法则 (I) 与法则 (II) 的对称、外延分离 $\kappa(x, y) = 1 \iff x = y$ 及双侧迁移不变条款之上（$\kappa$ 只需连续；该表述的 $C^2$ 正则条款可以去掉，$\kappa$ 的实解析性由群结构自动推出），再要求每点 $x$ 恰有一个触零点 $x^\perp$（$\kappa(x, x^\perp) = 0$），则满足往返律的结构在同构意义下恰有两个：单位圆 $S^1$ 与单位三维球面 $S^3$，二者都取 $[x, y, z] = x y^{-1} z$ 与 $\kappa(x, y) = \lVert (x + y)/2\rVert^2$；其中迁移非交换者唯有 $S^3$，维数、紧致性与 $\kappa$ 的格拉姆半正定（秩 $\dim\mathcal{M} + 2$，在 $S^3$ 上即 $1 + 4 = 5$）都由此推出。加上法则 (III) 的非交换条款（或流形表述的单连通载体条件），$S^1$ 出局，解唯有 $S^3(1)$ 与 $\kappa_{S^3}$。反过来，满足母公理的结构都满足往返律与下文的干涉律：秩五嵌入（[@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] 第 5 款，`LEAN ✓`）把它搬进单位四元数，那里 $x w^{-1} x = 2\langle x, w\rangle x - w$（`手工推导`）。证明要点：取定基点 $o$ 并令 $\varphi(g) := \kappa(o, g)$，往返律化为倍角式 $\varphi(g^2) = \bigl(2\varphi(g) - 1\bigr)^2$；沿任一单参数子群解得 $\varphi(\exp tX) = \cos^2\bigl(\lVert X\rVert t/\sqrt{2}\bigr)$，于是所有单参数子群走过同一长度后闭合，交换子代数至多一维，李代数只能是 $\mathbb{R}$ 或 $\mathfrak{su}(2)$。在实直线上，倍角式 $f(2t) = 2f(t)^2 - 1$ 有非余弦的连续解，余弦刻画要靠群结构；一维倍角式对余弦的刻画可能早有先例（M. Kuczma, *Ann. Polon. Math.* **16**, 53–57, 1964；A. N. Sharkovskii, *Aequationes Math.* **9**, 121–128, 1973），这一部分不作为新结果。

**达朗贝尔函数方程（`文献结果`）。** 令 $\psi := 2\varphi - 1$。两变量等式 $\psi(ab) + \psi(ab^{-1}) = 2\psi(a)\psi(b)$ 是群上的达朗贝尔函数方程；T. M. K. Davison（*Aequationes Math.* **76**, 33–53, 2008；*Publ. Math. Debrecen* **75**, 41–66, 2009）证明其非零连续解为 $\frac{1}{2}\operatorname{tr}\circ\rho$（$\rho : G \to \mathrm{SL}(2, \mathbb{C})$ 为连续同态），且承载忠实解的紧群嵌入 $\mathrm{SU}(2)$。以两变量形式（即下文的干涉律）为公理时，只需法则 (I) 与法则 (II) 的对称、外延分离与双侧迁移不变条款，唯一触零点与 $C^2$ 条款都不需要，解恰为 $S^1$ 与 $S^3$（`手工推导`，也可由上述文献得出）；往返律是它的对角情形 $a = b$。单变量的往返律本身排除不了 $\mathrm{SO}(3)$：在 $\mathrm{SO}(3)$ 上取 $\psi = \cos\alpha$（$\alpha$ 为转角），它忠实、光滑且满足倍角式，但对绕两根正交轴各转 $\pi/2$ 的 $a, b$ 有 $\psi(ab) + \psi(ab^{-1}) = -1 \ne 0 = 2\psi(a)\psi(b)$，相应的 $\kappa = \cos^2(\alpha/2)$ 在全部转角为 $\pi$ 的旋转上取零，触零点不唯一。所以唯一触零点这一条款不可省去。

**操作形式：两读数决定律（`手工推导`）。** 记相关度 $c := 2\kappa - 1$。在 $S^3(1)$ 上往返律与下面的干涉律同时成立：

$$
c\bigl(y,\, [x, w, x]\bigr) \;=\; 2\,c(w, x)\,c(y, x) \;-\; c(y, w) \qquad (\forall\, w, x, y \in \mathcal{M}).
$$

它的操作含义是：沿一条匀速迁移 $\dots, w, x, [x, w, x], \dots$ 观察任一检验点 $y$，$y$ 对下一点的读数由它对前两点的两个读数仿射决定。在法则 (I) 与法则 (II)（含唯一触零点条款）之下，“对每对 $w, x$ 存在只依赖于 $(w, x)$ 的实数 $a, b, d$，使 $\kappa(y, [x, w, x]) = a\,\kappa(y, x) + b\,\kappa(y, w) + d$ 对一切 $y$ 成立”与往返律等价，此时 $a = 2c(w, x)$、$b = -1$、$d = 1 - c(w, x)$，即上面的干涉律。唯一触零点条款在这里同样不可省：$S^3$ 上的 $\kappa'(x, y) = \frac{3}{4} + \frac{1}{4}\langle x, y\rangle$ 满足仿射决定律，却没有触零点，也不满足往返律。反过来，若对一切 $w, x, y$ 直接要求上面的干涉律，则唯一触零点与 $C^2$ 条款都不需要，只要 $\kappa$ 连续，解就恰为 $S^1$ 与 $S^3$（`手工推导`，见上段）。

**三种闭合律选出同一个李代数（`手工推导`）。** 在流形表述中，于法则 (I) 与法则 (II) 的对称、外延分离、双侧迁移不变及 $C^2$ 正则条款之下，对迁移非交换的结构，下列三条中的任一条都迫使李代数为 $\mathfrak{su}(2)$：往返律；§39.1.3 的极小维数（在格拉姆半正定且 $\inf\kappa = 0$ 的结构类中取极小；它与法则 (III) 的极小特征秩选出同一个模型）；比较完备性，即 $\kappa(x, y) = \kappa(x', y')$ 时总有一个保持 $\kappa$、保持或反转迁移的自同构把 $(x, y)$ 送到 $(x', y')$。
:::

::: {.remark #rem-ch39-axiom-omega-heap-rigidity title="流群的刚性：减弱结合律的反例、维数 1、2、4、8 与各球面上的解、穆方性与被排除的商"}
**减弱结合律推不出二结合性（`手工推导`）。** 只要求马尔采夫恒等式 $[x, x, z] = z$、$[x, z, z] = x$，并让第三条恒等式只在两个元素生成的子系统中成立，推不出 $x \cdot y := [x, o, y]$ 是二结合环，也推不出 $[x, y, z] = (x \cdot y^{-1}) \cdot z$。两个反例：(A) 法诺平面七个点上施泰纳拟群的马尔采夫项 $p(x, y, z) = y \circ (x \circ z)$（$x \circ x = x$，$x \circ y$ 是过 $x, y$ 的直线上的第三点），施泰纳拟群构成同余可置换簇（R. W. Quackenbush, *Canad. J. Math.* **28**, 1187–1198, 1976，`文献结果`）；(B) $S^3$ 上的 $[a, b, x] = a\bar{b}a\bar{b}x\bar{a}b$，它在大圆上就是标准流群并满足往返律，标准 $\kappa$ 在全部左迁移下不变，在右迁移下却不保持。

**维数与各球面上的解（`文献结果`：胡尔维茨定理的初等推论；归约为 `手工推导`）。** 在 $m$ 维欧氏空间的单位球面上取标准 $\kappa$。任何满足两条马尔采夫恒等式、且左右迁移都保 $\kappa$ 的映射 $T$（不假设连续）只在 $m \in \{1, 2, 4, 8\}$ 时存在，即只在 $S^0$、$S^1$、$S^3$、$S^7$ 上存在，并且这时往返律自动成立。归约：取定基点 $b$，左、右平移都是保 $\kappa$ 的等距，于是 $B_b(a, x) := \lvert a\rvert\lvert x\rvert\,T(\hat{a}, b, \hat{x})$ 是以 $b$ 为单位的保范双线性积，由胡尔维茨定理其维数只能是 $1, 2, 4, 8$。这与第三步中的拓扑陈述不同：那里用连续性与 Adams 定理，这里不用任何拓扑，代价是度量假设（圆球面、标准 $\kappa$、左右迁移都保 $\kappa$）。各球面上的解如下：

1. $S^0$：只有流群 $a\bar{b}x$。
2. $S^1$：只有 $a\bar{b}x$，不需要任何连续性假设。
3. $S^3$（刚性）：设 $T\colon (S^3)^3 \to S^3$ 连续，满足两条马尔采夫恒等式，且标准 $\kappa$ 在全部左迁移与全部右迁移下不变。则或者对一切 $a, b, x$ 有 $T(a, b, x) = a\bar{b}x$，或者对一切 $a, b, x$ 有 $T(a, b, x) = x\bar{b}a$（后者经 $x \mapsto \bar{x}$ 与前者同构）。归约：取定基点后，左、右平移都是保 $\kappa$ 的等距，于是给出 $\mathbb{R}^4$ 上以 $1$ 为双边单位的保范双线性积，由胡尔维茨定理（A. Hurwitz, *Nachr. Ges. Wiss. Göttingen*, 309–316, 1898）它与 $\mathbb{H}$ 的乘法或其反向乘法等距同构。连续性不可去掉：对任意集合 $E \subset S^3$，基点 $b \in E$ 时取 $a\bar{b}x$、否则取 $x\bar{b}a$，所得运算满足全部代数条件，却在 $E$ 的边界上不连续。
4. $S^7$（无穷族，`手工推导`）：在 $S^7$ 上，满足同样条件的连续运算恰为 $T(a, b, x) = b\,\mu_b(\bar{b}a, \bar{b}x)$，其中 $b \mapsto \mu_b$ 是 $S^7$ 到单位合成积空间 $\mathrm{O}(7)/G_2$ 的连续映射：它们构成一个无穷维族。恒等式 $T(x, y, z) = T\bigl(T(x, o, T(o, y, o)), o, z\bigr)$ 对某一个基点 $o$ 成立，等价于对一切基点成立；它在等距意义下选出八元数运算 $(a\bar{b})x$。

**穆方性是推论（`文献结果`：Mal'cev 1955 与 Kuz'min 1971 的推论）。** 连通的实解析二结合环，若其切代数是马尔采夫代数，则它是穆方环：在典范坐标中乘法由坎贝尔—豪斯多夫级数给出，该级数满足形式的穆方恒等式（E. N. Kuz'min, *Algebra i Logika* **10**, 3–22, 1971），再由解析延拓推广到整个环。所以第三步中弱结合情形的分类不需要穆方假设，需要的是解析性与二结合性；上面的反例 (A)、(B) 说明二结合性不能从减弱的结合律推出，须作为假设。

**被排除的 $\mathrm{SO}(3)$ 解（`手工推导`）。** 分类中被唯一触零点条款排除的情形，是 $S^3/\{\pm 1\} \cong \mathrm{SO}(3)$ 上的 $\kappa'([x], [w]) = c(x, w)^2$：它满足法则 (I)、法则 (II) 的其余条款与往返律，$\mathbb{R}^4$ 的一组正交基给出四个两两正交的类。唯一触零点条款恰好排除这一个商。
:::

::: {.example #ex-ch39-axiom-omega-dimension-sieve-and-gram-audit title="候选维数筛（d = 1 → 2 → 3 → 4/6/8）与三锚格拉姆正矢行列式精确有理数核验"}
我们对流形表述下的维数筛（母公理本身只比特征秩，不经过这一步，见 §39.1.2）与三点格拉姆正定判据做显式对账（`手工推导` / `NUM`）：

1. **候选维数与非紧歧路穷举筛查**：
   - **$d = 1$（单连通实线 $\mathbb{R}$，及非单连通圆周 $S^1$）**：一维切空间括号 $[\mathbf{e}_1, \mathbf{e}_1] = 0$，$[x, y, z] = x - y + z = [z, y, x]$ 恒交换，违反法则 (III)；
   - **$d = 2$（单连通平面 $\mathbb{R}^2$、非交换仿射群 $\mathrm{Aff}^+(1, \mathbb{R})$，及非单连通环面 $T^2$）**：在任意双不变正定内积下 $\langle[\mathbf{e}_1, \mathbf{e}_2], \mathbf{e}_{1,2}\rangle = 0 \implies [\mathbf{e}_1, \mathbf{e}_2] = \mathbf{0}$，单连通双不变模型坍缩为交换平面 $\mathbb{R}^2$，而非交换群 $\mathrm{Aff}^+(1, \mathbb{R})$ 无双不变正定度规，全部出局（李代数一步的一般形式见 [@thm-ch39-axiom-omega-invariant-form-low-dimension] 第 1 款，`LEAN ✓`）；
   - **$d = 3$（三元数原生场 $\mathbb{T}_3 \cong S^3(1)$ 唯一胜出）**：淘汰无双不变正定度规的海森堡群 $H_3(\mathbb{R})$、三维非交换可解群与 $\widetilde{\mathrm{SL}}(2, \mathbb{R})$ 后，唯一三维非交换单连通双不变流形为 $S^3(1)$（李代数一步的一般形式见 [@thm-ch39-axiom-omega-invariant-form-low-dimension] 第 2 款，`LEAN ✓`），满足 $[\mathbf{e}_1, \mathbf{e}_2] = 2\mathbf{e}_3 \neq \mathbf{0}$、$[x, y, z] \neq [z, y, x]$、极小忠实格拉姆秩 $1 + 4 = 5$、$d\eta \equiv 0$ 且 $\partial S^3 = \emptyset$；
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
