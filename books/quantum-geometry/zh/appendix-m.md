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

其余窗口与谱扰动的技术证明按所处理的算术对象组织：

- [M.1 幂次采样、窗口质量与辅助素数](ch34-s28-s03-s01-sampling-windows.md)
- [M.2 Möbius 截断与零点谱恢复](ch34-s28-s03-s02-mobius-and-spectra.md)
- [M.3 Mangoldt 临界差额与特征窗口](ch34-s28-s03-s03-mangoldt-and-characters.md)
- [M.4 晚期窗口质量、簇值与谱误差](ch34-s28-s03-s04-late-window-clusters.md)
