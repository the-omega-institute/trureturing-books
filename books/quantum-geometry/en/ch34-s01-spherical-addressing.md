# 34.1 Second-Orthogonality Invisibility in Spherical Addressing: Symmetry Meridian and Polar Normal Inversion {#sec-ch34-spherical-addressing-inversion}

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
