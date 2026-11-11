# 第六章 几何积 $\vv{A}\vv{B} = \vv{A}\cdot\vv{B} + \vv{A}\wedge\vv{B}$：波粒二象性的终极缝合 {#ch06-geometric-product}

正如本书作者所言：

> *“面积是波,粒子是线,如果线与面积都是一种状态的投影,那看起来似乎是很好的波粒二象性的解释”*
>
> *“那面积与线、波与粒子,本质上就是一种场呀”*

二十世纪物理学留给人类思想史最著名的一道伤痕，莫过于“**波粒二象性（wave–particle duality）**”。电子和光子有时候表现得像一颗弹道分明、非此即彼的颗粒（粒子），有时候又表现得像一片铺满空间、明暗相间的涟漪（波）。尼尔斯·玻尔为此提出了“互补原理（complementarity）”，宣称波和粒子是两幅互斥的经典图景，人类永远无法在同一幅几何画面里同时看清两者，只能听任它们随实验装置的切换而神秘变脸。

然而，站在本书已经铺设好的正交阶梯上回望：我们在第一部（[第一章](ch01-measurement.md)至[第四章](ch04-decoherence.md)）中证明了**粒子的投影计数来自两子内积** $\vv{A}\cdot\vv{B} = \cos\theta$；又在[第五章](ch05-complex-phase-and-rotors.md)中证明了**波的相位转向来自两子外积面积** $\vv{A}\wedge\vv{B} = \sin\theta\,\vv{I}$。既然“粒子是线，面积是波”，为什么传统线性代数会把一根完整的比量动作硬生生劈成“点乘（标量内积）”和“叉乘（向量/外积）”两门老死不相往来的运算？

本章将完成全书第二部的核心合拢：**把被教科书拆散的内积与外积重新缝合回同一个完整的克利福德几何积（Clifford geometric product）**

$$
\vv{A}\vv{B} = \vv{A}\cdot\vv{B} + \vv{A}\wedge\vv{B} = \cos\theta + \sin\theta\,\vv{I}!
$$

在这行只有六个符号的恒等式面前，困惑物理学界百年的波粒二象性、罗伯逊—薛定谔不确定性原理、双缝干涉与惠勒延迟选择实验，乃至传统量子力学教材里互不统属的“五大公设”，都将水落石出地收束为同一条初等几何铁律——**余弦粒子线与正弦波动面的勾股守恒 $\cos^2\theta + \sin^2\theta = 1$**。

::: {.figure src="ch06-overview"}
**图 6。** 本章地图：第 I 栏，琥珀色的 $\vv{B}$ 落在 $\vv{A}$ 上的青色影子是 $\cos\theta$，两者张出的品红平行四边形是 $\sin\theta$；第 II 栏，在等权纯双路、理想平衡合束并扫描参考相位的模型中，取 $\alpha = \arccos|c|$，四分之一圆 $D^2 + V^2 = 1$，琥珀色的点在 $\alpha = 60^\circ$ 处，由品红的 $D \approx 0.87$ 与青色的 $V = 0.5$ 拼成，圆弧两端分别是“只有路径”与“只有条纹”（[@thm-record-coherence-complementarity]）；第 III 栏，[@ex-wheeler-delayed-choice-tradeoff] 中 $\alpha = 60^\circ$ 的 $\rho$，青色的对角部分 $\Pi(\rho)$ 与品红的副对角部分 $\rho - \Pi(\rho)$ 是直角三角形的两条直角边，斜边是 $\rho$（[@cor-pinching-pythagorean]）。
:::

## 6.1 内积 $\vv{A}\cdot\vv{B}$ 为何是“粒子”？外积 $\vv{A}\wedge\vv{B}$ 为何是“波”？ {#sec-inner-particle-outer-wave}

让我们顺着作者的一句直觉洞察，把“两子相遇”时发生的一切放到放大镜下重新审视：

> *“量子态本身,即各项同性球面上的一个方向向量,应该也是一种粒子性的东西.然后也会有一种对应的波的东西”*

当单位球面上的两条方向线 $\vv{A}$ 与 $\vv{B}$（$\|\vv{A}\| = \|\vv{B}\| = 1$，夹角为 $\theta$）相遇比量时，它们之间的全部几何关系由且仅由两部分组成：

1. **对称共线部分——内积 $\vv{A}\cdot\vv{B} := \frac{1}{2}(\vv{A}\vv{B} + \vv{B}\vv{A}) = \cos\theta$（粒子 / 线）**：
   它度量 $\vv{B}$ 沿着基准轴 $\vv{A}$ 投下的**共线影子长度**（[第二章](ch02-born-rule.md)的内生相融向量 $\vv{c} = (\vv{A}\cdot\vv{B})\vv{A}$）。它不改变方向，只给出“顺着 $\vv{A}$ 这把尺子看过去，$\vv{B}$ 有多少分量与它重合同向”，并在幂等投影 $P_{\vv{A}}^2 = P_{\vv{A}}$ 下凝结为探测器上一声干脆利落的“咔哒”计数（[第三章](ch03-projectors-and-duality.md)）。**这就是“粒子是线”的精确代数定义：粒子性就是几何积的零阶标量（共线投影）投影。**
2. **反对称正交部分——外积 $\vv{A}\wedge\vv{B} := \frac{1}{2}(\vv{A}\vv{B} - \vv{B}\vv{A}) = \sin\theta\,\vv{I}$（波 / 面积）**：
   它度量 $\vv{B}$ 垂直于基准轴 $\vv{A}$ 撑开的**有向平行四边形面积**。因为交换次序会使面积朝向反转（$\vv{B}\wedge\vv{A} = -\vv{A}\wedge\vv{B}$），它天然携带正负相干符号与旋转生成元 $\vv{I}^2 = -1$（[第五章](ch05-complex-phase-and-rotors.md)），掌管着不同路径之间的相位干涉与连续量子门演化。**这就是“面积是波”的精确代数定义：波动性就是几何积的二阶二向量（正交楔积面积）投影。**

把对称的共线粒子部分与反对称的正交波动部分直接加起来，就是克利福德在 1878 年写下的**几何积**：

$$
\vv{A}\vv{B} = \underbrace{\frac{\vv{A}\vv{B} + \vv{B}\vv{A}}{2}}_{\vv{A}\cdot\vv{B}\text{（共线粒子标量）}} + \underbrace{\frac{\vv{A}\vv{B} - \vv{B}\vv{A}}{2}}_{\vv{A}\wedge\vv{B}\text{（正交波动面积）}}.
$$

::: {.figure src="ch06-swap"}
**交换次序，线不变，面积翻面。** 两栏画的是同样两支单位箭头 $\vv{A}$ 与琥珀色的 $\vv{B}$：青色的影子一样长，都是 $\vv{A}\cdot\vv{B} = \vv{B}\cdot\vv{A} = \cos\theta$；品红的平行四边形一样大，但紫色的弧箭头方向相反，左栏是 $\vv{A}\wedge\vv{B} = +\sin\theta\,\vv{I}$，右栏是 $\vv{B}\wedge\vv{A} = -\sin\theta\,\vv{I}$。对称的一半留下线，反对称的一半留下有向的面积。
:::

为什么作者说*“那面积与线、波与粒子,本质上就是一种场呀”*？因为没有脱离外积面积而孤立存在的内积线，也没有脱离内积线而悬空漂浮的外积面积——它们本来就是**同一个几何积多向量（multivector）场 $\vv{A}\vv{B}$ 在零阶标量扇区与二阶二向量扇区上的两个正交投影切片**！当你只拿对角粒子计数器去读它时，你只看见了实部 $\cos\theta$；当你让两条路径交汇做干涉实验时，你才看见了虚部二向量 $\sin\theta\,\vv{I}$。

更妙的是，这一“一条几何积恒等式统摄全局”的视角，让我们能够把传统量子力学教科书里彼此割裂的**五大公设**翻译成一张严丝合缝的几何对照表：

| 传统教科书五大公设 | 本书的零冗余几何还原 | 对应形式化定理与章节 |
| :--- | :--- | :--- |
| **公设一：态空间公设**（纯态为复希尔伯特空间射线） | 商去不可见全局相位 $U(1)$ 后，单比特纯态是三维实球面上的单位方向线 $\vv{a} \in S^2$，混合态是球内截短弦 $\norm{\vv{r}} \le 1$ | [@thm-ray-phase-rigidity]、[@prop-qubit-bloch-core]（[第一章](ch01-measurement.md)） |
| **公设二：可观测量公设**（物理量为厄米算符 $A^* = A$） | 每次锐利判别都是球面上的幂等投影线 $P^2 = P = P^*$；每一张旋转平面 $J^2 = -I$ 乘以 $i$ 即对偶于一根厄米对合观测轴 $(iJ)^* = iJ$ | [@def-record-measurement]（[第三章](ch03-projectors-and-duality.md)）、[@thm-relative-complex-structure-square]（[第五章](ch05-complex-phase-and-rotors.md)） |
| **公设三：玻恩概率公设**（测量概率 $p = \Tr(\rho P) = |\langle\phi\mid\psi\rangle|^2$） | 砍掉外部第 3 点 $C$，以已知态自身为基，取几何积的内积共线投影 $\vv{A}\cdot\vv{B} = \cos\theta$（希尔伯特半角余弦平方 $\cos^2(\theta/2)$） | [@thm-born-modulus-square]、[@thm-rank-one-born-pairing]（[第二章](ch02-born-rule.md)） |
| **公设四：幺正演化公设**（量子门与薛定谔演化 $\rho \mapsto U\rho U^*$） | 由几何积的外积有向面积 $\vv{A}\wedge\vv{B} = \sin\theta\,\vv{I}$ 驱动的克利福德旋子 $R(\theta) = \exp(-\vv{B}\theta/2)$ 双侧刚体旋转 | [@thm-balanced-sum-skew-adjoint]（[第五章](ch05-complex-phase-and-rotors.md)）、[@thm-calibrated-unitary-group]（[第七章](ch07-geometric-time-and-speed-limits.md)） |
| **公设五：投影坍缩与退相干公设**（测量后状态投影更新） | 系统与环境记录正交耦合后对环境求偏迹，在希尔伯特—施密特空间中执行正交捏合投影 $\Pi(\rho)$，丢弃横向外积相干面积 | [@thm-nonselective-marginal]（[第四章](ch04-decoherence.md)）、[@cor-pinching-pythagorean]（本章） |

::: {.viz src="qubit-geometry" preset="half" height="500"}
**线与面积。** 青色粗线是 $\vv{B}$ 落在量尺 $\vv{A}$ 上的影子 $\vv{A}\cdot\vv{B} = \cos\theta$，品红色的面是两者撑开的 $\lvert\vv{A}\wedge\vv{B}\rvert = \sin\theta$。在球上拖动琥珀色的箭头：两个数此消彼长，夹角 $60^\circ$ 时线是 $0.5$、面积是 $0.87$。
:::

## 6.2 勾股守恒 $\cos^2\theta + \sin^2\theta = 1$：粒子的确定性与波的干涉面积此消彼长 {#sec-pythagorean-complementarity}

既然几何积 $\vv{A}\vv{B}$ 同时装下了粒子内积 $\vv{A}\cdot\vv{B}$ 与波动外积 $\vv{A}\wedge\vv{B}$，这两部分在数量上遵循什么铁律？

在有限维实欧氏空间 $\mathbb{R}^n$ 中，任取两根向量 $\vv{u} = (u_i)_{i \in s}$ 与 $\vv{v} = (v_i)_{i \in s}$。它们模长平方的乘积 $\|\vv{u}\|^2\|\vv{v}\|^2$，减去它们内积的平方 $(\vv{u}\cdot\vv{v})^2$，剩下的差究竟是什么？十八世纪的拉格朗日（J.-L. Lagrange）写下了著名的代数恒等式：这个差一分不差地等于所有二维坐标平面 $(i, j)$ 上张成的有向平行四边形面积元 $u_i v_j - u_j v_i$ 的平方和的一半——即外积二向量模长的平方 $\|\vv{u}\wedge\vv{v}\|^2$！

在 Lean 模块 `QuantumBounds/LagrangeGramIdentity` 中，这条连接内积线与外积面的基石恒等式对任意有限指标集 $s : \mathrm{Finset}\,\iota$ 得到了完全严格的形式化证明。

::: {.theorem #thm-lagrange-gram-identity title="拉格朗日—格拉姆内积与外积二向量平方守恒恒等式" lean="D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
设 $\iota$ 为指标类型，$s : \mathrm{Finset}\,\iota$ 为有限指标集，$u, v : \iota \to \mathbb{R}$ 为实值向量函数。则两向量模长平方之积减去内积之平方，恒等于全部分量二阶外积行列式 $(u_i v_j - u_j v_i)$ 的平方和之半：

$$
\left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 = \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
$$
:::

::: proof
将右端双重求和中的平方项 $(u_i v_j - u_j v_i)^2 = u_i^2 v_j^2 - 2 u_i v_i u_j v_j + u_j^2 v_i^2$ 逐项展开并按有限和的线性性拆分为三项：第一项 $\sum_{i \in s}\sum_{j \in s} u_i^2 v_j^2$ 与第三项 $\sum_{i \in s}\sum_{j \in s} u_j^2 v_i^2$ 重排求和哑指标后均等于 $\bigl(\sum_{i \in s} u_i^2\bigr)\bigl(\sum_{i \in s} v_i^2\bigr)$，而中间交叉项 $-2\sum_{i \in s}\sum_{j \in s} (u_i v_i)(u_j v_j)$ 因式分解为 $-2\bigl(\sum_{i \in s} u_i v_i\bigr)^2$。三项相加后再除以 $2$，恰得左端 $\bigl(\sum_{i \in s} u_i^2\bigr)\bigl(\sum_{i \in s} v_i^2\bigr) - \bigl(\sum_{i \in s} u_i v_i\bigr)^2$。完整证明由 Lean 内核检查。
:::

请细细品味 [@thm-lagrange-gram-identity] 的几何含义：把减号移到右边，它写出的就是

$$
\underbrace{\|\vv{u}\|^2 \|\vv{v}\|^2}_{\text{总几何容量}} = \underbrace{(\vv{u}\cdot\vv{v})^2}_{\text{粒子内积投影平方}} + \underbrace{\frac{1}{2}\sum_{i, j} (u_i v_j - u_j v_i)^2}_{\|\vv{u}\wedge\vv{v}\|^2\text{（波动外积面积平方）}}!
$$

特别地，当 $\vv{u}, \vv{v}$ 为单位向量（$\|\vv{u}\| = \|\vv{v}\| = 1$）时，上式立刻化为三角学第一恒等式 $\cos^2\theta + \sin^2\theta = 1$；同时因为右端外积平方和恒非负（$\|\vv{u}\wedge\vv{v}\|^2 \ge 0$），移项便立即给出柯西—施瓦茨不等式 $(\vv{u}\cdot\vv{v})^2 \le \|\vv{u}\|^2\|\vv{v}\|^2$——**原来柯西—施瓦茨不等式两边相差的那个“非负亏量”，不多不少，正是两根向量撑开的外积面积平方 $\|\vv{u}\wedge\vv{v}\|^2$！**

::: {.figure src="ch06-gram-deficit"}
**柯西—施瓦茨两边差的那一块，正是面积的平方。** 左边，灰色的 $\vv{u}$ 与琥珀色的 $\vv{v}$ 张出品红的平行四边形，面积是 $\lvert\vv{u}\wedge\vv{v}\rvert$。右边的直角三角形，两条直角边是 $\lvert\vv{u}\cdot\vv{v}\rvert$ 与 $\lvert\vv{u}\wedge\vv{v}\rvert$，斜边是 $\lvert\vv{u}\rvert\lvert\vv{v}\rvert$：青色的正方形 $(\vv{u}\cdot\vv{v})^2$ 加品红的正方形 $\lvert\vv{u}\wedge\vv{v}\rvert^2$，恰好等于斜边上的 $\lvert\vv{u}\rvert^2\lvert\vv{v}\rvert^2$（[@thm-lagrange-gram-identity]）。
:::

现在，把这套拉格朗日—格拉姆勾股分解直接搬进复内积空间 $E$（Lean 模块 `QuantumBounds/RobertsonSchrodinger`）。对于任意两根复向量 $u, v \in E$，前置引理 [`gram_wedge_identity`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.gram_wedge_identity) 证明了模方乘积分解为复内积模方与非负格拉姆楔积亏量 $G := \|u\|^2\|v\|^2 - \|\langle u, v\rangle_{\mathbb{C}}\|^2 \ge 0$ 之和：

$$
\|u\|^2\|v\|^2 = \|\langle u, v\rangle_{\mathbb{C}}\|^2 + G, \qquad G \ge 0.
$$

而在复内积 $\langle u, v\rangle_{\mathbb{C}} = \operatorname{Re}\langle u, v\rangle_{\mathbb{C}} + i\operatorname{Im}\langle u, v\rangle_{\mathbb{C}}$ 内部，实部与虚部又各自代表什么？给定单位量子态 $\psi \in E$（$\|\psi\| = 1$）以及两个对称可观测算子 $A, B : E \to_l E$，取中心化涨落向量 $u := A\psi - \langle\psi, A\psi\rangle_{\mathbb{C}}\psi$ 与 $v := B\psi - \langle\psi, B\psi\rangle_{\mathbb{C}}\psi$：

- 它们的**实部内积** $\operatorname{Re}\langle u, v\rangle_{\mathbb{C}}$ 恰好是两可观测量的对称**量子协方差（covariance）** $\operatorname{cov}(A, B)_\psi = \frac{1}{2}\operatorname{Re}\langle\psi, (AB + BA)\psi\rangle_{\mathbb{C}} - \operatorname{Re}\langle\psi, A\psi\rangle_{\mathbb{C}}\operatorname{Re}\langle\psi, B\psi\rangle_{\mathbb{C}}$；
- 它们的**虚部外积** $\operatorname{Im}\langle u, v\rangle_{\mathbb{C}}$ 恰好是两算子**对易子（commutator）**生成的有向面积期望 $\frac{1}{2i}\langle\psi, (AB - BA)\psi\rangle_{\mathbb{C}}$！

于是，$\|\langle u, v\rangle_{\mathbb{C}}\|^2 = (\operatorname{Re}\langle u, v\rangle_{\mathbb{C}})^2 + (\operatorname{Im}\langle u, v\rangle_{\mathbb{C}})^2$ 与格拉姆楔积亏量 $G \ge 0$ 合在一起，当场给出了著名的**罗伯逊—薛定谔不确定性精确恒等式（Robertson–Schrödinger identity）**！

::: {.theorem #thm-robertson-schrodinger title="罗伯逊—薛定谔方差、协方差、对易子面积与格拉姆亏量精确守恒定理" lean="D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger"}
设 $E$ 为复内积空间，$A, B : E \to_l E$ 为满足对称性条件 $\forall x, y \in E,\, \langle Ax, y\rangle_{\mathbb{C}} = \langle x, Ay\rangle_{\mathbb{C}}$ 与 $\langle Bx, y\rangle_{\mathbb{C}} = \langle x, By\rangle_{\mathbb{C}}$ 的线性算子，$\psi \in E$ 为单位态向量（$\|\psi\| = 1$）。定义中心化涨落向量、对称协方差、半对易子期望及格拉姆亏量如下：

$$
\begin{aligned}
u &:= A\psi - \langle\psi, A\psi\rangle_{\mathbb{C}}\psi, \qquad v := B\psi - \langle\psi, B\psi\rangle_{\mathbb{C}}\psi, \\
\mathrm{cov} &:= \frac{1}{2}\operatorname{Re}\bigl\langle\psi, (AB + BA)\psi\bigr\rangle_{\mathbb{C}} - \operatorname{Re}\langle\psi, A\psi\rangle_{\mathbb{C}}\operatorname{Re}\langle\psi, B\psi\rangle_{\mathbb{C}} \in \mathbb{R}, \\
C_{1/2} &:= \frac{1}{2i}\bigl\langle\psi, (AB - BA)\psi\bigr\rangle_{\mathbb{C}} \in \mathbb{C}, \\
G &:= \|u\|^2\|v\|^2 - \|\langle u, v\rangle_{\mathbb{C}}\|^2 \in \mathbb{R}.
\end{aligned}
$$

则以下三条结论同时成立：

1. **四项勾股分解恒等式**：$\|u\|^2\|v\|^2 = \mathrm{cov}^2 + \|C_{1/2}\|^2 + G$；
2. **格拉姆楔积亏量非负性**：$G \ge 0$（[`gram_wedge_identity`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.gram_wedge_identity)）；
3. **复内积实虚部精确对应**：$\operatorname{Re}\langle u, v\rangle_{\mathbb{C}} = \mathrm{cov}$ 且 $(\operatorname{Im}\langle u, v\rangle_{\mathbb{C}} : \mathbb{C}) = C_{1/2}$。
:::

::: proof
首先验证复内积 $\langle u, v\rangle_{\mathbb{C}}$ 的展开。因 $A, B$ 对称，对任意 $\psi \in E$ 有 $\langle\psi, A\psi\rangle_{\mathbb{C}} = \overline{\langle\psi, A\psi\rangle_{\mathbb{C}}}$，故期望值 $\langle\psi, A\psi\rangle_{\mathbb{C}}$ 与 $\langle\psi, B\psi\rangle_{\mathbb{C}}$ 均为纯实数；再利用 $\|\psi\| = 1$（即 $\langle\psi, \psi\rangle_{\mathbb{C}} = 1$）展开 $\langle A\psi - \langle\psi, A\psi\rangle_{\mathbb{C}}\psi,\, B\psi - \langle\psi, B\psi\rangle_{\mathbb{C}}\psi\rangle_{\mathbb{C}}$，交叉项合并后得到

$$
\langle u, v\rangle_{\mathbb{C}} = \langle A\psi, B\psi\rangle_{\mathbb{C}} - \operatorname{Re}\langle\psi, A\psi\rangle_{\mathbb{C}}\operatorname{Re}\langle\psi, B\psi\rangle_{\mathbb{C}}.
$$

再由算子对称性知 $\langle A\psi, B\psi\rangle_{\mathbb{C}} = \langle\psi, AB\psi\rangle_{\mathbb{C}}$ 且 $\overline{\langle A\psi, B\psi\rangle_{\mathbb{C}}} = \langle B\psi, A\psi\rangle_{\mathbb{C}} = \langle\psi, BA\psi\rangle_{\mathbb{C}}$。将任意复数 $z = \langle\psi, AB\psi\rangle_{\mathbb{C}}$ 按 $\operatorname{Re} z = \frac{1}{2}\operatorname{Re}(z + \overline{z})$ 与 $(\operatorname{Im} z : \mathbb{C}) = \frac{z - \overline{z}}{2i}$ 拆开，即得 $\operatorname{Re}\langle u, v\rangle_{\mathbb{C}} = \mathrm{cov}$ 与 $(\operatorname{Im}\langle u, v\rangle_{\mathbb{C}} : \mathbb{C}) = C_{1/2}$（结论 3）。由此得复模方分解 $\|\langle u, v\rangle_{\mathbb{C}}\|^2 = (\operatorname{Re}\langle u, v\rangle_{\mathbb{C}})^2 + (\operatorname{Im}\langle u, v\rangle_{\mathbb{C}})^2 = \mathrm{cov}^2 + \|C_{1/2}\|^2$；结合 [`gram_wedge_identity`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.gram_wedge_identity) 给出的 $\|u\|^2\|v\|^2 = \|\langle u, v\rangle_{\mathbb{C}}\|^2 + G$ 及 $G \ge 0$（由内积空间柯西—施瓦茨不等式 $\|\langle u, v\rangle_{\mathbb{C}}\| \le \|u\|\|v\|$ 平方即得），立即推出结论 1 与结论 2。完整证明由 Lean 内核检查。
:::

看清 [@thm-robertson-schrodinger] 的结构了吗？传统海森堡—罗伯逊不确定性不等式 $\Delta A^2\,\Delta B^2 = \|u\|^2\|v\|^2 \ge \|C_{1/2}\|^2 = \frac{1}{4}|\langle [A, B]\rangle|^2$ 并不是什么模糊的“测量扰动玄学”，而是因为左端总几何容量 $\|u\|^2\|v\|^2$ 等于三个非负实平方项 $\mathrm{cov}^2 + \|C_{1/2}\|^2 + G$ 之和！只要两算子的非对易面积 $\|C_{1/2}\|^2 > 0$ 不为零，哪怕协方差 $\mathrm{cov} = 0$ 且格拉姆亏量 $G = 0$，涨落乘积也绝不可能压到对易子面积 $\|C_{1/2}\|^2$ 以下！

[@thm-robertson-schrodinger] 的前提是单位向量 $\psi$，也就是纯态。[第四章](ch04-decoherence.md)之后，球心附近的混合态同样是合法的状态，不确定关系在那里还成立吗？成立，而且证明仍然是一条柯西—施瓦茨不等式：只需把态向量 $\psi$ 换成矩阵 $\sqrt{\rho}$，把向量内积换成矩阵的希尔伯特—施密特内积。所钉仓库的模块 `D5/S3/QuantumBounds/Designs/MixedStateRobertson` 冻结了这条结论。

::: {.theorem #thm-mixed-state-robertson title="混合态下的罗伯逊不确定关系" lean="D5/S3/QuantumBounds/Designs/MixedStateRobertson.mixed_state_robertson_uncertainty"}
设 $d$ 为有限指标类型（`[Fintype d]`、`[DecidableEq d]`），$\rho$ 为 $d$ 上的密度态（`DensityState d`：半正定且迹为 $1$ 的 $d \times d$ 复矩阵），$A, B$ 为 $d \times d$ 复厄米矩阵（`A.IsHermitian`、`B.IsHermitian`）。记 $\sqrt{\rho}$ 为 $\rho$ 的半正定平方根（`CFC.sqrt`），并令

$$
u := \bigl(A - \Tr(\rho A)\cdot 1\bigr)\sqrt{\rho}, \qquad v := \bigl(B - \Tr(\rho B)\cdot 1\bigr)\sqrt{\rho} .
$$

以希尔伯特—施密特范数 $\norm{X} = \sqrt{\Tr(X^{\dagger}X)}$ 度量矩阵（Lean 模块中由内积 $\langle X, Y\rangle = \Tr(X^{\dagger}Y)$ 给出），则

$$
\norm{u}\,\norm{v} \;\ge\; \frac{1}{2}\,\bigl\lvert \Tr\bigl(\rho\,(AB - BA)\bigr) \bigr\rvert .
$$
:::

::: proof
记 $a = \Tr(\rho A)$、$b = \Tr(\rho B)$；$A, B$ 厄米而 $\rho$ 半正定，故 $a, b$ 为实数。由迹的循环性，$\langle u, v\rangle = \Tr\bigl(\sqrt{\rho}\,(A - a)(B - b)\sqrt{\rho}\bigr) = \Tr\bigl(\rho\,(A - a)(B - b)\bigr)$，同理 $\langle v, u\rangle = \Tr\bigl(\rho\,(B - b)(A - a)\bigr)$。两式相减，常数项全部抵消：$\langle u, v\rangle - \langle v, u\rangle = \Tr\bigl(\rho\,(AB - BA)\bigr)$。而 $\langle v, u\rangle = \overline{\langle u, v\rangle}$，所以左端等于 $2i\operatorname{Im}\langle u, v\rangle$。于是 $\frac{1}{2}\lvert\Tr(\rho\,(AB - BA))\rvert = \lvert\operatorname{Im}\langle u, v\rangle\rvert \le \lvert\langle u, v\rangle\rvert \le \norm{u}\,\norm{v}$，最后一步是柯西—施瓦茨不等式。完整证明由 Lean 内核检查。
:::

定理里的 $\norm{u}$ 就是标准差。同样由迹的循环性（一行手工推导），

$$
\norm{u}^2 \;=\; \Tr\bigl(\sqrt{\rho}\,(A - a)^2\sqrt{\rho}\bigr) \;=\; \Tr\bigl(\rho\,(A - a)^2\bigr) \;=\; \Tr(\rho A^2) - \Tr(\rho A)^2 \;=\; \sigma_A^2 ,
$$

所以 [@thm-mixed-state-robertson] 读作 $\sigma_A\,\sigma_B \ge \frac{1}{2}\lvert\langle[A, B]\rangle_\rho\rvert$，与纯态时形式相同。不同之处藏在余量里：态变混之后，不等式究竟松了多少？单比特可以把它完全算出来。

::: {.example #ex-mixed-qubit-robertson-slack title="单比特混合态：不等式的余量恰好是混合度加协方差平方"}
取布洛赫向量为 $\vv{r} = (r_x, r_y, r_z)$（$\norm{\vv{r}} \le 1$）的单比特态 $\rho = \frac{1}{2}(I + r_x\sigma_x + r_y\sigma_y + r_z\sigma_z)$，以及 $A = \sigma_x$、$B = \sigma_y$。

**三个量。** 由 $\sigma_x^2 = I$ 与 $\Tr(\rho\,\sigma_x) = r_x$：$\sigma_A^2 = 1 - r_x^2$，同理 $\sigma_B^2 = 1 - r_y^2$。由 $\sigma_x\sigma_y - \sigma_y\sigma_x = 2i\sigma_z$：$\frac{1}{2}\lvert\Tr(\rho\,(AB - BA))\rvert = \lvert r_z\rvert$。[@thm-mixed-state-robertson] 此时断言

$$
\sqrt{(1 - r_x^2)(1 - r_y^2)} \;\ge\; \lvert r_z\rvert .
$$

**余量恒等式。** 把两端平方后相减并展开（手工推导）：

$$
(1 - r_x^2)(1 - r_y^2) - r_z^2 \;=\; \bigl(1 - \norm{\vv{r}}^2\bigr) \;+\; r_x^2\,r_y^2 .
$$

右端两项都非负，不等式由此再次得证，而且两项各有含义：

- $r_x^2 r_y^2$ 是协方差的平方。由 $\sigma_x\sigma_y + \sigma_y\sigma_x = 0$，对称协方差为 $\frac{1}{2}\langle AB + BA\rangle - \langle A\rangle\langle B\rangle = -r_x r_y$。这一项在纯态时已经存在，就是 [@thm-robertson-schrodinger] 里的 $\mathrm{cov}^2$。
- $1 - \norm{\vv{r}}^2 = 2\bigl(1 - \Tr(\rho^2)\bigr)$ 是混合度，它正是 $u, v$ 两个矩阵的格拉姆亏量 $\norm{u}^2\norm{v}^2 - \lvert\langle u, v\rangle\rvert^2$。纯态时它为零：单比特纯态的两个涨落向量都落在与 $\psi$ 正交的那一维子空间里，必然平行。态离开球面多远，这一项就有多大。

**数值表。** 下表各行另用 $2 \times 2$ 矩阵直接计算 $u$、$v$ 与两端核对，四舍五入到所示位数：

| $\vv{r}$ | $\sigma_A\sigma_B$ | $\lvert r_z\rvert$ | $1 - \norm{\vv{r}}^2$ | $r_x^2 r_y^2$ | $(\sigma_A\sigma_B)^2 - r_z^2$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $(0, 0, 1)$ | $1$ | $1$ | $0$ | $0$ | $0$ |
| $(0.6, 0, 0.8)$ | $0.8$ | $0.8$ | $0$ | $0$ | $0$ |
| $\frac{1}{\sqrt{3}}(1, 1, 1)$ | $0.6667$ | $0.5774$ | $0$ | $0.1111$ | $0.1111$ |
| $(0, 0, 0.6)$ | $1$ | $0.6$ | $0.64$ | $0$ | $0.64$ |
| $(0.5, 0.5, 0.5)$ | $0.75$ | $0.5$ | $0.25$ | $0.0625$ | $0.3125$ |
| $(0, 0, 0)$ | $1$ | $0$ | $1$ | $0$ | $1$ |

前三行是纯态：余量只来自协方差，前两行取等。后三行是混合态：第四行沿 $z$ 轴缩进球内，对易子期望从 $1$ 降到 $0.6$，而两个标准差的乘积仍是 $1$；最后一行是球心，对易子期望为零，不等式变成 $1 \ge 0$。
:::

沿固定布洛赫方向向球心收缩时，方差不减；上述平方余量由混合度与协方差平方共同组成（$r_x r_y = 0$ 时只有混合度项）。

## 6.3 双缝干涉与惠勒延迟选择的纯几何拆解：拆掉面积还是保留面积？ {#sec-double-slit-delayed-choice}

现在，让我们带着这把锋利的几何手术刀，走进费曼口中“包含了量子力学唯一真正奥秘”的**双缝干涉实验（double-slit interference）**与约翰·惠勒（John Archibald Wheeler）提出的**延迟选择思想实验（delayed-choice experiment）**。

当一颗光子或电子穿过左缝 $\lvert L\rangle$ 与右缝 $\lvert R\rangle$ 时，如果在狭缝后方有某个环境自由度（或者路径探测器）试图记录“粒子到底走了哪条缝”，那么左缝分支会耦合到单位环境记录态 $r_L \in E$（$\|r_L\| = 1$），右缝分支会耦合到单位环境记录态 $r_R \in E$（$\|r_R\| = 1$）。

::: {.figure src="ch06-three-markers"}
**标记的两支箭头决定屏上有没有条纹。** 在等权纯双路、理想平衡合束并扫描参考相位的模型中，每行左边是标记的两支箭头，灰色的 $r_L$ 与琥珀色的 $r_R$，右边是屏上落点的分布。不标记（$\alpha = 0$）：两支箭头重合，屏上是对比度满格的青色条纹。标记路径（$\alpha = 90^\circ$）：两支箭头垂直，品红的竖线是可区分度 $D = 1$，屏上只剩一个没有条纹的鼓包。擦除标记：箭头仍然垂直，改沿紫色的斜线读标记，按读数分出的两行是青色的条纹与错开半格的虚线反条纹，合起来仍是那个鼓包。包络是示意。
:::

请盯住这两根环境记录箭头 $r_L$ 与 $r_R$ 之间的复内积重叠幅 $c := \langle r_L, r_R\rangle_{\mathbb{C}}$：

- 在**等权纯双路、理想平衡合束并扫描参考相位**的模型中，令 $\alpha := \arccos |c| \in [0, \pi/2]$。记录重叠可见度为 $V := \|c\| = |\langle r_L, r_R\rangle_{\mathbb{C}}| = \cos\alpha \in [0, 1]$；
- **路径记录的可区分度（record distinguishability）** $D := \sqrt{1 - V^2} = \sin\alpha \in [0, 1]$，正是两根记录向量垂直张开的**外积正弦面积模长**！

::: {.viz src="double-slit-marker" preset="partial" height="500"}
**标记转开 $60^\circ$。** 右边的圆里，琥珀色的箭头 $r_R$ 与横放的 $r_L$ 夹角 $\alpha = 60^\circ$：青色的影子是可见度 $V = \cos\alpha = 0.5$，品红的高是可区分度 $D = \sin\alpha \approx 0.87$，点在圆上。左边屏上的落点仍堆出条纹，只是暗纹不再全黑，青色的带子窄了一半。
:::

在 Lean 模块 `Quantum/PureState/RecordCoherenceComplementarity` 中，下面这条核心定理严格证明了 $D$ 与 $V$ 满足丝毫不差的勾股守恒律 $D^2 + V^2 = 1$，并锁定了“纯粒子记录”与“纯波干涉”两个极端端点的充要条件。

::: {.theorem #thm-record-coherence-complementarity title="纯态路径记录可区分度与相干可见度的勾股互补定理" lean="D5/S3/Quantum/PureState/RecordCoherenceComplementarity.pure_record_distinguishability_coherence_complementarity"}
设 $E$ 为复内积空间，$r_L, r_R \in E$ 为左、右两条路径对应的单位环境记录态（满足 $\|r_L\| = 1$ 且 $\|r_R\| = 1$）。定义记录重叠幅、相干可见度与路径可区分度分别为

$$
c := \langle r_L, r_R\rangle_{\mathbb{C}} \in \mathbb{C}, \qquad V := \|c\| \in \mathbb{R}, \qquad D := \sqrt{1 - V^2} \in \mathbb{R}.
$$

则以下五条互补性质同时成立：

1. **精确勾股互补圆**：$D^2 + V^2 = 1$；
2. **正交记录导致纯粒子极限**：若 $c = 0$（两环境记录正交），则 $D = 1$ 且 $V = 0$；
3. **平行记录导致纯波动极限**：若 $V = 1$（两环境记录完全重叠），则 $D = 0$ 且 $V = 1$；
4. **完全路径区分彻底抹除干涉项**：若 $D = 1$，则 $V = 0$，且对任意复振幅 $a \in \mathbb{C}$ 恒有 $c \cdot a = 0$；
5. **完全干涉可见度抹除路径信息**：若 $V = 1$，则 $D = 0$。
:::

::: proof
由内积空间柯西—施瓦茨不等式及单位范数条件 $\|r_L\| = \|r_R\| = 1$，有 $0 \le V = \|\langle r_L, r_R\rangle_{\mathbb{C}}\| \le \|r_L\|\|r_R\| = 1$，故 $1 - V^2 \ge 0$。对非负实数 $1 - V^2$ 取算术平方根后再平方，得 $D^2 = (\sqrt{1 - V^2})^2 = 1 - V^2$，移项即得 $D^2 + V^2 = 1$（性质 1）。若 $c = 0$，则 $V = \|0\| = 0$ 且 $D = \sqrt{1 - 0} = 1$（性质 2）。若 $V = 1$，则 $D = \sqrt{1 - 1^2} = 0$（性质 3 与性质 5）。反之若 $D = 1$，代入性质 1 得 $1 + V^2 = 1$，故 $V^2 = 0 \implies V = \|c\| = 0 \implies c = 0$，从而对任意 $a \in \mathbb{C}$ 均有 $c \cdot a = 0 \cdot a = 0$（性质 4）。完整证明由 Lean 内核检查。
:::

::: {.viz src="double-slit-marker" preset="which" height="500"}
**正交标记，条纹消失。** $\alpha = 90^\circ$：两支箭头垂直，青色的影子缩成零，品红的高到顶，点停在圆的最高处（[@thm-record-coherence-complementarity] 的性质 2）。屏上的落点堆成一个没有条纹的鼓包。
:::

同时，从单比特约化密度矩阵 $\rho \in M_2(\mathbb{C})$ 的视角来看（回忆[第四章](ch04-decoherence.md)的 [@thm-pinching-pythagorean]），当环境记录彻底正交（$c = 0$）并执行标准基捏合投影 $\Pi(\rho)$（[`pinching`](lean:D5/S3/QuantumChannels/Pinching.pinching)）时，对角粒子布居 $\Pi(\rho)$ 与副对角波动相干残差 $\rho - \Pi(\rho)$ 在希尔伯特—施密特内积（[`hilbertSchmidtInner`](lean:D5/S3/QuantumChannels/Pinching.hilbertSchmidtInner)）下严格正交（[`pinching_hilbert_schmidt_orthogonal`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_orthogonal)）。我们将其作为本章几何积正交分解在算子空间上的直接推论重申如下：

::: {.corollary #cor-pinching-pythagorean title="单比特捏合投影的正交勾股分解与副对角波动相干质量" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass"}
对任意单比特矩阵 $\rho \in M_2(\mathbb{C})$ 及标准基对角捏合算子 $\Pi(\rho)_{ij} = \delta_{ij}\rho_{ij}$（[`pinching`](lean:D5/S3/QuantumChannels/Pinching.pinching)），对角粒子部分 $\Pi(\rho)$ 与副对角相干残差 $\rho - \Pi(\rho)$ 在希尔伯特—施密特内积 $\langle X, Y\rangle_{\mathrm{HS}} = \Tr(X^* Y)$ 下正交（$\langle \Pi(\rho),\, \rho - \Pi(\rho)\rangle_{\mathrm{HS}} = 0$，[`pinching_hilbert_schmidt_orthogonal`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_orthogonal)），故总希尔伯特—施密特范数平方满足正交勾股分解

$$
\langle \rho, \rho\rangle_{\mathrm{HS}} = \langle \Pi(\rho), \Pi(\rho)\rangle_{\mathrm{HS}} + \langle \rho - \Pi(\rho),\, \rho - \Pi(\rho)\rangle_{\mathrm{HS}},
$$

且被捏合抹去的副对角波动相干质量恒等于

$$
\langle \rho - \Pi(\rho),\, \rho - \Pi(\rho)\rangle_{\mathrm{HS}} = |\rho_{01}|^2 + |\rho_{10}|^2.
$$
:::

::: proof
由 [`pinching_hilbert_schmidt_orthogonal`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_orthogonal) 知交叉内积 $\langle \Pi(\rho),\, \rho - \Pi(\rho)\rangle_{\mathrm{HS}} = 0$ 且 $\langle \rho - \Pi(\rho),\, \Pi(\rho)\rangle_{\mathrm{HS}} = 0$，对恒等分解 $\rho = \Pi(\rho) + (\rho - \Pi(\rho))$ 展开双线性内积即得勾股分解式；将 $2\times 2$ 矩阵 $\rho - \Pi(\rho) = \bigl(\begin{smallmatrix} 0 & \rho_{01} \\ \rho_{10} & 0 \end{smallmatrix}\bigr)$ 代入 $\Tr((\rho - \Pi(\rho))^*(\rho - \Pi(\rho)))$ 即得 $|\rho_{01}|^2 + |\rho_{10}|^2$。完整证明由 Lean 内核检查。
:::

现在再看惠勒的“延迟选择实验”，哪里还有半点“现在的测量窜改了光子几亿年前是粒子还是波的历史”的玄学惊悚？

::: {.example #ex-wheeler-delayed-choice-tradeoff title="双路径干涉仪与惠勒延迟选择的三档角度（α = 0, π/3, π/2）定量账本"}
设双路径干涉仪中系统初态为等权叠加 $\frac{1}{\sqrt{2}}(\lvert 0\rangle + \lvert 1\rangle)$，与环境记录态耦合为 $\frac{1}{\sqrt{2}}(\lvert 0\rangle\otimes\lvert r_L\rangle + \lvert 1\rangle\otimes\lvert r_R\rangle)$。对下方实矩阵例，取两单位环境记录态的重叠为实且非负的 $c = \langle r_L, r_R\rangle = \cos\alpha$，其中 $\alpha \in [0, \pi/2]$；这是等权、理想平衡合束并扫描参考相位的模型。忽略环境后的单比特约化密度矩阵为

$$
\rho(\alpha) = \frac{1}{2}\begin{pmatrix} 1 & \cos\alpha \\ \cos\alpha & 1 \end{pmatrix}.
$$

由 [@thm-record-coherence-complementarity] 与 [@cor-pinching-pythagorean]，我们在三档典型实验夹角下直接算出粒子可区分度 $D$、干涉可见度 $V$ 及副对角相干质量 $|\rho_{01}|^2 + |\rho_{10}|^2 = \frac{1}{2}\cos^2\alpha$：

| 环境记录夹角 $\alpha$ | 记录内积 $c = \cos\alpha$ | 干涉可见度 $V$ | 路径可区分度 $D = \sin\alpha$ | 勾股校验 $D^2 + V^2$ | 约化态相干质量 $|\rho_{01}|^2 + |\rho_{10}|^2$ | 物理图景（惠勒延迟选择） |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **$\alpha = 0$**（量子擦除 / 合束） | $1$ | $1$ | $0$ | $0 + 1 = 1$ | $\frac{1}{4} + \frac{1}{4} = \frac{1}{2}$ | 环境未区分路径，完整保留二维外积干涉面积 |
| **$\alpha = \frac{\pi}{3} = 60^\circ$**（部分标记） | $\frac{1}{2}$ | $\frac{1}{2}$ | $\frac{\sqrt{3}}{2} \approx 0.866$ | $\frac{3}{4} + \frac{1}{4} = 1$ | $\frac{1}{16} + \frac{1}{16} = \frac{1}{8}$ | 半粒子半波：可见度保留 $50\%$，路径区分度 $86.6\%$ |
| **$\alpha = \frac{\pi}{2} = 90^\circ$**（正交标记） | $0$ | $0$ | $1$ | $1 + 0 = 1$ | $0$（标记前 $\frac{1}{2}$ 已转入环境） | 正交记录将局部态捏合为一维对角线 $\frac{1}{2}I_2$，干涉归零 |

所谓的“延迟选择”，根本不是时光倒流：在合束器前，联合态 $\frac{1}{\sqrt{2}}(\lvert 0\rangle\lvert r_L\rangle + \lvert 1\rangle\lvert r_R\rangle)$ 本就是一个同时包含对角线与异号交叉块的完整几何积场；你在终点处选择放上正交读出器（投影到对角粒子线）还是干涉合束器（投影到横向二向量面积），只是在决定**你的探测器在终点处截取这个联合场的哪一个正交投影面**！
:::

::: {.viz src="double-slit-marker" preset="delayed" height="500"}
**先落点，后读标记。** $\alpha = 90^\circ$，落点全部到齐之后才按路径读标记：同一批落点被复制成“左缝”“右缝”两行，品红的两行都是没有条纹的鼓包。
:::

::: {.viz src="double-slit-marker" preset="erase" height="500"}
**同一批落点，换一种读法。** 还是这些落点，改按擦除方向读标记：青色的一行是条纹，另一行是错开半格的反条纹，两行合起来仍是上面那个鼓包。后来的选择没有移动屏上任何一个落点，只决定怎样把它们分开。
:::

::: {.remark #rem-englert-greenberger-literature title="Wootters–Zurek、Greenberger–Yasin 与 Englert 波粒二象性不等式（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本章的 [@thm-record-coherence-complementarity] 针对纯环境记录态 $\|r_L\| = \|r_R\| = 1$ 给出了以记录重叠度 $V = |\langle r_L, r_R\rangle|$ 定义的可见度与 $D = \sqrt{1 - V^2}$ 之间的精确勾股等式 $D^2 + V^2 = 1$。在量子光学与干涉学文献中，关于定量波粒二象性的历史演进与混合态推广包括：

1. **Wootters–Zurek 双缝信息分析（W. K. Wootters & W. H. Zurek, 1979）**：在 *Complementarity in the double-slit experiment: Quantum nonseparability and a quantitative statement of Bohr's principle*（Phys. Rev. D **19**, 473–484, 1979）中，首次证明了即便只获取极微弱的部分路径信息，干涉条纹可见度也能保持相当高的数值（如 [@ex-wheeler-delayed-choice-tradeoff] 中 $D = \frac{\sqrt{3}}{2} \approx 86.6\%$ 时仍有 $V = 50\%$ 的清晰条纹）。
2. **Greenberger–Yasin 可预测性对偶（D. M. Greenberger & A. Yasin, 1988）与 Jaeger–Shimony–Vaidman（1995）**：对于双通道先验布居不对称 $p_0 \neq p_1$ 的纯态，先验路径可预测度 $P := |p_0 - p_1|$ 与干涉可见度 $V = 2|\rho_{01}|$ 满足 $P^2 + V^2 \le 1$（纯态取等号，即本书[第三章](ch03-projectors-and-duality.md) [@thm-complementary-pythagoras] 导出的布洛赫球关系 $r_z^2 + (r_x^2 + r_y^2) = \|\vv{r}\|^2 \le 1$）。
3. **Englert 混合环境一般对偶不等式（B.-G. Englert, 1996）**：在 *Fringe visibility and which-way information: An inequality*（Phys. Rev. Lett. **77**, 2154–2157, 1996）中，Englert 用两个一般混合环境态 $\rho_L, \rho_R$ 之间的迹距离（trace distance）独立定义无偏路径可区分度 $D_{\mathrm{tr}} := \frac{1}{2}\Tr|\rho_L - \rho_R|$，并证明了对任意混合环境初态恒有（Englert 1996 原文利用极分解与柯西—施瓦茨不等式直接导出；现代量子信息论文献亦常由 Fuchs–van de Graaf 迹距离—保真度不等式给出等价证明）
   $$
   D_{\mathrm{tr}}^2 + V^2 \le 1,
   $$
   其中当双路径先验权重相等（$p_0 = p_1 = \frac{1}{2}$）且系统与环境初态均为纯态（如 [@thm-record-coherence-complementarity] 的等权纯记录模型，此时纯态迹距离 $\frac{1}{2}\Tr|\lvert r_L\rangle\langle r_L\rvert - \lvert r_R\rangle\langle r_R\rvert| = \sqrt{1 - |\langle r_L, r_R\rangle|^2} = D$）时，不等式饱和为单位圆精确等号 $D_{\mathrm{tr}}^2 + V^2 = 1$；而对一般混合态则有 $D_{\mathrm{tr}}^2 + V^2 \le 1$（注：当两路径条件标记幺正算子完全相同时，混合环境亦可平凡地取到 $D_{\mathrm{tr}} = 0, V = 1$ 的等号）。

一般混合环境迹距离下的 Englert 不等式作为文献背景引述，不列入本书的 Lean 形式化验证账本。
:::

::: {.viz src="double-slit-marker" preset="mixed" height="500"}
**混合的标记落在圆内。** 标记本身带噪声（纯度 $\lambda = 0.5$）：可见度仍是 $V = 0.5$，能读出的迹距离可区分度只剩 $0.43$，点沿品红的虚弧落进圆内，$D^2 + V^2 \approx 0.44 < 1$。这是上面 Englert 不等式（文献结果，未在本书形式化）的一个实例。
:::

::: {.viz src="qubit-geometry" preset="area" height="500"}
**全是面积的一端。** $\vv{B}$ 与 $\vv{A}$ 垂直时，线缩成一个点，面积撑到最大：两种咔哒各占一半，条纹最清楚。用图下方的 ◀ 切到“全是线”的另一端，对照 [@thm-record-coherence-complementarity] 的两个极限。
:::

::: {.viz src="double-slit-marker" height="560"}
交互实验室 `SLIT//MARKER`：屏上一个个到达的落点与条纹，互补圆上的两支标记箭头 $r_L$、$r_R$；拖动夹角，切换读标记的方式，或调低标记的纯度。页面上的数是数值演示；$D^2 + V^2 = 1$ 由 [@thm-record-coherence-complementarity] 保证，由 Lean 内核检查。
:::

## 6.4 交互实验：亲手拨动两子几何积、粒子内积与波动外积面 {#sec-interactive-qubit-geometry}


百闻不如一试。下面是完整的交互实验室 **`ORTHO//QUBIT`**。中间的布洛赫球是主角：拖动琥珀色的态矢量 $\vv{B}$，对着青色的量尺 $\vv{A}$ 看它的两个投影。

- **线与面积**：青色粗线是影子 $\vv{A}\cdot\vv{B} = \cos\theta$，品红色的面是 $\lvert\vv{A}\wedge\vv{B}\rvert = \sin\theta$；右栏的读数始终给出两者平方和为 $1$（[@thm-lagrange-gram-identity] 取 $u = \vv{A}$、$v = \vv{B}$）。
- **探测器看到什么**：左下的图把线读成两种咔哒的概率 $\cos^2(\theta/2)$ 与 $\sin^2(\theta/2)$，把面积读成双路干涉条纹的明暗对比。这一读法是示意模型，不是对某个实验装置的模拟。
- **门是旋子**：点 `X, Y, Z, H, S, T` 或自选转角，态矢量沿球面转动；右下的图同时画出线 $\vv{A}\cdot\vv{B}$ 与旋子的标量部 $w$。矢量转一圈回到原处时 $w = -1$，转两圈才回到 $+1$；$HZH$ 与 $X$ 在球面上是同一个转动，旋子却差一个负号。

左栏的八张实验卡各讲一件事；本章与[第五章](ch05-complex-phase-and-rotors.md)正文里的图，就是其中的几张。

::: {.viz src="qubit-geometry" height="620"}
交互实验室 `ORTHO//QUBIT`：布洛赫球上的线 $\vv{A}\cdot\vv{B}$ 与面积 $\vv{A}\wedge\vv{B}$、探测器的咔哒与条纹，以及矢量一圈、旋子两圈的双覆盖。页面上的数是数值演示；所引定理由 Lean 内核检查。
:::

既然“粒子是线，面积是波，两者合起来是同一个几何积场”，那么当这片有向面积随着物理参数连续扫掠时，这个被我们称作“时间”的维度，在几何上又是什么？为什么作者会脱口而出*“我的直觉是,线是经典时间,面积是量子时间”*？让我们进入[第七章](ch07-geometric-time-and-speed-limits.md)。
