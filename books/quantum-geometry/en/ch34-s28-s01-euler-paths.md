# 31.1.1 Euler Product $\equiv$ Path Integral: Irreducible Prime Minimal Arc-Trihedra $\Delta\mathcal{T}_p$, Additive Action $S[\Gamma_n] = \ln n$, and Fermionic Möbius Exterior Grade $\Lambda^k$ {#sec-ch34-28-1}

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
