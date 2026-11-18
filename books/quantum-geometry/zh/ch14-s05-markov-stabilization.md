# 14.5 把编织首尾相接：Markov 稳定化与着色计数 {#sec-markov-stabilization-coloring-count}

[@rem-braid-knot-topology-literature] 的第 2 条说，三维空间里的三叶结解不开，而着色正是分辨它的经典工具。这件工具怎么用？[@cor-braid-yang-baxter] 管的是一段编织：上面一排线头，下面一排线头，颜色从一排传到另一排。可是结没有线头。把编织弯过来，让第 $k$ 个下端接回第 $k$ 个上端，绳子才成了闭合的圈，这叫编织的**闭合**。接上之后，“上端的颜色”与“下端的颜色”是同一段绳子的颜色，于是闭合编织的着色只剩一个条件：颜色沿编织传一遍，必须原样回来。**闭合编织的着色，就是着色传输的不动点。**

::: {.viz src="braiding" preset="close" height="500"}
**首尾接上，颜色得原样回来。** 一次交换 $\sigma_1$，再把每个顶端顺着右边的弧接回同一位置的底端。颜色 $(0, 1)$ 到顶端成了 $(2, 0)$，两条弧都对不上（品红）。九个着色里只有 $(0, 0)$、$(1, 1)$、$(2, 2)$ 回得来。
:::

模块 `D5/S3/Topology/QuandleMarkovColoring` 把这句话写成了定义。它不谈画在纸上的绳子：编织是由生成元与关系给出的群里的元素，着色传输是这个群在颜色序列上的作用。

::: {.definition #def-closed-braid-colorings title="按生成元与关系定义的 Artin 辫群、架着色作用、闭合着色与着色计数" lean="D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.artinRelators D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.Artin D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.PositiveBraid D5/S3/Topology/QuandleMarkovColoring.Colors D5/S3/Topology/QuandleMarkovColoring.braidAction D5/S3/Topology/QuandleMarkovColoring.ClosedColorings D5/S3/Topology/QuandleMarkovColoring.coloringCount"}
设 $n \in \mathbb{N}$，$Q$ 为带 `[Rack Q]` 的类型，$\star$ 为它的架运算。

1. **Artin 辫群** [`Artin`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.Artin) $n$：由生成元 $\sigma_1, \dots, \sigma_{n-1}$ 与关系元集合 [`artinRelators`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.artinRelators) $n$ 给出的群（`PresentedGroup`，即自由群对关系元生成的正规子群的商），关系为

   $$
   \sigma_j\sigma_k = \sigma_k\sigma_j \quad (j + 1 < k \ \text{或}\ k + 1 < j), \qquad
   \sigma_k\sigma_{k+1}\sigma_k = \sigma_{k+1}\sigma_k\sigma_{k+1}.
   $$

   Lean 中生成元以 $i : \mathrm{Fin}\,(n - 1)$ 编号（$i = 0, \dots, n - 2$），本书记作 $\sigma_{i+1}$；自然数减法截断，所以 $n \le 1$ 时没有生成元，群是平凡群。
2. **着色** [`Colors`](lean:D5/S3/Topology/QuandleMarkovColoring.Colors) $Q\ n = (\mathrm{Fin}\,n \to Q)$，写作 $c = (c_1, \dots, c_n)$（$c_k$ 是 Lean 中下标为 $k - 1$ 的分量）。
3. **着色作用** [`braidAction`](lean:D5/S3/Topology/QuandleMarkovColoring.braidAction) $Q\ n$ 是从 $\mathrm{Artin}\,n$ 到 $\mathrm{Colors}\ Q\ n$ 的置换群（`Equiv.Perm`）的群同态，由生成元上的取值确定：$\sigma_k$ 把 $c$ 的第 $k$、$k+1$ 两个分量 $(c_k,\ c_{k+1})$ 换成 $(c_k \star c_{k+1},\ c_k)$，其余分量不动。记 $b \cdot c = \operatorname{braidAction}\ Q\ n\ b\ c$；置换群的乘法是复合，$(b\,b') \cdot c = b \cdot (b' \cdot c)$。
4. **闭合着色** [`ClosedColorings`](lean:D5/S3/Topology/QuandleMarkovColoring.ClosedColorings) $Q\ b = \{\,c : \mathrm{Colors}\ Q\ n \mid b \cdot c = c\,\}$，其中 $b \in \mathrm{Artin}\,n$。
5. **正股数编织** [`PositiveBraid`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.PositiveBraid) 是二元组 $(n, b)$，其中 $n > 0$，$b \in \mathrm{Artin}\,n$（名称说的是股数为正，与交叉的正负无关）。若再设 `[Finite Q]`，**着色计数** [`coloringCount`](lean:D5/S3/Topology/QuandleMarkovColoring.coloringCount) 定义为 $\operatorname{coloringCount}\ Q\ (n, b) = \operatorname{Nat.card}\bigl(\mathrm{ClosedColorings}\ Q\ b\bigr)$。
:::

第 3 条里“由生成元上的取值确定”并非白给：生成元的像必须满足 Artin 关系，作用才能从自由群落到商群上。相邻关系 $\sigma_k\sigma_{k+1}\sigma_k = \sigma_{k+1}\sigma_k\sigma_{k+1}$ 的验证用的正是 [@cor-braid-yang-baxter]（在 Lean 中，这一步是私有引理 `generator_adjacent`）；不相邻的两个交叉改动的是不同的分量，自然可交换（`generator_distant`）。

数一数不动点，看起来是在数绳圈本身的某种性质。但编织带着绳圈并不需要的多余信息：从哪里剪开，用了几股。这种多余恰好由三种改写步骤穷尽：这是 Markov 定理，属文献结果，见 [@rem-alexander-markov-literature]。Lean 文件把这三步定义成编织之间的一个纯代数关系。

::: {.definition #def-algebraic-markov-moves title="添股同态、末位生成元与代数 Markov 等价" lean="D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.strandInclusion D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.lastGenerator D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.MarkovStep D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.MarkovEquivalent"}
沿用 [@def-closed-braid-colorings] 的记号。

1. **添股同态** [`strandInclusion`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.strandInclusion) $n$，记作 $\iota_n : \mathrm{Artin}\,n \to \mathrm{Artin}\,(n + 1)$：把每个生成元 $\sigma_k$ 送到同名生成元 $\sigma_k$ 的群同态（Lean 没有断言它是单射）。
2. **末位生成元** [`lastGenerator`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.lastGenerator) $n\ hn$（$hn : 0 < n$）是 $\mathrm{Artin}\,(n + 1)$ 中的 $\sigma_n$，即第 $n$ 股与新添的第 $n + 1$ 股之间的交叉。
3. **Markov 步** [`MarkovStep`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.MarkovStep) 是正股数编织之间的归纳关系，恰有三条构造规则：对 $n > 0$ 与 $b, g \in \mathrm{Artin}\,n$，

   $$
   \begin{aligned}
   \text{共轭：}\quad & (n,\ b) \longrightarrow (n,\ g\,b\,g^{-1}), \\
   \text{正稳定化：}\quad & (n,\ b) \longrightarrow \bigl(n + 1,\ \iota_n(b)\,\sigma_n\bigr), \\
   \text{负稳定化：}\quad & (n,\ b) \longrightarrow \bigl(n + 1,\ \iota_n(b)\,\sigma_n^{-1}\bigr).
   \end{aligned}
   $$

4. **Markov 等价** [`MarkovEquivalent`](lean:D5/S3/Quantum/Algebra/Knot/WeightedPathArtinRepresentation.MarkovEquivalent) 是 `Relation.EqvGen MarkovStep`：包含 Markov 步的最小等价关系。
:::

画出来：共轭是把闭合的绳圈换一处剪开；稳定化是在最右边添一股新绳，让它与原来的最后一股只交叉一次，闭合后多出的是一个拧一下就消失的小圈（这两句是几何图像，严格陈述属于 [@rem-alexander-markov-literature] 中的 Markov 定理）。代数问题是：不动点的个数经得起这三步吗？

共轭不难，把颜色整体搬运一下即可。难的是稳定化，它连股数都改了。设新股的颜色是 $z$。按 [@def-closed-braid-colorings] 的乘法约定，$\iota_n(b)\,\sigma_n$ 先让 $\sigma_n$ 作用，把最后两股的 $(c_n,\ z)$ 变成 $(c_n \star z,\ c_n)$；随后 $\iota_n(b)$ 只动前 $n$ 股。新股不再碰到任何交叉，要原样回来就必须 $z = c_n$。于是第 $n$ 股拿到的是 $c_n \star c_n$。它等于 $c_n$ 吗？架的公理里没有这一条。多带公理 $x \star x = x$ 的架叫 quandle（Mathlib 的 `Quandle Q`，下文称**幂等架**）。有了这一条，那个小圈对颜色毫无影响：新股只是把 $c_n$ 抄了一遍，前 $n$ 股的条件原封不动。这段手算正是 Lean 证明的核心一步，模块把它做成了显式的一一对应。

::: {.viz src="braiding" preset="stabilize" height="500"}
**添一股：新股只把末位颜色抄一遍。** 左边是两股的 $\sigma_1^3$，接回来后颜色 $(0, 1)$ 对得上（青色）。右边在最右边添一股，先与原来最后一股交叉一次，即 $\iota_2(\sigma_1^3)\,\sigma_2$：新股的颜色只是把末位的 $1$ 抄一遍，过交叉时 $1 \star 1 = 1$ 不变。回得来的着色左边 $9$ 个，右边也是 $9$ 个。
:::

::: {.definition #def-markov-coloring-equivs title="稳定化与共轭下闭合着色空间的三个等价" lean="D5/S3/Topology/QuandleMarkovColoring.positiveStabilizationEquiv D5/S3/Topology/QuandleMarkovColoring.negativeStabilizationEquiv D5/S3/Topology/QuandleMarkovColoring.conjugationEquiv"}
设 $Q$ 为带 `[Quandle Q]` 的类型（不要求有限），$n \in \mathbb{N}$，$b \in \mathrm{Artin}\,n$。模块定义了三个等价（Lean 的 `Equiv`：一对映射，连同它们互逆的证明）：

1. [`positiveStabilizationEquiv`](lean:D5/S3/Topology/QuandleMarkovColoring.positiveStabilizationEquiv) $n\ hn\ b$（$hn : 0 < n$）：$\mathrm{ClosedColorings}\ Q\ b \simeq \mathrm{ClosedColorings}\ Q\ \bigl(\iota_n(b)\,\sigma_n\bigr)$。正向映射把末位颜色再抄一遍，$(c_1, \dots, c_n) \mapsto (c_1, \dots, c_n, c_n)$；反向映射删去最后一个分量。
2. [`negativeStabilizationEquiv`](lean:D5/S3/Topology/QuandleMarkovColoring.negativeStabilizationEquiv) $n\ hn\ b$（$hn : 0 < n$）：$\mathrm{ClosedColorings}\ Q\ b \simeq \mathrm{ClosedColorings}\ Q\ \bigl(\iota_n(b)\,\sigma_n^{-1}\bigr)$，正向与反向映射同第 1 条。
3. [`conjugationEquiv`](lean:D5/S3/Topology/QuandleMarkovColoring.conjugationEquiv) $n\ b\ g$（$g \in \mathrm{Artin}\,n$）：$\mathrm{ClosedColorings}\ Q\ b \simeq \mathrm{ClosedColorings}\ Q\ \bigl(g\,b\,g^{-1}\bigr)$。正向映射为 $d \mapsto g \cdot d$，反向映射为 $d \mapsto g^{-1} \cdot d$。
:::

::: {.theorem #thm-quandle-coloring-markov-invariant title="有限幂等架的闭合着色数在代数 Markov 等价下不变" lean="D5/S3/Topology/QuandleMarkovColoring.quandle_coloring_markov_invariant"}
设 $Q$ 为带 `[Quandle Q]` 与 `[Finite Q]` 的类型，$\beta, \beta'$ 为两个正股数编织（`PositiveBraid`）。若 $\beta$ 与 $\beta'$ Markov 等价（`MarkovEquivalent β β'`），则

$$
\operatorname{coloringCount}\ Q\ \beta = \operatorname{coloringCount}\ Q\ \beta'.
$$
:::

::: proof
`MarkovEquivalent` 是 `Relation.EqvGen`，证明对它的生成方式归纳。自反、对称、传递三种情形分别由等式的自反、对称、传递给出。剩下单独一步 `MarkovStep`，按三条构造规则分情形，每一种都是把 `Nat.card_congr` 用在 [@def-markov-coloring-equivs] 中对应的等价上。

两个稳定化等价的核心是两条私有引理（`positive_fixed_iff` 与 `negative_fixed_iff`）：对 $c = (c_1, \dots, c_n)$ 与 $z \in Q$，

$$
\bigl(\iota_n(b)\,\sigma_n^{\pm 1}\bigr) \cdot (c_1, \dots, c_n, z) = (c_1, \dots, c_n, z)
\iff
b \cdot c = c \ \land\ z = c_n.
$$

正号情形：$\sigma_n$ 把 $(c_1, \dots, c_n, z)$ 送到 $(c_1, \dots, c_{n-1},\ c_n \star z,\ c_n)$；$\iota_n(b)$ 按 $b$ 作用在前 $n$ 个分量上而不动最后一个（在生成元上验证，再由 `PresentedGroup.ext` 推到整个群）。比较最后一个分量得 $z = c_n$；代回去，$c_n \star c_n = c_n$（`Quandle.fix`）把前 $n$ 个分量的条件化为 $b \cdot c = c$。负号情形：$\sigma_n^{-1}$ 把它送到 $(c_1, \dots, c_{n-1},\ z,\ z \star^{-1} c_n)$；最后一个分量给出 $z \star^{-1} c_n = z = z \star^{-1} z$（`Quandle.fix_inv`），消去 $z \star^{-1}$（`Rack.left_cancel_inv`）得 $c_n = z$，其余相同。于是“抄写末位”与“删去末位”互逆。共轭情形只用到着色作用是群同态：若 $b \cdot d = d$，则 $(g\,b\,g^{-1}) \cdot (g \cdot d) = g \cdot (b \cdot d) = g \cdot d$。完整证明由 Lean 内核检查。
:::

引用 [@thm-quandle-coloring-markov-invariant] 时守住三条边界：

1. **它是代数定理，不是几何定理。** 陈述里只有按生成元与关系定义的群 $\mathrm{Artin}\,n$ 与归纳关系 `MarkovStep`；“两个编织闭合成同一个链环”这句几何的话没有出现在 Lean 中。把计数读成结与链环的不变量，要借助 [@rem-alexander-markov-literature] 中的三条文献定理。
2. **不变量只会说“不同”。** 计数不同，两个编织一定不是 Markov 等价的；计数相同，什么也推不出。
3. **幂等公理省不得。** `coloringCount` 对任意有限的架都有定义，定理却要求 `[Quandle Q]`。[@ex-fox-three-colorings-markov] 的最后一步给出一个三元素的架，它的计数在一次稳定化下从 $3$ 变成 $0$。

::: {.viz src="braiding" preset="rack" height="500"}
**不幂等的架：添一股就一个也回不来。** 颜色规则换成 $x \star y = y + 1$。左边一股、没有交叉，三个着色都回得来。右边添一股、交叉一次：新股抄来的 $0$ 过交叉变成 $0 \star 0 = 1$，接回来对不上（品红），九个着色一个也回不来。
:::

::: {.example #ex-fox-three-colorings-markov title="三种颜色数出 3、3、9：$\sigma_1$、$\sigma_1^2$、$\sigma_1^3$ 的闭合着色与稳定化前后的同一个数（含文献说明，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表“闭合的图形”一列（哪个编织闭合成哪个结或链环）是几何识别，属于经典纽结理论。本例的全部计数由穷举得到（每一个都可以手算核对），属手工推导，不是 Lean 结论；Lean 验证的是 [@thm-quandle-coloring-markov-invariant] 所断言的相等关系。

**颜色与规则。** 取 $Q = \mathbb{Z}/3 = \{0, 1, 2\}$，$x \star y = 2x - y \pmod 3$（Mathlib 的 `Quandle.Dihedral 3`）。模 $3$ 时 $2x - y \equiv -(x + y) \equiv 2y - x$，运算关于 $x$、$y$ 对称，规则是：两色相同，结果还是这一色；两色不同，结果是第三色。逐一核对 $27$ 个三元组，自分配律成立；每个左平移 $y \mapsto x \star y$ 都是对合；$x \star x = x$。一次交叉 $(x, y) \mapsto (x \star y,\ x)$ 涉及的三个颜色 $x$、$y$、$x \star y$ 或者全同，或者两两不同：这就是 Fox 的三染色规则。

**两股。** $\sigma_1 \cdot (x, y) = (x \star y,\ x) = (-x - y,\ x)$（模 $3$）。九个着色分成五条轨道：

$$
\begin{aligned}
&(0,0), \qquad (1,1), \qquad (2,2), \\
&(0,1) \to (2,0) \to (1,2) \to (0,1), \qquad (0,2) \to (1,0) \to (2,1) \to (0,2).
\end{aligned}
$$

三个单色着色不动，其余六个排成两个三循环。所以 $\sigma_1$ 与 $\sigma_1^2$ 各有 $3$ 个不动点，$\sigma_1^3$ 把九个着色全部送回原处。下表中 $e$ 是单位元（没有交叉的编织）。

| 正股数编织 $(n, b)$ | 着色计数 | 闭合着色 | 闭合的图形（几何识别） |
| :---: | :---: | :---: | :---: |
| $(1, e)$ | $3$ | 全部 $(x)$ | 平凡结 |
| $(2, e)$ | $9$ | 全部 $(x, y)$ | 两个互不相扣的圈 |
| $(2, \sigma_1)$ | $3$ | $(x, x)$ | 平凡结 |
| $(2, \sigma_1^2)$ | $3$ | $(x, x)$ | 霍普夫链环 |
| $(2, \sigma_1^3)$ | $9$ | 全部 $(x, y)$ | 三叶结 |

**添一股。** 对 $b = \sigma_1^k$（$k = 1, 2, 3$），在三股上穷举全部 $27$ 个着色：

| 两股上的 $b$ | $(2, b)$ 的计数 | $\bigl(3,\ \iota_2(b)\,\sigma_2\bigr)$ 的计数 | $\bigl(3,\ \iota_2(b)\,\sigma_2^{-1}\bigr)$ 的计数 | 三股上的闭合着色 |
| :---: | :---: | :---: | :---: | :---: |
| $\sigma_1$ | $3$ | $3$ | $3$ | $(x, x, x)$ |
| $\sigma_1^2$ | $3$ | $3$ | $3$ | $(x, x, x)$ |
| $\sigma_1^3$ | $9$ | $9$ | $9$ | 全部 $(x, y, y)$ |

每一行的三个计数相等，三股上的闭合着色恰好是把两股上的闭合着色的末位再抄一遍，与 [@def-markov-coloring-equivs] 的第 1、2 条一致。第一张表里的两个平凡结也是同一回事：$(2, \sigma_1)$ 就是 $(1, e)$ 的正稳定化 $\bigl(2,\ \iota_1(e)\,\sigma_1\bigr)$，计数 $3 = 3$。再试一次共轭：取 $b = \iota_2(\sigma_1^3)\,\sigma_2$ 与 $g = \sigma_1\sigma_2^{-1}$，$g\,b\,g^{-1}$ 的计数仍是 $9$。

**读数。** 把上面穷举的计数代入 [@thm-quandle-coloring-markov-invariant]（这一步代入是手工推导）：$9 \ne 3$，所以按定理的逆否命题，$(2, \sigma_1^3)$ 与 $(2, \sigma_1)$ 不是 Markov 等价的；同理，$(2, \sigma_1^2)$（计数 $3$）与 $(2, e)$（计数 $9$）不是 Markov 等价的。$(2, \sigma_1)$ 与 $(2, \sigma_1^2)$ 的计数同为 $3$，由此推不出任何结论：三种颜色分不开它们。

**幂等公理省不得。** 取 $Q' = \mathbb{Z}/3$，$x \star y = y + 1$。它是架：每个左平移都是双射，自分配律两边都等于 $z + 2$；但 $x \star x = x + 1 \ne x$，它不是幂等架。$(1, e)$ 有 $3$ 个闭合着色；它的正稳定化 $(2, \sigma_1)$ 把 $(x, y)$ 送到 $(y + 1,\ x)$，不动点要求 $x = y$ 且 $y + 1 = x$，一个也没有。计数从 $3$ 变成 $0$。
:::

::: {.viz src="braiding" preset="trefoil" height="500"}
**$\sigma_1$ 与 $\sigma_1^3$ 数出不同的数。** 左边 $\sigma_1$，右边 $\sigma_1^3$，颜色都从 $(0, 1)$ 出发：左边接回来对不上（品红），右边对得上（青色）。回得来的着色左边 $3$ 个，右边 $9$ 个；$3 \ne 9$，按 [@thm-quandle-coloring-markov-invariant] 两者不是 Markov 等价的。
:::

::: {.remark #rem-alexander-markov-literature title="Artin、Alexander 与 Markov：从代数 Markov 类到链环不变量（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** [@thm-quandle-coloring-markov-invariant] 的陈述中没有任何几何对象。把它读成链环的不变量，需要三条经典定理（以下的编织与链环都指光滑或分段线性的）：

1. **Artin 定理**（E. Artin, *Theorie der Zöpfe*, Abh. Math. Sem. Univ. Hamburg **4**, 47–72, 1925；*Theory of braids*, Ann. of Math. **48**, 101–126, 1947）：$n$ 股几何编织的同痕类构成的群，同构于 [@def-closed-braid-colorings] 中由生成元与关系给出的群 $\mathrm{Artin}\,n$（$n \ge 1$）。
2. **Alexander 定理**（J. W. Alexander, *A lemma on systems of knotted curves*, Proc. Natl. Acad. Sci. USA **9**, 93–95, 1923）：$\mathbb{R}^3$ 中每个定向链环都同痕于某个编织的闭合。
3. **Markov 定理**（A. Markoff, *Über die freie Äquivalenz der geschlossenen Zöpfe*, Mat. Sbornik **1(43)**, 73–78, 1936；完整证明见 J. S. Birman, *Braids, Links, and Mapping Class Groups*, Princeton University Press, 1974）：两个编织的闭合作为定向链环同痕，当且仅当这两个编织可以经有限次共轭、正负稳定化及其逆互相得到，即经第 1 条的同构后，在 [@def-algebraic-markov-moves] 的意义下 Markov 等价。其中容易的方向正是正文的两幅图像：共轭与稳定化都不改变闭合的同痕类。

三条合起来：有限幂等架的闭合着色数是定向链环的同痕不变量。配上 [@ex-fox-three-colorings-markov] 的计数，以及“$\sigma_1^3$ 的闭合是三叶结、$\sigma_1$ 的闭合是平凡结”这一几何识别，就得到三叶结与平凡结不同痕；同理，霍普夫链环与两个互不相扣的圈不同痕。闭合着色也可以不经过编织来描述：它们对应于从链环的基本 quandle 到 $Q$ 的同态（D. Joyce, *A classifying invariant of knots, the knot quandle*, J. Pure Appl. Algebra **23**, 37–65, 1982；S. V. Matveev, *Distributive groupoids in knot theory*, Mat. Sb. **119(161)**, 78–88, 1982），$Q = \mathbb{Z}/3$ 时就是 Fox 的三染色。对不满足幂等公理的架，着色计数只是带标架链环的不变量（R. Fenn 与 C. Rourke, *Racks and links in codimension two*, J. Knot Theory Ramifications **1**, 343–406, 1992）。
:::

编织有头有尾，结没有。头尾接上之后，颜色还得原样回来；只要颜色取自幂等架，添一股，换一处剪口，回得来的着色就一个不多、一个不少。这一半，Lean 已经验证。

::: {.viz src="braiding" height="560"}
编织的完整实验室：在最上面添交叉 $\sigma_k^{\pm 1}$、换股数、点底部的数字换颜色，看颜色怎样顺着世界线往上传；首尾接上之后数一数回得来的着色，也可以换成不幂等的架 $x \star y = y + 1$ 对照。
:::

现在，让我们通过一个四步连贯的具体数值与矩阵算例，把不可克隆内积差、三比特重复码的二元辛综合征、编码态局部布洛赫向量的精确行为以及正交综合征矩阵恢复完整地验算一遍。

::: {.example #ex-repetition-code-syndrome title="不可克隆数值缺口、三比特重复码综合征奇偶校验与 8×2 正交恢复全流程验算（含文献说明，未在本书形式化）"}
**含文献说明。** 本例第一步、第二步与第四步具体验算本章经内核验证的 [@thm-no-cloning-overlap]、[@lemma-pauli-word-phase] 与 [@prop-orthogonal-syndrome-recovery]；而第三步关于满足下述条件的稳定子码单比特约化态的一般判据，以及第四步末尾对比提及的五比特码、七比特 Steane 码与九比特 Shor 码单比特纠错性质，均属量子纠错文献结论（详见下文 [@rem-error-correction-anyons-literature]），未在本书形式化。

本例分四步手算验证本章的核心定理与物理边界：

**第一步：不可克隆定理在 $45^\circ$ 叠加态上的数值缺口与正交基特例。**
在单比特空间 $H = \mathbb{C}^2$ 中，取初态 $\lvert\psi\rangle = \lvert 0\rangle = \binom{1}{0}$、叠加态 $\lvert\phi\rangle = \lvert +\rangle = \frac{1}{\sqrt{2}}\binom{1}{1}$ 以及空白寄存器 $\lvert\mathrm{blank}\rangle = \lvert 0\rangle$。此时输入对的内积重叠度为

$$
z = \langle\phi, \psi\rangle_{\mathbb{C}} = \frac{1}{\sqrt{2}} \approx 0.7071067811865476,
$$

而目标克隆输出 $\lvert\phi\rangle\otimes\lvert\phi\rangle$ 与 $\lvert\psi\rangle\otimes\lvert\psi\rangle$ 的内积为

$$
z^2 = \Bigl(\frac{1}{\sqrt{2}}\Bigr)^2 = \frac{1}{2} = 0.5.
$$

两者之间存在非零缺口 $z - z^2 = \frac{\sqrt{2} - 1}{2} \approx 0.2071067811865476 \neq 0$，直接违背 [@thm-no-cloning-overlap] 的必要条件 $z = z^2$，故绝不存在同时克隆 $\lvert 0\rangle$ 与 $\lvert +\rangle$ 的线性等距算子 $U$。反之，若取正交对 $\lvert\psi\rangle = \lvert 0\rangle$ 与 $\lvert\phi\rangle = \lvert 1\rangle$，则 $z = \langle 1, 0\rangle_{\mathbb{C}} = 0 = 0^2$ 满足判据；此时受控非门 $\mathrm{CNOT}$ 在固定空白态 $\lvert 0\rangle$ 上精确实现 $\mathrm{CNOT}\lvert 00\rangle = \lvert 00\rangle$ 与 $\mathrm{CNOT}\lvert 10\rangle = \lvert 11\rangle$（注意该操作仅复制这对特定正交基，并不克隆它们的叠加态 $\lvert +\rangle$）。

**第二步：三比特位翻转重复码（bit-flip repetition code）与模 $2$ 辛奇偶校验。**
取 $N = 3, p = 2$。定义逻辑等距嵌入 $V : \mathbb{C}^2 \to \mathbb{C}^8$ 为 $V\lvert 0\rangle = \lvert 000\rangle$、$V\lvert 1\rangle = \lvert 111\rangle$。码空间由两个稳定子校验算子

$$
g_1 = Z_1 Z_2 = Z \otimes Z \otimes I, \qquad g_2 = Z_2 Z_3 = I \otimes Z \otimes Z
$$

共同稳定（在码空间上 $g_1 V = V$，$g_2 V = V$）。用 `PauliWord 3 2` 表示时，$g_1, g_2$ 的位移向量均为 $x = (0, 0, 0)$，相位检查行向量分别为 $z^{(1)} = (1, 1, 0)$ 与 $z^{(2)} = (0, 1, 1)$。考察四个候选单比特位翻转错误 $E \in \{I, X_1, X_2, X_3\}$，其 $z$ 向量均为 $(0, 0, 0)$，而位移向量 $x^{(E)}$ 依次为 $(0,0,0), (1,0,0), (0,1,0), (0,0,1)$。由 [@lemma-pauli-word-phase]，校验算子 $g_r$（$r \in \{1, 2\}$）跨过错误算子 $E$ 时的相对交换相位为 $(-1)^{(z^{(r)} \cdot x^{(E)}).\mathrm{val}}$，给出如下一一对应的二元综合征表：

| 错误算子 $E$ | 位移向量 $x^{(E)} \in (\mathrm{ZMod}\,2)^3$ | 模 $2$ 点积 $\bigl(z^{(1)}\cdot x^{(E)},\; z^{(2)}\cdot x^{(E)}\bigr)$ | 稳定子本征值综合征 $(g_1, g_2)$ | 受损码空间基态 $\{E\lvert 000\rangle, E\lvert 111\rangle\}$ |
| :---: | :---: | :---: | :---: | :---: |
| $E_0 = I$ | $(0, 0, 0)$ | $(0, 0)$ | $(+1, +1)$ | $\{\lvert 000\rangle, \lvert 111\rangle\}$ |
| $E_1 = X_1$ | $(1, 0, 0)$ | $(1, 0)$ | $(-1, +1)$ | $\{\lvert 100\rangle, \lvert 011\rangle\}$ |
| $E_2 = X_2$ | $(0, 1, 0)$ | $(1, 1)$ | $(-1, -1)$ | $\{\lvert 010\rangle, \lvert 101\rangle\}$ |
| $E_3 = X_3$ | $(0, 0, 1)$ | $(0, 1)$ | $(+1, -1)$ | $\{\lvert 001\rangle, \lvert 110\rangle\}$ |

**第三步：编码逻辑态的局部布洛赫向量分析（区分 GHZ 特例与一般逻辑态）。**
若取逻辑正东态 $\lvert +\rangle = \frac{\lvert 0\rangle + \lvert 1\rangle}{\sqrt{2}}$，编码后得到三比特 GHZ 态

$$
\lvert +_L\rangle = V\lvert +\rangle = \frac{\lvert 000\rangle + \lvert 111\rangle}{\sqrt{2}}.
$$

对任意两颗比特求偏迹，剩下的单比特约化密度矩阵均为 $\frac{1}{2}I_2$，因此在这一个特定状态上，三颗物理比特的局部布洛赫向量确实全部为零：$\vv{r}_1 = \vv{r}_2 = \vv{r}_3 = \vv{0}$。

**但绝不能由此夸大写成“所有稳定子码在一切逻辑态上都抽干每个局部方向”！** 事实上，若取一般逻辑叠加态 $\lvert\psi_L\rangle = \alpha\lvert 000\rangle + \beta\lvert 111\rangle$（$|\alpha|^2 + |\beta|^2 = 1$），虽然单比特横向分量 $\langle X_i\rangle = \langle Y_i\rangle = 0$ 恒为零，但单比特竖直分量却等于

$$
\langle Z_i\rangle_{\psi_L} = |\alpha|^2 - |\beta|^2 \qquad (i = 1, 2, 3),
$$

只要 $|\alpha| \neq |\beta|$（例如逻辑北极 $\lvert 0_L\rangle = \lvert 000\rangle$），局部布洛赫向量 $\vv{r}_i = (0, 0, |\alpha|^2 - |\beta|^2)$ 就非零！原因在于三比特重复码只防护 $X$ 翻转（对 $Z$ 错误的码距仅为 $1$，单比特 $Z_1$ 本身就是逻辑算子 $\bar{Z}$）。一个充分条件是：稳定子码的**码距 $d_{\mathrm{code}} \ge 2$，且整个稳定子群 $\mathcal{S}$ 中不含权重为 $1$ 的元素**。这里必须检查包括生成元乘积在内的全群，而非仅看所选生成元列表。在此条件下，每个单比特泡利算子 $P_i \in \{X_i, Y_i, Z_i\}$ 都至少与某个生成元 $g \in \mathcal{S}$ 反对易，从而在码投影下被强制压缩为零（$P_{\mathcal{C}} P_i P_{\mathcal{C}} = 0$），使任意逻辑态的单比特约化态恒等于 $\rho_i = \frac{1}{2}I_2$（局部布洛赫向量恒为零）。码距至少为 $2$ 的纯码满足这一条件，但纯性一般更强，并非必要；额外附着固定辅助态 $\lvert 0\rangle$ 则使 $Z_i \in \mathcal{S}$，不满足上述无权重 $1$ 元素的条件。

**第四步：按 [@prop-orthogonal-syndrome-recovery] 验算 $8\times 2$ 正交综合征恢复与相位错误边界。**
令 $s = \mathrm{Fin}\,4$、$n = \mathrm{Fin}\,8$、$d = \mathrm{Fin}\,2$，定义四个 $8\times 2$ 综合征嵌入矩阵为 $S_j = E_j V$（$j \in \{0, 1, 2, 3\}$）。如第二步表格最后一列所示，四个二维子空间 $\operatorname{range}(S_j)$ 恰好将 $\mathbb{C}^8$ 的 $8$ 个标准基向量划分为四组互不相交的正交对，故严格满足 `OrthogonalSyndromes S`：

$$
S_i^* S_j = V^* E_i^* E_j V = \delta_{ij} I_2 \qquad (\forall i, j \in \{0, 1, 2, 3\}).
$$

现在取噪声系数矩阵 $\sigma = \operatorname{diag}\bigl(\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{8}\bigr) \in M_4(\mathbb{C})$（其迹为 $\Tr(\sigma) = \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{8} = 1$），并取逻辑密度矩阵 $\rho = \lvert +\rangle\langle +\rvert = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix} \in M_2(\mathbb{C})$。受损物理态为 $8\times 8$ 块混合矩阵 $\mathrm{syndromeEncoding}(S, \sigma, \rho) = \sum_{j=0}^3 \sigma_{jj} S_j \rho S_j^*$。对其应用解码映射 $\mathrm{syndromeDecoding}(S, \cdot)$，由 [@prop-orthogonal-syndrome-recovery] 逐块缩并得：

$$
\begin{aligned}
&\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr) \\
&= \sum_{i=0}^3 S_i^* \Bigl(\sum_{j=0}^3 \sigma_{jj} S_j \rho S_j^*\Bigr) S_i \\
&= \Bigl(\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{8}\Bigr)\begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix} = \rho!
\end{aligned}
$$

最后必须指明该码的纠错边界：这套四分支正交综合征仅能纠正至多一个 $X$ 位翻转错误 $\{I, X_1, X_2, X_3\}$；倘若发生的是单比特相位翻转错误 $Z_1 = Z \otimes I \otimes I$，由于 $Z_1$ 与 $g_1 = Z_1 Z_2$、$g_2 = Z_2 Z_3$ 均对易，它不会触发任何综合征警报（停留在 $S_0$ 子空间内），却把逻辑态 $\lvert +_L\rangle$ 翻转成了正交的 $\lvert -_L\rangle = \frac{\lvert 000\rangle - \lvert 111\rangle}{\sqrt{2}}$。因此三比特重复码绝不能纠正任意单比特量子噪声（纠正任意单比特错误至少需要五比特码或七比特 Steane 码、九比特 Shor 码）。
:::

::: {.viz src="syndrome-decoding" preset="two" height="500"}
**翻两个，灯指错。** 逻辑态 $\lvert 000\rangle$ 的第一、二个比特一起翻（两个品红的 X）：只有 $g_2$ 亮，与只翻第三个一模一样。解码器照灯翻回第三个比特（琥珀色），合起来是 $X_1X_2X_3$，一个逻辑翻转：青色柱子落在 $\lvert 111\rangle$ 上，虚线却在 $\lvert 000\rangle$。这套码只纠至多一个 $X$ 翻转。
:::

换成相位翻转，失败的方式就不同了：$Z_1$ 与 $g_1 = Z_1Z_2$、$g_2 = Z_2Z_3$ 都对易，两道校验一盏灯也不亮，$\lvert +_L\rangle$ 却被翻成了 $\lvert -_L\rangle$。

::: {.viz src="syndrome-decoding" preset="phase" height="500"}
**翻相位，灯不亮，态却变了。** 逻辑态 $\lvert +_L\rangle$ 的第一个比特翻了相位（品红的 Z）：$Z_1$ 与 $g_1$、$g_2$ 都对易，两盏灯都不亮，柱子没有离开码空间，解码器也不动；可 $\lvert 111\rangle$ 那根青色柱子翻到了轴下，与虚线正好相反，态成了正交的 $\lvert -_L\rangle$。
:::

::: {.remark #rem-error-correction-anyons-literature title="Knill–Laflamme 纠错条件、稳定子码与任意子拓扑编织（形式化结果与文献边界）"}
本章现在还包含有限矩形 Kraus 充分性定理 [@thm-finite-kraus-recovery-sufficiency]；它把一族已给定的有限误差矩阵的标量乘积条件，具体构造成归一且覆盖整个物理输入的恢复族。下面列出仍留在经典文献边界内的充要性全貌、稳定子码结构与任意子物理结果：

1. **Knill–Laflamme 充要条件**（E. Knill and R. Laflamme, *Theory of quantum error-correcting codes*, Phys. Rev. A **55**, 900–911, 1997, doi:10.1103/PhysRevA.55.900）：经典文献的完整说法是，设 $P_{\mathcal{C}} = V V^*$ 为物理空间到码子空间 $\mathcal{C}$ 的正交投影。一族噪声 Kraus 算子 $\{E_i\}$ 在 $\mathcal{C}$ 上可被某个完全正且保迹（CPTP）恢复信道精确纠正，当且仅当存在厄米系数矩阵 $\alpha_{ij} \in \mathbb{C}$ 使得

   $$
   P_{\mathcal{C}} E_i^* E_j P_{\mathcal{C}} = \alpha_{ij} P_{\mathcal{C}} \qquad (\forall i, j).
   $$

   将 $\alpha$ 对角化后，即可在可纠子空间上化归为本章 [@prop-orthogonal-syndrome-recovery] 的正交综合征结构 $S_i^* S_j = \delta_{ij} I_d$，并且标量因子 $\alpha_{ij}$ 独立于码空间内的具体逻辑态，从根本上保证了综合征测量不会泄露任何逻辑叠加幅度。 本章的有限、矩形、充分性方向由 [@thm-finite-kraus-recovery-sufficiency] 承担；对于非空逻辑空间，已给定有限 Kraus 表示、在整个物理空间上归一且在所有复逻辑矩阵上构成左逆的恢复，其必要性可直接查阅冻结源码 [`left_inverse_error_products`](lean:D5/S3/Quantum/Recovery/KrausLeftInverseNecessity.left_inverse_error_products)，本书只作来源说明，不另加定理盒。
2. **Gottesman 稳定子码形式体系**（D. Gottesman, *Stabilizer Codes and Quantum Error Correction*, Caltech Ph.D. thesis, 1997, arXiv:quant-ph/9705052）：在 $N$ 比特泡利群 $\mathcal{P}_N$ 中，取由 $N - k$ 个相互独立且两两对易的泡利生成元生成、阶为 $|\mathcal{S}| = 2^{N-k}$ 且不含 $-I^{\otimes N}$ 的阿贝尔子群 $\mathcal{S} \cong (\mathbb{Z}/2\mathbb{Z})^{N-k}$，其公共 $+1$ 特征子空间构成 $2^k$ 维码空间 $\mathcal{C}$。凡与 $\mathcal{S}$ 中某个生成元反对易的泡利错误算子均由二元辛内积唯一标记非零综合征；而在 $\mathcal{S}$ 的正规化子（即中心化子）$N(\mathcal{S})$ 中，商去全局标量相位中心群 $\langle i I^{\otimes N}\rangle = \{\pm I^{\otimes N}, \pm i I^{\otimes N}\}$ 与稳定子群 $\mathcal{S}$ 后，集合 $N(\mathcal{S}) \setminus (\langle i I^{\otimes N}\rangle \cdot \mathcal{S})$ 中的算子代表商群 $N(\mathcal{S}) / (\langle i I^{\otimes N}\rangle \cdot \mathcal{S})$ 中的非平凡逻辑算子（商去标量相位排除了诸如 $-I^{\otimes N}$ 这类仅改变全局相位、泡利权重为 $0$ 的平凡中心元），码距 $d_{\mathrm{code}}$ 则严格定义为全体 $E \in N(\mathcal{S}) \setminus (\langle i I^{\otimes N}\rangle \cdot \mathcal{S})$ 的最小泡利汉明权重。
3. **二维配置空间辫群与任意子分数统计**（J. M. Leinaas and J. Myrheim, *On the theory of identical particles*, Nuovo Cimento B **37**, 1–23, 1977, doi:10.1007/BF02727953）：对欧氏空间 $M = \mathbb{R}^d$ 上 $n$ 个全同不可碰撞点粒子的配置空间 $\mathrm{Conf}_n(M) = \{(x_1, \dots, x_n) \in M^n : i \neq j \Rightarrow x_i \neq x_j\} / S_n$，当 $d \ge 3$ 时基本群同构于对称群 $\pi_1(\mathrm{Conf}_n(\mathbb{R}^d)) \cong S_n$（在一维幺正交换表示中，单次交换只能给出玻色 $+1$ 或费米 $-1$ 符号）；当 $d = 2$ 时，基本群为 Artin 辫群 $\pi_1(\mathrm{Conf}_n(\mathbb{R}^2)) \cong B_n$，允许连续阿贝尔任意子相位或非阿贝尔高维幺正编织表示。
4. **非阿贝尔任意子与拓扑容错的物理边界**（C. Nayak, S. H. Simon, A. Stern, M. Freedman, and S. Das Sarma, *Non-Abelian anyons and topological quantum computation*, Rev. Mod. Phys. **80**, 1083–1159, 2008, doi:10.1103/RevModPhys.80.1083）：在具有能隙的二维拓扑物相中，非阿贝尔准粒子的简并融合空间对局域微扰具有随准粒子间距 $L$ 指数衰减的分裂保护 $\Delta E \propto e^{-L/\xi}$，世界线编织在简并子空间上诱导出满足 Yang–Baxter 关系的非平凡幺正门。这里的门操作要求任意子彼此充分分离，运动相对于体能隙保持绝热，同时在操作历时内不分辨有限间距带来的残余能级分裂。但需注意：首先，如正文所述，三维空间中点粒子交换回路可借第三空间轴解开，绝不意味着三维闭合一维绳结（knots）会自动解开；其次，拓扑保护在真实有限温度硬件中仍受热激发准粒子游走（thermal poisoning）与有限尺寸效应限制，并非在物理实现中绝对零错误。
:::

::: {.viz src="syndrome-decoding" height="560"}
综合征解码的完整实验室：在舞台上点比特加上 $X$ 或 $Z$ 错误，看两道校验怎样亮、解码器翻回哪一个、柱子是否落回虚线；也可以换逻辑态，或换成四分支混合 $\sigma$。
:::

现在，我们已经学会了如何用纠缠和正交综合征把脆弱的量子态稳稳护在多比特高维子空间里。一旦拥有了受保护的逻辑量子寄存器，我们接下来自然要问：**在这片高维球面上，量子算法究竟如何利用“两子正交反射”与“赤道相位齿轮”完成经典计算机望尘莫及的加速？** 让我们推开[第十五章](ch15-grover-qft-and-period-finding.md)的大门，走进 Grover 搜索、量子傅里叶变换（QFT）与 Shor 周期寻找的几何心脏。
