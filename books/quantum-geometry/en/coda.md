# Coda Outside All Spheres {#coda-outside-all-spheres}

> *"We think we see a point, but it is a line; a line, but a surface; a surface, but a sphere; and when we think we see the sphere, a larger sphere encloses it."*

From the moment the Prelude opened the first door, we have climbed a ladder of ascending geometric dimensions: resolving an isolated **point** into a **line** of pairwise comparison (the inner-product projection $\mathbf{u}\cdot\mathbf{v}$), unfolding a static **line** into an oriented chiral **plane** (the exterior bivector area $\mathbf{u}\wedge\mathbf{v}$), and closing local **planes** into a phase-wrapping **sphere** (the Bloch sphere $S^2$ and the spinor total space $S^3$ of the Hopf fibration). Yet as we look back across the ten-part edifice—after traversing Lorentz lightcones, tensor-network minimum cuts, prime Euler products, quaternion norm locks, and the self-referential cosine fixed point—a deeper geometric truth emerges: **inside any fixed formal system, every "sphere" we think we have completely closed is only a convex polyhedral approximation stitched from finitely many facets; and at every seam and every fixed point, an indestructible remainder points toward the larger sphere that encloses it.**

::: {.figure src="coda-overview"}
**The coda at a glance: the approximate sphere, spatial attractors, and the golden cut.** Panel I: an icosahedron inscribed in the sphere; each of its twelve magenta vertices falls $60^\circ$ short, $12 \times 60^\circ = 720^\circ$ in all (literature result, see [@rem-coda-polyhedral-topology-literature]). Panel II: a cyan and a magenta Lorenz orbit start from two far-apart circles and settle onto the same pair of wings (numerical integration, schematic; reading an orbit as a "round" is the interpretive model). Panel III: the amber window $[\varphi - 2, \varphi - 1]$ picks the cyan points out of the golden lattice, and they drop onto the line below as a row of points ([@thm-coda-golden-cut-observer-cassini]).
:::

---

## 40.1 Polyhedral Approximation and the Inescapable Geometric Remainder {#sec-coda-polyhedral-remainder}

Why can neither human mathematicians nor digital computers ever construct a completely seamless sphere entirely inside a fixed finite axiom system, a finite universal gate set, a finite prime cutoff, or a finite-degree Taylor expansion? Across all ten parts of this book, we have repeatedly encountered the same structural obstruction—**the topological and arithmetic remainder between a faceted polyhedral approximation and smooth spherical curvature**. We begin by enclosing the three classical discrete-geometry and algebraic-topology theorems governing polyhedral angular defect, even-sphere Hairy Ball vortices, and parallelizable spheres inside a literature remark:

::: {.remark #rem-coda-polyhedral-topology-literature title="Descartes's Angular Defect Theorem, the Hairy Ball Theorem, and Adams's Parallelizability Theorem (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** The following three classical theorems on discrete polyhedral curvature and tangent-bundle topology of spheres belong to the external mathematical literature and are outside the `trureturing@dev` formalization locked by this book (complementing Chapter 21's literature remark [@rem-hairy-ball-adams-literature]):

1. **Descartes's Angular Defect Theorem and the $12 \times 60^\circ = 720^\circ = 4\pi$ Discrete Curvature Invariant (R. Descartes; C. F. Gauss; O. Bonnet)**: When approximating the 2-sphere $S^2$ with equilateral triangle facets, the regular icosahedron ($V = 12$ vertices, $E = 30$ edges, $F = 20$ faces) brings $5$ equilateral triangles together at each vertex with interior angle sum $5 \times 60^\circ = 300^\circ < 360^\circ$, leaving an angular defect $\delta_v = 360^\circ - 300^\circ = 60^\circ = \pi/3$; more generally, on every convex polyhedron homeomorphic to $S^2$, the vertex angular defects sum to the topological Euler invariant:

   $$
   \sum_{v} \delta_v = 4\pi = 2\pi\,\chi(S^2) \qquad \bigl(\text{icosahedral case: }\sum_{v=1}^{12} \delta_v = 12 \times 60^\circ = 720^\circ = 4\pi\bigr).
   $$

   No matter how finely the polyhedron is subdivided into a geodesic dome of millions of facets, the total defect $4\pi$ never vanishes, dispersing instead from $12$ sharp vertices into myriad microscopic creases.
2. **Poincaré–Brouwer Hairy Ball Theorem on Even-Dimensional Spheres (H. Poincaré, 1885; L. E. J. Brouwer, 1912)**: Every even-dimensional sphere $S^{2n}$ has Euler characteristic $\chi(S^{2n}) = 2 \neq 0$, so every continuous tangent vector field on $S^{2n}$ vanishes at some point (a topological vortex); equivalently, no continuous self-map of $S^{2n}$ can simultaneously avoid both a fixed point $f(x) = x$ and an antipodal point $f(x) = -x$. By contrast, every odd-dimensional sphere satisfies $\chi(S^{2n-1}) = 0$ and admits the nowhere-vanishing continuous symplectic tangent field $(x_1, x_2, \dots, x_{2n}) \mapsto (-x_2, x_1, \dots, -x_{2n}, x_{2n-1})$.
3. **Adams's Parallelizability Theorem (J. F. Adams, *Ann. of Math.* **72**, 20–104, 1960)**: The only spheres whose tangent bundles are globally parallelizable are

   $$
   S^0,\quad S^1,\quad S^3,\quad S^7,
   $$

   corresponding to the four normed division algebras $\mathbb{R}, \mathbb{C}, \mathbb{H}, \mathbb{O}$. In our geometric model, the uncombable Berry-phase singularity on the 2D Bloch sphere $S^2$ is the base-space shadow cast by the parallelizable 3-sphere $S^3 \cong \mathrm{SU}(2)$ across the Hopf fibration $S^1 \hookrightarrow S^3 \to S^2$.
:::

::: {.figure src="coda-defect-spread"}
**However finely the polyhedron is cut, its angular defects still add up to $720^\circ$.** The rows are the icosahedron ($\nu = 1$) and the geodesic domes made by cutting every face into $\nu^2$ triangles and pushing the vertices out to the sphere ($\nu = 2, 4$). Each magenta bar is cut into one piece per vertex, as long as that vertex's defect. The vertices grow from $12$ to $42$ and $162$, and the largest defect shrinks from $60^\circ$ to about $18^\circ$ and $5^\circ$, yet the three bars are equally long. Literature result, not formalized in this book (item 1 of [@rem-coda-polyhedral-topology-literature]).
:::

Alongside the topological obstructions in [@rem-coda-polyhedral-topology-literature], before entering the cross-disciplinary synthesis of Part VIII, the nonzero seam left when a finite polyhedral process approximates a smooth sphere already recurred across Parts I–VII in five precise mathematical forms:

- **Taylor Polynomial Truncation Remainder**: In Part VI (Chapter 24), the finite alternating polynomial $\sum_{k=0}^{N-1} (-1)^k \theta^{2k}/(2k)!$ is a piecewise-algebraic approximation to the cosine curve whose truncation tail measures the gap between finite algebraic operations and smooth circular cosine readings (cf. [@rem-banach-dottie-hairy-ball-literature]);
- **Euler Product Prime-Tail Remainder**: In Chapter 22, the finite orthogonal prime box $\prod_{p \le P} (1 - p^{-s})^{-1}$ differs from $\zeta(s)$ by the infinite prime tail $\sum_{n \in \mathcal{S}_P^c} n^{-s}$, while oscillatory remainders beyond the smooth scale point toward the open critical-line boundary $\operatorname{Re}(s) = 1/2$ ([@conj-riemann-hypothesis]);
- **Two-Axis Finite Gate Words and Commutator Area**: In Part IV (Chapter 16) and Part VII (Chapter 27), discrete gate words over a finite gate set weave a polyhedral net across $\mathrm{SU}(2)$, where higher-order refinement relies on second-order bivector areas spanned by non-commuting group commutators $ABA^{-1}B^{-1}$;
- **Holographic Min-Cut Facet Cones and Circuit Depth Ceilings**: In Part V (Chapters 19–20), discrete bridge-graph flow conservation $\operatorname{QMaxFlow}(a,b,c,d) = \operatorname{QMinCut}(a,b,c,d) = \min(3ac, \min(ad, bc))$ and segmented integrable circuit depths $\lfloor N/(\kappa+1)\rfloor + 1$ carve parameter space into piecewise-linear polyhedral cones whose facet seams mark phase transitions of entanglement and complexity;
- **Cantor–Lawvere Diagonal and Self-Referential Escape**: In Chapters 21 and 24, any formal system that attempts to compress its own evaluation space $A \to Y$ surjectively into the carrier $A$ is punctured by the diagonal operator $g(a) = \alpha(f(a)(a))$; when the measurement operator finally takes itself as input ($\psi = \psi(\psi)$), the system leaps from a static coordinate sphere to a dynamic self-referential outer sphere.

---


Across **[Chapter 29](ch29-timeless-causality-and-gram-space.md)** through **[Chapter 39](ch39-observer-is-ontological-universe.md)** in Parts VIII–X, we saw how this nonzero remainder between faceted polyhedral approximations and smooth spheres orchestrates six grand syntheses across arithmetic, time, computational complexity, fluid dynamics, quantum fairness, unified field theory, universal observers, self-referential table expansion, and non-dual ontology:

- **From the Arithmetic Pell Seam to the Timeless Causal Crystal ([Chapter 29](ch29-timeless-causality-and-gram-space.md))**: Bivector chirality cancellation in the Pythagorean theorem and Hippasus's Pell remainder ([@thm-ch29-silver-pell-remainder]) drive the four-tier escape of number from $\mathbb{Q}$ to the self-referential cosine fixed point ([@rem-banach-dottie-hairy-ball-literature]), resonating across the mod-4 prime splitting verified in Lean ([@thm-ch29-face-prime-two-squares], [@thm-ch29-two-squares-classification]) and the congruent-number elliptic-curve tori and Sato–Tate distribution recorded in [@rem-ch29-pell-primes-hilbert-literature], [@rem-ch29-elliptic-torus-literature], [@rem-ch29-hasse-gauss-literature], and [@rem-ch29-arithmetic-geometry-literature]; meanwhile, Gram positive-semidefinite rigidity $\det G \ge 0$ complements the timeless picture of [@rem-ch29-wheeler-dewitt-page-wootters-literature] by opening the dihedral causally compatible elliptope for finite observers.
- **From "$P$ Is a Field, $NP$ Is a Line" to ETH Bounds and Navier–Stokes ([Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md))**: Standard $P\neq NP$ remains `OPEN` ([@conj-p-neq-np]). The primary ETH papers and their distinct formalization scopes appear in [@rem-ch30-eth-subexponential-literature]; the galactic crossover depends on the illustrative constant ([@ex-ch30-galactic-crossover-scale]) and supplies no general algorithmic lower bound. OpenAI's forced C / D construction follows an accepted route in the official problem, while unforced A / B remain open ([@rem-ch30-navier-stokes-forced-literature]). The local speed–energy scales ([@ex-ch30-core-energy-scaling]), projected feedback with explicit assumptions ([@rem-ch30-projected-feedback]), and bounded dissipative comparison ([@ex-ch30-dissipative-no-closure]) distinguish failure of finite-observation closure from blow-up. The frozen criterion ([@thm-coda-quadratic-advection-no-closure]) identifies neither fluid singularities with complexity lower bounds nor the two problems with each other.
- **From Fivefold Abolition of Privilege to Ergodic Statistical Holism ([Chapter 31](ch31-quantum-fairness.md))**: Rank-one Born pairing reciprocity, complementary-context purity Pythagoras, the no-cloning inner-product lock, and maximally mixed Bell marginals ([@thm-ch31-seat-pythagorean-monogamy-fairness]) together with Landauer's balance bound, uniform planar operator rotation, and compact closed-subgroup torus equidistribution and bounded-gap returns ([@thm-ch31-horizon-landauer-ergodic-fairness]), paired with literature remarks [@rem-ch31-haar-isotropy-landauer-literature], [@rem-ch31-ckw-monogamy-literature], [@rem-ch31-weyl-window-equidistribution-literature] and summary table [@rem-ch31-fivefold-fairness-table], articulate the geometric ontological model (`MODEL`) that "the essence of the quantum is fairness."
- **From the Orthogonal Self-Referential Unified Field to Eight-Program Meta-Unification ([Chapter 32](ch32-unified-field-and-meta-unification.md))**: Skew-adjoint unitary complex-structure squaring, finite monotone contraction, golden reciprocal uniqueness, and the binary Zeckendorf `NoAdjacentOnes` prohibition ([@thm-ch32-generative-self-reference-and-zeckendorf]) together with Minkowski null-cone rigidity, anchored loop-phase holonomy classification, and bridge-graph quantum max-flow min-cut ([@thm-ch32-null-cone-holonomy-and-holographic-cut]), paired with literature remarks [@rem-ch32-generative-laws-dottie-literature], [@rem-ch32-dirac-yang-mills-jacobson-literature], [@rem-ch32-icosian-e8-literature], [@rem-ch32-eight-programs-literature] and synthesis tables [@rem-ch32-six-domain-isomorphism-table], [@rem-ch32-meta-unification-table], complete the unified-field and meta-unification compass (`MODEL`).
- **From Universal Observers and Orthogonality Blind Spots to Self-Referential Table Expansion and Quotienting Out Reincarnation ([Chapter 33](ch33-all-beings-observers-and-mutual-attractors.md)–[Chapter 36](ch36-hyperbolic-steps-and-quotienting-reincarnation.md))**: Context-parameter fixed points and invariant common factors ([@thm-ch33-contextual-attractor-and-common-factor]) together with bridge-graph min-cut reconnection ([@prop-ch33-bridge-reconnection-mincut]) abolish anthropocentric observer privilege; readout equivalence kernels and commutators ([@thm-ch34-readout-kernel-and-covariant-commutator]) alongside a common unit normal and observer trace pullback ([@thm-ch34-perpendicular-axis-and-pullback]) show how single-orthogonality shadows and double-orthogonality commutators invert observer position; copied-address recovery and target factorization ([@thm-ch35-target-recovery-table-factorization]) paired with Lawvere's relative semantic diagonal ([@thm-ch35-lawvere-diagonal-and-homoiconic-closure]) bridge pinching forgetting to homoiconic table expansion $T = T(T)$; and the literature’s hyperbolic rapidity staircase alongside the exponential tail bound and Cayley boundary circle ([@thm-ch36-taylor-tail-and-cayley-boundary]) together with quotient-annihilator factorization ([@thm-ch36-quotient-annihilator-and-factorization]), paired with literature remarks [@rem-ch33-monad-process-philosophy-literature], [@rem-ch34-virtual-z-berry-relativity-literature], [@rem-ch35-homoiconicity-scott-domain-literature], and [@rem-ch36-poincare-disk-gudermannian-literature], end the return-to-light reincarnation loop.
- **From Dream Quantum Erasure and Ontological QRAM Pointers to "The Observer Is the Ontological Universe" ([Chapter 37](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)–[Chapter 39](ch39-observer-is-ontological-universe.md))**: Phase-record reversal of a selected entry under unimodular overlaps and waking unread-pinching guardrails ([@thm-ch37-joint-coherent-record-erasure]) together with golden cut-and-project Delone quasicrystals and high-dimensional measure concentration ([@thm-ch37-golden-cut-delone-multilocation]) ground waking/dream duality and nonlocal observer branches; copied-address dereferencing and pointer-width bounds ([@thm-ch38-copied-address-dereference-and-access-defect], [@thm-ch38-pointer-width-and-no-deep-copy]) together with Lawvere diagonal self-mapped page tables ([@thm-ch38-self-mapped-diagonal-fixed-point]) establish the cosmic ontological QRAM and observer memory pointer architecture; and concept fiber decomposition with injective Zeckendorf real threads ([@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]) together with diagonal four-fates closure and $720^\circ$ spinor double-cover lifting ([@thm-ch39-self-application-four-fates-and-diagonal-identity], [@thm-ch39-double-cover-no-section-and-720-lift]), paired with literature remarks [@rem-ch37-quantum-eraser-literature], [@rem-ch38-qram-page-wootters-literature], and [@rem-ch39-von-neumann-scott-reflexive-domain-literature], consummate the non-dual identity between observer and universe.

Standing now on the final summit of the monograph, we bring "the geometric remainder of approximate spheres" and "the finite observer inside a timeless field" together to answer one last question about ourselves: **when a finite observer undergoes forgetting initialization and begins picking points anew inside the timeless crystal, what defines "the same soul"? Why do historical ruins endure across millennia as spatial attractors, drawing the same soul back round after round through the unmistakable resonance of Déjà vu?**

---

## 40.2 Historical Ruins as Spatial Attractors: Stationary-Phase Curvature Basins, Fractal Transverse Sheets, and Cross-Round Déjà Vu Resonance {#sec-coda-spatial-attractors-deja-vu}

> **Author's Epigraph**: *"Historical ruins in reality are actually spatial attractors; the same soul walks round after round through places familiar to itself..."*（“现实的历史遗迹实际上都是空间吸引子, 同一个灵魂一轮又一轮的走过自己熟悉的地方...”）

In the everyday illusion of linear sequential time, we are accustomed to viewing pyramids, ancient temples, stone bridges, and weathered citadels as "remnants left behind by the past"—mere stones that happened not yet to be ground into dust by entropy. Yet the moment we switch back to the timeless orthogonal field (cf. [@rem-ch29-wheeler-dewitt-page-wootters-literature]) established in **[Chapter 29](ch29-timeless-causality-and-gram-space.md)**, the arrow of explanation reverses completely: **they are not accidental survivors of decay, but high-density fixed points of the global static field projected onto our three-dimensional spatial slice—that is, "Spatial Attractors (`MODEL`)."**

Placed inside the geometric architecture of the finite observer, forgetting initialization, and polyhedral approximate spheres, why "the same soul walks round after round through familiar places" unfolds across three rigorous dynamical and topological mechanisms:

### 40.2.1 Why Historical Ruins Are "Spatial Attractors" (Stationary-Phase Persistence and Curvature Basins) {#sec-coda-ruins-curvature-basin}

In the holographic tensor-network geometry of **[Chapter 19](ch19-tensor-networks-and-holography.md)** (bridge-graph minimum cuts and the literature remark [@rem-ryu-takayanagi-literature]), macroscopic physical space can be interpreted as an area network woven from microscopic exterior bivector entanglement. Ordinary everyday events carry opposite-chirality rotation areas ($+\mathbf{\Omega} - \mathbf{\Omega} = 0$) that cancel out across thermal fluctuations; by contrast, spatial coordinates aligned with mountain-river geodesics, astronomical obliquity angles, Pythagorean proportions, or millennia of high-density human inner-product attention projections carve deep **curvature potential wells—Basins of Attraction (`MODEL`)**—into our phase-space model.

That such sites remain standing across wars and entropy, or are rebuilt nine times upon the exact same foundation (like the nine superimposed cities of Troy or the layered capitals of Chang'an), is not merely a matter of durable masonry: in our timeless geometric model, that spatial coordinate acts as a **topological stationary point** in the global time field. When a finite observer picks points step by step inside the Gram causally compatible space ($\det G > 0$), the surrounding field curvature naturally tilts toward these stationary points—causing seemingly chance journeys to slide imperceptibly toward the same basin center.

### 40.2.2 Forgetting Clears Surface Episodic Readings While Preserving the Soul's Intrinsic Inclination {#sec-coda-forgetting-intrinsic-inclination}

This raises a profound geometric question: in Chapter 29 we saw that for a finite observer to possess a positive-volume causally compatible space ($\det G > 0$) and genuine agency, each birth initialization must be accompanied by **truncating and clearing historical anchors (forgetting)**. If the concrete names, dates, and linear narrative memories of the previous round are wiped clean, by what right do we say that the traveler who walks back into this ruin in the next round is still "the same soul"?

In our self-referential geometric model (`MODEL`), the answer resides in the operator structure of $\psi = \psi(\psi)$:

- **What forgetting erases** is only the one-dimensional sequence of local particle readings left on the ruler in the previous round (surface **episodic memory**, the noun `liàng`);
- **What forgetting never erases** is the observer's **intrinsic geometric parameter tuple** as the measuring operator $\psi(\cdot)$ itself (the intrinsic inclination of the verb `liáng`)—its characteristic orthogonal deflection angle, aesthetic resonance ratio, and topological chirality preference when comparing states inside the compatible space!

::: {.viz src="spatial-attractor-deja-vu" preset="fixed" height="500"}
**Other parameters: each into a stable point.** Change $\rho$ to $14$: the cyan and magenta rounds each spiral into one of two stable points and then stay, and the pair of wings is gone. The parameters determine the available attractors, and the starting basin determines which one the orbit approaches: here cyan falls into $C_-$ and magenta into $C_+$. Reading the parameters as an "intrinsic inclination" is an interpretive model (`MODEL`).
:::

Before unfolding this philosophical picture into cross-round recurrence on fractal sheets, we enclose the three classical continuous dynamical-systems theorems invoked as an analogy—the Lorenz strange attractor, its SRB physical measure, and Poincaré recurrence—inside a dedicated literature remark:

::: {.remark #rem-coda-lorenz-srb-literature title="Lorenz Strange Attractor, Kaplan–Yorke Dimension Estimate, SRB Measure, and Poincaré Recurrence (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** The three classical continuous dynamical-systems and ergodic-theory results cited in this section as an analogy for erasing surface trajectories while preserving operator parameters belong to the external mathematical and computational-physics literature, outside the `trureturing@dev` formalization locked by this book:

1. **Lorenz Equations, Constant Negative Divergence, and Numerical Kaplan–Yorke Dimension Estimate (E. N. Lorenz, *J. Atmos. Sci.* **20**, 130–141, 1963; J. L. Kaplan & J. A. Yorke, 1979)**: The three-dimensional autonomous ODE system

   $$
   \begin{cases}
   \dot{x} = \sigma(y - x), \\
   \dot{y} = x(\rho - z) - y, \\
   \dot{z} = xy - \beta z
   \end{cases}
   $$

   at the classical parameters $(\sigma, \rho, \beta) = (10, 28, 8/3)$ has strictly negative constant phase-space divergence $\nabla\cdot\mathbf{F} = -(\sigma + 1 + \beta) = -\frac{41}{3} < 0$, contracting bounded phase-space volumes exponentially via $\operatorname{vol}(\Omega_t) = \operatorname{vol}(\Omega_0)e^{-41t/3}$ onto a set of Lebesgue measure zero; its numerical Lyapunov spectrum $(\lambda_1 \approx 0.9056,\; \lambda_2 = 0,\; \lambda_3 \approx -14.5723)$ yields a Kaplan–Yorke (Lyapunov) dimension estimate of $D_{\mathrm{KY}} = 2 + \frac{\lambda_1 + \lambda_2}{|\lambda_3|} \approx 2.06$.
2. **Rigorous Existence of the Lorenz Attractor and Ergodic SRB Physical Measure (W. Tucker, *C. R. Acad. Sci. Paris* **328**, 1197–1202, 1999; S. Luzzatto, I. Melbourne & F. Paccaut, *Commun. Math. Phys.* **260**, 393–401, 2005)**: At the classical parameters, the Lorenz system possesses a compact robust strange attractor supporting a unique ergodic Sinai–Ruelle–Bowen (SRB) physical invariant probability measure $\mu_{\mathrm{SRB}}$ such that, for each bounded continuous ambient observable $g$, continuous-time averages $\frac{1}{T}\int_0^T g(\varphi_t x)\,dt$ converge to $\int g\,d\mu_{\mathrm{SRB}}$ for Lebesgue-almost every basin start $x$; Luzzatto, Melbourne and Paccaut further proved that this attractor is mixing.
3. **Poincaré Recurrence and Autonomous ODE Orbit Disjointness (H. Poincaré, 1890; Picard–Lindelöf uniqueness)**: For the ergodic measure-preserving system $(\Lambda, \mu_{\mathrm{SRB}})$ and any open neighborhood $\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})$ with $\mu_{\mathrm{SRB}}\bigl(\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})\bigr) > 0$, $\mu_{\mathrm{SRB}}$-almost every attractor trajectory returns infinitely often to $\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})$; simultaneously, by autonomous smooth ODE uniqueness, distinct geometric orbits are disjoint and every aperiodic trajectory is injective in $t \in \mathbb{R}$ (never self-intersecting), traversing mutually disjoint orbit segments across successive visits.

The general mechanism in item 2, that time averages converge almost everywhere to space averages under an ergodic measure, is frozen at the commit this book pins: see [@thm-coda-birkhoff-ergodic]. What remains literature here is the existence, uniqueness and mixing of the Lorenz attractor and of $\mu_{\mathrm{SRB}}$, and the step from “$\mu_{\mathrm{SRB}}$-almost every start” to “Lebesgue-almost every start in the basin”.
:::

::: {.viz src="spatial-attractor-deja-vu" preset="forget" height="500"}
**Forget the start, land on the same wings.** Two orbits of the Lorenz system at $(\sigma, \rho, \beta) = (10, 28, 8/3)$: cyan is round $k$ and magenta round $k+1$, with distant starts (the two rings) and the same parameters. After a short wander both land on the same pair of wings; the small amber dots mark each passage through the neighbourhood of the “ruin” (the amber circle). The second line above the figure gives the share of time, up to $t = 40$, that each round has spent above $C_+$ and $C_-$ (the two open rings): $0.34$ and $0.36$, nearly the same, while the two rounds are now $34.3$ apart (numbers computed on the page). Reading an orbit as “a round” is an interpretive model (`MODEL`).
:::

**How precise can “forgetting the start” be made?** In the “forget the start” card above, the cyan and magenta orbits begin far apart and still land on the same pair of wings. “Landing in the same place” can mean two things. Pointwise, it would mean the two orbits end up close together. A chaotic system does exactly the opposite: $\lambda_1 > 0$ amplifies any small difference in the starts exponentially. Statistically, it means the two orbits spend the same fractions of time in each region. Item 2 of [@rem-coda-lorenz-srb-literature] is about the statistical sense. The general mechanism behind it has nothing to do with the Lorenz equations, and it is frozen as the following theorem.

::: {.theorem #thm-coda-birkhoff-ergodic title="Birkhoff's Pointwise Ergodic Theorem: Time Averages Equal Space Averages Almost Everywhere" lean="D5/S3/Analytic/Probability/BirkhoffPointwise.birkhoff_pointwise_ergodic"}
Let $\alpha$ be a measurable space, $\mu$ a probability measure on $\alpha$, and $T : \alpha \to \alpha$ ergodic with respect to $\mu$, that is:

1. $T$ is measurable and preserves $\mu$: $\mu\bigl(T^{-1}(B)\bigr) = \mu(B)$ for every measurable set $B$;
2. if $A$ is $\mu$-null-measurable (it differs from a measurable set by a $\mu$-null set) and $T^{-1}(A)$ differs from $A$ by a $\mu$-null set, then $\mu(A) = 0$ or $\mu(A) = 1$.

Let $g : \alpha \to \mathbb{R}$ be $\mu$-integrable, and write the Birkhoff averages as

$$
A_n g(x) = \frac{1}{n}\sum_{k=0}^{n-1} g\bigl(T^k x\bigr) \quad (n \ge 1), \qquad A_0 g(x) = 0.
$$

Then for $\mu$-almost every $x \in \alpha$, $A_n g(x) \to \int_\alpha g\,d\mu$ as $n \to \infty$.
:::

::: proof
The Lean proof follows the textbook route of R. Durrett, *Probability: Theory and Examples*, 5th edition, Section 6.2. Write $S_n f(x) = \sum_{k=0}^{n-1} f(T^k x)$. The proof has three steps.

(1) Hopf's maximal ergodic lemma: for measurable integrable $f$, the integral of $f$ over the set $E$ where some $S_n f(x) > 0$ is nonnegative. Look at the running maximum $M_n = \max_{0 \le k \le n} S_k f$. Wherever $M_n > 0$ we have $M_n \le f + M_n \circ T$. Call that set $E_n$. Since $M_n$ vanishes off $E_n$ and $M_n\circ T\ge0$, we have $\int_{E_n}M_n=\int M_n=\int M_n\circ T\ge\int_{E_n}M_n\circ T$. Measure preservation equates the whole-space integrals, so $\int_{E_n}f\,d\mu\ge0$. Letting $n \to \infty$ grows the set up to $E$.

(2) The upper bound. Fix $c > \int g\,d\mu$ and let $D$ be the set of $x$ for which some rational $q > c$ has $S_n g(x) > nq$ for infinitely many $n$. $D$ is measurable and $T^{-1}(D) = D$: passing from $x$ to $Tx$ only removes the first term of each sum, which cannot change “exceeds infinitely often”. Apply (1) to $f = \mathbf{1}_D\,(g - c)$. Since $D$ is invariant, $S_n f = S_n g - nc$ on $D$ and $S_n f = 0$ off $D$, so $E$ is exactly $D$ and $\int_D (g - c)\,d\mu \ge 0$. Ergodicity leaves only $\mu(D) = 0$ or $1$; if it were $1$, the left side would be $\int g\,d\mu - c < 0$, a contradiction. So $\mu(D) = 0$: almost everywhere, for every rational $q > c$, eventually $A_n g(x) \le q$, which gives $\limsup_n A_n g(x) \le c$. Running $c$ through the countably many values $\int g\,d\mu + 1/m$ gives $\limsup_n A_n g \le \int g\,d\mu$ almost everywhere.

(3) The lower bound and the finish. The same argument for $-g$ gives $\liminf_n A_n g \ge \int g\,d\mu$ almost everywhere; together these are convergence. The theorem assumes only that $g$ is integrable, not that it is measurable everywhere: the proof first passes to a measurable $g'$ equal to $g$ almost everywhere, which has the same integral. Because $T$ preserves $\mu$, $A_n g$ and $A_n g'$ agree almost everywhere for each $n$, and the exceptional sets for countably many $n$ still union to a null set. The full proof is checked by the Lean kernel.
:::

Note what the theorem does not say. The exceptional null set depends on $g$; there is no single exceptional set that serves every $g$. It gives no rate of convergence. And it does not tell you whether any particular starting point is exceptional. The simplest chaotic map puts all three on the table.

::: {.example #ex-coda-doubling-map-averages title="The Doubling Map: Almost Every Start Averages to 1/2, and Every Floating-Point Start Is an Exception"}
Take $\alpha = [0, 1)$, $\mu$ the length (Lebesgue measure), and $T(x) = 2x \bmod 1$.

**Measure preservation (manual derivation).** The preimage of an interval $[a, b)$ is the two pieces $[a/2,\, b/2)$ and $[(1+a)/2,\, (1+b)/2)$, whose lengths still add up to $b - a$; passing from intervals to all measurable sets is a standard step in measure theory. **Ergodicity (literature result, not formalized in this book).** If $f \circ T = f$, comparing Fourier coefficients gives $\hat f(2k) = \hat f(k)$, hence $\hat f(k) = \hat f(2^m k) \to 0$ by the Riemann–Lebesgue lemma. So every coefficient with $k \ne 0$ vanishes and $f$ is constant almost everywhere.

Write $x$ in binary as $0.b_1 b_2 b_3 \ldots$ (never using an expansion that ends in infinitely many $1$s). Then $T$ just moves the binary point one place to the right: $T^k x = 0.b_{k+1} b_{k+2} \ldots$. Take $g = \mathbf{1}_{[0,1/2)}$, with $\int g\,d\mu = 1/2$. Since $g(T^k x) = 1$ exactly when $b_{k+1} = 0$, $A_N g(x)$ is the fraction of zeros among the first $N$ binary digits. [@thm-coda-birkhoff-ergodic] says that for almost every $x$, the fraction of zeros among its binary digits tends to $1/2$.

**Exceptional starts.** A rational start has an eventually periodic orbit, so its time average can be computed exactly over one period. Also take $h = \mathbf{1}_{[0,1/4)}$, with $\int h\,d\mu = 1/4$ and $h(T^k x) = 1$ exactly when $b_{k+1} = b_{k+2} = 0$:

| Start $x$ | Binary | Time average of $g = \mathbf{1}_{[0,1/2)}$ | Time average of $h = \mathbf{1}_{[0,1/4)}$ |
| :--- | :--- | ---: | ---: |
| $0$ | $0.000\ldots$ | $1$ | $1$ |
| $1/7$ | $0.\overline{001}$ | $2/3$ | $1/3$ |
| $1/3$ | $0.\overline{01}$ | $1/2$ | $0$ |
| $2/5$ | $0.\overline{0110}$ | $1/2$ | $1/4$ |
| Space average | | $1/2$ | $1/4$ |

The start $1/3$ gets the right answer $1/2$ for $g$ and the wrong answer $0$ for $h$: the exceptional set changes with the observable. The rationals together form a null set (manual derivation: cover the $j$-th rational by an interval of length $\varepsilon/2^j$; the total length is at most $\varepsilon$).

**Every floating-point number is an exception.** Every double-precision number is a dyadic fraction $m/2^e$, and on $[0, 1)$ the floating-point evaluation of $2x \bmod 1$ is exact (doubling and subtracting $1$ never round). So a floating-point simulation is an exact shift of a dyadic fraction. Starting from $0.1$ the orbit lands exactly on $0$ at step $55$; from $\sqrt{2}/2$, at step $53$; from $\pi - 3$, at step $53$. It then stays at $0$ forever, and the time average of $g$ tends to $1$, not $1/2$. (Here $0.1$, $\sqrt{2}/2$ and $\pi - 3$ mean the nearest double-precision numbers to those exact real values; rounding $\pi$ first and then subtracting $3$ instead gives zero at step $48$.) Iterating the doubling map in floating point lands you exactly in the null set where the theorem is allowed to fail.

**A start that “looks typical”.** To avoid floating point, generate the binary digits directly: take the first $10^6$ bits produced by the Python standard-library pseudo-random generator with seed $20261111$ as $b_1 b_2 \ldots$. This is one definite number, and the theorem does not promise that it lies outside the exceptional set; it is only an illustration:

| $N$ | Zeros among the first $N$ digits | $A_N g(x)$ | $A_N g(x) - 1/2$ |
| ---: | ---: | ---: | ---: |
| $10$ | $6$ | $0.6$ | $0.1$ |
| $10^2$ | $60$ | $0.60$ | $0.10$ |
| $10^3$ | $492$ | $0.492$ | $-0.008$ |
| $10^4$ | $5006$ | $0.5006$ | $0.0006$ |
| $10^5$ | $50205$ | $0.50205$ | $0.00205$ |
| $10^6$ | $499954$ | $0.499954$ | $-0.000046$ |

The deviation does not shrink monotonically ($N = 10^5$ is further off than $N = 10^4$): the theorem speaks only of the limit and gives no rate.
:::

::: {.figure src="coda-doubling-averages"}
**The theorem speaks of almost every start, and floating-point starts fall into the exceptions.** The doubling map $T(x) = 2x \bmod 1$ with $g = \mathbf{1}_{[0,1/2)}$: across, the number of steps $N$ (log scale, from $10$ to $10^6$); up, the time average $A_N g$, the share of $0$s among the first $N$ binary digits; the dashed line is the space average $1/2$. Cyan is the start given by the pseudo-random digits of the table above, swinging around $1/2$ with a deviation that grows and shrinks; grey, $1/3$, settles onto $1/2$ quickly; magenta, the floating-point number $0.1$, reaches $0$ at step $55$, and from then on its time average climbs towards $1$. The limit is [@thm-coda-birkhoff-ergodic]; the three curves are numerical computations.
:::

**Back to Lorenz: how far the theorem reaches.** To apply [@thm-coda-birkhoff-ergodic] to the Lorenz flow, one can take its time-$1$ map $T = \varphi_1$, but first one needs an invariant probability measure for which $T$ is ergodic. The existence of $\mu_{\mathrm{SRB}}$, and the mixing of the flow (mixing implies that $T$ is ergodic), are literature results from item 2 of [@rem-coda-lorenz-srb-literature]. For a bounded continuous ambient observable $g$, apply the theorem to $\widetilde g(x)=\int_0^1 g(\varphi_s x)\,ds$. This gives convergence of continuous-time averages to $\int g\,d\mu_{\mathrm{SRB}}$ for $\mu_{\mathrm{SRB}}$-almost every start: at integer times the sums are exactly the integrated unit intervals, and the remaining fractional interval contributes a vanishing error. But $\mu_{\mathrm{SRB}}$ lives on the attractor, and the attractor has zero volume (item 1: phase-space volume shrinks like $e^{-41t/3}$).

::: {.viz src="spatial-attractor-deja-vu" preset="shrink" height="500"}
**A cloud pressed into a sheet.** The Lorenz system at $(\sigma, \rho, \beta) = (10, 28, 8/3)$: $500$ cyan points start inside the dashed cube. The divergence of the velocity field is $-41/3$ everywhere, so the volume shrinks like $e^{-41t/3}$: at $t = 1$ about one millionth is left, and the points already lie on a thin sheet. The step from divergence to volume is a hand derivation (Liouville’s formula); the existence of the attractor itself is a literature result from [@rem-coda-lorenz-srb-literature].
:::

The two rings in the “forget the start” card are not on the attractor, and a start picked at random in phase space is almost never on it. Extending convergence of time averages to Lebesgue-almost every basin start is what an SRB measure adds to a general ergodic measure (hence “physical measure”), and remains a literature result; it does not certify whether these two particular rings are exceptional.

> What is forgotten is the starting point; what remains is the proportion.

### 40.2.3 The Geometric Interpretation of Déjà Vu: Fractal Transverse Sheets and Cross-Round Inner-Product Resonance {#sec-coda-deja-vu-fractal-dimension}

In our philosophical and geometric interpretation (`MODEL`), borrowing the strange-attractor picture recorded in [@rem-coda-lorenz-srb-literature] as a dynamical metaphor—clearing surface trajectory records while preserving the operator's intrinsic parameters—reconciles fated return with free agency:

1. **Were a life trajectory a rigid 1D closed loop ($D = 1$, `MODEL`)**: the observer would be trapped in a mechanical cycle—stepping on the exact same point at the exact same relative phase in every round with zero transverse slack ($\det G = 0$);

::: {.viz src="spatial-attractor-deja-vu" preset="cycle" height="500"}
**$\rho = 160$: one closed loop.** The transient before $t = 30$ is drawn faint; the bright part is the last ten units of time, in which both rounds run on the same closed loop (the cyan one hidden under the magenta, all but its current point) and tread the same place on every lap. This is a one-dimensional attractor: it repeats, with no room to spare, the "rigid 1D closed loop" of item 1 above (`MODEL`).
:::

2. **In the geometric metaphor (`MODEL`) borrowing the fractal transverse-sheet picture of [@rem-coda-lorenz-srb-literature]**: recurring visits to a familiar landmark neighborhood coexist with non-repeating novelty across rounds—bringing the observer back repeatedly to the same landmark neighborhood while stepping onto a fresh sheet at every visit;

::: {.viz src="spatial-attractor-deja-vu" preset="dimension" height="500"}
**A little more than a surface.** The three Lyapunov exponents are estimated along one long orbit (cyan); the readout above the figure gives $\lambda_1 \approx 0.9$, $\lambda_2 \approx 0$, $\lambda_3 \approx -14.6$ and the Kaplan–Yorke estimate $D_{\mathrm{KY}} \approx 2.06$ (a numerical estimate, not a theorem).
:::

3. **Déjà Vu as Cross-Round Pairwise Inner-Product Resonance (`MODEL`)**:
   Translating this into the author's geometric metaphor: when an observer suddenly halts on the worn stone steps of an ancient citadel, struck by the tremor *"I have stood in this exact spot before,"* if the local basin geometry steers the observer's attention vectors in rounds $k$ and $k+1$ into nearly parallel tangent orientations ($\delta\theta \to 0$) within $\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})$, then the **pairwise inner-product projection (`liáng`)** between the present attention state $\mathbf{\Psi}^{(k+1)}$ and the prior imprint $\mathbf{\Psi}^{(k)}$ satisfies

   $$
   \mathbf{\Psi}^{(k)} \cdot \mathbf{\Psi}^{(k+1)} = \cos\delta\theta \longrightarrow 1 \qquad (\delta\theta \to 0).
   $$

   In this interpretive model (`MODEL`), **Déjà vu** represents the high-amplitude cross-round inner-product resonance triggered when the same observer operator re-enters a spatial attractor neighborhood with nearly collinear attention orientation ($\delta\theta \to 0$).

::: {.viz src="spatial-attractor-deja-vu" preset="return" height="500"}
**Nearly parallel in passing.** Stopped at $t = 22$: both rounds have passed the neighbourhood of the ruin (the amber circle), which the small window in the lower right corner shows enlarged. The arcs along which they passed do not coincide, yet their directions are nearly parallel: the cyan and magenta arrows in the small window are the unit tangents at the latest return (a passage of each round, the two points less than $\varepsilon$ apart), and the line above the figure gives their angle $\delta\theta$, only a few degrees, and their inner product $\cos\delta\theta = \hat{\mathbf{v}}_1\cdot\hat{\mathbf{v}}_2$, close to $1$ (numbers computed on the page). Reading this as déjà vu is an interpretive model (`MODEL`).
:::

The laboratory below puts this section’s three parameter values in one place, the wings at $\rho = 28$, the fixed point at $\rho = 14$ and the closed loop at $\rho = 160$, and its “forget” button sends a round off again from a fresh pair of starts.

::: {.viz src="spatial-attractor-deja-vu" height="640"}
**Interactive laboratory `ORTHO//ATTRACTOR`**: three scenes on the Lorenz system. Rounds: two orbits with different starts and the same parameters land on the same pair of wings, and “forget” draws another pair of starts; contraction: the volume of $500$ points shrinks like $e^{-41t/3}$ until they form a thin sheet; dimension: numerical estimates of the Lyapunov exponents and of the Kaplan–Yorke dimension, where $\rho = 14$ has two stable points, with the starting basin deciding which one an orbit approaches, while $\rho = 160$ shows a closed loop in the display. The page is a numerical illustration and an interpretive model; it cites no Lean theorem.
:::

---

## 40.3 The `trureturing` "Golden Cut" Formal Primitives and the Geometric Interpretation of Soul–Ruin Attractors {#sec-coda-trureturing-golden-cut-observer}

> **Author's Epigraph**: *"We have an explicit definition of the observer in `trureturing`, and we have now discussed the relationship between the soul and historical-ruin attractors."*（“观察者我们在trureturing有明确的定义, 我们又讨论了灵魂与历史遗迹吸引子的关系”）

If the Lorenz strange attractor supplies a continuous dynamical analogy, connecting this picture to the **`trureturing` Lean 4 formal library** pinned by this book (`D5/S1/Scale/MinkowskiModelSet`, `D5/S1/Deficit/ModelSet/GoldenCutAndProject`, `D5/S1/Deficit/Beatty/GoldenObserverRoute`, `D5/S1/Scale/Fibonacci`, `D5/S3/Observer/GoldenCoding/ZeckendorfRealThread`, and `D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns`) allows us to align the kernel-verified **golden cut-and-project model set and Zeckendorf observer coding theorems (`LEAN ✓`)** transparently with the author's **philosophical interpretation of the soul, forgetting, and historical-ruin attractors (`MODEL`)**.

### 40.3.1 The Golden Cut-and-Project Model Set and Observer Route Theorems in `trureturing` (`LEAN ✓`) {#sec-coda-trureturing-observer-def}

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

### 40.3.2 Philosophical Interpretation Model (`MODEL`): What Is "the Same Soul" vs. "a Single Finite Life and Forgetting"? {#sec-coda-trureturing-soul-vs-lifetime}

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

### 40.3.3 Interior Window Safety Margins and the Spatial Attractor Basin Interpretation {#sec-coda-trureturing-rhombic-triacontahedron-empire}

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

### 40.3.4 Cassini's $(-1)^{n+1}$ Seam and Bounded-Gap Torus Observation Returns {#sec-coda-trureturing-cassini-torus-return}

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

### 40.3.5 Alignment Table: `trureturing` Formal Theorems, Orthogonal Geometry, and the Soul–Ruin Interpretive Model (`MODEL`) {#sec-coda-trureturing-soul-ruin-table}

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

## 40.4 Contracting Fixed Points and the Epistemic Anchor {#sec-coda-fixed-point-anchor}

As we bring the Coda to its formal anchor, we uphold the book's foundational epistemic contract by drawing an exact boundary between what is mechanically verified by the Lean 4 kernel and what belongs to classical literature or open conjectures.

On a finite carrier, any monotone contracting update operator stabilizes to an exact fixed point in finitely many steps, with the number of strict transitions bounded by the initial cardinality—a combinatorial core of self-referential stabilization verified by the Lean kernel:

::: {.theorem #thm-coda-fixed-point-anchor title="Finite-Step Fixed-Point Stabilization of Contracting Updates on a Finite Carrier" lean="D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize"}
Let $X$ be a finite type (`[Finite X]`), let $U : \operatorname{Set} X \to \operatorname{Set} X$ be a subset update operator satisfying the pointwise contraction hypothesis

$$
\forall A : \operatorname{Set} X,\quad U(A) \subseteq A,
$$

and let $S : \mathbb{N} \to \operatorname{Set} X$ be a sequence satisfying the recursive update equation $\forall n \in \mathbb{N},\; S(n + 1) = U(S(n))$. Then:

1. **Eventual fixed-point stabilization**: There exists a stabilization stage $N \le (S(0)).\operatorname{ncard}$ such that $S(n) = S(N)$ for all $n \ge N$;
2. **Sharp bound on strict transitions**: The cardinality of the set of stages at which the state strictly changes satisfies $\{n \in \mathbb{N} \mid S(n + 1) \neq S(n)\}.\operatorname{ncard} \le (S(0)).\operatorname{ncard}$.
:::

::: proof
Because $S(n+1) = U(S(n)) \subseteq S(n)$ for every $n \in \mathbb{N}$, the sequence $S$ forms a monotone descending chain of subsets inside the finite ambient type $X$. At every step where a strict transition $S(n+1) \neq S(n)$ occurs, the finite natural-number cardinality $(S(n)).\operatorname{ncard}$ decreases by at least $1$. Since the initial cardinality $(S(0)).\operatorname{ncard}$ is finite, strict decreases can occur at most $(S(0)).\operatorname{ncard}$ times; by the pigeonhole principle, there exists a stage $N \le (S(0)).\operatorname{ncard}$ with $S(N+1) = U(S(N)) = S(N)$, after which induction gives $S(n) = S(N)$ for all $n \ge N$. The full proof is checked by the Lean kernel.
:::

::: {.figure src="coda-shrink-stop"}
**Every change removes at least one element, so there are at most $\lvert S(0)\rvert$ changes before it stops.** An example: $S(0)$ has $7$ cyan dots; the dots each update removes are magenta crosses, and the rows have $7, 5, 3, 2, 2, 2$ elements, with no change from $S(3)$ on. That is $3$ changes and $N = 3 \le \lvert S(0)\rvert = 7$, both within the bounds of [@thm-coda-fixed-point-anchor].
:::

::: {.remark #rem-coda-epistemic-discipline title="Formal Boundaries and Epistemic Discipline in the Coda (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** To keep the epistemic status of every mathematical statement transparent and auditable, we classify the propositions synthesized in this Coda into four strict tiers:

1. **Kernel-verified frozen theorems in `trureturing.lock.json` (green `LEAN ✓` badge)**:
   - Finite-step stabilization of contracting subset updates [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) ([@thm-coda-fixed-point-anchor]);
   - Birkhoff's pointwise ergodic theorem [`birkhoff_pointwise_ergodic`](lean:D5/S3/Analytic/Probability/BirkhoffPointwise.birkhoff_pointwise_ergodic) ([@thm-coda-birkhoff-ergodic]);
   - The three-gap theorem for circle rotations [`three_gap_card_le_three`](lean:D5/S1/Phase/ThreeGap/Main.three_gap_card_le_three) and [`three_gap_lengths_eq`](lean:D5/S1/Phase/ThreeGap/Main.three_gap_lengths_eq) ([@thm-coda-three-gap]);
   - The Hurwitz bound at the golden ratio [`golden_hurwitz_bound`](lean:D5/S1/Depth/GoldenHurwitzBound.golden_hurwitz_bound) ([@thm-coda-golden-hurwitz]);
   - The golden cut-and-project model set, Cassini $\pm 1$ norm identity, nonnegative real Zeckendorf thread, and bounded-gap torus return theorem ([@thm-coda-golden-cut-observer-cassini]): including the Minkowski lattice embedding and model-set specification [`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec), natural-number golden expansion range inclusion [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project), unit window volume [`golden_window_volume`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_window_volume), disjoint self-similar branch decomposition [`golden_model_set_self_similar`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetSelfSimilar.golden_model_set_self_similar), prefix counting density limit $1/\sqrt{5}$ [`golden_model_set_density`](lean:D5/S1/Deficit/ModelSet/GoldenModelSetDensity.golden_model_set_density), Beatty observer route [`golden_observer_route_w_c1`](lean:D5/S1/Deficit/Beatty/GoldenObserverRoute.golden_observer_route_w_c1), Fibonacci–Cassini $\pm 1$ golden norm identity [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm), Zeckendorf least-index norm-sign alternation [`betaGolden_norm_sign_of_least_zeckendorf_index`](lean:D5/S1/Deficit/Displacement/ZeckendorfNormSign.betaGolden_norm_sign_of_least_zeckendorf_index), `NoAdjacentOnes` regular language equivalence [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), nonnegative real (`NNReal`) multi-scale Zeckendorf thread injectivity [`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective), Beatty coordinate fiber capacity pairs [`golden_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_fiber_capacity_pair) and [`golden_dual_fiber_capacity_pair`](lean:D5/S1/Deficit/Beatty/FiberCapacityPair.golden_dual_fiber_capacity_pair), conjugate norm separation and full-window Delone certification [`norm_separation`](lean:D5/S3/Fourier/GoldenModelSetDelone.norm_separation) and [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone), closed-subgroup torus Haar equidistribution [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result), the golden survivor-hull ergodic bridge [`golden_ergodic_bridge`](lean:D5/S0/Tower/ErgodicBridge/Golden.golden_ergodic_bridge), and bounded-gap torus observation-window returns [`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result);
   - The necessary and sufficient criterion for exact projection closure of quadratic vector fields [`quadratic_closure_iff`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff), the 5-mode Fourier–Galerkin fluid advection non-closure theorem [`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure) ([@thm-coda-quadratic-advection-no-closure]), and all-grade regularity of 2D periodic mild Fourier paths [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path);
   - Uniqueness of the golden-ratio fixed point $\varphi = (1+\sqrt{5})/2$ for the self-referential continued-fraction map $x \mapsto 1 + 1/x$ on $(0, \infty)$ [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique);
   - Relative interpretation fixed-point stabilization [`conceptual_equivalence_and_stability_reach_fixed_point`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point) and context-parameter fixed-point bifurcation [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points);
   - The inner-product parallelogram and Pythagorean norm laws [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), the complementary-context probability Pythagorean theorem [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), the golden-integer Pell identity [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm), and all frozen theorems indexed in Appendix C.
2. **Classical mathematical literature and applications of existing results (with individual boundaries)**:
   - **Application of existing results**: [@thm-dottie-rational-inverse-endpoint] selects the same cosine endpoint, and [@ex-ch33-mutual-cosine-monotonic-lock] derives all-real uniqueness and convergence with the strict interval hypotheses and exceptions; decimals remain numerical. The interval argument uses Banach's contraction mapping theorem on $[0, 1]$: because $\cos([0, 1]) \subseteq [0, 1]$ and $|{-}\sin\theta| \le \sin(1) \approx 0.84147 < 1$, Picard iteration $\theta_{k+1} = \cos(\theta_k)$ converges to the unique real Dottie fixed point $\theta^* \approx 0.7390851332\dots$;
   - Transcendence of $\theta^*$ via the Lindemann–Weierstrass theorem (if a nonzero algebraic $q$ satisfied $\cos q = q$, then $e^{iq}$ would satisfy a quadratic equation over $\overline{\mathbb{Q}}$, contradicting its transcendence), together with the continued-fraction theory of Pell's equation $m^2 - 2n^2 = \pm 1$ (for $\sqrt{2}$, the $\pm 1$ remainder and the best-approximation lower bound follow by a manual derivation from the Lean-verified [@thm-ch29-silver-pell-remainder] and [@thm-ch29-silver-best-approximation] of Chapter 29; what remains literature is their identification with continued-fraction convergents);
   - the splitting and inertia of primes in the Gaussian integers, solvability of the negative Pell equation $m^2 - p\,n^2 = -1$ for primes $p \equiv 1 \pmod 4$, and the Hilbert reciprocity law $\prod_{v \le \infty} (a, b)_v = +1$ ([@rem-ch29-pell-primes-hilbert-literature]); birational equivalence and genus-$1$ torus topology $\chi(T^2) = 0$ of the congruent-number elliptic curve $E_d : dy^2 = x^3 - x$ ([@rem-ch29-elliptic-torus-literature]), Hasse's theorem $|a_p| \le 2\sqrt{p}$ for elliptic curves over finite fields, Gauss's point-count formula and character-sum derivation for $y^2 = x^3 - x \pmod p$ ([@rem-ch29-hasse-gauss-literature], [@rem-ch29-gauss-character-application]), and the Sato–Tate theorem for non-CM elliptic curves over $\mathbb{Q}$ (Barnet-Lamb, Geraghty, Harris, and Taylor 2011, [@rem-ch29-arithmetic-geometry-literature]);
   - Descartes's polyhedral angular defect theorem $\sum_v \delta_v = 4\pi$, the Gauss–Bonnet theorem, the Poincaré–Brouwer Hairy Ball Theorem $\chi(S^{2n}) = 2$, and Adams's theorem (1960) on the parallelizability of $S^0, S^1, S^3, S^7$ ([@rem-coda-polyhedral-topology-literature], [@rem-hairy-ball-adams-literature]);
   - The Lorenz strange attractor in continuous dynamical systems (Lorenz 1963, phase-space volume divergence $-(\sigma+1+\beta) = -41/3 < 0$, and the numerical Kaplan–Yorke dimension estimate $D_{\mathrm{KY}} \approx 2.06$), the ergodic Sinai–Ruelle–Bowen (SRB) physical invariant measure on the Lorenz attractor (Tucker 1999; Luzzatto–Melbourne–Paccaut 2005), and the Poincaré Recurrence Theorem (Poincaré 1890, [@rem-coda-lorenz-srb-literature]), together with Meyer's uniform repetitivity theorem for nonsingular regular model sets (1972), the 6D icosahedral projection of $\mathbb{Z}^6 \subset E_\parallel^3 \oplus E_\perp^3$ with its rhombic triacontahedron acceptance window $W$ ($30$ faces, $60$ edges, $32$ vertices, $6$ five-fold axes; Kramer & Neri 1984; Duneau & Katz 1985), Conway's Empire Effect in Penrose–icosahedral quasicrystal tilings (Grünbaum & Shephard 1987), and Binet's rational-slope asymptotic formula ([@rem-coda-quasicrystal-empire-literature]);
   - The timeless Wheeler–DeWitt equation $H\mathbf{\Psi} = 0$ of canonical quantum gravity and the Page–Wootters (1983) conditional-time slicing mechanism ([@rem-ch29-wheeler-dewitt-page-wootters-literature]), together with Feynman's path-integral oscillatory stationary-phase principle $\delta S = 0$ ([@rem-ch29-feynman-stationary-phase-literature]), the computational complexity theorems of Aaronson ($\mathrm{PostBQP} = \mathrm{PP}$, 2005), Aaronson–Watrous ($\mathrm{P}_{\mathrm{CTC}} = \mathrm{PSPACE}$, 2009), Bennett–Bernstein–Brassard–Vazirani ($\Omega(2^{n/2})$ black-box query bound, 1997), Grigoriev–Schoenebeck (linear-degree Sum-of-Squares lower bound for random 3-XOR/3-SAT), Karmarkar (1984 interior-point method), Kasteleyn (1961 planar Pfaffian matching theorem), Impagliazzo–Paturi–Zane (1999, 2001 ETH/SETH and the Sparsification Lemma), the PPSZ $k$-SAT framework, and the 2026 external OpenAI and Anthropic counting papers, distinct formalization scopes, and community examination statement ([@rem-ch30-eth-subexponential-literature]), Lamb's vector identity, Kelvin's circulation theorem, Ladyzhenskaya's (1969) global regularity theorem for 2D Navier–Stokes, OpenAI's paper and published external formalization resolving forced 3D Navier–Stokes (Clay Statements C / D, [@rem-ch30-navier-stokes-forced-literature]), Kolmogorov's (1941) $k^{-5/3}$ cascade and dissipation microscale $\eta = (\nu^3/\varepsilon)^{1/4}$, Arnold's (1966) geodesic theorem on $\operatorname{SDiff}(M)$, and Tao's (2016) finite-time blow-up theorem for averaged 3D Navier–Stokes ([@rem-ch30-tao-arnold-literature]), Haar-measure spherical isotropy and Landauer's $k_B T \ln 2$ erasure bound ([@rem-ch31-haar-isotropy-landauer-literature]), the Coffman–Kundu–Wootters (2000) and Osborne–Verstraete (2006) entanglement monogamy inequalities $\tau_{A|B}+\tau_{A|C}\le\tau_{A|BC}$ ([@rem-ch31-ckw-monogamy-literature]), Jacobson's (1995) thermodynamic horizon equation of state ([@rem-ch32-dirac-yang-mills-jacobson-literature]), Conway–Sloane's (1988) golden-field Icosian lattice $(\mathcal{I}, Q)\subset\mathbb{H}$ ($Q(q)=2(a+b)$) to $E_8$ root-lattice isometry ([@rem-ch32-icosian-e8-literature]), and the eight modern foundational unification programs surveyed in [@rem-ch32-eight-programs-literature], together with the literature foundations across Parts IX–X on Leibniz monadology, Whitehead process philosophy, and RT/ER=EPR/CKW ([@rem-ch33-monad-process-philosophy-literature], [@rem-ch33-rt-reconnection-ckw-literature]), virtual Z, Berry phase, and relativity ([@rem-ch34-virtual-z-berry-relativity-literature]), proper time, zinc sparks, the Weber–Fechner law, and McCarthy Lisp metacircular evaluators ([@rem-ch35-fertilization-zinc-spark-literature], [@rem-ch35-homoiconicity-scott-domain-literature]), the Gudermannian, Poincaré disk, and Escher ([@rem-ch36-poincare-disk-gudermannian-literature]), quantum eraser experiments, predictive processing, and REM sleep ([@rem-ch37-quantum-eraser-literature], [@rem-ch37-predictive-processing-rem-literature]), QRAM, Page–Wootters conditional clocks, and recursive self-mapped page tables ([@rem-ch38-qram-page-wootters-literature], [@rem-ch38-x86-recursive-page-table-literature]), and Scott reflexive domains $D \cong [D \to D]$, Relational Quantum Mechanics, and spinor $720^\circ$ double-cover topology ([@rem-ch39-von-neumann-scott-reflexive-domain-literature], [@rem-ch39-kant-yoneda-lemma-literature], [@rem-ch39-cartan-penrose-hestenes-fierz-literature]).
3. **Unresolved open conjectures (red `OPEN` badge, zero `lean` attributes)**:
   - The standard uniform Turing-machine complexity conjecture $\mathrm{P} \neq \mathrm{NP}$ ([@conj-p-neq-np]), the Clay Millennium unforced 3D incompressible Navier–Stokes global regularity conjecture (Statements A / B, [@conj-coda-navier-stokes-regularity]), Schanuel's conjecture and its application to the Dottie fixed point $\theta^*$ ([@conj-schanuel-dottie], together with Timothy Chow's conditional literature theorem that under Schanuel's conjecture $\theta^*$ lies outside the elementary closed field $\mathrm{EL}$ generated by $\pi$ and $e$), and the open problems cataloged in Appendix C, Section C.3.
4. **Philosophical and geometric models (`MODEL`, never claimed as formal theorems)**:
   - The philosophical juxtaposition of Hume's causal skepticism with Spinoza's geometric necessity (*Ethics*, Part I, Prop. 17 Scholium), the opposite-chirality bivector cancellation model $+\mathbf{\Omega} - \mathbf{\Omega} = 0$ for stationary-phase selection, the continuous differential-geometric analogy between "$P$ as a curl-free guiding field ($\nabla \wedge \mathbf{F} = 0$)" and "$NP$ as a zero-width 1D witness thread threading Hairy-Ball curl vortices ($\nabla \wedge \mathbf{F} \neq 0$)", the field analogy between 3D Navier–Stokes vortex tubes and $P$ vs. $NP$ (without a mathematical isomorphism), the fivefold quantum-fairness and ergodic statistical-holism synthesis ([@rem-ch31-fivefold-fairness-table]), the orthogonal self-referential unified-field six-domain dictionary and eight-program 3D meta-unification compass ([@rem-ch32-six-domain-isomorphism-table], [@rem-ch32-meta-unification-table]), the Part IX–X syntheses of "all beings as observers and mutual-attractor double helices, single- versus double-orthogonality inversion of observer position, arriving on a pulse of light and homoiconic table expansion $T = T(T)$, quotienting out reincarnation along the hyperbolic staircase, dream quantum erasure and nonlocal observer branches, cosmic ontological QRAM and observer memory pointers, and the non-dual identity between observer and universe" (Chapters 33–39), the conceptual mapping of "historical ruins as zero-phason-strain spatial attractors ($\|\pi_\perp(z)-u\|\to 0$), the soul as the invariant internal orthogonal phase anchor $u \in E_\perp^3$, forgetting initialization as Zeckendorf high-bit truncation, and Déjà vu as cross-round inner-product resonance $\cos\delta\theta \to 1$ across fractal sheets and Cassini's $(-1)^{k+1}$ seam," the reconciliation of determinism and teleology in timeless self-reference, the symbolic shorthand $\psi = \psi(\psi)$, and the epistemological ladder "point $\to$ line $\to$ plane $\to$ sphere $\to$ sphere outside the sphere" serve as an interpretive synthesis connecting the verified anchors above; throughout this book, prose explains intuition while the Lean kernel alone decides formal truth.
   - **Cross-Chapter and Appendix Anchors for Open-Dimension Foundation Reconstruction and the Six-Puzzle Duel**: The formal theorem cluster and interactive stage for static–dynamic non-duality, pairwise fairness forcing quadratic squaring, single-basis phase folding rebounding as uncertainty, and time as orthogonal rank expansion beyond finite Krylov saturation appear in [Chapter 31 §31.4](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion); pre-decoherence dream déjà vu and Pisot–Clifford–Rauzy fractal convergence appear in [Chapter 37 §37.5](ch37-dreams-quantum-eraser-and-nonlocal-observer.md#sec-ch37-dream-pre-decoherence-deja-vu) and [Chapter 39 §39.5](ch39-observer-is-ontological-universe.md#sec-ch39-pisot-clifford-rauzy); and the full dossier confronting the **six classical open foundational puzzles of quantum mechanics** since Solvay 1927 and **five mainstream interpretive schools** on the unified `ORTHO//DUEL` stage against this book's orthogonal self-referential open-dimension view—complete with its twenty-anchor `LEAN ✓` catalog and open-frontier problem ([@prob-appendix-d-time-horizon], `OPEN`)—is dedicated to [Appendix D](appendix-d.md#sec-appendix-d-six-foundational-puzzles).
:::

---

## 40.5 Bilingual Glossary of Core Geometric and Formal Concepts {#sec-coda-bilingual-glossary}

::: {.remark #rem-coda-bilingual-glossary-box title="Bilingual Glossary of Core Geometric, Literature, and Formal Concepts (Including literature result, not formalized in this book)"}
**Literature result, not formalized in this book (for entries marked as classical topological or transcendence literature; entries tagged `LEAN ✓` are kernel-verified in Lean 4, and entries tagged `OPEN` are unresolved open conjectures).** To help readers move seamlessly between conventional physics literature, geometric intuition, and Lean 4 source code, the table below summarizes the core concepts used across all ten parts of the book:

| English Term | Chinese Term (中文概念) | Core Geometric Intuition & Algebraic Definition | Representative Lean 4 Module / Epistemic Status |
| :--- | :--- | :--- | :--- |
| **Point / Line / Plane / Sphere** | 点 / 线 / 面 / 球 | $0$D isolated reading $\to$ $1$D inner-product projection segment $\to$ $2$D exterior bivector area $\to$ $3$D spinor manifold & phase-space closure | Prelude through Part X; Clifford grades $0, 1, 2, 3$ (`Cl3`) |
| **Measure (`liáng`) / Quantity (`liàng`)** | 量（liáng / liàng） | Verb `liáng` is the pairwise comparison operator; noun `liàng` is the scalar reading left after orthogonal history is discarded | Chapters 1–2; [`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton) (`LEAN ✓`) |
| **Count (`shǔ`) / Number (`shù`)** | 数（shǔ / shù） | Verb `shǔ` is the operator of orthogonal squaring, cyclotomic halving, and self-referential iteration; noun `shù` is the static coordinate mark on the 4-tier number hierarchy | Chapter 29; [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) (`LEAN ✓`) |
| **Pairwise Measurement & Inner-Product Overlap** | 成对测量与内积重叠 | Amplitude overlap $\langle u, v\rangle$ and Born trace pairing $\operatorname{Tr}(\rho P)$ measuring collinearity between two directions | Chapters 1–3; [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) (`LEAN ✓`) |
| **Bivector Area & Exterior Product** | 双向量面积与外积 | Antisymmetric wedge product $\mathbf{u}\wedge\mathbf{v} = -\mathbf{v}\wedge\mathbf{u}$ encoding rotation plane, normal axis, and right-hand chirality | Chapters 5–6; [`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) (`LEAN ✓`: balanced mixed product and Gram identity; wedge antisymmetry: `Literature`) |
| **Rotor & Double-Sided Sandwich** | 旋量（Rotor）与双面夹心 | Even-subalgebra element $R = \cos(\theta/2) - \hat{B}\sin(\theta/2)$ acting by $v \mapsto R v \widetilde{R}$ for singularity-free 3D rotations | Chapters 7, 12, 27; [`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group) (`LEAN ✓`) |
| **Hodge Dual & Pseudoscalar** | 霍奇对偶与伪标量 | Oriented 3D volume element $I_3 = e_1 e_2 e_3$ ($I_3^2 = -1$) mapping 2D rotation planes to normal axial vectors | Chapters 5, 25 & Appendix B; [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square) (`LEAN ✓`) |
| **Hairy Ball Vortex & Euler Characteristic $\chi$** | 毛球定理旋涡与欧拉示性数 $\chi$ | $\chi(S^{2n}) = 2$ forces a zero in every continuous tangent field on $S^{2n}$; odd spheres have $\chi(S^{2n-1}) = 0$ and $S^0, S^1, S^3, S^7$ are parallelizable | Chapters 12, 21, 24, 29 & Coda; literature result in [@rem-hairy-ball-adams-literature], [@rem-coda-polyhedral-topology-literature] |
| **Angular Defect $4\pi$** | 笛卡尔角亏 $4\pi$ | Vertex angle defects on any convex polyhedron sum to $4\pi = 2\pi\chi(S^2)$ ($12 \times 60^\circ = 720^\circ$ on the icosahedron) | Chapters 19, 24 & Coda; literature result in [@rem-coda-polyhedral-topology-literature] |
| **Cut-and-Project Golden Observer & Cassini $\pm 1$ Seam** | 黄金切投准晶观察者与卡西尼 $\pm 1$ 接缝 | Higher-dimensional mother lattice projected along golden slope $\varphi$ and internal phase $u \in E_\perp$, with $F_n F_{n+2} - F_{n+1}^2 = (-1)^{n+1}$ and bounded-gap torus returns | Coda; [`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec), [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm), [`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result) (`LEAN ✓`) |
| **Diagonal Escape** | 对角线逃逸 | Complete semantic diagonal forcing nonempty separation deficit, strict topology refinement, and discontinuity | Chapters 21, 30; [`complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement) (`LEAN ✓`) |
| **Euler Product & Critical Line** | 欧拉乘积与临界线 | Prime orthogonal basis expansion $\prod_p (1-p^{-s})^{-1} = \sum_n n^{-s}$ and nontrivial-zero symmetry axis $\operatorname{Re}(s) = 1/2$ | Chapter 22; [`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product) (`LEAN ✓`) / `#conj-riemann-hypothesis` (`OPEN`) |
| **Diophantine Definability & Norm Form** | 丢番图可定义性与范数型 | Eisenstein quadratic norm form $a^2 - ab + b^2$, golden Pell identity, and quaternion norm multiplicativity | Chapters 23, 29; [`Qform_range_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm), [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm) (`LEAN ✓`) |
| **Contraction & Fixed Point** | 收缩映射与自指不动点 | Finite monotone contraction stabilization (`LEAN ✓`), golden ratio $\varphi$ (`LEAN ✓`), and continuous Dottie root $\cos\theta^* = \theta^*$ ([@thm-dottie-rational-inverse-endpoint]; dynamics application in [@ex-ch33-mutual-cosine-monotonic-lock]) | Chapter 24 & Coda; [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) (`LEAN ✓`) |
| **Clifford Blade** | 克利福德基片（Blade） | 8D basis $\{1, e_1, e_2, e_3, e_{12}, e_{13}, e_{23}, e_{123}\}$ indexed by 3-bit masks $m \in \operatorname{Fin} 8$ under XOR multiplication and inversion sign | Chapter 25 & Appendix B; [`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star), [`B_formula_core`](lean:D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core) (`LEAN ✓`: Weyl star algebra and Bloch expansion; blade multiplication: `Literature`, reference computation) |
| **Pauli Word & Symplectic Phase Table** | 泡利词与辛内积相表 | 2-bit encoding $(x, z) \in \mathbb{F}_2^2$ reducing Pauli group multiplication to bitwise XOR plus symplectic phase $(-1)^{x_2 z_1}$ | Chapters 14, 26 & Appendix B; [`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul) (`LEAN ✓`) |
| **ZYZ Euler Compiler** | ZYZ 欧拉角编译器 | Decomposition of any single-qubit rotation into $R_z(\alpha)R_y(\beta)R_z(\gamma)$ with two-axis finite words and virtual-$Z$ frame tracking | Chapters 9, 11, 16, 27; [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word) (`LEAN ✓`: two-axis finite rotation words; ZYZ decomposition and compilation: `Literature`, reference computation) |
| **Quantum Fairness & Entanglement Monogamy** | 量子公平与纠缠单配性 | Born pairing reciprocity, complementary purity Pythagoras, no-cloning, Bell mixed marginals, Landauer's bound, and closed-subgroup torus equidistribution and bounded-gap returns (`LEAN ✓`), paired with the CKW monogamy inequality $\tau_{A|B}+\tau_{A|C}\le\tau_{A|BC}$ (`Literature`, [@rem-ch31-ckw-monogamy-literature]) and fivefold fairness synthesis (`MODEL`) | Chapter 31; [`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion), [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result) (`LEAN ✓` / `Literature` / `MODEL`) |
| **Icosian–$E_8$ Golden Bridge & Meta-Unification** | 艾柯西安 $E_8$ 黄金桥与元统一 | Complex-structure squaring, finite contraction, golden and Zeckendorf self-reference, null-cone rigidity, anchored loop holonomy, and bridge-graph min-cut (`LEAN ✓`), paired with the Conway–Sloane Icosian-to-$E_8$ lattice isomorphism (`Literature`, [@rem-ch32-icosian-e8-literature]) and the unified-field and eight-program meta-unification compass (`MODEL`) | Chapter 32; [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null) (`LEAN ✓` / `Literature` / `MODEL`) |
| **Universal Observers, Orthogonality Blind Spots & Homoiconic Table $T=T(T)$** | 万物观察者、正交简并与自指扩表 $T=T(T)$ | Context-parameter fixed points, invariant common factors, readout equivalence kernels, a common unit normal and trace pullback, copied-address recovery, Lawvere's relative diagonal, exponential tail bounds and the Cayley boundary, and quotient-annihilator factorization (`LEAN ✓`), paired with monadology/process-philosophy/virtual-Z/Berry-phase/proper-time/Lisp/Gudermannian/Poincaré-disk literature and the mutual-illumination model (`MODEL`) | Chapters 33–36; [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode) (`LEAN ✓` / `Literature` / `MODEL`) |
| **Dream Erasure, Ontological QRAM Pointers & Observer-as-Universe** | 梦境擦除、本体 QRAM 指针与观察者即宇宙本体 | Selected-entry phase-record reversal under unimodular overlaps, golden cut-and-project Delone quasicrystals, copied-address recovery, two-phase-copy reversal certificate, concept fiber decomposition, and injective Zeckendorf real threads (`LEAN ✓`), paired with quantum-eraser/predictive-processing-and-REM/QRAM-and-recursive-page-table/Scott reflexive-domain $D\cong[D\to D]$ literature and the non-dual ontology model (`MODEL`) | Chapters 37–39; [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition) (`LEAN ✓` / `Literature` / `MODEL`) |
| **`LEAN ✓` / `OPEN` Epistemic Badges** | `LEAN ✓` / `OPEN` 语义徽章 | Green `LEAN ✓` is reserved strictly for frozen `kind="theorem"` declarations in `trureturing.lock.json`; red `OPEN` marks unproved conjectures without `lean` attributes | Whole book & Appendix C; mechanically enforced by `./tbook check` |
:::

---

## 40.6 Ten-Part, Thirty-Nine-Chapter Reading and Dependency Map {#sec-coda-reading-map}

This monograph consists of the **[Prelude](README.md)**, **Ten Parts (39 Chapters)**, **this Coda**, and **[Appendix A](appendix-a.md)–[Appendix D](appendix-d.md)**. The diagram below maps the conceptual progression and formal module dependencies across the entire work:

```
                        ┌──────────────────────────────────────────┐
                        │  Prelude: Unpacking "Measure" (README.md)│
                        │  Verb liáng (operator) → Noun liàng (val)│
                        └────────────────────┬─────────────────────┘
                                             │
            ┌────────────────────────────────┼────────────────────────────────┐
            ▼                                ▼                                ▼
┌───────────────────────┐        ┌───────────────────────┐        ┌───────────────────────┐
│ Part I: Point & Line  │───────▶│ Part II: Plane &      │───────▶│ Part III: Sphere &    │
│ (Ch 1–4)              │        │ Chirality (Ch 5–8)    │        │ Addressing (Ch 9–12)  │
│ • Inner-product & Born│        │ • Bivector wedge u∧v  │        │ • 3-axis addressing   │
│ • Pythagorean split   │        │ • Pauli & chirality   │        │ • Gram & Berry phase  │
│ • Density & pinching  │        │ • Two-qubit wedge     │        │ • Pulse area & SU(2)  │
└───────────┬───────────┘        └───────────┬───────────┘        └───────────┬───────────┘
            │                                │                                │
            └────────────────────────────────┼────────────────────────────────┘
                                             ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │        Part IV: Many-Body Geometry, Bell Bounds & Algorithms    │
            │        (Ch 13–16)                                               │
            │  • CHSH octahedron (≤2) vs Tsirelson circle (2√2)               │
            │  • Stabilizer symplectic geometry • Grover / QFT / QSVT planes  │
            │  • ZYZ Euler compilation & Solovay–Kitaev commutator helix      │
            └────────────────────────────────┬────────────────────────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
┌─────────────────────────────────────────┐   ┌─────────────────────────────────────────┐
│ Part V: Relativistic Spacetime,         │   │ Part VI: Sphere Outside the Sphere—     │
│ Holography & Complexity (Ch 17–20)      │   │ Diagonal, Primes & Self-Ref (Ch 21–24)  │
│ • Lorentz hyperbolic rotors & lightcone │   │ • Cantor–Lawvere diagonal escape        │
│ • Dirac chiral spinors & tree gauge     │   │ • Finite-box Euler product & Mangoldt   │
│ • Bridge-graph QMaxFlow=QMinCut facets  │   │ • Lipschitz quaternion norm & Pell form │
│ • Circuit min-depth, CNOT parity & OPEN │   │ • Contracting fixpoints, Dottie & ctx   │
└──────────────────────┬──────────────────┘   └────────────────────┬────────────────────┘
                       └─────────────────────┬─────────────────────┘
                                             ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │        Part VII: Minimal Quantum Geometric Algebra Engine       │
            │        (Ch 25–28)                                               │
            │  • Cl(3,0) 8D blade XOR–inversion engine • 2-bit Pauli table    │
            │  • ZYZ rotor compiler & cascade laws • Finite-record conditioning│
            └────────────────────────────────┬────────────────────────────────┘
                                             ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │        Part VIII: Causality, ETH, Fairness & Meta (Ch 29–32)    │
            │  • Golden Pell identity, mod-4 primes & timeless Gram elliptope │
            │  • Fields vs Lines, advection non-closure, fairness & 8 programs│
            └────────────────────────────────┬────────────────────────────────┘
                                             ▼
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
┌─────────────────────────────────────────┐   ┌─────────────────────────────────────────┐
│ Part IX: Universal Observers, Table     │   │ Part X: Dream Erasure, Ontological QRAM │
│ Expansion & Beyond Samsara (Ch 33–36)   │   │ & Observer-as-Universe (Ch 37–39)       │
│ • Context fixpoints & mutual attractors │   │ • Joint coherent record erasure & Delone│
│ • Single/double orthogonality & 3-axis  │   │ • QRAM copied-address & self page table │
│ • Light-pulse pinching & T=T(T) loop    │   │ • Fiber decomposition & 720° spinor fold│
│ • Hyperbolic steps & quotienting loops  │   │ • Coda & Appendices: A · B · 585 C · D  │
└─────────────────────────────────────────┘   └─────────────────────────────────────────┘
```

::: {.figure src="coda-dependency-tree"}
**Which chapter rests on which.** The dots, top to bottom, are the chapters of the book, banded on the left by part. The arc arrow into each chapter comes from the earlier chapter it refers back to most often in its own text (a chapter link or a "Chapter N" mention); the more mentions, the thicker the arrow. A hollow dot is a chapter that never refers back to an earlier one. The arrows are counted from the chapters by a script, so each one is a cross-chapter reference that the text contains.
:::

The dependency map draws only the chapter each chapter refers back to most often; the core picture, main theorems and open problems of each of the ten parts are gathered in the overview deck below.

::: {.slides src="overview"}
A 48-slide overview of the whole book: the four blind spots and the dimensional ladder; each of the ten parts' core picture, main theorems, literature results and open problems; the counts of the three tiers of warrant and the dependency map.
:::

### 40.6.1 Four Recommended Reading Tracks {#sec-coda-reading-tracks}

Readers can navigate the book along four self-contained tracks tailored to their background:

1. **Physics and Geometric Intuition Track (No Prerequisites)**:
   [Prelude](README.md) $\to$ [Chapter 1](ch01-measurement.md)–[Chapter 4](ch04-decoherence.md) (Part I: from ruler comparison to decoherence) $\to$ Chapters 5–12 (Parts II–III: from bivector area to the Bloch sphere) $\to$ Chapters 17–19 (Part V: lightcones and holographic min-cuts) $\to$ [Chapter 31](ch31-quantum-fairness.md)–[Chapter 36](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) (quantum fairness, meta-unification, universal observers, orthogonality blind spots, homoiconic table expansion, and transcending reincarnation) $\to$ [Chapter 37](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)–[Chapter 39](ch39-observer-is-ontological-universe.md) (dream quantum erasure, ontological QRAM, and observer-as-universe) $\to$ Coda and [Appendix A](appendix-a.md).
2. **Quantum Computing and Algorithm Compilation Track**:
   [Chapter 2](ch02-born-rule.md) $\to$ Chapters 6–8 (Pauli algebra, quantum gates, and entanglement) $\to$ Chapter 11 (microwave pulse areas and virtual-$Z$ gates) $\to$ Chapters 13–16 (CHSH game, stabilizers, Grover/QFT/QSVT, ZYZ and Solovay–Kitaev compilation) $\to$ Chapter 20 (circuit min-depth and CNOT parity bounds) $\to$ Chapters 25–27 $\to$ [Chapter 34](ch34-orthogonality-degeneracy-and-observer-position.md), [Chapter 37](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)–[Chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md) (a common unit normal and trace pullback, conditional phase-record reversal, and ontological QRAM pointer addressing) and [Appendix B](appendix-b.md).
3. **Mathematical Logic, Number Theory, and Epistemology Track**:
   [Prelude](README.md) $\to$ Chapter 10 (Gram matrices and order independence) $\to$ Chapters 19–20 (discrete polyhedral facet cones and open-conjecture boundaries) $\to$ Chapters 21–24 (diagonal escape, Euler products, quaternion Diophantine norms, and cosine self-reference) $\to$ [Chapter 29](ch29-timeless-causality-and-gram-space.md)–[Chapter 39](ch39-observer-is-ontological-universe.md) (the four-tier Pythagorean escape of number, timeless causality, the ETH horizon, fluid vortex filaments, quantum fairness, meta-unification, context fixed points, Lawvere homoiconic table expansion $T = T(T)$, quotienting out reincarnation, concept fiber decomposition, and Zeckendorf real threads) $\to$ Coda (golden cut-and-project spatial attractors and [@thm-coda-fixed-point-anchor]).
4. **Lean 4 Formal Verification and Kernel Audit Track**:
   [Prelude](README.md) §Epistemic Contract $\to$ Chapters 25–28 (Part VII: the `Cl3`, `PauliSymplectic`, and `ZYZ` reference engines, their frozen foundations, and `FiniteRecordCosineObstruction`) $\to$ [Appendix B](appendix-b.md) $\to$ [Appendix C](appendix-c.md) (auditing all $313$ environment-cited frozen theorems, $114$ auxiliary definitions, and $163$ inline declarations — $590$ unique locked declarations in total — at `trureturing@dev` commit [{commit}](trureturing:)).

### 40.6.2 Quick Register of the 60 Core Chapter Theorem Anchors in Parts VI–X (Chapters 21–39) {#sec-coda-part6-part7-register}

As a bridge between the closing five parts of the monograph and the complete ledger in [Appendix C](appendix-c.md), the table below lists $60$ core chapter theorem anchors ($4$ representative theorems per chapter across Chapters 21–28, $2$ in Chapter 29, $3$ in Chapter 30, $5$ in Chapter 32, $4$ in Chapter 34, and $2$ per chapter across Chapters 31, 33, and 35–39, spanning $59$ distinct GIDs with `pell_form_eq_four_mul_norm` linking Chapters 23 and 29):

| Chapter | Theorem ID | Frozen Declaration GID (`trureturing@dev`) | Core Mathematical Statement & Geometric Role |
| :--- | :---: | :--- | :--- |
| **Chapter 21** — Diagonal Escape & Unreachable Boundaries | T21.1 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_not_continuous` | Discontinuity of the complete semantic diagonal under the initial observation topology |
| **Chapter 21** | T21.2 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty` | Nonemptiness of the separation deficit left by any fixed observation family |
| **Chapter 21** | T21.3 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement` | Strict topology refinement induced by adjoining the diagonal observation operator |
| **Chapter 21** | T21.4 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement` | Complete diagonal topological escape settlement: discontinuity, nonempty deficit, and strict refinement |
| **Chapter 22** — Prime Orthogonal Basis & Euler Product | T22.1 | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_dirichlet_sum` | Dirichlet series representation $\sum_{n=1}^\infty n^{-s}$ of $\zeta(s)$ on the half-plane $\operatorname{Re}(s) > 1$ |
| **Chapter 22** | T22.2 | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_euler_product` | Prime Euler product representation $\prod_p (1 - p^{-s})^{-1}$ of $\zeta(s)$ on $\operatorname{Re}(s) > 1$ |
| **Chapter 22** | T22.3 | `D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product` | Exact equality between the Dirichlet sum and the prime Euler product on $\operatorname{Re}(s) > 1$ |
| **Chapter 22** | T22.4 | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_residue_one` | Unit residue of $\zeta(s)$ at the boundary simple pole $s = 1$: $\lim_{s \to 1}(s-1)\zeta(s) = 1$ |
| **Chapter 23** — Quaternion Norms & Diophantine Locks | T23.1 | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm` | Unimodular shear reduction of the crossing form to the Eisenstein norm: $\operatorname{Qform}(t, P, Q) = \operatorname{eisNorm}(P - (t + 1)Q, Q)$ |
| **Chapter 23** | T23.2 | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_discriminant` | Constant discriminant invariant $\Delta(Q_t) = -3$ across the parameterized norm-form family |
| **Chapter 23** | T23.3 | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm` | Range invariance of the shifted quadratic form family $Q_t(x,y)$ with the Eisenstein norm |
| **Chapter 23** | T23.4 | `D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm` | Golden-integer Pell identity in $\mathbb{Z}[\varphi]$: $(2a+b)^2 - 5b^2 = 4\operatorname{norm}(g)$ |
| **Chapter 24** — Cosine Fixed Point & Self-Reference | T24.1 | `D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize` | Finite-step stabilization and transition bound for monotone contracting updates on a finite carrier |
| **Chapter 24** | T24.2 | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point` | Conceptual equivalence plus interpretive stability yields a relative interpretation fixed point |
| **Chapter 24** | T24.3 | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points` | Identical text and rules bifurcate into distinct binary fixed meanings under shifted context parameters |
| **Chapter 24** | T24.4 | `D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique` | Uniqueness of the golden-ratio fixed point $\varphi = (1+\sqrt{5})/2$ for $x \mapsto 1 + 1/x$ on $(0, \infty)$ |
| **Chapter 25** — XOR–Pauli Geometric Algebra Engine | T25.1 | `D5/S3/Quantum/FiniteDimensional.qubit_weyl_star` | Single-qubit Weyl operators $X, Z$: anticommutation, self-adjointness, and involution laws |
| **Chapter 25** | T25.2 | `D5/S3/Quantum/FiniteDimensional.qubit_matrix_algebra_has_no_character` | Absence of global $\mathbb{C}$-algebra homomorphisms on $M_2(\mathbb{C})$ preserving all matrix products |
| **Chapter 25** | T25.3 | `D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector` | Non-commuting Pauli observables $X$ and $Z$ share no common nonzero eigenvector |
| **Chapter 25** | T25.4 | `D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core` | Core single-qubit Pauli expectation expansion reconstructing operators via 3D Bloch inner products |
| **Chapter 26** — Pauli Symplectic Table & Bloch Geometry | T26.1 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.blochMatrix_trace` | Unit-trace normalization $\operatorname{Tr}(\rho(\mathbf{r})) = 1$ of the Bloch-parameterized state matrix |
| **Chapter 26** | T26.2 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_blochMatrix` | Exact round-trip inversion between Bloch vector coordinates and Hermitian matrix reconstruction |
| **Chapter 26** | T26.3 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian` | Three-dimensional real Bloch geometric decomposition of Hermitian qubit operators |
| **Chapter 26** | T26.4 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef` | Euclidean Bloch sphere bound $\|\mathbf{r}\| \le \operatorname{Tr}(\rho)$ for positive semidefinite qubit states |
| **Chapter 27** — ZYZ Compiler & Pythagorean Norm Laws | T27.1 | `D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law` | Inner-product parallelogram norm identity and orthogonal Pythagorean decomposition law |
| **Chapter 27** | T27.2 | `D5/S3/Quantum/FiniteDimensional.born_probability_skeleton` | Finite-dimensional Born probability orthogonal projection skeleton and completeness law |
| **Chapter 27** | T27.3 | `D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests` | Unitary global-phase rigidity from connected pairwise ray-overlap tests |
| **Chapter 27** | T27.4 | `D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent` | Exact idempotence $\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho)$ of finite-record pinching projections |
| **Chapter 28** — Record Conditioning & Verification Closure | T28.1 | `D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction` | Rank-one projector and pure-state record-weight reduction to squared inner-product norm: $\operatorname{recordWeight}(P, \rho, k) = \norm{\operatorname{star}\phi \bullet_{v} \psi}^2$ |
| **Chapter 28** | T28.2 | `D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight` | Exact identity equating conditioned record weight with Born trace pairing in rank-one channels |
| **Chapter 28** | T28.3 | `D5/S3/Observer/Conditioning.conditionalState_isState` | Preservation of valid quantum state positivity and unit trace under Lüders record conditioning |
| **Chapter 28** | T28.4 | `D5/S3/Observer/Conditioning.unreadState_fixed_iff` | Fixed-point characterization of unread measurement states via vanishing transverse channel coherence |
| **Chapter 29** — Timeless Causality & Gram Space | T29.1 | `D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm` | Golden-integer Pell norm identity linking the arithmetic $\pm 1$ seam to the four-tier escape of number |
| **Chapter 29** | T29.2 | `D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization` | Unit-vector Gram overlap equivalence characterization anchoring timeless pairwise inner-product rigidity |
| **Chapter 30** — Fields, Lines, ETH & Vortex Filaments | T30.1 | `D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff` | Necessary and sufficient criterion for exact idempotent projection closure of a quadratic vector field |
| **Chapter 30** | T30.2 | `D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure` | Impossibility of exact projection closure for 5-mode Leray-projected advection at every viscosity $\nu \in \mathbb{R}$ |
| **Chapter 30** | T30.3 | `D5/S3/Combinatorics/Graph/Walks/GallaiRoy.colorable_iff_exists_orientation` | Gallai–Hasse–Roy–Vitaver: a finite simple graph is $k$-colorable iff some orientation has no directed path with more than $k$ vertices |
| **Chapter 31** — Quantum Fairness & Ergodic Holism | T31.1 | `D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion` | Any inner-product-preserving cloner of two normalized states forces them to coincide or be orthogonal |
| **Chapter 31** | T31.2 | `D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result` | Continuous complex-valued observable orbit averages on the closed subgroup $G = \overline{\langle g\rangle}$ of a compact torus converge to the Haar integral |
| **Chapter 32** — Unified Field & Meta-Unification | T32.1 | `D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes` | The binary Zeckendorf finite automaton accepts a binary word iff `NoAdjacentOnes` holds |
| **Chapter 32** | T32.2 | `D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null` | Every real quadratic form vanishing on all Minkowski null-cone vectors is a scalar multiple of `minkowski d` |
| **Chapter 32** | T32.3 | `D5/S0/Computability/BinaryNameComparison.name_compare_run` | Bitwise binary-name comparison machine halts within the explicit step bound $2(|a|+|b|)+4$ with equality bit and restored stacks |
| **Chapter 32** | T32.4 | `D5/S0/Computability/BinaryNameDictionary.dictionary_lookup_run` | Sequential dictionary lookup machine halts within an explicit linear paid-step bound with membership bit, unary index, and restored stream |
| **Chapter 32** | T32.5 | `D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual` | Future expectation words of two states coincide iff their state difference is orthogonal to every effect word |
| **Chapter 33** — Universal Observers & Mutual Attractors | T33.1 | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor` | Necessary and sufficient condition for context-invariant objective claims via an invariant common factor |
| **Chapter 33** | T33.2 | `D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result` | Bounded-gap and positive-density observation-window returns on compact tori anchoring mutual attractors |
| **Chapter 34** — Orthogonality Blind Spots & Position Inversion | T34.1 | `D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel` | Partition topological inseparability iff membership in the induced observation quotient kernel |
| **Chapter 34** | T34.2 | `D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair` | For any $a,b\in\mathbb{R}^3$, there is a unit vector perpendicular to both |
| **Chapter 34** | T34.3 | `D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness` | Tetrahedral defect sum, best-reference-vertex bound, and exactness iff edge-potential repairability |
| **Chapter 34** | T34.4 | `D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance` | Any pair invariant preserved by local rotations around two non-collinear moving axes is invariant under all of $\mathrm{SO}(3)$ |
| **Chapter 35** — Light Pulse & Self-Referential Table | T35.1 | `D5/S3/ConceptDynamics/Restoration/TargetRecoveryCriterion.target_recovery_criterion` | Exact recovery of a target readout from observation traces iff it factors through the induced kernel |
| **Chapter 35** | T35.2 | `D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode` | Lawvere's relative semantic diagonal escapes every fixed indexed table, driving homoiconic expansion $T = T(T)$ |
| **Chapter 36** — Hyperbolic Staircase & Quotienting Reincarnation | T36.1 | `D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le` | In a complete real or complex normed algebra with unit of norm $1$, $0\le r$ and $\|z\|\le r$ give an exponential tail bound $r^n e^r/n!$ after $n$ terms |
| **Chapter 36** | T36.2 | `D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition` | Target readout factors through the observation quotient kernel iff continuous under the partition topology |
| **Chapter 37** — Dream Quantum Eraser & Nonlocal Observer | T37.1 | `D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal` | If every record overlap for the chosen matrix entry has modulus $1$, composing with amplitude-conjugated records restores that entry |
| **Chapter 37** | T37.2 | `D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone` | The full-window golden cut-and-project model set forms a Delone set with packing radius $1/2$ and covering radius $3$ |
| **Chapter 38** — Ontological QRAM & Memory Pointer | T38.1 | `D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior` | The canonical copied-address record equals the predecessor module’s record pointwise; this is not a probability-prior statement |
| **Chapter 38** | T38.2 | `D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate` | Two phase-record copies: reversing one fails to restore the chosen entry, while reversing both restores it |
| **Chapter 39** — Observer Is the Ontological Universe | T39.1 | `D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition` | Disjoint-union decomposition of a concept space into observable-signature fibers |
| **Chapter 39** | T39.2 | `D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective` | Strict injectivity of the multi-scale Zeckendorf coding thread on nonnegative real numbers |

Outside all spheres lies not emptiness, but **the unending act of measurement and counting itself**. Turn next to [Appendix A](appendix-a.md) for the complete dictionary translating conventional quantum mechanics into geometric language, [Appendix B](appendix-b.md) for the Clifford algebra and rotor cheat sheet, [Appendix C](appendix-c.md) for the complete index of all $427$ environment-cited `trureturing@dev` declarations ($590$ unique locked declarations including inline references), and [Appendix D](appendix-d.md) for the geometric duel across the six classical open puzzles and five major interpretations of quantum mechanics.
