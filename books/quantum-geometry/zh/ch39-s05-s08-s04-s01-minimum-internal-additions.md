# 35.6.8.4.1 新增同行三元组的最小数

固定 $d,r\ge 1$，令 $q=3^d$。点集为 $\mathbb F_3^d\times\mathbb Z/(3r)\mathbb Z$，每个 $x\in\mathbb F_3^d$ 对应一行。保留所有跨行提升三元组，即第一坐标互异且在乘积群中和为零的三元组。我们可以在同一行内补上若干三元组，但每个三元组的三点须互异，任意两个不同的点至多同属一个三元组。[@thm-joint-circuit-internal-dimension]

::: {.theorem #thm-joint-circuit-minimum-internal-lower-bound title="增加一个点势维度的下界" lean="D5/S3/Combinatorics/Matroids/RankThreeMinimumInternalAdditions.internal_additions_lower_bound"}
在上述条件下，若归一化点势空间的维数增至 $d+1$，则至少需新增 $qr^2$ 个同行三元组。
:::

::: proof
维数判据要求每个未覆盖的同行点对在模三约化后具有相同的余数。因此，同一行内余数不同的两个点必在一个新增三元组中。每行有六种有序的异余数类对，每类有 $r$ 个点，故这类有序点对共有 $6qr^2$ 个。

对每个有序点对，选定一个含有它的新增三元组，并记下这两个点所在的有序位置。由三元组及位置能恢复原点对，所以这是一个单射。每个新增三元组只有六对不同的有序位置，因而至少需要 $qr^2$ 个新增三元组。完整证明由 Lean 内核检查。[@thm-joint-circuit-internal-dimension]
:::

::: {.theorem #thm-joint-circuit-minimum-internal-attained title="模三剩余类上的横截设计达到下界" lean="D5/S3/Combinatorics/Matroids/RankThreeMinimumInternalAdditions.exists_internal_additions_attaining"}
对上述跨行三元组，可以恰好加入 $qr^2$ 个同行三元组，使合并后的每个三元组仍有三个不同的点，每个不同点对至多出现一次，且归一化点势空间恰为 $d+1$ 维。
:::

::: proof
在每一行内，把循环坐标按模三余数分成三类。每类恰有 $r$ 个点，把每类的点编号为 $\mathbb Z/r\mathbb Z$。对每对编号 $a,b$，取余数 $0$ 类中编号 $a$ 的点、余数 $1$ 类中编号 $b$ 的点、余数 $2$ 类中编号 $-a-b$ 的点。给定其中任意两个不同余数的点，就能解出第三个编号。因此每个同行且余数不同的点对恰好出现一次，并且同余数点对未被这些三元组覆盖。新增三元组的余数和为 $0+1+2=0$，而未覆盖同行点对的余数差为零。两项模三条件都成立，点势维数因此为 $d+1$。

各行各有 $r^2$ 个新增三元组，与任何跨行三元组都没有共同点对。这里的编号只要求是各剩余类与 $\mathbb Z/r\mathbb Z$ 的集合双射，因而也适用于 $9\mid 3r$。例如 $d=1,r=2$ 时，每行的三个余数类分别是 $\{0,3\}$、$\{1,4\}$、$\{2,5\}$。为每类按写出的顺序编号 $0,1$，每行得到四个三元组 $\{0,1,2\}$、$\{0,4,5\}$、$\{3,1,5\}$ 和 $\{3,4,2\}$，三行一共新增十二个。完整证明由 Lean 内核检查。[@thm-joint-circuit-internal-dimension]
:::

## 35.6.8.4.1.1 达到最小数的所有扩充

上一节的构造用循环群运算选出第三个标签。精确下界还告诉我们这个选择有多少自由度。固定任意一行的任意一个余数类，将其中的点用 $\{0,\ldots,r-1\}$ 编号。各行各类的编号可以独立选择。

::: {.theorem #thm-joint-circuit-minimum-internal-latin title="最小三元组族由逐行拉丁方生成" lean="D5/S3/Combinatorics/Matroids/RankThreeOptimalInternalLatin.exists_latin_of_optimal_family"}
固定跨行三元组族。若新增三元组恰有 $3^d r^2$ 个，且归一化点势空间的维数为 $d+1$，则每个点行 $x$ 对应一个 $r$ 阶拉丁方 $L_x$。这一行的无序三元组恰好由余数 $0$ 类中编号为 $a$ 的点、余数 $1$ 类中编号为 $b$ 的点、余数 $2$ 类中编号为 $L_x(a,b)$ 的点构成，其中 $a,b$ 遍历全部编号。
:::

::: proof
达到下界时，计数证明中的单射成为双射。新增三元组的每一对不同有序位置，都对应同一行中余数不同的点对。因此每个新增三元组的三个点分别来自余数 $0,1,2$ 类。任意两个不同余数类中的点唯一确定第三点。用余数 $0,1$ 两类的点定义 $L_x(a,b)$，另外两对余数类的唯一补全性保证了 $L_x$ 的每行和每列都是编号的一个排列。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-joint-circuit-minimum-internal-latin-unique title="无序三元组族确定拉丁方" lean="D5/S3/Combinatorics/Matroids/RankThreeOptimalInternalLatin.latin_assignment_injective"}
固定余数类内的编号。如果两组逐行表格给出相同的无序三元组族，它们在每行的每个表格位置取值都相同。
:::

::: proof
即使忘掉三元组的顺序，点的余数也能识别它在三元组中的位置。固定点行后，余数 $0,1$ 类中的点给出表格位置 $(a,b)$，余数 $2$ 类中的点给出表格取值。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-joint-circuit-minimum-internal-latin-converse title="任意逐行拉丁方都给出最小扩充" lean="D5/S3/Combinatorics/Matroids/RankThreeOptimalInternalLatin.optimal_family_of_latin"}
在每个点行独立选择一个 $r$ 阶拉丁方。把各表格位置对应的三元组加到固定的跨行族中，恰好新增 $3^d r^2$ 个互不相同的同行三元组。合并后的任意不同点对仍至多出现一次，归一化点势空间的维数为 $d+1$。
:::

::: proof
每行每列的排列性质保证了同一行中不同余数类的点对可以唯一补全。同一三元组中三点互异，同余数的点对不会被这些新三元组覆盖。跨行三元组只覆盖不同行的点对，所以新增三元组保留了点对唯一性。每个新增三元组的余数和为零，未覆盖的同行点对的余数差也为零。由维数判据得到 $d+1$。每个点行有 $r^2$ 个表格位置。完整证明由 Lean 内核检查。[@thm-joint-circuit-internal-dimension]
:::

## 35.6.8.4.1.2 所有保留额外维度的扩充

仍固定跨行三元组与各余数类的独立编号。部分斯坦纳三元系是一族三元素集合，任意两个不同标签至多同属其中一个集合。

::: {.theorem #thm-joint-circuit-steiner-decomposition title="扩充族中的拉丁方与部分斯坦纳三元系" lean="D5/S3/Combinatorics/Matroids/RankThreeInternalSteinerDecomposition.forward_decomposition"}
设新增三元组均由同一行内三个不同的点组成，且合并后的族保持点对唯一性。若点势空间维数为 $d+1$，则新增的无序族由各行拉丁方的三元组和各行各实际余数类内的部分斯坦纳三元系组成。
:::

::: proof
每个同行三元组的余数和为零，所以三个余数全同或全异。同一行中余数不同的点对都必须被覆盖。余数 $0,1$ 两类中的点对恰好把余数全异的三元组各数一次，因此这一类三元组共有 $3^d r^2$ 个。删去同余数的三元组后，异余数点对的覆盖和额外维度仍然保留，于是剩下的三元组可用最小族的拉丁方分类。每个余数类内其余三元组继承点对唯一性。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-joint-circuit-steiner-realization title="拉丁方与部分斯坦纳三元系可以独立选择" lean="D5/S3/Combinatorics/Matroids/RankThreeInternalSteinerDecomposition.realize_decomposition"}
在每行任取一个 $r$ 阶拉丁方，并在各行各余数类的 $r$ 个标签上任取部分斯坦纳三元系。对应的三元组给出固定跨行族的一个点对唯一扩充，归一化点势空间维数为 $d+1$。
:::

::: proof
跨行三元组使用不同行的点对。拉丁方三元组使用同行异余数的点对。部分斯坦纳三元系使用同行同余数的点对。三类点对互不相交。新增的同余数三元组仍有零余数和，且未覆盖的点对只会减少，所以保留额外维度的条件仍成立。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-joint-circuit-steiner-unique title="无序扩充族确定全部选择" lean="D5/S3/Combinatorics/Matroids/RankThreeInternalSteinerDecomposition.decomposition_unique"}
固定编号后，无序扩充族唯一确定各行的拉丁方和各行各余数类的部分斯坦纳三元系。
:::

::: proof
观察余数即可识别拉丁方三元组。其余每个三元组的一点已足以确定该三元组的行与余数类，再用该类的编号恢复三元素集合。完整证明由 Lean 内核检查。
:::
