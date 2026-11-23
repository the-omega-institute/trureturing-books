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
