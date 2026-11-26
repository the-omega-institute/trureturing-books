# Chapter 7 Universal Spectral Gaps, Site-Variance Cuts, and Three Chiral Generations on a 4D Lattice {#sec-ch07}

> "Counting three low eigenvalues is merely hearing three echoes; building a four-dimensional chiral Weyl measure is what gives the universe an irreversible heartbeat."

In Volume II, the heavy-mode tower of the 19-point Behrend shell governed gauge-coupling running, two-scale balancing, and the rank-five floor on neutral Higgs portals. Our gaze now crosses the spectral gap to the infrared edge, confronting Question 2 of the unification ledger: **why do light fermions appear in exactly three generations, and why do only the required chiralities survive in four dimensions?**

Nowhere in this investigation is wishful thinking more tempting—or rigor more unforgiving. It is all too easy to mistake "three small eigenvalues on a finite internal graph" for "a derivation of three four-dimensional chiral generations." Three deep chasms separate those two statements. First, why should the five hypercharge magnetic Laplacians on the 19-point shell isolate three modes rather than one or fifteen, and is the threshold an arbitrary integer or an intrinsic shell invariant? Second, positive eigenvalues on an internal graph are not four-dimensional Weyl fermions; they must be lifted via single-sided boundary partners or a four-dimensional lattice overlap kernel and tested against higher-order taste dispersion. Third, the decisive crucible lies not on smooth fields but on rough gauge links: once the full four-dimensional path integral is turned on, center and Cartan anomalies on the Weyl determinant line shatter naive rough-field measures, forcing us to measure exactly how many orthogonal Higgs frames are needed to protect the gap and whether the non-perturbative twelve-fermion electroweak instanton vertex survives at all.

This chapter maps all three chasms with quantitative precision, drawing a clean line between Lean-frozen theorems, verified interval certificates, and the open dynamical questions that remain.

## 7.1 Five-Charge Spectral Gaps, Site-Variance Cuts, and Character Orthogonality {#sec-ch07-spectral-gap}

We retain the shell geometry of [Chapter 1](ch01-behrend-shell-and-frequencies.md) and [Chapter 4](ch04-gauge-crossings-and-monotone-barriers.md): the 19-point Behrend shell with $135$ directed edges, two native clock-chord classes ($d = 724, 804$) driving dual phase clocks, and three softened radial edges attached to the pole $(17, 17, 17)$ with weight $1 - \delta$ (all other edge weights equal to $1$, where $\delta > 0$ is the positive radial-edge deficit decaying with Riemann-zero height). One Standard Model chiral family carries five signed hypercharge representations $Q, d^c, L, u^c, e^c$, corresponding in integer normalization $6Y$ to the five signed charges $q \in \{1, 2, -3, -4, 6\}$ (since $L_{-q} = \overline{L_q}$, the spectrum depends only on the absolute charges $|q| \in \{1, 2, 3, 4, 6\}$).

::: {.definition #def-ou-ch07-site-variance-cut title="Five-Charge Magnetic Laplacians, Site-Variance Cut, and Cyclic Character Split"}
Let $L_0$ denote the neutral weighted graph Laplacian of the 19-point Behrend shell with edge weights $w_{uv} > 0$. For each of the five hypercharge sectors $q \in \{1, 2, -3, -4, 6\}$, let $L_q$ be the $19 \times 19$ Hermitian magnetic Laplacian dressed with arc phases $u_{uv}^q$, let $c := \operatorname{tr}(L_0)/18$ be the neutral spectral mean, and define the dimensionless two-step mass operator

$$
D_q := L_q(L_q - cI), \qquad h_{q,j} := \bigl|\lambda_j(L_q)\bigl(\lambda_j(L_q) - c\bigr)\bigr|.
$$

Two light/heavy cutoffs are compared on this operator family:

1. **Fixed numerical cutoff**: truncating the low spectrum at the uniform dimensionless constant $9$ (counting modes with $h_{q,j} < 9$, or single-step eigenvalues $\lambda_j(L_q) < 9$).
2. **Intrinsic min-cut (site-variance cutoff)**: taking the minimum over all nontrivial bipartitions of the shell of the sum of squared boundary edge weights, which equals the minimum site variance of $L_0$ on single-vertex states $|v\rangle$:

   $$
   T := \min_v \Bigl(\langle v|L_0^2|v\rangle - \langle v|L_0|v\rangle^2\Bigr) = \min_v \sum_{u \sim v} w_{uv}^2 = 9 + (1 - \delta)^2.
   $$

Moreover, the cyclic coordinate shift $P : (x, y, z) \mapsto (y, z, x)$ preserves vertices, edge weights, and oriented transport phases, so it commutes with every $L_q$. Setting $\omega := e^{2\pi i/3}$, each 19-dimensional charge sector splits orthogonally into three cyclic character subspaces $(1, \omega, \omega^2)$.
:::

### 7.1.1 Universal Torus-Wide Spectral Gap and Character Orthonormality

The first striking discovery on this family is that the low-end spectral gap is completely blind to where the dual clocks point. Why do the third and fourth eigenvalues never collide anywhere on the two-clock torus? A clean pruning trick exposes the mechanism immediately: deleting the three inner clock-endpoint sites ($6, 7, 8$) leaves a $16 \times 16$ principal block $D$ that is completely independent of both clock phases! Full-torus Schur-complement certificates ([`ch39-all-zero-three-mode-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-all-zero-three-mode-gap.py)) establish at $\delta = 0$ that $\lambda_3(D) < 8.685 < 9.6001 < \lambda_4(D)$ in all five charge sectors; Cauchy interlacing immediately pins $\lambda_3(L_q)$ strictly below $8.685$.

Eliminating $D - tI$ at $t = 9.6001$ then diagonalizes the three-site Schur complement $C - tI - B^*(D - tI)^{-1}B$ in the $(1, \omega, \omega^2)$ basis into fifteen scalars, each a real constant plus harmonics in $u, v, \bar{u}v$ and their conjugates. In every one of those fifteen channels, the constant term minus twice the sum of harmonic magnitudes exceeds $0.04$. Including the negative-semidefinite radial-softening perturbation (norm at most $6\delta$, covering the actual-zero range $\delta \in (0, (23/25)2^{-20}/14^2) \subset [0, 10^{-8}]$) yields a **universal spectral gap across the entire dual-clock torus and all positive Riemann zeros**:

$$
\lambda_3(L_q) < 8.685 \;<\; 9 \;<\; 9.6 < \lambda_4(L_q) \qquad (\forall\, q \in \{1, 2, -3, -4, 6\}),
$$

with the three cyclic characters $(1, \omega, \omega^2)$ occupying multiplicities $(1, 1, 1)$ everywhere on the torus without ever crossing the gap.

Decomposing internal spaces into orthogonal character sectors rests on an exact, $\pi$-free rational backbone. As established in [Chapter 2](ch02-quaternion-clocks-and-haar-zeros.md) for dual-clock spherical Haar integration, the all-degree orthonormality of the even Chebyshev characters $E_m(\kappa)$ is frozen in Lean without real-analytic limits:

::: {.theorem #thm-ou-ch07-peter-weyl-orthonormal title="All-Degree Pi-Free Rational Peter-Weyl Character Orthonormality" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal"}
In `OmegaSphericalHaarMidpoint`, let `haarInner` be the $\pi$-free rational spherical Haar inner product, let `evenCharPoly m` denote the degree-$m$ even Chebyshev character polynomial $E_m(\kappa)$, and let `degreeDelta m n` denote the Kronecker delta $\delta_{m,n}$ valued in `Omega.IntRatio`. Then for all natural numbers $m, n \in \mathbb{N}$, under rational equivalence `Equivalent`,

$$
\operatorname{haarInner}(\operatorname{evenCharPoly}\; m,\; \operatorname{evenCharPoly}\; n) \;\approx\; \delta_{m,n}.
$$

:::

::: {.proof}
First expand the product $E_m(\kappa) E_n(\kappa)$ via the even Chebyshev product-to-sum law into the finite sum $\sum_{r = |m - n|}^{m + n} E_r(\kappa)$, and invoke the extensionality of `haarKappaPoly` on coefficient lists to reduce to single-character expectations. The proof simultaneously establishes a closed shifted-moment table for all shift exponents $j \in \mathbb{N}$ and degrees $r \in \mathbb{N}$ by two-step induction in $r$, using the $\pi$-free factorial moment recurrence to reduce the inductive step to an integer polynomial identity. Evaluating at $j = 0$ annihilates every $r \ge 1$ through the leading factor $0$ in the falling factorial while returning $1$ at $r = 0$. Since $r = 0$ lies in $[|m - n|, m + n]$ if and only if $m = n$, the finite sum collapses identically to `degreeDelta m n`. The full proof is checked by the Lean kernel.
:::

### 7.1.2 Admissible Global Ranks, Six-Step Rational Filtering, and the Cutoff Showdown

[@thm-ou-ch07-peter-weyl-orthonormal] anchors character orthogonality in exact rational algebra. Physical honesty, however, immediately forces the next question: **across all five charges and all positive Riemann zeros, is rank $3$ the only globally shared cutoff?** It is not. Exhausting all candidate uniform cutoffs via full-torus Schur interval certificates and $34$ actual zeros gives the complete classification ([`ch39-all-common-shell-ranks.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-all-common-shell-ranks.py)):

- **All globally admissible nontrivial ranks** form the exact four-element set $\{1, 3, 7, 15\}$.
- Selecting the **widest shared spectral gap** picks rank **$1$**, not $3$.
- Requiring **equal cyclic-character multiplicities** across $(1, \omega, \omega^2)$ eliminates $1$ and $7$, yet still admits both **$3$ and $15$**.

Three generations therefore do not drop out for free from gap width alone; an additional physical criterion is needed to isolate $3$ from $\{3, 15\}$. A parallel arithmetic obstruction governs rational spectral filtering: the three chord lengths $d = 244, 724, 804$ induce three independent square classes $-d(3468 - d)$, so under RH and Landau's zero-sum formula the actual Riemann-zero clocks equidistribute densely on the torus. The closure of the lowest charge-2 eigenvalue consequently contains the entire interval $[0.042, 2.035]$, proving that any fixed univariate rational function that exactly annihilates the light band on all positive zeros must vanish identically. Once a finite tolerance is permitted, however, a **6-step fixed rational composition** suppresses band-splitting and squared-mass lifting leakage across the entire torus to **$1.26 \times 10^{-47}$**.

::: {.figure src="ch07-three-generation-gap"}
**Universal five-charge spectral gap, site-variance min-cut, and admissible global low-mode ranks on the 19-point Behrend shell.** The plot compares the torus-wide single-step magnetic Laplacian eigenvalue envelopes of all five hypercharge sectors $q \in \{1, 2, -3, -4, 6\}$ (cyan light band strictly below $8.685$ split evenly across $(1, \omega, \omega^2)$, heavy band strictly above $9.6$), contrasts the fixed cutoff $9$ with the intrinsic site-variance min-cut $T = 9 + (1-\delta)^2$ (which lies in $(9.99999999, 10)$ under the actual-zero bound $0 < \delta < (23/25)2^{-20}/14^2$, and satisfies $T \ge 9.9999999800000001$ under the general torus bound $\delta \le 10^{-8}$), and displays the complete globally shared rank set $\{1, 3, 7, 15\}$.
:::

Pitting the fixed cutoff $9$ against the intrinsic site-variance min-cut $T = 9 + (1 - \delta)^2$ on the **two-step mass readout** $h_{q,j} = |\lambda_j(L_q)(\lambda_j(L_q) - c)|$ along the actual Riemann-zero sequence exposes sharp operational differences. Counting vertices by "(degree, softened edges)" on the 19-point graph yields $(10, 0):3$, $(10, 1):3$, $(14, 0):3$, $(16, 0):6$, $(18, 0):3$, and $(18, 3):1$; a vertex of degree $d$ incident to $k$ softened edges gives boundary squared weight $d - k + k(1 - \delta)^2$, so the three softened degree-$10$ outer vertices simultaneously attain $T = 9 + (1 - \delta)^2$. Since every positive zero obeys $0 < \delta < (23/25)2^{-20}/14^2$, we always have $9.99999999 < T < 10$.

::: {.example #ex-ou-ch07-cutoff-comparison title="Head-to-Head Audit of Zeros #8236, #8359, and #148341 on the Two-Step Mass Readout Under Cutoff 9, Min-Cut T, and Dual-State Projections"}
On the dimensionless two-step mass readout $h_{q,j} = |\lambda_j(L_q)(\lambda_j(L_q) - c)|$ ($c = 15 - \delta/3$) under the sixteen-heavy-scalar two-loop strong-coupling window $[0.117, 0.119]$ and the four-layer curvature window $[0.998, 1.002]$, three concrete positive Riemann zeros expose the exact operational difference between the three cutoffs ([`ch39-first-native-cut.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-first-native-cut.py), [`ch39-neutral-site-variance-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-neutral-site-variance-gap.py), [`ch39-conjugate-site-projection-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-conjugate-site-projection-gap.py)):

| Zero index | Two-step spectrum under fixed cutoff $9$ | Two-step spectrum under min-cut $T = 9 + (1-\delta)^2$ | Physical window readouts and notes |
| :---: | :--- | :--- | :--- |
| **#8236** | Charge-6 third two-step mass sits in $(9, T)$; fails cutoff $9$ | **Earliest min-cut triple-window hit** ($\gamma \approx 8354.9185$) | $\max_q h_{q,3} \approx 9.2061 < T < 10.5855 \approx \min_q h_{q,4}$; $\alpha_s \in (0.118306, 0.118312)$; curvature ratio $\approx 1.000938$ |
| **#8359** | **Earliest cutoff-$9$ triple-window hit** (67 of first 8,192 are 3-mode, 0 hit all 3 windows) | Passes (both the centered box and every fixed-cutoff triple-window two-step gap contain $[9, 10.19]$) | Under dual-state charge-conjugate real projections, **charge 2 drops to 2 modes** |
| **#148341** | Only 2 charge-6 two-step modes below $9$; rejected | **Rescued by min-cut $T$**: 3 modes in all 5 charges + both other windows | $\max_q h_{q,3} \approx 9.4749 < T < 10.5917 \approx \min_q h_{q,4}$; clock distance $\approx 0.2315\;\mathrm{rad}$, flavor coordinate $\approx 0.9722$ |

The dual-state site-projection counterexample carries an equally sobering lesson: enlarging each site to a conjugate pair $(+q, -q)$ transported by $U_{ij} = \operatorname{diag}(u_{ij}^q, \bar{u}_{ij}^q)$ with independent nontrivial complex orthogonal projectors $P_i \in M_2(\mathbb{C})$ drops the commutator energy $E_q(P) = \frac{1}{2}\|[L_q \oplus L_{-q}, P]\|_{\mathrm{HS}}^2$ to **zero minimum** across all five charges and all clock phases! The clock-free triangle $14 \to 0 \to 16 \to 14$ carries non-real holonomy $u$ with $u^q \neq \bar{u}^q$, locking any holonomy-commuting rank-1 projector onto the two fixed charge axes. Even imposing charge-conjugation reality $J P_i J^{-1} = P_i$ restores a strictly positive minimum (equaling $T$ for charge $6$) only at the cost of cutting #8359's charge-2 count down to two light modes.
:::

Thus $T$ is a clean intrinsic graph invariant that strictly widens the triple-window candidate set, pulls the earliest witness forward to #8236, and rescues #148341—yet adopting it as the physical cutoff remains an explicit modeling postulate. In the interactive laboratory card below, you can sweep the height rail $\gamma$ across the unsoftened ($\delta = 0$) single-step magnetic Laplacian $L_q$ for all five charges, drag the spectral cut $\Lambda$, and compare directly against the site-variance line $T = 10$.

::: {.viz src="behrend-unification-lab" preset="three-gen-gap" height="500"}
**Five-charge spectral gap and site-variance min-cut lab card (`three-gen-gap`).** Sweep the height rail $\gamma$ across the five hypercharge sectors $q \in \{1, 2, -3, -4, 6\}$ of the unsoftened single-step magnetic Laplacian $L_q$ (cyan light modes always below $8.685$, split one-each across $(1, \omega, \omega^2)$; violet heavy modes always above $9.6$), drag the spectral cut $\Lambda$, and compare against the site-variance line $T = 10$ (at $\gamma_3 \approx 25.01$, a fourth mode in $q = -4$ enters below $T = 10$ while staying cleanly above the universal gap $(8.685, 9.6)$ and $\Lambda = 9$).
:::

## 7.2 4D Lattice Chiral Weyl Constructions, Boundary Partners, and Taste Dispersion {#sec-ch07-4d-lattice-weyl}

Three positive eigenvalues on an internal graph do not automatically become four-dimensional Weyl fermions. An immediate obstruction blocks naive zero-mode hopes: if a positive-weight magnetic Laplacian admits a charge-1 zero mode, parallel transport for every integer charge can be gauged flat, stripping away nontrivial flux. One must therefore track two explicit constructions: **internal single-sided boundary zero modes** and **four-dimensional lattice overlap chiral kernels**.

### 7.2.1 Three-Ray Single-Sided Boundary Partners, Clock-Edge Cover, and Zero Chern Numbers

On the internal shell itself, the clock-edge topology enforces three sharp structural facts:

- **Three-ray single-sided boundary partners**: removing one chiral partner on the first vertex of each of the three minimal-denominator rays leaves exactly **three same-chirality internal zero modes** in every Standard Model representation.
- **Unique 3-site cover and zero Chern numbers**: those three inner ray sites form the **unique** three-vertex cover of all clock edges on the shell; over the entire dual-clock torus $\mathbb{T}^2$, the three low-mode character line bundles carry **first Chern numbers $(0, 0, 0)$**, meaning the light-mode bundle is globally trivial over phase space.
- **Outer-orbit readout vs. inner-site blind phases**: every outer three-point clock-edge orbit reconstructs all three light states stably across all phases with inverse amplification strictly below $4$, whereas the three inner ray sites possess "blind phases" at which one light mode vanishes completely from readout.

### 7.2.2 5-Step Simplex Overlap Kernel, 19-Point Shell Lift, and $8K - 3$-Step Taste Matching

Turning to four-dimensional Euclidean lattices, constant fluxes share the rational Euclidean metric $g = I - J/5$ (the exact metric that returns in [Chapter 10](ch10-regge-gravity-and-spin2.md) for four-dimensional simplicial Regge gravity). Building a **5-step simplex Wilson-overlap kernel** on this metric ([`ch39-simplex-overlap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-simplex-overlap.py)) produces three key properties:

1. **Three-species free mass window**: throughout the regulator-mass interval

   $$
   \frac{25 - 5\sqrt{5}}{4} \;<\; m \;<\; \frac{7}{2},
   $$

   the free kernel yields exactly **three same-chirality Weyl species**, with a uniform overlap gap equal to the distance from $m$ to the nearer window endpoint (attained whenever the box side length is a multiple of $30$).
2. **Smooth-flux Pfaffian index law**: for the strictly closed 5-step kernel (forcing the negative diagonal step to equal the inverse product of the four coordinate links) at $m = 139/40$, whenever every unit-charge plaquette principal turn is at most $2^{-29}$, the chiral index equals precisely

   $$
   I = -3\operatorname{Pf}(C),
   $$

   where $C$ is the antisymmetric matrix of the six integer fluxes ([`ch39-smooth-flux-index.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-smooth-flux-index.py)). Two-plane unit flux gives $I_{\bar{\mathbf{5}}} = -6$ and $I_{\mathbf{10}} = -18$, and every Cartan determinant charge cancels identically across all smooth diagonal backgrounds.
3. **19-point shell lifted to 4D overlap**: taking the shell matrix as the four-dimensional Wilson mass with shared external gauge transport yields, at small curvature, a full-shell overlap index equal to **$3\times$ the single-copy index**, while all sixteen heavy layers carry index zero. Moreover, small-curvature electroweak backgrounds (zero-hypercharge-flux weak sectors and all admissible pure-hypercharge flux sectors) inherit a gauge-invariant three-generation Weyl measure even when each four-dimensional lattice site independently switches between zero #11431 and zero #133931; letting the two clocks wind once around distinct spatial axes keeps the four-dimensional kernel gap strictly **$> 0.008$** under explicit nearest-neighbor mass-variation bounds.

Even so, the three light cones on the simplex lattice do not automatically enjoy cyclic symmetry. At bare kinetic level, their translation characters permit only exchange of a conjugate pair—not the shell's order-3 cycle—and second- and third-order momentum terms split the three cones. Finite-range dispersion matching nonetheless extends to arbitrarily high order ([`ch39-finite-taste-jets.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-finite-taste-jets.py)):

- A strictly increasing odd degree-5 polynomial in the single-step imaginary part matches all second- and third-order dispersions across the entire three-species window while keeping the free gap (degree $5$ is sharp; holding the Wilson term fixed leaves an irreducible fourth-order discrepancy).
- Improving both kinetic and Wilson scalar terms matches all three light-cone taste jets to **any prescribed finite order $K$** using at most **$8K - 3$ steps** while preserving at least half the original free gap; conversely, finite-range Clifford kernels preserving adjacent heavy centers require step range $32r \ge K + 1$.

The table below puts all four routes from the internal shell to four-dimensional chiral generations side by side:

| Construction route | Core hypotheses and mass window | Index / readout invariants | Remaining structural limit |
| :--- | :--- | :--- | :--- |
| Three-ray single-sided boundary partners | Remove one chiral partner on first site of 3 minimal rays | $3$ same-chirality internal zero modes; unique $3$-site cover; torus Chern numbers **$(0, 0, 0)$** | Inner sites suffer blind phases; outer 3-point orbits read stably (inverse amp $< 4$) |
| 5-step simplex overlap kernel | Metric $g = I - J/5$, $(25 - 5\sqrt{5})/4 < m < 7/2$ | $3$ free same-chirality species; smooth (plaquette turn $\le 2^{-29}$) index **$-3\operatorname{Pf}(C)$** | Bare kinetic splits cones at 2nd/3rd order; lacks order-3 cycle |
| 19-point shell lifted to 4D overlap | Shell matrix as 4D Wilson mass, shared gauge transport | Full-shell index **$3\times$ single-copy index** at small curvature; 16 heavy layers index $0$ | Per-site #11431/#133931 switching keeps measure; spatial clock winding gap $> 0.008$ |
| Higher-order taste-jet matching | Improved kinetic + Wilson scalar to any order $K$ | Matches $K$-jets in **$\le 8K - 3$ steps**, keeping $\ge 1/2$ free gap ($32r \ge K + 1$) | Inherits smooth index $-3$; still vulnerable to rough-gauge anomalies |

Crucially, every such finite-order improvement inherits the smooth unit-flux index $-3$—meaning it polishes the free infrared limit to arbitrary order without escaping the non-perturbative rough-gauge storms ahead.

## 7.3 Rough-Gauge Measure Obstructions, Orthogonal Higgs Frames, and the Pure-Weak Twelve-Fermion Vertex {#sec-ch07-rough-measure}

Smooth fields lull one into complacency; full lattice path integrals live in the rough regime. On the six Riemann zeros calibrated to both gauge and Newton scales, inserting the common coefficient into the full $SU(5)$ microscopic plaquette weight leaves the conditional probability of a single coordinate plaquette lying within $0.15$ of the identity below $0.184$, and drives the probability of entering the $2^{-26}$ smooth ball below **$2^{-560}$** ([`ch39-amplified-smoothness.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-amplified-smoothness.py)). Under unamplified RH triangular face weights—even when the negative diagonal step is strictly closed as the inverse product of the four coordinate links—any fixed positive gap threshold is breached with arbitrarily high confidence in sufficiently large finite boxes, and any fixed near-zero spectral window acquires an expected eigenvalue count bounded strictly below in proportion to the number of disjoint sub-boxes ([`ch39-closed-link-spectrum.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-closed-link-spectrum.py)). Rough gauge backgrounds are not rare pathologies; they carry almost the entire measure.

### 7.3.1 Rough Center Anomalies, Electromagnetic Cartan Charge, and the Quadratic Index Law

Inside that rough domain, four sharp non-perturbative results set the exact boundaries of what works and what breaks:

| Test arena | Explicit lattice construction | Quantitative obstruction or survival bound | Replay certificate |
| :--- | :--- | :--- | :--- |
| Rough $SU(5)$ center anomaly | Closed $SU(5)$ links on $5^4$ periodic box | $(I_{\bar{\mathbf{5}}}, I_{\mathbf{10}}) = (2, 7)$, Weyl center charge $-2 + 14 \equiv 2 \pmod 5$; three backgrounds cover the whole mass window | [`ch39-rough-overlap-index.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-rough-overlap-index.py) |
| EM Cartan charge & quadratic law | Two-plane finite EM flux on $5^4$ box | Center charge cancels, yet weak-isospin Cartan charge is **$-100$** ($460/625$ assignments fail); cancellation requires $I(k) = c k^2$ | [`ch39-magnetic-weyl-index.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-magnetic-weyl-index.py) |
| Parallel orthogonal Higgs frames | Ordered orthogonal fundamental $SU(5)$ frames | **$3$ frames** leave $SU(2)$ and admit large-box near-zero modes; **$4$ frames** hold gap $1/100$ with stiffness $\kappa$ growing logarithmically | [`ch39-higgs-rank-gap.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-higgs-rank-gap.py) |
| Pure-weak 12-fermion vertex | Odd-index pure $SU(2)$ on $2^4$ + six RH weights | Real pairing of $12$ doublets makes $(QQQL)^3$ sign-definite; normalized $\Delta B = \Delta L = 3$ expectation **$> 2^{-9472}$** | [`ch39-rh-weighted-weak-vertex.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-rh-weighted-weak-vertex.py) |

The first blow is the **positive-measure rough center obstruction**: on a $5^4$ periodic box, an explicit closed $SU(5)$ rough background produces overlap indices $(I_{\bar{\mathbf{5}}}, I_{\mathbf{10}}) = (2, 7)$. On the left-handed Weyl determinant line, the $\mathbb{Z}_5$ center generator therefore carries net charge

$$
-I_{\bar{\mathbf{5}}} + 2 I_{\mathbf{10}} = -2 + 14 = 12 \equiv 2 \pmod 5 \neq 0.
$$

This counterexample persists across an open positive-measure set under the RH plaquette weights. Even if $\bar{\mathbf{5}}$ and $\mathbf{10}$ are granted independent Wilson masses $(m_{\bar{\mathbf{5}}}, m_{\mathbf{10}})$, just three explicit rough backgrounds cover the entire two-dimensional three-species mass window ([`ch39-uniform-center-obstruction.py`](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-uniform-center-obstruction.py)). Without restricting the rough gauge domain, this kernel cannot admit a globally gauge-equivariant Weyl measure.

The second blow comes from **electromagnetic Cartan charges and the quadratic index law**: even along the ordinary electromagnetic direction on $5^4$, where two-plane finite flux makes the $\mathbb{Z}_5$ center charge vanish identically, the weak-isospin Cartan generator still acquires determinant charge **$-100$**—and $460$ out of $625$ ordered diagonal flux assignments carry nonzero Cartan charge. For general finite Abelian link fields prior to mode merging, vanishing of all Cartan determinant charges across paired diagonal assignments holds **if and only if the index obeys the exact quadratic law $I(k) = c k^2$** (the parallelogram identity), which smooth Pfaffian backgrounds satisfy and rough backgrounds break.

### 7.3.2 The Orthogonal Higgs-Frame Threshold and the Pure-Weak Twelve-Fermion Vertex

Can covariantly parallel fundamental Higgs frames rescue the rough gauge domain? The transition between failure and stability is knife-edge sharp:

::: {.remark #rem-ou-ch07-three-vs-four-frames title="Why Three Orthogonal Higgs Frames Still Leak Near-Zero Modes While Four Lock the Gap Logarithmically"}
Pinning the $SU(5)$ gauge group sequentially by ordered orthogonal fundamental Higgs vectors leaves unbroken subgroups $SU(4)$ ($1$ frame), $SU(3)$ ($2$ frames), $SU(2)$ ($3$ frames), and the trivial group $\{1\}$ ($4$ frames):

- **One to three frames fail in large boxes**: as long as a non-Abelian $SU(2)$ subgroup survives—even at arbitrarily large Higgs stiffness $\kappa$ or strict parallel reduction—sufficiently large finite boxes hold enough disjoint sub-boxes for $\bar{\mathbf{5}}$ and $\mathbf{10}$ to develop simultaneous near-zero modes at any chosen confidence level. While three frames locally yield an equivariant determinant phase near the $(2, 7)$ rough orbit, they cannot suppress large-box $SU(2)$ fluctuations.
- **Four frames achieve logarithmic gap protection**: with **four** ordered orthogonal fundamental Higgs frames, every continuous gauge freedom is pinned. Maintaining a common kernel gap $\delta \ge 1/100$ at fixed confidence requires the finite Higgs kinetic stiffness $\kappa$ to grow only **logarithmically** with box side length $L$. Augmenting the four-frame domain with one diagonal-link complex readout yields a smooth, translation-equivariant chiral measure phase across a full-probability open domain whose remaining defect locus has real codimension $\ge 2$, with volume-independent measure-current locality decay $\le 2^{45}\delta^{-4}(1 + \delta^2/2^{18})^{-2D}$.
:::

Finally, a genuine three-generation chiral lattice theory must pass the ultimate non-perturbative acid test: generating the 't Hooft three-family baryon- and lepton-violating vertex after integrating over gauge fields. On a $2^4$ lattice with explicit odd-index pure $SU(2)$ links, the real pairing of twelve weak doublets renders the $(QQQL)^3$ fermion integral **strictly sign-definite** on every gapped configuration, eliminating sign-problem cancellations completely! Integrating over the full pure-weak link measure weighted by the six calibrated RH zero heights proves that the normalized expectation obeys

$$
\bigl\langle (QQQL)^3 \bigr\rangle_{\text{weak}} \;>\; 2^{-9472},
$$

varying by less than $2.576 \times 10^{-7}$ when the six zero labels are swapped across all faces. Opening an explicit positive-volume neighborhood of color and hypercharge fluctuations around the gapped pure-weak domain still preserves a vertex modulus **$> 2^{-9474}$**. Moreover, smooth odd-index pure-weak link configurations exist on every periodic box with $L \ge 2^{22}$, satisfying plaquette deviation $\le 360464/L^2$ and a volume-independent Wilson action upper bound.

::: {.problem #prob-ou-ch07-chiral-selection title="Open Horizon of Question 2: Selecting Three Generations and an Unpinned 4D Interacting Chiral Theory"}
This chapter has established the torus-wide five-charge spectral gap ($\lambda_3 < 8.685 < 9.6 < \lambda_4$), the intrinsic site-variance min-cut $T = 9 + (1-\delta)^2$, the 5-step simplex three-species overlap kernel (smooth index $-3\operatorname{Pf}(C)$), the four-frame logarithmic gap-protection regime, and the strictly positive pure-weak $\Delta B = \Delta L = 3$ twelve-fermion vertex ($> 2^{-9472}$). By the monograph's first-principles standard, three fundamental doors remain open:

1. **Uniqueness of three generations**: globally shared cutoffs across all positive zeros admit $\{1, 3, 7, 15\}$; the widest gap picks $1$, and equal cyclic-character weight still leaves $3$ and $15$. Arc geometry has not yet singled out $3$ uniquely.
2. **Dynamical origin of the cutoff**: while $T$ reads only shell edge weights, enlarging vertices to conjugate charge pairs collapses the unconstrained minimum to zero and drops #8359's charge-2 count under charge conjugation; deriving the physical cutoff from the underlying action remains open.
3. **Intrinsic rough-measure protection**: removing the $(I_{\bar{\mathbf{5}}}, I_{\mathbf{10}}) = (2, 7)$ center charge $2 \pmod 5$ and electromagnetic Cartan charge $-100$ in an interacting 4D chiral gauge theory without external four-frame Higgs pinning remains an unsolved lattice problem.
:::

We now hold a three-generation light subspace together with its exact non-perturbative fracture lines. The moment we feed those three generations into the furnace of masses and quark mixing, however, an even fiercer irony strikes: the very $\mathbb{Z}_3$ cyclic symmetry that made three generations effortless is the sworn enemy of CKM mixing and mass hierarchies. That collision is the subject of the next chapter.
