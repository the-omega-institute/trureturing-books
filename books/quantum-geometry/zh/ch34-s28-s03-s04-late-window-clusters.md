# M.4 晚期窗口质量、簇值与谱误差 {#sec-ch34-s28-s03-s04-late-window-clusters}


**窗口预算怎样限制内点的负值？** 沿用上文的素数尾项，记

$$
Q_{\vartheta}(x)=\int_x^\infty\frac{\vartheta(t)-t}{t^2}\,dt,
\qquad N(a,b)=\int_a^b\frac{\max\{-Q_{\vartheta}(z),0\}}{\sqrt z}\,dz.
$$

::: {.theorem #thm-ch31-prime-tail-negative-window title="内点负值给出的窗口积分下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.prime_tail_negative_window_lower"}
设 $a,b,x,r$ 为实数，满足 $0<r\le 1/2$、$1\le a\le(1-r)x$ 和 $(1+r)x\le b$。若 $Q_{\vartheta}(x)\le-4r^2$，则 $N(a,b)\ge r^3\sqrt{x}$。
:::

::: proof
这个估计适用于实数截点，包括素数处的跃迁。

由 $\vartheta$ 的单调性，将局部积分中的 $\vartheta(t)$ 与 $\vartheta(x)$ 比较，得到
$Q_{\vartheta}(z)-Q_{\vartheta}(x)\le\ln(z/x)+\vartheta(x)(1/z-1/x)$。
当 $\vartheta(x)\le x$ 时取左侧，反之取右侧。在所选方向上，右端由 $\ln(z/x)+x/z-1$ 控制，而 $\ln t\le t-1$ 将它进一步控制在 $(z-x)^2/(zx)\le 2r^2$ 以内。于是长度为 $rx$ 的那一侧都有 $-Q_{\vartheta}(z)\ge 2r^2$，且 $\sqrt{z}\le2\sqrt{x}$。积分即得下界。 完整证明由 Lean 内核检查。

:::

因此，只要已知窗口预算严格小于 $r^3\sqrt{x}$，就可以排除该内点的深度 $4r^2$。两侧余量决定可用的 $r$。这个局部估计以窗口预算为前提。在上文列出的外库算术输入下，模 $1$ 构造给出任意远的小预算窗口。

::: {.theorem #thm-ch31-prime-fixed-ratio-mass title="偏线零点给出的固定比例窗口质量下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeFixedRatioWindowMass.prime_tail_fixed_ratio_mass_of_zero"}
设 $\rho$ 是非平凡零点，且 $\beta=\operatorname{Re}\rho>1/2$。存在实数 $\kappa>1$、$c>0$ 和 $S$，使每个 $B\ge S$、$A\ge2$ 且 $B\ge\kappa A$ 的实窗口都满足

$$
N(A,B)\ge cB^{\beta-1/2}.
$$
:::

::: proof

取 $\rho$ 与其共轭中虚部为正的一项。选实部在 $1/2$ 与 $\beta$ 之间的截线，以紧支撑的概率测度保留这对零点，并消去截线右侧的其余零点。令 $Q$ 为以 $\psi$ 定义的完全余项。在对数坐标 $t=\ln x$ 中，$-Q(e^t)$ 的平移平均以尺度 $e^{(\beta-1)t}$ 的余弦为主项。截线给出的严格指数差使误差最终小于余弦振幅的四分之一。

取一段固定长度的子窗，使余弦至少为 $1/2$。交换对子窗和概率测度的积分后，每个平移后的子窗都落在由滤波支撑加宽后的同一大窗内。每个有符号积分都由大窗中 $-Q(e^t)$ 的正部积分控制。在大窗 $[T,T+W]$ 上，换元 $x=e^t$ 带来至少 $e^{T/2}$ 的权重，且 $Q_\vartheta\le Q$。于是素数尾积分的下界具有尺度 $e^{(\beta-1/2)T}$。取 $T=\ln B-W$ 和 $\kappa=e^W$，子窗就成为 $[B/\kappa,B]$，包含在每个允许的 $[A,B]$ 内。

完整证明由 Lean 内核检查。
:::

比例、系数和阈值都可随给定零点改变。论证适用于任一符合前提的偏线零点，且所给幂指数没有损失。任意预先指定的 $\kappa>1$ 是否可用，需要进一步控制滤波支撑和振荡周期。

::: {.theorem #thm-ch31-prime-prescribed-ratio-mass title="上确界未取到时的预定比例质量下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePrescribedRatioWindowMass.prime_tail_prescribed_ratio_mass_of_unattained"}
记 $\Theta$ 为黎曼 ζ 函数非平凡零点实部的上确界，并设每个非平凡零点的实部都严格小于 $\Theta$。任取实数 $\kappa>1$ 与 $1/2<\sigma<\Theta$。存在常数 $c>0$ 和 $S$，使每对满足 $B\ge S$、$A\ge2$、$\kappa A\le B$ 的实端点都有

$$
N(A,B)\ge cB^{\sigma-1/2}.
$$
:::

::: proof

给定对数宽度 $W=\ln\kappa$，为概率滤波器预留 $W/2$ 的支撑宽度。上确界未取到时，可把任意有限高度范围内的零点留在一条低于 $\Theta$ 的截线左侧，再选择截线右侧的共轭零点对。所留零点的实部 $\beta$ 大于 $\sigma$，虚部足够大，使两个余弦周期与滤波器支撑合在一起仍能放入宽度 $W$。平滑后的余弦在一个固定长度的子区间内压过误差。交换概率平均与子区间积分，把下界传给原始尾项在同一窗口内的负部质量。

经 $x=e^t$ 换元，并使用 $Q_\vartheta\le Q$，区间 $[\ln B-W,\ln B]$ 给出 $[B/\kappa,B]$ 上的下界，幂指数为 $\beta-1/2$。这个子窗包含于每个允许的 $[A,B]$，且对充分大的 $B$，相同常数也适用于较低的幂指数 $\sigma-1/2$。完整证明由 Lean 内核检查。
:::

比例和目标指数先给定，系数和阈值可依赖二者。该陈述的范围是 $\sigma<\Theta$ 且上确界未取到。

::: {.theorem #thm-ch31-prime-unattained-endpoint-mass title="未取到上确界时的端点指数" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeUnattainedEndpointMass.prime_tail_endpoint_mass_tendsto_zero"}
设 $\Theta>1/2$ 是黎曼 ζ 函数非平凡零点实部的上确界，且每个非平凡零点的实部都严格小于 $\Theta$。令 $p=\Theta-1/2$。当实数 $B\to+\infty$ 时，

$$
\frac{N(2,B)}{B^p}\longrightarrow0.
$$
:::

::: proof
以 $x^{1-\Theta}$ 归一化完全尾项。每个零点的贡献在这一尺度上趋于零，而零点系数的绝对和给出统一的支配界，因此可将极限移入级数。平凡零点和常数项在这一尺度上消失。素数幂修正原为 $O(x^{-1/2})$，因 $\Theta>1/2$，归一化后也趋于零。因此 $x^{1-\Theta}Q_\vartheta(x)\to0$。

任给 $\varepsilon>0$，选定一个阈值 $X\ge2$，使 $x\ge X$ 时质量的被积函数至多为 $\varepsilon p x^{p-1}$。于是在 $[X,B]$ 上积分至多为 $\varepsilon(B^p-X^p)$。固定的初段质量 $N(2,X)$ 除以 $B^p$ 后趋于零。这个论证同样适用于 $\Theta=1$。 完整证明由 Lean 内核检查。
:::

质量非负，故对每个 $2\le A\le B$，都有 $0\le N(A,B)\le N(2,B)$。端点极限因而同时控制所有这些窗口。预定比例的下界可取每个严格低于 $\Theta-1/2$ 的正幂，在端点幂上，归一化后的质量趋于零。

::: {.theorem #thm-ch31-prime-attained-short-windows title="上确界取到时的零质量短窗口" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeAttainedShortWindows.prime_tail_positive_short_windows_of_attained_zero"}
设有非平凡零点 $\rho$，其 $\beta=\operatorname{Re}\rho>1/2$，且所有非平凡零点的实部都不超过 $\beta$。存在实数 $\kappa_0>1$、$K\ge1$ 和 $X_0\ge2$，使每个 $X\ge X_0$ 都有 $A\in[X,KX]$，满足

$$
Q_\vartheta(x)>0\quad(A\le x\le\kappa_0 A),
\qquad N(A,\kappa A)=0\quad(1\le\kappa\le\kappa_0).
$$
:::

::: proof
在对数坐标中，紧支撑正滤波器保留一对达到最右实部的共轭零点。平滑信号的正峰迫使未平滑的完全尾项在每个充分晚、某个固定宽度的对数窗口内达到正值，且用 $e^{(1-\beta)t}$ 归一化后，峰高有统一的正下界。

在同一归一化下，实部小于 $\beta$ 的零点项趋于零。零点系数的绝对可和性给出支配界，允许任意接近最右线的低实部零点。最右线上的零点项构成一致连续的函数。素数幂修正的归一化量也趋于零，因为 $\beta>1/2$。因此，足够晚的正峰可延伸为一段固定的右向对数宽度，在整个区间内仍有 $Q_\vartheta>0$。指数换元将找到下一处正峰所需的固定对数距离变成倍数 $K$，并将正号区间的固定宽度变成比例 $\kappa_0$。 完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-prime-mass-no-finite-limit title="最大实部取到时的固定比例质量无有限极限" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeAttainedMassNonconvergence.prime_tail_mass_no_finite_limit_of_attained_zero"}
假设某个非平凡零点 $\rho$ 取到最大实部 $\beta=\operatorname{Re}\rho>1/2$。对任意固定的实数 $\kappa>1$，设

$$
M_\kappa(B)=\frac{N(B/\kappa,B)}{B^{\beta-1/2}}.
$$

当实数 $B\to+\infty$ 时，$M_\kappa(B)$ 没有有限极限。
:::

::: proof
取 $p=\beta-1/2$ 及 $1<\lambda\le\min(\kappa,\kappa_0)$。把同一窗口 $[B/(\lambda\kappa),B]$ 分别在 $B/\lambda$ 和 $B/\kappa$ 处分割，得到

$$
M_\lambda(B)-\kappa^{-p}M_\lambda(B/\kappa)
=M_\kappa(B)-\lambda^{-p}M_\kappa(B/\lambda).
$$

若 $M_\kappa$ 趋于有限值 $L$，则 $0\le M_\lambda\le M_\kappa$ 给出晚期有界性。上式右边趋于 $(1-\lambda^{-p})L$，而 $0<\kappa^{-p}<1$，所以递推迫使 $M_\lambda$ 趋于 $(1-\lambda^{-p})L/(1-\kappa^{-p})$。将候选极限从递推两边扣除。固定迭代次数 $n$ 后，初始误差乘以 $\kappa^{-np}$，其余项由趋于零的误差和收敛的几何级数控制。任意晚的零质量短窗使这个极限为零，从而 $L=0$。

取一个固定整数 $m$，使 $\kappa^m$ 至少达到固定比例幂下界所要求的比例。将 $[B/\kappa^m,B]$ 划分为 $m$ 个比例为 $\kappa$ 的相邻窗口。归一化总质量是 $m$ 项带有固定权重的 $M_\kappa$ 之和，因此也趋于零。这与该较大窗口在同一指数 $p$ 下的正下界矛盾。 完整证明由 Lean 内核检查。
:::

Bingham 和 Gashi 在离散对数移动平均中也使用几何展开，将延迟平均与累积平均相联。[Bingham–Gashi，式（2.3）–（2.4）](https://arxiv.org/abs/1408.1301)

::: {.theorem #thm-positive-average-prime-window title="正平均序列给出每个充分晚的窗口下界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.eventual_prime_window_lower_of_log_frequency"}
沿用完全曼戈尔特余项 $U$ 和素数负部质量 $N$，对实数 $v$ 记 $H(v)=\int_{v-\ln 2}^v U(e^t)\,dt$。给定实序列 $u_n\to+\infty$，满足 $u_{n+1}/u_n\to1$，并且对某些 $c>0$、$\beta>1/2$ 和 $M\in\mathbb R$，充分大的 $n$ 都满足 $H(u_n)\ge c e^{\beta u_n}/u_n^M$。那么对每个 $\varepsilon>0$，充分大的 $Y$ 都有

$$
N(Y,Y^{3/2})\ge Y^{(3/2)(\beta-1/2)-\varepsilon}.
$$
:::

::: proof
写 $y=\ln Y$。固定 $1<k<3/2$，在足够大的指标后取首个满足 $u_n\ge ky$ 的指标。前一项小于 $ky$，相邻项比例最终小于 $3/(2k)$，所以 $ky\le u_n\le3y/2$。当 $(k-1)y\ge\ln 2$ 时，$[e^{u_n}/2,e^{u_n}]$ 全部落在 $[Y,Y^{3/2}]$ 内。用 $U(x)=-xQ(x)$ 换元后，$H(u_n)=-\int_{e^{u_n}/2}^{e^{u_n}}Q(x)\,dx$。素数幂修正给出 $Q_\vartheta\le Q$，而短区间上 $\sqrt x\le e^{u_n/2}$，因此 $H(u_n)\le e^{u_n/2}N(Y,Y^{3/2})$。取 $k$ 充分接近 $3/2$，留出任意小的指数损失来吸收 $c$ 和 $u_n^M$。 完整证明由 Lean 内核检查。
:::

**从 ζ 零点取得正平均。** 把 $U$ 在 $0<x<1$ 上置零，所得函数记为 $U_0$。令 $H_*(x)=\int_1^2 U_0(x/v)\,dv/v$，则 $x>2$ 时 $H_*(x)=H(\ln x)$。在 $\operatorname{Re}(s)>1$ 上交换两个绝对收敛的积分，得到 $H_*$ 的 Mellin 变换 $k(s)\Phi_*(s)$，其中 $\Phi_*$ 是在 $1$ 处补值的完全曼戈尔特变换，$k(s)=(1-2^{-s})/s$。$H_*$ 在对数坐标中局部 Lipschitz，在 $x<1$ 时为零，并满足 $O(x\ln^2 x)$ 界。由于 $|2^{-\rho}|=2^{-\operatorname{Re}(\rho)}<1$，这个平均保留所有非平凡零点处的极点。每个极点的实部都至多是 $H_*$ 的增长横坐标，否则原 Mellin 积分会在该点全纯。

在 $\operatorname{Re}(s)>-3/4$ 上使用亚纯延拓，取弱有界性条件中的左端 $\sigma_0=-1/2$。这样所有非平凡零点都计入单位高度区间的重数和，Riemann–von Mangoldt 公式将该和控制在 $O(\ln t)$。局部的 $\zeta'/\zeta$ 公式给出零点倒距离和与 $O(\ln t)$ 余项。对 $\operatorname{Re}(s)\le2$，每个倒距离可用 $\exp(\sum_{|\operatorname{Im}\rho-t|\le1} m_\rho|\ln|s-\rho||)$ 控制，右侧半平面则用绝对收敛的 Dirichlet 级数。在余下的有界高度范围，减去有限个极点的主部，再用紧性控制全纯余项。乘上 $k(s)$ 和 $1/[s(s-1)]$ 后仍满足振荡定理所需的竖向界。从 $-1/4$ 起绕实轴奇点的围道只需计入 $0$ 处的简单极点，所得主项是常数。[Srinivas，引理 3 和 4](https://www.impan.pl/shop/en/publication/transaction/download/product/83372?download.pdf)

给定实部为 $\beta>1/2$ 的非平凡零点，Radziejewski 的定理给出交替振荡，幅度下界为常数乘 $x^\beta/(\ln x)^M$。有界主项可被吸收，偶数子序列给出正平均，两个相邻对数比的乘积仍趋于 $1$。因此由 [@thm-positive-average-prime-window] 得到同一窗口下界。这一步使用文献中的振荡定理，Lean 定理的范围是从正平均序列到窗口质量。小预算上界另由 [@thm-ch31-prime-window-rh] 的正向给出。取外部证明的 RH，对每个固定的 $b>1$ 和 $\eta>0$，所有充分大的 $Y$ 都满足 $A_{\vartheta,b}(Y)\le Y^\eta$。[Radziejewski，定理 3.2，DOI 10.4064/aa163-2-7](https://www.impan.pl/shop/en/publication/transaction/download/product/82009?download.pdf#page=8)

::: {.theorem #thm-ch31-prime-attained-critical-width title="归一化负部质量的临界宽度" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeAttainedCriticalWidth.prime_tail_zero_liminf_iff_le_critical_width"}
设某个非平凡零点取到最大实部 $\beta>1/2$，令 $p=\beta-1/2$。对每个固定对数宽度 $W\ge0$，定义

$$
a(W)=\liminf_{B\to+\infty}\frac{N(Be^{-W},B)}{B^p}.
$$
存在唯一的实数 $W_*>0$，使得对每个 $W\ge0$，$a(W)=0$ 当且仅当 $W\le W_*$。
:::

::: proof
增大 $W$ 只会向左扩展积分区间，因此 $a$ 非负且非减。积分显式公式用最右线零点级数实部的相反数逼近归一化后的完整尾项。级数的绝对值受系数绝对值之和控制，归一化后的素数幂修正趋于零，因此充分远处有 $|x^{1-\beta}Q_\vartheta(x)|\le C$，质量密度至多为 $Cx^{p-1}$。将宽度从 $U$ 增至 $W$，归一化后只增加区间 $[Be^{-W},Be^{-U}]$ 的质量，其上界为 $(C/p)(e^{-pU}-e^{-pW})$。对右端点取下极限得到连续性。

反复出现的零质量短窗使零点集包含一段正宽度。较宽的窗口具有精确幂次的统一正下界，因此零点集有界。连续性使零点集包含自己的上确界。完整证明由 Lean 内核检查。
:::

在该定理的假设下，宽度恰为 $W_*$ 时，任意晚都有归一化质量任意小的窗口。超过 $W_*$ 后，每个足够晚的窗口都有严格正下界，该下界可依赖宽度。黎曼 ζ 函数的所有非平凡零点都在临界线上，因而这里定义 $W_*$ 所需的假设（有零点达到最大实部 $\beta>1/2$）对它不成立。

::: {.theorem #thm-ch31-prime-phase-cluster title="固定宽度窗口的全部簇值" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePhaseCluster.prime_tail_mass_cluster_iff_of_upper_bound"}
设 $\beta>1/2$ 是所有黎曼 ζ 函数非平凡零点实部的上界，令 $p=\beta-1/2$。对固定实数 $W\ge0$，记 $M_W(B)=N(Be^{-W},B)/B^p$。将非平凡零点按重数列为 $\rho_k$，记 $\gamma_k=\operatorname{Im}\rho_k$。设 $a_k=1/[\rho_k(1-\rho_k)]$ 当 $\operatorname{Re}\rho_k=\beta$，其余 $a_k=0$。在单位圆的乘积空间中，记 $H$ 为相位轨道 $\phi(t)=(e^{i\gamma_k t})_k$（$t\in\mathbb R$）的闭包。对 $h\in H$，定义

$$
F_h(u)=-\operatorname{Re}\sum_k a_k h_k e^{i\gamma_k u},
\qquad I_W(h)=\int_0^W e^{-ps}\max\{-F_h(-s),0\}\,ds.
$$

实数 $y$ 是 $B\to+\infty$ 时 $M_W(B)$ 的簇值，当且仅当存在 $h\in H$ 使 $y=I_W(h)$。
:::

::: proof
令 $B=e^t$，以 $x=e^{t-s}$ 换元。归一化质量成为对 $0\le s\le W$ 的加权积分，负部的输入是 $e^{(1-\beta)(t-s)}Q_\vartheta(e^{t-s})$。积分显式公式与素数幂修正给出该输入与 $F_{\phi(t)}(-s)$ 之差趋于零。由于 $t-s\ge t-W$，误差在全窗上一致趋于零。取负部至多保留原误差，积分之后仍趋于零。

相位乘积空间是紧空间。整数时刻的相位任意晚都能回到单位元的任意邻域，平移这个回归就能在任意晚的时刻逼近每一个轨道点。再取闭包，得到 $H$ 内每一点都可由晚期相位逼近。系数绝对可和使 $I_W$ 连续，所以它在 $H$ 上的像闭合。结合全窗误差，簇集恰为 $I_W(H)$。完整证明由 Lean 内核检查。
:::

簇值的集合是一个紧区间，因为实相位轨道的闭包连通，窗口泛函连续。若没有零点实部等于 $\beta$，或 $W=0$，该区间退化为 $\{0\}$。当某个非平凡零点取到最大实部 $\beta>1/2$ 且 $W>0$ 时，这个区间的左端点等于临界宽度定理中的下极限。零属于簇集只要求任意晚的窗口质量可在归一化下逼近零。

**零质量窗口与中间零点。** 设 $\beta>1/2$ 是所有非平凡零点实部的上界，记 $p=\beta-1/2$，并令 $C=2+\gamma_{\mathrm E}-\ln(4\pi)$，其中 $\gamma_{\mathrm E}$ 是欧拉常数。用上文按重数列出的 $\rho_k$ 定义

$$
G_\beta(u)=
\sum_{1/2<\operatorname{Re}\rho_k<\beta}
\frac{\exp((\operatorname{Re}\rho_k-1/2)u)}{|\rho_k(1-\rho_k)|}.
$$

::: {.theorem #thm-ch31-prime-critical-residual title="晚期零质量窗口的三种情形" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalResidual.prime_tail_mass_pos_or_intermediate_or_wider_zero_cluster"}
记 $G_\beta$ 如上。 任取 $0<d<2-C$。存在实数 $T$，对每个上述上界 $\beta$，每个 $W>0$、$t-W\ge T$ 的窗口至少满足以下一项。

- $N(e^{t-W},e^t)>0$。
- 存在 $u\in[t-W,t]$ 使 $G_\beta(u)\ge d$。
- 存在 $W'>W$，使零是 $N(Be^{-W'},B)/B^p$ 在实数 $B\to+\infty$ 时的簇值。
:::

[平方根尺度的余项界](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalResidual.eventually_prime_tail_root_scale)。

在平方根尺度上，从完整尾项减去素数幂的修正趋于 $2$。临界线上的系数为正实数，它们的总和至多为第一 Li 系数 $C$。临界线左侧的零点项由可和的系数模支配，且每项随 $u\to+\infty$ 衰减，故其总和趋于零。$G_\beta$ 控制其余低于上界线的零点。对充分大的 $u$，从上界线的贡献减去 $d$ 并加上 $G_\beta(u)$，仍得到 $e^{u/2}Q_\vartheta(e^u)$ 的上界。若窗口质量为零且整窗都有 $G_\beta<d$，连续性给出 $Q_\vartheta\ge0$，上界线的相位曲线因而在整窗上严格为正。它在左端点连续，可以向左延伸一点。延伸后的相位曲线在更宽的窗口上给出零负部质量，固定宽度簇集公式随即给出相应的零簇值。中间谱和 $G_\beta(u)$ 随 $u$ 单调不减。因此，若右端点满足 $G_\beta(t)\le d<2-C$，可选 $d<d'<2-C$，用 $d'$ 的阈值保证整窗的严格余量。

若某个非平凡零点取到最大实部 $\beta>1/2$，且实部小于 $\beta$ 的非平凡零点都满足 $\operatorname{Re}\rho\le1/2$，则 $G_\beta=0$。第一 Li 系数满足 $C<1/3$，故可取 $d=1$。现在令 $W=W_*$。更宽窗口的下极限严格为正，排除了第三项，所以每个充分晚的临界宽度窗口都有严格正的质量。任何同一右端点、更宽且左端点至少为 $2$ 的窗口都包含这个临界窗口，因而质量也严格为正。临界宽度的归一化质量仍可任意接近零。若存在实部严格介于 $1/2$ 和 $\beta$ 的零点，临界宽度下精确零质量窗口是否反复出现仍待确定。

::: {.theorem #thm-ch31-growing-prime-tail-clusters title="增长对数宽度的全部簇值" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthCluster.prime_tail_growing_width_cluster_iff_of_upper_bound"}
设 $β>1/2$ 是所有非平凡零点实部的上界。仍取 $p=\beta-1/2>0$ 和同一轨道闭包 $H$。设实数左端点 $A(B)$ 对所有充分大的 $B$ 满足 $2\le A(B)\le B$，且 $\ln(B/A(B))\to+\infty$。$N(A(B),B)/B^p$ 的簇集为
$$
\left\{I_\infty(h):h\in H\right\},\qquad
I_\infty(h)=\int_0^\infty e^{-ps}\max(-F_h(-s),0)\,ds .
$$
其中包括 $A(B)=2$，也允许 $A(B)$ 随 $B$ 非连续或非单调地变化。
:::

固定 $L\ge0$。当 $B$ 充分大，窗口包含 $[Be^{-L},B]$。存在充分大的 $X\ge2$，使负部密度在 $[X,\infty)$ 上由 $Cx^{p-1}$ 控制。在 $\max(A(B),X)$ 处分开 $Be^{-L}$ 左侧的部分，归一化后的贡献至多为 $N(2,X)/B^p+(C/p)e^{-pL}$。相位积分在 $L$ 之后的尾部至多为 $(S/p)e^{-pL}$，其中 $S=\sum_k |1/(\rho_k(1-\rho_k))|$。前一个估计对允许的左端点一致成立，后一个对相位一致成立。先选 $L$，再令 $B$ 增长，便得到由 $\ln B$ 处实际相位给出的近似，与固定宽度情形相同。有限宽度相位积分的一致收敛给出 $I_\infty$ 的连续性。轨道闭包紧且连通，故簇集是紧区间。当实部为 $\beta$ 的直线没有零点时，相位积分恒为零，归一化质量趋于零。

::: {.theorem #thm-ch31-growing-prime-tail-error title="同一右端点下的统一误差界" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthCluster.prime_tail_window_extent_bound_of_upper_bound"}
仍设 $\beta>1/2$ 是所有非平凡零点实部的上界。存在依赖于 $\beta$ 的 $K\ge0$，使对每个 $\varepsilon>0$，当 $B$ 充分大时，所有 $a\in[2,B]$ 都满足
$$
\left|\frac{N(a,B)}{B^p}-I_\infty(\phi(\ln B))\right|
\le \varepsilon+K(a/B)^p .
$$
有符号误差 $N(a,B)/B^p-I_\infty(\phi(\ln B))$ 也至多为 $\varepsilon$。
:::

先与从 $2$ 开始的累积质量比较。移去 $[2,a]$ 时，质量减少 $N(2,a)$。沿用早期区间的固定积分与后期的幂函数界，可得 $N(2,a)\le Ka^p$。因此幂函数项控制移动左端点损失的质量，$\varepsilon$ 来自累积质量的相位近似。省略质量的误差随对数宽度指数衰减。移去的质量非负，所以有符号误差的上界没有幂函数项。

**两条谱线在临界窗口的共同触点。** 设某个非平凡零点取到最大实部 $\beta>1/2$，并设 $1/2<\gamma<\beta$，使所有实部小于 $\beta$ 的非平凡零点的实部都至多为 $\gamma$。用 $F_{\alpha,h}(u)$ 表示把上文相位级数的系数限制到实部为 $\alpha$ 的直线后得到的曲线。两条曲线都使用同一个 $h\in H$。先从完整零点级数中精确扣除 $\beta$ 线，再在 $\gamma$ 尺度归一化，得到
$$
e^{(1-\gamma)u}Q_\vartheta(e^u)=
e^{(\beta-\gamma)u}F_{\beta,\phi(u)}(0)
 +F_{\gamma,\phi(u)}(0)+o(1).
$$
余项在每个固定宽度的晚期窗口上一致趋于零。 [两条谱线的归一化展开](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalTwoLines.prime_tail_two_line_approx)。扣除后，实部低于 $\gamma$ 的每个项趋于零，系数模的可和性控制它们的总和。平方根尺度的素数幂修正在 $\gamma$ 尺度趋于零。

临界宽度 $W_*$ 的触点是 $h\in H$ 与 $s\in[0,W_*]$，满足 $F_{\beta,h}(-s)=0$，且 $F_{\beta,h}(-v)\ge0$ 对每个 $v\in[0,W_*]$ 成立。若每个这样的触点都满足 $F_{\gamma,h}(-s)<0$，则存在 $c>0$，使对每个充分大的 $t$，区间 $[t-W_*,t]$ 中都有某个 $u$ 满足 $e^{(1-\gamma)u}Q_\vartheta(e^u)\le-c$。连续性随即给出实际窗口负部质量严格为正。

这个判据允许只检查一部分触点。设 $K$ 是 $H\times[0,W_*]$ 中的紧集，每个 $(h,s)\in K$ 的 $s$ 都是最高谱线在该窗口的最低点，且每个 $h\in H$ 至少对应 $K$ 中一个最低点。只需在 $K$ 中满足 $F_{\beta,h}(-s)=0$ 的点检查 $F_{\gamma,h}(-s)<0$。取 $K$ 为全体最低点组成的紧集，就得到上面的判据。 [临界窗口的共同触点判据](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalTwoLines.prime_tail_negative_windows_of_two_line_contact)。

每个相位下，最高谱线在窗口内的最小值至多为零。否则，左端的严格正性允许把窗口拓宽，产生与临界宽度定理冲突的零簇值。在 $K$ 上，$F_\beta$ 或 $F_\gamma$ 至少一个严格为负，所以二者较小值的最大值严格为负。当最高谱线有这份负余量时，增长因子压过次高谱线的有界贡献。当次高谱线给出负余量时，最高谱线仍非正。于是同一相位的同一个窗口内存在所需的负点。若精确零质量的临界窗口任意晚地出现，则至少有一个共同触点满足 $F_\gamma\ge0$。两条谱线的实部条件及共同触点的符号条件在这里仍是前提。


::: {.theorem #thm-ch31-prime-window-spectral-error title="谱隙下的统一窗口误差" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthRate.prime_tail_window_error_of_lower_spectral_bound"}
设 $\beta>1/2$ 是非平凡零点实部的上界，并设 $1/2\le\gamma<\beta$，使所有实部小于 $\beta$ 的零点都满足 $\operatorname{Re}\rho\le\gamma$。仍取 $p=\beta-1/2$，并记
$$
E(a,B)=\frac{N(a,B)}{B^p}-I_\infty(\phi(\ln B)).
$$
存在 $K>0$，对所有 $2\le a\le B$ 有
$$
|E(a,B)|\le K\left[(a/B)^p+
\begin{cases}
\dfrac{B^{\gamma-1/2}-a^{\gamma-1/2}}{B^p},&\gamma>1/2,\\
B^{-p}\ln(B/a),&\gamma=1/2.
\end{cases}\right]
$$
:::

::: proof
扣除 $\beta$ 线后，零点项的绝对可和性把负部积分的误差密度控制为常数倍的 $x^{\gamma-3/2}$。取负部的映射是 $1$-Lipschitz，平方根尺度的素数幂修正也可由同一个幂函数控制。在 $[a,B]$ 上积分时保留两个端点。$\gamma>1/2$ 给出幂差，$\gamma=1/2$ 给出对数。两个谱误差项都在 $a=B$ 时为零。无限相位积分在 $\ln(B/a)$ 之后的尾部给出 $(a/B)^p$ 项。 完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-prime-window-cumulative-log-error title="临界谱隙下累积误差的对数阶" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthRate.prime_tail_cumulative_error_log_order"}
若某个非平凡零点取到最大实部 $\beta>1/2$，且所有实部更小的零点都在临界线或其左侧，则存在 $c,C>0$，对所有充分大的 $B$ 有
$$
c\ln B\le N(2,B)-B^p I_\infty(\phi(\ln B))\le C\ln B .
$$
:::

::: proof
平方根尺度上的有符号余项最终有严格负的上界。因而当最高谱线的曲线为非正时，实际负部比相位模型至少多出一个固定的平方根尺度余量。取任意固定宽度 $W>W_*$，该宽度的相位负部质量在紧相位闭包上有严格正的最小值。曲线有界，因此每个长度为 $W$ 的对数窗口都贡献一份统一为正的误差。拼接相邻窗口便得到下界，初始有限区间与无限相位尾部只改变一个有界项。对数阶成立于上述谱隙条件，精确的对数系数仍待确定。 完整证明由 Lean 内核检查。
:::

- **经典的 von Mangoldt–Weil 点态中点显式公式（`文献结果，未在本书形式化`：von Mangoldt, 1895；Weil, 1952）**：记切比雪夫素数幂阶梯函数为 $\psi(x) := \sum_{n \le x}\Lambda(n) = \sum_{p^m \le x}\ln p = \ln\operatorname{lcm}(1, 2, \dots, \lfloor x\rfloor)$，并在整数跃迁点处取左右极限算术平均定义吉布斯（Gibbs）中点阶梯 $\psi_0(x) := \frac{1}{2}\bigl(\psi(x^+) + \psi(x^-)\bigr) = \psi(x) - \frac{1}{2}\Lambda(x)$（当 $x \in \mathbb{N}_{\ge 2}$ 为素数幂 $p^m$ 时减去半阶跃 $\frac{1}{2}\ln p$，为无素数幂合数时 $\Lambda(x) = 0$ 故 $\psi_0(x) = \psi(x)$），则对一切 $x > 1$，对称截断极限给出：

  $$
  \psi_0(x) \;=\; x \;-\; \lim_{T \to \infty}\sum_{\lvert\operatorname{Im}\rho\rvert < T} \frac{x^{\rho}}{\rho} \;-\; \ln(2\pi) \;-\; \frac{1}{2}\ln\bigl(1 - x^{-2}\bigr) \qquad (x > 1).
  $$

在已知严格位于临界线 $\operatorname{Re}(\rho) = \frac{1}{2}$ 上的前 $K$ 对共轭真实零点 $\rho_{\pm k} = \frac{1}{2} \pm i\gamma_k$（$1 \le k \le K$）处做有限谱重构时，右端零点和显式化为 $K$ 列对数空间驻波谐波的实部叠加（`手工推导`）：

$$
\begin{aligned}
\psi_{0, K}(x)
&\;:=\; x \;-\; 2\sum_{k=1}^{K} \operatorname{Re}\!\left(\frac{x^{\frac{1}{2} + i\gamma_k}}{\frac{1}{2} + i\gamma_k}\right) \;-\; \ln(2\pi) \;-\; \frac{1}{2}\ln\bigl(1 - x^{-2}\bigr) \\
&\;=\; x \;-\; 2x^{1/2}\sum_{k=1}^{K} \frac{\frac{1}{2}\cos(\gamma_k\ln x) + \gamma_k\sin(\gamma_k\ln x)}{\frac{1}{4} + \gamma_k^2} \;-\; \ln(2\pi) \;-\; \frac{1}{2}\ln\bigl(1 - x^{-2}\bigr).
\end{aligned}
$$

请细细品味这组公式背后的双向雕刻奇观：单独拎出任何一对零点 $\frac{1}{2} \pm i\gamma_k$，它在整个正半轴上只不过是一列处处光滑起伏的半密度对数余弦—正弦波，哪有一丝一毫“离散整数或素数判别”的棱角？然而当你把 $K = 5$、$K = 20$、$K = 50$ 乃至成千上万对零点的驻波叠加起来时，它们在 $x = 6, 10, 12, \dots$ 等普通合数区间内波峰对波谷正负抵消、抹出平坦台阶，唯独在素数与素数幂位置 $x = 2, 3, 4 = 2^2, 5, 7, 8 = 2^3, 9 = 3^2, 11, 13, \dots$ 上同相锁死，刀削斧劈般拉起垂直跃升的素数幂阶梯！

::: {.example #ex-ch34-weil-prime-staircase-reconstruction title="零点驻波雕刻素数阶梯：切比雪夫函数 $\psi(x)$、中点目标值 $\psi_0(x)$ 与 $K = 5, 20, 50$ 对零点谱重构精确算例"}
在 100 位工作精度下对整数刻度 $x \in \{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13\}$ 逐点计算精确阶梯值 $\psi(x) = \ln\operatorname{lcm}(1, \dots, x)$、中点显式公式目标值 $\psi_0(x) = \psi(x) - \frac{1}{2}\Lambda(x)$，以及分别叠加前 $K = 5$、$K = 20$ 与 $K = 50$ 对临界线共轭零点 $\frac{1}{2} \pm i\gamma_k$ 所得的驻波重构值 $\psi_{0, K}(x)$，四舍五入至小数点后六位对照如下（`手工推导` / `NUM`）：

| 刻度 $x$ | 精确符号值 $\psi(x)$ | 阶梯全值 $\psi(x)$ | 中点真值 $\psi_0(x)$ | $K = 5$ 重构 $\psi_{0,5}(x)$ | $K = 20$ 重构 $\psi_{0,20}(x)$ | $K = 50$ 重构 $\psi_{0,50}(x)$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$2$** | $\ln 2$ | $0.693147$ | $0.346574$ | $0.370087$ | $0.331858$ | $0.359332$ |
| **$3$** | $\ln 6$ | $1.791759$ | $1.242453$ | $1.240233$ | $1.207704$ | $1.236060$ |
| **$4$** | $\ln 12$ | $2.484907$ | $2.138333$ | $2.172732$ | $2.162383$ | $2.162495$ |
| **$5$** | $\ln 60$ | $4.094345$ | $3.289626$ | $3.264668$ | $3.326996$ | $3.289860$ |
| **$6$** | $\ln 60$ | $4.094345$ | $4.094345$ | $4.006066$ | $4.113273$ | $4.062410$ |
| **$7$** | $\ln 420$ | $6.040255$ | $5.067300$ | $4.923719$ | $5.044654$ | $5.071181$ |
| **$8$** | $\ln 840$ | $6.733402$ | $6.386828$ | $6.396516$ | $6.435392$ | $6.345021$ |
| **$9$** | $\ln 2520$ | $7.832014$ | $7.282708$ | $7.493937$ | $7.209355$ | $7.256965$ |
| **$10$** | $\ln 2520$ | $7.832014$ | $7.832014$ | $7.571751$ | $7.904979$ | $7.880802$ |
| **$11$** | $\ln 27720$ | $10.229909$ | $9.030962$ | $9.147872$ | $9.111861$ | $9.065247$ |
| **$13$** | $\ln 360360$ | $12.794859$ | $11.512384$ | $11.381487$ | $11.466362$ | $11.500926$ |

表中三组特征现象把显式公式的傅里叶几何刻画得一目了然：

1. **跃迁中点锁相**：在素数（$x = 2, 3, 5, 7, 11, 13$）与高次素数幂（$x = 4 = 2^2,\; 8 = 2^3,\; 9 = 3^2$）处，零点谐波和并非收敛向台阶上沿 $\psi(x)$，而是按傅里叶级数狄利克雷中点收敛律精准穿过跳变中点 $\psi_0(x) = \psi(x) - \frac{1}{2}\ln p$——例如在 $x = 5$ 处，仅用 $K = 50$ 对零点就给出 $\psi_{0,50}(5) \approx 3.289860$，距精确中点 $\psi_0(5) = \ln 60 - \frac{1}{2}\ln 5 \approx 3.289626$ 误差仅 $2.35\times 10^{-4}$；在 $x = 7$ 与 $x = 13$ 处误差亦分别收敛至 $3.88\times 10^{-3}$ 与 $1.15\times 10^{-2}$！
2. **非素数幂合数平台消平**：在 $x = 6 = 2\times 3$ 与 $x = 10 = 2\times 5$ 处，冯·芒戈尔特权重 $\Lambda(6) = \Lambda(10) = 0$（因为跨越两根互异素数轴的复合路径不贡献单轴对数新跃迁），故 $\psi(x) = \psi_0(x)$，光滑零点波在此自动异相抵消，压平出 $\ln 60 \approx 4.094345$ 与 $\ln 2520 \approx 7.832014$ 两段水平平台。
3. **素数阶梯与零点驻波的双向互生**：素数极小圆弧体的无穷复合路径积分凝结出了零点谱，而零点谱驻波反向叠加又将全体素数与素数幂从连续实轴中分毫不差地雕刻出来！
:::
