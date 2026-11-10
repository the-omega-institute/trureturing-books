# Chapter 24 Cosine Fixed Points and Self-Reference: From $\cos\theta = \theta$ to $\psi = \psi(\psi)$

> *"If cos(theta) = theta, where did cos come from? Is cos equal to theta?"*
>
> *"This is the psi = psi(psi) we investigated from the very beginning."*

After a twenty-three-chapter ascent, we stand at the culmination of Part VI (*Crossing the Horizon — Spheres Beyond Spheres*) and at the philosophical summit of the entire book.

Draw straight the single geometric thread that has guided us since page one:

- In [Chapter 1](ch01-measurement.md) and [Chapter 2](ch02-born-rule.md), we eliminated the external "third point $C$" and showed that when a known reference state $\vv{a}$ measures (*liáng*) a target state $\vv{b}$, the relative angle $\theta$ spanned between them projects directly onto the compatibility reading $\cos\theta$;
- In [Chapter 21](ch21-diagonalization-and-escape.md), we proved that whenever the "language that measures" (a surjective `decoderCatalog` over a nonempty address space) is separated from the "coordinate that is measured" (`latent`) and paired with a fixed-point-free `twist`, the relative semantic diagonal splits the latent topology and forces a strict observation-topology refinement (with each further stage conditional on supplying a new surjective catalog over an enlarged address space).

How, then, can that infinite regress of spheres beyond spheres ever come to rest in a self-contained **self-referential fixed point**?

The answer lies in the deceptively simple question posed by our chapter epigraph: with no external notary handing down a ruler from outside the universe, **the compatibility reading $\cos\theta$ produced at one stage of comparison must serve directly as the radian angle $\theta$ opened at the next stage!** When the iteration $\theta_{k+1} = \cos\theta_k$ settles into its unique real fixed point

$$
\cos\theta^* = \theta^* \qquad (\theta^* \approx 0.7390851332\dots),
$$

ask once more: **in this equation, where did the operator $\cos$ on the left come from? Is there really a bare number $\theta^*$ standing apart from the operation $\cos$?**

No! In the geometric ontology of orthogonal comparison, there is neither a disembodied operator $\cos$ floating prior to measurement, nor an isolated tick mark $\theta^*$ subsisting apart from the act of comparison. The series $\cos(\cdot)$ *is* the law of orthogonal projection (even-order return, sign reversal $\hat{I}^2 = -1$ under every pair of $90^\circ$ turns, and factorial symmetrization), while $\theta^*$ *is* the equilibrium state locked when that operation acts upon itself. At the fixed point where the ruler that measures (the operator $\cos$ / function $\psi$) and the reading that is measured (the state $\theta^*$ / argument $\psi$) dissolve the boundary between subject and object, "$\cos = \theta$" condenses into the emblem on our title page:

$$
\psi = \psi(\psi).
$$

In this chapter we unfold this self-referential closure across four rigorous mathematical levels: **the Lean-verified stabilization theorem for contracting updates on finite sets**, **single-step context-relative interpretation fixed points and contextual non-uniqueness**, **the unique positive algebraic fixed point $\varphi = \frac{1+\sqrt{5}}{2}$ of the golden reciprocal map $x = 1 + 1/x$**, and the classical analysis and transcendental number theory of **the Dottie cosine fixed point $\theta^*$, its nonzero algebraic residuals $|\cos q - q| > 0$, and the Hairy Ball fixed/antipodal alternative on even spheres**.

![Cosine fixed points and self-referential closure: the Dottie cobweb spiral attractor cos θ* = θ*, finite contracting set stabilization, adjacent-step agreement, contextual non-uniqueness, and the unique golden reciprocal fixed point collapsing into ψ = ψ(ψ)](../assets/fig-24-dottie-spiral-attractor.svg)

## 24.1 Discrete Contraction Must Stabilize: The Finite Contracting Update Theorem {#sec-ch24-1}

Why does unguarded self-reference — such as the diagonal $g(a) = \neg D_a(q_L(a))$ driven by a fixed-point-free `twist` in [Chapter 21](ch21-diagonalization-and-escape.md) — oscillate or escape across dimensions, whereas other self-referential loops settle calmly into a fixed point?

The decisive property is **contractivity**. On the continuous interval $[0, 1]$, $\cos$ pulls every initial seed toward a single fixed point $\theta^*$ because its derivative obeys $|\cos'\theta| = |\sin\theta| \le \sin 1 < 1$, shrinking distances at every step; in a discrete finite state space, the exact counterpart is a **pointwise contracting set update** $U : \mathcal{P}(X) \to \mathcal{P}(X)$ satisfying $U(A) \subseteq A$ for every subset $A \subseteq X$.

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

[@thm-finite-contracting-updates-stabilize] provides the discrete foundation for self-referential fixed points in finite-state verification and concept pruning: any iterative refinement that monotonically eliminates incompatible candidates ($U(A) \subseteq A$) must reach a self-consistent fixed core $U(S_N) = S_N$ in at most $|S_0|$ steps.

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

(Moreover, as shown by [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor) in the same module, any claim of cross-context objectivity must supply an explicit invariant factor map taking the same value across all contextual fixed meanings — matching our basis-free trace pairing $\Tr(\rho P)$ from [Chapter 2](ch02-born-rule.md)!)

## 24.3 The Unique Algebraic Golden Lock: $x = 1 + 1/x$ and $\varphi = \frac{1+\sqrt{5}}{2}$ {#sec-ch24-3}

Before stepping into the transcendental cosine equation $\cos\theta = \theta$, let us examine the cleanest **rational self-referential fixed point** on the positive real half-line $(0, +\infty)$:

Combine the two elementary arithmetic operations "add $1$" and "invert $1/x$" into the continued-fraction feedback loop

$$
x_{k+1} = 1 + \frac{1}{x_k} = 1 + \frac{1}{1 + \frac{1}{1 + \frac{1}{\ddots}}}.
$$

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
2. **Fixed-point identity**: $\operatorname{goldenReciprocalMap}\!\left(\frac{1 + \sqrt{5}}{2}\right) = \frac{1 + \sqrt{5}}{2}$;
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

## 24.4 From $\cos\theta^* = \theta^*$ to $\psi = \psi(\psi)$: Transcendence, Remainder Seams, and the Hairy Ball Fixed/Antipodal Alternative {#sec-ch24-4}

Contrast the one-dimensional rational self-reference $x = 1 + 1/x$ of [@cor-golden-fixed-point-unique] (which stays inside the quadratic algebraic numbers $\overline{\mathbb{Q}}$ at $\varphi = \frac{1+\sqrt{5}}{2}$) with the two-dimensional rotational projection self-reference

$$
\cos\theta^* = \theta^*.
$$

Why does upgrading the self-referential operator from a one-dimensional rational fraction $1 + 1/x$ to the two-dimensional cosine projection $\cos\theta$ propel its unique fixed point $\theta^* \approx 0.7390851332\dots$ (the **Dottie number**) completely outside the field of algebraic numbers $\overline{\mathbb{Q}}$ into the **transcendental numbers**?

The following literature note synthesizes Banach's contraction principle on $[0, 1]$, the Lindemann–Weierstrass transcendence proof, the Lagrange Taylor remainder bound $|R_{2N}(\theta)|$, and the Hairy Ball fixed/antipodal theorem on even-dimensional spheres.

::: {.remark #rem-banach-dottie-hairy-ball-literature title="Banach Contraction on [0,1], Transcendence of the Dottie Root, Taylor Remainder Bounds, and the Hairy Ball Fixed/Antipodal Alternative (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Four classical theorems from analysis, transcendental number theory, and algebraic topology complement the four frozen declarations of this chapter:

1. **Banach contraction principle on $[0, 1]$ and global Picard convergence**:
   Whereas [@thm-finite-contracting-updates-stabilize] governs discrete contracting set updates $U(A) \subseteq A$ on a finite type $X$, on the real line $\mathbb{R}$ the cosine map sends $\mathbb{R}$ into $[-1, 1]$ and maps $[-1, 1]$ into the compact invariant interval $[0, 1]$. On $[0, 1]$, the mean value theorem gives the strict Lipschitz bound

   $$
   |\cos x - \cos y| \;\le\; (\sin 1)\,|x - y|, \qquad \sin 1 \approx 0.84147098 < 1.
   $$

   By Banach's contraction theorem on the complete metric space $[0, 1]$, $\cos$ has a **unique real fixed point** $\theta^* \approx 0.73908513321516\dots$ (the Dottie root), and Picard iteration $\theta_{k+1} = \cos\theta_k$ converges geometrically to $\theta^*$ from every real initial seed $\theta_0 \in \mathbb{R}$. Here $\sin 1$ is the worst-case constant over the whole interval; the asymptotic contraction rate at the fixed point is $\lvert\cos'\theta^*\rvert = \sin\theta^* \approx 0.6736$ (checked numerically in [@ex-dottie-rate-newton-rational]). (Symmetrically, the mirror equation $\cos\theta = -\theta$ has unique real root $-\theta^* \approx -0.7390851332\dots$.)
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
   By the Poincaré–Brouwer Hairy Ball Theorem ([@rem-hairy-ball-adams-literature]), every continuous tangent vector field on an even-dimensional sphere $S^{2n}$ vanishes at some point. As an immediate consequence, **every continuous self-map $f : S^{2n} \to S^{2n}$ has either a fixed point $f(x) = +x$ or an antipodal point $f(x) = -x$**! Indeed, if $f(x) \neq \pm x$ everywhere on $S^{2n}$, the tangential projection $v(x) = f(x) - \langle f(x), x\rangle x$ would define a nowhere-vanishing continuous tangent field on $S^{2n}$, a contradiction. Meanwhile, on the closed Bloch ball $B^{n+1}$, Brouwer's fixed-point theorem guarantees that every continuous quantum channel map $\Phi : B^{n+1} \to B^{n+1}$ admits at least one fixed state $\Phi(\vv{r}^*) = \vv{r}^*$.
:::

Pushing one step further into transcendental number theory, the author's foundational notes ask: *"What are the relations among transcendental numbers? Is $\pi$ a projection of $\theta$? Is $\theta$ the ultimate transcendental number?"* In modern number theory, the algebraic independence of $\theta^*$ and $\pi$ is governed by **Schanuel's Conjecture**, which we record as an open conjecture (`OPEN`, carrying no `lean` attribute).

::: {.conjecture #conj-schanuel-dottie title="Schanuel's Conjecture Applied to the Algebraic Independence of θ* and π"}
Assuming Schanuel's conjecture (for any $\mathbb{Q}$-linearly independent complex numbers $z_1, \dots, z_m \in \mathbb{C}$, the field extension $\mathbb{Q}(z_1, \dots, z_m, e^{z_1}, \dots, e^{z_m})$ has transcendence degree at least $m$ over $\mathbb{Q}$), applying it to the $\mathbb{Q}$-linearly independent purely imaginary exponents $z_1 = i\theta^*$ and $z_2 = i\pi$ (linear independence is the statement $\theta^*/\pi \notin \mathbb{Q}$, which holds unconditionally; see [@rem-dottie-angle-incommensurable]) — where $e^{i\pi} = -1 \in \mathbb{Q}$ and $u = e^{i\theta^*}$ satisfies the quadratic relation $u^2 - 2\theta^* u + 1 = 0$ (so $e^{i\theta^*}$ is algebraic of degree $2$ over $\mathbb{Q}(\theta^*)$ and **algebraically dependent** on $\theta^*$, contributing $0$ additional transcendence degree over $\mathbb{Q}(\theta^*)$) — implies that $\mathbb{Q}(i\theta^*, i\pi, e^{i\theta^*}, e^{i\pi}) \subseteq \overline{\mathbb{Q}(\theta^*, \pi)}$ has transcendence degree at least $2$ over $\mathbb{Q}$, and hence that **the Dottie constant $\theta^*$ and $\pi$ are algebraically independent over $\mathbb{Q}$** ($\operatorname{tr.deg}_{\mathbb{Q}}\mathbb{Q}(\theta^*, \pi) = 2$).

*(This statement is **OPEN**; the block intentionally carries no `lean` attribute.)*
:::

Let us compare the three self-referential trajectories of this chapter — discrete set contraction ([@thm-finite-contracting-updates-stabilize]), the algebraic golden continued fraction ([@cor-golden-fixed-point-unique]), and the transcendental Dottie spiral ([@rem-banach-dottie-hairy-ball-literature]) — side by side in a concrete hand calculation.

::: {.example #ex-dottie-and-golden-iterations title="Hand Comparison of Three Self-Referential Loops: Finite Set Pruning, Golden Continued Fraction, and Dottie Cosine Spiral"}
Starting from the unit seed $1$ (or a three-element initial set), compare how three self-referential operators lock onto their respective fixed points:

1. **Discrete finite-set contraction ($S_{n+1} = U(S_n)$, [@thm-finite-contracting-updates-stabilize])**: On $X = \{0, 1, 2\}$ with $S_0 = \{0, 1, 2\}$ ($|S_0| = 3$), let $U$ delete the largest positive element at each step: $S_0 = \{0, 1, 2\} \to S_1 = \{0, 1\} \to S_2 = \{0\} \to S_3 = \{0\} = S_2$. The sequence stabilizes at $N = 2 \le 3$ with exactly $|\{0, 1\}| = 2 \le 3$ strict changes.
2. **One-dimensional algebraic reciprocal loop ($x_{k+1} = 1 + 1/x_k$, [@cor-golden-fixed-point-unique])**: Starting from $x_0 = 1$, rational iteration generates successive Fibonacci ratios $F_{k+2}/F_{k+1}$:

   $$
   x_0 = 1 \;\to\; x_1 = 2 \;\to\; x_2 = \frac{3}{2} = 1.5 \;\to\; x_3 = \frac{5}{3} \approx 1.6667 \;\to\; x_4 = \frac{8}{5} = 1.6 \;\to\; \cdots \;\to\; \varphi = \frac{1+\sqrt{5}}{2} \approx 1.61803399,
   $$

   converging to the unique positive quadratic algebraic root $\varphi \in \overline{\mathbb{Q}}$ of $\varphi^2 - \varphi - 1 = 0$.
3. **Two-dimensional rotational cosine loop ($\theta_{k+1} = \cos\theta_k$, [@rem-banach-dottie-hairy-ball-literature])**: Starting from $\theta_0 = 1$ radian, repeated cosine evaluation yields

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

   At the transcendental equilibrium $\theta^*$, the horizontal inner-product shadow equals $\cos\theta^* = \theta^* \approx 0.739085$, while the orthogonal bivector area is locked by Pythagoras's theorem at $\sin\theta^* = \sqrt{1 - (\theta^*)^2} \approx 0.67361203$!
:::

Look at the final line of [@ex-dottie-and-golden-iterations]: at $\cos\theta^* = \theta^*$, why did we call the left side $\cos$ and the right side $\theta^*$? Only because dualistic grammar habits split "the ruler that measures" (function $\psi$) from "the tick mark that is measured" (state $\theta$). Once you see that $\cos$ is nothing other than the series of orthogonal comparison, and $\theta^*$ is nothing other than the infinite self-nesting $\cos(\cos(\cos(\cdots)))$ of that very comparison, operator and operand, observer and observed fuse into a single equation:

$$
\psi = \psi(\psi).
$$

> When the ruler measures another, it is called the operator $\cos$ and the other is called the state $\theta$; when the ruler turns back to measure the angle it opens itself, operator and state become one: $\psi = \psi(\psi)$.

## 24.5 Carrying the Loop Through: True Convergence Rate, Derivative Speed-Up, and the Width of the Rational Seam {#sec-ch24-5}

The aphorism is stated; now let us do the arithmetic. The cosine table in [@ex-dottie-and-golden-iterations] lists only four rows, and the contraction constant $\sin 1 \approx 0.8415$ of [@rem-banach-dottie-hairy-ball-literature] is the worst case over the whole interval $[0, 1]$. Three questions are still open:

1. Close to $\theta^*$, by how much does one press of the cosine key actually shrink the error?
2. If the ruler reads not only the projection $\cos\theta$ but also the orthogonal component $\sin\theta$, how much faster does the loop close?
3. How close to $\cos q = q$ can a ruler with finitely many rational tick marks get?

**First question: position and rate lie on one unit circle.** Write the error as $\delta_k = \theta_k - \theta^*$, expand $\cos$ about $\theta^*$, and cancel the zeroth-order term with $\cos\theta^* = \theta^*$:

$$
\delta_{k+1} \;=\; \cos(\theta^* + \delta_k) - \theta^* \;=\; -\sin\theta^*\,\delta_k \;-\; \frac{\theta^*}{2}\,\delta_k^2 \;+\; O(\delta_k^3).
$$

The minus sign of the linear coefficient says that the iterates straddle $\theta^*$ alternately from the right and from the left, which is the square spiral of the cobweb diagram. Its modulus

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

and the ratio $\lvert\cos q - q\rvert / \lvert q - \theta^*\rvert$ tends to $1 + \sin\theta^* = 1 + \lambda \approx 1.6736120$ as $q \to \theta^*$. So "how small can the residual of a finite-precision reading be" and "how well can rationals approximate $\theta^*$" are the same question, and the second is answered by the continued fraction of $\theta^*$. Since $\theta^*$ is irrational (item 2 of [@rem-banach-dottie-hairy-ball-literature]), every one of its convergents $a/b$ satisfies $\lvert\theta^* - a/b\rvert < 1/b^2$, and hence

$$
0 \;<\; \Bigl\lvert\cos\frac{a}{b} - \frac{a}{b}\Bigr\rvert \;<\; \frac{1 + \sin 1}{b^2}
$$

holds for infinitely many denominators $b$: the seam narrows like the square of the denominator, yet never closes.

::: {.example #ex-dottie-rate-newton-rational title="Numerical Check of the True Contraction Rate, Newton's Quadratic Closure, and the Residuals of the Best Rational Readings"}
All values below were recomputed at 50 decimal digits and then truncated; the partial quotients of the continued fraction are numerical observations, not theorems.

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

The last table of [@ex-dottie-rate-newton-rational] shows that refining the tick marks does not automatically buy a better reading. What sets the width of the seam is not the size of the denominator but its arithmetic relation to $\theta^*$: a ruler with twenty-three divisions happens to line up almost exactly at its seventeenth mark, and a ruler with a thousand divisions does not.

Rational readings never line up. What about a different kind of closure: instead of asking the projection to return to itself, ask a rotation to return to its starting point? The answer is again no, and this time no conjecture is needed.

::: {.remark #rem-dottie-angle-incommensurable title="θ* and π Are Incommensurable: Rotation by the Fixed-Point Angle Never Closes (Corollary of a Literature Result, Not Formalized in This Book)"}
**Corollary of a literature result, not formalized in this book.** The hypothesis used in [@conj-schanuel-dottie], that $i\theta^*$ and $i\pi$ are linearly independent over $\mathbb{Q}$, is equivalent to $\theta^*/\pi \notin \mathbb{Q}$. This holds without any conjecture:

Suppose $\theta^* = \frac{m}{n}\pi$ with integers $m, n$ and $n \ge 1$. Put $\zeta = e^{i m\pi/n}$. Then $\zeta^{2n} = 1$, so $\zeta$ is a root of unity and hence algebraic, and therefore $\cos\frac{m\pi}{n} = \frac{\zeta + \zeta^{-1}}{2}$ is algebraic as well. But $\cos\theta^* = \theta^*$, so $\theta^*$ would be algebraic, contradicting the transcendence obtained from the Lindemann–Weierstrass theorem in item 2 of [@rem-banach-dottie-hairy-ball-literature]. Hence $\theta^*/\pi$ is irrational (numerically $\theta^*/\pi \approx 0.2352581$, that is, $\theta^* \approx 42.3465^\circ$).

Two consequences follow:

1. **The rotation has infinite order.** The plane rotation $R(\theta^*)$ by the angle $\theta^*$ satisfies $R(\theta^*)^n \ne \mathrm{id}$ for every integer $n \ge 1$, because $R(\theta^*)^n = \mathrm{id}$ if and only if $n\theta^* \in 2\pi\mathbb{Z}$. Correspondingly, no positive integer power of the unit rotor $U(\theta^*) = \cos(\theta^*/2) - \hat{I}\sin(\theta^*/2)$ equals $\pm 1$.
2. **The orbit is dense and equidistributed.** By Kronecker's theorem and Weyl's equidistribution theorem, the sequence $\{n\theta^* \bmod 2\pi\}_{n \ge 0}$ is dense and equidistributed on the circle.

Whether $\theta^*/\pi$ is transcendental is not settled by this argument; it holds under Schanuel's conjecture, since it follows from the conclusion of [@conj-schanuel-dottie] (algebraic independence of $\theta^*$ and $\pi$).
:::

Put the two facts side by side: the cosine projection closes in one step at $\theta^*$ ($\cos\theta^* = \theta^*$), while the rotation with step $\theta^*$ never returns to its starting point. The same angle is a fixed point for projection and an open helix for rotation.

## 24.6 "Is $\pi$ a Projection of $\theta$?": Two Mutually Inverse Series, Kepler's Equation, and Half-Time Free Fall {#sec-ch24-6}

The question in the author's notes, *"Is $\pi$ a projection of $\theta$?"*, received at [@conj-schanuel-dottie] a conditional answer in the negative direction: under Schanuel's conjecture, no polynomial relation with integer coefficients holds between $\theta^*$ and $\pi$. But "no algebraic relation" is not "no relation". The answer in the positive direction is already inside the fixed-point equation and can be read off in one step.

**The fixed point cuts the right angle in two.** For $x \in [0, 1]$, the unique solution of $\cos\theta = x$ on $[0, \pi/2]$ is $\theta = \arccos x = \frac{\pi}{2} - \arcsin x$. Substituting $x = \theta = \theta^*$:

$$
\cos\theta^* = \theta^* \quad\Longleftrightarrow\quad \frac{\pi}{2} \;=\; \theta^* + \arcsin\theta^* .
$$

On the unit circle, the point $P = (\cos\theta^*, \sin\theta^*) = (\theta^*, \lambda)$ cuts the quarter arc of the first quadrant into two pieces. The lower piece, from $(1, 0)$ to $P$, has length $\theta^*$, which is exactly the abscissa of $P$; the upper piece, from $P$ to $(0, 1)$, has length $\arcsin\theta^*$. $P$ is the only point of this arc whose arc length equals its own abscissa.

The power series of the arcsine has rational coefficients only and does not contain $\pi$:

$$
\arcsin x \;=\; \sum_{n \ge 0} \frac{\binom{2n}{n}}{4^n\,(2n+1)}\,x^{2n+1} \;=\; x + \frac{x^3}{6} + \frac{3x^5}{40} + \frac{5x^7}{112} + \cdots \qquad (\lvert x\rvert \le 1).
$$

Hence $\pi$ is the value at $\theta^*$ of a power series with rational coefficients:

$$
\pi \;=\; A(\theta^*), \qquad A(x) \;=\; 2x + 2\arcsin x \;=\; 4x + \frac{x^3}{3} + \frac{3x^5}{20} + \frac{5x^7}{56} + \frac{35x^9}{576} + \cdots .
$$

This is the positive answer to the question, and it is stronger than "projection": knowing $\theta^*$ alone, one computes $\pi$ to any accuracy using nothing but additions and multiplications.

**The reverse direction: reading $\theta^*$ from $\pi$.** The linear coefficient of $A$ at $0$ is $4 \neq 0$, so $A$ has a formal inverse $B = A^{-1}$, again an odd power series with rational coefficients. Order-by-order reversion gives

$$
B(y) \;=\; \frac{y}{4} - \frac{y^3}{768} - \frac{y^5}{61440} - \frac{43\,y^7}{165150720} - \frac{223\,y^9}{47563407360} - \cdots .
$$

$B$ has an equivalent description without series: first solve $\eta + \sin\eta = y/2$, then set $B(y) = \sin\eta$. Indeed, if $x = \sin\eta$ with $\eta \in [-\pi/2, \pi/2]$, then $A(x) = 2\sin\eta + 2\eta = y$. For $y = \pi$, the equation $\eta + \sin\eta = \pi/2$ is solved by $\eta = \frac{\pi}{2} - \theta^* = \arcsin\theta^*$ (substitution gives $\frac{\pi}{2} - \theta^* + \cos\theta^* = \frac{\pi}{2}$), so $B(\pi) = \sin\eta = \cos\theta^* = \theta^*$. That the series $B$ converges to this value at $y = \pi$ is a literature result (see the example below).

::: {.example #ex-dottie-pi-series title="Two Mutually Inverse Rational Series Linking π and θ*: Numerical Check of the Partial Sums"}
The series $B$ and the identity $\theta^* = B(\pi)$ are due to Kaplan (2007, *Mathematics Magazine* 80, "The Dottie Number"): **literature result, not formalized in this book.** The expansion of $A$ is the classical arcsine series. The coefficients in the table were obtained by order-by-order reversion in exact rational arithmetic; the partial sums were computed at 50 digits and truncated.

| truncation order | partial sum of $A$ (tends to $\pi$) | difference from $\pi$ | partial sum of $B$ (tends to $\theta^*$) | difference from $\theta^*$ |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $2.9563405$ | $1.85\times10^{-1}$ | $0.7853982$ | $4.63\times10^{-2}$ |
| $3$ | $3.0909148$ | $5.07\times10^{-2}$ | $0.7450254$ | $5.94\times10^{-3}$ |
| $5$ | $3.1239947$ | $1.76\times10^{-2}$ | $0.7400446$ | $9.59\times10^{-4}$ |
| $7$ | $3.1347505$ | $6.84\times10^{-3}$ | $0.7392582$ | $1.73\times10^{-4}$ |
| $9$ | $3.1387490$ | $2.84\times10^{-3}$ | $0.7391185$ | $3.33\times10^{-5}$ |
| $11$ | $3.1403573$ | $1.24\times10^{-3}$ | $0.7390918$ | $6.71\times10^{-6}$ |
| $21$ | $3.1415655$ | $2.72\times10^{-5}$ | $0.7390851363$ | $3.11\times10^{-9}$ |

The ratio of successive terms of $A$ tends to $(\theta^*)^2 \approx 0.546$. The ratio of successive nonzero terms of $B$ rises from $0.12$ (order $5$) to $0.22$ (order $21$) and numerically approaches $1/4$: reading $\theta^*$ from $\pi$ converges faster than reading $\pi$ from $\theta^*$.
:::

So two statements hold together without contradiction: analytically, each of $\pi$ and $\theta^*$ is the value of a rational power series at the other; algebraically, under Schanuel's conjecture, no polynomial relation holds between them. $A$ and $B$ are infinite series, not polynomials, and every finite truncation leaves a nonzero difference, as every row of the table does.

**Where the fixed point lives: the half-time of a cycloid.** The auxiliary equation $\eta + \sin\eta = \pi/2$ above does not come from nowhere. With $E = \pi - \eta$ it becomes

$$
E - \sin E \;=\; \frac{\pi}{2},
$$

which is Kepler's equation $M = E - e\sin E$ with eccentricity $e = 1$ and mean anomaly $M = \pi/2$, solved by $E = \frac{\pi}{2} + \theta^* \approx 132.35^\circ$. A Kepler orbit of eccentricity $1$ degenerates into a radial segment, and motion along it is free fall.

::: {.example #ex-dottie-free-fall title="Half-Time Free Fall: When Half the Fall Time Has Elapsed, the Distance Remaining Is (1 + sin θ*)/2"}
In Newtonian mechanics, a particle falls radially from rest at distance $r_0$ in the field of a central mass $M$. Energy conservation gives $\dot{r}^2 = 2GM\left(\frac{1}{r} - \frac{1}{r_0}\right)$, whose solution is the cycloid parametrization (a classical result):

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

**Comparison and check.** At $t/t_{\mathrm{ff}} = \frac14, \frac12, \frac34$ the ratio $r/r_0$ equals $0.960937$, $0.836806$, $0.597150$ respectively; only the middle one has a closed form in terms of $\theta^*$. Numerical integration of $t(r) = \int_r^{r_0} \mathrm{d}r' \big/ \sqrt{2GM\left(\frac{1}{r'} - \frac{1}{r_0}\right)}$ gives $t(0.836806\,r_0)/t_{\mathrm{ff}} = 0.500000$, in agreement with the closed form.

The same parametric equations describe the closed dust Friedmann universe, with $r$ replaced by the scale factor and time reversed (literature result, not formalized in this book): halfway through its expansion phase in time, such a universe has already reached $83.68\%$ of its maximum size.
:::

Half the time is spent, yet less than one sixth of the distance is covered: the fall starts slowly, and most of the distance is travelled in the second half. And "half", the plainest of all division points, lands at a position given exactly by $\theta^*$. The cosine fixed point does not live only on the cosine key of a calculator; every process governed by the cycloid law — a radial Kepler orbit, free-fall collapse, a closed dust universe — reads it at the instant when half of its time has elapsed.

---

### Summary of Part VI: From Spheres Beyond Spheres to $\psi = \psi(\psi)$ — Ready to Forge the Mechanical Canon

Across the four chapters of Part VI, backed by **sixteen Lean-verified theorem blocks** (four per chapter), we have brought mathematical logic, prime spectral theory, Diophantine norm locks, and self-referential fixed points under one geometric roof:

- **Chapter 21** proved that any complete decoder catalog produces a relative semantic diagonal that is discontinuous in the latent partition topology ([@thm-complete-diagonal-not-continuous]), has a nonempty separation deficit ([@lem-complete-diagonal-separation-deficit]), and forces strict observation-topology refinement when adjoined ([@prop-complete-diagonal-strict-refinement], [@cor-complete-diagonal-topological-settlement]), paired with Taylor remainder seams $R_{2N}(\theta)$, Descartes's $12 \times 60^\circ = 720^\circ = 4\pi$ polyhedral angular defect, the Hairy Ball Theorem, and Adams's parallelizable spheres $S^0, S^1, S^3, S^7$ ([@rem-hairy-ball-adams-literature]);
- **Chapter 22** revealed primes as the orthogonal basis of arithmetic and established on the explicit half-plane $\operatorname{Re}(s) > 1$ the unit residue at $s = 1$ ([@lem-riemann-zeta-residue-one]), the Dirichlet series ([@prop-riemann-zeta-dirichlet-sum]), the Euler prime product ([@thm-riemann-zeta-euler-product]), and their direct equality ([@cor-dirichlet-sum-eq-euler-product]), alongside the polyhedral prime-sieve remainder and the epistemic boundary of the open Riemann Hypothesis ([@conj-riemann-hypothesis], [@rem-euler-zeta-literature]);
- **Chapter 23** showed how quadratic norms and traces isolate discrete integer lattices, proving unimodular shear reduction, constant discriminant $\Delta = -3$, and range invariance for the Eisenstein crossing family ([@thm-qform-eq-eisnorm], [@lem-qform-discriminant], [@cor-qform-range-eq-eisnorm]) together with the $\Delta = +5$ Golden Pell trace–norm identity ([@prop-pell-form-eq-four-mul-norm]), and auditing Koenigsmann's 2016 $\forall$/$\forall\exists$ first-order definition of $\mathbb{Z}$ in $\mathbb{Q}$ vs. the open existential problem $\mathrm{H10}(\mathbb{Q})$ ([@rem-diophantine-z-in-q-literature]);
- **Chapter 24** proved finite contracting set stabilization and strict-change bounds ([@thm-finite-contracting-updates-stabilize]), adjacent-step agreement and static contextual non-uniqueness (identical text and interpretation rule under two distinct static contexts yield different fixed Boolean meanings, [@lem-conceptual-equivalence-stability-fixed-point], [@prop-context-parameters-distinct-fixed-points]), and uniqueness of the positive golden fixed point ([@cor-golden-fixed-point-unique]), culminating in Banach contraction on $[0, 1]$, Lindemann–Weierstrass transcendence ($|\cos q - q| > 0$), Schanuel's conjecture ([@conj-schanuel-dottie], [@rem-banach-dottie-hairy-ball-literature]), and the self-referential synthesis $\psi = \psi(\psi)$.

With the theoretical arch of the book complete, **Part VII (*Forging the Blade — Mechanical Canon: Matrix-Free Engines and Formal Proof Libraries*)** turns these geometric laws into executable matrix-free bitmask Clifford engines and ZYZ rotor compilers, and steps inside the Lean 4 formal temple to audit the complete formal verification ledger of the monograph.
