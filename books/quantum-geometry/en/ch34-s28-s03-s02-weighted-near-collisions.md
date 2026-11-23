# M.2.2 Weighted near-collisions and the range of missing-window starts {#weighted-near-collisions-and-the-range-of-missing-window-starts}

Finite tail moments give arbitrarily late missing windows. To bound how far the start lies beyond a given lower time, we need to know how close the frequency sums are at finite resolution. The closer two sums are, the longer it takes for their phase difference to average away.

Let $J$ be a finite index set with $g,w:J\to\mathbb R$ and $w_j\ge0$. Write $Z(t)=\sum_j w_j e^{ig_jt}$. For every nonnegative integer vector $m$ with $\sum_jm_j=p$, set

$$
G_m=\sum_j m_j g_j,\qquad c_m=\binom{p}{m}\prod_j w_j^{m_j},\qquad
E_p(\eta)=\sum_{m,n:\,|G_m-G_n|\le\eta}c_mc_n.
$$

The sum retains all ordered pairs, including $m=n$ and distinct vectors with equal frequency. Let $M_L(s)$ be the average of $|Z(s+x+y)|^{2p}$ when $x,y$ are independent and uniform on $[-L/2,L/2]$.

::: {.theorem #thm-ch31-weighted-tail-moment-comparison title="Finite-time moments and weighted near-collision mass" lean="D5/S3/Fourier/Concentration/FiniteSincCollisionMoment.tail_moment_comparison"}
For the finite data above, any natural number $p$, any $L>0$, and any $s\in\mathbb R$, set $K=3+\pi^2/3$. Then

$$
\sin^2(1) E_p(2/L)\le M_L(0),\qquad M_L(s)\le M_L(0)\le K E_p(2/L).
$$
:::

::: proof
Expand $Z^p\overline Z^p$. Each ordered pair has angular frequency $\Delta=G_m-G_n$. Each of the two independent uniform offsets contributes a factor $\operatorname{sinc}(L\Delta/2)$. Taking the real part gives $\cos(s\Delta)\operatorname{sinc}^2(L\Delta/2)$. The cosine is at most one, so the average is maximal at $s=0$. Concavity of sine on $[0,1]$ and evenness of sinc give a squared factor of at least $\sin^2(1)$ when $|\Delta|\le2/L$.

Group the $G_m$ into bins of width $2/L$, and write $b_k$ for the sum of coefficients in bin $k$. Two bins separated by $d\ge2$ have squared factors at most $(d-1)^{-2}$. The same and adjacent bins use the bound $1$. Each row of these bounds sums to at most $3+2\sum_{n\ge1}n^{-2}=K$. The inequality $2b_kb_\ell\le b_k^2+b_\ell^2$ bounds the average by $K\sum_k b_k^2$. Every same-bin frequency difference is smaller than the bin width, so $\sum_k b_k^2\le E_p(2/L)$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-bounded-tail-window-start title="A bounded range for the missing-window start" lean="D5/S3/Fourier/Concentration/FiniteSincCollisionMoment.exists_bounded_tail_window"}
For the same finite data, a natural number $p$, a positive integer $N$, $L>0$, $\delta\ge0$, and real $H,A$, put $B=\sum_j w_j|g_j|$. If $KNE_p(2/L)<\delta^{2p}$, there is an $a\in(A,A+2L)$ such that

$$
\left|\sum_j w_j\sin(g_jt)\right|<\delta+\frac{HB}{2N}\qquad(t\in[a,a+H]).
$$
:::

::: proof
Use two uniform offsets around $A+L$ to average the sum of moments at all $N$ grid points. The upper moment bound and the strict budget give an average below $\delta^{2p}$. A common start therefore has $|Z|<\delta$ at every grid point. The two offsets can both be taken in the open interval, giving $A<a<A+2L$. The absolute imaginary part is bounded by the complex modulus, and the slope pays for the distance to a grid point. When $H>0$, use the midpoints of $N$ equal subintervals. Every point of the closed window is within $H/(2N)$ of a midpoint. At $H=0$ each grid point equals the start. When $H<0$, the window is empty. The full proof is checked by the Lean kernel.
:::

### A cyclic certificate from interval enclosures

Take integers $a_j$ and a step $s$ with certified errors $|g_j-sa_j|\le e$. For each degree-$p$ vector put $A_m=\sum_jm_ja_j$. With the same coefficients $c_m$ as in $E_p$, let $C_q(R)$ be the sum of $c_mc_n$ over ordered pairs with $A_m-A_n\bmod q\in R$. Write $R_q(H)$ for the image of the integer interval $[-H,H]$ modulo $q$. The image counts each residue once and is empty for $H<0$.

::: {.theorem #thm-ch31-cyclic-collision-upper title="Enclosures give an upper collision bound" lean="D5/S3/Fourier/Concentration/CyclicCollisionCertificate.tailCollisionMass_le_cyclic"}
For nonnegative weights and $e\ge0$, if $s>0$ and $H=\lfloor (t+2pe)/s\rfloor$, then
$$
E_p(t)\le C_q(R_q(H)).
$$
:::

::: proof
The error on the signed gap is bounded by $e\sum_j|m_j-n_j|\le2pe$. Thus a real gap of magnitude at most $t$ implies $|A_m-A_n|\le(t+2pe)/s$. The lattice gap is an integer, so its residue belongs to $R_q(H)$. Every pair has nonnegative weight.
:::

::: {.theorem #thm-ch31-cyclic-collision-lower title="A spread bound excludes modular wraparound" lean="D5/S3/Fourier/Concentration/CyclicCollisionCertificate.cyclicCollisionMass_le_tail_of_no_wrap"}
For nonnegative weights, $s,e\ge0$, and integers $l,u,H$, assume $a_j\in[l,u]$ for every $j$ and $p(u-l)+H<q$. Then
$$
C_q(R_q(H))\le E_p(sH+2pe).
$$
:::

::: proof
The lattice gap has magnitude at most $p(u-l)$. If it has a representative $z\in[-H,H]$, their difference is a multiple of $q$ of magnitude less than $q$, so the gap equals $z$. The coordinate errors add at most $2pe$ to the real gap.
:::

::: {.theorem #thm-ch31-cyclic-collision-fourier title="A finite character average evaluates the collision mass" lean="D5/S3/Fourier/Concentration/CyclicCollisionCertificate.cyclicCollisionMass_fourier"}
For a positive integer $q$, let $\chi_k(x)=\exp(2\pi i kx/q)$ and $S(k)=\sum_jw_j\chi_k(a_j)$. For any real weights and any set of residues $R$,
$$
qC_q(R)=\sum_{k\bmod q}|S(k)|^{2p}\sum_{y\in R}\chi_k(-y).
$$
:::

::: proof
Expand $S(k)^p$ by degree vectors and multiply by its complex conjugate. Summing the resulting characters over $k$ retains precisely the terms with $A_m-A_n=y\bmod q$. The same isolation of frequency differences appears in the continuous character average of the riemann-hypothesis repository. [Character averaging, lines 32–78](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78)
:::

For $p\ge1$ and $t>0$, a nearest lattice point at step $s=t/(4p)$ has error at most $s/2$. With $e=s/2$ the band has $H=5p$. If the real frequencies lie in an interval of width $D$, the integer coordinates have spread $u-l\le D/s+1$, so $q>4p^2D/t+6p$ suffices. These choices give $E_p(t)\le C_q(R_q(5p))\le E_p(3t/2)$. For fixed ζ ordinates, the input needs certified coordinate enclosures and weights. Rigorous interval arithmetic is known for finite-height zero computations. The modulus above is a sufficient size for evaluating the whole character sum, and grows inversely with $t$ for fixed $p,D$. Obtaining the required bound at the growing degree and exponentially small resolution with a feasible computation remains open. [Platt and Trudgian, finite-height verification](https://arxiv.org/abs/2004.09765)

For actual ζ ordinates, use the tail above $X=e^{-D}T^\beta$ from the preceding section, with $\delta=\log T$ and $g_\gamma=\gamma/r$. For $H=\exp(cT^\beta\log T)$, take $N=\lfloor HT^2/r\rfloor_++1$ to keep the mesh error at most $rB/(2T^2)$. To bound the start, a finite $L=L(T)$ must satisfy the budget $KNE_p(2/L)<(\log T)^{2p}$. The target order $p$ grows on the scale of $T^\beta\log T$. For fixed finite tail and fixed $p$, $E_p(2/L)$ eventually equals the exact collision mass $E_p(0)$ as $L$ increases. Quantifying $L$ requires a weighted bound at positive resolution. Definition 7 in Tao, Trudgian, and Yang counts unweighted quadruples at unit scale, and Theorem 64 gives estimates for fixed $\sigma\ge7/10$. The growing-order weighted bound for the critical-line tail remains open. [Definition 7 and Theorem 64](https://arxiv.org/html/2501.16779v1) · [Research question](https://github.com/the-omega-institute/trureturing/issues/33519)

### A finite frequency band forces close sums

Let $J$ have $N$ elements, with all $g_j\in[a,b]$. Write $F(m)=\sum_jm_jg_j$. There are $M=\binom{N+p-1}{p}$ count vectors of degree $p$.

::: {.theorem #thm-ch31-degree-spectrum-packing title="A finite band contains two close equal-degree sums" lean="D5/S3/Fourier/Concentration/DegreeSpectrumPacking.exists_close_degree_vectors"}
If $M\ge2$, there are distinct nonnegative integer vectors $m,n$ each of degree $p$ such that
$$
|F(m)-F(n)|\le \frac{p(b-a)}{M-1}.
$$
:::

::: proof
A repeated sum gives a gap of zero. Otherwise order the $M$ sums in $[pa,pb]$. The smallest adjacent gap is at most $p(b-a)/(M-1)$. With two frequencies at the endpoints $a,b$, the sums form an arithmetic progression and attain the bound.
:::

Fix $0<\beta<1$ and take $X=e^{-D}T^\beta$. A positive lower proportion of the zeros are simple and lie on the critical line. The Riemann–von Mangoldt formula gives $N(T)\asymp T\log T$, and the number of zeros below $X$ is $o(T\log T)$. Thus the tail contains at least a constant times $T\log T$ distinct ordinates. For $p\asymp T^\beta\log T$,
$$
\log M\ \ge\ p\log(N/p)\ \gtrsim\ T^\beta(\log T)^2,
$$
using $M\ge(N/p)^p$ from the product formula for the multiset coefficient. The frequencies $g_\gamma=\gamma/r$ lie in a band of width at most $T/r$. For each fixed $c>0$ and sufficiently large $T$, distinct degree-$p$ vectors must therefore collide within resolution $\exp(-cT^\beta\log T)$. The needed arithmetic estimate must control the total weight of those pairs and allow individual near-collisions. [Proportion of simple zeros, §§1.1 and 8](https://arxiv.org/html/1802.10521)
