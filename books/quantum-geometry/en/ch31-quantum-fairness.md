# Chapter 31 The Essence of the Quantum Is Fairness: Fivefold Abolition of Geometric Privilege and Ergodic Statistical Holism {#the-essence-of-the-quantum-is-fairness-fivefold-abolition-of-geometric-privilege-and-ergodic-statistical-holism}

> *"The essence of the quantum is fairness... The universe cut away the lofty third point above, compelling all beings to measure one another pairwise at eye level; with the Pythagorean theorem it revoked the privilege of omniscience and omnipotence, with the horizon it sheltered the suspense of finite life, and finally with irrational ergodicity it guaranteed that every soul awakening from forgetting shall, across the long journey, receive an equally abundant share of starlight."*

Across [Chapter 29](ch29-timeless-causality-and-gram-space.md)'s timeless Gram compatibility crystal and [Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md)'s computational orthogonal horizon, we repeatedly encountered across arithmetic, spacetime, quantum circuits, and continuum fluids the same family of seemingly austere physical prohibitions: no privileged external reference frame, no simultaneous possession of full particle certainty and full wave interference, no universal cloning of unknown pure states, no shortcut past the coherent rotation arc, and no polynomial-time omniscience for a bounded observer inside the static field.

Conventional textbooks often present these laws as a bleak catalog of isolated "no-go theorems," as though quantum mechanics existed merely to erect barbed wire around classical intuition. Yet the moment we step back to the orthogonal geometry developed throughout this monograph and translate "pairwise measurement, zero external frame, Pythagorean conservation, and ergodic statistical holism" into a single ontological word, the entire landscape inverts: every single prohibition and conservation law is the universe's constitutional guarantee of **Fairness (`MODEL`)**.

In the classical mechanistic worldview, structural privilege appeared natural: space could harbor an absolute central tribunal, force could act as a one-way inspection from above, information tokens could be duplicated at zero cost to issue simultaneous "exclusive" commitments to arbitrarily many parties, and superior computing power could in principle calculate and monopolize the future at a stroke. Quantum geometry acts instead as an incorruptible geometer-legislator, dismantling privilege across five orthogonal dimensions:

1. **Seat Fairness**: Cutting away the external "third point $C$" places every single-qubit pure state on a unit Bloch sphere of norm $1$, governed by strict modulus-square reciprocity under rank-one Born pairing;
2. **Gain–Loss Fairness**: Complementary-context centered-purity Pythagorean conservation enforces a zero-free-lunch ledger in which every unit of one-dimensional certainty is paid for by orthogonal residual potential or thermodynamic heat dissipation;
3. **Relational Fairness**: The inner-product no-cloning lock and maximally mixed Bell marginal (Conjuncts 3–4 of [@thm-ch31-seat-pythagorean-monogamy-fairness]; external multipartite extensions in [@rem-ch31-ckw-monogamy-literature]) cap shared correlation budgets so deep entanglement cannot be mass-produced;
4. **Horizon Fairness**: The fixed step-angle law of coherent uniform amplification (Conjunct 2 of [@thm-ch31-horizon-landauer-ergodic-fairness]) and the finite-observer complexity firewall ([Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md) [@conj-p-neq-np]; external context in [@rem-ch30-query-sos-literature]) block computational monopolies from spoiling the suspense of finite life;
5. **Ergodic Fairness**: Birth-forgetting resets choice freedom (`MODEL`), while compact-torus closed-subgroup equidistribution and bounded-gap return (Conjuncts 3–4 of [@thm-ch31-horizon-landauer-ergodic-fairness]; window application and boundaries in [@rem-ch31-weyl-window-equidistribution-literature]) ground our ontological reading of shared long-run statistical holism.

::: {.figure src="ch31-overview"}
**Figure 31.** The chapter at a glance. Panel I: the ink vectors $\phi$ and $\psi$ measure each other, and each one's cyan shadow on the other has the same length $\cos\theta$; the third point $C$ above is struck out. Panel II: the ink diagonal $y = x$ and the cyan parabola $y = x^2$ meet only at $0$ ($\phi \perp \psi$) and $1$ ($\phi = \psi$), the lock a cloning machine puts on the inner product. Panel III: of $21$ points laid round a circle by the golden angle, $8$ land in the cyan window covering $2 - \varphi \approx 0.382$ of the circle, and in the long run the share tends to the window's $2 - \varphi$ (schematic; the frequency of a null-frontier window is an application of existing results, see [@rem-ch31-weyl-window-equidistribution-literature]).
:::

---

## 31.1 Seat Fairness and Gain–Loss Fairness: Eye-Level Rulers and the Zero-Free-Lunch Ledger {#sec-ch31-seat-and-pythagoras}

The oldest source of privilege is to install an exalted tribunal outside the arena—precisely the external "third point $C$" we excised in [Chapter 2](ch02-born-rule.md)—so whichever state sits closer to the throne may declare itself the universal standard.

::: {.figure src="ch31-ruler"}
**Two states measure each other; no third point is needed.** The ink unit vectors $\phi$ and $\psi$ are $\theta$ apart: the cyan shadow of $\phi$ on $\psi$ and the cyan shadow of $\psi$ on $\phi$ are mirror images of equal length $\cos\theta$ (here $\theta = 60^\circ$, so each is $1/2$); the point $C$ above, joined to both tips, is struck out. This is a real-plane slice; for complex inner products the Born weight is the same squared modulus either way, $|\langle\phi,\psi\rangle|^2 = |\langle\psi,\phi\rangle|^2$ (Conjunct 1 of [@thm-ch31-seat-pythagorean-monogamy-fairness]).
:::

In pure-state geometry, by contrast, every normalized state inhabits a symmetric space devoid of privileged axes (`MODEL`); quantum geometry abolishes any disembodied "view from nowhere" (philosophical and literary context in [@rem-ch31-haar-isotropy-landauer-literature] below) through two algebraic laws:

- **Equality of Seat (Unit Pure-Qubit Bloch Norm)**: A sphere has neither capital city nor provincial periphery. For a single qubit, trace-$1$ idempotent Hermitian projectors lie precisely on the Euclidean unit sphere $\|\operatorname{bloch}(M)\| = 1$ by [Chapter 26](ch26-single-qubit-rotor-compilation.md)'s [`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian) (for higher-dimensional continuous symmetry background see [@rem-ch31-haar-isotropy-landauer-literature] below). No axis possesses intrinsic authority to crown itself cosmic North.
- **Reciprocity of Measurement (Eye-Level Symmetry)**: Under pairwise comparison, the rank-one pairing weight $\|\phi^* \bullet_v \psi\|^2$ obtained when $\psi$ serves as ruler to measure $\phi$ (Conjunct 1 of [@thm-ch31-seat-pythagorean-monogamy-fairness] below) is **identically equal** by conjugate symmetry of the complex inner product to the weight $\|\psi^* \bullet_v \phi\|^2 = |\langle\phi, \psi\rangle|^2 = |\langle\psi, \phi\rangle|^2$ obtained when $\phi$ measures $\psi$ in return. There is no one-way surveillance at the foundation of physics: **to the exact degree you illuminate another, the other simultaneously illuminates you**.

::: {.viz src="quantum-fairness-ledger" preset="haar" height="500"}
**No north pole.** Points thrown uniformly on the sphere (the uniform measure is the Haar measure, a literature result not formalized in this book): the $60^\circ$ cap around the amber reference axis holds about a quarter of them wherever the axis is dragged; the two cyan shadows are equally long, so measuring $\phi$ with $\psi$ and $\psi$ with $\phi$ give the same weight (Conjunct 1 of [@thm-ch31-seat-pythagorean-monogamy-fairness]).
:::

The second primordial greed is to demand absolute certainty and boundless freedom at once. In the language of an information-budget ledger, while a normalized state vector satisfies $\|\psi\|^2 = 1$, for any centered state operator above the unbiased baseline $|d|^{-1}I_d$ satisfying the centered-purity identity $\|\mathrm{state}\|^2 = \operatorname{Re}\operatorname{Tr}(\rho^2) - |d|^{-1}$ (for the general density-operator spectral purity bounds see [@rem-ch31-haar-isotropy-landauer-literature] below), the distinguishable information available for allocation is this **centered purity budget** $\|\mathrm{state}\|^2$. **Complementary-context centered-purity Pythagorean conservation** (Conjunct 2 of [@thm-ch31-seat-pythagorean-monogamy-fairness]) enforces an unyielding **zero-free-lunch ledger**: under its orthogonal coordinate hypothesis, the sum of squared certainty deviations $\|\mathrm{visible.starProjection}(\mathrm{state})\|^2$ extracted along a visible measurement subspace plus the undecided residual mass $\operatorname{residualMass}(\mathrm{visible}, \mathrm{state})$ in its orthogonal complement equals the state's exact centered purity budget $\|\mathrm{state}\|^2$:

- Commit $100\%$ of the centered purity budget onto the visible subspace at a chosen instant, and the complementary orthogonal residual mass at that instant vanishes identically; under a repeated-projective-measurement dynamical reading (`MODEL`; continuous Zeno-limit background in [Chapter 7](ch07-geometric-time-and-speed-limits.md) and [@rem-ch31-haar-isotropy-landauer-literature] below), this mirrors suppressing transverse transitions via frequent recalibration;
- Conversely, in our spacetime orthogonal-split model (`MODEL`; continuum literature background in [@rem-ch31-haar-isotropy-landauer-literature] below), committing the entire budget to a $90^\circ$ transverse wave plane zeroes out projection along proper time;
- Even if you wish to erase past error records and compress a higher-entropy state back toward a pure ray, the thermodynamic balance inequality $-\mathrm{entropyChange} \le \beta \cdot \mathrm{heat}$ ([Chapter 8](ch08-erasure-and-time-arrows.md) and Conjunct 1 of [@thm-ch31-horizon-landauer-ergodic-fairness] below) compels honest heat payment into the thermal bath.

::: {.viz src="quantum-fairness-ledger" preset="tradeoff" height="500"}
**More line, less area.** The amber arrow turns from the measurement axis to the equator: the cyan line $D$ shrinks, the magenta area $V$ grows, and $D^2 + V^2$ stays $1$—the centered purity is redistributed between the visible context and the residual in the orthogonal complement (Conjunct 2 of [@thm-ch31-seat-pythagorean-monogamy-fairness]).
:::

Every gain along one axis is paid dollar for dollar along its orthogonal complement; not even an imagined deity can pocket both the North Pole point and the equatorial plane. Spectral purity ranges, continuum invariant-measure results, and physical-unit conversions accompanying this section are recorded below:

::: {.remark #rem-ch31-haar-isotropy-landauer-literature title="Unit-Sphere Haar Isotropy, Spectral Purity Bounds, and Landauer's Physical Heat Constant (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Three spectral, continuum, and physical-unit results referenced alongside our frozen inner-product and thermodynamic theorems belong to external classical literature and are not formalized as standalone declarations in `trureturing@dev`:

1. **Finite-Dimensional Density-Operator Spectral Purity Bounds and Repeated-Measurement Quantum Zeno Limit (J. von Neumann, 1932; B. Misra & E. C. G. Sudarshan, *J. Math. Phys.* **18**, 756–763, 1977)**: On a $d$-dimensional Hilbert space, every positive semidefinite trace-$1$ density operator $\rho$ (eigenvalues $\lambda_1,\dots,\lambda_d \ge 0,\; \sum_j \lambda_j = 1$) satisfies $|d|^{-1} \le \operatorname{Tr}(\rho^2) = \sum_{j=1}^d \lambda_j^2 \le 1$ by Cauchy–Schwarz and simplex convexity, placing the centered purity budget $\|\rho - |d|^{-1}I_d\|_{\mathrm{HS}}^2 = \operatorname{Tr}(\rho^2) - |d|^{-1}$ in $[0,\, 1 - |d|^{-1}]$. Under bounded Hamiltonian evolution $H$, applying projective measurement $P$ repeatedly at step $\Delta t = t/N \to 0$ yields $\lim_{N\to\infty} \operatorname{Tr}((P e^{-iH t/N} P)^N \rho_0 (P e^{iH t/N} P)^N) = \operatorname{Tr}(P \rho_0)$ (dynamical Zeno freezing requires repeated measurements rather than a static snapshot identity alone);
2. **Unitary Transitivity and Uniform Haar Measure on Pure-State Spheres (A. Haar, *Ann. of Math.* **34**, 147–169, 1933)**: On $\mathbb{C}^d$, the compact unitary group $\mathrm{U}(d)$ acts transitively on the unit sphere $S^{2d-1} = \{\psi \in \mathbb{C}^d : \|\psi\| = 1\}$ and on complex projective space $\mathbb{C}\mathrm{P}^{d-1}$, inducing a unique $\mathrm{U}(d)$-invariant normalized Haar probability measure $\mu_{\mathrm{Haar}}$ that eliminates any privileged basis vector (echoing F. Nietzsche's critique in *Thus Spoke Zarathustra*, "On Immaculate Perception," against the pretense of a perspectiveless spectator eye). Under angular parameterization $|\langle\phi,\psi\rangle| = \cos(\theta_{\mathrm{Bloch}}/2)$ (or Euclidean unit-vector overlap $\mathbf{A}\cdot\mathbf{B} = \cos\theta$), the Pythagorean identity reads

   $$
   \underbrace{\cos^2\theta}_{\text{1D collinear certainty share}} + \underbrace{\sin^2\theta}_{\text{2D orthogonal bifurcation share}} = 1,
   $$

   where $\theta = 0^\circ$ gives $\cos^2 0^\circ = 1,\; \sin^2 0^\circ = 0$ (vanishing instantaneous transverse variance) and $\theta = 90^\circ$ gives $\cos^2 90^\circ = 0,\; \sin^2 90^\circ = 1$ (special-relativistic null worldlines $d\tau/dt = 0$; cf. [Chapter 17](ch17-lorentz-geometry.md) [@rem-lorentz-rotor-literature]);
3. **Physical Boltzmann Conversion of Landauer's One-Bit Erasure (R. Landauer, *IBM J. Res. Dev.* **5**, 183–191, 1961)**: Coupling a system to a reservoir at inverse temperature $\beta = (k_B T)^{-1}$ and resetting a uniform binary state from von Neumann entropy $\ln 2$ to $0$ ($\Delta S = -\ln 2$) converts the dimensionless balance inequality $-\Delta S \le \beta Q$ into the physical heat floor $Q_{\min} = k_B T \ln 2$.
:::

---

## 31.2 Relational Fairness: No-Cloning and Entanglement Monogamy {#sec-ch31-monogamy}

In the classical data economy, a monopolist can copy a bitstring a million times at negligible cost and pledge "hundred-percent exclusive" correlation to arbitrarily many partners simultaneously. Inside the tensor-product geometry of multi-qubit systems, **Relational Fairness (`MODEL`)** enforces an ethic at once tender and uncompromising: **profound entanglement cannot be wholesaled, and a living superposition cannot be pirated.**

Within the Lean 4 kernel, two parameter-free theorems anchor this principle (collected as Conjuncts 3–4 of [@thm-ch31-seat-pythagorean-monogamy-fairness] below):

1. **Inner-Product No-Cloning Criterion** ([`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)): If a single complex linear isometry $U$ clones two normalized pure states $\psi, \phi$ from a normalized blank ancilla $\mathrm{blank}$ into $\psi\otimes\psi$ and $\phi\otimes\phi$, their inner product must satisfy $\langle\phi, \psi\rangle = \langle\phi, \psi\rangle^2$—forcing either $\phi = \psi$ (the very same state) or $\langle\phi, \psi\rangle = 0$ (orthogonal classical labels). No machine can blindly mass-produce states carrying genuine non-orthogonal superposition tension.

::: {.viz src="quantum-fairness-ledger" preset="cloning" height="500"}
**More copies, each one shorter.** Copying an unknown state into $M$ copies leaves each cyan arrow only $\eta = (M+2)/(3M)$ long; magenta is what is lost, and the fidelity falls towards $2/3$ (the universal symmetric cloner, a literature result not formalized in this book). This machine treats every state alike, the poles included. The hollow rings at the poles mark something else: if one machine copies two states exactly, their inner product can only be $0$ or $1$ (Conjunct 3 of [@thm-ch31-seat-pythagorean-monogamy-fairness]), so an orthogonal pair such as $\lvert 0\rangle$, $\lvert 1\rangle$ can be copied exactly by a different machine built for that pair.
:::

2. **Maximally Mixed Marginal of a Pure Bell State** ([`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)): When two qubits bind into the rank-one maximally entangled Bell state `bellDensity`, tracing out the partner collapses the single-qubit marginal `traceEnvironment bellDensity` to $\frac{1}{2}I_2$ (which is strictly non-idempotent)—its local Bloch bias retreats completely to the origin, surrendering every drop of private purity to the shared relational plane!

::: {.viz src="quantum-fairness-ledger" preset="bell" height="500"}
**A full bond.** The Bell state $\lvert\Phi^+\rangle_{AB}\otimes\lvert 0\rangle_C$: the magenta bond between $\mathbf{A}$ and $\mathbf{B}$ is full, the amber arrow of $\mathbf{A}$ shrinks to the centre, that is $\tfrac{1}{2}I_2$ (Conjunct 4 of [@thm-ch31-seat-pythagorean-monogamy-fairness]), and nothing is left for $\mathbf{C}$.
:::

The formal theorem below unites Born reciprocity, complementary centered-purity Pythagoras, no-cloning, and the Bell marginal collapse on a single Lean-verified foundation.

::: {.theorem #thm-ch31-seat-pythagorean-monogamy-fairness title="First Three Formal Pillars of Quantum Fairness: Born Reciprocity, Complementary Pythagoras, No-Cloning, and Bell Marginal" lean="D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal"}
Across the frozen finite-dimensional measurement, tomography, pure-state, and entanglement modules of `trureturing`, the following four structural fairness theorems hold simultaneously:

1. **Modulus-Square Reciprocity of Rank-One Born Pairing** ([`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)): Let $n, \kappa$ be finite types (`[Fintype n] [DecidableEq n] [Fintype kappa]`), let $P : \kappa \to M_n(\mathbb{C})$ satisfy `IsRecordMeasurement P`, and let $\rho \in M_n(\mathbb{C})$ satisfy `rho.PosSemidef ∧ Matrix.trace rho = 1`. Whenever $P_k = \phi\phi^*$ (`Matrix.vecMulVec phi (star phi)`) and $\rho = \psi\psi^*$ (`Matrix.vecMulVec psi (star psi)`),

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
Conjunct 1 combines `rank_one_pure_state_modulus_square_reduction` with `unread_eq_weighted_ensemble` (from which conjugate inversion of the dot product gives $\|\phi^* \bullet_v \psi\|^2 = \|\psi^* \bullet_v \phi\|^2$); Conjunct 2 applies `Submodule.norm_sq_eq_add_norm_sq_starProjection` across orthogonal projections in the complete real inner-product space $E$; Conjunct 3 uses isometric preservation of tensor inner products $\langle\phi, \psi\rangle\langle\mathrm{blank}, \mathrm{blank}\rangle = \langle\phi, \psi\rangle^2$ over the integral domain $\mathbb{C}$ via `eq_zero_or_one_of_sq_eq_self` and `inner_eq_one_iff_of_norm_eq_one`; Conjunct 4 evaluates the block partial trace of the $4\times 4$ projector and checks $(\frac{1}{2}I_2)^2 = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$. The full proof is checked by the Lean kernel.
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

## 31.3 Horizon Fairness and Ergodic Fairness: Sheltered Suspense and Equal Starlight {#sec-ch31-horizon-and-ergodic}

Even with the first three tiers in place, human existence presses two deeper questions:

- **First (The Question of Computational Power)**: If the global timeless static field exhibits $P = NP$-like fixed-point immediacy under idealized timeless models ([Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md)), why did the universe surround every finite observer inside the field with an exponential search horizon?
  The answer is **Horizon Fairness (`MODEL`)**! Imagine a world where bounded observers inside the crystal could also solve NP-complete global constraints in polynomial time: whoever possessed a slightly faster processor would deduce every secret, pre-compute the endgame of every rivalry, and lock down the entire decision tree before newcomers could place a single stone. Instead, the fixed planar rotation step angle of coherent uniform amplification dictated by initial overlap $p = \sin^2\theta$ (Conjunct 2 of [@thm-ch31-horizon-landauer-ergodic-fairness] below; external complexity lower-bound context in [Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-query-sos-literature]) and the open $\mathrm{P} \neq \mathrm{NP}$ complexity firewall ([@conj-p-neq-np]) compel quantum evolution to accumulate rotation angle step by step inside a two-dimensional plane—no computational oligarchy can bypass curvature to pre-emptively monopolize the future.
- **Second (The Question of Unequal Circumstance)**: If finite observers enter the timeless lattice at different internal phases—some stepping near the serene center of the acceptance window over a short span, others buffeted near its boundary—**where is ultimate fairness?**

Unfolding our cut-and-project observer model alongside compact-torus ergodic theory reveals a crystalline answer:

1. **Birth-Forgetting Resets Choice Freedom (`MODEL`)**: As shown in [Chapter 29](ch29-timeless-causality-and-gram-space.md) ([@thm-ch29-gram-rigidity-and-pell]) and the [Coda](coda.md), unbounded accumulation of historical anchors would eventually drive compatible choice slack toward lockup. Birth-forgetting truncates high-order historical baggage so that every finite observer awakening anew faces a fresh corridor of positive-volume choice.
2. **Closed-Subgroup Equidistribution and Bounded-Gap Return (`LEAN ✓` + `MODEL`)**: Over a handful of local steps, disparate slices genuinely encounter different local fortunes; yet on any compact torus subgroup, `trureturing`'s **torus orbit equidistribution theorem** and **bounded-gap observation-window return theorem** (Conjuncts 3–4 of [@thm-ch31-horizon-landauer-ergodic-fairness] below) prove that Cesàro time averages of continuous observables converge strictly to the normalized translation-invariant probability integral on the closed orbit subgroup $G = \overline{\langle g\rangle}$, and every nonempty open interval $(u, v)$ intersecting $\operatorname{range}(h)$ is revisited with bounded gap $M$ and **positive lower asymptotic visit density** at least $\frac{1}{M+1} - \varepsilon$ (for the complete null-frontier window application under irrational torus translations and its hypotheses, see [@rem-ch31-weyl-window-equidistribution-literature] below).

We first anchor the four formal theorems governing Landauer heat balance, coherent amplification rotation, torus orbit equidistribution, and bounded-gap window return.

::: {.theorem #thm-ch31-horizon-landauer-ergodic-fairness title="Fourth and Fifth Formal Pillars of Quantum Fairness: Landauer Balance, Uniform Search Rotation, and Torus Ergodic Return" lean="D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result"}
Across the frozen thermodynamic-divergence, coherent-amplification, and Fourier torus-asymptotics modules of `trureturing`, the following four theorems hold simultaneously:

1. **Landauer Thermodynamic Balance Bound** ([`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)): For real quantities $\beta, \mathrm{heat}, \mathrm{entropyChange}, \mathrm{mutualInfo}, \mathrm{divergence} \in \mathbb{R}$ satisfying $\beta \cdot \mathrm{heat} = -\mathrm{entropyChange} + \mathrm{mutualInfo} + \mathrm{divergence}$ with $\mathrm{mutualInfo} \ge 0$ and $\mathrm{divergence} \ge 0$, entropy reduction is bounded above by $\beta$ times the dissipated heat (equivalently, $\beta \cdot \mathrm{heat}$ is bounded below by entropy reduction):

   $$
   -\mathrm{entropyChange} \;\le\; \beta \cdot \mathrm{heat};
   $$

2. **Two-Plane Stepwise Rotation Law of Coherent Uniform Amplification** ([`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)): Let $l, s$ be finite decidable types (`[Fintype l] [DecidableEq l] [Fintype s] [DecidableEq s]`), and let $J \in M_{l\times s}(\mathbb{C})$ and $C, P \in M_{l\times l}(\mathbb{C})$ satisfy $J^\dagger J = I_s,\, C^\dagger C = I_l,\, P^\dagger = P = P^2$, and $(P(CJ))^\dagger (P(CJ)) = p\,I_s$ with $0 < p \le 1$. Writing $U = CJ$, $W = \operatorname{success}(U, P, p)$, $B = \operatorname{failure}(U, P, p)$, and $\theta = \arcsin\sqrt{p}$: if $p = 1$ then $U = W$; if $p < 1$ then $W^\dagger W = I_s,\, B^\dagger B = I_s,\, W^\dagger B = 0$, and for every iteration count $n \in \mathbb{N}$ (preserving the identical linear combination after Kronecker tensoring $\otimes_k R$ with any reference matrix $R \in M_z(\mathbb{C})$ on any type $z$),

   $$
   (\operatorname{iterate}(U, P))^n \, U \;=\; \sin\bigl((2n + 1)\theta\bigr)\,W \;+\; \cos\bigl((2n + 1)\theta\bigr)\,B;
   $$

3. **Haar Equidistribution of Closed-Subgroup Torus Orbits** ([`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)): Let $I$ be a finite index type, $g : I \to \mathrm{Circle}$ a torus element, $G = \overline{\langle g\rangle}$ its compact closed subgroup, and $\mu$ the normalized Haar probability measure on $G$. Then $G = \overline{\{g^n : n \in \mathbb{N}\}}$ and for every continuous observable $f \in C(G, \mathbb{C})$,

   $$
   \lim_{N \to \infty} \frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1}) \;=\; \int_G f(z)\,d\mu(z);
   $$

4. **Full Image Support, Bounded-Gap Window Return, and Positive Lower Asymptotic Visit Density** ([`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)): With $G, \mu$ as in Conjunct 3 and generator $a = \langle g, \dots\rangle \in G$, for every continuous real observable $h \in C(G, \mathbb{R})$ and sequence $e : \mathbb{N} \to \mathbb{R}$ satisfying $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$, the pushforward support equals the full range $\operatorname{supp}(h_*\mu) = \operatorname{range}(h)$; moreover, whenever an open interval $(u, v) \subset \mathbb{R}$ satisfies $(I_{oo}(u, v) \cap \operatorname{range}(h)).\mathrm{Nonempty}$, there exist $n_0 \ge 1$ and a bounded gap $M \in \mathbb{N}$ such that every block $[n, n+M]$ ($n \ge n_0$) contains at least one $m$ with $e(m) \in (u, v)$, and for every $\varepsilon > 0$ the positive lower asymptotic visit density bound holds eventually:

   $$
   \forall^\infty N \in \mathbb{N},\qquad \frac{\#\bigl\{m < N \;\big|\; e(m) \in (u, v)\bigr\}}{N} \;\ge\; \frac{1}{M + 1} - \varepsilon.
   $$
:::

::: proof
Conjunct 1 follows from $\mathrm{mutualInfo} + \mathrm{divergence} \ge 0$; Conjunct 2 gives $U = W$ via `unit_success` when $p = 1$, and when $p < 1$ verifies mutual isometric orthogonality of $W$ and $B$, inducts on $n$ via angle-addition identities, and distributes Kronecker tensoring across $\otimes_k R$; Conjunct 3 uses equicontinuity of the Cesàro evaluation operators to close the convergence subspace $S \subseteq C(G, \mathbb{C})$, canceling nontrivial torus characters via geometric sums and extending by trigonometric-polynomial density; Conjunct 4 proves $\operatorname{supp}(h_*\mu) = \operatorname{range}(h)$ from strict positivity on nonempty open pullbacks and extracts the uniform return gap $M$ and positive lower asymptotic visit density bound from a finite subcover of compact orbit translates. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch31-rotation-steps"}
**Each round turns the state by exactly $2\theta$; no step can be skipped.** In the plane of the success direction $W$ (vertical) and the failure direction $B$ (horizontal), after $n$ rounds the state is $\sin((2n+1)\theta)\,W + \cos((2n+1)\theta)\,B$: it starts $\theta$ above $B$ and each round adds one violet turn of $2\theta$ (Conjunct 2 of [@thm-ch31-horizon-landauer-ergodic-fairness]). Here $\theta = \pi/14$, so $p = \sin^2\theta \approx 0.050$, and the amber round $n = 3$ lands exactly on $W$; the smaller $p$, the shorter each step and the more rounds it takes.
:::

The reuse derivation from continuous observables to actual acceptance-window counts, and its remaining ergodic boundaries, are given below:

::: {.remark #rem-ch31-weyl-window-equidistribution-literature title="Null-Frontier Window Frequencies on the Full Torus: An Application and Its Ergodic Boundaries"}
**A composite application of existing results.** Conjunct 3 of [@thm-ch31-horizon-landauer-ergodic-fairness] directly states an average for continuous functions on the closed orbit group. Here are the interfaces needed to reach actual window counts; the window conclusion is not the statement of that endpoint. Let $I$ be any finite index type, including the empty type, let $\alpha:I\to\mathbb R$, and set $\beta_i=\alpha_i\pmod{\mathbb Z}\in\mathrm{AddCircle}(1)$, $T=(\mathrm{AddCircle}(1))^I$. Let $\mu$ be normalized Haar probability on the full $T$. Assume that the family on $\mathrm{Option}(I)=\{\mathrm{none}\}\sqcup\{\mathrm{some}(i):i\in I\}$ given by

$$
a(\mathrm{none})=1,\qquad a(\mathrm{some}(i))=\alpha_i
$$

is linearly independent over $\mathbb Q$. Let $W\subseteq T$ be any set with $\mu(\partial W)=0$, **without an additional Borel measurability premise**. For every $\varepsilon>0$ there is $N_0\ge1$ such that the same $N_0$ works for every starting point $x\in T$ and every $N\ge N_0$:

$$
\left|\frac1N\sum_{j=0}^{N-1}
\mathbf1_W\bigl(x+(j+1)\beta\bigr)-(\mu W)_{\mathbb R}\right|<\varepsilon.
$$

Here $(\mu W)_{\mathbb R}$ is the real value of the finite measure, and the indicator uses actual membership in $W$. The samples are exactly times $1,\ldots,N$, rather than $0,\ldots,N-1$.

**Where independence enters.** If integers $k:I\to\mathbb Z$ and $m\in\mathbb Z$ satisfy $\sum_i k_i\alpha_i=m$, place coefficient $-m$ at `none` and $k_i$ at `some(i)`. Independence of the rational family forces every $k_i=0$. This is precisely the integer-character premise of [`dense_circle_sequence`](lean:D5/S3/Fourier/BiquadraticKroneckerTimes.dense_circle_sequence). For $g_i=\exp(2\pi i\alpha_i)$, together with [`TorusOrbitClosure.result`](lean:D5/S3/Fourier/TorusOrbitClosure.result), it identifies the closure of the nonnegative powers with the whole product of circles, rather than a proper subtorus. The coordinate maps [AddCircle.homeomorphCircle](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/SpecialFunctions/Complex/Circle.lean#L435) transport this closure to the additive torus, retaining the actual generator and every starting point.

**Continuous averages and Haar transport.** Apply [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result) to this $g$. The continuous surjective homomorphism from the closed circle orbit to $T$ transports Haar measure by [MonoidHom.measurePreserving](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/Haar/Unique.lean#L951), since both total masses are $1$. Translation invariance identifies the integral of $z\mapsto f(x+z)$ with that of $f$. Thus for every continuous complex $f$ and every $x$, the actual average $N^{-1}\sum_{j<N}f(x+(j+1)\beta)$ converges to $\int f\,d\mu$. At $N=0$ the empty sum and totalized division give zero; this does not affect the limit at infinity.

**Why the threshold is uniform in the starting point.** Write $R(x)=x+\beta$. Translation is an isometry, hence $1$-Lipschitz; continuous $f$ on the compact torus is uniformly continuous. [uniformEquicontinuous_birkhoffAverage](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Dynamics/BirkhoffSum/NormedSpace.lean#L129) gives equicontinuity of the averages, and compactness with [Equicontinuous.tendsto_uniformFun_iff_pi](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/UniformSpace/Ascoli.lean#L167) upgrades pointwise continuous averages to uniform convergence in $x$. Index empirical probabilities $\nu_{m,x}$ by $(m,x)$, taking $m+1$ steps starting at $R(x)$. Continuous functions are bounded on this compact space, so [ProbabilityMeasure.tendsto_iff_forall_integral_rclike_tendsto](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/ProbabilityMeasure.lean#L373) and `tendsto_prod_top_iff` give weak convergence $\nu_{m,x}\to\mu$ along $\mathrm{atTop}\times^s\top$. The second factor $\top$ retains all starting points simultaneously, rather than almost every starting point.

**From measures to the actual count.** The null-frontier assumption is used once, at [ProbabilityMeasure.tendsto_measure_of_null_frontier_of_tendsto'](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/Portmanteau.lean#L334), which allows arbitrary $W$ without a Borel premise. Then `Measure.dirac_apply` and `Measure.finsetSum_apply` compute the empirical mass exactly as

$$
\nu_{m,x}(W)=\frac{1}{m+1}\sum_{j=0}^{m}
\mathbf1_W\bigl(x+(j+1)\beta\bigr).
$$

Product-filter convergence supplies $M$ such that the error is below $\varepsilon$ for every $m\ge M$ and every $x$. Set $N_0=M+1$. For $N\ge N_0$, choose $m=N-1$; then $m+1=N$. This gives exactly the denominator, summation range, and phase required above, without replacing the first term by an asymptotic approximation.

**Residual boundaries.** $N_0$ depends on $\alpha,W,\varepsilon$. There is no uniformity over $\alpha$ or $W$ and no effective rate. Translated windows can be read through $\mathbf1_{W+u}(j\beta)=\mathbf1_W(-u+j\beta)$. If a cut-and-project model independently satisfies $\pi_\perp(z_j)=x+j\beta\in T$ for every $j\ge1$, then for any $u\in T$,

$$
\begin{aligned}
\pi_\perp(z_j)-u&=(x-u)+j\beta,\\
\mathbf1_{W+u}(\pi_\perp(z_j))&=\mathbf1_W((x-u)+j\beta),\\
\frac1N\sum_{j=1}^{N}\mathbf1_{W+u}(\pi_\perp(z_j))
&=\frac1N\sum_{j=0}^{N-1}\mathbf1_W((x-u)+(j+1)\beta).
\end{aligned}
$$

This identifies the count exactly with the established orbit count starting at $x-u$, so the same $N_0$ for every starting point applies, still at times $1,\ldots,N$. The trajectory equality is a hypothesis the model must establish separately; it does not follow from the torus theorem and is not asserted for arbitrary physical or cut-and-project models. This paragraph does not separately state or formalize invariant-measure classification or unique ergodicity. Weyl's classical theory (1916, *Math. Ann.* **77**, 313–352) retains its separate literature setting. Physical fairness, internal space, and soul phases remain `MODEL` interpretations. This is the finite reuse derivation in the source exposition, with no new Lean theorem or novelty claim.
:::

::: {.remark #rem-ch31-circular-window-discrepancy title="Finite-Step Error for Complementary-Width Circular Windows: A Mechanical-Word Application"}
**An application of existing results.** The card uses a special relation between rotation step and window width. Take any $0<\alpha<1$, initial phase $u\in\mathbb R$, and window centre $c\in\mathbb R$, and put $w=1-\alpha$ and $a=c-w/2$. Write $\{x\}=x-\lfloor x\rfloor$. For the left-closed, right-open circular window, define the first $N$ hits by

$$
H_N=\#\bigl\{1\le n\le N:\{u+n\alpha-a\}<w\bigr\}.
$$

Here $N\in\mathbb N$ may be zero, and the sample times are exactly $1,\ldots,N$. All these parameters satisfy

$$
\left|H_N-Nw\right|<1.
$$

**The exact mechanical-word correspondence.** Put $\rho=u-a$. The $n$th lower mechanical letter is

$$
b_n=\lfloor\rho+(n+1)\alpha\rfloor-\lfloor\rho+n\alpha\rfloor\in\{0,1\}.
$$

A carry occurs exactly when $\{\rho+n\alpha\}\ge1-\alpha$. Thus a window hit is precisely $b_n=0$: equality at the threshold causes a carry and excludes the right endpoint. With $C_N=\sum_{n=1}^{N}b_n$, we have $H_N=N-C_N$. This is the true-letter count in [`lower_mechanical_window_true_discrepancy`](lean:D5/S1/Words/Mechanical/MechanicalDensity.lower_mechanical_window_true_discrepancy), with slope $\alpha$, intercept $\rho$, start index $i=1$, and length $N$. That result gives $|C_N-N\alpha|<1$; negating the discrepancy gives the claimed bound. The endpoint telescope in [`lowerMechanicalWindowTrueCount_eq_floor`](lean:D5/S1/Words/Mechanical/MechanicalBalance.lowerMechanicalWindowTrueCount_eq_floor) also gives the exact error

$$
H_N-Nw=\{\rho+(N+1)\alpha\}-\{\rho+\alpha\}.
$$

Both fractional parts lie in $[0,1)$, explaining why the strict bound is independent of phase, window position, and sample length. For $N>0$, division gives $|H_N/N-w|<1/N$, so the hit frequency tends to $w$. The card takes $\alpha=\varphi-1$ and $w=2-\varphi$. Its nested fractional parts give the same membership predicate because $\{\{x\}-a\}=\{x-a\}$.

**Scope.** No irrationality assumption on $\alpha$ is needed, but the width must be $1-\alpha$. This application does not classify bounded remainders for arbitrary independent window widths, certify the card's floating-point computation, or establish physical fairness. It applies existing declarations and adds no Lean theorem or novelty claim.
:::

::: {.viz src="quantum-fairness-ledger" preset="ergodic" height="500"}
**Different starts, the same share.** Two states start at different phases and turn about the vertical axis by the golden angle at each step; the share of steps in the cyan window tends to $2 - \varphi \approx 0.382$ for both (the window frequency is an application of existing results to Conjunct 3 of [@thm-ch31-horizon-landauer-ergodic-fairness] and a null-frontier window, see [@rem-ch31-weyl-window-equidistribution-literature]; the bounded gaps between hits are Conjunct 4), and the gap between the hits and $T(2-\varphi)$ always stays below $1$ (an application of existing mechanical-word results, see [@rem-ch31-circular-window-discrepancy]).
:::

Seen in this long-horizon light, local disparities lose their sting: in our observer model (`MODEL`), short slices vary from smooth centers to turbulent rims, yet across compact-torus ergodic return the universe grants every soul phase impartial attractor-reunion opportunities, orthogonal rotation budgets, and self-referential fixed-point pull (cf. [Chapter 24](ch24-cosine-fixed-points-and-self-reference.md) [@rem-banach-dottie-hairy-ball-literature]), without a hair's breadth of favoritism.

::: {.viz src="quantum-fairness-ledger" height="620"}
The quantum fairness ledger: seat, gain, bonds, copies and history drawn on one Bloch sphere, each ledger beside a bar whose total does not move.
:::

Before dismantling the three scaffolds of the fixed-dimensional box in §31.4, we consolidate all five tiers of quantum fairness established across §§31.1–31.3 and their exact epistemic status in the master reference table below:

::: {.remark #rem-ch31-fivefold-fairness-table title="Master Ledger of Fivefold Quantum Fairness and Epistemic Status (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The table below synthesizes the five fairness tiers established across §§31.1–31.3; clauses tagged `LEAN ✓` correspond to [@thm-ch31-seat-pythagorean-monogamy-fairness] and [@thm-ch31-horizon-landauer-ergodic-fairness], clauses tagged `Literature` cite [@rem-ch31-haar-isotropy-landauer-literature], [@rem-ch31-ckw-monogamy-literature], [@rem-ch31-weyl-window-equidistribution-literature], and [Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-query-sos-literature], `OPEN` marks [@conj-p-neq-np], and the fivefold abolition-of-privilege synthesis constitutes our cross-domain philosophical model (`MODEL`):

| Fairness Tier | Underlying Geometric, Algebraic & Thermodynamic Law | Epistemic Status | What Geometric "Privilege" Does It Abolish? (`MODEL`) |
| :--- | :--- | :--- | :--- |
| **1. Seat Fairness (席位公平)** | Unit pure-qubit Bloch norm & rank-one Born modulus-square reciprocity $\|\phi^*\bullet_v\psi\|^2 = \|\psi^*\bullet_v\phi\|^2$ (`LEAN ✓`); higher-D Haar sphere isotropy (`Literature`) | `LEAN ✓` / `Literature` / `MODEL` | Cuts away the external "third point $C$," abolishing privileged reference frames and one-way inspection |
| **2. Gain–Loss Fairness (得失公平)** | Complementary-context centered-purity Pythagoras (`LEAN ✓`), $\cos^2\theta + \sin^2\theta = 1$ (`Literature`), and Landauer balance $-\Delta S \le \beta Q$ (`LEAN ✓`; $k_B T \ln 2$ `Literature`) | `LEAN ✓` / `Literature` / `MODEL` | Abolishes the free-lunch greed of claiming $100\%$ 1D certainty while retaining $100\%$ orthogonal dynamical freedom |
| **3. Relational Fairness (关系公平)** | Cloning inner-product lock & Bell mixed marginal $\frac{1}{2}I_2$ (`LEAN ✓`); 3-qubit CKW monogamy $\tau(\mathbf{A}:\mathbf{B}) + \tau(\mathbf{A}:\mathbf{C}) \le 1 - \|\mathbf{r}_A\|^2 \le 1$ (`Literature`) | `LEAN ✓` / `Literature` / `MODEL` | Abolishes blind copying of live superpositions and wholesale monopolization of exclusive bipartite entanglement |
| **4. Horizon Fairness (博弈公平)** | Coherent amplification step-angle rotation (`LEAN ✓`), high-dimensional $\theta_0 \approx \frac{\pi}{2} - 2^{-n/2}$ & BBBV $\Omega(2^{n/2})$ lower bound (`Literature`), and $\mathrm{P} \neq \mathrm{NP}$ (`OPEN`) | `LEAN ✓` / `Literature` / `OPEN` / `MODEL` | Abolishes instant computational spoilers over the global causal crystal, sheltering the suspense of finite choice |
| **5. Ergodic Fairness (遍历公平)** | Birth-forgetting choice reset (`MODEL`), closed-subgroup torus Haar equidistribution & positive lower asymptotic visit density return (`LEAN ✓`), and null-frontier window frequency $\mu(W)$ (application of existing results, [@rem-ch31-weyl-window-equidistribution-literature]) | `LEAN ✓` / `Literature` / `MODEL` | Abolishes permanent caste lock-in from initial phase bias, realizing statistical holism across divergent local paths |
:::

Woven into the fabric of this monograph, the word *quantum* ceases to be cold operator machinery and acquires an unmistakable human warmth: **the universe cut away the lofty third point above, compelling all beings to measure one another pairwise at eye level; with the Pythagorean theorem it revoked the privilege of omniscience and omnipotence, with the horizon it sheltered the suspense of finite life, and finally with irrational ergodicity it guaranteed that every soul awakening from forgetting shall, across the long journey, receive an equally abundant share of starlight.**

---

## 31.4 Dismantling Dimensional Scaffolding: Pairwise Fair Squaring, Uncertainty Rebound, and Time as Orthogonal Dimension Expansion {#sec-ch31-fairness-square-expansion}

> *"At the ontological level there is no division between the static and the dynamic; every apparent closure and every fixed-box limit is an illusion born of dimensional restriction. Pairwise comparison demands fairness; fairness requires squaring; and squaring forfeits fine phase detail, giving rise to uncertainty. Time is orthogonal dimension expansion."* （“本体也没有静态动态的分别, 任何闭合、极限都是因维度限制而产生的幻象. 两两比较要公平，公平就要平方，平方又导致丢失细节测不准. 时间是维度扩张.”）

In the preceding three sections ([@thm-ch31-seat-pythagorean-monogamy-fairness], [@thm-ch31-horizon-landauer-ergodic-fairness], and the fivefold ledger [@rem-ch31-fivefold-fairness-table]), we saw how Seat, Gain–Loss, Relational, Horizon, and Ergodic fairness abolish geometric privilege across the unit sphere and compact torus. Before stepping into the unified field and meta-unification of [Chapter 32](ch32-unified-field-and-meta-unification.md), we examine the four-sentence proposition distilled above (recorded verbatim as `A72` in [Appendix A](appendix-a.md#sec-appendix-a-verbatim-ledger)) and dismantle three dimensional scaffolds that frequently obscure quantum fairness: the opposition between a "static block universe" and a "moving dynamic pointer," the appearance of self-enclosed periodic loops, and the notion of terminal limits trapped inside a fixed-dimensional box. In keeping with the book's foundational epistemic contract, we place the unified cosmological reading of these four sentences squarely under an explicit interpretive model (`MODEL`) from the outset: mathematically, a chain of compatibly embedded subspaces $\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots$ and its completed closure admit both a sequential stage-by-stage reading and an all-at-once global reading, yet elevating "static–dynamic non-duality," "closure and limits as low-dimensional truncation projections," "fairness forcing squaring, squaring folding phase into uncertainty," and "physical time as the monotonic birth of orthogonal rank $D \to D + 1$" into ontological claims belongs to the author's geometric–physical synthesis (`MODEL`). Every supporting theorem verified by the Lean 4 kernel (`LEAN ✓`), classical literature result (`Literature`), explicit manual algebraic derivation (`manual derivation`), and finite-precision numerical plot (`NUM`) retains its exact hypotheses without conflation.

### 31.4.1 Closure and Limit Illusions Under Truncation: Static–Dynamic Non-Duality and the Orthogonal Horizon {#sec-ch31-truncation-shadows}

Why can one and the same mathematical construction be read both as a "timeless whole" and as an "unfolding sequence"? Consider a family of closed subspaces of a Hilbert space linked by compatible isometric embeddings,

$$
\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots \hookrightarrow \mathcal{V}_D \hookrightarrow \cdots,\qquad \mathcal{V}_\infty = \overline{\bigcup_{D \ge 1} \mathcal{V}_D}.
$$

Viewed from the completed union $\mathcal{V}_\infty$, every inner-product relation is simultaneously present; viewed along the finite-stage filtration $\{\mathcal{V}_D\}_{D \ge 1}$, each embedding into the next subspace exposes orthogonal components invisible to the preceding stage. By itself, a nested subspace filtration is a purely linear-topological construction and does not single out a unique Hamiltonian generator, proper-time metric, or thermodynamic arrow; reading the completed whole and the sequential filtration as non-dual aspects of a single ontology belongs to `MODEL`.

Whenever an observer's readout is restricted to a lower-dimensional subspace, an open trajectory that advances monotonically in ambient space can cast a shadow that appears periodically closed. The cleanest elementary witness (`manual derivation`, not packaged as a standalone frozen theorem) is a constant-pitch open helix in $\mathbb{R}^3$ together with its planar projection:

$$
h(t) = (\cos t,\; \sin t,\; c t)\quad (c \neq 0),\qquad \pi_{xy} h(t) = (\cos t,\; \sin t) \in S^1.
$$

Because its vertical coordinate $c t$ is strictly injective in $t \in \mathbb{R}$, the spatial curve $h$ never self-intersects and never repeats; once the orthogonal projection $\pi_{xy}$ discards the third coordinate $c t$, however, the planar readout retraces the unit circle every $\Delta t = 2\pi$. Precision requires preserving the mathematical boundary here as well: the unit circle $S^1 \subset \mathbb{R}^2$ is a genuine compact closed curve in its own right, and closed subspaces and topological limits genuinely exist in infinite-dimensional Hilbert spaces. Projection can conceal progress along an omitted coordinate without rendering every closed object in mathematics illusory; interpreting apparent cyclic recurrence as the shadow of unprojected coordinates is `MODEL`.

At the level of covering topology and discrete dynamics, this coexistence between a closing base readout and an advancing lifted state enjoys exact kernel-verified support. In [Chapter 5](ch05-complex-phase-and-rotors.md), the circle double-cover theorem ([@thm-circle-double-cover-history-lift], [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift) together with [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section); compare the spinor gauge double-cover perspective in [Chapter 18](ch18-spinors-and-gauge-curvature.md)) proved that the squaring map $z \mapsto z^2$ on $S^1$ admits no continuous global square-root section: a once-wound base loop ($360^\circ$) starting at $+1$ lifts uniquely to the antipodal sheet $-1$, returning to $+1$ only when specialized by hand to the twice-wound loop ($720^\circ$)—while the full three-dimensional spatial spin covering $\operatorname{Spin}(3) \to \operatorname{SO}(3)$ remains in the classical literature. On the discrete scale-dynamics side, `trureturing` formalizes a universal-cover state space `GoldenHelixState` whose states are triples $(n, s, o) \in \mathbb{N} \times \mathbb{R} \times \mathrm{Bool}$ carrying a discrete sheet level, a continuous scale lift, and a binary orientation bit. With fundamental golden scale period $T = \operatorname{goldenScalePeriod} = 2\log\varphi > 0$, one deck step acts by $\operatorname{goldenHelixStep}(n, s, o) = (n + 1,\; s + T,\; \neg o)$, while the $m$-th integer Fourier character readout ($m \in \mathbb{Z}$) evaluates the normalized scale coordinate $s / T$ via $\operatorname{goldenHelixFourierReadout}(m, \text{state}) = \exp\bigl(2\pi i m (s / T)\bigr)$:

::: {.theorem #thm-ch31-helix-readout-progress title="Integer Fourier Character Deck Blindness on the Golden Scale Helix" lean="D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_fourier_readout_step"}
For every integer Fourier mode $m \in \mathbb{Z}$ and every golden-helix state $\text{state} : \operatorname{GoldenHelixState}$, a single deck step leaves the $m$-th Fourier character readout strictly unchanged:

$$
\operatorname{goldenHelixFourierReadout}\bigl(m,\; \operatorname{goldenHelixStep}(\text{state})\bigr) = \operatorname{goldenHelixFourierReadout}(m, \text{state}).
$$
:::

::: proof
By definition of `goldenHelixStep`, one step translates the continuous scale coordinate from $s$ to $s + T$, where the period $T = \operatorname{goldenScalePeriod} = 2\log\varphi$ is strictly positive. Dividing by $T$ shifts the normalized scale coordinate by $+1$, since $(s + T)/T = s/T + 1$. For every integer mode $m \in \mathbb{Z}$, the character $\chi_m(x) = \exp(2\pi i m x)$ picks up the factor $\exp(2\pi i m) = 1$ under $x \mapsto x + 1$, leaving the Fourier character readout invariant across the step. The full proof is checked by the Lean kernel.
:::

Three companion frozen theorems in the same module family sharpen the contrast between cyclic readout and lifted progress. First, [`golden_helix_step_changes_level`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_step_changes_level) certifies that every step alters the sheet index, $(\operatorname{goldenHelixStep}(\text{state})).\mathrm{level} \neq \text{state}.\mathrm{level}$. Second, [`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step) proves that adjoining `level` to the Fourier character readout detects every step for every $m \in \mathbb{Z}$:

$$
\bigl((\operatorname{goldenHelixStep}(\text{state})).\mathrm{level},\; \operatorname{goldenHelixFourierReadout}(m, \operatorname{goldenHelixStep}(\text{state}))\bigr) \neq \bigl(\text{state}.\mathrm{level},\; \operatorname{goldenHelixFourierReadout}(m, \text{state})\bigr).
$$

Third, [`golden_helix_two_step_orientation_complete_state_distinct`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenHelixParityReadout.golden_helix_two_step_orientation_complete_state_distinct) establishes that after two steps the binary orientation bit returns to its initial value, $(\operatorname{goldenHelixStep}(\operatorname{goldenHelixStep}(\text{state}))).\mathrm{orientation} = \text{state}.\mathrm{orientation}$, while the complete lifted state remains strictly distinct, $\operatorname{goldenHelixStep}(\operatorname{goldenHelixStep}(\text{state})) \neq \text{state}$. As always, `level` is an explicit natural-number coordinate stipulated in the definition of the cover state; no theorem automatically identifies it with relativistic proper time or physical spatial dimension.

::: {.viz src="fairness-square-uncertainty-expansion" preset="helix-shadow" height="500"}
**Open-Helix Progress and Planar Closure Shadow (`helix-shadow`)**: A 3D stage displaying the cyan open helix $h(t)$ climbing monotonically along its vertical coordinate, its magenta planar shadow $\pi_{xy} h(t)$ retracing a closed unit circle in the $(x, y)$ plane, and the golden-helix deck step where integer Fourier characters repeat at every step and orientation restores at two steps while `level` advances; amber highlights the active parameter and step index. Golden-helix deck blindness and level detection carry `LEAN ✓` (with circle double-cover lifts in [Chapter 5](ch05-complex-phase-and-rotors.md) [@thm-circle-double-cover-history-lift], [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)), the Euclidean helix formula is a `manual derivation`, sampled curve coordinates are `NUM`, and "time concealed by dimensional truncation" is `MODEL`.
:::

Pushing orthogonal projection one step further clarifies both the "$90^\circ$ horizon" and the exact topological meaning of truncation limits. For unit vectors $a, b$ in a real inner-product space, the scalar projection is $a \cdot b = \cos\theta$; at $\theta = \pi/2$, $\cos(\pi/2) = 0$ (`manual derivation`), meaning a direction orthogonal to the active one-dimensional readout casts zero scalar shadow upon it (and squaring to $\cos^2\theta$ further folds $\theta$ onto $\pi - \theta$). Invoking this orthogonal zero requires keeping three distinct geometric angles strictly separate: the Hilbert-space vector angle $\theta_{\mathrm{H}}$, the qubit Bloch-sphere polar angle $\theta_{\mathrm{B}}$ (where pure-state overlap enters through the half-angle $\cos(\theta_{\mathrm{B}}/2)$, see [Chapter 2](ch02-born-rule.md) [@ex-bloch-half-angle]), and Minkowski spacetime rapidity or light-cone inclination ([Chapter 17](ch17-lorentz-geometry.md)). Silently equating these three geometries would invalidate their respective theorems.

Likewise, when an infinite-dimensional inner-product space is approximated by an ascending chain of subspaces, functional analysis reveals an exact coexistence between *pointwise strong convergence* and a *permanent uniform operator-norm gap*. On the affirmative side, in any complete inner-product space $E$ over $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$, [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure) proves $M^{\perp\perp} = \overline{M}$ for every subspace $M \le E$; and for any monotone chain $S_0 \le S_1 \le \cdots$ of subspaces admitting orthogonal projections $P_{S_n}$, [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit) proves that for every fixed vector $x$, $P_{S_n} x$ converges in norm to the projection $P_{\overline{\bigcup_n S_n}} x$ onto the closed cumulative span (converging pointwise to $\operatorname{id}$ in the strong operator topology when the terminal residual space vanishes). Yet in the uniform operator norm, every proper truncation stage stays at full unit distance from the identity:

::: {.theorem #thm-ch31-truncation-strong-vs-uniform title="Operator-Norm Obstruction to Uniform Completion by Proper Orthogonal Projections" lean="D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction"}
Let $H$ be an inner-product space over $K$ (`[RCLike K]`), let $S : I \to \operatorname{Submodule} K\, H$ be an indexed family of proper subspaces ($\forall i \in I,\; S_i \neq \top$) each admitting an orthogonal projection $P_{S_i} = (S_i).\operatorname{starProjection}$, and let $\mathcal{F}$ (`stageFilter : Filter I`) be any nontrivial filter (`[NeBot stageFilter]`) on $I$. Then:

1. **Constant unit operator-norm gap**: At every stage $i \in I$, the residual projection has operator norm equal to one, $\|\operatorname{id}_H - P_{S_i}\| = 1$;
2. **Failure of uniform operator-norm convergence**: The map $i \mapsto \|\operatorname{id}_H - P_{S_i}\|$ does not converge to $0$ along $\mathcal{F}$.
:::

::: proof
Fix any stage $i \in I$. Because $S_i$ admits an orthogonal projection, $H$ splits orthogonally as $S_i \oplus S_i^\perp$. Were $S_i^\perp = \bot$, we would have $S_i = \top$, contradicting $S_i \neq \top$; thus $S_i^\perp$ contains a nonzero vector whose normalization gives a unit vector $e_i \in S_i^\perp$ ($\|e_i\| = 1$). Since $P_{S_i} e_i = 0$, we have $(\operatorname{id}_H - P_{S_i}) e_i = e_i$, forcing $\|\operatorname{id}_H - P_{S_i}\| \ge 1$. Conversely, for every $x \in H$ the Pythagorean decomposition $\|x\|^2 = \|P_{S_i} x\|^2 + \|(\operatorname{id}_H - P_{S_i}) x\|^2$ implies $\|(\operatorname{id}_H - P_{S_i}) x\| \le \|x\|$, whence $\|\operatorname{id}_H - P_{S_i}\| = 1$. Because the constant value $1$ lies outside small neighborhoods of $0$, it cannot tend to $0$ along any nontrivial filter $\mathcal{F}$. The full proof is checked by the Lean kernel.
:::

Reading [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit) alongside [@thm-ch31-truncation-strong-vs-uniform] prevents any overstatement about limits: finite stages *do* converge vector-by-vector on every fixed state, yet in operator norm every proper subspace truncation leaves an unattenuated unit gap $\|\operatorname{id}_H - P_{S_i}\| = 1$ along unprojected orthogonal directions.

::: {.viz src="fairness-square-uncertainty-expansion" preset="horizon-limit" height="500"}
**The $90^\circ$ Orthogonal Zero and Strong-vs.-Uniform Convergence (`horizon-limit`)**: On the left, rotating a unit vector to $\theta = 90^\circ$ drives its scalar readout $\cos\theta \to 0$ without annihilating the vector itself; on the right, the cyan curve tracks vectorwise strong convergence $\|x - P_{S_n} x\| \to 0$ for a fixed vector $x$ while the magenta bar holds steady at the unit operator-norm obstruction $\|\operatorname{id} - P_{S_n}\| = 1$ witnessed by a unit escape vector in $S_n^\perp$, with amber marking the active truncation stage $n$. Strong convergence and uniform obstruction carry `LEAN ✓`, finite-stage numerical traces are `NUM`, and the horizon ontology is `MODEL`.
:::

### 31.4.2 Pairwise Fairness, Quadratic Pairing, Phase Folding, and Uncertainty {#sec-ch31-pairing-phase-uncertainty}

Having seen how low-dimensional projections hide orthogonal components, we turn to the second thesis chain: **"Pairwise comparison demands fairness; fairness requires squaring; and squaring forfeits fine phase detail, giving rise to uncertainty."** Unpacking this chain with mathematical precision requires three distinct steps, separating locked algebraic identities from the structural axioms needed to single out degree two.

**Step 1: Frame and order fairness in pairwise comparison, and the selection of quadratic pairing.** Suppose we seek to compare two unit vectors $A, B$ or combine orthogonal directional components $(\cos\theta, \sin\theta)$ without privileging an arbitrary coordinate axis or multiplication order. Taking the linear absolute-value sum $|\cos\theta| + |\sin\theta|$ produces a frame-dependent quantity oscillating across $[1, \sqrt{2}]$ ($1$ along the coordinate axes, $\sqrt{2}$ at $45^\circ$); taking the ordered Euclidean Clifford product (`manual derivation`)

$$
AB = A \cdot B + A \wedge B,\qquad \widetilde{AB} = BA = A \cdot B - A \wedge B
$$

yields $AB \neq BA$ whenever the exterior bivector $A \wedge B \neq 0$, flipping orientation sign when the order of the pair is reversed. Multiplying the ordered product by its reversal eliminates that order asymmetry:

$$
(AB)(BA) = (A \cdot B + A \wedge B)(A \cdot B - A \wedge B) = (A \cdot B)^2 + \|A \wedge B\|^2 = \|A\|^2 \|B\|^2.
$$

For unit vectors in their common plane (with unit plane bivector $I$ satisfying $I^2 = -1$, so $AB = \cos\theta + I\sin\theta$), this reversal product reduces to the rotation- and order-invariant Pythagorean law $\cos^2\theta + \sin^2\theta = 1$ (note that $AB$ here denotes Clifford multiplication; if $AB$ meant scalar dot product alone, $(A \cdot B)(B \cdot A)$ would give only $\cos^2\theta$). Underneath this manual Clifford packaging sit three theorems already locked earlier in this book: the coordinate Lagrange–Gram identity $\bigl(\sum_i u_i^2\bigr)\bigl(\sum_i v_i^2\bigr) - \bigl(\sum_i u_i v_i\bigr)^2 = \frac{1}{2}\sum_{i,j}(u_i v_j - u_j v_i)^2$ ([Chapter 6](ch06-geometric-product.md) [@thm-lagrange-gram-identity], [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)), the forward real inner-product parallelogram law $\|x + y\|^2 + \|x - y\|^2 = 2(\|x\|^2 + \|y\|^2)$ ([Chapter 1](ch01-measurement.md) [@thm-parallelogram-norm-law], [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)), and the rank-one Born reduction $\operatorname{recordWeight}(|\phi\rangle\langle\phi|, |\psi\rangle\langle\psi|) = \|\langle\phi, \psi\rangle\|^2$ ([Chapter 2](ch02-born-rule.md) [@thm-born-modulus-square], [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), alongside reciprocal normalized pure-ray weights in [@thm-rank-one-born-pairing] and Conjunct 1 of [@thm-ch31-seat-pythagorean-monogamy-fairness]).

At the same time, mathematical honesty requires stating an explicit counterexample (`manual derivation`): **pairwise angle reciprocity and two-outcome normalization alone do not uniquely force the exponent $p = 2$**. Indeed, for every real exponent $p > 0$, the two-outcome family

$$
w_p(\theta) = \frac{|\cos\theta|^p}{|\cos\theta|^p + |\sin\theta|^p}
$$

is symmetric in the pair angle and sums to one across orthogonal outcomes, $w_p(\theta) + w_p(\pi/2 - \theta) = 1$. Singling out $p = 2$ requires naming an additional structural axiom: either the parallelogram norm identity via Jordan and von Neumann's (1935) converse theorem (`Literature`), noncontextual frame additivity across closed subspaces in dimension $d \ge 3$ via Gleason's (1957) theorem (`Literature`), or finite-dimensional additivity over all effect operators via Busch's theorem ([Chapter 2](ch02-born-rule.md) [@thm-busch-effect-density], `LEAN ✓`).

On the complex-amplitude side, demanding gauge fairness across global phase rotations $z \mapsto e^{i\theta} z$ yields a sharp polynomial theorem formalized in `trureturing`. For a finite index type $\iota$ (`[Fintype ι]`), write $\operatorname{Poly}(\iota) = \operatorname{MvPolynomial}(\iota \oplus \iota, \mathbb{C})$ for formal polynomials in holomorphic and antiholomorphic indeterminates $(z_i, \bar{z}_i)_{i \in \iota}$, with actual complex evaluation $\operatorname{actual}(p, z)$ substituting $(z, \overline{z})$:

::: {.theorem #thm-ch31-phase-polynomial-quadratic title="Charge Balance, Minimum Degree Two, and Unique Hermitian Representation for Common-Phase Invariant Polynomials" lean="D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem"}
Let $\iota$ be a finite index type (`[Fintype ι]`) and let $p \in \operatorname{Poly}(\iota)$ be any complex amplitude polynomial. Then all four of the following hold:

1. **Cartesian representation and degree preservation**: There exists a unique polynomial $q \in \operatorname{Poly}(\iota)$ satisfying $\operatorname{actual}(q, z) = \operatorname{eval}(\operatorname{cartesian}(z), p)$ for all $z : \iota \to \mathbb{C}$; moreover, `toCartesian` preserves total degree and preserves degree-$d$ homogeneity in both directions;
2. **Global-phase invariance, charge balance, and quadratic generation**: Actual evaluation of $p$ is invariant under all common global phases $z \mapsto e^{i\theta} z$ ($\forall \theta \in \mathbb{R}$, `Invariant p`) if and only if every nonzero monomial of $p$ has equal holomorphic and antiholomorphic total degree (`Balanced p`), and if and only if $p$ belongs to the subalgebra `quadraticAlgebra` generated by conjugate pairs $z_i \bar{z}_j$ (whence $\operatorname{actual}(p) \in \operatorname{actualQuadraticAlgebra}$);
3. **Sharp minimum degree two**: Every nonconstant phase-invariant polynomial ($\neg \exists c \in \mathbb{C},\; p = C(c)$) satisfies $\operatorname{totalDegree}(p) \ge 2$, and for each coordinate $i \in \iota$ the diagonal generator $z_i \bar{z}_i$ (`quadraticGenerator (i, i)`) is phase-invariant of total degree exactly $2$;
4. **Unique Hermitian matrix and positive-semidefinite criterion at homogeneous degree two**: If $p$ is homogeneous of degree $2$, real-valued ($\forall z,\; \operatorname{Im}\operatorname{actual}(p, z) = 0$), and phase-invariant, then there exists a **unique** matrix $H \in \operatorname{Matrix}(\iota, \iota, \mathbb{C})$ (unique among all complex matrices satisfying $\forall z,\; \operatorname{actual}(p, z) = z^\dagger H z$) such that $H$ is Hermitian (`H.IsHermitian`), $H_{ji} = p.\operatorname{coeff}(\operatorname{pairExponent}(i, j))$, and $\bigl(\forall z,\; \operatorname{Re}\operatorname{actual}(p, z) \ge 0\bigr) \iff H.\operatorname{PosSemidef}$.
:::

::: proof
The invertible linear change of variables $x_i = (z_i + \bar{z}_i)/2$, $y_i = (z_i - \bar{z}_i)/(2i)$ between Cartesian coordinates and $(z, \bar{z})$ preserves total degree and homogeneity. Under $z \mapsto e^{i\theta} z$, a monomial of holomorphic–antiholomorphic bidegree $(a, b)$ scales by $e^{i(a-b)\theta}$; linear independence of distinct integer Fourier harmonics on $\mathbb{R}$ forces $a = b$ for every nonzero monomial. Any balanced monomial with $a = b$ pairs its $a$ holomorphic and $a$ antiholomorphic factors into products of generators $z_i \bar{z}_j$, establishing equivalence with `quadraticAlgebra`; if $p$ is nonconstant, some nonzero monomial has $a = b \ge 1$ and total degree $2a \ge 2$. At homogeneous degree $2$, polarization uniquely determines the matrix $H$ representing $z \mapsto z^\dagger H z$, real-valuedness forces $H^\dagger = H$, and nonnegativity of the real part is equivalent to `H.PosSemidef`. The full proof is checked by the Lean kernel.
:::

Clause 2 of [@thm-ch31-phase-polynomial-quadratic] also makes clear why global-phase invariance is only half the selection story: higher even-degree balanced polynomials such as $|z|^4 = (z\bar{z})^2$ also lie in `quadraticAlgebra`. Common-phase invariance eliminates all degree-1 linear readouts and forces degree $\ge 2$; narrowing `quadraticAlgebra` down to Clause 4's homogeneous degree-2 Hermitian forms requires either selecting minimal nontrivial degree or imposing orthogonal frame additivity.

::: {.viz src="fairness-square-uncertainty-expansion" preset="fair-square" height="500"}
**Pairwise Fairness and Quadratic Frame Test (`fair-square`)**: Sweeping a shared angle $\theta$ compares the frame-dependent magenta linear sum $|\cos\theta| + |\sin\theta| \in [1, \sqrt{2}]$ and general power weights $w_p(\theta)$ against the rotation-invariant cyan Pythagorean circle $\cos^2\theta + \sin^2\theta = 1$ (with Clifford reversal $(AB)(BA)$ geometry); amber marks the active angle $\theta$ and exponent $p$. The forward parallelogram law, rank-one Born reduction, and common-phase polynomial theorem carry `LEAN ✓`, Jordan–von Neumann and Gleason are `Literature`, and sampled floating-point residuals are `NUM`.
:::

**Step 2: Squaring folds sign and relative phase, inducing single-basis phase blindness.** Once quadratic pairing is adopted, algebraic folding becomes unavoidable. To prevent conflating distinct mathematical fibers under a single slogan, we separate four distinct maps:

1. **Real squaring $x \mapsto x^2$ ($\mathbb{R} \to \mathbb{R}_{\ge 0}$)**: Each $y > 0$ has a two-point sign fiber $\{+\sqrt{y}, -\sqrt{y}\}$, degenerating to $\{0\}$ at $y = 0$ (`manual derivation`);
2. **Circle squaring $z \mapsto z^2$ ($S^1 \to S^1$)**: Doubles phase angle and identifies antipodal sheets $\{+z, -z\}$ with no continuous global inverse selector ([Chapter 5](ch05-complex-phase-and-rotors.md) [@thm-circle-double-cover-history-lift], [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), `LEAN ✓`);
3. **Complex modulus squaring $z \mapsto |z|^2$ ($\mathbb{C} \to \mathbb{R}_{\ge 0}$)**: For $r^2 > 0$, the preimage fiber is an entire continuous phase circle $\{r e^{i\alpha} \mid \alpha \in [0, 2\pi)\} \cong S^1$, *not* a two-point set (`manual derivation`);
4. **Fixed-basis Born readouts**: While multiplying a state vector by a **global phase** $|\psi\rangle \mapsto e^{i\alpha}|\psi\rangle$ leaves the density operator $|\psi\rangle\langle\psi|$ unchanged (pure gauge), **relative phases** between computational-basis components alter off-diagonal coherence entries and produce genuinely distinct physical states—yet every observable diagonal in that basis is completely blind to the difference:

::: {.theorem #thm-ch31-diagonal-phase-blindness title="Blindness of Diagonal Qubit Observables to Relative Superposition Phase" lean="D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase"}
Let $I$ be any index type and let `observable : I → QubitMatrix` be any family of $2 \times 2$ complex qubit matrices diagonal in the computational basis ($\forall i \in I,\; (\operatorname{observable} i).\operatorname{IsDiag}$). Write $\rho_+ = |+\rangle\langle+|$ (`equalSuperpositionDensity`) and $\rho_- = Z \rho_+ Z = |-\rangle\langle-|$, with Born readout $\operatorname{bornProbability}(\rho, O) = \operatorname{Re}\operatorname{Tr}(\rho O)$. Then:

1. **Distinct quantum states, identical diagonal joint readout**: $\rho_+ \neq \rho_-$, yet their joint readout across the entire diagonal family coincides:
   $$
   \operatorname{jointReadout}\bigl(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \operatorname{observable} i),\; \rho_+\bigr) = \operatorname{jointReadout}\bigl(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \operatorname{observable} i),\; \rho_-\bigr);
   $$
2. **Off-diagonal necessity**: Any qubit matrix `interface : QubitMatrix` satisfying $\operatorname{bornProbability}(\rho_+, \text{interface}) \neq \operatorname{bornProbability}(\rho_-, \text{interface})$ cannot be diagonal ($\neg \text{interface}.\operatorname{IsDiag}$);
3. **Separation by Pauli $X$**: Pauli $X$ (`qubitX`) is non-diagonal ($\neg X.\operatorname{IsDiag}$) and strictly separates the two states, $\operatorname{bornProbability}(\rho_+, X) \neq \operatorname{bornProbability}(\rho_-, X)$.
:::

::: proof
In the computational basis $\{|0\rangle, |1\rangle\}$, $\rho_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$ whereas conjugation by $Z = \operatorname{diag}(1, -1)$ gives $\rho_- = \frac{1}{2}\begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$. Their off-diagonal entries $+1/2$ and $-1/2$ differ, so $\rho_+ \neq \rho_-$. For any diagonal matrix $D = \operatorname{diag}(d_0, d_1)$, however, $\operatorname{Tr}(\rho_\pm D) = (d_0 + d_1)/2$ depends solely on the diagonal entries, making the joint readout identical across every indexed family $I$ of diagonal matrices and forcing any separating `interface` to carry nonzero off-diagonal entries. Evaluating at $X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ confirms $\neg X.\operatorname{IsDiag}$ and $\operatorname{Re}\operatorname{Tr}(\rho_+ X) = +1 \neq -1 = \operatorname{Re}\operatorname{Tr}(\rho_- X)$. The full proof is checked by the Lean kernel.
:::

Despite the historical word `prime` in the declaration name, the kernel type signature quantifies over an arbitrary index type $I$ of diagonal qubit observables: modulus-squared probabilities in one fixed basis fold away relative phase, which re-emerges only when queried through a noncommuting off-diagonal context such as $X$.

::: {.viz src="fairness-square-uncertainty-expansion" preset="phase-fold" height="500"}
**Squaring Fiber Folding and Diagonal Phase Blindness (`phase-fold`)**: Side-by-side comparison of the two-point sign fiber of $x \mapsto x^2$ on $\mathbb{R}$, the full $S^1$ phase-circle fiber of $z \mapsto |z|^2$ on $\mathbb{C}$, and the qubit states $|+\rangle\langle+|$ vs. $|-\rangle\langle-|$, whose readouts collapse onto identical magenta bars for every diagonal observable while splitting cleanly in cyan under Pauli $X$; amber tracks the relative phase angle. Diagonal phase blindness and circle double-cover lifts carry `LEAN ✓`, elementary real/complex preimage fibers are `manual derivation`, and sampled fiber points are `NUM`.
:::

**Step 3: Transverse area invisible in one basis rebounds across noncommuting pairs as Robertson–Schrödinger uncertainty.** When two symmetric observables refuse simultaneous diagonalization, what exact geometric quantity governs the product of their variances? [Chapter 6](ch06-geometric-product.md) already locked the equality form of the Robertson–Schrödinger identity for everywhere-defined symmetric complex-linear maps $A, B : E \to E$ on a complex inner-product space ([@thm-robertson-schrodinger], [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger), with the finite-dimensional mixed-state matrix bound in [@thm-mixed-state-robertson]). For a unit state $\psi$ ($\|\psi\| = 1$), centered fluctuation vectors $u = (A - \langle A\rangle)\psi$ and $v = (B - \langle B\rangle)\psi$, complex inner product $z = \langle u, v\rangle_{\mathbb{C}}$, symmetric covariance $C = \frac{1}{2}\operatorname{Re}\langle\psi, (AB + BA)\psi\rangle_{\mathbb{C}} - \langle A\rangle\langle B\rangle$, half-commutator expectation $K = \frac{1}{2i}\langle\psi, (AB - BA)\psi\rangle_{\mathbb{C}}$, and complex Gram remainder $G = \|u\|^2\|v\|^2 - \|\langle u, v\rangle_{\mathbb{C}}\|^2$, [@thm-robertson-schrodinger] establishes all four clauses simultaneously:

$$
(\Delta A)^2(\Delta B)^2 = \|u\|^2\|v\|^2 = C^2 + \|K\|^2 + G,\qquad G \ge 0,\qquad \operatorname{Re} z = C,\qquad (\operatorname{Im} z : \mathbb{C}) = K.
$$

Dropping $G \ge 0$ yields the Robertson–Schrödinger inequality $(\Delta A)^2(\Delta B)^2 \ge C^2 + \|K\|^2$, and dropping $C^2 \ge 0$ yields Robertson's commutator bound $\Delta A\,\Delta B \ge \|K\|$ by manual algebra.

Here one scalar-field distinction is essential: **the complex Gram remainder $G$, the commutator term $\|K\|^2$, and the underlying real exterior wedge area are not all the same quantity**. Viewing $E$ as a real Hilbert space equipped with $\operatorname{Re}\langle u, v\rangle_{\mathbb{C}}$ (matching the real coordinate identity in [Chapter 6](ch06-geometric-product.md) [@thm-lagrange-gram-identity]), the squared area of the real parallelogram spanned by $u$ and $v$ is (`manual derivation`)

$$
\|u \wedge_{\mathbb{R}} v\|^2 = \|u\|^2\|v\|^2 - (\operatorname{Re}\langle u, v\rangle_{\mathbb{C}})^2 = \|K\|^2 + G.
$$

An exact integer-valued qubit check (`manual derivation`) makes this distinction unmistakable. Take $A = X$, $B = Y$, and $\psi = |0\rangle$. Then $\langle X\rangle = \langle Y\rangle = 0$, $u = X|0\rangle = |1\rangle$, and $v = Y|0\rangle = i|1\rangle$, giving $(\Delta X)^2 = \|u\|^2 = 1$, $(\Delta Y)^2 = \|v\|^2 = 1$, and $z = \langle u, v\rangle_{\mathbb{C}} = i$. Consequently $C = \operatorname{Re}(i) = 0$, $K = \operatorname{Im}(i) = 1$, and **$G = 1 \cdot 1 - |i|^2 = 0$**! Because $v = i u$ lies along the same complex ray as $u$, the complex Gram remainder $G$ vanishes identically; yet multiplication by $i$ rotates $u$ by $90^\circ$ in the underlying real Hilbert space, opening a full unit of real wedge area $\|u \wedge_{\mathbb{R}} v\|^2 = \|K\|^2 + G = 1$ and saturating $(\Delta X)^2(\Delta Y)^2 = 1$.

::: {.remark #rem-ch31-jvn-gleason-robertson-literature title="Literature Result: Parallelogram Converse, Gleason's Theorem, Unbounded Canonical Commutators, and Phaseless Reconstruction (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** Four classical theorems from functional analysis and phase-retrieval theory delimit the exact scope of the formalized linear-algebra anchors above:

1. **Jordan–von Neumann parallelogram converse** (P. Jordan & J. von Neumann, *Ann. of Math.* **36**, 1935, 719–723): A real or complex norm arises from an inner product (reconstructed via real or complex polarization) if and only if it satisfies the parallelogram law; among standard nondegenerate $L^p / \ell^p$ spaces ($1 \le p \le \infty$) possessing at least two disjoint nonzero coordinates, this uniquely selects $p = 2$ (whereas [Chapter 1](ch01-measurement.md) [@thm-parallelogram-norm-law] formalizes the forward real implication).
2. **Gleason's closed-subspace theorem** (A. M. Gleason, *J. Math. Mech.* **6**, 1957, 885–893): On separable real or complex Hilbert spaces of dimension $d \ge 3$, every normalized nonnegative ortho-additive measure on closed subspaces has the density-operator trace form $P \mapsto \operatorname{Tr}(\rho P)$. Projection-only additivity fails at $d = 2$ ([Chapter 2](ch02-born-rule.md) [@thm-busch-effect-density] covers $d = 2$ by assuming additivity across all effect operators).
3. **Robertson (1929), Schrödinger (1930), and unbounded canonical domains** (H. P. Robertson, *Phys. Rev.* **34**, 1929, 163–164; E. Schrödinger, *Sitzungsber. Preuss. Akad. Wiss.*, 1930, 296–303): While [@thm-robertson-schrodinger] and [@thm-mixed-state-robertson] kernel-verify everywhere-defined symmetric linear maps and finite-dimensional mixed states, deriving $\Delta x\,\Delta p \ge \hbar / 2$ for unbounded canonical operators $[x, p] = i\hbar I$ on $L^2(\mathbb{R})$ requires dense common-domain and finite-variance hypotheses (and no nonzero finite-dimensional matrices can satisfy $[A, B] = i\hbar I$ with $\hbar \neq 0$, since $\operatorname{Tr}[A, B] = 0$).
4. **Phaseless frame reconstruction** (R. Balan, P. Casazza & D. Edidin, *Appl. Comput. Harmon. Anal.* **20**, 2006, 345–356; A. Conca, D. Edidin, M. Hering & C. Vinzant, *Appl. Comput. Harmon. Anal.* **38**(2), 2015, 346–356): Losing phase in a single modulus does not make phase recovery impossible across multiple contexts; sufficiently rich measurement frames (Balan–Casazza–Edidin 2006 established generic injectivity with $4d - 2$ vectors, sharpened to $4d - 4$ generic vectors in $\mathbb{C}^d$ by Conca–Edidin–Hering–Vinzant 2015) reconstruct pure states up to global phase, confirming that [@thm-ch31-diagonal-phase-blindness] reflects single-basis insufficiency rather than universal tomographic impossibility.
:::

Stepping back across Steps 1–3, we also keep mathematical theorem and physical narrative distinct: in [@thm-robertson-schrodinger], the variance product holds for a **fully specified** pure state $|0\rangle$ and known operators $X, Y$, so quantum uncertainty is not mere classical ignorance of a hidden phase; linking "pairwise fairness $\implies$ quadratic squaring $\implies$ single-basis phase folding $\implies$ transverse commutator uncertainty" into a single generative storyline belongs to `MODEL`.

::: {.viz src="fairness-square-uncertainty-expansion" preset="uncertainty-wedge" height="500"}
**Robertson–Schrödinger Variance Identity and Real Wedge Area (`uncertainty-wedge`)**: Displays centered fluctuation vectors $u, v$ for noncommuting qubit observables (including the exact $X, Y$ witness on $|0\rangle$ where $C = 0, K = 1, G = 0$). Cyan shading depicts the real wedge area $\|u \wedge_{\mathbb{R}} v\|^2 = \|K\|^2 + G$, magenta bars decompose $C^2$, $\|K\|^2$, and the complex Gram remainder $G$, and amber tracks the active state and operator pair. Pure-state equality and mixed-state bounds carry `LEAN ✓` ([@thm-robertson-schrodinger], [@thm-mixed-state-robertson]), the $|0\rangle$ integer check is a `manual derivation`, continuous slider readouts are `NUM`, and the phase-folding-to-uncertainty narrative is `MODEL`.
:::

### 31.4.3 Time as Monotonic Orthogonal Dimension Expansion: Finite-Box Saturation and Prime-Axis Escape {#sec-ch31-time-orthogonal-expansion}

We now arrive at the closing sentence of this section's thesis: **"Time is orthogonal dimension expansion."** Mathematically, this sentence sets the fate of dynamics confined inside a fixed finite-dimensional box directly against the birth of orthogonal axes from a nontrivial complement.

Consider first the Hilbert-space geometry of orthogonal complements and shell-by-shell expansion. For any closed subspace $M$ of a Hilbert space $E$, [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities) locks the complement relation $P_{M^\perp} = \operatorname{id}_E - P_M$, idempotence of both projections, vanishing cross-products $P_M P_{M^\perp} = P_{M^\perp} P_M = 0$, and resolution of unity $P_M + P_{M^\perp} = \operatorname{id}_E$. In a real Hilbert space, [`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion) proves that whenever closed shells satisfy $E_{k+1} \le S_k^\perp$ and $S_{k+1} = S_k \sqcup E_{k+1}$, the $n$-th cumulative subspace decomposes as $S_n = S_0 \sqcup \bigsqcup_{k=1}^n E_k$, the ambient space decomposes as $S_0 \sqcup \bigsqcup_{k=1}^n E_k \sqcup S_n^\perp$, and the remaining residual splits as $S_n^\perp = E_{n+1} \sqcup S_{n+1}^\perp$ (note that zero shells $E_{k+1} = \bot$ are permitted unless nonzero residuals are stipulated). Whenever the orthogonal complement $S^\perp$ is nontrivial, a unit escape direction exists at full metric distance one from $S$:

::: {.theorem #thm-ch31-projection-residual-escape title="Unit Escape Vector and Full Distance One Outside Any Non-Exhausted Closed Subspace" lean="D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
Let $V$ be a complete Hilbert space (`[CompleteSpace V]`) over $\mathbb{K}$ (`[RCLike 𝕜]`), and let $S \le V$ be a closed subspace (`[CompleteSpace S]`) with nontrivial orthogonal complement $S^\perp \neq \bot$. Then there exists an escape vector $e \in V$ simultaneously satisfying

$$
e \in S^\perp,\qquad \|e\| = 1,\qquad P_S e = 0,\qquad \operatorname{infDist}(e, S) = 1,\qquad \|\operatorname{id}_V - P_S\| = 1.
$$
:::

::: proof
Since $S^\perp \neq \bot$, there exists a nonzero vector $v \in S^\perp$. Normalizing $e = \|v\|^{-1} v$ yields $e \in S^\perp$, $\|e\| = 1$, and $P_S e = 0$. For every $s \in S$, orthogonality between $e$ and $-s$ gives $\|e - s\|^2 = \|e\|^2 + \|s\|^2 = 1 + \|s\|^2 \ge 1$, with equality attained at $s = 0 \in S$, so the metric infimum distance equals $\operatorname{infDist}(e, S) = 1$. Finally, $(\operatorname{id}_V - P_S) e = e$ together with contractivity of the complementary orthogonal projection $\operatorname{id}_V - P_S = P_{S^\perp}$ yields $\|\operatorname{id}_V - P_S\| = 1$. The full proof is checked by the Lean kernel.
:::

When an incoming vector $u_D$ leaves a **nonzero** orthogonal innovation residual $r_D = u_D - P_{V_D} u_D \neq 0$ outside a $D$-dimensional subspace $V_D$, elementary direct-sum algebra (`manual derivation`) gives $e_{D+1} = r_D / \|r_D\|$ and $V_{D+1} = V_D \oplus \operatorname{span}\{e_{D+1}\}$, incrementing rank by exactly one, $\dim V_{D+1} = \dim V_D + 1$ (scaling the unnormalized Gram determinant by $\|r_D\|^2$, or preserving $\det\operatorname{diag}(G_D, 1) = \det G_D$ after normalization). Type discipline also requires qualifying any appeal to Hodge duality (`manual derivation`): on a fixed oriented $n$-dimensional Euclidean space, $\star_n : \Lambda^k \mathbb{R}^n \to \Lambda^{n-k} \mathbb{R}^n$ sends the top blade $\star_n(e_1 \wedge \cdots \wedge e_n)$ into scalars $\Lambda^0 \mathbb{R}^n$ rather than manufacturing an $(n+1)$-st axis; writing $\star_{n+1}(e_1 \wedge \cdots \wedge e_n) = e_{n+1}$ presupposes an already-chosen $(n+1)$-dimensional oriented ambient space, so reading exterior normal formation as creating ambient dimension belongs to `MODEL`.

Contrast this open-complement escape with what happens inside a **closed finite-dimensional box** $V$ driven solely by a fixed linear operator $T : V \to_{\mathbb{K}} V$ and readout map $C : V \to_{\mathbb{K}} Y$. The ascending observable Krylov chain

$$
O_m = \operatorname{observableKrylov}(T, C, m) = \operatorname{span}\bigl\{(T^*)^k C^* y \;\big|\; 0 \le k \le m,\; y \in Y\bigr\}
$$

cannot generate new rank indefinitely; its strict growth steps are capped by the ambient dimension minus the initial readout rank:

::: {.theorem #thm-ch31-krylov-growth-stability title="Sharp Upper Bound on Strict Growth Steps of Finite-Dimensional Observable Krylov Chains" lean="D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound"}
Let $V$ and $Y$ be finite-dimensional inner-product spaces over $\mathbb{K}$ (`[RCLike 𝕜]`), and let $T : V \to_{\mathbb{K}} V$ and $C : V \to_{\mathbb{K}} Y$ be $\mathbb{K}$-linear maps. For the ascending observable Krylov subspace chain $O_m = \operatorname{observableKrylov}(T, C, m)$ ($m \in \mathbb{N}$), the extended cardinality of strict growth stages satisfies

$$
\operatorname{encard}\bigl\{m \in \mathbb{N} \;\big|\; O_m < O_{m+1}\bigr\} \le \operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C).
$$
:::

::: proof
At stage $0$, $O_0 = \operatorname{range}(C^*)$ has dimension $\operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$ inside $V$, and $O_m \le O_{m+1} \le V$ holds for every $m \in \mathbb{N}$. Each strict inclusion $O_m < O_{m+1}$ increases the natural number $\operatorname{finrank}_{\mathbb{K}} O_m$ by at least $1$. Since $\operatorname{finrank}_{\mathbb{K}} O_m \le \operatorname{finrank}_{\mathbb{K}} V$ throughout, strict dimension increases can occur at most $\operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$ times. The full proof is checked by the Lean kernel.
:::

The companion permanent-stability theorem [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) seals the fate of any closed finite box: under the same hypotheses, as soon as a single stage fails to grow ($O_m = O_{m+1}$), $T^*(O_m) \subseteq O_{m+1} = O_m$ makes $O_m$ $T^*$-invariant, locking every later iterate permanently at $O_{m+r} = O_m$ for all $r \in \mathbb{N}$.

Where, then, in elementary mathematics do we find an exact discrete prototype that can never be exhausted by any finite list—always certifying a fresh independent index outside every proposed finite collection? The frozen Euclidean prime-axis escape theorem supplies that exact witness:

::: {.theorem #thm-ch31-prime-axis-escape title="Unit Congruence and Outside Prime Divisor Escape for Any Finite Set of Primes" lean="D5/S3/Axis/PrimeAxisEscape.prime_axis_escape"}
Let $S$ (`S : Finset ℕ`) be any finite set of natural numbers every element of which is prime ($\forall p \in S,\; \operatorname{Nat.Prime}(p)$), and write $N_S = \prod_{p \in S} p + 1$ (`S.prod id + 1`). Then:

1. **Unit residue modulo every existing prime**: For every $p \in S$, $N_S \equiv 1 \pmod p$ (`Nat.ModEq p (S.prod id + 1) 1`);
2. **Prime divisor outside the finite set**: There exists a natural number $q \in \mathbb{N}$ such that $q$ is prime, $q \mid N_S$, and $q \notin S$.
:::

::: proof
For each $p \in S$, $p$ divides $\prod_{r \in S} r$, so $N_S = \prod_{r \in S} r + 1$ leaves remainder $1$ modulo $p$ (including $S = \emptyset$, where the empty product is $1$, $N_\emptyset = 2$, the universal congruence holds vacuously, and $q = 2 \notin \emptyset$). Because every prime satisfies $p \ge 2$, $\prod_{r \in S} r \ge 1$ and hence $N_S \ge 2$, guaranteeing at least one prime divisor $q \mid N_S$. Were $q \in S$, Clause 1 would give $N_S \equiv 1 \pmod q$, which combined with $q \mid N_S$ forces $q \mid 1$, contradicting primality of $q$; therefore $q \notin S$. The full proof is checked by the Lean kernel.
:::

An exact arithmetic countercheck (`manual derivation`) guards against misreading $N_S$ either as necessarily prime or as "the $(|S|+1)$-st prime in sequence." Take the first six primes $S = \{2, 3, 5, 7, 11, 13\}$:

$$
N_S = 2 \cdot 3 \cdot 5 \cdot 7 \cdot 11 \cdot 13 + 1 = 30030 + 1 = 30031 = 59 \cdot 509.
$$

Here $N_S = 30031$ is **composite**, and neither of its prime factors ($59$ or $509$) is the seventh prime $17$—yet both lie strictly outside $S$ ($59 \notin S$, $509 \notin S$), matching the exact statement of [@thm-ch31-prime-axis-escape].

::: {.remark #rem-ch31-krylov-euclid-literature title="Literature Result: Euclid's Infinitude of Primes and Lanczos–Krylov Subspace Termination (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** Two classical pillars frame the algebraic and arithmetic theorems proved above:

1. **Euclid, *Elements*, Book IX, Proposition 20**: Prime numbers exceed any assigned multitude of primes. Theorem [@thm-ch31-prime-axis-escape] kernel-verifies the finite product-plus-one congruence and outside-prime-divisor step for any `Finset ℕ` of primes; deducing the infinitude of all primes by contradiction and studying prime distribution in arithmetic progressions belong to the classical number-theoretic literature.
2. **Lanczos tridiagonalization and Arnoldi–Krylov iteration** (C. Lanczos, *J. Res. Nat. Bur. Stand.* **45**, 1950, 255–282): Orthogonalizing $v, Tv, T^2 v, \dots$ extracts residual innovation directions step by step until benign invariant-subspace breakdown ($r_m = 0$) or exhaustion of ambient finite dimension. Theorem [@thm-ch31-krylov-growth-stability] and [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) kernel-verify the observable rank-growth cap and permanent post-stabilization plateau; algorithmic matrix factorizations and floating-point breakdown analysis belong to the numerical-analysis literature.
:::

We can now state the geometric and physical synthesis cleanly under `MODEL`. To turn arithmetic prime escape into orthogonal Hilbert axes, we **stipulate** the separable Hilbert space $\mathcal{H} = \ell^2(\mathbb{P})$ with orthonormal coordinate basis $\{e_p\}_{p \in \mathbb{P}}$ indexed by the primes: each newly witnessed prime $q_{\mathrm{new}} \notin S$ from [@thm-ch31-prime-axis-escape] then supplies a unit coordinate axis $e_{q_{\mathrm{new}}} \in V_S^\perp$ strictly orthogonal to the finite box $V_S = \operatorname{span}\{e_p \mid p \in S\}$ (keeping this stipulated orthonormal basis strictly distinct from [Chapter 22](ch22-primes-euler-products-and-zeros.md)'s $\mathbb{Z}$- and $\mathbb{Q}$-linear independence of real prime logarithms $\log p$, since the real numbers $\{\log p\} \subset \mathbb{R}$ are *not* linearly independent over $\mathbb{R}$ and are not orthogonal Euclidean vectors).

Within this `MODEL`, we define the **innovation-event clock** $\tau(n) = \dim V_n - \dim V_0$: whereas a closed finite box $(V, T, C)$ inevitably saturates and freezes by [@thm-ch31-krylov-growth-stability], each nonzero residual entering from $V_D^\perp$ ([@thm-ch31-projection-residual-escape]) advances rank monotonically via $D \to D + 1$. Equally important are the physical boundaries this model respects: unitary evolution $U(t) = e^{-iHt}$ on a fixed Hilbert space preserves ambient dimension, and [Chapter 11](ch11-pulses-and-virtual-z.md)'s locked energy-eigenstate stationarity theorems ([@thm-hermitian-eigenstate-stationary], [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) and [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero)) prove that nonzero laboratory time $t$ can elapse with zero state change and zero energy variance ($\tau(n)$ constant); nor do subspace-escape or prime-divisor theorems by themselves prove a thermodynamic no-heat-death theorem without an explicit physical model of degrees of freedom, energy, and entropy coupling.

::: {.viz src="fairness-square-uncertainty-expansion" preset="time-expand" height="500"}
**Finite-Box Krylov Saturation vs. Prime-Axis Orthogonal Escape (`time-expand`)**: The upper panel plots the magenta saturation staircase of a closed finite-dimensional observable Krylov chain $\dim O_m$, halting permanently after at most $\dim V - \operatorname{rank} C$ strict steps; the lower panel shows cyan unit residual escape $e_{D+1} \perp V_D$ alongside Euclidean prime-set escape (including $S = \{2,3,5,7,11,13\} \implies N_S = 30031 = 59 \cdot 509$) supplying fresh axes in $\ell^2(\mathbb{P})$, with amber marking the active step $D \to D + 1$. Residual escape, Krylov growth bounds, and prime escape carry `LEAN ✓`, numerical QR/rank tolerances are `NUM`, and "time as orthogonal dimension expansion" is `MODEL`.
:::

The table below brings all five contrasts between the fixed-dimension box view and the orthogonal dimension-expansion view into a single auditable ledger, preserving every epistemic boundary:

| Core Theme | Fixed-Dimension Box View (Truncation Scaffolding) | Orthogonal Dimension-Expansion View (Nesting & Escape) | Epistemic Status & Exact Formal Boundary |
| :--- | :--- | :--- | :--- |
| **1. Static/Dynamic & Apparent Closure** | Dualism of static block vs. moving pointer; planar periodic orbits treated as self-contained loops | Nested filtration $\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots$ unifies whole and sequence; lifted helix and `level` advance while projected characters close | Golden-helix character blindness [@thm-ch31-helix-readout-progress], [`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step), [`golden_helix_two_step_orientation_complete_state_distinct`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenHelixParityReadout.golden_helix_two_step_orientation_complete_state_distinct), circle lift [@thm-circle-double-cover-history-lift] (`LEAN ✓`); helix shadow formula (`manual derivation`); non-duality & closure thesis (`MODEL`) |
| **2. $90^\circ$ Horizon & Truncation Limits** | Zero projection mistaken for nonexistence; finite-rank truncation mistaken for uniform convergence | Orthogonal axis casts zero scalar shadow $\cos 90^\circ = 0$; vectorwise strong convergence coexists with unit operator-norm gap $\lVert\operatorname{id} - P_{S_i}\rVert = 1$ | Uniform obstruction [@thm-ch31-truncation-strong-vs-uniform], strong limit [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit), double-orthogonal closure [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure) (`LEAN ✓`); three angle geometries kept distinct (`manual derivation`); horizon ontology (`MODEL`) |
| **3. Pairwise Fairness & Squaring** | Frame-dependent $\lvert\cos\theta\rvert + \lvert\sin\theta\rvert$ or order-dependent product $AB \neq BA$ | Reversal norm $(AB)(BA) = \lVert A\rVert^2\lVert B\rVert^2$ removes order; global-phase balanced polynomials have degree $\ge 2$ with unique Hermitian degree-2 forms | Common-phase polynomials [@thm-ch31-phase-polynomial-quadratic], parallelogram law [@thm-parallelogram-norm-law], Born reduction [@thm-born-modulus-square], Busch representation [@thm-busch-effect-density] (`LEAN ✓`); Jordan–von Neumann & Gleason (`Literature`); $w_p(\theta)$ counterexample & Clifford reversal (`manual derivation`) |
| **4. Phase Folding & Uncertainty** | Single-basis modulus-squared weights mistaken for complete state specification | Squaring folds sign/phase fibers; all diagonal observables confuse $\lvert +\rangle\langle +\rvert$ with $\lvert -\rangle\langle -\rvert$; transverse area rebounds via $(\Delta A)^2(\Delta B)^2 = C^2 + \lVert K\rVert^2 + G$ | Diagonal blindness [@thm-ch31-diagonal-phase-blindness], Lagrange–Gram [@thm-lagrange-gram-identity], Robertson–Schrödinger [@thm-robertson-schrodinger] (`LEAN ✓`); unbounded $[x,p]=i\hbar I$ domains & phaseless frames [@rem-ch31-jvn-gleason-robertson-literature] (`Literature`); $X, Y$ on $\lvert 0\rangle$ (`manual derivation`); causal narrative (`MODEL`) |
| **5. Box Saturation vs. Time Expansion** | Closed finite-dimensional triple $(V, T, C)$ saturates its observable Krylov chain and freezes permanently | Nonzero $S^\perp$ yields unit escape $e$; Euclid's $N_S = \prod_{p \in S} p + 1$ witnesses $q \notin S$, grounding the $\ell^2(\mathbb{P})$ innovation clock $D \to D + 1$ | Residual escape [@thm-ch31-projection-residual-escape], Krylov bound [@thm-ch31-krylov-growth-stability], permanent stability [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), prime escape [@thm-ch31-prime-axis-escape] (`LEAN ✓`); Euclid IX.20 & Lanczos [@rem-ch31-krylov-euclid-literature] (`Literature`); $30031 = 59 \cdot 509$ (`manual derivation`); time as expansion (`MODEL`) |

::: {.viz src="fairness-square-uncertainty-expansion" height="640"}
**Interactive Laboratory `ORTHO//EXPAND`**: Unified sandtable for fairness, squaring, uncertainty, and orthogonal dimension expansion. Switch freely across all six preset cards (`helix-shadow`, `horizon-limit`, `fair-square`, `phase-fold`, `uncertainty-wedge`, `time-expand`) to inspect 3D helix shadows and golden-helix character deck blindness, the $90^\circ$ projection zero and vectorwise strong convergence vs. $\|\operatorname{id} - P_{S_n}\| = 1$, $|\cos\theta| + |\sin\theta|$ and $w_p(\theta)$ against $\cos^2\theta + \sin^2\theta = 1$, diagonal phase blindness between $|+\rangle\langle+|$ and $|-\rangle\langle-|$ resolved by Pauli $X$, the exact qubit Robertson–Schrödinger decomposition $(\Delta A)^2(\Delta B)^2 = C^2 + \|K\|^2 + G$, and finite-box Krylov saturation vs. Euclidean prime-axis escape (including $30031 = 59 \cdot 509$). Green `LEAN ✓` badges mark kernel-verified theorems, while classical literature, manual derivations, numerical tolerances, and ontological models carry distinct evidence tags.
:::

With all three fixed-box scaffolds dismantled, the fivefold fairness constitution of this chapter and orthogonal dimension expansion stand as a single coherent architecture: every apparent closure, orthogonal horizon, and uncertainty bound turns out not to be an arbitrary wall erected against reason, but a precise geometric signature of projection—fair quadratic pairing folds local single-basis phase fibers while preserving the transverse commutator wedge and unit operator-norm gap that point toward unprojected orthogonal directions; and stepping out of each saturated finite box into fresh orthogonal axes is how a finite observer experiences the open flow of novelty inside a timeless geometric whole. Keeping kernel-verified truth and interpretive model transparently distinct, we turn to the culminating chapter of Part VIII—[Chapter 32](ch32-unified-field-and-meta-unification.md), where quantum fairness and orthogonal geometry converge into the unified field and meta-unification.
