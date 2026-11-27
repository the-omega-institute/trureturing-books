# Chapter 3 The Riemann Zero Spectrum: Fejér Collisions, Landau Contours, and Candidate Zero Windows {#sec-ou-ch03}

[Chapter 2](ch02-quaternion-clocks-and-haar-zeros.md) closed with an alluring arithmetic engine: driven by the $22$ rationally independent frequencies of the 19-point Behrend shell, unweighted averages along a density-$1/(2\pi)$ subsequence of positive Riemann zeros reproduce exact Haar integrals on the full Standard Model gauge group. Any seasoned analytic number theorist or physicist immediately asks the hard follow-up: **asymptotic equidistribution as $T \to \infty$ is one thing; quantitative phase cancellation at finite cutoff $T$, fourth-order collision moments, and the behavior of concrete finite zero windows are quite another.**

This final chapter of Volume I lays out the analytic number-theoretic bedrock of the monograph, placing **formally verified global theorems** right beside **certified finite-window computations**. We proceed in four steps:

1. State the exact **external formalized status** of the classical Riemann Hypothesis (RH) and Dirichlet GRH, and establish the Lean-verified Fejér critical-gap and Cayley unit-circle criteria;
2. Walk through the frozen Lean 4 analytic chain linking harmonic pair-moment ratios, reciprocal-time and periodic phase deficits, unconditional Landau left/right vertical contour bounds, and the Gaussian hard-band collision limit $1/\sqrt{\pi}$;
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
3. **Maximal extra-pair share in the isolated collision band ($23.657\%$ / $23.670\%$):** The second-smallest distinct pair gap in the window is $\Delta_2 \in (0.0023277388, 0.0023277390)$. Throughout $\Delta < \eta \le \Delta_2$, the sole extra off-diagonal collision is $\gamma_{11427} + \gamma_{11436} \approx 2\gamma_{11431}$. Even under *arbitrary* nonnegative probability weights across all 19 zeros, the extra-pair share is capped at **$23.657017\%$** for the Fejér kernel and at the exact closed-form value $4/(12 + 2\sqrt{6}) \approx \mathbf{23.670068\%}$ for the unweighted closed band.
4. **Exact finite observation radii ($111521$ and $111532$):** At resolution $\eta = 1/1000$, measuring a finite-interval integral $I_\eta(T) > B$ certifies an off-diagonal collision beyond the full-line occupation background. Generic relative truncation yields conservative sufficient radii $11{,}330{,}943$ (equal weights) and $11{,}331{,}843$ (local harmonic weights), whereas direct $160$-bit certified integration pins down the **exact first integer crossing radius** two orders of magnitude earlier: **$111521$** under equal weights (still negative at $111520$) and **$111532$** under local harmonic weights (still negative at $111531$).

::: {.example #ex-ou-ch03-fejer-11431 title="Three-Line Derivation of the Sharp 23.670% Isolated-Band Ceiling"}
Inside the isolated band $\Delta < \eta \le \Delta_2$, write $x, y, z \ge 0$ for the probability weights on zeros #11427, #11436, and #11431, and set $q := 1 - \Delta/\eta \in (0, 1]$. The extra collision contributes $4q x y z^2$, while the occupation diagonal $D = \sum_i p_i^4 + 4\sum_{i < j} p_i^2 p_j^2$ only increases when any of the other sixteen weights is nonzero. For $x, y > 0$, putting $t := z^2 / (xy)$ and using $x^2 + y^2 \ge 2xy$ yields

$$
D \;\ge\; x^4 + y^4 + z^4 + 4(x^2 y^2 + x^2 z^2 + y^2 z^2) \;\ge\; (xy)^2\bigl(6 + 8t + t^2\bigr).
$$

By AM–GM ($t + 6/t \ge 2\sqrt{6}$), the signal-to-diagonal ratio is sharply capped:

$$
\frac{4q x y z^2}{D} \;\le\; \frac{4q}{8 + t + 6/t} \;\le\; \frac{4q}{8 + 2\sqrt{6}} \quad \Longrightarrow \quad \frac{\text{extra share}}{\text{total quartic moment}} \;\le\; \frac{4q}{8 + 2\sqrt{6} + 4q}.
$$

Equality holds uniquely at $x = y \approx 0.280498$, $z = 6^{1/4}x \approx 0.439003$, with the remaining sixteen weights zero; $q = 1$ (closed band) gives $4/(12 + 2\sqrt{6}) \approx 23.670068\%$, and $\eta = \Delta_2$ gives $23.657017\%$.
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
