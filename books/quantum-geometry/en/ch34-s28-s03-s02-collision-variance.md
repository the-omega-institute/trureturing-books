# M.2.5 A variance lower bound for near-collisions {#a-variance-lower-bound-for-near-collisions}

Take a finite family of frequencies $(g_j)$ with nonnegative weights $(w_j)$ of positive total weight $W=\sum_jw_j$. The mean and variance under the normalized weights are

$$
\mu=W^{-1}\sum_j w_jg_j,
\qquad
V=W^{-1}\sum_jw_j(g_j-\mu)^2.
$$

For each nonnegative integer vector $m$ of total degree $p$, put $G_m=\sum_jm_jg_j$ and $c_m=\binom{p}{m}\prod_jw_j^{m_j}$. An ordered pair within distance $\eta$ contributes $c_mc_n$. Write $E_p(\eta)$ for the sum of these contributions.

::: {.theorem #thm-ch31-variance-collision-lower title="A weighted near-collision lower bound from variance" lean="D5/S3/Fourier/Concentration/FiniteCollisionVariance.tailCollisionMass_lower_variance"}
For every positive integer $p$ and real $\eta>0$,

$$
\frac{9}{16}W^{2p}\le
\left(1+\frac{4\sqrt{pV}}{\eta}\right) E_p(\eta).
$$
:::

::: proof
Subtracting $\mu$ from each frequency shifts every $G_m$ by $-p\mu$, preserving pair distances. The $p$-th power of the real exponential sum $A(t)=\sum_jw_j e^{(g_j-\mu)t}$ expands with the same coefficients $c_m$. At zero, $A(0)=W$, $A'(0)=0$, and $A''(0)=WV$. Evaluating the expansion and its second derivative at zero gives $\sum_m c_m=W^p$ and $\sum_m c_m(G_m-p\mu)^2=pVW^p$.

This second moment puts at least three quarters of the coefficient weight in the closed interval of radius $2\sqrt{pV}$ about $p\mu$. If $V=0$, all positive weight is at the center. Bins of width $\eta$ partition the interval into at most $\lfloor 4\sqrt{pV}/\eta\rfloor+1$ bins. Cauchy–Schwarz bounds the sum of their squared weights from below. Every ordered pair from the same bin contributes to $E_p(\eta)$, which gives the stated bound. The full proof is checked by the Lean kernel.
:::

If the moment test for a bounded range of starts requires $KNE_p(2/L)<\delta^{2p}$, with $K=3+\pi^2/3$, $N$ time samples and $\delta>0$, then

$$
\frac{9}{16}KN(W/\delta)^{2p}<1+2L\sqrt{pV}.
$$

See [weighted near-collisions and the range of starts](ch34-s28-s03-s02-weighted-near-collisions.md#thm-ch31-bounded-tail-window-start).

For example, fix $0<\beta<1$ and use the ζ tail frequencies $g_\gamma=\gamma/r$ with fixed $r>0$ and $\gamma\le T$. With $W\asymp(\log T)^2$, $\delta=\log T$, and $p\asymp T^\beta\log T$, the bound $\sqrt V\le T/r$ implies that a successful moment test requires

$$
\log L\ge \log N+2p\log\log T-O(p+\log T).
$$

This inequality constrains the averaging length of the moment test. In its resolution regime, [@thm-ch34-zeta-harmonic-collision-limit] gives a matching upper bound for harmonic-weighted collisions of actual zeta ordinates. The existence of missing windows in shorter sampling ranges remains open.

## Common shifted bins and a parabolic test function

Restricting attention to one central interval discards the weight outside it. A common shift can instead control the second moment of all bin indices, after which a clipped quadratic test weights the entire family of bins.

For arbitrary finite real data $z_i,c_i$, there exists $0\le u<1$ such that

$$
\sum_i c_i\lfloor z_i+u\rfloor^2
\le \sum_i c_i\bigl(z_i^2+\{z_i\}(1-\{z_i\})\bigr).
$$

Here $\{z\}$ denotes the fractional part, and the weights $c_i$ may be signed. The proof computes the integral of the left-hand side over the unit interval in $u$. [Lean proof of common shifted rounding](lean:D5/S3/Fourier/Concentration/ShiftedBinVariance.exists_shifted_squared_moment) With $z=(G_m-p\mu)/\eta$ and nonnegative weights $c_m$, the bin second moment is at most $MW^p$, for $M=pV/\eta^2+1/4$. All same-bin ordered pairs belong to the closed distance band $|G_m-G_n|\le\eta$.

More generally, let a finite family $(x_i,c_i)$ have nonnegative weights of total mass $A=\sum_i c_i$ and second moment $\sum_i c_i(x_i-a)^2\le BA$ about an arbitrary center $a$. Write $M=B/\eta^2+1/4$ and $E(\eta)=\sum_{|x_i-x_j|\le\eta}c_ic_j$ for $\eta>0$. For every positive integer $r$ with $M\le r^2$,

$$
A^2(1-M/r^2)^2\le
\left(\frac{16r}{15}-\frac{1}{15r^3}\right)E(\eta).
$$

Set $q(k)=\max(0,1-k^2/r^2)$. If $b_k$ is the mass in the selected bin, then $\sum_k b_kq(k)\ge A(1-M/r^2)$. The exact integer square and fourth-power sums give $\sum_k q(k)^2=16r/15-1/(15r^3)$. Apply Cauchy–Schwarz and then $\sum_k b_k^2\le E(\eta)$ to obtain the lower bound. [Lean proof of the parabolic lower bound](lean:D5/S3/Fourier/Concentration/ShiftedBinVariance.collision_parabolic_lower)

For degree-$p$ frequency sums set $A=W^p$ and $B=pV$, strengthening the necessary condition for the moment test above. For $B>0$, as $\eta/\sqrt B\to0$, choosing $r=\lceil\sqrt{5M}\rceil$ makes the normalized coefficient of the lower bound tend to $3/(5\sqrt5)$. Thus $\liminf E(\eta)\sqrt B/(A^2\eta)\ge3/(5\sqrt5)$ when $A>0$. Optimality of this asymptotic consequence and an upper bound for actual zeta ordinates require further proofs.

## Separated parabolic weights and asymptotic sharpness

Take a positive integer $n$, integer sites $k=-n,\ldots,n$, and weights $c_k=n^2-k^2$. Symmetry gives mean zero. The total mass and variance are

$$
A=\frac{n(4n^2-1)}{3},\qquad B=\frac{n^2-1}{5}.
$$

The exact collision formula has a complete resolution classification.

$$
E(\eta)=\frac{A(4n^2+1)}5
\quad\Longleftrightarrow\quad
\eta\ge0\ \land\ (n=1\ \lor\ \eta<1).
$$

For $0\le\eta<1$, different integer sites are farther apart than $\eta$, so only the diagonal contributes. The identity $c_k^2=n^2c_k-k^2c_k$ gives the formula. At $n=1$, the center carries the entire positive weight. For $n\ge2$ and $\eta\ge1$, the ordered pair $(0,1)$ already contributes strictly positive additional mass. A negative radius excludes every pair. [Lean proof of the exact collision formula](lean:D5/S3/Fourier/Concentration/SeparatedParabolicCollision.separated_parabolic_collision)

For every resolution sequence eventually satisfying $0<\eta_n<1$ with $\eta_n\to L>0$, set $t=1/n$. Then

$$
\frac{\eta_n}{\sqrt B}=\frac{\sqrt5\,t\eta_n}{\sqrt{1-t^2}}
\longrightarrow0,
$$

$$
\frac{E(\eta_n)\sqrt B}{A^2\eta_n}
=\frac{3}{5\sqrt5}\frac{4+t^2}{4-t^2}
\frac{\sqrt{1-t^2}}{\eta_n}
\longrightarrow\frac{3}{5\sqrt5\,L}.
$$

Choose $\eta_n=n/(n+1)$, so each resolution is strictly smaller than the site spacing and $L=1$. Thus the coefficient $3/(5\sqrt5)$ in the preceding section is asymptotically sharp for arbitrary finite nonnegative weighted data. The same parabolic profile appears in continuous second-moment extremization of Rényi entropy, as in [Sekeh, equation (2.1) and Theorem 3.1](https://arxiv.org/abs/1509.02190v4). Here the separated finite sites ensure only diagonal collisions occur inside the closed band. Requiring the data to arise as high-degree sums from a fixed frequency family or from actual zeta ordinates requires additional arithmetic constraints. [Lean proof of the limit](lean:D5/S3/Fourier/Concentration/SeparatedParabolicCollision.parabolic_collision_ratio_limit)

## A finite Fourier variance bound for lattice convolutions

For the original frequencies $g_j$ and nonnegative weights $w_j$, put $S(t)=\sum_j w_je^{ig_jt}$, $W=\sum_jw_j$ and $D=\sum_jw_j(g_j-a)^2\le VW$, where $a$ is an arbitrary real center. Centering rotates the complex sum. The bound $\cos x\ge1-x^2/2$ yields

$$
|S(t)|\ge W\max(0,1-Vt^2/2),\qquad
|S(t)|\ge\max(0,W-Dt^2/2).
$$

When $D>0$ and $t\ne0$, the inequality $|S(t)|>W-Dt^2/2$ is strict because at least one positive-weight term has a nonzero centered argument. [Lean proof of the characteristic-function bound](lean:D5/S3/Fourier/Concentration/LatticeConvolutionVariance.score_variance_lower)

Suppose the frequencies lie on an affine lattice $g_j=b+h a_j$, with $h>0$ and integer $a_j$. For arbitrary real weights, natural degree $p$, positive integer $k$, real $s$, and $0\le\eta<h$, put $A=k\pi/h$. There is an exact identity

$$
E_p(\eta)=\frac{1}{2A}\int_{s-A}^{s+A}|S(t)|^{2p}\,dt.
$$

In the finite polynomial pair expansion of $|S|^{2p}$, every difference of two degree-$p$ sums equals $hd$ for an integer $d$. The corresponding cosine has mean $\cos(hds)\operatorname{sinc}(k\pi d)$. Thus all ordered pairs of equal frequency sums survive. [Lean proof of the period identity](lean:D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lattice_period_collision)

For nonnegative weights and $\eta\ge0$, integrating the pointwise lower bound over a single period gives

$$
E_p(\eta)\ge \frac{hW^{2p}}{2\pi}
\int_{-\pi/h}^{\pi/h}\max(0,1-Vt^2/2)^{2p}\,dt.
$$

The inequality is strict when $D>0$ and $p>0$. This uses the common Fourier power expansion of degree sums. For fixed $V,h>0$ and growing degree, the rescaled variable in the integral is $t\sqrt{pV}$. Formalizing the asymptotic coefficient of its Gaussian limit remains a separate step. General real spectra at finite resolution require a further positive-kernel estimate. [Lean proof of the finite integral bound](lean:D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lattice_collision_variance_lower)

## Gaussian limit of the clipped variance integral

Allow the variance budget $V_p$ and window half-width $A_p$ to vary with degree $p$. Assume $V_p>0$ eventually and put

$$
s_p=\sqrt{pV_p},\quad R_p=A_ps_p,\quad
I_p=s_p\int_{-A_p}^{A_p}\max(0,1-V_pt^2/2)^{2p}\,dt.
$$

For arbitrary real sequences $A_p$, including negative oriented half-widths,

$$
I_p-\int_{-R_p}^{R_p}e^{-u^2}\,du\longrightarrow0,
\qquad
I_p\longrightarrow\sqrt\pi\ \Longleftrightarrow\ R_p\longrightarrow+\infty.
$$

Substitute $u=s_pt$ to obtain the integrand $q_p(u)=\max(0,1-u^2/(2p))^{2p}$. For $p>0$, $0\le q_p(u)\le e^{-u^2}$, and at each fixed $u$ the profile converges to $e^{-u^2}$. Dominated convergence gives $\int_{\mathbb R}|q_p(u)-e^{-u^2}|\,du\to0$, bounding the absolute error uniformly over all windows. The Gaussian window integral increases monotonically with the oriented radius and is strictly below $\sqrt\pi$ at every finite radius. Hence the full Gaussian limit also forces the rescaled radius to tend to positive infinity. [Window approximation](lean:D5/S3/Fourier/Asymptotics/ClippedGaussianMinorant.clipped_gaussian_window_error) [Characterization of the full Gaussian limit](lean:D5/S3/Fourier/Asymptotics/ClippedGaussianMinorant.clipped_gaussian_full_limit_iff)

Return to the convolution with fixed variance budget $V>0$ and lattice spacing $h>0$. Taking $A_p=\pi/h$ gives $R_p\to+\infty$. After multiplying the finite lower bound by $\sqrt{pV}$, its integral coefficient tends to $h/(2\sqrt\pi)$. Thus, for every $\varepsilon>0$, all sufficiently large $p$ and fixed $\eta\ge0$ satisfy

$$
\left(\frac{h}{2\sqrt\pi}-\varepsilon\right)W^{2p}
\le \sqrt{pV}\,E_p(\eta).
$$

This asymptotic lower bound retains the hypotheses of the finite Fourier integral. Other phase peaks can contribute to the actual collision mass, for instance when the given lattice spacing is smaller than the maximal spacing. Upper bounds for general real spectra and actual zeta ordinates still need control of these contributions and of the noncentral remainder. The approach follows the [retained contribution and controlled remainder method](https://github.com/the-omega-institute/riemann-hypothesis/blob/c7d25b3bfd7906388bb8eb0774e027a2b756a7b6/src/Formalism/GL3MeanSquares/GenusMeanAsymptotics/JacobiCharacterSums/TailFinal.lean#L32-L55), with the whole-line absolute error as the remainder here.

## Positive Fejér kernel bounds for real frequencies

Fix a positive resolution $\eta>0$ and use the angular Fejér kernel and its triangular Fourier transform

$$
K_\eta(t)=\frac{\eta}{2\pi}\operatorname{sinc}^2\!\left(\frac{\eta t}{2}\right),
\qquad \phi_\eta(d)=\max(0,1-|d|/\eta).
$$

The kernel $K_\eta$ is nonnegative, integrable and has whole-line integral $1$, with $\int_{\mathbb R}K_\eta(t)e^{-idt}\,dt=\phi_\eta(d)$. Expand $|S(t)|^{2p}$ into its finite degree-sum pairs and integrate each cosine to obtain the exact identity

$$
\int_{\mathbb R} K_\eta(t)|S(t)|^{2p}\,dt
=\sum_{m,n}c_mc_n\phi_\eta(G_m-G_n).
$$

The identity holds for arbitrary real weights. If $w_j\ge0$, then all $c_mc_n\ge0$ and $\phi_\eta(d)\le\mathbf 1_{|d|\le\eta}$, so the right side is bounded by $E_p(\eta)$. The triangular weight is zero on the closed band boundary $|d|=\eta$. [Positive-kernel collision comparison](lean:D5/S3/Fourier/Concentration/FejerCollisionVariance.fejer_collision_comparison)

Assume also $\sum_jw_j(g_j-a)^2\le VW$, where $a,V$ are real. By the pointwise variance bound and positivity of the kernel, for every $A\ge0$,

$$
W^{2p}\int_{-A}^{A}K_\eta(t)\max(0,1-Vt^2/2)^{2p}\,dt
\le E_p(\eta).
$$

This estimate applies to arbitrary finite real frequency families. [Finite-window bound](lean:D5/S3/Fourier/Concentration/FejerCollisionVariance.fejer_collision_variance_lower)

Fix $V,\eta>0$ and let $p\to\infty$. Given $\varepsilon>0$, put $c=\eta/(2\pi)-\varepsilon/(2\sqrt\pi)$. Since $K_\eta(0)=\eta/(2\pi)$ and the kernel is continuous, choose a fixed $A>0$ with $K_\eta(t)\ge c$ for $|t|\le A$. The preceding Gaussian limit gives

$$
c\sqrt{pV}\int_{-A}^{A}\max(0,1-Vt^2/2)^{2p}\,dt
\longrightarrow \frac{\eta}{2\sqrt\pi}-\frac{\varepsilon}{2}.
$$

Consequently, for every $\varepsilon>0$ and all sufficiently large degrees $p$,

$$
\left(\frac{\eta}{2\sqrt{\pi}}-\varepsilon\right) W^{2p}
\le\sqrt{pV}\,E_p(\eta).
$$

When $W>0$, this means $\liminf_{p\to\infty}E_p(\eta)\sqrt{pV}/(W^{2p}\eta)\ge1/(2\sqrt\pi)$. The coefficient exceeds the parabolic lower coefficient $3/(5\sqrt5)$ for arbitrary finite weighted data because the degree sums have convolution structure. A fixed finite tail of actual zeta ordinates is admissible as the input frequency family. The scale condition in the next section yields a uniform lower bound when height, frequency family and resolution vary together. Upper bounds for high-order collisions require further estimates. [Asymptotic lower bound](lean:D5/S3/Fourier/Concentration/FejerCollisionVariance.fejer_collision_asymptotic_lower)

## Uniform small-resolution bound for varying spectra

Now allow the frequency family, weights and center to vary with degree $n$. Assume that the variance budget $V_n$ and resolution $\eta_n$ are eventually positive. Put

$$
s_n=\sqrt{nV_n},\qquad \rho_n=\frac{\eta_n}{s_n}.
$$

The condition $\rho_n\to0$ is equivalent to the existence of eventually positive half-widths $A_n$ with $A_ns_n\to+\infty$ and $\eta_nA_n\to0$. Indeed, choose $A_n=1/(s_n\sqrt{\rho_n})$ to obtain $1/\sqrt{\rho_n}$ and $\sqrt{\rho_n}$ for the two expressions. Conversely, $\rho_n=(\eta_nA_n)/(s_nA_n)$. [Compatibility of the two window scales](lean:D5/S3/Fourier/Asymptotics/MovingFejerCollision.exists_fejer_window_iff)

Under $\rho_n\to0$, for every $\varepsilon>0$ there is a degree threshold depending only on the sequences $V_n,\eta_n$ and on $\varepsilon$. For each $n$ beyond it, every finite family of real frequencies $g_j$, nonnegative weights $w_j$, and center $a$ with $\sum_jw_j(g_j-a)^2\le V_nW$ satisfies

$$
\left(\frac{1}{2\sqrt\pi}-\varepsilon\right)\eta_n W^{2n}
\le\sqrt{nV_n}\,E_n(\eta_n).
$$

On a compatible window, the normalized kernel is $\eta_n^{-1}K_{\eta_n}(t)=\operatorname{sinc}^2(\eta_nt/2)/(2\pi)$. Because $\eta_nA_n\to0$, it is eventually at least $1/(2\pi)-\varepsilon/(2\sqrt\pi)$ throughout the window. Because $A_ns_n\to\infty$, the rescaled unweighted integral tends to $\sqrt\pi$. The finite-window inequality then gives a threshold uniform over the data. [Uniform collision lower bound](lean:D5/S3/Fourier/Asymptotics/MovingFejerCollision.moving_fejer_uniform_lower)

For example, for a varying finite zeta tail take frequencies $g_\gamma=\gamma/r$ with fixed $r>0$ and $0<\gamma\le T_n$. Use center zero and budget $V_n=T_n^2/r^2$. If $\eta_n r/(T_n\sqrt n)\to0$, then eventually

$$
E_n(\eta_n)\ge
\left(\frac{1}{2\sqrt\pi}-\varepsilon\right)
\frac{r\eta_n}{T_n\sqrt n}\,W_n^{2n}.
$$

The underlying family may grow with $n$. Without control of the relative resolution and variance scales, the normalized collision ratio can tend to zero, as with a single unit-weight frequency, $V_n=1/n^2$ and fixed $\eta_n>0$. For the harmonic-weighted zeta spectrum, [@thm-ch34-zeta-harmonic-collision-limit] also gives the matching upper bound under its growth and resolution conditions.

## Exact recovery of the closed collision band from triangular moments

For general finite data $(x_i,c_i)$, write $d_{ij}=|x_i-x_j|$, and define the ramp-weighted moment at real radius $r$ by

$$
L(r)=\sum_{i,j}c_ic_j\max(0,r-d_{ij}).
$$

For $c_ic_j\ge0$ for every pair and $\delta>0$, every real radius $r$ satisfies

$$
L(r)-L(r-\delta)\le\delta E(r)
\le L(r+\delta)-L(r).
$$

For each pair with $d_{ij}\le r$, the right increment of the positive part equals $\delta$ and the left increment is at most $\delta$. For $d_{ij}>r$, the left increment vanishes and the right increment is nonnegative. Sum these inequalities with the nonnegative pair weights. [Finite secant bounds](lean:D5/S3/Fourier/Concentration/FejerCollisionSecants.collision_ramp_secants)

For arbitrary real weights and any $\delta>0$ such that no pair distance lies strictly between $r$ and $r+\delta$, the right increment is exact. A positive interval with this property always exists. Let $\delta_0$ be the minimum of the finite set $\{1\}\cup\{d_{ij}-r:d_{ij}>r\}$, so $\delta_0>0$. For every $0<\delta\le\delta_0$,

$$
L(r+\delta)-L(r)=\delta E(r).
$$

No outer distance lies strictly between $r$ and $r+\delta$, and each pair has increment either $\delta$ or zero. This identity allows arbitrary signed weights and retains all closed-band contributions at distance exactly $r$. [Exact right increment](lean:D5/S3/Fourier/Concentration/FejerCollisionSecants.collision_ramp_exact_right)

For the degree-$p$ frequency sums and multinomial weights, the triangular Fourier identity gives, at positive radius $r$,

$$
L(r)=r\int_{\mathbb R}K_r(t)|S(t)|^{2p}\,dt.
$$

When $0<\delta<r$, the secant bounds can be expressed directly in terms of the weighted integrals at three positive radii. The exact right increment recovers the closed-band mass from a sufficiently small positive difference, including any mass on the boundary. Upper and lower bounds for high-degree collisions of actual zeta tails still require control of the principal contribution and remainder of these weighted integrals at neighboring radii.

## Differentiable limits and the hard-band asymptotic coefficient

Allow the finite data to depend on $n$, writing $L_n$ for the collision ramp and $E_n$ for the closed-band mass. Let $B_n$ be a normalizing factor and $\eta_n$ an arbitrary real scale. Assume eventually $B_n\ge0$ and all pair-weight products within each finite family are nonnegative. Suppose for every fixed $t$ in an open neighborhood of a real number $a$,

$$
F_n(t)=B_n L_n(t\eta_n)\longrightarrow f(t),
$$

and $f$ is differentiable at $a$. Then

$$
B_n\eta_n E_n(a\eta_n)\longrightarrow f'(a).
$$

The proof uses the two secant quotients for fixed $\delta>0$. For positive scales, apply the finite secant bounds of the preceding section. For negative scales, exchange the left and right increments and negate them. At zero scale both increments and the scaled closed-band mass vanish. Thus for sufficiently small fixed $\delta$, eventually

$$
\frac{F_n(a)-F_n(a-\delta)}{\delta}
\le B_n\eta_n E_n(a\eta_n)
\le\frac{F_n(a+\delta)-F_n(a)}{\delta}.
$$

Differentiability first allows a fixed $\delta$ to be chosen so that both limiting secants are close to $f'(a)$. Pointwise convergence at the neighboring radii then transfers the bounds to the finite families. This avoids requiring a uniform positive lower bound on their smallest outer gap. [Hard-band limit theorem](lean:D5/S3/Fourier/Concentration/FejerCollisionLimit.collision_ramp_tendsto_hard)

For degree-dependent finite frequency families with nonnegative original weights, write $W_n$ for total weight, $V_n$ for the variance budget, $\eta_n$ for resolution, and $s_n=\sqrt{nV_n}$. Assume $W_n,\eta_n,V_n$ are eventually positive. If the principal contribution and remainder of the weighted integral give, for every fixed $t>0$,

$$
\frac{s_n}{\eta_n^2 W_n^{2n}}\,t\eta_n
\int_{\mathbb R} K_{t\eta_n}(u)|S_n(u)|^{2n}\,du
\longrightarrow \frac{t^2}{2\sqrt\pi},
$$

then set $a=1$. The derivative of the quadratic limiting profile gives

$$
\frac{s_n E_n(\eta_n)}{\eta_n W_n^{2n}}\longrightarrow\frac1{\sqrt\pi}.
$$

The required hard-band asymptotic thus follows from asymptotics for the Fejér-weighted moments at neighboring multiplicative radii. For the actual harmonic-weighted zeta spectrum, [@thm-ch34-zeta-harmonic-collision-limit] follows this reduction and gives the corresponding resolution conditions.

## Pair fourth moments control the central Gaussian profile

For a finite real frequency family $g_j$ and real weights $w_j$, write $W=\sum_jw_j$, $Q(t)=|S(t)|^2$, and define

$$
M_k=\sum_{i,j}w_iw_j(g_i-g_j)^k.
$$

If every pair product $w_iw_j\ge0$, then for every real $t$,

$$
0\le Q(t)-\left(W^2-\frac{M_2t^2}{2}\right)
\le\frac{M_4t^4}{24}.
$$

Expand the degree-one Fourier pair sum and apply the global cosine estimate $0\le\cos x-1+x^2/2\le x^4/24$ to each frequency difference. This retains the exact quadratic term and bounds the quartic remainder. [Global fourth-moment bound](lean:D5/S3/Fourier/Asymptotics/FinitePairGaussianLimit.score_quartic)

Now let the frequencies and weights vary with degree $n$, with eventually normalized masses $W_n=1$ and eventually nonnegative pair products. Assume eventually $M_{2,n}>0$ and

$$
R_n=\frac{M_{4,n}}{nM_{2,n}^2}\longrightarrow 0,
\qquad s_n=\sqrt{nM_{2,n}/2}.
$$

For fixed $u$ the finite fourth-moment bound gives

$$
0\le n\bigl(Q_n(u/s_n)-1\bigr)+u^2\le\frac{u^4R_n}{6}.
$$

The exponential power limit therefore gives

$$
Q_n(u/s_n)^n\longrightarrow e^{-u^2}.
$$

If $a_n$ is the mean under the normalized weights, then $M_{2,n}=2\sum_jw_{n,j}(g_{n,j}-a_n)^2$, so this scale uses the actual variance. Original nonnegative weights with positive total mass can be divided by their total to obtain the normalized score. [Central Gaussian limit](lean:D5/S3/Fourier/Asymptotics/FinitePairGaussianLimit.score_gaussian_limit)

There is also an integrable bound on a window that can grow with degree. For $n>0$, $W=1$, nonnegative pair products, $M_2>0$, and $u^2M_4\le3nM_2^2$, the scaled quartic error is at most $u^2/2$. Hence

$$
Q(u/s)^n\le e^{-u^2/2},\qquad s=\sqrt{nM_2/2}.
$$

This envelope permits dominated convergence on central windows satisfying the fourth-moment condition. For actual zeta ordinates, applying this estimate requires a bound on the pair-moment ratio and control of the weighted Fourier peaks outside the central window. [Central Gaussian envelope](lean:D5/S3/Fourier/Asymptotics/FinitePairGaussianLimit.score_gaussian_envelope)

### Pair-moment condition for actual zeta ordinates

Under the existing RH interface, take all zeta zeros with $0<\gamma\le T$, using analytic multiplicities $m_\gamma$ and weights $a_\gamma=m_\gamma\gamma/(1/4+\gamma^2)$. Put $W(T)=\sum_\gamma a_\gamma$, $w_\gamma=a_\gamma/W(T)$, and $P_k(T)=\sum_{\gamma,\gamma'}w_\gamma w_{\gamma'}(\gamma-\gamma')^k$. Set $c=1/(2\pi)$. The Riemann–von Mangoldt counting asymptotic gives $N(T)-N(3T/4)\ge cT\log T/8$ for all sufficiently large $T$. In the upper band $3T/4<\gamma\le T$, the weight satisfies $a_\gamma\ge m_\gamma/(2T)$, so the band's total weight is at least $c\log T/16$. The harmonic mass asymptotic gives $W(T)\le c(\log T)^2$ and $W(T/2)\ge c(\log T)^2/16$.

The normalized masses of the lower and upper bands are at least $1/16$ and $1/(16\log T)$ respectively, and frequency differences between the two bands have modulus at least $T/4$. Retaining the ordered pairs from the lower band to the upper band gives

$$
P_2(T)\ge\frac{T^2}{4096\log T}>0,\qquad P_4(T)\le T^2P_2(T).
$$

The second inequality uses the fact that every positive ordinate is at most $T$. Thus for all sufficiently large $T$, the normalized weights are nonnegative and sum to one, with

$$
\frac{P_4(T)}{P_2(T)^2}\le4096\log T.
$$

[Harmonic-weighted moment ratio bound](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_pair_ratio) If $T_n\to\infty$ and $\log T_n/n\to0$, the actual normalized zero spectrum satisfies the fourth-moment-ratio hypothesis of the central Gaussian profile. A fixed frequency rescaling $g_\gamma=\gamma/r$ with $r>0$ leaves this ratio invariant. The central Fejér principal contribution also requires compatibility between the resolution and actual variance scale. The phase estimates below control the intermediate noncentral peaks.

## Principal Fejér integral on a moving central window

Assume eventual normalization, positivity of the second pair moment and nonnegative pair products. Suppose $\rho_n\to0$ and choose $A_n\to+\infty$ satisfying eventually

$$
A_n^2M_{4,n}\le6nM_{2,n}^2.
$$

The window condition gives $0\le R_n\le6/A_n^2$, which implies $R_n\to0$. The central Fejér integral has the precise limit

$$
\frac1{2\pi}\int_{-A_n}^{A_n}
\operatorname{sinc}^2(\rho_n u/2)Q_n(u/s_n)^n\,du
\longrightarrow\frac1{2\sqrt\pi}.
$$

Extend the integrand by zero outside the window. Every fixed $u$ eventually enters the window and $\operatorname{sinc}(\rho_nu/2)^2\to1$. The extended function therefore converges pointwise to $e^{-u^2}$. On the inner half-window $|u|\le A_n/2$, the global fourth-moment estimate supplies an integrable Gaussian envelope. On the outer halves it gives $Q_n(u/s_n)^n\le e^{-u^2(1-u^2/A_n^2)}\le e^{-(A_n/4)(A_n-|u|)}$. Since $|\operatorname{sinc}(x)|\le1$, the sum of the two outer integrals is at most $8/A_n\to0$. Applying dominated convergence on the inner half-window and using the Gaussian integral $\int_{\mathbb R}e^{-u^2}du=\sqrt\pi$ give the coefficient. [Central Fejér integral limit](lean:D5/S3/Fourier/Asymptotics/MovingFejerGaussianPrincipal.central_fejer_gaussian_limit)

If $R_n$ is eventually nonnegative and tends to zero, an explicit choice is

$$
A_n=\left(R_n+\frac1{n+1}\right)^{-1/2}.
$$

Then $A_n\to+\infty$ and eventually $A_n^2R_n\le1$. For the pair-moment ratio above, nonnegative pair products and even powers ensure nonnegativity, and the denominator is eventually positive. Thus the chosen window satisfies the fourth-moment constraint.

For $\eta_n>0$ and $s_n>0$, set $\rho_n=\eta_n/s_n$. The substitution $u=s_nt$ identifies the central integral exactly with

$$
\frac{s_n}{\eta_n}\int_{-A_n/s_n}^{A_n/s_n}
K_{\eta_n}(t)|S_n(t)|^{2n}\,dt.
$$

This determines the central contribution to the whole-line Fejér moment. The whole-line limit and the asymptotic coefficient of the hard collision band still require

$$
\frac{s_n}{\eta_n}\int_{|t|>A_n/s_n}
K_{\eta_n}(t)|S_n(t)|^{2n}\,dt\longrightarrow0,
$$

with the corresponding limits at neighboring multiplicative resolutions. For the harmonic-weighted actual zeta spectrum, the moment-ratio condition holds under the cutoff growth condition above. The uniform Landau estimate below controls the integrated noncentral peaks and gives [@thm-ch34-zeta-harmonic-collision-limit] when $\eta_n\log T_n\to\infty$.

### Finite observation windows for whole-line moments

For nonnegative weights, put $F_p(t)=|S(t)|^{2p}$ and $M_\eta=\int_{\mathbb R}K_\eta(t)F_p(t)\,dt$. The triangular frequency weight $\phi_\eta(d)=\max(0,1-|d|/\eta)$ increases with resolution $\eta$. Since the occupation-pair coefficients are nonnegative, $M_b\le M_\eta$ whenever $0<b\le\eta$. For $\eta T\ge1$, take $b=1/T$. On $|t|\le T$ the bound $K_b(t)\ge1/(8\pi T)$ gives

$$
\int_{-T}^{T}F_p(t)\,dt\le 8\pi T M_\eta.
$$

Define $I_\eta(r)=\int_{-r}^{r}K_\eta(t)F_p(t)\,dt$. On $r\le|t|\le2r$ the kernel satisfies $K_\eta(t)\le2/(\pi\eta r^2)$. Combining with the previous estimate gives, when $\eta r\ge1$,

$$
I_\eta(2r)-I_\eta(r)\le\frac{32}{\eta r}M_\eta.
$$

Summing over the dyadic shells with $r=L,2L,4L,\ldots$ and taking the limit using whole-line integrability gives the uniform relative truncation bound for every $\eta L\ge1$,

$$
0\le M_\eta-I_\eta(L)\le\frac{64}{\eta L}M_\eta.
$$

[Relative truncation bound](lean:D5/S3/Fourier/Concentration/FejerRelativeLocalization.relative_fejer_truncation) This estimate permits the support, weights, degree and resolution to vary together, including repeated frequencies.

Choose $L_n$ with $\eta_nL_n\to+\infty$ and $L_n\ge A_n/s_n$. Set $\varepsilon_n=64/(\eta_nL_n)$. Eventually $I_{\eta_n}(L_n)\le M_{\eta_n}\le I_{\eta_n}(L_n)/(1-\varepsilon_n)$. The normalized finite-window integral $(s_n/\eta_n)I_{\eta_n}(L_n)$ and the normalized whole-line moment therefore share the same finite limit whenever either converges. Once the central principal contribution is established, the phase peaks still requiring control occupy the finite intermediate time range $A_n/s_n<|t|\le L_n$. Under the hypotheses of [@thm-ch34-zeta-harmonic-collision-limit], one can set $L_n=\log T_n$ and control the integral on this range with the phase estimates below.

### Short noncentral times for actual zeta ordinates

Retain the actual harmonic weights defined above and write $Z_T(t)=\sum_\gamma w_\gamma e^{i\gamma t}$. Under the existing RH interface, there is a fixed $L>1$ such that for $T\ge L$ and $1/T\le |t|\le1/L$,

$$
1-|Z_T(t)|\ge\frac{\log(1/|t|)}{524288(\log T)^2}.
$$

[Reciprocal-height score deficit](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_reciprocal_time_deficit) The retained spectrum through $X=1/|t|$ has $L\le X\le T$. Its pair moments satisfy $P_2(X)\ge X^2/(4096\log X)$ and $P_4(X)\le X^2P_2(X)$. Since $X^2t^2=1$, the quartic estimate yields $1-|Z_X(t)|^2\ge1/(16384\log X)$ and hence $1-|Z_X(t)|\ge1/(32768\log X)$. Splitting the actual finite sum through $T$ at $X$ and applying the triangle inequality at the same time $t$ gives

$$
W(T)(1-|Z_T(t)|)\ge W(X)(1-|Z_X(t)|).
$$

The harmonic mass bounds $W(X)\ge c(\log X)^2/16$ and $W(T)\le c(\log T)^2$ give the claimed deficit. Thus for each fixed $0<\delta<1$, all sufficiently large $T$ and $1/T\le|t|\le T^{-\delta}$ satisfy

$$
|Z_T(t)|^{2n}\le\exp\left(-\frac{\delta n}{262144\log T}\right).
$$

As a consequence of this estimate, use $s_n=\sqrt{nP_2(T_n)/2}$ and any positive resolution $\eta_n$. Since $P_2(T_n)\le T_n^2$ and $K_{\eta_n}\le\eta_n/(2\pi)$, the normalized contribution on this annulus is bounded by

$$
\frac{s_n}{\eta_n}\int_{1/T_n\le|t|\le T_n^{-\delta}}
K_{\eta_n}(t)|Z_{T_n}(t)|^{2n}\,dt
\le\frac{\sqrt{n/2}}{\pi}T_n^{1-\delta}
\exp\left(-\frac{\delta n}{262144\log T_n}\right).
$$

This upper bound tends to zero if $T_n\to\infty$ and $(\log T_n)^2/n\to0$, since both $\log T_n$ and $\log n$ are $o(n/\log T_n)$. For the region between the moving central window and $1/T_n$, the same quartic estimate with $X=T_n$ gives $|Z_{T_n}(t)|^{2n}\le e^{-11(s_nt)^2/12}$ for $|t|\le1/T_n$. Its normalized integral outside $|s_nt|\le A_n$ tends to zero as $A_n\to\infty$. Together with relative truncation, the integral that remains to be estimated lies on the intermediate range $T_n^{-\delta}<|t|\le L_n$ under these stronger growth conditions. For fixed $r>0$ and frequencies $\gamma/r$, rescale the time endpoints by $r$ and the variance scale by $1/r$.

### Short-window lower counts for the actual zero spectrum

Write $N(x,y)$ for the number of nontrivial zeta zeros with ordinates in $(x,y]$, counted with analytic multiplicity, and put

$$
M(Y)=\frac{Y}{2\pi}\left(\log\frac{Y}{2\pi}-1\right).
$$

The existing unconditional dyadic Riemann–von Mangoldt estimate bounds the residual of $N(x,2x)$ from $M(2x)-M(x)$ by $B\log x$ for sufficiently large $x$. Set $E(x)=N(0,x)-M(x)$. Count additivity gives $|E(2x)-E(x)|\le B\log x$. After enlarging $D$ to bound a fixed initial band $[U,2U]$ and to satisfy $2D\log 2\ge B$, the difference $D((\log(2x))^2-(\log x)^2)$ absorbs every dyadic residual. Every real $Y\ge U$ is a dyadic multiple of a point in that initial band. Hence

$$
|N(0,Y)-M(Y)|\le D(\log Y)^2.
$$

[Cumulative counting residual](lean:D5/S3/Weil/ZeroData/CumulativeRvmError.cumulative_rvm_error) The classical cumulative Riemann–von Mangoldt asymptotic has the stronger $O(\log Y)$ error. The displayed logarithmic-square bound follows directly from the exact dyadic counting theorem in the current formal library.

For $x\le y\le 2x$ with $x$ sufficiently large, the main term grows by at least $(y-x)\log x/(4\pi)$, and the two cumulative errors cost at most $5D(\log x)^2$. Consequently there exist $L>1$ and $K>0$ such that, whenever $L\le x$ and $x+K\log x\le y\le2x$,

$$
N(x,y)\ge\frac{(y-x)\log x}{8\pi}.
$$

[Short-window lower count](lean:D5/S3/Weil/ZeroData/CumulativeRvmError.short_window_count_lower) Both estimates hold without an RH premise. Under the positive-ordinate RH interface, the latter is an actual multiplicity-weighted lower count for moving bands of logarithmic width. Turning these counts into a uniform bound for the Fourier phase deficit at longer times requires additional estimates of the favorable phase intervals and their joint weighted contribution.

### Opposite phase arcs on reciprocal-logarithmic time windows

Under the RH interface, there exist fixed $L>1$ and $b>0$ such that for $T\ge L$ and $16\pi/T\le|t|\le b/\log T$,

$$
1-|Z_T(t)|\ge\frac{1}{4096\log T}.
$$

[Periodic phase deficit](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHPeriodicPhaseCoverage.harmonic_periodic_phase_deficit) To see the origin of the estimate, take $b=\pi/(8K)$ and $H=2\pi/|t|$. Then $8H\le T$ and $H/16\ge K\log T$. Starting at $k_0H$ with $k_0=\lceil T/(2H)\rceil$, use $q=\lfloor T/(4H)\rfloor\ge T/(8H)$ complete periods in $[T/2,T]$. In each period take the two half-open intervals of width $H/16$ starting at phases $0$ and $\pi$. For each family these intervals are pairwise disjoint. The phases in them are within distance $\pi/8<1/2$ of $+1$ and $-1$, respectively.

The count in each interval is at least $H\log T/(256\pi)$, by the short-window estimate and $\log(T/2)\ge\log T/2$ for $T\ge4$. Each zero in the upper band contributes at least $m_\gamma/(2T)$ to $W(T)$. Thus each of the two families has harmonic mass at least $\log T/(4096\pi)$. Project the raw complex score onto its own unit direction. If its real part is nonnegative, use the family near $-1$, otherwise use the family near $+1$. Those projections are at most $1/2$, while every unit phase has projection at most $1$. The raw norm deficit is therefore at least $\log T/(8192\pi)$. Division by $W(T)\le(\log T)^2/(2\pi)$ proves the claim. The bound also holds at negative times by conjugation.

Consequently throughout this window, $|Z_T(t)|^{2n}\le\exp(-n/(2048\log T))$. Combined with the earlier reciprocal-height bound on $1/T\le|t|\le T^{-1/2}$, it yields a vanishing normalized Fejér contribution on $1/T_n\le|t|\le b/\log T_n$ when $T_n\to\infty$ and $(\log T_n)^2/n\to0$. Indeed the additional periodic region contributes at most

$$
\frac{b\sqrt{n/2}\,T_n}{\pi\log T_n}
\exp\left(-\frac{n}{2048\log T_n}\right)\longrightarrow0.
$$

The uniform Landau estimate in the next section extends the phase bound from $b/\log T_n$ to $\log T_n$.

### From a uniform Landau bound to logarithmic times

Under RH, let $F_V(t)=\sum_{0<\gamma\le V}m_\gamma e^{i\gamma t}$. Use the following four-term estimate in the transfer below. Its proof under RH follows from the contour calculation.
$$
|F_V(t)|\le C\left[V+e^{|t|/2}(1+|t|)^2+e^{|t|/2}(1+\log V)+\frac{\log V}{|t|}\right]
\qquad(V>1,\ t\ne0).
$$
Gonek's uniform Landau formula supplies this premise at the literature level. With $x=e^{|t|}$, RH permits division of the zero sum by $\sqrt{x}$ to recover $F_V(|t|)$. The main term and nearest-prime-power error are both bounded by a constant times $V|t|e^{-|t|/2}$, using $\Lambda(x)\le\log x$ and the truncation by $V$ in the error. The other three terms follow from the two errors containing $x$ and the error as $x\to1$. Conjugation gives the estimate at negative times. [Gonek, Theorem 1, equation (3), pp. 92–93](https://www.sas.rochester.edu/mth/people/faculty/gonek-steve/assets/pdf/8-landau-form.pdf)

The rectangular contour separates the estimates that enter the uniform formula. With $x=e^{|t|}$, the first term of the right-edge bound after division by $\sqrt{x}$ is $O(V)$ because $\log(2x)/\sqrt{x}$ is bounded for $x>1$.

::: {.theorem #thm-ch34-landau-right-edge title="Right vertical edge of the Landau contour" lean="D5/S3/Weil/ZetaExplicit/LandauRightVertical.norm_right_vertical_integral"}
For real $x,V>1$, put $c=1+1/\log(3x)$. Write $s=c+iu$ for the integration variable $u$. Then

$$
\left|\int_1^V x^{s}\frac{-\zeta'(s)}{\zeta(s)}\,du\right|
\le 400\left(V\log(2x)+x(\log(2x))^2\right).
$$
:::

::: proof
Integrate the von Mangoldt series term by term on $\operatorname{Re}s=c>1$. Bound the nearest integer term by the interval length, which also covers exact resonance. When the nearest integer is $1$, its coefficient $\Lambda(1)$ vanishes. For the other integers in $[x/2,2x]$, the logarithmic gap $|\log x-\log n|$ is at least $|x-n|/(2x)$. Two harmonic sums bound the reciprocal distances on either side of the nearest integer. Beyond this interval the gap is at least $1/2$, and an integral test bounds the absolute series. The moving line gives $x^c\le 3x$. The full proof is checked by the Lean kernel.
:::

The right edge is oriented upward, so $ds=i\,du$. Its contribution to the contour integral of $\zeta'/\zeta$ with normalization $1/(2\pi i)$ equals the integral in the theorem multiplied by $-1/(2\pi)$. Ford and Zaharescu keep the oscillatory term at the nearest prime power. The theorem bounds the magnitude of the whole edge. After division by $\sqrt{x}$, the second term has order $e^{|t|/2}(1+|t|)^2$. [Ford–Zaharescu, proof of Lemma 1](https://arxiv.org/abs/math/0405459v2)

::: {.theorem #thm-ch34-landau-left-edge title="Left vertical edge of the Landau contour" lean="D5/S3/Weil/ZetaExplicit/LandauLeftVertical.norm_left_vertical_integral"}
For real $x>1$ and $V\ge1$, write $s=-1/4+iu$. Then

$$
\left|\int_1^V x^s\frac{-\zeta'(s)}{\zeta(s)}\,du\right|
\le x^{-1/4}\left(80(V-1)+\frac{20(1+\log V)}{\log x}\right).
$$
:::

::: proof
The zeta functional equation gives $-\zeta'(s)/\zeta(s)=\log(3/4+iu)+r(u)$ with $|r(u)|\le80$, by the digamma recurrence, the Binet bound and the absolutely convergent series on the reflected line $\operatorname{Re}(1-s)=5/4$. Factor $x^s$ into $x^{-1/4}e^{iu\log x}$. The integral of the remainder costs at most $80(V-1)$ before scaling. Integrate the logarithm by parts using the primitive $e^{iu\log x}/(i\log x)$. The logarithm derivative has norm at most $1/u$, and the two endpoints together with the integrated derivative give the second term. The Lean proof is unconditional.
:::

The left edge is oriented downward, so its normalized contribution to the contour integral with $\zeta'/\zeta$ is the integral in the theorem times $1/(2\pi)$. With $x=e^{|t|}$, division by $\sqrt{x}$ yields a term of order $V$ and a term bounded by a constant times $(1+\log V)/|t|$.

::: {.theorem #thm-ch34-landau-inclusive-cutoff title="Uniform bound for the inclusive zeta zero phase sum" lean="D5/S3/Weil/ZetaExplicit/LandauUniformCutoff.actual_cutoff_landau_envelope"}
Assume RH. There is an absolute constant $C>0$ such that for every real $V>1$ and $t\ne0$,

$$
|F_V(t)|\le C\left[V+e^{|t|/2}(1+|t|)^2+\frac{\log V}{|t|}\right].
$$
:::

::: proof
Set $x=e^{|t|}$. Choose a zero-free height at most $2$ above $V$. Keep the bottom edge at height $1$ and use the two preceding bounds on the vertical edges. The zeta functional equation extends the square-logarithmic bound from the right of the critical line to the entire top edge. The weighted argument principle counts the zeros inside the rectangle with analytic multiplicity. Under RH, each $x^\rho$ contains a common factor $\sqrt{x}$, which cancels when we recover the phase sum. The top contribution is bounded by a constant times $\sqrt{x}\log^2(V+9)$. If $x\le V$, this is bounded by a constant times $V$. If $x>V$, bound the logarithm in terms of $x$. The transfer back to $V$ crosses a window of bounded length with total analytic multiplicity $O(\log(V+9))$. The cutoff is empty for $1<V\le6$. Complex conjugation handles negative frequencies.
:::

The four-term bound above follows by adding the nonnegative term. This controls the norm of the whole phase sum. Gonek’s Theorem 1 gives the explicit prime-power main term.

For fixed $b>0$, the four terms in brackets are together at most $(7+1/b)T$ on $b/\log T\le|t|\le\log T$ when $T$ is sufficiently large and $1<V\le T$. Indeed $\log T\le T^{1/4}$ eventually, $e^{|t|/2}\le\sqrt T$, and $\log V/|t|\le(\log T)^2/b$. Apply this to $V=T$ and $V=3T/4$. Their difference has norm at most $2C(7+1/b)T$, which is eventually at most $T\log T/(32\pi)$. The multiplicity count on $(3T/4,T]$ is at least $T\log T/(16\pi)$.

On this band the harmonic weights dominate the retained weights $m_\gamma/(2T)$. The remaining weights are nonnegative, so the norm of their score is at most their total mass. The triangle inequality therefore preserves the retained deficit, which is at least half the band count divided by $2T$. The mass bound $W(T)\le(\log T)^2/(2\pi)$ now gives
$$
1-|Z_T(t)|\ge\frac1{32\log T},
\qquad \frac b{\log T}\le |t|\le\log T.
$$
The Lean theorem verifies this transfer with the uniform estimate as an explicit premise. [Logarithmic-time harmonic deficit](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLandauWindowTransfer.harmonic_landau_window_deficit)

::: {.theorem #thm-ch34-zeta-harmonic-collision-limit title="Gaussian collision limit for harmonic-weighted zeta zeros" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLogarithmicCollisionLimit.harmonic_zeta_collision_limit"}
Assume the Riemann hypothesis (RH) in Mathlib’s formulation. If $\zeta(s)=0$, $s\ne1$, and $s\ne-2(k+1)$ for every natural number $k$, then $\operatorname{Re}s=1/2$. Also assume the uniform estimate above for some fixed $C>0$. Let $T_n\to\infty$ with $(\log T_n)^2/n\to0$ and set $s_n=\sqrt{nP_2(T_n)/2}$. If $\eta_n$ is eventually positive, $\eta_n/s_n\to0$ and $\eta_n\log T_n\to\infty$, then

$$
\frac{s_n E_n(\eta_n)}{\eta_n W(T_n)^{2n}}\longrightarrow\frac1{\sqrt\pi}.
$$

Here $E_n(r)$ sums over ordered pairs of occupation vectors whose absolute frequency difference is at most $r$. Each pair contributes the product of its two multinomial weights induced by the original harmonic weights.
:::

::: proof
The fourth-moment bound $P_4(T)\le T^2P_2(T)$ allows the central window to extend to $|t|\le1/T_n$. The lower bound on the second moment makes its rescaled half-width $s_n/T_n$ tend to infinity. The central integral gives $1/(2\sqrt\pi)$. The reciprocal-height, periodic-phase, and Landau estimates cover the entire range $1/T_n\le|t|\le\log T_n$ with a uniform score deficit of at least $c/\log T_n$ for some $c>0$. The score raised to the power $2n$ is therefore bounded by $\exp(-2cn/\log T_n)$, which absorbs the factor $T_n\sqrt n\log T_n$ in the normalized integral. Relative truncation transfers the limit to the full line. The argument works for every fixed positive multiple of $\eta_n$. This gives a quadratic ramp limit, and the two secants recover the hard-band constant with the endpoint included. The full proof is checked by the Lean kernel.
:::

The uniform bound in [@thm-ch34-landau-inclusive-cutoff] supplies the Landau premise in the frozen collision theorem. The collision limit therefore follows from RH and the stated cutoff and resolution conditions. Alpöge’s external formalization supplies Mathlib’s RH proposition. [External RH theorem](https://github.com/leanprover-community/riemann-hypothesis/blob/7c4ccbd64d02774b0a5b40a5f923f5b7a18e8abc/src/Main.lean#L9)

When $\eta_n\log T_n$ is bounded, the relative error bound at the cutoff $\log T_n$ can stay of order one.

### Critical resolution from an upper pair-correlation bound

A sufficiently small uniform bound on the Montgomery pair sum controls a longer Fourier window. Use the same inclusive positive-ordinate cutoff. Write $N(Y)=\sum_{0<\gamma\le Y}m_\gamma$ and $F_Y(t)=\sum_{0<\gamma\le Y}m_\gamma e^{it\gamma}$, and set

$$
G_Y(t)=
\sum_{0<\gamma,\gamma'\le Y}
m_\gamma m_{\gamma'}\frac{4\cos\bigl(t(\gamma-\gamma')\bigr)}
{4+(\gamma-\gamma')^2}.
$$

::: {.theorem #thm-ch34-zeta-harmonic-critical-collision-limit title="Conditional Gaussian collision limit at critical resolution" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHCriticalCauchyThreshold.harmonic_zeta_critical_collision_limit_of_cauchy_cap"}
Assume RH in Mathlib’s formulation. Let $c=1/(2\pi)$ and assume there is a fixed $\kappa<2\pi c^2$ such that for each fixed $A>1$ and all sufficiently large $Y$, $G_Y(t)\le\kappa Y\log^2 Y$ uniformly on $\log Y\le |t|\le A\log Y$. Let $T_n\to\infty$ with $(\log T_n)^2/n\to0$. Use the same harmonic weights, $W(T_n)$, and $s_n=\sqrt{nP_2(T_n)/2}$ as above. Assume $\eta_n/s_n\to0$ and there is an $a>0$ with $\eta_n\log T_n\ge a$ eventually. Then
$$
\frac{s_n E_n(\eta_n)}{\eta_n W(T_n)^{2n}}\longrightarrow\frac1{\sqrt\pi}.
$$
:::

::: proof
Place the coefficients $m_\gamma e^{it\gamma}$ at their zero heights and smooth them with the unit-scale Cauchy density. The convolution of two such densities gives the scale-two Lorentz kernel, so $G_Y(t)$ is $2\pi$ times the squared $L^2$ norm of the smoothed sum. For $R>0$, each translated density loses at most $\ell_R=1-2\arctan(R)/\pi$ of its mass outside $[-R,Y+R]$. Cauchy–Schwarz on this interval gives
$$
G_Y(t)\ge \frac{2\pi}{Y+2R}\bigl(\max\{|F_Y(t)|-\ell_R N(Y),0\}\bigr)^2 .
$$

Take $R=\delta Y$ with $\delta>0$ small enough that $\kappa<2\pi c^2/(1+2\delta)$. Since $\ell_R\to0$ and $N(Y)/(Y\log Y)\to c$, this strict gap gives $N(Y)-|F_Y(t)|\ge dN(Y)$ for a fixed $d>0$. The harmonic weight is at least $m_\gamma/(2Y)$ throughout the inclusive cutoff. Adding nonnegative weights cannot decrease the difference between total mass and the magnitude of the phase sum. The unweighted deficit therefore transfers directly to the harmonic weights over the whole cutoff. Using $W(Y)\sim(c/2)\log^2 Y$ gives a normalized deficit of at least a positive constant divided by $\log Y$. The reciprocal-height, periodic-phase, and Landau estimates above control the shorter time window.

For each fixed $A>1$, the normalized integral through $A\log T_n$ tends to the central Gaussian constant. For sufficiently large $A$, relative truncation bounds the remaining fraction by $64/(aA)$. At any fixed resolution multiple $\lambda\eta_n$ with $\lambda>0$, the lower-bound parameter becomes $\lambda a$ and the bound is $64/(\lambda aA)$. Choosing $A$ arbitrarily large before taking the limit in $n$ lets the two secants at neighboring resolutions recover the inclusive hard-band limit. The full proof is checked by the Lean kernel.
:::

This threshold includes the uniform condition $G_Y(t)=o(Y\log^2 Y)$, which would follow from Montgomery's pair-correlation conjecture. The long-band threshold for actual $\zeta$ zeros remains an arithmetic premise of this theorem. The result includes $\eta_n\log T_n\to a$ for $0<a<\infty$. For fixed finite support and fixed positive variance, the occupation-diagonal bound below gives a finer-resolution regime in which the normalized Fejér moment diverges. Under RH and the finer asymptotic in Conjecture 5, Ford–Soundararajan–Zaharescu’s Theorem 1.4 gives phase cancellation. Theorem 1.3 then gives the short-interval prime consequence. Lemma 1 bounds the phase sum using differences of translated centered pair sums. [§1 and Theorems 1.3–1.4](https://arxiv.org/html/0805.2745v3#S1) · [Lemma 1](https://arxiv.org/html/0805.2745v3#Thmlemma1)

::: {.theorem #thm-ch34-montgomery-bounded-count-upper title="A uniform pair-sum upper bound from bounded count discrepancy" lean="D5/S3/Analytic/Oscillation/MontgomeryCountUpper.pairSum_le_of_bounded_discrepancy"}
Take any locally finite spectrum of positive ordinates with positive integer multiplicities. Use the inclusive count $N(Y)$ and the ordered pair sum $G_Y(t)$ above, and let $c=1/(2\pi)$. If there is a constant $D$ such that $|N(Y)-cY(\log(cY)-1)|\le D$ for all sufficiently large $Y$, then for each $\varepsilon>0$ the bound

$$
G_Y(t)\le (2\pi c^2+\varepsilon)Y(\log Y)^2
$$

holds for all sufficiently large $Y$ and every real $t$.
:::

::: proof
Suppose the count discrepancy is bounded from a fixed height $A\ge1$ onward. Center a closed interval of radius $r$ at an ordinate through $Y$. The sum of multiplicities of ordinates in the interval with $0<\gamma\le Y$ is at most $2cr\log Y+N(A)+2D+c$. The contribution through $A$ is at most $N(A)$. Bound the remaining mass by a difference of inclusive counts, shifting the lower cutoff left by $1/\log Y$ and clamping it at $A$ to include the left endpoint. Integrating over the Lorentz kernel’s superlevel intervals bounds each row by $2\pi c\log Y+N(A)+2D+c$. Bound each cosine by one and sum the rows with their multiplicities. The conclusion follows from $N(Y)/(Y\log Y)\to c$. The full proof is checked by the Lean kernel.
:::

The counting theorem allows upper coefficients arbitrarily close to $2\pi c^2$ from above. The critical collision theorem requires a fixed coefficient strictly below $2\pi c^2$ on the long bands for the actual $\zeta$ zeros.

### Commensurate spectra with the same unit-band profile

The upper bound in [@thm-ch34-zeta-harmonic-critical-collision-limit] controls frequencies beyond the unit band. One spectrum can match the two-term zero count with $O(\log\log H)$ error and the full unit-band Lorentz profile, while its normalized critical collision mass eventually exceeds the Gaussian constant by a fixed amount. The comparison uses one spectrum at every real truncation height.

For a cyclic group with $M>0$ sites, choose a set $A$ of $k$ Fourier columns normalized to have unit norm. Assign a $k$-site subset $X$ the squared modulus of the corresponding row minor. Column orthogonality makes these probabilities sum to one. At $r\in\mathbb Z/M\mathbb Z$ let $S_X(r)=\sum_{x\in X}\exp(2\pi i r x/M)$.

::: {.theorem #thm-ch34-cyclic-projection-second-moment title="Second moment of a cyclic projection ensemble" lean="D5/S3/Analytic/Oscillation/CyclicProjectionMoments.cyclic_projection_second_moment"}
For every such choice of $M$, $A$, and $r$,

$$
\mathbb E|S_X(r)|^2=k+k^2\mathbf1_{\{r=0\}}-|A\cap(A+r)|.
$$

:::

::: proof
The diagonal site pairs contribute $k$. For distinct sites the inclusion probability is the product of the diagonal projection entries minus the squared modulus of the off-diagonal entry. The first term, summed over all site pairs, contributes $k^2$ at frequency zero. In the second term, expand the projection entries over the selected columns. Summation over each site cancels every pair of columns whose difference is not $r$. On equal sites the difference of the two projection products vanishes, so each product can be summed over all ordered pairs. The full proof is checked by the Lean kernel.
:::

An infinite comparison can use this cyclic projection law separately on each interval $I_j=(y_j,y_{j+1}]$, with $y_{j+1}=y_j+\lceil(\log y_j)^4\rceil$ and $y_0$ sufficiently large. Put $F(H)=\frac{H}{2\pi}(\log(H/(2\pi))-1)$, $L_j=\log y_{j+1}$, and let $R_j$ be the smallest power of two at least $L_j$. The available sites in $I_j$ lie on $h_j\mathbb Z$ with $h_j=2\pi/(3R_j)$. If there are $M_j$ sites, select $k_j=\lfloor F(y_{j+1})\rfloor-\lfloor F(y_j)\rfloor$ consecutive columns on that cycle. This fixes the count in the full block. The site count and the rank each have order $L_j^5$. Write $p_j=k_j/M_j$ and $a_j=2\pi p_j/h_j=L_j+O(1)$. The densities stay bounded away from zero and satisfy $p_j\le 1/3+o(1)$.

For a prefix of $m$ sites the count has mean $m p_j$. Its variance is the sum of the squared projection entries from the prefix to its complement. There are at most $4u$ ordered crossing pairs at cyclic distance $u\ge1$, and each squared entry is at most $1/(4u^2)$ by the geometric-series formula for the consecutive columns. Thus the variance is $O(\log M_j)$, uniformly over prefixes. The count is distributed as a sum of independent Bernoulli variables from the restricted kernel. Bernstein's inequality and a union bound give error $O(\log M_j)$ for all prefixes with probability tending to one. For $H\in I_j$, the fraction of sites through $H$ differs from the corresponding length fraction by $O(1/M_j)$. Interpolating $F$ linearly across $I_j$ costs $O((\log y_j)^8/y_j)$ since $F''(x)=1/(2\pi x)$. Summing the completed counts by telescoping gives $N(H)=F(H)+O(\log\log H)$ at all real cutoffs. [Restricted determinantal counts](https://arxiv.org/abs/math/0503110)

For the Lorentz statistic in a full block write $M=M_j$, $p=p_j$, $h=h_j$, $K(d)=M^{-1}\sum_{a=0}^{k_j-1}e^{2\pi iad/M}$, and $w_h(d)=4/(4+h^2d^2)$. The expectation is

$$
p^2\sum_{|d|<M}(M-|d|)w_h(d)e^{ihdt}
+k_j-\sum_{|d|<M}(M-|d|)w_h(d)|K(d)|^2 e^{ihdt}.
$$

In the first sum, replacing the triangular coefficient by $M$ on all integers costs $O(h^{-2}\log M)=o(k_j)$. The infinite series is the periodization $(2\pi/h)\sum_{\ell\in\mathbb Z}e^{-2|t-2\pi\ell/h|}$, by its Fourier coefficients. Through $|t|\le3L_j/2$, the central term gives $k_j a_j e^{-2|t|}$ and the other periods contribute $o(k_j)$. In the last sum, the normalized coefficients converge in absolute sum to the squared Fourier coefficients of the indicator of $[0,p]$ on the circle. For fixed $d$ this follows from the Riemann sum and $h\to0$. The bound $O(d^{-2})$ controls the coefficients through $|d|\le M/2$. The rest contribute $O(h^{-2}/M^2)$ using $\sum_{d\bmod M}|K(d)|^2=p$. The circular autocorrelation equals $(p-|ht/(2\pi)|)_+$ here, since $|ht/(2\pi)|\le1/2$ and $p<1/2$ for all sufficiently large $j$. The expectation divided by $k_j$ is therefore $a_j e^{-2|t|}+\min(1,|t|/a_j)+o(1)$ uniformly. [Squared-minor inclusion probabilities](https://www.numdam.org/item/10.1007/s10240-003-0016-0/)

The pair statistic has Boolean-cube Lipschitz constant $O(L_j)$ by the row sum of $w_h$. Homogeneous strong Rayleigh concentration at deviation $k_j/L_j$ bounds the failure probability at any one time by $2\exp(-c k_j/L_j^4)$. The exponent $k_j/L_j^4$ has order $L_j$. A mesh of width $L_j^{-20}$ on $[-3L_j/2,3L_j/2]$ has polynomially many points, so the probability of a deviation at any mesh point tends to zero. The derivative is at most $(y_{j+1}-y_j)k_j^2=O(L_j^{14})$, so the mesh estimates extend uniformly in time. Intersect this event with the prefix count event and choose one subset in each block. [Concentration for strong Rayleigh measures](https://arxiv.org/abs/1108.0687v2)

At height $H$, all sites through $H$ lie on the lattice for the current block since the denominators $R_j$ divide their successors. Every interval of length one has $O(\log H)$ available sites, so the absolute Lorentz row sum is $O(\log H)$. Counting pairs across one seam by unit intervals gives $O(\log^3 H)$, using the bound $O(\log H/(1+d))$ for the weighted sum of sites across the seam at distance $d$. There are $O(H/\log^4 H)$ seams. Below $\sqrt H$ they have spacing at least one, and above $\sqrt H$ spacing at least $(\log H/2)^4$. The top partial block has $O(\log^5 H)$ sites. The seams and partial block each contribute $o(N(H))$. The same row bound discards all blocks through the one meeting $H/\log^3 H$ at cost $o(N(H))$. In the remaining blocks $a_j/\log H\to1$ uniformly and their counts sum to $N(H)(1+o(1))$. Hence the normalized pair sum is

$$
\frac{G_H(t)}{N(H)}
=\bigl(1+o(1)\bigr)\log H\,e^{-2|t|}+\frac{|t|}{\log H}+o(1)
\qquad (|t|\le\log H)
$$

uniformly, with the same two terms as the zeta unit-band theorem. [Unit-band formula](https://arxiv.org/abs/2306.04799)

As a check on the distinction between pointwise and averaged bounds, let $P_H=2\pi/h_j$ be the common period at $H\in I_j$. Over any full period, each off-diagonal character integrates to zero, since distinct lattice sites differ by a nonzero integer multiple of $h_j$. The mean of $G_H$ over the period is therefore exactly $N(H)$. Nonnegativity of the Lorentz statistic then bounds its mean over an interval of length comparable to $\log H$ by $O(N(H))$, even in intervals containing the recurrence.

At $Y_j=y_{j+1}$ the pair statistic repeats its value at zero at time $2\pi/h_j=3R_j$, which lies between $3\log Y_j$ and $6\log Y_j$. To see what this does to the hard-band collision mass, use the same positive harmonic weights as for the zeta spectrum, now on the selected sites. For sufficiently large $n$, let $T_n=Y_j$ be the largest block endpoint at most $n$ and put $\eta_n=h_j/8$. Since the block lengths are $O(\log^4 n)$ near $n$, one has $T_n/n\to1$. The variance is $V_n=P_2(T_n)/2$, with $s_n=\sqrt{nV_n}$. Two fixed distinct sites give $V_n\gtrsim W(T_n)^{-2}$, and the count bound gives $W(T_n)=O(\log^2 T_n)$ by summation by parts. Thus $s_n/h_j\to\infty$. The lattice variance lower bound integrates $(1-V_nt^2/2)_+^{2n}$ over a period with factor $h_j/(2\pi)$. On $|t|\le1/(2s_n)$ the integrand is at least $3/4$ by Bernoulli's inequality. It follows that the normalized collision mass is eventually at least $3/\pi>1/\sqrt\pi$, although $\eta_n\log T_n\in(\pi/24,\pi/12]$, $(\log T_n)^2/n\to0$, and $\eta_n/s_n\to0$. The infinite comparison is a written proof about the selected sites. The zeta prime-sum identities impose further arithmetic conditions on actual ordinates.

#### The unit band rules out bounded count discrepancy

Let $S$ consist of distinct positive real ordinates $\gamma$, with finitely many in each interval $(0,H]$. Give each ordinate a positive integer multiplicity $m_\gamma$ and set $N(H)=\sum_{\gamma\le H}m_\gamma$. Let $G_H(t)$ be the ordered Lorentz pair sum above, with factor $m_\gamma m_{\gamma'}$ for each pair, and use the normalization $P_H(\alpha)=2\pi G_H(\alpha\log H)/(H\log H)$.

::: {.theorem #thm-ch34-montgomery-unit-band-unbounded-discrepancy title="Unbounded count discrepancy from the Montgomery unit band" lean="D5/S3/Analytic/Oscillation/MontgomeryCountDiscrepancy.unit_band_profile_forces_unbounded_count_discrepancy"}
Suppose $c(H)\to1$ and $e(H)\to0$ and, for all sufficiently large $H$ and all $|\alpha|\le1$,

$$
\left|P_H(\alpha)-c(H)\log H\,e^{-2|\alpha|\log H}-|\alpha|\right|\le e(H).
$$

Then for every real $D$ and $H_0$ there is a real $H\ge H_0$ with $|N(H)-F(H)|>D$, where $F$ is the two-term count above.
:::

::: proof
Suppose $|N(H)-F(H)|$ is eventually bounded. Let $a=\log H/(2\pi)$ and take a real Schwartz test function $g$ with Fourier support inside $(-1,1)$, using the Fourier convention $\widehat g(\alpha)=\int g(u)e^{-2\pi i\alpha u}\,du$. The smoothed count at $x$ is $C_H(x)=\sum_{\gamma\le H}m_\gamma g(a(x-\gamma))$. Fourier inversion of $g*\widetilde g$, with $\widetilde g(u)=g(-u)$, tests the profile against $|\widehat g|^2$. The peak $\log H\,e^{-2|\alpha|\log H}$ has asymptotic unit mass and contributes $|\widehat g(0)|^2$.

Under bounded discrepancy there are uniformly bounded counts with multiplicity per unit cell in the scaled coordinate $a\gamma$, since $F'(x)\le a+O(1)$ through the cutoff. Accordingly, dropping the Lorentz weight from the pair sum after autocorrelation testing and normalization costs $O(a^{-2})$. Each row of the error is bounded by summing the Schwartz suprema of $(1+u^2)|(g*\widetilde g)(u)|$ over the cells, using $1-4/(4+v^2)\le v^2/4$. The unnormalized tested pair sum with multiplicities and without the Lorentz weight is $a\int_{\mathbb R} C_H^2$, and $N(H)/(aH)\to1$. The contribution outside $[0,H]$ to $\int(|C_H|+C_H^2)$ is $o(H)$. The $O(\log H)$ points counted with multiplicity within distance one of the endpoints give a bounded exterior $L^1$ contribution and all other sites contribute only the Schwartz tail beyond scaled distance $a$. The same cell bound gives a uniform supremum of $|C_H|$, which controls the exterior $L^2$ contribution. Also $H^{-1}\int C_H\to\int g$. Combining these facts gives

$$
\lim_{H\to\infty}\frac1H\int_0^H\left(C_H(x)-\int g\right)^2\,dx
=\int_{\mathbb R}|\alpha|\,|\widehat g(\alpha)|^2\,d\alpha .
$$

On the other hand, integrating by parts against the cumulative count error bounds $C_H$ minus the convolution with the truncated density $F'$ by $D_*\|g'\|_1$, where $D_*$ is a bound independent of $g$ and $H$. One may set the reference density to zero below a fixed height exceeding $2\pi$, which changes its cumulative discrepancy by a bounded amount. The convolution of the reference density with $g(a\,\cdot)$ tends to $\int g$ in mean square over $[0,H]$. Indeed $F'/a\to1$ uniformly on each fixed interior fraction of $[0,H]$, and the truncated normalized density is bounded up to the edges. The variance limit is therefore at most $D_*^2\|g'\|_1^2$.

Let $g_R=\mathbf1_{[-R,R]}*\phi$, where $\phi$ is the inverse Fourier transform of a real even smooth bump $b$, supported on $[-1/2,1/2]$ and equal to one on $[-1/4,1/4]$. Differentiation gives the difference of two translates of $\phi$, so $\|g_R'\|_1\le2\|\phi\|_1$. Insert $\widehat g_R(\alpha)=\sin(2\pi R\alpha)b(\alpha)/(\pi\alpha)$ in the Fourier energy. On each dyadic interval $[2^j/(2R),2^{j+1}/(2R)]$ with $j\in\mathbb N$ that lies in $(0,1/4]$, the squared sine averages $1/2$ over full periods and $1/\alpha$ is bounded below by the reciprocal of the right endpoint. Each interval contributes at least $1/(4\pi^2)$. Taking the height limit at fixed $R$ and then increasing $R$ contradicts the uniform variance bound. The full proof is checked by the Lean kernel.
:::

The commensurate comparison shows that the count discrepancy under the preceding unit-band hypothesis can still have an $O(\log\log H)$ upper bound. The proof uses the profile through integrals against fixed band-limited tests. A bounded error concentrated near zero frequency makes a smaller contribution as the width of the peak shrinks.

::: {.theorem #thm-ch34-montgomery-concentrated-peak-discrepancy title="Unbounded count discrepancy with a frequency-dependent peak error" lean="D5/S3/Analytic/Oscillation/MontgomeryCountDiscrepancy.concentrated_unit_band_profile_forces_unbounded_count_discrepancy"}
Use the same spectrum and normalization of the pair sum, and let $L=\log H$. Suppose there are a fixed $B\ge0$ and $e(H)\to0$ such that for all sufficiently large real $H$ and every $|\alpha|\le1$,

$$
\left|P_H(\alpha)-L e^{-2L|\alpha|}-|\alpha|\right|
\le B e^{-2L|\alpha|}+e(H).
$$

Then for every real $D$ and $H_0$ there is a real $H\ge H_0$ with $|N(H)-F(H)|>D$.
:::

::: proof
Fix a real Schwartz function $g$ with Fourier support in $[-1,1]$ and test the band profile against $p=|\widehat g|^2$. Then $p$ is continuous, bounded, integrable, and zero outside the band. For large $H$ we have $L>0$. Since $\int_{\mathbb R}e^{-2L|\alpha|}\,d\alpha=1/L$, the error contributes at most $B\|p\|_\infty/L+e(H)\|p\|_1$ to the tested integral. Both terms vanish. In the normalized peak integral substitute $v=L\alpha$ to obtain the integrand $e^{-2|v|}p(v/L)$. Continuity and dominated convergence give the peak contribution $p(0)$ in the limit. The variance limit and the variance bound under bounded count discrepancy from the preceding proof therefore apply. The full proof is checked by the Lean kernel.
:::

Formula (1.4) of Baluyot, Goldston, Suriajaya and Turnage-Butterbaugh supplies the two error terms with $e(H)=O(L^{-1/2})$. Their statistic uses complex zero differences. With the zeros on the critical line by the Riemann hypothesis, swapping the members of each ordered pair reduces it to the ordinate cosine sum. Evenness extends the estimate from $[0,1]$ to $[-1,1]$. With that identification, the discrepancy of the zeta zero count from the two-term main term is unbounded on every real tail. The collision theorem still requires a separate bound on the longer band. [Unit-band formula, (1.1)–(1.4)](https://arxiv.org/html/2306.04799v1#S1.E4)

### Occupation diagonal lower bound for finite support

For finite support, the noncentral contribution also has a constraint independent of the specific frequency values. Suppose $w_j\ge0$ and $\sum_jw_j=1$, and let an occupation vector $m$ of degree $p$ satisfy $\sum_jm_j=p$. Write $c_m$ for its actual multinomial weight. Choose an index $j_0$, whose count is determined by the other counts and the total degree. For positive radii $r_j$ on the remaining coordinates define

$$
v=\sum_{j\ne j_0}\frac{p w_j(1-w_j)}{r_j^2},
\qquad B=\prod_{j\ne j_0}(1+2r_j),
\qquad D_p=\sum_m c_m^2.
$$

The actual centered second moment of coordinate $j$ is $p w_j(1-w_j)$. Hence the total weight of occupations satisfying $\sum_{j\ne j_0}(m_j-pw_j)^2/r_j^2\le1$ is at least $\max(0,1-v)$. Each count lies in a closed interval of length $2r_j$, which contains at most $1+2r_j$ integers. Projection away from $j_0$ is injective, so there are at most $B$ retained occupations. Cauchy–Schwarz gives

$$
\max(0,1-v)^2\le B D_p.
$$

[Occupation diagonal bound](lean:D5/S3/Fourier/Concentration/OccupationDiagonalFloor.occupation_diagonal_lower)

This gives a floor for the whole-line Fejér moment. Each diagonal term of the triangular weighted sum equals $c_m^2$, and all other terms are nonnegative. Thus for arbitrary real frequencies and every $\eta>0$,

$$
\max(0,1-v)^2
\le B\int_{\mathbb R}K_\eta(t)|S(t)|^{2p}\,dt.
$$

[Whole-line Fejer moment lower bound](lean:D5/S3/Fourier/Concentration/OccupationDiagonalFloor.fejer_occupation_floor)

For support of $d+1$ indices and $p>0$, take every $r_j=\sqrt{2p}$. Then $v\le1/2$, giving

$$
\int_{\mathbb R}K_\eta(t)|S(t)|^{2p}\,dt
\ge \frac{1}{4(1+2\sqrt{2p})^d}.
$$

For fixed support and fixed positive variance, if $\eta_p=o(p^{-(d-1)/2})$, the whole-line moment normalized by $s_p/\eta_p$ diverges. The central window can still satisfy the Gaussian limit above, which gives a quantitative regime where the noncentral integral cannot be neglected. Actual zeta-ordinate families that grow with degree still require separate estimates for occupations, phase peaks, and frequency differences.
