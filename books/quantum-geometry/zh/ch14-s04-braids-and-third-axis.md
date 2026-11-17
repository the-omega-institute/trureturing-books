# 14.4 二维编织与第三正交方向 {#sec-braids-and-third-axis}

除了用泡利稳定子校验面主动侦测并纠正错误之外，大自然还提供了一种更加匪夷所思的被动防御机制：**用二维平面粒子的世界线编织（braiding）打结**。

在低维拓扑与任意子物理的直观图景（详见下文 [@rem-error-correction-anyons-literature]）中，人们常追问：为什么把粒子世界线限制在二维平面 $(e_1, e_2)$ 时，$(2+1)$ 维时空中的交换编织会呈现出与三维空间截然不同的结构？

从几何图解（如图 14 面板 III）上看，线索指向**第三根正交空间方向**！当不可互穿的绳股排成一列时，第 1 股绳子跨过第 2 股绳子（正向交叉 $\mathrm{crossing}$）与从底下钻过去（反向交叉 $\mathrm{crossingInv}$）给出互逆的基本交叉步。而在三股绳子 $(x, (y, z))$ 的编织中，先交换前两股、再交换后两股、再交换前两股（$\sigma_1 \sigma_2 \sigma_1$），与先交换后两股、再交换前两股、再交换后两股（$\sigma_2 \sigma_1 \sigma_2$），在图解上恰好对应把中间那根绳子滑过另外两根绳子的交点——著名的**三股编织恒等式（Yang–Baxter 方程）**。

::: {.viz src="braiding" preset="over" height="500"}
**一次交换：谁从前面过，记在第三个方向上。** 平面里的两颗粒子随时间往上走出世界线，绕中点转半圈换了位置：左边那股从前面过（离你近），右边那股从后面过。绳子上的数字是颜色：前面那股带着 $0$ 走到右边，后面那股被它改色，$1$ 变成 $0 \star 1 = 2$，正是 $\mathrm{crossing}(x, y) = (x \star y,\, x)$。
:::

在源码模块 `D5/S0/Certificates/Quandles/BraidColoringTransport.lean` 中，这一编织不变量通过架（`Rack Q`）的代数着色传输得到了纯组合形式化。设类型 $Q$ 带有 `Rack Q` 实例，其上配备二元运算 $\star : Q \to Q \to Q$（源码记作 `act`）及逆运算 $\star^{-1} : Q \to Q \to Q$（源码记作 `invAct`），使得对每个固定的第一宗量 $x \in Q$，左平移作用映射 $L_x : y \mapsto x \star y$ 是双射（其逆映射为 $L_x^{-1} : y \mapsto x \star^{-1} y$，满足 `Function.LeftInverse (invAct x) (act x)` 与 `Function.RightInverse (invAct x) (act x)`，即 $x \star^{-1} (x \star y) = y$ 且 $x \star (x \star^{-1} y) = y$），并满足左自分配公理（left self-distributivity）：

$$
(x \star y) \star (x \star z) = x \star (y \star z) \qquad (\forall x, y, z \in Q).
$$

定义双股正向交叉与反向交叉映射为

$$
\mathrm{crossing}(x, y) = (x \star y,\, x), \qquad \mathrm{crossingInv}(u, v) = (v,\, v \star^{-1} u),
$$

易见 $\mathrm{crossingInv}\bigl(\mathrm{crossing}(x, y)\bigr) = \mathrm{crossingInv}(x \star y, x) = \bigl(x,\, x \star^{-1}(x \star y)\bigr) = (x, y)$。将它们提升到三股状态空间 $Q \times (Q \times Q)$ 上的两个相邻生成元：

$$
\mathrm{crossing}_1\bigl(x, (y, z)\bigr) = \bigl(x \star y,\, (x, z)\bigr), \qquad
\mathrm{crossing}_2\bigl(x, (y, z)\bigr) = \bigl(x,\, (y \star z,\, y)\bigr).
$$

::: {.viz src="braiding" preset="inverse" height="500"}
**反着再交换一次，原样回来。** 左边先交换一次，再反着交换一次（这回右边那股从前面过），两股回到原位，颜色 $(0, 1)$ 原样回到顶端：$\mathrm{crossingInv}(\mathrm{crossing}(x, y)) = (x, y)$。右边是不交换的直线，顶端也是 $(0, 1)$。
:::

下面的推论证明，这两个相邻交叉算子在任意架 $Q$ 上严格满足三股 Yang–Baxter 编织恒等式。

::: {.corollary #cor-braid-yang-baxter title="架着色传输下的三股编织 Yang–Baxter 恒等式" lean="D5/S0/Certificates/Quandles/BraidColoringTransport.crossing_yang_baxter"}
设 $Q$ 为带有 `[Rack Q]` 实例的任意类型。对任意三个元素 $x, y, z \in Q$，三股编织的两个相邻交叉映射满足

$$
\mathrm{crossing}_1\bigl(\mathrm{crossing}_2\bigl(\mathrm{crossing}_1(x, (y, z))\bigr)\bigr) = \mathrm{crossing}_2\bigl(\mathrm{crossing}_1\bigl(\mathrm{crossing}_2(x, (y, z))\bigr)\bigr).
$$
:::

::: proof
按 $\mathrm{crossing}_1$ 与 $\mathrm{crossing}_2$ 的定义，逐步展开等式左端的三次交叉作用：

$$
\begin{aligned}
(x, (y, z))
&\xrightarrow{\;\mathrm{crossing}_1\;} \bigl(x \star y,\, (x, z)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_2\;} \bigl(x \star y,\, (x \star z,\, x)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_1\;} \Bigl((x \star y) \star (x \star z),\; (x \star y,\, x)\Bigr).
\end{aligned}
$$

再逐步展开等式右端的三次交叉作用：

$$
\begin{aligned}
(x, (y, z))
&\xrightarrow{\;\mathrm{crossing}_2\;} \bigl(x,\, (y \star z,\, y)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_1\;} \bigl(x \star (y \star z),\, (x, y)\bigr) \\
&\xrightarrow{\;\mathrm{crossing}_2\;} \Bigl(x \star (y \star z),\; (x \star y,\, x)\Bigr).
\end{aligned}
$$

比较左端与右端的最终三元组：后两个分量均为 $(x \star y, x)$，完全一致；第一个分量由 `Rack Q` 的自分配律 $(x \star y) \star (x \star z) = x \star (y \star z)$ 严格相等。完整证明由 Lean 内核检查。
:::

::: {.viz src="braiding" preset="yb" height="500"}
**三股的两种顺序落在同一处。** 三股，颜色 $(0, 1, 2)$。左边按 $\sigma_1, \sigma_2, \sigma_1$ 交换，右边按 $\sigma_2, \sigma_1, \sigma_2$：两边世界线的走法不一样，顶端都是 $(0, 2, 0)$。点底部的数字换一组颜色，两边的顶端仍然相同，这就是 [@cor-braid-yang-baxter]。
:::

::: {.remark #rem-braid-knot-topology-literature title="架着色实现与配置空间辫群、三维绳结拓扑的边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在将 [@cor-braid-yang-baxter] 与物理及低维拓扑文献（另参下文 [@rem-error-correction-anyons-literature]）对接时，必须严格守住三条理论边界（其中配置空间基本群 $B_n$ 与 $S_n$ 的维数二分及三维三叶结的非平凡结拓扑均属外部文献结论，未在本书形式化）：

1. **代数着色实现 vs 完整拓扑基本群分类**：[@cor-braid-yang-baxter] 是在抽象代数结构 `Rack Q` 上对三股编织关系 $\sigma_1 \sigma_2 \sigma_1 = \sigma_2 \sigma_1 \sigma_2$ 的代数着色实现（源码完全不包含拓扑流形、时空维数或量子统计的假设）。它证明了架着色在三股 Reidemeister III / Yang–Baxter 移动下的传输不变性，但并不证明二维平面上一切编织皆非平凡，也不等同于配置空间完整基本群的分类定理。
2. **严格区分“点粒子的交换轨迹（exchange paths）”与“三维空间中的闭合绳结（knots）”**：如图 14 面板 III 所示，当点粒子拥有第三个空间正交方向 $e_3$ 时，原本在二维平面内绕着另一颗粒子转一圈的双交换轨迹（回路）可以沿着第三空间维 $e_3$ 向上抬起并越过被绕粒子，从而使点粒子交换群从无穷阶辫群 $B_n$ 退化为有限对称群 $S_n$（$\sigma_i^2 = 1$）。**但这绝不意味着三维空间里的闭合一维绳结（如三叶结 trefoil knot）也能自动解开！** 闭合绳结在 $\mathbb{R}^3$ 中禁止自身穿越，依然具有非平凡的结拓扑（事实上，架与幂等架（quandle）着色正是区分三维非平凡绳结的经典代数工具，见下文 [@thm-quandle-coloring-markov-invariant] 与 [@ex-fox-three-colorings-markov]）。
3. **任意子统计与物理容错边界归入文献**：非阿贝尔任意子的物理实现、配置空间同伦群以及有限温度下的拓扑纠错界限属于凝聚态与量子信息文献结果，详见下文 [@rem-error-correction-anyons-literature]。
:::

::: {.viz src="braiding" preset="twice" height="500"}
**同向交换两次，不等于不交换。** 左边同一个方向交换两次，两条世界线互相绕了整整一圈，每颗粒子都回到原位，颜色却从 $(0, 1)$ 变成 $(1, 2)$；右边是不交换的直线，顶端仍是 $(0, 1)$。粒子被限制在平面里时这一圈解不开；借第三个空间方向把它抬过去解开，是 [@rem-braid-knot-topology-literature] 第 2 条的文献结果。
:::

**费米子的 $-1$ 从哪里来？** 上面说，粒子不被困在平面里时，一次交换只剩两种可能：玻色子的 $+1$ 与费米子的 $-1$（[@rem-braid-knot-topology-literature] 与下文 [@rem-error-correction-anyons-literature] 里的文献结果）。可量子计算机里只有比特，而作用在不同比特上的算子彼此**对易**，交换次序什么也不改变。用一串比特模拟费米子，那个 $-1$ 只能另找来源。办法是给每个“湮灭一个粒子”的算子拖一条尾巴：它左边每一位都放一个 $Z$。

::: {.theorem #thm-jordan-wigner-car title="Jordan–Wigner 构造：带 Z 串的比特算子满足费米子的正则反对易关系" lean="D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_anticomm_of_lt D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_mixed_anticomm_of_lt D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_CAR"}
设有 $N$ 个比特，格点编号 $0, 1, \dots, N - 1$，每个比特的基为 $\lvert 0\rangle$（空）与 $\lvert 1\rangle$（占据），$Z = \lvert 0\rangle\langle 0\rvert - \lvert 1\rangle\langle 1\rvert$，$\sigma^- = \lvert 0\rangle\langle 1\rvert$。对每个格点 $j$，令

$$
c_j = \underbrace{Z \otimes \cdots \otimes Z}_{\text{格点 } 0, \dots, j-1} \otimes\, \sigma^- \otimes \underbrace{I \otimes \cdots \otimes I}_{\text{格点 } j+1, \dots, N-1}.
$$

则对一切格点 $i < j$，

$$
c_i c_j + c_j c_i = 0, \qquad c_i c_j^\dagger + c_j^\dagger c_i = 0,
$$

并且对每个格点 $i$，$c_i c_i^\dagger + c_i^\dagger c_i = I$。
:::

::: proof
三条都在张量积的每一位上逐位相乘。（1）$i < j$ 时，$c_i c_j$ 与 $c_j c_i$ 只在第 $i$ 位不同：一个是 $\sigma^- Z$，一个是 $Z \sigma^-$；其余各位两边相同。而 $\sigma^- Z = -\sigma^-$、$Z\sigma^- = \sigma^-$（$Z$ 在 $\lvert 1\rangle$ 上取 $-1$，在 $\lvert 0\rangle$ 上取 $+1$），所以两项恰好反号相消。这就是 Lean 证明里“相隔的两个格点之间只贡献一次符号反转”。（2）把 $c_j$ 换成 $c_j^\dagger$，第 $i$ 位的因子还是 $\sigma^-$ 与 $Z$ 的两种次序，同样相消。（3）$i = j$ 时左边的 $Z$ 串平方成 $I$，剩下第 $i$ 位的 $\sigma^-\sigma^+ + \sigma^+\sigma^- = \lvert 0\rangle\langle 0\rvert + \lvert 1\rangle\langle 1\rvert = I$：占据与空两类基态各被一项恰好覆盖一次。完整证明由 Lean 内核检查。
:::

::: {.example #ex-jordan-wigner-two-sites title="两个格点：没有 Z 串就没有 −1"}
取 $N = 2$：$c_0 = \sigma^- \otimes I$，$c_1 = Z \otimes \sigma^-$。以下都是手工推导，并已用 $N = 2, 3$ 的显式矩阵逐项核对。

- **$-1$ 来自 $Z$ 串。** $c_0 c_1 + c_1 c_0 = (\sigma^- Z + Z\sigma^-) \otimes \sigma^- = (-\sigma^- + \sigma^-) \otimes \sigma^- = 0$。若把 $c_1$ 换成没有尾巴的 $I \otimes \sigma^-$，两个算子作用在不同比特上，彼此对易，反对易子变成 $2\,\sigma^- \otimes \sigma^- \ne 0$。
- **交换创建次序翻一个号。** $c_1^\dagger = Z \otimes \sigma^+$，其中 $\sigma^+ = \lvert 1\rangle\langle 0\rvert$。从空态出发：$c_0^\dagger c_1^\dagger \lvert 00\rangle = c_0^\dagger \lvert 01\rangle = \lvert 11\rangle$；反过来 $c_1^\dagger c_0^\dagger \lvert 00\rangle = c_1^\dagger \lvert 10\rangle = (Z\lvert 1\rangle) \otimes \lvert 1\rangle = -\lvert 11\rangle$。同一个双粒子态，按两种次序造出来差一个负号。
- **泡利不相容。** $(c_j^\dagger)^2$ 在第 $j$ 位是 $(\sigma^+)^2 = 0$：同一个格点不能放两个粒子。
- **跳跃项的局域性。** 相邻跳跃 $c_j^\dagger c_{j+1}$ 里，格点 $0, \dots, j-1$ 上的 $Z$ 串两两平方成 $I$，第 $j$ 位剩下 $\sigma^+ Z = \sigma^+$，所以 $c_j^\dagger c_{j+1} = \sigma^+_j \sigma^-_{j+1}$，只碰两个相邻比特。隔一位跳跃则多出一个 $Z$：$c_0^\dagger c_2 = \sigma^+ \otimes Z \otimes \sigma^-$，中间那个格点被“问了一次占据数”。
:::

::: {.figure src="ch14-jordan-wigner-string"}
**$c_1c_3$ 与 $c_3c_1$ 只在第 $1$ 格差一个负号。** 取 $N = 4$。上两行是 $c_1$ 与 $c_3$ 逐格的因子，$c_3$ 在格点 $0, 1, 2$ 上拖着 $Z$ 串；下两行是两种次序逐格相乘。格点 $0$ 上 $ZZ = I$，格点 $2$、$3$ 两行相同；只有品红的第 $1$ 列一边是 $\sigma^- Z = -\sigma^-$，一边是 $Z\sigma^- = \sigma^-$，于是 $c_1c_3 = -c_3c_1$（[@thm-jordan-wigner-car]）。
:::

一维链上，最近邻跳跃保持局域，代价只是一个看不见的奇偶尾巴。

::: {.remark #rem-jordan-wigner-literature title="Jordan–Wigner 与高维编码（文献结果，未在本书形式化）"}
以下是**文献结果，未在本书形式化**：

- 这一构造出自 P. Jordan 与 E. Wigner（*Z. Phys.* **47**, 631–651, 1928）；
- 自旋与统计之间的一般联系是自旋—统计定理；
- 在二维格点上，通常的一维排序会使一些跳跃项带上长 $Z$ 串而变为非局域；可采用 Bravyi–Kitaev（2002）或 Verstraete–Cirac（2005）等其他编码来改变这种代价。
:::

> 费米子的负号不住在粒子里，住在它左边那一串奇偶里。
