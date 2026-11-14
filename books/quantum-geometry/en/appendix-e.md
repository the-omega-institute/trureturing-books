# Appendix E From the Axiom of Comparison to Mathematical and Physical Axiom Systems: Complete Deduction Chains, Intermediate-Hypothesis Audit, and Minimal Countermodels {#appendix-e-comparison-axiom-deduction-ledger}

This appendix serves as the **formal epistemic audit ledger** paired with [Chapter 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)–[§32.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries) ([@def-ch32-axiom-of-comparison] and Corollaries [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-minkowski-holonomy-and-second-law]). In Chapter 32, pairwise relational measurement is distilled into the Zero-Background Axiom of Comparison $\mathcal{A}_0$ and the single-instruction geometric-product primitive $\mathrm{CMP}(\mathbf{A}, \mathbf{B}) = \mathbf{A}\cdot\mathbf{B} + \mathbf{A}\wedge\mathbf{B}$, from which the core skeletons of logic and extensionality, arithmetic and field completions, metric geometry, quantum postulates, and relativistic–gauge–thermodynamic laws emerge as corollaries under explicit bridge conditions. To prevent any axiomatic sleight of hand—where a single slogan quietly smuggles in hidden assumptions—this appendix dissects every deduction step by step: **Which steps follow losslessly from two-slot comparison via canonical quotienting or completion? Which steps require operational laboratory measurement or composite tomographic clauses? Which steps mark genuine mathematical bifurcations in signature, valuation, or exchange statistics? And whenever an intermediate hypothesis is dropped, what is the minimal countermodel (finite or countably infinite) that refutes the target conclusion?**

Following the strict epistemic contract of [Appendix B](appendix-b.md) and [Appendix D](appendix-d.md), every kernel-verified link in `trureturing@dev` carries a green `LEAN ✓` tag with a clickable inline declaration link (full catalog in [Appendix C](appendix-c.md)); classical theorems of mathematics and physics are marked `Literature`; explicit finite or countably infinite countermodels are marked `manual derivation`; the book's overarching synthesis is marked `MODEL`; and unresolved mathematical or physical problems are honestly marked red `OPEN`.

---

## E.1 Three-Layer Algebraic Signature Peeling and the Four-Class Hypothesis Taxonomy {#sec-appe-layers}

Before auditing "other axioms as corollaries of comparison," we must peel the comparison operator `CMP` itself into three strictly nested algebraic layers—only by separating the **abstract two-slot interface** from its **inner-product / Clifford realization** and **many-body fibered dynamics** can every bridge hypothesis be audited transparently.

::: {.remark #rem-appe-layer-taxonomy title="Three-Layer Algebraic Comparison Signatures (Layer 0–Layer 2) and Four-Class Hypothesis Taxonomy (T1–T4)"}
**Formal Layering and Epistemic Audit Criteria (`MODEL` + `manual derivation`).** Across all deduction chains rooted in the Axiom of Comparison $\mathcal{A}_0$ ([@def-ch32-axiom-of-comparison]), we distinguish three comparison signature layers and four classes of further processing:

1. **Three-Layer Algebraic Signature Separation**:
   - **Layer 0 (Abstract Typed Two-Slot Comparison Interface)**: Given an object set or type $X$ and a unital associative $*$-algebra $\mathcal{A}$ in which $2$ is invertible ($2 \in \mathcal{A}^\times$), a raw comparison is simply a two-slot map $\mathrm{CMP} : X \times X \to \mathcal{A}$. Because $2$ is invertible, $\mathrm{CMP}$ admits a unique parity decomposition into an even symmetric part (similarity) and an odd antisymmetric part (directed difference):

     $$
     S(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) + \mathrm{CMP}(y, x)\bigr), \qquad A(x, y) := \frac{1}{2}\bigl(\mathrm{CMP}(x, y) - \mathrm{CMP}(y, x)\bigr),
     $$

     satisfying $S(y, x) = S(x, y)$, $A(y, x) = -A(x, y)$, and $\mathrm{CMP}(x, y) = S(x, y) + A(x, y)$. Note that **invertibility of $2$ is an indispensable algebraic prerequisite**: in characteristic $2$ (such as over $\mathbb{F}_2$), $+1 = -1$ and $2 = 0$ is non-invertible, so symmetric and antisymmetric subspaces collapse onto each other and parity decomposition itself degenerates! Even after adjoining involutive reciprocity $\mathrm{CMP}(y, x) = \mathrm{CMP}(x, y)^\dagger$ and pairwise unit closure $\mathrm{CMP}(x, y)\mathrm{CMP}(y, x) = \mathbf{1}$, Layer 0 alone **does not** imply positive self-pairing, elliptic negative squaring, or $n$-point Gram positive-semidefiniteness for $n \ge 3$ (see [@ex-appe-layer0-countermodels] below).
   - **Layer 1 (Positive-Definite Inner-Product / Clifford Realization)**: Objects embed into a real Euclidean inner-product space and its Clifford algebra $\mathcal{Cl}(V, q_+)$ via $\mathrm{CMP}(x, y) = \langle x, y\rangle\mathbf{1} + x \wedge y$. Three geometric rigidities switch on simultaneously: (i) normalized self-comparison is strictly positive, $S(x, x) = +1$; (ii) the wedge of two vectors is a rank-$2$ **simple 2-blade** satisfying Plücker simplicity $(x \wedge y) \wedge (x \wedge y) = 0$ and elliptic negative square $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1}$, so the Lagrange–Gram identity ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), `LEAN ✓`) enforces $\langle x, y\rangle^2 + \|x \wedge y\|^2 = \|x\|^2\|y\|^2$; and (iii) for every finite $n$-tuple $\{x_1, \dots, x_n\}$, the similarity matrix $G_{ij} = S(x_i, x_j)$ is globally positive-semidefinite, $G \succeq 0$.
   - **Layer 2 (Fibered Connection Transport, Composite Local Tomography, and Coarse-Grained Pinching)**: When comparisons cross distinct local frames on a spacetime graph, combine subsystems, or pass through a finite-bandwidth observer's unread record basis, Layer 1 is enriched with edge unitary transport $U_{xy}$, complex local tomographic completeness, and unital (doubly stochastic) basis-pinching channels.
2. **Four-Way Further-Processing Taxonomy (`T1`–`T4`)**:
   - **`T1` Canonical Quotient / Cauchy Completion**: Eliminates apparent assumptions without introducing new physical postulates, turning raw preconditions into exact theorems on the canonical quotient $X/{\sim_{\mathrm{CMP}}}$ or metric Cauchy completion $\widehat{X}$.
   - **`T2` Operational Measurement / Composition Reduction**: Replaces abstract textbook Hilbert-space postulates (Born projection rule, Lüders collapse, unitary group evolution, tensor-product composition, thermodynamic entropy increase) by directly testable laboratory clauses (POVMs / effect additivity, repeatable minimal disturbance, two-sided reversibility, local tomographic minimality, and unital coarse-graining).
   - **`T3` Signature / Valuation / Exchange Bifurcation**: Rather than artificially suppressing alternatives, classifies genuine mathematical branch points—elliptic $\mathbb{C}$ vs. hyperbolic split-complex vs. nilpotent dual numbers, Archimedean $\mathbb{R}$ vs. ultrametric $\mathbb{Q}_p$, flat Euclidean vs. positively curved spherical geometry, and bosonic $\mathrm{Sym}^N$ vs. fermionic $\bigwedge^N$.
   - **`T4` Irreducible Set-Theoretic / Continuum / Complexity Strength & `OPEN` Frontier**: Honestly marks external axiomatic strength or open problems beyond two-slot comparison alone—higher ZFC existence postulates (Infinity, Power Set, Replacement, Choice), interacting $3+1$D continuum QFT limits, and unresolved complexity separations such as $\mathrm{P} \neq \mathrm{NP}$ (`OPEN`).
:::

Why must Layer-1 geometry never be mistaken for an automatic consequence of the Layer-0 interface? Four purely finite algebraic countermodels settle the question immediately:

::: {.example #ex-appe-layer0-countermodels title="Four Finite Algebraic Countermodels at the Layer-0 Abstract Comparison Interface (Manual Derivation)"}
**Manual derivation.** Each finite model below satisfies invertibility of $2$, parity decomposition, and involutive or pairwise unit reciprocity, while refuting a distinct Layer-1 property when that Layer-1 input is omitted:

1. **Countermodel (a) Negative Self-Pairing on One Object (Refuting $S(x, x) \ge 0$ from Reciprocity Alone)**:
   Take the singleton $X = \{x_0\}$ and algebra $\mathcal{A} = \mathbb{R}$ (trivial involution $\lambda^\dagger = \lambda$) with $\mathrm{CMP}(x_0, x_0) = -1$. Parity gives $S(x_0, x_0) = -1$ and $A(x_0, x_0) = 0$, and unit reciprocity holds via $\mathrm{CMP}(x_0, x_0)\mathrm{CMP}(x_0, x_0) = (-1)(-1) = +1$, yet $S(x_0, x_0) = -1 < 0$ violates positivity! Thus normalized positivity $S(x, x) = +1$ is an explicit Layer-1 calibration input rather than a corollary of squaring to $+1$.
2. **Countermodel (b) Dual-Number Nilpotent Difference and Split-Complex Hyperbolic Difference (Refuting $A^2 = -\|A\|^2\mathbf{1}$ from Reciprocity Alone)**:
   On $X = \{x_0, x_1\}$, inspect two commutative real $*$-algebras:
   - *Parabolic nilpotent branch*: Over the dual numbers $\mathcal{A}_{\mathrm{dual}} = \mathbb{R}[\varepsilon]/(\varepsilon^2)$ ($\varepsilon \neq 0,\; \varepsilon^2 = 0$, conjugation $\varepsilon^\dagger = -\varepsilon$), set $\mathrm{CMP}(x_0, x_1) = 1 + \varepsilon$ and $\mathrm{CMP}(x_1, x_0) = 1 - \varepsilon$. Then $(1 + \varepsilon)(1 - \varepsilon) = 1 - \varepsilon^2 = 1$ with $A(x_0, x_1) = \varepsilon \neq 0$, yet $A(x_0, x_1)^2 = \varepsilon^2 = 0$;
   - *Hyperbolic Lorentz branch*: Over the split-complex numbers $\mathcal{A}_{\mathrm{split}} = \mathbb{R}[j]/(j^2 - 1)$ ($j \neq \pm 1,\; j^2 = +1$, conjugation $j^\dagger = -j$), for any rapidity $\eta \neq 0$ set $\mathrm{CMP}(x_0, x_1) = \cosh\eta + j\sinh\eta$ and $\mathrm{CMP}(x_1, x_0) = \cosh\eta - j\sinh\eta$. Then $(\cosh\eta + j\sinh\eta)(\cosh\eta - j\sinh\eta) = \cosh^2\eta - \sinh^2\eta = 1$, yet $A^2 = +\sinh^2\eta > 0$ and $|S| = \cosh\eta > 1$!

   Hence $A^2 = -\|A\|^2\mathbf{1}$ (forcing $S^2 + \|A\|^2 = 1$ and $|S| \le 1$) specifically selects the **elliptic rotation branch** (`T3`) rather than following from unit reciprocity alone.
3. **Countermodel (c) Rank-$4$ Non-Simple Bivector in $\mathcal{Cl}_{4,0}$ (Refuting Scalar Negativity for General Skew Elements)**:
   In the four-dimensional Euclidean Clifford algebra $\mathcal{Cl}_{4,0}$ (orthonormal basis $\{e_1, e_2, e_3, e_4\}$, $e_a^2 = +1$), consider the rank-$4$ bivector $B = e_1 \wedge e_2 + e_3 \wedge e_4 = e_1 e_2 + e_3 e_4$. Under reversion $\dagger$, $B^\dagger = e_2 e_1 + e_4 e_3 = -B$ is purely odd/skew, yet its geometric square is

   $$
   B^2 \;=\; (e_1 e_2)^2 + (e_3 e_4)^2 + 2 e_1 e_2 e_3 e_4 \;=\; -2\mathbf{1} + 2 e_1 e_2 e_3 e_4 \;\notin\; \mathbb{R}\mathbf{1},
   $$

   leaving a non-vanishing grade-$4$ pseudoscalar $B \wedge B = 2 e_1 \wedge e_2 \wedge e_3 \wedge e_4 \neq 0$! Thus $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1}$ lands in $\mathbb{R}\mathbf{1}$ specifically because a two-vector wedge $x \wedge y$ is a rank-$2$ **simple 2-blade** satisfying Plücker simplicity $B \wedge B = 0$.
4. **Countermodel (d) Pairwise Unit Reciprocity Violating $3$-Point Gram PSD and the Triangle Inequality**:
   On the $3$-element set $X = \{0, 1, 2\}$, define the real symmetric similarity table $S_{00} = S_{11} = S_{22} = 1$, $S_{01} = S_{02} = \frac{\sqrt{3}}{2}$, $S_{12} = -1$, paired with local planar bivector magnitudes $|A_{01}| = |A_{02}| = \frac{1}{2}$ and $|A_{12}| = 0$. Every pair $(i, j)$ satisfies unit Pythagorean closure $S_{ij}^2 + |A_{ij}|^2 = 1$ ($\frac{3}{4} + \frac{1}{4} = 1$ and $(-1)^2 + 0 = 1$)! Yet the global $3 \times 3$ similarity matrix is

   $$
   S \;=\; \begin{pmatrix} 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{3}}{2} \\ \frac{\sqrt{3}}{2} & 1 & -1 \\ \frac{\sqrt{3}}{2} & -1 & 1 \end{pmatrix}, \qquad \det S \;=\; 1(1 - 1) - \frac{\sqrt{3}}{2}(\sqrt{3}) + \frac{\sqrt{3}}{2}(-\sqrt{3}) \;=\; -3 \;<\; 0,
   $$

   with eigenvalues $\lambda_1 = 2$, $\lambda_2 = \frac{1 + \sqrt{7}}{2} \approx 1.8229$, and $\lambda_3 = \frac{1 - \sqrt{7}}{2} \approx -0.8229 < 0$, violating $S \succeq 0$! Equivalently, the chordal distance $d(i, j) = \sqrt{2 - 2S_{ij}}$ yields $d(0, 1) + d(0, 2) = 2\sqrt{2 - \sqrt{3}} = \sqrt{6} - \sqrt{2} \approx 1.0353 < 2 = d(1, 2)$, breaking the metric triangle inequality. Pairwise unit reciprocity alone never guarantees $n$-point inner-product realizability for $n \ge 3$.
:::

---

## E.2 Logic, Extensional Quotienting, Yoneda Embedding, and Diagonal Stratification (Paired with Corollary [@cor-ch32-extensionality-and-quotient]) {#sec-appe-logic}

The first deduction chain traces how raw comparison readouts give rise to Leibniz's identity of indiscernibles, extensionality, Yoneda's relational perspective, and type stratification against naive self-membership:

$$
(X,\, \mathrm{CMP}) \;\xrightarrow{\;\text{T1 kernel } \sim_{\mathrm{CMP}}\;}\; X/{\sim_{\mathrm{CMP}}} \;\xrightarrow{\;\text{categorical Hom}\;}\; y(X) = \mathrm{Hom}_{\mathcal{C}}(-, X) \;\xrightarrow{\;\text{diagonal escape}\;}\; \text{stratification}\quad (\nRightarrow\;\text{ZFC Infinity/Power/AC, T4}).
$$

::: {.remark #rem-appe-logic-chain title="Deduction Chain I Audit: Extensional Quotienting, Yoneda Embedding, and Set-Theoretic Strength Boundaries (LEAN ✓, Literature, and Manual Countermodels)"}
**Step-by-Step Chain, Finite Countermodels, and Set-Theoretic Strength Boundaries.**

1. **From Pre-Extensional Comparison Kernel to the `T1` Extensional Quotient (`LEAN ✓`)**:
   On a raw carrier $X$, package all two-sided comparisons into the observation map $\mathrm{readout}_{\mathrm{CMP}}(x) := \bigl(\mathrm{CMP}(x, -),\, \mathrm{CMP}(-, x)\bigr)$.
   - **Finite $2$-Point Duplicate Countermodel Without Quotienting (`manual derivation`)**: Take $X = \{a_1, a_2\}$ with $a_1 \neq a_2$ and constant comparison $\mathrm{CMP}(a_i, a_j) \equiv 1$. Both elements share identical comparison rows and columns against every probe yet remain distinct labels in raw $X$—Leibniz extensionality fails on unquotiented $X$.
   - **`T1` Canonical Quotient Resolution (`LEAN ✓`)**: Define the comparison-indiscernibility kernel

     $$
     x \sim_{\mathrm{CMP}} y \;\Longleftrightarrow\; \forall z \in X,\quad \mathrm{CMP}(x, z) = \mathrm{CMP}(y, z) \;\land\; \mathrm{CMP}(z, x) = \mathrm{CMP}(z, y).
     $$

     By [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), topological inseparability coincides exactly with this readout kernel; on any nonempty carrier `[Nonempty X]`, [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition) and [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition) prove that every comparison-respecting target factors uniquely through the extensional quotient $X/{\sim_{\mathrm{CMP}}}$ (collapsing $\{a_1, a_2\}$ above to $X/{\sim_{\mathrm{CMP}}} \cong \{*\}$). Extensionality requires no extra postulate once `T1` quotienting is applied.
2. **Categorical Enrichment via Yoneda and Anti-Paradox Diagonal Stratification (`Literature` + `LEAN ✓`)**:
   - Enriching pairwise comparisons into hom-sets $\mathrm{Hom}_{\mathcal{C}}(-, X)$ of a locally small category $\mathcal{C}$, the Yoneda lemma (`Literature`) proves that $y : \mathcal{C} \hookrightarrow [\mathcal{C}^{\mathrm{op}}, \mathbf{Set}]$ is full and faithful—an object is determined up to unique isomorphism by its comparison morphisms from all probes.
   - Attempting unstratified naive comprehension ($U = \{x \mid x \notin x\}$) is blocked by [`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode) and Lawvere's qualitative self-application package [`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package) (`LEAN ✓`): any fixed-point-free negation endomorphism escapes every internal listing, forcing type or rank stratification.
3. **Honest Boundary for Higher ZFC Existence Postulates (`T4` + Finite Countermodel)**:
   Quotienting and diagonal escape **do not** derive ZFC's Axioms of Infinity, Power Set, Replacement, Foundation, or Choice. **Finite countermodel (`manual derivation`)**: stage $V_5$ of the cumulative hereditarily finite hierarchy ($|V_5| = 65{,}536$) satisfies extensionality, empty set, pairing, and union under $\in$, while every member is finite—directly refuting the Axiom of Infinity! Transfinite cardinals and Choice remain irreducible `T4` set-theoretic inputs.
:::

---

## E.3 Arithmetic, Unbounded Prime Axes, Imaginary Rotation, and Ostrowski Completion Bifurcation (Paired with Corollary [@cor-ch32-successor-primes-and-zeckendorf]) {#sec-appe-arithmetic}

The second deduction chain tracks $(0, 1)$, Peano succession, prime orthogonality axes, carry-free coding, the imaginary unit $i$, and the twin completions $\mathbb{R}$ and $\mathbb{Q}_p$:

$$
(0, 1) \;\xrightarrow{\;S^\perp \neq \bot\text{ (T2/T4)}\;}\; \mathbb{N}\text{ and }\bigoplus_{p}\mathbb{Z} \;\xrightarrow{\;\text{fractions}\;}\; \mathbb{Q} \;\xrightarrow{\;\text{Ostrowski split (T3) + Cauchy completion (T1)}\;}\; \bigl\{\mathbb{R} \xrightarrow{R^2=-I} \mathbb{C},\;\; \mathbb{Q}_p\bigr\}.
$$

::: {.remark #rem-appe-arithmetic-chain title="Deduction Chain II Audit: Orthogonal-Escape Successor, Unbounded Prime Axes, Imaginary Rotation, and Ostrowski Completion Bifurcation (LEAN ✓ and Countermodel Audit)"}
**Step-by-Step Chain and Finite vs. Countably Infinite Countermodels.**

1. **Orthogonal Zero $0$, Self-Pairing Unit $1$, and Open-Dimension Succession (`LEAN ✓` + Finite Saturation Countermodels)**:
   In Layer 1, mutual orthogonality $S(x, y) = 0$ defines $0$ and unit self-pairing $S(x, x) = 1$ defines $1$. To generate a non-looping Peano successor chain, [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape) (`LEAN ✓`) proves that a unit orthogonal escape vector outside a closed subspace $S$ exists whenever $S^\perp \neq \bot$.
   - **Finite-Dimensional Saturation & Modular Countermodels (`manual derivation`)**: In fixed $\mathbb{R}^n$, at most $n$ mutually orthogonal unit vectors exist before $S^\perp = \{0\}$ saturates at step $n + 1$; in the finite ring $\mathbb{Z}/N\mathbb{Z}$, $k \mapsto k + 1$ loops back to $N \equiv 0$ (violating Peano's axiom that $0$ is no element's successor). Thus **inexhaustible ambient orthogonal residual ($S^\perp \neq \bot$, non-looping succession)** is an indispensable `T2/T4` open-dimension hypothesis.
2. **Unbounded Prime Axes and Carry-Free Zeckendorf Coding (`LEAN ✓`)**:
   Once non-collapsing succession opens $\mathbb{N}$, [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape) (`LEAN ✓`) supplies a fresh orthogonal prime axis beyond every finite prime list, embedding $\mathbb{Q}_{>0}^\times \hookrightarrow \bigoplus_p \mathbb{Z}$; on the minimal two-step recurrence side, [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes) (`LEAN ✓`) characterizes unique carry-free natural-number coding by forbidding adjacent ones (`11`).
3. **Quarter-Turn Orthogonal Rotation and Complex Structure $R^2 = -I_n$ (`LEAN ✓`)**:
   By [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary) (`LEAN ✓`), any real skew-adjoint norm-preserving operator ($R^{\mathsf{T}} = -R$, $R^{\mathsf{T}} R = I_n$) satisfies $R^2 = -I_n$, realizing $i$ internally as a planar bivector quarter-turn without presupposing $\mathbb{C}$ (note: on odd-dimensional $\mathbb{R}^{2m+1}$, $\det(R^{\mathsf{T}}) = (-1)^{2m+1}\det R$ forces $\det R = 0$, so global real-linear complex structures require even real dimension $2m$, a `T3` parity constraint).
4. **Ostrowski Valuation Bifurcation (`T3`) and Metric Cauchy Completion (`T1`)**:
   Passing from $\mathbb{Q}$ to complete fields requires two steps: first, Ostrowski's theorem [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification) ([@thm-ch36-ostrowski-padic-ball-and-blind-spot], `LEAN ✓`) splits every nontrivial absolute value on $\mathbb{Q}$ into either the Archimedean real norm $|\cdot|_\infty$ or a unique prime $p$-adic ultrametric $|\cdot|_p$ (`T3` valuation bifurcation), locked together globally by the adelic product formula [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula) ([@thm-ch36-crt-and-adelic-product-formula], `LEAN ✓`); second, `T1` Cauchy completion yields $\mathbb{R}$ (hence $\mathbb{C} = \mathbb{R}[R]/(R^2+1)$) and $\mathbb{Q}_p$.
   - **Countably Infinite Incomplete Countermodel (`manual derivation`, Distinct from Finite Sets)**: Every **finite** metric space is automatically Cauchy complete (since positive minimum separation forces every Cauchy sequence to become eventually constant), so the minimal countermodel to completeness is necessarily **countably infinite**—namely the rational pre-Hilbert plane $\mathbb{Q}^2$ or Gaussian rationals $\mathbb{Q}[i]$, where rational approximations $\{q_k\}_{k=1}^\infty$ to $\sqrt{2}$, $(1 + 1/n)^n \to e$, or irrational phase points $(\cos\theta^*, \sin\theta^*)$ are Cauchy yet fail to converge inside $\mathbb{Q}^2$ until `T1` completion is applied.
:::

---

## E.4 Metric Geometry, Parallelogram Polarization, and Gram–Spherical Curvature (Paired with Corollary [@cor-ch32-parallelogram-quadratic-and-gram]) {#sec-appe-geometry}

The third deduction chain audits Euclidean and unitary metric geometry, Gram metric realizability, and the curvature bifurcation between flat affine space and normalized state spheres:

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
3. **Unit-Sphere Normalization vs. Euclidean Parallel Postulate (`T3` Curvature Bifurcation)**:
   Euclid's fifth postulate ($\alpha + \beta + \gamma = \pi$) **does not** hold unconditionally on normalized comparison states—constraining states to $S(x, x) = 1$ bends $3$-state geodesic loops into the infinitesimal spherical trihedron $\Delta\mathcal{T}_\epsilon$ ([Chapter 34 §34.4](ch34-orthogonality-degeneracy-and-observer-position.md#sec-ch34-infinitesimal-spherical-trihedron)), whose Girard spherical excess is strictly positive for every $\epsilon \in (0, \frac{\pi}{2}]$ (`manual derivation` + `Literature`):

   $$
   \Omega(\epsilon) \;=\; \alpha + \beta + \gamma - \pi \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + O(\epsilon^4) \;>\; 0.
   $$

   Flat Euclidean geometry $\Omega = 0$ is recovered only in the first-order tangent limit $\epsilon \to 0^+$ or on unnormalized affine vector spaces; zero, positive, and negative constant curvature form a clean `T3` geometric bifurcation.
:::

---

## E.5 Clause-by-Clause Bridging and Countermodel Audit of the Five Quantum Postulates (Paired with Corollary [@cor-ch32-quantum-postulates-core]) {#sec-appe-quantum}

The fourth deduction chain stress-tests all **five Dirac–von Neumann textbook postulates**, pinpointing why single-qubit ($d = 2$) probabilities, post-measurement updates, infinite-dimensional dynamics, and composite tensor spaces require explicit `T2` operational bridges:

$$
\text{Layer-1 CMP} \;\xrightarrow{\;\text{T1 + T3}\;}\; \mathcal{H} \;\xrightarrow{\;\text{POVM additivity (T2)}\;}\; \operatorname{Tr}(\rho E) \;\xrightarrow{\;\text{repeatability + 2-sided inv. (T2)}\;}\; (P_k\rho P_k,\, U_t) \;\xrightarrow{\;\text{local tomog. (T2) + }S_N\text{ (T3)}\;}\; \mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2,\;\bigwedge^N\mathcal{H}.
$$

::: {.remark #rem-appe-quantum-chain title="Deduction Chain IV Audit: Clause-by-Clause Bridging of the Five Quantum Postulates, Effect Additivity, and Local Tomographic Minimality (LEAN ✓ and Literature)"}
**Bridge Conditions and Minimal Countermodels Across Postulates I–V.**

1. **Postulate I (Complex Hilbert State Space $\mathcal{H}$)**: Assembled from Layer-1 polarization, `T3` complex structure $J^2 = -I$, and `T1` Cauchy completion (omitting completion leaves countably infinite $\mathbb{Q}[i]^d$).
2. **Postulate II (Observables and Born's Rule $p(E) = \operatorname{Tr}(\rho E)$)**: On a single qubit ($d = 2$), orthogonal-projector additivity $f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) = 1$ **fails** to force Born's rule—beyond the discontinuous hemisphere indicator of [Chapter 2](ch02-born-rule.md) [@ex-qubit-busch-reconstruction], smooth nonlinear countermodels exist (see [@ex-appe-qubit-cubic-and-tomography] below)! Two exact bridges close the gap: either require **finite additivity across POVM effects $0 \le E \le I$ (`T2`)**, whereby the frozen finite-dimensional Busch theorem [`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation) ([@thm-busch-effect-density], `LEAN ✓`) uniquely forces $p(E) = \operatorname{Tr}(\rho E)$ for all $d \ge 2$; or restrict to dimensions $d \ge 3$ and invoke Gleason's theorem on projection lattices (Gleason 1957, [@rem-gleason-literature], `Literature`).
3. **Postulate III (Post-Measurement Conditioning and Robertson–Schrödinger Uncertainty)**: Rank-one Born pairing weights are verified in [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) (`LEAN ✓`), and the commutator–anticommutator uncertainty bound in [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger) (`LEAN ✓`). However, single-shot Born statistics alone **do not** uniquely fix the state-update rule!
   - **Finite Non-Repeatable Reset-Instrument Countermodel (`manual derivation`)**: Compare the Lüders projection instrument $\mathcal{I}_k(\rho) = P_k \rho P_k$ against the reset instrument $\mathcal{J}_k(\rho) = \operatorname{Tr}(\rho P_k)\,|+\rangle\langle +|$ ($P_0 = |0\rangle\langle 0|,\; P_1 = |1\rangle\langle 1|,\; |+\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}$). Both yield **identical single-shot Born probabilities** $\operatorname{Tr}(\mathcal{J}_k(\rho)) = \operatorname{Tr}(\rho P_k)$, yet under two consecutive $Z$ measurements $\mathcal{J}_0$ flips an observed $0$ into $1$ with probability

     $$
     P_{\mathcal{J}}(1 \text{ after } 0) \;=\; \frac{\operatorname{Tr}\bigl(P_1 \mathcal{J}_0(\rho)\bigr)}{\operatorname{Tr}\bigl(\mathcal{J}_0(\rho)\bigr)} \;=\; |\langle 1 | +\rangle|^2 \;=\; \frac{1}{2} \;\neq\; 0 \;=\; P_{\mathcal{I}}(1 \text{ after } 0)!
     $$

     Hence **repeatability ($\mathcal{I}_k$ idempotence) and minimal disturbance on compatible observables (`T2`)** are required to single out Lüders projection.
4. **Postulate IV (Unitary Evolution vs. One-Sided Isometry)**: On finite-dimensional $\mathbb{C}^d$, every inner-product-preserving linear map $V^\dagger V = I_d$ is automatically unitary; on **countably infinite-dimensional** $\ell^2(\mathbb{N})$, however, the unilateral shift $S|n\rangle = |n + 1\rangle$ preserves all pairwise comparisons $\langle S\psi, S\phi\rangle = \langle\psi, \phi\rangle$ ($S^\dagger S = I$) while missing $|0\rangle$ ($S S^\dagger = I - |0\rangle\langle 0| \neq I$, non-unitary!). Infinite-dimensional dynamics therefore requires **two-sided reversibility / surjectivity (`T2`)**, combined with connected ray rigidity [`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests) (`LEAN ✓`) and strong continuity (Stone's theorem 1932, `Literature`) to yield $U(t) = e^{-itH/\hbar}$.
5. **Postulate V (Composite Tensor Product $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$ and Fermionic Pauli Sector $\bigwedge^N\mathcal{H}$)**: Two distinct bridges govern many-body composition—first, **complex local tomographic minimality (`T2`)** (Hardy 2001; Chiribella–D'Ariano–Perinotti 2011, `Literature`) rules out both real two-rebit hidden correlations and direct-sum dark sectors (worked out in [@ex-appe-qubit-cubic-and-tomography] below); second, because nonzero symmetric bosonic states $|\psi\rangle \otimes |\psi\rangle \in \mathrm{Sym}^2(\mathcal{H})$ are equally valid in Hilbert space, Pauli exclusion $|\psi\rangle \wedge |\psi\rangle = 0$ specifically selects the **odd sign representation of $S_N$ (`T3` exchange bifurcation)**, tied to half-integer spin in $3+1$D local relativistic QFT by Pauli's spin-statistics theorem (1940, `Literature`).
:::

::: {.example #ex-appe-qubit-cubic-and-tomography title="Single-Qubit Odd-Cubic Frame-Function Countermodel and Two-Rebit Local-Tomography Breakdown (Manual Derivation)"}
**Manual derivation.** Two explicit finite-dimensional calculations demonstrate why `T2` operational hypotheses are indispensable in Postulates II and V:

1. **Smooth Odd-Cubic Frame Function on a Single Qubit (Refuting $d = 2$ Born Rule from Projective Additivity Alone)**:
   On the Bloch sphere $\mathbf{r} = (r_x, r_y, r_z) \in S^2$, assign to each rank-one projector $P_{\mathbf{r}} = \frac{1}{2}(I_2 + \mathbf{r}\cdot\boldsymbol{\sigma})$ the smooth function

   $$
   f(P_{\mathbf{r}}) \;:=\; \frac{1}{2}\bigl(1 + r_z^3\bigr), \qquad f(0) := 0, \qquad f(I_2) := 1.
   $$

   Since $r_z \in [-1, 1]$, we have $0 \le f(P_{\mathbf{r}}) \le 1$, and because every orthonormal basis of $\mathbb{C}^2$ corresponds to an antipodal pair $\{P_{\mathbf{r}}, P_{-\mathbf{r}}\}$,

   $$
   f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) \;=\; \frac{1}{2}(1 + r_z^3) + \frac{1}{2}\bigl(1 + (-r_z)^3\bigr) \;=\; 1
   $$

   holds on **every orthonormal qubit basis**! Yet the cubic term $r_z^3$ prevents $f$ from equaling $\operatorname{Tr}(\rho P_{\mathbf{r}}) = \frac{1}{2}(1 + \mathbf{s}\cdot\mathbf{r})$ for any density matrix $\rho$. Testing $f$ on the meridian trine POVM $E_k = \frac{2}{3}P_{\mathbf{r}_k}$ ($k = 1, 2, 3$) with

   $$
   \mathbf{r}_1 = (0, 0, 1), \qquad \mathbf{r}_2 = \left(\tfrac{\sqrt{3}}{2},\, 0,\, -\tfrac{1}{2}\right), \qquad \mathbf{r}_3 = \left(-\tfrac{\sqrt{3}}{2},\, 0,\, -\tfrac{1}{2}\right), \qquad \sum_{k=1}^3 \mathbf{r}_k = \mathbf{0} \;\Longrightarrow\; \sum_{k=1}^3 E_k = I_2,
   $$

   effect additivity and homogeneity would demand $\sum_{k=1}^3 \frac{2}{3}f(P_{\mathbf{r}_k}) = f(I_2) = 1$; substituting $r_{1,z}^3 = 1$ and $r_{2,z}^3 = r_{3,z}^3 = -\frac{1}{8}$ instead yields

   $$
   \sum_{k=1}^3 \frac{2}{3}\,f(P_{\mathbf{r}_k}) \;=\; \frac{2}{3}\left[1 + \frac{1}{2}\left(1 - \frac{1}{8}\right) + \frac{1}{2}\left(1 - \frac{1}{8}\right)\right] \;=\; \frac{2}{3}\left(1 + \frac{7}{16} + \frac{7}{16}\right) \;=\; \frac{5}{4} \;\neq\; 1!
   $$

   This exact $1.25 \neq 1$ violation shows how effect additivity in [@thm-busch-effect-density] (`effect_density_representation`) eliminates every nonlinear frame function in $d = 2$.
2. **Two-Rebit Antisymmetric Correlator and Direct-Sum Dark Sectors (Refuting $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$ Without Local Tomography)**:
   - *Local-tomography failure over $\mathbb{R}$*: On two real qubits $\mathbb{R}^2 \otimes_{\mathbb{R}} \mathbb{R}^2 \cong \mathbb{R}^4$, symmetric observables form a $\frac{4 \times 5}{2} = 10$-dimensional space, whereas products of single-rebit symmetric observables ($\dim = \frac{2 \times 3}{2} = 3$) span only $3 \times 3 = 9 < 10$ dimensions! The missing $10$-th observable is

     $$
     W \;=\; J \otimes J, \qquad J = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \qquad W^{\mathsf{T}} = (-J) \otimes (-J) = J \otimes J = W \neq 0,
     $$

     which satisfies $\operatorname{Tr}\bigl(W(A_1 \otimes A_2)\bigr) = \operatorname{Tr}(J A_1)\operatorname{Tr}(J A_2) = 0 \cdot 0 = 0$ for all real symmetric $A_1^{\mathsf{T}} = A_1,\; A_2^{\mathsf{T}} = A_2$—making the orthogonal states $\rho_{\pm} = \frac{1}{4}(I_4 \pm W)$ completely invisible to all local product measurements! Over $\mathbb{C}$, Hermitian real dimensions satisfy $(d_1 d_2)^2 = d_1^2 \cdot d_2^2$, closing local tomography exactly.
   - *Non-minimal dark sector*: Embedding local operators into $(\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2) \oplus \mathcal{K}$ ($\dim\mathcal{K} \ge 1$) via $(A_1 \otimes A_2) \oplus 0_{\mathcal{K}}$ preserves all single-system comparisons while hiding states on $\mathcal{K}$ from local probes. **Complex local tomographic minimality (`T2`)** uniquely locks $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$.
:::

---

## E.6 Spacetime Null Cones, Fibered Gauge Connections, Decoherence Thermodynamics, and Paid Comparison (Paired with Corollary [@cor-ch32-minkowski-holonomy-and-second-law]) {#sec-appe-spacetime}

The fifth deduction chain audits the Layer-2 inputs behind causal spacetime, non-flat gauge curvature, the thermodynamic arrow of time, and computational complexity boundaries:

$$
\text{Lorentz split (T3)} \;\xrightarrow{\;\text{null rigidity}\;}\; c\,\eta_{\mu\nu}, \qquad \{\mathcal{H}_x, U_{xy}\}_{\text{Layer 2}} \;\xrightarrow{\;\text{chord loops}\;}\; W_{\gamma}, \qquad \mathcal{E}_P(I)=I \;\xrightarrow{\;\text{dephasing}\;}\; \Delta S_{\mathrm{vN}} = D(\rho\|\mathcal{E}_P(\rho)) \ge 0.
$$

::: {.remark #rem-appe-spacetime-chain title="Deduction Chain V Audit: Minkowski Null Cone, Fibered Gauge Connection, Unital Pinching Entropy Production, and Paid-Comparison Boundaries (LEAN ✓, Manual Countermodels, and OPEN Frontier)"}
**Exact Bridge Conditions and Minimal Countermodels Across Four Physical and Computational Corollaries.**

1. **Euclidean Rotation vs. Minkowski Hyperbolic Null-Cone Rigidity (`T3` + `LEAN ✓`)**:
   Compact Euclidean signature $t^2 + \|\mathbf{x}\|^2$ admits no causal light cone; once Lorentzian signature $(1, d)$ is selected (`T3`), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null) (`LEAN ✓`) proves that any real quadratic form vanishing on the null cone $t^2 - \|\mathbf{x}\|^2 = 0$ is globally a scalar multiple of the Minkowski metric (causal light-cone structure determines the metric up to a conformal scale).
2. **Global Single-Fiber Flatness vs. Local Fibered Gauge Holonomy (`T2` Layer 2 + `LEAN ✓`)**:
   - **Single-Fiber Zero-Curvature Countermodel (`manual derivation`)**: If every site shares one fixed global Clifford algebra $\mathcal{Cl}(V, q_+)$ and pairwise comparison is defined by unit-vector Clifford multiplication $\mathrm{CMP}_{\mathrm{glob}}(a, b) = a b$ ($a^2 = b^2 = c^2 = \mathbf{1}$), then around every $3$-vertex loop

     $$
     \mathrm{CMP}_{\mathrm{glob}}(a, b)\,\mathrm{CMP}_{\mathrm{glob}}(b, c)\,\mathrm{CMP}_{\mathrm{glob}}(c, a) \;=\; (ab)(bc)(ca) \;=\; a(b^2)(c^2)a \;=\; a^2 \;=\; \mathbf{1}!
     $$

     Loop holonomy is identically trivial and Yang–Mills field strength $F_{\mu\nu}$ vanishes everywhere!
   - **Layer-2 Fibered Connection Bridge (`LEAN ✓`)**: Nontrivial gauge curvature requires independent local internal fibers $\mathcal{H}_x$ linked across edges by **connection transport operators $U_{xy}$** (`T2` Layer 2); on any finite connected graph, [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification) (`LEAN ✓`) proves that gauge-invariant loop holonomies are completely classified by fundamental spanning-tree chord cycles (whereas the $3+1$D continuum non-Abelian Yang–Mills mass gap remains a Millennium `OPEN` problem in `T4`).
3. **Isentropic Unitary & Active Reset Cooling vs. Unital Coarse-Grained Second Law (`T2` Layer 2 + `LEAN ✓`)**:
   - **Two Finite-Dimensional Countermodels (`manual derivation`)**: (i) Pure unitary evolution $\rho \mapsto U \rho U^\dagger$ preserves eigenvalues, giving $\Delta S_{\mathrm{vN}} = 0$ (no arrow of time); (ii) the non-unital active reset channel $T_{\mathrm{reset}}(\rho) = |0\rangle\langle 0|$ (dumping entropy into an untracked cold reservoir, $T_{\mathrm{reset}}(I_2) = 2|0\rangle\langle 0| \neq I_2$) strictly lowers local entropy on $\rho_* = \frac{1}{2}I_2$:

     $$
     \Delta S_{\mathrm{vN}}(\rho_*) \;=\; S_{\mathrm{vN}}\bigl(|0\rangle\langle 0|\bigr) - S_{\mathrm{vN}}\!\left(\tfrac{1}{2}I_2\right) \;=\; 0 - \log 2 \;=\; -\log 2 \;<\; 0!
     $$

   - **Layer-2 Unital Pinching Bridge (`LEAN ✓`)**: Monotonic entropy production requires **unital (doubly stochastic, reservoir-free) orthogonal-basis record pinching $\mathcal{E}_P(I) = I$** (`T2` Layer 2), under which [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) (`LEAN ✓`) proves the exact relative-entropy law $\Delta S_{\mathrm{vN}} = S(\mathcal{E}_P(\rho)) - S(\rho) = D(\rho \,\|\, \mathcal{E}_P(\rho)) \ge 0$.
4. **Reversible Paid Name Comparison vs. Open Complexity Lower Bounds (`LEAN ✓` + `OPEN`)**:
   At the discrete computational bedrock, [`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run) (`LEAN ✓`) proves that reversible binary-name equality comparison executes in exact paid budget $2\ell + 2$ while restoring work tapes cleanly; whether polynomial-time verification separates from polynomial-time search ($\mathrm{P} \neq \mathrm{NP}$), however, cannot be claimed from paid comparison alone and stands honestly as a red `OPEN` frontier (`T4`).
:::

---

## E.7 Panoramic Audit and Further-Processing Table for the Nine Intermediate Hypotheses (H1–H9) {#sec-appe-audit-table}

The nine intermediate hypotheses (`H1`–`H9`) identified across Sections E.1–E.6—together with their minimal countermodels (explicitly distinguishing finite from countably infinite models), four-way classification (`T1`–`T4`), further-processing mechanisms, and epistemic status—are consolidated in the master ledger below:

::: {.remark #rem-appe-master-audit-table title="Master Audit and Further-Processing Table for the Nine Intermediate Hypotheses (H1–H9) from Axiom of Comparison A₀ to Foundational Axiom Systems"}
**Master Epistemic Ledger (Consolidating Corollaries [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-minkowski-holonomy-and-second-law] and Sections E.1–E.6).**

| ID & Intermediate Hypothesis | Target Deduction Chain | Minimal Countermodel When Omitted (Finite vs. Countably Infinite) | Class | Further-Processing Mechanism | Epistemic Basis |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **`H1` Comparison-kernel quotienting** (plus $\operatorname{char} \neq 2$ so $2$ is invertible) | Logic & extensionality ([@cor-ch32-extensionality-and-quotient]) | **Finite**: $+1 = -1$ over $\mathbb{F}_2$ collapses parity; $2$-point duplicate $\{a_1, a_2\}$ with $\mathrm{CMP} \equiv 1$ violates raw Leibniz identity | `T1` | Pass to the canonical quotient $X/{\sim_{\mathrm{CMP}}}$, turning extensionality into an exact quotient theorem | `LEAN ✓` ([`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition)) |
| **`H2` Positive self-pairing, simple rank-$2$ elliptic square & $n$-point Gram PSD** | Layer 0 $\to$ Layer 1 geometry (Section E.1) | **Finite**: $1$-point $\mathrm{CMP} = -1$; dual $1\pm\varepsilon$ & split-complex $\cosh\eta\pm j\sinh\eta$; $\mathcal{Cl}_{4,0}$ non-simple $e_1\wedge e_2 + e_3\wedge e_4$; $3\times 3$ real $\det S = -3 < 0$ | `T3` + Layer 1 | Declare positive-definite Clifford $2$-blade realization $\mathrm{CMP}(x,y)=\langle x,y\rangle + x\wedge y$; classify hyperbolic/nilpotent as signature branches | `LEAN ✓` ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)) + `manual derivation` ([@ex-appe-layer0-countermodels]) |
| **`H3` Parallelogram polarization & metric Cauchy completion** | Number fields & metric geometry ([@cor-ch32-successor-primes-and-zeckendorf], [@cor-ch32-parallelogram-quadratic-and-gram]) | **Finite-dim**: 2D $\ell^1_2$ gives $4 + 4 = 8 \neq 4$; **Countably infinite**: $\mathbb{Q}^2, \mathbb{Q}[i]$ miss Cauchy limits (every finite metric space is complete) | `T2` + `T1` | Recover inner products via parallelogram polarization, then apply canonical Cauchy completion to obtain $\mathbb{R}, \mathbb{C}, \mathcal{H}$ | `LEAN ✓` ([`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)) + `Literature` (Jordan–von Neumann, Schoenberg) |
| **`H4` Inexhaustible orthogonal residual ($S^\perp \neq \bot$) & Ostrowski valuation choice** | Arithmetic, complex structure & $p$-adic trees ([@cor-ch32-successor-primes-and-zeckendorf]) | **Finite**: $\mathbb{R}^n$ saturates after $n$ orthogonal steps; $\mathbb{Z}/N\mathbb{Z}$ loops $N \equiv 0$; odd real dimension admits no global $R^2 = -I$ | `T2/T4` + `T3` | Treat open dimension $S^\perp \neq \bot$ as the source of succession and prime axes; unify $\mathbb{R}$ and $\mathbb{Q}_p$ via Ostrowski's dichotomy | `LEAN ✓` ([`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)) |
| **`H5` Finite-dimensional POVM effect additivity (or $d \ge 3$ projection additivity)** | Quantum Postulate II: Born rule ([@cor-ch32-quantum-postulates-core]) | **Finite-dim ($d = 2$)**: Discontinuous hemisphere indicator, plus smooth cubic $f(P_{\mathbf{r}})=\frac{1}{2}(1+r_z^3)$ giving $\frac{5}{4} \neq 1$ on the trine POVM | `T2` | Replace projector-only additivity by convex POVM effect additivity, uniquely locking $p(E)=\operatorname{Tr}(\rho E)$ across all $d \ge 2$ | `LEAN ✓` ([`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation), [@thm-busch-effect-density]) + `Literature` (Gleason $d \ge 3$) |
| **`H6` Repeatable minimal-disturbance conditioning & two-sided reversibility** | Quantum Postulates III–IV: Lüders update & unitarity ([@cor-ch32-quantum-postulates-core]) | **Finite**: Reset instrument $\mathcal{J}_k(\rho)=\operatorname{Tr}(\rho P_k)|+\rangle\langle+|$ gives $P(1\text{ after }0)=\frac{1}{2}$; **Countably infinite-dim**: shift on $\ell^2(\mathbb{N})$ has $S^\dagger S = I \neq SS^\dagger$ | `T2` | Single out Lüders projection via repeatable minimal disturbance; lock unitary groups via two-sided invertibility plus ray rigidity | `LEAN ✓` ([`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)) + `Literature` (Stone) |
| **`H7` Complex local tomographic minimality & antisymmetric exchange representation** | Quantum Postulate V: Tensor product & Pauli exclusion ([@cor-ch32-quantum-postulates-core]) | **Finite**: Two-rebit hidden observable $W = J \otimes J$ ($\operatorname{Tr}(W(A_1\otimes A_2))=0$); dark sector $\oplus\mathcal{K}$; bosonic state $|\psi\rangle\otimes|\psi\rangle \neq 0$ | `T2` + `T3` | Lock $\mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2$ via dark-sector-free complex local tomography; classify $\mathrm{Sym}^N$ vs. $\bigwedge^N$ as $S_N$ sign branches | `manual derivation` ([@ex-appe-qubit-cubic-and-tomography]) + `Literature` (Hardy, CDP, Pauli 1940) |
| **`H8` Lorentzian signature, local fibered edge transport $U_{xy}$ & unital pinching** | Spacetime, gauge curvature & second law ([@cor-ch32-minkowski-holonomy-and-second-law]) | **Finite**: Euclidean sphere has no light cone; global single-fiber $(ab)(bc)(ca)=\mathbf{1}$ is flat; unitary $\Delta S_{\mathrm{vN}}=0$ & reset $T(\rho)=|0\rangle\langle 0|$ gives $\Delta S_{\mathrm{vN}}=-\log 2 < 0$ | `T3` + `T2` | Select $(1,d)$ null signature; carry gauge holonomy on local fiber connections; derive $\Delta S_{\mathrm{vN}} \ge 0$ from unital basis pinching | `LEAN ✓` ([`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)) |
| **`H9` Higher set existence, $3+1$D continuum QFT limits & complexity lower bounds** | Transfinite set theory, continuum QFT & complexity | **Finite**: Hereditarily finite universe $V_5$ ($65{,}536$ sets) satisfies finite extensional closure while refuting ZFC Infinity | `T4` | Explicitly exclude from two-slot comparison claims, preserving them honestly as independent axioms or open scientific frontiers | `LEAN ✓` ([`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode), [`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)) + `OPEN` ($\mathrm{P}\neq\mathrm{NP}$, Yang–Mills mass gap) |
:::

Stepping back across the entire audit table ([@rem-appe-master-audit-table]), the exact mathematical content of "other axioms are corollaries of the Axiom of Comparison $\mathcal{A}_0$" (`MODEL`) stands completely transparent: it **never** claims to conjure continuum limits or transfinite cardinals out of thin air without hypotheses. Rather, it demonstrates that once canonical quotienting and Cauchy completion (`T1`) are factored out, dozens of seemingly unrelated postulates scattered across textbooks of logic, arithmetic, geometry, quantum mechanics, and gauge thermodynamics grow along a single **two-slot comparison spine $\mathrm{CMP}$**—with physical postulates reduced to concrete laboratory additivity, repeatability, and tomographic clauses (`T2`), mathematical diversity organized into clean signature, valuation, and representation bifurcations (`T3`), and transfinite or unresolved complexity frontiers demarcated by explicit countermodels (`T4` / `OPEN`).
