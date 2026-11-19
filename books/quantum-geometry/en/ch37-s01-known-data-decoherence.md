# 36.1.1 Observation as Decoherence via Known Data: Why Waking Reality Feels Rigid and Narrow {#371-observation-as-decoherence-via-known-data-why-waking-reality-feels-rigid-and-narrow}

Everyday intuition harbors a stubborn conceptual idol: **the camera myth**. People assume that the external world already comes pre-packaged as rigid tables, walls, and clock ticks, and that a waking observer merely opens the eyes like a passive photographic plate to register incoming rays.

That passive-reception fable quietly smuggles back the external "third point $C$" we excised in [Chapter 2](ch02-born-rule.md). In zero-background pairwise measurement, no reading exists apart from a measuring ruler—**observation is never passive reception; it is an active projective pruning operation in which the observer wields accumulated "known data" to decoherently shear the global superposition field (`MODEL` (interpretive model))!**

Let us set this mechanism directly onto a finite-dimensional matrix blackboard. In the waking regime, a seasoned observer holds inside its self-referential lookup table $T$ a complete family of pairwise orthogonal, self-adjoint **known-data projector anchors** $D_{\mathrm{known}} = \{P_1, P_2, \dots, P_M\}$ ($P_k^\dagger = P_k,\; P_k^2 = P_k,\; k \neq l \Rightarrow P_k P_l = 0,\; \sum_{k=1}^M P_k = I$, encoding idempotent one-dimensional commitments such as "this skin boundary is my body," "gravity pulls downward," "today is this date in this city," and "I bear this name"). Whenever the ambient field state $\rho$ meets the waking mind, the observer applies strong record pinching across $D_{\mathrm{known}}$:

$$
\Pi_{\mathrm{wake}}(\rho) \;:=\; \operatorname{unreadState}(P, \rho) \;=\; \sum_{k=1}^M P_k \,\rho\, P_k.
$$

This unread state retains every record sector while deleting coherence between sectors. Selecting a nonzero-weight outcome instead requires normalizing its block $P_k\rho P_k$ by the record weight. The narrative of choosing one line adopts this conditioned readout.

Recall the **Gain–Loss Fairness Pythagorean ledger** of [Chapter 27](ch31-quantum-fairness.md) (Conjunct 2 of [@thm-ch31-seat-pythagorean-monogamy-fairness]): whenever a unit-purity superposition is welded onto a single one-dimensional subjective waking choice $\cos\theta$, its complementary orthogonal bifurcation share $\sin\theta\,\hat{\mathbf{I}}$—the street not taken at the intersection, the reply held back on the tongue, the counterfactual life configuration left unchosen—**is not annihilated from the timeless global carrier**! On the matrix ledger, the untaken path itself is another diagonal block $P_l \rho P_l$ (which unread pinching keeps intact); its capacity to interfere with the path taken lives in the off-diagonal cross-record blocks $P_k \rho P_l$ ($k \neq l$)—and the "occluded orthogonal bifurcation" of this chapter means the latter.

Before stating the general $n$-dimensional theorem, let us audit this "waking decoherence tax" explicitly on a $2 \times 2$ single-qubit blackboard. Starting from the zero-entropy pure state $\rho(0) = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ ($S(\rho(0)) = 0$), evolve by the planar rotation (here $\theta$ is a Hilbert-space angle, differing by the half-angle factor from the Bloch polar angle of Section 35.2) $U(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ into a coherent pure superposition and immediately apply computational-basis pinching:

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

- **Solid**, because record pinching obeys strict functional idempotence $\Pi_{\mathrm{wake}} \circ \Pi_{\mathrm{wake}} = \Pi_{\mathrm{wake}}$: so long as you interrogate the world millisecond after millisecond with the same known-data basis, every off-diagonal anomaly is crushed to zero ($P_k \rho P_l = 0$), and tables stay tables;
- **Narrow and exhausting**, because across every step of unitary evolution $U$ followed by basis pinching that deletes coherence between sectors, the deleted off-diagonal coherence is converted penny for penny into a nonnegative **quantum relative-entropy tax**! In this `MODEL`, sustaining a crisp one-dimensional daytime rail feels like paying an ongoing entropy bill; turning that information-entropy tax into physical heat dissipation also requires the bath, initial-state, and entropy-balance conditions of [Chapter 27](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness].

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
