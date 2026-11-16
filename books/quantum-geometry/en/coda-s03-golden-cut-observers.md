# The `trureturing` "Golden Cut" Formal Primitives and the Geometric Interpretation of Soul–Ruin Attractors {#sec-coda-trureturing-golden-cut-observer}

> **Author's Epigraph**: *"We have an explicit definition of the observer in `trureturing`, and we have now discussed the relationship between the soul and historical-ruin attractors."*（“观察者我们在trureturing有明确的定义, 我们又讨论了灵魂与历史遗迹吸引子的关系”）

If the Lorenz strange attractor supplies a continuous dynamical analogy, connecting this picture to the **`trureturing` Lean 4 formal library** pinned by this book (`D5/S1/Scale/MinkowskiModelSet`, `D5/S1/Deficit/ModelSet/GoldenCutAndProject`, `D5/S1/Deficit/Beatty/GoldenObserverRoute`, `D5/S1/Scale/Fibonacci`, `D5/S3/Observer/GoldenCoding/ZeckendorfRealThread`, and `D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns`) allows us to align the kernel-verified **golden cut-and-project model set and Zeckendorf observer coding theorems (`LEAN ✓`)** transparently with the author's **philosophical interpretation of the soul, forgetting, and historical-ruin attractors (`MODEL`)**.

## The Golden Cut-and-Project Model Set and Observer Route Theorems in `trureturing` (`LEAN ✓`) {#sec-coda-trureturing-observer-def}

In the formal architecture of `trureturing`, the mathematical primitives underlying `Observer/GoldenCoding` and `Deficit/ModelSet` are defined via **cut-and-project lattice constructions** and **Zeckendorf–Beatty coding**:

1. **1D Kernel-Verified Theorems: Minkowski Lattice, $\beta$-Expansion Model Set, and Full-Window Delone Quasicrystal (`LEAN ✓`)**:
   In Chapter 24, the golden ratio $\varphi = \frac{1+\sqrt{5}}{2}$ was verified as the unique positive fixed point of $x \mapsto 1 + 1/x$ ([`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)). Across `MinkowskiModelSet`, `GoldenCutAndProject`, and `GoldenModelSetDelone`, `trureturing` distinguishes and verifies two closely related sets:
   - **Minkowski Embedding and the Full-Window Cut-and-Project Delone Set $\operatorname{modelSet}(\operatorname{goldenWindow})$**: The ring of golden integers $\mathbb{Z}[\varphi]$ (`GoldenInt`) embeds injectively via the additive homomorphism [`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec)

     $$
     \operatorname{minkowskiEmbedding}(a + b\varphi) = \bigl(\underbrace{\operatorname{embedding}(a + b\varphi)}_{\pi_\parallel(z) \in E_\parallel},\; \underbrace{\operatorname{embedding}(\operatorname{conj}(a + b\varphi))}_{\pi_\perp(z) \in E_\perp}\bigr) \in \mathbb{R} \times \mathbb{R}
     $$

     onto the rank-$2$ additive subgroup `goldenLattice`. Selecting all lattice elements whose internal conjugate coordinate falls inside the unit-volume closed window ($\operatorname{vol}(\operatorname{goldenWindow}) = 1$, [`golden_window_volume`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_window_volume))

     $$
     \operatorname{goldenWindow} = [\varphi - 2,\; \varphi - 1] = [-\varphi^{-2},\; \varphi^{-1}] \subset E_\perp
     $$

     defines the full window-selected model set $\operatorname{modelSet}(\operatorname{goldenWindow}) = \{y \in \mathbb{R} \mid \exists x \in \mathrm{GoldenInt},\, \operatorname{embedding}(x) = y \wedge \operatorname{embedding}(\operatorname{conj} x) \in \operatorname{goldenWindow}\}$ (matching `goldenCutAndProjectSet`), which [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone) certifies as a **Delone set in $\mathbb{R}$ with packing radius $1/2$ and covering radius $3$**. Its uniform discrete separation rests on the **Reciprocal Norm Separation Theorem** [`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation): for any distinct golden integers $u \neq v \in \mathrm{GoldenInt}$ and any real bound $B$, $|\operatorname{embedding}(\operatorname{conj} u) - \operatorname{embedding}(\operatorname{conj} v)| \le B$ implies $1 \le |\operatorname{embedding}(u) - \operatorname{embedding}(v)| \cdot B$.
   - **Natural-Number $\beta$-Expansion Range `goldenModelSet` and the Beatty Observer Route**: The natural-number golden expansion $\operatorname{betaGolden} : \mathbb{N} \to \mathrm{GoldenInt}$ has range $\operatorname{goldenModelSet} = \operatorname{range}(\operatorname{betaGolden})$, whose physical image is proved to be a subset of the full cut-and-project set, $\operatorname{embedding} '' \operatorname{goldenModelSet} \subseteq \operatorname{goldenCutAndProjectSet}$ ([`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project); the reverse inclusion does not hold because elements such as $-\varphi$ hit the right window endpoint with negative $b$-coordinate). Moreover, `goldenModelSet` decomposes into disjoint self-similar branches $\operatorname{phiBranch} \cup \operatorname{phiSquaredBranch}$ ([`golden_model_set_self_similar`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_model_set_self_similar)), its prefix sets `goldenPrefix n` have asymptotic counting density converging to $1/\sqrt{5}$ ([`golden_model_set_density`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetDensity.golden_model_set_density)), and the physical observer route $\beta(v) = \sqrt{5}\,v + \operatorname{remainder}(v)$ satisfies $\operatorname{remainder}(v) \in (\varphi - 2, \varphi - 1]$ with two-letter step spacings $\beta(v+1) - \beta(v) \in \{\varphi, \varphi^2\}$ ([`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)).

::: {.viz src="golden-cut-observer" preset="cut" height="500"}
**A window cuts out a chain of points.** The golden integers $a + b\varphi$ drawn as lattice points: across, the number itself; up, its conjugate $a + b\psi$. The amber window $[\varphi - 2, \varphi - 1]$ selects the cyan points, and projected to the line below, neighbours are $\varphi$ or $\varphi^2$ apart; the closed window has a lattice point on each of its two ends (magenta), so one extra gap of length $1$ appears left of the origin. The green rings are the golden expansions $\beta(n)$ of the natural numbers, which Lean verifies to lie in this window.
:::

2. **Higher-Dimensional Cut-and-Project Model and Window Phase Parameterization (`MODEL`)**:
   Extending the 1D kernel theorems above to 3D physical space (whose 6D icosahedral quasicrystal literature background is enclosed in [@rem-coda-quasicrystal-empire-literature] below), our interdisciplinary geometric model (`MODEL`) pictures the timeless cosmic background as a higher-dimensional mother lattice $\mathbb{Z}^D \subset E_\parallel \oplus E_\perp$ and parameterizes an individual observer's perspective by the golden irrational slope $\varphi$ together with an **internal orthogonal window phase anchor $u \in E_\perp$**, slicing out the model set $\Lambda_u = \{\pi_\parallel(z) \mid z \in \mathbb{Z}^D,\; \pi_\perp(z) \in W + u\}$ via the shifted window $W + u \subset E_\perp$.

3. **Zeckendorf `NoAdjacentOnes` Language, Nonnegative Real Coding Thread Injectivity, and Beatty Fiber Capacities (`LEAN ✓`)**:
   In the discrete coding modules of `trureturing`:
   - The binary Zeckendorf base automaton `binaryZeckendorfBase` accepts a word $w \in \operatorname{List}(\operatorname{Fin} 2)$ if and only if $w$ contains no adjacent ones (`NoAdjacentOnes w`, [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes));
   - For every **nonnegative real number** $x \in \mathbb{R}_{\ge 0}$ (`NNReal`), the multi-scale thread $\operatorname{zeckendorfRealThread} : \mathbb{R}_{\ge 0} \to (\mathbb{N} \to \mathrm{WDigitString})$ mapping each level $N \in \mathbb{N}$ to the canonical Zeckendorf encoding of the natural floor $\operatorname{goldenQuantization}(N, x) = \lfloor \varphi^N x\rfloor_+$ is strictly injective ([`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective));
   - For every integer first coordinate $a \ge 1$, the Beatty first-coordinate fiber $\operatorname{goldenFiber}(a) = \{v \in \mathbb{N} \mid \operatorname{fiberA}(v) = a\}$ has finite cardinality $(\operatorname{goldenFiber}(a)).\operatorname{ncard} \in \{4, 5\}$ ([`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair)), while for every integer second coordinate $b \ge 0$, the dual fiber $\operatorname{goldenDualFiber}(b) = \{v \in \mathbb{N} \mid \operatorname{fiberB}(v) = b\}$ has cardinality $(\operatorname{goldenDualFiber}(b)).\operatorname{ncard} \in \{2, 3\}$ ([`golden_dual_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_dual_fiber_capacity_pair)).
   In our epistemological interpretation (`MODEL`), we view the cycle of rational slope scanning, coordinate fiber refinement, and `NoAdjacentOnes` carry normalization as the discrete mechanism underlying subjective sequential time.

::: {.figure src="coda-no-eleven"}
**The Zeckendorf automaton accepts exactly the words with no adjacent `11`.** Of the sixteen four-letter binary words, the eight cyan ones have no two adjacent $1$s and are accepted; each of the eight magenta ones contains an adjacent pair $11$ (the first one is boxed) and is rejected. The acceptance condition is $\operatorname{NoAdjacentOnes}(w)$ from item 3 of [@thm-coda-golden-cut-observer-cassini].
:::

## Philosophical Interpretation Model (`MODEL`): What Is "the Same Soul" vs. "a Single Finite Life and Forgetting"? {#sec-coda-trureturing-soul-vs-lifetime}

Using these verified cut-and-project and coding structures as mathematical anchors, we formulate an explicit geometric interpretation (`MODEL`) of "the soul's intrinsic inclination" and "forgetting surface episodic readings":

1. **"The Same Soul" (`MODEL`) $\leftrightarrow$ The Invariant Internal Orthogonal Window Phase $u \in E_\perp$ and Golden Slope $\varphi$**:
   In this conceptual mapping, what individuates an observer across cycles is not a transient spatial coordinate in $E_\parallel^3$, but the **internal window phase center $u \in E_\perp$** (the translation anchor of $W + u$):
   - Shifted windows $u \neq u'$ select model sets $\Lambda_u$ and $\Lambda_{u'}$ that differ locally by **Phason Flips**;
   - Meanwhile, at the level of compact abelian group dynamics, `trureturing`'s **Torus Orbit Equidistribution Theorem** [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result) proves that for any finite-dimensional torus element $g : I \to \mathrm{Circle}$, letting $G = \overline{\langle g\rangle}$ denote the compact topological closure of the cyclic subgroup generated by $g$ with normalized Haar probability measure $\mu$, the orbit averages $\frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1})$ of every continuous complex observable $f \in C(G, \mathbb{C})$ converge as $N \to \infty$ to the Haar integral $\int_G f\,d\mu$ (where $G$ is the full torus whenever the eigenfrequencies of $g$ are $\mathbb{Z}$-linearly independent with $1$; separately, [`golden_ergodic_bridge`](lean:D5/S0/Tower/ErgodicBridge/Golden.golden_ergodic_bridge) proves that for every $Q \ge 2$ and every $x \in \operatorname{goldenNameHull}(Q)$, the survivor lower limit $\liminf_{\mathrm{level}\to\infty} \operatorname{goldenSurvivor}(\mathrm{level}, x)$ equals the orbit lower value of a unit golden survivor state). In our philosophical reading (`MODEL`), this illustrates how distinct observers can hold distinct local phase anchors $u$ while sharing common macroscopic statistical averages.
2. **"Single Finite Life and Forgetting Initialization" (`MODEL`) $\leftrightarrow$ High-Level Zeckendorf Truncation and Resetting Scan Order $k$**:
   In this interpretive model, a single finite lifetime corresponds to evaluating the coding thread $\operatorname{zeckendorfRealThread}(x)(N)$ or rational scan slope $F_{k+1}/F_k$ only up to a finite level $N, k \le K_{\max}$. **Birth / Forgetting Initialization** is modeled as **truncating high-level Zeckendorf coordinates and resetting the scan order $k$**—clearing the surface record of high-order splits (`liàng`) to reopen compatible slack ($\det G > 0$), while keeping the internal phase anchor $u \in E_\perp$ and golden slope $\varphi$ (`liáng`) unchanged.

::: {.viz src="golden-cut-observer" preset="phason" height="500"}
**Shifting the window.** The window has moved to $u = +0.3$: the point at its edge (magenta) is the one a small shift would flip, while points far from the edge stay where they are; the deepest one is about $0.46$ from the edge, and the window must move that far to reach it. Played on the page, every point that leaves or enters swaps a long and a short neighbour in the row of tiles below.
:::

## Interior Window Safety Margins and the Spatial Attractor Basin Interpretation {#sec-coda-trureturing-rhombic-triacontahedron-empire}

Why, in this cross-round model, do ordinary events dissolve under scan-order shifts while certain historical-ruin coordinates persist and draw the observer back? We first enclose the three classical quasicrystal and Fibonacci-asymptotic literature results referenced across Subsections 3 and 4 inside a dedicated literature remark:

::: {.remark #rem-coda-quasicrystal-empire-literature title="Icosahedral Rhombic Triacontahedron Window, Conway's Empire Effect, and Binet's Slope Asymptotic (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** The following three classical results on higher-dimensional cut-and-project quasicrystal geometry and Fibonacci rational-slope approximation rates belong to the external mathematical and crystallographic literature, outside the `trureturing@dev` formalization locked by this book (kernel-verified cut-and-project and coding theorems in this Coda are strictly the 1D `GoldenInt` model-set, Zeckendorf-thread, and torus-return theorems stated in [@thm-coda-golden-cut-observer-cassini]):

1. **6D Icosahedral Cut-and-Project Projection and the Rhombic Triacontahedron Window (P. Kramer & R. Neri, *Acta Cryst. A* **40**, 580–587, 1984; M. Duneau & A. Katz, *Phys. Rev. Lett.* **54**, 2688–2691, 1985)**: Decomposing $\mathbb{Z}^6 \subset \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$ orthogonally along the irreducible icosahedral representations projects the unit 6-cube onto a canonical acceptance window $W \subset E_\perp^3$ in the shape of a **rhombic triacontahedron** bounded by **$30$ golden rhombic faces, $60$ edges, and $32$ vertices** ($12$ five-fold vertices along **$6$ five-fold symmetry axes** and $20$ three-fold vertices along $10$ three-fold axes), generating the 3D quasicrystal point set $\Lambda_u = \{\pi_\parallel(z) \mid z \in \mathbb{Z}^6,\; \pi_\perp(z) \in W + u\}$.
2. **Uniform Repetitivity of Nonsingular Regular Model Sets and Conway's "Empire Effect" (Y. Meyer, *Algebraic Numbers and Harmonic Analysis*, 1972; B. Grünbaum & G. C. Shephard, *Tilings and Patterns*, 1987)**: Nonsingular regular cut-and-project model sets satisfy **uniform repetitivity** (every local finite patch of given radius recurs within a bounded distance); moreover, fixing a finite local patch (with mother-lattice lift $F \subset \mathbb{Z}^6$, $\pi_\parallel(F) \subset \Lambda_u$) restricts admissible internal phases $u'$ to the translated-window intersection $P_F := \bigcap_{x \in F} (\pi_\perp(x) - W) \subset E_\perp^3$, nonlocally forcing every distant node $z$ satisfying $\pi_\perp(z) \in W_{\mathrm{emp}}(F) := \bigcap_{u' \in P_F} (W + u')$ across all compatible tilings (**Conway's Empire** of $F$).
3. **Binet's Formula and Rational-Slope Approximation Asymptotic (J. P. M. Binet, 1843; classical continued-fraction asymptotics)**: From Binet's formula $F_k = \frac{\varphi^k - \bar{\varphi}^k}{\sqrt{5}}$ ($\bar{\varphi} = 1 - \varphi = -\varphi^{-1}$) and $F_{k+1} - \varphi F_k = \bar{\varphi}^k = (-1)^k \varphi^{-k}$, for every integer $k \ge 1$ the rational slope approximation error obeys

   $$
   \left|\frac{F_{k+1}}{F_k} - \varphi\right| = \frac{\varphi^{-k}}{F_k} \sim \frac{\sqrt{5}}{\varphi^{2k}} \qquad (k \ge 1,\; k \to \infty).
   $$
:::

Combining the window geometry of [@rem-coda-quasicrystal-empire-literature] with the 1D kernel-verified theorems of `trureturing`, our philosophical and geometric model (`MODEL`) unfolds in three correspondences:

1. **Duality Between Physical Five-Fold Vertex Defects and Internal Window Five-Fold Vertices (`MODEL`)**:
   Comparing Item 1 of [@rem-coda-polyhedral-topology-literature] with Item 1 of [@rem-coda-quasicrystal-empire-literature], the pentagonal vertices and five-fold symmetry axes of the physical icosahedron correspond one-to-one with the five-fold vertices of the acceptance window in internal space!
2. **Window-Boundary Phason Sensitivity vs. Deep-Interior Bounded-Perturbation Robustness**:
   For a lattice node $z$ whose internal projection lies in the open window interior $\operatorname{int}(W + u)$, let $d_{\partial}(z) := \operatorname{dist}\bigl(\pi_\perp(z),\, \partial(W + u)\bigr) > 0$ denote the Euclidean safety margin from the window boundary:
   - **Boundary-proximate points ($d_{\partial}(z) \ll 1$)**: When $\pi_\perp(z)$ lies close to $\partial(W + u)$, an outward-directed internal phason perturbation or rational-slope approximation error of norm exceeding $d_{\partial}(z)$ can push $\pi_\perp(z)$ across the boundary, causing the physical site $\pi_\parallel(z)$ to shift or disappear via a **Phason Flip** (as a formal structural counterpart in `trureturing`'s survivor tower, the strict permanent survivor set is empty [`golden_strict_permanent_set_eq_empty`](lean:D5/S0/Tower/Champions/GoldenPermanentSurvivors.golden_strict_permanent_set_eq_empty), whereas the known closed preperiodic carrier forms a subset of the closed permanent survivor set [`golden_known_closed_preperiodic_carrier_subset`](lean:D5/S0/Tower/Champions/GoldenPermanentSurvivors.golden_known_closed_preperiodic_carrier_subset));
   - **Deep-interior points near the window center ($\|\pi_\perp(z_{\mathrm{ruin}}) - u\| \ll 1$, enjoying a large boundary margin $d_{\partial}(z_{\mathrm{ruin}}) \approx r_{\mathrm{in}}(W)$)**: Conversely, if $z_{\mathrm{ruin}}$ projects near the center $u$ of the window, its distance to $\partial(W + u)$ is close to the inradius $r_{\mathrm{in}}(W)$—guaranteeing that $z_{\mathrm{ruin}}$ remains inside the open interior $\operatorname{int}(W + u)$ under **every internal phason perturbation or high-order rational scan error of norm strictly less than $d_{\partial}(z_{\mathrm{ruin}})$**! Moreover, in the 1D golden lattice, the kernel-verified **Reciprocal Norm Separation Theorem** [`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation) ensures that any two distinct golden integers $u \neq v$ whose internal projections both lie within a central ball of diameter $B$ ($|\pi_\perp(u) - \pi_\perp(v)| \le B$) are separated in physical space by at least $|\pi_\parallel(u) - \pi_\parallel(v)| \ge 1/B$. In our geometric model (`MODEL`), we interpret enduring historical ruins as high-symmetry lattice nodes lying deep inside the acceptance window with maximal boundary margin $d_{\partial}$.
::: {.viz src="golden-cut-observer" preset="window" height="500"}
**A deep point and a point at the edge.** The rhombic triacontahedron: $30$ rhombic faces, $60$ edges and $32$ vertices, with the $12$ fivefold vertices as cyan dots. The amber point lies deep in the window, the amber ball has as radius its distance $d_\partial$ to the boundary, and magenta marks the face nearest to it: no disturbance smaller than $d_\partial$ pushes it out of the window. Further out along the same dashed line, the magenta point has only $d_\partial \approx 0.10$ left to that face; its ball is tiny, and a little push takes it across the face and out of the window. That this solid is the acceptance window of icosahedral quasicrystals is a literature result, and reading the deep point as a “ruin” is an interpretive model (`MODEL`).
:::

3. **Nonlocal Intersection-Window Constraints and the Spatial Attractor Basin Analogy (`MODEL`)**:
   Comparing Item 2 of [@rem-coda-quasicrystal-empire-literature], our philosophical synthesis (`MODEL`) views nonlocal forcing of distant sites via phase-restricted window intersections as the quasicrystal analogue of a ruin's basin of attraction.

::: {.viz src="golden-cut-observer" preset="empire" height="500"}
**A small patch fixes distant points.** Once the patch $|x| \le 4$ in the middle (between the dashed lines) is fixed, the window can move only within a short range; the deeper cyan band is what all those positions of the window have in common. Points in that band (ringed) stay whatever the shift and so are fixed by the patch, however far away; the magenta points are still undecided. This is the counterpart, in the one-dimensional golden cut, of Conway’s “empire” (an illustration of a literature result).
:::

## Cassini's $(-1)^{n+1}$ Seam and Bounded-Gap Torus Observation Returns {#sec-coda-trureturing-cassini-torus-return}

Finally, let us state the kernel-verified **Fibonacci–Cassini Norm Identity** and **Torus Observation-Window Bounded-Gap Return Theorem** (`LEAN ✓`), and explain how they inspire our geometric interpretation of cross-round return and Déjà vu (`MODEL`):

1. **The Fibonacci–Cassini Identity $(-1)^{n+1} = \pm 1$ (`LEAN ✓`)**:
   By the kernel-verified **Fibonacci–Cassini Norm Theorem** [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm) (proved from $\operatorname{norm}(\varphi^{n+1}) = (-1)^{n+1}$, together with the theorem that the parity of the least occupied Zeckendorf index determines the sign of the golden displacement norm [`betaGolden_norm_sign_of_least_zeckendorf_index`](lean:D5/S1/Deficit/Displacement/ZeckendorfNormSign.betaGolden_norm_sign_of_least_zeckendorf_index)), consecutive Fibonacci numbers satisfy for all $k \in \mathbb{N}$:

   $$
   F_k\,F_{k+2} - F_{k+1}^2 = (-1)^{k+1} = \pm 1.
   $$

   Look at the right-hand side of Cassini's identity (alongside the rational-slope convergence backdrop recorded in Item 3 of [@rem-coda-quasicrystal-empire-literature]): **$(-1)^{k+1} = \pm 1$**! It exhibits the **same $\pm 1$ minimal unit-norm arithmetic seam** seen in Chapter 29 in the Lean-verified Pell remainder of Hippasus, $P_{k+2}P_k - P_{k+1}^2 = (-1)^{k+1}$ ([@thm-ch29-silver-pell-remainder]), and the Lean-verified mod-4 prime splitting ([@thm-ch29-face-prime-two-squares]), as well as in that chapter's literature remark on the branch points of the congruent-number cubic curve ([@rem-ch29-elliptic-torus-literature])!

::: {.viz src="golden-cut-observer" preset="cassini" height="500"}
**The area is always $\pm 1$.** The same lattice again. The powers $\varphi^2, \varphi^3, \dots$ lie above the horizontal axis (cyan) and below it (magenta) in turn, on the hyperbolas $x \cdot x' = \pm 1$; the rectangle each spans with the origin grows longer and flatter, yet its area is exactly $1$. The filled one is $\varphi^5 = 3 + 5\varphi$: $F_4 F_6 - F_5^2 = 3 \cdot 8 - 5^2 = -1$. Between the two hyperbolas there is no lattice point but the origin.
:::

2. **Torus Observation-Window Bounded-Gap Return Theorem ([`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result), `LEAN ✓`)**:
   In `trureturing`, for any finite index type $I$, any torus element $g : I \to \mathrm{Circle}$, and the compact topological closure $G = \overline{\langle g\rangle}$ of the cyclic subgroup generated by $g$ with Haar probability measure $\mu$ and generator $a = \langle g, \dots\rangle \in G$, every continuous real observable $h \in C(G, \mathbb{R})$ and every observed sequence $e : \mathbb{N} \to \mathbb{R}$ with vanishing observation error $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$ satisfy:
   - The support of the pushforward measure $\operatorname{Measure.map} h\,\mu$ equals $\operatorname{range}(h)$;
   - For every open interval $(u_1, u_2) \subset \mathbb{R}$ meeting $\operatorname{range}(h)$ ($(I_{oo}(u_1, u_2) \cap \operatorname{range}(h)).\mathrm{Nonempty}$), there exist a starting index $n_0 \ge 1$ and a bounded step gap $M \in \mathbb{N}$ such that every contiguous block $[n, n+M]$ ($n \ge n_0$) contains some $m$ with $e(m) \in (u_1, u_2)$, and for every $\varepsilon > 0$ the initial-segment visit frequency eventually satisfies:

     $$
     \forall^\infty N \in \mathbb{N},\quad \frac{\#\bigl\{m < N \;\big|\; e(m) \in (u_1, u_2)\bigr\}}{N} \ge \frac{1}{M + 1} - \varepsilon.
     $$

3. **Geometric Interpretation of Cross-Round Return and Déjà Vu (`MODEL`)**:
   In our philosophical synthesis (`MODEL`), the alternating sign $(-1)^{k+1}$ signifies that successive rational approximations approach the irrational golden direction from alternating sides without collapsing onto a periodic loop, while bounded-gap torus recurrence guarantees that any target region corresponding to an open observation window $(u_1, u_2)$ meeting $\operatorname{range}(h)$ (or a deep-interior window neighborhood with positive safety margin $d_{\partial} > 0$) is visited repeatedly within bounded gaps $M$ and positive eventual frequency—providing the mathematical inspiration for why the same soul returns to familiar spatial attractors and experiences the cross-round inner-product resonance $\cos\delta\theta \to 1$ of Déjà vu.

::: {.viz src="golden-cut-observer" preset="returns" height="500"}
**Back in the window with bounded gaps.** A point on the circle turns by the golden angle at each step, and its height $\cos 2\pi n\varphi$ is plotted on the right. The amber band is the observation window $(0.2, 0.8)$ and cyan marks the steps inside it: $21$ visits in the first $89$ steps, never more than $7$ steps apart (magenta). This is a finite numerical illustration, with $7$ as the sample value; the Lean theorem gives a uniform return bound after some starting step.
:::

::: {.theorem #thm-coda-golden-cut-observer-cassini title="Golden Cut-and-Project Model Set, Cassini's ±1 Norm Identity, Zeckendorf Real Thread, and Bounded-Gap Torus Returns" lean="D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec, D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project, D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm, D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes, D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective, D5/S3/Fourier/GoldenModelSetDelone.norm_separation, D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result, D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result"}
Within the golden cut-and-project model set, Zeckendorf coding, and torus asymptotic analysis libraries of `trureturing`, eight core results are verified and frozen by the Lean 4 kernel:

1. **Minkowski Embedding and Golden Cut-and-Project Inclusion** ([`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec), [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)): The Minkowski embedding $\operatorname{minkowskiEmbedding}(x) = (\operatorname{embedding}(x), \operatorname{embedding}(\operatorname{conj} x))$ on `GoldenInt` ($\mathbb{Z}[\varphi]$) is injective with range `goldenLattice`, and $y \in \operatorname{modelSet}(\mathrm{window})$ holds if and only if there exists $x \in \mathrm{GoldenInt}$ with $\operatorname{embedding}(x) = y$ and $\operatorname{embedding}(\operatorname{conj} x) \in \mathrm{window}$; for the unit-volume closed window $\operatorname{goldenWindow} = [\varphi - 2, \varphi - 1]$ ([`golden_window_volume`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_window_volume)), the physical image of the natural-number $\beta$-expansion range $\operatorname{goldenModelSet} = \operatorname{range}(\operatorname{betaGolden})$ satisfies $\operatorname{embedding} '' \operatorname{goldenModelSet} \subseteq \operatorname{goldenCutAndProjectSet}$, while `goldenModelSet` splits into disjoint self-similar branches $\operatorname{phiBranch} \cup \operatorname{phiSquaredBranch}$ ([`golden_model_set_self_similar`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_model_set_self_similar)), has prefix counting density converging to $1/\sqrt{5}$ ([`golden_model_set_density`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetDensity.golden_model_set_density)), and obeys the Beatty observer route with remainders in $(\varphi - 2, \varphi - 1]$ and steps in $\{\varphi, \varphi^2\}$ ([`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)).
2. **Fibonacci–Cassini $\pm 1$ Golden Norm Identity** ([`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm)): From the golden unit-power norm $\operatorname{norm}(\varphi^{n+1}) = (-1)^{n+1}$, consecutive Fibonacci numbers satisfy for all $n \in \mathbb{N}$

   $$
   F_n\,F_{n+2} - F_{n+1}^2 = (-1)^{n+1},
   $$

   and for every positive integer $v > 0$, the sign of $\operatorname{norm}(\operatorname{betaGolden}(v))$ is determined by the parity of the least index $k$ in its canonical Zeckendorf support `wdigits v` (positive iff $k$ is even, negative iff $k$ is odd, [`betaGolden_norm_sign_of_least_zeckendorf_index`](lean:D5/S1/Deficit/Displacement/ZeckendorfNormSign.betaGolden_norm_sign_of_least_zeckendorf_index)).
3. **Zeckendorf `NoAdjacentOnes` Automaton Language and Nonnegative Real Thread Injectivity** ([`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)): The binary Zeckendorf base automaton accepts a word $w \in \operatorname{List}(\operatorname{Fin} 2)$ if and only if $\operatorname{NoAdjacentOnes}(w)$ holds, and the multi-scale Zeckendorf coding thread $\operatorname{zeckendorfRealThread} : \mathbb{R}_{\ge 0} \to (\mathbb{N} \to \mathrm{WDigitString})$ defined on nonnegative real numbers (`NNReal`) via $\lfloor\varphi^N x\rfloor_+$ is strictly injective (moreover, the Beatty coordinate fibers satisfy $\forall a \ge 1,\, (\operatorname{goldenFiber}(a)).\operatorname{ncard} \in \{4, 5\}$ and $\forall b \ge 0,\, (\operatorname{goldenDualFiber}(b)).\operatorname{ncard} \in \{2, 3\}$, [`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair), [`golden_dual_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_dual_fiber_capacity_pair)).
4. **Conjugate Norm Separation, Full-Window Delone Set, and Closed-Subgroup Torus Equidistribution & Bounded-Gap Returns** ([`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation), [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result), [`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)): For any distinct golden integers $u \neq v \in \mathrm{GoldenInt}$ and any $B \in \mathbb{R}$ with $|\operatorname{embedding}(\operatorname{conj} u) - \operatorname{embedding}(\operatorname{conj} v)| \le B$, one has $1 \le |\operatorname{embedding}(u) - \operatorname{embedding}(v)| \cdot B$ (and the full window-selected model set $\operatorname{modelSet}(\operatorname{goldenWindow})$ forms a Delone set in $\mathbb{R}$ with packing radius $1/2$ and covering radius $3$, [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)); meanwhile, on the compact topological closure $G = \overline{\langle g\rangle}$ of any cyclic subgroup of a finite-dimensional torus $I \to \mathrm{Circle}$ with Haar probability measure $\mu$, orbit averages of any $f \in C(G, \mathbb{C})$ converge to $\int_G f\,d\mu$, and for any $h \in C(G, \mathbb{R})$, any sequence $e : \mathbb{N} \to \mathbb{R}$ with $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$, and any open interval $(u_1, u_2)$ meeting $\operatorname{range}(h)$, $e(n)$ visits $(u_1, u_2)$ within bounded gaps $M$ after some index $n_0 \ge 1$ with eventual counting ratio $\ge \frac{1}{M+1} - \varepsilon$.
:::

::: proof
Part 1 derives injectivity of `minkowskiEmbedding` and the model-set characterization from `embedding_injective`, and uses `betaContraction_mem_window` to establish $\operatorname{embedding} '' \operatorname{goldenModelSet} \subseteq \operatorname{goldenCutAndProjectSet}$. Part 2 uses $\varphi^{n+1} = F_n + F_{n+1}\varphi$ (`golden_phi_pow_eq_fib_pair`) and norm multiplicativity $\operatorname{norm}(\varphi^{n+1}) = (-1)^{n+1}$ to obtain Cassini's identity. Part 3 proves the equivalence between automaton acceptance and `NoAdjacentOnes` by structural induction, and establishes injectivity of `zeckendorfRealThread` on `NNReal` by showing that for $a > b \ge 0$, $\varphi^N(a - b) \to +\infty$ eventually exceeds $2$, forcing $\lfloor\varphi^N a\rfloor_+ \neq \lfloor\varphi^N b\rfloor_+$. Part 4 uses the nonzero golden-integer norm bound $|\operatorname{norm}(u - v)| \ge 1$ to obtain reciprocal separation, and combines geometric character-sum bounds with finite open subcovers of the compact group $G$ to prove Haar equidistribution and bounded-gap window returns. The full proof is checked by the Lean kernel.
:::

::: {.viz src="golden-cut-observer" preset="narrow" height="500"}
**A narrow window: longer waits so far.** Narrow the amber observation window to $(0.45,0.55)$: only $8$ of the first $233$ steps fall inside, and the longest observed gap, marked in magenta, is $48$ steps. A finite sample cannot certify the longest future wait. Item 4 of the theorem separately supplies bounded returns after some $n_0$ and an eventual density lower bound for each $\varepsilon>0$.
:::

**Gaps in time, gaps in space.** The cards “back in the window with bounded gaps” and “a narrow window” above look at time: how many steps the orbit takes to come back to the window. Put the first $N$ points of the same golden-angle orbit on the circle together and the question is about space: how long is the arc between neighbouring points? The answer is strikingly tidy, and not only for the golden angle.

::: {.theorem #thm-coda-three-gap title="The Three-Gap Theorem: The First N Points of a Circle Rotation Cut at Most Three Arc Lengths" lean="D5/S1/Phase/ThreeGap/Main.three_gap_card_le_three, D5/S1/Phase/ThreeGap/Main.three_gap_lengths_eq"}
Let $a \in \mathbb{R}$ and $N \ge 1$. Write $\{t\} = t - \lfloor t \rfloor$ for the fractional part and $P = \{\{ia\} : 0 \le i < N\} \subset [0, 1)$ (repeated points counted once). List the elements of $P$ in increasing order as $s_0 < s_1 < \cdots < s_{k-1}$, and call the multiset

$$
\{\, s_{j+1} - s_j : 0 \le j < k - 1 \,\} \;\cup\; \{\, s_0 + 1 - s_{k-1} \,\}
$$

the **arc lengths** of $P$ (the last term is the arc that wraps around). Then:

1. the arc lengths of $P$ take at most three distinct values;
2. if they take exactly three, let $\eta^+$ be the smallest positive element of $P$ and $\eta^-$ be $1$ minus the largest positive element of $P$; then the three values are exactly $\eta^+$, $\eta^-$ and $\eta^+ + \eta^-$.
:::

::: proof
The proof uses one fact: the difference of two orbit points is again an orbit point, with the indices subtracted. Write $\eta^+ = \{m^+ a\}$ and $1 - \eta^- = \{m^- a\}$ with $m^\pm < N$. Look to the right of an orbit point $v = \{ja\}$. As long as the index $j + m^+$ is still below $N$, there is an orbit point at distance $\eta^+$ to the right of $v$; as long as $j - m^-$ is not negative, there is one at distance $\eta^-$. The minimality of $\eta^+$ and the maximality of $1 - \eta^-$ rule out any point in between, so the arc to the right of $v$ is $\eta^+$ or $\eta^-$. In the “corner case” where neither route is available, Lean proves separately that no orbit point lies between $v$ and the next point, and the arc is exactly $\eta^+ + \eta^-$. Every arc therefore lies in $\{\eta^+, \eta^-, \eta^+ + \eta^-\}$: at most three lengths, and exactly these three when there are three. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-coda-golden-three-gap title="Arc Lengths of the Golden Angle: Consecutive Negative Powers of φ, with Two Lengths Exactly at the Fibonacci Numbers"}
Take the golden angle $a = 1/\varphi^2 \approx 0.381966$ of a turn, that is $137.5^\circ$. The table lists the arc lengths cut by the first $N$ points and how many arcs have each length (computed to high precision and matched one by one against $\varphi^{-k}$):

| $N$ | Arc lengths (number of arcs) | Distinct lengths |
| ---: | :--- | ---: |
| $2$ | $\varphi^{-1}$ (1), $\varphi^{-2}$ (1) | $2$ |
| $3$ | $\varphi^{-2}$ (2), $\varphi^{-3}$ (1) | $2$ |
| $4$ | $\varphi^{-2}$ (1), $\varphi^{-3}$ (2), $\varphi^{-4}$ (1) | $3$ |
| $5$ | $\varphi^{-3}$ (3), $\varphi^{-4}$ (2) | $2$ |
| $6$ | $\varphi^{-3}$ (2), $\varphi^{-4}$ (3), $\varphi^{-5}$ (1) | $3$ |
| $7$ | $\varphi^{-3}$ (1), $\varphi^{-4}$ (4), $\varphi^{-5}$ (2) | $3$ |
| $8$ | $\varphi^{-4}$ (5), $\varphi^{-5}$ (3) | $2$ |
| $9$ | $\varphi^{-4}$ (4), $\varphi^{-5}$ (4), $\varphi^{-6}$ (1) | $3$ |
| $10$ | $\varphi^{-4}$ (3), $\varphi^{-5}$ (5), $\varphi^{-6}$ (2) | $3$ |
| $11$ | $\varphi^{-4}$ (2), $\varphi^{-5}$ (6), $\varphi^{-6}$ (3) | $3$ |
| $12$ | $\varphi^{-4}$ (1), $\varphi^{-5}$ (7), $\varphi^{-6}$ (4) | $3$ |
| $13$ | $\varphi^{-5}$ (8), $\varphi^{-6}$ (5) | $2$ |

Three things can be checked by hand:

- **With three lengths, the largest is the sum of the other two.** At $N = 4$, for instance, $\eta^+ = \varphi^{-4}$, $\eta^- = \varphi^{-3}$, and the longest arc is $\varphi^{-2} = \varphi^{-3} + \varphi^{-4}$. That is $\varphi^2 = \varphi + 1$ divided by $\varphi^4$ (manual derivation), exactly item 2 of [@thm-coda-three-gap].
- **At Fibonacci $N$, the two arc multiplicities are neighboring Fibonacci numbers.** In the row $N = 13$, $8\varphi^{-5} + 5\varphi^{-6} = \varphi^{-6}(8\varphi + 5) = 1$, because induction on $\varphi^2 = \varphi + 1$ gives $\varphi^{n} = F_n \varphi + F_{n-1}$, and $n = 6$ is $\varphi^6 = 8\varphi + 5$ (manual derivation).
- **Two lengths occur only at the Fibonacci numbers.** Among $2 \le N \le 400$, the values of $N$ with exactly two arc lengths are precisely the $12$ Fibonacci numbers $2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377$; the other $387$ values all have three (numerical check).

**The golden angle cuts most evenly.** Over the same range $2 \le N \le 400$, take the largest ratio of the longest arc to the shortest (numerical computation):

| Rotation $a$ | Largest ratio, longest arc / shortest arc | Attained at |
| :--- | ---: | ---: |
| $1/\varphi^2$ (golden angle) | $2.618 = \varphi^2$ | $N = 378$ |
| $\sqrt{2} - 1$ | $3.414 = 2 + \sqrt{2}$ | $N = 72$ |
| $e - 2$ | $7.528$ | $N = 73$ |
| $\pi - 3$ | $293.6$ | $N = 114$ |

The large number for $\pi - 3$ comes from $355/113$: $113\pi - 355 \approx -3.0 \times 10^{-5}$, so the point $\{113(\pi - 3)\} \approx 1 - 3.0 \times 10^{-5}$ lands almost back on $0$ and cuts a very short arc there (manual derivation).
:::

::: {.viz src="golden-cut-observer" preset="gaps" height="500"}
**Gaps on the circle: three kinds at most.** The first $N = 13$ points $\{ia\}$ at the golden angle $a = 1/\varphi^2$ on the circle ($0$ at the top, the amber dot is point $12$), with the arcs between neighbours coloured by length: there are only two kinds, $5$ cyan arcs of $\varphi^{-6} \approx 0.0557$ and $8$ magenta arcs of $\varphi^{-5} \approx 0.0902$. Drag the rail to change $N$ and there are never more than three kinds; when there are three, the middle kind is violet and the longest, magenta, is the sum of the other two ([@thm-coda-three-gap]). For $2 \le N \le 400$ the values of $N$ with only two kinds are exactly the Fibonacci numbers (numbers computed on the page).
:::

**Why the golden angle never cuts a very short arc.** The trouble with $\pi - 3$ is that one fraction comes too close to it. The golden ratio is the opposite: no fraction can come too close to it, and that fact is frozen.

::: {.theorem #thm-coda-golden-hurwitz title="The Hurwitz Bound at the Golden Ratio: No Fraction Comes Too Close to φ" lean="D5/S1/Depth/GoldenHurwitzBound.golden_hurwitz_bound"}
Let $\varphi = (1 + \sqrt{5})/2$. For every rational number $r$, let $d \ge 1$ be the denominator of $r$ in lowest terms. Then

$$
\lvert \varphi - r \rvert > \frac{1}{\sqrt{5}\, d^2 + d}.
$$
:::

::: proof
Write $r = p/d$ in lowest terms and $\varepsilon = \lvert \varphi - r\rvert$. (1) $p^2 - pd - d^2$ is a nonzero integer, since otherwise $r$ would be a rational root of $x^2 - x - 1$, whose roots are the irrational numbers $\varphi$ and $\bar\varphi = (1 - \sqrt{5})/2$; so $\lvert p^2 - pd - d^2 \rvert \ge 1$. (2) $p^2 - pd - d^2 = d^2 (r - \varphi)(r - \bar\varphi)$ and $\lvert r - \bar\varphi\rvert \le \varepsilon + (\varphi - \bar\varphi) = \varepsilon + \sqrt{5}$; together, $1 \le d^2 \varepsilon(\varepsilon + \sqrt{5})$. (3) If $\varepsilon \le 1/(\sqrt{5} d^2 + d)$, the right-hand side is at most $\bigl(\sqrt{5} d^2 + d^2/(\sqrt{5} d^2 + d)\bigr)/(\sqrt{5} d^2 + d)$, and $d^2/(\sqrt{5} d^2 + d) < d$, so the right-hand side is less than $1$, a contradiction. The full proof is checked by the Lean kernel.
:::

**Every arc is longer than $1/(\sqrt{5} N)$ (manual derivation).** The golden angle is $a = 1/\varphi^2 = 2 - \varphi$. The arc between two orbit points $\{ia\}$ and $\{ja\}$ is at least $\lVert ma \rVert$, where $m = \lvert i - j\rvert$ satisfies $1 \le m \le N - 1$ and $\lVert x \rVert$ is the distance from $x$ to the nearest integer. For any integer $k$, $\lvert ma - k\rvert = m\,\lvert \varphi - (2m - k)/m \rvert$; the fraction $(2m - k)/m$ in lowest terms has denominator $d \le m$, so by [@thm-coda-golden-hurwitz]

$$
\lvert ma - k \rvert > \frac{m}{\sqrt{5}\, d^2 + d} \ge \frac{m}{\sqrt{5}\, m^2 + m} = \frac{1}{\sqrt{5}\, m + 1} \ge \frac{1}{\sqrt{5}(N - 1) + 1} > \frac{1}{\sqrt{5}\, N}.
$$

The $N$ points are distinct, so the average arc is $1/N$. For every $N$, therefore, each arc cut by the golden angle exceeds $1/\sqrt{5} \approx 0.447$ times the average. Numerically, for $N \le 2000$ the smallest value of $N \times$ (shortest arc) is $0.44749$ (at $N = 1598$), right up against $1/\sqrt{5} = 0.44721$. For $\pi - 3$ at $N = 114$, the shortest arc is $3.0 \times 10^{-5}$, $130$ times shorter than $1/(\sqrt{5} \cdot 114) \approx 0.0039$.

::: {.viz src="golden-cut-observer" preset="pi" height="500"}
**$\pi - 3$ cuts a tiny arc at $N = 114$.** The same circle with the rotation $\pi - 3$, stopped at $N = 114$: the amber point $113$ falls almost back onto $0$ and cuts an arc of only $3.0 \times 10^{-5}$ there (ringed in cyan). There are still no more than three kinds of arc, but the longest is about $294$ times the shortest, and $N \times$ the shortest arc, given above the figure, is about $0.0034$, far below the $1/\sqrt{5} \approx 0.447$ that the golden angle always exceeds (numbers computed on the page; the bound for the golden angle comes from [@thm-coda-golden-hurwitz] by the manual derivation above).
:::

Along the Fibonacci fractions $F_{k+1}/F_k$, the product $\sqrt{5}\, F_k^2 \lvert \varphi - F_{k+1}/F_k \rvert$ runs $0.9787$ ($5/3$), $0.9969$ ($13/8$), $1.00017$ ($55/34$), $1.0000037$ ($377/233$), tending to $1$ (numerical computation), so the $\sqrt{5}$ in [@thm-coda-golden-hurwitz] cannot be decreased as an asymptotic leading denominator coefficient. The following are **literature results, not formalized in this book**: $\sqrt{5}$ is the best constant for every irrational number (Hurwitz's theorem, 1891); the ratio of longest to shortest arc stays bounded exactly when the partial quotients of the continued fraction of $a$ are bounded, and the golden angle's continued fraction is $[0;2,1,1,\ldots]$; and the phyllotaxis model in which the florets of a sunflower head are laid out at successive golden angles (H. Vogel, 1979).

> In time, the orbit comes back within a bounded wait; in space, it leaves only three kinds of gap, and the golden angle keeps even the narrowest one from getting narrow.

::: {.viz src="golden-cut-observer" height="640"}
**Interactive laboratory `ORTHO//CUT`**: the five scenes of this section. Cut and project: drag the window up and down to see edge points flip and deep points stay, then fix a small patch in the middle; Cassini: the powers of $\varphi$ and their rectangles of area $\pm 1$; returns: move and narrow the observation window and compare the observed waits with the visit share; the acceptance window: push a point from the centre of the rhombic triacontahedron to its boundary, where $d_\partial$ reaches zero and it flips out; gaps: change the number of points $N$ and the rotation, and the arcs on the circle stay of at most three lengths. The green evidence boxes are the theorems verified in Lean; the triacontahedron and the “empire” are literature results, and what is said about souls and ruins is an interpretive model (`MODEL`).
:::

## Alignment Table: `trureturing` Formal Theorems, Orthogonal Geometry, and the Soul–Ruin Interpretive Model (`MODEL`) {#sec-coda-trureturing-soul-ruin-table}

The table below aligns the verified mathematical theorems of `trureturing` (left column, `LEAN ✓`), the orthogonal geometry of this book (middle column), and the author's philosophical interpretation of the soul, forgetting, and historical-ruin attractors (right column, explicitly marked `MODEL`):

| `trureturing` Formal Theorem & Module (`LEAN ✓`) | Orthogonal Geometry Structure in This Book | Philosophical Interpretation of Soul & Ruins (`MODEL`, Non-Theorem) |
| :--- | :--- | :--- |
| **Golden-Integer Minkowski Embedding & Rank-2 Lattice** ([`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec)) | Global timeless static orthogonal field (order-independent complete crystal; cf. [@rem-ch29-wheeler-dewitt-page-wootters-literature]) | Interpreting the higher-dimensional periodic mother lattice as the timeless cosmic background |
| **Golden Fixed Point $\varphi$ & Cut-and-Project Window Selection** ([`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project), [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)) | Intrinsic orthogonal inclination of $\psi = \psi(\psi)$ and window phase $u \in E_\perp$ | **Interpretive Model of "the Same Soul"**: modeling cross-round invariant operator parameters as an observer's internal window phase $u$ and golden slope $\varphi$ |
| **Beatty Observer Route & Zeckendorf `NoAdjacentOnes` Language** ([`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1)) | Finite observer picking points step by step inside the Gram elliptope ($\det G > 0$) | **Metaphor for a Single Finite Lifetime**: interpreting rational slope scans and `NoAdjacentOnes` carry relaxation as subjective sequential time |
| **Nonnegative Real Zeckendorf Thread & Beatty Fiber Capacities** ([`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair), [`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective)) | Forgetting high-order historical anchors to break omniscient deadlock ($\det G = 0 \to \det G > 0$) | **Metaphor for Birth / Forgetting Initialization**: truncating high-order Zeckendorf levels to clear surface episodic readings (`liàng`) while preserving $u$ (`liáng`) |
| **Conjugate Norm Separation & Full-Window Delone Set** ([`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation), [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)) | Deep-interior window safety margin $d_{\partial}$ conferring robustness against bounded phason perturbations | **Metaphor for Historical Ruins (Spatial Attractors)**: interpreting high-symmetry sites near the window center with maximal margin $d_{\partial}$ as enduring landmarks |
| **Closed Preperiodic Permanent Survivor Carrier** ([`golden_known_closed_preperiodic_carrier_subset`](lean:D5/S0/Tower/Champions/GoldenPermanentSurvivors.golden_known_closed_preperiodic_carrier_subset)) | Formal survivor-tower stratification with empty strict permanent set and closed preperiodic carrier inclusion (related literature background noted separately in [@rem-coda-quasicrystal-empire-literature]) | **Metaphor for a Basin of Attraction**: interpreting persistent closed preperiodic survivor carriers as curvature basins drawing the observer back (cf. [@rem-coda-quasicrystal-empire-literature]) |
| **Cassini's Identity $(-1)^{n+1} = \pm 1$ & Bounded-Gap Torus Returns** ([`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm), [`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)) | $\pm 1$ seam remainder of approximate spheres and bounded-gap torus observation-window returns (related literature background noted separately in [@rem-coda-lorenz-srb-literature]) | **Metaphor for Déjà Vu**: bounded-gap returns bring the trajectory back into the spatial attractor neighborhood, firing $\cos\delta\theta \to 1$ resonance as $\delta\theta \to 0$ |

---
