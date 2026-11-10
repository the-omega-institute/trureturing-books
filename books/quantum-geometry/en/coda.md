# Coda: Outside All Spheres

> *"We think we see a point, but it is a line; a line, but a surface; a surface, but a sphere; and when we think we see the sphere, a larger sphere encloses it."*

From the moment the Prelude opened the first door, we have climbed a ladder of ascending geometric dimensions: resolving an isolated **point** into a **line** of pairwise comparison (the inner-product projection $\mathbf{u}\cdot\mathbf{v}$), unfolding a static **line** into an oriented chiral **plane** (the exterior bivector area $\mathbf{u}\wedge\mathbf{v}$), and closing local **planes** into a phase-wrapping **sphere** (the Bloch sphere $S^2$ and its spinor double cover $S^3$). Yet as we look back across the seven-part edifice—after traversing Lorentz lightcones, tensor-network minimum cuts, prime Euler products, quaternion norm locks, and the self-referential cosine fixed point—a deeper geometric truth emerges: **inside any fixed formal system, every "sphere" we think we have completely closed is only a convex polyhedral approximation stitched from finitely many facets; and at every seam and every fixed point, an indestructible remainder points toward the larger sphere that encloses it.**

---

## Polyhedral Approximation and the Inescapable Geometric Remainder {#sec-coda-polyhedral-remainder}

Why can neither human mathematicians nor digital computers ever construct a completely seamless sphere entirely inside a fixed finite axiom system, a finite universal gate set, a finite prime cutoff, or a finite-degree Taylor expansion? Across all seven parts of this book, we have repeatedly encountered the same structural obstruction—**the topological and arithmetic remainder between a faceted polyhedral approximation and smooth spherical curvature**:

1. **Descartes's Angular Defect Theorem and the $12 \times 60^\circ = 720^\circ = 4\pi$ Discrete Curvature Invariant**:
   When we approximate the 2-sphere $S^2$ with equilateral triangle facets, the most symmetric Platonic solid is the regular icosahedron ($V = 12$ vertices, $E = 30$ edges, $F = 20$ faces). At each vertex, exactly $5$ equilateral triangles meet, summing to an interior angle of $5 \times 60^\circ = 300^\circ < 360^\circ$. Folding the flat net into a closed surface leaves an **angular defect** of $360^\circ - 300^\circ = 60^\circ = \pi/3$ at every vertex, while the global defect across all $12$ vertices is locked at

   $$
   \sum_{v=1}^{12} \delta_v = 12 \times 60^\circ = 720^\circ = 4\pi = 2\pi\,\chi(S^2).
   $$

   No matter how finely we subdivide the polyhedron into a geodesic dome of millions of facets, the total angular defect $4\pi$ never vanishes—it merely disperses from $12$ sharp vertices into myriad microscopic creases. Every polyhedron remains piecewise-flat; that invariant $4\pi$ defect is the geometric signature by which the polyhedron confesses that it is only an approximation to the smooth sphere.

2. **The Hairy Ball Vortex $\chi(S^{2n}) = 2$ vs. Odd-Sphere Escape $\chi(S^{2n-1}) = 0$ and Adams's Parallelizability Theorem**:
   Even if we pass from discrete polyhedra to smooth manifolds, every even-dimensional sphere $S^{2n}$ carries Euler characteristic $\chi(S^{2n}) = 2 \neq 0$. The Poincaré–Brouwer Hairy Ball Theorem dictates that every continuous tangent vector field on $S^{2n}$ (and in particular on the Bloch sphere $S^2$) must vanish at some point, creating an uncombable **topological vortex**; equivalently, no continuous self-map of $S^{2n}$ can simultaneously avoid both a fixed point $f(x) = x$ and an antipodal point $f(x) = -x$.
   The only way to comb out the coordinate singularities and phase vortices of $S^2$ is to ascend to an odd-dimensional sphere: every odd sphere satisfies $\chi(S^{2n-1}) = 0$ and admits the nowhere-vanishing symplectic tangent field $(x_1, x_2, \dots, x_{2n}) \mapsto (-x_2, x_1, \dots, -x_{2n}, x_{2n-1})$. Even more sharply, J. F. Adams's theorem (1960) proves that the only spheres in the entire mathematical universe whose tangent bundles are globally parallelizable are

   $$
   S^0,\quad S^1,\quad S^3,\quad S^7,
   $$

   descending from the four normed division algebras $\mathbb{R}, \mathbb{C}, \mathbb{H}, \mathbb{O}$. This is why a physical single-qubit spinor must inhabit the parallelizable 3-sphere $S^3 \cong \mathrm{SU}(2)$: the uncombable Berry-phase vortex on the 2D Bloch sphere $S^2$ is the shadow cast by the Hopf fibration $S^1 \hookrightarrow S^3 \to S^2$ in four-dimensional real space.

3. **Five Manifestations of the Remainder Across Parts I–VII**:
   Throughout the book, the nonzero seam left when a finite polyhedral process approximates a smooth sphere recurs in five precise mathematical forms:
   - **Taylor Polynomial Truncation Remainder**: In Part VI (Chapter 24), the algebraic polynomial $\sum_{k=0}^{N-1} (-1)^k \theta^{2k}/(2k)!$ is a finite polynomial approximation to the cosine curve, and the Lagrange remainder $|R_{2N}(\theta)| \le |\theta|^{2N}/(2N)!$ measures the irreducible gap between finite algebraic operations and transcendental arc length;
   - **Euler Product Prime-Tail Remainder**: In Chapter 22, the finite orthogonal prime box $\prod_{p \le P} (1 - p^{-s})^{-1}$ differs from $\zeta(s)$ by the infinite prime tail $\sum_{n \in \mathcal{S}_P^c} n^{-s}$, while the oscillatory remainder $\psi(x) - x$ between Chebyshev's prime staircase and the smooth logarithmic scale is governed by the interference spectrum of nontrivial zeros along the critical line $\operatorname{Re}(s) = 1/2$;
   - **Solovay–Kitaev Group-Commutator Helix**: In Part IV (Chapter 16) and Part VII (Chapter 27), words over a finite universal gate set weave a dense polyhedral net across $\mathrm{SU}(2)$, where each residual approximation error can only be cancelled by ascending a nested hierarchy of non-commuting group commutators $ABA^{-1}B^{-1}$ whose leading term is a second-order bivector area;
   - **Holographic Min-Cut Facet Cones and Circuit Depth Ceilings**: In Part V (Chapters 19–20), discrete bridge-graph flow conservation $\operatorname{QMaxFlow}(a,b,c,d) = \operatorname{QMinCut}(a,b,c,d) = \min(3ac, \min(ad, bc))$ and segmented integrable circuit depths $\lfloor N/(\kappa+1)\rfloor + 1$ carve parameter space into piecewise-linear polyhedral cones whose facet seams mark topological phase transitions of entanglement and complexity;
   - **Cantor–Lawvere Diagonal and Self-Referential Escape**: In Chapters 21 and 24, any formal system that attempts to compress its own evaluation space $A \to Y$ surjectively into the carrier $A$ is punctured by the diagonal operator $g(a) = \alpha(f(a)(a))$; when the measurement operator finally takes itself as input ($\psi = \psi(\psi)$), the system leaps from a static coordinate sphere to a dynamic self-referential outer sphere.

---

## Pythagoras, "All Is Number," and the Four-Tier Escape of Number {#sec-coda-pythagoras-all-is-number}

If we compress all twenty-eight chapters of this monograph back into the foundational seed of mathematical civilization, we find that the entire architecture was already latent twenty-five centuries ago in the twin mottoes of the Pythagorean school: **the Pythagorean Theorem ($a^2 + b^2 = c^2$)** and **"All Is Number" ($\pi\alpha\nu\tau\alpha\ \dot{\alpha}\rho\iota\theta\mu\acute{o}\varsigma$ / 万物皆数)**. Viewed through Clifford geometric algebra and a formal proof kernel, these two ancient principles unfold as a three-act geometric drama.

### Act I: The True Face of the Pythagorean Theorem—1D Segments Cannot Add, 2D Areas Conserve {#sec-coda-pythagoras-act1}

Why can two orthogonal legs $\mathbf{a} \perp \mathbf{b}$ of a right triangle never add linearly as one-dimensional lengths ($a + b \neq c$), yet become strictly additive the moment we **square them** ($a^2 + b^2 = c^2$)?

In the Clifford geometric algebra $\mathcal{Cl}_{3,0}(\mathbb{R})$, a single line of algebra reveals the mechanism. Treat the orthogonal legs as vectors satisfying $\mathbf{a}\cdot\mathbf{b} = 0$, so the hypotenuse vector is $\mathbf{c} = \mathbf{a} + \mathbf{b}$. Squaring $\mathbf{c}$ via the geometric product yields

$$
\mathbf{c}^2 = (\mathbf{a} + \mathbf{b})(\mathbf{a} + \mathbf{b}) = \mathbf{a}^2 + \mathbf{b}^2 + (\mathbf{a}\mathbf{b} + \mathbf{b}\mathbf{a}).
$$

Because $\mathbf{a} \perp \mathbf{b}$, the symmetric inner-product part $\mathbf{a}\cdot\mathbf{b} = \frac{1}{2}(\mathbf{a}\mathbf{b} + \mathbf{b}\mathbf{a}) = 0$ vanishes, reducing the cross term to the sum of two exterior bivectors of opposite chirality (oriented area elements):

$$
\mathbf{a}\mathbf{b} + \mathbf{b}\mathbf{a} = \mathbf{a}\wedge\mathbf{b} + \mathbf{b}\wedge\mathbf{a} = \mathbf{a}\wedge\mathbf{b} - \mathbf{a}\wedge\mathbf{b} = 0.
$$

The clockwise and counterclockwise bivector areas cancel identically, leaving only the scalar sum of squares:

$$
c^2 = a^2 + b^2.
$$

In other words, **one-dimensional projected segments are locked to incompatible axes and cannot be added across a $90^\circ$ turn; only when we ascend to two-dimensional squares (areas/norms) do opposite directional chiralities cancel in the antisymmetric exterior product, allowing orthogonal components to merge into a conserved total!**

Normalizing the hypotenuse to unit radius $c = 1$ transforms the Pythagorean theorem $a^2 + b^2 = 1$ into the **mother conservation law** governing every part of this book:

1. **Quantum Mechanics (Parts I–III)**: The particle-like inner-product projection $\cos\theta$ and the wave-like exterior bivector gate area $\sin\theta$ obey $\cos^2\theta + \sin^2\theta = 1$—Born's probability conservation $P(0) + P(1) = 1$ ([`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)) and the inner-product parallelogram/Pythagorean norm laws ([`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) and [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)) are simply the Pythagorean theorem on the unit circle;
2. **Special Relativity (Part V, Chapter 17)**: In Minkowski spacetime, the proper-time rate $d\tau/dt$ and the normalized spatial speed $v/c$ obey $(d\tau/dt)^2 + (v/c)^2 = 1$ (the orthogonal rearrangement of $d\tau^2 = dt^2 - dx^2/c^2$, corresponding to hyperbolic Bogoliubov norm conservation [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation))—a photon experiences zero proper time for the purely geometric reason that its unit Pythagorean hypotenuse is projected entirely onto the spatial axis $v/c = 1$;
3. **Diophantine Number Theory and Spinor Algebra (Part VI, Chapter 23)**: The unit quaternion sphere $S^3$ norm $s^2 + x^2 + y^2 + z^2 = 1$, the Eisenstein quadratic norm form identity ([`Qform_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm)), and the golden-integer Pell norm identity ([`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)) express the higher-dimensional Pythagorean theorem across orthogonal and quadratic lattices.

### Act II: Hippasus's Crack and the Indestructible Pell Remainder $m^2 - 2n^2 = \pm 1$ {#sec-coda-pythagoras-act2}

Yet this very Pythagorean theorem shattered the original static rational sphere of the early Pythagoreans.

Take the simplest isosceles right triangle: $a = 1, b = 1$, sitting along the symmetric $45^\circ = \pi/4$ bisector between two orthogonal axes—the exact angle at which the Bell–CHSH inequality attains Tsirelson's quantum bound $2\sqrt{2}$ in Part IV (Chapter 13). The Pythagorean theorem gives $c^2 = 1^2 + 1^2 = 2$, so $c = \sqrt{2}$.

Under the early Pythagorean dogma that "all is a ratio of whole numbers," there should exist positive integers $m, n$ with $(m/n)^2 = 2$, or $m^2 = 2n^2$. Placed inside the prime orthogonal coordinate lattice of Part VI (Chapter 22), the fundamental theorem of arithmetic renders an immediate verdict: each prime $p$ spans an independent orthogonal axis in $\mathbb{Q}_{>0}^\times \cong \bigoplus_p \mathbb{Z}\,\mathbf{e}_p$; along the $p = 2$ axis, the $2$-adic valuation $v_2(m^2) = 2v_2(m)$ is always **even**, whereas $v_2(2n^2) = 2v_2(n) + 1$ is always **odd**. Because an even integer can never equal an odd integer, $m^2 = 2n^2$ has no nonzero integer solution!

Better still, when we approximate the $45^\circ$ diagonal $\sqrt{2}$ on the discrete integer grid $\mathbb{Z}^2$, the continued-fraction convergents

$$
\frac{m_k}{n_k} = \frac{1}{1},\; \frac{3}{2},\; \frac{7}{5},\; \frac{17}{12},\; \frac{41}{29},\; \frac{99}{70},\; \dots
$$

leave an indestructible unit arithmetic crack governed by **Pell's equation**:

$$
1^2 - 2(1^2) = -1,\quad 3^2 - 2(2^2) = +1,\quad 7^2 - 2(5^2) = -1,\quad 17^2 - 2(12^2) = +1,\quad \dots,\quad m_k^2 - 2n_k^2 = (-1)^k.
$$

Echoing the golden-integer Pell identity $(2a + b)^2 - 5b^2 = 4\operatorname{norm}(g)$ proved in Chapter 23 ([`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)), any attempt to stitch a $90^\circ$ orthogonal area rotation onto a one-dimensional integer grid leaves an irreducible $\pm 1$ seam. What Hippasus uncovered was not the failure of mathematics, but **the first seam of a larger sphere breaking through the static rational sphere**.

::: {.viz src="pythagoras-number-escape" preset="hippasus" height="500"}
**Always one cell off.** The convergents $1/1, 3/2, 7/5, 17/12, \dots$ hug the line $m = \sqrt{2}\,n$ ever more closely; the two bands on the right are the cell counts $m^2$ and $2n^2$, and in the magnifier they are always one cell apart.
:::

### Act III: Reclaiming "All Is Number"—From the Verb `shǔ` to the Four-Tier Escape {#sec-coda-pythagoras-act3}

If rational numbers cannot even hold the hypotenuse $\sqrt{2}$ of a unit square, was Pythagoras wrong to proclaim that "All Is Number"?

Quite the opposite! Just as Chapter 1 revealed that the Chinese character **量** unites the verb **liáng** (the active operation of pairwise measurement) and the noun **liàng** (the truncated scalar reading), the character **数** in "万物皆数" unites two distinct dimensions:

- The 3rd-tone verb **数 (`shǔ`, to count / to compare / to iterate)**: the active operator of recursive counting, pairwise comparison, orthogonal squaring, cyclotomic halving, and self-referential feedback;
- The 4th-tone noun **数 (`shù`, a number / a coordinate mark)**: the static coordinate notch left on a ruler after the operator is truncated at a fixed stage.

When "number" is reduced to a static noun (`shù`), every number system is inevitably punctured by the next geometric operation; when "number" is restored to its generative verb (`shǔ`), each fracture of an old sphere becomes the engine that constructs the next enclosing sphere. From integers to the self-referential fixed point, the history of number is a **Four-Tier Escape of Enclosing Spheres**:

| Sphere Tier | Number Domain & Landmark Constants | Generative Geometric / Algebraic Operator (Verb `shǔ`) | Internal Closure Law (Noun `shù`) | The Crack & Remainder Forcing Escape to the Next Sphere |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1 Sphere** | Integers $\mathbb{Z}$ & Rationals $\mathbb{Q}$<br/>(ratio marks $m/n$) | $0^\circ$ collinear Euclidean algorithm and linear addition/subtraction | Finite commensurable closure on a 1D rational ruler: $n \cdot (m/n) = m$ | $90^\circ$ orthogonal Pythagorean squaring $1^2 + 1^2 = 2$ triggers a $2$-adic parity clash, leaving the indestructible Pell seam $m^2 - 2n^2 = \pm 1$ |
| **Tier 2 Sphere** | Algebraic Irrationals $\overline{\mathbb{Q}}$<br/>(diagonal $\sqrt{2}$, golden ratio $\varphi = \frac{1+\sqrt{5}}{2}$) | Finite-dimensional orthogonal Pythagorean area conservation $a^2 + b^2 = c^2$ and polynomial root extraction | Finite algebraic polyhedral closure: $x^2 - 2 = 0$, $x^2 - x - 1 = 0$ ([`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)) | Liu Hui and Archimedes's infinite $2^k$-gon cyclotomic halving drives circular arc length outside all finite polynomial root loci |
| **Tier 3 Sphere** | Elementary / Period Transcendentals<br/>(circle constant $\pi$, natural base $e$) | Infinite Pythagorean half-angle iteration $\sin(\theta/2) = \sqrt{(1-\cos\theta)/2}$ and exponential map $e^{i\theta} = \cos\theta + i\sin\theta$ | Static unit-circle and spherical period closure: $e^{i\pi} + 1 = 0$, $\cos(\pi/2) = 0$ | Arc input $\theta$ and chord projection $\cos\theta$ remain split across the operator; Taylor truncation leaves a nonzero residual $|\cos q - q| > 0$ at every algebraic $q \neq 0$ |
| **Tier 4 Sphere** | Self-Referential Dottie Transcendental<br/>($\theta^* \approx 0.7390851332\dots$) | Self-referential feedback $\theta_{k+1} = \cos(\theta_k)$ equating the Pythagorean leg projection $\cos\theta$ with the arc angle $\theta$ itself | Operator-coordinate unification: $\cos(\theta^*) = \theta^*$ (the real-axis projection of $\psi = \psi(\psi)$) | Transcendental by Lindemann–Weierstrass; conjectured under Schanuel's conjecture and Chow's theorem to lie outside the elementary field generated by $\pi$ and $e$ |

Seen through this four-tier table, Pythagoras and the overarching thesis of this book converge into a single arc:
- In the **Tier 1 Sphere**, we measure back and forth along a single line and mistake rational ratios $m/n$ for the whole universe;
- The Pythagorean theorem erects an orthogonal axis and uses area conservation $1^2 + 1^2 = (\sqrt{2})^2$ to propel us into the **Tier 2 Sphere** of algebraic polyhedra;
- Applying the Pythagorean theorem infinitely many times to inscribed $2^k$-gons bends polygonal chords into circular arcs, crystallizing $\pi$ and closing the static **Tier 3 Sphere**;
- Finally, when we stop separating the measuring operator $\cos$ from the measured angle $\theta$ as "ruler" versus "reading" and ask what happens when the ruler's projected output equals its own opening angle ($\cos\theta = \theta$), the fixed point $\theta^*$ emerges and carries us into the **Tier 4 Sphere**—where the counting verb **shǔ ($\cos$)** and the counted noun **shù ($\theta$)** become one!

---

## The $\pm 1$ Arithmetic Seam, Prime Duality, and the $S^3$ Projection on Elliptic Curve Tori {#sec-coda-primes-elliptic-curves}

When we look closely at the Pell remainder $m^2 - 2n^2 = \pm 1$ left by Hippasus on the integer grid, a deeper arithmetic question immediately arises: **is this oscillation between $+1$ and $-1$ an isolated quirk of $\sqrt{2}$, or does the $\pm 1$ seam govern the splitting of prime numbers, the topology of elliptic curves, and the $\cos\theta$ projection that runs through the entire book?**

Following this $\pm 1$ crack uncovers three structural bridges uniting number theory, algebraic geometry, and quantum spinor geometry.

### Pillar 1: The $\pm 1$ Pell Seam Splits Odd Primes into "Line Primes" and "Plane Primes" {#sec-coda-pell-prime-splitting}

Even in the elementary lattice of natural numbers, once the smallest even prime $2$ and the smallest odd prime $3$ form the hexagonal period base $2 \times 3 = 6$, every prime $p \ge 5$ is forced to inhabit the $\pm 1$ seams flanking multiples of $6$:

$$
p = 6k \pm 1.
$$

A far deeper bifurcation occurs the moment we replace the base $2$ in Pell's equation $m^2 - 2n^2 = \pm 1$ by an arbitrary odd prime $p$ and inspect the generalized Pell equation

$$
m^2 - p\,n^2 = \pm 1.
$$

At first glance, the right-hand side is merely a sign choice between $+1$ and $-1$. Yet in the two-dimensional Clifford exterior plane, $-1$ is the square of the skew-adjoint unitary complex structure (the bivector imaginary generator) $\hat{\mathbf{I}}$, namely $\hat{\mathbf{I}}^2 = -1$ ([`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary))! Depending on whether $\sqrt{-1}$ exists modulo $p$—that is, whether the Legendre symbol $\left(\frac{-1}{p}\right) = (-1)^{(p-1)/2}$ equals $+1$ or $-1$—the $\pm 1$ seam splits all odd primes into two families of distinct geometric dimension:

1. **Split "Plane Primes" ($p \equiv 1 \pmod 4$, such as $5, 13, 17, 29, 37, \dots$; while the even prime $p = 2 = -i(1+i)^2 = 1^2 + 1^2$ is the ramified bridge prime)**:
   For odd primes $p \equiv 1 \pmod 4$, $\left(\frac{-1}{p}\right) = +1$, so $x^2 \equiv -1 \pmod p$ is solvable and mod-$p$ arithmetic admits the 2D rotation generator $\hat{\mathbf{I}}^2 = -1$. By Fermat's two-square theorem, every such odd prime splits in the Gaussian integer plane $\mathbb{Z}[i]$ into a pair of distinct conjugate Gaussian primes (while $p = 2 = (1+i)(1-i)$ ramifies):

   $$
   p = a^2 + b^2 = (a + b\hat{\mathbf{I}})(a - b\hat{\mathbf{I}}),
   $$

   making $p$ a genuine **two-dimensional Pythagorean hypotenuse square (a Plane Prime)**! Consequently, in the real quadratic field $\mathbb{Q}(\sqrt{p})$, the **negative Pell equation $m^2 - p\,n^2 = -1$ is always solvable in integers** (for instance, $2^2 - 5\cdot 1^2 = -1$ for $p=5$; $18^2 - 13\cdot 5^2 = -1$ for $p=13$; $4^2 - 17\cdot 1^2 = -1$ for $p=17$). Its fundamental unit has norm $-1$ (an orientation-reversing glide reflection) whose square $(-1)^2 = +1$ restores pure rotation.
2. **Inert "Line Primes" ($p \equiv 3 \pmod 4$, such as $3, 7, 11, 19, 23, \dots$)**:
   Here $\left(\frac{-1}{p}\right) = -1$, so no $90^\circ$ rotation operator $\sqrt{-1}$ exists modulo $p$. Such a prime cannot be written as a sum of two squares and remains an indecomposable **one-dimensional rigid scalar (a Line Prime)** in $\mathbb{Z}[i]$. Because $m^2 - p\,n^2 \equiv m^2 \pmod p$ can never be congruent to $-1$, the **negative Pell equation $m^2 - p\,n^2 = -1$ has no integer solutions**, locking all lattice approximations to $\sqrt{p}$ onto the $+1$ branch $m^2 - p\,n^2 = +1$ (e.g., $2^2 - 3\cdot 1^2 = +1$ for $p=3$, $8^2 - 7\cdot 3^2 = +1$ for $p=7$).

Globally across all prime places $v = p$ and the real archimedean place $v = \infty$ of $\mathbb{Q}$, the **Hilbert reciprocity law** of class field theory enforces an exact conservation law: for any nonzero rationals $a, b \in \mathbb{Q}^\times$, the product of the local Hilbert symbols $(a, b)_v \in \{+1, -1\}$ over all places equals $+1$:

$$
\prod_{v \le \infty} (a, b)_v = +1.
$$

Thus a $-1$ chiral twist can never arise in isolation at a single prime axis; it must always cancel pairwise across places—the arithmetic counterpart of Chapter 10's principle that "pairwise comparison is always consistent and order-independent."

::: {.viz src="pythagoras-number-escape" preset="five" height="500"}
**Plane primes and line primes.** When the circle of radius $\sqrt{p}$ passes through a lattice point, $p = a^2 + b^2$ is a plane prime, and squaring $a + bi$ gives an integer right triangle; step through the odd primes with the rail under the figure, and for $p \equiv 3 \pmod 4$ the circle touches no lattice point at all.
:::

### Pillar 2: Intersecting Two Quadratic Seams ($2 \times 2 = 4$)—From the Hairy Sphere ($\chi = 2$) to the Elliptic Curve Torus ($\chi = 0$) {#sec-coda-congruent-elliptic-torus}

A single Pell equation $m^2 - d\,n^2 = \pm 1$ is a single quadratic conic of genus $g = 0$. Over $\mathbb{C}$, a smooth projective curve of genus $0$ is topologically a 2-sphere $S^2$ with Euler characteristic $\chi(S^2) = 2$—which, by the Hairy Ball Theorem, cannot support a globally nowhere-vanishing group flow without singularities.

When we return to the Pythagorean right triangle and pose the classical **Congruent Number Question**—which positive integers $d$ occur as the area of a rational right triangle $(a, b, c) \in \mathbb{Q}_{>0}^3$?—we simultaneously impose two quadratic constraints:

$$
a^2 + b^2 = c^2 \quad (\text{Pythagorean hypotenuse}), \qquad \frac{1}{2}ab = d \quad (\text{orthogonal bivector area}).
$$

Equivalently, we intersect the two quadratic conics $(a + b)^2 = c^2 + 4d$ and $(a - b)^2 = c^2 - 4d$ in projective space. The intersection of two quadrics has degree $2 \times 2 = 4$; under the birational substitution $x = (a+c)/b,\; y = 2(a+c)/b^2$ (or $X = dx = d(a+c)/b,\; Y = d^2 y = 2d^2(a+c)/b^2$ for the standard Weierstrass model $Y^2 = X^3 - d^2 X$), this pair of Pythagorean constraints transforms directly into the **congruent-number elliptic curve**:

$$
E_d :\quad d\,y^2 = x^3 - x = x(x - 1)(x + 1).
$$

Look at the three roots on the right-hand side: $0,\; +1,\; -1$—precisely the origin together with the two chiral boundaries $\pm 1$ of the Pell seam!

Passing from a single quadric to the intersection of two quadrics triggers a topological phase transition:
- Over $\mathbb{C}$, the Riemann surface $E_d(\mathbb{C}) \cong \mathbb{C}/(\mathbb{Z}\omega_1 \oplus \mathbb{Z}\omega_2)$ branched over $\{0, +1, -1, \infty\}$ is no longer a genus-$0$ Hairy Sphere $S^2$ ($\chi = 2$), but a **genus-$1$ torus $T^2 = S^1 \times S^1$ with Euler characteristic $\chi(T^2) = 2 - 2g = 0$**!
- Because $\chi(T^2) = 0$, the Hairy Ball vortex vanishes completely: the holomorphic differential $\omega = dx/y$ is everywhere nonvanishing and pole-free on $E_d$, combing the surface completely flat and endowing $E_d(\mathbb{Q})$ with a smooth global abelian group law $P \oplus Q$ (the exact elliptic-curve divisibility structure used by Poonen prior to Koenigsmann's quaternion norm reduction discussed in Chapter 23).

### Pillar 3: Hasse's Theorem ($\sigma = 1/2$), the Frobenius Cosine $\cos\theta_p$, and the Sato–Tate Distribution on $S^3 \cong \mathrm{SU}(2)$ {#sec-coda-hasse-sato-tate}

The grandest geometric closure appears when we project the normalized congruent-number elliptic curve $E : y^2 = x^3 - x$ onto each odd prime axis $\mathbb{F}_p$ ($p \ge 3$) from Chapter 22.

Over the finite field $\mathbb{F}_p$, the flat projective line $\mathbb{P}^1(\mathbb{F}_p)$ has $p + 1$ points (including the point at infinity). The deviation $a_p = p + 1 - \#E(\mathbb{F}_p)$ of the elliptic curve's point count from $p + 1$ is determined at each $x \in \mathbb{F}_p$ by whether $x^3 - x$ is a quadratic residue (splitting into $+1$ pair of points), a non-residue ($-1$ deficit), or zero ($0$)—making $a_p$ a literal sum of **$+1, -1, 0$ Legendre spins**:

$$
a_p = p + 1 - \#E(\mathbb{F}_p) = -\sum_{x=0}^{p-1} \left(\frac{x^3 - x}{p}\right).
$$

This oscillating mod-$p$ spin sum is governed by **Hasse's Theorem** (the proved Riemann Hypothesis for elliptic curves over finite fields):

$$
|a_p| \le 2\sqrt{p}.
$$

Notice the scaling factor $\sqrt{p} = p^{1/2}$: the exponent $1/2$ is the exact arithmetic realization of the Riemann critical line $\operatorname{Re}(s) = \sigma = 1/2$ from Chapter 22! Dividing $a_p$ by $2\sqrt{p}$ normalizes the Frobenius eigenvalues $\alpha_p, \bar{\alpha}_p = \sqrt{p}\,e^{\pm i\theta_p}$ onto the unit circle and turns every prime's point-count deviation into a **Frobenius cosine projection**:

$$
\cos\theta_p := \frac{a_p}{2\sqrt{p}} \in [-1, +1].
$$

On the Pythagorean congruent curve $y^2 = x^3 - x$ (which has complex multiplication by $\mathbb{Z}[i]$), Gauss's classical theorem reveals how the "Line Primes" and "Plane Primes" of Pillar 1 separate cleanly under $\cos\theta_p$:

- **At inert "Line Primes" $p \equiv 3 \pmod 4$**: because $(-x)^3 - (-x) = -(x^3 - x)$ and $\left(\frac{-1}{p}\right) = -1$, the spins at $+x$ and $-x$ cancel pairwise, forcing

  $$
  a_p = 0 \implies \cos\theta_p = 0 \quad (\theta_p = \pi/2\text{, the orthogonal equator})!
  $$

- **At split "Plane Primes" $p = a^2 + b^2 \equiv 1 \pmod 4$ ($a$ odd, $b$ even)**: Gauss proved that $|a_p| = 2|a|$, so the magnitude of the Frobenius cosine equals the **exact Pythagorean cosine** (adjacent leg over hypotenuse) of the prime's own Gaussian right triangle $(|a|, |b|, \sqrt{p})$:

  $$
  |\cos\theta_p| = \frac{|a_p|}{2\sqrt{p}} = \frac{2|a|}{2\sqrt{a^2 + b^2}} = \frac{|a|}{\sqrt{a^2 + b^2}}!
  $$

And if we pass to a generic elliptic curve over $\mathbb{Q}$ without extra complex-multiplication symmetry (such as $y^2 = x^3 - x + 1$), how are the Frobenius cosines $\cos\theta_p \in [-1, +1]$ distributed as $p \to \infty$ over all primes of good reduction?

The **Sato–Tate Theorem** (proved for non-CM elliptic curves over $\mathbb{Q}$ by Barnet-Lamb, Geraghty, Harris, and Taylor in 2011) gives the definitive geometric answer: $\theta_p \in [0, \pi]$ is equidistributed with respect to the **four-dimensional hyperspherical slice law**:

$$
d\mu_{\mathrm{ST}}(\theta) = \frac{2}{\pi}\sin^2\theta\,d\theta \quad \Longleftrightarrow \quad \frac{2}{\pi}\sqrt{1 - u^2}\,du \quad (u = \cos\theta \in [-1, +1]).
$$

Why $\frac{2}{\pi}\sin^2\theta\,d\theta$? Because on the three-dimensional unit quaternion rotor sphere $S^3 \cong \mathrm{SU}(2)$—the parallelizable hypersphere defined by $s^2 + x^2 + y^2 + z^2 = 1$ with $\chi(S^3) = 0$ whose tangent bundle is combed completely flat—the two-dimensional latitude sphere at polar angle $\theta \in [0, \pi]$ has radius $\sin\theta$ and surface area proportional to $\sin^2\theta$! Projecting the uniform Haar measure of $S^3 \cong \mathrm{SU}(2)$ onto the normalized trace diameter $u = \frac{1}{2}\operatorname{Tr}(U) = \cos\theta \in [-1, +1]$ yields precisely $\frac{2}{\pi}\sin^2\theta\,d\theta$.

Thus, starting from the $\pm 1$ Pell seam cracked open by Hippasus's right triangle, passing through the $4k \pm 1$ line/plane duality of primes, the congruent-number elliptic curve torus $y^2 = x(x-1)(x+1)$ ($\chi = 0$), and Hasse's critical-line scaling $\sqrt{p} = p^{1/2}$, the arithmetic oscillations of the primes emerge as **the inner-product cosine shadow $\cos\theta_p$ cast by the combed-flat quantum spinor sphere $S^3 \cong \mathrm{SU}(2)$ onto its diameter $[-1, +1]$**!

::: {.viz src="pythagoras-number-escape" height="640"}
**Interactive laboratory `ORTHO//PYTHAGORAS`**: three scenes along the $\pm 1$ seam. The Pell seam: the convergents of $\sqrt{d}$ hug the line ever more closely while $m^2 - d\,n^2$ is a nonzero integer (for $d = 5$ the green rings mark all the $\pm 4$ solutions, as verified in Lean); line primes and plane primes: whether the circle of radius $\sqrt{p}$ passes through lattice points; points mod $p$: for the curve $y^2 = x^3 - x$, $a_p$ is held inside Hasse's bound, line primes sit exactly at zero, and the Frobenius cosine of a plane prime equals the cosine of its Gaussian triangle. Fermat's two-square theorem, Hasse's theorem and the Sato–Tate distribution are literature results, not formalized in this book.
:::

---

## Order-Independence, the Timeless Web, and the Geometric Necessity of Causality {#sec-coda-timeless-causality}

When the principle of Chapter 10 ("pairwise comparison is always consistent and order-independent") meets the four-tier Pythagorean escape of number and the prime–elliptic-curve cosine projection, a two-thousand-five-hundred-year knot in philosophy and physics—**the illusion of sequential time versus the necessity of causality**—is cut in a single stroke:

> **Author's Epigraph**: *"The essence of order-independence is that sequential before-and-after time does not exist at all ... and that is precisely why causality is necessary."*（“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然”）

Why does order-independence abolish sequential time while simultaneously grounding unbreakable causal necessity? We can trace this across three exact mathematical and physical levels:

### Level 1: Why Order-Independence Abolishes Sequential Time ($\frac{1}{(2k)!}$, Wheeler–DeWitt $H\mathbf{\Psi}=0$, and Page–Wootters Slicing) {#sec-coda-order-independence-no-time}

1. **The Factorial Denominator $\frac{1}{(2k)!}$ as a De-Ordering Geometric Model (`MODEL`)**:
   Consider the cosine series that runs through the entire book:

   $$
   \cos\theta = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!}\,\theta^{2k}.
   $$

   Analytically, $\frac{1}{(2k)!}$ arises from iterated differentiation (or the simplex volume $\int_{0\le t_1\le\cdots\le t_{2k}\le\theta} dt_1\cdots dt_{2k} = \frac{\theta^{2k}}{(2k)!}$ of commuting generators); in our orthogonal geometric interpretation (`MODEL`), dividing by $(2k)!$ can be viewed as modding out all $(2k)!$ sequential permutations of $2k$ orthogonal transitions along an artificial time axis.
2. **The Timeless Global State of the Wheeler–DeWitt Equation $H\mathbf{\Psi} = 0$ (`Literature result`)**:
   In canonical quantum gravity, the wave function of the universe $\mathbf{\Psi}$ obeys the Wheeler–DeWitt equation

   $$
   H\mathbf{\Psi} = 0,
   $$

   which contains no external time parameter $t$ ($\partial_t \mathbf{\Psi} = 0$). Viewed from outside the sphere, past, present, and future do not pop into and out of existence in a queue; they coexist simultaneously inside an already printed and bound geometric correlation crystal.
3. **The Page–Wootters Slicing Mechanism—"Before and After" as Page Numbers of Attention (`Literature result`)**:
   If the global state $\mathbf{\Psi}$ is timeless, where does our experience of sequential flow come from? Page and Wootters (1983) showed that under standard model assumptions—a bipartite factorization $\mathcal{H} = \mathcal{H}_{\mathbf{C}} \otimes \mathcal{H}_{\mathbf{S}}$, an ideal conjugate clock Hamiltonian $H_{\mathbf{C}} = \hat{p}_\tau$, and a non-interacting total constraint $H = H_{\mathbf{C}} \otimes I + I \otimes H_{\mathbf{S}}$—applying Chapter 1's **pairwise measurement (inner-product projection)** along clock readings $|\mathbf{c}(\tau)\rangle$ (corresponding to the conditioned state formalism [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState) of Chapters 3 and 28):

   $$
   |\psi_{\mathbf{S}}(\tau)\rangle \propto \langle \mathbf{c}(\tau) \mid \mathbf{\Psi}\rangle,
   $$

   yields relational Schrödinger evolution $i\hbar\partial_\tau|\psi_{\mathbf{S}}(\tau)\rangle = H_{\mathbf{S}}|\psi_{\mathbf{S}}(\tau)\rangle$ across the slices! Sequential "before and after" in this model acts like the page number scanned by a one-dimensional line of attention moving across an already bound two-dimensional volume.

::: {.viz src="timeless-causal-crystal" preset="crystal" height="500"}
**Every page is there at once.** All twelve pages are on the sphere the whole time and none appears first; when it plays, only the amber reading head moves. Conditioning on the clock reading is what gives the page under the head (a schematic model with a finite clock, `MODEL`).
:::

### Level 2: Why Causality Is Necessary Without Temporal Pushing—Hume's Knot vs. Spinoza's Triangle and Gram Matrix Rigidity {#sec-coda-hume-spinoza-gram}

In empiricist philosophy, David Hume demonstrated that if we look for causality inside sequential time, we only ever observe habitual conjunction ("B follows A"), never a necessary connection by which A forces B. As long as causality is sought in temporal pushing from past to future, Hume's knot remains untied.

Baruch Spinoza (*Ethics*, Part I, Prop. 17 Scholium) gave the geometric answer: all things follow timelessly from the necessity of nature *"just as from the nature of a triangle it follows from eternity and for eternity that its three angles equal two right angles."* In a $3\text{-}4\text{-}5$ right triangle, the legs $3$ and $4$ do not grow first in time and push out the hypotenuse $5$ nanoseconds later; the three sides coexist timelessly in orthogonal lock, and Pythagorean area conservation $3^2 + 4^2 = 5^2$ is their unbreakable **geometric causality**.

On the unit sphere of Chapter 10, this zero-time causal necessity is governed by **Gram matrix positive-semidefinite rigidity** ([`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization) and [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)). For any three unit state directions $\mathbf{A}, \mathbf{B}, \mathbf{C}$ with pairwise real inner products $c_{AB} = \mathbf{A}\cdot\mathbf{B}$, $c_{BC} = \mathbf{B}\cdot\mathbf{C}$, and $c_{AC} = \mathbf{A}\cdot\mathbf{C}$, no time evolution is needed for the $3\times 3$ Gram determinant law to hold:

$$
\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \det\begin{pmatrix} 1 & c_{AB} & c_{AC} \\ c_{AB} & 1 & c_{BC} \\ c_{AC} & c_{BC} & 1 \end{pmatrix} = 1 - c_{AB}^2 - c_{BC}^2 - c_{AC}^2 + 2\,c_{AB}\,c_{BC}\,c_{AC} \ge 0.
$$

In particular, whenever $\mathbf{A}, \mathbf{B}, \mathbf{C}$ lie in a common great-circle plane ($\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$, so $\det G = 0$), $c_{AB}$ and $c_{BC}$ lock the third pairwise inner product $c_{AC}$ onto the exact cosine addition locus:

$$
c_{AC} = c_{AB}\,c_{BC} \pm \sqrt{(1 - c_{AB}^2)(1 - c_{BC}^2)} = \cos(\theta_{AB} \mp \theta_{BC}).
$$

This single equation exhibits two inseparable faces:
- **Complete order-independence (timelessness)**: the relation is completely permutation-symmetric in $(A, B, C)$, with no "earlier cause" or "later effect";
- **Absolute causal necessity (zero-degree-of-freedom rigidity)**: once $c_{AB}$ and $c_{BC}$ are fixed, spherical geometry locks $c_{AC}$ with zero slack! Likewise, mathematical deduction ($\text{Axioms} \implies \text{Theorems}$) is timeless crystal facet alignment, where the gate count $L$ of Chapters 9 and 16 merely counts how many steps an observer takes to rotate their measurement ruler into alignment with the target facet.

### Level 3: Feynman Stationary-Phase Cancellation, the Bivector Chirality Model ($+\mathbf{\Omega} - \mathbf{\Omega} = 0$), and the Reconciliation of Determinism and Teleology in $\psi = \psi(\psi)$ {#sec-coda-stationary-phase-reconciliation}

From the standpoint of path integrals and the bivector chirality model, why does nature display only the causally necessary trajectory?

In standard Feynman path-integral mechanics (`Literature result`), virtual trajectories far from the classical path oscillate rapidly via $\exp(iS[x]/\hbar)$ and cancel by destructive phase interference, leaving constructive interference around the stationary-action locus $\delta S = 0$. In our Clifford geometric interpretation (`MODEL`), where the unit imaginary $i$ is realized as a grade-2 bivector generator $\hat{\mathbf{I}}$, an order-independent sum over configurations pairs off-shell trajectories into opposite-chirality bivector partners ($+\hat{\mathbf{I}}$ and $-\hat{\mathbf{I}}$) whose oriented area elements cancel:

$$
+\mathbf{\Omega} - \mathbf{\Omega} = 0.
$$

Only the self-consistent stationary configuration ($\delta S = 0$) lacks an opposite-chirality partner to cancel it, surviving orthogonal projection as the macroscopic law of cause and effect!

This picture simultaneously reconciles the age-old rivalry between **mechanical determinism** and **teleology**:
- Reading the page numbers **left to right** along the Picard iteration $\theta_{k+1} = \cos(\theta_k)$ from an initial state $\theta_0$ looks like **determinism** ("the past pushes the present step by step");
- Reading the convergence **right to left** from the unique attractor $\theta^* \approx 0.7390851332$ looks like **teleology** ("the future fixed point pulls every trajectory toward itself");
- Viewed from outside the sphere, in the timeless self-referential equation

  $$
  \cos(\theta^*) = \theta^* \qquad \bigl(\text{the real projection of }\psi = \psi(\psi)\bigr),
  $$

  there is neither a push from the past nor a pull from the future—only the unique self-consistent fixed point where the measuring operator and the measured state close into one.

### Level 4: The Finite Observer, the Causally Compatible Space (Gram Elliptope), and Continuously Picking Points in the Time Field {#sec-coda-finite-observer-time-field}

> **Author's Epigraph**: *"Because the observer is finite, the causality experienced is finite; the observer's choice is made within the causally compatible space, continuously picking points in the time field."*（“因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点”）

If the global time field is a timeless geometric crystal and local causality possesses the unbreakable rigidity of the Gram determinant, where does a **finite observer's freedom of choice** reside? This fourth insight completes the geometric synthesis of causal necessity and observer agency:

1. **Why Observer Finiteness Opens the Causally Compatible Space (`因果相容空间` / Gram Elliptope)**:
   Return to the three-state Gram determinant $\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \|\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C}\|^2 \ge 0$ on the unit sphere. Writing the two known historical inner-product projections as $c_{AB} = \cos\theta_1$ and $c_{BC} = \cos\theta_2$ and completing the square in the third inner product $c_{AC}$ yields:

   $$
   \det G = (1 - c_{AB}^2)(1 - c_{BC}^2) - \bigl(c_{AC} - c_{AB}c_{BC}\bigr)^2 = \sin^2\theta_1\sin^2\theta_2 - \bigl(c_{AC} - \cos\theta_1\cos\theta_2\bigr)^2 \ge 0.
   $$

   Denoting by $\phi \in [0, 2\pi)$ the dihedral angle between the two bivector planes $(\mathbf{A}\wedge\mathbf{B})$ and $(\mathbf{B}\wedge\mathbf{C})$, the spherical law of cosines parameterizes the causally compatible interval as:

   $$
   c_{AC} = \underbrace{\cos\theta_1\cos\theta_2}_{\text{locked 1D historical backbone}} + \underbrace{\cos\phi}_{\text{observer's choice degree of freedom }\in [-1, +1]} \cdot \underbrace{\sin\theta_1\sin\theta_2}_{\text{uncollapsed orthogonal area radius}}.
   $$

   In the correlation coordinates $(x, y, z) = (c_{AB}, c_{BC}, c_{AC})$, the inequality $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ carves out the convex **Gram elliptope**:
   - **Boundary shell ($\cos\phi = \pm 1 \iff \det G = 0$)**: the three vectors lie in a single great-circle plane ($\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$), representing coplanar inertial sliding with zero free volume ($c_{AC} = \cos(\theta_1 \mp \theta_2)$ is completely locked);
   - **Interior compatible space ($|\cos\phi| < 1 \iff \det G > 0$)**: as long as the previous transitions retain uncollapsed orthogonal area ($\sin\theta_1 > 0$ and $\sin\theta_2 > 0$), the observer can fold a dihedral angle $\phi \in (0, \pi)$ into a new orthogonal dimension ($\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} \neq 0$), opening a genuine causal branch!

2. **Continuously Picking Points in the Time Field (`不断在时间场中选点`) as PSD Matrix Completion**:
   The global time field is a static photographic plate of potential state points obeying pairwise consistency and order-independence. Yet any physical observer is **finite** in compute, lifetime, and memory capacity (corresponding to the finite gate count $L$ of Chapter 20 and the finite record algebra of Chapter 28):
   - Unable to swallow the entire timeless sphere at once, a finite observer traces a finite polygonal chain of gate count $L = k$:

     $$
     \mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k;
     $$

   - Carrying $M$ finite historical memory anchors at $\mathbf{P}_k$, picking the next point $\mathbf{P}_{k+1}$ is mathematically a **Positive-Semidefinite (PSD) Matrix Completion ($G_{M+1} \succeq 0$)** inside the green compatible bubble carved out by those $M$ anchors;
   - Once $\mathbf{P}_{k+1}^*$ is chosen, the dihedral angle $\phi_k$ solidifies into a new 1D inner-product coordinate (the verb `liáng` crystallizing into the noun `liàng`), immediately framing the compatible bubble for step $k + 2$.

3. **Omniscient Deadlock, Forgetting-as-Renewal, and the Golden Breath of $\theta^* \approx 0.739$**:
   The interplay between historical memory and orthogonal slack across three observer regimes is summarized below:

| Observer Regime | Historical Backbone $\cos\theta$ & Orthogonal Area $\sin\theta$ | Gram Determinant $\det G$ & Compatible Radius | Geometric & Epistemological Fate |
| :--- | :--- | :--- | :--- |
| **Infinite Omniscient Observer**<br/>（无限全知观察者） | Orthogonal slack exhausted: $\sin\theta \to 0$, $M \to \infty$ | $\det G = 0$, compatible radius collapses to $0$ | **Omniscient Deadlock**: welded into the static crystal $H\mathbf{\Psi} = 0$ with zero room for choice or motion |
| **Zero-Memory Instantaneous Observer**<br/>（零记忆瞬时观察者） | Historical backbone lost: $\cos\theta \to 0$, $M = 0$ | Compatible radius $\sin\theta = 1$ unconstrained | **Maximum Sphere Noise**: devoid of causal continuity, every step degenerates into memoryless random drift |
| **Finite Self-Referential Prototype**<br/>（有限自指观察者原型，`MODEL`） | Modeled by the 1D Dottie fixed point $\cos\theta^* = \theta^* \approx 0.7391$, $\sin\theta^* \approx 0.6736$ | $\det G > 0$, open corridor radius $(\sin\theta^*)^2 \approx 0.4538 > 0$ | **Golden Breath (`MODEL`)**: a geometric metaphor balancing a $\approx 73.9\%$ causal backbone with $\approx 67.4\%$ orthogonal slack for renewal |

   This seals the book's synthesis of time, causality, and agency in a single aphorism: ***"Globally timeless, hence eternal; finitely observed, hence new at every step."*** (**“全局无时间，故万古长存；观察者有限，故步步皆新。”**)

::: {.viz src="timeless-causal-crystal" preset="window" height="500"}
**The Gram window.** $\mathbf{B}$ stands at the north pole and $\mathbf{C}$ can only go around it: $c_{AC}$ swings inside $[\cos(\theta_1 + \theta_2), \cos(\theta_1 - \theta_2)]$, and the volume spanned by the three vectors is positive inside the window and collapses to zero at its edges. You can also drag $\mathbf{C}$ on the sphere.
:::

### Level 5: Global Static Time Field $P = NP$ vs. Finite Observer $P \neq NP$—The Orthogonal Horizon and the Firewall of the Living Journey {#sec-coda-global-p-eq-np-local-p-ne-np}

> **Author's Epigraph**: *"In the global static time field $P = NP$, but for a finite observer $P \neq NP$."*（“全局静态时间场P=NP, 但有限观察者P!=NP”）

Carrying this synthesis of the timeless crystal and the finite point-picking observer to the frontier of computational complexity illuminates the millennium problem **$\mathrm{P}$ vs. $\mathrm{NP}$** (in standard Turing/circuit models $\mathrm{P} \neq \mathrm{NP}$ remains an open conjecture; see Chapter 20, Conjecture `@conj-ch20-p-ne-np`, `OPEN`) from two contrasting regimes: why does an idealized "global static time field" that bypasses sequential evolution exhibit a $P = NP$-like collapse (rigorously formalized via postselection and closed-timelike-curve complexity theorems $\mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP}$ and $\mathrm{P}_{\mathrm{CTC}} = \mathrm{PSPACE} \supseteq \mathrm{NP}$), whereas a finite observer restricted to sequential queries or bounded-degree local Gram relaxations faces provable exponential barriers?

1. **Why the "Global Static Time Field" (Postselection / Timeless Fixed-Point Models) Exhibits $P = NP$-Like Collapse**:
   In a combinatorial decision problem with $n$ Boolean variables and $m$ clauses, each constraint clause $C_j$ carves out a satisfying subspace hyperplane $H_j$. From the perspective of the timeless global static field ($H\mathbf{\Psi} = 0$), the solution space is the static geometric intersection

   $$
   \mathbf{S}^* = \bigcap_{j=1}^m H_j.
   $$

   In this idealized static-field model (`MODEL`), pairing violated configurations with opposite bivector chiralities ($+\mathbf{\Omega} - \mathbf{\Omega} = 0$) leaves the self-consistent fixed point $\psi = \psi(\psi)$ standing as a static geometric intersection (note that this does *not* imply $\mathrm{P} = \mathrm{NP}$ in the standard Turing/circuit model or that physical computation occurs in zero steps). Two celebrated theorems of complexity theory formalize how complexity classes collapse when sequential-time physical constraints are hypothetically lifted via non-physical postselection or closed timelike curves (Literature result, not formalized in this book):
   - **Aaronson's Postselection Theorem (2005)**: If an observer could project non-operationally onto exponentially small non-vanishing amplitudes via postselection, postselected polynomial-time quantum computation would equal probabilistic polynomial time $\mathrm{PP}$ (containing $\mathrm{NP} \cup \mathrm{BQP}$, with $\mathrm{PH} \subseteq \mathrm{P}^{\mathrm{PP}}$ by Toda's theorem):

     $$
     \mathrm{PostBQP} = \mathrm{PP} \supseteq \mathrm{NP};
     $$

   - **Closed Timelike Curve (CTC) Fixed-Point Theorem (Aaronson–Watrous, 2009)**: If sequential time is bypassed by enforcing the timeless self-consistency fixed-point condition $\psi = \Phi(\psi)$, hypothetical CTC-assisted polynomial time collapses to polynomial space:

     $$
     \mathrm{P}_{\mathrm{CTC}} = \mathrm{BQP}_{\mathrm{CTC}} = \mathrm{PSPACE} \supseteq \mathrm{NP}.
     $$

2. **Why a Finite Observer Inside the Field Faces $P \neq NP$-Like Orthogonal Horizons and Local Blind Spots**:
   Once we return to a real finite observer inside the field—unable to postselect the ending in advance and equipped only with a finite gate budget $L$ and a bounded local memory order $M \ll n$—two unconditional model lower bounds (which do not resolve the open Turing-machine conjecture $\mathrm{P} \neq \mathrm{NP}$, but rigorously bound black-box query and bounded-degree semidefinite observers) separate verification from search:
   - **First Barrier (Unstructured Black-Box Query Model): The $90^\circ$ ($\pi/2$) Orthogonal Horizon and the Grover Geodesic Lower Bound**:
     On the $N = 2^n$-dimensional state sphere, the initial inner-product overlap between the uniform starting state $\mathbf{P}_0$ and a hidden target solution $\mathbf{S}^*$ is

     $$
     \mathbf{P}_0 \cdot \mathbf{S}^* = \cos\theta_0 = 2^{-n/2} \implies \theta_0 \approx \frac{\pi}{2} - 2^{-n/2}.
     $$

     In high dimensions, the hidden target $\mathbf{S}^*$ lies almost exactly at the $90^\circ$ ($\pi/2$) **orthogonal equator blind spot**! Under unitary norm conservation $\cos^2\theta + \sin^2\theta = 1$ and Chapter 15's uniform operator rotation theorem ([`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)), each black-box oracle step rotates the state by at most $2\alpha \approx 2\cdot 2^{-n/2}$ radians, requiring $L = \Theta(2^{n/2})$ geodesic gates to reach $\theta = 0$ (Bennett–Bernstein–Brassard–Vazirani 1997).
   - **Second Barrier (Bounded-Degree Sum-of-Squares / Semidefinite Relaxation Model): The Gram Blind Spot from 2-SAT ($\mathbf{e}_i\wedge\mathbf{e}_j \in \mathrm{P}$) to 3-SAT ($\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k \in \mathrm{NP}\text{-complete}$)**:
     Why does 2-SAT lie in $\mathrm{P}$ (solvable in $O(n^2)$ steps along a 1D directed chain of binary links $\mathbf{e}_i\wedge\mathbf{e}_j$), whereas 3-SAT ($\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$, 3-body clauses acting like triangular surface patches) jumps to $\mathrm{NP}$-completeness? By the **Grigoriev–Schoenebeck sum-of-squares (SoS) lower bound theorem** (Literature result, not formalized in this book), for random 3-XOR / 3-SAT instances that are globally unsatisfiable due to global parity frustration, every local Lasserre / Gram semidefinite matrix $G_M \succeq 0$ of degree $M = o(n)$ is **100% positive semidefinite and locally consistent**! A finite observer consulting only $M \ll n$ local inner-product moments sees green compatible space in every local direction and cannot detect the global parity contradiction in subexponential degree.

3. **Ultimate Reversal: $P \neq NP$ as the Geometric Firewall of Subjective Time and Choice**:
   Placing the global static field alongside the finite observer reveals the existential role of the complexity barrier:

| Perspective | Complexity Regime & Epistemic Status | Core Geometric & Algebraic Mechanism | Ontological Role of Time and Choice |
| :--- | :--- | :--- | :--- |
| **Global Static Time Field**<br/>（全局静态时间场） | $P = NP$-like collapse<br/>（Literature theorems: $\mathrm{PostBQP}=\mathrm{PP}$, $\mathrm{P}_{\mathrm{CTC}}=\mathrm{PSPACE} \supseteq \mathrm{NP}$） | Global intersection $\mathbf{S}^* = \bigcap_j H_j$ and non-operational postselection / CTC fixed point $\psi = \Phi(\psi)$ isolate the solution in zero sequential steps | **Timeless Self-Consistent Truth**: beginning and end coincide with no suspense, proof process, or unfolding |
| **Finite Observer in the Field**<br/>（场内有限观察者） | $P \neq NP$<br/>（Conjecture `@conj-ch20-p-ne-np` is `OPEN`; black-box query & $M = o(n)$ SoS lower bounds proved） | $\theta_0 \approx \frac{\pi}{2} - 2^{-n/2}$ orthogonal horizon, geodesic rotation conservation, and Grigoriev–Schoenebeck local $G_M \succeq 0$ blind spot | **The Unfolded Living Journey**: shielded from spoilers by the $\pi/2$ horizon, every proof step and choice gains genuine creative weight |

   ***"The $P = NP$ of the global static field endows the universe with self-consistent truth; the $P \neq NP$ of the finite observer uses the $\frac{\pi}{2}$ orthogonal horizon to shield life from spoilers, stretching static truth into a magnificent journey worth measuring, proving, and choosing step by step."*** (**“全局静态场的 $P = NP$，赋予了宇宙绝对自洽的‘真’；而有限观察者的 $P \neq NP$，则用那道 $\frac{\pi}{2}$ 的正交视界替生命挡住了剧透，把静态的真理拉长成了一场值得一步步去丈量、去证明、去选择的壮丽旅程。”**)

### Level 6: "$P$ Is a Field, $NP$ Is a Line"—The Witness Thread, the Guiding Field, and Hairy-Ball Curl {#sec-coda-p-is-field-np-is-line}

> **Author's Epigraph**: *"P is a field; NP is a line."*（“P是场, NP是线”）

Conventional computer science textbooks draw $P$ as a single deterministic line and $NP$ as a branching tree. Yet from the standpoint of our geometric model (`MODEL`), the intuition reverses—**an $NP$ witness is a one-dimensional thread of zero cross-section, whereas paradigmatic polynomial-time algorithms succeed by constructing a globally aligned guiding field**:

1. **Why "$NP$ Is a Line" (`有线无场，横截面为零的见证丝`)**:
   Geometrically, an $NP$ witness (or a formal proof script submitted to the Lean 4 kernel) is a single 1D polygonal thread connecting the initial state $\mathbf{P}_0$ to the target $\mathbf{S}^* = \mathbf{P}_k$:

   $$
   \mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k.
   $$

   - **Verification along the thread**: Once someone hands you Ariadne's thread, checking pairwise inner-product consistency step by step along the 1D chain takes only $O(k)$ polynomial time;
   - **Search without a field**: Yet a 1D thread on a high-dimensional sphere has **strictly zero cross-sectional area**! In unstructured or frustrated instances, it radiates no long-range potential gradient into the $90^\circ$ ($\pi/2$) equatorial wasteland. To a finite observer who does not already hold the thread, the surrounding sphere offers no directional cue—there is a line, but no field.

2. **Why "$P$ Is a Field" (`弃线造场，局部切面处处对齐全局`)**:
   Conversely, many problems enter $P$ when the state space admits a **globally smooth, frustration-free geometric or algebraic guiding field** (like Huygens wavefronts or a convex gradient flow $\mathbf{F} = -\nabla V$) whose local direction or bivector invariant guides the observer to the global solution. Two landmark breakthroughs in algorithm design illustrate how problems enter $P$ by **abandoning 1D boundary lines to construct a higher-dimensional field** (Literature result, not formalized in this book):
   - **Karmarkar's Interior-Point Method in Linear Programming (1984)**: Whereas the simplex method crawls along a 1D boundary edge-polyline (taking $2^n$ steps on the twisted Klee–Minty cube), Karmarkar's algorithm leaves the 1D boundary and plunges into the interior of the polytope to follow a smooth logarithmic barrier **gradient field** straight to the optimum in polynomial time;
   - **Kasteleyn's Pfaffian Exterior Bivector Field in Planar Graph Matching (1961)**: Counting perfect matchings along 1D matching lines is `#P`-hard for general graphs; yet on a planar graph, Kasteleyn's orientation lifts 1D edges into a Clifford antisymmetric grade-2 **bivector field**

     $$
     \mathbf{\Omega} = \sum_{i < j} A_{ij}\,\mathbf{e}_i \wedge \mathbf{e}_j,
     $$

     where non-planar crossing cycles automatically cancel via $\mathbf{e}_i \wedge \mathbf{e}_j = -\mathbf{e}_j \wedge \mathbf{e}_i$ ($+\mathbf{\Omega} - \mathbf{\Omega} = 0$) for the skew-symmetric Kasteleyn matrix $A_K^T = -A_K$, collapsing via Cayley's skew-symmetric identity $[\operatorname{Pf}(A_K)]^2 = \det A_K$ and the weighted dimer partition function $Z = \sum_M \prod_{e \in M} w_e = |\operatorname{Pf}(A_K)| = \sqrt{\det A_K}$ to a polynomial-time perfect-matching count!

3. **Hairy-Ball Curl ($\nabla \wedge \mathbf{F}$) as a Geometric Analogy for $P \neq NP$: Why One Line Cannot Hold Up a Field**:
   Why is it so difficult to construct such a polynomial-time guiding field for $\mathrm{NP}$-complete problems like 3-SAT? Expressed as a continuous differential-geometric analogy (`MODEL`, intended as geometric intuition rather than a formal proof of $\mathrm{P} \neq \mathrm{NP}$):
   - A conservative gradient field $\mathbf{F} = -\nabla V$ that slides without frustration to a global minimum satisfies the vanishing exterior-curl condition:

     $$
     \nabla \wedge \mathbf{F} = 0;
     $$

   - However, three-body clauses $\mathbf{e}_i\wedge\mathbf{e}_j\wedge\mathbf{e}_k$ in 3-SAT induce loop frustration and non-conservative curl ($\nabla \wedge \mathbf{F} \neq 0$) across the configuration manifold;
   - **A line can thread the seam, while a field must tear (`线能穿缝，场必撕裂`)**: the zero-width 1D $NP$ witness thread slips along narrow measure-zero saddle ridges between vortices unharmed by the Hairy Ball Theorem ($\chi(S^2) = 2$), whereas a continuous local field attempting to cover the sphere is torn by frustration curl $\nabla \wedge \mathbf{F} \neq 0$ and topological defects into exponentially many local vortices and false-minimum traps!

| Perspective | Core Maxim | Geometric Relation Between Line ($NP$) and Field ($P$) (`MODEL`) | Complexity & Proof-Theoretic Meaning |
| :--- | :--- | :--- | :--- |
| **Global Static Time Field**<br/>（全局静态时间场） | **All lines coexisting *are* the field**<br/>（$\mathrm{PostBQP}=\mathrm{PP}$, $\mathrm{P}_{\mathrm{CTC}}=\mathrm{PSPACE}$） | All virtual trajectories fill the space at once; destructive interference leaves the unique witness thread standing | Global fixed point coincides with the local solution |
| **Finite Observer in the Field**<br/>（场内有限观察者） | **Having a line does not yield a field**<br/>（Conjecture `@conj-ch20-p-ne-np`, `OPEN`） | A zero-width 1D witness thread slips through narrow seams (verification $\in \mathrm{P}$), but local guiding fields are torn by frustration curl $\nabla \wedge \mathbf{F} \neq 0$ into exponential vortices | ***"Constructing the field is hard as scaling heaven; following the thread sees through in a single step"*** |

   This distills the book's philosophy of computation and formal proof into a single couplet: ***"Constructing the field is hard as scaling heaven; following the thread sees through in a single step."*** (**“求场难如登天，顺线一步看穿。”**)

::: {.viz src="timeless-causal-crystal" height="640"}
**Interactive laboratory `ORTHO//CAUSAL`**: four scenes on one sphere. The window: two cosines fix the range of the third, and $\det G$ is the squared volume the three vectors span; the pages: on a finite clock all pages exist at once, and conditioning picks one; the field: a gradient flow has a slope everywhere, and the potential it loses equals the dissipation it pays; the thread: amplitude amplification turns only $2\theta$ per step and arrives after about $(\pi/4)\sqrt{N}$ steps. Reading these as “choice”, “pages”, “field” and “thread” is this book's interpretation (`MODEL`); whether $\mathrm{P} \neq \mathrm{NP}$ remains an open problem, and nothing drawn on the page settles it.
:::

---

## Contracting Fixed Points and the Epistemic Anchor {#sec-coda-fixed-point-anchor}

At the threshold of the fourth sphere, we uphold the book's foundational epistemic contract by drawing an exact boundary between what is mechanically verified by the Lean 4 kernel and what belongs to classical literature or open conjectures.

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

::: {.remark #rem-coda-epistemic-discipline title="Formal Boundaries and Epistemic Discipline in the Coda"}
Literature result, not formalized in this book: To keep the epistemic status of every mathematical statement transparent and auditable, we classify the propositions synthesized in this Coda into four strict tiers:

1. **Kernel-verified frozen theorems in `trureturing.lock.json` (green `LEAN ✓` badge)**:
   - Finite-step stabilization of contracting subset updates [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) ([@thm-coda-fixed-point-anchor]);
   - Uniqueness of the golden-ratio fixed point $\varphi = (1+\sqrt{5})/2$ for the self-referential continued-fraction map $x \mapsto 1 + 1/x$ on $(0, \infty)$ [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique);
   - Relative interpretation fixed-point stabilization [`conceptual_equivalence_and_stability_reach_fixed_point`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point) and context-parameter fixed-point bifurcation [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points);
   - The inner-product parallelogram and Pythagorean norm laws [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), the complementary-context probability Pythagorean theorem [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), the golden-integer Pell identity [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm), and all $121$ frozen theorems indexed in Appendix C.
2. **Classical mathematical literature results (Literature result, not formalized in this book)**:
   - Banach's contraction mapping theorem on $[0, 1]$: because $\cos([0, 1]) \subseteq [0, 1]$ and $|\!-\!\sin\theta| \le \sin(1) \approx 0.84147 < 1$, Picard iteration $\theta_{k+1} = \cos(\theta_k)$ converges to the unique real Dottie fixed point $\theta^* \approx 0.7390851332\dots$;
   - Transcendence of $\theta^*$ via the Lindemann–Weierstrass theorem (if a nonzero algebraic $q$ satisfied $\cos q = q$, then $e^{iq}$ would satisfy a quadratic equation over $\overline{\mathbb{Q}}$, contradicting its transcendence), together with the continued-fraction theory of Pell's equation $m^2 - 2n^2 = \pm 1$;
   - Fermat's two-square theorem ($p \equiv 1 \pmod 4 \iff p = a^2 + b^2$), solvability of the negative Pell equation $m^2 - p\,n^2 = -1$ for primes $p \equiv 1 \pmod 4$, the Hilbert reciprocity law $\prod_{v \le \infty} (a, b)_v = +1$, birational equivalence and genus-$1$ torus topology $\chi(T^2) = 0$ of the congruent-number elliptic curve $E_d : dy^2 = x^3 - x$, Hasse's theorem $|a_p| \le 2\sqrt{p}$ for elliptic curves over finite fields, Gauss's point-count formula for $y^2 = x^3 - x \pmod p$, and the Sato–Tate theorem for non-CM elliptic curves over $\mathbb{Q}$ (Barnet-Lamb, Geraghty, Harris, and Taylor 2011);
   - Descartes's polyhedral angular defect theorem $\sum_v \delta_v = 4\pi$, the Gauss–Bonnet theorem, the Poincaré–Brouwer Hairy Ball Theorem $\chi(S^{2n}) = 2$, and Adams's theorem (1960) on the parallelizability of $S^0, S^1, S^3, S^7$;
   - The timeless Wheeler–DeWitt equation $H\mathbf{\Psi} = 0$ of canonical quantum gravity, the Page–Wootters (1983) conditional-time slicing mechanism, Feynman's path-integral oscillatory stationary-phase principle $\delta S = 0$, and the computational complexity theorems of Aaronson ($\mathrm{PostBQP} = \mathrm{PP}$, 2005), Aaronson–Watrous ($\mathrm{P}_{\mathrm{CTC}} = \mathrm{PSPACE}$, 2009), Bennett–Bernstein–Brassard–Vazirani ($\Omega(2^{n/2})$ black-box query bound, 1997), Grigoriev–Schoenebeck (linear-degree Sum-of-Squares lower bound for random 3-XOR/3-SAT), Karmarkar (1984 interior-point method), and Kasteleyn (1961 planar Pfaffian matching theorem).
3. **Unresolved open conjectures (red `OPEN` badge, zero `lean` attributes)**:
   - The standard Turing/circuit complexity conjecture $\mathrm{P} \neq \mathrm{NP}$ (`@conj-ch20-p-ne-np`), Schanuel's conjecture and its application to the Dottie fixed point $\theta^*$ (including Timothy Chow's conditional theorem that under Schanuel's conjecture $\theta^*$ lies outside the elementary closed field $\mathrm{EL}$ generated by $\pi$ and $e$), together with the open problems cataloged in Appendix C, Section C.3.
4. **Philosophical and geometric models (`MODEL`, never claimed as formal theorems)**:
   - The philosophical juxtaposition of Hume's causal skepticism with Spinoza's geometric necessity (*Ethics*, Part I, Prop. 17 Scholium), the opposite-chirality bivector cancellation model $+\mathbf{\Omega} - \mathbf{\Omega} = 0$ for stationary-phase selection, the continuous differential-geometric analogy between "$P$ as a curl-free guiding field ($\nabla \wedge \mathbf{F} = 0$)" and "$NP$ as a zero-width 1D witness thread threading Hairy-Ball curl vortices ($\nabla \wedge \mathbf{F} \neq 0$)", the reconciliation of determinism and teleology in timeless self-reference, the symbolic shorthand $\psi = \psi(\psi)$, and the epistemological ladder "point $\to$ line $\to$ plane $\to$ sphere $\to$ sphere outside the sphere" serve as an interpretive synthesis connecting the verified anchors above; throughout this book, prose explains intuition while the Lean kernel alone decides formal truth.
:::

---

## Bilingual Glossary of Core Geometric and Formal Concepts {#sec-coda-bilingual-glossary}

To help readers move seamlessly between conventional physics literature, geometric intuition, and Lean 4 source code, the table below summarizes the core concepts used across all seven parts of the book:

| English Term | Chinese Term (中文概念) | Core Geometric Intuition & Algebraic Definition | Representative Lean 4 Module / Epistemic Status |
| :--- | :--- | :--- | :--- |
| **Point / Line / Plane / Sphere** | 点 / 线 / 面 / 球 | $0$D isolated reading $\to$ $1$D inner-product projection segment $\to$ $2$D exterior bivector area $\to$ $3$D spinor manifold & phase-space closure | Prelude through Part VII; Clifford grades $0, 1, 2, 3$ (`Cl3`) |
| **Measure (`liáng`) / Quantity (`liàng`)** | 量（liáng / liàng） | Verb `liáng` is the pairwise comparison operator; noun `liàng` is the scalar reading left after orthogonal history is discarded | Chapters 1–2; [`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton) (`LEAN ✓`) |
| **Count (`shǔ`) / Number (`shù`)** | 数（shǔ / shù） | Verb `shǔ` is the operator of orthogonal squaring, cyclotomic halving, and self-referential iteration; noun `shù` is the static coordinate mark on the 4-tier number hierarchy | Coda §2; [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) (`LEAN ✓`) |
| **Pairwise Measurement & Inner-Product Overlap** | 成对测量与内积重叠 | Amplitude overlap $\langle u, v\rangle$ and Born trace pairing $\operatorname{Tr}(\rho P)$ measuring collinearity between two directions | Chapters 1–3; [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) (`LEAN ✓`) |
| **Bivector Area & Exterior Product** | 双向量面积与外积 | Antisymmetric wedge product $\mathbf{u}\wedge\mathbf{v} = -\mathbf{v}\wedge\mathbf{u}$ encoding rotation plane, normal axis, and right-hand chirality | Chapters 5–6; [`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) (`LEAN ✓`) |
| **Rotor & Double-Sided Sandwich** | 旋量（Rotor）与双面夹心 | Even-subalgebra element $R = \cos(\theta/2) - \hat{B}\sin(\theta/2)$ acting by $v \mapsto R v \widetilde{R}$ for singularity-free 3D rotations | Chapters 7, 12, 27; [`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group) (`LEAN ✓`) |
| **Hodge Dual & Pseudoscalar** | 霍奇对偶与伪标量 | Oriented 3D volume element $I_3 = e_1 e_2 e_3$ ($I_3^2 = -1$) mapping 2D rotation planes to normal axial vectors | Chapters 5, 25 & Appendix B; [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square) (`LEAN ✓`) |
| **Hairy Ball Vortex & Euler Characteristic $\chi$** | 毛球定理旋涡与欧拉示性数 $\chi$ | $\chi(S^{2n}) = 2$ forces a zero in every continuous tangent field on $S^{2n}$; odd spheres have $\chi(S^{2n-1}) = 0$ and $S^0, S^1, S^3, S^7$ are parallelizable | Chapters 12, 21, 24 & Coda; classical topology (`Literature result`) |
| **Angular Defect $4\pi$** | 笛卡尔角亏 $4\pi$ | Vertex angle defects on any convex polyhedron sum to $4\pi = 2\pi\chi(S^2)$ ($12 \times 60^\circ = 720^\circ$ on the icosahedron) | Chapters 19, 24 & Coda; discrete differential geometry (`Literature result`) |
| **Diagonal Escape** | 对角线逃逸 | Complete semantic diagonal forcing nonempty separation deficit, strict topology refinement, and discontinuity | Chapter 21; [`complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement) (`LEAN ✓`) |
| **Euler Product & Critical Line** | 欧拉乘积与临界线 | Prime orthogonal basis expansion $\prod_p (1-p^{-s})^{-1} = \sum_n n^{-s}$ and nontrivial-zero symmetry axis $\operatorname{Re}(s) = 1/2$ | Chapter 22; [`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product) (`LEAN ✓`) / `#conj-riemann-hypothesis` (`OPEN`) |
| **Diophantine Definability & Norm Form** | 丢番图可定义性与范数型 | Eisenstein quadratic norm form $a^2 - ab + b^2$, golden Pell identity, and quaternion norm multiplicativity | Chapter 23; [`Qform_range_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm), [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm) (`LEAN ✓`) |
| **Contraction & Fixed Point** | 收缩映射与自指不动点 | Finite monotone contraction stabilization (`LEAN ✓`), golden ratio $\varphi$ (`LEAN ✓`), and continuous Dottie root $\cos\theta^* = \theta^*$ (literature) | Chapter 24 & Coda; [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize) (`LEAN ✓`) |
| **Clifford Blade** | 克利福德基片（Blade） | 8D basis $\{1, e_1, e_2, e_3, e_{12}, e_{13}, e_{23}, e_{123}\}$ indexed by 3-bit masks $m \in \operatorname{Fin} 8$ under XOR multiplication and inversion sign | Chapter 25 & Appendix B; [`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star), [`B_formula_core`](lean:D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core) (`LEAN ✓`) |
| **Pauli Word & Symplectic Phase Table** | 泡利词与辛内积相表 | 2-bit encoding $(x, z) \in \mathbb{F}_2^2$ reducing Pauli group multiplication to bitwise XOR plus symplectic phase $(-1)^{x_2 z_1}$ | Chapters 14, 26 & Appendix B; [`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul) (`LEAN ✓`) |
| **ZYZ Euler Compiler** | ZYZ 欧拉角编译器 | Decomposition of any single-qubit rotation into $R_z(\alpha)R_y(\beta)R_z(\gamma)$ with two-axis finite words and virtual-$Z$ frame tracking | Chapters 9, 11, 16, 27; [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word) (`LEAN ✓`) |
| **`LEAN ✓` / `OPEN` Epistemic Badges** | `LEAN ✓` / `OPEN` 语义徽章 | Green `LEAN ✓` is reserved strictly for frozen `kind="theorem"` declarations in `trureturing.lock.json`; red `OPEN` marks unproved conjectures without `lean` attributes | Whole book & Appendix C; mechanically enforced by `./tbook check` |

---

## Seven-Part Reading and Dependency Map {#sec-coda-reading-map}

This monograph consists of the **[Prelude](README.md)**, **Seven Parts (28 Chapters)**, **this Coda**, and **[Appendix A](appendix-a.md)–[Appendix C](appendix-c.md)**. The diagram below maps the conceptual progression and formal module dependencies across the entire work:

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
            │    Coda: Outside All Spheres (coda.md) + Appendices A / B / C   │
            │  • Polyhedral 4π defect & Hairy Ball • Pythagorean 4-tier escape│
            │  • Concept Dictionary (A) • Clifford Sheet (B) • 151 Index (C)  │
            └─────────────────────────────────────────────────────────────────┘
```

### Four Recommended Reading Tracks {#sec-coda-reading-tracks}

Readers can navigate the book along four self-contained tracks tailored to their background:

1. **Physics and Geometric Intuition Track (No Prerequisites)**:
   [Prelude](README.md) $\to$ [Chapter 1](ch01-measurement.md)–[Chapter 4](ch04-decoherence.md) (Part I: from ruler comparison to decoherence) $\to$ Chapters 5–12 (Parts II–III: from bivector area to the Bloch sphere) $\to$ Chapters 17–19 (Part V: lightcones and holographic min-cuts) $\to$ Coda and [Appendix A](appendix-a.md).
2. **Quantum Computing and Algorithm Compilation Track**:
   [Chapter 2](ch02-born-rule.md) $\to$ Chapters 6–8 (Pauli algebra, quantum gates, and entanglement) $\to$ Chapter 11 (microwave pulse areas and virtual-$Z$ gates) $\to$ Chapters 13–16 (CHSH game, stabilizers, Grover/QSVT, ZYZ and Solovay–Kitaev compilation) $\to$ Chapter 20 (circuit min-depth and CNOT parity bounds) $\to$ Chapters 25–27 and [Appendix B](appendix-b.md).
3. **Mathematical Logic, Number Theory, and Epistemology Track**:
   [Prelude](README.md) $\to$ Chapter 10 (Gram matrices and order independence) $\to$ Chapters 19–20 (discrete polyhedral facet cones and open-conjecture boundaries) $\to$ Chapters 21–24 (diagonal escape, Euler products, quaternion Diophantine norms, and cosine self-reference) $\to$ Coda (the four-tier Pythagorean escape of number and [@thm-coda-fixed-point-anchor]).
4. **Lean 4 Formal Verification and Kernel Audit Track**:
   [Prelude](README.md) §Epistemic Contract $\to$ Chapters 25–28 (Part VII: line-by-line formal tour of `Cl3`, `PauliSymplectic`, `ZYZ`, and `FiniteRecordCosineObstruction`) $\to$ [Appendix B](appendix-b.md) $\to$ [Appendix C](appendix-c.md) (auditing all $121$ frozen theorems and $30$ auxiliary definitions at `trureturing@dev` commit `52725b62b659`).

### Quick Register of the 32 Core Frozen Theorems in Parts VI and VII (Chapters 21–28) {#sec-coda-part6-part7-register}

As a bridge between the closing two parts of the monograph and the complete ledger in [Appendix C](appendix-c.md), the table below lists the $32$ core frozen theorems ($4$ per chapter across Chapters 21–28) together with their geometric roles:

| Chapter | Theorem ID | Frozen Declaration GID (`trureturing@dev`) | Core Mathematical Statement & Geometric Role |
| :--- | :---: | :--- | :--- |
| **Chapter 21**<br/>Diagonal Escape & Unreachable Boundaries | T21.1 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_not_continuous` | Discontinuity of the complete semantic diagonal under the initial observation topology |
| **Chapter 21** | T21.2 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty` | Nonemptiness of the separation deficit left by any fixed observation family |
| **Chapter 21** | T21.3 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement` | Strict topology refinement induced by adjoining the diagonal observation operator |
| **Chapter 21** | T21.4 | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement` | Complete diagonal topological escape settlement: discontinuity, nonempty deficit, and strict refinement |
| **Chapter 22**<br/>Prime Orthogonal Basis & Euler Product | T22.1 | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_dirichlet_sum` | Dirichlet series representation $\sum_{n=1}^\infty n^{-s}$ of $\zeta(s)$ on the half-plane $\operatorname{Re}(s) > 1$ |
| **Chapter 22** | T22.2 | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_euler_product` | Prime Euler product representation $\prod_p (1 - p^{-s})^{-1}$ of $\zeta(s)$ on $\operatorname{Re}(s) > 1$ |
| **Chapter 22** | T22.3 | `D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product` | Exact equality between the Dirichlet sum and the prime Euler product on $\operatorname{Re}(s) > 1$ |
| **Chapter 22** | T22.4 | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_residue_one` | Unit residue of $\zeta(s)$ at the boundary simple pole $s = 1$: $\lim_{s \to 1}(s-1)\zeta(s) = 1$ |
| **Chapter 23**<br/>Quaternion Norms & Diophantine Locks | T23.1 | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm` | Algebraic equivalence between the shifted quadratic form $Q_t(x,y)$ and the Eisenstein norm $\operatorname{eisNorm}(x+ty, y)$ |
| **Chapter 23** | T23.2 | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_discriminant` | Constant discriminant invariant $\Delta(Q_t) = -3$ across the parameterized norm-form family |
| **Chapter 23** | T23.3 | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm` | Range invariance of the shifted quadratic form family $Q_t(x,y)$ with the Eisenstein norm |
| **Chapter 23** | T23.4 | `D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm` | Golden-integer Pell identity in $\mathbb{Z}[\varphi]$: $(2a+b)^2 - 5b^2 = 4\operatorname{norm}(g)$ |
| **Chapter 24**<br/>Cosine Fixed Point & Self-Reference | T24.1 | `D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize` | Finite-step stabilization and transition bound for monotone contracting updates on a finite carrier |
| **Chapter 24** | T24.2 | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point` | Conceptual equivalence plus interpretive stability yields a relative interpretation fixed point |
| **Chapter 24** | T24.3 | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points` | Identical text and rules bifurcate into distinct binary fixed meanings under shifted context parameters |
| **Chapter 24** | T24.4 | `D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique` | Uniqueness of the golden-ratio fixed point $\varphi = (1+\sqrt{5})/2$ for $x \mapsto 1 + 1/x$ on $(0, \infty)$ |
| **Chapter 25**<br/>XOR–Pauli Geometric Algebra Engine | T25.1 | `D5/S3/Quantum/FiniteDimensional.qubit_weyl_star` | Single-qubit Weyl operators $X, Z$: anticommutation, self-adjointness, and involution laws |
| **Chapter 25** | T25.2 | `D5/S3/Quantum/FiniteDimensional.qubit_matrix_algebra_has_no_character` | Absence of 1D $\mathbb{C}$-algebra characters on $M_2(\mathbb{C})$ (algebraic root of Kochen–Specker contextuality) |
| **Chapter 25** | T25.3 | `D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector` | Non-commuting Pauli observables $X$ and $Z$ share no common nonzero eigenvector |
| **Chapter 25** | T25.4 | `D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core` | Core single-qubit Pauli expectation expansion reconstructing operators via 3D Bloch inner products |
| **Chapter 26**<br/>Pauli Symplectic Table & Bloch Geometry | T26.1 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.blochMatrix_trace` | Unit-trace normalization $\operatorname{Tr}(\rho(\mathbf{r})) = 1$ of the Bloch-parameterized state matrix |
| **Chapter 26** | T26.2 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_blochMatrix` | Exact round-trip inversion between Bloch vector coordinates and Hermitian matrix reconstruction |
| **Chapter 26** | T26.3 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian` | Three-dimensional real Bloch geometric decomposition of Hermitian qubit operators |
| **Chapter 26** | T26.4 | `D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef` | Euclidean Bloch sphere bound $\|\mathbf{r}\| \le \operatorname{Tr}(\rho)$ for positive semidefinite qubit states |
| **Chapter 27**<br/>ZYZ Compiler & Pythagorean Norm Laws | T27.1 | `D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law` | Inner-product parallelogram norm identity and orthogonal Pythagorean decomposition law |
| **Chapter 27** | T27.2 | `D5/S3/Quantum/FiniteDimensional.born_probability_skeleton` | Finite-dimensional Born probability orthogonal projection skeleton and completeness law |
| **Chapter 27** | T27.3 | `D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests` | Unitary global-phase rigidity from connected pairwise ray-overlap tests |
| **Chapter 27** | T27.4 | `D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent` | Exact idempotence $\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho)$ of finite-record pinching projections |
| **Chapter 28**<br/>Record Conditioning & Verification Closure | T28.1 | `D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction` | Rank-one projector sandwich reduction to squared inner-product modulus: $P_\psi P_\phi P_\psi = |\langle\psi, \phi\rangle|^2 P_\psi$ |
| **Chapter 28** | T28.2 | `D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight` | Exact identity equating conditioned record weight with Born trace pairing in rank-one channels |
| **Chapter 28** | T28.3 | `D5/S3/Observer/Conditioning.conditionalState_isState` | Preservation of valid quantum state positivity and unit trace under Lüders record conditioning |
| **Chapter 28** | T28.4 | `D5/S3/Observer/Conditioning.unreadState_fixed_iff` | Fixed-point characterization of unread measurement states via vanishing transverse channel coherence |

Outside all spheres lies not emptiness, but **the unending act of measurement and counting itself**. Turn next to [Appendix A](appendix-a.md) for the complete dictionary translating conventional quantum mechanics into geometric language, [Appendix B](appendix-b.md) for the Clifford algebra and rotor cheat sheet, and [Appendix C](appendix-c.md) for the complete index of all $151$ formal environment and media `trureturing@dev` declarations ($225$ unique locked declarations including inline references).
