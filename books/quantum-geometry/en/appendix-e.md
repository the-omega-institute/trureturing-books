# Appendix E From the Axiom of Comparison to Mathematical and Physical Axiom Systems: Complete Deduction Chains, Intermediate-Hypothesis Audit, and Minimal Countermodels {#appendix-e-comparison-axiom-deduction-ledger}

This appendix serves as the **formal epistemic audit ledger** paired with [Chapter 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)–[§32.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries) ([@def-ch32-axiom-of-comparison] and the six formal Corollaries [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-bargmann-holonomy-and-path-product]). In Chapter 32, pairwise relational measurement is distilled into the Zero-Background Axiom of Comparison $\mathcal{A}_0$ and the single-instruction geometric-product primitive $\mathrm{CMP}(\mathbf{A}, \mathbf{B}) = \mathbf{A}\cdot\mathbf{B} + \mathbf{A}\wedge\mathbf{B}$, from which the core skeletons of logic and extensionality, arithmetic and field completions, metric geometry, quantum postulates, and relativistic–gauge–endogenous Berry–discrete path-product–thermodynamic laws emerge as conditional corollaries under explicit bridge hypotheses. To prevent any axiomatic sleight of hand—where a single slogan quietly smuggles in hidden assumptions—this appendix dissects every deduction step by step: **Which steps follow losslessly from two-slot comparison via canonical quotienting or completion? Which projective geometric phases already close endogenously inside Layer 1? Which steps require operational laboratory measurement, dynamical generators, or composite tomographic clauses? Which steps mark genuine mathematical bifurcations in signature, valuation, or exchange statistics? And whenever an intermediate hypothesis is dropped, what is the minimal countermodel (finite or countably infinite) that refutes the target conclusion?**

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
   - **Layer 1 (Positive-Definite Inner-Product / Clifford and Endogenous Projective-Ray Realization)**: Objects embed into a real Euclidean inner-product space and its Clifford algebra $\mathcal{Cl}(V, q_+)$ via $\mathrm{CMP}(x, y) = \langle x, y\rangle\mathbf{1} + x \wedge y$. Three geometric rigidities switch on simultaneously: (i) normalized self-comparison is strictly positive, $S(x, x) = +1$; (ii) the wedge of two vectors is a rank-$2$ **simple 2-blade** satisfying Plücker simplicity $(x \wedge y) \wedge (x \wedge y) = 0$ and elliptic negative square $(x \wedge y)^2 = -\|x \wedge y\|^2\mathbf{1}$, so the Lagrange–Gram identity ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), `LEAN ✓`) enforces $\langle x, y\rangle^2 + \|x \wedge y\|^2 = \|x\|^2\|y\|^2$; and (iii) for every finite $n$-tuple $\{x_1, \dots, x_n\}$, the similarity matrix $G_{ij} = S(x_i, x_j)$ is globally positive-semidefinite, $G \succeq 0$. Crucially, once pure states are represented by rank-one state projectors $P(\mathbf{n}) = \frac{1}{2}(I_2 + \mathbf{n}\cdot\boldsymbol{\sigma})$ ($\|\mathbf{n}\|=1$) on the Layer-1 unit Bloch sphere $S^2 \cong \mathrm{SU}(2)/\mathrm{U}(1)$, single-fiber projected comparison loops **already** carry nontrivial endogenous projective $\mathrm{U}(1)$ Pancharatnam–Berry ray holonomy inside Layer 1 ([`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch); see [Chapter 34 §34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral) and Section E.6 below).
   - **Layer 2 (Spacetime-Indexed Fibered Connection Transport, Composite Local Tomography, and Coarse-Grained Pinching)**: When comparisons move beyond a single fiber across **spacetime-indexed independent site fibers $\{\mathcal{H}_x, U_{xy}\}$ and external gauge field dynamics**, combine subsystems, or pass through a finite-bandwidth observer's unread record basis, Layer 1 is enriched with inter-site unitary connection transport $U_{xy}$, complex local tomographic minimality, and unital (doubly stochastic) basis-pinching channels.
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
3. **Honest Boundary for Higher ZFC Existence Postulates (`T4` + Finite and Countable Countermodels)**:
   Quotienting and diagonal escape (cf. the Gödelian self-referential blind spot in [Chapter 38 §38.6](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp)) **do not** derive ZFC's Axioms of Infinity, unrestricted Pairing/Power Set, Replacement, or Choice. **Finite and countably infinite countermodels (`manual derivation`)**: (i) finite cumulative stage $V_5$ ($|V_5| = 65{,}536$) satisfies Extensionality, Empty Set, Foundation, Separation, and Union (for elements of $V_5$) under $\in$, while refuting **ZFC Infinity** (every member of $V_5$ is finite) and also failing unrestricted **Pairing and Power Set** at its top rank ($V_4 \in V_5$ has $\operatorname{rank}(V_4) = 4$, so $\{V_4\}$ and $\mathcal{P}(V_4) = V_5$ have rank $5$ and lie outside $V_5$!); (ii) ascending to the countably infinite hereditarily finite universe $V_\omega := \bigcup_{k < \omega} V_k$ restores **all** axioms of $\mathrm{ZFC} - \text{Infinity}$ (including unrestricted Pairing, Power Set, Union, Foundation, and Replacement) while still refuting **ZFC Infinity**! Transfinite cardinals and Choice remain irreducible `T4` / `H9` set-theoretic inputs.
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
   - **Finite-Dimensional Saturation Countermodels and Spatial-Rigidity Boundary (`manual derivation`)**: In fixed $\mathbb{R}^n$, at most $n$ mutually orthogonal unit vectors exist before $S^\perp = \{0\}$ saturates at step $n + 1$; in the finite ring $\mathbb{Z}/N\mathbb{Z}$, $k \mapsto k + 1$ loops back to $N \equiv 0$ (violating Peano's axiom that $0$ is no element's successor). Note explicitly that neither the fixed-$D$ North-Pole stereographic homeomorphism $\Pi_N : S^D \setminus \{N\} \xrightarrow{\sim} \mathbb{R}^D$ of [Chapter 38 §38.7](ch38-s07-blindspot-and-relativization.md#sec-ch38-stereographic-blindspot-relativization-suspension) (which uncompactifies a fixed finite topological dimension $D$) nor the 3D Maxwell–Laman spatial truss rigidity lock $\Delta E(3) = \Delta E(4) = 0$ of [Chapter 34 §34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability) (which fixes macroscopic base dimension $D = 3$) discharges Hilbert-space residual inexhaustibility `H4` ($\dim\mathcal{H} = \infty$, $S_n^\perp \neq \bot$).
2. **Unbounded Prime Axes and the Zeckendorf No-Adjacent-Ones Automaton Language (`LEAN ✓` + `Literature`)**:
   Once non-collapsing succession opens $\mathbb{N}$, [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape) (`LEAN ✓`) supplies a fresh orthogonal prime axis beyond every finite prime list, embedding $\mathbb{Q}_{>0}^\times \hookrightarrow \bigoplus_p \mathbb{Z}$; on the minimal two-step recurrence coding side, the frozen automaton theorem [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes) (`LEAN ✓`) proves specifically that the two-state DFA `binaryZeckendorfBase` accepts a binary word $\mathrm{word} \in \operatorname{List}(\operatorname{Fin} 2)$ if and only if `NoAdjacentOnes word` holds, whereas arithmetic uniqueness of representing every natural number as a sum of non-consecutive Fibonacci numbers belongs to Zeckendorf's arithmetic representation theorem (`Literature`).
3. **Quarter-Turn Orthogonal Rotation and Complex-Structure Squaring $R^2 = -I_n$ (`LEAN ✓` + `T3` Real-Carrier Parity)**:
   In the frozen library, [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary) (`LEAN ✓`) is typed on finite-dimensional complex matrices $R \in M_n(\mathbb{C})$ (`[Fintype n] [DecidableEq n]`), proving that $R^\dagger = -R$ and $R R^\dagger = I_n$ force $R^2 = -I_n$; restricting that identity to a real matrix carrier $R \in M_n(\mathbb{R})$ ($R^{\mathsf{T}} = -R,\; R^{\mathsf{T}} R = I_n$, realizing $i$ endogenously as a planar bivector quarter-turn without presupposing $\mathbb{C}$) encounters $\det(R^{\mathsf{T}}) = (-1)^{2m+1}\det R \implies \det R = 0$ on odd-dimensional $\mathbb{R}^{2m+1}$, so global real-linear complex structures exist only in even real dimension $n = 2m$ (`T3` carrier-dimension parity constraint).
4. **Ostrowski Valuation Bifurcation (`T3`) and Metric Cauchy Completion (`T1`)**:
   Passing from $\mathbb{Q}$ to complete fields requires two steps: first, Ostrowski's theorem [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification) ([@thm-ch36-ostrowski-padic-ball-and-blind-spot], `LEAN ✓`) splits every nontrivial absolute value on $\mathbb{Q}$ into either the Archimedean real norm $|\cdot|_\infty$ or a unique prime $p$-adic ultrametric $|\cdot|_p$ (`T3` valuation bifurcation), locked together globally by the adelic product formula [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula) ([@thm-ch36-crt-and-adelic-product-formula], `LEAN ✓`); second, `T1` / `H3` Cauchy completion yields $\mathbb{R}$ (hence $\mathbb{C} = \mathbb{R}[R]/(R^2+1)$) and $\mathbb{Q}_p$ (similarly, real stereographic projection $\Pi_N$ already presupposes the complete real manifold $S^D$ and cannot substitute for `H3` Cauchy completion over $\mathbb{Q}^D$).
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
3. **Unit-Sphere Normalization, Ambient Carrier Dimension, and the Euclidean Parallel Postulate (`T3` + Layer 1)**:
   Euclid's fifth postulate ($\alpha + \beta + \gamma = \pi$) **does not** hold unconditionally on normalized comparison states—inside an **oriented ambient inner-product carrier of dimension $D \ge 3$** (note that $\Lambda^2\mathbb{R}^2 \not\subset \mathbb{R}^2$ admits no in-plane orthogonal normal, so the "Two Begets Three" Hodge-star normal bootstrap $\mathbf{e}_\perp = \star(\mathbf{A}\wedge\mathbf{B})/\sin\epsilon$ in [Chapter 34 §34.5](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names) requires an oriented carrier $D \ge 3$, macroscopically locked at $D = 3$ by complete-graph $K_N$ Maxwell–Laman rigidity $\Delta E(3) = \Delta E(4) = 0$ in [§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)), constraining states to $S(x, x) = 1$ bends $3$-state geodesic loops into the tilted spherical trihedron $\Delta\mathcal{T}_\epsilon$ ([Chapter 34 §34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron); distinguishing $\det G = \sin^2\epsilon$ for an orthogonal unit normal $(\mathbf{A}, \mathbf{B}, \mathbf{e}_\perp)$ from $\det G(\mathbf{A}, \mathbf{B}, \mathbf{P}) = \sin^4\epsilon$ for the tilted equal-footing projection state $\mathbf{P} = \cos\epsilon\,\mathbf{A} + \sin\epsilon\,\mathbf{e}_\perp$, while exact $C_3 \subset \mathrm{SO}(3)$ cyclic symmetry holds on equilateral/orthonormal configurations and Countermodel (d) with $\det S = -3 < 0$ still stands whenever Layer-1 global Gram PSD $G \succeq 0$ is omitted), whose Girard spherical excess is strictly positive for every $\epsilon \in (0, \frac{\pi}{2}]$ (`manual derivation` + `Literature`):

   $$
   \Omega(\epsilon) \;=\; \alpha + \beta + \gamma - \pi \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + O(\epsilon^4) \;>\; 0.
   $$

   Flat Euclidean geometry $\Omega = 0$ is recovered only in the first-order tangent limit $\epsilon \to 0^+$ or on unnormalized affine vector spaces; zero, positive, and negative constant curvature form a clean `T3` geometric bifurcation.
:::

---

## E.5 Clause-by-Clause Bridging and Countermodel Audit of the Five Quantum Postulates (Paired with Corollary [@cor-ch32-quantum-postulates-core]) {#sec-appe-quantum}

The fourth deduction chain stress-tests all **five Dirac–von Neumann textbook postulates**, pinpointing why single-qubit ($d = 2$) probabilities, post-measurement updates, infinite-dimensional dynamics, and composite tensor spaces require explicit `T2` operational bridges:

$$
\text{Layer-1 CMP} \;\xrightarrow{\;\text{T1 + T3}\;}\; \mathcal{H} \;\xrightarrow{\;\text{full effect / }d\ge 3\text{ star-proj. additivity (T2)}\;}\; \operatorname{Tr}(\rho E) \;\xrightarrow{\;\text{repeatability + 2-sided inv. (T2)}\;}\; (P_k\rho P_k,\, U_t) \;\xrightarrow{\;\text{local tomog. (T2) + }S_N\text{ (T3)}\;}\; \mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2,\;\bigwedge^N\mathcal{H}.
$$

::: {.remark #rem-appe-quantum-chain title="Deduction Chain IV Audit: Clause-by-Clause Bridging of the Five Quantum Postulates, Effect Additivity, and Local Tomographic Minimality (LEAN ✓ and Literature)"}
**Bridge Conditions and Minimal Countermodels Across Postulates I–V.**

1. **Postulate I (Complex Hilbert State Space $\mathcal{H}$)**: Assembled from Layer-1 polarization, `T3` complex structure $J^2 = -I$, and `T1` Cauchy completion (omitting completion leaves countably infinite $\mathbb{Q}[i]^d$).
2. **Postulate II (Observables and Born's Rule $p(E) = \operatorname{Tr}(\rho E)$)**: On a single qubit ($d = 2$), orthogonal-projector additivity $f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) = 1$ **fails** to force Born's rule—beyond the discontinuous hemisphere indicator of [Chapter 2](ch02-born-rule.md) [@ex-qubit-busch-reconstruction], smooth nonlinear countermodels exist (see [@ex-appe-qubit-cubic-and-tomography] below)! Two kernel-verified finite-dimensional routes bridge this gap: the finite-dimensional effect route retains finite additivity across **all POVM effects $0 \le E \le I$ (`T2`)**, whereby Busch's theorem [`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation) ([@thm-busch-effect-density], `LEAN ✓`) uniquely locks $p(E) = \operatorname{Tr}(\rho E)$ for all $d \ge 2$; the finite-complex $d \ge 3$ projection route imposes nonnegativity, unit normalization, and binary orthogonal additivity across all star projections (`T2`, without replacing orthogonal-projection additivity by arbitrary matrix additivity), applying [Chapter 2](ch02-born-rule.md)'s verified finite-complex projection Gleason theorem [`gleason_representation`](lean:D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation) ([@thm-gleason-finite-projection], `LEAN ✓`) to obtain the unique density representation $p(P) = \operatorname{Re}\operatorname{Tr}(\rho P)$. Neither theorem derives the underlying inner-product structure or the assignment axioms directly from pairwise fairness alone; broader real-Hilbert-space and infinite-dimensional closed-subspace Gleason forms as well as countably additive infinite-dimensional Busch forms require separate declarations and extra hypotheses (Gleason 1957; Busch 2003, [@rem-gleason-literature], `Literature`). For the complementary geometric reconstruction of finite-dimensional state cones via exclusion-ball face polarity and spin factors, see [Appendix F](appendix-f.md).
3. **Postulate III (Post-Measurement Conditioning and Robertson–Schrödinger Uncertainty)**: Rank-one Born pairing weights are verified in [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) (`LEAN ✓`), and the commutator–anticommutator uncertainty bound in [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger) (`LEAN ✓`). However, single-shot Born statistics alone **do not** uniquely fix the state-update rule!
   - **Finite Non-Repeatable Reset-Instrument Countermodel (`manual derivation`)**: Compare the Lüders projection instrument $\mathcal{I}_k(\rho) = P_k \rho P_k$ against the reset instrument $\mathcal{J}_k(\rho) = \operatorname{Tr}(\rho P_k)\,|+\rangle\langle +|$ ($P_0 = |0\rangle\langle 0|,\; P_1 = |1\rangle\langle 1|,\; |+\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}$). Both yield **identical single-shot Born probabilities** $\operatorname{Tr}(\mathcal{J}_k(\rho)) = \operatorname{Tr}(\rho P_k)$, yet for any input state with $\operatorname{Tr}(\rho P_0) > 0$ (so the conditional denominator $\operatorname{Tr}(\mathcal{J}_0(\rho)) = \operatorname{Tr}(\rho P_0) > 0$ is nonzero and well-defined), two consecutive $Z$ measurements see $\mathcal{J}_0$ flip an observed $0$ into $1$ with probability

     $$
     P_{\mathcal{J}}(1 \text{ after } 0) \;=\; \frac{\operatorname{Tr}\bigl(P_1 \mathcal{J}_0(\rho)\bigr)}{\operatorname{Tr}\bigl(\mathcal{J}_0(\rho)\bigr)} \;=\; |\langle 1 | +\rangle|^2 \;=\; \frac{1}{2} \;\neq\; 0 \;=\; P_{\mathcal{I}}(1 \text{ after } 0)!
     $$

     Hence **repeatability ($\mathcal{I}_k$ idempotence) and minimal disturbance on compatible observables (`T2`)** are required to single out Lüders projection (for the boundary between ensemble Born weights, non-selective Lüders pinching, and single-outcome realization alongside physical causal intervention versus passive basis rotation, see [Chapter 34 §34.20](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–[§34.21](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy) and [@prob-ch34-single-outcome-realization]).
4. **Postulate IV (Unitary Evolution, Ray-Phase Rigidity, and Stone's Hamiltonian Generator)**: On finite-dimensional $\mathbb{C}^d$, every inner-product-preserving linear map $V^\dagger V = I_d$ is automatically unitary, and [`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests) (`LEAN ✓`) proves that **once a finite-dimensional unitary $A \in U(\iota, \mathbb{C})$** (`[Fintype ι] [DecidableEq ι]`) preserves all coordinate rays and a support-connected test-ray family, global phase rigidity forces $A = cI$ (whereas recovering unitarity or anti-unitarity from pure nonlinear transition probabilities $|\langle\psi\mid\phi\rangle|^2$ without presupposing linearity invokes Wigner's 1931 theorem, `Literature`). On **countably infinite-dimensional** $\ell^2(\mathbb{N})$, moreover, the unilateral shift $S|n\rangle = |n + 1\rangle$ preserves all pairwise comparisons $\langle S\psi, S\phi\rangle = \langle\psi, \phi\rangle$ ($S^\dagger S = I$) while missing $|0\rangle$ ($S S^\dagger = I - |0\rangle\langle 0| \neq I$, non-unitary!). Infinite-dimensional dynamics therefore requires **two-sided reversibility / surjectivity (`T2`)**, combined with strong time-continuity (Stone's theorem 1932, `Literature`, ruling out discontinuous Hamel-basis automorphisms) and **selection of a specific self-adjoint Hamiltonian $H$** (`T4` dynamical input) to yield $U(t) = e^{-itH/\hbar}$.
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

## E.6 Spacetime Null Cones, Endogenous vs. External Gauge Holonomy, Discrete Path Products & Stationary Action, Decoherence Thermodynamics, and Paid Comparison (Paired with Corollaries [@cor-ch32-minkowski-holonomy-and-second-law] and [@cor-ch32-bargmann-holonomy-and-path-product]) {#sec-appe-spacetime}

The fifth audit group covers both Corollary [@cor-ch32-minkowski-holonomy-and-second-law] and the sixth Corollary [@cor-ch32-bargmann-holonomy-and-path-product]: separating endogenous Layer-1 projective Berry holonomy from Layer-2 spacetime gauge bundles, tracing the four-rung conditional ladder from discrete Bargmann chains to stationary action $\delta S = 0$, and locking the thermodynamic arrow of time and complexity boundaries:

$$
\text{Lorentz split (T3)} \;\xrightarrow{\;\text{null rigidity}\;}\; c\,\eta_{\mu\nu}, \quad P(\mathbf{n})\text{ Berry }\mathrm{U}(1)\text{ (Layer 1)} \;\neq\; \{\mathcal{H}_x, U_{xy}\}_{\text{Layer 2}}, \quad \operatorname{Tr}(R_0\cdots R_n) \;\xrightarrow{\;H\text{ (H6) + measure (H9) + stat. phase}\;}\; \delta S = 0.
$$

::: {.remark #rem-appe-spacetime-chain title="Deduction Chains V–VI Joint Audit: Minkowski Null Cone, Endogenous Berry Holonomy vs. Spacetime Gauge Bundles, Stationary-Action Ladder, Unital Pinching Entropy, and Paid-Comparison Boundaries (LEAN ✓, Manual Countermodels, and OPEN Frontier)"}
**Exact Bridge Conditions and Minimal Countermodels Across Five Physical and Computational Corollaries.**

1. **Euclidean Rotation and $\mathcal{Cl}_{3,0}$ Pseudoscalar Sign vs. Minkowski Hyperbolic Null-Cone Rigidity (`T3` + `LEAN ✓`)**:
   Compact Euclidean signature $t^2 + \|\mathbf{x}\|^2$ admits no causal light cone; although volume closure in $\mathcal{Cl}_{3,0}(\mathbb{R})$ yields the endogenous algebraic minus sign $\mathbf{I}_3^2 = -1$ and paravector determinant $c^2 dt^2 - d\mathbf{x}^2$ ([Chapter 34 §34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave), `MODEL` + `manual derivation`), promoting that algebraic quadratic form to a globally hyperbolic $(1, d)$ spacetime PDE causal cone still requires the explicit `T3` Lorentzian cone selection, whereupon [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null) (`LEAN ✓`) proves that any real quadratic form vanishing on $t^2 - \|\mathbf{x}\|^2 = 0$ is globally a scalar multiple of the Minkowski metric.
2. **Raw Clifford Single-Fiber Flatness vs. Endogenous Layer-1 Berry Holonomy vs. Layer-2 Spacetime Gauge Bundles (Layer 1 vs. `T2` Layer 2 + `LEAN ✓`)**:
   - **Flatness of Raw Unprojected Clifford Vector Multiplication (`manual derivation`)**: Within one fixed global Clifford algebra $\mathcal{Cl}(V, q_+)$, taking edge transport to be **raw unprojected unit-vector multiplication** $\mathrm{CMP}_{\mathrm{glob}}(a, b) = a b$ ($a^2 = b^2 = c^2 = \mathbf{1}$) collapses around every $3$-vertex loop via

     $$
     \mathrm{CMP}_{\mathrm{glob}}(a, b)\,\mathrm{CMP}_{\mathrm{glob}}(b, c)\,\mathrm{CMP}_{\mathrm{glob}}(c, a) \;=\; (ab)(bc)(ca) \;=\; a(b^2)(c^2)a \;=\; a^2 \;=\; \mathbf{1},
     $$

     leaving raw vector edge products identically flat.
   - **Endogenous Layer-1 Rank-One Projective $\mathrm{U}(1)$ Berry–Hopf Holonomy (`LEAN ✓` + `Literature`)**: By contrast, once states on the same single fiber are represented by rank-one pure-state projectors $P(\mathbf{n}) = \frac{1}{2}(I_2 + \mathbf{n}\cdot\boldsymbol{\sigma})$ ($\|\mathbf{n}\|=1$), the frozen theorems [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) and [`explicit_qubit_orientation`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation) ([@cor-ch32-bargmann-holonomy-and-path-product], `LEAN ✓`) prove directly that the octant loop $\operatorname{Tr}\bigl(P(\mathbf{e}_3)P(\mathbf{e}_1)P(\pm\mathbf{e}_2)\bigr) = \frac{1 \pm i}{4} \notin \mathbb{R}$! On the Hopf bundle $S^1 \hookrightarrow S^3 \to S^2$, Layer-1 pure-state ray space $S^2 = \mathrm{SU}(2)/\mathrm{U}(1)$ already possesses nontrivial endogenous projective $\mathrm{U}(1)$ Pancharatnam–Berry curvature $\gamma_B \equiv -\frac{1}{2}\Omega = -\frac{3}{2}V_{\mathrm{sector}} \pmod{2\pi}$ ([Chapter 34 §34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral), `manual derivation` + `Literature`; extending to degenerate-subspace non-Abelian Wilczek–Zee $\mathrm{U}(k)$ holonomy in `Literature` and Cartan–CCWZ coset geometry in [Chapter 34 §34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers)).
   - **Layer-2 Spacetime-Indexed Site Fibers and Yang–Mills Dynamics (`LEAN ✓` + `OPEN`)**: Endogenous Berry curvature lives as fixed kinematic geometry over state space $S^2$, **not** as an independently varying spacetime gauge potential $A_\mu(x)$ over $M_4$. Spacetime gauge theory still ascends to Layer 2 (`H8`) by introducing **independent site fibers $\{\mathcal{H}_x\}$ and edge transport $U_{xy}$**: on a finite connected directed graph with spanning tree $T$ and nonempty anchor set $r \in R \subseteq V$ ($|V|=n, |E|=m, |R|=k$), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification) (`LEAN ✓`) proves that anchored gauge orbits are homeomorphic to $\operatorname{Fin}(m + k - n) \to \mathrm{Circle}$, classified by **$(m + 1 - n)$ fundamental chord-loop holonomies plus $(k - 1)$ relative root-to-anchor tree-path phases** (reducing to $m + 1 - n$ pure cycle holonomies when $k = 1$), while dynamical Yang–Mills field equations $D_\mu F^{\mu\nu} = J^\nu$ and the `3+1D` continuum mass gap—alongside massless spin-$2$ Einstein field equations and the ab initio origin of three fermion generations and continuous Standard Model couplings (see [Chapter 34 §34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition)–[§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary), [@prob-ch34-gravity-dynamics-and-coupling], and [@prob-ch34-sm-generations-and-couplings])—remain `H9` / `T4` `OPEN` problems.
3. **Discrete Bargmann Chains vs. Continuum Path Integrals and Stationary Action $\delta S = 0$ (`LEAN ✓` + `H6`/`H9` Countermodels + `Literature`)**:
   - **Single-Chain Identity and Two-Hamiltonian Finite Countermodel (`LEAN ✓` + `manual derivation`)**: [`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product) (`LEAN ✓`) gives the cyclic overlap invariant $\operatorname{Tr}(R_0 \cdots R_n) = \bigl(\prod_{j=0}^{n-1}\langle\Psi_j, \Psi_{j+1}\rangle\bigr)\langle\Psi_n, \Psi_0\rangle$ of a **single** discrete outer-product chain. Pure state-space overlaps alone cannot fix dynamical history weights: on the exact same qubit state space $\mathbb{C}^2$, choosing $H_0 = 0$ ($U_0(t) = I_2$) versus $H_1 = \hbar\omega\sigma_z$ ($U_1(t) = e^{-i\omega t\sigma_z}$) yields distinct return probabilities $|\langle + \mid U_0(t)\mid +\rangle|^2 = 1$ versus $|\langle + \mid U_1(t)\mid +\rangle|^2 = \cos^2(\omega t)$—refuting any claim of deriving propagator dynamics without `H6` Hamiltonian input.
   - **Continuum Measure Regularization (`H9`) and Asymptotic Stationary Phase $\delta S = 0$ (`Literature`)**: After inserting $I = \sum_\alpha P_\alpha$ under a chosen $H$, smooth Lie-group splitting obeys [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product) (`LEAN ✓`, $O(1/N)$ sagitta decay), whereas passing to continuous spin coherent-state or configuration-space functional integrals requires `H9` continuum measure/regularization input (Klauder 1979 coherent-state Wiener regularization, Wiener/Kac Euclidean measure, and Cameron's 1960 theorem ruling out bounded-variation complex measures for real-time oscillatory kernels; cf. [Chapter 34 §34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral) on smooth Trotter arcs vs. diffusive Feynman–Itô $\epsilon \sim 1/\sqrt{N}$ rough paths). Only in the short-wavelength / large-phase regime $\hbar \to 0^+$ does Cornu-spiral destructive interference select stationary action $\delta S = 0$ (`Literature`, NIST/Olver stationary phase; stationary points need not be global minima and receive $O(\hbar)$ corrections at finite scale).
4. **Isentropic Unitary & Active Reset Cooling vs. Unital Coarse-Grained Second Law (`T2` Layer 2 + `LEAN ✓`)**:
   - **Two Finite-Dimensional Countermodels (`manual derivation`)**: (i) Pure unitary evolution $\rho \mapsto U \rho U^\dagger$ preserves eigenvalues, giving $\Delta S_{\mathrm{vN}} = 0$ (no arrow of time); (ii) the non-unital active reset channel $T_{\mathrm{reset}}(\rho) = |0\rangle\langle 0|$ (dumping entropy into an untracked cold reservoir, $T_{\mathrm{reset}}(I_2) = 2|0\rangle\langle 0| \neq I_2$) strictly lowers local entropy on $\rho_* = \frac{1}{2}I_2$:

     $$
     \Delta S_{\mathrm{vN}}(\rho_*) \;=\; S_{\mathrm{vN}}\bigl(|0\rangle\langle 0|\bigr) - S_{\mathrm{vN}}\!\left(\tfrac{1}{2}I_2\right) \;=\; 0 - \log 2 \;=\; -\log 2 \;<\; 0!
     $$

   - **Layer-2 Unital Pinching Bridge (`LEAN ✓`)**: Monotonic entropy production requires **unital (doubly stochastic, reservoir-free) orthogonal-basis record pinching $\mathcal{E}_P(I) = I$** (`T2` Layer 2), under which [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) (`LEAN ✓`) proves the exact relative-entropy law $\Delta S_{\mathrm{vN}} = S(\mathcal{E}_P(\rho)) - S(\rho) = D(\rho \,\|\, \mathcal{E}_P(\rho)) \ge 0$ (for finite-window predictive sufficient-statistic distillation and the Past-Hypothesis / $\Lambda_{\mathrm{cos}}$ anti-circularity boundary governing a shared cosmic arrow of time, see [Chapter 34 §34.22](ch34-s22-memory-renormalization-and-learning.md#sec-ch34-memory-renormalization-and-learning)–[§34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor) and [@prob-ch34-past-hypothesis-and-cosmological-constant]).
5. **Reversible Paid Name Comparison, Stereographic Black-Box Relativization vs. Open Complexity Lower Bounds (`LEAN ✓` + `Literature` + `OPEN`)**:
   At the discrete computational bedrock, [`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run) (`LEAN ✓`) proves that for any binary words $a, b$, the reversible machine `compareMachine` halts within at most **$2(|a| + |b|) + 4$** steps ($4\ell + 4$ steps when $|a| = |b| = \ell$) while restoring $a$, $b$, and the context stack intact. Furthermore, [Chapter 38 §38.6–§38.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp) pairs North-Pole stereographic blind-spot duality $\Pi_N : S^D\setminus\{N\}\xrightarrow{\sim}\mathbb{R}^D$ with the Baker–Gill–Solovay relativization barrier (1975, `Literature`: there exist black-box language pairs $A, B$ with $\mathrm{P}^A = \mathrm{NP}^A$ and $\mathrm{P}^B \neq \mathrm{NP}^B$), explaining why relativizing black-box diagonalization cannot settle unrelativized $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$ ([@prob-ch38-unrelativized-p-vs-np-and-independence]), which remains strictly marked red `OPEN` (`T4` / `H9`).
:::

---

## E.7 Panoramic Audit and Further-Processing Table for the Nine Intermediate Hypotheses (H1–H9) {#sec-appe-audit-table}

The nine intermediate hypotheses (`H1`–`H9`) identified across the six formal corollaries ([@cor-ch32-extensionality-and-quotient]–[@cor-ch32-bargmann-holonomy-and-path-product]) and Sections E.1–E.6—together with their minimal countermodels (explicitly distinguishing finite from countably infinite models), four-way classification (`T1`–`T4`), further-processing mechanisms, and epistemic status—are consolidated in the canonical master ledger below (aligned 1-to-1 with [Section 32.3.4](ch32-s03-axioms-as-corollaries.md#sec-ch32-6-4) [@rem-ch32-comparison-axiom-literature]):

::: {.remark #rem-appe-master-audit-table title="Master Audit and Further-Processing Table for the Nine Intermediate Hypotheses (H1–H9) from Axiom of Comparison A₀ to Foundational Axiom Systems"}
**Master Epistemic Ledger (Consolidating Corollaries [@cor-ch32-extensionality-and-quotient]–[@cor-ch32-bargmann-holonomy-and-path-product] and Sections E.1–E.6).**

| ID & Intermediate Hypothesis | Target Deduction Chain | Minimal Countermodel When Omitted (Finite vs. Countably Infinite) | Class | Further-Processing Mechanism | Epistemic Basis |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **`H1` Comparison-kernel quotienting** (plus $\operatorname{char} \neq 2$ so $2 \in \mathcal{A}^\times$ is invertible) | Logic & extensionality ([@cor-ch32-extensionality-and-quotient]) | **Finite**: $+1 = -1$ over $\mathbb{F}_2$ collapses parity; $2$-point duplicate $\{a_1, a_2\}$ with $\mathrm{CMP} \equiv 1$ violates raw Leibniz identity | `T1` | Pass to the canonical quotient $X/{\sim_{\mathrm{CMP}}}$, turning extensionality into an exact quotient theorem | `LEAN ✓` ([`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition), [`future_word_orthogonal_residual`](lean:D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual)) |
| **`H2` Positive self-pairing, simple rank-$2$ elliptic square & $n$-point Gram PSD** (with spherical trihedron $\Delta\mathcal{T}_\epsilon$ curvature bifurcation) | Layer 0 $\to$ Layer 1 geometry & curvature trichotomy (Sections E.1, E.4; [@cor-ch32-parallelogram-quadratic-and-gram]) | **Finite**: $1$-point $\mathrm{CMP} = -1$; dual $1\pm\varepsilon$ & split-complex $\cosh\eta\pm j\sinh\eta$; $\mathcal{Cl}_{4,0}$ non-simple $e_1\wedge e_2 + e_3\wedge e_4$; $3\times 3$ real $\det S = -3 < 0$; flat affine $\Omega = 0$ vs. unit-sphere $\Omega(\epsilon) > 0$ | `T3` + Layer 1 | Declare positive-definite Clifford $2$-blade realization and oriented $D \ge 3$ spherical/tangent/hyperbolic constant-curvature branches | `LEAN ✓` ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)) + `manual derivation` ([@ex-appe-layer0-countermodels]) + `Literature` (Schoenberg) |
| **`H3` Parallelogram polarization & metric Cauchy completion** | Number fields & metric geometry ([@cor-ch32-successor-primes-and-zeckendorf], [@cor-ch32-parallelogram-quadratic-and-gram]) | **Finite-dim**: 2D $\ell^1_2$ gives $4 + 4 = 8 \neq 4$; **Countably infinite**: $\mathbb{Q}^2, \mathbb{Q}[i]$ miss Cauchy limits (every finite metric space is complete) | `T2` + `T1` | Recover inner products via parallelogram polarization, then apply canonical Cauchy completion to obtain $\mathbb{R}, \mathbb{C}, \mathcal{H}$ | `LEAN ✓` ([`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)) + `Literature` (Jordan–von Neumann) |
| **`H4` Inexhaustible orthogonal residual ($S_n^\perp \neq \bot$), even/complex carrier for $R^2=-I$ & Ostrowski valuation choice** | Arithmetic, complex structure & $p$-adic trees ([@cor-ch32-successor-primes-and-zeckendorf]) | **Finite**: $\mathbb{R}^n$ saturates after $n$ orthogonal steps; $\mathbb{Z}/N\mathbb{Z}$ loops $N \equiv 0$; odd real $\mathbb{R}^{2m+1}$ admits no global real $R^2 = -I$ (fixed-$D$ $\Pi_N:S^D\setminus\{N\}\xrightarrow{\sim}\mathbb{R}^D$ and 3D $K_N$ truss rigidity do not discharge $\dim\mathcal{H}=\infty$) | `T2/T4` + `T3` | Treat open Hilbert dimension $S_n^\perp \neq \bot$ as the source of succession and prime axes; unify $\mathbb{R}$ and $\mathbb{Q}_p$ via Ostrowski's dichotomy | `LEAN ✓` ([`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)) |
| **`H5` Finite-dimensional full POVM effect additivity or finite-complex $d \ge 3$ star-projection orthogonal additivity** (broader real/infinite-dim lattices require countable additivity) | Quantum Postulate II: Born rule ([@cor-ch32-quantum-postulates-core]) | **Finite-dim ($d = 2$)**: Discontinuous hemisphere indicator, plus smooth cubic $f(P_{\mathbf{r}})=\frac{1}{2}(1+r_z^3)$ giving $\frac{5}{4} \neq 1$ on the trine POVM | `T2` | Retain full finite effect additivity to lock $p(E)=\operatorname{Tr}(\rho E)$ across $d \ge 2$, or nonnegative normalized orthogonal additivity on all star projections to lock $p(P)=\operatorname{Re}\operatorname{Tr}(\rho P)$ in finite complex $d \ge 3$ (neither derives inner products or assignment axioms from pairwise fairness alone; exclusion-ball polarity & spin-factor state cones in [Appendix F](appendix-f.md)) | `LEAN ✓` ([`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation), [@thm-busch-effect-density]; [`gleason_representation`](lean:D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation), [@thm-gleason-finite-projection]) + `Literature` (broader real/infinite-dim Gleason & infinite-dim Busch) |
| **`H6` Repeatable minimal-disturbance conditioning, two-sided invertibility & strong continuity + specific Hamiltonian $H$** | Quantum Postulates III–IV & stationary-action dynamics ([@cor-ch32-quantum-postulates-core], [@cor-ch32-bargmann-holonomy-and-path-product]) | **Finite**: On $\operatorname{Tr}(\rho P_0)>0$, reset instrument $\mathcal{J}_k(\rho)=\operatorname{Tr}(\rho P_k)|+\rangle\langle+|$ gives $P(1\text{ after }0)=\frac{1}{2}$; $H_0=0$ vs. $H_1=\hbar\omega\sigma_z$ on $\mathbb{C}^2$ give distinct propagators; **Countably infinite-dim**: shift on $\ell^2(\mathbb{N})$ has $S^\dagger S = I \neq SS^\dagger$ | `T2` + `T4` | Single out Lüders projection via repeatable minimal disturbance; lock Schrödinger evolution and path dynamical phase via two-sided invertibility, strong continuity, and explicit $H$ (for single-outcome selection and causal intervention boundaries, see [§34.20](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–[§34.21](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy), [@prob-ch34-single-outcome-realization]) | `LEAN ✓` ([`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)) + `Literature` (Wigner, Stone) |
| **`H7` Complex local tomographic minimality & antisymmetric exchange representation** | Quantum Postulate V: Tensor product & Pauli exclusion ([@cor-ch32-quantum-postulates-core]) | **Finite**: Two-rebit hidden observable $W = J \otimes J$ ($\operatorname{Tr}(W(A_1\otimes A_2))=0$); dark sector $\oplus\mathcal{K}$; bosonic state $|\psi\rangle\otimes|\psi\rangle \neq 0$ | `T2` + `T3` | Lock $\mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2$ via dark-sector-free complex local tomography; classify $\mathrm{Sym}^N$ vs. $\bigwedge^N$ as $S_N$ sign branches | `manual derivation` ([@ex-appe-qubit-cubic-and-tomography]) + `Literature` (Hardy, CDP, Pauli 1940) |
| **`H8` Lorentzian causal-cone signature, spacetime-indexed fiber transport $U_{xy}$ (beyond endogenous Layer-1 Berry $\mathrm{U}(1)$ holonomy) & unital pinching** | Spacetime, endogenous vs. external gauge curvature & second law ([@cor-ch32-minkowski-holonomy-and-second-law], [@cor-ch32-bargmann-holonomy-and-path-product]) | **Finite**: Euclidean sphere has no light cone; raw Clifford vector $(ab)(bc)(ca)=\mathbf{1}$ is flat (contrasting endogenous Layer-1 projected loop $\frac{1\pm i}{4}$, still distinct from spacetime $A_\mu(x)$); unitary $\Delta S_{\mathrm{vN}}=0$ & reset $T(\rho)=|0\rangle\langle 0|$ gives $\Delta S_{\mathrm{vN}}=-\log 2 < 0$ | `T3` + `T2` | Select $(1,d)$ null signature; distinguish endogenous Layer-1 Berry connection from Layer-2 spacetime gauge bundles $\{\mathcal{H}_x, U_{xy}\}$; derive $\Delta S_{\mathrm{vN}} \ge 0$ from unital pinching (for memory distillation, the Past Hypothesis, and orientation/sagitta signs, see [§34.22](ch34-s22-memory-renormalization-and-learning.md#sec-ch34-memory-renormalization-and-learning)–[§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition)) | `LEAN ✓` ([`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch), [`explicit_qubit_orientation`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)) + `Literature` (Bargmann, Simon, Berry, Wilczek–Zee, Yang–Mills) |
| **`H9` Higher ZFC set existence, continuum path-integral / `3+1D` interacting QFT functional measures & complexity lower bounds** | Transfinite set theory, conditional stationary action $\delta S=0$, continuum QFT & complexity ([@cor-ch32-extensionality-and-quotient], [@cor-ch32-minkowski-holonomy-and-second-law], [@cor-ch32-bargmann-holonomy-and-path-product]) | **Finite**: $V_5$ ($65{,}536$ sets) satisfies Extensionality/Empty/Foundation/Separation/Union while refuting Infinity and failing unrestricted Pairing/Power Set at $V_4 \in V_5$; **Countably infinite**: $V_\omega$ satisfies Pairing/Power Set/Replacement while refuting Infinity; black-box language pairs $A, B$ split relativized complexity | `T4` / `OPEN` | State higher set existence and continuum functional measures (underpinning conditional $\delta S=0$) explicitly as external inputs, keeping `3+1D` Yang–Mills mass gap, unrelativized $\mathrm{P}\stackrel{?}{=}\mathrm{NP}$, and the cosmological constant, spin-$2$ gravity, and Standard Model three-generation/coupling frontiers ([§34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor)–[§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary): [@prob-ch34-past-hypothesis-and-cosmological-constant], [@prob-ch34-gravity-dynamics-and-coupling], [@prob-ch34-sm-generations-and-couplings]) `OPEN` | `LEAN ✓` ([`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode), [`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product), [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product), [`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)) + `Literature` (Feynman, Klauder, Cameron, Baker–Gill–Solovay) + `OPEN` |
:::

Stepping back across the entire audit table ([@rem-appe-master-audit-table]), the exact mathematical content of "other axioms are conditional corollaries of the Axiom of Comparison $\mathcal{A}_0$" (`MODEL`) stands completely transparent: it **never** claims to conjure continuum functional measures or transfinite cardinals out of thin air without hypotheses. Rather, it demonstrates that once canonical quotienting and Cauchy completion (`T1`) are factored out and endogenous Layer-1 Berry geometry plus discrete path products are integrated, dozens of seemingly unrelated postulates scattered across textbooks of logic, arithmetic, geometry, quantum mechanics, analytical mechanics, and gauge thermodynamics grow along a single **two-slot comparison spine $\mathrm{CMP}$**—with physical and dynamical postulates reduced to concrete laboratory additivity, repeatability, tomographic, and Hamiltonian clauses (`T2` / `T4`), mathematical diversity organized into clean signature, valuation, curvature, and representation bifurcations (`T3`), and transfinite, continuum-QFT, or unresolved complexity frontiers demarcated by explicit countermodels (`T4` / `OPEN`).

---

## E.8 Third-Point Redundancy and Positivity of the Involution: Reducing `H2` and `H3` with the Arc-Body Calculus {#sec-appe-third-point-redundancy}

The table in E.7 records `H2` as three parallel Layer-1 conditions: positive self-pairing, the elliptic negative square of a rank-$2$ bivector, and Gram positive semidefiniteness for any number of points. `H3` then adds parallelogram polarization. This section goes through the same accounts with the chord–sagitta decomposition of [Chapter 34 §34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes). The outcome is that the four items are not independent. When the similarity readings are real scalars, the three items of `H2` follow from two more primitive conditions: **third-point redundancy** (comparing $x$ with $z$ is not changed by routing through a third point $y$) and **positivity of the involution** (the round trip of a nonzero difference is neither zero nor negative). The polarization item of `H3` follows from third-point redundancy together with one positive reading. E.8.5 adds a restatement of `H5` on a qubit: among probability rules that see only pairwise comparison, the Born rule is the one of minimal tomographic rank.

The boundary first. Both conditions are added on top of $\mathcal{A}_0$. What is proved here is "if they are added, then the rest follows"; nothing here claims they can be derived from Clauses I–III, and the countermodels of [@ex-appe-layer0-countermodels] show they cannot. The two theorem boxes of this section are frozen theorems. Every other derivation is marked `manual derivation`, and classical results that are quoted are marked `Literature`.

### E.8.1 One Pair: Chord and Sagitta Are Already Locked at Layer 0 {#sec-appe-chord-sagitta-layer0}

Take the comparison $u=\mathrm{CMP}(x,y)$ of one pair of objects. Clause II gives $u^*=\mathrm{CMP}(y,x)$, and Clause III holds for both ordered pairs $(x,y)$ and $(y,x)$, so $uu^*=u^*u=\mathbf{1}$. Following §34.30.1 we call $v:=\mathbf{1}-S$ the **sagitta** and $\Delta:=u-\mathbf{1}=A-v$ the **chord**.

::: {.remark #rem-appe-chord-sagitta-layer0 title="The Chord–Sagitta Lock of a Fair Comparison (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be a unital associative $*$-algebra in which $2$ is invertible, and let $u\in\mathcal{A}$ satisfy $uu^*=u^*u=\mathbf{1}$. Put $S=\frac12(u+u^*)$, $A=\frac12(u-u^*)$, $v=\mathbf{1}-S$, $\Delta=u-\mathbf{1}$. Then:

1. $SA=AS$;
2. $S^2-A^2=\mathbf{1}$;
3. $A^2=-v(2-v)$;
4. $\Delta^*\Delta=\Delta\Delta^*=2v$.

Derivation: $uu^*=(S+A)(S-A)=S^2-SA+AS-A^2$ and $u^*u=(S-A)(S+A)=S^2+SA-AS-A^2$ both equal $\mathbf{1}$. Subtracting gives $2(AS-SA)=0$, and $2$ is invertible, which is item 1; adding gives item 2. Item 3 is $A^2=S^2-\mathbf{1}=-(\mathbf{1}-S)(\mathbf{1}+S)$. Item 4 follows from $\Delta^*\Delta=u^*u-u^*-u+\mathbf{1}=2\cdot\mathbf{1}-2S$, and likewise on the other side.
:::

These four items are used in three places.

First, [@def-ch32-axiom-of-comparison] lists "$S$ and $A$ commute" as a special case after Clause III. Item 1 shows that it is not an extra condition: as soon as Clause III holds for both orders, the two channels commute and the Pythagorean fairness law $S^2-A^2=\mathbf{1}$ holds as well.

Second, the two identities $(1-v_\epsilon)^2+c_\epsilon^2=1$ and $\lvert\Delta_\epsilon\hat{\mathcal U}\rvert^2=2v_\epsilon$ of §34.30.1 are items 2 and 4 written for $A=c_\epsilon\hat{\mathbf B}$ with $\hat{\mathbf B}^2=-\mathbf{1}$. What holds at Layer 0 is $S^2-A^2=\mathbf{1}$ and $\Delta^*\Delta=2v$ themselves, and these do not depend on a trigonometric realization.

Third, at $v=\mathbf{1}$ (that is, $S=0$, a right-angle comparison) item 3 gives $A^2=-\mathbf{1}$. On complex matrices this is the frozen theorem [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary): the complex structure $R^2=-I$ needed in `H4` is the slice of the lock identity at sagitta equal to $1$.

Now the signature. Let $\mathcal{A}$ be a real algebra and let the similarity reading be a real scalar, $S=s\mathbf{1}$. Item 3 becomes $A^2=-v(2-v)\mathbf{1}$ with $v=1-s$, so the sign of $A^2$ is decided entirely by where the sagitta lies:

| Sagitta $v$ | $A^2$ | Type of $\mathbb{R}[A]$ when $A\neq0$ | Counterpart in [@ex-appe-layer0-countermodels] |
| :---: | :---: | :--- | :--- |
| $0<v<2$ | negative | complex numbers, elliptic | the rotations of Layer 1 |
| $v=0$ or $v=2$ | $0$ | dual numbers, parabolic | $1\pm\varepsilon$ of countermodel (b), with $v=0$ |
| $v<0$ or $v>2$ | positive | split-complex numbers, hyperbolic | $\cosh\eta\pm j\sinh\eta$ of countermodel (b), with $v=1-\cosh\eta<0$ |

::: {.remark #rem-appe-involution-positivity title="Positivity of the Involution Excludes the Parabolic and Hyperbolic Branches (Manual Derivation)"}
**Manual derivation.** Say that the involution of a real $*$-algebra $\mathcal{A}$ satisfies the **positivity condition** if

$$
a^*a=-t\,\mathbf{1},\quad t\ge0\qquad\Longrightarrow\qquad a=0 .
$$

Assume the positivity condition, and let $u$ satisfy $uu^*=u^*u=\mathbf{1}$ with $S=s\mathbf{1}$ ($s\in\mathbb{R}$) and $u\neq\pm\mathbf{1}$. Then $-1<s<1$ and

$$
u=\cos\theta\,\mathbf{1}+J\sin\theta,\qquad \theta=\arccos s\in(0,\pi),\qquad J=\frac{A}{\sin\theta},\qquad J^*=-J,\qquad J^2=-\mathbf{1}.
$$

Derivation: by item 4 of [@rem-appe-chord-sagitta-layer0], $\Delta^*\Delta=2(1-s)\mathbf{1}$. If $s\ge1$, take $t=2(s-1)$; the positivity condition gives $\Delta=0$, that is, $u=\mathbf{1}$. The same argument applied to $-u$ gives $u=-\mathbf{1}$ when $s\le-1$. In the remaining case $-1<s<1$, item 3 gives $A^2=-(1-s^2)\mathbf{1}$; divide by $\sin^2\theta=1-s^2$.

The positivity condition fails for the dual numbers ($\varepsilon^*\varepsilon=-\varepsilon^2=0$ although $\varepsilon\neq0$) and for the split-complex numbers ($j^*j=-j^2=-1$). It holds in every $C^*$-algebra, where $a^*a$ is a positive element and $\lVert a^*a\rVert=\lVert a\rVert^2$ (`Literature`), and in every $*$-algebra with a faithful positive functional $\varphi$: there $\varphi(a^*a)\ge0$ with equality only for $a=0$, so $a^*a=-t\mathbf{1}$ forces $t=0$ and $a=0$.
:::

So the item "elliptic negative square" of `H2` can be replaced by a sentence that speaks only of round trips: **where there is a difference, the round trip leaves a positive trace.** What it excludes is exactly the two branches of countermodel (b), and nothing else.

Those two branches are not pathological models. Regard the $2\times2$ complex matrices as a real algebra and take the classical adjugate $a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$ as the involution. Then $aa^\sharp=\det(a)\mathbf{1}$, the elements with $uu^\sharp=\mathbf{1}$ are exactly $\mathrm{SL}(2,\mathbb{C})$, the similarity part $S=\frac12\operatorname{tr}(u)\mathbf{1}$ of every such $u$ is automatically a central scalar, and the sagitta $v=1-\frac12\operatorname{tr}u$ is a complex number (`manual derivation`). The classical classification of Möbius transformations by their trace (`Literature`) reads as follows in terms of the sagitta: for $u\neq\pm\mathbf{1}$, the class is elliptic when $v\in(0,2)$, parabolic when $v\in\{0,2\}$, hyperbolic for every other real $v$, and loxodromic when $v\notin\mathbb{R}$. The generators of countermodel (b) all live here: $\varepsilon\mapsto\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $j\mapsto\operatorname{diag}(1,-1)$, and the elliptic generator $\mapsto\operatorname{diag}(i,-i)$. All three satisfy $g^\sharp=-g$, and their squares are $0$, $+\mathbf{1}$ and $-\mathbf{1}$. The frozen theorem [`elliptic_hyperbolic_reflection_trichotomy`](lean:D5/S3/Analytic/ReflectedSpectrum/EllipticHyperbolicReflectionTrichotomy.elliptic_hyperbolic_reflection_trichotomy) gives the traces, determinants and squares of the hyperbolic form $\operatorname{diag}(\delta,-\delta)$ and the elliptic form $\begin{pmatrix}0&-\gamma\\\gamma&0\end{pmatrix}$ among real $2\times2$ traceless generators; its middle case is the zero matrix, so the nonzero nilpotent parabolic generator is not covered by that theorem. This algebra carries no normalized functional with $\varphi(a^\sharp a)\ge0$ (for $a=\operatorname{diag}(1,-1)$ one has $a^\sharp a=-\mathbf{1}$), so the reading argument of E.8.3 does not apply to it.

$\mathrm{SL}(2,\mathbb{C})$ acts on Hermitian matrices $X=t\mathbf{1}+\mathbf{x}\cdot\boldsymbol\sigma$ by $X\mapsto uXu^\dagger$ and preserves $\det X=t^2-\lvert\mathbf{x}\rvert^2$; this is the spinor covering of the Lorentz group (`Literature`). The theorem [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), already cited in E.6, says that the null cone fixes the quadratic form up to one scalar. If fairness is also required for the Hermitian adjoint ($uu^\dagger=\mathbf{1}$), what remains is $\mathrm{SU}(2)$, which contains only elliptic classes. This gives one reading that covers both `H2` and `H8` (`MODEL`): **the parabolic and hyperbolic branches left open at Layer 0 are the null rotations and boosts of Lorentz transformations; choosing the elliptic signature and choosing the Lorentz signature are the two answers to one question, whether the involution of a single algebra is required to be positive.**

Applied to the difference part of a single comparison, the positivity condition has an equivalent form that speaks only of repeated comparison.

::: {.remark #rem-appe-bounded-recurrence title="The Operational Form of Positivity for a Single Comparison: Repeating It Does Not Amplify the Readings (Manual Derivation and Literature)"}
**Manual derivation.** Let $\mathcal{A}$ be a real $*$-algebra, that is, a unital associative algebra over the real numbers whose involution is $\mathbb{R}$-linear with $\mathbf{1}^*=\mathbf{1}$. Let $u$ satisfy $uu^*=u^*u=\mathbf{1}$, and let its similarity reading be a real scalar, $S=s\mathbf{1}$. From $u+u^*=2s\mathbf{1}$ and $uu^*=\mathbf{1}$ one gets $u^2=2su-\mathbf{1}$, hence $u^{n+1}=2su^n-u^{n-1}$, the three-term recurrence of the Chebyshev polynomials. Therefore, for all $n\ge0$,

$$
u^{n}=T_n(s)\,\mathbf{1}+U_{n-1}(s)\,A,\qquad u^{-n}=T_n(s)\,\mathbf{1}-U_{n-1}(s)\,A,
$$

where $T_n$ and $U_n$ are the Chebyshev polynomials of the first and second kind and $U_{-1}=0$. Performing the same comparison $n$ times turns the sagitta $v$ into $v_n=1-T_n(1-v)$.

Put any norm on $\operatorname{span}\{\mathbf{1},A\}$. The two-sided orbit $\{u^n\}_{n\in\mathbb{Z}}$ is bounded if and only if $-1\le s\le1$ and, when $s=\pm1$, $A=0$:

- $\lvert s\rvert<1$: with $s=\cos\theta$ one has $T_n(s)=\cos n\theta$ and $U_{n-1}(s)=\dfrac{\sin n\theta}{\sin\theta}$, so the orbit is bounded;
- $s=\pm1$: $u^n=(\pm1)^n(\mathbf{1}\pm nA)$, which is bounded only when $A=0$;
- $\lvert s\rvert>1$: with $\lvert s\rvert=\cosh\eta$ one has $\lvert T_n(s)\rvert=\cosh n\eta$, which is unbounded. Here $A^2=(s^2-1)\mathbf{1}\neq0$, and $A^*=-A$ shows that $A$ is not a real multiple of $\mathbf{1}$, so an unbounded coefficient of $\mathbf{1}$ makes the orbit unbounded.

On the other hand $A^*A=-A^2=(1-s^2)\mathbf{1}$. Apply the positivity condition of [@rem-appe-involution-positivity] to $a=A$: when $1-s^2\le0$ it forces $A=0$, and then $s^2=1$. This is again "$-1\le s\le1$, and $A=0$ when $s=\pm1$". So, for a comparison whose similarity reading is a real scalar, **the positivity condition holds for its difference part if and only if its integer powers are bounded**.

**Literature.** When several comparisons occur together, the finite-dimensional case has a statement in the same direction. Let $\mathcal{A}$ consist of linear operators on a finite-dimensional real or complex vector space, and let $\Gamma$ be a bounded group of elements with $gg^*=g^*g=\mathbf{1}$. Averaging over the closure of $\Gamma$ gives a $\Gamma$-invariant inner product, for which every element of $\Gamma$ is an isometry. Hence for $a$ in the real linear span of $\Gamma$, $a^*$ is the adjoint of $a$, $a^*a$ is a positive semidefinite operator, and the positivity condition holds on this span (unitarization of bounded groups, by the standard argument of averaging over a compact group).
:::

The three cases are the three rows of the table above. An elliptic comparison can be repeated any number of times and its similarity reading stays inside $[-1,1]$. The similarity reading of a parabolic comparison stays at $\pm1$ (alternating in sign when $v=2$) while its difference reading grows linearly with the number of repetitions. The readings of a hyperbolic comparison grow exponentially. For a single comparison the positivity condition can therefore be read as a requirement of no amplification: **repeating one comparison any number of times does not make the readings diverge.** In the Lorentz group, the linear and the exponential growth that it excludes are the null rotations and the boosts. The positivity condition is independent of Clause IV: take $X=\mathrm{SL}(2,\mathbb{C})$ and $\mathrm{CMP}(x,y)=x^\sharp y$; Clauses II, III and IV all hold, and the positivity condition fails.

Having no amplification in each comparison separately is still not enough for Gram positivity of several points. In $(M_2(\mathbb{R}),{}^\sharp)$ take $x_0=\mathbf{1}$, $x_1=\cos\theta\,\mathbf{1}+J\sin\theta$ and $x_2=\cos\theta\,\mathbf{1}-J'\sin\theta$, with $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, $J'=\begin{pmatrix}0&-2\\\frac12&0\end{pmatrix}$ and $\theta=\frac\pi4$, and put $\mathrm{CMP}(x,y)=x^\sharp y$. Clauses II, III and IV all hold, the similarity readings of the three comparisons are $\frac{\sqrt2}{2}$, $\frac{\sqrt2}{2}$ and $-\frac18$, all inside the elliptic interval, and the determinant of the table of readings is $-\frac{9}{64}$ (`manual derivation`). What several points need is that the whole group generated by the comparison values be bounded, which is the premise of the literature paragraph above; in this example the generated group is unbounded.

### E.8.2 Third-Point Redundancy: the Potential Representation and Its Stability {#sec-appe-gain-potential}

From here on we abbreviate $\mathrm{CMP}(x,y)$ as $c_{xy}$.

::: {.definition #def-appe-third-point-redundancy title="Clause IV: Third-Point Redundancy (Model of This Book)"}
Let the comparison map $\mathrm{CMP}:X\times X\to\mathcal{A}$ satisfy Clauses II and III of [@def-ch32-axiom-of-comparison]. It satisfies **third-point redundancy** (`MODEL`) if for all $x,y,z\in X$,

$$
c_{xy}\,c_{yz}=c_{xz}.
$$

Equivalently, the holonomy $h(x,y,z):=c_{xy}\,c_{yz}\,c_{zx}$ of every three-point loop equals $\mathbf{1}$. When only some pairs can be compared, regard the comparable pairs as the edges of a graph $G$ and require the identity only for triples that are pairwise comparable in $G$.
:::

The Clifford realization of Layer 1 satisfies Clause IV: the geometric product of unit vectors gives $xy\cdot yz=xz$. When [§32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) describes Layer 2 it already notes that the raw vector edge products are flat and carry no curvature; Clause IV turns that sentence into a condition. It points the same way as the starting point of the book: pairwise measurement needs no external third point, and now an internal third point is required to change nothing either.

The main consequence of Clause IV is that every object can be represented by a group element, and a comparison is the ratio of two representatives. On a finite set of points this is a frozen theorem, and it needs less than "all triples".

::: {.theorem #thm-appe-chordal-gain-potential title="Triangle-Compatible Group Gains on a Finite Chordal Graph Are Ratios of Vertex Potentials" lean="D5/S3/Combinatorics/Graph/Chordal/GainPotential.SimpleGraph.IsChordal.exists_gain_potential"}
Let $V$ be a finite vertex set, $H$ an arbitrary group, and $G$ a simple chordal graph on $V$, that is, every cycle of $G$ of length at least $4$ has a chord. Let $g:V\times V\to H$ satisfy:

1. for every edge $\{i,j\}$, $g(j,i)=g(i,j)^{-1}$;
2. for pairwise adjacent $i,j,k$, $g(i,j)\,g(j,k)=g(i,k)$.

Then there is a map $\varphi:V\to H$ such that for every edge $\{i,j\}$,

$$
g(i,j)=\varphi(i)^{-1}\varphi(j).
$$

The group $H$ need not be commutative and the graph $G$ need not be connected. The hypotheses do not constrain $g$ on the diagonal or on non-edges, and the conclusion does not concern those values.
:::

::: proof
Induct on the size of a vertex subset, putting the vertices back one at a time. Every nonempty induced subgraph of a chordal graph is chordal, so it contains a simplicial vertex $x$: its neighbours inside the subgraph are pairwise adjacent. Apply the induction hypothesis to the subset without $x$ to obtain a potential $\psi$. If $x$ has no neighbour in the subset, $\psi$ already works. Otherwise pick a neighbour $w$, set $\varphi(x)=\psi(w)\,g(x,w)^{-1}$ and keep $\psi$ on the other vertices. For another neighbour $j$ of $x$, simpliciality makes $w$ and $j$ adjacent, and triangle compatibility gives $g(x,j)=g(x,w)\,g(w,j)=g(x,w)\,\psi(w)^{-1}\psi(j)=\varphi(x)^{-1}\varphi(j)$; edges pointing into $x$ follow from item 1 by inversion. The argument uses only associativity and inverses and never commutes two group elements. The full proof is checked by the Lean kernel.
:::

Applied to comparisons: take $H$ to be the group of elements of $\mathcal{A}$ with $uu^*=u^*u=\mathbf{1}$. Clauses II and III give item 1, and Clause IV gives item 2. A complete graph is chordal, so Clause IV on a finite set of points yields $c_{xy}=\varphi_x^{-1}\varphi_y$. The extra strength of the theorem matters more for this book: **not every pair has to be comparable.** It is enough that the comparability relation forms a chordal graph and that every comparable triangle is flat. This is the same combinatorial condition under which [Chapter 29 §29.3](ch29-s03-timeless-gram-causality.md) completes local positive semidefinite blocks to a global positive semidefinite matrix ([@thm-ch29-chordal-psd-completion]). A condition of this kind cannot be dropped altogether: a four-cycle has no triangles, so item 2 says nothing, while the product around the cycle can take any value and a potential need not exist. Chordality is sufficient, not necessary: the wheel with a hub and a four-cycle rim is not chordal, yet triangle compatibility still yields a potential, namely $\varphi(i)=g(\text{hub},i)$ (`manual derivation`).

Real comparisons carry error. When the chain law holds only approximately, the potential representation holds approximately, with an explicit bound on the deviation.

::: {.theorem #thm-appe-chordal-gain-potential-stability title="Approximate Triangle Compatibility Gives an Approximate Vertex Potential" lean="D5/S3/Combinatorics/Graph/Chordal/GainPotentialStability.SimpleGraph.IsChordal.exists_approximate_gain_potential"}
Let $V$ be a finite vertex set and $G$ a simple chordal graph on $V$. Let the group $H$ carry a pseudometric $d$ for which left and right multiplication are isometries: $d(ax,ay)=d(x,y)=d(xa,ya)$ for all $a,x,y\in H$. Let $\varepsilon\ge0$ and let $g:V\times V\to H$ satisfy:

1. for every edge $\{i,j\}$, $g(j,i)=g(i,j)^{-1}$;
2. for pairwise adjacent $i,j,k$, $d\bigl(g(i,j)\,g(j,k),\,g(i,k)\bigr)\le\varepsilon$.

Then there is a map $\varphi:V\to H$ such that for every edge $\{i,j\}$,

$$
d\bigl(g(i,j),\,\varphi(i)^{-1}\varphi(j)\bigr)\le(\lvert V\rvert-2)\,\varepsilon,
$$

where $\lvert V\rvert-2$ is truncated subtraction of natural numbers and equals $0$ when $\lvert V\rvert\le2$.
:::

::: proof
The construction is that of [@thm-appe-chordal-gain-potential], with equalities replaced by distance estimates. When the simplicial vertex $x$ is put back, apply the triangle inequality for a neighbour $j$: the distance from $g(x,j)$ to $g(x,w)\,g(w,j)$ is at most $\varepsilon$, and left invariance turns the distance from $g(x,w)\,g(w,j)$ to $\varphi(x)^{-1}\varphi(j)=g(x,w)\,\psi(w)^{-1}\psi(j)$ into the distance from $g(w,j)$ to $\psi(w)^{-1}\psi(j)$, which the induction hypothesis controls. Each vertex that is put back with at least two neighbours therefore adds at most one $\varepsilon$, the first two vertices add none, and the total is $(\lvert V\rvert-2)\varepsilon$. Edges pointing into $x$ use that inversion is an isometry, which needs invariance under translations on both sides. The full proof is checked by the Lean kernel.
:::

The unitary group of a $C^*$-algebra with the operator-norm distance satisfies the isometry hypothesis, so a nearly flat comparison is close to a flat one, at a distance that grows linearly with the number of points.

::: {.remark #rem-appe-anchoring-consequences title="Five Consequences of the Anchored Representation (Manual Derivation)"}
**Manual derivation.** Let Clauses II, III and IV hold for all pairs and triples, and let $X$ be nonempty (possibly infinite).

1. **Positive self-pairing.** $c_{xx}=\mathbf{1}$. Clause IV with $y=z=x$ gives $c_{xx}^2=c_{xx}$, and Clause III gives $c_{xx}^2=\mathbf{1}$.
2. **Anchored representation.** Fix an anchor $o$ and put $g_x:=c_{ox}$. Then $g_xg_x^*=g_x^*g_x=\mathbf{1}$ and $c_{xy}=g_x^*g_y$, because $c_{xy}=c_{xo}\,c_{oy}$ and $c_{xo}=c_{ox}^*$.
3. **Uniqueness.** If also $c_{xy}=g_x'^*g_y'$, then $g'_xg_x^*$ does not depend on $x$: two representations differ by left multiplication with one fixed element.
4. **Extensional quotient.** The inseparability relation $x\sim_{\mathrm{CMP}}y$ of Clause I is equivalent to $g_x=g_y$, so $\widetilde X$ injects into the group of fair elements of $\mathcal{A}$.
5. **Endpoint formula.** For every sampled path, $c_{x_0x_1}c_{x_1x_2}\cdots c_{x_{N-1}x_N}=c_{x_0x_N}$.

For finite $X$, item 2 is the complete-graph case of [@thm-appe-chordal-gain-potential]; the direct construction given here also covers infinite $X$ and exhibits the potential explicitly.
:::

Item 1 excludes countermodel (a) of [@ex-appe-layer0-countermodels]: on a single point, $\mathrm{CMP}=-1$ has round trip $+1$ but violates $c\cdot c=c$. Under Clause IV, the "positive self-pairing" of `H2` is therefore no longer an independent calibration. Item 4 says that once an anchor is chosen, an object is the rotor that carries the anchor to it; objects and the operators acting on them are no longer two kinds of thing. Item 5 is the Newton–Leibniz formula for the path-ordered rotor product integral of §34.30.2: a flat comparison multiplied along any sampled path depends only on the two endpoints. This holds exactly at every finite aperture, with no refinement limit.

Chordality is one sufficient condition under which triangle compatibility is enough. The condition that is exactly enough can be stated directly.

::: {.remark #rem-appe-triangle-simple-connectivity title="When Triangle Compatibility Suffices: Comparable Triangles Fill Every Cycle (Manual Derivation and Literature)"}
**Manual derivation.** Let $G$ be a finite simple graph on a vertex set $V$, let $H$ be a group, and let $g$ be defined on ordered pairs of adjacent vertices, with $g(j,i)=g(i,j)^{-1}$ and with $g(i,j)\,g(j,k)=g(i,k)$ on every triangle of $G$. For a walk $w=(x_0,\dots,x_n)$ whose consecutive vertices are adjacent, put $\operatorname{hol}(w)=g(x_0,x_1)\cdots g(x_{n-1},x_n)$. Two rewritings are allowed: deleting or inserting a backtrack, $x,y,x\leftrightarrow x$; and replacing two edges of a triangle by the third, $x,y,z\leftrightarrow x,z$. Neither changes $\operatorname{hol}$. Say that $G$ is **filled by triangles** if every closed walk in $G$ can be rewritten to a single vertex by these two moves.

1. **Sufficiency.** If $G$ is filled by triangles, then every $g$ with the two properties above, over any group $H$, is a ratio of potentials. Choose a base point $o$ in each connected component and put $\varphi(x)=\operatorname{hol}(w)$ for any walk $w$ from $o$ to $x$. Two such walks, one followed by the reverse of the other, form a closed walk whose $\operatorname{hol}$ is $1$; by the inverse rule the $\operatorname{hol}$ of a reversed walk is the inverse of the original, so $\varphi$ does not depend on the walk. For adjacent $x,y$ this gives $\varphi(y)=\varphi(x)\,g(x,y)$, that is, $g(x,y)=\varphi(x)^{-1}\varphi(y)$.
2. **Necessity.** If some connected component of $G$ is not filled by triangles, there are a group $H$ and a $g$ with the two properties above that is not a ratio of potentials. Take $H$ to be the closed walks based at $o$ in that component modulo the two rewritings, with concatenation as product. Fix a spanning tree, let $\gamma_x$ be the tree walk from $o$ to $x$, and put $g(x,y)=[\gamma_x\,(x,y)\,\gamma_y^{-1}]$, with $g\equiv1$ on the other components. This $g$ satisfies the inverse rule and triangle compatibility, and every closed walk $w$ based at $o$ has $\operatorname{hol}(w)=[w]$. This $H$ is nontrivial: if a closed walk $w$ based at $x$ cannot be rewritten to a single vertex, then $\gamma_x\,w\,\gamma_x^{-1}$ is a closed walk based at $o$, and it can be rewritten to a single vertex if and only if $w$ can. A ratio of potentials would force $\operatorname{hol}$ to be $1$ on all closed walks, which contradicts the nontriviality of $H$.
3. **The deviation accumulates with filling area.** Let $H$ carry a pseudometric $d$ invariant under left and right translations, and let $g$ satisfy the inverse rule exactly and triangle compatibility only up to $\varepsilon$: on every triangle, $d\bigl(g(i,j)\,g(j,k),\,g(i,k)\bigr)\le\varepsilon$ (by two-sided invariance and the inverse rule, the six orderings of the three vertices give the same deviation). A closed walk that is rewritten to a single vertex with $A$ triangle moves, counting moves in both directions, satisfies $d(\operatorname{hol}(w),1)\le A\varepsilon$. Backtracks do not change $\operatorname{hol}$; each triangle move replaces a block $g(x,y)\,g(y,z)$ of the product by $g(x,z)$, or the reverse, and two-sided invariance bounds the deviation of that step by $\varepsilon$.

**Literature.** The group in item 2 is the edge-path group of the clique complex of $G$ (the simplices are the cliques of $G$), which is isomorphic to the fundamental group of the clique complex (Spanier, *Algebraic Topology*, 1966, Chapter 3). "Filled by triangles" therefore means that every connected component of the clique complex is simply connected. The clique complex of a connected chordal graph is contractible: the neighbours of a simplicial vertex span a simplex, deleting that vertex is a deformation retraction and keeps the graph connected, and one inducts along the elimination order. So [@thm-appe-chordal-gain-potential] is a special case of item 1.
:::

Two examples mark the boundary. The 4-cycle has no triangles; its group of closed walks is $\mathbb{Z}$, the $g$ of item 2 records one turn around the cycle as the generator, and every holonomy is allowed. Add a hub adjacent to all four vertices. The resulting wheel is not chordal, because the rim is still a chordless 4-cycle, yet it is filled by its four triangles, and triangle compatibility again gives a potential. For Clause IV, then, what matters is whether comparable triangles fill every cycle. Item 3 can be read alongside the finite-grid Stokes theorem of §34.30.3: the deviation of a holonomy is at most the number of triangle moves used in a filling times the deviation of a single triangle, and when the filling is a disc that number is the number of triangles in the disc.

### E.8.3 From the Potential Representation to Gram Positivity and Chord Distance {#sec-appe-gram-from-potential}

With $c_{xy}=g_x^*g_y$ in hand, Gram positive semidefiniteness for any number of points needs only a positive reading.

::: {.remark #rem-appe-gram-from-flatness title="The Similarity Table of a Flat Comparison Is Positive Semidefinite, and the Chord Distance Is a Hilbert Distance (Manual Derivation and Literature)"}
**Manual derivation.** Let Clauses II–IV hold and let $\varphi$ be a positive linear functional on $\mathcal{A}$ ($\varphi(a^*a)\ge0$) with $\varphi(\mathbf{1})=1$ that takes real values on self-adjoint elements (automatic for positive functionals on a complex $*$-algebra). For any finite family of points $x_1,\dots,x_m$:

1. The similarity table $G_{ij}=\varphi\bigl(S(x_i,x_j)\bigr)$ is a real symmetric positive semidefinite matrix with unit diagonal.
2. $d(x,y)^2:=2\,\varphi\bigl(v(x,y)\bigr)=\varphi(\Delta_{xy}^*\Delta_{xy})$ is the squared distance of two points in a Hilbert space, so $d$ satisfies the triangle inequality.
3. If all similarity readings are real scalars, $S(x_i,x_j)=s_{ij}\mathbf{1}$, no functional is needed: as soon as the positivity condition of [@rem-appe-involution-positivity] holds, the matrix $[s_{ij}]$ is positive semidefinite.

Derivation: for real coefficients $\alpha_i$ put $a=\sum_i\alpha_ig_i$. From $c_{x_ix_j}=g_i^*g_j$ and $A(x_i,x_j)=-A(x_j,x_i)$,

$$
a^*a=\sum_{i,j}\alpha_i\alpha_j\,c_{x_ix_j}=\sum_{i,j}\alpha_i\alpha_j\,S(x_i,x_j).
$$

Applying $\varphi$ gives $\alpha^{\mathsf T}G\alpha=\varphi(a^*a)\ge0$, which is item 1. In item 3, $a^*a=(\alpha^{\mathsf T}[s_{ij}]\alpha)\mathbf{1}$; if that number were negative, the positivity condition would force $a=0$ and hence $a^*a=0$, a contradiction. Item 2 uses $g_y-g_x=g_x\Delta_{xy}$: in the GNS representation $(\pi,\Omega)$ of $\varphi$, $\lVert\pi(g_y)\Omega-\pi(g_x)\Omega\rVert^2=\varphi(\Delta_{xy}^*g_x^*g_x\Delta_{xy})=\varphi(\Delta_{xy}^*\Delta_{xy})$, which equals $2\varphi(v)$ by item 4 of [@rem-appe-chord-sagitta-layer0].

**Converse (manual derivation).** Given unit vectors $x_1,\dots,x_m$ in a real inner product space, the Clifford comparison $c_{ij}=x_ix_j$ satisfies Clauses II–IV for the reversion involution, the scalar part is a positive functional, and the reading is $x_i\cdot x_j$. Hence a real symmetric matrix with unit diagonal is positive semidefinite if and only if it is the similarity table of some flat fair comparison under some positive functional.

**Counterparts in the frozen library.** Positive semidefiniteness of the complex Gram matrix of a family of vectors is [`gramPsd`](lean:D5/S3/Quantum/Measurement/AntidistinguishabilityGram.gramPsd). For a positive semidefinite matrix $A$, the squared distances $A_{ii}+A_{jj}-2A_{ij}$ form a conditionally negative definite kernel; see [`gram_distance_conditionally_negative`](lean:D5/S3/Weil/Probability/FiniteGaussianSchoenberg.gram_distance_conditionally_negative). The latter is one direction of Schoenberg's theorem (`Literature`) on finite point sets.
:::

Put together:

$$
\text{Clause IV}+\text{a positive functional}\;\Longrightarrow\;\text{positive self-pairing and a positive semidefinite table};\qquad \text{scalar similarity}+\text{Clause IV}+\text{positivity condition}\;\Longrightarrow\;\text{the three items of H2}.
$$

When the similarity readings are not real scalars, the elliptic item fails: in the $2\times2$ complex matrices with the Hermitian adjoint, a flat comparison built from $g=\operatorname{diag}(e^{i\alpha},e^{i\beta})$ satisfies Clauses II–IV and the positivity condition, yet $A^2$ is a diagonal matrix with two different negative entries and is not a multiple of $\mathbf{1}$ (`manual derivation`).

Along this route the "parallelogram polarization" of `H3` is a conclusion as well: the chord distance $d$ comes from the GNS inner product, and the parallelogram identity [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) of inner product spaces holds automatically. This does not remove an input; it changes its shape. The form $\varphi(a^*b)$ supplied by a positive functional is itself a positive semidefinite inner-product form, so "an inner product" has been replaced by "a positive reading". Cauchy completion is still handled as `T1` and is not affected.

Which condition each of the four countermodels violates can be settled one by one.

::: {.example #ex-appe-countermodel-attribution title="Attribution of the Four Layer-0 Countermodels and the Three-Point Holonomy of Countermodel (d) (Manual Derivation)"}
**Manual derivation.** For the four countermodels of [@ex-appe-layer0-countermodels]:

| Countermodel | Satisfies Clauses II and III | Condition violated |
| :--- | :---: | :--- |
| (a) single point with $\mathrm{CMP}(x_0,x_0)=-1$ | yes | Clause IV: $(-1)(-1)=1\neq-1$ |
| (b) dual numbers $1\pm\varepsilon$, split-complex numbers $\cosh\eta\pm j\sinh\eta$ | yes | positivity condition: $\varepsilon^*\varepsilon=0$, $j^*j=-1$ |
| (c) $B=e_1e_2+e_3e_4$ in $\mathcal{Cl}_{4,0}$ | $B$ is not the difference part of any fair element | the composite comparison $(\cos\frac\pi4+e_1e_2\sin\frac\pi4)(\cos\frac\pi4+e_3e_4\sin\frac\pi4)$ has difference part $\frac12B$, and its similarity part $\frac12(\mathbf{1}+e_1e_2e_3e_4)$ is not a real scalar |
| (d) the $3\times3$ similarity table with $\det S=-3$ | yes | Clause IV or the positivity condition; realizations with $A_{12}=0$ violate Clause IV |

Verification for countermodel (d). The similarity table $S_{01}=S_{02}=\frac{\sqrt3}{2}$, $S_{12}=-1$ with amplitudes $\lvert A_{01}\rvert=\lvert A_{02}\rvert=\frac12$, $\lvert A_{12}\rvert=0$ is realized by a comparison with values on the complex unit circle:

$$
c_{01}=c_{02}=e^{i\pi/6},\qquad c_{12}=-1,\qquad c_{ji}=\overline{c_{ij}},\qquad c_{ii}=1 .
$$

It satisfies Clauses II and III. Its three-point holonomy is

$$
h(0,1,2)=c_{01}\,c_{12}\,c_{20}=e^{i\pi/6}\cdot(-1)\cdot e^{-i\pi/6}=-1\neq1 ,
$$

which violates Clause IV. With $0$ as anchor, the chain defect is $c_{12}-c_{10}\,c_{02}=-1-1=-2$, of modulus $2$. In general, the similarity readings of (d) are real scalars and $\det S<0$, so by item 3 of [@rem-appe-gram-from-flatness] every realization of (d) violates Clause IV or the positivity condition.
:::

Countermodel (d) also provides a quantitative comparison. When Clause IV does not hold exactly, the negative eigenvalues of the Gram matrix are controlled by how far the three-point holonomies are from $\mathbf{1}$.

::: {.remark #rem-appe-near-flat-gram-bound title="A Nearly Flat Comparison Has a Nearly Positive Semidefinite Similarity Table (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be a $C^*$-algebra, $\varphi$ a state, and let the comparison satisfy Clauses II and III with $c_{xx}=\mathbf{1}$. For points $x_1,\dots,x_m$, fix one of them as the anchor $o$ and put

$$
\delta_o:=\max_{i,j}\,\lVert c_{x_ix_j}-c_{x_io}\,c_{ox_j}\rVert .
$$

Then the smallest eigenvalue of the similarity table $G_{ij}=\varphi\bigl(S(x_i,x_j)\bigr)$ satisfies

$$
\lambda_{\min}(G)\ge-(m-2)\,\delta_o .
$$

Derivation: put $g_i=c_{ox_i}$ and write $c_{x_ix_j}=g_i^*g_j+E_{ij}$. The matrix $[\operatorname{Re}\varphi(g_i^*g_j)]$ is positive semidefinite. The perturbation $F_{ij}=\operatorname{Re}\varphi(E_{ij})$ is real symmetric with $\lvert F_{ij}\rvert\le\delta_o$; its diagonal vanishes ($E_{ii}=c_{x_ix_i}-c_{x_io}c_{ox_i}=0$), and so do the row and column of the anchor. Each row therefore has at most $m-2$ nonzero entries, and by Gershgorin's theorem the eigenvalues of $F$ are bounded in absolute value by $(m-2)\delta_o$.

Because the diagonal is $1$ and $\lvert G_{ij}\rvert\le1$, the trivial lower bound is $-(m-2)$, so this bound carries information only when $\delta_o<1$. The anchor has to be one of the points; for an anchor outside the family the bound becomes $-(m-1)\delta_o$. For countermodel (d) of [@ex-appe-countermodel-attribution]: $m=3$, $\delta_o=2$, the lower bound $-2$ carries no information, and the actual smallest eigenvalue is $\frac{1-\sqrt7}{2}\approx-0.8229$.
:::

The factor $m-2$ here and the factor $\lvert V\rvert-2$ of [@thm-appe-chordal-gain-potential-stability] have different origins: in the theorem it counts the three-point defects accumulated along the elimination order, and here it counts the nonzero entries in each row of the perturbation matrix.

### E.8.4 Where Curvature Comes From {#sec-appe-curvature-from-half-comparison}

Clause IV makes every three-point holonomy equal to $\mathbf{1}$, yet spherical excess and the Berry phase do exist. There is no conflict: what is flat is the full comparison, and what is curved is its square root.

::: {.remark #rem-appe-half-comparison-holonomy title="The Full Comparison Is Flat; the Three-Point Holonomy of the Half Comparison Is the Girard Excess (Manual Derivation and Literature)"}
**Manual derivation.** For a fair element $u$ whose similarity reading is a real scalar $s>-1$, $u+u^*=2s\mathbf{1}$ gives $u^2=2su-\mathbf{1}$, hence $(\mathbf{1}+u)^2=2(1+s)\,u$. Put

$$
r(u):=\frac{\mathbf{1}+u}{\sqrt{2(1+s)}} .
$$

Then $r(u)$ is fair and $r(u)^2=u$; call it the **half comparison** of $u$. Its similarity reading satisfies $S(r)^2=\frac{1+s}{2}=1-\frac v2$.

In $\mathcal{Cl}_{3,0}$ take unit vectors $a,b,c$, no two of them antipodal, and write $r_{ab}=r(ab)$, $[a,b,c]=a\cdot(b\times c)$, $\mathbf{I}=e_1e_2e_3$. The full comparisons satisfy $ab\cdot bc\cdot ca=\mathbf{1}$, whereas

$$
r_{ab}\,r_{bc}\,r_{ca}=\frac{(1+a\cdot b+b\cdot c+c\cdot a)+[a,b,c]\,\mathbf{I}a}{\sqrt{2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a)}} .
$$

Derivation: $(\mathbf{1}+ab)(\mathbf{1}+bc)(\mathbf{1}+ca)=2+ab+ba+ca+ac+bc+a(bc)a$, using $ab\cdot bc=ac$, $bc\cdot ca=ba$, $ab\cdot ca=a(bc)a$ and $ab\cdot bc\cdot ca=\mathbf{1}$. The scalar part is $2(1+a\cdot b+b\cdot c+c\cdot a)$. The bivector part is $b\wedge c+a(b\wedge c)a$; with $b\wedge c=\mathbf{I}n$, $n=b\times c$, one has $a(\mathbf{I}n)a=\mathbf{I}\bigl(2(a\cdot n)a-n\bigr)$, and the two terms add up to $2[a,b,c]\,\mathbf{I}a$. The denominator is fixed by the fairness of $r$, which also gives the identity

$$
(1+a\cdot b+b\cdot c+c\cdot a)^2+[a,b,c]^2=2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a).
$$

**Literature.** The right-hand side above has the form $\cos\frac\Omega2+\sin\frac\Omega2\,\mathbf{I}a$, a rotor that fixes $a$, with $\frac\Omega2=\operatorname{atan2}\bigl([a,b,c],\,1+a\cdot b+b\cdot c+c\cdot a\bigr)$; when the denominator is positive this is $\tan\frac\Omega2=\dfrac{[a,b,c]}{1+a\cdot b+b\cdot c+c\cdot a}$. The absolute value $\lvert\Omega\rvert$ is the area of the spherical triangle $abc$, that is, its Girard excess, and the sign of $\Omega$ is the sign of $[a,b,c]$ (van Oosterom–Strackee 1983; Eriksson 1990).

**Correspondence with frozen theorems.** The two quantities in the numerator, $1+a\cdot b+b\cdot c+c\cdot a$ and $[a,b,c]$, are the real and imaginary parts of $4\operatorname{Tr}(P_aP_bP_c)$ in [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch). Combining the identity above with $\det G(a,b,c)=[a,b,c]^2$ gives

$$
\det G(a,b,c)=(2-v_{ab})(2-v_{bc})(2-v_{ca})\,(1-\cos\Omega),\qquad v_{xy}=1-x\cdot y ,
$$

where the expansion of $\det G$ is [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula).
:::

On the Bloch sphere $S(r)^2=1-\frac v2$ is $\cos^2\frac\theta2$: the squared similarity of the half comparison equals $1$ minus half the sagitta. This is the Born weight written in chord–sagitta terms; it does not replace the additivity premise of `H5`. The determinant formula says that the three-point Gram volume equals the product of the three complementary sagittas times the sagitta of the excess; the value $\det G=\sin^4\epsilon$ of the "two begets three" cell in [§32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison) is a special case. For `H8` this means that the projective holonomy native to Layer 1 needs no new input: it is what one gets under Clause IV by taking the square root of the full comparison. What still needs new Layer-2 input is a fibre connection that varies with the spacetime base point, together with its dynamics.

### E.8.5 The Born Weight: on a Qubit the Gap Can Be Restated as Minimal Tomographic Rank {#sec-appe-born-minimal-rank}

The gap in `H5` is widest on a qubit. For $d\ge3$, a bounded rule that depends only on pairwise comparison is already forced to be the Born rule by normalization on every orthonormal basis together with $f(1)=1$. For $d=2$ it reduces to antipodal normalization, which the cubic function of [@ex-appe-qubit-cubic-and-tomography] satisfies without being the Born rule. The input that is missing on a qubit can be restated, and the restatement uses the same kind of counting as `H7`.

::: {.remark #rem-appe-born-zonal-minimal-rank title="On a Qubit the Born Rule Is the Zonal Probability Rule of Minimal Tomographic Rank (Manual Derivation)"}
**Manual derivation.** On the Bloch sphere $S^2$ consider outcome probabilities that depend only on pairwise comparison: for a preparation $\mathbf{s}$ and an outcome $\mathbf{r}$ the probability is $p(\mathbf{r}\mid\mathbf{s})=f(\mathbf{s}\cdot\mathbf{r})$, with $f$ continuous on $[-1,1]$. Write $t=\mathbf{s}\cdot\mathbf{r}$; the sagitta of the pair is $v=1-t$. Assume

- **antipodal normalization**: $f(t)+f(-t)=1$;
- **certainty**: $f(1)=1$.

Expand $f$ in Legendre polynomials, $f=\sum_l c_lP_l$. Define the **tomographic rank** $K(f)$ as the dimension of the real linear span of the functions $\{\mathbf{r}\mapsto f(\mathbf{s}\cdot\mathbf{r})\}_{\mathbf{s}\in S^2}$, that is, the number of real parameters needed to predict all outcome probabilities of one preparation. Then

$$
K(f)=\sum_{l:\,c_l\neq0}(2l+1),
$$

and $K(f)=\infty$ when $f$ is not a polynomial. For polynomial $f$ the reason is the addition theorem for real spherical harmonics, $P_l(\mathbf{s}\cdot\mathbf{r})=\frac{4\pi}{2l+1}\sum_{m}Y_{lm}(\mathbf{s})\,Y_{lm}(\mathbf{r})$: each degree with $c_l\neq0$ contributes the $2l+1$ linearly independent functions $Y_{lm}(\mathbf{r})$, and the coefficient vectors $\bigl(Y_{lm}(\mathbf{s})\bigr)$ span the whole coefficient space as $\mathbf{s}$ varies. When $f$ is not a polynomial, infinitely many $c_l$ are nonzero; for each such $l$ the projection of $f(\mathbf{s}\cdot\,\cdot\,)$ onto the space of spherical harmonics of degree $l$ is $c_lP_l(\mathbf{s}\cdot\,\cdot\,)$ (the Funk–Hecke formula), and that space is irreducible under rotations, so the span projects onto all of it and has dimension at least $2l+1$. The addition theorem, the Funk–Hecke formula and the irreducibility of the spaces of spherical harmonics are standard facts (`Literature`).

Antipodal normalization forces $c_0=\frac12$ and makes the coefficients of all even degrees $l\ge2$ vanish. Certainty excludes $f\equiv\frac12$, so at least one odd degree occurs. Hence

$$
K(f)\ \ge\ 1+3=4,\qquad K(f)=4\iff f(t)=\frac{1+t}{2}=1-\frac v2 .
$$

The cubic rule $f(t)=\frac12(1+t^3)$ contains the degrees $l=0,1,3$ (since $t^3=\frac35P_1+\frac25P_3$), and its tomographic rank is $1+3+7=11$.

**No count is needed for $d\ge3$ (manual derivation).** On $\mathbb{CP}^{d-1}$ let $p=f\bigl(\lvert\langle x\mid y\rangle\rvert^2\bigr)$ with $f$ bounded, $f(1)=1$, and normalization on every orthonormal basis. The squared moduli of a unit vector in a basis can be any point of the probability simplex, so $\sum_if(t_i)=1$ for all $t_i\ge0$ with $\sum_it_i=1$. The point $(1,0,\dots,0)$ gives $f(0)=0$. For $d\ge3$, comparing $(t,s,1-t-s,0,\dots)$ with $(t+s,0,1-t-s,0,\dots)$ gives $f(t)+f(s)=f(t+s)$ for $t,s\ge0$ with $t+s\le1$; a bounded function that is additive in this sense is linear (a standard fact), so $f(t)=t$, and the tomographic rank $d^2$ is a conclusion and not an input. A nonnegative zonal rule, extended additively to all projections, is a special case of the frame functions treated by Gleason's theorem ([@thm-gleason-finite-projection]); the few lines above do not use that theorem. For $d=2$ the simplex is a single edge, the comparison cannot be made, and only antipodal normalization is left.

**Literature background.** Hardy's simplicity axiom (2001) requires the number of parameters $K$ of the state space to take the least value compatible with the other axioms, and $K=N^2$ is derived from it. Galley–Masanes (2017) relate alternatives to the Born rule to representations of the unitary group. The first is a precedent for conditions of the kind "minimal tomographic rank", and the second gives a related classification; the statement and derivation above are not taken from either paper.
:::

Under the premise that probability depends only on pairwise comparison, the input of `H5` therefore splits as follows. For $d\ge3$, boundedness, $f(1)=1$ and projective additivity are already enough. For $d=2$ one more input is needed: it can be the full effect additivity listed in E.7, or it can be a count, namely that all predictions for one preparation are fixed by $4$ real numbers and no fewer will do. The number $4$ is the $\dim_{\mathbb{R}}\operatorname{Herm}(2)$ used by the local-tomography count of `H7`, and it is also the dimension occupied by the Gram embedding of [@rem-appe-gram-from-flatness] (the three coordinates of the Bloch vector) together with normalization: probability is affine in the sagitta exactly when it is an affine function of the embedding coordinates. This only changes the shape of the input. Minimal tomographic rank is still a `T2` operational assumption, and pairwise fairness does not imply it. Discontinuous rules, and rules that depend on more than pairwise comparison, are outside this remark.

### E.8.6 What Changes in the Ledger {#sec-appe-reduced-ledger}

::: {.remark #rem-appe-reduced-ledger title="The Ledger after Adding Clause IV and the Positivity Condition (Supplement to [@rem-appe-master-audit-table])"}
**Supplementary audit (`MODEL` + `manual derivation`; the theorem boxes correspond to frozen theorems).** The table lists only the entries that change. For `H1`, `H4`, `H6`, `H7` and `H9` the processing mechanism is that of [@rem-appe-master-audit-table].

| Entry | Original treatment | After adding the two conditions | Basis |
| :--- | :--- | :--- | :--- |
| `H2` positive self-pairing | explicit Layer-1 calibration | follows from Clause IV | [@rem-appe-anchoring-consequences], item 1 |
| `H2` elliptic negative square | `T3` bifurcation | follows from the positivity condition when the similarity readings are real scalars; in that case the positivity condition for the difference part of each comparison is equivalent to boundedness of its integer powers; fails otherwise | [@rem-appe-involution-positivity], [@rem-appe-bounded-recurrence] |
| `H2` Gram positivity for any number of points | explicit Layer-1 condition | follows from Clause IV plus a positive functional, with the converse; for scalar similarity it follows from Clause IV plus the positivity condition; an explicit lower bound away from flatness | [@thm-appe-chordal-gain-potential], [@rem-appe-gram-from-flatness], [@rem-appe-near-flat-gram-bound] |
| `H3` parallelogram polarization | `T2` condition | the chord distance comes from the GNS inner product of a positive functional, so the input "inner product" becomes "positive reading"; completion remains `T1` | [@rem-appe-gram-from-flatness], item 2 |
| `H5` Born weight | `T2` additivity condition | only for rules that depend on pairwise comparison alone: for $d\ge3$, boundedness, normalization on every orthonormal basis and $f(1)=1$ already give the Born rule; for $d=2$ and continuous rules, full effect additivity can be replaced by "antipodal normalization, $f(1)=1$ and minimal tomographic rank"; still a `T2` input | [@rem-appe-born-zonal-minimal-rank] |
| `H8` Lorentz signature | `T3` bifurcation | can be read as the same choice as the signature bifurcation of `H2` (`MODEL`) | end of E.8.1 |
| `H8` projective holonomy of Layer 1 | native to Layer 1 | closed form in $\mathcal{Cl}_{3,0}$ as the three-point holonomy of the half comparison | [@rem-appe-half-comparison-holonomy] |

The two new inputs are Clause IV ([@def-appe-third-point-redundancy]) and the positivity condition ([@rem-appe-involution-positivity]); when the similarity readings are not real scalars, positive semidefiniteness of the table needs a positive functional in addition. Clause IV need not hold for all triples: it is enough that comparable triangles fill every cycle, and over all groups this is exactly the condition that is enough ([@rem-appe-triangle-simple-connectivity]). Clause IV excludes every holonomy of full comparisons, so it describes the flat skeleton of Layer 1. A Layer-2 connection with genuine curvature has to give it up, and then [@thm-appe-chordal-gain-potential-stability] and [@rem-appe-near-flat-gram-bound] state the price of the deviation.
:::

This section does not bring the number of inputs down to zero. It changes their shape: when the similarity readings are real scalars, the three items of `H2` were three geometric statements about self-pairing, bivectors and Gram matrices, and they are now replaced by two conditions that can be stated with comparison alone. One says that a third party does not change the ratio of two. The other says that the round trip of a difference leaves a positive trace.
