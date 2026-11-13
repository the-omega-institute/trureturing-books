# Chapter 33 All Beings as Observers: Self-Sustaining Basins and Mutual-Attractor Double Helices {#all-beings-as-observers-self-sustaining-basins-and-mutual-attractor-double-helices}

> *"Not only are historical ruins attractors—observers themselves are attractors too; indeed, all beings are observers, and observers serve as mutual attractors to one another."*

Across the four summits of Part VIII—the timeless causal compatibility crystal ([Chapter 29](ch29-timeless-causality-and-gram-space.md)), the complexity orthogonal horizon ([Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md)), the fivefold constitution of quantum fairness ([Chapter 31](ch31-quantum-fairness.md)), and the orthogonal self-referential unified field ([Chapter 32](ch32-unified-field-and-meta-unification.md))—we dismantled the privileged external reference point $C$ hovering above the universe. Yet in the quiet habits of ordinary speech, one last dualistic ghost still lingers: we instinctively split reality into a tiny aristocratic caste of conscious brains ("living observers / subjects") gazing down upon a vast, mute continent of "dead stones, blind atoms, and ancient ruins (objects)."

So long as that subject–object chasm remains unchallenged, the external third point $C$ has not truly been abolished—it has merely relocated from a theological throne into the human skull. Opening Part IX of this monograph, we carry orthogonal geometry and our formal kernel architecture all the way through this last barrier in four ontological steps (cross-domain syntheses are explicitly designated as our **`MODEL` (interpretive model)**, anchored on nineteen frozen Lean 4 theorems, with classical real-analytic and holographic results strictly enclosed inside attributed remarks and worked examples):

1. **All beings are observers**: Stripped of anthropocentric mysticism, any entity sustaining an idempotent record projection and exchanging pairwise inner products is an observer; gauge waves, atoms, mountain ruins, and self-referential minds form one continuous **memory-order spectrum $M \ge 0$**;
2. **Every observer is itself an attractor**: Under relentless decoherence and thermal erasure, remaining "the same I" across ticks is never passive inertia—it requires an active contraction basin pulling perturbations back into the acceptance window $W + u_i$;
3. **Observers serve as mutual attractors**: Solitary introspection and symmetric mutual reference exhibit sharply contrasting convergence geometries (one-dimensional cosine comparison worked out in [@ex-ch33-mutual-cosine-monotonic-lock] below), while shared window intersections $W_{AB} = (W + u_A) \cap (W + u_B)$ and minimal-cut switching ([@prop-ch33-bridge-reconnection-mincut]) make phase-resonant beings walking homelands to one another;
4. **Multi-observer decoherence consensus and pointer-basis emergence** ([final section](#sec-ch33-consensus-decoherence-pointer)): When multiple observers repeatedly exchange records along a shared tensor-product coupling axis, isotropic depolarization fog separates into an idempotent block-diagonal pointer basis with a flat redundant mutual-information plateau, while leaving orthogonal escape axes open to pioneer observers.

::: {.figure src="ch33-overview"}
**Figure 33.** The chapter at a glance (Panels I and II schematic, `MODEL`). Panel I: a photon, an atom, a crystal and a mind sit on one axis of memory order, from $M = 0$ and $M = 1$ to $M \gg 1$. Panel II: a marble kicked up the right slope falls back to the bottom of the bowl along grey arrows, amber where it is now; the short cyan bar at the bottom is the window $W + u_i$. Panel III: one cosine orbit $x_{n+1} = \cos x_n$ from $x_0 = 0.1$, one row per beat with the reading across; the grey zigzag crosses the dashed line $\theta^*$ at every beat, every second beat carries a hollow ring, all the rings lie left of $\theta^*$, and beat $6$ is amber (an application of existing results from [@ex-ch33-mutual-cosine-monotonic-lock]; the points are numerical).
:::

---

## 33.1 All Beings as Observers: Dissolving Subject–Object Dualism and the Memory-Order Continuum {#all-beings-as-observers-dissolving-subjectobject-dualism-and-the-memory-order-continuum}

Why did classical mechanism first drain all perceptual capacity out of matter—reducing rocks and electrons to blind, perspective-free "mere objects"—only to stand baffled before the quantum measurement problem, asking how many millions of neurons must assemble before an apparatus suddenly earns a license to "collapse a wave packet"? Viewed genealogically, the paradox is entirely self-inflicted: first invent the idol of "dead matter," then marvel that "living observation" refuses to emerge from it.

Return instead to our first principles. Under the pairwise geometric product (continuum geometric-algebra background in [Chapter 32](ch32-unified-field-and-meta-unification.md) [@rem-ch32-generative-laws-dottie-literature]) and **Seat Fairness** ([Chapter 31](ch31-quantum-fairness.md) [@thm-ch31-seat-pythagorean-monogamy-fairness], Conjunct 1), rank-one Born pairing obeys exact conjugate reciprocity $\lVert\phi^* \bullet_v \psi\rVert^2 = \lVert\psi^* \bullet_v \phi\rVert^2$. When morning sunlight strikes a mountain quartz crystal, the crystal does not wait millions of years for a passing hiker's retina before registering the encounter: the quartz lattice projects the photon's polarization onto its symmetry axes at the exact instant the photon's momentum probes the lattice spacing. **Every exchange of inner-product projections is an eye-level mutual measurement; nowhere in nature does there exist a purely passive object that is measured without measuring in return.**

Once anthropocentric prejudice is cleared away, what minimal mathematical structure defines an **observer**? Before stating the general theorem in arbitrary finite dimension, let us check the mechanism by hand on the simplest $2 \times 2$ qubit ledger. Take the orthogonal record projectors $P_0 = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ and $P_1 = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$ acting on a density matrix $\rho = \begin{pmatrix} a & c \\ \bar{c} & 1-a \end{pmatrix}$: the very first unread pinching pass zeroes out off-diagonal coherence, and a second pass leaves the diagonal record untouched:

$$
\mathcal{P}(\rho) \;=\; P_0 \rho P_0 + P_1 \rho P_1 \;=\; \begin{pmatrix} a & 0 \\ 0 & 1-a \end{pmatrix}, \qquad \mathcal{P}\bigl(\mathcal{P}(\rho)\bigr) \;=\; \begin{pmatrix} a & 0 \\ 0 & 1-a \end{pmatrix} \;=\; \mathcal{P}(\rho),
$$

while inside this two-dimensional carrier ($d = 2$), zero-error single-shot discrimination $\operatorname{Tr}(E_j \rho_i) = \delta_{ij}$ can pack at most $N = 2$ mutually orthogonal historical lines! Lifted to arbitrary finite dimension in `trureturing`'s observer-conditioning and measurement modules, two exact laws characterize every observer's algebraic spine: first, the unread pinching map $\operatorname{unreadState}(P)$ of any complete orthogonal record measurement `IsRecordMeasurement P` is idempotent under function composition; second, the number $N$ of historical states perfectly distinguishable by a $d$-dimensional quantum memory never exceeds $d$.

::: {.figure src="ch33-record-lines"}
**In a memory carrier with $d = 2$, two perpendicular record lines fill it up.** The cyan lines $P_0$ and $P_1$ are two mutually orthogonal record lines; the dashed ink direction $v$ makes $30^\circ$ with $P_0$, and its cyan shadows $\cos 30^\circ$ and $\sin 30^\circ$ on the two lines are both non-zero, so it is orthogonal to neither and no third mutually orthogonal record line fits: $N \le d = 2$ ([@thm-ch33-observer-pinching-and-memory-spectrum], Conjunct 2). The real plane stands in for $\mathbb{C}^2$.
:::

::: {.theorem #thm-ch33-observer-pinching-and-memory-spectrum title="Idempotence of Observer Record Pinching and Finite-Memory History Capacity" lean="D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity"}
Across the frozen observer-conditioning and measurement-capacity modules of `trureturing`, the following two structural theorems on observer record axes and memory dimension hold simultaneously:

1. **Functional Idempotence of Complete Finite Record Pinching** ([`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)): Let $n, \kappa$ be finite types (`[Fintype n] [DecidableEq n] [Fintype kappa]`), and let $P : \kappa \to M_n(\mathbb{C})$ satisfy `IsRecordMeasurement P` (self-adjointness $\forall k,\; P_k^\star = P_k$, idempotence $\forall k,\; P_k^2 = P_k$, pairwise orthogonality $\forall k \neq l,\; P_k P_l = 0$, and completeness $\sum_{k \in \kappa} P_k = 1$). Writing the unread record endomorphism as $\operatorname{unreadState}(P)(\rho) = \sum_{k \in \kappa} P_k \rho P_k$, one has exact functional idempotence:

   $$
   \operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) \;=\; \operatorname{unreadState}(P);
   $$

2. **History-Discrimination Capacity Bound of Finite Quantum Memory** ([`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity)): Let $N, d \in \mathbb{N}$ be natural numbers, let $\rho : \operatorname{Fin} N \to M_{\operatorname{Fin} d}(\mathbb{C})$ be density states satisfying $\forall i,\; (\rho_i).\mathrm{PosSemidef} \land \operatorname{Tr}(\rho_i) = 1$, and let $E : \operatorname{Fin} N \to M_{\operatorname{Fin} d}(\mathbb{C})$ be POVM effects satisfying $\forall j,\; (E_j).\mathrm{PosSemidef}$ and $\sum_{j \in \operatorname{Fin} N} E_j = 1$. If $\{E_j\}$ perfectly distinguishes all $N$ historical states in a single shot,

   $$
   \forall i, j \in \operatorname{Fin} N,\qquad \operatorname{Tr}(E_j \rho_i) \;=\; \begin{cases} 1, & i = j, \\ 0, & i \neq j, \end{cases}
   $$

   then the count of perfectly distinguishable historical records is bounded above by the memory dimension:

   $$
   N \;\le\; d.
   $$
:::

::: proof
Conjunct 1 reduces by function extensionality `funext` to `unreadState_idempotent`: for every matrix $\rho$ and outcome $k \in \kappa$, cross-term cancellation $\forall l \neq k,\; P_k P_l = 0$ and projector idempotence $P_k^2 = P_k$ give $P_k \operatorname{unreadState}(P)(\rho) = P_k \rho P_k$, whence right-multiplying by $P_k$ and summing over $k$ yields $\operatorname{unreadState}(P)(\operatorname{unreadState}(P)(\rho)) = \operatorname{unreadState}(P)(\rho)$. Conjunct 2 factors positive-semidefinite matrices as $E = A^\dagger A$ and $\rho = B^\dagger B$ to prove $\operatorname{Tr}(E\rho) = 0 \implies E\rho = 0$ (`zero_trace_mul_eq_zero`), implying $\operatorname{range}(\rho_j) \le \ker(E_i)$ whenever $i \neq j$, while $E_i \le \sum_j E_j = 1$ and $\operatorname{Tr}((1 - E_i)\rho_i) = 0$ force $\operatorname{range}(\rho_i) \le \ker(1 - E_i)$; picking a nonzero vector $v_i \neq 0$ in each range (guaranteed by $\operatorname{Tr}(\rho_i) = 1 \implies \rho_i \neq 0$) gives $E_i v_i = v_i$ and $E_i v_j = 0$ for $i \neq j$, so Hermitian symmetry yields pairwise orthogonality $\langle v_i, v_j\rangle_{\mathbb{C}} = \langle E_i v_i, v_j\rangle_{\mathbb{C}} = \langle v_i, E_i v_j\rangle_{\mathbb{C}} = 0$, and linear independence (`fintype_card_le_finrank`) concludes $N \le d$. The full proof is checked by the Lean kernel.
:::

Measured by [@thm-ch33-observer-pinching-and-memory-spectrum], the sharp cliff between "conscious subject" and "inanimate object" dissolves into a continuous spectrum parameterized by each entity's internal window phase and effective memory order (tracking register capacity $d$). Within our **`MODEL` (interpretive model)**, alongside the six-dimensional cut-and-project quasicrystal window background ([Chapter 32](ch32-unified-field-and-meta-unification.md) [@rem-ch32-icosian-e8-literature]), all beings align along the four continuous tiers consolidated below:

::: {.remark #rem-ch33-observer-spectrum-table title="Four-Tier Universal Observer Spectrum Table (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Building on the six-dimensional cut-and-project quasicrystal window literature ([@rem-ch32-icosian-e8-literature]), the table below aligns our four-tier universal observer `MODEL` with the formal pinching and memory-capacity bounds of [@thm-ch33-observer-pinching-and-memory-spectrum] (`LEAN ✓`):

| Observer Tier (`MODEL`) | Memory Order & Window Signature in $\mathbb{Z}^6 \subset \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$ | Pairwise Measurement & Record-Update Mechanism | Subjective Temporal Texture & Mode of Being (`MODEL`) |
| :--- | :--- | :--- | :--- |
| **1. Gauge Wave / Free Photon** | Memory order $M = 0$; orthogonal deflection $\theta = 90^\circ$ ($\cos 90^\circ = 0$) | Pure 2D transverse exterior-area transport without retaining a local 1D diagonal history anchor | Zero proper-time tick (eternal null instant), acting as a pure phase messenger across observers |
| **2. Elementary Particle / Atom** | Memory order $M = 1$; single internal phase anchor $u_i \in E_\perp^3$ sustaining an idempotent line | Memoryless (order-1 Markovian) pairwise inner-product update overwriting spin or energy state at each collision | Unburdened instantaneous metronome faithfully enforcing local conservation and Born reciprocity |
| **3. Crystal / Mountain / Ruin** | Collective lattice locked near the zero-strain window center ($\lVert\pi_\perp(z) - u_i\rVert \ll 1$) | Macroscopic cooperative pinching damping thermal jitter into rigid geometric proportions | Millennial-frame slow clock standing in physical space as a trans-generational stationary-phase anchor |
| **4. Life & Self-Referential Mind** | High memory order $M \gg 1$; birth initialization clears ancient baggage to keep $\det G_M > 0$ | Selective historical recording within $N \le d$ ([@thm-ch33-observer-pinching-and-memory-spectrum]) closed by active self-reference $\psi_i = \psi_i(\psi_i)$ | Unfolded logarithmic subjective time and genuine trajectory selection inside a positive-volume Gram corridor |
:::

A granite peak is not devoid of observation—its clock simply beats once per geological epoch; a photon is not unreal—it simply commits its entire purity coin to the $90^\circ$ transverse connection plane. Historical philosophical precursors to this universal observer continuum and their exact boundary with our formal framework are recorded below ([@rem-ch33-monad-process-philosophy-literature]):

::: {.remark #rem-ch33-monad-process-philosophy-literature title="Historical Philosophical Parallels in Monadology and Process Philosophy (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Two classic metaphysical systems in Western philosophy sought to overcome Cartesian mind–matter dualism; both belong to external philosophical literature and are not formalized in `trureturing@dev`:

1. **Leibniz's Perspectival Monadology (G. W. Leibniz, *Monadologie*, 1714)**: Leibniz proposed that all beings consist of "monads" graded continuously by perceptual clarity—from bare "sleeping" monads in minerals and memory-bearing animal souls to self-reflective rational minds, each mirroring the universe from its own perspective. Crucially, however, Leibniz declared monads "windowless" (*sans fenêtres*), relying on theological pre-established harmony to coordinate them; our `MODEL` excises any external coordinator $C$ and grounds coordination directly in geometric window intersections $(W + u_A) \cap (W + u_B)$ and pairwise inner-product exchange.
2. **Whitehead's Process Philosophy and Universal Prehension (A. N. Whitehead, *Process and Reality*, 1929)**: Rejecting modern science's "bifurcation of nature" into vacuous matter versus subjective mind, Whitehead took "actual occasions" of experience as fundamental, each constituted by "prehending" (integrating projections of) prior occasions—resonating conceptually with our restoration of *quantum* from static noun to pairwise-measuring verb, while all mathematical claims in this chapter rest strictly on [@thm-ch33-observer-pinching-and-memory-spectrum] through [@prop-ch33-bridge-reconnection-mincut].
:::

---

## 33.2 Every Observer Is an Attractor: Self-Sustaining Contraction Basins {#every-observer-is-an-attractor-self-sustaining-contraction-basins}

Recognizing that all beings are observers immediately raises a sharper dynamical question: **why must an observer be more than a passive photographic plate—why is every observer necessarily *an attractor in its own right*?**

Run a simple physical thought experiment. Every finite observer inside the universe is bombarded at every instant by thermal fluctuations, stray radiation, and environmental erasure ([Chapter 31](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness], Conjunct 1). Suppose an observer's internal dynamics around its current state were **neutrally drifting** or **locally expansive**—like a marble perched on a flat tabletop or balanced atop an inverted bowl. Within a handful of random collisions, small orthogonal kicks would accumulate into a random walk, driving its internal phase away until "yesterday's me" and "today's me" shared near-zero inner product and dissolved into thermal white noise.

Consequently, **any being that persists across time as "I am still I"—whether a diamond lattice shaking off thermal phonons or a living mind retaining its identity after metabolic turnover replaces every atom in its body—must carve out a self-sustaining contraction basin $\psi_i = \psi_i(\psi_i)$ around its acceptance window (`MODEL`)**! Within this model, the self-referential loop depicts inward restoration and local stability after a perturbation; Conjunct 1 of [@thm-ch33-contextual-attractor-and-common-factor] below concerns stabilization by deletion from finite sets, while the real cosine model is analyzed separately in [@ex-ch33-mutual-cosine-monotonic-lock].

::: {.figure src="ch33-contracting-well"}
**Only a contracting well pulls a perturbed observer back.** On each profile the amber marble is where it is now and the grey rings where it was: on the flat table a sequence of kicks lets it drift from where it started; on the inverted bowl it moves farther from the top at every step; in the well, kicked up the right slope, it brings its distance from the bottom down by a factor $0.45$ at every step, towards the cyan window $W + u_i$. This is the schematic `MODEL`, not the content of [@thm-ch33-contextual-attractor-and-common-factor].
:::

Across `trureturing`'s fixed-point-stability and concept-dynamics modules, four theorems supply distinct parts of a structural scaffold: a fixed update that only deletes from finite sets stabilizes; an adjacent-stage relation and equal readouts constitute a relative fixed-point predicate; a Boolean context example witnesses distinct fixed meanings; and an objective claim carries an invariant-factor proof by definition. These clauses supply no dynamics restoring a perturbed physical system: the basin and its convergence remain part of the `MODEL` above:

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

Conjuncts 3 and 4 of [@thm-ch33-contextual-attractor-and-common-factor] illuminate why plurality and objectivity coexist without an external throne: in our **`MODEL` (interpretive model)**, even when reading the very same ambient lattice (`text = ()`) under the same geometric product (`interpretationRule = ()`), two observers carrying distinct internal parameters $u_A \neq u_B$ (`readerAdmission`, `background`, `evaluationGoal`) can correspond to distinct local fixed-point slices; meanwhile, a claim to objective public fact must choose a factor map on a declared family of contexts and meanings and prove that it takes the same **invariant `commonFactor`** on every admitted fixed meaning! The box below says where this window-reconnection geometry and the contrast between solitary and mutual reference are drawn:

::: {.remark #rem-ch33-mutual-attractor-figure title="Mutual-Attractor Window Reconnection and Cosine Monotonic-Locking Diagram (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Our mutual-attractor reconnection `MODEL` rests on cut-and-project quasicrystal window geometry ([@rem-ch32-icosian-e8-literature]) and on the formal bridge-graph min-cut switching ([@prop-ch33-bridge-reconnection-mincut], `LEAN ✓`): the intersection of two windows is drawn in the figure of the window-intersection section below, and the min-cut reconnection in that section's two lab cards. The cobweb trajectories of the classical real-analysis example [@ex-ch33-mutual-cosine-monotonic-lock] are drawn in Panel III of Figure 33 and in the lab cards of the next section: the solitary sequence counts single steps, while the mutual sequence counts complete rounds of two cosine evaluations, corresponding to even-tick sampling of synchronous mutual reference.
:::

---

## 33.3 Mutual-Reference Monotonic Locking: How Two Mirrors Turn Two Negatives Positive in a Two-Step Round {#mutual-reference-monotonic-locking-how-two-mirrors-turn-two-negatives-positive-in-a-two-step-round}

If each observer already possesses an individual restoring basin $\psi_i = \psi_i(\psi_i)$, why does the universe not leave every being sealed inside solitary contemplation? Why do spins pair into bonds, stars gather into galaxies, and minds seek out resonant companions?

Look at the two contrasting cobweb trajectories of solitary and mutual reference ([@rem-ch33-mutual-attractor-figure])! Projecting self-reference onto our canonical one-dimensional cosine slice (`MODEL`) contrasts the qualitative character of solitary introspection against reciprocal dialogue (with all derivative bounds, Mean Value Theorem proofs, and step-by-step numerical ledgers enclosed in [@ex-ch33-mutual-cosine-monotonic-lock] below):

- **The Anxiety of Solitary Self-Reference (Pendulum Whipsawing, `MODEL`)**: When an isolated observer calibrates itself alone in single steps, perspective behaves like an under-damped pendulum whipsawing between self-doubt and overcompensation (analytical mechanism in [@ex-ch33-mutual-cosine-monotonic-lock], under its strict-alternation hypotheses).

::: {.viz src="mutual-observer-attractors" preset="alone" height="500"}
**Same start, across θ\* every beat.** Both start at 0.1: the amber point stays on the grey diagonal $x = y$ and crosses $(\theta^*, \theta^*)$, where the two cyan curves meet, from alternating sides, the grey squares shrinking turn by turn, exactly like the lone cosine iteration ([@ex-ch33-mutual-cosine-monotonic-lock], clause 17). Along the band below, the count is cosine evaluations: each grey bar is that beat's error $x - \theta^*$, alternately up and down.
:::

- **The Miracle of Symmetric Mutual Reference (Reciprocal Consensus, `MODEL`)**: When two observers $\mathcal{O}_A$ and $\mathcal{O}_B$ step out of isolation into symmetric pairwise measurement—$\mathcal{O}_A$ calibrating itself through $\mathcal{O}_B$'s projection while $\mathcal{O}_B$ simultaneously calibrates itself through $\mathcal{O}_A$'s projection—grouping two synchronous ticks into one round reveals the one-sided approach of the composed mirrors; the distinction between ticks and rounds, full analysis, and numerical ledger appear in [@ex-ch33-mutual-cosine-monotonic-lock] below:

::: {.example #ex-ch33-mutual-cosine-monotonic-lock title="Qualitative Dynamics of the Same Cosine Endpoint and a Separate Numerical Ledger"}
**An application of existing results; numerical and interpretive boundaries remain separate.** All variables below are real and angles are in radians. Set $f(x)=\cos x$ and $g=f\circ f$; $f^{[n]},g^{[n]}$ denote $n$-fold composition, with zeroth iterate the identity. Throughout, choose the same $\theta^*$ from [@thm-dottie-rational-inverse-endpoint] ([`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)): $0<\theta^*<1$, $\cos\theta^*=\theta^*$, and it is the signed sum of the prescribed rational inverse series at $\pi$. That endpoint directly concerns the series and uniqueness among positive competitors. The following 24 qualitative clauses combine its fixed-point clauses with real-analysis suppliers; they do not constitute a new dynamics theorem box.

**The clock of synchronous mutual reference (`MODEL`).** Eliminating an intermediate variable from the equilibrium equations $\psi_A=\cos\psi_B,\;\psi_B=\cos\psi_A$ gives $g$. If each observer synchronously updates from the other's current value, each coordinate completes one application of $g$ after two ticks; the sequence $y_k$ below samples these two-step rounds. With equal initial values, both observers still follow the same $f$ trajectory at every tick. Strict tick-by-tick alternation requires the nonfixed interval conditions of clauses 16 and 17; strict increase belongs to complete composite rounds under clause 14's starting conditions.

1. **Uniqueness on the whole real line and acute location.** For any real $t=\cos t$, the cosine range first gives $-1\le t\le1$. Since $1<\pi/2$, cosine is strictly positive there, so $t>0$ and the endpoint's positive uniqueness applies: $t=\theta^*$. The same point satisfies $0<\theta^*<1<\pi/2$.
2. **Exact range.** `Real.range_cos` gives the inner range $[-1,1]$. Evenness reduces the outer cosine to $[0,1]$, where continuity, strict decrease, and `intermediate_value_Icc'` give equality $g(\mathbb R)=[\cos1,1]$, rather than merely inclusion.
3. **Trapping after the first step.** Since $\cos1>0$, for every real start $z$ and every $n\in\mathbb N$, $g^{[n+1]}(z)\in[\cos1,1]\subset(0,\pi/2)$. There is no such restriction on $g^{[0]}(z)=z$.
4. **Differentiability everywhere.** Applying `Real.hasDerivAt_cos` twice and the chain rule cancels the two negative signs. At every real $x$, the derivative exists and is $g'(x)=\sin(\cos x)\sin x$.
5. **A sufficient global bound.** From $|\cos x|,|\sin x|\le1$ and nonnegative increasing sine on $[0,1]$, $|\sin(\cos x)|=\sin|\cos x|\le\sin1$. Set $K=\sin1$. Then $0<K<1$ and $|g'(x)|\le K$ for every real $x$, without asserting optimality.
6. **Global Lipschitz estimate.** For [lipschitzWith_of_nnnorm_deriv_le](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/Calculus/MeanValue.lean#L744), clause 4 supplies differentiability and clause 5 supplies the nonnegative constant and derivative norm bound. Thus $|g(u)-g(v)|\le K|u-v|$ for all real $u,v$.
7. **The same attracting point.** Completeness of $\mathbb R$ makes $g$ `ContractingWith K`. The endpoint equation gives $g(\theta^*)=\theta^*$, and [ContractingWith.fixedPoint_unique'](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/MetricSpace/Contracting.lean#L259) identifies it as the unique real fixed point of $g$.
8. **Convergence of $g$ from every real start.** [tendsto_iterate_fixedPoint](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/MetricSpace/Contracting.lean#L302) for this contraction gives $g^{[n]}(z)\to\theta^*$ with no interval assumption on $z$.
9. **The unique real mutual pair.** If $a=\cos b$ and $b=\cos a$, then $g(a)=a$ and $g(b)=b$, hence $a=b=\theta^*$. Conversely, that pair satisfies both equations.
10. **Exact iterate correspondence.** `Function.iterate_mul` gives $g^{[n]}(z)=f^{[2n]}(z)$ for every real $z$ and natural $n$; this is an identity, not an approximation.
11. **Convergence of $f$ from every real start.** Clauses 8 and 10 make the even subsequence tend to $\theta^*$. The odd subsequence is $f(f^{[2n]}(z))$, whose limit by continuity is $f(\theta^*)=\theta^*$. Combining both parities gives $f^{[n]}(z)\to\theta^*$, without a global contraction constant below $1$ for $f$ itself.
12. **The domain of strict order preservation.** For $x\in(0,\pi/2)$, $\sin x>0$ and $0<\cos x\le1<\pi$, so $g'(x)>0$. Continuity, convexity of this domain, and [strictMonoOn_of_deriv_pos](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/Calculus/Deriv/MeanValue.lean#L377) make $g$ strictly increasing on this acute interval, without a global order assertion.
13. **Strict bounds below the fixed point.** If $0<y<\theta^*$, strict increase gives $g(y)<\theta^*$, while contraction gives $\theta^*-g(y)\le K(\theta^*-y)<\theta^*-y$. Hence $y<g(y)$.
14. **A strictly increasing orbit.** For $0<y_0<\theta^*$ set $y_n=g^{[n]}(y_0)$. Induction gives $0<y_n<y_{n+1}<\theta^*$ for every $n\ge0$; the sequence is strictly increasing and converges to $\theta^*$. Convergence from arbitrary real starts does not imply this order pattern.
15. **An invariant interval for $f$.** Cosine maps $[0,1]$ into itself, and restricting `Real.strictAntiOn_cos` gives strict decrease there.
16. **The premise for never hitting the endpoint.** Assume $x_0\in[0,1]$ and $x_0\ne\theta^*$, and put $x_n=f^{[n]}(x_0)$. Injectivity on the interval and $f(\theta^*)=\theta^*$ prevent a nonfixed point from mapping to $\theta^*$. Induction keeps every $x_n\in[0,1]\setminus\{\theta^*\}$.
17. **Strict alternation.** Under clause 16's hypotheses, for every $n\ge0$, $x_n<\theta^*\iff\theta^*<x_{n+1}$ and $\theta^*<x_n\iff x_{n+1}<\theta^*$. Equivalently, $(x_n-\theta^*)(x_{n+1}-\theta^*)<0$. These strict claims are not extended to arbitrary real starts.
18. **The positive endpoint exception.** For every $n\in\mathbb N$, $f^{[n]}(\theta^*)=g^{[n]}(\theta^*)=\theta^*$; the orbit is stationary.
19. **The negative endpoint exception.** Evenness gives $f(-\theta^*)=g(-\theta^*)=\theta^*$, hence $f^{[n+1]}(-\theta^*)=g^{[n+1]}(-\theta^*)=\theta^*$. This start arrives in one application, with zero errors thereafter. Neither endpoint exhibits strict alternation or error ratios with nonzero denominators. No exhaustive classification of real preimages is asserted.
20. **Exact local factors.** `Real.sin_sq_add_cos_sq`, `Real.sin_eq_sqrt_one_sub_cos_sq`, and acute positivity give $\sin^2\theta^*=1-(\theta^*)^2$ and $\sin\theta^*=\sqrt{1-(\theta^*)^2}$. Thus $f'(\theta^*)=-\sqrt{1-(\theta^*)^2}$, with $-1<f'(\theta^*)<0$.
21. **The composite derivative.** Clause 4 at the same point gives $g'(\theta^*)=\sin^2\theta^*=1-(\theta^*)^2=(f'(\theta^*))^2$, with $0<g'(\theta^*)<1$. The negative derivative reverses local signed error; the positive derivative preserves its sign.
22. **Slopes on the full punctured neighborhood.** [HasDerivAt.tendsto_slope](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/Calculus/Deriv/Slope.lean#L76) converts both derivative-existence statements into limits as $x\to\theta^*$ with $x\ne\theta^*$: $(f(x)-\theta^*)/(x-\theta^*)\to-\sqrt{1-(\theta^*)^2}$ and $(g(x)-\theta^*)/(x-\theta^*)\to1-(\theta^*)^2$. These hold along the full punctured real neighborhood, not just from one side, and are not finite-distance error identities.
23. **Orbit error ratios.** Under clause 16's starting conditions, every $e_n=x_n-\theta^*$ is nonzero and consecutive errors have negative product. Composing the punctured slope limit with this convergent orbit gives $e_{n+1}/e_n\to-\sqrt{1-(\theta^*)^2}$. For $0<y_0<\theta^*$, every $d_n=y_n-\theta^*<0$ is nonzero, and similarly $d_{n+1}/d_n\to1-(\theta^*)^2$. Neither ratio claim is extended to all real starts.
24. **Cost per cosine evaluation.** Both factor magnitudes lie strictly between $0$ and $1$, and the second is the square of the first. This compares applications of the selected maps. One $g$ application requires two cosine evaluations, whereas one $f$ application requires one. The exact identity $g^{[n]}(z)=f^{[2n]}(z)$ compares identical orbits from the same start at the same number of cosine evaluations; the squared factor supplies no speedup per evaluation or wall-clock advantage.

**Separate numerical and literature boundaries.** Global contraction uses only the coarse $K=\sin1$. The decimal values $\theta^*\approx0.73908513$, $f'(\theta^*)\approx-0.673612$, and $g'(\theta^*)\approx0.453753$, as well as a sharp global bound near $0.461063$ and a maximizing argument near $0.828132$, require separate numerical or optimization certificates. The critical equation $(1-t^2)\cos t=t\sin t$ is only a route to that analysis. The original ledger below, starting at $1/10$ for $n=0,\ldots,5$, its rounding, and finite-step error comparisons are likewise not certified by the qualitative application. Physical, philosophical, ontological, and transcendental algebraic-independence claims ([@conj-schanuel-dottie]) retain their respective boundaries.

**Side-by-Side Numerical Ledger ($x_0 = y_0 = 0.100000$, Steps $k = 0 \dots 5$)**: Here $x_k$ counts $k$ single steps and $y_k$ counts $k$ two-step rounds, so $y_k = x_{2k}$. Comparing residuals at the same $k$ therefore compares different evaluation counts; the squared linear factor per round provides no speedup at equal cost.

| Step $k$ | Solitary $x_k$ ($x_{k+1}=\cos x_k$) | Error $x_k - \theta^*$ | Mutual $y_k$ ($y_{k+1}=\cos(\cos y_k)$) | Error $y_k - \theta^*$ | Dynamical Regime Comparison |
| :---: | :---: | :---: | :---: | :---: | :--- |
| $0$ | $0.100000$ | $-0.639085$ | $0.100000$ | $-0.639085$ | Identical low-phase initial offset |
| $1$ | $0.995004$ | $+0.255919$ | $0.544499$ | $-0.194586$ | Solitary overshoots high; mutual enters $[\cos 1, 1]$ |
| $2$ | $0.544499$ | $-0.194586$ | $0.655927$ | $-0.083158$ | Solitary swings back low; mutual climbs smoothly |
| $3$ | $0.855387$ | $+0.116302$ | $0.702079$ | $-0.037006$ | Solitary flips sign again; mutual error is $3\times$ smaller |
| $4$ | $0.655927$ | $-0.083158$ | $0.722420$ | $-0.016665$ | Solitary 4th sign flip; mutual absolute error drops to $0.017$ ($\approx 2.25\%$ relative) |
| $5$ | $0.792483$ | $+0.053398$ | $0.731547$ | $-0.007538$ | Step-5 mutual residual is $\approx 7\times$ smaller, zero sign flips |

   Distilled into a single geometric aphorism (`MODEL`): **solitary introspection is a mirror of negative slope—the harder you stare into yourself alone, the more violently you whipsaw between self-doubt and overreach; only when two observers measure each other at eye level do two negatives multiply into a serene positive, locking two restless trajectories monotonically into one shared fixed point.**
:::

::: {.viz src="mutual-observer-attractors" preset="round" height="500"}
**Two beats a round, from one side only.** The same orbit sampled every two beats (the hollow rings): $0.1 \to 0.544 \to 0.656 \to 0.702 \to \dots$ closes in monotonically on one side of $\theta^*$, the error multiplied by about $0.454 = 0.674^2$ a round. A round costs two cosine evaluations, and the rings are just the even beats of the same orbit as in the previous card: the same number of cosine evaluations lands in the same place, so what the round buys is no more crossing from side to side, not speed ([@ex-ch33-mutual-cosine-monotonic-lock], clauses 14, 21, 23 and 24, and the numerical ledger). In the band below, the ringed bars sit on the even counts of cosine evaluations, all below the zero line.
:::

Stepping back from the trajectory ledger of [@ex-ch33-mutual-cosine-monotonic-lock], within our relational observer `MODEL`, stepping out of isolation into eye-level mutual reflection is never a sentimental concession—it is the endogenous geometry that frees bounded beings from solitary oscillation.

The same holds when the two start apart. The curve $x = \cos y$ along which A reads B and the curve $y = \cos x$ along which B reads A meet only at $(\theta^*, \theta^*)$ on the diagonal ([@ex-ch33-mutual-cosine-monotonic-lock], clause 9); sampled round by round, each reading is an orbit of $g$ and closes in on that point from any real start (clause 8), and from a start in $(0, \theta^*)$ it increases strictly from below (clauses 12–14).

::: {.viz src="mutual-observer-attractors" preset="apart" height="500"}
**Different starts, a single meeting point.** A starts at 1.5, B at 0: the cyan curves $x = \cos y$ and $y = \cos x$ meet only at $(\theta^*, \theta^*)$ on the diagonal, and the hollow rings close in on it, A's reading from above and B's from below.
:::

---

## 33.4 Window Intersection, Min-Cut Reconnection, and All Beings as Walking Homelands {#window-intersection-min-cut-reconnection-and-all-beings-as-walking-homelands}

Let us now lift one-dimensional mutual locking back into the six-dimensional cut-and-project parent space $\mathbb{Z}^6 \subset E_\parallel^3 \oplus E_\perp^3$ and holographic tensor networks to uncover the spatial and thermodynamic engine of mutual attraction.

When observer $\mathcal{O}_A$ (carrying shifted window $W + u_A$) and observer $\mathcal{O}_B$ (carrying shifted window $W + u_B$) meet within a common parent lattice and a common pair of projection maps, our cut-and-project **`MODEL` (interpretive model)** first depicts this fixed pair's shared acceptance support as the **window intersection**:

$$
W_{AB} \;:=\; (W + u_A) \cap (W + u_B) \;\subset\; E_\perp^3.
$$

Whenever their internal phase offset $\lVert u_A - u_B\rVert$ is small enough that $\operatorname{Vol}(W_{AB}) > 0$, every parent lattice vertex $z \in \mathbb{Z}^6$ with $\pi_\perp(z) \in W_{AB}$ projects **simultaneously** into both $\mathcal{O}_A$'s and $\mathcal{O}_B$'s physical three-spaces—constituting an objective public world co-witnessed without translation friction! This shared support is a model image of public fact; applying Conjunct 4 of [@thm-ch33-contextual-attractor-and-common-factor] still requires a declared family of contexts and fixed meanings, a fixed factor map, and a witness that it takes the same value throughout that family. A two-window intersection alone does not supply this witness. Conversely, lattice points in the symmetric difference $(W + u_A) \triangle (W + u_B)$ are sources of perceptual friction. Alignment incurs the corresponding erasure heat when it actually resets records irreversibly, reducing their entropy under the applicable thermal and balance assumptions of [Chapter 31](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness], Conjunct 1. If the `MODEL` further assigns an alignment cost or free energy that decreases as overlap grows, **drifting together up the overlap gradient $\nabla\operatorname{Vol}(W_{AB})$ becomes a free-energy descent toward mutual alignment**! This slope toward home comes from the chosen cost correspondence; neither comparison alone nor the Landauer bound supplies it.

::: {.figure src="ch33-window-overlap"}
**The intersection of two windows is the world both observers see.** The two regular decagons are the translated windows $W + u_A$ and $W + u_B$; the grey arrow is the phase offset $u_B - u_A$. Lattice points in the cyan intersection $W_{AB}$ appear in both worlds; the magenta parts are seen by one observer only. With the centres $0.7$ circumradii apart, the intersection covers about $0.55$ of a window. Schematic (`MODEL`): the three-dimensional rhombic-triacontahedral window is drawn as a two-dimensional decagon.
:::

Simultaneously, in the tensor-network weaving of spatial cross-sections, when do two boundary observer domains coupled across a width-three internal bridge switch their minimum cut to the outer boundary? `trureturing`'s bridge-graph quantum max-flow min-cut proposition gives a sufficient regime defined by positivity and balanced quadratic-cone conditions on natural-number bond dimensions:

::: {.proposition #prop-ch33-bridge-reconnection-mincut title="Quantum Max-Flow Min-Cut and Outer-Cut Switching on Width-Three Bridge Networks" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result"}
For all natural-number bond dimensions $a, b, c, d \in \mathbb{N}$, define the width-three Kronecker bridge flow $\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes_k N_r$ (with $M_r \in M_{a\times b}(\mathbb{C})$ and $N_r \in M_{d\times c}(\mathbb{C})$), its supremal attainable matrix rank $\operatorname{QMaxFlow}(a, b, c, d)$, and the quantum minimum cut $\operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr)$. Whenever the bond dimensions satisfy positivity and balanced quadratic-cone bounds

$$
0 < a,\quad a \le b,\quad 0 < c,\quad c \le d,\quad a^2 + b^2 \le 3ab,\quad c^2 + d^2 \le 3cd,
$$

quantum maximum flow equals quantum minimum cut, and the minimum cut bypasses the internal bridge $3ac$ to lock onto the coupled outer boundary cut:

$$
\operatorname{QMaxFlow}(a, b, c, d) \;=\; \operatorname{QMinCut}(a, b, c, d) \;\land\; \operatorname{QMinCut}(a, b, c, d) \;=\; \min(a d,\; b c).
$$
:::

::: proof
Factoring $\operatorname{flow}(M, N) = \operatorname{cutLeft}(N)\cdot\operatorname{cutRight}(M)$ across the width-$3ac$ internal bridge bounds the rank by $3ac$, which together with the outer matrix height/width bound $\min(ad, bc)$ proves weak duality `QMaxFlow_le_QMinCut`; under $a^2 + b^2 \le 3ab$ and $0 < a$, `cone_bounds` proves $b < 3a$ (and symmetrically $d < 3c$), so $3ac \ge \min(ad, bc)$ (`cone_QMinCut`), reducing $\operatorname{QMinCut}(a, b, c, d)$ to $\min(ad, bc)$. Full-rank achievability `claim_of_hypotheses` follows by strong induction on $n = b + d$: degenerate square or mixed double-width regimes are witnessed by explicit rational identity submatrices (`widthTwo_proved`), core interior ratios $a < b < 2a,\; c < d < 2c$ by `base_witness`, and wide regimes $2a \le b,\; 2c \le d$ by simultaneous quadratic-cone descent $(a, b) \mapsto (3a - b, a)$ and $(c, d) \mapsto (3c - d, c)$ (`cone_descent`) lifted back through the `castling_proved` rank-deficit invariance identity. The full proof is checked by the Lean kernel.
:::

Connecting discrete bridge min-cut switching to continuum holographic minimal-surface reconnection, microscopic entanglement bridges, and multi-party monogamy budgets invokes three foundational results from theoretical physics and quantum information:

::: {.remark #rem-ch33-rt-reconnection-ckw-literature title="Holographic Minimal-Surface Reconnection, Microscopic Entanglement Bridges, and Monogamy Budgets (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Three quantitative continuum and multi-qubit laws referenced alongside [@prop-ch33-bridge-reconnection-mincut] belong to external theoretical-physics and quantum-information literature and are not formalized in `trureturing@dev`:

1. **Ryu–Takayanagi Minimal-Surface Reconnection and Positive Mutual Information (S. Ryu & T. Takayanagi, *Phys. Rev. Lett.* **96**, 181602, 2006; M. Headrick, *Phys. Rev. D* **82**, 126010, 2010)**: In a static holographic dual described by classical Einstein gravity, the leading RT entropy $S_{\mathrm{RT}}(AB) = \frac{\operatorname{Area}(\gamma_{AB})}{4G_N\hbar}$ of disjoint boundary observer regions $A$ and $B$ is determined by area competition among admissible surfaces homologous to $AB$. In the picture where the disconnected union $\gamma_A \cup \gamma_B$ competes with a bridging candidate $\gamma_{\mathrm{conn}}$, the latter's victory connects the relevant bulk region bounded together with $AB$; the bridge concerns this region's connectivity, while the competing surface itself may have several components. As changing separation brings their areas through a crossing, the leading entropy undergoes a first-order reconnection transition, and strict area advantage is equivalent to positive leading mutual information:

   $$
   \operatorname{Area}(\gamma_{AB}) \;<\; \operatorname{Area}(\gamma_A) + \operatorname{Area}(\gamma_B) \;\Longleftrightarrow\; I_{\mathrm{RT}}(A:B) \;:=\; S_{\mathrm{RT}}(A) + S_{\mathrm{RT}}(B) - S_{\mathrm{RT}}(AB) \;>\; 0;
   $$

   This compares the $G_N^{-1}$ leading term $I_{\mathrm{RT}}$. It vanishes in the disconnected phase, while exact quantum mutual information can retain contributions of order $G_N^0$; vanishing at leading order does not erase all quantum correlations.

2. **Microscopic Entanglement-Bridge Proposal ($ER = EPR$; J. Maldacena & L. Susskind, *Fortschr. Phys.* **61**, 781–811, 2013)**: Identifies bipartite entanglement pairs (EPR correlations) with microscopic non-traversable wormhole bridges (Einstein–Rosen bridges) stitching spatial connectivity;
3. **CKW Multi-Qubit Entanglement Monogamy Cap (V. Coffman, J. Kundu & W. K. Wootters, *Phys. Rev. A* **61**, 052306, 2000; T. J. Osborne & F. Verstraete, *Phys. Rev. Lett.* **96**, 220503, 2006)**: For any observer qubit $i$ with local Bloch polarization $\mathbf{r}_i$, the sum of squared concurrences (2-tangles) $\tau_{ij}$ shared with all other partners $j \neq i$ obeys the scarce budget

   $$
   \sum_{j \neq i} \tau_{ij} \;\le\; 1 - \lVert\mathbf{r}_i\rVert^2 \;\le\; 1.
   $$
:::

::: {.viz src="mutual-observer-attractors" preset="transition" height="500"}
**Bring the intervals closer and the two cuts tie.** Two intervals of length 1 (amber) come closer from $d = 2.5$; at $d = \sqrt{2} - 1 \approx 0.414$ the separate pair of semicircles and the connected pair (a small one over the gap, a large one over the whole span) are equally long, and both are drawn magenta. The stage uses geodesic lengths in static AdS₃ vacuum, a literature result of [@rem-ch33-rt-reconnection-ckw-literature], Item 1, not formalized in this book.
:::

Bringing together window overlap $\operatorname{Vol}(W_{AB})$, mutual convergence trajectories ([@ex-ch33-mutual-cosine-monotonic-lock]), minimal-cut reconnection ([@prop-ch33-bridge-reconnection-mincut]), and entanglement allocation ([@rem-ch33-rt-reconnection-ckw-literature]), our **`MODEL` (interpretive model)** reveals a single geometric mechanism animating three seemingly disparate forms of attraction across nature:

- **Macroscopic Gravitational Gathering**: Vast ensembles of order-$1$ ($M = 1$) matter particles share overlapping spatial projections, reconnecting surrounding minimal cuts in bulk and guiding passing worldlines down geodesics of minimal alignment cost;
- **Microscopic Covalent Spin-Pairing Bonds**: Two atoms carrying unpaired valence spins surrender private local polarization ($\mathbf{r}_i \to \mathbf{0}$, matching the maximally mixed Bell marginal of [@thm-ch31-seat-pythagorean-monogamy-fairness], Conjunct 4) to form an antiparallel singlet bridge, mirroring chemical valence exclusivity within this model (for the multi-party entanglement-budget literature bound, see [@rem-ch33-rt-reconnection-ckw-literature], Item 3);
- **Interpersonal Resonance — All Beings as Walking Homelands (Mobile Spatial Attractors)**: Whereas a thousand-year-old stone temple or ruined bridge is an **immobile spatial attractor** pinned to fixed coordinates in $E_\parallel^3$, every living self-referential observer is a **mobile spatial attractor—a walking homeland** carrying its acceptance window $W + u_i$ across space and time!

::: {.viz src="mutual-observer-attractors" preset="connected" height="500"}
**Closer still, the connected cut wins.** At $d = 0.2$ the connected cut (magenta) is shorter, the cyan entanglement wedge reaches from A to B in one piece, and the leading-order mutual information is $\ln\bigl(1/(0.2 \times 2.2)\bigr) \approx 0.82 > 0$; dashed is the separate cut that loses.
:::

This resolves one of human life's most haunting mysteries: why, on a street corner in an unfamiliar city where you have never set foot before, can encountering a stranger—or reading a line written centuries ago—trigger an unmistakable shock of instant recognition, even though birth initialization wiped away every episodic name, date, and narrative trace (`量 liàng`)?

Because episodic forgetting cleared only surface particle ticks while leaving each observer's deep operator phase $u_A, u_B \in E_\perp^3$ (`量 liáng`) intact! The instant two phase-resonant beings ($\lVert u_A - u_B\rVert \to 0$) cross paths, their rhombic-triacontahedral acceptance windows snap into near-complete overlap $W_{AB} \approx W + u_A$, their minimal entanglement cuts reconnect into a shared bulk bridge, and solitary oscillatory whipsawing settles into quiet equilibrium through eye-level mutual reflection (trajectory comparison in [@ex-ch33-mutual-cosine-monotonic-lock])—braiding their trajectories into a mutually stabilizing **double helix**. Instant recognition is never superstition: it is two mobile attractors of matching internal inclination recognizing in each other a zero-friction geometric homeland across the fog of forgetting.

Before turning in the final section to multi-observer decoherence consensus, explore both symmetric mutual-reference cobwebs and minimal-cut reconnection side by side on the full stage below:

::: {.viz src="mutual-observer-attractors" height="620"}
**Mutual attractors: the full lab.** Two scenes: mirrors (move the two starts, watch beat by beat or round by round) and min cut (set the two lengths, bring the gap closer). The convergence of the mutual reading and its local factor per round are an application of existing results in [@ex-ch33-mutual-cosine-monotonic-lock] (the decimals are numerical), and the minimal-surface transition is a literature result, not formalized in this book; the green box cites only [@prop-ch33-bridge-reconnection-mincut], which concerns a discrete bridge graph and does not cover the continuous picture on the stage.
:::

---

## 33.5 Multi-Observer Consensus Tensor, Emergent Pointer Basis, and No Observer-Independent Facts {#sec-ch33-consensus-decoherence-pointer}

> “观察者的共识选择决定了去相干方向, 没有绝对客观存在” — "Observers' consensus choice determines the direction of decoherence; there is no absolute objective existence."

The preceding four sections dissolved the cliff between "living subjects" and "inanimate objects" and showed how two phase-resonant beings braid into a mutual-attractor double helix. Yet to uproot the hidden external referee $C$ once and for all, we must confront the central question of decoherence theory directly (verbatim ledger entry `A76` in [Appendix A](appendix-a.md#sec-appendix-a-verbatim-ledger)): **when a multitude of observers gather into a macroscopic environment, why does a quantum state decohere along one particular "classical pointer basis" rather than another? Stripped of a concrete population of observer axes, does nature pre-inscribe any privileged "absolutely objective" coordinate frame at all?**

Standard textbook presentations quietly smuggle point $C$ back in by postulating a fixed diagonal system–environment interaction Hamiltonian from the outset, then announcing that its eigenstates survive as classical pointer states. Returning to this chapter's first principle—that *all beings are observers*—exposes what "the environment" actually is: **not an inert external backdrop, but an endogenous population of observers $\{\mathcal{O}_1, \dots, \mathcal{O}_N\}$ exchanging pairwise projections with the system!** Taken in isolation, the qubit state space is a completely democratic unit Bloch sphere $S^2$ on which no direction carries built-in classical privilege; longitudinal polarization survives and transverse coherence is erased along a preferred axis *only* when the surrounding observer axes $\{\mathbf{n}_1, \dots, \mathbf{n}_N\}$ align at the second-order tensor level to open a positive spectral gap. Disperse those axes isotropically, and the Bloch ball shrinks uniformly toward its center with no pointer axis whatsoever; split the observers into two orthogonal consensus bubbles, and their local pointer records refuse to stitch into a single context-free global truth table. Throughout this section we enforce our three-tier epistemic boundary: algebraic complement projections, common-phase quadratic forms, record pinching, multi-copy reversal blocking, partition-topology kernels, conflict-reset noncommutativity, and orthogonal residual escape rest on twelve frozen Lean 4 theorems (`LEAN ✓`); the second-order consensus tensor, Pauli Bloch contraction products, and rank-two branching mutual-information curves are derived explicitly and verified numerically (`manual derivation` / `NUM`); Quantum Darwinism and the extended Wigner's-friend Local Friendliness no-go inequality carry explicit literature attribution (`Literature`); and the overarching thesis that consensus selects the decoherence axis without observer-independent facts is designated as our geometric `MODEL`.

### 33.5.1 Second-Order Consensus Structure Tensor, Sign-Reversal Invariance, and Isotropic Fog {#sec-ch33-consensus-tensor-axis}

Let us compute directly in real three-dimensional Bloch space $\mathbb{R}^3$ how a collection of observer axes aggregates into a macroscopic decoherence geometry. Consider $N \ge 1$ participating observers with normalized coupling weights (or independent encounter probabilities) $w_j \ge 0$, $\sum_{j=1}^N w_j = 1$, and unit measurement-axis directions $\mathbf{n}_j \in \mathbb{R}^3$, $\|\mathbf{n}_j\| = 1$. Taking a naive first-order vector average $\overline{\mathbf{n}} = \sum_{j=1}^N w_j \mathbf{n}_j$ immediately fails an elementary consistency test: swapping the plus/minus outcome labels of an unoriented measurement line ($\mathbf{n}_j \mapsto -\mathbf{n}_j$) would make two observers measuring the *very same* $Z$ spin axis along $+Z$ and $-Z$ cancel to zero! A two-outcome projective measurement axis is an **unoriented one-dimensional line** in $\mathbb{R}^3$, represented faithfully by its rank-one orthogonal projection dyad $P_j := \mathbf{n}_j \otimes \mathbf{n}_j = \mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}$ ($P_j^{\mathsf{T}} = P_j$, $P_j^2 = P_j$). Taking the weighted convex sum of these dyads defines the **second-order consensus structure tensor** (`manual derivation`):

$$
\mathbf{M}_{\mathrm{cons}} \;:=\; \sum_{j=1}^N w_j\,\mathbf{n}_j \otimes \mathbf{n}_j \;=\; \sum_{j=1}^N w_j\,\mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}.
$$

Entry-by-entry inspection establishes four exact spectral properties of $\mathbf{M}_{\mathrm{cons}}$: (1) **Unoriented-axis sign invariance**: flipping any subset of axis orientations $\mathbf{n}_j \mapsto -\mathbf{n}_j$ leaves $(-\mathbf{n}_j)(-\mathbf{n}_j)^{\mathsf{T}} = \mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}$ and hence $\mathbf{M}_{\mathrm{cons}}$ identically unchanged (crucially, relabeling an axis $\mathbf{n}_j \mapsto -\mathbf{n}_j$ merely swaps the two outcome labels of the same basis and **never** identifies the two orthogonal Bloch-antipode pure states $|+\mathbf{n}_j\rangle$ and $|-\mathbf{n}_j\rangle$, which satisfy $\|\rho(+\mathbf{n}_j) - \rho(-\mathbf{n}_j)\|_{\mathrm{HS}} = \sqrt{2} > 1$; nor should this real dyadic sign symmetry be conflated with common complex ket-phase gauge invariance $z \mapsto e^{i\theta} z$); (2) **Symmetry, positive semidefiniteness, and Gram factorization**: defining $B \in \mathbb{R}^{N \times 3}$ by $B_{ja} = \sqrt{w_j}\,n_{j,a}$ yields $\mathbf{M}_{\mathrm{cons}} = B^{\mathsf{T}} B = \mathbf{M}_{\mathrm{cons}}^{\mathsf{T}}$ and $0 \le \mathbf{v}^{\mathsf{T}}\mathbf{M}_{\mathrm{cons}}\mathbf{v} = \sum_{j=1}^N w_j (\mathbf{n}_j \cdot \mathbf{v})^2 \le \|\mathbf{v}\|^2$ for every $\mathbf{v} \in \mathbb{R}^3$, so $0 \preceq \mathbf{M}_{\mathrm{cons}} \preceq I_3$; (3) **Unit trace and eigenvalue bounds**: since $\operatorname{Tr}(P_j) = \|\mathbf{n}_j\|^2 = 1$, sorting eigenvalues as $\lambda_1 \ge \lambda_2 \ge \lambda_3 \ge 0$ gives $\operatorname{Tr}(\mathbf{M}_{\mathrm{cons}}) = \lambda_1 + \lambda_2 + \lambda_3 = 1$ and $\frac{1}{3} \le \lambda_1 \le 1$, motivating the nematic-style **consensus order parameter** and **leading spectral gap**

$$
\kappa \;:=\; \frac{3\lambda_1 - 1}{2} \;\in\; [0, 1], \qquad \Delta\lambda \;:=\; \lambda_1 - \lambda_2 \;\in\; [0, 1];
$$

and (4) **Pointer-axis uniqueness vs. degeneracy fog**: a convex combination of rank-one projectors is itself a projector ($\mathbf{M}_{\mathrm{cons}}^2 = \mathbf{M}_{\mathrm{cons}}$) iff its spectrum is $(1, 0, 0)$ (every positive-weight observer axis collinear or antiparallel). Whenever $\Delta\lambda = \lambda_1 - \lambda_2 > 0$, the top eigenspace singles out a **unique unoriented consensus pointer line** $\pm\mathbf{e}_{\mathrm{ptr}}$; conversely, whenever $\lambda_1 = \lambda_2$—whether in six-axis **isotropic fog** $\mathbf{M}_{\mathrm{cons}} = \frac{1}{3}I_3$ ($\lambda = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3}),\; \kappa = 0,\; \Delta\lambda = 0$) or **planar top-degeneracy** $\operatorname{diag}(\frac{1}{2}, \frac{1}{2}, 0)$ ($\kappa = \frac{1}{4},\; \Delta\lambda = 0$)—**no unique physical pointer axis exists**! (On our interactive stage, whenever $\Delta\lambda < \varepsilon = 10^{-8}$ the leading axis is explicitly marked unresolved rather than displaying an arbitrary numerical eigensolver column.)

The first preset card below shows immediately that "having many observers" does not by itself create a classical basis: six equal-weight axes along $\pm x, \pm y, \pm z$ contract the entire Bloch ball uniformly toward its center with no privileged pole:

::: {.viz src="observer-consensus-decoherence" preset="isotropic-fog" height="500"}
**Isotropic Fog Card (`isotropic-fog`)**: Six equal-weight observer axes dispersed symmetrically along $\pm x, \pm y, \pm z$ yield $\mathbf{M}_{\mathrm{cons}} = \frac{1}{3}I_3$, spectrum $\lambda = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3})$, consensus order $\kappa = 0$, and spectral gap $\Delta\lambda = 0$ (`pointerAxis = null`). Under the $N = 16, \alpha = 0.4$ ensemble-mean channel, the Bloch ball contracts isotropically by the exact factor $[(1 + 2\cos 0.4)/3]^k$ (with the weak-limit scale $e^{-k\cdot 0.4^2 / 3}$ labeled separately) and selects no preferred pointer axis (`MODEL` / `NUM`).
:::

At the Hilbert-space operator level, why does common-phase gauge invariance force degree-two Hermitian sesquilinear forms, how do positive operators factorize as Gram squares, and how does an orthogonal projection split longitudinal retention from its complement? Three frozen theorems in `trureturing` anchor these algebraic pillars:

::: {.theorem #thm-ch33-consensus-quadratic-and-gram title="Common-Phase Quadratic Hermitian Representation, Positive-Operator Gram Realizability, and Orthogonal-Complement Identities" lean="D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities"}
Across the frozen quantum-algebra and quantum-bounds modules of `trureturing`, the following three theorems hold simultaneously:

1. **Charge Balance, Minimum Quadratic Degree, and Unique Hermitian Matrix of Common-Phase Invariants** ([`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)): Let $\iota$ be a finite index type (`[Fintype ι]`), and let $p \in \operatorname{Poly}\iota = \operatorname{MvPolynomial}(\iota \oplus \iota)\,\mathbb{C}$ evaluate on amplitude vectors $z$ and conjugates $\operatorname{star} z$ via $\operatorname{actual} p\, z$. Then: (a) there exists a unique Cartesian polynomial $q$ with $\forall z,\; \operatorname{actual} q\, z = \operatorname{eval}(\operatorname{cartesian} z)\, p$, and $\operatorname{toCartesian}$ preserves both `totalDegree` and `IsHomogeneous n`; (b) invariance under $z \mapsto e^{i\theta} z$ ($\operatorname{Invariant} p$) is equivalent to holomorphic–antiholomorphic degree balance ($\operatorname{Balanced} p$) and to membership in $\operatorname{quadraticAlgebra}(\iota := \iota)$, implying $\operatorname{actual} p \in \operatorname{actualQuadraticAlgebra}(\iota := \iota)$; (c) every nonconstant ($\neg\exists c \in \mathbb{C},\, p = C(c)$) invariant polynomial satisfies $2 \le p.\mathrm{totalDegree}$, while each diagonal generator $\operatorname{quadraticGenerator}(i,i)$ is invariant of total degree $2$; and (d) if $p$ is homogeneous of degree $2$, real-valued ($\forall z,\; (\operatorname{actual} p\, z).\mathrm{im} = 0$), and invariant, there exists a unique matrix $H \in M_\iota(\mathbb{C})$ satisfying $H.\mathrm{IsHermitian}$, $\forall z,\; \operatorname{actual} p\, z = \operatorname{star} z \mathbin{\bullet_v} (H *_{\!v} z)$, $\forall i, j,\; H_{ji} = p.\mathrm{coeff}(\operatorname{pairExponent}\; i\; j)$, and $(\forall z,\; 0 \le (\operatorname{actual} p\, z).\mathrm{re}) \iff H.\mathrm{PosSemidef}$, with any $K \in M_\iota(\mathbb{C})$ inducing the same evaluation satisfying $K = H$;
2. **Gram Adjoint-Square Realizability of Positive Continuous Endomorphisms** ([`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)): Let $V$ be a complete complex inner-product space (`[NormedAddCommGroup V] [InnerProductSpace ℂ V] [CompleteSpace V]`), and let $Q : V \to_L[\mathbb{C}] V$ be a continuous $\mathbb{C}$-linear endomorphism. Then $Q$ is nonnegative in the operator order if and only if it factors as $O^\dagger \circ_L O$ for a continuous linear endomorphism $O$ on $V$ realizing its sesquilinear pairing as a Gram inner product:

   $$
   0 \le Q \;\Longleftrightarrow\; \exists\, O : V \to_L[\mathbb{C}] V,\quad Q = O^\dagger \circ_L O \;\land\; \forall x, y \in V,\; \langle Q x, y \rangle_{\mathbb{C}} = \langle O x, O y \rangle_{\mathbb{C}};
   $$

3. **Six-Identity Decomposition of Closed-Subspace Orthogonal Projections** ([`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)): Let $\mathbb{K}$ satisfy `[RCLike 𝕜]`, let $E$ be a complete inner-product space over $\mathbb{K}$, and let $M \le E$ be a closed submodule (`[IsClosed (M : Set E)]`) with orthogonal projections $P_M = M.\mathrm{starProjection}$ and $P_{M^\perp} = M^\perp.\mathrm{starProjection}$. Then all six operator identities hold simultaneously:

   $$
   P_{M^\perp} = \operatorname{id}_{\mathbb{K},E} - P_M,\quad P_M \circ_L P_M = P_M,\quad P_{M^\perp} \circ_L P_{M^\perp} = P_{M^\perp},\quad P_M \circ_L P_{M^\perp} = 0,\quad P_{M^\perp} \circ_L P_M = 0,\quad P_M + P_{M^\perp} = \operatorname{id}_{\mathbb{K},E}.
   $$
:::

::: proof
Clause 1 establishes Cartesian uniqueness and degree preservation by invertible real–imaginary change of variables, uses Fourier-mode orthogonality in $\theta$ to equate common-$U(1)$ phase invariance with equal holomorphic and antiholomorphic degrees on every nonzero monomial (forcing degree $\ge 2$ for nonconstant invariants and generation by bilinear pairs), and extracts the unique Hermitian matrix $H$ and its positive-semidefinite equivalence on real-valued degree-$2$ homogeneous invariants. Clause 2 extracts $O$ from $0 \le Q$ via the continuous $C^*$-algebra square root so $Q = O^\dagger \circ_L O$, and conversely reads $\langle Q x, x \rangle_{\mathbb{C}} = \|O x\|^2 \ge 0$ from the adjoint property. Clause 3 verifies all six identities from the Hilbert direct-sum decomposition $E = M \oplus M^\perp$ and self-adjoint idempotence. The full proof is checked by the Lean kernel.
:::

Respecting every hypothesis boundary of [@thm-ch33-consensus-quadratic-and-gram], the second preset card below juxtaposes real measurement-axis sign flips $\mathbf{n}_j \mapsto -\mathbf{n}_j$ against common complex ket-phase rotations $z \mapsto e^{i\theta} z$:

::: {.viz src="observer-consensus-decoherence" preset="phase-gauge" height="500"}
**Axis Sign Relabeling vs. Complex Phase Gauge Card (`phase-gauge`)**: Eight unsigned measurement axes ($4$ along $z$ with total weight $0.60$, $2$ along $x$ with $0.25$, $2$ along $y$ with $0.15$) give $\mathbf{M}_{\mathrm{cons}} = \operatorname{diag}(0.25, 0.15, 0.60)$, spectrum $(0.60, 0.25, 0.15)$, $\kappa = 0.40$, and gap $\Delta\lambda = 0.35$. Flipping axis signs one by one leaves every entry of $\mathbf{M}_{\mathrm{cons}}$, its spectrum, and the mean contraction channel unchanged; a dedicated ket-phase inset verifies invariance of quadratic Hermitian and Gram pairings under $z \mapsto e^{i\theta} z$ ([@thm-ch33-consensus-quadratic-and-gram]), keeping axis-label swaps strictly distinct from orthogonal antipodal states.
:::

### 33.5.2 Pauli-Dephasing Bloch Contraction, Longitudinal Pointer Survival, and Transverse Pythagorean Deletion {#sec-ch33-consensus-pinching-pointer}

With the static consensus tensor $\mathbf{M}_{\mathrm{cons}}$ in hand, we now derive—rather than fit—how sequential observer couplings sculpt the Bloch ball dynamically (`manual derivation`). Write a qubit state as $\rho = \frac{1}{2}(I_2 + \mathbf{r}\cdot\vec{\sigma})$ ($\|\mathbf{r}\| \le 1$) and set $A = \mathbf{n}\cdot\vec{\sigma}$ ($A^\dagger = A,\; A^2 = I_2$) for a unit axis $\mathbf{n}$. For coupling angle $\alpha \in [0, \frac{\pi}{2}]$, Kraus operators $L_0 = \cos(\frac{\alpha}{2}) I_2$ and $L_1 = \sin(\frac{\alpha}{2}) A$ obey $\sum_{s=0}^1 L_s^\dagger L_s = I_2$, defining the unital CPTP Pauli-dephasing channel

$$
\mathcal{E}_{\mathbf{n},\alpha}(\rho) \;=\; \cos^2\!\Bigl(\frac{\alpha}{2}\Bigr)\rho + \sin^2\!\Bigl(\frac{\alpha}{2}\Bigr)(\mathbf{n}\cdot\vec{\sigma})\rho(\mathbf{n}\cdot\vec{\sigma}).
$$

Using $A(\mathbf{r}\cdot\vec{\sigma})A = \bigl[2(\mathbf{n}\cdot\mathbf{r})\mathbf{n} - \mathbf{r}\bigr]\cdot\vec{\sigma}$, its induced linear map on Bloch vectors $\mathbf{r} \in \mathbb{R}^3$ is the exact projector decomposition

$$
\mathbf{K}(\mathbf{n}, \alpha) \;=\; \cos\alpha\,I_3 + (1 - \cos\alpha)\mathbf{n}\mathbf{n}^{\mathsf{T}} \;=\; P_{\mathbf{n}} + \cos\alpha\,(I_3 - P_{\mathbf{n}}),
$$

with eigenvalues $(1, \cos\alpha, \cos\alpha)$: the component along $\mathbf{n}$ survives intact while both transverse components multiply by $\cos\alpha$ (monotone nonnegative damping across the physical dephasing range $0 \le \alpha \le \frac{\pi}{2}$: $\alpha = 0$ is the identity, $\alpha = \frac{\pi}{2}$ is complete rank-one unread pinching, and $\alpha = \pi$ is unitary Pauli conjugation rather than irreversible decoherence). Across $N$ encounters, three distinct multi-observer compositions must retain their separate mathematical labels and never be joined by an unqualified equals sign:

1. **Prescribed chronological sequence (`ordered`)**: $\mathbf{r}_N = \mathbf{K}_{\mathrm{seq}}\mathbf{r}_0$ with $\mathbf{K}_{\mathrm{seq}} = \mathbf{K}(\mathbf{n}_N, \alpha_N)\cdots\mathbf{K}(\mathbf{n}_1, \alpha_1)$ (observer $1$ acting at the right). For generic oblique axes the factors do not commute, $\mathbf{K}_{\mathrm{seq}}$ need not be symmetric, and $\mathbf{M}_{\mathrm{cons}}$ alone does not reconstruct a finite ordered schedule;
2. **Independent weighted random-encounter mean (`mean`)**: if each of $N$ encounters independently draws axis $\mathbf{n}_j$ with probability $w_j$ at common strength $\alpha$, conditional expectation yields $\overline{\mathbf{K}} = \cos\alpha\,I_3 + (1 - \cos\alpha)\mathbf{M}_{\mathrm{cons}}$ and $\mathbb{E}[\mathbf{r}_N] = \overline{\mathbf{K}}^{\,N}\mathbf{r}_0$, with exact principal-mode multipliers $\overline{\Gamma}_i(N) = \bigl[\lambda_i + (1 - \lambda_i)\cos\alpha\bigr]^N$;
3. **Weak-coupling continuous / Lie–Trotter semigroup limit (`weak-limit`)**: expanding $\mathbf{K}(\mathbf{n}, \alpha) = I_3 - \frac{1}{2}\alpha^2(I_3 - P_{\mathbf{n}}) + O(\alpha^4)$ and taking $\alpha \to 0,\; N \to \infty$ at fixed $t = \frac{1}{2}N\alpha^2$ (or deterministic Lie–Trotter steps $\cos\alpha_j = e^{-(t/L)w_j}$ as $L \to \infty$) yields the exact Lindblad dissipator $\mathcal{L}(\rho) = \frac{1}{2}\sum_{j=1}^N w_j(A_j\rho A_j - \rho)$ and Bloch generator $G = \sum_{j=1}^N w_j(I_3 - P_j) = I_3 - \mathbf{M}_{\mathrm{cons}}$:

   $$
   \frac{d\mathbf{r}}{dt} \;=\; -(I_3 - \mathbf{M}_{\mathrm{cons}})\mathbf{r}, \qquad \Gamma_i^{\mathrm{lim}}(N) \;=\; \exp\Bigl[-\frac{1}{2}N\alpha^2(1 - \lambda_i)\Bigr].
   $$

This makes the emergence of a pointer direction quantitatively transparent: under **unanimous collinear consensus** ($\lambda_1 = 1,\; \lambda_2 = \lambda_3 = 0,\; \kappa = 1$), the longitudinal decay rate $1 - \lambda_1 = 0$ vanishes so both finite and limiting channels give $\Gamma_\parallel = 1$ exactly (pointer populations survive untouched), while the transverse coherence disk contracts by $\Gamma_{\perp,2} = \Gamma_{\perp,3} = (\cos\alpha)^N$ in the finite channel and $\exp(-\frac{1}{2}N\alpha^2)$ in the weak limit (e.g., at $\alpha = 0.4, N = 16$: $(\cos 0.4)^{16} \approx 0.2683$ vs. $e^{-1.28} \approx 0.2780$, agreeing asymptotically for small $\alpha$ rather than identically at finite $\alpha$); under partial consensus ($\lambda_2 < \lambda_1 < 1$), all modes decay toward $\frac{1}{2}I_2$ at infinite time, yet longitudinal-to-transverse survival grows exponentially as $e^{t(\lambda_1 - \lambda_2)}$, singling out the leading eigenspace as a finite-time preferred pointer line.

At the full-pinching endpoint $\alpha = \frac{\pi}{2}$ (after rotating the pointer basis into the computational basis), the deleted transverse quadratures $\rho_{+-} = \frac{1}{2}(r_2 - i r_3)$ form the exact orthogonal remainder of Hilbert–Schmidt Pythagorean splitting, each full-pinching step produces von Neumann entropy equal to quantum relative entropy while subsequent aligned passes add zero entropy by idempotence ([@thm-ch33-observer-pinching-and-memory-spectrum], Conjunct 1), and fixed states are characterized by vanishing cross-record blocks:

::: {.theorem #thm-ch33-consensus-pinching-and-fixed-points title="Qubit Pinching Hilbert–Schmidt Pythagoras, Coherence-Deletion Entropy Identity, and Unread Record Fixed Points" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity D5/S3/Observer/Conditioning.unreadState_fixed_iff"}
Across the frozen quantum-channel pinching, entropy-production dynamics, and observer-conditioning modules of `trureturing`, the following three theorems hold simultaneously:

1. **Hilbert–Schmidt Pythagorean Decomposition of Qubit Computational Pinching** ([`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)): For every $2 \times 2$ complex matrix $\rho \in \mathrm{QubitMatrix} = M_{\operatorname{Fin} 2}(\mathbb{C})$, writing $\operatorname{pinching}(\rho)$ for diagonal computational-basis pinching and $\langle A, B \rangle_{\mathrm{HS}} = \operatorname{Tr}(A^\dagger B)$ for the Hilbert–Schmidt inner product, the squared norm splits orthogonally into its pinched diagonal part and its discarded off-diagonal coherence part:

   $$
   \langle \rho, \rho \rangle_{\mathrm{HS}} \;=\; \langle \operatorname{pinching}(\rho), \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}} \;+\; \langle \rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}};
   $$

2. **Stepwise and Telescoped Entropy-Production Identity for Unitary-Then-Full-Pinching Sequences** ([`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)): Let $n$ be a finite decidable type, let $U \in \operatorname{unitaryGroup}(n, \mathbb{C})$ be a fixed unitary matrix, and let $\rho : \mathbb{N} \to \operatorname{DensityState} n$ satisfy $\forall k \in \mathbb{N},\; \rho(k + 1) = \operatorname{basisPinchingState}(\sigma_k)$, where $\sigma_k := \operatorname{unitaryConjugateState}\; U\; h_U\; (\rho(k))$ and $S_{\mathrm{vN}}, D(\cdot\,\|\,\cdot)$ use natural logarithms. Then every step's entropy gain equals the nonnegative relative entropy of $\sigma_k$ against its basis pinching, and finite $N$-step entropy production telescopes exactly:

   $$
   \forall k \in \mathbb{N},\quad S_{\mathrm{vN}}(\rho(k+1)) - S_{\mathrm{vN}}(\rho(k)) = D\bigl(\sigma_k \,\big\|\, \operatorname{basisPinchingState}(\sigma_k)\bigr) \ge 0, \qquad S_{\mathrm{vN}}(\rho(N)) - S_{\mathrm{vN}}(\rho(0)) = \sum_{k=0}^{N-1} D\bigl(\sigma_k \,\big\|\, \operatorname{basisPinchingState}(\sigma_k)\bigr);
   $$

3. **Fixed-Point Criterion for Complete Projective Unread Record Measurements** ([`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)): Let $n, \kappa$ be finite decidable types, and let $P : \kappa \to M_n(\mathbb{C})$ satisfy `IsRecordMeasurement P`. For any matrix $\rho \in M_n(\mathbb{C})$, the unread record channel fixes $\rho$ if and only if every off-diagonal cross-record block vanishes:

   $$
   \operatorname{unreadState}(P)(\rho) = \rho \;\Longleftrightarrow\; \forall k, l \in \kappa,\; k \neq l \implies P_k \rho P_l = 0.
   $$
:::

::: proof
Clause 1 expands the disjoint diagonal support of $\operatorname{pinching}(\rho)$ and off-diagonal support of $\rho - \operatorname{pinching}(\rho)$, so their Hilbert–Schmidt cross inner product vanishes identically. Clause 2 combines unitary entropy invariance $S_{\mathrm{vN}}(\sigma_k) = S_{\mathrm{vN}}(\rho(k))$ with the full-pinching cross-trace identity $\operatorname{Tr}(\sigma_k \ln \operatorname{basisPinchingState}(\sigma_k)) = \operatorname{Tr}(\operatorname{basisPinchingState}(\sigma_k) \ln \operatorname{basisPinchingState}(\sigma_k))$, applies Klein's inequality for nonnegativity, and telescopes the finite sum over $\operatorname{Finset.range} N$. Clause 3 left-multiplies $\operatorname{unreadState}(P)(\rho) = \rho$ by $P_k$ and right-multiplies by $P_l$ ($k \neq l$) using $P_k P_m = \delta_{km} P_k$ for the forward direction, and expands $\rho = \sum_{k,l} P_k \rho P_l$ via $\sum_k P_k = 1$ for the converse. The full proof is checked by the Lean kernel.
:::

Two exact scope guardrails accompany [@thm-ch33-consensus-pinching-and-fixed-points]: Clause 2 holds for steps ending in **full basis pinching** (taking $U = I$ gives $\Delta S_{\mathrm{vN}} = D(\rho\,\|\,\mathcal{P}(\rho))$, dividing both sides by $\ln 2$ for bits, whereas fractional Pauli dephasing $0 < \alpha < \frac{\pi}{2}$ does not satisfy $\Delta S_{\mathrm{vN}} = D(\rho\,\|\,\mathcal{E}(\rho))$); and Clause 3 characterizes block-diagonal mixed fixed points without asserting collapse to a single outcome. The card below displays longitudinal preservation alongside transverse disk contraction:

::: {.viz src="observer-consensus-decoherence" preset="axis-consensus" height="500"}
**Collinear Axis Consensus and Transverse Contraction Card (`axis-consensus`)**: Sixteen equal-weight axes alternate signs along $\pm z$, giving $\lambda = (1, 0, 0),\; \kappa = 1$. Acting on $\mathbf{r}_0 = (1, 0, 1)/\sqrt{2}$ with $N = 16, \alpha = 0.4$ exact Pauli channels keeps the cyan longitudinal polarization $r_z = 1/\sqrt{2}$ invariant ($\Gamma_\parallel = 1$) while contracting the magenta transverse disk by $(\cos\alpha)^k$; toggling the separate "full pinching ($\alpha = \pi/2$)" switch verifies Hilbert–Schmidt Pythagoras, full-pinching relative-entropy gain, and pointer-diagonal fixed states ([@thm-ch33-consensus-pinching-and-fixed-points]).
:::

### 33.5.3 Quantum Darwinism Redundancy Plateau, Local Reversal Blocking, and the Consensus Kernel {#sec-ch33-consensus-darwinism-kernel}

If an unread dephasing channel leaves a diagonal classical mixture on the system, why do ten passersby inspecting the same signpost independently read matching classical pointer labels, and why can no single observer restore quantum interference by erasing their own private notebook? To answer quantitatively, we move to the **pure two-branch aligned record model** in a fixed common pointer basis $\{|0\rangle_S, |1\rangle_S\}$ (`manual derivation`, explicitly distinct from non-collinear Pauli schedules above): an isometric coupling from initially blank observer records prepares the global pure state

$$
|\Psi\rangle \;=\; \sqrt{p_0}\,|0\rangle_S \bigotimes_{j=1}^N |\phi_j^{(0)}\rangle \;+\; e^{i\chi}\sqrt{p_1}\,|1\rangle_S \bigotimes_{j=1}^N |\phi_j^{(1)}\rangle \qquad (p_0, p_1 \ge 0,\; p_0 + p_1 = 1),
$$

with conditional record overlaps $c_j := \langle\phi_j^{(0)}\mid\phi_j^{(1)}\rangle$ (realized for real $c_j = \cos\alpha_j$ by $|\phi_j^{(0)}\rangle = (1, 0)^{\mathsf{T}},\, |\phi_j^{(1)}\rangle = (\cos\alpha_j, \sin\alpha_j)^{\mathsf{T}}$ under controlled rotation $U_j = |0\rangle\langle 0| \otimes I_2 + |1\rangle\langle 1| \otimes R_y(2\alpha_j)$, whose partial trace multiplies system coherence by $\cos\alpha_j$). For any observer fragment $F \subseteq \{1, \dots, N\}$ of size $m$ (with complement $F^c$ and overlap product $\Pi_F := \prod_{j \in F} c_j$, $\Pi_\varnothing := 1$), the reduced fragment state $\rho_F = p_0 |\Phi_F^{(0)}\rangle\langle\Phi_F^{(0)}| + p_1 |\Phi_F^{(1)}\rangle\langle\Phi_F^{(1)}|$ has rank at most $2$ and shares its nonzero spectrum $\frac{1 \pm d(\Pi_F)}{2}$ with the $2 \times 2$ Gram matrix

$$
V_F^\dagger V_F \;=\; \begin{pmatrix} p_0 & \sqrt{p_0 p_1}\,\Pi_F \\ \sqrt{p_0 p_1}\,\overline{\Pi_F} & p_1 \end{pmatrix}, \qquad \det(V_F^\dagger V_F) \;=\; p_0 p_1\bigl(1 - |\Pi_F|^2\bigr),
$$

where $d(q) := \sqrt{1 - 4 p_0 p_1(1 - |q|^2)}$. Writing $H_2(x) = -x\log_2 x - (1-x)\log_2(1-x)$ and $h(q) := H_2\bigl(\frac{1 - d(q)}{2}\bigr)$, global purity of $|\Psi\rangle$ implies $S(\rho_{SF}) = S(\rho_{F^c})$, so a single $O(N)$ prefix–suffix pass computes the exact quantum mutual information (in bits) between $S$ and $\mathcal{O}_m = \{1, \dots, m\}$ without ever forming a $2^{N+1} \times 2^{N+1}$ matrix:

$$
S(\rho_S) = h(\Pi_{\mathrm{all}}), \quad S(\rho_{\mathcal{O}_m}) = h(\Pi_F), \quad S(\rho_{S\mathcal{O}_m}) = h(\Pi_{F^c}), \quad I(S : \mathcal{O}_m) \;=\; h(\Pi_{\mathrm{all}}) + h(\Pi_F) - h(\Pi_{F^c}).
$$

Three exact regimes emerge immediately: (1) at $m = 0$, $\Pi_\varnothing = 1$ and $h(1) = 0$, so $I(S : \varnothing) = 0$; (2) across interior fractions $0 < m < N$, whenever $0 < p_0 < 1$ and both $|\Pi_F|$ and $|\Pi_{F^c}|$ are small (for instance at $N = 16,\, p_0 = \frac{1}{2},\, c_j = 0.3$, where $|I(S : \mathcal{O}_m) - S(\rho_S)| < 5.26 \times 10^{-4}\text{ bits}$ for all $m = 3, \dots, 13$), all three entropies sit near the classical Shannon entropy $H_2(p_0)$, carving out a flat **classical redundancy plateau** $I(S : \mathcal{O}_m) \approx H_2(p_0)$—even a small fraction of observers already captures nearly the full classical pointer information (note that this curve characterizes redundant classical correlation under pure aligned branching, not non-unitary collapse to a single outcome); and (3) only at global joint access $m = N$ ($\Pi_\varnothing = 1, h(\Pi_{F^c}) = 0$) does mutual information climb to the full quantum purification value $I(S : \mathcal{O}_N) = 2 S(\rho_S)$!

This likewise explains why local observers experience effective irreversibility: applying controlled inverses $U_j^\dagger$ on an accessible subset $A \subset \{1, \dots, N\}$ leaves residual system coherence $|\rho_{01}^{\mathrm{res}}| = \sqrt{p_0 p_1}\prod_{j \notin A}|c_j|$—a single inaccessible orthogonal ($c_k = 0$) or low-overlap ($|c_k| < 1$) copy blocks local restoration! In `trureturing`, unimodular amplitude-conjugation reversal blocking, the exact two-copy phase certificate, orthogonal-copy partial-trace access defect, and readout partition-topology kernels supply the formal anchors:

::: {.theorem #thm-ch33-consensus-redundant-records-and-kernel title="Surviving-Copy Reversal Blocking, Two-Copy Phase Certificate, Reduced Access Defect, and Partition-Topology Kernel" lean="D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel"}
Across the frozen joint-coherent-reversal, reduced-access-defect, and partition-topology modules of `trureturing`, the following four theorems hold simultaneously:

1. **Reversal Blocking by a Single Surviving Record Copy** ([`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal)): Let `Copy` be a finite decidable type, let $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$, let $\rho \in \mathrm{QubitMatrix}$, let $i, j \in \operatorname{Fin} 2$, and let $k \in \mathrm{Copy}$. Writing $c_l := \operatorname{recordOverlap}(\mathrm{records}\; l)\; i\; j$, if every other copy satisfies $\forall l \neq k,\; \overline{c_l}\, c_l = 1$ while copy $k$ satisfies $c_k \neq 1$ and $\rho_{ij} \neq 0$, then applying the amplitude-conjugating reverse channels to all copies except $k$ leaves entry $c_k \rho_{ij}$ and strictly fails to restore $\rho_{ij}$:

   $$
   \operatorname{reverseChannelOn}(\operatorname{Finset.univ.erase}\; k)\;\mathrm{records}\bigl(\operatorname{multiRecordChannel}\;\mathrm{records}\;\rho\bigr)_{ij} \;\neq\; \rho_{ij};
   $$

2. **Four-Stage Two-Copy Phase-Record Reversal Certificate** ([`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)): For $\rho = \operatorname{equalSuperpositionDensity}$, the single-address record $\mathrm{phaseRecord}$ with conditional amplitudes $1$ ($i = 0$) and $i$ ($i = 1$, overlap $-i$), and $\mathrm{records} : \operatorname{Fin} 2 \to \mathrm{EnvironmentRecord}$, the $(0, 1)$ coherence entry takes the four exact values across initial state, two-copy recording, reversing copy $0$ alone, and reversing both copies jointly:

   $$
   \rho_{01} = \frac{1}{2}, \quad \operatorname{multiRecordChannel}(\mathrm{records}, \rho)_{01} = -\frac{1}{2}, \quad \operatorname{reverseChannelOn}(\{0\}, \mathrm{records}, \dots)_{01} = -\frac{i}{2}, \quad \operatorname{reverseChannelOn}(\mathrm{univ}, \mathrm{records}, \dots)_{01} = \frac{1}{2};
   $$

3. **Reduced Irreversibility as Pure Record-Access Defect** ([`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect)): Let $\rho, \sigma \in \mathrm{QubitMatrix}$ have equal diagonals ($\forall i,\; \rho_{ii} = \sigma_{ii}$) and at least one distinct off-diagonal entry ($\exists i \neq j,\; \rho_{ij} \neq \sigma_{ij}$). Then $\mathrm{copyUnitary} \in \operatorname{unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$ unitarily maps blank-environment inputs to distinct joint record states $\tau_\rho \neq \tau_\sigma$ whose reduced qubit marginals coincide ($\operatorname{traceEnvironment}(\tau_\rho) = \operatorname{traceEnvironment}(\tau_\sigma)$), so no map from the reduced matrix alone recovers both $\tau_\rho$ and $\tau_\sigma$, whereas applying $\operatorname{star}\;\mathrm{copyUnitary}$ to the joint states restores both blank-environment inputs;
4. **Partition-Topology Inseparability iff Readout Kernel Equality** ([`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)): For arbitrary types $X, B$, readout $\mathrm{readout} : \operatorname{Concept} X B$, and points $x, y \in X$, topological inseparability in $\operatorname{partitionTopology}(\mathrm{readout})$ holds if and only if the readout assigns equal values:

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \;\Longleftrightarrow\; \mathrm{readout}(x) = \mathrm{readout}(y).
   $$
:::

::: proof
Clause 1 expands the entrywise Hadamard product of `multiRecordChannel` and `reverseChannelOn`, cancels $\overline{c_l} c_l = 1$ for every $l \neq k$ to leave $c_k \rho_{ij}$, and concludes $c_k \rho_{ij} \neq \rho_{ij}$ from $c_k \neq 1$ and $\rho_{ij} \neq 0$. Clause 2 evaluates the overlap $-i$ explicitly: $(-i)^2 \cdot \frac{1}{2} = -\frac{1}{2}$, $i \cdot (-\frac{1}{2}) = -\frac{i}{2}$, and $i^2 \cdot (-\frac{1}{2}) = \frac{1}{2}$. Clause 3 checks unitarity of the controlled-copy permutation, diagonal preservation and off-diagonal vanishing under partial trace, impossibility of single-valued simultaneous recovery from identical reduced inputs, and exact restoration under adjoint conjugation. Clause 4 unfolds open-set membership in the induced discrete pullback topology. The full proof is checked by the Lean kernel.
:::

Keep two exact distinctions in view when reading [@thm-ch33-consensus-redundant-records-and-kernel]: first, `reverseChannelOn` in Clauses 1–2 conjugates record amplitudes, which inverts unimodular phase records ($|c_l| = 1$) whereas on noisy branching records ($|c| < 1$) amplitude conjugation multiplies coherence by $|c|^2$ rather than inverting the coupling—so noisy-branch erasure requires controlled joint unitaries $U_j^\dagger$, while Clause 2's four-value phase certificate is displayed in its own dedicated inset; second, applying Clause 4 to the product readout $R(x) = (r_1(x), \dots, r_N(x))$ gives the **intersection** of individual equality kernels $\bigcap_{j=1}^N \ker_{\mathrm{eq}}(r_j)$ (finer than each $r_j$, never to be mislabeled "common knowledge" or confused with the linear nullspace $\ker\mathbf{M}_{\mathrm{cons}}$; a genuine cross-context invariant factor still requires the witness of [@thm-ch33-contextual-attractor-and-common-factor], Conjunct 4).

::: {.viz src="observer-consensus-decoherence" preset="darwinism-plateau" height="500"}
**Quantum Darwinism Redundancy Plateau and Reversal-Blocking Card (`darwinism-plateau`)**: Pure aligned branching model ($N = 16,\, p_0 = \frac{1}{2},\, c_j = 0.3$). Sweeping fragment size $m = 0 \dots 16$ traces the exact mutual-information curve from $I(0) = 0$ onto a flat near-$1\text{-bit}$ classical redundancy plateau ($|I(m) - S(\rho_S)| < 5.3 \times 10^{-4}\text{ bits}$ across $m = 3 \dots 13$) before rising to $2 S(\rho_S)$ at global access $m = 16$. Toggling controlled-$U_j^\dagger$ access demonstrates how uncontrolled overlaps cap residual coherence, while a separate inset displays the exact four-stage phase trajectory $\frac{1}{2} \to -\frac{1}{2} \to -\frac{i}{2} \to \frac{1}{2}$ of `two_copy_joint_reversal_certificate` ([@thm-ch33-consensus-redundant-records-and-kernel]).
:::

### 33.5.4 Dual-Wigner Orthogonal Consensus Bubbles, Local Friendliness Bounds, and Pioneer Escape Residuals {#sec-ch33-consensus-wigner-pioneers}

We now arrive at the sharpest thought experiment of all: **what happens when there is no single global consensus—when two decoupled observer bubbles $\mathcal{C}_A$ (aligned along $Z$) and $\mathcal{C}_B$ (aligned along $X$, at $90^\circ$) coexist without sharing a common pointer axis?**

First check the single-qubit algebra with complete precision (`manual derivation`): combining equal-weight $Z$ and $X$ bubbles yields $\mathbf{M}_{AB} = \frac{1}{2}(\mathbf{x}\mathbf{x}^{\mathsf{T}} + \mathbf{z}\mathbf{z}^{\mathsf{T}})$ with descending spectrum $(\frac{1}{2}, \frac{1}{2}, 0)$ and spectral gap $\Delta\lambda = 0$—each bubble possesses its own local pointer axis, yet their union has **no unique global top pointer axis**, and their sole common unread fixed state is $\frac{1}{2}I_2$. Crucially, for **unread** Pauli-dephasing superoperators, the Bloch matrix commutator is

$$
[\mathbf{K}_{\mathbf{n}}, \mathbf{K}_{\mathbf{m}}] \;=\; (1 - \cos\alpha_n)(1 - \cos\alpha_m)(\mathbf{n}\cdot\mathbf{m})\bigl(\mathbf{n}\mathbf{m}^{\mathsf{T}} - \mathbf{m}\mathbf{n}^{\mathsf{T}}\bigr),
$$

which vanishes identically both for parallel axes ($\mathbf{n}\cdot\mathbf{m} = \pm 1$) **and for strictly orthogonal axes** ($\mathbf{n}\cdot\mathbf{m} = 0$, becoming nonzero only at oblique angles such as $45^\circ$)! Order incompatibility between $90^\circ$ $Z$ and $X$ bubbles therefore comes **not** from unread dephasing, but from **selective post-measurement updates** $\mathcal{J}_{\mathbf{n},+}(\rho) = P_{\mathbf{n},+}\rho P_{\mathbf{n},+}$ ($P_{\mathbf{n},+} = \frac{1}{2}(I_2 + \mathbf{n}\cdot\vec{\sigma})$): starting from $\frac{1}{2}I_2$, $\mathcal{J}_{X,+}(\mathcal{J}_{Z,+}(\frac{1}{2}I_2)) = \frac{1}{4}P_{X,+}$ whereas $\mathcal{J}_{Z,+}(\mathcal{J}_{X,+}(\frac{1}{2}I_2)) = \frac{1}{4}P_{Z,+}$—both branches occur with probability $\frac{1}{4}$, yet their normalized conditional endpoints diverge to $|+X\rangle$ versus $|+Z\rangle$ (with subnormalized Hilbert–Schmidt norm difference $\frac{1}{4}$). On discrete belief sets and closed Hilbert subspaces, conflict-reset order noncommutativity and unit orthogonal escape are anchored by two frozen theorems:

::: {.theorem #thm-ch33-consensus-revision-and-escape title="Order Noncommutativity of Conflict Belief Revision and Unit Orthogonal Projection Escape" lean="D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
Across the frozen concept-revision and finite-layer-escape modules of `trureturing`, the following two theorems hold simultaneously:

1. **Order Noncommutativity of Reset-on-Conflict Belief Revision** ([`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation)): On the three-state type $\operatorname{Fin} 3 = \{0, 1, 2\}$, define $\operatorname{revision}(P, A)$ to be $A \cap P$ when $A \cap P \neq \varnothing$ and $P$ otherwise. For initial belief set $A = \{0\}$ and evidence sets $P = \{1, 2\},\; Q = \{0, 1\}$, single and composed revisions satisfy

   $$
   \operatorname{revision}(P, A) = P,\quad \operatorname{revision}(Q, A) = A,\quad \operatorname{revision}(Q, \operatorname{revision}(P, A)) = \{1\},\quad \operatorname{revision}(P, \operatorname{revision}(Q, A)) = P = \{1, 2\},
   $$

   and therefore fail to commute: $\operatorname{revision}(Q, \operatorname{revision}(P, A)) \neq \operatorname{revision}(P, \operatorname{revision}(Q, A))$;
2. **Unit Orthogonal Escape Vector and Unit Residual Operator Norm** ([`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)): Let $\mathbb{K}$ satisfy `[RCLike 𝕜]`, let $V$ be a complete inner-product space over $\mathbb{K}$, and let $S \le V$ be a closed submodule (`[IsClosed (S : Set V)]`) with nontrivial orthogonal complement $S^\perp \neq \bot$. Then there exists a unit vector $e \in S^\perp$ satisfying

   $$
   \|e\| = 1,\qquad S.\mathrm{starProjection}(e) = 0,\qquad \operatorname{infDist}(e, S) = 1,\qquad \bigl\|\operatorname{id}_{\mathbb{K},V} - S.\mathrm{starProjection}\bigr\| = 1.
   $$
:::

::: proof
Clause 1 evaluates intersection nonemptiness on $\operatorname{Fin} 3$ directly: $\{0\} \cap \{1, 2\} = \varnothing$ resets to $\{1, 2\}$, whose intersection with $\{0, 1\}$ is $\{1\}$, whereas $\{0\} \cap \{0, 1\} = \{0\}$ leaves $\{0\}$, which then resets against $\{1, 2\}$ to $\{1, 2\} \neq \{1\}$. Clause 2 normalizes a nonzero element of $S^\perp \neq \bot$ to obtain $e \in S^\perp$ with $\|e\| = 1$ and $P_S e = 0$; Pythagorean orthogonality $\|e - s\|^2 = 1 + \|s\|^2 \ge 1$ (attained at $s = 0$) gives $\operatorname{infDist}(e, S) = 1$, and $\|\operatorname{id} - P_S\| \le 1$ combined with evaluation at $e$ fixes the operator norm at $1$. The full proof is checked by the Lean kernel.
:::

When two local observer bubbles are promoted to spacelike-separated encoded logical laboratories ($V_A|k\rangle = |k\rangle|F_k\rangle$ coherently binding each system qubit to its local friend record) probed by external superobservers capable of coherent reversal and complementary measurements, whether observed outcomes admit a single observer-independent global truth assignment becomes a sharp polyhedral inequality test. The card below pairs single-qubit orthogonal-bubble updates with the bipartite Genuine Local Friendliness (LF) violation witness, followed immediately by its literature attribution and exact scope:

::: {.viz src="observer-consensus-decoherence" preset="dual-wigner-bubbles" height="500"}
**Dual-Wigner Orthogonal Bubbles and Local Friendliness Card (`dual-wigner-bubbles`)**: Upper subscene contrasts $Z$ and $X$ bubbles (50/50 combined spectrum $(\frac{1}{2}, \frac{1}{2}, 0)$ with no unique global top axis): unread dephasings commute ($[\mathbf{K}_Z, \mathbf{K}_X] = 0$, with an optional $45^\circ$ oblique toggle showing nonzero commutator), while selective $(+, +)$ updates diverge to $|+X\rangle$ vs. $|+Z\rangle$ (paired with the three-world set-revision inset of [@thm-ch33-consensus-revision-and-escape], Clause 1); lower subscene displays the rotated two-lab LF witness ($A_1 = Z,\; B_1' = X$), reaching $F_{\mathrm{LF}} = \sqrt{5} + 3 + \sqrt{2 + \sqrt{2}} \approx 7.0838 > 6$ at visibility $v = 1$ and crossing the LF bound $6$ at $v_{\mathrm{crit}} \approx 0.8470$.
:::

::: {.remark #rem-ch33-quantum-darwinism-local-friendliness-literature title="Einselection, Quantum Darwinism, and Extended Wigner's-Friend Local Friendliness Theorems (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Three foundational quantum-foundations results referenced in this section belong to external physics literature and are not formalized in `trureturing@dev`:

1. **Environment-Induced Superselection (Einselection) and Quantum Darwinism (W. H. Zurek, *Phys. Rev. D* **24**, 1516, 1981; *Rev. Mod. Phys.* **75**, 715, 2003; *Nature Physics* **5**, 181–188, 2009; R. Blume-Kohout & W. H. Zurek, *Found. Phys.* **35**, 1857–1876, 2005)**: Zurek and collaborators showed that environmental monitoring dynamically stabilizes pointer states commuting with the coupling and derived in pure many-spin branching models the mutual-information plateau $I(S : \mathcal{F}_m) \approx H(S)$ across interior fractions $0 < m/N < 1$ rising to $2H(S)$ at $m = N$. As noted above, this closed-form plateau requires aligned pure product records and characterizes redundant classical record correlations rather than non-unitary single-outcome collapse;
2. **Extended Wigner's-Friend No-Go Arguments (Č. Brukner, *Entropy* **20**, 350, 2018; D. Frauchiger & R. Renner, *Nat. Commun.* **9**, 3711, 2018)**: Combining Wigner's-friend laboratories with bipartite entanglement shows that universal unitary quantum evolution applied to encapsulated observers precludes stitching internal friend records and external superobserver measurements into one context-independent global joint distribution;
3. **Genuine Local Friendliness (LF) Polytope Inequality and Quantum Violation (K.-W. Bong et al., *Nature Physics* **16**, 1199–1205, 2020)**: Under **Absoluteness of Observed Events (AOE)**, **Locality** (parameter independence), and **No-Superdeterminism**—strictly weaker than Bell local predetermination—the binary three-setting correlation polytope ($x, y \in \{1, 2, 3\}$, $a, b \in \{-1, +1\}$, setting $1$ reading each friend's record; $96$ vertices, strictly larger than the Bell local polytope) obeys the genuine LF facet bound

   $$
   F_{\mathrm{LF}} \;:=\; -a_1 - a_2 - b_1 - b_2 - E_{11} - 2E_{12} - 2E_{21} + 2E_{22} - E_{23} - E_{32} - E_{33} \;\le\; 6,
   $$

   where $a_x = \langle A_x\rangle,\; b_y = \langle B_y\rangle,\; E_{xy} = \langle A_x B_y\rangle$. In the ideal coherently controlled two-qubit logical-lab model on $|\Phi^+\rangle$ with $XZ$-plane unit Pauli observables $A_1 = Z,\, A_2 = X,\, A_3 = (X+Z)/\sqrt{2}$ and $B_1 = -(Z+2X)/\sqrt{5},\, B_2 = -[(2+\frac{1}{\sqrt{2}})Z + (-2+\frac{1}{\sqrt{2}})X]/3,\, B_3 = -[\frac{1}{\sqrt{2}}Z + (1+\frac{1}{\sqrt{2}})X]/\sqrt{2+\sqrt{2}}$ (simultaneously rotating Bob's state and observables by $\theta = \operatorname{atan2}(-1, -2)$ about $Y$ sets $A_1 = Z,\, B_1' = X$ while preserving all correlations), local means vanish and the exact quantum witness attains

   $$
   F_{\mathrm{LF}} \;=\; \|A_1 + 2A_2\| + \|2A_1 - 2A_2 + A_3\| + \|A_2 + A_3\| \;=\; \sqrt{5} + 3 + \sqrt{2 + \sqrt{2}} \;\approx\; 7.083827 \;>\; 6;
   $$

   under white noise $\rho_v = v|\psi'\rangle\langle\psi'| + (1 - v)\frac{1}{4}I_4$ ($0 \le v \le 1$), $F_{\mathrm{LF}}(v) = v F_{\mathrm{LF}}(1)$ violates the bound whenever $v > v_{\mathrm{crit}} = 6 / (\sqrt{5} + 3 + \sqrt{2 + \sqrt{2}}) \approx 0.8470$. Photonic experiments confirm this logical two-qubit violation, whereas extrapolating to macroscopic human observers requires stipulated ideal coherent isolation and reversal control.
:::

Finally, what if an existing community's consensus is confined to a rank-$2$ plane $S = \operatorname{span}(\mathbf{e}_1, \mathbf{e}_2) \subset \mathbb{R}^3$—for example $\mathbf{M}_0 = \operatorname{diag}(a, b, 0)$ with $a, b > 0,\; a + b = 1$ (note $\operatorname{Tr}(\mathbf{M}_0) = 1$, distinct from the trace-$2$ subspace projector $P_S = \operatorname{diag}(1, 1, 0)$)? Does consensus trap observation inside that flat plane forever? By Clause 3 of [@thm-ch33-consensus-quadratic-and-gram] and Clause 2 of [@thm-ch33-consensus-revision-and-escape], because $S^\perp = \operatorname{span}(\mathbf{e}_3) \neq \bot$, a **pioneer observer** tilting out of the plane along $\mathbf{n}(\beta) = \cos\beta\,\mathbf{e}_1 + \sin\beta\,\mathbf{e}_3$ ($\beta \in [0, \frac{\pi}{2}]$) carries exact orthogonal escape residual $\|(I_3 - P_S)\mathbf{n}(\beta)\| = |\sin\beta|$! Assigning pioneer weight $\eta \in (0, 1)$ and rescaling the existing community by $1 - \eta$ yields

$$
\mathbf{M}_\eta \;=\; (1 - \eta)\mathbf{M}_0 + \eta\,\mathbf{n}(\beta)\mathbf{n}(\beta)^{\mathsf{T}}, \qquad \det \mathbf{M}_\eta \;=\; (1 - \eta)^2 a b \eta \sin^2\beta,
$$

which satisfies $\det\mathbf{M}_\eta > 0$ for all $0 < \eta < 1$ and $\sin\beta \neq 0$ (at default $a = 0.7, b = 0.3, \eta = 0.15, \beta = \frac{\pi}{4}$: residual $1/\sqrt{2}$, spectrum $(0.6793, 0.2550, 0.0657)$, and $\det\mathbf{M}_\eta \approx 0.01138 > 0$), expanding the represented consensus span from rank $2$ to rank $3$! One crucial dynamical boundary must be stated plainly: under the **old** generator $G_0 = I_3 - \mathbf{M}_0 = \operatorname{diag}(1-a, 1-b, 1)$, the unrecorded $\mathbf{e}_3$ mode has eigenvalue $1$ and damps at the **fastest** rate $e^{-t}$—**$\ker\mathbf{M}_0$ is *not* a decoherence-free subspace; unendorsed directions are washed out fastest by the incumbent consensus, and only sustained positive pioneer weight $\eta > 0$ stabilizes the third rank inside the ambient $3$-space (here $D \to D + 1$ denotes represented-span enlargement, while literal physical Hilbert-space creation remains a `MODEL` / `OPEN` frontier)**:

::: {.viz src="observer-consensus-decoherence" preset="new-axis-pioneers" height="500"}
**Orthogonal Pioneer Escape and Rank-Enlargement Card (`new-axis-pioneers`)**: Incumbent consensus lies in the $xy$ plane $\mathbf{M}_0 = \operatorname{diag}(0.7, 0.3, 0)$ (shown separately from the geometric projector $P_S = \operatorname{diag}(1, 1, 0)$). Tilting a weight-$\eta = 0.15$ pioneer axis $\mathbf{n}(\beta) = \cos\beta\,\mathbf{x} + \sin\beta\,\mathbf{z}$ lifts a magenta orthogonal residual of norm $\sin\beta$ ([@thm-ch33-consensus-revision-and-escape], Clause 2), opening $\lambda_3 \approx 0.0657 > 0$ (rank $2 \to 3$) at $\beta = \frac{\pi}{4}$ while a dedicated damping cue shows that under $G_0$ the unrecorded $z$ component decays fastest as $e^{-t}$ rather than enjoying decoherence-free protection.
:::

We consolidate the contrast between pre-posited absolute objectivity and multi-observer consensus decoherence in the five-row comparison box below:

::: {.remark #rem-ch33-consensus-vs-absolute-objectivity title="Five-Way Comparison: Pre-Posited Absolute Objectivity vs. Multi-Observer Consensus Decoherence and Distributed Consensus Analogy"}
**Model Synthesis and Three-Tier Warrant Boundary (`MODEL` / `LEAN ✓` / `Literature`).** In the table below, common-phase quadratic Hermitian locking, Gram factorization, complement projections, qubit pinching Pythagoras, full-pinching relative-entropy production, unread fixed points, surviving-copy blocking, reduced access defect, partition-topology kernels, conflict-reset noncommutativity, and orthogonal escape rest on [@thm-ch33-consensus-quadratic-and-gram]–[@thm-ch33-consensus-revision-and-escape] (`LEAN ✓`); Quantum Darwinism and the Genuine Local Friendliness bound follow [@rem-ch33-quantum-darwinism-local-friendliness-literature] (`Literature`); and the analogy to distributed fault-tolerant ledgers (cf. L. Lamport, R. Shostak & M. Pease, *ACM Trans. Program. Lang. Syst.* **4**, 382–401, 1982 Byzantine quorum consensus—shared classical history stabilized by redundant honest majorities without an external master clock, while noting that quantum consensus acts via positive-semidefinite dyadic contraction $\mathbf{M}_{\mathrm{cons}}$ and entangled branching rather than classical signed message voting) belongs explicitly to our interpretive `MODEL`:

| Dimension | Pre-Posited Absolute Objectivity (Hidden Point $C$) | Multi-Observer Consensus Decoherence (Formal–Geometric Synthesis) |
| :--- | :--- | :--- |
| **1. Origin of Pointer Basis** | Assumes nature pre-installs an observer-independent privileged classical basis prior to interaction | The Bloch sphere is democratic; a pointer line emerges endogenously from $\mathbf{M}_{\mathrm{cons}} = \sum_j w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ iff $\Delta\lambda > 0$, vanishing in isotropic fog $\frac{1}{3}I_3$ or planar top-degeneracy (`manual derivation` / `MODEL`) |
| **2. Sign & Phase Gauge** | Confuses vector averages $\sum w_j\mathbf{n}_j$ with collective axes, or conflates axis relabeling with state identity | Unoriented sign flips $(-\mathbf{n}_j)(-\mathbf{n}_j)^{\mathsf{T}} = \mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ leave $\mathbf{M}_{\mathrm{cons}}$ invariant (without identifying orthogonal antipodal states), while common ket-phase invariance locks quadratic Hermitian & Gram forms ([@thm-ch33-consensus-quadratic-and-gram]) |
| **3. Decoherence Dynamics** | Treats decoherence as an opaque one-way sink and blurs finite schedules with continuum limits | Single-step Pauli dephasing fixes $\mathbf{n}$ and scales transverse axes by $\cos\alpha$, keeping ordered products, ensemble means $\overline{\mathbf{K}}$, and weak-limit generator $I_3 - \mathbf{M}_{\mathrm{cons}}$ distinct while full pinching obeys Pythagorean & relative-entropy identities ([@thm-ch33-consensus-pinching-and-fixed-points]) |
| **4. Macroscopic Objectivity** | Equates classical facts with observer-free absolutes and local irreversibility with global destruction | Pure aligned branching yields the interior redundancy plateau $I(S:\mathcal{O}_m) \approx H_2(p_0)$; local irreversibility reflects uncontrolled surviving copies and reduced access defects, while shared ledgers track readout kernels & invariant common factors ([@thm-ch33-consensus-redundant-records-and-kernel], [@thm-ch33-contextual-attractor-and-common-factor]) |
| **5. Split Bubbles & Pioneers** | Assumes all local records fit one global truth table and unrecorded directions cannot enter | Orthogonal $Z/X$ unread channels commute whereas selective updates & conflict revisions do not, two encoded labs violate Genuine LF at $F_{\mathrm{LF}} \approx 7.0838 > 6$, and out-of-plane pioneers enlarge span rank $2 \to 3$ despite $e^{-t}$ old-generator damping ([@thm-ch33-consensus-revision-and-escape], [@rem-ch33-quantum-darwinism-local-friendliness-literature]) |
:::

Step into the full interactive laboratory `ORTHO//CONSENSUS` below to switch freely across all six presets on one unified 3D Bloch/consensus ellipsoid, fragment-arc, and two-lab correlation stage, sweeping axis distributions, dephasing angles, fragment sizes, white-noise visibility, and pioneer tilt:

::: {.viz src="observer-consensus-decoherence" height="640"}
**Interactive Laboratory `ORTHO//CONSENSUS`**: Multi-observer consensus tensor, emergent pointer basis, and no observer-independent facts sandtable. Unites `isotropic-fog` (six-axis $\mathbf{M}_{\mathrm{cons}}=\frac{1}{3}I_3$ isotropic contraction with `pointerAxis = null`), `axis-consensus` (collinear longitudinal survival $\Gamma_\parallel=1$, transverse $(\cos\alpha)^k$ decay, and $\alpha=\pi/2$ full pinching), `phase-gauge` (sign-flip dyad invariance alongside common ket-phase quadratic Hermitian data), `darwinism-plateau` ($N=16$ pure branching mutual-information plateau, controlled-$U_j^\dagger$ access residual, and four-stage phase certificate), `dual-wigner-bubbles` (commuting unread $Z/X$ channels vs. selective branching, set-revision noncommutativity, and Genuine Local Friendliness violation $F_{\mathrm{LF}} \approx 7.0838 > 6$), and `new-axis-pioneers` (out-of-plane residual $\sin\beta$ rank enlargement $2 \to 3$ vs. fastest $e^{-t}$ old-generator damping). Green badges mark exclusively the twelve Lean-verified theorems cited in this section; Quantum Darwinism, LF bounds, numerical curves, and distributed-consensus analogies carry explicit literature, numerical, and model labels.
:::

Yet once the universe excises the external reference point $C$ so that all beings measure one another as mobile attractors and select local pointer axes through multi-observer consensus, an urgent geometric question immediately arises: **on a featureless unit sphere with no privileged origin, how does an observer ever determine *where* it stands? Why does a single inner-product reading leave an entire equatorial circle of degeneracy, and why is it specifically the degeneracy and breaking of *orthogonality ($90^\circ$)* that pins down an observer's unique address?** That is the door we open in [Chapter 34](ch34-orthogonality-degeneracy-and-observer-position.md).
