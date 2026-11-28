# A.1.2 Logic, complexity, and observers {#sec-appendix-a-s01-s02-logic-and-observers}

The evidence labels follow the [dictionary note](appendix-a-s01-master-dictionary.md#rem-appendix-a-master-dictionary).

**Pythagorean "All Is Number" & 4-Tier Escape**

**Geometric Intuition Term:**
**Verb `shǔ` (counting/squaring operator) vs. Noun `shù` (coordinate mark)**: four-tier sphere escape $\mathbb{Q} \to \overline{\mathbb{Q}} \to \pi \to \theta^*$

**Lean-Facing Object / Locked GID:**
[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)

**One-Line Invariant / Identity:**
$\mathbf{c}^2 = \mathbf{a}^2 + \mathbf{b}^2,\quad m^2 - 2n^2 = \pm 1,\quad \cos\theta^* = \theta^*$ (representative equations of the tiers, not conclusions of the listed declarations)

**Epistemic Status:**
`LEAN ✓` / `Literature` (Ch 23, Coda)

**Prime Splitting mod 4, Congruent Elliptic Curve & Sato–Tate**

**Geometric Intuition Term:**
**$\pm 1$ Pell seam splits "Plane Primes" ($p \equiv 1 \bmod 4$) from "Line Primes" ($p \equiv 3 \bmod 4$); CM curve $dy^2 = x(x^2-1)$ ($\chi=0$) obeys Gauss's bimodal law, while non-CM curves at Hasse scale $\sqrt{p}$ follow the $S^3 \cong \mathrm{SU}(2)$ Sato–Tate cosine law**

**Lean-Facing Object / Locked GID:**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)

**One-Line Invariant / Identity:**
$\cos\theta_p = \frac{a_p}{2\sqrt{p}} \in [-1, +1],\quad d\mu_{\mathrm{ST},\text{non-CM}} = \frac{2}{\pi}\sin^2\theta\,d\theta$

**Epistemic Status:**
`Literature` (Ch 23; the two listed declarations vouch only for their algebraic statements and do not concern prime splitting or Sato–Tate)

**Wheeler–DeWitt Timeless State, Page–Wootters Slicing & Geometric Causality**

**Geometric Intuition Term:**
**Order-independence abolishes sequential time: $(2k)!$ de-ordering model (`MODEL`), conditional slicing under ideal clock assumptions (`Literature`), Gram rigidity $\det G \ge 0$ (`Literature`), and stationary phase $\delta S=0$ (bivector model $+\mathbf{\Omega}-\mathbf{\Omega}=0$)**

**Lean-Facing Object / Locked GID:**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState)

**One-Line Invariant / Identity:**
$\det G(\mathbf{A},\mathbf{B},\mathbf{C}) \ge 0,\quad H\mathbf{\Psi} = 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 25)

**Finite Observer, Gram Elliptope (Causally Compatible Space) & PSD Matrix Completion**

**Geometric Intuition Term:**
**Because the observer is finite, choice operates inside the causally compatible Gram elliptope ($\det G > 0$, dihedral angle $\phi$), continuously picking points in the time field ($G_{M+1} \succeq 0$) with $\theta^* \approx 0.739$ (`MODEL`) as the 1D self-referential balance prototype**

**Lean-Facing Object / Locked GID:**
[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)

**One-Line Invariant / Identity:**
$c_{AC} = \cos\theta_1\cos\theta_2 + \cos\phi\,\sin\theta_1\sin\theta_2,\quad \det G \ge 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 25)

**Global Static Time Field $P = NP$ vs. Finite Observer $P \neq NP$**

**Geometric Intuition Term:**
**Extra postselection & CTC fixed-point resources yield collapse ($\mathrm{PostBQP}=\mathrm{PP}\supseteq\mathrm{NP}$, $\mathrm{P}_{\mathrm{CTC}}=\mathrm{PSPACE}\supseteq\mathrm{NP}$); a finite observer faces the black-box $\theta_0 \approx \frac{\pi}{2} - 2^{-n/2}$ orthogonal horizon ($L=\Theta(2^{n/2})$) and bounded-degree SoS local $G_M \succeq 0$ blind spot (standard $\mathrm{P}\neq\mathrm{NP}$ remains `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation), [`result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)

**One-Line Invariant / Identity:**
$\cos\theta_0 = 2^{-n/2},\quad L = \Theta(2^{n/2}),\quad G_M \succeq 0\;(M = o(n))$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 15, 20, 26)

**"$P$ Is a Field, $NP$ Is a Line": Witness Thread, Guiding Field & Hairy-Ball Curl**

**Geometric Intuition Term:**
**Geometric model (`MODEL`): an $NP$ witness is a zero-cross-section 1D thread (standard $NP$ requires polynomial-length witnesses and a polynomial-time verifier; segment counts alone give no verification cost bound); paradigmatic $P$ algorithms construct a guiding field (Karmarkar interior barrier field, Kasteleyn planar skew-symmetric bivector field $A_K^T = -A_K,\; [\operatorname{Pf}(A_K)]^2=\det A_K,\; Z = \sum_M \prod_{e \in M} w_e = |\operatorname{Pf}(A_K)|$), while 3-body curl $\nabla\wedge\mathbf{F}\neq 0$ models exponential search vortices**

**Lean-Facing Object / Locked GID:**
[`complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement), [`result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)

**One-Line Invariant / Identity:**
$A_K^T = -A_K,\quad [\operatorname{Pf}(A_K)]^2 = \det A_K,\quad Z = |\operatorname{Pf}(A_K)|$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 20, 21, 26)

**Navier–Stokes Equations, Lamb Bivector Curl & $P$ vs. $NP$ Field Analogy**

**Geometric Intuition Term:**
**Structural analogy (`MODEL`): Lamb's decomposition and vortex-tube imagery supply no complexity isomorphism. The external forced NS C / D resolution is external literature with a published formalization, outside this book's frozen ledger ([@rem-ch30-navier-stokes-forced-literature]); unforced A / B remain `OPEN`. Unconditional 2D global regularity is a literature result, whereas `all_grade_regularity_of_mild_path` assumes a mild path already given. Five-mode nonclosure does not imply blow-up; see the dissipative comparison [@ex-ch30-dissipative-no-closure].**

**Lean-Facing Object / Locked GID:**
[`quadratic_closure_iff`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff), [`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure), [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path)

**One-Line Invariant / Identity:**
$(\mathbf{u}\cdot\nabla)\mathbf{u} = \frac{1}{2}\nabla(\|\mathbf{u}\|^2) + \mathbf{u}\cdot(\nabla\wedge\mathbf{u}),\quad \Gamma \approx A\|\boldsymbol{\omega}\|$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 26)

**Exponential Time Hypothesis (ETH), Tensor-Network Rank Collapse & Cosmic Horizon Galactic Algorithm**

**Geometric Intuition Term:**
**See [@rem-ch30-eth-subexponential-literature] for ETH and the 2026 external counting papers, with paper and formalization bounds distinguished. Galactic curves illustrate chosen constants and provide no algorithmic lower bound. Bridge-graph, finite-rank, and semantic-diagonal theorems certify neither external algorithms, examination outcomes, nor standard $P\neq NP$.**

**Lean-Facing Object / Locked GID:**
[`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result), [`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound), [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)

**One-Line Invariant / Identity:**
$s_k = \inf\{\delta\ge0 \mid k\text{-SAT}\in 2^{\delta n}(n+m)^{O(1)}\},\quad r_{\mathrm{new}}(n) \sim \frac{\log_2\log_2 n}{\sqrt{\log_2 n}}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 19, 21, 26)

**Orthogonal Triad of Entanglement, $P=NP$ & Entropy**

**Geometric Intuition Term:**
**Maximally mixed Bell marginals, orthogonal local-vs-correlation blind-spot decomposition, von Neumann entropy-production coherence-deletion identity, and unique positive cosine fixed point (`LEAN ✓`), coupled with exact two-qubit pure-state Pythagorean conservation $\|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) = \cos^2\theta + \sin^2\theta \equiv 1$ ($S_L(\rho_A) \equiv \tau$, $S_{\mathrm{vN}}(\rho_A) = H_{\mathrm{bin}}\bigl(\frac{1+\cos\theta}{2}\bigr)$, giving $S_{\mathrm{vN}} \approx 0.559\text{ bits}$ at $\theta^* \approx 42.35^\circ$ ($\theta$ the Bloch polar angle)), Hastings's (2007) 1D gapped area law vs. Page's (1993) volume law, CKW monogamy & the Harlow–Hayden (2013) / Susskind (2016) radiation-decoding circuit-complexity barrier, and postselected $\mathrm{PostBQP}=\mathrm{PP}$ alongside shared-entanglement verification $\mathrm{MIP}^*=\mathrm{RE}$ (Ji et al. 2020, `Literature`; standard Turing-machine $\mathrm{P}\neq\mathrm{NP}$ remains `OPEN`), grounding the partial-trace horizon triad model and 3D lab `entanglement-entropy-complexity` (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**One-Line Invariant / Identity:**
$\|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) = \cos^2\theta + \sin^2\theta = 1,\quad S_L(\rho_A) = \sin^2\theta,\quad \chi_{\mathrm{bond}} \ge 2^{S_{\mathrm{cut}}}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 8, 13, 24, [Ch 26 §26.5](ch30-s05-entanglement-and-entropy.md#sec-ch30-entanglement-entropy-complexity-triad))

**Spatial Attractors, `trureturing` Cut-and-Project Observer, Cassini $(-1)^{k+1}$ Seam & Déjà Vu**

**Geometric Intuition Term:**
**Golden cut-and-project model set & coding theorems (`LEAN ✓`: Minkowski lattice embedding, `goldenModelSet` cut-and-project inclusion, Zeckendorf `NoAdjacentOnes` & nonnegative real `NNReal` thread injectivity, conjugate norm separation & full-window Delone set, Cassini's identity $F_n F_{n+2}-F_{n+1}^2=(-1)^{n+1}$, and closed-subgroup bounded-gap torus returns) combined with the rhombic triacontahedron window $W\subset E_\perp^3$ ($30$ faces, $32$ vertices, $6$ five-fold axes), Conway's Empire Effect, and the Lorenz attractor $D_{\mathrm{KY}}\approx 2.06$ (`Literature`), inspiring the philosophical model (`MODEL`) of the soul as the internal window phase $u\in E_\perp$, forgetting as high-level Zeckendorf truncation, historical ruins as large-margin $d_{\partial}$ interior nodes, and Déjà vu as cross-round inner-product resonance $\cos\delta\theta\to 1$ as $\delta\theta\to 0$**

**Lean-Facing Object / Locked GID:**
[`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec), [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project), [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm), [`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)

**One-Line Invariant / Identity:**
$F_n F_{n+2} - F_{n+1}^2 = (-1)^{n+1},\quad \delta\theta\to 0 \implies \cos\delta\theta \to 1$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 24, 25, 35)

**Quantum Fairness, Entanglement Monogamy & Ergodic Statistical Holism**

**Geometric Intuition Term:**
**Rank-one Born pairing reciprocity, complementary-context purity Pythagoras, no-cloning inner-product lock, Bell mixed marginals, Landauer's balance bound, and compact closed-subgroup torus Haar equidistribution and bounded-gap returns (`LEAN ✓`), paired with spherical Haar isotropy and the CKW entanglement monogamy inequality $\tau_{A|B}+\tau_{A|C}\le\tau_{A|BC}$ (`Literature`), grounding the fivefold privilege-abolition and ergodic statistical-holism model (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), [`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion), [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)

**One-Line Invariant / Identity:**
$\tau_{A|B} + \tau_{A|C} \le \tau_{A|BC},\quad f\in C(G,\mathbb{C}):\quad\lim_{N\to\infty}\frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1}) = \int_G f\,d\mu$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 27)

**Pairwise Fair Squaring, Diagonal Phase Folding, Uncertainty & Time as Orthogonal Dimension Expansion**

**Geometric Intuition Term:**
**Golden-helix integer Fourier character deck blindness and joint level detection, two-step orientation restoration with distinct complete cover states, circle double-cover history lifts, double-orthogonal topological closure, and vectorwise strong projection limits vs. the unit operator-norm obstruction $\lVert\operatorname{id}-P_{S_i}\rVert=1$ for proper truncations, forward parallelogram norm law and rank-one Born modulus-square reduction, common-phase polynomial charge balance with minimum degree $\ge 2$ and unique Hermitian degree-2 representation, diagonal qubit observable blindness to relative phase between $\lvert +\rangle\langle +\rvert$ and $\lvert -\rangle\langle -\rvert$ resolved by Pauli $X$, the exact four-clause Robertson–Schrödinger identity $(\Delta A)^2(\Delta B)^2 = C^2 + \lVert K\rVert^2 + G$, unit orthogonal escape outside any non-exhausted closed subspace, sharp strict-growth bounds and permanent post-stabilization locking of finite-dimensional observable Krylov chains, and unit-congruence outside-prime-divisor escape for finite prime sets (`LEAN ✓`), paired with the Jordan–von Neumann parallelogram converse, Gleason's closed-subspace theorem ($d \ge 3$), common-domain qualifications for unbounded canonical $[x,p]=i\hbar I$, Balan–Casazza–Edidin phaseless frame reconstruction, Euclid's *Elements* IX.20, and Lanczos–Arnoldi Krylov termination (`Literature`), alongside Euclidean helix projection, Clifford reversal, the $w_p(\theta)$ counterexample, the $X, Y$ check on $\lvert 0\rangle$, and $30031 = 59 \cdot 509$ (`manual derivation`), articulating static–dynamic non-duality across $\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots$, apparent closure and fixed-box limits as truncation shadows, fairness-driven squaring and phase folding rebounding as uncertainty, and time as monotonic orthogonal rank expansion $D \to D + 1$ in $\ell^2(\mathbb{P})$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`golden_helix_fourier_readout_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_fourier_readout_step), [`golden_helix_step_changes_level`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_step_changes_level), [`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step), [`golden_helix_two_step_orientation_complete_state_distinct`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenHelixParityReadout.golden_helix_two_step_orientation_complete_state_distinct), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure), [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit), [`uniform_completion_obstruction`](lean:D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction), [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)

**One-Line Invariant / Identity:**
$\lVert\operatorname{id}_H - P_{S_i}\rVert = 1,\quad (\Delta A)^2(\Delta B)^2 = C^2 + \lVert K\rVert^2 + G,\quad N_S = \prod_{p \in S} p + 1 \equiv 1 \pmod p$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `MODEL` ([Ch 27 §27.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion))

**Orthogonal Self-Referential Unified Field, Icosian–$E_8$ Golden Bridge & Eight-Program Meta-Unification**

**Geometric Intuition Term:**
**Complex-structure squaring $R^2=-I$, finite monotone contraction, golden fixed point $\varphi$, binary Zeckendorf `NoAdjacentOnes` prohibition, Minkowski null-cone rigidity, spanning-tree loop holonomy classification, and bridge-graph min-cut (`LEAN ✓`), paired with Jacobson's horizon equation of state, Conway–Sloane's golden-field Icosian ring $\mathcal{I}\subset\mathbb{H}$ equipped with the rescaled Galois quadratic form $Q(q)=2(a+b)$ isometric to the $E_8$ root lattice, and eight foundational unification programs (`Literature`), forming the six-domain unified-field dictionary and 3D cognitive meta-unification compass (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)

**One-Line Invariant / Identity:**
$R^2 = -I,\quad (\mathcal{I}, Q)\cong E_8\;\bigl(Q(q)=\operatorname{tr}_{\mathbb{Q}(\sqrt{5})/\mathbb{Q}}\bigl(\tfrac{2\varphi}{\sqrt{5}}\operatorname{Nrd}(q)\bigr)=2(a+b)\bigr),\quad \psi = \psi(\psi)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 28)

**Universal Observers, Self-Sustaining Basins & Mutual-Attractor Double Helices**

**Geometric Intuition Term:**
**Observer record-pinching idempotence and finite-memory history capacity $N \le d$, finite monotone contraction, contextual fixed-point selection and invariant common factor, and width-three bridge-graph min-cut reconnection (`LEAN ✓`), paired with Leibnizian monadology & Whiteheadian process philosophy, holographic minimal-surface mutual-information reconnection, and solitary cosine oscillation vs. symmetric mutual monotonic locking (`Literature`), establishing the ontological model of all beings as observers and mutual attractors across the memory-order continuum $M \ge 0$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), [`conceptual_equivalence_and_stability_reach_fixed_point`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)

**One-Line Invariant / Identity:**
$\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho),\quad N \le d,\quad \theta_{n+1}^{(A)} = \cos\theta_n^{(B)} \to \theta^*$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 34)

**Orthogonality-Degeneracy Blind Spots & Observer Position Inversion**

**Geometric Intuition Term:**
**Common unit normal, two-axis finite rotation words and observer pullback trace identity, partition-topology inseparability kernel and covariant commutator factorization, null-cone spatial norm rigidity and golden cut-and-project inclusion (`LEAN ✓`), paired with spherical two-step addressing polar inversion, octant rotor $R_y(\pi/2)R_x(\pi/2)$ blind spots, and superconducting virtual-$Z$ gates / relativity (`Literature`), showing how coincidence between single- and double-orthogonality readouts uniquely inverts the observer's pole (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair), [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula), [`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity)

**One-Line Invariant / Identity:**
$d_{S^2}(N, P_1) = d_{S^2}(N, P_2) = \frac{\pi}{2},\quad \operatorname{Tr}(U^\dagger A U \rho) = \operatorname{Tr}(A U \rho U^\dagger)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 29)

**Arriving on a Pulse of Light, Initialization by Forgetting & Homoiconic Table Expansion $T = T(T)$**

**Geometric Intuition Term:**
**Null-cone metric rigidity, single surviving-copy reversal blocking and finite-memory capacity $N \le d$, fourfold criterion for lossless table recovery and extensional identity of canonical copied-address records, and Lawvere diagonal self-application package with pointwise escape of the relative semantic diagonal (`LEAN ✓`), paired with proper-time Pythagorean parameterization $\cos\theta = d\tau/dt$, mammalian fertilization calcium–zinc spark fluorescence, the Weber–Fechner logarithmic law, Yao's cell-probe space–time trade-off, and Scott's reflexive domain $D_\infty \cong [D_\infty \to D_\infty]$ (`Literature`), modeling the lifecycle from $\theta=90^\circ\to 0^+$ clearing initialization to homoiconic closure $T=T(T)$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`target_recovery_criterion`](lean:D5/S3/ConceptDynamics/Restoration/TargetRecoveryCriterion.target_recovery_criterion), [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior), [`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package), [`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)

**One-Line Invariant / Identity:**
$\det G_2 = 1 - c^2,\quad N \le d,\quad T = T(T)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 35)

**Infinite Discrete Hyperbolic Staircase & Quotienting Out Reincarnation**

**Geometric Intuition Term:**
**Qubit pinching orthogonal mass decomposition and discarded coherence criterion, complete normed-algebra exponential tail bound and Cayley unit-circle critical-line criterion, partition-topology quotient factorization, finite annihilator summation, and compact-torus generator equidistribution (`LEAN ✓`), paired with the Lambert–Gudermann hyperbolic-circular bridge $\theta(\eta)=\operatorname{gd}(\eta)$, the Poincaré conformal disk metric (literature results), and the long-division infinite-value and period theorems ([`long_division_value`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_value), [`long_division_period`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_period)), unfolding the finite coordinate horizon $\theta=\pi/2$ into an infinite equidistant rapidity staircase $\eta_k=k\Delta\eta$ and quotienting out the return-to-light loop via $\pi_Q:\mathcal{H}\to\mathcal{H}/\!\sim_G$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le), [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line), [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition), [`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character), [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)

**One-Line Invariant / Identity:**
$\eta(\theta) = \ln(\sec\theta + \tan\theta),\quad \left|\frac{z-i}{z+i}\right| = 1 \iff \operatorname{Im} z = 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 35)

**p-adic Zero-Carry Lookup Trees, Prime Observer Expansion & Blocking Reincarnation**

**Geometric Intuition Term:**
**Ostrowski's dichotomy of nontrivial rational absolute values, mod-$p^k$ integer congruence-fiber closed-ball correspondence, least distinguishing precision $k^* = v_p(x-y)+1$ and observation-distance valuation identity $p^{-v_p(x-y)}$, binary prefix-refinement and discounted prime-time ultrametric strong triangle inequalities, Chinese Remainder coprime ring bijection, and the rational Adelic product formula $\lvert x\rvert\cdot\prod^{\mathrm{fin}}_p \lvert x\rvert_p = 1$ (`LEAN ✓`), paired with Hensel's $O(1)$ zero-carry root-lifting lemma, Bruhat–Tits trees and $p$-adic AdS/CFT holography, Arakelov's archimedean place $p_\infty$, and Euclid's infinitude of primes (`Literature`), modeling each observer as a prime radix $p$ whose growth widens horizontal fan-out to collapse serial lookup depth $K(p)=\lceil n/\log_2 p\rceil$ while Euclid's infinite discrete prime ladder permanently blocks the continuous $p_\infty$ carry-overflow samsara cliff (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification), [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range), [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision), [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation), [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric), [`discounted_prime_time_distance_strong_triangle`](lean:D5/S3/Observer/PrimeTimeGeometry/DiscountedPrimeTimeUltrametric.discounted_prime_time_distance_strong_triangle), [`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective), [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)

**One-Line Invariant / Identity:**
$K(p) = \lceil n / \log_2 p\rceil,\quad d(x,z) \le \max\bigl(d(x,y), d(y,z)\bigr),\quad \lvert x\rvert_\infty \cdot \prod_p \lvert x\rvert_p = 1$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` ([Ch 35 §35.5](ch36-s04-padic-table-expansion.md#sec-ch36-padic-prime-table-expansion))

**Dream Quantum Erasure, Known-Data Decoherence & Nonlocal Observer**

**Geometric Intuition Term:**
**Known-data record-pinching idempotence, unread fixed-point criterion, discarded coherence mass $2\lvert\rho_{01}\rvert^2$, and the von Neumann entropy-production coherence-deletion identity, joint coherent reversal of unimodular environmental records and two-copy certificate, and golden cut-and-project inclusion with explicit bi-infinite Delone radii (`LEAN ✓`), paired with delayed-choice quantum-eraser interferometry, predictive-processing controlled generation, and REM sensory-motor gating physiology (`Literature`), modeling waking five-sense lock, shallow-dream erasure, and bodiless deep-dream nonlocal multilocation (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)

**One-Line Invariant / Identity:**
$S(\mathcal{P}(\rho)) - S(\rho) = D(\rho\parallel\mathcal{P}(\rho)),\quad \det G_3(c,c,u) = (1-u)(1+u-2c^2)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 36)

**Choosing the Future, Dream Pre-Decoherence & Null-Timestamp Déjà Vu Cache Hit**

**Geometric Intuition Term:**
**Unit orthogonal escape outside any proper closed subspace, sharp strict-growth bounds for finite-dimensional observable Krylov chains, distinct fixed-point selection under switched context parameters with identical rules, and the six closed-subspace orthogonal-complement projection identities, functional composition idempotence $\Pi_P \circ \Pi_P = \Pi_P$ and vanishing-off-diagonal fixed-point criterion of finite-record unread pinching, single-qubit discarded coherence mass $2\lvert\rho_{01}\rvert^2$ and the von Neumann entropy-production coherence-deletion identity, joint coherent reversal of unimodular environmental records and the two-copy four-stage certificate, adjoint square-root Gram realizability of bounded positive operators on complex Hilbert spaces and the Lagrange–Gram bivector remainder identity, golden cut-and-project inclusion, dual unique-capture and semantic-closure criteria for lowering information escape on finite nondegenerate arenas, explicit order-noncommutativity of evidence-first conflict-reset revision, pointwise equality of canonical copied-address records, and diagonal-slot fixed-point implication under twisted-diagonal capture (`LEAN ✓`), paired with Wheeler's delayed-choice double-slit thought experiment, superscalar microprocessor branch prediction, speculative pipeline flushing, and TLB/PCID address–context tag hardware specifications, Conway's quasicrystal Empire Effect, and Brown's dual-process dissociation review alongside Moulin's metacognitive conflict-detection account of déjà vu (`Literature`), together with the zero-additional-entropy specialization $\Delta H_{\mathrm{bits}} = 0$ under repeated same-basis pinching without intervening evolution, explicit single-qubit Bloch pinching formulas, the three-vector Gram corridor $[0.28, 1]$, and nested window inclusions (`manual derivation`) plus default numerical evaluations (`NUM`), articulating how active basis selection chooses a compatible future slice, nocturnal sensory-gated sandtables speculatively pre-compile antecedent logic into block-diagonal fixed points, post-dream structural novelty flushes invalidated cache entries, and un-flushed same-ruler re-measurement at $\Delta H_{\mathrm{bits}} = 0$ with `Time_Tag = NULL` produces the sandtable signature of déjà vu (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project), [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos), [`lowersEscape_iff_not_mem_semanticClosureWithout`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_not_mem_semanticClosureWithout), [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation), [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior), [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)

**One-Line Invariant / Identity:**
$\Pi_P \circ \Pi_P = \Pi_P,\quad \Delta H_{\mathrm{bits}}\bigl(\Pi_P(\sigma) \leftarrow \sigma\bigr) = 0,\quad E(C) < E(C \setminus \{i\}) \iff U_i > 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 36 §36.1.5](ch37-s05-future-selection-and-deja-vu.md#sec-ch37-dream-pre-decoherence-deja-vu))

**Ontological QRAM, Observer Memory Pointer & Recursive Self-Mapped Page Tables**

**Geometric Intuition Term:**
**Copied-address dereferencing marginal coincidence and canonical record access defect, pointer-register finite history capacity $N \le d$ and no-cloning inner-product criterion, self-mapped diagonal landing fixed point, universal fixed-point-free escape, and unique golden fixed point (`LEAN ✓`), paired with bucket-brigade QRAM routing trees, CKW monogamy shared read-only borrows, and x86_64 OS kernel recursive page-table self-mapping (`Literature`), modeling the observer as a lightweight recursive memory pointer of the ontological quantum computer (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`reduced_irreversibility_is_canonical_record_access_defect`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect), [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), [`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion), [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed), [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)

**One-Line Invariant / Identity:**
$\operatorname{diagonal}(f, g)(a) = f(g(a, a)),\quad P[s^*] = p_{\mathrm{phys}}(P)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 36)

**7-Stage Degradation Ladder of a Hypothetical P = NP Lookup Oracle & Spacetime–Gravity Trade-Off**

**Geometric Intuition Term:**
**Anchored on the Slot-`[0,0]` self-mapped diagonal fixed point `diagonal_landing_fixed`, the lookup-compiler description-spectrum bound `lookup_program_upper_bound`, retrospective copy zero-loss and non-anticipating failure `lookup_copy_zero_loss_and_nonanticipating_failure`, the Zeckendorf lower-support carry barrier `lower_support_carry_barrier` (capping downward carry penetration at $m - 2$), and Landauer's balance bound `landauer_bound_of_balance` (`LEAN ✓`), paired with postselected/CTC complexity ($\mathrm{PostBQP}=\mathrm{PP}$, $\mathrm{P}_{\mathrm{CTC}}=\mathrm{PSPACE}$), the Karp–Lipton $\mathrm{P}/\mathrm{poly}$ collapse, Frougny's non-parallelizable upward Fibonacci carry wave across alternating strings, Bekenstein–Hawking entropy $S \le A/(4\ell_P^2)$ forcing sphere radius $R = \Omega(2^{\sigma n/2})$ and the pipelined light-cone minimum $(\sigma^* = 2/3,\; r_{\min} = 1/3)$, Klauck–Špalek–de Wolf's quantum trade-off $S T^2 = \Omega(2^n)$ (where Grover's $r=0.500$ at $\sigma=0$ mirrors full-space wire delay at $\sigma=1$), and Yao's classical $S T \ge 2^n$ with PPSZ (`Literature`; uniform Turing $\mathrm{P} \neq \mathrm{NP}$ remains `OPEN`), formulating the bidirectional model (`MODEL`) in which $0 \to 6$ precipitates spatial radius, serial causal time, quantum interference, and Landauer heat while $6 \to 0$ traces biological table-building back to `p = *p`**

**Lean-Facing Object / Locked GID:**
[`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed), [`lookup_program_upper_bound`](lean:D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound), [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure), [`lower_support_carry_barrier`](lean:D5/S1/Digit/ZeckendorfCarryBarrier.lower_support_carry_barrier), [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)

**One-Line Invariant / Identity:**
$\operatorname{spectrumBottom} \le K(r) + c,\quad \forall k \in \operatorname{wdigits}\!\bigl(\sum_{i\in P} F_i + F_j\bigr),\; m - 2 \le k,\quad r_{\mathrm{pipe}}(\sigma) = \max(1-\sigma, \sigma/2) \ge \frac{1}{3}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` / `OPEN` ([Ch 36 §36.5](ch38-s04-lookup-degradation.md#sec-ch38-pnp-lookup-degradation))

**Observer Escape Ledger, Preimage Fibers & Hilbert–Zeckendorf Entropy**

**Geometric Intuition Term:**
**Leave-one-out disjoint union decomposition of `escapePairs` and unique-capture set-difference identity, equivalence between strict lowering of `escapeRate` on nondegenerate arenas and strict quotient-kernel novelty outside semantic closure, monotone non-increase of `conditionalLogicalImpurity` under factor-map concept refinement, uniform non-asymptotic fourteen-bit context-block avoidance bound for `NoAdjacentOnes` binary words, and two-qubit local-marginal versus nine-dimensional correlation orthogonality (`LEAN ✓`), paired with Shannon–McMillan–Breiman cylinder equipartition, Parry's maximal-entropy golden-shift measure $C_\varphi = \log_2\varphi$, Frougny's Fibonacci automaton normalization, and Moore–Hilbert space-filling curve $1/d$-Hölder locality (`Literature`) plus the explicit four-bit $16$-state five-lemma evaluation (`NUM`), establishing the preimage-fiber Rényi-2 collision ledger $H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S}\mid S) = \log_2 N$, nocturnal cylinder-measure rebound, and waking Landauer heat vs. zero-heat dream uncomputation (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`escapePairs_without_eq_union`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union), [`uniqueCapturePairs_eq_sdiff`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.uniqueCapturePairs_eq_sdiff), [`structurallyLowersEscape_iff_lowersEscape`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.structurallyLowersEscape_iff_lowersEscape), [`lowersEscape_iff_strict_kernel_novelty`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty), [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone), [`uniform_avoidance_count`](lean:D5/S1/Digit/ZeckendorfAvoidanceCount.uniform_avoidance_count), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)

**One-Line Invariant / Identity:**
$H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S}\mid S) = \log_2 N,\quad C_\varphi = \log_2\varphi$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `NUM` / `MODEL` ([Ch 36 §36.6](ch38-s05-escape-ledger-and-entropy.md#sec-ch38-observer-escape-ledger))

**Observer Is the Ontological Universe: Reflexive Domains, Relational Holography & Spinor Self-Folding**

**Geometric Intuition Term:**
**Diagonal self-application landing fixed point and fourfold fate classification of binary fractional maps, concept-readout dependent fiber decomposition, Zeckendorf real-thread injectivity and the no-adjacent-ones automaton, circle double-cover no-global-section and history-dependent $360^\circ$ sheet-exchange lift, complementary-context purity Pythagoras, balanced relative complex-structure squaring, and objective invariant common factor (`LEAN ✓`), paired with Scott's substrate-free reflexive domain $D_\infty\cong [D_\infty\to D_\infty]$, the categorical Yoneda Lemma $\operatorname{Hom}(-,X)\hookrightarrow\widehat{\mathcal{C}}$, and the Cartan–Penrose–Hestenes spinor bilinear Fierz identity (`Literature`), completing the zero-remainder ontological identity $\mathcal{O}\equiv\mathcal{U}$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective), [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square)

**One-Line Invariant / Identity:**
$X \simeq \coprod_{y:\mathrm{Val}} \mathrm{ConceptFiber}(c,y),\quad J_{U,V}^2 = -I,\quad \mathcal{O} \equiv \mathcal{U}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 38)

**Zeckendorf–Pisot–Rauzy Eight-Concept Sandtable**

**Geometric Intuition Term:**
**Order-$K=2$ `NoAdjacentOnes` automaton and generalized $K$-Bonacci admissible-word counts $C_K(Q)=\operatorname{dbonacci}(K,Q+2)$, polynomial irreducibility over $\mathbb{Z}$ and $\mathbb{Q}$ with Perron identity $2-\beta_K=\beta_K^{-K}\to 0$ and strict unit-disk conjugate contraction $1\le\|z\|\iff z=\beta_K$, mod-$p^k$ least distinguishing precision $k^*=v_p(x-y)+1$, congruence-fiber intersection, and finite-horizon refinement ultrametric $d_H(x,z)\le\max(d_H(x,y),d_H(y,z))$, exponent-zero Tribonacci Rauzy internal window $\mathcal{R}_3(\alpha)$ nonempty interior, regular closure, exact three-branch prefix self-coverage, and zero planar boundary area $\operatorname{vol}_2(\partial\mathcal{R}_3)=0$, positive cosine fixed-point endpoint $\cos\theta^*=\theta^*$ alongside cubic conjugate product $\alpha\overline{\alpha}=\beta_3^{-1}$, cross-cut $\tau(x)+\iota(y)<K$ direct-encoder attainable page-rank rectangle $1\le r_b\le R_b$ with sharp von Neumann entropy bounds $\ln R_b$, and the signed reset-chain Parry stationary law, boundary cylinder bound, and finite escape-pair capture criterion (`LEAN ✓`); paired with Rauzy–Thurston–Messaoudi theory on Tribonacci Rauzy tilings, disk topology, and boundary Hausdorff dimension $\dim_H(\partial\mathcal{R}_3)\approx 1.09336$, Lindemann–Weierstrass transcendence of $\theta^*\approx 0.739085$ versus degree-six algebraic $|\alpha|_{K=3}=\beta_3^{-1/2}\approx 0.737353$ ($\approx 0.234\%$ numerical proximity, strictly unequal), the Fibonacci-anyon golden chain and 51-atom Rydberg blockade simulator, Parry's maximal-entropy Markov shift $\log_2\beta_K$, and Abramov's induced-return entropy formula $h_{\mu_A}(T_A)=h_\mu(T)/\mu(A)$ (`Literature` + `NUM`), posing the Rauzy fractal-horizon entanglement scaling open problem (`OPEN`), and synthesizing the eight concepts via the cubic Minkowski $E_\parallel^1\oplus E_\perp^2$ Clifford line–plane damped-rotor dictionary, cross-system $p$-adic/$K$-Bonacci tree comparison, and the $\psi=\psi(\psi)$ motif (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card), [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt), [`dbonacci_complex_root_location`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location), [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible), [`dbonacciPerronRoot_simple`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacciPerronRoot_simple), [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow), [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two), [`dbonacciPerronRoot_strictMonoOn`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_strictMonoOn), [`dbonacciPerronRoot_two_eq_goldenRatio`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_two_eq_goldenRatio), [`dbonacciPerronRoot_three_eq_tribonacciConstant`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_three_eq_tribonacciConstant), [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision), [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation), [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range), [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric), [`tribonacci_secondary_root_add_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_add_conjugate), [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate), [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty), [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior), [`rauzyFractal_prefix_cover`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover), [`rauzyFractal_frontier_volume_zero`](lean:D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), [`complete_original_direct_rank_entropy`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy), [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction), [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law), [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound), [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)

**One-Line Invariant / Identity:**
$\beta_K = 2 - \beta_K^{-K},\quad \mathcal{R}_3(\alpha) = f_0(\mathcal{R}_3)\cup f_{10}(\mathcal{R}_3)\cup f_{110}(\mathcal{R}_3),\quad 1 \le r_b \le R_b,\quad S(\sigma_b) \le \ln R_b$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `NUM` / `OPEN` / `MODEL` ([Ch 35 §35.6](ch39-s05-pisot-clifford-rauzy.md#sec-ch39-pisot-clifford-rauzy))

**Six Foundational Quantum Puzzles, Removing External Point $C$ & the Five-Interpretation Geometric Duel**

**Geometric Intuition Term:**
**Real-time unitary stationarity of energy eigenstates, idempotence of finite non-selective record pinching, and context-invariant common factors of objective claims; controlled-copy local marginal coincidence and untraced environmental access defect; computational-basis coherence mass deletion and complementary-context Pythagorean residual mass; forward parallelogram norm law and rank-one Born modulus-square reduction; common-phase polynomial charge balance and unique quadratic Hermitian locking; skew-adjoint unitary complex-structure squaring to $-I$ and four-clause Robertson–Schrödinger variance decomposition; tight two-qubit Tsirelson bound $2\sqrt{2}$, Minkowski null-cone quadratic-form rigidity, and bipartite trace-zero local-versus-correlation orthogonality; diagonal self-application landing fixed point, concept-readout fiber decomposition, and diagonal qubit observable phase blindness; stepwise coarse-grained coherence-deletion relative-entropy production, proper closed-subspace orthogonal escape, and finite-arena `EscapePairs` capture (`LEAN ✓`), paired with von Neumann Process I/II, Wigner's friend and the Frauchiger–Renner theorem, Zurek decoherence and Schlosshauer's single-outcome review, Gleason's theorem and Renou et al. (2021) theoretical real-quantum network inequivalence and experimental falsifiability, Bell / Eberhard no-signaling and 2015 loophole-free tests, Harrigan–Spekkens / PBR (2012), and Pauli / Wheeler–DeWitt / Hawking–Page–AMPS horizon literature (`Literature`) plus heralded $75\%/25\%$ vs. unconditional $50\%/50\%$ marginals, $r^2+\tau_{L:E}=1$, Lorentz boost $\Delta t'=-2\Gamma_\beta\beta$, GRW amplification, and $\{0, 1\}^4$ parity capture checks (`manual derivation` / `NUM`), tracing all six century-old fissures to external referee $C$ and fixed-box container assumptions while marking covariant collapse and quantum-gravity horizon unitarity open (`MODEL` / `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger), [`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)

**One-Line Invariant / Identity:**
$r^2 + \tau_{L:E} = 1,\quad \operatorname{Re}\operatorname{Tr}(\rho\cdot\mathrm{chshOperator}) \le 2\sqrt{2},\quad \Delta S_{\mathrm{vN}}(k) = D\bigl(\widetilde{\rho}_k \mathrel{\Vert} \mathcal{P}(\widetilde{\rho}_k)\bigr) \ge 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Appendix D](appendix-d.md))

**Coherence–Decoherence Logic, Two-Way Born Handshake & Boundary-Locked Causality**

**Geometric Intuition Term:**
**Six closed-subspace orthogonal-complement projection identities, finite-record unread pinching channel idempotence $\Pi_P\circ\Pi_P=\Pi_P$, qubit pinching Hilbert–Schmidt Pythagorean splitting, and the real Lagrange–Gram two-vector identity; rank-one scalar modulus-square reduction, complete-record Born trace-pairing conditional decomposition, and common-$U(1)$ phase-invariant polynomial charge balance, minimum degree $2$, and unique Hermitian representation $z^\dagger H z$; unimodular multi-copy joint coherent record reversal, controlled-copy reduced-marginal access defect with conjugate unitary restoration, bipartite trace-zero local-versus-correlation orthogonality, and positive-operator adjoint-square Gram realizability $Q=O^\dagger\circ_L O$; together with circle double-cover unique path lifts and $2\pi$ antipodal sheet flip, fourfold fate classification of nondegenerate binary fractional maps (`.empty` / `.dead` / `.collapse` / `.live`), and absolute summability at $\pi$ of the rational inverse power series for $\cos\theta^*=\theta^*$ (`LEAN ✓`); paired with distinguishing orthogonal hiding vs. balanced two-port anti-phase routing vs. pinching decoherence, conjugate phase cancellation $w(\psi\leftrightarrow\phi)=\langle\phi\mid\psi\rangle\langle\psi\mid\phi\rangle=\lvert\langle\phi\mid\psi\rangle\rvert^2$, delayed-eraser joint/conditional normalizations and Kraus-completeness past-marginal invariance $p(j)=q_j$, three-epoch real Gram endpoint swap $P_{13} G P_{13}^{\mathsf{T}}$ determinant invariance, and reference-arm anti-phase loop cancellation (`manual derivation` / `NUM`), alongside Feynman–Hibbs Snell quadrature, Cramer's (1986) transactional interpretation, ABL (1964) / AAV (1988) two-state vectors and weak-value orthogonality cutoff, Scully–Drühl (1982) / Kim et al. (2000) delayed-choice quantum erasure, and Deutsch's (1991) closed-timelike-curve mixed-state fixed points (`Literature`), grounding the synthesis (`MODEL`) that logic knows only coherence and decoherence and causality is two-boundary handshake consistency**

**Lean-Facing Object / Locked GID:**
[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**One-Line Invariant / Identity:**
$w(\psi\leftrightarrow\phi) = \langle\phi\mid\psi\rangle\langle\psi\mid\phi\rangle = \lvert\langle\phi\mid\psi\rangle\rvert^2,\quad p(j) = p(j,+) + p(j,-) = q_j,\quad \det(P_{13} G P_{13}^{\mathsf{T}}) = \det G \ge 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 25 §25.2](ch29-s04-coherence-and-handshake.md#sec-ch29-coherence-handshake-causality))

**Multi-Observer Consensus Tensor, Emergent Pointer Basis & No Observer-Independent Facts**

**Geometric Intuition Term:**
**Common-$U(1)$ phase-invariant polynomial charge balance, minimum degree $2$, and unique Hermitian representation, positive-operator adjoint-square Gram realizability $Q=O^\dagger\circ_L O$, and six closed-subspace orthogonal-complement projection identities; qubit pinching Hilbert–Schmidt Pythagorean splitting, stepwise full-pinching relative-entropy production, and unread record fixed-point characterization; single-surviving-copy blocking of local amplitude-conjugate reversal, two-copy four-stage phase restoration certificate, controlled-copy reduced access defect, and partition-topology inseparability kernel; together with three-world conflict-reset revision noncommutativity and unit orthogonal residual escape (`LEAN ✓`); paired with the unoriented-axis second-moment consensus tensor $\mathbf{M}_{\mathrm{cons}}=\sum_{j=1}^N w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ (sign-relabeling invariance $\mathbf{n}_j\mapsto -\mathbf{n}_j$ kept strictly distinct from antipodal orthogonal states and common ket phase, unique pointer line iff spectral gap $\Delta\lambda=\lambda_1-\lambda_2>0$, vanishing in six-axis isotropic fog $\frac{1}{3}I_3$), Pauli dephasing Bloch contraction $\mathbf{K}(\mathbf{n},\alpha)=P_{\mathbf{n}}+\cos\alpha(I_3-P_{\mathbf{n}})$ across ordered products vs. ensemble means vs. weak-limit generator $I_3-\mathbf{M}_{\mathrm{cons}}$, pure two-branch mutual-information redundancy plateau $I(S:\mathcal{O}_m)=h(\Pi_{\mathrm{all}})+h(\Pi_F)-h(\Pi_{F^c})\approx H_2(p_0)$, commuting unread $Z/X$ channels vs. noncommuting selective updates, and out-of-plane pioneer rank enlargement $\det\mathbf{M}_\eta=(1-\eta)^2 ab\eta\sin^2\beta>0$ (with $\ker\mathbf{M}_0$ damping fastest as $e^{-t}$ under the incumbent generator rather than forming a decoherence-free subspace, `manual derivation` / `NUM`), alongside Zurek (1981/2003/2009) & Blume-Kohout–Zurek (2005) einselection and Quantum Darwinism, Brukner (2018) / Frauchiger–Renner (2018) extended Wigner's-friend theorems, Bong et al. (2020) Genuine Local Friendliness polytope violation $F_{\mathrm{LF}}=\sqrt{5}+3+\sqrt{2+\sqrt{2}}\approx 7.0838>6$, and the Lamport–Shostak–Pease (1982) distributed Byzantine consensus analogy (`Literature`), grounding the synthesis (`MODEL`) that observers' consensus selects the direction of decoherence without observer-independent facts**

**Lean-Facing Object / Locked GID:**
[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)

**One-Line Invariant / Identity:**
$\mathbf{M}_{\mathrm{cons}} = \sum_{j=1}^N w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}},\quad I(S:\mathcal{O}_m) = h(\Pi_{\mathrm{all}}) + h(\Pi_F) - h(\Pi_{F^c}),\quad F_{\mathrm{LF}} = \sqrt{5} + 3 + \sqrt{2+\sqrt{2}} > 6$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.5](ch33-s05-consensus-and-pointer-bases.md#sec-ch33-consensus-decoherence-pointer))

**Ontological Equivalence of Spacetime Motion & Observer-Memory Schur Classification**

**Geometric Intuition Term:**
**Constant-free unit-quaternion ternary isomorphism, chord-deficit kernel, and basepointed heap factorization; Chebyshev heap recurrence with reflection power and shift-invariant spacing; six closed-subspace orthogonal-complement projection identities, the attained Schur minimum, and complementary/pinching Pythagorean decompositions with discarded coherence mass; Minkowski null-cone rigidity and Bogoliubov hyperbolic norm conservation; together with the Fubini–Study orthogonal record-time floor, surviving-copy reversal blocking, and permanent observable Krylov stability (`LEAN ✓`), paired on unlabeled arcs $\Gamma \subset \mathbb{T}_3$ with orthogonal cleavage across a bounded memory window $\mathcal{W}_M$ into temporal overwrite $\kappa_{\mathrm{time}} = \lVert P_{\mathcal{W}_M}\psi\rVert^2$ and spatial overflow $\kappa_{\mathrm{space}} = \lVert(I-P_{\mathcal{W}_M})\psi\rVert^2 = 1-\kappa_{\mathrm{time}}$, positive budget transposition $\Delta\tau^2 = \Delta t^2 - \Delta x^2$, radical-free rational parameterizations $u=\frac{p}{q}$ ($u=\frac{1}{3}$ giving $\frac{16}{25}+\frac{9}{25}=1$ and $(\frac{5}{4})^2-(\frac{3}{4})^2=1$), three memory-capacity regimes $M\in\{0,1\dots M_\Omega-1,M_\Omega\}$, dual-observer rational Cayley rotor simultaneity tilt, and FIFO space-by-forgetting alongside `KV-Cache` sequence-vs-channel swap (`manual derivation` / `NUM` / `MODEL`; Epstein diagrams vs. non-compact boosts $\mathrm{SO}^+(1,3)$, Schwarzschild–Kruskal horizons, and Landauer erasure carry literature boundaries while 3+1D gravitational emergence and horizon unitarity remain `OPEN` [@prob-ch34-gravity-dynamics-and-coupling], [@prob-appendix-d-time-horizon])**

**Lean-Facing Object / Locked GID:**
[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv), [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq), [`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul), [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev), [`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow), [`kappa_reflectionSeq_add`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least), [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently)

**One-Line Invariant / Identity:**
$\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} = \lVert P_{\mathcal{W}_M}\psi\rVert^2 + \lVert(I - P_{\mathcal{W}_M})\psi\rVert^2 \equiv 1,\quad \Delta\tau^2 = \Delta t^2 - \Delta x^2$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 38 §38.12](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md#sec-ch38-spacetime-motion-equivalence-and-memory-schur-split))

**Port-Free Self-Contained Observer Pentad, Rational Structural Time & Observer Is Universe**

**Geometric Intuition Term:**
**Unit-quaternion ternary isomorphism, chord-deficit kernel, basepointed heap factorization, and spinor Born ray kernel; attained Schur minimum and six closed-subspace orthogonal-complement projection identities; strict observable Krylov growth codimension bound and permanent stability; spherical face-cycle exactness, tetrahedral two-cochain repair, and anchored spanning-tree cycle classification; together with partition-topology inseparability kernels, unit-Gram identity, concept fiber decomposition, contextual fixed points, and invariant common factors (`LEAN ✓`), paired with the port-free pentad $\mathfrak{O}=(\mathcal{S},[-,-,-],\kappa,\mathcal{K}_0,\Phi_\varepsilon)$ enclosing all receivable information inside boundaryless $\mathcal{S}$ ($\partial\mathcal{S}=\emptyset$), radical-free log-free rational structural proper time $\tau(\mathfrak{O})\equiv\mathcal{I}_{\mathrm{struct}}(\mathcal{K}_0)\in\mathbb{Q}_{\ge 0}$ combining Gram–Schur innovation $\Delta\mathcal{I}_{\mathrm{Schur}}=\frac{\langle x_\perp,x_\perp\rangle}{\langle x,x\rangle}\in\mathbb{Q}\cap[0,1]$ and Betti cycle-rank jumps $\Delta b_1\in\mathbb{N}$ ($\Delta\tau=0$ on tautologies), the three-step faithful comparison-quotient identity $\mathfrak{O}\cong\mathcal{U}_\Omega$ and inside-core starry-sky projection, corridor-free monad resonant spans $\mathfrak{O}_A\xleftarrow{\iota_A}\mathcal{C}_{AB}\xrightarrow{\iota_B}\mathfrak{O}_B$, and the zero-import Lean `v4.35.0` `by decide` trace `0 → 0 → 3/4 → 3/2` (`manual derivation` / `NUM` / `MODEL`; Leibnizian monadology, Yoneda embedding, autopoiesis, and Page–Wootters / Rovelli relational time carry separate literature boundaries)**

**Lean-Facing Object / Locked GID:**
[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv), [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq), [`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul), [`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)

**One-Line Invariant / Identity:**
$\mathfrak{O} = (\mathcal{S},[-,-,-],\kappa,\mathcal{K}_0,\Phi_\varepsilon),\quad \tau(\mathfrak{O}) = \sum(\Delta\mathcal{I}_{\mathrm{Schur}} + \alpha_{\mathrm{topo}}\Delta\mathcal{I}_{\mathrm{topo}}) \in \mathbb{Q}_{\ge 0},\quad \mathfrak{O} \cong \mathcal{U}_\Omega$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 38 §38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md#sec-ch38-self-contained-observer-definition-and-observer-is-universe))

**Conway's FRACTRAN & Three-Dimensional Non-Abelian $\Omega\text{-FRACTRAN}$ Observer Rational ISA**

**Geometric Intuition Term:**
**Signed prime-ledger isomorphism to positive rationals, nonnegativity divisibility guard, and free commutative monoid on primes; unique rational valuation recovery, Artin's Adelic product formula, prime-logarithm independence, and constructive prime-axis escape; impossibility of finite-automaton prime division alongside physical quotient-remainder machine correctness; and commutative prime-multiset history loss versus non-commuting word-code injectivity, noncommutative unit-quaternion isomorphism, Kleene's fixed point, and record-pinching idempotence (`LEAN ✓`), paired with orthogonal prime-winding registers $N = \prod_p p^{v_p(N)}$ and attention-ordered `0 · 1/2 · 1` fraction tables $(\frac{a_1}{b_1},\dots,\frac{a_k}{b_k})$ (Conway's `6`-fraction multiplier halting in `18` beats at $5^4 = 625$, `PRIMEGAME` crystallizing $\mathbb{P}$ from $N_0=2$, and guarded macro-lemma telescopy), then lifted to rational rotor right-fractions $(\mathbf{A}_i\mathbf{B}_i^{-1})$ on $\mathbb{Z}^4 / \mathcal{H}(\mathbb{Z})$ to form flag-free $\Omega\text{-FRACTRAN}$ separating `Ψ_XY ↔ Ψ_YX` at identical scalar norm squared `25` in `2` beats via fractional tears on $p = 5$ Ramanujan rotors (`manual derivation` / `NUM` / `MODEL`; Conway FRACTRAN, Minsky two-counter universality, Hurwitz integral quaternions, and LPS Ramanujan graphs retain separate literature boundaries)**

**Lean-Facing Object / Locked GID:**
[`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals), [`prime_ledger_direction_and_groupification`](lean:D5/S3/Factorization/Embeddings/PrimeLedgerGroupification.prime_ledger_direction_and_groupification), [`pnat_free_comm_monoid_on_primes`](lean:D5/S3/Factorization/FreeCommMonoid.pnat_free_comm_monoid_on_primes), [`rational_recovered_from_sign_and_finite_valuations`](lean:D5/S3/Factorization/Embeddings/RationalValuationRecovery.rational_recovered_from_sign_and_finite_valuations), [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula), [`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence), [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape), [`no_finite_dfao_for_exact_prime_division`](lean:D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division), [`divMachine_positive_correct`](lean:D5/S0/Computability/PhysicalDivider/Positive.divMachine_positive_correct), [`order_descent_criterion`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.order_descent_criterion), [`no_prime_history_reconstruction`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.no_prime_history_reconstruction), [`injective_iff_noncommuting`](lean:D5/S0/Computability/Coding/TwoWordCode.injective_iff_noncommuting), [`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv), [`quaternionModel_noncommutative`](lean:D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_noncommutative), [`code_fixed_point`](lean:D5/S0/Computability/CodeFixedPoint.code_fixed_point), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)

**One-Line Invariant / Identity:**
$\mathbf{\Psi}' = \mathbf{\Psi}\cdot\mathbf{A}_i\overline{\mathbf{B}_i}/\lVert\mathbf{B}_i\rVert^2 \in \mathbb{Z}^4,\quad \lVert\mathbf{\Psi}'\rVert^2 = \lVert\mathbf{\Psi}\rVert^2\cdot\frac{\lVert\mathbf{A}_i\rVert^2}{\lVert\mathbf{B}_i\rVert^2}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 38 §38.14](ch38-s14-omega-fractran-observer-rational-isa.md#sec-ch38-omega-fractran-observer-rational-isa))

**Static Canvas & Legless Sphere Observer: Unified Spacetime Gradient, Gullstrand–Painlevé Tilted Horizon Cone & Wheeler–DeWitt Timeless Canvas**

**Geometric Intuition Term:**
**Unit-quaternion ternary isomorphism, chord-distance reading, and basepointed heap factorization; Chebyshev heap recurrence, reflection powers, and shift-invariant spacing; six closed-subspace orthogonal-complement projection identities and the attained Schur minimum; Minkowski null-cone rigidity, Bogoliubov hyperbolic norm conservation, and Fubini–Study record-time and count bounds; and static-memory reversible routing `ReversibleQram.correctness`, observable Krylov growth and permanent stability, and partition-topology inseparability kernels (`LEAN ✓`), paired with orthogonal cleavage $\nabla\kappa = P_{\mathcal{W}_M}\nabla\kappa \oplus P_{\mathcal{W}_M^\perp}\nabla\kappa$ of one rational fidelity gradient across $\mathcal{W}_M$ into temporal progression and spatial gravity, fulcrum-free "legless ternion sphere" heap rolling, radical-free rational Gullstrand–Painlevé tilted cones $(\frac{\Delta r}{c\Delta T_{\mathrm{GP}}}, \frac{v_\perp}{c}) = (\beta_{\mathrm{loc}}\frac{1-u^2}{1+u^2}-\eta_{\mathrm{grad}}, \beta_{\mathrm{loc}}\frac{2u}{1+u^2})$ (locking unidirectional descent $\Delta r < 0$ at $\eta_{\mathrm{grad}} > 1$ while leaving transverse yaw $u \in \mathbb{Q}$ free to select `Atlas DAG` branches), and $O(1)$ focus stepping on the immutable $\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$ canvas versus $\Theta(\lvert\mathcal{S}\rvert)$ egocentric frame shifting (`manual derivation` / `NUM` / `MODEL`; Einstein geodesics, Painlevé–Gullstrand coordinates, and Wheeler–DeWitt constraints retain separate literature boundaries while $3+1\mathrm{D}$ Einstein emergence and horizon unitarity remain `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv), [`kappa_eq_one_sub_dist_sq`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq), [`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul), [`normSq_and_chebyshev`](lean:D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev), [`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow), [`kappa_reflectionSeq_add`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound), [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound), [`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)

**One-Line Invariant / Identity:**
$\lVert\nabla_\parallel\kappa\rVert^2+\lVert\nabla_\perp\kappa\rVert^2=\lVert\nabla\kappa\rVert^2,\quad \bigl(\tfrac{\Delta r}{c\Delta T_{\mathrm{GP}}}, \tfrac{v_\perp}{c}\bigr)=\bigl(\beta_{\mathrm{loc}}\tfrac{1-u^2}{1+u^2}-\eta_{\mathrm{grad}}, \beta_{\mathrm{loc}}\tfrac{2u}{1+u^2}\bigr),\quad \hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle=0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 38 §38.15](ch38-s15-static-canvas-and-legless-sphere-observer.md#sec-ch38-static-canvas-and-legless-sphere-observer))

**Constant-Information-Rate Observer, Phonograph-Needle Static-Groove Decoding & Radical-Free Rational Cayley Gravity**

**Geometric Intuition Term:**
**Zero-axiom rational circle overlap–spread partition, Cayley unit circle, and antipodal horizon closure; rational quadratic Schur completion and attained minimum; three-quaternion Gram determinant nonnegativity, deterministic quaternion-FRACTRAN divisibility decoding, and Pythagorean spinor heap norm preservation (`LEAN ✓ · Axiom-free`, `axioms = []`), alongside static-memory reversible routing `ReversibleQram.correctness`, Minkowski null-cone rigidity and Bogoliubov norm conservation, Fubini–Study record-time and count bounds, six closed-subspace orthogonal-complement projection identities, observable Krylov strict-growth bounds, and partition-topology inseparability kernels (`LEAN ✓`), paired with phonograph-needle focus scanning of motionless phase grooves (`0` writes on `D`), constant-rate three-way unit bandwidth partition $\mathcal{R}_\Omega = \kappa_{\mathrm{self}} + \kappa_{\mathrm{mass}} + \kappa_{\mathrm{kin}} \equiv 1$, Weyl–Eddington isotropic rational load $\mu = \frac{r_s}{4R}$ ($r = R(1+\mu)^2$) eliminating square roots into $\frac{\Delta\tau}{\Delta t}\big|_{\kappa_{\mathrm{kin}}=0} = \frac{1-\mu}{1+\mu} \in \mathbb{Q} \cap [0,1]$ ($\mu \in \{0,\frac{1}{4},\frac{1}{3},\frac{1}{2},1\} \mapsto \{1,\frac{3}{5},\frac{1}{2},\frac{1}{3},0\}$), $100\%$ I/O horizon stall at $\mu = 1$, and inward wavefront refraction from flank traversal deficit $v_{\mathrm{traverse}}(\mu) = \frac{1-\mu}{(1+\mu)^3}$ ($\Delta v = \frac{411}{4000}$ between $\mu_{\mathrm{out}}=\frac{1}{4}$ and $\mu_{\mathrm{in}}=\frac{1}{3}$) without action-at-a-distance (`manual derivation` / `NUM` / `MODEL`; Schwarzschild exterior metrics, Weyl–Eddington isotropic coordinates, Gordon's optical refractive-index metric, quantum speed limits, and Bekenstein holographic bounds retain separate literature boundaries while $3+1\mathrm{D}$ Einstein emergence and horizon unitarity remain `OPEN` [@prob-ch34-gravity-dynamics-and-coupling], [@prob-appendix-d-time-horizon])**

**Lean-Facing Object / Locked GID:**
[`kappa_add_spread_eq_one`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one), [`cayley_circle_unit`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit), [`cayley_antipodal_closure`](lean:D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure), [`rational_schur_complete`](lean:D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_complete), [`rational_schur_min`](lean:D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min), [`detGram3_nonneg`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg), [`quaternion_fractran_deterministic`](lean:D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_deterministic), [`heap_norm_preserved`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.heap_norm_preserved), [`ReversibleQram.correctness`](lean:D5/S3/Quantum/Routing/ReversibleQram.correctness), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound), [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)

**One-Line Invariant / Identity:**
$\kappa_{\mathrm{self}} + \kappa_{\mathrm{mass}} + \kappa_{\mathrm{kin}} \equiv 1,\quad \frac{\Delta\tau}{\Delta t}\big|_{\kappa_{\mathrm{kin}}=0} = \frac{1-\mu}{1+\mu} \in \mathbb{Q},\quad v_{\mathrm{traverse}}(\mu) = \frac{1-\mu}{(1+\mu)^3} \in \mathbb{Q}$

**Epistemic Status:**
`LEAN ✓ · Axiom-free` / `LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 38 §38.16](ch38-s16-constant-info-rate-observer-and-rational-cayley-gravity.md#sec-ch38-constant-info-rate-observer-and-rational-cayley-gravity))

**AURIC Dawn Etymology, Trivalent Gold Relativistic Square-Planar Breaking & `0 · 1/2 · 1` Observer-Focus Signature**

**Geometric Intuition Term:**
**Zero-axiom orthogonal half-step triad quarter Gram excess, $p = 5$ rotor squared norm $5$ and fidelity $\frac{1}{5}$ alongside the six-degree spherical Hecke trace table, self-dual midpoint rational 2-jet $\langle\frac{1}{2},-\frac{1}{2},\frac{1}{4}\rangle$ and cubic nilpotency $\eta^3 \approx 0$, Hurwitz 12-core doubled norm four, deterministic FRACTRAN stepping, and simplicial two-cochain zero-coboundary exactness (`LEAN ✓ · Axiom-free`, `axioms = []`), alongside closed-shell $5d^{10}$ quadrupole vanishing versus deleted-$5d_{x^2-y^2}$ trivalent $5d^8$ rational traceless quadrupole slicing, spin-$j = 2$ Chebyshev character $\chi_2(\kappa) = 16\kappa^2 - 12\kappa + 1$ and spherical Haar character annihilation, integral-quaternion heap left absorption, fifteen-step `pOmega` halting from `131072` to `22`, the noncommutative ternary dimension–rank `TFAE` lock $(3 \le d \land 5 \le r)$, and six closed-subspace orthogonal-complement projection identities (`LEAN ✓`), paired with PIE `*h₂ews-` dawn philology (*aurum / Aurora*, demarcated from paronymic Greek `αὔρα < *h₂ew-` and Latin `auris < *h₂ows-`), relativistic $Z = 79$ $6s\downarrow / 5d\uparrow$ gap narrowing and aqua regia low-spin $D_{4h}$ trivalent gold $\mathrm{Au}^{3+}$ ($I_5 = P_{\mathrm{occ}}^{(4)} + P_{\mathrm{LUMO}}^{(1)}$ vacating the equatorial cross-shaped $5d_{x^2-y^2}$ LUMO window above the filled axial $5d_{z^2}$ spine), rational scale identity $\mathbf{Q}_{\mathrm{phys}}(5d^8) = \operatorname{diag}(-\frac{4}{7},-\frac{4}{7},+\frac{8}{7}) = \frac{12}{7}\mathbf{Q}_{\mathrm{Auric}}$ (checked against 12-node Hurwitz rotational cancellation and $p = 5$ 5D Hecke trace $3(-\frac{74}{25}) + 2(+\frac{54}{25}) = 6(-\frac{19}{25})$), and the observer-focus ouroboros uniting equatorial `1/2` horizon $\mathcal{H}_{1/2}$ with axial $d_2 F = 0$ memory crystallization into $\mathcal{K}_0$ (`manual derivation` / `NUM` / `MODEL`; Pokorny–de Vaan–Beekes philology, Unsöld and Bethe–Van Vleck–Jahn–Teller ligand-field splitting, and Pyykkö–Desclaux–Hashmi relativistic gold chemistry retain separate literature boundaries while three-generation couplings and AF-GUT threshold closure remain `OPEN` [@prob-ch34-sm-generations-and-couplings], [@prob-ch39-af-gut-threshold-and-proton-stability])**

**Lean-Facing Object / Locked GID:**
[`orthogonal_triad_excess_quarter`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.orthogonal_triad_excess_quarter), [`lps_norm_five`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_norm_five), [`lps_hecke_traces`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_traces), [`kappa_jet_one`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one), [`var_cube`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.var_cube), [`hurwitz_core_unit`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.hurwitz_core_unit), [`fractran_deterministic`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_deterministic), [`d2_eq_zero_iff`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff), [`orbital_quadrupole`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.orbital_quadrupole), [`full_orbital_quadrupole`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.full_orbital_quadrupole), [`spin_two_character`](lean:D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.spin_two_character), [`haar_evenChar_expectation`](lean:D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.haar_evenChar_expectation), [`triad_left_absorption`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_left_absorption), [`p_omega_halts_at_22`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.p_omega_halts_at_22), [`DimensionRankRealization.exists_model_tfae`](lean:D5/S3/Quantum/AURICOmega/DimensionRankRealization.exists_model_tfae), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)

**One-Line Invariant / Identity:**
$\mathbf{Q}(5d^{10}) = \mathbf{0},\quad \mathbf{Q}_{\mathrm{phys}}(5d^8) = \operatorname{diag}(-\tfrac{4}{7},-\tfrac{4}{7},+\tfrac{8}{7}) = \tfrac{12}{7}\mathbf{Q}_{\mathrm{Auric}},\quad \operatorname{kappaJetAt}(1) \approx \langle \tfrac{1}{2}, -\tfrac{1}{2}, \tfrac{1}{4}\rangle$

**Epistemic Status:**
`LEAN ✓ · Axiom-free` / `LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 38 §38.17](ch38-s17-auric-trivalent-gold-and-observer-focus-signature.md#sec-ch38-auric-trivalent-gold-and-observer-focus-signature))
