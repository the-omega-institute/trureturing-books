# 24.2 Context-Relative Interpretation Fixed Points and Contextual Non-Uniqueness {#sec-ch24-2}

Consider next how an observer or formal interpreter evaluates a sequence of concepts $c_0, c_1, c_2, \dots$. What does it mean for interpretation to reach a single-step relative fixed point at stage $n$ — and is the fixed meaning of a context absolute, or relative to the **interpretation context**?

In the Lean module `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint`, an interpretation context is formalized as a five-field structure packaging `text`, `readerAdmission`, `background`, `evaluationGoal`, and `interpretationRule`.

::: {.definition #def-relative-interpretation-fixed-point title="Interpretation Context, Relative Interpretation Fixed Point, and Binary Fixed Meaning" lean="D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.InterpretationContext D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsRelativeInterpretationFixedPoint D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsBinaryFixedMeaning"}
In module `InterpretationFixedPoint`:

1. **Interpretation context structure** [`InterpretationContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.InterpretationContext): a five-tuple of `text`, `readerAdmission`, `background`, `evaluationGoal`, and `interpretationRule`;
2. **Relative interpretation fixed point** [`IsRelativeInterpretationFixedPoint`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsRelativeInterpretationFixedPoint): given a conceptual equivalence relation $\sim_C : \mathrm{Concept} \to \mathrm{Concept} \to \mathrm{Prop}$, a context-dependent interpretation map $\operatorname{interpret} : \mathrm{Context} \to \mathrm{Concept} \to \mathrm{Meaning}$, a concept sequence $c : \mathbb{N} \to \mathrm{Concept}$, and a context $\mathcal{C}$, stage $n \in \mathbb{N}$ is a **relative interpretation fixed point** if

   $$
   c(n+1) \sim_C c(n) \;\land\; \operatorname{interpret}(\mathcal{C}, c(n+1)) = \operatorname{interpret}(\mathcal{C}, c(n)) \,;
   $$

3. **Binary fixed-meaning predicate** [`IsBinaryFixedMeaning`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsBinaryFixedMeaning): on $\mathrm{BinaryInterpretationContext} = \operatorname{InterpretationContext}\ \mathrm{Unit}\ \mathrm{Bool}\ \mathrm{Bool}\ \mathrm{Bool}\ \mathrm{Unit}$, a meaning triple $m \in \mathrm{Bool}^3$ is the fixed meaning of $\mathcal{C}$ if $m = (\mathcal{C}.\mathrm{readerAdmission},\, \mathcal{C}.\mathrm{background},\, \mathcal{C}.\mathrm{evaluationGoal})$.
:::

Two kernel-verified theorems immediately characterize **single-step adjacent conceptual/interpretive agreement** and **contextual non-uniqueness**. Note carefully that, unlike the finite-set stabilization theorem of §24.1 ([@thm-finite-contracting-updates-stabilize]) or Banach contraction on $[0, 1]$ in §24.4, [`IsRelativeInterpretationFixedPoint`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsRelativeInterpretationFixedPoint) tests only adjacent agreement between $c(n+1)$ and $c(n)$ at a specified index $n$ without imposing a recurrence or asymptotic convergence on later stages $m > n$ (for instance, the sequence $0, 0, 1, 1, \dots$ under equality and the identity interpretation satisfies the predicate at $n = 0$ while changing at $n = 1$); likewise, the binary-context proposition below establishes **contextual non-uniqueness** (two static contexts selecting two distinct fixed meanings), rather than dynamical bifurcation or attracting bistability of a single autonomous iteration.

::: {.lemma #lem-conceptual-equivalence-stability-fixed-point title="Conceptual Equivalence and Interpretation Stability Reach a Relative Fixed Point" lean="D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point"}
Let `Text`, `ReaderAdmission`, `Background`, `EvaluationGoal`, `Rule`, `Concept`, and `Meaning` be arbitrary types. Given $\operatorname{conceptuallyEquivalent} : \mathrm{Concept} \to \mathrm{Concept} \to \mathrm{Prop}$, $\operatorname{interpret}$, $\operatorname{concepts} : \mathbb{N} \to \mathrm{Concept}$, $\operatorname{context}$, and $n \in \mathbb{N}$, suppose:

1. **Conceptual equivalence (`hConcept`)**: $\operatorname{conceptuallyEquivalent}(\operatorname{concepts}(n+1), \operatorname{concepts}(n))$;
2. **Interpretation stability (`hStable`)**: $\operatorname{interpret}(\operatorname{context}, \operatorname{concepts}(n+1)) = \operatorname{interpret}(\operatorname{context}, \operatorname{concepts}(n))$.

Then stage $n$ is a relative interpretation fixed point in $\operatorname{context}$:

$$
\operatorname{IsRelativeInterpretationFixedPoint}(\operatorname{conceptuallyEquivalent}, \operatorname{interpret}, \operatorname{concepts}, \operatorname{context}, n).
$$
:::

::: proof
Unfolding [`IsRelativeInterpretationFixedPoint`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsRelativeInterpretationFixedPoint) in [@def-relative-interpretation-fixed-point] and pairing `hConcept` with `hStable` via `And.intro` establishes the claim directly. The full proof is checked by the Lean kernel.
:::

What if two observers read the **exact same text** (`text`) under the **exact same formal rule** (`interpretationRule`), differing only in their admission stance (`readerAdmission`), background frame (`background`), and evaluation goal (`evaluationGoal`)? The next proposition proves via the explicit witnesses [`baselineContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.baselineContext) and [`alternateContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.alternateContext) that shifting those contextual parameters selects two strictly distinct fixed meanings ([`IsBinaryFixedMeaning`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsBinaryFixedMeaning)) — demonstrating **contextual non-uniqueness** (analogous to how choosing $+\vv{e}_3$ vs. $-\vv{e}_3$ on the sphere selects opposite eigenstates, or how $\cos\theta = +\theta$ and $\cos\theta = -\theta$ have distinct roots $+\theta^*$ and $-\theta^*$).

::: {.proposition #prop-context-parameters-distinct-fixed-points title="Distinct Fixed Points Selected by Context Parameters Under Identical Text and Rule" lean="D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points"}
For [`baselineContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.baselineContext) $= ((), \mathrm{false}, \mathrm{false}, \mathrm{false}, ())$ and [`alternateContext`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.alternateContext) $= ((), \mathrm{true}, \mathrm{true}, \mathrm{true}, ())$, all eight conjuncts hold simultaneously:

1. **Same text**: $\operatorname{baselineContext}.\mathrm{text} = \operatorname{alternateContext}.\mathrm{text}$;
2. **Same interpretation rule**: $\operatorname{baselineContext}.\mathrm{interpretationRule} = \operatorname{alternateContext}.\mathrm{interpretationRule}$;
3. **Distinct reader admission**: $\operatorname{baselineContext}.\mathrm{readerAdmission} \neq \operatorname{alternateContext}.\mathrm{readerAdmission}$;
4. **Distinct background**: $\operatorname{baselineContext}.\mathrm{background} \neq \operatorname{alternateContext}.\mathrm{background}$;
5. **Distinct evaluation goal**: $\operatorname{baselineContext}.\mathrm{evaluationGoal} \neq \operatorname{alternateContext}.\mathrm{evaluationGoal}$;
6. **Baseline fixed meaning**: $\operatorname{IsBinaryFixedMeaning}\ \operatorname{baselineContext}\ (\mathrm{false}, \mathrm{false}, \mathrm{false})$;
7. **Alternate fixed meaning**: $\operatorname{IsBinaryFixedMeaning}\ \operatorname{alternateContext}\ (\mathrm{true}, \mathrm{true}, \mathrm{true})$;
8. **Strict distinctness of fixed meanings**: $(\mathrm{false}, \mathrm{false}, \mathrm{false}) \neq (\mathrm{true}, \mathrm{true}, \mathrm{true})$.
:::

::: proof
Conjuncts 1 and 2 hold by `rfl` on `Unit`; conjuncts 3, 4, and 5 follow from `Bool.false_ne_true`; conjuncts 6 and 7 hold by `rfl` upon unfolding [`IsBinaryFixedMeaning`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.IsBinaryFixedMeaning); and conjunct 8 applies `congrArg Prod.fst` to reduce tuple equality to `false = true`, which contradicts `Bool.false_ne_true`. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch24-two-contexts"}
**Same text, same rule: change three slots and the fixed meaning changes.** The two columns are the five fields of `baselineContext` and `alternateContext`: the text and the interpretation rule are both $()$, joined by dashed lines to show they are equal; the three middle slots are all F on the left and all T on the right. Under the arrows are the fixed meanings $(\mathrm{F}, \mathrm{F}, \mathrm{F}) \neq (\mathrm{T}, \mathrm{T}, \mathrm{T})$ ([@prop-context-parameters-distinct-fixed-points]).
:::

(Moreover, as shown by [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor) in the same module, any claim of cross-context objectivity must supply an explicit invariant factor map taking the same value across all contextual fixed meanings — matching our basis-free trace pairing $\Tr(\rho P)$ from [Chapter 2](ch02-born-rule.md)!)
