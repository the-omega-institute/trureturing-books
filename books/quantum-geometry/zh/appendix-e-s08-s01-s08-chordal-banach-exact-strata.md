# E.8.1.8 弦图 Banach 精确分层重构 {#sec-appe-chordal-banach-exact-strata}

给定棱上的增益，问题是能否用顶点势拟合所有棱，同时只用有序三角形上的缺陷控制误差。实标量的精确系数由最长回路决定。群值重构在路径幂上有三个不同档次，实 $L_1$ 和内积空间的界则取决于有限点集的包围半径。对于堆叠三树，还可以比较祖先规则与离线势的预算，并在加权阶梯图上衡量线性填补的额外成本。

设 $G$ 为 $V$ 上的简单图。除非另作说明，反对称性指所有有序点对均满足 $g(v,u)=-g(u,v)$。三角缺陷界指对每组三点 $a,b,c$，若 $ab,bc,ac$ 均为棱，则 $\|g(a,b)+g(b,c)-g(a,c)\|\le\varepsilon$。加法势 $p$ 的棱误差为 $\|g(a,b)-(p(b)-p(a))\|$，实标量情形使用绝对值。群值增益在棱上反向取逆，三角缺陷和棱误差分别为 $d(g(a,b)g(b,c),g(a,c))$ 与 $d(g(a,b),p(a)^{-1}p(b))$。双不变伪度量指左右乘法均为等距映射。

## E.8.1.8.1 标量周长、模约化与群值分层

::: {.theorem #thm-appe-chordal-exact-scalar-circumference title="标量周长系数的精确重构" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.scalar_circumference_exact"}
设 $G$ 是有限顶点集 $V$ 上的简单弦图，$L$ 是其最长简单回路的长度，且该长度确实取到。两项同时成立。

1. 对任意实值增益 $g$，若反对称性成立于 $G$ 的棱上，且每个有序三角形的缺陷绝对值至多为 $1$，则存在势，使每条有向棱的误差至多为 $1-2/L$。
2. 存在实值增益 $g$，使所有有序点对都满足 $g(b,a)=-g(a,b)$，所有有序三元组都满足 $|g(a,b)+g(b,c)-g(a,c)|\le1$。对每个势，都有一条有向棱的误差至少为 $1-2/L$。
:::

::: {.proof #pf-appe-chordal-exact-scalar-circumference}
把长度为 $\ell$ 的简单回路剖分成三角形，得增益和的绝对值至多为 $\ell-2$。给每条有向棱的权重加上 $1-2/L$，则简单回路和折返的权重都非负。分解重复顶点的闭游走，再用最短游走代价构造势。为取得下界，按最长回路去掉末棱后的次序给顶点排序，令增益为次序比较的符号。在该回路上，除末棱取 $-1$ 外，各棱都取 $1$，势差沿回路相消，故至少一条棱达到所需下界。完整证明由 Lean 内核检查。
:::

给定生成树 $T$，规范整数余链在树棱上为零，并给每条树外棱分配一个坐标。该棱从小顶点到大顶点的增益为相应基向量，反向取负。缺陷集含零和所有有序三角形的缺陷。称增益可用 $U$ 中的 $k$ 项重构，若存在势使每条有向棱的残差都能写成 $k$ 项之和，各项属于 $U$，允许重复。

::: {.theorem #thm-appe-chordal-exact-modulus title="有限模数决定阿贝尔重构" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.GainReduction.finite_modulus_decides_abelian_reconstruction"}
设 $V$ 有限且线性有序，$G$ 为简单弦图，$T$ 是 $G$ 的生成树。取自然数 $k,q$，使 $q>3k+1$。以下两项等价。

1. 将规范整数余链及其缺陷集逐坐标模 $q$ 约化，以约化后的缺陷集为许可项集，可用 $k$ 项重构该模余链。
2. 对任意与 $V$ 同一类型层级的加法交换群 $A$、任意 $g:V\times V\to A$ 与任意 $U\subseteq A$，若 $g$ 在棱上反对称且 $U$ 包含 $g$ 的缺陷集，则可用 $U$ 中的 $k$ 项重构 $g$。
:::

::: {.proof #pf-appe-chordal-exact-modulus}
把各棱的模残差选成短整数和，对相反方向取负。三角不闭合量逐坐标是 $q$ 的倍数，绝对值至多为 $3k+1$，因而为零。弦性保证这些棱方程可积分。对任意交换群值增益，先减去沿生成树积分得到的势差，再把每个余树棱基向量送到该棱的归一化增益。该同态把规范缺陷送入 $U$，同时保留短和。反向取规范模余链本身。完整证明由 Lean 内核检查。
:::

模数条件也可用三角形检验。取 $k=3$、$q=10$，沿三角形一圈让规范增益依次为 $1,0,0$。三个残差都取 $-3$，每个都由三个许可项 $-1$ 相加得到。增益减残差后的环和为 $10$，故这些棱差在模 $10$ 下可由势产生。每个残差在 $[-3,3]$ 中的整数代表元唯一，因而同一模势无法提升为满足这些短残差约束的整数势。

记 $P_n^k$ 为顶点集 $\mathrm{Fin}(n)$ 上的路径幂，下标不同且相差至多为 $k$ 时相邻。其统一群值系数要求 $C\ge0$，且对每个 $n$、每个双不变伪度量群和每个反向取逆、三角缺陷至多为 $1$ 的增益，存在势使每条棱误差至多为 $C$。

::: {.theorem #thm-appe-chordal-exact-group-path title="路径幂的群值精确分层" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.pathPower_group_exact_strata"}
设 $k\in\mathbb N$、$1\le k$ 且 $C\in\mathbb R$。$C$ 为路径 $k$ 次幂族的统一群值系数，当且仅当 $C\ge0$（$k=1$）、$C\ge1$（$k=2$）、$C\ge2$（$k\ge3$）。
:::

::: {.proof #pf-appe-chordal-exact-group-path}
沿相邻棱积分处理前两档。在宽度 $2$ 时，整数词度量中的非平坦三角形迫使误差至少为 $1$。宽度 $k\ge3$ 时，在 $9k$ 个顶点上取模 $9$ 的 $k-1$ 个循环因子。小于 $2$ 的拟合只允许单位词残差，各相位的长棱与两端点块迫使一个坐标和为零的位移向量每坐标都为正。区间图的统一上界给出 $2$。完整证明由 Lean 内核检查。
:::

对于固定的 $G$，可行群值系数同样要求 $C\ge0$，并把带单位三角缺陷界的势拟合要求施加于 $G$ 上的所有上述群值增益。目标群的类型层级与顶点类型相同。

::: {.theorem #thm-appe-chordal-exact-group-integral title="连通弦图的群系数整数性" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.group_coefficient_integral"}
设 $G$ 是有限线性有序顶点集上的连通简单弦图。存在 $k\in\mathbb N$ 且 $k\le4$，使对每个 $C\in\mathbb R$，$C$ 是 $G$ 的可行群值系数当且仅当 $k\le C$。
:::

::: {.proof #pf-appe-chordal-exact-group-integral}
把生成树棱规范化为单位元。以余树棱生成自由群，以规范余链的三角环量及其共轭为字母。弦图的闭游走分解保证这些字母生成自由群，所给双不变词度量的距离是整数。任意规范化的目标增益由该自由群余链经同态得到，三角界把每个字母送入单位球，因此同一个整数词长界可传到每个目标。自由群本身给出反向界，通用四缺陷上界把最小可行整数约束在 $4$ 以内。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-group-width-three title="宽度三循环阿贝尔见证" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.pathPower_width_three_cyclic_exact"}
若 14 ≤ n，在 ChordalPath49.cayleyMetric 实例下存在 g : Fin n → Fin n → ChordalPath49.M。它在 pathPower n 3 的棱上满足反向取逆，每个有序三角形的群距缺陷至多为 1，存在势使每条棱误差至多为 2，并且任意势都有一条棱误差至少为 2。
:::

::: {.proof #pf-appe-chordal-exact-group-width-three}
目标是阶 $49$ 的循环群，取指定 Cayley 词度量。正向相邻棱增益为零，故小于 $2$ 的拟合要求相邻势增量落在单位词球。按三周期增益逐步检查末两个增量，到第 $14$ 个顶点时已无可延伸的状态。路径三次幂是团大小至多为 $4$ 的弦图，由团四上界得到匹配的势。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-group-split-four title="八点分裂图的团四群值见证" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.split_clique_four_group_witness"}
在 ChordalEightVertex.cayleyMetric 实例下，八点图是弦图，所有团的基数至多为 4，且存在团 A 使 Aᶜ 为独立集。其指定阿贝尔增益的每个有序三角形缺陷至多为 1，存在势使每条棱群距误差至多为 2，并且任意势都有一条棱误差至少为 2。
:::

::: {.proof #pf-appe-chordal-exact-group-split-four}
在一个 $4$ 点团的每个三角面上附一个新顶点，取 $11$ 个阶 $8$ 的循环因子上的指定 Cayley 增益。将一个中心团顶点的势平移到零。误差严格小于 $2$ 时，中心团势的差只能取有限词球中的值。逐一检查这些状态，没有一个可以延拓到全部 $4$ 个外点。分裂图势构造给出误差至多为 $2$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-group-subtwo title="两个有限阿贝尔见证排除严格小于二" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.not_subtwo_finite_group"}
令 subtwo_finite_group_claim 表示源文件定义的命题，即指定的循环路径见证或八点分裂图见证存在误差严格小于 2 的拟合势。则该命题不成立。
:::

::: {.proof #pf-appe-chordal-exact-group-subtwo}
循环词见证和八点残差见证分别排除两个析取项。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-group-clique-four title="团数四的群值上界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_clique_four_group_gain_potential"}
设 $G$ 是有限简单弦图，每个团至多有 $4$ 个顶点。设 $H$ 为双不变伪度量群，$g:V\times V\to H$ 在棱上反向取逆，且三角缺陷至多为 $\varepsilon\ge0$。则存在势 $p:V\to H$，使每条有向棱的误差至多为 $2\varepsilon$。
:::

::: {.proof #pf-appe-chordal-exact-group-clique-four}
团四的代数因子分解把每条残差写成至多两个三角缺陷的乘积。双不变性把词长界转成距离界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-group-clique-five title="团数五的群值上界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_clique_five_group_gain_potential"}
设 $G$ 是有限简单弦图，每个团至多有 $5$ 个顶点。设 $H$ 为双不变伪度量群，$g:V\times V\to H$ 在棱上反向取逆，且三角缺陷至多为 $\varepsilon\ge0$。则存在势 $p:V\to H$，使每条有向棱的误差至多为 $3\varepsilon$。
:::

::: {.proof #pf-appe-chordal-exact-group-clique-five}
团五的因子分解至多使用三个三角缺陷，得到 3 ε。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-group-clique-number title="任意团数的群值界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_clique_number_group_gain_potential"}
设 $G$ 是有限简单弦图，每个团至多有 $k\in\mathbb N$ 个顶点。设 $H$ 为双不变伪度量群，$g:V\times V\to H$ 在棱上反向取逆，且三角缺陷至多为 $\varepsilon\ge0$。则存在势 $p:V\to H$，使每条有向棱的误差至多为 $(k-1)\varepsilon$，其中 $k-1$ 按自然数减法截断到零，再转换为实数。
:::

::: {.proof #pf-appe-chordal-exact-group-clique-number}
当 $k\le2$ 时，图中没有三角形，沿森林积分即可精确拟合。团四构造控制 $3\le k\le4$，一般的四缺陷上界控制 $k\ge5$。在这两段上，分别有 $2\le k-1$ 和 $4\le k-1$，故得到所需界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-group-walk-factors title="闭游走的三角因子分解" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.closed_walk_triangle_factors"}
设 $V$ 有限，$G$ 为简单弦图，$H$ 为群，$g:V\times V\to H$ 在棱上反向取逆。每条从一个顶点回到自身的闭游走 $p$ 都有一个 $H$ 中的有序因子列表。列表长度至多为 $p$ 的长度减 $2$（自然数减法截断到零），有序乘积等于 $p$ 沿途增益的有序乘积。每个因子都形如 $qg(a,b)g(b,c)g(c,a)q^{-1}$，其中 $q\in H$，且 $ab,bc,ca$ 均为棱。
:::

::: {.proof #pf-appe-chordal-exact-group-walk-factors}
把闭游走的起点移到其支撑诱导子图中的单纯顶点。若该处折返就删除折返，否则用邻点之间的棱切下一块三角形。对缩短的游走归纳，然后共轭回原起点。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-tree-spanner title="树形伸展近似界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_tree_spanner_approximate_gain_potential"}
设 $G$ 是有限简单弦图，$T$ 是其生成树，且每条 $G$ 棱的两端在 $T$ 中的距离至多为 $t\in\mathbb N$。设 $H$ 为双不变伪度量群，$g:V\times V\to H$ 在棱上反向取逆，且三角缺陷至多为 $\varepsilon\ge0$。则存在势 $p:V\to H$，使每条有向棱的误差至多为 $((t:\mathbb R)-1)\varepsilon$。
:::

::: {.proof #pf-appe-chordal-exact-tree-spanner}
沿树路径积分时，每条 G 棱至多累积 t − 1 个三角缺陷。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-radius title="半径近似界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_radius_approximate_gain_potential"}
设 $G$ 是有限连通简单弦图，$o\in V$ 且每个顶点到 $o$ 的图距离至多为 $r\in\mathbb N$。设 $H$ 为双不变伪度量群，$g:V\times V\to H$ 在棱上反向取逆，且三角缺陷至多为 $\varepsilon\ge0$。则存在势 $p:V\to H$，使每条有向棱的误差至多为 $(2r-1)\varepsilon$，其中减法在实数中进行。
:::

::: {.proof #pf-appe-chordal-exact-radius}
根到两端的路径长度总和至多为 2 r，树路径估计给出 (2 r − 1) ε。完整证明由 Lean 内核检查。
:::

## E.8.1.8.2 祖先、闭式递推与 Hilbert 界

::: {.theorem #thm-appe-chordal-exact-ancestor title="根树有界祖先边的 Banach 势" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsTree.exists_ancestor_banach_gain_potential"}
设 $S$ 为顶点集 $V$ 上的树，选根，取正整数 $k$。在祖先图中，两点相邻当且仅当其中一点是另一点的严格祖先，且树距离至多为 $k$。设 $E$ 是实半赋范空间，$g:V\times V\to E$ 全域反对称，且在祖先图上的三角缺陷至多为 $\varepsilon\ge0$。则存在势 $p:V\to E$，使祖先图每条有向棱的误差至多为 $(2-2/k)\varepsilon$。
:::

::: {.proof #pf-appe-chordal-exact-ancestor}
对模 $k$ 的每个深度余数，在标记祖先链上积分，再延伸到给定顶点。祖先棱两端深度相差至多为 $k$，故比较两条积分路径时至多需为各端点计一个三角缺陷。若端点已标记便无须为该端点计缺陷。每个端点恰在一个余数类中被标记，平均这 $k$ 个势即得 $2-2/k$。完整证明由 Lean 内核检查。
:::

对保留族从 $m$ 点团起步。在每一代的每个袋中，对每对顶点各附一个含该对顶点和 $n$ 个新顶点的团，迭代 $D$ 代。对于图 $G$ 和实半赋范空间 $E$，记 $U(G,E,C)$ 为下述性质。每个全域反对称、三角缺陷至多为 $1$ 的 $E$ 值增益都能由势拟合，逐棱误差至多为 $C$。

::: {.theorem #thm-appe-chordal-exact-pair-retention title="任意深度的对保留精确系数" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.PairRetention.family_exact"}
设 $m,n,D\in\mathbb N$ 且 $3\le m$。对任意非零实赋范空间 $E$ 和任意 $C\in\mathbb R$，$U(G,E,C)$ 成立当且仅当 $1-2/(m(n+1)^D)\le C$，其中 $G$ 为上文的对保留图。
:::

::: {.proof #pf-appe-chordal-exact-pair-retention}
完全图根层给出 1 − 2 / m，扩展递推和指数长度回路给出上下界，组合后得到所示等式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-doubled-radius title="路径幂系数支配双倍半径" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.powerPath_uniform_ge_doubled_radius"}
设 $E$ 为实半赋范空间，$k$ 为正整数，$C,r\in\mathbb R$，$0\le C$，且每个 $n\in\mathbb N$ 都满足 $U(P_n^k,E,C)$。设 $x:\mathrm{Fin}(k)\to E$，且任意 $a,b$ 都满足 $\|x_a-x_b\|\le1$。若每个 $y\in E$ 都有某个 $a$ 满足 $r\le\|2x_a-y\|$，则 $r\le C$。
:::

::: {.proof #pf-appe-chordal-exact-doubled-radius}
先平移点族使一个点在原点。在每个相位上，短的正向棱取起始相位的向量，长度为 $k$ 的棱取该向量的两倍。三角缺陷由直径界控制。沿各相位求和势增量，并用首末行的短棱比较各相位，可将所有加倍点包入半径至多 $C+2C/M$ 的球，其中 $M$ 是完整相位循环数。趋于无穷的 $M$ 消去端点修正。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-hilbert-jung title="Hilbert 团 Jung 上界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_hilbert_jung_gain_potential"}
设 $V$ 有限且 $G$ 弦，$k\in\mathbb N$、$1\le k$，每个团的基数至多为 $k+1$。设 $E$ 是实内积空间，$g:V\times V\to E$ 全域反对称，三角缺陷至多为 $\varepsilon\ge0$。则存在势 $\phi:V\to E$，使每条有向棱的误差至多为 $\dfrac{J_k}{1-J_k}\varepsilon$，其中 $J_k=\sqrt{(k-1)/(2k)}$。
:::

::: {.proof #pf-appe-chordal-exact-hilbert-jung}
按反向完美消去序插点，至多得到 $k$ 个候选势值。旧棱拟合误差至多为 $R$ 时，候选值的直径至多为 $R+\varepsilon$。有限内积空间 Jung 界给出半径 $J_k(R+\varepsilon)$。取 $R=J_k\varepsilon/(1-J_k)$ 保持误差界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-hilbert-simplex title="Hilbert 路径幂正则单纯形下界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.hilbert_powerPath_uniform_lower"}
设 $k$ 为正整数，$C\ge0$。若对每个 $n\in\mathbb N$ 均有 $U(P_n^k,\mathbb R^k,C)$，其中 $\mathbb R^k$ 取欧氏范数，则 $\sqrt{2-2/k}\le C$。
:::

::: {.proof #pf-appe-chordal-exact-hilbert-simplex}
取 $\mathbb R^k$ 中缩放后的坐标单位向量组成单位直径正则单纯形。加倍后的顶点到任意中心的平方距离均值等于 $2-2/k$ 加上中心到重心的平方距离。因而最远顶点的距离至少为 $\sqrt{2-2/k}$。应用双倍半径界。完整证明由 Lean 内核检查。
:::

## E.8.1.8.3 实 $L_1$、分隔集与路径见证

::: {.theorem #thm-appe-chordal-exact-l1-jung title="实 $L_1$ 团 Jung 上界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_l1_jung_gain_potential"}
设 $G$ 是有限简单弦图，$m\in\mathbb N$、$1\le m$，每个团的基数至多为 $2m+2$。对任意测度空间 $(\Omega,\mu)$，设实 $L_1(\mu)$ 值增益 $g$ 全域反对称，且三角缺陷至多为 $\varepsilon\ge0$。则存在势使每条有向棱的误差至多为 $(2m-1)\varepsilon$。
:::

::: {.proof #pf-appe-chordal-exact-l1-jung}
有限奇数族的 $L_1$ 中心半径为 1 − 1 / (2 m)，代入有限中心公式得到 2 m − 1。完整证明由 Lean 内核检查。
:::

取 $m=1$ 得到系数上界 $1$（团大小至多为 $4$）。取 $m=2$ 得到系数上界 $3$（团大小至多为 $6$）。

::: {.theorem #thm-appe-chordal-exact-l1-clique-four title="团四的实 $L_1$ 精确系数" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.l1_clique_four_exact"}
设 $(\Omega,\mu)$ 为测度空间，且实 $L_1(\mu)$ 非零。设 $C\in\mathbb R$。对每个 $n\in\mathbb N$、每个 $\mathrm{Fin}(n+1)$ 上的简单弦图 $G$，若每个团至多有 $4$ 个顶点，则 $U(G,L_1(\mu),C)$。这一断言成立当且仅当 $1\le C$。
:::

::: {.proof #pf-appe-chordal-exact-l1-clique-four}
团四的 Jung 上界为 1，弦扇极限给出下界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-l1-uniform-jung title="实 L₁ 的统一 Jung 精确半径" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.ChordalL1.l1_uniform_jung_exact"}
设 m,k ∈ ℕ、0 < m 且 2 m ≤ k ≤ 2 m + 1。对 C ∈ ℝ，以下两项等价。对任意 Ω : Type 及其 MeasurableSpace、任意 Measure μ 与任意 Lp ℝ 1 μ 的 Finset s，若 s.card ≤ k 且任意两点距离至多为 1，则存在 c : Lp ℝ 1 μ 使所有点到 c 的距离至多为 C。另一项为
$$
1-\frac{1}{2(m:\mathbb R)}\le C.
$$
:::

::: {.proof #pf-appe-chordal-exact-l1-uniform-jung}
平衡切坐标的计数测度族给出下界，奇数族中心定理给出上界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-l1-even-path title="偶数宽度的实 L₁ 路径幂精确系数" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.l1_even_powerPath_exact"}
设 $m$ 是正整数，$C\in\mathbb R$。令 $E$ 为在 $2m$ 个标签的全体排列上取 $\ell_1$ 范数的实坐标空间。则 $C\ge0$ 且对每个 $n\in\mathbb N$ 均有 $U(P_n^{2m},E,C)$，当且仅当 $2-2/(2m)\le C$。
:::

::: {.proof #pf-appe-chordal-exact-l1-even-path}
平衡切族给出双倍半径下界，Banach 路径幂上界给出反向蕴含。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-l1-path104 title="104 点路径四次幂的三维实 $L_1$ 下界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.path104_l1_three_lower"}
若 $U(P_{104}^4,\ell_1^3,C)$，其中目标为带 $\ell_1$ 范数的三维实空间，则 $75/53\le C$ 且 $\sqrt2<75/53$。
:::

::: {.proof #pf-appe-chordal-exact-l1-path104}
四个坐标绝对值为 $1/4$ 的四面体符号向量在 $\ell_1^3$ 中直径为 $1$。加倍后，每个坐标上各有两个正值和两个负值，所以到任意中心的平均距离至少为 $3/2$。取 $4$ 个相位、$25$ 步，相位末端比较把该平均值界为 $C(1+(2/25)(3/4))=53C/50$，解得 $C\ge75/53$，平方比较给出 $75/53>\sqrt2$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-group-separator title="团树分隔集的群值界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.CliqueTreeGroupSeparator.cliqueTree_separator_group_potential"}
设 V 有限，T、G、K 构成 IsCliqueTree T G K，且相邻袋交非空、基数至多为 s。设 H 带有 Group、PseudoMetricSpace H、IsIsometricSMul H H 与 IsIsometricSMul Hᵐᵒᵖ H 实例。若 g 在 G 棱上反向取逆、δ ≥ 0 且三角缺陷至多为 δ，则存在势使每条棱误差至多为 (max 1 s : ℕ) δ。
:::

::: {.proof #pf-appe-chordal-exact-group-separator}
以每袋最早出现的顶点为锚，在顶点首次出现时固定其势。比较一条棱的两端时，每次计入误差的换锚都消耗首个相关分隔集中的一个不同旧顶点。至多有 $s-1$ 次这种换锚，闭合该棱再计一次三角缺陷。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-l1-separator title="分隔集大小二至五的 L₁ 界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.CliqueTreeL1Separator.cliqueTree_l1_separator_potential"}
设 $G$ 有有限顶点集，团树 $T$ 有有限袋指标集。设 $q\in\{2,3,4,5\}$，且每对相邻袋的交集基数至多为 $q$。对任意测度空间上的实 $L_1$ 值反对称增益 $g$，若三角缺陷至多为 $\varepsilon\ge0$，则存在势使每条有向棱的误差至多为 $c(q)\varepsilon$，其中 $c(2)=1$、$c(3)=5/3$、$c(4)=3$、$c(5)=25/7$。
:::

::: {.proof #pf-appe-chordal-exact-l1-separator}
给新顶点选择的势是分隔集候选值均值与 Jung 中心的凸组合。分隔集大小为 $3$ 或 $5$ 时调节权重以平衡新旧棱与新点之间的棱的误差。空分隔集可独立开始新团，运行交性质保证延拓后的势一致。完整证明由 Lean 内核检查。
:::

## E.8.1.8.4 Banach 团树、滚动团与线性填补

::: {.theorem #thm-appe-chordal-exact-clique-tree-height title="有限高度 Banach 团树闭式" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.cliqueTree_height_banach_gain_potential"}
设 V、I 有限，T、G、K 构成 IsCliqueTree T G K，相邻袋交非空且基数至多为 q，2 ≤ q，根 r 到每个袋指标的距离至多为 h。若 E 带有 SeminormedAddCommGroup 与 NormedSpace ℝ E 实例，g 反对称、ε ≥ 0 且三角缺陷至多为 ε，则存在势使每条棱误差至多为
$$
\left((q:\mathbb R)-1-((q:\mathbb R)-2)\left(\frac{(q:\mathbb R)-1}{q}\right)^h\right)\varepsilon.
$$
:::

::: {.proof #pf-appe-chordal-exact-clique-tree-height}
团树直径至多为 2 h，把 h 代入闭式半径递推即得该表达式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-clique-tree-two title="混合分隔规则下的 Banach 界二" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.CliqueTreeBanachOverlap.cliqueTree_banach_two"}
设 $G$ 有有限顶点集和有限团树，根袋为 $r$。对每个非根袋，令 $S$ 为它与父袋的交集，令 $U$ 为父袋与祖父袋的交集（父袋为根时取空集）。要求至少一项成立。

- 父袋是根袋。
- $|S|\le3$。
- $4\le|S|\le6$ 且 $|U|\le2$。
- $4\le|S|\le5$ 且 $|S\cap U|\le1$。

设 $E$ 为实半赋范空间，$g$ 为全域反对称的 $E$ 值增益，三角缺陷至多为 $\varepsilon\ge0$。则存在势使每条有向棱的误差至多为 $2\varepsilon$。
:::

::: {.proof #pf-appe-chordal-exact-clique-tree-two}
根层使用允许的分隔规则，后续层沿树递推，所有混合分隔情形合并为二倍缺陷。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-rolling-potential title="跨度一滚动团的势界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.RollingCliques.SpanOne.exists_potential"}
设 M,n,k ∈ ℕ 且 2 ≤ M。在 Omega.RollingCliques.SpanOne 的图上，若 E 带有 SeminormedAddCommGroup 与 NormedSpace ℝ E 实例，g 反对称、ε ≥ 0，且每个图三角形缺陷至多为 ε，则存在势 φ，使每条棱误差至多为
$$
\left(2-\frac{2}{(M:\mathbb R)^2}\right)\varepsilon.
$$
:::

::: {.proof #pf-appe-chordal-exact-rolling-potential}
每条跨块棱都连接一个父块和其直接子块。势沿历史递推，并在跨块时对父块的 $M^2$ 个保留标签取平均。块内棱误差至多为一个三角缺陷。跨块棱的平均中有一个零项，其余每项至多计入两个三角缺陷。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-rolling-l1 title="偶数标签的滚动团 L₁ 精确系数" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.RollingCliques.SpanOne.uniform_l1_exact"}
设 $M\ge2$ 为偶数，$C\in\mathbb R$。令 $E$ 为在 $M^2$ 个标签的全体排列上取 $\ell_1$ 范数的实坐标空间。对任意深度与复制参数的跨度一滚动团图 $G$，$U(G,E,C)$ 均成立，当且仅当 $2-2/M^2\le C$。
:::

::: {.proof #pf-appe-chordal-exact-rolling-l1}
上一条定理给出上界。为证下界，在完整历史链上用 $M^2$ 个保留标签的平衡切构造。首末增益各取一个样本，内部相邻层增益取两个样本之和，使每个三角缺陷化为块内差。沿共享端点的各条路径望远镜求和，再令深度增长，消去端点误差。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-stacked-orders title="堆叠三树的总序曲率层" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.StackedTriangleCurvature.Build.total_order_curvature_stratum"}
设 $n\in\mathbb N$，$b$ 为从一个三角形开始、经 $n$ 次沿三角面添点的堆叠构造。下列三项同时成立。

1. 全域反对称实增益所给出的、每个面坐标绝对值至多为 $1$ 的曲率向量恰为总序曲率向量的凸包。总序由从顶点集到 $\mathbb R$ 的单射 $r$ 表示。
2. 构造 $b$ 的有效曲率多面体的极点数恰为 $2\cdot3^n$。以总顶点数 $N=n+3$ 表示即为 $2\cdot3^{N-3}$。
3. 对每个边增益数组 $z$，若在每个顶点 $u$ 处均有 $\sum_v z(u,v)=0$，则存在一个这样的单射 $r$，使三角填补范数等于 $z$ 与总序增益的配对，且任意其他单射 $s$ 的配对都至多为此值。
:::

::: {.proof #pf-appe-chordal-exact-stacked-orders}
每次在面上添顶点会产生 $3$ 个新面，按一致定向其曲率之和为母面的曲率。在固定母面读数的截片上，线性目标在最小与最大权重上分别取 $-1$ 和 $1$。每个旧极点恰有 $3$ 种极点延拓，分别由把新顶点插入母面的顶点顺序产生。根面贡献 $2$ 个初始极点。把面链的 $\ell_1$ 范数对边界映射的核取商，得到填补范数，其对偶测试正是这些有界曲率。完整证明由 Lean 内核检查。
:::

单拷贝历史上的祖先可行性要求给每个顶点 $v$ 选一条实棱链，其边界为 $v$ 减根，且仅支撑在 $v$ 的祖先历史所含的棱上。对于每条有向棱，棱链与两端的链修正构成闭链，其三角填补对偶范数不得超过预算。堆叠上的 Banach 可行性量化于所有实 Banach 空间和所有全域反对称、三角缺陷至多为 $1$ 的增益，要求存在逐棱误差不超过预算的势。

::: {.theorem #thm-appe-chordal-exact-causal-limit title="Banach 与祖先因果预算的极限等价" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.PureThreeTree.banach_causal_limit_for_build"}
设 $R\in\mathbb R$ 且 $R\ge0$。以下两项等价。

1. 对每个 $m\in\mathbb N$、每个经 $m$ 次添点得到的堆叠 $b$、每个 $\varepsilon>0$，$b$ 的 Banach 重构在预算 $R+\varepsilon$ 下可行，目标类型量化于基础类型层级。
2. 对每个 $n\in\mathbb N$ 和每个 $\varepsilon>0$，深度 $n$ 的单拷贝祖先重构在预算 $R+\varepsilon$ 下可行。
:::

::: {.proof #pf-appe-chordal-exact-causal-limit}
复制历史图本身具有有限堆叠表示，故逐堆叠的预算控制复制图。将离线链规则对副本置换平均，并把各顶点的链限制到自己的祖先历史，得到随副本数增加而趋零的误差修正。正松弛可以分配给原预算和该修正。反向把祖先规则复制到历史图，并沿保持边与三角缺陷的收缩传回任意堆叠。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-banach-to-causal title="复制因子下的 Banach 到因果转移" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.PureThreeTree.banach_to_causal"}
设 $n,k\in\mathbb N$，$k>0$，且 $R,\varepsilon\in\mathbb R$ 满足 $R\ge0$、$\varepsilon>0$。若深度 $n$、每步 $k+1$ 个副本的历史图在预算 $R$ 下对基础类型层级的实 Banach 目标统一可行，则深度 $n$ 的单拷贝祖先重构在预算 $(R+\varepsilon)+2(R+\varepsilon)/k$ 下可行。
:::

::: {.proof #pf-appe-chordal-exact-banach-to-causal}
在正松弛 $R+\varepsilon$ 下，把 Banach 预算转换为离线的边链规则。对副本置换取平均，再把每个顶点的链收缩到自身的历史路径。多固定一次副本选择，成对收缩的差异就衰减一个因子。求和给出附加误差 $2(R+\varepsilon)/k$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-chordal-exact-causal-to-banach title="祖先因果到每个堆叠三树的转移" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.PureThreeTree.banach_of_causal_for_build"}
设 $b$ 为经 $m$ 次添点得到的有限堆叠。若深度 $m$ 的单拷贝祖先重构在预算 $R$ 下可行，那么对任意实 Banach 空间 $E$ 及任意全域反对称、三角缺陷至多为 $1$ 的 $b$ 上的 $E$ 值增益，存在势 $p$ 使每条有向棱的误差至多为 $R$。
:::

::: {.proof #pf-appe-chordal-exact-causal-to-banach}
给每个新顶点一个新的副本编号及一个保留其附着三角形的历史。得到的堆叠像对历史前缀封闭。单纯收缩使拉回增益的三角缺陷仍满足原界，复制过来的祖先规则便在原堆叠上给出所需势。完整证明由 Lean 内核检查。
:::

对加权五标签二进制阶梯图，共同包络 $c$ 为三角填补坐标提供逐坐标容量。每个许可需求都须有一个合法填补，其棱边界等于对应的道流，且每个坐标的绝对值受同一个 $c$ 控制。线性包络还要求所有这些填补由需求空间上的同一个实线性映射给出。

::: {.theorem #thm-appe-chordal-exact-envelope title="加权二进制阶梯五树的线性填补间隙" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.FiveLaneRouting.BinaryStaircase.exact_graph_envelope_costs"}
在该加权五树上，存在共同包络使总成本等于 $16/15$，每个共同包络的总成本都至少为 $16/15$。存在共同线性包络使总成本等于 $32/25$，每个共同线性包络的总成本都至少为 $32/25$。
:::

::: {.proof #pf-appe-chordal-exact-envelope}
把旧面与新面的填补坐标投影到每个端盖和台阶侧面的成对输运。五标签的无约束输运需要总容量 $10/3$，线性输运的散度恒等式取迹后要求总容量至少为 $4$。将两种最优容量经三角带提升回图上，按加权成本求和得到 $16/15$ 和 $32/25$。完整证明由 Lean 内核检查。
:::

## E.8.1.8.5 冻结边界

subtwo_cyclic_path_claim 与 subtwo_finite_group_claim 是源文件中的谓词定义。冻结定理 not_subtwo_finite_group 证明后者不成立。80 点团五群见证、滚动树的严格分支 Banach 反例、带符号星的严格小于 2 上界、团大小上限从 $5$ 到 $10$ 的 Hilbert 与 $L_1$ 界反转，以及 $\mathrm{SU}(2)$ 的 $689/200$ 改进，均放在 Lean 验证定理框之外。

本页对应 trureturing PR #35073 合并成果中的冻结 ChordalBanachExactStrata 声明。书中只引用 34 个公共定理锚点，开放问题仍保持开放状态。
