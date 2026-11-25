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

## 分离格点的抛物线权重与渐近最优性

取正整数 $n$，格点 $k=-n,\ldots,n$，权重 $c_k=n^2-k^2$。对称性给出均值为零。总重与方差为

$$
A=\frac{n(4n^2-1)}{3},\qquad B=\frac{n^2-1}{5}.
$$

精确碰撞公式的适用范围也可以完全确定。

$$
E(\eta)=\frac{A(4n^2+1)}5
\quad\Longleftrightarrow\quad
\eta\ge0\ \land\ (n=1\ \lor\ \eta<1).
$$

当 $0\le\eta<1$ 时，不同格点的距离都大于 $\eta$，所以只有对角项贡献。用 $c_k^2=n^2c_k-k^2c_k$ 即得公式。$n=1$ 时只有中心有正权重。$n\ge2$ 且 $\eta\ge1$ 时，有序对 $(0,1)$ 已产生严格正的额外碰撞。负半径排除所有有序对。 [精确碰撞公式的 Lean 证明](lean:D5/S3/Fourier/Concentration/SeparatedParabolicCollision.separated_parabolic_collision)

对于任意最终满足 $0<\eta_n<1$、且 $\eta_n\to L>0$ 的半径序列，令 $t=1/n$，则

$$
\frac{\eta_n}{\sqrt B}=\frac{\sqrt5\,t\eta_n}{\sqrt{1-t^2}}
\longrightarrow0,
$$

$$
\frac{E(\eta_n)\sqrt B}{A^2\eta_n}
=\frac{3}{5\sqrt5}\frac{4+t^2}{4-t^2}
\frac{\sqrt{1-t^2}}{\eta_n}
\longrightarrow\frac{3}{5\sqrt5\,L}.
$$

选择 $\eta_n=n/(n+1)$，每个半径严格小于格点间距，且 $L=1$。于是上一节的常数 $3/(5\sqrt5)$ 对任意有限非负加权数据是渐近最优的。连续 Rényi 熵的二阶矩极值也出现这一抛物线形状，参见 [Sekeh 的式 (2.1) 与定理 3.1](https://arxiv.org/abs/1509.02190v4)。这里的有限格点分离保证闭距离带中仅有对角碰撞。要求数据来自固定底层频率族的高次数和，或实际 ζ 纵坐标，还需获得相应的算术约束。 [极限的 Lean 证明](lean:D5/S3/Fourier/Concentration/SeparatedParabolicCollision.parabolic_collision_ratio_limit)

## 格点卷积的有限傅里叶方差下界

对于原始频率 $g_j$ 及非负权重 $w_j$，令 $S(t)=\sum_j w_je^{ig_jt}$，$W=\sum_jw_j$，$D=\sum_jw_j(g_j-a)^2\le VW$，其中 $a$ 为任意实数中心。中心化只旋转复数和。由 $\cos x\ge1-x^2/2$ 得

$$
|S(t)|\ge W\max(0,1-Vt^2/2),\qquad
|S(t)|\ge\max(0,W-Dt^2/2).
$$

若 $D>0$ 且 $t\ne0$，则 $|S(t)|>W-Dt^2/2$，因为至少一个正权重项的中心化相位非零。 [特征函数下界的 Lean 证明](lean:D5/S3/Fourier/Concentration/LatticeConvolutionVariance.score_variance_lower)

若频率位于同一仿射格点 $g_j=b+h a_j$，其中 $h>0$、$a_j$ 为整数，则对任意实权重、自然数 $p$、正整数 $k$、实数 $s$ 以及 $0\le\eta<h$，令 $A=k\pi/h$，有精确恒等式

$$
E_p(\eta)=\frac{1}{2A}\int_{s-A}^{s+A}|S(t)|^{2p}\,dt.
$$

将 $|S|^{2p}$ 作有限多项式配对展开，任意两个次数为 $p$ 的频率和之差都是 $hd$，$d$ 为整数。对应余弦项的平均值为 $\cos(hds)\operatorname{sinc}(k\pi d)$。因此保留全部相等频率和的有序对。 [周期平均恒等式的 Lean 证明](lean:D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lattice_period_collision)

当权重非负且 $\eta\ge0$ 时，结合单周期内的点态下界得到

$$
E_p(\eta)\ge \frac{hW^{2p}}{2\pi}
\int_{-\pi/h}^{\pi/h}\max(0,1-Vt^2/2)^{2p}\,dt.
$$

若 $D>0$ 且 $p>0$，该不等式严格成立。这里使用了次数和的同一傅里叶幂展开。固定 $V,h>0$ 而次数增长时，积分中的缩放变量为 $t\sqrt{pV}$，其高斯极限给出的渐近系数仍待形式化。一般实频谱的有限分辨率碰撞需要另行建立正核估计。 [有限积分下界的 Lean 证明](lean:D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lattice_collision_variance_lower)

## 截断方差积分的高斯极限

允许方差预算 $V_p$ 和半窗口 $A_p$ 随次数 $p$ 变化。设 $V_p>0$ 最终成立，取

$$
s_p=\sqrt{pV_p},\quad R_p=A_ps_p,\quad
I_p=s_p\int_{-A_p}^{A_p}\max(0,1-V_pt^2/2)^{2p}\,dt.
$$

对任意实数列 $A_p$，包括负的有向半窗口，成立

$$
I_p-\int_{-R_p}^{R_p}e^{-u^2}\,du\longrightarrow0,
\qquad
I_p\longrightarrow\sqrt\pi\ \Longleftrightarrow\ R_p\longrightarrow+\infty.
$$

换元 $u=s_pt$ 后，被积函数为 $q_p(u)=\max(0,1-u^2/(2p))^{2p}$。当 $p>0$ 时，$0\le q_p(u)\le e^{-u^2}$，且固定 $u$ 下 $q_p(u)\to e^{-u^2}$。因此支配收敛给出 $\int_{\mathbb R}|q_p(u)-e^{-u^2}|\,du\to0$，统一控制所有窗口的绝对误差。高斯窗口积分随有向半径单调增加，并在任意有限半径处严格小于 $\sqrt\pi$，所以全高斯极限也要求缩放后的半径趋于正无穷。 [窗口逼近](lean:D5/S3/Fourier/Asymptotics/ClippedGaussianMinorant.clipped_gaussian_window_error) [全高斯极限的充要条件](lean:D5/S3/Fourier/Asymptotics/ClippedGaussianMinorant.clipped_gaussian_full_limit_iff)

现在回到固定方差预算 $V>0$ 及格距 $h>0$ 的卷积。取 $A_p=\pi/h$，则 $R_p\to+\infty$，且上节有限下界乘以 $\sqrt{pV}$ 后的积分系数趋于 $h/(2\sqrt\pi)$。由此，对每个 $\varepsilon>0$，所有充分大的 $p$ 与固定 $\eta\ge0$ 满足

$$
\left(\frac{h}{2\sqrt\pi}-\varepsilon\right)W^{2p}
\le \sqrt{pV}\,E_p(\eta).
$$

这个渐近下界继承了有限傅里叶积分的全部假设。实际碰撞质量还可能受到其他相位峰的贡献，例如所给格距并非最大格距时。一般实频谱和实际 ζ 纵坐标的上界仍需控制这些贡献及非中心余项。这里采用了 [有限主贡献与余项控制的相关方法](https://github.com/the-omega-institute/riemann-hypothesis/blob/c7d25b3bfd7906388bb8eb0774e027a2b756a7b6/src/Formalism/GL3MeanSquares/GenusMeanAsymptotics/JacobiCharacterSums/TailFinal.lean#L32-L55)，具体的余项是上述全线绝对误差。

## 一般实频率的正 Fejér 核下界

给定固定的正分辨率 $\eta>0$，使用角频率 Fejér 核及其三角形傅里叶变换

$$
K_\eta(t)=\frac{\eta}{2\pi}\operatorname{sinc}^2\!\left(\frac{\eta t}{2}\right),
\qquad \phi_\eta(d)=\max(0,1-|d|/\eta).
$$

核 $K_\eta$ 非负、可积且全线积分为 $1$，并有 $\int_{\mathbb R}K_\eta(t)e^{-idt}\,dt=\phi_\eta(d)$。将 $|S(t)|^{2p}$ 作有限次数和配对展开，对每个余弦积分，得到精确恒等式

$$
\int_{\mathbb R} K_\eta(t)|S(t)|^{2p}\,dt
=\sum_{m,n}c_mc_n\phi_\eta(G_m-G_n).
$$

恒等式允许任意实权。若 $w_j\ge0$，全部 $c_m c_n\ge0$，且 $\phi_\eta(d)\le \mathbf 1_{|d|\le\eta}$，故右侧不超过 $E_p(\eta)$。在闭带边界 $|d|=\eta$ 处三角权恰为零。 [正核碰撞比较](lean:D5/S3/Fourier/Concentration/FejerCollisionVariance.fejer_collision_comparison)

再假设 $\sum_jw_j(g_j-a)^2\le VW$，其中 $a,V$ 为实数。由点态方差下界和核的非负性，对任何 $A\ge0$ 有

$$
W^{2p}\int_{-A}^{A}K_\eta(t)\max(0,1-Vt^2/2)^{2p}\,dt
\le E_p(\eta).
$$

这一估计适用于任意有限实频率族。 [有限窗口下界](lean:D5/S3/Fourier/Concentration/FejerCollisionVariance.fejer_collision_variance_lower)

固定 $V,\eta>0$ 并令 $p\to\infty$。对 $\varepsilon>0$，取 $c=\eta/(2\pi)-\varepsilon/(2\sqrt\pi)$。由 $K_\eta(0)=\eta/(2\pi)$ 与连续性，可选择一个固定的 $A>0$，使 $|t|\le A$ 时 $K_\eta(t)\ge c$。上一节的高斯极限给出

$$
c\sqrt{pV}\int_{-A}^{A}\max(0,1-Vt^2/2)^{2p}\,dt
\longrightarrow \frac{\eta}{2\sqrt\pi}-\frac{\varepsilon}{2}.
$$

因此对每个 $\varepsilon>0$，充分大的次数 $p$ 满足

$$
\left(\frac{\eta}{2\sqrt{\pi}}-\varepsilon\right) W^{2p}
\le\sqrt{pV}\,E_p(\eta).
$$

若 $W>0$，等价地有 $\liminf_{p\to\infty} E_p(\eta)\sqrt{pV}/(W^{2p}\eta)\ge1/(2\sqrt\pi)$。这个系数超过任意有限加权数据的抛物线下界系数 $3/(5\sqrt5)$，因为次数和具有卷积结构。结论允许固定的实际 ζ 尾段作为输入频率族。下一节的尺度条件给出高度、频率族和分辨率共同变化时的统一下界。高阶碰撞的上界仍需进一步估计。 [渐近下界](lean:D5/S3/Fourier/Concentration/FejerCollisionVariance.fejer_collision_asymptotic_lower)

## 变化频谱的统一小分辨率下界

现在允许频率族、权重和中心随着次数 $n$ 一起变化。仅要求方差预算 $V_n$ 与分辨率 $\eta_n$ 最终为正。记

$$
s_n=\sqrt{nV_n},\qquad \rho_n=\frac{\eta_n}{s_n}.
$$

$\rho_n\to0$ 当且仅当存在最终为正的半窗口 $A_n$，使 $A_ns_n\to+\infty$ 且 $\eta_nA_n\to0$。确实，取 $A_n=1/(s_n\sqrt{\rho_n})$，两项分别为 $1/\sqrt{\rho_n}$ 与 $\sqrt{\rho_n}$。反过来，$\rho_n=(\eta_n A_n)/(s_nA_n)$。 [两种窗口尺度相容的充要条件](lean:D5/S3/Fourier/Asymptotics/MovingFejerCollision.exists_fejer_window_iff)

在 $\rho_n\to0$ 下，对每个 $\varepsilon>0$，存在仅依赖于 $V_n,\eta_n$ 两个序列及 $\varepsilon$ 的次数阈值。超过此阈值的每个 $n$，任意有限频率族 $g_j$、非负权重 $w_j$ 以及任意满足 $\sum_jw_j(g_j-a)^2\le V_n W$ 的中心 $a$，均满足

$$
\left(\frac{1}{2\sqrt\pi}-\varepsilon\right)\eta_n W^{2n}
\le \sqrt{nV_n}\,E_n(\eta_n).
$$

证明是在相容窗口上使用 $\eta_n^{-1}K_{\eta_n}(t)=\operatorname{sinc}^2(\eta_nt/2)/(2\pi)$。由 $\eta_n A_n\to0$，此归一化核最终处处至少为 $1/(2\pi)-\varepsilon/(2\sqrt\pi)$。由 $A_ns_n\to\infty$，不带核的缩放积分趋于 $\sqrt\pi$。结合有限窗口下界即可取得统一次数阈值。 [统一碰撞下界](lean:D5/S3/Fourier/Asymptotics/MovingFejerCollision.moving_fejer_uniform_lower)

例如，对随 $n$ 变化的有限 ζ 尾段，取频率 $g_\gamma=\gamma/r$，其中 $r>0$ 固定，$0<\gamma\le T_n$。可用中心 $a=0$ 和预算 $V_n=T_n^2/r^2$。如果 $\eta_n r/(T_n\sqrt n)\to0$，则

$$
E_n(\eta_n)\ge
\left(\frac{1}{2\sqrt\pi}-\varepsilon\right)
\frac{r\eta_n}{T_n\sqrt n}\,W_n^{2n}
$$

最终成立。这里允许底层频率族的大小增长。若不控制分辨率与方差的相对尺度，例如单个单位权重频率、$V_n=1/n^2$、固定 $\eta_n>0$，归一化碰撞比可能趋于零。实际 ζ 零点的高阶加权碰撞上界仍未解决。

## 从三角加权矩精确恢复闭碰撞带

一般有限数据 $(x_i,c_i)$ 的带半径为 $r$ 时，记 $d_{ij}=|x_i-x_j|$，并定义

$$
L(r)=\sum_{i,j}c_ic_j\max(0,r-d_{ij}).
$$

若每对权重满足 $c_ic_j\ge0$ 且 $\delta>0$，对任意实数 $r$ 有

$$
L(r)-L(r-\delta)\le \delta E(r)
\le L(r+\delta)-L(r).
$$

这是逐对比较。对于 $d_{ij}\le r$，正部函数的右增量恰为 $\delta$，左增量至多为 $\delta$。对于 $d_{ij}>r$，左增量为零，右增量非负。然后以非负的配对权重求和。 [有限差分夹界](lean:D5/S3/Fourier/Concentration/FejerCollisionSecants.collision_ramp_secants)

任意实权重下，只要 $\delta>0$ 且不存在严格介于 $r$ 与 $r+\delta$ 之间的配对距离，右侧增量就是精确的。这样的正区间总是存在。取 $\delta_0$ 为集合 $\{1\}\cup\{d_{ij}-r:d_{ij}>r\}$ 的最小值；有限性保证 $\delta_0>0$。对任意 $0<\delta\le\delta_0$，

$$
L(r+\delta)-L(r)=\delta E(r).
$$

外带不存在严格位于 $r$ 与 $r+\delta$ 之间的距离，逐对增量或为 $\delta$ 或为零。该恒等式允许任意实权重，并保留距离恰等于 $r$ 的全部闭带贡献。 [精确右增量的 Lean 证明](lean:D5/S3/Fourier/Concentration/FejerCollisionSecants.collision_ramp_exact_right)

当数据为次数 $p$ 的频率和及多项式权重时，对正半径 $r$，由三角形核恒等式可写

$$
L(r)=r\int_{\mathbb R}K_r(t)|S(t)|^{2p}\,dt.
$$

若 $0<\delta<r$，有限差分夹界可以直接用三个不同正半径的带核积分表示。精确右增量则说明，即使在边界上有碰撞质量，也可以由足够小的正向差分恢复闭带计数。要获得实际 ζ 尾段的高阶碰撞上下界，仍须控制这些带核积分在相邻半径上的渐近主项和余项。

## 可微极限与硬碰撞带的渐近系数

允许有限数据依赖于 $n$，记其碰撞斜坡为 $L_n$、闭碰撞带质量为 $E_n$。令 $B_n$ 为归一化因子，$\eta_n$ 为任意实尺度。假设最终 $B_n\ge0$，且每个数据族内的配对权重乘积皆非负。在某个实数 $a$ 的开邻域中，若对每个固定的 $t$ 有

$$
F_n(t)=B_n L_n(t\eta_n)\longrightarrow f(t),
$$

且 $f$ 在 $a$ 处可微，则

$$
B_n\eta_n E_n(a\eta_n)\longrightarrow f'(a).
$$

证明使用固定 $\delta>0$ 时的两个割线差商。正尺度时，应用上一节的有限差分夹界。负尺度时，左右割线交换且变号。零尺度时，两个增量与缩放后的闭带质量均为零。于是，对于足够小的固定 $\delta$，最终有

$$
\frac{F_n(a)-F_n(a-\delta)}{\delta}
\le B_n\eta_n E_n(a\eta_n)
\le\frac{F_n(a+\delta)-F_n(a)}{\delta}.
$$

先由可微性选取固定的 $\delta$，使极限函数的两个割线差商都接近 $f'(a)$，再利用相邻半径处的逐点收敛。这避免要求有限数据的最小外带间隙具有统一正下界。 [硬碰撞带极限定理](lean:D5/S3/Fourier/Concentration/FejerCollisionLimit.collision_ramp_tendsto_hard)

对于随次数 $n$ 变化的原始有限频率族与非负权重，记总权重 $W_n$、方差预算 $V_n$、分辨率 $\eta_n$，设 $s_n=\sqrt{nV_n}$。假设 $W_n,\eta_n,V_n$ 最终为正。若对每个固定 $t>0$ 的带核积分主项与余项能证明

$$
\frac{s_n}{\eta_n^2 W_n^{2n}}\,t\eta_n
\int_{\mathbb R} K_{t\eta_n}(u)|S_n(u)|^{2n}\,du
\longrightarrow \frac{t^2}{2\sqrt\pi},
$$

则令 $a=1$，由二次极限的导数得到

$$
\frac{s_n E_n(\eta_n)}{\eta_n W_n^{2n}}\longrightarrow\frac1{\sqrt\pi}.
$$

这把所需的硬带渐近归约为邻近乘法半径处的 Fejér 加权矩渐近。实际 ζ 尾段的非中心贡献以及匹配的上界仍是待证的算术问题。

## 四阶配对矩控制中心高斯轮廓

对一组有限实频率 $g_j$ 与实权重 $w_j$，记 $W=\sum_jw_j$，$Q(t)=|S(t)|^2$，并定义

$$
M_k=\sum_{i,j}w_iw_j(g_i-g_j)^k.
$$

若所有配对乘积 $w_iw_j\ge0$，任意实数 $t$ 满足

$$
0\le Q(t)-\left(W^2-\frac{M_2t^2}{2}\right)
\le\frac{M_4t^4}{24}.
$$

将次数一的傅里叶配对和展开，再对每个频率差应用全局余弦估计 $0\le\cos x-1+x^2/2\le x^4/24$，即可保留精确二次项并控制四次余项。 [全局四阶矩界](lean:D5/S3/Fourier/Asymptotics/FinitePairGaussianLimit.score_quartic)

现在允许频率族和权重随次数 $n$ 改变，并令权重最终归一化为 $W_n=1$，配对乘积最终非负。假设 $M_{2,n}>0$ 最终成立，且

$$
R_n=\frac{M_{4,n}}{nM_{2,n}^2}\longrightarrow 0,
\qquad s_n=\sqrt{nM_{2,n}/2}.
$$

对于固定的 $u$，有限四阶矩界给出

$$
0\le n\bigl(Q_n(u/s_n)-1\bigr)+u^2\le\frac{u^4R_n}{6}.
$$

所以利用指数幂极限，有

$$
Q_n(u/s_n)^n\longrightarrow e^{-u^2}.
$$

若 $a_n$ 是归一化权重下的均值，$M_{2,n}=2\sum_jw_{n,j}(g_{n,j}-a_n)^2$，此处的尺度使用实际方差。原始非负权重总量为正时，以总量除权重即可得到归一化的频率和。 [中心高斯极限](lean:D5/S3/Fourier/Asymptotics/FinitePairGaussianLimit.score_gaussian_limit)

还可得到随次数增长的窗口上的可积上界。当 $n>0$、$W=1$、配对乘积非负、$M_2>0$，并且 $u^2M_4\le3nM_2^2$ 时，四阶误差至多为 $u^2/2$，从而

$$
Q(u/s)^n\le e^{-u^2/2},\qquad s=\sqrt{nM_2/2}.
$$

该上界允许使用支配收敛处理满足四阶矩条件的中心窗口。应用于实际 ζ 零点时，需要配对矩比值界，并须控制中心窗口之外的傅里叶峰及其加权贡献。 [中心窗口高斯上界](lean:D5/S3/Fourier/Asymptotics/FinitePairGaussianLimit.score_gaussian_envelope)

### 实际 ζ 零点的矩比值条件

在现有 RH 条件接口下，取全部满足 $0<\gamma\le T$ 的 ζ 零点，并按解析重数 $m_\gamma$ 赋权 $a_\gamma=m_\gamma\gamma/(1/4+\gamma^2)$。令 $W(T)=\sum_\gamma a_\gamma$，$w_\gamma=a_\gamma/W(T)$，$P_k(T)=\sum_{\gamma,\gamma'}w_\gamma w_{\gamma'}(\gamma-\gamma')^k$。记 $c=1/(2\pi)$。Riemann–von Mangoldt 计数渐近式给出 $N(T)-N(3T/4)\ge cT\log T/8$（充分大的 $T$）。对上段 $3T/4<\gamma\le T$，$a_\gamma\ge m_\gamma/(2T)$，故该段权重至少为 $c\log T/16$。结合调和质量渐近式，$W(T)\le c(\log T)^2$，且 $W(T/2)\ge c(\log T)^2/16$。

上下两段的归一化权重分别至少为 $1/16$ 和 $1/(16\log T)$，段间频率差绝对值至少为 $T/4$。因此仅保留从下段到上段的有序配对，即得

$$
P_2(T)\ge\frac{T^2}{4096\log T}>0,\qquad P_4(T)\le T^2P_2(T).
$$

第二个不等式只用所有正纵坐标均不超过 $T$。所以充分大的 $T$ 上，归一化权重非负且总和为一，并且

$$
\frac{P_4(T)}{P_2(T)^2}\le4096\log T.
$$

[调和权重矩比值界](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_pair_ratio) 若 $T_n\to\infty$ 且 $\log T_n/n\to0$，则实际归一化零点谱满足前述高斯轮廓的四阶矩比值假设。固定比例的频率缩放 $g_\gamma=\gamma/r$（$r>0$）不改变此矩比值。中心 Fejér 主项还须满足分辨率与实际方差尺度的兼容条件。中间时间区域的非中心峰估计仍须独立建立。

## 移动中心窗口的 Fejér 积分主项

假设最终权重归一化、配对乘积非负且第二配对矩为正。设 $\rho_n\to0$，选择 $A_n\to+\infty$ 且最终满足

$$
A_n^2M_{4,n}\le6nM_{2,n}^2.
$$

上述窗口条件给出 $0\le R_n\le6/A_n^2$，故 $R_n\to0$ 自动成立。中心 Fejér 积分具有精确极限

$$
\frac1{2\pi}\int_{-A_n}^{A_n}
\operatorname{sinc}^2(\rho_n u/2)Q_n(u/s_n)^n\,du
\longrightarrow\frac1{2\sqrt\pi}.
$$

把积分被积函数在窗口外延拓为零。任意固定 $u$ 最终进入窗口，且 $\operatorname{sinc}(\rho_nu/2)^2\to1$。因此延拓函数逐点收敛至 $e^{-u^2}$。在内半窗口 $|u|\le A_n/2$ 上，全局四阶矩界给出可积高斯包络。外半窗口上，四阶矩界给出 $Q_n(u/s_n)^n\le e^{-u^2(1-u^2/A_n^2)}\le e^{-(A_n/4)(A_n-|u|)}$。结合 $|\operatorname{sinc}(x)|\le1$，两侧外半窗口的积分总和至多为 $8/A_n\to0$。对内半窗口应用支配收敛定理与高斯积分 $\int_{\mathbb R}e^{-u^2}du=\sqrt\pi$ 给出所求系数。 [中心 Fejér 积分极限定理](lean:D5/S3/Fourier/Asymptotics/MovingFejerGaussianPrincipal.central_fejer_gaussian_limit)

当 $R_n$ 最终非负且趋于零时，可以显式选取

$$
A_n=\left(R_n+\frac1{n+1}\right)^{-1/2}.
$$

于是 $A_n\to+\infty$ 且最终 $A_n^2R_n\le1$。对上述配对矩比值，非负性源于配对权重乘积的非负性与偶次幂，分母最终为正，故此窗口符合四阶矩约束。

若 $\eta_n>0$ 且 $s_n>0$，令 $\rho_n=\eta_n/s_n$。变量代换 $u=s_nt$ 将上述中心积分精确地写成

$$
\frac{s_n}{\eta_n}\int_{-A_n/s_n}^{A_n/s_n}
K_{\eta_n}(t)|S_n(t)|^{2n}\,dt.
$$

这给出了全线 Fejér 矩的中心主项。为了得出全线极限以及硬碰撞带的渐近系数，还须证明

$$
\frac{s_n}{\eta_n}\int_{|t|>A_n/s_n}
K_{\eta_n}(t)|S_n(t)|^{2n}\,dt\longrightarrow0,
$$

并且对邻近的乘法分辨率验证相应极限。对于按调和权重加权的实际 ζ 零点谱，上述截断增长条件保证矩比值条件成立。非中心峰的积分估计仍是开放的算术缺口。

### 全线矩的有限观察窗口

对非负权重，令 $F_p(t)=|S(t)|^{2p}$，$M_\eta=\int_{\mathbb R}K_\eta(t)F_p(t)\,dt$。三角频率权重 $\phi_\eta(d)=\max(0,1-|d|/\eta)$ 随分辨率 $\eta$ 单调增加。因为占用向量的配对系数均非负，$0<b\le\eta$ 时有 $M_b\le M_\eta$。当 $\eta T\ge1$，取 $b=1/T$，则 $|t|\le T$ 上有 $K_b(t)\ge1/(8\pi T)$，因此

$$
\int_{-T}^{T}F_p(t)\,dt\le 8\pi T M_\eta.
$$

定义 $I_\eta(r)=\int_{-r}^{r}K_\eta(t)F_p(t)\,dt$。在 $r\le|t|\le2r$ 上，$K_\eta(t)\le2/(\pi\eta r^2)$。结合上式，$\eta r\ge1$ 时有

$$
I_\eta(2r)-I_\eta(r)\le\frac{32}{\eta r}M_\eta.
$$

对 $r=L,2L,4L,\ldots$ 的二进区间求和，并利用全线可积性取极限，得到对所有 $\eta L\ge1$ 的统一相对截尾界

$$
0\le M_\eta-I_\eta(L)\le\frac{64}{\eta L}M_\eta.
$$

[相对截尾界](lean:D5/S3/Fourier/Concentration/FejerRelativeLocalization.relative_fejer_truncation) 这一估计容许支撑、权重、次数及分辨率同时变化，也容许重复频率。

令 $L_n$ 满足 $\eta_nL_n\to+\infty$，并取 $L_n\ge A_n/s_n$。记 $\varepsilon_n=64/(\eta_nL_n)$。最终 $I_{\eta_n}(L_n)\le M_{\eta_n}\le I_{\eta_n}(L_n)/(1-\varepsilon_n)$。因而归一化有限窗口积分 $(s_n/\eta_n)I_{\eta_n}(L_n)$ 与归一化全线矩具有相同的有限极限（任一极限存在即推出另一极限）。在中心主项已经建立的条件下，待控制的相位峰集中到有限的中间时间区域 $A_n/s_n<|t|\le L_n$。实际增长 ζ 零点族在这一区域的高阶矩上界仍然开放。

### 实际 ζ 零点的短非中心时间区域

沿用上述实际调和权重，记 $Z_T(t)=\sum_\gamma w_\gamma e^{i\gamma t}$。在现有 RH 条件接口下，存在固定的 $L>1$，使得对 $T\ge L$、$1/T\le |t|\le1/L$，

$$
1-|Z_T(t)|\ge\frac{\log(1/|t|)}{524288(\log T)^2}.
$$

[倒数高度截断的相位亏损界](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_reciprocal_time_deficit) 取保留频谱的截断高度 $X=1/|t|$，则 $L\le X\le T$。其配对矩满足 $P_2(X)\ge X^2/(4096\log X)$、$P_4(X)\le X^2P_2(X)$。因为 $X^2t^2=1$，四阶余项估计给出 $1-|Z_X(t)|^2\ge1/(16384\log X)$，故 $1-|Z_X(t)|\ge1/(32768\log X)$。在同一时刻 $t$ 将实际有限和按高度 $X$ 分为保留项和尾项，应用三角不等式得

$$
W(T)(1-|Z_T(t)|)\ge W(X)(1-|Z_X(t)|).
$$

结合调和质量界 $W(X)\ge c(\log X)^2/16$、$W(T)\le c(\log T)^2$，即得上述亏损估计。因此对固定的 $0<\delta<1$，充分大的 $T$ 以及 $1/T\le|t|\le T^{-\delta}$，有

$$
|Z_T(t)|^{2n}\le\exp\left(-\frac{\delta n}{262144\log T}\right).
$$

据此手工推导该环形区域的积分界。取 $s_n=\sqrt{nP_2(T_n)/2}$ 及任意正分辨率 $\eta_n$。由 $P_2(T_n)\le T_n^2$、$K_{\eta_n}\le\eta_n/(2\pi)$，可得归一化贡献

$$
\frac{s_n}{\eta_n}\int_{1/T_n\le|t|\le T_n^{-\delta}}
K_{\eta_n}(t)|Z_{T_n}(t)|^{2n}\,dt
\le\frac{\sqrt{n/2}}{\pi}T_n^{1-\delta}
\exp\left(-\frac{\delta n}{262144\log T_n}\right).
$$

若 $T_n\to\infty$ 且 $(\log T_n)^2/n\to0$，此上界趋于零，因为 $\log T_n$ 和 $\log n$ 均为 $o(n/\log T_n)$。在移动中心窗口至 $1/T_n$ 的区域，取 $X=T_n$，同一四阶矩估计保证 $|t|\le1/T_n$ 时 $|Z_{T_n}(t)|^{2n}\le e^{-11(s_nt)^2/12}$。当 $A_n\to\infty$ 时，$|s_nt|>A_n$ 的这一部分归一化积分也趋于零。结合全线相对截尾界，在上述更强的增长条件下，余下待证的算术上界集中于中间时间区域 $T_n^{-\delta}<|t|\le L_n$。若采用固定 $r>0$ 的频率 $\gamma/r$，相应时间端点乘以 $r$，方差尺度乘以 $1/r$。

### 有限支撑的占用数对角下界

对于有限支撑，非中心贡献还受到一个与频率具体取值无关的约束。设 $w_j\ge0$ 且 $\sum_jw_j=1$，次数为 $p$，占用向量 $m$ 满足 $\sum_jm_j=p$。记实际多项式权重为 $c_m$。任选一个指标 $j_0$，其计数由其余计数和总次数唯一确定。对其余坐标选择正半径 $r_j$，定义

$$
v=\sum_{j\ne j_0}\frac{p w_j(1-w_j)}{r_j^2},
\qquad B=\prod_{j\ne j_0}(1+2r_j),
\qquad D_p=\sum_m c_m^2.
$$

实际占用数的第二中心矩为 $p w_j(1-w_j)$。所以在 $\sum_{j\ne j_0}(m_j-pw_j)^2/r_j^2\le1$ 的占用向量上，系数总质量至少为 $\max(0,1-v)$。每个计数坐标处于长度 $2r_j$ 的闭区间，其中至多有 $1+2r_j$ 个整数。去掉 $j_0$ 的投影为单射，故保留的占用向量个数至多为 $B$。由 Cauchy–Schwarz 不等式，

$$
\max(0,1-v)^2\le B D_p.
$$

[占用对角下界](lean:D5/S3/Fourier/Concentration/OccupationDiagonalFloor.occupation_diagonal_lower)

这也给出全线 Fejér 矩的下界。事实上，三角加权矩的每个对角项都精确等于 $c_m^2$，且所有非对角项非负。因此对任意实频率以及任意 $\eta>0$，

$$
\max(0,1-v)^2
\le B\int_{\mathbb R}K_\eta(t)|S(t)|^{2p}\,dt.
$$

[全线 Fejér 矩下界](lean:D5/S3/Fourier/Concentration/OccupationDiagonalFloor.fejer_occupation_floor)

若支撑有 $d+1$ 个指标且 $p>0$，取所有 $r_j=\sqrt{2p}$，则 $v\le1/2$，从而

$$
\int_{\mathbb R}K_\eta(t)|S(t)|^{2p}\,dt
\ge \frac{1}{4(1+2\sqrt{2p})^d}.
$$

对于固定支撑和固定正方差，若 $\eta_p=o(p^{-(d-1)/2})$，以 $s_p/\eta_p$ 归一化的全线矩趋于无穷。中心窗口仍可满足前述高斯极限，因此这给出了非中心积分不能忽略的一种定量情形。随次数增长的实际 ζ 零点族仍需要独立的占用数、相位峰及频率差估计。
