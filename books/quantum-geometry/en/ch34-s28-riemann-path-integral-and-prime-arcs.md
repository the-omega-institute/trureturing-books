# 31.1 The Riemann Path Integral and Prime Minimal Arc-Trihedra: Euler Winding Operators, Half-Density Square Law, and Critical-Line Cancellation {#sec-ch34-riemann-path-integral-and-prime-arcs}

> *"At the deepest geometric and physical level, the Riemann Hypothesis is not merely analogous to a path integral—it is the arithmetic universe's purest Feynman partition function over prime minimal arc-trihedra ($\Delta\mathcal{T}_p$): the Euler product is the local winding operator around each single prime arc-trihedron, the Dirichlet series is the global phase sum over all composite natural-number trajectories, and the pinning of nontrivial zeros to the critical line $\operatorname{Re}(s) = \frac{1}{2}$ expresses the geometric necessity jointly locked in by the round-trip double-projection square law ($\cos^2\theta$ half-density unitarity) and 'reversal as the movement of the Dao' ($100\%$ anti-phase cancellation between forward and reverse dual paths)."*

The epigraph is the author's own sentence and states a geometric picture (`MODEL`); its clause on "the pinning of nontrivial zeros to the critical line" is the Riemann hypothesis itself ([@conj-riemann-hypothesis], `OPEN`), which remains unproved and is not proved in this section.

In [Chapter 30 §30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) and [§30.3](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes), we saw how a physical quantum state—once it pivots $90^\circ$ off the observer's visible real axis `I` into the perpendicular imaginary blind plane `i` ($\hat{\mathbf{i}}^2 = -1$)—cuts straight across a barrier via the flat interior secant chord of a minimal arc-trihedron in space, reunites across moments in time, and rebuilds calculus out of comparative rotors and circular-arc sagittas; earlier still, in [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), we derived **Born's round-trip double-projection square law** $\cos^2\theta$ from the self-contained radar-echo calibration of an internal observer ([@thm-ch34-roundtrip-born-and-imaginary-blindspot]). Now we turn this complete geometric microscope—real-axis damping along `I`, orthogonal blindspot phase rotation in `i`, and minimal-arc path summation—directly onto the arithmetic heartland opened in [Chapter 22 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4): **the Riemann zeta function $\zeta(s)$ and its critical line $\operatorname{Re}(s) = \frac{1}{2}$** (`MODEL`).

Before unfolding this arithmetic path integral, we anchor three strict epistemological guardrails in accordance with the monograph's verification contract: first, rational linear independence of prime logarithms, the Euler–Dirichlet identity on $\operatorname{Re}(s) > 1$, global reflection and conjugation symmetries of $\operatorname{xiReading}$, alternating-series continuation to $\operatorname{Re}(s) > 0$ ($s \neq 1$), the unconditional integrated explicit formula on $y > 0$, and the quartic entire counterexample proving that reflection plus conjugation symmetry alone **never** suffices to localize zeros onto a fixed line are all kernel-verified in the pinned `trureturing` repository ([@thm-ch34-riemann-prime-arc-bridge], `LEAN ✓`); second, the reciprocal Möbius Dirichlet series, Littlewood's equivalence theorem, the pointwise von Mangoldt–Weil explicit formula, and quantum-statistical "primon gas" / semiclassical trace models belong to established mathematical physics literature (`Literature result, not formalized in this book`), accompanied by benchmarks verified to 100-digit working precision (`manual derivation` / `NUM`); third, reading the opening thesis's "geometric necessity" through prime minimal arc-trihedra $\Delta\mathcal{T}_p$ and round-trip half-density unitarity constitutes this monograph's unified geometric model (`MODEL`), whereas **the Riemann Hypothesis itself** ([@conj-riemann-hypothesis])—asserting that *every* nontrivial zero lies on $\operatorname{Re}(s) = \frac{1}{2}$—remains an unsolved open conjecture (`OPEN`). Pinpointing the exact algebraic gap between two-arm interferometric balance and an infinitary multi-path sum is precisely what hands the baton to [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling), where multiplicative Schur-pivot renormalization meets multi-stage resonant tunneling.

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

It is never an empty void, but the arithmetic culmination of *"reversal as the movement of the Dao"* from [§29.10](ch34-s09-reversal-and-concept-cascade.md#sec-ch34-reversal-diagonal-and-concept-cascade) and [§29.13](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop) (`MODEL`): infinitely many analytically continued arithmetic path phasors interfere destructively at the origin `O`, simultaneously driving both the visible real-axis projection `I` and the $90^\circ$ blindspot projection `i` to zero! Why, across the entire open strip $0 < \sigma < 1$, does the **critical line $\sigma = \frac{1}{2}$** occupy a uniquely privileged geometric spine—and where exactly lies the boundary between proved mechanism and open conjecture? Three interlocking mechanisms lay out the complete anatomy:

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

Historically, Davenport and Heilbronn (1936) likewise constructed Dirichlet linear combinations satisfying a Riemann-type functional equation and critical-line reality that nonetheless possess infinitely many off-critical zeros precisely because they **lack an Euler product** (`Literature result, not formalized in this book`). Put plainly: half-density unitarity and dual-arm balance explain why $\sigma = \frac{1}{2}$ is the unique unitary symmetry spine (`MODEL`). That infinitely many zeros do lie on the critical line is Hardy's theorem (1914; `Literature result, not formalized in this book`); the picture above shows only that each sign change of the real-valued function yields a zero, not that there are infinitely many sign changes. Ruling out every hypothetical conspiring quartet $\frac{1}{2} \pm \delta \pm i\gamma_0$ requires, on this book's reading, transporting the **multiplicative positivity of the Euler product** from $\sigma > 1$ across the $s = 1$ pole barrier—a step for which no proof is known, which is why **the Riemann Hypothesis ([@conj-riemann-hypothesis]) remains an open conjecture (`OPEN`)**, and why [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling) introduces multiplicative Schur-pivot renormalization and multi-stage resonant tunneling!

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
**Off-Critical ($\sigma = 0.38 / 0.62$) Dual-Shell Splitting and Rogue-Quartet Epistemic Contrast (`off-line-shell-imbalance`).** Dragging the amber handle or $\sigma$ slider off $0.50$ (opening at $\sigma = 0.62,\; t = \gamma_1$, or symmetrically at $\sigma = 0.38$): on the floor, the cyan forward shells $p^{-\sigma}$ ($2^{-0.62} \approx 0.6507$) and magenta dual shells $p^{-(1-\sigma)}$ ($2^{-0.38} \approx 0.7684$) split apart, shifting the axis of the violet path spiral and displacing the amber continuation axis and bead $\zeta(s)$ off `O` to $\lvert\zeta(0.62 + i\gamma_1)\rvert \approx 0.0907$, while the right-hand readout and evidence panels evaluate the symmetric off-line quartic $F(s)$ of `full_symmetry_not_fixed_line_localization` at $\delta = \sigma - \frac{1}{2},\; \gamma = t$ alongside the red `OPEN` badge of [@conj-riemann-hypothesis].
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

::: {.theorem #thm-ch31-prime-window-rh title="Small prime-tail windows and the Riemann hypothesis" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.rh_iff_frequently_small_prime_windows"}
Fix a real $b>1$. The Riemann hypothesis holds if and only if for every $\eta>0$ and every real $R\ge2$ there exists a real $Y\ge R$ such that $A_{\vartheta,b}(Y)\le Y^\eta$.
:::

::: proof
Under RH, $|U(x)|/\sqrt{x}$ is bounded for all sufficiently large $x$. Integrating this bound and the prime-power correction over $[Y,Y^b]$ gives $A_{\vartheta,b}(Y)\le C_b\ln Y$. Thus every sufficiently large $Y$ satisfies the required power bound.

Conversely, suppose $\zeta(\rho)=0$ with $\beta=\operatorname{Re}\rho>1/2$. For every $\varepsilon>0$, all sufficiently large $Y$ satisfy $A_{\vartheta,b}(Y)\ge Y^{b(\beta-1/2)-\varepsilon}$. Fix $1<h<b$ and a small $0<\delta<\beta-1/2$, then choose $\sigma$ large enough to make both Gamma tail decay rates positive. Two disks of the same radius separate the pole contribution from the error. The complex center $p$ lies at distance $d<\sigma-\beta+\delta$ from the isolated pole, where $\sigma=\operatorname{Re}p$. This pole can come from a different zero. The zero-free disk at the real center gives a Cauchy error bound. Taking the derivative order $k=\lfloor\sigma h\ln Y\rfloor$ puts the peak of the Gamma kernel near $h\ln Y$. After normalization by $d^k$, the contribution from outside the window is $O((d/\sigma)^k)$ and tends to zero as $k$ grows. The growth rate left inside is $h\sigma\ln((\sigma-1/2)/d)>h(\beta-1/2-\delta)$. Taking $h$ close enough to $b$ and $\delta$ small enough keeps the exponent loss below $\varepsilon$. [Window mass forced by an off-line zero](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.off_line_zero_forces_window_mass)

Take $\varepsilon=\eta=b(\beta-1/2)/3$. The lower bound becomes $Y^{2\eta}$, in contradiction with $A_{\vartheta,b}(Y)\le Y^\eta$ on arbitrarily late windows. This excludes zeros to the right of the critical line. Reflection of the nontrivial zeros across that line gives RH. The full proof is checked by the Lean kernel.
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

## 31.1.4 Literature Lineage, Epistemic Boundary Audit, and Baton Handoff to §34.29 Arithmetic Pivot Tunneling {#sec-ch34-28-4}

Before stepping into the full 3D interactive laboratory and handing the baton to [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling), we archive the five-tier epistemological boundary separating Lean kernel theorems, classical number-theoretic and mathematical-physics literature, high-precision benchmarks, unified geometric modeling, and open problems:

::: {.remark #rem-ch34-riemann-path-integral-literature title="Literature Lineage and Five-Tier Epistemic Audit for the Riemann Path Integral, Primon Gas, Semiclassical Trace Formulas, and Explicit Duality (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** To uphold strict epistemological honesty, this section separates five distinct tiers of evidence and never conflates physical models or finite two-arm mechanisms with a proof of an open conjecture:

1. **Lean 4 kernel-verified theorems ([@thm-ch34-riemann-prime-arc-bridge] and [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) anchors)**: Rational linear independence of prime logarithms (`prime_log_rational_independence`), the Euler–Dirichlet identity on `1 < s.re` (`riemann_zeta_dirichlet_sum_eq_euler_product`), entire reflection and conjugation covariance of $\operatorname{xiReading}$ (`xi_reading_reflection`, `xi_reading_one_sub_conj`), the quartic counterexample exhibiting off-critical zero quartets $\{\frac{1}{2}\pm\delta\pm i\gamma\}$ under full zeta symmetry (`full_symmetry_not_fixed_line_localization`, $\delta \neq 0,\; \gamma \neq 0$), the unconditional integrated explicit formula on `0 < y` (`actual_integrated_explicit_formula`), alternating Dirichlet partial-sum continuation on `0 < s.re` with $s \neq 1$ (`tendsto_alternating_partialSums_eta_of_ne_one`), and rank-one Born modulus-square pairing weights (`rank_one_born_pairing_weight`) are machine-checked without axiom gaps in the pinned `trureturing` repository.
2. **Classical analytic number theory, quantum statistical mechanics, and quantum chaos literature (proved or established in the literature, not formalized in continuum form here)**: Analytic continuation of $\zeta(s)$, Poisson-theta derivation of the functional equation, and the critical-line conjecture originate with B. Riemann (*Monatsber. Königl. Preuss. Akad. Wiss. Berlin*, 671–680, 1859); the symmetric-truncation pointwise explicit formula for $\psi_0(x)$ and its adelic/Fourier duality were established by H. von Mangoldt (*J. Reine Angew. Math.* **114**, 255–305, 1895) and A. Weil (*Medd. Lunds Univ. Mat. Sem.*, Tome Supplémentaire, 252–265, 1952); the equivalence $\mathrm{RH} \iff M(x) = \mathcal{O}_\varepsilon(x^{1/2+\varepsilon})$ was proved by J. E. Littlewood (*C. R. Acad. Sci. Paris* **154**, 263–266, 1912); Dirichlet combinations obeying a functional equation without an Euler product and possessing off-critical zeros were constructed by H. Davenport & H. Heilbronn (*J. London Math. Soc.* **11**, 181–185 & 307–312, 1936); hyperbolic closed-geodesic and semiclassical periodic-orbit trace formulas carrying the stability prefactor $\lvert\det(I - M_p)\rvert^{-1/2} \sim e^{-L_p/2}$ were developed by A. Selberg (*J. Indian Math. Soc.* **20**, 47–87, 1956) and M. C. Gutzwiller (*J. Math. Phys.* **12**, 343–358, 1971), with the dilation Hamiltonian $\hat{H} = \frac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$ program articulated by M. V. Berry & J. P. Keating (*SIAM Rev.* **41**, 236–266, 1999); interpreting $\zeta(\beta)$ as the partition function of a free bosonic "primon gas" ($E_p = \ln p$) and noncommutative $C^*$-dynamical system with spontaneous symmetry breaking at $\beta = 1$ is due to B. Julia (*Number Theory and Physics*, Springer Proc. Phys. **47**, 276–293, 1990) and J.-B. Bost & A. Connes (*Selecta Math. (N.S.)* **1**, 411–457, 1995); and Kostant–Souriau half-densities ($\frac{1}{2}$-densities) in geometric quantization come from B. Kostant (*Lecture Notes in Math.* **170**, 1970) and J.-M. Souriau (*Structure des systèmes dynamiques*, Dunod, 1970).
3. **Elementary algebraic derivations and 100-digit numerical benchmarks (`manual derivation` / `NUM`)**: The two-arm prime interferometer bound $\lvert p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}\rvert \ge \lvert p^{-\sigma} - p^{-(1-\sigma)}\rvert$, identical vanishing $\operatorname{Im}\operatorname{xiReading}(\frac{1}{2}+it) = 0$ deduced from Clauses 3 and 4, and every numerical entry in [@ex-ch34-critical-zeros-and-dual-shells] and [@ex-ch34-weil-prime-staircase-reconstruction] are exact elementary derivations and 100-digit verified computations.
4. **Unified minimal arc-trihedron and concept-tower synthesis (`MODEL`)**: Interpreting primes $p$ as orthogonal minimal arc-trihedra $\Delta\mathcal{T}_p$, $\ln n$ as composite path action, $\mu(n)$ as Clifford exterior $\Lambda^k$ Pauli-exclusion chirality, and $\sigma = \frac{1}{2}$ as the observer's round-trip Born half-density spine inside the `1—3—3—1` concept tower constitutes this monograph's geometric synthesis model.
5. **Open frontier (`OPEN`)**: **The Riemann Hypothesis** ([@conj-riemann-hypothesis])—asserting that every zero in $0 < \operatorname{Re}(s) < 1$ satisfies $\operatorname{Re}(s) = \frac{1}{2}$—remains an **open conjecture (`OPEN`)**, as does the unconditional construction of a self-adjoint Hilbert–Pólya / Berry–Keating operator whose spectrum is proved equal to the nontrivial Riemann zero ordinates.
:::

Step into the full 3D interactive laboratory below to experience the entire arc of this section firsthand: start on the critical line $\sigma = 0.50$ and click through the five verified zero capsules $\gamma_1$ through $\gamma_5$, watching the violet minimal-arc path spiral climb around the amber continuation axis and seat its landing bead $\zeta(s)$ squarely inside the origin bullseye `O` ($\lvert\zeta\rvert = 0.0000$) at every single $\gamma_k$; next, nudge the amber handle or real-part slider $\sigma$ off $0.50$ by even $0.05$ or $0.12$ to watch the cyan forward shells $p^{-\sigma}$ and magenta reverse dual shells $p^{-(1-\sigma)}$ on the floor shrink and swell apart, snapping the amber $\zeta(s)$ bead cleanly off the origin; finally, switch to the prime-staircase scene and watch the critical-line zero-wave sheet cancel across composites to sculpt the sharp cyan prime staircase along the real axis!

At the very same moment, this sandbox sets up the sharpest dramatic question in modern number theory: if every prime minimal arc-trihedron $\Delta\mathcal{T}_p$ is already multiplicatively decoupled, zero-free, and strictly positive-definite inside the Euler safe zone $\sigma > 1$, why has a century of analytic number theory struggled to carry that positivity across the $s = 1$ pole mountain to hunt down hypothetical off-line quartets $\frac{1}{2} \pm \delta \pm i\gamma_0$? Because classical approaches queue natural numbers in a 1D total order $n = 1, 2, \dots, M$—walking straight into the **arithmetic sorting barrier** and the **Turán Zeno false-zero trap**, while single-stage mollifiers stall at the $\vartheta = \frac{4}{7}$ attenuation wall! Fusing the sorting-barrier-free **sparse Schur pivots** of [§30.1](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization) with the **$90^\circ$ imaginary-chord multi-stage resonant tunneling** of [§30.2](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit) points to a striking formalizable architecture—turn the page to [§31.2](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling)!

::: {.viz src="riemann-prime-arc-path-integral-sandbox" height="640"}
**Full Interactive Laboratory for the Riemann Path Integral and Prime Minimal Arc-Trihedra (`riemann-prime-arc-path-integral-sandbox`).** Freely switch across all four progressive experiment cards—"Euler Local Windings, Composite Path Spiral & Möbius Dual," "Critical-Line $\sigma = \frac{1}{2}$ Shell Locking & Zero Nulling," "Off-Critical Dual-Shell Splitting," and "Weil's Explicit Duality: Zero-Wave Sheet Sculpting the Prime Staircase"—inside a unified dark three-column laboratory stage while coupling the real abscissa $\sigma \in [0.20, 2.00]$, path count $N \in [20, 400]$, verified zero capsules $\gamma_1\text{–}\gamma_5$, Möbius exterior toggle, and zero-pair cap $K \in [5, 50]$ (violet renders the composite path chain $\sum n^{-s}$, Euler partial products, the 3D zero-wave partial-sum sheet, and `ARGUED` literature tiers; cyan renders forward prime shells $p^{-\sigma}$, the exact Chebyshev staircase $\psi_0(x)$, and $\Lambda(n)$ bars; magenta highlights reverse dual shells $p^{-(1-\sigma)}$, the Möbius exterior chain $\sum\mu(n)n^{-s}$, and the floor zero-wave residual; amber marks the continuation axis and bead $\zeta(s)$, active zero capsule $\gamma_k$, frontmost profile $K(t)$, and draggable stage handles; red exclusively marks the `OPEN` frontier badge of [@conj-riemann-hypothesis]; and green `LEAN ✓` badges mark instances of all seven `trureturing` kernel theorems in [@thm-ch34-riemann-prime-arc-bridge]).
:::
