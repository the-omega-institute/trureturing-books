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

两组各有二十条有向边。在 $A$ 中，正间距 $1$ 和 $5$ 各出现两次，其余六个各出现一次。在 $B$ 中，十个正间距互异。负间距的计数与正间距相同，所以有向间距的碰撞质量分别是 $28$ 和 $20$。端点修正在两组都减去 $40$、加回 $20$，得到 $R_2(A)=8$ 和 $R_2(B)=0$。$A$ 中的八项来自 $0+6=1+5$ 的两侧互换以及两侧各自的排序。

因此，端点、均值、方差和整个区间 $0\le\eta<1$ 上的次数一质量仍允许不同的次数二质量。这个有限谱反例刻画了这些读数的适用边界。ζ 零点所需的加权频带上界是下文的开放问题。

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
