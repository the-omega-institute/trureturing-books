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

Multiplying primes from $P$ requires a pair to use a single band shift across every factor. For example, let $H=1$ and $d=6$. Modulo $3$ the shift can be $0$, and modulo $5$ it can be $1$. Modulo $15$, the residue of $6$ matches none of $-1$, $0$, or $1$.

::: {.theorem #thm-ch31-prime-product-excess title="Collision excess across products of primes" lean="D5/S3/Fourier/Concentration/PrimeProductCollisionBudgets.sum_prime_product_cyclic_excess_le"}
Let $r,B_0$ be nonnegative integers with $D+H<Q^{B_0+1}$, using the same $P,Q,H,D,L_H,W$ and nonnegative weights as above. For each $r$-element subset $S\subseteq P$, write $q_S=\prod_{q\in S}q$. The total excess mass for these product moduli satisfies

$$
\begin{aligned}
0 &\le \sum_{\substack{S\subseteq P\\|S|=r}}\bigl(C_{q_S}(R_{q_S}(H))-L_H\bigr)\\
  &\le \min\!\left\{\binom{|P|}{r},(2H+1)\binom{\min(B_0,|P|)}{r}\right\}
    (W^{2p}-L_H).
\end{aligned}
$$
:::

::: proof
For an off-band gap $d$, fix $y\in[-H,H]\cap\mathbb Z$. Whenever a subset $S$ uses $y$ as its common shift, every prime in $S$ divides the same nonzero integer $d-y$. Because $|d-y|\le D+H$, at most $B_0$ primes from $P$ can divide it. Counting subsets for each shift and taking the union over the $2H+1$ shifts bounds the multiplicity of an off-band pair. Summing with the pair weights gives the bound. If $r>B_0$, every selected product modulus gives exactly the lattice band mass $L_H$.

The full proof is checked by the Lean kernel.
:::

The zero residue alone limits how small a cyclic certificate can be. Set $R=\{0\}$ in the character formula. Every term is a nonnegative moment and the term at $k=0$ is $W^{2p}$. Thus $C_q(R_q(H))\ge W^{2p}/q$ for $H\ge0$. To certify the missing-window budget with a single cyclic bound, one therefore needs $q>KN(W/\delta)^{2p}$. For an average over a nonempty set $P$, the same inequality holds with $q$ replaced by the harmonic mean of its moduli. This restriction also applies to the product moduli.

At the ζ-tail parameters of [the variance bound](ch34-s28-s03-s02-collision-variance.md), this requires $\log q\ge\log N+2p\log\log T-O(p)$ for a single modulus or for the harmonic mean in the average. Evaluating the character sum term by term uses $q$ terms for that modulus. An average needs at least one modulus as large as its harmonic mean. A method to bound the weighted mass at the target resolution with feasible asymptotic cost remains open.

The collision masses for two separate moduli do not determine their joint mass, even when the complete marginal laws are known. Modulo six, take $P$ with weights $1/2,1/4,1/4$ at residues $0,3,4$, and $Q$ with weights $3/4,1/4$ at $0,1$. Both reduce to $(3/4,1/4)$ modulo two and $(3/4,1/4,0)$ modulo three. Let $A_p$ be the product of the two marginal collision masses for independent $p$-fold sums, and let $E_p(P),E_p(Q)$ be their respective collision masses modulo six. For $p\ge1$,

$$
\begin{aligned}
E_p(P)-A_p&=\frac{(1/16)^p-(7/64)^p}{3}<0,\\
E_p(Q)-A_p&=\frac{(13/16)^p-(7/64)^p}{3}>0.
\end{aligned}
$$

By [@thm-ch31-cyclic-collision-fourier], the collision mass at residue zero averages the $p$th powers of the six squared character magnitudes. Set $\omega=e^{2\pi i/6}$. At mixed frequency $1$, the amplitude for $P$ is $1/2+\omega^3/4+\omega^4/4=(1+\omega^4)/4$, and the amplitude for $Q$ is $(3+\omega)/4$. Their squared magnitudes are $1/16$ and $13/16$. Frequency $5$ gives the conjugate of each amplitude. The nontrivial squared magnitudes of the marginals are $1/4$ and $7/16$, so their product assigns $7/64$ to each mixed frequency. The two laws have identical marginals at every positive convolution order. A probability law of collision mass $E$ has order-two Rényi entropy $-\log E$. [Linden, Mosonyi, and Winter, §V](https://arxiv.org/html/1212.0248#S5)

A smaller modulus reduces the number of character terms. One can also keep the modulus $q$ and majorize the band indicator pointwise by a kernel $K$ with few Fourier modes. For a positive integer $q$, put $G=\mathbb Z/q\mathbb Z$ and let $R\subseteq G$ be the residues to be counted. Suppose $K:G\to\mathbb R$ is nonnegative everywhere and at least $1$ on $R$. Let $S$ contain the support of the discrete Fourier transform of $K$, and write $m=|S|$ and $M=\sum_{x\in G}K(x)$.

**Hand derivation.** Fourier inversion at zero gives the exact identity

$$
mM-qK(0)=\sum_{k\in S}\sum_{x\in G}K(x)\bigl(1-\Re\chi_k(-x)\bigr).
$$

::: {.theorem #thm-ch31-sparse-majorant-gap title="Phase lower bound for a sparse Fourier majorant" lean="D5/S3/Fourier/Concentration/SparseCyclicMajorants.sparse_dft_majorant_gap"}
Under the assumptions on $q,K,S,R,m,M$ above,

$$
mM-qK(0)\ \ge\ \sum_{k\in S}\sum_{x\in R}\bigl(1-\Re\chi_k(-x)\bigr).
$$
:::

Each term is nonnegative, so retain only the terms in $R$.

In the character expansion, the normalized zero-frequency coefficient is $M/q$. If $0\in R$, this coefficient is at least $1/m$. If $1\in R$ and $S$ contains a nonzero frequency, the right side is strictly positive.

::: {.theorem #thm-ch31-sparse-majorant-equality title="Equality in the sparse mean bound" lean="D5/S3/Fourier/Concentration/SparseCyclicMajorants.sparse_dft_floor_eq_iff"}
Suppose $K$ is nonnegative and $S$ contains the support of its Fourier transform. For $K(0)>0$, equality $mM=qK(0)$ holds exactly when $K=K(0)\mathbf 1_U$ for an additive subgroup $U$ of $G$ and $S$ is the annihilator of $U$.
:::

Equality forces every selected character to be one wherever $K>0$. Inversion makes $K$ constant at $K(0)$ on the subgroup where all these characters are one. Every frequency in its annihilator has coefficient $M>0$ and therefore belongs to $S$. Conversely, a scaled subgroup indicator and its annihilator make the right side of the identity zero. Subgroup indicators also give equality in the finite-group Fourier support uncertainty principle. [Tao, §1](https://arxiv.org/pdf/math/0308286v6)

For a collision bound using $K$, the zero-frequency term is $(M/q)W^{2p}$. If $0\in R$ and the real parts of the remaining coefficients are all nonnegative, the full bound is at least $W^{2p}/m$. With coefficients of both signs, the mean inequality controls the zero-frequency term, while the other terms depend on high moments from a common set of weights.

**Example modulo four (hand derivation).** Test which Fourier moments can arise from the same initial weights. On $\mathbb Z/4\mathbb Z$, let $w=(a,b,c,d)$ be a probability weight, and let $u=|\widehat w(1)|^2$, $v=|\widehat w(2)|^2$. The discrete Fourier transform without the factor $1/4$ gives

$$
u=(a-c)^2+(b-d)^2,\qquad v=(a+c-b-d)^2.
$$

The pairs attained by a common $w$ are exactly those satisfying

$$
0\le v\le1,\qquad 0\le u\le(1+v)/2.
$$

Write $e,o$ for the total masses on the even and odd residues. The two differences $a-c,b-d$ range independently in $[-e,e]$ and $[-o,o]$. Consequently $u$ is at most $e^2+o^2=(1+v)/2$. Given $v$, take $e=(1+\sqrt v)/2$ and $o=(1-\sqrt v)/2$. Scaling both differences by the same fraction of their endpoint values fills the interval from zero to the maximum. [Exact joint moment region modulo four](lean:D5/S3/Fourier/Concentration/FourthRootMomentRegion.dft_four_squared_region)

For the difference of two independent sums of $p$ draws from $w$, the Fourier coefficients at $1,2$ are $u^p,v^p$. If $v^p=0$ and $p\ge2$, the first coefficient has maximum $2^{-p}$. In the relaxation to symmetric probability laws with nonnegative Fourier coefficients and zero second coefficient, both parity masses are $1/2$. The first coefficient is the difference between the two even-residue masses and has maximum $1/2$, attained by $(1/2,1/4,0,1/4)$. The relaxed maximum is $2^{p-1}$ times the attainable one. The gap comes from requiring the two high moments to arise from common initial weights. Applying this idea to actual ζ ordinates requires quantitative constraints on the character moments of their common spectrum. [Both maxima for the common-weight and relaxed laws](lean:D5/S3/Fourier/Concentration/FourthRootMomentRegion.four_first_moment_maxima)

The equality condition for the one-half bound holds for every positive modulus. Let one probability weight $w$ on $\mathbb Z/q\mathbb Z$ satisfy $\widehat w(2)=0$. Put $m=\widehat w(1)$, $c=|m|^2$ and $Z_j=\overline m\exp(-2\pi i j/q)$. The weighted mean of $Z_j$ is $c$, its weighted second moment vanishes, and $|Z_j|^2=c$. The variance of the real part is therefore

$$
\sum_j w_j(\Re Z_j-c)^2=\frac{c}{2}-c^2\ge0.
$$

Thus $c\le 1/2$. At equality, the real part is $1/2$ at every positive weight and the imaginary part is either $1/2$ or $-1/2$. The imaginary mean is zero, so each side has mass one half. Each phase identifies a unique residue. The equality cases are exactly two residues of mass one half each whose difference has additive order four. Conversely, the two phases of such a law are perpendicular, giving squared first magnitude $1/2$, while their squares cancel. These residues exist exactly when $4\mid q$, with $0$ and $q/4$ as a choice. [Exact equality condition](lean:D5/S3/Fourier/Concentration/CyclicHarmonicEquality.zmod_first_mode_le_half_of_second_zero) · [Moduli attaining equality](lean:D5/S3/Fourier/Concentration/CyclicHarmonicEquality.zmod_exists_first_mode_half_of_second_zero)

To compare modes $k$ and $2k$ of a common weighted lattice spectrum, combine weights at coordinates $a_j$ that share the residue $ka_j\bmod q$. Modes one and two of the resulting probability weight recover modes $k$ and $2k$ of the original normalized spectrum. When mode $2k$ vanishes, the normalized $2p$-th power at $k$ in the collision formula is at most $2^{-p}$.

When the second coefficient is close to zero, the same variance measures stability near the two-point configuration. Let a finite family of unit phases $z_j$ carry nonnegative weights $w_j$ summing to one. Write $m=\sum_j w_jz_j$, $b=\sum_j w_jz_j^2$ and $c=|m|^2$. For $0<c<1$, put $X_j=\overline m z_j$ and $t=\sqrt{c(1-c)}$. Set $\eta_j=1$ when $\Im X_j\ge0$ and $\eta_j=-1$ otherwise. The variance of the real part controls the squared error to two candidate points and the difference between their assigned masses. Put

$$
D=\frac c2-c^2+\frac12\Re(\overline m^{\,2}b).
$$

Then

$$
\begin{aligned}
\sum_j w_j\lvert X_j-c-i\eta_jt\rvert^2 &\le (1+4/t^2)D,\\
\left(\sum_j w_j\eta_j\right)^2 &\le 4D/t^4.
\end{aligned}
$$

[Stability bounds from two moments](lean:D5/S3/Fourier/Concentration/CyclicMomentStability.first_two_moment_stability)

Write $x=\Re X_j$ and $y=\Im X_j$. The identity $x^2+y^2=c$ gives $(|y|-t)(|y|+t)=c^2-x^2$. Use $|x+c|\le2$ and $|y|+t\ge t$ to control the imaginary error by the real error. The imaginary mean vanishes, so weighted Cauchy–Schwarz bounds the mass difference. Both errors vanish when $b=0$ and $c=1/2$. A quantitative gap on a discrete grid also requires the angular separation of the available phases.

The phase separation can be compared with the observed variance. Take finitely many unit phases $z_j$ with nonnegative weights $w_j$ summing to one. Let $m=\sum_j w_jz_j$, $b=\sum_jw_jz_j^2$, $c=|m|^2$, $s=c(1-c)$ and $D=c/2-c^2+\Re(\overline m^{\,2}b)/2$. Suppose $\lvert\Re(z_j\overline{z_k})\rvert\ge\delta$ for every pair of positive-weight indices, including diagonal pairs. Put $d=\max\{0,\delta-|2c-1|\}$. When $d>0$,

$$
c d^2\le 4\left(1+\frac4s+\frac{c d^2}{s^2}\right)D.
$$

Positive $d$ puts $c$ strictly between zero and one. The two-moment comparison phases have real inner product $c(2c-1)$ in the rotated coordinates. Average the squared perturbation of this product over pairs from opposite sign classes. Their mass product equals one quarter of one minus the squared mass difference. The two stability bounds then give the displayed inequality.

When $4\nmid q$, reduce $4k-q$ to a centered residue modulo $2q$ for each integer difference $k$. The result is nonzero, and it is even when $q$ is even. For $z_j=\exp(-2\pi i j/q)$, we may take $\delta=\sin(\pi/(2q))$ for odd $q$ and $\delta=\sin(\pi/q)$ for even $q$. Here $m=\widehat w(1)$ and $b=\widehat w(2)$. If $|b|\le\delta/3$, a consequence is $c\le(1+|b|)/2-\delta^2/225$. Raising that bound to the $p$th power controls the first Fourier coefficient of the difference of two independent sums of $p$ draws.

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

## Changing the height cutoff in a local statistic

Rounding a frequency downward can change whether it belongs to a height interval. A local test only sees tuples with nearby entries, so the effect of changing the cutoff can be bounded using the neighborhood of each changed entry.

::: {.theorem #thm-ch31-local-statistic-cutoff title="Local tuple statistics under a change of cutoff" lean="D5/S3/Fourier/Concentration/LocalStatisticCutoffs.local_statistic_cutoff"}
Let $S$ and $T$ be nonempty subsets of a finite index set with real frequencies $g_j$. Put $s=|S|$, $t=|T|$ and $b=|S\triangle T|$. Fix a natural number $k$ and a real score on each ordered tuple of $k+1$ distinct indices, with magnitude at most $M\ge0$. Whenever a score is nonzero, every frequency in the tuple lies within distance $R$ of the first. Suppose each index in $S\cup T$ has at most $D$ indices of $S\cup T$ within distance $2R$ of its frequency, where $D$ is a natural number. Let $A(U)$ be the sum of the scores of tuples contained in $U$. Put $L=M(\max(D-1,0))_k$, where the subscript denotes a falling factorial. Then

$$
\left|\frac{A(S)}{s}-\frac{A(T)}{t}\right|
\le \min\left\{\frac{L\bigl((k+1)b+|s-t|\bigr)}{\max(s,t)},\,2L\right\}.
$$
:::

::: proof
Only tuples with an index in $S\triangle T$ can change the unnormalized sum. Mark such an index and its slot. All the other frequencies of a contributing tuple lie within distance $2R$ of the marked one. Fill the $k$ remaining slots with distinct indices from that neighborhood after erasing the marked index. Summing over the $k+1$ slots and the $b$ changed indices bounds $|A(S)-A(T)|$ by $L(k+1)b$.

To bound either sum separately, mark only the first slot. Thus $|A(U)|\le |U|L$ for $U=S,T$. Subtract the two unnormalized sums over the larger denominator and use the separate bound for the adjustment of the smaller sum. Each normalized sum has magnitude at most $L$, so their difference also has magnitude at most $2L$. The full proof is checked by the Lean kernel.
:::

For a compactly supported test of $k$ scaled differences against the first frequency, take its support in $[-R_0,R_0]^k$ and use the radius $R=R_0/\lambda$ at scale $\lambda>0$. Consider the indexed positive ζ ordinates, keeping multiplicities or taking a subset with at least a constant times $T\log T$ retained indices. Write the upper height as $T$, the lower height as $X=cT^\alpha$ for fixed $c>0$ and $0<\alpha<1$, and round each $g_j$ downward to the dyadic mesh $2^{-\lceil(\log_2(2+g_j))^2\rceil}$. Select each set of tail indices independently in $(X,T]$, using the original and rounded heights respectively.

All indices in the union have original height above $X$. With $h=2^{-\lceil(\log_2(2+X))^2\rceil}$, the symmetric difference therefore comes from the strips $(X,X+h]$ and $(T,T+h]$. The Riemann–von Mangoldt estimate gives $O(\log T)$ ordinates, counted with multiplicity, in any fixed-width interval in this tail range. If $\lambda$ is bounded below by a positive constant, the rounded neighborhoods at radius $2R_0/\lambda$ also have $D=O(\log T)$, since their original heights lie in neighborhoods enlarged by at most $h$. After normalization, the change from the independent cutoffs is $O((\log T)^k/T)$ for fixed $k$ and test. [Hasanalizade–Shen–Wong, Theorem 1.1](https://arxiv.org/abs/2107.06506)

On the common choice of indices, a Lipschitz test has at most $K\lambda h$ error per tuple. Thus the two statistics have the same limit whenever it exists, for fixed compactly supported Lipschitz tests and $\lambda$ between a positive constant and a fixed power of $T$. The rounded spectrum can still have large exact high-order collision mass. The upper bound at finer resolution for the original ordinates remains open.
