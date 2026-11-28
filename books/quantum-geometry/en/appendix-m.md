# Appendix M Arithmetic Windows, Möbius Truncation, and Spectral-Perturbation Proofs {#sec-appendix-m}

In [Section 31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md), we traced the geometric anatomy of the Riemann $\zeta$ function from irreducible prime-arc path integrals ([§31.1.1](ch34-s28-s01-euler-paths.md)) and the critical-line half-density square law ([§31.1.2](ch34-s28-s02-half-density.md)) to the arithmetic `1—3—3—1` concept tower and Weil's explicit duality ([§31.1.3](ch34-s28-s03-explicit-duality.md)), before handing off to arithmetic pivot renormalization in [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md) and the Hermite–Biehler monotonicity lock in [§31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md). The extensive analytic-number-theory proof apparatus built around explicit-formula windows—power sampling and auxiliary primes, Möbius truncation and Fourier recovery, weighted near-collision variance bounds and spectral perturbations, critical Mangoldt gaps, and late-window clusters—is gathered here so the main geometric narrative of [Chapter 31](ch31-arc-calculus-and-riemann-hypothesis.md) remains uninterrupted.

Finite approximation errors provide another kind of window: they restrict the rectangles in which hypothetical zeros could lie. The [annulus certificate in §31.3](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#rem-ch34-nyman-beurling-remainder) is most transparent in the Cayley disk; translating it back to real part and height requires distinguishing endpoints inside the rectangle from limits on its open boundary.

::: {.remark #rem-appm-nyman-rectangle-infimum title="Nyman Rectangle Thresholds for Any Positive Lower Height (Manual derivation)"}
Put $b=\tfrac12+\delta$, where $0<\delta<\tfrac12$, and let $0<h\le T$. On the geometric region

$$
\mathcal R_{\delta,h,T}=\{\beta+i\gamma:b\le\beta<1,\ h\le|\gamma|\le T\}
$$

define

$$
\begin{aligned}
F(\beta,\gamma)&=\frac{(2\beta-1)((1-\beta)^2+\gamma^2)}{(\beta^2+\gamma^2)^2},\\
K(\delta,T)&=\frac{2\delta((\tfrac12-\delta)^2+T^2)}{((\tfrac12+\delta)^2+T^2)^2},
\qquad B(h)=\frac{h^2}{(1+h^2)^2}.
\end{aligned}
$$

Item 4 of [@prop-ch34-nyman-beurling-frozen-facts] guarantees that a nontrivial zero $\rho=\beta+i\gamma$ in this region would force $d_N^2\ge F(\beta,\gamma)$ for every $N\ge0$. The following optimization of that geometric floor is a **manual derivation, not separately checked in Lean**:

$$
\inf_{\mathcal R_{\delta,h,T}}F=\min\{K(\delta,T),B(h)\}>0.
$$

If $K(\delta,T)\le B(h)$, the minimum is attained exactly at $\beta=b$, $|\gamma|=T$. If $B(h)<K(\delta,T)$, the infimum is not attained and is approached as $\beta\uparrow1$ with $|\gamma|=h$. Consequently, after certifying $d_N^2\le U$ for some finite $N$, either of the following conditions excludes nontrivial zeros from this rectangle:

$$
\begin{cases}
U<K(\delta,T),&K(\delta,T)\le B(h),\\
U\le B(h),&B(h)<K(\delta,T).
\end{cases}
$$

**Proof.** Set $y=(2\beta-1)/(\beta^2+\gamma^2)$, so that $F=y(1-y)$. Write $y_-=2\delta/(b^2+T^2)$ and $y_+=1/(1+h^2)$. Direct cross multiplication gives

$$
\begin{aligned}
y-y_-&=\frac{(\beta-b)(\beta+b-2\beta b+2T^2)+(2b-1)(T^2-\gamma^2)}{(\beta^2+\gamma^2)(b^2+T^2)}\ge0,\\
y_+-y&=\frac{(1-\beta)^2+2h^2(1-\beta)+(\gamma^2-h^2)}{(1+h^2)(\beta^2+\gamma^2)}>0.
\end{aligned}
$$

In the first identity, $\beta+b-2\beta b=\beta(1-b)+b(1-\beta)>0$, so equality holds exactly at $\beta=b$, $|\gamma|=T$. Thus $0<y_-\le y<y_+<1$, with $K=y_-(1-y_-)$ and $B=y_+(1-y_+)$. The identity

$$
K-B=(y_--y_+)(1-y_--y_+)
$$

shows that $K\le B$ is equivalent to $y_-+y_+\le1$. In this case,

$$
F-K=(y-y_-)(1-y-y_-)\ge0,
$$

where the second factor is strictly positive, so equality holds exactly at the stated rectangle endpoints. If $B<K$, then $y_-+y_+>1$ and

$$
F-B=(y_+-y)(y+y_+-1)>0.
$$

Keeping $|\gamma|=h$ and taking $\beta\uparrow1$ gives $y\to y_+$ and $F\to B$. This proves the infimum and its attainment classification; combining it with $F\le d_N^2\le U$ gives the exclusion conditions. $\square$

The open boundary allows $U=B(h)$ in the second case. The first case, including $K=B$, still requires a strict inequality because the geometric floor attains equality inside the rectangle. Optimality here concerns $F$ alone; it does not assert that actual distances or zeros attain these geometric values. A squared-error upper bound from any finite trial coefficients still suffices for $U$, without computing the optimal projection.

For example, $\delta=h=\tfrac14$, $T=2$ gives $B=\tfrac{16}{289}<K=\tfrac{520}{5329}$, so $U\le\tfrac{16}{289}$ already excludes this rectangle. This is only a threshold example; no trial error reaching it has been computed here. Taking $h=1$ gives $y_+=\tfrac12$ and hence always $K<B$, recovering the upper-height endpoint threshold. Conversely, $B(h)\to0$ as $h\downarrow0$, so removing the positive lower height does not preserve a uniform positive threshold.
:::

The remaining window and spectral-perturbation proofs are organized by their arithmetic objects:

- [M.1 Power sampling, window mass, and auxiliary primes](ch34-s28-s03-s01-sampling-windows.md)
- [M.2 Möbius truncation and zero-spectrum recovery](ch34-s28-s03-s02-mobius-and-spectra.md)
- [M.3 Critical Mangoldt gaps and character windows](ch34-s28-s03-s03-mangoldt-and-characters.md)
- [M.4 Late-window mass, cluster values, and spectral errors](ch34-s28-s03-s04-late-window-clusters.md)
