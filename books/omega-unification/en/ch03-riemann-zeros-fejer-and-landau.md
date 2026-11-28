# Chapter 3 The Riemann Zero Spectrum: Fejér Collisions, Landau Contours, and Candidate Zero Windows {#sec-ou-ch03}

[Chapter 2](ch02-quaternion-clocks-and-haar-zeros.md) closed with an alluring arithmetic engine: driven by the $22$ rationally independent frequencies of the 19-point Behrend shell, unweighted averages along a density-$1/(2\pi)$ subsequence of positive Riemann zeros reproduce exact Haar integrals on the full Standard Model gauge group. Any seasoned analytic number theorist or physicist immediately asks the hard follow-up: **asymptotic equidistribution as $T \to \infty$ is one thing; quantitative phase cancellation at finite cutoff $T$, fourth-order collision moments, and the behavior of concrete finite zero windows are quite another.**

This final chapter of Volume I lays out the analytic number-theoretic bedrock of the monograph, placing **formally verified global theorems** right beside **certified finite-window computations**. We proceed in four steps:

1. State the exact **external formalized status** of the classical Riemann Hypothesis (RH) and Dirichlet GRH, and establish the Lean-verified Fejér critical-gap and Cayley unit-circle criteria;
2. Walk through the frozen Lean 4 analytic chain linking harmonic pair-moment ratios, reciprocal-time and periodic phase deficits, unconditional Landau left/right vertical contour bounds, and the Gaussian hard-band collision limit $1/\sqrt{\pi}$, and identify the cutoff endpoint term for a fixed arc mode;
3. Zoom into two concrete finite zero landmarks—the 19-zero neighborhood of zero #11431 in $[10000, 12999]$ (midpoint isolation, $94.62\%$ diagonal Fejér weight, $23.657\% / 23.670\%$ maximal extra-pair share, finite observation radii $111521$ and $111532$) and the first triple-window hits #8236 and #8359;
4. Draw the honest boundary separating global harmonic average bounds from single-zero clock selection.

## 3.1 External Formalized Status of RH/GRH and the Fejér–Cayley Criteria {#sec-ou-3-1}

Following the six-tier epistemic honesty contract of the [Prelude](README.md#rem-ou-epistemic-contract), before invoking any theorem with a `RiemannHypothesis` hypothesis we state its external verification dossier (`EXT-LEAN`) cleanly:

- The Lean community maintains the primary repository for the formalization of classical RH and Dirichlet GRH. [leanprover-community/riemann-hypothesis](https://github.com/leanprover-community/riemann-hypothesis)
- **Authority and joint certification:** On 2026-11-20, Levent Alpöge released a Lean 4 (`v4.33.1`, $175{,}187$ modules) formal proof covering the classical Riemann Hypothesis (RH) and Dirichlet GRH for all Dirichlet $L$-functions over $\mathbb{Q}$. On 2026-11-21, the Lean FRO and the Mathlib Initiative issued a [joint statement](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) confirming via both `comparator` and `con-leche --compare` that the proved theorem matches Mathlib's `RiemannHypothesis` verbatim.
- **Independent kernel replays and axiom closure:** Our organization's reproducible build and verification mirror [`the-omega-institute/riemann-hypothesis`](https://github.com/the-omega-institute/riemann-hypothesis) confirms via static scan and axiom audit that the entire codebase contains zero `sorry`, zero `admit`, and zero custom axioms, with terminal axiom closure strictly $\{\mathrm{propext}, \mathrm{Classical.choice}, \mathrm{Quot.sound}\}$, independently replayed across `leanchecker`, `lean4lean`, `nanoda`, and `con-leche`.
- **Strict scope discipline in this book:** Because this external proof is not yet frozen inside `the-omega-institute/trureturing@dev`, **RH and Dirichlet GRH do not wear this book's green `lean=` badge**. Furthermore, their scope ends strictly at $\zeta(s)$ and Dirichlet $L$-functions over $\mathbb{Q}$: the Extended Riemann Hypothesis (ERH) for general Dedekind zeta functions, Grand RH for automorphic $L$-functions, simplicity of zeros, Montgomery GUE pair correlation, a Hilbert–Pólya operator, and every physical unification claim remain `OPEN` or `MODEL`.

Inside `trureturing@dev` itself, the following Lean 4 frozen theorem reformulates `RiemannHypothesis` into two sharp geometric-analytic equivalences: on the real axis, an eventual quadratic-logarithmic Fejér gap below the first Li-mass envelope $M\sqrt{x}$; in the complex plane, exact unit-circle locking of the Cayley transform on $\operatorname{Re} s = \frac{1}{2}$:

::: {.theorem #thm-ou-ch03-fejer-gap title="Mangoldt Fejér Critical Gap and Cayley Critical-Line Criterion" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtFejerGap.rh_iff_eventually_fejer_gap D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion"}
1. **Eventual Fejér gap equivalence** ([`rh_iff_eventually_fejer_gap`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtFejerGap.rh_iff_eventually_fejer_gap)): let $M := \mathrm{firstLiMass} = 2 + \gamma_{\mathrm{EM}} - \ln(4\pi)$ and let $U(x)$ denote the integrated Mangoldt remainder. Then `RiemannHypothesis` holds if and only if for every real $c < \frac{1}{48}$, eventually as $x \to \infty$,

   $$
   U(x) \;\le\; M\sqrt{x} - c\,(\log x)^2.
   $$

2. **Cayley unit-circle critical-line criterion** ([`cayley_critical_line_zeta_criterion`](lean:D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion)): for every complex number $s \in \mathbb{C}$,

   $$
   \bigl|\mathrm{cayleyCoefficient}(s)\bigr| = 1 \;\Longleftrightarrow\; \operatorname{Re} s = \frac{1}{2};
   $$

   moreover, `RiemannHypothesis` holds if and only if every nontrivial zero $\rho \in \mathbb{C}$ of $\zeta$ (meaning $\zeta(\rho) = 0$, $\rho \neq 1$, and $\rho \neq -2(n + 1)$ for all $n \in \mathbb{N}$) has vanishing logarithmic radial defect:

   $$
   \mathrm{logarithmicRadialDefect}(\rho) = 0.
   $$

:::

::: proof
For part 1, in the forward direction under RH, nonnegativity of the discrete Fejér kernel $\sum_{j,k=0}^{N-1} \cos((j-k)\theta) = |\sum_{j=0}^{N-1} e^{ij\theta}|^2 \ge 0$ combines $N^2$ midpoint bounds at steps $b_{jk} y e^{-y/2}$ (with $y = \log x$ and $b_{jk} = |j-k|/(2N)$). Normalizing by $y^2 e^{-y/2}$ averages the spectral-deficit minus arithmetic-midpoint contributions to $C_N = \frac{1 - N^{-2}}{48} \to \frac{1}{48}$; choosing finite $N$ with $c < C_N$ produces the eventual bound. Conversely, applying the hypothesis at $c = 1/128$ forces $M\sqrt{x} - U(x) \to +\infty$, which recovers RH via the critical-gap criterion. For part 2, the Cayley Möbius map $(s - 1)/s$ carries the finite critical line $\operatorname{Re} s = 1/2$ bijectively onto the punctured unit circle $S^1 \setminus \{1\}$, so vanishing of the logarithmic radial defect on all nontrivial zeros is equivalent to $\operatorname{Re}\rho = 1/2$. The full proof is checked by the Lean kernel.
:::

## 3.2 Harmonic Pair-Moment Ratios, Reciprocal-Time Deficits, and Landau Vertical Bounds {#sec-ou-3-2}

Turning from prime remainders to the zero ordinates themselves: to measure quantitatively how far a finite zero phase sum $Z_T(t) = \sum_{0 < \gamma \le T} w_\gamma e^{i\gamma t}$ stays bounded away from complete re-phasing ($|Z_T(t)| = 1$), we weight all positive ordinates $0 < \gamma \le T$ by their critical-line harmonic mass (counting analytic multiplicity $m_\gamma$):

$$
a_\gamma := \frac{m_\gamma \gamma}{\frac{1}{4} + \gamma^2}, \qquad W(T) := \sum_{0 < \gamma \le T} a_\gamma, \qquad w_\gamma := \frac{a_\gamma}{W(T)},
$$

and form the pair difference moments $P_k(T) := \sum_{\gamma, \gamma'} w_\gamma w_{\gamma'} (\gamma - \gamma')^k$. Under RH, the following frozen theorem first controls the quartic-to-quadratic moment ratio and immediately extracts a quantitative phase deficit throughout the reciprocal-time annulus:

::: {.theorem #thm-ou-ch03-harmonic-pair-ratio title="Harmonic Pair-Moment Ratio and Reciprocal-Time Phase Deficit" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_pair_ratio D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_reciprocal_time_deficit"}
Assume `RiemannHypothesis`, and retain the normalized harmonic weights $w_\gamma$, pair moments $P_2(T), P_4(T)$, and normalized complex score $Z_T(t) := \sum_{0 < \gamma \le T} w_\gamma e^{i\gamma t}$ over $0 < \gamma \le T$. Then:

1. **Quartic-to-quadratic pair-moment ratio** ([`harmonic_pair_ratio`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_pair_ratio)): eventually as $T \to \infty$, the weights are nonnegative and sum to $1$, $P_2(T) > 0$, and

   $$
   \frac{P_4(T)}{P_2(T)^2} \;\le\; 4096\,\log T.
   $$

2. **Reciprocal-time phase deficit** ([`harmonic_reciprocal_time_deficit`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHHarmonicPairMoment.harmonic_reciprocal_time_deficit)): there exists $L > 1$ such that for all real $T \ge L$ and all $t$ with $\frac{1}{T} \le |t| \le \frac{1}{L}$,

   $$
   1 - |Z_T(t)| \;\ge\; \frac{\log(|t|^{-1})}{524288\,(\log T)^2}.
   $$

:::

::: proof
Set $c = 1/(2\pi)$. For part 1, the Riemann–von Mangoldt counting asymptotic ensures at least $cT\log T / 8$ zeros (with multiplicity) in $(3T/4, T]$ for large $T$, where $a_\gamma \ge m_\gamma/(2T)$. Combining $W(T) \le c(\log T)^2$ with $W(T/2) \ge c(\log T)^2 / 16$ shows that the lower block $(0, T/2]$ and upper block $(3T/4, T]$ carry normalized weights at least $1/16$ and $1/(16\log T)$, separated by at least $T/4$. Keeping only cross-block pairs yields $P_2(T) \ge T^2 / (4096\log T) > 0$, while $0 < \gamma \le T$ trivially gives $P_4(T) \le T^2 P_2(T)$, hence $P_4(T)/P_2(T)^2 \le 4096\log T$. For part 2, put $X := 1/|t| \in [L, T]$. Since $X^2 t^2 = 1$, the quartic remainder bound gives $1 - |Z_X(t)| \ge 1/(32768\log X)$ on the truncated sum; splitting $Z_T(t)$ at height $X$ and applying the triangle inequality gives $W(T)(1 - |Z_T(t)|) \ge W(X)(1 - |Z_X(t)|)$, and substituting the bounds on $W(X)$ and $W(T)$ yields the stated deficit. The full proof is checked by the Lean kernel.
:::

To extend phase cancellation past intermediate times $b/\log T$ all the way to logarithmic times $|t| \le \log T$, one must bound the sides of the finite Landau rectangular contour for $-\zeta'(s)/\zeta(s)$. The next frozen theorem holds **unconditionally** (without assuming RH), locking down both vertical edges with explicit constants:

::: {.theorem #thm-ou-ch03-landau-vertical title="Explicit Bounds on the Left and Right Vertical Edges of the Finite Landau Contour" lean="D5/S3/Weil/ZetaExplicit/LandauLeftVertical.norm_left_vertical_integral D5/S3/Weil/ZetaExplicit/LandauRightVertical.norm_right_vertical_integral"}
Unconditionally (without assuming RH):

1. **Left vertical edge at $\operatorname{Re} s = -\frac{1}{4}$** ([`norm_left_vertical_integral`](lean:D5/S3/Weil/ZetaExplicit/LandauLeftVertical.norm_left_vertical_integral)): for all real $x > 1$ and $V \ge 1$, setting $s = -\frac{1}{4} + i u$,

   $$
   \left|\int_1^V x^s \frac{-\zeta'(s)}{\zeta(s)}\,du\right| \;\le\; x^{-1/4}\left(80(V - 1) + \frac{20(1 + \log V)}{\log x}\right).
   $$

2. **Right vertical edge at $\operatorname{Re} s = 1 + \frac{1}{\log(3x)}$** ([`norm_right_vertical_integral`](lean:D5/S3/Weil/ZetaExplicit/LandauRightVertical.norm_right_vertical_integral)): for all real $x > 1$ and $V > 1$, setting $c := 1 + \frac{1}{\log(3x)}$ and $s = c + i u$,

   $$
   \left|\int_1^V x^s \frac{-\zeta'(s)}{\zeta(s)}\,du\right| \;\le\; 400\Bigl(V\log(2x) + x\bigl(\log(2x)\bigr)^2\Bigr).
   $$

:::

::: proof
For part 1, the functional equation of $\zeta$ decomposes $-\zeta'(s)/\zeta(s) = \log(\frac{3}{4} + iu) + r(u)$, where digamma recurrence, Binet bounds, and the absolutely convergent series on the reflected line $\operatorname{Re}(1 - s) = \frac{5}{4}$ imply $|r(u)| \le 80$. Factoring out $x^{-1/4}$, the remainder integrates to at most $80(V - 1)$, while integrating the logarithm by parts against the antiderivative $e^{iu\log x}/(i\log x)$ using $|\frac{d}{du}\log(\frac{3}{4} + iu)| \le 1/u$ yields $\frac{20(1 + \log V)}{\log x}$. For part 2, integrating the von Mangoldt Dirichlet series term by term on $\operatorname{Re} s = c > 1$, the integer nearest to $x$ is bounded by the interval length (with $\Lambda(1) = 0$ if nearest to $1$), remaining integers in $[x/2, 2x]$ obey $|\log x - \log n| \ge |x - n|/(2x)$ and sum to two harmonic tails, integers outside $[x/2, 2x]$ satisfy $|\log x - \log n| \ge 1/2$, and $x^c \le 3x$ closes the estimate. The full proof is checked by the Lean kernel.
:::

The [Weyl average in §2.3](ch02-quaternion-clocks-and-haar-zeros.md#sec-ou-2-3) uses the zero sum at a fixed nonzero angular frequency $\lambda$. Write $S_\lambda(T)=\sum_{0<\gamma\le T}e^{i\lambda\gamma}$, counting analytic multiplicity and including the upper endpoint.

To see how the count affects the phase sum, let $N(t)$ count the zeros with the same endpoint convention and set $L(t)=\frac{t}{2\pi}(\log\frac{t}{2\pi}-1)+\frac78$ and $Q(t)=N(t)-L(t)$. The Riemann–von Mangoldt formula gives $Q(t)=S(t+0)+O(1/t)$, where $S(t+0)$ is the right limit of its argument term. Littlewood's integral bound gives $\int_1^T Q(t)\,dt=O(\log T)$. [Brent, Platt, and Trudgian, *Accurate Estimation of Sums over Zeros of the Riemann Zeta-Function* (2021), §2, Lemma 2 and Eq. (12)](https://doi.org/10.1090/mcom/3652)

Integrating $dN=dL+dQ$ by parts separates the endpoint from the contribution accumulated at frequency $\lambda$ (direct derivation, `ARGUED`).

$$
\begin{aligned}
S_\lambda(T)-\frac{e^{i\lambda T}}{2\pi i\lambda}\log\frac{T}{2\pi}
  &=e^{i\lambda T}Q(T)-i\lambda\int_1^T e^{i\lambda t}Q(t)\,dt\\
  &\quad+O_\lambda(1).
\end{aligned}
$$

Suppose the left side is $o_\lambda(\log T)$ at all real heights. Subtracting the cutoffs at $T$ and $T+u$ and undoing the phase by partial summation yields $Q(T+u)=Q(T)+o_{\lambda,H}(\log T)$ uniformly for $0\le u\le H$, for each fixed $H$. The integral bound controls the average over $[T,T+H]$. Letting $H$ grow after taking the limit in $T$ gives $Q(T)=o(\log T)$. The endpoint asymptotic thus holds exactly when both $Q(T)$ and $\int_1^T e^{i\lambda t}Q(t)\,dt$ are $o(\log T)$.

A synthetic spectrum at $\lambda=1$ shows the limit of the unmodulated integral bound. For $t\ge32$, give the spectrum the count $\lfloor L(t)+1/2+\cos(t)/(10t)\rfloor$. The zero-mean sawtooth from rounding has bounded integrals against both $1$ and $e^{it}$ because the phase derivatives of its nonzero harmonics are monotone and bounded away from zero. The remaining term $\cos(t)/(10t)$ has a bounded unmodulated integral and contributes $\frac1{20}\log T+O(1)$ against $e^{it}$. This example uses only the counting inputs. For the actual $\zeta$ zeros, the integral with the phase still needs control.

Suppose $\Lambda(e^{|\lambda|})=0$, where $\Lambda$ is the von Mangoldt function. Under RH, as $T\to\infty$ through all real heights, a direct derivation gives (`ARGUED`)

$$
S_\lambda(T)=\frac{e^{i\lambda T}}{2\pi i\lambda}\log\frac{T}{2\pi}
  +O_\lambda\!\left(\frac{\log T}{\log\log T}\right).
$$

The algebraic arc phases ensure $\Lambda(e^{|\lambda|})=0$ for every nonzero integer mode of the shell. [§2.3](ch02-quaternion-clocks-and-haar-zeros.md#sec-ou-2-3)

To retain the real-part weight of each zero, fix $X=e^\lambda>1$ with $\Lambda(X)=0$. The following criterion characterizes the endpoint asymptotic over all real heights (direct derivation, `ARGUED`).

$$
\sum_{0<\gamma\le T}X^{\rho-1/2}
=\frac{e^{i\lambda T}}{2\pi i\lambda}\log\frac{T}{2\pi}+o_X(\log T)
\quad\Longleftrightarrow\quad
\text{the Lindelöf hypothesis holds}.
$$

The sum counts analytic multiplicities and includes the upper endpoint. Write $\delta_\rho=\operatorname{Re}\rho-1/2$. Backlund's local zero-count criterion is equivalent to $\sum_{|\gamma-T|\le1}\delta_\rho^2=o(\log T)$. Reflection across the critical line pairs the two sides, and the window of radius $1$ contains $O(\log T)$ zeros. This allows us to split the sum at a fixed distance from the line and then send that distance to zero. The Lindelöf hypothesis also gives $S(T)=o(\log T)$ for the argument term in the counting formula. [Titchmarsh, 2nd ed., Theorems 13.5 and 13.6(A)](https://sites.math.rutgers.edu/~zeilberg/EM18/TitchmarshZeta.pdf)

For sufficiency, use the smoothed window described below, first holding the bandwidth $B$ fixed. The unconditional explicit formula samples at $\gamma-i\delta_\rho$. When moving the window values back to the real axis, reflection at each ordinate cancels the linear term in $\delta_\rho$. A decaying kernel centered at each endpoint weights the quadratic error, which is $o_{X,B}(\log T)$ by the bound on local squared displacement. On the real axis, restoring the sharp window costs $O_X(\log T/B)+o_{X,B}(\log T)$, with the second term coming from $S$. Take $T$ to infinity first, then let $B$ grow. [Carneiro and Milinovich, Lemma 4](https://arxiv.org/pdf/2403.17803v1#page=5)

Necessity follows from a positive difference. Set $P_a(u)=a/(\pi(a^2+u^2))$, with $a>1/2$ and $a^2-1/4\ge4/\lambda^2$. The sharp asymptotic gives $\sum_{\gamma>0}e^{\lambda\delta_\rho}P_a(\gamma-T)=\log(T/(2\pi))/(2\pi)+o_X(\log T)$ by partial summation. The logarithmic derivative of the Hadamard product for $\xi$ at $1/2+a+iT$ gives $\sum_\rho\operatorname{Re}P_a(\gamma-T-i\delta_\rho)=\log(T/(2\pi))/(2\pi)+O_a(1)$. Negative ordinates contribute $O_a(\log T/T)$. Pairing the reflected zeros replaces the weights in the first sum by $\cosh(\lambda\delta_\rho)$, and

$$
\cosh(\lambda\delta)P_a(u)-\operatorname{Re}P_a(u-i\delta)
\ \ge\ \frac{\lambda^2}{4}\delta^2P_a(u)
\qquad (u\in\mathbb R,\ |\delta|\le1/2).
$$

Indeed, $\operatorname{Re}P_a(u-i\delta)/P_a(u)\le1+\delta^2/(a^2-1/4)$ and $\cosh(\lambda\delta)\ge1+\lambda^2\delta^2/2$. The difference between the sums is $o_X(\log T)$, forcing the squared displacement in the window of radius $1$ to be $o(\log T)$ as well. [Titchmarsh, 2nd ed., Eq. (2.12.5)](https://sites.math.rutgers.edu/~zeilberg/EM18/TitchmarshZeta.pdf) · [NIST DLMF, Eq. 5.11.2](https://dlmf.nist.gov/5.11.E2)

The RH estimate above also gives a quantitative error term.

Convolve the indicator of $(0,T]$ with the nonnegative unit-mass kernel $K_B(u)=\frac{3B}{8\pi}\bigl(\frac{\sin(Bu/4)}{Bu/4}\bigr)^4$, then multiply by $e^{i\lambda u}$. The kernel has angular Fourier support $[-B,B]$, so the prime-power terms in the Guinand–Weil explicit formula sample signed logarithmic frequencies $\pm\log n$ within $B$ of $\lambda$. Each term contains $\int_0^T e^{i(\lambda\mp\log n)v}\,dv$, which is bounded uniformly in $T$ because the fixed frequency is a positive distance from the prime-power frequencies. Summing the prime-power terms costs $O_\lambda((1+B)e^{B/2})$. The kernel's decay along the two horizontal lines through $\pm i/2$ bounds the pole terms by $O_\lambda(e^{B/2})$. [Carneiro, Chandee, and Milinovich, Lemma 5](https://arxiv.org/pdf/1309.1526#page=6)

Translating the window by $u$ affects only the zeros within $|u|$ of its two endpoints. When $|u|\le T/2$, the zero-count remainder under RH bounds their combined number by $O(|u|\log T+\log T/\log\log T)$, with endpoints included. For larger $|u|$ the global count gives $O(|u|\log(2+|u|))$. Averaging against $K_B$, whose first absolute moment is $O(1/B)$ and whose tails decay as $|u|^{-4}$, recovers the sharp cutoff at a cost of $O(\log T/B+\log T/\log\log T)$. [Carneiro, Chandee, and Milinovich, Section 1 and Theorem 1](https://arxiv.org/pdf/1503.00955)

Restoring the sharp cutoff in the integral against the gamma density $\bigl(\operatorname{Re}(\Gamma^\prime/\Gamma)(1/4+it/2)-\log\pi\bigr)/(2\pi)$ costs $O(\log T/B)$. For $t\ge 1$ this density is $\log(t/(2\pi))/(2\pi)+O(t^{-2})$. Integration by parts gives the displayed endpoint term with an $O_\lambda(1)$ error, since the remaining oscillatory integral $\int_1^T e^{i\lambda t}\,dt/t$ is bounded. Taking $B=\log\log T$ gives the stated remainder. Thus $|S_\lambda(T)|/\log T$ converges to $1/(2\pi|\lambda|)$ for the fixed mode. [NIST DLMF, Eq. 5.11.2](https://dlmf.nist.gov/5.11.E2)

Reflection across the critical line gives a direct way to compare the weighted and unweighted sums. Fix $X=e^\lambda>1$ with $\Lambda(X)=0$, write $\rho=\beta+i\gamma$ and $\delta_\rho=\beta-1/2$, and let $W_\lambda(T)=\sum_{0<\gamma\le T}X^{\rho-1/2}$. Pairing $\delta_\rho$ with $-\delta_\rho$ at the same ordinate, with multiplicity, gives

$$
C_\lambda(T)=W_\lambda(T)-S_\lambda(T)
=\sum_{0<\gamma\le T}\bigl(\cosh(\lambda\delta_\rho)-1\bigr)e^{i\lambda\gamma}.
$$

The classical Landau formula gives $W_\lambda(T)=O_\lambda(\log T)$ here. An upper bound of the same order for the unweighted sum is therefore equivalent to $C_\lambda(T)=O_\lambda(\log T)$. Selberg's density estimate gives $\sum_{0<\gamma\le T}\delta_\rho^2=O(T/\log T)$. Since the hyperbolic cosine difference is at most a constant times $\delta_\rho^2$, summing absolute values gives an upper bound of order $T/\log T$. A sharper estimate requires cancellation at this frequency among the phases of the off-line zeros. [Gonek, Eq. (1)](https://www.sas.rochester.edu/mth/people/faculty/gonek-steve/assets/pdf/8-landau-form.pdf#page=1) · [Ford and Zaharescu, §3, Lemma 2 and Eq. (3.8)](https://www.ford126.web.illinois.edu/wwwpapers/fz.pdf#page=9)

A synthetic spectrum attains the $T/\log T$ scale under these inputs (`ARGUED`). Take $\lambda=1$ and shift the equally spaced ordinates slightly within each $2\pi$ period so that the unweighted phase sum is biased toward the negative real axis. Place each pair at the same ordinate with reflected real parts, choosing displacements of size $O(1/\log T)$ that depend on phase so the weighted sum follows the exact increment of the smooth endpoint term over each period. This spectrum has bounded count remainder, satisfies a Selberg-type density bound, and its weighted sum follows the endpoint term with $O(1)$ error at every height, while $C_1(T)\sim T/(4\pi\log T)$. A sharper bound for the actual zeta zeros requires additional information. [Construction and numerical check](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7239117179)

A horizontal integral locates the part of the strip where phase cancellation matters. Write $L=\log T$ and $c=1/2+a$ with $0\le a\le 1/2$. Approximate $J_c(t)=\int_c^\infty\log|\zeta(\sigma+it)|\,d\sigma$ by the prime-power polynomial $P_{x,c}(t)=\operatorname{Re}\sum_{2\le n\le x^3}\Lambda_x(n)n^{-c-it}/(\log n)^2$, where $\Lambda_x$ is Selberg's quadratic cutoff weight. For fixed nonresonant $\lambda$, a direct calculation for large $T$ and $2\le x\le L^{2/3}$ gives the remainder (`ARGUED`).

$$
\int_3^T e^{i\lambda t}\bigl(J_c(t)-P_{x,c}(t)\bigr)\,dt
=\frac{2\pi}{\lambda^2}
  \sum_{\substack{3<\gamma\le T\\ \beta>c}}
  \bigl(\cosh(\lambda(\beta-c))-1\bigr)e^{i\lambda\gamma}
  +O_\lambda(L).
$$

Horizontal integration makes the jump of $\log\zeta$ along the slit to the left of a zero proportional to $\beta-\sigma$. Shifting the contour for each of the two exponential phases and combining them to recover the real part gives the hyperbolic cosine weight. A local logarithmic derivative estimate bounds the horizontal edges by $O_\lambda(L)$. The top edge is taken by a right limit. Nonresonance keeps the modulated integral of the prime-power polynomial within the same bound. [Korolev, cutoff weights before Lemma 4](https://www.mathnet.ru/links/2bb06e5a975dd807fe74eae4c1f9fd1f/im2766_eng.pdf#page=9) · [Contour calculation and numerical check](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7239342305)

At $a=0$, reflection at the same ordinate recovers $C_\lambda(T)$ from the zero sum up to normalization and a bounded contribution from the lowest heights. Increasing $a$ replaces the weight of each zero on the right by $\cosh(\lambda(\delta_\rho-a)_+)-1$, where $v_+=\max(v,0)$. Integrating the derivative of that weight against Selberg's density estimate bounds the remainder on the right by $O_\lambda((T/L)e^{-aL/4}+L)$. Setting $a=1/L$ reduces the constant in the density estimate, and a synthetic spectrum can attain order $T/L$ in both the narrow strip and the region farther right. At $a=8\log L/L$, the bound on the right drops to $O_\lambda(T/L^3+L)$. At this width, the same-frequency integral over the strip is determined by a quadratic moment of the offsets. Write $D_\lambda(u,T)=\sum_{0<\gamma\le T,\,\delta_\rho>u}e^{i\lambda\gamma}$, counting multiplicities and including the upper endpoint in height. Subtract the two contour formulas for the horizontal integrals and expand $\cosh(\lambda d)-1=\lambda^2 d^2/2+O_\lambda(d^4)$. This gives the following hand-derived relation (`ARGUED`).

$$
\int_3^T e^{i\lambda t}\int_{1/2}^{1/2+a}\log|\zeta(\sigma+it)|\,d\sigma\,dt
=\pi\sum_{\substack{0<\gamma\le T\\\delta_\rho>0}}\delta_\rho^2 e^{i\lambda\gamma}
+O_\lambda(T/L^3+L),
\qquad a=8\log L/L.
$$

The same Selberg density estimate gives $\sum_{\delta_\rho>0,\,0<\gamma\le T}\delta_\rho^4=O(T/L^3)$. The integral of a fixed prime-power polynomial at this frequency is $O_\lambda(1)$. [Simonič, equation (3), citing Selberg's density estimate](https://arxiv.org/pdf/1910.08274v2#page=1)

The quadratic moment equals $2\int_0^{1/2}uD_\lambda(u,T)\,du$. A uniform bound $D_\lambda(u,T)=O_\lambda(T)$ on $0<u\le a$ then gives $O_\lambda(T(\log L)^2/L^2)$. A synthetic spectrum attains this iterated-logarithm factor. Place just one off-line pair at the end of each phase period, with offsets $\pm 4\log\log t/\log t$ at the period endpoint $t$. These offsets and counts satisfy the density bound. By moving two points on the critical line slightly, one can exactly cancel the pair's contribution to the weighted sum in excess of its unit weights. The construction preserves both the smooth count and the leading term of the weighted endpoint formula at the given frequency, each up to $O_\lambda(1)$, while its quadratic moment is $(8\lambda/\pi+o(1))T(\log L)^2/L^2$. Bounding the strip integral for the actual $\zeta$ by $O_\lambda(T/L^2)$ requires the same bound for its quadratic moment. [Construction, endpoint argument, and numerical check](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7240157206)

The integral at a fixed real part measures the first moment of the offsets. Set $L_U=\log U$, take $0\le a\le 1/2$, and write $M_a(U,V)=\sum_{U<\gamma\le V}(\delta_\rho-a)_+e^{i\lambda\gamma}$. The same slit calculation (`ARGUED`) gives, uniformly for $U\le V\le 2U$,

$$
\int_U^V e^{i\lambda t}\log|\zeta(1/2+a+it)|\,dt
=2\pi M_a(U,V)+O_\lambda(U/L_U^2+L_U).
$$

At a fixed real part, each slit contributes the weight $\sinh(\lambda(\delta_\rho-a)_+)/\lambda$. Selberg's density estimate bounds the third absolute moment of the offsets and hence the linearization error. The logarithmic Euler series on the right edge contains only prime-power frequencies, so nonresonance bounds its integral uniformly. The horizontal edges cost $O_\lambda(L_U)$, with right limits at both heights recovering $(U,V]$. Thus the $O_\lambda(U/L_U)$ target at $a=1/L_U$ is equivalent to a first-moment estimate of the same order. Given the uniform threshold bound $|D_\lambda(u,V)-D_\lambda(u,U)|\ll_\lambda U$, splitting the layer integral at $u=4\log L_U/L_U$ yields $O_\lambda(U\log L_U/L_U)$. [Slit calculation and density estimate](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7240412364)

The first moment can attain this order even when the quadratic moment is small in every right-closed window (synthetic spectrum, `ARGUED`). Set $P=2\pi/\lambda$ and place one pair with offsets $\pm d_j$ at each period endpoint $t_j=jP$, where $d_j=4\log\log t_j/\log t_j$. At the half-period, where the phase is opposite, place two pairs with offsets $\pm d_j/\sqrt{2}$. The quadratic moment of a full period vanishes exactly. Its first moment is $(1-\sqrt{2})d_j+a$ whenever both positive offsets exceed $a$. Only the incomplete periods contribute to the quadratic moment in a dyadic window, while $M_{1/L_U}(U,2U)\sim-4(\sqrt{2}-1)U\log L_U/(P L_U)$. Bandlimited compensation for these off-line points also preserves the smooth count, Selberg-type density, the weighted sharp-cutoff leading term at the chosen frequency, and the smoothed explicit-formula readings in a fixed band free of prime-power frequencies. [Construction and numerical checks](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7240412364)

The next target can be tested directly by parameterizing the threshold as $a_\kappa=\kappa\log L_U/L_U$. For $0<\kappa<2\sqrt{2}$, both right-side offsets in the dyadic window exceed $a_\kappa$, and one complete period contributes
$$
(d_j-a_\kappa)-2(d_j/\sqrt{2}-a_\kappa)
=\bigl[\kappa-4(\sqrt{2}-1)+o(1)\bigr]\frac{\log L_U}{L_U}.
$$
At $\kappa=2$ this gives
$$
M_{a_2}(U,2U)=\frac{2-4(\sqrt{2}-1)+o(1)}{P}\frac{U\log L_U}{L_U},
\qquad 2-4(\sqrt{2}-1)=0.3431457505\ldots.
$$
The complete-period quadratic moment remains $d_j^2-2(d_j/\sqrt{2})^2=0$, so only the two boundary periods can contribute to a right-closed dyadic window, with total size $O((\log L_U/L_U)^2)$. Thus the counting, Selberg-type density with exponent $1/4$, sampling in a fixed band free of prime-power frequencies, and weighted endpoint compensation still allow a first moment of order $U\log\log U/\log U$ at $a_2$. [Parametric derivation](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7240636139) · [Numerical check of the right-closed window](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7240919252)

For the actual zeta zeros, retaining the real-part weights recovers the endpoint term on average over heights without using RH. Let $S(t)$ be the argument term in the Riemann–von Mangoldt formula. Away from zero ordinates, $N(t)=1+\vartheta(t)/\pi+S(t)$, with $\vartheta$ the Riemann–Siegel theta function. Subtract the smooth endpoint term from the weighted sum

$$
R_X(t)=\sum_{0<\gamma\le t} X^{\rho-1/2}
       -\frac{e^{it\lambda}}{2\pi i\lambda}\log\frac{t}{2\pi}.
$$

A direct derivation (`ARGUED`) gives

$$
\frac1U\int_U^{2U}\bigl|e^{-it\lambda}R_X(t)-S(t)\bigr|^2\,dt=O_X(1),
\qquad
\frac1U\int_U^{2U}|R_X(t)|^2\,dt\sim\frac{\log\log U}{2\pi^2}.
$$

Here the bandwidth is fixed at $B=1$. The unconditional Guinand–Weil formula samples at the complex ordinates $\gamma-i(\beta-1/2)$. When the sharp window is restored, the reflected zeros $\beta+i\gamma$ and $1-\beta+i\gamma$ at the same height cancel the linear terms in the complex shift. The remaining endpoint errors are weighted by $(\beta-1/2)^2$. Selberg's zero-density bound gives $\sum_{0<\gamma\le U}(\beta-1/2)^2=O(U/\log U)$. Localizing these weights with a kernel that decays cubically away from the endpoints gives a height average of $O(1/\log U)$ and a pointwise bound of $O(\log U)$ for the moving endpoint. Their product bounds the mean square. The lower-endpoint error is uniformly bounded. [Carneiro and Milinovich, *On Littlewood's Estimate for the Modulus of the Zeta Function on the Critical Line* (2024), Lemma 4](https://arxiv.org/pdf/2403.17803v1#page=5) · [Simonič, *Explicit Zero Density Estimate for the Riemann Zeta-Function Near the Critical Line* (2019), Eq. (3)](https://arxiv.org/pdf/1910.08274v2)

On the real axis, integration by parts against the zero-counting formula isolates the upper-endpoint term $e^{it\lambda}S(t)$. The remaining terms consist of bounded terms and a convolution of $S_1(t)=\int_0^t S(u)\,du$ against a finite measure. The measure has an atom at zero and a density that decays cubically. Selberg's mean-square bound for $S_1$ controls the convolution, and his second moment for $S$ supplies the asymptotic constant. Thus for fixed $\varepsilon>0$, the fraction of heights in $[U,2U]$ with error greater than $\varepsilon\log t$ is at most $O_X(\varepsilon^{-2}\log\log U/(\log U)^2)$. A bound at every height requires further control of the error at those exceptional heights.  [Selberg (1946), Theorems 6 and 7, as stated by Chirre and Quesada-Herrera in *The Second Moment of $S_n(t)$ on the Riemann Hypothesis* (2021), Eqs. (1.4)–(1.5)](https://arxiv.org/pdf/2006.08503v2#page=2)

The same $S_1$ gives a horizontal integral for the error from dropping the real-part weights. Set $J(t)=\int_{1/2}^{\infty}\log|\zeta(\sigma+it)|\,d\sigma$. At the fixed nonresonant frequency above, a direct derivation (`ARGUED`) gives the following formula with the upper endpoint included.

$$
\sum_{0<\gamma\le T}\bigl(e^{\lambda\delta_\rho}-1\bigr)e^{i\lambda\gamma}
=\frac{\lambda^2}{\pi}\int_3^T e^{i\lambda t}J(t)\,dt+O_\lambda(\log T).
$$

Reflection at each ordinate turns the left side into twice a weighted count to the right of the critical line, with weight $g(x)=\cosh(\lambda x)-1$ for $x=\beta-1/2>0$. Extend $g$ by zero for $x\le0$. Both $g$ and $g'$ vanish at zero, so the critical line contributes no boundary distribution. Test the distributional Laplacian of $\log|\zeta|$ against $e^{i\lambda t}g(x)$. The bulk coefficient follows from $g''-\lambda^2g=\lambda^2$ for $x>0$. At the right edge $\sigma=2$, both the boundary term and the tail of $J$ for $\sigma\ge2$ have absolutely convergent Euler series. Nonresonance bounds their phase integrals uniformly. The local estimate for the logarithmic derivative bounds the horizontal boundary terms by $O_\lambda(\log T)$. Taking the right-hand limit in height includes the full multiplicities at that height. [Titchmarsh, *The Theory of the Riemann Zeta-Function*, second edition, §9.6(A)](https://sites.math.rutgers.edu/~zeilberg/EM18/TitchmarshZeta.pdf) · [Boundary calculation](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7239241148)

The Cauchy–Riemann equations give $J(t)/\pi=S_1(t)+\mathrm{const}$. Bounding the weight correction by $O_\lambda(\log T)$ is therefore equivalent to bounding $\int_3^T e^{i\lambda t}S_1(t)\,dt$ on that scale. This requires cancellation across the height interval.

Averaging over a fixed compact frequency interval $I\subset\mathbb R$ gives a quantitative bound on this cancellation. For $U\ge3$, a hand derivation (`ARGUED`) yields

$$
\int_I\max_{0\le T\le U}|C_\lambda(T)|^2\,d\lambda
\ll_I \frac{U}{(\log U)^2}.
$$

Group the ordinates into unit intervals and let $B_j$ be the sum of $\delta_\rho^2$ in group $j$. Each group contains $O(\log U)$ zeros. Integrating Selberg's density estimate gives $\sum_{\gamma\le U}\delta_\rho^4\ll U/(\log U)^3$, so $\sum_j B_j^2\ll U/(\log U)^2$. Expanding the phase within each group and the hyperbolic cosine weight in power series gives Fourier polynomials with the group index as the integer frequency and coefficients bounded by $B_j$ times summable factors. The Carleson–Hunt maximal inequality bounds all partial sums over complete groups. The group containing the cutoff is bounded by its own mass and includes any ordinates at the upper endpoint. [Simonič, Eqs. (1) and (3)](https://arxiv.org/pdf/1910.08274v2#page=1) · [Oberlin et al., Theorem 1.1](https://arxiv.org/pdf/0910.1555#page=2) · [Derivation and numerical check](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7239462563)

The frequencies in $I$ for which the modulus of the correction exceeds $A>0$ at some $T\le U$ therefore form a set of measure $O_I(U/(A^2(\log U)^2))$. Applying Borel–Cantelli at dyadic heights gives $C_\lambda(T)=O_{\lambda,\varepsilon}(\sqrt T/(\log T)^{1/2-\varepsilon})$ for each $\varepsilon>0$ and almost every $\lambda$, along all real heights. The prescribed shell modes form a countable set and still require estimates at individual frequencies.

The phase boundary for a fixed-frequency estimate is explicit in the same synthetic spectrum. Take $\gamma_k=2\pi k$, $m_k=\lfloor\log(2\pi k)\rfloor$, and $\delta_k=2/\log(2\pi k)$, with $m_k$ reflected zeros at each ordinate. Set $u=1/\log T$ and $T=2\pi N$. Every $\gamma_k\le T$ then has $\delta_k>u$, so

$$
D_\lambda(u,T)=\sum_{k=16}^{N}m_k e^{2\pi i\lambda k}.
$$

For $\lambda\notin\mathbb Z$, the geometric partial sums have modulus at most $2/|1-e^{2\pi i\lambda}|$. Abel summation against the monotone sequence $m_k$ therefore gives $D_\lambda(u,T)=O_\lambda(\log T)$. For $\lambda\in\mathbb Z$, the phase is exactly resonant and

$$
D_\lambda(u,T)=\sum_{k=16}^{N}\lfloor\log(2\pi k)\rfloor
=\frac{T}{2\pi}\log T+O(T).
$$

The model still has only $O(\log T)$ zeros in each unit-height interval. Moreover, $\mathbf 1_{\{\delta_k>v\}}\le e^{1/2}(2\pi k)^{-v/4}$, so for $0\le v\le1/2$ its off-line count is $O(T^{1-v/4}\log T)$ and has the Selberg-type density order used above. Thus the counting, reflection, and density inputs permit both logarithmic phase sums at noninteger frequencies and $T\log T$ resonance at integer frequencies. They cannot by themselves imply the prescribed-frequency bound $O_\lambda(T)$. For the actual zeta problem with $\lambda=\log X$ and $\Lambda(X)=0$, additional arithmetic information on the ordinates is still required. [Phase boundary derivation and computation](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7239588238)

At a fixed frequency, smooth weights can cancel phases that a sharp threshold retains. Write $D_\lambda(u,T)=\sum_{0<\gamma\le T,\ \beta>1/2+u}e^{i\lambda\gamma}$. The lattice above shows how resonance occurs. The sharp threshold can still retain a phase sum of order $T\log T$ even when $W_\lambda(T)$ and $S_\lambda(T)$ both follow the same smooth endpoint term to within $O_\lambda(1)$.

For any fixed $\lambda>0$, construct a second reflected spectrum (hand derivation, `ARGUED`). In each period of length $2\pi/\lambda$, distribute zeros in groups of four on an equally spaced grid, using the smooth Riemann–von Mangoldt main term to set the count. At each grid point with phase in $(0,\pi/2]$, assign one pair the offsets $\pm b$. At its opposite phase, assign two pairs the offsets $\pm a$. Choose $a,b$ so that $\cosh(\lambda b)-1=2(\cosh(\lambda a)-1)$. The two groups then cancel exactly in $C_\lambda$. Moving one critical-line zero slightly to the left of each period's right endpoint supplies the smooth endpoint increment for the unweighted sum. The counting error is $O_\lambda(1)$, the off-line count satisfies the same Selberg-type bound, and $C_\lambda(T)=O_\lambda(1/\log T)$.

If $t_+$ denotes a period's right endpoint, take $b=6/(5\log t_+)$. Then $a<0.9/\log t_+$ in all sufficiently high periods. At $u=1/\log T$, the larger offsets enter the sum from every complete period, while the smaller offsets can enter only from periods with $t_+<T^{0.9}$. Summing the grid phases in the first quadrant gives

$$
D_\lambda(1/\log T,T)=\frac{1+i}{16\pi^2}\,T\log T+O_\lambda(T).
$$

For the actual zeta spectrum, one can study the smooth bulk integral directly to bound the weight correction at a specified frequency. A sharp-threshold bound also needs control of how the phase depends on the size of the offset. The collision estimate in the next section requires control of ordinate sums across a frequency band that grows with height. [Reflected construction, endpoint derivation, and numerical check](https://github.com/the-omega-institute/trureturing-books/issues/1927#issuecomment-7240037839)

## 3.3 Periodic Phase Deficits, Landau Window Transfer, and the $1/\sqrt{\pi}$ Collision Limit {#sec-ou-3-3}

We now weld the reciprocal-time, periodic-phase, and logarithmic-time regimes into a single quantitative engine. In `trureturing@dev`, the following three-part frozen theorem establishes a $1/(4096\log T)$ deficit across $16\pi/T \le |t| \le b/\log T$ using opposing phase arcs, transfers any uniform Landau ordinate-sum envelope to a $1/(32\log T)$ deficit across $b/\log T \le |t| \le \log T$, and concludes the exact **Gaussian hard-band collision limit $1/\sqrt{\pi}$**:

::: {.theorem #thm-ou-ch03-harmonic-collision-limit title="Periodic Phase Deficit, Landau Logarithmic Transfer, and the Harmonic Zeta Collision Limit" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHPeriodicPhaseCoverage.harmonic_periodic_phase_deficit D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLandauWindowTransfer.harmonic_landau_window_deficit D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLogarithmicCollisionLimit.harmonic_zeta_collision_limit"}
Assume `RiemannHypothesis`, and keep the notation $a_\gamma, W(T), w_\gamma, P_2(T)$, and $Z_T(t)$ from [@thm-ou-ch03-harmonic-pair-ratio].

1. **Periodic opposing-arc phase deficit** ([`harmonic_periodic_phase_deficit`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHPeriodicPhaseCoverage.harmonic_periodic_phase_deficit)): there exist constants $L > 1$ and $b > 0$ such that for all $T \ge L$ and all $t$ with $\frac{16\pi}{T} \le |t| \le \frac{b}{\log T}$,

   $$
   1 - |Z_T(t)| \;\ge\; \frac{1}{4096\,\log T}.
   $$

2. **Logarithmic-time transfer from a uniform Landau envelope** ([`harmonic_landau_window_deficit`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLandauWindowTransfer.harmonic_landau_window_deficit)): fix $b > 0$ and $C > 0$, and assume the uniform Landau ordinate-sum envelope

   $$
   \left|\sum_{0 < \gamma \le V} m_\gamma e^{i\gamma t}\right| \;\le\; C\left(V + e^{|t|/2}(1 + |t|)^2 + e^{|t|/2}(1 + \log V) + \frac{\log V}{|t|}\right) \qquad (V > 1,\; t \neq 0).
   $$

   Then there exists $L > 1$ such that for all $T \ge L$ and all $t$ with $\frac{b}{\log T} \le |t| \le \log T$,

   $$
   1 - |Z_T(t)| \;\ge\; \frac{1}{32\,\log T}.
   $$

3. **Gaussian hard-band collision limit** ([`harmonic_zeta_collision_limit`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHLogarithmicCollisionLimit.harmonic_zeta_collision_limit)): assuming the same uniform Landau envelope for some $C > 0$, let $T_n \to \infty$ and $\eta_n$ be eventually positive with variance scale $s_n := \sqrt{n P_2(T_n)/2}$. If $(\log T_n)^2 / n \to 0$, $\eta_n / s_n \to 0$, and $\eta_n \log T_n \to \infty$, then the weighted hard-band collision sum $E_n(\eta_n)$ over ordered occupation-vector pairs whose frequency differences have absolute value at most $\eta_n$ satisfies

   $$
   \frac{s_n\,E_n(\eta_n)}{\eta_n\,W(T_n)^{2n}} \;\longrightarrow\; \frac{1}{\sqrt{\pi}}.
   $$

:::

::: proof
In part 1, setting period $H := 2\pi/|t|$ packs at least $T/(8H)$ full periods into $[T/2, T]$. Picking disjoint half-open intervals of width $H/16$ anchored at phases $0$ and $\pi$ in each period, the unconditional short-window counting lower bound guarantees at least $\log T / (4096\pi)$ harmonic weight in each opposing family; projecting the raw complex score onto its own unit direction and selecting the family whose real projection is at most $1/2$ yields $1 - |Z_T(t)| \ge 1/(4096\log T)$. In part 2, evaluating the Landau envelope at $V = T$ and $V = 3T/4$ across $b/\log T \le |t| \le \log T$ bounds the difference sum by $2C(7 + 1/b)T$, eventually below half the counting lower bound $T\log T / (16\pi)$ on $(3T/4, T]$; triangle inequality and $a_\gamma \ge m_\gamma/(2T)$ transfer this to $1/(32\log T)$. In part 3, [@thm-ou-ch03-harmonic-pair-ratio] secures the central moving-window Gaussian principal term $1/(2\sqrt{\pi})$ on $|t| \le 1/T_n$; the three deficit regimes stitch together across $1/T_n \le |t| \le \log T_n$ to give $|Z_{T_n}(t)|^{2n} \le \exp(-2cn/\log T_n)$, crushing polynomial prefactors; relative Fejér truncation (using $\eta_n \log T_n \to \infty$) transfers the limit to the whole real line, and two-sided secant comparison across fixed multiples of $\eta_n$ extracts the hard-band constant $1/\sqrt{\pi}$. The full proof is checked by the Lean kernel.
:::

Notice how cleanly the upstream pieces fit (`ARGUED / EXT-LEAN`): inside `trureturing@dev`, combining [@thm-ou-ch03-landau-vertical] with the horizontal top-edge bound already establishes the inclusive uniform Landau envelope (`actual_cutoff_landau_envelope`) under RH, automatically discharging the Landau hypothesis required in parts 2 and 3 of [@thm-ou-ch03-harmonic-collision-limit], while Alpöge's external proof (`EXT-LEAN`) discharges `RiemannHypothesis`. The global analytic highway from the critical line to the Gaussian harmonic collision limit is therefore fully paved.

## 3.4 Finite Candidate Zero Windows: Zero #11431 and the Triple-Window Hits #8236 and #8359 {#sec-ou-3-4}

Now shift the microscope from $T \to \infty$ asymptotics down to the **concrete finite zero windows** actually sampled by the 19-point Behrend shell across Volumes II through V. Two landmarks stand out—the 19-zero window centered on **zero #11431**, and the earliest triple-window survivors **zeros #8236 and #8359**. Certified $160$-bit Arb ball arithmetic (`CERT`) makes both their strengths and their exact limits transparent.

### 3.4.1 Zero #11431 in $[10000, 12999]$: Midpoint Isolation, Fejér Weights, and Observation Radii

Zero #11431 serves as a recurring testbed for two-loop gauge crossings and two-step mass operators in Volume II. Placing it inside the symmetric 19-zero window #11422–#11440 reveals four certified quantitative benchmarks (`CERT`; replay scripts [`ch39-zero-midpoint-fejer.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-zero-midpoint-fejer.py), [`ch39-midpoint-weight-bound.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-midpoint-weight-bound.py), [`ch39-finite-fejer-observation.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-finite-fejer-observation.py), and [`ch39-harmonic-local-observation.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-harmonic-local-observation.py)):

1. **Unique isolation among 3,000 centers ($35.60\times$ sharper than runner-up):** For each center index $n$, define the 9-neighbor midpoint deviation $E_n := \min_{1 \le i, j \le 9} |\gamma_{n - i} + \gamma_{n + j} - 2\gamma_n|$. Across all $3{,}000$ centers $n \in [10000, 12999]$ ($243{,}000$ triples checked at $160$-bit precision), **zero #11431 ranks uniquely first** both raw and normalized by the local mean spacing: it sits almost dead center between #11427 and #11436, with deviation

   $$
   \Delta = |\gamma_{11427} + \gamma_{11436} - 2\gamma_{11431}| \in (1.6812114283,\; 1.6812114285)\times 10^{-6},
   $$

   which is **$35.60\times$ sharper** (strictly in $(35.59, 35.60)$) than the runner-up #11628! Yet we refuse to mystify this local sharpness: because the Riemann–von Mangoldt formula implies $\gamma_N / N \to 0$, telescoping $E_n \le \gamma_{n+1} - \gamma_{n-1}$ proves that higher up the critical line, centers with absolute deviation strictly smaller than $E_{11431}$ have natural density $1$ (`ARGUED`).
2. **Occupation-diagonal dominance ($94.62\%$):** Assigning equal weights $1/19$ on #11422–#11440 at resolution $\eta = 0.01$, the self-paired occupation diagonal contributes exactly $B = (19 + 4\cdot 171)/19^4 = 703/130321$ out of the total quartic Fejér moment in $(0.00570094240512, 0.00570094240513)$—precisely **$94.62\%$** ($94.6224672\%$).
3. **Maximal extra-pair share in the isolated collision band ($23.657\%$ / $23.670\%$):** The second-smallest distinct pair gap in the window is $\Delta_2 \in (0.0023277388, 0.0023277390)$. Throughout $\Delta < \eta \le \Delta_2$, the sole extra off-diagonal collision is $\gamma_{11427} + \gamma_{11436} \approx 2\gamma_{11431}$. Optimizing the nonnegative probability weights across the 19 zeros gives a maximum extra-pair share of **$23.657017\%$** for the triangular kernel and $4/(12 + 2\sqrt{6}) \approx \mathbf{23.670068\%}$ for the closed-band indicator. The indicator uses $\Delta \le \eta < \Delta_2$ to keep the second pair outside the band. With equal weights on all 19 zeros, the closed-band share is $4/707 \approx 0.565771\%$.
4. **First finite observation radii ($111521$ and $111532$)**. Integrate the quartic phase reading $\bigl|\sum_j p_j e^{it\gamma_j}\bigr|^4$ against the Fejér kernel $K_\eta(t)=(1-\cos(\eta t))/(\pi\eta t^2)$ on $[-T,T]$ to obtain $I_\eta(T)$. The integrand is nonnegative, so $I_\eta(T)$ is nondecreasing in $T$. Once it exceeds the full-line occupation diagonal $B$, the full-line integral exceeds $B$ as well, certifying an extra collision. At $\eta=1/1000$ the equal-weight baseline is $B=703/19^4$. Ball arithmetic gives the signed margins

   $$
   \begin{aligned}
   I_\eta(111520)-B &\in (-1.864,-1.863)\times10^{-11},\\
   I_\eta(111521)-B &\in (2.960,2.961)\times10^{-10}.
   \end{aligned}
   $$

   An absolute integration error of at most $1.8\times10^{-11}$ in each reading still certifies $111521$ as the first integer radius above the threshold. To reproduce the margins, expand the fourth power and evaluate the cosine integral at each frequency difference $d$ as $\bigl(F_T(d+\eta)+F_T(d-\eta)-2F_T(d)\bigr)/(\pi\eta)$, where $F_T(a)=a\operatorname{Si}(aT)-(1-\cos(aT))/T$ comes from integrating $(1-\cos(at))/t^2$ by parts.

   Write $C_{\eta,T}(d)$ for this finite cosine integral. At $T=111521$, the two directions of the isolated midpoint pair together contribute $4C_{\eta,T}(\Delta)/19^4$. Subtracting just these terms leaves a margin relative to $B$ in $(-3.05165,-3.05163)\times10^{-5}$, so the reading falls below the threshold. The other off-diagonal pairs have zero full-line coefficients. At this finite radius their terms sum to about $1.5192\times10^{-9}$, exceeding the positive margin above.

   Keeping just the occupation diagonal and the isolated midpoint pair gives a first integer radius of $111526$ at $\eta=10^{-3}$. In this same equal-weight window, increasing the bandwidth from $10^{-3}$ to $10^{-3}+10^{-9}$ takes the full reading at $T=111520$ through $B$ exactly once, at a critical bandwidth $\eta_*$ in $(0.0010000006020,0.0010000006021)$. The first integer radius at which the full reading strictly exceeds $B$ is $111521$ for $\eta\le\eta_*$ and $111520$ for $\eta>\eta_*$. The reading with just the diagonal and the midpoint pair first exceeds $B$ at $111526$ throughout this interval. The bandwidth stays inside the isolated collision band for the full-line integral. Ball arithmetic uses $F_T'(a)=\operatorname{Si}(aT)$ to bound the bandwidth derivatives at the neighboring integer radii and verify the signs on either side of the critical bandwidth. [Interval certificate and replay](https://github.com/the-omega-institute/trureturing-books/issues/1996#issuecomment-7239325689)

   With local harmonic weights, the first integer crossing is at $111532$ ($111531$ is still below its baseline). The generic relative truncation bound gives sufficient radii of $11{,}330{,}943$ for equal weights and $11{,}331{,}843$ for local harmonic weights.

::: {.example #ex-ou-ch03-fejer-11431 title="Three-Line Derivation of the Sharp 23.670% Isolated-Band Ceiling"}
Inside the isolated band $\Delta < \eta \le \Delta_2$, write $x, y, z \ge 0$ for the probability weights on zeros #11427, #11436, and #11431, and set $q := 1 - \Delta/\eta \in (0, 1]$. The extra collision contributes $4q x y z^2$, while the occupation diagonal $D = \sum_i p_i^4 + 4\sum_{i < j} p_i^2 p_j^2$ only increases when any of the other sixteen weights is nonzero. For $x, y > 0$, putting $t := z^2 / (xy)$ and using $x^2 + y^2 \ge 2xy$ yields

$$
D \;\ge\; x^4 + y^4 + z^4 + 4(x^2 y^2 + x^2 z^2 + y^2 z^2) \;\ge\; (xy)^2\bigl(6 + 8t + t^2\bigr).
$$

By AM–GM ($t + 6/t \ge 2\sqrt{6}$), the signal-to-diagonal ratio is sharply capped:

$$
\frac{4q x y z^2}{D} \;\le\; \frac{4q}{8 + t + 6/t} \;\le\; \frac{4q}{8 + 2\sqrt{6}} \quad \Longrightarrow \quad \frac{\text{extra share}}{\text{total quartic moment}} \;\le\; \frac{4q}{8 + 2\sqrt{6} + 4q}.
$$

Equality holds uniquely at $x = y \approx 0.280498$ and $z = 6^{1/4}x \approx 0.439003$, with the remaining sixteen weights zero. The closed-band indicator sets $q=1$ for $\Delta \le \eta < \Delta_2$. The largest share for the triangular kernel occurs at $\eta=\Delta_2$, where $q$ is largest and the second gap falls at the kernel's zero. With equal weights $x=y=z=1/19$, the closed-band excess is $4/19^4$ and the occupation diagonal is $703/19^4$, so the excess contributes $4/707$ of the total.
:::

### 3.4.2 How Zeros #8236 and #8359 Enter the Three-Window Physical Filter

Passing from single-window statistics to the **three-window physical filter** shared across [Volume II](ch04-gauge-crossings-and-monotone-barriers.md)–[Volume IV](ch10-regge-gravity-and-spin2.md)—demanding simultaneously (i) three light modes in every one of the five Standard Model gauge charges, (ii) two-loop sharp-threshold strong coupling $0.117 < \alpha_s(M_Z) < 0.119$, and (iii) four-layer one-loop curvature within $0.2\%$ of target—an exhaustive index-by-index scan produces a crisp empirical ledger (`CERT / MODEL`; replay scripts [`ch39-first-three-mode-observables.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-first-three-mode-observables.py) and [`ch39-neutral-site-variance-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-neutral-site-variance-gap.py)):

| Light/Heavy Spectral Cut | Scan Range | 5-Charge 3-Mode Hits | Strong-Coupling Hits | Curvature Hits | First Triple-Window Hit | First-Hit Readings ($\alpha_s$ / Curvature Ratio) |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| Fixed cut $9$ | $\#1\text{–}\#8192$ | $67$ | $22$ | $2$ ($\#6514, \#8035$) | None ($0$) | — |
| Fixed cut $9$ | $\#1\text{–}\#8359$ | $69$ | $23$ | $3$ | **$\#8359$** ($\gamma \approx 8462.07$) | $(0.1184112, 0.1184213)$ / $0.99935102$ |
| Site-variance min-cut $T = 9 + (1 - \delta)^2$ | $\#1\text{–}\#8359$ | — | — | — | **$\#8236$** ($\gamma \approx 8354.92$) | $(0.1183058, 0.1183120)$ / $1.00093826$ |

Notice how cleanly the cut geometry shifts the entry point: under the fixed cut $9$, the strong-coupling and curvature windows remain disjoint throughout the first $8{,}192$ zeros, and **zero #8359** is the very first triple survivor (yet transferring the calibrated flavor tensor to #8359 yields a held-out $|V_{ub}| \approx 0.00287268$, undershooting reference by $23.026\%$). Replacing the ad hoc number $9$ by the intrinsic **site-variance / minimum-cut threshold** $T = 9 + (1 - \delta)^2$—the minimum squared boundary-edge weight across all nontrivial bipartitions of the 19-point shell—lets **zero #8236** enter first (its charge-$6$ third eigenvalue sits at $\approx 9.2061$, cleanly between $9$ and $T$), making #8236 and #8359 the complete pair of triple-window hits up to #8359 (similarly, higher up, zero #148341 keeps only two charge-$6$ light modes at cut $9$ yet clears all three windows under $T$).

::: {.figure src="ch03-zero-window-landscape"}
**Midpoint isolation at zero #11431 alongside the three harmonic phase-deficit windows.** Left: across centers $10{,}000\text{–}12{,}999$ (with $9$ neighbors per side), zero #11431 (amber baseline $1\times$) improves on runner-up #11628 by about $35.60\times$ in absolute midpoint error; the two horizontal bars below compare the equal-weight Fejér diagonal share ($94.62\%$ at $\eta = 0.01$, cyan) with the maximum extra-pair share under free reweighting in the isolated collision band ($23.66\%$, violet). Right: illustrative log-$|t|$ scale showing the three Lean-frozen harmonic phase-deficit windows of [@thm-ou-ch03-harmonic-pair-ratio] and [@thm-ou-ch03-harmonic-collision-limit] under RH—the short reciprocal window $1/T \le |t| \le 1/L$ (cyan), the periodic window $16\pi/T \le |t| \le b/\log T$ (violet), and the long window $b/\log T \le |t| \le \log T$ (cyan, assuming an additional Landau bound).
:::

## 3.5 The Honest Gap Between Global Bounds and Single-Zero Selection {#sec-ou-3-5}

Closing Volume I, we draw the boundary line with complete candor—separating what is already welded shut by the Lean kernel and Arb intervals from the real gap still standing open (`OPEN`):

- **Welded foundations:** (1) the integer anatomy, $22$ rationally independent frequencies, projective ternion heap, and minimal rational Gram dimension $21$ of the 19-point Behrend shell; (2) dual quaternion inverse spectral uniqueness, three-probe global injectivity, optimal density-$1/(2\pi)$ zero-driven Standard Model Haar integration, and the $D = 0$ finite Wilson diffusion test; (3) anchored on externally verified RH (`EXT-LEAN`), the Lean-frozen Fejér critical gap, harmonic pair-moment ratio, reciprocal and periodic phase deficits, unconditional Landau vertical contour bounds, and Gaussian collision limit $1/\sqrt{\pi}$; and (4) certified high-precision finite-window analyses of zeros #11431, #8236, and #8359.
- **The open comparison gap (`OPEN`):** First, [@thm-ou-ch03-harmonic-pair-ratio] through [@thm-ou-ch03-harmonic-collision-limit] constrain *global harmonic averages* over the entire cutoff spectrum $0 < \gamma \le T$, whereas physical shell observables read out a *single* zero's dual-clock phases or a sparse weighted ensemble; no comparison theorem yet derives single-shell mass spectra or simultaneous multi-phase window hits from these global phase-sum bounds. Second, zero #11431's local midpoint isolation depends on the chosen search range and neighbor radius, while zeros #8236 and #8359 still rely on externally specified field tables, mass units, and spectral cuts. Which physical action selects the weights and picks the vacuum?

::: {.film src="zero-windows"}
**The global average bounds are welded shut by Lean; selecting a single zero is still the open gap (2 min 45 s).** The opening marks RH and Dirichlet GRH as a violet external formalized fact (`EXT-LEAN`) without the green badge, and Grand RH and the other questions beyond its scope as red `OPEN`. The cyan critical line $\operatorname{Re} s = \frac{1}{2}$ is folded onto the unit circle by $(s-1)/s$: the amber point stays on the circle, the magenta off-line point ($\operatorname{Re} s = 0.85$) lands inside, and the $|w|$ readouts are computed on screen; the green tags are the Cayley criterion and the Fejér critical gap of [@thm-ou-ch03-fejer-gap], and the Fejér kernel curve $|\sum_{j<6} e^{ij\theta}|^2 \ge 0$ below is a computed sketch of the proof idea. A chain of harmonically weighted phase arrows on schematic ordinates lines up to length $1$ at $t = 0$ and then spreads out; the three time windows on a log-$|t|$ axis (positions schematic) and the pair-moment ratio carry the green tags of [@thm-ou-ch03-harmonic-pair-ratio] and [@thm-ou-ch03-harmonic-collision-limit]. The two cyan vertical edges of the Landau rectangle are the unconditional [@thm-ou-ch03-landau-vertical], and the dashed violet top edge marks that assembling the envelope from the edges is argued only; a schematic Gaussian marks the collision limit $1/\sqrt{\pi} = 0.5641895835\ldots$. In the window of zero #11431, the midpoint arc, the $35.60\times$ error bar, the $94.62\%$ diagonal share, the $23.657017\%$ extra-pair ceiling, and the observation radii $111521$ / $111532$ are ball-arithmetic certificates (cyan `NUM`), with the closed form $4/(12+2\sqrt{6})$ recomputed on screen; the triple-window hits #8359 and #8236 rest on chosen inputs marked violet `MODEL`; the red broken bridge between global averages and a single zero is the open problem.
:::

Armed with this exact arithmetic toolkit—and with zero illusions about what remains unproved—we close Volume I and enter [Volume II: Question 1](ch04-gauge-crossings-and-monotone-barriers.md), putting the 19-point magnetic shell directly under the furnace of Standard Model gauge unification in [Chapter 4](ch04-gauge-crossings-and-monotone-barriers.md).
