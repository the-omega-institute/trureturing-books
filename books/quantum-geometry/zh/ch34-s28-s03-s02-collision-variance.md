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
