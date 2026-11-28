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

若把 $P$ 中若干素数相乘，一个配对要计入乘积模数，就必须有同一个带内位移适用于所有因子。例如，取 $H=1$、$d=6$。模 $3$ 时可用位移 $0$，模 $5$ 时可用位移 $1$，而 $6$ 模 $15$ 不等于 $-1$、$0$ 或 $1$ 中任何一个的余数。

::: {.theorem #thm-ch31-prime-product-excess title="素数乘积模数下的碰撞额外质量" lean="D5/S3/Fourier/Concentration/PrimeProductCollisionBudgets.sum_prime_product_cyclic_excess_le"}
设 $r,B_0$ 为非负整数，且 $D+H<Q^{B_0+1}$，沿用上面的 $P,Q,H,D,L_H,W$ 和非负权重。对每个 $r$ 元子集 $S\subseteq P$，记 $q_S=\prod_{q\in S}q$。这些乘积模数的额外质量满足

$$
\begin{aligned}
0 &\le \sum_{\substack{S\subseteq P\\|S|=r}}\bigl(C_{q_S}(R_{q_S}(H))-L_H\bigr)\\
  &\le \min\!\left\{\binom{|P|}{r},(2H+1)\binom{\min(B_0,|P|)}{r}\right\}
    (W^{2p}-L_H).
\end{aligned}
$$
:::

::: proof
对一个带外格点差 $d$，固定 $y\in[-H,H]\cap\mathbb Z$。每个子集 $S$ 若以 $y$ 为共同位移，其中所有素数都整除同一个非零整数 $d-y$。由于 $|d-y|\le D+H$，满足这一条件的 $P$ 中的素数至多有 $B_0$ 个。对每个位移计数，再对 $2H+1$ 个位移取并集，得到每个带外配对最多被计入的子集数。最后以配对权重求和。当 $r>B_0$ 时，所有选出的乘积模数都给出精确的格点带内质量 $L_H$。

完整证明由 Lean 内核检查。
:::

零剩余类本身限制了循环群证书能有多小。在特征标公式中取 $R=\{0\}$。各项均为非负矩，$k=0$ 的项为 $W^{2p}$。因此只要 $H\ge0$，就有 $C_q(R_q(H))\ge W^{2p}/q$。若用单个循环群证书验证缺失窗口的预算，必须满足 $q>KN(W/\delta)^{2p}$。若对非空素数集 $P$ 取平均，同一不等式中的 $q$ 换为各模数的调和平均。 这个限制也适用于乘积模数。

采用[方差界](ch34-s28-s03-s02-collision-variance.md)中的 ζ 尾段参数，单个模数或平均中的调和平均必须满足 $\log q\ge\log N+2p\log\log T-O(p)$。逐项计算特征标和时，模数 $q$ 对应 $q$ 项。取平均时，至少一个模数不小于调和平均。能否在目标分辨率下以可行的渐近成本界定加权质量，仍待解决。

即使知道两个模数上完整的边缘分布，也无法由各自的碰撞质量确定联合碰撞质量。模六下，令 $P$ 在剩余类 $0,3,4$ 上分别取权重 $1/2,1/4,1/4$，令 $Q$ 在 $0,1$ 上分别取权重 $3/4,1/4$。两者模二都化为 $(3/4,1/4)$，模三都化为 $(3/4,1/4,0)$。记独立 $p$ 次抽样和的两个边缘碰撞质量之积为 $A_p$，模六的碰撞质量分别为 $E_p(P),E_p(Q)$。对 $p\ge1$，

$
\begin{aligned}
E_p(P)-A_p&=\frac{(1/16)^p-(7/64)^p}{3}<0,\\
E_p(Q)-A_p&=\frac{(13/16)^p-(7/64)^p}{3}>0.
\end{aligned}
$

由 [@thm-ch31-cyclic-collision-fourier]，零剩余类的碰撞质量是六个特征标平方模的 $p$ 次幂的平均。令 $\omega=e^{2\pi i/6}$。在混合频率 $1$ 上，$P$ 的振幅为 $1/2+\omega^3/4+\omega^4/4=(1+\omega^4)/4$，$Q$ 的振幅为 $(3+\omega)/4$，平方模分别为 $1/16$ 和 $13/16$。频率 $5$ 给出各自的共轭。两个边缘的非平凡平方模为 $1/4$ 和 $7/16$，所以边缘乘积对每个混合频率使用的数值为 $7/64$。在每一个正阶卷积幂下，两组分布的两个边缘分别相同。碰撞质量为 $E$ 的概率律，其二阶 Rényi 熵为 $-\log E$。 [Linden、Mosonyi 与 Winter，第 V 节](https://arxiv.org/html/1212.0248#S5)

缩小模数是一种减少特征标项数的办法。另一种是保留模数 $q$，用只含少量频率的核 $K$ 在每个剩余类上从上方控制带的指示函数。对正整数 $q$，取 $G=\mathbb Z/q\mathbb Z$，令 $R\subseteq G$ 为需要计入的剩余类。设 $K:G\to\mathbb R$ 处处非负，且在 $R$ 上至少为 $1$。令 $S$ 包含 $K$ 的离散傅里叶变换的支集，记 $m=|S|$，$M=\sum_{x\in G}K(x)$。

**手工推导。** 傅里叶反演在零点给出精确恒等式

$$
mM-qK(0)=\sum_{k\in S}\sum_{x\in G}K(x)\bigl(1-\Re\chi_k(-x)\bigr).
$$

::: {.theorem #thm-ch31-sparse-majorant-gap title="稀疏傅里叶上包络的相位下界" lean="D5/S3/Fourier/Concentration/SparseCyclicMajorants.sparse_dft_majorant_gap"}
沿用上述 $q,K,S,R,m,M$，有

$$
mM-qK(0)\ \ge\ \sum_{k\in S}\sum_{x\in R}\bigl(1-\Re\chi_k(-x)\bigr).
$$
:::

每一项均非负，因而只保留 $R$ 中的项即可。

按特征标展开的归一化，零频系数为 $M/q$。若 $0\in R$，该系数至少为 $1/m$。若 $1\in R$ 且 $S$ 含有非零频率，右边严格为正。

::: {.theorem #thm-ch31-sparse-majorant-equality title="稀疏均值下界的等号条件" lean="D5/S3/Fourier/Concentration/SparseCyclicMajorants.sparse_dft_floor_eq_iff"}
设 $K$ 处处非负，$S$ 包含其傅里叶变换的支集。在 $K(0)>0$ 时，$mM=qK(0)$ 当且仅当 $K$ 等于 $K(0)\mathbf 1_U$，其中 $U$ 是 $G$ 的一个加法子群，并且 $S$ 是 $U$ 的零化子。
:::

等号迫使所有选中的特征标在 $K>0$ 的地方取值 $1$。傅里叶反演使 $K$ 在这些特征标共同为 $1$ 的子群上恒等于 $K(0)$。该子群的零化子中每个频率的系数为 $M>0$，因此都必须属于 $S$。反过来，子群指示函数与其零化子使恒等式右端为零。有限群的傅里叶支集不确定性原理同样以子群指示函数给出取等构形。 [Tao，第 1 节](https://arxiv.org/pdf/math/0308286v6)

把 $K$ 用于碰撞质量时，其零频项为 $(M/q)W^{2p}$。若 $0\in R$ 且其他系数的实部都非负，则整个上界至少为 $W^{2p}/m$。系数有正有负时，均值估计约束零频项，其余各项由同一组权重产生的高阶矩共同决定。

**模四算例（手工推导）。** 直接检验各频率的矩能否由同一组权重给出。在 $\mathbb Z/4\mathbb Z$ 上，令 $w=(a,b,c,d)$ 为总和为 $1$ 的非负权重，令 $u=|\widehat w(1)|^2$、$v=|\widehat w(2)|^2$。使用不含 $1/4$ 因子的离散傅里叶变换，有

$$
u=(a-c)^2+(b-d)^2,\qquad v=(a+c-b-d)^2.
$$

通过同一个 $w$ 能实现的二元组恰好满足

$$
0\le v\le1,\qquad 0\le u\le(1+v)/2.
$$

记偶、奇剩余类的总权重分别为 $e,o$。两个差 $a-c,b-d$ 分别在 $[-e,e]$ 和 $[-o,o]$ 内独立变化。所以 $u$ 的最大值为 $e^2+o^2=(1+v)/2$。给定 $v$ 可取 $e=(1+\sqrt v)/2$、$o=(1-\sqrt v)/2$，然后按同一个比例缩放两个差的端点值，得到从零到最大值的整个区间。 [模四联合矩的精确可行域](lean:D5/S3/Fourier/Concentration/FourthRootMomentRegion.dft_four_squared_region)

从 $w$ 独立抽取 $p$ 次求和，再取两个独立和的差，频率 $1,2$ 的傅里叶系数分别是 $u^p,v^p$。若 $v^p=0$，在 $p\ge2$ 时，第一个系数的最大值为 $2^{-p}$。若只要求差的分布对称且傅里叶系数非负，第二个系数为零时偶、奇质量都等于 $1/2$。第一个系数是两个偶剩余类的质量之差，最大值为 $1/2$，由 $(1/2,1/4,0,1/4)$ 取到。两项最大值之比为 $2^{p-1}$。这一差距来自两个高阶矩须由同一组初始权重实现。用于实际 ζ 纵坐标时，仍需对同一零点谱的特征标矩建立定量约束。 [同源与放松分布的两个最优值](lean:D5/S3/Fourier/Concentration/FourthRootMomentRegion.four_first_moment_maxima)

一半上界的等号条件适用于任意正模数。 设同一个概率权重 $w$ 在 $\mathbb Z/q\mathbb Z$ 上满足 $\widehat w(2)=0$。记 $m=\widehat w(1)$、$c=|m|^2$，并置 $Z_j=\overline m\exp(-2\pi i j/q)$。$Z_j$ 的加权均值为 $c$，加权二次矩为零，且 $|Z_j|^2=c$。因此实部的加权方差是

$$
\sum_j w_j(\Re Z_j-c)^2=\frac{c}{2}-c^2\ge0.
$$

故 $c\le 1/2$。取等时，每个正权重处的实部等于 $1/2$，虚部等于 $1/2$ 或 $-1/2$。虚部的均值为零，两侧质量各为一半。每个相位只对应一个剩余类，因此等号情形恰为两个各承载一半质量的剩余类，且其差的加法阶为四。反过来，这两个相位互相垂直，一阶系数的平方模就是 $1/2$，二阶系数相消。这样的剩余类存在当且仅当 $4\mid q$。可取 $0$ 与 $q/4$。 [等号的充要条件](lean:D5/S3/Fourier/Concentration/CyclicHarmonicEquality.zmod_first_mode_le_half_of_second_zero) · [可取等的模数](lean:D5/S3/Fourier/Concentration/CyclicHarmonicEquality.zmod_exists_first_mode_half_of_second_zero)

若要比较同一加权格点谱在 $k$ 与 $2k$ 的系数，把坐标 $a_j$ 上的权重汇入剩余类 $ka_j\bmod q$。这样得到的同一概率权重的一、二阶系数分别等于原谱在 $k$、$2k$ 的系数。所以当 $2k$ 处的系数为零时，归一化后 $k$ 处进入碰撞公式的 $2p$ 次幂至多为 $2^{-p}$。

若第二系数接近零，可以量化上述两点构形的稳定性。设有限组单位相位 $z_j$ 带有同一组总和为 $1$ 的非负权重 $w_j$，记 $m=\sum_j w_jz_j$、$b=\sum_j w_jz_j^2$、$c=|m|^2$。对 $0<c<1$，置 $X_j=\overline m z_j$、$t=\sqrt{c(1-c)}$。当 $\Im X_j\ge0$ 时取 $\eta_j=1$，其余取 $\eta_j=-1$。实部方差同时控制相位到两个候选点的平方误差与两侧的质量差。具体地，令

$$
D=\frac c2-c^2+\frac12\Re(\overline m^{\,2}b).
$$

则有

$$
\begin{aligned}
\sum_j w_j\lvert X_j-c-i\eta_jt\rvert^2 &\le (1+4/t^2)D,\\
\left(\sum_j w_j\eta_j\right)^2 &\le 4D/t^4.
\end{aligned}
$$

[两矩稳定性界](lean:D5/S3/Fourier/Concentration/CyclicMomentStability.first_two_moment_stability)

写 $x=\Re X_j$、$y=\Im X_j$。由 $x^2+y^2=c$，有 $(|y|-t)(|y|+t)=c^2-x^2$。使用 $|x+c|\le2$ 和 $|y|+t\ge t$，就能用实部误差控制虚部误差。虚部均值为零，再用加权柯西–施瓦茨不等式得到质量差的界。当 $b=0$ 且 $c=1/2$ 时，两项误差都为零。要从这一估计得到离散格点上的定量缺口，还须结合允许相位之间的角距离。

相位与直角的距离可以用实测方差控制。设有限单位相位 $z_j$ 带有总和为一的非负权重 $w_j$。记 $m=\sum_j w_jz_j$、$b=\sum_jw_jz_j^2$、$c=|m|^2$、$s=c(1-c)$、$D=c/2-c^2+\Re(\overline m^{\,2}b)/2$。设任意两个正权重指标（允许取同一指标）满足 $\lvert\Re(z_j\overline{z_k})\rvert\ge\delta$。令 $d=\max\{0,\delta-|2c-1|\}$。若 $d>0$，则

$$
c d^2\le 4\left(1+\frac4s+\frac{c d^2}{s^2}\right)D.
$$

$d>0$ 时，$c$ 严格介于零与一之间。两矩稳定性给出的两个理想相位在旋转后的坐标中有实内积 $c(2c-1)$。对符号相反的相位对求加权平均，可用两个理想相位的平方误差控制实内积偏差。两侧质量的乘积等于一减去质量差平方再除以四，代入两条稳定性估计即得上式。

当 $4\nmid q$ 时，将整数差 $k$ 对应的 $4k-q$ 化为模 $2q$ 的中心剩余类。所得整数非零，在 $q$ 为偶数时仍为偶数。循环相位 $z_j=\exp(-2\pi i j/q)$ 因此可取 $\delta=\sin(\pi/(2q))$（$q$ 为奇数）或 $\delta=\sin(\pi/q)$（$q$ 为偶数）。此时 $m=\widehat w(1)$、$b=\widehat w(2)$。若 $|b|\le\delta/3$，可得 $c\le(1+|b|)/2-\delta^2/225$。对上界取 $p$ 次幂，就得到两个独立的 $p$ 次抽样和之差的第一个傅里叶系数的上界。

[相位间隔的方差界](lean:D5/S3/Fourier/Concentration/CyclicGridMomentGap.phase_separation_variance_bound) · [循环网格上的傅里叶矩界](lean:D5/S3/Fourier/Concentration/CyclicGridMomentGap.cyclic_grid_fourier_gap)

对实际 ζ 纵坐标，可按前一节在 $X=e^{-D}T^\beta$ 以上截取尾段，并取 $\delta=\log T$、$g_\gamma=\gamma/r$。给定 $H=\exp(cT^\beta\log T)$，可取 $N=\lfloor HT^2/r\rfloor_++1$，使网格误差不超过 $rB/(2T^2)$。要得到有限的起点范围，还需在某个 $L=L(T)$ 上证明相应的严格预算 $KNE_p(2/L)<(\log T)^{2p}$。目标阶数 $p$ 随 $T^\beta\log T$ 增长。对固定的有限尾段和固定 $p$，随着 $L$ 增大，$E_p(2/L)$ 最终等于精确碰撞质量 $E_p(0)$。若要量化 $L$，仍须控制正分辨率下的加权近碰撞。Tao、Trudgian 与 Yang 的定义 7 计数的是单位尺度的无权四元组，定理 64 的估计适用于固定的 $\sigma\ge7/10$。临界线尾段的增长阶数加权界仍待证。 [定义 7 与定理 64](https://arxiv.org/html/2501.16779v1) · [研究问题](https://github.com/the-omega-institute/trureturing/issues/33519)

设 $x=e^{s/r}>1$，则时间 $s$ 处的单频项是 $x^{i\gamma}$。Ford 与 Zaharescu 的显式公式给出 $t>1$ 时的累积和 $\sum_{0<\gamma\le t}x^\rho$。令 $n_x$ 为最接近 $x$ 的素数幂，$\theta=\log(x/n_x)$。主项等于 $-\Lambda(n_x)/(2\pi)$ 乘以 $\int_0^t e^{i\theta u}\,du$。在黎曼猜想下，除以 $\sqrt{x}$ 后的累积和就是按重数计入的纵坐标相位和。 [Ford 与 Zaharescu，引理 1](https://arxiv.org/pdf/math/0405459)

取权重 $w(u)=u/(u^2+1/4)$，记 $J_\theta(X,T)=\int_X^T w(u)e^{i\theta u}\,du$。对 $1/2\le X\le T$，

$$
|J_\theta(X,T)|\le\frac12\log\frac{T^2+1/4}{X^2+1/4},
\qquad
|\theta|\,|J_\theta(X,T)|\le 2w(X).
$$

第一个界来自相位的单位模，且在 $\theta=0$ 时取等号。第二个界来自分部积分。$w$ 在该区间递减，因而导数项的模至多是 $w(X)-w(T)$，与边界项中的 $w(T)$ 相消。

第一个界也可直接由 Mathlib 的有理权重积分公式得到。对第二个界，向量值第二积分中值定理用左端权重乘以某个前缀上的无权振荡积分来控制 $|J_\theta|$。当 $\theta\ne0$ 时，前缀积分的两个指数端点各有单位模，因此得到 $2w(X)/|\theta|$。 [有理权重积分与复指数积分](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/SpecialFunctions/Integrals/Basic.lean) · [向量值第二积分中值定理](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Integral/IntervalIntegral/MeanValue.lean#L203)

累积误差通过分部求和传入尾段时，可以保留误差包络随高度的变化。设 $R(t)$ 是归一化累积和减去归一化主项，且 $|R(t)|\le E(t)$。零点尾段取 $(X,T]$。加权误差写成
$$
w(T)R(T)-w(X)R(X)-\int_X^T w'(u)R(u)\,du.
$$
若 $w\ge0$ 且递减，三角不等式与对 $wE$ 的分部积分把误差控制在 $2w(X)E(X)+\int_X^T w(u)E'(u)\,du$ 以内。右端的 $w(T)E(T)$ 正好相消。

当 $T\ge X>1$、$x>1$ 且黎曼猜想成立时，引理 1 允许取 $E(u)=A\log^2(2xu)+B\log(2u)$，其中 $A=K\sqrt{x}$、$B=K/(\sqrt{x}\log x)$，$K$ 是原显式公式的统一误差常数。用 $w(u)\le1/u$ 积掉包络的导数，得到
$$
\left|\sum_{X<\gamma\le T} w(\gamma)e^{i\gamma\log x}
      +\frac{\Lambda(n_x)}{2\pi\sqrt{x}}J_\theta(X,T)\right|
\le
\frac{2A\bigl(\log^2(2xX)+\log(2xX)+1\bigr)+B\bigl(2\log(2X)+1\bigr)}{X}.
$$
求和按重数计入。该界对 $T$ 一致，仍含依赖 $x$ 的因子。所需时间尺度上 $x=e^{s/r}$，仍须控制异常频率对增长阶数矩的总贡献。 [加权误差界的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/WeightedCumulativeRemainder.weighted_tail_error_le)

即使相位可在整个圆周上取值，第二和第四谐波也能给出尖锐的界。对单位相位的一组概率权重，记 $m_h=\sum_j w_j z_j^h$。令 $0\le e,k\le1$ 分别为 $|m_2|,|m_4|$ 的上限，记 $b=\min(e,\sqrt{(1+k)/2})$、$r=(1+b)/2$。若 $b=1$，则 $|m_1|$ 的最大值为 $1$。若 $b<1$，令

$$
a=\min\left(\sqrt r,\sqrt{\frac{1+k}{4(1-b)}}\right),\qquad B=\frac{a+r}{1+a}.
$$

此时 $|m_1|$ 的最大值为 $B$。把相位整体旋转，使 $m_1$ 为非负实数，并记按给定权重抽样的相位实投影为 $x=\Re z$。恒等式 $2x^2=1+\Re z^2$ 与 $8(x^2-x^4)=1-\Re z^4$ 把两个上限转为实矩约束。由 $\Re z^2$ 的方差非负可得 $(\Re m_2)^2\le(1+\Re m_4)/2\le(1+k)/2$。再用 $\Re m_2\le |m_2|\le e$ 和 $2\mathbb E x^2=1+\Re m_2$，得到 $\mathbb E x^2\le r$。若 $a=\sqrt r$，柯西–施瓦茨不等式给出 $\mathbb E x\le a=B$。另一分支中，将 $x\in[-1,1]$ 上的非负多项式 $(1-x)(x-a)^2(x+1+2a)$ 展开并求平均，得到
$$
\mathbb E[(1-x^2)(x^2-a^2)]-2a(1+a)\left[(1+a)(\mathbb E x-1)+1-\mathbb E x^2\right].
$$
由第四谐波的上限和 $\mathbb E x^2\le r$，第一项非正，方括号内也就非正，从而给出所述上界。实矩计算与区间上测度的上主表示有关。 [Dette 与 Schorning，引理 2.1](https://arxiv.org/pdf/1306.4872)

当 $b<1$ 时，在相位 $1$ 上取权重 $(r-a^2)/(1-a^2)$，其余权重平分给 $a+i\sqrt{1-a^2}$ 及其共轭。第一、第二和第四矩均为实数，分别为 $B$、$b$ 和 $1-8(1-r)a^2$。按 $a$ 的取法有 $|m_4|\le k$。当 $b=1$ 时，点质量取等。若 $e=k=0$，取 $1,e^{i\pi/3},e^{-i\pi/3}$ 三个相位等权，得到 $|m_1|=2/3$。由于 $2^j$ 在模六下为 $2$ 或 $4$，所有 $j\ge1$ 的 $2^j$ 阶矩都为零。即使这些系数同时为零，第一系数也可以保持在固定的正值。实际 ζ 纵坐标在增长阶数下的界仍需加权频率和的算术信息。

[尖锐谐波界的 Lean 证明](lean:D5/S3/Fourier/Concentration/SecondFourthHarmonicBound.sharp_second_fourth_harmonic_bound)

对连续的偶数阶，设 $N\ge1$ 且 $1\le k<N$ 时 $m_{2k}=0$。第一系数幅值的最大值为

$$
B_N=\frac{1}{N\sin(\pi/(2N))}.
$$

等权分布在 $z_j=\exp\bigl(i\pi(j-(N-1)/2)/N\bigr)$（$0\le j<N$）上时取等。相位的平方等距分布，规定的谐波因有限特征标求和而消失。第一系数由圆弧上的余弦和给出。每项乘以 $2\sin(\pi/(2N))$，即为相邻两个端点的正弦之差。从 $-1$ 到 $1$ 逐项相消得到所需的和。

比较任一满足条件的分布与上述等权分布时，将前者的第一矩旋转到非负实轴，并记 $y=(\Re z)^2$。此时 $2y-1=\Re z^2$，且切比雪夫多项式满足 $T_k(2y-1)=\Re z^{2k}$。两组分布在 $y$ 上次数低于 $N$ 的多项式有相同的均值。多项式 $R(y)=1+(-1)^N T_N(2y-1)$ 在 $[0,1]$ 上非负，在取等分布的投影上为零，在负实数处为正。对 $s>0$，表达式 $(y+sR(y)/R(-s))/(y+s)$ 的分子在 $-s$ 消失，因此它是次数低于 $N$ 的多项式。它从上方控制 $y/(y+s)$ 并在取等支集上与其相等。用该多项式比较两组均值，再取 $s=t^2$ 并使用 $y\ge0$ 时的积分恒等式 $\int_{\mathbb R}y/(y+t^2)\,dt=\pi\sqrt y$，便得到平方根均值的上界，从而控制旋转后的第一系数。 [高斯–切比雪夫求积公式](https://dlmf.nist.gov/3.5#v) · [主表示，引理 2.1](https://arxiv.org/pdf/1306.4872)

$N=2,3$ 时分别得到 $1/\sqrt2$ 和 $2/3$。由正弦函数在零点的极限，$N\to\infty$ 时有 $B_N\to 2/\pi$。所以，在这类分布中，即使消失的偶次谐波连续范围不断增大，第一系数幅值仍可远离零。实际 ζ 纵坐标的近碰撞预算需要约束时间轨道上加权和的信息。

[连续偶次谐波消失时尖锐界的 Lean 证明](lean:D5/S3/Fourier/Concentration/EvenHarmonicFirstMoment.sharp_first_harmonic_even_block)

## 低阶碰撞质量能确定什么

把频率三元组 $(0,1,k)$ 中最后一项移到 $k+\sqrt 2$。当总次数低于 $k$ 时，其余两项的计数还不足以抵消最后一项的变动。到次数 $k$，第一组三元组里恰好有一种新的抵消方式。

::: {.theorem #thm-ch31-low-order-collision-agreement title="低阶碰撞质量一致时，高阶衰减率仍可不同" lean="D5/S3/Fourier/Concentration/LowOrderCollisionAgreement.low_order_agreement_and_high_order_disparity"}
设 $k\ge2$ 为整数，$E_p(t)$ 与 $F_p(t)$ 分别为 $(0,1,k)$ 和 $(0,1,k+\sqrt2)$ 在权重 $(1/4,1/4,1/2)$ 下的有序对碰撞质量。对于任意 $0\le t<1$，有

$$
\begin{aligned}
E_p(t)&=F_p(t) &&(0\le p<k,\ p\text{ 为整数}),\\
E_k(t)&=F_k(t)+2k(1/4)^{k-1}(1/4)^k(1/2).
\end{aligned}
$$

对于每个正整数 $p$，有

$$
\begin{aligned}
E_p(t)&\ge\frac{1}{16k\sqrt p} &&(0\le t<1),\\
F_p(t)&\le\frac2p &&\left(0\le t<\frac{1}{(k+1+\sqrt2)p}\right).
\end{aligned}
$$
:::

::: proof
若最后一个计数不同，次数低于 $k$ 时，两组频率中的和都至少相差 $1$。若最后一个计数相同，距离小于 $1$ 迫使全部计数相同。次数恰为 $k$ 时，整数谱多出 $(0,k,0)$ 与 $(k-1,0,1)$ 这对计数及其反序。

整数谱在任何小于 $1$ 的非负分辨率上都只计入精确碰撞，可在分辨率 $1/2$ 处应用方差下界。对无理谱，把差写成 $a+b\sqrt2$。不同计数对应的整数范数 $a^2-2b^2$ 非零，因此可用共轭因子的大小给出间隔下界，在陈述的分辨率范围内排除所有不同计数。剩余质量是多项分布权重的平方和。每个权重分解成两个公平二项概率的乘积，中央二项式系数界及二项式系数的对称性和单调性将此乘积控制在 $2/p$。完整证明由 Lean 内核检查。[方差下界](ch34-s28-s03-s02-collision-variance.md#thm-ch31-variance-collision-lower)
:::

计数向量 $(p,0,0)$ 自身贡献的质量为 $(1/4)^{2p}>0$。取共用分辨率 $t_p=1/[2(k+3)p]$。固定 $k$ 时，两组质量在此处的比值至少为 $\sqrt p/(32k)$。这个有限谱例子限定了仅凭低阶碰撞质量外推高阶上界的范围。实际 ζ 纵坐标还需要利用其频率关系。

### 局部统计与共同格点

对每个频率 $g_j$ 选一个整数 $m_j\ge0$，将它向下舍入为 $\widetilde g_j=2^{-m_j}\lfloor 2^{m_j}g_j\rfloor$，保留索引与权重。固定一个有 $N>0$ 个索引的尾段，频率落在 $[a,b]$，且 $m_-\le m_j\le m_+$。记 $h=2^{-m_-}$。每个舍入误差在 $[0,h)$，所以任意两个频率之差的改变量绝对值至多为 $h$。对 $\ell\ge1$ 个不同索引，以第一个频率为基点，对其余 $\ell-1$ 个差值乘同一个尺度 $\lambda\ge0$。用最大范数下的 $K$-Lipschitz 函数作测试，各项改变量绝对值至多 $K\lambda h$。若把所有有序测试项的和除以 $N$，总改变量绝对值至多 $K\lambda h(N)_\ell/N$，其中 $(N)_\ell$ 为下降阶乘。

同一舍入把频率送到步长 $2^{-m_+}$ 的格点上。最粗格点包含于每个更细的格点网格，所以在最细网格上读出的整数标签都落在 $[A,B]$，其中

$$
A=2^{m_+-m_-}\lfloor 2^{m_-}a\rfloor,\qquad B=\lfloor 2^{m_+}b\rfloor.
$$

次数 $p$ 的和至多有 $1+p(B-A)$ 个可能的整数位置。把多项分布权重按这些位置归组，再对组质量用柯西–施瓦茨不等式。若总权重为 $W>0$，舍入谱的精确碰撞质量至少为 $W^{2p}/[1+p(B-A)]$。任何在舍入谱中精确相等的两项，原来的差至多为 $ph$，因为每组次数 $p$ 的舍入误差都在 $[0,ph]$。 [按频率分箱的质量界](lean:D5/S3/Fourier/Concentration/FiniteSincCollisionMoment.sum_bin_mass_sq_le_nearCollisionMass)

例如，固定取 $m_j=\lceil(\log_2(2+g_j))^2\rceil$。在共用索引的尾段 $cT^\alpha\le g_j\le T$ 上，若 $c,\alpha>0$ 固定，$N=O(T\log T)$，且 $\lambda$ 至多按 $T$ 的固定幂增长，则每个固定阶的上述统计改变量趋于零。另一方面，取固定 $0<\beta<1$。在 $p\asymp T^\beta\log T$ 时，$\log[1+p(B-A)]=O((\log T)^2)$。若 $W\asymp(\log T)^2$ 且 $\delta=\log T$，缺失窗口的矩预算即使只用一个时间采样点，也要求归一化质量至多为 $\exp(-2p\log\log T+O(p))$。舍入谱的精确碰撞质量已超过这一预算。两组统计使用共用的尾段索引。若分别按高度选取索引，越过端点的条目还需处理。对原谱的转移只给出分辨率 $ph$ 上的下界，目标的更细分辨率上界仍待证。

## 计数向量相同的对角项 {#weighted-occupation-diagonal}

取有限指标集 $J$、实权重 $w_j$ 和整数 $p\ge0$。令 $D_p=\sum_{|m|=p}c_m^2$，其中 $c_m=p!\prod_j(w_j^{m_j}/m_j!)$。当权重非负时，加权近碰撞质量在每个非负分辨率下都包含这部分。对每个 $s\ge0$，

$$
s^pD_p\le (p!)^2\prod_{j\in J}(2e^{s w_j^2/2}-1).
$$

把左边除以 $(p!)^2$，得到 $\prod_j\sum_{n=0}^p x_j^n/(n!)^2$ 中总次数恰为 $p$ 的项之和，其中 $x_j=sw_j^2$。保留所有非负项可取上界。当 $n\ge1$ 时，$n!\ge2^{n-1}$，所以每个正次项至多是 $e^{x_j/2}$ 中相应项的两倍。常数项为一，故每个因子至多为 $2e^{x_j/2}-1$。无穷级数等于 $I_0(2\sqrt{x_j})$。 [有限乘积估计的 Lean 证明](lean:D5/S3/Fourier/Concentration/WeightedOccupationDiagonal.scaled_diagonal_le_product) · [Lamzouri，§3 的独立相位乘积](https://arxiv.org/html/2311.04860v2#S3) · [DLMF，式 10.25.2](https://dlmf.nist.gov/10.25.E2)

设 $p\ge1$、$V=\sum_jw_j^2>0$，取 $s=p/V$。恒等式 $2e^{x/2}-1=e^x[1-(1-e^{-x/2})^2]$ 给出

$$
\frac{D_p}{p!\,V^p}\le
\frac{p!e^p}{p^p}\prod_{j\in J}
\left[1-\left(1-e^{-p w_j^2/(2V)}\right)^2\right].
$$

Stirling 公式给出前因子 $O(\sqrt p)$。如果至少 $\kappa p$ 个指标满足 $p w_j^2/V\ge a$，其中 $\kappa,a>0$ 与 $p$ 无关，那么乘积至多为 $[1-(1-e^{-a/2})^2]^{\kappa p}$。

在 RH 下，取 $X=e^{-K}T^\beta$，固定 $K$ 和 $0<\beta<1$，取 $p\asymp X\log X$，按不同纵坐标合并重数，令 $w_\gamma=m_\gamma\gamma/(1/4+\gamma^2)$。用[对数尺度尾段的重数平方和上界](ch34-s28-s03-s02-mobius-and-spectra.md#thm-ch31-logarithmic-missing-window) $\sum_{0<\gamma\le Y}m_\gamma^2=O(Y\log Y)$。Riemann–von Mangoldt 公式对每个固定 $C\ge2$ 给出 $\sum_{X<\gamma\le CX}m_\gamma\sim(C-1)X\log X/(2\pi)$。Cauchy–Schwarz 因而给出此带中互异纵坐标数 $M\gg CX\log X$，隐含下界常数可取为与 $C$ 无关，取定 $C$ 后让 $X$ 充分大。可选固定 $C$ 使 $M\ge2p$，且最终 $CX\le T$。每个带内权重至少为 $1/(2CX)$。由 $V=O(\log X/X)$，这些指标满足上式的折减条件。另一方面，对角和中恰好选取 $p$ 个不同带内指标的项给出

$$
D_p\ge (p!)^2\binom{M}{p}(2CX)^{-2p}
   \ge p!\,(M/(8C^2X^2))^p .
$$

因此存在常数 $0<c_1\le c_2$，使得充分大 $T$ 时 $e^{-c_2p}\le D_p/(p!V^p)\le e^{-c_1p}$。用尾段总权重 $W\asymp(\log T)^2$ 归一化，可得 $\log(D_p/W^{2p})=-2p\log\log T+O(p)$。这里的 ζ 渐近估计使用上述文献输入。两个不同向量产生近频率和的总权重仍需单独的算术估计。 [重数平方和的文献输入，定理 1 与 §7](https://arxiv.org/abs/2306.04799)

## 固定计数差的权重

给定总次数均为 $p$ 的计数向量 $m,n$，记 $\ell_j=\min(m_j,n_j)$、$a=m-\ell$、$b=n-\ell$。两个剩余向量的支撑互不相交，总次数同为 $d=p-|\ell|$。对给定的 $a,b$，满足 $m-n=a-b$ 的全部配对恰为 $(\ell+a,\ell+b)$，其中 $|\ell|=p-d$。频率和之差为 $\sum_j(a_j-b_j)g_j$，与 $\ell$ 无关。

用上节的 $c_p(m)=p!\prod_j(w_j^{m_j}/m_j!)$。固定差的总权重 $M_p(a-b)$ 为

$$
M_p(a-b)=
(p!)^2\left(\prod_j w_j^{a_j+b_j}\right)
\sum_{|\ell|=p-d}\prod_j
\frac{(w_j^2)^{\ell_j}}{\ell_j!\,(\ell_j+a_j+b_j)!}.
$$

这个等式允许实权重。因为每个坐标至多有一边的剩余计数为正，原来的两个阶乘恰为 $\ell_j!$ 与 $(\ell_j+a_j+b_j)!$。在非负权重下，$(\ell_j+a_j)!\ge \ell_j!a_j!$ 给出 $c_p(\ell+a)\le\binom pd\,c_{p-d}(\ell)c_d(a)$。同样估计 $\ell+b$ 并对 $\ell$ 求和，得到

$$
M_p(a-b)\le \binom pd^{\!2} D_{p-d}\,c_d(a)c_d(b).
$$

固定计数差的精确式与对角界见 Lean 证明。 [Lean 证明](lean:D5/S3/Fourier/Concentration/FixedDifferenceOccupationMass.fixed_difference_mass)

记 $R_d(\eta)$ 为支撑互不相交、总次数均为 $d$ 且 $|\sum_j(a_j-b_j)g_j|\le\eta$ 的有序对权重 $c_d(a)c_d(b)$ 之和。把上式在这样的 $a,b$ 上求和，便得到剩余次数为 $d$ 的配对总权重上界 $\binom pd^2 D_{p-d}R_d(\eta)$。$d=0$ 给出原对角项。$d=1$ 只需要带权的不同指标对。对按不同纵坐标合并重数的 ζ 尾段，这就是不同纵坐标对。对实际 ζ 尾段，$d$ 可随 $p$ 增长，这时 $R_d(\eta)$ 的所需上界仍是开放问题。 [贝塞尔级数中的移位阶乘，DLMF 10.25.2](https://dlmf.nist.gov/10.25.E2)

## 残余次数一的加权近配对

取有限的有序指标对，设两个纵坐标均在 $[X,T]$ 内，$2\le X\le T$，且每对的间距至多为 $\delta\le X/2$。每个指标有非负重数 $m_j$，权重满足 $0\le w_j\le m_j/\gamma_j$。令 $B(y)$ 为这批配对中较大纵坐标至多为 $y$ 的重数乘积 $m_i m_j$ 之和。若对每个 $X\le y\le T$ 都有 $B(y)\le Cy\log y$，其中 $C\ge0$，则

$$
\sum_{(i,j)}w_iw_j\le \frac{4C(\log X+1)}{X}.
$$

对较大纵坐标为 $h$ 的一对，较小纵坐标至少为 $h-\delta\ge h/2$。于是其权重至多为 $2m_i m_j/h^2$。把 $1/h^2$ 写成 $1/T^2+\int_h^T 2y^{-3}\,dy$，交换有限和与积分，得到总权重至多为 $2B(T)/T^2+4\int_X^T B(y)y^{-3}\,dy$。代入累计上界并积分即得结论。 [有限加权上界的 Lean 证明](lean:D5/S3/Fourier/Concentration/WeightedClosePairTail.weighted_close_pairs_le)

在 RH 下，对不同正纵坐标合并重数并令 $w_\gamma=m_\gamma\gamma/(1/4+\gamma^2)$。本章的频率为 $g_\gamma=\gamma/r$，其中 $r>0$，所以频率差上限 $\eta$ 对应纵坐标差上限 $\delta=r\eta$。取 $0\le\eta\le1/(4r\log T)$。将高度 $y$ 的 Montgomery 函数在 $[0,1]$ 上按 $2(1-\alpha)$ 平均。文献中一致的展开式给出 $O(1)$ 的平均。平均后的每对都带因子 $2(1-\cos u)/u^2$，其中 $u=(\gamma_i-\gamma_j)\log y$，零点取连续值一。因此所有贡献非负。纵坐标差至多为 $\delta$ 的配对满足 $|u|\le1/4$，这个因子及 Montgomery 的因子 $4/[4+(\gamma_i-\gamma_j)^2]$ 都有正的绝对下界。去掉其他配对并乘回归一化因子，得到 $B(y)\ll y\log y$，对充分大的 $X$ 一致成立。 [Baluyot、Goldston、Suriajaya 与 Turnage-Butterbaugh，定理 1](https://arxiv.org/abs/2306.04799)

这给出 $R_1(\eta)\ll(\log X+1)/X$。由固定计数差的上界，加权近碰撞质量 $E_p(\eta)$ 中残余次数恰为一的部分至多为 $p^2 D_{p-1}R_1(\eta)$。沿用固定 $K$ 和 $0<\beta<1$ 的截点 $X=e^{-K}T^\beta$，并取 $p\asymp X\log X$ 时，对角估计使这部分相对 $p!V^p$ 保留指数折减，因为 $V\asymp\log X/X$ 且 $p$ 倍的多项式因子可被吸收。残余次数随 $p$ 增长时，仍需额外的算术输入。

## 随阶数增长的残余次数截断 {#growing-residual-degree}

记 $E_{p,\le D}(\eta)$ 为 $E_p(\eta)$ 中每边至多剩下 $D$ 个未配对项的部分，其中 $0\le D\le p$。每对计数向量至少有 $p-D$ 个共同项。记 $W=\sum_jw_j$ 与 $V=\sum_jw_j^2>0$。权重非负时，去掉频率条件后可用共同计数上界得到

$
E_{p,\le D}(\eta)\le\binom pD^{\!2}W^{2D}D_{p-D}。

$

只需控制 $k=p-D$ 这一阶。若 $D_{p-D}\le A e^{-c(p-D)}(p-D)!V^{p-D}$，将一个二项式系数与 $p!$ 约去，再用 $p^D/D!$ 控制另一个。令 $x=p e^c W^2/V$，得到

$
\frac{E_{p,\le D}(\eta)}{p!V^p}
\le A e^{-cp}\frac{x^D}{(D!)^2}
\le A e^{-cp}\rho^{-D}\exp(2\sqrt{\rho x}),\qquad \rho>0。

$

末项不等式取指数级数在 $\sqrt{\rho x}$ 处的第 $D$ 项，再将两边平方。两个上界均与频率分辨率无关。 [共同计数上界的 Lean 证明](lean:D5/S3/Fourier/Concentration/FiniteMultinomialOverlap.weighted_overlap_le_diagonal)

沿用上文的 ζ 尾段，固定 $K$ 与 $0<\beta<1$，取 $X=e^{-K}T^\beta$ 及 $p\asymp X\log X$。在 RH 与所引重数估计下，$W^2/V=O(p(\log T)^2)$。对所有 $p/2\le k\le p$，对角估计可用相同的常数 $A,c>0$。区间 $(X,CX]$ 提供至少固定倍数的 $p$ 个指标，在这些指标上 $kw_j^2/V$ 对该范围内的 $k$ 有统一的正下界。Stirling 公式产生的 $O(\sqrt{k})$ 因子可吸收到指数中。令 $L=\log T$，取 $\rho=(L\log L)^{-2}$。于是 $2\sqrt{\rho x}=O(p/\log L)$。若 $D\le\varepsilon p/\log L$，截断代价 $D\log(1/\rho)$ 至多为 $(2+o(1))\varepsilon p$。任取固定的 $0<\varepsilon<c/2$，整个截断范围都有与 $\eta$ 无关的指数节省。实际纵坐标的剩余近碰撞质量仍需对截断以上的残余次数作估计。 [重数估计，定理 1 与第 7 节](https://arxiv.org/abs/2306.04799)

## 可逐点匹配的高阶残余项 {#matched-residual-occupations}

逐坐标抵消共同出现的频率后，两边各剩 $d$ 个频率。若能把它们配成 $d$ 对，每对的频率差都在阈值 $\eta$ 内，残余权重就可以用一次近配对的权重来估计。这里把出现次数相同的词视为同一个计数向量。

设 $E$ 是有限索引集 $J$ 上的关系，$R(E)=\sum_{(i,j)\in E}w_iw_j$，且 $w_j\ge0$。若有序计数向量对的集合 $S$ 中，每一对 $(a,b)$ 都可由长度为 $d$ 的两个词实现，并逐位置沿 $E$ 匹配，则
$$
\sum_{(a,b)\in S} c_d(a)c_d(b)\le d!R(E)^d.
$$
任意给定这两个计数向量的词都可以重排成合格的匹配。将所有位置置换相加，每一对可匹配的词至少被计入一次。固定一个置换后，配对后的 $d$ 个位置可各自选择一条边，总权重为 $R(E)^d$。同一计数向量的各个词的权重相加正好是 $c_d$。

在 $E=\{(i,j):i\ne j,\ |g_i-g_j|\le\eta\}$ 时，$R(E)=R_1(\eta)$。从 $E_p(\eta)$ 中取出共同坐标抵消后可沿 $E$ 匹配的配对，加上对角项，其总权重至多
$$
\sum_{d=0}^p \binom pd^2D_{p-d}\,d!R_1(\eta)^d\le p!\bigl(V+R_1(\eta)\bigr)^p.
$$
第一步对每个固定计数差使用对角界，再对可匹配的残余向量求和。第二步用 $D_k\le k!V^k$，它由每个多项式系数至多为 $k!$ 和多项式定理得到。此估计适用于指定的配对子集。比如 $1+4=2+3$，而当 $0<\eta<1$ 时，左边任一项离右边任一项都至少为 $1$。实际 ζ 零点中，由这种抵消产生且无法逐点配成近邻的高阶残余权重仍待估计。

## 残余次数二与有向间距 {#degree-two-directed-differences}

权重可以为任意实数。当两边各余两项，和之差可以改写为两个有向间距之差。设 $i\ne j$ 的边 $(i,j)$ 有频率 $g_i-g_j$ 和权重 $w_iw_j$。令 $A(\eta)$ 为这批边在容差 $\eta\ge0$ 下的有序近碰撞权重。令 $C_i(\eta)$ 为删去原指标 $i$ 后、保留对角项的有序近碰撞权重。则
$$
R_2(\eta)=A(\eta)-2\sum_i w_i^2 C_i(\eta)+\sum_i\sum_{j\ne i}w_i^2w_j^2.
$$

把两个次数二向量各自展开为有序词。左词 $(i,k)$、右词 $(j,l)$ 的和之差等于边 $(i,j)$、$(l,k)$ 的频率差。边的定义已排除 $i=j$、$l=k$，还须排除 $i=l$、$j=k$ 才能使左右支撑互斥。固定任一种共享端点 $i$ 时，余下的近碰撞贡献为 $w_i^2 C_i(\eta)$。两种共享同时发生时，两条边相同，贡献恰为末项。因此可以直接从有向间距的相关和中扣除端点重叠。重复纵坐标可以属于不同指标，恒等式使用的是指标相等关系。

[端点修正的 Lean 证明](lean:D5/S3/Fourier/Concentration/DegreeTwoResidualDifferenceEnergy.degree_two_residual)

取两个单位权重的五点谱 $A=(0,1,5,6,13)$ 和 $B=(0,2,3,7,13)$。它们的端点都是 $0,13$，点位之和都是 $25$，平方和都是 $231$，因此均值同为 $5$，方差同为 $106/5$。对每个 $0\le\eta<1$，次数一的近配对只有五个对角项，两组的质量都为 $5$。

两组各有二十条有向边。在 $A$ 中，正间距 $1$ 和 $5$ 各出现两次，其余六个各出现一次。在 $B$ 中，十个正间距互异。负间距的计数与正间距相同，所以有向间距的碰撞质量分别是 $28$ 和 $20$。端点修正在两组都减去 $40$、加回 $20$，得到 $R_2(A)=8$ 和 $R_2(B)=0$。$A$ 中的八项来自 $0+6=1+5$ 的两侧互换以及两侧各自的排序。 [二次算例的 Lean 证明](lean:D5/S3/Fourier/Concentration/DegreeTwoMomentWitness.exists_equal_first_data_distinct_degree_two)

因此，端点、均值、方差和整个区间 $0\le\eta<1$ 上的次数一质量仍允许不同的次数二质量。这个有限谱反例刻画了这些读数的适用边界。ζ 零点所需的加权频带上界是下文的开放问题。

### 同度量谱与互斥三项和

完整的有向间距分布是更强的输入。取 $U=\{0,1,3\}$ 和 $V=\{0,4,9\}$，令 $A=U+V$、$B=9+U-V$。两个集合各有九个点，每个点对应唯一的一对坐标。把 $A$ 中的一对 $(u,v),(u',v')$ 送到 $B$ 中的 $(u,v'),(u',v)$，有向间距 $(u-u')+(v-v')$ 保持相同。因此两个谱的每个有向间距都具有相同的重数，傅里叶模平方也逐点相同。这种自相关相等的集合称为同度量集。 [Grimm 与 Baake，第 1 节](https://arxiv.org/pdf/0808.0094v1)

令两个谱中每个点的权重均为 $1$。分别枚举等和的有序三元组对，允许一个三元组内重复使用某个指标，两边支撑须互斥。两组计数分别为 $5976$ 和 $5952$。例如将左侧三元组按首项分组，$A$ 的前三个首项 $0,1,3$ 分别贡献 $604,654,684$，$B$ 的对应贡献为 $602,641,625$。整数和的间距意味着同一计数适用于每个 $0\le\eta<1$。完整的二点自相关因此仍允许不同的次数三互斥残余质量。 [三次反例的 Lean 证明](lean:D5/S3/Fourier/Concentration/HomometricTripleCollision.differences_do_not_determine_triple_mass)

对任意有 $n$ 个指标的单位权重整数谱，记 $F(z)=\sum_j z^{g_j}$，$U(z)=F(z)F(z^{-1})$。次数三的互斥和差出现在 Laurent 多项式

$$
P_n(U(z))-3\bigl(F(z^2)F(z^{-1})^2+F(z^{-2})F(z)^2\bigr),
$$

其中 $P_n(u)=u^3+(18-9n)u^2+(18n^2-63n+51)u-6n^3+27n^2-31n$。对满足 $|k|\le\eta$ 的整数 $k$，把 $z^k$ 的系数相加便得到 $R_3(\eta)$。

[Lean 中的环恒等式](lean:D5/S3/Fourier/Concentration/DisjointTriplePhaseIdentity.disjoint_triple_phase_identity)

对左右三元组的九个跨边相等条件作容斥。选中的等式将六个位置连成若干分量，每个分量独立选一个指标。含 $a$ 个左位置和 $b$ 个右位置的分量贡献 $F(z^{a-b})$。只有三条边的星形分量可以产生 $a-b=\pm2$，两种方向各有三种中心选择，符号均为负。其余分量的贡献由 $n$ 和 $U$ 组成。

对于完整有向差分相同的两组谱，$P_n(U)$ 逐项相消。零分辨率下，余下差值等于有序关系 $2g_i=g_j+g_k$ 的计数差乘以 $-6$，其中允许三项相同。上面的 $A$ 和 $B$ 分别有 $25$ 和 $29$ 个这种关系，所以得到 $5976-5952=24$。正分辨率只需把等式换成 $|2g_i-g_j-g_k|\le\eta$。这里的分解适用于固定次数三及单位权重。

应用到实际 ζ 纵坐标时，次数一的估计只控制零附近的间距权重。这一恒等式中的 $A(\eta)$ 还比较远离零而彼此接近的间距。要约束这部分对 $E_p(\eta)$ 的贡献，仍需控制扣除共享端点后的相关和。

## 互斥残余支撑的乘积界

设权重非负。以 $U_d$ 记所有支撑互斥的有序 $d$ 次向量对的权重 $c_d(a)c_d(b)$ 之和。每个 $R_d(\eta)$ 都不超过 $U_d$。对 $s\ge0$ 和 $W=\sum_j w_j$，有
$$
s^{2d}U_d\le (d!)^2\prod_j(2e^{s w_j}-1)
\le (d!)^2\exp\!\left(2sW-\sum_j(1-e^{-s w_j})^2\right).
$$
将 $s^{2d}c_d(a)c_d(b)/(d!)^2$ 写成坐标系数 $(s w_j)^{a_j+b_j}/(a_j!b_j!)$ 的乘积。放宽两个总次数约束后，每个坐标可取任意满足 $a_j=0$ 或 $b_j=0$ 的非负整数对。该坐标的指数级数和为 $2e^x-1$，其中 $x=s w_j$，而 $(0,0)$ 只计一次。由 $2e^x-1=e^{2x}[1-(1-e^{-x})^2]$ 和 $1-u\le e^{-u}$ 得到第二个界。 [Flajolet 与 Sedgewick 的二元生成函数，§III.1](https://algo.inria.fr/flajolet/Publications/book.pdf)

若 $d\ge1$ 且 $W>0$，取 $s=d/W$ 并除以 $W^{2d}$，得到
$$
\frac{U_d}{W^{2d}}\le
\left(\frac{d!e^d}{d^d}\right)^2
\exp\!\left(-\sum_j(1-e^{-d w_j/W})^2\right).
$$
由 Stirling 公式，前因子渐近于 $2\pi d$。在 RH 下沿用上文合并重数的 ζ 尾段权重，并取 $d\asymp p\asymp X\log X$。在固定区间 $(X,CX]$ 内，至少有常数倍 $X\log X$ 个不同纵坐标，且各自满足 $w_j\ge1/(2CX)$。这些指标满足 $d w_j/W\gg1/\log T$，因此折减项之和至少为常数倍 $d/(\log T)^2$。另一方面，由 $x\ge0$ 时 $1-e^{-x}\le x$，该和至多为 $d^2 V/W^2=O(d/(\log T)^2)$。在 $d=p$ 时，归一化上界的量级为 $p\exp(-\Theta(p/(\log T)^2))$。而缺失窗口的矩预算即使只取一个网格点，也要求归一化质量至多为 $\exp(-2p\log\log T+O(p))$。仍需估计互斥对中满足频率条件的权重比例。 [Stirling 展开，DLMF §5.11(i)](https://dlmf.nist.gov/5.11.E1)
[乘积界的 Lean 证明](lean:D5/S3/Fourier/Concentration/DisjointSupportOccupationMass.scaled_disjoint_mass)


## 互斥占用系数的特征标投影

取正整数 $q$ 和模 $q$ 的剩余类 $a_j$，记 $\chi_k(r)=e^{2\pi i kr/q}$。设 $M_R$ 是有序、支撑互斥的 $d$ 次向量对的权重 $c_d(m)c_d(n)$ 之和，只计 $\sum_j (m_j-n_j)a_j$ 属于剩余类集合 $R$ 的配对。定义
$$
Q_k(x,y)=\prod_j\left(1+\sum_{h=1}^d\frac{w_j^h}{h!}
  \bigl[x^h\chi_k(-h a_j)+y^h\chi_k(h a_j)\bigr]\right).
$$
每个因子的两条坐标轴保证支撑互斥，混合系数固定两侧次数。所选各项的特征标相乘，对应其带符号间距相加。由正交性可得
$$
qM_R=(d!)^2\sum_{k\bmod q}[x^dy^d]Q_k(x,y)\sum_{r\in R}\chi_k(r).
$$
这里借鉴了相关有限指数和证明中用平均分离频率的做法，以有限循环群上的精确正交性代替区间平均。 [相关黎曼猜想形式化中的特征标平均](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78) [互斥系数公式的 Lean 证明](lean:D5/S3/Fourier/Concentration/CyclicDisjointOccupationCoefficient.cyclic_disjoint_band_product)

若权重非负，剩余类的质量非负，而其傅里叶系数可以为负。设两个不同指标权重均为一，模 $2$ 的剩余类分别为 $0,1$。任一正次数的互斥配对都须在两侧各用一个指标。若 $d$ 为奇数，两种有序配对的差都属于剩余类 $1$。因此剩余类质量在 $k=1$ 处的傅里叶系数为 $-2$，对 $R=\{0\}$ 恰好抵消零特征标的贡献。ζ 尾段在目标分辨率和增长次数下的非零特征标贡献仍待估计。

### 字符和相消时的系数上界

保留上一式中给定的特征标。记左轴的复相位权重为 $A_j=w_j\chi_k(-a_j)$，右轴的权重为其共轭 $\bar A_j$。令 $S=\sum_j A_j$。对任意 $\rho>0$，有

$$
(d!)^2\left|[x^dy^d]Q_k\right|
\le
\frac{(d!)^2}{\rho^{2d}}
e^{2\rho|S|}
\prod_j\left(1+(e^{\rho w_j}-1)^2\right).
$$

截断次数达到 $d$ 后，两轴上更高次项不会改变所取系数。于是可以用完整的指数级数，先把每个局部因子写成

$$
e^{A_jx}+e^{\bar A_jy}-1
=e^{A_jx+\bar A_jy}\left[1-(1-e^{-A_jx})(1-e^{-\bar A_jy})\right].
$$

指数部分相乘后成为 $e^{Sx+\bar Sy}$，保留了不同相位的相消。展开其余乘积，每个子集产生两个相互分离的一元级数。取一元级数的系数绝对值并按 $\rho$ 加权求和，柯西乘积的三角不等式给出乘法上界。指数因子的总和是 $e^{\rho|S|}$，局部去常数因子的总和是 $e^{\rho w_j}-1$。乘上两轴的估计，再把子集求和合回乘积，得到上述不等式。该证明也适用于两轴独立的复权重及不相等的次数。

每个修正项在两轴上的次数均至少为一。对所取的 $(d,d)$ 系数，只需累加基数不超过 $d$ 的子集。空集对应 $e^{Sx+\bar Sy}$，乘上 $(d!)^2$ 后，它的系数模长正好是 $|S|^{2d}$。全乘积界为空集分配的是 $(d!)^2e^{2\rho|S|}/\rho^{2d}$。其余项的上界为

$$
\frac{(d!)^2}{\rho^{2d}}e^{2\rho|S|}
\sum_{\substack{I\subseteq J\\0<|I|\le d}}\prod_{j\in I}(e^{\rho w_j}-1)^2.
$$

两者相加给出更紧的估计。全乘积便于再用权重平方和估计。

当每个 $\rho w_j\le1$ 时，乘积至多为 $\exp(4\rho^2\sum_j w_j^2)$。这一有限估计把频带分析归结为控制各字符的 $S$，同时计入它们在频带反演中的权重。对实际 ζ 零点，在所需时间尺度上控制相应加权指数和及其异常频率，仍是开放的算术步骤。

[互斥系数上界的 Lean 证明](lean:D5/S3/Fourier/Concentration/DisjointCharacterEnvelope.coefficient_envelope)

### 共轭相位下带符号的截断余项

在上述共轭权重的情形，令 $C_T=[x^d]e^{Sx}\prod_{j\in T}(e^{-A_jx}-1)$。记 $B_T=0$ 若 $|T|>d$，否则定义
$$
B_T=\left(\prod_{j\in T}w_j\right)\frac{(|S|+\sum_{j\in T}w_j)^{d-|T|}}{(d-|T|)!}.
$$
逐个子集保留符号，得到实数恒等式及次数敏感的界
$$
[x^dy^d]Q_k=\sum_{\substack{T\subseteq J\\|T|\le d}}(-1)^{|T|}|C_T|^2,\qquad |C_T|\le B_T.
$$
右轴的局部修正是左轴修正取共轭后的相反数，故每个子集恰好贡献上述带符号平方。局部指数尾的第 $n\ge1$ 次系数模长至多为 $w_j^n/(n-1)!$，于是它逐系数受 $w_j x e^{w_j x}$ 控制。柯西乘积逐次保留该非负界，乘上 $e^{|S|x}$ 后从总次数中扣除 $|T|$，得到 $B_T$。例如 $d=1$ 时，混合系数为 $|S|^2-\sum_jw_j^2$，所以 $S=0$ 时全部贡献非正。

对任意自然数 $K$，从该混合系数中减去 $|T|\le\min(d,K)$ 的带符号和，所得余项 $R_K$ 满足
$$
-\!\sum_{\substack{T\subseteq J\\K<|T|\le d,\ |T|\text{ 为奇数}}}B_T^2\le R_K\le
\sum_{\substack{T\subseteq J\\K<|T|\le d,\ |T|\text{ 为偶数}}}B_T^2.
$$
余项恰为未保留的偶数阶平方和减去奇数阶平方和。当 $K\ge d$ 时余项为零。乘上非负的傅里叶权重并求和时，可继续保留已计算的负贡献。这为下述 Fejér 频带估计提供了随次数变化的精细界。实际 ζ 零点对应的高阶子集平方和以及异常字符的总权重仍需要新的算术估计。 [Lean 带符号展开证明](lean:D5/S3/Fourier/Concentration/DisjointCharacterRemainder.signed_overlap_expansion) [Lean 奇偶余项界证明](lean:D5/S3/Fourier/Concentration/DisjointCharacterRemainder.signed_overlap_remainder)

#### 中心化后的二次指数系数界

保持 $C_T$ 的定义，令 $k_T=|T|$、$n=d-k_T$、$U_T=S-\frac12\sum_{j\in T}A_j$ 及 $V_T=\sum_{j\in T}w_j^2$。当 $k_T\le d$ 时，还可用
$$
|C_T|\le\left(\prod_{j\in T}w_j\right)\sum_{m=0}^{\lfloor n/2\rfloor}\frac{|U_T|^{n-2m}(V_T/24)^m}{(n-2m)!m!}.
$$
这一界保留了被选子集的中心相位和与平方权重。具体地，局部差分满足
$$
e^{-A_jx}-1=-A_j x e^{-A_j x/2}\sum_{m\ge0}\frac{(A_jx/2)^{2m}}{(2m+1)!}.
$$
由 $6^m m!\le(2m+1)!$，局部偶次系数的模长逐项受 $e^{w_j^2 x^2/24}$ 控制。抽取 $k_T$ 个线性因子，合并相位指数，对柯西乘积逐系数估计，得到 $e^{|U_T|x+V_T x^2/24}$ 在次数 $n$ 的系数。若 $k_T>d$，原系数为零。取 $n=0$ 或 $n=1$ 时上界为等式。若 $U_T=0$ 且 $n$ 为奇数，系数必为零。对于用任意指数参数 $c$ 代替 $S$ 的一般形式，取单元素集 $T=\{j\}$、$A_j\ne0$ 及 $c=A_j/2$，在 $d=3$ 时有 $|C_T|=w_j^3/24$，二次指数控制的常数 $1/24$ 在此达到等号。[双曲正弦的幂级数](https://dlmf.nist.gov/4.33.E2)

可将此界用于上面的奇、偶余项预算，与先前的 $B_T$ 逐子集取较小值。在实际 ζ 尾段，仍须估计带字符权重的子集中心相位和的分布，并控制增长次数下的总余项。 [中心化交叠系数界的 Lean 证明](lean:D5/S3/Fourier/Concentration/CenteredDisjointCharacterBound.centered_overlap_bound)

#### 带符号主项和与显式误差

中心化的偶次因子常数项均为一。沿用上述记号，对 $|T|\le d$ 定义
$$
P_T=\left(\prod_{j\in T}(-A_j)\right)\frac{U_T^n}{n!},\qquad h_T=\frac{|U_T|^n}{n!},\qquad H_T=[x^n]e^{|U_T|x+V_T x^2/24},\qquad A_T=\prod_{j\in T}w_j.
$$
将偶次因子的乘积及其二次指数实数上界同时减去一后，逐系数控制仍成立。因此
$$
|C_T-P_T|\le A_T(H_T-h_T),\qquad
\big||C_T|^2-|P_T|^2\big|\le A_T^2(H_T^2-h_T^2).
$$
第二个不等式将两个模长之差的反三角不等式上界乘以两模长之和，后者至多为 $A_T(H_T+h_T)$。结合局部误差估计与带符号展开，得到
$$
\left|[x^dy^d]Q_k-\sum_{\substack{T\subseteq J\\|T|\le d}}(-1)^{|T|}|P_T|^2\right|\le\sum_{\substack{T\subseteq J\\|T|\le d}}A_T^2(H_T^2-h_T^2).
$$
当 $d-|T|=0,1$ 时对应项的误差为零，空集的误差也是零。特别地，$d\le2$ 时整个近似为精确恒等式。对每个字符该不等式均成立，并可用非负傅里叶权重求平均。实际 ζ 零点所需尺度下的交替主项和与总误差仍待估计。 [Lean 主系数证明](lean:D5/S3/Fourier/Concentration/CenteredDisjointPrincipal.centered_principal_remainder) [Lean 混合误差证明](lean:D5/S3/Fourier/Concentration/CenteredDisjointPrincipal.mixed_centered_principal_error)

### 用非负傅里叶权重估计频带

记 $R_H$ 为 $[-H,H]$ 中整数的模 $q$ 剩余类。对任意非负的剩余类质量 $M(r)$，定义 $B_N(k)=\sum_{j=0}^{N-1}\chi_k(j)$，并用负号特征标定义 $\widehat M(k)=\sum_rM(r)\chi_k(-r)$。当整数 $N>H\ge0$ 时，

$$
(N-H)\sum_{r\in R_H}M(r)+H M(0)
\le \frac{1}{q}\sum_{k\bmod q}|B_N(k)|^2\operatorname{Re}\widehat M(k).
$$

[循环频带上界的 Lean 证明](lean:D5/S3/Fourier/Concentration/CyclicFejerBand.band_le_positive_fourier)

对任一带内代表元 $h$，从两坐标都等于 $j$ 的配对出发。令 $0\le j<N-H$，按 $h$ 的符号将第一或第二坐标增加 $|h|$。这给出至少 $N-H$ 个差为 $h\bmod q$ 的有序对，且两坐标都在 $[0,N-1]$。对全体配对应用傅里叶反演，两个坐标的字符和互为共轭，于是得到非负权重 $|B_N(k)|^2$。差为零时，$N$ 个对角配对都作贡献，因此左侧还有 $HM(0)$。右侧取实部后，字符贡献仍可相消。

当 $N\le q$ 时，前 $N$ 个自然数的剩余类互异，正交性给出 $\sum_k|B_N(k)|^2=qN$。若只掌握各频率的模长，可以略去 $HM(0)$ 并用 $|\widehat M(k)|$ 代替实部。带内质量于是至多为概率加权的模长平均乘以 $N/(N-H)$。取 $N=2H+1\le q$ 时，因子小于 $2$。对于互斥占用质量，把前面的系数上界代入这个平均，仍需控制实际 ζ 零点使字符和变大的频率及其权重。[Fejér 核](https://dlmf.nist.gov/1.15#E15)

### 异常频率集合上的前缀权重

当 $1\le N\le q$ 时，记 $\nu(k)=|B_N(k)|^2/(qN)$，$m=(2N-q-1)_+$，其中 $x_+=\max(x,0)$。这组权重的平方和为

$$
\sum_{k\bmod q}\nu(k)^2
=\frac{N(2N^2+1)+m(m+1)(m+2)}{3qN^2}.
$$

[四次矩恒等式的 Lean 证明](lean:D5/S3/Fourier/Concentration/CyclicPrefixFourthMoment.sum_prefixCharacter_norm_four)

对 $0\le r<q$，前缀指标的整数差若等于 $r\bmod q$，只能是 $r$ 或 $r-q$。有序对计数 $c_r$ 因而等于 $(N-r)_++(N-(q-r))_+$。特征标正交性给出 $\sum_k|B_N(k)|^4=q\sum_r c_r^2$。展开平方时，两项同时为正的区间是 $q-N+1\le r<N$。按相反次序排列两个计数，交叉项等于 $2\sum_{j=1}^m j(m+1-j)=m(m+1)(m+2)/3$。当 $q\ge 2N-1$ 时，这一项为零。当 $N=q$ 时，全部权重集中在零频。

对任意异常频率集合 $E$，柯西–施瓦茨不等式给出 $(\sum_{k\in E}\nu(k))^2\le |E|\sum_k\nu(k)^2$。若 $E$ 排除零频，还可从右侧的平方和中扣除 $\nu(0)^2=(N/q)^2$。实际 ζ 零点的高阶字符和在哪些频率超过阈值、这些频率有多少，仍需算术估计。

### 一个空间模式约束下的最小平方和

令 $q>1$，$c_k=\cos(2\pi k/q)$。特征标正交性给出 $c_k$ 的均值为零，最大值为一。在非负概率权重 $w(k)$ 中，若只要求 $\sum_k w(k)c_k\ge a$，其中 $0\le a\le1$，则达到最小平方和的权重形如

$$
u_t(k)=\max\{0,1-t(1-c_k)\},\qquad
v_t(k)=\frac{u_t(k)}{\sum_j u_t(j)},\qquad t\ge0.
$$

$t=0$ 时权重均匀，矩为零。$t$ 足够大时，所有 $c_k<1$ 的项都被截为零，矩升至一。归一化分母始终至少为一，因此连续性给出使矩恰为 $a$ 的有限参数。对每个可行的 $w$，未截断的仿射权重与 $w-v_t$ 的内积非负，因为总质量相等，且 $w$ 的矩不小于 $v_t$ 的矩。截断只增加这个内积。展开平方和得到 $\sum_k w(k)^2-\sum_k v_t(k)^2\ge\sum_k(w(k)-v_t(k))^2$，故最优权重唯一。 [线性矩约束下的单纯形投影，Zhou 与 Liu，式 (3.4)](https://arxiv.org/html/2310.10388v3#S3.E4X)

令 $E(w)=\sum_k w(k)^2$，$M(w)=\sum_k w(k)c_k$，$Z=\sum_k u_t(k)$。对任意总质量为一的实权重 $w$，展开平方得到精确余项
$$
E(w)-E(v_t)
=\sum_k(w(k)-v_t(k))^2+
\frac{2}{Z}\left[t(M(w)-M(v_t))
+\sum_k\bigl(t(1-c_k)-1\bigr)_+w(k)\right].
$$
右端最后一项记录了被截去的负仿射权重。可取 $t\le\max(\{0\}\cup\{(1-c_k)^{-1}:c_k<1\})$。

[单矩最优权重与精确余量的 Lean 证明](lean:D5/S3/Fourier/Concentration/ClippedMomentWeights.exists_clipped_moment_minimizer)

模四时 $c=(1,0,-1,0)$。若 $0\le a\le 1/2$，最优权重为 $(1+2a,1,1-2a,1)/4$，平方和为 $(1+2a^2)/4$。当 $1/2\le a\le1$ 时，最优权重为 $(a,(1-a)/2,0,(1-a)/2)$，平方和为 $a^2+(1-a)^2/2$。两式在 $a=1/2$ 处相接。这个最小值给出了单个空间模式约束下，异常集合基数界中平方和系数的优化基准。整个频带的联合约束，以及实际 ζ 零点异常频率的基数，仍需要额外的估计。

### 两个空间模态的首次截断阈值

取 $q\ge5$，记 $c_k=\cos(2\pi k/q)$、$d_k=\cos(4\pi k/q)$、$s_k=c_k+d_k$。令 $m_q=\min_k s_k$，并设
$$
a_q=-\frac{1}{2m_q},\qquad v_k=\frac{1+2as_k}{q},\qquad L=\frac{1+4a^2}{q}.
$$
对任意实数 $a$，向量 $v$ 的总质量为一，两个实矩都等于 $a$。当 $a\ge0$ 时，所有仿射权重非负当且仅当 $a\le a_q$。当 $a\ge0$ 时，若概率权重非负且两矩至少为 $a$，其平方和等于 $L$ 当且仅当该权重等于 $v$。在这一非负阈值范围内，等号可取当且仅当 $a\le a_q$。记 $M_j(w)$ 为 $w$ 的第 $j$ 个实矩。对任意实数 $a$ 和总质量为一的任意实向量 $w$，有
$$
\sum_k w_k^2-L
=\sum_k(w_k-v_k)^2+\frac{4a}{q}\bigl(M_1(w)+M_2(w)-2a\bigr).
$$
这来自两个余弦的正交性和平方差展开。若 $a>a_q$，至少一个 $v_k<0$。如果 $w$ 是同时满足两个矩下界的非负概率权重，矩余量一项非负。负坐标上的平方距离给出 $\sum_k w_k^2\ge L+\sum_k\max(0,-v_k)^2>L$。一般模数下，截断后的精确最优值仍待求解。

倍角公式给出 $s_k=2(c_k+1/4)^2-9/8$。角度是 $\pi$ 的有理倍数，Niven 定理因此排除了 $c_k=-1/4$。于是 $m_q>-9/8$。将余弦等于 $-1/4$ 的角四舍五入到最近的格点，误差至多为 $\pi/q$，故 $m_q+9/8\le 2(\pi/q)^2$。另外，$s_k$ 的均值为零，平方均值为一，对 $(2-s_k)(s_k-m_q)\ge0$ 取均值得到 $m_q\le-1/2$。整理两端得到
$$
0<a_q-\frac49\le\frac{16\pi^2}{9q^2}.
$$
因此 $4/9$ 是跨模数统一适用的阈值下界。这个结论控制有限权重的平方和，实际 ζ 零点的高阶异常频率仍需算术估计。 [首次截断阈值的 Lean 证明](lean:D5/S3/Fourier/Concentration/FirstCosineClipping.first_cosine_clipping)

### 模六时两个空间模态的最小平方和

在六个剩余类上，令 $M_j(w)=\sum_{k=0}^5w_k\cos(j\pi k/3)$，$E(w)=\sum_{k=0}^5w_k^2$。取 $0\le a\le1$。同时要求非负概率权重满足 $M_1(w)\ge a$ 和 $M_2(w)\ge a$ 时，唯一的最优权重 $v$ 及其平方和为

$$
\begin{aligned}
v&=
\begin{cases}
(1+4a,1,1-2a,1,1-2a,1)/6,& a\le1/2,\\
(a,(1-a)/3,0,(1-a)/3,0,(1-a)/3),& a>1/2,
\end{cases}\\
E(v)&=
\begin{cases}
(1+4a^2)/6,& a\le1/2,\\
a^2+(1-a)^2/3,& a>1/2.
\end{cases}
\end{aligned}
$$

记 $c_k=\cos(\pi k/3)$、$d_k=\cos(2\pi k/3)$。在 $c_k+d_k$ 的每个等值集合内，$c_k-d_k$ 之和为零。因此对合并读数 $c_k+d_k$ 用阈值 $2a$ 求最优权重，就得到 $M_1(v)=M_2(v)=a$。当阈值越过 $1/2$，剩余类 $2,4$ 的仿射权重被截为零。两段公式在交界处一致。 [模六最优值与单模比较的 Lean 证明](lean:D5/S3/Fourier/Concentration/SixResidueMomentOptimum.six_two_mode_optimum)

对任意实权重 $w$，只要求 $\sum_k w_k=1$。记 $m=M_1(w)+M_2(w)-2a$，则精确余量为

$$
E(w)-E(v)-E(w-v)=
\begin{cases}
(2a/3)m,& a\le1/2,\\
((4a-1)/3)m+(2a-1)(w_2+w_4),& a>1/2.
\end{cases}
$$

对非负概率权重 $w$，若 $M_1(w)+M_2(w)\ge2a$，则有 $E(w)-E(v)\ge\sum_k(w_k-v_k)^2$，所以任何达到最小值的权重都等于 $v$。对 $0<a<1$，只约束 $M_1$ 的最优权重 $p$ 满足 $M_1(p)=a$，却有 $M_2(p)<a$。这是同时约束两个模态时必须计入的差异。

这组 $v$ 也是模六非负空间核的归一化傅里叶权重。它关于 $k\mapsto-k$ 对称，第三个实矩 $M_3(v)$ 在第一段为零，在第二段为 $2a-1$。反演得到 $F(0)=1$、$F(\pm1)=F(\pm2)=a$、$F(3)=M_3(v)\ge0$。这个最优值给出模六频带的平方和系数。推广到其他模数需要核对合并读数的等值集合，实际 ζ 零点的异常频率仍需要算术估计。

### 合并两个模态的截断何时失效

令 $q\ge7$，记 $c_k=\cos(2\pi k/q)$、$d_k=\cos(4\pi k/q)$、$s_k=c_k+d_k$，以及 $x_+=\max(0,x)$。这两个带符号的和分别检测平方读数和零截断的差异：

$$
\sum_{k\bmod q}(c_k-d_k)s_k^2=\frac q4,\qquad
\sum_{k\bmod q}(c_k-d_k)(s_k)_+>0.
$$

倍角公式给出 $s_k=(2c_k-1)(c_k+1)$ 和 $c_k-d_k=(1-c_k)(2c_k+1)$。若 $s_k>0$，则 $c_k>1/2$，故截断后的每项非负。$k=1$ 的角度在 $(0,\pi/3)$ 内，故 $1/2<c_1<1$，其项严格为正。由于 $s_0=2$，归一化权重 $v_k=(s_k)_+/\sum_i(s_i)_+$ 的分母为正。取阈值为 $v$ 的两个矩的平均，合并读数达到所需总量，第二模态却低于该阈值。

令 $z_k=e^{2\pi i k/q}$，把 $(c_k-d_k)s_k^2$ 展开成 $z_k$ 的幂并按指数分组。常数项的两项均来自 $c_k^2d_k$，各为 $1/8$。其余指数的绝对值介于 $1$ 与 $6$，在模 $q\ge7$ 求和时由特征标正交性消去。若每个 $s_k$ 等值集合上 $c_k-d_k$ 的和都为零，平方读数的加权和也会为零。按指数分组保留系数的做法对应 Alpöge 的指数狄利克雷级数证明中按指数和组织乘积项的步骤。[Alpöge 的指数狄利克雷级数证明](https://github.com/the-omega-institute/riemann-hypothesis/blob/c7d25b3bfd7906388bb8eb0774e027a2b756a7b6/src/Development/AbelianVarietyTheory/Proofs/AdelicLatticeProofs/LandauSummableOfExpDirichletSeriesEntire.lean#L84) [Lean 核验两条余弦不平衡公式](lean:D5/S3/Fourier/Concentration/AggregateCosineBalance.aggregate_cosine_imbalance)

### 短时间范围内的傅里叶权重

设 $F$ 是模 $q$ 的非负实函数，$\widehat F$ 的各项是非负实数，且 $F(0)>0$。由反演，$\nu(k)=\widehat F(k)/(qF(0))$ 是概率权重。设 $F(r\bmod q)\ge a\ge0$ 对所有 $|r|\le H$ 成立。对 $2H<q$、$2K<q$ 且 $2HK\le q$，有
$$
\sum_{|k|\le K}\nu(k\bmod q)
\le (2K+1)\nu(0)
-\frac{8a}{q^3F(0)}
 \left(\sum_{r=-H}^{H}r^2\right)
 \left(\sum_{k=-K}^{K}k^2\right).
$$
零频系数减去第 $k$ 项的实部，等于对所有 $r$ 求和的 $F(r)(1-\cos(2\pi rk/q))$。每项非负，故可保留 $|r|\le H$ 的项。相位落在 $[-\pi,\pi]$ 时，$1-\cos u\ge2u^2/\pi^2$。对整个整数对集合应用该界后，$r$ 和 $k$ 的平方和分离。$K=0$ 时取等号。若 $a>0$ 且 $H,K>0$，平方和项严格为正。 [短时间傅里叶权重界的 Lean 证明](lean:D5/S3/Fourier/Concentration/CyclicShortTimeWeight.low_fourier_weight_deficit)

对于上节的前缀配对核，$F(r)$ 是差为 $r$ 的配对数，因而可取 $a=N-H$。当 $N\le q$ 时，$F(0)=N$，$\nu(0)=N/q$。在步长为 $d$ 的频率格上，第 $k$ 项对应时间 $2\pi k/(qd)$。显式公式可控的时间区间只覆盖相应的一段整数 $k$。上界给出该段至多获得多少权重，剩余权重仍需要算术估计。

给定时间截止 $S\ge0$，令 $K=\lfloor qdS/(2\pi)\rfloor$ 并设 $2K<q$。由 $|B_N(k)|\le N$ 还有
$$
\nu(\{|k|\le K\}\bmod q)\le (2K+1)N/q
\le N/q+NdS/\pi.
$$
取 $H=\lfloor\eta/d\rfloor$ 和 $N=2H+1\le q$，则 $Nd\le2\eta+d$。当 $N/q\to0$ 且 $(2\eta+d)S\to0$ 时，即使控制了截止 $S$ 内所有模式，覆盖的权重仍趋于零。对于 $g_\gamma=\gamma/r$，若 $\log x$ 的估计范围只到常数倍 $\log X$，时间范围也只到常数倍 $r\log X$。更细分辨率下的算术估计还须覆盖该时间范围之外的模式。

## 同时记录公共占用次数

沿用上述剩余类，在二元乘积中加入变量 $z$ 记录两个 $p$ 次向量的公共部分。记 $h=\sum_j\min(m_j,n_j)$，则残余次数为 $p-h$。令 $M_{h,R}$ 为公共次数等于 $h$、带符号频率差属于 $R$ 的配对权重。定义
$$
Q_k(x,y,z)=\prod_j\sum_{u,v=0}^p
 \frac{w_j^{u+v}}{u!\,v!}\,x^uy^vz^{\min(u,v)}
 \chi_k(-(u-v)a_j).
$$
在每个坐标选择 $(u,v)$ 会给两侧次数分别增加 $u,v$，给公共次数增加 $\min(u,v)$。固定两侧次数为 $p$ 后，乘以 $(p!)^2$ 恢复多项式权重。各特征标因子相乘给出带符号频率差的特征标。因此
$$
qM_{h,R}=(p!)^2\sum_{k\bmod q}
 [x^py^pz^h]Q_k(x,y,z)\sum_{r\in R}\chi_k(r).
$$
当 $h=0$ 时得到支撑互斥的公式。当 $h=p$ 时，两侧次数之和相等，且公共部分达到全部次数，故 $m=n$。若 $0\in R$，质量恰为对角质量，否则为零。例如，两个权重为一的指标的剩余类分别为模 $11$ 的 $0,1$。若 $p=2$、$h=1$，剩余类 $1$ 上的质量为 $4$，来自 $((1,1),(2,0))$ 和 $((0,2),(1,1))$ 两对，每对权重为 $2$。同一乘积同时记录公共次数和频率差，因而可以研究二者的联合分布。在 ζ 的目标分辨率下仍需建立相应的界。 [公共占用次数公式的 Lean 证明](lean:D5/S3/Fourier/Concentration/CommonResidualOccupationCoefficient.common_residual_band)

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

## 联合最优解的两个余弦约束均取等

取 $q\ge4$，记 $c_k=\cos(2\pi k/q)$ 和 $d_k=\cos(4\pi k/q)$，并固定 $0<a<1$。在概率权重中，分别在 $\sum_k w_k c_k\ge a$ 或 $\sum_k w_k d_k\ge a$ 这一个约束下最小化 $\sum_k w_k^2$。单约束最优解在自己的约束上取等，另一个矩则严格小于 $a$。因此，同时满足两个下界的最小平方和权重，其两个矩都等于 $a$。

对于单个读数 $b$，最优权重正比于 $f(b_k)$，其中 $f(x)=\max(0,1-t(1-x))$，且 $t>0$。所有读数小于 $1$ 的坐标中，读数最大者的截断权重为正。若其权重为零，正权重便全部落在读数等于 $1$ 的坐标，矩也等于 $1$。对第一模态，这个最大读数是 $c_1$。恒等式 $c_k-d_k=(1-c_k)(2c_k+1)$ 在 $c_k=-1/2$ 处变号。由于两个读数的均值都是零，从每项权重减去 $f(-1/2)$ 不改变带符号的和。每个乘积 $(c_k-d_k)(f(c_k)-f(-1/2))$ 都非负，$k=1$ 的乘积严格为正。

对第二模态，若周期为偶数，平移半个周期保持 $d$ 并使 $c$ 变号，故第一矩为零。若周期为奇数，乘以二置换余数类，因此 $f(c_k)^2$ 和 $f(d_k)^2$ 的和相等。凸函数 $f^2$ 的导数为 $2tf$。在 $d_k$ 处取切线，并在 $c_k$ 处比较，得到逐项不等式。在 $k=1$ 处有 $d_1<c_1$ 且 $f(c_1)>0$，不等式严格成立。求和便得 $\sum_k(d_k-c_k)f(d_k)>0$。由于倍增是置换，此时 $d$ 和 $c$ 在小于 $1$ 的读数中拥有相同的最大值。

若联合最优解有一个下界留有余量，就可以向另一个下界的单约束最优解移动一小段。混合后的概率权重仍满足两个下界，且平方和严格下降。这两个矩等式在支撑改变后仍然成立。一般模数下截断后的支撑和精确最优值，以及实际 ζ 零点高阶谐波的异常频率估计，仍待求解。 [两个约束取等的 Lean 证明](lean:D5/S3/Fourier/Concentration/ActiveCosineConstraints.active_cosine_constraints)

## 两个余弦矩的精确高阈值区间

固定整数 $q\ge4$，记 $c_k=\cos(2\pi k/q)$、$d_k=2c_k^2-1$。$c_k=1$ 仅在零点成立。其余剩余类的最大值为 $u=c_1$，最小值为 $\ell=c_{\lfloor q/2\rfloor}$。记这两个余弦层的重数为 $n_u,n_\ell$，并令
$$
g(x)=x-(2x^2-1),\qquad
p=\frac{-g(\ell)}{g(u)-g(\ell)},\qquad
b=pu+(1-p)\ell,\qquad r=\frac{1-a}{1-b}.
$$
由 $g(\ell)<0<g(u)$ 得 $0<p<1$。将质量 $1-r$ 放在零点，将质量 $rp$ 均分给余弦值为 $u$ 的剩余类，并将质量 $r(1-p)$ 均分给余弦值为 $\ell$ 的剩余类。所得向量 $v$ 的两个矩都等于 $a$，平方和为
$$
E(v)=(1-r)^2+r^2\left(\frac{p^2}{n_u}+\frac{(1-p)^2}{n_\ell}\right).
$$

为确定最优区间，用 $P_r(x)=\alpha_r+\beta_rx+\gamma_r(2x^2-1)$ 插值 $1,u,\ell$ 三层上每个剩余类的权重。系数和各处的 $P_r(x)$ 都是 $r$ 的仿射函数。$r=0$ 时，插值多项式为 $(x-u)(x-\ell)/((1-u)(1-\ell))$。由于 $u+\ell<0$，两个矩的系数均为正，而且所有中间余弦层都有 $P_0(x)<0$。对 $\beta_r,\gamma_r$ 以及各中间层的 $-P_r(x)$，将每个量视为 $r$ 的函数 $f$，计算 $1-f(1)/f(0)$。记这些数与 $1$ 的最大值为 $B$，并令
$$
a_{\mathrm{crit}}=1-\frac{1-b}{B}.
$$
此时 $b<a_{\mathrm{crit}}<1$。若 $a_{\mathrm{crit}}\le a\le1$，则插值多项式的两个矩系数非负，且 $v_k=\max(0,P_r(c_k))$。对两个矩都至少为 $a$ 的任意概率权重 $w$，展开平方可得 $E(w)-E(v)\ge\sum_k(w_k-v_k)^2$。因此在这一闭区间上，上述平方和由 $v$ 唯一达到。

若 $b<a<a_{\mathrm{crit}}$，三个支撑层上的权重仍为正。若某个矩系数为负，可以在支撑内略微增加相应的矩，并保持另一个矩。若某个中间层的插值为正，则可以在那里增加少量权重，同时调整三个支撑层以保持两个矩和总质量。两种改动都给出平方和严格更小的可行权重。当 $a=b$ 时，原权重在零点的质量为零。向零点的点质量作小幅混合，仍可满足两个下界，并因两者的支撑不相交而降低平方和。对任意已严格降低平方和的竞争者，再小幅混入零点的点质量，仍保持平方和严格较低，并使两个矩都严格超过 $a$。临界值以下的一般最优权重，以及实际 ζ 零点的高阶谐波异常频率的算术估计，仍待求解。

[精确区间与严格下降的 Lean 证明](lean:D5/S3/Fourier/Concentration/HighCosineThreshold.cyclic_high_threshold_certificate)

对每个 $q\ge13$，最先接触插值多项式零点的中间余弦层是 $\cos(4\pi/q)$。记 $v_*=\cos(4\pi/q)$、$h=1-u$、$d=1-\ell$、$A=p/2$、$C=(1-p)/n_\ell$。上端层恰有两个剩余类。令 $S_\gamma$ 为 $\gamma_r$ 的斜率读数，$S(x)$ 为中间层 $x$ 的证书不等式的斜率读数。拉格朗日插值给出
$$
S_\gamma=1+\frac{Ad-Ch}{u-\ell},\qquad
S(x)=S_\gamma+\frac{hd}{u-\ell}\left(\frac{A}{u-x}+\frac{C}{x-\ell}\right).
$$
若 $A\ge C$，则 $\beta_r$ 的斜率读数不超过 $S_\gamma$。把网格角度折入 $[0,\pi]$ 后，每个中间层都满足 $x\le v_*$。对 $x<v_*$，$S(v_*)-S(x)$ 的符号由
$$
A(v_*-\ell)(x-\ell)-C(u-v_*)(u-x)
$$
决定。对偶数 $q\ge14$，有 $\ell=-1$ 和 $x\ge-u$。由 $u>8/9$ 得 $C/A\le g(u)<25/81$，而 $(v_*-\ell)(x-\ell)/((u-v_*)(u-x))\ge u/(2u+1)>8/25$。对奇数 $q\ge13$，令 $w=\cos(\pi/q)$，则 $\ell=-w$，且 $x-\ell\ge2w(1-u)$。用 $\pi^2<10$ 及 $1-\cos t\le t^2/2$ 可得 $C/A<2/5$，而同一个比值超过 $19/40$。由此只有 $v_*$ 接触零点，两个矩系数仍严格为正。

令 $r_s=(1-s)/(1-b)$。插值在该层的值满足
$$
P_{r_s}(v_*)=P_0(v_*)\frac{s-a_{\mathrm{crit}}}{1-a_{\mathrm{crit}}},\qquad P_0(v_*)<0.
$$
当 $s$ 下降至临界值以下时，该值转正。十三是这个统一范围的最小起点。在 $q=12$ 时，$u=\sqrt{3}/2$，且 $g(u)(2u+1)=1>u$，使下方中间层 $-u$ 的斜率更大。此时在临界值处，$v_*$ 的插值仍为负。

$u,\ell,p$ 的极限依次为 $1,-1,1$。由 $1-p=h(2u+1)/(g(u)-g(\ell))$ 得 $(1-b)/h\to4$。斜率中的比值 $h/(u-v_*)=1/(2u+1)$ 在极限中仍有贡献，代入得 $B=S(v_*)\to5/3$。结合 $q^2h\to2\pi^2$，高阈值区间的宽度满足
$$
q^2(1-a_{\mathrm{crit}}(q))\longrightarrow\frac{24\pi^2}{5}.
$$

[首次接触与仿射过零的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/HighCosineThresholdLimit.cyclic_threshold_first_contact) · [模十二例外的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/HighCosineThresholdLimit.cyclic_threshold_twelve_no_contact) · [锐利宽度极限的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/HighCosineThresholdLimit.cyclic_criticalThreshold_limit)

## 整数格点上最小平方和的支撑阈值

在大模数下，零点附近的二次余弦亏量把问题引向整数格点。先固定格点上的二阶矩预算 $m\ge0$。在满足 $\sum_j w_j=1$、$w_j\ge0$、$\sum_j j^2 w_j\le m$ 的权重中，最小化 $\sum_j w_j^2$。这里所有指标 $j$ 都在 $\mathbb Z$ 上，二阶矩要求可和。

对每个正整数 $n$，预算恰在区间 $[(n^2-1)/5,n(n+2)/5]$ 内时，存在 $n^2\le t\le(n+1)^2$ 使最优权重为
$$
w_j=\frac{(t-j^2)_+}{Z},\qquad
Z=\sum_{|j|\le n}(t-j^2)>0.
$$
它的二阶矩恰为 $m$。区间两端分别对应 $t=n^2$ 与 $t=(n+1)^2$。在下端点，仅 $|j|\le n-1$ 的位置有正权重。越过该端点后，支撑扩到 $|j|\le n$，并保持到上端点。所有这些闭区间首尾相接，覆盖 $m\ge0$。当 $m=0$ 时，全部权重在零点。

候选权重的二阶矩是有限和的比值。代入 $t$ 的两个端点，用平方和与四次方和公式得到预算的两个端点。连续性给出中间的预算。对任意非负且总质量为一的权重 $v$，设其二阶矩可和，和为 $s$。展开平方差，将交叉项分成仿射函数 $(t-j^2)/Z$ 的贡献和支撑外的修正，得到
$$
\sum_j v_j^2-\sum_j w_j^2
= \sum_j(v_j-w_j)^2+\frac{2(m-s)}{Z}
  +\frac{2}{Z}\sum_j (j^2-t)_+v_j.
$$
最后一项可和且非负。当 $s\le m$ 时，等式给出权重的严格唯一性。由于 $t\ge1$，由 $w_0=t/Z$ 和 $w_0-w_1=1/Z$ 还可唯一确定 $t$ 和 $Z$。相邻闭区间在公共端点给出同样的权重与参数。半开区间 $(n^2-1)/5\le m<n(n+2)/5$ 则给出唯一指标 $n=\lfloor\sqrt{5m+1}\rfloor$。第一段 $0\le m\le3/5$ 只有零点及其两个邻点，权重分别为 $1-m,m/2,m/2$。用第二谐波的尺度 $\lambda=8\pi^2m$ 表示，第一段上端恰为 $24\pi^2/5$。把格点最小值定量传回有限循环群，还须处理第二谐波在对径附近也接近 $1$ 的情形。

[闭区间支撑与精确余项的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/LatticeSquareMomentActivation.exists_lattice_square_moment_minimizer_on_interval) · [全局半开区间分类的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/LatticeSquareMomentActivation.exists_lattice_square_moment_minimizer)

### 有限循环群的最小值收敛到格点最小值

固定 $\lambda\ge0$，令 $m=\lambda/(8\pi^2)$、$a=1-\lambda/q^2$。记 $L(m)$ 为上面的格点最小平方和，$E_q(a)$ 为两个余弦矩均至少为 $a$ 时的循环群最小平方和。设 $m$ 处在第 $n$ 个支撑区间内，格点支撑半径为 $R$。在下端点 $R=n-1$，其余位置 $R=n$。若 $q>2R$，最小值 $E_q(a)$ 取得，且
$$
0\le L(m)-E_q(a)\le \frac{2t}{Z}\frac{\lambda}{q^2}\le\frac{2\lambda}{q^2}.
$$
对任意总质量为一的非负循环群权重 $v$，取 $\bar i$ 为余类 $i$ 的中心整数代表元。记两个余弦矩为 $M_1(v),M_2(v)$，并设 $S_1=2t(M_1(v)-a)/Z$，$S_2=(q/(2\pi))^2(M_2(v)-a)/Z$。用同一个格点最优权重 $w$，还有
$$
\sum_i(v_i-w_{\bar i})^2+S_1+S_2
\le \sum_i v_i^2-L(m)+\frac{2t}{Z}\frac{\lambda}{q^2}.
$$

格点支撑在 $q>2R$ 时嵌入循环群。由 $1-\cos x\le x^2/2$，嵌入后两个矩的亏量分别至多为 $\lambda/(4q^2)$ 与 $\lambda/q^2$，从而可行。逆向估计要控制对径附近的权重，因为第二余弦在那里也接近 $1$。令 $\theta=2\pi\bar i/q$。在整个中心角范围内有 $\theta^2\cos\theta\le\sin^2\theta$。余弦非正时直接由符号得到。余弦为正时，对半角用 $\sin x\ge x\cos x$，再用 $\cos^4(\theta/2)\ge\cos\theta$。因此证书
$$
P_i=\frac{t\cos\theta-(q\sin\theta/(2\pi))^2}{Z}
$$
逐点不超过 $w_{\bar i}$。将 $2\sum_i v_iP_i$ 写成两个余弦矩并分离 $S_1,S_2$，再把 $(t-m)/Z=L(m)$ 代入平方距离的展开式即得估计。对可行权重，$S_1,S_2$ 均非负。归一化常数 $Z$ 中零点一项为 $t$，所以 $t/Z\le1$。

每个固定预算都落在一个有限的支撑区间中。因此 $E_q(1-\lambda/q^2)$ 沿所有整数模数趋于 $L(\lambda/(8\pi^2))$。对实际 ζ 零点高阶频率的算术估计仍有待解决。

[中心化余弦矩恒等式的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicToLatticeComparison.cosineMoment_eq_centered) · [定量比较的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicToLatticeComparison.cyclic_to_lattice_comparison)

### 对径附近的质量

循环群最优权重在每个固定的中心格点上趋于格点权重。两个取等的矩还决定了远离这些格点的一小部分质量。固定 $\lambda\ge0$，令 $v_q$ 为阈值 $1-\lambda/q^2$ 下任意一个循环群最优权重。记 $c_i=\cos(2\pi i/q)$、$A_q=\{i:c_i<0\}$。沿所有整数模数，
$$
q^2\sum_{i\in A_q}v_q(i)\longrightarrow \frac{3\lambda}{8},
\qquad
q^2\sum_{i\in A_q}(1+c_i)v_q(i)\longrightarrow 0.
$$
第二个极限表明，对任何固定的 $\varepsilon>0$，$A_q$ 中满足 $c_i\ge-1+\varepsilon$ 的部分，其质量乘以 $q^2$ 后趋于零。

在格点权重的固定支撑上，第一、第二余弦亏量乘以 $q^2$ 后，加权和分别趋于 $\lambda/4$ 与 $\lambda$。两个约束均取等，所以全圆周上两个缩放后的亏量之和各为 $\lambda$。当 $\lambda=0$ 时，余弦逐点至多为一，可行性已使两个矩取等。第二亏量非负，因而其固定支撑外的部分趋于零。在 $c_i\ge0$ 处，第二亏量的一半控制 $1-c_i$。在 $c_i<0$ 处，同样的量控制 $1+c_i$。所以 $A_q$ 上的第一亏量趋于 $3\lambda/4$，它与二倍缩放质量之差趋于零。这里先取出有限和并控制余项，再取极限。相关特征标和证明也用这个方法比较有限狄利克雷多项式与对数导数。 [特征标和的余项界](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/GL3MeanSquares/GenusMeanAsymptotics/JacobiCharacterSums/TailFinal.lean#L32-L55)

[缩放对径质量极限的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicNegativeCosineMass.cyclic_negative_cosine_mass_limit)

### 偶数与奇数循环群的能量差

固定 $\lambda>0$，令 $m=\lambda/(8\pi^2)$，格点最优权重为 $w_j=(t-j^2)_+/Z$，四阶矩为 $m_4=\sum_j j^4w_j$。沿两种奇偶性分别有
$$
\lim_{q\to\infty} q^2\bigl(L(m)-E_q(1-\lambda/q^2)\bigr)
=\frac2Z\left[(t-d^2)\frac{3\lambda}{8}+\frac{4\pi^2}{3}m_4\right],
$$
其中偶数模数取 $d=0$，奇数模数取 $d=1/2$。奇数循环群上，采样点与对径最近相距半步，因此奇数模数的系数比偶数模数小 $3\lambda/(16Z)$。四阶矩对两种奇偶性的贡献相同。

记 $h=2\pi/q$，$C=-\cos(dh)$。二次证书
$$
p_q(c)=\frac{t-h^{-2}(1-c^2)-\beta_q(1-c)}{Z},
\qquad \beta_q=\frac{t-h^{-2}(1-C^2)}{1-C}
$$
以 $C$ 为根，另一个根 $\rho_q$ 满足 $(1-\rho_q)/h^2\to t/2$。因式分解将证书正部限制在原点附近的固定窗口内，因此可在该窗口逐项求和余弦的四阶展开。激活端点上，边界格点的原权重为零。扰动后的正部平方为 $O(h^4)$，对 $h^2$ 阶系数没有贡献。[余弦级数](https://dlmf.nist.gov/4.19.E2)

配方给出任意可行权重的能量下界。为在 $h^2$ 阶达到该界，调整零点及其两个邻点的权重，在最靠近对径的余弦层补入质量，并令两个矩约束同时取等。原点附近的改变量为 $O(h^2)$，补入的质量渐近于 $3mh^2/4$。任一固定正预算下，三个调整点的极限权重均为正，因此在充分大的模数上该构造可行，也涵盖激活端点。此结论适用于固定预算下的有限循环模型。实际 ζ 零点纵坐标的加权高阶算术估计仍开放。[推导与条件](https://github.com/the-omega-institute/trureturing/issues/33993#issuecomment-7146572104)

[奇偶能量修正的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicParityLimit.cyclic_parity_correction)

### 哪些格点具有正权重

固定 $\lambda>0$，对所有充分大的模数，循环群最优权重恰好在原点附近满足 $j^2\le t$ 的格点和最靠近对径的格点上为正。偶数循环群有一个最近对径点，奇数循环群有两个。格点激活端点 $t=N^2$ 上，$\pm N$ 的极限格点权重为零，但两个有限循环群权重为正，量级为 $q^{-2}$。

在这些候选点上，把权重表示成 $1$、$1-c$ 和 $(1-c^2)/h^2$ 的线性组合，其中 $c=\cos(jh)$，$h=2\pi/q$。质量和两个亏量给出三个方程。原点、相邻格点和对径附近一个格点的特征向量在极限中线性无关。平方端点处，原点窗口二阶矩的变化对 $\pm N$ 权重的一阶改变量有正贡献，与 $1$ 和 $j^2$ 正交的首一二次多项式也给出非负贡献。二次证书在两侧第一个被排除的余弦层上都为负。凸性将这一符号传给二者之间的余弦层，再用配方验证全循环群上的唯一最优解。设最优权重为 $v$。任意可行权重 $w$ 都满足 $E(w)-E(v)\ge\sum_i(w_i-v_i)^2$。

所需模数下界随固定预算而变。这里的支撑结论适用于两个指定的余弦约束。[支撑与稳定性的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicEventualSupport.cyclic_eventual_exact_support) · [精确证书与端点计算](https://github.com/the-omega-institute/trureturing/issues/34004#issuecomment-7147550923)

### 有限循环上的前部支撑切换

固定整数 $N\ge2$，记 $h=2\pi/q$，将两个余弦矩的共同下界设为 $1-2mh^2$。格点模型在 $m_N=(N^2-1)/5$ 处切换。对于充分大的 $q$，在 $m_N$ 附近有唯一的有限循环切换预算 $m_{N,q}$。最近对径点和前部 $|j|\le N-1$ 的各点在这一邻域内始终有正权重。两点 $\pm N$ 恰在 $m>m_{N,q}$ 时获得正权重。沿两条奇偶子列分别有
$$
\frac{m_{N,q}-m_N}{h^2}
\longrightarrow
\frac{(N^2-1)(47-31N^2)}{420}+\frac{3(N^2-1)d^2}{20},
\qquad d=\begin{cases}0& q\text{ 为偶数},\\[2pt]1/2& q\text{ 为奇数}.\end{cases}
$$
两个系数都为负，所以边界点对在到达格点预算前就进入支撑。奇数模数的系数比偶数模数大 $3(N^2-1)/80$。

固定候选前部窗口后，矩方程右端随 $m$ 仿射变化。在较大窗口拟合三个余弦特征，以 $N$ 点权重的零点定义切换预算。令 $x_j=j^2$，以 $\bar x$ 表示 $|j|\le N$ 内的均值，并记 $V=\sum_j(x_j-\bar x)^2$。该权重的斜率趋于 $(N^2-\bar x)/V>0$。删除两个零权重行后，切换处的矩方程仍成立。较小窗口的拟合在边界点对处的求值也有正斜率。其余前部权重保有正极限。对径权重在 $h^2$ 阶为正。将边界点对纳入考察窗口后，两端首个排除余弦层的证书值都有严格负极限，再由凸性排除循环中间的各点。 [参数二次规划，第 4 节](https://doi.org/10.1016/S0005-1098(01)00174-1)

令 $T=N^2$、$W_j=(T-x_j)/Z$、$Z=\sum_j(T-x_j)$，并记 $m_4=\sum_j x_j^2W_j$。用 $r_j$ 表示预算为 $m_N$ 时前部权重的 $h^2$ 阶系数，用 $\mu=3m_N/4$ 表示总对径权重的 $h^2$ 阶系数。二次式 $r_j+\mu W_j$ 的总和为零，关于 $x_j$ 的一阶矩为 $K=m_4/3+(m_N-d^2)\mu$，二次项系数为 $1/(3Z)$。消去常数项与一次项得到
$$
\frac{r_N V}{T-\bar x}=K+\frac{m_4-m_N^2}{3}.
$$
阈值偏移系数是这个比值的相反数。对称有限和给出 $m_4=(N^2-1)(3N^2-5)/35$，代入即得上式的显式系数。渐近式固定 $N$，较小模数下其他对径层也能带有正权重。[切换与缩放偏移的 Lean 证明](lean:D5/S3/Fourier/Asymptotics/CyclicActivationShift.cyclic_activation_shift) · [推导与有限核对](https://github.com/the-omega-institute/trureturing/issues/34016#issuecomment-7148575133)

格点半径增长引出矩误差的一致控制与对径精确支撑的问题。[增长尺度下的循环支撑分析](ch34-s28-s03-s02-growing-cyclic-support.md)讨论这一情形。

### 对径阈值之外的精确支撑

固定周期最终的奇偶性 $e\in\{0,1\}$，假设 $N^5h^2\to K>0$，记 $Q=3K/20$。指标为 $l\ge0$ 的对径窗口 $S_l$ 包含相对于对径角从 $-l-e/2$ 到 $l+e/2$ 的单位步长偏移。定义

$$
T_0(l)=\frac{l(2l-1)(2l+1)}4,\qquad
T_1(l)=l(l+1/2)(l+1).
$$

若 $Q$ 不等于任何 $T_e(l)$，则恰有一个 $l$ 满足 $T_e(l)<Q<T_e(l+1)$。充分大的 $N$ 上，循环群上的唯一最优解 $v$ 由前部格点 $|j|\le N$ 与对径窗口 $S_l$ 上的联立拟合给出，其余格点权重均为零。这两个窗口内的权重严格为正，且两个余弦矩均达到 $1-2mh^2$。对任意可行的概率权重 $w$，

$$
\sum_j w_j^2\ge\sum_j v_j^2+\sum_j(w_j-v_j)^2.
$$

记 $R=l+e/2$，对径极限截距为 $B=(Q+(3/4)\sum_{r\in S_l}r^2)/|S_l|$。有限求和给出

$$
\begin{aligned}
\tfrac34\left(|S_l|R^2-\sum_{r\in S_l}r^2\right)&=T_e(l),\\
\tfrac34\left(|S_l|(R+1)^2-\sum_{r\in S_l}r^2\right)&=T_e(l+1).
\end{aligned}
$$

因而严格阈值条件等价于 $3R^2/4<B<3(R+1)^2/4$。边界极限保证两个窗口最后纳入的格点上拟合权重为正，紧邻的第一个未纳入格点带符号值为负。拟合多项式关于采样余弦为凸函数，四个边界符号由此控制整个循环格点。精确格点对应将拟合矩方程转移至循环群，有限最优性证书给出上述平方距离不等式。

若 $q/N^{5/2}\to\gamma>0$，则 $Q=3\pi^2/(5\gamma^2)$。偶周期第一对新增对径格点在 $\gamma<2\pi/\sqrt5$ 时激活，奇周期相应条件为 $\gamma<\pi/\sqrt5$。同一公式分类全部后续跃迁中严格偏离阈值的情形。在等号处，对应对径层的极限带符号值为零，激活状态仍需判定。 [Lean 内核核验的证明](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingSupport.eventual_strict_support_away_from_thresholds) · [研究与证明](https://github.com/the-omega-institute/trureturing/issues/34029)

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
