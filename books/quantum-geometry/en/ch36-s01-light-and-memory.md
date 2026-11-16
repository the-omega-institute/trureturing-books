# 36.1 Why "Returning to Pure Light" Is Reincarnation: The $\cos 90^\circ = 0$ Amnesia Cliff {#why-returning-to-pure-light-is-reincarnation-the-cos900-amnesia-cliff}

Continue with the preceding chapter's model: memory is read through a chosen axial bias, and erasure means complete unread standard-basis pinching with inaccessible environment records. Picture a bounded observer rotating through inclination $\theta$ while recording pairwise comparison invariants into its self-referential lookup table $T$. Its ability to recognize its own identity from one step to the next—and to read the structural invariants distilled by prior experience—depends entirely on retaining a nonzero projection $\cos\theta > 0$ along its one-dimensional idempotent line ([Chapter 3](ch03-projectors-and-duality.md), $P^2 = P$). What happens if, seduced by unbounded wave expansion, it steps straight onto the equatorial cliff at $\theta = 90^\circ$?

1. **Vanishing of the Chosen Axial Bias and Formatting of the Encoded Table (`MODEL`)**:
   At $\theta = 90^\circ$, collinear self-retention drops identically to zero ($\cos 90^\circ = 0$; for its relativistic null-cone counterparts across Part V [Chapter 17](ch17-lorentz-geometry.md), Part VIII [Chapter 32](ch32-unified-field-and-meta-unification.md), and [Chapter 35](ch35-light-pulse-and-self-referential-table.md) [@rem-ch35-fertilization-zinc-spark-literature], see the respective literature remarks). What vanishes is the axial bias carrying the selected memory; the diagonal projection itself remains nonzero. Under this encoding and erasure protocol, the address register of the self-referential table $T$ evaporates at a stroke—like volatile memory unplugged from power, every structural coordinate accumulated across the journey is formatted back to blank.
2. **Inevitable Re-Refraction into Blind Search ($90^\circ \to 0^+$, `MODEL`)**:
   An unanchored pure-light pulse retains no one-dimensional local persistence anchor (for the corresponding relativistic null proper-time literature, see Item 1 of [Chapter 35](ch35-light-pulse-and-self-referential-table.md) [@rem-ch35-fertilization-zinc-spark-literature]). If scattering at the next polyhedral crease or boundary singularity of the timeless crystal is prescribed as this erasure and re-preparation, the pulse refracts within the model from $90^\circ$ back into a localized $0^+$ ray, carrying an empty table $T_0 = \varnothing$ into yet another round of blind trial-and-error search.
3. **Reincarnation as Cosmic Brute-Force Garbage Collection (`MODEL`)**:
   From a systems-engineering standpoint, why does nature maintain this $\cos 90^\circ = 0$ formatting cliff? Recall the causal compatibility crystal of [Chapter 29](ch29-timeless-causality-and-gram-space.md) and [Chapter 31](ch31-quantum-fairness.md): an unawakened observer who merely appends raw empirical episodes row after row without distilling their generating law cannot append independent anchors indefinitely at fixed dimension without compression, reuse, external storage, or expansion; requiring all old anchor constraints to persist can crowd its historical vectors toward coplanar lockup ($\det G_M \to 0$), freezing free choice. For an unreduced table, crashing into $\cos 90^\circ = 0$ serves as **brute-force garbage collection**—locally re-preparing the clogged episodic ledger to release old constraints, reopening positive compatibility volume when a non-collinear new state is accessible, at the tragic price of complete amnesia and endless repetition.

Before stating the general formal theorem, let us verify this orthogonal trade-off by hand on an explicit $2 \times 2$ matrix blackboard. For any real pair $(c, s) = (\cos\theta, \sin\theta)$ on the unit circle $c^2 + s^2 = 1$, write the single-qubit parameterized density matrix

$$
\rho(c, s) \;:=\; \frac{1}{2}\begin{pmatrix} 1 + c & s \\ s & 1 - c \end{pmatrix}.
$$

Applying standard-basis pinching (`pinching`) along the computational reference axis splits $\rho(c, s)$ cleanly into its diagonal skeleton and its off-diagonal coherence remainder:

$$
\operatorname{pinching}\bigl(\rho(c, s)\bigr) = \frac{1}{2}\begin{pmatrix} 1 + c & 0 \\ 0 & 1 - c \end{pmatrix}, \qquad \rho(c, s) - \operatorname{pinching}\bigl(\rho(c, s)\bigr) = \frac{1}{2}\begin{pmatrix} 0 & s \\ s & 0 \end{pmatrix}.
$$

Computing trace-inner-product squared norms term by term reconstructs the unit purity budget:

$$
\underbrace{\left(\frac{1+c}{2}\right)^2 + \left(\frac{1-c}{2}\right)^2}_{\text{diagonal skeleton mass } = \frac{1}{2} + \frac{1}{2}c^2} \;+\; \underbrace{\left(\frac{s}{2}\right)^2 + \left(\frac{s}{2}\right)^2}_{\text{off-diagonal coherence mass } = \frac{1}{2}s^2} \;=\; \frac{1 + c^2 + s^2}{2} \;=\; 1.
$$

Watch what happens at $\theta = 90^\circ$ ($c = \cos 90^\circ = 0,\; s = \sin 90^\circ = 1$): the axial memory bias $\frac{1}{2}c^2$ inside the diagonal skeleton **vanishes identically**, leaving the pinched diagonal state at $\frac{1}{2}I_2$, unable to distinguish positive from negative bias on that axis! Before pinching, the state remains pure; its transverse component survives in the off-diagonal entries $\rho_{01} = \rho_{10} = \frac{1}{2}$; if the next environmental action is precisely complete unread pinching and its records are inaccessible, the entire off-diagonal coherence mass $\frac{1}{2}s^2 = \frac{1}{2}$ disappears from the local state, leaving a blank slate for this encoding. This does not imply destruction of all information in system and environment together.

::: {.figure src="ch36-pinching-ledger"}
**Reach $90^\circ$ and the axial bias carrying the memory is gone.** For the pure state $\rho(\cos\theta, \sin\theta)$, the diagonal skeleton left by pinching, $\frac{1}{2} + \frac{1}{2}\cos^2\theta$, splits into the grey constant $\frac{1}{2}$ and the cyan axial bias $\frac{1}{2}\cos^2\theta$; magenta is the discarded off-diagonal coherence $\frac{1}{2}\sin^2\theta$. The three bands always stack up to $1$, the Pythagorean split of Conjunct 1 of [@thm-ch36-pinching-skeleton-and-discarded-coherence] ($P$ in the figure is $\operatorname{pinching}$). At $\theta = 90^\circ$ the cyan band has no thickness. Reading $\cos\theta$ as a memory bias is this chapter's observer model (`MODEL`).
:::

At the formal level of finite-dimensional quantum channels, this exact orthogonal decomposition between the diagonal address skeleton and discarded off-diagonal coherence is locked in `trureturing` for arbitrary $2 \times 2$ complex qubit matrices (`pinching`, zero-retention phase damping; cf. [Chapter 4](ch04-decoherence.md)) by the three kernel theorems below:

::: {.theorem #thm-ch36-pinching-skeleton-and-discarded-coherence title="Orthogonal Mass Decomposition and Off-Diagonal Coherence Criterion for Qubit Pinching" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass D5/S3/QuantumChannels/CoherenceMassBridge.pinching_eq_self_iff_offDiag_eq_zero"}
Let `QubitMatrix` denote the $2 \times 2$ complex matrix type $M_{\operatorname{Fin} 2}(\mathbb{C})$. For $\rho, A, B \in \mathrm{QubitMatrix}$, write the trace inner product $\operatorname{hilbertSchmidtInner}(A, B) := \operatorname{Tr}(A^\dagger B) \in \mathbb{C}$, let standard-basis pinching $\operatorname{pinching}(\rho)$ preserve diagonal entries and annihilate off-diagonal entries ($\operatorname{pinching}(\rho)_{ij} = \rho_{ij}$ if $i = j$ and $0$ otherwise), and write $\operatorname{offDiag}(\rho) := (\rho_{01}, \rho_{10}) \in \mathbb{C} \times \mathbb{C}$. Then for every matrix $\rho \in \mathrm{QubitMatrix}$ (without requiring Hermiticity, unit trace, or positive semidefiniteness), the following three statements hold simultaneously:

1. **Orthogonal Pythagorean Split Between Diagonal Skeleton and Discarded Coherence** ([`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)):

   $$
   \begin{aligned}
   &\operatorname{hilbertSchmidtInner}(\rho, \rho) \\
    &\;=\; \operatorname{hilbertSchmidtInner}\bigl(\operatorname{pinching}(\rho), \operatorname{pinching}(\rho)\bigr) \\
    &\quad + \operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho), \rho - \operatorname{pinching}(\rho)\bigr);
   \end{aligned}
   $$

2. **Exact Off-Diagonal Modulus-Square Formula for Discarded Mass** ([`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)):

   $$
   \begin{aligned}
   &\operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho), \rho - \operatorname{pinching}(\rho)\bigr) \\
    &\;=\; \bigl(\operatorname{normSq}(\rho_{01}) \\
    &\quad + \operatorname{normSq}(\rho_{10}) : \mathbb{C}\bigr);
   \end{aligned}
   $$

3. **Fixed-Point Characterization of Vanishing Off-Diagonal Coherence** ([`pinching_eq_self_iff_offDiag_eq_zero`](lean:D5/S3/QuantumChannels/CoherenceMassBridge.pinching_eq_self_iff_offDiag_eq_zero)):

   $$
   \operatorname{pinching}(\rho) = \rho \;\Longleftrightarrow\; \operatorname{offDiag}(\rho) = (0, 0).
   $$
:::

::: proof
Set $D := \rho - \operatorname{pinching}(\rho)$. For Conjunct 1, idempotence $\operatorname{pinching}(\operatorname{pinching}(\rho)) = \operatorname{pinching}(\rho)$ together with self-adjointness $\operatorname{hilbertSchmidtInner}(\operatorname{pinching}(A), B) = \operatorname{hilbertSchmidtInner}(A, \operatorname{pinching}(B))$ implies forward orthogonality $\operatorname{hilbertSchmidtInner}(\operatorname{pinching}(\rho), D) = 0$, while $\operatorname{pinching}(D) = 0$ yields reverse orthogonality $\operatorname{hilbertSchmidtInner}(D, \operatorname{pinching}(\rho)) = 0$; expanding $\rho = \operatorname{pinching}(\rho) + D$ by bilinearity cancels both cross terms. Conjunct 2 expands the $\operatorname{Fin} 2$ matrix trace of $D^\dagger D$ and rewrites $\bar{z}z = \operatorname{normSq}(z)$. Conjunct 3 evaluates matrix equality at $(0, 1)$ and $(1, 0)$ in the forward direction, and performs exhaustive $\operatorname{Fin} 2$ case analysis on $(i, j)$ when $\rho_{01} = \rho_{10} = 0$ in the converse direction. The full proof is checked by the Lean kernel.
:::

[@thm-ch36-pinching-skeleton-and-discarded-coherence] lays bare the orthogonal ledger used by this observer model: the diagonal spine $\operatorname{pinching}(\rho)$ carries classical addressable persistence, while $\operatorname{offDiag}(\rho)$ carries cross-basis transverse reach. Pinching $\operatorname{offDiag}(\rho)$ to zero (Conjunct 3) freezes the state into a rigid classical ledger; conversely, in our angular observer model (`MODEL`), charging all the way to $\theta = 90^\circ$ drains the axial anchor $\cos\theta$ to zero, purchasing momentary wave breadth by exhausting the axial memory bias selected by this encoding.

**Pure light without a spine is only luminous amnesia; genuine awakening never burns its own ledger to ashes, but approaches the whole while keeping its self-referential anchor alive.**

---
