# M.2.2 加权近碰撞与缺失窗口的起点范围 {#加权近碰撞与缺失窗口的起点范围}

有限阶尾段矩给出了任意晚的缺失窗口。若要约束起点离搜索下界有多远，还须知道频率组合在有限分辨率下有多接近。两个不同组合越接近，它们的相位差就越难在给定时间内被平均掉。

设 $J$ 是有限指标集，$g,w:J\to\mathbb R$，权重 $w_j\ge0$。写 $Z(t)=\sum_j w_j e^{ig_jt}$。对每个满足 $\sum_j m_j=p$ 的非负整数向量 $m$，记

$$
G_m=\sum_j m_j g_j,\qquad c_m=\binom{p}{m}\prod_j w_j^{m_j},\qquad
E_p(\eta)=\sum_{m,n:\,|G_m-G_n|\le\eta}c_mc_n.
$$

这里计入所有有序对，包括 $m=n$ 与不同向量产生的相同频率。令 $M_L(s)$ 为 $|Z(s+x+y)|^{2p}$ 的平均，其中 $x,y$ 独立且均匀分布在 $[-L/2,L/2]$。

::: {.theorem #thm-ch31-weighted-tail-moment-comparison title="有限时间矩与加权近碰撞质量" lean="D5/S3/Fourier/Concentration/FiniteSincCollisionMoment.tail_moment_comparison"}
对上述有限数据、任意自然数 $p$、$L>0$ 和 $s\in\mathbb R$，记 $K=3+\pi^2/3$，则

$$
\sin^2(1) E_p(2/L)\le M_L(0),\qquad M_L(s)\le M_L(0)\le K E_p(2/L).
$$
:::

::: proof
展开 $Z^p\overline Z^p$，每个有序对的角频率为 $\Delta=G_m-G_n$。独立的两个均匀偏移各贡献一个 $\operatorname{sinc}(L\Delta/2)$。取实部后，配对因子为 $\cos(s\Delta)\operatorname{sinc}^2(L\Delta/2)$。余弦不超过一，因此平均在 $s=0$ 处取得最大值。由正弦在 $[0,1]$ 上的凹性和 $\operatorname{sinc}$ 的偶性，$|\Delta|\le2/L$ 时平方因子至少为 $\sin^2(1)$。

把各 $G_m$ 按宽度 $2/L$ 分箱，令 $b_k$ 为第 $k$ 箱的系数总和。两个箱相隔 $d\ge2$ 时，平方因子至多为 $(d-1)^{-2}$。同箱和邻箱用上界 $1$。每行的上界之和至多为 $3+2\sum_{n\ge1}n^{-2}=K$。由 $2b_kb_\ell\le b_k^2+b_\ell^2$，总平均至多为 $K\sum_k b_k^2$。同箱的频率差小于箱宽，故 $\sum_k b_k^2\le E_p(2/L)$。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-bounded-tail-window-start title="缺失窗口的起点范围" lean="D5/S3/Fourier/Concentration/FiniteSincCollisionMoment.exists_bounded_tail_window"}
给定上述有限数据、自然数 $p$、正整数 $N$、$L>0$、$\delta\ge0$ 及实数 $H,A$，记 $B=\sum_j w_j|g_j|$。若 $KNE_p(2/L)<\delta^{2p}$，则存在 $a\in(A,A+2L)$，使得

$$
\left|\sum_j w_j\sin(g_jt)\right|<\delta+\frac{HB}{2N}\qquad(t\in[a,a+H]).
$$
:::

::: proof
在 $A+L$ 附近取两个均匀偏移，对全部 $N$ 个网格点的矩之和取平均。由双边矩估计的上界和严格预算，平均小于 $\delta^{2p}$。因此存在一个公共起点，使每个网格点的 $|Z|$ 都小于 $\delta$。两个均匀偏移都可取在开区间，其和给出 $A<a<A+2L$。虚部绝对值不超过复数模，当 $H>0$ 时，用 $N$ 个等长子区间的中点作网格。闭窗口中的每一点距某个中点至多 $H/(2N)$，斜率界补上相应误差。$H=0$ 时，所有网格点都在起点。若 $H<0$，窗口为空。完整证明由 Lean 内核检查。
:::

## 由区间包络得到循环群证书

取整数 $a_j$ 和步长 $s$，设已有严格误差界 $|g_j-sa_j|\le e$。对每个 $p$ 次向量记 $A_m=\sum_jm_ja_j$。沿用 $E_p$ 的系数 $c_m$，令 $C_q(R)$ 为满足 $A_m-A_n\bmod q\in R$ 的有序对的 $c_mc_n$ 之和。记 $R_q(H)$ 为整数区间 $[-H,H]$ 在模 $q$ 下的像。每个剩余类只计一次，$H<0$ 时像为空集。

::: {.theorem #thm-ch31-cyclic-collision-upper title="包络给出碰撞质量的上界" lean="D5/S3/Fourier/Concentration/CyclicCollisionCertificate.tailCollisionMass_le_cyclic"}
设权重非负，$e\ge0$。若 $s>0$ 且 $H=\lfloor (t+2pe)/s\rfloor$，则
$$
E_p(t)\le C_q(R_q(H)).
$$
:::

::: proof
有符号间距的误差至多为 $e\sum_j|m_j-n_j|\le2pe$。因此，绝对值至多为 $t$ 的实间距对应一个满足 $|A_m-A_n|\le(t+2pe)/s$ 的格点间距。格点间距为整数，其剩余类属于 $R_q(H)$。每对的权重均非负。
:::

::: {.theorem #thm-ch31-cyclic-collision-lower title="格点跨度界排除模回绕" lean="D5/S3/Fourier/Concentration/CyclicCollisionCertificate.cyclicCollisionMass_le_tail_of_no_wrap"}
设权重非负、$s,e\ge0$，且 $l,u,H$ 为整数。若每个 $a_j\in[l,u]$ 且 $p(u-l)+H<q$，则
$$
C_q(R_q(H))\le E_p(sH+2pe).
$$
:::

::: proof
格点间距的绝对值至多为 $p(u-l)$。若它有代表元 $z\in[-H,H]$，两者之差为 $q$ 的倍数且绝对值小于 $q$，所以间距等于 $z$。坐标误差对实间距的影响至多为 $2pe$。
:::

::: {.theorem #thm-ch31-cyclic-collision-fourier title="用有限特征标平均计算碰撞质量" lean="D5/S3/Fourier/Concentration/CyclicCollisionCertificate.cyclicCollisionMass_fourier"}
设 $q$ 为正整数，记 $\chi_k(x)=\exp(2\pi i kx/q)$ 与 $S(k)=\sum_jw_j\chi_k(a_j)$。对任意实权重和剩余类集合 $R$，
$$
qC_q(R)=\sum_{k\bmod q}|S(k)|^{2p}\sum_{y\in R}\chi_k(-y).
$$
:::

::: proof
按次数向量展开 $S(k)^p$，乘上它的复共轭。对 $k$ 求和后，只保留 $A_m-A_n=y\bmod q$ 的项。riemann-hypothesis 仓库用连续特征标平均同样筛出频率差。 [特征标平均，第 32–78 行](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78)
:::

对 $p\ge1$、$t>0$，选步长 $s=t/(4p)$ 的最近格点，误差至多为 $s/2$。取 $e=s/2$ 得 $H=5p$。若实频率落在宽度为 $D$ 的区间，整数坐标跨度满足 $u-l\le D/s+1$，故取 $q>4p^2D/t+6p$ 即可。于是 $E_p(t)\le C_q(R_q(5p))\le E_p(3t/2)$。应用于固定 ζ 纵坐标时，需要经过认证的坐标包络和权重。已有有限高度内的严格区间算术零点计算。上述模数是计算完整特征标和的一种充分选择，在固定 $p,D$ 时随 $1/t$ 增长。能否在次数增长且分辨率指数缩小时，用可行的计算得到所需加权界，仍待解决。 [Platt 与 Trudgian 的有限高度验证](https://arxiv.org/abs/2004.09765)

### 在多个素数模数下控制回绕

较小的模数可以把格点差落在带外的配对计入。对互异素数取平均时，一个配对最多被多少个模数额外计入，由其平移间距的素因子数给出上界。

::: {.theorem #thm-ch31-prime-cyclic-excess title="素数模数给出额外碰撞质量的总上界" lean="D5/S3/Fourier/Concentration/PrimeCyclicCollisionBudgets.sum_cyclic_excess_le"}
设 $H$ 为非负整数，$L_H$ 是满足 $|A_m-A_n|\le H$ 的配对的加权质量。权重非负，总和为 $W=\sum_jw_j$。设所有 $p$ 次格点差的绝对值至多为自然数 $D$。令 $P$ 为有限素数集，其中每个素数至少为自然数 $Q\ge2$。若非负整数 $B$ 满足
$$
Q^{B+1}>\prod_{y=-H}^H|D-y|,
$$
则
$$
0\le \sum_{q\in P}\bigl(C_q(R_q(H))-L_H\bigr)
\le \min(B,|P|)\bigl(W^{2p}-L_H\bigr).
$$
:::

::: proof
每个带内配对在所有模数下都计入。对带外配对记 $d=A_m-A_n$。因带关于零对称，每个计入该配对的素数都整除 $\prod_{y=-H}^H(|d|-y)$，其中各因子均为正。这些互异素数的乘积整除该乘积，并且至少为 $Q$ 的素数个数次幂。由 $|d|\le D$ 和严格不等式可知，这一素数个数至多为 $B$。再对配对加权求和。Gallagher 的大筛法对单个差值使用了同样的整除步骤。 [Gallagher，定理 1 的证明](https://doi.org/10.4064/aa-18-1-77-81)
:::

零剩余类本身限制了循环群证书能有多小。在特征标公式中取 $R=\{0\}$。各项均为非负矩，$k=0$ 的项为 $W^{2p}$。因此只要 $H\ge0$，就有 $C_q(R_q(H))\ge W^{2p}/q$。若用单个循环群证书验证缺失窗口的预算，必须满足 $q>KN(W/\delta)^{2p}$。若对非空素数集 $P$ 取平均，同一不等式中的 $q$ 换为各模数的调和平均。

采用[方差界](ch34-s28-s03-s02-collision-variance.md)中的 ζ 尾段参数，单个模数或平均中的调和平均必须满足 $\log q\ge\log N+2p\log\log T-O(p)$。逐项计算特征标和时，模数 $q$ 对应 $q$ 项。取平均时，至少一个模数不小于调和平均。能否在目标分辨率下以可行的渐近成本界定加权质量，仍待解决。

对实际 ζ 纵坐标，可按前一节在 $X=e^{-D}T^\beta$ 以上截取尾段，并取 $\delta=\log T$、$g_\gamma=\gamma/r$。给定 $H=\exp(cT^\beta\log T)$，可取 $N=\lfloor HT^2/r\rfloor_++1$，使网格误差不超过 $rB/(2T^2)$。要得到有限的起点范围，还需在某个 $L=L(T)$ 上证明相应的严格预算 $KNE_p(2/L)<(\log T)^{2p}$。目标阶数 $p$ 随 $T^\beta\log T$ 增长。对固定的有限尾段和固定 $p$，随着 $L$ 增大，$E_p(2/L)$ 最终等于精确碰撞质量 $E_p(0)$。若要量化 $L$，仍须控制正分辨率下的加权近碰撞。Tao、Trudgian 与 Yang 的定义 7 计数的是单位尺度的无权四元组，定理 64 的估计适用于固定的 $\sigma\ge7/10$。临界线尾段的增长阶数加权界仍待证。 [定义 7 与定理 64](https://arxiv.org/html/2501.16779v1) · [研究问题](https://github.com/the-omega-institute/trureturing/issues/33519)

## 有限频带中的和必须接近

设有限指标集 $J$ 有 $N$ 个元素，各频率 $g_j$ 落在 $[a,b]$。记 $F(m)=\sum_jm_jg_j$，次数为 $p$ 的向量共有 $M=\binom{N+p-1}{p}$ 个。

::: {.theorem #thm-ch31-degree-spectrum-packing title="有限频带中必有接近的同次频率和" lean="D5/S3/Fourier/Concentration/DegreeSpectrumPacking.exists_close_degree_vectors"}
若 $M\ge2$，则存在两个不同的非负整数向量 $m,n$，各自次数为 $p$，且
$$
|F(m)-F(n)|\le \frac{p(b-a)}{M-1}.
$$
:::

::: proof
若两个和相等，差即为零。否则将 $M$ 个和从小到大排列。它们都落在 $[pa,pb]$，所以最小的相邻差至多为 $p(b-a)/(M-1)$。只有两个频率且它们恰为 $a,b$ 时，这些和构成等差数列，上界可取到。
:::

取固定 $0<\beta<1$，并令 $X=e^{-D}T^\beta$。临界线上的简单零点比例有正的下界。黎曼–冯·曼戈尔特公式给出 $N(T)\asymp T\log T$，而 $X$ 以下的零点数为 $o(T\log T)$。因此该尾段至少有常数倍 $T\log T$ 个不同纵坐标。若 $p\asymp T^\beta\log T$，则
$$
\log M\ \ge\ p\log(N/p)\ \gtrsim\ T^\beta(\log T)^2.
$$
这里 $M\ge(N/p)^p$ 来自多重组合数的乘积公式。对 $g_\gamma=\gamma/r$，频带宽度至多为 $T/r$。于是对任意固定 $c>0$，当 $T$ 足够大时，必有不同的 $p$ 次向量在 $\exp(-cT^\beta\log T)$ 的分辨率内发生碰撞。所需的算术估计必须控制这些配对的总权重，容许个别近碰撞。[简单零点比例，§1.1 与 §8](https://arxiv.org/html/1802.10521)

## 局部统计在截点变化下的误差

频率向下舍入后，是否落在给定的高度区间内可能发生变化。局部测试只计入频率彼此接近的元组，所以改变截点的影响取决于每个变动索引附近还有多少索引。

::: {.theorem #thm-ch31-local-statistic-cutoff title="改变截点时的局部元组统计" lean="D5/S3/Fourier/Concentration/LocalStatisticCutoffs.local_statistic_cutoff"}
设 $S,T$ 是带实频率 $g_j$ 的有限索引集的非空子集。记 $s=|S|$、$t=|T|$、$b=|S\triangle T|$。固定自然数 $k$，给每个由 $k+1$ 个不同索引组成的有序元组赋实值分数，其绝对值至多为 $M\ge0$。只要分数非零，元组中的每个频率与第一个频率的距离就至多为 $R$。假设对 $S\cup T$ 中每个索引，$S\cup T$ 中与其频率距离至多为 $2R$ 的索引数至多为自然数 $D$。以 $A(U)$ 表示完全包含于 $U$ 的元组分数之和，令 $L=M(\max(D-1,0))_k$，其中下标 $k$ 表示下降阶乘。则

$$
\left|\frac{A(S)}{s}-\frac{A(T)}{t}\right|
\le \min\left\{\frac{L\bigl((k+1)b+|s-t|\bigr)}{\max(s,t)},\,2L\right\}.
$$
:::

::: proof
只有含有 $S\triangle T$ 中索引的元组能改变未归一化的和。标记这样一个索引及其位置。对分数非零的元组，其余频率与被标记频率的距离均至多为 $2R$，剩余 $k$ 个位置从邻域中去掉被标记索引后选取，且各位置的索引互不相同。对 $k+1$ 个位置及 $b$ 个变动索引求和，可将 $|A(S)-A(T)|$ 控制在 $L(k+1)b$。

单独估计一个和时只标记首位，于是对 $U=S,T$ 有 $|A(U)|\le |U|L$。先用较大的分母比较两个未归一化的和，再用此界控制较小集合的归一化调整。归一化后每个和的绝对值至多为 $L$，两者之差至多为 $2L$。完整证明由 Lean 内核检查。
:::

对以首频率为基点的 $k$ 个缩放差值，若测试函数的支撑在 $[-R_0,R_0]^k$ 内，尺度 $\lambda>0$ 对应定理中的半径 $R=R_0/\lambda$。考虑 ζ 的正纵坐标，按索引保留重数，或选取尾段索引数至少为常数倍 $T\log T$ 的子集。取上截点 $T$ 和下截点 $X=cT^\alpha$，其中 $c>0$ 和 $0<\alpha<1$ 固定。把每个 $g_j$ 按步长 $2^{-\lceil(\log_2(2+g_j))^2\rceil}$ 向下舍入，分别按原高度和舍入高度在 $(X,T]$ 内选取索引。

两组索引的并集所对应的原高度都大于 $X$。记 $h=2^{-\lceil(\log_2(2+X))^2\rceil}$，则对称差只来自 $(X,X+h]$ 和 $(T,T+h]$。黎曼–冯·曼戈尔特估计表明，该尾段内任一固定宽度区间所含的纵坐标数为 $O(\log T)$，计入重数。若 $\lambda$ 有固定正下界，舍入谱中半径 $2R_0/\lambda$ 的邻域也满足 $D=O(\log T)$，因为相应原高度落在放宽至多 $h$ 的邻域内。对固定的 $k$ 和测试函数，分别选取截点造成的归一化误差为 $O((\log T)^k/T)$。 [Hasanalizade–Shen–Wong，定理 1.1](https://arxiv.org/abs/2107.06506)

在共用索引上，Lipschitz 测试的每项舍入误差至多为 $K\lambda h$。因此对固定的紧支撑 Lipschitz 测试，若 $\lambda$ 有固定正下界且至多按 $T$ 的固定幂增长，两种统计在极限存在时具有相同的极限。舍入谱仍可有较大的高阶精确碰撞质量。原纵坐标在更细分辨率下的上界仍待证。
