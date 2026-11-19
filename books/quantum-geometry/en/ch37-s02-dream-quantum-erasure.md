# 36.1.2 Dreams as Nocturnal Quantum Erasure: How Partial Forgetting Redeems Twisted-Away Phases {#372-dreams-as-nocturnal-quantum-erasure-how-partial-forgetting-redeems-twisted-away-phases}

Because daytime focus operates as a pinching engine that continually prunes $\sin\theta$ branches while accumulating entropy taxes, a bounded mind that never relaxed its grip on known data would steadily suffocate inside a shrinking compatibility corridor. In [Chapter 35](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) we saw that driving the entire table across $\cos 90^\circ = 0$ is catastrophic macroscopic formatting; by contrast, living observers rely every night on an exquisite **soft-maintenance protocol (`MODEL` (interpretive model))**—**reversible partial forgetting in dreams**.

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

In this book's reading (`MODEL`), [@ex-ch37-gram-constraint-release] dissolves the apparent absurdity of dream montage: dreams are not broken films, but **oblique phase-addressed cross-sections** that emerge once chronological index $\mathbf{u}_2$ steps aside—allowing a childhood alley, a distant face, and an unwalked $\sin\theta$ fork to meet in one frame because all three share internal phase resonance $x_1$!

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

First, the scope: the unimodular condition $\lvert\gamma\rvert = 1$ means that the environment records left by the two addresses are parallel and carry no which-path information, so $\lvert\rho_{ij}\rvert$ never shrinks; what is undone here is a controlled phase (a kind of phase echo), not quantum erasure in the Scully–Drühl sense, where the records are orthogonal ($\gamma = 0$), and the full pinching of Section 36.1.1 cannot be undone this way. Two kernel theorems establish both general full-family unimodular reversal and this exact two-copy certificate:

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

Conjunct 2 of [@thm-ch37-joint-coherent-record-erasure] captures the lived difference between shallow half-sleep and deep nocturnal release (`MODEL` (interpretive model)): when two daytime commitments invert an initial $+1/2$ coherence into $-1/2$, loosening only copy `{0}` leaves the unreversed second guard twisting the phase onto $-i/2$; only when both copies are jointly conjugated across `Finset.univ` does the $+1/2$ amplitude twisted away by the two phase records resurface intact!

::: {.viz src="dream-decoherence-unpinning" preset="quantum_eraser" height="500"}
**Joint reversal of every copy.** Both phase records are written, then both are reversed: the magenta arrow on the phase disc turns half way round the dashed grey circle of radius 1/2 and back to 1/2, and the fringes land on the dashed grey curve again; the dashed white line on the disc is the arrow's path, out half a turn on the outer strand and back on the inner one, with a magenta dot where each step landed, at 1/2, −i/2 and −1/2 ([@thm-ch37-joint-coherent-record-erasure], item 1, every record with |c|² = 1).
:::

---
