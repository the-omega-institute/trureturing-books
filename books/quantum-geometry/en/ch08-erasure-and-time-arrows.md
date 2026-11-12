# Chapter 8 The Cost of Erasure: Landauer's Principle and the Thermodynamic Arrow of Time {#ch08-erasure-and-time-arrows}

As the author of this monograph observes:

> *"Then in essence the field is time — or rather, linear time is merely the particle of the field, while the time wave corresponds to the area; as a whole it is a single field, and everything is a time field."*
>
> *"So everything is settled, without a single exception — even the structure of the observer works this way."*

In [Chapter 7](ch07-geometric-time-and-speed-limits.md), we uncovered the duality of time: the continuously sweeping two-dimensional bivector area $\vv{A}\wedge\vv{B}$ is **quantum time (the time wave)**, whereas the sequence of orthogonal ticks sliced out by an idempotent projector $P^2 = P$ is **classical time (the particle of linear time)**. As the author summarizes in the first epigraph above: *"linear time is merely the particle of the field, while the time wave corresponds to the area; as a whole it is a single field, and everything is a time field."*

Place these two faces of time side by side, however, and Loschmidt's classic reversibility paradox confronts us immediately: **if the underlying unitary rotation $U(t) = \exp((-it/\hbar)H_{\mathrm{op}})$ is $100\%$ reversible — reversed without residue by turning through the opposite angle $R(-\theta) = R(\theta)^\dagger$ — why do macroscopic experience and observer memory obey an unyielding, one-way thermodynamic arrow of time? Why can we remember yesterday but never tomorrow?**

Closing Part II (*Unfolding Wings — From Line to Plane*), this chapter settles the information-theoretic and thermodynamic ledger of flattening a two-dimensional area into a one-dimensional line through seven formal results verified in the Lean 4 kernel:

1. **Unitary rotation produces zero entropy; only basis pinching of off-diagonal area produces entropy**: Across any unitary rotation $U$ followed by computational-basis diagonal pinching $\Pi$, the system von Neumann entropy production $\Delta S_{\mathrm{pinch}} = S(\Pi(U\rho U^*)) - S(\rho)$ equals the exact quantum relative entropy of deleted coherence $D(U\rho U^* \,\|\, \Pi(U\rho U^*)) \ge 0$;
2. **No physical process makes two states more distinguishable**: for every completely positive, trace-preserving finite-dimensional quantum channel $\Phi$, $D(\Phi\rho \,\|\, \Phi\sigma) \le D(\rho \,\|\, \sigma)$ (the data processing inequality); unitary processes attain equality, which is why they are reversible;
3. **Flattening a $1$-bit orthogonal area produces $\ln 2$ nats of system entropy, kept cleanly distinct from non-unital Landauer reset**: Pinching a $d$-dimensional $Z$-record state in a mutually unbiased $X$-basis (a unital operation) drives it straight to the maximally mixed center $I_d/d$ at relative-entropy and von Neumann entropy-increase cost $\ln d - S(\rho)$ ($\ln 2 \approx 0.6931\text{ nats} = 1\text{ bit}$ for a pure qubit); how a subsequent non-unital reset step expels that system mixture into an external thermal bath is isolated in the thermodynamic literature notes [@rem-landauer-stage-b-statement-literature] and [@rem-landauer-thermodynamic-bridge-literature];
4. **Not even the observer is exempt**: Under the specified conjugated-overlap reversal protocol and restricted access, if the other copies are unimodular, the surviving overlap differs from $1$, and the selected $\rho_{ij} \neq 0$, that surviving copy blocks restoration of that selected coherence entry.

::: {.figure src="ch08-overview"}
**Figure 8.** The chapter at a glance. Panel I: two arrows $\rho$ and $\sigma$ with the same diagonal but different coherences sit at the same height; the partial trace removes their magenta sideways parts and both land on the same cyan point of the vertical axis. Panel II: the amber arrow $\lvert +\rangle$ is pinched, its magenta sideways part is removed and it shrinks to the cyan point at the centre, while the entropy column rises from $0$ to $\ln 2$. Panel III: under the conjugated-overlap reversal protocol specified in this section, the system is linked to five environment copies; four are rewound (cyan), and the one left over, $k$, is magenta. The other copies satisfy $|c_l| = 1$ ($l \neq k$), with $c_k \neq 1$ and $\rho_{01} \neq 0$, so the rewind gives only $c_k\rho_{01} \neq \rho_{01}$.
:::

## 8.1 Unitary Rotational Reversibility versus the Irreversibility of Information Erasure {#sec-unitary-reversibility-vs-erasure}

Why does a pure quantum gate rotation never generate an arrow of time? Because unitary conjugation $\rho \mapsto U\rho U^*$ rotates the Bloch ball rigidly: pure states remain on the spherical shell, interior ellipsoids keep their principal semi-axes, the eigenvalue spectrum of $\rho$ is invariant, and the von Neumann entropy $S(U\rho U^*) = -\Tr(U\rho U^* \ln(U\rho U^*)) = S(\rho)$ is strictly conserved!

When, then, is irreversible entropy born? At the exact instant when an observer — in order to register a definite classical tick along a line — performs a **diagonal pinching projection** $\Pi_P(\sigma) = \sum_k P_k \sigma P_k$ that discards the transverse exterior coherence blocks $P_j \sigma P_k$ ($j \neq k$) from the local ledger!

Let us first audit the sharpest case: complete erasure across **mutually unbiased bases (MUB)**. Suppose a $d$-dimensional system sits in a state $\rho$ already diagonal in a rank-one record basis $Z$ ($\Pi_Z(\rho) = \rho$). Now let an apparatus rotated by $90^\circ$ into a mutually unbiased rank-one record basis $X$ (where every pair of basis projectors has uniform overlap $|\langle z_j, x_k\rangle|^2 = \frac{1}{d}$) pinch $\rho$ into the unread state $\sigma = \Pi_X(\rho)$.

In the Lean module `Quantum/Divergence/DualAccountFull`, the **Dual Account Full Theorem** proves that pinching a $Z$-diagonal state in a mutually unbiased $X$-basis erases all prior bias in a single stroke, driving the state to the maximally mixed center $\omega = I_d / d$, while the Umegaki quantum relative entropy $D(\rho \,\|\, \sigma) := \Tr(\rho(\ln\rho - \ln\sigma))$ equals the exact von Neumann entropy increase $S(\sigma) - S(\rho) = \ln d - S(\rho)$!

::: {.figure src="ch08-mub-gap"}
**An unbiased pinch pushes the entropy all the way to $\ln 2$; the extra piece is exactly $D(\rho \,\|\, \sigma)$.** For $d = 2$: the horizontal axis is the height $r$ of a $Z$-diagonal state $\rho$ on the vertical axis, the arch is $S(\rho)$, and the dashed line on top is $S(\sigma) = \ln 2$ after pinching in the $X$ basis; the magenta region between them is $D(\rho \,\|\, \sigma) = \ln 2 - S(\rho)$. The amber point at the right end is the pure state $\lvert 0\rangle$, where the magenta piece is the whole $\ln 2$ ([@thm-dual-account-full]).
:::

::: {.theorem #thm-dual-account-full title="Dual-Account Relative Entropy and Maximal Entropy Production Across Mutually Unbiased Record Bases" lean="D5/S3/Quantum/Divergence/DualAccountFull.dual_account_full"}
Let $d \in \mathbb{N}$ satisfy $d \ge 1$ (`[NeZero d]`), and let $Z, X : \mathrm{RankOneContext}\,d$ be two rank-one measurement contexts whose projector families are complete orthogonal record measurements (`IsRecordMeasurement Z.projector`, `IsRecordMeasurement X.projector`) satisfying mutual unbiasedness:

$$
\forall j, k \in \mathrm{Fin}\,d, \qquad \operatorname{overlap}(Z, X, j, k) = \frac{1}{d}.
$$

Let $\rho, \sigma : \mathrm{DensityState}\,(\mathrm{Fin}\,d)$ be density states such that $\rho$ is diagonal in the $Z$ basis ($\operatorname{unreadState}(Z.\mathrm{projector}, \rho) = \rho$) and $\sigma$ is the unread state of $\rho$ pinched in the $X$ basis ($\operatorname{unreadState}(X.\mathrm{projector}, \rho) = \sigma$). Write $\omega := \operatorname{gibbsState}(0) = \frac{1}{d}I_d$ for the maximally mixed state. Then all five statements hold:

1. **Mutually unbiased pinching reaches the maximally mixed center**: $\sigma = \omega$;
2. **Relative-entropy reference equivalence**: $D(\rho \,\|\, \sigma) = D(\rho \,\|\, \omega)$;
3. **Entropy-freedom identity**: $D(\rho \,\|\, \sigma) = \ln d - S(\rho)$ (paired with $0 \le S(\rho) \le \ln d$ and $D(\rho \,\|\, \sigma) \ge 0$ in [`entropy_freedom_segment`](lean:D5/S3/Quantum/Divergence/DualAccountFull.entropy_freedom_segment));
4. **Equality of relative entropy and von Neumann entropy production**:
   $$
   S(\sigma) - S(\rho) = D(\rho \,\|\, \sigma);
   $$
5. **Uniqueness of the cross-basis fixed point**: $\operatorname{unreadState}(X.\mathrm{projector}, \rho) = \rho \iff \rho = \omega$.
:::

::: proof
Because $\rho$ is diagonal in the rank-one basis $Z$, it expands as $\rho = \sum_j p_j Z_j$ with $\sum_j p_j = 1$. Pinching in the $X$ basis assigns to channel $k$ the weight $\sum_j p_j \operatorname{overlap}(Z, X, j, k) = \sum_j p_j \frac{1}{d} = \frac{1}{d}$; summing over $\sum_k X_k = I_d$ yields $\sigma = \frac{1}{d}I_d = \omega$ (claim 1), whence $D(\rho \,\|\, \sigma) = D(\rho \,\|\, \omega)$ (claim 2). Evaluating the relative entropy against $\omega = \frac{1}{d}I_d$ gives $-\Tr(\rho\ln\omega) = \ln d \cdot \Tr(\rho) = \ln d = S(\omega)$, so $D(\rho \,\|\, \omega) = \ln d - S(\rho) = S(\omega) - S(\rho) = S(\sigma) - S(\rho)$ (claims 3 and 4). Finally, if $\rho$ is fixed by $X$-pinching as well, then $\rho = \sigma = \omega$, while $\omega = \frac{1}{d}I_d$ is trivially fixed by any complete projective pinching (claim 5). The full proof is checked by the Lean kernel.
:::

Specialize [@thm-dual-account-full] to a single qubit ($d = 2$) starting in a pure record state ($S(\rho) = 0$): pinching in a mutually unbiased basis raises the system's von Neumann entropy from $0$ to $\ln 2$, converting the deleted coherence area into

$$
\Delta S_{\mathrm{pinch}} = S(\sigma) - S(\rho) = D(\rho \,\|\, \omega) = \ln 2 \text{ nats} \;\;(1\text{ bit})!
$$

::: {.viz src="erasure-ledger" preset="pinch" height="500"}
**Turn, then pinch: ln 2 more entropy.** During the 90° turn the amber arrow swings from |0⟩ to lying flat and the “system S” column on the right does not move; at the pinch the magenta sideways part is wiped out, the arrow shrinks to the centre, the entropy column rises to the dashed ln 2 line, and the heat paid is still 0 ([@thm-dual-account-full]).
:::

**Not only pinching: no process makes two states more distinguishable.** [@thm-dual-account-full] keeps the ledger for one particular operation, basis pinching. Widen the question. Send two states $\rho$ and $\sigma$ through the same physical process (noise, a measurement whose result is thrown away, a coupling to an environment that is then discarded). What happens to the relative entropy between them? The answer is the same for **every** finite-dimensional quantum channel: it can only go down.

::: {.theorem #thm-channel-data-processing title="The Data Processing Inequality: Quantum Channels Do Not Increase Relative Entropy" lean="D5/S3/Quantum/Divergence/CanonicalChannelDPI.extended_quantum_relative_entropy_channel_dpi"}
Let $a$ and $b$ be nonempty finite index sets and $\Phi$ a finite-dimensional quantum channel from complex $a \times a$ matrices to complex $b \times b$ matrices, that is, a completely positive, trace-preserving linear map. For density states (positive semidefinite matrices of trace $1$) $\rho$ and $\sigma$ on $a$, write the relative entropy with its support convention as

$$
D(\rho \,\|\, \sigma) =
\begin{cases}
\operatorname{Tr}\bigl(\rho(\log\rho - \log\sigma)\bigr), & \operatorname{supp}\rho \subseteq \operatorname{supp}\sigma, \\
+\infty, & \text{otherwise},
\end{cases}
$$

where $\log$ is the natural logarithm (taken as $0$ on zero eigenvalues) and $\operatorname{supp}\rho \subseteq \operatorname{supp}\sigma$ means that every vector annihilated by $\sigma$ is also annihilated by $\rho$. Then

$$
D\bigl(\Phi(\rho) \,\|\, \Phi(\sigma)\bigr) \le D(\rho \,\|\, \sigma).
$$
:::

::: proof
If the support of $\rho$ is not inside that of $\sigma$, the right-hand side is $+\infty$ and there is nothing to prove. Otherwise Lean writes the channel in Kraus form $\Phi(X) = \sum_c K_c X K_c^\dagger$ ($\sum_c K_c^\dagger K_c = I$) and puts the spectra of the two states together into Petz's "relative modular operator" data. On each side, the relative entropy becomes minus the quadratic form, on a unit vector, of the logarithm of a diagonal "ratio operator" (ratios of eigenvalues). The Kraus operators assemble into a contraction $V$ ($V^\dagger V \le I$) that carries the unit vector of one side to that of the other and, sandwiching the two ratio operators, satisfies an operator inequality. The logarithm is operator monotone and operator concave, so the contraction cannot push one quadratic form past the other; changing sign gives the theorem. The full proof is checked by the Lean kernel.
:::

Two consequences follow from the theorem by hand:

- **Unitary processes keep relative entropy (manual derivation).** $\rho \mapsto U\rho U^\dagger$ is a channel, and so is its inverse $\rho \mapsto U^\dagger\rho U$. Applying [@thm-channel-data-processing] in both directions gives $D(U\rho U^\dagger \,\|\, U\sigma U^\dagger) \le D(\rho \,\|\, \sigma) \le D(U\rho U^\dagger \,\|\, U\sigma U^\dagger)$, so equality holds. Not a bit of distinguishability is lost, which is exactly what §8.1 means by "reversible".
- **A quantum H-theorem (manual derivation).** If a channel has a fixed state, $\Phi(\sigma) = \sigma$, then for every $\rho$, $D(\Phi^{n+1}\rho \,\|\, \sigma) = D(\Phi(\Phi^n\rho) \,\|\, \Phi(\sigma)) \le D(\Phi^n\rho \,\|\, \sigma)$: repeating the same process never lets the relative entropy to the fixed state climb back up.

::: {.example #ex-channel-data-processing-qubit title="One Qubit: Relative Entropy Under Depolarizing, Pinching and Rotation"}
Natural logarithms throughout; values are rounded to the digits shown and computed directly from eigendecompositions of $2 \times 2$ matrices.

**Depolarizing towards $I/2$.** Take $\rho = \operatorname{diag}(0.9, 0.1)$ (Bloch vector $(0, 0, 0.8)$) and $\sigma = I/2$. The depolarizing channel $\Phi_\lambda(X) = \lambda X + (1 - \lambda)\operatorname{Tr}(X)\, I/2$ shrinks Bloch vectors by the factor $\lambda$ and leaves $I/2$ fixed. Since $D(\rho \,\|\, I/2) = \ln 2 - S(\rho)$ (manual derivation),

| $\lambda$ | $1$ | $0.75$ | $0.5$ | $0.25$ | $0$ |
| :--- | ---: | ---: | ---: | ---: | ---: |
| $D(\Phi_\lambda\rho \,\|\, I/2)$ | $0.3681$ | $0.1927$ | $0.0823$ | $0.0201$ | $0$ |

Applying $\Phi_{1/2}$ again and again, $n = 0, 1, 2, 3, 4$ times, gives $0.36806$, $0.08228$, $0.02014$, $0.00501$, $0.00125$: the quantum H-theorem above.

**From infinity to finite.** $\lvert 0\rangle\langle 0\rvert$ and $\lvert +\rangle\langle +\rvert$ are two different pure states whose supports do not contain each other, so their relative entropy is $+\infty$. After depolarizing, both have full rank and the relative entropy is finite: $1.325$ at $\lambda = 0.9$, $0.2747$ at $\lambda = 0.5$, $0.0100$ at $\lambda = 0.1$.

**Pinching can erase every difference.** $\lvert +\rangle\langle +\rvert$ and $\lvert -\rangle\langle -\rvert$ are also at $+\infty$; pinched in the $Z$ basis (keeping only the diagonal) both become $I/2$, and the relative entropy is $0$: an observer who records only $Z$-basis readings can no longer tell them apart.

**Rotation keeps it, pinching lowers it.** For two general states with Bloch vectors $(0.3, 0.2, 0.5)$ and $(-0.1, 0.4, 0.2)$, the relative entropy is $0.1602$; after a rotation by $0.7$ radians about the $y$-axis it is still $0.1602$; after pinching in the $Z$ basis it drops to $0.0499$.
:::

The following are **literature results, not formalized in this book**:

- the monotonicity was first proved by G. Lindblad (1975) for completely positive trace-preserving maps and by A. Uhlmann (1977) in a more general setting;
- the quantum Stein lemma gives relative entropy its operational meaning as the optimal error exponent for telling $\rho$ from $\sigma$, so "$D$ only goes down" reads "no preprocessing makes the hypothesis test easier";
- the monotonicity also holds for trace-preserving maps that are merely positive, not completely positive (A. Müller-Hermes and D. Reeb, 2017).

> A process can only erase differences, never create them.

## 8.2 Two-Stage Geometric Picture of Coherence-Deletion Entropy Production and Landauer's Principle {#sec-landauer-principle-geometry}

A complete cycle of "unread measurement followed by register reset" starting from a pure superposition comprises two distinct stages, separating **Stage A (unital basis pinching / coherence deletion, formalized in this book)** cleanly from **Stage B (non-unital logical reset / bath heat dissipation in the physics literature)**:

- **Stage A (Unital basis pinching / coherence deletion, formalized in our Lean modules)**: A reversible unitary gate $U$ rotates a state into $\rho_U := U\rho U^*$ ([`unitaryConjugateState`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.unitaryConjugateState)) at zero entropy cost ($S(\rho_U) = S(\rho)$); computational-basis diagonal pinching $\Pi(\rho_U) := \operatorname{basisPinchingState}(\rho_U)$ ([`basisPinchingState`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.basisPinchingState), whose diagonal entropy expansion is given by [`von_neumann_entropy_basisPinchingState`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.von_neumann_entropy_basisPinchingState)) then crushes the two-dimensional transverse coherence area flat onto the diagonal. Stage A ([@thm-entropy-production-coherence-deletion], [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)) establishes the **dimensionless system von Neumann entropy increase** $\Delta S_{\mathrm{pinch}} = S(\Pi(\rho_U)) - S(\rho) = D(\rho_U \,\|\, \Pi(\rho_U)) \ge 0$ ($+\ln 2$ nats for $\lvert +\rangle\langle +\rvert \mapsto \frac{1}{2}I_2$) under unital computational-basis pinching ($\Pi(I_n) = I_n$); this formal theorem does not specify a system Hamiltonian, thermal bath, or Landauer reset heat cost (see [@rem-landauer-thermodynamic-bridge-literature]).

::: {.remark #rem-landauer-stage-b-statement-literature title="Stage B: Landauer's Principle and Finite-Bath Reset Heat Dissipation (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** In 1961, Rolf Landauer formulated **Landauer's principle**: *information is physical*, and irreversibly erasing $1$ bit of information in an environment at temperature $T$ must dissipate at least $\Delta Q \ge k_B T \ln 2$ of heat. In **Stage B (non-unital logical reset / Landauer heat dissipation; detailed citations in [@rem-landauer-thermodynamic-bridge-literature])**, resetting the pinched mixed register ($\frac{1}{2}I_2$, $S = \ln 2$) back to a pure reference state $\lvert 0\rangle\langle 0\rvert$ ($S = 0$) for reuse compresses the system's entropy by $\Delta S_S := S(\rho_{\mathrm{init}}) - S(\rho_{\mathrm{final}}) = +\ln 2$. By Landauer's principle and the Reeb–Wolf finite-bath identity $\beta\Delta Q_{\mathrm{bath}} = \Delta S_S + I(S':E') + D(\rho_E'\,\|\,\rho_E) \ge \Delta S_S$, the $\ln 2$ nats of mixture generated by Stage A coherence deletion must ultimately be expelled during Stage B reset as at least $Q_L = k_B T \ln 2$ of heat into a thermal bath at temperature $T$.
:::

In the Lean module `Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity`, the diagonal functional-calculus theorems [`cfc_diagonal`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.cfc_diagonal), [`cfc_log_diagonal`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.cfc_log_diagonal), and [`von_neumann_entropy_basisPinchingState`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.von_neumann_entropy_basisPinchingState) culminate in the main theorem below: **along any discrete trajectory $\rho(k+1) = \Pi(U\rho(k)U^*)$ generated by alternating unitary conjugation $U$ and computational-basis pinching $\Pi$, each step's von Neumann entropy increase equals the quantum relative entropy of deleted coherence $D\bigl(\rho_U(k) \,\big\|\, \Pi(\rho_U(k))\bigr) \ge 0$, and the cumulative $N$-step entropy production equals the sum of single-step coherence-deletion divergences!**

::: {.theorem #thm-entropy-production-coherence-deletion title="Single-Step and Cumulative Entropy Production of Unitary Evolution Followed by Basis Pinching" lean="D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity"}
Let $n$ be a finite index type with decidable equality (`[Fintype n] [DecidableEq n]`), let $U \in U(n, \mathbb{C})$ be a unitary matrix (`hU : U ∈ Matrix.unitaryGroup n ℂ`), and let $\rho : \mathbb{N} \to \mathrm{DensityState}\,n$ be a discrete-time sequence of density states. Write $\rho_U(k) := \operatorname{unitaryConjugateState}(U, h_U, \rho(k))$ ([`unitaryConjugateState`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.unitaryConjugateState)) for the unitarily evolved state at step $k$ and $\Pi := \operatorname{basisPinchingState}$ ([`basisPinchingState`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.basisPinchingState)) for computational-basis diagonal pinching. If the trajectory obeys the step recursion

$$
\forall k \in \mathbb{N}, \qquad \rho(k + 1) = \Pi\bigl(\rho_U(k)\bigr),
$$

then both the single-step and cumulative $N$-step entropy-production identities hold:

1. **Single-step coherence-deletion identity and nonnegativity**: for every step $k \in \mathbb{N}$,
   $$
   S\bigl(\rho(k + 1)\bigr) - S\bigl(\rho(k)\bigr) = D\Bigl(\rho_U(k) \,\Big\|\, \Pi\bigl(\rho_U(k)\bigr)\Bigr) \qquad\text{and}\qquad 0 \le D\Bigl(\rho_U(k) \,\Big\|\, \Pi\bigl(\rho_U(k)\bigr)\Bigr);
   $$
2. **Cumulative $N$-step telescoping identity**: for every horizon $N \in \mathbb{N}$,
   $$
   S\bigl(\rho(N)\bigr) - S\bigl(\rho(0)\bigr) = \sum_{k \in \mathrm{Finset.range}\,N} D\Bigl(\rho_U(k) \,\Big\|\, \Pi\bigl(\rho_U(k)\bigr)\Bigr).
   $$
:::

::: proof
For any step state $\sigma = \rho(k)$, unitary conjugation preserves the eigenvalue spectrum and thus von Neumann entropy: $S(\rho_U(k)) = S(\rho(k))$. Next, by the diagonal logarithm functional calculus [`cfc_log_diagonal`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.cfc_log_diagonal) and the pinched-state entropy formula [`von_neumann_entropy_basisPinchingState`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.von_neumann_entropy_basisPinchingState), computational-basis diagonal pinching $\Pi = \operatorname{basisPinchingState}$ satisfies the diagonal projection trace identity $\Tr\bigl(\rho_U(k)\ln\Pi(\rho_U(k))\bigr) = \Tr\bigl(\Pi(\rho_U(k))\ln\Pi(\rho_U(k))\bigr) = -S\bigl(\Pi(\rho_U(k))\bigr)$, which yields $D\bigl(\rho_U(k) \,\big\|\, \Pi(\rho_U(k))\bigr) = S\bigl(\Pi(\rho_U(k))\bigr) - S(\rho_U(k))$. Combining this with $S(\rho_U(k)) = S(\rho(k))$ and the step recursion $\rho(k+1) = \Pi(\rho_U(k))$ gives the single-step identity $S(\rho(k+1)) - S(\rho(k)) = D\bigl(\rho_U(k) \,\big\|\, \Pi(\rho_U(k))\bigr)$, while concavity of the logarithm (Klein's inequality) guarantees $0 \le D\bigl(\rho_U(k) \,\big\|\, \Pi(\rho_U(k))\bigr)$ (claim 1). Finally, induction over $N \in \mathbb{N}$ telescopes $\sum_{k=0}^{N-1} \bigl(S(\rho(k+1)) - S(\rho(k))\bigr) = S(\rho(N)) - S(\rho(0))$, establishing claim 2. The full proof is checked by the Lean kernel.
:::

For the unread-pinching model considered in this chapter, this is the geometric ledger behind the Second Law in quantum mechanics: **every irreversible pinching entropy increase is the exact geometric remainder $D\bigl(\rho_U(k) \,\big\|\, \Pi(\rho_U(k))\bigr) \ge 0$ sliced off when a two-dimensional oriented area $\vv{A}\wedge\vv{B}$ is flattened onto a one-dimensional diagonal line!**

::: {.viz src="erasure-ledger" preset="steps" height="500"}
**Pinching step by step: each block of entropy is that step's D.** Turn by 50° and pinch, three times over: the amber arrow drops step by step onto the cyan record line and gets shorter; the entropy column stacks up block by block, each block marked D₁, D₂, D₃, and together they make the total rise ([@thm-entropy-production-coherence-deletion]).
:::

::: {.example #ex-landauer-one-bit-ledger title="Two-Stage 1-Bit (ln 2) Ledger: Hadamard Wave Creation, Unital Z-Basis Pinching, and Non-Unital Landauer Reset"}
Follow a single qubit starting at the pure north pole $\rho_0 = \lvert 0\rangle\langle 0\rvert$, rotated by Hadamard $H = \frac{1}{\sqrt{2}}(X + Z)$ to the equatorial superposition $\rho_H = H\rho_0 H^* = \lvert +\rangle\langle +\rvert$, pinched in the computational $Z$ basis to $\Pi(\rho_H) = \frac{1}{2}I_2$, and finally reset to $\lvert 0\rangle\langle 0\rvert$ in a room-temperature bath:

1. **Unitary preparation (Hadamard rotation $\rho_0 \mapsto \rho_H$)**:
   $$
   \rho_0 = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} \;\xrightarrow{\;H\,\cdot\,H^*\;}\; \rho_H = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}.
   $$
   Unitary rotation preserves the eigenvalue spectrum and is isentropic: $S(\rho_H) = S(\rho_0) = 0$, purity remains $\Tr(\rho_H^2) = 1$, and off-diagonal coherence $\rho_{01} = \rho_{10} = \frac{1}{2}$ is opened.
2. **Stage A (Unital computational-basis pinching $\rho_H \mapsto \Pi(\rho_H) = \frac{1}{2}I_2$, Lean-formalized)**:
   - **Hilbert–Schmidt coherence mass ([@cor-pinching-pythagorean])**: Total squared norm $\langle\rho_H, \rho_H\rangle_{\mathrm{HS}} = 1$ splits orthogonally into diagonal population norm $\langle\Pi(\rho_H), \Pi(\rho_H)\rangle_{\mathrm{HS}} = (\frac{1}{2})^2 + (\frac{1}{2})^2 = \frac{1}{2}$ and discarded off-diagonal coherence mass $|\rho_{01}|^2 + |\rho_{10}|^2 = (\frac{1}{2})^2 + (\frac{1}{2})^2 = \frac{1}{2}$;
   - **System von Neumann entropy production ([@thm-dual-account-full] & [@thm-entropy-production-coherence-deletion])**: Unital pinching deletes the off-diagonal coherence area and raises the **system's own** dimensionless von Neumann entropy by
     $$
     \Delta S_{\mathrm{pinch}} = S\bigl(\Pi(\rho_H)\bigr) - S(\rho_0) = D\Bigl(\lvert +\rangle\langle +\rvert \,\Big\|\, \frac{1}{2}I_2\Bigr) = \ln 2 \approx 0.693147\text{ nats} = 1\text{ bit}.
     $$
3. **Stage B (Non-unital logical reset $\frac{1}{2}I_2 \mapsto \lvert 0\rangle\langle 0\rvert$ at $T = 300\text{ K}$; literature result, not formalized in this book — see [@rem-landauer-thermodynamic-bridge-literature])**:
   Compressing the maximally mixed register $\frac{1}{2}I_2$ ($S = \ln 2$) back to the pure reference state $\lvert 0\rangle\langle 0\rvert$ ($S = 0$) reduces system entropy by $\Delta S_S = S(\frac{1}{2}I_2) - S(\lvert 0\rangle\langle 0\rvert) = +\ln 2$. The Landauer heat lower bound for ideal one-bit reset is $Q_L = k_B T\ln 2$; pure-state reset and saturation are ideal limits and cannot be realized exactly in the stated finite Gibbs-bath model. With Boltzmann's constant $k_B \approx 1.380649 \times 10^{-23}\text{ J/K}$ at $T = 300\text{ K}$, this bound evaluates to:
   $$
   Q_L = k_B T \ln 2 \approx (1.380649 \times 10^{-23}\text{ J/K}) \times (300\text{ K}) \times 0.693147 \approx 2.87 \times 10^{-21}\text{ J}\;(\approx 17.9\text{ meV}).
   $$
:::

::: {.viz src="erasure-ledger" preset="cycle" height="500"}
**Two stages: entropy goes into the system, then out as heat.** In stage A (turn by 90°, then pinch) the entropy column rises to ln 2 while the heat stays 0; in stage B the ideal reset pulls the arrow back to |0⟩, the entropy column drops to 0, and the heat paid rises to ln 2, just touching the “floor” line. The heat of stage B is a literature result, and the “ideal reset” is the limit in which the bound is attained; see [@rem-landauer-thermodynamic-bridge-literature].
:::

::: {.remark #rem-density-matrix-balance-inputs-literature title="Density-Matrix Reservoir and Unitary Balances (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Stage B of [@ex-landauer-one-bit-ledger] quoted the inequality $\beta\Delta Q_{\mathrm{bath}} \ge \Delta S_S$, which rests on a three-line density-matrix ledger (see [@rem-landauer-thermodynamic-bridge-literature] for references):

- **Reservoir balance (literature input)**: the heat absorbed by the reservoir (times the inverse temperature) equals the entropy change of the reservoir plus the relative entropy by which the reservoir is pushed out of equilibrium, $\beta Q = \Delta S_{\mathrm{res}} + D$;
- **Unitary balance (literature input)**: system and reservoir start uncorrelated and evolve jointly by a unitary, so the final mutual information equals the sum of the two entropy changes, $I = \Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{res}}$;
- **Algebraic consequence**: eliminating $\Delta S_{\mathrm{res}}$ gives $\beta Q = -\Delta S_{\mathrm{sys}} + I + D$ (where $\Delta S_{\mathrm{sys}}$ is final minus initial system entropy, so $-\Delta S_{\mathrm{sys}}$ matches $\Delta S_S$ in [@ex-landauer-one-bit-ledger]).
:::

Taking the first two balances in [@rem-density-matrix-balance-inputs-literature] as real-number hypotheses, the algebraic deduction of the third line, the lower bound, and its equality condition is frozen in Lean.

::: {.proposition #prop-landauer-identity-from-balances title="The Heat–Entropy–Information Identity from the Reservoir and Unitary Balances" lean="D5/S3/DivergenceSupport/LandauerIdentity.landauer_identity_from_balances"}
Let $\beta$, $Q$, $\Delta S_{\mathrm{sys}}$, $\Delta S_{\mathrm{res}}$, $I$, $D$ be real numbers (in Lean, in this order: `beta`, `heat`, `systemEntropyChange`, `reservoirEntropyChange`, `mutualInformation`, `reservoirDivergence`). If

1. **Reservoir balance (`hReservoir`)**: $\beta\,Q = \Delta S_{\mathrm{res}} + D$;
2. **Unitary balance (`hUnitary`)**: $I = \Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{res}}$;

then

$$
\beta\,Q \;=\; -\Delta S_{\mathrm{sys}} + I + D .
$$
:::

::: proof
Solve `hUnitary` for $\Delta S_{\mathrm{res}} = I - \Delta S_{\mathrm{sys}}$ and substitute into `hReservoir`; in Lean this is done by linear arithmetic (`linarith`). The source file also contains two counterexamples showing that the conclusion can fail when either hypothesis is dropped. The full proof is checked by the Lean kernel.
:::

::: {.corollary #cor-landauer-bound-saturation title="The Landauer Lower Bound with Its Criteria for Equality and Strictness" lean="D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance D5/S3/DivergenceSupport/LandauerSaturation.landauer_saturation_iff D5/S3/DivergenceSupport/LandauerSaturation.landauer_strict_iff"}
Let $\beta$, $Q$, $\Delta S$, $I$, $D$ be real numbers (in Lean, in this order: `beta`, `heat`, `entropyChange`, `mutualInfo`, `divergence`) satisfying

- **Balance (`hbalance`)**: $\beta\,Q = -\Delta S + I + D$;
- **Nonnegativity (`hmutualInfo`, `hdivergence`)**: $0 \le I$ and $0 \le D$.

Then all three of the following hold:

1. **Lower bound**: $-\Delta S \le \beta\,Q$;
2. **Criterion for equality**: $-\Delta S = \beta\,Q$ if and only if $I = 0$ and $D = 0$;
3. **Criterion for strictness**: $-\Delta S < \beta\,Q$ if and only if $0 < I + D$.
:::

::: proof
The balance says that the slack $\beta Q - (-\Delta S)$ equals $I + D$ exactly (`landauer_slack_of_balance`). Both terms are nonnegative, so the slack is nonnegative, which is claim 1 (`landauer_bound_of_balance`). The slack vanishes if and only if $I + D = 0$; when both terms are nonnegative this is equivalent to $I = 0$ and $D = 0$ (`add_eq_zero_iff_of_nonneg`), which is claim 2 (`landauer_saturation_iff`). Claim 3 combines claim 1 with "the slack is nonzero" (`landauer_strict_iff`). The full proof is checked by the Lean kernel.
:::

[@prop-landauer-identity-from-balances] and [@cor-landauer-bound-saturation] are statements about real numbers only: they do not know that $Q$ is heat or that $I$ is mutual information. What they guarantee is that the bookkeeping itself cannot go wrong: whenever the two balances hold and the two remainders are nonnegative, the lower bound and the equality condition follow. The step that replaces the letters by physical quantities is still carried by the literature.

When does the Landauer bound fail to be attained? Claim 2 of [@cor-landauer-bound-saturation] gives the criterion: either correlations are left between system and reservoir ($I > 0$), or the reservoir has been pushed out of equilibrium ($D > 0$). Let us run the ledger once with the smallest reservoir one can think of.

::: {.figure src="ch08-bath-excess"}
**The cleaner one reservoir qubit erases, the faster the excess $D$ grows, while the entropy drop is capped at $\ln 2$.** Each bar is a row of the table in the example below: its full height is the heat $\beta Q$ (the number on top), the grey part is the system's entropy drop $-\Delta S_{\mathrm{sys}}$, the dashed box the reservoir's relative entropy $D$, and $I = 0$. The grey parts approach the dashed $\ln 2$ line without crossing it, while the dashed boxes keep growing. Numerical values; the two balances are a literature result, not formalized in this book, and the ledger identity is [@prop-landauer-identity-from-balances].
:::

::: {.example #ex-one-qubit-reservoir-swap-erasure title="Erasing with a Single Reservoir Qubit: The Excess Heat of a Finite Reservoir"}
Each of the two density-matrix balances in this example is a **literature result, not formalized in this book**; every number is computed directly from the definitions and cross-checked against the identity of [@prop-landauer-identity-from-balances]. Entropies are in nats.

**Model.** The system is a maximally mixed qubit $\rho_S = \frac12 I_2$. The reservoir is also a single qubit, in the Gibbs state $\rho_E = \operatorname{diag}(p,\, 1 - p)$, where $p > \frac12$ is the ground-state population and the level spacing $E$ satisfies $\beta E = \ln\frac{p}{1-p}$. The joint unitary is the SWAP gate: afterwards the system holds $\operatorname{diag}(p, 1-p)$, the reservoir holds $\frac12 I_2$, and the two are still in a product state.

**Term by term.** Write the binary entropy as $h(p) = -p\ln p - (1-p)\ln(1-p)$.

- System entropy change: $\Delta S_{\mathrm{sys}} = h(p) - \ln 2 < 0$, an entropy decrease of $\ln 2 - h(p)$;
- Reservoir entropy change: $\Delta S_{\mathrm{res}} = \ln 2 - h(p)$;
- Final mutual information: $I = 0$ (the final state is a product), in agreement with the unitary balance $I = \Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{res}}$;
- Reservoir relative entropy: $D = D\bigl(\tfrac12 I_2 \,\big\|\, \rho_E\bigr) = -\ln 2 - \tfrac12\ln\bigl(p(1-p)\bigr)$;
- Heat: the excited-state population of the reservoir rises from $1 - p$ to $\frac12$, so $\beta Q = \beta E\,\bigl(\tfrac12 - (1 - p)\bigr) = \bigl(p - \tfrac12\bigr)\ln\frac{p}{1-p}$, which expands to $-h(p) - \tfrac12\ln\bigl(p(1-p)\bigr)$, in agreement with the reservoir balance $\beta Q = \Delta S_{\mathrm{res}} + D$.

**Numbers.**

| ground population $p$ | entropy decrease $-\Delta S_{\mathrm{sys}}$ | mutual information $I$ | relative entropy $D$ | heat $\beta Q$ | $\beta Q / (-\Delta S_{\mathrm{sys}})$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $0.6$ | $0.0201$ | $0$ | $0.0204$ | $0.0405$ | $2.01$ |
| $0.75$ | $0.1308$ | $0$ | $0.1438$ | $0.2747$ | $2.10$ |
| $0.9$ | $0.3681$ | $0$ | $0.5108$ | $0.8789$ | $2.39$ |
| $0.99$ | $0.6371$ | $0$ | $1.6145$ | $2.2516$ | $3.53$ |
| $0.999$ | $0.6852$ | $0$ | $2.7612$ | $3.4465$ | $5.03$ |

Every row satisfies $\beta Q = -\Delta S_{\mathrm{sys}} + I + D$ and the Landauer lower bound, and in every row the inequality is strict: since $D > 0$, claim 3 of [@cor-landauer-bound-saturation] rules out equality.

**Reading.** The cleaner the erasure is meant to be ($p \to 1$, the final system state approaching the pure state $\lvert 0\rangle\langle 0\rvert$), the closer the entropy decrease comes to its ceiling $\ln 2 \approx 0.6931$, while the excess term $D$ grows without bound. With one reservoir qubit and one swap, a bit cannot be erased at the price $k_B T\ln 2$; the dimensionless excess heat $\beta Q-(\ln 2-h(p))$ equals $D$, so the corresponding excess physical heat is $k_B T D$. Approaching the Landauer bound requires both $D$ and $I$ to tend to zero, which calls for a larger reservoir and a slower process.
:::

::: {.viz src="erasure-ledger" preset="bath" height="500"}
**One reservoir qubit: the extra is D.** The arrow is first pinched to the centre, then swapped with a bath qubit at p = 0.9: it climbs back only to height 0.8, an entropy decrease of 0.368; the heat paid is 0.879, above the “floor” line by the hatched piece of 0.511, the D by which the bath qubit in the small disc is pushed from its equilibrium (the open ring) to the centre. Dragging the population p reproduces the table above row by row ([@cor-landauer-bound-saturation]).
:::

## 8.3 Observer Memory and the Arrow of Time: Why "Remembering the Past" Must Consume Free Energy {#sec-observer-memory-time-arrow}

Now turn the lens onto the **observer's own memory register**, confirming the second epigraph of this chapter: *"So everything is settled, without a single exception — even the structure of the observer works this way."*

In the Lean module `Quantum/Decoherence/CanonicalRecordAccessRecovery`, theorems [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior) and [`reduced_irreversibility_is_canonical_record_access_defect`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect) establish global unitary reversibility alongside local partial-trace non-recoverability for the canonical copied-address joint state $R_{\mathrm{canon}}(\tau) := \operatorname{controlledRecordJointState}(\mathrm{copiedAddressRecord}, \tau)$:

::: {.theorem #thm-reduced-irreversibility-access-defect title="Canonical Controlled-Record Marginal Coincidence and Impossibility of Local Recovery" lean="D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect"}
Let $\rho, \sigma \in M_2(\mathbb{C})$ (`QubitMatrix`) be two single-qubit matrices with identical diagonal entries ($\forall i \in \mathrm{Fin}\,2,\, \rho_{ii} = \sigma_{ii}$) but distinct off-diagonal coherence ($\exists i, j \in \mathrm{Fin}\,2,\, i \neq j \land \rho_{ij} \neq \sigma_{ij}$). Write $U_{\mathrm{copy}} := \mathrm{copyUnitary}$ for the controlled address-copy unitary, $B(\tau) := \operatorname{blankEnvironmentJointState}(\tau)$ for the blank-environment embedding, $R_{\mathrm{canon}}(\tau) := \operatorname{controlledRecordJointState}(\mathrm{copiedAddressRecord}, \tau)$ for the canonical copied-address joint state ([`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior)), and $\Tr_{\mathrm{env}} := \mathrm{traceEnvironment}$ for the environment partial trace. Then all six groups (eight conjuncts) of statements hold:

1. **Global unitarity**: $U_{\mathrm{copy}} \in U(\mathrm{Fin}\,2 \times \mathrm{Fin}\,2, \mathbb{C})$;
2. **Forward unitary writing of canonical records**: $\operatorname{unitaryEvolution}(U_{\mathrm{copy}}, B(\rho)) = R_{\mathrm{canon}}(\rho)$ and $\operatorname{unitaryEvolution}(U_{\mathrm{copy}}, B(\sigma)) = R_{\mathrm{canon}}(\sigma)$;
3. **Coincidence of reduced marginals**:
   $$
   \Tr_{\mathrm{env}}\bigl(R_{\mathrm{canon}}(\rho)\bigr) = \Tr_{\mathrm{env}}\bigl(R_{\mathrm{canon}}(\sigma)\bigr);
   $$
4. **Global joint records remain distinct**: $R_{\mathrm{canon}}(\rho) \neq R_{\mathrm{canon}}(\sigma)$;
5. **No reduced-state recovery map**: there exists no recovery map $\mathcal{R} : M_2(\mathbb{C}) \to M_{\mathrm{Fin}\,2 \times \mathrm{Fin}\,2}(\mathbb{C})$ on the reduced system state alone satisfying both $\mathcal{R}\bigl(\Tr_{\mathrm{env}}(R_{\mathrm{canon}}(\rho))\bigr) = R_{\mathrm{canon}}(\rho)$ and $\mathcal{R}\bigl(\Tr_{\mathrm{env}}(R_{\mathrm{canon}}(\sigma))\bigr) = R_{\mathrm{canon}}(\sigma)$;
6. **Exact global unitary reversal**: $\operatorname{unitaryEvolution}(U_{\mathrm{copy}}^*, R_{\mathrm{canon}}(\rho)) = B(\rho)$ and $\operatorname{unitaryEvolution}(U_{\mathrm{copy}}^*, R_{\mathrm{canon}}(\sigma)) = B(\sigma)$.
:::

::: proof
By [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior), the canonical copied-address record `copiedAddressRecord` coincides with the permutation-copy record `priorCopiedRecord` of [@thm-reduced-access-defect] (`reduced_state_irreversibility_is_record_access_defect`), from which all eight conjuncts follow directly by rewriting. In particular, for claim 3, because the two branch records of `copiedAddressRecord` are orthogonal (Kronecker-delta overlap $\delta_{ij}$), tracing out the environment $\Tr_{\mathrm{env}}(R_{\mathrm{canon}}(\tau))$ zeroes out off-diagonal entries and retains the diagonal $\tau_{ii}$ (equaling standard-basis pinching $\Pi(\tau)$); since $\rho_{ii} = \sigma_{ii}$, we obtain $\Tr_{\mathrm{env}}(R_{\mathrm{canon}}(\rho)) = \Tr_{\mathrm{env}}(R_{\mathrm{canon}}(\sigma))$, whereas $R_{\mathrm{canon}}(\rho) \neq R_{\mathrm{canon}}(\sigma)$ precludes any single-valued map $\mathcal{R}$ from recovering both global states from the same reduced input (claims 4 and 5). The full proof is checked by the Lean kernel.
:::

::: {.viz src="erasure-ledger" preset="copy" height="500"}
**Copying: the local entropy rises, no heat is paid, and it can be undone.** After a 90° turn the state is copied into the record bit E: on the system's side the amber arrow shrinks to the centre, the entropy column rises to ln 2 (hatched: only the local entropy), and the heat paid is 0; the next step undoes the copy, the arrow lies flat again and the entropy is back to 0 ([@thm-reduced-irreversibility-access-defect]).
:::

Why, then, can't a macroscopic observer simply apply $U_{\mathrm{copy}}^*$ (claim 6) to run time backward? Because in the real world a system does not copy its record into a single isolated ancilla; it broadcasts redundant records across a finite copy family $\mathrm{Copy}$ of environmental degrees of freedom (photons, phonons, air molecules, detector pointers, and the observer's own memory cells)!

In the Lean module `ObserverMemory/JointCoherentReversal`, we formalize this specific multi-copy memory structure and conjugated-overlap reversal protocol on a finite copy index type $\mathrm{Copy}$ (`[Fintype Copy] [DecidableEq Copy]`) with single-qubit record carrier $\mathrm{EnvironmentRecord} := \mathrm{Fin}\,2 \to \mathrm{Fin}\,2 \to \mathbb{C}$, record family $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$, and single-qubit matrix $\rho \in M_2(\mathbb{C})$ (`QubitMatrix`). The forward multi-record channel $\operatorname{multiRecordChannel}(\mathrm{records}, \rho)$ multiplies entry $(i, j)$ by $\prod_{l \in \mathrm{Copy}} \operatorname{recordOverlap}(\mathrm{records}(l), i, j)$, while $\operatorname{reverseChannelOn}(S, \mathrm{records}, \cdot)$ ([`reverseChannelOn`](lean:D5/S3/ObserverMemory/JointCoherentReversal.reverseChannelOn), built from [`reverseRecord`](lean:D5/S3/ObserverMemory/JointCoherentReversal.reverseRecord) and [`reverseOn`](lean:D5/S3/ObserverMemory/JointCoherentReversal.reverseOn)) applies time-reversed records on the subset $S \subseteq \mathrm{Copy}$:

- Lemma [`reverse_record_overlap`](lean:D5/S3/ObserverMemory/JointCoherentReversal.reverse_record_overlap) proves that reversing a record **conjugates** its branch overlap:
  $$
  \operatorname{recordOverlap}\bigl(\operatorname{reverseRecord}(r), i, j\bigr) = \overline{\operatorname{recordOverlap}(r, i, j)};
  $$
  consequently, whenever a reversed copy $l$ has a **unimodular** branch overlap ($\overline{\operatorname{recordOverlap}(\mathrm{records}(l), i, j)} \cdot \operatorname{recordOverlap}(\mathrm{records}(l), i, j) = 1$), the reversed overlap factor cancels its forward counterpart to $1$! Reversing **all** copies ($S = \mathrm{Finset.univ}$) under unimodular overlaps recovers $\rho_{ij}$ identically ([`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal));
- Yet if even a **single surviving copy** $k \in \mathrm{Copy}$ escapes reversal ($S = \mathrm{Finset.univ.erase}\,k$, with unimodular overlaps $\overline{c_l} c_l = 1$ on all reversed copies $l \neq k$) and carries a nontrivial branch overlap $\operatorname{recordOverlap}(\mathrm{records}(k), i, j) \neq 1$, theorem [`one_surviving_copy_composition_apply`](lean:D5/S3/ObserverMemory/JointCoherentReversal.one_surviving_copy_composition_apply) and the proposition below prove, under this specified protocol and its hypotheses, that **no nonzero coherence entry $\rho_{ij} \neq 0$ can be restored! (See also the explicit two-copy certificate [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate).)**

::: {.figure src="ch08-surviving-copy"}
**Rewinding undoes only the unit-modulus phases; the copy $k$ left over keeps its $c_k$.** In the complex plane the grey dashed arrow is the original coherence $\rho_{01}$. Going forward it turns along the unit circle through the phases of copies 1 and 2 (cyan arcs), then copy $k$ shortens and turns it (magenta segment); rewinding, the phases of copies 1 and 2 turn back along the smaller circle (cyan dashed arcs) and it stops at the amber arrow $c_k\rho_{01}$, short of the tip of the grey arrow ([@prop-surviving-copy-blocks-reversal]). The figure takes $c_1 = e^{i40^\circ}$, $c_2 = e^{i30^\circ}$, $c_k = 0.6\,e^{i25^\circ}$.
:::

::: {.proposition #prop-surviving-copy-blocks-reversal title="A Single Surviving Unreversed Environmental Copy Blocks Coherent Reversal" lean="D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal"}
Let $\mathrm{Copy}$ be a finite copy index type with decidable equality (`[Fintype Copy] [DecidableEq Copy]`), let $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$ be a family of single-qubit environmental records, let $\rho \in M_2(\mathbb{C})$ (`QubitMatrix`) be a single-qubit matrix, let $i, j \in \mathrm{Fin}\,2$ be matrix indices, and let $k \in \mathrm{Copy}$ be a distinguished copy. Assume:

1. **Unimodular overlaps on all other copies**:
   $$
   \forall l \in \mathrm{Copy},\quad l \neq k \implies \overline{\operatorname{recordOverlap}\bigl(\mathrm{records}(l), i, j\bigr)} \cdot \operatorname{recordOverlap}\bigl(\mathrm{records}(l), i, j\bigr) = 1;
   $$
2. **Nontrivial witness overlap on copy $k$**: $\operatorname{recordOverlap}\bigl(\mathrm{records}(k), i, j\bigr) \neq 1$;
3. **Nonzero initial matrix entry**: $\rho_{ij} \neq 0$.

Then applying the reversal channel [`reverseChannelOn`](lean:D5/S3/ObserverMemory/JointCoherentReversal.reverseChannelOn) on all copies except $k$ (`Finset.univ.erase k`) to the forward state $\operatorname{multiRecordChannel}(\mathrm{records}, \rho)$ fails to restore entry $(i, j)$:

$$
\operatorname{reverseChannelOn}\Bigl(\mathrm{Finset.univ.erase}\,k,\, \mathrm{records},\, \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\Bigr)_{ij} \neq \rho_{ij}.
$$
:::

::: proof
By [`one_surviving_copy_composition_apply`](lean:D5/S3/ObserverMemory/JointCoherentReversal.one_surviving_copy_composition_apply) (which uses [`reverse_record_overlap`](lean:D5/S3/ObserverMemory/JointCoherentReversal.reverse_record_overlap) to replace each reversed copy's overlap for $l \in \mathrm{Finset.univ.erase}\,k$ by $\overline{\operatorname{recordOverlap}(\mathrm{records}(l), i, j)}$ and cancels $\overline{c_l} c_l = 1$ via hypothesis 1), every factor $l \neq k$ reduces to $1$, leaving only the unreversed overlap factor of copy $k$:

$$
\begin{aligned}
&\operatorname{reverseChannelOn}\Bigl(\mathrm{Finset.univ.erase}\,k,\, \mathrm{records},\, \operatorname{multiRecordChannel}(\mathrm{records}, \rho)\Bigr)_{ij} \\
&= \operatorname{recordOverlap}\bigl(\mathrm{records}(k), i, j\bigr) \cdot \rho_{ij}.
\end{aligned}
$$

If the left-hand side equaled $\rho_{ij}$, then $\operatorname{recordOverlap}(\mathrm{records}(k), i, j) \cdot \rho_{ij} = 1 \cdot \rho_{ij}$. Since $\mathbb{C}$ has no zero divisors and $\rho_{ij} \neq 0$ (hypothesis 3), right cancellation would yield $\operatorname{recordOverlap}(\mathrm{records}(k), i, j) = 1$, contradicting hypothesis 2 ($\operatorname{recordOverlap}(\mathrm{records}(k), i, j) \neq 1$). The full proof is checked by the Lean kernel.
:::

Under the conjugated-overlap protocol with inaccessible records and the stated restricted operations, [@prop-surviving-copy-blocks-reversal] gives local irrecoverability: a surviving unreversed copy satisfying its hypotheses prevents restoration of the selected nonzero matrix entry. For the memory-reuse protocol considered here, which first applies unread pinching and then discards old information by reset, Stage A entropy production and Stage B heat cost are bounded by [@thm-entropy-production-coherence-deletion] and [@rem-landauer-thermodynamic-bridge-literature]; reversible copying or uncomputation lies outside this two-stage model.

::: {.remark #rem-landauer-thermodynamic-bridge-literature title="Landauer's Principle, Bennett's Reversible Computing, and the Reeb–Wolf Finite-Bath Inequality (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** In this chapter, [@thm-dual-account-full] and [@thm-entropy-production-coherence-deletion] formalize **Stage A (unital basis pinching / coherence deletion)** as the exact dimensionless von Neumann / Umegaki relative-entropy identities $S(\Pi(U\rho U^*)) - S(\rho) = D(U\rho U^* \,\|\, \Pi(U\rho U^*)) \ge 0$ and $\ln d - S(\rho)$ ($\ln 2$ nats of system entropy increase for a pinched pure qubit). In **Stage B (non-unital logical reset, e.g., compressing $\frac{1}{2}I_2 \mapsto \lvert 0\rangle\langle 0\rvert$)**, the physical bridge converting the system entropy reduction $\Delta S_S := S(\rho_S) - S(\rho_S')$ into joules of dissipated heat $\Delta Q_{\mathrm{bath}}$ in a thermal bath at temperature $T$ comes from the thermodynamics-of-computation literature:

1. **Landauer's erasure principle (R. Landauer, 1961) and Bennett's reversible computation (C. H. Bennett, 1973, 1982)**: Rolf Landauer (*Irreversibility and heat generation in the computing process*, IBM J. Res. Dev. **5**, 183–191, 1961) showed that logically irreversible many-to-one non-unital reset operations (such as $\frac{1}{2}I_2 \mapsto \lvert 0\rangle\langle 0\rvert$) compress register entropy and must expel at least $\Delta Q \ge k_B T \ln 2$ of heat per erased bit into a thermal environment at temperature $T$. Charles H. Bennett (IBM J. Res. Dev. **17**, 525–532, 1973; Int. J. Theor. Phys. **21**, 905–940, 1982) demonstrated that computation itself can be performed reversibly via unitary/bijective gates at zero fundamental entropy cost (matching the isentropic property $S(U\rho U^*) = S(\rho)$ of [`unitaryConjugateState`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.unitaryConjugateState)), and resolved Maxwell's demon by showing that the demon pays the Landauer heat cost when resetting its own memory register.
2. **Reeb–Wolf exact finite-bath quantum Landauer identity and bound (D. Reeb & M. M. Wolf, 2014)**: In *An improved Landauer principle with finite-size corrections* (New J. Phys. **16**, 103011, 2014), for an initially uncorrelated system $\rho_S$ and a finite-dimensional thermal bath in a Gibbs state $\rho_E = e^{-\beta H_E}/Z_E$ at inverse temperature $\beta = 1/(k_B T)$ evolving under any joint unitary $\rho_{SE}' = U(\rho_S \otimes \rho_E)U^*$, the heat absorbed by the bath $\beta\Delta Q_{\mathrm{bath}} := \beta\Tr\bigl(H_E(\rho_E' - \rho_E)\bigr)$ and the system entropy reduction $\Delta S_S := S(\rho_S) - S(\rho_S')$ obey the exact identity
   $$
   \beta\Delta Q_{\mathrm{bath}} = \Delta S_S + I(S' : E') + D(\rho_E' \,\|\, \rho_E) \ge \Delta S_S,
   $$
   where both the final mutual information $I(S' : E') \ge 0$ and bath relative entropy $D(\rho_E' \,\|\, \rho_E) \ge 0$ are nonnegative, implying $\Delta Q_{\mathrm{bath}} \ge k_B T \Delta S_S$ without any thermodynamic-limit approximation.

These Stage B physical conversion formulas involving $k_B$, bath Hamiltonians $H_E$, and joules of heat $\Delta Q_{\mathrm{bath}}$ are cited from the physics literature and are not claimed in the book's Lean verification ledger. One layer of it is verified in Lean: once the two real-number equations are granted, the reservoir balance $\beta Q = \Delta S_{\mathrm{res}} + D$ and the unitary balance $I = \Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{res}}$, the identity of item 2, the lower bound and its equality condition are given by [@prop-landauer-identity-from-balances] and [@cor-landauer-bound-saturation]. The two balances themselves (statements about Gibbs states, joint unitary evolution and von Neumann entropy) and the nonnegativity $I \ge 0$, $D \ge 0$ remain literature results.
:::

::: {.viz src="erasure-ledger" height="560"}
**The erasure ledger · full lab.** Keep the books of one bit with the operations: turn, pinch, ideal reset, reset with a bath qubit, copy and undo; the disc on the left draws the state, the two columns on the right record the system's entropy and the heat paid to the environment. Entropy and heat at whole steps are computed from density matrices; the animation between steps is only an interpolated sketch, not the entropy of the state in between. Green boxes go only to the frozen theorems this chapter cites; the heat of stage B is marked as a literature result.
:::

## 8.4 Part II Summary and Bridge: When a Single Plane Cannot Hold Three Orthogonal Bifurcations, Leap to the Three-Dimensional Sphere {#sec-part2-summary-bridge}

Across the four chapters of Part II (*Unfolding Wings — From Line to Plane*), backed by twenty-two Lean-verified theorems, lemmas, propositions, and corollaries (five in each of Chapters 5, 6 and 7, and seven in Chapter 8), we have unfolded the geometry of two-dimensional oriented area:

- **Chapter 5** demystified the imaginary unit $i$, deriving the skew-adjoint relative complex structure $J := 2AB^*$ satisfying $J^2 = -I$ from a balanced unitary sum $S = A + B$ ([@thm-balanced-sum-skew-adjoint], [@lemma-skew-adjoint-unitary-square], [@thm-relative-complex-structure-square]) alongside the phase-locked real factorization ([@prop-phase-locked-overlap]), showing through the double cover of the circle ([@thm-circle-double-cover-history-lift]) that the sign reversal of a rotor after a full turn is a topological fact, and turning all standard single-qubit gates into three-dimensional Clifford rotors $R(\theta) = \cos(\theta/2) - \vv{B}\sin(\theta/2)$;
- **Chapter 6** unified wave–particle duality and the five textbook postulates through the geometric product $\vv{A}\vv{B} = \vv{A}\cdot\vv{B} + \vv{A}\wedge\vv{B}$, anchored by the Lagrange–Gram identity ([@thm-lagrange-gram-identity]), the Robertson–Schrödinger conservation identity ([@thm-robertson-schrodinger]) and its mixed-state inequality ([@thm-mixed-state-robertson]), the pure-record complementarity circle $D^2 + V^2 = 1$ ([@thm-record-coherence-complementarity]), the Hilbert–Schmidt pinching Pythagorean split ([@cor-pinching-pythagorean]), and the live interactive laboratory `ORTHO//QUBIT`;
- **Chapter 7** established the duality of time — "the line is classical time, and the area is quantum time" — proving that any calibrated unitary group satisfies Hamiltonian self-adjointness, exponential generation, and the infinitesimal derivative law ([@thm-calibrated-unitary-group]), projection probability flow is driven by commutator area ([@prop-projection-probability-flow]), crossing a $90^\circ$ orthogonal wall obeys the Fubini–Study speed limit ([@thm-fubini-study-record-time]), first-return and survival probabilities under stroboscopic monitoring are conserved step by step ([@prop-monitored-return-conservation]), alongside stroboscopic Zeno dynamics and the scalar free-energy accounting threshold criterion for critical inverse temperature ([@thm-decoherence-freeze-critical]);
- **Chapter 8** audited the information-theoretic and thermodynamic ledger of flattening an area into a line, proving that mutually unbiased pinching produces $\ln d - S(\rho)$ of relative entropy and entropy increase ([@thm-dual-account-full]), single-step and cumulative basis-pinching entropy production equal the relative entropy of deleted coherence ([@thm-entropy-production-coherence-deletion]), the reservoir and unitary balances yield the heat–entropy–information identity and the equality criterion of the Landauer bound ([@prop-landauer-identity-from-balances], [@cor-landauer-bound-saturation]), local irreversibility stems from environment-record access defect ([@thm-reduced-irreversibility-access-defect]), and even a single surviving environmental copy blocks coherent time reversal ([@prop-surviving-copy-blocks-reversal]).

Now stand at the threshold between Part II and Part III and ask the question that forces our next dimensional leap: **if only a single two-dimensional plane $\operatorname{span}\{\vv{e}_1, \vv{e}_2\}$ existed, once you turned by $90^\circ$ from $\vv{e}_1$ to $\vv{e}_2$, where could you find a third direction simultaneously orthogonal at $90^\circ$ to both $\vv{e}_1$ and $\vv{e}_2$?**

A single plane has no room left! To step orthogonally a second time — realizing the author's observation:

> *"At the core of this is how isotropy reaches another point through orthogonality: one is orthogonal once, and the other is orthogonal twice, because the triad is pairwise orthogonal"*

— we must step out of a single plane and let three pairwise orthogonal bivector planes close into a complete **three-dimensional sphere $S^2$**! In **Part III (*Closing the Loop — From Plane to Sphere*)**, we will see how triad orthogonality ($X, Y, Z$) addresses the entire sphere in two orthogonal steps, how Berry curvature measures spherical solid angle, and how equatorial measure concentration on high-dimensional spheres shapes variational quantum algorithms!

::: {.figure src="ch08-third-direction"}
**A plane holds only one orthogonal step; the second has to leave it.** The disc is the plane spanned by $\vv{e}_1$ and $\vv{e}_2$: the cyan arc from $\vv{e}_1$ to $\vv{e}_2$ is the first orthogonal step and stays in the disc; the only direction perpendicular to both is the magenta $\vv{e}_3$, and the magenta arc from $\vv{e}_2$ to $\vv{e}_3$ is the second orthogonal step, which leaves the plane: the three axes close into a sphere.
:::
