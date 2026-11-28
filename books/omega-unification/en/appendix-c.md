# Appendix C An Explicit Constant for the Fixed Haar Window

Let $W$ be the fixed four-phase acceptance region of Chapter 2. Let $A_W(T)$ count its positive zero ordinates through height $T$, with multiplicity. Under RH, the calculation below (`ARGUED`) gives

$$
\left|A_W(T)-\frac{T}{4\pi^2}\left(\log\frac{T}{2\pi}-1\right)\right|\le 10^9T\qquad(T\ge1).
$$

This bound applies to the [partial summation in Chapter 12](ch12-shared-arithmetic-clock.md#rem-ou-ch12-windowed-rate) at every starting height $H\ge1$. The size of the constant determines the height at which the resulting readout estimate becomes informative.

## C.1 The Landau Sum with a Sharp Height Cutoff {#the-landau-sum-with-a-sharp-height-cutoff}

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

## C.2 Bounds for the Brackets and Fourier Sums {#bounds-for-the-brackets-and-fourier-sums}

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

## C.3 Shrinking Windows for the Two Clocks {#sec-ou-appc-shrinking-windows}

**Hand derivation (ARGUED).** Let $D$ be a disc, square, or diamond in the normalized two-clock torus, obtained by scaling a fixed shape by $r$ and translating it. Put $L=\log T$ and $n=\lfloor\kappa L\rfloor$ for a sufficiently small fixed $\kappa>0$. For sufficiently small $r$ with $r\ge1/n$,

$$
\#\{0<\gamma\le T:\ b\gamma\bmod 1\in D\}
  = N(T)\mu(D)+O(Tr+TL^{-2}),
$$

where $b=(\theta_{724}-\theta_{244},\theta_{804}-\theta_{244})/(2\pi)$. The count includes multiplicities and the error is uniform in the window's position. As $\mu(D)\asymp r^2$, the relative error tends to zero whenever $r(T)\log T\to\infty$.

The width-$1/n$ boundary tube has area comparable to $r/n$. Convolve it with the slower-decaying kernel to obtain $0\le B\le1$ with mean $w_0\asymp r/n$. Smooth the indicator with the faster kernel and add or subtract a constant multiple of $B$ to form brackets $P^\pm$ of mean $\mu(D)+O(r/n)$. All three polynomials have a frequency box of radius $O(n)$ and are uniformly bounded on the real torus. Under an imaginary displacement $y$ in direction $b$, their second derivatives are bounded by $Cn^2e^{Cn|y|}B$, with $B$ evaluated at the real point. For the fast kernel, subtracting the indicator at the real point in the differentiated convolution restricts the displacements to those that can cross the boundary. The lower bound for $B$ uses the ball of radius $1/(2n)$ about a nearest boundary point, which lies within the tube. On the real line its first derivative also satisfies $|B'|\le CnB$. These constants are uniform in the scale and position of the window. [Boundary tube and bandlimited kernels](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7233283092)

**Landau sums at complex shifts.** Write $\lambda_k=2\pi k\cdot b$. Zero symmetry and conjugation reduce the sum to positive frequencies. For the nearest prime power $q\le L^A$, with $A$ any fixed constant, Baker's logarithmic-form estimate with algebraic coefficients gives $|\lambda_k-\log q|\ge\exp[-O_A((1+\log L)^C)]$. Use the two fixed purely imaginary clock logarithms and the real logarithm $\log q$, with coefficient $i$ on the latter. The form is nonzero because equality would identify the algebraic $e^{i\lambda_k}$ with $q^i$, which is transcendental by Gelfond–Schneider for $q>1$. Low prime powers therefore lie outside the $T^{-1/3}$ window around a matching frequency. For $q>L^A$ even a near match contributes at most $O_A(T\log L\,L^{-A/2})$ after normalization. There are $O(L^2)$ modes, so taking $A$ large suffices. Away from the near matches use $|J_T(v)|\le2/|v|$ and the existing power savings in the Landau error for small bandwidth. For $F=B,P^\pm$, the sum at complex shifts is consequently $N(T)\int F+O(TL^{-2})$. [Baker, *A sharpening of the bounds for linear forms in logarithms* (1972), p. 117](https://doi.org/10.4064/aa-21-1-117-129) · [Frequency and prime-power estimates in Chapter 12](ch12-shared-arithmetic-clock.md)

**Weighted zero counts and real evaluation.** Apply the weighted mean-square argument of Chapter 12 on dyadic height blocks $[X,2X]$, keeping the dependence on $w_0$. Near the critical line, the error of the nonzero clock modes is $Xw_0$ times any prescribed inverse power of the logarithm, because $|\widehat B(k)|\le w_0$. The frequency spacing bounds the weight integral on a fixed enlargement of the block by $O(Xw_0)$. Away from the critical line, using $B\le1$ loses the weight factor, which the larger strip cutoff absorbs since $w_0\gg L^{-2}$. For $X\ge T^{3/4}$ and $u\ge2/L$, test Green's identity at $1/2+2u/3$. The line and area integrals are both $O(Xw_0e^{-cu\log X})$, and the test function at each counted zero is at least $u/3\ge2/(3L)$. Sum over the dyadic blocks. The zeros below $T^{3/4}$ contribute at most $O(T^{3/4}L)$. Since $w_0\gg L^{-2}$, choosing the decay constant $0<c_1<1/2$ absorbs this term and gives

$$
\sum_{0<\gamma\le T,\,\lvert\beta-1/2\rvert\ge u}
 B(b\gamma) \ll TLw_0e^{-c_1uL}\qquad(2/L\le u\le1/2).
$$

First-order terms cancel between symmetric zeros at each height. The inner strip contributes at most a quarter of the real-axis sum of $B$. Integrating $u^2e^{Cnu}$ against the outer tail and multiplying by $n^2$ gives $O(TLw_0)$. Apply this comparison to $B$ first to absorb the inner-strip error, then to the brackets $P^\pm$. The $O(N(T)r/n)$ error in their means and the error from the return to the real axis give the stated bound. [Weighted second moment and Green's identity](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7234629760) · [Dyadic height cutoff](https://github.com/the-omega-institute/trureturing-books/issues/1637#issuecomment-7234728563)
