# 31.2 Relational Fairness: No-Cloning and Entanglement Monogamy {#sec-ch31-monogamy}

In the classical data economy, a monopolist can copy a bitstring a million times at negligible cost and pledge "hundred-percent exclusive" correlation to arbitrarily many partners simultaneously. Inside the tensor-product geometry of multi-qubit systems, **Relational Fairness (`MODEL`)** enforces an ethic at once tender and uncompromising: **profound entanglement cannot be wholesaled, and a living superposition cannot be pirated.**

Within the Lean 4 kernel, two parameter-free theorems anchor this principle (collected as Conjuncts 3–4 of [@thm-ch31-seat-pythagorean-monogamy-fairness] below; monogamy in general is the literature result in [@rem-ch31-ckw-monogamy-literature]):

1. **Inner-Product No-Cloning Criterion** ([`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)): If a single complex linear isometry $U$ clones two normalized pure states $\psi, \phi$ from a normalized blank ancilla $\mathrm{blank}$ into $\psi\otimes\psi$ and $\phi\otimes\phi$, their inner product must satisfy $\langle\phi, \psi\rangle = \langle\phi, \psi\rangle^2$—forcing either $\phi = \psi$ (the very same state) or $\langle\phi, \psi\rangle = 0$ (orthogonal classical labels). No machine can blindly mass-produce states carrying genuine non-orthogonal superposition tension.

::: {.viz src="quantum-fairness-ledger" preset="cloning" height="500"}
**More copies, each one shorter.** Copying an unknown state into $M$ copies leaves each cyan arrow only $\eta = (M+2)/(3M)$ long; magenta is what is lost, and the fidelity falls towards $2/3$ (the universal symmetric cloner, a literature result not formalized in this book). This machine treats every state alike, the poles included. The hollow rings at the poles mark something else: if one machine copies two states exactly, their inner product can only be $0$ or $1$ (Conjunct 3 of [@thm-ch31-seat-pythagorean-monogamy-fairness]), so an orthogonal pair such as $\lvert 0\rangle$, $\lvert 1\rangle$ can be copied exactly by a different machine built for that pair.
:::

2. **Maximally Mixed Marginal of a Pure Bell State** ([`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)): When two qubits bind into the rank-one maximally entangled Bell state `bellDensity`, tracing out the partner collapses the single-qubit marginal `traceEnvironment bellDensity` to $\frac{1}{2}I_2$ (which is strictly non-idempotent)—its local Bloch bias retreats completely to the origin, surrendering every drop of private purity to the shared relational plane!

::: {.viz src="quantum-fairness-ledger" preset="bell" height="500"}
**A full bond.** The Bell state $\lvert\Phi^+\rangle_{AB}\otimes\lvert 0\rangle_C$: the magenta bond between $\mathbf{A}$ and $\mathbf{B}$ is full, the amber arrow of $\mathbf{A}$ shrinks to the centre, that is $\tfrac{1}{2}I_2$ (Conjunct 4 of [@thm-ch31-seat-pythagorean-monogamy-fairness]), and nothing is left for $\mathbf{C}$.
:::

The formal theorem below unites the Born squared modulus, complementary centered-purity Pythagoras, no-cloning, and the Bell marginal collapse on a single Lean-verified foundation.

::: {.theorem #thm-ch31-seat-pythagorean-monogamy-fairness title="First Three Formal Pillars of Quantum Fairness: Born Squared Modulus, Complementary Pythagoras, No-Cloning, and Bell Marginal" lean="D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal"}
Across the frozen finite-dimensional measurement, tomography, pure-state, and entanglement modules of `trureturing`, the following four structural fairness theorems hold simultaneously:

1. **Modulus-Square Law of Rank-One Born Pairing** ([`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)): Let $n, \kappa$ be finite types (`[Fintype n] [DecidableEq n] [Fintype kappa]`), let $P : \kappa \to M_n(\mathbb{C})$ satisfy `IsRecordMeasurement P`, and let $\rho \in M_n(\mathbb{C})$ satisfy `rho.PosSemidef ∧ Matrix.trace rho = 1`. Whenever $P_k = \phi\phi^*$ (`Matrix.vecMulVec phi (star phi)`) and $\rho = \psi\psi^*$ (`Matrix.vecMulVec psi (star psi)`),

   $$
   \begin{aligned}
   &\operatorname{recordWeight}(P, \rho, k) \\
   &\quad = \bigl(\|\phi^* \bullet_v \psi\|^2 : \mathbb{C}\bigr) \\
   &{}\land\; \operatorname{recordWeight}(P, \rho, k) \\
   &\quad = \operatorname{Tr}(\rho P_k) \\
   &{}\land\; \operatorname{unreadState}(P, \rho) \\
   &\quad = \sum_{j \in \kappa}\Bigl(\operatorname{recordWeight}(P, \rho, j) \\
   &\qquad \bullet \operatorname{conditionalState}(P, \rho, j)\Bigr);
   \end{aligned}
   $$
2. **Complementary-Context Centered-Purity Pythagoras** ([`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)): Let $d, L$ be finite types with $d$ nonempty, let $E$ be a complete real inner-product space, and let `visible` be a closed subspace of $E$. If the centered purity satisfies $\operatorname{Re}\operatorname{Tr}(\rho^2) - |d|^{-1} = \|\mathrm{state}\|^2$ and $\|\mathrm{visible.starProjection}(\mathrm{state})\|^2 = \sum_{l \in L}\sum_{j \in d}\bigl(\mathrm{probability}(l, j) - |d|^{-1}\bigr)^2$, then

   $$
   \operatorname{Re}\operatorname{Tr}(\rho^2) - |d|^{-1} \;=\; \sum_{l \in L}\sum_{j \in d}\bigl(\mathrm{probability}(l, j) - |d|^{-1}\bigr)^2 \;+\; \operatorname{residualMass}(\mathrm{visible}, \mathrm{state});
   $$

3. **Inner-Product Idempotence Lock for Cloning Isometries** ([`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)): Let $H$ be a complex inner-product space and $U : H \otimes_{\mathbb{C}} H \simeq_{\ell i} H \otimes_{\mathbb{C}} H$ a complex linear isometric isomorphism. If unit vectors $\|\psi\| = \|\phi\| = \|\mathrm{blank}\| = 1$ satisfy $U(\psi \otimes \mathrm{blank}) = \psi \otimes \psi$ and $U(\phi \otimes \mathrm{blank}) = \phi \otimes \phi$, then

   $$
   \langle\phi, \psi\rangle_{\mathbb{C}} = \langle\phi, \psi\rangle_{\mathbb{C}}^2 \;\land\; \bigl(\phi = \psi \;\lor\; \langle\phi, \psi\rangle_{\mathbb{C}} = 0\bigr);
   $$

4. **Maximally Mixed Marginal of the Pure Two-Qubit Bell State** ([`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)): The two-qubit Bell state vector satisfies $\mathrm{bellVector}^* \bullet_v \mathrm{bellVector} = 1$, and its density matrix $\mathrm{bellDensity}$ is positive semidefinite, trace-$1$, rank-$1$, and idempotent ($\mathrm{bellDensity}^2 = \mathrm{bellDensity}$), whereas its single-qubit partial trace collapses to the non-idempotent half-identity:

   $$
   \operatorname{traceEnvironment}(\mathrm{bellDensity}) = \tfrac{1}{2}I_2, \qquad \operatorname{traceEnvironment}(\mathrm{bellDensity})^2 \neq \operatorname{traceEnvironment}(\mathrm{bellDensity}).
   $$
:::

::: proof
Conjunct 1 combines `rank_one_pure_state_modulus_square_reduction` with `unread_eq_weighted_ensemble` (the reciprocity $\|\phi^* \bullet_v \psi\|^2 = \|\psi^* \bullet_v \phi\|^2$ is not part of Conjunct 1; it follows by hand from conjugate inversion of the dot product); Conjunct 2 applies `Submodule.norm_sq_eq_add_norm_sq_starProjection` across orthogonal projections in the complete real inner-product space $E$; Conjunct 3 uses isometric preservation of tensor inner products $\langle\phi, \psi\rangle\langle\mathrm{blank}, \mathrm{blank}\rangle = \langle\phi, \psi\rangle^2$ over the integral domain $\mathbb{C}$ via `eq_zero_or_one_of_sq_eq_self` and `inner_eq_one_iff_of_norm_eq_one`; Conjunct 4 evaluates the block partial trace of the $4\times 4$ projector and checks $(\frac{1}{2}I_2)^2 = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch31-cloning-lock"}
**The inner-product lock opens at only two values, $0$ and $1$.** The horizontal axis is the inner product $x = \langle\phi,\psi\rangle$; a single cloning machine forces $x = x^2$, and the ink diagonal $y = x$ meets the cyan parabola $y = x^2$ only at the origin ($\phi \perp \psi$) and at $(1, 1)$ ($\phi = \psi$); in between the parabola stays below the diagonal and there is no solution (Conjunct 3 of [@thm-ch31-seat-pythagorean-monogamy-fairness]). Only the real axis is drawn; over the complex numbers $z = z^2$ likewise has only $z = 0$ and $z = 1$.
:::

External quantum-information extensions to three-qubit and multipartite entanglement shares are recorded below:

::: {.remark #rem-ch31-ckw-monogamy-literature title="Three-Qubit CKW Entanglement Monogamy Inequality and Bell / W / GHZ Budget Audit (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Quantitative monogamy bounds on shared bipartite entanglement belong to the external quantum-information literature and are not formalized in `trureturing@dev`:

1. **Three-Qubit CKW Monogamy Inequality (V. Coffman, J. Kundu & W. K. Wootters, *Phys. Rev. A* **61**, 052306, 2000) and $n$-Qubit Generalization (T. J. Osborne & F. Verstraete, *Phys. Rev. Lett.* **96**, 220503, 2006)**: For any three-qubit state $\rho_{ABC}$ (pure or mixed), let $\tau(\mathbf{A}:\mathbf{B}) := C(\rho_{AB})^2$ and $\tau(\mathbf{A}:\mathbf{C}) := C(\rho_{AC})^2$ denote the squared Wootters concurrences (2-tangles), and write the reduced state $\rho_A = \operatorname{Tr}_{BC}(\rho_{ABC}) = \frac{1}{2}(I_2 + \mathbf{r}_A\cdot\boldsymbol{\sigma})$ with Bloch vector $\mathbf{r}_A \in \mathbb{R}^3$ ($\|\mathbf{r}_A\| \le 1$). All three marginals $\rho_{AB},\rho_{AC},\rho_A$ are actual partial traces of this same $\rho_{ABC}$.

   For a two-qubit density matrix $P$, define $\widetilde P=(\sigma_y\otimes\sigma_y)\overline P(\sigma_y\otimes\sigma_y)$ in the computational basis, where $\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix}$ and the bar denotes entrywise complex conjugation. Wootters' spectral formula is

   $$
   C(P)=\max\{0,\lambda_1-\lambda_2-\lambda_3-\lambda_4\},
   $$

   where $\lambda_1\ge\lambda_2\ge\lambda_3\ge\lambda_4\ge0$ are the nonnegative square roots of the four eigenvalues of $P\widetilde P$, counted with algebraic multiplicity. This product need not be self-adjoint; the nonnegative reality of its eigenvalues is part of the mathematical basis of the formula. Zero eigenvalues, repeated roots and rank-deficient states are included (W. K. Wootters, *Phys. Rev. Lett.* **80**, 2245–2248, 1998, [original paper](https://arxiv.org/abs/quant-ph/9709029)).

   For the $\mathbf A|\mathbf{BC}$ cut, let $\mathcal E(\rho_{ABC})$ contain every finite pure-state decomposition $\rho_{ABC}=\sum_jp_j|\psi_j\rangle\langle\psi_j|$, with $p_j\ge0$, $\sum_jp_j=1$ and $\langle\psi_j|\psi_j\rangle=1$, and put $\rho_A^{(j)}=\operatorname{Tr}_{BC}|\psi_j\rangle\langle\psi_j|$. The mixed-state intermediate quantity is the convex roof of the pure-state budget:

   $$
   \tau(\mathbf A:\mathbf{BC})
   :=\inf_{\mathcal E(\rho_{ABC})}\sum_jp_j\,4\det\rho_A^{(j)}.
   $$

   Zero weights are allowed, and the definition does not presuppose an optimal decomposition. This is an infimum of pure-state costs across a $2\times4$ cut; the two-qubit spectral formula above applies to $\rho_{AB}$ and $\rho_{AC}$. The full budget reads

   $$
   \tau(\mathbf{A}:\mathbf{B}) + \tau(\mathbf{A}:\mathbf{C}) \;\le\; \tau(\mathbf{A}:\mathbf{BC}) \;\le\; 4\det\rho_A \;=\; 1 - \|\mathbf{r}_A\|^2 \;\le\; 1
   $$

   The mixed-state lower bound uses convexity of squared two-qubit concurrence: apply pure-state CKW to each member of one finite decomposition, average with those same weights $p_j$, then take the infimum. The intermediate upper bound follows from concavity of $4\det\rho_A=1-\|\mathbf r_A\|^2$ on density matrices. The spectral formula, its convex-roof connection and CKW rely on the literature proofs; this full chain has not been formalized in this book. See [the original CKW paper, equations (1)–(14)](https://arxiv.org/abs/quant-ph/9907047).

   For pure $|\Psi_{ABC}\rangle$, $\tau(\mathbf{A}:\mathbf{BC}) = 4\det\rho_A = 1 - \|\mathbf{r}_A\|^2$, and the nonnegative deficit $\tau_3 := \tau(\mathbf{A}:\mathbf{BC}) - \tau(\mathbf{A}:\mathbf{B}) - \tau(\mathbf{A}:\mathbf{C}) \ge 0$ defines the pure-state residual 3-tangle. Mixed-state three-tangle requires a separate convex-roof extension; this difference cannot simply serve as its definition. Osborne and Verstraete proved the $n$-qubit extension $\sum_{j=2}^n \tau(A_1 : A_j) \le \tau(A_1 : A_2\cdots A_n)$;
2. **Explicit Audit on Three Benchmark Pure Three-Qubit States**:
   - **Bell Pair Plus Decoupled Third Qubit $|\Phi^+\rangle_{AB}\otimes|0\rangle_C$**: Here $\rho_A = \frac{1}{2}I_2$ ($\|\mathbf{r}_A\| = 0$) and $\tau(\mathbf{A}:\mathbf{B}) = 1$, forcing $\tau(\mathbf{A}:\mathbf{C}) = 0$—exhausting the full unit budget with $\mathbf{B}$ leaves strictly zero entanglement capacity for any third party $\mathbf{C}$;
   - **$W$ State $|W\rangle = \frac{1}{\sqrt{3}}(|100\rangle + |010\rangle + |001\rangle)$**: The marginal $\rho_A = \operatorname{diag}(\frac{2}{3}, \frac{1}{3})$ retains local Bloch polarization $\|\mathbf{r}_A\| = \frac{1}{3}$, capping total available tangle at $1 - \|\mathbf{r}_A\|^2 = \frac{8}{9}$, split equally as $\tau(\mathbf{A}:\mathbf{B}) = \tau(\mathbf{A}:\mathbf{C}) = \left(\frac{2}{3}\right)^2 = \frac{4}{9}$ so $\frac{4}{9} + \frac{4}{9} = \frac{8}{9}$ saturates CKW with $\tau_3 = 0$;
   - **GHZ State $|\mathrm{GHZ}\rangle = \frac{1}{\sqrt{2}}(|000\rangle + |111\rangle)$**: Although $\|\mathbf{r}_A\| = 0$, both two-body marginals $\rho_{AB} = \rho_{AC} = \frac{1}{2}(|00\rangle\langle 00| + |11\rangle\langle 11|)$ are separable mixtures with $\tau(\mathbf{A}:\mathbf{B}) = \tau(\mathbf{A}:\mathbf{C}) = 0$, converting the entire budget into irreducible three-body tangle $\tau_3 = 1$.
:::

::: {.viz src="quantum-fairness-ledger" preset="wstate" height="500"}
**Two bonds split the budget.** The $W$-type state $(\lvert 000\rangle + \lvert 110\rangle + \lvert 101\rangle)/\sqrt{3}$ ($\lvert W\rangle$ with $\mathbf{A}$ flipped once, which leaves every tangle unchanged): the arrow of $\mathbf{A}$ keeps $1/3$, the two magenta bonds take $4/9$ each, and the bar on the right totals $1$ ([@rem-ch31-ckw-monogamy-literature]).
:::

One more step along the same family, and the two pairwise bonds give way wholesale to an entanglement held by all three:

::: {.viz src="quantum-fairness-ledger" preset="ghz" height="500"}
**Everything to the three-way bond.** From the $W$-type state to the GHZ state: both magenta bonds break, the violet three-way face fills up to $\tau_3 = 1$, and the arrow of $\mathbf{A}$ shrinks to the centre; the bar still totals $1$ ([@rem-ch31-ckw-monogamy-literature]).
:::

---
