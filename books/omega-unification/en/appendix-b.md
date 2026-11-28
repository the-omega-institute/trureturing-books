# Appendix B Controlled Glossary, Six-Tier Evidence Ledger, and Live Formalization Statistics

This appendix provides four rapid-reference ledgers for `Omega Unification` (`OMEGA//UNIFY`): a controlled glossary and symbol dictionary across all five volumes, a six-tier epistemic evidence stratification ledger, an index of the `OMEGA//UNIFY` interactive laboratory and nine bespoke static figures, and live build-generated verification statistics compiled from the pinned `trureturing@dev` commit [{commit}](trureturing:). For the upstream replay repository layout, `ShellProjection.lean`, and the 34-script index, see [Appendix A](appendix-a.md).

## B.1 Controlled Glossary and Core Symbol Dictionary {#sec-ou-appb-glossary}

The dictionary below standardizes every recurring technical term across Volumes I–V, recording its exact scope so that model-internal parameters are never confused with first-principles constants:

| Term & Core Symbol | Mathematical Definition and Physical Scope | Primary Chapters |
| :--- | :--- | :--- |
| **19-Point Behrend Shell** $S_{19}$ | Nineteen-site 3-AP-free integer configuration on $x_1^2 + x_2^2 + x_3^2 = 867$, equipped with 135 original edges ($d^2 \le 804$) and 22 independent frequencies | [Ch 1](ch01-behrend-shell-and-frequencies.md) |
| **Dual Quaternion Clocks** $(U, V)$ | Unit-quaternion comparison clocks driven by positive Riemann zero ordinates $\gamma$ through original arc differences $p = (\theta_{724}-\theta_{244})\gamma$ and $q = (\theta_{804}-\theta_{244})\gamma$ (augmented by the shortest arc $v = \theta_{12}\gamma$) | [Ch 2](ch02-quaternion-clocks-and-haar-zeros.md) |
| **Candidate Riemann Zero Window** | Certified intervals of real positive zeros selected by Fejér collision bounds, Landau contours, and arithmetic Schur pivots (e.g., zeros #8236, #8359, #11431, #148341, #226358, and #2,306,888,100,085) | [Ch 3](ch03-riemann-zeros-fejer-and-landau.md), [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) |
| **Magnetic Shell Mass Operator** $L_\gamma$ | Nineteen-site graph Laplacian dressed with dual-clock charged edge phases, together with its two-step local extension $\kappa L(L - cI)$ governing heavy thresholds and light-mode gaps | [Ch 4](ch04-gauge-crossings-and-monotone-barriers.md) |
| **Gauge Kinetic Spectral Trace** $S(u), M_1$ | Positive heat-kernel kinetic trace $S(u) = \sum_i e^{-u y_i}$ and first scale moment $M_1 = \sum_i y_i e^{-y_i}$; single-trace balancing enforces the sharp scale floor $r = Q/M > 189$ and the $3.9Q$ perturbative UV wall | [Ch 5](ch05-kinetic-trace-and-uv-ceilings.md) |
| **Rank-Five Neutral Portal Floor** $d \ge 5$ | Minimum flat gauge-neutral scalar singlet rank required inside the spin-balanced two-loop crossing window to satisfy Higgs mass and quartic stability matching ($d \le 4$ strictly excluded) | [Ch 6](ch06-higgs-portals-and-electroweak-scale.md) |
| **Universal Spectral Gap & Site-Variance Cut** | Torus-wide five-charge three-light-mode gap $(8.685, 9.6)$ paired with the intrinsic site-variance min-cut $T = 9 + (1-\delta)^2$ (every fixed-cutoff triple-window zero's gap contains $[9, 10.19]$) | [Ch 7](ch07-chiral-three-generations.md) |
| **Cyclic Breaking & 42-Loop CP Floor** | Coordinate cycle $P:(x,y,z)\mapsto(y,z,x)$ forces a monomial CKM; empirical mixing requires $\|[T,X]\|_{\mathrm{HS}} > 0.0414$, and geometric triangle loops require exactly 42 cycles to reach reference CP violation | [Ch 8](ch08-flavor-hierarchy-and-ckm.md) |
| **Six-Face Flavor Coordinate** $c$ | Shell angular flavor coordinate forced into $|c| > 0.9404240$ by [2]+[4]; its 10-bit dyadic integer code `1011` (decimal) excludes monotone global vacua while 9-bit decimal code `505` admits a counterexample | [Ch 8](ch08-flavor-hierarchy-and-ckm.md), [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) |
| **Baryon Triality** $\mathbb{Z}_3$ | Residual discrete symmetry $X = h(2Y-B) + q(3B) \pmod 3$ enforcing $\Delta B \in 3\mathbb{Z}$ on local light operators and raising leading baryon-number violation to dimension 15 (dimension 18 preserving $B-L$) | [Ch 9](ch09-proton-stability-and-baryon-triality.md) |
| **Simplicial Regge Action & Hinge Load** | Deficit-angle sum $K = A(2\pi N_2 - 10\theta N_4)$ and hinge coordination $q_h$ on equilateral 4-simplices; recovers spin-2 Fierz–Pauli kinetics on $g = I - J/5$ while exposing the conformal-mode divergence | [Ch 10](ch10-regge-gravity-and-spin2.md) |
| **Four-Layer Vacuum Stencil** | Four-layer heavy heat-kernel cancellation scheme hitting a $0.2\%$ curvature window while remaining sensitive to cosmological-constant fine-tuning and external scale calibration | [Ch 11](ch11-induced-gravity-and-dark-energy.md) |
| **Shared Arithmetic Clock** $F(j)$ | Quadratic resolvent readout $F(j) = \langle s, (I + j^2 K)^{-1}s\rangle$ for one PSD operator $K$; at the baseline scale the six exact inputs give $p(B)>99.931\%$, and their 44-bit cells fix the seventh 35-bit code at `32071996606` | [Ch 12](ch12-shared-arithmetic-clock.md) |
| **529-Triangle Action & Winding Ladder** | Weighted dual-clock variational action over the 529 shell triangles, climbing thresholds 19, 21, 27, 31, 36 to the universal 105-winding floor while monotone weights fail globally by $> 1/4$ | [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) |
| **624 Internal Channels & Denominator-Three Shell** | 624 internal channels built from signed nearest-chord comparisons at shell poles, paired with the 76-site denominator-three relay sphere realizing 9-step returns and 17-beat local reflection feedback | [Ch 14](ch14-624-channels-and-memory-rank.md) |
| **Auxiliary Memory Rank Staircase** | Minimum auxiliary dimension needed to match the full three-clock response on the 19 visible sites as old-shell counterterm squared-chord cutoff $D$ widens: $38 \to 29\text{--}31 \to 26\text{--}27 \to 25\text{--}26 \to 24 \to 23 \to 21 \to 20 \to 19$ ($C_3$-symmetric sharp cutoff $D = 392$) | [Ch 14](ch14-624-channels-and-memory-rank.md) |

For rapid equation lookup across volumes, the table below summarizes recurring mathematical symbols:

| Symbol | Exact Meaning and Dimensional Role | Primary Chapters |
| :--- | :--- | :--- |
| $\theta_j = \arccos(1 - j/1734)$ | Central arc angle of an original chord with squared length $j$ on the radius-$\sqrt{867}$ shell | [Ch 1](ch01-behrend-shell-and-frequencies.md), [Ch 2](ch02-quaternion-clocks-and-haar-zeros.md) |
| $\gamma_n$ | Ordinate of the $n$-th positive Riemann zero (counted with multiplicity) | [Ch 3](ch03-riemann-zeros-fejer-and-landau.md) |
| $r = Q/M,\;\tau = \log(Q/\mathrm{TeV})$ | Ratio of crossing scale to base shell scale, and logarithmic running length above $1\,\mathrm{TeV}$ | [Ch 5](ch05-kinetic-trace-and-uv-ceilings.md) |
| $W_L^{\log}, W_R^{\log},\;\alpha_G^{-1}$ | One-loop logarithmic exposures of heavy left/right scalar towers and unified inverse gauge coupling | [Ch 5](ch05-kinetic-trace-and-uv-ceilings.md) |
| $B \subset (0, \infty)$ | Union of the three height bands concentrating $>99.931\%$ of shared-clock spectral weight | [Ch 12](ch12-shared-arithmetic-clock.md) |
| $T_j,\;F(j)$ | Reference arithmetic times from Riemann $\xi$ and $j$-th quadratic-resolvent clock readout | [Ch 12](ch12-shared-arithmetic-clock.md) |
| $k, d$ | Center even multiplier ($k = 32$) and chord denominator ($d = 724$) at the joint witness | [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) |
| $D$ | Squared-chord-distance cutoff for local old-shell counterterms ($56, 224, 296, 392, 544, 1152, 1376, 1568$) | [Ch 14](ch14-624-channels-and-memory-rank.md) |

## B.2 Six-Tier Epistemic Evidence Stratification Ledger {#sec-ou-appb-epistemic-ledger}

Every theorem, interval bound, effective construction, and open target across the monograph is strictly assigned to one of six epistemic tiers governed by a **strict non-escalation rule**: neither Arb ball enclosures, nor standalone upstream `Init` replays, nor external RH formalizations automatically elevate an `ARGUED`, `NUM`, `MODEL`, or `OPEN` claim into a pinned `LEAN ✓` frozen theorem:

| Evidence Tier & Label | Verification Mechanism & Provenance | Logical Boundary & Warrant | Representative Coverage & Pointers |
| :--- | :--- | :--- | :--- |
| **Tier 1 — Lean 4 Frozen Anchors** (`LEAN ✓`) | Frozen declarations on `the-omega-institute/trureturing@dev` at pinned commit [{commit}](trureturing:) (spanning both zero-axiom `OmegaInit`/`OmegaMath` foundations and classical `Mathlib` gauge anchors) | Kernel-checked and frozen under `Golden/Frozen/state/`; live statistics in [§B.4](#sec-ou-appb-live-stats) separate axiom-free (`axioms: []`), recorded standard-axiom, and unrecorded-axiom-metadata frozen declarations | Rational projective overlap and Cayley orthogonal rotations, $\pi$-free Haar moments and Peter–Weyl orthonormality, rational Lagrange–Gram and Schur minimization, Hurwitz $F_3$ adjoint injectivity, and norm-$5$ Hecke bounds |
| **Tier 2 — External Formalized RH/GRH Fact** (External Formalization) | Joint November 21, 2026 confirmation by the Lean FRO and Mathlib Initiative of [Alpöge's formalized proof of the Riemann Hypothesis](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) | Cited strictly as an external formalized mathematical boundary; separated cleanly from our finite-height arithmetic computations and lending zero endorsement to physical matching hypotheses | Critical-line zero foundation in [Ch 3](ch03-riemann-zeros-fejer-and-landau.md) and finite-height arithmetic clock enclosures in [Ch 12](ch12-shared-arithmetic-clock.md) |
| **Tier 3 — Written Proofs & Literature Bounds** (`ARGUED`) | Author- and reviewer-checked algebraic, analytic, and combinatorial proofs (archived in the master replay record and 9 thematic dossiers) plus bounded literature references | Carries no `LEAN ✓` badge; requires explicit hypotheses and falsifiable counterexamples, with purely algebraic cores remaining candidates for future Lean formalization | Single-trace $r \le 189$ convexity exclusion ([Ch 5](ch05-kinetic-trace-and-uv-ceilings.md)), cyclic-breaking $\|[T,X]\|_{\mathrm{HS}} > 0.0414$ and 42-loop CP floor ([Ch 8](ch08-flavor-hierarchy-and-ckm.md)), Gauss–Radau and Bernstein moment bounds ([Ch 12](ch12-shared-arithmetic-clock.md)), and PDG experimental inputs |
| **Tier 4 — Computational Certificates & Live Numerical Diagnostics** (`NUM`) | Fail-fast `Fraction` / `python-flint` (Arb, `fmpq_mat`) scripts across the 1,785-file replay archive (`experiments/ch39-omega-research/replay/` in `trureturing-experiments`), `Init`-replayed `ShellProjection.lean` (`rfl`), and explicitly labeled live numerical calculations in `OMEGA//UNIFY` | Exact rational, Arb, and `rfl` replay certificates carry zero floating-point drift strictly over stated input intervals and cutoffs; live sandbox diagnostics (such as finite-grid double-precision Jacobi spectra) explicitly disclose their precision and sampling limits; standalone `ShellProjection.lean` resides here rather than inside `trureturing@dev` frozen totals | Squared-radius-17 nine-point shell compression ([Appendix A §A.2](appendix-a.md#sec-ou-appa-shell-projection)), 35-bit seventh-time code `32071996606` ([Ch 12](ch12-shared-arithmetic-clock.md)), $> 1/4$ monotone exclusion and 105-winding witness ([Ch 13](ch13-winding-ladder-and-joint-vacuum.md)), and the $38 \to 19$ auxiliary-rank staircase ([Ch 14](ch14-624-channels-and-memory-rank.md)) |
| **Tier 5 — Model-Internal Effective Constructions** (`MODEL`) | Explicit effective constructions specifying every auxiliary representation, potential, scale, and weight input (accounting for the **4/4** model-internal witnesses) | Never presented as zero-fit derivations; every construction records its free inputs and fine-tuning sensitivity alongside its numerical fit | $r = 400$ two-loop crossing and rank-5 Higgs portal ([Ch 5–6](ch05-kinetic-trace-and-uv-ceilings.md)), 54-mode matrix Higgs flavor fit and $\mathrm{U}(1)_X$ triality completion ([Ch 8–9](ch08-flavor-hierarchy-and-ckm.md)), four-layer curvature balance ([Ch 11](ch11-induced-gravity-and-dark-energy.md)), and 100-parameter 105-winding vacua ([Ch 13](ch13-winding-ladder-and-joint-vacuum.md)) |
| **Tier 6 — First-Principles Open Roadmap** (`OPEN`) | The **0/4** core unification derivations still absent from a single master connection without post-hoc fitting | Explicitly preserves unproved status without verification links, providing crisp falsifiable acceptance criteria for future work | Deriving heavy thresholds and the electroweak scale, selecting the site-variance cut and building 4D interacting chiral generations, deriving a shared flavor action and dynamical proton protection, deriving $G_N$ and dark energy, and finding a natural non-monotone weight-selection law ([Ch 15](ch15-unified-verdict-and-open-roadmap.md), [Coda](coda.md)) |

## B.3 Interactive Laboratory and Nine-Figure Visual Media Index {#sec-ou-appb-media-map}

The monograph is paired with one five-card interactive laboratory, **`OMEGA//UNIFY`** (directory ID `behrend-unification-lab`), and **9 bespoke bilingual static figures** generated from semantic scripts under `books/omega-unification/figures/` following the repository's unified color-role contract (green and blue reserved for Lean-verified and axiom-free anchors, purple for written proofs, computational certificates, and proved sharp obstructions, amber for active model choices, and red reserved strictly for open problems). The first table indexes all five interactive experimental cards:

| Laboratory Code & Preset Card ID | Interactive Subject & Live Readouts | Embedded Chapter | Full Workbench |
| :--- | :--- | :---: | :---: |
| **`OMEGA//UNIFY`** · `shell-clocks` | 3D 19-point Behrend shell ($r^2 = 867$, 135-edge underlying graph), highlighted chord classes, and coupled dual quaternion clock phases | [Ch 1](ch01-behrend-shell-and-frequencies.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `three-gen-gap` | Five-charge mass spectra swept across dual clock angles, contrasting the site-variance cut $T$, fixed cutoff $9$, and torus-wide universal gap $(8.685, 9.6)$ | [Ch 7](ch07-chiral-three-generations.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `clock-bands` | Three-band spectral weight concentration ($>99.931\%$) under six clock inputs and 35-bit seventh-code separation | [Ch 12](ch12-shared-arithmetic-clock.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `winding-ladder` | 529-triangle dual-clock winding ladder ($19 \to 21 \to 27 \to 31 \to 36 \to 105$) and the $> 1/4$ monotone gap | [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |
| **`OMEGA//UNIFY`** · `memory-rank` | Three-clock minimum auxiliary rank staircase ($38 \to 19$) versus old-shell squared-chord cutoff $D$ and the $D = 392$ symmetric floor | [Ch 14](ch14-624-channels-and-memory-rank.md) | [Ch 15](ch15-unified-verdict-and-open-roadmap.md) |

The second table maps all **9 bespoke bilingual static figures** across the Prelude and Volumes I–V:

| No. | Static Figure ID | Chapter | Visual Subject & Core Mathematical Boundary |
| :---: | :--- | :---: | :--- |
| 1 | `ou-five-volumes` | [Prelude](README.md) | Five-volume cartography from the 19-point Behrend shell and Riemann zeros through Volumes I–V to `4/4` model witnesses and `0/4` zero-fit derivations |
| 2 | `ch01-behrend-shell` | [Ch 1](ch01-behrend-shell-and-frequencies.md) | Unit-sphere projection of the 19-point Behrend shell, pole $(17, 17, 17)$, six cyclic triples, shortest chord $12$, and clock chords $724, 804$ |
| 3 | `ch03-zero-window-landscape` | [Ch 3](ch03-riemann-zeros-fejer-and-landau.md) | Zero #11431 midpoint isolation vs. #11628, Fejér fourth-moment shares, and three log-scale harmonic phase-deficit windows |
| 4 | `ch05-gauge-threshold-boundaries` | [Ch 5](ch05-kinetic-trace-and-uv-ceilings.md) | Scalar threshold exclusion $r \le 189$, crossings at $r = 400$ and spin-balanced $r \approx 8.53$, and perturbative UV ceilings ($3.9Q, 14Q, 20Q, 30Q$) |
| 5 | `ch07-three-generation-gap` | [Ch 7](ch07-chiral-three-generations.md) | Torus-wide five-charge single-step three-mode gap $(8.685, 9.6)$, common cutoff $9$, and cyclic characters $(1, \omega, \omega^2)$ |
| 6 | `ch11-vacuum-balance-sensitivity` | [Ch 11](ch11-induced-gravity-and-dark-energy.md) | Logarithmic curvature ladder from Planck scale to $10^{-122}$, fractional UV sign-flip thresholds, and the four-layer $(-1, 3, -3, 1)$ cancellation stencil |
| 7 | `ch12-arithmetic-clock-bands` | [Ch 12](ch12-shared-arithmetic-clock.md) | Three-band spectral concentration ($>99.931\%$) and the 35-bit seventh-time split (`32071996606` vs. `32071992476`) |
| 8 | `ch13-winding-threshold-ladder` | [Ch 13](ch13-winding-ladder-and-joint-vacuum.md) | 529-triangle winding thresholds ($\le 18, 19, 21, 27, 31, 36, 105$), $> 1/4$ nonincreasing-weight gap, and joint witness `#2,306,888,100,085` |
| 9 | `ch14-memory-rank-staircase` | [Ch 14](ch14-624-channels-and-memory-rank.md) | Minimum auxiliary memory rank $38 \to 19$ against squared-chord cutoff $D$, $D = 392$ $C_3$-symmetric floor, and $D = 512$ clock jump |

## B.4 Live Build-Generated Formalization Statistics {#sec-ou-appb-live-stats}

Under the repository's source-only contract, authoritative counts of theorems, environments, and unique frozen declarations are never hand-maintained in prose. The summary table below is compiled automatically at build time from `trureturing.lock.json` at the pinned `trureturing@dev` commit [{commit}](trureturing:):

::: {.stats src="summary"}
:::

The complete index of frozen declarations cited across text and media, with direct line-level source links at the pinned commit, is generated on demand during compilation; inclusion in the index never alters a claim's epistemic tier.

::: {.stats src="declarations" display="link" format="html"}
Open the generated declaration index
:::

When consulting these compiled statistics, keep the boundary between indexing and proof responsibility explicit:

::: {.remark #rem-ou-appb-epistemic-boundary title="Boundary Between Live Statistics and Mathematical Warrant"}
The live summary and generated declaration index accurately report every machine-checked declaration, axiom classification, and environment count cited at the pinned `trureturing@dev` commit. Neither index membership nor interactive visualization upgrades an `ARGUED`, `NUM`, `MODEL`, or `OPEN` claim into a `LEAN ✓` theorem. Likewise, the upstream Python / Arb scripts and standalone `Init`-replayed `ShellProjection.lean` indexed in [Appendix A](appendix-a.md) belong to Tier 4 (`NUM`) rather than the frozen `trureturing@dev` totals; always verify each claim against its chapter hypotheses and stated boundaries.
:::
