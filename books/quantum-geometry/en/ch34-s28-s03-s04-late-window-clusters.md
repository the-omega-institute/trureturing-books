# 31.1.3.4 Late-window mass, cluster values, and spectral errors {#sec-ch34-s28-s03-s04-late-window-clusters}


**How does a window budget bound an interior negative excursion?** Use the prime-only tail from above and write

$$
Q_{\vartheta}(x)=\int_x^\infty\frac{\vartheta(t)-t}{t^2}\,dt,
\qquad N(a,b)=\int_a^b\frac{\max\{-Q_{\vartheta}(z),0\}}{\sqrt z}\,dz.
$$

::: {.theorem #thm-ch31-prime-tail-negative-window title="Window mass forced by an interior negative value" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.prime_tail_negative_window_lower"}
Let $a,b,x,r$ be real with $0<r\le 1/2$, $1\le a\le(1-r)x$, and $(1+r)x\le b$. If $Q_{\vartheta}(x)\le-4r^2$, then $N(a,b)\ge r^3\sqrt{x}$.
:::

::: proof
The estimate holds at real cutoffs, including prime jumps.

Monotonicity lets us compare $\vartheta(t)$ to $\vartheta(x)$ inside the local integral. It gives
$Q_{\vartheta}(z)-Q_{\vartheta}(x)\le\ln(z/x)+\vartheta(x)(1/z-1/x)$.
Choose the left side if $\vartheta(x)\le x$ and the right side otherwise. On the chosen side the upper bound is at most $\ln(z/x)+x/z-1$. The inequality $\ln t\le t-1$ reduces this to $(z-x)^2/(zx)\le 2r^2$. Throughout that interval of length $rx$ we have $-Q_{\vartheta}(z)\ge 2r^2$ and $\sqrt{z}\le2\sqrt{x}$. Integration gives the lower bound. The full proof is checked by the Lean kernel.

:::

A window budget strictly below $r^3\sqrt{x}$ therefore rules out a dip of depth $4r^2$ at that interior point. The margins on both sides determine which $r$ can be used. This local estimate takes a window budget as input. Under the external arithmetic inputs specified above, the modulus-one construction gives arbitrarily late windows with a small budget.

::: {.theorem #thm-ch31-prime-fixed-ratio-mass title="A fixed-ratio window bound from an off-line zero" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeFixedRatioWindowMass.prime_tail_fixed_ratio_mass_of_zero"}
Let $\rho$ be a nontrivial zero with $\beta=\operatorname{Re}\rho>1/2$. There are real constants $\kappa>1$, $c>0$, and $S$ such that every real window with $B\ge S$, $A\ge2$, and $B\ge\kappa A$ satisfies

$$
N(A,B)\ge cB^{\beta-1/2}.
$$
:::

::: proof

Use the member of the conjugate pair with positive imaginary part. Choose a line strictly between $1/2$ and $\beta$. A compactly supported probability average retains the pair and cancels the other zeros to the right of that line. Write $Q$ for the complete tail defined using $\psi$. In the coordinate $t=\ln x$, the shifted average of $-Q(e^t)$ has a leading cosine at scale $e^{(\beta-1)t}$. The error has a strictly smaller exponent, so it eventually falls below one quarter of the leading amplitude.

Choose a subinterval of fixed length where the cosine is at least $1/2$. When the probability and interval integrations are exchanged, each translated subinterval lies in the same window enlarged by the support of the filter. The signed integral over each translate is bounded by the integral of the positive part of $-Q(e^t)$ over that enlarged window. On $[T,T+W]$, the substitution $x=e^t$ contributes a weight of at least $e^{T/2}$, and $Q_\vartheta\le Q$. The resulting prime-only mass is bounded below at scale $e^{(\beta-1/2)T}$. With $T=\ln B-W$ and $\kappa=e^W$, the subwindow is $[B/\kappa,B]$ and lies inside every admissible $[A,B]$.

The full proof is checked by the Lean kernel.
:::

The ratio, coefficient, and threshold may depend on the supplied zero. The bound retains its full exponent for every zero satisfying the hypothesis. Allowing every prescribed $\kappa>1$ would require further control of the filter support and oscillation period.

::: {.theorem #thm-ch31-prime-prescribed-ratio-mass title="A prescribed-ratio mass bound when the supremum is unattained" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePrescribedRatioWindowMass.prime_tail_prescribed_ratio_mass_of_unattained"}
Let $\Theta$ be the supremum of the real parts of nontrivial zeros of the Riemann zeta function, and suppose every nontrivial zero has real part strictly below $\Theta$. Fix any real $\kappa>1$ and $1/2<\sigma<\Theta$. There are constants $c>0$ and $S$ such that every pair of real endpoints with $B\ge S$, $A\ge2$, and $\kappa A\le B$ satisfies

$$
N(A,B)\ge cB^{\sigma-1/2}.
$$
:::

::: proof

For logarithmic width $W=\ln\kappa$, reserve width $W/2$ for the support of the probability filter. When the supremum is unattained, the zeros with ordinates in any bounded range can be kept to the left of a cutoff strictly below $\Theta$. A retained conjugate pair can then have real part $\beta>\sigma$ and an ordinate large enough that two cosine periods and the filter support fit inside width $W$. The averaged cosine dominates the error throughout a subinterval of fixed length. Exchanging the probability average with integration over that subinterval gives a lower bound on the unaveraged negative mass within the same window.

The substitution $x=e^t$ and the comparison $Q_\vartheta\le Q$ transfer the bound from $[\ln B-W,\ln B]$ to $[B/\kappa,B]$, with exponent $\beta-1/2$. This subwindow lies in every admissible $[A,B]$, and for sufficiently large $B$ the same constant gives the bound with exponent $\sigma-1/2$. The full proof is checked by the Lean kernel.
:::

The constant and threshold can depend on the prescribed ratio and exponent. The statement applies to $\sigma<\Theta$ when the supremum is unattained.

::: {.theorem #thm-ch31-prime-unattained-endpoint-mass title="The endpoint exponent when the supremum is unattained" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeUnattainedEndpointMass.prime_tail_endpoint_mass_tendsto_zero"}
Let $\Theta>1/2$ be the supremum of the real parts of nontrivial zeros of the Riemann zeta function, and suppose every nontrivial zero has real part strictly below $\Theta$. Put $p=\Theta-1/2$. As real $B\to+\infty$,

$$
\frac{N(2,B)}{B^p}\longrightarrow0.
$$
:::

::: proof
Normalize the complete tail by $x^{1-\Theta}$. Each nontrivial zero contributes a term that tends to zero at this scale. The absolute sum of the zero coefficients supplies a common bound, so the limit passes through the series. The trivial-zero and constant terms vanish at this scale. The prime-power correction is $O(x^{-1/2})$ and also vanishes after normalization because $\Theta>1/2$. It follows that $x^{1-\Theta}Q_\vartheta(x)\to0$.

For any $\varepsilon>0$, fix $X\ge2$ beyond which the mass integrand is at most $\varepsilon p x^{p-1}$. The integral over $[X,B]$ is at most $\varepsilon(B^p-X^p)$. The initial mass $N(2,X)$ is fixed and vanishes after division by $B^p$. The argument includes $\Theta=1$. The full proof is checked by the Lean kernel.
:::

Nonnegativity gives $0\le N(A,B)\le N(2,B)$ for every $2\le A\le B$, so the endpoint limit controls all of these windows at once. The prescribed-ratio lower bound holds at every positive exponent strictly below $\Theta-1/2$. At the endpoint exponent, the normalized mass tends to zero.

::: {.theorem #thm-ch31-prime-attained-short-windows title="Short zero-mass windows when the supremum is attained" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeAttainedShortWindows.prime_tail_positive_short_windows_of_attained_zero"}
Suppose a nontrivial zero $\rho$ has $\beta=\operatorname{Re}\rho>1/2$, and every nontrivial zero has real part at most $\beta$. There are real constants $\kappa_0>1$, $K\ge1$, and $X_0\ge2$ such that every $X\ge X_0$ admits an $A\in[X,KX]$ with

$$
Q_\vartheta(x)>0\quad(A\le x\le\kappa_0 A),
\qquad N(A,\kappa A)=0\quad(1\le\kappa\le\kappa_0).
$$
:::

::: proof
In logarithmic coordinates, a compactly supported positive filter retains a conjugate pair on the rightmost line. A positive peak of the filtered signal forces a positive value of the unfiltered complete tail somewhere in every sufficiently late logarithmic window of one fixed width. After multiplication by $e^{(1-\beta)t}$, these peaks have a common positive lower bound.

Under the same normalization, the terms from zeros with real part below $\beta$ tend to zero. Absolute summability of the zero coefficients supplies the dominating bound, allowing zeros arbitrarily close to the rightmost line. The terms on that line form a uniformly continuous function. The normalized prime-power correction also tends to zero because $\beta>1/2$. Each sufficiently late peak therefore extends to its right across a fixed logarithmic width on which $Q_\vartheta>0$. Exponentiation converts the distance to the next peak into the factor $K$ and the width of the positive interval into the ratio $\kappa_0$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-prime-mass-no-finite-limit title="No finite mass limit at a fixed ratio when a zero attains the largest real part" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeAttainedMassNonconvergence.prime_tail_mass_no_finite_limit_of_attained_zero"}
Suppose a nontrivial zero $\rho$ attains the largest real part $\beta=\operatorname{Re}\rho>1/2$. For any fixed real $\kappa>1$, set

$$
M_\kappa(B)=\frac{N(B/\kappa,B)}{B^{\beta-1/2}}.
$$

Then $M_\kappa(B)$ has no finite limit as real $B\to+\infty$.
:::

::: proof
Put $p=\beta-1/2$ and choose $1<\lambda\le\min(\kappa,\kappa_0)$. Split the same window $[B/(\lambda\kappa),B]$ in two ways, at $B/\lambda$ and at $B/\kappa$, to obtain

$$
M_\lambda(B)-\kappa^{-p}M_\lambda(B/\kappa)
=M_\kappa(B)-\lambda^{-p}M_\kappa(B/\lambda).
$$

If $M_\kappa$ tends to a finite $L$, then $0\le M_\lambda\le M_\kappa$ makes $M_\lambda$ eventually bounded. The right-hand side tends to $(1-\lambda^{-p})L$. Since $0<\kappa^{-p}<1$, the recurrence forces $M_\lambda$ to tend to $(1-\lambda^{-p})L/(1-\kappa^{-p})$. Subtract the proposed limit from the recurrence. After any fixed number $n$ of steps, the initial error is multiplied by $\kappa^{-np}$. The remaining terms are controlled by the vanishing error and a convergent geometric series. The arbitrarily late zero-mass windows force this limit to be zero, hence $L=0$.

Choose a fixed integer $m$ so that $\kappa^m$ meets the ratio required by the fixed-ratio power lower bound. Split $[B/\kappa^m,B]$ into $m$ adjacent windows of ratio $\kappa$. The normalized total mass is a sum of $m$ values of $M_\kappa$ with fixed weights and would also tend to zero. This contradicts the positive lower bound at the same power $p$ on the larger window. The full proof is checked by the Lean kernel.
:::

Bingham and Gashi also use a geometric expansion to connect delayed and cumulative means for discrete logarithmic moving averages. [Bingham–Gashi, equations (2.3)–(2.4)](https://arxiv.org/abs/1408.1301)

::: {.theorem #thm-positive-average-prime-window title="Frequent positive averages force a lower bound in every late window" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.eventual_prime_window_lower_of_log_frequency"}
Use the complete Mangoldt remainder $U$ and the prime-only negative mass $N$ defined above. For real $v$ put $H(v)=\int_{v-\ln 2}^v U(e^t)\,dt$. Let $(u_n)$ be a real sequence with $u_n\to+\infty$ and $u_{n+1}/u_n\to1$. Suppose also that $H(u_n)\ge c e^{\beta u_n}/u_n^M$ for all sufficiently large $n$, for some $c>0$, $\beta>1/2$, and $M\in\mathbb R$. Then for every $\varepsilon>0$ and every sufficiently large $Y$,

$$
N(Y,Y^{3/2})\ge Y^{(3/2)(\beta-1/2)-\varepsilon}.
$$
:::

::: proof
Write $y=\ln Y$ and fix $1<k<3/2$. Starting past a sufficiently late index, take the first $n$ with $u_n\ge ky$. The preceding term is below $ky$, and successive ratios are eventually below $3/(2k)$, so $ky\le u_n\le3y/2$. Once $(k-1)y\ge\ln 2$, the entire interval $[e^{u_n}/2,e^{u_n}]$ lies within $[Y,Y^{3/2}]$. Substituting $x=e^t$ and using $U(x)=-xQ(x)$ gives $H(u_n)=-\int_{e^{u_n}/2}^{e^{u_n}}Q(x)\,dx$. The prime-power correction gives $Q_\vartheta\le Q$, and $\sqrt x\le e^{u_n/2}$ on the shorter interval. Thus $H(u_n)\le e^{u_n/2}N(Y,Y^{3/2})$. Taking $k$ close to $3/2$ leaves an arbitrarily small exponent loss to absorb $c$ and $u_n^M$. The full proof is checked by the Lean kernel.
:::

**Positive averages from a zeta zero.** Extend $U$ by zero on $0<x<1$ and call the resulting function $U_0$. For $H_*(x)=\int_1^2 U_0(x/v)\,dv/v$ we have $H_*(x)=H(\ln x)$ when $x>2$. On $\operatorname{Re}(s)>1$, exchanging two absolutely convergent integrals gives the Mellin transform $k(s)\Phi_*(s)$, where $\Phi_*$ is the complete Mangoldt transform with its analytic value at $1$ and $k(s)=(1-2^{-s})/s$. The averaged function is locally Lipschitz in the logarithmic variable, vanishes for $x<1$, and is $O(x\ln^2 x)$ at infinity. Since $|2^{-\rho}|=2^{-\operatorname{Re}(\rho)}<1$, averaging retains the pole at every nontrivial zero. The real part of each pole is at most the growth abscissa of $H_*$, since otherwise the original Mellin integral would be holomorphic at the pole.

Use the meromorphic continuation on $\operatorname{Re}(s)>-3/4$ and take $\sigma_0=-1/2$ in the weak-boundedness conditions. This includes all nontrivial zeros in the local count. The Riemann–von Mangoldt formula bounds the number of zeros with multiplicity in a unit-height interval by $O(\ln t)$. For $\operatorname{Re}(s)\le2$, the local expansion of $\zeta'/\zeta$ writes it as a sum of reciprocal differences from nearby zeros plus an $O(\ln t)$ error. Each reciprocal distance is bounded by $\exp(\sum_{|\operatorname{Im}\rho-t|\le1}m_\rho|\ln|s-\rho||)$. To the right of this strip the absolutely convergent Dirichlet series gives a uniform bound. On the remaining bounded height range, subtract the finitely many pole terms and bound the holomorphic remainder on the compact strip. The factors $k(s)$ and $1/[s(s-1)]$ preserve the required vertical bound. The contour around the real singularities can start at $-1/4$. Its only pole is the simple pole at $0$, so its contribution is constant. [Srinivas, Lemmas 3 and 4](https://www.impan.pl/shop/en/publication/transaction/download/product/83372?download.pdf)

For a nontrivial zero of real part $\beta>1/2$, Radziejewski's theorem gives alternating oscillations of magnitude at least a constant times $x^\beta/(\ln x)^M$. The bounded main term is absorbed by this lower bound. Taking the even subsequence gives positive averages, and the product of two consecutive logarithmic ratios still tends to $1$. The same lower bound on window mass now follows from [@thm-positive-average-prime-window]. This step uses the published oscillation theorem. The Lean result covers the transfer from positive averages to window mass. The small-budget upper bound follows separately from the forward implication of [@thm-ch31-prime-window-rh]. Applying the externally proved RH gives $A_{\vartheta,b}(Y)\le Y^\eta$ for every fixed $b>1$ and $\eta>0$ and all sufficiently large $Y$. [Radziejewski, Theorem 3.2, DOI 10.4064/aa163-2-7](https://www.impan.pl/shop/en/publication/transaction/download/product/82009?download.pdf#page=8)

::: {.theorem #thm-ch31-prime-attained-critical-width title="The critical width for normalized negative mass" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeAttainedCriticalWidth.prime_tail_zero_liminf_iff_le_critical_width"}
Suppose a nontrivial zero attains the largest real part $\beta>1/2$, and put $p=\beta-1/2$. For each fixed logarithmic width $W\ge0$, set

$$
a(W)=\liminf_{B\to+\infty}\frac{N(Be^{-W},B)}{B^p}.
$$
There is a unique real $W_*>0$ such that, for every $W\ge0$, $a(W)=0$ if and only if $W\le W_*$.
:::

::: proof
Increasing $W$ extends the integration interval to the left, so $a$ is nonnegative and nondecreasing. In the integrated explicit formula, the normalized complete tail is approximated by minus the real part of the rightmost-line series. The series is bounded by the sum of its coefficient magnitudes, and the normalized prime-power correction tends to zero. Thus $x^{1-\beta}Q_\vartheta(x)$ is eventually bounded in absolute value by some $C$, and the mass density is at most $Cx^{p-1}$. Increasing the width from $U$ to $W$ adds only the mass on $[Be^{-W},Be^{-U}]$. At the normalized scale the addition is at most $(C/p)(e^{-pU}-e^{-pW})$. Taking lower limits in the right endpoint gives continuity.

The recurring short windows with zero mass put a positive width in the zero set. A uniform lower bound at the exact power on wider windows makes that zero set bounded. Continuity puts its supremum in the zero set. The full proof is checked by the Lean kernel.
:::

Under the theorem’s hypothesis, windows with arbitrarily small normalized mass occur arbitrarily late at width $W_*$. At each greater width there is a strictly positive lower bound for every sufficiently late window. All nontrivial Riemann zeta zeros lie on the critical line, so the hypothesis defining $W_*$ here, a zero attaining a largest real part $\beta>1/2$, does not occur for this function.

::: {.theorem #thm-ch31-prime-phase-cluster title="All cluster values at a fixed width" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePhaseCluster.prime_tail_mass_cluster_iff_of_upper_bound"}
Let $\beta>1/2$ bound the real parts of all nontrivial zeta zeros, and put $p=\beta-1/2$. For each fixed real width $W\ge0$, write $M_W(B)=N(Be^{-W},B)/B^p$. Enumerate the nontrivial zero occurrences as $\rho_k$, with $\gamma_k=\operatorname{Im}\rho_k$. Set $a_k=1/[\rho_k(1-\rho_k)]$ when $\operatorname{Re}\rho_k=\beta$ and $a_k=0$ otherwise. Let $H$ be the closure of the orbit $\phi(t)=(e^{i\gamma_k t})_k$, $t\in\mathbb R$, in the product of unit circles. For $h\in H$ define

$$
F_h(u)=-\operatorname{Re}\sum_k a_k h_k e^{i\gamma_k u},
\qquad I_W(h)=\int_0^W e^{-ps}\max\{-F_h(-s),0\}\,ds.
$$

A real number $y$ is a cluster value of $M_W(B)$ as $B\to+\infty$ if and only if $y=I_W(h)$ for some $h\in H$.
:::

::: proof
Write $B=e^t$ and change variables by $x=e^{t-s}$. The normalized mass is a weighted integral over $0\le s\le W$ with the negative part applied to $e^{(1-\beta)(t-s)}Q_\vartheta(e^{t-s})$. The integrated explicit formula and prime-power correction show that this input differs from $F_{\phi(t)}(-s)$ by an error tending to zero. Since $t-s\ge t-W$, the error tends to zero uniformly on the entire window. Taking negative parts increases no distance, so the integrated error tends to zero as well.

The product of unit circles is compact. The integer-time phases return arbitrarily close to the identity at arbitrarily late times. Translating these returns makes every orbit point approachable at arbitrarily late times. Taking the closure gives the same property for every point of $H$. Absolute summability of the coefficients gives continuity of $I_W$, so its image of $H$ is closed. The uniform window estimate then identifies this image with the cluster set. The full proof is checked by the Lean kernel.
:::

The cluster set is a compact interval because the real phase orbit has connected closure and the window functional is continuous. If no zero has real part $\beta$, or if $W=0$, the interval is the singleton $\{0\}$. When a nontrivial zero attains the maximum $\beta>1/2$ and $W>0$, the lower endpoint is the lower limit in the critical-width theorem. A zero cluster value allows the normalized mass to approach zero along arbitrarily late windows.

**Zero-mass windows and intermediate zeros.** Let $\beta>1/2$ bound the real parts of all nontrivial zeros, put $p=\beta-1/2$, and let $C=2+\gamma_{\mathrm E}-\ln(4\pi)$, where $\gamma_{\mathrm E}$ is Euler's constant. For the zero occurrences $\rho_k$ above, define

$$
G_\beta(u)=
\sum_{1/2<\operatorname{Re}\rho_k<\beta}
\frac{\exp((\operatorname{Re}\rho_k-1/2)u)}{|\rho_k(1-\rho_k)|}.
$$

::: {.theorem #thm-ch31-prime-critical-residual title="A late window and the intermediate spectrum" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalResidual.prime_tail_mass_pos_or_intermediate_or_wider_zero_cluster"}
Use the intermediate sum $G_\beta$ defined above. Fix $0<d<2-C$. There is a real threshold $T$ that works for every upper bound $\beta$ as above. Every window with $W>0$ and $t-W\ge T$ satisfies at least one of the following.

- $N(e^{t-W},e^t)>0$.
- Some $u\in[t-W,t]$ satisfies $G_\beta(u)\ge d$.
- There is a width $W'>W$ at which zero is a cluster value of $N(Be^{-W'},B)/B^p$ as real $B\to+\infty$.
:::

[The square-root residual bound](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalResidual.eventually_prime_tail_root_scale).

At the square-root scale, the correction for prime powers subtracted from the complete tail tends to $2$. The critical-line coefficients are positive reals with total at most the first Li coefficient $C$. The terms from zeros strictly to the left of the critical line each decay as $u\to+\infty$. Summability of the coefficient norms gives decay of their sum. The intermediate budget $G_\beta(u)$ bounds the contributions from the remaining zeros below the upper-bound line. For all sufficiently large $u$, the contribution from the upper-bound line plus $G_\beta(u)-d$ is therefore an upper bound for $e^{u/2}Q_\vartheta(e^u)$. If the mass is zero and $G_\beta<d$ throughout the window, continuity gives $Q_\vartheta\ge0$ there, so the phase profile on the upper-bound line is strictly positive throughout. Continuity at the left endpoint extends the positive interval a little farther to the left. Its negative-part mass stays zero at the wider width, and the fixed-width cluster formula realizes this zero as a cluster value. Each intermediate summand is nondecreasing in $u$. If the right endpoint satisfies $G_\beta(t)\le d<2-C$, choose $d<d'<2-C$ and use the threshold for $d'$ to obtain a strict margin throughout the window.

Suppose a nontrivial zero attains the maximum $\beta>1/2$ and every nontrivial zero with real part below $\beta$ has real part at most $1/2$. Then $G_\beta=0$. The first Li coefficient satisfies $C<1/3$, so we can take $d=1$. At $W=W_*$, the strictly positive lower limit at every wider width rules out the third case, so every sufficiently late critical-width window has strictly positive mass. Every wider window with the same right endpoint and a left endpoint at least $2$ contains this critical window and also has strictly positive mass. The normalized mass at the critical width can still approach zero arbitrarily closely. If there are zeros with real parts strictly between $1/2$ and $\beta$, the recurrence of exact zero mass at the critical width remains open here.

::: {.theorem #thm-ch31-growing-prime-tail-clusters title="All cluster values at growing logarithmic widths" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthCluster.prime_tail_growing_width_cluster_iff_of_upper_bound"}
Let $β>1/2$ bound the real parts of all nontrivial zeros. Keep $p=\beta-1/2>0$ and the same orbit closure $H$. Let a real left endpoint $A(B)$ satisfy $2\le A(B)\le B$ for all sufficiently large $B$ and $\ln(B/A(B))\to+\infty$. The cluster set of $N(A(B),B)/B^p$ is
$$
\left\{I_\infty(h):h\in H\right\},\qquad
I_\infty(h)=\int_0^\infty e^{-ps}\max(-F_h(-s),0)\,ds .
$$
This includes $A(B)=2$ and allows $A(B)$ to vary without continuity or monotonicity.
:::

Fix $L\ge0$. Eventually the window contains $[Be^{-L},B]$. For sufficiently large $X\ge2$ the negative-part density is bounded by $Cx^{p-1}$ on $[X,\infty)$. Split the part to the left of $Be^{-L}$ at $\max(A(B),X)$. After normalization its contribution is at most $N(2,X)/B^p+(C/p)e^{-pL}$. The phase integral past $L$ is at most $(S/p)e^{-pL}$, where $S=\sum_k |1/(\rho_k(1-\rho_k))|$. Both estimates hold uniformly in the choice of phase or admissible left endpoint, respectively. Choosing $L$ first and then letting $B$ grow gives the same approximation by the actual phase at $\ln B$ as in the fixed-width case. The uniform convergence of the finite phase integrals gives continuity of $I_\infty$. Since the orbit closure is compact and connected, the cluster set is a compact interval. When there is no zero on the line with real part $\beta$, the phase integral vanishes identically and the normalized mass tends to zero.

::: {.theorem #thm-ch31-growing-prime-tail-error title="Uniform error at a common right endpoint" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthCluster.prime_tail_window_extent_bound_of_upper_bound"}
Suppose $\beta>1/2$ bounds the real parts of all nontrivial zeros. There exists $K\ge0$ such that for every $\varepsilon>0$ there is a threshold in $B$ beyond which all $a\in[2,B]$ satisfy
$$
\left|\frac{N(a,B)}{B^p}-I_\infty(\phi(\ln B))\right|
\le \varepsilon+K(a/B)^p .
$$
The signed difference $N(a,B)/B^p-I_\infty(\phi(\ln B))$ is at most $\varepsilon$.
:::

Compare first with the cumulative mass from $2$. Removing $[2,a]$ changes the mass by $N(2,a)$, which is at most $Ka^p$ by the same early-interval and late-power estimates. Thus the displayed power controls what is lost by moving the left endpoint, and $\varepsilon$ comes from the cumulative phase approximation. The estimate gives a rate in logarithmic width for the omitted mass. Nonnegativity of the removed mass gives the upper bound for the signed error.

**Joint contacts of two spectral lines at the critical width.** Suppose a nontrivial zero attains the largest real part $\beta>1/2$. Let $1/2<\gamma<\beta$ bound the real parts of all nontrivial zeros strictly to the left of $\beta$. Write $F_{\alpha,h}(u)$ for the profile obtained by cutting the coefficients in the phase series to the line with real part $\alpha$. Both profiles use the same $h\in H$. Subtracting the entire $\beta$-line sum before normalizing on the $\gamma$ scale gives
$$
e^{(1-\gamma)u}Q_\vartheta(e^u)=
e^{(\beta-\gamma)u}F_{\beta,\phi(u)}(0)
 +F_{\gamma,\phi(u)}(0)+o(1).
$$
The error tends to zero uniformly over every late window of a fixed width. [The normalized two-line approximation](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalTwoLines.prime_tail_two_line_approx). After subtraction, each term with real part below $\gamma$ tends to zero, and summability of the coefficient norms controls their sum. The square-root prime-power correction vanishes at the $\gamma$ scale.

A contact at the critical width $W_*$ is a pair $h\in H$ and $s\in[0,W_*]$ with $F_{\beta,h}(-s)=0$ and $F_{\beta,h}(-v)\ge0$ for all $v\in[0,W_*]$. If $F_{\gamma,h}(-s)<0$ at every such contact, then there is a $c>0$ such that for every sufficiently large $t$ some $u\in[t-W_*,t]$ satisfies $e^{(1-\gamma)u}Q_\vartheta(e^u)\le-c$. Continuity then gives strictly positive negative-part mass on the actual window.

The criterion can use a smaller set of contacts. Let $K$ be a compact subset of $H\times[0,W_*]$ consisting of minimizing pairs for the top profile. Suppose that each $h\in H$ has at least one minimizing lag represented in $K$. It is enough to check $F_{\gamma,h}(-s)<0$ at the pairs in $K$ with $F_{\beta,h}(-s)=0$. Taking $K$ to be the full set of minimizing pairs recovers the preceding criterion. [The joint contact criterion](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeCriticalTwoLines.prime_tail_negative_windows_of_two_line_contact).

The minimum of the top profile in the window is nonpositive for every phase. A positive minimum would allow an extension at the left endpoint, producing a zero cluster value at a wider width. At every pair in $K$, at least one profile is strictly negative, so the maximum of their pointwise minimum is strictly negative. When the top profile supplies this negative margin, its growing factor dominates the bounded second profile. When the second profile supplies the margin, the top profile remains nonpositive. This produces the required negative point in the window at the actual shared phase. If exact zero-mass critical windows occur arbitrarily late, there must be a joint contact with $F_\gamma\ge0$. The real-part bounds and the sign at joint contacts remain hypotheses.


::: {.theorem #thm-ch31-prime-window-spectral-error title="Uniform window error under a spectral gap" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthRate.prime_tail_window_error_of_lower_spectral_bound"}
Suppose $\beta>1/2$ bounds the real parts of all nontrivial zeros, and suppose $1/2\le\gamma<\beta$ bounds the real parts of those strictly to the left of $\beta$. Keep $p=\beta-1/2$ and write
$$
E(a,B)=\frac{N(a,B)}{B^p}-I_\infty(\phi(\ln B)).
$$
There is a $K>0$ such that every $2\le a\le B$ satisfies
$$
|E(a,B)|\le K\left[(a/B)^p+
\begin{cases}
\dfrac{B^{\gamma-1/2}-a^{\gamma-1/2}}{B^p},&\gamma>1/2,\\
B^{-p}\ln(B/a),&\gamma=1/2.
\end{cases}\right]
$$
:::

::: proof
After the $\beta$-line is subtracted, absolute summability of the zero coefficients bounds the error density by a constant times $x^{\gamma-3/2}$. Taking negative parts is $1$-Lipschitz, and the same power bound absorbs the square-root-scale correction for prime powers. Integrating the density over $[a,B]$ retains both endpoints. It gives a difference of powers for $\gamma>1/2$ and a logarithm at $\gamma=1/2$. Each spectral error term vanishes at $a=B$. The phase integral beyond $\ln(B/a)$ gives the $(a/B)^p$ term. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-prime-window-cumulative-log-error title="Logarithmic cumulative error at the critical gap" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeGrowingWidthRate.prime_tail_cumulative_error_log_order"}
Suppose a nontrivial zero attains the largest real part $\beta>1/2$ and every nontrivial zero strictly to its left has real part at most $1/2$. Then there are $c,C>0$ such that all sufficiently large $B$ satisfy
$$
c\ln B\le N(2,B)-B^p I_\infty(\phi(\ln B))\le C\ln B .
$$
:::

::: proof
At the square-root scale, the signed residual eventually lies below a strictly negative constant. Where the top-line profile is nonpositive, the actual negative part therefore exceeds the model by a fixed margin on that scale. At any fixed width $W>W_*$ the phase mass has a positive minimum over the compact phase closure. Boundedness of the profile forces a positive contribution to the error on every log interval of length $W$. Adding adjacent windows gives the lower bound. The finite initial interval and the infinite phase tail contribute only a bounded term. The logarithmic order holds under the stated spectral gap, and the exact logarithmic coefficient remains open. The full proof is checked by the Lean kernel.
:::

- **Classical pointwise von Mangoldt–Weil midpoint explicit formula (`Literature result, not formalized in this book`: von Mangoldt, 1895; Weil, 1952)**: Writing $\psi(x) := \sum_{n \le x}\Lambda(n) = \sum_{p^m \le x}\ln p = \ln\operatorname{lcm}(1, 2, \dots, \lfloor x\rfloor)$ for Chebyshev's prime-power staircase and $\psi_0(x) := \frac{1}{2}\bigl(\psi(x^+) + \psi(x^-)\bigr) = \psi(x) - \frac{1}{2}\Lambda(x)$ for its Gibbs midpoint normalization (subtracting the half-jump $\frac{1}{2}\ln p$ when $x \in \mathbb{N}_{\ge 2}$ is a prime power $p^m$, while $\psi_0(x) = \psi(x)$ at non-prime-power composites where $\Lambda(x) = 0$), symmetric truncation gives for every $x > 1$:

  $$
  \psi_0(x) \;=\; x \;-\; \lim_{T \to \infty}\sum_{\lvert\operatorname{Im}\rho\rvert < T} \frac{x^{\rho}}{\rho} \;-\; \ln(2\pi) \;-\; \frac{1}{2}\ln\bigl(1 - x^{-2}\bigr) \qquad (x > 1).
  $$

Truncating the spectral sum to the first $K$ conjugate pairs of verified critical-line zeros $\rho_{\pm k} = \frac{1}{2} \pm i\gamma_k$ ($1 \le k \le K$, all rigorously known to lie on $\operatorname{Re}(\rho) = \frac{1}{2}$) yields a real superposition of $K$ smooth logarithmic standing waves (`manual derivation`):

$$
\begin{aligned}
\psi_{0, K}(x)
&\;:=\; x \;-\; 2\sum_{k=1}^{K} \operatorname{Re}\!\left(\frac{x^{\frac{1}{2} + i\gamma_k}}{\frac{1}{2} + i\gamma_k}\right) \;-\; \ln(2\pi) \;-\; \frac{1}{2}\ln\bigl(1 - x^{-2}\bigr) \\
&\;=\; x \;-\; 2x^{1/2}\sum_{k=1}^{K} \frac{\frac{1}{2}\cos(\gamma_k\ln x) + \gamma_k\sin(\gamma_k\ln x)}{\frac{1}{4} + \gamma_k^2} \;-\; \ln(2\pi) \;-\; \frac{1}{2}\ln\bigl(1 - x^{-2}\bigr).
\end{aligned}
$$

Pause to marvel at this two-way reciprocity: isolated on its own, any single conjugate zero pair $\frac{1}{2} \pm i\gamma_k$ is merely a smooth, everywhere-differentiable half-density wave undulating gently across $\ln x$, devoid of any sharp arithmetic corner. Yet the moment $K = 5$, $K = 20$, $K = 50$, and eventually thousands of zero waves are superposed, crests cancel troughs across composite stretches ($x = 6, 10, 12, \dots$) to iron out flat horizontal treads, while locking constructively in phase at primes and prime powers ($x = 2, 3, 4 = 2^2, 5, 7, 8 = 2^3, 9 = 3^2, 11, 13, \dots$) to chisel razor-sharp vertical risers!

::: {.example #ex-ch34-weil-prime-staircase-reconstruction title="Zero Standing Waves Sculpting the Prime Staircase: Exact Chebyshev $\psi(x)$, Midpoint $\psi_0(x)$, and $K = 5, 20, 50$ Zero-Pair Reconstructions"}
At 100-digit working precision across integer scales $x \in \{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13\}$, we evaluate the exact staircase $\psi(x) = \ln\operatorname{lcm}(1, \dots, x)$, the explicit-formula midpoint target $\psi_0(x) = \psi(x) - \frac{1}{2}\Lambda(x)$, and the $K$-pair critical-zero reconstructions $\psi_{0, K}(x)$ for $K = 5, 20, 50$, rounded to six decimal places (`manual derivation` / `NUM`):

| Scale $x$ | Symbolic $\psi(x)$ | Full Step $\psi(x)$ | Midpoint $\psi_0(x)$ | $K = 5$ Sum $\psi_{0,5}(x)$ | $K = 20$ Sum $\psi_{0,20}(x)$ | $K = 50$ Sum $\psi_{0,50}(x)$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$2$** | $\ln 2$ | $0.693147$ | $0.346574$ | $0.370087$ | $0.331858$ | $0.359332$ |
| **$3$** | $\ln 6$ | $1.791759$ | $1.242453$ | $1.240233$ | $1.207704$ | $1.236060$ |
| **$4$** | $\ln 12$ | $2.484907$ | $2.138333$ | $2.172732$ | $2.162383$ | $2.162495$ |
| **$5$** | $\ln 60$ | $4.094345$ | $3.289626$ | $3.264668$ | $3.326996$ | $3.289860$ |
| **$6$** | $\ln 60$ | $4.094345$ | $4.094345$ | $4.006066$ | $4.113273$ | $4.062410$ |
| **$7$** | $\ln 420$ | $6.040255$ | $5.067300$ | $4.923719$ | $5.044654$ | $5.071181$ |
| **$8$** | $\ln 840$ | $6.733402$ | $6.386828$ | $6.396516$ | $6.435392$ | $6.345021$ |
| **$9$** | $\ln 2520$ | $7.832014$ | $7.282708$ | $7.493937$ | $7.209355$ | $7.256965$ |
| **$10$** | $\ln 2520$ | $7.832014$ | $7.832014$ | $7.571751$ | $7.904979$ | $7.880802$ |
| **$11$** | $\ln 27720$ | $10.229909$ | $9.030962$ | $9.147872$ | $9.111861$ | $9.065247$ |
| **$13$** | $\ln 360360$ | $12.794859$ | $11.512384$ | $11.381487$ | $11.466362$ | $11.500926$ |

Three Fourier-geometric signatures stand out immediately across these eleven benchmarks:

1. **Gibbs midpoint phase locking at primes and prime powers**: At primes ($x = 2, 3, 5, 7, 11, 13$) and higher prime powers ($x = 4 = 2^2,\; 8 = 2^3,\; 9 = 3^2$), the spectral sum targets not the upper step $\psi(x)$ but the exact Dirichlet–Fourier jump midpoint $\psi_0(x) = \psi(x) - \frac{1}{2}\ln p$—already at $K = 50$ pairs, $\psi_{0,50}(5) \approx 3.289860$ matches $\psi_0(5) = \ln 60 - \frac{1}{2}\ln 5 \approx 3.289626$ to within $2.35\times 10^{-4}$, while $x = 7$ and $x = 13$ converge to within $3.88\times 10^{-3}$ and $1.15\times 10^{-2}$!
2. **Destructive flattening across multi-prime composites**: At $x = 6 = 2\times 3$ and $x = 10 = 2\times 5$, the von Mangoldt weight vanishes ($\Lambda(6) = \Lambda(10) = 0$) because composite paths spanning distinct prime axes add no single-axis jump, so $\psi(x) = \psi_0(x)$ and the zero harmonics cancel out of phase to hold the plateaus $\ln 60 \approx 4.094345$ and $\ln 2520 \approx 7.832014$.
3. **Two-way arithmetic–spectral genesis**: Composite paths over prime minimal arc-trihedra integrate out the Riemann zero spectrum, and the zero standing waves interfere back to sculpt every prime and prime power along the continuum!
:::

The fourth experiment card below brings [@ex-ch34-weil-prime-staircase-reconstruction] to life, letting you sweep the conjugate zero-pair count $K$ and watch smooth logarithmic waves lock into sharp prime risers:

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="weil-explicit-prime-staircase" height="520"}
**Weil's Explicit Duality: Zero-Wave Sheet Sculpting Chebyshev's Prime Staircase (`weil-explicit-prime-staircase`).** Sweeping the spectral cutoff $t$ or zero-pair cap $K \in [5, 50]$ (parked at $t = 145 > \gamma_{50}$ with all $50$ zero pairs stacked, and replayable from $t = 0$; amber highlights the frontmost active profile $K(t)$ and draggable reading handle $x^*$): starting from the back-edge main ramp, each critical-line pair adds a standing-wave row $-2\operatorname{Re}(x^{\rho_k}/\rho_k)$ across the violet 3D partial-sum sheet until the front amber profile flattens across composites $x = 6, 10, 12$ and rises steeply against the exact cyan midpoint staircase $\psi_0(x)$ at $x = 2, 3, 4, 5, 7, 8, 9, 11, 13$, while on the front floor the magenta zero-wave residual approaches the cyan sawtooth and the strip plot compares cyan $\Lambda(n)$ bars against violet rebuilt rises (green `LEAN ✓` badge marks `actual_integrated_explicit_formula`).
:::
