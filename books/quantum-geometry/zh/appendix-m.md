# 附录 M 算术窗口、Möbius 截断与零点谱扰动技术证明 {#sec-appendix-m}

在[第三十一章 31.1 节](ch34-s28-riemann-path-integral-and-prime-arcs.md)中，我们沿着“不可约素数圆弧路径积分（[§31.1.1](ch34-s28-s01-euler-paths.md)）$\to$ 临界线半密度平方律（[§31.1.2](ch34-s28-s02-half-density.md)）$\to$ 算术 `1—3—3—1` 概念塔与韦伊显式对偶（[§31.1.3](ch34-s28-s03-explicit-duality.md)）”展开了黎曼 $\zeta$ 函数的几何解剖，随即交棒[§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md)的算术枢轴重整与[§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md)的埃尔米特—比勒径向单调锁。围绕韦伊显式对偶展开的深层解析数论微调——涵盖幂次采样与辅助素数窗口、Möbius 截断及其 Fourier 恢复、加权近碰撞方差界与各类频谱扰动分析、Mangoldt 临界差额与特征窗口，以及晚期窗口簇值与谱误差——体量庞大且高度专门化，故整块归入本附录以便主线阅读一气呵成。

有限逼近误差还给出另一种窗口：它限制假想零点可以出现的矩形区域。[§31.3 的环带证书](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#rem-ch34-nyman-beurling-remainder)在 Cayley 圆盘中最直观；换回零点的实部与高度时，必须分清矩形内的端点与开边界上的极限。

::: {.remark #rem-appm-nyman-rectangle-infimum title="任意正下限高度的 Nyman 矩形门槛（手工推导）"}
记 $b=\tfrac12+\delta$，其中 $0<\delta<\tfrac12$，并设 $0<h\le T$。在几何区域

$$
\mathcal R_{\delta,h,T}=\{\beta+i\gamma:b\le\beta<1,\ h\le|\gamma|\le T\}
$$

上定义

$$
\begin{aligned}
F(\beta,\gamma)&=\frac{(2\beta-1)((1-\beta)^2+\gamma^2)}{(\beta^2+\gamma^2)^2},\\
K(\delta,T)&=\frac{2\delta((\tfrac12-\delta)^2+T^2)}{((\tfrac12+\delta)^2+T^2)^2},
\qquad B(h)=\frac{h^2}{(1+h^2)^2}.
\end{aligned}
$$

[@prop-ch34-nyman-beurling-frozen-facts] 第 4 款保证：若 $\rho=\beta+i\gamma$ 是此区域内的非平凡零点，则每个 $N\ge0$ 都有 $d_N^2\ge F(\beta,\gamma)$。下面对这个几何下界的优化是**手工推导，未另经 Lean 核验**：

$$
\inf_{\mathcal R_{\delta,h,T}}F=\min\{K(\delta,T),B(h)\}>0.
$$

当 $K(\delta,T)\le B(h)$ 时，最小值恰在 $\beta=b$、$|\gamma|=T$ 取到；当 $B(h)<K(\delta,T)$ 时，下确界不取到，可由固定 $|\gamma|=h$、令 $\beta\uparrow1$ 逼近。因此，对某个有限 $N$，认证 $d_N^2\le U$ 后，下列任一条件都排除此矩形中的非平凡零点：

$$
\begin{cases}
U<K(\delta,T),&K(\delta,T)\le B(h),\\
U\le B(h),&B(h)<K(\delta,T).
\end{cases}
$$

**证明。** 令 $y=(2\beta-1)/(\beta^2+\gamma^2)$，则 $F=y(1-y)$。写 $y_-=2\delta/(b^2+T^2)$ 与 $y_+=1/(1+h^2)$。直接交叉相乘给出

$$
\begin{aligned}
y-y_-&=\frac{(\beta-b)(\beta+b-2\beta b+2T^2)+(2b-1)(T^2-\gamma^2)}{(\beta^2+\gamma^2)(b^2+T^2)}\ge0,\\
y_+-y&=\frac{(1-\beta)^2+2h^2(1-\beta)+(\gamma^2-h^2)}{(1+h^2)(\beta^2+\gamma^2)}>0.
\end{aligned}
$$

第一式中 $\beta+b-2\beta b=\beta(1-b)+b(1-\beta)>0$，故等号恰在 $\beta=b$、$|\gamma|=T$ 成立。于是 $0<y_-\le y<y_+<1$，且 $K=y_-(1-y_-)$、$B=y_+(1-y_+)$。由

$$
K-B=(y_--y_+)(1-y_--y_+)
$$

可知 $K\le B$ 等价于 $y_-+y_+\le1$。此时

$$
F-K=(y-y_-)(1-y-y_-)\ge0,
$$

第二因子严格为正，等号恰在上述矩形端点成立。若 $B<K$，则 $y_-+y_+>1$，从而

$$
F-B=(y_+-y)(y+y_+-1)>0.
$$

固定 $|\gamma|=h$ 并令 $\beta\uparrow1$，有 $y\to y_+$、$F\to B$，这证明了下确界及其取到情况；结合 $F\le d_N^2\le U$ 即得排零条件。$\square$

开边界使第二种情形允许 $U=B(h)$；第一种情形（包括 $K=B$）仍须严格不等号，因为几何下界在矩形内确实取等。这里的最优性只针对 $F$，不声称真实距离或零点会取到这些几何值。任意有限试探系数的误差平方上界仍可充当 $U$，无需求出最优投影。

例如 $\delta=h=\tfrac14$、$T=2$ 时，$B=\tfrac{16}{289}<K=\tfrac{520}{5329}$，所以 $U\le\tfrac{16}{289}$ 已足以排除此矩形；这只是门槛算例，并未计算出达到门槛的试探误差。取 $h=1$ 时有 $y_+=\tfrac12$，因而总是 $K<B$，恢复上高度端点给出的门槛。反之，$h\downarrow0$ 时 $B(h)\to0$，不能删去正下限高度后仍沿用一个统一正门槛。
:::

下面给出一组实际达到排零门槛的有理试探系数，让误差证书与零点几何之间的连接可以逐项手算。

::: {.example #ex-appm-nyman-rational-trial title="三项有理试探的排零证书（手工推导）"}
沿用 [@prop-ch34-nyman-beurling-frozen-facts] 的 $\chi,\rho_k,d_N$，取

$$
\begin{aligned}
q&=(-1,1,\tfrac32),& v&=-\rho_1+\rho_2+\tfrac32\rho_3,\\
S&=\sum_{k=1}^3\frac{q_k}{k}=-1+\tfrac12+\tfrac12=0,&
R&=\int_0^\infty|\chi(x)-v(x)|^2\,dx.
\end{aligned}
$$

以下积分、有限和与排零组合均为**手工推导，未另经 Lean 核验**。$x>1$ 时 $v(x)=S/x=0$，所以该端尾部恰为零。在 $1/(j+1)<x<1/j$（$j\ge1$）上，$\lfloor1/(kx)\rfloor=\lfloor j/k\rfloor$，故

$$
\begin{aligned}
\chi(x)-v(x)&=1-S/x+\sum_{k=1}^3q_k\lfloor j/k\rfloor=A_j,\\
A_j&=1-j+\lfloor j/2\rfloor+\tfrac32\lfloor j/3\rfloor,\\
A_{j+6}&=A_j,\qquad (A_0,A_1,A_2,A_3,A_4,A_5)=(1,0,0,\tfrac12,\tfrac12,-\tfrac12).
\end{aligned}
$$

断点是零测集。取 $M=256$，用 $|\chi-v|\le1+\sum_k|q_k|=\tfrac92$ 控制 $0<x<1/M$，得到只含有理数的证书

$$
\begin{aligned}
I_{256}&=\sum_{j=1}^{255}\frac{A_j^2}{j(j+1)},\\
d_3^2&\le R\le U_{256}:=I_{256}+\frac{81}{1024}.
\end{aligned}
$$

无需列出这个有限和的大分母，也能严格比较门槛。令 $w_j=1/(j(j+1))$。首六项之和为 $11/168$；以 $j=6m+1$ 开始的每个完整六项块，其平方序列为递增的 $(0,0,\tfrac14,\tfrac14,\tfrac14,1)$，均值为 $7/24$，而 $w_j$ 递减。对块内的 $a_i=A_{6m+i}^2$ 与 $w_{6m+i}$，有

$$
\sum_{i=1}^6a_iw_{6m+i}-\frac7{24}\sum_{i=1}^6w_{6m+i}
=\frac16\sum_{1\le i<k\le6}(a_i-a_k)(w_{6m+i}-w_{6m+k})\le0.
$$

从 $j=7$ 到 $252$ 全是完整块；末三项 $j=253,254,255$ 的平方为 $0,0,\tfrac14$，各自也不超过 $7/24$。利用 $w_j=1/j-1/(j+1)$，得到

$$
\begin{aligned}
I_{256}&\le\frac{11}{168}+\frac7{24}\left(\frac17-\frac1{256}\right)<\frac3{28},\\
U_{256}&<\frac3{28}+\frac{81}{1024}=\frac{1335}{7168}<\frac3{16}.
\end{aligned}
$$

因此 [@prop-ch34-nyman-beurling-frozen-facts] 第 4 款排除了 $\tfrac12<\operatorname{Re}\rho<1$ 且 $\tfrac14\le|1-1/\rho|^2\le\tfrac34$ 的零点：该环带会迫使 $d_3^2\ge\tfrac3{16}$。矩形读法则取 $\delta=\tfrac14$、$h=\tfrac34$、$T=1$；此时 $K=\tfrac{136}{625}<B=\tfrac{144}{625}$ 且 $U_{256}<\tfrac3{16}<K$，故 [@rem-appm-nyman-rectangle-infimum] 排除 $\tfrac34\le\operatorname{Re}\rho<1$、$\tfrac34\le|\operatorname{Im}\rho|\le1$ 的非平凡零点，包含所列闭边界。这是低高度的教学算例，展示有限有理残差怎样调用零点下界；证据范围限于上述区域，单个有限证书只提供局部排零。
:::

其余窗口与谱扰动的技术证明按所处理的算术对象组织：

- [M.1 幂次采样、窗口质量与辅助素数](ch34-s28-s03-s01-sampling-windows.md)
- [M.2 Möbius 截断与零点谱恢复](ch34-s28-s03-s02-mobius-and-spectra.md)
- [M.3 Mangoldt 临界差额与特征窗口](ch34-s28-s03-s03-mangoldt-and-characters.md)
- [M.4 晚期窗口质量、簇值与谱误差](ch34-s28-s03-s04-late-window-clusters.md)
