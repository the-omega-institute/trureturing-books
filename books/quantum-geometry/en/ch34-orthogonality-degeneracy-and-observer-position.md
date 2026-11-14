# Chapter 34 Orthogonality-Degeneracy Blind Spots: How Single vs. Double Orthogonality Inverts Observer Position {#orthogonality-degeneracy-blind-spots-how-single-vs-double-orthogonality-inverts-observer-position}

> *"That a single orthogonality step and a double orthogonality step yield the same result reflects precisely the position of the observer."*

Once Chapter 33 establishes a background-free relational ontology of the observer, an immediate inverse problem confronts every observer embedded inside the field. Since [Chapter 2](ch02-born-rule.md) excised the external "third point $C$" and [Chapter 31](ch31-quantum-fairness.md)'s Seat Fairness ([@thm-ch31-seat-pythagorean-monogamy-fairness]) abolished every privileged origin—leaving an unpainted, isotropic unit sphere on which every pure state has norm $1$—**how can a bounded observer standing inside the arena ever deduce *which axis it is standing on*?**

Everyday intuition trains us to hunt for **differences**: we assume an instrument reveals our coordinates only when two distinct operations produce distinct dial readings, and when two genuinely different geometric moves return the exact same number, we lament "information loss" or "measurement degeneracy." The epigraph opening this chapter turns that prejudice inside out: **what betrays an observer's own position is not the difference it sees, but the exact orthogonal turn to which its meter is completely blind!**

We develop this blind-spot inversion principle—and the dual-projection geometry uniting single and double orthogonality—across five progressive stages:

1. **Polar-Axis Inversion in Two-Step Spherical Addressing**: Contrasting right-angle steps on a flat floor against "first and second orthogonal steps" on the unit sphere $S^2$ ([Chapter 9](ch09-axes-and-state-addressing.md)), we combine common unit-normal existence [`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair), exact two-axis finite-word generation [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), and the iterated state–effect pullback identity [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity) to show that invisibility of a second orthogonal step locks the observer's probe onto a fixed axis of the dual rotation;
2. **Spherical Octant Curvature and Rotor Blind Spots**: Using the partition-topology inseparability kernel [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel) and covariant commutator factorization [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula), together with a complete analytical and numerical derivation of spherical addressing and octant rotor holonomy ([@ex-ch34-spherical-addressing-and-octant-rotors]), we prove that *you stand on the normal of whichever area's rotation you cannot see*;
3. **Universal Observer Localization Across Dimensions (`MODEL`)**: Anchored by null-cone spatial rigidity [`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity) and golden cut-and-project subset inclusion [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project), we extend the same inversion law across planar turns, zero-duration superconducting phase-frame updates, geometric phase, relativistic simultaneity slices ([@rem-ch34-virtual-z-berry-relativity-literature]), and the six-dimensional golden hypercube slice;
4. **The Infinitesimal Spherical Trihedron $\Delta\mathcal{T}_\epsilon$ and the Curvature Quantum (§34.4, `MODEL` + `LEAN ✓`)**: Advancing [Chapter 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)'s two-state Axiom of Comparison to the minimal three-state curved loop, we show that "orthogonal once" and "orthogonal twice" are two orthogonal shadows of one right-angled spherical trihedron cell $\Delta\mathcal{T}_\epsilon$, pairing simplicial two-cochain repair exactness [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) and moving-axis rotation propagation [`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance) ([@thm-ch34-trihedron-cochain-and-moving-axis]) to expose the microscopic origin of Girard spherical excess $\Omega(\epsilon) \approx \frac{1}{2}\epsilon^2$ and the 3D Gram volume brick $\det G = \sin^4\epsilon$;
5. **From the “Two-Begets-Three” Bootstrap to the Dissolution of Names (§34.5, `MODEL` + `LEAN ✓`)**: Showing how unit-normalized pairwise comparison generates the third vertex of $\Delta\mathcal{T}_\epsilon$ without any external third point, how $120^\circ$ triadic cyclic symmetry dismantles linear subject–verb–object narration, and how lexical readout-kernel folding ([@prop-ch34-triadic-bootstrap-and-lexical-pinching]) gives way—once the ladder of names is thrown away—to the isomorphic resonance of "that feeling."

::: {.figure src="ch34-overview"}
**Figure 34.** The chapter at a glance. Panel I: on the magenta latitude circle at polar angle $\theta = 60^\circ$, the filled dot $\mathbf{v}_1$ and three hollow rings $\mathbf{v}_2(\phi)$ drop along cyan dashed lines to one point $\cos\theta$ on the violet polar axis, so the amber observer $\mathbf{O}$ at the pole cannot read the azimuth. Panel II: the $90^\circ$ turn inside the magenta equatorial disc $\mathbf{e}_1 \wedge \mathbf{e}_2$ is exactly the area the amber observer on its normal cannot see (these two panels are the hand computation of [@ex-ch34-spherical-addressing-and-octant-rotors], a literature result not formalized in this book). Panel III: on a square lattice, the amber golden slice $E_\parallel$ sits in the cyan acceptance window, and the points in the window drop onto the slice along the magenta internal direction $E_\perp$ (the cut-and-project scheme of [@prop-ch34-null-cone-and-golden-cut-orientation]; reading the slice as the observer's position is an interpretive model, `MODEL`).
:::

---

## 34.1 Second-Orthogonality Invisibility in Spherical Addressing: Symmetry Meridian and Polar Normal Inversion {#sec-ch34-spherical-addressing-inversion}

::: {.example #ex-ch34-spherical-addressing-preview title="Flat-Floor Hypotenuse Contrast and Spherical Two-Step Addressing Inversion Preview (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The elementary Euclidean hypotenuse contrast and unit-sphere $S^2 \subset \mathbb{R}^3$ inner-product inversion preview below belong to classical Euclidean geometry (with full algebraic elimination given in [@ex-ch34-spherical-addressing-and-octant-rotors], Part 1) and are not formalized as a standalone continuous spherical-coordinate lemma in `trureturing@dev`:

1. **Hypotenuse Growth on a Flat Floor**: Standing at the origin of an infinite flat floor, walking $1$ unit straight ahead (one orthogonal step) yields radial distance $1$, whereas pivoting $90^\circ$ sideways and walking $1$ unit along the perpendicular axis (two orthogonal steps) stretches the radial distance to $\sqrt{1^2 + 1^2} = \sqrt{2} \neq 1$—single-step and double-step radial readings can never coincide.
2. **Two-Step Orthogonal Addressing on $S^2$**: In the mutually orthogonal triad $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3)$ of [Chapter 9](ch09-axes-and-state-addressing.md), addressing directions from the reference pole $\mathbf{e}_3$ proceeds in two orthogonal turns:
   - **First orthogonal step (polar tilt)**: Rotate inside the meridian plane $\mathbf{e}_3 \wedge \mathbf{e}_1$ by polar angle $\theta \in (0, \pi)$ ($\sin\theta \neq 0$) to $\mathbf{v}_1(\theta) = \cos\theta\,\mathbf{e}_3 + \sin\theta\,\mathbf{e}_1$;
   - **Second orthogonal step (azimuthal twist)**: Holding $\mathbf{e}_3$ perpendicular to the equatorial stage $\mathbf{e}_1 \wedge \mathbf{e}_2$, rotate the transverse component through azimuth $\phi \in [0, 2\pi)$ to $\mathbf{v}_2(\theta, \phi) = \cos\theta\,\mathbf{e}_3 + \sin\theta(\cos\phi\,\mathbf{e}_1 + \sin\phi\,\mathbf{e}_2)$.
3. **Readout Equality as Vantage Inversion**: Whenever $\phi \not\equiv 0 \pmod{2\pi}$, $\mathbf{v}_1(\theta)$ and $\mathbf{v}_2(\theta, \phi)$ point in distinct directions; if an internal observer probing with unit axis $\mathbf{O} \in S^2$ finds $\mathbf{O}\cdot\mathbf{v}_1(\theta) = \mathbf{O}\cdot\mathbf{v}_2(\theta, \phi)$—just like the unique axial camera vantage from which a tilted spinning top's tip traces a circle of constant radial projection—then:
   - Equality for a single $90^\circ$ transverse pair ($\phi = \pi/2$) constrains $\mathbf{O}$ to the **symmetry meridian** bisecting $\mathbf{e}_1$ and $\mathbf{e}_2$;
   - Equality across the entire azimuthal circle $\phi \in [0, 2\pi)$ renders the equatorial plane $\mathbf{e}_1 \wedge \mathbf{e}_2$ orthogonally invisible, uniquely locking the observer's axis onto the polar normal $\mathbf{O} = \pm\mathbf{e}_3$!
:::

::: {.viz src="spherical-degeneracy-radar" preset="meridian" height="500"}
**A 90° side turn: the observers who cannot tell lie on the symmetric meridian.** The solid dot is the once-turned $\mathbf{v}_1$, the open ring the twice-turned $\mathbf{v}_2$, and the magenta is the side area the second turn sweeps along the latitude. The amber observer stands on the dashed cyan great circle $O_1 = O_2$; both cyan shadows fall on the same point of its axis and the gap is zero ([@ex-ch34-spherical-addressing-preview]).
:::

Stepping back from [@ex-ch34-spherical-addressing-preview], conventional measurement theory mourns degeneracy only because it secretly gazes down from an external coordinate grid and regrets "losing the transverse angle." Inside a self-contained geometry without point $C$ (`MODEL`), **transverse invisibility is the universe's built-in compass for self-localization**.

::: {.viz src="spherical-degeneracy-radar" preset="sweep" height="500"}
**The azimuth goes once round: only the polar axis is on every blind circle.** The observer stands at the North Pole; the dashed cyan blind circle turns with $\phi$ about the violet vertical, and the faint cyan circles are the ones already passed. They meet only at $\pm\mathbf{e}_3$, and at the pole the two shadows stay together at $\cos\theta$.
:::

At the formal kernel level, three structural facts make this inversion airtight: any pair of vectors in $\mathbb{R}^3$ admits a common unit normal, exact finite words in the rotation circles of any two noncollinear axes generate every orientation-preserving linear isometry of $\mathbb{R}^3$, and multi-step state evolution pulls back without loss onto the observer's measurement effect. The theorem below locks all three together.

::: {.theorem #thm-ch34-perpendicular-axis-and-pullback title="Common Unit Normal, Two-Axis Finite Rotation Words, and Observer Pullback Trace Identity" lean="D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity"}
In the frozen three-dimensional two-axis rotation and finite-dimensional quantum pullback modules of `trureturing`, write $\mathrm{Space} = \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} 3)$, $\mathrm{Orthogonal} = (\mathrm{Space} \simeq_{\ell i}[\mathbb{R}] \mathrm{Space})$ for its group of real linear isometries, $\operatorname{determinant}(R) = \det(R.\mathrm{toLinearMap})$, $\operatorname{axisCircle}(a) = \{R \in \mathrm{Orthogonal} \mid \operatorname{determinant}(R) = 1 \land R(a) = a\}$ for the subgroup of orientation-preserving rotations fixing $a$, and $\operatorname{IsAxisWord}(a, b, l)$ for the predicate that every letter of $l \in \operatorname{List}(\mathrm{Orthogonal})$ belongs to $\operatorname{axisCircle}(a) \cup \operatorname{axisCircle}(b)$. The following three statements hold simultaneously:

1. **Existence of a Common Unit Perpendicular Vector** ([`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair)): For any two vectors $a, b \in \mathrm{Space}$ (without assuming nonzeroness, normalization, or linear independence), there exists a unit vector $n \in \mathrm{Space}$ simultaneously orthogonal to both:

   $$
   \lVert n\rVert = 1 \;\land\; \langle a, n\rangle_{\mathbb{R}} = 0 \;\land\; \langle b, n\rangle_{\mathbb{R}} = 0;
   $$

2. **Exact Finite-Word Generation from Two Noncollinear Axis Circles** ([`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)): Let $a, b \in \mathrm{Space}$ satisfy strict noncollinearity $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$ (with neither $a$ nor $b$ required to have unit norm). Then every orientation-preserving isometry $R \in \mathrm{Orthogonal}$ with $\operatorname{determinant}(R) = 1$ factors as an exact finite word $l \in \operatorname{List}(\mathrm{Orthogonal})$ without topological closure:

   $$
   \operatorname{IsAxisWord}(a, b, l) \;\land\; l.\mathrm{prod} = R;
   $$

3. **Multi-Step Trace Identity Between Channel Evolution and Effect Pullback** ([`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity)): Let $d$ be a finite decidable type (`[Fintype d] [DecidableEq d]`), let $\mathrm{channel} : \operatorname{QuantumChannel}\;d\;d$ be a quantum channel, and let $\mathrm{heisenberg} : \operatorname{MatrixAlgebra}\;d \to_{\mathrm{CP}} \operatorname{MatrixAlgebra}\;d$ be a completely positive map satisfying single-step trace duality

   $$
   \forall\,\mathrm{state}, \mathrm{effect} \in \operatorname{MatrixAlgebra}\;d,\qquad \operatorname{Tr}\bigl(\mathrm{channel.toCompletelyPositiveMap}(\mathrm{state}) \cdot \mathrm{effect}\bigr) = \operatorname{Tr}\bigl(\mathrm{state} \cdot \mathrm{heisenberg}(\mathrm{effect})\bigr).
   $$

   Then for every step count $t \in \mathbb{N}$, initial density state $\rho \in \operatorname{DensityState}\;d$, and arbitrary matrix $\mathrm{effect} \in \operatorname{MatrixAlgebra}\;d$,

   $$
   \operatorname{Tr}\bigl((\operatorname{evolvedState}(\mathrm{channel}, t, \rho)).1 \cdot \mathrm{effect}\bigr) \;=\; \operatorname{Tr}\Bigl(\rho.1 \cdot \bigl((\lambda A,\, \mathrm{heisenberg}(A))^{[t]}(\mathrm{effect})\bigr)\Bigr).
   $$
:::

::: proof
Conjunct 1 sets $P = \operatorname{span}_{\mathbb{R}}\{a, b\} \subseteq \mathrm{Space}$; since $\operatorname{finrank}_{\mathbb{R}} P \le 2 < 3 = \operatorname{finrank}_{\mathbb{R}} \mathrm{Space}$, the orthogonal complement $P^\perp \neq \bot$ contains a nonzero vector $v \neq 0$, whose normalization $n = \lVert v\rVert^{-1} v$ satisfies $\lVert n\rVert = 1$ and $\langle a, n\rangle_{\mathbb{R}} = \langle b, n\rangle_{\mathbb{R}} = 0$. Conjunct 2 deduces $a \neq 0$ and $b \neq 0$ from the strict inner-product norm inequality, normalizes $a' = \lVert a\rVert^{-1} a$ and $b' = \lVert b\rVert^{-1} b$, constructs intersecting latitude circles and two-reflection equal-latitude rotations to show that the finite-word orbit on the connected unit sphere is clopen and hence surjective, composes with the stabilizer $\operatorname{axisCircle}(a')$ to recover $R$, and rescales via $\operatorname{axisCircle}(c\bullet a) = \operatorname{axisCircle}(a)$. Conjunct 3 inducts on $t \in \mathbb{N}$ generalized over `effect`, combining `Function.iterate_succ_apply'`, single-step `hduality`, and `Function.iterate_succ_apply`. The full proof is checked by the Lean kernel.
:::

Taken together, the three clauses of [@thm-ch34-perpendicular-axis-and-pullback] expose the exact mechanism of observer inversion: Conjunct 1 guarantees a unit normal axis $n$ perpendicular to any two directions swept out by a second orthogonal step; Conjunct 2 confirms that finite words around two noncollinear axes generate all of $\mathrm{SO}(3)$; and Conjunct 3 translates "applying an extra rotation step to the state" into "pulling the measurement `effect` one step backward onto the observer"—for a self-adjoint measurement effect, invariance of trace readouts on every input density state makes the effect a fixed point of the dual map by separation of the trace pairing. Reading that fixed effect as an axis further requires a channel known to represent an orientation-preserving rotation, with the effect's nonscalar part encoding the nonzero probe direction $\mathbf{O}$ injectively and covariantly under rotation; a scalar effect carries no direction. Under the unit-probe, nonzero-tilt, and full-azimuth conditions above, the familiar compass returns: **those rotations fix the probe axis and hence belong to $\operatorname{axisCircle}(\mathbf{O})$!**

::: {.viz src="spherical-degeneracy-radar" preset="pullback" height="500"}
**Turning the states one step is pulling the observer back one step.** Once $\mathbf{v}_1$ and twice $\mathbf{v}_2$ ($\theta = 60^\circ$, $\phi = 90^\circ$) turn together by $\psi$ about the violet tilted axis $k$ (grey dashed arcs), and the amber observer $\mathbf{O}$ reads them; the dashed ink line is $R^{-1}\mathbf{O}$, the states left alone and the observer turned back by $-\psi$ about $k$, reading the two original points. The two ways agree digit for digit: $0.61$ and $-0.62$ at $\psi = 120^\circ$. This is one instance of Conjunct 3 of [@thm-ch34-perpendicular-axis-and-pullback], for a unitary single-qubit channel and a single step; reading a fixed effect as an axis still needs the rotation and covariance conditions stated above.
:::

::: {.remark #rem-ch34-localization-figure title="Polar-Axis Inversion and Octant Rotor Blind-Spot Diagram (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Two-step spherical addressing inversion ([@ex-ch34-spherical-addressing-and-octant-rotors]), combined with the formal perpendicular-axis and adjoint-pullback laws ([@thm-ch34-perpendicular-axis-and-pullback], `LEAN ✓`), is drawn in Panel I of Figure 34 and in this section's two lab cards `meridian` and `sweep`; octant rotor holonomy and its geometric-phase background ([@ex-ch34-spherical-addressing-and-octant-rotors] and [@rem-ch34-virtual-z-berry-relativity-literature]) are drawn in Panel II of Figure 34, in the next section's four lab cards `hops`, `equator`, `tilted` and `frames`, and in the octant-loop card further on.
:::

---

## 34.2 Spherical Octant and Rotor Curvature: You Stand on the Normal of Whichever Area You Cannot See {#sec-ch34-octant-rotor-holonomy}

Moving from static vector addressing to the **octant orthogonal-circuit model (`MODEL`)** in Panel II of Figure 34 (with the single-step vs. two-step rotor products, holonomy discrepancy, and equatorial test-vector comparison derived inside attributed example [@ex-ch34-spherical-addressing-and-octant-rotors] Part 2 below, and continuum geometric-phase literature recorded in [@rem-ch34-virtual-z-berry-relativity-literature]) elevates the comparison between single and double orthogonality from point coordinates to **readout kernels and commutator blind spots**.

::: {.viz src="spherical-degeneracy-radar" preset="hops" height="500"}
**One hop or two: the same end point, carried flags 90° apart.** The solid one hop climbs straight up through $\mathbf{e}_1\wedge\mathbf{e}_3$ to $+\mathbf{e}_3$; the dashed two hops reach $\mathbf{e}_2$ first and then $+\mathbf{e}_3$. The two flags (the images of $\mathbf{e}_2$) end a magenta $90^\circ$ apart in the $\mathbf{e}_1\wedge\mathbf{e}_2$ plane, and the violet difference rotor $\exp(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2)$ at the lower right lies wholly in that plane ([@ex-ch34-spherical-addressing-and-octant-rotors]).
:::

When two distinct evolution sequences produce distinct states in the full carrier space, how can a bounded internal observer still record identical readings for both? At the level of observation topology and ring algebra, two formal theorems pinpoint why: **every readout map induces a partition topology whose topologically inseparable pairs coincide with its readout kernel, while the commutator between an operator $U$ and an observable $f$ factors as $(\mathrm{translated} - f) \cdot U$—so whenever semiconjugation leaves $f$ unshifted ($\mathrm{translated} = f$), the commutator vanishes immediately!**

::: {.viz src="spherical-degeneracy-radar" preset="equator" height="500"}
**Different end states, and still some observers read one number.** The equator test state at $\alpha = 60^\circ$ goes to the solid great circle under the one-hop rotor and to the dashed one under the two-hop rotor; the two circles meet only at the violet $\pm\mathbf{e}_3$. The amber observer at $\mathbf{e}_2$ reads $\frac{\sqrt{3}}{2}$ and $0$, and the magenta piece is that gap; the dashed cyan circle is the blind circle $O_1 + O_2 = 0$, whose observers read the two end states as one number, the same fibre of the readout ([@thm-ch34-readout-kernel-and-covariant-commutator]).
:::

::: {.theorem #thm-ch34-readout-kernel-and-covariant-commutator title="Partition-Topology Inseparability Kernel and Covariant Commutator Factorization" lean="D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula"}
In the frozen observation-partition-topology and covariant-commutator modules of `trureturing`, the following two theorems hold simultaneously:

1. **Exact Kernel Characterization of Inseparability in a Readout Partition Topology** ([`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)): For arbitrary types $X, B$ and any readout map $\mathrm{readout} : \operatorname{Concept}\;X\;B$ ($X \to B$), equip $X$ with the induced discrete pullback topology $\operatorname{partitionTopology}(\mathrm{readout}) = \operatorname{TopologicalSpace.induced}\;\mathrm{readout}\;\bot$. Then for all states $x, y \in X$,

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \;\Longleftrightarrow\; \mathrm{readout}(x) = \mathrm{readout}(y);
   $$

2. **Right-Factored Covariant Commutator Identity** ([`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)): Let $B$ be any ring (`[Ring B]`) and let $U, f, \mathrm{translated} \in B$ satisfy the semiconjugacy relation $\operatorname{SemiconjBy}\;U\;f\;\mathrm{translated}$ (meaning $U \cdot f = \mathrm{translated} \cdot U$). Then the commutator factors exactly as

   $$
   U \cdot f - f \cdot U \;=\; (\mathrm{translated} - f) \cdot U.
   $$
:::

::: proof
In Conjunct 1, endowing $B$ with the discrete topology $\bot$ makes the singleton fiber $\mathrm{fiber} = \mathrm{readout}^{-1}(\{\mathrm{readout}(x)\})$ open in $\operatorname{partitionTopology}(\mathrm{readout})$; if $x$ and $y$ are topologically inseparable, `Inseparable.mem_open_iff` forces $y \in \mathrm{fiber}$ and hence $\mathrm{readout}(x) = \mathrm{readout}(y)$, while conversely $\mathrm{readout}(x) = \mathrm{readout}(y)$ implies identical membership across every induced open preimage $\mathrm{readout}^{-1}(\mathrm{coordinates})$. In Conjunct 2, rewriting $U \cdot f = \mathrm{translated} \cdot U$ via `hcov.eq` and applying right distributivity `sub_mul` yields $(\mathrm{translated} - f) \cdot U$. The full proof is checked by the Lean kernel.
:::

[@thm-ch34-readout-kernel-and-covariant-commutator] strips all mystique from observational blind spots: topological inseparability of distinct states $x \neq y$ under $\operatorname{partitionTopology}(\mathrm{readout})$ directly traces the fiber kernel of `readout`, and whenever a holonomy transformation $U$ fixes the observer's observable ($\mathrm{translated} = f$), their commutator collapses to zero ($U f - f U = 0$). We now work out every sign of both the spherical addressing difference and the octant rotor holonomy in $\mathbb{R}^3$ and $\mathcal{Cl}_{3,0}^+$.

::: {.figure src="ch34-readout-fibers"}
**Two different end states on one fiber are read as the same number.** The equatorial test state at $\alpha = 60^\circ$ goes to $\mathbf{s}_{\mathrm{once}}$ (filled dot) under the one-step rotor and to $\mathbf{s}_{\mathrm{twice}}$ (hollow ring) under the two-step rotor; both have the same $\mathbf{e}_3$ component $\frac{1}{2}$, so only the $\mathbf{e}_1$–$\mathbf{e}_2$ plane is drawn. The amber observer $\mathbf{O} = (-\mathbf{e}_1 + \mathbf{e}_2)/\sqrt{2}$ has $O_1 + O_2 = 0$; the parallel cyan lines are the fibers of equal reading $\mathbf{O}\cdot\mathbf{x}$, both end states lie on one of them with the reading $\sin\alpha/\sqrt{2} \approx 0.61$, and their magenta difference runs along the fiber, in the kernel of the readout ([@thm-ch34-readout-kernel-and-covariant-commutator], item 1).
:::

::: {.example #ex-ch34-spherical-addressing-and-octant-rotors title="Complete Analytical and Numerical Derivation of Spherical Addressing Inversion and Octant Rotor Holonomy (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Part 1 below is an elementary inner-product derivation in $\mathbb{R}^3$, while Part 2 uses standard bivector-exponential rotor and duality conventions in the even subalgebra $\mathcal{Cl}_{3,0}^+$ of the real three-dimensional geometric algebra $\mathcal{Cl}_{3,0}(\mathbb{R})$ (with $\mathbf{e}_i^2 = 1$ and $\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_j\mathbf{e}_i$ for $i \neq j$, not formalized as a standalone continuum rotor module in `trureturing@dev`):

1. **Readout Difference and Polar Normal Locking in Two-Step Spherical Addressing**:
   In the orthonormal basis $\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\} \subset \mathbb{R}^3$, take $\theta \in (0, \pi)$ ($\sin\theta \neq 0$) and $\phi \in [0, 2\pi)$, and compare the single-step and double-step states

   $$
   \mathbf{v}_1(\theta) = \cos\theta\,\mathbf{e}_3 + \sin\theta\,\mathbf{e}_1, \qquad
   \mathbf{v}_2(\theta, \phi) = \cos\theta\,\mathbf{e}_3 + \sin\theta\bigl(\cos\phi\,\mathbf{e}_1 + \sin\phi\,\mathbf{e}_2\bigr).
   $$

   For any unit observer vector $\mathbf{O} = O_1\mathbf{e}_1 + O_2\mathbf{e}_2 + O_3\mathbf{e}_3$ ($O_1^2 + O_2^2 + O_3^2 = 1$), the inner-product readout discrepancy is

   $$
   \Delta(\mathbf{O}) \;=\; \mathbf{O}\cdot\mathbf{v}_2(\theta, \phi) - \mathbf{O}\cdot\mathbf{v}_1(\theta) \;=\; \sin\theta\bigl[O_1(\cos\phi - 1) + O_2\sin\phi\bigr].
   $$

   Three exact localization regimes follow immediately:
   - **Single $90^\circ$ second step ($\phi = \pi/2$)**: Since $\sin\theta \neq 0$, $\Delta(\mathbf{O}) = \sin\theta(-O_1 + O_2) = 0 \iff O_1 = O_2$, confining $\mathbf{O}$ to the **great-circle symmetry meridian** passing through $\pm\mathbf{e}_3$ and $\pm(\mathbf{e}_1 + \mathbf{e}_2)/\sqrt{2}$;
   - **Full azimuthal degeneracy ($\forall \phi \in [0, 2\pi)$)**: Setting $\phi = \pi$ gives $-2\sin\theta\,O_1 = 0 \implies O_1 = 0$, and setting $\phi = \pi/2$ gives $\sin\theta\,O_2 = 0 \implies O_2 = 0$. Normalization $O_1^2 + O_2^2 + O_3^2 = 1$ then forces $O_3 = \pm 1$:

     $$
     \Delta(\mathbf{O}) \equiv 0 \;\Longleftrightarrow\; O_1 = O_2 = 0 \;\Longleftrightarrow\; \mathbf{O} = \pm\mathbf{e}_3 = \pm\star(\mathbf{e}_1 \wedge \mathbf{e}_2),
     $$

     at which both readouts collapse identically to $\mathbf{O}\cdot\mathbf{v}_1(\theta) = \mathbf{O}\cdot\mathbf{v}_2(\theta, \phi) = \pm\cos\theta$;
   - **Off-axis observer tilt ($\beta_{\mathrm{obs}} \in (0, \pi)$)**: Tilting $\mathbf{O}$ off $\pm\mathbf{e}_3$ by polar angle $\beta_{\mathrm{obs}}$ ($\sqrt{O_1^2 + O_2^2} = \sin\beta_{\mathrm{obs}} > 0$, transverse azimuth $\varphi_{\mathrm{obs}}$) yields $\Delta(\mathbf{O}) = \sin\theta\sin\beta_{\mathrm{obs}}\bigl[\cos(\phi - \varphi_{\mathrm{obs}}) - \cos\varphi_{\mathrm{obs}}\bigr]$, opening an azimuthal readout split with peak-to-peak amplitude proportional to $\lvert\sin\theta\rvert\sin\beta_{\mathrm{obs}}$.

2. **Octant Rotor Holonomy in $\mathcal{Cl}_{3,0}^+$ and Polar Blindness**:
   Under the two-sided rotor action $\mathbf{s} \mapsto R\mathbf{s}\widetilde{R}$ (where reversion satisfies $\widetilde{\mathbf{e}_i\mathbf{e}_j} = \mathbf{e}_j\mathbf{e}_i = -\mathbf{e}_i\mathbf{e}_j$), the direct $90^\circ$ rotor in $\mathbf{e}_1 \wedge \mathbf{e}_3$ carrying $\mathbf{e}_1 \to \mathbf{e}_3$ is

   $$
   R_{\mathrm{once}} \;=\; \exp\!\left(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_3\right) \;=\; \frac{1 - \mathbf{e}_1\mathbf{e}_3}{\sqrt{2}}.
   $$

   Composing the two-step $90^\circ$ transport ($\mathbf{e}_1 \to \mathbf{e}_2$ via $\frac{1 - \mathbf{e}_1\mathbf{e}_2}{\sqrt{2}}$ followed by $\mathbf{e}_2 \to \mathbf{e}_3$ via $\frac{1 - \mathbf{e}_2\mathbf{e}_3}{\sqrt{2}}$) and evaluating the bivector product $(-\mathbf{e}_2\mathbf{e}_3)(-\mathbf{e}_1\mathbf{e}_2) = \mathbf{e}_2\mathbf{e}_3\mathbf{e}_1\mathbf{e}_2 = -\mathbf{e}_2\mathbf{e}_1\mathbf{e}_3\mathbf{e}_2 = +\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3\mathbf{e}_2 = -\mathbf{e}_1\mathbf{e}_2^2\mathbf{e}_3 = -\mathbf{e}_1\mathbf{e}_3 = +\mathbf{e}_3\mathbf{e}_1$ gives

   $$
   \begin{aligned}
   R_{\mathrm{twice}}
   &= \left(\frac{1 - \mathbf{e}_2\mathbf{e}_3}{\sqrt{2}}\right)\left(\frac{1 - \mathbf{e}_1\mathbf{e}_2}{\sqrt{2}}\right)
   = \frac{1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_2\mathbf{e}_3 - \mathbf{e}_1\mathbf{e}_3}{2} \\
   &= \frac{1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_2\mathbf{e}_3 + \mathbf{e}_3\mathbf{e}_1}{2}
   = \exp\!\left(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2\right) R_{\mathrm{once}} \;\neq\; R_{\mathrm{once}}
   \end{aligned}
   $$

   (since $(1 - \mathbf{e}_1\mathbf{e}_2)(1 - \mathbf{e}_1\mathbf{e}_3) = 1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_1\mathbf{e}_3 + \mathbf{e}_1\mathbf{e}_2\mathbf{e}_1\mathbf{e}_3 = 1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_2\mathbf{e}_3 - \mathbf{e}_1\mathbf{e}_3$). Acting on an equatorial test vector $\mathbf{s}(\alpha) = \cos\alpha\,\mathbf{e}_1 + \sin\alpha\,\mathbf{e}_2$ yields

   $$
   \mathbf{s}_{\mathrm{once}}(\alpha) = R_{\mathrm{once}}\mathbf{s}(\alpha)\widetilde{R}_{\mathrm{once}} = \cos\alpha\,\mathbf{e}_3 + \sin\alpha\,\mathbf{e}_2,
   \qquad
   \mathbf{s}_{\mathrm{twice}}(\alpha) = R_{\mathrm{twice}}\mathbf{s}(\alpha)\widetilde{R}_{\mathrm{twice}} = \cos\alpha\,\mathbf{e}_3 - \sin\alpha\,\mathbf{e}_1
   $$

   (with $\mathbf{s}_{\mathrm{once}}(\alpha) \neq \mathbf{s}_{\mathrm{twice}}(\alpha)$ if and only if $\sin\alpha \neq 0$, coinciding at $\pm\mathbf{e}_3$ when $\sin\alpha = 0$). Requiring $\mathbf{O}\cdot\mathbf{s}_{\mathrm{once}}(\alpha) = \mathbf{O}\cdot\mathbf{s}_{\mathrm{twice}}(\alpha)$ for a single angle with $\sin\alpha \neq 0$ gives $-\sin\alpha(O_1 + O_2) = 0 \implies O_1 + O_2 = 0$; requiring invariance across rotated initial equatorial frames $(\mathbf{e}_1(\gamma), \mathbf{e}_2(\gamma))$ ($\gamma \in [0, 2\pi)$) forces $O_1 = O_2 = 0$, uniquely locking $\mathbf{O} = \pm\mathbf{e}_3$! At $\mathbf{O} = +\mathbf{e}_3$, both readouts equal $\cos\alpha$ because $\langle \mathbf{e}_3,\, \mathbf{e}_1 \wedge \mathbf{e}_2\rangle_0 = 0$ and $\langle \mathbf{e}_3(\mathbf{e}_1\wedge\mathbf{e}_2)\rangle_1 = 0$, whereas an equatorial observer at $\mathbf{O} = \mathbf{e}_2$ reads $\sin\alpha$ versus $0$!

3. **Explicit Numerical Check ($\theta = \alpha = \frac{\pi}{3},\; \phi = \frac{\pi}{2}$)**:
   With $\cos\frac{\pi}{3} = \frac{1}{2}$ and $\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}$, the four unit vectors evaluate explicitly to

   $$
   \mathbf{v}_1\!\left(\tfrac{\pi}{3}\right) = \left(\tfrac{\sqrt{3}}{2},\; 0,\; \tfrac{1}{2}\right), \qquad
   \mathbf{v}_2\!\left(\tfrac{\pi}{3}, \tfrac{\pi}{2}\right) = \left(0,\; \tfrac{\sqrt{3}}{2},\; \tfrac{1}{2}\right);
   $$

   $$
   \mathbf{s}_{\mathrm{once}}\!\left(\tfrac{\pi}{3}\right) = \left(0,\; \tfrac{\sqrt{3}}{2},\; \tfrac{1}{2}\right), \qquad
   \mathbf{s}_{\mathrm{twice}}\!\left(\tfrac{\pi}{3}\right) = \left(-\tfrac{\sqrt{3}}{2},\; 0,\; \tfrac{1}{2}\right).
   $$

   A polar observer $\mathbf{O} = (0, 0, 1)$ obtains the identical overlap $\frac{1}{2}$ (squared weight $\frac{1}{4}$) on all four vectors, whereas an equatorial observer tilted by $\beta_{\mathrm{obs}} = \frac{\pi}{2}$ to $\mathbf{O}' = (0, 1, 0)$ reads $0$ vs. $\frac{\sqrt{3}}{2}$ on $(\mathbf{v}_1, \mathbf{v}_2)$ and $\frac{\sqrt{3}}{2}$ vs. $0$ on $(\mathbf{s}_{\mathrm{once}}, \mathbf{s}_{\mathrm{twice}})$: because the octant holonomy factor $\exp\!\left(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2\right)$ separating $R_{\mathrm{once}}$ from $R_{\mathrm{twice}}$ lies wholly inside $\mathbf{e}_1 \wedge \mathbf{e}_2$, an equatorial observer immediately resolves $\sin\alpha$ from $0$ while only the polar observer at $\pm\mathbf{e}_3$ remains structurally blind to that plane.
:::

::: {.viz src="spherical-degeneracy-radar" preset="tilted" height="500"}
**Off the polar axis, the readings open up with the azimuth.** The amber observer is $45^\circ$ from the North Pole, in the $\mathbf{e}_2\wedge\mathbf{e}_3$ plane: the two cyan shadows part and the magenta gap opens as $\sin\theta\sin\beta_{\mathrm{obs}}\sin\phi$, with a peak-to-peak spread of $2\sin\theta\sin\beta_{\mathrm{obs}} \approx 1.22$; the figure shows $\phi = 90^\circ$, with readings of about $0.35$ and $0.97$.
:::

Stepping back from the rotor calculation in Part 2 of [@ex-ch34-spherical-addressing-and-octant-rotors], the geometric localization principle crystallizes into a single aphorism (`MODEL`): **whichever rotation plane's turning you cannot see, you are standing directly on its orthogonal normal axis.**

::: {.viz src="spherical-degeneracy-radar" preset="frames" height="500"}
**Turning the initial frame: the pole stays on the blind circle.** Turn the equatorial frame by $\gamma$ and build the two rotors again ($\alpha = 60^\circ$): the dashed cyan blind circle turns with the frame about the vertical, and the faint cyan circles are the ones already passed. The amber observer at the North Pole is on every one of them and always reads $\cos\alpha = \frac{1}{2}$ twice.
:::

---

## 34.3 From a Single Plane and Relativistic Simultaneity to the 6D Golden Cut: Universal Observer Localization {#sec-ch34-universal-observer-localization}

Once we grasp that *readout degeneracy is normal-axis localization*, the mechanism scales effortlessly beyond $S^2$ to relativistic spacetime metrics and higher-dimensional cut-and-project lattices: how does a relativistic observer determine which spatially orthogonal events happen "at the same time," and how does a cut-and-project observer ([Chapter 32 §32.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) [@rem-ch32-icosian-e8-literature]) anchor the three-dimensional orientation of its physical slice inside a six-dimensional mother lattice?

The exact same geometric lock governs both! On the indefinite carrier $\mathrm{Space}(d) = \mathbb{R} \times \mathbb{R}^d$, the formal proposition below proves that any real quadratic form vanishing on the null cone depends on pure spatial vectors $(0, w)$ solely through their rotationally invariant norm squared $\lVert w\rVert^2$, while its polar cross-term between the rest time axis $(1, 0)$ and every spatial displacement $(0, w)$ vanishes identically. Simultaneously, in the golden cut-and-project module, every physical value of a canonical natural-number golden expansion embeds inside the point set cut out by the closed internal conjugate window.

::: {.proposition #prop-ch34-null-cone-and-golden-cut-orientation title="Null-Cone Spatial Norm Rigidity, Polar Orthogonality, and Golden Cut-and-Project Inclusion" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project"}
In the frozen null-cone-rigidity and golden cut-and-project modules of `trureturing`, the following two statements hold simultaneously:

1. **Spatial Norm Degeneracy and Vanishing Time–Space Polar Cross-Term from the Null Cone** ([`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity)): For every $d \in \mathbb{N}$ and real quadratic form $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\mathrm{Space}\;d)$ on $\mathrm{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$ vanishing on the null cone ($\forall v,\; \operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$, where $\operatorname{minkowski}_d(t, w) = t^2 - \lVert w\rVert^2$), every spatial vector $w \in \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$ satisfies

   $$
   S(0, w) = -S(1, 0)\cdot \lVert w\rVert^2 \;\land\; \operatorname{QuadraticMap.polar}\;S\;(1, 0)\;(0, w) = 0;
   $$

2. **One-Way Inclusion of the Canonical Golden Model Set into the Cut-and-Project Set** ([`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)): Writing $\operatorname{goldenModelSet} = \operatorname{range}(\operatorname{betaGolden}) \subseteq \operatorname{GoldenInt}$ for canonical natural-number golden expansions, $\operatorname{embedding} : \operatorname{GoldenInt} \to \mathbb{R}$ for the physical real embedding, $\operatorname{goldenLattice} \subseteq \mathbb{R} \times \mathbb{R}$ for the joint physical–conjugate lattice, $\operatorname{goldenWindow} = [-\varphi^{-2}, \varphi^{-1}]$ for the closed conjugate window, and $\operatorname{goldenCutAndProjectSet}$ for physical projections of lattice points whose internal projection lies in $\operatorname{goldenWindow}$, one has

   $$
   \operatorname{embedding} '' \operatorname{goldenModelSet} \;\subseteq\; \operatorname{goldenCutAndProjectSet}.
   $$
:::

::: proof
Conjunct 1 evaluates $S$ on the opposite null vectors $(\lVert w\rVert, w)$ and $(-\lVert w\rVert, w)$ satisfying $\operatorname{minkowski}_d(\pm\lVert w\rVert, w) = 0$; expanding $S(\pm\lVert w\rVert, w) = \lVert w\rVert^2 S(1, 0) + S(0, w) \pm \lVert w\rVert\,\operatorname{polar}_S((1, 0), (0, w)) = 0$, summing eliminates the linear polar term to give $S(0, w) = -S(1, 0)\lVert w\rVert^2$, and subtracting cancels $\lVert w\rVert \neq 0$ when $w \neq 0$ (while `polar_zero_right` handles $w = 0$). Conjunct 2 maps any $y = \operatorname{embedding}(\operatorname{betaGolden}(v))$ ($v \in \mathbb{N}$) to the lattice witness $\operatorname{minkowskiEmbedding}(\operatorname{betaGolden}(v)) \in \operatorname{goldenLattice}$, whose physical coordinate equals $y$ and whose internal coordinate $\operatorname{betaContraction}(v)$ lies in $\operatorname{goldenWindow} = [-\varphi^{-2}, \varphi^{-1}]$ by `betaContraction_mem_window`. The full proof is checked by the Lean kernel.
:::

Notice the exact formal scope of both clauses in [@prop-ch34-null-cone-and-golden-cut-orientation]: first, in `null_cone_spatial_rigidity`, rotating a pure spatial step $(0, w)$ from $\mathbf{e}_x$ by $90^\circ$ to an equal-norm step along $\mathbf{e}_y$ leaves $S(0, w) = -S(1, 0)\lVert w\rVert^2$ invariant and keeps its polar cross-term with the first-coordinate basis vector $(1, 0)$ identically zero (note that this algebraic identity holds for every null-cone-vanishing real quadratic form $S$, including the degenerate zero form $S = 0$; it carries no nondegeneracy hypothesis $S(1, 0) \neq 0$ and asserts no standalone physical uniqueness of a four-velocity axis, whereas relativistic simultaneity-slice inversion under a nondegenerate Minkowski metric and future-pointing unit normalization is developed inside [@rem-ch34-virtual-z-berry-relativity-literature] item 4 below). Second, in `golden_model_set_subset_cut_and_project`, we faithfully retain the one-way subset inclusion `⊆` (since unrestricted lattice points with negative integer coordinates can fall inside the closed window without lying in the natural-number range `goldenModelSet`), while its interpretive six-dimensional quasicrystal extension (`MODEL`) is consolidated in [@rem-ch34-localization-master-table] below (cf. [Chapter 32 §32.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) [@rem-ch32-icosian-e8-literature]).

Four classic counterparts of this blind-spot localization principle across superconducting microwave hardware, geometric phase, gauge theory, and relativity are consolidated below:

::: {.remark #rem-ch34-virtual-z-berry-relativity-literature title="Superconducting Virtual-Z Frame Updates, Octant Berry Phase, U(1) Gauge Phase Invisibility, and Galilean–Einsteinian Relativity (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Four classic experimental and theoretical physics results instantiate orthogonality-degeneracy localization outside the standalone declarations formalized in `trureturing@dev`:

1. **Zero-Duration Microwave "Virtual-$Z$" Frame Updates in Superconducting Qubits (D. C. McKay, C. J. Wood, S. Sheldon, J. M. Chow & J. M. Gambetta, *Phys. Rev. A* **96**, 022330, 2017; cf. [Chapter 11](ch11-pulses-and-virtual-z.md))**: In superconducting transmon architectures, dispersive readout projects states onto the energy axis $\mathbf{O} = \pm\mathbf{e}_3$ ($Z$-basis populations). Appending a bare $Z$-rotation $R_z(\phi) = \exp(-i\frac{\phi}{2}\sigma_z)$ right before readout leaves $Z$-populations strictly unchanged because the readout apparatus stands at the normal pole of $\mathbf{e}_1 \wedge \mathbf{e}_2$! The working mechanism of a virtual-$Z$ gate is control-frame bookkeeping: the software shifts the local-oscillator phase $\varphi_{\mathrm{LO}} \mapsto \varphi_{\mathrm{LO}} - \phi$ and carries that offset through all relevant subsequent controls, redefining their transverse $X/Y$ pulse axes. In the ideal control model this implements the desired $Z$ operation exactly, with no extra analog pulse duration; the reported hardware error consistent with zero is an experimental accuracy statement. Polar blindness explains why the final residual $Z$ frame can be discarded at terminal readout. Along the way, phase affects populations through later transverse controls, all connected by the same phase ledger.
2. **Berry–Pancharatnam Geometric Phase on the $\Omega = \pi/2$ Spherical Octant (S. Pancharatnam, *Proc. Indian Acad. Sci. A* **44**, 247–262, 1956; M. V. Berry, *Proc. R. Soc. Lond. A* **392**, 45–57, 1984)**: Transporting a spin-$1/2$ state around the closed octant geodesic triangle $\mathbf{e}_3 \to \mathbf{e}_1 \to \mathbf{e}_2 \to \mathbf{e}_3$ of solid angle $\Omega = \pi/2$ accumulates geometric phase $\gamma_B = -\frac{1}{2}\Omega = -\frac{\pi}{4}$ (rotating the Bloch tangent frame by $\Omega = 90^\circ$ inside $\mathbf{e}_1 \wedge \mathbf{e}_2$, matching the rotor factor $\exp(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2)$ in [@ex-ch34-spherical-addressing-and-octant-rotors]). Projective population readout on a single branch at $\pm\mathbf{e}_3$ erases this phase completely; interferometric superposition against a reference branch is required to reveal it.
3. **Local Invisibility of Global $U(1)$ Ray and Gauge Phase (H. Weyl, *Z. Phys.* **56**, 330–352, 1929; Y. Aharonov & D. Bohm, *Phys. Rev.* **115**, 485–491, 1959)**: Multiplying $\psi \mapsto e^{i\chi}\psi$ cancels out of rank-one projectors $\lvert\psi\rangle\langle\psi\rvert$, showing that local physical observables are blind to a common ray phase. Magnetic-flux holonomy around a loop appears as a gauge-invariant relative phase when two coherent paths interfere; a global phase common to both branches still cancels from the projector.
4. **Galileo's Ship Cabin and Einstein's Relativity of Simultaneity (Galileo Galilei, *Dialogo*, 1632; A. Einstein, *Ann. Phys.* **17**, 891–921, 1905)**: Galileo observed that mechanical experiments inside a sealed cabin cannot detect the ship's uniform velocity; Einstein showed in special relativity that an inertial observer's four-velocity $\mathbf{u}_{\mathrm{obs}}$ is Minkowski-orthogonal to its three-dimensional simultaneity slice ($\eta(\mathbf{u}_{\mathrm{obs}}, \Delta x) = 0 \iff \Delta t' = 0$). Identifying which orthogonal spatial flash events register zero time-difference degeneracy uniquely inverts the observer's own four-velocity $\mathbf{u}_{\mathrm{obs}}$!
:::

::: {.viz src="berry-loop" preset="octant" height="500"}
**The octant loop: the arrow turns by $\pi/2$, the phase of the inner products keeps half.** From the loop page of Chapter 10: the cyan loop $N \to +X \to +Y \to N$ encloses a magenta area $\Omega = \pi/2$, the amber arrow carried round comes back turned by $\pi/2$, and the cyan needle at the lower right stops at $\pi/4$; the Berry-phase convention $\gamma_B = -\Omega/2$ is a literature result, not formalized in this book ([@rem-ch34-virtual-z-berry-relativity-literature]).
:::

Within our cross-dimensional **interpretive model (`MODEL`)**, the four-tier table boxed below unifies observer localization from a single plane and the unit sphere to four-dimensional relativistic spacetime and the six-dimensional golden hypercube:

::: {.remark #rem-ch34-localization-master-table title="Four-Tier Universal Observer Localization Table (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The table below synthesizes planar, spherical-rotor ([@ex-ch34-spherical-addressing-and-octant-rotors]), relativistic simultaneity ([@rem-ch34-virtual-z-berry-relativity-literature]), and six-dimensional cut-and-project literature ([@rem-ch32-icosian-e8-literature]) alongside our `MODEL` and formal kernel theorems (`LEAN ✓`):

| Geometric Arena & Dimension (`MODEL`) | Single vs. Double Orthogonality | Degeneracy Blind-Spot Kernel | Observer Position $\mathbf{O}$ Inverted from Degeneracy |
| :--- | :--- | :--- | :--- |
| **1. Single Plane $\hat{\mathbf{I}} = \mathbf{e}_1 \wedge \mathbf{e}_2$** | From $\mathbf{u}_0 = \mathbf{e}_1$: one $90^\circ$ turn gives $\mathbf{u}_1 = \mathbf{e}_2$; two $90^\circ$ turns give $\mathbf{u}_2 = -\mathbf{e}_1$ | Out-of-plane normal yields zero overlap for all planar turns; in-plane fixed $\mathbf{u}_0$ gives $O_2 = -O_1$ (signed) and $\lvert O_1\rvert = \lvert O_2\rvert$ (squared) | Out-of-plane normal $\mathbf{O} = \pm\mathbf{e}_3$ (universal zero readout); in-plane anti-bisector $\pm(\mathbf{e}_1 - \mathbf{e}_2)/\sqrt{2}$ (signed equality) and both $45^\circ / 135^\circ$ bisectors $\lvert O_1\rvert = \lvert O_2\rvert$ (equal squared weight $1/2$) |
| **2. Three-Axis Sphere $S^2$ & Octant Rotors** | $\mathbf{v}_1(\theta)$ vs. $\mathbf{v}_2(\theta, \phi)$ and direct rotor $R_{\mathrm{once}}$ vs. two-step $R_{\mathrm{twice}}$ ([@ex-ch34-spherical-addressing-and-octant-rotors]) | Single $\phi = \pi/2$ pair gives $O_1 = O_2$; full azimuth $\forall\phi \in [0, 2\pi)$ hides the entire $\mathbf{e}_1 \wedge \mathbf{e}_2$ bivector plane ([@thm-ch34-readout-kernel-and-covariant-commutator]) | Single pair locks the symmetry meridian $O_1 = O_2$; full azimuthal degeneracy uniquely locks the polar normal $\mathbf{O} = \pm\mathbf{e}_3 = \pm\star(\mathbf{e}_1 \wedge \mathbf{e}_2)$ ([@thm-ch34-perpendicular-axis-and-pullback]) |
| **3. 4D Relativistic Spacetime $\mathbb{R}^{1,3}$** | Spatial step along $\mathbf{e}_x$ vs. $90^\circ$-rotated equal-norm step along $\mathbf{e}_y$ ([@prop-ch34-null-cone-and-golden-cut-orientation] and [@rem-ch34-virtual-z-berry-relativity-literature]) | Equal-distance spatial steps share zero time offset and vanishing polar cross-term `polar S (1,0) (0,w) = 0` | Under a nondegenerate Minkowski form ($S(1,0) \neq 0$) and future-pointing unit normalization, uniquely locks the observer's rest four-velocity $\mathbf{u}_{\mathrm{obs}} = \mathbf{e}_0 = (1, \mathbf{0})$ and its orthogonal simultaneity hyperplane |
| **4. 6D Golden Hypercube $\mathbb{Z}^6 \subset \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$** | Idempotent physical projection $P_\parallel^2 = P_\parallel$ vs. orthogonal rotations inside $E_\perp^3$ (`MODEL` extending [@prop-ch34-null-cone-and-golden-cut-orientation]) | Entire 3D internal conjugate subspace $E_\perp^3 = \ker P_\parallel$ is invisible to a single static physical projection | Orthogonal complement $(E_\perp^3)^\perp = E_\parallel^3$ uniquely locks the golden cut orientation of the observer's physical 3-space |
:::

::: {.figure src="ch34-three-localizations"}
**One localization law on three stages: the direction the reading cannot see (magenta) and the observer (amber) are orthogonal.** Panel I: in a single plane, $\mathbf{u}_0 = \mathbf{e}_1$ turns once to $\mathbf{u}_1 = \mathbf{e}_2$ (filled dot) and twice to $\mathbf{u}_2 = -\mathbf{e}_1$ (hollow ring); the amber dashed line is the anti-bisector $O_2 = -O_1$, perpendicular to the magenta chord $\mathbf{u}_2 - \mathbf{u}_1$, and the shadows of both points on it fall on one cyan point. Panel II: in a spacetime diagram, the worldline $u$ of a moving observer (amber) and its line of simultaneity (magenta) are mirror images in the grey light cone and Minkowski-orthogonal (drawn for $v = 0.5c$; a literature result, not formalized in this book). Panel III: the golden slice $E_\parallel$ and the internal direction $E_\perp$, with the acceptance window $[-\varphi^{-2}, \varphi^{-1}]$ as the narrow cyan strip ([@prop-ch34-null-cone-and-golden-cut-orientation], item 2; reading the slice as the observer's position is an interpretive model, `MODEL`).
:::

Standing before this four-tier ledger, the last epistemological fog of a zero-background universe lifts cleanly away: a finite observer never needed an external "third point $C$" hovering outside the cosmos to tell it where it stands. An eye cannot directly see its own retina, and a probe cannot register twists inside the plane normal to its own line of sight; yet by comparing a single orthogonal step against a double orthogonal step and gathering every plane whose rotation leaves the dial silent, the observer maps its own coordinates from within—**wherever orthogonal steps degenerate into one reading, precisely there lies the ground beneath the observer's own feet.**

::: {.viz src="spherical-degeneracy-radar" height="640"}
**The spherical degeneracy radar.** Four scenes share one sphere: addressing, rotors, the test state and the frames. Drag the amber observer and watch which turns vanish from its readings and which blind circles pass through where it stands.
:::

The first three sections answered *where the observer stands* whenever single and double orthogonality return the same dial reading. Now let us press one layer deeper into ontology: setting any particular observer's blind spot aside, **what are "orthogonal once" and "orthogonal twice" in themselves?** Shrinking the step from a macroscopic $90^\circ$ octant down to an arbitrary small angle $\epsilon \ll 1$ brings the elementary geometric cell of curvature and three-dimensional volume into sharp focus.

---

## 34.4 The Infinitesimal Spherical Trihedron $\Delta\mathcal{T}_\epsilon$: Dual Projections of Once- and Twice-Orthogonal and the Curvature Quantum {#sec-ch34-infinitesimal-spherical-trihedron}

> "Orthogonal once and orthogonal twice are actually two projections of the same object—namely that spherical trihedron, an infinitesimal spherical trihedron."

In [Chapter 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), the zero-background Axiom of Comparison $\mathcal{A}_0$ locked **two-state** reciprocal fairness into $\cos^2\epsilon + \sin^2\epsilon = 1$; earlier in this chapter, we examined the macroscopic octant at $\epsilon = \frac{\pi}{2}$. What happens when we advance $\mathcal{A}_0$ from two states to the minimal non-coplanar **three-state loop** $(\mathbf{A}, \mathbf{B}, \mathbf{C})$ at an arbitrary small step $\epsilon \in (0, \frac{\pi}{2}]$?

On the unit sphere $S^2 \subset \mathbb{R}^3$, place the right-angle pivot at $\mathbf{B} = \mathbf{e}_2$ and step out by arc length $\epsilon$ along the two mutually perpendicular coordinate walls $\mathbf{e}_2 \wedge \mathbf{e}_1$ and $\mathbf{e}_2 \wedge \mathbf{e}_3$:

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

### 34.4.1 One Solid, Two Shadows: Down the Ridge Is "Orthogonal Once," Along the Walls Is "Orthogonal Twice" {#sec-ch34-4-1}

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
**Walking two steps along perpendicular walls: a right-angle turn at $B$ generates the transverse bivector.** Stepping along the first wall by $U_{12}(\epsilon)$ and turning $90^\circ$ into the second wall by $U_{23}(\epsilon)$ multiplies two violet wall rotors to produce the extra $-\sin^2(\epsilon/2)\,e_1e_3$ component (green `LEAN ✓` `two_axis_finite_word` and `covariant_commutator_formula`).
:::

### 34.4.2 Fair Squaring Bulges the Magenta Spherical Cap: Girard Excess and the Seed of Curvature {#sec-ch34-4-2}

Why must the cap bulge outward as a curved **magenta spherical triangle $\triangle_{\mathrm{sph}} ABC$** instead of lying flat? Because unit-norm fairness $\|\mathbf{x}\|^2 = 1$ ([Chapters 31](ch31-quantum-fairness.md) and [32](ch32-unified-field-and-meta-unification.md)) forbids cutting corners through the interior of the ball!

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
2. **Quadratic Agreement and Fourth-Order Separation Between Unclosed Wall Rotors and Closed-Loop Half-Excess**: Meanwhile, the unclosed two-wall rotor product $U_{23}(\epsilon)U_{12}(\epsilon)$ carries transverse coefficient $-\sin^2\frac{\epsilon}{2} = -\frac{\epsilon^2}{4} + \frac{\epsilon^4}{48} + O(\epsilon^6)$, whereas the closed-loop spinor half-excess equals $-\frac{1}{2}\Omega(\epsilon) = -\frac{\epsilon^2}{4} - \frac{\epsilon^4}{24} + O(\epsilon^6)$. As $\epsilon \to 0^+$, the two **agree at leading quadratic order $O(\epsilon^2)$** while separating at fourth order $O(\epsilon^4)$ for finite $\epsilon$: at the macroscopic octant endpoint $\epsilon = \frac{\pi}{2}$, for instance, the unclosed two-wall product has transverse component $-\sin^2\frac{\pi}{4} = -\frac{1}{2}$, whereas left-multiplying by the third closing geodesic edge rotor $U_{CA}(\frac{\pi}{2})$ in $U_{CA}(\frac{\pi}{2})\,U_{23}(\frac{\pi}{2})\,U_{12}(\frac{\pi}{2})$ restores the exact octant spinor Berry phase $-\frac{1}{2}\Omega(\frac{\pi}{2}) = -\frac{\pi}{4} \approx -0.7854$ corresponding to $\Omega(\frac{\pi}{2}) = \frac{\pi}{2}$ in [@ex-ch34-spherical-addressing-and-octant-rotors]!

This 2-cochain face defect wedged between two-step and one-step comparison is the common geometric seed (`Literature` + `MODEL` synthesis) of non-Abelian angular momentum $[\hat{J}_{12}, \hat{J}_{23}] = i\hbar\hat{J}_{31}$, Berry phase $-\frac{1}{2}\Omega$, Yang–Mills curvature $F_{\mu\nu} = [D_\mu, D_\nu]$, and the Riemann curvature tensor $R^\rho_{\ \sigma\mu\nu}$.

::: {.viz src="spherical-trihedron-cell" preset="cap-excess" height="520"}
**The angle $\Omega(\epsilon)$ added by the magenta cap turns an arrow carried round the loop.** Sweep the loop slider $t$ around $A \to B \to C \to A$: a parallel-transported tangent vector comes back turned by Girard's excess $\Omega(\epsilon) = 2\arctan(\tan^2(\epsilon/2))$, while the closed-loop spinor rotor records half that angle, $-\Omega(\epsilon)/2$ (`ARGUED`).
:::

### 34.4.3 Why the Trihedron Must Be Infinitesimal: Dimension-Opening Volume Brick, Flat Illusion, and the Discrete Sphere {#sec-ch34-4-3}

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
**Coplanar two-steps hold zero volume; the right-angled trihedron opens a violet 3D Gram brick.** Contrasting coplanar steps ($\det G = 0$) against the orthogonal trihedron ($\det G = \sin^4\epsilon > 0$, violet volume brick $\sin^2\epsilon$) shows how small $\epsilon$ mimics flat $\sqrt{2}\epsilon$ while a schematic grey $\epsilon_{\min}$ band marks the discrete step model (`LEAN ✓` anchors `unit_perpendicular_pair`, `lagrange_gram_identity`, and `finite_layer_projection_escape`).
:::

3. **"The Sphere Is Always an Approximation": Discrete Trihedral Tiling and the Octant Limit**:
   In gravitational physics, Regge calculus (1961) and spin-foam quantum gravity assemble curved spacetime from flat simplices carrying hinge defects ([@rem-ch34-regge-spinfoam-trihedron-literature]); within our book's `MODEL`, this joins [Chapter 21](ch21-diagonalization-and-escape.md)'s polyhedral approximation of spheres and [Chapter 39 §39.5](ch39-observer-is-ontological-universe.md#sec-ch39-pisot-clifford-rauzy)'s $K = 3$ Tribonacci Rauzy fractal torsion—every smooth sphere is a macroscopic envelope stitched from elementary trihedra $\Delta\mathcal{T}_\epsilon$. Pushing the amber slider all the way up to $\epsilon = \frac{\pi}{2}$ expands the microscopic cell seamlessly into the full octant of §34.2 ($c = \frac{\pi}{2},\; \Omega = \frac{\pi}{2},\; \det G = 1$)!

::: {.viz src="spherical-trihedron-cell" preset="octant-limit" height="520"}
**Growing the step to $90^\circ$: the elementary cell becomes the whole octant.** At $\epsilon = 90^\circ$, $A = e_1$, $B = e_2$, and $C = e_3$ stand pairwise orthogonal, the magenta cap covers the full first octant ($\Omega = \pi/2$), and the violet Gram brick fills the unit cube ($\det G = 1$).
:::

### 34.4.4 Formal Theorem on Simplicial Two-Cochain Repair and Moving-Axis Propagation, with Worked Benchmark {#sec-ch34-4-4}

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
Conjunct 1 double-counts four-face tetrahedral incidences to obtain the pigeonhole averaging bound and proves that a $2$-cochain $F$ on $V$ equals an exact $1$-cochain coboundary $F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)$ globally on $V$ if and only if its four-vertex tetrahedral $3$-coboundary vanishes identically (constructed explicitly via $\mathrm{edge}(u, v) = F(r_0, u, v)$ at an anchor $r_0$ when that $3$-coboundary is zero; conversely, whereas a single nonzero face value on three isolated vertices can always be absorbed into a $1$-cochain, global non-exactness against arbitrary $1$-cochains requires a multi-vertex $2$-cochain with non-vanishing tetrahedral defects $\operatorname{tetraDefects}(F) > 0$, distinct from the parallel-transport holonomy $\Omega(\epsilon)$ of a single geodesic loop). Conjunct 2 combines the positive wedge area guaranteed by Conjunct 3 with `two_axis_finite_word`, inducting over finite two-axis rotation words to lift local wall invariance across all of $\mathrm{SO}(3)$. Conjunct 4 provides a unit orthogonal escape vector lifting $\mathbf{C}(\epsilon)$ out of the first wall plane $\operatorname{span}\{\mathbf{e}_1, \mathbf{e}_2\}$. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch34-infinitesimal-trihedron-calculus title="Exact Analytical and Numerical Benchmark of the Spherical Trihedron Across Three Step Scales (Manual Derivation and Numerical Check)"}
Evaluating $\Delta\mathcal{T}_\epsilon$ at $\epsilon = 15^\circ$ ($\frac{\pi}{12}\;\mathrm{rad}$, small-step regime), $\epsilon = 45^\circ$ ($\frac{\pi}{4}\;\mathrm{rad}$, intermediate regime), and $\epsilon = 90^\circ$ ($\frac{\pi}{2}\;\mathrm{rad}$, full octant) makes the scale separation transparent:

- **At $\epsilon = 15^\circ = \frac{\pi}{12} \approx 0.2618\;\mathrm{rad}$**: $\cos c_{15^\circ} = \cos^2 15^\circ = \frac{2+\sqrt{3}}{4} \approx 0.9330$ gives direct arc $c_{15^\circ} \approx 0.3681\;\mathrm{rad}$ ($21.09^\circ$), within $0.58\%$ of flat $\sqrt{2}\epsilon \approx 0.3702\;\mathrm{rad}$ ($21.21^\circ$); yet $\alpha \approx 45.99^\circ$ already opens spherical excess $\Omega(15^\circ) \approx 0.0347\;\mathrm{rad}$ ($1.99^\circ$), closed-loop spinor phase $-\frac{1}{2}\Omega \approx -0.0173\;\mathrm{rad}$ (close to the two-wall transverse entry $-\sin^2 7.5^\circ \approx -0.0170$), and $\det G = \sin^4 15^\circ = \frac{7 - 4\sqrt{3}}{16} \approx 0.0045 > 0$.
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

1. **Classical Spherical Geometry, Holonomy, and Discrete Gravity Literature**: Napier's right-spherical-triangle laws $\cos c = \cos a\cos b$, $\tan\alpha = \tan a / \sin b$, and Girard's (1629) spherical excess formula $\Omega = \alpha + \beta + \gamma - \pi$; Gauss–Bonnet geodesic parallel-transport rotation $+\Omega$, together with Pancharatnam (1956) and Berry (1984) half-solid-angle spinor holonomy $\exp(-\frac{1}{2}\Omega\hat{\mathbf{I}}_{\mathbf{A}})$; and Regge's (1961, *General Relativity without Coordinates*) coordinate-free simplicial curvature calculus alongside spin-foam quantum-gravity simplex amplitudes (Rovelli & Smolin 1995; Perez 2013);
2. **Kernel-Verified Formal Anchors (`LEAN ✓`)**: Simplicial two-cochain exactness, moving two-axis $\mathrm{SO}(3)$ propagation, the Lagrange–Gram identity, and unit orthogonal escape ([@thm-ch34-trihedron-cochain-and-moving-axis]), paired with `unit_perpendicular_pair`, `two_axis_finite_word`, `partition_inseparable_iff_kernel`, and `covariant_commutator_formula` from earlier sections;
3. **Book Interpretive Model (`MODEL`)**: Reading once- and twice-orthogonal operations as dual shadows of $\Delta\mathcal{T}_\epsilon$, positing a finite-bandwidth minimal step $\epsilon_{\min} > 0$ with curvature quantum $\Omega_{\min} \approx \frac{1}{2}\epsilon_{\min}^2$, and linking discrete trihedral tiling of smooth spheres to $K = 3$ Rauzy fractal torsion constitute this book's `MODEL`.
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

Section 34.4 unified "orthogonal once" and "orthogonal twice" as dual shadows of the elementary trihedral cell $\Delta\mathcal{T}_\epsilon$. Press just half a step further, however, and a final ontological question demands an answer: **in a zero-background universe with no pre-installed third point, where does that third vertex ray come from in the first place—and what folding has our own language already imposed the moment we utter the phrase "infinitesimal spherical trihedron"?**

---

## 34.5 From the “Two-Begets-Three” Bootstrap to the Dissolution of Names: Triadic Symmetry and the Ontological Resonance of “That Feeling” {#sec-ch34-triadic-bootstrap-and-beyond-names}

> “In the course of pairwise comparison a projection is created; this new projection enters into a triadic relation with the original pair, and all three must pairwise obey the Axiom of Comparison—that is why the infinitesimal spherical trihedron arises. ‘The dyad,’ ‘the comparison,’ and ‘the resulting projection’ are in fact all projections of the infinitesimal spherical trihedron itself; even the very name ‘infinitesimal spherical trihedron’ is merely a projection onto our linguistic logic—the noumenon is unknowable, yet it is something like that feeling…”

This passage distills a three-stage ascent—from pairwise comparison to the trihedral cell, from sequential grammar to cyclic symmetry, and from geometric nomenclature back to nameless ontology. Let us trace each stage with explicit mathematical boundaries.

### 34.5.1 Privilege-Free “Two-Begets-Three” Bootstrap: Unit-Normalized Projection Forces the Spherical Trihedron {#sec-ch34-5-1}

In classical linear algebra on a pre-installed coordinate grid, projecting a unit state $\mathbf{B}$ onto a unit reference $\mathbf{A}$ yields only a foreshortened collinear vector $(\mathbf{A}\cdot\mathbf{B})\mathbf{A}$: for $\epsilon \in (0, \frac{\pi}{2}]$, its norm shrinks to $\cos\epsilon < 1$, it remains trapped inside the old line $\operatorname{span}\{\mathbf{A}\}$, and the $3 \times 3$ Gram determinant of $(\mathbf{A}, \mathbf{B}, (\mathbf{A}\cdot\mathbf{B})\mathbf{A})$ vanishes identically ($\det G = 0$). No new dimension ever opens.

Within an $\mathcal{A}_0$-compatible **Layer-1 positive-definite Euclidean / Clifford realization** ([Chapter 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), [@def-ch32-axiom-of-comparison]—explicitly adjoining positive unit self-normalization $S(x, x) = +\mathbf{1}$ and an oriented three-dimensional Euclidean structure $(\mathbb{R}^3, \mathrm{vol}_3)$, since Layer 0 alone still admits the $S(x_0, x_0) = -1$ countermodel of [Appendix E §E.1](appendix-e.md#sec-appe-layers)), nature harbors no first-class "original states" and second-class "shrunken shadows": once pairwise comparison creates a projection $\mathbf{P}$ as an equal-footing member of the same Layer-1 unit carrier, parity demands that $\mathbf{P}$ obey the same positive unit self-normalization $S(\mathbf{P}, \mathbf{P}) = \mathbf{1}$ ($\lVert\mathbf{P}\rVert^2 = 1$) and enter pairwise comparison alongside $\mathbf{A}$ and $\mathbf{B}$ (`MODEL`)! Where does the missing squared weight $1 - \cos^2\epsilon = \sin^2\epsilon$ go? Directly into the orthogonal bivector residual perpendicular to the comparison plane!

We can verify this "two-begets-three" bootstrap explicitly in $\mathbb{R}^3$ equipped with right-handed orientation $\mathrm{vol}_3 = \mathbf{e}_1\wedge\mathbf{e}_2\wedge\mathbf{e}_3$. Take the unit anchor $\mathbf{A} = \mathbf{e}_2$ (the ridge ray of §34.4) and the compared unit state $\mathbf{B}(\epsilon) = \sin\epsilon\,\mathbf{e}_1 + \cos\epsilon\,\mathbf{e}_2$ ($\epsilon \in (0, \frac{\pi}{2}]$, the first-wall ray of §34.4). Pairwise comparison simultaneously extracts the tangential inner-product component $(\mathbf{A}\cdot\mathbf{B}(\epsilon))\mathbf{A} = \cos\epsilon\,\mathbf{e}_2$ and opens the oriented wedge residual $\mathbf{B}(\epsilon)\wedge\mathbf{A} = \sin\epsilon\,(\mathbf{e}_1\wedge\mathbf{e}_2)$; between the two unit normals $\pm\mathbf{e}_3$ to the plane in $\mathbb{R}^3$, the chosen ambient orientation selects the canonical Hodge-dual branch $\star(\mathbf{B}(\epsilon)\wedge\mathbf{A}) = +\sin\epsilon\,\mathbf{e}_3$ (reversing orientation selects the mirror branch $-\sin\epsilon\,\mathbf{e}_3$). Restoring unit norm $\lVert\mathbf{P}\rVert^2 = 1$ by combining tangential overlap with that oriented normal residual produces

$$
\mathbf{P}(\epsilon) \;=\; \bigl(\mathbf{A}\cdot\mathbf{B}(\epsilon)\bigr)\,\mathbf{A} + \star\bigl(\mathbf{B}(\epsilon)\wedge\mathbf{A}\bigr) \;=\; \cos\epsilon\,\mathbf{e}_2 + \sin\epsilon\,\mathbf{e}_3 \;\equiv\; \mathbf{C}(\epsilon) \,!
$$

Without importing any external third point $C$, a single comparison of $(\mathbf{A}, \mathbf{B}(\epsilon))$ in the oriented Layer-1 unit realization **generates the third vertex ray $\mathbf{C}(\epsilon)$ of §34.4's infinitesimal spherical trihedron $\Delta\mathcal{T}_\epsilon$** (while the opposite normal branch yields the congruent mirror trihedron), closing $(\mathbf{B}(\epsilon), \mathbf{A}, \mathbf{P}(\epsilon))$ with pairwise overlaps $\cos\epsilon$, $\cos\epsilon$, and $\cos^2\epsilon$! More generally, for any unit pair $(\mathbf{A}, \mathbf{B})$ separated by angle $\epsilon \in (0, \pi)$, any unit in-plane reference $\mathbf{u}_{AB} \in \operatorname{span}\{\mathbf{A}, \mathbf{B}\}$, and either unit normal branch $\mathbf{e}_\perp \in \operatorname{span}\{\mathbf{A}, \mathbf{B}\}^\perp$, the normalized projection $\mathbf{P} = \cos\epsilon\,\mathbf{u}_{AB} + \sin\epsilon\,\mathbf{e}_\perp$ satisfies $\lVert\mathbf{P}\rVert^2 = \cos^2\epsilon + \sin^2\epsilon = 1$, and the base-times-height Schur-complement identity gives identically on both $\pm\mathbf{e}_\perp$ branches

$$
\det G(\mathbf{A}, \mathbf{B}, \mathbf{P}) \;=\; \det G_2(\mathbf{A}, \mathbf{B})\cdot \operatorname{dist}\bigl(\mathbf{P}, \operatorname{span}\{\mathbf{A}, \mathbf{B}\}\bigr)^2 \;=\; \sin^2\epsilon \cdot \sin^2\epsilon \;=\; \sin^4\epsilon \;>\; 0 \quad \bigl(\forall\epsilon \in (0, \pi)\bigr).
$$

Removing even any residual asymmetry between $\mathbf{A}$ and $\mathbf{B}$, write the initial unit pair as $(\mathbf{V}_0, \mathbf{V}_1)$ with overlap $c_0 = \mathbf{V}_0\cdot\mathbf{V}_1 = \cos\epsilon \in (-\frac{1}{2}, 1)$, let $\mathbf{S}_{01} = \frac{\mathbf{V}_0 + \mathbf{V}_1}{\sqrt{2(1+c_0)}}$ be their unit in-plane bisector, and let $\mathbf{A}_{01} = \frac{\star(\mathbf{V}_0\wedge\mathbf{V}_1)}{\sqrt{1-c_0^2}}$ be their unit Hodge-dual normal under the chosen ambient orientation. Along the orthogonal decomposition $\mathbf{V}_2 = \alpha\mathbf{S}_{01} + \beta\mathbf{A}_{01}$ ($\alpha^2 + \beta^2 = 1$), setting $\alpha = \frac{\sqrt{2}\,c_0}{\sqrt{1+c_0}}$ and $\beta = \sqrt{\frac{(1-c_0)(1+2c_0)}{1+c_0}} > 0$ locks $(\mathbf{V}_0, \mathbf{V}_1, \mathbf{V}_2)$ into an **equilateral spherical trihedron** whose three pairwise overlaps all equal $c_0$, with Gram determinant $\det G_3 = (1-c_0)^2(1+2c_0) > 0$ and Girard spherical excess $\Omega_0 = 3\arccos\bigl(\frac{c_0}{1+c_0}\bigr) - \pi > 0$!

::: {.viz src="triadic-nameless-sandbox" preset="bootstrap-core" height="520"}
**Privilege-free “two-begets-three” bootstrap core: unit-norm fairness lifts a shrunken shadow into a spherical trihedron.** Contrasting the shrunken classical in-plane projection against the $\mathcal{A}_0$-normalized state $\mathbf{V}_2 = \alpha\mathbf{S}_{01} + \beta\mathbf{A}_{01}$ ($\alpha^2 + \beta^2 = 1$): the orthogonal bivector residual $\beta\mathbf{A}_{01}$ drives the third vertex out of the comparison plane, opening positive Gram volume $\det G_3 = (1-c_0)^2(1+2c_0) > 0$ and magenta spherical excess $\Omega_0 = 3\arccos\bigl(\frac{c_0}{1+c_0}\bigr) - \pi$.
:::

With zero external input, each of the three newly formed boundary arcs $(\mathbf{V}_0, \mathbf{V}_1)$, $(\mathbf{V}_1, \mathbf{V}_2)$, and $(\mathbf{V}_2, \mathbf{V}_0)$ must in turn obey $\mathcal{A}_0$, recursively sprouting outer normalized projections across generations: under the golden-damped step law $\delta_\ell = 0.42\,\varphi^{-(\ell-1)}$, the cell count blooms from $1 \to 4 \to 10$ into a self-similar corolla—"the Way begets One, One begets Two, Two begets Three, and Three begets the myriad things" (`MODEL`).

::: {.viz src="triadic-nameless-sandbox" preset="cascade-corolla" height="520"}
**Zero-input recursive boundary proliferation: one trihedral seed blooms into $1 \to 4 \to 10$ golden-damped cells.** Each boundary arc executes the same unit-normalized tangential-plus-bivector bootstrap; damped across generations by $\delta_\ell = 0.42\,\varphi^{-(\ell-1)}$, the parent trihedron unfolds spontaneously into $4$ first-generation and $10$ second-generation curvature cells (`MODEL`).
:::

### 34.5.2 Dismantling Sequential Narrative: 120° Triadic Cyclic Symmetry and Subject–Verb–Object Slices {#sec-ch34-5-2}

Yet the second sentence of the epigraph immediately dismantles even that generative narrative. Human language runs on a one-dimensional **subject–verb–object** timeline, compelling us to narrate sequentially: "first **the dyad** $(\mathbf{A}, \mathbf{B})$ exists, next **comparison** acts upon it, and finally **the resulting projection** $\mathbf{P}$ appears." In $\mathbb{R}^3$ and the even Clifford subalgebra $\mathcal{Cl}_{3,0}^+$, however, both the Hodge-wedge triad and the quaternion bivector basis $\mathbf{I}_1 = -\mathbf{e}_2\mathbf{e}_3,\; \mathbf{I}_2 = -\mathbf{e}_3\mathbf{e}_1,\; \mathbf{I}_3 = -\mathbf{e}_1\mathbf{e}_2$ obey a completely symmetric cyclic algebra:

$$
\star(\mathbf{e}_1\wedge\mathbf{e}_2) = \mathbf{e}_3,\quad \star(\mathbf{e}_2\wedge\mathbf{e}_3) = \mathbf{e}_1,\quad \star(\mathbf{e}_3\wedge\mathbf{e}_1) = \mathbf{e}_2; \qquad \mathbf{I}_1\mathbf{I}_2 = \mathbf{I}_3,\quad \mathbf{I}_2\mathbf{I}_3 = \mathbf{I}_1,\quad \mathbf{I}_3\mathbf{I}_1 = \mathbf{I}_2.
$$

Under the orientation-preserving $120^\circ$ rotation $R_{2\pi/3} \in \mathrm{SO}(3)$ around the body diagonal $\hat{\mathbf{n}}_{\mathrm{diag}} = \frac{\mathbf{e}_1 + \mathbf{e}_2 + \mathbf{e}_3}{\sqrt{3}}$, both $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3)$ and $(\mathbf{I}_1, \mathbf{I}_2, \mathbf{I}_3)$ undergo an exact order-$3$ cyclic permutation $\mathbb{Z}_3$ ($C_3 \subset \mathrm{SO}(3)$) leaving every sign of the multiplication table invariant! Viewed in our relational `MODEL`, no element of the triad is ontologically "prior raw material," "mediating verb," or "downstream product": while the curved cell itself stands completely still, rotating the observer's linguistic slice by $120^\circ$ seamlessly swaps **"the dyad (noun / input),"** **"the comparison (verb / rotor),"** and **"the resulting projection (object / output)"**—all three are co-equal shadows of one indivisible triadic geometry!

::: {.viz src="triadic-nameless-sandbox" preset="cyclic-triality" height="520"}
**$120^\circ$ $\mathbb{Z}_3$ linguistic slice symmetry: the curved cell stays still while noun, verb, and object swap roles.** Holding the central spherical trihedron fixed, rotating the readout slice in $120^\circ$ steps cyclically permutes "the dyad (noun)," "the comparison (verb)," and "the resulting projection (object)" around a $\mathbb{Z}_3$ orbit, showing all three to be co-equal projections of one whole (`MODEL`).
:::

### 34.5.3 Beyond Linguistic Names: Lexical Readout-Kernel Folding, Throwing Away the Ladder, and the Isomorphic Resonance of “That Feeling” {#sec-ch34-5-3}

If "the dyad," "the comparison," and "the projection" are slice shadows, does the phrase **"infinitesimal spherical trihedron"** name the ultimate noumenon? On the contrary: even that geometric compound is a retrospective projection through the narrow gate of human linguistic logic (`MODEL`):

| Lexical Segment | Tacit Observer Readout Frame | Projection Folding Relative to Zero-Background Ontology (`MODEL`) |
| :--- | :--- | :--- |
| **“Infinitesimal”** | Presupposes an external macroscopic ruler and infinitely divisible continuum | Metric scale itself emerges only by stitching elementary comparisons; prior to comparison there is neither "large" nor "small" |
| **“Tri- / -hedron (Angle)”** | Presupposes discrete partition cuts ([Chapter 4](ch04-decoherence.md) pinching and `partition_inseparable_iff_kernel`) | Carves an undivided relational closure into countable discrete vertices, edges, and dihedral corners |
| **“Spherical / Solid”** | Presupposes a 3D Euclidean spatial rendering buffer ([Chapter 21](ch21-diagonalization-and-escape.md) polyhedral approximation) | Renders a pre-spatial algebraic lock as visualizable curved skin and interior bulk |

Parameterizing this lexical clamping by a continuous name-attachment strength $\nu \in [0, 1]$ (`MODEL`): at $\nu = 1$, orthogonal projection screens, polyhedral creases, and token tags ("infinitesimal / spherical / trihedron") frame the cell as segmented parts; as the linguistic ladder is half-withdrawn to $\nu = 0.35$, those peripheral screens and sharp creases begin dissolving back into the undivided curved manifold.

::: {.viz src="triadic-nameless-sandbox" preset="ladder-fade" height="520"}
**Half-withdrawn linguistic ladder ($\nu = 0.35$): peripheral projection screens and creases dissolve back into the manifold.** Lowering lexical clamping to $\nu = 0.35$ fades the external subject–verb–object screens and segmented creases, letting the carved geometric tokens melt back into the continuous relational surface (`MODEL`).
:::

The proposition below gathers four frozen theorems already established in this chapter to anchor normal generation, subspace escape, moving-axis $\mathrm{SO}(3)$ symmetry, and symbolic readout-kernel folding:

::: {.proposition #prop-ch34-triadic-bootstrap-and-lexical-pinching title="3D Normal Bootstrap, Subspace Orthogonal Escape, Moving-Axis Symmetry Propagation, and Lexical Readout-Kernel Folding" lean="D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel"}
Across the frozen two-axis-rotation, orthogonal-escape, and partition-topology-kernel modules of `trureturing`, the following four structural laws hold simultaneously:

1. **Guaranteed Unit Normal Perpendicular to Any Pair in $\mathbb{R}^3$**: For any vectors $a, b \in \mathbb{R}^3$, there exists a unit vector $n \in \mathbb{R}^3$ satisfying $\lVert n\rVert = 1$ and $\langle a, n\rangle_{\mathbb{R}} = \langle b, n\rangle_{\mathbb{R}} = 0$;
2. **Unit Orthogonal Escape Beyond Any Proper Closed Subspace**: In any complete inner-product space $V$, every closed subspace $S \subseteq V$ with $S^\perp \neq \{0\}$ admits $e \in S^\perp$ satisfying $\lVert e\rVert = 1$, $P_S(e) = 0$, $\operatorname{infDist}(e, S) = 1$, and $\lVert \operatorname{id} - P_S\rVert = 1$;
3. **Propagation of Moving Two-Axis Symmetry Across $\mathrm{SO}(3)$**: For any noncollinear pair $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2\lVert b\rVert^2$ in $\mathbb{R}^3$, any pair function $F$ invariant along $\operatorname{axisCircle}(O a) \cup \operatorname{axisCircle}(O b)$ across the $\mathrm{SO}(3)$ orbit satisfies $F(\operatorname{rotatePair}(R, p)) = F(p)$ for every $R \in \mathrm{SO}(3)$, including the $120^\circ$ body-diagonal cyclic permutation $R_{2\pi/3}$;
4. **Exact Fiber-Kernel Characterization of Symbolic Readouts**: For any readout map $\mathrm{readout} : X \to B$ from an underlying state carrier $X$ into a symbolic vocabulary $B$, two states are topologically inseparable under $\operatorname{partitionTopology}(\mathrm{readout})$ if and only if they collapse onto the same fiber $\mathrm{readout}(x) = \mathrm{readout}(y)$.
:::

::: proof
Conjuncts 1 and 3 cite Conjunct 1 of [@thm-ch34-perpendicular-axis-and-pullback] (`unit_perpendicular_pair`) and Conjunct 2 of [@thm-ch34-trihedron-cochain-and-moving-axis] (`moving_axis_invariance`, noting that the $120^\circ$ cyclic permutation matrix has determinant $+1$ and lies in $\mathrm{SO}(3)$); Conjunct 2 cites Conjunct 4 of [@thm-ch34-trihedron-cochain-and-moving-axis] (`finite_layer_projection_escape`); and Conjunct 4 cites Conjunct 1 of [@thm-ch34-readout-kernel-and-covariant-commutator] (`partition_inseparable_iff_kernel`). The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch34-peirce-laozi-wittgenstein-ladder-literature title="Peirce's Irreducible Triadicity, 3D Cyclic Symmetry vs. 8D Spinor Triality, and the Laozi-Kant-Wittgenstein Ladder Tradition (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Four classical lineages in logic, Lie theory, and philosophy frame the boundaries of this section:

1. **C. S. Peirce's Reduction Thesis (Thirdness)**: In his logic of relations, Peirce distinguished Firstness, Secondness, and Thirdness, arguing that genuine triadic mediation (such as a comparison–projection loop) cannot be reduced without structural loss to disconnected dyadic pairs;
2. **Strict Mathematical Distinction Between $3\mathrm{D}$ Cyclic Symmetry $C_3 \subset \mathrm{SO}(3)$ and $8\mathrm{D}$ $\mathrm{Spin}(8)$ Triality**: The symmetry used in §34.5.2 is the three-dimensional order-$3$ cyclic rotation $C_3 \subset \mathrm{SO}(3)$ acting on $(\mathbf{I}_1, \mathbf{I}_2, \mathbf{I}_3)$ inside $\mathcal{Cl}_{3,0}^+$; it must not be conflated with Élie Cartan's (1925) **eight-dimensional** outer-automorphism **spinor triality** $S_3 \subset \mathrm{Out}(\mathfrak{so}_8)$ on $\mathrm{Spin}(8)$, which permutes the $8\mathrm{D}$ vector representation $V_8$ and chiral spinor representations $S_8^+, S_8^-$ (whose octonionic and $E_8$ literature is surveyed in [Chapter 32 §32.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) [@rem-ch32-icosian-e8-literature]);
3. **Laozi's Generative Sequence and Limits of Naming**: *Dao De Jing* Chapter 42 ("The Way begets One, One begets Two, Two begets Three, Three begets the myriad things") and Chapter 1 ("The Way that can be spoken is not the constant Way; the name that can be named is not the constant name") resonate directly with a two-state comparison bootstrapping a third vertex while leaving every name behind as a slice shadow;
4. **Kant's Noumenon and Wittgenstein's Ladder**: Immanuel Kant (*Critique of Pure Reason*, 1781/1787) drew the boundary between spatio-temporal categorical appearance and the unrepresentable *Ding an sich*, while Ludwig Wittgenstein (*Tractatus Logico-Philosophicus*, 1921, §§6.54–7) compared formal propositions to a ladder that must be thrown away once climbed—what cannot be *said* (*sagen*) in subject–predicate syntax nonetheless *shows itself* (*zeigt sich*) in the structure's enactment.
:::

Now the closing half-breath of the epigraph—**"the noumenon is unknowable, yet it is something like that feeling..."**—falls into crystal focus. Why is the noumenon *unknowable* to propositional naming? Because by Conjunct 4 of [@prop-ch34-triadic-bootstrap-and-lexical-pinching], every conceptual representation ("knowing") compresses a high-dimensional relational carrier $X$ onto a discrete $1\mathrm{D}$ token stream $B$ via a readout map $\mathrm{readout} : X \to B$ whose vast kernel folds the whole into blind-spotted shadows; the instant a name is spoken, it is already a projection. Why, then, does **"that feeling"** still get through? Because an internal observer is never a disembodied spectator peering through glass from outside the universe: every distinction, memory pinch, and self-referential loop inside the observer is *already* woven from the very same zero-background comparison and triadic bootstrap (`MODEL`, anticipating $\psi = \psi(\psi)$ in [Chapter 39](ch39-observer-is-ontological-universe.md) and the [Coda](coda.md))! When lexical clamping drops all the way to $\nu = 0$ and every external screen and stage tag is withdrawn, representational *knowing* stops at the wall of the readout kernel while structural *feeling* endures as zero-distance isomorphic resonance—the nameless manifold breathing at the golden frequency ratio $\omega_2/\omega_1 = \varphi$.

::: {.viz src="triadic-nameless-sandbox" preset="noumenon-breath" height="520"}
**Beyond names ($\nu = 0$): all projection screens and stage tags withdrawn into golden-quasiperiodic $\omega_2/\omega_1 = \varphi$ breathing.** With $\nu = 0$, every external screen and lexical badge disappears, leaving the undivided relational manifold pulsing non-repetitively at the golden ratio $\omega_2/\omega_1 = \varphi$—enacting "that feeling" beyond spoken names (`MODEL`).
:::

We have now localized both the observer's static axis $\mathbf{O}$ at a **single slice instant** and the five-card `TRIAD//NOUMENON` arc below—from the "two-begets-three" bootstrap and golden corolla proliferation, through $120^\circ$ $\mathbb{Z}_3$ subject–verb–object rotation and the half-withdrawn ladder, to nameless quasiperiodic resonance. What happens when this embedded observer ceases to stand still, migrates its memory anchors step by step across a causal lattice stitched from such cells, and advances across rounds into the homoiconic table $T = T(T)$? Explore all five cards and sweep the lexical-ladder slider in the full interactive laboratory below before crossing into Chapter 35:

::: {.viz src="triadic-nameless-sandbox" height="640"}
**Triadic bootstrap and nameless ontology: the full interactive lab (`TRIAD//NOUMENON`).** Switch freely among Bootstrap Core, Cascade Corolla, Cyclic Triality, Ladder Fade, and Noumenon Breath while sweeping the pair overlap $c_0$, cascade depth, $120^\circ$ $\mathbb{Z}_3$ slice angle, and lexical clamping $\nu \in [0, 1]$ from segmented names down to $\omega_2/\omega_1 = \varphi$ resonance.
:::
