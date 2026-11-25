# 29.5 The Infinitesimal Spherical Trihedron $\Delta\mathcal{T}_\epsilon$: Dual Projections of Once- and Twice-Orthogonal and the Curvature Quantum {#sec-ch34-infinitesimal-spherical-trihedron}

> "Orthogonal once and orthogonal twice are actually two projections of the same object—namely that spherical trihedron, an infinitesimal spherical trihedron."

In [§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), the zero-background Axiom of Comparison $\mathcal{A}_0$ locked **two-state** reciprocal fairness into $\cos^2\epsilon + \sin^2\epsilon = 1$; earlier in this chapter, we examined the macroscopic octant at $\epsilon = \frac{\pi}{2}$. What happens when we advance $\mathcal{A}_0$ from two states to the minimal non-coplanar **three-state loop** $(\mathbf{A}, \mathbf{B}, \mathbf{C})$ at an arbitrary small step $\epsilon \in (0, \frac{\pi}{2}]$?

On the unit sphere $S^2 \subset \mathbb{R}^3$ (read in this section as the single-qubit Bloch sphere: points on the sphere are pure states, points inside are mixed states), place the right-angle pivot at $\mathbf{B} = \mathbf{e}_2$ and step out by arc length $\epsilon$ along the two mutually perpendicular coordinate walls $\mathbf{e}_2 \wedge \mathbf{e}_1$ and $\mathbf{e}_2 \wedge \mathbf{e}_3$:

$$
\mathbf{B} = \mathbf{e}_2, \qquad \mathbf{A}(\epsilon) = \sin\epsilon\,\mathbf{e}_1 + \cos\epsilon\,\mathbf{e}_2, \qquad \mathbf{C}(\epsilon) = \sin\epsilon\,\mathbf{e}_3 + \cos\epsilon\,\mathbf{e}_2.
$$

Together with the sphere's origin $O$, these three unit rays bound a compact 3D solid—the **right-angled spherical trihedron cell $\Delta\mathcal{T}_\epsilon$**: three flat circular-sector walls $OBA$, $OBC$, and $OAC$ meeting at $O$, capped by an outward-bulging **magenta spherical triangle $\triangle_{\mathrm{sph}} ABC$** (contrasted against the **cyan flat Euclidean chord cut $\triangle_{\mathrm{flat}} ABC$** slicing underneath it), with oriented trivector volume

$$
\mathbf{A}(\epsilon) \wedge \mathbf{B} \wedge \mathbf{C}(\epsilon) \;=\; \sin^2\epsilon\,(\mathbf{e}_1 \wedge \mathbf{e}_2 \wedge \mathbf{e}_3).
$$

::: {.viz src="spherical-trihedron-cell" preset="cell" height="520"}
**Three flat sector walls and an outward-bulging magenta spherical cap: the trihedron cell.** Drag the amber step handle to vary $\epsilon$: the origin $O$, the pivot $B = e_2$, and $A(\epsilon)$, $C(\epsilon)$ on two perpendicular walls bound $\Delta\mathcal{T}_\epsilon$, whose magenta spherical cap $\triangle_{\mathrm{sph}} ABC$ bulges outside the cyan flat chordal cut (dual-shadow reading is this book's `MODEL`).
:::

## 29.5.1 One Solid, Two Shadows: Down the Ridge Is "Orthogonal Once," Along the Walls Is "Orthogonal Twice" {#sec-ch34-4-1}

Why did "one direct step" and "two right-angle steps" look like rival routes in [Chapter 9](ch09-axes-and-state-addressing.md) and the opening sections of this chapter? Because each route views the same 3D solid $\Delta\mathcal{T}_\epsilon$ through a single lower-dimensional projection (`MODEL`):

1. **Shadow 1 (Viewing straight down the ridge $OB = \mathbf{e}_2$, integrating out the intermediate pivot $\mathbf{B}$) $\longrightarrow$ "Orthogonal Once"**:
   Sighting along $\mathbf{B} = \mathbf{e}_2$ applies the readout projection $x \mapsto (x_1, x_3)$, under which both $O$ and $\mathbf{B}$ read $(0, 0)$ and collapse into one inseparable point by Conjunct 1 of [@thm-ch34-readout-kernel-and-covariant-commutator] (`partition_inseparable_iff_kernel`), flattening the two walls $OBA$ and $OBC$ into perpendicular legs. With $\mathbf{B}$ integrated out, all that connects the endpoints is a single **cyan direct great-circle arc $\widehat{AC}$** governed by the spherical Pythagorean cosine law:

   $$
   \mathbf{A}(\epsilon)\cdot\mathbf{C}(\epsilon) \;=\; \cos c_\epsilon \;=\; \cos^2\epsilon.
   $$

::: {.viz src="spherical-trihedron-cell" preset="once-ridge" height="520"}
**Sighting down the ridge $OB$: two walls collapse to two legs, and "orthogonal once" is one cyan arc.** Under the readout $x \mapsto (x_1, x_3)$, $O$ and $B$ share one inseparability fiber (green `LEAN ✓` `partition_inseparable_iff_kernel`), projecting the trihedron onto the direct arc $\widehat{AC}$ with $\cos c_\epsilon = \cos^2\epsilon$.
:::

2. **Shadow 2 (Projecting onto the perpendicular coordinate walls $\mathbf{e}_1\wedge\mathbf{e}_2$ and $\mathbf{e}_2\wedge\mathbf{e}_3$, filtering out the direct chord) $\longrightarrow$ "Orthogonal Twice"**:
   When an apparatus addresses states sequentially along orthogonal control axes (a length-$2$ word under `two_axis_finite_word`), it walks $\widehat{AB}$ along the first wall, turns a strict right angle $\beta \equiv 90^\circ$ at $\mathbf{B}$, and walks $\widehat{BC}$ along the second wall. In the even Clifford subalgebra $\mathcal{Cl}_{3,0}^+$, multiplying the wall rotors $U_{12}(\epsilon) = \cos\frac{\epsilon}{2} - \sin\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_2$ and $U_{23}(\epsilon) = \cos\frac{\epsilon}{2} - \sin\frac{\epsilon}{2}\,\mathbf{e}_2\mathbf{e}_3$ via $\mathbf{e}_2\mathbf{e}_3\mathbf{e}_1\mathbf{e}_2 = -\mathbf{e}_1\mathbf{e}_3$ yields

   $$
   U_{23}(\epsilon)\,U_{12}(\epsilon) \;=\; \cos^2\frac{\epsilon}{2} \;-\; \sin\frac{\epsilon}{2}\cos\frac{\epsilon}{2}\bigl(\mathbf{e}_1\mathbf{e}_2 + \mathbf{e}_2\mathbf{e}_3\bigr) \;-\; \sin^2\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_3,
   $$

   whose four blade coefficients square-sum identically to $\bigl(\cos^2\frac{\epsilon}{2} + \sin^2\frac{\epsilon}{2}\bigr)^2 \equiv 1$, while reversing step order isolates the transverse bivector $U_{23}(\epsilon)U_{12}(\epsilon) - U_{12}(\epsilon)U_{23}(\epsilon) = -2\sin^2\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_3$ (`covariant_commutator_formula` in [@thm-ch34-readout-kernel-and-covariant-commutator]).

::: {.viz src="spherical-trihedron-cell" preset="twice-walls" height="520"}
**Walking two steps along perpendicular walls: a right-angle turn at $B$ generates the transverse bivector.** Stepping along the first wall by $U_{12}(\epsilon)$ and turning $90^\circ$ into the second wall by $U_{23}(\epsilon)$ multiplies two violet wall rotors to produce the extra $-\sin^2(\epsilon/2)\,e_1e_3$ component (the rotor product is a hand computation; green `LEAN ✓` `two_axis_finite_word` and `covariant_commutator_formula` guarantee only the related general lemmas).
:::

## 29.5.2 Fair Squaring Bulges the Magenta Spherical Cap: Girard Excess and the Seed of Curvature {#sec-ch34-4-2}

Why must the cap bulge outward as a curved **magenta spherical triangle $\triangle_{\mathrm{sph}} ABC$** instead of lying flat? Because unit-norm fairness $\|\mathbf{x}\|^2 = 1$ ([Chapters 27](ch31-quantum-fairness.md) and [28](ch32-unified-field-and-meta-unification.md)) forbids cutting corners through the interior of the ball!

Compare the cyan flat Euclidean chord triangle $\triangle_{\mathrm{flat}} ABC$ against the magenta spherical cap $\triangle_{\mathrm{sph}} ABC$ (spherical trigonometry and Girard's formula belong to classical geometry; see [@rem-ch34-regge-spinfoam-trihedron-literature] below):

- **Slicing flat across chords ($\triangle_{\mathrm{flat}} ABC$)**: With leg chords $2\sin\frac{\epsilon}{2}$ and base chord $\sqrt{2}\sin\epsilon$, Euclidean angles sum to $\alpha_{\mathrm{flat}} + \beta_{\mathrm{flat}} + \gamma_{\mathrm{flat}} = \pi$; the law of cosines gives $\cos\beta_{\mathrm{flat}} = \sin^2\frac{\epsilon}{2} > 0$, pinching the apex below a right angle ($\beta_{\mathrm{flat}} < 90^\circ$) while every interior point drops below unit norm ($\|\mathbf{x}\| < 1$).
- **Preserving unit norm everywhere ($\triangle_{\mathrm{sph}} ABC$)**: Projecting radially back onto $\|\mathbf{x}\|^2 = 1$ restores the exact dihedral right angle $\beta = \frac{\pi}{2}$ at $\mathbf{B}$ and, for $\epsilon \in (0, \frac{\pi}{2})$, inflates both base angles by Napier's tangent rule:

  $$
  \tan\alpha \;=\; \tan\gamma \;=\; \frac{\tan\epsilon}{\sin\epsilon} \;=\; \sec\epsilon > 1 \;\Longrightarrow\; \alpha = \gamma = \arctan(\sec\epsilon) = \frac{\pi}{4} + \frac{\epsilon^2}{4} + O(\epsilon^4) > \frac{\pi}{4},
  $$

  extending continuously as $\epsilon \to \frac{\pi}{2}^-$ to the octant right-angle value $\alpha(\frac{\pi}{2}) = \gamma(\frac{\pi}{2}) = \frac{\pi}{2}$ (equivalently $\alpha(\epsilon) = \operatorname{atan2}(1, \cos\epsilon)$ on all of $(0, \frac{\pi}{2}]$). By **Girard's spherical excess theorem**, the three interior angles exceed $\pi$ across $(0, \frac{\pi}{2}]$ by a strictly positive solid angle:

  $$
  \Omega(\epsilon) \;=\; \alpha + \beta + \gamma - \pi \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + \frac{\epsilon^4}{12} + O(\epsilon^6) > 0 \quad \Bigl(\text{equal to }2\arctan(\sec\epsilon)-\frac{\pi}{2}\text{ for }\epsilon \in (0,\tfrac{\pi}{2})\Bigr).
  $$

Here precision requires keeping two closely related rotor quantities mathematically distinct:

1. **Homological Boundary and Exact Geodesic-Loop Holonomy (exact for every $\epsilon \in (0, \frac{\pi}{2}]$, literature result)**: Homologically, the magenta cap bounds the difference between the two-step and one-step paths, $\partial(\triangle_{\mathrm{sph}} ABC) = (\widehat{AB} + \widehat{BC})_{\mathrm{twice}} - (\widehat{AC})_{\mathrm{once}}$. Parallel transport once around the closed geodesic loop $\mathbf{A} \to \mathbf{B} \to \mathbf{C} \to \mathbf{A}$ rotates tangent vectors by $+\Omega(\epsilon)$ (Gauss–Bonnet), while multiplying all three edge rotors $U_{CA}\,U_{23}\,U_{12}$ in $\mathcal{Cl}_{3,0}^+$ yields the exact **Pancharatnam–Berry geodesic holonomy** for **every** $\epsilon \in (0, \frac{\pi}{2}]$:

   $$
   R_{\triangle}(\epsilon) \;=\; \exp\!\left(-\frac{1}{2}\Omega(\epsilon)\,\hat{\mathbf{I}}_{\mathbf{A}}\right),
   $$

   where $\hat{\mathbf{I}}_{\mathbf{A}}$ is the unit tangent bivector at $\mathbf{A}(\epsilon)$.
2. **Quadratic Agreement and Fourth-Order Separation Between Unclosed Wall Rotors and Closed-Loop Half-Excess**: Meanwhile, the unclosed two-wall rotor product $U_{23}(\epsilon)U_{12}(\epsilon)$ carries transverse coefficient $-\sin^2\frac{\epsilon}{2} = -\frac{\epsilon^2}{4} + \frac{\epsilon^4}{48} + O(\epsilon^6)$, whereas the closed-loop spinor half-excess equals $-\frac{1}{2}\Omega(\epsilon) = -\frac{\epsilon^2}{4} - \frac{\epsilon^4}{24} + O(\epsilon^6)$. As $\epsilon \to 0^+$, the two **agree in magnitude at leading quadratic order $O(\epsilon^2)$** (on the same blade $\mathbf{e}_1\mathbf{e}_3$ they have opposite signs) while separating at fourth order $O(\epsilon^4)$ for finite $\epsilon$: at the macroscopic octant endpoint $\epsilon = \frac{\pi}{2}$, for instance, the unclosed two-wall product has transverse component $-\sin^2\frac{\pi}{4} = -\frac{1}{2}$, whereas left-multiplying by the third closing geodesic edge rotor $U_{CA}(\frac{\pi}{2})$ in $U_{CA}(\frac{\pi}{2})\,U_{23}(\frac{\pi}{2})\,U_{12}(\frac{\pi}{2})$ restores the exact octant spinor Berry phase $-\frac{1}{2}\Omega(\frac{\pi}{2}) = -\frac{\pi}{4} \approx -0.7854$ corresponding to $\Omega(\frac{\pi}{2}) = \frac{\pi}{2}$ in [@ex-ch34-spherical-addressing-and-octant-rotors]!

This 2-cochain face defect wedged between two-step and one-step comparison is the common geometric seed (`Literature` + `MODEL` synthesis) of non-Abelian angular momentum $[\hat{J}_{12}, \hat{J}_{23}] = i\hbar\hat{J}_{31}$, Berry phase $-\frac{1}{2}\Omega$, Yang–Mills curvature $F_{\mu\nu} = [D_\mu, D_\nu]$, and the Riemann curvature tensor $R^\rho_{\ \sigma\mu\nu}$.

::: {.viz src="spherical-trihedron-cell" preset="cap-excess" height="520"}
**The angle $\Omega(\epsilon)$ added by the magenta cap turns an arrow carried round the loop.** Sweep the loop slider $t$ around $A \to B \to C \to A$: a parallel-transported tangent vector comes back turned by Girard's excess $\Omega(\epsilon) = 2\arctan(\tan^2(\epsilon/2))$, while the closed-loop spinor rotor records half that angle, $-\Omega(\epsilon)/2$ (`ARGUED`).
:::

The three inner products and the magenta cap also fit inside a single complex number. Feeding the three rays into the single-qubit three-point Bargmann trace of [§29.7](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral) (item 1 of [@thm-ch34-berry-sector-holonomy-and-bargmann-lift]) gives $\operatorname{Tr}\bigl(P(\mathbf{A})P(\mathbf{B})P(\mathbf{C})\bigr) = \frac{(1+\cos\epsilon)^2}{4} + i\,\frac{\sin^2\epsilon}{4}$: the real part holds only the three inner products, and the one-step $\cos^2\epsilon$ is exactly the product of the two-step inner products $\cos\epsilon$; the imaginary part is a quarter of the oriented volume $\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C}) = \sin^2\epsilon$; and the argument satisfies $\tan(\arg) = \tan^2\frac{\epsilon}{2}$, so it is exactly half the excess, $\frac{1}{2}\Omega(\epsilon)$ (hand derivation).

::: {.film src="minimal-arc-trihedron"}
**One step or two, one tiny cell (2 min 27 s).** From $A$ to $C$ on the sphere, the cyan great arc takes one step, while the white route takes two steps along two walls with a right-angle turn at $B$; adding the centre $O$, three flat walls and a magenta cap close into one small cell. Seen straight down the edge $OB$, $B$ hides behind $O$, the two walls flatten into two legs, and the only arc left on the sphere is the cyan one; seen along the walls, it shows two steps and a corner. Reading these as two shadows of one cell is the book's interpretation (`MODEL`). With steps of $45^\circ$ the two steps have dot product $0.707$ each and the direct step has $0.500 = 0.707^2$; the oriented volume $\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C}) = 0.500$ is six times the violet tetrahedron $OABC$, and the three dot products together fix its size but not its orientation. The trace of the three projectors has real part (cyan) one plus the three dot products over $4$ and imaginary part (violet) the oriented volume over $4$, here $0.729 + 0.125\,i$ (item 1 of [@thm-ch34-berry-sector-holonomy-and-bargmann-lift]); writing each projector as $\lvert A\rangle\langle A\rvert$ for its spinor is a hand step, while item 2 guarantees that the trace of such a spinor chain is the product of the overlaps around the loop, of sizes $0.924 \times 0.924 \times 0.866 = 0.739$. The magenta angle of the trace, $9.74^\circ$, is exactly half the cap's excess of $19.47^\circ$; at a step of $90^\circ$ the trace is $(1+i)/4$ and the cap fills an octant, and at $15^\circ$ the angle is about $1^\circ$. The excess formula is Girard's classical literature result, while "flatness is curvature measured with too coarse a ruler" is an interpretive maxim; every number in the film is computed on screen.
:::

## 29.5.3 Why the Trihedron Must Be Infinitesimal: Dimension-Opening Volume Brick, Flat Illusion, and the Discrete Sphere {#sec-ch34-4-3}

Calling $\Delta\mathcal{T}_\epsilon$ an **infinitesimal** spherical trihedron ($\epsilon \ll 1$) captures three decisive physical mechanisms:

1. **The First 3D Volume Brick of Dimension Expansion ($D \to D + 1$)**:
   Two coplanar steps inside $\mathbf{e}_1\wedge\mathbf{e}_2$ give $\mathbf{A}_{\mathrm{cop}}\cdot\mathbf{C}_{\mathrm{cop}} = \cos 2\epsilon$ and $\det G_{\mathrm{coplanar}} \equiv 0$, trapping the states in 2D. Turning $90^\circ$ into a perpendicular wall (`finite_layer_projection_escape` in Conjunct 4 of [@thm-ch34-trihedron-cochain-and-moving-axis]) lifts the three-state Gram determinant to a strictly positive fourth power:

   $$
   \det G(\Delta\mathcal{T}_\epsilon) \;=\; \det\begin{pmatrix} 1 & \cos\epsilon & \cos^2\epsilon \\ \cos\epsilon & 1 & \cos\epsilon \\ \cos^2\epsilon & \cos\epsilon & 1 \end{pmatrix} \;=\; (1 - \cos^2\epsilon)^2 \;=\; \sin^4\epsilon \;>\; 0 \quad \bigl(\forall\epsilon \in (0, \tfrac{\pi}{2}]\bigr),
   $$

   opening a **violet 3D parallelepiped Gram volume brick** $\sqrt{\det G} = \sin^2\epsilon > 0$ (chordal tetrahedron volume $\frac{1}{6}\sin^2\epsilon$, spherical sector volume $\frac{1}{3}\Omega(\epsilon)$) for every $\epsilon \in (0, \frac{\pi}{2}]$.
2. **Macroscopic Flat Pythagoras Illusion vs. Microscopic Curvature Quantum**:
   Expanding the direct spherical hypotenuse $c_\epsilon = \arccos(\cos^2\epsilon)$ for $\epsilon \ll 1$ gives

   $$
   c_\epsilon \;=\; \arccos(\cos^2\epsilon) \;=\; \sqrt{2}\,\epsilon\!\left(1 - \frac{\epsilon^2}{12} + O(\epsilon^4)\right) \;<\; \sqrt{2}\,\epsilon.
   $$

   At leading order $O(\epsilon)$, the sphere mimics flat Euclidean Pythagoras $\sqrt{2}\,\epsilon$, hiding both its hypotenuse contraction $-\frac{1}{12}\epsilon^2$ and its spherical excess $\Omega(\epsilon) \sim \frac{1}{2}\epsilon^2$ at quadratic order $O(\epsilon^2)$. Conversely, under bounded observer bandwidth (`MODEL`), a nonzero minimum step $\epsilon_{\min} > 0$ forbids infinite flat subdivision and leaves an irreducible **curvature and phase quantum** $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$.

::: {.viz src="spherical-trihedron-cell" preset="gram-brick" height="520"}
**Coplanar two-steps hold zero volume; the right-angled trihedron opens a violet 3D Gram brick.** Contrasting coplanar steps ($\det G = 0$) against the orthogonal trihedron ($\det G = \sin^4\epsilon > 0$, violet volume brick $\sin^2\epsilon$) shows how small $\epsilon$ mimics flat $\sqrt{2}\epsilon$ while a schematic grey $\epsilon_{\min}$ band marks the discrete step model (the Gram determinant is a hand computation; `LEAN ✓` `unit_perpendicular_pair`, `lagrange_gram_identity`, and `finite_layer_projection_escape` guarantee only the related general lemmas).
:::

3. **"The Sphere Is Always an Approximation": Discrete Trihedral Tiling and the Octant Limit**:
   In gravitational physics, Regge calculus (1961) and spin-foam quantum gravity assemble curved spacetime from flat simplices carrying hinge defects ([@rem-ch34-regge-spinfoam-trihedron-literature]); within our book's `MODEL`, this joins [Chapter 21](ch21-diagonalization-and-escape.md)'s polyhedral approximation of spheres and [§35.6](ch39-s05-pisot-clifford-rauzy.md#sec-ch39-pisot-clifford-rauzy)'s $K = 3$ Tribonacci Rauzy fractal torsion—every smooth sphere is a macroscopic envelope stitched from elementary trihedra $\Delta\mathcal{T}_\epsilon$. Pushing the amber slider all the way up to $\epsilon = \frac{\pi}{2}$ expands the microscopic cell seamlessly into the full octant of §29.2 ($c = \frac{\pi}{2},\; \Omega = \frac{\pi}{2},\; \det G = 1$)!

::: {.viz src="spherical-trihedron-cell" preset="octant-limit" height="520"}
**Growing the step to $90^\circ$: the elementary cell becomes the whole octant.** At $\epsilon = 90^\circ$, $A = e_1$, $B = e_2$, and $C = e_3$ stand pairwise orthogonal, the magenta cap covers the full first octant ($\Omega = \pi/2$), and the violet Gram brick fills the unit cube ($\det G = 1$).
:::

## 29.5.4 Formal Theorem on Simplicial Two-Cochain Repair and Moving-Axis Propagation, with Worked Benchmark {#sec-ch34-4-4}

Four frozen theorems in `trureturing` formalize when a multi-vertex triangle $2$-cochain splits globally into one-step versus two-step edge potentials and how local two-axis invariance propagates across all of $\mathrm{SO}(3)$:

::: {.theorem #thm-ch34-trihedron-cochain-and-moving-axis title="Simplicial Two-Cochain Exactness, Moving-Axis Rotation Propagation, Lagrange-Gram Identity, and Orthogonal Residual Escape" lean="D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
Across the frozen simplicial-cochain-repair, two-axis-rotation, quantum-bounds, and orthogonal-escape modules of `trureturing`, the following four theorems hold simultaneously:

1. **Tetrahedral Coboundary Criterion for Two-Cochain Repair and Exactness** ([`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)): On a finite nonempty vertex type $V$ with additive abelian group $A$ and triangle $2$-cochain $F : V \to V \to V \to A$: (a) $\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$, so there exists $r \in V$ with $\lvert V\rvert \cdot \operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)$; (b) for every $1$-cochain $\mathrm{edge} : V \to V \to A$, $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})$; and (c) $F(i, j, k)$ splits as the exact coboundary comparing two-step $\mathrm{edge}(i, j) + \mathrm{edge}(j, k)$ against one-step $\mathrm{edge}(i, k)$ if and only if its tetrahedral $3$-coboundary vanishes identically:

   $$
   \bigl(\forall r, i, j, k \in V,\; F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) = 0\bigr) \;\Longleftrightarrow\; \exists\,\mathrm{edge},\; \forall i, j, k,\; F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j);
   $$

2. **Propagation of Moving Two-Axis Circle Invariance to Full $\mathrm{SO}(3)$** ([`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance)): On $\mathbb{R}^3$, if $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$ and $F : (\mathbb{R}^3 \times \mathbb{R}^3) \to Y$ is invariant along the moving axis circles $\operatorname{axisCircle}(O a) \cup \operatorname{axisCircle}(O b)$ at $\operatorname{rotatePair}(O, p)$ for every $O \in \mathrm{SO}(3)$, then $F(\operatorname{rotatePair}(R, p)) = F(p)$ holds for every $R \in \mathrm{SO}(3)$;

3. **Lagrange–Gram Area-Deficit Identity** ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)): For any finite index set $s$ and $u, v : \iota \to \mathbb{R}$, $(\sum_i u_i^2)(\sum_i v_i^2) - (\sum_i u_i v_i)^2 = \frac{1}{2}\sum_{i,j}(u_i v_j - u_j v_i)^2$;

4. **Unit Orthogonal Residual Escape** ([`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)): Let $V$ be a real or complex Hilbert space (a complete inner-product space, automatic in finite-dimensional $\mathbb{R}^3$) and let $S \subseteq V$ be a closed linear subspace satisfying $S^\perp \neq \{0\}$. Then there exists $e \in S^\perp$ with $\lVert e\rVert = 1$, $P_S(e) = 0$, $\operatorname{infDist}(e, S) = 1$, and $\lVert \operatorname{id} - P_S\rVert = 1$.
:::

::: proof
Conjunct 1 double-counts four-face tetrahedral incidences to obtain the pigeonhole averaging bound and proves that a $2$-cochain $F$ on $V$ equals an exact $1$-cochain coboundary $F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)$ globally on $V$ if and only if its four-vertex tetrahedral $3$-coboundary vanishes identically (constructed explicitly via $\mathrm{edge}(u, v) = F(r_0, u, v)$ at an anchor $r_0$ when that $3$-coboundary is zero; conversely, whereas a single nonzero face value on three isolated vertices can always be absorbed into a $1$-cochain, global non-exactness against arbitrary $1$-cochains requires a multi-vertex $2$-cochain with non-vanishing tetrahedral defects $\operatorname{tetraDefects}(F) > 0$, distinct from the parallel-transport holonomy $\Omega(\epsilon)$ of a single geodesic loop). Conjunct 2 combines the positive wedge area given as a hypothesis with `two_axis_finite_word`, inducting over finite two-axis rotation words to lift local wall invariance across all of $\mathrm{SO}(3)$. Conjunct 4 provides a unit orthogonal escape vector lifting $\mathbf{C}(\epsilon)$ out of the first wall plane $\operatorname{span}\{\mathbf{e}_1, \mathbf{e}_2\}$. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch34-infinitesimal-trihedron-calculus title="Exact Analytical and Numerical Benchmark of the Spherical Trihedron Across Three Step Scales (Manual Derivation and Numerical Check)"}
Evaluating $\Delta\mathcal{T}_\epsilon$ at $\epsilon = 15^\circ$ ($\frac{\pi}{12}\;\mathrm{rad}$, small-step regime), $\epsilon = 45^\circ$ ($\frac{\pi}{4}\;\mathrm{rad}$, intermediate regime), and $\epsilon = 90^\circ$ ($\frac{\pi}{2}\;\mathrm{rad}$, full octant) makes the scale separation transparent:

- **At $\epsilon = 15^\circ = \frac{\pi}{12} \approx 0.2618\;\mathrm{rad}$**: $\cos c_{15^\circ} = \cos^2 15^\circ = \frac{2+\sqrt{3}}{4} \approx 0.9330$ gives direct arc $c_{15^\circ} \approx 0.3681\;\mathrm{rad}$ ($21.09^\circ$), within $0.58\%$ of flat $\sqrt{2}\epsilon \approx 0.3702\;\mathrm{rad}$ ($21.21^\circ$); yet $\alpha \approx 45.99^\circ$ already opens spherical excess $\Omega(15^\circ) \approx 0.0347\;\mathrm{rad}$ ($1.99^\circ$), closed-loop spinor phase $-\frac{1}{2}\Omega \approx -0.0173\;\mathrm{rad}$ (close in magnitude to the two-wall transverse entry, $\sin^2 7.5^\circ \approx 0.0170$), and $\det G = \sin^4 15^\circ = \frac{7 - 4\sqrt{3}}{16} \approx 0.0045 > 0$.
- **At $\epsilon = 45^\circ = \frac{\pi}{4} \approx 0.7854\;\mathrm{rad}$**: Every invariant simplifies to a closed radical constant—$\cos c_{45^\circ} = \frac{1}{2}$ yields $c_{45^\circ} = \frac{\pi}{3} = 60^\circ \approx 1.0472\;\mathrm{rad}$ (distinctly shorter than flat $1.1107\;\mathrm{rad}$), $\alpha = \arctan\sqrt{2} \approx 54.74^\circ$ (the tetrahedral magic angle), $\Omega(45^\circ) = \arcsin\frac{1}{3} \approx 0.3398\;\mathrm{rad}$ ($19.47^\circ$), spinor phase $-\frac{1}{2}\arcsin\frac{1}{3} \approx -0.1699\;\mathrm{rad}$, and $\det G = \frac{1}{4} = 0.2500$.
- **At $\epsilon = 90^\circ = \frac{\pi}{2} \approx 1.5708\;\mathrm{rad}$**: $\cos c_{90^\circ} = 0$, $c_{90^\circ} = \frac{\pi}{2} = 90^\circ$, $\alpha = \beta = \gamma = 90^\circ$ (with $\alpha(90^\circ) = 90^\circ$ the $\epsilon \to \frac{\pi}{2}^-$ continuous limit of $\arctan(\sec\epsilon)$, i.e., $\operatorname{atan2}(1, \cos\epsilon)$), $\Omega(90^\circ) = \frac{\pi}{2} \approx 1.5708\;\mathrm{rad}$, spinor Berry phase $-\frac{\pi}{4} \approx -0.7854\;\mathrm{rad}$, and $\det G = 1$.

| Step $\epsilon$ | Direct Overlap $\cos^2\epsilon$ | Spherical Arc $c_\epsilon$ (rad) | Flat $\sqrt{2}\epsilon$ (rad) | Base Angle $\alpha(\epsilon)$ | Spherical Excess $\Omega(\epsilon)$ (rad) | Loop Spinor Phase $-\frac{1}{2}\Omega(\epsilon)$ | Gram Determinant $\det G = \sin^4\epsilon$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$15^\circ$ ($\pi/12$)** | $\frac{2+\sqrt{3}}{4} \approx 0.9330$ | $0.3681$ | $0.3702$ | $45.99^\circ$ ($0.8027$) | $0.0347$ ($1.99^\circ$) | $-0.0173$ | $\frac{7-4\sqrt{3}}{16} \approx 0.0045$ |
| **$45^\circ$ ($\pi/4$)** | $\frac{1}{2} = 0.5000$ | $\frac{\pi}{3} \approx 1.0472$ | $1.1107$ | $\arctan\sqrt{2} \approx 54.74^\circ$ | $\arcsin\frac{1}{3} \approx 0.3398$ | $-0.1699$ | $\frac{1}{4} = 0.2500$ |
| **$90^\circ$ ($\pi/2$)** | $0$ | $\frac{\pi}{2} \approx 1.5708$ | $2.2214$ | $90.00^\circ$ ($\pi/2$) | $\frac{\pi}{2} \approx 1.5708$ | $-\frac{\pi}{4} \approx -0.7854$ | $1.0000$ |
:::

::: {.remark #rem-ch34-regge-spinfoam-trihedron-literature title="Girard Spherical Excess, Gauss-Bonnet Holonomy, and Regge Discrete Gravity Simplices (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Three epistemic tiers govern this section:

1. **Classical Spherical Geometry, Holonomy, and Discrete Gravity Literature**: Napier's right-spherical-triangle laws $\cos c = \cos a\cos b$, $\tan\alpha = \tan a / \sin b$, and Girard's (1629) spherical excess formula $\Omega = \alpha + \beta + \gamma - \pi$; Gauss–Bonnet geodesic parallel-transport rotation $+\Omega$, together with Pancharatnam (1956) and Berry (1984) half-solid-angle spinor holonomy $\exp(-\frac{1}{2}\Omega\hat{\mathbf{I}}_{\mathbf{A}})$; and Regge's (1961, *General Relativity without Coordinates*) coordinate-free simplicial curvature calculus alongside the discrete area and volume spectra of loop-quantum-gravity spin networks (Rovelli & Smolin 1995) and spin-foam simplex amplitudes (Perez 2013);
2. **Kernel-Verified Formal Anchors (`LEAN ✓`)**: Simplicial two-cochain exactness, moving two-axis $\mathrm{SO}(3)$ propagation, the Lagrange–Gram identity, and unit orthogonal escape ([@thm-ch34-trihedron-cochain-and-moving-axis]), paired with `unit_perpendicular_pair`, `two_axis_finite_word`, `partition_inseparable_iff_kernel`, and `covariant_commutator_formula` from earlier sections;
3. **Book Interpretive Model (`MODEL`)**: Reading once- and twice-orthogonal operations as dual shadows of $\Delta\mathcal{T}_\epsilon$, positing a finite-bandwidth minimal step $\epsilon_{\min} > 0$ with curvature quantum $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$, and linking discrete trihedral tiling of smooth spheres to $K = 3$ Rauzy fractal torsion constitute this book's `MODEL`.
:::

::: {.theorem #thm-ch34-qubit-subentropy-near-pure title="Near-Pure Qubit Subentropy Kernel Comparison Bound" lean="D5/S3/Quantum/Subentropy/QubitBoundary.qubit_subentropy_near_pure"}
Let $A \in M_2(\mathbb{C})$ be any $2\times 2$ complex positive semidefinite matrix ($A \succeq 0$) with $\operatorname{Tr}(A) = 1$, set $\delta := \operatorname{Re}(\det A)$, and let $Q(A)$ denote the matrix subentropy in natural-logarithm units. Then:

1. $0 \le \delta \le \frac{1}{4}$;
2. if $\delta = 0$, then $Q(A) = 0$;
3. if $0 < \delta$, then

$$
0 \le \delta - Q(A) \le \frac{\delta^2\ln(1/\delta)}{1 - \delta}.
$$
:::

::: proof
Because $A \in M_2(\mathbb{C})$ is positive semidefinite with $\operatorname{Tr}(A) = 1$, $A$ is Hermitian with eigenvalues $\lambda_1, \lambda_2 \ge 0$ summing to $1$. Hence $\det A = \lambda_1\lambda_2 \in \mathbb{R}$ and $\delta = \operatorname{Re}(\det A) = \lambda_1(1 - \lambda_1) \in [0, \frac{1}{4}]$.

When $\delta = 0$, one eigenvalue is $0$ and the other is $1$, so $A$ is a rank-one projector with $\det(I + A/t) = 1 + t^{-1}$. Thus the integrand $\frac{t}{1+t} - \frac{1}{\det(I + A/t)}$ vanishes identically and $Q(A) = 0$, without dividing by zero or evaluating a logarithm at zero.

When $0 < \delta \le \frac{1}{4}$, the characteristic polynomial gives $\det(I + A/t) = 1 + t^{-1} + \delta t^{-2}$, reducing the determinant-integral definition to

$$
Q(A) = \int_0^\infty \frac{\delta t}{(1+t)(t^2 + t + \delta)}\,dt.
$$

Subtracting this from $\delta = \int_0^\infty \frac{\delta}{(1+t)^2}\,dt = \int_0^\infty \frac{\delta t}{(1+t)(t^2 + t)}\,dt$ yields the nonnegative deficit integral

$$
\delta - Q(A) = \int_0^\infty \frac{\delta^2}{(1+t)^2(t^2 + t + \delta)}\,dt \ge 0.
$$

For all $t \ge 0$ and $0 < \delta \le \frac{1}{4}$, the inequality $(1+t)(t^2 + t + \delta) = (t + \delta) + t^3 + 2t^2 + \delta t \ge t + \delta > 0$ gives the pointwise bound

$$
\frac{\delta^2}{(1+t)^2(t^2 + t + \delta)} \le \frac{\delta^2}{(1+t)(t+\delta)}.
$$

Since $0 < \delta \le \frac{1}{4}$ ensures $1 - \delta > 0$ and $1/\delta > 0$, integrating over $(0, \infty)$ yields

$$
\begin{aligned}
0 \le \delta - Q(A) &\le \delta^2 \int_0^\infty \frac{dt}{(1+t)(t+\delta)} \\
&= \frac{\delta^2\ln(1/\delta)}{1 - \delta}.
\end{aligned}
$$

The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch34-trihedron-subentropy-and-kernel title="Equal-Mixture Subentropy and Near-Pure Application on the Minimal Trihedron"}
**Epistemic status**: This example reuses the finite-dimensional determinant-integral definition of subentropy, pure-state vanishing, the qubit spectral formula, and the near-pure qubit subentropy bound in [@thm-ch34-qubit-subentropy-near-pure]; the small-angle expansion for the equal-weight trihedron mixture and its geometric comparison remain explicit hand applications (not Lean-verified mappings).

For any finite-dimensional positive semidefinite unit-trace density operator $\rho$, subentropy in natural-log units (`nats`) is defined by

$$
Q(\rho) = \int_0^\infty \left[\frac{t}{1+t} - \frac{1}{\det(I + \rho/t)}\right]dt.
$$

Although $Q$ differs from von Neumann entropy $S(\rho) = -\operatorname{Tr}(\rho\ln\rho)$ on mixed states, like $S$ it vanishes on every normalized rank-one pure state ($Q = 0$). For a single-qubit state $\rho = \frac{1}{2}(I + \mathbf{r}\cdot\boldsymbol{\sigma})$ of Bloch radius $r \in [0, 1]$, with eigenvalues $a = \frac{1+r}{2}$, $b = \frac{1-r}{2}$, and determinant $\delta = \det\rho = \frac{1-r^2}{4} \in [0, \frac{1}{4}]$, the spectral formula and its endpoints give

$$
q(r) := Q(\rho) = -\frac{a^2\ln a - b^2\ln b}{r} \quad (0 < r < 1),
$$

with $q(0) = \ln 2 - \frac{1}{2}$ and $q(1) = 0$. By the near-pure qubit subentropy bound in [@thm-ch34-qubit-subentropy-near-pure], $Q(\rho) = \delta + O(\delta^2|\ln\delta|)$ as $\delta \to 0^+$.

Now mix the three vertex pure states of $\Delta\mathcal{T}_\epsilon$ equally into the mixed state $\bar{\rho} = \frac{1}{3}(\rho_A + \rho_B + \rho_C)$ (a globally coherent pure state still has $Q = 0$). From $\mathbf{A} = (\sin\epsilon, c, 0)$, $\mathbf{B} = (0, 1, 0)$, and $\mathbf{C} = (0, c, \sin\epsilon)$ ($c = \cos\epsilon$), the mean Bloch vector is $\bar{\mathbf{r}} = \frac{1}{3}(\sin\epsilon, 1 + 2c, \sin\epsilon)$, with squared radius and determinant

$$
\begin{aligned}
r^2 &= \frac{3 + 4c + 2c^2}{9}, \\
\delta &= \frac{1 - r^2}{4} = \frac{(1-c)(3+c)}{18} = \frac{\epsilon^2}{9} - \frac{5\epsilon^4}{216} + O(\epsilon^6).
\end{aligned}
$$

Applying the near-pure expansion by hand yields the small-angle comparison between equal-mixture subentropy and closed-loop Berry phase:

$$
\begin{aligned}
Q(\bar{\rho}) &= \frac{\epsilon^2}{9} + O(\epsilon^4|\ln\epsilon|), \\
\gamma &= -\frac{1}{2}\Omega(\epsilon) = -\frac{\epsilon^2}{4} + O(\epsilon^4).
\end{aligned}
$$
:::

::: {.remark #rem-ch34-trihedron-subentropy-vs-berry-and-gram title="Geometric Phase, Mixed-State Subentropy, and Real vs. Complex Gram Determinants"}
**Epistemic status**: Aside from the formal near-pure qubit bound above, the equal-mixture trihedron application, operational distinction, and real/complex linear-algebra comparisons in this remark remain hand derivations and standard linear-algebraic facts (not pinned as Lean theorems or physical mappings).

1. **Geometric phase and mixed-state subentropy measure distinct operations**: Coherent parallel transport around the geodesic loop $\mathbf{A} \to \mathbf{B} \to \mathbf{C} \to \mathbf{A}$ preserves a rank-one pure state, so $Q = 0$ even though $\gamma = -\Omega/2 \neq 0$. Conversely, $Q(\bar{\rho}) \sim \epsilon^2/9$ measures spectral spread produced by discarding the vertex preparation label in the equal-weight ensemble. Reversing loop orientation flips the sign of $\gamma$ while leaving $\bar{\rho}$ and $Q$ unchanged, whereas varying the preparation weights alters $Q$ without changing $\Omega$. Thus $Q(\bar{\rho})/|\gamma| \to 4/9$ is specific to the equal-weight mixture rather than a universal proportionality between $Q$ and Berry phase.
2. **Real 3D Bloch volume vs. 2D complex spinor Gram determinant**: The real Gram determinant $\det[(\mathbf{n}_a\cdot\mathbf{n}_b)_{a,b=A,B,C}] = \sin^4\epsilon > 0$ ($\epsilon \in (0, \frac{\pi}{2}]$) measures the parallelotope volume spanned by three unit vectors in $\mathbb{R}^3$. By contrast, the corresponding normalized spinors $|\psi_A\rangle, |\psi_B\rangle, |\psi_C\rangle$ lie in $\mathbb{C}^2$ and are therefore linearly dependent, forcing their $3\times 3$ complex Gram determinant to vanish identically: $\det[(\langle\psi_a|\psi_b\rangle)_{a,b=A,B,C}] = 0$ (matching $e_3(\bar{\rho}) = 0$). For a single qubit, $Q$ is fixed solely by $\delta = e_2$; higher-order complex Gram invariants enter $Q$ only in Hilbert-space dimension $d \ge 3$.
:::

The four-row table below summarizes the dual projections and invariants of $\Delta\mathcal{T}_\epsilon$:

| Projection Slice / Scale Regime | Projected Geometric Appearance | Core Algebraic Invariant | Emergent Physical & Geometric Law |
| :--- | :--- | :--- | :--- |
| **1. Sighting down ridge $\mathbf{B}=\mathbf{e}_2$** | Pivot $\mathbf{B}$ collapses to a point, leaving one cyan arc $\widehat{AC}$ ("orthogonal once") | $\mathbf{A}(\epsilon)\cdot\mathbf{C}(\epsilon) = \cos c_\epsilon = \cos^2\epsilon$ | Partition-kernel blind spot, coarse-grained single-step transition, and flat illusion $c_\epsilon \approx \sqrt{2}\epsilon$ |
| **2. Decomposing onto coordinate walls** | Two sequential steps $\widehat{AB}+\widehat{BC}$ turning $90^\circ$ at $\mathbf{B}$ ("orthogonal twice") | $U_{23}(\epsilon)U_{12}(\epsilon)$ carries transverse $-\sin^2\frac{\epsilon}{2}\,\mathbf{e}_1\mathbf{e}_3$ | Two-axis gate synthesis, non-commuting operator commutators, and $\mathfrak{su}(2)$ spin generators |
| **3. Magenta spherical cap $\triangle_{\mathrm{sph}} ABC$** | Unit-norm fairness pushes the flat cut outward into a curved spherical triangle | $\Omega(\epsilon) = 2\arctan(\tan^2\frac{\epsilon}{2}) = \frac{\epsilon^2}{2} + O(\epsilon^4)$ | Girard excess, Gauss–Bonnet rotation $+\Omega$, Pancharatnam–Berry phase $-\frac{1}{2}\Omega$, and gauge curvature |
| **4. 3D solid cell $\Delta\mathcal{T}_\epsilon$** | Lifts out of zero-volume coplanar steps into a violet volume brick ($\epsilon\to\frac{\pi}{2}$ gives the octant) | $\det G(\Delta\mathcal{T}_\epsilon) = \sin^4\epsilon > 0,\; V_{\mathrm{brick}} = \sin^2\epsilon$ | Dimension expansion $D \to D + 1$, Regge simplicial curvature bricks, and curvature quantum $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$ |

Open the full spherical-trihedron laboratory below to sweep the amber step handle and loop slider across all five scenes—Cell, Once, Twice, Excess, and Gram—and watch the cyan direct arc, two-wall right-angle walk, magenta spherical cap, and violet Gram brick lock together on one solid:

::: {.viz src="spherical-trihedron-cell" height="620"}
**The spherical trihedron cell: the full lab.** Five scenes and six experiment cards share one right-angled trihedron $\Delta\mathcal{T}_\epsilon$: drag the amber step handle from small angles up to the $90^\circ$ octant, comparing the cyan direct arc down the ridge, the two-step walk along the walls, Girard's excess $\Omega(\epsilon)$ of the magenta cap over the cyan flat cut, and the violet 3D Gram volume brick $\sin^2\epsilon$, with green `LEAN ✓` boxes marking the frozen kernel theorems.
:::

Section 29.5 unified "orthogonal once" and "orthogonal twice" as dual shadows of the elementary trihedral cell $\Delta\mathcal{T}_\epsilon$. Press just half a step further, however, and a final ontological question demands an answer: **in a zero-background universe with no pre-installed third point, where does that third vertex ray come from in the first place—and what folding has our own language already imposed the moment we utter the phrase "infinitesimal spherical trihedron"?**

---
