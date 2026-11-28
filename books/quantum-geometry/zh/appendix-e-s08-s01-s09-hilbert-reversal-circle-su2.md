# E.8.1.9 弦图重构中的 Hilbert 与实 $L_1$ 次序反转、圆周系数和 $\mathrm{SU}(2)$ 界 {#sec-appe-hilbert-reversal-circle-su2}

三角缺陷同样大时，改变增益的目标空间会怎样改变重构误差？团大小至多为 $4$ 时，实 $L_1$ 的统一系数小于实内积空间的系数；团大小放宽到 $5$ 时，这个次序反转。对于路径幂，若棱增益落在一个固定圆周子群上，即使允许势取遍整个单位四元数群，最优统一系数仍恰为 $1$。去掉圆周条件后，宽度 $4$ 的路径幂族给出圆度量下的下界 $\sqrt{3/2}$。弦图的分层构造则从球冠半径得到上界。

## E.8.1.9.1 欧氏投影与内积空间的团数界

记 $\mathbb R^d$ 为带欧氏范数的实坐标空间。对简单图 $G$ 上取值于实赋范空间 $E$ 的增益 $g:V\times V\to E$，加法三角缺陷是 $\|g(a,b)+g(b,c)-g(a,c)\|$，其中 $ab,bc,ac$ 都是棱。势 $p:V\to E$ 在有向棱 $ab$ 上的误差是 $\|g(a,b)-(p(b)-p(a))\|$。下文的统一界同时约束每条有向棱。

令 $n=\lvert V\rvert$。定义 $\alpha_n=(n-2)/n$（$n\ge3$），其余情形取 $\alpha_n=1$。比值中的减法与除法在实数中进行。

::: {.theorem #thm-appe-hilbert-reversal-plane title="欧氏平面的有限阶重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_euclideanPlane_gain_potential"}
设 $V$ 带有有限枚举（Fintype），$G$ 是 $V$ 上的简单弦图，$g:V\times V\to\mathbb R^2$，$\delta\in\mathbb R$ 且 $\delta\ge0$。若对每条棱 $ab$ 有 $g(b,a)=-g(a,b)$，且每个有序三角形的加法缺陷至多为 $\delta$，则存在势 $p:V\to\mathbb R^2$，使每条有向棱的误差至多为 $\alpha_n(4/\pi)\delta$。
:::

::: {.proof #pf-appe-hilbert-reversal-plane}
把增益投影到各标量方向。对长度为 $\ell$ 的简单圈，三角剖分给出 $\ell-2$ 个缺陷，故 $n\ge3$ 时每条圈棱只需分摊至多 $\alpha_n$ 倍的投影缺陷预算。将这一预算加到有向棱权上，闭游走的总权便非负，最短游走权给出标量势。去掉非负闭子游走后只需对有限条路径取最小值，所以标量势随投影方向连续。按旋转不变的高斯测度积分这些势，二阶矩恢复向量增益，径向矩与绝对坐标矩给出 $4/\pi$。顶点少于 $3$ 时可以沿棱精确积分。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-hilbert-reversal-space-three title="三维欧氏空间的有限阶重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_euclideanSpaceThree_gain_potential"}
设 $V$ 带有有限枚举（Fintype），$G$ 是 $V$ 上的简单弦图，$g:V\times V\to\mathbb R^3$，$\delta\in\mathbb R$ 且 $\delta\ge0$。若对每条棱 $ab$ 有 $g(b,a)=-g(a,b)$，且每个有序三角形的加法缺陷至多为 $\delta$，则存在势 $p:V\to\mathbb R^3$，使每条有向棱的误差至多为 $\alpha_n(3/2)\delta$。
:::

::: {.proof #pf-appe-hilbert-reversal-space-three}
各方向的标量最短游走势仍由圈长因子 $\alpha_n$ 控制。对三维高斯方向取平均，按坐标二阶矩归一化，使投影积分恢复原向量。径向矩与绝对坐标矩在此维数给出 $3/2$。顶点少于 $3$ 时，势可精确拟合全部棱。完整证明由 Lean 内核检查。
:::

若改用任意实内积空间，内积恒等式仍可控制一小组候选势值。按反向单纯消去序插入顶点时，先前插入的邻点成团。每个旧邻点 $i$ 为新顶点 $a$ 提供候选值 $p(i)+g(i,a)$。需要同时控制新棱的误差和旧棱、新棱共同构成的团的平方残差和，才能把同一个估计传到下一步。

::: {.theorem #thm-appe-hilbert-reversal-four-upper title="团大小至多为四的内积空间重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_cliqueFour_hilbert_gain_potential"}
设 $V$ 为有限类型（Finite），$G$ 是 $V$ 上的简单弦图，每个有限顶点团至多有 $4$ 个元素。设 $E$ 是带实内积的赋范加法交换群，$g:V\times V\to E$ 满足对所有 $a,b\in V$ 都有 $g(b,a)=-g(a,b)$。若 $\delta\in\mathbb R$、$\delta\ge0$，且每个有序三角形的加法缺陷至多为 $\delta$，则存在势 $p:V\to E$，使每条有向棱的误差至多为 $(259/200)\delta$。
:::

::: {.proof #pf-appe-hilbert-reversal-four-upper}
正缺陷预算先缩放到 $1$。至多有 $3$ 个旧邻点，把旧棱残差与三角缺陷按相反的均值居中，得到候选值差的平方和。用最小包围球接触点的凸权重估计方差，必要时利用一条较短的候选值连线。分段多项式不等式保证以包围球中心插入时，新棱误差至多为 $259/200$，新三角形的平方残差和至多为 $23/5$。归纳后缩放回原预算。预算为 $0$ 时，弦图的精确积分给出势。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-hilbert-reversal-four-single title="团大小至多为四的单区间重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_cliqueFour_hilbert_gain_potential_zeroSplit"}
设 $V$ 为有限类型（Finite），$G$ 是 $V$ 上的简单弦图，每个有限顶点团至多有 $4$ 个元素。设 $E$ 是带实内积的赋范加法交换群，$g:V\times V\to E$ 满足对所有 $a,b\in V$ 都有 $g(b,a)=-g(a,b)$。若 $\delta\in\mathbb R$、$\delta\ge0$，且每个有序三角形的加法缺陷至多为 $\delta$，则存在势 $p:V\to E$，使每条有向棱的误差至多为 $(13/10)\delta$。
:::

::: {.proof #pf-appe-hilbert-reversal-four-single}
把正预算缩放到 $1$，改用三角形平方残差和的上界 $93/20$。候选值包围球估计中的多项式可写成平方缺陷及其补量的幂乘积的非负线性组合，因而可在整个单位区间上验证插入界 $13/10$。归纳后缩放回原预算。预算为 $0$ 时用精确积分。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-hilbert-reversal-five-upper title="团大小至多为五的内积空间重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_cliqueFive_hilbert_gain_potential"}
设 $V$ 为有限类型（Finite），$G$ 是 $V$ 上的简单弦图，每个有限顶点团至多有 $5$ 个元素。设 $E$ 是带实内积的赋范加法交换群，$g:V\times V\to E$ 满足对所有 $a,b\in V$ 都有 $g(b,a)=-g(a,b)$。若 $\delta\in\mathbb R$、$\delta\ge0$，且每个有序三角形的加法缺陷至多为 $\delta$，则存在势 $p:V\to E$，使每条有向棱的误差至多为 $\sqrt{10275/4576}\,\delta$。
:::

::: {.proof #pf-appe-hilbert-reversal-five-upper}
把正预算缩放到 $1$，同时维持三角形与四点团的平方残差和上界 $329/50$ 与 $621/50$。有 $4$ 个旧邻点时，旧棱残差的环流分量的平方和等于各面的有向环和的平方和的 $1/4$。去掉这个环流分量以控制候选值差，再由接触点的加权方差估计包围半径。用旧面能量、新面的距离估计和球内候选值的半径余量验证两个不变量，得到所需的插入界。归纳后缩放回原预算。预算为 $0$ 时用精确积分。完整证明由 Lean 内核检查。
:::

## E.8.1.9.2 统一系数的次序反转

沿用 [@thm-appe-chordal-exact-pair-retention] 前的记号 $U(G,E,C)$，即对每个在所有有序点对上反对称、三角缺陷至多为 $1$ 的增益，都存在势使每条有向棱的误差至多为 $C$。以下统一上界都要求 $C\ge0$，并量化任意 $n\in\mathbb N$ 和 $\mathrm{Fin}(n)$ 上每个团大小至多为 $k$ 的简单弦图 $G$。对每个这样的 $G$，它们要求 $U(G,E,C)$ 对相应类别的每个目标类型 $E$ 成立。

- $\mathcal H_k$ 是对所有带实内积的赋范加法交换群成立的上界集合，$H_k=\inf\mathcal H_k$。
- $\mathcal F_k$ 是对所有有限实坐标 $\ell_1$ 空间成立的上界集合。坐标类型 $I$ 带有有限枚举（Fintype），目标为 $I$ 上带 $\ell_1$ 范数的实函数空间。
- $\mathcal L_k$ 是对所有实 $L_1(\mu)$ 成立的上界集合。$\Omega$ 可为任意带可测结构的类型，$\mu$ 为其上任意测度。
- $\mathcal B_k$ 是对所有实 Banach 空间成立的上界集合，目标带有赋范加法交换群、实赋范空间及完备性结构。

记 $B_4$ 为 [@thm-appe-three-tree-clique-four-bracket] 中的 Banach 系数。其定义对带有限枚举的任意顶点类型上的简单弦图、大小至多为 $4$ 的团和所有实 Banach 目标取统一上界的下确界，增益同样全局反对称且三角缺陷至多为 $1$。

::: {.theorem #thm-appe-hilbert-reversal-four-separation title="团大小至多为四时的系数分离" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.hilbert_cliqueFour_phase_separation"}
有 $1<2/\sqrt3\le H_4\le259/200<4/3\le B_4$。
:::

::: {.proof #pf-appe-hilbert-reversal-four-separation}
路径三次幂是团大小至多为 $4$ 的弦图。其正单形下界 [@thm-appe-chordal-exact-hilbert-simplex] 给出 $\sqrt{2-2/3}=2/\sqrt3$，因而也是统一上界集合的下界。[@thm-appe-hilbert-reversal-four-upper] 在单位预算下给出集合中的 $259/200$，而 Banach 系数下界给出末项。两个严格不等式分别由平方和分数比较得到。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-hilbert-reversal-five-separation title="团大小至多为五时的系数分离" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.hilbert_cliqueFive_phase_separation"}
有 $H_5\le\sqrt{10275/4576}<2997/2000<3/2$。并且对任意 $C\in\mathbb R$，若 $C\in\mathcal F_5$，则 $3/2\le C$。
:::

::: {.proof #pf-appe-hilbert-reversal-five-separation}
[@thm-appe-hilbert-reversal-five-upper] 给出一个可行上界，严格不等式由平方和分数比较得到。任意 $C\in\mathcal F_5$ 必须适用于全部路径四次幂及其平衡割实坐标空间。[@thm-appe-chordal-exact-l1-even-path] 对宽度 $4$ 给出 $2-2/4=3/2$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-hilbert-reversal-comparison title="实 $L_1$ 与内积空间的系数次序反转" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.realL1_hilbert_banach_phase_reversal"}
有 $\inf\mathcal L_4=1$ 且 $1<H_4$，还满足 $H_5<3/2\le\inf\mathcal L_5\le\inf\mathcal B_5$。
:::

::: {.proof #pf-appe-hilbert-reversal-comparison}
团大小至多为 $4$ 时，实 $L_1$ 的 Jung 界给出系数 $1$，取一个点上的计数测度并应用 [@thm-appe-chordal-exact-l1-clique-four] 给出反向界。两个内积空间不等式来自前述分离定理。有限实坐标 $\ell_1$ 空间等距于对应计数测度的实 $L_1$ 空间，所以 $\mathcal F_5$ 的下界也约束 $\mathcal L_5$。实 $L_1$ 空间完备，故 $\mathcal B_5\subseteq\mathcal L_5$。团大小至多为 $5$ 的群值界给两集合提供共同的可行上界 $3$，从而可比较其下确界。完整证明由 Lean 内核检查。
:::

## E.8.1.9.3 路径幂上圆周增益的精确系数

记 $P_n^k$ 为 $\mathrm{Fin}(n)$ 上的路径 $k$ 次幂。两个不同的下标相差至多为 $k$ 时相邻。沿用 [@def-appe-chordal-su2-skew]、[@def-appe-chordal-su2-triangle-bound] 和 [@def-appe-chordal-su2-fits] 的反对称性、三角缺陷及拟合约定。$U$ 是带圆度量 $d$ 的单位四元数群。固定圆周的参数化为 $\operatorname{ph}(t)=\cos t+\mathbf i\sin t$，其中 $\mathbf i$ 是四元数的第一虚单位。圆周条件只约束棱上的增益。

::: {.theorem #thm-appe-circle-path-upper title="任意宽度路径幂的圆周增益上界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/CircleCoefficient.SimpleGraph.CirclePowerPath.powerPath_circle_coefficient_one"}
设 $n,k\in\mathbb N$，$g:\mathrm{Fin}(n)\times\mathrm{Fin}(n)\to U$ 在 $P_n^k$ 的棱上反向取逆，并且对每条有向棱 $ij$ 都存在 $t\in\mathbb R$ 使 $\operatorname{ph}(t)=g(i,j)$。若 $\delta\in\mathbb R$、$\delta\ge0$，且三角缺陷至多为 $\delta$，则存在 $p:\mathrm{Fin}(n)\to U$，在 $P_n^k$ 上以误差至多 $\delta$ 拟合 $g$。
:::

::: {.proof #pf-appe-circle-path-upper}
宽度 $0$ 时没有棱。其余情形先选实角代表。若 $\delta<\pi/2$，四点团的四个主值三角角度的有向和是 $2\pi$ 的倍数，绝对值小于 $2\pi$，所以和为零。沿路径下标递推可把这些主值角度整合为反对称的实棱增益，再拟合实势并取其圆周相位。若 $\delta\ge\pi/2$，按宽度分块，以块首为锚，交替把各块的势放在两条正交的复直线上。块内由三角条件控制误差，相邻块之间的误差为 $\pi/2$。完整证明由 Lean 内核检查。
:::

为检验系数能否降低，取正整数 $L$、$\varepsilon_L=\pi/(4L)$，在 $P_{2L+2}^2$ 上定义 $g_L(i,j)=\operatorname{ph}(\varepsilon_L A(i,j))$。记 $s_i=(-1)^i$。在 $i<j$ 时，$A(i,i+1)=-s_i/2$，$A(i,i+2)=s_i$，其余正向值为零。反向取负，对角线为零。这是下列两条定理所用的同一个增益。

::: {.theorem #thm-appe-circle-path-exact-defect title="路径平方见证取到其三角缺陷界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/CircleCoefficient.SimpleGraph.CirclePowerPath.sharpGain_exact_defect"}
对任意正整数 $L$，$g_L$ 在 $P_{2L+2}^2$ 上的三角缺陷至多为 $\varepsilon_L$。并且存在两两相邻的 $i,j,l\in\mathrm{Fin}(2L+2)$，使 $d(g_L(i,j)g_L(j,l),g_L(i,l))=\varepsilon_L$。
:::

::: {.proof #pf-appe-circle-path-exact-defect}
递增三角形由连续的三个下标组成。两个长度为 $1$ 的步长的角权相消，长度为 $2$ 的棱留下绝对值为 $1$ 的有向角权。颠倒取向只改变符号，由此得到所有三角形的上界。在 $(0,1,2)$ 上，相位差的绝对值是 $\varepsilon_L\le\pi$，圆距离在此处等于该绝对值。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-circle-path-ambient-lower title="路径平方见证的单位四元数势下界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/CircleCoefficient.SimpleGraph.CirclePowerPath.sharpGain_ambient_lower"}
设 $L$ 为正整数，$p:\mathrm{Fin}(2L+2)\to U$，$r\in\mathbb R$。若 $p$ 在 $P_{2L+2}^2$ 上以误差至多 $r$ 拟合 $g_L$，则 $\varepsilon_L L/(L+1)\le r$。
:::

::: {.proof #pf-appe-circle-path-ambient-lower}
沿偶数下标从 $0$ 走到 $2L$，接到 $2L+1$，再沿奇数下标逆行到 $1$ 并闭合。每条长度为 $2$ 的步进棱贡献角权 $1$，两条衔接棱的角权相消，所以总角度为 $2L\varepsilon_L=\pi/2$。势差沿圈相乘恰为单位元。圆度量的双不变性和三角不等式给出 $\pi/2\le(2L+2)r$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-circle-path-exact-coefficient title="圆周增益在路径幂族上的精确统一系数" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/CircleCoefficient.SimpleGraph.CirclePowerPath.admissible_iff_one_le"}
设 $C\in\mathbb R$。对每个 $n,k\in\mathbb N$、每个在 $P_n^k$ 的有向棱上取值于 $\operatorname{ph}(\mathbb R)$ 且反向取逆的增益 $g:\mathrm{Fin}(n)\times\mathrm{Fin}(n)\to U$、每个非负实预算 $\delta$，若三角缺陷至多为 $\delta$，则存在 $p:\mathrm{Fin}(n)\to U$ 以误差至多 $C\delta$ 拟合 $g$。这个性质当且仅当 $1\le C$ 成立。
:::

::: {.proof #pf-appe-circle-path-exact-coefficient}
由 [@thm-appe-circle-path-upper] 和 $\delta\ge0$，每个 $C\ge1$ 都可行。反过来，任给 $C<1$，取 $L$ 使 $L/(L+1)>C$。前两条定理在正预算 $\varepsilon_L$ 下给出一个有限路径平方见证，任何单位四元数势的拟合误差界都超过 $C\varepsilon_L$。完整证明由 Lean 内核检查。
:::

## E.8.1.9.4 从圆度量到三维切空间

对有限简单图 $G$，记 $\mathcal R(G,C)$ 为以下性质。对每个 $g:V\times V\to U$ 及每个严格正的实数 $\delta$，若 $g$ 在棱上反向取逆且三角缺陷至多为 $\delta$，则存在 $p:V\to U$，使每条有向棱的圆度量误差至多为 $C\delta$。让增益趋近单位元，就可以把这样的圆度量估计传给三维虚四元数空间。

::: {.theorem #thm-appe-su2-tangent-transfer title="固定连通图上的三维切空间传递" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/SU2TangentLower.SimpleGraph.SU2Tangent.fixed_graph_euclidean_three_transfer"}
设 $V$ 为有限类型（Finite），$G$ 是 $V$ 上的连通简单图，$C\in\mathbb R$ 且 $C\ge0$。若 $\mathcal R(G,C)$，则 $U(G,\mathbb R^3,C)$。
:::

::: {.proof #pf-appe-su2-tangent-transfer}
把欧氏增益等距嵌入纯虚四元数，以此为单位元处的速度构造小尺度单位四元数增益。圆度量的三角缺陷除以尺度后趋于欧氏三角缺陷。用 $\mathcal R(G,C)$ 拟合，并把一个基点的势归一化为单位元。连通性提供从基点出发的有限游走，以棱估计控制各点相对于单位元的位移。对缩放后的位移取虚部，一阶余项趋于零，给出任意正余量下的欧氏拟合。有限维闭性去掉余量。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-su2-tangent-scaled title="任意非负预算下的三维切空间传递" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/SU2TangentLower.SimpleGraph.SU2Tangent.fixed_graph_euclidean_three_scaled"}
设 $V$ 为有限类型（Finite），$G$ 是 $V$ 上的连通简单图，$C\in\mathbb R$、$C\ge0$，且 $\mathcal R(G,C)$。设 $a:V\times V\to\mathbb R^3$ 对所有 $u,v\in V$ 满足 $a(v,u)=-a(u,v)$。若 $\delta\in\mathbb R$、$\delta\ge0$，且 $a$ 的每个有序三角形的加法缺陷至多为 $\delta$，则存在 $p:V\to\mathbb R^3$，使每条有向棱的误差至多为 $C\delta$。
:::

::: {.proof #pf-appe-su2-tangent-scaled}
任取余量 $\eta>0$，用正尺度 $\delta+\eta/(C+1)$ 把增益归一化到单位预算，再应用 [@thm-appe-su2-tangent-transfer] 并缩放回去，得到误差至多 $C\delta+\eta$。有限图上的势差构成有限维闭线性子空间，故极限预算也可达到。这一论证包括 $\delta=0$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-su2-tangent-width-four-lower title="宽度四路径幂族的圆度量下界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/SU2TangentLower.SimpleGraph.SU2Tangent.round_width_four_family_lower"}
设 $C\in\mathbb R$ 且 $C\ge0$。若对每个 $n\in\mathbb N$ 都有 $\mathcal R(P_n^4,C)$，则 $\sqrt{3/2}\le C$。
:::

::: {.proof #pf-appe-su2-tangent-width-four-lower}
非空路径幂连通，故在每个固定的图上作切空间传递。空图的欧氏拟合条件自动成立。取直径为 $1$、重心为零的正四面体，将各顶点加倍后，其到任意中心的平均平方距离是 $3/2$ 加上中心的平方范数。因而最远顶点距该中心至少 $\sqrt{3/2}$。[@thm-appe-chordal-exact-doubled-radius] 对全部路径长度给出系数下界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-su2-tangent-width-four-obstruction title="低于宽度四下界的有限圆度量反例" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/SU2TangentLower.SimpleGraph.SU2Tangent.exists_round_width_four_obstruction"}
设 $C\in\mathbb R$，$0\le C<\sqrt{3/2}$。存在 $n\in\mathbb N$、$g:\mathrm{Fin}(n)\times\mathrm{Fin}(n)\to U$ 和实数 $\delta>0$，使 $g$ 在 $P_n^4$ 的棱上反向取逆，且每个有序三角形的圆度量缺陷至多为 $\delta$。对每个 $p:\mathrm{Fin}(n)\to U$，存在 $P_n^4$ 的一条有向棱 $uv$，使 $C\delta<d(g(u,v),p(u)^{-1}p(v))$。
:::

::: {.proof #pf-appe-su2-tangent-width-four-obstruction}
若每个有限长度的路径四次幂都满足 $\mathcal R(P_n^4,C)$，就与 [@thm-appe-su2-tangent-width-four-lower] 矛盾。展开某个有限长度上这一性质的否定，得到所需的增益、正预算和对每个势都存在的超界有向棱。完整证明由 Lean 内核检查。
:::

## E.8.1.9.5 球冠上界与缺陷预算的衔接

[@thm-appe-chordal-su2-global] 的分层构造以同一影团的锚点为基准，把每个前驱给出的两棱输运值放入一个球冠。两条到候选值的距离界可叠加为跨层棱的误差界。同层棱则要比较两个球冠的中心。小缺陷时，可直接用候选值凸包的几何控制这两种误差。

::: {.theorem #thm-appe-su2-caratheodory-small title="任意团大小下的 Carathéodory 小缺陷界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2CaratheodoryBounds.SimpleGraph.IsChordal.exists_su2_gain_potential_caratheodory"}
设 $V$ 为有限类型（Finite），$G$ 是 $V$ 上的简单弦图，$g:V\times V\to U$ 在 $G$ 的棱上反向取逆。设 $\delta\in\mathbb R$，$0\le\delta\le\arcsin\sqrt{5/12}$，且每个有序三角形的圆度量缺陷至多为 $\delta$。则存在 $p:V\to U$，在 $G$ 上以误差至多 $2\arcsin(\sqrt{3/2}\sin\delta)$ 拟合 $g$。
:::

::: {.proof #pf-appe-su2-caratheodory-small}
在每个连通分支上按到根的距离分层。锚点与前驱给出的候选值两两相距至多 $2\delta$。由 $\sin^2\delta\le5/12$ 和四维的 Carathéodory 定理排除原点落在候选值凸包内。离原点最近的点位于支撑超平面，可用至多 $4$ 个接触点表示。其平方范数至少为 $1-(3/2)\sin^2\delta$，归一化后给出半径 $R=\arcsin(\sqrt{3/2}\sin\delta)$。跨层棱通过共同候选值把误差限制在 $2R$。同层相邻点的前驱集合彼此包含，对应的候选值在沿棱输运后相距至多 $\delta$。用较小集合凸包最近点的凸权重比较两个归一化中心，得到同一个 $2R$ 界。合并各分支的势即得结论。完整证明由 Lean 内核检查。
:::

在大缺陷区间，可以把线性误差预算和一个固定的球冠半径对接。团大小至多为 $5$ 时，已有闭半球界 [@thm-appe-chordal-su2-clique-five]。团大小至多为 $6$ 时，插入一个顶点至多需要容纳 $5$ 个候选值。

::: {.theorem #thm-appe-su2-caratheodory-six-cap title="团大小至多为六的固定球冠界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2CaratheodoryBounds.SimpleGraph.IsChordal.exists_cliqueSix_su2_gain_potential_cap"}
设 $V$ 为有限类型（Finite），$G$ 是 $V$ 上的简单弦图，每个有限顶点团至多有 $6$ 个元素。设 $g:V\times V\to U$ 在 $G$ 的棱上反向取逆。则存在 $p:V\to U$，在 $G$ 上以误差至多 $\arccos(-1/4)$ 拟合 $g$。
:::

::: {.proof #pf-appe-su2-caratheodory-six-cap}
反向单纯消去使每次插入至多遇到 $5$ 个候选值 $p(i)g(i,a)$。若它们的凸包没有把原点包在内部，取分离或支撑超平面的单位法向即可。原点在内部时，凸包是四维单形。至少一枚顶点对原点的重心坐标不超过 $1/5$，其对面指向该顶点的单位法向与其余顶点的共同内积至少为 $-1/4$。所得球冠中心可作新势值，空候选集可取单位元。用双不变性和反向取逆控制两个方向的新棱，旧棱保留原误差界。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-su2-caratheodory-five title="团大小至多为五的全预算重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2CaratheodoryBounds.SimpleGraph.IsChordal.exists_cliqueFive_su2_gain_potential_caratheodory"}
设 $V$ 为有限类型（Finite），$G$ 是 $V$ 上的简单弦图，每个有限顶点团至多有 $5$ 个元素。设 $g:V\times V\to U$ 在 $G$ 的棱上反向取逆，$\delta\in\mathbb R$、$\delta\ge0$，且每个有序三角形的圆度量缺陷至多为 $\delta$。则存在 $p:V\to U$，在 $G$ 上以误差至多 $(\pi/\arccos(1/3))\delta$ 拟合 $g$。
:::

::: {.proof #pf-appe-su2-caratheodory-five}
取分界 $b=\arccos(1/3)/2$。小缺陷的半径函数 $R(\delta)=\arcsin(\sqrt{3/2}\sin\delta)$ 在 $[0,b]$ 上是凸函数，且 $R(0)=0$、$R(b)=\pi/4$。因此 $2R(\delta)$ 不超过端点割线的值。超过 $b$ 后用闭半球拟合，其误差界 $\pi/2$ 等于这条直线在 $b$ 处的值，并随预算增大的直线所控制。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-appe-su2-caratheodory-six title="团大小至多为六的全预算重构界" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2CaratheodoryBounds.SimpleGraph.IsChordal.exists_cliqueSix_su2_gain_potential_caratheodory"}
设 $V$ 为有限类型（Finite），$G$ 是 $V$ 上的简单弦图，每个有限顶点团至多有 $6$ 个元素。设 $g:V\times V\to U$ 在 $G$ 的棱上反向取逆，$\delta\in\mathbb R$、$\delta\ge0$，且每个有序三角形的圆度量缺陷至多为 $\delta$。则存在 $p:V\to U$，在 $G$ 上以误差至多 $(2\arccos(-1/4)/\arccos(1/6))\delta$ 拟合 $g$。
:::

::: {.proof #pf-appe-su2-caratheodory-six}
取分界 $b=\arccos(1/6)/2=\arcsin\sqrt{5/12}$。在 $[0,b]$ 上，凸性给出 $2R(\delta)\le 2R(b)\delta/b$，且 $2R(b)=\arccos(-1/4)$。超过 $b$ 后用 [@thm-appe-su2-caratheodory-six-cap] 的固定球冠界，它至多为同一条直线在当前预算的值。完整证明由 Lean 内核检查。
:::

## E.8.1.9.6 系数的适用范围

宽度 $4$ 的切空间下界约束整个路径幂族。对于给定的有限路径长度，尤其是有限曲率下的更强数值下界，仍需相应的有限见证。一般团大小下的最优圆度量统一系数仍待确定。本节未确认的进一步估计包括全局 $C_{\mathrm{Hilb}}^*<1+\sqrt2$、团大小至多为四时 $H_4<1.199724$、团大小至多为六时 $C_{\mathbb R^3}^{(6)}<\sqrt2$，以及全局 $C_{\mathrm{SU}(2)}^*\le3.439$。
