# 31.1.2 Minimal Arc-Trihedron Anatomy of $\operatorname{Re}(s) = \frac{1}{2}$: Round-Trip Half-Density Square Law, Dual-Arm Equal-Amplitude Balance, and the Epistemic Boundary of Symmetry {#sec-ch34-28-2}

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
