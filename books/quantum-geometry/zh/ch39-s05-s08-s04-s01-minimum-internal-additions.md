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

最小扩充已经覆盖了所有同行异余数点对。若继续添加三元组又要保留额外维度，维数判据允许在同一余数类内补充。仍固定跨行三元组与各余数类的独立编号。部分斯坦纳三元系是一族三元素集合，任意两个不同标签至多同属其中一个集合。

::: {.theorem #thm-joint-circuit-steiner-decomposition title="扩充族中的拉丁方与部分斯坦纳三元系" lean="D5/S3/Combinatorics/Matroids/RankThreeInternalSteinerDecomposition.forward_decomposition"}
设新增三元组均由同一行内三个不同的点组成，且合并后的族保持点对唯一性。若归一化点势空间维数为 $d+1$，则新增的无序族由各行拉丁方的三元组和各行各实际余数类内的部分斯坦纳三元系组成。
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

例如，取 $d=1$、$r=3$。每个余数类恰有三个点，可在该类中加入唯一的三元组，也可留空。三个点行共有九个余数类，各类的选择互相独立。因此在拉丁方给出的 $27$ 个三元组之外，可以再加入零到九个三元组，归一化点势空间始终保持二维。

## 35.6.8.4.1.3 可取得的新增三元组数

上例中可以删去任意几个同余数三元组而保留维度。一般的余数类也有这个性质。记 $D(r,3,2)$ 为 $r$ 个标签上的部分斯坦纳三元系所能含有的最多三元组数。

::: {.theorem #thm-joint-circuit-internal-size-spectrum title="新增三元组数的完整区间" lean="D5/S3/Combinatorics/Matroids/RankThreeInternalSizeSpectrum.exact_size_spectrum"}
沿用本节的跨行三元组、点对唯一性及归一化条件。新增同行三元组的数目恰好可以取遍
$$
3^d r^2 \le N \le 3^d r^2+3^{d+1}D(r,3,2)
$$
中的所有整数，且点势空间维数保持 $d+1$。
:::

::: proof
每个拉丁方固定给出 $r^2$ 个三元组。各行的拉丁方部分互不重叠，且其中任何三元组都含有三个不同余数。其余三元组属于各行各余数类的部分斯坦纳三元系。这样的类有 $3^{d+1}$ 个，各类至多贡献 $D(r,3,2)$ 个三元组，故得到两个端点。

为取得中间任意一个数，先在每个余数类放入一个达到装填上界的三元组族。从这些同余数三元组的并集中任取 $N-3^d r^2$ 个。删去三元组会保留每个类内的点对唯一性。这些选择连同各行的拉丁方，由 [@thm-joint-circuit-steiner-realization] 给出所求扩充。完整证明由 Lean 内核检查。
:::

## 35.6.8.4.1.4 饱和扩充的大小

仍固定跨行三元组，并要求点对唯一性及归一化点势空间维数 $d+1$。如果在这两个条件下无法再加入一个同行三元组，就称扩充为**饱和**。任何包含关系下的真扩充都允许先加入其中的任意一个新三元组，因此饱和也等价于按包含关系极大。 [@thm-joint-circuit-steiner-insert]

::: {.theorem #thm-joint-circuit-steiner-insert title="可从较大的扩充中单独加入一个三元组" lean="D5/S3/Combinatorics/Matroids/RankThreeInternalSizeSpectrum.internal_extension_insert"}
若两个符合条件的同行三元组族满足 $G\subseteq H$，则从 $H$ 任选一个三元组加入 $G$，所得的族仍符合条件。
:::

::: proof
$G$ 的每个拉丁方三元组在 $H$ 中仍是拉丁方三元组。它在余数 $0,1$ 两类中的点确定方格，在余数 $2$ 类中的点确定方格值。因此两族的拉丁方完全相同。若所选三元组尚未出现，它属于某个余数类。只把该块加到相应类里，所得装填仍是 $H$ 在该类中装填的子集。于是点对唯一性与额外维度同时保留。
:::

::: {.theorem #thm-joint-circuit-steiner-saturated title="饱和等价于每个余数类中的装填极大" lean="D5/S3/Combinatorics/Matroids/RankThreeInternalSizeSpectrum.saturated_internal_extension_iff"}
沿用实际余数类的编号。一个扩充饱和，当且仅当其分解中的每个部分斯坦纳三元系都按包含关系极大。
:::

::: proof
若某一类的装填还能扩大，只扩大这一类便给出全局真扩充。反过来，全局真扩充固定全部拉丁方，因而至少扩大了一个余数类内的装填。
:::

::: {.theorem #thm-joint-circuit-steiner-six-saturated-sizes title="六标签时饱和大小隔一个整数取值" lean="D5/S3/Combinatorics/Matroids/RankThreeInternalSizeSpectrum.saturated_six_size_spectrum"}
当 $r=6$ 时，饱和扩充的新增三元组数恰为
$$
36\cdot 3^d+2\cdot 3^{d+1}+2k,\qquad 0\le k\le 3^{d+1},\quad k\in\mathbb Z.
$$
:::

::: proof
六标签装填的两个极大大小也可由经典的局部谱结论得出。 [Colbourn §§2.3.1–2.3.3](https://ajc.maths.uq.edu.au/pdf/4/ocr-ajc-v4-p143.pdf)

在六个标签上，每个标签至多属于两个三元组，因为每块要为该标签使用两个不同搭档，总共只有五个搭档。因此至多有四块。零块与一块都能补充。若有三块，它们不能有一对互不相交，否则任何第三块都会重复其中一块的点对。因此三块两两相交于三个不同的点。每块还各有一个只属于自己的点，这三个点之间的点对都未使用，可以把它们组成第四块。

两种极大大小都能取到。用简写 $abc=\{a,b,c\}$，两块的例子是 $012,345$，未使用的点对形成完全二部图，没有可补的三角形。四块的例子是 $012,034,135,245$，已达到上界。于是 $3^{d+1}$ 个实际余数类可独立选两块或四块。若恰有 $k$ 类选四块，加上每行 $36$ 块拉丁方三元组，即得所述数目。例如 $d=1$ 时，饱和大小恰为 $126,128,\ldots,144$。
:::

### 完整装填下的最大值缺口

当 $r\ge7$ 且 $r$ 个标签上存在完整的斯坦纳三元系时，相邻的两个最大饱和大小也相差二。完整装填使用了每个无序点对，因此每类有 $r(r-1)/6$ 块。要少用两块，可以从一个完整装填出发，选择三个不在同一块中的点，并更换覆盖它们内部点对的块。

::: {.theorem #thm-joint-circuit-steiner-saturated-top-gap title="完整斯坦纳系给出的两个最大饱和大小" lean="D5/S3/Combinatorics/Matroids/RankThreeSaturatedTopGap.saturated_top_gap"}
沿用本节的跨行三元组、点对唯一性和归一化条件。设 $d>0$、$r\ge7$，且 $r$ 个标签上存在一个覆盖每个无序点对的斯坦纳三元系。记
$$
N_{\max}=3^d r^2+3^{d+1}\frac{r(r-1)}{6}.
$$

饱和扩充的新增同行三元组数至多为 $N_{\max}$。$N_{\max}$ 与 $N_{\max}-2$ 均可取得，$N_{\max}-1$ 无法取得。
:::

::: proof
在每个余数类放入完整装填，便取得上界。要少两块，只改一个类。取不成块的三个点 $a,b,c$，设覆盖 $ab,bc,ca$ 的块分别是 $abx,bcy,caz$。因为 $abc$ 不是一块，$x,y,z$ 都在 $\{a,b,c\}$ 之外。点对唯一性保证 $x,y,z$ 互异。删去这三块并加入 $abc$，留下的未覆盖点对恰好沿 $a,x,b,y,c,z,a$ 排成六环。六环没有三角形，因此无法再加入一块。

每个包含给定点的块恰好为这个点使用两个搭档。完整装填能覆盖该点的 $r-1$ 个搭档，所以 $r$ 为奇数，任意部分装填中每个点的未覆盖搭档数都是偶数。若一个类比上界恰少一块，便有三条未覆盖边。它们的度数之和为六，每个有边的点度数至少为二，因此至多涉及三个点。三条不同的边于是构成可补的三角形。由逐类饱和判据，全局减少的块数是各类减少数之和，每个正项至少为二。完整证明由 Lean 内核检查。
:::

例如，七标签的法诺平面有七块。取 $d=1$ 时，拉丁方部分有 $147$ 块，九个余数类还可共给 $63$ 块。两个最大饱和大小是 $210$ 和 $208$。局部极大装填谱见 [Colbourn，第 2.3.3 节](https://ajc.maths.uq.edu.au/pdf/4/ocr-ajc-v4-p143.pdf)。

### 删去一点后的匹配装填

偶数个标签时，可以从多一个点的完整斯坦纳三元系得到最大的部分装填。删去点 $p$ 和所有含 $p$ 的块。对每个剩余点 $a$，原来覆盖 $\{p,a\}$ 的块还含有一个剩余点 $m(a)$。所有未覆盖点对恰为 $\{a,m(a)\}$。因此每个点正好有一个未用的搭档。

::: {.theorem #thm-joint-circuit-steiner-point-deleted-switch title="删点装填的换块判据" lean="D5/S3/Combinatorics/Matroids/PointDeletedSteinerSwitch.point_deleted_switch"}
从任意有限完备的斯坦纳三元系删去一点。取不同于 $a$ 和 $c=m(a)$ 的剩余点 $v$，令 $b,d$ 分别完成原装填中的 $av,cv$ 点对。五个标签 $a,b,v,d,c$ 两两不同。删去 $abv,vdc$ 并加入 $avc$ 后，仍是部分斯坦纳三元系，块数恰少一。未覆盖点对由原匹配中的 $ac$ 换成路径 $a,b,v,d,c$。新装填按包含关系极大，当且仅当 $d\ne m(b)$。
:::

::: proof
原匹配的边 $ac$ 尚未使用。新块也重新使用了两条随旧块删去的边 $av,cv$，所以保留点对唯一性。两块的其余四条边恰好构成所述路径。路径本身没有三角形，匹配中每点至多接一条边。任何三角形都要用路径的两条相邻边。路径两端 $a,c$ 已失去原来的匹配边，所以唯一可能是路径中间的 $b,v,d$，它恰在 $d=m(b)$ 时闭合。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-joint-circuit-steiner-matching-first-deficit title="一次换块实现最大值减一" lean="D5/S3/Combinatorics/Matroids/PointDeletedSteinerSwitch.matching_switch_first_deficit"}
沿用本节的跨行三元组及归一化条件。如果 $r$ 个标签上有一个未覆盖点对恰为完美匹配的装填，并且其中有一处满足上述极大性判据的换块，则最大的饱和扩充有
$$
N_{\max}=3^d r^2+3^{d+1}\frac{r(r-2)}{6}
$$
个新增同行三元组，$N_{\max}-1$ 也可以取得。所有保持所需归一化维数的扩充都不超过 $N_{\max}$。
:::

::: proof
每块在其三个点上各用去两个搭档。完美匹配留下每点一个搭档，因此 $r$ 为偶数，且其他装填每点至少也留下一个搭档。故原装填的 $r(r-2)/6$ 块达到上界。它在每个类内都是极大的，因为匹配没有三角形。每类使用原装填达到全局上界，把其中一类换成上述少一块的极大装填便取得 $N_{\max}-1$。完整证明由 Lean 内核检查。
:::

换块判据取决于原斯坦纳系。例如在 $\mathbb F_3^2$ 的仿射平面中删去原点，$m(a)=-a$，且 $b=-v-a$、$d=-v+a$。此时 $b+d=v\ne0$，因此换块达到极大。取 $r=8,d=1$，得到 $264$ 和 $263$ 两种饱和大小。对于法诺平面的二元向量表示，剩余两点满足 $b+d=p$，相同换块总会留下可补的三角形。 [局部极大装填谱](https://doi.org/10.1007/BF01388482)
