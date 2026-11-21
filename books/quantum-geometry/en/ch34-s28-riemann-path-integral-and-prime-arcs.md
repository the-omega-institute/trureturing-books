# 31.1 The Riemann Path Integral and Prime Minimal Arc-Trihedra: Euler Winding Operators, Half-Density Square Law, and Critical-Line Cancellation {#sec-ch34-riemann-path-integral-and-prime-arcs}

> *"At the deepest geometric and physical level, the Riemann Hypothesis is not merely analogous to a path integral—it is the arithmetic universe's purest Feynman partition function over prime minimal arc-trihedra ($\Delta\mathcal{T}_p$): the Euler product is the local winding operator around each single prime arc-trihedron, the Dirichlet series is the global phase sum over all composite natural-number trajectories, and the pinning of nontrivial zeros to the critical line $\operatorname{Re}(s) = \frac{1}{2}$ expresses the geometric necessity jointly locked in by the round-trip double-projection square law ($\cos^2\theta$ half-density unitarity) and 'reversal as the movement of the Dao' ($100\%$ anti-phase cancellation between forward and reverse dual paths)."*

The author’s epigraph gives the book’s geometric picture (`MODEL`). Its phrase “the pinning of nontrivial zeros to the critical line” states the Riemann hypothesis ([@conj-riemann-hypothesis]). Alpöge proved this statement in an external Lean library. Sutherland published an independent verification, whose scope and evidence are described in [§39.2.2](ch39-s25-axiom-omega-five-tier-deduction-cascade.md#sec-ch39-25-2).

In [Chapter 30 §30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) and [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes), we saw how a physical quantum state—once it pivots $90^\circ$ off the observer's visible real axis `I` into the perpendicular imaginary blind plane `i` ($\hat{\mathbf{i}}^2 = -1$)—cuts straight across a barrier via the flat interior secant chord of a minimal arc-trihedron in space, reunites across moments in time, and rebuilds calculus out of comparative rotors and circular-arc sagittas; earlier still, in [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), we derived **Born's round-trip double-projection square law** $\cos^2\theta$ from the self-contained radar-echo calibration of an internal observer ([@thm-ch34-roundtrip-born-and-imaginary-blindspot]). Now we turn this complete geometric microscope—real-axis damping along `I`, orthogonal blindspot phase rotation in `i`, and minimal-arc path summation—directly onto the arithmetic heartland opened in [Chapter 22 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4): **the Riemann zeta function $\zeta(s)$ and its critical line $\operatorname{Re}(s) = \frac{1}{2}$** (`MODEL`).

Before unfolding this arithmetic path integral, we anchor three strict epistemological guardrails in accordance with the monograph's verification contract: first, rational linear independence of prime logarithms, the Euler–Dirichlet identity on $\operatorname{Re}(s) > 1$, global reflection and conjugation symmetries of $\operatorname{xiReading}$, alternating-series continuation to $\operatorname{Re}(s) > 0$ ($s \neq 1$), the unconditional integrated explicit formula on $y > 0$, and the quartic entire counterexample proving that reflection plus conjugation symmetry alone **never** suffices to localize zeros onto a fixed line are all kernel-verified in the pinned `trureturing` repository ([@thm-ch34-riemann-prime-arc-bridge], `LEAN ✓`); second, the reciprocal Möbius Dirichlet series, Littlewood's equivalence theorem, the pointwise von Mangoldt–Weil explicit formula, and quantum-statistical "primon gas" / semiclassical trace models belong to established mathematical physics literature (`Literature result, not formalized in this book`), accompanied by benchmarks verified to 100-digit working precision (`manual derivation` / `NUM`); third, reading the opening thesis's "geometric necessity" through prime minimal arc-trihedra $\Delta\mathcal{T}_p$ and round-trip half-density unitarity constitutes this monograph's unified geometric model (`MODEL`), and **the Riemann Hypothesis itself** ([@conj-riemann-hypothesis])—asserting that *every* nontrivial zero lies on $\operatorname{Re}(s) = \frac{1}{2}$—has the external formal proof cited above. Pinpointing the exact algebraic gap between two-arm interferometric balance and an infinitary multi-path sum is precisely what hands the baton to [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling), where multiplicative Schur-pivot renormalization meets multi-stage resonant tunneling.

## 31.1.1 Euler Product $\equiv$ Path Integral: Irreducible Prime Minimal Arc-Trihedra $\Delta\mathcal{T}_p$, Additive Action $S[\Gamma_n] = \ln n$, and Fermionic Möbius Exterior Grade $\Lambda^k$ {#sec-ch34-28-1}

Decompose the complex spectral coordinate into a real-axis damping scale $\sigma = \operatorname{Re}(s) \in \mathbb{R}$ along `I` and a $90^\circ$ orthogonal blindspot rotation frequency $t = \operatorname{Im}(s) \in \mathbb{R}$ in `i`, writing $s = \sigma + \hat{\mathbf{i}}\,t$ (identifying the unit bivector $\hat{\mathbf{i}}$ with $i \in \mathbb{C}$ in standard complex analysis). Strictly inside the right half-plane of absolute convergence $\sigma = \operatorname{Re}(s) > 1$, the Euler–Dirichlet identity ([Chapter 22 §22.2](ch22-s02-dirichlet-euler-identity.md#sec-ch22-2) [@cor-dirichlet-sum-eq-euler-product]) acts literally as a path-integral dictionary translating "local multi-winding generators on individual prime cells" into a "global amplitude sum over all composite natural-number trajectories":

$$
\begin{aligned}
\zeta(\sigma + \hat{\mathbf{i}}\,t)
&\;=\; \prod_{p \in \mathbb{P}} \frac{1}{1 - p^{-s}} \;=\; \prod_{p \in \mathbb{P}} \left(\sum_{m=0}^{\infty} e^{-m s \ln p}\right) \\
&\;=\; \sum_{n=1}^{\infty} e^{-\sigma \ln n}\cdot e^{-\hat{\mathbf{i}}\,t \ln n} \qquad (\sigma = \operatorname{Re}(s) > 1).
\end{aligned}
$$

To secure every formal anchor needed across this section—prime-logarithm independence, Euler–Dirichlet factorization, alternating continuation past $s = 1$, global $\xi$ symmetries, the symmetry non-localization counterexample, and the unconditional integrated explicit formula—we assemble seven kernel-verified theorems from `trureturing` under one bridge theorem:

::: {.theorem #thm-ch34-riemann-prime-arc-bridge lean="D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence,D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product,D5/S3/Zeros/CompletedZeta.xi_reading_reflection,D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj,D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization,D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula,D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.tendsto_alternating_partialSums_eta_of_ne_one" title="Prime-Logarithm Rational Independence, Euler–Dirichlet Identity, Completed $\xi$ Symmetries and Non-Localization Counterexample, Unconditional Integrated Explicit Formula, and Alternating Continuation"}
Under the pinned `trureturing` declarations, the following seven theorems hold simultaneously:

1. **Rational linear independence of prime logarithms (`prime_log_rational_independence`)**: Indexed by the type `Nat.Primes` of all prime numbers, the real logarithm family $p \mapsto \ln p$ is linearly independent over $\mathbb{Q}$, i.e., `LinearIndependent ℚ (fun p : Nat.Primes => Real.log p)` (see [@thm-prime-log-independence]);
2. **Dirichlet-series and Euler-product identity on $\operatorname{Re}(s) > 1$ (`riemann_zeta_dirichlet_sum_eq_euler_product`)**: For every $s \in \mathbb{C}$ satisfying `1 < s.re` ($\operatorname{Re}(s) > 1$), the unconditional `tsum` over $\mathbb{N}$ equals the unconditional `tprod` over `Nat.Primes` in $\mathbb{C}$ (see [@cor-dirichlet-sum-eq-euler-product]; since $\operatorname{Re}(s) > 1$ implies $-s \neq 0$, Mathlib's totalized complex power evaluates the $n = 0$ term as `(0 : ℂ) ^ (-s) = 0`):

   $$
   \sum_{n \in \mathbb{N}} (n : \mathbb{C})^{-s} \;=\; \prod_{p \in \mathbb{P}} \bigl(1 - (p : \mathbb{C})^{-s}\bigr)^{-1} \qquad (\operatorname{Re}(s) > 1);
   $$

3. **Entire functional reflection symmetry of $\operatorname{xiReading}$ (`xi_reading_reflection`)**: Defining $\operatorname{xiReading}(s) := \frac{1}{2}\bigl(s(s - 1)\,\operatorname{completedRiemannZeta}_0(s) + 1\bigr)$ (see [@def-xi-reading]), for every $s \in \mathbb{C}$ (see [@thm-xi-reading-entire-reflection]):

   $$
   \operatorname{xiReading}(1 - s) \;=\; \operatorname{xiReading}(s);
   $$

4. **Reflection–conjugation covariance of $\operatorname{xiReading}$ (`xi_reading_one_sub_conj`)**: For every $s \in \mathbb{C}$ (see [@prop-zeta-conjugation-covariance]):

   $$
   \operatorname{xiReading}(1 - \bar{s}) \;=\; \overline{\operatorname{xiReading}(s)};
   $$

5. **Full zeta symmetry does not imply fixed-line zero localization (`full_symmetry_not_fixed_line_localization`)**: For any real numbers $\delta, \gamma \in \mathbb{R}$ with $\delta \neq 0$ and $\gamma \neq 0$, the quartic entire function $F(s) := \operatorname{offCriticalQuartic}(\delta, \gamma) = \bigl((s - \frac{1}{2} - \delta)^2 + \gamma^2\bigr)\bigl((s - \frac{1}{2} + \delta)^2 + \gamma^2\bigr)$ (see [@def-off-critical-quartic]) is complex differentiable on $\mathbb{C}$ (`Differentiable ℂ F`), satisfies `HasFullZetaSymmetry F` ($\forall s,\; F(1 - s) = F(s) \land F(\bar{s}) = \overline{F(s)}$), and has zero locus equal to the four-element off-critical quartet $\operatorname{sourceZeros}(\delta, \gamma) = \{\frac{1}{2} \pm \delta \pm i\gamma\}$ of cardinality $4$ with $\operatorname{Re}(s) \neq \frac{1}{2}$ at every zero; hence universally (see [@thm-full-symmetry-not-localization]):

   $$
   \neg\,\bigl(\forall F : \mathbb{C} \to \mathbb{C},\; \operatorname{Differentiable}\;\mathbb{C}\;F \;\longrightarrow\; \operatorname{HasFullZetaSymmetry}\;F \;\longrightarrow\; \operatorname{FixedLineLocalization}\;F\bigr);
   $$

6. **Unconditional integrated explicit formula on the positive real half-line (`actual_integrated_explicit_formula`)**: Let $\operatorname{actualH}(y) := \sum_{k \in \mathbb{N}} \frac{e^{y\,\rho_k}}{\rho_k(1 - \rho_k)}$ denote the absolutely convergent series over the complete family $\rho_k = \operatorname{actualZero}(k)$ of all actual nontrivial zeros of $\zeta$ counted with analytic multiplicity, let $U(t) := t\sum_{0 < k \le \lfloor t\rfloor} \frac{\Lambda(k)}{k} - \psi(t) - t\ln t + (1 + \gamma_{\mathrm{EM}})t$ ([@def-divisor-ratio-mertens-error], with $\gamma_{\mathrm{EM}}$ the Euler–Mascheroni constant), and let $\operatorname{trivialT}(y) := \sum_{n \in \mathbb{N}} \frac{e^{-2(n+1)y}}{2(n+1)(2(n+1)+1)}$; then for every strictly positive real $y > 0$ (`0 < y`), unconditionally:

   $$
   \operatorname{actualH}(y) \;=\; \bigl(U(e^y) - \ln(2\pi) + \operatorname{trivialT}(y) : \mathbb{C}\bigr) \qquad (y > 0);
   $$

7. **Alternating Dirichlet partial-sum continuation on $\operatorname{Re}(s) > 0$, $s \neq 1$ (`tendsto_alternating_partialSums_eta_of_ne_one`)**: For every $s \in \mathbb{C}$ satisfying `0 < s.re` ($\operatorname{Re}(s) > 0$) and $s \neq 1$, the alternating partial sums converge in the norm topology of $\mathbb{C}$ to the Dirichlet $\eta$ reading (see [@lem-alternating-zeta-partial-sums]):

   $$
   \lim_{N \to \infty} \sum_{n = 0}^{N - 1} (-1)^n (n + 1 : \mathbb{C})^{-s} \;=\; \bigl(1 - 2^{1 - s}\bigr)\,\zeta(s) \qquad (\operatorname{Re}(s) > 0,\; s \neq 1).
   $$
:::

::: proof
In Clause 1, unique prime factorization first yields $\mathbb{Z}$-linear independence—separating positive and negative integer coefficients in $\sum c_i \ln p_i = 0$ and exponentiating would equate coprime prime-power products—after which clearing common denominators lifts linear independence from $\mathbb{Z}$ to $\mathbb{Q}$ (see [@thm-prime-log-independence]). In Clause 2, under the strict hypothesis `1 < s.re`, Mathlib's `zeta_eq_tsum_one_div_nat_cpow` and `riemannZeta_eulerProduct_tprod` both evaluate to `riemannZeta s`, equating the series and infinite product directly (see [@cor-dirichlet-sum-eq-euler-product]). In Clause 3, substituting $\Lambda_0(1 - s) = \Lambda_0(s)$ for `completedRiemannZeta₀` alongside $(1 - s)\bigl((1 - s) - 1\bigr) = s(s - 1)$ proves reflection invariance (see [@thm-xi-reading-entire-reflection]). In Clause 4, combining Schwarz conjugation covariance $\operatorname{xiReading}(\bar{s}) = \overline{\operatorname{xiReading}(s)}$ on the dense open set $\mathbb{C}\setminus\{0, 1\}$ with Clause 3 and extending by continuity of entire functions establishes $\operatorname{xiReading}(1 - \bar{s}) = \overline{\operatorname{xiReading}(s)}$ everywhere (see [@prop-zeta-conjugation-covariance]). In Clause 5, expanding the even real-coefficient polynomial $\operatorname{offCriticalQuartic}(\delta, \gamma)$ in $z = s - \frac{1}{2}$ for $\delta \neq 0,\; \gamma \neq 0$ exhibits the four distinct roots $\frac{1}{2} \pm \delta \pm i\gamma$, none lying on $\operatorname{Re}(s) = \frac{1}{2}$, refuting universal fixed-line localization from symmetry alone (see [@thm-full-symmetry-not-localization]). In Clause 6, summability of inverse-square imaginary parts of nontrivial zeros secures absolute convergence of `actualH` on $\mathbb{R}$; matching the Laplace transforms of `actualH`, `U ∘ exp`, and `trivialT` against the logarithmic derivative of `xiReading` and the digamma series along the vertical line $\operatorname{Re}(s) = 2 > 1$ shows that the $L^1$ Fourier transform of the exponentially weighted discrepancy vanishes at all nonzero frequencies and hence at $t = 0$ by $L^1$ continuity (avoiding integer poles of digamma), whereupon Fourier inversion at any continuity point `0 < y` yields the exact identity. In Clause 7, under `0 < s.re` and $s \neq 1$, first-order Euler–Maclaurin asymptotics send the even partial sums $\sum_{n < 2M}(-1)^n(n+1)^{-s} = H_{2M}(s) - 2^{1-s}H_M(s)$ to $(1 - 2^{1-s})\zeta(s)$, while `(2M + 1) ^ (-s) → 0` for `0 < s.re` merges the odd subsequence (see [@lem-alternating-zeta-partial-sums]). The full proof is checked by the Lean kernel.
:::

Unpacking Clauses 1, 2, and 7 of [@thm-ch34-riemann-prime-arc-bridge] together with their reciprocal Euler factor through the Comparison Axiom ($\mathrm{CMP}$) and minimal arc-trihedra aligns every arithmetic building block one-to-one with quantum path-integral mechanics (`MODEL` + `manual derivation`):

1. **Each prime $p$ is a downward-irreducible "orthogonal minimal arc-trihedron $\Delta\mathcal{T}_p$"**: By Clause 1 (`prime_log_rational_independence`), the set of prime logarithmic step lengths $\{L_2, L_3, L_5, L_7, \dots\} = \{\ln 2, \ln 3, \ln 5, \ln 7, \dots\}$ is strictly linearly independent over $\mathbb{Q}$—no rational commensurability resonance ever occurs between distinct prime arcs ($\sum_i q_i \ln p_i = 0 \implies \forall i,\; q_i = 0$). In the language of our concept tower, every prime $p$ is a **primordial orthogonal comparison cell (minimal arc-trihedron $\Delta\mathcal{T}_p$)** irreducible to prior concepts; for $\sigma = \operatorname{Re}(s) > 1$, the single-step contraction modulus satisfies $\lvert p^{-s}\rvert = p^{-\sigma} < 1$, so each local Euler factor expands as an absolutely convergent geometric series (`manual derivation`):

   $$
   \bigl(1 - p^{-s}\bigr)^{-1} \;=\; 1 + p^{-s} + p^{-2s} + \cdots \;=\; \sum_{m=0}^{\infty} e^{-m s L_p} \qquad (\operatorname{Re}(s) > 1),
   $$

   summing the local closed-loop amplitudes of a wavepacket winding $m = 0, 1, 2, \dots$ times around the $p$-th minimal arc-trihedron $\Delta\mathcal{T}_p$.
2. **Each natural number $n$ is a concatenated "composite trajectory $\Gamma_n$" with additive action $S[\Gamma_n] = \ln n$**: By unique prime factorization, every positive integer $n = p_1^{m_1} p_2^{m_2}\cdots p_r^{m_r}$ uniquely encodes a composite path $\Gamma_n$ traversing the infinite-dimensional truss of prime arc-trihedra, turning integer multiplication directly into additive path action (`manual derivation`):

   $$
   S[\Gamma_n] \;:=\; \ln n \;=\; \sum_{k=1}^{r} m_k \ln p_k \;=\; \sum_{k=1}^{r} m_k L_{p_k}.
   $$

   Each Dirichlet term $n^{-s} = e^{-\sigma S[\Gamma_n]}\,e^{-\hat{\mathbf{i}}\,t S[\Gamma_n]}$—summed directly on $\operatorname{Re}(s) > 1$ by Clause 2, and analytically continued across the critical strip $0 < \operatorname{Re}(s) < 1$ via Clause 7's alternating $\eta$ limit $(1 - 2^{1-s})^{-1}\lim_{N\to\infty}\sum_{n=0}^{N-1}(-1)^n(n+1)^{-s}$ away from $1 - 2^{1-s} = 0$—is thus a Feynman path amplitude carrying **real-axis `I` damping $e^{-\sigma S[\Gamma_n]}$** alongside an **orthogonal blindspot `i` Berry phase $e^{-\hat{\mathbf{i}}\,t S[\Gamma_n]}$**. In mathematical physics this dictionary is literal: in Julia's (1990) free relativistic "primon gas" and the Bost–Connes (1995) noncommutative quantum-statistical $C^*$-dynamical system with arithmetic Hamiltonian $\hat{H}\lvert n\rangle = (\ln n)\lvert n\rangle$ at inverse temperature $\beta = \sigma > 1$, $\zeta(\beta) = \operatorname{Tr}\bigl(e^{-\beta\hat{H}}\bigr)$ is the exact bosonic multi-particle partition function (`Literature result, not formalized in this book`)!
3. **The reciprocal $1/\zeta(s)$ is the Pauli-exclusion "fermionic exterior path integral $\Lambda^k$"**: Inverting the Euler product factor by factor on $\operatorname{Re}(s) > 1$ yields the absolutely convergent Dirichlet series of the Möbius function $\mu(n)$ (`Literature result, not formalized in this book`):

   $$
   \frac{1}{\zeta(s)} \;=\; \prod_{p \in \mathbb{P}} \bigl(1 - p^{-s}\bigr) \;=\; \sum_{n=1}^{\infty} \mu(n)\,n^{-\sigma} e^{-\hat{\mathbf{i}}\,t\ln n} \qquad (\operatorname{Re}(s) > 1).
   $$

   Inspecting the three-valued rule of $\mu(n)$ unmasks its exact Clifford exterior-algebra identity inside $\bigoplus_{k \ge 0}\Lambda^k$ (`MODEL` + `manual derivation`): the moment a trajectory steps onto the same prime arc-trihedron twice ($p^2 \mid n$), exterior self-comparison nilpotency $\mathbf{e}_p \wedge \mathbf{e}_p = 0$ annihilates the path ($\mu(n) = 0$—**strict Pauli exclusion forbidding self-intersecting double windings**); only square-free exterior wedges $\mathbf{e}_{p_1}\wedge\mathbf{e}_{p_2}\wedge\cdots\wedge\mathbf{e}_{p_k}$ of $k$ distinct prime arc-trihedra ($n = p_1 p_2\cdots p_k$) survive, carrying the alternating grade-chirality sign $\mu(n) = (-1)^k$!

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="euler-dirichlet-phasor-spiral" height="520"}
**Local Euler Winding Operators, Composite Dirichlet Phasor Spiral, and Möbius Exterior Dual (`euler-dirichlet-phasor-spiral`).** At $\sigma = 1.50,\; t = \gamma_1 \approx 14.1347$ inside the region of absolute convergence, chaining each integer arrow $n^{-\sigma}e^{-\hat{\mathbf{i}}t\ln n}$ ($n \le 160$) head-to-tail at action height $\ln n = \sum m_p\ln p$ (where prime-power rungs never share a height) brings both the violet composite path chain $\sum n^{-s}$ and the violet Euler partial product $\prod_{p \le 160}(1 - p^{-s})^{-1}$ onto the same amber continuation axis and bead $\zeta(s) \approx 0.5421 + 0.0499i$ encircled on the floor by cyan forward shells $p^{-\sigma}$ (carrying the amber $\sigma$ handle on $2^{-\sigma}$), while the magenta Möbius exterior chain $\sum\mu(n)n^{-s}$ climbs vertically without horizontal step at $n = 4, 8, 9, 12, \dots$ ($\mu = 0$) to land on the magenta bead $1/\zeta(s) \approx 1.8291 - 0.1683i$; live readouts simultaneously verify alternating $\eta$ continuation on $\operatorname{Re}(s) > 0$ (green `LEAN ✓` badges mark `prime_log_rational_independence`, `riemann_zeta_dirichlet_sum_eq_euler_product`, and `tendsto_alternating_partialSums_eta_of_ne_one`).
:::

## 31.1.2 Minimal Arc-Trihedron Anatomy of $\operatorname{Re}(s) = \frac{1}{2}$: Round-Trip Half-Density Square Law, Dual-Arm Equal-Amplitude Balance, and the Epistemic Boundary of Symmetry {#sec-ch34-28-2}

Stepping from the safe half-plane $\sigma > 1$ into the nontrivial critical strip $0 < \sigma < 1$, let us ask in path-integral terms: **what is the physical nature of a nontrivial Riemann zero $\zeta(\rho) = 0$?**

It is never an empty void, but the arithmetic culmination of *"reversal as the movement of the Dao"* from [§29.10](ch34-s09-reversal-and-concept-cascade.md#sec-ch34-reversal-diagonal-and-concept-cascade) and [§29.13](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop) (`MODEL`): infinitely many analytically continued arithmetic path phasors interfere destructively at the origin `O`, simultaneously driving both the visible real-axis projection `I` and the $90^\circ$ blindspot projection `i` to zero! Why, across the entire open strip $0 < \sigma < 1$, does the **critical line $\sigma = \frac{1}{2}$** occupy a uniquely privileged geometric spine—and where exactly lies the boundary between the proved symmetry statements and their geometric interpretation? Three interlocking mechanisms lay out the complete anatomy:

**First Mechanism — Round-Trip Double-Projection Square Law and Half-Density Unitarity: Sieve Density $p^{-1}$ Locks One-Way Amplitude to $p^{-1/2}$.** Recall the measurement law established in [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) via [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) ([@thm-ch34-roundtrip-born-and-imaginary-blindspot], `LEAN ✓`): macroscopic counting probabilities read out along the observer's real axis `I` are **round-trip Born modulus squares $\lvert\psi\rvert^2 = \cos^2\theta$** closed by projecting target-to-observer and observer-back-to-target, whereas coherent path integrals superpose **unsquared one-way spinor amplitudes $\psi$**.

In natural-number sieving and multiplicative ergodic measure, the asymptotic fraction of positive integers divisible by prime $p$—the macroscopic classical probability weight of crossing $\Delta\mathcal{T}_p$—equals $w_p = \frac{1}{p} = p^{-1}$; along continuous scale $n > 0$, the logarithmic action element $d(\ln n) = \frac{dn}{n}$ likewise assigns multiplicative Haar density $n^{-1}$ per unit scale. Demanding scale-covariant unitary probability conservation—so that $\psi_n(s) = n^{-\sigma - \hat{\mathbf{i}}t}$ transforms as a Kostant–Souriau **half-density ($\frac{1}{2}$-density)** satisfying $\lvert\psi_n\rvert^2\,dn = d(\ln n) = \frac{dn}{n}$ (`MODEL` + `manual derivation`; this is a pointwise half-density condition, and these squared moduli form no normalized probability, since $\sum_n n^{-1}$ and $\sum_p p^{-1}$ both diverge, `manual derivation`)—uniquely locks the one-way path modulus to the principal square root of the counting density:

$$
\lvert\psi_n\rvert^2 \;=\; \bigl\lvert n^{-\sigma - \hat{\mathbf{i}}\,t}\bigr\rvert^2 \;=\; n^{-2\sigma} \;=\; n^{-1} \quad \Longleftrightarrow \quad 2\sigma = 1 \quad \Longleftrightarrow \quad \sigma = \frac{1}{2}.
$$

Remarkably, the very same exponent $\frac{1}{2}$ is etched into the saddle curvature of hyperbolic geodesic flows (`Literature result, not formalized in this book`): in Selberg's trace formula (Selberg, 1956) and Gutzwiller's semiclassical periodic-orbit trace formula (Gutzwiller, 1971; cf. Berry & Keating, 1999 for the dilation generator $\hat{H}_{\mathrm{BK}} = \frac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$), a primitive periodic orbit $\gamma_p$ of action length $L_p$ (not $\ln p$ in Selberg's formula; only in the conjectural Berry–Keating picture, `OPEN`, is $L_p = \ln p$) traverses a hyperbolic saddle whose unstable transverse bundle diverges exponentially as $e^{+L_p/2}$, fixing the stationary-phase stability Jacobian prefactor $\lvert\det(I - M_p)\rvert^{-1/2}$ asymptotically at

$$
\lvert\det(I - M_p)\rvert^{-1/2} \;\sim\; e^{-L_p / 2} \;=\; e^{-(\ln p) / 2} \;=\; p^{-1/2}!
$$

**Second Mechanism — Forward–Reverse Duality ($s \leftrightarrow 1 - s$): Exact Equal-Amplitude Locking in a Two-Arm Interferometer vs. the Quartet Epistemic Boundary of Infinitary Sums.** Consider next the global reflection equation $\operatorname{xiReading}(1 - s) = \operatorname{xiReading}(s)$ from Clauses 3 and 4 of [@thm-ch34-riemann-prime-arc-bridge] (classically $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(\frac{s}{2})\zeta(s) = \xi(1 - s)$). Why does this symmetry pivot around $\sigma = \frac{1}{2}$ rather than $0$? In Riemann's 1859 derivation (`Literature result`), the functional equation arises via Mellin transformation from Poisson summation of the 1D circle heat kernel / Jacobi theta series $\vartheta(\tau) = \sum_{n \in \mathbb{Z}} e^{-\pi n^2 \tau} = \tau^{-1/2}\vartheta(\tau^{-1})$: exchanging the grade-0 ultraviolet point lattice with its dual infrared wave field introduces the 1D Gaussian path-integral square-root factor $\tau^{-1/2}$, pinning the forward–reverse symmetry axis squarely halfway between $s$ and $1 - s$ at $\frac{1}{2}$ (`MODEL`)!

Let us first perform a rigorous, self-contained algebraic test on the **forward and reverse dual branches of a single prime minimal arc-trihedron $\Delta\mathcal{T}_p$ ($p > 1$)** (`manual derivation`). Write $A_+(\sigma) := p^{-\sigma}$ for the forward shell radius and $A_-(\sigma) := p^{-(1-\sigma)}$ for the reverse dual shell radius (whose round-trip product $A_+(\sigma)A_-(\sigma) = p^{-\sigma}p^{-(1-\sigma)} = p^{-1}$ equals the invariant Born sieve density for every $\sigma \in \mathbb{R}$). Feeding both arms with arbitrary phases $\alpha, \beta \in \mathbb{R}$ into a two-arm Michelson interferometer $Z_p(\sigma; \alpha, \beta) := p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}$ yields the exact intensity identity:

$$
\begin{aligned}
\bigl\lvert Z_p(\sigma; \alpha, \beta)\bigr\rvert^2
&\;=\; p^{-2\sigma} + p^{-2(1-\sigma)} + 2p^{-1}\cos(\alpha - \beta) \\
&\;=\; \bigl(p^{-\sigma} - p^{-(1-\sigma)}\bigr)^2 + 2p^{-1}\bigl(1 + \cos(\alpha - \beta)\bigr) \;\ge\; \bigl(p^{-\sigma} - p^{-(1-\sigma)}\bigr)^2.
\end{aligned}
$$

Because $p > 1 \implies \ln p > 0$ and $1 + \cos(\alpha - \beta) \ge 0$, two sharp conclusions follow immediately (`manual derivation`):

- **Off the critical line ($\sigma \neq \frac{1}{2}$) — two-arm shell imbalance forbids single-pair cancellation**: Whenever $\sigma \neq \frac{1}{2}$, the forward shell $p^{-\sigma}$ and reverse dual shell $p^{-(1-\sigma)}$ sit at strictly unequal radii, leaving an unremovable two-arm residual floor $\lvert Z_p(\sigma; \alpha, \beta)\rvert \ge \lvert p^{-\sigma} - p^{-(1-\sigma)}\rvert > 0$; meanwhile, on $\sigma \neq \frac{1}{2}$, $\operatorname{Re}\xi(\sigma + it) = 0$ and $\operatorname{Im}\xi(\sigma + it) = 0$ remain two independent real conditions in a 2D plane (real codimension $2$).
- **On the critical line ($\sigma = \frac{1}{2}$) — $100\%$ equal-amplitude locking and codimension collapse $2 \to 1$**: Exclusively at $\sigma = \frac{1}{2}$ do both arms lock to identical half-density radii $p^{-1/2} = p^{-(1-1/2)}$, allowing exact two-arm nulling the instant $\alpha - \beta \equiv \pi \pmod{2\pi}$ ($e^{i(\alpha-\beta)} = -1$)! Better still, for the global completed reading on $s = \frac{1}{2} + it$ ($t \in \mathbb{R}$), one has $1 - \bar{s} = \frac{1}{2} + it = s$, so Clause 4 of [@thm-ch34-riemann-prime-arc-bridge] (`xi_reading_one_sub_conj`) forces identically:

  $$
  \overline{\operatorname{xiReading}\!\left(\tfrac{1}{2} + it\right)} \;=\; \operatorname{xiReading}\!\left(1 - \overline{\bigl(\tfrac{1}{2} + it\bigr)}\right) \;=\; \operatorname{xiReading}\!\left(\tfrac{1}{2} + it\right) \;\Longrightarrow\; \operatorname{Im}\operatorname{xiReading}\!\left(\tfrac{1}{2} + it\right) \;=\; 0!
  $$

  The orthogonal imaginary component vanishes identically along the entire critical line, collapsing a 2D complex curve onto the 1D real axis (mirroring Hardy's real $Z(t) \in \mathbb{R}$ with $\lvert Z(t)\rvert = \lvert\zeta(\frac{1}{2}+it)\rvert$ and dropping zero codimension from $2$ to $1$): every odd-half-cycle Berry phase advance that flips the sign of $\operatorname{xiReading}(\frac{1}{2}+it)$ topologically traps a genuine zero right on $\sigma = \frac{1}{2}$ by the intermediate value theorem!

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="critical-zero-cancellation" height="520"}
**Critical-Line $\sigma = \frac{1}{2}$ Half-Density Shell Locking and Exact Nulling at the First Five Zeros (`critical-zero-cancellation`).** Holding $\sigma = 0.50$ and stepping across the five verified zero capsules $\gamma_1 \approx 14.1347$ through $\gamma_5 \approx 32.9351$: on the floor, the cyan forward shells $p^{-1/2}$ and magenta dual shells $p^{-(1-1/2)}$ ($p = 2, 3, 5, 7$) coincide pair by pair while $\operatorname{Im}(\xi/\lvert G\rvert)$ vanishes identically; as the violet path chain $\sum n^{-s}$ climbs and opens with action $\ln n$, the dashed ink remainder at its top pulls it back onto the amber continuation axis passing straight through the origin `O`, seating the amber bead $\zeta(\frac{1}{2}+i\gamma_k)$ squarely in `O` ($\lvert\zeta\rvert = 0.0000$; amber highlights the active zero capsule $\gamma_k$ and $\sigma$ handle, while green `LEAN ✓` badges mark `xi_reading_reflection` and `xi_reading_one_sub_conj`).
:::

**Epistemic Honesty Guardrail: Why Two-Arm Balance Plus the Functional Equation Does Not Yet Prove the Riemann Hypothesis.** Having witnessed how cleanly single-pair balance and codimension collapse operate on $\sigma = \frac{1}{2}$, we must sound the monograph's strictest formal alarm (connecting [Chapter 22 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4) [@thm-full-symmetry-not-localization] and [@conj-riemann-hypothesis]): while a **two-arm** prime interferometer $p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}$ can never vanish for $\sigma \neq \frac{1}{2}$, $\xi(s)$ is an **infinitary multi-path superposition**! Clause 5 of [@thm-ch34-riemann-prime-arc-bridge] (`full_symmetry_not_fixed_line_localization`) refutes any shortcut claiming global symmetry alone suffices: the quartic entire counterexample $\operatorname{offCriticalQuartic}(\delta, \gamma_0)$ obeys $F(1 - s) = F(s)$, $F(\bar{s}) = \overline{F(s)}$, and $F(\frac{1}{2}+it) \in \mathbb{R}$, yet harbors a symmetric **four-tuple of conspiring off-line zeros**

$$
\rho_{\mathrm{rogue}} \;=\; \frac{1}{2} \pm \delta \pm i\gamma_0 \qquad (\delta \neq 0,\; \gamma_0 \neq 0)!
$$

Historically, Davenport and Heilbronn (1936) likewise constructed Dirichlet linear combinations satisfying a Riemann-type functional equation and critical-line reality that nonetheless possess infinitely many off-critical zeros precisely because they **lack an Euler product** (`Literature result, not formalized in this book`). Put plainly: half-density unitarity and dual-arm balance explain why $\sigma = \frac{1}{2}$ is the unique unitary symmetry spine (`MODEL`). That infinitely many zeros do lie on the critical line is Hardy's theorem (1914; `Literature result, not formalized in this book`); the picture above shows only that each sign change of the real-valued function yields a zero, not that there are infinitely many sign changes. To exclude off-line quartets $\tfrac12\pm\delta\pm i\gamma_0$ by dual-arm balance, the geometric model would still need a way to carry the **multiplicative positivity of the Euler product** from $\sigma>1$ across the pole at $s=1$. The next section explores this step through multiplicative Schur pivots and multi-stage resonant tunneling. [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)

**Third Mechanism — Möbius Exterior Random-Walk Scaling: Littlewood's Equivalence Theorem and the Unbiased $\sqrt{x}$ Envelope.** From the complementary fermionic exterior series $1/\zeta(s) = \sum_{n \ge 1}\mu(n)n^{-s}$, J. E. Littlewood (1912) proved that the Riemann Hypothesis ([@conj-riemann-hypothesis]) is strictly equivalent to the square-root asymptotic bound on Mertens' summatory Möbius function (`Literature result, not formalized in this book`):

$$
\text{Riemann Hypothesis} \quad \Longleftrightarrow \quad \forall \varepsilon > 0,\;\; M(x) \;:=\; \sum_{1 \le n \le x} \mu(n) \;=\; \mathcal{O}_\varepsilon\!\bigl(x^{\frac{1}{2} + \varepsilon}\bigr).
$$

Viewed alongside the minimal-arc quadratic scaling law of [§29.12](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) (`MODEL`), $x$ mutually orthogonal, unbiased exterior steps ($\mu(n) \in \{-1, 0, +1\}$) naturally accumulate a Brownian root-mean-square envelope $\sqrt{x} = x^{1/2}$ (treating $\mu(n)$ as independent random steps is only a model: $\mu(n)$ is a deterministic arithmetic function whose steps are not independent, and the rigorous counterpart is Littlewood's equivalence above); if even one rogue quartet lurked at $\sigma_0 = \frac{1}{2} + \delta > \frac{1}{2}$, prime-staircase and Möbius fluctuations would swell to order $x^{\sigma_0}$, betraying long-range phase conspiracy across distinct prime arc-trihedra. Let us benchmark the first five critical-line zeros and off-critical dual-shell splitting to verified 100-digit working precision:

::: {.example #ex-ch34-critical-zeros-and-dual-shells title="Exact Critical-Line Nulling at the First Five Riemann Zeros vs. Off-Critical $\sigma = 0.38 / 0.62$ Dual-Shell Imbalance"}
Working at 100-digit precision, we benchmark $\lvert\zeta(\sigma + i\gamma_k)\rvert$ across the first five nontrivial zero ordinates $\gamma_1, \dots, \gamma_5$ together with the forward and reverse shell radii on the first four prime minimal arc-trihedra (`manual derivation` / `NUM`):

1. **Exact critical-line nulling at $\sigma = 0.50$ vs. detuned residual moduli at $\sigma = 0.62$ and $1 - \sigma = 0.38$**:
   Ordinates $\gamma_k$ are displayed to ten decimal places, while $\lvert\zeta(\sigma + i\gamma_k)\rvert$ is evaluated at 80-digit true zero ordinates and rounded to six decimal places (at 80-digit $\gamma_k$, every critical-line residual satisfies $\lvert\zeta(0.50 + i\gamma_k)\rvert < 4\times 10^{-79}$; even if evaluated directly at the ten-decimal truncated ordinates $\tilde{\gamma}_k$ printed below, first-order derivative truncation yields $3\times 10^{-11}\text{–}6\times 10^{-11}$, still $0.000000$ to six decimals):

| Zero Index $k$ | Critical Zero Ordinate $\gamma_k$ (10 d.p.) | Critical Modulus $\lvert\zeta(0.50 + i\gamma_k)\rvert$ (80-d.p. Residual) | Right-Detuned $\lvert\zeta(0.62 + i\gamma_k)\rvert$ | Left-Dual $\lvert\zeta(0.38 + i\gamma_k)\rvert$ |
| :---: | :---: | :---: | :---: | :---: |
| **$1$** | $14.1347251417$ | $0.000000$ ($1.86\times 10^{-79}$) | $0.090700$ | $0.099965$ |
| **$2$** | $21.0220396388$ | $0.000000$ ($2.28\times 10^{-79}$) | $0.127009$ | $0.146815$ |
| **$3$** | $25.0108575801$ | $0.000000$ ($3.81\times 10^{-79}$) | $0.151691$ | $0.179040$ |
| **$4$** | $30.4248761259$ | $0.000000$ ($1.04\times 10^{-79}$) | $0.142626$ | $0.172347$ |
| **$5$** | $32.9350615877$ | $0.000000$ ($8.21\times 10^{-81}$) | $0.150479$ | $0.183574$ |

   Notice an instructive quantitative detail across all five rows: although $0.38 = 1 - 0.62$ is the exact reflection partner of $0.62$ so that the completed function obeys $\lvert\xi(0.38 + i\gamma_k)\rvert = \lvert\xi(0.62 + i\gamma_k)\rvert$, stripping away the archimedean Gamma factor $\pi^{-s/2}\Gamma(s/2)$ amplifies the bare left-hand modulus $\lvert\zeta(0.38 + i\gamma_k)\rvert$ above $\lvert\zeta(0.62 + i\gamma_k)\rvert$—by Stirling's asymptotic ratio $\lvert\zeta(1 - \sigma + it) / \zeta(\sigma + it)\rvert \sim (t / 2\pi)^{\sigma - 1/2}$, at $k = 1$ one predicts $(\gamma_1 / 2\pi)^{0.12} \approx (2.249611)^{0.12} \approx 1.10218$, matching the exact ratio $0.099965 / 0.090700 \approx 1.10215$ to within three parts in $10^4$!

2. **Forward and reverse dual shell radii $(p^{-\sigma}, p^{-(1-\sigma)})$ and the invariant Born product for $p \in \{2, 3, 5, 7\}$**:
   Comparing detuned abscissae $\sigma = 0.38$ and $\sigma = 0.62$ (which swap forward and reverse shells) against critical balance $\sigma = 0.50$ to six decimal places:

| Prime $p$ | $\sigma = 0.38$ Shells $(p^{-0.38},\, p^{-0.62})$ | $\sigma = 0.62$ Shells $(p^{-0.62},\, p^{-0.38})$ | $\sigma = 0.50$ Balance $p^{-1/2}$ | Shell Gap $\lvert p^{-0.38} - p^{-0.62}\rvert$ | Round-Trip Density $p^{-\sigma}p^{-(1-\sigma)} = p^{-1}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$2$** | $(0.768438,\; 0.650671)$ | $(0.650671,\; 0.768438)$ | $0.707107$ | $0.117767$ | $0.500000$ |
| **$3$** | $(0.658709,\; 0.506040)$ | $(0.506040,\; 0.658709)$ | $0.577350$ | $0.152670$ | $0.333333$ |
| **$5$** | $(0.542490,\; 0.368671)$ | $(0.368671,\; 0.542490)$ | $0.447214$ | $0.173819$ | $0.200000$ |
| **$7$** | $(0.477378,\; 0.299253)$ | $(0.299253,\; 0.477378)$ | $0.377964$ | $0.178125$ | $0.142857$ |

   Regardless of how far $\sigma$ drifts, every row preserves the exact round-trip sieve product $p^{-\sigma}p^{-(1-\sigma)} = p^{-1}$; yet detuning $\sigma$ by $\pm 0.12$ away from $0.50$ immediately pries open shell gaps of $0.117767$ to $0.178125$ across $p = 2, 3, 5, 7$, ejecting the spiral endpoint from the origin to non-zero residual moduli between $0.090700$ and $0.183574$!
:::

Dragging the real-part slider away from $\sigma = 0.50$ to $\sigma = 0.62$ or $\sigma = 0.38$ in the experiment card below places the dual-shell splitting of [@ex-ch34-critical-zeros-and-dual-shells] side by side with the `offCriticalQuartic` four-tuple counterexample:

::: {.viz src="riemann-prime-arc-path-integral-sandbox" preset="off-line-shell-imbalance" height="520"}
**Off-Critical ($\sigma = 0.38 / 0.62$) Dual-Shell Splitting and Rogue-Quartet Epistemic Contrast (`off-line-shell-imbalance`).** Dragging the amber handle or $\sigma$ slider off $0.50$ (opening at $\sigma = 0.62,\; t = \gamma_1$, or symmetrically at $\sigma = 0.38$): on the floor, the cyan forward shells $p^{-\sigma}$ ($2^{-0.62} \approx 0.6507$) and magenta dual shells $p^{-(1-\sigma)}$ ($2^{-0.38} \approx 0.7684$) split apart, shifting the axis of the violet path spiral and displacing the amber continuation axis and bead $\zeta(s)$ off `O` to $\lvert\zeta(0.62 + i\gamma_1)\rvert \approx 0.0907$, while the right-hand readout and evidence panels evaluate the symmetric off-line quartic $F(s)$ of `full_symmetry_not_fixed_line_localization` at $\delta = \sigma - \frac{1}{2},\; \gamma = t$. The RH status shown on this card, including the red `OPEN` badge, evidence panel, and readout notes, dates from before the external verification.
:::

## 31.1.3 The Arithmetic 1—3—3—1 Concept Tower and Weil's Explicit Duality: Primes Carve Zeros, Zeros Sculpt Primes {#sec-ch34-28-3}

Placing the Riemann $\zeta$ path-integral system inside the `1—3—3—1` (Point · Line · Area · Volume $\leftrightarrow$ Particle · Wave · Field · New Spectral Point) octave hierarchy established in [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) reveals a grade-by-grade structural correspondence between quantum spacetime trajectories and arithmetic prime geometry (`MODEL`, formatted in single-line cells):

| Concept-Tower Grade | Spacetime Path-Integral Language | Arithmetic Riemann Path-Integral Language | Minimal Arc-Trihedron Geometric Mechanism |
| :--- | :--- | :--- | :--- |
| **Grade 0 Point Core $\Lambda^0$** | Irreducible elementary particle anchor / quantum gate cell | **Primes $p \in \{2, 3, 5, 7, \dots\}$** | Step lengths $L_p = \ln p$ are $\mathbb{Q}$-linearly independent; $\mu(p^2) = 0$ enforces Pauli exclusion |
| **Grade 1 Line Element $\Lambda^1$** | Composite worldline (action $S = \int L\,dt$) | **Natural-number paths $n = \prod p_j^{m_j}$** | Multiplication turns via $\ln$ into additive arc action $S[\Gamma_n] = \ln n = \sum m_j \ln p_j$ |
| **Grade 2 Area Element $\Lambda^2$** | Coherent Feynman wavefront and Cornu interference spiral | **Riemann–Siegel polygonal phasor spiral** | Adjacent steps subtend minimal-arc turn angles $\Delta\phi_n = t\ln\bigl(1 + \frac{1}{n}\bigr) \approx \frac{t}{n}$ |
| **Grade 3 Volume / New Point $\Lambda^3 \equiv \Lambda^0_{\mathrm{spec}}$** | Single-valued standing-wave volume $\leftrightarrow$ energy eigenvalue | **Completed $\xi(s)$ field $\leftrightarrow$ nontrivial zero spectrum** | On the $\sigma = \frac{1}{2}$ half-density shell, dual arms balance and real sign flips pinch discrete spectral points |

Bridging the base of this four-grade tower (Grade-0 prime cells $\Lambda^0$) and its crown (Grade-3 spectral standing waves $\Lambda^3 \equiv \Lambda^0_{\mathrm{spec}}$) stands the crown jewel of analytic number theory—the **Explicit Formula**, proving that the prime-power staircase and the Riemann zero spectrum are exact Fourier–Mellin duals of each other:

- **Kernel-verified unconditional integrated explicit formula (Clause 6 of [@thm-ch34-riemann-prime-arc-bridge], `LEAN ✓`)**: Without assuming the Riemann Hypothesis, at every strictly positive logarithmic action point `0 < y` ($y = \ln x > 0$, i.e., scale $x = e^y > 1$), the weighted Laplace sum $\operatorname{actualH}(y) = \sum_{k \in \mathbb{N}} \frac{e^{y\rho_k}}{\rho_k(1 - \rho_k)}$ over all actual nontrivial zeros counted with multiplicity equals the arithmetic Mertens–Chebyshev discrepancy $U(e^y) - \ln(2\pi) + \operatorname{trivialT}(y)$ unconditionally!

- **The remainder modulo $1$ and a window bound under RH.** The Dirichlet character modulo $1$ is identically $1$. For $x\ge 1$ both sums run over $I_x=\{1,\ldots,\lfloor x\rfloor\}$, including the right endpoint when $x$ is an integer. Expanding each summand and using $\psi(x)=\sum_{n\in I_x}\Lambda(n)$ gives

  $$
  \sum_{n\in I_x}\Lambda(n)\left(\frac{x}{n}-1\right)
  =x\sum_{n\in I_x}\frac{\Lambda(n)}{n}-\psi(x).
  $$

  Adding $-x\ln x+(1+\gamma_{\mathrm{EM}})x$ to both sides gives $G_z(x)=U(x)$ (`manual derivation`), where $G_z$ is the modulus-one remainder and $U$ is the function of [@def-divisor-ratio-mertens-error]. [External definition `Formalism.Gz`](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/StatementOC.lean#L9-L13) · [`U_eq_complete_ramps`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtLaplace.U_eq_complete_ramps)

  Assume the Riemann hypothesis. Set $G(y)=e^{-y/2}U(e^y)$ and $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$. The first conclusion of `actual_G_control` says that for each $\varepsilon>0$, all sufficiently large real $y$ satisfy $\lvert G(y)\rvert<M+\varepsilon$. [Lean declaration](lean:D5/S3/Weil/Mertens/IntegratedExplicit/RHSharpActualEnvelope.actual_G_control)

  Since $M<1$, take $\varepsilon=1-M>0$ to get $\lvert G(y)\rvert<1$ for all sufficiently large $y$. Substituting $y=\ln x$ gives a threshold $Y_0>1$ such that $\lvert U(x)\rvert<\sqrt{x}$ for all $x\ge Y_0$. The same threshold works for every $\theta\ge 1/2$. For every $Y\ge Y_0$ and every $x\in[Y,Y^{3/2}]$, we have $U(x)\le\lvert U(x)\rvert<\sqrt{x}\le x^\theta$ (`manual derivation`). [Constant bound `firstLiMass_lt_one`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.firstLiMass_lt_one)

  The external argument starts from an arithmetic estimate. Modulo $1$, the cyclic group generated by the trivial character contains only $1$. The set of characters retained by `Level.cyc` is therefore $\{1\}$. Removing that character leaves an empty sum, so the remainder reduces to $G_m(x)=G_z(x)=U(x)$ (`manual derivation`). [Cyclic character set](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L105-L125) · [Definition of the remainder](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L32-L38)

  Fix $1/2<\theta<1$. Under its Chebyshev-type inequality and window hypotheses, the arithmetic argument gives a one-sided bound. For every threshold $R$, there is some $Y\ge R$ such that $U(x)\le x^\theta$ throughout $[Y,Y^{3/2}]$. Landau's criterion then shows that $\zeta$ has no zeros in $\operatorname{Re}(s)>\theta$. The bound derived from RH covers every sufficiently large $Y$. [Arithmetic step](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L68-L81) · [Window exponent](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/EveryCharacter.lean#L8-L11) · [Landau criterion](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ZeroFreeOfRpowWindow.lean#L11-L14)

::: {.theorem #thm-ch31-mangoldt-power-threshold title="The critical power exponent for the complete Mangoldt remainder" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPowerThreshold.u_div_rpow_tendsto_zero_iff"}
Assume the Riemann hypothesis. For every real $\theta$, with $x$ tending to $+\infty$ through real values,

$$
\lim_{x\to+\infty}\frac{U(x)}{x^\theta}=0
\quad\Longleftrightarrow\quad \theta>\frac12.
$$
:::

::: proof
Write $x=e^y$. Then $U(x)/x^\theta=G(y)e^{(1/2-\theta)y}$. If $\theta>1/2$, $G$ is bounded on a real tail and the exponential factor tends to zero. Conversely, suppose $\theta\le1/2$. The constant $M$ above is strictly positive. By recurrence of $G$, beyond every threshold there is a natural number $n$ with $G(n)>M/2$. Since $e^{(1/2-\theta)n}\ge1$, the quotient exceeds $M/2$ at arbitrarily large $x=e^n$, including when $\theta=1/2$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-mangoldt-quartic-sampling title="A fourth-power sampling criterion for the Riemann hypothesis" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_eventually_quartic_samples"}
The Riemann hypothesis holds if and only if there exists $N\in\mathbb N$ such that $U(n^4)<n^2$ for every $n\in\mathbb N$ with $n\ge N$.
:::

::: proof
Under RH, every sufficiently large $x$ satisfies $\lvert U(x)\rvert<\sqrt{x}$. Setting $x=n^4$ gives the strict sample bound.

Conversely, assume the sample bound. For sufficiently large $n\ge1$ put $a=n^4$ and $b=(n+1)^4$. Each Mangoldt weight is nonnegative, so multiplying the convex ramp $\max(x/j-1,0)$ by the weight preserves convexity. The sum of the ramps lies below its endpoint chord on $[a,b]$. The remainder $U$ also contains $-x\ln x$ and a linear term. Subtract the tangent to $x\ln x$ at $a$ from $x\ln x$. The difference is nonnegative, and $\ln(b/a)\le b/a-1$ bounds its value at $b$ by $(b-a)^2/a$. Thus for $a\le x\le b$,

$$
U(x)\le\max\{U(a),U(b)\}+\frac{(b-a)^2}{a}
\le 4n^2+225n^2=229n^2.
$$

Here $(n+1)^2\le4n^2$ and $b-a\le15n^3$. Consecutive sample intervals cover the whole tail, and $n^2\le\sqrt{x}$. Apply the bound to the normalized arithmetic kernel of the integrated explicit formula with $x=e^t$. The trivial-zero correction satisfies $\operatorname{trivialT}(t)\le1-\ln2$, so $e^{-t/2}[U(e^t)-\ln(2\pi)+\operatorname{trivialT}(t)]\le229+e^{-t/2}\le230$ for all sufficiently large $t$. The affine upper-bound criterion for the arithmetic kernel now gives RH. The full proof is checked by the Lean kernel.
:::

The arithmetic input can be stated in terms of the prime-power counting function. For $x\ge2$ the Chebyshev error kernel is integrable and its tail integral equals $-U(x)/x$. At $x=n^4$, the sample hypothesis therefore amounts to proving the strict lower bound $\int_{n^4}^{\infty}(\psi(t)-t)t^{-2}\,dt>-1/n^2$ for every sufficiently large natural number $n$ (`manual derivation`). [`complete_chebyshev_tail_identity`](lean:D5/S3/Weil/Mertens/CompleteChebyshevTailIdentity.complete_chebyshev_tail_identity) · [`chebyshev_error_kernel_integrable`](lean:D5/S3/Weil/Mertens/WeightedPrimeLimit.chebyshev_error_kernel_integrable)

Arbitrarily late power windows also admit a finite set of tests. For $2\le Y\le Z$, write

$$
S(Y,Z)=\{Y,Z\}\cup\{n^4:n\in\mathbb N,\ Y\le n^4\le Z\}.
$$

Including both endpoints provides bounds at the edges of the window even when neither endpoint is a fourth power.

::: {.theorem #thm-ch31-quartic-power-windows title="Testing the endpoints and fourth powers in arbitrarily late power windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_quartic_power_windows"}
Fix a real $b>1$. The Riemann hypothesis holds if and only if for every $\kappa>0$ and every real $R$ there exists $Y\ge\max\{R,2\}$ such that $U(t)\le t^{1/2+\kappa}$ at every $t\in S(Y,Y^b)$ in that same window.
:::

::: proof
Under RH, [@thm-ch31-mangoldt-pointwise-power-window] supplies the bound throughout the window and hence at the samples. Conversely, given a loss $\kappa>0$, use $\delta=\min\{\kappa/2,1/2\}$ at the samples and put $p=1/2+\delta\le1$. For $x\in[Y,Z]$, bracket $x$ between consecutive fourth powers $n^4,(n+1)^4$ with $n\ge1$ and intersect this bracket with $[Y,Z]$ to get $[a,z]$. Both endpoints lie in $S(Y,Z)$. The chord bound for the ramps and the tangent estimate for the logarithmic term give an error at most $(z-a)^2/a\le225n^2$, since $a\ge n^4$ and $z-a\le15n^3$. Each endpoint raised to the power $p$ is at most $16x^p$, and $n^2\le x^p$, so $U(x)\le241x^p$. Choose a sufficiently late sample window to ensure $x^{\kappa-\delta}\ge241$ throughout it. This gives the pointwise bound of [@thm-ch31-mangoldt-pointwise-power-window]. The full proof is checked by the Lean kernel.
:::

When the endpoints are themselves fourth powers, integer indices enumerate every sample.

::: {.theorem #thm-ch31-quartic-integer-blocks title="An integer-block fourth-power criterion for the Riemann hypothesis" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_quartic_integer_blocks"}
The Riemann hypothesis holds if and only if for every real $\kappa>0$ and every natural number $A$ there is a natural number $k\ge\max\{A,2\}$ such that every natural number $n$ with $k^3\le n\le k^4$ satisfies

$$
U(n^4)\le (n^4)^{1/2+\kappa}.
$$
:::

::: proof
Under RH, [@thm-ch31-mangoldt-quartic-sampling] gives $U(n^4)<n^2$ for every sufficiently large $n$. Choose $k\ge\max\{A,2\}$ past that threshold. Every $n$ in the block satisfies $n\ge k^3\ge k$, so $U(n^4)<n^2=(n^4)^{1/2}\le(n^4)^{1/2+\kappa}$.

Conversely, given a loss $\kappa>0$ and any real starting bound $R$, take a natural number $A\ge R$ and choose $k$ from the block condition. Set $Y=k^{12}$. Then $Y\ge R$ and $Y^{4/3}=k^{16}$. The endpoints are $(k^3)^4$ and $(k^4)^4$. Since fourth powers are strictly increasing on the natural numbers, the endpoints and all fourth powers between them are precisely the values $n^4$ in this integer block. Applying [@thm-ch31-quartic-power-windows] with $b=4/3$ gives RH. The full proof is checked by the Lean kernel.
:::

The joint external Lean environment also checks a finite set of same-host tests. The set `samples Y Z` enumerates $0\le n\le\lfloor\sqrt{\sqrt Z}\rfloor$, keeps the fourth powers inside the window, and includes both endpoints. Fix $b>1$. For each $\kappa>0$ first choose $\varepsilon>0$ and real constants $e_D,e_L,K,c_{HH},e_K$ with $(e_D+e_L+7)\varepsilon\le\kappa$. Beyond any starting bound, choose a window. Each sampled $t$ may have its own frame, host $H$ and finite set $T$. At that point `EAtH` for the unit character with coefficient $4$ and `CoreAtH` must use the same $H,T$. The reference consumer `of_unit_family` extracts these data from `FamilyClassConnected ((GChi PChar.one).cls b)`, and `rh_of_finite_hosts` deduces RH from them. There are finitely many tests on each window. For every fixed loss the arithmetic hypothesis must still supply windows arbitrarily far out and the witnesses on them. [Pointwise comparison on a common host](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061455789) · [Kernel replay for finite samples and the host implication](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061515678)

At $b=3/2$ the original modulus-one design takes $C_{\mathrm{abs}}=2$ and $C_0=3$ and specifies $e_D=2$, $e_L=0$. The `TopG` interface records only the existence of the two exponents. The Lean 4.33.1 proof starts from the original Galois row and uses `BookDesignIntegerBlocks.of_design` at the design step to retain the specified values. This gives the closed declaration `BookFixedReference.unit_family`. Its consequence `BookFixedReference.fixed_integer_blocks` gives some $\varepsilon_1>0$. For each $0<\varepsilon<\varepsilon_1$ it first fixes $K,c_{HH},e_K$ and then, for every natural lower bound $A$, supplies $k\ge\max\{A,2\}$. For every natural $n$ with $k^3\le n\le k^4$, `EAtH` and `CoreAtH` use the same host and finite set at $x=n^4$. The power exponent in the comparison is $1/2+(2+0+7)\varepsilon=1/2+9\varepsilon$. Given $\kappa>0$, choosing $\varepsilon$ small enough that $9\varepsilon\le\kappa$ gives the condition of [@thm-ch31-quartic-integer-blocks]. [Original design with fixed exponents](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061662378) · [Kernel replay of fixed-exponent blocks from the Galois row](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7064831569)

The declaration in Alpöge’s original proof is `riemannHypothesis : RiemannHypothesis`, with Mathlib’s definition on the right. Sutherland’s public audit lists the declaration’s three axioms as `propext`, `Classical.choice`, and `Quot.sound`. The arithmetic modules used here are pinned at `ddf1d5f8`, which has the same `src` tree, Lean toolchain, and Lake manifest as `6977b88c`, the commit documenting the public verification. [Axiom audit of the original proof](https://math.mit.edu/~drew/grh/audit.log) · [Public verification files](https://math.mit.edu/~drew/grh/)

The local integer-block modules `DesignIntegerBlocks` and `RawDesignIntegerBlocks` each passed a targeted replay. In Lean 4.35.0, `BookNativeDesign.rh_of_unit_design` assumes existence of the smooth twisted design, two inclusions between family classes, and nine closure estimates. The unit-character class supplies `HypV`. The construction in `topDesWin` retains the given $e_D,e_L$. Given a target loss $\kappa>0$, choose $\varepsilon>0$ sufficiently small that $(e_D+e_L+7)\varepsilon\le\kappa$, then choose $k$ at least as large as the threshold for the comparison estimate `core_gm`. Every $n^4\ge k$ in the block is then in range, and [@thm-ch31-quartic-integer-blocks] gives RH. [Kernel replay from the design hypotheses to the frozen integer-block criterion](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7064767463)

In the same Lean 4.35.0 environment, let `C` be a family class. Applying the choice provider `MinkDiv → DesignChoices C 3 cT` to the rational Minkowski divisibility bound `minkowski_bound_rat` gives the family choices. The thin-scale estimate `GlobalTheory.ThinScaleLiterature.litThin` gives `chosenThin_closed`. For each family `Fm`, the size estimate `cT ε Fm.CYL ≤ Fm.CTu → TuSize Fm` and the character proviso `ChosenProviso Fm 3` must both be closed on `C`. With these inputs, `designExists_of_choices` gives `DesignExists C 3`.

The family class determines the application. The theorem `BookNativeRawDesign.arithmetic_design_of_reference_choice` lifts the original twist choices on `GlobalTheory.EX.DC.WithTw 𝒜` to `WithTw (WithSm (Enriched 𝒜))`. The two closure conditions on that enriched class then give its design. The theorem `BookNativeRawDesign.rh_of_arithmetic_choices` takes choices on `C = WithTw (WithSm 𝒞')` and the two closure conditions there, with $C_{\mathrm{abs}}=2,C_0=3,e_D=2,e_L=0$. Adding the two family inclusions and nine closure estimates gives RH via the frozen integer-block criterion. [Kernel replay of the arithmetic choices, thin-scale estimate, and two conditional theorems](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065062798)

For a reference family, the lattice rank condition used in the character proviso can be expressed as a dimension count. The external Lean 4.35.0 research source proves the following equivalence in `BookNativeLowestSpace.rank_iff_eventual_dimension`. For each reference family `Fm`, `RankTiesF Fm` holds if and only if there is a real threshold $x_0$ such that, for every $x\ge x_0$, every index $i\in\mathrm{Fm.Ix}(x)$ and every word $u$ of the datum $D=\mathrm{Fm.D}(x,i)$, we have

$$
\dim_{\mathbb C}\mu_0(D,u)
= \lvert\mathrm{cls}_{D,u}(0)\rvert
  \prod_{\rho}\mathrm{dimV}\bigl(\mathrm{uColR}(D,u,\rho)\bigr).
$$

The left side is the complex dimension of the lowest space. The right side counts the level-zero classes and multiplies that count by one local factor for each $\rho$. The reference data ensure that both host primes and the level prime of $u$ split completely in the totally real host field. Starting from the rank condition, raise its threshold to $\max\{x_0,3,x_1+1\}$, where $x_1=\mathrm{Fm.x1}$. This supplies both `GBig` and the level data, so the column stabilizers are trivial and the rank condition gives the displayed equality. Conversely, the equality and the known splitting give the rank condition at the threshold of the equality itself.

The local theorem `BookNativeLowestSpace.design_of_lowest_dimension` takes arithmetic choices on the original twisted class and requires three conditions to be closed on the enriched class `WithTw (WithSm (Enriched 𝒜))`. They are the size condition above, the class-number formula `ClassNumberFormula₂` for every $x>x_1$ and every index, and the eventual dimension identity. Together they give a design at parameter $3$ on the enriched class. [Source and kernel replay for the lowest-space rank equivalence and conditional design](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065658421)

In the external Lean 4.35.0 lattice construction, for every datum `D : D7` and level `Lv : LevelData D`, `GlobalTheory.ColClassNumber.classNumber_all` proves `ClassNumberFormula₂ D Lv` using a self-dual overlattice and the stabilizer level-index formula. The counting identity in this formula holds under its large-prime and splitting hypotheses. Given `TwistSelection 𝒜`, `tied_families_of_choice_alt` directly gives the second Chern class compatibility, from which `second_chern_linked_closed_rank_ties` gives the closed rank condition. The twist selection itself supplies the data for this step, with no separate `Duty` hypothesis.

Thus `BookNativeClosedLattice.design_from_twist_selection` takes just the choice provider on the original twisted class, the size estimate `cT ε Fm.CYL ≤ Fm.CTu → TuSize Fm` with its family-dependent threshold and closure on the enriched class, and `TwistSelection 𝒜`. It gives `DesignExists (WithTw (WithSm (Enriched 𝒜))) 3`. Setting $C_0=3$ and taking `Enriched 𝒜` as the underlying class $\mathcal C'$ supplies the design for the native RH theorem above. That theorem also uses the two family inclusions and nine closure estimates before applying the book’s frozen integer-block criterion. [Research source and kernel replay for the design from twist selection](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065978544)

For the modulus-one character, the two inclusions are projections. Given a base class $B$, let $\mathcal A$ be its intersection with the modulus-one family class at window exponent $3/2$. Membership in `Enriched 𝒜` supplies both components of membership in $\mathcal A$, hence membership in $B$ and in the modulus-one class. The equivalence `BookUnitDesignConnection.twist_selection_iff` characterizes existence of the twist selection. Each family `Fm` in $\mathcal A$ has its own real threshold $x_0$. At every scale with $x>x_1$ and $x\ge x_0$, each index $i$ must admit an `ExtraDataRecursive` record. Conversely, choosing one such record at every required index gives the twist selection for the family. [The unit-class projections and the record criterion](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7066410252)

The reference construction `UpperTheory.Top.designS` has been replayed on Lean 4.35.0. In `BookUnitKits.rh_of_unit_kits`, the base class `Linked Q` requires a parameter $\kappa$ to which the family is linked and whose point-class condition $Q(\kappa)$ it satisfies. For the modulus-one character, `designS` combines the pointwise arithmetic hypothesis `KitCPW` with the proved Minkowski divisibility bound to supply the original twisted choices. Four inputs remain for this native RH theorem. They are the unit-character `KitCPW`, the closed thresholded size estimate on the twisted smooth enrichment, eventual recursive records for the linked modulus-one families, and the nine closure estimates on `Des (Linked Q) 3`. The construction `UpperTheory.Top.kitS` in turn obtains the required `KitCPW` from the unit-character window-host hypothesis `DC.HostWW` and the arithmetic object condition `ObjCP` at each required index. [Twisted choices from the pointwise hypothesis](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7066607957) · [Pointwise kits from window hosts and arithmetic objects](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7067228472)

The original library and the book’s integer-block argument share the original Galois row. The library first proves `EveryCharacter`, the nonvanishing of Dirichlet $L$-functions for characters of every positive modulus in $\operatorname{Re}(s)>1/2$, with $s=1$ excluded for the principal character. It then deduces RH by `rh_of_every`. The book specializes the arithmetic row to the modulus-one family and obtains integer blocks via `BookIntegerHostBlocks.of_reference`. The arithmetic module supplies only `TopG` to this argument. In the reference library’s Lean 4.33.1 environment, `leanchecker` replayed the arithmetic module, the final conclusion module, and an independent audit module. The audit file `IntegerBlockAudit.lean` checked the declaration `BookReference.riemannHypothesis_via_integer_blocks : RiemannHypothesis` against Mathlib’s statement and printed the following proof term. [The original library’s deduction of RH from all characters](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Supplements/Kernels/MainTheorems.lean#L7-L9)

```lean
BookIntegerHostBlocks.rh_of_blocks
  (BookReference.integer_blocks_of_row
    UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter)
```

In Lean 4.33.1 the book uses the independently replayed reference arithmetic to close the modulus-one integer-block proof of RH with no additional hypotheses. The arithmetic inputs listed above belong to the conditional theorems of the native Lean 4.35.0 port. The closed declaration’s only axioms are `propext`, `Classical.choice`, and `Quot.sound`. The entry point imports neither `Main` nor `MainConclusion` from the original library. The frozen fourth-power window criterion cited in this section comes from the book’s Lean 4.35 environment. [Public replays of the reference proof](https://github.com/the-omega-institute/riemann-hypothesis/blob/1ef6c4e2e944fb2784ecf3168a84810bf50ca6db/README.md#public-kernel-replay-results) · [Complete integer-block proof and kernel replay](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7063096204)

The same reference Galois row also gives two bounds with a common witness. For every real $\eta>0$ and natural number $A$, `BookArithmeticWeightedBlocks.joint_window_from_reference_arithmetic` gives an integer $k\ge\max\{A,2\}$ such that

$$
\sum_{n=k^3}^{k^4}\frac{\max\{U(n^4),0\}}{n^3}\le k^\eta,
\qquad
U(x)\le x^{1/2+\eta}\quad (k^{12}\le x\le k^{16}).
$$

The sum ranges over the integers in the block. The second bound holds for every real $x$ in the closed interval, including both endpoints. Taking $\kappa=\min\{\eta/32,1/2\}$, the proof bounds the weighted samples by a harmonic sum after division by $n^3$ and interpolates between fourth powers on the same block to cover the real window. A single $k$ can meet the thresholds for both estimates. [Both bounds from the reference arithmetic on one block](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7067180276)

**What does monotonicity alone tell us about negative mass in a window?**

::: {.theorem #thm-ch31-monotone-window-sharpness title="A monotone count with quadratic depth and cubic window mass" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MonotoneTailSharpness.monotone_tail_quadratic_depth_cubic_mass"}
For every real $0<s\le1/2$, there is a nondecreasing $A_s\colon\mathbb R\to\mathbb R$, nonnegative for $t\ge1$ and equal to $t$ outside $[2-s,2+s]$, such that $(A_s(t)-t)/t^2$ is integrable on the real line. Its tail $Q_s(z)=\int_z^\infty(A_s(t)-t)t^{-2}\,dt$ satisfies

$$
-Q_s(2)=\frac{s^2}{32},
\qquad
\int_1^3\frac{\max\{-Q_s(z),0\}}{\sqrt z}\,dz\le\frac{s^3}{16}.
$$
:::

::: proof
Take $0<s\le1/2$. Put $A_s(t)=t-t^2(t-2)/16$ for $2-s<t\le2+s$ and $A_s(t)=t$ elsewhere. The polynomial is increasing on $[3/2,5/2]$. Its values at the left and right cutoffs are at least $2-s$ and at most $2+s$, respectively. Joining the polynomial to the linear pieces therefore gives a nondecreasing function on the real line, nonnegative for $t\ge1$.

Let $Q_s(z)=\int_z^\infty(A_s(t)-t)t^{-2}\,dt$. The integrand is $(2-t)/16$ on the chosen interval and zero elsewhere. Its integral over that interval is zero, so the tail vanishes outside the closed interval and equals $((z-2)^2-s^2)/32$ inside it.

The integral bound uses the length $2s$, the maximum negative part $s^2/32$, and the weight $1/\sqrt z\le1$ on the interval. The full proof is checked by the Lean kernel.
:::

As $s\to0^+$, this family violates every uniform upper bound on the depth of the form a constant times the window mass to the power $\alpha$ when $\alpha>2/3$. A stronger bound for the actual prime count would require information beyond monotonicity.

**How does the modulus-one Mellin transform detect a zero?** Consider the remainder $U$ in Clause 6 of [@thm-ch34-riemann-prime-arc-bridge]. For every $s\in\mathbb C$ with $\operatorname{Re}(s)>1$, the function $y\mapsto e^{-sy}U(e^y)$ is absolutely integrable on $(0,\infty)$, and its Laplace integral can be evaluated unconditionally. Setting $x=e^y$ gives $e^{-sy}\,dy=x^{-s-1}\,dx$, so this is the Mellin integral on the left below. [Half-plane transform of the complete remainder](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtHalfPlane.u_laplace_half_plane)

Each prime power $n$ contributes a ramp $\max(x/n-1,0)$ with weight $\Lambda(n)$. The ramp starts at $x=n$ and its Mellin integral is $n^{-s}/[s(s-1)]$. Summing with the weights $\Lambda(n)$ gives the logarithmic derivative $-\zeta'(s)/\zeta(s)$ in the numerator. The two elementary correction terms in $U$ contribute $-1/(s-1)^2$ and $(1+\gamma_{\mathrm{EM}})/(s-1)$. Putting the three terms over a common denominator gives the external modulus-one formula

$$
\Phi(s)=\int_1^\infty U(x)x^{-s-1}\,dx
=-\frac{\zeta'(s)/\zeta(s)+(s-1)^{-1}+1-(1+\gamma_{\mathrm{EM}})s}{s(s-1)}.
$$

The right-hand side gives the meromorphic continuation of the integral. Let $\rho$ be any zero of $\zeta$, including a negative even integer, and let $m$ be its analytic multiplicity. Writing $\zeta(s)=(s-\rho)^m h(s)$ with $h(\rho)\ne0$ isolates the term $m/(s-\rho)$ in the logarithmic derivative. On some punctured neighborhood of $\rho$, the explicit function $\Phi$ satisfies

$$
\Phi(s)=\frac{c}{s-\rho}+H(s),\qquad c=\frac{m}{\rho(1-\rho)}\ne0,
$$

where $m\ge1$ and $H$ is analytic at $\rho$. Thus the pole of $\Phi$ is simple for every multiplicity. For a nontrivial zero, $c$ is the coefficient in the integrated explicit formula when the occurrences of the same zero are counted together. [Local expansion at a zeta zero](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtLaurent.transform_integral_and_zero_germs) · [Modulus-one Mellin identity](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/mellinGchiModOne.lean#L115-L121) · [Residue calculation](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L63-L83)

**Why can a one-sided window bound rule out a pole?** Fix $1/2<\theta<1$. Under its bounds on group sizes, character weights, and errors, the external arithmetic argument uses the scale constraint $m\le x^{1/2+\varepsilon/2}$ to obtain $G_{m,A}(x)\le x^{1/2+(C+3)\varepsilon}+\Sigma_A(x)$ for a character sum, with $\Sigma_A$ still to be controlled. It then rewrites the left-hand side as the target remainder using `gmA_eq` and bounds $\Sigma_A$ with `sigA_le`. For sufficiently large $x$, the remaining constant factor is absorbed into $x^\varepsilon$, giving the Chebyshev-type window bound $x^{1/2+(e_D+e_L+7)\varepsilon}$. The loss exponents $e_D,e_L$ are fixed first. One then takes $\varepsilon>0$ small enough that $(e_D+e_L+7)\varepsilon\le\theta-1/2$. Under the window hypotheses this supplies arbitrarily large $Y$ for which the modulus-one remainder satisfies $U(x)\le x^\theta$ throughout $[Y,Y^{3/2}]$. [Character-sum hypotheses](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L343-L351) · [Bounding the remainder and absorbing the constant](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreGm.lean#L55-L74) · [Order of exponent choices](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L68-L81)

To continue across $s=1$, remove the pole of $\zeta$ by setting $h(s)=(s-1)\zeta(s)$ away from $1$ and $h(1)=1$. Write $B=h'/h$, so that $B(1)=\gamma$. On a punctured neighborhood of $1$, rearranging the transform gives $\Phi(s)=(1+\gamma)/s-(B(s)-\gamma)/(s(s-1))$. The difference quotient gives the unique continuous value $\Phi_*(1)=1+\gamma-B'(1)$. With this value the transform is analytic at every $s\ne0$ with $\zeta(s)\ne0$. [Analytic continuation at one](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtAtOne.completed_disk_cauchy)

Put $u=\ln x$ and $g(u)=U(e^u)$. For each nonnegative integer $k$ and each $\operatorname{Re}(z)>1$, $\Phi^{(k)}(z)$ is the absolutely convergent integral of $(-u)^k e^{-zu}g(u)$ over the positive half-line. Each derivative contributes one factor of $-u$, so $D_k(z)=(-1)^k\Phi^{(k)}(z)/k!$ integrates $g$ against $u^k e^{-zu}/k!$. For fixed $\sigma>2$ and $k>0$, the magnitude of the kernel is largest at $u=k/\sigma$, so the choice of $k$ helps control the integral outside the window. Write $a=\ln Y$. Inside the window, $g\le e^{\theta u}$ gives $\lvert g\rvert+g\le 2e^{\theta u}$. This explains the derivative at the real center in the source estimate. There are fixed constants $\sigma>2$ and $C$. For every $\eta>0$ one can choose arbitrarily late windows and orders $k\ge a$ such that $\lvert D_k(\sigma+it)\rvert+\operatorname{Re}D_k(\sigma)\le C e^{\eta a}/(\sigma-\theta)^k$ for every real $t$. [Derivative integral](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/LandauCoeff.lean#L10-L18) · [Window estimate](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L40-L56) [All derivatives of the complete transform](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtMoments.iterated_derivative_moment)

::: {.theorem #thm-signed-mangoldt-window title="Paired derivatives bound either sign on the window" lean="D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtSignedWindow.signed_window_moment_bound"}
Use the analytic value of $\Phi_*$ at $1$ and put $D_k(s)=(-1)^k\Phi_*^{(k)}(s)/k!$. For a nonnegative integer $k$ and a complex point $p$, write $\sigma=\operatorname{Re}(p)>1$ and $K_k(u)=u^ke^{-\sigma u}/k!$. For each $0<a\le b$, $\alpha<\sigma$, and $e\in\{-1,1\}$,

$$
|D_k(p)|+e\operatorname{Re}D_k(\sigma)
\le \frac{2}{(\sigma-\alpha)^k}\int_a^b\max\{eg(u),0\}e^{-\alpha u}\,du
+2\int_{(0,\infty)\setminus[a,b]}|g(u)|K_k(u)\,du.
$$
:::

::: proof
Taking the modulus at the complex point bounds it by $\int |g|K_k$. At the real point the signed term is $e\int gK_k$, so the sum is bounded by $2\int\max\{eg,0\}K_k$. On the window, the exponential series gives $K_k(u)\le(\sigma-\alpha)^{-k}e^{-\alpha u}$. On its complement, use $|g|$. The full proof is checked by the Lean kernel.
:::

The choice $e=1$ gives the positive part used in the pole argument above. The choice $e=-1$ uses the same kernel for the negative part. The integral outside the window calls for its own decay estimate.

Suppose a pole lies in $\operatorname{Re}(s)>\theta$. The source proof selects a center $z=\sigma+it$ and a nearest pole $\rho$ with $d=|z-\rho|<r\le\sigma-\theta$ such that the disk of radius $r$ contains only this pole. Its contribution to $D_k(z)$ is $c/(z-\rho)^{k+1}$. Take the inner radius $r'=(d+r)/2$. After subtraction of the pole term, the analytic function is bounded on that circle, so the Cauchy estimate gives an error $O((r')^{-k})$. When the proof chooses a nonreal center, the closed disk of radius $r'$ about $\sigma$ is free of poles. Cauchy's estimate gives $\operatorname{Re}D_k(\sigma)\ge-M'(r')^{-k}$ with $M'$ independent of $k$. For an isolated real pole, take $z=\sigma$. Its residue $c$ is positive, so the leading term of $\operatorname{Re}D_k(\sigma)$ is $c/d^{k+1}>0$, and the window estimate bounds $\lvert D_k(\sigma)\rvert+\operatorname{Re}D_k(\sigma)$. Compare with the window estimate and multiply by $d^k$. The pole contributes a constant $|c|/d>0$ and the analytic error is $O((d/r')^k)$. Choose $\eta>0$ so small that $e^\eta d/(\sigma-\theta)<1$. The window term then also tends to zero as $k\ge a\to\infty$, a contradiction. [Pole and Cauchy estimates](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L83-L166) For a zeta zero, this error bound also follows directly for $\Phi_*$. Suppose that the closed disk of radius $r'>0$ about $p\ne\rho$ avoids $0$ and that every zeta zero in the disk equals $\rho$. There is a $B\ge0$, independent of $k$, such that $|D_k(p)-c/(p-\rho)^{k+1}|\le B/(r')^k$, with $D_k$ formed from the completed transform. Removing the principal part gives an analytic remainder even if the disk crosses $1$. [Disk bound for the complete transform](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtAtOne.completed_disk_cauchy)

The external repository's full argument also constructs Galois representations by theta lifting and uses Artin reciprocity to determine the Artin map in its local Langlands parameters. Its final step deduces RH from the zero-free result for all Dirichlet characters. [Theta lift](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/Foundations/GaloisRepresentations/IntegralStructures/RowSrc.lean#L1-L6) · [Artin reciprocity](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/Foundations/LocalLanglands/LocalCentralUnits/ArtEx.lean#L7-L15) · [Final declarations in the external repository](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean#L7-L14)

**The window tests only the negative part of the Chebyshev tail.** For $x\ge2$ put $Q(x)=\int_x^\infty(\psi(t)-t)t^{-2}\,dt=-U(x)/x$ and $Q^-(x)=\max\{-Q(x),0\}$. The reverse implication below uses the external Landau criterion (`manual derivation`). Define

$$
A(Y)=\int_Y^{Y^{3/2}}\frac{Q^-(x)}{\sqrt{x}}\,dx .
$$

RH holds if and only if for every $\eta>0$ and every $Y_0\ge2$ there is a $Y\ge Y_0$ with $A(Y)\le Y^\eta$. Under RH, the bound above gives $Q^-(x)\le x^{-1/2}$ for all sufficiently large $x$. Consequently $A(Y)\le\tfrac12\ln Y\le Y^\eta$ for all sufficiently large $Y$.

Conversely, put $g(u)=U(e^u)$ in logarithmic coordinates $u=\ln x$. The external window hypothesis asks for a nonnegative majorant $R\ge g$ with suitably small integral $\int R(u)e^{-\theta u}\,du$. The least such majorant is $R(u)=\max\{g(u),0\}$, which is continuous on compact windows because $U$ there is a finite sum of continuous ramps and elementary corrections. Since $U(x)=-xQ(x)$, the substitution gives the least integral as $I_\theta(Y)=\int_Y^{Y^{3/2}}Q^-(x)x^{-\theta}\,dx$. At $\theta=1/2$ it equals $A(Y)$. Apply the external pole data for the modulus-one character family and its window criterion with $\delta=1/2$. Every zeta zero of positive real part then satisfies $\operatorname{Re}(\rho)\le1/2$. Reflection across the critical line gives RH. [Window hypothesis](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauZeroFreeCriterion.lean#L25-L29) · [Pole data for the modulus-one specialization](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L248-L261) · [Landau criterion](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L83-L90)

The critical window gives a derivative bound with explicit constants (`manual derivation`). Take $a=\ln Y\ge1$, $\sigma=512$, and $k=\lfloor640a\rfloor$, so $k\ge a$. The inequalities $\Lambda(n)/n\le1$ and $x\ln x\le x^2$ for $x\ge1$ give $|g(u)|\le M e^{2u}$ from the finite sum for $U$, with $M=2+|1+\gamma|$. For each real $t$, the triangle inequality bounds $|D_k(512+it)|+\operatorname{Re}D_k(512)$ by twice the integral of $\max(g,0)$ against the real kernel. Inside the window, $u^k e^{-(512-1/2)u}/k!\le(512-1/2)^{-k}$. Outside it, a Gamma integral estimate applies to $|g|$. Adding the two contributions gives

$$
|D_k(512+it)|+\operatorname{Re}D_k(512)
\le \frac{2A(Y)}{(512-1/2)^k}
 +\frac{2M}{512^k}\left(\frac{1}{542}+\frac{1}{478}\right).
$$

The constants $1/542$ and $1/478$ come from the left and right tails, respectively. This controls the error outside the window. The remaining term $A(Y)$ is the quantity that requires arithmetic control. [Two-tail estimate for the Gamma kernel](lean:D5/S3/Analytic/Laplace/CriticalGammaWindow.critical_window_off_mass)

For $1/2<\theta<1$ the same windows satisfy $I_\theta(Y)\le Y^{1/2-\theta} A(Y)$. Conversely, $A(Y)\le Y^{(3/2)(\theta-1/2)} I_\theta(Y)$, so bounds $I_\theta(Y)\le Y^{\eta'}$ on arbitrarily late windows for every $1/2<\theta<1$ and every $\eta'>0$ give the critical condition by taking $(3/2)(\theta-1/2)+\eta'\le\eta$.

The criterion can also be stated using primes alone. Put $\vartheta(t)=\sum_{p\le t}\ln p$ and use it in place of $\psi$ to define $Q_\vartheta$ and $A_\vartheta$. The prime-power correction to the tail satisfies $\sqrt{x}(Q(x)-Q_\vartheta(x))\to2$. Choose $C$ so that $\psi(t)-\vartheta(t)\le C\sqrt{t}$ for all $t\ge1$. Such a $C$ exists unconditionally. The negative part is nonincreasing, and the window theorem gives $0\le A_\vartheta(Y)-A(Y)\le 2C\ln(Y^{3/2}/Y)=C\ln Y$. Thus the critical condition is equivalent to $A_\vartheta(Y)\le Y^\eta$ on arbitrarily late windows for every $\eta>0$. For the implication from $A$, use its bound with exponent $\eta/2$, then take $Y$ large enough that $Y^{\eta/2}+C\ln Y\le Y^\eta$. The independent arithmetic task is to establish this bound on the integral of the negative part from the distribution of the primes. [Window bound for the prime-power correction](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.prime_power_window_correction)

A pointwise bound from the external arithmetic argument transfers directly to the prime-only condition (`manual derivation`). Suppose $U(x)\le x^{1/2+\varepsilon}$ throughout $[Y,Y^{3/2}]$. On that same window, $Q^-(x)/\sqrt{x}=\max(U(x),0)/x^{3/2}\le x^{\varepsilon-1}$. Thus $A(Y)\le \tfrac12 Y^{3\varepsilon/2}\ln Y$. Adding the prime-power correction costs at most $C\ln Y$. Given $\eta>0$, take $\varepsilon=\min(\eta/3,1/4)$. The sum is at most $Y^\eta$ on every sufficiently large window satisfying the pointwise bound. The arithmetic input is the existence of such whole windows arbitrarily far out.

Levent Alpöge’s proposed proof constructs these windows at modulus one from external arithmetic inputs. The construction uses theta lifts, Galois representations, a covolume bound, and local matching to construct `HypsAlt` and then obtain `TopG`. For $\lambda=3/2$ the construction fixes $e_D=2$ and $e_L=0$. For every sufficiently small $\varepsilon>0$, one family supplies arbitrarily late whole windows, a uniform error bound, and the `ChainTied` condition. Raising the starting threshold gives $U(x)\le x^{1/2+9\varepsilon}$ throughout each such window, before the external argument invokes its zero-free criterion. Choose $9\varepsilon\le\min(\eta/3,1/4)$. The preceding integral estimate gives $A_\vartheta(Y)\le Y^\eta$ on these same windows (`manual derivation`). The resulting existence of these windows depends on the external arithmetic inputs. [The source repository’s account of the proposed proof](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/README.md#L1-L5) · [Arithmetic inputs to HypsAlt](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/SiegelEisensteinSecondTermHypotheses.lean#L44-L68) · [From HypsAlt to TopG](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopPlug.lean#L12-L15) · [Loss exponents](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopShape.lean#L48-L54) · [Three conditions on the same family](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/ZeroFreeAllOfTopG.lean#L19-L33) · [Arithmetic bound on the windows](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimitiveCosets/LevelGmLeOnFamilyScales.lean#L28-L30)

The preceding link between the two arguments has also undergone a conditional external Lean kernel check. In the reference repository’s pinned Lean 4.33.1 environment, `rh_of_family_and_unit_host` derives the Riemann hypothesis from the family input `TopG` and the modulus-one host input `HostExW (3/2) (GChi PChar.one).req`. For each $\kappa>0$ the two inputs produce arbitrarily late windows $[Y,Y^{3/2}]$ on which the same family gives $\mathrm{Gz}(x)\le x^{1/2+\kappa}$ at every real $x$. Here $\mathrm{Gz}(x)=U(x)$ is the book’s complete Mangoldt remainder, so the prime-only window criterion applies. This kernel replay takes the two inputs as hypotheses. The reference constructions that supply them lie outside its scope. The reproduction record includes the compatibility patch and successful kernel replay. `PinnedTop`, `WindowConsumer`, and `UnifiedWindowRH` check this conditional implication. `PinnedMesh` checks a separate fixed-character window criterion. [Conditional implication and reproducible source](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059461340)

The reference mean-square theorem `QH.pairEx` supplies a single prime pair for the entire inner window. Take modulus one, $0<\varepsilon<1/52$, and $A\ge1$. For every sufficiently large $Y$ there are primes $q,d$ satisfying `PairGood 1 ε Y (Y^A) q d`, with the size, congruence and splitting conditions of `WinPair` evaluated at the fixed scale $Y$. For the three twist indices $(i,j)=(1,0),(0,1),(1,1)$, each primitive character $\chi$ inducing the corresponding quadratic twist satisfies both $|g_\chi(y)|\le y^{1/2+\varepsilon/2}$ and $|D_\chi|\le4\log y$ for every $Y\le y\le Y^A$. For real primitive base characters of conductor dividing $8$, the definition also imposes zero-free rectangles on the primitive characters inducing those three twists. This choice of $q,d$ uses the mean-square theorem already checked in the reference environment. [Fixed prime pair and outer-window quantifiers](https://github.com/the-omega-institute/trureturing/issues/32627#issuecomment-7059642097)

Passing from the inner window to the modulus-one host also uses the cohomological input `VWinAt PChar.one`. Write $C$ for its cutoff exponent. For each such $\varepsilon$ and every rank schedule $e\colon\mathbb R\to\mathbb N$ satisfying $x^{2+8\varepsilon}\le2^{e(x)}\le2x^{2+8\varepsilon}$ for $x\ge1$, this input supplies $J\ge1$ and a threshold. For every $X$ beyond the threshold and every prime pair satisfying `WinPair ε (X^(1/J)) q d`, it gives a common subwindow $[W,W^2]\subseteq[X^{1/J},X]$. At each $x$ in that subwindow the estimate applies to every number field matching the character and $e(x),q,d$ under `IsChiField`. Fix such a field, any algebraic closure, and any family of local coefficient data indexed by the primes $\ell$, and put $t=\lfloor x^C\rfloor$. For each prime $\ell$ and $1\le j<t$, the cohomological length $\operatorname{shaLen}(\ell,j)$ is finite. Every finite set $S$ of primes satisfies

$$
\sum_{\ell\in S}\log\ell\sum_{1\le j<t}\operatorname{shaLen}(\ell,j)\le\sqrt{\exp(x^\varepsilon)}.
$$

At $C=401$, the common-window construction chooses $Y,q,d$ before quantifying over the real points of the outer interval $[Z,Z^{3/2}]$. The reference theorem `supplyChi` yields the modulus-one host used above. The same external Lean environment thus checks `TopG → VWinAt PChar.one 401 → RiemannHypothesis`. [Conditional cohomological-window implication](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059734329)

The modulus-one character $\chi$ generates a group of order one. The field construction gives $1\le c\le|\langle\chi\rangle|$, so the order $c2^e$ in the host construction equals $2^e$ and satisfies the rank estimate above directly. This lowers the cutoff exponent from $401$ to $400$ at modulus one, with the sum running over $1\le j<\lfloor x^{400}\rfloor$. Under the exponent-$400$ window hypothesis, `fixed_of_400` supplies for each such $\varepsilon$ a $J\ge1$ such that, beyond any prescribed starting point, one can find an outer window $[Z,Z^{3/2}]$ and a single $Y,q,d$ with $Y\le Z\le Z^{3/2}\le Y^J$. The pair satisfies `PairGood` throughout $[Y,Y^J]$, and each $x$ in the outer window admits its matching $e(x)$ and the stated length bound. The same external environment checks `TopG → VWinAt PChar.one 400 → RiemannHypothesis`, with the family input and this weaker modulus-one window as hypotheses. [Source and kernel replay for exponent 400](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059864808)

For the modulus-one cohomological window, the same external Lean environment also checks reductions of the positive-eigenspace counts. The exceptional primes at modulus one are exactly $\{3,7\}$. The reference proof supplies case IV and obtains case Z from vanishing for the principal character. Case I reduces to an orbit estimate for the imaginary quadratic field $\mathbb Q(\sqrt{-7})$ of discriminant $-7$. The test primes can be fixed at $11,13$. Once both auxiliary primes $q,d$ selecting the window exceed $13$, the two tests apply to the same host. The orbit estimate still needs one real constant uniform over the compatible algebraic closures of the rationals, the allowed exponents and moduli, character orbits, coefficient data, and finite sets of primes. [The unit character’s exceptional set](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7060326962) · [Cases I, IV, Z and the conditional implication](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061140456)

The two high-conductor counts in case V use only the twist $e=1$. Let $c_2(\psi)$ be the exponent of $2$ in the conductor of the local component at $2$ of the host character $\psi$. After removing that component, the remaining character squares to the principal character. For $\ell=3,7$ the order $f_0$ in the comparison therefore equals the multiplicative order of $\ell$ modulo $4$, namely $2$. The threshold $R_1=16\ell^2\,4^{v_2(\ell^2-1)}$ equals $9216$ at $\ell=3$ and $200704$ at $\ell=7$. Comparing $R_1$ with $2^{c_2(\psi)}$ gives the following cutoffs.

| Exceptional prime $\ell$ | $v_2(\ell^2-1)$ | Case V | Corresponding case Vs |
| --- | --- | --- | --- |
| $3$ | $3$ | $c_2(\psi)\ge14$ | $c_2(\psi)\le13$ |
| $7$ | $4$ | $c_2(\psi)\ge18$ | $c_2(\psi)\le17$ |

The replayed equivalence `unit_countV_iff` says that case V at modulus one holds exactly when one common natural exponent $A$ gives the reference bound `VLe` with upper bound $(\ell N)^A$ for both high-conductor families, where $N$ is the host modulus. This quantifies over each unit-character host, every $t>1$ satisfying `h.Big t`, every allowed algebraic closure and coefficient system, and each eligible host character at twist one. The cutoffs select which characters to count in a given host. [The two high-conductor counts and their kernel replay](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061244097)

With those two counts as hypotheses, `rh_of_one_orbit_estimate` also requires the arithmetic family `TopG`, the modulus-one geometric window `UnitB K 400`, the odd-prime estimate `Odd.PrimeBound`, the fixed-field orbit estimate above, and case II at modulus one. Case Vs uses Poitou–Tate duality, local finiteness, local Tate duality, and the degree estimate `LemmaK` for a real constant $C_K$. Under these hypotheses the externally replayed implication reaches RH through this chapter’s Mangoldt window criterion.

**How can one discriminant split at several primes?** For an odd prime $p$, write $J(-d,p)=\bigl(\frac{-d}{p}\bigr)$. A value of $1$ means that $t^2\equiv-d\pmod p$ has a nonzero solution. With $B=3$, the only small odd prime to test is $3$. The prime $d=23$ satisfies $d\equiv7\pmod{16}$ and $-23\equiv1\pmod3$. Take the prime $q=59\equiv3\pmod8$. Since $-23\equiv36=6^2\pmod{59}$, this pair passes both splitting tests. The construction below enforces all the finite conditions through particular residue classes. Those classes account for only some of the eligible primes.

::: {.theorem #thm-ch31-split-prime-host-series title="Weighted series for auxiliary primes with prescribed splitting" lean="D5/S3/CharacterSums/SplitPrimeHostSeries.split_prime_host_series"}
For a natural number $B$, let $D_B$ consist of the primes $d\equiv7\pmod{16}$ for which $J(-d,p)=1$ at every odd prime $p\le B$. For $d\in D_B$, let $Q_d$ consist of the primes $q\equiv3\pmod8$ for which $J(-d,q)=1$. Then

$$
\begin{aligned}
\lim_{X\to\infty}\sum_{\substack{d\in D_B\\d<X}}\frac{\ln d}{d}&=+\infty,\\
\lim_{X\to\infty}\sum_{\substack{q\in Q_d\\q<X}}\frac{\ln q}{q}&=+\infty\quad(d\in D_B).
\end{aligned}
$$

Here $X$ runs through the natural numbers. For every natural number $N$ there exists $d\in D_B$ with $d>N$. For every $d\in D_B$ and every natural number $Q$ there exists $q\in Q_d$ with $q>Q$. Conversely, prescribe a prime $q\equiv3\pmod8$ and put $S_{B,q}=\{d\in D_B:q\in Q_d\}$. Then $\sum_{d\in S_{B,q},\,d<X}(\ln d)/d\to+\infty$, and for every natural number $N$ there is a $d\in S_{B,q}$ with $d>N$.
:::

::: proof
Choose $d$ first. In the reference construction, put $P=\prod_{i=0}^{B-1}(2i+1)$, with empty product $1$. The product is odd, and every odd prime $p\le B$ occurs as a factor. The residue $8P-1\pmod{16P}$ is coprime to its modulus. Each prime $d$ in this class satisfies $d\equiv7\pmod{16}$ and $-d\equiv1\pmod p$ at every such $p$. With $d$ fixed, choose a prime $q$ in the reduced residue class $1+6d\pmod{8d}$. Then $q\equiv3\pmod8$ and $q\equiv1\pmod d$. Both $d$ and $q$ are $3$ modulo $4$, so the minus sign from quadratic reciprocity cancels $\bigl(\frac{-1}{q}\bigr)=-1$. Hence $J(-d,q)=\bigl(\frac{q}{d}\bigr)=1$. The proof in this library takes the product of the small odd primes themselves and combines the congruences by the Chinese remainder theorem. In each reduced residue class the sum of $\ln p/p$ over primes diverges. Its nonnegative terms contribute to the corresponding sums over $D_B$ and $Q_d$. The full proof is checked by the Lean kernel.
:::

One can also start with a prescribed prime $q\equiv3\pmod8$. Increase the cutoff for small primes to $\max(B,q)$. Then $q$ itself is one of the odd primes required to split, so every $d\in D_{\max(B,q)}$ belongs to $D_B$ and satisfies $J(-d,q)=1$. Removing any finite initial segment preserves divergence, so in either order the last prime can exceed any prescribed lower bound. The elementary construction in the reference chooses $d$ first and $q$ second and proves existence above given thresholds. The weighted series here quantify the supply of primes at each step. [The two prime choices in the reference](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimeDiscriminants/ExistsHost.lean#L39-L97)

The whole-window estimate also requires the two primes to fit the same prescribed scale. Under its analytic hypotheses, the quantitative result in the reference fixes $0<\varepsilon<1/52$ and supplies $x_0$ and a constant $C>0$. For every real $x\ge x_0$ it then chooses $q$ and then $d$ for that $q$, with the same pair satisfying $\sqrt{X_1}<q\le X_1$ and $\sqrt{X_2}<d\le X_2$, where $X_1,X_2$ depend on $x,\varepsilon$. Its `QDq` condition uses the same $C$ in the estimates at scale $x$ for three quadratic characters, those attached to $q$, to $d$, and their product. The `Boxq` condition imposes six zero-free region conditions on characters and their twists. For every integer $1\le n\le2x^{2+8\varepsilon}$ the same pair must also meet the splitting requirements and the bound on $\ln(4nqd)$ in `Rowq`. These conditions select a pair for each $x$. Put $t=\varepsilon/5$. Since $X_1=\exp(x^t)$, the size condition gives $x^t/2<\ln q\le x^t$. Reusing one $q$ at the endpoints $Y$ and $Y^b$ would give $Y^{bt}/2<\ln q\le Y^t$, hence $Y^{(b-1)t}<2$. For fixed $b>1$, satisfying the `Rowq` size bound at the two endpoints of a sufficiently distant window therefore requires different primes $q$ (`manual derivation`). Passing from the choice at each scale to the error bound on the whole window uses the character estimates and arithmetic construction in the reference. [Quantitative construction choosing $q$ before $d$](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBounds.lean) · [Hypotheses and quantifiers for the quantitative choice](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBoundsStatement.lean#L17) · [Character and size conditions](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L166-L185)

**When can one pair of auxiliary primes serve an entire window?** Fix a prime $q\equiv3\pmod8$, put $L=\ln q>1$, and fix a real $b>1$. For a window starting at $Y\ge e^5$, take a loss $\varepsilon>0$ that stays fixed on the window. Write $u=x^{\varepsilon/5}$ for each real $x\in[Y,Y^b]$. The external `Rowq` condition constrains $q,d$ at a given $x,n$. Here we require a single prime $d\equiv7\pmod{16}$ to satisfy the inequalities throughout the window.

$$
u/2<L\le u,\qquad u(\ln x)^2/2<\ln d\le u(\ln x)^2 .
$$

It also requires $(-d/q)=1$, the splitting condition $(-d/p)=1$ for each odd prime $p\le u$, and $-d\equiv1\pmod8$ at $2$. For each integer $1\le n\le2x^{2+8\varepsilon}$, the conductor bound is $\ln(4nqd)\le2u(\ln x)^2$. [Pointwise arithmetic conditions in the external source](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L179-L185)

::: {.theorem #thm-ch31-fixed-prime-row-width title="Window widths admitting one fixed pair of auxiliary primes" lean="D5/S3/CharacterSums/MovingPrimeRowWidth.prime_pair_power_window_iff"}
Fix $q,b$ as above. The following are equivalent.

1. For every real $R$ and every $\eta>0$ there exist $Y\ge\max(R,e^5)$, a loss $0<\varepsilon<\min(\eta,1/52)$, and a prime $d$ satisfying all the conditions above for every real $x\in[Y,Y^b]$.
2. The width satisfies $b^2L^{b-1}<2$.
:::

::: proof
First compare the endpoints. Put $u_0=Y^{\varepsilon/5}$, so $L\le u_0$ and the value of $u$ at the right endpoint is $u_0^b$. The strict lower bound there and the upper bound at the left endpoint give $b^2u_0^b(\ln Y)^2/2<\ln d\le u_0(\ln Y)^2$. Hence $b^2L^{b-1}<2$. At equality, the strict lower bound at the right already reaches the largest value allowed at the left.

Conversely, put $B=\lceil L^b\rceil$. With $q$ fixed first, there are arbitrarily large $d$ for which $q$ and every odd prime $p\le B$ split. [Prime supply with $q$ fixed first](lean:D5/S3/CharacterSums/SplitPrimeHostSeries.split_prime_host_series)

Set $a=\sqrt{\ln d/L}$, $Y=e^a$, and $\varepsilon=5\ln L/a$. As $d$ grows, $Y$ tends to infinity and $\varepsilon$ tends to zero. Write each point of the window as $x=e^{sa}$ with $1\le s\le b$. Then

$$
u=L^s,\qquad \frac{u(\ln x)^2}{\ln d}=s^2L^{s-1}\in[1,b^2L^{b-1}].
$$

This gives both size bounds for $d$. The inequalities $u\le L^b<2L$ and $L\le u$ give the bounds for $q$. Finally, put $t=\ln x\ge5$. For the specified $n$, use $L\le u$, $\ln 8<4$, and $2+8\varepsilon<3$ to obtain $\ln(4nq)\le4+3t+u\le ut^2$. The last inequality follows from $u\ge1$ and $t^2-1\ge4+3t$. Adding $\ln d\le ut^2$ gives the conductor bound. The full proof is checked by the Lean kernel.
:::

Take the prime $q=60083\equiv3\pmod8$ and $b=9/8$. Since $11<L<12$ and $12<(3/2)^8$, we have $b^2L^{b-1}<(81/64)(3/2)=243/128<2$. This yields windows on which $u\ge L>11$ at every point.

The external analytic proof that selects $q$ also requires $(\ln Y)^2\ln(8)/4\le Y^{\varepsilon/5}$ at the starting point. Our construction has $Y^{\varepsilon/5}=L$, while the left side tends to infinity with $Y$. If the selector’s threshold holds, the ratio of the endpoint values of $u$ is $(Y^{\varepsilon/5})^{b-1}\ge((\ln Y)^2\ln(8)/4)^{b-1}$. For every natural $k$, this lower bound eventually exceeds $2^k$. Choose $k+1$ points along the window where $u$ doubles successively. Their half-open intervals $(u/2,u]$ are disjoint, so covering the window requires at least $k+1$ distinct values of $q$, even when $\varepsilon$ varies between windows. Given its analytic inputs, the external source fixes $0<\varepsilon<1/52$ and obtains a threshold $x_0$ and a constant $C$. It selects a pair $q,d$ for each $x\ge x_0$, then uses that pair for every admissible $n$. [Scale condition in the external selector](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean#L83-L92) · [The external theorem selecting a pair at each point](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBoundsStatement.lean#L17) · [Uses of the condition](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean#L131-L156)

Here $\varepsilon$ changes with the window. Bounding $U$ pointwise on these windows would also require the external `QDq` and `Boxq` character estimates for the same pair $q,d$, and control of how the comparison threshold depends on $\varepsilon$. [Character estimates and pointwise arithmetic conditions in the external source](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L166-L192)

For any fixed real $b>1$, write

$$
A_{\vartheta,b}(Y)=\int_Y^{Y^b}\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx,\qquad Y\ge2.
$$

The quantity $A_\vartheta$ above is $A_{\vartheta,3/2}$.

::: {.theorem #thm-ch31-prime-window-mean title="The logarithmic main term of the window mass under RH" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPrimeWindowMean.prime_tail_logarithmic_mass_of_rh"}
Assume the Riemann hypothesis. There is a constant $C\ge0$ such that every pair of real cutoffs $B\ge A\ge2$ satisfies

$$
\left|\int_A^B\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx-2\ln(B/A)\right|\le C.
$$
:::

::: proof
In the prime-power layers, higher powers bound the difference between $\psi(x)-\vartheta(x)$ and $\psi(\sqrt{x})$. Apply Schoenfeld's bound at $\sqrt{x}$ and integrate to obtain $\sqrt{x}(Q(x)-Q_\vartheta(x))=2+O(x^{-1/12})$. This error is absolutely integrable on the tail after setting $y=\ln x$. The normalized complete remainder consists of the zero series and an exponentially decaying term. Under RH the series has absolutely summable coefficients, modulus less than $2$, and frequencies of absolute value greater than $10$. Integrating each mode divides its coefficient by the frequency, giving a common bound for integrals of the zero series over every interval. Adding $2$ to the real part of this series gives a nonnegative approximation to $\max\{-\sqrt{x}Q_\vartheta(x),0\}$. Taking positive parts preserves the bound on the integrable error. Continuity bounds the error over the finite initial interval. Integrating the constant $2$ gives the logarithmic main term, and the other contributions are bounded uniformly in both endpoints. The full proof is checked by the Lean kernel.
:::

In particular, $A_{\vartheta,b}(Y)=2(b-1)\ln Y+O(1)$ with the same error bound even when $b>1$ varies. Zhao's equation (14) expresses this $Q_\vartheta$ in terms of the cumulative first Mertens error and an endpoint correction. The main term here results from a further weighted window integral and uses RH. [Zhao, equation (14)](https://arxiv.org/html/2411.18903v2#S2.E14)

::: {.theorem #thm-ch31-rh-prime-window-remainder title="The endpoint remainder and cluster set on the critical line" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPrimeWindowRemainder.prime_window_remainder_of_rh"}
Under RH, write $E(a,B)=N(a,B)-2\ln(B/a)$ for the prime-tail negative mass with its main term removed. Here $N(a,B)=\int_a^B\max(-Q_\vartheta(x),0)x^{-1/2}\,dx$. Enumerate the nontrivial zeros with multiplicity as $\rho_k=1/2+i\gamma_k$ and put $c_k=1/[\rho_k(1-\rho_k)]$. Let $\phi(u)_k=e^{i\gamma_k u}$ and let $H$ be the closure of this real-parameter orbit in the product of circles. Define the continuous function

$$
P(h)=\operatorname{Re}\sum_k\frac{c_k h_k}{i\gamma_k}.
$$

Let $e(u)=\max(-e^{u/2}Q_\vartheta(e^u),0)-2-\operatorname{Re}\sum_k c_k\phi(u)_k$. For every real pair $B\ge a\ge2$, the exact identity is

$$
E(a,B)-P\bigl(\phi(\ln B)\bigr)+P\bigl(\phi(\ln a)\bigr)=\int_{\ln a}^{\ln B}e(u)\,du.
$$

For every $\varepsilon>0$ there is an $X\ge2$ such that every real pair $B\ge a\ge X$ satisfies

$$
\left|E(a,B)-P\bigl(\phi(\ln B)\bigr)+P\bigl(\phi(\ln a)\bigr)\right|<\varepsilon .
$$

For every fixed $a\ge2$, the full cluster set of $E(a,B)$ as $B\to\infty$ is the nondegenerate compact interval

$$
C(a)+P(H),\qquad
C(a)=\int_{\ln a}^\infty e(u)\,du-P\bigl(\phi(\ln a)\bigr).
$$
:::

::: proof
The zero ordinates are bounded away from zero, so the coefficients remain absolutely summable after termwise integration. In logarithmic coordinates the two endpoints give the difference of values of the same function $P$. The residual is absolutely integrable, so its absolute integral on any $[\ln a,\ln B]$ is bounded by the entire tail from $\ln a$. At fixed $a$ the residual integral converges to a constant. The actual orbit approaches each point of the closure at arbitrarily late times and hence realizes every cluster value in the interval. The closure is compact and connected, and the primitive along the orbit has strictly positive derivative at time zero, so the interval has distinct endpoints. The result uses the actual joint phase relations. The full proof is checked by the Lean kernel.
:::

**The cube term and half phase of the square cutoff.** Keep $E(a,B)=N(a,B)-2\ln(B/a)$. Enumerate all actual nontrivial zeros $\rho_k$ with multiplicity, put $\gamma_k=\operatorname{Im}\rho_k$ and $c_k=1/[\rho_k(1-\rho_k)]$, use the preceding series to define $P$, and set $\phi(u)_k=e^{i\gamma_k u}$. For $x>0$, define

$$
A_2(x)=4\operatorname{Re}\sum_\rho
\frac{x^{(\rho-1)/2}}{\rho(1-\rho)(2-\rho)}.
$$

::: {.theorem #thm-ch31-prime-window-cube-square title="The cube term, square spectrum, and the Riemann hypothesis" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHRootCorrection.rh_iff_prime_window_cube_and_square"}
The Riemann hypothesis holds if and only if there exist $a_0\ge2$ and $K>0$ such that every real pair $B\ge a\ge a_0$ satisfies

$$
\begin{aligned}
\bigl|E(a,B)&-P(\phi(\ln B))+P(\phi(\ln a))\\
 &-9(a^{-1/6}-B^{-1/6})-A_2(B)+A_2(a)\bigr|
 \le K(a^{-3/10}-B^{-3/10}).
\end{aligned}
$$
:::

::: proof
Under RH, Costa Pereira's inequalities isolate the square-root and cube-root cutoffs of $\psi$ in $\psi-\vartheta$, leaving a remainder bounded by $\psi(x^{1/5})$. After integration and normalization, the cube main term contributes $(3/2)x^{-1/6}$ to the density. Integration over the log window gives the coefficient $9$. Writing $y=\sqrt{x}$ gives the centered square-cutoff correction $2Q(y)-2y\int_y^\infty Q(s)s^{-2}\,ds$. Substituting the integrated explicit formula for the complete tail gives the coefficient $-2/[\rho(2-\rho)]$ at each zero. Integrating the modes gives $A_2(B)-A_2(a)$.

The square-cutoff term uses phase $e^{i\gamma_\rho\ln(x)/2}$, whose square is the phase of the same zero in $\phi(\ln x)$. The remaining log density is bounded by a constant times $x^{-3/10}$. Integrating over the actual window keeps both endpoints, so the error bound also vanishes as the window shrinks. [Restatement of Costa Pereira's inequalities](https://arxiv.org/html/2002.11068v2#S3.E16)

The same estimate also implies RH. Both endpoint primitives are uniformly bounded for positive cutoffs at least one by absolute convergence and the known critical-strip bounds. The cube term and the power error are bounded as well. If the estimate holds uniformly, then $E(a,B)$ stays bounded at a fixed admissible $a$ as $B$ grows. If RH fails, the wide-window theorem gives arbitrarily large excess over $2\ln(B/a)$ for sufficiently large $B\ge a^2$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-prime-window-rh title="Small prime-tail windows and the Riemann hypothesis" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.rh_iff_frequently_small_prime_windows"}
Fix a real $b>1$. The Riemann hypothesis holds if and only if for every $\eta>0$ and every real $R\ge2$ there exists a real $Y\ge R$ such that $A_{\vartheta,b}(Y)\le Y^\eta$.
:::

::: proof
Under RH, $|U(x)|/\sqrt{x}$ is bounded for all sufficiently large $x$. Integrating this bound and the prime-power correction over $[Y,Y^b]$ gives $A_{\vartheta,b}(Y)\le C_b\ln Y$. Thus every sufficiently large $Y$ satisfies the required power bound.

Conversely, suppose $\zeta(\rho)=0$ with $\beta=\operatorname{Re}\rho>1/2$. For every $\varepsilon>0$, all sufficiently large $Y$ satisfy $A_{\vartheta,b}(Y)\ge Y^{b(\beta-1/2)-\varepsilon}$. Fix $1<h<b$ and a small $0<\delta<\beta-1/2$, then choose $\sigma$ large enough to make both Gamma tail decay rates positive. Two disks of the same radius separate the pole contribution from the error. The complex center $p$ lies at distance $d<\sigma-\beta+\delta$ from the isolated pole, where $\sigma=\operatorname{Re}p$. This pole can come from a different zero. The zero-free disk at the real center gives a Cauchy error bound. Taking the derivative order $k=\lfloor\sigma h\ln Y\rfloor$ puts the peak of the Gamma kernel near $h\ln Y$. After normalization by $d^k$, the contribution from outside the window is $O((d/\sigma)^k)$ and tends to zero as $k$ grows. The growth rate left inside is $h\sigma\ln((\sigma-1/2)/d)>h(\beta-1/2-\delta)$. Taking $h$ close enough to $b$ and $\delta$ small enough keeps the exponent loss below $\varepsilon$. [Window mass forced by an off-line zero](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.off_line_zero_forces_window_mass)

Take $\varepsilon=\eta=b(\beta-1/2)/3$. The lower bound becomes $Y^{2\eta}$, in contradiction with $A_{\vartheta,b}(Y)\le Y^\eta$ on arbitrarily late windows. This excludes zeros to the right of the critical line. Reflection of the nontrivial zeros across that line gives RH. The full proof is checked by the Lean kernel.
:::

For the complete Mangoldt remainder $U(x)=-xQ(x)$, one can bound the value at each real point directly. Both criteria below use a one-sided upper bound. For fixed $b>1$ the logarithmic length of the window is $(b-1)\ln Y$, which grows with its starting point $Y$.

::: {.theorem #thm-ch31-mangoldt-pointwise-power-window title="A pointwise power-window criterion for the complete Mangoldt remainder" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtPointwiseWindows.rh_iff_pointwise_power_windows"}
Fix a real $b>1$. The Riemann hypothesis holds if and only if for every $\kappa>0$ and every real starting bound $R$ there is a $Y\ge\max\{R,2\}$ such that every real $x$ in the same closed interval $[Y,Y^b]$ satisfies

$$
U(x)\le x^{1/2+\kappa}.
$$
:::

::: proof
Under RH the absolute envelope above gives $|U(x)|\le\sqrt{x}$ for all sufficiently large $x$, so for each $\kappa>0$ every sufficiently late window works.

Conversely, given a target exponent $\eta>0$ for the prime-tail mass, take $\kappa=\eta/(2b)$. The prime-power correction satisfies $\sqrt{x}(Q(x)-Q_\vartheta(x))\to2$, so it is at most $3$ throughout sufficiently late windows. Substituting $U(x)/\sqrt{x}=-\sqrt{x}Q(x)$ into the pointwise bound and taking the positive part gives $\max\{-\sqrt{x}Q_\vartheta(x),0\}\le x^\kappa+3$. Divide by $x$ and integrate over the window to obtain

$$
A_{\vartheta,b}(Y)\le4Y^{b\kappa}(b-1)\ln Y\le Y^\eta
$$

on every sufficiently late window satisfying the pointwise bound. Such $Y$ are arbitrarily large, so [@thm-ch31-prime-window-rh] gives RH. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-mangoldt-pointwise-sqrt-window title="A fixed square-root coefficient for complete Mangoldt windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtPointwiseWindows.rh_iff_pointwise_sqrt_windows"}
Write $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$ for the first Li mass, where $\gamma_{\mathrm{EM}}$ is Euler’s constant. Fix real numbers $b>1$ and $C>M$. The Riemann hypothesis holds if and only if for every real $R$ there is a $Y\ge\max\{R,2\}$ such that every $x\in[Y,Y^b]$ satisfies

$$
U(x)\le C\sqrt{x}.
$$
:::

::: proof
Under RH, taking the positive margin $C-M$ in the absolute envelope for $U(x)/\sqrt{x}$ gives the upper bound $C\sqrt{x}$ at all sufficiently large $x$. Conversely, for each $\kappa>0$, moving the starting bound sufficiently far out ensures $C\le x^\kappa$ throughout the window. The same window then satisfies the pointwise power bound, and [@thm-ch31-mangoldt-pointwise-power-window] gives RH. The full proof is checked by the Lean kernel.
:::

At the critical coefficient $C=M$, the distance from $U(x)$ to $M\sqrt{x}$ can be measured on the original additive scale. Dividing this distance by $\sqrt{x}$ can hide a saving of any fixed size.

::: {.theorem #thm-ch31-mangoldt-critical-gap title="Divergence of the additive gap below the critical envelope" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtCriticalGap.rh_iff_critical_gap_tendsto_atTop"}
Let $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$. The Riemann hypothesis holds if and only if, along the real axis as $x\to+\infty$,

$$
M\sqrt{x}-U(x)\longrightarrow+\infty.
$$

Equivalently, for each fixed real $D$ there is an $X$ such that every real $x\ge X$ satisfies $U(x)\le M\sqrt{x}-D$.
:::

::: proof
Put $y=\ln x$. Under RH the real part of the normalized zero sum has the form $F(y)=\sum_k a_k\cos(\gamma_k y)$, where $a_k\ge0$ and $\sum_k a_k=M$. Put $d(y)=M-F(y)$. Summing the inequalities $(1-\cos(\gamma_k y))(1+\cos(\gamma_k h))\ge0$ with weights $a_k$ gives

$$
2d(h)-4d(y)\le2F(y)-F(y+h)-F(y-h).
$$

The explicit formula to the right of zero gives $d(h)/h\to+\infty$ as $h\downarrow0$. At large $y$ choose $h=e^{-y/2}$. The weighted midpoint inequality for the Mangoldt ramps, together with the explicit-formula error for the normalized remainder, bounds the right-hand side above by $O(h)$. Dividing by $h$ gives $d(y)/h\to+\infty$. Since $|e^{-y/2}U(e^y)-F(y)|=O(e^{-y/2})$, the additive gap at $x=e^y$ differs from $d(y)/h$ by a bounded amount.

Conversely, divergence of the gap gives $U(x)\le M\sqrt{x}$ on the entire tail. For each $\kappa>0$ we eventually have $M\le x^\kappa$, so the pointwise power-window condition of [@thm-ch31-mangoldt-pointwise-power-window] holds. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** Fix $b>1$. RH is equivalent to the following window condition. For every real $R$ there exists $Y\ge\max\{R,2\}$ such that every point of the same interval $[Y,Y^b]$ satisfies $U(x)\le M\sqrt{x}$. Under RH take $D=0$ in the preceding theorem. Every sufficiently late window then works. For the converse assume such windows exist arbitrarily late. Given $\kappa>0$, increase the starting bound until $x^\kappa\ge M$ throughout the tail, choose one of the windows there, and apply [@thm-ch31-mangoldt-pointwise-power-window].

::: {.theorem #thm-ch31-mangoldt-bounded-gap-peak title="Bounded gaps between returns of the normalized remainder near the critical mass" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtWindowPhase.bounded_gap_actual_G_peak"}
Assume RH and set $G(y)=e^{-y/2}U(e^y)$. For every $\delta>0$ there is a natural number $L$ such that for every natural number $n$ some natural number $k\le L$ satisfies

$$
|G(n+k)-M|<\delta.
$$
:::

::: proof
Under RH the normalized zero sum is obtained by evaluating a continuous function on a compact group of phases at integer powers of the phase element. Its value at the identity is $M$. Choose an open neighborhood of the identity on which the phase sum is within $\delta/2$ of $M$. On the closure of the cyclic subgroup generated by the phase element, a finite subcover bounds the number of forward integer steps needed to reach that neighborhood. The normalized remainder eventually differs from the real part of the zero sum by less than $\delta/2$, so a return within the bounded waiting time gives the required integer logarithmic time. Enlarging $L$ covers the finite initial segment. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-mangoldt-no-windows-below-mass title="Coefficients below the first Li mass exclude arbitrarily late good windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtWindowPhase.no_windows_below_mass"}
Fix real numbers $b>1$ and $C<M$. Unconditionally, there exists a real $R$ such that every $Y\ge\max\{R,2\}$ admits an $x\in[Y,Y^b]$ with $U(x)>C\sqrt{x}$.
:::

::: proof
Suppose arbitrarily late windows satisfy $U(x)\le C\sqrt{x}$ throughout. The same windows satisfy the upper bound with the larger coefficient $M+1$, so [@thm-ch31-mangoldt-pointwise-sqrt-window] gives RH. Take $\delta=M-C>0$ and apply [@thm-ch31-mangoldt-bounded-gap-peak] starting at $n=\lceil\ln Y\rceil$. For large $Y$ we have $(b-1)\ln Y\ge L+1$, so $n+k\in[\ln Y,b\ln Y]$. The point $x=e^{n+k}$ in that very window then satisfies $U(x)/\sqrt{x}>M-\delta=C$, contradicting the assumed bound. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** Let $P_b(Y)=\max_{Y\le x\le Y^b}U(x)/\sqrt{x}$. For $Y\ge2$ the normalized remainder is continuous and attains its maximum on the closed window. For every $a<M$, the preceding theorem gives $P_b(Y)>a$ for all sufficiently large $Y$. Under RH the absolute envelope gives $P_b(Y)<c$ eventually for every $c>M$, so $P_b(Y)\to M$. If RH fails, fix any real $T$ and take $C=\max\{T,M+1\}$. The contrapositive of [@thm-ch31-mangoldt-pointwise-sqrt-window] then gives $P_b(Y)>C\ge T$ for all sufficiently large $Y$. Thus $P_b(Y)\to+\infty$. [External kernel replay for the window maximum](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7060137372)

::: {.theorem #thm-ch31-wide-prime-window title="A lower mass bound on wide windows and uniform divergence if RH fails" lean="D5/S3/Weil/Mertens/IntegratedExplicit/WidePrimeWindowMass.prime_tail_wide_window_mass"}
For the actual prime-only tail, write the mass at real endpoints $2\le A\le B$ as

$$
N(A,B)=\int_A^B \frac{\max\{-Q_\vartheta(x),0\}}{\sqrt x}\,dx .
$$

Fix $b>1$. There is a constant $C_b\ge0$ such that $N(A,B)\ge 2\ln(B/A)-C_b$ whenever $2\le A$ and $A^b\le B$. If RH fails, for each real $K$ a single right-endpoint threshold $S$ gives $N(A,B)-2\ln(B/A)\ge K$ for every $B\ge S$ and every admissible $A$.
:::

::: proof
The threshold can be chosen independently of $A$ by setting $Y=B^{1/b}$. Since $A^b\le B$, the interval $[Y,B]=[Y,Y^b]$ lies inside $[A,B]$. Integrating the same nonnegative function over the larger interval can only increase the mass. If RH fails, symmetry supplies a zero with real part $\beta>1/2$. The fixed-power estimate allows any positive exponent loss, so choosing $b(\beta-1/2)/2$ gives $N(A,B)\ge B^{(\beta-1/2)/2}$ for every sufficiently large $B$, uniformly in admissible $A$. This power eventually exceeds $2\ln B$ plus any fixed constant. Since $2\ln(B/A)\le2\ln B$, the discrepancy diverges uniformly. Below the right-endpoint threshold the logarithmic term is bounded and the mass is nonnegative, which extends the lower bound to the whole domain. If RH holds, the bounded remainder for all $2\le A\le B$ gives the same lower bound directly. The full proof is checked by the Lean kernel.
:::

The exponent $b>1$ is fixed in advance. In logarithmic coordinates the condition $B\ge A^b$ requires the window to widen with the scale. At fixed ratio $B/A$, the inclusion used above gives no corresponding bound.

**At which scales can one choose a prime with a small character sum?** Fix $\varepsilon>0$. For each integer $k\ge1$ take the prime upper bound $X_k=2^k$ and the height $x_k=(k\ln2)^{5/\varepsilon}$, so $\exp(x_k^{\varepsilon/5})=X_k$. The block contains the primes $X_k/2\le q<X_k$ congruent to $3$ modulo $8$. Consecutive blocks are disjoint. For sufficiently large $k$ the lower endpoint exceeds $\sqrt{X_k}$, so the whole block fits the size band for $q$ in the reference.

For the second moment, define the sum for every positive odd integer $q$ in the block using the Jacobi symbol. Let $N_k=\lfloor x_k^{400}\rfloor$ and put

$$
T_k(q)=\sum_{n=1}^{N_k}\Lambda(n)\min\{1,x_k/n\}\left(\frac{n}{q}\right).
$$

Here $\Lambda(p^j)=\ln p$ for primes $p$ and integers $j\ge1$. All other positive integers have weight zero. Terms up to $x_k$ retain their full weight, while larger terms receive a factor $x_k/n$. Only primes $q$ congruent to $3$ modulo $8$ in the block receive weight. If $|T_k(q)|\le x_k^{1/2+\varepsilon}/2$, add $(\ln q)/q$ to $G_k$. Otherwise add it to $B_k$. Equality is included in $G_k$.

::: {.theorem #thm-ch31-dyadic-mangoldt-prime-supply title="Good primes for the truncated Mangoldt sum at dyadic scales" lean="D5/S3/CharacterSums/DyadicMangoldtPrimeSupply.dyadic_quadratic_mangoldt_supply"}
For each fixed real $\varepsilon>0$, the exceptional primes have finite total weight, and the partial sums of the good weight tend to positive infinity:

$$
\begin{aligned}
\sum_{k=1}^{\infty} B_k&<\infty,\\
\lim_{K\to\infty}\sum_{k=1}^K G_k&=+\infty.
\end{aligned}
$$
:::

::: proof
Sum $|T_k|^2$ over every integer in the block congruent to $3$ modulo $8$. These nonnegative terms include the contribution of the exceptional primes. The total truncated weight of higher prime powers is $O(\sqrt{x_k})$. For the cross terms at distinct odd primes, quadratic reciprocity turns the varying denominator into a periodic sum. Complete periods cancel, leaving endpoint remainders. For fixed $\varepsilon$ the full second moment is at most $(X_k/2)x_k^{1+\varepsilon}$ on sufficiently late blocks. Every exceptional prime contributes more than $x_k^{1+2\varepsilon}/4$ to the second moment. Using $(\ln q)/q\le 2\ln(X_k)/X_k$ throughout the block and substituting $x_k^\varepsilon=(k\ln 2)^5$ gives $B_k\le4/(k\ln 2)^4$ for all sufficiently large $k$. The exceptional weight is therefore summable. On the other hand the sum of $(\ln q)/q$ over primes congruent to $3$ modulo $8$ diverges. Summing over the disjoint blocks and subtracting the finite exceptional weight gives the divergence of the good weight. The full proof is checked by the Lean kernel.
:::

Thus for every starting block $K_0$ there exist a $k\ge K_0$ and a prime $q$ in that block meeting the bound. Divergence allows individual blocks to contain no good prime. The estimate concerns the finite sum for the first selection of $q$ in the reference, with the extra twist $\kappa=1$. Under the analytic, size and zero-free hypotheses in the reference, the corresponding smoothed, centered character sum satisfies $|g_\chi(x_k)+T_k(q)|\le x_k^\varepsilon$, so the approximating term is $-T_k(q)$. The first choice of $q$ must also satisfy two zero-free conditions simultaneously. In the subsequent choice of $d$, the twists and modulus vary with $q,x$. The logarithmic derivative estimates and zero-free boxes require separate arguments. [Finite sum in the reference](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/GL3MeanSquares/SmoothedRemainderRealIntegralFormula.lean#L139-L147) · [Approximation for the smoothed sum](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/GChiApproximationSumStatement.lean#L14) · [Conditions in the first prime selection](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean)

**Can the height be prescribed before choosing the prime?** Fix a real height $x$ and put $T=x^{\varepsilon/5}$. Write $T_x(q)$ for the same truncated sum evaluated at this $x$. Each term is $\Lambda(n)\min\{1,x/n\}$ times the Jacobi symbol $(n/q)$, and the sum ends at $\lfloor x^{400}\rfloor$. As the interval for $q$ moves with $x$, we allow a finite set $E\subset\mathbb N$ of integers to be avoided. Let $S_x(E)$ consist of the primes satisfying

$$
e^{T/2}<q\le e^T,\qquad q\equiv3\pmod8,\qquad
q\notin E,\qquad |T_x(q)|\le \tfrac12 x^{1/2+\varepsilon}.
$$

::: {.theorem #thm-ch31-real-scale-mangoldt-prime-supply title="Good prime weight at every sufficiently large real height" lean="D5/S3/CharacterSums/DyadicMangoldtPrimeSupply.real_scale_quadratic_mangoldt_supply"}
For every fixed $\varepsilon>0$ there exists $x_0(\varepsilon)$ such that for every real $x\ge x_0(\varepsilon)$ and every finite set $E\subset\mathbb N$ with $|E|\le e^{T/3}$,

$$
\sum_{q\in S_x(E)}\frac{\ln q}{q}\ \ge\ \frac{T}{173065984000}.
$$

:::

::: proof
Put $D=86532992000$. The primes congruent to $3$ modulo $8$ in the full interval eventually have total weight at least $T/D$. The second-moment estimate uses dyadic blocks, each at the same real height $x$ and cutoff $\lfloor x^{400}\rfloor$. The primes exceeding the threshold eventually have total weight at most $36T^2/x^\varepsilon$, which tends to zero after division by $T$. Each prime in the interval has weight at most $Te^{-T/2}$, so deleting at most $e^{T/3}$ integers costs at most $Te^{-T/6}$. For sufficiently large $x$ each loss is at most $T/(4D)$, leaving at least $T/(2D)$. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** The positive lower bound supplies a prime at every such $x$. The choice of $q$ may vary with $x$ and $E$. The single-prime weight bound $Te^{-T/2}$ also gives $|S_x(E)|\ge e^{T/2}/173065984000$. If a set $E$ of the allowed size contains every candidate failing either zero-free condition in the reference, the theorem supplies a prime meeting both conditions. Bounding that exceptional set requires an independent estimate.

**The second prime belongs to a moving residue class.** Once $q$ is chosen, the modulus $m$ for selecting $d$ can grow with the height. To discard the integers that fail a test in $(D/2,D]$, we first need a count of the actual primes in the prescribed class. An asymptotic for fixed $m$ may start at a height that depends on $m$. Here the starting condition must work for all $m$.

Fix an integer $m\ge3$ and a unit $a$ modulo $m$. In the cyclotomic field $\mathbb Q(\zeta_m)$ write $\sigma_a(\zeta_m)=\zeta_m^a$. Let $\Pi_a(t)$ count the rational primes up to $t$ that are unramified in this extension and have Frobenius $\sigma_a$. Let $Q$ be the maximum of the primitive conductors of the characters of its Galois group. Write $\operatorname{Li}(t)=\int_2^t du/\log u$.

::: {.theorem #thm-ch31-cyclotomic-tz title="Cyclotomic prime counting with an exceptional zero term" status="written-proof" proof="pf-ch31-cyclotomic-tz" doi="10.2140/ant.2019.13.1039" source="Theorems 1.4 and 3.3, pp. 1042 and 1052" request="https://github.com/the-omega-institute/trureturing-requests/issues/455"}
There exist absolute effective constants $A,c_2,c_3,s>0$. Here an exceptional zero is a real zero of the primitive Dirichlet $L$-function associated with a real character in the range $0<\lambda<1/8$, $\beta=1-\lambda/\log Q$. In the absence of an exceptional zero, put $F(t)=\operatorname{Li}(t)$. If one exists, its real character $\chi$ is unique and the zero is $\beta=1-\lambda/\log Q$ with $sQ^{-2}\le\lambda<1/8$. In this case put $F(t)=\operatorname{Li}(t)-\chi(a)\operatorname{Li}(t^\beta)$. For every $m,a$ as above and every $t\ge Q^{c_2}$,

$$
\left|\varphi(m)\Pi_a(t)-F(t)\right|
\le A\left(e^{-c_3\log t/\log Q}+e^{-\sqrt{c_3\log t}}\right)F(t).
$$

:::

::: {.proof #pf-ch31-cyclotomic-tz}
Apply Theorem 1.4 of Thorner and Zaman to $L=\mathbb Q(\zeta_m)$ over $\mathbb Q$, with the entire group $G=(\mathbb Z/m\mathbb Z)^\times$ as the abelian subgroup and $\{\sigma_a\}$ as the conjugacy class. The fixed field is $\mathbb Q$, of discriminant and degree $1$. Both conductor parameters in (1–11) and (3–1) reduce to $Q$, and the density factor is $1/\varphi(m)$. Each primitive conductor divides $m$. For $m\ge3$ the group has a nontrivial character, whose primitive conductor is at least $3$, so $3\le Q\le m$. Theorem 1.4 gives the relative error and exceptional term above, and Theorem 3.3 gives $\lambda\ge sQ^{-2}$. Both sets of constants are absolute and effective. Jesse Thorner and Asif Zaman, “A unified and improved Chebotarev density theorem,” *Algebra & Number Theory* **13**(5) (2019), 1039–1068. [10.2140/ant.2019.13.1039](https://doi.org/10.2140/ant.2019.13.1039) · [Published Theorem 1.4](https://msp.org/ant/2019/13-5/ant-v13-n5-p02-s.pdf#page=5) · [Published Theorem 3.3](https://msp.org/ant/2019/13-5/ant-v13-n5-p02-s.pdf#page=15)
:::

**Hand derivation.** There exist absolute effective constants $c,K,D_0>0$ such that for every $m\ge3$, every unit $a$ and every $D\ge\max\{D_0,(4m)^K\}$,

$$
\#\{Y<p\le2Y:p\text{ prime},\ p\equiv a\pmod m\}
\ \ge\ c\,m^{-3}\frac{Y}{\log Y},\qquad Y=D/2.
$$

First choose $K\ge2$ sufficiently large, then choose $D_0$ sufficiently large. Since $\log Y/\log Q\ge K-1$ and $Y\ge D_0/2$, these choices ensure $Y>m$, $Y\ge Q^{c_2}$ and relative errors at most $1/100$ at both $Y$ and $2Y$. Every prime in the interval is unramified since $p>m$, and its Frobenius takes $\zeta_m$ to $\zeta_m^p$. The difference of the two endpoint counts is therefore the desired prime count.

If the exceptional zero exists and $\chi(a)=1$, put $\delta=1-\beta$ and $W=1-Y^{-\delta}$. In every other case put $W=1$. On $[Y,2Y]$ we have $F'(t)\ge W/\log(2Y)$, giving $F(2Y)-F(Y)\ge WY/(2\log Y)$. In the cancellation case $\beta>1/2$, so integrating from $t^\beta$ to $t$ gives $0\le F(t)\le2t(1-t^{-\delta})/\log t$. Since $1-(2Y)^{-\delta}\le1-Y^{-2\delta}\le2W$, the sum of the two endpoints is at most $10WY/\log Y$. In the other cases $0\le F(t)\le2\operatorname{Li}(t)\le6t/\log t$ for large $t$. Hence $F(Y)+F(2Y)\le18WY/\log Y$ in every case. Subtracting the two endpoint errors leaves $\varphi(m)(\Pi_a(2Y)-\Pi_a(Y))\ge WY/(4\log Y)$.

In the cancellation case $\delta\log Y\ge s/m^2$, so $1-e^{-u}\ge(1-e^{-1})\min\{u,1\}$ gives $W\ge (1-e^{-1})\min\{s,1\}m^{-2}$. This bound also holds for $W=1$. Dividing by $\varphi(m)\le m$ proves the claim. For the second-prime parameters $y=x^{\varepsilon/5}$, $m\le e^{4y}$ and $D=e^{y(\log x)^2}$, we have $\log D/\log(4m)\ge y(\log x)^2/(\log4+4y)\to\infty$. The same threshold therefore applies at every sufficiently large $x$. If the number of integers in the class failing either test is smaller than this prime lower bound, at least one prime passes both tests. [The counting hypothesis in the reference](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Definitions/GlobalTwisting/GeneralHyps.lean#L113-L118)

**How can the same $d$ pass both tests?** Fix $\varepsilon>0$ and put $y=x^{\varepsilon/5}$, $D=\exp(y(\log x)^2)$ and $N=\lfloor x^{400}\rfloor$. Enumerate a residue class by $d_i=b+m(A+i)$ for $0\le i<L$. Write $J(n,r)$ for the product of the Legendre symbols over the prime factors of $r$, counted with multiplicity, taking the empty product $1$ at $r=0,1$. The factor at $2$ is $1$ for odd $n$ and $0$ for even $n$. On positive odd denominators this is the Jacobi symbol. Put $w_n=\Lambda(n)\min\{1,x/n\}$. At the same index $i$, form the two sums

$$
S_i=\sum_{n=1}^N w_n J(n,d_i),\qquad
S_{q,i}=\sum_{n=1}^N w_n J(n,d_i)J(n,q).
$$

Let $H$ contain exactly the indices for which $|S_i|>x^{1/2+\varepsilon}/2$ or $|S_{q,i}|>x^{1/2+\varepsilon}/2$. Thus $i\notin H$ means that both sums meet the bound.

::: {.theorem #thm-ch31-splitting-progression-power-tail title="Exceptional indices for two tests in one splitting progression" lean="D5/S3/CharacterSums/SplittingProgressionExponentialTail.splitting_progression_power_tail"}
For every fixed $\varepsilon>0$ and every sufficiently large real $x$, take any natural numbers $q,b,m,A,L$ with $b\equiv3\pmod4$ and $4\mid m$. Assume every prime divisor $p$ of $m$ satisfies $p\le x^{1/2+\varepsilon/2}$ or $p>N$. If $L\ge D/(4e^{4y})$, then

$$
|H|\le L D^{-\min\{\varepsilon,1\}/38400}.
$$

:::

::: proof
Extract from each sum the terms at odd primes that do not divide $m$. The clipped weights and the condition on the prime divisors of $m$ bound the remaining contributions from higher prime powers, $2$, and primes dividing $m$ by $x^{1/2+\varepsilon}/4$ for sufficiently large $x$. Since $d_i\equiv3\pmod4$, quadratic reciprocity expresses each $J(p,d_i)$ as a fixed sign times the quadratic character of $d_i\bmod p$. Over a full period modulo the product of the retained primes, $p\nmid m$ makes each residue coordinate uniform, and the Chinese remainder theorem makes the coordinates independent. Each character is bounded and has mean zero, so the sum of the squared coefficients controls the high even moments. Expanding the same moment on the actual interval of length $L$ leaves an endpoint remainder for each tuple of primes after its complete periods are removed. At order $2\lfloor y\log x/4800\rfloor$ the length assumption absorbs the remainders. At each failing index at least one of the two retained sums has absolute value at least $x^{1/2+\varepsilon}/4$. Summing the two nonnegative even powers therefore bounds the entire exceptional set. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** For every fixed $B>0$ we eventually have $D^{-\min\{\varepsilon,1\}/38400}\le e^{-By}$. To obtain an actual prime, enumerate just the elements of the specified class in the preceding interval $(D/2,D]$. Suppose $3\le m\le e^{4y}$, the class $a=b\bmod m$ is a unit, and the enumeration meets the hypotheses above. Then $L\le D+1$. There are at most $(D+1)D^{-\min\{\varepsilon,1\}/38400}$ failing indices. The ratio of this bound to the prime lower bound $c m^{-3}(D/2)/\log(D/2)$ tends to zero since $m^3\le e^{12y}$ and $\log D=y(\log x)^2$. At every such sufficiently large height, some prime $d$ therefore passes both tests.

For the first prime $e^{y/2}<q\le e^y$ chosen above, take $M=q\prod_{2<p\le y,\ p\text{ prime}}p$, $m=16M$ and $b=8M-1$. Then $b\equiv3\pmod4$ and $\gcd(b,m)=1$. The bound $\vartheta(y)\le y\log 4$ gives $\log m\le\log16+(1+\log4)y\le4y$ for large $x$. Every prime divisor of $m$ is at most $\max\{2,y\}$ or equals $q>e^{y/2}>N$. Enumerating this class in $(D/2,D]$ gives at least $D/(2m)-1\ge D/(4m)$ indices, meeting the length threshold. At the same $x$, the first prime $q$ and the resulting $d$ pass the first test and both tests above.

**Which conductor belongs to each of the six coefficients?** Take distinct odd primes $q,d$ and write $j_p(n)=J(n,p)$. Put $e(n)=\chi_8(n)$, which vanishes at even integers, takes the value $1$ in classes $1,7$ modulo $8$, and takes the value $-1$ in classes $3,5$. A primitive representation of $f$ at level $a$ is a Dirichlet character modulo $a$ of conductor $a$ whose value at every natural number $n$ is $f(n)$, including at nonunits.

::: {.theorem #thm-ch31-six-primitive-quadratic-levels title="Primitive representatives for six quadratic coefficients" lean="D5/S3/CharacterSums/PrimitiveQuadraticConductors.six_quadratic_levels"}
For every pair of distinct odd primes $q,d$, each function has a primitive complex Dirichlet character representing it at the indicated level:

$$
(j_q,q),\quad(ej_q,8q),\quad(j_d,d),\quad(ej_d,8d),\quad
(j_qj_d,qd),\quad(ej_qj_d,8qd).
$$

:::

::: proof
The nontrivial quadratic character modulo an odd prime is primitive at that prime. The character $e$ takes opposite values at $1$ and $5$, which are congruent modulo $4$, so it cannot descend to $4$ or any of its divisors. Lifting primitive characters of coprime moduli to their product and multiplying gives a character whose conductor is the product of their conductors. Apply this successively to $8,q,d$. If an integer shares a prime factor with the product modulus, the corresponding factor vanishes, so the coefficient identity also holds there. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-primitive-inducing-level title="Recovering a primitive conductor from values at coprime arguments" lean="D5/S3/CharacterSums/PrimitiveQuadraticConductors.inducing_level_and_values"}
Let $R$ be a commutative monoid with zero, let $r,a,M$ be positive integers, and let $\chi$ be a primitive $R$-valued Dirichlet character modulo $r$. Suppose $f:\mathbb N\to R$ has a primitive representation at level $a$, and $\chi(n)=f(n)$ for every $n$ coprime to $M$. Then $r=a$ and $\chi(n)=f(n)$ for every natural number $n$.
:::

::: proof
Lift both $\chi$ and the representative of $f$ to modulus $raM$. Every unit modulo $raM$ has a representative coprime to $M$, so the lifts agree on all units and hence are equal as characters. Lifting preserves conductors, giving equality of the two primitive levels. Lifting from this common level is injective, which gives agreement at every argument. The full proof is checked by the Lean kernel.
:::

**What bound does the character itself supply in the right half-plane?** Write $h$ for its modulus and $s=\sigma+it$. The estimate also covers imprimitive nonprincipal characters.

::: {.theorem #thm-ch31-nonprincipal-half-totient title="A strict half-totient bound for nonprincipal Dirichlet L-functions" lean="D5/S3/CharacterSums/NonprincipalCharacterGrowth.nonprincipal_growth"}
For every positive integer $h$, every nonprincipal complex Dirichlet character $\chi$ modulo $h$, and every complex $s$ with $\sigma=\operatorname{Re}s>0$,

$$
|L(s,\chi)|<\frac{\varphi(h)}{2}\frac{|s|}{\sigma}.
$$

:::

::: proof
Put $A(u)=\sum_{1\le n\le u}\chi(n)$. A complete period sums to zero, so a prefix in one period and its complementary suffix have opposite sums. They contain a total of $\varphi(h)$ units, and the smaller unit count bounds $|A(u)|$ by $\varphi(h)/2$. For $\sigma>1$, partial summation gives $L(s,\chi)=s\int_1^\infty A(u)u^{-s-1}\,du$. Since $A$ is bounded, the integral converges locally uniformly and defines a holomorphic function on $\sigma>0$. The identity theorem extends the equality with the nonprincipal $L$-function throughout that half-plane. For $h<u<h+1$, the sum $A(u)$ consists of exactly one full period and vanishes. The majorant $\varphi(h)u^{-\sigma-1}/2$ is positive on that interval. Thus the integral of the modulus is strictly smaller than the integral of the majorant. The triangle inequality for the complex integral, followed by multiplication by $|s|$, gives the claimed strict bound. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** The coefficient $ej_qj_d$ has primitive conductor $8qd>1$, whereas a principal character has conductor $1$. It therefore satisfies the nonprincipal hypothesis, and we may set $h=8qd$ in the estimate. Bounding $L'/L$ further requires control of the zeros of $L$ in the specified region.

**Controlling $L'/L$ at the same real endpoint.** Take a positive integer modulus $h$ and a nonprincipal complex Dirichlet character $\chi$ modulo $h$. Write $D_\chi=L'(1,\chi)/L(1,\chi)$. At a real $x>0$, define the ramp sum and the smoothed, centered character sum on the nonprincipal branch by

$$
R_\chi(x)=\sum_{1\le n\le\lfloor x\rfloor}\Lambda(n)\max(x/n-1,0)\chi(n),
\qquad g_\chi(x)=R_\chi(x)+xD_\chi .
$$

The sum includes prime powers. When $x$ is an integer the entering term has weight zero. Write $I(x)=\int_x^\infty(\psi(u)-u)u^{-2}\,du$, where $\psi(u)=\sum_{n\le u}\Lambda(n)$, and let $\gamma$ denote Euler’s constant.

::: {.theorem #thm-ch31-log-derivative-ramp-tail title="The character ramp and signed tail at a common endpoint" lean="D5/S3/CharacterSums/DirichletRampEndpoint.logDerivative_le_ramp_tail"}
For every positive integer modulus $h$, every nonprincipal complex Dirichlet character $\chi$ modulo $h$, and every real $x>0$,

$$
|D_\chi|\le\frac{|g_\chi(x)|}{x}+\log x-1-\gamma-I(x).
$$

:::

::: proof
Apply the triangle inequality to $xD_\chi=g_\chi(x)-R_\chi(x)$. Since $|\chi(n)|\le1$, the normalized ramp $|R_\chi(x)|/x$ is bounded by $\sum_{n\le x}\Lambda(n)/n-\psi(x)/x$. For $x\ge2$ the complete Chebyshev tail identity expresses this as $\log x-1-\gamma-I(x)$, preserving the sign of the tail. For $0<x<2$ the ramp vanishes. The integrand in $I(x)$ is $-1/u$ on $(x,2)$, giving the same formula by integration back from $2$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-uniform-log-derivative-ramp title="Uniform logarithmic derivative bound from a square-root-scale ramp" lean="D5/S3/CharacterSums/DirichletRampEndpoint.uniform_logDerivative_of_ramp"}
For all real $\varepsilon<1/2$ and $\eta>0$ there exists $X\ge2$ such that for every $x\ge X$, every positive integer modulus $h$, and every nonprincipal complex Dirichlet character $\chi$ modulo $h$,

$$
|g_\chi(x)|\le x^{1/2+\varepsilon}
\quad\Longrightarrow\quad
|D_\chi|\le\log x-1-\gamma+\eta .
$$

:::

::: proof
Dividing the bound on the centered sum $|g_\chi(x)|$ by $x$ gives $|g_\chi(x)|/x\le x^{\varepsilon-1/2}\to0$. The Chebyshev error kernel is absolutely integrable on the tail, so $I(x)\to0$. Choose $X$ so that each error has magnitude less than $\eta/2$ and apply the preceding endpoint inequality. Both errors are controlled by functions of the real endpoint and loss parameters alone, so one threshold works for all moduli and characters. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** On the nonprincipal branch, the reference’s smoothed, centered sum `An.gChi` used above agrees with $g_\chi$ by definition. For each bounded host character and each nonprincipal primitive character $\chi$ inducing it, the host condition `EAtH.bdG` gives $|g_\chi(x)|\le x^{1/2+\varepsilon}$ at the same endpoint $x$. If $\varepsilon<1/2$, take $\eta=1$. Then $|D_\chi|\le\log x-\gamma\le4\log x$ for every sufficiently large $x$. This is the inequality required by `EAtH.bdL` with coefficient $4$ for that $\chi$. The principal character has a separate branch. [Definitions of the centered sum and logarithmic derivative](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Analytic.lean#L9-L27) · [The two pointwise host conditions](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L144-L151)

For the same nonprincipal character, finitely many knots also control $g_\chi$ on a whole window. Write $D_\chi=L'(1,\chi)/L(1,\chi)$ and use the same ramp formula $g_\chi(x)=R_\chi(x)+xD_\chi$ at all real $x$. Given $Y\le Z$, let $T_\chi(Y,Z)$ consist of the two endpoints and all natural numbers $Y<n<Z$ for which $\Lambda(n)\chi(n)\ne0$. The interior knots are prime powers at which the character is nonzero.

::: {.theorem #thm-ch31-character-concave-window title="Testing a concave envelope at the endpoints and active knots" lean="D5/S3/CharacterSums/DirichletRampWindow.concave_window_iff"}
Take a positive integer modulus $N$ and a nonprincipal complex Dirichlet character $\chi$ modulo $N$. For any real $Y\le Z$ and any real-valued function $B$ concave on $[Y,Z]$, the inequality $|g_\chi(x)|\le B(x)$ holds throughout $[Y,Z]$ if and only if it holds at every point of $T_\chi(Y,Z)$.
:::

::: proof
Between consecutive test points the ramps that have already started are affine, and the ramps that start later vanish. Any term entering strictly between those points has zero coefficient. Thus the complex-valued $g_\chi$ is affine on that segment. Write an interior point as a convex combination of the two ends. The triangle inequality bounds its norm by the chord of the endpoint norms, and concavity bounds the chord of the endpoint values of $B$ by $B(x)$. If the endpoints coincide there is just one inequality to check. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-character-power-log-window title="A joint finite test for a power envelope and a logarithmic derivative" lean="D5/S3/CharacterSums/DirichletRampWindow.power_log_window_iff"}
Take the same type of modulus and character. Let $0<Y\le Z$, $0\le p\le1$, and $A,c\ge0$. Both inequalities

$$
|g_\chi(x)|\le A x^p,\qquad |D_\chi|\le c\ln x
$$

hold at every $x\in[Y,Z]$ if and only if $|g_\chi(t)|\le A t^p$ for every $t\in T_\chi(Y,Z)$ and $|D_\chi|\le c\ln Y$.
:::

::: proof
For these exponents, $x\mapsto A x^p$ is concave on the positive real axis, so [@thm-ch31-character-concave-window] applies to the first bound. In the second bound the left-hand side is constant in $x$, and $c\ln x$ is nondecreasing on the window. Its value at $Y$ therefore suffices. The full proof is checked by the Lean kernel.
:::

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

## 31.1.4 Literature Lineage, Epistemic Boundary Audit, and Baton Handoff to §31.2 Arithmetic Pivot Tunneling {#sec-ch34-28-4}

Before stepping into the full 3D interactive laboratory and handing the baton to [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling), we archive the five-tier epistemological boundary separating Lean kernel theorems, classical number-theoretic and mathematical-physics literature, high-precision benchmarks, unified geometric modeling, and open problems:

::: {.remark #rem-ch34-riemann-path-integral-literature title="Literature Lineage and Five-Tier Epistemic Audit for the Riemann Path Integral, Primon Gas, Semiclassical Trace Formulas, and Explicit Duality (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** The five entries below document the theorems, literature, computations, geometric models, and open spectral construction used in this section.

1. **Lean 4 kernel-verified theorems ([@thm-ch34-riemann-prime-arc-bridge] and [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) anchors)**: Rational linear independence of prime logarithms (`prime_log_rational_independence`), the Euler–Dirichlet identity on `1 < s.re` (`riemann_zeta_dirichlet_sum_eq_euler_product`), entire reflection and conjugation covariance of $\operatorname{xiReading}$ (`xi_reading_reflection`, `xi_reading_one_sub_conj`), the quartic counterexample exhibiting off-critical zero quartets $\{\frac{1}{2}\pm\delta\pm i\gamma\}$ under full zeta symmetry (`full_symmetry_not_fixed_line_localization`, $\delta \neq 0,\; \gamma \neq 0$), the unconditional integrated explicit formula on `0 < y` (`actual_integrated_explicit_formula`), alternating Dirichlet partial-sum continuation on `0 < s.re` with $s \neq 1$ (`tendsto_alternating_partialSums_eta_of_ne_one`), and rank-one Born modulus-square pairing weights (`rank_one_born_pairing_weight`) are machine-checked without axiom gaps in the pinned `trureturing` repository.
2. **Classical analytic number theory, quantum statistical mechanics, and quantum chaos literature (proved or established in the literature, not formalized in continuum form here)**: Analytic continuation of $\zeta(s)$, Poisson-theta derivation of the functional equation, and the critical-line conjecture originate with B. Riemann (*Monatsber. Königl. Preuss. Akad. Wiss. Berlin*, 671–680, 1859); the symmetric-truncation pointwise explicit formula for $\psi_0(x)$ and its adelic/Fourier duality were established by H. von Mangoldt (*J. Reine Angew. Math.* **114**, 255–305, 1895) and A. Weil (*Medd. Lunds Univ. Mat. Sem.*, Tome Supplémentaire, 252–265, 1952); the equivalence $\mathrm{RH} \iff M(x) = \mathcal{O}_\varepsilon(x^{1/2+\varepsilon})$ was proved by J. E. Littlewood (*C. R. Acad. Sci. Paris* **154**, 263–266, 1912); Dirichlet combinations obeying a functional equation without an Euler product and possessing off-critical zeros were constructed by H. Davenport & H. Heilbronn (*J. London Math. Soc.* **11**, 181–185 & 307–312, 1936); hyperbolic closed-geodesic and semiclassical periodic-orbit trace formulas carrying the stability prefactor $\lvert\det(I - M_p)\rvert^{-1/2} \sim e^{-L_p/2}$ were developed by A. Selberg (*J. Indian Math. Soc.* **20**, 47–87, 1956) and M. C. Gutzwiller (*J. Math. Phys.* **12**, 343–358, 1971), with the dilation Hamiltonian $\hat{H} = \frac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$ program articulated by M. V. Berry & J. P. Keating (*SIAM Rev.* **41**, 236–266, 1999); interpreting $\zeta(\beta)$ as the partition function of a free bosonic "primon gas" ($E_p = \ln p$) and noncommutative $C^*$-dynamical system with spontaneous symmetry breaking at $\beta = 1$ is due to B. Julia (*Number Theory and Physics*, Springer Proc. Phys. **47**, 276–293, 1990) and J.-B. Bost & A. Connes (*Selecta Math. (N.S.)* **1**, 411–457, 1995); and Kostant–Souriau half-densities ($\frac{1}{2}$-densities) in geometric quantization come from B. Kostant (*Lecture Notes in Math.* **170**, 1970) and J.-M. Souriau (*Structure des systèmes dynamiques*, Dunod, 1970).
3. **Elementary algebraic derivations and 100-digit numerical benchmarks (`manual derivation` / `NUM`)**: The two-arm prime interferometer bound $\lvert p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}\rvert \ge \lvert p^{-\sigma} - p^{-(1-\sigma)}\rvert$, identical vanishing $\operatorname{Im}\operatorname{xiReading}(\frac{1}{2}+it) = 0$ deduced from Clauses 3 and 4, and every numerical entry in [@ex-ch34-critical-zeros-and-dual-shells] and [@ex-ch34-weil-prime-staircase-reconstruction] are exact elementary derivations and 100-digit verified computations.
4. **Unified minimal arc-trihedron and concept-tower synthesis (`MODEL`)**: Interpreting primes $p$ as orthogonal minimal arc-trihedra $\Delta\mathcal{T}_p$, $\ln n$ as composite path action, $\mu(n)$ as Clifford exterior $\Lambda^k$ Pauli-exclusion chirality, and $\sigma = \frac{1}{2}$ as the observer's round-trip Born half-density spine inside the `1—3—3—1` concept tower constitutes this monograph's geometric synthesis model.
5. **Open spectral construction (`OPEN`).** The Hilbert–Pólya / Berry–Keating program still calls for a self-adjoint operator together with a proof that its spectrum gives precisely the ordinates of the nontrivial Riemann zeros. The external formal proof of the Riemann hypothesis itself and its independent verification are documented in [§39.2.2](ch39-s25-axiom-omega-five-tier-deduction-cascade.md#sec-ch39-25-2).
:::

Step into the full 3D interactive laboratory below to experience the entire arc of this section firsthand: start on the critical line $\sigma = 0.50$ and click through the five verified zero capsules $\gamma_1$ through $\gamma_5$, watching the violet minimal-arc path spiral climb around the amber continuation axis and seat its landing bead $\zeta(s)$ squarely inside the origin bullseye `O` ($\lvert\zeta\rvert = 0.0000$) at every single $\gamma_k$; next, nudge the amber handle or real-part slider $\sigma$ off $0.50$ by even $0.05$ or $0.12$ to watch the cyan forward shells $p^{-\sigma}$ and magenta reverse dual shells $p^{-(1-\sigma)}$ on the floor shrink and swell apart, snapping the amber $\zeta(s)$ bead cleanly off the origin; finally, switch to the prime-staircase scene and watch the critical-line zero-wave sheet cancel across composites to sculpt the sharp cyan prime staircase along the real axis!

At the very same moment, this sandbox sets up the sharpest dramatic question in modern number theory: if every prime minimal arc-trihedron $\Delta\mathcal{T}_p$ is already multiplicatively decoupled, zero-free, and strictly positive-definite inside the Euler safe zone $\sigma > 1$, why has a century of analytic number theory struggled to carry that positivity across the $s = 1$ pole mountain to hunt down hypothetical off-line quartets $\frac{1}{2} \pm \delta \pm i\gamma_0$? Because classical approaches queue natural numbers in a 1D total order $n = 1, 2, \dots, M$—walking straight into the **arithmetic sorting barrier** and the **Turán Zeno false-zero trap**, while single-stage mollifiers stall at the $\vartheta = \frac{4}{7}$ attenuation wall! Fusing the sorting-barrier-free **sparse Schur pivots** of [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) with the **$90^\circ$ imaginary-chord multi-stage resonant tunneling** of [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) points to a striking formalizable architecture—turn the page to [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)!

::: {.viz src="riemann-prime-arc-path-integral-sandbox" height="640"}
**Full Interactive Laboratory for the Riemann Path Integral and Prime Minimal Arc-Trihedra (`riemann-prime-arc-path-integral-sandbox`).** Freely switch across all four progressive experiment cards—"Euler Local Windings, Composite Path Spiral & Möbius Dual," "Critical-Line $\sigma = \frac{1}{2}$ Shell Locking & Zero Nulling," "Off-Critical Dual-Shell Splitting," and "Weil's Explicit Duality: Zero-Wave Sheet Sculpting the Prime Staircase"—inside a unified dark three-column laboratory stage while coupling the real abscissa $\sigma \in [0.20, 2.00]$, path count $N \in [20, 400]$, verified zero capsules $\gamma_1\text{–}\gamma_5$, Möbius exterior toggle, and zero-pair cap $K \in [5, 50]$ (violet renders the composite path chain $\sum n^{-s}$, Euler partial products, the 3D zero-wave partial-sum sheet, and `ARGUED` literature tiers; cyan renders forward prime shells $p^{-\sigma}$, the exact Chebyshev staircase $\psi_0(x)$, and $\Lambda(n)$ bars; magenta highlights reverse dual shells $p^{-(1-\sigma)}$, the Möbius exterior chain $\sum\mu(n)n^{-s}$, and the floor zero-wave residual; amber marks the continuation axis and bead $\zeta(s)$, active zero capsule $\gamma_k$, frontmost profile $K(t)$, and draggable stage handles; the red `OPEN` badge and accompanying text about the status of RH date from before the external verification; and green `LEAN ✓` badges mark instances of all seven `trureturing` kernel theorems in [@thm-ch34-riemann-prime-arc-bridge]).
:::
