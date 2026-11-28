# Appendix C An Explicit Constant for the Fixed Haar Window

Let $W$ be the fixed four-phase acceptance region of Chapter 2. Let $A_W(T)$ count its positive zero ordinates through height $T$, with multiplicity. Under RH, the calculation below (`ARGUED`) gives

$$
\left|A_W(T)-\frac{T}{4\pi^2}\left(\log\frac{T}{2\pi}-1\right)\right|\le 10^9T\qquad(T\ge1).
$$

This bound applies to the [partial summation in Chapter 12](ch12-shared-arithmetic-clock.md#rem-ou-ch12-windowed-rate) at every starting height $H\ge1$. The size of the constant determines the height at which the resulting readout estimate becomes informative.

## The Landau sum with a sharp height cutoff

Put $J_T(v)=\int_0^T e^{ivt}\,dt$. For $x>1$, let $q$ be the nearest prime power to $x$, with either choice allowed at a tie. For $T\ge2$,

$$
\left|\sum_{0<\gamma\le T}x^\rho+
 \frac{\Lambda(q)}{2\pi}J_T\bigl(\log(x/q)\bigr)\right|
\le 10^6\left[x\log^2(3xT)+\frac{\log(2T)}{\log x}\right],
$$

where $\rho=\beta+i\gamma$ is counted with multiplicity and $\Lambda$ is the von Mangoldt function. This estimate for the sum of powers holds unconditionally.

Set $\lambda=\log x$, $\sigma=1+1/\log(3x)$ and $s=\sigma+it$. The Hadamard product of the completed zeta function gives

$$
\sum_{\rho}\frac{\sigma-\beta}{(\sigma-\beta)^2+(t-\gamma)^2}
=\Re\left(\frac1s+\frac1{s-1}-\frac{\log\pi}{2}
 +\frac12\psi(s/2)+\frac{\zeta'}{\zeta}(s)\right).
$$

Multiply by $e^{i\lambda t}$, integrate over $[0,T]$, and rescale by $x^\sigma/\pi$. Each kernel on the left has whole-line Fourier integral $\pi e^{-(\sigma-\beta)\lambda}e^{i\lambda\gamma}$. Replace its finite integral by the whole-line value for $0<\gamma\le T$ and by zero otherwise. The explicit total-zero count gives at most $50\log(3+|u|)$ signed ordinates in a unit interval centered at $u$. For $|\gamma|\le2T$, the Poisson tail bounds each replacement error by $8/(1+|\gamma|)+8/(1+|\gamma-T|)$, including $\gamma=T$. Grouping by integer distances from the endpoints bounds their total by $1600\log(8T)(1+\log(4T))$. On $R<|\gamma|\le2R$, $R=2^{j+1}T$, there are at most $200R\log(4R)$ ordinates and each error is at most $8T/R^2$. These shells cost at most $1600(\log(8T)+\log2)$. The sum of both errors before rescaling is less than $10^5\log^2(2T)$. [Explicit count, Corollary 1.2](https://doi.org/10.1016/j.jnt.2021.06.032)

The real parts of the two pole terms decrease for $t\ge0$, and the real part of the digamma term increases. In the identity $\Re\psi(u+iv)-\psi(u)=\sum_{m\ge0}v^2/((m+u)((m+u)^2+v^2))$, split the sum at $\lceil T\rceil$ for $1/2\le u\le1$ and $0\le v\le T/2$. The variation is at most $5+\log(2T)$ and $|\psi(u)|<3$. Integration by parts bounds the integral of these terms and the constant term by $30(\log(3x)+\log(2T))/\lambda$ before rescaling.

Expanding $\Re(\zeta'/\zeta)$ gives $J_T(\lambda\pm\log n)$ with coefficient $-\Lambda(n)(x/n)^\sigma/(2\pi)$ for $n\ge2$. For the plus signs and for minus signs outside $[x/2,2x]$, use $|J_T(v)|\le2/|v|$ and $\sum_{n\ge2}\log n/n^\sigma\le(\sigma-1)^{-2}+(\log2)/(\sigma-1)$. The latter follows by integrating $\log(t+1)t^{-\sigma}$ on $[n-1,n]$. Retain $q$ in $[x/2,2x]$. Among the remaining prime powers, the $j$th closest lies at distance at least $j/2$. Here $|\log(x/n)|\ge|x-n|/(2x)$ and $(x/n)^\sigma\le4$, giving a total at most $32x\log(2x)(1+\log(2x+1))$. Finally, $|(x/q)^\sigma-1|\le8|\log(x/q)|$, so replacing the retained coefficient by $-\Lambda(q)/(2\pi)$ costs at most $16\log(2x)$. Combining these estimates with $x^\sigma\le ex$ gives the stated bound. [Uniform Landau formula](https://arxiv.org/abs/0805.2745)

## Bounds for the brackets and Fourier sums

Use unit-period coordinates and the supremum distance on the torus. The threshold $F=\sin^2p\sin^2q|\sin v|$ has Lipschitz constant at most $6\pi$ on the three-dimensional base, with the angles in radians. A tube of radius $r$ about the seam $u=0$ has vertical width at most $2r$. The tube about the graph $u=F$ has width at most $2(1+6\pi)r$ in each vertical fiber. The tube about $\partial W$ thus has volume less than $42r$.

For $K\ge1$ set $n=\lfloor K/2\rfloor+1$. Let $J$ be the product of four normalized squared Fejér kernels. The integral of each squared kernel before normalization is $(2n^2+1)/(3n)$. The inequality $\sin(\pi t)\ge2t$ for $0\le t\le1/2$ and a union bound give mass at most $\min(1,1/(4n^3r^3))$ outside the box of radius $r$. Put $\phi(z)=(1+n\,d(z,\partial W))^{-2}$. Then $|J*\mathbf1_W-\mathbf1_W|\le4\phi$. The box of radius $1/n$ has mass at least $3/4$, and shifts within this box preserve at least one-quarter of $\phi(z)$. Therefore $P_K^\pm=J*\mathbf1_W\pm32J*\phi$ bracket the indicator pointwise and have frequencies $\|k\|_\infty\le K$. The tube bound gives $\int\phi\le42/n$ and hence

$$
\|P_K^\pm-\mathbf1_W\|_1\le3024/K,\qquad
\|P_K^\pm-\mathbf1_W\|_2\le400/\sqrt K,\qquad
\|P_K^\pm\|_\infty\le33.
$$

The analogous brackets of degree $M-1$ bound the Fourier tail of $\mathbf1_W$. The coefficient $\ell^2$ norm of either degree-$K$ bracket on $M\le\|k\|_\infty<2M$ with $M\le K$ is at most $1000/\sqrt M$. For $M=1$, use the bound on the full norm.

Write $y=\log T\ge24000$ and $K=\lfloor y/12000\rfloor$. The field norm bound in Chapter 12 gives spacing greater than $2T^{-1/3}$ between distinct positive frequencies, $1/|\lambda_k|\le T^{1/6}$ for nonzero modes, and $e^{|\lambda_k|}\le T^{1/500}$. Under RH divide the Landau estimate by $\sqrt x$. After weighting by Fourier coefficients of total absolute mass at most $33(2K+1)^2$, the error terms and main terms with $|\lambda_k-\log q|\ge T^{-1/3}$ together cost at most $3\cdot10^{10}y^4e^{-2y/3}T<T$.

Each prime power matches at most one positive frequency close to resonance. In the shell $M=2^r$ there are at most $S=(5M)^4$ matching integers. Since $\log^2 n/n$ decreases for $n\ge S$, splitting at $S$ gives $\sum_q\Lambda(q)^2/q\le\log^2 S(2+\log S)$. Near resonance $1/x\le e/q$. Cauchy–Schwarz and the shell norm bound give a positive-frequency contribution divided by $T$ of at most $10^6(r+1)^2\,2^{-r/2}$ per shell. Negative frequencies contribute the conjugate. Since $\sum_{r\ge0}(r+1)^2\,2^{-r/2}<100$, the near-resonance terms cost at most $2\cdot10^8T$.

Here $K\ge y/24000$ and $N(T)\le Ty$, so the error in the constant term is at most $96\cdot10^6T$. Substituting $\mu(W)=1/(2\pi)$ and the explicit total-zero count adds less than $T$. For $1\le T\le e^{24000}$ the same count and $0\le A_W(T)\le N(T)$ already bound the error by $10^5T$, using $N(e)$ for $T<e$. These two ranges give the stated constant.
