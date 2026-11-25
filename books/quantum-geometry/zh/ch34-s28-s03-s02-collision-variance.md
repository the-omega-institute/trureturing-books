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

对次数为 $p$ 的频率和取 $A=W^p$、$B=pV$，从而收紧上述矩判据的必要条件。对于 $B>0$，当 $\eta/\sqrt B\to0$ 时，选择 $r=\lceil\sqrt{5M}\rceil$，下界右侧对应的归一化系数趋于 $3/(5\sqrt5)$，即 $\liminf E(\eta)\sqrt B/(A^2\eta)\ge3/(5\sqrt5)$（$A>0$）。实际 ζ 纵坐标的上界仍需进一步证明。

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

当 $0\le\eta<1$ 时，不同格点的距离都大于 $\eta$，所以只有对角项贡献。用 $c_k^2=n^2c_k-k^2c_k$ 即得公式。$n=1$ 时只有中心有正权重。$n\ge2$ 且 $\eta\ge1$ 时，有序对 $(0,1)$ 已产生严格正的额外碰撞。负半径排除所有有序对。 [精确碰撞公式的 Lean 证明](https://github.com/the-omega-institute/trureturing/blob/afc30aadad62cff44787b01db91ff06d4c5adbcc/D5/S3/Fourier/Concentration/SeparatedParabolicCollision.lean#L25)

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

选择 $\eta_n=n/(n+1)$，每个半径严格小于格点间距，且 $L=1$。于是上一节的常数 $3/(5\sqrt5)$ 对任意有限非负加权数据是渐近最优的。连续 Rényi 熵的二阶矩极值也出现这一抛物线形状，参见 [Sekeh 的式 (2.1) 与定理 3.1](https://arxiv.org/abs/1509.02190v4)。这里的有限格点分离保证闭距离带中仅有对角碰撞。要求数据来自固定底层频率族的高次数和，或实际 ζ 纵坐标，还需获得相应的算术约束。 [极限的 Lean 证明](https://github.com/the-omega-institute/trureturing/blob/afc30aadad62cff44787b01db91ff06d4c5adbcc/D5/S3/Fourier/Concentration/SeparatedParabolicCollision.lean#L154)

## 格点卷积的有限傅里叶方差下界

对于原始频率 $g_j$ 及非负权重 $w_j$，令 $S(t)=\sum_j w_je^{ig_jt}$，$W=\sum_jw_j$，$D=\sum_jw_j(g_j-a)^2\le VW$，其中 $a$ 为任意实数中心。中心化只旋转复数和。由 $\cos x\ge1-x^2/2$ 得

$$
|S(t)|\ge W\max(0,1-Vt^2/2),\qquad
|S(t)|\ge\max(0,W-Dt^2/2).
$$

若 $D>0$ 且 $t\ne0$，则 $|S(t)|>W-Dt^2/2$，因为至少一个正权重项的中心化相位非零。 [特征函数下界的 Lean 证明](https://github.com/the-omega-institute/trureturing/blob/c1296ace4f5b66516a07af37f37a1dbcec0d50e1/D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lean#L27)

若频率位于同一仿射格点 $g_j=b+h a_j$，其中 $h>0$、$a_j$ 为整数，则对任意实权重、自然数 $p$、正整数 $k$、实数 $s$ 以及 $0\le\eta<h$，令 $A=k\pi/h$，有精确恒等式

$$
E_p(\eta)=\frac{1}{2A}\int_{s-A}^{s+A}|S(t)|^{2p}\,dt.
$$

将 $|S|^{2p}$ 作有限多项式配对展开，任意两个次数为 $p$ 的频率和之差都是 $hd$，$d$ 为整数。对应余弦项的平均值为 $\cos(hds)\operatorname{sinc}(k\pi d)$。因此保留全部相等频率和的有序对。 [周期平均恒等式的 Lean 证明](https://github.com/the-omega-institute/trureturing/blob/c1296ace4f5b66516a07af37f37a1dbcec0d50e1/D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lean#L111)

当权重非负且 $\eta\ge0$ 时，结合单周期内的点态下界得到

$$
E_p(\eta)\ge \frac{hW^{2p}}{2\pi}
\int_{-\pi/h}^{\pi/h}\max(0,1-Vt^2/2)^{2p}\,dt.
$$

若 $D>0$ 且 $p>0$，该不等式严格成立。这里使用了次数和的同一傅里叶幂展开。固定 $V,h>0$ 而次数增长时，积分中的缩放变量为 $t\sqrt{pV}$，其高斯极限给出的渐近系数仍待形式化。一般实频谱的有限分辨率碰撞需要另行建立正核估计。 [有限积分下界的 Lean 证明](https://github.com/the-omega-institute/trureturing/blob/c1296ace4f5b66516a07af37f37a1dbcec0d50e1/D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lean#L179)
