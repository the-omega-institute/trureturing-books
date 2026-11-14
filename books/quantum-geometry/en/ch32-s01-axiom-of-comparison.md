# 32.1 The Zero-Background Axiom of Comparison $\mathcal{A}_0$: Relational Extensionality, Orthogonal Parity, and Reciprocal Fairness {#sec-ch32-axiom-of-comparison}

> "Then we can use the 'Axiom of Comparison' to derive the axioms of mathematics, quantum physics, and beyond."

Returning to the first cut of [Chapter 1](ch01-measurement.md) and [Chapter 2](ch02-born-rule.md)—where we excised the external coordinate frame "third point $C$"—an audacious foundational question confronts us at the root of axiomatics. For twenty-five centuries, humanity has written separate axiomatic charters on the opening pages of separate disciplines: ZFC's axioms for sets, Peano's axioms for arithmetic, Euclid's and Hilbert's postulates for geometry, Dirac–von Neumann's five postulates for quantum mechanics, and Einstein's light-cone postulate for special relativity. **Once every external reference origin, pre-assumed manifold, and global clock is stripped away—leaving only the single primitive act of two entities meeting in pairwise comparison—can the core axiom systems of mathematics and physics emerge as cross-sectional corollaries of one zero-background meta-axiom?**

For such a program to withstand formal scrutiny, no higher geometric or dynamical structure may be smuggled silently into the definition: we must separate the minimal relational interface from the structural realization layers adjoined downstream. Within our programmatic synthesis (`MODEL`), we formulate this root primitive as the **Zero-Background Axiom of Comparison $\mathcal{A}_0$** (because $\mathcal{A}_0$ specifies an overarching cross-disciplinary meta-axiom interface rather than a single auxiliary Lean `def`, the definition box carries no `lean=` attribute, while its finite-dimensional and topological kernel slices are immediately locked in [@thm-ch32-comparison-extensionality-and-lagrange] below):

::: {.definition #def-ch32-axiom-of-comparison title="Zero-Background Axiom of Comparison A₀ (Book Model)"}
Let $X$ be a raw domain of objects stripped of any external reference point $C$, background manifold, or global clock, let $\mathcal{A}$ be a unital associative `*`-algebra in which $2$ is invertible, and let $\mathrm{CMP} : X \times X \to \mathcal{A}$ be a two-slot comparison map. The **Zero-Background Axiom of Comparison $\mathcal{A}_0$** consists of three irreducible relational clauses (`MODEL`):

1. **Clause I: Two-Sided Relational Extensionality**. No object carries hidden intrinsic state outside comparison. Defining the two-sided comparison-indiscernibility equivalence relation

   $$
   x \sim_{\mathrm{CMP}} y \;\Longleftrightarrow\; \forall z \in X,\quad \mathrm{CMP}(x, z) = \mathrm{CMP}(y, z) \;\land\; \mathrm{CMP}(z, x) = \mathrm{CMP}(z, y),
   $$

   $\mathrm{CMP}$ descends canonically to the comparison-extensional quotient $\widetilde{X} := X / {\sim_{\mathrm{CMP}}}$, on which relational extensionality holds strictly: $[x] = [y] \iff \forall [z] \in \widetilde{X},\; \mathrm{CMP}([x], [z]) = \mathrm{CMP}([y], [z]) \land \mathrm{CMP}([z], [x]) = \mathrm{CMP}([z], [y])$.

2. **Clause II: Orthogonal Parity Decomposition**. Using $\frac{1}{2} \in \mathcal{A}$, swapping comparison slots decomposes every comparison uniquely into a swap-even **similarity channel** $S(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) + \mathrm{CMP}(y, x)\bigr)$ and a swap-odd **directed difference channel** $A(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) - \mathrm{CMP}(y, x)\bigr)$, with the `*`-involution reversing comparison order $\mathrm{CMP}(x, y)^* = \mathrm{CMP}(y, x)$:

   $$
   \mathrm{CMP}(x, y) \;=\; S(x, y) + A(x, y), \qquad S(y, x) = S(x, y) = S(x, y)^*, \qquad A(y, x) = -A(x, y) = -A(x, y)^*.
   $$

3. **Clause III: Bidirectional Reciprocal Fairness**. For every pair $(x, y) \in X \times X$ on the unit comparison carrier $X$, round-trip comparison reversing subject and object conserves the algebraic unit budget:

   $$
   \mathrm{CMP}(x, y)\,\mathrm{CMP}(y, x) \;=\; \bigl(S(x, y) + A(x, y)\bigr)\bigl(S(x, y) - A(x, y)\bigr) \;=\; \mathbf{1}.
   $$

   In particular, whenever $S(x, y)$ and $A(x, y)$ commute (for instance when $S(x, y) = \cos\theta\,\mathbf{1}$ is central) and simple difference elements satisfy negative-square closure $A(x, y)^2 = -\|A(x, y)\|^2\mathbf{1}$, the round-trip product expands directly to the Pythagorean fairness circle $S^2 - A^2 = \cos^2\theta + \sin^2\theta = 1$.
:::

So that zero hidden structure is smuggled into the corollary chains of [Section 32.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries), we explicitly distinguish **three structural layers** separating the abstract comparison interface from concrete mathematical and physical realizations (complete independence proofs and minimal countermodels are audited in [Appendix E §E.1](appendix-e.md#sec-appe-layers)):

- **Layer 0 (Abstract Typed Two-Slot Comparison Interface)**: Raw object set $X$ plus Clauses I–III inside a unital associative `*`-algebra $\mathcal{A}$ with $2$ invertible. Layer 0 alone intentionally **does not** force Euclidean geometry or quantum state space: it still admits dual-number nilpotent realizations $\mathrm{CMP}(x, y) = 1 \pm \varepsilon$ ($\varepsilon^2 = 0$, so $A^2 = 0$ and difference costs zero similarity budget), hyperbolic split-complex realizations $\cosh\eta + j\sinh\eta$ ($j^2 = +1$, giving $S^2 - \|A\|^2 = 1$), negative self-pairing $S(x_0, x_0) = -\mathbf{1}$ (which still satisfies $(-1)^2 = +1$), and non-transitive three-point holonomy.
- **Layer 1 (Positive-Definite Clifford / Inner-Product Realization)**: Adjoins three explicit geometric realization conditions atop Layer 0: (a) **positive self-normalization** $S(x, x) = +\mathbf{1}$ (fixing $\mathrm{CMP}(x, x) = +\mathbf{1}$ once Clause II forces $A(x, x) = 0$); (b) **simple rank-2 bivector squaring** $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1} \le 0$—contrasting non-simple rank-4 bivectors such as $B = e_1\wedge e_2 + e_3\wedge e_4$ in $\mathcal{Cl}_{4,0}$, whose square $B^2 = -2 + 2e_1e_2e_3e_4 \notin \mathbb{R}\mathbf{1}$ carries a grade-4 pseudoscalar tail, whereas every simple wedge $x \wedge y$ of two vectors squares to a nonpositive real scalar; and (c) **$n$-point Gram positive-semidefiniteness** $G = [S(x_i, x_j)]_{i,j=1}^n \succeq 0$ (ruling out three-point triangle-inequality violations).
- **Layer 2 (Fibered Connection, Composite Tomography, and Coarse-Grained Multi-Observer Pinching)**: Within a single global Clifford fiber, any normalized vectors $a, b, c$ with $b^2 = 1$ obey associative collapse $a b b c = a c$, forcing trivial three-point pure-state loops! Ascending from single-fiber pairwise comparison to nontrivial gauge curvature, composite entanglement, and thermodynamic entropy increase requires Layer 2: fibered parallel-transport connections across distinct base sites, local tomographic minimality selecting the complex tensor product $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$, and coarse-grained basis pinching across bounded multi-observer readouts.

Within `trureturing`'s frozen library, the four formal cornerstones anchoring Clause I (finite expectation-word residual kernels and partition-topology inseparability kernels), Clauses II–III real parity square-folding (the Lagrange–Gram identity), and the negative-square signature of pure-difference complex structures ($R^2 = -I_n$) are verified together in the following theorem:

::: {.theorem #thm-ch32-comparison-extensionality-and-lagrange title="Comparison-Extensionality Residual Kernel, Observation Inseparability Kernel, Lagrange–Gram Identity, and Complex-Structure Squaring" lean="D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary"}
Across the frozen quantum-residual, observation-topology, quantum-bounds, and unitary-complex-structure modules of `trureturing`, the following four theorems hold simultaneously:

1. **Finite Comparison-Word Extensionality and Orthogonal Residual Kernel** ([`future_word_orthogonal_residual`](lean:D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual)): Over $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$ (`[RCLike 𝕜]`) on a finite-dimensional $\mathbb{K}$-inner-product space $E$, given a finite comparison-effect family $\mathrm{effect} : \operatorname{Fin}(m+1) \to E$ with span $V_{\mathrm{vis}} = \operatorname{visibleEffectSubspace}(\mathrm{effect})$ and state embedding $X : \mathrm{State} \to E$, two states yield identical comparison expectation words if and only if their embedded difference lies in $V_{\mathrm{vis}}^\perp$, equivalently if and only if their orthogonal projections onto $V_{\mathrm{vis}}$ coincide:

   $$
   \operatorname{futureExpectationWord}(\mathrm{effect}, X, \rho) = \operatorname{futureExpectationWord}(\mathrm{effect}, X, \sigma) \;\Longleftrightarrow\; X(\rho) - X(\sigma) \in V_{\mathrm{vis}}^\perp \;\Longleftrightarrow\; P_{V_{\mathrm{vis}}}\bigl(X(\rho)\bigr) = P_{V_{\mathrm{vis}}}\bigl(X(\sigma)\bigr);
   $$

2. **Observational Inseparability Kernel of Comparison Readouts** ([`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)): For any state type $X$, readout codomain $B$, and comparison readout $\mathrm{readout} : \operatorname{Concept}(X, B)$ (i.e., $X \to B$), two states are topologically inseparable in the pullback topology $\operatorname{partitionTopology}(\mathrm{readout})$ if and only if their comparison readouts agree:

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \;\Longleftrightarrow\; \mathrm{readout}(x) = \mathrm{readout}(y);
   $$

3. **Finite-Dimensional Lagrange–Gram Parity Square-Folding Identity** ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)): For any index type $\iota$, finite subset $s : \operatorname{Finset}\;\iota$, and real tuples $u, v : \iota \to \mathbb{R}$, the product of squared norms minus the squared swap-even inner product equals half the double sum of squared swap-odd wedge components:

   $$
   \left(\sum_{i \in s} u_i^2\right)\!\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2;
   $$

4. **Imaginary-Unit Signature of Pure-Difference Unitary Structures** ([`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)): For any finite decidable index type $n$ (`[Fintype n] [DecidableEq n]`) and complex matrix $R \in M_n(\mathbb{C})$, skew-adjointness $R^\dagger = -R$ together with reciprocal unitarity $R R^\dagger = I_n$ forces

   $$
   R^2 \;=\; -I_n.
   $$
:::

::: proof
Conjunct 1 uses inner-product linearity on the finite-dimensional $\mathbb{K}$-inner-product space $E$ to rewrite componentwise equality $\forall i \in \operatorname{Fin}(m+1),\; \langle\mathrm{effect}_i, X(\rho)\rangle = \langle\mathrm{effect}_i, X(\sigma)\rangle$ as orthogonality of $X(\rho) - X(\sigma)$ to $\operatorname{range}(\mathrm{effect})$ and hence to its closed span $V_{\mathrm{vis}}$, matching $\ker P_{V_{\mathrm{vis}}} = V_{\mathrm{vis}}^\perp$; when $V_{\mathrm{vis}} = E$, $V_{\mathrm{vis}}^\perp = \{0\}$ gives $X(\rho) = X(\sigma)$ (and $\rho = \sigma$ whenever $X$ is injective). Conjunct 2 pulls back clopen singleton fibers from the discrete topology $\perp$ on $B$. Conjunct 3 expands $(u_i v_j - u_j v_i)^2 = u_i^2 v_j^2 - 2u_i v_i u_j v_j + u_j^2 v_i^2$ over $s \times s$, re-indexes the outer sums into $2(\sum_{i\in s} u_i^2)(\sum_{j\in s} v_j^2)$, factors the cross sum into $-2(\sum_{i\in s} u_i v_i)^2$, and divides by $2$. Conjunct 4 evaluates $-(R^2) = R(-R) = R R^\dagger = I_n$ and negates both sides. The full proof is checked by the Lean kernel.
:::

Notice how tightly [@def-ch32-axiom-of-comparison] and [@thm-ch32-comparison-extensionality-and-lagrange] interlock: Conjuncts 1–2 turn relational extensionality from a philosophical slogan into an exact kernel-quotient theorem once unobserved orthogonal residuals $V_{\mathrm{vis}}^\perp$ or readout fibers are factored out, while Conjuncts 3–4 show that in any Layer-1 real inner-product and skew-adjoint unitary realization, even similarity squared plus odd wedge area squared exhausts the total norm budget and forces the quarter-turn signature $R^2 = -I_n$.

Even more remarkably, within an $\mathcal{A}_0$-compatible **Layer-1 oriented three-dimensional Euclidean / Clifford unit-sphere realization** (adjoining positive self-normalization $S(x, x) = +\mathbf{1}$ and a chosen orientation $\mathrm{vol}_3$; cf. [Appendix E §E.1](appendix-e.md#sec-appe-layers)), pairwise comparison naturally supports the **"Two Begets Three"** construction of the infinitesimal spherical trihedron cell $\Delta\mathcal{T}_\epsilon$ (`MODEL`): once the "projection state" $\mathbf{P}$ generated from $(\mathbf{A}, \mathbf{B})$ (at angle $\epsilon \in (0, \pi)$ with $\mathbf{A}\cdot\mathbf{B} = \cos\epsilon$) is required to enter the same Layer-1 unit carrier on equal footing—obeying positive unit self-normalization $S(\mathbf{P}, \mathbf{P}) = \mathbf{1}$ ($\|\mathbf{P}\|^2 = 1$) and pairwise comparison with $\mathbf{A}$ and $\mathbf{B}$—the shrunken classical in-plane projection $(\mathbf{A}\cdot\mathbf{B})\mathbf{A}$ ($|\cos\epsilon| < 1$, $\det G = 0$) cannot close the norm budget. Along the Hodge-normal branch $\mathbf{e}_\perp = \star\hat{\mathbf{I}}_{AB}$ selected by the ambient orientation (the opposite orientation branch $-\mathbf{e}_\perp$ yielding the mirror-equivalent trihedron with identical Gram determinant), the antisymmetric residual $\sin\epsilon$ stands upright to form $\mathbf{P} = \cos\epsilon\,\mathbf{u}_{AB} + \sin\epsilon\,\mathbf{e}_\perp$ (with unit in-plane carrier $\mathbf{u}_{AB} = \mathbf{A}$ and $\|\mathbf{P}\|^2 = \cos^2\epsilon + \sin^2\epsilon = 1$), rendering the three-state Gram determinant strictly positive on both branches, $\det G(\mathbf{A}, \mathbf{B}, \mathbf{P}) = \sin^4\epsilon > 0$ ($\forall\epsilon \in (0, \pi)$)—opening the curved trihedron cell $\Delta\mathcal{T}_\epsilon$ and the cyclic symmetry in which "binary," "comparison," and "projection" appear as three slice projections of one nameless triad (developed in [Chapter 34 §34.5](ch34-orthogonality-degeneracy-and-observer-position.md#sec-ch34-triadic-bootstrap-and-beyond-names)). In [Section 32.2](ch32-s02-oisc-comparison-engine.md#sec-ch32-oisc-comparison-engine), we concretize $\mathcal{A}_0$ as an operational **single-instruction-set (OISC) comparison machine** before deriving the foundational postulates of mathematics and physics as formal corollaries in [Section 32.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries).
