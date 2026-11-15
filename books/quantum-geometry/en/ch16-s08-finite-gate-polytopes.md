# 16.8 Finite Gate Words and Three-Dimensional Polytope Approximation {#sec-finite-gate-polytope}

So far we have treated rotation angles $\theta$ and $\phi_k$ as continuous real parameters. In fault-tolerant quantum architectures ([Chapter 14](ch14-cloning-codes-and-braids.md)), however, hardware provides only a **finite discrete gate alphabet** — typically the Clifford+$T$ pair $\{H, T\}$.

To contrast **exact generation by continuous two-axis circles** with **polytope approximation by finite words over a discrete gate set**, let us first state the continuous two-axis theorem from `D5/S3/Geometry/TwoAxisFiniteRotation.lean`. Let $\mathrm{Space} = \mathrm{EuclideanSpace}\,\mathbb{R}\,(\mathrm{Fin}\,3) \cong \mathbb{R}^3$ and $\mathrm{Orthogonal} = \mathrm{Space} \simeq_{\mathrm{li}}[\mathbb{R}] \mathrm{Space}$, with $\mathrm{determinant}(R) = \mathrm{LinearMap.det}(R.\mathrm{toLinearMap})$. For any vector $a \in \mathrm{Space}$, the full **continuous axis circle** is

$$
\mathrm{axisCircle}(a) = \bigl\{R : \mathrm{Orthogonal} \;\big|\; \mathrm{determinant}(R) = 1 \land R(a) = a\bigr\},
$$

and `IsAxisWord a b l` means every element of $l : \mathrm{List}\,\mathrm{Orthogonal}$ lies in $\mathrm{axisCircle}(a)$ or $\mathrm{axisCircle}(b)$ (where `wordGroup` takes finite products without topological closure). Whenever $a, b$ have strictly positive Gram determinant ($\langle a, b\rangle_{\mathbb{R}}^2 < \norm{a}^2\norm{b}^2$, with no normalization assumption on $a, b$), every proper rotation $R \in \mathrm{SO}(3)$ is an exact finite product of letters from $\mathrm{axisCircle}(a) \cup \mathrm{axisCircle}(b)$.

::: {.proposition #prop-two-axis-finite-word title="Exact Finite-Word Generation of SO(3) by Two Non-Collinear Continuous Axis Circles" lean="D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word"}
Let $a, b \in \mathrm{Space}$ satisfy the strict Cauchy–Schwarz inequality

$$
\langle a, b\rangle_{\mathbb{R}}^2 < \norm{a}^2 \cdot \norm{b}^2.
$$

Then for every orthogonal linear isometry $R : \mathrm{Orthogonal}$ with $\mathrm{determinant}(R) = 1$, there exists a finite list $l : \mathrm{List}\,\mathrm{Orthogonal}$ such that

$$
\mathrm{IsAxisWord}(a, b, l) \;\land\; l.\mathrm{prod} = R.
$$
:::

::: proof
The strict inequality $\langle a, b\rangle_{\mathbb{R}}^2 < \norm{a}^2 \norm{b}^2$ ensures that $a$ and $b$ are linearly independent in $\mathbb{R}^3$. Because each letter may be chosen with an **arbitrary continuous rotation angle** from the full circle $\mathrm{axisCircle}(a)$ or $\mathrm{axisCircle}(b)$, alternating a finite number of rotations around $a$ and $b$ (generalized Euler-angle factorization) transports the axis $a$ to $R(a)$ and then aligns the orthogonal plane via a final rotation in $\mathrm{axisCircle}(a)$, yielding $l.\mathrm{prod} = R$ exactly. The full proof is checked by the Lean kernel.
:::

**Crucial distinction: never confuse continuous two-axis generation ([@prop-two-axis-finite-word]) with discrete $\{H, T\}$ gate compilation!**

In [@prop-two-axis-finite-word], each step chooses any continuous angle from $\mathrm{axisCircle}(a)$ or $\mathrm{axisCircle}(b)$, giving no bound on word length $L$ or discretization error $\varepsilon$. For a finite discrete gate set $\{H, T\}$, we use distinct notation to formulate **the finite-$L$ state orbit and Liu Hui's three-dimensional 割圆术 (polytope approximation)** (Figure 16, Panel II):

1. **Operator groups $\mathrm{SU}(2)/\mathrm{PU}(2)$ versus the Bloch sphere $S^2$**: Let $H = (X + Z)/\sqrt{2}$ and $T = \operatorname{diag}(1, e^{i\pi/4})$. Modulo global phase, $[H], [T] \in \mathrm{PU}(2) \cong \mathrm{SO}(3)$; in $\mathrm{SU}(2)$, we take unimodular lifts $\tilde{H} = i H$ and $\tilde{T} = e^{-i\pi/8} T$ with $\det\tilde{H} = \det\tilde{T} = 1$. Recall that $\mathrm{SU}(2) \to \mathrm{SO}(3)$ is a $2$-to-$1$ cover with $\mathrm{SU}(2) \cong S^3$ and $\mathrm{SO}(3) \cong \mathbb{R}\mathrm{P}^3$ — neither $3$-dimensional group manifold equals the $2$-sphere $S^2$!
2. **The finite-word reachable orbit $\mathcal{S}_L \subset S^2$ of a fixed initial state**: Fix an initial Bloch vector $\vv{r}_0 \in S^2$ (e.g., $\vv{r}_0 = \vv{e}_z$). For each word-length budget $L \in \mathbb{N}$, define the word set $\mathcal{W}_L = \{w \in \{H, T\}^* : |w| \le L\}$ (including the empty word) and the reachable state orbit

   $$
   \mathcal{S}_L = \bigl\{R_w \vv{r}_0 \;\big|\; w \in \mathcal{W}_L\bigr\} \subset S^2.
   $$

   Note that $\mathcal{S}_L$ is the orbit of a **fixed initial state $\vv{r}_0$**, not the full $3$-parameter gate space; using $|w| \le L$ ensures monotonic nesting $\mathcal{S}_L \subseteq \mathcal{S}_{L+1}$ with $|\mathcal{S}_L| \le \sum_{j=0}^L 2^j = 2^{L+1} - 1$ (collisions can reduce the count).

::: {.viz src="gate-word-polytope" preset="one" height="500"}
**Length 1: a segment.** The north pole is fixed by $T$, and only $H$ carries it to $\vv{e}_x$: the two cyan points span a segment, nothing like a polytope yet. The amber target sits on $\vv{e}_x$, the word $H$ hits it exactly, and there is no magenta gap; violet marks the axes of $H$ and $T$.
:::

3. **The Euclidean convex hull $P_L = \operatorname{conv}(\mathcal{S}_L)$ and geodesic polytopes**: The Euclidean convex hull $P_L = \operatorname{conv}(\mathcal{S}_L) \subset \mathbb{R}^3$ is a finite-vertex convex polytope inscribed in the unit ball. For small $L$ ($L = 0, 1, 2$), $P_L$ degenerates to a point, segment, or planar polygon (do not claim $P_L$ is $3$-dimensional for every $L$!). When $P_L$ is $3$-dimensional, its facets are **flat Euclidean chordal polygons** (never call them intrinsically flat faces of $S^2$). When $0 \in \operatorname{int}(P_L)$, radially projecting the edges and faces of $P_L$ onto $S^2$ yields a spherical mesh of great-circle arcs called a **geodesic polytope** — a term referring strictly to the radial projection mesh on $S^2$, while $P_L = \operatorname{conv}(\mathcal{S}_L)$ itself remains a flat-faced Euclidean polytope.

::: {.viz src="gate-word-polytope" preset="six" height="500"}
**Length 6: around the centre, projected onto the sphere.** The hull of the $19$ reachable points now holds the centre, and projecting its edges radially onto the sphere gives a mesh of cyan great-circle arcs (a geodesic polytope). The largest hole in the mesh is the empty cap circled in dashed magenta, of radius $\varepsilon_6 = 47.27^\circ$, with the amber arrow at its centre. What is drawn here is where finite gate words land on the sphere, not the polygon of the planar circle-cutting in [Chapter 21](ch21-diagonalization-and-escape.md).
:::

4. **Strict positivity of the covering residual $\varepsilon_L > 0$ and curvature mismatch**: Because $S^2$ is compact and $\mathcal{S}_L$ is finite, the worst-case geodesic covering radius

   $$
   \varepsilon_L = \max_{\vv{r} \in S^2}\, \min_{\vv{s} \in \mathcal{S}_L} \arccos(\vv{r} \cdot \vv{s}) > 0
   $$

   is **strictly positive** for every finite $L$ and monotonically non-increasing ($\varepsilon_{L+1} \le \varepsilon_L$; asymptotic compilation properties of universal discrete gate sets are documented separately in [@rem-solovay-kitaev-literature] and do not follow from [@prop-two-axis-finite-word]). Along any outward unit facet normal $\vv{n} \in S^2 \setminus \mathcal{S}_L$ with support height $h = \max_{\vv{s} \in \mathcal{S}_L} (\vv{n} \cdot \vv{s}) < 1$, a positive **radial support gap** $1 - h > 0$ separates the flat chordal face from the sphere, even though the vertices $\vv{s} \in \mathcal{S}_L$ lie on $S^2$ (for the classical differential-geometric and polyhedral angular-defect comparison between round spheres and flat-faced polyhedra, see [Chapter 21](ch21-diagonalization-and-escape.md), [@rem-hairy-ball-adams-literature]).

::: {.viz src="gate-word-polytope" preset="nearest" height="500"}
**The point nearest the target, and its word.** With $L \le 10$ there are $64$ reachable points. The amber target is at $\theta = 110^\circ$, $\varphi = 200^\circ$: the nearest reachable point is reached by the word $HTHTTTTTH$, $17.04^\circ$ away (the magenta arc); in this direction the flat polytope has support height $h = 0.956$, and the radial gap to the sphere is $1 - h = 0.044$ (the magenta piece of radius).
:::

5. **Liu Hui's three-dimensional 割圆术 analogy and state versus operator error**: Just as Liu Hui's third-century *circle-cutting method* (割圆术) approximates a smooth circle by inscribed flat chords, increasing $L$ refines the inscribed chordal polytope $P_L$ inside $S^2$ (with three distinct layers in Figure 16, Panel II: finite vertices $\mathcal{S}_L$, flat chordal faces of $P_L$, and the sphere $S^2$). This is a pedagogical geometric analogy, not a historical claim about quantum compilation or the Solovay–Kitaev exponent. Finally, because the stabilizer circle of $\vv{r}_0$ hides one rotation angle around $\vv{r}_0$, the single-state covering error $\varepsilon_L$ on $S^2$ cannot replace the full operator compilation error $\delta(U, V) = \min_{\varphi}\norm{U - e^{i\varphi}V}_{\mathrm{op}}$ on $\mathrm{PU}(2)/\mathrm{SU}(2)$.

::: {.viz src="sphere-escape" preset="zu" height="500"}
**At $24576$ sides the gap is still there.** Zu Chongzhi pushed the circle-cutting to $24576$ sides. The cyan inscribed polygon can no longer be told apart from the circle, and the magenta gap $1 - \cos\frac{\pi}{n}$ is down to $8.17\times10^{-9}$; magnified about $7.5\times10^{7}$ times vertically, it looks exactly as it did at the first step. This is circle-cutting in the plane; reading it as chordal faces approximating a sphere is only the pedagogical analogy of item 5 above (for the numerical table, see [Chapter 21](ch21-diagonalization-and-escape.md), [@ex-liu-hui-polygon-sagitta]).
:::
