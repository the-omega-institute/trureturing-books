# 35.6.8.4.1 新增同行三元组的最小数

固定 $d,r\ge 1$，令 $q=3^d$。点集为 $\mathbb F_3^d\times\mathbb Z/(3r)\mathbb Z$，每个 $x\in\mathbb F_3^d$ 对应一行。保留所有跨行提升三元组，即第一坐标互异且在乘积群中和为零的三元组。我们可以在同一行内补上若干三元组，但每个三元组的三点须互异，任意两个不同的点至多同属一个三元组。[@thm-joint-circuit-internal-dimension]

::: {.theorem #thm-joint-circuit-minimum-internal-lower-bound title="增加一个点势维度的下界" lean="D5/S3/Combinatorics/Matroids/RankThreeMinimumInternalAdditions.internal_additions_lower_bound"}
在上述条件下，若归一化点势空间的维数增至 $d+1$，则至少需新增 $qr^2$ 个同行三元组。
:::

::: proof
原来的跨行三元组每个恰好覆盖六个跨行有序点对。每个这样的点对又恰好出现一次，所以原有三元组数为 $q(q-1)(3r)^2/6$。若点势空间增加到 $d+1$ 维，所有基点势的联合取值把 $3qr$ 个点分成 $3q$ 个等大的纤维，每个纤维有 $r$ 个点。跨纤维的有序点对各需出现一次，于是全部三元组数至少为 $3q(3q-1)r^2/6$。两数相差

$$
\frac{3q(3q-1)r^2-q(q-1)(3r)^2}{6}=qr^2.
$$

完整证明由 Lean 内核检查。[@thm-joint-circuit-potential-fibers] [@thm-joint-circuit-minimum-omissions-bound]
:::

::: {.theorem #thm-joint-circuit-minimum-internal-attained title="模三剩余类上的横截设计达到下界" lean="D5/S3/Combinatorics/Matroids/RankThreeMinimumInternalAdditions.exists_internal_additions_attaining"}
对上述跨行三元组，可以恰好加入 $qr^2$ 个同行三元组，使合并后的每个三元组仍有三个不同的点，每个不同点对至多出现一次，且归一化点势空间恰为 $d+1$ 维。
:::

::: proof
在每一行内，把循环坐标按模三余数分成三类。每类恰有 $r$ 个点，把每类的点编号为 $\mathbb Z/r\mathbb Z$。对每对编号 $a,b$，取余数 $0$ 类中编号 $a$ 的点、余数 $1$ 类中编号 $b$ 的点、余数 $2$ 类中编号 $-a-b$ 的点。给定其中任意两个不同余数的点，就能解出第三个编号。因此每个同行且余数不同的点对恰好出现一次，并且同余数点对未被这些三元组覆盖。新增三元组的余数和为 $0+1+2=0$，而未覆盖同行点对的余数差为零。两项模三条件都成立，点势维数因此为 $d+1$。

各行各有 $r^2$ 个新增三元组，与任何跨行三元组都没有共同点对。这里的编号只要求是各剩余类与 $\mathbb Z/r\mathbb Z$ 的集合双射，因而也适用于 $9\mid 3r$。例如 $d=1,r=2$ 时，每行的三个余数类分别是 $\{0,3\}$、$\{1,4\}$、$\{2,5\}$。为每类按写出的顺序编号 $0,1$，每行得到四个三元组 $\{0,1,2\}$、$\{0,4,5\}$、$\{3,1,5\}$ 和 $\{3,4,2\}$，三行一共新增十二个。完整证明由 Lean 内核检查。[@thm-joint-circuit-internal-dimension]
:::
