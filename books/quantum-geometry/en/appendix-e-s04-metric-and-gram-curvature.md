# E.4 Metric Geometry, Parallelogram Polarization, and Gram–Spherical Curvature {#sec-appe-geometry}

The third deduction chain (paired with Corollary [@cor-ch32-parallelogram-quadratic-and-gram]) audits Euclidean and unitary metric geometry, Gram metric realizability, and the curvature bifurcation between flat affine space and normalized state spheres:

$$
\|x \pm y\|^2 \;\xrightarrow{\;\text{parallelogram law (T2)}\;}\; \langle x, y\rangle \;\xrightarrow{\;G \succeq 0\text{ (Layer 1)}\;}\; W = UV\text{ rigidity} \;\xrightarrow{\;S(x,x)=1\text{ vs. flat affine (T3)}\;}\; \Omega(\epsilon) > 0\text{ or }\Omega = 0.
$$

::: {.remark #rem-appe-geometry-chain title="Deduction Chain III Audit: Parallelogram Polarization, Gram Embedding, and Spherical Excess Curvature (LEAN ✓, Literature, and Finite Countermodels)"}
**Step-by-Step Chain and Finite-Dimensional Geometric Countermodels.**

1. **Parallelogram Law and Jordan–von Neumann Polarization (`LEAN ✓` + `Literature` + 2D Countermodel)**:
   Every inner-product space obeys [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) and [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) (`LEAN ✓`); conversely, the Jordan–von Neumann theorem (1935, `Literature`) proves that a norm arises from a bilinear/sesquilinear inner product via polarization if and only if it obeys the parallelogram law.
   - **2D Manhattan Norm $\ell^1_2$ Countermodel (`manual derivation`)**: Equip $\mathbb{R}^2$ with $\|(u_1, u_2)\|_1 = |u_1| + |u_2|$ and evaluate on $e_1 = (1, 0)$, $e_2 = (0, 1)$:

     $$
     \|e_1 + e_2\|_1^2 + \|e_1 - e_2\|_1^2 \;=\; 2^2 + 2^2 \;=\; 8 \;\neq\; 4 \;=\; 2\bigl(\|e_1\|_1^2 + \|e_2\|_1^2\bigr).
     $$

     A general Banach norm cannot recover inner-product comparisons without parallelogram symmetry; on the complex phase side, [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem) (`LEAN ✓`) proves that low-degree common-phase-invariant observables reduce to quadratic sesquilinear forms.
2. **Schoenberg PSD Embedding and Unitary Gram Rigidity (`Literature` + `LEAN ✓`)**:
   As Countermodel (d) in Section E.1 demonstrated, pairwise cosines in $[-1, 1]$ do not suffice for $3$-point Euclidean embedding. Schoenberg's theorem (1935, `Literature`) establishes $G \succeq 0$ as the exact necessary and sufficient condition; once $G = V^\dagger V = W^\dagger W \succeq 0$ holds, [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq) (`LEAN ✓`) guarantees rigid vector realization unique up to global unitary rotation $W = UV$.
3. **Unit-Sphere Normalization, Ambient Carrier Dimension, and the Euclidean Parallel Postulate (`T3` + Layer 1)**:
   Euclid's fifth postulate ($\alpha + \beta + \gamma = \pi$) **does not** hold unconditionally on normalized comparison states—inside an **oriented ambient inner-product carrier of dimension $D \ge 3$** (note that $\Lambda^2\mathbb{R}^2 \not\subset \mathbb{R}^2$ admits no in-plane orthogonal normal, so the "Two Begets Three" Hodge-star normal bootstrap $\mathbf{e}_\perp = \star(\mathbf{A}\wedge\mathbf{B})/\sin\epsilon$ in [Chapter 34 §34.5](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names) requires an oriented carrier $D \ge 3$, macroscopically locked at $D = 3$ by complete-graph $K_N$ Maxwell–Laman rigidity $\Delta E(3) = \Delta E(4) = 0$ in [§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)), constraining states to $S(x, x) = 1$ bends $3$-state geodesic loops into the tilted spherical trihedron $\Delta\mathcal{T}_\epsilon$ ([Chapter 34 §34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron); distinguishing $\det G = \sin^2\epsilon$ for an orthogonal unit normal $(\mathbf{A}, \mathbf{B}, \mathbf{e}_\perp)$ from $\det G(\mathbf{A}, \mathbf{B}, \mathbf{P}) = \sin^4\epsilon$ for the tilted equal-footing projection state $\mathbf{P} = \cos\epsilon\,\mathbf{A} + \sin\epsilon\,\mathbf{e}_\perp$, while exact $C_3 \subset \mathrm{SO}(3)$ cyclic symmetry holds on equilateral/orthonormal configurations and Countermodel (d) with $\det S = -3 < 0$ still stands whenever Layer-1 global Gram PSD $G \succeq 0$ is omitted), whose Girard spherical excess is strictly positive for every $\epsilon \in (0, \frac{\pi}{2}]$ (`manual derivation` + `Literature`):

   $$
   \Omega(\epsilon) \;=\; \alpha + \beta + \gamma - \pi \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + O(\epsilon^4) \;>\; 0.
   $$

   Flat Euclidean geometry $\Omega = 0$ is recovered only in the first-order tangent limit $\epsilon \to 0^+$ or on unnormalized affine vector spaces; zero, positive, and negative constant curvature form a clean `T3` geometric bifurcation.
:::
