# M.3 Mangoldt 临界差额与特征窗口 {#sec-ch34-s28-s03-s03-mangoldt-and-characters}

::: {.theorem #thm-ch31-prime-window-rh title="素数尾的小窗口与黎曼猜想" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.rh_iff_frequently_small_prime_windows"}
固定实数 $b>1$。黎曼猜想成立，当且仅当对每个 $\eta>0$ 和每个实数 $R\ge2$，都存在实数 $Y\ge R$ 使 $A_{\vartheta,b}(Y)\le Y^\eta$。
:::

::: proof
在 RH 下，$|U(x)|/\sqrt{x}$ 对充分大的 $x$ 有界。将这个界与素数幂修正在 $[Y,Y^b]$ 上积分，得到 $A_{\vartheta,b}(Y)\le C_b\ln Y$，故每个充分大的 $Y$ 都满足所需的幂次上界。

反过来，设 $\zeta(\rho)=0$，$\beta=\operatorname{Re}\rho>1/2$。对每个 $\varepsilon>0$，所有充分大的 $Y$ 都满足 $A_{\vartheta,b}(Y)\ge Y^{b(\beta-1/2)-\varepsilon}$。固定 $1<h<b$ 及小量 $0<\delta<\beta-1/2$，再选 $\sigma$ 足够大，使两侧 Gamma 尾的衰减率均为正。半径相同的两个圆盘把极点贡献与误差分开。复中心 $p$ 到所隔离极点的距离 $d<\sigma-\beta+\delta$，其中 $\sigma=\operatorname{Re}p$。这个极点可以对应另一个零点。实中心的无零点圆盘给出 Cauchy 误差界。取导数阶数 $k=\lfloor\sigma h\ln Y\rfloor$，Gamma 核的峰便在 $h\ln Y$ 附近。用 $d^k$ 归一化后，窗外贡献为 $O((d/\sigma)^k)$，随 $k$ 增大而消失。窗内留下的增长率满足 $h\sigma\ln((\sigma-1/2)/d)>h(\beta-1/2-\delta)$。取 $h$ 足够接近 $b$、$\delta$ 足够小，指数损失便小于 $\varepsilon$。[偏线零点迫使窗口积分增长](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.off_line_zero_forces_window_mass)

取 $\varepsilon=\eta=b(\beta-1/2)/3$，下界就成为 $Y^{2\eta}$，与任意远处仍有 $A_{\vartheta,b}(Y)\le Y^\eta$ 矛盾。因此临界线右侧无零点，再用非平凡零点关于临界线的对称性即得 RH。完整证明由 Lean 内核检查。
:::

对完整 Mangoldt 余项 $U(x)=-xQ(x)$，也可以直接限制每个实点上的函数值。下列两个判据都只要求上界。窗口指数 $b>1$ 固定后，窗口的对数长度为 $(b-1)\ln Y$，随起点 $Y$ 增长。

::: {.theorem #thm-ch31-mangoldt-pointwise-power-window title="完整 Mangoldt 余项的逐点幂窗判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtPointwiseWindows.rh_iff_pointwise_power_windows"}
固定实数 $b>1$。黎曼假设成立，当且仅当对每个 $\kappa>0$、每个实数起点下界 $R$，都存在 $Y\ge\max\{R,2\}$，使得同一个闭区间 $[Y,Y^b]$ 内的每个实数 $x$ 都满足

$$
U(x)\le x^{1/2+\kappa}.
$$
:::

::: proof
在 RH 下，前述绝对包络对所有充分大的 $x$ 给出 $|U(x)|\le\sqrt{x}$，故可对每个 $\kappa>0$ 取任意充分晚的窗口。

反过来，给定素数尾项的质量损失 $\eta>0$，取 $\kappa=\eta/(2b)$。素数幂修正满足 $\sqrt{x}(Q(x)-Q_\vartheta(x))\to2$，所以充分晚的窗口内该修正至多为 $3$。把 $U(x)/\sqrt{x}=-\sqrt{x}Q(x)$ 代入逐点上界，同时取正部，得到 $\max\{-\sqrt{x}Q_\vartheta(x),0\}\le x^\kappa+3$。除以 $x$ 后在窗上积分，便有

$$
A_{\vartheta,b}(Y)\le4Y^{b\kappa}(b-1)\ln Y\le Y^\eta
$$

对所有充分晚且满足逐点上界的窗口成立。这样的 $Y$ 任意大，故 [@thm-ch31-prime-window-rh] 给出 RH。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-mangoldt-pointwise-sqrt-window title="固定平方根系数的完整 Mangoldt 窗口判据" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtPointwiseWindows.rh_iff_pointwise_sqrt_windows"}
记第一 Li 质量为 $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$，其中 $\gamma_{\mathrm{EM}}$ 为欧拉常数。固定实数 $b>1$ 与 $C>M$。黎曼假设成立，当且仅当对每个实数 $R$，都存在 $Y\ge\max\{R,2\}$，使得对每个 $x\in[Y,Y^b]$ 都有

$$
U(x)\le C\sqrt{x}.
$$
:::

::: proof
在 RH 下，对归一化余项 $U(x)/\sqrt{x}$ 的绝对包络取正损失 $C-M$，即得充分大 $x$ 处的上界 $C\sqrt{x}$。反过来，对任意 $\kappa>0$，起点取得足够大时，整个窗口上都有 $C\le x^\kappa$。同一窗口因此满足逐点幂界，由 [@thm-ch31-mangoldt-pointwise-power-window] 得到 RH。完整证明由 Lean 内核检查。
:::

临界系数 $C=M$ 涉及原始余项与曲线 $M\sqrt{x}$ 的**可加差额**。将其除以 $\sqrt{x}$ 会掩去固定尺度的节省。

::: {.theorem #thm-ch31-mangoldt-critical-gap title="临界包络下的可加差额趋于正无穷" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtCriticalGap.rh_iff_critical_gap_tendsto_atTop"}
令 $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$。黎曼假设成立，当且仅当沿实数 $x\to+\infty$ 有

$$
M\sqrt{x}-U(x)\longrightarrow+\infty.
$$

换言之，对每个固定实数 $D$，存在 $X$，使所有实数 $x\ge X$ 都满足 $U(x)\le M\sqrt{x}-D$。
:::

::: proof
令 $y=\ln x$。在 RH 下，归一化零点和的实部可写成 $F(y)=\sum_k a_k\cos(\gamma_k y)$，其中 $a_k\ge0$ 且 $\sum_k a_k=M$。记 $d(y)=M-F(y)$。利用 $(1-\cos(\gamma_k y))(1+\cos(\gamma_k h))\ge0$ 并逐项求和，得到

$$
2d(h)-4d(y)\le2F(y)-F(y+h)-F(y-h).
$$

在原点右侧，显式公式给出 $d(h)/h\to+\infty$。在远端取 $h=e^{-y/2}$。各个 Mangoldt 斜坡的带权中点不等式与归一化余项的显式公式误差一起，将右端从上方控制为 $O(h)$。除以 $h$，得到 $d(y)/h\to+\infty$。由于 $|e^{-y/2}U(e^y)-F(y)|=O(e^{-y/2})$，换回 $x=e^y$ 后，可加差额与 $d(y)/h$ 只差一个有界量。

反过来，差额趋于正无穷蕴含 $U(x)\le M\sqrt{x}$ 在整个尾部成立。对任意 $\kappa>0$，充分大时 $M\le x^\kappa$，从而满足 [@thm-ch31-mangoldt-pointwise-power-window] 的逐点幂窗条件。完整证明由 Lean 内核检查。
:::

**手工推导。** 固定 $b>1$。对每个实数 $R$ 都存在 $Y\ge\max\{R,2\}$，使同一个 $[Y,Y^b]$ 上每一点都满足 $U(x)\le M\sqrt{x}$，这一条件等价于 RH。在 RH 下取上一定理中的 $D=0$，每个充分晚的窗口都成立。反向只假设任意晚存在这样的窗口。给定 $\kappa>0$，把起点下界提到 $x^\kappa\ge M$ 的阈值以上，再取这样一个窗口，应用 [@thm-ch31-mangoldt-pointwise-power-window] 即可。

::: {.theorem #thm-ch31-mangoldt-log-squared-gap title="临界 Mangoldt 包络下的对数平方差额" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtLogSquareGap.rh_iff_eventually_log_squared_gap"}
令 $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$，即第一 Li 质量（`firstLiMass`）。经典黎曼假设成立，当且仅当对每个实数 $c<1/64$，存在实数 $X_c>1$，使每个实数 $x\ge X_c$ 都满足

$$
U(x)\le M\sqrt{x}-c(\ln x)^2.
$$
:::

::: proof
令 $y=\ln x$、$q=e^{-y/2}$、$G(y)=qU(e^y)$。沿用上文的谱亏量 $d(t)=M-F(t)$。它在原点右侧满足 $d(t)\sim \tfrac12 t\ln(1/t)$。在 RH 下，把谱的二阶差分与 Mangoldt 斜坡的中点上界比较。这次取步长 $h=yq/4$。把两边除以 $y^2q$ 后，原点项 $2d(h)/(y^2q)$ 趋于 $1/8$，因为 $\ln(1/h)/y\to1/2$。算术中点项 $q^{-1}h\,2\sinh(h/2)/(y^2q)$ 趋于 $1/16$。由 $G(y)$ 最终有界且 $|G(y)-F(y)|=O(q)$，其余各项在同一尺度下趋于零。因此

$$
\liminf_{y\to\infty}\frac{M-G(y)}{y^2q}
\ge\frac14\left(\frac18-\frac1{16}\right)=\frac1{64}.
$$

换回 $x=e^y$，左侧的比值就是 $(M\sqrt{x}-U(x))/(\ln x)^2$，故每个固定 $c<1/64$ 都给出所述尾部估计。反向只需取 $c=1/128$。此时差额最终至少为 $(\ln x)^2/128$，从而趋于正无穷，由 [@thm-ch31-mangoldt-critical-gap] 得到 RH。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-mangoldt-fejer-gap title="有限 Fejér 平均给出的临界差额" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtFejerGap.rh_iff_eventually_fejer_gap"}
记 $M$ 为第一 Li 质量（`firstLiMass`）。经典黎曼假设成立，当且仅当对每个实数 $c<1/48$，都存在 $X_c>1$，使每个实数 $x\ge X_c$ 都满足

$$
U(x)\le M\sqrt{x}-c(\ln x)^2.
$$
:::

::: proof
在 RH 下，给谱中各个零点的余弦项赋予非负权重。固定 $N\ge2$，将 $N$ 个等距相位两两配对。对任意实数 $\theta$，有

$$
\sum_{j,k=0}^{N-1}\cos((j-k)\theta)
=\left|\sum_{j=0}^{N-1}e^{ij\theta}\right|^2\ge0.
$$

因此各个步长的中点不等式可合并，共同控制中心处的谱亏量。令 $y=\ln x$、$q=e^{-y/2}$。对有序对 $(j,k)$ 取步长 $b_{jk}yq$，其中 $b_{jk}=|j-k|/(2N)$。按 $qy^2$ 归一化后，原点项趋于 $b_{jk}/2$，算术中点上界的主项趋于 $b_{jk}^2$，余项趋于零。对有限组有序对求和并除以 $2N^2$，得到系数

$$
C_N=\frac{1}{2N^2}\sum_{j,k=0}^{N-1}(b_{jk}/2-b_{jk}^2)
=\frac{1-N^{-2}}{48}.
$$

先给定 $c<1/48$，再选取一个有限的 $N$ 使 $c<C_N$，即可在某个实数尾部取得所需不等式。取 $N=3$ 时 $C_3=1/54>1/64$，所以单步估计的端点 $c=1/64$ 也在本定理的范围内。反向使用 [@thm-ch31-mangoldt-log-squared-gap]。每个 $c<1/64$ 都满足 $c<1/48$，所以这里的尾部不等式蕴含单步判据，从而得到 RH。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-mangoldt-uniform-fejer-gap title="同一实数尾部上的 Fejér 差额与对数修正" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtUniformFejerGap.rh_iff_eventually_uniform_fejer_gap"}
令 $y=\ln x$，记 $M$ 为第一 Li 质量。经典黎曼假设成立，当且仅当存在常数 $C\ge0$ 和实数 $X>e$，使每个实数 $x\ge X$ 都满足

$$
U(x)\le M\sqrt{x}-\frac{y^2}{48}+\frac{y\ln y}{12}+Cy.
$$
:::

::: proof
这条不等式在同一条实数尾部给出一个带显式修正项的包络。取 $q=e^{-y/2}$、$t=byq$。当 $y$ 充分大时，每个 $0\le b\le1/2$ 都满足 $yt\le1$。这个共同门槛使原点展开的二次余项和中点不等式的误差可以同时估计。对 $N$ 个等距相位，取 $b_{jk}=|j-k|/(2N)$。对所有有序对求平均，$b_{jk}/2-b_{jk}^2$ 和 $b_{jk}$ 的均值分别是 $(1-N^{-2})/24$ 和 $(1-N^{-2})/6$。谱的中点比较再给出因子 $1/2$，于是 $y^2$ 和 $y\ln y$ 两项的系数分别为 $(1-N^{-2})/48$ 和 $(1-N^{-2})/12$。

现在固定一个已经超过共同门槛的 $y$，让 $N\to\infty$，再用 $Cy$ 吸收线性及常数误差。反向证明只需观察 $(y\ln y/12+Cy)/y^2\to0$。给定 $c<1/48$，修正项最终至多为 $(1/48-c)y^2$，故 [@thm-ch31-mangoldt-fejer-gap] 给出 RH。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-mangoldt-bounded-gap-peak title="归一化余项在整数对数时间上有界间隔地回近临界质量" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtWindowPhase.bounded_gap_actual_G_peak"}
设 RH 成立，记 $G(y)=e^{-y/2}U(e^y)$。对每个 $\delta>0$ 存在自然数 $L$，使每个自然数 $n$ 都有某个自然数 $k\le L$ 满足

$$
|G(n+k)-M|<\delta.
$$
:::

::: proof
在 RH 下，归一化零点和是相位紧群上连续函数沿整数次幂的取值，单位元处的函数值为 $M$。取单位元的开邻域，使其上相位和到 $M$ 的距离小于 $\delta/2$。在相位生成的循环子群的闭包上，回到这个邻域所需的非负整数步数有统一上界，这来自开覆盖的有限子覆盖。归一化余项与零点和实部之差最终小于 $\delta/2$，故有界等待时间内的一个整数对数时刻给出所需估计。增大 $L$ 可把有限的初始时段一并计入。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-mangoldt-no-windows-below-mass title="低于第一 Li 质量的系数排除任意晚的整窗" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtWindowPhase.no_windows_below_mass"}
固定实数 $b>1$ 与 $C<M$。无条件地，存在实数 $R$，使每个 $Y\ge\max\{R,2\}$ 都有某个 $x\in[Y,Y^b]$ 满足 $U(x)>C\sqrt{x}$。
:::

::: proof
若任意晚都有一个整窗满足 $U(x)\le C\sqrt{x}$，同一批窗口也满足较大的系数 $M+1$ 的上界。由 [@thm-ch31-mangoldt-pointwise-sqrt-window] 得到 RH。取 $\delta=M-C>0$，在 [@thm-ch31-mangoldt-bounded-gap-peak] 中从 $n=\lceil\ln Y\rceil$ 出发。充分大的 $Y$ 满足 $(b-1)\ln Y\ge L+1$，故 $n+k\in[\ln Y,b\ln Y]$。取 $x=e^{n+k}$，便在同一窗内得到 $U(x)/\sqrt{x}>M-\delta=C$，与假设矛盾。完整证明由 Lean 内核检查。
:::

**手工推导。** 令 $P_b(Y)=\max_{Y\le x\le Y^b}U(x)/\sqrt{x}$。对 $Y\ge2$，归一化余项连续，故闭窗上能取到最大值。对任意 $a<M$，上一条定理给出充分大 $Y$ 处的 $P_b(Y)>a$。在 RH 下，绝对包络对每个 $c>M$ 又给出充分大的 $Y$ 处 $P_b(Y)<c$，所以 $P_b(Y)\to M$。若 RH 不成立，给定任意实数 $T$，取 $C=\max\{T,M+1\}$，则 [@thm-ch31-mangoldt-pointwise-sqrt-window] 的逆否命题给出充分大的 $Y$ 处 $P_b(Y)>C\ge T$。此时 $P_b(Y)\to+\infty$。[整窗最大值的外部内核重放](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7060137372)

::: {.theorem #thm-ch31-wide-prime-window title="宽窗口质量的下界与 RH 失败时的一致发散" lean="D5/S3/Weil/Mertens/IntegratedExplicit/WidePrimeWindowMass.prime_tail_wide_window_mass"}
对于实际素数尾项，记实端点 $2\le A\le B$ 的窗口质量为

$$
N(A,B)=\int_A^B \frac{\max\{-Q_\vartheta(x),0\}}{\sqrt x}\,dx .
$$

固定 $b>1$。在 $2\le A$、$A^b\le B$ 的范围内，存在一个只依赖于 $b$ 的常数 $C_b\ge0$，使 $N(A,B)\ge 2\ln(B/A)-C_b$。如果 RH 不成立，对每个实数 $K$，存在一个右端点阈值 $S$，对所有 $B\ge S$ 及所有满足上述条件的 $A$，都有 $N(A,B)-2\ln(B/A)\ge K$。
:::

::: proof
为看出阈值为何与 $A$ 无关，从右端点取 $Y=B^{1/b}$。条件 $A^b\le B$ 保证 $[Y,B]=[Y,Y^b]\subseteq[A,B]$，同一非负被积函数使大窗的质量至少等于子窗的质量。RH 若失败，对称性给出实部 $\beta>1/2$ 的零点。固定幂窗口的下界允许任意正的指数损失，所以可取损失 $b(\beta-1/2)/2$，对所有充分大的 $B$ 及所有允许的 $A$ 给出 $N(A,B)\ge B^{(\beta-1/2)/2}$。当 $B$ 增大时，此幂超过 $2\ln B$ 加任意固定常数。用 $2\ln(B/A)\le2\ln B$ 即得一致发散。在阈值以下，对数项有界且质量非负，故可补齐下界。RH 成立时，所有 $2\le A\le B$ 上的有界余项直接给出所需下界。 完整证明由 Lean 内核检查。
:::

这里需要预先固定 $b>1$。在对数坐标下，$B\ge A^b$ 仍要求随尺度增大而加宽窗口。对于固定比率 $B/A$ 的窗口，当前推导的子窗包含关系未提供相同结论。

**在哪些尺度上能选到特征标和小的素数？** 固定 $\varepsilon>0$。对整数 $k\ge1$，把素数的上界定为 $X_k=2^k$，再选 $x_k=(k\ln2)^{5/\varepsilon}$，于是 $\exp(x_k^{\varepsilon/5})=X_k$。这一块只用 $X_k/2\le q<X_k$ 中模 $8$ 余 $3$ 的素数。第 $k$ 块与第 $k+1$ 块互不相交。对足够大的 $k$，块的下端已超过 $\sqrt{X_k}$，所以它整个落在外库为 $q$ 指定的大小范围内。

为计算二次矩，对块内每个正奇整数 $q$ 都用 Jacobi 符号定义这个和。取 $N_k=\lfloor x_k^{400}\rfloor$，记

$$
T_k(q)=\sum_{n=1}^{N_k}\Lambda(n)\min\{1,x_k/n\}\left(\frac{n}{q}\right).
$$

其中 $p$ 为素数，整数 $j\ge1$ 时 $\Lambda(p^j)=\ln p$，其余正整数的权重为零。小于等于 $x_k$ 的项保留原权重，较大的项乘以 $x_k/n$。仅对块内模 $8$ 余 $3$ 的素数 $q$ 计权。若 $|T_k(q)|\le x_k^{1/2+\varepsilon}/2$，把 $(\ln q)/q$ 计入 $G_k$，否则计入 $B_k$。等号属于 $G_k$。

::: {.theorem #thm-ch31-dyadic-mangoldt-prime-supply title="二进尺度上截断 Mangoldt 和的好素数" lean="D5/S3/CharacterSums/DyadicMangoldtPrimeSupply.dyadic_quadratic_mangoldt_supply"}
对每个固定的实数 $\varepsilon>0$，坏素数的总权重有限，而好素数的部分和趋于正无穷：

$$
\begin{aligned}
\sum_{k=1}^{\infty} B_k&<\infty,\\
\lim_{K\to\infty}\sum_{k=1}^K G_k&=+\infty.
\end{aligned}
$$
:::

::: proof
为估计坏素数，先把 $|T_k|^2$ 在块内所有模 $8$ 余 $3$ 的整数上求和。这些非负项包含了所需的素数项。高次素数幂的截断权重总量为 $O(\sqrt{x_k})$。对不同奇素数的交叉项，二次互反律把分母的变化转成一个周期和，完整周期相消，只剩两端的余项。对固定 $\varepsilon$，充分大块的二次矩至多为 $(X_k/2)x_k^{1+\varepsilon}$。每个坏素数的平方贡献都超过 $x_k^{1+2\varepsilon}/4$。再用块内 $(\ln q)/q\le 2\ln(X_k)/X_k$，并代入 $x_k^\varepsilon=(k\ln 2)^5$，得到对所有充分大的 $k$ 有 $B_k\le 4/(k\ln 2)^4$，故坏素数的总权重有限。另一方面，模 $8$ 余 $3$ 的素数上 $(\ln q)/q$ 的总和发散。把它按这些不相交的块相加，再扣除有限的坏权重，就得到好权重的发散。完整证明由 Lean 内核检查。
:::

因此每个起始块 $K_0$ 之后，都有某个 $k\ge K_0$ 和该块的一个素数 $q$ 达到上述界。发散允许部分块内没有好素数。这里估计的是外库在第一次选 $q$ 时使用的有限和，对应附加扭曲 $\kappa=1$。在外库规定的解析、大小与无零点条件下，对应特征标的平滑中心化和 $g_\chi(x_k)$ 满足 $|g_\chi(x_k)+T_k(q)|\le x_k^\varepsilon$，近似项的符号为负。第一次选 $q$ 时还须同时满足两个无零点条件。随后选 $d$ 时的扭曲和模数随 $q,x$ 变化，相应的对数导数估计与无零点盒条件仍需分别论证。[参考库的有限和](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/GL3MeanSquares/SmoothedRemainderRealIntegralFormula.lean#L139-L147) · [平滑和的近似](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/GChiApproximationSumStatement.lean#L14) · [第一次选素数的条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean)

**如果先指定实高度，仍然能选出素数吗？** 现在先给定实数 $x$，令 $T=x^{\varepsilon/5}$。把前面的截断和写成 $T_x(q)$，即在同一个 $x$ 上取权重 $\Lambda(n)\min\{1,x/n\}$，乘上雅可比符号 $(n/q)$，一直加到 $\lfloor x^{400}\rfloor$。选素数的区间随 $x$ 移动。为给随后要避开的整数留出余地，再给定一个有限集 $E\subset\mathbb N$。记 $S_x(E)$ 为满足下列条件的素数之集：

$$
e^{T/2}<q\le e^T,\qquad q\equiv3\pmod8,\qquad
q\notin E,\qquad |T_x(q)|\le \tfrac12 x^{1/2+\varepsilon}.
$$

::: {.theorem #thm-ch31-real-scale-mangoldt-prime-supply title="每个充分大实高度的好素数权重" lean="D5/S3/CharacterSums/DyadicMangoldtPrimeSupply.real_scale_quadratic_mangoldt_supply"}
对每个固定的 $\varepsilon>0$，存在 $x_0(\varepsilon)$，使得对每个实数 $x\ge x_0(\varepsilon)$ 和每个满足 $|E|\le e^{T/3}$ 的有限集 $E\subset\mathbb N$，都有

$$
\sum_{q\in S_x(E)}\frac{\ln q}{q}\ \ge\ \frac{T}{173065984000}.
$$

:::

::: proof
令 $D=86532992000$。在上述区间内，所有模 $8$ 余 $3$ 的素数的总权重最终至少为 $T/D$。按二进块估计二次矩，在每块中都保持同一个实高度 $x$ 和截点 $\lfloor x^{400}\rfloor$。超过阈值的素数的总权重最终至多为 $36T^2/x^\varepsilon$，除以 $T$ 后趋于零。上述区间内每个素数的权重至多为 $Te^{-T/2}$，删去至多 $e^{T/3}$ 项所损失的权重至多为 $Te^{-T/6}$。当 $x$ 充分大时，两项损失各不超过 $T/(4D)$，余下至少 $T/(2D)$。完整证明由 Lean 内核检查。
:::

**手工推导。** 下界为正，故每个这样的 $x$ 都有合格素数；所选的 $q$ 可以随 $x$ 与 $E$ 改变。由每个素数的权重上界 $Te^{-T/2}$ 还可得 $|S_x(E)|\ge e^{T/2}/173065984000$。若能把违反参考库两个无零点条件中任一项的候选素数全部装入这样的 $E$，定理就会给出同时满足两项的素数。把这些素数装入规定大小的集合，还需要独立的估计。

**第二枚素数落在移动的同余类里。** 先选 $q$ 后，选 $d$ 的模数 $m$ 可以随高度增大。要从区间 $(D/2,D]$ 中删去未通过测试的整数，需要先知道指定同余类里实际有多少素数。对固定 $m$ 的渐近式，其起算点可能依赖 $m$。这里需要对所有 $m$ 同时有效的起算条件。

取整数 $m\ge3$ 及模 $m$ 的可逆剩余类 $a$。在分圆域 $\mathbb Q(\zeta_m)$ 中，记 $\sigma_a(\zeta_m)=\zeta_m^a$，$\Pi_a(t)$ 为不超过 $t$、在此扩张中非分歧且 Frobenius 为 $\sigma_a$ 的有理素数个数。令 $Q$ 为此 Galois 群所有特征标的原始导子的最大值。记 $\operatorname{Li}(t)=\int_2^t du/\log u$。

::: {.theorem #thm-ch31-cyclotomic-tz title="带例外零点项的分圆素数计数" status="written-proof" proof="pf-ch31-cyclotomic-tz" doi="10.2140/ant.2019.13.1039" source="Theorems 1.4 and 3.3, pp. 1042 and 1052" request="https://github.com/the-omega-institute/trureturing-requests/issues/455"}
存在绝对有效常数 $A,c_2,c_3,s>0$。这里的例外零点是某个实特征标对应的原始 Dirichlet $L$ 函数在 $0<\lambda<1/8$、$\beta=1-\lambda/\log Q$ 范围内的实零点。若无例外零点，取 $F(t)=\operatorname{Li}(t)$。若有，例外实特征标唯一，记为 $\chi$，其例外零点为 $\beta=1-\lambda/\log Q$，其中 $sQ^{-2}\le\lambda<1/8$。此时取 $F(t)=\operatorname{Li}(t)-\chi(a)\operatorname{Li}(t^\beta)$。对每个 $m,a$ 和每个 $t\ge Q^{c_2}$ 都有

$$
\left|\varphi(m)\Pi_a(t)-F(t)\right|
\le A\left(e^{-c_3\log t/\log Q}+e^{-\sqrt{c_3\log t}}\right)F(t).
$$

:::

::: {.proof #pf-ch31-cyclotomic-tz}
在 Thorner 与 Zaman 的定理 1.4 中取 $L=\mathbb Q(\zeta_m)$，基域为 $\mathbb Q$，阿贝尔子群取 $H=G=(\mathbb Z/m\mathbb Z)^\times$，共轭类取 $\{\sigma_a\}$。于是固定域为 $\mathbb Q$，其判别式和次数均为 $1$。原文式 (1–11)、(3–1) 中的两个导子参数都化为这里的 $Q$，密度系数为 $1/\varphi(m)$。每个原始导子整除 $m$，而 $m\ge3$ 时群有非平凡特征标，其原始导子至少为 $3$，所以 $3\le Q\le m$。定理 1.4 给出所写相对误差和例外项，定理 3.3 给出 $\lambda\ge sQ^{-2}$。两者的常数均绝对有效。Jesse Thorner and Asif Zaman, “A unified and improved Chebotarev density theorem,” *Algebra & Number Theory* **13**(5) (2019), 1039–1068. [10.2140/ant.2019.13.1039](https://doi.org/10.2140/ant.2019.13.1039) · [原刊定理 1.4](https://msp.org/ant/2019/13-5/ant-v13-n5-p02-s.pdf#page=5) · [原刊定理 3.3](https://msp.org/ant/2019/13-5/ant-v13-n5-p02-s.pdf#page=15)
:::

**手工推导。** 存在绝对有效常数 $c,K,D_0>0$，使每个 $m\ge3$、每个可逆类 $a$ 和每个 $D\ge\max\{D_0,(4m)^K\}$ 都满足下界

$$
\#\{Y<p\le2Y:p\text{ 为素数},\ p\equiv a\pmod m\}
\ \ge\ c\,m^{-3}\frac{Y}{\log Y},\qquad Y=D/2.
$$

先取充分大的 $K\ge2$，再取充分大的 $D_0$。由 $\log Y/\log Q\ge K-1$ 和 $Y\ge D_0/2$，可使 $Y>m$、$Y\ge Q^{c_2}$，且定理在 $Y,2Y$ 处的相对误差均不超过 $1/100$。区间中的素数 $p>m$ 非分歧，其 Frobenius 把 $\zeta_m$ 送到 $\zeta_m^p$。故两端计数之差正是所求素数个数。

若例外零点存在且 $\chi(a)=1$，置 $\delta=1-\beta$，$W=1-Y^{-\delta}$；其余情形置 $W=1$。在 $[Y,2Y]$ 上有 $F'(t)\ge W/\log(2Y)$，故 $F(2Y)-F(Y)\ge WY/(2\log Y)$。在发生抵消的情形，$\beta>1/2$，从 $t^\beta$ 到 $t$ 积分得 $0\le F(t)\le2t(1-t^{-\delta})/\log t$。又因 $1-(2Y)^{-\delta}\le1-Y^{-2\delta}\le2W$，两端之和至多为 $10WY/\log Y$。其余情形有 $0\le F(t)\le2\operatorname{Li}(t)\le6t/\log t$（$t$ 充分大），故各情形都满足 $F(Y)+F(2Y)\le18WY/\log Y$。减去两端误差后，$\varphi(m)(\Pi_a(2Y)-\Pi_a(Y))\ge WY/(4\log Y)$。

在发生抵消的情形，$\delta\log Y\ge s/m^2$。由 $1-e^{-u}\ge(1-e^{-1})\min\{u,1\}$ 得 $W\ge (1-e^{-1})\min\{s,1\}m^{-2}$；$W=1$ 时也成立。再除以 $\varphi(m)\le m$ 即得下界。对选 $d$ 所用的 $y=x^{\varepsilon/5}$、$m\le e^{4y}$ 和 $D=e^{y(\log x)^2}$，有 $\log D/\log(4m)\ge y(\log x)^2/(\log4+4y)\to\infty$，因此同一门槛适用于每个充分大的 $x$。若该类里未通过任一测试的整数数目小于这个素数下界，就至少留下一枚同时通过两项测试的素数。[参考库中的计数假设](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Definitions/GlobalTwisting/GeneralHyps.lean#L113-L118)

**怎样在同一枚 $d$ 上通过两项测试？** 固定 $\varepsilon>0$，记 $y=x^{\varepsilon/5}$、$D=\exp(y(\log x)^2)$、$N=\lfloor x^{400}\rfloor$。沿同余类取 $d_i=b+m(A+i)$，其中 $0\le i<L$。写 $J(n,r)$ 为把 $r$ 的各素因子按重数取 Legendre 符号后相乘的值，$r=0,1$ 时取空积 $1$。素因子 $2$ 对奇数 $n$ 贡献 $1$，对偶数 $n$ 贡献 $0$；对正奇数分母，$J$ 就是雅可比符号。置 $w_n=\Lambda(n)\min\{1,x/n\}$。在同一个 $i$ 上计算

$$
S_i=\sum_{n=1}^N w_n J(n,d_i),\qquad
S_{q,i}=\sum_{n=1}^N w_n J(n,d_i)J(n,q).
$$

索引集合 $H$ 收录满足 $|S_i|>x^{1/2+\varepsilon}/2$ 或 $|S_{q,i}|>x^{1/2+\varepsilon}/2$ 的 $i$。于是 $i\notin H$ 表示两个和同时达到所需界。

::: {.theorem #thm-ch31-splitting-progression-power-tail title="同一分裂同余类上两项测试的例外索引" lean="D5/S3/CharacterSums/SplittingProgressionExponentialTail.splitting_progression_power_tail"}
对每个固定的 $\varepsilon>0$ 和每个充分大的实数 $x$，任取自然数 $q,b,m,A,L$，设 $b\equiv3\pmod4$、$4\mid m$，且每个整除 $m$ 的素数 $p$ 都满足 $p\le x^{1/2+\varepsilon/2}$ 或 $p>N$。若 $L\ge D/(4e^{4y})$，则

$$
|H|\le L D^{-\min\{\varepsilon,1\}/38400}.
$$

:::

::: proof
从两个和中取出不整除 $m$ 的奇素数项。较高素数幂、$2$ 和整除 $m$ 的素数项由截断权重及因子条件控制，对每项测试的误差最终至多为 $x^{1/2+\varepsilon}/4$。因 $d_i\equiv3\pmod4$，二次互反律把每个 $J(p,d_i)$ 写为固定符号乘以 $d_i\bmod p$ 的二次特征标。在剩余素数乘积的完整周期上，对每个保留的素数 $p$，由于 $p\nmid m$，模 $p$ 的每个剩余类出现的次数相同。中国剩余定理给出各坐标的独立性。每个特征标有界且均值为零，因此各系数的平方和控制高偶次矩。在实际长度 $L$ 的区间上展开同一个矩，每个素数元组在完整周期之外只留下端点余项。取矩阶 $2\lfloor y\log x/4800\rfloor$，给定的长度门槛足以吸收这些余项。在任何失败索引上，至少一个剩余素数和的绝对值达到 $x^{1/2+\varepsilon}/4$；用两个非负偶次幂之和同时控制全部失败索引即得所示界。完整证明由 Lean 内核检查。
:::

**手工推导。** 对每个固定的 $B>0$，$D^{-\min\{\varepsilon,1\}/38400}\le e^{-By}$ 最终成立。要把整数索引变成真正的素数，可取上一段的 $(D/2,D]$ 并只枚举其中指定同余类的元素。若 $m\ge3$、$m\le e^{4y}$、$a=b\bmod m$ 为可逆类，且这个枚举满足定理的诸条件，则 $L\le D+1$。失败索引至多 $(D+1)D^{-\min\{\varepsilon,1\}/38400}$，它与素数个数下界 $c m^{-3}(D/2)/\log(D/2)$ 的比值趋于零，因为 $m^3\le e^{12y}$ 而 $\log D=y(\log x)^2$。所以在每个这样的充分大高度，至少一枚素数 $d$ 同时通过两项测试。

对前文选出的第一枚素数 $e^{y/2}<q\le e^y$，取 $M=q\prod_{2<p\le y,\ p\text{ 为素数}}p$，$m=16M$，$b=8M-1$。此时 $b\equiv3\pmod4$ 且 $\gcd(b,m)=1$。由 $\vartheta(y)\le y\log4$ 得 $\log m\le\log16+(1+\log4)y\le4y$（$x$ 充分大）。整除 $m$ 的素数或者不超过 $\max\{2,y\}$，或者是 $q>e^{y/2}>N$。在 $(D/2,D]$ 中枚举该类，索引数至少为 $D/(2m)-1\ge D/(4m)$，从而满足长度门槛。在同一个 $x$ 上，第一枚素数 $q$ 与由此获得的 $d$ 使第一项测试以及上述两项测试全部通过。

**六个系数分别属于哪个导子？** 取互异的奇素数 $q,d$，写 $j_p(n)=J(n,p)$。令 $e(n)=\chi_8(n)$，它在偶数上取零，在模 $8$ 余 $1,7$ 时取 $1$，余 $3,5$ 时取 $-1$。称 $f$ 在模 $a$ 上有本原表示，是指存在导子为 $a$ 的模 $a$ Dirichlet 特征标，在每个自然数 $n$ 处都取值 $f(n)$。这里的取值包含非单位。

::: {.theorem #thm-ch31-six-primitive-quadratic-levels title="六个二次系数的本原表示" lean="D5/S3/CharacterSums/PrimitiveQuadraticConductors.six_quadratic_levels"}
对每一对互异奇素数 $q,d$，下列六对函数与模数均给出复 Dirichlet 特征标的本原表示：

$$
(j_q,q),\quad(ej_q,8q),\quad(j_d,d),\quad(ej_d,8d),\quad
(j_qj_d,qd),\quad(ej_qj_d,8qd).
$$

:::

::: proof
奇素数模的二次特征标非平凡，因此在该素数模上本原。模 $8$ 的特征标 $e$ 在 $1$ 和 $5$ 上取相反值，这两个数模 $4$ 同余，因此它不能经由 $4$ 或其因子下降。将互素模数的本原特征标提升至乘积模数后相乘，导子是原导子的乘积。逐次用于 $8,q,d$ 即得六个表示；若一个整数与乘积模数不互素，相应因子取零，故乘积取值公式在该整数上也成立。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-primitive-inducing-level title="从互素处的取值恢复本原导子" lean="D5/S3/CharacterSums/PrimitiveQuadraticConductors.inducing_level_and_values"}
令 $R$ 为带零交换幺半群，$r,a,M$ 为正整数，$\chi$ 为模 $r$ 的本原 $R$ 值 Dirichlet 特征标。设 $f:\mathbb N\to R$ 在模 $a$ 上有本原表示，且对所有与 $M$ 互素的 $n$ 都有 $\chi(n)=f(n)$。则 $r=a$，且对每个自然数 $n$ 都有 $\chi(n)=f(n)$。
:::

::: proof
把 $\chi$ 和表示 $f$ 的特征标都提升到模 $raM$。该模数的每个单位都能用与 $M$ 互素的整数代表，故两个提升在单位上相同，进而是同一特征标。提升保持导子，所以两个本原导子相等。此时从同一原模数出发的提升是单射，两者的全部取值相同。完整证明由 Lean 内核检查。
:::

**进入右半平面时，特征标本身提供什么界？** 记 $h$ 为特征标的模数，$s=\sigma+it$。下面的估计也适用于非本原的非主特征标。

::: {.theorem #thm-ch31-nonprincipal-half-totient title="非主 Dirichlet L 函数的严格半欧拉函数界" lean="D5/S3/CharacterSums/NonprincipalCharacterGrowth.nonprincipal_growth"}
对每个正整数 $h$、每个模 $h$ 的非主复 Dirichlet 特征标 $\chi$ 和每个满足 $\sigma=\operatorname{Re}s>0$ 的复数 $s$，都有

$$
|L(s,\chi)|<\frac{\varphi(h)}{2}\frac{|s|}{\sigma}.
$$

:::

::: proof
令 $A(u)=\sum_{1\le n\le u}\chi(n)$。完整周期的和为零，一个周期内的前缀与余段的和互为相反数。两段中单位的总数为 $\varphi(h)$，用其中较少的一段估计就得 $|A(u)|\le\varphi(h)/2$。在 $\sigma>1$ 上，部分求和给出 $L(s,\chi)=s\int_1^\infty A(u)u^{-s-1}\,du$。由于 $A$ 有界，右端积分在 $\sigma>0$ 上局部一致收敛并定义全纯函数；由恒等定理，上述等式在整个右半平面 $\sigma>0$ 上成立。当 $h<u<h+1$ 时，$A(u)$ 恰好是一个完整周期的和，等于零，而用来估计积分的函数 $\varphi(h)u^{-\sigma-1}/2$ 在该区间为正。因此被积函数模长的积分严格小于上界函数的积分。对复积分用三角不等式并乘以 $|s|$，即得所述严格不等式。完整证明由 Lean 内核检查。
:::

**手工推导。** 系数 $ej_qj_d$ 的本原导子为 $8qd>1$，而主特征标的导子为 $1$，因此它满足非主条件，可以在上式中代入 $h=8qd$。要进一步估计 $L'/L$，仍需在所指定的区域控制 $L$ 的零点。

**从同一实端点控制 $L'/L$。** 取正整数模数 $h$、模 $h$ 的非主复 Dirichlet 特征标 $\chi$，记 $D_\chi=L'(1,\chi)/L(1,\chi)$。在正实数 $x$ 处定义斜坡和及非主分支的平滑中心化和

$$
R_\chi(x)=\sum_{1\le n\le\lfloor x\rfloor}\Lambda(n)\max(x/n-1,0)\chi(n),
\qquad g_\chi(x)=R_\chi(x)+xD_\chi .
$$

这里的和包含素数幂；当 $x$ 本身是整数时，新进入的一项权重为零。记 $I(x)=\int_x^\infty(\psi(u)-u)u^{-2}\,du$，其中 $\psi(u)=\sum_{n\le u}\Lambda(n)$，$\gamma$ 为欧拉常数。

::: {.theorem #thm-ch31-log-derivative-ramp-tail title="同一端点的斜坡和与带符号尾积分" lean="D5/S3/CharacterSums/DirichletRampEndpoint.logDerivative_le_ramp_tail"}
对每个正整数 $h$、每个模 $h$ 的非主复 Dirichlet 特征标 $\chi$ 和每个实数 $x>0$，有

$$
|D_\chi|\le\frac{|g_\chi(x)|}{x}+\log x-1-\gamma-I(x).
$$

:::

::: proof
在 $xD_\chi=g_\chi(x)-R_\chi(x)$ 中用三角不等式。由于 $|\chi(n)|\le1$，$|R_\chi(x)|/x$ 至多为 $\sum_{n\le x}\Lambda(n)/n-\psi(x)/x$。对 $x\ge2$，完整的 Chebyshev 尾积分恒等式把后一式写成 $\log x-1-\gamma-I(x)$，保留了尾项的符号。对 $0<x<2$，斜坡和为零；在 $(x,2)$ 上尾积分的被积函数为 $-1/u$，从端点 $2$ 积回 $x$ 给出同一公式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-uniform-log-derivative-ramp title="平方根尺度斜坡界给出的统一对数导数估计" lean="D5/S3/CharacterSums/DirichletRampEndpoint.uniform_logDerivative_of_ramp"}
对所有实数 $\varepsilon<1/2$、$\eta>0$，存在 $X\ge2$，使得对每个 $x\ge X$、每个正整数 $h$ 及每个模 $h$ 的非主复 Dirichlet 特征标 $\chi$，都有

$$
|g_\chi(x)|\le x^{1/2+\varepsilon}
\quad\Longrightarrow\quad
|D_\chi|\le\log x-1-\gamma+\eta .
$$

:::

::: proof
用中心化和 $|g_\chi(x)|$ 的界除以 $x$，得 $|g_\chi(x)|/x\le x^{\varepsilon-1/2}\to0$。Chebyshev 误差核绝对可积，故 $I(x)\to0$。取 $X$ 使这两项的误差各小于 $\eta/2$，代入上一条端点界即可。二者只依赖实端点和误差参数，所以同一个起点适用于所有模数与特征标。完整证明由 Lean 内核检查。
:::

**手工推导。** 非主分支上，前文使用的参考库平滑中心化和 `An.gChi` 与上式的 $g_\chi$ 定义一致。对宿主有界集合中的每个特征标及诱导它的每个非主本原特征标 $\chi$，宿主条件 `EAtH.bdG` 在同一端点 $x$ 给出 $|g_\chi(x)|\le x^{1/2+\varepsilon}$。若 $\varepsilon<1/2$，取 $\eta=1$，则每个充分大的 $x$ 都有 $|D_\chi|\le\log x-\gamma\le4\log x$。这给出 `EAtH.bdL` 对该 $\chi$ 要求的系数 $4$ 的不等式。主特征标有单独的分支。[中心化和与对数导数的定义](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Analytic.lean#L9-L27) · [宿主的两个逐点条件](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L144-L151)

对同一非主特征标，整窗上的 $g_\chi$ 还可由有限个结点控制。记 $D_\chi=L'(1,\chi)/L(1,\chi)$，并将 $g_\chi(x)=R_\chi(x)+xD_\chi$ 的同一斜坡公式用于所有实数 $x$。给定 $Y\le Z$，把两个端点与所有满足 $Y<n<Z$、$\Lambda(n)\chi(n)\ne0$ 的自然数 $n$ 合并成有限集 $T_\chi(Y,Z)$。内部结点是特征标值非零的素数幂。

::: {.theorem #thm-ch31-character-concave-window title="用端点与有效结点检验凹包络" lean="D5/S3/CharacterSums/DirichletRampWindow.concave_window_iff"}
取正整数模数 $N$ 和模 $N$ 的非主复 Dirichlet 特征标 $\chi$。对任意实数 $Y\le Z$ 及在 $[Y,Z]$ 上凹的实值函数 $B$，整窗上每点都满足 $|g_\chi(x)|\le B(x)$，当且仅当 $T_\chi(Y,Z)$ 的每个点都满足这个不等式。
:::

::: proof
相邻检验点之间，已经开始的各个斜坡都是仿射函数，还未开始的斜坡取零。可能在两点之间进入的项系数为零。因此复值函数 $g_\chi$ 在这一段上仿射。把内部点写成两端的凸组合，三角不等式将其范数控制在端点范数的弦之下，而 $B$ 的凹性把端点函数值的弦控制在 $B(x)$ 之下。端点重合时只需该点的不等式。完整证明由 Lean 内核检查。
:::

::: {.theorem #thm-ch31-character-power-log-window title="幂包络与对数导数的有限联合检验" lean="D5/S3/CharacterSums/DirichletRampWindow.power_log_window_iff"}
取上述模数与特征标。设 $0<Y\le Z$，$0\le p\le1$，$A,c\ge0$。整窗上每个 $x\in[Y,Z]$ 都同时满足

$$
|g_\chi(x)|\le A x^p,\qquad |D_\chi|\le c\ln x
$$

当且仅当 $|g_\chi(t)|\le A t^p$ 对每个 $t\in T_\chi(Y,Z)$ 成立，并且 $|D_\chi|\le c\ln Y$。
:::

::: proof
在给定指数范围内，$x\mapsto A x^p$ 在正实轴上凹，故第一项可直接应用 [@thm-ch31-character-concave-window]。第二项的左边不随 $x$ 改变，而 $c\ln x$ 在窗上单调不减，在 $Y$ 处检验即可。完整证明由 Lean 内核检查。
:::
