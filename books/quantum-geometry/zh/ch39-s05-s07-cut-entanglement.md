# 35.6.7 跨切口 $1^K$ 禁戒与直接编码器的可达施密特秩 {#sec-ch39-p2e-entanglement}

设想把长度为 $m_X + m_Y$（$m_X, m_Y \ge 1$）的二元物理寄存器沿切口拆成左半 $X$（长 $m_X$）与右半 $Y$（长 $m_Y$）。即便左字 $x \in \{0, 1\}^{m_X}$ 与右字 $y \in \{0, 1\}^{m_Y}$ 各自内部都不含 $1^K$，拼接字 $xy$ 跨越切口时仍可能拼出连续 $K$ 个 `1`：记 $\tau(x)$ 为 $x$ 末尾连续 `1` 的个数，$\iota(y)$ 为 $y$ 开头连续 `1` 的个数，则跨切口拼接合法的充要条件恰为

$$
\tau(x) + \iota(y) < K.
$$

::: {.example #ex-ch39-fib-pyramid title="三位禁邻金字塔与端点联合概率"}
取 $K=2$，只看三个位置。中位为 $0$ 时，两端的四种取值给出正方形的四个角 `000`、`100`、`001`、`101`。中位为 $1$ 时两端只能为 $0$，给出顶点 `010`。合法字的概率律给出三个占位均值 $(\mu_1,\mu_2,\mu_3)$。这些均值构成五个顶点的凸包，恰由非负性和 $\mu_1+\mu_2\le1$、$\mu_2+\mu_3\le1$ 刻画。[三位占位金字塔](lean:D5/S1/Words/AdmissibleWords/PathStableSetPolytope.convexHull_three_pyramid)

令 $q=\Pr(101)$。按 `000`、`100`、`010`、`001`、`101` 的顺序，五个概率依次为 $1-\mu_1-\mu_2-\mu_3+q$、$\mu_1-q$、$\mu_2$、$\mu_3-q$、$q$。逐项要求非负就得到

$$
\max(0,\mu_1+\mu_2+\mu_3-1)\le q\le\min(\mu_1,\mu_3).
$$

例如，中位恒为 $0$ 时，从四个底面字各占 $1/4$ 改为 `000`、`101` 各占 $1/2$，两端的占位仍各为 $1/2$，共同占位概率却从 $1/4$ 变成 $1/2$。这个改动给四格表的对角各加 $1/4$，给反对角各减 $1/4$，保持了行和与列和。[§39.3](ch39-s26-axiom-omega-quantum-mechanics-five-postulates.md) 的固定种子构造也用到这个四格变换。知道每个字的计算基概率后，字与字之间的相对相位仍可变化，见 [@ex-ch39-p2e-phase-counterexample]。[FIB 原子理论卷 §2–4](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md#L178-L216)

对等权样本，这个变换是任意长度禁邻字排序在三位时的特例。把第 $2,4,6,\ldots$ 位取反。此时每个占位的奇数位都要求相邻的偶数位也占位。于是两个变换后的支撑取交集和并集，所得支撑仍合法。再取反还原，就得到两个合法字，逐位合计的占位次数保持相等。金字塔底面的 `100` 和 `001` 先变成 `110` 和 `011`。两者的交、并分别为 `010` 和 `111`，还原后就是 `000` 和 `101`。

反复作这样的交换，可以把变换后的支撑按包含关系排成一列。若共 $m$ 个样本，某一位在变换后的支撑中出现 $c$ 次，它就恰好出现在最后 $c$ 个支撑里。因此，原占位计数与 $m$ 决定排序后的多重集。样本数与逐位占位计数相同的两组样本可以经由这个共同的多重集，用一系列合法的二字交换连通。对有理概率律，把两个律写成同一分母后就能应用这一结论。[固定占位计数下的连通性](lean:D5/S1/Words/AdmissibleWords/UncrossingFiber.adm_phi_fiber_common_endpoint)

同一阈值构造也适用于实数占位率。设 $\mu_i\in[0,1]$ 且 $\mu_i+\mu_{i+1}\le1$。只抽一次 $U$，使它在 $(0,1)$ 上均匀分布。奇数位在 $U<\mu_i$ 时占位，偶数位在 $U>1-\mu_i$ 时占位。相邻两位所用的区间不相交，所以每次得到的字都合法。每个位的占位概率是区间长度 $\mu_i$。对于同奇偶的两位，两个区间相互嵌套，共同占位概率为 $\min(\mu_i,\mu_j)$。对于异奇偶的两位，交集长度为 $\max(0,\mu_i+\mu_j-1)$。因此同一个字的随机生成规则可同时达到这些两位概率的极值。[实数边缘下的共同实现](lean:D5/S1/Words/AdmissibleWords/FIBThresholdPairExtrema.threshold_pair_extrema)
:::

::: {.example #ex-ch39-fib-deletion-coherence title="两个交错字之间的相干"}
同样的五个合法字也给出一个量子例子。比较纯态 $(|010\rangle+|101\rangle)/\sqrt2$ 与这两个基态的等权非相干混合态。两者的计算基概率律以及每个两位约化态都相同。因为两个字在每个位点都不同，迹去任一位都会消去交叉项。混合态是乘积态的混合，纯态在每个单点切口上都有两个施密特系数 $(1/\sqrt2,1/\sqrt2)$。用比特翻转算符 $X$ 作联合测量时，$X\otimes X\otimes X$ 在纯态上的期望值为一，在混合态上为零。[FIB 原子理论卷 §18.2–18.3](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md#L4163-L4280)

推广到长度至少为二的禁邻开链。固定迹去任一位所得的全部约化态后，密度矩阵只有两个交错字之间的条目还可能改变。设 $D$ 为两密度矩阵之差，在非法字的行列上补零。如果两个字在第 $i$ 位相同，迹去第 $i$ 位的等式给出共同取零、共同取一的两项互为相反数。若任一字占据相邻位 $j$，两字在第 $i$ 位共同取一的矩阵元必为零。若两字在 $j$ 都为空，先把 $i$ 的共同位设为一，再应用 $j$ 的偏迹等式。两端同时占位仍然非法，所以这个矩阵元也为零。因此有非零条目的两个字必须逐位相反。两个互补字都合法，便要求每条边的两端取值相反，只剩下两个交错字。反过来，迹去任一位都消去它们之间的两个交叉项。在厄米的矩阵差中，这两个条目互为复共轭。[有限图上偏迹的精确核](lean:D5/S3/Quantum/Entanglement/Marginals/IndependentWordMarginals.deletion_kernel_iff)
:::

::: {.example #ex-ch39-fib-forbidden-window-coherence title="禁戒窗口中的相干"}
对禁止连续 $K$ 个一的长度 $n\ge K$ 的开链，两份单点偏迹完全相同的密度矩阵可以在一对字之间有不同的矩阵元，当且仅当每个长度为 $K$ 的窗口都同时含有 $(0,1)$ 和 $(1,0)$ 两类位点。保持两字不同的位点不动，让它们相同的位点同时改变。每个偏迹等式都要求共同位取零和取一的两项互为相反数，所以一个非零矩阵元迫使所有共同位的赋值都落在合法支撑内。将共同位全部设为一便足以检查全部赋值。此时，每个禁戒窗口在两个字内都必须各自留有一个零。[二值偏迹的精确支撑判据](lean:D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionSupport.survives_iff)

对任何满足条件的模式，可以在每次翻转一个共同位时反转矩阵元的符号。不同的位点包含两种方向，所以有序模式与其转置的支撑互不相交。加上伴随便得到一个非零厄米矩阵，其单点偏迹和迹都为零。在合法子空间的归一化单位矩阵上加减这个矩阵的足够小倍数，就得到实现这种差异的两份密度矩阵。以 $K=3$ 为例，$(010,100)$ 和 $(011,101)$ 属于同一模式。迹去共同的末位时，两项相消。迹去任一不同的位点时，两项都为零。
:::

::: {.theorem #thm-ch39-fib-forbidden-triple-dimension lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionDimension.noTriple_finrank" title="禁三连占位时偏迹核的维数"}
在长度为 $n\ge3$ 的开链上，只允许不含连续三个 $1$ 的字。记 $d_n$ 为如下复矩阵空间的维数。矩阵的两个指标都必须是合法字，且迹去任一位均得到零矩阵。则
$$
d_3=12,\quad d_4=24,\quad d_5=44,\qquad d_n=d_{n-1}+d_{n-2}+d_{n-3}\quad(n\ge6).
$$
:::

::: {.proof}
按位记录两个字是共同取值、从零到一，还是从一到零。每个合法位型以共同位全零的那一对字提供一个复系数。每次翻转一个共同位，就给系数乘以 $-1$。不同位型的矩阵元集合互不相交，所以这些系数可以各自任取。[任意有限合法字族的维数公式](lean:D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionDimension.supportedKernel_finrank)

对禁三连占位的链，每组三个相邻符号都须出现两种不同方向。设 $A,B,C,D$ 分别计数末两位是同一方向、相反方向、方向后跟共同位、共同位后跟方向的位型。追加一个符号后，四项变为 $(B,A+B+D,B,C)$。长度二时四项各为二，另有一个双共同位无法继续延伸。从长度三起，这四项的总数依次为 $12,24,44$。将上述更新式连续代入四次，第四次的向量等于前三次所得向量之和，得到递推式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch39-fib-oriented-difference lean="D5/S1/Words/AdmissibleWords/FIBPathPairBounds.sharp_hard_core_difference" title="从一个固定位点出发的端点差概率上界"}
位点从零编号。对不含相邻两个 $1$ 的字，记 $X_k$ 为第 $k$ 位的占有指标。在偶数位取 $Y_k=X_k$，在奇数位取 $Y_k=1-X_k$，并记 $q_k=\Pr(Y_k=1)$。给定 $[0,1]$ 中的占有率，且任意相邻两项之和至多为一。对任一固定位点 $i$ 和每个 $j\ge i$ 都有精确上界

$$
\Pr(Y_i=1,\ Y_j=0)\ \le\
\min\!\left(q_i,\ 1-q_j,\ \sum_{k=i}^{j-1}(q_k-q_{k+1})_+\right).
$$

同一种合法字的抽样分布可同时达到从 $i$ 出发的所有这些上界。[有限字的构造](lean:D5/S1/Words/AdmissibleWords/FIBPathPairBounds.word_attainment)
:::

::: {.proof}
有限个合法字上的任意分布都可用 $[0,1)$ 实现，将区间按各字的概率划分即可。记 $A_k$ 为事件 $Y_k=1$。相邻位点的占有事件互斥，故逐奇数位取补后，相邻的 $A_k$ 两两嵌套。于是 $\Pr(A_k\setminus A_{k+1})=(q_k-q_{k+1})_+$。每个属于 $A_i\setminus A_j$ 的样本都要在 $i$ 到 $j$ 之间退出至少一次。并集上界给出公式中的和，两个端点的概率给出其余两项。

为达到上界，在 $q_i$ 处把单位区间分成两段。对位点 $j$，分别取两段的起始区间，长度为 $u_j$ 和 $q_j-u_j$。当 $j\ge i$ 时，取 $u_j=\max(0,q_i+q_j-1,q_i-\sum_{k=i}^{j-1}(q_k-q_{k+1})_+)$。在 $i$ 之前取 $u_j=\min(q_i,q_j)$。相邻位点间，如果 $q_j$ 增加，两段长度都不减，如果 $q_j$ 减少，两段长度都不增，故相邻事件按所需方向嵌套。位点 $i$ 对应第一段，第二段的取用长度为零，因此 $\Pr(A_i\setminus A_j)=q_i-u_j$。
:::

固定起点的条件有实际限制。若五个位点的占有率为 $(1/2,0,1/2,0,1/2)$，三个偶数位之间的三对都取等，就要求三个概率为 $1/2$ 的事件两两交集为零测集，总概率将超过一。

把禁邻链闭合成四环，固定两侧各两个位点，记为 $s,t$ 与 $x,y$。令 $s,t,y$ 的占位率都是 $1/2$，$x$ 的占位率为零。沿 $s,x,t$ 走，$x$ 以概率一保持空位，这条路单独允许端点一开一关。但沿 $s,y,t$ 走，$s,t$ 的占位事件都包含于 $y$ 的未占位事件，三者概率同为 $1/2$，因而只可能在零概率处不同。于是 $s$ 占位而 $t$ 未占位的概率为零。

::: {.theorem #thm-ch39-fib-graph-oriented-difference lean="D5/S1/Words/AdmissibleWords/NestedEventGraphBounds.sharp_difference" title="图上的端点差概率上界"}
在简单图上选择一个能到达所有顶点的起点 $s$。在半开单位区间配备可测事件 $A_v$，使其概率为给定的 $q_v\in[0,1]$，且任一条边的两个事件按包含关系可比。记 $d(s,v)$ 为从 $s$ 到 $v$ 的所有途径中，沿边下降量 $(q_u-q_w)_+$ 之和的下确界。则

$$
\Pr(A_s\setminus A_v)\le \min(q_s,1-q_v,d(s,v)).
$$

存在一族事件同时达到所有这些上界。在这族事件中，每条边上概率较小的事件包含于概率较大的事件，概率相等的两个事件相同。
:::

::: {.proof}
沿任一有限途径，每个属于 $A_s\setminus A_v$ 的样本至少退出一次。相邻事件可比，单步退出的概率恰为下降量，所以取各条途径的下确界即可得到第三项。前两项是端点本身给出的界。

构造取等的事件时，在 $q_s$ 处切开单位区间。在两段里分别取初始区间，长度为 $u_v$ 和 $q_v-u_v$，其中 $u_v=\max(0,q_s+q_v-1,q_s-d(s,v))$。若相邻两点 $a,b$ 满足 $q_a\le q_b$，从 $a$ 到 $b$ 的代价为零，从 $b$ 到 $a$ 的代价为 $q_b-q_a$。两段长度因此都从 $a$ 到 $b$ 不减。起点的事件恰好是第一段，所以它在 $A_v$ 之外的质量为 $q_s-u_v$。完整证明由 Lean 内核检查。
:::

在二分图的禁邻模型中，对一侧的占位事件取补，相邻互斥就变成相邻包含。四环例子中取补 $x,y$，两条从 $s$ 到 $t$ 的途径上，变换后的概率分别为 $(1/2,1,1/2)$ 和 $(1/2,1/2,1/2)$。下降量分别为 $1/2$ 和零，后一条路把端点差概率压到零。

换成两个起点时，各自的上界之间还会有约束。下面的五点图给出一对端点差的完整联合范围。

::: {.theorem #thm-ch39-fib-two-source-capacity lean="D5/S1/Words/AdmissibleWords/FIBTwoSourceObstruction.five_vertex_range" title="两个端点差概率的联合范围"}
给定实数 $q,c,a,b$。在半开单位区间内，存在五个可测事件 $S,H,K,T,W$，其概率分别为 $q,q+c,q+c,q,q$，且满足 $S,W\subseteq H\cap K$、$T\subseteq K$、$\Pr(W\setminus S)=a$、$\Pr(T\setminus H)=b$，当且仅当
$$
0\le a\le q,\qquad 0\le b\le\min(q,1-q-c),\qquad a+b\le c.
$$
:::

::: {.proof}
$W\setminus S$ 在 $H$ 内，$T\setminus H$ 在 $H$ 外。这两块都在 $K\setminus S$，总概率至多为 $c$。另外，第一块大小至多为 $q$，第二块同时受 $T$ 和 $H$ 的补集限制。

这些不等式也给出 $q,c\ge0$ 和 $q+c\le1$。为达到给定的 $(a,b)$，把 $S$ 与 $K$ 分别取为 $[0,q)$ 与 $[0,q+c)$。把 $K$ 末尾长度为 $b$ 的区间留给 $T\setminus H$，再在 $K$ 右侧取同样长度补足 $H$。$T$ 的其余部分取 $S$ 开头长度为 $q-b$ 的区间。$W$ 由 $S$ 开头长度为 $q-a$ 的区间和紧接 $S$ 的长度为 $a$ 的区间组成。$a+b\le c$ 保证后者位于 $H\cap K$。完整证明由 Lean 内核检查。
:::

取 $q=1/2$、$c=1/6$，得到第一象限中 $a+b\le1/6$ 的整个三角形。两项分别都能达到 $1/6$。把 $H,K$ 的事件取补，就得到二分图的禁邻占位模型。三个位点的占位率为 $1/2$，另两个为 $1/3$。五条边上的占位率之和均为 $5/6$，两个起点仍争用同一块概率容量。

图上的环也给出一组可以逐条检查的联合约束。加一个恒为零的参考位 $O$，用 $d_{uv}$ 表示两个位点读数不一致的概率。于是 $d_{Ov}$ 就是位点 $v$ 的边缘概率。沿一条闭合途径标记奇数条边，把标记边上的 $d_{uv}$ 换成 $1-d_{uv}$。各边的改写结果之和至少为一。每份二值样本都至少在一步违背这组奇偶要求，因此任意共同概率律都满足这条不等式。

::: {.theorem #thm-ch39-fib-cycle-completion lean="D5/S1/Words/AdmissibleWords/FIBCycleRelaxation.cycle_completion_iff" title="环不等式给出的精确范围"}
取 $q,c\ge0$ 且 $q+c\le1$。沿用五点图的记号，指定参考位到 $S,T,W$ 的距离为 $q$，到 $H,K$ 的距离为 $q+c$。指定五条包含边的距离均为 $c$，并指定 $d_{WS}=2a$、$d_{TH}=c+2b$。这些读数可以补齐为满足全部奇数标记环不等式的对称距离表，当且仅当

$$
0\le a\le\min(q,c),\qquad
0\le b\le\min(q,c,1-q-c).
$$
:::

::: {.proof}
在环 $O\to W\to S\to O$ 上依次只标记最后一条边或只标记中间一条边，分别得到 $a\ge0$ 和 $a\le q$。用 $W\to H\to S\to W$ 并只标记返回边，得到 $a\le c$。同样从 $O\to T\to H\to O$ 得到 $b\ge0$ 与 $b\le q$，将这三条边全部标记则得到 $b\le1-q-c$。$T\to K\to S\to H\to T$ 只标记返回边给出 $b\le c$。

反过来，取 $d_{HK}=2b$，并取 $d_{ST}=d_{WT}=\max(a,2b)$。所得距离满足三角不等式，每个三角形的周长至多为二。把每个位点复制到两个副本，同侧用 $d_{uv}$，异侧用 $1-d_{uv}$。三角不等式和周长界保证两个副本合在一起仍满足三角不等式。沿标记边切换副本，闭合途径会到达原位点的另一副本。两个副本相距一，所以每条这样的途径总长至少一。完整证明由 Lean 内核检查。
:::

在 $q=1/2,c=1/6$ 的例子里，所有环检查允许整个 $[0,1/6]^2$。共同概率律的精确范围还要求 $a+b\le1/6$。用距离表示，这条额外约束来自五边形割不等式与三角不等式 $d_{HT}\le d_{HK}+d_{KT}$ 的和，消去未指定的 $d_{HK}$。[Avis、Imai 与 Ito，定义 6 和定理 4](https://arxiv.org/abs/math/0601375)

同一块共享容量对五个边缘概率不等的情形也成立。此时两个端点差各自有一个区间，它们的和仍受 $K$ 中去掉 $S$ 后的概率质量约束。

::: {.theorem #thm-ch39-fib-unequal-joint-range lean="D5/S1/Words/AdmissibleWords/FIBUnequalMarginals.joint_range" title="五个边缘概率下的精确联合范围"}
在半开单位区间内，要求可测事件 $S,H,K,T,W$ 的概率分别为 $s,h,k,t,w$，且 $S,W\subseteq H\cap K$、$T\subseteq K$。指定 $a=\Pr(W\setminus S)$ 和 $b=\Pr(T\setminus H)$。这样的事件族存在，当且仅当

$$
\begin{aligned}
&k\le1,\qquad t\le k,\\
&\max(0,w-s)\le a\le\min(w,h-s),\\
&\max(0,t-h)\le b\le\min(t,1-h),\qquad a+b\le k-s.
\end{aligned}
$$
:::

::: {.proof}
$W\setminus S$ 同时包含于 $W$ 和 $H\setminus S$，$T\setminus H$ 同时包含于 $T$ 和 $H$ 的补集。两个差集的下界由能留在 $S$ 或 $H$ 内的最大质量给出。它们互斥且都包含于 $K\setminus S$，故总概率至多为 $k-s$。

为构造事件，把 $K$ 取为 $[0,k)$，让 $H\cap K$ 占据长度为 $r=\max(s+a,t-b,h+k-1)$ 的前段。约束保证 $r\le h$、$r\le k-b$，且 $K$ 右侧容得下补足 $H$ 的质量 $h-r$。将 $S$ 和 $W$ 放在这个前段内，使它们的重合长度为 $w-a$。$T$ 的前 $t-b$ 单位质量放在前段内，再把长度为 $b$ 的一段紧接在前段之后。完整证明由 Lean 内核检查。
:::

在 `trureturing` 的直接编码器模型中，给定整数 $N \ge 2$ 与阶数 $K \ge 2$，将 $\{0, 1, \dots, N\}$ 按是否为素数划分为非素数逻辑页（$b = \mathrm{false}$，维数 $M_0 > 0$）与素数逻辑页（$b = \mathrm{true}$，维数 $M_1 > 0$）。记 $C_{m, b}$ 为首比特等于 $b$ 的长度 $m$ 禁 $1^K$ 合法字集，其基数为 $c_{m, b} = |C_{m, b}|$；对每个阈值 $0 \le s < K$，定义左端低尾游程累计行数与右端相容邻域字数：

$$
a_s = \#\bigl\{x \in C_{m_X, 1} : \tau(x) < s\bigr\},\qquad n_s = \#\bigl\{y \in C_{m_Y, 1} : \iota(y) < K - s\bigr\},
$$

并据此定义两页的组合秩上界：

$$
R_0 = \min\bigl(c_{m_X, 0},\; \lfloor c_{m_Y, 0} / M_0 \rfloor\bigr),\qquad R_1 = \min\Bigl(c_{m_X, 1},\; \min_{0 \le s < K}\bigl(a_s + \lfloor n_s / M_1 \rfloor\bigr)\Bigr).
$$

称等距编码矩阵 $J : \mathbb{C}^{\mathrm{Logical}(N)} \to \mathbb{C}^{\{0,1\}^{m_X} \times \{0,1\}^{m_Y}}$ 与左寄存器页密度态 $\sigma_0, \sigma_1$ 满足**直接编码契约**（`directContract`），若：（i）$J^* J = I$；（ii）$X$ 与 $Y$ 两侧的首比特物理页投影均与逻辑页投影 $\Pi_b$ 交织，且 $\sigma_b$ 支撑在 $C_{m_X, b}$ 上；（iii）对一切逻辑算子 $A$ 成立部分迹替换律 $\operatorname{Tr}_Y(J A J^*) = \sum_{b \in \{0,1\}} \operatorname{Tr}(\Pi_b A)\,\sigma_b$；（iv）对一切逻辑输入态 $\psi$，凡跨切口拼接违背禁 $1^K$ 规则的字对 $(x, y)$ 其编码振幅恒为零 $(J\psi)(x, y) = 0$。在这一精确契约下，可达施密特秩与冯·诺依曼纠缠熵由以下充要定理完整锁定：

- [35.6.7.1 直接编码器的秩与纠缠熵](ch39-s05-s07-s01-rank-and-entropy.md)
- [35.6.7.2 局域父哈密顿量与热浴链](ch39-s05-s07-s02-parent-and-heatbath.md)
- [35.6.7.3 固定禁戒长度下的一致谱隙](ch39-s05-s07-s03-uniform-gap.md)
