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

A concrete rational trial now reaches an exclusion threshold, making the connection between a residual certificate and zero geometry accessible by hand.

::: {.example #ex-appm-nyman-rational-trial title="A Three-Term Rational Trial Certificate (Manual derivation)"}
With $\chi,\rho_k,d_N$ as in [@prop-ch34-nyman-beurling-frozen-facts], take

$$
\begin{aligned}
q&=(-1,1,\tfrac32),& v&=-\rho_1+\rho_2+\tfrac32\rho_3,\\
S&=\sum_{k=1}^3\frac{q_k}{k}=-1+\tfrac12+\tfrac12=0,&
R&=\int_0^\infty|\chi(x)-v(x)|^2\,dx.
\end{aligned}
$$

The integrals, finite sums, and exclusion steps below are **manual derivations, not separately checked in Lean**. For $x>1$, $v(x)=S/x=0$, so that tail vanishes exactly. On $1/(j+1)<x<1/j$ with $j\ge1$, we have $\lfloor1/(kx)\rfloor=\lfloor j/k\rfloor$, giving

$$
\begin{aligned}
\chi(x)-v(x)&=1-S/x+\sum_{k=1}^3q_k\lfloor j/k\rfloor=A_j,\\
A_j&=1-j+\lfloor j/2\rfloor+\tfrac32\lfloor j/3\rfloor,\\
A_{j+6}&=A_j,\qquad (A_0,A_1,A_2,A_3,A_4,A_5)=(1,0,0,\tfrac12,\tfrac12,-\tfrac12).
\end{aligned}
$$

The breakpoints form a null set. Take $M=256$ and use $|\chi-v|\le1+\sum_k|q_k|=\tfrac92$ to bound the part $0<x<1/M$. This gives a certificate involving rational numbers alone:

$$
\begin{aligned}
I_{256}&=\sum_{j=1}^{255}\frac{A_j^2}{j(j+1)},\\
d_3^2&\le R\le U_{256}:=I_{256}+\frac{81}{1024}.
\end{aligned}
$$

The threshold comparison needs no large denominator for the finite sum. Put $w_j=1/(j(j+1))$. The first six terms sum to $11/168$. Every full block of six starting at $j=6m+1$ has the increasing square sequence $(0,0,\tfrac14,\tfrac14,\tfrac14,1)$, whose mean is $7/24$, while $w_j$ decreases. For the block entries $a_i=A_{6m+i}^2$ and $w_{6m+i}$,

$$
\sum_{i=1}^6a_iw_{6m+i}-\frac7{24}\sum_{i=1}^6w_{6m+i}
=\frac16\sum_{1\le i<k\le6}(a_i-a_k)(w_{6m+i}-w_{6m+k})\le0.
$$

The indices $j=7$ through $252$ form full blocks. The final three squares, at $j=253,254,255$, are $0,0,\tfrac14$, each at most $7/24$. Using $w_j=1/j-1/(j+1)$ gives

$$
\begin{aligned}
I_{256}&\le\frac{11}{168}+\frac7{24}\left(\frac17-\frac1{256}\right)<\frac3{28},\\
U_{256}&<\frac3{28}+\frac{81}{1024}=\frac{1335}{7168}<\frac3{16}.
\end{aligned}
$$

Item 4 of [@prop-ch34-nyman-beurling-frozen-facts] therefore excludes zeros with $\tfrac12<\operatorname{Re}\rho<1$ and $\tfrac14\le|1-1/\rho|^2\le\tfrac34$: that annulus would force $d_3^2\ge\tfrac3{16}$. For the rectangle interpretation take $\delta=\tfrac14$, $h=\tfrac34$, $T=1$. Then $K=\tfrac{136}{625}<B=\tfrac{144}{625}$ and $U_{256}<\tfrac3{16}<K$, so [@rem-appm-nyman-rectangle-infimum] excludes nontrivial zeros with $\tfrac34\le\operatorname{Re}\rho<1$ and $\tfrac34\le|\operatorname{Im}\rho|\le1$, including the stated closed boundaries. This is a teaching example at low height, showing how a finite rational residual invokes a zero-induced floor. Its evidence covers the stated regions; a single finite certificate provides local exclusion.
:::

The remaining window and spectral-perturbation proofs are organized by their arithmetic objects:

- [M.1 Power sampling, window mass, and auxiliary primes](ch34-s28-s03-s01-sampling-windows.md)
- [M.2 Möbius truncation and zero-spectrum recovery](ch34-s28-s03-s02-mobius-and-spectra.md)
- [M.3 Critical Mangoldt gaps and character windows](ch34-s28-s03-s03-mangoldt-and-characters.md)
- [M.4 Late-window mass, cluster values, and spectral errors](ch34-s28-s03-s04-late-window-clusters.md)
