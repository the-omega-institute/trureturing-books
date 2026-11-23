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

## A cyclic certificate from interval enclosures

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

### Controlling wraparound across prime moduli

A smaller modulus can count a pair whose lattice gap lies outside the band. Averaging over distinct primes bounds this excess by the number of primes that can divide the shifted gaps of one pair.

::: {.theorem #thm-ch31-prime-cyclic-excess title="Prime moduli bound the total excess collision mass" lean="D5/S3/Fourier/Concentration/PrimeCyclicCollisionBudgets.sum_cyclic_excess_le"}
Let $H$ be a nonnegative integer and $L_H$ the weighted mass of pairs with $|A_m-A_n|\le H$. Use nonnegative weights with total $W=\sum_jw_j$. Suppose every degree-$p$ lattice gap has magnitude at most the natural number $D$. Let $P$ be a finite set of primes at least the natural number $Q\ge2$. If the nonnegative integer $B$ satisfies
$$
Q^{B+1}>\prod_{y=-H}^H|D-y|,
$$
then
$$
0\le \sum_{q\in P}\bigl(C_q(R_q(H))-L_H\bigr)
\le \min(B,|P|)\bigl(W^{2p}-L_H\bigr).
$$
:::

::: proof
Every in-band pair contributes for every modulus. For a pair outside the band, put $d=A_m-A_n$. Each prime that counts it divides $\prod_{y=-H}^H(|d|-y)$, since the band is symmetric. The factors are positive. The product of the distinct primes divides that product and is at least $Q$ to the power of their number. Since $|d|\le D$, the strict bound forces that number to be at most $B$. Sum over the weighted pairs to obtain the result. Gallagher's larger sieve uses the same divisibility step for a single difference. [Gallagher, proof of Theorem 1](https://doi.org/10.4064/aa-18-1-77-81)
:::

The zero residue alone limits how small a cyclic certificate can be. Set $R=\{0\}$ in the character formula. Every term is a nonnegative moment and the term at $k=0$ is $W^{2p}$. Thus $C_q(R_q(H))\ge W^{2p}/q$ for $H\ge0$. To certify the missing-window budget with a single cyclic bound, one therefore needs $q>KN(W/\delta)^{2p}$. For an average over a nonempty set $P$, the same inequality holds with $q$ replaced by the harmonic mean of its moduli.

At the ζ-tail parameters of [the variance bound](ch34-s28-s03-s02-collision-variance.md), this requires $\log q\ge\log N+2p\log\log T-O(p)$ for a single modulus or for the harmonic mean in the average. Evaluating the character sum term by term uses $q$ terms for that modulus. An average needs at least one modulus as large as its harmonic mean. A method to bound the weighted mass at the target resolution with feasible asymptotic cost remains open.

A smaller modulus reduces the number of character terms. One can also keep the modulus $q$ and majorize the band indicator pointwise by a kernel $K$ with few Fourier modes. Let $G=\mathbb Z/q\mathbb Z$ and let $R\subseteq G$ be the band of residues. Suppose $K:G\to\mathbb R$ is nonnegative everywhere and at least $1$ on $R$. Let $S$ contain the support of the discrete Fourier transform of $K$, and write $m=|S|$ and $M=\sum_{x\in G}K(x)$.

Fourier inversion at zero gives the exact identity
$$
mM-qK(0)=\sum_{k\in S}\sum_{x\in G}K(x)\bigl(1-\Re\chi_k(-x)\bigr).
$$
Every term is nonnegative, so
$$
mM-qK(0)\ \ge\ \sum_{k\in S}\sum_{x\in R}\bigl(1-\Re\chi_k(-x)\bigr).
$$
If $0\in R$, the zero-frequency coefficient $M/q$ is at least $1/m$. If $1\in R$ and $S$ contains a nonzero frequency, the right side is strictly positive.

For $K(0)>0$, equality $mM=qK(0)$ holds exactly when $K=K(0)\mathbf 1_H$ for an additive subgroup $H$ of $G$ and $S$ is the annihilator of $H$. Equality forces every selected character to be one wherever $K>0$. Inversion makes $K$ constant at $K(0)$ on the subgroup where all these characters are one. Every frequency in its annihilator has coefficient $M>0$ and therefore belongs to $S$. Conversely, a scaled subgroup indicator and its annihilator make the right side of the identity zero. Subgroup indicators also give equality in the finite-group Fourier support uncertainty principle. [Tao, §1](https://arxiv.org/pdf/math/0308286v6)

For a collision bound using $K$, the zero-frequency term is $(M/q)W^{2p}$. If the real parts of the remaining coefficients are all nonnegative, the full bound is at least $W^{2p}/m$. Coefficients of both signs require a separate estimate of their weighted sum against the high moments of the same spectrum. The mean inequality controls the zero-frequency term.

For actual ζ ordinates, use the tail above $X=e^{-D}T^\beta$ from the preceding section, with $\delta=\log T$ and $g_\gamma=\gamma/r$. For $H=\exp(cT^\beta\log T)$, take $N=\lfloor HT^2/r\rfloor_++1$ to keep the mesh error at most $rB/(2T^2)$. To bound the start, a finite $L=L(T)$ must satisfy the budget $KNE_p(2/L)<(\log T)^{2p}$. The target order $p$ grows on the scale of $T^\beta\log T$. For fixed finite tail and fixed $p$, $E_p(2/L)$ eventually equals the exact collision mass $E_p(0)$ as $L$ increases. Quantifying $L$ requires a weighted bound at positive resolution. Definition 7 in Tao, Trudgian, and Yang counts unweighted quadruples at unit scale, and Theorem 64 gives estimates for fixed $\sigma\ge7/10$. The growing-order weighted bound for the critical-line tail remains open. [Definition 7 and Theorem 64](https://arxiv.org/html/2501.16779v1) · [Research question](https://github.com/the-omega-institute/trureturing/issues/33519)

## What low-order collision masses determine

Move the last frequency in $(0,1,k)$ to $k+\sqrt 2$. Below degree $k$, the counts on the first two coordinates cannot offset a change in the last count. At degree $k$, exactly one additional pair of count vectors can cancel in the integer spectrum.

::: {.theorem #thm-ch31-low-order-collision-agreement title="Equal low-order collision masses permit different high-order decay rates" lean="D5/S3/Fourier/Concentration/LowOrderCollisionAgreement.low_order_agreement_and_high_order_disparity"}
Let $k\ge2$ be an integer. Write $E_p(t)$ and $F_p(t)$ for the ordered-pair collision masses of $(0,1,k)$ and $(0,1,k+\sqrt2)$, respectively, with weights $(1/4,1/4,1/2)$. For every $0\le t<1$,

$$
\begin{aligned}
E_p(t)&=F_p(t) &&(0\le p<k,\ p\in\mathbb Z),\\
E_k(t)&=F_k(t)+2k(1/4)^{k-1}(1/4)^k(1/2).
\end{aligned}
$$

For every positive integer $p$,

$$
\begin{aligned}
E_p(t)&\ge\frac{1}{16k\sqrt p} &&(0\le t<1),\\
F_p(t)&\le\frac2p &&\left(0\le t<\frac{1}{(k+1+\sqrt2)p}\right).
\end{aligned}
$$
:::

::: proof
If the last counts differ at a degree below $k$, the gap in either spectrum is at least $1$. If they agree, a gap below $1$ forces all the counts to agree. At degree $k$, the integer spectrum gains the two ordered pairs between $(0,k,0)$ and $(k-1,0,1)$.

Every nonnegative resolution below $1$ counts only exact collisions for the integer spectrum, so the variance bound at resolution $1/2$ applies. In the irrational spectrum, a gap $a+b\sqrt2$ between distinct count vectors has nonzero integer norm $a^2-2b^2$. Bounding the conjugate factor excludes all such pairs in the stated range of resolutions. The remaining mass is the sum of squared multinomial weights. Each weight factors as two fair binomial probabilities, and the central binomial bound together with symmetry and monotonicity gives a pointwise bound of $2/p$. The full proof is checked by the Lean kernel. [Variance bound](ch34-s28-s03-s02-collision-variance.md#thm-ch31-variance-collision-lower)
:::

The count vector $(p,0,0)$ contributes $(1/4)^{2p}>0$ on the diagonal. Take the common resolution $t_p=1/[2(k+3)p]$. At fixed $k$ the ratio of the two masses there is bounded below by $\sqrt p/(32k)$. These finite spectra limit the high-order bounds one can infer from low-order collision masses alone. A bound for the actual ζ ordinates needs arithmetic information about their frequencies.

### Local statistics on a common lattice

Assign each frequency $g_j$ an integer $m_j\ge0$ and round it down to $\widetilde g_j=2^{-m_j}\lfloor 2^{m_j}g_j\rfloor$, retaining its index and weight. Fix a tail with $N>0$ indices, frequencies in $[a,b]$, and $m_-\le m_j\le m_+$. Write $h=2^{-m_-}$. Each rounding error lies in $[0,h)$, so any difference of two frequencies changes by at most $h$ in absolute value. For $\ell\ge1$ distinct indices, take differences against the first frequency and multiply each by the same scale $\lambda\ge0$. A $K$-Lipschitz test in the maximum norm then changes by at most $K\lambda h$ per tuple. Summing over all ordered tuples and dividing by $N$ bounds the change in the statistic by $K\lambda h(N)_\ell/N$, where $(N)_\ell$ is the falling factorial.

The same rounding puts every frequency on the grid with step $2^{-m_+}$. The coarsest grid is contained in every finer grid, so the integer labels on the finest grid lie in $[A,B]$, where

$$
A=2^{m_+-m_-}\lfloor 2^{m_-}a\rfloor,\qquad B=\lfloor 2^{m_+}b\rfloor.
$$

The degree-$p$ sums have at most $1+p(B-A)$ possible integer positions. Group the multinomial weights by position and apply Cauchy–Schwarz to the group masses. If the total weight is $W>0$, the exact collision mass of the rounded spectrum is at least $W^{2p}/[1+p(B-A)]$. Any pair that collides exactly after rounding had an original gap of at most $ph$, since each degree-$p$ sum has rounding error in $[0,ph]$. [Collision bound for grouped mass](lean:D5/S3/Fourier/Concentration/FiniteSincCollisionMoment.sum_bin_mass_sq_le_nearCollisionMass)

For example, fix $m_j=\lceil(\log_2(2+g_j))^2\rceil$ once for each positive frequency. On shared tail indices with $cT^\alpha\le g_j\le T$, fixed $c,\alpha>0$, $N=O(T\log T)$, and at most polynomial growth of $\lambda$, the change in every such fixed-order statistic tends to zero. Fix $0<\beta<1$. At $p\asymp T^\beta\log T$, the denominator satisfies $\log[1+p(B-A)]=O((\log T)^2)$. If $W\asymp(\log T)^2$ and $\delta=\log T$, the missing-window moment budget requires normalized mass at most $\exp(-2p\log\log T+O(p))$ even with one time sample. The rounded spectrum's exact collision mass already exceeds that budget. The two local statistics use the same tail indices. Separate height cutoffs require accounting for entries that cross the endpoints. The transfer to the original spectrum gives a lower bound at resolution $ph$, and the upper bound at the finer target resolution remains open.

## A finite frequency band forces close sums

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
