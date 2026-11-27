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

该式约束矩判据所需的平均长度。[@thm-ch34-zeta-harmonic-collision-limit] 在特定尺度下给出实际调和加权 ζ 纵坐标的匹配上界。更短的采样范围内能否找到缺失窗口仍待解决。

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

最终成立。这里允许底层频率族的大小增长。若不控制分辨率与方差的相对尺度，例如单个单位权重频率、$V_n=1/n^2$、固定 $\eta_n>0$，归一化碰撞比可能趋于零。实际调和加权 ζ 零点在更具体的增长和分辨率条件下具有匹配的上界，见 [@thm-ch34-zeta-harmonic-collision-limit]。

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

这把所需的硬带渐近归约为邻近乘法半径处的 Fejér 加权矩渐近。对于实际调和加权 ζ 零点谱，[@thm-ch34-zeta-harmonic-collision-limit] 遵循这条归约，并给出相应的分辨率条件。

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

下段与上段的归一化权重分别至少为 $1/16$ 和 $1/(16\log T)$，段间频率差绝对值至少为 $T/4$。因此仅保留从下段到上段的有序配对，即得

$$
P_2(T)\ge\frac{T^2}{4096\log T}>0,\qquad P_4(T)\le T^2P_2(T).
$$

第二个不等式只用所有正纵坐标均不超过 $T$。所以充分大的 $T$ 上，归一化权重非负且总和为一，并且

$$
\frac{P_4(T)}{P_2(T)^2}\le4096\log T.
$$

[调和权重矩比值界](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_pair_ratio) 若 $T_n\to\infty$ 且 $\log T_n/n\to0$，则实际归一化零点谱满足前述高斯轮廓的四阶矩比值假设。固定比例的频率缩放 $g_\gamma=\gamma/r$（$r>0$）不改变此矩比值。中心 Fejér 主项还须满足分辨率与实际方差尺度的兼容条件。中间时间区域的非中心峰由下文的相位估计控制。

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

并且对邻近的乘法分辨率验证相应极限。对于按调和权重加权的实际 ζ 零点谱，上述截断增长条件保证矩比值条件成立。后文用统一 Landau 估计控制非中心峰，在 $\eta_n\log T_n\to\infty$ 的范围内得到 [@thm-ch34-zeta-harmonic-collision-limit]。

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

令 $L_n$ 满足 $\eta_nL_n\to+\infty$，并取 $L_n\ge A_n/s_n$。记 $\varepsilon_n=64/(\eta_nL_n)$。最终 $I_{\eta_n}(L_n)\le M_{\eta_n}\le I_{\eta_n}(L_n)/(1-\varepsilon_n)$。因而归一化有限窗口积分 $(s_n/\eta_n)I_{\eta_n}(L_n)$ 与归一化全线矩具有相同的有限极限（任一极限存在即推出另一极限）。在中心主项已经建立的条件下，待控制的相位峰集中到有限的中间时间区域 $A_n/s_n<|t|\le L_n$。在 [@thm-ch34-zeta-harmonic-collision-limit] 的条件下，可取 $L_n=\log T_n$，由后文的相位估计控制这段积分。

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

若 $T_n\to\infty$ 且 $(\log T_n)^2/n\to0$，此上界趋于零，因为 $\log T_n$ 和 $\log n$ 均为 $o(n/\log T_n)$。在移动中心窗口至 $1/T_n$ 的区域，取 $X=T_n$，同一四阶矩估计保证 $|t|\le1/T_n$ 时 $|Z_{T_n}(t)|^{2n}\le e^{-11(s_nt)^2/12}$。当 $A_n\to\infty$ 时，$|s_nt|>A_n$ 的这一部分归一化积分也趋于零。结合全线相对截尾界，在上述更强的增长条件下，余下需要估计的积分集中于中间时间区域 $T_n^{-\delta}<|t|\le L_n$。若采用固定 $r>0$ 的频率 $\gamma/r$，相应时间端点乘以 $r$，方差尺度乘以 $1/r$。

### 实际零点谱的短区间计数下界

记 $N(x,y)$ 为纵坐标位于 $(x,y]$ 内的非平凡 ζ 零点数，按解析重数计数，并令

$$
M(Y)=\frac{Y}{2\pi}\left(\log\frac{Y}{2\pi}-1\right).
$$

现有无条件 Riemann–von Mangoldt 二进区间估计保证，对于充分大的 $x$，$N(x,2x)$ 与主项增量 $M(2x)-M(x)$ 之差的绝对值至多为 $B\log x$。令 $E(x)=N(0,x)-M(x)$。由计数可加性得到 $|E(2x)-E(x)|\le B\log x$。增大 $D$ 以覆盖固定起始区间 $[U,2U]$ 上的误差，并满足 $2D\log 2\ge B$，则 $D((\log(2x))^2-(\log x)^2)$ 足以吸收每一步的二进余项。每个实数 $Y\ge U$ 均为起始区间内某一点的二进倍数，因此

$$
|N(0,Y)-M(Y)|\le D(\log Y)^2.
$$

[累计计数余项](lean:D5/S3/Weil/ZeroData/CumulativeRvmError.cumulative_rvm_error) 经典累计 Riemann–von Mangoldt 渐近式具有更强的 $O(\log Y)$ 误差。上述对数平方界直接由当前形式化库中的精确二进区间计数定理推出。

对于充分大的 $x$ 和 $x\le y\le2x$，主项增量至少为 $(y-x)\log x/(4\pi)$，两个端点的累计误差合计至多为 $5D(\log x)^2$。因此存在 $L>1$ 与 $K>0$，使得当 $L\le x$ 且 $x+K\log x\le y\le2x$ 时，

$$
N(x,y)\ge\frac{(y-x)\log x}{8\pi}.
$$

[短区间计数下界](lean:D5/S3/Weil/ZeroData/CumulativeRvmError.short_window_count_lower) 这两个估计均无须 RH 前提。在正纵坐标谱的 RH 接口下，后一个估计给出了移动对数宽度区间的实际解析重数计数下界。要用这些计数建立更长时间区域的统一傅里叶相位亏损界，还需估计有利相位区间及其联合加权贡献。

### 倒对数时间区间上的相反相位弧

在 RH 接口下，存在固定的 $L>1$ 与 $b>0$，使得当 $T\ge L$ 且 $16\pi/T\le|t|\le b/\log T$ 时，

$$
1-|Z_T(t)|\ge\frac{1}{4096\log T}.
$$

[周期相位亏损界](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHPeriodicPhaseCoverage.harmonic_periodic_phase_deficit) 取 $b=\pi/(8K)$ 与 $H=2\pi/|t|$，则 $8H\le T$ 且 $H/16\ge K\log T$。从 $k_0H$ 开始，其中 $k_0=\lceil T/(2H)\rceil$，在 $[T/2,T]$ 中取 $q=\lfloor T/(4H)\rfloor\ge T/(8H)$ 个完整周期。每个周期中分别取以相位 $0$ 与 $\pi$ 为起点、宽度均为 $H/16$ 的两个半开区间。每族区间两两不交，对应相位分别距 $+1$ 与 $-1$ 至多 $\pi/8<1/2$。

根据短区间计数界及 $T\ge4$ 时的 $\log(T/2)\ge\log T/2$，每个区间的解析重数计数至少为 $H\log T/(256\pi)$。高处每个零点对 $W(T)$ 的贡献至少为 $m_\gamma/(2T)$。因而每族区间的调和质量至少为 $\log T/(4096\pi)$。把原始复数得分投影到自身单位方向上。若该方向的实部非负，选取 $-1$ 附近的区间族，否则选取 $+1$ 附近的区间族。相应投影值至多为 $1/2$，而所有单位相位的投影值至多为 $1$。故原始模长亏损至少为 $\log T/(8192\pi)$。除以 $W(T)\le(\log T)^2/(2\pi)$ 即得所求结论。负时间由复共轭得到相同的界。

所以在此时间区间上，$|Z_T(t)|^{2n}\le\exp(-n/(2048\log T))$。将其与先前在 $1/T\le|t|\le T^{-1/2}$ 上的倒高度估计结合，当 $T_n\to\infty$ 且 $(\log T_n)^2/n\to0$ 时，$1/T_n\le|t|\le b/\log T_n$ 上的归一化 Fejér 贡献趋于零。新增周期区域的贡献至多为

$$
\frac{b\sqrt{n/2}\,T_n}{\pi\log T_n}
\exp\left(-\frac{n}{2048\log T_n}\right)\longrightarrow0.
$$

下一节用统一 Landau 估计把控制范围从 $b/\log T_n$ 延伸到 $\log T_n$。

### 从统一 Landau 估计推到对数时间

在 RH 下，令 $F_V(t)=\sum_{0<\gamma\le V}m_\gamma e^{i\gamma t}$。下面的转移用到这个四项的一致界。它在 RH 下可由轮廓计算得到。
$$
|F_V(t)|\le C\left[V+e^{|t|/2}(1+|t|)^2+e^{|t|/2}(1+\log V)+\frac{\log V}{|t|}\right]
\qquad(V>1,\ t\ne0).
$$
文献中的 Gonek 统一 Landau 公式给出这一前提。取 $x=e^{|t|}$，在 RH 下将零点和除以 $\sqrt{x}$ 得到 $F_V(|t|)$。由 $\Lambda(x)\le\log x$ 及误差项中以 $V$ 截断的最小值，主项和邻近素数幂的误差都可由常数乘 $V|t|e^{-|t|/2}$ 控制。其余三项来自两个含 $x$ 的误差和 $x\to1$ 时的误差。复共轭给出负时间的估计。[Gonek，定理 1，式 (3)，第 92–93 页](https://www.sas.rochester.edu/mth/people/faculty/gonek-steve/assets/pdf/8-landau-form.pdf)

统一公式可以按矩形轮廓的各条边分别验证。取 $x=e^{|t|}$ 时，右竖边界中随高度增长的项在除以 $\sqrt{x}$ 后由 $O(V)$ 控制，因为 $\log(2x)/\sqrt{x}$ 在 $x>1$ 上有界。

::: {.theorem #thm-ch34-landau-right-edge title="Landau 轮廓的右竖边界" lean="D5/S3/Weil/ZetaExplicit/LandauRightVertical.norm_right_vertical_integral"}
对实数 $x,V>1$，取 $c=1+1/\log(3x)$。对积分变量 $u$ 记 $s=c+iu$，则

$$
\left|\int_1^V x^{s}\frac{-\zeta'(s)}{\zeta(s)}\,du\right|
\le 400\left(V\log(2x)+x(\log(2x))^2\right).
$$
:::

::: proof
在 $\operatorname{Re}s=c>1$ 处逐项积分 von Mangoldt 级数。最接近 $x$ 的整数项由区间长度控制，即使频率恰为零也成立。若最近整数为 $1$，其系数 $\Lambda(1)$ 为零。对 $[x/2,2x]$ 内其余整数，频率差的绝对值 $|\log x-\log n|$ 至少为 $|x-n|/(2x)$。按最近整数左右分别对倒数距离求和，由两段调和和控制。在该区间外频率差的绝对值至少为 $1/2$，用积分判别控制绝对级数。最后利用 $x^c\le 3x$。完整证明由 Lean 内核检查。
:::

右竖边向上取向，$ds=i\,du$，因此 $\zeta'/\zeta$ 的轮廓积分乘以 $1/(2\pi i)$ 后，这条边的贡献等于上式积分乘以 $-1/(2\pi)$。Ford 与 Zaharescu 保留最近素数幂的振荡项。这里估计的是整条边的模长。除以 $\sqrt{x}$ 后，右边第二项给出统一估计中的 $e^{|t|/2}(1+|t|)^2$ 量级。 [Ford–Zaharescu，引理 1 的证明](https://arxiv.org/abs/math/0405459v2)

::: {.theorem #thm-ch34-landau-left-edge title="Landau 轮廓的左竖边界" lean="D5/S3/Weil/ZetaExplicit/LandauLeftVertical.norm_left_vertical_integral"}
设 $x>1$、$V\ge1$ 为实数，写 $s=-1/4+iu$。则

$$
\left|\int_1^V x^s\frac{-\zeta'(s)}{\zeta(s)}\,du\right|
\le x^{-1/4}\left(80(V-1)+\frac{20(1+\log V)}{\log x}\right).
$$
:::

::: proof
由 ζ 函数的函数方程，$-\zeta'(s)/\zeta(s)=\log(3/4+iu)+r(u)$。利用双伽马函数递推、Binet 估计和反射直线 $\operatorname{Re}(1-s)=5/4$ 上绝对收敛的级数，可得 $|r(u)|\le80$。将 $x^s$ 写成 $x^{-1/4}e^{iu\log x}$。提出 $x^{-1/4}$ 后，余项的积分至多为 $80(V-1)$。取原函数 $e^{iu\log x}/(i\log x)$，对含对数的一项分部积分。对数的导数模长至多为 $1/u$，两端点和导数积分给出第二项。Lean 证明无须假设 RH。
:::

左竖边向下取向，因此以 $\zeta'/\zeta$ 写出的轮廓积分，经归一化后，这条边的贡献等于上式积分乘以 $1/(2\pi)$。取 $x=e^{|t|}$ 并除以 $\sqrt{x}$ 后，两项分别由 $V$ 和 $(1+\log V)/|t|$ 的常数倍控制。

::: {.theorem #thm-ch34-landau-inclusive-cutoff title="含端点的 ζ 零点相位和的一致界" lean="D5/S3/Weil/ZetaExplicit/LandauUniformCutoff.actual_cutoff_landau_envelope"}
假设 RH。存在绝对常数 $C>0$，对所有实数 $V>1$ 和 $t\ne0$ 有

$$
|F_V(t)|\le C\left[V+e^{|t|/2}(1+|t|)^2+\frac{\log V}{|t|}\right].
$$
:::

::: proof
设 $x=e^{|t|}$。在 $V$ 上方距离至多 $2$ 的位置选一个避开零点的高度。保留底边的高度 $1$，并用前面两个定理控制竖边。ζ 函数的函数方程把临界线右侧的平方对数界延伸到整条上边。加权辐角原理给出矩形内的零点和，零点按解析重数计入。RH 让每个 $x^\rho$ 都含同一个因子 $\sqrt{x}$，除去该因子后得到相位和。上边贡献由 $\sqrt{x}\log^2(V+9)$ 的常数倍控制。当 $x\le V$ 时，它由 $V$ 的常数倍控制。当 $x>V$ 时，把对数项改以 $x$ 界定。从所选高度转移回 $V$ 只跨越一个有界长度的窗口，该窗口的解析重数总和为 $O(\log(V+9))$。$1<V\le6$ 时没有正纵坐标落在截断以内。对负频率取复共轭。
:::

这就给出了上面的四项界，因为多出的项非负。这里控制的是相位和的整体模长。素数幂主项的精确公式见 Gonek 的定理 1。

固定 $b>0$。对充分大的 $T$，在 $b/\log T\le|t|\le\log T$ 且 $1<V\le T$ 时，括号内四项合计至多为 $(7+1/b)T$。这是因为最终有 $\log T\le T^{1/4}$，且 $e^{|t|/2}\le\sqrt T$、$\log V/|t|\le(\log T)^2/b$。将界分别用于 $V=T$ 和 $V=3T/4$，两者之差的模长至多为 $2C(7+1/b)T$，最终至多为 $T\log T/(32\pi)$。而 $(3T/4,T]$ 内的解析重数计数至少为 $T\log T/(16\pi)$。

该区间内调和权重逐项大于等于保留权重 $m_\gamma/(2T)$。剩余权重非负，其得分模长至多是其总质量。由三角不等式，原得分的亏损至少是保留部分的亏损，即至少为区间计数的一半再除以 $2T$。结合 $W(T)\le(\log T)^2/(2\pi)$，得到
$$
1-|Z_T(t)|\ge\frac1{32\log T},
\qquad \frac b{\log T}\le |t|\le\log T.
$$
Lean 定理以统一估计为显式前提，核验了这一步转移。[对数时间调和得分亏损界](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLandauWindowTransfer.harmonic_landau_window_deficit)

::: {.theorem #thm-ch34-zeta-harmonic-collision-limit title="调和加权 ζ 零点的高斯碰撞极限" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLogarithmicCollisionLimit.harmonic_zeta_collision_limit"}
假设 Mathlib 所表述的黎曼假设（RH）成立。即若 $\zeta(s)=0$、$s\ne1$，且 $s\ne-2(k+1)$ 对所有自然数 $k$ 成立，则 $\operatorname{Re}s=1/2$。设上面的统一估计对某个固定 $C>0$ 成立。令 $T_n\to\infty$ 且 $(\log T_n)^2/n\to0$，记 $s_n=\sqrt{nP_2(T_n)/2}$。若 $\eta_n$ 最终为正，且 $\eta_n/s_n\to0$、$\eta_n\log T_n\to\infty$，那么

$$
\frac{s_n E_n(\eta_n)}{\eta_n W(T_n)^{2n}}\longrightarrow\frac1{\sqrt\pi}.
$$

这里 $E_n(r)$ 对所有频率差绝对值不超过 $r$ 的有序占用向量对求和，每一对取原调和权重所诱导的两个多项式权重之积。
:::

::: proof
四阶矩界 $P_4(T)\le T^2P_2(T)$ 允许把中心窗直接取为 $|t|\le1/T_n$。二阶矩下界保证换元后的半宽 $s_n/T_n$ 趋于无穷。中心积分给出 $1/(2\sqrt\pi)$。倒数高度、周期相位和 Landau 估计覆盖 $1/T_n\le|t|\le\log T_n$ 的整个区间，给出统一的得分亏损下界 $c/\log T_n$，其中 $c>0$。得分的 $2n$ 次幂于是至多为 $\exp(-2cn/\log T_n)$，足以抵消归一化积分中的 $T_n\sqrt n\log T_n$ 因子。相对截断把极限传到全线。对 $\eta_n$ 的每个固定正倍数应用同一论证，得到二次斜坡极限，再由两侧割线得到含端点的硬碰撞常数。完整证明由 Lean 内核检查。
:::

[@thm-ch34-landau-inclusive-cutoff] 给出了冻结碰撞定理所需的 Landau 前提。所以 RH 加上所列的截断与分辨率条件即可推出这个碰撞极限。Alpöge 的外部形式化证明给出了 Mathlib 的 RH 命题。 [外部 RH 定理](https://github.com/leanprover-community/riemann-hypothesis/blob/7c4ccbd64d02774b0a5b40a5f923f5b7a18e8abc/src/Main.lean#L9)

若 $\eta_n\log T_n$ 有界，把积分只截到 $\log T_n$ 时，相对余项界可以停留在常数量级。

### 对相关上界与临界分辨率

若 Montgomery 对相关和有足够小的一致上界，傅里叶积分就能控制到更长的时间窗。沿用含端点的正纵坐标截断。令 $N(Y)=\sum_{0<\gamma\le Y}m_\gamma$，$F_Y(t)=\sum_{0<\gamma\le Y}m_\gamma e^{it\gamma}$，并记

$$
G_Y(t)=
\sum_{0<\gamma,\gamma'\le Y}
m_\gamma m_{\gamma'}\frac{4\cos\bigl(t(\gamma-\gamma')\bigr)}
{4+(\gamma-\gamma')^2}.
$$

::: {.theorem #thm-ch34-zeta-harmonic-critical-collision-limit title="临界分辨率下的条件高斯碰撞极限" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHCriticalCauchyThreshold.harmonic_zeta_critical_collision_limit_of_cauchy_cap"}
假设 Mathlib 表述的 RH。令 $c=1/(2\pi)$，并假设存在固定的 $\kappa<2\pi c^2$，使得对每个固定的 $A>1$，当 $Y$ 足够大时，$G_Y(t)\le\kappa Y\log^2 Y$ 在 $\log Y\le |t|\le A\log Y$ 上一致成立。令 $T_n\to\infty$ 且 $(\log T_n)^2/n\to0$。沿用上文的谐权重、$W(T_n)$ 和 $s_n=\sqrt{nP_2(T_n)/2}$。若 $\eta_n/s_n\to0$，且存在 $a>0$ 使得最终 $\eta_n\log T_n\ge a$，则
$$
\frac{s_n E_n(\eta_n)}{\eta_n W(T_n)^{2n}}\longrightarrow\frac1{\sqrt\pi}.
$$
:::

::: proof
把系数 $m_\gamma e^{it\gamma}$ 放在相应的零点高度上，用单位尺度的柯西密度平滑。两份密度的卷积给出尺度二的洛伦兹核，所以 $G_Y(t)$ 等于平滑和的 $L^2$ 范数平方乘 $2\pi$。取 $R>0$。在区间 $[-R,Y+R]$ 上积分，每份平移密度遗漏的质量至多为 $\ell_R=1-2\arctan(R)/\pi$。对该区间应用柯西–施瓦茨不等式，得到
$$
G_Y(t)\ge \frac{2\pi}{Y+2R}\bigl(\max\{|F_Y(t)|-\ell_R N(Y),0\}\bigr)^2 .
$$

取 $R=\delta Y$，其中 $\delta>0$ 足够小，使 $\kappa<2\pi c^2/(1+2\delta)$。由于 $\ell_R\to0$ 且 $N(Y)/(Y\log Y)\to c$，这个严格差距保证 $N(Y)-|F_Y(t)|\ge dN(Y)$，其中 $d>0$ 与 $Y,t$ 无关。整个含端点截断内的谐权重至少为 $m_\gamma/(2Y)$。增加非负权重时，总质量减去相位和模长不会减小。由此把整个截断的未加权缺损传给谐权重，再用 $W(Y)\sim(c/2)\log^2 Y$，得到至少为某个正数除以 $\log Y$ 的归一化缺损。较短的时间窗沿用前述倒数高度、周期相位和 Landau 估计。

对每个固定的 $A>1$，截至 $A\log T_n$ 的归一化积分趋于中央的高斯常数。对足够大的 $A$，相对截断把遗漏比例控制在 $64/(aA)$ 以内。分辨率换成任意固定的 $\lambda\eta_n$（$\lambda>0$）时，下界参数变为 $\lambda a$，遗漏比例界相应为 $64/(\lambda aA)$。令 $A$ 足够大，再取 $n$ 的极限，即可在相邻分辨率上用两侧割线取回含端点的硬带极限。完整证明由 Lean 内核检查。
:::

这个阈值包含一致的 $G_Y(t)=o(Y\log^2 Y)$ 情形，通常的 Montgomery 对相关猜想会给出这个小阶界。实际 $\zeta$ 零点在整个长频带上的阈值仍是本定理的数论前提。结论覆盖 $\eta_n\log T_n\to a$ 且 $0<a<\infty$ 的情形。对固定有限支撑和固定正方差，本页后面的占据对角项下界给出一个更细的分辨率范围，归一化 Fejér 矩在该范围发散。 在 RH 和猜想 5 的精细渐近下，Ford–Soundararajan–Zaharescu 的定理 1.4 推出相位和的抵消，再由定理 1.3 得出短区间素数结论。引理 1 用中心化对相关和的平移差来估计相位和。 [§1 与定理 1.3–1.4](https://arxiv.org/html/0805.2745v3#S1) · [引理 1](https://arxiv.org/html/0805.2745v3#Thmlemma1)

::: {.theorem #thm-ch34-montgomery-bounded-count-upper title="有界计数误差给出一致的对相关上界" lean="D5/S3/Analytic/Oscillation/MontgomeryCountUpper.pairSum_le_of_bounded_discrepancy"}
取任意局部有限的正纵坐标谱，各纵坐标带正整数重数。沿用含端点的计数 $N(Y)$ 与有序对和 $G_Y(t)$，令 $c=1/(2\pi)$。若存在常数 $D$，使所有充分大的 $Y$ 满足 $|N(Y)-cY(\log(cY)-1)|\le D$，则对每个 $\varepsilon>0$，所有充分大的 $Y$ 和所有实数 $t$ 都满足

$$
G_Y(t)\le (2\pi c^2+\varepsilon)Y(\log Y)^2.
$$
:::

::: proof
设计数误差从固定高度 $A\ge1$ 起有界。对任一截断内纵坐标，以它为中心的半径 $r$ 的闭区间内，重数之和至多为 $2cr\log Y+N(A)+2D+c$。低于或等于 $A$ 的部分由 $N(A)$ 控制。其余部分用两个含端点计数之差估计，左截断向左移 $1/\log Y$ 并限制在 $A$ 以上，使闭区间的左端点也被计入。按洛伦兹核的水平集积分，行和至多为 $2\pi c\log Y+N(A)+2D+c$。将每项余弦上界取为一，再按重数对各行求和。由 $N(Y)/(Y\log Y)\to c$ 得到结论。
:::

计数定理给出的系数可从上方任意接近 $2\pi c^2$。临界碰撞定理还需要在实际 $\zeta$ 零点的长频带上证出一个严格低于 $2\pi c^2$ 的固定系数。

### 具有同一单位频带轮廓的共格谱

[@thm-ch34-zeta-harmonic-critical-collision-limit] 的上界控制单位频带之外的频率。同一个谱可以在 $O(\log\log H)$ 误差内满足两项计数公式，并满足整个单位频带上的 Lorentz 轮廓，同时在临界分辨率下的归一化碰撞质量最终比高斯极限常数高出一个固定正量。下面的比较在每个实数截断高度使用同一个谱。

在具有 $M>0$ 个站点的循环群上，取 $k$ 个归一化傅里叶列构成集合 $A$。给每个 $k$ 元站点子集 $X$ 分配对应行子式模的平方作为概率。列正交保证这些概率之和为一。对 $r\in\mathbb Z/M\mathbb Z$ 记 $S_X(r)=\sum_{x\in X}\exp(2\pi i r x/M)$。

::: {.theorem #thm-ch34-cyclic-projection-second-moment title="循环投影下的二阶矩" lean="D5/S3/Analytic/Oscillation/CyclicProjectionMoments.cyclic_projection_second_moment"}
对上述任意 $M$、$A$ 和 $r$，有

$$
\mathbb E|S_X(r)|^2=k+k^2\mathbf1_{\{r=0\}}-|A\cap(A+r)|.
$$

:::

::: proof
相同站点的配对贡献 $k$。两个不同站点的共同入选概率等于投影对角元乘积减去非对角元模的平方。将第一项在所有站点配对上求和，得到零频处的 $k^2$。第二项把投影元按选中的列展开。对两个站点分别求和后，只剩差恰为 $r$ 的列对。两个投影乘积之差在相同站点处为零，因此可以分别对所有有序站点配对求和。完整证明由 Lean 内核检查。
:::

无限谱在各区间 $I_j=(y_j,y_{j+1}]$ 分别使用这个循环投影分布，其中 $y_{j+1}=y_j+\lceil(\log y_j)^4\rceil$，$y_0$ 充分大。记 $F(H)=\frac{H}{2\pi}(\log(H/(2\pi))-1)$、$L_j=\log y_{j+1}$，并令 $R_j$ 是不小于 $L_j$ 的最小二的幂。区间内的候选站点位于间距 $h_j=2\pi/(3R_j)$ 的格点上。若有 $M_j$ 个站点，就在该周期选 $k_j=\lfloor F(y_{j+1})\rfloor-\lfloor F(y_j)\rfloor$ 个连续列。这样整块的入选数固定，$M_j$ 和 $k_j$ 均为 $L_j^5$ 阶。记 $p_j=k_j/M_j$，则 $a_j=2\pi p_j/h_j=L_j+O(1)$。密度 $p_j$ 有统一正下界，且 $p_j\le1/3+o(1)$。

前 $m$ 个站点的入选数期望为 $mp_j$。方差等于从该前缀到补集的投影元模平方之和。对于循环距离 $u\ge1$，跨界配对至多 $4u$ 个，连续傅里叶列的等比和给出每项不超过 $1/(4u^2)$。因此方差一致为 $O(\log M_j)$。限制到前缀的行列式点过程给出独立 Bernoulli 变量之和的计数分布。Bernstein 不等式与并集界给出各前缀同时偏离均值至多 $O(\log M_j)$，其概率趋于一。对 $H\in I_j$，站点数比例和长度比例相差 $O(1/M_j)$。由于 $F''(x)=1/(2\pi x)$，对 $F$ 做块内线性插值产生 $O((\log y_j)^8/y_j)$ 的误差。完整块的计数望远镜相消，所以对每个实数截断有 $N(H)=F(H)+O(\log\log H)$。[限制后的行列式计数](https://arxiv.org/abs/math/0503110)

对于一个完整块，简记 $M=M_j$、$p=p_j$、$h=h_j$、$K(d)=M^{-1}\sum_{a=0}^{k_j-1}e^{2\pi iad/M}$、$w_h(d)=4/(4+h^2d^2)$。它的 Lorentz 配对和期望为

$$
p^2\sum_{|d|<M}(M-|d|)w_h(d)e^{ihdt}
+k_j-\sum_{|d|<M}(M-|d|)w_h(d)|K(d)|^2 e^{ihdt}.
$$

在第一项中，将三角系数换成全整数上的常数 $M$，误差为 $O(h^{-2}\log M)=o(k_j)$。对指数函数的周期化取傅里叶系数可知，此处的无穷级数是 $(2\pi/h)\sum_{\ell\in\mathbb Z}e^{-2|t-2\pi\ell/h|}$。当 $|t|\le3L_j/2$，中心项给出 $k_j a_j e^{-2|t|}$，其余周期的贡献为 $o(k_j)$。最后一项的归一化系数在绝对和意义下趋近于圆上区间 $[0,p]$ 的傅里叶系数模平方。固定 $d$ 时使用黎曼和与 $h\to0$。在 $0<|d|\le M/2$ 使用 $O(d^{-2})$ 控制尾项。再远的项由 $\sum_{d\bmod M}|K(d)|^2=p$ 控制，总贡献为 $O(h^{-2}/M^2)$。由于 $|ht/(2\pi)|\le1/2$，且 $j$ 充分大时 $p<1/2$，圆上的自相关函数在此频带等于 $(p-|ht/(2\pi)|)_+$。所以期望除以 $k_j$ 后一致等于 $a_j e^{-2|t|}+\min(1,|t|/a_j)+o(1)$。[平方子式的入选概率](https://www.numdam.org/item/10.1007/s10240-003-0016-0/)

由 $w_h$ 的行和，配对量在布尔立方上的 Lipschitz 常数为 $O(L_j)$。对齐次强 Rayleigh 测度，固定时刻偏离超过 $k_j/L_j$ 的概率至多 $2\exp(-c k_j/L_j^4)$。偏差概率中的指数 $k_j/L_j^4$ 为 $L_j$ 阶。在 $[-3L_j/2,3L_j/2]$ 上取步长 $L_j^{-20}$ 的网格，点数仅按 $L_j$ 的固定幂增长，因而并集界趋于零。导数至多为 $(y_{j+1}-y_j)k_j^2=O(L_j^{14})$，由此将网格估计推广到全区间。将此事件与前缀计数事件相交，每块取一个同时满足两者的子集。[强 Rayleigh 测度的集中不等式](https://arxiv.org/abs/1108.0687v2)

在截断高度 $H$ 以内，各块的站点都落在当前块的同一格点上，因为 $R_j$ 整除其后继。每个单位区间只有 $O(\log H)$ 个候选站点，所以 Lorentz 核的绝对行和为 $O(\log H)$。距块界 $d$ 的站点对另一侧的加权和为 $O(\log H/(1+d))$，按单位区间求和知每道块界的跨界配对量至多 $O(\log^3 H)$。块界总数为 $O(H/\log^4 H)$。在 $\sqrt H$ 以下，间隔至少为一，在其上至少为 $(\log H/2)^4$。末端未满块至多有 $O(\log^5 H)$ 个站点。跨越所有块界及涉及末端未满块的两类配对量分别为 $o(N(H))$。同一行和界允许略去 $H/\log^3 H$ 以下及与该高度相交的整块，代价也是 $o(N(H))$。其余块满足 $a_j/\log H\to1$ 一致成立，合计点数为 $N(H)(1+o(1))$。因此

$$
\frac{G_H(t)}{N(H)}
=\bigl(1+o(1)\bigr)\log H\,e^{-2|t|}+\frac{|t|}{\log H}+o(1)
\qquad (|t|\le\log H)
$$

一致成立，与 ζ 单位频带公式具有相同的两项。[单位频带公式](https://arxiv.org/abs/2306.04799)

点态上界与区间平均可以相差一个对数因子。对 $H\in I_j$，公共周期是 $P_H=2\pi/h_j$。两个相异站点的差是 $h_j$ 的非零整数倍，所以对应字符在一个整周期的积分为零，$G_H$ 的周期平均恰为 $N(H)$。Lorentz 配对量非负，因而在任意长度与 $\log H$ 同阶的区间上，其平均为 $O(N(H))$，即使区间包含共振时刻。

在 $Y_j=y_{j+1}$ 处，配对量在时刻 $2\pi/h_j=3R_j$ 重现零频值。这个时刻介于 $3\log Y_j$ 和 $6\log Y_j$ 之间。沿用正调和权重，但改在所选站点上求和。对充分大的 $n$，令 $T_n=Y_j$ 为不超过 $n$ 的最大块端点，取 $\eta_n=h_j/8$。$n$ 附近的块长为 $O(\log^4 n)$，故 $T_n/n\to1$。方差为 $V_n=P_2(T_n)/2$，尺度 $s_n=\sqrt{nV_n}$。两个固定的相异站点给出 $V_n\gtrsim W(T_n)^{-2}$，计数界经分部求和给出 $W(T_n)=O(\log^2 T_n)$，所以 $s_n/h_j\to\infty$。格点方差下界以因子 $h_j/(2\pi)$ 对一周期上的 $(1-V_nt^2/2)_+^{2n}$ 积分。在 $|t|\le1/(2s_n)$ 上，由 Bernoulli 不等式，被积函数至少为 $3/4$。于是归一化碰撞质量最终不低于 $3/\pi>1/\sqrt\pi$，同时仍有 $\eta_n\log T_n\in(\pi/24,\pi/12]$、$(\log T_n)^2/n\to0$ 和 $\eta_n/s_n\to0$。无限谱结论是关于所选站点的书面证明。实际 ζ 零点还满足素数和恒等式带来的算术约束。

#### 单位频带排除有界计数误差

设 $S$ 由互异的正实数纵坐标 $\gamma$ 组成，每个区间 $(0,H]$ 仅含有限多个纵坐标。以 $m_\gamma$ 表示正整数重数，令 $N(H)=\sum_{\gamma\le H}m_\gamma$。沿用上文的有序 Lorentz 配对和 $G_H(t)$，每一对计入因子 $m_\gamma m_{\gamma'}$，并采用归一化 $P_H(\alpha)=2\pi G_H(\alpha\log H)/(H\log H)$。

::: {.theorem #thm-ch34-montgomery-unit-band-unbounded-discrepancy title="Montgomery 单位频带推出无界计数误差" lean="D5/S3/Analytic/Oscillation/MontgomeryCountDiscrepancy.unit_band_profile_forces_unbounded_count_discrepancy"}
设 $c(H)\to1$ 且 $e(H)\to0$。若对所有充分大的 $H$ 和所有 $|\alpha|\le1$ 有

$$
\left|P_H(\alpha)-c(H)\log H\,e^{-2|\alpha|\log H}-|\alpha|\right|\le e(H),
$$

则对每个实数 $D$ 和 $H_0$，存在实数 $H\ge H_0$ 使 $|N(H)-F(H)|>D$，其中 $F$ 为上文的两项计数主项。
:::

::: proof
假设 $|N(H)-F(H)|$ 在充分大的高度上一致有界。记 $a=\log H/(2\pi)$，取实值 Schwartz 测试函数 $g$，使其傅里叶变换支撑在 $(-1,1)$ 内，约定 $\widehat g(\alpha)=\int g(u)e^{-2\pi i\alpha u}\,du$。在 $x$ 处的平滑计数为 $C_H(x)=\sum_{\gamma\le H}m_\gamma g(a(x-\gamma))$。对 $g*\widetilde g$ 作傅里叶反演，其中 $\widetilde g(u)=g(-u)$，相当于用 $|\widehat g|^2$ 检验单位频带轮廓。峰 $\log H\,e^{-2|\alpha|\log H}$ 的质量趋于一，贡献 $|\widehat g(0)|^2$。

在计数误差有界时，缩放坐标 $a\gamma$ 上每个单位区间内按重数计的点数一致有界，因为截断以内 $F'(x)\le a+O(1)$。因此，对配对和施加自相关测试并归一化后，去掉 Lorentz 权重只产生 $O(a^{-2})$ 误差。使用 $1-4/(4+v^2)\le v^2/4$，对每一行按单位区间求和，并利用 $(1+u^2)|(g*\widetilde g)(u)|$ 的快速衰减即可得到该界。保留重数但去掉 Lorentz 权重的未归一化配对和等于 $a\int_{\mathbb R} C_H^2$，且 $N(H)/(aH)\to1$。在 $[0,H]$ 之外，$\int(|C_H|+C_H^2)=o(H)$。距两端点不到一个单位的点按重数计有 $O(\log H)$ 个，外部 $L^1$ 贡献有界。其余站点只贡献缩放距离 $a$ 之外的 Schwartz 尾部。每个单位区间的点数界还给出 $|C_H|$ 的一致上界，从而控制外部 $L^2$ 贡献。另有 $H^{-1}\int C_H\to\int g$。合并可得

$$
\lim_{H\to\infty}\frac1H\int_0^H\left(C_H(x)-\int g\right)^2\,dx
=\int_{\mathbb R}|\alpha|\,|\widehat g(\alpha)|^2\,d\alpha .
$$

另一方面，对累积计数误差分部积分，得到平滑计数与截断密度 $F'$ 的相应卷积之差至多为 $D_*\|g'\|_1$，其中 $D_*$ 与 $g$、$H$ 无关。可以将参考密度在一个固定且大于 $2\pi$ 的高度以下设为零，其累积误差仍有界。参考密度与 $g(a\,\cdot)$ 的卷积在 $[0,H]$ 上按均方趋于 $\int g$。这是因为 $F'/a$ 在任一固定比例的内部区间上一致趋于一，且截断后的归一化密度直到端点都一致有界。因此方差极限至多为 $D_*^2\|g'\|_1^2$。

令 $g_R=\mathbf1_{[-R,R]}*\phi$，其中 $\phi$ 是一个实偶光滑凸起函数 $b$ 的傅里叶逆变换。取 $b$ 支撑于 $[-1/2,1/2]$，在 $[-1/4,1/4]$ 上等于一。由窗函数两端的平移之差得到 $\|g_R'\|_1\le2\|\phi\|_1$。代入 $\widehat g_R(\alpha)=\sin(2\pi R\alpha)b(\alpha)/(\pi\alpha)$，可在每个满足 $j\in\mathbb N$ 且包含于 $(0,1/4]$ 的倍增区间 $[2^j/(2R),2^{j+1}/(2R)]$ 上估计傅里叶能量。正弦平方在该区间恰取整周期平均值 $1/2$，而 $1/\alpha$ 可用右端点的倒数下界，因此每个区间至少贡献 $1/(4\pi^2)$。先固定 $R$ 取高度极限，再令 $R$ 增大，便与方差的一致上界矛盾。完整证明由 Lean 内核检查。
:::

共格比较谱表明，在上面的单位频带假设下，计数误差仍可有 $O(\log\log H)$ 上界。证明只通过固定带限测试函数的积分使用单位频带轮廓。零频附近的误差即使逐点有界，其积分仍会随峰宽一起缩小。

::: {.theorem #thm-ch34-montgomery-concentrated-peak-discrepancy title="指数峰的频率相关误差下仍有无界计数误差" lean="D5/S3/Analytic/Oscillation/MontgomeryCountDiscrepancy.concentrated_unit_band_profile_forces_unbounded_count_discrepancy"}
沿用同一个谱及配对和的归一化，令 $L=\log H$。若存在常数 $B\ge0$ 和 $e(H)\to0$，使得对所有充分大的实数 $H$ 和每个 $|\alpha|\le1$，

$$
\left|P_H(\alpha)-L e^{-2L|\alpha|}-|\alpha|\right|
\le B e^{-2L|\alpha|}+e(H),
$$

则对每个实数 $D$ 和 $H_0$，存在实数 $H\ge H_0$ 使 $|N(H)-F(H)|>D$。
:::

::: proof
固定一个傅里叶变换支撑在 $[-1,1]$ 上的实值 Schwartz 函数 $g$，以 $p=|\widehat g|^2$ 测试频带轮廓。$p$ 连续、有界、可积，且在频带外为零。对充分大的 $H$ 有 $L>0$。因为 $\int_{\mathbb R}e^{-2L|\alpha|}\,d\alpha=1/L$，误差对测试积分的影响至多为 $B\|p\|_\infty/L+e(H)\|p\|_1$。这两项均趋于零。对归一化指数峰作代换 $v=L\alpha$，被积函数成为 $e^{-2|v|}p(v/L)$。由连续性和控制收敛，峰的贡献趋于 $p(0)$。上一证明所用的方差极限与有界计数误差给出的方差上界因此仍然适用。完整证明由 Lean 内核检查。
:::

Baluyot、Goldston、Suriajaya 与 Turnage-Butterbaugh 的公式 (1.4) 给出上式的两类误差，其中 $e(H)=O(L^{-1/2})$。其统计量以复零点之差为变量。由黎曼假设将零点限制在临界线上后，交换有序对的两项可将该统计量化为纵坐标的余弦和。由偶性，频带估计从 $[0,1]$ 延伸到 $[-1,1]$。因此在此识别下，ζ 零点计数与两项主项之差在每个实数尾部无界。碰撞定理还需要独立的长频带估计。 [单位频带公式 (1.1)–(1.4)](https://arxiv.org/html/2306.04799v1#S1.E4)

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
