# M.2.5 方差给出的近碰撞下界 {#方差给出的近碰撞下界}

取有限频率族 $(g_j)$ 和非负权重 $(w_j)$，总重 $W=\sum_jw_j>0$。记归一化权重下的均值和方差为

$$
\mu=W^{-1}\sum_j w_jg_j,
\qquad
V=W^{-1}\sum_jw_j(g_j-\mu)^2.
$$

对每个总次数为 $p$ 的非负整数向量 $m$，记 $G_m=\sum_jm_jg_j$，$c_m=\binom{p}{m}\prod_jw_j^{m_j}$。距离不超过 $\eta$ 的有序对贡献 $c_mc_n$，其总和记为 $E_p(\eta)$。

::: {.theorem #thm-ch31-variance-collision-lower title="由方差控制的加权近碰撞下界" lean="D5/S3/Fourier/Concentration/FiniteCollisionVariance.tailCollisionMass_lower_variance"}
对任意正整数 $p$ 和实数 $\eta>0$，有

$$
\frac{9}{16}W^{2p}\le
\left(1+\frac{4\sqrt{pV}}{\eta}\right) E_p(\eta).
$$
:::

::: proof
将频率减去 $\mu$ 后，每个 $G_m$ 同减 $p\mu$，所以两两距离保持原值。实指数和 $A(t)=\sum_jw_j e^{(g_j-\mu)t}$ 的 $p$ 次幂展开使用同一组系数 $c_m$。在 $t=0$ 处有 $A(0)=W$、$A'(0)=0$ 和 $A''(0)=WV$。对展开式取值并求二阶导数，得到 $\sum_m c_m=W^p$，以及 $\sum_m c_m(G_m-p\mu)^2=pVW^p$。

由这一二阶矩可知，至少四分之三的系数重量落在以 $p\mu$ 为中心、半径为 $2\sqrt{pV}$ 的闭区间。若 $V=0$，全部正重量都落在中心。按宽度 $\eta$ 对区间分箱，至多用 $\lfloor 4\sqrt{pV}/\eta\rfloor+1$ 个箱。柯西–施瓦茨不等式给出箱重量平方和的下界。每箱内的有序对都计入 $E_p(\eta)$，因此得到所述不等式。完整证明由 Lean 内核检查。
:::

若有界起点的矩判据要求 $KNE_p(2/L)<\delta^{2p}$，其中 $K=3+\pi^2/3$、$N$ 为采样点数、$\delta>0$，则必有

$$
\frac{9}{16}KN(W/\delta)^{2p}<1+2L\sqrt{pV}.
$$

见[加权近碰撞与缺失窗口的起点范围](ch34-s28-s03-s02-weighted-near-collisions.md#thm-ch31-bounded-tail-window-start)。

例如，固定 $0<\beta<1$，取 ζ 尾段频率 $g_\gamma=\gamma/r$，其中 $r>0$ 固定，$\gamma\le T$。在 $W\asymp(\log T)^2$、$\delta=\log T$ 和 $p\asymp T^\beta\log T$ 的尺度下，利用 $\sqrt V\le T/r$，成功通过该判据要求

$$
\log L\ge \log N+2p\log\log T-O(p+\log T).
$$

该式约束矩判据所需的平均长度。实际 ζ 纵坐标在正分辨率下的高阶加权近碰撞上界，以及更短范围内能否找到缺失窗口，仍待解决。

## 共同移位分箱与抛物线测试函数

截取单个中心区间会舍弃区间外的重量。可以通过共同移位控制所有分箱的二阶矩，然后用截断的二次函数加权整个分箱族。

对任意有限实数族 $z_i,c_i$，存在 $0\le u<1$，使

$$
\sum_i c_i\lfloor z_i+u\rfloor^2
\le \sum_i c_i\bigl(z_i^2+\{z_i\}(1-\{z_i\})\bigr).
$$

这里 $\{z\}$ 是小数部分，$c_i$ 允许取负值。证明是计算左端关于 $u$ 在单位区间上的积分。 [共同移位的 Lean 证明](lean:D5/S3/Fourier/Concentration/ShiftedBinVariance.exists_shifted_squared_moment)取 $z=(G_m-p\mu)/\eta$，权重 $c_m\ge0$ 时，分箱二阶矩至多为 $MW^p$，其中 $M=pV/\eta^2+1/4$。每个箱中的有序对都属于闭距离带 $|G_m-G_n|\le\eta$。

一般地，设有限族 $(x_i,c_i)$ 的权重非负，总重 $A=\sum_i c_i$，关于任意中心 $a$ 的二阶矩满足 $\sum_i c_i(x_i-a)^2\le BA$。记 $M=B/\eta^2+1/4$，$E(\eta)=\sum_{|x_i-x_j|\le\eta}c_ic_j$，其中 $\eta>0$。对任意正整数 $r$ 满足 $M\le r^2$，有

$$
A^2(1-M/r^2)^2\le
\left(\frac{16r}{15}-\frac{1}{15r^3}\right)E(\eta).
$$

令 $q(k)=\max(0,1-k^2/r^2)$。若 $b_k$ 是所选分箱的总重，则 $\sum_k b_kq(k)\ge A(1-M/r^2)$。整数平方和与四次方和的精确公式给出 $\sum_k q(k)^2=16r/15-1/(15r^3)$。应用柯西–施瓦茨，再用 $\sum_k b_k^2\le E(\eta)$，即得下界。 [抛物线下界的 Lean 证明](lean:D5/S3/Fourier/Concentration/ShiftedBinVariance.collision_parabolic_lower)

对次数为 $p$ 的频率和取 $A=W^p$、$B=pV$，从而收紧上述矩判据的必要条件。对于 $B>0$，当 $\eta/\sqrt B\to0$ 时，选择 $r=\lceil\sqrt{5M}\rceil$，下界右侧对应的归一化系数趋于 $3/(5\sqrt5)$，即 $\liminf E(\eta)\sqrt B/(A^2\eta)\ge3/(5\sqrt5)$（$A>0$）。该渐近推论的最优性以及实际 ζ 纵坐标的上界仍需进一步证明。
