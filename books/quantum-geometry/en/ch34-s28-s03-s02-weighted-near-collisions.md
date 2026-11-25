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

[Variance bound for separated phases](lean:D5/S3/Fourier/Concentration/CyclicGridMomentGap.phase_separation_variance_bound) · [Fourier moment bound on a cyclic grid](lean:D5/S3/Fourier/Concentration/CyclicGridMomentGap.cyclic_grid_fourier_gap)

For actual ζ ordinates, use the tail above $X=e^{-D}T^\beta$ from the preceding section, with $\delta=\log T$ and $g_\gamma=\gamma/r$. For $H=\exp(cT^\beta\log T)$, take $N=\lfloor HT^2/r\rfloor_++1$ to keep the mesh error at most $rB/(2T^2)$. To bound the start, a finite $L=L(T)$ must satisfy the budget $KNE_p(2/L)<(\log T)^{2p}$. The target order $p$ grows on the scale of $T^\beta\log T$. For fixed finite tail and fixed $p$, $E_p(2/L)$ eventually equals the exact collision mass $E_p(0)$ as $L$ increases. Quantifying $L$ requires a weighted bound at positive resolution. Definition 7 in Tao, Trudgian, and Yang counts unweighted quadruples at unit scale, and Theorem 64 gives estimates for fixed $\sigma\ge7/10$. The growing-order weighted bound for the critical-line tail remains open. [Definition 7 and Theorem 64](https://arxiv.org/html/2501.16779v1) · [Research question](https://github.com/the-omega-institute/trureturing/issues/33519)

At time $s$, put $x=e^{s/r}>1$ so that an individual phase is $x^{i\gamma}$. The explicit formula of Ford and Zaharescu uses the cumulative sum for $t>1$, $\sum_{0<\gamma\le t}x^\rho$. Let $n_x$ be the nearest prime power to $x$ and set $\theta=\log(x/n_x)$. The main term is $-\Lambda(n_x)/(2\pi)$ times $\int_0^t e^{i\theta u}\,du$. Under the Riemann hypothesis, dividing the cumulative sum by $\sqrt{x}$ gives the ordinate phase sum with multiplicities. [Ford and Zaharescu, Lemma 1](https://arxiv.org/pdf/math/0405459)

Use $w(u)=u/(u^2+1/4)$ and write $J_\theta(X,T)=\int_X^T w(u)e^{i\theta u}\,du$. For $1/2\le X\le T$,

$$
|J_\theta(X,T)|\le\frac12\log\frac{T^2+1/4}{X^2+1/4},
\qquad
|\theta|\,|J_\theta(X,T)|\le 2w(X).
$$

The unit modulus of the phase gives the first bound, with equality at $\theta=0$. Integration by parts gives the second. The weight decreases on the interval, so the derivative term has modulus at most $w(X)-w(T)$, cancelling the $w(T)$ from the boundary term.

The first bound also follows from Mathlib's rational-weight integral. For the second, the vector-valued second mean value theorem bounds $|J_\theta|$ by $w(X)$ times the modulus of an unweighted oscillatory integral over a prefix. When $\theta\ne0$, both exponential endpoints have unit modulus, giving $2w(X)/|\theta|$. [Rational-weight and complex exponential integrals](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/SpecialFunctions/Integrals/Basic.lean) · [Vector-valued second mean value theorem](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Integral/IntervalIntegral/MeanValue.lean#L203)

Partial summation can retain the variation of the cumulative error envelope with height. Write $R(t)$ for the normalized cumulative sum minus the normalized main term, and suppose $|R(t)|\le E(t)$. Use the tail $(X,T]$. The weighted error becomes
$$
w(T)R(T)-w(X)R(X)-\int_X^T w'(u)R(u)\,du.
$$
For a nonnegative decreasing weight, the triangle inequality and integration by parts for $wE$ give the bound $2w(X)E(X)+\int_X^T w(u)E'(u)\,du$. The term $w(T)E(T)$ cancels.

For $T\ge X>1$ and $x>1$, under the Riemann hypothesis, Lemma 1 allows $E(u)=A\log^2(2xu)+B\log(2u)$, where $A=K\sqrt{x}$, $B=K/(\sqrt{x}\log x)$, and $K$ is the uniform explicit-formula error constant. Integrating the derivative of the envelope using $w(u)\le1/u$ gives
$$
\left|\sum_{X<\gamma\le T} w(\gamma)e^{i\gamma\log x}
      +\frac{\Lambda(n_x)}{2\pi\sqrt{x}}J_\theta(X,T)\right|
\le
\frac{2A\bigl(\log^2(2xX)+\log(2xX)+1\bigr)+B\bigl(2\log(2X)+1\bigr)}{X}.
$$
The sum counts multiplicities. The bound is uniform in $T$ and retains factors depending on $x$. At the required time scale $x=e^{s/r}$, the aggregate contribution of exceptional frequencies to the growing-order moment remains open. [Lean proof of the weighted error bound](lean:D5/S3/Fourier/Asymptotics/WeightedCumulativeRemainder.weighted_tail_error_le)

The second and fourth harmonics give a sharp bound even when the phases range over the whole circle. Write $m_h=\sum_jw_jz_j^h$ for the moments of one probability weight on unit phases. Given caps $0\le e,k\le1$ on $|m_2|,|m_4|$, put $b=\min(e,\sqrt{(1+k)/2})$ and $r=(1+b)/2$. If $b=1$, the largest $|m_1|$ is $1$. If $b<1$, put

$$
a=\min\left(\sqrt r,\sqrt{\frac{1+k}{4(1-b)}}\right),\qquad B=\frac{a+r}{1+a}.
$$

The largest $|m_1|$ is $B$. Rotate the phase family so that $m_1$ is nonnegative real, and write $x=\Re z$ for the real projection of a phase sampled under the weight. The identities $2x^2=1+\Re z^2$ and $8(x^2-x^4)=1-\Re z^4$ relate the two caps to real moments. The nonnegative variance of $\Re z^2$ gives $(\Re m_2)^2\le(1+\Re m_4)/2\le(1+k)/2$. Together with $\Re m_2\le |m_2|\le e$ and $2\mathbb E x^2=1+\Re m_2$, this yields $\mathbb E x^2\le r$. If $a=\sqrt r$, Cauchy–Schwarz gives $\mathbb E x\le a=B$. In the other branch, expand the nonnegative polynomial $(1-x)(x-a)^2(x+1+2a)$ for $x\in[-1,1]$. Its mean is
$$
\mathbb E[(1-x^2)(x^2-a^2)]-2a(1+a)\left[(1+a)(\mathbb E x-1)+1-\mathbb E x^2\right].
$$
The first term is nonpositive by the fourth cap and $\mathbb E x^2\le r$, so the bracket is nonpositive. This yields the stated bound. The real moment calculation is related to the upper principal representation of a measure on an interval. [Dette and Schorning, Lemma 2.1](https://arxiv.org/pdf/1306.4872)

For $b<1$, take weight $(r-a^2)/(1-a^2)$ at $1$ and divide the rest equally between $a+i\sqrt{1-a^2}$ and its conjugate. The moments are real and equal to $B$, $b$, and $1-8(1-r)a^2$ at orders $1,2,4$. The choice of $a$ gives $|m_4|\le k$. A point mass attains the branch $b=1$. With $e=k=0$, the three phases are $1,e^{i\pi/3},e^{-i\pi/3}$ with equal weights, and $|m_1|=2/3$. Every moment at order $2^j$ for $j\ge1$ vanishes in this example because $2^j$ is congruent to $2$ or $4$ modulo six. Even these simultaneous vanishings allow a first coefficient of fixed positive size. A growing-degree bound on actual ζ ordinates needs further arithmetic information about the weighted frequency sums.

[Lean proof of the sharp harmonic bound](lean:D5/S3/Fourier/Concentration/SecondFourthHarmonicBound.sharp_second_fourth_harmonic_bound)

For a full consecutive block of even orders, let $N\ge1$ and suppose $m_{2k}=0$ for $1\le k<N$. The largest first magnitude is

$$
B_N=\frac{1}{N\sin(\pi/(2N))}.
$$

It is attained by equal weights at $z_j=\exp\bigl(i\pi(j-(N-1)/2)/N\bigr)$ for $0\le j<N$. The squared phases are equally spaced, so the prescribed harmonics vanish by the finite character sum. The first magnitude follows from the sum of cosines on this arc. Multiplying each cosine by $2\sin(\pi/(2N))$ makes it a difference of sines at the adjacent endpoints, and the sum telescopes from $-1$ to $1$.

To compare an arbitrary admissible law with this equal-weight law, rotate its first moment onto the nonnegative real axis and set $y=(\Re z)^2$. Then $2y-1=\Re z^2$, and $T_k(2y-1)=\Re z^{2k}$ for the Chebyshev polynomial $T_k$. The two laws have the same means for polynomials in $y$ of degree below $N$. The polynomial $R(y)=1+(-1)^N T_N(2y-1)$ is nonnegative on $[0,1]$, vanishes at the attaining projections, and is positive at negative arguments. For $s>0$, the expression $(y+sR(y)/R(-s))/(y+s)$ is a polynomial of degree below $N$ because its numerator vanishes at $-s$. It dominates $y/(y+s)$ and agrees with it on the attaining support. Compare the two means with this polynomial, then integrate at $s=t^2$ using $\int_{\mathbb R}y/(y+t^2)\,dt=\pi\sqrt y$ for $y\ge0$. This bounds the mean of $\sqrt y$, which bounds the first magnitude after rotation. [Gauss–Chebyshev formula](https://dlmf.nist.gov/3.5#v) · [Principal representations, Lemma 2.1](https://arxiv.org/pdf/1306.4872)

The cases $N=2,3$ give $1/\sqrt2$ and $2/3$. As $N\to\infty$, $B_N\to 2/\pi$ by the sine limit at zero. Thus a growing block of vanishing even orders still allows a first magnitude bounded away from zero in this class of laws. The near-collision budget for actual ζ ordinates needs information that constrains the weighted sums along their time orbit.

[Lean proof of the sharp bound for a consecutive even block](lean:D5/S3/Fourier/Concentration/EvenHarmonicFirstMoment.sharp_first_harmonic_even_block)

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

## Equal count vectors in the moment expansion {#weighted-occupation-diagonal}

Let $J$ be finite, with real weights $w_j$ and integer degree $p\ge0$. Write $D_p=\sum_{|m|=p}c_m^2$, where $c_m=p!\prod_j(w_j^{m_j}/m_j!)$. For nonnegative weights, the weighted near-collision mass includes this diagonal at every nonnegative resolution. For each $s\ge0$,

$$
s^pD_p\le (p!)^2\prod_{j\in J}(2e^{s w_j^2/2}-1).
$$

Dividing the left side by $(p!)^2$ gives the sum of the degree-$p$ terms in $\prod_j\sum_{n=0}^p x_j^n/(n!)^2$, with $x_j=sw_j^2$. Including every term gives an upper bound by nonnegativity. For $n\ge1$, the inequality $n!\ge2^{n-1}$ bounds each positive-degree term by twice its counterpart in $e^{x_j/2}$. The constant coefficient is one, so the factor is at most $2e^{x_j/2}-1$. The full series is $I_0(2\sqrt{x_j})$. [Lean proof of the finite product bound](lean:D5/S3/Fourier/Concentration/WeightedOccupationDiagonal.scaled_diagonal_le_product) · [Lamzouri's independent-phase product, §3](https://arxiv.org/html/2311.04860v2#S3) · [DLMF, equation 10.25.2](https://dlmf.nist.gov/10.25.E2)

For $p\ge1$ and $V=\sum_jw_j^2>0$, put $s=p/V$. The identity $2e^{x/2}-1=e^x[1-(1-e^{-x/2})^2]$ gives

$$
\frac{D_p}{p!\,V^p}\le
\frac{p!e^p}{p^p}\prod_{j\in J}
\left[1-\left(1-e^{-p w_j^2/(2V)}\right)^2\right].
$$

Stirling's formula gives a prefactor of order $\sqrt p$. If at least $\kappa p$ coordinates have $p w_j^2/V\ge a$ for constants $\kappa,a>0$, the product is at most $[1-(1-e^{-a/2})^2]^{\kappa p}$.

Under RH, take $X=e^{-K}T^\beta$ with fixed $K$ and $0<\beta<1$, and $p\asymp X\log X$. Group multiplicity by distinct ordinate and use $w_\gamma=m_\gamma\gamma/(1/4+\gamma^2)$. The [multiplicity estimate for the logarithmic tail](ch34-s28-s03-s02-mobius-and-spectra.md#thm-ch31-logarithmic-missing-window) is $\sum_{0<\gamma\le Y}m_\gamma^2=O(Y\log Y)$. For each fixed $C\ge2$, the Riemann–von Mangoldt formula gives $\sum_{X<\gamma\le CX}m_\gamma\sim(C-1)X\log X/(2\pi)$. Cauchy–Schwarz gives at least $M\gg CX\log X$ distinct ordinates in the band, with an absolute lower-bound constant for fixed $C$ and sufficiently large $X$. Choose a fixed $C$ large enough that $M\ge2p$. Then $CX\le T$ eventually, and each of these weights is at least $1/(2CX)$. Since $V=O(\log X/X)$, these coordinates supply the exponential factor in the upper bound. For the lower bound, keep the vectors that occupy exactly $p$ distinct coordinates in the band. They give

$$
D_p\ge (p!)^2\binom{M}{p}(2CX)^{-2p}
   \ge p!\,(M/(8C^2X^2))^p .
$$

Thus there are constants $0<c_1\le c_2$ with $e^{-c_2p}\le D_p/(p!V^p)\le e^{-c_1p}$ for all sufficiently large $T$. With tail weight $W\asymp(\log T)^2$, this gives $\log(D_p/W^{2p})=-2p\log\log T+O(p)$. The ζ asymptotics use the cited analytic inputs. The weight of near-collisions between two distinct count vectors still requires an arithmetic estimate. [Multiplicity input, Theorem 1 and §7](https://arxiv.org/abs/2306.04799)

## Mass at a fixed count difference

For degree-$p$ count vectors $m,n$, put $\ell_j=\min(m_j,n_j)$, $a=m-\ell$ and $b=n-\ell$. The residual vectors have disjoint supports and common degree $d=p-|\ell|$. For fixed $a,b$, every pair with $m-n=a-b$ is of the form $(\ell+a,\ell+b)$ with $|\ell|=p-d$. The frequency gap $\sum_j(a_j-b_j)g_j$ is independent of $\ell$.

Use the preceding coefficient $c_p(m)=p!\prod_j(w_j^{m_j}/m_j!)$. The total weight $M_p(a-b)$ at this difference is

$$
M_p(a-b)=
(p!)^2\left(\prod_j w_j^{a_j+b_j}\right)
\sum_{|\ell|=p-d}\prod_j
\frac{(w_j^2)^{\ell_j}}{\ell_j!\,(\ell_j+a_j+b_j)!}.
$$

The identity allows real weights. At each coordinate at most one residual count is positive, so the two factorials are $\ell_j!$ and $(\ell_j+a_j+b_j)!$. For nonnegative weights, $(\ell_j+a_j)!\ge \ell_j!a_j!$ gives $c_p(\ell+a)\le\binom pd\,c_{p-d}(\ell)c_d(a)$. Applying the same bound to $\ell+b$ and summing over $\ell$ gives

$$
M_p(a-b)\le \binom pd^{\!2}D_{p-d}\,c_d(a)c_d(b).
$$

The Lean proof gives the exact fixed-difference mass and the diagonal bound. [Lean proof](lean:D5/S3/Fourier/Concentration/FixedDifferenceOccupationMass.fixed_difference_mass)

Write $R_d(\eta)$ for the sum of $c_d(a)c_d(b)$ over ordered degree-$d$ pairs with disjoint supports and $|\sum_j(a_j-b_j)g_j|\le\eta$. Summing the last bound over these pairs bounds the full mass at residual degree $d$ by $\binom pd^2 D_{p-d}R_d(\eta)$. At $d=0$ this recovers the diagonal. At $d=1$ the required input counts weighted pairs of distinct indices. These index pairs have distinct ordinates in the ζ tail when multiplicities are grouped by ordinate. For the actual ζ tail, $d$ can grow with $p$, and the required bound for $R_d(\eta)$ in that regime remains open. [Shifted factorials in the Bessel series, DLMF 10.25.2](https://dlmf.nist.gov/10.25.E2)

## Weighted near-pairs at residual degree one

Take a finite set of ordered pairs with both ordinates in $[X,T]$, where $2\le X\le T$, and gaps at most $\delta\le X/2$. Give each index a nonnegative multiplicity $m_j$ and weight $0\le w_j\le m_j/\gamma_j$. Let $B(y)$ sum $m_i m_j$ over the supplied pairs whose larger ordinate is at most $y$. If $B(y)\le Cy\log y$ for every $y\in[X,T]$, with $C\ge0$, then

$$
\sum_{(i,j)} w_iw_j\le \frac{4C(\log X+1)}{X}.
$$

If the larger ordinate is $h$, the smaller one is at least $h-\delta\ge h/2$. Their weight product is at most $2m_i m_j/h^2$. Write $1/h^2$ as $1/T^2+\int_h^T 2y^{-3}\,dy$ and exchange the finite sum with the integral. The weighted total is at most $2B(T)/T^2+4\int_X^T B(y)y^{-3}\,dy$. Substitution of the cumulative bound and integration give the stated estimate. [Lean proof of the finite weighted bound](lean:D5/S3/Fourier/Concentration/WeightedClosePairTail.weighted_close_pairs_le)

Under RH, group multiplicities by distinct positive ordinate and use $w_\gamma=m_\gamma\gamma/(1/4+\gamma^2)$. The chapter uses frequencies $g_\gamma=\gamma/r$ with $r>0$, so the frequency resolution $\eta$ corresponds to the ordinate resolution $\delta=r\eta$. Take $0\le\eta\le1/(4r\log T)$. Average the Montgomery function at height $y$ against $2(1-\alpha)$ on $[0,1]$. The published uniform expansion gives a bounded average. Each pair contributes with the factor $2(1-\cos u)/u^2$, where $u=(\gamma_i-\gamma_j)\log y$, with value one at zero. Every contribution is nonnegative. A pair at ordinate gap at most $\delta$ has $|u|\le1/4$, so this factor and the Montgomery factor $4/[4+(\gamma_i-\gamma_j)^2]$ both have positive absolute lower bounds. Retaining these pairs and restoring the normalization gives $B(y)\ll y\log y$ uniformly for sufficiently large $X$. [Baluyot, Goldston, Suriajaya and Turnage-Butterbaugh, Theorem 1](https://arxiv.org/abs/2306.04799)

Hence $R_1(\eta)\ll(\log X+1)/X$. The fixed-difference bound gives at most $p^2D_{p-1}R_1(\eta)$ for the part of $E_p(\eta)$ at residual degree exactly one. With the same cutoff $X=e^{-K}T^\beta$ for fixed $K$ and $0<\beta<1$, and with $p\asymp X\log X$, the diagonal estimate gives an exponential saving relative to $p!V^p$, since $V\asymp\log X/X$ and the extra factor of order $p$ can be absorbed. Growing residual degrees still require an arithmetic estimate.

## A growing cutoff for residual degree {#growing-residual-degree}

Let $E_{p,\le D}(\eta)$ be the part of $E_p(\eta)$ with at most $D$ residual occurrences on each side, where $0\le D\le p$. Every such pair shares at least $p-D$ occurrences. Write $W=\sum_jw_j$ and $V=\sum_jw_j^2>0$. For nonnegative weights, dropping the frequency condition and applying the common-count bound gives

$
E_{p,\le D}(\eta)\le\binom pD^{\!2}W^{2D}D_{p-D}.

$

Thus a bound at the single degree $k=p-D$ suffices. If $D_{p-D}\le A e^{-c(p-D)}(p-D)!V^{p-D}$, cancel one binomial factor against $p!$, and bound the other by $p^D/D!$. With $x=p e^c W^2/V$ this gives

$
\frac{E_{p,\le D}(\eta)}{p!V^p}
\le A e^{-cp}\frac{x^D}{(D!)^2}
\le A e^{-cp}\rho^{-D}\exp(2\sqrt{\rho x}),\qquad \rho>0 .

$

The last inequality follows by retaining the degree-$D$ term of the exponential series at $\sqrt{\rho x}$ and squaring. The frequency resolution does not enter either bound. [Lean proof of the common-count bound](lean:D5/S3/Fourier/Concentration/FiniteMultinomialOverlap.weighted_overlap_le_diagonal)

For the ζ tail above, take $X=e^{-K}T^\beta$ and $p\asymp X\log X$ with $K$ and $0<\beta<1$ fixed. Under RH and the stated multiplicity estimate, $W^2/V=O(p(\log T)^2)$. The diagonal estimate holds with the same $A,c>0$ for all $p/2\le k\le p$. The band $(X,CX]$ supplies at least a fixed multiple of $p$ coordinates with $kw_j^2/V$ bounded below uniformly for these $k$. The factor $O(\sqrt{k})$ from Stirling is absorbed into the exponential. Put $L=\log T$ and $\rho=(L\log L)^{-2}$. Then $2\sqrt{\rho x}=O(p/\log L)$, and for $D\le\varepsilon p/\log L$ the cost $D\log(1/\rho)$ is at most $(2+o(1))\varepsilon p$. Any fixed $0<\varepsilon<c/2$ gives an exponential saving for this entire block, uniformly in $\eta$. Controlling the remaining near-collision mass for the actual ordinates requires an estimate above that cutoff. [Multiplicity input, Theorem 1 and §7](https://arxiv.org/abs/2306.04799)

## Higher residual degrees with pointwise matchings {#matched-residual-occupations}

After removing shared occurrences coordinate by coordinate, each side has $d$ frequencies left. If they can be paired with every discrepancy at most $\eta$, the weight of such residuals can be estimated from the weight of single close pairs. Words with the same occurrence counts represent the same count vector.

Let $E$ be a relation on a finite index set $J$, put $R(E)=\sum_{(i,j)\in E}w_iw_j$, and assume $w_j\ge0$. Let $S$ be a set of ordered count-vector pairs $(a,b)$ each represented by two length-$d$ words whose corresponding letters are related by $E$. Then
$$
\sum_{(a,b)\in S} c_d(a)c_d(b)\le d!R(E)^d.
$$
Any two words with the specified count vectors can be rearranged to give a matching. Summing over position permutations counts each matchable word pair at least once. For a fixed permutation, the $d$ positions independently select an edge, giving total weight $R(E)^d$. Summing the weights of all words with the same count vector gives $c_d$.

For $E=\{(i,j):i\ne j,\ |g_i-g_j|\le\eta\}$, the edge mass is $R_1(\eta)$. Take the pairs in $E_p(\eta)$ whose residuals can be matched along $E$, together with the diagonal. Their total weight is at most
$$
\sum_{d=0}^p \binom pd^2D_{p-d}\,d!R_1(\eta)^d\le p!\bigl(V+R_1(\eta)\bigr)^p.
$$
The first bound applies the diagonal estimate for each fixed count difference and sums over the matchable residual vectors. The second uses $D_k\le k!V^k$, from the multinomial theorem and the bound $k!$ on each multinomial coefficient. The estimate covers this particular subset of pairs. For example, $1+4=2+3$, and every cross-pair discrepancy is at least $1$, so a pointwise matching fails for $0<\eta<1$. For actual ζ zeros, the weight of higher-degree residuals with cancellation and no pointwise close matching remains to be bounded.

## Residual degree two and directed gaps {#degree-two-directed-differences}

For arbitrary real weights, when two terms remain on each side, their sum discrepancy is the difference of two directed gaps. For $i\ne j$, give the edge $(i,j)$ frequency $g_i-g_j$ and weight $w_iw_j$. Let $A(\eta)$ be the ordered near-collision mass on these edges at resolution $\eta\ge0$. Let $C_i(\eta)$ be the ordered near-collision mass of the original spectrum with index $i$ deleted, including the remaining diagonal. Then
$$
R_2(\eta)=A(\eta)-2\sum_i w_i^2 C_i(\eta)+\sum_i\sum_{j\ne i}w_i^2w_j^2.
$$

Expand each degree-two count vector into its ordered words. The difference of the sums for $(i,k)$ and $(j,l)$ is the frequency difference of the edges $(i,j)$ and $(l,k)$. Edges already exclude $i=j$ and $l=k$. Disjoint support also excludes $i=l$ and $j=k$. For either shared endpoint, fixing that endpoint at index $i$ leaves a contribution $w_i^2 C_i(\eta)$. Both shared-endpoint conditions together make the edges equal, giving the final term. Repeated ordinates can belong to different indices, and the correction uses index equality.

[Lean proof of the endpoint correction](lean:D5/S3/Fourier/Concentration/DegreeTwoResidualDifferenceEnergy.degree_two_residual)

Take two five-point spectra with unit weights, $A=(0,1,5,6,13)$ and $B=(0,2,3,7,13)$. Both have endpoints $0,13$, sum $25$, and sum of squares $231$, giving mean $5$ and variance $106/5$. At every resolution $0\le\eta<1$, the degree-one near-pairs consist of five diagonal terms, so both masses are $5$.

Each spectrum has twenty directed edges. In $A$ the positive gaps $1$ and $5$ each occur twice, and the other six occur once. In $B$ the ten positive gaps are distinct. The negative gaps mirror the positive gaps, giving directed-gap collision masses of $28$ and $20$. The endpoint correction subtracts $40$ and adds back $20$ in each case, yielding $R_2(A)=8$ and $R_2(B)=0$. The eight terms in $A$ come from exchanging the sides of $0+6=1+5$ and ordering the two terms on each side. [Lean proof of the degree-two example](lean:D5/S3/Fourier/Concentration/DegreeTwoMomentWitness.exists_equal_first_data_distinct_degree_two)

The endpoints, mean, variance, and degree-one mass over the entire range $0\le\eta<1$ therefore allow different degree-two masses. This finite example identifies a limit of those statistics. The weighted frequency-band bound for zeta zeros posed below remains open.

### Homometric spectra and disjoint triple sums

The full distribution of directed gaps gives stronger input. Take $U=\{0,1,3\}$ and $V=\{0,4,9\}$, and set $A=U+V$ and $B=9+U-V$. Each set has nine points, with a unique coordinate pair for each point. Send a pair $(u,v),(u',v')$ in $A$ to $(u,v'),(u',v)$ in $B$. The directed gap $(u-u')+(v-v')$ is preserved. The two spectra therefore have the same multiplicity at every gap and the same squared Fourier magnitude at every frequency. Sets with the same autocorrelation are called homometric. [Grimm and Baake, §1](https://arxiv.org/pdf/0808.0094v1)

Give every point of both spectra weight $1$. Count ordered pairs of ordered triples with equal sums. A triple may repeat indices, and the two index supports must be disjoint. The counts are $5976$ and $5952$, respectively. For example, grouping the left triples by their first entry gives contributions of $604,654,684$ at $0,1,3$ for $A$, and $602,641,625$ at the same entries for $B$. Since the sums are integers, the counts apply at every resolution $0\le\eta<1$. The complete two-point autocorrelation thus allows different disjoint residual masses at degree three. [Lean proof of the degree-three obstruction](lean:D5/S3/Fourier/Concentration/HomometricTripleCollision.differences_do_not_determine_triple_mass)

For any unit-weight integer spectrum on $n$ indices, write $F(z)=\sum_j z^{g_j}$ and $U(z)=F(z)F(z^{-1})$. The Laurent polynomial for signed gaps between disjoint triples is

$$
P_n(U(z))-3\bigl(F(z^2)F(z^{-1})^2+F(z^{-2})F(z)^2\bigr),
$$

where $P_n(u)=u^3+(18-9n)u^2+(18n^2-63n+51)u-6n^3+27n^2-31n$. Summing the coefficients of $z^k$ over the integers $|k|\le\eta$ gives $R_3(\eta)$.

[The ring identity in Lean](lean:D5/S3/Fourier/Concentration/DisjointTriplePhaseIdentity.disjoint_triple_phase_identity)

Apply inclusion and exclusion to the nine equality conditions across the two triples. The selected equalities join the six positions into components. Each component independently chooses an index, so a component with $a$ left positions and $b$ right positions contributes $F(z^{a-b})$. Only a three-edge star can produce $a-b=\pm2$. Each orientation has three choices of center and a negative sign. The remaining components yield terms in $n$ and $U$.

For spectra with identical directed differences, $P_n(U)$ cancels coefficient by coefficient. At resolution zero, the difference is $-6$ times the difference in counts of ordered relations $2g_i=g_j+g_k$, including the triples with all indices equal. The spectra $A$ and $B$ above have $25$ and $29$ such relations, respectively, giving $5976-5952=24$. At positive resolution use $|2g_i-g_j-g_k|\le\eta$. This decomposition applies at degree three with unit weights.

For the actual ζ ordinates, the degree-one estimate controls the mass of gaps near zero. The quantity $A(\eta)$ also compares gaps far from zero that are close to each other. Bounding the contribution to $E_p(\eta)$ still requires control of that correlation after removing the shared endpoints.

## A product bound for disjoint residual supports

Assume the weights are nonnegative. Let $U_d$ sum $c_d(a)c_d(b)$ over all ordered degree-$d$ pairs with disjoint supports. Every $R_d(\eta)$ is at most $U_d$. For $s\ge0$ and $W=\sum_j w_j$,
$$
s^{2d}U_d\le (d!)^2\prod_j(2e^{s w_j}-1)
\le (d!)^2\exp\!\left(2sW-\sum_j(1-e^{-s w_j})^2\right).
$$
Indeed, $s^{2d}c_d(a)c_d(b)/(d!)^2$ is the product of the coefficients $(s w_j)^{a_j+b_j}/(a_j!b_j!)$. Dropping both degree constraints allows every coordinate pair with $a_j=0$ or $b_j=0$. Its local exponential sum is $2e^x-1$ for $x=s w_j$, with $(0,0)$ counted once. The identity $2e^x-1=e^{2x}[1-(1-e^{-x})^2]$ and $1-u\le e^{-u}$ give the second bound. [Bivariate generating functions, Flajolet and Sedgewick, §III.1](https://algo.inria.fr/flajolet/Publications/book.pdf)

With $d\ge1$, $W>0$ and $s=d/W$, division by $W^{2d}$ gives
$$
\frac{U_d}{W^{2d}}\le
\left(\frac{d!e^d}{d^d}\right)^2
\exp\!\left(-\sum_j(1-e^{-d w_j/W})^2\right).
$$
Stirling's formula gives a prefactor asymptotic to $2\pi d$. Under RH and with the grouped ζ-tail weights above, take $d\asymp p\asymp X\log X$. The fixed band $(X,CX]$ has $\gg X\log X$ distinct ordinates with $w_j\ge1/(2CX)$. For each of them $d w_j/W\gg1/\log T$, so the penalty sum is $\gg d/(\log T)^2$. Conversely, $1-e^{-x}\le x$ for $x\ge0$ bounds that sum by $d^2 V/W^2=O(d/(\log T)^2)$. At $d=p$ the resulting normalized upper bound is of order $p\exp(-\Theta(p/(\log T)^2))$. The missing-window budget requires $\exp(-2p\log\log T+O(p))$ or smaller even with one mesh point. Bounding the fraction of disjoint pairs meeting the frequency condition remains an arithmetic problem. [Stirling expansion, DLMF §5.11(i)](https://dlmf.nist.gov/5.11.E1)
[Lean proof of the product bound](lean:D5/S3/Fourier/Concentration/DisjointSupportOccupationMass.scaled_disjoint_mass)


## Character projection of disjoint occupation coefficients

Take residues $a_j$ modulo a positive integer $q$ and put $\chi_k(r)=e^{2\pi i kr/q}$. Let $M_R$ be the sum of $c_d(m)c_d(n)$ over disjoint ordered degree-$d$ pairs with $\sum_j (m_j-n_j)a_j$ in the residue set $R$. Define the product
$$
Q_k(x,y)=\prod_j\left(1+\sum_{h=1}^d\frac{w_j^h}{h!}
  \bigl[x^h\chi_k(-h a_j)+y^h\chi_k(h a_j)\bigr]\right).
$$
The two axes of each factor enforce disjoint support and the mixed coefficient enforces the two degrees. Character multiplication adds the signed gaps of the chosen terms. Hence orthogonality gives
$$
qM_R=(d!)^2\sum_{k\bmod q}[x^dy^d]Q_k(x,y)\sum_{r\in R}\chi_k(r).
$$
Averaging to isolate a frequency follows the same principle as in the related proof for finite exponential sums. Here the interval average is replaced by exact orthogonality on a finite cyclic group. [Character averaging in the related Riemann hypothesis development](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78) [Lean proof of the disjoint coefficient formula](lean:D5/S3/Fourier/Concentration/CyclicDisjointOccupationCoefficient.cyclic_disjoint_band_product)

For nonnegative weights the residue masses are nonnegative, while their Fourier coefficients can be negative. With two distinct indices of unit weight at residues $0,1$ modulo $2$, a disjoint pair of positive degree must use one index on each side. If $d$ is odd, both ordered pairs have residue $1$. The Fourier coefficient at $k=1$ of the residue masses is $-2$ and cancels the zero character for $R=\{0\}$. Estimating the contribution of nonzero characters at the ζ-tail resolution, with growing degree, remains open.

### A coefficient bound that retains phase cancellation

Fix the character in the preceding product. Let $A_j=w_j\chi_k(-a_j)$ be the complex weight of the left axis, with conjugate $\bar A_j$ on the right, and write $S=\sum_j A_j$. For every $\rho>0$,

$$
(d!)^2\left|[x^dy^d]Q_k\right|
\le
\frac{(d!)^2}{\rho^{2d}}
e^{2\rho|S|}
\prod_j\left(1+(e^{\rho w_j}-1)^2\right).
$$

Terms beyond degree $d$ on either axis do not affect the selected coefficient. In the full exponential series, each local factor has the identity

$$
e^{A_jx}+e^{\bar A_jy}-1
=e^{A_jx+\bar A_jy}\left[1-(1-e^{-A_jx})(1-e^{-\bar A_jy})\right].
$$

The exponential factors multiply to $e^{Sx+\bar Sy}$, retaining cancellation between phases. On expanding the remaining product, each subset gives a product of two separate one-variable series. Sum the absolute coefficients of each series with weights $\rho^n$. The Cauchy product and the triangle inequality bound the resulting sum by the product of the individual sums. The exponential contributes $e^{\rho|S|}$ on each axis and each local factor with its constant term removed contributes $e^{\rho w_j}-1$. Sum over the subsets and multiply the two axis estimates to obtain the bound. The proof also allows independent complex weights and different degrees on the two axes.

Each correction has positive degree on both axes, so the $(d,d)$ coefficient only receives subsets of size at most $d$. The empty subset gives $e^{Sx+\bar Sy}$, whose coefficient has modulus $|S|^{2d}$ after multiplication by $(d!)^2$. In the full product bound, the empty subset contributes $(d!)^2e^{2\rho|S|}/\rho^{2d}$. The bound for the other terms is

$$
\frac{(d!)^2}{\rho^{2d}}e^{2\rho|S|}
\sum_{\substack{I\subseteq J\\0<|I|\le d}}\prod_{j\in I}(e^{\rho w_j}-1)^2.
$$

Adding the two contributions gives a tighter estimate. The full product admits a simple bound in terms of the squared weights.

If every $\rho w_j\le1$, the product is at most $\exp(4\rho^2\sum_j w_j^2)$. The finite estimate reduces the band analysis to bounding $S$ over the characters with the weights supplied by inversion. For actual ζ zeros, controlling the corresponding weighted exponential sums and their exceptional frequencies at the required time scale remains open.

[Lean proof of the disjoint coefficient bound](lean:D5/S3/Fourier/Concentration/DisjointCharacterEnvelope.coefficient_envelope)

### Signed truncation remainder for conjugate phases

For the conjugate weights above, write $C_T=[x^d]e^{Sx}\prod_{j\in T}(e^{-A_jx}-1)$. Put $B_T=0$ for $|T|>d$, and otherwise define
$$
B_T=\left(\prod_{j\in T}w_j\right)\frac{(|S|+\sum_{j\in T}w_j)^{d-|T|}}{(d-|T|)!}.
$$
Retaining the signs of the individual subsets gives the real identity and degree-sensitive bound
$$
[x^dy^d]Q_k=\sum_{\substack{T\subseteq J\\|T|\le d}}(-1)^{|T|}|C_T|^2,\qquad |C_T|\le B_T.
$$
The right-axis correction is the negative of the conjugate left-axis correction, so each subset gives the indicated signed square. The norm of the local exponential tail coefficient at degree $n\ge1$ is at most $w_j^n/(n-1)!$, giving coefficientwise domination by $w_j x e^{w_j x}$. The Cauchy product preserves this nonnegative bound. Multiplication by $e^{|S|x}$ and removal of the $|T|$ extracted powers of $x$ give $B_T$. For example, at $d=1$ the mixed coefficient is $|S|^2-\sum_j w_j^2$, and the entire contribution is nonpositive when $S=0$.

For any natural number $K$, subtract the signed sum over $|T|\le\min(d,K)$ from the mixed coefficient. The remainder $R_K$ satisfies
$$
-\!\sum_{\substack{T\subseteq J\\K<|T|\le d,\ |T|\text{ odd}}}B_T^2\le R_K\le
\sum_{\substack{T\subseteq J\\K<|T|\le d,\ |T|\text{ even}}}B_T^2.
$$
The exact remainder is the sum of the omitted even-cardinality squares minus the sum of the odd-cardinality squares. It vanishes for $K\ge d$. Multiplying by nonnegative Fourier weights and summing preserves the computed negative contributions. This gives a degree-sensitive refinement when applying the Fejér band estimate below. Bounding the high-degree subset squares and the exceptional-character weight for the actual ζ ordinates still requires an arithmetic estimate. [Lean proof of the signed expansion](lean:D5/S3/Fourier/Concentration/DisjointCharacterRemainder.signed_overlap_expansion) [Lean proof of the parity remainder](lean:D5/S3/Fourier/Concentration/DisjointCharacterRemainder.signed_overlap_remainder)

#### Centered coefficient bounds with a quadratic exponential

Keep the definition of $C_T$ and set $k_T=|T|$, $n=d-k_T$, $U_T=S-\frac12\sum_{j\in T}A_j$ and $V_T=\sum_{j\in T}w_j^2$. For $k_T\le d$ there is also the bound
$$
|C_T|\le\left(\prod_{j\in T}w_j\right)\sum_{m=0}^{\lfloor n/2\rfloor}\frac{|U_T|^{n-2m}(V_T/24)^m}{(n-2m)!m!}.
$$
This retains the centered phase sum and squared weights of the selected subset. The local difference satisfies
$$
e^{-A_jx}-1=-A_j x e^{-A_j x/2}\sum_{m\ge0}\frac{(A_jx/2)^{2m}}{(2m+1)!}.
$$
The inequality $6^m m!\le(2m+1)!$ bounds the norm of each local even coefficient by the corresponding coefficient of $e^{w_j^2 x^2/24}$. Extracting the $k_T$ linear factors, combining the phase exponentials, and majorizing the Cauchy product give the degree-$n$ coefficient of $e^{|U_T|x+V_T x^2/24}$. The original coefficient is zero if $k_T>d$. The bound is exact for $n=0$ or $n=1$. If $U_T=0$ and $n$ is odd, the coefficient vanishes. For the general exponential parameter $c$ in place of $S$, a singleton $T=\{j\}$ with $A_j\ne0$ and $c=A_j/2$ gives the degree-$3$ norm $w_j^3/24$, attaining equality for the constant $1/24$ in the quadratic majorant. [Power series for hyperbolic sine](https://dlmf.nist.gov/4.33.E2)

Apply this estimate to the odd and even remainder budgets above, taking the smaller bound with $B_T$ for each subset. The actual ζ tail still requires estimates for the distribution of the subset-centered phase sums with the character weights, and for their aggregate remainder at growing degree. [Lean proof of the centered overlap bound](lean:D5/S3/Fourier/Concentration/CenteredDisjointCharacterBound.centered_overlap_bound)

#### The signed principal sum and its explicit error

The centered even factors have constant coefficient one. With the preceding notation, for $|T|\le d$ define
$$
P_T=\left(\prod_{j\in T}(-A_j)\right)\frac{U_T^n}{n!},\qquad h_T=\frac{|U_T|^n}{n!},\qquad H_T=[x^n]e^{|U_T|x+V_T x^2/24},\qquad A_T=\prod_{j\in T}w_j.
$$
The same coefficientwise domination holds after subtracting one from the product of even factors and its real quadratic exponential majorant. Consequently
$$
|C_T-P_T|\le A_T(H_T-h_T),\qquad
\big||C_T|^2-|P_T|^2\big|\le A_T^2(H_T^2-h_T^2).
$$
For the second inequality, multiply the reverse triangle bound on the difference of the two norms by their sum, which is at most $A_T(H_T+h_T)$. Combining the local estimate with the signed expansion gives
$$
\left|[x^dy^d]Q_k-\sum_{\substack{T\subseteq J\\|T|\le d}}(-1)^{|T|}|P_T|^2\right|\le\sum_{\substack{T\subseteq J\\|T|\le d}}A_T^2(H_T^2-h_T^2).
$$
The terms have zero error for $d-|T|=0,1$. The empty subset also has zero error. In particular the entire approximation is exact for $d\le2$. The inequality holds for each character and can be averaged using positive Fourier weights. Bounding the alternating principal sum and the aggregate error at the required ζ-zero scale remains open. [Lean principal coefficient proof](lean:D5/S3/Fourier/Concentration/CenteredDisjointPrincipal.centered_principal_remainder) [Lean mixed error proof](lean:D5/S3/Fourier/Concentration/CenteredDisjointPrincipal.mixed_centered_principal_error)

### Bounding a cyclic band with nonnegative Fourier weights

Let $R_H$ be the residues of the integers in $[-H,H]$. For a nonnegative residue mass $M(r)$, use the negative character in $\widehat M(k)=\sum_rM(r)\chi_k(-r)$ and put $B_N(k)=\sum_{j=0}^{N-1}\chi_k(j)$. For integers $N>H\ge0$,

$$
(N-H)\sum_{r\in R_H}M(r)+H M(0)
\le \frac{1}{q}\sum_{k\bmod q}|B_N(k)|^2\operatorname{Re}\widehat M(k).
$$

[Lean proof of the cyclic band bound](lean:D5/S3/Fourier/Concentration/CyclicFejerBand.band_le_positive_fourier)

For each representative $h$ in the band, start with the pairs $(j,j)$ for $0\le j<N-H$. Add $|h|$ to the first or second coordinate according to the sign of $h$. The resulting pairs have difference $h\bmod q$ and both coordinates lie in $[0,N-1]$. There are at least $N-H$ such pairs. Fourier inversion on the sum over all prefix pairs gives conjugate character sums for the two coordinates, hence the nonnegative weight $|B_N(k)|^2$. At zero, all $N$ diagonal pairs contribute, yielding the extra $HM(0)$. Taking real parts preserves cancellation across frequencies.

When $N\le q$, the first $N$ natural numbers have distinct residues. Orthogonality then gives $\sum_k|B_N(k)|^2=qN$. If only magnitudes are available, drop $HM(0)$ and replace the real part with $|\widehat M(k)|$. The band mass is then bounded by a probability-weighted magnitude average times $N/(N-H)$. For $N=2H+1\le q$ the factor is below $2$. Inserting the disjoint coefficient estimate into that average leaves the weighted contribution of frequencies where the actual ζ-zero character sums are large. [Fejér kernel](https://dlmf.nist.gov/1.15#E15)

### Prefix weight on exceptional frequencies

For $1\le N\le q$, write $\nu(k)=|B_N(k)|^2/(qN)$ and $m=(2N-q-1)_+$, where $x_+=\max(x,0)$. The sum of squared weights is

$$
\sum_{k\bmod q}\nu(k)^2
=\frac{N(2N^2+1)+m(m+1)(m+2)}{3qN^2}.
$$

[Lean proof of the fourth-moment identity](lean:D5/S3/Fourier/Concentration/CyclicPrefixFourthMoment.sum_prefixCharacter_norm_four)

For $0\le r<q$, the only possible integer differences of prefix indices reducing to $r$ are $r$ and $r-q$. The ordered pair count $c_r$ is therefore $(N-r)_++(N-(q-r))_+$. Character orthogonality gives $\sum_k|B_N(k)|^4=q\sum_r c_r^2$. When the square is expanded, both counts are positive on $q-N+1\le r<N$. The two lists of counts run in opposite orders there, giving the cross term $2\sum_{j=1}^m j(m+1-j)=m(m+1)(m+2)/3$. This term vanishes when $q\ge 2N-1$. When $N=q$, all the weight lies at frequency zero.

For an exceptional set $E$, Cauchy–Schwarz gives $(\sum_{k\in E}\nu(k))^2\le |E|\sum_k\nu(k)^2$. If $E$ excludes frequency zero, subtract $\nu(0)^2=(N/q)^2$ from the sum of squares on the right. Arithmetic estimates must still determine which frequencies of the actual ζ-zero sum exceed a given threshold at the required order and how many there are.

### Minimum squared mass for one spatial mode

Take $q>1$ and $c_k=\cos(2\pi k/q)$. Character orthogonality gives these values mean zero, and their maximum is one. Among nonnegative probability weights $w(k)$ with $\sum_k w(k)c_k\ge a$ for $0\le a\le1$, the minimum squared mass is attained by weights of the form

$$
u_t(k)=\max\{0,1-t(1-c_k)\},\qquad
v_t(k)=\frac{u_t(k)}{\sum_j u_t(j)},\qquad t\ge0.
$$

At $t=0$ the weights are uniform and the moment is zero. For sufficiently large $t$, all entries with $c_k<1$ are clipped to zero and the moment is one. The denominator is always at least one, so continuity yields a finite parameter attaining exactly $a$. For any feasible $w$, the raw affine weights have nonnegative inner product with $w-v_t$ by equal mass and the moment ordering. Clipping can only increase that inner product. Expanding the squares gives $\sum_k w(k)^2-\sum_k v_t(k)^2\ge\sum_k(w(k)-v_t(k))^2$, which proves uniqueness. [Simplex projection with a linear constraint, Zhou and Liu, equation (3.4)](https://arxiv.org/html/2310.10388v3#S3.E4X)

Write $E(w)=\sum_k w(k)^2$, $M(w)=\sum_k w(k)c_k$, and $Z=\sum_k u_t(k)$. For any real weights $w$ of total mass one, expanding the squares gives the exact remainder
$$
E(w)-E(v_t)
=\sum_k(w(k)-v_t(k))^2+
\frac{2}{Z}\left[t(M(w)-M(v_t))
+\sum_k\bigl(t(1-c_k)-1\bigr)_+w(k)\right].
$$
The last term retains the clipped negative weights. One can take $t\le\max(\{0\}\cup\{(1-c_k)^{-1}:c_k<1\})$.

[Lean proof of the one-moment optimum and exact remainder](lean:D5/S3/Fourier/Concentration/ClippedMomentWeights.exists_clipped_moment_minimizer)

Modulo four, $c=(1,0,-1,0)$. For $0\le a\le1/2$, the optimizer is $(1+2a,1,1-2a,1)/4$ and the minimum squared mass is $(1+2a^2)/4$. For $1/2\le a\le1$, the optimizer is $(a,(1-a)/2,0,(1-a)/2)$ and the minimum is $a^2+(1-a)^2/2$. The formulas agree at $a=1/2$. This minimum gives a benchmark for the squared-mass coefficient in the exceptional-set bound under one spatial-mode constraint. A full spatial band imposes joint constraints, and the cardinality of the actual ζ-zero exceptional set needs an arithmetic estimate.

### The first clipping threshold for two spatial modes

Take $q\ge5$ and write $c_k=\cos(2\pi k/q)$, $d_k=\cos(4\pi k/q)$, and $s_k=c_k+d_k$. Let $m_q=\min_k s_k$ and set
$$
a_q=-\frac{1}{2m_q},\qquad v_k=\frac{1+2as_k}{q},\qquad L=\frac{1+4a^2}{q}.
$$
For every real $a$, the vector $v$ has mass one and both real moments equal $a$. For $a\ge0$, its entries are all nonnegative exactly when $a\le a_q$. For $a\ge0$, a nonnegative probability weight with both moments at least $a$ has squared mass $L$ exactly when it equals $v$. For these nonnegative thresholds, equality is attainable exactly for $a\le a_q$. For any real mass-one vector $w$, write $M_j(w)$ for its $j$th real moment. The exact remainder holds for every real $a$
$$
\sum_k w_k^2-L
=\sum_k(w_k-v_k)^2+\frac{4a}{q}\bigl(M_1(w)+M_2(w)-2a\bigr).
$$
This follows from the orthogonality of the two cosines and expansion of the squares. If $a>a_q$, at least one $v_k<0$. For a nonnegative probability weight $w$ satisfying both moment bounds, the moment term is nonnegative. The squared distance at the negative coordinates then gives $\sum_k w_k^2\ge L+\sum_k\max(0,-v_k)^2>L$. The exact optimum after clipping remains open for general moduli.

The double-angle formula gives $s_k=2(c_k+1/4)^2-9/8$. Niven’s theorem excludes $c_k=-1/4$ because the angle is a rational multiple of $\pi$. Hence $m_q>-9/8$. Round the angle with cosine $-1/4$ to the nearest grid point. The error is at most $\pi/q$, so $m_q+9/8\le 2(\pi/q)^2$. The values $s_k$ have mean zero and mean square one. Averaging $(2-s_k)(s_k-m_q)\ge0$ gives $m_q\le-1/2$. Combining the bounds gives
$$
0<a_q-\frac49\le\frac{16\pi^2}{9q^2}.
$$
Thus $4/9$ is a uniform lower bound for the threshold across moduli. The result controls the squared mass of finite weights. The exceptional frequencies for actual high-order ζ-zero harmonics still require an arithmetic estimate. [Lean proof of the first clipping threshold](lean:D5/S3/Fourier/Concentration/FirstCosineClipping.first_cosine_clipping)

### Minimum squared mass for two spatial modes modulo six

On the six residue classes, write $M_j(w)=\sum_{k=0}^5w_k\cos(j\pi k/3)$ and $E(w)=\sum_{k=0}^5w_k^2$. Take $0\le a\le1$. Among nonnegative probability weights satisfying both $M_1(w)\ge a$ and $M_2(w)\ge a$, the unique minimizer $v$ and its squared mass are

$$
\begin{aligned}
v&=
\begin{cases}
(1+4a,1,1-2a,1,1-2a,1)/6,& a\le1/2,\\
(a,(1-a)/3,0,(1-a)/3,0,(1-a)/3),& a>1/2,
\end{cases}\\
E(v)&=
\begin{cases}
(1+4a^2)/6,& a\le1/2,\\
a^2+(1-a)^2/3,& a>1/2.
\end{cases}
\end{aligned}
$$

Write $c_k=\cos(\pi k/3)$ and $d_k=\cos(2\pi k/3)$. On each set where $c_k+d_k$ is constant, the values of $c_k-d_k$ sum to zero. Minimizing squared mass for the combined readout $c_k+d_k$ at threshold $2a$ therefore gives $M_1(v)=M_2(v)=a$. The affine weights at residues $2,4$ are clipped to zero as the threshold passes $1/2$. Both formulas agree at that boundary. [Lean proof of the modulo-six optimum and one-mode comparison](lean:D5/S3/Fourier/Concentration/SixResidueMomentOptimum.six_two_mode_optimum)

For any real weights $w$ of total mass one, set $m=M_1(w)+M_2(w)-2a$. The exact remainder is

$$
E(w)-E(v)-E(w-v)=
\begin{cases}
(2a/3)m,& a\le1/2,\\
((4a-1)/3)m+(2a-1)(w_2+w_4),& a>1/2.
\end{cases}
$$

For nonnegative probability weights $w$, the condition $M_1(w)+M_2(w)\ge2a$ implies $E(w)-E(v)\ge\sum_k(w_k-v_k)^2$, so every weight attaining the minimum is equal to $v$. For $0<a<1$, the optimizer $p$ under the first constraint alone has $M_1(p)=a$ and $M_2(p)<a$. The second constraint excludes this optimizer at every interior threshold.

The vector $v$ also occurs as the normalized Fourier weights of a nonnegative spatial kernel modulo six. The weights are invariant under $k\mapsto-k$. Their third real moment $M_3(v)$ equals zero in the first regime and $2a-1$ in the second. Fourier inversion gives $F(0)=1$, $F(\pm1)=F(\pm2)=a$, and $F(3)=M_3(v)\ge0$. This gives the optimal squared-mass coefficient for this band modulo six. Other moduli require checking the level sets of the combined readout, and the exceptional frequencies of the actual ζ zeros still require an arithmetic estimate.

### Failure of a shared cutoff for two modes

Let $q\ge7$ and write $c_k=\cos(2\pi k/q)$, $d_k=\cos(4\pi k/q)$, $s_k=c_k+d_k$, and $x_+=\max(0,x)$. The squared readout and the zero cutoff give two signed sums:

$$
\sum_{k\bmod q}(c_k-d_k)s_k^2=\frac q4,\qquad
\sum_{k\bmod q}(c_k-d_k)(s_k)_+>0.
$$

The double-angle identity gives $s_k=(2c_k-1)(c_k+1)$ and $c_k-d_k=(1-c_k)(2c_k+1)$. Where $s_k>0$, we have $c_k>1/2$, so every clipped term is nonnegative. At $k=1$, the angle lies in $(0,\pi/3)$, giving $1/2<c_1<1$ and a strictly positive term. Since $s_0=2$, the normalized weights $v_k=(s_k)_+/\sum_i(s_i)_+$ have a positive denominator. At a threshold equal to the average of their moments, the combined readout attains the required sum and the second mode falls below the threshold.

Set $z_k=e^{2\pi i k/q}$ and expand $(c_k-d_k)s_k^2$ in powers of $z_k$, grouping terms by exponent. Both constant terms come from $c_k^2d_k$ and each has coefficient $1/8$. The other exponents have absolute value from $1$ to $6$, so character orthogonality cancels them when summing modulo $q\ge7$. If $c_k-d_k$ summed to zero on every level set of $s_k$, the weighted sum with $s_k^2$ would also vanish. Grouping by exponent and retaining the coefficients follows the step in Alpöge's exponential Dirichlet-series argument that organizes product terms by their summed exponent. [Alpöge's exponential Dirichlet-series proof](https://github.com/the-omega-institute/riemann-hypothesis/blob/c7d25b3bfd7906388bb8eb0774e027a2b756a7b6/src/Development/AbelianVarietyTheory/Proofs/AdelicLatticeProofs/LandauSummableOfExpDirichletSeriesEntire.lean#L84) [Lean proof of the two imbalance formulas](lean:D5/S3/Fourier/Concentration/AggregateCosineBalance.aggregate_cosine_imbalance)

### Fourier weight in a short time range

Let $F$ be a nonnegative real function modulo $q$ whose Fourier coefficients are nonnegative real, with $F(0)>0$. By inversion, $\nu(k)=\widehat F(k)/(qF(0))$ is a probability weight. Suppose $F(r\bmod q)\ge a\ge0$ for $|r|\le H$. For $2H<q$, $2K<q$, and $2HK\le q$,
$$
\sum_{|k|\le K}\nu(k\bmod q)
\le (2K+1)\nu(0)
-\frac{8a}{q^3F(0)}
 \left(\sum_{r=-H}^{H}r^2\right)
 \left(\sum_{k=-K}^{K}k^2\right).
$$
The zero coefficient minus the real part of the $k$th coefficient sums $F(r)(1-\cos(2\pi rk/q))$ over all residues. Each term is nonnegative, so retain the terms with $|r|\le H$. In the principal interval $[-\pi,\pi]$, the cosine deficit satisfies $1-\cos u\ge2u^2/\pi^2$. Applying it on the full set of integer pairs separates the two sums of squares. Equality holds at $K=0$. The deduction is strictly positive when $a>0$ and $H,K>0$. [Lean proof of the short-time weight bound](lean:D5/S3/Fourier/Concentration/CyclicShortTimeWeight.low_fourier_weight_deficit)

For the preceding prefix-pair kernel, $F(r)$ counts pairs having residue difference $r$, so take $a=N-H$. When $N\le q$, $F(0)=N$ and $\nu(0)=N/q$. On a frequency grid of step $d$, mode $k$ corresponds to time $2\pi k/(qd)$. The time range controlled by the explicit formula covers only its corresponding integer modes. The upper bound limits the weight those modes can carry, leaving the rest to the arithmetic estimate.

For a time cutoff $S\ge0$, put $K=\lfloor qdS/(2\pi)\rfloor$ and suppose $2K<q$. The simpler bound $|B_N(k)|\le N$ gives
$$
\nu(\{|k|\le K\}\bmod q)\le (2K+1)N/q
\le N/q+NdS/\pi.
$$
With $H=\lfloor\eta/d\rfloor$ and $N=2H+1\le q$, we have $Nd\le2\eta+d$. Thus controlling every mode up to time $S$ addresses a vanishing fraction of this weight whenever $N/q\to0$ and $(2\eta+d)S\to0$. For phases $g_\gamma=\gamma/r$, a bound on $\log x$ through a constant times $\log X$ reaches times only through a constant times $r\log X$. At finer resolution the arithmetic estimate must account for modes beyond this time range.

## Tracking the common occupation degree

For the same residue data, keep the common part of the two degree-$p$ vectors by adding a variable $z$. Put $h=\sum_j\min(m_j,n_j)$, so the residual degree is $p-h$. Let $M_{h,R}$ be the mass with common degree $h$ and signed gap in $R$. Define
$$
Q_k(x,y,z)=\prod_j\sum_{u,v=0}^p
 \frac{w_j^{u+v}}{u!\,v!}\,x^uy^vz^{\min(u,v)}
 \chi_k(-(u-v)a_j).
$$
The local choice $(u,v)$ adds $u$ and $v$ to the two degrees and $\min(u,v)$ to the common degree. Both count vectors have the same prescribed total, so the factorial scaling is $(p!)^2$. The character factors multiply to the character of their signed gap. Thus
$$
qM_{h,R}=(p!)^2\sum_{k\bmod q}
 [x^py^pz^h]Q_k(x,y,z)\sum_{r\in R}\chi_k(r).
$$
At $h=0$ this gives the disjoint formula. At $h=p$, equality of the two total counts forces $m=n$, giving the occupation diagonal if $0\in R$ and zero otherwise. For an intermediate example, with unit weights at residues $0,1$ modulo $11$, degree $p=2$ and $h=1$, the mass at residue $1$ is $4$. The two left and right count-vector pairs are $((1,1),(2,0))$ and $((0,2),(1,1))$, each of weight $2$. Keeping $h$ and the gap in one product permits estimates on their joint distribution. A bound at the target ζ resolution remains open. [Lean proof of the common-degree formula](lean:D5/S3/Fourier/Concentration/CommonResidualOccupationCoefficient.common_residual_band)

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

## Both cosine bounds are tight at the joint optimum

For $q\ge4$, set $c_k=\cos(2\pi k/q)$ and $d_k=\cos(4\pi k/q)$. Fix $0<a<1$. The probability weight minimizing $\sum_k w_k^2$ under either one of the bounds $\sum_k w_k c_k\ge a$ and $\sum_k w_k d_k\ge a$ attains its own bound and gives the other moment strictly less than $a$. Every least-squared-mass weight subject to both bounds therefore has both moments equal to $a$.

For a single readout $b$, the optimizer is proportional to $f(b_k)$ with $f(x)=\max(0,1-t(1-x))$ for some $t>0$. Any coordinate at the largest readout below $1$ has positive clipped weight. If its weight vanished, all positive weight would be on readout $1$, so the moment would be $1$. In the first-mode problem, $c_1$ is that largest readout. The identity $c_k-d_k=(1-c_k)(2c_k+1)$ changes sign at $c_k=-1/2$. The two readouts have zero mean, so subtracting $f(-1/2)$ from each weight in the signed sum preserves the sum. The products $(c_k-d_k)(f(c_k)-f(-1/2))$ are nonnegative and the product at $k=1$ is positive.

For the second-mode problem on an even cycle, a half-turn preserves $d$ and negates $c$, so the first moment is zero. On an odd cycle, multiplication by two permutes the residues. Thus the sums of $f(c_k)^2$ and $f(d_k)^2$ agree. The convex function $f^2$ has derivative $2tf$. Its tangent inequality at $d_k$, evaluated at $c_k$, is strict at $k=1$, where $d_1<c_1$ and $f(c_1)>0$. Upon summation this gives $\sum_k(d_k-c_k)f(d_k)>0$. The largest value below $1$ is the same for $d$ and $c$ in this case because doubling is a permutation.

If a joint optimizer had slack in one bound, it could move a small distance toward the optimizer for the other bound. The resulting probability weight would retain both bounds and strictly decrease the squared mass. The two moment equalities hold even after support changes. Determining the support and the exact optimal value after clipping for general moduli remains open, as does the arithmetic estimate for exceptional frequencies of the actual high-order ζ-zero harmonics. [Lean proof of the two tight constraints](lean:D5/S3/Fourier/Concentration/ActiveCosineConstraints.active_cosine_constraints)

## The exact high-threshold interval for two cosine moments

Fix an integer $q\ge4$. Write $c_k=\cos(2\pi k/q)$ and $d_k=2c_k^2-1$. The value $1$ occurs for $c$ only at zero. Among the other residues the largest value is $u=c_1$, and the smallest is $\ell=c_{\lfloor q/2\rfloor}$. Let $n_u,n_\ell$ be their multiplicities. Set
$$
g(x)=x-(2x^2-1),\qquad
p=\frac{-g(\ell)}{g(u)-g(\ell)},\qquad
b=pu+(1-p)\ell,\qquad r=\frac{1-a}{1-b}.
$$
The signs $g(\ell)<0<g(u)$ give $0<p<1$. Assign mass $1-r$ to zero, mass $rp$ uniformly to the residues of level $u$, and mass $r(1-p)$ uniformly to the residues of level $\ell$. This vector $v$ has both moments equal to $a$. Its squared mass is
$$
E(v)=(1-r)^2+r^2\left(\frac{p^2}{n_u}+\frac{(1-p)^2}{n_\ell}\right).
$$

To locate the exact interval of optimality, let $P_r(x)=\alpha_r+\beta_rx+\gamma_r(2x^2-1)$ interpolate the three per-residue weights at $1,u,\ell$. The coefficients and the values $P_r(x)$ are affine in $r$. At $r=0$ the polynomial is $(x-u)(x-\ell)/((1-u)(1-\ell))$. Since $u+\ell<0$, both moment coefficients are positive and $P_0(x)<0$ at every intermediate level. For each $f$ among $\beta_r,\gamma_r$ and $-P_r(x)$ at the intermediate levels, form the number $1-f(1)/f(0)$, with $f$ viewed as a function of $r$. Write $B$ for the maximum of these numbers and $1$, and set
$$
a_{\mathrm{crit}}=1-\frac{1-b}{B}.
$$
Then $b<a_{\mathrm{crit}}<1$. Whenever $a_{\mathrm{crit}}\le a\le1$, the interpolant has nonnegative moment coefficients and gives $v_k=\max(0,P_r(c_k))$. For every probability competitor $w$ with both moments at least $a$, expanding squares yields $E(w)-E(v)\ge\sum_k(w_k-v_k)^2$. Thus the candidate uniquely attains the displayed minimum throughout the closed interval.

For $b<a<a_{\mathrm{crit}}$, all three supporting levels still have positive weights. A negative moment coefficient allows a small change within the support that increases the associated moment and preserves the other. A positive interpolant at an intermediate level allows a small amount of weight there, with a change on the three supporting levels that preserves both moments and the total mass. Either change gives a feasible weight with strictly smaller squared mass. At $a=b$, the candidate gives zero mass to residue zero. Mixing in a sufficiently small point mass there preserves feasibility and lowers squared mass because the two supports are disjoint. For any strict energy improvement, a further small mixture with the point mass at zero keeps the energy strictly lower and makes both moments strictly exceed $a$. The general optimizer below the cutoff and the arithmetic estimate for exceptional frequencies of the actual high-order ζ-zero harmonics remain open.

[Lean proof of the exact interval and strict descent](lean:D5/S3/Fourier/Concentration/HighCosineThreshold.cyclic_high_threshold_certificate)

For every $q\ge13$, the first intermediate level to meet the interpolant is $\cos(4\pi/q)$. Put $v_*=\cos(4\pi/q)$, $h=1-u$, $d=1-\ell$, $A=p/2$ and $C=(1-p)/n_\ell$. The upper level has exactly two residues. Write $S_\gamma$ for the slope of $\gamma_r$ and $S(x)$ for the slope of the certificate inequality at the intermediate level $x$. The Lagrange formula gives
$$
S_\gamma=1+\frac{Ad-Ch}{u-\ell},\qquad
S(x)=S_\gamma+\frac{hd}{u-\ell}\left(\frac{A}{u-x}+\frac{C}{x-\ell}\right).
$$
When $A\ge C$, the slope of $\beta_r$ is at most $S_\gamma$. Reflect the grid angles into $[0,\pi]$. Every intermediate level then satisfies $x\le v_*$. For $x<v_*$, the sign of $S(v_*)-S(x)$ is the sign of
$$
A(v_*-\ell)(x-\ell)-C(u-v_*)(u-x).
$$
For even $q\ge14$, $\ell=-1$ and $x\ge-u$. Here $u>8/9$ gives $C/A\le g(u)<25/81$, while $(v_*-\ell)(x-\ell)/((u-v_*)(u-x))\ge u/(2u+1)>8/25$. For odd $q\ge13$, put $w=\cos(\pi/q)$. Then $\ell=-w$ and $x-\ell\ge2w(1-u)$. Using $\pi^2<10$ and $1-\cos t\le t^2/2$ gives $C/A<2/5$ and the same ratio exceeds $19/40$. Both comparisons make $v_*$ the unique contact level and leave both moment coefficients positive there.

If $r_s=(1-s)/(1-b)$, the affine interpolation value satisfies
$$
P_{r_s}(v_*)=P_0(v_*)\frac{s-a_{\mathrm{crit}}}{1-a_{\mathrm{crit}}},\qquad P_0(v_*)<0.
$$
The sign becomes positive as $s$ decreases below the cutoff. The uniform onset at thirteen is sharp. At $q=12$ the lower intermediate level $-u$ has the larger slope, since $g(u)(2u+1)=1>u$ at $u=\sqrt{3}/2$. At that cutoff the interpolant is still negative at $v_*$.

The quantities $u,\ell,p$ tend to $1,-1,1$ respectively. Since $1-p=h(2u+1)/(g(u)-g(\ell))$, one obtains $(1-b)/h\to4$. The term $h/(u-v_*)=1/(2u+1)$ retains a nonzero contribution in the slope. Substitution gives $B=S(v_*)\to5/3$. Using $q^2h\to 2\pi^2$, the high-threshold interval has width
$$
q^2(1-a_{\mathrm{crit}}(q))\longrightarrow\frac{24\pi^2}{5}.
$$

[Lean proof of first contact and the affine crossing](lean:D5/S3/Fourier/Asymptotics/HighCosineThresholdLimit.cyclic_threshold_first_contact) · [Lean proof of the modulus-twelve exception](lean:D5/S3/Fourier/Asymptotics/HighCosineThresholdLimit.cyclic_threshold_twelve_no_contact) · [Lean proof of the sharp width limit](lean:D5/S3/Fourier/Asymptotics/HighCosineThresholdLimit.cyclic_criticalThreshold_limit)

## Support thresholds for the integer-lattice minimum

At large moduli the quadratic deficit of the second cosine near the origin leads to an integer-lattice problem. Fix a second-moment budget $m\ge0$ and minimize $\sum_j w_j^2$ subject to $\sum_j w_j=1$, $w_j\ge0$, and $\sum_j j^2 w_j\le m$. The indices range over $\mathbb Z$, with a convergent sum for the second moment.

For each positive integer $n$, precisely the budgets in $[(n^2-1)/5,n(n+2)/5]$ admit a radius parameter $n^2\le t\le(n+1)^2$ for which the minimizing weights are
$$
w_j=\frac{(t-j^2)_+}{Z},\qquad
Z=\sum_{|j|\le n}(t-j^2)>0.
$$
Their second moment is exactly $m$. The two budget endpoints correspond to $t=n^2$ and $t=(n+1)^2$. Only the sites $|j|\le n-1$ have positive weight at the lower endpoint. Above it the support expands to $|j|\le n$ and retains that radius through the upper endpoint. The closed intervals meet at their endpoints and cover all $m\ge0$. At $m=0$ the entire mass is at zero.

The candidate's second moment is a ratio of finite sums. Substituting the two endpoints for $t$ and using the sums of squares and fourth powers gives the two budget endpoints. Continuity gives the intermediate budgets. For any nonnegative law $v$ of mass one with convergent second moment $s$, expand the difference of squared masses. Split the cross term into the contribution from $(t-j^2)/Z$ and the correction outside the support to obtain
$$
\sum_j v_j^2-\sum_j w_j^2
= \sum_j(v_j-w_j)^2+\frac{2(m-s)}{Z}
  +\frac{2}{Z}\sum_j (j^2-t)_+v_j.
$$
The last term is summable and nonnegative. When $s\le m$, the identity gives strict uniqueness of the weights. Since $t\ge1$, their values $w_0=t/Z$ and $w_0-w_1=1/Z$ also determine $t$ and $Z$. The adjacent closed intervals give the same weights and parameters at their shared endpoint. The half-open condition $(n^2-1)/5\le m<n(n+2)/5$ selects the unique index $n=\lfloor\sqrt{5m+1}\rfloor$. On the first interval $0\le m\le3/5$, the three possible sites have weights $1-m$ at zero and $m/2$ at each neighbor. In the second-harmonic scale $\lambda=8\pi^2m$, the upper endpoint is exactly $24\pi^2/5$. A quantitative transfer of the lattice minimum back to the finite cycle has to account for the second cosine also approaching $1$ near the antipode.

[Lean proof of the closed-interval support and exact remainder](lean:D5/S3/Fourier/Asymptotics/LatticeSquareMomentActivation.exists_lattice_square_moment_minimizer_on_interval) · [Lean proof of the global half-open classification](lean:D5/S3/Fourier/Asymptotics/LatticeSquareMomentActivation.exists_lattice_square_moment_minimizer)

### The finite cyclic minimum converges to the lattice minimum

Fix $\lambda\ge0$ and set $m=\lambda/(8\pi^2)$ and $a=1-\lambda/q^2$. Write $L(m)$ for the lattice minimum above and $E_q(a)$ for the minimum squared mass on the cycle with both cosine moments at least $a$. If $m$ belongs to the interval indexed by $n$, let $R$ be its support radius. At the lower endpoint $R=n-1$, and elsewhere $R=n$. When $q>2R$, the cyclic minimum is attained and
$$
0\le L(m)-E_q(a)\le \frac{2t}{Z}\frac{\lambda}{q^2}\le\frac{2\lambda}{q^2}.
$$
For any nonnegative cyclic weight $v$ of mass one, let $\bar i$ be the centered integer representative of the residue $i$. Write $M_1(v),M_2(v)$ for its cosine moments and put $S_1=2t(M_1(v)-a)/Z$ and $S_2=(q/(2\pi))^2(M_2(v)-a)/Z$. With the same lattice minimizer $w$,
$$
\sum_i(v_i-w_{\bar i})^2+S_1+S_2
\le\sum_i v_i^2-L(m)+\frac{2t}{Z}\frac{\lambda}{q^2}.
$$

When $q>2R$ the lattice support embeds in the cycle. The inequality $1-\cos x\le x^2/2$ bounds the two deficits of the embedded law by $\lambda/(4q^2)$ and $\lambda/q^2$, so the law is feasible. The reverse bound accounts for weight near the antipode, where the second cosine also approaches $1$. Let $\theta=2\pi\bar i/q$. Throughout the centered range, $\theta^2\cos\theta\le\sin^2\theta$. This follows by sign when the cosine is nonpositive. Otherwise apply $\sin x\ge x\cos x$ to the positive half-angle and use $\cos^4(\theta/2)\ge\cos\theta$. Consequently the certificate
$$
P_i=\frac{t\cos\theta-(q\sin\theta/(2\pi))^2}{Z}
$$
lies below $w_{\bar i}$ at every residue. Expressing $2\sum_i v_iP_i$ in terms of the two cosine moments gives the contributions $S_1,S_2$. Use $(t-m)/Z=L(m)$ in the expansion of the squared distance. Both contributions are nonnegative for feasible weights. The zero site contributes $t$ to the normalizer $Z$, giving $t/Z\le1$.

Each fixed budget lies in an interval of finite support radius. Thus $E_q(1-\lambda/q^2)$ tends to $L(\lambda/(8\pi^2))$ through all integer moduli. The arithmetic estimate for high-order frequencies of the actual ζ zeros remains open.

[Lean proof of the centered cosine identity](lean:D5/S3/Fourier/Asymptotics/CyclicToLatticeComparison.cosineMoment_eq_centered) · [Lean proof of the quantitative comparison](lean:D5/S3/Fourier/Asymptotics/CyclicToLatticeComparison.cyclic_to_lattice_comparison)

### Mass near the antipode

The cyclic minimizers converge to the lattice law at every fixed centered site. The two tight constraints also determine a smaller amount of weight lying far from these sites. For a fixed $\lambda\ge0$, let $v_q$ be any cyclic minimizer at threshold $1-\lambda/q^2$. Set $c_i=\cos(2\pi i/q)$ and $A_q=\{i:c_i<0\}$. Through all integer moduli,
$$
q^2\sum_{i\in A_q}v_q(i)\longrightarrow \frac{3\lambda}{8},
\qquad
q^2\sum_{i\in A_q}(1+c_i)v_q(i)\longrightarrow 0.
$$
The second limit implies that for any fixed $\varepsilon>0$, the part of the rescaled mass on $A_q$ where $c_i\ge-1+\varepsilon$ tends to zero.

On the fixed support of the lattice law, the first and second cosine deficits, multiplied by $q^2$, have limiting weighted sums $\lambda/4$ and $\lambda$. Over the full cycle each rescaled deficit sums to $\lambda$ because both constraints are tight. For $\lambda=0$ the pointwise upper bound one forces both moment equalities as soon as the weight is feasible. Nonnegativity then makes the second deficit outside the fixed support tend to zero. On $c_i\ge0$ it bounds $1-c_i$ after division by two, and on $c_i<0$ it bounds $1+c_i$ after the same division. Thus the first deficit over $A_q$ tends to $3\lambda/4$, and its difference from twice the rescaled mass tends to zero. This argument splits off a finite sum and bounds its remainder before passing to the limit. The related proof for character sums uses this method to compare a finite Dirichlet polynomial with a logarithmic derivative. [Character-sum tail bound](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/GL3MeanSquares/GenusMeanAsymptotics/JacobiCharacterSums/TailFinal.lean#L32-L55)

[Lean proof of the rescaled antipodal mass limit](lean:D5/S3/Fourier/Asymptotics/CyclicNegativeCosineMass.cyclic_negative_cosine_mass_limit)

### The energy gap on even and odd cycles

At fixed $\lambda>0$, put $m=\lambda/(8\pi^2)$ and write $w_j=(t-j^2)_+/Z$ for the lattice law. Its fourth moment is $m_4=\sum_j j^4w_j$. Along either parity of modulus,
$$
\lim_{q\to\infty} q^2\bigl(L(m)-E_q(1-\lambda/q^2)\bigr)
=\frac2Z\left[(t-d^2)\frac{3\lambda}{8}+\frac{4\pi^2}{3}m_4\right],
$$
where $d=0$ for even $q$ and $d=1/2$ for odd $q$. The closest sampled cosine to $-1$ sits a half step from the antipode on odd cycles. This makes the odd coefficient smaller by $3\lambda/(16Z)$. The fourth moment contributes the same term on both parities.

Write $h=2\pi/q$ and $C=-\cos(dh)$. In the quadratic certificate
$$
p_q(c)=\frac{t-h^{-2}(1-c^2)-\beta_q(1-c)}{Z},
\qquad \beta_q=\frac{t-h^{-2}(1-C^2)}{1-C},
$$
one root is exactly $C$. The other root $\rho_q$ has $(1-\rho_q)/h^2\to t/2$. Factoring shows that the positive part is supported in a fixed front window, so the fourth-order cosine expansion can be summed there. At an activation endpoint the undisplaced weight of the boundary site is zero. Its squared positive part after perturbation is $O(h^4)$, so it does not change the coefficient at order $h^2$. [Cosine series](https://dlmf.nist.gov/4.19.E2)

The certificate bounds the energy of every feasible weight by completing the square. To attain that bound to order $h^2$, adjust the mass at zero and its nearest neighbors and add mass at the closest antipodal level, imposing both moment equalities. The front corrections are $O(h^2)$ and the added mass is asymptotic to $3mh^2/4$. For a fixed positive budget the three adjusted front sites have positive limiting weights, so the construction is feasible for all sufficiently large moduli, including at activation endpoints. The statement concerns the finite cycle at fixed budget. The weighted high-order arithmetic estimate for the actual ζ ordinates remains open. [Derivation and hypotheses](https://github.com/the-omega-institute/trureturing/issues/33993#issuecomment-7146572104)

[Lean proof of the parity energy correction](lean:D5/S3/Fourier/Asymptotics/CyclicParityLimit.cyclic_parity_correction)

### Which sites carry positive mass

For each fixed $\lambda>0$ and every sufficiently large modulus, the cyclic minimizer has positive mass exactly at the front sites $j^2\le t$ and at the closest antipodal sites. There is one closest antipodal site on an even cycle and two on an odd cycle. At a lattice activation boundary $t=N^2$, the limiting lattice weights at $\pm N$ are zero, but the two finite-cycle weights are positive and of order $q^{-2}$.

To obtain an exact certificate, fit the weight as a linear combination of $1$, $1-c$, and $(1-c^2)/h^2$ on those sites, where $c=\cos(jh)$ and $h=2\pi/q$. Solve the three equations for the mass and the two deficits. The feature vectors at the center, a front neighbor, and an antipodal site are independent in the limit. At a square boundary, the first variation of the weight at $\pm N$ has a positive contribution from the change in the second moment on the front window. It also has a nonnegative contribution from the monic quadratic orthogonal to $1$ and $j^2$ there. The quadratic certificate is negative at the first omitted cosine on either side. Convexity then excludes the intervening residues, and completing the square certifies the unique minimum on the whole cycle. For the minimizing weight $v$, every feasible weight $w$ satisfies $E(w)-E(v)\ge\sum_i(w_i-v_i)^2$.

The bound on how large $q$ must be depends on the fixed budget. The support statement concerns the two prescribed cosine constraints. [Lean proof of support and stability](lean:D5/S3/Fourier/Asymptotics/CyclicEventualSupport.cyclic_eventual_exact_support) · [Exact certificate and boundary calculation](https://github.com/the-omega-institute/trureturing/issues/34004#issuecomment-7147550923)

### Where the front support changes on a finite cycle

Fix an integer $N\ge2$ and write $h=2\pi/q$. Use the common cosine floor $1-2mh^2$. The lattice switch occurs at $m_N=(N^2-1)/5$. In a neighborhood of $m_N$, for sufficiently large $q$, the finite cycle switches at a single budget $m_{N,q}$. The nearest antipodal sites and the front sites $|j|\le N-1$ carry positive mass throughout the neighborhood. The sites $\pm N$ carry positive mass exactly when $m>m_{N,q}$. Along each parity,
$$
\frac{m_{N,q}-m_N}{h^2}
\longrightarrow
\frac{(N^2-1)(47-31N^2)}{420}+\frac{3(N^2-1)d^2}{20},
\qquad d=\begin{cases}0& q\text{ even},\\[2pt]1/2& q\text{ odd}.\end{cases}
$$
Both coefficients are negative, so the boundary pair enters before the lattice budget is reached. The odd coefficient exceeds the even coefficient by $3(N^2-1)/80$.

For a fixed candidate window, the moment right-hand side is affine in $m$. Fit the three cosine features on the larger window and define the switch by the zero of the weight at $N$. The slope of that weight tends to $(N^2-\bar x)/V>0$, where $x_j=j^2$, $\bar x$ is the mean of $x_j$ on $|j|\le N$, and $V=\sum_j(x_j-\bar x)^2$. Removing the two zero-weight rows leaves the same moment equations at the switch. For the smaller window, the evaluation at the omitted pair also has positive slope. The other front weights retain positive limits. The antipodal weights are positive at order $h^2$, while the first excluded cosine on each side has a strictly negative limit when the boundary pair is included in the test window. Convexity then controls the middle of the cycle. [Parametric quadratic programming, §4](https://doi.org/10.1016/S0005-1098(01)00174-1)

For the shift, write $T=N^2$, $W_j=(T-x_j)/Z$ with $Z=\sum_j(T-x_j)$, and $m_4=\sum_j x_j^2W_j$. Let $r_j$ be the coefficient of $h^2$ in the front weight at budget $m_N$, and let $\mu=3m_N/4$ be the coefficient of the total antipodal weight. The quadratic $r_j+\mu W_j$ has zero total and first $x$-moment $K=m_4/3+(m_N-d^2)\mu$. Its leading coefficient is $1/(3Z)$. Eliminating the constant and linear terms gives
$$
\frac{r_N V}{T-\bar x}=K+\frac{m_4-m_N^2}{3}.
$$
The threshold shift is the negative of this ratio. The symmetric finite sums yield $m_4=(N^2-1)(3N^2-5)/35$ and give the displayed coefficient. The asymptotic keeps $N$ fixed. Small moduli can give positive weight on additional antipodal levels. [Lean proof of the switch and scaled displacement](lean:D5/S3/Fourier/Asymptotics/CyclicActivationShift.cyclic_activation_shift) · [Derivation and finite checks](https://github.com/the-omega-institute/trureturing/issues/34016#issuecomment-7148575133)

The growth of the lattice radius leads to a separate question about uniform moment errors and the exact antipodal support. The [growing cyclic support analysis](ch34-s28-s03-s02-growing-cyclic-support.md) develops this regime.

### Exact support away from the rear thresholds

Fix the eventual parity $e\in\{0,1\}$ and suppose $N^5h^2\to K>0$. Put $Q=3K/20$. The rear window $S_l$ of index $l\ge0$ contains offsets from $-l-e/2$ through $l+e/2$ in unit steps, measured from the antipodal angle. Define

$$
T_0(l)=\frac{l(2l-1)(2l+1)}4,\qquad
T_1(l)=l(l+1/2)(l+1).
$$

If $Q$ differs from every $T_e(l)$, there is a unique $l$ satisfying $T_e(l)<Q<T_e(l+1)$. For all sufficiently large $N$, the unique cyclic optimizer $v$ is the joint fit on the front sites $|j|\le N$ and the rear window $S_l$, extended by zero on all other sites. It is strictly positive at every site in these two windows, and both cosine moments equal $1-2mh^2$. For every feasible probability weight $w$,

$$
\sum_j w_j^2\ge\sum_j v_j^2+\sum_j(w_j-v_j)^2.
$$

Writing $R=l+e/2$, the limiting rear intercept is $B=(Q+(3/4)\sum_{r\in S_l}r^2)/|S_l|$. Finite summation gives

$$
\begin{aligned}
\tfrac34\left(|S_l|R^2-\sum_{r\in S_l}r^2\right)&=T_e(l),\\
\tfrac34\left(|S_l|(R+1)^2-\sum_{r\in S_l}r^2\right)&=T_e(l+1).
\end{aligned}
$$

The strict cutoffs are therefore equivalent to $3R^2/4<B<3(R+1)^2/4$. The boundary limits give positive values at the last included sites of both windows and negative signed values at the first omitted sites. The fitted polynomial is convex in the sampled cosine, so these four signs control the full cyclic grid. The exact correspondence of grid sites transfers the fitted moment equations to the cyclic group, and the finite optimality certificate yields the squared-distance inequality.

If $q/N^{5/2}\to\gamma>0$, then $Q=3\pi^2/(5\gamma^2)$. The first additional rear pair enters below $\gamma=2\pi/\sqrt5$ on even cycles and below $\gamma=\pi/\sqrt5$ on odd cycles. The same formulas classify every subsequent switch away from equality. At equality the limiting signed value of a rear level vanishes, leaving its activation unresolved. [Kernel-checked Lean proof](lean:D5/S3/Fourier/Asymptotics/CyclicGrowingSupport.eventual_strict_support_away_from_thresholds) · [Research and proof development](https://github.com/the-omega-institute/trureturing/issues/34029)

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
