# O.1 跨切口 $1^K$ 禁戒与直接编码器的可达施密特秩 {#sec-ch39-p2e-entanglement}

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

把四格按 `00`、`01`、`10`、`11` 排列。对非负整数 $a,b,c,d,s$，把计数 $(a,b+s,c+s,d)$ 改成 $(a+s,b,c,d+s)$。两张表的总数都为 $N=a+b+c+d+2s$，左右占位数分别为 $c+d+s$ 和 $b+d+s$，联合占位数却从 $d$ 变成 $d+s$。当 $N>0$ 时，联合占位率恰增加 $s/N$。这些读数可用交叉相乘精确比较。上面的四样本例取 $(a,b,c,d,s)=(1,0,0,1,1)$。两个端点的读数 $2/4$ 都等于 $1/2$，也等于射影读数 $\kappa([1:1])=1^2/(1^2+1^2)$。联合读数由 $1/4$ 变成 $2/4$。[OmegaMath 的比例等价](https://github.com/the-omega-institute/omega-math/blob/6f701cf75d1feffe20cdfc751c4f8da995a0e3a3/src/OmegaInit/Data/Ratio.lean#L19-L39) · [§39.12](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)

对等权样本，这个变换是任意长度禁邻字排序在三位时的特例。把第 $2,4,6,\ldots$ 位取反。此时每个占位的奇数位都要求相邻的偶数位也占位。于是两个变换后的支撑取交集和并集，所得支撑仍合法。再取反还原，就得到两个合法字，逐位合计的占位次数保持相等。金字塔底面的 `100` 和 `001` 先变成 `110` 和 `011`。两者的交、并分别为 `010` 和 `111`，还原后就是 `000` 和 `101`。

反复作这样的交换，可以把变换后的支撑按包含关系排成一列。若共 $m$ 个样本，某一位在变换后的支撑中出现 $c$ 次，它就恰好出现在最后 $c$ 个支撑里。因此，原占位计数与 $m$ 决定排序后的多重集。样本数与逐位占位计数相同的两组样本可以经由这个共同的多重集，用一系列合法的二字交换连通。对有理概率律，把两个律写成同一分母后就能应用这一结论。[固定占位计数下的连通性](lean:D5/S1/Words/AdmissibleWords/UncrossingFiber.adm_phi_fiber_common_endpoint)

同一阈值构造也适用于实数占位率。设 $\mu_i\in[0,1]$ 且 $\mu_i+\mu_{i+1}\le1$。只抽一次 $U$，使它在 $(0,1)$ 上均匀分布。奇数位在 $U<\mu_i$ 时占位，偶数位在 $U>1-\mu_i$ 时占位。相邻两位所用的区间不相交，所以每次得到的字都合法。每个位的占位概率是区间长度 $\mu_i$。对于同奇偶的两位，两个区间相互嵌套，共同占位概率为 $\min(\mu_i,\mu_j)$。对于异奇偶的两位，交集长度为 $\max(0,\mu_i+\mu_j-1)$。因此同一个字的随机生成规则可同时达到这些两位概率的极值。[实数边缘下的共同实现](lean:D5/S1/Words/AdmissibleWords/FIBThresholdPairExtrema.threshold_pair_extrema)
:::

::: {.example #ex-ch39-fib-deletion-coherence title="两个交错字之间的相干"}
同样的五个合法字也给出一个量子例子。比较纯态 $(|010\rangle+|101\rangle)/\sqrt2$ 与这两个基态的等权非相干混合态。两者的计算基概率律以及每个两位约化态都相同。因为两个字在每个位点都不同，迹去任一位都会消去交叉项。混合态是乘积态的混合，纯态在每个单点切口上都有两个施密特系数 $(1/\sqrt2,1/\sqrt2)$。用比特翻转算符 $X$ 作联合测量时，$X\otimes X\otimes X$ 在纯态上的期望值为一，在混合态上为零。[FIB 原子理论卷 §18.2–18.3](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md#L4163-L4280)

推广到长度至少为二的禁邻开链。固定迹去任一位所得的全部约化态后，密度矩阵只有两个交错字之间的条目还可能改变。设 $D$ 为两密度矩阵之差，在非法字的行列上补零。如果两个字在第 $i$ 位相同，迹去第 $i$ 位的等式给出共同取零、共同取一的两项互为相反数。若任一字占据相邻位 $j$，两字在第 $i$ 位共同取一的矩阵元必为零。若两字在 $j$ 都为空，先把 $i$ 的共同位设为一，再应用 $j$ 的偏迹等式。两端同时占位仍然非法，所以这个矩阵元也为零。因此有非零条目的两个字必须逐位相反。两个互补字都合法，便要求每条边的两端取值相反，只剩下两个交错字。反过来，迹去任一位都消去它们之间的两个交叉项。在厄米的矩阵差中，这两个条目互为复共轭。[有限图上偏迹的精确核](lean:D5/S3/Quantum/Entanglement/Marginals/IndependentWordMarginals.deletion_kernel_iff)

固定两条交错字的权重为 $p,1-p$，其中 $0<p<1$。由上述偏迹核判据，所有与这份混合态有相同两位约化态的密度矩阵，在 `010`、`101` 张成的空间上恰为

$$
\rho(c)=\begin{pmatrix}p&c\\ \bar c&1-p\end{pmatrix},
\qquad |c|\le\sqrt{p(1-p)}.
$$

正半定性等价于行列式非负，等号给出圆周。圆心是可分混合态，圆周是纯态。跨任一非平凡切口作部分转置，两个交叉项移到另一对正交基态上，组成特征值为 $\pm|c|$ 的块。因此任一切口的纠缠负性都是 $|c|$。局部读数确定 $p$，补测 $c$ 的实部和虚部即可确定全局态与纠缠负性。
:::

::: {.theorem #thm-ch39-fib-local-marginal-rank lean="D5/S3/Quantum/Entanglement/Marginals/LocalMarginalRank.finrank_marginalMap" title="局部偏迹的秩由观测区域覆盖的字对决定"}
设有限位点集上的合法字族向下封闭，即合法字的任一占位子集仍合法。矩阵以有序合法字对为指标，系数取自域。给定任意一族观测区域 $\mathcal S$，对每个 $S\in\mathcal S$ 迹去 $S$ 的补集。把这些偏迹合在一起，所得线性映射的秩等于满足下式的有序合法字对 $(x,y)$ 的个数。

$$
x\cup y\subseteq S\quad\text{对某个 }S\in\mathcal S\text{ 成立。}
$$
:::

::: {.proof}
按占位并集的大小给字对排序。在每个字对 $(x,y)$ 上，保留 $x\cup y$ 内的取值，将其余位置同步增加占位所得到的所有矩阵元相加。这给出一个对角线全为一的三角坐标变换。对区域 $S$ 先作偏迹，再作这次坐标变换。如果 $x\cup y\subseteq S$，两个求和按区域内的限制分组，得到原坐标。如果并集伸到区域之外，该坐标为零。向下封闭性保证每个限制后的字仍是合法指标。因此整族偏迹和读取所有被覆盖坐标的投影有相同的核，秩也相等。完整证明由 Lean 内核检查。
:::

三位禁邻金字塔的 $25$ 个有序字对，按并集大小 $0,1,2,3$ 分别有 $1,9,13,2$ 个。大小为二的并集中，相邻位置各贡献两个有序字对，两个端点共同贡献九个。测量全部单点约化态时秩为 $10$，其中一维是迹。若测量全部三份两位约化态，秩为 $23$。若只测量左右两对相邻位点，则秩为 $14$，因为两端的占位并集没有被任一观测区域覆盖。

还可以反过来问，给定两份相邻边缘，是否有一个整体态同时实现它们？设三个位点为 $A,B,C$，占用概率分别为 $p_A,p_B,p_C$，两份边缘共享同一个 $p_B$。假设每份边缘在局域真空和单粒子子空间之间的矩阵元为零。记 $\alpha,\beta$ 为两份边缘各自从中间位点占用列到外侧位点占用行的矩阵元，令 $q_0=\max(0,p_A+p_B+p_C-1)$。它们有共同的半正定迹一扩张，当且仅当

$$
p_B\ge0,\qquad p_A,p_C\ge q_0,\qquad
|\alpha|^2\le p_B(p_A-q_0),\qquad
|\beta|^2\le p_B(p_C-q_0).
$$

若 $q$ 是两端同时占用的概率，真空权重为 $1-p_A-p_B-p_C+q$，所以 $q\ge q_0$。整体态的单粒子块在 $A,B,C$ 上的对角元是 $p_A-q,p_B,p_C-q$。两个相邻的二阶主子式给出上述相干界。反之取 $q=q_0$。当 $p_B>0$ 时，用向量 $(\alpha/\sqrt{p_B},\sqrt{p_B},\beta/\sqrt{p_B})$ 的外积同时实现两条相干，再用非负对角项补足两个端点的单粒子权重。若 $p_B=0$，两条相干都必须为零，单粒子块可直接取为对角矩阵。[共同正扩张的精确判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibMarginalExtension.extendible_iff)

例如两份边缘都取各自边上的纯态 $(|10\rangle+|01\rangle)/\sqrt2$。中间位点的边缘同为最大混态，但此时 $p_A=p_B=p_C=1/2$，且 $q_0=1/2$，两条非零相干都超出了共同扩张的上界。

允许任意相干时，共同扩张仍只需选择一个复数。把整体空间写成 $|010\rangle$ 与两端点的四维空间的直和。设两份边缘在中间位点的约化态相同，因此它们给出相同的中间占用权重 $b=p_B$ 和 $|010\rangle$ 行、$|000\rangle$ 列的矩阵元。令 $L,R$ 为它们在中间位点为空时截出的 $2\times2$ 主块。两份边缘各自还给出 $|010\rangle$ 行中对应本侧端点单占用的矩阵元。于是这一行与端点空间的耦合写成 $v=(v_{00},v_{10},v_{01},z)$，其中 $z$ 对应两份边缘都读不到的 $|101\rangle$ 列。

设 $b>0$，将 $v^\dagger v/b$ 分别对右端和左端取偏迹，得到 $G_A,G_C$。由 Schur 补，共同扩张存在当且仅当 $\operatorname{Tr} L=\operatorname{Tr} R=1-b$，且可选取 $z$ 使余块 $L-G_A$ 和 $R-G_C$ 都半正定。这两个余块有相同的迹 $t$。若 $t>0$，取 $(L-G_A)\otimes(R-G_C)/t$ 便得到有这两个偏迹的半正定矩阵。若 $t=0$，两个余块都为零，取零矩阵即可。加回 $v^\dagger v/b$ 和对应 $|010\rangle$ 的行与列便得到整体态。若 $b=0$，三项已知耦合必须全为零，且 $L,R$ 都须半正定、迹为一，此时端点块直接取 $L\otimes R$。 [任意相干的共同扩张判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentExtension.coherent_extendible_iff)

把左余块乘以 $b>0$，记其两个对角元为 $a,e-|z|^2$，右上元为 $c-\bar k z$。其中 $a=bL_{00}-|v_{00}|^2-|v_{01}|^2$，$e=bL_{11}-|v_{10}|^2$，$c=bL_{01}-\bar v_{00}v_{10}$，$k=v_{01}$。右余块用 $R$ 替代 $L$，并交换 $v_{10},v_{01}$。若 $a>0$，令 $h=a+|k|^2$，把行列式不等式配方即可得到圆心 $p=kc/h$ 和半径平方 $r=(ae-|c|^2+h|p|^2)/h$。若 $a=0$，须满足 $c=\bar k z$ 和 $|z|^2\le e$。这两项约束给出圆盘、单点或空集。$a<0$ 或半径平方为负时，可行集为空。

记两个非空圆盘的圆心为 $p,q$、半径平方为 $r,s$，并令 $d=|q-p|^2$。若 $d>0$，把 $(d+r-s)/(2d)$ 截到 $[0,1]$ 得到 $\lambda$，取 $z=p+\lambda(q-p)$。圆心重合则取共同圆心。只要存在可行的 $z$，这个点就会通过两份余块的半正定检验，圆盘相切时也成立。当 $b=0$ 时直接取 $z=0$，并按前述零占据条件检验。实部和虚部均为有理数的输入可全程使用有理数运算。 [圆盘给出的共同扩张判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentDisks.extendible_iff_selected)

设两份边缘已归一化且 $b>0$。它们唯一确定一个整体态，当且仅当上述两圆盘只交于一点。若唯一交点处的两个 Schur 余块都正定，在它附近仍能选取可行的 $z$，故至少一个余块奇异。共同迹为零时，整体余块也为零。共同迹为正时，奇异的端点余块秩为一，整体余块必须等于两个端点余块的张量积除以共同迹。 [两份边缘唯一确定整体态的判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentExtension.unique_coherent_extension_iff)

例如取 $b=1/4$、$L=R=\operatorname{diag}(1/4,1/2)$，并令 $v_{00}=v_{10}=0$、$v_{01}=1/4$。左余块的左上元为零，半正定性迫使右上元 $-z$ 为零。在 $z=0$ 时，左余块为 $\operatorname{diag}(0,1/2)$，右余块为 $I/4$。两个余块的秩分别是一和二，故联合余块秩为二。加上中位枢轴后，唯一的整体态秩为三。

设 $b\ne 0$ 并固定 $z$。纯扩张存在，当且仅当 $\operatorname{Tr}L=1-b$ 且两份 Schur 余块都为零。迹条件和左余块为零会推出 $b>0$，因为 $b<0$ 时修正项 $v^\dagger v/b$ 的迹非正。纯态中间单占用的振幅为 $x$，其余四个振幅为 $y$。耦合行是 $x\bar y$，且 $|x|^2=b$，所以耦合行决定整个端点块 $v^\dagger v/b$。反过来，取 $x=\sqrt b$ 并从耦合行恢复 $y$ 即可构造纯态。任何具有相同边缘和 $z$ 的半正定扩张，其整体 Schur 余块半正定，且在左端点的约化为零，故其迹为零、余块也为零。这样的扩张只有这一个纯态。 [给定耦合的纯扩张判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentExtension.pure_coherent_iff)

当 $b>0$、边缘数据有理且存在纯扩张时，耦合 $v_{10},v_{01}$ 决定有理性是否还需检查范数。若任一耦合非零，相应端点块的非对角式就能线性解出有理的 $z$，因此纯扩张有理。若两项都为零，边缘只固定 $|z|^2=bL_{11}$，其中 $L_{11}$ 是左端点占据态的对角元。此时有理纯扩张存在恰好等价于 $bL_{11}$ 能写成两个有理平方之和。 [正占据时的有理纯扩张判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibPositiveRationalPurity.positive_rational_purity_iff)

在这类允许复数纯扩张的边缘数据中，最小有理秩由上面的判据完全决定。存在有理纯扩张时，最小秩为一。否则两项耦合都为零，纯态只可能在真空、中间单占据和双端占据三个基态上有非零振幅。把双端占据态与另外两态之间的相干项置零，两份边缘照旧读出原来的占据概率和真空到中间的相干。剩下两个外积，给出最小秩为二的有理扩张。 [复数纯扩张存在时的有理秩上界](lean:D5/S3/Quantum/Entanglement/Marginals/FibPositiveRationalRank.positive_rational_rank_le_two_of_pure)

中位占据为正且固定 $z$ 时，Schur 消元是可逆合同变换。它把正枢轴 $b$ 与端点联合余块分开，所以整体秩等于端点联合余块的秩加一。边缘数据和 $z$ 都有理时，消元和还原均保持坐标有理。在上述迹归一化下，存在秩至多二的有理扩张，当且仅当 $L-G_A$ 与 $R-G_C$ 均半正定、行列式相等，且共同行列式可写成两个有理平方之和。余块的共同迹 $t$ 为正时，两侧同除以 $t$，就能应用两量子位的有理纯态判据。行列式除以 $t^2$ 仍保持平方和条件。共同迹为零时，联合余块消失，整体秩为一。 [固定耦合下的有理秩二判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentRank.rational_rank_le_two_at_iff)

设已知的三个耦合均为零，两端边缘分别为 $L=\operatorname{diag}(\ell,t-\ell)$ 与 $R=\operatorname{diag}(r,t-r)$，其中 $t=1-b$，$b$ 是正有理数，$\ell,r$ 是相异的非负有理数。Schur 修正从两个占据对角元各减去 $|z|^2/b$。令余块行列式相等，得到 $|z|^2=b(t-\ell-r)$，此时两侧余块正是 $\operatorname{diag}(\ell,r)$ 与 $\operatorname{diag}(r,\ell)$。所以有理秩至多二的扩张存在，恰当且仅当 $b(t-\ell-r)$ 和 $\ell r$ 各能写成两个有理平方之和。第一个条件来自未读耦合，第二个来自两端余块的共同行列式。 [对角边缘的有理秩二判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibDiagonalRank.rational_rank_le_two_diagonal_iff)

取 $b=1/2$、$\ell=1/4$、$r=1/16$。共同行列式是 $1/64$，但耦合的模平方必须为 $3/32$。若 $z$ 有理，除以 $(1+i)/8$ 就会得到模平方为三的有理复数，违反模三障碍。复数允许取到这个模平方，两侧余块来自 $(2|001\rangle+|100\rangle)/4$ 的外积。余块的共同迹为 $5/16$，恢复枢轴后复数最小秩为二。取 $z=0$ 并保留同一个外积，再加上 $|010\rangle$ 与 $|101\rangle$ 上的对角权重 $1/2,3/16$，即得最小秩为三的有理扩张。

取 $b=1/4$、$\ell=1/8$、$r=3/8$，耦合条件可由 $z=1/4$ 满足。此时共同行列式为 $3/64$，若它是两个有理平方之和，乘以 $64$ 就会把三表示成两个有理平方之和。把向量 $(|010\rangle+|101\rangle)/2$ 的外积与 $|001\rangle,|100\rangle$ 上的对角权重 $1/8,3/8$ 相加，给出最小秩为三的有理扩张。

这个读不到的矩阵元会影响正性。例如取 $b=1/5$、$v_{00}=v_{10}=v_{01}=1/5$，令 $L,R$ 的各项都等于 $2/5$。取 $z=1/5$ 时两个余块都为零，整体态唯一，是五个合法字的等幅纯态。取 $z=0$ 时左余块的行列式为 $-1/25$，这个取值无法给出正的整体态。

两份边缘的矩阵元若都有有理实部和虚部，只要存在共同扩张，就存在矩阵元同样有理的共同扩张。归一化给出 $b=1-\operatorname{Tr}L$。在 $b>0$ 时，两圆盘的圆心、半径平方和截断后的线段参数都只用有理运算，因此选出的 $z$ 也是有理的，相切时也成立。在 $b=0$ 时取 $z=0$。选定 $z$ 后，两个 Schur 余块的张量积除以共同迹，再加回修正项。共同迹为零时，张量积这一项取零。这样得到迹为一的半正定整体态。 [有理共同扩张判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentDisks.rational_coherent_extendible_iff)

还可以在保持有理坐标的同时降低扩张的秩。取上面选出的有理 $z$。对两个端点余块各做一次 Schur 消元，可把每块写为两个有理秩一投影的非负有理加权和。把两侧权重配成一个 $2\times2$ 表，左上元取两个首项权重中的较小者。这样至少一个非对角元为零。将表中每个非零权重乘以对应投影的张量积再求和，得到秩至多三的有理端点余块。恢复 $b>0$ 的中间占据项只增加一个秩一项，因此有理整体态的秩至多为四。$b=0$ 时整个耦合行消失，端点余块直接给出秩至多三的整体态。 [有理端点余块的秩上界](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitMarginalRank.rational_endpoint_rank_le_three)

当 $b>0$ 且两份有理边缘相容时，添入一个非负有理数的实平方根，就足以把整体秩降到至多三。从上面选出的有理 $z$ 沿水平方向走到两圆盘交集的右端点。这个端点是两个圆盘截面右端点中较早到达的一个，所以只需一个平方根。到达边界时至少一个 Schur 余块奇异。两个余块的归一化张量积秩至多二，恢复中位枢轴只增加一秩。由此得到的矩阵元都在同一个由有理复数和该平方根生成的域中。 [二次扩张上的秩三上界](lean:D5/S3/Quantum/Entanglement/Marginals/FibQuadraticCompletion.quadratic_rank_le_three)

什么时候能直接选到有理的边界耦合？在同样的条件下，存在有理的秩至多三扩张，且 $z$ 位于至少一个圆盘的边界上，恰好有以下三种情形之一。

- 一个圆周在另一圆盘的严格内部有点，且这个圆周的半径平方是两个有理平方之和。有了一个有理圆周点，Cayley 参数化便给出稠密的有理点，因此能在严格内部取点。半径为零时直接取圆心。
- 两个圆重合，且共同的半径平方是两个有理平方之和。
- 圆心相异，令 $t=(d+r-s)/(2d)$，则 $r/d-t^2$ 是某个有理数的平方。同时满足两个圆周方程时，$(z-p)/(q-p)$ 的实部由两式相减固定为 $t$，虚部的平方便是 $r/d-t^2$。相切对应虚部为零。

三种检验都失败时，有理扩张若要达到秩至多三，耦合必须在两圆盘的严格内部。内点处的两个 Schur 余块可能都满秩，此时需要直接构造秩至多二的端点联合余块。 [有理边界耦合的秩三判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibRationalBoundary.rational_rank_three_boundary_iff)

::: {.remark #rem-ch39-fib-meyer-rank-three title="任一可行有理耦合的秩三上界"}
对任一可行的有理 $z$，只要 $b>0$，就能用有理矩阵把整体秩控制在三以内。两个 Schur 余块的共同迹为零时，联合余块也为零。一块奇异且共同迹为正时，归一化张量积的秩至多为二。其余情形先用共同迹归一化，把两侧写成 $(I+\sigma(a))/2$ 和 $(I+\sigma(c))/2$，其中 $\sigma$ 是 Pauli 矩阵的线性组合，$a,c\in\mathbb Q^3$ 是 Bloch 向量。正定性给出 $|a|,|c|<1$。等长情形可用等谱投影构造，异长情形交换两端后可设 $|a|<|c|$。 [等谱的有理秩二构造](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitEqualSpectrumRank.rational_endpoint_rank_le_two_of_equal_det)

在五维有理超平面 $a\cdot y=c\cdot v$ 上，考察二次型

$$
|y|^2-(1-|c|^2)|v|^2-(c\cdot v)^2.
$$

取 $v=0$ 和非零 $y\perp a$ 可得正值，取 $y=0$ 和非零 $v\perp c$ 可得负值。二次型若退化，根空间本身含非零有理零点。非退化时，Meyer 定理保证存在非零有理零点。因为 $1-|c|^2>0$，这个零点的 $y,v$ 均非零。将 $y,v$ 代入有理 Pauli 投影构造，得到两侧归一化余块的秩二联合态。乘回共同迹，再恢复中位枢轴，整体秩至多为三。上面的复秩二、有理秩三算例表明这个统一有理上界可以达到。零点存在性来自 Meyer 定理，Lean 核验覆盖给定零点后的矩阵构造。 [Serre《A Course in Arithmetic》，第四章 §3.2，推论 2](https://doi.org/10.1007/978-1-4684-9884-4) · [给定有理零点的秩二构造](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitProjector.rational_rank_two_of_quadratic_witness)

若一侧归一化余块恰为最大混态，即 $a=0$，四平方定理给出模平方为 $1-|c|^2$ 的有理四元数 $H$。取非零有理向量 $v$ 同时垂直于 $c$ 和 $H$ 的虚部，再把 $v$ 看作纯虚四元数。$Hv$ 的实部为零，且其虚部 $y$ 满足 $|y|^2=(1-|c|^2)|v|^2$。这给出了上述投影所需的有理零点。 [最大混态端点的秩二构造](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitMixedEndpoint.rational_rank_two_of_maximally_mixed_endpoint)
:::

若还要求整体态为纯态，有理性取决于一个范数方程。设两份边缘都是 $\operatorname{diag}(0,b,1-b)$，其中 $b$ 为有理数。真空读数为零迫使纯态只支撑在 $|010\rangle,|101\rangle$ 上。两态的权重分别为 $b,1-b$，因此耦合 $z$ 必须满足 $|z|^2=b(1-b)$。反过来，$b>0$ 时用振幅 $\sqrt b,\bar z/\sqrt b$ 即可构造所需纯态，$b=0$ 时取 $|101\rangle$。给定 $b,z$，一个所有矩阵元都取有理实部和虚部的纯扩张存在，当且仅当 $b$、$z$ 的实部和 $z$ 的虚部都是有理数，且满足这个范数等式。因此对给定的有理 $b$，有理纯扩张存在恰好等价于 $b(1-b)$ 是两个有理平方之和。 [有理纯扩张判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibRationalPureExtension.rational_pure_coupling_iff)

例如 $b=1/4$ 时，$z=\sqrt 3/4$ 给出纯态。若 $z$ 的两坐标都是有理数，乘以四后便可把三写成两个有理平方之和。清除分母所得整数等式左边是两个平方之和，右边是三乘以一个平方，三的指数为奇数，故无解。把 $|010\rangle,|101\rangle$ 按权重 $1/4,3/4$ 作对角混合，仍可得到有理共同扩张。

当中间位点的占用权重 $b=0$ 时，纯扩张还要求两端点的约化态有相同特征值。四个耦合 $v_{00},v_{10},v_{01},z$ 必须为零，且 $L,R$ 须半正定、各自迹为一、行列式相等。这些条件也充分。把端点振幅排成矩阵 $M$，两端读数是 $MM^\dagger$ 和 $(M^\dagger M)^\mathsf T$，它们有相同特征值。反过来，两个 $2\times2$ 块的迹和行列式决定其特征值。把共同特征值的平方根作为 Schmidt 系数，配上两侧各自的特征向量，就得到所需的纯态。比如 $L=I/2$、$R=\operatorname{diag}(1,0)$ 时，$L\otimes R$ 给出混合扩张，而行列式分别为 $1/4$ 和 $0$，因此纯扩张不存在。 [零占据时的纯扩张判据](lean:D5/S3/Quantum/Entanglement/Marginals/FibCoherentExtension.pure_coherent_zero_iff)

若两端点块的矩阵元还都有有理实部和虚部，就有额外的算术条件。有理纯扩张存在恰好等价于两块的行列式相等，且共同的行列式能写成两个有理平方之和。纯态密度矩阵的任一非零列都给出一组有理的射影振幅。把振幅排成 $2\times2$ 矩阵后，其行列式除以所选列的对角元，所得复数的模平方恰是边缘的行列式。[有理纯扩张的行列式判据](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitPurity.rational_qubit_purity_iff)

两端同谱时，有理扩张的秩至多为二。记 $H=L-I/2$、$K=R-I/2$ 和 $s=1/4-\det L$。当 $s\ne0$ 时，$H^2=K^2=sI$，所以 $P=(I+H\otimes K/s)/2$ 是秩二投影。把 $L\otimes I$ 压缩到这个投影上，即得有理的半正定整体态。对两端分别取部分迹，利用 $\operatorname{Tr}K=0$ 和 $\operatorname{Tr}(LH)=2s$，便恢复 $L$ 与 $R$。当 $s=0$ 时，两端都为 $I/2$，可等权混合 $|000\rangle$ 和 $|101\rangle$。 [同谱边缘的有理秩二上界](lean:D5/S3/Quantum/Entanglement/Marginals/RationalQubitEqualSpectrumRank.rational_endpoint_rank_le_two_of_equal_det)

最小有理秩为一还是二，取决于共同行列式能否写成两个有理平方之和。 例如两端同为 $\operatorname{diag}(1/4,3/4)$，共同的行列式为 $3/16$，仍受上面的模三障碍限制。按权重 $1/4,3/4$ 对角混合 $|000\rangle,|101\rangle$，可得到秩二的有理扩张。

若观测区域是长度为 $n$ 的开链上的等宽窗口，秩可以直接由窗口间距算出。禁止连续 $K$ 个一，记 $a_\ell$ 为长度 $\ell$ 的合法字数，$b_\ell=a_\ell^2$，且 $b_0=1$。取 $m\ge1$ 个宽度为 $1\le k\le n$ 的窗口，起点严格递增，相邻起点之差为 $g_1,\ldots,g_{m-1}$。联合偏迹的秩为

$$
b_k+\sum_{i=1}^{m-1}\bigl(b_k-b_{\max(k-g_i,0)}\bigr).
$$

在连续的长度 $\ell$ 区域外补零，给出长度 $\ell$ 合法字与该区域所支持的全链合法字之间的双射，故区域支持 $b_\ell$ 个有序字对。一个新窗口与任何更早窗口的交集都包含在它与前一窗口的交集中，故前一窗口给出全部重复计数的字对。即使窗口互不相交，它们仍共享全零字对。取遍所有滑动窗口得到 $b_k+(n-k)(b_k-b_{k-1})$。 若禁止相邻的一，$a_\ell=F_{\ell+2}$，其中 $F_0=0$、$F_1=1$。这是按首位分为 $0$ 和 $10$ 后得到的递推。 对于任意有序区域，只减去相邻交集的字对数恰好给出联合秩，当且仅当对于每个可以单独合法占用的位点，包含该位点的任意两个区域之间的区域也都包含它。 [具有连续出现性质的区域秩公式](lean:D5/S3/Quantum/Entanglement/Marginals/LocalMarginalRunningIntersection.finrank_add_adjacentOverlap_iff)

给定窗口数 $m\ge2$，最大秩可由跨满两端且间距尽量均匀的窗口取得。 将最外侧的窗口向两端移动，可使间距总和增至 $n-k$，秩也不会下降。$b_\ell-b_{\ell-1}$ 数的是至少有一个字占用末位的有序字对。在两字前同时补零给出下一长度中同类字对的单射，因此这些差非递减。相应地，增大一个间距所带来的秩增量随间距非递增，达到 $k$ 后为零。把一步间距从较大的间隔移给较小的间隔，直到两者至多相差一，秩不会下降。

::: {.example #ex-ch39-fib-forbidden-window-coherence title="禁戒窗口中的相干"}
对禁止连续 $K$ 个一的长度 $n\ge K$ 的开链，两份单点偏迹完全相同的密度矩阵可以在一对字之间有不同的矩阵元，当且仅当每个长度为 $K$ 的窗口都同时含有 $(0,1)$ 和 $(1,0)$ 两类位点。保持两字不同的位点不动，让它们相同的位点同时改变。每个偏迹等式都要求共同位取零和取一的两项互为相反数，所以一个非零矩阵元迫使所有共同位的赋值都落在合法支撑内。将共同位全部设为一便足以检查全部赋值。此时，每个禁戒窗口在两个字内都必须各自留有一个零。[二值偏迹的精确支撑判据](lean:D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionSupport.survives_iff)

对任何满足条件的模式，可以在每次翻转一个共同位时反转矩阵元的符号。不同的位点包含两种方向，所以有序模式与其转置的支撑互不相交。加上伴随便得到一个非零厄米矩阵，其单点偏迹和迹都为零。在合法子空间的归一化单位矩阵上加减这个矩阵的足够小倍数，就得到实现这种差异的两份密度矩阵。以 $K=3$ 为例，$(010,100)$ 和 $(011,101)$ 属于同一模式。迹去共同的末位时，两项相消。迹去任一不同的位点时，两项都为零。
:::

::: {.theorem #thm-ch39-omega-fib-integer-deletion lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionSignTensor.deleteSite, D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionSignTensor.actualEntry" title="二值位型的整数偏迹见证"}
按位记录一对二值字是同值、从零到一，还是从一到零。同值位在 $00$ 上取系数 $1$，在 $11$ 上取 $-1$。不同位只在指定的有序取值上取系数 $1$。其余系数为零。对任意有限位型，把逐位系数相乘。固定删除位以外的两个字，并令两字的前缀长度均等于删除位之前的位型长度。给两字同时补零、再同时补一，所得两个整数系数之和为零。若取所有共同位均为零的代表，两字在不同位按位型取值，则系数为 $1$。
:::

::: {.proof}
在删除位上，补零与补一得到的局部系数互为相反数。向前每恢复一位，就给两项乘同一个系数。系数 $1$ 的代表在每个位点都取局部系数 $1$。两条声明与系数程序的公理依赖均为空。完整证明由 Lean 内核检查。
:::

例如，对禁三连占位的三位链，取有序对 $(010,100)$，共同的末位也可同时取一，得到 $(011,101)$。令

$$
\begin{aligned}
u_\pm&=|010\rangle\pm|100\rangle,\\
v_\pm&=|011\rangle\mp|101\rangle.
\end{aligned}
$$

矩阵 $(u_\pm u_\pm^\top+v_\pm v_\pm^\top)/4$ 各自是迹一的正半定矩阵，且共用整数分母 $4$。两者的对角线和全部单点偏迹相同。在这四个合法字上，以 $+1$ 交换前一对、以 $-1$ 交换后一对，并在其余字上取零，所得联合可观测量的期望分别为 $+1$ 与 $-1$。见 [@ex-ch39-fib-forbidden-window-coherence]。

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

::: {.theorem #thm-ch39-fib-triple-kernel-word-count lean="D5/S3/Quantum/Entanglement/Marginals/TripleDeletionCountComparison.triple_kernel_exact" title="禁三连占位时，偏迹核维数小于合法字数的两倍"}
在长度为 $n\ge3$ 的禁三连占位开链上，记 $a_n$ 为合法字数，$d_n$ 为合法支撑上所有单点偏迹为零的复矩阵空间的维数。令 $T_j$ 是初值为 $0,1,1$ 的三项斐波那契数列。则

$$
a_n=T_{n+2},\qquad
d_n=4(T_n+T_{n-1})<2a_n.
$$

也可写成 $d_n=4(a_{n-2}+a_{n-3})$。
:::

::: {.proof}
合法字可按开头的 $0$、$10$、$110$ 分组。去掉开头后，剩余部分是缩短后的任意合法字。这给出合法字数的三项递推，长度为零、一、二时分别有 $1,2,4$ 个字，所以 $a_n=T_{n+2}$。将 $4(T_n+T_{n-1})$ 与 [@thm-ch39-fib-forbidden-triple-dimension] 的前三个维数比较，得到相同的 $12,24,44$。两者满足同一个三项递推，所以对所有 $n\ge3$ 相等。

由 $T_{n+1}=T_n+T_{n-1}+T_{n-2}$ 得 $T_n+T_{n-1}<T_{n+1}$，因为 $T_{n-2}>0$。再代入 $a_n=T_{n+1}+T_n+T_{n-1}$，得到严格不等式。完整证明由 Lean 内核检查。
:::

两倍合法字数与核维数之差恰为 $2T_{n-2}$。这个差在 $n\ge3$ 时严格为正。长度二时，还没有三位禁戒窗口，四个字都合法。三种位型符号可在两位任意组合，因此核维数是 $3^2=9$，已超过合法字数的两倍。

::: {.theorem #thm-ch39-fib-forbidden-four-recurrence lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionGrowth.kernelDimension_four_recurrence" title="禁四连占位时偏迹核的递推"}
在长度为 $n$ 的开链上禁止连续四个 $1$。记 $d_n$ 为合法支撑上所有单点偏迹为零的复矩阵空间的维数。对 $n\ge4$，

$$
d_{n+6}+d_{n+1}+d_n
=d_{n+5}+2d_{n+4}+2d_{n+3}+2d_{n+2}.
$$
:::

::: {.proof}
每个四位窗口都必须出现两种变化方向。首个窗口确定两种方向距当前末端的距离以及较近的方向。此后的每个符号确定唯一一次合法转移，反过来每条转移路径也确定唯一的位型。按下文的六种距离对计数，六步转移与一步转移再加恒等转移，等于五步转移加上四步、三步、两步转移各两份。对所有首窗口求和，得到递推。完整证明由 Lean 内核检查。
:::

初值可通过数首窗口手算。距离为 $a<b$ 时，较近方向有两种选法，两次出现之间每位可填较近方向或共同位，较早的其余位置有三种选法。六种距离对的计数依次为 $18,12,8,6,4,2$。沿六状态转移相加，得到 $d_4,\ldots,d_9$ 依次为 $50,122,290,674,1562,3658$。

::: {.theorem #thm-ch39-fib-forbidden-window-growth lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionGrowth.kernelDimension_lower" title="禁戒窗口长度至少为四时的偏迹核增长"}
在长度为 $n=k+2$ 的开链上禁止连续 $K\ge4$ 个 $1$。记 $d_{n,K}$ 为合法支撑上所有单点偏迹为零的复矩阵空间的维数。则

$$
d_{n,K}\ge (100/43)^k.
$$
:::

::: {.proof}
固定头两位为相反方向。每次追加符号时，要求最近四位仍含两种方向。按最近一次出现的先后，记录两种方向距末位的距离。六种可能的距离对依次为 $(0,1),(0,2),(0,3),(1,2),(1,3),(2,3)$，赋予权重 $100,75,43,58,32,18$。每一步可选共同位或两种方向之一。若某个方向的距离会达到四，就必须选这个方向。逐状态相加，所有合法后继的权重之和至少是当前权重的 $100/43$ 倍。

起始权重和最大单个权重都是 $100$。追加 $k$ 位后，所有路径的末状态权重之和至少为 $100(100/43)^k$，所以至少有 $(100/43)^k$ 个不同位型。每个长度 $K\ge4$ 的窗口都含一个四位窗口，因此这些位型都计入 $d_{n,K}$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch39-fib-forbidden-window-growth-relative lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionGrowth.kernelDimension_to_allowedCount" title="偏迹核维数相对合法字数的增长"}
在同一条链上，记 $a_{n,K}$ 为合法字数，也就是合法希尔伯特空间的维数。则

$$
\frac{d_{n,K}}{a_{n,K}}\ge\frac{(50/43)^k}{4}.
$$
:::

::: {.proof}
合法字数至多为 $2^{k+2}$，且包含全零字。用上一定理的下界除以这个正分母的上界。完整证明由 Lean 内核检查。
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

- [O.1.1 直接编码器的秩与纠缠熵](ch39-s05-s07-s01-rank-and-entropy.md)
- [O.1.2 局域父哈密顿量与热浴链](ch39-s05-s07-s02-parent-and-heatbath.md)
- [O.1.3 固定禁戒长度下的一致谱隙](ch39-s05-s07-s03-uniform-gap.md)
