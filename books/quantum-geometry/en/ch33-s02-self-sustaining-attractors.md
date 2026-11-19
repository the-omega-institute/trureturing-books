# 34.2 Every Observer Is an Attractor: Self-Sustaining Contraction Basins {#every-observer-is-an-attractor-self-sustaining-contraction-basins}

Recognizing that all beings are observers immediately raises a sharper dynamical question: **why must an observer be more than a passive photographic plate—why is every observer necessarily *an attractor in its own right*?**

Run a simple physical thought experiment. Every finite observer inside the universe is bombarded at every instant by thermal fluctuations, stray radiation, and environmental erasure ([Chapter 27](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness], Conjunct 1). Suppose an observer's internal dynamics around its current state were **neutrally drifting** or **locally expansive**—like a marble perched on a flat tabletop or balanced atop an inverted bowl. Within a handful of random collisions, small orthogonal kicks would accumulate into a random walk, driving its internal phase away until "yesterday's me" and "today's me" shared near-zero inner product and dissolved into thermal white noise.

Consequently, **any being that persists across time as "I am still I"—whether a diamond lattice shaking off thermal phonons or a living mind retaining its identity as metabolic turnover renews much of its body—must carve out a self-sustaining contraction basin $\psi_i = \psi_i(\psi_i)$ around its acceptance window (`MODEL`)**! Within this model, the self-referential loop depicts inward restoration and local stability after a perturbation; Conjunct 1 of [@thm-ch33-contextual-attractor-and-common-factor] below concerns stabilization by deletion from finite sets, while the real cosine model is analyzed separately in [@ex-ch33-mutual-cosine-monotonic-lock].

::: {.figure src="ch33-contracting-well"}
**Only a contracting well pulls a perturbed observer back.** On each profile the amber marble is where it is now and the grey rings where it was: on the flat table a sequence of kicks lets it drift from where it started; on the inverted bowl it moves farther from the top at every step; in the well, kicked up the right slope, it brings its distance from the bottom down by a factor $0.45$ at every step, towards the cyan window $W + u_i$. This is the schematic `MODEL`, not the content of [@thm-ch33-contextual-attractor-and-common-factor].
:::

Across `trureturing`'s fixed-point-stability and concept-dynamics modules, four theorems supply distinct parts of a structural scaffold: a fixed update that only deletes from finite sets stabilizes; an adjacent-stage relation and equal readouts constitute a relative fixed-point predicate; a Boolean context example witnesses distinct fixed meanings; and an objective claim carries an invariant-factor proof by definition. The last three clauses are unfoldings of definitions; these clauses supply no dynamics restoring a perturbed physical system: the basin and its convergence remain part of the `MODEL` above:

::: {.theorem #thm-ch33-contextual-attractor-and-common-factor title="Finite Contracting Stabilization, Contextual Fixed-Point Selection, and the Invariant Common-Factor Law" lean="D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor"}
Across the frozen finite-contracting-stability and interpretation-fixed-point modules of `trureturing`, the following four theorems hold simultaneously:

1. **Finite-Step Stabilization and Transition Bound of Contracting Set Updates** ([`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)): Let $X$ be a finite type (`[Finite X]`), let $U : \operatorname{Set} X \to \operatorname{Set} X$ satisfy inward contraction $\forall A : \operatorname{Set} X,\; U(A) \subseteq A$, and let $S : \mathbb{N} \to \operatorname{Set} X$ satisfy $\forall n \in \mathbb{N},\; S(n + 1) = U(S(n))$. Then $S$ stabilizes permanently within $(S(0)).\operatorname{ncard}$ steps and undergoes at most $(S(0)).\operatorname{ncard}$ strict state changes:

   $$
   \bigl(\exists N \le (S(0)).\operatorname{ncard},\; \forall n \ge N,\; S(n) = S(N)\bigr) \;\land\; \{n \in \mathbb{N} \mid S(n + 1) \neq S(n)\}.\operatorname{ncard} \le (S(0)).\operatorname{ncard};
   $$

2. **Reaching a Relative Interpretation Fixed Point** ([`conceptual_equivalence_and_stability_reach_fixed_point`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point)): For arbitrary types `Text`, `ReaderAdmission`, `Background`, `EvaluationGoal`, `Rule`, `Concept`, `Meaning`, relation $\mathrm{conceptuallyEquivalent} : \mathrm{Concept} \to \mathrm{Concept} \to \mathrm{Prop}$, evaluator $\mathrm{interpret} : \operatorname{InterpretationContext}\;\mathrm{Text}\;\mathrm{ReaderAdmission}\;\mathrm{Background}\;\mathrm{EvaluationGoal}\;\mathrm{Rule} \to \mathrm{Concept} \to \mathrm{Meaning}$, trajectory $\mathrm{concepts} : \mathbb{N} \to \mathrm{Concept}$, fixed `context`, and stage $n \in \mathbb{N}$, adjacent conceptual equivalence $\mathrm{conceptuallyEquivalent}(\mathrm{concepts}(n+1), \mathrm{concepts}(n))$ together with interpretive stability $\mathrm{interpret}\;\mathrm{context}\;(\mathrm{concepts}(n+1)) = \mathrm{interpret}\;\mathrm{context}\;(\mathrm{concepts}(n))$ establishes `IsRelativeInterpretationFixedPoint conceptuallyEquivalent interpret concepts context n`;
3. **Distinct Fixed Points Selected by Observer Context Parameters** ([`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)): On `BinaryInterpretationContext = InterpretationContext Unit Bool Bool Bool Unit`, `baselineContext` (with `readerAdmission`, `background`, `evaluationGoal` all `false`) and `alternateContext` (all `true`) share identical `text = ()` and `interpretationRule = ()`, differ on all three observer context parameters, and select distinct fixed meanings under `IsBinaryFixedMeaning`:

   $$
   \begin{aligned}
   &\operatorname{IsBinaryFixedMeaning}\;\mathrm{baselineContext}\;(\mathrm{false}, \mathrm{false}, \mathrm{false}) \\
    &\;\land\; \operatorname{IsBinaryFixedMeaning}\;\mathrm{alternateContext}\;(\mathrm{true}, \mathrm{true}, \mathrm{true}) \\
    &\;\land\; (\mathrm{false}, \mathrm{false}, \mathrm{false}) \neq (\mathrm{true}, \mathrm{true}, \mathrm{true});
   \end{aligned}
   $$

4. **Invariant Common-Factor Requirement for Objective Claims** ([`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)): For arbitrary types `Context`, `Meaning`, `Factor`, fixed-point predicate $\mathrm{isFixedMeaning} : \mathrm{Context} \to \mathrm{Meaning} \to \mathrm{Prop}$, and projection $\mathrm{factor} : \mathrm{Meaning} \to \mathrm{Factor}$, every proof-carrying `ObjectiveInterpretationClaim isFixedMeaning factor` supplies an invariant common factor shared across all contexts and their fixed meanings:

   $$
   \exists\,\mathrm{commonFactor} : \mathrm{Factor},\quad \forall\,\mathrm{context}\;\mathrm{meaning},\quad \mathrm{isFixedMeaning}\;\mathrm{context}\;\mathrm{meaning} \implies \mathrm{factor}\;\mathrm{meaning} = \mathrm{commonFactor}.
   $$
:::

::: proof
Conjunct 1 deduces from $S(n+1) = U(S(n)) \subseteq S(n)$ that $n \mapsto (S(n)).\operatorname{ncard}$ is antitone in $\mathbb{N}$; any equal-cardinality step forces set equality via `Set.eq_of_subset_of_ncard_le` and freezes all subsequent steps, so `Nat.stabilises_of_antitone` yields $N \le (S(0)).\operatorname{ncard}$ while inclusion of strict-change indices inside `Set.Iio N` bounds total transitions. Conjunct 2 packages conceptual equivalence and context-relative output equality via `And.intro`. Conjunct 3 checks field equalities by reflexivity and separates `(false, false, false)` from `(true, true, true)` via `Bool.false_ne_true` on `Prod.fst`. Conjunct 4 unfolds `ObjectiveInterpretationClaim` directly to extract the witness `commonFactor`. The full proof is checked by the Lean kernel.
:::

Conjuncts 3 and 4 of [@thm-ch33-contextual-attractor-and-common-factor] (both unfoldings of definitions, whose notation we borrow here for the book's reading) illuminate why plurality and objectivity coexist without an external throne: in our **`MODEL` (interpretive model)**, even when reading the very same ambient lattice (`text = ()`) under the same geometric product (`interpretationRule = ()`), two observers carrying distinct internal parameters $u_A \neq u_B$ (`readerAdmission`, `background`, `evaluationGoal`) can correspond to distinct local fixed-point slices; meanwhile, a claim to objective public fact must choose a factor map on a declared family of contexts and meanings and prove that it takes the same **invariant `commonFactor`** on every admitted fixed meaning! The box below says where this window-reconnection geometry and the contrast between solitary and mutual reference are drawn:

::: {.remark #rem-ch33-mutual-attractor-figure title="Mutual-Attractor Window Reconnection and Cosine Monotonic-Locking Diagram (Figure Guide, Not Formalized in This Book)"}
**Figure guide, not formalized in this book.** Our mutual-attractor reconnection `MODEL` rests on cut-and-project quasicrystal window geometry ([@rem-ch32-icosian-e8-literature]) and on the formal bridge-graph min-cut switching ([@prop-ch33-bridge-reconnection-mincut], `LEAN ✓`): the intersection of two windows is drawn in the figure of the window-intersection section below, and the min-cut reconnection in that section's two lab cards. The cobweb trajectories of the classical real-analysis example [@ex-ch33-mutual-cosine-monotonic-lock] are drawn in Panel III of Figure 34 and in the lab cards of the next section: the solitary sequence counts single steps, while the mutual sequence counts complete rounds of two cosine evaluations, corresponding to even-tick sampling of synchronous mutual reference.
:::

---
