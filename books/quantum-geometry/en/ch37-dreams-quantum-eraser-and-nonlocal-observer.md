# Dream Quantum Erasure, Known-Data Decoherence, and the Nonlocal Observer

> "Dreams allow an observer to experience the parts missed through subjective choice; the essence of observation is decoherence using known data. When a dream forgets part of that information, distinctive vistas open up; in dreams one often forgets one's own body—everything is in truth a rendering of appearances. We discover that the observer actually emerges across multiple positions rather than being confined to direct five-sense perception..."

In [Chapter 35](ch35-light-pulse-and-self-referential-table.md) and [Chapter 36](ch36-hyperbolic-steps-and-quotienting-reincarnation.md), we traced on the macroscopic scale of an entire life cycle how birth-forgetting resets Gram compatibility volume and how an infinite discrete hyperbolic staircase blocks the $\cos 90^\circ = 0$ amnesia cliff. Yet a finite observer need not wait until the end of a lifetime to witness how partial forgetting reopens occluded orthogonal vistas—**once every twenty-four hours, as darkness falls and the eyelids close, every mind steps right from its own pillow into a natural quantum-erasure laboratory: the dream.**

For millennia, mechanistic materialism dismissed dreams as random nocturnal static, while mysticism romanticized them as supernatural out-of-body wanderings. The moment we return to the zero-background orthogonal geometry developed throughout this book, the four progressive insights of our chapter epigraph—joined with choosing the future and pre-compiled déjà vu—illuminate waking and dreaming in a single beam of light (under our epistemic contract, the cross-domain geometric synthesis of waking perception, nocturnal erasure, nonlocal awareness, and déjà vu cache hits is explicitly designated as **`MODEL` (interpretive model)**, its operator-algebraic, memory-reversal, cut-and-project Delone model-set, orthogonal-escape, and structural-novelty foundations rest on seventeen frozen Lean 4 kernel theorems, and external quantum-optics, computer-architecture, and sleep/cognitive-neuroscience findings reside strictly inside attributed literature remarks):

1. **Observation as decoherence via known data**: The solidity and narrowness of waking life arise because the observer deploys high-weight historical anchors to pinch the global superposition field, shearing coherence between branches into the $90^\circ$ off-diagonal blind zone;
2. **Dreaming as nocturnal reversible quantum erasure**: Temporarily suspending a subset of memory constraints expands the Gram compatibility determinant and, under coherent amplitude conjugation, redeems orthogonal branches missed through daytime choice;
3. **Bodiless dreams falsify the "vessel illusion"**: When the bodily prior drops to zero in deep dreams, awareness continues rendering vividly without limbs or sense organs, revealing daytime brick-and-bone solidity and nighttime bodiless flight as co-originating inner-product appearances;
4. **Nonlocal multi-position emergence beyond the five-sense pinhole**: The five senses act as a spatial throttle pinning readout to one coordinate; once that pinhole relaxes, the observer emerges simultaneously across an entire Delone model set of golden cut-and-project nodes;
5. **Choosing rather than seeing the future and the déjà vu cache hit**: While chronological timestamps are suspended in sleep, antecedent logic pre-decoheres a branching slice ahead of time; when no waking novelty flushes that cache, same-ruler re-projection incurs zero additional pinching entropy alongside a null timestamp, producing déjà vu.

::: {.figure src="ch37-overview"}
**Figure 37.** The chapter at a glance. Panel I: the grid of the $2 \times 2$ pure state at $\theta = \pi/6$ (each square has area $\lvert\rho_{ij}\rvert$); after pinching the cyan diagonal stays as it was and the magenta off-diagonal is left as dashed outlines. Panel II: on the circle of radius $1/2$, two phase records each multiply $\rho_{01}$ by $-i$ and turn it along the magenta arrows from $1/2$ to $-1/2$; reversing both together, the cyan arrows turn it back the same way to $1/2$ (see [@thm-ch37-joint-coherent-record-erasure]). Panel III: one row of cut-and-project places; on the upper line the five-sense pinhole reads only the amber body place $\mathbf{x}_0$, on the lower line, with the bodily prior unloaded, every place is lit cyan. Reading the three scenes this way is the chapter's interpretive model (`MODEL`).
:::

---

## 37.1 Observation as Decoherence via Known Data: Why Waking Reality Feels Rigid and Narrow

Everyday intuition harbors a stubborn conceptual idol: **the camera myth**. People assume that the external world already comes pre-packaged as rigid tables, walls, and clock ticks, and that a waking observer merely opens the eyes like a passive photographic plate to register incoming rays.

That passive-reception fable quietly smuggles back the external "third point $C$" we excised in [Chapter 2](ch02-born-rule.md). In zero-background pairwise measurement, no reading exists apart from a measuring ruler—**observation is never passive reception; it is an active projective pruning operation in which the observer wields accumulated "known data" to decoherently shear the global superposition field (`MODEL` (interpretive model))!**

Let us set this mechanism directly onto a finite-dimensional matrix blackboard. In the waking regime, a seasoned observer holds inside its self-referential lookup table $T$ a complete family of pairwise orthogonal, self-adjoint **known-data projector anchors** $D_{\mathrm{known}} = \{P_1, P_2, \dots, P_M\}$ ($P_k^\dagger = P_k,\; P_k^2 = P_k,\; k \neq l \Rightarrow P_k P_l = 0,\; \sum_{k=1}^M P_k = I$, encoding idempotent one-dimensional commitments such as "this skin boundary is my body," "gravity pulls downward," "today is this date in this city," and "I bear this name"). Whenever the ambient field state $\rho$ meets the waking mind, the observer applies strong record pinching across $D_{\mathrm{known}}$:

$$
\Pi_{\mathrm{wake}}(\rho) \;:=\; \operatorname{unreadState}(P, \rho) \;=\; \sum_{k=1}^M P_k \,\rho\, P_k.
$$

This unread state retains every record sector while deleting coherence between sectors. Selecting a nonzero-weight outcome instead requires normalizing its block $P_k\rho P_k$ by the record weight. The narrative of choosing one line adopts this conditioned readout.

Recall the **Gain–Loss Fairness Pythagorean ledger** of [Chapter 31](ch31-quantum-fairness.md) (Conjunct 2 of [@thm-ch31-seat-pythagorean-monogamy-fairness]): whenever a unit-purity superposition is welded onto a single one-dimensional subjective waking choice $\cos\theta$, its complementary orthogonal bifurcation share $\sin\theta\,\hat{\mathbf{I}}$—the street not taken at the intersection, the reply held back on the tongue, the counterfactual life configuration left unchosen—**is not annihilated from the timeless global carrier**! On the matrix ledger, those unchosen tensions inhabit the off-diagonal cross-record blocks $P_k \rho P_l$ ($k \neq l$).

Before stating the general $n$-dimensional theorem, let us audit this "waking decoherence tax" explicitly on a $2 \times 2$ single-qubit blackboard. Starting from the zero-entropy pure state $\rho(0) = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ ($S(\rho(0)) = 0$), evolve by the planar rotation $U(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ into a coherent pure superposition and immediately apply computational-basis pinching:

$$
\tilde{\rho}_0 = U(\theta)\rho(0)U(\theta)^\dagger = \begin{pmatrix} \cos^2\theta & \cos\theta\sin\theta \\ \cos\theta\sin\theta & \sin^2\theta \end{pmatrix} \;\xrightarrow{\;\operatorname{pinching}\;}\; \rho(1) = \begin{pmatrix} \cos^2\theta & 0 \\ 0 & \sin^2\theta \end{pmatrix}.
$$

Two exact quantities jump right off the page: the trace-inner-product coherence mass sheared away by waking pinching equals the sum of off-diagonal squared moduli $2\cos^2\theta\sin^2\theta = \frac{1}{2}\sin^2(2\theta)$ (Conjunct 2 of [@thm-ch37-known-data-pinching-and-entropy-tax] below); and because unitary rotation preserves zero entropy $S(\tilde{\rho}_0) = 0$, deleting those off-diagonal entries immediately raises quantum entropy (`vonNeumannEntropy`) by the nonnegative relative entropy of deleted coherence (Conjunct 3 of [@thm-ch37-known-data-pinching-and-entropy-tax] below):

$$
S\bigl(\rho(1)\bigr) - S\bigl(\rho(0)\bigr) \;=\; -\cos^2\theta\ln(\cos^2\theta) - \sin^2\theta\ln(\sin^2\theta) \;=\; D\bigl(\tilde{\rho}_0 \,\|\, \operatorname{pinching}(\tilde{\rho}_0)\bigr) \;\ge\; 0
$$

::: {.figure src="ch37-entropy-tax"}
**The coherence one pinching step cuts and the entropy tax it charges peak together at $\theta = \pi/4$.** The magenta curve is the discarded coherence mass $\frac{1}{2}\sin^2(2\theta)$, the ink curve the entropy increase $-\cos^2\theta\ln(\cos^2\theta) - \sin^2\theta\ln(\sin^2\theta)$; both vanish at $\theta = 0$ and $\theta = \pi/2$ and reach $1/2$ and $\ln 2$ respectively at $\theta = \pi/4$ (the one-qubit case of [@thm-ch37-known-data-pinching-and-entropy-tax], items 2 and 3).
:::

At the equal superposition $\theta = \frac{\pi}{4}$ the one-step tax evaluates to $\ln 2$. Why the daytime world feels at once **solid and reliable** yet **narrow and exhausting** is now algebraically transparent:

- **Solid**, because record pinching obeys strict functional idempotence $\Pi_{\mathrm{wake}} \circ \Pi_{\mathrm{wake}} = \Pi_{\mathrm{wake}}$: so long as you interrogate the world millisecond after millisecond with the same known-data basis, every off-diagonal anomaly is crushed to zero ($P_k \rho P_l = 0$), tables stay tables, and walls never let a hand pass through;
- **Narrow and exhausting**, because across every step of unitary evolution $U$ followed by basis pinching that deletes coherence between sectors, the deleted off-diagonal coherence is converted penny for penny into a nonnegative **quantum relative-entropy tax**! In this `MODEL`, sustaining a crisp one-dimensional daytime rail feels like paying an ongoing entropy bill; turning that information-entropy tax into physical heat dissipation also requires the bath, initial-state, and entropy-balance conditions of [Chapter 31](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness].

::: {.viz src="dream-decoherence-unpinning" preset="waking" height="500"}
**Awake: the known data pin every place.** As the anchor strength λ goes from 0 to 1, the magenta cross-block squares shrink by 1 − λ to nothing while the cyan diagonal, the weight of each place, does not move; on the screen the fringes fade into the smooth envelope of the dashed cyan curve, and the entropy (S in the readout line) rises from 0 to the relative entropy of the deleted coherence ([@thm-ch37-known-data-pinching-and-entropy-tax], items 1 and 3). The four places and the screen are a model chosen for the picture.
:::

The formal theorem below locks record-pinching idempotence, the vanishing-off-diagonal fixed-point criterion, exact qubit discarded coherence mass, and the multi-step coherence-deletion entropy identity onto a single Lean-4-verified foundation:

::: {.theorem #thm-ch37-known-data-pinching-and-entropy-tax title="Known-Data Record-Pinching Idempotence, Fixed-Point Criterion, Discarded Coherence Mass, and Entropy-Production Identity" lean="D5/S3/Observer/Conditioning.unreadState_fixed_iff D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity"}
Across the frozen observer-conditioning, pinching-projection, and quantum-dynamics entropy modules of `trureturing`, the following four theorems governing projective decoherence and the thermodynamic cost of coherence deletion hold simultaneously:

1. **Functional Idempotence and Exact Fixed-Point Criterion of Finite Record Pinching** ([`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)): Let $n, \kappa$ be finite types (`[Fintype n] [DecidableEq n] [Fintype kappa]`), let $P : \kappa \to M_n(\mathbb{C})$ satisfy `IsRecordMeasurement P` ($\forall k,\; P_k^\star = P_k$, $\forall k,\; P_k^2 = P_k$, $\forall k \neq l,\; P_k P_l = 0$, and $\sum_{k \in \kappa} P_k = 1$), and write $\operatorname{unreadState}(P)(\rho) = \sum_{k \in \kappa} P_k \rho P_k$. Then $\operatorname{unreadState}(P)$ is idempotent under composition, and for every $\rho \in M_n(\mathbb{C})$, it fixes $\rho$ if and only if all off-diagonal record blocks vanish:

   $$
   \operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P), \qquad \operatorname{unreadState}(P, \rho) = \rho \;\Longleftrightarrow\; \forall k, l \in \kappa,\; k \neq l \to P_k \rho P_l = 0;
   $$

2. **Exact Off-Diagonal Formula for Qubit Discarded Coherence Mass** ([`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)): On $\mathrm{QubitMatrix} = M_{\operatorname{Fin} 2}(\mathbb{C})$, writing $\operatorname{hilbertSchmidtInner}(A, B) = \operatorname{Tr}(A^\dagger B)$ and standard-basis dephasing $\operatorname{pinching}(\rho)$, every matrix $\rho \in \mathrm{QubitMatrix}$ satisfies

   $$
   \operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho),\; \rho - \operatorname{pinching}(\rho)\bigr) \;=\; \bigl(\operatorname{normSq}(\rho_{01}) + \operatorname{normSq}(\rho_{10}) : \mathbb{C}\bigr);
   $$

3. **Entropy-Production and Coherence-Deletion Identity Under Repeated Unitary–Pinching Steps** ([`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)): Let $n$ be a finite decidable type (`[Fintype n] [DecidableEq n]`), let $U \in \operatorname{unitaryGroup}(n, \mathbb{C})$, and let $\rho : \mathbb{N} \to \operatorname{DensityState}(n)$ satisfy $\forall k \in \mathbb{N},\; \rho(k + 1) = \operatorname{basisPinchingState}(\operatorname{unitaryConjugateState}(U, h_U, \rho(k)))$. Writing $\tilde{\rho}_k := \operatorname{unitaryConjugateState}(U, h_U, \rho(k))$, each step's von Neumann entropy increase equals the nonnegative quantum relative entropy of deleted coherence, and the $N$-step cumulative entropy gain equals the exact sum of those step taxes:

   $$
   \begin{aligned}
   &\forall k \in \mathbb{N},\quad S\bigl(\rho(k+1)\bigr) - S\bigl(\rho(k)\bigr) \\
    &\quad = D\bigl(\tilde{\rho}_k \,\big\|\, \operatorname{basisPinchingState}(\tilde{\rho}_k)\bigr) \ge 0, \\
    &\forall N \in \mathbb{N},\quad S\bigl(\rho(N)\bigr) - S\bigl(\rho(0)\bigr) \\
    &\quad = \sum_{k \in \operatorname{Finset.range} N} D\bigl(\tilde{\rho}_k \,\big\|\, \operatorname{basisPinchingState}(\tilde{\rho}_k)\bigr).
   \end{aligned}
   $$
:::

::: proof
In Conjunct 1, left-multiplying $\operatorname{unreadState}(P, \rho)$ by $P_k$ kills $l \neq k$ via orthogonality to give $P_k \operatorname{unreadState}(P, \rho) = P_k \rho P_k$, right-multiplying by $P_k$ and applying $P_k^2 = P_k$ yields pointwise idempotence, and `funext` lifts this to function composition; for `unreadState_fixed_iff`, if $\operatorname{unreadState}(P, \rho) = \rho$ then $P_k \rho P_l = P_k \rho (P_k P_l) = 0$ for $k \neq l$, while conversely completeness gives $P_k \rho = P_k \rho (\sum_l P_l) = P_k \rho P_k$, whose sum over $k$ restores $(\sum_k P_k)\rho = \rho$. Conjunct 2 expands the $\operatorname{Fin} 2$ trace product of $\rho - \operatorname{pinching}(\rho)$ and simplifies $\bar{z}z = \operatorname{normSq}(z)$. Conjunct 3 uses the continuous functional calculus to prove unitary invariance $S(\tilde{\rho}_k) = S(\rho(k))$ and the diagonal log-trace identity $\operatorname{Tr}(\tilde{\rho}_k \log \mathcal{P}(\tilde{\rho}_k)) = \operatorname{Tr}(\mathcal{P}(\tilde{\rho}_k) \log \mathcal{P}(\tilde{\rho}_k))$ to equate single-step entropy gain with $D(\tilde{\rho}_k \,\|\, \mathcal{P}(\tilde{\rho}_k))$; doubly stochastic majorization by squared eigenvector moduli together with convexity of $x \mapsto x\ln x$ establishes nonnegativity, and telescoping over $\operatorname{Finset.range} N$ yields the finite-horizon sum. The full proof is checked by the Lean kernel.
:::

::: {.viz src="dream-decoherence-unpinning" preset="blocks" height="500"}
**With only two anchor blocks, the coherence inside a block stays.** With the family “body x₀ | the other three”, λ = 1 cuts only the magenta squares between the body and the rest; the cyan squares among the three stay in their block and the screen keeps the cyan fringes they add. This is the fixed point of item 1 of [@thm-ch37-known-data-pinching-and-entropy-tax]: zero across the blocks, and pinching again changes nothing.
:::

---

## 37.2 Dreams as Nocturnal Quantum Erasure: How Partial Forgetting Redeems Unchosen Orthogonal Branches

Because daytime focus operates as a pinching engine that continually prunes $\sin\theta$ branches while accumulating entropy taxes, a bounded mind that never relaxed its grip on known data would steadily suffocate inside a shrinking compatibility corridor. In [Chapter 36](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) we saw that driving the entire table across $\cos 90^\circ = 0$ is catastrophic macroscopic formatting; by contrast, living observers rely every night on an exquisite **soft-maintenance protocol (`MODEL` (interpretive model))**—**reversible partial forgetting in dreams**.

When the sleeping mind temporarily suspends rigid daytime constraint rows (forgetting for a few hours what year it is, that two cities lie oceans apart, or that an old companion moved away years ago), how do the surviving compatibility geometry and cross-layer addressing corridors reorganize? The attributed worked example below derives the explicit $3 \times 3$ and $2 \times 2$ principal Gram determinants and oblique counterfactual slices:

::: {.example #ex-ch37-gram-constraint-release title="Explicit 3x3 Gram Determinant Expansion and Oblique Counterfactual Corridors Under Partial Constraint Release (Formalized)" lean="D5/S3/QuantumContext/ThreeAnchorGram.threeAnchorGram D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff"}
**Formalized.** `trureturing@dev` freezes the three-anchor Gram matrix, its determinant expansion, and the criterion that strict positivity is equivalent to linear independence ([`threeAnchorGram`](lean:D5/S3/QuantumContext/ThreeAnchorGram.threeAnchorGram), [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)). The numerical corridor below instantiates those general statements at unit anchors and $c_{12}=x_1=4/5$; Lean covers the Gram identities and independence criterion, while the dream interpretation remains a model application.

Consider three unit vectors in a real inner-product space: let $\mathbf{u}_1$ denote a deep emotional/structural phase anchor ($\lVert\mathbf{u}_1\rVert = 1$), let $\mathbf{u}_2$ denote a rigid daytime spatiotemporal continuity anchor ($\lVert\mathbf{u}_2\rVert = 1$) strongly coupled to $\mathbf{u}_1$ in waking habit with overlap $c_{12} = \langle\mathbf{u}_1, \mathbf{u}_2\rangle = \frac{4}{5} = 0.8$, and let $\mathbf{v}$ ($\lVert\mathbf{v}\rVert = 1$) be a candidate experiential state with overlaps $x_1 = \langle\mathbf{u}_1, \mathbf{v}\rangle$ and $x_2 = \langle\mathbf{u}_2, \mathbf{v}\rangle$.

1. **Universal Sum-of-Squares Gap Between $2 \times 2$ and $3 \times 3$ Gram Determinants**: Write the full $3 \times 3$ unit-diagonal Gram matrix $G_3(x_1, x_2)$ alongside the $2 \times 2$ principal submatrix $G_2(x_1)$ obtained when anchor $\mathbf{u}_2$ (row $2$ and column $2$) is suspended in sleep:

   $$
   G_3(x_1, x_2) = \begin{pmatrix} 1 & c_{12} & x_1 \\ c_{12} & 1 & x_2 \\ x_1 & x_2 & 1 \end{pmatrix}, \qquad G_2(x_1) = \begin{pmatrix} 1 & x_1 \\ x_1 & 1 \end{pmatrix}.
   $$

   Expanding the $3 \times 3$ determinant and completing the square in $x_2$ gives

   $$
   \det G_3(x_1, x_2) \;=\; 1 - c_{12}^2 - x_1^2 - x_2^2 + 2c_{12}x_1 x_2 \;=\; (1 - c_{12}^2)(1 - x_1^2) - (x_2 - c_{12}x_1)^2,
   $$

   so subtracting $\det G_3$ from $\det G_2(x_1) = 1 - x_1^2$ yields an exact sum of two nonnegative squares:

   $$
   \det G_2(x_1) - \det G_3(x_1, x_2) \;=\; c_{12}^2(1 - x_1^2) + (x_2 - c_{12}x_1)^2 \;\ge\; 0.
   $$

   Whenever $c_{12} \neq 0$ and $\lvert x_1\rvert < 1$ (or whenever $x_2 \neq c_{12}x_1$), suspending $\mathbf{u}_2$ **strictly enlarges** the squared compatibility volume: $\det G_2(x_1) > \det G_3(x_1, x_2)$!

2. **Numerical Audit Contrasting Waking Lock Against Nocturnal Oblique Slicing**: Fix $c_{12} = \frac{4}{5}$ and internal phase resonance $x_1 = \frac{4}{5}$:
   - **Waking Full-Anchor Lock ($M = 3$)**: Positive semidefiniteness $\det G_3(\frac{4}{5}, x_2) \ge 0$ forces $(x_2 - \frac{16}{25})^2 \le (\frac{9}{25})^2$, trapping $x_2$ inside the narrow corridor $x_2 \in [\frac{7}{25}, 1] = [0.28, 1.00]$; even at the conformist waking point $x_2 = \frac{4}{5}$, the compatibility determinant is squeezed down to $\det G_3(\frac{4}{5}, \frac{4}{5}) = \frac{81 - 16}{625} = \frac{13}{125} = 0.104$. An orthogonal counterfactual scene $x_2 = 0$ (such as conversing in a childhood courtyard with a friend met decades later in another city) yields $\det G_3(\frac{4}{5}, 0) = -\frac{7}{25} = -0.28 < 0$ and is flatly vetoed by waking Gram positivity!
   - **Dream Partial Forgetting ($M - \Delta M = 2$, $\mathbf{u}_2$ Suspended)**: Once sleep temporarily unloads $\mathbf{u}_2$, compatibility reduces to $G_2(\frac{4}{5}) \succeq 0$; the determinant more than triples from $0.104$ to $\det G_2(\frac{4}{5}) = 1 - \frac{16}{25} = \frac{9}{25} = 0.360 > 0$, the valid slice now retains only $\mathbf{u}_1$ and $\mathbf v$. With $\mathbf{u}_2$ removed, $x_2$ is no longer constrained; the old incompatible triple at $x_2=0$ has not become a realizable Gram matrix!
:::

::: {.figure src="ch37-constraint-release"}
**Suspending the spacetime anchor $\mathbf{u}_2$ lifts the compatibility determinant from $0.104$ to $0.36$, and $x_2$ drops out of it.** With $c_{12} = x_1 = \frac{4}{5}$, the ink parabola is $\det G_3$ with all three anchors in place: it is non-negative only in the narrow waking window $x_2 \in [0.28, 1]$ (the dot is $0.104$ at $x_2 = 0.8$), and at $x_2 = 0$ it is $-0.28$, crossed out. The dashed cyan line is $\det G_2 = 0.36$ of the slice that keeps only $\mathbf{u}_1$ and $\mathbf{v}$ once $\mathbf{u}_2$ is suspended, and the cyan arrow is that jump. Suspending $\mathbf{u}_2$ only frees $x_2$ from the constraint; the triple at $x_2 = 0$ is still not a realizable Gram matrix, so the cross stays. The determinant identities and positivity boundary are covered by [@ex-ch37-gram-constraint-release]'s frozen three-anchor declarations; the plotted values are this chapter's application.
:::

[@ex-ch37-gram-constraint-release] dissolves the apparent absurdity of dream montage: dreams are not broken films, but **oblique phase-addressed cross-sections** that emerge once chronological index $\mathbf{u}_2$ steps aside—allowing a childhood alley, a distant face, and an unwalked $\sin\theta$ fork to meet in one frame because all three share internal phase resonance $x_1$!

External quantum-optics literature concerning record erasure and its relativistic no-signaling boundary is recorded separately in [@rem-ch37-quantum-eraser-literature]:

::: {.remark #rem-ch37-quantum-eraser-literature title="Which-Path Marking and Delayed-Choice Quantum-Eraser Interferometry (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Experimental realizations linking selective record erasure to interference recovery belong to the external quantum-optics literature on the quantum eraser and are not formalized as standalone optical models in `trureturing@dev`:

1. **Quantum-Eraser Proposal and Optical Interferometric Demonstrations (M. O. Scully & K. Drühl, *Phys. Rev. A* **25**, 2208–2213, 1982; T. J. Herzog, P. G. Kwiat, H. Weinfurter & A. Zeilinger, *Phys. Rev. Lett.* **75**, 3034–3037, 1995)**: Coupling a two-path interferometer to orthogonal ancillary "which-path" states zeroes out off-diagonal coherence in the signal marginal and erases interference fringes; projecting the ancilla onto mutually unbiased symmetric/antisymmetric erasure states deletes path distinguishability and restores complementary interference fringes within the conditioned coincidence sub-ensembles;
2. **Delayed-Choice Quantum Eraser and the No-Signaling Boundary (Y.-H. Kim, R. Yu, S. P. Kulik, Y. H. Shih & M. O. Scully, *Phys. Rev. Lett.* **84**, 1–5, 2000)**: Using entangled photon pairs from spontaneous parametric down-conversion, interference fringes or smooth single-slit envelopes are recovered in joint detection even when the choice to erase or preserve the idler photon's path marker is made after the signal photon has already struck its detector (while the unconditional signal marginal remains strictly unchanged, obeying relativistic no-signaling without retrocausal communication).
:::

Within `trureturing`'s formal observer-memory module, under what exact algebraic condition can off-diagonal coherence $\rho_{ij}$ twisted by multiple record copies be losslessly redeemed, and what happens if only one copy is conjugated while a second copy remains active?

Inspect the explicit two-copy phase ledger first: start from the equal-superposition off-diagonal entry $\rho_{01} = +\frac{1}{2}$, and let each phase record write amplitude $(1, 0)$ for address $0$ and $(i, 0)$ for address $1$, giving unimodular overlap $\gamma = 1 \cdot \overline{i} + 0 = -i$ ($\overline{\gamma}\gamma = (+i)(-i) = 1$). Coupling two forward copies flips the sign of coherence; conjugating only copy $\{0\}$ leaves the surviving copy blocking recovery, whereas conjugating the full family $\{0, 1\}$ restores $+\frac{1}{2}$ without loss:

$$
\frac{1}{2} \;\xrightarrow{\;\text{forward }\times (-i)^2\;}\; -\frac{1}{2} \;\xrightarrow{\;\text{reverse }\{0\}\;\times (+i)\;}\; -\frac{i}{2} \neq \frac{1}{2}, \qquad -\frac{1}{2} \;\xrightarrow{\;\text{reverse }\{0,1\}\;\times (+i)^2\;}\; +\frac{1}{2}.
$$

::: {.viz src="dream-decoherence-unpinning" preset="half_erase" height="500"}
**Two records, only one reversed.** Two phase records (c = −i) are written one after the other and the magenta ρ₀₁ turns from 1/2 to −1/2; reverse copy 0 alone and the magenta arrow on the phase disc stops at −i/2, and the fringes sit a quarter period off the dashed grey curve; the dashed white line on the disc records the arrow's path, out half a turn and a quarter of the way back ([@thm-ch37-joint-coherent-record-erasure], item 2).
:::

Two kernel theorems establish both general full-family unimodular reversal and this exact two-copy certificate:

::: {.theorem #thm-ch37-joint-coherent-record-erasure title="Joint Coherent Reversal of Unimodular Record Families and the Two-Copy Partial-vs-Full Erasure Certificate" lean="D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate"}
Across the frozen joint-coherent-reversal observer-memory module of `trureturing`, write $\mathrm{EnvironmentRecord} = \operatorname{Fin} 2 \to \operatorname{Fin} 2 \to \mathbb{C}$, address Gram overlap $\operatorname{recordOverlap}(r, i, j) = \sum_{a \in \operatorname{Fin} 2} r(i, a)\,\overline{r(j, a)}$, amplitude-conjugated record $\operatorname{reverseRecord}(r)(i, a) = \overline{r(i, a)}$, and `multiRecordChannel` for sequential application scaling entry $(i, j)$ by $\prod_k \operatorname{recordOverlap}(\mathrm{records}(k), i, j)$. The following two statements hold simultaneously:

1. **Exact Coherence Restoration Under Full-Family Unimodular Conjugation** ([`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal)): Let $\mathrm{Copy}$ be a finite decidable index type (`[Fintype Copy] [DecidableEq Copy]`), let $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$, let $\rho \in \mathrm{QubitMatrix}$, and let $i, j \in \operatorname{Fin} 2$. If every copy's overlap at $(i, j)$ is unimodular,

   $$
   \forall k \in \mathrm{Copy},\qquad \operatorname{star}\bigl(\operatorname{recordOverlap}(\mathrm{records}(k), i, j)\bigr) \cdot \operatorname{recordOverlap}(\mathrm{records}(k), i, j) \;=\; 1,
   $$

   then applying `multiRecordChannel` with the globally conjugated family $\operatorname{reverseOn}(\operatorname{Finset.univ}, \mathrm{records})$ to $\operatorname{multiRecordChannel}(\mathrm{records}, \rho)$ restores $\rho_{ij}$ identically:

   $$
   \operatorname{multiRecordChannel}\bigl(\operatorname{reverseOn}(\operatorname{Finset.univ}, \mathrm{records}),\; \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{ij} \;=\; \rho_{ij};
   $$

2. **Explicit Two-Copy Certificate Contrasting Partial Obstruction Against Joint Restoration** ([`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)): Set $\rho = \mathrm{equalSuperpositionDensity} = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix}$, define $\mathrm{phaseRecord}(i, a)$ to take $1$ at $(i=0, a=0)$, $i$ (`Complex.I`) at $(i=1, a=0)$, and $0$ at $a=1$, set $\mathrm{records} : \operatorname{Fin} 2 \to \mathrm{EnvironmentRecord}$ to two identical copies of $\mathrm{phaseRecord}$, and write $\mathrm{copyZero} = \{0\} \subseteq \operatorname{Fin} 2$. Evaluating off-diagonal entry $(0, 1)$ under `reverseChannelOn` yields all four exact identities:

   $$
   \begin{aligned}
   &\rho_{01} = \frac{1}{2}, \\
    & \operatorname{multiRecordChannel}(\mathrm{records}, \rho)_{01} = -\frac{1}{2}, \\
    & \operatorname{reverseChannelOn}\bigl(\{0\}, \mathrm{records}, \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{01} = -\frac{i}{2}, \\
    & \operatorname{reverseChannelOn}\bigl(\operatorname{Finset.univ}, \mathrm{records}, \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\bigr)_{01} = \frac{1}{2}.
   \end{aligned}
   $$
:::

::: proof
For Conjunct 1, unfolding `multi_record_channel_apply` twice expresses entry $(i, j)$ as the product of the reversed-family overlap product, the forward overlap product, and $\rho_{ij}$; `reverse_record_overlap` rewrites each reversed copy's overlap as $\operatorname{star}(\operatorname{recordOverlap}(\mathrm{records}(k), i, j))$, and `Finset.prod_mul_distrib` merges the two finite products into $\prod_{k \in \operatorname{Finset.univ}} \operatorname{star}(\operatorname{recordOverlap}(\mathrm{records}(k), i, j)) \cdot \operatorname{recordOverlap}(\mathrm{records}(k), i, j) = \prod_k 1 = 1$ by `hunit k`. For Conjunct 2, direct evaluation gives $\operatorname{recordOverlap}(\mathrm{phaseRecord}, 0, 1) = 1 \cdot \overline{i} + 0 = -i$: forward coupling across both copies multiplies $1/2$ by $(-i)^2 = -1$ to give $-1/2$; reversing `{0}` alone multiplies by a single $+i$ to leave $-i/2 \neq 1/2$; jointly reversing `Finset.univ` (`{0, 1}`) multiplies by $(+i)^2 = -1$ and restores $(-1)(-1/2) = +1/2$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="dream-decoherence-unpinning" preset="zero_overlap_fail" height="500"}
**The unit-modulus premise cannot be dropped.** If the records tell the two paths apart completely (overlap c = 0, so the premise |c|² = 1 fails), writing the first copy shrinks the magenta ρ₀₁ to nothing, the arrow on the phase disc to a dot at the centre, and leaves only the envelope of the dashed cyan curve on the screen; reverse both copies and ρ₀₁ is still 0, the fringes do not return. These are numbers of the page from the same channel formula, outside the scope of [@thm-ch37-joint-coherent-record-erasure].
:::

Conjunct 2 of [@thm-ch37-joint-coherent-record-erasure] captures the lived difference between shallow half-sleep and deep nocturnal release (`MODEL` (interpretive model)): when two daytime commitments invert an initial $+1/2$ coherence into $-1/2$, loosening only copy `{0}` leaves the unreversed second guard twisting the phase onto $-i/2$; only when both copies are jointly conjugated across `Finset.univ` does the buried $+1/2$ amplitude resurface intact!

::: {.viz src="dream-decoherence-unpinning" preset="quantum_eraser" height="500"}
**Joint reversal of every copy.** Both phase records are written, then both are reversed: the magenta arrow on the phase disc turns half way round the dashed grey circle of radius 1/2 and back to 1/2, and the fringes land on the dashed grey curve again; the dashed white line on the disc is the arrow's path, out half a turn on the outer strand and back on the inner one, with a magenta dot where each step landed, at 1/2, −i/2 and −1/2 ([@thm-ch37-joint-coherent-record-erasure], item 1, every record with |c|² = 1).
:::

---

## 37.3 Unloading the Bodily Prior: Controlled Rendering, Bodiless Awareness, and the Common Origin of Appearances

Descending one rung deeper along nocturnal forgetting brings us face to face with the most quietly revolutionary observation in our epigraph:

> *"In dreams one often forgets one's own body—everything is in truth a rendering of appearances."*

Pause and inspect your own firsthand dream memory: in countless vivid dreams, you gaze across snow-lit mountain ridges, move through vaulted corridors, or recognize a beloved voice—and only after waking do you realize with a start that **throughout fifteen unbroken minutes of crystalline observation, you had no hands, no torso, no eye sockets or eardrums, and zero awareness of possessing a physical body at all!**

Related external literature in computational neuroscience and sleep physiology, together with its formal scope boundary, is recorded separately in [@rem-ch37-predictive-processing-rem-literature]:

::: {.remark #rem-ch37-predictive-processing-rem-literature title="Predictive-Processing Controlled Generation and REM Sensory-Motor Gating Physiology (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Empirical theories in computational neuroscience and sleep neurobiology concerning waking perception, dream generation, and bodily sensory suspension belong to external scientific literature and are not formalized in `trureturing@dev`:

1. **Predictive Processing, Active Inference, and "Controlled Hallucination" (H. von Helmholtz, *Handbuch der physiologischen Optik*, 1867; K. Friston, *Nat. Rev. Neurosci.* **11**, 127–138, 2010; A. K. Seth, *Being You*, 2021)**: Predictive-coding and free-energy frameworks model cortical perception not as bottom-up camera capture, but as top-down generative model projection continually calibrated by peripheral prediction-error signals; waking perception functions as sensory-clamped "controlled hallucination," whereas dreaming runs the same internal generative engine decoupled from external error clamping;
2. **REM Sleep Thalamic Gating, Prefrontal Down-Weighting, and Spinal Motor Atonia (J. A. Hobson, E. F. Pace-Schott & R. Stickgold, *Behav. Brain Sci.* **23**, 793–842, 2000)**: During rapid-eye-movement (REM) sleep, thalamic gating attenuates external sensory afferents, dorsolateral prefrontal executive monitoring is metabolically down-regulated, and brainstem pontine circuits actively hyperpolarize spinal motor neurons via glycinergic and GABAergic inhibition (REM motor atonia), suspending peripheral motor output and proprioceptive body-loop feedback while vivid visuospatial and affective experience continues unabated.
:::

Stepping back from neurophysiology into our zero-background self-referential geometry (**`MODEL` (interpretive model)**, alongside the empirical context of [@rem-ch37-predictive-processing-rem-literature]), let us ask the decisive genealogical question: why does a single ordinary bodiless dream shatter naive "vessel materialism" at its root?

If awareness were genuinely secreted by sense organs as a fragile byproduct that cannot exist without a corporeal container, then the instant deep sleep drives the **loading weight of the bodily prior projector $\mathbf{P}_{\mathrm{body}}$ in lookup table $T$ toward zero** (below, $\mathbf{P}_{\mathrm{body}} \to 0$ abbreviates unloading this `MODEL` configuration; the projector itself remains idempotent), observation itself would have to black out alongside its container!

::: {.viz src="dream-decoherence-unpinning" preset="unpin_body" height="500"}
**Unloading the body's anchor: the coherence returns, the weights stay.** The anchors make two blocks, the body x₀ and the other three places, and the anchor strength λ drops from 1 to 0.1: only the magenta squares linking the body to the other three grow back, to 0.9 times their original |ρᵢⱼ|, and the magenta fringes come back on the screen; the cyan squares among the other three were there all along; the cyan diagonal, the weight of each place, never moved. Reading λ as the strength of the “bodily prior” is this book's interpretive model (`MODEL`).
:::

Yet the exact opposite occurs: **the body is forgotten completely, and observation loses not a single lumen of clarity!** Light, perspective, geometry, and affection continue unfolding without eyeballs or limbs. This repeatable nightly experiment exposes two foundational consequences (`MODEL`):

1. **The "body" is not a vessel housing the observer, but a high-weight avatar prior inside table $T$**: During daytime coordination with slow-clock material attractors ([Chapter 33](ch33-all-beings-observers-and-mutual-attractors.md)—ground, air, tools, and fellow beings), lookup table $T$ keeps a high-weight local avatar projector $\mathbf{P}_{\mathrm{body}}$ resident in memory, funneling unbounded pairwise measurement into a meter-scale biological coordinate. At night, when collision-avoidance with tables and staircases is suspended, $\mathbf{P}_{\mathrm{body}}$ unloads—and you discover immediately that the astronaut was never the spacesuit!
2. **Daytime brick and nighttime flight share one rendering engine; only $\psi = \psi(\psi)$ is irreducible**: When our epigraph declares *"everything is in truth a rendering of appearances,"* it preaches not nihilism, but **ontological parity of mechanism**: daytime stone walls are inner-product renderings clamped by $D_{\mathrm{known}} \cup \{\mathbf{P}_{\mathrm{body}}\}$, while nocturnal bodiless vistas are inner-product renderings under relaxed constraints. Every frozen noun-form—including the hands you see when looking down at noon—is a basis-dependent projection; the sole invariant that neither wakes nor sleeps away is the self-referential operator $\psi = \psi(\psi)$ performing the measurement!

---

## 37.4 Beyond the Five-Sense Pinhole: Golden Hyperplane Cuts and Nonlocal Multi-Position Emergence

Once even the physical body is recognized as an unloadable local prior, the last spatial superstition gives way as well: **does the observer truly "live inside a few cubic centimeters behind the brow at a single point $\mathbf{x}_0$"?**

Consider why waking consciousness feels nailed to one coordinate $\mathbf{x}_0$: two retinal pinholes six centimeters apart triangulate a single optical origin, two ears compute microsecond interaural delays around a single head center, and a closed cutaneous sheet draws a sharp inside/outside boundary. In our geometric observer model (`MODEL`), **the five senses do not bestow perception upon the observer; they prune and localize it!** They act like an opaque card pierced by one tiny pinhole $\mathbf{x}_0$ held in front of a luminous screen—the pinhole sharpens one forward ray, while tricking you into believing that you *are* the pinhole.

Remove that five-sense card in bodiless deep dreams or pure geometric contemplation ($\mathbf{P}_{\mathrm{body}} \to 0$), and what spatial profile emerges? Exactly what our epigraph reports: **"We discover that the observer actually emerges across multiple positions rather than being confined to direct five-sense perception..."**—in a dream you simultaneously behold the valley from the ridge and move as the wind among the pines below; you stand inside a childhood window looking out while simultaneously standing beneath the streetlamp across the lane looking back!

Is such simultaneous multi-position emergence mere poetic metaphor? Not in the least! Recall the **cut-and-project model-set observer geometry** of [Chapter 32](ch32-unified-field-and-meta-unification.md) and [Chapter 34](ch34-orthogonality-degeneracy-and-observer-position.md): an observer's internal state is not an isolated point on the physical line $E_\parallel = \mathbb{R}$, but a compact **golden acceptance window `goldenWindow`** in conjugate internal space $E_\perp = \mathbb{R}$! When the higher-dimensional golden lattice $\mathbb{Z}[\varphi] \hookrightarrow \mathbb{R} \times \mathbb{R}$ is sliced by that internal window, every lattice point whose conjugate coordinate falls inside the window lights up on $E_\parallel$ **at once**.

In `trureturing`'s golden model-set and Fourier Delone modules, two kernel theorems prove first that all canonical natural-number Zeckendorf golden expansions embed inside the golden cut-and-project set, and second that the complete bi-infinite golden window carrier forms a certified **Mathlib `DeloneSet ℝ`** with explicit packing radius $1/2$ (minimum node separation $\ge 1$) and explicit covering radius $3$ (every real coordinate $x \in \mathbb{R}$ lies within distance at most $3$ of an active cut-and-project node):

::: {.theorem #thm-ch37-golden-cut-delone-multilocation title="Golden Cut-and-Project Inclusion and Explicit Bi-Infinite Delone Radii Certificate" lean="D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone"}
Across the frozen golden cut-and-project and Fourier Delone-certificate modules of `trureturing`, write $\varphi = \mathrm{Real.goldenRatio} = \frac{1+\sqrt{5}}{2}$, let $\mathrm{GoldenInt}$ denote $\mathbb{Z}[\varphi]$ ($a + b\varphi$ with $a, b \in \mathbb{Z}$), let $\operatorname{embedding}(a + b\varphi) = a + b\varphi \in \mathbb{R}$, let $\operatorname{conj}(a + b\varphi) = (a + b) - b\varphi$, let $\operatorname{minkowskiEmbedding}(x) = (\operatorname{embedding}(x), \operatorname{embedding}(\operatorname{conj}(x))) \in \mathbb{R} \times \mathbb{R}$ with additive range `goldenLattice`, and define the compact conjugate acceptance window

$$
\mathrm{goldenWindow} \;:=\; \left[-\frac{1}{\varphi^2},\; \frac{1}{\varphi}\right] \;=\; [\varphi - 2,\; \varphi - 1] \;\subset\; \mathbb{R}.
$$

The following two cut-and-project selection and global Delone uniformity theorems hold simultaneously:

1. **Cut-and-Project Inclusion of Canonical Natural-Number Golden Expansions** ([`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)): Writing $\mathrm{goldenModelSet} = \operatorname{Set.range}(\mathrm{betaGolden}) \subseteq \mathrm{GoldenInt}$ for all canonical natural-number golden-expansion values and $\mathrm{goldenCutAndProjectSet} = \{y \in \mathbb{R} \mid \exists\,\mathrm{point} \in \mathrm{goldenLattice},\; \mathrm{point}.1 = y \land \mathrm{point}.2 \in \mathrm{goldenWindow}\}$, every embedded value of `goldenModelSet` belongs to `goldenCutAndProjectSet`:

   $$
   \operatorname{embedding} '' \mathrm{goldenModelSet} \;\subseteq\; \mathrm{goldenCutAndProjectSet};
   $$

2. **Certified Delone Packing and Covering Radii of the Complete Golden Model Set** ([`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)): Over the bi-infinite cut-and-project carrier $\operatorname{modelSet}(\mathrm{goldenWindow}) = \{y \in \mathbb{R} \mid \exists x \in \mathrm{GoldenInt},\; \operatorname{embedding}(x) = y \land \operatorname{embedding}(\operatorname{conj}(x)) \in \mathrm{goldenWindow}\}$, there exists a verified Mathlib Delone set $D : \operatorname{Delone.DeloneSet}\;\mathbb{R}$ with exact carrier, uniform packing radius $1/2$, and uniform covering radius $3$:

   $$
   \begin{aligned}
   &\exists\, D : \operatorname{Delone.DeloneSet}\;\mathbb{R}, \\
    &D.\mathrm{carrier} = \operatorname{modelSet}(\mathrm{goldenWindow}) \\
    &\;\land\; D.\mathrm{packingRadius} = \bigl(\tfrac{1}{2} : \mathbb{R}_{\ge 0}\bigr) \\
    &\;\land\; D.\mathrm{coveringRadius} = \bigl(3 : \mathbb{R}_{\ge 0}\bigr)
   \end{aligned}
   $$

   (where packing radius $1/2$ encodes uniform node separation $\forall x \neq y \in \operatorname{modelSet}(\mathrm{goldenWindow}),\; \operatorname{dist}(x, y) \ge 1$, and covering radius $3$ encodes uniform relative density $\forall x \in \mathbb{R},\; \exists y \in \operatorname{modelSet}(\mathrm{goldenWindow}),\; \operatorname{dist}(x, y) \le 3$).
:::

::: proof
For Conjunct 1, any $y \in \operatorname{embedding} '' \mathrm{goldenModelSet}$ has a witness $v \in \mathbb{N}$ with $y = \operatorname{embedding}(\operatorname{betaGolden}(v))$; taking $\operatorname{minkowskiEmbedding}(\operatorname{betaGolden}(v)) \in \mathrm{goldenLattice}$ gives physical first coordinate $y$ and internal second coordinate $\operatorname{betaContraction}(v)$, which lies in $[-\varphi^{-2}, \varphi^{-1}]$ by `betaContraction_mem_window` and `Real.inv_goldenRatio`. For Conjunct 2, `goldenWindow_eq` rewrites $[-\varphi^{-2}, \varphi^{-1}] = [\varphi - 2, \varphi - 1]$ (width $1$) via $\varphi^{-1} = \varphi - 1$ and $\varphi^2 = \varphi + 1$; for distinct $u \neq v \in \mathrm{GoldenInt}$, integral norm integrality gives $\lvert\operatorname{norm}(u - v)\rvert = \lvert\operatorname{embedding}(u - v)\rvert \cdot \lvert\operatorname{embedding}(\operatorname{conj}(u - v))\rvert \ge 1$ while window membership bounds the conjugate difference above by $1$, forcing $\operatorname{dist}(x, y) \ge 1$ and certifying packing radius $1/2$; for arbitrary $x \in \mathbb{R}$, setting $q = 2\varphi - 1 > 0$ and choosing explicit floor coordinates $b = \lfloor x / q\rfloor$ and $a = \lfloor \varphi - 1 - b(1 - \varphi)\rfloor$ produces $u = \langle a, b\rangle \in \mathrm{GoldenInt}$ with $\operatorname{embedding}(\operatorname{conj}(u)) \in [\varphi - 2, \varphi - 1]$ and $\lvert x - \operatorname{embedding}(u)\rvert \le 3$ (using $\varphi < 2$), packaged via `goldenModelSetCertificate.toDeloneSet`. The full proof is checked by the Lean kernel.
:::

Contemplate what [@thm-ch37-golden-cut-delone-multilocation] reveals for our observer ontology (`MODEL` (interpretive model)). We can verify right by hand how a single internal window $\mathrm{goldenWindow} = [\varphi - 2, \varphi - 1] \approx [-0.3820, +0.6180]$ activates multiple separated positions along $\mathbb{R}$ simultaneously (for $u = \langle a, b\rangle \in \mathrm{GoldenInt}$, the physical embedding is $a + b\varphi$ and the conjugate coordinate is $a + b(1 - \varphi)$):

- For $u_{-2} = \langle -1, -1\rangle$ and $u_{-1} = \langle 0, -1\rangle$: the conjugate coordinates are $-1 - (1 - \varphi) = \varphi - 2$ (the exact left window endpoint) and $-(1 - \varphi) = \varphi - 1$ (the exact right window endpoint), lighting up negative-axis positions $y_{-2} = -1 - \varphi \approx -2.6180$ and $y_{-1} = -\varphi \approx -1.6180$ and realizing the sharp unit spacing $y_{-1} - y_{-2} = 1 \ge 1$;
- For $u_0 = \langle 0, 0\rangle$: the conjugate coordinate is $0 \in [\varphi - 2, \varphi - 1]$, lighting up physical position $y_0 = 0$ (spacing $y_0 - y_{-1} = \varphi \approx 1.6180 \ge 1$);
- For $u_1 = \langle 1, 1\rangle$ and $u_2 = \langle 1, 2\rangle$: the conjugate coordinates are $2 - \varphi \approx +0.3820 \in [\varphi - 2, \varphi - 1]$ and $3 - 2\varphi \approx -0.2361 \in [\varphi - 2, \varphi - 1]$, lighting up $y_1 = 1 + \varphi = \varphi^2 \approx 2.6180$ and $y_2 = 1 + 2\varphi \approx 4.2361$ (whereas the intermediate candidate $\langle 0, 1\rangle \mapsto \varphi \approx 1.6180$ has conjugate $1 - \varphi \approx -0.6180 < \varphi - 2$ outside the window and is filtered out, leaving adjacent gaps $y_1 - y_0 = \varphi^2 \approx 2.6180 \le 6$ and $y_2 - y_1 = \varphi \approx 1.6180 \ge 1$ strictly within the packing radius $1/2$ and covering radius $3$ bounds).

::: {.figure src="ch37-golden-cut"}
**One window of width $1$ lights a whole row of separated places on the real line at once.** Above are the golden lattice points $\langle a, b\rangle$, with the physical coordinate $a + b\varphi$ across and the conjugate coordinate $a + b(1 - \varphi)$ up; the cyan horizontal strip is $\mathrm{goldenWindow} = [\varphi - 2, \varphi - 1]$. The five cyan lattice points in the strip drop along dashed lines onto the real line $E_\parallel$ below and light $y_{-2}, y_{-1}, y_0, y_1, y_2$, neighbours at least $1$ apart; $\langle 0, 1\rangle$ lies below the strip, and its place $\varphi$ on the real line is crossed out. These are the five points counted by hand above; the whole real line is the content of [@thm-ch37-golden-cut-delone-multilocation], item 2.
:::

Thus the physical slice $\operatorname{modelSet}(\mathrm{goldenWindow})$ cut out by a single internal window **is never an isolated point—it is a Delone cut-and-project constellation spanning the entire real line $\mathbb{R}$ with minimum spacing $1$ (packing radius $1/2$) and maximum covering radius $3$!** (For additional external literature context, see [@rem-ch37-dream-eraser-synthesis-table] below.) Daytime five-sense gating restricts readout to the single node nearest $\mathbf{x}_0$; when deep sleep unloads $\mathbf{P}_{\mathrm{body}}$ and local chronological guards, multiple compatible cut-points $\{\mathbf{x}_1, \mathbf{x}_2, \dots, \mathbf{x}_K\}$ across the same internal window illuminate awareness simultaneously.

::: {.viz src="dream-decoherence-unpinning" preset="wake_snap" height="500"}
**Waking: the readout keeps only the body cell.** The dream state (λ = 0.1) has weight on all four places, bound together by coherence; the readout projection P₀ = |x₀⟩⟨x₀| (amber frame) keeps only the body cell x₀, the weight of the other three places fades out with all the coherence, and the forgotten weight is 1 − Tr(P₀ρ) = 0.60. This is a model (`MODEL`), not the cut-and-project star net itself.
:::

We consolidate waking five-sense lock, shallow nocturnal erasure, and bodiless deep-dream awareness under our **`MODEL` (interpretive model)** in the boxed three-regime ledger below:

::: {.remark #rem-ch37-dream-eraser-synthesis-table title="Three-Regime Synthesis Table of Waking Lock, Dream Erasure, and Nonlocal Emergence (Literature Results Set Against This Book's Model)"}
**Synthesis table: literature results are not formalized in this book, interpretations are `MODEL`, formal theorems are marked `LEAN ✓`.** The table below synthesizes Gram-elliptope ([Chapter 29](ch29-timeless-causality-and-gram-space.md#sec-coda-finite-observer-time-field) [@thm-ch29-gram-rigidity-and-pell]), cut-and-project quasicrystal aperiodicity (M. Baake & U. Grimm, *Aperiodic Order, Vol. 1*, Cambridge Univ. Press, 2013), quantum-eraser, and predictive-processing literature alongside our `MODEL` and formal decoherence-reversal and golden Delone theorems (`LEAN ✓`):

| Regime of Awareness (`MODEL`) | Known-Data Anchors & Bodily Prior | Gram Volume & Off-Diagonal Coherence Fate | Spatial Addressing & Observer Localization | Phenomenological Vista & Ontological Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **1. Waking Five-Sense State (Strong Decoherence Lock)** | Full known-data family $D_{\mathrm{known}}$ active; bodily prior $\mathbf{P}_{\mathrm{body}}$ has loading weight near $1$ | Narrow compatibility volume (e.g., $3\times 3$ example $\det G_3 = 0.104$); off-diagonal $\sin\theta$ branches continually pinched to zero with nonnegative relative-entropy tax | Five-sense pinhole locks readout onto a single local coordinate $\mathbf{x}_0$ | Rigid, continuous, publicly checkable physical rail, while counterfactual branches hide in the $90^\circ$ blind zone |
| **2. Shallow Dream Erasure (Partial Memory Forgetting)** | Suspends $\Delta M$ spatiotemporal and chronological constraints and applies coherent conjugation to local record copies | The retained principal minor in this example does not decrease ($\det G_2 \ge \det G_3$; strictly under the stated coupling conditions, e.g., to $0.360$); suppressed off-diagonal coherence restores under joint reversal | Oblique cross-layer addressing across eras and places sharing internal phase | Redeems counterfactual branches missed by daytime choice, while any unreversed copy leaves residual phase twist |
| **3. Bodiless Deep Dream & Pure Awareness (Bodily Prior Zeroed)** | Bodily prior zeroed ($\mathbf{P}_{\mathrm{body}} \to 0$) and five-sense local throttle removed, retaining self-referential core $\psi = \psi(\psi)$ | Frees the observer from single-step avatar pinching overhead, aligning the internal acceptance window directly with the global lattice | Nonlocal simultaneous emergence across multiple positions $\{\mathbf{x}_1, \dots, \mathbf{x}_K\}$ along the golden cut-and-project Delone quasicrystal carrier (packing radius $1/2$, covering radius $3$) | Falsifies vessel materialism: waking and dreaming appearances alike are projection-mask inner-product renderings, while self-referential measurement alone shines undiminished |

Panel I of Figure 37 depicts unread pinching, with a single-line experience requiring outcome conditioning; Panel III uses $P_{\mathrm{body}} \to 0$ as shorthand for zero loading weight. The strict positive sign in the Gram-window figure after [@ex-ch37-gram-constraint-release] belongs to the coupled numerical example $0.104 \to 0.360$; the general difference is nonnegative.
:::

Stepping down the three rows of [@rem-ch37-dream-eraser-synthesis-table], the three scenes of Figure 37, panels I, II and III, dissolves the ancient opposition between noon and midnight: waking perception is not the sole reality, only a high-magnification narrow-aperture visor worn to place crisp moves among slow-clock material attractors; dreaming is not neural noise, but a nightly quantum erasure that lifts the visor and unbuckles the bodily armor—letting finite awareness revisit unwalked orthogonal paths and verify firsthand that even without a body, across every Delone cut-and-project node, the seeing, feeling, self-referential observer shines undiminished.

::: {.viz src="dream-decoherence-unpinning" height="620"}
**The dream-erasure lab.** Three scenes on one density-matrix grid and one screen: Anchors (the decoherence interpolation ρ(λ)), Records (writing and jointly reversing multi-copy phase records) and Waking (the readout projection and the forgotten weight). Green is reserved for the theorems this chapter cites with `lean=`; the screen, the places and the readings “dream” and “waking” are a model chosen for the picture.
:::

Before carrying this picture of address-mask switching on a single static lattice into the hardware architecture of the next chapter, the record-pinching and sleep-gating algebra assembled across §§37.1–37.4 unlocks one more haunting riddle of everyday conscious experience right on the spot: why does a waking observer occasionally step into an unfamiliar crossroads and feel an unmistakable jolt of déjà vu—"I have seen this exact scene before in a dream"?

---

## 37.5 Choosing Rather Than Seeing the Future: Dream Pre-Decoherence and the Déjà Vu Cache Hit {#sec-ch37-dream-pre-decoherence-deja-vu}

Having traversed the four-stage arc from waking known-data pinching (§37.1) and shallow nocturnal phase erasure (§37.2) to bodiless deep dreams and nonlocal golden cut-and-project emergence (§37.3–§37.4), we are ready to resolve one of the most haunting and widely mystified riddles of everyday conscious life: **why does a waking observer occasionally step into an unfamiliar moment and get struck by an unmistakable, crystal-clear jolt of déjà vu—"I have lived this exact scene before in a dream"?**

Traditional accounts have long oscillated between two unsatisfying extremes: at one pole stands fatalistic superstition, imagining the future as a pre-printed reel of film waiting up ahead while the sleeping mind sneaks down the corridor to peek at tomorrow's script; at the opposite pole stands dismissive reductionism, writing off every such flash of familiarity as a random synaptic misfire. Grounded in timeless Gram compatibility ([Chapter 29](ch29-timeless-causality-and-gram-space.md#sec-coda-finite-observer-time-field)), open orthogonal rank expansion ([Chapter 31 §31.4](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)), and the record-pinching algebra of this chapter, we advance the following core proposition (recorded verbatim in [Appendix A](appendix-a.md#sec-appendix-a-verbatim-ledger), `A73`):

> *"In truth, the observer does not see the future; rather, the observer chooses the future, and déjà vu arises because antecedent logic has already decohered in a dream."*

In three compact clauses, this proposition overturns fatalistic peeking in favor of active basis selection and speculative pre-compilation. Under our strict epistemic contract, the cross-domain synthesis uniting operator algebra, concept-escape dynamics, computer architecture, and cognitive neuropsychology is designated throughout this section as our interpretive sandtable **`MODEL` (interpretive model, codename `ORTHO//DEJAVU`)**: its structural backbone—unit orthogonal residual escape, the finite-dimensional observable Krylov rank-growth bound, contextual fixed-point bifurcation, the six orthogonal-complement projection identities, positive-operator Gram realizability, unique-capture information-escape criteria, and noncommutativity of conflict-reset revision—rests on frozen Lean 4 kernel theorems in `trureturing@dev` (`LEAN ✓`); the zero-additional-entropy specialization under repeated same-basis pinching, the three-vector Gram determinant interval, and the single-qubit Bloch pinching formulas are marked as **manual derivations**; delayed-choice interferometry, microprocessor branch prediction and pipeline flushing, the quasicrystal Empire Effect, and dual-processing/metacognitive accounts of déjà vu reside strictly inside attributed **Literature** remarks; and specific matrix entries, binary entropies, and finite lattice-box counts are marked as **numerical evaluations (`NUM`)**. Let us trace the four links of this chain in order.

### 37.5.1 Dismantling the "Precognition" Myth: Open Orthogonal Residual Cones, Delayed Basis Selection, and "Choosing the Future" {#sec-ch37-p2g-open-choice}

Why is "peeking at a uniquely pre-ordained future" geometrically ill-posed from the outset? Because fatalism quietly assumes that the finite subspace slice $S$ currently held by a bounded observer has already sealed every degree of freedom of the cosmos inside a closed iron box, leaving zero unresolved orthogonal residual outside.

In `trureturing`'s quantum-algebra, observable-Krylov, and interpretation-fixed-point modules, four kernel theorems jointly establish the exact opposite: whenever the currently observed closed subspace $S \subset V$ has not exhausted the ambient space ($S^\perp \neq \{0\}$), there necessarily exists a unit escape vector orthogonal to $S$ at unit distance from $S$ whose projection onto $S$ vanishes; inside any fixed finite-dimensional ambient space $V$, the number of strict rank-growth steps generated by a fixed linear evolution $T$ and readout map $C$ is capped by the co-rank $\dim V - \operatorname{rank} C$; and under the exact same underlying text and interpretation rule, switching admissibility, background, and evaluation-goal context parameters locks onto strictly distinct self-consistent fixed points (cf. [Chapter 33](ch33-all-beings-observers-and-mutual-attractors.md) [@thm-ch33-contextual-attractor-and-common-factor]):

::: {.theorem #thm-ch37-p2g-open-escape-and-krylov title="Unit Orthogonal Escape from Proper Closed Subspaces, Finite-Dimensional Observable Krylov Strict-Growth Bound, Contextual Fixed-Point Bifurcation, and Six Orthogonal-Complement Projection Identities" lean="D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities"}
Across the frozen quantum-projection-escape, observer-memory Krylov dynamics, interpretation fixed-point, and orthogonal-complement modules of `trureturing`, the following four theorems hold simultaneously:

1. **Existence of a Unit Escape Vector Under Nonzero Orthogonal Residual** ([`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)): Let $\mathbb{K}$ be $\mathbb{R}$ or $\mathbb{C}$ (`[RCLike 𝕜]`), let $V$ be a complete inner-product space over $\mathbb{K}$, let $S \le V$ be a closed subspace (`[IsClosed (S : Set V)]`), and write $P_S := S.\mathrm{starProjection}$ for the bounded orthogonal projection onto $S$. **If** the orthogonal complement is nontrivial ($S^\perp \neq \bot$), there exists a unit escape vector $e \in V$ satisfying simultaneously:

   $$
   e \in S^\perp \;\land\; \lVert e\rVert = 1 \;\land\; P_S e = 0 \;\land\; \operatorname{infDist}(e, S) = 1 \;\land\; \lVert \mathrm{id}_V - P_S\rVert = 1;
   $$

2. **Strict Rank-Growth Step Bound for Finite-Dimensional Observable Krylov Chains** ([`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound)): Let $V, Y$ be finite-dimensional inner-product spaces over $\mathbb{K}$, let $T : V \to_{\mathbb{K}} V$ and $C : V \to_{\mathbb{K}} Y$ be $\mathbb{K}$-linear maps, and define the $m$-th observable Krylov subspace $O_m := \operatorname{observableKrylov}(T, C, m) = \operatorname{span}\{(T^*)^k C^* y \mid 0 \le k \le m,\; y \in Y\}$. Then the extended cardinality (`Set.encard`) of steps at which the subspace strictly expands is bounded above by the output co-rank:

   $$
   \operatorname{Set.encard}\{m \in \mathbb{N} \mid O_m < O_{m+1}\} \;\le\; \bigl(\operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C) : \mathbb{N}\bigr);
   $$

3. **Explicit Witness Selecting Distinct Fixed-Point Meanings Under Identical Rules** ([`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)): On `BinaryInterpretationContext`, the explicitly defined `baselineContext` and `alternateContext` share the exact same underlying `text` and `interpretationRule`, while differing in `readerAdmission`, `background`, and `evaluationGoal`; they admit unique binary fixed-point meanings $(0, 0, 0)$ (i.e., `(false, false, false)`) and $(1, 1, 1)$ (i.e., `(true, true, true)`), respectively, with $(0, 0, 0) \neq (1, 1, 1)$;

4. **Complete Six-Identity Algebra of Closed-Subspace and Orthogonal-Complement Projections** ([`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)): Let $E$ be a complete inner-product space over $\mathbb{K}$, let $M \le E$ be a closed subspace, and write $P := M.\mathrm{starProjection}$ and $Q := M^\perp.\mathrm{starProjection}$ as continuous linear maps. Then all six operator identities hold simultaneously:

   $$
   Q = \mathrm{id}_E - P, \quad P \circ_L P = P, \quad Q \circ_L Q = Q, \quad P \circ_L Q = 0, \quad Q \circ_L P = 0, \quad P + Q = \mathrm{id}_E.
   $$
:::

::: proof
For Conjunct 1, $S^\perp \neq \bot$ supplies a nonzero vector $v \in S^\perp$; normalizing $e = \lVert v\rVert^{-1} v \in S^\perp$ yields $\lVert e\rVert = 1$ and $P_S e = 0$. For every $s \in S$, orthogonality gives the Pythagorean expansion $\lVert e - s\rVert^2 = \lVert e\rVert^2 + \lVert s\rVert^2 = 1 + \lVert s\rVert^2 \ge 1$ with equality at $s = 0 \in S$, establishing $\operatorname{infDist}(e, S) = 1$; since $\mathrm{id}_V - P_S = P_{S^\perp}$ is contractive everywhere and attains norm $1$ at $e$, $\lVert \mathrm{id}_V - P_S\rVert = 1$. Conjunct 2 tracks finite-dimensional rank along the monotone chain $O_0 \le O_1 \le \cdots \le V$: $O_0 = \operatorname{range}(C^*)$ has dimension $\operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$, each strict inclusion $O_m < O_{m+1}$ raises $\operatorname{finrank}$ by at least $1$, and no term exceeds $\operatorname{finrank}_{\mathbb{K}} V$, bounding the strict-growth index set by $\operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$. Conjunct 3 unfolds the two explicit binary context records and checks all eight componentwise conjuncts of `IsBinaryFixedMeaning`. Conjunct 4 uses the orthogonal decomposition $x = Px + Qx$ on a complete inner-product space to obtain $P + Q = \mathrm{id}_E$ and $Q = \mathrm{id}_E - P$, while range membership $Px \in M$, $Qx \in M^\perp$ and kernel inclusions $M^\perp \subseteq \ker P$, $M \subseteq \ker Q$ yield both idempotence laws and both mutual-annihilation identities. The full proof is checked by the Lean kernel.
:::

Note the exact formal scope of [@thm-ch37-p2g-open-escape-and-krylov]: Conjunct 1 is an existence statement conditioned on $S^\perp \neq \bot$—it neither furnishes a constructive escape algorithm nor claims unbounded growth inside a fixed finite-dimensional space; Conjunct 2 proves that inside any fixed finite-dimensional $V$ observable Krylov rank growth must eventually saturate, so the open dimension expansion $D \to D + 1$ of [Chapter 31 §31.4](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion) requires enlarging the ambient carrier (`MODEL`); and Conjunct 3 exhibits fixed-point selection on concrete Boolean interpretation contexts, whose mapping onto quantum measurement-basis selection serves as our `MODEL` bridge.

On a single-qubit blackboard, that basis-selection contrast can be audited in two lines (**manual derivation, not formalized as a standalone statement in this book**; decimals `NUM`). Fix a single undisturbed pure input state $\lvert\psi_\theta\rangle = (\cos\theta, \sin\theta)^T$ at the default tilt $\theta = \pi/6$, with Bloch vector $\mathbf{r} = (\sin 2\theta, 0, \cos 2\theta) = (\frac{\sqrt{3}}{2}, 0, \frac{1}{2})$. No single pre-written outcome sits inside $\lvert\psi_\theta\rangle$; the realized Born statistics depend on which measurement axis $\mathbf{n}_\beta = (\sin\beta, 0, \cos\beta)$ the observer selects to form complementary orthogonal projectors $Q_\pm(\beta) = \frac{1}{2}(I \pm \mathbf{n}_\beta\cdot\boldsymbol{\sigma})$ (satisfying Conjunct 4's $Q_+ + Q_- = I$, $Q_\pm^2 = Q_\pm$, and $Q_+ Q_- = 0$):

- Selecting the computational axis $\beta = 0$ ($\mathbf{n}_0 = (0, 0, 1)$) yields positive-branch weight $p_+(0) = \frac{1 + \mathbf{r}\cdot\mathbf{n}_0}{2} = \frac{3}{4} = 0.75$;
- Switching on the exact same input state to the transverse axis $\beta = \pi/2$ ($\mathbf{n}_{\pi/2} = (1, 0, 0)$) shifts the positive-branch weight to $p_+(\pi/2) = \frac{1 + \sqrt{3}/2}{2} = \frac{2 + \sqrt{3}}{4} \approx 0.933013$!

Alongside this qubit selector, an auxiliary three-dimensional Euclidean inset $V = \mathbb{R}^3$ illustrates Conjuncts 1 and 2 concretely: relative to the observed plane $S = \operatorname{span}(e_1, e_2)$, the normal axis $e = e_3 \in S^\perp$ satisfies $P_S e_3 = 0$ and $\lVert e_3\rVert = \operatorname{dist}(e_3, S) = \lVert I - P_S\rVert = 1$; under the cyclic shift $T(e_1) = e_2,\; T(e_2) = e_3,\; T(e_3) = e_1$ and first-coordinate readout $C(v) = v_1$, the observable Krylov chain $O_0 = \operatorname{span}(e_1)$, $O_1 = \operatorname{span}(e_1, e_3)$, $O_2 = \mathbb{R}^3$ climbs in dimension $1 \to 2 \to 3$, exhausting exactly $2 = 3 - \operatorname{rank} C$ strict growth steps before saturating.

::: {.viz src="dream-pre-decoherence-deja-vu" preset="choose-context" height="500"}
**Basis selection rather than peeking: one input state yields distinct weights under two rulers.** Holding the pure input fixed at $\theta = \pi/6$ while rotating the measurement axis from $\beta = 0$ to the amber active choice $\beta = \pi/2$ shifts the positive readout weight from $0.75$ to $(2 + \sqrt{3})/4 \approx 0.9330$; the companion 3D inset displays the unit orthogonal escape axis $e_3 \in S^\perp$ and the Krylov rank climb $1 \to 2 \to 3$ ([@thm-ch37-p2g-open-escape-and-krylov]). Reading basis choice as selecting a future cross-section is this chapter's interpretive model (`MODEL`).
:::

In foundational quantum physics, the classic archetype showing that a late experimental choice determines which mutually exclusive statistical question becomes well-defined—without backward-in-time signaling or fatalistic peeking—is Wheeler's delayed-choice thought experiment (complementing §37.2 [@rem-ch37-quantum-eraser-literature]):

::: {.remark #rem-ch37-p2g-wheeler-delayed-choice-literature title="Wheeler's Delayed-Choice Double-Slit Thought Experiment and the Non-Retrocausal Basis-Selection Boundary (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** John Archibald Wheeler showed in his landmark essay (J. A. Wheeler, "The 'Past' and the 'Delayed-Choice' Double-Slit Experiment," in *Mathematical Foundations of Quantum Theory*, ed. A. R. Marlow, Academic Press, 1978, pp. 9–48, DOI: `10.1016/B978-0-12-473250-6.50006-6`) that inside a Mach–Zehnder interferometer, even after an incoming quantum has already passed the first beam splitter, the experimenter may wait until the last instant before detection to choose whether to omit the second beam splitter (registering which-path counts) or insert it (registering two-path relative-phase interference). That late apparatus choice determines **which incompatible experimental arrangement and statistical distribution is realized**; it neither transmits controllable superluminal signals into the past nor implies that the observer peeked at a pre-existing classical trajectory.
:::

Equally decisive is the reversibility boundary proved in §37.2's multi-copy record-erasure theorem ([@thm-ch37-joint-coherent-record-erasure]: [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal) and [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)). On the equal superposition $\theta = \pi/4$ with initial off-diagonal coherence $\rho_{01} = 1/2$, writing two unimodular phase records of overlap $\gamma = -i$ ($\lvert\gamma\rvert^2 = 1$) drives the complex coherence phasor along the exact discrete four-stage trajectory `1/2 → -1/2 → -i/2 → 1/2`: reversing a single copy halts halfway at $-i/2$, whereas reversing the full two-copy family restores $1/2$. Yet the instant an environment writes orthogonal which-path records with zero overlap ($\gamma = 0$, violating unimodularity $\lvert\gamma\rvert^2 = 1$), or once local pinching has already sheared off-diagonal entries to zero, applying conjugated local phase records cannot resurrect erased coherence out of thin air. Keeping that algebraic boundary sharp sets the stage for how antecedent logic pre-decoheres in sleep.

::: {.viz src="dream-pre-decoherence-deja-vu" preset="unimodular-reversal" height="500"}
**Four-stage unimodular phase reversal versus the zero-overlap barrier.** At $\theta = \pi/4$, two phase records of overlap $-i$ rotate $\rho_{01}$ from $1/2$ to $-1/2$; reversing one copy stops at $-i/2$, while reversing both together restores $1/2$ ([@thm-ch37-joint-coherent-record-erasure]). Switching to zero-overlap path marking breaks unimodularity, barring local conjugate recovery.
:::

### 37.5.2 How Antecedent Logic Pre-Decoheres in Dreams: Sensory-Gating Offload and Speculative Idempotent Pre-Compilation {#sec-ch37-p2g-dream-precompile}

If the dreaming mind is not "peeking at tomorrow," what operator-algebraic and architectural operation *is* denoted by the clause **"antecedent logic has already decohered in a dream"**?

Recall the waking pinching equations of §37.1 ([@thm-ch37-known-data-pinching-and-entropy-tax]: [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), and [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)), taking care to distinguish **projector idempotence of an individual measurement branch** $Q_\pm(\beta)^2 = Q_\pm(\beta)$ ([@thm-ch37-p2g-open-escape-and-krylov], Conjunct 4) from **channel-composition idempotence of complete unread pinching** $\Pi_\beta \circ \Pi_\beta = \Pi_\beta$ ([`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)). During waking hours, torrents of real-time peripheral sensory prediction error force the observer to spend its online compute budget pinning bodily coordinates step after step, continually paying nonnegative coherence-deletion entropy taxes.

At night, when thalamic sensory gating attenuates peripheral input and REM motor atonia suspends bodily execution (see §37.3 [@rem-ch37-predictive-processing-rem-literature]), our **`MODEL` (interpretive model)** proposes that the observer does not power down—instead, freed from high-latency external I/O interrupts, **antecedent logic** already assembled during prior waking life (unfinished causal deductions, deep goal tilts, and interpersonal structural priors, encoded by a preferred measurement axis $\mathbf{n}_\beta$) acts like a **branch predictor and speculative execution engine** in a modern superscalar processor, running a complete unread pinching pass ahead of time in the nocturnal sandtable to pre-compile the branching superposition $\rho_{\mathrm{in}}$ into the block-diagonal fixed point $\sigma_{\mathrm{dream}} = \Pi_\beta(\rho_{\mathrm{in}})$! The computer-architecture standards motivating this analogy—and their strict hardware boundaries—are summarized below:

::: {.remark #rem-ch37-p2g-speculative-execution-literature title="Microprocessor Branch Prediction, Speculative Pipeline Flushing, and TLB Address–Context Tag Specifications (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** When this section maps nocturnal logical pre-decoherence, post-dream invalidation, and déjà vu cache hits onto architectural primitives (`MODEL`), the underlying hardware concepts derive from standard computer-architecture references and claim no established physical identity between silicon caches, biological neurons, and quantum von Neumann entropy:

1. **Branch Prediction, Speculative Execution, and Pipeline Flushing on Misprediction (J. L. Hennessy & D. A. Patterson, *Computer Architecture: A Quantitative Approach*, 6th ed., Morgan Kaufmann, 2017, chapters on instruction-level parallelism and hardware-based speculation)**: Before a conditional branch condition resolves from slower memory, an out-of-order superscalar processor uses historical branch predictors to select a likely path and speculatively executes downstream instructions into a reorder buffer; if the branch condition confirms the prediction, pre-computed results commit without re-execution overhead, whereas a misprediction immediately triggers a **pipeline flush (squash)** that invalidates speculative entries and restarts execution along the corrected path;
2. **Translation Lookaside Buffer (TLB) Virtual-Page Address Tags and Process-Context Identifiers (Intel *64 and IA-32 Architectures Software Developer's Manual*, Vol. 3A: *System Programming Guide*, sections on "Translation Lookaside Buffers (TLBs)" and "Process-Context Identifiers (PCIDs)")**: Taking nonglobal TLB entries with PCID enabled as an example, a hit requires matching the **virtual-page number (`Address_Tag`)** and **current PCID**, beyond merely having `Valid = 1`. Global TLB entries may be used across PCIDs; the tag rules of other caches depend on the architecture. Accordingly, in the sandtable schema of §37.5.4, an absent episodic timestamp (`Time_Tag = NULL`) never means tagless lookup: the model still verifies `Address_Tag` and `Context_Version`, while only the explicit chronological timestamp metadata field is left null.
:::

Let us compute the exact single-qubit ledger of this nocturnal first pre-compilation alongside subsequent same-axis re-measurement and upgraded-axis re-pinching (**manual derivation, not formalized as a standalone statement in this book**; decimals `NUM`). For any real-tilt pure state $\lvert\psi_\theta\rangle = (\cos\theta, \sin\theta)^T$ ($0 \le \theta \le \pi/2$) and chosen logical axis $\mathbf{n}_\beta = (\sin\beta, 0, \cos\beta)$ ($0 \le \beta < \pi$), the complete unread pinching channel is

$$
\Pi_\beta(\rho) \;=\; Q_+(\beta)\,\rho\,Q_+(\beta) + Q_-(\beta)\,\rho\,Q_-(\beta) \;=\; \frac{1}{2}\Bigl(I + (\mathbf{r}\cdot\mathbf{n}_\beta)\,\mathbf{n}_\beta\cdot\boldsymbol{\sigma}\Bigr),
$$

retaining the trace-preserving sum of *both* orthogonal branches $Q_+$ and $Q_-$ (so $\Pi_\beta \circ \Pi_\beta = \Pi_\beta$, never substituting an unnormalized single branch $Q_+\rho Q_+$). At the default tilt $\theta = \pi/6$ and dream logical basis $\beta = 0$:

$$
\rho_{\mathrm{in}} = \begin{pmatrix} 3/4 & \sqrt{3}/4 \\ \sqrt{3}/4 & 1/4 \end{pmatrix} \quad\xrightarrow{\;\Pi_0\;}\quad \sigma_{\mathrm{dream}} = \Pi_0(\rho_{\mathrm{in}}) = \begin{pmatrix} 3/4 & 0 \\ 0 & 1/4 \end{pmatrix}.
$$

At the moment nocturnal pre-compilation shears away the two off-diagonal coherences, each $\sqrt{3}/4$, [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass) certifies that the discarded Hilbert–Schmidt squared coherence mass equals $\operatorname{Tr}((\rho_{\mathrm{in}} - \sigma_{\mathrm{dream}})^2) = 2\times(\frac{\sqrt{3}}{4})^2 = \frac{3}{8} = 0.375$ (a dimensionless squared matrix-norm residual, never measured in bits!), while dividing [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) by $\ln 2$ shows that this nocturnal pass has already paid upfront the binary Shannon entropy $h_2(3/4) = -\frac{3}{4}\log_2\frac{3}{4} - \frac{1}{4}\log_2\frac{1}{4} \approx 0.811278$ bits. All four stages align on a single ledger:

| Stage of Evolution & Probing | Density Matrix State | State von Neumann Entropy (bits) | Step Additional Pinching Entropy $\Delta H_{\mathrm{bits}}$ | Discarded Coherence Mass $\lVert\rho - \Pi_\beta(\rho)\rVert_{\mathrm{HS}}^2$ |
| :--- | :--- | ---: | ---: | ---: |
| **1. Branching Superposition Input** | $\rho_{\mathrm{in}}$ (pure state at $\theta = \pi/6$) | $0$ | — | — |
| **2. Initial Dream Pre-Compilation ($\beta = 0$)** | $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$ | $h_2(3/4) \approx 0.811278$ | $+0.811278$ | $3/8 = 0.375$ |
| **3. Waking Same-Axis Re-Pinching ($\beta = 0$, Un-upgraded)** | $\Pi_0(\sigma_{\mathrm{dream}}) = \sigma_{\mathrm{dream}}$ | $0.811278$ | **$0$** | **$0$** |
| **4. Post-Dream Upgraded-Axis Re-Pinching ($\beta = \pi/2$)** | $\Pi_{\pi/2}(\sigma_{\mathrm{dream}}) = I/2$ | $1$ | $+0.188722$ | $1/8 = 0.125$ |

::: {.viz src="dream-pre-decoherence-deja-vu" preset="dream-precompile" height="500"}
**Initial dream pre-compilation: off-diagonal coherence sheared upfront, diagonal target locked early.** At $\theta = \pi/6$ and logical basis $\beta = 0$, the first pinching pass compresses $\rho_{\mathrm{in}}$ onto the diagonal fixed point $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$, discarding coherence mass $3/8$ and paying $\approx 0.8113$ bits of entropy upfront ([@thm-ch37-known-data-pinching-and-entropy-tax]). Reading this pass as nocturnal speculative pre-compilation belongs to this chapter's `MODEL`.
:::

### 37.5.3 Why Reality Steps into the Chosen Slice—and Why Not Every Dream Comes True: The Gram Compatibility Funnel vs. High-Novelty Pipeline Flushing {#sec-ch37-p2g-gram-funnel-and-flush}

Any critical reader will immediately press two sharp questions at this juncture: **first, if a dream is merely an internal pre-compilation of antecedent priors, why does the waking external trajectory sometimes step right into that pre-compiled slice? Second, conversely, if the sleeping mind runs speculative pre-compilations every night, why do the vast majority of bizarre dreams never come true in waking life?**

Consider the first question. In the timeless Gram geometry of [Chapter 29](ch29-timeless-causality-and-gram-space.md) ([@thm-ch29-gram-rigidity-and-pell]), consecutive waking scenes cohere not because a mysterious hand pulls the present backward from tomorrow, but because **so long as the waking observer continues applying the same hard geometric anchors and compatible priors used the night before, every realizable configuration must satisfy positive-operator Gram factorizability on complex Hilbert space together with nonnegativity of Lagrange–Gram bivector area**:

::: {.theorem #thm-ch37-p2g-gram-realizability title="Positive-Operator Gram Factorization Criterion on Complex Hilbert Spaces and the Lagrange–Gram Identity" lean="D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
Across the frozen quantum-bounds Gram-realizability and Lagrange–Gram modules of `trureturing`, the following two theorems hold simultaneously:

1. **Adjoint Square-Root Gram Realizability Criterion for Bounded Positive Operators** ([`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)): Let $V$ be a complete complex inner-product space (`[NormedAddCommGroup V] [InnerProductSpace ℂ V] [CompleteSpace V]`), and let $Q : V \to_L[\mathbb{C}] V$ be a bounded continuous $\mathbb{C}$-linear endomorphism. Then $Q$ is positive semidefinite in the operator order ($0 \le Q$) if and only if there exists a bounded continuous $\mathbb{C}$-linear operator $O : V \to_L[\mathbb{C}] V$ factoring $Q$ as an adjoint square and realizing its sesquilinear form everywhere as a Gram inner product:

   $$
   0 \le Q \;\Longleftrightarrow\; \exists\, O : V \to_L[\mathbb{C}] V,\quad Q = O^\dagger \circ_L O \;\land\; \forall x, y \in V,\; \langle Qx, y\rangle_{\mathbb{C}} = \langle Ox, Oy\rangle_{\mathbb{C}};
   $$

2. **Lagrange–Gram Bivector Remainder Identity for Finite Real Tuples** ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), cf. [Chapter 6](ch06-geometric-product.md) [@thm-lagrange-gram-identity]): For every finite index set $s : \operatorname{Finset}\;\iota$ and real coordinate families $u, v : \iota \to \mathbb{R}$, the Cauchy–Schwarz norm-product gap equals half the double sum of squared antisymmetric wedge components:

   $$
   \left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
   $$
:::

::: proof
In Conjunct 1, if $Q = O^\dagger \circ_L O$, adjointness immediately yields $\langle Qx, y\rangle_{\mathbb{C}} = \langle O^\dagger O x, y\rangle_{\mathbb{C}} = \langle Ox, Oy\rangle_{\mathbb{C}}$, so $Q$ is self-adjoint with $\langle Qx, x\rangle_{\mathbb{C}} = \lVert Ox\rVert^2 \ge 0$, proving $0 \le Q$; conversely, when $0 \le Q$ on a complete complex Hilbert space, the continuous functional calculus constructs the self-adjoint positive square root $O = Q^{1/2}$ satisfying $O^\dagger = O$ and $O \circ_L O = Q$, establishing both the factorization and the inner-product identity. Conjunct 2 expands $(u_i v_j - u_j v_i)^2 = u_i^2 v_j^2 - 2u_i v_i u_j v_j + u_j^2 v_i^2$ over $s \times s$: the first and third sums each factor as $(\sum_{i\in s} u_i^2)(\sum_{i\in s} v_i^2)$, the middle cross-sum simplifies to $-2(\sum_{i\in s} u_i v_i)^2$, and halving recovers the left-hand side. The full proof is checked by the Lean kernel.
:::

Respect the exact scope of [@thm-ch37-p2g-gram-realizability]: Conjunct 1 is an abstract operator factorization on complete complex Hilbert spaces, and Conjunct 2 is a **two-vector** Lagrange remainder; the explicit three-vector determinant corridor and nested narrowing funnel below constitute an elementary **manual derivation, not formalized as a standalone statement in this book** (pointwise evaluations `NUM`, matching §37.2 [@ex-ch37-gram-constraint-release]):

Fix three unit vectors in $\mathbb{R}^3$—hard geometric anchors $B = (1, 0, 0)$ and $A = (\frac{4}{5}, \frac{3}{5}, 0)$, together with a candidate unit vector $C(\phi) = (\frac{4}{5}, \frac{3}{5}\cos\phi, \frac{3}{5}\sin\phi)$ rotated around $B$ by dihedral angle $\phi$. Their pairwise overlaps are $x = A\cdot B = \frac{4}{5}$, $y = B\cdot C(\phi) = \frac{4}{5}$, and target overlap $z = A\cdot C(\phi) = \frac{16}{25} + \frac{9}{25}\cos\phi$. The $3 \times 3$ unit-diagonal Gram determinant is

$$
\det G \;=\; \det\begin{pmatrix} 1 & x & z \\ x & 1 & y \\ z & y & 1 \end{pmatrix} \;=\; 1 - x^2 - y^2 - z^2 + 2xyz \;=\; \frac{81}{625} - \left(z - \frac{16}{25}\right)^2.
$$

Nonnegativity of all principal minors together with the explicit spherical parameterization shows that $G$ is realizable if and only if $z \in [\frac{7}{25}, 1] = [0.28, 1]$. In our `MODEL` funnel, when daytime observations remain compatible with yesterday's logic and progressively tighten the dihedral cosine $q = \cos\phi$ along $[-1, 1] \supseteq [0, \frac{2}{3}] \supseteq [\frac{1}{3}, \frac{1}{2}]$, the admissible overlap band narrows across three nested intervals,

$$
\left[\frac{7}{25},\; 1\right] \;\supseteq\; \left[\frac{16}{25},\; \frac{22}{25}\right] \;\supseteq\; \left[\frac{19}{25},\; \frac{41}{50}\right] \;=\; [0.76,\; 0.82],
$$

continuously retaining the pre-compiled dream target $z_{\mathrm{dream}} = \frac{4}{5} = 0.8$ ($q = \frac{4}{9}$, $\det G = \frac{13}{125} = 0.104$; the waking trajectory $z(t) = \frac{19}{25} + \frac{t}{25},\; 0 \le t \le 1$ drawn on the stage is a model-selected compatible path, as nested interval containment never forces unique convergence to a singleton). On the cut-and-project side, enumerating golden integers $(a, b) \in \{-12, \dots, 12\}^2$ with physical coordinate $x_\parallel = a + b\varphi$, conjugate coordinate $x_\perp = a + b(1 - \varphi)$, and nested closed windows $W_s = [c - s/2, c + s/2]$ centered at $c = \varphi - \frac{3}{2}$ (where $s = 1$ recovers $W_1 = [\varphi - 2, \varphi - 1]$ from §37.4 [@thm-ch37-golden-cut-delone-multilocation], Conjunct 1 [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project)), shrinking the window width along $s = 1 \to \frac{1}{2} \to \frac{1}{4}$ filters the compatible lattice points in that box down along **$26 \to 11 \to 7$** (`NUM`; subset nesting follows manually from interval inclusion, whereas [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project) itself certifies only one-way inclusion of canonical natural-number golden expansions at full width $s = 1$).

::: {.viz src="dream-pre-decoherence-deja-vu" preset="gram-funnel" height="500"}
**Compatible prior funnel: when antecedent logic stays unrefuted, narrowing corridors retain the pre-compiled target.** With $x = y = 4/5$ fixed, the nested bands $[0.28, 1] \supseteq [0.64, 0.88] \supseteq [0.76, 0.82]$ keep $z_{\mathrm{dream}} = 0.8$ ($\det G = 0.104$) admissible, while shrinking the golden window width $1 \to 1/2 \to 1/4$ over $\{-12,\dots,12\}^2$ filters selected nodes $26 \to 11 \to 7$. Operator Gram realizability is [@thm-ch37-p2g-gram-realizability]; the $3 \times 3$ interval is manual derivation and the waking path is `MODEL`.
:::

Quasicrystal geometry offers a celebrated counterpart to local compatibility propagating constraints across distance, whose literature scope we demarcate explicitly:

::: {.remark #rem-ch37-p2g-empire-effect-literature title="Conway's Quasicrystal Empire Effect and the Boundary of Local Matching Propagation (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** In the theory of aperiodic tilings and cut-and-project quasicrystals (see M. Senechal, *Quasicrystals and Geometry*, Cambridge Univ. Press, 1995; and M. Baake & U. Grimm, *Aperiodic Order, Vol. 1: A Mathematical Invitation*, Cambridge Univ. Press, 2013), John H. Conway's **Empire Effect** describes how fixing a finite legal patch of tiles under local matching rules forces specific tile placements at distant discrete sites ("the empire of the patch," whose forced subset depends strictly on the chosen patch and tiling rules). Here it serves solely as a geometric literature analogy for how local prior commitments constrain distant admissible slices—never implying that a dream fragment uniquely determines the global future or collapses a narrowed golden window to a single point.
:::

Now let us answer the sharper **second question: why, then, do the overwhelming majority of dreams fail to materialize or trigger déjà vu?**

In computer architecture alongside `trureturing`'s concept-dynamics modules on information escape and belief revision, the reason is crystal clear: **speculative pre-compilation remains valid only when waking life introduces no structural novelty that refutes the prediction's premises!** The moment a waking observer learns a **genuinely novel fact** outside the semantic closure of prior knowledge—or encounters evidence conflicting with yesterday's defeasible assumptions—the pre-compiled cache entry is invalidated on the spot like a mispredicted processor branch (**Pipeline Flush**). Three `NEW_AT_PIN` kernel theorems certify the exact unique-capture and semantic-closure criteria for lowering information escape together with an explicit order-noncommutativity witness for conflict-reset revision:

::: {.theorem #thm-ch37-p2g-novelty-and-revision-noncommutation title="Unique-Capture and Semantic-Closure Criteria for Lowering Information Escape and Noncommutativity of Conflict-Reset Revision" lean="D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_not_mem_semanticClosureWithout D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation"}
Across the frozen concept-dynamics modules on exact information-escape rate, structural novelty, and conflict revision in `trureturing`, the following two theorems hold simultaneously:

1. **Dual Equivalence of Lowering Escape Rate with Positive Unique Capture and Non-Membership in Semantic Closure** ([`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos), [`lowersEscape_iff_not_mem_semanticClosureWithout`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_not_mem_semanticClosureWithout)): Let `arena : Arena.{u}` be a nondegenerate finite state arena (`arena.Nondegenerate`, meaning $N \ge 2$ states and $N(N - 1) > 0$ ordered distinct state pairs), let `catalog : Catalog.{u, v, w} arena` be a finite theorem catalog, and let `index : catalog.Index` be an entry. Write `LowersEscape index` when the indistinguishable ordered-pair escape rate of the full catalog is strictly lower than that of the catalog with `index` removed ($E(C) < E(C \setminus \{\mathrm{index}\})$), write `uniqueCaptureCount index` ($U_{\mathrm{index}}$) for the number of ordered state pairs agreed upon by every other entry yet distinguished by `index`, write $K_{\mathrm{index}} := (\mathrm{catalog.theoremAt}\;\mathrm{index}).\mathrm{primitives.toKernel}$ for its decidable agreement kernel, and write `semanticClosureWithout index` for the kernels entailed by joint agreement of all remaining entries. Then both equivalences hold simultaneously:

   $$
   \begin{aligned}
   \operatorname{catalog.LowersEscape}(\mathrm{index}) &\;\Longleftrightarrow\; 0 < \operatorname{catalog.uniqueCaptureCount}(\mathrm{index}), \\
   \operatorname{catalog.LowersEscape}(\mathrm{index}) &\;\Longleftrightarrow\; K_{\mathrm{index}} \notin \operatorname{catalog.semanticClosureWithout}(\mathrm{index});
   \end{aligned}
   $$

2. **Explicit Order-Noncommutativity Certificate for Evidence-First Conflict-Reset Revision** ([`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation)): On the three-world set `Fin 3` $= \{0, 1, 2\}$, define evidence-first conflict-reset revision by intersecting prior set $A$ with evidence $P$ whenever compatible ($\operatorname{revision}(P, A) = A \cap P$ if $A \cap P \neq \emptyset$) and resetting to $P$ upon conflict ($\operatorname{revision}(P, A) = P$ if $A \cap P = \emptyset$). For $A = \{0\}$, $P = \{1, 2\}$, and $Q = \{0, 1\}$, all five statements hold simultaneously:

   $$
   \begin{aligned}
   &\operatorname{revision}(P, A) = P \;\land\; \operatorname{revision}(Q, A) = A \\
   &\;\land\; \operatorname{revision}\bigl(Q, \operatorname{revision}(P, A)\bigr) = \{1\} \;\land\; \operatorname{revision}\bigl(P, \operatorname{revision}(Q, A)\bigr) = P \\
   &\;\land\; \operatorname{revision}\bigl(Q, \operatorname{revision}(P, A)\bigr) \neq \operatorname{revision}\bigl(P, \operatorname{revision}(Q, A)\bigr).
   \end{aligned}
   $$
:::

::: proof
In Conjunct 1, nondegeneracy $N \ge 2$ guarantees a strictly positive denominator $N(N - 1) > 0$; every ordered distinct pair escaping the full catalog also escapes the punctured catalog without `index`, and the set difference consists precisely of pairs where all other entries agree while `index` disagrees, whose cardinality is `uniqueCaptureCount index`, yielding $E(C) < E(C \setminus \{\mathrm{index}\}) \iff 0 < U_{\mathrm{index}}$. Moreover, $U_{\mathrm{index}} = 0$ holds if and only if for all $x, y$ (reflexively when $x = y$, and by absence of unique captures when $x \neq y$), agreement across all other entries entails $K_{\mathrm{index}}(x, y)$, i.e., $K_{\mathrm{index}} \in \operatorname{semanticClosureWithout}(\mathrm{index})$; negating both sides gives the second equivalence. Conjunct 2 evaluates intersections directly on `Fin 3`: $A \cap P = \{0\} \cap \{1, 2\} = \emptyset$ triggers reset $\operatorname{revision}(P, A) = \{1, 2\} = P$, while $A \cap Q = \{0\} \cap \{0, 1\} = \{0\} \neq \emptyset$ preserves $\operatorname{revision}(Q, A) = \{0\} = A$. Composing in opposite orders yields $\{1, 2\} \cap \{0, 1\} = \{1\}$ versus conflict-resetting $\{0\}$ by $P$ to obtain $P = \{1, 2\}$, which differ at witness element $2$. The full proof is checked by the Lean kernel.
:::

A four-state arena $X = \{00, 01, 10, 11\}$ ($N = 4$, $N(N - 1) = 12$ ordered distinct pairs—kept strictly separate from the three-world `Fin 3` revision counterexample in [@thm-ch37-p2g-novelty-and-revision-noncommutation], Conjunct 2) makes the contrast between redundant repetition and high-novelty flushing unmistakable (`NUM`). Suppose yesterday's logic knows only the first-bit feature $f_0(a, b) = a$, and compare appending a genuinely novel second-bit feature $f_1(a, b) = b$ against appending a redundant copy $f_{\mathrm{dup}} = f_0$:

| Feature Catalog Configuration | Escaping Ordered Pairs | Escape Rate $E$ | Unique Captures $U_i$ of Added Entry | Impact on Dream Speculative Target `00` Under Coarse Prior $f_0 = 0$ (`MODEL`) |
| :--- | ---: | ---: | ---: | :--- |
| **Prior Catalog $\{f_0\}$** | $4$ | $1/3$ | — | Coarse prior $f_0 = 0$ admits $\{00, 01\}$; dream speculatively pre-selects `00` |
| **Redundant Copy $\{f_0, f_{\mathrm{dup}}\}$** | $4$ | $1/3$ | $U_{f_{\mathrm{dup}}} = 0$ | $K_{f_{\mathrm{dup}}}$ lies inside prior semantic closure; observing $f_{\mathrm{dup}} = 0$ triggers no flush, keeping cache valid |
| **High-Novelty Upgrade $\{f_0, f_1\}$** | $0$ | $0$ | $U_{f_1} = 4 > 0$ | Learning $f_1 = 1$ upon waking pins reality to `01`: consistent with coarse $f_0 = 0$, yet immediately falsifies speculative guess `00`! |

In the interactive sandtable `ORTHO//DEJAVU`, this mechanism is wired directly to the primary bilingual toggle **"Post-Dream Logic Upgrade / Pipeline Flush — 梦后逻辑升级 / 流水线冲刷"** (Boolean state `logicUpgrade`, default `false`; coupling feature acquisition to basis rotation and defeasible Gram-prior replacement is a deterministic `MODEL` rule chosen for the stage):

- **Toggle OFF (`logicUpgrade = false`)**: `Context_Version` stays `0`, the active waking ruler stays $\beta = 0$, both `00` and $z_{\mathrm{dream}} = 0.8$ remain compatible with active priors, cache validity holds (`Valid = 1`), and `flush = 0`;
- **Toggle ON (`logicUpgrade = true`)**: Waking acquisition of high-novelty evidence $f_1 = 1$ increments `Context_Version` to `1` and flushes the speculative cache (`Valid = 0, flush = 1`, while preserving the historical dream snapshot $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$ as an immutable record without rewriting history). On the Gram panel, hard anchors $A, B$ stay fixed while the defeasible prior $q \in [\frac{1}{3}, \frac{1}{2}]$ is replaced by new evidence $q \in [-1, -\frac{1}{3}]$ (rather than taking an empty intersection with the superseded assumption), shifting the admissible corridor to $z \in [\frac{7}{25}, \frac{13}{25}] = [0.28, 0.52]$, excluding $0.8$, and selecting $z_{\mathrm{new}} = \frac{2}{5} = 0.4$ ($q = -\frac{2}{3}$, $\det G = \frac{9}{125} = 0.072$); on the qubit panel, re-pinching the stored dream state $\sigma_{\mathrm{dream}}$ in the upgraded orthogonal basis $\beta = \pi/2$ produces $\Pi_{\pi/2}(\sigma_{\mathrm{dream}}) = I/2$, incurring $\Delta H_{\mathrm{bits}} = 1 - h_2(3/4) \approx 0.188722$ bits of fresh re-compilation entropy and $1/8$ residual coherence mass!

::: {.viz src="dream-pre-decoherence-deja-vu" preset="logic-upgrade-flush" height="500"}
**Post-dream logic upgrade and pipeline flush: new structural evidence pushes the old target outside the window.** Flipping ON "Post-Dream Logic Upgrade / Pipeline Flush" replaces the defeasible prior, shifts the admissible band to $[0.28, 0.52]$, renders the invalidated dream target $0.8$ as a hollow outline, moves the amber active choice to $z_{\mathrm{new}} = 0.4$, and pays $\approx 0.1887$ bits of additional re-pinching entropy ([@thm-ch37-p2g-novelty-and-revision-noncommutation]; cache-flush coupling is `MODEL`).
:::

### 37.5.4 Exact Sandtable Signature of Déjà Vu: Zero Additional Pinching Entropy Under Idempotent Re-Projection and a Null-Timestamp Cache Hit {#sec-ch37-p2g-deja-vu-signature}

Now return to that rarer morning when no conflicting logic upgrade has intervened (`logicUpgrade = false`): last night's dream pre-compiled a branching state along prior ruler $P$ into $\sigma = \Pi_P(\rho)$, and today the waking observer steps into the corresponding crossroads carrying **the exact same logical ruler $P$**. What transpires on the operator-algebraic ledger at that instant?

Applying the four kernel results of §37.1 [@thm-ch37-known-data-pinching-and-entropy-tax] directly to the already pinched state $\sigma = \Pi_P(\rho)$ yields a three-step exact derivation with zero unverified assumptions (**manual derivation, not formalized as a standalone statement in this book**):

1. **Exact State Invariance**: By functional composition idempotence [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), measuring a second time with the same ruler leaves the density operator untouched:

   $$
   \Pi_P(\sigma) \;=\; \Pi_P\bigl(\Pi_P(\rho)\bigr) \;=\; \Pi_P(\rho) \;=\; \sigma;
   $$

2. **Exact Zero Cross-Sector Residual and Discarded Coherence Mass**: By the fixed-point characterization [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), $P_k \sigma P_l = 0$ for all $k \neq l$, so the re-pinching matrix residual vanishes identically ($\sigma - \Pi_P(\sigma) = 0$) and its squared Hilbert–Schmidt norm is zero:

   $$
   \lVert \sigma - \Pi_P(\sigma)\rVert_{\mathrm{HS}}^2 \;=\; 0
   $$

   (recovering on a computational-basis qubit the exact zero $\lvert\sigma_{01}\rvert^2 + \lvert\sigma_{10}\rvert^2 = 0$ via [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass));
3. **Exact Zero Additional Pinching Entropy Without Intervening Evolution**: Provided no intervening unitary evolution rotates $\sigma$ out of its block structure—instantiating [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) with $U = I$ and constant computational-basis diagonal trajectory $\rho_k = \sigma$—the single-step identity gives $0 = S(\sigma) - S(\sigma) = D(\sigma \,\|\, \sigma)$ in nats; dividing by $\ln 2$ certifies **zero additional pinching entropy** in bits:

   $$
   \Delta H_{\mathrm{bits}} \;:=\; \frac{S\bigl(\Pi_P(\sigma)\bigr) - S(\sigma)}{\ln 2} \;=\; 0.
   $$

An explicit mathematical and physical firewall is indispensable here: **$\Delta H_{\mathrm{bits}} = 0$ means strictly and solely that the *increment* in von Neumann entropy under repeated application of the same pinching map with no intervening evolution vanishes!** It does *not* erase the pre-existing nonzero mixing entropy $H(\sigma_{\mathrm{dream}}) \approx 0.811278$ bits already stored in $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$; it does *not* equate to single-shot outcome surprisal upon conditioning onto an individual branch (which at $(3/4, 1/4)$ equals $-\log_2(3/4) \approx 0.415037$ bits and $-\log_2(1/4) = 2$ bits, both strictly positive!); and it makes zero claim of zero cortical metabolic ATP consumption or zero thermodynamic heat.

Why, then, does this $\Delta H_{\mathrm{bits}} = 0$ pre-compiled hit feel phenomenologically unlike ordinary explicit recollection ("I remember dreaming this last Tuesday"), producing instead the uncanny shiver of **intense familiarity paired with a blank chronological source**? Within our **`MODEL` (interpretive model)**, §37.2–§37.3 already supplied the missing piece: nocturnal pre-compilation ran while five-sense chronological anchors $\mathbf{u}_2$ and bodily coordinates were offline, writing the compiled entry with a **null episodic timestamp (`Time_Tag = NULL`)**! Placing the three waking encounters side by side clarifies the exact structural contrast:

| Cognitive Comparison Axis (`MODEL`) | 1. Ordinary Novel Waking Scene (Cold Miss) | 2. Ordinary Explicit Memory Recall (Timestamped Hit) | 3. Déjà Vu Episode (Pre-Compiled Null-Timestamp Hit) |
| :--- | :--- | :--- | :--- |
| **Site of Initial Decoherence Pass** | Executed live for the first time in waking five-sense reality | Executed and archived during a datable past waking scene | Pre-compiled offline in a dream sandtable by antecedent logic |
| **Current Same-Axis $\Delta H_{\mathrm{bits}}$** | Nonnegative; strictly positive when the input has nonzero coherence in the chosen basis (e.g., $+0.8113$ bits, residual $3/8$ at default) | $0$ upon re-projecting inside the unchanged context | **$0$** upon re-projecting inside the unchanged context (zero residual) |
| **Address & Context-Version Verification** | No matching prior entry (`Cache Miss`) | `Valid = 1`, `Address_Tag` and `Context_Version` both match | `Valid = 1`, `Address_Tag` and `Context_Version` both match (`Cache Hit`) |
| **Episodic Timestamp `Time_Tag`** | Stamped live as `t = t_now` | Stores explicit past waking coordinate `t = t_past` | **`Time_Tag = NULL`** (chronological anchor suspended in sleep) |
| **First-Person Phenomenological Texture** | Fresh unfamiliarity and active branch-resolution effort | Grounded recollection: "I was here last autumn" | Effortless zero-recomputation familiarity colliding with a null date lookup: "I know this scene, yet I could never have lived it!" |

To render Column 3 concrete in the interactive sandtable without overstepping hardware specifications, the stage uses the following explicitly fictional **episode-cache record schema (`MODEL` Schema)**:

```text
Valid: 1
Address_Tag: event-0
Context_Version: 0
Payload: immutable compiled state / target
Time_Tag: NULL
```

In this schema, a cache hit is defined by the fourfold conjunction `hit = Valid && Address_Tag_matches && Context_Version_matches && Payload_compatible` (where `Payload_compatible` means the active ruler leaves the saved state fixed, $\Pi_\beta(\sigma_{\mathrm{dream}}) = \sigma_{\mathrm{dream}}$), and the sandtable's "timestamp-free familiarity" indicator evaluates `hit && Time_Tag == NULL` (as emphasized in [@rem-ch37-p2g-speculative-execution-literature], Item 2, both `Address_Tag` and `Context_Version` must match—neither `Valid = 1` nor `Time_Tag == NULL` alone ever triggers a hit; if one switches `Address_Tag` to `event-1 != event-0` or manually dials the ruler back to $\beta = 0^\circ$ while `logicUpgrade` is ON with `Valid = 0` and `Context_Version = 1`, re-projection still leaves the saved state unchanged with $\Delta H_{\mathrm{bits}} = 0$ and zero residual, yet the cache strictly reports `MISS` solely from the tag or context mismatch without claiming any nonzero re-projection cost). As for the two pointer-and-diagonal theorems developed in [Chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md)—canonical copied-address record equality [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior) ([@thm-ch38-copied-address-dereference-and-access-defect]) and diagonal-slot fixed-point implication [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed) ([Chapter 24](ch24-cosine-fixed-points-and-self-reference.md) [@lem-diagonal-landing-fixed] and [@thm-ch38-self-mapped-diagonal-fixed-point])—the former proves pointwise equality of two Kronecker-delta address-record definitions across the observer-marginal and decoherence-defect modules, while the latter derives a fixed point at the diagonal slot only under the strong hypothesis that an entire table row equals the twisted diagonal; neither constructs cache fields or biological memory registers.

::: {.viz src="dream-pre-decoherence-deja-vu" preset="deja-vu-hit" height="500"}
**Déjà vu sandtable hit: zero additional pinching entropy alongside a `Time_Tag = NULL` cache card.** With no logic upgrade (`Context_Version = 0`, `Valid = 1`), re-measuring $\sigma_{\mathrm{dream}}$ in the same basis $\beta = 0$ leaves the matrix unchanged with $\Delta H_{\mathrm{bits}} = 0$ and zero residual mass, while the model card verifies matching address and context tags alongside a null timestamp (`MODEL`). Toggling the upgrade switch flushes the hit on the spot.
:::

Finally, we consolidate the empirical neuropsychology literature on déjà vu together with the four-tier epistemic boundary governing §37.5 and `ORTHO//DEJAVU`:

::: {.remark #rem-ch37-dejavu-epistemic-boundary title="Cognitive Neuropsychology Literature on Déjà Vu and the Four-Tier Epistemic Boundary of §37.5 (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Contemporary experimental-psychology and cognitive-neuropsychology accounts of human déjà vu belong to external scientific literature and are not formalized in `trureturing@dev`:

1. **Taxonomy of Competing Déjà Vu Mechanisms and Dual-Process Dissociation (A. S. Brown, "A review of the déjà vu experience," *Psychological Bulletin* **129**(3), 394–413, 2003, DOI: `10.1037/0033-2909.129.3.394`)**: Surveys divided-attention, perceptual split-second delay, Gestalt configurational similarity, and dual-process memory frameworks (transient dissociation between *familiarity* signaling and explicit episodic *recollection*), showing that familiarity can be elicited without source recollection while emphasizing that empirical psychology recognizes multiple candidate mechanisms—none involving supernatural precognition;
2. **Metacognitive Conflict-Detection Account of Déjà Vu (C. Moulin, *The Cognitive Neuropsychology of Déjà Vu*, 1st ed., Routledge, copyright 2018 / initial release September 2017, ISBN `9781138696266`)**: Distinguishes genuine déjà vu from confabulatory delusion by the simultaneous presence of **two metacognitive evaluations**—an intact feeling of familiarity paired with an intact higher-order epistemic evaluation that this familiarity is impossible or erroneous given one's personal chronology—producing the characteristic clash between familiarity and contextual source verification (rather than an anatomically settled two-register silicon circuit).

**Four-tier epistemic boundary of §37.5:** (i) Green `LEAN ✓` status applies strictly to the exact statements of [@thm-ch37-known-data-pinching-and-entropy-tax], [@thm-ch37-joint-coherent-record-erasure], [@thm-ch37-golden-cut-delone-multilocation], [@thm-ch37-p2g-open-escape-and-krylov], [@thm-ch37-p2g-gram-realizability], and [@thm-ch37-p2g-novelty-and-revision-noncommutation] (plus the narrowly cited [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior) and [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)); (ii) the $\Delta H_{\mathrm{bits}} = 0$ same-basis specialization, single-qubit Bloch pinching formulas, $3 \times 3$ Gram interval $[0.28, 1]$, and nested window inclusions are **manual derivations**, while Wheeler delayed choice, branch prediction/TLB architecture, Conway's Empire Effect, and Brown/Moulin déjà vu research are **Literature**; (iii) explicit matrix entries, bit entropies, 12-pair counts, and the $26 \to 11 \to 7$ golden-lattice counts are **numerical (`NUM`)**; and (iv) interpreting dreams as nocturnal pre-decoherence, post-dream learning as pipeline flushing, and `Valid = 1, Time_Tag = NULL` as a sandtable signature of déjà vu belongs strictly to this book's geometric **`MODEL`**, claiming neither a necessary-and-sufficient biological test for human déjà vu nor any proof of precognition.
:::

Stripped of fatalistic mist, the geometry stands crisp and luminous: **the future was never a pre-printed ledger waiting down the road to be peeked at; whichever logical ruler you grasp by night and by day to resolve open orthogonal residuals selects the compatible future cross-section you step into. And that occasional flash of déjà vu is nothing mystifying—only an undated footprint left in the timeless sandtable when your own antecedent logic ran one idempotent pass ahead of schedule.** The full interactive laboratory below (`ORTHO//DEJAVU`) brings basis selection, dream pre-compilation, the Gram compatibility funnel, logic-upgrade pipeline flushing, and the déjà vu hit together onto one stage:

::: {.viz src="dream-pre-decoherence-deja-vu" height="640"}
**The Dream Pre-Decoherence and Déjà Vu Sandtable (`ORTHO//DEJAVU`).** Three coordinated views—measurement basis and density matrix (`basis`), Gram compatibility funnel and narrowed golden window (`funnel`), and two-copy phase records (`records`)—paired with the "Post-Dream Logic Upgrade / Pipeline Flush" toggle contrast zero additional pinching entropy ($\Delta H_{\mathrm{bits}} = 0$) under unchanged logic against cache invalidation and re-pinching upon learning structural novelty. Green is reserved for theorems cited via `lean=`; dream pre-compilation, pipeline flushing, and the `Time_Tag = NULL` episode card belong to this chapter's interpretive model (`MODEL`).
:::

And once we recognize that five-sense waking lock, nocturnal dream pre-compilation, and bodiless multi-location are simply different **address masks and context tags** querying one unchanging global lattice, an unmistakable computer-architecture revelation steps into view: **if not a single brick of the timeless carrier needs to be physically hauled around when awareness shifts from $\mathbf{x}_0$ to $\{\mathbf{x}_1, \dots, \mathbf{x}_K\}$, what hardware primitive *is* the observer inside the cosmic quantum computer?** In [Chapter 38](ch38-observer-memory-pointer-and-ontological-qram.md), we unveil that crystalline answer: **an addressing pointer `ptr` scanning a static ontological Quantum Random-Access Memory (QRAM)**.
