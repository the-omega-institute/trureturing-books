# Chapter 2 Dual Quaternion Clocks, Non-Commutative Inverse Spectra, and Zero-Driven Haar Integration {#sec-ou-ch02}

[Chapter 1](ch01-behrend-shell-and-frequencies.md) laid bare the static arithmetic chassis of the 19-point Behrend shell: $19$ integer vertices, $135$ edges, $529$ triangles, and $22$ rationally independent frequencies. As long as clock phases live on the ordinary complex unit circle $e^{i\theta} \in \mathrm{U}(1)$, however, every phase factor commutes with every other—traversing edge $A$ then edge $B$ is indistinguishable from traversing $B$ then $A$. Yet the very heartbeat of weak $\mathrm{SU}(2)_L$, strong $\mathrm{SU}(3)_C$, and three-dimensional spinor transport is **non-commutativity**.

This chapter therefore pushes the shell into non-commutative territory. When we promote the phases carried on the two clock-edge families ($d^2 = 724$ and $d^2 = 804$) from complex numbers to a **pair of unit quaternion clocks $(U, V) \in \mathrm{Sp}(1)^2$**, three sharp questions immediately confront us:

1. **Can a spectrum hear non-commutativity?** Handed only the full eigenvalue list (with multiplicities) of a two-component shell operator—with the internal quaternion axes hidden—can you uniquely reconstruct $(U, V)$ up to simultaneous conjugation? Can finitely many real determinant probes achieve global injectivity?
2. **Can Riemann zeros execute gauge-group integration?** Without a single pseudo-random number generator, can the $22$ rationally independent shell frequencies of Chapter 1, driven solely by positive Riemann zero ordinates $\gamma$, reproduce exact Haar integrals across the entire Standard Model gauge group $\mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3)$ as unweighted averages over a density-optimal zero subsequence?
3. **Where does an arithmetic integrator end and physical dynamics begin?** When we extend zero-driven sampling to interacting two-dimensional area laws and finite Wilson-loop diffusion tests, where does subsequence density collapse super-exponentially, and how sharply does equal-coupling diffusion collide with $1\,\mathrm{TeV}$ experimental inputs?

## 2.1 Dual Quaternion Clocks, the Bargmann–Gram Body, and Free-Group Rigidity {#sec-ou-2-1}

Two unit quaternions $U, V \in \mathrm{Sp}(1) \cong \mathrm{SU}(2)$ carry six real parameters, yet spectral observables depend only on their **simultaneous conjugacy class** $(U, V) \mapsto (g U g^{-1}, g V g^{-1})$. Quotienting by $\mathrm{SO}(3)$ conjugation leaves exactly three invariants: three real half-traces. We record this geometry together with the four-angle zero selection rule in our central definition.

::: {.definition #def-ou-ch02-dual-clocks title="Dual Quaternion Clocks, Commutator Defect, and Four-Angle Zero Selection"}
Let $U = x + \mathbf{u}$ and $V = y + \mathbf{v}$ be two unit quaternions ($x, y \in [-1, 1]$ real parts, $\mathbf{u}, \mathbf{v} \in \mathbb{R}^3$ pure imaginary parts with $x^2 + |\mathbf{u}|^2 = y^2 + |\mathbf{v}|^2 = 1$). Define their three simultaneous-conjugation-invariant half-traces and their **commutator defect** $E$ by

$$
x := \operatorname{Re} U, \qquad y := \operatorname{Re} V, \qquad z := \operatorname{Re}(UV^{-1}) = xy + \mathbf{u}\cdot\mathbf{v},
$$

$$
E := 1 + 2xyz - x^2 - y^2 - z^2 = |\mathbf{u}\times\mathbf{v}|^2 \ge 0.
$$

In the standard two-dimensional complex representation, $x, y, z$ are matrix half-traces, and the group commutator and additive commutator satisfy the exact identities

$$
\operatorname{Re}(UVU^{-1}V^{-1}) = 1 - 2E, \qquad |UV - VU|^2 = 4E.
$$

The admissible domain $\{(x, y, z) \in [-1, 1]^3 : |z - xy| \le \sqrt{(1 - x^2)(1 - y^2)}\}$ is a compact three-dimensional convex body of Euclidean volume $\pi^2 / 2$ whose boundary is precisely the commuting locus $E = 0$.

On the 19-point Behrend shell of [@def-ou-ch01-behrend-shell], for each positive Riemann zero ordinate $\gamma > 0$, retain the dual-clock angles $p := (\theta_{724} - \theta_{244})\gamma$ and $q := (\theta_{804} - \theta_{244})\gamma$, introduce a third relative-axis angle $v := \theta_{12}\gamma$ from the **shortest native arc** $d^2 = 12$, and define

$$
U(\gamma) := \cos p + \mathbf{i}\sin p, \qquad V(\gamma) := \cos q + (\mathbf{i}\cos v + \mathbf{j}\sin v)\sin q.
$$

Using the fourth native chord $d^2 = 200$, define the fractional selection angle $u := \{\theta_{200}\gamma / (2\pi)\} \in [0, 1)$. The parameter-free **Haar zero selection rule** retains all actual positive Riemann zeros satisfying

$$
u < \sin^2 p\,\sin^2 q\,|\sin v|.
$$

:::

The shortest native arc sets the axis angle $v$. How short can the edges be if changing their transport is to shift the two scalar clock phases? Fix the background edge transports at unit charge, allow rephasing at every vertex, and let $D$ bound the squared chord length of any edge that can be changed. Vertex phases cancel in the phase product around a cycle. For $D<372$ neither clock can shift (the shortest chords have squared length $12$). For $372\le D<724$ the two clocks must shift by the same angle, which can be chosen freely, and for $D\ge724$ they can shift independently. At the same unit charge, the two positive zeta zeros used in [Chapter 7](ch07-chiral-three-generations.md) give unequal clock shifts, so the minimum bound is $724$ and at that bound exactly $42$ undirected shell edges need to change in an optimal realization. [Cycles and the minimum number of edge changes](https://github.com/the-omega-institute/trureturing-experiments/blob/78d69c0ea72a7e4e1b8b63562031d5bf35e5e655/experiments/ch39-omega-research/replay/%E5%8D%81%E4%B9%9D%E7%82%B9%E5%A3%B3%E4%B8%A4%E9%92%9F%E8%81%94%E7%BB%9C%E7%9A%84%E5%B1%80%E9%83%A8%E5%BC%A6%E9%95%BF%E9%98%88%E5%80%BC.md)

**Edge changes at the critical chord length (hand derivation, `ARGUED`).** The minimum can also be computed for every target pair of clock shifts. Write $\alpha,\beta$ for the shifts on the $724$ and $804$ edge classes, and put $\delta=\alpha-\beta$. Angles are taken modulo $2\pi$. At the bound $D=724$, the exact counts are

| Target condition | Fewest undirected edge changes |
| --- | ---: |
| $\beta=\delta=0$ | $0$ |
| $\beta=0$ and $\delta\ne0$ | $6$ |
| $\delta=0$ and $\beta\ne0$ | $36$ |
| $\beta=\delta=\pi$ | $40$ |
| All other points with both $\beta$ and $\delta$ nonzero | $42$ |

First absorb the long-edge clock shift $\beta$ at the three inner sites to make all six uneditable long-edge labels zero, then contract those edges to obtain thirteen components. Take zero additional phase at each component as the baseline. This gauge leaves $93$ identically zero labels, $36$ labels of the form $\pm\beta$, and $6$ of the form $\pm\delta$. Between the three main components, a nonzero label can at most tie the zero label's multiplicity, even when angle labels coincide, except when both residual angles are half turns. When $\beta\ne0$, only three of the remaining component pairs can each save one change. Each has its own two-edge path whose labels strictly favor zero on both edges. These paths share no edges. A relative phase that saves one edge costs at least one changed edge on the corresponding path, so the count cannot improve.

At the double half turn, every label is $0$ or $\pi$. If the ten singleton components do not all share a phase, the complete graph of zero labels among them loses at least nine edges. Each of the three pairs of main components has six parallel edges, two labeled $0$ and four labeled $\pi$. The three bundles therefore require at least six changes in total, and each of the nine main-to-singleton bundles with two zero labels and the eighteen with one zero label costs at least one. The total is at least $42$. If the ten singletons agree, take their common phase as zero. A main component with phase $0$, $\pi$, or any other angle costs $10$, $12$, or $22$ changes to the singletons, respectively. Any other angle brings the total to at least $48$. If $r$ of the three main components have phase $\pi$, the total is $30+2r+12-2r(3-r)$, with minimum $40$ at $r=1$. The actual zeta-zero pair lies in the $42$-edge case. [Finite enumeration at the double half turn (`CERT`)](https://github.com/the-omega-institute/trureturing-books/issues/1624#issuecomment-7230805554)

Look closely at the commutator defect $E = 1 + 2xyz - x^2 - y^2 - z^2$: it is no ad hoc polynomial, but the $3 \times 3$ Bargmann–Gram determinant of the three comparison anchors $(1, U, V)$. Whenever the two imaginary axes pull apart from collinearity, $E > 0$ registers the non-vanishing squared bivector area and the constant unit sectional curvature $K \equiv +1$ of $S^3$. The following Lean 4 frozen theorem establishes both geometric laws directly in exact integer and rational arithmetic:

::: {.theorem #thm-ou-ch02-bargmann-gram title="Nonnegativity of the Three-Anchor Bargmann–Gram Determinant and Unit Sectional Curvature" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature"}
1. **Bargmann–Gram nonnegativity** ([`detGram3_nonneg`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg)): for any three nonzero integer quaternions $a, b, c \in \mathrm{Quad4}$ ($a \neq 0, b \neq 0, c \neq 0$), in the signed integer-ratio type `Omega.IntRatio` ordered by `IntRatio.Le`, the normalized $3 \times 3$ Bargmann–Gram closure determinant satisfies

   $$
   0 \;\le\; \det\mathbf{G}_3(a, b, c) \;=\; 1 + 2B(a, b, c) - \bigl(\kappa(a, b) + \kappa(b, c) + \kappa(c, a)\bigr).
   $$

2. **Constant unit sectional curvature of the Lie triple bracket** ([`lieTriple_unit_sectional_curvature`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature)): for all integer three-vectors $u, v : \mathrm{Vec3}$, with Lie triple bracket $\{u, v, w\} := \langle u, w\rangle v - \langle v, w\rangle u$ and Gram area squared $\operatorname{gramAreaSq}(u, v) := \langle u, u\rangle\langle v, v\rangle - \langle u, v\rangle^2$,

   $$
   \bigl\langle \{u, v, u\},\, v \bigr\rangle \;=\; \operatorname{gramAreaSq}(u, v).
   $$

:::

::: proof
For part 1, project $b$ and $c$ orthogonally to $a$ without division by setting $w := \|a\|^2 b - \langle a, b\rangle a$ and $v := \|a\|^2 c - \langle a, c\rangle a$. Expanding $\|w\|^2 \|v\|^2 - \langle w, v\rangle^2$ cancels the quartic cross-terms and leaves the pure integer sum of squares $\|a\|^6 \det G_{\mathrm{raw}}(a, b, c) = \frac{1}{2}\sum_{i,j=1}^4 (w_i v_j - w_j v_i)^2 \ge 0$; since $a, b, c$ are nonzero, all squared norms and the common denominator are strictly positive, yielding nonnegativity in `IntRatio.Le`. For part 2, direct expansion gives $\langle \langle u, u\rangle v - \langle v, u\rangle u,\, v\rangle = \langle u, u\rangle\langle v, v\rangle - \langle u, v\rangle^2 = \operatorname{gramAreaSq}(u, v)$. The full proof is checked by the Lean kernel.
:::

Even without continuous angles, pure integer quaternions already generate dense non-commutative rotation groups with zero hidden relations. Taking the six norm-$5$ Hurwitz generators $(1, \pm 2, 0, 0)$, $(1, 0, \pm 2, 0)$, and $(1, 0, 0, \pm 2)$, their rational adjoint rotations $\operatorname{Ad}(p)(v) = p v \bar{p} / \|p\|^2 \in \mathrm{SO}(3, \mathbb{Q})$ freely generate the free group $F_3$: merely testing two reduced words on the $x$- and $y$-axes already forces them to be identical letter for letter:

::: {.theorem #thm-ou-ch02-free-group-f3 title="Adjoint Injectivity of Reduced Words in Norm-5 Hurwitz Generators" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_words_adjoint_injective"}
Let $u, v : \mathrm{Word}$ be two reduced words (`IsReduced u` and `IsReduced v`, meaning no adjacent letters are conjugate inverses) over the six norm-$5$ Hurwitz generators, with integer quaternion evaluation $\operatorname{evalQuat}(w)$, rational adjoint action $\operatorname{Ad}$, and standard axes $\mathrm{axisX} := (1, 0, 0)$ and $\mathrm{axisY} := (0, 1, 0)$. If both axis images agree under `RatVec3.Equiv`,

$$
\operatorname{Ad}\bigl(\operatorname{evalQuat}(u)\bigr)(\mathrm{axisX}) \equiv \operatorname{Ad}\bigl(\operatorname{evalQuat}(v)\bigr)(\mathrm{axisX}), \qquad \operatorname{Ad}\bigl(\operatorname{evalQuat}(u)\bigr)(\mathrm{axisY}) \equiv \operatorname{Ad}\bigl(\operatorname{evalQuat}(v)\bigr)(\mathrm{axisY}),
$$

then the two reduced words are equal: $u = v$.
:::

::: proof
Set $p := \operatorname{evalQuat}(u)$ and $q := \operatorname{evalQuat}(v)$; multiplicativity gives $\|p\|^2 = 5^{|u|} > 0$ and $\|q\|^2 = 5^{|v|} > 0$. Clearing denominators and multiplying on the left by $\bar{p}$ and on the right by $q$ shows that $\bar{p}q$ commutes with both $\mathbf{i}$ and $\mathbf{j}$, hence $\bar{p}q$ is an integer scalar quaternion. Stripping a common prefix of length $k$ by induction on $u$ divides out a scalar factor of $5^k$ from $\bar{p}q$; any remaining inequality between $u$ and $v$ produces a nonempty reduced word (obtained by reversing and inverting the remainder of $u$ before appending the remainder of $v$) whose evaluation is the reduced integer scalar $\bar{p}q / 5^k$. Yet the mod-$5$ rank-one outer-product splitting proves that no reduced word has all four coordinates divisible by $5$, contradicting $m^2 = 5^L$ for $L \ge 1$. Hence $u = v$. The full proof is checked by the Lean kernel.
:::

Returning to concrete geometric axes on the 19-point shell (`CERT / ARGUED`; see the [dual-clock study](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E5%9B%9B%E5%85%83%E6%95%B0%E5%8F%8C%E6%97%B6%E9%92%9F%E4%B8%8E%E6%9E%81%E5%B0%8F%E5%9C%86%E5%BC%A7.md)): instead of rotating the axis by $v = \theta_{12}\gamma$, one can fix the two rotation axes by the oriented edge-normal cross products at $P = (1, 5, 29)$, taking $n_1 \parallel P \times (13, 23, 13)$ and $n_2 \parallel P \times (23, 13, 13)$ with inner product $c = \sqrt{8741547 / 12563572}$. At the $35$-th positive zero ($\gamma_{35} \approx 111.87466$), this gives $E = (1 - c^2)\sin^2 p_1 \sin^2 p_2 \approx 0.17056379$, commutator half-trace $1 - 2E \approx 0.65887242$, and a five-anchor comparison set $\{1, U, U^{-1}, V, UV\}$ of exact feature rank $5$ (five-by-five Gram determinant $(1 - x)^2 E^2 / 8 \approx 0.00844423$). A subtle conceptual distinction also governs open-arc operations: if the shortest-arc spin lift $T$ ($\sin(\theta/2) = 1/17$ along $d^2 = 12$) acts independently on the same register alongside two coaxial clocks, it generates dense $\mathrm{Sp}(1)$ at every positive height; if instead arcs act solely as parallel transport between distinct vertex fibers ($T_{ij} n_j T_{ij}^{-1} = n_i$), every based loop still stabilizes the base radial axis inside a single abelian circle. Extracting observable non-commutativity from minimal arcs therefore requires an explicit fiber identification (`ARGUED`).

## 2.2 Hearing Non-Commutativity: Inverse Spectral Uniqueness and Three-Probe Global Injectivity {#sec-ou-2-2}

We now answer our first physical question: **from the two-component spectrum of the 19-point shell alone, can one tell whether $(U, V)$ commute—and recover $(x, y, z)$ uniquely?**

Equip every vertex and continuous arc of the $R = 867$ shell graph with two internal complex components; moving inward from outer to inner orbits, multiply every $d^2 = 724$ edge by $U$ and every $d^2 = 804$ edge by $V$ (with inverses in reverse), while endpoint potentials, inertias, and scalar spin factors act diagonally on the two components. Two sharp inverse-spectral results hold (`ARGUED / CERT`; see the [dual-clock study](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E5%9B%9B%E5%85%83%E6%95%B0%E5%8F%8C%E6%97%B6%E9%92%9F%E4%B8%8E%E6%9E%81%E5%B0%8F%E5%9C%86%E5%BC%A7.md)):

1. **Full-spectrum inverse uniqueness up to simultaneous conjugation:** Two operators in this two-component class have identical spectra (counting multiplicities) **if and only if their clock pairs $(U, V)$ and $(U', V')$ are simultaneously conjugate**. The proof expands the negative-energy boundary determinant in closed walks: below total arc length $0.016810$, any closed walk contains at most two clock edges (three shortest clock edges already exceed $0.0203$). Among all certified simple cycles, the first three winding classes to appear carry, in strict length order, (i) one $724$-edge, (ii) one $724$-edge and one opposite $804$-edge, and (iii) one $804$-edge. Comparing leading negative-energy asymptotics extracts $2(x - x')$, $2(z - z')$, and $2(y - y')$ sequentially, forcing $(x, y, z) = (x', y', z')$. In particular, the two-component spectrum is an exact double copy of the scalar complex-line spectrum **if and only if $E = 0$ (commuting clocks)**.
2. **Global injectivity of three shifted determinant probes:** Define the normalized real determinant readout

   $$
   Y_u(x, y, z) := \frac{\det D_{U, V}^{(2)}(-u)}{\det D_{I, I}^{(2)}(-u)} - 1.
   $$

   Eliminating all vertices outside the inner $3$-cycle $(13, 13, 23)$ by Schur complement and applying a $3$-point discrete Fourier transform in the pole-centered spin frame decomposes the reduced operator into three $2\times 2$ blocks $b I + \sum_{j=1}^3 (c_j Z_j + \bar{c}_j Z_j^{-1})$ with $(Z_1, Z_2, Z_3) = (U, V, U^{-1}V)$. Consequently, every $Y_u$ is a **real polynomial of total degree at most $6$** in $X = (x, y, z)$. Stacking three shifts $(u_1, u_2, u_3)$ into $A_1 X + R(X)$ and bounding $\operatorname{Lip}_\infty(A_1^{-1} R)$ over $[-1, 1]^3$ by certified interval arithmetic yields two explicit schemes:

| Dimensionless Shifts $(u_1, u_2, u_3)$ | Upper Bound on $\operatorname{Lip}_\infty(A_1^{-1} R)$ | Error Amplification Factor to $(x, y, z)$ |
| :--- | :---: | :---: |
| $(15000,\; 20000,\; 60000)$ | $\le 0.400$ | $\le 1.187 \times 10^{16}$ |
| $(-1000,\; -204000,\; -215000)$ | $\le 0.331$ | $\le 5.196 \times 10^{10}$ |

Because $\operatorname{Lip}_\infty(A_1^{-1} R) \le 0.331 < 1$, the triangle inequality guarantees **global injectivity** over the entire compact three-dimensional conjugacy space! By invariance of domain, no continuous map from a three-dimensional open interior into $\mathbb{R}^2$ can be injective, so **three real probes are strictly minimal**. At a fixed zero height such as zero #35, even a single zero-shift comparison separates coaxial from geometric dual axes by $+0.0154019\ldots$ (lying strictly in $(0.0146267, 0.0161849)$ across the $\pm 0.01$ phase box), and this zero-shift readout is exactly invariant under arbitrary arc subdivisions that preserve edge-transport products.

## 2.3 Optimal Density-$1/(2\pi)$ Zero-Driven Haar Integration on the Standard Model Group {#sec-ou-2-3}

We now unleash all $22$ rationally independent shell frequencies from [Chapter 1](ch01-behrend-shell-and-frequencies.md) to build a deterministic arithmetic integrator for the Standard Model gauge group $G = \mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3)$.

The analytic cornerstone for compact-group character integrals and heat-kernel normalizations is Schur orthogonality of irreducible matrix coefficients, anchored directly in Lean 4:

::: {.theorem #thm-ou-ch02-schur-orthogonality title="Schur Orthogonality of Irreducible Compact-Group Matrix Coefficients" lean="D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_self"}
Let $G$ be a compact topological group equipped with a finite left-invariant Haar measure $\mu$.

1. **Vanishing across inequivalent irreducible representations** ([`integral_dual_mul_dual_inv_eq_zero`](lean:D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero)): let $\mathbb{k}$ be $\mathbb{R}$ or $\mathbb{C}$ (`[RCLike 𝕜]`), let $V$ be a finite-dimensional normed space over $\mathbb{k}$, let $W$ be a $\mathbb{k}$-vector space, and let $\rho$ on $V$ and $\sigma$ on $W$ be inequivalent irreducible representations of $G$ (`IsEmpty (ρ.Equiv σ)`) such that $g \mapsto \rho(g)v$ is continuous for all $v \in V$. For fixed $\varphi \in V^*$ and $\psi \in W^*$ such that $g \mapsto \psi(\sigma(g)w)$ is continuous for all $w \in W$, every $v \in V$ and $w \in W$ satisfy

   $$
   \int_G \varphi\bigl(\rho(g)v\bigr)\,\psi\bigl(\sigma(g^{-1})w\bigr)\,d\mu(g) \;=\; 0.
   $$

2. **Self-orthogonality for complex irreducible representations** ([`integral_dual_mul_dual_inv_self`](lean:D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_self)): let $V$ be a finite-dimensional complex normed space and $\rho$ a continuous irreducible complex representation of $G$ on $V$. Then for all $\varphi, \psi \in V^*$ and $v, w \in V$,

   $$
   \int_G \varphi\bigl(\rho(g)v\bigr)\,\psi\bigl(\rho(g^{-1})w\bigr)\,d\mu(g) \;=\; \frac{\mu(G)}{\dim_{\mathbb{C}} V}\,\varphi(w)\,\psi(v).
   $$

:::

::: proof
For fixed $v \in V$ and $\psi \in W^*$, define the intertwiner $T(w) := \int_G \psi(\sigma(g^{-1})w)\,\rho(g)v\,d\mu(g)$. Left invariance of $\mu$ implies $\rho(h)T(w) = T(\sigma(h)w)$ for all $h \in G$. In part 1, Schur's lemma forces $T = 0$ because $\rho$ and $\sigma$ are irreducible and inequivalent, so applying $\varphi$ gives zero. In part 2, Schur's lemma over $\mathbb{C}$ forces $T = c\,I_V$ for a scalar $c \in \mathbb{C}$; taking the trace of both sides and using $\operatorname{Tr}(\rho(g)\circ (v\otimes\psi)\circ\rho(g^{-1})) = \psi(v)$ yields $c\,\dim_{\mathbb{C}} V = \mu(G)\,\psi(v)$, and evaluating $\varphi(T(w))$ gives the stated formula. The full proof is checked by the Lean kernel.
:::

Now watch how the four-angle selection rule of [@def-ou-ch02-dual-clocks] turns actual Riemann zeros into exact Haar samples (`ARGUED / EXT-LEAN`; see the [gauge-integration study](https://github.com/the-omega-institute/trureturing-experiments/blob/ba0ac9539cdb641744054bf3a0398494f4cba1c8/experiments/ch39-omega-research/replay/ch39-%E9%9B%B6%E7%82%B9%E4%B8%8E%E6%A0%87%E5%87%86%E6%A8%A1%E5%9E%8B%E8%A7%84%E8%8C%83%E7%BE%A4%E7%A7%AF%E5%88%86.md)):

1. **Constant Haar volume density on the $(x, y, z)$ body:** For two independent Haar-random unit quaternions $U, V$, each scalar part has semicircle density $\frac{2}{\pi}\sqrt{1 - x^2}\,dx$; given $x$ and $y$, the two unit imaginary axes are independent and uniform on $S^2$, so their inner product $\cos\psi$ is uniform on $[-1, 1]$. Under $z = xy + \sqrt{(1-x^2)(1-y^2)}\cos\psi$, the square-root factors cancel completely, leaving a **constant volume density $2/\pi^2$** over the entire admissible convex body!
2. **Optimal relative density $1/(2\pi)$:** When $p, q, v$ are uniform angles, $x = \cos p$, $y = \cos q$, and $\cos v$ follow arcsine laws. Converting them to the constant Haar density requires the normalized Jacobian weight

   $$
   w(p, q, v) = 2\pi\sin^2 p\,\sin^2 q\,|\sin v| = 2\pi\sqrt{1 - x^2}\sqrt{1 - y^2}\sqrt{E}.
   $$

   The fourth independent chord angle $u = \{\theta_{200}\gamma / (2\pi)\}$ converts this weight into a parameter-free rejection threshold: $u < w/(2\pi) = \sin^2 p\,\sin^2 q\,|\sin v|$. Under classical RH (`EXT-LEAN`), Landau's explicit formula yields $\sum_{0 < \gamma \le T} e^{i\lambda\gamma} = O_\lambda(T) = o(N(T))$ for every fixed real $\lambda \neq 0$. By Weyl's criterion, all $22$ rationally independent shell phases jointly equidistribute on $\mathbb{T}^{22}$; because the selection boundary has measure zero, the selected subsequence has **exact relative density**

   $$
   \rho_{\max} = \frac{1}{2\pi} \approx 0.159154943091895\ldots
   $$

   This density is strictly **optimal** under this parameterization: any subsequence of density $r$ converging to Haar measure must satisfy $r\,w \le 1$ almost everywhere against nonnegative continuous test functions, and $\operatorname{ess\,sup} w = 2\pi$ forces $r \le 1/(2\pi)$. In direct numerical replay without offsets, the first $128$ positive zeros yield $16$ hits, beginning at indices **$8, 15, 28, 31, 38, 50$** (`CERT`).
3. **Full 22-frequency allocation to $G = \mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3)$:** Every single one of the $22$ shell frequencies earns its keep. Four angles build $(U, V)$ and the selection threshold $u$; $\theta_{32}$ and $\theta_{52}$ furnish two independent $\mathrm{U}(1)$ phases; the remaining **$16$ native frequencies** (squared chords $56, 68, 72, 152, 172, 216, 224, 244, 292, 296, 372, 392, 504, 512, 544, 632$) split into two $8$-tuples, each generating an independent Haar-distributed $\mathrm{SU}(3)$ matrix via simplex weights $(1-\sqrt{1-s}, \sqrt{1-s}\,t, \sqrt{1-s}(1-t))$, three phases forming a uniform unit column $v \in S^5 \subset \mathbb{C}^3$, conjugate cross-product completion $S(v) \in \mathrm{SU}(3)$, and right multiplication by a Haar stabilizer $\operatorname{diag}(1, H)$ ($H \in \mathrm{SU}(2)$). Thus for every continuous simultaneously conjugation-invariant $F : G^2 \to \mathbb{C}$ (and any finite central quotient such as $G/\mathbb{Z}_6$), unweighted averages along this **same density-$1/(2\pi)$ zero subsequence** converge to $\int_{G^2} F(g, h)\,dg\,dh$.
4. **Odd-center-twisted 2D $\mathrm{SU}(2)$ heat-kernel weights:** By [@thm-ou-ch02-schur-orthogonality], $\int \chi_n(UVU^{-1}V^{-1})\,dU\,dV = 1/(n+1)$, so the one-plaquette odd-center-twisted heat kernel $K_t(-[U, V])$ (where $K_t(g) = \sum_{n\ge 0}(n+1)e^{-n(n+2)t}\chi_n(g)$) has partition function and identity peak

   $$
   Z_-(t) = \sum_{n \ge 0} (-1)^n e^{-n(n+2)t}, \qquad K_t(I) = \sum_{n \ge 0} (n + 1)^2 e^{-n(n+2)t}.
   $$

   Tightening the selection inequality to $u < w K_t(-[U, V]) / (2\pi K_t(I))$ produces unweighted zero samples of this interacting measure at maximum relative density $Z_-(t) / (2\pi K_t(I))$, scaling by Poisson summation as $(t/\pi)^{3/2}$ as $t \downarrow 0$ (`ARGUED / CERT`):

| Dimensionless Heat Time $t$ | Odd-Twisted Partition Integral $Z_-(t)$ | Max Achievable Zero Density $Z_-(t)/(2\pi K_t(I))$ |
| :---: | :---: | :---: |
| $1/4$ | $0.64177727725\ldots$ | $0.02244015826\ldots$ |
| $1$ | $0.95054808840\ldots$ | $0.12584254589\ldots$ |
| $2$ | $0.99752136036\ldots$ | $0.15720164049\ldots$ |

## 2.4 Splitting Primes on the Shortest Arc and Area-Law Density Collapse {#sec-ou-2-4}

Twenty-two frequencies suffice for two Standard Model group elements. To integrate over an arbitrarily large finite lattice gauge graph, must we abandon the 19-point shell?

No—**the single shortest native arc $d^2 = 12$ between $P = (11, 11, 25)$ and $Q = (13, 13, 23)$ already contains infinitely many new rational subdivision angles $\mathbb{Q}$-linearly independent of one another and of all $22$ original frequencies** (`ARGUED / CERT`).

The construction is a miniature gem of algebraic number theory. In the symmetry plane $x_1 = x_2$, represent shell points by $z + x\sqrt{-2}$ with norm $z^2 + 2x^2 = 867$. The ring $\mathbb{Z}[\sqrt{-2}]$ is norm-Euclidean (nearest-integer rounding leaves remainder norm at most $1/4 + 2/4 = 3/4 < 1$). Pick any $m$ rational primes $p_j \equiv 1 \pmod 8$ ($p_j \neq 17$); every such prime splits in $\mathbb{Z}[\sqrt{-2}]$ as $p_j = \pi_j \bar{\pi}_j$. For any mesh cap $h > 0$, set $K = \lceil 4\pi\max(m, h^{-1})/\theta_{12}\rceil$. By Dirichlet pigeonhole approximation on the circle, there exist nonzero integers $|k_j| \le K$ such that each unit-norm rational phase $(\pi_j / \bar{\pi}_j)^{k_j}$ has positive argument at most $2\pi/K$, summing to at most $\theta_{12}/2$ so every rotated rational point stays strictly inside the arc $PQ$. Because the denominators of the original $22$ shell phases involve only the primes $2, 3, 17$, each new phase $(\pi_j / \bar{\pi}_j)^{k_j}$ has valuation $+k_j$ at $(\pi_j)$, $-k_j$ at $(\bar{\pi}_j)$, and zero at every other prime ideal; testing one prime ideal $(\pi_j)$ above each distinct rational prime $p_j$ therefore forces full $\mathbb{Q}$-linear independence! Recursively choosing infinitely many splitting primes supplies a countable independent frequency table capable of generating product Haar measures on any finite lattice graph. The exact integer coordinate cost is nevertheless steep: for $m = 12$ and $h = 0.01$, the $12$ new segments consume just $2.30222\%$ of the arc $PQ$, yet clearing denominators demands a common integer scale factor with **$360{,}297$ decimal digits**.

A far sharper physical boundary emerges when we impose an **interacting two-dimensional heat-kernel area law** on a disk tiled by $N$ equal-area plaquettes of total heat time $t$, with normalized plaquette weight $\prod_{f=1}^N K_{t/N}(g_f)$:

- **Fixed-coordinate rejection sampling collapses super-exponentially:** If we keep the independent Haar plaquette coordinates fixed and merely filter zeros to obtain the interacting density, the maximum attainable relative density is $\rho_N = K_{t/N}(I)^{-N}$. Poisson summation for $\mathrm{SU}(2)$ yields

  $$
  \log \rho_N \;=\; -\frac{3}{2} N\log N \;+\; N\log\!\left(\frac{4t^{3/2}}{\sqrt{\pi}}\right) \;-\; t \;+\; o(1).
  $$

  As $N \to \infty$, the surviving zero density plunges like $N^{-3N/2}$: **no positive-density zero subsequence can simultaneously realize arbitrarily fine interacting marginals on fixed Haar coordinates** (`ARGUED`).
- **Conditional heat-kernel subdivision preserves the area law zero by zero:** Conversely, encoding the area action directly into the map from new independent angles to sub-plaquettes—sampling the root plaquette from $K_t(g)\,dg$ and subdividing any face of heat time $s + s'$ using three fresh angles drawn from the exact conditional law

  $$
  h \sim \frac{K_s(h)\,K_{s'}(h^{-1}g)}{K_{s+s'}(g)}\,dh, \qquad (g_1, g_2) = (h,\; h^{-1}g)
  $$

  —preserves the exact convolution law, enforces $g_1 g_2 = g$ **at every single zero**, yields consistent cylinder laws across all finite dyadic subdivisions, and reproduces the exact Wilson-loop area law $e^{-n(n+2)\tau A}$ in every irreducible representation $n$. Honestly stated, however, RH and integer arcs furnish only the deterministic sampler; the string tension $\tau$ and the 2D lattice action remain external inputs (`MODEL`).

## 2.5 Finite Wilson Diffusion Criteria: Testing $D = 0$ Unification Against $1\,\mathrm{TeV}$ Inputs {#sec-ou-2-5}

We close this chapter by testing how finitely many Wilson-loop observables constrain unification dynamics on the quotient group $G = (\mathrm{U}(1)\times\mathrm{SU}(2)\times\mathrm{SU}(3))/\mathbb{Z}_6$ (with integer hypercharge $q = 6Y$). Consider any conjugation- and inversion-invariant convolution semigroup of plaquette distributions converging weakly to the identity as area $A \downarrow 0$. Every irreducible representation $R$ obeys $W_R(A) = \exp(-A\lambda_R)$.

Take the faithful quark doublet $Q = (q = 1, \mathbf{2}, \mathbf{3})$ ($\dim Q = 6$), write $\phi_Q := \operatorname{Re}\operatorname{tr} Q / 6$, and inspect the fourth-order test function $f := (1 - \phi_Q)^2$, which vanishes solely at the identity up to third order. Decomposing $Q \otimes Q$ and $Q \otimes \bar{Q}$ into their eight irreducible summands yields the nonnegative **jump-defect functional** (`ARGUED`):

$$
D \;:=\; \lim_{a \downarrow 0} \frac{\mathbb{E}_a[f]}{a} \;=\; 2\lambda_Q - \frac{1}{72}\sum_{R \subset Q\otimes Q\text{ or }Q\otimes\bar{Q}} (\dim R)\,\lambda_R \;\ge\; 0.
$$

This single finite combination acts as a precision stethoscope for gauge dynamics:

1. **$D = 0$ uniquely forces pure quadratic Casimir diffusion:** Faithfulness of $Q$ implies $1 - \phi_Q \asymp |X|^2$ in Lie-algebra coordinates near the identity. Hence $D = 0$ kills both finite jumps and fourth moments at $o(a)$, locking the entire semigroup to three quadratic diffusion coefficients $(a_Y, a_2, a_3)$: for every admissible representation $(q, j; p, r)$ (satisfying $q + 6j + 2(p + 2r) \equiv 0 \pmod 6$),

   $$
   \lambda_{q, j; p, r} \;=\; a_Y q^2 \;+\; a_2\,j(j + 1) \;+\; \frac{a_3}{3}(p^2 + r^2 + pr + 3p + 3r).
   $$

   Conversely, any jump measure $\nu$ gives $D = \int f\,d\nu$ and bounds jumps of Hilbert–Schmidt amplitude $\|Q(g) - I\|_{\mathrm{HS}} \ge u$ by at most $144 D / u^4$.
2. **Finite Wilson unification identities vs. $1\,\mathrm{TeV}$ experimental inputs:** Let $C, W, e$ denote the hypercharge-zero color adjoint, the hypercharge-zero weak adjoint, and the $q = 6$ singlet lepton, whose decay rates are $3a_3$, $2a_2$, and $36a_Y$. Under the canonical normalization $g_1^2 = \frac{5}{3}g_Y^2$, equal gauge couplings correspond to $a_Y : a_2 : a_3 = 1/60 : 1 : 1$. Under $D = 0$, **coupling unification is therefore equivalent to two parameter-free Wilson identities**:

   $$
   W_C(A)^2 = W_W(A)^3, \qquad W_e(A)^{10} = W_W(A)^3 \qquad \Longleftrightarrow \qquad \frac{\lambda_C}{\lambda_W} = 1.5, \quad \frac{\lambda_e}{\lambda_W} = 0.3.
   $$

   Plug the actual $1\,\mathrm{TeV}$ Standard Model couplings directly into this two-dimensional heat-diffusion ansatz and the verdict is immediate:

   $$
   \frac{\lambda_C}{\lambda_W} \approx 4.1259\;\;(4.12589\ldots), \qquad \frac{\lambda_e}{\lambda_W} \approx 0.1610\;\;(0.160993\ldots),
   $$

   far outside $(1.5,\; 0.3)$! The Haar integrator itself lets $(a_Y, a_2, a_3)$ vary freely; it never hands us high-scale unification for free, nor can it replace four-dimensional renormalization-group running (the subject of [Volume II](ch04-gauge-crossings-and-monotone-barriers.md)).
3. **A sharp color-weak correlation bound:** Letting $CW$ denote the outer tensor product of the color and weak adjoints, the elementary inequality $(1 - u^2)(1 - v^2) \le (1 - uv)^2$ yields $(1 - \phi_C)(1 - \phi_W) \le \frac{3}{2}(1 - \phi_Q)^2$ and hence

   $$
   0 \;\le\; \lambda_C + \lambda_W - \lambda_{CW} \;\le\; \frac{3}{2} D,
   $$

   with the constant $3/2$ attained exactly by compound Poisson jumps on the zero-fundamental-trace conjugacy classes.

::: {.example #ex-ou-ch02-commutator-and-wilson title="Hand Check of D = 0 on the Eight-Summand Quark Decomposition"}
Substitute the quadratic Casimir law $\lambda_{q,j;p,r}$ directly into $D$ to verify exact cancellation across all three gauge factors. For the quark doublet $Q = (1, \frac{1}{2}; 1, 0)$, we have $\lambda_Q = a_Y + \frac{3}{4}a_2 + \frac{4}{3}a_3$, so $2\lambda_Q = 2a_Y + \frac{3}{2}a_2 + \frac{8}{3}a_3$. Meanwhile $Q \otimes Q$ splits into $(q = 2,\; \mathbf{1}\oplus\mathbf{3},\; \bar{\mathbf{3}}\oplus\mathbf{6})$ (dimensions $3 + 6 + 9 + 18 = 36$) and $Q \otimes \bar{Q}$ splits into $(q = 0,\; \mathbf{1}\oplus\mathbf{3},\; \mathbf{1}\oplus\mathbf{8})$ (dimensions $1 + 8 + 3 + 24 = 36$), totaling $72$. Averaging sector by sector:

- **$a_Y$ sector:** only $Q \otimes Q$ carries $q^2 = 4$, giving $\frac{36 \times 4}{72} = 2$;
- **$a_2$ sector:** weak triplets ($j(j+1) = 2$) total $(9 + 18) + (3 + 24) = 54$ dimensions, giving $\frac{54 \times 2}{72} = \frac{3}{2}$;
- **$a_3$ sector:** color Casimirs are $0$ ($\mathbf{1}$), $\frac{4}{3}$ ($\bar{\mathbf{3}}$, dim $12$), $\frac{10}{3}$ ($\mathbf{6}$, dim $24$), and $3$ ($\mathbf{8}$, dim $32$), giving $\frac{12\cdot(4/3) + 24\cdot(10/3) + 32\cdot 3}{72} = \frac{16 + 80 + 96}{72} = \frac{192}{72} = \frac{8}{3}$.

All three coefficients match $2\lambda_Q$ identically, so $D \equiv 0$; any non-local jump measure pushes $D$ strictly positive.
:::

We have seen how dual quaternion clocks and $22$ independent shell frequencies turn Riemann zeros into a non-commutative spectral probe and an optimal Standard Model Haar integrator.

::: {.film src="two-quaternion-clocks"}
**Two quaternion clocks: the commutator defect, the Gram body, Hurwitz words and zeros as dice (2 min 48 s).** The cyan axis of $U = (1 + 2i)/\sqrt{5}$ and the magenta axis of $V = (1 + 2j)/\sqrt{5}$ span a white parallelogram, and the amber normal $u \times v$ marks the commutator defect $E = 16/25$; the ledger shows $x = y = 1/\sqrt{5}$, $z = 1/5$ and $|UV - VU|^2 = 4E = 64/25$ (computed on screen). The cyan wireframe is the admissible $(x, y, z)$ body, its skin $E = 0$ is where the clocks commute, and the amber dot is the sample; the green labels are the nonnegative three-anchor Gram determinant and the Lie-triple curvature identity ([@thm-ou-ch02-bargmann-gram]), with the worked values $16/25$ and $16$ computed on screen. The dots on the sphere are the images of the $x$-axis under the $186$ reduced Hurwitz words of length at most $3$, whose $186$ frames are all distinct (computed on screen); the green label is adjoint injectivity of reduced words ([@thm-ou-ch02-free-group-f3]). The violet panels are inverse spectral uniqueness and the doubling of the spectrum exactly when $E = 0$ (written argument); the closed-walk triangles and the shell ring are schematic, and the cyan panel is the three-probe interval certificate $\operatorname{Lip}_\infty \le 0.331$. The bar chart shows the first $128$ positive Riemann zeros: cyan bars of height $\sin^2 p\,\sin^2 q\,|\sin v|$, amber dots at $u$, and $16$ kept zeros beginning $8, 15, 28, 31, 38, 50$ (computed on screen); the limit density $1/(2\pi)$ in the violet panel rests on classical RH, an external Lean proof. The $22$ frequency tiles split $4 + 2 + 16$; the green labels are Schur orthogonality ([@thm-ou-ch02-schur-orthogonality]), from which the commutator character averages $1/(n+1)$ are argued and then recomputed exactly for $n = 0, 1, 2, 3$; the closing violet strip repeats that the zeros give a sampler, while couplings and lattice actions remain inputs (`MODEL`).
:::

Yet every equidistribution limit in this chapter relied on *asymptotic averages*. What can the Lean kernel prove *quantitatively* about harmonic phase sums, Fejér collisions, and Landau contour integrals—and which concrete finite zero windows (zeros #11431, #8236, and #8359) actually survive the physical selection cuts? That brings us to the closing chapter of Volume I: [Chapter 3](ch03-riemann-zeros-fejer-and-landau.md).
