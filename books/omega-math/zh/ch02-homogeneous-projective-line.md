# 第二章 一维齐次射影闭环与对径锚点

> *“实数轴之所以在尽头炸出无穷大 $\infty$，不是因为宇宙真的逃到了无穷远，而是因为我们在计算斜率时粗暴地除以了第二分量 $Q$；保留齐次整数对 $[P : Q]$，曾经令直线崩塌的 $1/0$ 不过是圆环对面一枚分母恒等于 $1$ 的普通锚点 $[1 : 0]$。”*

传统分析学教给我们的第一件工具就是开口实数轴 $\mathbb{R}$。它看起来如此亲切，却暗藏两道致命的几何硬伤：其一，当一条射线绕圆心转近 $90^\circ$ 时，斜率 $t = P/Q$ 急剧拉长，微小的方向扰动在实轴上被放大成灾难性的数值爆冲；其二，射线刚触及垂直位置（$Q = 0$），单数斜率立刻触发除零崩塌，整条实数轴在两端撕裂开来，只得在外边硬补一个既不能做四则运算又破坏代数封闭的异质符号 $\infty$。

本章在零公理裸 CIC 地板上彻底废除开口实数轴，改以**齐次整数射影线 $\mathbb{QP}^1$** 承载一维方向与标度。我们将看到：只需用整数平方和 $P^2 + Q^2$ 取代单个分母 $Q$，保真度 $\kappa$、展开度 $s$ 与有理凯莱圆坐标就在整条闭环上处处有限、零奇点、零无理数，且本章的六条核心闭合定理全部对应 D5 冻结声明，严格端记录列出 `OmegaInit` 与 `OmegaMath`，公理依赖为 `strict_omega.axioms: []`。

## 2.1 从开口实轴到齐次整数射影线 $\mathbb{QP}^1$ {#sec-ch02-qp1-construction}

把一维有理斜率 $t = P/Q$ 从单数商改写成齐次整数对 $[P : Q]$，就像把一只折断后强行拉直的铁环重新首尾焊接起来。只要整数对 $(P, Q) \in \mathbb{Z}^2$ 不同时为零，其整数平方和

$$
\operatorname{normSq}(P, Q) \;=\; P^2 + Q^2 \;\ge\; 1
$$

就严格为正。把互素条件 $\gcd(\lvert P\rvert, \lvert Q\rvert) = 1$ 与规范符号锁定（约定 $Q > 0$，或在 $Q = 0$ 时取 $P = 1$）结合起来，射影线 $\mathbb{QP}^1$ 上的每一个点便拥有唯一的整数双元组代表，无需任何商类型公理 `Quot.sound` 即可按分量判定相等。

在零公理基础库 `OmegaMath` 中，为了连最大公约数约分也不必塞进底层分数构造子，我们把精确分数建成纯归纳类型：非负分数 `Omega.Ratio` 与有号分数 `Omega.IntRatio` 各自显式包含两个构造子——一个是零分母对应的 `undefined` 分支，另一个是带严格正分母（以其前驱自然数编码）的有限分数分支。两条分数是否等价，由交叉相乘相等性（`Omega.Ratio.Equivalent` 与 `Omega.IntRatio.Equivalent`）判定，且 `undefined` 只与 `undefined` 等价。

::: {.definition #def-ch02-qp1-kappa-spread title="齐次射影对、保真度 $\kappa$、展开度 $s$ 与有理凯莱坐标"}
对任意自然数或有号整数坐标对 $(p, q)$，定义平方范数 $\operatorname{normSq}(p, q) := p^2 + q^2 \in \mathbb{N}$。以 `Omega.Ratio`（对自然数对）或 `Omega.IntRatio`（对有号整数对）为取值域（分母为零时取显式未定义值 `undefined`），定义：

1. **射影保真度（重叠读数）**与**失准展开度**：

   $$
   \kappa(p, q) \;:=\; \frac{q^2}{p^2 + q^2}, \qquad s(p, q) \;:=\; \operatorname{spread}(p, q) \;:=\; \frac{p^2}{p^2 + q^2}.
   $$

2. **有理凯莱单位圆坐标**：对有号整数对 $(p, q)$，定义

   $$
   \operatorname{cayleyX}(p, q) \;:=\; \frac{q^2 - p^2}{p^2 + q^2}, \qquad \operatorname{cayleyY}(p, q) \;:=\; \frac{pq + qp}{p^2 + q^2} \;=\; \frac{2pq}{p^2 + q^2}.
   $$

3. **非零条件**：称有号整数对 $(p, q)$ 非零（记作 $\operatorname{Nonzero}(p, q)$），若 $p \neq 0 \lor q \neq 0$。互素规范射影对的集合记为 $\mathbb{QP}^1$，其中 $(p, q)$ 与 $(-p, -q)$ 表示同一射影点 $[p : q]$。
:::

要使上述读数真正成为射影点 $[p : q]$ 的内禀不变量，而不是依赖于具体代表元选取的坐标假象，第一道必须过的关口便是**缩放不变性**：给两个坐标同时乘以一个公共非零因子，读数必须保持不变。先看最朴素的正自然数量级缩放——下面的定理属于零公理 `OmegaInit` 与 `OmegaMath` 内核层（公理闭包为空集）：

::: {.theorem #thm-ch02-nat-kappa-scale title="正自然数缩放保持射影保真度" lean="D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale"}
设 $p, q, k$ 为 `Omega.Nat` 中的任意自然数，令正缩放因子 $s = k + 1$。在 `Omega.Ratio` 中，记 $\kappa(p, q)$ 为分子 $q^2$、分母 $p^2 + q^2$ 的精确非负分数（分母为零时取 `undefined`）。则

$$
\kappa(ps,\, qs) \;\equiv\; \kappa(p, q)
$$

在 `Omega.Ratio.Equivalent` 下成立，包括 $p = q = 0$ 时两端同时为 `undefined` 的退化情形。
:::

::: {.proof}
对 $p, q$ 同时乘以正自然数 $s = k + 1$，新分子成为 $(qs)^2 = q^2 s^2$，新分母成为 $(ps)^2 + (qs)^2 = (p^2 + q^2)s^2$。按分母 $p^2 + q^2$ 是否为零分类讨论：若 $p^2 + q^2 = 0$，则缩放后的分母 $(p^2 + q^2)s^2$ 亦为零，两端均为 `undefined`，按 `Omega.Ratio.Equivalent` 的定义等价；若 $p^2 + q^2 > 0$，因 $s^2 = (k+1)^2 > 0$，两端均为有限分数，交叉相乘得到 $(q^2 s^2)(p^2 + q^2) = q^2\bigl((p^2 + q^2)s^2\bigr)$，由自然数乘法交换结合律一步证毕。完整证明由 Lean 内核检查。
:::

仅停留在自然数只能描述第一象限的长度比，分不清圆周上半弧 $[1 : 1]$ 与下半弧 $[-1 : 1]$ 的定向差异。将坐标提升为有号整数 $p, q \in \mathbb{Z}$ 后，公共缩放因子 $k \in \mathbb{Z} \setminus \{0\}$ 可以取任意非零正负整数——特别地，取 $k = -1$ 正好证明了反号对 $(-p, -q)$ 与 $(p, q)$ 给出完全相同的保真度读数。这一步同样由零公理 `OmegaMath` 内核直接锁死：

::: {.theorem #thm-ch02-int-kappa-scale title="非零有号整数缩放保持射影保真度" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_scale"}
设 $p, q, k$ 为 `Omega.Int` 中的任意有号整数，且 $k \neq 0$。则有号射影保真度在 `Omega.IntRatio.Equivalent` 下满足

$$
\kappa(kp,\, kq) \;\equiv\; \kappa(p, q).
$$
:::

::: {.proof}
由于 $k \neq 0$，其绝对值平方 $K := \lvert k\rvert^2 \in \mathbb{N}$ 严格非零。有号整数平方恒满足 $(kq)^2 = q^2 \cdot K$，且 $\operatorname{normSq}(kp, kq) = \operatorname{normSq}(p, q) \cdot K$。因此分子与分母同乘严格正自然数因子 $K$：当 $\operatorname{normSq}(p, q) = 0$ 时两端同为 `undefined`，否则交叉相乘直接消去公因子 $K$，给出 `Omega.IntRatio.Equivalent` 等价。完整证明由 Lean 内核检查。
:::

## 2.2 互补守恒、有理凯莱单位圆与三枚因果锚点 {#sec-ch02-anchors-and-cayley}

在传统三角学里，毕达哥拉斯恒等式 $\cos^2\theta + \sin^2\theta = 1$ 要先经过圆周率 $\pi$、弧度制 $\theta$ 与无穷幂级数才能立起。在齐次射影线 $\mathbb{QP}^1$ 上，互补守恒退化成一行纯粹的整数分子相加——既不需要角度，也不需要根号，而且在零公理 `OmegaMath` 中全程无公理证明：

::: {.theorem #thm-ch02-kappa-add-spread title="保真度与展开度之和恒等于 1" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one"}
对任意满足 $\operatorname{Nonzero}(p, q)$（即 $p \neq 0 \lor q \neq 0$）的有号整数对 $(p, q)$，保真度与展开度之和在 `Omega.IntRatio.Equivalent` 下等价于整数 $1$：

$$
\kappa(p, q) + \operatorname{spread}(p, q) \;\equiv\; 1.
$$
:::

::: {.proof}
因为 $(p, q)$ 不同时为零，其平方范数 $d := \operatorname{normSq}(p, q) = p^2 + q^2$ 为严格正自然数。同分母分数相加给出分子 $q^2 + p^2 = d$ 与分母 $d$；在 $d \neq 0$ 条件下，分数 $d/d$ 与整数 $1$ 交叉相乘相等，故与 `IntRatio.ofInt 1` 等价。完整证明由 Lean 内核检查。
:::

将同一组非零齐次整数对送入有理凯莱映射 $C(p, q) = \bigl(\operatorname{cayleyX}(p, q),\, \operatorname{cayleyY}(p, q)\bigr)$，它立刻把整个一维射影空间 $\mathbb{QP}^1$ 严丝合缝地折弯成一颗**有理单位圆 $S^1(\mathbb{Q})$**。无需任何一个开方运算，也无需 $\sin$ 或 $\cos$，每个非零整数对的凯莱像都分毫不差地落在单位圆周上：

::: {.theorem #thm-ch02-cayley-unit title="齐次凯莱像恒落于有理单位圆" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit"}
对任意满足 $\operatorname{Nonzero}(p, q)$ 的有号整数对 $(p, q)$，有理凯莱坐标满足 `Omega.IntRatio.Equivalent` 下的单位圆方程：

$$
\operatorname{cayleyX}(p, q)^2 + \operatorname{cayleyY}(p, q)^2 \;\equiv\; 1.
$$
:::

::: {.proof}
展开分子的整数平方和，立得代数恒等式 $(q^2 - p^2)^2 + (2pq)^2 = q^4 - 2p^2 q^2 + p^4 + 4p^2 q^2 = (p^2 + q^2)^2$（在 `OmegaMath` 内部通过把 $(p, q)$ 与自身作齐次圆群乘法并调用下节范数乘性证得）。由于 $\operatorname{Nonzero}(p, q)$ 保证 $d = p^2 + q^2 > 0$，从而分母 $d^2 > 0$，分子与分母完全相同且非零，故平方和在 `Omega.IntRatio.Equivalent` 下等价于 $1$。完整证明由 Lean 内核检查。
:::

现在，请把聚光灯打在这颗有理单位圆上的**三枚因果锚点**——它们正是全书反复回响的纯有理节奏 $\{1,\, \frac{1}{2},\, 0\}$（按展开度 $s = 1 - \kappa$ 读则是 $\{0,\, \frac{1}{2},\, 1\}$）：

1. **过去停机锚点 $[0 : 1]$**：代入 $(p, q) = (0, 1)$，平方范数为 $1$，直接读出 $\kappa = 1$、$s = 0$、$C([0 : 1]) = (1, 0)$。状态与参照完全重合，零失准，对应零阶定格记录。
2. **现在自对偶锚点 $[1 : 1]$（及其镜像 $[-1 : 1]$）**：代入 $(p, q) = (1, 1)$，平方范数为 $1^2 + 1^2 = 2$，读出 $\kappa = \frac{1}{2}$、$s = \frac{1}{2}$、$C([1 : 1]) = (0, 1)$（镜像 $[-1 : 1]$ 落在南侧 $(0, -1)$）。请注意它所满足的方程：在互补守恒 $\kappa + s = 1$ 之下，要求保真份额与失准展开份额**严格自对偶**，方程就是一行纯有理线性等式

   $$
   \kappa \;=\; 1 - \kappa \quad \Longleftrightarrow \quad \kappa \;=\; \frac{1}{2}, \quad s \;=\; \frac{1}{2}.
   $$

   在没有圆周率 $\pi$ 与弧度角 $\theta$ 的原生语言里，$90^\circ$ 正交并非什么超越数 $\pi/2$，而就是这枚干净无比的自对偶不动点 $\kappa = s = \frac{1}{2}$！

3. **未来对径闭合极点 $[1 : 0]$（及一切 $[p : 0]$，$p \neq 0$）**：在开口实轴 $\mathbb{R}$ 上，$q = 0$ 触发 $p/0$ 的致命除零错误，被流放为“无穷大 $\infty$”。而在 $\mathbb{QP}^1$ 中，只要 $p \neq 0$，分母 $p^2 + 0^2 = p^2 > 0$ 依然稳稳大于零！下面的零公理定理以机器内核的绝对刚性宣告了 $\infty$ 的彻底终结：

::: {.theorem #thm-ch02-antipodal-closure title="对径极点的有限读数与凯莱闭环" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure"}
设 $p$ 为任意非零有号整数（$p \neq 0$）。在经典开口直线触发除零的齐次点 $(p, 0)$ 处，四项射影读数全部有限，并在 `Omega.IntRatio.Equivalent` 下同时满足：

$$
\begin{aligned}
\kappa(p, 0) &\equiv 0, & \operatorname{spread}(p, 0) &\equiv 1, \\
\operatorname{cayleyX}(p, 0) &\equiv -1, & \operatorname{cayleyY}(p, 0) &\equiv 0.
\end{aligned}
$$
:::

::: {.proof}
因为 $p \neq 0$，平方范数 $d := \operatorname{normSq}(p, 0) = p^2$ 为严格正自然数。代入定义立得 $\kappa(p, 0) = 0/d \equiv 0$、$\operatorname{spread}(p, 0) = p^2/d = d/d \equiv 1$、$\operatorname{cayleyX}(p, 0) = (-p^2)/d \equiv -1$ 以及 $\operatorname{cayleyY}(p, 0) = 0/d \equiv 0$，全程不涉及零分母。完整证明由 Lean 内核检查。
:::

从 $[0 : 1]$ 出发，经过 $[1 : 1]$ 滑过对径极点 $[1 : 0]$，再经由下侧 $[-1 : 1]$ 折返 $[0 : 1]$。齐次坐标让对径点也有有限读数。对任意有理单位点 $(X,Y)\ne(-1,0)$，反解取 $p/q=Y/(1+X)$，清去分母即得非零齐次整数对。而 $(-1,0)$ 正由 $[1:0]$ 补上，故有理单位圆上的每个点都能如此读出。

在实圆的子空间拓扑下，$S^1(\mathbb{Q})$ 却不紧致（手工推导）。取有理数 $t_n\to\sqrt{2}$，如 $t_n=\lfloor 10^n\sqrt{2}\rfloor/10^n$。对应的有理凯莱像趋向 $(-1/3,2\sqrt{2}/3)$，后者因第二坐标无理而落在有理圆之外。实圆是 Hausdorff 空间，紧子集必闭。下图的圆周线画出有理点所在的实圆，标注的锚点才是齐次读数的具体样例。

::: {.figure src="ch02-qp1-antipodal"}
**齐次射影线 $\mathbb{QP}^1$ 经凯莱映射闭合为有理单位圆 $S^1(\mathbb{Q})$。** 图中展示三枚核心因果锚点——过去 $[0 : 1] \mapsto (1, 0)$（$\kappa = 1, s = 0$）、现在自对偶赤道 $[1 : 1] \mapsto (0, 1)$ 与 $[-1 : 1] \mapsto (0, -1)$（$\kappa = s = \frac{1}{2}$），以及消除除零奇点的未来对径极点 $[1 : 0] \mapsto (-1, 0)$（$\kappa = 0, s = 1$）；依据见 [@thm-ch02-cayley-unit] 与 [@thm-ch02-antipodal-closure]。
:::

下表汇总了几枚最常用的齐次整数射影点及其精确有理读数（`NUM`）：

| 齐次射影点 $[P : Q]$ | 平方范数 $P^2 + Q^2$ | 保真度 $\kappa$ | 展开度 $s$ | 凯莱圆坐标 $C([P : Q])$ | 因果与几何角色 |
| :---: | :---: | :---: | :---: | :---: | :--- |
| $[0 : 1]$ | $1$ | $1$ | $0$ | $(1, 0)$ | 过去停机锚点（完全重合） |
| $[1 : 2]$ | $5$ | $4/5$ | $1/5$ | $(3/5, 4/5)$ | 最小本原毕达哥拉斯有理弧 $(3, 4, 5)$ |
| $[1 : 1]$ | $2$ | $1/2$ | $1/2$ | $(0, 1)$ | 现在自对偶锚点（$\kappa = 1 - \kappa$） |
| $[1 : 0]$ | $1$ | $0$ | $1$ | $(-1, 0)$ | 未来对径闭合极点（驯服 $\infty$） |
| $[-1 : 1]$ | $2$ | $1/2$ | $1/2$ | $(0, -1)$ | 现在负半环自对偶镜像 |

## 2.3 齐次圆群乘法、婆罗摩笈多—斐波那契范数乘性与有限法雷视界 {#sec-ch02-circle-multiplication}

齐次整数对不仅能静止地标记圆周上的点，它们自身就带有闭包的**纯整数圆群乘法**——无需把点换算成弧度角再做加法，直接用两次整数乘法就能复合任意两段圆弧！

在 `OmegaMath.Projective.Circle` 的约定中，把有号整数对 $(p, q)$ 视作高斯整数 $q + i p$（第二分量 $q$ 为实部，第一分量 $p$ 为虚部）。于是两对整数 $(p_1, q_1)$ 与 $(p_2, q_2)$ 的齐次圆群乘积定义为：

$$
\operatorname{projectiveMul}(p_1, q_1, p_2, q_2) \;:=\; \bigl(p_1 q_2 + q_1 p_2,\;\; q_1 q_2 - p_1 p_2\bigr).
$$

请看它的自乘特例：把 $(p, q)$ 与自己相乘，立得 $(2pq,\; q^2 - p^2)$——第二分量恰是 $\operatorname{cayleyX}$ 的分子，第一分量恰是 $\operatorname{cayleyY}$ 的分子！更关键的是，这项乘法永远不会把两个非零射影点意外乘成零对 $(0, 0)$，原因正是下面的零公理婆罗摩笈多—斐波那契范数乘性定理：

::: {.theorem #thm-ch02-circle-mul-normsq title="齐次圆群乘法的婆罗摩笈多—斐波那契范数乘性" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.projective_circle_mul_normSq"}
对任意有号整数 $p_1, q_1, p_2, q_2 \in \mathbb{Z}$，齐次圆群乘积 $\operatorname{projectiveMul}(p_1, q_1, p_2, q_2) = (p_1 q_2 + q_1 p_2,\; q_1 q_2 - p_1 p_2)$ 的平方范数与两因子平方范数之积在自然数中严格相等：

$$
\operatorname{normSq}(p_1, q_1)\cdot \operatorname{normSq}(p_2, q_2) \;=\; \operatorname{normSq}\bigl(\operatorname{projectiveMul}(p_1, q_1, p_2, q_2)\bigr),
$$

写成显式整数恒等式即为

$$
\begin{aligned}
(p_1^2 + q_1^2)(p_2^2 + q_2^2) &= (p_1 q_2 + q_1 p_2)^2 + (q_1 q_2 - p_1 p_2)^2 \\
&= (p_1 p_2 - q_1 q_2)^2 + (p_1 q_2 + q_1 p_2)^2.
\end{aligned}
$$
:::

::: {.proof}
把右边两项平方分别展开：第一项给出 $p_1^2 q_2^2 + q_1^2 p_2^2 + 2 p_1 q_1 p_2 q_2$，第二项给出 $q_1^2 q_2^2 + p_1^2 p_2^2 - 2 p_1 q_1 p_2 q_2$。交叉项 $\pm 2 p_1 q_1 p_2 q_2$ 精确抵消，余下四项恰好因式分解为 $(p_1^2 + q_1^2)(p_2^2 + q_2^2)$；自然数编码由 `Int.ofNat` 单射性直接承接。特别地，若两因子皆非零，则两平方范数均大于等于 $1$，其乘积必大于等于 $1$，因此乘积绝不落入 $(0, 0)$。完整证明由 Lean 内核检查。
:::

这项定理把经典分析中需要借用 $\arctan$ 与 $\pi$ 才能写出的角度叠加公式，彻底化简成了中学生也能心算的整数乘法。让我们亲手算三组例子。

::: {.example #ex-ch02-hand-calculations title="无 π 角度合成、对径往返与有限法雷视界手算（NUM）"}
1. **两步整数乘法重现欧拉正切恒等式**：取 $[1 : 2]$（$\operatorname{normSq} = 5$，凯莱像 $(3/5, 4/5)$）与 $[1 : 3]$（$\operatorname{normSq} = 10$，凯莱像 $(4/5, 3/5)$）。执行齐次圆群乘法：

   $$
   \operatorname{projectiveMul}(1, 2, 1, 3) \;=\; (1\cdot 3 + 2\cdot 1,\; 2\cdot 3 - 1\cdot 1) \;=\; (5, 5).
   $$

   核对范数乘性：$5 \times 10 = 50 = 5^2 + 5^2$。再由 [@thm-ch02-int-kappa-scale] 约去公因子 $k = 5$，$(5, 5)$ 精准归约回现在自对偶锚点 $[1 : 1]$（$\kappa = \frac{25}{50} = \frac{1}{2}$，$C([1:1]) = (0, 1)$）！经典微积分里写作 $\arctan\frac{1}{2} + \arctan\frac{1}{3} = \frac{\pi}{4}$ 的超越恒等式，在 $\mathbb{QP}^1$ 中不过是纯整数等式 $[1:2] \odot [1:3] = [5:5] = [1:1]$。

2. **现在倍增直达未来，未来倍增归返过去**：把现在锚点 $[1 : 1]$ 自乘一次：

   $$
   \operatorname{projectiveMul}(1, 1, 1, 1) \;=\; (1\cdot 1 + 1\cdot 1,\; 1\cdot 1 - 1\cdot 1) \;=\; (2, 0) \;\sim\; [1 : 0],
   $$

   平方范数 $2 \times 2 = 4 = 2^2 + 0^2$，两记 $\frac{1}{2}$ 半拍严丝合缝地落到未来对径极点 $[1 : 0]$（$\kappa = 0, s = 1$），全程没有半次除零！再把 $[1 : 0]$ 自乘一次，得到 $\operatorname{projectiveMul}(1, 0, 1, 0) = (0, -1) \sim [0 : 1]$，立刻折返过去锚点 $[0 : 1]$。

3. **有限法雷视界计数**：结合[第一章](ch01-axiom-omega-and-cic.md)的精度契约 $\varepsilon_{\mathrm{self}} = 1/M$，在 $M = 1$ 时 $\mathbb{QP}^1_{\le 1}$ 恰含 $4$ 枚基本锚点 $\{[0:1], [1:1], [1:0], [-1:1]\}$；在 $M = 2$ 时恰含 $8$ 枚互素点 $\{[0:1], [1:2], [1:1], [2:1], [1:0], [-2:1], [-1:1], [-1:2]\}$；一般地，记欧拉函数求和 $\Phi(M) = \sum_{j=1}^M \varphi(j)$，有限射影圆 $\mathbb{QP}^1_{\le M}$ 精确包含 $4\Phi(M)$ 个有理点，在 $M = 12$ 时恰为 $184$ 个点（`ARGUED`）。
:::

::: {.film src="the-line-that-closes"}
**一把在 $1/0$ 处断裂的斜率尺，改记齐次整数对 $[P : Q]$ 后闭合成一颗处处读数有限的有理圆（2 分 49 秒）。** 白色射线扳向竖直，琥珀色斜率读数依次为 $1/2$、$1$、$2$、$5$、$10$，到 $Q = 0$ 变成品红的 $1/0$；格点图中 $2 : 4$、$3 : 6$、$-1 : -2$ 亮成同一个点 $[1 : 2]$，$\kappa(2, 4) = 16/20 \equiv 4/5$（屏幕计算），缩放不变性的绿色标签对应 [@thm-ch02-nat-kappa-scale] 与 [@thm-ch02-int-kappa-scale]。青色与品红格条把 $[1 : 2]$ 分成 $4/5 + 1/5$、把 $[2 : 3]$ 分成 $9/13 + 4/13$，绿色 $\kappa + s \equiv 1$ 对应 [@thm-ch02-kappa-add-spread]；竖直直线上的点滑到凯莱圆上，$[1 : 2] \mapsto (3/5, 4/5)$、$[2 : 3] \mapsto (5/13, 12/13)$，绿色 $X^2 + Y^2 \equiv 1$ 对应 [@thm-ch02-cayley-unit]。三枚锚点 $[0 : 1]$、$[1 : 1]$、$[1 : 0]$ 的读数取自上表，对径极点的绿色标签对应 [@thm-ch02-antipodal-closure]；青色与品红两段圆弧相接给出 $[1 : 2] \odot [1 : 3] = [1 : 1]$ 与 $5 \times 10 = 50 = 5^2 + 5^2$，范数乘性的绿色标签对应 [@thm-ch02-circle-mul-normsq]，琥珀色自乘往返 $[1 : 1] \to [1 : 0] \to [0 : 1]$ 为屏幕计算（见 [@ex-ch02-hand-calculations]）。最后 $M = 1, 2, 12$ 的视界点数 $4$、$8$、$184$ 由屏幕枚举得到，一般计数 $4\Phi(M)$ 与交换性限制（[@rem-ch02-abelian-limit]）以紫色标为论证。
:::

不妨在下面的交互实验卡中亲手验证整条射影闭环的零奇点算术：拖动齐次整数对 $[P : Q]$ 的两个整数滑块，让点依次滑过过去锚点 $[0 : 1]$、本原毕达哥拉斯弧 $[1 : 2]$、现在自对偶赤道 $[1 : 1]$ 直至曾经触发除零崩塌的未来对径极点 $[1 : 0]$，实时观察保真度与展开度的互补守恒 $\kappa + s = 1$ 以及有理凯莱坐标满足 $X^2 + Y^2 = 1/1$ 如何在每一组非零整数上严丝合缝地恒等成立。

::: {.viz src="ternion-cayley-lab" preset="qp1-antipodal-circle" height="520"}
**齐次射影闭环 $\mathbb{QP}^1$ 与有理凯莱单位圆实时实验。** 拖动 $[P : Q]$ 整数滑块穿越 $[0 : 1]$、$[1 : 1]$ 与对径极点 $[1 : 0]$，页面同步以精确分数实时验算 $\kappa(P, Q) + s(P, Q) = 1$ 与有理凯莱坐标 $X^2 + Y^2 = 1/1$（其中 $X = \operatorname{cayleyX}(P, Q)$、$Y = \operatorname{cayleyY}(P, Q)$），全程无除零、无根号；对应证明见 [@thm-ch02-kappa-add-spread]、[@thm-ch02-cayley-unit] 与 [@thm-ch02-antipodal-closure]。
:::

一维齐次射影闭环已经如此优雅——无实无穷、无超越数、无除零奇点，并且每一条基本恒等式都在零公理裸内核中通过了检查。那么，我们能不能就此止步，把整个宇宙的代数都建在一维圆周 $\mathbb{QP}^1$ 上呢？

答案是**不能**。请回头检视 `projectiveMul` 的两个分量公式：

::: {.remark #rem-ch02-abelian-limit title="为什么一维射影闭环仍是交换世界（ARGUED）"}
把 $(p_1, q_1)$ 与 $(p_2, q_2)$ 互换位置：第一分量 $p_2 q_1 + q_2 p_1 = p_1 q_2 + q_1 p_2$ 完全不变，第二分量 $q_2 q_1 - p_2 p_1 = q_1 q_2 - p_1 p_2$ 同样完全不变！因此，若在 $\mathbb{QP}^1$ 上由圆群乘法诱导三元比较迁移 $[a, b, c] := a \odot \bar{b} \odot c$（其中 $\bar{b} = (-p_b, q_b)$），虽然它满足[第一章](ch01-axiom-omega-and-cic.md)母公理 `AXIOM-Ω` 的法则 I 与法则 II，却恒有 $[a, b, c] = [c, b, a]$——**它永远无法满足法则 III 的非对易次序敏感性**。一维圆周只有一条旋转平面，无论怎么组合，前后顺序都可以任意交换。
:::

要让顺序真正产生不可抹平的几何差异——要让 `[先转 A 再转 B]` 与 `[先转 B 再转 A]` 落在彼此分离的态上——我们必须离开一维闭环，向更高维迈出一步。令人意想不到的是，二维平面同样扭不起来；几何刚性将把我们直接锁死在三维流形与规范整三元数之上。这正是[第三章](ch03-canonical-ternion-manifold.md)的主题。
