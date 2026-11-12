# Chapter 24 Cosine Fixed Points and Self-Reference: From $\cos\theta = \theta$ to $\psi = \psi(\psi)$

> *"If cos(theta) = theta, where did cos come from? Is cos equal to theta?"*
>
> *"This is the psi = psi(psi) we investigated from the very beginning."*

After a twenty-three-chapter ascent, we stand at the culmination of Part VI (*Crossing the Horizon — Spheres Beyond Spheres*) and at the philosophical summit of the entire book.

Draw straight the single geometric thread that has guided us since page one:

- In [Chapter 1](ch01-measurement.md) and [Chapter 2](ch02-born-rule.md), we eliminated the external "third point $C$" and showed that when a known reference state $\vv{a}$ measures (*liáng*) a target state $\vv{b}$, the relative angle $\theta$ spanned between them projects directly onto the compatibility reading $\cos\theta$;
- In [Chapter 21](ch21-diagonalization-and-escape.md), we proved that whenever the "language that measures" (a surjective `decoderCatalog` over a nonempty address space) is separated from the "coordinate that is measured" (`latent`) and paired with a fixed-point-free `twist`, the relative semantic diagonal splits the latent topology and forces a strict observation-topology refinement (with each further stage conditional on supplying a new surjective catalog over an enlarged address space).

How, then, can that infinite regress of spheres beyond spheres ever come to rest in a self-contained **self-referential fixed point**?

The epigraph suggests a particular feedback choice: **use the dimensionless compatibility reading $\cos\theta_k$ from one comparison as the numerical angle in radians for the next**, so that $\theta_{k+1} = \cos\theta_k$. This is the update rule adopted here; pairwise comparison or dispensing with an external ruler does not force it. A different feedback function or angular scale gives a different iteration. For this radian-based rule, a fixed point satisfies

$$
\cos\theta^* = \theta^* \qquad (\theta^* \approx 0.7390851332\dots),
$$

ask once more: **in this equation, where did the operator $\cos$ on the left come from? Is there really a bare number $\theta^*$ standing apart from the operation $\cos$?**

Within the book's geometric ontology of orthogonal comparison, the author reads $\cos(\cdot)$ as the act of projection measurement and $\theta^*$ as the self-consistent equilibrium of this feedback. Mathematically, $\cos : \mathbb{R}\to\mathbb{R}$ is a function and $\theta^*\in\mathbb{R}$ is a scalar: $\cos\theta^*=\theta^*$ equates the output at that input with the input, without identifying the function with a number. The author's interpretation of ruler and reading, and of the dissolution of subject and object, is condensed into the title-page aphorism:

$$
\psi = \psi(\psi).
$$

In this chapter we unfold this self-referential closure across four mathematical levels: **the Lean-verified stabilization theorem for contracting updates on finite sets**, **single-step context-relative interpretation fixed points and contextual non-uniqueness**, **the unique positive algebraic fixed point $\varphi = \frac{1+\sqrt{5}}{2}$ of the golden reciprocal map $x = 1 + 1/x$**, and **the classical analytic and number-theoretic background of cosine self-reference $\cos\theta^* = \theta^*$** recorded in the literature remarks [@rem-banach-dottie-hairy-ball-literature] and [@rem-dottie-angle-incommensurable].

::: {.figure src="ch24-overview"}
**Figure 24.** The chapter at a glance. Panel I: the cyan cosine curve and the grey diagonal $y = x$, with the cobweb from $0$ winding into $\theta^* \approx 0.739$ (convergence applies existing results; full derivation in [@ex-ch33-mutual-cosine-monotonic-lock]). Panel II: the candidate set $\{0, 1, 2\}$ loses one element per step and stops changing at $\{0\}$ ([@thm-finite-contracting-updates-stabilize]). Panel III: the cyan curve $y = 1 + 1/x$ meets the diagonal on the positive half-line only at the green point $\varphi \approx 1.618$ ([@cor-golden-fixed-point-unique]).
:::

## 24.1 Discrete Contraction Must Stabilize: The Finite Contracting Update Theorem {#sec-ch24-1}

In [Chapter 21](ch21-diagonalization-and-escape.md), a diagonal driven by a fixed-point-free `twist` escapes the given catalog, whereas some feedback updates settle at a fixed point. What additional conditions guarantee stability?

First compare two different stabilization mechanisms. On $[0,1]$, the derivative bound $|\cos'\theta|=|\sin\theta|\le\sin1<1$ makes $\cos$ contract distances between any two points, and iteration converges to a unique fixed point. A finite-set update instead requires only **that no candidates be added**: $U : \mathcal{P}(X)\to\mathcal{P}(X)$ satisfies $U(A)\subseteq A$ for every $A\subseteq X$. This pruning condition concerns order rather than metric contraction; it does not even require $U$ to preserve inclusion between arbitrary pairs of sets. Finiteness makes the pruning stop.

In the Lean module `D5/S1/FixedPoints/FiniteContractingStability`, we establish this discrete stabilization law. Note carefully every hypothesis retained in the theorem box — finiteness of the ambient type (`[Finite X]`), pointwise subset contraction (`hU : ∀ A, U A ⊆ A`), and the recursive update equation (`hS : ∀ n, S (n + 1) = U (S n)`) — together with both parts of its conclusion: eventual stabilization by step $N \le |S_0|$ *and* the sharp cardinality bound on the set of all strict changes across time.

::: {.theorem #thm-finite-contracting-updates-stabilize title="Stabilization and Strict-Change Bound for Contracting Set Updates on Finite Spaces" lean="D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize"}
Let $X$ be a finite type (`[Finite X]`), let $U : \operatorname{Set} X \to \operatorname{Set} X$ be a set update operator, and let $S : \mathbb{N} \to \operatorname{Set} X$ be a sequence of subsets satisfying:

1. **Pointwise contraction (`hU`)**: for every subset $A \subseteq X$, $U(A) \subseteq A$;
2. **Recursive update dynamics (`hS`)**: for every $n \in \mathbb{N}$, $S(n + 1) = U(S(n))$.

Then both statements hold (writing `.ncard` for natural-number set cardinality):

1. **Eventual stabilization within $|S(0)|$ steps**: there exists a stabilization index $N \le (S(0)).\mathrm{ncard}$ such that for all $n \ge N$,

   $$
   S(n) = S(N) \qquad \bigl(\text{in particular, } U(S(N)) = S(N+1) = S(N)\bigr)\,;
   $$

2. **Sharp bound on strict changes**: the number of steps at which the set changes strictly is bounded by the initial cardinality:

   $$
   \bigl\{\, n \in \mathbb{N} \;\big|\; S(n + 1) \neq S(n) \,\bigr\}.\mathrm{ncard} \;\le\; (S(0)).\mathrm{ncard}.
   $$
:::

::: proof
Combining `hS` and `hU` shows $S(n+1) = U(S(n)) \subseteq S(n)$ for every $n \in \mathbb{N}$, so the set sequence $S$ is antitone (`Antitone S`) and its natural-number cardinality sequence $n \mapsto (S(n)).\mathrm{ncard}$ is antitone as well. Whenever two consecutive cardinalities agree, $(S(n)).\mathrm{ncard} = (S(n+1)).\mathrm{ncard}$, equality of cardinalities for a finite subset $S(n+1) \subseteq S(n)$ forces set equality $S(n+1) = S(n)$ (`Set.eq_of_subset_of_ncard_le`); applying $U$ and `hS` then gives $S(n+2) = U(S(n+1)) = U(S(n)) = S(n+1)$, locking all subsequent sets and cardinalities. Applying Mathlib's `Nat.stabilises_of_antitone` to the cardinality sequence yields $N \le (S(0)).\mathrm{ncard}$ with $S(n) = S(N)$ for all $n \ge N$ (claim 1). For claim 2, any index $n$ with $S(n+1) \neq S(n)$ must satisfy $n < N$ (since $n \ge N$ implies $S(n+1) = S(N) = S(n)$), embedding $\{n \in \mathbb{N} \mid S(n+1) \neq S(n)\}$ into $\operatorname{Set.Iio}(N) = \{0, \dots, N-1\}$, whose cardinality is $N \le (S(0)).\mathrm{ncard}$. The full proof is checked by the Lean kernel.
:::

[@thm-finite-contracting-updates-stabilize] gives a discrete foundation for finite candidate pruning: its update rule reaches $U(S_N)=S_N$ in at most $|S_0|$ steps. The stable set can depend on the initial set and can be empty. For example, $U(A)=A$ makes every set a fixed point, whereas $U(A)=\varnothing$ deletes all candidates; both satisfy the hypothesis. A unique or nonempty self-consistent core therefore requires additional assumptions.

::: {.figure src="ch24-three-stops"}
**They all stop, but not necessarily at the same place.** All three rows start from $S_0 = \{0, 1, 2\}$ and apply the update once per step to the right until two neighbours agree; the box where a row stops is outlined in cyan, and the small loop says one more step gives it again. Row one is the text's example, 'drop the largest element above $0$', stopping at $\{0\}$; row two, $U(A) = A$, stops at once at $\{0, 1, 2\}$; row three, $U(A) = \varnothing$, stops at the empty set. All three meet the hypotheses of [@thm-finite-contracting-updates-stabilize] and stop within $|S_0| = 3$ steps.
:::

## 24.2 Context-Relative Interpretation Fixed Points and Contextual Non-Uniqueness {#sec-ch24-2}

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

## 24.3 The Unique Algebraic Golden Lock: $x = 1 + 1/x$ and $\varphi = \frac{1+\sqrt{5}}{2}$ {#sec-ch24-3}

Before stepping into the cosine self-referential equation $\cos\theta = \theta$ (Section 24.4), let us examine the cleanest **rational self-referential fixed point** on the positive real half-line $(0, +\infty)$:

Combine the two elementary arithmetic operations "add $1$" and "invert $1/x$" into the continued-fraction feedback loop

$$
x_{k+1} = 1 + \frac{1}{x_k}, \qquad x_0>0.
$$

A finite expansion has only finitely many fraction layers, with the initial value $x_0$ still at the bottom. The infinite continued fraction $1+1/(1+1/(\cdots))$ denotes the limit of these truncations, whose convergence must be established separately; it is not equal to every finite $x_{k+1}$. The example below gives a direct convergence argument.

In `D5/S1/FixedPoints/Algebraic/GoldenFixedPoint`, this reciprocal residual map is formalized as [`goldenReciprocalMap`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap).

::: {.definition #def-golden-reciprocal-map title="The Golden Reciprocal Map goldenReciprocalMap" lean="D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap"}
On the real numbers $\mathbb{R}$, define the **golden reciprocal map** [`goldenReciprocalMap`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap) $: \mathbb{R} \to \mathbb{R}$ by

$$
\operatorname{goldenReciprocalMap}(x) \;:=\; 1 + \frac{1}{x}.
$$
:::

The next corollary proves that across all positive real numbers $x > 0$, the self-referential equation $\operatorname{goldenReciprocalMap}(x) = x$ locks onto **one and only one positive fixed point** — the golden ratio $\varphi = \frac{1 + \sqrt{5}}{2}$!

::: {.corollary #cor-golden-fixed-point-unique title="Uniqueness of the Golden Ratio as a Positive Fixed Point of the Reciprocal Map" lean="D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique"}
For $\operatorname{goldenReciprocalMap}(x) = 1 + 1/x$ of [@def-golden-reciprocal-map], all three properties hold:

1. **Positivity**: $0 < \frac{1 + \sqrt{5}}{2}$;
2. **Fixed-point identity**: $\operatorname{goldenReciprocalMap}\left(\frac{1 + \sqrt{5}}{2}\right) = \frac{1 + \sqrt{5}}{2}$;
3. **Uniqueness on the positive reals**: for every real number $x > 0$,

   $$
   \operatorname{goldenReciprocalMap}(x) = x \quad\Longleftrightarrow\quad x = \frac{1 + \sqrt{5}}{2}.
   $$
:::

::: proof
Rewriting $\frac{1 + \sqrt{5}}{2}$ as `Real.goldenRatio` via [`golden_ratio_spec`](lean:D5/S0/Carrier/GoldenRatio.golden_ratio_spec), claim 1 is `Real.goldenRatio_pos` and claim 2 is `golden_ratio_reciprocal_fixed_point` ($1 + 1/\varphi = \varphi$). For claim 3, let $x > 0$ (so $x \neq 0$). The reverse implication is immediate from claim 2. Conversely, if $1 + 1/x = x$, clearing the nonzero denominator via `quadratic_fixed_point_iff` yields $x^2 = x + 1$. Subtracting $\varphi^2 = \varphi + 1$ factors as

$$
(x - \varphi)(x + \varphi - 1) = x^2 - \varphi^2 - (x - \varphi) = 0.
$$

Since $x > 0$ and $\varphi > 1$ (`Real.one_lt_goldenRatio`), the second factor is strictly positive ($x + \varphi - 1 > 0$), forcing $x - \varphi = 0$, i.e., $x = \frac{1 + \sqrt{5}}{2}$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="fixed-point-convergence" preset="golden" height="500"}
**Closing on φ from both sides.** Pressing $1 + 1/x$ again and again from $x_0 = 1$, the path lands on $2, \frac{3}{2}, \frac{5}{3}, \frac{8}{5}, \dots$ and closes in, from alternating sides, on $\varphi$, where the cyan curve $y = 1 + 1/x$ meets the grey line $y = x$; each turn is about $1/\varphi^2 \approx 0.382$ times as wide as the one before, the size of the slope of the dashed magenta line (the tangent at the fixed point). That this crossing is the only positive fixed point is [@cor-golden-fixed-point-unique]; the convergence and its rate are the page's numerical illustration.
:::

[@cor-golden-fixed-point-unique] answers "what is the fixed point of $1 + 1/x$" but steps around an earlier question: **why $1 + 1/x$?** Calling it "the simplest combination of adding one and taking a reciprocal" is an impression. To turn the impression into a theorem, one has to list every map of the same kind and examine each.

"The same kind" means the fractional linear maps $x \mapsto \frac{ax + b}{cx + d}$ whose coefficients are only $0$ and $1$. Setting the map equal to $x$ and clearing the denominator gives the fixed-point equation

$$
c\,x^2 + (d - a)\,x - b \;=\; 0,
$$

with discriminant $(d - a)^2 + 4bc$. The Lean module `D5/S0/Diagonal/SelfApplicationFates` defines these quantities one by one and assigns each map a "self-application fate" according to the shape of its equation.

::: {.definition #def-binary-fractional-map-fates title="Binary Fractional Maps, Fixed-Point Coefficients, Discriminant, and the Four Self-Application Fates" lean="D5/S0/Diagonal/SelfApplicationFates.BinaryFractionalMap D5/S0/Diagonal/SelfApplicationFates.determinant D5/S0/Diagonal/SelfApplicationFates.Nondegenerate D5/S0/Diagonal/SelfApplicationFates.fixedCoefficients D5/S0/Diagonal/SelfApplicationFates.discriminant D5/S0/Diagonal/SelfApplicationFates.SelfApplicationFate D5/S0/Diagonal/SelfApplicationFates.HasFate D5/S0/Diagonal/SelfApplicationFates.IsPhiFamily"}
In the module `SelfApplicationFates`:

1. A **binary fractional map** [`BinaryFractionalMap`](lean:D5/S0/Diagonal/SelfApplicationFates.BinaryFractionalMap) is a structure with four components $a, b, c, d$ taking values in $\operatorname{Fin} 2 = \{0, 1\}$;
2. The **determinant** [`determinant`](lean:D5/S0/Diagonal/SelfApplicationFates.determinant) is the integer $\operatorname{determinant} m = a\,d - b\,c$; $m$ is **nondegenerate** ([`Nondegenerate`](lean:D5/S0/Diagonal/SelfApplicationFates.Nondegenerate)) if $\operatorname{determinant} m \neq 0$;
3. The **fixed-point coefficients** [`fixedCoefficients`](lean:D5/S0/Diagonal/SelfApplicationFates.fixedCoefficients) are the integer triple $\operatorname{fixedCoefficients} m = (c,\; d - a,\; -b)$;
4. The **discriminant** [`discriminant`](lean:D5/S0/Diagonal/SelfApplicationFates.discriminant) is the integer $\operatorname{discriminant} m = (d - a)^2 + 4\,b\,c$;
5. The **self-application fate** [`SelfApplicationFate`](lean:D5/S0/Diagonal/SelfApplicationFates.SelfApplicationFate) is an inductive type with exactly four constructors `empty`, `dead`, `collapse`, `live`; the predicate [`HasFate`](lean:D5/S0/Diagonal/SelfApplicationFates.HasFate) $m$ is defined on the four constructors by:
   - `empty`: $\operatorname{fixedCoefficients} m = (0, 0, 0)$;
   - `dead`: $\operatorname{fixedCoefficients} m = (0, 0, -1)$;
   - `collapse`: $\operatorname{discriminant} m = 0$ or $\operatorname{discriminant} m = 4$, and $\operatorname{fixedCoefficients} m \neq (0, 0, 0)$, and $\operatorname{fixedCoefficients} m \neq (0, 0, -1)$;
   - `live`: $\operatorname{discriminant} m = 5$;
6. The **$\varphi$-family** [`IsPhiFamily`](lean:D5/S0/Diagonal/SelfApplicationFates.IsPhiFamily) $m$ is defined as $(a, b, c, d) = (1, 1, 1, 0)$ or $(a, b, c, d) = (0, 1, 1, 1)$.
:::

Reading the four bits $(a, b, c, d)$ as the map $x \mapsto \frac{ax+b}{cx+d}$ is this book's interpretation; the Lean definitions in [@def-binary-fractional-map-fates] involve only the four bits and the integers computed from them. (The same module also contains [`fixedPolynomial`](lean:D5/S0/Diagonal/SelfApplicationFates.fixedPolynomial), whose value at a rational $x$ is $c\,x^2 + (d - a)\,x - b$, the left-hand side of the fixed-point equation above.) The four names mean what they say: `empty` is the equation $0 = 0$, where every point is fixed and the equation carries no information; `dead` is the equation $-1 = 0$, with no fixed point; `collapse` is the case of a perfect-square discriminant $0$ or $4$, where the roots fall back into the rationals; `live` is the case of discriminant $5$, where the roots are irrational.

::: {.theorem #thm-self-application-four-fates title="The Four Self-Application Fates of Nondegenerate Binary Fractional Maps and the Characterization of the φ-Family" lean="D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates"}
Let $m$ be a binary fractional map ([@def-binary-fractional-map-fates]) that is nondegenerate (`hm : Nondegenerate m`). Then all four of the following hold:

1. **A fate exists and is unique**: there is exactly one $\mathrm{fate}$ such that $\operatorname{HasFate}\ m\ \mathrm{fate}$;
2. **`live` if and only if in the $\varphi$-family**:

   $$
   \operatorname{HasFate}\ m\ \mathtt{live} \quad\Longleftrightarrow\quad \operatorname{IsPhiFamily}\ m\,;
   $$

3. **Fixed-point coefficients when `live`**: if $\operatorname{HasFate}\ m\ \mathtt{live}$, then $\operatorname{fixedCoefficients} m = (1, -1, -1)$ or $\operatorname{fixedCoefficients} m = (1, 1, -1)$;
4. **Discriminant when `live`**: if $\operatorname{HasFate}\ m\ \mathtt{live}$, then $\operatorname{discriminant} m = 1^2 + 4$.
:::

::: proof
`BinaryFractionalMap` has only $2^4 = 16$ elements. The proof splits $m$ into its four components, cases on each being $0$ or $1$ (`fin_cases`), and simplifies the hypothesis `hm` with `norm_num`, which discards the degenerate cases at once. In each remaining case, existence in claim 1 is obtained by exhibiting the corresponding constructor and deciding it with `decide`, and uniqueness by casing on the four constructors and simplifying after unfolding `HasFate`, `fixedCoefficients`, and `discriminant`; claims 2, 3, and 4 are decidable propositions on a finite case and are settled by `decide`. The full proof is checked by the Lean kernel.
:::

There are only six nondegenerate binary fractional maps, so all of them can be laid on the table.

::: {.example #ex-six-binary-fractional-maps title="Enumerating the Six Nondegenerate Binary Fractional Maps"}
Exactly six quadruples with $a, b, c, d \in \{0, 1\}$ have determinant $ad - bc \neq 0$: three with $a = d = 1$ and $bc = 0$, and three with $b = c = 1$ and $ad = 0$. Computing the quantities of [@def-binary-fractional-map-fates] one by one:

| $(a, b, c, d)$ | map $x \mapsto \frac{ax+b}{cx+d}$ | fixed-point equation | discriminant | fate | real fixed points |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $(1, 0, 0, 1)$ | $x \mapsto x$ | $0 = 0$ | $0$ | `empty` | every $x$ |
| $(1, 1, 0, 1)$ | $x \mapsto x + 1$ | $-1 = 0$ | $0$ | `dead` | none |
| $(1, 0, 1, 1)$ | $x \mapsto \frac{x}{x+1}$ | $x^2 = 0$ | $0$ | `collapse` | $0$ |
| $(0, 1, 1, 0)$ | $x \mapsto \frac{1}{x}$ | $x^2 - 1 = 0$ | $4$ | `collapse` | $\pm 1$ |
| $(1, 1, 1, 0)$ | $x \mapsto 1 + \frac{1}{x}$ | $x^2 - x - 1 = 0$ | $5$ | `live` | $\varphi,\ -\varphi^{-1}$ |
| $(0, 1, 1, 1)$ | $x \mapsto \frac{1}{1+x}$ | $x^2 + x - 1 = 0$ | $5$ | `live` | $\varphi^{-1},\ -\varphi$ |

Every row has exactly one fate, in agreement with claim 1 of [@thm-self-application-four-fates]; the two `live` rows are precisely the $\varphi$-family, with fixed-point coefficients $(1, -1, -1)$ and $(1, 1, -1)$, in agreement with claims 2 and 3. The two `live` maps are conjugate to each other: if $x = 1 + 1/x$, then $y = 1/x$ satisfies $y = 1/(1 + y)$.
:::

So $1 + 1/x$ was not picked at random. Among all six nondegenerate fractional maps that can be written with $0$ and $1$, one says nothing, one has nowhere to stop, two stop at rational numbers, and only $1 + 1/x$ and its conjugate $1/(1+x)$ stop where the rationals cannot reach. [@cor-golden-fixed-point-unique] already computed the unique positive fixed point of the former; the corresponding statement for the latter also has a frozen Lean proof.

::: {.figure src="ch24-six-maps"}
**The six maps and where they meet the diagonal.** Each small plot is one row of the table above: the ink curve is $x \mapsto \frac{ax+b}{cx+d}$, the grey dashed line is $y = x$, and the crossings are the real fixed points. The `empty` curve lies on the diagonal; the `dead` one runs parallel to it; the two `collapse` maps cross it at the cyan rationals $0$ and $\pm 1$; only the two `live` maps cross it at the magenta irrationals $\varphi, -\varphi^{-1}$ and $\varphi^{-1}, -\varphi$ ([@thm-self-application-four-fates]).
:::

::: {.lemma #lem-golden-inverse-branch-fixed-point title="The Unique Positive Fixed Point of 1/(1+x) Is the Inverse Golden Ratio" lean="D5/S3/Analytic/Characterizations/GoldenInverseBranchFixedPoint.golden_inverse_branch_positive_fixed_point_iff"}
For every real number $x$ with $0 < x$,

$$
\frac{1}{x + 1} = x \quad\Longleftrightarrow\quad x = \varphi^{-1},
$$

where $\varphi$ is Mathlib's `Real.goldenRatio`.
:::

::: proof
First extract the identity $\varphi - 1 = \varphi^{-1}$ from `golden_transfer_triangle`. Forward direction: since $x > 0$ we have $x + 1 \neq 0$, so $\frac{1}{x+1} = x$ is equivalent to $1 = x\,(x + 1)$; together with $\varphi^2 = \varphi + 1$ (`Real.goldenRatio_sq`) and $\varphi > 1$ (`Real.one_lt_goldenRatio`), nonlinear arithmetic yields $x = \varphi - 1 = \varphi^{-1}$. Reverse direction: substituting $x = \varphi^{-1}$ and using $\varphi^{-1} + 1 = \varphi$ gives $\frac{1}{\varphi^{-1} + 1} = \frac{1}{\varphi} = \varphi^{-1}$. The full proof is checked by the Lean kernel.
:::

Up to this point, golden self-reference is a purely algebraic matter: addition, division, one quadratic equation. Section 24.4 will place it alongside the cosine self-reference $\cos\theta = \theta$ (whose classical analytic and number-theoretic properties are recorded in the literature remarks of Section 24.4). Yet the two kinds of self-reference are not unrelated. The golden ratio is itself a cosine reading, taken at the angles of the regular pentagon.

::: {.proposition #prop-pentagon-golden-cosines title="The Doubled Pentagon Cosines Read the Golden Ratio, Its Inverse, and √5" lean="D5/S3/Constants/PentagonCosines.pentagon_golden_cosines"}
Let $\varphi$ denote Mathlib's `Real.goldenRatio`. All four of the following hold:

1. $2\cos\dfrac{\pi}{5} = \varphi$;
2. $2\cos\dfrac{2\pi}{5} = \varphi^{-1}$;
3. $2\cos\dfrac{\pi}{5} + 2\cos\dfrac{2\pi}{5} = \sqrt{5}$;
4. $2\cos\dfrac{2\pi}{5}$ is irrational.
:::

::: proof
Claim 1 is Mathlib's closed form `Real.cos_pi_div_five` ($\cos\frac{\pi}{5} = \frac{1 + \sqrt5}{4}$) multiplied by $2$. For claim 2, write $\frac{2\pi}{5}$ as $2\cdot\frac{\pi}{5}$ and use the double-angle formula $\cos 2\alpha = 2\cos^2\alpha - 1$ with the same closed form to compute $\cos\frac{2\pi}{5} = \frac{\sqrt5 - 1}{4}$ (using $(\sqrt5)^2 = 5$); `Real.inv_goldenRatio` rewrites $\varphi^{-1}$ as $-\frac{1 - \sqrt5}{2}$, which matches. Claim 3 adds the first two and obtains $\sqrt5$ from `Real.goldenRatio_sub_goldenConj`. Claim 4 follows from the irrationality of $\varphi$ (`Real.goldenRatio_irrational`), which is preserved under taking inverses. The full proof is checked by the Lean kernel.
:::

Substituting the first two claims of [@prop-pentagon-golden-cosines] into the golden fixed-point equation $1 + \varphi^{-1} = \varphi$ (claim 2 of [@cor-golden-fixed-point-unique]) turns it into a trigonometric identity:

$$
1 + 2\cos\frac{2\pi}{5} \;=\; 2\cos\frac{\pi}{5}.
$$

Golden self-reference is a length relation inside the regular pentagon: a regular pentagon of unit side has diagonals of length $2\cos\frac{\pi}{5} = \varphi$. Thus $\varphi$ is a cosine reading as well, taken at $\frac{\pi}{5}$ and landing in the quadratic field $\mathbb{Q}(\sqrt{5})$; what happens arithmetically when an angle equals its own cosine ($\cos\theta^* = \theta^*$), and whether such an angle can be commensurable with $\pi$, are established in the literature remarks [@rem-banach-dottie-hairy-ball-literature] and [@rem-dottie-angle-incommensurable] of Section 24.4.

## 24.4 From $\cos\theta^* = \theta^*$ to $\psi = \psi(\psi)$: Classical Analysis, Remainder Seams, and the Spherical Fixed/Antipodal Alternative {#sec-ch24-4}

Contrast the one-dimensional rational self-reference $x = 1 + 1/x$ of [@cor-golden-fixed-point-unique] (which stays inside the quadratic algebraic numbers $\overline{\mathbb{Q}}$ at $\varphi = \frac{1+\sqrt{5}}{2}$) with the two-dimensional rotational projection self-reference

$$
\cos\theta^* = \theta^*.
$$

When the self-referential operator upgrades from a one-dimensional rational fraction $1 + 1/x$ to the two-dimensional cosine projection $\cos\theta$, how do classical analysis and number theory characterize the existence, uniqueness, and arithmetic status of its real root $\theta^* \approx 0.7390851332\dots$ (the **Dottie number**)?

::: {.figure src="ch24-truncation-crack"}
**The fixed points of the truncated cosine come ever closer, and every one of them misses.** The horizontal axis is the degree $0, 2, \dots, 10$ of the even Taylor polynomial; each stem is the difference between its fixed point $q$ near $\theta^*$ and $\theta^*$, on a logarithmic scale of the size, cyan upwards for $q > \theta^*$ and magenta downwards for $q < \theta^*$. The difference shrinks from $0.26$ to $3.3 \times 10^{-11}$, alternating in sign, and no stem reaches the centre line. Each $q$ is a root of a polynomial with rational coefficients, hence algebraic; that none equals $\theta^*$ follows from the transcendence in item 2 of the literature note below (literature result, not formalized in this book). The differences are numerical results.
:::

The following literature note records four classical theorems governing $\cos\theta = \theta$ and continuous self-maps of even-dimensional spheres.

::: {.remark #rem-banach-dottie-hairy-ball-literature title="Banach Contraction on [0,1], Transcendence of the Dottie Root, Taylor Remainder Bounds, and the Hairy Ball Fixed/Antipodal Alternative (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Among the four items below, qualitative cosine dynamics follow by applying this chapter's endpoint [@thm-dottie-rational-inverse-endpoint] and existing real-analysis results; [@ex-ch33-mutual-cosine-monotonic-lock] supplies the full hypotheses, strictness exceptions, and derivation. Transcendence, numerical claims, and further topological extensions retain their respective literature boundaries:

1. **Banach contraction principle on $[0, 1]$ and global Picard convergence**:
   [@thm-finite-contracting-updates-stabilize] uses finiteness and set pruning to guarantee finite stabilization; here completeness and metric contraction give uniqueness and asymptotic convergence. The hypotheses and conclusions differ. On the real line $\mathbb{R}$, cosine sends $\mathbb{R}$ into $[-1,1]$ and sends $[-1,1]$ to $[\cos1,1]\subset[0,1]$, a compact invariant interval. On $[0,1]$, the mean value theorem gives the strict Lipschitz bound

   $$
   |\cos x - \cos y| \;\le\; (\sin 1)\,|x - y|, \qquad \sin 1 \approx 0.84147098 < 1.
   $$

   By Banach's contraction theorem on the complete metric space $[0, 1]$, $\cos$ has a **unique real fixed point** $\theta^* \approx 0.73908513321516\dots$ (the Dottie root), and Picard iteration $\theta_{k+1} = \cos\theta_k$ converges to $\theta^*$ from every real initial seed $\theta_0 \in \mathbb{R}$. After the second step it lies in $[0,1]$, giving $|\theta_k-\theta^*|\le(\sin1)^{k-2}|\theta_2-\theta^*|$ for $k\ge2$. Here $\sin 1$ is the worst-case constant over the whole interval; the asymptotic contraction rate at the fixed point is $\lvert\cos'\theta^*\rvert = \sin\theta^* \approx 0.6736$ (checked numerically in [@ex-dottie-rate-newton-rational]). (Symmetrically, the mirror equation $\cos\theta = -\theta$ has unique real root $-\theta^* \approx -0.7390851332\dots$.)
2. **Transcendence of $\theta^*$ and the nonzero algebraic residual $|\cos q - q| > 0$ (Lindemann–Weierstrass theorem)**:
   Suppose a nonzero algebraic number $q \in \overline{\mathbb{Q}} \setminus \{0\}$ satisfied $\cos q = q$. Writing $\cos q = \frac{e^{iq} + e^{-iq}}{2}$ and setting $u = e^{iq}$ yields the quadratic equation

   $$
   u^2 - 2q u + 1 = 0
   $$

   with coefficients in the algebraically closed field $\overline{\mathbb{Q}}$, which would force $u = e^{iq}$ to be algebraic! Yet since $q \in \overline{\mathbb{Q}} \setminus \{0\}$, the exponent $iq$ is a nonzero algebraic number, so the **Lindemann–Weierstrass theorem (1882)** guarantees that $e^{iq}$ is **transcendental** — a contradiction! Since $|\cos 0 - 0| = 1 > 0$ at $q = 0$ as well, it follows that:
   - **The Dottie root $\theta^*$ is transcendental over $\mathbb{Q}$** ($\theta^* \notin \overline{\mathbb{Q}}$);
   - **Every rational or algebraic reading $q \in \overline{\mathbb{Q}}$ leaves a strictly nonzero residual $|\cos q - q| > 0$!**
3. **Lagrange Taylor remainder bound for $R_{2N}(\theta)$ (`R3` approximation seam)**:
   Writing the $(2N-2)$-nd degree Taylor expansion of $\cos\theta$ with remainder $R_{2N}(\theta)$,

   $$
   \cos\theta \;=\; \sum_{k=0}^{N-1} (-1)^k \frac{\theta^{2k}}{(2k)!} + R_{2N}(\theta),
   $$

   Lagrange's remainder theorem gives $|R_{2N}(\theta)| \le \frac{|\theta|^{2N}}{(2N)!}$ on every real interval, while for $\theta \in (0, 2]$ the alternating-series property ensures $0 < |R_{2N}(\theta)| < \frac{\theta^{2N}}{(2N)!}$. Meanwhile, for the exact Picard iteration $\theta_{k+1} = \cos\theta_k$, because $\cos$ is strictly decreasing (hence injective) on the invariant interval $[0, 1]$, **for every initial seed $\theta_0 \in [0, 1] \setminus \{\theta^*\}$** (or more generally any real seed whose forward cosine orbit avoids the countable preimages of $\theta^*$; note that outside $[0, 1]$ the even-function mirror seed $\theta_0 = -\theta^* \neq \theta^*$ reaches $\theta_1 = \cos(-\theta^*) = \theta^*$ in one step), every finite iterate satisfies $\theta_k \neq \theta^*$ and leaves a nonzero Picard residual $\varepsilon_k = |\cos\theta_k - \theta_k| > 0$ for all $k \ge 0$. Together with item 2's unconditional inequality $|\cos q - q| > 0$ for every algebraic reading $q \in \overline{\mathbb{Q}}$, this confirms that no finite polynomial or algebraic reading ever seals the seam of $\cos\theta^* = \theta^*$.
4. **The Hairy Ball fixed/antipodal alternative on $S^{2n}$ and Brouwer's fixed-point theorem (`R6` spherical closure)**:
   By the Poincaré–Brouwer Hairy Ball Theorem ([@rem-hairy-ball-adams-literature]), every continuous tangent vector field on an even-dimensional sphere $S^{2n}$ vanishes at some point. As an immediate consequence, **every continuous self-map $f : S^{2n} \to S^{2n}$ has either a fixed point $f(x) = +x$ or an antipodal point $f(x) = -x$**! Indeed, if $f(x) \neq \pm x$ everywhere on $S^{2n}$, the tangential projection $v(x) = f(x) - \langle f(x), x\rangle x$ would define a nowhere-vanishing continuous tangent field on $S^{2n}$, a contradiction. Meanwhile, on the closed Bloch ball $B^{n+1}$, Brouwer's fixed-point theorem guarantees that every continuous quantum channel map $\Phi : B^{n+1} \to B^{n+1}$ admits at least one fixed state $\Phi(\vv{r}^*) = \vv{r}^*$. (Brouwer's theorem on the standard simplex is verified in Lean, see [@thm-brouwer-standard-simplex]; the closed ball is homeomorphic to a simplex, but transferring the conclusion from the simplex to the ball is not formalized in this book.)
:::

::: {.viz src="sphere-escape" preset="far" height="500"}
**Another start, the same end.** Starting far out at $x_0 = 3$, the amber cobweb drops into $[-1, 1]$ on its first step and from there winds in towards the magenta fixed point $x^* = \theta^* \approx 0.739$. The limit is independent of the start. Never hitting it at a finite step requires the separate nonfixed interval hypothesis, rather than convergence alone: $-\theta^*$ arrives in one step (full qualitative derivation in [@ex-ch33-mutual-cosine-monotonic-lock]).
:::

Pushing one step further from the number-theoretic context of [@rem-banach-dottie-hairy-ball-literature], the author's foundational notes ask: *"What are the relations among transcendental numbers? Is $\pi$ a projection of $\theta$? Is $\theta$ the ultimate transcendental number?"* In modern number theory, the algebraic independence of $\theta^*$ and $\pi$ is governed by **Schanuel's Conjecture**, which we record as an open conjecture (`OPEN`, carrying no `lean` attribute).

::: {.conjecture #conj-schanuel-dottie title="Schanuel's Conjecture Applied to the Algebraic Independence of θ* and π"}
Assuming Schanuel's conjecture (for any $\mathbb{Q}$-linearly independent complex numbers $z_1, \dots, z_m \in \mathbb{C}$, the field extension $\mathbb{Q}(z_1, \dots, z_m, e^{z_1}, \dots, e^{z_m})$ has transcendence degree at least $m$ over $\mathbb{Q}$), applying it to the $\mathbb{Q}$-linearly independent purely imaginary exponents $z_1 = i\theta^*$ and $z_2 = i\pi$ (linear independence is the statement $\theta^*/\pi \notin \mathbb{Q}$, which holds unconditionally; see [@rem-dottie-angle-incommensurable]) — where $e^{i\pi} = -1 \in \mathbb{Q}$ and $u = e^{i\theta^*}$ satisfies the quadratic relation $u^2 - 2\theta^* u + 1 = 0$ (so $e^{i\theta^*}$ is algebraic of degree $2$ over $\mathbb{Q}(\theta^*)$ and **algebraically dependent** on $\theta^*$, contributing $0$ additional transcendence degree over $\mathbb{Q}(\theta^*)$) — implies that $\mathbb{Q}(i\theta^*, i\pi, e^{i\theta^*}, e^{i\pi}) \subseteq \overline{\mathbb{Q}(\theta^*, \pi)}$ has transcendence degree at least $2$ over $\mathbb{Q}$, and hence that **the Dottie constant $\theta^*$ and $\pi$ are algebraically independent over $\mathbb{Q}$** ($\operatorname{tr.deg}_{\mathbb{Q}}\mathbb{Q}(\theta^*, \pi) = 2$).

*(This statement is **OPEN**; the block intentionally carries no `lean` attribute.)*
:::

Let us compare the three self-referential trajectories of this chapter — discrete set contraction ([@thm-finite-contracting-updates-stabilize]), the algebraic golden continued fraction ([@cor-golden-fixed-point-unique]), and the Dottie cosine spiral ([@rem-banach-dottie-hairy-ball-literature]) — side by side in a concrete hand calculation.

::: {.example #ex-dottie-and-golden-iterations title="Hand Comparison of Three Self-Referential Loops: Finite Set Pruning, Golden Continued Fraction, and Dottie Cosine Spiral (With Literature Context, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Items 1 and 2 below instantiate this chapter's kernel-verified [@thm-finite-contracting-updates-stabilize] and [@cor-golden-fixed-point-unique], while Item 3's qualitative convergence applies the endpoint and existing real-analysis results (full derivation in [@ex-ch33-mutual-cosine-monotonic-lock]); the displayed decimals and residuals remain a separate numerical example.

Starting from the unit seed $1$ (or a three-element initial set), compare how three self-referential operators lock onto their respective fixed points:

1. **Discrete finite-set contraction ($S_{n+1} = U(S_n)$, [@thm-finite-contracting-updates-stabilize])**: On $X = \{0, 1, 2\}$ with $S_0 = \{0, 1, 2\}$ ($|S_0| = 3$), let $U$ delete the largest positive element at each step: $S_0 = \{0, 1, 2\} \to S_1 = \{0, 1\} \to S_2 = \{0\} \to S_3 = \{0\} = S_2$. The sequence stabilizes at $N = 2 \le 3$ with exactly $|\{0, 1\}| = 2 \le 3$ strict changes.
2. **One-dimensional algebraic reciprocal loop ($x_{k+1} = 1 + 1/x_k$, [@cor-golden-fixed-point-unique])**: Starting from $x_0 = 1$, rational iteration generates successive Fibonacci ratios $F_{k+2}/F_{k+1}$:

   $$
   \begin{aligned}
   x_0 &= 1,\quad x_1=2,\\
   x_2 &= \frac32,\quad x_3=\frac53\approx1.6667,\\
   x_4 &= \frac85=1.6,\\
   \lim_{k\to\infty}x_k &= \varphi=\frac{1+\sqrt5}{2}\\
   &\approx1.61803399.
   \end{aligned}
   $$

   Convergence follows directly from the known identity $1+1/\varphi=\varphi$: $|x_{k+1}-\varphi|=|x_k-\varphi|/(\varphi x_k)$. Here $x_k\ge1$, so each step multiplies the error by at most $1/\varphi<1$. For any positive initial value, $x_k>1$ from the first step onward, and the same estimate gives convergence. This is a manual derivation, not formalized in this book; [@cor-golden-fixed-point-unique] itself characterizes fixed points only. With $x_0=1$, every finite iterate is rational and differs from the irrational $\varphi$. The limit's algebraicity follows from the fixed-point equation, not merely from using rational addition and division at each finite step.
3. **Two-dimensional rotational cosine loop ($\theta_{k+1} = \cos\theta_k$, qualitative convergence applies existing results; numerics are separate; see [@ex-ch33-mutual-cosine-monotonic-lock])**: Starting from $\theta_0 = 1$ radian, repeated cosine evaluation yields

   $$
   \begin{aligned}
   \theta_0 &= 1.00000000, & |\cos\theta_0 - \theta_0| &\approx 0.45969769 > 0, \\
   \theta_1 &= \cos(1) \approx 0.54030231, & |\cos\theta_1 - \theta_1| &\approx 0.31725091 > 0, \\
   \theta_2 &\approx 0.85755322, & |\cos\theta_2 - \theta_2| &\approx 0.20326343 > 0, \\
   \theta_3 &\approx 0.65428979, & |\cos\theta_3 - \theta_3| &\approx 0.13919057 > 0, \\
   &\;\;\vdots & &\;\;\vdots \\
   \theta^* &\approx 0.73908513321516, & \cos\theta^* &= \theta^*.
   \end{aligned}
   $$

   At the fixed point $\theta^*$, the horizontal inner-product shadow equals $\cos\theta^* = \theta^* \approx 0.739085$, while the orthogonal bivector area is locked by Pythagoras's theorem at $\sin\theta^* = \sqrt{1 - (\theta^*)^2} \approx 0.67361203$!
:::

Look at the final line of [@ex-dottie-and-golden-iterations]: $\cos\theta^*=\theta^*$ is the self-consistency condition for feedback of the reading. The infinite nesting $\cos(\cos(\cos(\cdots)))$ denotes the limit of iteration from a specified initial value. It remains a scalar, without merging the types of function and number. The author interprets this loop as the ruler measuring itself:

$$
\psi = \psi(\psi).
$$

> When the ruler measures another, it is called the operator $\cos$ and the other is called the state $\theta$; when the ruler turns back to measure the angle it opens itself, operator and state become one: $\psi = \psi(\psi)$.

Section 24.7 gives a typed reading of this aphorism: the function $\psi$ acts on its own name $\ulcorner\psi\urcorner$, and, under the capture hypothesis, the resulting value is a fixed point of the twist $f$. Function, name, and value have distinct roles.

::: {.viz src="sphere-escape" preset="dottie" height="500"}
**Cosine again and again.** Starting from $0$, the cobweb winds in on $\theta^* \approx 0.739$ while the view zooms along. Each step is closer, the error multiplied by about $0.67$, yet no step lands exactly.
:::

::: {.film src="006-sphere-beyond-spheres"}
**Spheres beyond spheres: the diagonal escape and the cosine fixed point (2:28).** The film plays the whole chase through: flipping the diagonal of a list gives a string that escapes the list; in the four-address catalog it splits an old fiber, and raised as a new axis at right angles it turns two pieces into three ([@cor-complete-diagonal-topological-settlement]); seen from outside, the closed shadow circle is an open helix. The chase stops only where a list catches its own twisted diagonal, and there the landing value is a fixed point of the twist ([@lem-diagonal-landing-fixed]); with cosine as the twist, the cobweb from $1$ radian closes in on the one positive solution $\theta^* \approx 0.739$ ([@thm-dottie-rational-inverse-endpoint]).
:::

## 24.5 Carrying the Loop Through: True Convergence Rate, Derivative Speed-Up, and the Width of the Rational Seam {#sec-ch24-5}

The aphorism is stated; now let us do the arithmetic. The cosine table in [@ex-dottie-and-golden-iterations] lists only four rows, and the contraction constant $\sin 1 \approx 0.8415$ of [@rem-banach-dottie-hairy-ball-literature] is the worst case over the whole interval $[0, 1]$. Three questions are still open:

1. Close to $\theta^*$, by how much does one press of the cosine key actually shrink the error?

::: {.viz src="fixed-point-convergence" preset="rate" height="500"}
**Each press multiplies the error by −0.674.** Taking the cosine again and again from $\theta_0 = 1$ while the view zooms with the error: zoomed in, the cyan curve lies on the magenta tangent, every turn has the same shape, and the ratio of successive turns tends to the slope of the tangent, $-\sin\theta^* \approx -0.674$, gentler than the global constant $-\sin 1 \approx -0.84$ of the dashed grey line ($\theta_0 = 1$ lies in $[0, 1]$ and is not $\theta^*$, so the error ratio tends to $-\sqrt{1 - (\theta^*)^2}$, an application of existing results, clauses 22–23 of [@ex-ch33-mutual-cosine-monotonic-lock]; the decimals are numerical).
:::

2. If the ruler reads not only the projection $\cos\theta$ but also the orthogonal component $\sin\theta$, how much faster does the loop close?

::: {.viz src="fixed-point-convergence" preset="newton" height="500"}
**Follow the tangent, double the digits.** Again from $\theta_0 = 1$, each step reads the height of the curve and then follows the magenta tangent to the grey line $y = x$. The view zooms along and stops at step $2$, about $10^{-4}$ wide. The amber $x_2$ has just come down the magenta tangent of the previous step onto the grey line, $2.78\times10^{-5}$ from the white ring $\theta^*$; at this magnification the cyan curve is already too straight to tell from its tangent. The correct decimal digits run $0$, $1$, $4$, the error being roughly squared at each step; the plain iteration needs $24$ steps to match this step (numerical check in [@ex-dottie-rate-newton-rational]).
:::

3. How close to $\cos q = q$ can a ruler with finitely many rational tick marks get?

::: {.figure src="ch24-three-speeds"}
**The three questions, answered numerically side by side.** Left, by step: the cyan points, repeated cosine, go down one equal notch per step along the dashed line of slope $\lg\lambda$ ($\lambda \approx 0.674$) and pass $10^{-10}$ only at step $55$; the magenta points, Newton's method, reach $10^{-21}$ in four steps. Right, by denominator: seven points are the residuals $\lvert\cos q - q\rvert$ of the convergents of $\theta^*$, all under the dashed bound $(1 + \sin 1)/b^2$, falling but never zero. All are numerical results; the asymptotic factor of the cosine iteration is an application of existing results in [@ex-ch33-mutual-cosine-monotonic-lock], while the Newton rate and the residual bound are literature results in the note below, not formalized in this book.
:::

::: {.remark #rem-dottie-convergent-residual-literature title="Asymptotic Contraction Rate, Newton's Quadratic Speed-Up, and Continued-Fraction Convergent Residual Bounds for θ* (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The exact asymptotic factor and conditional error ratio are applications of existing results in [@ex-ch33-mutual-cosine-monotonic-lock]. The higher-order expansion, Newton method, continued-fraction bounds, and decimals below retain their separate literature or numerical status.

**First question: position and rate lie on one unit circle.** Write the error as $\delta_k = \theta_k - \theta^*$, expand $\cos$ about $\theta^*$, and cancel the zeroth-order term with $\cos\theta^* = \theta^*$:

$$
\delta_{k+1} \;=\; \cos(\theta^* + \delta_k) - \theta^* \;=\; -\sin\theta^*\,\delta_k \;-\; \frac{\theta^*}{2}\,\delta_k^2 \;+\; O(\delta_k^3).
$$

Strict alternation requires $\theta_0\in[0,1]\setminus\{\theta^*\}$; under that hypothesis the order argument in Chapter 33 makes the iterates straddle $\theta^*$ alternately from the right and from the left, which is the square spiral of the cobweb diagram. Its modulus

$$
\lambda \;=\; \lvert\cos'\theta^*\rvert \;=\; \sin\theta^* \;=\; \sqrt{1 - (\theta^*)^2} \;\approx\; 0.6736120292
$$

is exactly the orthogonal bivector area in the last line of [@ex-dottie-and-golden-iterations]. The **position** $\theta^* = \cos\theta^*$ of the fixed point and its **asymptotic contraction rate** $\lambda = \sin\theta^*$ are therefore the two components of a single unit vector:

$$
(\theta^*)^2 + \lambda^2 = 1.
$$

The line component says where the loop comes to rest; the area component says how fast it closes. Each press of the cosine key multiplies the error by about $0.6736$, not by the global bound $0.8415$; each further decimal digit costs $\ln 10 / \lvert\ln\lambda\rvert \approx 5.83$ steps, not $\ln 10 / \lvert\ln\sin 1\rvert \approx 13.34$.

**Second question: let the ruler read both line and area.** Picard iteration uses only the projection reading $\cos\theta_k$ at each step. Writing the equation as $F(\theta) = \theta - \cos\theta = 0$, Newton's iteration

$$
\theta_{k+1} \;=\; \theta_k - \frac{\theta_k - \cos\theta_k}{1 + \sin\theta_k}
$$

reads one more quantity per step: the orthogonal component $\sin\theta_k$. Since $F'(\theta^*) = 1 + \sin\theta^* = 1 + \lambda$ and $F''(\theta^*) = \cos\theta^* = \theta^*$, the error recursion turns from linear into quadratic:

$$
\delta_{k+1} \;=\; \frac{\theta^*}{2\,(1 + \lambda)}\,\delta_k^2 + O(\delta_k^3), \qquad \frac{\theta^*}{2\,(1 + \lambda)} \approx 0.2208054 .
$$

Picard iteration adds a fixed number of digits per step; Newton's iteration roughly doubles the number of correct digits per step.

**Third question: the residual is the distance to the fixed point.** For $q \in [0, 1]$, apply the mean value theorem to $F$ and use $F(\theta^*) = 0$: there is some $\xi$ between $q$ and $\theta^*$ with

$$
\cos q - q \;=\; -\bigl(F(q) - F(\theta^*)\bigr) \;=\; -(1 + \sin\xi)\,(q - \theta^*).
$$

Because $1 \le 1 + \sin\xi \le 1 + \sin 1$ for $\xi \in [0, 1]$, we obtain the two-sided bound

$$
\lvert q - \theta^*\rvert \;\le\; \lvert\cos q - q\rvert \;\le\; (1 + \sin 1)\,\lvert q - \theta^*\rvert, \qquad 1 + \sin 1 \approx 1.8414710,
$$

and the ratio $\lvert\cos q - q\rvert / \lvert q - \theta^*\rvert$ tends to $1 + \sin\theta^* = 1 + \lambda \approx 1.6736120$ as $q \to \theta^*$. So "how small can the residual of a finite-precision reading be" and "how well can rationals approximate $\theta^*$" are the same question. Furthermore, because $\theta^*$ is irrational (item 2 of [@rem-banach-dottie-hairy-ball-literature], by the Lindemann–Weierstrass theorem), standard Diophantine approximation guarantees that every continued-fraction convergent $a/b$ of $\theta^*$ satisfies $0 < \lvert\theta^* - a/b\rvert < 1/b^2$, and combining this with the mean-value bound above yields

$$
0 \;<\; \Bigl\lvert\cos\frac{a}{b} - \frac{a}{b}\Bigr\rvert \;<\; \frac{1 + \sin 1}{b^2}
$$

for infinitely many denominators $b$: the seam narrows like the square of the denominator, yet never closes.
:::

Back to the answer to the first question: where the fixed point sits and how fast the loop closes are the two coordinates of one point $(\theta^*, \lambda)$ on the unit circle.

::: {.viz src="fixed-point-convergence" preset="circle" height="500"}
**Where it stops, and how fast it closes.** The same cobweb with the unit circle added. On the circle sits $P = (\theta^*, \sin\theta^*)$: its cyan abscissa $\theta^*$ is where the cobweb closes in, and its magenta height $\lambda = \sin\theta^* \approx 0.674$ is the ratio by which each step shrinks the error, the size of the slope of the magenta tangent; $(\theta^*)^2 + \lambda^2 = 1$. For the existence and uniqueness of $\theta^*$ see [@thm-dottie-rational-inverse-endpoint].
:::

::: {.example #ex-dottie-rate-newton-rational title="Numerical Check of the True Contraction Rate, Newton's Quadratic Closure, and the Residuals of the Best Rational Readings"}
**Literature result, not formalized in this book (all values below were recomputed at 50 decimal digits and rounded to the digits shown; the partial quotients of the continued fraction are numerical observations, not theorems).**

**Successive error ratios tend to $-\sin\theta^*$.** Starting from $\theta_0 = 1$, with $\delta_k = \theta_k - \theta^*$:

| $k$ | $\theta_k$ | $\delta_k$ | $\delta_{k+1}/\delta_k$ | second-order prediction $-\lambda - \frac{\theta^*}{2}\delta_k$ |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $1.0000000000$ | $+0.2609149$ | $-0.761869$ | $-0.770031$ |
| $1$ | $0.5403023059$ | $-0.1987828$ | $-0.595967$ | $-0.600153$ |
| $2$ | $0.8575532158$ | $+0.1184681$ | $-0.715765$ | $-0.717391$ |
| $3$ | $0.6542897905$ | $-0.0847953$ | $-0.641488$ | $-0.642277$ |
| $4$ | $0.7934803587$ | $+0.0543952$ | $-0.693376$ | $-0.693713$ |
| $8$ | $0.7504177618$ | $+0.0113326$ | $-0.677785$ | $-0.677800$ |
| $12$ | $0.7414250866$ | $+0.0023400$ | $-0.674476$ | $-0.674477$ |
| $20$ | $0.7391843998$ | $+0.0000993$ | $-0.673649$ | $-0.673649$ |

The ratios oscillate on either side of the limit $-\lambda \approx -0.673612$, with an amplitude given by the second-order term. Actual counts: $\lvert\delta_k\rvert$ first drops below $10^{-10}$ at $k = 55$ and below $10^{-15}$ at $k = 85$.

**Newton's iteration.** Same seed $\theta_0 = 1$:

| $k$ | $\theta_k$ | $\lvert\delta_k\rvert$ | $\lvert\delta_{k+1}\rvert / \delta_k^2$ |
| :---: | :---: | :---: | :---: |
| $0$ | $1.000000000000000000000$ | $2.61\times10^{-1}$ | $0.165677$ |
| $1$ | $0.750363867840243893035$ | $1.13\times10^{-2}$ | $0.218204$ |
| $2$ | $0.739112890911361670361$ | $2.78\times10^{-5}$ | $0.220799$ |
| $3$ | $0.739085133385283969760$ | $1.70\times10^{-10}$ | $0.220805$ |
| $4$ | $0.739085133215160641662$ | $6.39\times10^{-21}$ | $0.220805$ |

Picard iteration needs $54$ steps to match the accuracy of Newton's step $3$, and $115$ steps to match step $4$.

**Best rational readings.** $\theta^* = [0; 1, 2, 1, 4, 1, 40, 1, 9, 4, 2, 1, \dots]$; the convergents $a/b$ and their residuals are:

| $a/b$ | decimal value | $\lvert a/b - \theta^*\rvert$ | residual $\lvert\cos(a/b) - a/b\rvert$ | $b^2 \times$ residual |
| :---: | :---: | :---: | :---: | :---: |
| $2/3$ | $0.6666666667$ | $7.24\times10^{-2}$ | $1.19\times10^{-1}$ | $1.07$ |
| $3/4$ | $0.7500000000$ | $1.09\times10^{-2}$ | $1.83\times10^{-2}$ | $0.293$ |
| $14/19$ | $0.7368421053$ | $2.24\times10^{-3}$ | $3.75\times10^{-3}$ | $1.35$ |
| $17/23$ | $0.7391304348$ | $4.53\times10^{-5}$ | $7.58\times10^{-5}$ | $0.0401$ |
| $694/939$ | $0.7390841321$ | $1.00\times10^{-6}$ | $1.68\times10^{-6}$ | $1.48$ |
| $711/962$ | $0.7390852391$ | $1.06\times10^{-7}$ | $1.77\times10^{-7}$ | $0.164$ |
| $7093/9597$ | $0.7390851308$ | $2.45\times10^{-9}$ | $4.09\times10^{-9}$ | $0.377$ |

Every entry of the last column is below $1 + \sin 1 \approx 1.84$, in agreement with the upper bound above. The unusually large partial quotient $40$ makes $17/23$ an exceptionally good reading: an exhaustive search shows that no fraction with denominator below $502$ is closer to $\theta^*$, and the first one to beat it is $371/502$. The reading $739/1000$ of a three-decimal ruler leaves a residual of $1.42\times10^{-4}$, nearly twice that of $17/23$.
:::

::: {.viz src="fixed-point-convergence" preset="rational" height="500"}
**The seam narrows but never closes.** The convergents $2/3, 3/4, 14/19, 17/23, 694/939, \dots$ of $\theta^*$ land one by one on the grey line (amber marks the current one), and the magenta upright is the drop from there to the cosine curve, the residual $\lvert\cos q - q\rvert$. The upright always stays inside the wedge of the two dashed grey lines (slopes $0$ and $-\sin 1$); with the view magnified ten million times, it is still there.
:::

The last table of [@ex-dottie-rate-newton-rational] shows that refining the tick marks does not automatically buy a better reading. What sets the width of the seam is not the size of the denominator but its arithmetic relation to $\theta^*$: a ruler with twenty-three divisions happens to line up almost exactly at its seventeenth mark, and a ruler with a thousand divisions does not.

::: {.viz src="fixed-point-convergence" preset="ruler" height="500"}
**Twenty-three divisions beat a thousand.** The amber $17/23$ next to the dashed ruler reading $739/1000$: the tick nearest $\theta^*$ on a thousandths ruler leaves about twice the residual of $17/23$ ($1.42\times10^{-4}$ against $7.58\times10^{-5}$).
:::

Rational readings never line up. What about a different kind of closure: instead of asking the projection to return to itself, ask a rotation to return to its starting point? The answer is again no, and this time no conjecture is needed.

::: {.remark #rem-dottie-angle-incommensurable title="θ* and π Are Incommensurable: Rotation by the Fixed-Point Angle Never Closes (Corollary of a Literature Result, Not Formalized in This Book)"}
**Corollary of a literature result, not formalized in this book.** The hypothesis used in [@conj-schanuel-dottie], that $i\theta^*$ and $i\pi$ are linearly independent over $\mathbb{Q}$, is equivalent to $\theta^*/\pi \notin \mathbb{Q}$. This holds without any conjecture:

Suppose $\theta^* = \frac{m}{n}\pi$ with integers $m, n$ and $n \ge 1$. Put $\zeta = e^{i m\pi/n}$. Then $\zeta^{2n} = 1$, so $\zeta$ is a root of unity and hence algebraic, and therefore $\cos\frac{m\pi}{n} = \frac{\zeta + \zeta^{-1}}{2}$ is algebraic as well. But $\cos\theta^* = \theta^*$, so $\theta^*$ would be algebraic, contradicting the transcendence obtained from the Lindemann–Weierstrass theorem in item 2 of [@rem-banach-dottie-hairy-ball-literature]. Hence $\theta^*/\pi$ is irrational (numerically $\theta^*/\pi \approx 0.2352581$, that is, $\theta^* \approx 42.3465^\circ$).

Two consequences follow:

1. **The rotation has infinite order.** The plane rotation $R(\theta^*)$ by the angle $\theta^*$ satisfies $R(\theta^*)^n \ne \mathrm{id}$ for every integer $n \ge 1$, because $R(\theta^*)^n = \mathrm{id}$ if and only if $n\theta^* \in 2\pi\mathbb{Z}$. Correspondingly, no positive integer power of the unit rotor $U(\theta^*) = \cos(\theta^*/2) - \hat{I}\sin(\theta^*/2)$ equals $\pm 1$.
2. **The orbit is dense and equidistributed.** The sequence $\{n\theta^* \bmod 2\pi\}_{n \ge 0}$ is dense and equidistributed on the circle. The step "orbits of an irrational rotation are equidistributed" has a frozen Lean proof, see [@lem-irrational-rotation-equidistribution] below; the irrationality needed to apply it to $\theta^*$ is the first half of this remark.

Whether $\theta^*/\pi$ is transcendental is not settled by this argument; it holds under Schanuel's conjecture, since it follows from the conclusion of [@conj-schanuel-dottie] (algebraic independence of $\theta^*$ and $\pi$).
:::

Put the two facts side by side: the cosine projection closes in one step at $\theta^*$ ($\cos\theta^* = \theta^*$), while the rotation with step $\theta^*$ never returns to its starting point. The same angle is a fixed point for projection and an open helix for rotation.

"Never returns to its starting point" can be made more precise: the orbit not only fails to close, it also visits the whole circle uniformly. This step needs no citation from the literature; the pinned repository holds a frozen theorem.

::: {.lemma #lem-irrational-rotation-equidistribution title="Under an Irrational Rotation, Orbit Averages of Continuous Observables Tend to the Haar Average" lean="D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar"}
Let $\alpha \in \mathbb{R}$ be irrational (`hα : Irrational α`), let $\rho \in \mathbb{R}$ be an arbitrary initial phase, and let $f : \mathbb{R}/\mathbb{Z} \to \mathbb{C}$ be continuous (in Lean, $\mathbb{R}/\mathbb{Z}$ is `AddCircle (1 : ℝ)` and the hypothesis is `hf : Continuous f`). Then, as $N \to \infty$,

$$
\frac{1}{N}\sum_{i=0}^{N-1} f\bigl(\rho + i\,\alpha\bigr) \;\longrightarrow\; \int_{\mathbb{R}/\mathbb{Z}} f(x)\,\mathrm{d}\mu(x),
$$

where $\rho + i\alpha$ stands for its image in $\mathbb{R}/\mathbb{Z}$ and $\mu$ is the normalized Haar measure on $\mathbb{R}/\mathbb{Z}$ (`AddCircle.haarAddCircle`).
:::

::: proof
The continuous functions for which the conclusion holds form a complex linear subspace $S$. First, every character $x \mapsto e^{2\pi i m x}$ lies in $S$: for $m = 0$ both sides equal $1$; for $m \neq 0$ the orbit average is a geometric sum with ratio $e^{2\pi i m\alpha}$ divided by $N$, and since $\alpha$ is irrational the ratio is not $1$, the geometric sum is bounded, the average tends to $0$, and the Haar integral of the character is $0$ as well (`fourier_average_tendsto`). Second, $S$ is closed under uniform convergence: the averaging functionals have norm at most $\lVert f\rVert_\infty$, so they form an equicontinuous family of linear functionals and pointwise limits are preserved on closed sets. Third, the linear span of the characters is dense in the space of continuous functions (`span_fourier_closure_eq_top`). Together the three steps show that $S$ consists of all continuous functions. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-dottie-orbit-seventeen title="The Orbit with Step θ*: Seventeen Steps Nearly Close It, Yet It Eventually Covers the Circle"}
(When instantiating [@lem-irrational-rotation-equidistribution] at $\alpha = \frac{\theta^*}{2\pi}$, the equidistribution theorem itself is kernel-verified, whereas the irrationality input $\alpha \notin \mathbb{Q}$ from [@rem-dottie-angle-incommensurable] is a **literature result, not formalized in this book**.) The values below were computed from closed-form geometric sums and checked by direct summation; the partial quotients of the continued fraction are numerical observations.

**The near-closure after seventeen steps.** The continued fraction of $\frac{\theta^*}{2\pi} \approx 0.1176290523$ is $[0; 8, 1, 1, 191, 1, 1, \dots]$. The unusually large partial quotient $191$ makes the convergent $\frac{2}{17}$ exceptionally accurate:

$$
17\,\theta^* \;=\; 4\pi - 0.0019233\ldots \quad(\text{radians}),
$$

that is, after seventeen steps and two full turns the orbit is only $0.1102^\circ$ away from its starting point. The next closer approach has to wait until step $3256$ (gap $0.0012211$ radians).

**Orbit averages of two observables.** With initial phase $\rho = 0$, compare $f_1(x) = \cos(2\pi x)$ and $f_{17}(x) = \cos(2\pi\cdot 17x)$, both of Haar average $0$:

| steps $N$ | orbit average of $f_1$ | orbit average of $f_{17}$ | orbit average of $f_{17}$ when the angle is replaced by $2\pi\cdot\frac{2}{17}$ |
| :---: | :---: | :---: | :---: |
| $10$ | $+0.143151$ | $+0.999947$ | $1$ |
| $10^2$ | $-0.008271$ | $+0.993938$ | $1$ |
| $10^3$ | $-0.000091$ | $+0.488620$ | $1$ |
| $10^4$ | $+0.000188$ | $+0.019479$ | $1$ |
| $10^5$ | $-0.000006$ | $-0.003332$ | $1$ |

The average of $f_1$ tends to $0$ quickly: the geometric sum gives the bound $\frac{1}{N\lvert\sin(\theta^*/2)\rvert} \approx \frac{2.77}{N}$. The average of $f_{17}$ hardly moves for a long time: it is sensitive exactly to the seventeen-step near-closure, the corresponding bound is $\frac{1}{N\lvert\sin(17\theta^*/2)\rvert} \approx \frac{1040}{N}$, and only for $N$ much larger than $1040$ does the average come close to the Haar average $0$. If the angle is replaced by $2\pi\cdot\frac{2}{17}$, which is commensurable with $\pi$, the orbit has only seventeen points and the average of $f_{17}$ is $1$ forever, not the Haar average: the irrationality hypothesis of [@lem-irrational-rotation-equidistribution] cannot be dropped.
:::

Within a hundred steps, the orbit with step $\theta^*$ looks almost indistinguishable from a regular heptadecagon; equidistribution shows itself only on a longer time scale. An observer with finitely many steps sees a closed polygon; the whole circle appears only in the limit of infinitely many.

::: {.viz src="fixed-point-convergence" height="560"}
**How fixed points close in: the full lab.** Three scenes on one cobweb plane: iteration ($\cos x$ or $1 + 1/x$, with a draggable start and three cameras), Newton's method, and rational readings (with an adjustable ruler). Qualitative cosine convergence and conditional asymptotic factors follow from the reuse derivation in [@ex-ch33-mutual-cosine-monotonic-lock]; Newton's method, numerical values, and residual bounds retain their literature or numerical boundaries; the green boxes cite only [@cor-golden-fixed-point-unique] and [@thm-dottie-rational-inverse-endpoint].
:::

## 24.6 "Is $\pi$ a Projection of $\theta$?": Two Mutually Inverse Series, Kepler's Equation, and Half-Time Free Fall {#sec-ch24-6}

The question in the author's notes, *"Is $\pi$ a projection of $\theta$?"*, received at [@conj-schanuel-dottie] a conditional answer in the negative direction: under Schanuel's conjecture, no polynomial relation with integer coefficients holds between $\theta^*$ and $\pi$. But "no algebraic relation" is not "no relation". The answer in the positive direction is already inside the fixed-point equation and can be read off in one step.

::: {.remark #rem-dottie-right-angle-split-literature title="The Fixed Point Cuts the Right Angle into Two Complementary Arcs (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** For $x \in [0, 1]$, the unique solution of $\cos\theta = x$ on $[0, \pi/2]$ is $\theta = \arccos x = \frac{\pi}{2} - \arcsin x$. Substituting $x = \theta = \theta^*$:

$$
\cos\theta^* = \theta^* \quad\Longleftrightarrow\quad \frac{\pi}{2} \;=\; \theta^* + \arcsin\theta^* .
$$

On the unit circle, the point $P = (\cos\theta^*, \sin\theta^*) = (\theta^*, \lambda)$ cuts the quarter arc of the first quadrant into two pieces. The lower piece, from $(1, 0)$ to $P$, has length $\theta^*$, which is exactly the abscissa of $P$; the upper piece, from $P$ to $(0, 1)$, has length $\arcsin\theta^*$. $P$ is the only point of this arc whose arc length equals its own abscissa.
:::

To express this arc as a rational power series, first expand its integral kernel.

::: {.lemma #lem-arcsin-binomial-kernel title="Normalized Central Binomial Coefficients and the Binomial Kernel" lean="D5/S3/Analytic/OriginalHalfBinomialIntegral.b_nonneg D5/S3/Analytic/OriginalHalfBinomialIntegral.b_le_one D5/S3/Analytic/OriginalHalfBinomialIntegral.binomial_hasSum"}
For every $n \in \mathbb{N}$, let $b_n = \binom{2n}{n}/4^n \in \mathbb{R}$. Then $0 \le b_n \le 1$. For every real $u$ with $0 \le u < 1$,

$$
\operatorname{HasSum}\left(n \mapsto b_n u^n,\;\frac{1}{\sqrt{1-u}}\right).
$$

Here $\operatorname{HasSum}$ specifies both convergence of the series and its sum.
:::

::: {.remark #rem-arcsin-series-derivation title="Integrating the Binomial Kernel: The Arcsine Series Including Its Endpoints (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** Set

$$
c_n = \frac{\binom{2n}{n}}{4^n(2n+1)} \in \mathbb{Q}.
$$

Below, $c_n$ denotes its image in $\mathbb{R}$. Fix any $y \in [0,1]$, and write

$$
\begin{aligned}
g(t)&=\frac{1}{\sqrt{1-t^2}},\\
F_N(t)&=\sum_{n<N}b_n t^{2n}\quad(N\in\mathbb{N}).
\end{aligned}
$$

On the open interval $0<t<y$, we have $0\le t^2<1$. Thus [@lem-arcsin-binomial-kernel] gives $F_N(t)\to g(t)$ and $0\le F_N(t)\le g(t)$. When $y=1$, the kernel has a singularity at the right endpoint. The binomial expansion is used only on the open interval; arbitrary finite values may be assigned at the endpoints, since both have Lebesgue measure zero.

Integrability follows from the primitive itself: $\arcsin$ is continuous on $[0,y]$ and has the nonnegative derivative $g(t)$ for $0<t<y$. Automatic integrability of a nonnegative derivative and the fundamental theorem of calculus therefore give[^arcsin-ftc]

$$
\int_0^y g(t)\,\mathrm{d}t=\arcsin y-\arcsin 0=\arcsin y.
$$

This includes $y=1$; for $y=0$ the integral is zero. The integrable function $g$ now dominates the nonnegative polynomial partial sums, permitting termwise integration[^arcsin-dct]:

$$
\begin{aligned}
\int_0^y F_N(t)\,\mathrm{d}t
&=\sum_{n<N}\frac{b_n}{2n+1}\,y^{2n+1}\\
&=\sum_{n<N}c_n y^{2n+1}\\
&\longrightarrow\arcsin y.
\end{aligned}
$$

Convergence at $y=1$ thus follows from the integral argument, without assuming a value for the endpoint series. Finally, $\arcsin(-y)=-\arcsin y$ (`Real.arcsin_neg`) and the oddness of every monomial cover all $x\in[-1,1]$, including $x=-1$. The complete expansion is

$$
\begin{aligned}
\arcsin x&=\sum_{n\ge0}c_n x^{2n+1}\\
&=x+\frac{x^3}{6}+\frac{3x^5}{40}\\
&\quad+\frac{5x^7}{112}+\cdots
\qquad(\lvert x\rvert\le1).
\end{aligned}
$$

Hence $\pi$ is the value at $\theta^*$ of a power series with rational coefficients:

$$
\pi \;=\; A(\theta^*), \qquad A(x) \;=\; 2x + 2\arcsin x \;=\; 4x + \frac{x^3}{3} + \frac{3x^5}{20} + \frac{5x^7}{56} + \frac{35x^9}{576} + \cdots .
$$

The fixed-point hypotheses used here are $\theta^*\in[0,1]$ and $\cos\theta^*=\theta^*$. They supply the branch conditions $0\le\theta^*\le\pi$ required by `Real.arccos_cos`. Combining it with `Real.arccos_eq_pi_div_two_sub_arcsin` gives $\theta^*=\pi/2-\arcsin\theta^*$, hence $\pi=A(\theta^*)$.
:::

[^arcsin-ftc]: Continuity and differentiation use Mathlib's `Real.continuous_arcsin` and `Real.hasDerivAt_arcsin`. The latter requires $t\ne-1$ and $t\ne1$, which hold for $0<t<y\le1$. Automatic integrability uses `intervalIntegral.intervalIntegrable_deriv_of_nonneg`, which requires continuity on the closed interval, the derivative on the open interval, and nonnegativity of that derivative. The integral identity uses `intervalIntegral.integral_eq_sub_of_hasDerivAt_of_le`, requiring $0\le y$, the same continuity and open-interval derivative, and the interval integrability established in the previous step. Neither theorem requires a derivative at an endpoint.

[^arcsin-dct]: Termwise integration uses Mathlib's `intervalIntegral.hasSum_integral_of_dominated_convergence`: each term is a measurable polynomial, bounded on the open interval by the nonnegative term $b_nt^{2n}$ itself. The sum of these bounds equals the integrable $g(t)$ almost everywhere. Integrating each finite polynomial gives the coefficient $b_n/(2n+1)=c_n$.

::: {.remark #rem-arcsin-interior-tail title="Geometric Truncation Bounds on Interior Intervals (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** For every $N\in\mathbb{N}$, define

$$
\begin{aligned}
S_N(x)&=\sum_{n<N}c_n x^{2n+1},\\
A_N(x)&=2x+2S_N(x).
\end{aligned}
$$

By [@lem-arcsin-binomial-kernel], $0\le c_n=b_n/(2n+1)\le1$. For any real $q,x$ with $0\le q<1$ and $|x|\le q$,

$$
\begin{aligned}
\left|\arcsin x-S_N(x)\right|
&\le\sum_{n=N}^{\infty}c_n|x|^{2n+1}\\
&\le\sum_{n=N}^{\infty}q^{2n+1}
=\frac{q^{2N+1}}{1-q^2},\\
\left|A(x)-A_N(x)\right|
&\le\frac{2q^{2N+1}}{1-q^2}.
\end{aligned}
$$

These bounds include $N=0$, when the partial sum is empty, and $q=0$, when $x=0$ and both the remainder and the bound are zero. Convergence at $x=\pm1$ comes from the integral argument in [@rem-arcsin-series-derivation]; the geometric bound here applies only to $q<1$. For this chapter's $\theta^*\in(0,1)$, choose $\theta^*\le q<1$: for every tolerance $\varepsilon>0$, some $N$ makes $2q^{2N+1}/(1-q^2)<\varepsilon$, and hence $|\pi-A_N(\theta^*)|<\varepsilon$. The rational polynomial $A_N$ takes finitely many additions and multiplications to evaluate. This controls series truncation for an exact input; an actual computation also needs bounds for the input error in $\theta^*$, rounding, and computational resources.
:::

**The reverse direction: reading $\theta^*$ from $\pi$.** The prescribed inverse series converges absolutely at $y=\pi$ with the exact sum given by [@thm-dottie-rational-inverse-endpoint]; its classical expansion and numerical partial sums are presented in [@ex-dottie-pi-series].

::: {.definition #def-dottie-rational-inverse title="The Prescribed Rational Arcsine Series and Its Formal Compositional Inverse" lean="D5/S3/Analytic/PowerSeries/DottieInverseSeries.alpha D5/S3/Analytic/PowerSeries/DottieInverseSeries.arcsine D5/S3/Analytic/PowerSeries/DottieInverseSeries.forward D5/S3/Analytic/PowerSeries/DottieInverseSeries.inverse"}
For every $k\in\mathbb{N}$, define the rational coefficients

$$
\alpha(2k)=0,\qquad
\alpha(2k+1)=\frac{\binom{2k}{k}}{4^k(2k+1)}=c_k.
$$

In the formal power series ring $\mathbb{Q}[[X]]$, set

$$
\begin{aligned}
S&=\operatorname{mk}(\alpha)
  =\sum_{n\ge0}\alpha(n)X^n,\\
A&=2X+2S,\\
B&=A^{\langle-1\rangle}.
\end{aligned}
$$

Here $B$ is the formal compositional inverse specified by the fact that the linear coefficient $4$ of $A$ is a unit; it satisfies $B(0)=0$ and $A(B(X))=X$. Write $\beta_n=[X^n]B\in\mathbb{Q}$ for $n\in\mathbb{N}$. In the real series below, $\beta_n$ denotes the image of this rational number in $\mathbb{R}$.
:::

This preserves the preceding notation $A$, $B$: the formal series $A$ is the expansion of the function $2x+2\arcsin x$ at the origin, and $B$ is its formal compositional inverse. The earlier $c_k$ still denotes only the degree $2k+1$ coefficient of arcsine; $\beta_n$ indexes the inverse coefficients by every natural degree.

$B$ has an equivalent description without series: first solve $\eta + \sin\eta = y/2$, then set $B(y) = \sin\eta$. Indeed, if $x = \sin\eta$ with $\eta \in [-\pi/2, \pi/2]$, then $A(x) = 2\sin\eta + 2\eta = y$. For $y = \pi$, the equation $\eta + \sin\eta = \pi/2$ is solved by $\eta = \frac{\pi}{2} - \theta^* = \arcsin\theta^*$ (substitution gives $\frac{\pi}{2} - \theta^* + \cos\theta^* = \frac{\pi}{2}$), so $B(\pi) = \sin\eta = \cos\theta^* = \theta^*$. To read this function value as the sum of the original rational series, one must also establish convergence to it. The following theorem gives absolute convergence and the exact sum.

::: {.theorem #thm-dottie-rational-inverse-endpoint title="The Rational Compositional Inverse Converges Absolutely at π to the Unique Positive Cosine Fixed Point" lean="D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint"}
For the coefficients $\beta_n$ specified in [@def-dottie-rational-inverse], there exists a real number $\theta^*$ such that all the following hold:

1. $0<\theta^*<1$ and $\cos\theta^*=\theta^*$;
2. for every real $t$, if $0<t$ and $\cos t=t$, then $t=\theta^*$;
3. $\operatorname{Summable}\bigl(n\mapsto|\beta_n|\pi^n\bigr)$;
4. $\operatorname{HasSum}\bigl(n\mapsto\beta_n\pi^n,\;\theta^*\bigr)$.

Both series range over all $n\in\mathbb{N}$, including $n=0$. The third clause asserts absolute convergence; the fourth retains every coefficient's sign and specifies the sum.
:::

::: proof
First find one analytic function for all the coefficients. Consider the complex function $f(z)=z+\sin z$. Solving $f(z)=w$ is equivalent to finding a fixed point of

$$
\Phi_w(z)=\frac{w+z-\sin z}{2}.
$$

On the closed disk $|z|\le1$, sine and cosine remainder bounds give

$$
|\sin z-z|\le\frac15,\qquad
|\cos z-1|\le\frac35.
$$

Thus, when $|w|<7/4$, we have $|\Phi_w(z)|\le(|w|+1/5)/2<1$ and $|\Phi_w'(z)|\le3/10$. The closed disk is complete, so the Banach contraction principle gives a unique solution $G(w)$ there, with $|G(w)|<1$ and $G(w)+\sin G(w)=w$. The same cosine bound ensures $f'(G(w))=1+\cos G(w)\ne0$. The analytic local inverse agrees with this unique solution near each point, making $G$ analytic throughout $|w|<7/4$. Conjugation preserves the equation and the disk; uniqueness therefore makes $G(w)$ real for real $w$ and gives $G(0)=0$.

Set

$$
H(Y)=\sin G(Y/2).
$$

This function is analytic for $|Y|<7/2$, real-valued on its real diameter, and zero at the origin. Cauchy's formula on the circle of radius $13/4<7/2$ therefore supplies an expansion of this same $H$ at the origin.

Every coefficient must now be identified. For real $y$ with $|y|<7/2$, write $x=G(y/2)\in(-1,1)$. Then $H(y)=\sin x$, and the principal-branch identity $\arcsin(\sin x)=x$ gives

$$
2H(y)+2\arcsin H(y)=2\sin x+2x=y.
$$

Near zero, the arcsine expansion is precisely $S$. Expressing this identity as a composition of Taylor series shows that the Taylor series $T$ of the real restriction of $H$ satisfies $T(0)=0$ and $A(T)=X$. A formal series with linear coefficient $4$ has only one compositional inverse with zero constant term, so $T$ is the real image of $B$. Since $H$ is real on the real axis near zero, its real and complex Taylor coefficients agree. Hence, for every $n\ge0$,

$$
\frac{H^{(n)}(0)}{n!}=\beta_n,
$$

where the right side is now embedded in $\mathbb{C}$. This connects every original rational coefficient, including degree zero, to the same Cauchy expansion. Since $\pi<13/4$, absolute convergence inside the disk gives $\sum_{n\ge0}|\beta_n|\pi^n<\infty$. Evaluating at $Y=\pi$ and taking real parts gives the signed sum $H(\pi)$.

Finally, put $x=G(\pi/2)\in(-1,1)$. The equation $x+\sin x=\pi/2>0$ forces $x>0$: if $x\le0$, then $\sin x\le0$ on this interval as well. Thus $\theta^*=\sin x$ satisfies $0<\theta^*<x<1$ and $\theta^*=\pi/2-x$, so $\cos\theta^*=\sin x=\theta^*$. Any positive real competitor $t=\cos t$ first lies in $(0,1]$ by $\cos t\le1$; strict decrease of cosine on $[0,\pi]$ then excludes $t=1$. The same monotonicity prevents two distinct positive fixed points. Uniqueness therefore covers every positive real $t$. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-dottie-pi-series title="Two Mutually Inverse Rational Series Linking π and θ*: Numerical Check of the Partial Sums"}
**Literature result, not formalized in this book: the classical arcsine expansion, numerical partial sums, and term-ratio comparison in this example.** Because the linear coefficient of $A$ at $0$ is $4 \neq 0$, order-by-order reversion of $A$ gives the odd rational power series

$$
B(y) \;=\; \frac{y}{4} - \frac{y^3}{768} - \frac{y^5}{61440} - \frac{43\,y^7}{165150720} - \frac{223\,y^9}{47563407360} - \cdots .
$$

The series $B$ and the identity $\theta^* = B(\pi)$ are described by Kaplan (2007, *Mathematics Magazine* 80, "The Dottie Number"); [@thm-dottie-rational-inverse-endpoint] gives absolute convergence and the exact sum of this prescribed series at $\pi$. The expansion of $A$ is the classical arcsine series. The coefficients in the table were obtained by order-by-order reversion in exact rational arithmetic; the partial sums were computed at 50 digits and rounded to the digits shown. These table entries and the term ratios below remain numerical checks; the endpoint theorem does not certify their rounding accuracy or the comparison of convergence speeds.

| truncation order | partial sum of $A$ (tends to $\pi$) | difference from $\pi$ | partial sum of $B$ (tends to $\theta^*$) | difference from $\theta^*$ |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $2.9563405$ | $1.85\times10^{-1}$ | $0.7853982$ | $4.63\times10^{-2}$ |
| $3$ | $3.0909148$ | $5.07\times10^{-2}$ | $0.7450254$ | $5.94\times10^{-3}$ |
| $5$ | $3.1239947$ | $1.76\times10^{-2}$ | $0.7400446$ | $9.59\times10^{-4}$ |
| $7$ | $3.1347505$ | $6.84\times10^{-3}$ | $0.7392582$ | $1.73\times10^{-4}$ |
| $9$ | $3.1387490$ | $2.84\times10^{-3}$ | $0.7391185$ | $3.33\times10^{-5}$ |
| $11$ | $3.1403573$ | $1.24\times10^{-3}$ | $0.7390918$ | $6.70\times10^{-6}$ |
| $21$ | $3.1415655$ | $2.72\times10^{-5}$ | $0.7390851363$ | $3.10\times10^{-9}$ |

The ratio of successive terms of $A$ tends to $(\theta^*)^2 \approx 0.546$. The ratio of successive nonzero terms of $B$ rises from $0.12$ (order $5$) to $0.22$ (order $21$) and numerically approaches $1/4$: reading $\theta^*$ from $\pi$ converges faster than reading $\pi$ from $\theta^*$.
:::

So two statements hold together without contradiction: analytically, each of $\pi$ and $\theta^*$ is the value of a rational power series at the other ([@thm-dottie-rational-inverse-endpoint], [@ex-dottie-pi-series]); algebraically, under Schanuel's conjecture ([@conj-schanuel-dottie]), no polynomial relation holds between them. $A$ and $B$ are infinite series, not polynomials; the finite truncations listed in the table all leave a nonzero difference. Nonvanishing of general truncation tails, a pattern of coefficient signs, and computational resource bounds are outside the endpoint theorem.

::: {.figure src="ch24-two-series"}
**$\pi$ and $\theta^*$ are the two coordinates of one point on one curve.** The cyan curve is $A(x) = 2x + 2\arcsin x$. Going up from $\theta^*$ on the horizontal axis and then left reads off $\pi = A(\theta^*)$: the cyan arrows. Going right from $\pi$ on the vertical axis and then down reads back $\theta^* = B(\pi)$ along the same path: the dashed magenta arrows laid over the cyan ones. The absolute convergence and sum of $B$ at $\pi$ are [@thm-dottie-rational-inverse-endpoint]; the arcsine expansion behind $\pi = A(\theta^*)$ is in [@rem-arcsin-series-derivation] (literature result, not formalized in this book).
:::

**Where the fixed point lives: the half-time of a cycloid.** How the auxiliary equation $\eta + \sin\eta = \pi/2$ appears in Kepler's equation and Newtonian radial free fall is worked out in [@ex-dottie-free-fall].

::: {.example #ex-dottie-free-fall title="Half-Time Free Fall: When Half the Fall Time Has Elapsed, the Distance Remaining Is (1 + sin θ*)/2"}
**Literature result, not formalized in this book.** Substituting $E = \pi - \eta$ into $\eta + \sin\eta = \pi/2$ from [@ex-dottie-pi-series] yields Kepler's equation $E - \sin E = \frac{\pi}{2}$ at eccentricity $e = 1$ and mean anomaly $M = \pi/2$, solved by $E = \frac{\pi}{2} + \theta^* \approx 132.35^\circ$. A Kepler orbit of eccentricity $1$ degenerates into a radial segment, corresponding in Newtonian mechanics to a particle falling radially from rest at distance $r_0$ in the gravitational field of a central mass $M$. Energy conservation gives $\dot{r}^2 = 2GM\left(\frac{1}{r} - \frac{1}{r_0}\right)$, whose solution is the cycloid parametrization:

$$
r(\eta) \;=\; \frac{r_0}{2}\,(1 + \cos\eta), \qquad t(\eta) \;=\; \frac{t_{\mathrm{ff}}}{\pi}\,(\eta + \sin\eta), \qquad \eta \in [0, \pi],
$$

where $t_{\mathrm{ff}} = \frac{\pi}{2}\sqrt{\frac{r_0^3}{2GM}}$ is the total time to reach the centre. Direct differentiation confirms it: $\dot{r}^2 = \frac{r_0^2\pi^2}{4\,t_{\mathrm{ff}}^2}\cdot\frac{\sin^2\eta}{(1+\cos\eta)^2}$, while $2GM\left(\frac{1}{r} - \frac{1}{r_0}\right) = \frac{2GM}{r_0}\cdot\frac{\sin^2\eta}{(1+\cos\eta)^2}$, and the two agree exactly when $t_{\mathrm{ff}}$ has the value above.

**The half-time instant.** Set $t = t_{\mathrm{ff}}/2$, that is, $\eta + \sin\eta = \pi/2$. Substituting $\eta = \frac{\pi}{2} - x$ gives $\cos x = x$, so $x = \theta^*$ and $\eta_{1/2} = \frac{\pi}{2} - \theta^* = \arcsin\theta^* \approx 47.65^\circ$. Therefore

$$
\frac{r(t_{\mathrm{ff}}/2)}{r_0} \;=\; \frac{1 + \cos\eta_{1/2}}{2} \;=\; \frac{1 + \sin\theta^*}{2} \;=\; \frac{1 + \lambda}{2} \;\approx\; 0.836806 .
$$

The infall speed at that instant, in units of the escape speed $v_0 = \sqrt{2GM/r_0}$ at $r_0$, is

$$
\frac{\lvert\dot{r}\rvert}{v_0} \;=\; \frac{\sin\eta_{1/2}}{1 + \cos\eta_{1/2}} \;=\; \frac{\theta^*}{1 + \lambda} \;\approx\; 0.441611 .
$$

**Comparison and check.** At $t/t_{\mathrm{ff}} = \frac14, \frac12, \frac34$ the ratio $r/r_0$ equals $0.960937$, $0.836806$, $0.597150$ respectively; only the middle one has a closed form in terms of $\theta^*$. Numerical integration of $t(r) = \int_r^{r_0} \frac{\mathrm{d}r'}{\sqrt{2GM\left(\frac{1}{r'} - \frac{1}{r_0}\right)}}$ gives $t(0.836806\,r_0)/t_{\mathrm{ff}} = 0.500000$, in agreement with the closed form.

The same parametric equations describe the closed dust Friedmann universe, with $r$ replaced by the scale factor and time reversed (literature result, not formalized in this book): halfway through its expansion phase in time, such a universe has already reached $83.68\%$ of its maximum size.

Half the time is spent, yet less than one sixth of the distance is covered: the fall starts slowly, and most of the distance is travelled in the second half. And "half", the plainest of all division points, lands at a position given exactly by $\theta^*$. The cosine fixed point does not live only on the cosine key of a calculator; every process governed by the cycloid law — a radial Kepler orbit, free-fall collapse, a closed dust universe — reads it at the instant when half of its time has elapsed.
:::


::: {.figure src="ch24-half-fall"}
**Half the time gone, less than a sixth of the way fallen.** The ink curve is the cycloid solution of radial free fall: $t/t_{\mathrm{ff}}$ across, $r/r_0$ up. Three points mark $\frac14, \frac12, \frac34$ of the time, at heights $0.961$, $0.837$ and $0.597$; the cyan half-time point sits at $\frac{1 + \sin\theta^*}{2}$, and the bracket on the right is the $0.163$ fallen by then. Computed from the formulas of the example above; the free-fall model itself is a literature result, not formalized in this book.
:::

## 24.7 Where the Chase Stops: A Diagonal Landing Is a Fixed Point, and Existence Without Contraction {#sec-ch24-7}

The chapter opened with a question: how can the chase of "spheres beyond spheres" from [Chapter 21](ch21-diagonalization-and-escape.md) ever come to a halt? The preceding sections answered one special case by contraction ($\cos$ squeezes the interval smaller and smaller) and another by enumeration ($1 + 1/x$ and its conjugate $1/(1+x)$ are the only two live binary fractional maps). The general self-referential reading of $\psi = \psi(\psi)$ requires an explicit premise: **if a listing captures its twisted diagonal, the self-application value at the landing address is a fixed point of the twist**. This conditional statement, independent of any particular function, is the Lean lemma below.

The setting has only three ingredients: a set of addresses $A$, a set of values $Y$, and a **listing** $g : A \to A \to Y$, which assigns to each address $a$ a row $g\ a : A \to Y$. Take in addition a **twist** $f : Y \to Y$. Twisting the diagonal $a \mapsto g\ a\ a$ of the listing pointwise yields a new row $a \mapsto f(g\ a\ a)$. Every escape phenomenon of Chapter 21 comes from one question: is this twisted diagonal one of the rows already in the listing?

::: {.definition #def-twisted-diagonal-escape title="Twisted Diagonal and Escape" lean="D5/S0/Diagonal/EscapeCount.diagonal D5/S0/Diagonal/EscapeCount.IsEscaped"}
Let $A$ and $Y$ be arbitrary types, $f : Y \to Y$, and $g : A \to A \to Y$.

1. The **twisted diagonal** [`diagonal`](lean:D5/S0/Diagonal/EscapeCount.diagonal) $f\ g : A \to Y$ is defined as $a \mapsto f(g\ a\ a)$;
2. The listing $g$ is **escaped** by $f$ ([`IsEscaped`](lean:D5/S0/Diagonal/EscapeCount.IsEscaped) $f\ g$) if $\operatorname{diagonal} f\ g \notin \operatorname{Set.range} g$, that is, if no address $a$ satisfies $g\ a = \operatorname{diagonal} f\ g$.
:::

When a listing is not escaped, some row $g\ a_0$ equals the twisted diagonal. Below we say that the listing **captures** its own twisted diagonal, and we call $a_0$ the **landing address**.

::: {.lemma #lem-diagonal-landing-fixed title="The Self-Application Value at a Diagonal Landing Is a Fixed Point of the Twist" lean="D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed"}
Let $f : Y \to Y$, $g : A \to A \to Y$, and $a_0 \in A$. If

$$
g\ a_0 \;=\; \operatorname{diagonal} f\ g,
$$

then

$$
f(g\ a_0\ a_0) \;=\; g\ a_0\ a_0 .
$$
:::

::: proof
Evaluate the equality of functions $g\ a_0 = \operatorname{diagonal} f\ g$ at the address $a_0$ (`congrFun`) to get $g\ a_0\ a_0 = \operatorname{diagonal} f\ g\ a_0 = f(g\ a_0\ a_0)$; swapping the two sides gives the claim. The full proof is checked by the Lean kernel.
:::

The proof is one line long, yet it is the skeleton of $\psi = \psi(\psi)$. Write $\psi := g\ a_0$; it is a row of the listing, itself a function on addresses. Read the address $a_0$ as the name $\ulcorner\psi\urcorner$ of this very row. Then $g\ a_0\ a_0 = \psi(\ulcorner\psi\urcorner)$ is "$\psi$ applied to its own name", and [@lem-diagonal-landing-fixed] states that

$$
f\bigl(\psi(\ulcorner\psi\urcorner)\bigr) \;=\; \psi(\ulcorner\psi\urcorner).
$$

The twist $f$ cannot move this value. The $\psi = \psi(\psi)$ of the book's title is the aphoristic form of this lemma: the row captured by its own listing takes, at its own name, a value that the twist leaves invariant.

The full picture of escape and capture is given by the next theorem. Note that it imposes no finiteness requirement on $A$ or $Y$.

::: {.theorem #thm-self-application-fragment-package title="The Self-Application Fragment: Diagonal Formula, Characterization of Escape, Universal Escape for Fixed-Point-Free Twists, and Necessity of the Hypothesis" lean="D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package"}
Let $A$ and $Y$ be arbitrary types, $f : Y \to Y$, and $g : A \to A \to Y$. All four of the following hold:

1. For every $a \in A$: $\operatorname{diagonal} f\ g\ a = f(g\ a\ a)$;
2. $\operatorname{IsEscaped} f\ g \iff \operatorname{diagonal} f\ g \notin \operatorname{Set.range} g$;
3. If $f$ has no fixed point ($f(y) \neq y$ for every $y \in Y$), then $\operatorname{IsEscaped} f\ h$ for every listing $h : A \to A \to Y$;
4. There exist $f_0 : \mathrm{Bool} \to \mathrm{Bool}$ and $g_0 : \mathrm{Unit} \to \mathrm{Unit} \to \mathrm{Bool}$ such that $\neg\operatorname{IsEscaped} f_0\ g_0$.
:::

::: proof
The first two claims hold by unfolding the definitions (`rfl` and `Iff.rfl`). Claim 3: if $f$ has no fixed point and some listing $h$ is not escaped, then some $a$ satisfies $h\ a = \operatorname{diagonal} f\ h$, and [@lem-diagonal-landing-fixed] gives $f(h\ a\ a) = h\ a\ a$, contradicting fixed-point-freeness (`escaped_of_fixedPointFree`). Claim 4 takes $f_0$ to be the identity and $g_0$ the listing that is constantly $\mathrm{true}$, whose twisted diagonal is its only row (`exists_captured_listing_of_fixedPoint`). The full proof is checked by the Lean kernel.
:::

Claim 3 of [@thm-self-application-fragment-package] is the skeleton of Cantor's diagonal argument, the same mechanism that lies behind [@thm-complete-diagonal-not-continuous] of Chapter 21 (stated there in the framework of surjective decoder catalogs); claim 4 shows that the hypothesis "no fixed point" cannot be dropped. Placing claim 3 next to [@lem-diagonal-landing-fixed] answers the opening question of this chapter:

- when the twist has no fixed point, the chase never stops, and every listing is escaped;
- once the chase stops, the value that the stopping row takes at its own address is a fixed point of the twist.

Conversely, as soon as the twist $f$ has a fixed point $y^*$ and $A$ is nonempty, the listing that is constantly $y^*$ captures its own twisted diagonal (this step is a manual verification by direct substitution). Take $f = \cos$ and $Y = \mathbb{R}$: for any real-valued listing that captures its own cosine-twisted diagonal, the self-application value at the landing address satisfies the cosine fixed-point equation $\cos y = y$ (for its classical real-analytic properties, see [@rem-banach-dottie-hairy-ball-literature]).

In the finite case, the shares of escape and capture can be counted exactly.

::: {.proposition #prop-escaped-listing-card title="Exact Count of Escaped Finite Listings" lean="D5/S0/Diagonal/EscapeCount.escaped_listing_card"}
Let $A$ and $Y$ be finite types (`[Fintype A]`, `[Fintype Y]`) and $f : Y \to Y$. The number of listings escaped by $f$ is

$$
\operatorname{Nat.card}\bigl\{\, g : A \to A \to Y \;\big|\; \operatorname{IsEscaped} f\ g \,\bigr\} \;=\; \Bigl(\lvert Y\rvert^{\lvert A\rvert} - \operatorname{Nat.card}\{\, y : Y \mid f(y) = y \,\}\Bigr)^{\lvert A\rvert},
$$

where $\lvert A\rvert = \operatorname{Fintype.card} A$, $\lvert Y\rvert = \operatorname{Fintype.card} Y$, and the subtraction on the right is subtraction of natural numbers.
:::

::: proof
First treat the case of empty $A$, where both sides equal $1$. For nonempty $A$, split a listing into its diagonal $X : A \to Y$ and the remaining entries of each row. With the diagonal $X$ fixed, the escape condition is independent row by row: if $f(X(a)) \neq X(a)$, row $a$ already differs from the twisted diagonal at position $a$, and its remaining $\lvert A\rvert - 1$ entries are free, giving $\lvert Y\rvert^{\lvert A\rvert - 1}$ choices; if $X(a)$ is a fixed point of $f$, the single choice in which the remaining entries all coincide with the twisted diagonal must be excluded, giving $\lvert Y\rvert^{\lvert A\rvert - 1} - 1$ choices. Summing over all values of $X(a)$, each row contributes $\lvert Y\rvert^{\lvert A\rvert} - k$, where $k$ is the number of fixed points of $f$; multiplying over the rows gives the claim. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-three-by-three-capture-escape title="Capture and Escape on a 3×3 Listing: One Table, Two Twists"}
Take $A = Y = \{0, 1, 2\}$ and the listing $g$ with rows

$$
g\ 0 = (0, 1, 2), \qquad g\ 1 = (1, 2, 2), \qquad g\ 2 = (2, 2, 2),
$$

whose diagonal is $(g\ 0\ 0,\ g\ 1\ 1,\ g\ 2\ 2) = (0, 2, 2)$.

**A twist with a fixed point.** Take $f_1 : 0 \mapsto 1,\ 1 \mapsto 2,\ 2 \mapsto 2$, with the unique fixed point $2$. The twisted diagonal is $(f_1(0), f_1(2), f_1(2)) = (1, 2, 2) = g\ 1$: the listing captures its own twisted diagonal at the landing address $a_0 = 1$. The self-application value there, $g\ 1\ 1 = 2$, is exactly the fixed point of $f_1$, in agreement with [@lem-diagonal-landing-fixed].

**A twist without fixed points.** Take the cycle $f_2 : 0 \mapsto 1,\ 1 \mapsto 2,\ 2 \mapsto 0$. The twisted diagonal is $(f_2(0), f_2(2), f_2(2)) = (1, 0, 0)$, which differs from $g\ 0$, $g\ 1$, $g\ 2$ at positions $0, 1, 2$ respectively and is therefore not a row: the listing is escaped, in agreement with claim 3 of [@thm-self-application-fragment-package].

**Counting.** For $\lvert A\rvert = \lvert Y\rvert = 3$ there are $3^9 = 19683$ listings in total. By [@prop-escaped-listing-card]: for $f_2$ (no fixed point) the escaped ones number $(27 - 0)^3 = 19683$, that is, all of them; for $f_1$ (one fixed point) $(27 - 1)^3 = 17576$ are escaped and $19683 - 17576 = 2107$ are captured, about $10.7\%$; for the identity (three fixed points) $(27 - 3)^3 = 13824$ are escaped. All three numbers were confirmed by exhaustive enumeration of the $19683$ listings.
:::

::: {.figure src="ch24-diagonal-landing"}
**One table, two twists: one lands back in the table, the other escapes it.** Both panels show the listing $g$ of the example above, with the three diagonal cells outlined and the twisted diagonal underneath. Left, with $f_1$: the twisted diagonal $(1, 2, 2)$ is exactly row $1$ (cyan), and the circled value $2$ at the landing spot is the fixed point of $f_1$ ([@lem-diagonal-landing-fixed]). Right, with the fixed-point-free cycle $f_2$: the twisted diagonal $(1, 0, 0)$, in magenta, differs from every row at that row's diagonal cell (crossed), so it is no row at all (claim 3 of [@thm-self-application-fragment-package]).
:::

The diagonal mechanism shows that the place where the chase stops must be a fixed point, but it does not guarantee that the twist has one. Where does existence come from? Section 24.4 used contraction. There is an entirely different route that needs no contraction constant at all, only continuity and a stage without holes.

::: {.theorem #thm-brouwer-standard-simplex title="Brouwer's Fixed-Point Theorem on the Standard Simplex" lean="D5/S3/Geometry/FixedPoint/Brouwer.Brouwer"}
Let $n$ be a positive natural number (`n : ℕ+`) and let $\Delta = \operatorname{stdSimplex}\ \mathbb{R}\ (\operatorname{Fin} n)$ be the standard simplex, the set of all functions $x : \operatorname{Fin} n \to \mathbb{R}$ with $x_i \ge 0$ for every $i$ and $\sum_i x_i = 1$, with the subspace topology. If $f : \Delta \to \Delta$ is continuous (`hf : Continuous f`), then there exists $x \in \Delta$ with

$$
f(x) = x .
$$
:::

::: proof
The proof is combinatorial. For each positive integer $l$, take the lattice points of the simplex whose coordinates have denominator $l$, and give each lattice point $x$ a colour: a coordinate $i$ with $x_i \le f(x)_i$ (such an $i$ exists because the coordinates of both points sum to $1$). A Scarf-type combinatorial lemma provides, for each $l$, a small cluster of lattice points together with a colour set $C$; any two points of the cluster differ by less than $2(n+1)$ in each lattice coordinate, so the diameter of the cluster tends to zero as $l \to \infty$. Only finitely many colour sets are possible, so one may pass to a subsequence along which $C$ is constant; by compactness of the simplex a further subsequence converges to a limit point $z$. At the limit, the coordinates outside $C$ satisfy $z_i = 0$ and the coordinates in $C$ sum to $1$; by continuity of $f$, $f(z)_i \ge z_i$ for every $i \in C$, hence $\sum_{i \in C} f(z)_i \ge 1$. Since the coordinates of $f(z)$ are nonnegative and sum to $1$, $f(z)_i = 0$ outside $C$ and the coordinates agree inside $C$, that is, $f(z) = z$. The full proof is checked by the Lean kernel.
:::

The standard simplex is not an abstract solid: it is the set of all probability distributions over $n$ record outcomes, the place where the diagonal of a density matrix lives after the pinching of [Chapter 4](ch04-decoherence.md). [@thm-brouwer-standard-simplex] therefore says that every continuous update rule for record probabilities has a self-consistent distribution, one that is still itself after the update.

Take $n = 2$; the simplex is the segment $\{(p, 1 - p) \mid p \in [0, 1]\}$. Since $\cos p \in [\cos 1, 1] \subset [0, 1]$ for $p \in [0, 1]$, the map $(p, 1 - p) \mapsto (\cos p, 1 - \cos p)$ is a continuous map of this segment into itself, and [@thm-brouwer-standard-simplex] yields $p \in [0, 1]$ with $\cos p = p$. (Substituting $\cos$ into the theorem is a manual remark of this book, not a frozen declaration.) So the **existence** of the cosine fixed point can be obtained without any contraction; what contraction supplies are two other things: **uniqueness**, and the **rate of convergence** computed in Section 24.5.

The two mechanisms divide the work, and the diagonal adds a third piece. A continuous self-map of the standard simplex has a fixed point; a contraction self-map of a nonempty complete metric space also gives uniqueness and convergence of iteration. If a listing captures its twisted diagonal, the value of the landing row at its own name is fixed by the twist. This last conclusion retains the capture hypothesis and does not guarantee capture for an arbitrary listing.

---

### Summary of Part VI: From Spheres Beyond Spheres to $\psi = \psi(\psi)$ — Ready to Forge the Mechanical Canon

Across the four chapters of Part VI, backed by **forty-four Lean-verified theorem blocks** (seven in Chapter 21, nineteen in Chapter 22, four in Chapter 23, and fourteen in Chapter 24), we have brought mathematical logic, prime spectral theory, Diophantine norm locks, and self-referential fixed points under one geometric roof:

- **Chapter 21** proved that any complete decoder catalog produces a relative semantic diagonal that is discontinuous in the latent partition topology ([@thm-complete-diagonal-not-continuous]), has a nonempty separation deficit ([@lem-complete-diagonal-separation-deficit]), and forces strict observation-topology refinement when adjoined ([@prop-complete-diagonal-strict-refinement], [@cor-complete-diagonal-topological-settlement]), gave the factorial remainder bound for the exponential series in a complete normed algebra ([@lem-exp-tail-le]) and the strictly positive cosine lower bound on the recovery error of a finite-record channel ([@lem-finite-support-autocorrelation-cosine], [@thm-finite-record-cosine-obstruction]), paired with the classical analytic-remainder and spherical-topology literature remarks ([@rem-lagrange-taylor-remainder-literature], [@rem-hairy-ball-adams-literature]);
- **Chapter 22** revealed primes as the orthogonal basis of arithmetic and established on the explicit half-plane $\operatorname{Re}(s) > 1$ the unit residue at $s = 1$ ([@lem-riemann-zeta-residue-one]), the Dirichlet series ([@prop-riemann-zeta-dirichlet-sum]), the Euler prime product ([@thm-riemann-zeta-euler-product]), their direct equality ([@cor-dirichlet-sum-eq-euler-product]), the linear independence of prime logarithms and the torus density of the joint prime-clock phases ([@thm-prime-log-independence], [@thm-torus-power-orbit-closure]), the entirety and reflection symmetry $\xi(1 - s) = \xi(s)$ of the completed xi reading ([@thm-xi-reading-entire-reflection]) together with its conjugation covariance ([@prop-zeta-conjugation-covariance]), the rolling of the critical line into the unit circle with a radial equivalent of the Riemann Hypothesis ([@thm-cayley-critical-line-criterion]), the sign of $\zeta$ on the real axis from the alternating series ([@lem-alternating-zeta-partial-sums], [@prop-zeta-real-axis-sign]), the identification of the zeros of $\xi$ with the zeros of $\zeta$ in the critical strip ([@prop-xi-zeros-strip-zeros]), the Prime Number Theorem with an error term, obtained from the absence of zeros on the line $\operatorname{Re}(s) = 1$ ([@thm-medium-pnt]), the reduction of the Riemann Hypothesis to the right half-strip together with the agreement of its two formulations ([@thm-right-half-strip-rh-forms]), a quartic polynomial showing that full symmetry does not pin zeros to the critical line ([@thm-full-symmetry-not-localization]), Robin's inequality on at most eight prime axes, read from the Euler product at $s = 1$ ([@thm-robin-at-most-eight-primes]), and the theorem that a zero right of the critical line forces some $\operatorname{lcm}(1, \dots, \lfloor t\rfloor)$ to violate Robin's inequality ([@thm-off-line-zero-robin-violation]), alongside the polyhedral prime-sieve remainder and the epistemic boundary of the open Riemann Hypothesis and classical zeta literature ([@conj-riemann-hypothesis], [@rem-euler-zeta-literature]);
- **Chapter 23** showed how quadratic norms and traces isolate discrete integer lattices, proving unimodular shear reduction, constant discriminant $\Delta = -3$, and range invariance for the Eisenstein crossing family ([@thm-qform-eq-eisnorm], [@lem-qform-discriminant], [@cor-qform-range-eq-eisnorm]) together with the $\Delta = +5$ Golden Pell trace–norm identity ([@prop-pell-form-eq-four-mul-norm]), and delineating in [@rem-diophantine-z-in-q-literature] the boundary between first-order definability literature over $\mathbb{Q}$ and the open existential problem $\mathrm{H10}(\mathbb{Q})$;
- **Chapter 24** proved finite contracting set stabilization and strict-change bounds ([@thm-finite-contracting-updates-stabilize]), adjacent-step agreement and static contextual non-uniqueness (identical text and interpretation rule under two distinct static contexts yield different fixed Boolean meanings, [@lem-conceptual-equivalence-stability-fixed-point], [@prop-context-parameters-distinct-fixed-points]), uniqueness of the positive golden fixed point ([@cor-golden-fixed-point-unique]), the four self-application fates of nondegenerate binary fractional maps with the $\varphi$-family as the only live one ([@thm-self-application-four-fates], [@lem-golden-inverse-branch-fixed-point]), the golden cosines of the regular pentagon ([@prop-pentagon-golden-cosines]), the diagonal landing as a fixed point of the twist together with universal escape for fixed-point-free twists and its finite count ([@lem-diagonal-landing-fixed], [@thm-self-application-fragment-package], [@prop-escaped-listing-card]), Brouwer's fixed-point theorem on the standard simplex ([@thm-brouwer-standard-simplex]), the convergence of orbit averages of an irrational rotation to the Haar average ([@lem-irrational-rotation-equidistribution]), and the normalized central-binomial coefficient bounds and binomial-kernel series used in the arcsine expansion ([@lem-arcsin-binomial-kernel]), established absolute convergence and the signed sum of the prescribed rational compositional inverse at $\pi$, together with uniqueness of the cosine fixed point among all positive reals ([@thm-dottie-rational-inverse-endpoint]), culminating — alongside the classical fixed-point and number-theory literature remark ([@rem-banach-dottie-hairy-ball-literature]) and Schanuel's conjecture ([@conj-schanuel-dottie]) — in $\cos\theta^* = \theta^*$ and the self-referential synthesis $\psi = \psi(\psi)$.

With the theoretical arch of Parts I–VI in place, **Part VII (*Construction and Verification — XOR Algebra, Rotor Compilation, and the Lean 4 Axiom Sanctuary*)** turns these geometric laws into executable matrix-free bitmask Clifford engines and ZYZ rotor compilers, and steps inside the Lean 4 formal sanctuary to audit the frozen proof architecture before **Part VIII** and the **Coda** bring the entire eight-part monograph together.
