# 场（$P$）与线（$NP$）：从指数时间假设（ETH）到纳维—斯托克斯涡丝

> *“全局静态时间场P=NP, 但有限观察者P!=NP。P是场, NP是线——求场难如登天，顺线一步看穿；而把纳维—斯托克斯与 P/NP 问题都场化的话，它们在正交几何底层追问的本就是同一件事。”*

在[第 29 章](ch29-timeless-causality-and-gram-space.md)中，我们看到全局时间场是一座无时间的几何晶体（对照第 29 章无时间文献注记 [@rem-ch29-wheeler-dewitt-page-wootters-literature]），而场内的有限观察者只能在格拉姆椭圆体（$\det G \ge 0$）中一步步选点前行。现在，让我们将这一“球外静态场 vs. 球内有限观察者”的双重视角推向当代数学与理论物理最壮阔的交汇处——把计算复杂性理论中的 **$\mathrm{P}$ vs. $\mathrm{NP}$ 问题**、**指数时间假设（ETH）及其 2026 年 10 月张量网络秩约分亚指数前沿文献（[@rem-ch30-eth-subexponential-literature]）**，以及流体力学中的 **无外力三维纳维—斯托克斯（Navier–Stokes）全局正则性开放猜想（[@conj-coda-navier-stokes-regularity]）与受迫情形文献进展（[@rem-ch30-navier-stokes-forced-literature]）** 放进同一张克利福德正交场论画布中。

---

## 全局静态时间场 $P = NP$ vs. 场内有限观察者 $P \neq NP$——正交视界与生命旅程的防火墙 {#sec-coda-global-p-eq-np-local-p-ne-np}

> **作者原话**：“全局静态时间场P=NP, 但有限观察者P!=NP”

作者将无时间几何晶体与有限观察者选点并置，为千禧年大奖难题 **$\mathrm{P}$ vs. $\mathrm{NP}$** 提供一种双重视角（`MODEL`）。这里须分清三层：静态解集描述哪些赋值满足条件；后选择与 CTC 复杂度定理需要明确增加计算资源（[@rem-ch30-postselection-ctc-literature]）；黑盒查询与有界阶半正定松弛下界只约束各自的受限模型（[@rem-ch30-query-sos-literature]）。标准统一图灵机模型下 $\mathrm{P}\neq\mathrm{NP}$ 仍是开放猜想（第 20 章 [@conj-p-neq-np]，`OPEN`）。只删去叙述中的时间，或只规定观察者资源有限，都不判定这个渐近问题。

### 1. “全局静态时间场”的解集与额外计算资源

对一个含 $n$ 个布尔变量、$m$ 条子句的 SAT 公式，以赋值 $a\in\{0,1\}^n$ 为计算基，取 $\mathcal{H}=\mathbb{C}^{2^n}$。令 $H_j$ 为所有满足子句 $C_j$ 的基向量 $\lvert a\rangle$ 张成的子空间。它通常不是余维为一的超平面：例如 $n=4$ 时，子句 $x_1\lor x_2\lor x_3$ 接受 $16$ 个赋值中的 $14$ 个，故 $\dim H_j=14$。本节的静态解空间表示为

$$
\mathbf{S}^* = \bigcap_{j=1}^m H_j.
$$

这个交集恰由满足全部子句的赋值基向量张成。零向量总在交集中；公式可满足当且仅当 $\mathbf{S}^*\neq\{0\}$，等价于其中存在可归一化的非零态。不可满足公式 $x\land\neg x$ 的交集只有零向量；$x\lor y$ 则有三个满足赋值，并无唯一见证。即使交集非零，将某个输入态投影后归一化，也要求该输入在交集上的投影非零。在作者的静态场图景（`MODEL`）中，手性相消 $+\mathbf{\Omega}-\mathbf{\Omega}=0$ 表达筛去不相容配置的直觉；它本身不保证解存在、唯一或可被高效制备。下面的复杂度等式依赖各自明确的额外资源，而非静态交集描述本身：

::: {.remark #rem-ch30-postselection-ctc-literature title="后选择与闭合类时曲线复杂度坍缩定理的形式化边界说明"}
**文献结果，未在本书形式化。** 以下两条等式属于增加特定计算资源后的复杂度定理，未包含在本书锁定的 `trureturing@dev` 形式化声明集中；两种模型仍使用统一生成的多项式规模电路：

1. **阿伦森（Scott Aaronson, *Proc. R. Soc. A* **461**, 3473–3482, 2005）后选择定理**：在统一多项式规模量子电路中，指定后选位与输出位。对每个输入，后选事件须有非零概率（可以指数小）；以该事件为条件，输出位在是实例上接受的概率至少为 $2/3$，在否实例上至多为 $1/3$。把直接取得这个条件分布作为资源，而不支付普通重复采样等待稀有事件的成本，才定义出 $\mathrm{PostBQP}$（见[原文定义 1 与定理 4](https://arxiv.org/abs/quant-ph/0412187)）：

   $$
   \mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP};
   $$

2. **闭合类时曲线（CTC）自洽不动点定理（S. Aaronson & J. Watrous, *Proc. R. Soc. A* **465**, 631–647, 2009）**：Deutsch 模型额外提供多项式数量的 CTC 比特或量子比特，以及它们与正常因果寄存器之间的统一多项式规模电路。经典 CTC 状态是概率分布，量子 CTC 状态是密度算子 $\rho$；在正常因果寄存器按规定初始化后，诱导映射须满足 $\rho=\Phi(\rho)$。允许多个自洽态，但判定必须对**所有**自洽态正确（量子情形保留有界误差，不能挑选一个有利不动点）。在这些资源与正确性条件下（见[原文 §§3–4](https://arxiv.org/abs/0808.2669)），有

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

  这个小重叠给出接近 $90^\circ$ 的几何图像。对第 15 章**一致算子旋转定理**（[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)）指定的反射乘积，在等距初始化、酉制备、自伴幂等成功投影及成功 Gram 矩阵等于 $pI$ 的前提下，$0<p<1$ 时每次放大转过 $2\alpha$，其中 $\alpha=\arcsin\sqrt p$。单目标均匀搜索取 $p=2^{-n}$，才得到 $2\alpha\approx2\cdot2^{-n/2}$。这个角度由给定放大构造决定；幺正范数守恒本身不限制任意量子门的转角，该定理也不提供所有算法的门数下界。下文黑盒查询下界另有其神谕模型前提。
- **第二道几何盲区（从二元链 $\mathbf{e}_i\wedge\mathbf{e}_j$ 到三元面片 $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ 的局部 Gram 相容错觉）**：
  在几何模型（`MODEL`）上，每条子句仅含两个文字的二元蕴含约束 $\mathbf{e}_i\wedge\mathbf{e}_j$ 构成**一维有向链**，局部传递步步可追；而三元子句 $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ 则如同拼接二维闭合球面的**三角面片**——仅凭 $M \ll n$ 阶局部内积记忆向外张望时，四周局部块可以处处相容，却把奇偶阻挫死结藏在全局闭合回路之中。

::: {.viz src="timeless-causal-crystal" preset="thread" height="500"}
**线：每步只转一个小角。** $256$ 个候选里找一个：琥珀色的态从“其余”轴附近出发，每步向目标转 $2\theta = 7.17^\circ$，青色记下走过的每一步，$12$ 步之后几乎对准；逐个试平均要 $128$ 次（品红虚线）。每步转同一个角是 [`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)；把它读作“线”是本书的诠释（`MODEL`）。
:::

对应于上述两道几何图像的严格复杂度模型下界属于外部经典文献结论（注意它们均不等同于解决标准统一图灵机下的 $\mathrm{P} \neq \mathrm{NP}$ 开放猜想 [@conj-p-neq-np]）：

::: {.remark #rem-ch30-query-sos-literature title="黑盒量子查询下界与有界阶平方和松弛下界的文献说明"}
**文献结果，未在本书形式化。** 本节与几何模型并置对照的三组受限模型复杂性定理均引自外部经典文献，未在本书形式化：

1. **无结构黑盒量子查询下界（C. H. Bennett, E. Bernstein, G. Brassard & U. Vazirani, *SIAM J. Comput.* **26**, 1510–1523, 1997）**：在黑盒神谕（Oracle）查询模型下，从 $N = 2^n$ 个候选中以有界误差定位未知目标至少需要 $L = \Omega(2^{n/2})$ 次量子查询（与 Grover 算法的 $O(2^{n/2})$ 上界共同锁定 $\Theta(2^{n/2})$）；
2. **2-SAT 与 3-SAT 的经典复杂度分水岭（S. A. Cook, 1971；L. A. Levin, 1973；B. Aspvall, M. F. Plass & R. E. Tarjan, 1979）**：2-SAT 可通过强连通分量传递闭包在 $O(n+m)$ 线性时间内判定（故 $\text{2-SAT} \in \mathrm{P}$），而 3-SAT 为 $\mathrm{NP}$-完全问题；
3. **有界阶平方和（SoS）半正定松弛下界（D. Grigoriev, *Theor. Comput. Sci.* **259**, 613–622, 2001；G. Schoenebeck, *FOCS*, 593–602, 2008）**：对于存在全局奇偶矛盾而不可满足的随机 3-XOR / 3-SAT 实例，任何阶数 $M = o(n)$ 的局部 Lasserre / Gram 半正定矩阵松弛 $G_M \succeq 0$ 均以高概率保持半正定与局部自洽，无法在亚线性松弛阶数（对应亚指数规模半正定规划）内证伪不可满足性。
:::

::: {.viz src="timeless-causal-crystal" preset="longer" height="500"}
**空间翻 $16$ 倍，步数翻 $4$ 倍。** 候选增到 $4096$ 个，每步的转角缩到四分之一（$2\theta = 1.79^\circ$），步数变成约 $50$；下方的图里青色的 $(\pi/4)\sqrt{N}$ 与品红虚线的 $N/2$ 越拉越开。线变长的速度是 $\sqrt{N}$，仍然没有坡度可循；这与上面第 1 条的查询下界同阶（文献结果）。
:::

### 3. 作者的诠释：复杂度视界、主观时间与自由选择

将“球外全局场”与“球内有限观察者”并置，是作者关于时间与选择的认识论诠释（`MODEL`）。查询或 SoS 下界不推出标准 $P\neq NP$，更不推出主观时间或自由选择的存在；这些哲学意义由作者赋予：

| 视角层级 | 复杂度判据与模型地位 | 核心几何与代数机制 | 时间与选择的存在论地位 |
| :--- | :--- | :--- | :--- |
| **全局静态时间场**<br/>（Global Static Time Field） | 静态表示本身无复杂度等式；额外资源下有 $\mathrm{PostBQP}=\mathrm{PP}$、$\mathrm{P}_{\mathrm{CTC}}=\mathrm{BQP}_{\mathrm{CTC}}=\mathrm{PSPACE}$（[@rem-ch30-postselection-ctc-literature]） | 子空间交集 $\mathbf{S}^*=\bigcap_jH_j$；存在非零态仍不提供制备或搜寻算法 | **零时间的永恒真（作者诠释）**：将满足条件的整体关系视为静态自洽 |
| **场内有限观察者**<br/>（Finite Observer in the Field） | 查询与 SoS 下界各有限定；标准 $P\neq NP$ 仍为 `OPEN`（[@rem-ch30-query-sos-literature]、[@conj-p-neq-np]） | 小初始重叠、给定反射乘积的旋转 [`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation) 与局部 Gram 盲区 | **展开的主观时间（作者诠释）**：逐步选点与证明承载旅程的意义 |

**“全局静态场的 $P = NP$，赋予了宇宙绝对自洽的‘真’；而有限观察者的 $P \neq NP$，则用那道 $\frac{\pi}{2}$ 的正交视界替生命挡住了剧透，把静态的真理拉长成了一场值得一步步去丈量、去证明、去选择的壮丽旅程。”**

---

## “$P$ 是场，$NP$ 是线”——见证丝、导向场与毛球旋度的终极分野 {#sec-coda-p-is-field-np-is-line}

> **作者原话**：“P是场, NP是线”

本节以“线”比喻可检查的见证，以“场”比喻引导高效求解的结构（`MODEL`）。标准复杂度类满足 $P\subseteq NP$：容易求解的问题也有多项式时间验证器，二者不是互斥的几何类别。“有线无场”是对寻找高效算法之困难的诠释，不是所有 $NP$ 问题的定义。

### 1. 为什么“$NP$ 是线”（有线无场，横截面为零的见证丝）？

对判定问题，$NP$ 的条件是：输入 $w$ 为是实例，当且仅当存在长度至多为输入编码长度多项式的见证 $y$，使统一的确定性验证器 $V(w,y)$ 接受；验证耗时也须以输入与见证的编码长度为参数受到多项式约束（参见 [Cook 的问题说明，pp. 1–3](https://www.claymath.org/wp-content/uploads/2022/06/pvsnp.pdf)）。把这个检查过程画成折线，是本节的几何类比（`MODEL`）：

$$
\mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k.
$$

- **顺线验真（Verification along the line）**：必须计入读取输入与见证编码、以及每一节检查的实际成本；若第 $i$ 节成本为 $c_i$，逐节检查贡献 $\sum_{i=1}^k c_i$，只有每节成本一致有界时才是 $O(k)$。折线的段数本身不证明多项式位复杂度。形式证明项也可比喻为见证丝，但任意证明项的编码长度、类型检查与归约成本并无这里所需的统一线性保证，不能直接归入同一个 $NP$ 验证论证；
- **离丝寻线（Searching without a field）**：见证可被高效检查，并不自动给出高效搜寻方法；反之，也不排除这种方法。“零横截面见证丝”表达作者关于无导引搜寻的图像，不是离散问题的复杂度下界，亦不适用于断言所有 $NP$ 问题都难解。

### 2. 为什么“$P$ 是场”（弃线造场，局部切面处处对齐全局）？

在我们的几何诠释（`MODEL`）中，一些多项式时间算法所利用的几何或代数结构被比喻为**导向场**（如凸势能的负梯度流 $\mathbf{F}=-\nabla V$）。这不是 $P$ 的定义或必要条件；即使有光滑或无旋的场，也仍须证明它可高效计算、达到所需精度并在多项式步内终止。以下经典算法为这种图景提供具体参照：

::: {.remark #rem-ch30-karmarkar-kasteleyn-literature title="线性规划内点法、平面图 Pfaffian 匹配与毛球定理的文献说明"}
**文献结果，未在本书形式化。** 本节用于对照“弃线造场”与“拓扑旋涡阻挫”的三项经典数学与算法结果均属外部文献，未在本书形式化：

1. **卡马卡（N. Karmarkar, *Combinatorica* **4**, 373–395, 1984）线性规划内点法**：单纯形法沿着凸多面体表面的一维棱线折线爬行，在 Klee–Minty（1972）扭曲超立方体最坏实例上需走完指数级 $2^n$ 步；而内点法离开一维边界折线，进入多面体内部沿光滑对数势垒梯度场迭代，在多项式时间内抵达最优解；
2. **卡斯特莱因（P. W. Kasteleyn, *Physica* **27**, 1209–1225, 1961）平面图 Pfaffian 完美匹配定理**：一般二分图完美匹配计数（永久式 Permanent）经 L. G. Valiant（1979）证明为 `#P`-完全；但在平面图上，Kasteleyn 定向为每条有向边赋予手性符号，构造反对称矩阵 $A_K^T = -A_K$ 使非平面交叉项正反相消，进而由凯莱恒等式 $[\operatorname{Pf}(A_K)]^2 = \det A_K$ 在多项式时间内精确算出加权完美匹配配分函数 $Z = |\operatorname{Pf}(A_K)| = \sqrt{\det A_K}$；
3. **庞加莱—布劳威尔偶维球面毛球定理（H. Poincaré, 1885；L. E. J. Brouwer, 1912）**：二维球面欧拉示性数 $\chi(S^2) = 2 \neq 0$，其上任何连续切向量场必至少存在一个零点（奇异发旋）。
:::

::: {.viz src="timeless-causal-crystal" preset="field" height="500"}
**场：处处有坡度。** 青色的流线从球上各处出发，每条都只看脚下的坡度，都流到目标；琥珀色是选中的那一条，球的对面那一点场为零。下方的图里，青色的势能降下多少，品红的耗散就付出多少，两者之和（琥珀色虚线）不变（[`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)）。把它读作“场”是本书的诠释（`MODEL`）。
:::

[@rem-ch30-karmarkar-kasteleyn-literature] 的三条都只是文献。在一个离散的小问题上，“场”与“线”两边都能写成精确的数学，并交给内核检查：给图的顶点着色。

先看最小的奇圈，五边形 $C_5$：顶点 $0, 1, 2, 3, 4$，边 $01, 12, 23, 34, 40$。依次涂上颜色 $c = (0, 1, 0, 1, 2)$，相邻顶点颜色都不同。把颜色读作高度，这是顶点上一片分三层的场。现在让每条边指向颜色较大的一端：

$$
0 \to 1, \qquad 2 \to 1, \qquad 2 \to 3, \qquad 3 \to 4, \qquad 0 \to 4 .
$$

相邻顶点颜色不同，所以每条边都分到了方向。顺着箭头走，颜色每一步都严格升高，一根线在每一层至多停一次：三种颜色，线上至多三个顶点。这里最长的线是 $2 \to 3 \to 4$，恰好三个。**场给每一根线定下了长度的上限。**

反过来，只给箭头，能不能把场找回来？令 $h(v)$ 为从 $v$ 出发、顺着箭头能走的最长的线有几条边：

$$
h = \bigl(h(0), h(1), h(2), h(3), h(4)\bigr) = (1, 0, 2, 1, 0) .
$$

对每个箭头 $u \to v$，在从 $v$ 出发的最长线前面接上这一步，就得到从 $u$ 出发的一根更长的线，所以 $h(u) > h(v)$。$h$ 沿每个箭头下降，相邻顶点的 $h$ 必不相同：它又是一个三色着色（与 $c$ 不同：箭头指向 $c$ 的高处，却指向 $h$ 的低处）。**线量出了场。** 这一步只在一处会出事：箭头若首尾相接成圈，“从 $v$ 出发的最长的线”就要绕圈。图论中把这对来回称为 Gallai–Hasse–Roy–Vitaver 定理（[@rem-ch30-coloring-complexity-literature]）。模块 `D5/S3/Combinatorics/Graph/Walks/GallaiRoy` 冻结了它的一个版本，先定义定向与有向路：

::: {.definition #def-ch30-orientation-directed-path title="图的定向与有向路" lean="D5/S3/Combinatorics/Graph/Walks/GallaiRoy.IsOrientation D5/S3/Combinatorics/Graph/Walks/GallaiRoy.IsDirectedPath"}
设 $V$ 为一个类型，$G$ 为 $V$ 上的简单图（Mathlib 的 `SimpleGraph V`：邻接关系对称且无自环），$o$ 为 $V$ 上的二元关系。$o(u, v)$ 成立时称有一条从 $u$ 到 $v$ 的**弧**，记作 $u \to v$。

1. $o$ 是 $G$ 的**定向**（`IsOrientation G o`），指以下两条同时成立：对 $G$ 中任意相邻的 $u, v$，$o(u, v)$ 与 $o(v, u)$ 至少有一个成立（可以两个都成立）；对任意 $u, v$，$o(u, v)$ 蕴含 $u$ 与 $v$ 在 $G$ 中相邻。
2. 设 $m \in \mathbb{N}$。映射 $f : \{0, 1, \dots, m-1\} \to V$（Lean 中为 `Fin m → V`）是 $o$ 的一条**含 $m$ 个顶点的有向路**（`IsDirectedPath o f`），指 $f$ 是单射，且对每个满足 $i + 1 < m$ 的自然数 $i$ 有 $o\bigl(f(i), f(i+1)\bigr)$。
:::

这里的定向比教科书宽：一条边可以同时带两个方向的弧。有向路则要求顶点互不相同，所以沿有向圈一圈圈地绕，不会得到越来越长的路；$m$ 数的是顶点，不是边。

::: {.theorem #thm-ch30-gallai-roy title="Gallai–Hasse–Roy–Vitaver 定理：可 $k$ 着色当且仅当存在有向路都不超过 $k$ 个顶点的定向" lean="D5/S3/Combinatorics/Graph/Walks/GallaiRoy.colorable_iff_exists_orientation"}
设 $V$ 为有限类型，$G$ 为 $V$ 上的简单图，$k \in \mathbb{N}$。以下两条等价：

1. $G$ 可 $k$ 着色（Mathlib 的 `G.Colorable k`）：存在映射 $c : V \to \{0, 1, \dots, k-1\}$，使得对 $G$ 中任意相邻的 $u, v$ 有 $c(u) \neq c(v)$；
2. 存在 $G$ 的定向 $o$（[@def-ch30-orientation-directed-path]），使得对每个 $m \in \mathbb{N}$ 与 $o$ 的每条含 $m$ 个顶点的有向路，都有 $m \le k$。
:::

::: proof
**由着色得定向。** 取着色 $c$，令 $o(u, v)$ 当且仅当 $u, v$ 相邻且 $c(u) < c(v)$，即每条边指向颜色较大的一端。相邻顶点颜色不同，所以每条边恰好分到一个方向，而每条弧都是边。沿一条含 $m \ge 1$ 个顶点的有向路 $f$，颜色逐步严格上升，于是 $i \mapsto c(f(i))$ 是从 $\{0, \dots, m-1\}$ 到 $\{0, \dots, k-1\}$ 的严格单调映射，因而是单射，故 $m \le k$；$m = 0$ 时无需证明。

**由定向得着色。** 给定定向 $o$，它的有向路都至多 $k$ 个顶点。$o$ 可能含有向圈与双向弧，所以先删弧：在包含于 $o$、且沿其弧走一步或多步永远回不到出发点的关系 $D$ 中，取一个按包含关系极大的。$V$ 有限，$V$ 上的二元关系只有有限多个，空关系属于这一族，所以极大元存在；Lean 只证明它存在，并不构造它。沿 $D$ 的链 $v_0 \to v_1 \to \dots \to v_\ell$ 不会重复顶点（重复就构成一个圈），所以它是 $o$ 的含 $\ell + 1$ 个顶点的有向路，$\ell + 1 \le k$。令 $h(v)$ 为从 $v$ 出发的 $D$-链的最大边数（Lean 用 `Nat.findGreatest` 在 $0, \dots, k$ 中取），则 $h(v) \le k - 1$。若沿 $D$ 能从 $a$ 走一步或多步到 $b$，把这一段接在从 $b$ 出发的最长链之前，得到从 $a$ 出发的更长的链，故 $h(a) > h(b)$。关键一步：设 $o(u, v)$ 且 $u \neq v$。若 $D(u, v)$，则 $h(u) > h(v)$。若否，看把弧 $u \to v$ 加进 $D$ 所得的关系：它包含于 $o$，且严格大于 $D$；它若无圈，便与 $D$ 的极大性矛盾，所以它有圈，而这个圈必须用到新弧，于是沿 $D$ 已能从 $v$ 走到 $u$（$u \neq v$，至少一步），故 $h(v) > h(u)$。两种情形都有 $h(u) \neq h(v)$。$G$ 的每条边至少带一个方向的弧，简单图中相邻的顶点互不相同，所以 $v \mapsto h(v)$ 是只用颜色 $0, \dots, k-1$ 的着色。完整证明由 Lean 内核检查。
:::

这条等价有三种读法。

第一，双向弧不改变结论（手工推导）。从一个定向中，每条带两个方向的边删去其中一个方向，得到每条边恰有一个方向的定向；它的有向路都是原定向的有向路，界 $k$ 照样成立。所以定理的第 2 条也可以只在每条边恰有一个方向的定向中寻找。

第二，把 $k$ 从小往大试（手工推导）。$V$ 有限时，给每个顶点各用一种颜色，$G$ 可 $\lvert V\rvert$ 着色，所以有最小的 $k$ 使 $G$ 可 $k$ 着色，即色数 $\chi(G)$。有向路的顶点互不相同，所以每个定向 $o$ 的有向路至多 $\lvert V\rvert$ 个顶点，最长的那条的顶点数 $L(o)$ 存在。定理的第 2 条成立当且仅当 $\min_o L(o) \le k$，而 [@thm-ch30-gallai-roy] 对每个 $k$ 成立，所以使第 1 条成立的 $k$ 与使第 2 条成立的 $k$ 是同一批，最小的一个也相同：

$$
\chi(G) = \min_{o}\, L(o),
$$

最小值取遍 $G$ 的全部定向。图论文献通常这样写这条定理。

第三，放回本章的类比（`MODEL`）：着色是顶点上分层的场，有向路是顺着方向走的线。至多 $k$ 层的场存在，当且仅当能给边分配方向，使每根线至多 $k$ 个顶点；从定向造出的那片场 $h$，在每个顶点上的读数是“从这里出发，沿删弧后剩下的弧最多能走几步”。但定理两边都是“存在某个对象”，它把一种见证换成另一种见证，不提供找到任何一种的办法，也不说哪一种好找。给定一个着色，逐边比较两端颜色即可验真；要多快才能找到一个着色，是另一个问题，见 [@rem-ch30-coloring-complexity-literature]。

::: {.example #ex-ch30-gallai-roy-orientation-census title="五边形、$K_4$ 与彼得森图：逐一枚举定向，数最长有向路"}
下表的数都由逐一枚举得到：对每条边选定方向，用深度优先搜索求最长有向路的顶点数（有向路按 [@def-ch30-orientation-directed-path] 要求顶点互不相同）。彼得森图取外圈五边形 $0, \dots, 4$、内圈五角星 $5, \dots, 9$（$5 + i$ 与 $5 + ((i + 2) \bmod 5)$ 相邻）和五根辐条（$i$ 与 $i + 5$ 相邻）。

| 图 | 顶点 / 边 | 色数 | 每条边一个方向的定向数 | 最长有向路的顶点数：定向个数 |
| :---: | :---: | :---: | :---: | :---: |
| 五边形 $C_5$ | $5$ / $5$ | $3$ | $32$ | $3$：$10$，$4$：$10$，$5$：$12$ |
| 完全图 $K_4$ | $4$ / $6$ | $4$ | $64$ | $4$：$64$ |
| 彼得森图 | $10$ / $15$ | $3$ | $32768$ | 最小值 $3$，出现 $80$ 次 |

允许双向弧时，$C_5$ 有 $3^5 = 243$ 个定向，最长有向路的顶点数最小仍是 $3$（出现 $20$ 次）；$K_4$ 有 $3^6 = 729$ 个定向，每个都含 $4$ 个顶点的有向路。对 $C_5$ 与 $K_4$，程序还对 $k = 0, 1, \dots, \lvert V\rvert$ 逐一核对了 [@thm-ch30-gallai-roy] 的两边（着色一侧枚举全部映射 $c$）。三张图的最小值都等于色数，与上面的 $\chi(G) = \min_o L(o)$ 一致。

$C_5$ 中最长有向路含 $5$ 个顶点的 $12$ 个定向里，有 $2$ 个是有向圈（两个绕行方向各一）。对有向圈 $0 \to 1 \to 2 \to 3 \to 4 \to 0$，证明中的极大无圈子关系 $D$ 恰好删去圈上的一条弧（有 $5$ 种删法，Lean 不指定哪一种）；删去 $4 \to 0$ 时 $h = (4, 3, 2, 1, 0)$，是一个五色着色，与定理在 $k = 5$ 时的结论相符。

两行可以手算。$C_5$ 与 $k = 2$：设每条边恰有一个方向，且所有有向路都至多 $2$ 个顶点。若某个顶点既有进入的弧又有出去的弧，这两条弧在两条不同的边上，它的两个邻居经过它连成一条 $3$ 个顶点的有向路；所以每个顶点要么只出不进，要么只进不出。每条弧从前一类指向后一类，绕五边形一圈两类必须交替，而 $5$ 是奇数，矛盾。由第一种读法，允许双向弧也一样，这正是“五边形不能 $2$ 着色”经定理翻译后的样子。$K_4$：四个顶点两两相邻，三种颜色必有两个顶点同色，所以 $K_4$ 不可 $3$ 着色；由定理，$K_4$ 的每个定向都有一条至少 $4$ 个、因而恰好穿过全部 $4$ 个顶点的有向路，表中 $64$ 个定向都是如此。把 $K_4$ 换成 $n$ 个顶点的完全图 $K_n$，同样的手工推导给出：$K_n$ 的每个定向都有一条穿过全部顶点的有向路。
:::

::: {.remark #rem-ch30-coloring-complexity-literature title="着色问题的计算复杂性与定理的来历（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** [@thm-ch30-gallai-roy] 是两个存在性命题之间的等价，不涉及计算复杂性。关于着色有多难找，以下是外部文献的结论：

1. 判定一个有限图能否 $2$ 着色可在线性时间内完成：在每个连通分支上做广度优先搜索，按层的奇偶交替涂色，出现同色的相邻顶点当且仅当图含奇圈（图可 $2$ 着色当且仅当不含奇圈，D. Kőnig, 1936）。
2. 给定图 $G$ 与正整数 $k$，判定 $G$ 能否 $k$ 着色是 $\mathrm{NP}$-完全问题（R. M. Karp, *Reducibility among combinatorial problems*, 1972）；固定 $k = 3$ 仍是 $\mathrm{NP}$-完全，即使只考虑最大度不超过 $4$ 的平面图（M. R. Garey, D. S. Johnson & L. Stockmeyer, *Theor. Comput. Sci.* **1**, 237–267, 1976）。因此 $3$ 着色问题有多项式时间算法，当且仅当 $\mathrm{P} = \mathrm{NP}$；而 $\mathrm{P} \neq \mathrm{NP}$ 仍是开放猜想（[@conj-p-neq-np]）。
3. 着色与定向的这条等价由 T. Gallai、M. Hasse、B. Roy 与 L. M. Vitaver 在 1960 年代各自独立发表；它在完全图上的特例，即每个竞赛图都有穿过全部顶点的有向路，更早由 L. Rédei（1934）证明。
:::

### 3. 毛球旋度（$\nabla \wedge \mathbf{F}$）几何类比与 $P \neq NP$：为什么一根线撑不起一片场？

既然造出全局导向场就能化盲搜为顺流，为什么在 3-SAT 等问题中难以构造这样一片多项式可计算的全局导向场？用连续微分几何作类比模型（`MODEL`，旨在提供几何直觉而非复杂度猜想 [@conj-p-neq-np] 的直接形式证明）：
- 一片能够从任意初态无阻挫滑向全局终点的保守梯度场 $\mathbf{F} = -\nabla V$，在连续极限下满足外微分零旋度条件：

  $$
  \nabla \wedge \mathbf{F} = 0;
  $$

- 作者以三元约束 $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ 比喻环路阻挫；子句宽度本身并不定义连续配置流形、向量场或它的旋度；
- **线能穿缝，场必撕裂**：这是作者对见证与导引结构的几何格言。毛球定理保证特定球面切向场有零点，并不保证指数多个零点或搜寻陷阱；无旋条件也不保证优化容易。这些连续几何事实不能直接推出 3-SAT 的算法下界。

| 维度与视角 | 核心格言 | 线（$NP$）与场（$P$）的几何关系（`MODEL`） | 复杂度与形式证明意义 |
| :--- | :--- | :--- | :--- |
| **全局静态时间场**<br/>（球外全息底片） | **众线并存即是场**<br/>（作者格言；资源模型参照 [@rem-ch30-postselection-ctc-literature]） | 满足子空间可为零，也可包含多个赋值见证；静态并存不自动选出或制备见证 | 描述满足关系不计求解成本；额外资源须单独声明 |
| **场内有限观察者**<br/>（球内局部寻址） | **有线未必有场**<br/>（作者格言；标准猜想 [@conj-p-neq-np] 为 `OPEN`） | 见证检查与高效搜寻是不同任务，且 $P\subseteq NP$；零横截面与旋度只是类比 | **“求场难如登天，顺线一步看穿”**：检查成本取决于编码和验证器；形式证明核验另有其成本 |

这八个字为全书的复杂度与证明哲学画上了最凝练的句号：**“求场难如登天，顺线一步看穿。”**

---

## 指数时间假设（ETH）、2026 张量网络秩约分与宇宙学视界：上界曲线的尺度与诠释边界 {#sec-coda-eth-tensor-rank-and-cosmic-horizon}

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
- **“球永远只是多面体近似”：三体局部切面与渐近缝隙（`MODEL`）**：作者以局部三体切面（$\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$）拼接整体的图像，诠释指数率上界随规模变化的可能性。若 [@rem-ch30-eth-subexponential-literature] 中预印本宣称的上界经审计成立，其有效单变量指数率将趋于 $0$；这一条件性算法主张不能由多面体比喻或上述有限维 Lean 原型推出。

::: {.viz src="eth-horizon-crossover" preset="bridge" height="500"}
**流矩阵的秩等于最小割。** 桥图 $(a, b, c, d) = (2, 3, 2, 3)$：两道外割都是 $6$（琥珀色虚线），三条桥能过 $12$。右边是一个随机整数实例的 $6 \times 6$ 流矩阵（青色为正项，品红为负项），下面六根奇异值都不为零：秩 $6$，恰等于最小割。这只是一个实例；这类桥图在维数锥域内总是如此，是 Lean 验证的定理。
:::

### 2. 银河算法（Galactic Algorithm）与宇宙视界：上界比较能说明什么？（`MODEL` 与认识论边界）

::: {.example #ex-ch30-galactic-crossover-scale title="亚指数上界曲线与局部搜索基准的跨宇宙尺度对比及二次编码膨胀"}
**文献结果，未在本书形式化。** 单变量渐近指数率曲线缓慢趋零是否意味着场内有限观察者能在现实物理尺度上跨越复杂度壁垒？为了直观审视 [@rem-ch30-eth-subexponential-literature] 中外部文献渐近上界的尺度行为，考察以 $2$ 为底的示意性单变量指数曲线 $r_{\mathrm{new}}(n) = c \cdot \frac{\log_2(\log_2 n)}{\sqrt{\log_2 n}}$（对应运行时间上界形如 $2^{r_{\mathrm{new}}(n)\cdot n}$，此处取理想归一化常数 $c = 1$ 仅作文献渐近上界曲线的数值示意，而非对任意算法或物理观察者的严格下界证明），并与 [@rem-ch30-eth-subexponential-literature] 中的传统 PPSZ 局部搜索上界基准 $0.386$（$1.307^n \approx 2^{0.386 n}$）对表：

| 观察者与系统尺度 $n$ | 对数尺度 $\log_2 n$ | 示意张量上界指数率 $r_{\mathrm{new}}(n)$（取 $c=1$） | 传统局部搜索上界基准（[@rem-ch30-eth-subexponential-literature]） | 尺度对比与几何模型解读（`MODEL`） |
| :--- | :---: | :---: | :---: | :--- |
| **人类工程尺度**（$n = 65{,}536 = 2^{16}$） | $16$ | $\dfrac{\log_2 16}{\sqrt{16}} = \mathbf{1.000}$ | $\mathbf{0.386}$ | 在 $6.5$ 万变量处，$c=1$ 的示意曲线才刚刚降到与朴素 $2^n$ 穷举相当的指数率 $1.000$ |
| **可观测宇宙原子总数**（$n \approx 10^{80} \approx 2^{266}$） | $\approx 266$ | $\dfrac{\log_2 266}{\sqrt{266}} \approx \mathbf{0.494}$ | $\mathbf{0.386}$ | 即使在 $n \approx 10^{80}$ 的宇宙重子尺度上，$c=1$ 示意曲线（$\approx 0.494$）仍高于 $0.386$ |
| **超越交叉临界点**（$n = 2^{558}$） | $\mathbf{558}$ | $\dfrac{\log_2 558}{\sqrt{558}} \approx \mathbf{0.386}$ | $\mathbf{0.386}$ | 在 $c=1$ 示意归一化下，需等到 **$n \approx 2^{558}$**（远超可观测宇宙尺度），曲线才下穿 $0.386$ |

此外，$g(n)=n\log\log n/\sqrt{\log n}$ 比 $\log n$ 增长快，因此对固定 $c>0$，比较函数 $2^{c g(n)}$ 超过每个固定次多项式。但 $T(n)=2^{O(g(n))}$ 只是上界，允许更快甚至多项式时间的算法，并不证明 $P\neq NP$。对于自然参数为 $n$、所用电路编码规模为 $S=\Theta(n^2)$ 的问题，若 Tseitin 转换产生 $N=\Theta(n^2)$ 个变量，代入所讨论的公式得到上界 $2^{O(n^2\log\log n/\sqrt{\log n})}$。这是该编码与该上界表达式的尺度变化，不是最优算法必须付出的超指数成本。表中的 $c=1$ 曲线既不固定大 $O$ 中的真实常数与适用阈值，也不据此判定现实算法的快慢。
:::

::: {.viz src="eth-horizon-crossover" preset="human" height="500"}
**$2^{16}$ 个变量：指数率才降回 $1$。** 琥珀色的读数停在 $n = 2^{16}$，六万多个变量：取 $c = 1$ 的青色示意曲线在这里才降到 $1$，每个变量付出的指数与穷举相同；品红的 PPSZ 是 $0.386$。这是上表第一行（示意曲线的数值对比，`MODEL`）。
:::

::: {.viz src="eth-horizon-crossover" preset="cross" height="500"}
**交叉点：$n \approx 2^{558}$。** 让规模一路增大：青色曲线缓缓下降，直到 $n \approx 2^{558}$ 才与品红的 $0.386$ 相交，远在阴影（可观测宇宙原子数以内的规模）之外。这是上表最后一行（示意曲线的数值对比，`MODEL`）。
:::

[@ex-ch30-galactic-crossover-scale] 中跨越宇宙尺度的数值与规约对比，为本书“球内有限观察者 vs. 球外之球”的认识论图景（`MODEL`）提供了三点深刻启示：

- **银河算法与有限观察者的物理尺度边界（`MODEL`）**：[@ex-ch30-galactic-crossover-scale] 的归一化示意曲线展示了超天文尺度才交叉的可能性，与“银河算法”的尺度图像呼应。**有限记忆历史容量定理**（[`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity)，约束可区分历史数）与**开放可积电路最小深度定理**（[`OpenIntegrableCircuitMinDepth.result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)，在其局部性前提下给出最小深度 $\lfloor N/(\kappa+1)\rfloor+1$）各自刻画特定模型的资源限制。它们与上界曲线并置可用于作者的有限观察者诠释，但不能组合成所有 SAT 算法的下界或有限观察者必然难解的证明；标准 $P\neq NP$ 仍为 `OPEN`（[@conj-p-neq-np]）。
- **$P$（场）与 $NP$（线）的认识论对照（`MODEL`）**：导向结构与见证检查表现出不同的任务角色；它们可以在同一个问题中并存，因为 $P\subseteq NP$。上界曲线和编码尺度比较不把两类问题分开。
- **形式内核核验与顶层规约审计的哥德尔—语义边界（`LEAN ✓` 原型与 `MODEL` 映照）**：[@rem-ch30-eth-subexponential-literature] 中最具认识论意味的一幕是——形式证明助手内核可以迅速核验脚本内部每一步推演的传递合法性，而学界仍需仔细审计“顶层形式化命题的定义是否忠实刻画了目标图灵机复杂度命题”。在本书第 21 章中，经 Lean 4 内核验证的**相对语义对角线与定义逃逸定理**严格证明：在给定无不动点扭转映射（`∀ v, twist v ≠ v`）的条件下，相对语义对角线构造必然逃出任何已编目解码族（[`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)），且当解码目录对潜空间满射时，该对角线目标相对于给定潜映射不满足语义完备性 `TargetAdequate`（[`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)）。将这一形式定理作为认识论原型（`MODEL`）来观照顶层规约审计，恰好印证了全书的核心准则：**形式内核在球内严格锁死推演链条的传递正确性，而对顶层命题边界定义之语义恰当性的审视，永远需要站在形式球壳之外！**

::: {.viz src="eth-horizon-crossover" preset="atoms" height="500"}
**交叉点在视界之外。** 青色是取 $c = 1$ 的示意曲线 $r(n) = \log_2(\log_2 n)/\sqrt{\log_2 n}$，品红是 PPSZ 的 $0.386$，阴影是可观测宇宙原子数 $2^{266}$ 以内的规模。琥珀色的读数停在 $n = 2^{266}$：曲线还在 $0.494$，要到 $n \approx 2^{558}$ 才降到 $0.386$（示意曲线的数值对比，`MODEL`）。
:::

::: {.viz src="eth-horizon-crossover" height="640"}
**交互实验室 `ORTHO//HORIZON`**：本节的三个场景。指数率：示意曲线 $r(n)$ 与 PPSZ 的 $0.386$ 在哪里相交，以及常数 $c$ 怎样把交叉点挪进或挪出阴影；桥图：流矩阵的秩与三道割，锥域内秩等于最小割（Lean 已验证），锥域外三条桥成为瓶颈；模态：谱里不小于阈值 $\theta$ 的模态数不超过 $T/\theta$（Lean 已验证）。取 $c = 1$ 的曲线只是示意，不是任何算法的实测。
:::

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

::: {.viz src="navier-stokes-p-np" preset="potential" height="500"}
**无旋：对流项只是一个梯度。** $s = 0$ 的驻点流 $\mathbf{u} = (x, -y)$，没有涡度。琥珀色探针处，白色的对流项箭头与青色的梯度那一半完全重合，品红的兰姆那一半为零：这一项整个并入压强。
:::

将 [@rem-ch30-lamb-decomposition-literature] 所载的无旋势流相与有旋涡流相映射回上一节“$P$ 是无旋导向场，$NP$ 是旋涡荒原中的细线”的几何类比模型（`MODEL`），无旋相在概念上对应光滑全局导向场（类比流体中的 $P$ 态），而有旋相则对应多尺度旋涡缠绕。

::: {.viz src="navier-stokes-p-np" preset="vortex" height="500"}
**对流项的两半。** 平面流 $\mathbf{u} = (1 - s)(x, -y) + s(-y, x)$ 在 $s = 0.8$ 时的流线，涡度 $\omega = 2s = 1.6$。琥珀色探针处，白色箭头是对流项 $(\mathbf{u}\cdot\nabla)\mathbf{u}$，它是青色的梯度那一半 $\nabla(\|\mathbf{u}\|^2/2)$ 与品红的兰姆那一半 $\boldsymbol{\omega}\times\mathbf{u}$ 之和；把 $s$ 调回 $0$，品红箭头消失。探针可以拖动。
:::

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

::: {.viz src="navier-stokes-p-np" preset="flat" height="500"}
**二维：涡管不被拉伸。** 涡度垂直于流动的平面，没有东西去拉它：涡管不变细，粘性只让它慢慢变粗（截面 $A$ 从虚线的 $1$ 涨到约 $2$），青色回路的环量 $\Gamma = \omega A$ 不变，品红的涡度只降不升（示意模型，`MODEL`）。
:::

::: {.viz src="navier-stokes-p-np" preset="strain" height="500"}
**三维：越拉越细。** 沿轴以恒定拉伸率拉这根涡管，不计粘性：它越来越长、越来越细，青色回路的环量 $\Gamma = \omega A$ 不变，所以品红的涡度按 $\Gamma/A$ 一路变大，即上式的 $\|\boldsymbol{\omega}\| \approx \Gamma/A$（示意模型，`MODEL`）。
:::

对比 [@rem-ch30-vorticity-transport-literature] 与计算复杂性中的维度分水岭，结构相变同时出现在 **$2 \to 3$**（以下为跨领域结构类比 `MODEL`，而非复杂性理论中的形式逻辑等价）：

- **二维平面情形（[@rem-ch30-vorticity-transport-literature]）$\leftrightarrow$ 类比二元链 2-SAT（`MODEL`）**：
  将 [@rem-ch30-vorticity-transport-literature] 所载的二维平面流情形与二元链 2-SAT 并置对照（`MODEL`），在本书锁定的 `trureturing@dev` 库中，冻结定理 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path) 给出了二维周期傅里叶空间上的一项**条件性高阶正则性提升定理**：若已给定一条在 $[0, \tau]$ 上连续的加权 $H^2$ 零均值实无散温和解路径，且其初值在全部空间 Sobolev 阶数 $m \in \mathbb{N}$ 上可和，则该路径在每一空间阶数 $m$ 上皆满足强微分方程（无条件二维全局正则性经典定理另见 [@rem-ch30-navier-stokes-forced-literature]）。
- **三维细涡管条件坍缩情景（[@rem-ch30-vorticity-transport-literature]）$\leftrightarrow$ 类比三元面片 3-SAT（`MODEL`）**：
  将 [@rem-ch30-vorticity-transport-literature] 所载的三维条件性细涡管情景与三元面片 3-SAT 并置对照，在几何类比模型（`MODEL`）上，该条件坍缩图景好比把一张平滑三维“场（类比 $P$）”挤压向“一维细丝（类比 $NP$ 见证丝）”！

**二维这一侧能算到底的一个样本：把旋度压到有限个点上。** 二维平面流里涡管拉伸项恒为零（[@rem-ch30-vorticity-transport-literature]），一根垂直于平面的直涡丝在平面上只是一个被搬运的点。把这幅图像推到最干净的极端：平面流处处无旋，只在 $N$ 个点上各有这样一根涡丝穿过。在这幅经典图像里（[@rem-ch30-point-vortex-literature]），场没有独立的自由度，全部动力学就是这 $N$ 个穿孔点的运动，即 $\mathbb{R}^{2N}$ 上的一个常微分方程组。所钉的 `trureturing@dev` 库冻结了这类方程的一个版本（每个涡旋另带一项绕原点的进动）的完整线性理论：$2m$ 个涡旋正负相间排成正多边形，它在哪个半径上静止，静止点处的线性化有哪些本征值、各有几重、沿多少个方向发散。

::: {.remark #rem-ch30-point-vortex-literature title="点涡方程与囚禁凝聚体中的进动项（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在二维理想不可压缩流中，涡量随流体搬运（H. von Helmholtz, 1858）；把涡量集中到 $N$ 个点上，第 $k$ 个点带环量 $\Gamma_k$，则每个点以其余各点在该处诱导的速度运动（G. Kirchhoff, 1876）：

$$
\begin{aligned}
\dot{x}_j &= -\frac{1}{2\pi}\sum_{k \neq j}\Gamma_k\,\frac{y_j - y_k}{d_{jk}},\\
\dot{y}_j &= \frac{1}{2\pi}\sum_{k \neq j}\Gamma_k\,\frac{x_j - x_k}{d_{jk}},\\
d_{jk} &= (x_j - x_k)^2 + (y_j - y_k)^2 .
\end{aligned}
$$

囚禁玻色—爱因斯坦凝聚体中少数几个量子化涡旋的粒子模型，在此之外给每个涡旋加上一项绕阱心的进动，转向由涡旋自身的符号决定。[@def-ch30-alternating-vortex-polygon] 的方程与交错多边形构型取自 A. M. Barry 与 P. G. Kevrekidis 的论文 *Few-particle vortex cluster equilibria in Bose–Einstein condensates: existence and stability*（arXiv:1306.1545，2013）。下文冻结的是这组常微分方程本身的性质；它与 Gross–Pitaevskii 方程或纳维—斯托克斯方程的解之间的关系，不在本书的形式化范围内。
:::

::: {.definition #def-ch30-alternating-vortex-polygon title="带进动项的点涡场、无碰撞构型、交错正多边形与归一化雅可比矩阵" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.CollisionFree D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.charge D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.polygon D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.rotate D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.regular D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.radius D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.jacobian"}
设 $N \in \mathbb{N}$，$b, \Omega \in \mathbb{R}$。

1. **构型**是 $z = (x_1, \dots, x_N;\, y_1, \dots, y_N) \in \mathbb{R}^{2N}$，其中 $(x_j, y_j)$ 是第 $j$ 个涡旋的位置（Lean 中为 `Fin N ⊕ Fin N → ℝ`，下标从 $0$ 起，对应这里的 $j - 1$）。第 $j$ 个涡旋的**符号**是 $s_j = (-1)^{j+1}$。
2. 记 $d_{jk} = (x_j - x_k)^2 + (y_j - y_k)^2$。构型**无碰撞**，指对一切 $j \neq k$ 有 $d_{jk} \neq 0$。
3. **场** $F_{b,\Omega} : \mathbb{R}^{2N} \to \mathbb{R}^{2N}$ 在坐标 $x_j$ 与 $y_j$ 上的分量分别是

   $$
   \begin{aligned}
   F_{b,\Omega}(z)_{x_j} &= -s_j\,\Omega\,y_j - \frac{b}{2}\sum_{k \neq j} s_k\,\frac{y_j - y_k}{d_{jk}},\\
   F_{b,\Omega}(z)_{y_j} &= s_j\,\Omega\,x_j + \frac{b}{2}\sum_{k \neq j} s_k\,\frac{x_j - x_k}{d_{jk}} .
   \end{aligned}
   $$

   Lean 的除法是全函数（除以零得零），所以 $F_{b,\Omega}$ 对一切 $z$ 有定义；运动方程 $\dot{z} = F_{b,\Omega}(z)$ 只在无碰撞构型上有意义，下文的结论都在无碰撞构型处陈述。
4. **单位正多边形** $P_N$ 的顶点是 $x_j = \cos(2\pi j/N)$，$y_j = \sin(2\pi j/N)$。对 $\rho, \theta \in \mathbb{R}$，$P_N(\rho, \theta)$ 表示把 $P_N$ 的每个顶点绕原点转过角 $\theta$、再乘以 $\rho$ 所得的构型。**平衡半径**是 $R_{b,\Omega} = \sqrt{b/(4\Omega)}$（下文只在 $b > 0$、$\Omega > 0$ 时用到它）。
5. **归一化雅可比矩阵** $J_N$ 是 $F_{2,1/2}$ 在 $P_N$ 处的偏导数矩阵：$(J_N)_{pq}$ 是函数 $t \mapsto F_{2,1/2}(P_N + t\,e_q)_p$ 在 $t = 0$ 处的导数，$e_q$ 是第 $q$ 个坐标方向的单位向量（Lean 把 $b = 2$、$\Omega = \tfrac12$ 的场单独写出，[`normalized_field`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.normalized_field) 证明它等于 $F_{2,1/2}$）。
:::

两项各管一件事。求和项是其余涡旋吹过来的速度：第 $k$ 个涡旋在距离 $r$ 处诱导的速度大小为 $\frac{b}{2r}$，方向垂直于连线，转向由 $s_k$ 决定；对照 [@rem-ch30-point-vortex-literature]，这相当于取 $\Gamma_k = \pi b\,s_k$。第一项让每个涡旋自己绕原点转，角速度为 $s_j\Omega$：$\Omega > 0$ 时正涡旋逆时针，负涡旋顺时针。把偶数个涡旋正负相间摆在半径 $\rho$ 的圆上，两项在切向上对着干。手工推导（用到下面证明里的切向读数恒等式）：其余涡旋给第 $j$ 个涡旋的切向速度是 $-s_j\,\frac{b}{4\rho}$，进动给它的切向速度是 $s_j\,\Omega\rho$，两者相消当且仅当 $\rho^2 = \frac{b}{4\Omega}$。圆太小，邻居的推动占上风；圆太大，进动占上风；只有一个半径能让整圈停住。

::: {.lemma #lem-ch30-vortex-polygon-equilibrium title="居中正多边形的静止条件与平衡点处的弗雷歇导数" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.regular_equilibrium_iff_radius D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.scaled_equilibrium D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalDerivative.physical_derivative"}
设 $b > 0$，$\Omega > 0$。

1. 对 $N \ge 3$、$\rho > 0$ 与任意 $\theta \in \mathbb{R}$：

   $$
   F_{b,\Omega}\bigl(P_N(\rho, \theta)\bigr) = 0 \iff N \text{ 为偶数且 } \rho = R_{b,\Omega} .
   $$

2. 对一切 $m \ge 1$，构型 $R_{b,\Omega}\,P_{2m}$ 无碰撞，且 $F_{b,\Omega}(R_{b,\Omega}\,P_{2m}) = 0$。
3. 对一切 $N \in \mathbb{N}$，$F_{b,\Omega}$ 在 $R_{b,\Omega}\,P_N$ 处弗雷歇可微，其导数是矩阵 $2\Omega\,J_N$ 所表示的线性映射。
:::

::: proof
第 1 条的“仅当”来自一个切向读数（[`angular_readout`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.angular_readout)）：若无碰撞构型 $z$ 的各涡旋到原点的距离同为 $\rho$，则对每个 $j$

$$
x_j\,F_{b,\Omega}(z)_{y_j} - y_j\,F_{b,\Omega}(z)_{x_j} = s_j\,\Omega\,\rho^2 + \frac{b}{4}\Bigl(\sum_{k} s_k - s_j\Bigr),
$$

因为等距时 $x_j(x_j - x_k) + y_j(y_j - y_k) = d_{jk}/2$，每个相互作用项恰好贡献 $\frac{b}{4}s_k$。$N$ 为奇数时 $\sum_k s_k = 1$，取 $j = 1$ 得右端为 $\Omega\rho^2 \neq 0$；$N$ 为偶数时 $\sum_k s_k = 0$，右端为 $s_j(\Omega\rho^2 - b/4)$。“当”的方向先用缩放恒等式 $F_{b,\Omega}(R\,w) = 2\Omega R\,F_{2,1/2}(w)$（其中 $R \neq 0$、$b = 4\Omega R^2$、$w$ 无碰撞，[`field_scaling`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field_scaling)）和场对公共转动的协变性把问题化到 $P_{2m}$；在 $P_{2m}$ 上，把第 $k$ 个涡旋与它关于过第 $j$ 个顶点的直径的镜像配成一对，两者符号相同，一对合起来贡献的是 $s_k$ 乘以第 $j$ 个涡旋自身的坐标，求和后恰好抵消进动项（[`equilibrium_all`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.equilibrium_all)，对一切 $m \ge 1$）。第 3 条：$F_{b,\Omega}$ 在无碰撞点处是分母不为零的有理式，因而可微，偏导数矩阵就是弗雷歇导数的矩阵；对缩放恒等式沿坐标方向求导，外层因子 $2\Omega R$ 与内层因子 $1/R$ 相乘，得到 $2\Omega\,J_N$（[`jacobian_scaling`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.jacobian_scaling)）。完整证明由 Lean 内核检查。
:::

第 3 条说明后面的“谱”指什么：它是场 $F_{b,\Omega}$ 本身在平衡点处的弗雷歇导数的谱，不是某个事先约化好的矩阵的谱。它也分清了两个参数的角色：$b$ 只出现在半径 $R_{b,\Omega}$ 里，不进入导数；$\Omega$ 除了影响半径，只给导数乘上因子 $2\Omega$，相当于换一个时间单位。于是只需研究一个不含参数的 $4m \times 4m$ 实矩阵 $J_{2m}$。

::: {.theorem #thm-ch30-vortex-polygon-spectrum title="交错涡旋多边形的完整特征多项式与 $2(m-2)$ 维的稳定、不稳定空间" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonModes.charpoly_factored D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physicalRealOperator_eq D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_positive_eigenvalue_iff D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_negative_eigenvalue_iff D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_unstable_exhaustive D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_stable_exhaustive D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_real_dimensions"}
设 $m \ge 3$。

1. $J_{2m}$ 的特征多项式 $\chi_{2m}(X) = \det(X\,I - J_{2m})$ 为

   $$
   \begin{aligned}
   \chi_{2m}(X) &= X^2\,\Bigl(X^2 + \frac{m^2}{2}\Bigr)\Bigl(X^2 + \frac{(m-1)^2}{4}\Bigr)^{2}\\
   &\quad\times \prod_{r=2}^{m-1}\Bigl(X^2 - \frac{(m-r)^2\,(r^2-2)}{4}\Bigr)^{2} .
   \end{aligned}
   $$

2. 设 $b > 0$，$\Omega > 0$，$A_{b,\Omega}$ 是 $\mathbb{R}^{4m}$ 上以 $F_{b,\Omega}$ 在 $R_{b,\Omega}\,P_{2m}$ 处的偏导数矩阵为矩阵的线性算子（[`physicalRealOperator`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physicalRealOperator)）。则 $A_{b,\Omega} = 2\Omega\,J_{2m}$。记

   $$
   \lambda_r = \Omega\,(m - r)\sqrt{r^2 - 2}, \qquad r = 2, \dots, m-1 .
   $$

   对每个实数 $\mu > 0$：$\mu$ 是 $A_{b,\Omega}$ 的本征值，当且仅当存在 $r \in \{2, \dots, m-1\}$ 使 $\mu = \lambda_r$。对每个实数 $\mu < 0$：$\mu$ 是 $A_{b,\Omega}$ 的本征值，当且仅当存在 $r \in \{2, \dots, m-1\}$ 使 $\mu = -\lambda_r$。
3. 在第 2 条的假设下，记 $E^{u}$ 为 $A_{b,\Omega}$ 的全部正实本征值的本征空间之和，$E^{s}$ 为全部负实本征值的本征空间之和。则

   $$
   \dim_{\mathbb{R}} E^{u} = \dim_{\mathbb{R}} E^{s} = 2(m - 2) .
   $$
:::

::: proof
把每个涡旋的位移分解成径向分量与切向分量，这是一个正交的坐标变换。在这组坐标下 $J_{2m}$ 变成反对角分块 $\begin{pmatrix} 0 & B \\ C & 0 \end{pmatrix}$，其中 $B = (\delta\,I - W)\,S$，$C = ((\delta + 1)\,I - W)\,S$；$W$ 的非对角元是 $P_{2m}$ 上弦长平方的倒数 $1/d_{jk}$，对角元为零，$S = \operatorname{diag}(s_j)$，$\delta = \frac{(2m)^2 - 1}{12} - \frac{m^2}{2}$（[`rotated_jacobian_all`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.rotated_jacobian_all)）。对 $x \neq 0$，舒尔补给出 $\chi_{2m}(x) = \det(x^2 I - CB)$。$W$ 是循环矩阵，离散傅里叶变换把它对角化，第 $k$ 个本征值是 $\frac{(2m)^2 - 1}{12} - \frac{k(2m - k)}{2}$（[`chordWeight_dft`](lean:D5/S3/FluidDynamics/Vortices/InverseChordCirculant.chordWeight_dft)）；交错符号 $S$ 把频率 $k$ 平移 $m$。于是 $\det(y\,I - CB) = \prod_{k=0}^{2m-1}(y - \gamma_k)$，其中 $\gamma_k = (m - r)^2(r^2 - 2)/4$，$r = \min(k, 2m - k)$。两个多项式在无穷多个点上取值相同，因而相等，故 $\chi_{2m}(X) = \prod_k (X^2 - \gamma_k)$（[`charpoly_mode_product`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.charpoly_mode_product)）。$r = 0$ 与 $r = m$ 各由一个 $k$ 给出，其余的 $r$ 各由两个 $k$ 给出，这就是第 1 条中的指数。$\gamma_k > 0$ 只发生在 $2 \le r \le m - 1$，而且不同的 $r$ 给出不同的值：对整数 $2 \le k < l < m$ 有 $(m-k)^2(k^2-2) \neq (m-l)^2(l^2-2)$（[`distinctness_certificate`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.distinctness_certificate)）。每个这样的实根在 $\mathbb{R}^{4m}$ 中有 $2$ 维的本征空间（[`real_geometric_multiplicity`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonRealSpaces.real_geometric_multiplicity)），不同本征值的本征空间线性无关，$m - 2$ 个 $2$ 维空间相加得到第 3 条。换到一般的 $b$、$\Omega$ 只是乘以 $2\Omega$：本征空间不变，本征值各乘 $2\Omega$。完整证明由 Lean 内核检查。
:::

四个因子是四类运动。$X^2$ 是零本征值，下面单独处理。两个带加号的因子给出纯虚根 $\pm i\,m/\sqrt{2}$ 与 $\pm i\,(m-1)/2$：围绕平衡位置的振荡，不增不减。带减号的因子给出实根对：正的一支发散，负的一支收缩。库里另有一条冻结定理（[`off_axis_is_real`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonRealBoundary.off_axis_is_real)）：$J_{2m}$ 的复本征值只要实部非零就是实数，所以 $E^{u}$ 与 $E^{s}$ 已经收尽全部增长与衰减的本征方向。六边形（$m = 3$）是第一个出现发散方向的多边形，此后每添两个涡旋，发散方向多两个。

::: {.proposition #prop-ch30-vortex-polygon-neutral-drift title="非零本征值半单、零本征值的二阶若尔当块与无界的线性漂移；偶极与正方形" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonDecomposition.geometric_eq_algebraic D5/S3/FluidDynamics/Vortices/AlternatingPolygonNeutral.neutral_generalized_finrank D5/S3/FluidDynamics/Vortices/AlternatingPolygonNeutral.neutral_geometric_finrank D5/S3/FluidDynamics/Vortices/AlternatingPolygonCartesianChain.cartesian_chain D5/S3/FluidDynamics/Vortices/AlternatingPolygonCartesianChain.unbounded_linear_drift D5/S3/FluidDynamics/Vortices/AlternatingPolygonSmallCases.dipole D5/S3/FluidDynamics/Vortices/AlternatingPolygonSmallCases.square"}
设 $m \ge 1$。第 1、2、4 条把 $J_{2m}$ 看作 $\mathbb{C}^{4m}$ 上的线性算子。

1. 对每个非零复数 $\mu$，$\mu$ 的本征空间的复维数等于 $\mu$ 作为 $J_{2m}$ 的特征多项式之根的重数。
2. 本征值 $0$ 的广义本征空间是 $2$ 维的，本征空间是 $1$ 维的。
3. 设 $(x_j, y_j)$ 为 $P_{2m}$ 的顶点，$\delta_m = 1 - m^2/2$，并取 $\mathbb{R}^{4m}$ 中的向量

   $$
   \begin{aligned}
   c_0 &= (-y_1, \dots, -y_{2m};\; x_1, \dots, x_{2m}),\\
   c_1 &= \frac{1}{\delta_m}\,(s_1 x_1, \dots, s_{2m} x_{2m};\; s_1 y_1, \dots, s_{2m} y_{2m}) .
   \end{aligned}
   $$

   则 $J_{2m}\,c_0 = 0$，$J_{2m}\,c_1 = c_0$；曲线 $v(t) = c_1 + t\,c_0$ 对一切 $t \in \mathbb{R}$ 满足 $v'(t) = J_{2m}\,v(t)$，且集合 $\{v(t) : t \in \mathbb{R}\}$ 无界。
4. $J_2$ 的特征多项式是 $X^2\bigl(X^2 + \tfrac12\bigr)$，其复本征值恰为 $0$ 与 $\pm i/\sqrt{2}$；$J_4$ 的特征多项式是 $X^2\bigl(X^2 + 2\bigr)\bigl(X^2 + \tfrac14\bigr)^2$，其复本征值恰为 $0$、$\pm i\sqrt{2}$ 与 $\pm i/2$。
:::

::: proof
在径向与切向坐标上再作离散傅里叶变换，$\mathbb{C}^{4m}$ 分成 $2m$ 个二维不变块。第 $q$ 块上算子的矩阵是 $\begin{pmatrix} 0 & \ell_q \\ \ell_{q+m} + 1 & 0 \end{pmatrix}$，其中 $\ell_q = -(m - q)^2/2$，下标模 $2m$ 取在 $\{0, \dots, 2m-1\}$ 中（[`actual_normal_form`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonJordan.actual_normal_form)）；两个非对角元之积就是上一个证明里的 $\gamma_q$。对非零的 $\mu$，在每个二维块上直接计算可知 $(T - \mu)^2 v = 0$ 推出 $(T - \mu)v = 0$（$T$ 记这个算子）：非零本征值没有若尔当链，广义本征空间等于本征空间，而广义本征空间的维数就是根的重数，由此得第 1 条。$T^2$ 在第 $q$ 块上是数乘 $\gamma_q$，所以本征值 $0$ 的广义本征空间恰是 $\gamma_q = 0$ 的那些块之和；这只发生在 $q = m$。那里 $\ell_m = 0$，另一个非对角元是 $\ell_0 + 1 = \delta_m$，它不为零，因为 $m^2 = 2$ 没有整数解。这一块是幂零的二阶若尔当块，由此得第 2 条。第 3 条在径向与切向坐标里直接验证：$c_0$ 是每个涡旋切向位移 $1$、径向位移 $0$，$c_1$ 是径向位移 $s_j/\delta_m$、切向位移 $0$；用上一个证明的记号，$W$ 的行和 $\sum_k W_{jk} = \frac{(2m)^2 - 1}{12}$ 与交错行和 $\sum_k s_k W_{jk} = s_j\,\delta$ 给出 $B\,\mathbf{1} = 0$ 与 $C\,(s/\delta_m) = \mathbf{1}$（$\mathbf{1}$ 为全一向量，$s/\delta_m$ 的第 $j$ 个分量是 $s_j/\delta_m$），即 $J_{2m}c_0 = 0$ 与 $J_{2m}c_1 = c_0$。于是 $J_{2m}(c_1 + t\,c_0) = c_0 = v'(t)$，无界性来自 $c_0 \neq 0$。第 4 条是把 $m = 1, 2$ 代入对一切 $m \ge 1$ 成立的折叠公式 $\chi_{2m}(X) = X^2\bigl(X^2 + \tfrac{m^2}{2}\bigr)\prod_{r=1}^{m-1}\bigl(X^2 - \tfrac{(m-r)^2(r^2-2)}{4}\bigr)^2$（[`charpoly_folded`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonModes.charpoly_folded)）。完整证明由 Lean 内核检查。
:::

$c_0$ 是整个多边形绕原点的无穷小转动：场对公共转动协变（[@lem-ch30-vortex-polygon-equilibrium] 的证明用过这一点），转过去的多边形仍然静止，所以这个方向落在 $J_{2m}$ 的核里。$c_1$ 让正涡旋沿半径移动 $1/\delta_m$，负涡旋反向移动同样的距离。把两种涡旋的半径这样错开之后，线性化方程的解不是振荡，而是整圈涡旋沿 $c_0$ 方向匀速转走。谱看不见这件事：零与纯虚数都算“不增长”，一个二阶若尔当块却让解随时间线性增大。偶极（$m = 1$）与正方形（$m = 2$）的全部本征值都在虚轴上，它们的线性化方程同样有这样一个无界的解。换回一般的 $b, \Omega > 0$，只需把 $c_1$ 除以 $2\Omega$（[`physical_cartesian_chain`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalDerivative.physical_cartesian_chain)）。

::: {.example #ex-ch30-vortex-octagon-spectrum title="正八边形的十六个本征值：从方程数值求出，再与冻结的重数逐项对照"}
取 $m = 4$、$b = 2$、$\Omega = \tfrac12$，于是 $R_{b,\Omega} = 1$，八个涡旋位于单位圆上，相空间是 $\mathbb{R}^{16}$。下面的数值只用到 [@def-ch30-alternating-vortex-polygon] 中的方程，不用任何闭式：把场逐项键入，用符号求导得到 $P_8$ 处的 $16 \times 16$ 偏导数矩阵（与步长 $10^{-12}$ 的中心差分逐元相差不超过 $3 \times 10^{-24}$），以 $40$ 位十进制精度求本征值；代数重数取数值上重合的本征值个数，几何重数取 $16 - \operatorname{rank}(J_8 - \lambda I)$。场在 $P_8$ 处的最大分量为 $8 \times 10^{-41}$。标号 $r$ 与 [@thm-ch30-vortex-polygon-spectrum] 的证明相同：$r = 0, 1$ 对应两个带加号的因子，$r = m$ 对应 $X^2$。本征值四舍五入到所示位数：

| 标号 $r$ | 冻结声明给出的根 | 数值本征值 | 代数重数 | 几何重数 |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $\pm 2\sqrt{2}\,i$ | $\pm 2.828427\,i$ | $1$ | $1$ |
| $1$ | $\pm \tfrac32\,i$ | $\pm 1.500000\,i$ | $2$ | $2$ |
| $2$ | $\pm\sqrt{2}$ | $\pm 1.414214$ | $2$ | $2$ |
| $3$ | $\pm\tfrac12\sqrt{7}$ | $\pm 1.322876$ | $2$ | $2$ |
| $4$ | $0$ | $0$（模小于 $2 \times 10^{-20}$） | $2$ | $1$ |

重数合计 $2 + 4 + 4 + 4 + 2 = 16$。正实本征值连重数共 $4 = 2(m - 2)$ 个，负实本征值同样 $4$ 个。$\operatorname{rank} J_8 = 15$，$\operatorname{rank} J_8^2 = \operatorname{rank} J_8^3 = 14$：零本征值恰有一个二阶若尔当块。两个正根 $1.414214$ 与 $1.322876$ 靠得很近但不相等：不同的 $r$ 给出不同的根，所以每个实根的重数恰好是 $2$，没有更大的。六边形（$m = 3$）用同样的办法得到 $\pm 0.707107$（各二重）、$\pm 1.000000\,i$（各二重）、$\pm 2.121320\,i$（各一重）与一个二重、几何重数为 $1$ 的零本征值，正实本征值共 $2 = 2(m - 2)$ 个。

**换参数。** 取 $b = 1$、$\Omega = 1$（$R_{b,\Omega} = 0.5$），八边形的两个正实本征值变为 $2.828427$ 与 $2.645751$；取 $b = 1.35$、$\Omega = 0.25$（$R_{b,\Omega} = 1.161895$），变为 $0.707107$ 与 $0.661438$。两组都是上表数值乘以 $2\Omega$，与 $b$ 无关。

**回到非线性方程。** 以上是线性化的结论。下面两个数值实验直接积分 $\dot{z} = F_{2,1/2}(z)$（四阶龙格—库塔法，$30$ 位精度；步长减半后所示数字不变）。其一，六边形：从 $P_6 + 10^{-9}u$ 出发，$u$ 是本征值 $1/\sqrt{2}$ 的一个单位本征向量，到 $t = 10$ 时与 $P_6$ 的距离增长到初始值的约 $1177.4$ 倍，与 $e^{10/\sqrt{2}} = 1177.405$ 的相对偏差小于 $10^{-6}$（这个本征空间是二维的，取其中哪一个单位向量都是如此）。其二，正方形：从 $P_4 + 10^{-3}c_1$ 出发（正涡旋半径 $0.999$，负涡旋半径 $1.001$），到 $t = 10$ 四个涡旋绕原点平均转过 $0.0100001$ 弧度，到 $t = 100$ 平均转过 $0.100001$ 弧度；线性化解 $10^{-3}(c_1 + t\,c_0)$ 给出的转角是 $10^{-3}t$。线性化解沿切线无界地走远；在非线性方程里，这段时间内看到的是整个环绕原点缓慢转动。这两个实验是数值观察，不是冻结声明。
:::

这个样本把三件容易混在一起的事分开了。方程右端在无碰撞构型处可微（[`field_differentiable_at`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field_differentiable_at)），平衡点正是这样的构型，那里没有任何奇异；可是从六边形起，线性化恰有 $2(m - 2)$ 维的发散方向；而谱上中性的偶极与正方形，线性化方程照样有无界的解。可微不等于稳定，谱中性不等于有界。放回本章的类比（`MODEL`）：这里的“线”已经缩成平面上的点，点与点之间没有可供缠绕的结构，发散方向却一个不少，它们不需要涡管拉伸。三维的问题在别处：那里的涡丝不只是被搬运的点，还会被拉长。

在正式陈述千禧年无外力开放猜想之前，我们先用专门的文献注记严格隔离二维全局光滑性定理与 **受迫情形（克雷陈述 C / D，含光滑外力 $\mathbf{f} \in C^\infty$）** 的外部文献结果，确保下方的红色 `OPEN` 猜想框纯粹聚焦于未决的无外力自治核心：

::: {.remark #rem-ch30-navier-stokes-forced-literature title="兰姆恒等式、二维全局正则性与 2026 年受迫陈述 C / D 有限时间爆破的文献说明"}
**文献结果，未在本书形式化。** 本节涉及的经典流体几何恒等式、二维无条件全局光滑性定理以及三维**受迫**纳维—斯托克斯爆破结果均属外部文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **兰姆恒等式、螺旋度霍普夫不变量与二维无条件全局正则性**：对流分解 $(\mathbf{u}\cdot\nabla)\mathbf{u} = \frac{1}{2}\nabla(\|\mathbf{u}\|^2) + \boldsymbol{\omega}\times\mathbf{u}$ 源于 H. Lamb（*Hydrodynamics*）、无粘涡通量守恒源于开尔文环量定理（Lord Kelvin, 1869）、无粘流体螺旋度 $\mathcal{H} = \int \mathbf{u}\cdot\boldsymbol{\omega}\,dV$ 与 $S^3$ 霍普夫链环不变量的对应源于 J. J. Moreau（1961）与 H. K. Moffatt（1969）；二维不可压缩纳维—斯托克斯方程在任意时间上的无条件全局光滑解存在唯一性由 O. A. Ladyzhenskaya（*The Mathematical Theory of Viscous Incompressible Flow*, 1969）严格证明（注意：本书行内引用的冻结定理 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path) 假设 $[0, \tau]$ 上连续温和解路径已给定，不等同于 Ladyzhenskaya 的无条件全局存在性定理）。
2. **受迫三维纳维—斯托克斯（克雷陈述 C / D，含光滑外力 $\mathbf{f} \in C^\infty$）的 2026 年有限时间爆破构造与外部 Lean 4 验证**：在克雷数学研究所（C. Fefferman）制定的问题描述中，受迫陈述 C / D 允许施加光滑、紧支且保持总动能一致有界（$\sup_t \|\mathbf{u}(\cdot, t)\|_{L^2} < \infty$）的外力场 $\mathbf{f}(\mathbf{x}, t)$。2026 年公布的 166 页解析构造及其配套外部 Lean 4 形式化证明确认：在受迫情形下，精心设计的光滑外力可持续对齐并泵浦多尺度向内盘旋、轴向拉伸的自相似涡丝结构，使三维涡管拉伸局部压倒粘性耗散 $\nu\nabla^2\mathbf{u}$，在有限时间 $T^* < \infty$ 内产生横截面积 $A(t) \to 0$、$\limsup_{t \nearrow T^*} \|\mathbf{u}(\cdot, t)\|_{L^\infty} = \infty$ 的奇点（相关欧拉与流体奇点文献亦见 T. M. Elgindi, *Ann. of Math.* **194**, 2021；J. Chen & T. Y. Hou, 2022–2023；D. Córdoba & L. Martínez-Zoroa；以及 T. Buckmaster & L. Alpöge, 2026）。这些结果针对含外力或无粘情形，**并未解决**下文无外力（$\mathbf{f} \equiv \mathbf{0}$）粘性陈述 A / B。
:::

::: {.viz src="navier-stokes-p-np" preset="burgers" height="500"}
**粘性拦住：伯格斯涡。** 恒定拉伸之外再加上粘性：变细的涡核同时向外扩散，截面 $A$ 停在 $4\pi\nu/\alpha$ 附近不再变小，品红的涡度也随之停住，青色回路的环量仍是 $1$。拉伸与粘性恰好相抵，涡管不会夹断（示意模型，`MODEL`）。
:::

::: {.viz src="navier-stokes-p-np" preset="runaway" height="500"}
**越拉越细（示意模型）。** 青色回路的环量 $\Gamma = \omega A$ 不变，虚线是出发时的涡管。这里让拉伸率正比于涡度本身（$\alpha = \kappa\omega$，示意性的闭合，不是纳维—斯托克斯方程的解）：$\kappa\Gamma = 0.50$ 大于 $4\pi\nu = 0.151$，到 $t = 2.4$ 截面已缩到 $0.162$，品红的涡度升到 $6.18$，截面将在 $t^* = 2.86$ 归零。真实的三维流体是否如此，正是下面的开放问题（`MODEL`）。
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

::: {.viz src="navier-stokes-p-np" preset="mixed" height="500"}
**看不见的变量漏进来。** 只看 $x$ 的观察者：每条曲线是固定一个 $x$ 时，看得见的加速度 $P(V)$ 随看不见的 $y$ 的变化。混合项打开后，曲线张成一把扇子：同一个 $x = 0.5$，青色是 $y = 0$ 时的加速度，琥珀色的点是当前 $y$ 时的加速度，琥珀色竖线是两者之差。差不为零，就没有只依赖 $x$ 的精确闭合（$\mathbb{R}^2$ 上的示意实例；一般判据与五模态实例见上面的定理）。
:::

::: {.viz src="navier-stokes-p-np" preset="closed" height="500"}
**没有泄漏：低频自己说了算。** 三项泄漏都关掉：看不见的 $y$ 怎么变，琥珀色的点都沿着水平线走，与青色的 $y = 0$ 时的加速度一样，两者之差为零。只看 $x$ 的观察者可以自己预测下一步，这是上面判据的“当”那一半（$\mathbb{R}^2$ 上的示意实例）。
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
| **高效求解的类比** | **部分 $P$ 算法的导向结构**（$P\subseteq NP$；无旋场非定义，见 [@rem-ch30-karmarkar-kasteleyn-literature]） | **无旋势流 / 低雷诺数层流**（$\nabla\wedge\mathbf{u}=0$ 或粘性主导，见 [@rem-ch30-lamb-decomposition-literature]） | 作者以局部导向描绘高效求解；仍需算法与成本分析 |
| **维度分水岭** | **2-SAT** vs. **3-SAT**（文献见 [@rem-ch30-query-sos-literature]） | **2D NS**（文献见 [@rem-ch30-navier-stokes-forced-literature]；条件温和路径正则性 [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path)） vs. **3D 无外力 NS**（[@conj-coda-navier-stokes-regularity]，`OPEN`） | 二维平面流无第三轴涡管拉伸；三维允许轴向涡管拉伸（见 [@rem-ch30-vorticity-transport-literature]） |
| **复杂性引擎** | 自指递归与三元布尔阻挫环 | 二次对流非线性与涡管拉伸（[@rem-ch30-lamb-decomposition-literature]、[@rem-ch30-vorticity-transport-literature]）及跨尺度混合泄漏（[`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)） | 算子与状态自指耦合 $\psi(\psi)$，向高频正交模态 $\mathbf{k}_1+\mathbf{k}_2\to\mathbf{k}_3$ 级联 |
| **见证 / 奇异细丝的类比** | **$NP$ 见证丝**是检查过程的图像，不蕴含难解性 | 条件坍缩情景下横截面趋零的**一维奇异涡丝**（见 [@rem-ch30-vorticity-transport-literature]） | 线形图像相似，不建立复杂度与流体奇点的数学等价 |
| **物理防火墙** | 有限观察者 $90^\circ$ 视界与局部记忆截断 | 运动粘性耗散（[@rem-ch30-lamb-decomposition-literature]，对照 [`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)）与微观离散截断 | 兰道尔式正交面积耗散，抑制无穷步芝诺级联 |
| **高维几何视角** | 无时间静态场全局交集（受限坍缩参照 [@rem-ch30-postselection-ctc-literature]） | 无穷维流形测地线视角（无粘文献参照 [@rem-ch30-tao-arnold-literature]） | 高维流形上的简洁几何运动在局部低维投影下展现为复杂的非线性能量传递 |

:::

::: {.viz src="navier-stokes-p-np" height="640"}
**交互实验室 `ORTHO//VORTEX`**：本节的三个场景。对流项的两半：在驻点流与刚体旋转之间调 $s$，看兰姆那一半怎样随涡度出现；涡管：二维不被拉伸，三维在恒定拉伸下变细到伯格斯涡核 $4\pi\nu/\alpha$ 为止，示意性的自拉伸闭合则在有限时间夹断；闭合：只看 $x$ 的观察者何时能自己预测下一步（判据与五模态无闭合实例已由 Lean 验证）。涡管场景是示意模型，不是纳维—斯托克斯方程的数值解。
:::

---

## 本章小结：离散逻辑场与连续流体场的正交合龙 {#sec-ch30-summary}

本章以作者关于全局静态场与有限观察者、“场”与“线”的格言连接离散逻辑和连续流体。数学层面，静态满足子空间、额外资源下的复杂度等式、受限模型下界与标准 $P\neq NP$ 开放问题各有边界。在有限图着色这一例子中，Gallai–Hasse–Roy–Vitaver 定理给出“$G$ 可 $k$ 着色”与“存在一种定向，使每条有向路至多含 $k$ 个顶点”之间的精确等价（[@thm-ch30-gallai-roy]）；它只是交换两种存在性见证，不提供算法，也不解决一般的 $P$ vs. $NP$ 问题。银河交叉表比较的是示意上界（[@ex-ch30-galactic-crossover-scale]），不是普遍搜索下界。流体部分则并置 **兰姆分解（[@rem-ch30-lamb-decomposition-literature]）、无外力三维全局正则性开放猜想（[@conj-coda-navier-stokes-regularity]）与二次平流投影无精确闭合定理（[@thm-coda-quadratic-advection-no-closure]）**。这些结果为作者的几何诠释提供参照，并不建立两道开放难题的数学等价。

现在，让我们推开全书的最后一扇门，步入 **[终章：在所有的球之外](coda.md)**，在多面体离散角亏余项（见终章 [@rem-coda-polyhedral-topology-literature]）、收缩不动点锚点与全书三十章总导图中完成最后的升维回望。
