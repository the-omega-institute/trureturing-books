# 35.6.5 Clifford Orthogonal Split: One-Dimensional Expanding Axis and Two-Dimensional Internal Rotor Plane {#sec-ch39-p2e-clifford}

For a cubic algebraic code $x = a + b\beta_3 + c\beta_3^2$ with rational or integer coefficients, the standard real-linear cubic Minkowski coordinate map takes the form

$$
(a, b, c) \longmapsto \Bigl(a + b\beta_3 + c\beta_3^2,\; \operatorname{Re}(a + b\alpha + c\alpha^2),\; \operatorname{Im}(a + b\alpha + c\alpha^2)\Bigr) \in E_\parallel^1 \oplus E_\perp^2.
$$

(Note in passing that for general rational coefficients $(a, b, c) \in \mathbb{Q}^3$, the three-embedding trace $(a+b\beta_3+c\beta_3^2) + 2\operatorname{Re}(a+b\alpha+c\alpha^2) = 3a + b + 3c$ is rational, taking guaranteed integer values only on $\mathbb{Z}^3$ or on the calibrated finite scan lattice.) Under this coordinate split, multiplication by $\beta_3$ stretches the one-dimensional physical line $E_\parallel^1$ by $\beta_3 > 1$, while in the two-dimensional internal plane $E_\perp^2$ complex multiplication $w \mapsto \alpha w$ acts by uniform contraction $|\alpha| = \beta_3^{-1/2} < 1$ composed with planar rotation through $\arg\alpha \approx 124.69^\circ$.

::: {.remark #rem-ch39-p2e-unification-model title="Interpretive Model: A Clifford Line–Plane Dictionary for Minkowski Embeddings (MODEL)"}
Within the three-dimensional Clifford algebra $\mathrm{Cl}_{3,0}(\mathbb{R})$ introduced in [Chapter 6](ch06-geometric-product.md), we can formulate an explicit geometric dictionary (`MODEL`) for $E_\parallel^1 \oplus E_\perp^2$: aligning the one-dimensional expanding axis with a unit grade-1 vector $\mathbf{e}_1$ (the particle-like ruler axis) and the two-dimensional internal complex plane with the orthogonal unit grade-2 bivector $B_\perp = \mathbf{e}_2 \wedge \mathbf{e}_3$ ($B_\perp^2 = -1$, the wave-like coherent plane) writes each internal step $w \mapsto \alpha w$ as a damped scaled rotor

$$
\mathcal{D}_\perp = \beta_3^{-1/2}\bigl(\cos\vartheta + B_\perp \sin\vartheta\bigr),\qquad \vartheta = \arg\alpha \approx 124.69^\circ,
$$

whose three-dimensional determinant (pseudoscalar volume factor) satisfies $\beta_3 \cdot \bigl(\beta_3^{-1/2}\bigr)^2 = 1$: every factor of longitudinal dilation along the line is balanced by an equal factor of transverse bivector area contraction. Three formal caveats govern this dictionary: first, $(a,b,c) \mapsto (\dots)$ is an algebraic real-linear coordinate map and becomes an orthonormal Euclidean projection of $\mathbb{Z}^3$ only relative to a declared basis and metric; second, $\mathcal{R}_3(\alpha)$ itself lives strictly inside the **two-dimensional internal plane** $E_\perp^2$—rotating a 3D camera in the sandtable is a viewing operation that adds no mathematical dimension to $\mathcal{R}_3(\alpha)$; third, reading $E_\parallel^1$ and $E_\perp^2$ as an observer's external clock line and internal phase-memory plane is a `MODEL` synthesis, not an additional formal isomorphism theorem.
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="clifford" height="500"}
**Clifford Line–Plane Decomposition Card (`clifford`)**: A three-dimensional algebraic-coordinate stage pairs $\beta_3$-dilation along the cyan physical axis $E_\parallel$ with damped bivector rotation $|\alpha| e^{i\arg\alpha}$ in the violet internal plane $E_\perp$; an amber handle marks the draggable lattice point decomposition. Coordinate evaluation carries status `NUM`, and the Clifford observer dictionary carries status `MODEL`.
:::

Seeing the single-step internal contraction modulus settle at $|\alpha|_{K=3} = \beta_3^{-1/2} \approx 0.737353$ invites a natural numerical comparison: how does this algebraic contraction scale relate to Dottie's self-referential cosine fixed point $\theta^* = \cos\theta^* \approx 0.739085$ from [Chapter 24](ch24-cosine-fixed-points-and-self-reference.md) and [Chapter 34](ch33-all-beings-observers-and-mutual-attractors.md)?
