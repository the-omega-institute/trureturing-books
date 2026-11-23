# A.1.1 Quantum states, operators, and algorithms {#sec-appendix-a-s01-s01-quantum-and-algorithms}

The evidence labels follow the [dictionary note](appendix-a-s01-master-dictionary.md#rem-appendix-a-master-dictionary).

**Measurement / Physical Quantity**

**Geometric Intuition Term:**
**Verb `liáng` (to measure) vs. Noun `liàng` (reading)**: pairwise ruler comparison operator vs. truncated scalar readout

**Lean-Facing Object / Locked GID:**
[`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)

**One-Line Invariant / Identity:**
$\rho \succeq 0,\ \operatorname{Tr}\rho = 1 \implies \operatorname{bornProbability}(\rho, I) = 1$, additive and nonnegative on projections

**Epistemic Status:**
`LEAN ✓` (Ch 1–2)

**Pure Quantum State $|\psi\rangle$**

**Geometric Intuition Term:**
**Oriented unit ray on the sphere** uniquely addressed by pairwise cosine projections

**Lean-Facing Object / Locked GID:**
[`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian)

**One-Line Invariant / Identity:**
$\operatorname{Tr}M = 1,\ M^2 = M \implies x^2 + y^2 + z^2 = 1$ ($M$ a $2\times 2$ Hermitian matrix)

**Epistemic Status:**
`LEAN ✓` (Ch 1–3, Forge and Sanctuary · Single-Qubit Rotor Compilation)

**Observable & Projector $P$**

**Geometric Intuition Term:**
**Geometric ruler & idempotent orthogonal projection axis** ($P^2 = P = P^\dagger$)

**Lean-Facing Object / Locked GID:**
[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)

**One-Line Invariant / Identity:**
$\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho),\quad P_\psi^2 = P_\psi$

**Epistemic Status:**
`LEAN ✓` (Ch 1, 3, Forge and Sanctuary · Inside the Lean 4 Axiom Sanctuary (Part I))

**Born Probability Rule $P = |\langle\phi|\psi\rangle|^2$**

**Geometric Intuition Term:**
**Squared inner-product projection & rank-one trace pairing** (Pythagorean area share along the ruler axis)

**Lean-Facing Object / Locked GID:**
[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)

**One-Line Invariant / Identity:**
$\rho = \lvert\psi\rangle\langle\psi\rvert,\ P_k = \lvert\phi\rangle\langle\phi\rvert \implies \operatorname{recordWeight}_k = \operatorname{Tr}(\rho P_k) = \lvert\langle\phi\mid\psi\rangle\rvert^2$

**Epistemic Status:**
`LEAN ✓` (Ch 2, Forge and Sanctuary · Inside the Lean 4 Axiom Sanctuary (Part II))

**Orthogonal Decomposition**

**Geometric Intuition Term:**
**Inner-product parallelogram & Pythagorean theorem**: 1D orthogonal segments cannot add, 2D squared areas conserve norm

**Lean-Facing Object / Locked GID:**
[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)

**One-Line Invariant / Identity:**
$\|u + v\|^2 + \|u - v\|^2 = 2(\|u\|^2 + \|v\|^2)$

**Epistemic Status:**
`LEAN ✓` (parallelogram identity only) (Ch 1, Forge and Sanctuary · Inside the Lean 4 Axiom Sanctuary (Part I), Coda)

**Global Phase $e^{i\alpha}|\psi\rangle$**

**Geometric Intuition Term:**
**Gauge spin around the state's own axis** (unitary phase rigidity under connected ray tests)

**Lean-Facing Object / Locked GID:**
[`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)

**One-Line Invariant / Identity:**
$A$ unitary, preserving coordinate rays and a connected ray family $\implies A = c\,I,\ |c| = 1$

**Epistemic Status:**
`LEAN ✓` (Ch 1, Forge and Sanctuary · Inside the Lean 4 Axiom Sanctuary (Part I))

**Density Matrix $\rho$ & Mixed State**

**Geometric Intuition Term:**
**Interior barycenter vector $\mathbf{r} \in B^3$ of the Bloch ball** (purity deficit measures discarded phase area)

**Lean-Facing Object / Locked GID:**
[`norm_bloch_le_trace_of_posSemidef`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef)

**One-Line Invariant / Identity:**
$\|\mathbf{r}\| \le \operatorname{Tr}(\rho),\quad \operatorname{Tr}(\rho(\mathbf{r})) = 1$

**Epistemic Status:**
`LEAN ✓` (Ch 3, Forge and Sanctuary · Single-Qubit Rotor Compilation)

**Decoherence & Quantum Channel $\Phi(\rho)$**

**Geometric Intuition Term:**
**Orthogonal pinching projection onto the measurement axis**: transverse circular coherence collapses onto the longitudinal diameter

**Lean-Facing Object / Locked GID:**
[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)

**One-Line Invariant / Identity:**
$\|\rho\|_{\mathrm{HS}}^2 = \|\mathcal{P}(\rho)\|_{\mathrm{HS}}^2 + \|\rho - \mathcal{P}(\rho)\|_{\mathrm{HS}}^2$

**Epistemic Status:**
`LEAN ✓` (Ch 4, 6)

**No-Cloning Theorem**

**Geometric Intuition Term:**
**Unitary inner-product rigidity**: an inner-product-preserving map cannot duplicate neither-orthogonal-nor-collinear rays

**Lean-Facing Object / Locked GID:**
[`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)

**One-Line Invariant / Identity:**
$s = s^2 \implies s = 0 \lor s = 1$

**Epistemic Status:**
`LEAN ✓` (Ch 14)

**Operator Commutator $[A, B] = AB - BA$**

**Geometric Intuition Term:**
**Clifford exterior bivector area $2(\mathbf{a}\wedge\mathbf{b})$** measuring the oriented rotation plane spanned by order reversal

**Lean-Facing Object / Locked GID:**
[`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum) (mixed product of a balanced sum; see row B.5 of Appendix B)

**One-Line Invariant / Identity:**
$\begin{aligned}&\mathbf{u}\wedge\mathbf{v}=-\mathbf{v}\wedge\mathbf{u},\\&A=A^\dagger,\ B=B^\dagger\\&\implies (AB-BA)^\dagger\\&\hspace{1em}=-(AB-BA)\end{aligned}$

**Epistemic Status:**
`LEAN ✓` (balanced mixed product) / `Literature` (commutator identity, Ch 5–6)

**Imaginary Unit $i$ & Pauli Matrices $\sigma_x, \sigma_y, \sigma_z$**

**Geometric Intuition Term:**
**3D orthonormal basis vectors $e_1, e_2, e_3$ & skew-adjoint unitary complex structure $\hat{\mathbf{I}}^2 = -1$**

**Lean-Facing Object / Locked GID:**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)

**One-Line Invariant / Identity:**
$\hat{\mathbf{I}}^2 = -1,\quad ZX = -XZ$

**Epistemic Status:**
`LEAN ✓` (Ch 5, Forge and Sanctuary · Reducing Matrices to XOR)

**Single-Qubit Unitary Gate $U \in \mathrm{SU}(2)$**

**Geometric Intuition Term:**
**Bivector exponential rotor $R = \cos(\theta/2) - \hat{B}\sin(\theta/2)$** in a calibrated unitary evolution group

**Lean-Facing Object / Locked GID:**
[`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group)

**One-Line Invariant / Identity:**
$U(0) = 1,\ U(s+t) = U(s)U(t),\ U^*U = 1,\ U$ differentiable at $0 \implies U(t) = \exp(-itH/\hbar)$ with $H$ self-adjoint ($v \mapsto R v \widetilde{R}$ is not part of this declaration)

**Epistemic Status:**
`LEAN ✓` (Ch 7, Forge and Sanctuary · Single-Qubit Rotor Compilation)

**Two-Qubit Entanglement & Concurrence**

**Geometric Intuition Term:**
**Exterior wedge area in $\mathbb{C}^4$ & maximally mixed marginal blind spot of Bell states**

**Lean-Facing Object / Locked GID:**
[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)

**One-Line Invariant / Identity:**
Bell state: $\rho_A = \frac{1}{2}I_2,\ \rho_A^2 \neq \rho_A$; the concurrence criterion $\psi_{00}\psi_{11} - \psi_{01}\psi_{10} \neq 0$ for general pure states is a `Literature` result

**Epistemic Status:**
`LEAN ✓` (Bell-state marginal) / `Literature` (concurrence criterion) (Ch 8, 13)

**Quantum State Tomography**

**Geometric Intuition Term:**
**Three-axis orthogonal addressing & rational six-axis open cover**

**Lean-Facing Object / Locked GID:**
[`rational_six_axis_open_cover`](lean:D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover)

**One-Line Invariant / Identity:**
six open sets $C_1, \dots, C_6$ cover $S^2$, and no $C_i$ contains an orthogonal pair

**Epistemic Status:**
`LEAN ✓` (rational six-axis open cover) (Ch 9)

**Order Dependence vs. Pancharatnam–Berry Phase**

**Geometric Intuition Term:**
**"Pairwise comparison is always consistent and order-independent"**: unit-vector overlap equals $1$ iff vectors coincide (`LEAN ✓`; general ray equality up to phase $e^{i\theta}$) vs. spherical solid angle $\Omega/2$ (`Literature`)

**Lean-Facing Object / Locked GID:**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)

**One-Line Invariant / Identity:**
$\|u\|=\|v\|=1 \implies (\langle u,v\rangle = 1 \iff u = v);\; \gamma_{\mathrm{Berry}} = -\Omega/2$

**Epistemic Status:**
`LEAN ✓` / `Literature` (Ch 10)

**Microwave Rabi Pulse & Virtual-$Z$ Gate**

**Geometric Intuition Term:**
**Ordered three-pulse real trace bound & observer pullback trace identity in the rotating frame**

**Lean-Facing Object / Locked GID:**
[`ordered_three_pulse_real_trace_bound`](lean:D5/S3/Quantum/Dynamics/OrderedThreePulseTrace.ordered_three_pulse_real_trace_bound)

**One-Line Invariant / Identity:**
$\begin{aligned}&R_z(\phi)R_{\text{xy}}(\theta,0)\\&\quad\cdot R_z(-\phi)\\&=R_{\text{xy}}(\theta,\phi)\end{aligned}$

**Epistemic Status:**
`LEAN ✓` (three-pulse trace bound) / `Literature` (virtual-$Z$ identity, Ch 11)

**Spinor $4\pi$ Periodicity & Gimbal Lock**

**Geometric Intuition Term:**
**$S^3 \to \mathrm{SO}(3)$ double cover & Hairy Ball $\chi(S^2) = 2$**: 2-sphere vortices require lifting to parallelizable $S^3$ ($\chi(S^3)=0$)

**Lean-Facing Object / Locked GID:**
[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)

**One-Line Invariant / Identity:**
$R(2\pi) = -1 \in S^3,\quad R(4\pi) = +1$ (what is formalized is the squaring cover $z \mapsto z^2$ of the circle)

**Epistemic Status:**
`LEAN ✓` (circle double cover) / `Literature` ($S^3 \to \mathrm{SO}(3)$ double cover, Hairy Ball theorem and gimbal lock) (Ch 5, 10)

**Bell–CHSH Inequality & Tsirelson Bound**

**Geometric Intuition Term:**
**Classical $\ell_1$ octahedron polytope ($\le 2$) vs. quantum $\ell_2$ Pythagorean sphere ($2\sqrt{2}$)**

**Lean-Facing Object / Locked GID:**
[`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest)<br/>[`bell_value_le`](lean:D5/S3/QuantumBounds/PeritoTsirelson.bell_value_le)

**One-Line Invariant / Identity:**
$\begin{aligned}\mathcal S_{\text{classical}}&\le2,\\\mathcal S_{\text{quantum}}&\le2\sqrt2\end{aligned}$ (the quantum upper bound is attained)

**Epistemic Status:**
`LEAN ✓` (Ch 13)

**Stabilizer Codes & Clifford Braiding**

**Geometric Intuition Term:**
**Pauli word multiplication over $\mathbb{F}_2^{2n}$ & Yang–Baxter self-distributive rack braiding**

**Lean-Facing Object / Locked GID:**
[`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul), [`crossing_yang_baxter`](lean:D5/S0/Certificates/Quandles/BraidColoringTransport.crossing_yang_baxter)

**One-Line Invariant / Identity:**
$P_1 P_2 = P_2 P_1 \iff x_1 z_2 \oplus z_1 x_2 = 0$

**Epistemic Status:**
`LEAN ✓` (Ch 14, Forge and Sanctuary · Reducing Matrices to XOR)

**Grover / QFT / QSVT / Szegedy Walk**

**Geometric Intuition Term:**
**Uniform operator rotation in a 2D plane, finite Poisson summation & Chebyshev spectral polynomials**

**Lean-Facing Object / Locked GID:**
[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation), [`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation)

**One-Line Invariant / Identity:**
$R_{\psi}\,R_{\perp} = \operatorname{Rot}(2\theta),\quad T_n(\cos\theta) = \cos(n\theta)$

**Epistemic Status:**
`LEAN ✓` (uniform operator rotation in a 2D subspace, finite Poisson summation) / `Literature` (Chebyshev identity, QSVT and Szegedy walks) (Ch 15–16)

**Solovay–Kitaev Compilation Theorem**

**Geometric Intuition Term:**
**Two-axis finite rotation words, norm-one trace recurrence & group-commutator helix $ABA^{-1}B^{-1}$**

**Lean-Facing Object / Locked GID:**
[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`trace_recurrence`](lean:D5/S1/Recurrence/NormOneTraceAddition.trace_recurrence)

**One-Line Invariant / Identity:**
$\operatorname{Tr}(U^{n+1}) = \operatorname{Tr}(U)\operatorname{Tr}(U^n) - \operatorname{Tr}(U^{n-1})$

**Epistemic Status:**
`LEAN ✓` / `Literature` (Ch 16)

**Lorentz Boost & Bogoliubov Transform**

**Geometric Intuition Term:**
**Minkowski hyperbolic rotor ($\cosh\eta - \gamma_0\gamma_1\sinh\eta$) & null lightcone rigidity**

**Lean-Facing Object / Locked GID:**
[`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)

**One-Line Invariant / Identity:**
$\cosh^2\eta-\sinh^2\eta=1$; for a real quadratic form $Q$ on $\mathbb{R}\times\mathbb{R}^d$: $\begin{aligned}&(\forall v,\\&\eta(v,v)=0\\&\implies Q(v)=0)\\&\implies\exists c\in\mathbb{R},\\&Q=c\,\eta\end{aligned}$

**Epistemic Status:**
`LEAN ✓` (Ch 17)

**Dirac Spinor & Abelian Gauge Connection**

**Geometric Intuition Term:**
**Chiral Weyl Zitterbewegung coupling & spanning-tree chord holonomy classification**

**Lean-Facing Object / Locked GID:**
[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)

**One-Line Invariant / Identity:**
$A(E) / \mathcal{G}_R \cong (U(1))^{|E \setminus T|} \times (U(1))^{|R| - 1}$

**Epistemic Status:**
`LEAN ✓` (Ch 18)

**Holographic Entanglement & MERA Networks**

**Geometric Intuition Term:**
**Discrete bridge-graph quantum max-flow min-cut theorem & polyhedral capacity cones**

**Lean-Facing Object / Locked GID:**
[`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)

**One-Line Invariant / Identity:**
For $\begin{aligned}&a,b,c,d\in\mathbb N,\\&0<a\le b,\ 0<c\le d,\\&a^2+b^2\le3ab,\\&c^2+d^2\le3cd:\\&\operatorname{QMaxFlow}(a,b,c,d)\\&=\min(3ac,\min(ad,bc))\end{aligned}$

**Epistemic Status:**
`LEAN ✓` / `Literature` (Ch 19)

**Circuit Complexity, CV & ER=EPR**

**Geometric Intuition Term:**
**Segmented integrable circuit min-depth $\lfloor N/(\kappa+1)\rfloor + 1$, CNOT parity lower bound & wormhole volume conjecture**

**Lean-Facing Object / Locked GID:**
[`result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)

**One-Line Invariant / Identity:**
For $\begin{aligned}&N,\kappa\in\mathbb N,\\&1\le\kappa,\ 2\kappa\le N:\\&\operatorname{minDepth}(N,\kappa)\\&=\lfloor N/(\kappa+1)\rfloor+1\end{aligned}$

**Epistemic Status:**
`LEAN ✓` / `OPEN` (Ch 20)

**Cantor Diagonal, Halting & Gödel Incompleteness**

**Geometric Intuition Term:**
**Complete semantic diagonal topological escape: nonempty separation deficit, discontinuity & strict topology refinement**

**Lean-Facing Object / Locked GID:**
[`complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement)

**One-Line Invariant / Identity:**
$\operatorname{separationDeficit} \neq \emptyset,\quad \tau_0 \subsetneq \tau_{\mathrm{diag}}$

**Epistemic Status:**
`LEAN ✓` (Ch 21)

**Riemann $\zeta(s)$, Euler Product & Critical Line**

**Geometric Intuition Term:**
**Infinite-dimensional prime orthogonal lattice $\bigoplus_p \mathbb{Z}\mathbf{e}_p$, Dirichlet-to-Euler product identity & symmetry axis $\sigma = 1/2$**

**Lean-Facing Object / Locked GID:**
[`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product)

**One-Line Invariant / Identity:**
$\sum_{n=1}^\infty n^{-s} = \prod_p (1 - p^{-s})^{-1}\quad (\operatorname{Re}(s) > 1)$

**Epistemic Status:**
`LEAN ✓` / `OPEN` (Ch 22)

**Hilbert's 10th over $\mathbb{Q}$ & Quaternion Norms**

**Geometric Intuition Term:**
**Eisenstein crossing quadratic norm forms $Q_t$, golden-integer Pell identity & quaternion norm multiplicativity**

**Lean-Facing Object / Locked GID:**
[`Qform_range_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm), [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)

**One-Line Invariant / Identity:**
$(2a+b)^2 - 5b^2 = 4(a^2 + ab - b^2)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` ($H_{10}(\mathbb{Q})$) (Ch 23)

**Fixed-Point Theorems & Self-Reference $\psi = \psi(\psi)$**

**Geometric Intuition Term:**
**Finite monotone contraction stabilization, golden ratio $\varphi$, Dottie root $\cos\theta^* = \theta^*$, and context bifurcation**

**Lean-Facing Object / Locked GID:**
[`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)

**One-Line Invariant / Identity:**
$\exists N \le |S_0|,\; \forall n \ge N,\; S_n = S_N$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` (Ch 24)

**3D Clifford Geometric Algebra $\mathcal{Cl}_{3,0}(\mathbb{R})$**

**Geometric Intuition Term:**
**8D blade engine `Cl3` driven by 3-bit mask XOR, inversion signs, and single-qubit Weyl star algebra**

**Lean-Facing Object / Locked GID:**
[`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star), [`B_formula_core`](lean:D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core)

**One-Line Invariant / Identity:**
$ZX = -XZ,\quad e_a e_b = (-1)^{\operatorname{inv}(a,b)} e_{a \oplus b}$

**Epistemic Status:**
`LEAN ✓` (Weyl star algebra and Bloch expansion) / `Literature`, reference computation (XOR blade engine, Forge and Sanctuary · Reducing Matrices to XOR, App B)

**ZYZ Euler Decomposition & Rotor Cascade**

**Geometric Intuition Term:**
**Three-factor single-qubit rotor $R_z(\alpha)R_y(\beta)R_z(\gamma)$ & two-axis finite rotation word synthesis**

**Lean-Facing Object / Locked GID:**
[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)

**One-Line Invariant / Identity:**
$R_z(\alpha)R_y(0)R_z(\gamma) = R_z(\alpha + \gamma)$

**Epistemic Status:**
`LEAN ✓` (two-axis finite rotation words) / `Literature`, reference computation (ZYZ identities and compilation, Ch 9, 16, Forge and Sanctuary · Single-Qubit Rotor Compilation, App B)

**Lüders State Update & Finite-Record Obstruction**

**Geometric Intuition Term:**
**Valid quantum state preservation under record conditioning & unread-state fixed-point criterion**

**Lean-Facing Object / Locked GID:**
[`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)

**One-Line Invariant / Identity:**
$\sum_i p_i \rho_i = \Phi(\rho),\quad p_i\ne0\implies\operatorname{Tr}(\rho_i) = 1$

**Epistemic Status:**
`LEAN ✓` (Ch 3, Forge and Sanctuary · Inside the Lean 4 Axiom Sanctuary (Part II))
