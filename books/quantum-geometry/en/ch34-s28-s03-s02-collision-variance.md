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

This inequality constrains the averaging length of the moment test. An upper bound for high-order weighted near-collisions of actual ζ ordinates at positive resolution and the possible existence of missing windows in shorter ranges remain open here.

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

For degree-$p$ frequency sums set $A=W^p$ and $B=pV$, strengthening the necessary condition for the moment test above. For $B>0$, as $\eta/\sqrt B\to0$, choosing $r=\lceil\sqrt{5M}\rceil$ makes the normalized coefficient of the lower bound tend to $3/(5\sqrt5)$. Thus $\liminf E(\eta)\sqrt B/(A^2\eta)\ge3/(5\sqrt5)$ when $A>0$. An upper bound for actual zeta ordinates requires further proof.

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

For $0\le\eta<1$, different integer sites are farther apart than $\eta$, so only the diagonal contributes. The identity $c_k^2=n^2c_k-k^2c_k$ gives the formula. At $n=1$, the center carries the entire positive weight. For $n\ge2$ and $\eta\ge1$, the ordered pair $(0,1)$ already contributes strictly positive additional mass. A negative radius excludes every pair. [Lean proof of the exact collision formula](https://github.com/the-omega-institute/trureturing/blob/afc30aadad62cff44787b01db91ff06d4c5adbcc/D5/S3/Fourier/Concentration/SeparatedParabolicCollision.lean#L25)

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

Choose $\eta_n=n/(n+1)$, so each resolution is strictly smaller than the site spacing and $L=1$. Thus the coefficient $3/(5\sqrt5)$ in the preceding section is asymptotically sharp for arbitrary finite nonnegative weighted data. The same parabolic profile appears in continuous second-moment extremization of Rényi entropy, as in [Sekeh, equation (2.1) and Theorem 3.1](https://arxiv.org/abs/1509.02190v4). Here the separated finite sites ensure only diagonal collisions occur inside the closed band. Requiring the data to arise as high-degree sums from a fixed frequency family or from actual zeta ordinates requires additional arithmetic constraints. [Lean proof of the limit](https://github.com/the-omega-institute/trureturing/blob/afc30aadad62cff44787b01db91ff06d4c5adbcc/D5/S3/Fourier/Concentration/SeparatedParabolicCollision.lean#L154)

## A finite Fourier variance bound for lattice convolutions

For the original frequencies $g_j$ and nonnegative weights $w_j$, put $S(t)=\sum_j w_je^{ig_jt}$, $W=\sum_jw_j$ and $D=\sum_jw_j(g_j-a)^2\le VW$, where $a$ is an arbitrary real center. Centering rotates the complex sum. The bound $\cos x\ge1-x^2/2$ yields

$$
|S(t)|\ge W\max(0,1-Vt^2/2),\qquad
|S(t)|\ge\max(0,W-Dt^2/2).
$$

When $D>0$ and $t\ne0$, the inequality $|S(t)|>W-Dt^2/2$ is strict because at least one positive-weight term has a nonzero centered argument. [Lean proof of the characteristic-function bound](https://github.com/the-omega-institute/trureturing/blob/c1296ace4f5b66516a07af37f37a1dbcec0d50e1/D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lean#L27)

Suppose the frequencies lie on an affine lattice $g_j=b+h a_j$, with $h>0$ and integer $a_j$. For arbitrary real weights, natural degree $p$, positive integer $k$, real $s$, and $0\le\eta<h$, put $A=k\pi/h$. There is an exact identity

$$
E_p(\eta)=\frac{1}{2A}\int_{s-A}^{s+A}|S(t)|^{2p}\,dt.
$$

In the finite polynomial pair expansion of $|S|^{2p}$, every difference of two degree-$p$ sums equals $hd$ for an integer $d$. The corresponding cosine has mean $\cos(hds)\operatorname{sinc}(k\pi d)$. Thus all ordered pairs of equal frequency sums survive. [Lean proof of the period identity](https://github.com/the-omega-institute/trureturing/blob/c1296ace4f5b66516a07af37f37a1dbcec0d50e1/D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lean#L111)

For nonnegative weights and $\eta\ge0$, integrating the pointwise lower bound over a single period gives

$$
E_p(\eta)\ge \frac{hW^{2p}}{2\pi}
\int_{-\pi/h}^{\pi/h}\max(0,1-Vt^2/2)^{2p}\,dt.
$$

The inequality is strict when $D>0$ and $p>0$. This uses the common Fourier power expansion of degree sums. For fixed $V,h>0$ and growing degree, the rescaled variable in the integral is $t\sqrt{pV}$. An integrable Gaussian majorant controls the remainder of this rescaled integral. The positive-kernel estimate below applies to general real spectra at finite resolution. [Lean proof of the finite integral bound](https://github.com/the-omega-institute/trureturing/blob/c1296ace4f5b66516a07af37f37a1dbcec0d50e1/D5/S3/Fourier/Concentration/LatticeConvolutionVariance.lean#L179)


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

Substitute $u=s_pt$ to obtain the integrand $q_p(u)=\max(0,1-u^2/(2p))^{2p}$. For $p>0$, $0\le q_p(u)\le e^{-u^2}$, and at each fixed $u$ the profile converges to $e^{-u^2}$. Dominated convergence gives $\int_{\mathbb R}|q_p(u)-e^{-u^2}|\,du\to0$, bounding the absolute error uniformly over all windows. The Gaussian window integral increases monotonically with the oriented radius and is strictly below $\sqrt\pi$ at every finite radius. Hence the full Gaussian limit also forces the rescaled radius to tend to positive infinity. [Window approximation](https://github.com/the-omega-institute/trureturing/blob/3959805f25927cfdc34434e20f04e29d0b7ce9b4/D5/S3/Fourier/Asymptotics/ClippedGaussianMinorant.lean#L120) [Characterization of the full Gaussian limit](https://github.com/the-omega-institute/trureturing/blob/3959805f25927cfdc34434e20f04e29d0b7ce9b4/D5/S3/Fourier/Asymptotics/ClippedGaussianMinorant.lean#L185)

Return to the convolution with fixed variance budget $V>0$ and lattice spacing $h>0$. Taking $A_p=\pi/h$ gives $R_p\to+\infty$. After multiplying the finite lower bound by $\sqrt{pV}$, its integral coefficient tends to $h/(2\sqrt\pi)$. Thus, for every $\varepsilon>0$, all sufficiently large $p$ and fixed $\eta\ge0$ satisfy

$$
\left(\frac{h}{2\sqrt\pi}-\varepsilon\right)W^{2p}
\le \sqrt{pV}\,E_p(\eta).
$$

This asymptotic lower bound retains the hypotheses of the finite Fourier integral. Other phase peaks can contribute to the actual collision mass, for instance when the given lattice spacing is smaller than the maximal spacing. Upper bounds for actual zeta ordinates still need control of these contributions and of the noncentral remainder. The approach follows the [retained contribution and controlled remainder method](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1dd9/src/Formalism/GL3MeanSquares/GenusMeanAsymptotics/JacobiCharacterSums/TailFinal.lean#L32-L55), with the whole-line absolute error as the remainder here.


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

The identity holds for arbitrary real weights. If $w_j\ge0$, then all $c_mc_n\ge0$ and $\phi_\eta(d)\le\mathbf 1_{|d|\le\eta}$, so the right side is bounded by $E_p(\eta)$. The triangular weight is zero on the closed band boundary $|d|=\eta$. [Positive-kernel collision comparison](https://github.com/the-omega-institute/trureturing/blob/650bb40f649ae4454afcf856c2f1c0b0ceb18f1d/D5/S3/Fourier/Concentration/FejerCollisionVariance.lean#L87)

Assume also $\sum_jw_j(g_j-a)^2\le VW$, where $a,V$ are real. By the pointwise variance bound and positivity of the kernel, for every $A\ge0$,

$$
W^{2p}\int_{-A}^{A}K_\eta(t)\max(0,1-Vt^2/2)^{2p}\,dt
\le E_p(\eta).
$$

This estimate applies to arbitrary finite real frequency families. [Finite-window bound](https://github.com/the-omega-institute/trureturing/blob/650bb40f649ae4454afcf856c2f1c0b0ceb18f1d/D5/S3/Fourier/Concentration/FejerCollisionVariance.lean#L115)

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

When $W>0$, this means $\liminf_{p\to\infty}E_p(\eta)\sqrt{pV}/(W^{2p}\eta)\ge1/(2\sqrt\pi)$. The coefficient exceeds the parabolic lower coefficient $3/(5\sqrt5)$ for arbitrary finite weighted data because the degree sums have convolution structure. A fixed finite tail of actual zeta ordinates is admissible as the input frequency family. The scale condition below gives a uniform lower bound when height, frequency family and resolution vary together. [Asymptotic lower bound](https://github.com/the-omega-institute/trureturing/blob/650bb40f649ae4454afcf856c2f1c0b0ceb18f1d/D5/S3/Fourier/Concentration/FejerCollisionVariance.lean#L156)


## Uniform small-resolution bound for varying spectra

Now allow the frequency family, weights and center to vary with degree $n$. Assume that the variance budget $V_n$ and resolution $\eta_n$ are eventually positive. Put

$$
s_n=\sqrt{nV_n},\qquad \rho_n=\frac{\eta_n}{s_n}.
$$

The condition $\rho_n\to0$ is equivalent to the existence of eventually positive half-widths $A_n$ with $A_ns_n\to+\infty$ and $\eta_nA_n\to0$. Indeed, choose $A_n=1/(s_n\sqrt{\rho_n})$ to obtain $1/\sqrt{\rho_n}$ and $\sqrt{\rho_n}$ for the two expressions. Conversely, $\rho_n=(\eta_nA_n)/(s_nA_n)$. [Compatibility of the two window scales](https://github.com/the-omega-institute/trureturing/blob/7c384a3aaea1f4743f2e515a64b5241f062640fa/D5/S3/Fourier/Asymptotics/MovingFejerCollision.lean#L26)

Under $\rho_n\to0$, for every $\varepsilon>0$ there is a degree threshold depending only on the sequences $V_n,\eta_n$ and on $\varepsilon$. For each $n$ beyond it, every finite family of real frequencies $g_j$, nonnegative weights $w_j$, and center $a$ with $\sum_jw_j(g_j-a)^2\le V_nW$ satisfies

$$
\left(\frac{1}{2\sqrt\pi}-\varepsilon\right)\eta_n W^{2n}
\le\sqrt{nV_n}\,E_n(\eta_n).
$$

On a compatible window, the normalized kernel is $\eta_n^{-1}K_{\eta_n}(t)=\operatorname{sinc}^2(\eta_nt/2)/(2\pi)$. Because $\eta_nA_n\to0$, it is eventually at least $1/(2\pi)-\varepsilon/(2\sqrt\pi)$ throughout the window. Because $A_ns_n\to\infty$, the rescaled unweighted integral tends to $\sqrt\pi$. The finite-window inequality then gives a threshold uniform over the data. [Uniform collision lower bound](https://github.com/the-omega-institute/trureturing/blob/7c384a3aaea1f4743f2e515a64b5241f062640fa/D5/S3/Fourier/Asymptotics/MovingFejerCollision.lean#L77)

For example, for a varying finite zeta tail take frequencies $g_\gamma=\gamma/r$ with fixed $r>0$ and $0<\gamma\le T_n$. Use center zero and budget $V_n=T_n^2/r^2$. If $\eta_n r/(T_n\sqrt n)\to0$, then eventually

$$
E_n(\eta_n)\ge
\left(\frac{1}{2\sqrt\pi}-\varepsilon\right)
\frac{r\eta_n}{T_n\sqrt n}\,W_n^{2n}.
$$

The underlying family may grow with $n$. Without control of the relative resolution and variance scales, the normalized collision ratio can tend to zero, as with a single unit-weight frequency, $V_n=1/n^2$ and fixed $\eta_n>0$. The upper-bound problem for high-order weighted collisions of actual zeta ordinates remains open.


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

For each pair with $d_{ij}\le r$, the right increment of the positive part equals $\delta$ and the left increment is at most $\delta$. For $d_{ij}>r$, the left increment vanishes and the right increment is nonnegative. Sum these inequalities with the nonnegative pair weights. [Finite secant bounds](https://github.com/the-omega-institute/trureturing/blob/77a1dc3fb4e2662f8d4ab41550a3ef195f11d9d1/D5/S3/Fourier/Concentration/FejerCollisionSecants.lean#L49)

For arbitrary real weights and any $\delta>0$ such that no pair distance lies strictly between $r$ and $r+\delta$, the right increment is exact. A positive interval with this property always exists. Let $\delta_0$ be the minimum of the finite set $\{1\}\cup\{d_{ij}-r:d_{ij}>r\}$, so $\delta_0>0$. For every $0<\delta\le\delta_0$,

$$
L(r+\delta)-L(r)=\delta E(r).
$$

No outer distance lies strictly between $r$ and $r+\delta$, and each pair has increment either $\delta$ or zero. This identity allows arbitrary signed weights and retains all closed-band contributions at distance exactly $r$. [Exact right increment](https://github.com/the-omega-institute/trureturing/blob/77a1dc3fb4e2662f8d4ab41550a3ef195f11d9d1/D5/S3/Fourier/Concentration/FejerCollisionSecants.lean#L77)

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

Differentiability first allows a fixed $\delta$ to be chosen so that both limiting secants are close to $f'(a)$. Pointwise convergence at the neighboring radii then transfers the bounds to the finite families. This avoids requiring a uniform positive lower bound on their smallest outer gap. [Hard-band limit theorem](https://github.com/the-omega-institute/trureturing/blob/ab4908fd1508426b6d03a7f44608f31388532dfe/D5/S3/Fourier/Concentration/FejerCollisionLimit.lean#L74)

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

The required hard-band asymptotic thus follows from asymptotics for the Fejér-weighted moments at neighboring multiplicative radii. The noncentral contribution and matching upper estimates for actual zeta tails remain open arithmetic problems.

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

Expand the degree-one Fourier pair sum and apply the global cosine estimate $0\le\cos x-1+x^2/2\le x^4/24$ to each frequency difference. This retains the exact quadratic term and bounds the quartic remainder. [Global fourth-moment bound](https://github.com/the-omega-institute/trureturing/blob/09e2f8bc08952ee2744f4c46296d9812fbdd2e5b/D5/S3/Fourier/Asymptotics/FinitePairGaussianLimit.lean#L100)

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

If $a_n$ is the mean under the normalized weights, then $M_{2,n}=2\sum_jw_{n,j}(g_{n,j}-a_n)^2$, so this scale uses the actual variance. Original nonnegative weights with positive total mass can be divided by their total to obtain the normalized score. [Central Gaussian limit](https://github.com/the-omega-institute/trureturing/blob/09e2f8bc08952ee2744f4c46296d9812fbdd2e5b/D5/S3/Fourier/Asymptotics/FinitePairGaussianLimit.lean#L169)

There is also an integrable bound on a window that can grow with degree. For $n>0$, $W=1$, nonnegative pair products, $M_2>0$, and $u^2M_4\le3nM_2^2$, the scaled quartic error is at most $u^2/2$. Hence

$$
Q(u/s)^n\le e^{-u^2/2},\qquad s=\sqrt{nM_2/2}.
$$

This envelope permits dominated convergence on central windows satisfying the fourth-moment condition. For actual zeta ordinates, the moment conditions and the weighted contribution of Fourier peaks outside that window still require estimates. [Central Gaussian envelope](https://github.com/the-omega-institute/trureturing/blob/09e2f8bc08952ee2744f4c46296d9812fbdd2e5b/D5/S3/Fourier/Asymptotics/FinitePairGaussianLimit.lean#L204)
