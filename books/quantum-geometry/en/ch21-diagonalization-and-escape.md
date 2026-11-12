# Chapter 21 Spheres Beyond Spheres: Cantor Diagonalization, Gödel Escape, and Hairy-Ball Singularities

> *"Why is area existence? Because to express that existence, it must be inside another, larger existence. That is Gödel incompleteness: no one can obtain the entire sphere. Continue."*
>
> *"At the very moment we think we have obtained a sphere, we have in fact been enclosed inside a larger sphere."*

Across the first twenty chapters of this book, we climbed the dimensional ladder from points and lines to planes, spheres, multi-sphere entanglement, and holographic spacetime. At this vantage point, a classical metaphysical temptation naturally arises: since we now understand the geometric generators of spherical state spaces, can we not draw a single, all-encompassing "master sphere" that seals every definable concept, every decidable proposition, and every observable state inside one closed shell once and for all?

Part VI (*Crossing the Horizon — Spheres Beyond Spheres*) is devoted to shattering that idol of an omniscient closed sphere.

Recall the foundational geometric principle uncovered in the [Prelude](README.md) and [Chapter 3](ch03-projectors-and-duality.md): when you rotate an oriented two-dimensional area $\vv{e}_1 \wedge \vv{e}_2$ inside the equatorial plane $\operatorname{span}\{\vv{e}_1, \vv{e}_2\}$ and seek to name that area as a single one-dimensional "axis of existence" (a particle state or settled proposition), your vantage point cannot remain inside the two-dimensional sheet — for every vector inside the plane is coplanar with it and cannot serve as its normal. You condense a two-dimensional area into a one-dimensional normal arrow $\vv{e}_3 = \star_3(\vv{e}_1 \wedge \vv{e}_2)$ only because you already stand inside an **oriented three-dimensional ambient space** $\mathbb{R}^3$! By the exact same exterior-algebraic law, within oriented $\mathbb{R}^3$ alone, the Hodge dual of the top-degree volume element $I_3 = \vv{e}_1 \wedge \vv{e}_2 \wedge \vv{e}_3$ is merely a zero-degree scalar $\star_3 I_3 = 1$; to name the entire three-dimensional system itself as a new orthogonal normal axis $\vv{e}_4 = \star_4 I_3$, mathematics compels you to step into a **four-dimensional ambient space** $\mathbb{R}^4 = \mathbb{R}^3 \oplus \mathbb{R}\vv{e}_4$, turning the original two-sphere $S^2$ into the equatorial slice of a larger three-sphere $S^3$!

In this chapter we will see how this law — *to express the totality of a system as an entity, one must inhabit a larger ambient space* — reaches beyond a differential-geometric metaphor. At the foundation of set theory and observation topology, its abstract skeleton is captured by the **relative semantic diagonal and observation-topology refinement quartet** (`DiagonalTopologicalEscape`), verified here by the Lean 4 kernel, and compared with classical metamathematical diagonal theorems in [@rem-godel-tarski-comparison-literature]. Whenever a complete decoder catalog over a nonempty address space attempts to exhaust all output maps within the fiber partition of a fixed latent coordinate, any fixed-point-free twist operator immediately rips across the old observation topology along the relative semantic diagonal, forcing the concept readout to refine strictly into a "sphere beyond spheres."

::: {.figure src="ch21-overview"}
**Figure 21.** The chapter at a glance. Panel I: the two fibers of the latent coordinate; the dashed magenta line splits the left one into $a_0, a_1$ with $g = 1$ and $a_2$ with $g = 0$ ([@ex-cantor-godel-diagonal-table]). Panel II: a magenta open helix climbs around the violet axis $\vv{e}_{n+1}$; its cyan shadow closes after one turn, while the helix already stands $2\pi c$ higher. Panel III: of $S^0$ through $S^8$ only the violet $S^0, S^1, S^3, S^7$ are parallelizable, and every tangent field on $S^2$ vanishes somewhere (literature result, not formalized in this book; see [@rem-hairy-ball-adams-literature]).
:::

## 21.1 Why Naming an Area Requires Standing Outside It: Concept Readouts and Partition Topologies {#sec-ch21-1}

Let us first translate "observing the world through a fixed coordinate shell" into the clean language of sets and general topology.

Let $X$ (denoted `Address` in the formal declarations) be the space of objects or statement addresses under examination, and let $B$ (`Coordinate`) be the **latent coordinate readout space** currently available to the observer. In the Lean module `ConceptFiberDecomposition`, a **concept readout** ([`Concept`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.Concept) $X\ B$) is simply a function $q_L : X \to B$. Fixing a concept ruler $q_L$ slices the entire address space $X$ into pairwise disjoint **concept fibers** ([`ConceptFiber`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.ConceptFiber) $q_L\ b = \{x \in X \mid q_L(x) = b\}$), inducing a canonical dependent-sum decomposition ([`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)):

$$
X \;\simeq\; \sum_{b : B} \operatorname{ConceptFiber}(q_L, b).
$$

Geometrically, picture $q_L : X \to B$ as an orthogonal projection from a higher-dimensional sphere onto a lower-dimensional equatorial slice: any two addresses $x, y \in X$ lying on the same vertical projection fiber $q_L^{-1}(b)$ share the exact same coordinate reading $q_L(x) = q_L(y) = b$. To an internal observer who can see only $B$, $x$ and $y$ are **topologically inseparable** twins hiding inside the same blind spot!

::: {.figure src="ch21-fibers"}
**A concept readout cuts the address space into fibers.** Above each cyan reading $b_i$ stands its fiber, holding every address that $q_L$ sends to $b_i$; in the light-cyan fiber, $x$ and $y$ satisfy $q_L(x) = q_L(y)$, and an observer who sees only $B$ cannot tell them apart.
:::

To formalize this internal resolution using general topology, equip the coordinate space $B$ with the finest possible topology — the **discrete topology** $\bot$ (in Mathlib's lattice convention on `TopologicalSpace`, $\bot$ is the discrete topology in which every subset is open, meaning coordinate values themselves are sharply distinguishable) — and pull $\bot$ back along $q_L : X \to B$ to obtain the **partition topology** ([`partitionTopology`](lean:D5/S3/ConceptDynamics/Epistemic/PartitionKnowledgeNegativeIntrospection.partitionTopology) $q_L = \operatorname{induced}(q_L, \bot)$) on $X$. In $\tau(q_L)$, a subset $U \subseteq X$ is open if and only if it is a union of complete $q_L$-fibers, $U = q_L^{-1}(S)$ ($S \subseteq B$). Consequently, two addresses $x, y \in X$ are topologically inseparable in $\tau(q_L)$ (written $\operatorname{Inseparable}_{\tau(q_L)}(x, y)$) if and only if they lie in the same fiber: $q_L(x) = q_L(y)$ ([`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)).

Now suppose the observer asks whether a target concept $q_T : X \to \mathrm{Output}$ can be contained entirely within the existing coordinate shell $q_L : X \to B$. In `ConceptJoinUniversal`, we say that $q_T$ **is refined by (factors through) $q_L$** ([`Refines`](lean:D5/S3/ConceptDynamics/ConceptJoinUniversal.Refines) $q_T\ q_L$, or equivalently [`TargetAdequate`](lean:D5/S3/ConceptDynamics/DefinitionEscape/LatentAdequacyCriterion.TargetAdequate) $q_L\ q_T$) if there exists a post-processing map $f : B \to \mathrm{Output}$ such that

$$
q_T = f \circ q_L \qquad (\forall x \in X,\; q_T(x) = f(q_L(x))).
$$

Assuming the address space $X$ is **nonempty** (`[Nonempty X]`), when can $q_T$ be factored through the coordinate shell $q_L$ in this way? If and only if $q_T$ is **continuous** as a map from the partition topology $(X, \tau(q_L))$ to the discrete output topology $(\mathrm{Output}, \bot)$ ([`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition), where `[Nonempty X]` provides a default witness in $X$ to define the post-processing map $f : B \to \mathrm{Output}$ on unhit coordinates $b \notin q_L(X)$)! Continuity demands that every point-preimage $q_T^{-1}(\{o\})$ be open in $\tau(q_L)$ — a union of whole $q_L$-fibers — so that $q_L(x) = q_L(y)$ always forces $q_T(x) = q_T(y)$. The instant a single old fiber is split in two by $q_T$ — two addresses coinciding on $q_L$ but disagreeing on $q_T$ — continuity shatters and a nonempty **topological separation deficit** emerges.

## 21.2 The Cantor–Gödel Relative Semantic Diagonal: A Formal Escape Quartet {#sec-ch21-2}

We are ready to assemble the relative semantic diagonal escape machine on arbitrary types `Address`, `Coordinate`, and `Output`.

Suppose a system erects an ostensibly all-inclusive **decoder catalog** (`decoderCatalog : Address → Coordinate → Output`): each address $a \in \mathrm{Address}$ is not merely an object under observation, but also indexes a candidate decoding rule $D_a : \mathrm{Coordinate} \to \mathrm{Output}$. What happens if this catalog is **complete** (`Function.Surjective decoderCatalog`, meaning every function $h : \mathrm{Coordinate} \to \mathrm{Output}$ appears as $D_{a_h}$ at some address $a_h \in \mathrm{Address}$), and the output space admits a **fixed-point-free twist** `twist : Output → Output` ($\forall o,\; \operatorname{twist}(o) \neq o$, such as Boolean negation $\neg : \{0, 1\} \to \{0, 1\}$, the Pauli-$X$ bit-flip restricted to the computational-basis bit labels $\{\lvert 0\rangle, \lvert 1\rangle\}$ — note that on the full Bloch sphere $S^2$ the continuous rotation $X$ fixes the $\pm x$ poles $\lvert \pm\rangle$, so one takes either discrete bit labels or global antipodal inversion $\vv{n} \mapsto -\vv{n}$)?

We simply instruct each address $a$ to feed **its own latent coordinate** $q_L(a)$ into **its own cataloged decoder** $D_a$, and then apply the fixed-point-free `twist`!

::: {.definition #def-relative-semantic-diagonal title="Relative Semantic Diagonal" lean="D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relativeSemanticDiagonal"}
Let `Address`, `Coordinate`, and `Output` be arbitrary types, let $\operatorname{twist} : \mathrm{Output} \to \mathrm{Output}$ be an output transformation, let $\operatorname{latent} : \operatorname{Concept}\ \mathrm{Address}\ \mathrm{Coordinate}$ be a latent concept readout, and let $\operatorname{decoderCatalog} : \mathrm{Address} \to \mathrm{Coordinate} \to \mathrm{Output}$ be a decoder catalog. The **relative semantic diagonal** (`relativeSemanticDiagonal twist latent decoderCatalog` in Lean) is the target concept readout $g : \operatorname{Concept}\ \mathrm{Address}\ \mathrm{Output}$ defined by

$$
g(a) \;:=\; \operatorname{twist}\bigl(\operatorname{decoderCatalog}(a, \operatorname{latent}(a))\bigr) \qquad (a \in \mathrm{Address}).
$$
:::

To measure how this diagonal $g$ tears across the latent partition topology $\tau(\operatorname{latent})$, we also record the formal definition of the topological separation deficit.

::: {.definition #def-separation-deficit title="Topological Separation Deficit" lean="D5/S3/ConceptDynamics/ObservationTopology/ResidualSeparationTopology.separationDeficit"}
Let `X`, `Current`, and `Target` be arbitrary types, with current concept readout $\operatorname{current} : \operatorname{Concept}\ X\ \mathrm{Current}$ and target concept readout $\operatorname{target} : \operatorname{Concept}\ X\ \mathrm{Target}$. The **topological separation deficit** of $\operatorname{current}$ relative to $\operatorname{target}$ (`separationDeficit current target` in Lean) is the subset of address pairs in $X \times X$:

$$
\begin{aligned}
\operatorname{separationDeficit}(\operatorname{current}, \operatorname{target})
\;:=\; \bigl\{\, (x, y) \in X \times X \;\big|\; &\operatorname{Inseparable}_{\tau(\operatorname{current})}(x, y) \\
&\land\; \neg\operatorname{Inseparable}_{\tau(\operatorname{target})}(x, y) \,\bigr\}.
\end{aligned}
$$
:::

Notice the trap sprung by [@def-relative-semantic-diagonal] and [@def-separation-deficit]: at every address $a \in \mathrm{Address}$, because $\operatorname{twist}$ has no fixed points, $g(a) \neq \operatorname{decoderCatalog}(a, \operatorname{latent}(a))$ ([`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)) — at its own address $a$, the diagonal $g$ always disagrees with the $a$-th cataloged decoder!

::: {.viz src="sphere-escape" preset="diagonal" height="500"}
**The diagonal leaves the list.** Read the diagonal bit of each row and flip it to build the magenta $d$; $d$ differs from row $k$ in place $k$, so it is not on the list ([`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode) with $\operatorname{latent} = \mathrm{id}$ and $\operatorname{twist} = \neg$). The dot grid on the right holds all $2^N$ strings, and the candidates compatible with $d$ halve at every step.
:::

In the Lean module `DiagonalTopologicalEscape`, this mechanism yields four kernel-verified theorems proving that no complete internal catalog can contain its own diagonal without refining its observation topology.

::: {.theorem #thm-complete-diagonal-not-continuous title="Discontinuity of the Complete-Catalog Relative Semantic Diagonal" lean="D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_not_continuous"}
Let `Address`, `Coordinate`, and `Output` be types with `Address` nonempty (`[Nonempty Address]`). Given $\operatorname{twist} : \mathrm{Output} \to \mathrm{Output}$, $\operatorname{latent} : \operatorname{Concept}\ \mathrm{Address}\ \mathrm{Coordinate}$, and $\operatorname{decoderCatalog} : \mathrm{Address} \to \mathrm{Coordinate} \to \mathrm{Output}$, suppose:

1. **Fixed-point-free twist**: for every $o \in \mathrm{Output}$, $\operatorname{twist}(o) \neq o$;
2. **Complete (surjective) catalog**: $\operatorname{decoderCatalog}$ is surjective (`Function.Surjective decoderCatalog`).

Then the relative semantic diagonal $g = \operatorname{relativeSemanticDiagonal}(\operatorname{twist}, \operatorname{latent}, \operatorname{decoderCatalog})$ of [@def-relative-semantic-diagonal] is **not continuous** from the latent partition topology $\operatorname{partitionTopology}(\operatorname{latent})$ to the discrete output topology $\bot$:

$$
\neg\,\operatorname{Continuous}_{\tau(\operatorname{latent}) \to \bot}(g).
$$
:::

::: proof
Suppose toward a contradiction that $g$ is continuous from $\tau(\operatorname{latent})$ to $\bot$. By the factorization-continuity equivalence [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition), continuity implies $\operatorname{Refines}(g, \operatorname{latent})$, meaning there exists a coordinate decoder $h : \mathrm{Coordinate} \to \mathrm{Output}$ such that $g(a) = h(\operatorname{latent}(a))$ for all $a \in \mathrm{Address}$. Because $\operatorname{decoderCatalog}$ is surjective, there exists an address $a_0 \in \mathrm{Address}$ with $\operatorname{decoderCatalog}(a_0) = h$. Evaluating at $a_0$ gives $g(a_0) = h(\operatorname{latent}(a_0)) = \operatorname{decoderCatalog}(a_0, \operatorname{latent}(a_0))$ on the one hand, and $g(a_0) = \operatorname{twist}(\operatorname{decoderCatalog}(a_0, \operatorname{latent}(a_0)))$ by definition of $g$ on the other. Setting $o_0 = \operatorname{decoderCatalog}(a_0, \operatorname{latent}(a_0))$ yields $\operatorname{twist}(o_0) = o_0$, contradicting `fixedPointFree` (encapsulated in Lean as [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)). The full proof is checked by the Lean kernel.
:::

[@thm-complete-diagonal-not-continuous] establishes a sharp topological trade-off: **catalog completeness and internal continuity cannot coexist.** As soon as the decoder catalog is expressive enough to cover all functions on the latent coordinates, the diagonal target $g$ necessarily rips across the latent partition topology, leaving behind a concrete, nonempty separation deficit.

::: {.lemma #lem-complete-diagonal-separation-deficit title="Nonempty Separation Deficit of the Complete Relative Diagonal" lean="D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty"}
Under the exact hypotheses of [@thm-complete-diagonal-not-continuous] (`Address` nonempty, $\operatorname{twist}$ fixed-point-free, and $\operatorname{decoderCatalog}$ surjective), the topological separation deficit of $\operatorname{latent}$ relative to $g = \operatorname{relativeSemanticDiagonal}(\operatorname{twist}, \operatorname{latent}, \operatorname{decoderCatalog})$ is nonempty:

$$
\bigl(\operatorname{separationDeficit}(\operatorname{latent},\; g)\bigr).\mathrm{Nonempty}.
$$
:::

::: proof
By [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective), the hypotheses imply $\neg\operatorname{Refines}(g, \operatorname{latent})$. By the target recovery criterion [`target_recovery_criterion`](lean:D5/S3/ConceptDynamics/Restoration/TargetRecoveryCriterion.target_recovery_criterion), failure of factorization is equivalent to nonemptiness of the kernel defect relation $\operatorname{defectRelation}(\operatorname{latent}, g) = \{(a_1, a_2) \mid \operatorname{latent}(a_1) = \operatorname{latent}(a_2) \land g(a_1) \neq g(a_2)\}$. Rewriting along the identity [`defectRelation_eq_separationDeficit`](lean:D5/S3/ConceptDynamics/ObservationTopology/ResidualSeparationTopology.defectRelation_eq_separationDeficit) yields nonemptiness of $\operatorname{separationDeficit}(\operatorname{latent}, g)$. The full proof is checked by the Lean kernel.
:::

Pause over the geometric content of [@lem-complete-diagonal-separation-deficit]: because $\operatorname{separationDeficit}(\operatorname{latent}, g)$ is nonempty, there **must exist at least one concrete pair of addresses $(a_1, a_2)$** that collapse to the exact same shadow under the old coordinate ruler ($\operatorname{latent}(a_1) = \operatorname{latent}(a_2)$) yet are pried apart by the diagonal ($g(a_1) \neq g(a_2)$)!

How can the observer preserve the old readout while recovering $g$? The product readout [`conceptJoin`](lean:D5/S3/ConceptDynamics/ConceptJoinUniversal.conceptJoin) gives the least common refinement for this task; this book pictures that step as **promoting the escaping diagonal $g$ itself into a new orthogonal coordinate axis**:

$$
\operatorname{conceptJoin}(\operatorname{latent}, g) : a \;\longmapsto\; \bigl(\operatorname{latent}(a),\; g(a)\bigr) \in \mathrm{Coordinate} \times \mathrm{Output}.
$$

The next proposition proves that this joint readout forces a **strict observation-topology refinement** ([`StrictObservationRefinement`](lean:D5/S3/ConceptDynamics/ObservationTopology/PrimitiveEscapeStrictRefinement.StrictObservationRefinement), meaning every open set of the coarse topology remains open in the fine topology, while the fine topology possesses at least one genuinely new open set).

::: {.proposition #prop-complete-diagonal-strict-refinement title="Strict Observation-Topology Refinement by Adjoining the Relative Diagonal" lean="D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement"}
Under the exact hypotheses of [@thm-complete-diagonal-not-continuous] (`Address` nonempty, $\operatorname{twist}$ fixed-point-free, and $\operatorname{decoderCatalog}$ surjective), adjoining $g = \operatorname{relativeSemanticDiagonal}(\operatorname{twist}, \operatorname{latent}, \operatorname{decoderCatalog})$ to $\operatorname{latent}$ strictly refines the partition topology:

$$
\operatorname{StrictObservationRefinement}\Bigl(
  \operatorname{partitionTopology}(\operatorname{latent}),\;
  \operatorname{partitionTopology}\bigl(\operatorname{conceptJoin}(\operatorname{latent}, g)\bigr)
\Bigr).
$$
:::

::: proof
By [`coordinate_inadequate_iff_strict_join_refinement`](lean:D5/S3/ConceptDynamics/ObservationTopology/RedundantCoordinateTopology.coordinate_inadequate_iff_strict_join_refinement), the partition topology of $\operatorname{conceptJoin}(\operatorname{latent}, g)$ strictly refines $\operatorname{partitionTopology}(\operatorname{latent})$ if and only if $\operatorname{latent}$ is inadequate for $g$ ($\neg\operatorname{TargetAdequate}(\operatorname{latent}, g)$, i.e., $\neg\operatorname{Refines}(g, \operatorname{latent})$). Applying [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective) completes the proof. The full proof is checked by the Lean kernel.
:::

Combining non-factorization, discontinuity, nonempty separation deficit, and strict refinement yields the complete four-part settlement theorem.

::: {.corollary #cor-complete-diagonal-topological-settlement title="Four-Part Topological Settlement of Complete Relative Diagonalization" lean="D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement"}
Let `Address`, `Coordinate`, and `Output` be types with `Address` nonempty, let $\operatorname{twist} : \mathrm{Output} \to \mathrm{Output}$ satisfy $\forall o,\; \operatorname{twist}(o) \neq o$, and let $\operatorname{decoderCatalog} : \mathrm{Address} \to \mathrm{Coordinate} \to \mathrm{Output}$ be surjective. For $g = \operatorname{relativeSemanticDiagonal}(\operatorname{twist}, \operatorname{latent}, \operatorname{decoderCatalog})$, all four statements hold simultaneously:

1. **Non-factorization (escape from the latent closure)**: $\neg\operatorname{Refines}(g, \operatorname{latent})$;
2. **Discontinuity in the latent topology**: $\neg\,\operatorname{Continuous}_{\tau(\operatorname{latent}) \to \bot}(g)$;
3. **Nonempty separation deficit**: $\bigl(\operatorname{separationDeficit}(\operatorname{latent}, g)\bigr).\mathrm{Nonempty}$;
4. **Strict observation-topology refinement upon adjoining $g$**:

   $$
   \operatorname{StrictObservationRefinement}\Bigl(
     \operatorname{partitionTopology}(\operatorname{latent}),\;
     \operatorname{partitionTopology}\bigl(\operatorname{conceptJoin}(\operatorname{latent}, g)\bigr)
   \Bigr).
   $$
:::

::: proof
Conjoining [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective) with [@thm-complete-diagonal-not-continuous], [@lem-complete-diagonal-separation-deficit], and [@prop-complete-diagonal-strict-refinement] establishes all four conjuncts. The full proof is checked by the Lean kernel.
:::

Let us work through the smallest possible finite Boolean instance by hand so that every piece of [@cor-complete-diagonal-topological-settlement] becomes concretely visible.

::: {.example #ex-cantor-godel-diagonal-table title="Hand Calculation of Diagonal Escape and Fiber Splitting Over a 1-Bit Latent Coordinate"}
Take the 1-bit coordinate space $\mathrm{Coordinate} = \{0, 1\}$, output space $\mathrm{Output} = \{0, 1\}$, and fixed-point-free bit-flip $\operatorname{twist}(o) = 1 - o$ ($\operatorname{twist}(0) = 1 \neq 0$, $\operatorname{twist}(1) = 0 \neq 1$). Since there are $2^2 = 4$ functions from $\{0, 1\}$ to $\{0, 1\}$, choose a four-element address set $\mathrm{Address} = \{a_0, a_1, a_2, a_3\}$ to build a surjective catalog:

| Address $a$ | Decoder $D_a(0)$ | Decoder $D_a(1)$ | Latent Readout $\operatorname{latent}(a)$ | Self-Evaluation $D_a(\operatorname{latent}(a))$ | Diagonal $g(a) = 1 - D_a(\operatorname{latent}(a))$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $a_0$ (constant $0$) | $0$ | $0$ | $0$ | $D_{a_0}(0) = 0$ | $\mathbf{1}$ |
| $a_1$ (identity) | $0$ | $1$ | $0$ | $D_{a_1}(0) = 0$ | $\mathbf{1}$ |
| $a_2$ (negation) | $1$ | $0$ | $0$ | $D_{a_2}(0) = 1$ | $\mathbf{0}$ |
| $a_3$ (constant $1$) | $1$ | $1$ | $1$ | $D_{a_3}(1) = 1$ | $\mathbf{0}$ |

Now verify each clause of [@cor-complete-diagonal-topological-settlement] directly from the table:

1. **Concrete separation-deficit witness**: Inspect addresses $a_1$ and $a_2$. They share the same latent coordinate $\operatorname{latent}(a_1) = 0 = \operatorname{latent}(a_2)$ and are therefore inseparable in the coarse partition topology $\tau(\operatorname{latent}) = \{\varnothing,\; \{a_0, a_1, a_2\},\; \{a_3\},\; \mathrm{Address}\}$. Yet the diagonal assigns them opposite outputs $g(a_1) = 1 \neq 0 = g(a_2)$, giving the explicit witness

   $$
   (a_1, a_2) \in \operatorname{separationDeficit}(\operatorname{latent}, g) \neq \varnothing.
   $$

2. **Discontinuity and non-factorization**: The preimage of the discrete open singleton $\{0\} \subseteq \mathrm{Output}$ under $g$ is $g^{-1}(\{0\}) = \{a_2, a_3\}$, which slices straight through the coarse fiber $\{a_0, a_1, a_2\}$ and is not open in $\tau(\operatorname{latent})$; hence $g$ is discontinuous and cannot factor as $h(\operatorname{latent}(a))$.
3. **Strict refinement upon adjoining $g$**: Forming $\operatorname{conceptJoin}(\operatorname{latent}, g)(a) = (\operatorname{latent}(a), g(a))$ maps $a_0 \mapsto (0, 1)$, $a_1 \mapsto (0, 1)$, $a_2 \mapsto (0, 0)$, and $a_3 \mapsto (1, 0)$. The three-element blind fiber $\{a_0, a_1, a_2\}$ splits cleanly into $\{a_0, a_1\}$ and $\{a_2\}$, strictly refining the partition topology from $2$ nonempty atomic open fibers to $3$!
:::

This quartet captures the pure abstract diagonal skeleton in observation topology (compared with classical metamathematical diagonal theorems in [@rem-godel-tarski-comparison-literature]). Within our abstract topological setting, whenever a system indexes a surjective family of candidate decoders `decoderCatalog` over its current latent coordinates and applies a fixed-point-free `twist` along the diagonal, the resulting self-referential target $g$ splits an equivalence fiber of the current language. To preserve the old readout while making $g$ continuous, the product readout $\operatorname{conceptJoin}(\operatorname{latent}, g)$ gives the least common refinement: any readout accomplishing both tasks can recover it; and **iterating this escape to a subsequent diagonal $g'$ over the expanded coordinate space $\mathrm{Coordinate}_{k+1} = \mathrm{Coordinate}_k \times \mathrm{Output}$ is conditional on re-establishing a new surjective catalog $\operatorname{decoderCatalog}_{k+1} : \mathrm{Address}_{k+1} \twoheadrightarrow (\mathrm{Coordinate}_{k+1} \to \mathrm{Output})$ on a suitably enlarged address space $\mathrm{Address}_{k+1}$** — for instance, in the four-address Boolean model of [@ex-cantor-godel-diagonal-table], the joined coordinate space has $4$ coordinate pairs ($2^4 = 16$ Boolean functions in total, and $2^3 = 8 > 4$ Boolean functions even on the $3$ realized nonempty fibers), so the original $4$ addresses cannot surjectively index the next stage unless `Address` itself is enlarged!

::: {.viz src="sphere-escape" preset="absorb" height="500"}
**Absorb it, and it escapes again.** The flipped magenta string $d$ is taken onto the list as row $7$, and a column is added to keep the table square. Reading and flipping the new diagonal at once produces another magenta string that is not on the list. However often the list absorbs its escapee, the same thing happens ([`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)).
:::

::: {.remark #rem-godel-tarski-comparison-literature title="Hypothesis Boundary Between Abstract Diagonal Escape and Gödel–Tarski Metamathematics (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Corollary [@cor-complete-diagonal-topological-settlement] captures the abstract set-theoretic and observation-topological diagonal pattern (echoing Georg Cantor's diagonal argument and F. W. Lawvere, *Diagonal arguments and cartesian closed categories*, 1969). In formal mathematical logic, **Gödel's first incompleteness theorem** (K. Gödel, 1931) concerns effectively axiomatized theories capable of expressing enough arithmetic, using Gödel numbering and syntactic provability, with consistency or $\omega$-consistency assumptions distinguished according to the version. **Tarski's undefinability of truth** (A. Tarski, 1933/1936) instead uses syntactic coding and diagonalization to rule out a definition of standard arithmetic truth within the language of arithmetic. Neither directly assumes a surjection onto all semantic functions, and they do not share the whole package of effective axiomatization and syntactic provability assumptions.
:::

> A complete catalog necessarily cracks its own shell; whoever tries to exhaust the world from inside a single sphere is thrust outward along the diagonal normal.

## 21.3 Inscribed Polytopes, Taylor Remainder Seams, and the Open Helix {#sec-ch21-3}

Under the complete-catalog and fixed-point-free-twist assumptions above, no formal shell of fixed latent coordinates can seal all output maps inside a static sphere. Let us look back at the "spheres" of physics and computation with fresh eyes.

At the close of the [Prelude](README.md), we stated the book's central anti-Platonic thesis: **"In truth, every sphere is only an approximation: we think we have obtained a sphere, when all we ever hold is an approximate sphere."** Paired with diagonal escape, this anti-Platonic insight manifests across three distinct mathematical domains:

1. **The Taylor remainder seam $R_{2N}(\theta)$**: Along the finite Taylor route chosen here, we approximate the cosine projection $\cos\theta$ with a polynomial built from finitely many additions and multiplications. Truncating after $N$ even terms (degree $2N - 2$) defines the remainder seam

   $$
   R_{2N}(\theta) = \cos\theta - \sum_{k=0}^{N-1} (-1)^k \frac{\theta^{2k}}{(2k)!}.
   $$

   The polynomial represents what finitely many internal ring operations can close, whereas $R_{2N}(\theta)$ is the analytic escape seam separating any finite polynomial cage from the smooth circular cosine curve (its classical Lagrange bound and nonvanishing on $(0, 2]$ are recorded in [@rem-lagrange-taylor-remainder-literature], while the kernel-verified bound in complete normed algebras is proved in [@lem-exp-tail-le]).
2. **Inscribed convex polytopes at finite gate count $L$**: In fault-tolerant quantum synthesis over a finite discrete gate alphabet $\mathcal{G}$ (such as $\{H, T\}$), at any finite gate count $L < \infty$ the reachable set $\mathcal{S}_L \subset S^2$ from $\lvert 0\rangle$ is a finite point set whose Euclidean convex hull $\operatorname{conv}(\mathcal{S}_L) \subset \mathbb{R}^3$ is an **inscribed convex polyhedron** rather than a smooth sphere — leaving curved spherical caps outside every flat facet until $L$ is increased.
3. **The open ascending helix projected as a circle**: Viewed heuristically, if each topological refinement $\operatorname{conceptJoin}(\operatorname{latent}, g)$ in [@prop-complete-diagonal-strict-refinement] is pictured as an ascent along a newly adjoined normal axis $\vv{e}_{n+1} = \star I_n$, then what looks to a flatland observer like a closed periodic circle $(\cos t, \sin t)$ is the axial shadow of an **open ascending helix** $(\cos t, \sin t, c\,t)$ in the ambient space: returning to $(\cos 2\pi, \sin 2\pi) = (1, 0)$ in the base plane actually lands one turn higher at $(1, 0, 2\pi c)$!

::: {.remark #rem-lagrange-taylor-remainder-literature title="Lagrange Remainder Bound and Nonvanishing of the Cosine Truncation Error (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** By Taylor's theorem with Lagrange remainder and the Leibniz alternating-series test, the even cosine remainder satisfies $|R_{2N}(\theta)| \le \frac{|\theta|^{2N}}{(2N)!}$ and is strictly nonzero ($R_{2N}(\theta) \neq 0$) for every $\theta \in (0, 2]$. Lemma [@lem-exp-tail-le] below establishes the kernel-verified exponential tail bound in any complete normed algebra.
:::

::: {.figure src="ch21-taylor-crack"}
**One more term pushes the crack further out, but never closes it.** The thick ink curve is $\cos\theta$; the three cyan curves are the cosine polynomials with the first $N = 2, 3, 4$ terms, which hug it for small $\theta$ and peel away one after another. The magenta area is the remainder $R_6(\theta)$ for $N = 3$: too thin to see at the left, ever wider to the right. For bounds on the remainder see [@rem-lagrange-taylor-remainder-literature] (literature result) and [@lem-exp-tail-le].
:::

So far the three claims are only words. The first two will now be replaced by numbers that can be checked and by theorems that are already frozen.

**Liu Hui's circle cutting first.** Take the regular $n$-gon inscribed in the unit circle: its half-perimeter is $n\sin\frac{\pi}{n}$, the distance from the centre to the midpoint of each side (the apothem) is $\cos\frac{\pi}{n}$, and the gap between the midpoint of a side and the arc (the sagitta) is

$$
1 - \cos\frac{\pi}{n} \;=\; 2\sin^2\frac{\pi}{2n} .
$$

::: {.example #ex-liu-hui-polygon-sagitta title="Liu Hui's Circle Cutting in Numbers: Half-Perimeter, Apothem, and Sagitta (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** That the inscribed regular-$n$-gon half-perimeter $n\sin\frac{\pi}{n}$ approaches $\pi$ monotonically from below, together with the second-order Taylor asymptotics and Liu Hui's $2n$-gon area identity below, belongs to the classical geometry and real-analysis literature and is not locked as a standalone theorem in this book's formalization. The values below were computed at 40 digits and rounded to the digits shown.

| $n$ | half-perimeter $n\sin\frac{\pi}{n}$ | $\pi - n\sin\frac{\pi}{n}$ | apothem $\cos\frac{\pi}{n}$ | sagitta $1 - \cos\frac{\pi}{n}$ |
| :---: | :---: | :---: | :---: | :---: |
| $6$ | $3.0000000000$ | $1.42\times10^{-1}$ | $0.8660254038$ | $1.34\times10^{-1}$ |
| $12$ | $3.1058285412$ | $3.58\times10^{-2}$ | $0.9659258263$ | $3.41\times10^{-2}$ |
| $24$ | $3.1326286133$ | $8.96\times10^{-3}$ | $0.9914448614$ | $8.56\times10^{-3}$ |
| $48$ | $3.1393502030$ | $2.24\times10^{-3}$ | $0.9978589232$ | $2.14\times10^{-3}$ |
| $96$ | $3.1410319509$ | $5.61\times10^{-4}$ | $0.9994645875$ | $5.35\times10^{-4}$ |
| $192$ | $3.1414524723$ | $1.40\times10^{-4}$ | $0.9998661379$ | $1.34\times10^{-4}$ |
| $3072$ | $3.1415921060$ | $5.48\times10^{-7}$ | $0.9999994771$ | $5.23\times10^{-7}$ |

Each doubling of the number of sides shrinks both residuals to about one quarter, in agreement with the asymptotics $\pi - n\sin\frac{\pi}{n} \approx \frac{\pi^3}{6n^2}$ and $1 - \cos\frac{\pi}{n} \approx \frac{\pi^2}{2n^2}$; yet for every finite $n$ both are strictly positive. (The half-perimeter of the regular $n$-gon equals the area of the regular $2n$-gon. Liu Hui cut the circle by areas, and the area of his $192$-gon corresponds to the row $n = 96$.)
:::

**A verified version of the Taylor remainder.** The Lagrange remainder bound quoted in item 1 is a classical result of analysis. The pinned repository holds a frozen remainder bound of wider scope: it holds not only for the real cosine but for the exponential series in any complete normed algebra.

::: {.lemma #lem-exp-tail-le title="Factorial Remainder Bound for the Exponential Series in a Complete Normed Algebra" lean="D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le"}
Let $\mathbb{K}$ be $\mathbb{R}$ or $\mathbb{C}$ (`[RCLike 𝕜]`) and let $A$ be a complete normed algebra over $\mathbb{K}$ with $\lVert 1\rVert = 1$ (`[NormedRing A]`, `[NormedAlgebra 𝕜 A]`, `[CompleteSpace A]`, `[NormOneClass A]`). Let $z \in A$, $r \in \mathbb{R}$, and $n \in \mathbb{N}$ satisfy $0 \le r$ and $\lVert z\rVert \le r$. Then

$$
\Bigl\lVert\, \exp z \;-\; \sum_{k=0}^{n-1} \frac{1}{k!}\,z^k \,\Bigr\rVert \;\le\; \frac{r^n}{n!}\,e^{r} .
$$
:::

::: proof
$\exp z$ is the sum of the series $\sum_k z^k/k!$ (`NormedSpace.exp_series_hasSum_exp'`); subtracting the first $n$ terms leaves the tail $\sum_{k \ge 0} z^{k+n}/(k+n)!$. Estimate term by term: $\lVert z^{k+n}\rVert \le r^{k+n}$, and $n!\,k!$ divides $(k+n)!$ (`Nat.factorial_mul_factorial_dvd_factorial_add`), so $(k+n)! \ge n!\,k!$ and the norm of the $k$-th tail term is at most $\frac{r^n}{n!}\cdot\frac{r^k}{k!}$. Summing the right-hand side over $k$ gives $\frac{r^n}{n!}\,e^r$, and termwise domination yields the claim. The full proof is checked by the Lean kernel.
:::

Apply [@lem-exp-tail-le] to two concrete algebras (the two substitutions below are manual remarks of this book):

- Take $A = \mathbb{C}$, $z = i\theta$, $n = 2N$. The real part of the partial sum $\sum_{k<2N}(i\theta)^k/k!$ is exactly the even cosine polynomial with $N$ terms, and the absolute value of the real part of a complex number is at most its modulus, so $\lvert R_{2N}(\theta)\rvert \le \frac{\lvert\theta\rvert^{2N}}{(2N)!}\,e^{\lvert\theta\rvert}$. Compared with the Lagrange bound it carries an extra factor $e^{\lvert\theta\rvert}$; what it buys is that it is a direct substitution into a kernel-verified lemma (the two substitution steps themselves are manual).
- Take $A = M_2(\mathbb{C})$ (operator norm) and $z = -\frac{i\theta}{2}\,\vv{n}\cdot\vv{\sigma}$ with $\vv{n}$ a unit vector, so that $\lVert z\rVert = \frac{\lvert\theta\rvert}{2}$. The $n$-term truncation of the rotor $U = \exp z$ satisfies $\bigl\lVert U - \sum_{k<n} z^k/k!\bigr\rVert \le \frac{(\lvert\theta\rvert/2)^n}{n!}\,e^{\lvert\theta\rvert/2}$.

::: {.example #ex-taylor-remainder-three-bounds title="Truncation Remainders of the Cosine and of a Rotor: Actual Value, Lagrange Bound, and the Bound from the Verified Lemma"}
(The middle-column Lagrange bound $\frac{(\theta^*)^{2N}}{(2N)!}$ is a **literature result, not formalized in this book**, see [@rem-lagrange-taylor-remainder-literature]; the right-hand column instantiates the frozen lemma [@lem-exp-tail-le].)

**Cosine at $\theta = \theta^* \approx 0.739085$ (the cosine fixed point of Chapter 24).**

| $N$ | actual remainder $\lvert R_{2N}(\theta^*)\rvert$ | Lagrange bound $\frac{(\theta^*)^{2N}}{(2N)!}$ | bound from the verified lemma $\frac{(\theta^*)^{2N}}{(2N)!}\,e^{\theta^*}$ |
| :---: | :---: | :---: | :---: |
| $1$ | $2.61\times10^{-1}$ | $2.73\times10^{-1}$ | $5.72\times10^{-1}$ |
| $2$ | $1.22\times10^{-2}$ | $1.24\times10^{-2}$ | $2.60\times10^{-2}$ |
| $3$ | $2.24\times10^{-4}$ | $2.26\times10^{-4}$ | $4.74\times10^{-4}$ |
| $4$ | $2.19\times10^{-6}$ | $2.21\times10^{-6}$ | $4.62\times10^{-6}$ |
| $5$ | $1.33\times10^{-8}$ | $1.34\times10^{-8}$ | $2.81\times10^{-8}$ |
| $6$ | $5.53\times10^{-11}$ | $5.55\times10^{-11}$ | $1.16\times10^{-10}$ |

**Rotor at $\theta = \pi$ (one $\pi$ pulse), $r = \pi/2$.**

| number of terms $n$ | actual error $\bigl\lVert U - \sum_{k<n} z^k/k!\bigr\rVert$ | verified bound $\frac{(\pi/2)^n}{n!}\,e^{\pi/2}$ |
| :---: | :---: | :---: |
| $4$ | $2.45\times10^{-1}$ | $1.22$ |
| $8$ | $9.08\times10^{-4}$ | $4.42\times10^{-3}$ |
| $12$ | $4.68\times10^{-7}$ | $2.27\times10^{-6}$ |

In every row the actual remainder lies within the bound, and it is strictly positive.
:::

**The sagitta of a finite record.** Item 2 says that finitely many operations produce only an inscribed polytope, with a bow-shaped residual between each flat face and the sphere. The pinned repository holds two frozen theorems that give this sentence a literal version: replace "finite gate count" by "a record pointer with finitely many cells", and the residual is bounded below by exactly the sagitta of a regular polygon (the coherence loss by the sagitta, the recovery error by half of it).

The physical picture is this. A record pointer has $N + 1$ cells with amplitudes $c(0), \dots, c(N)$. The $i$-th branch of the system carries an integer label $q_i$, and recording consists in shifting the pointer by $q_i$ cells. For two branches whose labels differ by $\ell$, the coherence between them is multiplied after the recording by one factor: the overlap of the pointer with itself shifted by $\ell$ cells,

$$
\gamma(\ell) \;=\; \sum_{k \in \mathbb{Z}} c(k + \ell)\,\overline{c(k)} .
$$

If $\lvert\gamma(\ell)\rvert = 1$, the pointer before and after the shift cannot be told apart, nothing has been recorded, and coherence is intact; if $\lvert\gamma(\ell)\rvert < 1$, coherence is damaged. The question is whether a pointer with finitely many cells can make $\lvert\gamma(\ell)\rvert$ equal to $1$.

::: {.lemma #lem-finite-support-autocorrelation-cosine title="The Autocorrelation of a Finitely Supported Unit Sequence Is Bounded by the Cosine of a Polygon Angle" lean="D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.coefficient_gamma_le_cosine"}
Let $N \in \mathbb{N}$ and let $c : \mathbb{Z} \to \mathbb{C}$ satisfy:

1. **Finite support (`hsupport`)**: for every $k \in \mathbb{Z}$, if $k < 0$ or $N < k$ then $c(k) = 0$;
2. **Normalization (`hnorm`)**: $\sum_{k \in \mathbb{Z}} \lVert c(k)\rVert^2 = 1$.

Then for every integer $\ell \neq 0$,

$$
\Bigl\lVert \sum_{k \in \mathbb{Z}} c(k + \ell)\,\overline{c(k)} \Bigr\rVert \;\le\; \cos\frac{\pi}{\lfloor N/\lvert\ell\rvert\rfloor + 2},
$$

where $\lfloor N/\lvert\ell\rvert\rfloor$ is the natural-number division $N / \ell.\mathrm{natAbs}$.
:::

::: proof
Put $d = \lvert\ell\rvert$ and $m = \lfloor N/d\rfloor$. Split the support $\{0, \dots, N\}$ into $d$ chains according to residue classes modulo $d$; consecutive indices of a chain differ by exactly $d$, and a chain has length at most $m + 1$. The modulus of the autocorrelation is at most the total, over all chains, of the sums of products of adjacent moduli, while the squared moduli of all chains add up to $\sum_k \lVert c(k)\rVert^2$ (`residue_block_bounds`). On each chain apply the path inequality $\sum_{k<m} x_k x_{k+1} \le \cos\frac{\pi}{m+2}\sum_{k \le m} x_k^2$ (`path_correlation_le_cos`, obtained from a quadratic-form bound for nearest-neighbour averages and the Cauchy–Schwarz inequality), sum over the chains, and insert the normalization. The full proof is checked by the Lean kernel.
:::

The right-hand side $\cos\frac{\pi}{m+2}$ is precisely the apothem of the regular $(m+2)$-gon inscribed in the unit circle ([@ex-liu-hui-polygon-sagitta]), and it is strictly less than $1$. So the answer is no: once a pointer with finitely many cells is shifted, it necessarily leaves a trace. The next theorem converts this trace into an error that no recovery operation can undo.

::: {.theorem #thm-finite-record-cosine-obstruction title="The Recovery Error of a Finite-Record Channel Has a Strictly Positive Cosine Lower Bound" lean="D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.finite_record_cosine_obstruction"}
Let $\iota$ be a finite type (`[Fintype ι]`, `[DecidableEq ι]`), $N \in \mathbb{N}$, $c : \mathbb{Z} \to \mathbb{C}$, $q : \iota \to \mathbb{Z}$, and let $c$ satisfy the two hypotheses `hsupport` and `hnorm` of [@lem-finite-support-autocorrelation-cosine]. Put

- $\gamma(t) = \sum_{k \in \mathbb{Z}} c(k + t)\,\overline{c(k)}$ for $t \in \mathbb{Z}$;
- $Q = \sum_{i \in \iota} \lvert q_i\rvert$, $L = N + 2Q + 1$, $\operatorname{coord}(a) = a - Q$ for $a \in \operatorname{Fin} L$;
- $\operatorname{record}_i(a) = c(\operatorname{coord}(a) + q_i)$;
- $V$ the complex matrix of shape $(\iota \times \operatorname{Fin} L) \times \iota$ with $V_{(i', a),\, j} = \operatorname{record}_{i'}(a)$ when $j = i'$ and $0$ otherwise;
- $\operatorname{partialTrace}(J)_{ij} = \sum_{a \in \operatorname{Fin} L} J_{(i, a), (j, a)}$;
- $\Lambda(A) = \operatorname{partialTrace}(V A V^\dagger)$ for a complex $\iota \times \iota$ matrix $A$.

Then there exists a quantum channel $C$ (`QuantumChannel ι ι`, a trace-preserving completely positive map) such that:

1. For every complex $\iota \times \iota$ matrix $A$: $\operatorname{act} C\ A = \Lambda(A)$;
2. For every $A$ and all $i, j \in \iota$: $\Lambda(A)_{ij} = \gamma(q_i - q_j)\,A_{ij}$;
3. For all $i, j \in \iota$ and every integer $\ell \neq 0$ with $q_i - q_j = \ell$, and for every quantum channel $R$ (`QuantumChannel ι ι`), put

   $$
   f = \Bigl\lfloor \frac{N}{\lvert\ell\rvert} \Bigr\rfloor, \qquad \mathrm{bound} = \frac{1}{2}\Bigl(1 - \cos\frac{\pi}{f + 2}\Bigr),
   $$

   and let $\mathrm{errors} = \bigl\{\, T\bigl(R(C(\rho)),\, \rho\bigr) \;\big|\; \rho \in \operatorname{DensityState}\ \iota \,\bigr\}$ ($T$ the trace distance `traceDistance`) and $\mathrm{matrixErrors} = \bigl\{\, \tfrac12\lVert \operatorname{act} R\ (\Lambda(\rho)) - \rho \rVert_1 \;\big|\; \rho \in \operatorname{DensityState}\ \iota \,\bigr\}$ ($\lVert\cdot\rVert_1$ the trace norm `traceNorm`). Then all five of the following hold:
   - $\mathrm{errors} = \mathrm{matrixErrors}$;
   - for all density states $\rho, \sigma$: $0 \le T(\rho, \sigma) \le 1$;
   - $\mathrm{errors}$ is nonempty and bounded above;
   - $\mathrm{bound} \le \sup \mathrm{errors}$;
   - $0 < \mathrm{bound}$.
:::

::: proof
The proof joins the conclusions of three modules. First, `FiniteShiftedRecordChannel` shows that $\Lambda$ is the action of a quantum channel and gives the entrywise formula $\Lambda(A)_{ij} = \gamma(q_i - q_j)\,A_{ij}$; these are claims 1 and 2. Second, `FiniteRecordRecoveryError` shows that whenever $q_i \neq q_j$, for every recovery channel $R$ the error set is nonempty and bounded above, and its supremum is at least $\frac12\bigl(1 - \lVert\gamma(q_i - q_j)\rVert\bigr)$; the same module shows that the trace distance lies in $[0, 1]$. Third, [@lem-finite-support-autocorrelation-cosine] gives $\lVert\gamma(\ell)\rVert \le \cos\frac{\pi}{f+2}$, and substitution yields $\mathrm{bound} \le \sup\mathrm{errors}$. Finally, since $0 < \frac{\pi}{f+2} \le \frac{\pi}{2}$, the cosine is strictly less than $\cos 0 = 1$, so $\mathrm{bound} > 0$ (`gap_floor_positive`). The full proof is checked by the Lean kernel.
:::

The lower bound of [@thm-finite-record-cosine-obstruction] can be read directly as a geometric quantity:

$$
\mathrm{bound} \;=\; \frac12\Bigl(1 - \cos\frac{\pi}{m + 2}\Bigr), \qquad m = \Bigl\lfloor \frac{N}{\lvert\ell\rvert} \Bigr\rfloor,
$$

is half the sagitta of the regular $(m+2)$-gon inscribed in the unit circle. For $m = 0$ (one shift already moves the pointer off its own support) it equals $\frac12$; for $m = 1, 2, 4, 10, 98$ it equals $0.2500$, $0.1464$, $0.0670$, $0.0170$, $2.47\times10^{-4}$; for large $m$ it tends to zero like $\frac{\pi^2}{4(m+2)^2}$. The longer the pointer, the gentler the recording can be and the smaller the unrecoverable error it leaves, but for every finite $N$ it is strictly positive. The theorem concerns this shift-recording channel and a pair of branches with nonzero label difference only; it makes no claim that other encodings obey the same bound.

**A hard lower bound at finite gate count.** Return to item 2 itself. It says only that a residual "remains" between the inscribed polytope and the sphere, not how much must remain. One line about the area of a spherical cap gives the answer.

::: {.example #ex-cap-covering-gate-count title="Cap Covering: An Inscribed Polytope with N Vertices Leaves a Residual of at Least 2/N, and a Lower Bound on Gate Count"}
**Literature result, not formalized in this book.** This example uses Archimedes' spherical-cap area formula (a cap of height $\delta$ on the unit sphere has area $2\pi\delta$) to derive an elementary covering lower bound for comparison with [@rem-solovay-kitaev-literature].

**Definition of the residual.** Let $S$ be a set of $N$ points on the unit sphere $S^2$ and $P = \operatorname{conv}(S)$ its convex hull. For a unit vector $\vv{u}$, the sphere extends to $1$ in this direction and the polytope extends to its support function $h_P(\vv{u}) = \max_{\vv{s} \in S} \vv{u}\cdot\vv{s}$. Call $1 - h_P(\vv{u})$ the residual in the direction $\vv{u}$.

**Claim: some direction $\vv{u}$ has residual at least $2/N$.** Let $\rho$ be the maximal residual and suppose $\rho < 2/N$; choose $\delta$ with $\rho < \delta < 2/N$. Every direction $\vv{u}$ then has some $\vv{s} \in S$ with $\vv{u}\cdot\vv{s} > 1 - \delta$, that is, $\vv{u}$ lies in the spherical cap of height $\delta$ with apex $\vv{s}$. A cap of height $\delta$ has area $2\pi\delta$ (Archimedes: the area of a cap of the unit sphere is $2\pi$ times its height), so $N$ such caps have total area $2\pi\delta N < 4\pi$ and cannot cover the sphere, a contradiction.

**Check against the regular polyhedra.** The maximal residual of a regular polyhedron occurs in the direction of a face centre and equals $1$ minus the ratio of the inradius to the circumradius:

| polyhedron | vertices $N$ | actual maximal residual | lower bound $2/N$ |
| :---: | :---: | :---: | :---: |
| tetrahedron | $4$ | $0.6667$ | $0.5000$ |
| octahedron | $6$ | $0.4226$ | $0.3333$ |
| cube | $8$ | $0.4226$ | $0.2500$ |
| icosahedron | $12$ | $0.2053$ | $0.1667$ |
| dodecahedron | $20$ | $0.2053$ | $0.1000$ |

**Conversion to gate count.** With a gate set of $g$ gates, at most $1 + g + \dots + g^L = \frac{g^{L+1} - 1}{g - 1}$ gate words of length at most $L$ start from a fixed initial state, so the number of reachable points does not exceed this number. For $g = 2$ (for example $\{H, T\}$), $N \le 2^{L+1} - 1$, hence the maximal residual is at least $\frac{2}{2^{L+1} - 1}$ and the corresponding angular radius (the angular distance of the point of the sphere farthest from the reachable set) is at least $\arccos\bigl(1 - \frac{2}{N}\bigr)$:

| gate-length cap $L$ | point-count cap $2^{L+1} - 1$ | residual lower bound | angular-radius lower bound |
| :---: | :---: | :---: | :---: |
| $1$ | $3$ | $0.6667$ | $70.53^\circ$ |
| $2$ | $7$ | $0.2857$ | $44.42^\circ$ |
| $3$ | $15$ | $0.1333$ | $29.93^\circ$ |
| $5$ | $63$ | $0.0317$ | $14.48^\circ$ |
| $10$ | $2047$ | $9.77\times10^{-4}$ | $2.533^\circ$ |
| $20$ | $2097151$ | $9.54\times10^{-7}$ | $0.0791^\circ$ |

In [@ex-finite-ht-polytope] of Chapter 16 the $\{H, T\}$ words of length at most $3$ actually reach only $5$ distinct points; by the present example the residual is then at least $2/5$ and the angular radius at least $53.13^\circ$.

**Reading it backwards.** For every point of the sphere to lie within angular distance $\varepsilon$ of the reachable set, one needs $2^{L+1} - 1 \ge \frac{2}{1 - \cos\varepsilon}$, that is, $L \ge \log_2\bigl(\frac{2}{1 - \cos\varepsilon} + 1\bigr) - 1 \approx 2\log_2\frac{1}{\varepsilon} + 1$. For $\varepsilon = 10^{-2}, 10^{-3}, 10^{-6}$ (radians) this gives $L \ge 15, 21, 41$. This is a lower bound obtained by counting alone: the gate length must grow at least linearly in $\log\frac{1}{\varepsilon}$. The Solovay–Kitaev theorem ([@rem-solovay-kitaev-literature], a literature result) supplies the complementary upper bound, $L = O\bigl(\log^c\frac{1}{\varepsilon}\bigr)$ with $c \approx 3.97$: polynomial, not linear, in $\log\frac{1}{\varepsilon}$.
:::

Put the four residual scales side by side: the sagitta of the regular $n$-gon is $1 - \cos\frac{\pi}{n} = 2\sin^2\frac{\pi}{2n}$ ([@ex-liu-hui-polygon-sagitta]); the unrecoverable error of a pointer with $N + 1$ cells is at least half the sagitta of the regular $(m+2)$-gon ([@thm-finite-record-cosine-obstruction]); the cap-covering lower bound for an $N$-vertex inscribed polytope is recorded in [@ex-cap-covering-gate-count]; and the remainder of the $N$-term cosine polynomial is controlled by the factorial bound $\frac{|\theta|^{2N}}{(2N)!}e^{|\theta|}$ of [@lem-exp-tail-le] (numerically compared in [@ex-taylor-remainder-three-bounds]). All of them tend to zero as the resource grows, while remaining strictly positive across the finite-record theorems and finite numerical tables. The sentence of the prelude, "we think we have obtained a sphere, but in fact we have only approximately obtained one", has in each of these four settings a number that can be checked.

::: {.viz src="sphere-escape" preset="liuhui" height="500"}
**Liu Hui cuts the circle.** The sides double from $6$ to $192$ and the polygon looks more and more like the circle, while the magnifier on the right keeps the gap between one side and the arc large enough to see. That gap, $1 - \cos\frac{\pi}{n}$, shrinks to about a quarter at each doubling and is positive for every finite $n$ ([@ex-liu-hui-polygon-sagitta]).
:::

## 21.4 The Hairy Ball Theorem, Descartes's $720^\circ$ Angular Defect, and Adams's Division-Algebra Spheres {#sec-ch21-4}

Even if we refrain from constructing Gödelian diagonals and stay strictly on the smooth two-dimensional Bloch sphere $S^2 \subset \mathbb{R}^3$, topology itself plants an immovable singularity right on the surface of the sphere — governed by the **Poincaré–Brouwer Hairy Ball Theorem**, **Descartes's polyhedral angular-defect theorem**, and **Adams's parallelizability theorem**.

Can one comb a globally continuous, nowhere-vanishing tangent reference field across the single-qubit Bloch sphere $S^2$ (assigning to each pure state $\vv{a} \in S^2$ a continuous unit tangent direction $\vv{v}(\vv{a}) \perp \vv{a}$)? On a closed piecewise-flat equilateral triangulated polyhedral sphere with only degree-$5$ and degree-$6$ vertices (or its dual closed trivalent fullerene cage), how does topology constrain the count of pentagonal defects? And when we ask for a **full global frame of $m$ everywhere linearly independent tangent fields** trivializing the tangent bundle $TS^m$ (**parallelizability**), which spheres $S^m$ qualify?

The following literature note gathers these three classical pillars of combinatorics, differential topology, and algebraic K-theory.

::: {.remark #rem-hairy-ball-adams-literature title="Euler Characteristic, Descartes's 720° Angular Defect, the Hairy Ball Theorem, and Adams's Parallelizable Spheres (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Four classical theorems of geometry and topology govern the obstructions and exceptional parallelizability of spheres:

1. **Euler characteristic of the 2-sphere**: For any convex polyhedral cell decomposition of the two-sphere $S^2$ with $V$ vertices, $E$ edges, and $F$ faces, Euler's formula gives the topological invariant

   $$
   \chi(S^2) = V - E + F = 2.
   $$

   For a regular icosahedron ($V = 12$ vertices, $E = 30$ edges, $F = 20$ equilateral triangles), $12 - 30 + 20 = 2$.
2. **Descartes's total angular defect ($12 \times 60^\circ = 720^\circ = 4\pi$)**: One must distinguish **spherical geodesic triangles on a smooth round sphere** from **Euclidean planar triangles on a piecewise-flat polyhedral surface** — on a smooth round sphere $S^2$ of curvature $+1$, nondegenerate geodesic triangles have positive spherical excess $\alpha + \beta + \gamma > \pi$ (for instance, in a spherical icosahedral tiling, each spherical equilateral triangle has $72^\circ$ angles and five meet smoothly at $5 \times 72^\circ = 360^\circ$ around each vertex because the $4\pi$ Gauss–Bonnet curvature is distributed continuously across the curved faces). By contrast, consider a **closed piecewise-Euclidean (flat-faced) equilateral triangulated polyhedral surface** homeomorphic to $S^2$, where each face is a flat Euclidean equilateral triangle with interior angles $\pi/3 = 60^\circ$ and all curvature is concentrated as discrete angular defects at the vertices. At any degree-$6$ vertex, six flat $60^\circ$ triangles meet to form $6 \times 60^\circ = 360^\circ = 2\pi$, which has zero angular defect ($\delta_6 = 0$); a pure degree-$6$ triangulation can therefore tile only a flat plane or a flat torus ($\chi(T^2) = 0$) and can never close into a sphere! If a closed piecewise-flat equilateral triangulated polyhedral sphere has only degree-$5$ and degree-$6$ vertices, then at each degree-$5$ vertex five flat triangles sum to $5 \times 60^\circ = 300^\circ$, leaving a positive angular defect of

   $$
   \delta_5 = 2\pi - 5\times\frac{\pi}{3} = \frac{\pi}{3} = 60^\circ.
   $$

   By Descartes's Theorem on Total Angular Defect (the discrete ancestor of the Gauss–Bonnet theorem $\int_{S^2} K\,dA = 2\pi\chi(S^2) = 4\pi$), the sum of vertex angular defects over any closed polyhedron homeomorphic to $S^2$ is identically $2\pi\chi(S^2) = 4\pi = 720^\circ$. Since degree-$6$ vertices contribute $0^\circ$ and each degree-$5$ vertex contributes $60^\circ$, any such closed piecewise-flat degree-$5/6$ triangulated sphere must contain **precisely $720^\circ / 60^\circ = 12$ degree-$5$ defect vertices** ($12 \times 60^\circ = 720^\circ = 4\pi$)! Dually, for any **closed trivalent fullerene polyhedron** with $F_5$ pentagonal faces and $F_6$ hexagonal faces ($3V = 2E = 5F_5 + 6F_6$), Euler's formula $6(V - E + F) = 6F - 2E = (6 - 5)F_5 + (6 - 6)F_6 = 12$ forces **precisely $F_5 = 12$ pentagons**. Even in discrete polyhedral approximation, a finite piecewise-flat mesh cannot close into a sphere without concentrating $4\pi$ of curvature into twelve $60^\circ$ defect seams.
3. **Poincaré–Brouwer Hairy Ball Theorem and odd vs. even spheres**: The Euler characteristic of the $m$-sphere is $\chi(S^m) = 1 + (-1)^m$. Because every **even-dimensional sphere** has $\chi(S^{2n}) = 2 \neq 0$, the Poincaré–Hopf index theorem implies that every continuous tangent vector field $v : S^{2n} \to TS^{2n}$ vanishes at least at one point $x_0 \in S^{2n}$ ($v(x_0) = 0$); on the single-qubit Bloch sphere $S^2 \cong \mathbb{CP}^1$, this forbids any globally continuous, nowhere-vanishing tangent phase gauge (the topological root of the Dirac monopole bundle and Berry-phase holonomy). Conversely, every **odd-dimensional sphere** $S^{2n-1} \subset \mathbb{C}^n$ has $\chi(S^{2n-1}) = 0$ and admits **at least one** nowhere-vanishing unit tangent vector field — namely multiplication by the complex imaginary unit $v(z) = iz$ (or $v(x_1, x_2, \dots, x_{2n-1}, x_{2n}) = (-x_2, x_1, \dots, -x_{2n}, x_{2n-1})$, which is nowhere zero on $S^5$, $S^7$, etc.).
4. **Hurwitz's normed division algebras and Adams's parallelizability theorem (Adams, 1962)**: Notice the sharp distinction between admitting a **single** nowhere-zero tangent field (true for all odd-dimensional spheres $S^{2n-1}$) and being **parallelizable** — having a globally trivial tangent bundle $TS^m$ equipped with a **full frame of $m$ everywhere linearly independent continuous tangent vector fields**! For example, $S^5$ admits a nowhere-zero tangent field $v(z) = iz$ but cannot be fitted with $5$ everywhere linearly independent tangent fields. By Hurwitz's theorem, the only finite-dimensional normed division algebras over $\mathbb{R}$ satisfying $\|xy\| = \|x\|\|y\|$ have dimensions $1, 2, 4, 8$: the **reals $\mathbb{R}$, complexes $\mathbb{C}$, quaternions $\mathbb{H}$, and octonions $\mathbb{O}$**. Left multiplication by imaginary units furnishes complete global tangent frames on their unit spheres $S^0 \subset \mathbb{R}$, $S^1 \subset \mathbb{C}$, $S^3 \subset \mathbb{H}$, and $S^7 \subset \mathbb{O}$. In 1960–1962, J. Frank Adams resolved the Hopf-invariant-one problem via topological K-theory, proving that **among all positive-dimensional spheres, only $S^1, S^3$, and $S^7$ (together with the zero-dimensional companion $S^0$) are parallelizable!**

Reading items 3 and 4 together illuminates the topological backdrop of [Chapter 1](ch01-measurement.md): whereas the observable two-sphere $S^2$ (even dimension $2 \notin \{0, 1, 3, 7\}$, $\chi(S^2) = 2$) admits no nowhere-vanishing continuous tangent field, the ambient three-sphere $S^3 \cong \mathrm{SU}(2)$ hovering above it via the Hopf fibration (the unit sphere of $\mathbb{H}$, lying on Adams's parallelizable list $\{S^0, S^1, S^3, S^7\}$; note that $S^3$'s round Riemannian metric still has constant positive sectional curvature $+1$ rather than being flat) has a tangent bundle $TS^3$ globally trivialized by left-invariant quaternion frames.
:::

::: {.figure src="ch21-angle-defect"}
**For flat triangles to close into a sphere, the vertex defects must add up to $4\pi$.** On the left, five equilateral triangles laid flat around one vertex: five corners of $60^\circ$ make only $300^\circ$, and the magenta gap below is the $60^\circ$ angular defect. On the right, each of the icosahedron's twelve magenta vertices is short by $60^\circ$, for a total of $12 \times 60^\circ = 720^\circ = 4\pi$ (literature result, not formalized in this book; see [@rem-hairy-ball-adams-literature]).
:::

The figure has only twelve vertices. Cut each triangular face into $\nu^2$ smaller triangles and push the new vertices out onto the sphere (a geodesic dome): the vertices grow from $12$ to $42$, $92$ and $162$, each one short by less and less, and yet the shortfalls always add up to $4\pi$:

::: {.viz src="hairy-ball-normal-escape" preset="defect" height="500"}
**Finer and finer, the total defect stays put.** Each face of the icosahedron is cut into $\nu^2$ flat triangles and the vertices are pushed out to the sphere; the area of each magenta dot is that vertex's defect. As the rail cuts each edge into $\nu = 1$ up to $\nu = 6$ pieces, the dots grow in number and shrink in size, while the readout at the upper left stays at $720^\circ = 4\pi$ (literature result, not formalized in this book; see [@rem-hairy-ball-adams-literature]).
:::

The hairy ball theorem only says that a zero cannot be avoided. The Poincaré–Hopf theorem says more: each zero carries an integer index (walk once round it on a small loop and count how many times the arrow turns), and the indices of all the zeros add up to $\chi(S^2) = 2$. The field that cannot be combed, met with the Berry loops earlier, has a $+1$ at each pole. Zeros can be pushed around and merged, but the sum cannot be pushed away:

::: {.viz src="hairy-ball-normal-escape" preset="merge" height="500"}
**Two $+1$ zeros become one $+2$.** The cyan arrows start from the zonal field $(-y, x, 0)$ and change continuously while the rail pushes the southern zero up a meridian to the North Pole; once there, a single zero is left, and the cyan arrows on the small magenta loop round it turn twice. This is the dipole field $\vv{w} = \bigl(\frac{(1-z)^2 - x^2 + y^2}{2},\, -xy,\, x(1-z)\bigr)$, with $\lVert\vv{w}\rVert = 1 - z$, vanishing only at the North Pole. The indices always add up to $2$ (literature result, not formalized in this book; see [@rem-hairy-ball-adams-literature]; the family of fields in between was chosen for the picture).
:::

The zero cannot be removed because the arrows are required to lie in the tangent plane. Let them stand partly up along the outward normal and, in space, they vanish nowhere. This is how the book puts "a sphere beyond the sphere" into the picture (`MODEL`); it does not refute the hairy ball theorem, since an arrow that stands up is no longer a tangent vector.

::: {.viz src="hairy-ball-normal-escape" preset="escape" height="500"}
**Standing up along the normal, the zero is gone.** The arrows of the dipole field are raised half-way by $\widetilde{\vv{w}}_\lambda = (1-\lambda)\,\vv{w} + \lambda\,\frac{1+z}{2}\,\vv{x}$ ($\lambda = \frac12$): the short magenta strokes are the part that stands up, and at the North Pole the amber arrow sticks out of the grey tangent plane with length $\frac12$; the shortest arrows lie on the dashed magenta circle, about $0.447$ long, and no zero is left on the sphere. Reading the lift as leaving the tangent space is an interpretation (`MODEL`).
:::

The full laboratory below puts these pictures together, with one more scene: on the torus, whose Euler characteristic is $0$, the arrows can be nonzero everywhere, a point the torus of the congruent-number elliptic curve returns to.

::: {.viz src="hairy-ball-normal-escape" height="640"}
Interactive laboratory `ORTHO//HAIRY`: the zonal field on the sphere with its two $+1$ zeros, the family that pushes them into one $+2$, the unit tangent field on the torus, the geodesic domes of finer and finer subdivision with their vertex defects, and the lift $\widetilde{\vv{w}}_\lambda$ along the outward normal. Every index, every defect and the length of the shortest arrow are computed by the page (`NUM`); the Poincaré–Hopf and Descartes theorems are literature results ([@rem-hairy-ball-adams-literature]), and the reading of the lift is an interpretation (`MODEL`). The green box in the evidence panel is [@thm-complete-diagonal-not-continuous], which says that the diagonal is not continuous for the partition topology; it is not the hairy ball theorem.
:::

Reading these classical topological results ([@rem-hairy-ball-adams-literature]) alongside our kernel-verified relative semantic diagonal settlement ([@cor-complete-diagonal-topological-settlement]) highlights a shared structural motif: **singularities and incompleteness inside a sphere can be resolved only from a sphere beyond the sphere.**

::: {.viz src="sphere-escape" height="640"}
Interactive laboratory `ORTHO//ESCAPE`: four scenes of one fact, that after finitely many steps something is still outside. The flipped diagonal is not on the list ([`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)); the gap between an inscribed polygon and the circle is never zero; the cosine iteration never quite arrives; multiply finitely many primes and add one, and every prime factor is off the list. The two plots under the stage show what is left outside, step by step. Putting the four scenes side by side is this book's reading (`MODEL`); mathematically they are four different facts. The evidence panel also lists [@thm-complete-diagonal-not-continuous], [@cor-complete-diagonal-topological-settlement] and the two fixed-point theorems of Chapter 24.
:::

As we step out into that infinite dimensional tower, what serves as the canonical orthogonal coordinate basis of arithmetic itself? When we examine the positive integers under "pairwise comparison, always consistent, independent of order," why does each prime number $p = 2, 3, 5, 7, \dots$ stand out as an independent orthogonal axis? Let us open [Chapter 22](ch22-primes-euler-products-and-zeros.md).
