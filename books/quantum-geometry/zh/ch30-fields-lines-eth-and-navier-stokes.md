# 场（$P$）与线（$NP$）：从指数时间假设（ETH）到纳维—斯托克斯涡丝

> *“全局静态时间场P=NP, 但有限观察者P!=NP。P是场, NP是线——求场难如登天，顺线一步看穿；而把纳维—斯托克斯与 P/NP 问题都场化的话，它们在正交几何底层追问的本就是同一件事。”*

在[第 29 章](ch29-timeless-causality-and-gram-space.md)中，我们看到全局时间场是一座无时间的几何晶体（对照第 29 章无时间文献注记 [@rem-ch29-wheeler-dewitt-page-wootters-literature]），而场内的有限观察者只能在格拉姆椭圆体（$\det G \ge 0$）中一步步选点前行。现在，让我们将这一“球外静态场 vs. 球内有限观察者”的双重视角推向当代数学与理论物理最壮阔的交汇处——把计算复杂性理论中的 **$\mathrm{P}$ vs. $\mathrm{NP}$ 问题**、**指数时间假设（ETH）及其 2026 年 10 月张量网络秩约分亚指数前沿文献（[@rem-ch30-eth-subexponential-literature]）**，以及流体力学中的 **无外力三维纳维—斯托克斯（Navier–Stokes）全局正则性开放猜想（[@conj-coda-navier-stokes-regularity]）与受迫情形文献进展（[@rem-ch30-navier-stokes-forced-literature]）** 放进同一张克利福德正交场论画布中。

---

## 全局静态时间场 $P = NP$ vs. 场内有限观察者 $P \neq NP$——正交视界与生命旅程的防火墙 {#sec-coda-global-p-eq-np-local-p-ne-np}

> **作者原话**：“全局静态时间场P=NP, 但有限观察者P!=NP”

把上面关于无时间几何晶体与有限观察者选点的洞察推向计算复杂度的终极前沿，我们立刻获得了审视千禧年大奖难题 **$\mathrm{P}$ vs. $\mathrm{NP}$**（标准统一图灵机模型下 $\mathrm{P} \neq \mathrm{NP}$ 仍是未决开放猜想，参见第 20 章 [@conj-p-neq-np]，`OPEN`）的全新双重视角：为什么在假想地移除顺序时间约束的“全局静态时间场”模型（`MODEL`）中，满足条件的不动点呈现出类似 $P = NP$ 的零步合一（对应复杂性文献中的后选择与闭合类时曲线坍缩注记 [@rem-ch30-postselection-ctc-literature]），而对受限于有限门数与局部记忆的场内观察者，却在黑盒查询与有界阶半正定松弛模型下筑起了指数级正交高墙（[@rem-ch30-query-sos-literature]）？

### 1. 为什么在“全局静态时间场”（后选择 / 无时间不动点模型）中呈现 $P = NP$ 式的坍缩？

在一个包含 $n$ 个布尔变量、$m$ 条子句约束的组合判定问题中，每一条局部约束子句 $C_j$ 都在希尔伯特空间中切出一片满足该子句的子空间超平面 $H_j$。站在无时间全局静态场（对照 [@rem-ch29-wheeler-dewitt-page-wootters-literature]）的几何模型视角上，全局解空间就是所有子句超平面的静态几何交集：

$$
\mathbf{S}^* = \bigcap_{j=1}^m H_j.
$$

在这一理想化静态场模型（`MODEL`）中，若将违背子句的配置配对为正反双向量手性相消（$+\mathbf{\Omega} - \mathbf{\Omega} = 0$），则全局自洽解 $\psi = \psi(\psi)$ 作为静态几何交集直接存在（注：这并不意味着在标准统一图灵机模型中 $\mathrm{P} = \mathrm{NP}$ 或可以在零步内完成物理计算）。假想移除顺序演化约束时的复杂度类坍缩由以下外部文献结果刻画：

::: {.remark #rem-ch30-postselection-ctc-literature title="后选择与闭合类时曲线复杂度坍缩定理的形式化边界说明"}
**文献结果，未在本书形式化。** 计算复杂性理论中关于移除顺序时间演化限制的两条经典坍缩定理均属外部文献结论，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **阿伦森（Scott Aaronson, *Proc. R. Soc. A* **461**, 3473–3482, 2005）后选择定理**：若允许非物理地直接投影并后选择（Postselection）指数小非零振幅分支，则后选择多项式时间量子计算等于概率多项式类 $\mathrm{PP}$（从而包含 $\mathrm{NP} \cup \mathrm{BQP}$，且结合 Toda 定理有 $\mathrm{PH} \subseteq \mathrm{P}^{\mathrm{PP}}$）：

   $$
   \mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP};
   $$

2. **闭合类时曲线（CTC）自洽不动点定理（S. Aaronson & J. Watrous, *Proc. R. Soc. A* **465**, 631–647, 2009）**：若消去先后时间流、强制系统直接满足 Deutsch 无时间自洽不动点方程 $\psi = \Phi(\psi)$，则假想的 CTC 辅助经典与量子多项式时间同时坍缩至多项式空间：

   $$
   \mathrm{P}_{\mathrm{CTC}} = \mathrm{BQP}_{\mathrm{CTC}} = \mathrm{PSPACE} \supseteq \mathrm{NP}.
   $$
:::

### 2. 为什么对场内的有限观察者而言，面临 $P \neq NP$ 式的正交视界与局部盲区？

然而，一旦回到真实的场内有限观察者——不能预知终局来做后选择、只能手握有限量子门计数 $L$ 与有限局部记忆阶数 $M \ll n$ 在单位球面上一步步旋转寻址——其搜寻几何在两类受限观测模型中呈现出鲜明的正交视界与局部盲区（`MODEL`）：

- **第一道几何视界（$90^\circ$ 高维正交赤道与一致算子旋转弧长）**：
  在 $N = 2^n$ 维状态球面上，均匀初始态 $\mathbf{P}_0$ 与单个隐藏目标态 $\mathbf{S}^*$ 之间的初始内积投影仅为

  $$
  \mathbf{P}_0 \cdot \mathbf{S}^* = \cos\theta_0 = 2^{-n/2} \implies \theta_0 \approx \frac{\pi}{2} - 2^{-n/2}.
  $$

  这意味着在大维数极限下，未知目标 $\mathbf{S}^*$ 几乎严格躲在观察者视线 $90^\circ$（$\pi/2$）的**正交赤道盲区**上！受幺正范数守恒 $\cos^2\theta + \sin^2\theta = 1$ 与第 15 章经 Lean 4 验证的**一致算子旋转定理**（[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)）制约，单次相干放大算子只能在二维不变平面上转动固定小角 $2\alpha \approx 2\cdot 2^{-n/2}$ 弧度。
- **第二道几何盲区（从二元链 $\mathbf{e}_i\wedge\mathbf{e}_j$ 到三元面片 $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ 的局部 Gram 相容错觉）**：
  在几何模型（`MODEL`）上，每条子句仅含两个文字的二元蕴含约束 $\mathbf{e}_i\wedge\mathbf{e}_j$ 构成**一维有向链**，局部传递步步可追；而三元子句 $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ 则如同拼接二维闭合球面的**三角面片**——仅凭 $M \ll n$ 阶局部内积记忆向外张望时，四周局部块可以处处相容，却把奇偶阻挫死结藏在全局闭合回路之中。

对应于上述两道几何图像的严格复杂度模型下界属于外部经典文献结论（注意它们均不等同于解决标准统一图灵机下的 $\mathrm{P} \neq \mathrm{NP}$ 开放猜想 [@conj-p-neq-np]）：

::: {.remark #rem-ch30-query-sos-literature title="黑盒量子查询下界与有界阶平方和松弛下界的文献说明"}
**文献结果，未在本书形式化。** 本节与几何模型并置对照的三组受限模型复杂性定理均引自外部经典文献，未在本书形式化：

1. **无结构黑盒量子查询下界（C. H. Bennett, E. Bernstein, G. Brassard & U. Vazirani, *SIAM J. Comput.* **26**, 1510–1523, 1997）**：在黑盒神谕（Oracle）查询模型下，从 $N = 2^n$ 个候选中以有界误差定位未知目标至少需要 $L = \Omega(2^{n/2})$ 次量子查询（与 Grover 算法的 $O(2^{n/2})$ 上界共同锁定 $\Theta(2^{n/2})$）；
2. **2-SAT 与 3-SAT 的经典复杂度分水岭（S. A. Cook, 1971；L. A. Levin, 1973；B. Aspvall, M. F. Plass & R. E. Tarjan, 1979）**：2-SAT 可通过强连通分量传递闭包在 $O(n+m)$ 线性时间内判定（故 $\text{2-SAT} \in \mathrm{P}$），而 3-SAT 为 $\mathrm{NP}$-完全问题；
3. **有界阶平方和（SoS）半正定松弛下界（D. Grigoriev, *Theor. Comput. Sci.* **259**, 613–622, 2001；G. Schoenebeck, *FOCS*, 593–602, 2008）**：对于存在全局奇偶矛盾而不可满足的随机 3-XOR / 3-SAT 实例，任何阶数 $M = o(n)$ 的局部 Lasserre / Gram 半正定矩阵松弛 $G_M \succeq 0$ 均以高概率保持半正定与局部自洽，无法在亚线性松弛阶数（对应亚指数规模半正定规划）内证伪不可满足性。
:::

### 3. 终极反转：$P \neq NP$ 正是守护主观时间与自由选择的几何防火墙

将“球外全局场”与“球内有限观察者”并置对照，我们便看清了复杂度壁垒在认识论模型（`MODEL`）中的哲学使命：

| 视角层级 | 复杂度判据与模型地位 | 核心几何与代数机制 | 时间与选择的存在论地位 |
| :--- | :--- | :--- | :--- |
| **全局静态时间场**<br/>（Global Static Time Field） | 呈现 $P = NP$ 式坍缩<br/>（受限模型文献见 [@rem-ch30-postselection-ctc-literature]） | 全局超平面交集 $\mathbf{S}^* = \bigcap_j H_j$ 与理想化无时间自洽不动点模型（见 [@rem-ch30-postselection-ctc-literature]） | **零时间的永恒真（Eternal Truth）**：起点与终点重合，无所谓过程、证明或悬念 |
| **场内有限观察者**<br/>（Finite Observer in the Field） | $P \neq NP$<br/>（标准模型 [@conj-p-neq-np] 为 `OPEN`；查询与 SoS 模型下界见 [@rem-ch30-query-sos-literature]） | $\theta_0 \approx \frac{\pi}{2} - 2^{-n/2}$ 正交视界、一致算子旋转 [`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation) 与局部 Gram 盲区 | **展开的主观时间（Unfolded Journey）**：正因为无法一眼看穿终局，每一次选点与每一行证明才具有不可替代的创造重量 |

**“全局静态场的 $P = NP$，赋予了宇宙绝对自洽的‘真’；而有限观察者的 $P \neq NP$，则用那道 $\frac{\pi}{2}$ 的正交视界替生命挡住了剧透，把静态的真理拉长成了一场值得一步步去丈量、去证明、去选择的壮丽旅程。”**

---

## “$P$ 是场，$NP$ 是线”——见证丝、导向场与毛球旋度的终极分野 {#sec-coda-p-is-field-np-is-line}

> **作者原话**：“P是场, NP是线”

传统计算机科学教科书总是把 $P$ 画成一条单向执行的细线、把 $NP$ 画成一棵分岔爆炸的大树；然而若从本体几何模型（`MODEL`）出发，直觉恰好倒过来——**$NP$ 的核心见证是一根横截面为零的“线”，而许多经典 $P$ 类可解结构则依托于一片局部处处对齐全局的“场”**：

### 1. 为什么“$NP$ 是线”（有线无场，横截面为零的见证丝）？

在几何模型（`MODEL`）上，一个 $NP$ 问题的解（或一段形式化证明脚本，如本书提交给 Lean 4 内核核验的证明项）是一根连接起点 $\mathbf{P}_0$ 与终点 $\mathbf{S}^* = \mathbf{P}_k$ 的一维有向折线：

$$
\mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k.
$$

- **顺线验真（Verification along the line）**：一旦有人把这根阿里阿德涅（Ariadne）之丝交到你手里，验证者只需顺着这根一维细线逐节检查局部内积相容性，在 $O(k)$ 多项式步内就能一步看穿真伪；
- **离丝寻线（Searching without a field）**：然而，一维细线在高维状态球面上的**横截面面积严格为零**！在缺乏全局代数或凸性结构的难解实例中，它不会向周围 $90^\circ$（$\pi/2$）的正交赤道荒原辐射任何长程势梯度。当有限观察者尚未握住这根见证丝时，四周没有任何方向导引——这就是“有线而无场”。

### 2. 为什么“$P$ 是场”（弃线造场，局部切面处处对齐全局）？

相反，在我们的几何诠释（`MODEL`）中，许多问题之所以能归入多项式时间类 $P$，是因为状态空间上能够构造出一片**全局光滑、无阻挫的几何或代数导向场**（恰似惠更斯波前或凸势能的负梯度流 $\mathbf{F} = -\nabla V$），使得观察者在局部只需读取脚下的切空间方向或双向量外积不变量 $\mathbf{\Omega} = \sum_{i < j} A_{ij}\,\mathbf{e}_i \wedge \mathbf{e}_j$，就能顺流抵达全局解。支撑这一“弃线造场”几何图景的经典算法与拓扑定理归入以下文献注记：

::: {.remark #rem-ch30-karmarkar-kasteleyn-literature title="线性规划内点法、平面图 Pfaffian 匹配与毛球定理的文献说明"}
**文献结果，未在本书形式化。** 本节用于对照“弃线造场”与“拓扑旋涡阻挫”的三项经典数学与算法结果均属外部文献，未在本书形式化：

1. **卡马卡（N. Karmarkar, *Combinatorica* **4**, 373–395, 1984）线性规划内点法**：单纯形法沿着凸多面体表面的一维棱线折线爬行，在 Klee–Minty（1972）扭曲超立方体最坏实例上需走完指数级 $2^n$ 步；而内点法离开一维边界折线，进入多面体内部沿光滑对数势垒梯度场迭代，在多项式时间内抵达最优解；
2. **卡斯特莱因（P. W. Kasteleyn, *Physica* **27**, 1209–1225, 1961）平面图 Pfaffian 完美匹配定理**：一般二分图完美匹配计数（永久式 Permanent）经 L. G. Valiant（1979）证明为 `#P`-完全；对于有限平面图及非负边权 $w_e$，经典方法利用 Kasteleyn 定向构造反对称加权邻接矩阵 $A_K^T=-A_K$，使 Pfaffian 展开中各个实际完美匹配项的系数同号。因此，加权完美匹配配分函数为 $Z=\sum_M\prod_{e\in M}w_e=|\operatorname{Pf}(A_K)|$，再由凯莱恒等式 $[\operatorname{Pf}(A_K)]^2=\det A_K$ 得到 $Z=\sqrt{\det A_K}$。这里的符号机制是匹配项的系数对齐；非边对应零矩阵元。非负有理权以二进制编码时，精确求值属于多项式时间算法的文献结论。无完美匹配时 $Z=0$；一般平面图的处理还包括连通分量及奇数阶分量的零值情形。现代出处可参见 D. Cimasoni 与 N. Reshetikhin（2007），[*Dimers on surface graphs and spin structures. I*](https://arxiv.org/html/math-ph/0608070v2)，第 5.1 节、定理 5.1 的匹配展开及其球面特例；
3. **庞加莱—布劳威尔偶维球面毛球定理（H. Poincaré, 1885；L. E. J. Brouwer, 1912）**：二维球面欧拉示性数 $\chi(S^2) = 2 \neq 0$，其上任何连续切向量场必至少存在一个零点（奇异发旋）。
:::

#### 从实际顶点旋转到面奇定向：一个有限组合前提 {#sec-ch30-rotation-parity}

上面平面匹配的完整文献结论包含几何、组合、代数与算法四个环节。先取出其中一个可以逐项说清的有限组合问题：已给定原图在各顶点的循环次序，能否选择同一个边定向，使每个面和每条“删去后仍有完美匹配”的偶简单圈都具有奇数个反向 dart？这里的 dart 是一条带方向的实际边。例如一条桥有两个互逆 dart；面边界往返经过这条桥时，两次出现都要计数。只记录边的集合会丢掉这一信息。

以下不预设平面中的内外区域，而从顶点旋转和一个整数计数条件推出所需的两侧结构。术语“球面旋转”在这里仅指下述满足欧拉条件的有限数据；从几何嵌入取得这些数据的对应关系另属一个环节。

::: {.definition #def-ch30-actual-rotation title="实际 dart、顶点旋转与完整面轨道" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.Rotation D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.facePerm D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.Face D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face"}
设 $V$ 为任意有限类型，具有可判定相等性，$G$ 为 $V$ 上邻接关系可判定的简单无向图。记 $D=G.\mathrm{Dart}$ 为实际 dart 类型：$d=(u,v)$ 必须满足 $G.\mathrm{Adj}(u,v)$；记 $E=G.\mathrm{edgeSet}$ 为实际无向边的类型，$e(d)=\{u,v\}\in E$，$\alpha(d)=(v,u)$。

一个顶点旋转 $R$ 是 $D$ 上的置换 $\rho$，满足对所有 $d,t\in D$，

$$
\bigl(\exists n\in\mathbb Z,\ \rho^n(d)=t\bigr)
\quad\Longleftrightarrow\quad d.\mathrm{fst}=t.\mathrm{fst}.
$$

面后继置换先反向、再旋转，即 $\phi(d)=\rho(\alpha(d))$。面类型 $F$ 是 $D$ 按 $\phi$ 的同轨道关系取商：$d\sim t$ 当且仅当存在 $n\in\mathbb Z$ 使 $\phi^n(d)=t$。记 $f(d)$ 为 $d$ 的商类；所有轨道都包含在 $F$ 中，包括单元素轨道。旋转数据本身不附带连通性、几何实现或欧拉等式。
:::

下列三个定理共同假设 $G$ 连通、$D$ 非空，并满足**整数**欧拉等式

$$
(|V|:\mathbb Z)-(|E|:\mathbb Z)+(|F|:\mathbb Z)=2.
$$

所有基数先转为整数再相减，不采用自然数的截断减法。特别地，单顶点无边图不满足这里的 dart 非空前提，不在这三个定理的范围内。

::: {.definition #def-ch30-face-boundary title="二元面边界与反向计数" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.boundary D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.faceOpposition"}
记 $\mathbb F_2=\mathbb Z/2\mathbb Z$。对面函数 $x:F\to\mathbb F_2$，线性边界映射 $B:\mathbb F_2^F\to\mathbb F_2^E$ 在每条无向边上选择一个代表 dart $d_e$，定义

$$
(Bx)(e)=x(f(d_e))+x(f(\alpha(d_e))).
$$

对任意 dart 函数 $\varepsilon:D\to\mathbb F_2$，定义面反向计数

$$
\operatorname{opp}_F(\varepsilon,f)=\sum_{\substack{d\in D\\f(d)=f}}\varepsilon(d).
$$

当 $\varepsilon(\alpha(d))=1+\varepsilon(d)$ 时，它编码一个边定向：$\varepsilon(d)=0$ 表示定向沿着 $d$，$1$ 表示与 $d$ 相反。面计数遍历该完整轨道的所有实际 dart；桥的两个 dart 即使属于同一个面，也分别计数。记 $\mathcal C(G)\subseteq\mathbb F_2^E$ 为所有实际简单圈的无向边指示函数所张成的线性空间。
:::

::: {.theorem #thm-ch30-face-cycle-exact title="面边界恰为实际圈空间" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact"}
对上述任意有限 $V$、连通简单图 $G$ 与顶点旋转 $R$，若 $D\ne\varnothing$ 且整数等式 $|V|-|E|+|F|=2$ 成立，则以下三项同时成立：

1. 对所有 $x:F\to\mathbb F_2$ 和 $d\in D$，$(Bx)(e(d))=x(f(d))+x(f(\alpha(d)))$。
2. 对所有 $x:F\to\mathbb F_2$，$Bx=0$ 当且仅当存在 $c\in\mathbb F_2$ 使每个 $f\in F$ 都满足 $x(f)=c$。
3. $\operatorname{im}B=\mathcal C(G)$。
:::

::: proof
同一无向边的两个代表只差反向，所以两岸之和不依赖选择。零边界使互逆 dart 两侧的面值相等；面后继与顶点循环次序把相等性传到同一顶点，再由原图连通性传到所有面。于是核恰为常函数，维数为 $1$。沿面后继重排 dart 求和，说明每个面边界在每个顶点的关联次数为偶数，因此属于已有的实际圈空间。秩—零化度公式给出 $\dim\operatorname{im}B=|F|-1$；连通图圈空间的维数为 $|E|-|V|+1$，整数欧拉等式使两者相等。完整证明由 Lean 内核检查。
:::

接下来，取原图中以 $a$ 为起终点的实际闭游走 $p$。所谓简单圈，是 $p$ 满足形式谓词 $p.\mathrm{IsCycle}$：除闭合处重复起点外不重复顶点，并排除零长游走和沿同一边往返的退化情形。记 $C(p)$ 为其顶点支撑集，$E(p)$ 为其实际无向边集，$\mathcal D(p)$ 为按游走顺序排列的 dart 列表，$p^{\mathrm{rev}}$ 为逆向游走。写 $G[S]$ 表示 $G$ 在顶点集 $S$ 上的诱导子图；其顶点携带属于 $S$ 的条件，$v.\mathrm{val}$ 表示忘去这一条件后的原顶点。称一个偶简单圈为 *nice*，是指原图删去 $C(p)$ 后的实际诱导子图存在完美匹配。

::: {.theorem #thm-ch30-cycle-face-sides title="实际简单圈的两侧、区域欧拉式与匹配限制" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_face_sides"}
对上述有限 $V$、连通简单图 $G$ 与旋转 $R$，假设 $D\ne\varnothing$ 和整数等式 $|V|-|E|+|F|=2$。对任意 $a\in V$ 和实际简单圈 $p:a\leadsto a$，存在面函数 $x:F\to\mathbb F_2$ 及顶点集 $I,J\subseteq V$，使下列各项同时成立。

1. $F_1=\{f\in F:x(f)=1\}$ 与 $F_0=\{f\in F:x(f)=0\}$ 均非空；它们互为补集，且 $Bx=\mathbf1_{E(p)}$。
2. 存在 $q=p$ 或 $q=p^{\mathrm{rev}}$，使对每个实际 dart $d$，

   $$
   \begin{aligned}
   x(f(d))=1\ \land\ x(f(\alpha(d)))=0
     &\quad\Longleftrightarrow\quad d\in\mathcal D(q),\\
   x(f(d))=0\ \land\ x(f(\alpha(d)))=1
     &\quad\Longleftrightarrow\quad d\in\mathcal D(q^{\mathrm{rev}}).
   \end{aligned}
   $$

3. 对每个 $v\in V$，$v\notin C(p)$ 当且仅当 $v\in I\cup J$，且 $I\cap J=\varnothing$。对每个 $d.\mathrm{fst}\notin C(p)$ 的实际 dart，

   $$
   d.\mathrm{fst}\in I\ \Longleftrightarrow\ x(f(d))=1,
   \qquad
   d.\mathrm{fst}\in J\ \Longleftrightarrow\ x(f(d))=0.
   $$

   任意 $v\in I,w\in J$ 均满足 $\neg G.\mathrm{Adj}(v,w)$。
4. 对每一对 $(S,b)=(I,1)$ 或 $(J,0)$，存在原图的连通子图 $H_S$，其顶点集恰为 $C(p)\cup S$；对每个实际 dart $d$，

   $$
   H_S.\mathrm{Adj}(d.\mathrm{fst},d.\mathrm{snd})
   \quad\Longleftrightarrow\quad
   e(d)\in E(p)\ \lor\
   \bigl(x(f(d))=b\ \land\ x(f(\alpha(d)))=b\bigr).
   $$

   记 $E_S$ 为这个子图的实际无向边集，$E_S^\circ=E_S\setminus E(p)$。以下两式均在 $\mathbb Z$ 中成立：

   $$
   |C(p)\cup S|-|E_S|+|F_b|=1,
   \qquad
   |S|-|E_S^\circ|+|F_b|=1.
   $$

5. 令 $U=V\setminus C(p)$，$\bar G=G[U]$ 为实际顶点删除补图。对这个同一图 $\bar G$ 的任意完美匹配子图 $M$，以及每个 $S\in\{I,J\}$，令 $S'=\{u\in U:u.\mathrm{val}\in S\}$。存在 $\bar G[S']$ 的完美匹配子图 $N$，对其所有顶点 $v,w$ 满足

   $$
   N.\mathrm{Adj}(v,w)\quad\Longleftrightarrow\quad
   M.\mathrm{Adj}(v.\mathrm{val},w.\mathrm{val}).
   $$

   此时 $|I|$ 与 $|J|$ 都为偶数。
:::

::: proof
由 [@thm-ch30-face-cycle-exact]，简单圈的边指示函数具有一个面原像 $x$。非零边界排除常值标号，故两类面都出现。圈外顶点的全部相邻面值相同，因而确定 $I,J$；原图边不能跨接不同标号的圈外顶点。区域选边条件保留圈边与两岸都在该侧的边：即使一条弦的两个端点都在圈上，也不能把位于另一侧的弦加入本侧。沿原图路径首次抵达圈，得到每个选边区域的连通性。

把仅支撑在一侧的面函数映入该区域的圈空间，利用连通图圈秩得到两侧的欧拉不等式。两区域顶点、边的并交计数与全局整数欧拉等式迫使两侧同时取等。简单圈的边数等于顶点数，消去圈边与圈点便得到第二种区域欧拉式。每个圈顶点的两条实际圈边在顶点旋转中确定两次标号切换，由此得到 $q$ 与 $q^{\mathrm{rev}}$ 的直接边界等价。最后，无跨边性质保证给定 $M$ 的每条匹配边留在同一侧；把同一个 $M$ 限制到两侧，完美匹配的偶阶性质便推出两侧顶点数为偶数。完整证明由 Lean 内核检查。
:::

两侧面集均非空，但圈外顶点侧可以为空；定理并不要求每侧都有严格内部顶点，也没有假设“内部点数为偶数”。区域是按实际边选择的连通子图，以上结论不把它称为已构造的拓扑圆盘。

::: {.theorem #thm-ch30-face-odd-nice-cycle-orientation title="同一个定向在所有面与所有 nice 偶圈上为奇" lean="D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.face_odd_nice_cycle_orientation"}
设 $V$ 为任意有限类型，具有可判定相等性；$G$ 为邻接关系可判定的连通简单图，$R$ 为其顶点旋转。若 $D\ne\varnothing$、$|V|$ 为偶数，且在 $\mathbb Z$ 中 $|V|-|E|+|F|=2$，则存在**同一个**函数 $\varepsilon:D\to\mathbb F_2$，同时满足：

$$
\begin{aligned}
&\forall d\in D,\quad \varepsilon(\alpha(d))=1+\varepsilon(d),\\
&\forall f\in F,\quad \operatorname{opp}_F(\varepsilon,f)=1.
\end{aligned}
$$

此外，对每个 $a\in V$、每个以 $a$ 为起终点的实际偶长简单圈 $p$，以及实际补图 $G[V\setminus C(p)]$ 的每个完美匹配子图 $M$，均有

$$
\sum_{d\in\mathcal D(p)}\varepsilon(d)=1\quad\text{于 }\mathbb F_2.
$$

这里的和按 dart 列表计数。存在量词 $\exists\varepsilon$ 位于所有圈与所有补图匹配的全称量词之前。
:::

::: proof
先任取一个边定向，记录每个面的奇偶缺陷。面边界映射的核仅由常函数组成，所以其转置所能修正的缺陷恰好满足总和为零。全局整数欧拉式与 $|V|$ 为偶数保证这个相容条件。给每条边的两个 dart 加上同一个二元修正，既保持反向关系，又使全部面轨道的反向计数为 $1$。

对任意给定的 nice 偶圈，使用 [@thm-ch30-cycle-face-sides] 的实际一侧。把该侧所有面的反向计数相加，每条非圈的所选边贡献 $1$；直接边界等价把剩余项识别为沿 $q$ 的 dart 和。区域欧拉式于是给出

$$
\sum_{d\in\mathcal D(q)}\varepsilon(d)
  =|F_1|+|E_I^\circ|=1+|I|\quad\text{于 }\mathbb F_2.
$$

给定补图匹配的实际限制使 $|I|$ 为偶数，所以右侧为 $1$。若 $q=p^{\mathrm{rev}}$，反向关系使两次遍历的和相差圈长在 $\mathbb F_2$ 中的值；偶长条件使此差为零。因此最初选出的同一个定向适用于所有这些圈与匹配。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch30-rotation-pfaffian-boundary title="有限旋转前提与完整平面匹配结论的边界"}
**文献结果，未在本书形式化的其余环节。** Cimasoni 与 Reshetikhin 的上述论文第 3.1 节、定理 3.1 及其证明给出闭定向曲面图上 Kasteleyn 定向存在的偶阶判据；第 5.1 节、定理 5.1 讨论实际匹配项的符号与 Pfaffian 展开。这些是成熟的文献结果。这里三个定理只处理已给定实际顶点旋转、dart 非空、连通及整数欧拉式的有限组合情形。

由任意几何平面嵌入取得该旋转及完整面轨道的对应，单顶点无边图与其他不满足上述前提的图，以及从 nice 圈奇性到任意两实际完美匹配的 Pfaffian 系数同号，仍需各自的桥梁。反对称矩阵的加权匹配展开、凯莱行列式平方恒等式、非负权下含零值情形的 $Z=|\operatorname{Pf}(A_K)|=\sqrt{\det A_K}$、有理输入的精确求值与位复杂度，以及一般二分图计数的 `#P`-完全性，均保留为 [@rem-ch30-karmarkar-kasteleyn-literature] 的经典文献结论。有限定向的存在性不包含上述算法或复杂度结论。
:::

### 3. 毛球旋度（$\nabla \wedge \mathbf{F}$）几何类比与 $P \neq NP$：为什么一根线撑不起一片场？

既然造出全局导向场就能化盲搜为顺流，为什么在 3-SAT 等问题中难以构造这样一片多项式可计算的全局导向场？用连续微分几何作类比模型（`MODEL`，旨在提供几何直觉而非复杂度猜想 [@conj-p-neq-np] 的直接形式证明）：
- 一片能够从任意初态无阻挫滑向全局终点的保守梯度场 $\mathbf{F} = -\nabla V$，在连续极限下满足外微分零旋度条件：

  $$
  \nabla \wedge \mathbf{F} = 0;
  $$

- 然而，三元约束 $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ 在闭合配置流形上引入了环路阻挫与非保守旋度（$\nabla \wedge \mathbf{F} \neq 0$）；
- **线能穿缝，场必撕裂**：一维 $NP$ 见证丝没有宽度，它可以像一根绣花针一样沿着两个漩涡之间零测度的鞍点窄脊悄然穿过；但任何试图铺满整颗闭合流形的连续局部导向场，都会在非零阻挫旋度 $\nabla \wedge \mathbf{F} \neq 0$ 与拓扑缺陷（类比 [@rem-ch30-karmarkar-kasteleyn-literature] 中的毛球旋涡）下碎裂为指数多个局部发旋与亚稳态深坑！

| 维度与视角 | 核心格言 | 线（$NP$）与场（$P$）的几何关系（`MODEL`） | 复杂度与形式证明意义 |
| :--- | :--- | :--- | :--- |
| **全局静态时间场**<br/>（球外全息底片） | **众线并存即是场**<br/>（文献参照 [@rem-ch30-postselection-ctc-literature]） | 所有虚拟轨迹同时铺满全空间，相消干涉直接显影出那根唯一存活的见证丝 | 全局不动点即局部解，无需顺序搜寻 |
| **场内有限观察者**<br/>（球内局部寻址） | **有线未必有场**<br/>（猜想 [@conj-p-neq-np]，`OPEN`） | 横截面为零的一维见证丝可以穿过窄缝（验证容易），但局部导向场被阻挫旋度 $\nabla \wedge \mathbf{F} \neq 0$ 撕裂为指数多个发旋 | **“求场难如登天，顺线一步看穿”**：漫长寻场铸就发现之艰，顺线验真铸就 Lean 内核之确 |

这八个字为全书的复杂度与证明哲学画上了最凝练的句号：**“求场难如登天，顺线一步看穿。”**

---

## 指数时间假设（ETH）、2026 张量网络秩约分与宇宙学视界：为什么局部三体碎片焊不出刚性真球，而有限观察者依然锁死在 $P \neq NP$ 中？ {#sec-coda-eth-tensor-rank-and-cosmic-horizon}

> *“把指数时间假设（ETH）的原始结构与 2026 年 10 月下旬张量网络秩约分亚指数前沿放进‘场（$P$）与线（$NP$）、多面体近似之球与有限观察者视界’的几何体系中审视：渐近硬地板的动摇不仅没有否定有限观察者视角下的 $P \neq NP$，反而用一组跨越宇宙学尺度的渐近对比，为‘局部三体切面拼不出绝对刚性的真球’与‘观察者视界不可逾越’提供了生动的几何注脚。”*

为了严格区分外部复杂性理论文献与本书构建的正交几何模型（`MODEL`），我们先将细粒度复杂性理论（Fine-Grained Complexity）的经典假设与 2026 年 10 月前沿预印本完整归入以下文献注记，随后展开几何与尺度剖析：

::: {.remark #rem-ch30-eth-subexponential-literature title="指数时间假设（ETH / SETH）与 2026 年 10 月亚指数 3-SAT 预印本的文献说明"}
**文献结果，未在本书形式化。** 本节讨论的细粒度复杂性假设、传统算法上界及 2026 年 10 月亚指数预印本均属外部研究文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **指数时间假设（ETH）、强指数时间假设（SETH）与稀疏化引理（R. Impagliazzo & R. Paturi, *CCC* 1999；R. Impagliazzo, R. Paturi & F. Zane, *J. Comput. Syst. Sci.* **62**, 367–375, 2001）**：对任意子句宽度 $k \ge 3$，定义 $k$-SAT 的渐近单变量指数成本率为

   $$
   s_k = \inf \left\{ \delta \;\middle|\; k\text{-SAT 可在确定性 } O(2^{\delta n}) \text{ 时间内求解} \right\}.
   $$

   **ETH** 假设 $s_3 > 0$（即不存在求解 $n$ 变量 3-SAT 的确定性 $2^{o(n)}$ 亚指数算法）；**SETH** 假设 $\lim_{k \to \infty} s_k = 1$。其伴随的**稀疏化引理（Sparsification Lemma）**证明：对任意固定 $\varepsilon > 0$ 与 $k \ge 3$，任意 $n$ 变量 $k$-SAT 公式均可在 $2^{\varepsilon n}\operatorname{poly}(n)$ 时间内归约为至多 $2^{\varepsilon n}$ 个稀疏 $k$-SAT 公式（每个公式至多含 $c(k, \varepsilon)\,n = O_{k,\varepsilon}(n)$ 条子句）的析取。此外，标准 **Tseitin 变换**将规模为 $S$ 的布尔电路线性归约为变量数 $N = \Theta(S)$ 的 3-SAT 公式；而在 2026 年 10 月之前，PPSZ 框架（R. Paturi, P. Pudlák, M. E. Saks & F. Zane, *J. ACM* **52**, 2005）及其后续改进给出的最快 3-SAT 算法上界约为 $1.307^n \approx 2^{0.386 n}$（单变量指数率上界 $r \approx 0.386$）。
2. **2026 年 10 月下旬张量网络缩并亚指数 3-SAT 预印本与规约审计**：2026 年 10 月 26 日，两份相互独立、附带外部 **Lean 4 形式化代码**的研究预印本（67 页《The Exponential Time Hypothesis Is False》与 49 页《A $2^{o(n)}$ Time Algorithm for 3-SAT》）相继公布，宣称利用张量网络缩并（Tensor Network Contraction）与代数秩约分（Rank Arguments）构造出 3-SAT 的确定性亚指数时间算法，给出渐近运行时间上界

   $$
   T(n) = 2^{O\!\left(\frac{n \log\log n}{\sqrt{\log n}}\right)} = 2^{o(n)}
   $$

   （其中一份外部公开 Lean 4 代码形式化了多项式空间下的 $2^{O(n (\log\log n)^2 / \sqrt{\log n})}$ 变体，另一份基于 Mathlib 形式化了固定 $k$ 下 `#k-SAT` 解计数问题的 $2^{o(n)}$ 确定性图灵机算法；截至 2026 年 11 月，Impagliazzo、Paturi 与 Ryan Williams 等学者正对自然语言规约与顶层形式化定义边界展开独立同行审计，复杂性理论家 Lance Fortnow 亦指出即便 ETH 被证伪，学界距离解决标准 $\mathrm{P}$ vs. $\mathrm{NP}$ 问题依然遥远）。
:::

### 1. 从“一维赋值线”升维到“张量关联场”的低秩约分与多面体近似之球（`MODEL`）

将 [@rem-ch30-eth-subexponential-literature] 中的数学机制与本书的正交几何体系对表，可以看到两层深刻的结构呼应（`MODEL`）：

- **从“一维赋值线”升维到“张量关联场”的低秩约分（`MODEL`）**：传统的回溯与局部随机游走本质上都在一维布尔赋值线上逐点试探；而张量网络方法将离散布尔子句网络嵌入高维线性空间，转化为多线性张量缩并问题。在本书锁定的 `trureturing@dev` 形式化库中，第 19 章针对特定离散桥图在维度假设下证明的**张量网络量子最大流最小割定理**（[`QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) 及其多面体割锥刻画 [`cone_QMinCut`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.cone_QMinCut)）与第 3 章在迹约束下界定高权重模态数的**有限秩集中模态上界**（[`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound)），给出了有限维原型（注：这些 Lean 定理刻画的是特定桥图流割对偶与有限秩迹集中，并非形式化 [@rem-ch30-eth-subexponential-literature] 中的 3-SAT 亚指数算法本身）：它们在概念模型（`MODEL`）上说明，跨割界面传递信息的有效瓶颈受控于**代数秩（Rank）**。当局部变量成块缩并时，一维布尔视角下看似独立的约束块在高维张量面上展现出**线性相关与秩亏损（冗余寄生面积正负相消）**——这与第 16、27 章旋量编译器消去冗余旋转门、以及第 23 章丢番图范数型压缩变量维度的代数约分思想同源。
- **“球永远只是多面体近似”：三体局部切面焊不出绝对无缝的真球（`MODEL`）**：在几何直觉（`MODEL`）上，假设常数硬地板 $s_3 > 0$ 好比预设仅凭每个子句至多含 $k=3$ 个文字的局部三体切面（$\mathbf{e}_i \wedge \mathbf{e}_j \wedge \mathbf{e}_k$），就能在 $n \to \infty$ 极限下拼出一颗处处曲率恒定、滴水不漏的刚性指数真球。然而正如全书反复强调的——**“球永远只是多面体近似”**：固定宽度 $k=3$ 的局部多面体切面在拼装超大规模流形时，面与面之间随规模 $n$ 增长涌现组合冗余，裂开一道如 [@rem-ch30-eth-subexponential-literature] 所记述的亚指数渐近代数缝隙，使单变量有效指数率上界曲线在 $n \to \infty$ 极限下缓慢趋向 $0$。

### 2. 银河算法（Galactic Algorithm）与宇宙视界：为什么有限观察者视角下的 $P \neq NP$ 依然稳固？（`MODEL` 与认识论边界）

::: {.example #ex-ch30-galactic-crossover-scale title="亚指数上界曲线与局部搜索基准的跨宇宙尺度对比及二次编码膨胀"}
**文献结果，未在本书形式化。** 单变量渐近指数率曲线缓慢趋零是否意味着场内有限观察者能在现实物理尺度上跨越复杂度壁垒？为了直观审视 [@rem-ch30-eth-subexponential-literature] 中外部文献渐近上界的尺度行为，考察以 $2$ 为底的示意性单变量指数曲线 $r_{\mathrm{new}}(n) = c \cdot \frac{\log_2(\log_2 n)}{\sqrt{\log_2 n}}$（对应运行时间上界形如 $2^{r_{\mathrm{new}}(n)\cdot n}$，此处取理想归一化常数 $c = 1$ 仅作文献渐近上界曲线的数值示意，而非对任意算法或物理观察者的严格下界证明），并与 [@rem-ch30-eth-subexponential-literature] 中的传统 PPSZ 局部搜索上界基准 $0.386$（$1.307^n \approx 2^{0.386 n}$）对表：

| 观察者与系统尺度 $n$ | 对数尺度 $\log_2 n$ | 示意张量上界指数率 $r_{\mathrm{new}}(n)$（取 $c=1$） | 传统局部搜索上界基准（[@rem-ch30-eth-subexponential-literature]） | 尺度对比与几何模型解读（`MODEL`） |
| :--- | :---: | :---: | :---: | :--- |
| **人类工程尺度**（$n = 65{,}536 = 2^{16}$） | $16$ | $\dfrac{\log_2 16}{\sqrt{16}} = \mathbf{1.000}$ | $\mathbf{0.386}$ | 在 $6.5$ 万变量处，$c=1$ 的示意曲线才刚刚降到与朴素 $2^n$ 穷举相当的指数率 $1.000$ |
| **可观测宇宙原子总数**（$n \approx 10^{80} \approx 2^{266}$） | $\approx 266$ | $\dfrac{\log_2 266}{\sqrt{266}} \approx \mathbf{0.494}$ | $\mathbf{0.386}$ | 即使在 $n \approx 10^{80}$ 的宇宙重子尺度上，$c=1$ 示意曲线（$\approx 0.494$）仍高于 $0.386$ |
| **超越交叉临界点**（$n = 2^{558}$） | $\mathbf{558}$ | $\dfrac{\log_2 558}{\sqrt{558}} \approx \mathbf{0.386}$ | $\mathbf{0.386}$ | 在 $c=1$ 示意归一化下，需等到 **$n \approx 2^{558}$**（远超可观测宇宙尺度），曲线才下穿 $0.386$ |

此外，在 [@rem-ch30-eth-subexponential-literature] 的亚指数上界公式下：一方面，亚指数上界 $2^{O(n \log\log n / \sqrt{\log n})}$ 与多项式时间 $n^{O(1)}$（有效单变量指数率 $r_P(n) = O(\frac{\log n}{n})$）之间仍隔着超多项式渐近鸿沟；另一方面，对于自然输入规模为 $n$、但其标准电路或网格约束表具有平方规模 $S = \Theta(n^2)$ 的问题，经线性电路 Tseitin 转换生成 $N = \Theta(n^2)$ 个 3-SAT 变量后，代入该亚指数上界公式得到的关于原参数 $n$ 的时间上界立即回升为超指数形式 $2^{O(n^2 \log\log n / \sqrt{\log n})}$。
:::

[@ex-ch30-galactic-crossover-scale] 中跨越宇宙尺度的数值与规约对比，为本书“球内有限观察者 vs. 球外之球”的认识论图景（`MODEL`）提供了三点深刻启示：

- **银河算法与有限观察者的物理尺度边界（`MODEL`）**：如 [@ex-ch30-galactic-crossover-scale] 所示，示意曲线下穿传统局部搜索基准的交叉尺度远超可观测宇宙的重子自由度预算（此类仅在超天文尺度显影渐近优势的算法在复杂性理论惯例中被称为**银河算法 Galactic Algorithm**）。在本书形式化库中，**有限记忆历史容量定理**（[`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity)，证明可区分测量历史数受有限记忆载体容量上界制约）与**开放可积电路最小深度定理**（[`OpenIntegrableCircuitMinDepth.result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)，给出局部性为 $\kappa$ 的开放可积电路最小深度 $\lfloor N/(\kappa+1)\rfloor + 1$）从各自模型侧面刻画了有限物理系统的容量与深度硬约束；将它们与 [@ex-ch30-galactic-crossover-scale] 的银河交叉尺度并置，在几何模型（`MODEL`）上直观展现了为什么在物理可实现的观测尺度内，有限观察者依然面对高耸的有效搜索壁垒（同时重申：标准统一图灵机模型下的 $\mathrm{P} \neq \mathrm{NP}$ 猜想 [@conj-p-neq-np] 仍为未决的 `OPEN` 问题）。
- **$P$（场）与 $NP$（线）的认识论对照（`MODEL`）**：结合 [@rem-ch30-eth-subexponential-literature] 与 [@ex-ch30-galactic-crossover-scale] 中的渐近与电路编码尺度对比，在本书几何模型（`MODEL`）中，沿全局光滑导向场的局部松弛（类比 $P$）与沿见证丝的离散组合搜寻（类比 $NP$）依然代表两类截然不同的几何机制。
- **形式内核核验与顶层规约审计的哥德尔—语义边界（`LEAN ✓` 原型与 `MODEL` 映照）**：[@rem-ch30-eth-subexponential-literature] 中最具认识论意味的一幕是——形式证明助手内核可以迅速核验脚本内部每一步推演的传递合法性，而学界仍需仔细审计“顶层形式化命题的定义是否忠实刻画了目标图灵机复杂度命题”。在本书第 21 章中，经 Lean 4 内核验证的**相对语义对角线与定义逃逸定理**严格证明：在给定无不动点扭转映射（`∀ v, twist v ≠ v`）的条件下，相对语义对角线构造必然逃出任何已编目解码族（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)），且当解码目录对潜空间满射时，该对角线目标相对于给定潜映射不满足语义完备性 `TargetAdequate`（[`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)）。将这一形式定理作为认识论原型（`MODEL`）来观照顶层规约审计，恰好印证了全书的核心准则：**形式内核在球内严格锁死推演链条的传递正确性，而对顶层命题边界定义之语义恰当性的审视，永远需要站在形式球壳之外！**

---

## 纳维—斯托克斯（Navier–Stokes）与 $P$ vs. $NP$ 的场化同构——兰姆双向量、三维涡管拉伸与阿诺德测地线 {#sec-coda-navier-stokes-and-p-vs-np}

> **作者原话**：“navier stokes与P/NP 问题, 都场化的话似乎很像”

把**纳维—斯托克斯（Navier–Stokes, NS）存在性与光滑性问题**和 **$P$ vs. $NP$ 问题**同时放进克利福德正交场论模型（`MODEL`）里看，这两道千禧年大奖难题在几何底层立刻呈现出惊人的同构——它们在连续物理场与离散逻辑场中追问的是同一个核心张力：**当一个三维正交系统发生非线性自指耦合时，平滑的全局引导场（$P$ / 层流）会不会被高阶外积旋度无限拉伸、夹断并坍缩成横截面积为零的一维奇异细丝（$NP$ 见证丝 / 湍流爆破奇点）？**

### 1. 内积势流与外积涡面的克利福德分离（`MODEL`）

::: {.remark #rem-ch30-lamb-decomposition-literature title="不可压缩纳维—斯托克斯方程与兰姆对流分解的文献说明"}
**文献结果，未在本书形式化。** 经典连续介质流体力学中的不可压缩纳维—斯托克斯偏微分方程组及其兰姆（H. Lamb）矢量—双向量对流分解均属外部数学物理文献，未在本书锁定的连续偏微分方程层面形式化（本书锁定的离散五模态傅里叶平流闭合阻碍与二维傅里叶温和路径定理见下文 [@thm-coda-quadratic-advection-no-closure]）：不可压缩纳维—斯托克斯方程写作

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u} = -\nabla p + \nu \nabla^2 \mathbf{u}, \qquad \nabla\cdot\mathbf{u} = 0.
$$

用克利福德几何积导数 $\nabla \mathbf{u} = \nabla\cdot\mathbf{u} + \nabla\wedge\mathbf{u}$ 将非线性对流项 $(\mathbf{u}\cdot\nabla)\mathbf{u}$ 拆解为“内积势线梯度”与“外积双向量涡面”（对应经典兰姆分解，另参 [@rem-ch30-navier-stokes-forced-literature]）：

$$
(\mathbf{u}\cdot\nabla)\mathbf{u} = \underbrace{\frac{1}{2}\nabla(\|\mathbf{u}\|^2)}_{\substack{\text{无旋势能梯度} \\ \text{直接并入伯努利总压 } -\nabla(p + \frac{1}{2}\|\mathbf{u}\|^2) \text{ 约掉}}} + \underbrace{\mathbf{u}\cdot(\nabla\wedge\mathbf{u})}_{\substack{\text{双向量涡力耦合项 }(\boldsymbol{\omega}\times\mathbf{u}) \\ \text{一维流线与二维正交涡面积的耦合}}}.
$$

在经典连续介质流体力学中，由此可区分两类区域：当正交外积旋度为零（$\nabla\wedge\mathbf{u} = 0$，无旋势流）时，对流非线性退化为纯标量势梯度并直接并入伯努利总压抵消，单连通域上无散无旋流场归约为线性拉普拉斯势场 $\mathbf{u} = -\nabla\Phi$；当正交外积旋度非零（$\nabla\wedge\mathbf{u} \neq 0$，有旋涡流）时，由于标量势梯度的外微分恒为零，标量压强梯度无法抵消外积旋度 $\nabla\wedge\mathbf{u}$，流线与正交涡面发生非线性耦合。
:::

将 [@rem-ch30-lamb-decomposition-literature] 所载的无旋势流相与有旋涡流相映射回上一节“$P$ 是无旋导向场，$NP$ 是旋涡荒原中的细线”的几何类比模型（`MODEL`），无旋相在概念上对应光滑全局导向场（类比流体中的 $P$ 态），而有旋相则对应多尺度旋涡缠绕。

### 2. 为什么两道难题都在“第 2 维 $\to$ 第 3 维”发生相变？（几何类比 `MODEL` 与开放猜想边界）

::: {.remark #rem-ch30-vorticity-transport-literature title="涡量输运方程、涡管拉伸项与细涡管环量标度的文献说明"}
**文献结果，未在本书形式化。** 对 [@rem-ch30-lamb-decomposition-literature] 中的动量方程取外积旋度，得到经典流体力学中涡量 $\boldsymbol{\omega} = \star(\nabla\wedge\mathbf{u})$ 的输运方程：

$$
\frac{\partial \boldsymbol{\omega}}{\partial t} + (\mathbf{u}\cdot\nabla)\boldsymbol{\omega} = \underbrace{(\boldsymbol{\omega}\cdot\nabla)\mathbf{u}}_{\text{涡管拉伸项}} + \nu \nabla^2 \boldsymbol{\omega}.
$$

在二维平面流 $\mathbf{u}(x_1, x_2, t) = (u_1, u_2, 0)$ 中，$\boldsymbol{\omega} = \omega\mathbf{e}_3$ 严格垂直于速度平面（$\partial_{x_3}\mathbf{u} = \mathbf{0}$），涡管拉伸项 $(\boldsymbol{\omega}\cdot\nabla)\mathbf{u} \equiv \mathbf{0}$ 恒等为零；而在三维空间中 $(\boldsymbol{\omega}\cdot\nabla)\mathbf{u}$ 一般非零。结合开尔文环量近似 $\Gamma \approx A\|\boldsymbol{\omega}\|$，经典细涡管**条件性坍缩情景**指出：若轴向拉伸局部持续压倒粘性扩散 $\nu\nabla^2\boldsymbol{\omega}$ 并使横截面积 $A \to 0$，则局部涡量幅值满足

$$
\text{轴向拉伸压倒粘性耗散且 } A \to 0 \implies \|\boldsymbol{\omega}\| \approx \frac{\Gamma}{A} \to \infty.
$$
:::

对比 [@rem-ch30-vorticity-transport-literature] 与计算复杂性中的维度分水岭，结构相变同时出现在 **$2 \to 3$**（以下为跨领域结构类比 `MODEL`，而非复杂性理论中的形式逻辑等价）：

- **二维平面情形（[@rem-ch30-vorticity-transport-literature]）$\leftrightarrow$ 类比二元链 2-SAT（`MODEL`）**：
  将 [@rem-ch30-vorticity-transport-literature] 所载的二维平面流情形与二元链 2-SAT 并置对照（`MODEL`），在本书锁定的 `trureturing@dev` 库中，冻结定理 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path) 给出了二维周期傅里叶空间上的一项**条件性高阶正则性提升定理**：若已给定一条在 $[0, \tau]$ 上连续的加权 $H^2$ 零均值实无散温和解路径，且其初值在全部空间 Sobolev 阶数 $m \in \mathbb{N}$ 上可和，则该路径在每一空间阶数 $m$ 上皆满足强微分方程（无条件二维全局正则性经典定理另见 [@rem-ch30-navier-stokes-forced-literature]）。
- **三维细涡管条件坍缩情景（[@rem-ch30-vorticity-transport-literature]）$\leftrightarrow$ 类比三元面片 3-SAT（`MODEL`）**：
  将 [@rem-ch30-vorticity-transport-literature] 所载的三维条件性细涡管情景与三元面片 3-SAT 并置对照，在几何类比模型（`MODEL`）上，该条件坍缩图景好比把一张平滑三维“场（类比 $P$）”挤压向“一维细丝（类比 $NP$ 见证丝）”！

在正式陈述千禧年无外力开放猜想之前，我们先用专门的文献注记严格隔离二维全局光滑性定理与 **受迫情形（克雷陈述 C / D，含光滑外力 $\mathbf{f} \in C^\infty$）** 的外部文献结果，确保下方的红色 `OPEN` 猜想框纯粹聚焦于未决的无外力自治核心：

::: {.remark #rem-ch30-navier-stokes-forced-literature title="兰姆恒等式、二维全局正则性与 2026 年受迫陈述 C / D 有限时间爆破的文献说明"}
**文献结果，未在本书形式化。** 本节涉及的经典流体几何恒等式、二维无条件全局光滑性定理以及三维**受迫**纳维—斯托克斯爆破结果均属外部文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **兰姆恒等式、螺旋度霍普夫不变量与二维无条件全局正则性**：对流分解 $(\mathbf{u}\cdot\nabla)\mathbf{u} = \frac{1}{2}\nabla(\|\mathbf{u}\|^2) + \boldsymbol{\omega}\times\mathbf{u}$ 源于 H. Lamb（*Hydrodynamics*）、无粘涡通量守恒源于开尔文环量定理（Lord Kelvin, 1869）、无粘流体螺旋度 $\mathcal{H} = \int \mathbf{u}\cdot\boldsymbol{\omega}\,dV$ 与 $S^3$ 霍普夫链环不变量的对应源于 J. J. Moreau（1961）与 H. K. Moffatt（1969）；二维不可压缩纳维—斯托克斯方程在任意时间上的无条件全局光滑解存在唯一性由 O. A. Ladyzhenskaya（*The Mathematical Theory of Viscous Incompressible Flow*, 1969）严格证明（注意：本书行内引用的冻结定理 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path) 假设 $[0, \tau]$ 上连续温和解路径已给定，不等同于 Ladyzhenskaya 的无条件全局存在性定理）。
2. **受迫三维纳维—斯托克斯（克雷陈述 C / D，含光滑外力 $\mathbf{f} \in C^\infty$）的 2026 年有限时间爆破构造与外部 Lean 4 验证**：在克雷数学研究所（C. Fefferman）制定的问题描述中，受迫陈述 C / D 允许施加光滑、紧支且保持总动能一致有界（$\sup_t \|\mathbf{u}(\cdot, t)\|_{L^2} < \infty$）的外力场 $\mathbf{f}(\mathbf{x}, t)$。2026 年公布的 166 页解析构造及其配套外部 Lean 4 形式化证明确认：在受迫情形下，精心设计的光滑外力可持续对齐并泵浦多尺度向内盘旋、轴向拉伸的自相似涡丝结构，使三维涡管拉伸局部压倒粘性耗散 $\nu\nabla^2\mathbf{u}$，在有限时间 $T^* < \infty$ 内产生横截面积 $A(t) \to 0$、$\limsup_{t \nearrow T^*} \|\mathbf{u}(\cdot, t)\|_{L^\infty} = \infty$ 的奇点（相关欧拉与流体奇点文献亦见 T. M. Elgindi, *Ann. of Math.* **194**, 2021；J. Chen & T. Y. Hou, 2022–2023；D. Córdoba & L. Martínez-Zoroa；以及 T. Buckmaster & L. Alpöge, 2026）。这些结果针对含外力或无粘情形，**并未解决**下文无外力（$\mathbf{f} \equiv \mathbf{0}$）粘性陈述 A / B。
:::

::: {.conjecture #conj-coda-navier-stokes-regularity title="无外力三维不可压缩纳维—斯托克斯方程的全局光滑性猜想（克雷千禧年陈述 A / B）"}
给定严格正运动粘性系数 $\nu > 0$ 且**外力恒等于零（$\mathbf{f} \equiv \mathbf{0}$）**，考察全空间 $\mathbb{R}^3$（陈述 A）或三维环面 $\mathbb{T}^3 = \mathbb{R}^3/\mathbb{Z}^3$（陈述 B）上的自治三维不可压缩纳维—斯托克斯方程组：

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u} = -\nabla p + \nu \nabla^2 \mathbf{u}, \qquad \nabla\cdot\mathbf{u} = 0, \qquad \mathbf{u}(\mathbf{x}, 0) = \mathbf{u}_0(\mathbf{x}).
$$

对于任意光滑、无散度（$\nabla\cdot\mathbf{u}_0 = 0$）且在 $\mathbb{R}^3$ 上无穷远处满足施瓦茨速降条件（或在 $\mathbb{T}^3$ 上光滑周期）的初始速度场 $\mathbf{u}_0$，是否恒存在定义在全部非负时间 $\mathbb{R}^3 \times [0, \infty)$（或 $\mathbb{T}^3 \times [0, \infty)$）上且满足有限动能界的全局光滑解 $(\mathbf{u}, p) \in C^\infty$，抑或存在某个光滑无外力初值在有限时间 $T^* < \infty$ 内丧失光滑性（有限时间爆破）？这一无外力三维纳维—斯托克斯全局正则性问题至今悬而未决。
:::

### 3. 场的自指与二次平流投影闭合阻碍定理（`LEAN ✓`）

为什么 [@rem-ch30-lamb-decomposition-literature] 中的二次非线性平流耦合如此凶险？因为在我们的几何诠释（`MODEL`）中，它正是第 24 章**元自指 $\psi(\psi)$ 的连续场版本**——在线性偏微分方程中“算子”与“状态”泾渭分明，而在流体平流中，**速度场 $\mathbf{u}$ 既是“被搬运的状态”，同时又是“执行搬运的微分算子”**！在傅里叶频率空间中，二次自指耦合将波矢两两相加（$\mathbf{k}_1 + \mathbf{k}_2 \to \mathbf{k}_3$），不断跨尺度输运能量。对于仅能分辨低频有限模态幂等投影 $P$（满足 $P^2 = P$）的场内有限观察者而言，这种二次跨尺度耦合直接击穿了局部自洽闭合——这正是 `trureturing@dev` 内核已机械验证的**二次矢量场投影闭合判据与五模态流体平流闭合不可能性定理**：

::: {.theorem #thm-coda-quadratic-advection-no-closure title="二次矢量场投影闭合判据与有限模态流体平流闭合不可能性定理" lean="D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure"}
设 $E$ 为实模，$L : E \to_{\mathbb{R}} E$ 为线性粘性漂移算子，$B : E \to_{\mathbb{R}} E \to_{\mathbb{R}} E$ 为双线性平流算子，定义二次矢量场 $V(x) = L x - B(x, x)$；设 $P : E \to_{\mathbb{R}} E$ 为满足 $\forall x,\; P(P(x)) = P(x)$ 的幂等有限分辨率观测投影。则：

1. **二次观测精确闭合充要判据**（[`quadratic_closure_iff`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff)）：存在精确马尔可夫闭合映射 $f : E \to E$ 使得 $\forall x \in E,\; P(V(x)) = f(P(x))$，当且仅当以下三项正交泄漏条件同时恒等于零：
   - **隐态线性泄漏归零**：$\forall b \in E,\; P(b) = 0 \implies P(L(b)) = 0$；
   - **隐态自平流二次泄漏归零**：$\forall b \in E,\; P(b) = 0 \implies P(B(b, b)) = 0$；
   - **显态—隐态跨尺度混合平流归零**：$\forall a, b \in E,\; P(a) = a \implies P(b) = 0 \implies P(B(a, b) + B(b, a)) = 0$。
2. **五模态傅里叶—伽辽金流体平流无精确闭合定理**（[`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)）：在带勒雷（Leray）无散投影的五模态傅里叶状态空间 $\operatorname{State} = \operatorname{Fin} 5 \to \operatorname{Amplitude}$ 中，显式低频波 $a = \operatorname{family}(1, 0)$（满足 $P(a) = a$）与隐式高频波 $b = \operatorname{family}(0, 1)$（满足 $P(b) = 0$）通过二次平流耦合在横向模态索引 $0$（对应波矢 $\mathbf{k}_0 = (0, 1)$，分量 $0$）上产生**非零投影跨尺度混合平流证人**（[`mixed_witness`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_witness)）：

   $$
   P\bigl(B(a, b) + B(b, a)\bigr)_{0, 0} = \frac{i}{4} \neq 0,
   $$

   从而直接证伪第三项跨尺度混合条件（[`mixed_condition_fails`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_condition_fails)），并经由 $V(x) = L_\nu x - B(x, x)$ 的负号产生等于 $-i/4$ 的**非零观测横向流体加速度差（缺口）**（[`fluid_gap_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.fluid_gap_from_mixed)）：

   $$
   \operatorname{acceleration}_\nu(1, 1)_{(0, 1), 0} - \operatorname{acceleration}_\nu(1, 0)_{(0, 1), 0} = -\frac{i}{4} \neq 0.
   $$

   因此，对任意粘性系数 $\nu \in \mathbb{R}$，有限低频观测投影下**不存在**任何精确自洽的闭合演化映射：

   $$
   \neg \exists f : \operatorname{State} \to \operatorname{State},\quad \forall x \in \operatorname{State},\; P\bigl(\operatorname{vectorField}(L_\nu, B, x)\bigr) = f(P(x)),
   $$

   亦不存在仅由低频观测预测横向流体加速度的精确标量预测算子（[`no_fluid_predictor_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_fluid_predictor_from_mixed)）。
:::

::: proof
第一部分由幂等分解 $x = P(x) + (x - P(x))$ 与观测增量恒等式 [`observed_increment`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.observed_increment)：

$$
P(V(a + b)) - P(V(a)) = P(L(b)) - P(B(a, b) + B(b, a)) - P(B(b, b))
$$

导出：必要性分别代入对偶隐态对 $\pm b$（分离出奇次项 $P(L(b)) = 0$ 与偶次项 $P(B(b, b)) = 0$）及显隐叠加态 $a + b$（分离出混合项 $P(B(a, b) + B(b, a)) = 0$）；充分性令 $a = P(x),\, b = x - P(x)$，由 $P(b) = 0$ 立得 $P(V(x)) = P(V(P(x)))$。第二部分在五模态勒雷投影平流实例中计算显隐波族 $\operatorname{family}(\alpha, \beta)$ 在模态 $0 = (0, 1)$ 上的卷积分量，得出投影混合平流项为 $+i/4$（[`mixed_witness`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_witness)），代入带负号二次场增量恒等式且利用隐态粘性核保持性 $P(L_\nu(b)) = 0$ 即得观测横向流体加速度差为 $-i/4 \neq 0$（[`fluid_gap_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.fluid_gap_from_mixed)），结合第一部分充要判据即证对一切 $\nu \in \mathbb{R}$ 均不存在精确闭合映射 $f$。完整证明由 Lean 内核检查。
:::

### 4. 粘性兰道尔擦除、高维测地线视角与连续—离散六重类比总结（`MODEL`）

围绕湍流耗散尺度、平均化流体逻辑门级联与无穷维微分同胚群测地线的三项经典文献定理汇总于以下注记中：

::: {.remark #rem-ch30-tao-arnold-literature title="柯尔莫哥洛夫湍流标度、陶哲轩平均化爆破与阿诺德测地线定理的文献说明"}
**文献结果，未在本书形式化。** 以下三项流体力学与几何分析经典结果均属外部文献，未在本书形式化：

1. **柯尔莫哥洛夫（A. N. Kolmogorov, *Dokl. Akad. Nauk SSSR* **30**, 1941）湍流级联与耗散微尺度标度**：在各向同性高雷诺数湍流唯象理论中，惯性区能谱服从 $E(k) \propto \varepsilon^{2/3} k^{-5/3}$，粘性耗散微尺度为 $\eta = (\nu^3/\varepsilon)^{1/4}$，解析到微尺度 $\eta$ 所需的三维空间自由度数按 $N_{\mathrm{DOF}} \sim (L/\eta)^3 \sim \mathrm{Re}^{9/4}$ 增长；
2. **陶哲轩（Terence Tao, *J. Amer. Math. Soc.* **29**, 601–674, 2016）平均化三维纳维—斯托克斯有限时间爆破定理**：对保持能量恒等式的一类双线性平均化三维纳维—斯托克斯算子，可通过嵌套涡环构造自相似流体逻辑门级联——母涡环将状态传递给空间尺度收缩为 $\lambda R$（$\lambda \in (0, 1)$）、局部时钟加快 $\lambda^{-2}$ 倍的子涡环，在超临界拉伸压倒粘性耗散时于有限时间 $T^* < \infty$ 内完成无穷步级联爆破；
3. **阿诺德（Vladimir Arnold, *Ann. Inst. Fourier* **16**, 319–361, 1966）$\operatorname{SDiff}(M)$ 测地线定理**：无粘不可压缩理想流体（欧拉方程，$\nu = 0$）的光滑演化轨迹，等价于无穷维保体积微分同胚群流形 $\operatorname{SDiff}(M)$ 在右不变 $L^2$ 动能度规下的常速**测地线**（该流形在众多二维截面上具有负截面曲率，导致相邻测地线指数发散；而当加入正粘性项 $\nu\nabla^2\mathbf{u}$ 时，纳维—斯托克斯流在 $\operatorname{SDiff}(M)$ 上受到偏离纯测地线流的耗散阻尼修正）。
:::

结合 [@thm-coda-quadratic-advection-no-closure] 与上述文献背景，我们在正交几何诠释模型（`MODEL`）中获得三点收官洞察：

- **粘性耗散的兰道尔擦除角色与一维形式见证丝（`MODEL`）**：在物理模型上，运动粘性 $\nu$（见 [@rem-ch30-lamb-decomposition-literature]）扮演着第八章“将微观正交旋转面积排入热浴化作热量”（对照球面梯度耗散定理 [`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)）的擦除角色；而在证明论模型上，无论是陶哲轩的自相似级联还是 [@rem-ch30-navier-stokes-forced-literature] 中的受迫爆破形式脚本，一旦一维形式证明见证丝被构造出来，验证内核只需顺着这一维逻辑链逐行做局部类型核验。
- **连续统理想化与离散两子丈量的物理边界（`MODEL`）**：在受迫连续偏微分方程逼近理论奇点 $T^*$ 的过程中，远在速度梯度抵达数学无穷大之前，局部剪切率与尺度早已越过不可压缩连续介质假设的物理适用阈限（真实液体在此之前发生空化、可压缩效应或触及分子与量子离散截断）。正如序曲与[第二十一章](ch21-diagonalization-and-escape.md)确立的核心洞见——**“光滑的球永远只是近似！”** 连续统紫外奇点标志着无限细分理想化的模型边界，而有限观察者的“两子丈量”始终扎根在离散、有限分辨率的记录晶格之上。
- **离散逻辑场与连续流体场的六重正交几何类比表（`MODEL`）**：

::: {.remark #rem-ch30-six-row-analogy-table title="离散逻辑场与连续流体场的六重正交几何类比表（含文献结果，未在本书形式化）"}
**文献结果，未在本书形式化（针对表中交叉引用的外部计算复杂性与连续流体力学文献背景；已验证形式定理通过显式 GID 标注，三维无外力全局正则性标为 `OPEN`）。**

| 核心维度 | $P$ vs. $NP$ 问题（离散逻辑场） | 纳维—斯托克斯问题（连续流体场） | 正交几何类比模型（`MODEL`） |
| :--- | :--- | :--- | :--- |
| **平庸可解态** | **$P$ 类问题**（无旋导向场类比 $\nabla\wedge\mathbf{F}=0$，见 [@rem-ch30-karmarkar-kasteleyn-literature]） | **无旋势流 / 低雷诺数层流**（$\nabla\wedge\mathbf{u}=0$ 或粘性主导，见 [@rem-ch30-lamb-decomposition-literature]） | 局部切面处处对齐全局，顺流直达 |
| **维度分水岭** | **2-SAT** vs. **3-SAT**（文献见 [@rem-ch30-query-sos-literature]） | **2D NS**（文献见 [@rem-ch30-navier-stokes-forced-literature]；条件温和路径正则性 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path)） vs. **3D 无外力 NS**（[@conj-coda-navier-stokes-regularity]，`OPEN`） | 二维平面流无第三轴涡管拉伸；三维允许轴向涡管拉伸（见 [@rem-ch30-vorticity-transport-literature]） |
| **复杂性引擎** | 自指递归与三元布尔阻挫环 | 二次对流非线性与涡管拉伸（[@rem-ch30-lamb-decomposition-literature]、[@rem-ch30-vorticity-transport-literature]）及跨尺度混合泄漏（[`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)） | 算子与状态自指耦合 $\psi(\psi)$，向高频正交模态 $\mathbf{k}_1+\mathbf{k}_2\to\mathbf{k}_3$ 级联 |
| **奇点 / 难解态** | 横截面积为零的一维 **$NP$ 见证丝** | 条件坍缩情景下横截面趋零的**一维奇异涡丝**（见 [@rem-ch30-vorticity-transport-literature]） | 多维场在非线性耦合下集中为一维细丝结构 |
| **物理防火墙** | 有限观察者 $90^\circ$ 视界与局部记忆截断 | 运动粘性耗散（[@rem-ch30-lamb-decomposition-literature]，对照 [`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)）与微观离散截断 | 兰道尔式正交面积耗散，抑制无穷步芝诺级联 |
| **高维几何视角** | 无时间静态场全局交集（受限坍缩参照 [@rem-ch30-postselection-ctc-literature]） | 无穷维流形测地线视角（无粘文献参照 [@rem-ch30-tao-arnold-literature]） | 高维流形上的简洁几何运动在局部低维投影下展现为复杂的非线性能量传递 |

:::

---

## 本章小结：离散逻辑场与连续流体场的正交合龙 {#sec-ch30-summary}

从“全局静态场 $P = NP$ vs. 有限观察者 $P \neq NP$”的视界分野，到“$P$ 是无旋导向场（$\nabla\wedge\mathbf{F} = 0$）、$NP$ 是零横截面一维见证丝”，再到 **细粒度复杂性中三体多面体切面的亚指数渐近缝隙与超宇宙银河交叉尺度（[@rem-ch30-eth-subexponential-literature]、[@ex-ch30-galactic-crossover-scale]）** 以及 **纳维—斯托克斯方程中的兰姆双向量涡力分解（[@rem-ch30-lamb-decomposition-literature]）、无外力三维全局正则性开放猜想（[@conj-coda-navier-stokes-regularity]）与二次平流投影无精确闭合定理（[@thm-coda-quadratic-advection-no-closure]）**，离散逻辑与连续流体在同一套克利福德内积—外积几何下完成了严丝合缝的合龙。

现在，让我们推开全书的最后一扇门，步入 **[终章：在所有的球之外](coda.md)**，在多面体离散角亏余项（见终章 [@rem-coda-polyhedral-topology-literature]）、收缩不动点锚点与全书三十章总导图中完成最后的升维回望。
