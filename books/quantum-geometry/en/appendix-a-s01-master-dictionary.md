# A.1 Master Translation Dictionary Across All Ten Parts, Coda, and Appendices D–E {#sec-appendix-a-master-table}

::: {.remark #rem-appendix-a-master-dictionary title="Master Dictionary of Conventional, Geometric, and Formal Terms (Including literature result, not formalized in this book)"}
**Literature result, not formalized in this book (for sub-clauses tagged `Literature`; for entries tagged `LEAN ✓` with clickable GID links, the linked declarations are kernel-verified in this book, `OPEN` marks unresolved open conjectures, and `MODEL` marks interpretive geometric models).**

**Measurement / Physical Quantity**<br/>(测量 / 物理量)

**Geometric Intuition Term (本书几何直觉语言):**
**Verb `liáng` (to measure) vs. Noun `liàng` (reading)**: pairwise ruler comparison operator vs. truncated scalar readout

**Lean-Facing Object / Locked GID:**
[`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)

**One-Line Invariant / Identity:**
$\rho \succeq 0,\ \operatorname{Tr}\rho = 1 \implies \operatorname{bornProbability}(\rho, I) = 1$, additive and nonnegative on projections

**Epistemic Status:**
`LEAN ✓` (Ch 1–2)

**Pure Quantum State $|\psi\rangle$**<br/>(量子纯态)

**Geometric Intuition Term (本书几何直觉语言):**
**Oriented unit ray on the sphere** uniquely addressed by pairwise cosine projections

**Lean-Facing Object / Locked GID:**
[`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian)

**One-Line Invariant / Identity:**
$\operatorname{Tr}M = 1,\ M^2 = M \implies x^2 + y^2 + z^2 = 1$ ($M$ a $2\times 2$ Hermitian matrix)

**Epistemic Status:**
`LEAN ✓` (Ch 1–3, 26)

**Observable & Projector $P$**<br/>(可观测量与投影算符)

**Geometric Intuition Term (本书几何直觉语言):**
**Geometric ruler & idempotent orthogonal projection axis** ($P^2 = P = P^\dagger$)

**Lean-Facing Object / Locked GID:**
[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)

**One-Line Invariant / Identity:**
$\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho),\quad P_\psi^2 = P_\psi$

**Epistemic Status:**
`LEAN ✓` (Ch 1, 3, 27)

**Born Probability Rule $P = |\langle\phi|\psi\rangle|^2$**<br/>(玻恩概率法则)

**Geometric Intuition Term (本书几何直觉语言):**
**Squared inner-product projection & rank-one trace pairing** (Pythagorean area share along the ruler axis)

**Lean-Facing Object / Locked GID:**
[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)

**One-Line Invariant / Identity:**
$\rho = \lvert\psi\rangle\langle\psi\rvert,\ P_k = \lvert\phi\rangle\langle\phi\rvert \implies \operatorname{recordWeight}_k = \operatorname{Tr}(\rho P_k) = \lvert\langle\phi\mid\psi\rangle\rvert^2$

**Epistemic Status:**
`LEAN ✓` (Ch 2, 28)

**Orthogonal Decomposition**<br/>(正交态分解与完备性)

**Geometric Intuition Term (本书几何直觉语言):**
**Inner-product parallelogram & Pythagorean theorem**: 1D orthogonal segments cannot add, 2D squared areas conserve norm

**Lean-Facing Object / Locked GID:**
[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)

**One-Line Invariant / Identity:**
$\|u + v\|^2 + \|u - v\|^2 = 2(\|u\|^2 + \|v\|^2)$

**Epistemic Status:**
`LEAN ✓` (parallelogram identity only) (Ch 1, 27, Coda)

**Global Phase $e^{i\alpha}|\psi\rangle$**<br/>(全局相位与射线等价)

**Geometric Intuition Term (本书几何直觉语言):**
**Gauge spin around the state's own axis** (unitary phase rigidity under connected ray tests)

**Lean-Facing Object / Locked GID:**
[`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)

**One-Line Invariant / Identity:**
$A$ unitary, preserving coordinate rays and a connected ray family $\implies A = c\,I,\ |c| = 1$

**Epistemic Status:**
`LEAN ✓` (Ch 1, 27)

**Density Matrix $\rho$ & Mixed State**<br/>(密度矩阵与混合态)

**Geometric Intuition Term (本书几何直觉语言):**
**Interior barycenter vector $\mathbf{r} \in B^3$ of the Bloch ball** (purity deficit measures discarded phase area)

**Lean-Facing Object / Locked GID:**
[`norm_bloch_le_trace_of_posSemidef`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef)

**One-Line Invariant / Identity:**
$\|\mathbf{r}\| \le \operatorname{Tr}(\rho),\quad \operatorname{Tr}(\rho(\mathbf{r})) = 1$

**Epistemic Status:**
`LEAN ✓` (Ch 3, 26)

**Decoherence & Quantum Channel $\Phi(\rho)$**<br/>(退相干与量子信道)

**Geometric Intuition Term (本书几何直觉语言):**
**Orthogonal pinching projection onto the measurement axis**: transverse circular coherence collapses onto the longitudinal diameter

**Lean-Facing Object / Locked GID:**
[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)

**One-Line Invariant / Identity:**
$\|\rho\|_{\mathrm{HS}}^2 = \|\mathcal{P}(\rho)\|_{\mathrm{HS}}^2 + \|\rho - \mathcal{P}(\rho)\|_{\mathrm{HS}}^2$

**Epistemic Status:**
`LEAN ✓` (Ch 4, 6)

**No-Cloning Theorem**<br/>(量子不可克隆原理)

**Geometric Intuition Term (本书几何直觉语言):**
**Unitary inner-product rigidity**: an inner-product-preserving map cannot duplicate neither-orthogonal-nor-collinear rays

**Lean-Facing Object / Locked GID:**
[`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)

**One-Line Invariant / Identity:**
$s = s^2 \implies s = 0 \lor s = 1$

**Epistemic Status:**
`LEAN ✓` (Ch 14)

**Operator Commutator $[A, B] = AB - BA$**<br/>(算符对易子)

**Geometric Intuition Term (本书几何直觉语言):**
**Clifford exterior bivector area $2(\mathbf{a}\wedge\mathbf{b})$** measuring the oriented rotation plane spanned by order reversal

**Lean-Facing Object / Locked GID:**
[`crossProduct_is_skewAdjoint_of_balanced_sum`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum) (mixed product of a balanced sum; see row B.5 of Appendix B)

**One-Line Invariant / Identity:**
$\begin{aligned}&\mathbf{u}\wedge\mathbf{v}=-\mathbf{v}\wedge\mathbf{u},\\&A=A^\dagger,\ B=B^\dagger\\&\implies (AB-BA)^\dagger\\&\hspace{1em}=-(AB-BA)\end{aligned}$

**Epistemic Status:**
`LEAN ✓` (balanced mixed product) / `Literature` (commutator identity, Ch 5–6)

**Imaginary Unit $i$ & Pauli Matrices $\sigma_x, \sigma_y, \sigma_z$**<br/>(虚数单位与泡利矩阵)

**Geometric Intuition Term (本书几何直觉语言):**
**3D orthonormal basis vectors $e_1, e_2, e_3$ & skew-adjoint unitary complex structure $\hat{\mathbf{I}}^2 = -1$**

**Lean-Facing Object / Locked GID:**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)

**One-Line Invariant / Identity:**
$\hat{\mathbf{I}}^2 = -1,\quad ZX = -XZ$

**Epistemic Status:**
`LEAN ✓` (Ch 5, 25)

**Single-Qubit Unitary Gate $U \in \mathrm{SU}(2)$**<br/>(单比特幺正门)

**Geometric Intuition Term (本书几何直觉语言):**
**Bivector exponential rotor $R = \cos(\theta/2) - \hat{B}\sin(\theta/2)$** in a calibrated unitary evolution group

**Lean-Facing Object / Locked GID:**
[`calibrated_group`](lean:D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group)

**One-Line Invariant / Identity:**
$U(0) = 1,\ U(s+t) = U(s)U(t),\ U^*U = 1,\ U$ differentiable at $0 \implies U(t) = \exp(-itH/\hbar)$ with $H$ self-adjoint ($v \mapsto R v \widetilde{R}$ is not part of this declaration)

**Epistemic Status:**
`LEAN ✓` (Ch 7, 27)

**Two-Qubit Entanglement & Concurrence**<br/>(双比特纠缠与并发度)

**Geometric Intuition Term (本书几何直觉语言):**
**Exterior wedge area in $\mathbb{C}^4$ & maximally mixed marginal blind spot of Bell states**

**Lean-Facing Object / Locked GID:**
[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)

**One-Line Invariant / Identity:**
Bell state: $\rho_A = \frac{1}{2}I_2,\ \rho_A^2 \neq \rho_A$; the concurrence criterion $\psi_{00}\psi_{11} - \psi_{01}\psi_{10} \neq 0$ for general pure states is a `Literature` result

**Epistemic Status:**
`LEAN ✓` (Bell-state marginal) / `Literature` (concurrence criterion) (Ch 8, 13)

**Quantum State Tomography**<br/>(量子态层析)

**Geometric Intuition Term (本书几何直觉语言):**
**Three-axis orthogonal addressing & rational six-axis open cover**

**Lean-Facing Object / Locked GID:**
[`rational_six_axis_open_cover`](lean:D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover)

**One-Line Invariant / Identity:**
six open sets $C_1, \dots, C_6$ cover $S^2$, and no $C_i$ contains an orthogonal pair

**Epistemic Status:**
`LEAN ✓` (rational six-axis open cover) (Ch 9)

**Order Dependence vs. Pancharatnam–Berry Phase**<br/>(顺序依赖与贝里相位)

**Geometric Intuition Term (本书几何直觉语言):**
**"Pairwise comparison is always consistent and order-independent"**: unit-vector overlap equals $1$ iff vectors coincide (`LEAN ✓`; general ray equality up to phase $e^{i\theta}$) vs. spherical solid angle $\Omega/2$ (`Literature`)

**Lean-Facing Object / Locked GID:**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)

**One-Line Invariant / Identity:**
$\|u\|=\|v\|=1 \implies (\langle u,v\rangle = 1 \iff u = v);\; \gamma_{\mathrm{Berry}} = -\Omega/2$

**Epistemic Status:**
`LEAN ✓` / `Literature` (Ch 10)

**Microwave Rabi Pulse & Virtual-$Z$ Gate**<br/>(微波脉冲与虚拟 $Z$ 门)

**Geometric Intuition Term (本书几何直觉语言):**
**Ordered three-pulse real trace bound & observer pullback trace identity in the rotating frame**

**Lean-Facing Object / Locked GID:**
[`ordered_three_pulse_real_trace_bound`](lean:D5/S3/Quantum/Dynamics/OrderedThreePulseTrace.ordered_three_pulse_real_trace_bound)

**One-Line Invariant / Identity:**
$\begin{aligned}&R_z(\phi)R_{\text{xy}}(\theta,0)\\&\quad\cdot R_z(-\phi)\\&=R_{\text{xy}}(\theta,\phi)\end{aligned}$

**Epistemic Status:**
`LEAN ✓` (three-pulse trace bound) / `Literature` (virtual-$Z$ identity, Ch 11)

**Spinor $4\pi$ Periodicity & Gimbal Lock**<br/>(旋量 $4\pi$ 周期与万向节死锁)

**Geometric Intuition Term (本书几何直觉语言):**
**$S^3 \to \mathrm{SO}(3)$ double cover & Hairy Ball $\chi(S^2) = 2$**: 2-sphere vortices require lifting to parallelizable $S^3$ ($\chi(S^3)=0$)

**Lean-Facing Object / Locked GID:**
[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)

**One-Line Invariant / Identity:**
$R(2\pi) = -1 \in S^3,\quad R(4\pi) = +1$ (what is formalized is the squaring cover $z \mapsto z^2$ of the circle)

**Epistemic Status:**
`LEAN ✓` (circle double cover) / `Literature` ($S^3 \to \mathrm{SO}(3)$ double cover, Hairy Ball theorem and gimbal lock) (Ch 5, 10)

**Bell–CHSH Inequality & Tsirelson Bound**<br/>(贝尔不等式与齐雷尔森界)

**Geometric Intuition Term (本书几何直觉语言):**
**Classical $\ell_1$ octahedron polytope ($\le 2$) vs. quantum $\ell_2$ Pythagorean sphere ($2\sqrt{2}$)**

**Lean-Facing Object / Locked GID:**
[`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest)<br/>[`bell_value_le`](lean:D5/S3/QuantumBounds/PeritoTsirelson.bell_value_le)

**One-Line Invariant / Identity:**
$\begin{aligned}\mathcal S_{\text{classical}}&\le2,\\\mathcal S_{\text{quantum}}&\le2\sqrt2\end{aligned}$ (the quantum upper bound is attained)

**Epistemic Status:**
`LEAN ✓` (Ch 13)

**Stabilizer Codes & Clifford Braiding**<br/>(稳定子码与克利福德编织)

**Geometric Intuition Term (本书几何直觉语言):**
**Pauli word multiplication over $\mathbb{F}_2^{2n}$ & Yang–Baxter self-distributive rack braiding**

**Lean-Facing Object / Locked GID:**
[`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul), [`crossing_yang_baxter`](lean:D5/S0/Certificates/Quandles/BraidColoringTransport.crossing_yang_baxter)

**One-Line Invariant / Identity:**
$P_1 P_2 = P_2 P_1 \iff x_1 z_2 \oplus z_1 x_2 = 0$

**Epistemic Status:**
`LEAN ✓` (Ch 14, 26)

**Grover / QFT / QSVT / Szegedy Walk**<br/>(量子搜索、傅里叶与奇异值变换)

**Geometric Intuition Term (本书几何直觉语言):**
**Uniform operator rotation in a 2D plane, finite Poisson summation & Chebyshev spectral polynomials**

**Lean-Facing Object / Locked GID:**
[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation), [`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation)

**One-Line Invariant / Identity:**
$R_{\psi}\,R_{\perp} = \operatorname{Rot}(2\theta),\quad T_n(\cos\theta) = \cos(n\theta)$

**Epistemic Status:**
`LEAN ✓` (uniform operator rotation in a 2D subspace, finite Poisson summation) / `Literature` (Chebyshev identity, QSVT and Szegedy walks) (Ch 15–16)

**Solovay–Kitaev Compilation Theorem**<br/>(Solovay–Kitaev 门编译)

**Geometric Intuition Term (本书几何直觉语言):**
**Two-axis finite rotation words, norm-one trace recurrence & group-commutator helix $ABA^{-1}B^{-1}$**

**Lean-Facing Object / Locked GID:**
[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`trace_recurrence`](lean:D5/S1/Recurrence/NormOneTraceAddition.trace_recurrence)

**One-Line Invariant / Identity:**
$\operatorname{Tr}(U^{n+1}) = \operatorname{Tr}(U)\operatorname{Tr}(U^n) - \operatorname{Tr}(U^{n-1})$

**Epistemic Status:**
`LEAN ✓` / `Literature` (Ch 16)

**Lorentz Boost & Bogoliubov Transform**<br/>(洛伦兹助推与博戈留波夫变换)

**Geometric Intuition Term (本书几何直觉语言):**
**Minkowski hyperbolic rotor ($\cosh\eta - \gamma_0\gamma_1\sinh\eta$) & null lightcone rigidity**

**Lean-Facing Object / Locked GID:**
[`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)

**One-Line Invariant / Identity:**
$\cosh^2\eta-\sinh^2\eta=1$； for a real quadratic form $Q$ on $\mathbb{R}\times\mathbb{R}^d$: $\begin{aligned}&(\forall v,\\&\eta(v,v)=0\\&\implies Q(v)=0)\\&\implies\exists c\in\mathbb{R},\\&Q=c\,\eta\end{aligned}$

**Epistemic Status:**
`LEAN ✓` (Ch 17)

**Dirac Spinor & Abelian Gauge Connection**<br/>(狄拉克旋量与规范联络)

**Geometric Intuition Term (本书几何直觉语言):**
**Chiral Weyl Zitterbewegung coupling & spanning-tree chord holonomy classification**

**Lean-Facing Object / Locked GID:**
[`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)

**One-Line Invariant / Identity:**
$A(E) / \mathcal{G}_R \cong (U(1))^{|E \setminus T|} \times (U(1))^{|R| - 1}$

**Epistemic Status:**
`LEAN ✓` (Ch 18)

**Holographic Entanglement & MERA Networks**<br/>(全息纠缠熵与张量网络)

**Geometric Intuition Term (本书几何直觉语言):**
**Discrete bridge-graph quantum max-flow min-cut theorem & polyhedral capacity cones**

**Lean-Facing Object / Locked GID:**
[`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)

**One-Line Invariant / Identity:**
For $\begin{aligned}&a,b,c,d\in\mathbb N,\\&0<a\le b,\ 0<c\le d,\\&a^2+b^2\le3ab,\\&c^2+d^2\le3cd:\\&\operatorname{QMaxFlow}(a,b,c,d)\\&=\min(3ac,\min(ad,bc))\end{aligned}$

**Epistemic Status:**
`LEAN ✓` / `Literature` (Ch 19)

**Circuit Complexity, CV & ER=EPR**<br/>(电路复杂度、复杂度=体积与 ER=EPR)

**Geometric Intuition Term (本书几何直觉语言):**
**Segmented integrable circuit min-depth $\lfloor N/(\kappa+1)\rfloor + 1$, CNOT parity lower bound & wormhole volume conjecture**

**Lean-Facing Object / Locked GID:**
[`result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)

**One-Line Invariant / Identity:**
For $\begin{aligned}&N,\kappa\in\mathbb N,\\&1\le\kappa,\ 2\kappa\le N:\\&\operatorname{minDepth}(N,\kappa)\\&=\lfloor N/(\kappa+1)\rfloor+1\end{aligned}$

**Epistemic Status:**
`LEAN ✓` / `OPEN` (Ch 20)

**Cantor Diagonal, Halting & Gödel Incompleteness**<br/>(康托尔对角线、停机与不完备性)

**Geometric Intuition Term (本书几何直觉语言):**
**Complete semantic diagonal topological escape: nonempty separation deficit, discontinuity & strict topology refinement**

**Lean-Facing Object / Locked GID:**
[`complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement)

**One-Line Invariant / Identity:**
$\operatorname{separationDeficit} \neq \emptyset,\quad \tau_0 \subsetneq \tau_{\mathrm{diag}}$

**Epistemic Status:**
`LEAN ✓` (Ch 21)

**Riemann $\zeta(s)$, Euler Product & Critical Line**<br/>(黎曼 $\zeta$、欧拉乘积与临界线)

**Geometric Intuition Term (本书几何直觉语言):**
**Infinite-dimensional prime orthogonal lattice $\bigoplus_p \mathbb{Z}\mathbf{e}_p$, Dirichlet-to-Euler product identity & symmetry axis $\sigma = 1/2$**

**Lean-Facing Object / Locked GID:**
[`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product)

**One-Line Invariant / Identity:**
$\sum_{n=1}^\infty n^{-s} = \prod_p (1 - p^{-s})^{-1}\quad (\operatorname{Re}(s) > 1)$

**Epistemic Status:**
`LEAN ✓` / `OPEN` (Ch 22)

**Hilbert's 10th over $\mathbb{Q}$ & Quaternion Norms**<br/>(有理数希尔伯特第十问题与四元数范数)

**Geometric Intuition Term (本书几何直觉语言):**
**Eisenstein crossing quadratic norm forms $Q_t$, golden-integer Pell identity & quaternion norm multiplicativity**

**Lean-Facing Object / Locked GID:**
[`Qform_range_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm), [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)

**One-Line Invariant / Identity:**
$(2a+b)^2 - 5b^2 = 4(a^2 + ab - b^2)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` ($H_{10}(\mathbb{Q})$) (Ch 23)

**Fixed-Point Theorems & Self-Reference $\psi = \psi(\psi)$**<br/>(不动点定理与自指映射)

**Geometric Intuition Term (本书几何直觉语言):**
**Finite monotone contraction stabilization, golden ratio $\varphi$, Dottie root $\cos\theta^* = \theta^*$, and context bifurcation**

**Lean-Facing Object / Locked GID:**
[`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)

**One-Line Invariant / Identity:**
$\exists N \le |S_0|,\; \forall n \ge N,\; S_n = S_N$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` (Ch 24)

**3D Clifford Geometric Algebra $\mathcal{Cl}_{3,0}(\mathbb{R})$**<br/>(三维克利福德几何代数)

**Geometric Intuition Term (本书几何直觉语言):**
**8D blade engine `Cl3` driven by 3-bit mask XOR, inversion signs, and single-qubit Weyl star algebra**

**Lean-Facing Object / Locked GID:**
[`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star), [`B_formula_core`](lean:D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core)

**One-Line Invariant / Identity:**
$ZX = -XZ,\quad e_a e_b = (-1)^{\operatorname{inv}(a,b)} e_{a \oplus b}$

**Epistemic Status:**
`LEAN ✓` (Weyl star algebra and Bloch expansion) / `Literature`, reference computation (XOR blade engine, Ch 25, App B)

**ZYZ Euler Decomposition & Rotor Cascade**<br/>(ZYZ 欧拉分解与旋量级联)

**Geometric Intuition Term (本书几何直觉语言):**
**Three-factor single-qubit rotor $R_z(\alpha)R_y(\beta)R_z(\gamma)$ & two-axis finite rotation word synthesis**

**Lean-Facing Object / Locked GID:**
[`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)

**One-Line Invariant / Identity:**
$R_z(\alpha)R_y(0)R_z(\gamma) = R_z(\alpha + \gamma)$

**Epistemic Status:**
`LEAN ✓` (two-axis finite rotation words) / `Literature`, reference computation (ZYZ identities and compilation, Ch 9, 16, 27, App B)

**Lüders State Update & Finite-Record Obstruction**<br/>(吕德斯态更新与有限记录阻碍)

**Geometric Intuition Term (本书几何直觉语言):**
**Valid quantum state preservation under record conditioning & unread-state fixed-point criterion**

**Lean-Facing Object / Locked GID:**
[`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)

**One-Line Invariant / Identity:**
$\sum_i p_i \rho_i = \Phi(\rho),\quad p_i\ne0\implies\operatorname{Tr}(\rho_i) = 1$

**Epistemic Status:**
`LEAN ✓` (Ch 3, 28)

**Pythagorean "All Is Number" & 4-Tier Escape**<br/>(毕达哥拉斯“万物皆数”与四级数系突围)

**Geometric Intuition Term (本书几何直觉语言):**
**Verb `shǔ` (counting/squaring operator) vs. Noun `shù` (coordinate mark)**: four-tier sphere escape $\mathbb{Q} \to \overline{\mathbb{Q}} \to \pi \to \theta^*$

**Lean-Facing Object / Locked GID:**
[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)

**One-Line Invariant / Identity:**
$\mathbf{c}^2 = \mathbf{a}^2 + \mathbf{b}^2,\quad m^2 - 2n^2 = \pm 1,\quad \cos\theta^* = \theta^*$ (representative equations of the tiers, not conclusions of the listed declarations)

**Epistemic Status:**
`LEAN ✓` / `Literature` (Ch 29, Coda)

**Prime Splitting mod 4, Congruent Elliptic Curve & Sato–Tate**<br/>(素数模 4 分裂、同余数椭圆曲线与佐藤—泰特分布)

**Geometric Intuition Term (本书几何直觉语言):**
**$\pm 1$ Pell seam splits "Plane Primes" ($p \equiv 1 \bmod 4$) from "Line Primes" ($p \equiv 3 \bmod 4$); CM curve $dy^2 = x(x^2-1)$ ($\chi=0$) obeys Gauss's bimodal law, while non-CM curves at Hasse scale $\sqrt{p}$ follow the $S^3 \cong \mathrm{SU}(2)$ Sato–Tate cosine law**

**Lean-Facing Object / Locked GID:**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)

**One-Line Invariant / Identity:**
$\cos\theta_p = \frac{a_p}{2\sqrt{p}} \in [-1, +1],\quad d\mu_{\mathrm{ST},\text{non-CM}} = \frac{2}{\pi}\sin^2\theta\,d\theta$

**Epistemic Status:**
`Literature` (Ch 29; the two listed declarations vouch only for their algebraic statements and do not concern prime splitting or Sato–Tate)

**Wheeler–DeWitt Timeless State, Page–Wootters Slicing & Geometric Causality**<br/>(惠勒—德维特无时间态、佩奇—伍特斯切片与几何因果律)

**Geometric Intuition Term (本书几何直觉语言):**
**Order-independence abolishes sequential time: $(2k)!$ de-ordering model (`MODEL`), conditional slicing under ideal clock assumptions (`Literature`), Gram rigidity $\det G \ge 0$ (`Literature`), and stationary phase $\delta S=0$ (bivector model $+\mathbf{\Omega}-\mathbf{\Omega}=0$)**

**Lean-Facing Object / Locked GID:**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState)

**One-Line Invariant / Identity:**
$\det G(\mathbf{A},\mathbf{B},\mathbf{C}) \ge 0,\quad H\mathbf{\Psi} = 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 29)

**Finite Observer, Gram Elliptope (Causally Compatible Space) & PSD Matrix Completion**<br/>(有限观察者、格拉姆椭圆体与时间场选点)

**Geometric Intuition Term (本书几何直觉语言):**
**Because the observer is finite, choice operates inside the causally compatible Gram elliptope ($\det G > 0$, dihedral angle $\phi$), continuously picking points in the time field ($G_{M+1} \succeq 0$) with $\theta^* \approx 0.739$ (`MODEL`) as the 1D self-referential balance prototype**

**Lean-Facing Object / Locked GID:**
[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)

**One-Line Invariant / Identity:**
$c_{AC} = \cos\theta_1\cos\theta_2 + \cos\phi\,\sin\theta_1\sin\theta_2,\quad \det G \ge 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 29)

**Global Static Time Field $P = NP$ vs. Finite Observer $P \neq NP$**<br/>(全局静态时间场 $P = NP$ vs. 有限观察者 $P \neq NP$)

**Geometric Intuition Term (本书几何直觉语言):**
**Extra postselection & CTC fixed-point resources yield collapse ($\mathrm{PostBQP}=\mathrm{PP}\supseteq\mathrm{NP}$, $\mathrm{P}_{\mathrm{CTC}}=\mathrm{PSPACE}\supseteq\mathrm{NP}$); a finite observer faces the black-box $\theta_0 \approx \frac{\pi}{2} - 2^{-n/2}$ orthogonal horizon ($L=\Theta(2^{n/2})$) and bounded-degree SoS local $G_M \succeq 0$ blind spot (standard $\mathrm{P}\neq\mathrm{NP}$ remains `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation), [`result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)

**One-Line Invariant / Identity:**
$\cos\theta_0 = 2^{-n/2},\quad L = \Theta(2^{n/2}),\quad G_M \succeq 0\;(M = o(n))$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 15, 20, 30)

**"$P$ Is a Field, $NP$ Is a Line": Witness Thread, Guiding Field & Hairy-Ball Curl**<br/>(“$P$ 是场，$NP$ 是线”：见证丝、导向场与毛球旋度)

**Geometric Intuition Term (本书几何直觉语言):**
**Geometric model (`MODEL`): an $NP$ witness is a zero-cross-section 1D thread (standard $NP$ requires polynomial-length witnesses and a polynomial-time verifier; segment counts alone give no verification cost bound); paradigmatic $P$ algorithms construct a guiding field (Karmarkar interior barrier field, Kasteleyn planar skew-symmetric bivector field $A_K^T = -A_K,\; [\operatorname{Pf}(A_K)]^2=\det A_K,\; Z = \sum_M \prod_{e \in M} w_e = |\operatorname{Pf}(A_K)|$), while 3-body curl $\nabla\wedge\mathbf{F}\neq 0$ models exponential search vortices**

**Lean-Facing Object / Locked GID:**
[`complete_diagonal_topological_settlement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement), [`result`](lean:D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result)

**One-Line Invariant / Identity:**
$A_K^T = -A_K,\quad [\operatorname{Pf}(A_K)]^2 = \det A_K,\quad Z = |\operatorname{Pf}(A_K)|$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 20, 21, 30)

**Navier–Stokes Equations, Lamb Bivector Curl & $P$ vs. $NP$ Field Analogy**<br/>(纳维—斯托克斯方程、兰姆双向量旋度与 $P$ vs. $NP$ 场化类比)

**Geometric Intuition Term (本书几何直觉语言):**
**Structural analogy (`MODEL`): Lamb's decomposition and vortex-tube imagery supply no complexity isomorphism. The external forced NS C / D resolution is external literature with a published formalization, outside this book's frozen ledger ([@rem-ch30-navier-stokes-forced-literature]); unforced A / B remain `OPEN`. Unconditional 2D global regularity is a literature result, whereas `all_grade_regularity_of_mild_path` assumes a mild path already given. Five-mode nonclosure does not imply blow-up; see the dissipative comparison [@ex-ch30-dissipative-no-closure].**

**Lean-Facing Object / Locked GID:**
[`quadratic_closure_iff`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff), [`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure), [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path)

**One-Line Invariant / Identity:**
$(\mathbf{u}\cdot\nabla)\mathbf{u} = \frac{1}{2}\nabla(\|\mathbf{u}\|^2) + \mathbf{u}\cdot(\nabla\wedge\mathbf{u}),\quad \Gamma \approx A\|\boldsymbol{\omega}\|$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 30)

**Exponential Time Hypothesis (ETH), Tensor-Network Rank Collapse & Cosmic Horizon Galactic Algorithm**<br/>(指数时间假设 ETH、张量网络秩约分与宇宙视界银河算法)

**Geometric Intuition Term (本书几何直觉语言):**
**See [@rem-ch30-eth-subexponential-literature] for ETH and the 2026 external counting papers, with paper and formalization bounds distinguished. Galactic curves illustrate chosen constants and provide no algorithmic lower bound. Bridge-graph, finite-rank, and semantic-diagonal theorems certify neither external algorithms, examination outcomes, nor standard $P\neq NP$.**

**Lean-Facing Object / Locked GID:**
[`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result), [`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound), [`relative_semantic_diagonal_target_inadequate_of_surjective`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_target_inadequate_of_surjective)

**One-Line Invariant / Identity:**
$s_k = \inf\{\delta\ge0 \mid k\text{-SAT}\in 2^{\delta n}(n+m)^{O(1)}\},\quad r_{\mathrm{new}}(n) \sim \frac{\log_2\log_2 n}{\sqrt{\log_2 n}}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 19, 21, 30)

**Orthogonal Triad of Entanglement, $P=NP$ & Entropy**（量子纠缠、$P=NP$ 与熵的正交三位一体）

**Geometric Intuition Term (本书几何直觉语言):**
**Maximally mixed Bell marginals, orthogonal local-vs-correlation blind-spot decomposition, von Neumann entropy-production coherence-deletion identity, and unique positive cosine fixed point (`LEAN ✓`), coupled with exact two-qubit pure-state Pythagorean conservation $\|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) = \cos^2\theta + \sin^2\theta \equiv 1$ ($S_L(\rho_A) \equiv \tau$, $S_{\mathrm{vN}}(\rho_A) = H_{\mathrm{bin}}\bigl(\frac{1+\cos\theta}{2}\bigr)$, giving $S_{\mathrm{vN}} \approx 0.559\text{ bits}$ at $\theta^* \approx 42.35^\circ$ ($\theta$ the Bloch polar angle)), Hastings's (2007) 1D gapped area law vs. Page's (1993) volume law, CKW monogamy & the Harlow–Hayden (2013) / Susskind (2016) radiation-decoding circuit-complexity barrier, and postselected $\mathrm{PostBQP}=\mathrm{PP}$ alongside shared-entanglement verification $\mathrm{MIP}^*=\mathrm{RE}$ (Ji et al. 2020, `Literature`; standard Turing-machine $\mathrm{P}\neq\mathrm{NP}$ remains `OPEN`), grounding the partial-trace horizon triad model and 3D lab `entanglement-entropy-complexity` (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**One-Line Invariant / Identity:**
$\|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) = \cos^2\theta + \sin^2\theta = 1,\quad S_L(\rho_A) = \sin^2\theta,\quad \chi_{\mathrm{bond}} \ge 2^{S_{\mathrm{cut}}}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` (Ch 8, 13, 24, [Ch 30](ch30-s05-entanglement-and-entropy.md#sec-ch30-entanglement-entropy-complexity-triad))

**Spatial Attractors, `trureturing` Cut-and-Project Observer, Cassini $(-1)^{k+1}$ Seam & Déjà Vu**<br/>(空间吸引子、`trureturing` 黄金切投观察者、卡西尼接缝与似曾相识)

**Geometric Intuition Term (本书几何直觉语言):**
**Golden cut-and-project model set & coding theorems (`LEAN ✓`: Minkowski lattice embedding, `goldenModelSet` cut-and-project inclusion, Zeckendorf `NoAdjacentOnes` & nonnegative real `NNReal` thread injectivity, conjugate norm separation & full-window Delone set, Cassini's identity $F_n F_{n+2}-F_{n+1}^2=(-1)^{n+1}$, and closed-subgroup bounded-gap torus returns) combined with the rhombic triacontahedron window $W\subset E_\perp^3$ ($30$ faces, $32$ vertices, $6$ five-fold axes), Conway's Empire Effect, and the Lorenz attractor $D_{\mathrm{KY}}\approx 2.06$ (`Literature`), inspiring the philosophical model (`MODEL`) of the soul as the internal window phase $u\in E_\perp$, forgetting as high-level Zeckendorf truncation, historical ruins as large-margin $d_{\partial}$ interior nodes, and Déjà vu as cross-round inner-product resonance $\cos\delta\theta\to 1$ as $\delta\theta\to 0$**

**Lean-Facing Object / Locked GID:**
[`minkowski_model_set_spec`](lean:D5/S1/Scale/MinkowskiModelSet.minkowski_model_set_spec), [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project), [`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm), [`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)

**One-Line Invariant / Identity:**
$F_n F_{n+2} - F_{n+1}^2 = (-1)^{n+1},\quad \delta\theta\to 0 \implies \cos\delta\theta \to 1$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 24, 29, Coda)

**Quantum Fairness, Entanglement Monogamy & Ergodic Statistical Holism**<br/>(量子公平性、纠缠单配性与遍历统计全息)

**Geometric Intuition Term (本书几何直觉语言):**
**Rank-one Born pairing reciprocity, complementary-context purity Pythagoras, no-cloning inner-product lock, Bell mixed marginals, Landauer's balance bound, and compact closed-subgroup torus Haar equidistribution and bounded-gap returns (`LEAN ✓`), paired with spherical Haar isotropy and the CKW entanglement monogamy inequality $\tau_{A|B}+\tau_{A|C}\le\tau_{A|BC}$ (`Literature`), grounding the fivefold privilege-abolition and ergodic statistical-holism model (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), [`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion), [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)

**One-Line Invariant / Identity:**
$\tau_{A|B} + \tau_{A|C} \le \tau_{A|BC},\quad f\in C(G,\mathbb{C}):\quad\lim_{N\to\infty}\frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1}) = \int_G f\,d\mu$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 31)

**Pairwise Fair Squaring, Diagonal Phase Folding, Uncertainty & Time as Orthogonal Dimension Expansion**（两两公平平方、对角相位折叠、测不准与正交维度扩张时间）

**Geometric Intuition Term (本书几何直觉语言):**
**Golden-helix integer Fourier character deck blindness and joint level detection, two-step orientation restoration with distinct complete cover states, circle double-cover history lifts, double-orthogonal topological closure, and vectorwise strong projection limits vs. the unit operator-norm obstruction $\lVert\operatorname{id}-P_{S_i}\rVert=1$ for proper truncations, forward parallelogram norm law and rank-one Born modulus-square reduction, common-phase polynomial charge balance with minimum degree $\ge 2$ and unique Hermitian degree-2 representation, diagonal qubit observable blindness to relative phase between $\lvert +\rangle\langle +\rvert$ and $\lvert -\rangle\langle -\rvert$ resolved by Pauli $X$, the exact four-clause Robertson–Schrödinger identity $(\Delta A)^2(\Delta B)^2 = C^2 + \lVert K\rVert^2 + G$, unit orthogonal escape outside any non-exhausted closed subspace, sharp strict-growth bounds and permanent post-stabilization locking of finite-dimensional observable Krylov chains, and unit-congruence outside-prime-divisor escape for finite prime sets (`LEAN ✓`), paired with the Jordan–von Neumann parallelogram converse, Gleason's closed-subspace theorem ($d \ge 3$), common-domain qualifications for unbounded canonical $[x,p]=i\hbar I$, Balan–Casazza–Edidin phaseless frame reconstruction, Euclid's *Elements* IX.20, and Lanczos–Arnoldi Krylov termination (`Literature`), alongside Euclidean helix projection, Clifford reversal, the $w_p(\theta)$ counterexample, the $X, Y$ check on $\lvert 0\rangle$, and $30031 = 59 \cdot 509$ (`manual derivation`), articulating static–dynamic non-duality across $\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots$, apparent closure and fixed-box limits as truncation shadows, fairness-driven squaring and phase folding rebounding as uncertainty, and time as monotonic orthogonal rank expansion $D \to D + 1$ in $\ell^2(\mathbb{P})$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`golden_helix_fourier_readout_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_fourier_readout_step), [`golden_helix_step_changes_level`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_step_changes_level), [`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step), [`golden_helix_two_step_orientation_complete_state_distinct`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenHelixParityReadout.golden_helix_two_step_orientation_complete_state_distinct), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure), [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit), [`uniform_completion_obstruction`](lean:D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction), [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape)

**One-Line Invariant / Identity:**
$\lVert\operatorname{id}_H - P_{S_i}\rVert = 1,\quad (\Delta A)^2(\Delta B)^2 = C^2 + \lVert K\rVert^2 + G,\quad N_S = \prod_{p \in S} p + 1 \equiv 1 \pmod p$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `MODEL` ([Ch 31 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion))

**Orthogonal Self-Referential Unified Field, Icosian–$E_8$ Golden Bridge & Eight-Program Meta-Unification**<br/>(正交自指统一场、艾柯西安 $E_8$ 黄金桥与八大纲领元统一)

**Geometric Intuition Term (本书几何直觉语言):**
**Complex-structure squaring $R^2=-I$, finite monotone contraction, golden fixed point $\varphi$, binary Zeckendorf `NoAdjacentOnes` prohibition, Minkowski null-cone rigidity, spanning-tree loop holonomy classification, and bridge-graph min-cut (`LEAN ✓`), paired with Jacobson's horizon equation of state, Conway–Sloane's golden-field Icosian ring $\mathcal{I}\subset\mathbb{H}$ equipped with the rescaled Galois quadratic form $Q(q)=2(a+b)$ isometric to the $E_8$ root lattice, and eight foundational unification programs (`Literature`), forming the six-domain unified-field dictionary and 3D cognitive meta-unification compass (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)

**One-Line Invariant / Identity:**
$R^2 = -I,\quad (\mathcal{I}, Q)\cong E_8\;\bigl(Q(q)=\operatorname{tr}_{\mathbb{Q}(\sqrt{5})/\mathbb{Q}}\bigl(\tfrac{2\varphi}{\sqrt{5}}\operatorname{Nrd}(q)\bigr)=2(a+b)\bigr),\quad \psi = \psi(\psi)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 32)

**Universal Observers, Self-Sustaining Basins & Mutual-Attractor Double Helices**<br/>(万物皆为观察者、自维持势阱与互吸引子双螺旋)

**Geometric Intuition Term (本书几何直觉语言):**
**Observer record-pinching idempotence and finite-memory history capacity $N \le d$, finite monotone contraction, contextual fixed-point selection and invariant common factor, and width-three bridge-graph min-cut reconnection (`LEAN ✓`), paired with Leibnizian monadology & Whiteheadian process philosophy, holographic minimal-surface mutual-information reconnection, and solitary cosine oscillation vs. symmetric mutual monotonic locking (`Literature`), establishing the ontological model of all beings as observers and mutual attractors across the memory-order continuum $M \ge 0$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), [`conceptual_equivalence_and_stability_reach_fixed_point`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)

**One-Line Invariant / Identity:**
$\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho),\quad N \le d,\quad \theta_{n+1}^{(A)} = \cos\theta_n^{(B)} \to \theta^*$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 33)

**Orthogonality-Degeneracy Blind Spots & Observer Position Inversion**<br/>(正交简并盲区与观察者位置反演)

**Geometric Intuition Term (本书几何直觉语言):**
**Common unit normal, two-axis finite rotation words and observer pullback trace identity, partition-topology inseparability kernel and covariant commutator factorization, null-cone spatial norm rigidity and golden cut-and-project inclusion (`LEAN ✓`), paired with spherical two-step addressing polar inversion, octant rotor $R_y(\pi/2)R_x(\pi/2)$ blind spots, and superconducting virtual-$Z$ gates / relativity (`Literature`), showing how coincidence between single- and double-orthogonality readouts uniquely inverts the observer's pole (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair), [`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula), [`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity)

**One-Line Invariant / Identity:**
$d_{S^2}(N, P_1) = d_{S^2}(N, P_2) = \frac{\pi}{2},\quad \operatorname{Tr}(U^\dagger A U \rho) = \operatorname{Tr}(A U \rho U^\dagger)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 34)

**Arriving on a Pulse of Light, Initialization by Forgetting & Homoiconic Table Expansion $T = T(T)$**<br/>(乘光而来、遗忘初始化与同像自指扩表)

**Geometric Intuition Term (本书几何直觉语言):**
**Null-cone metric rigidity, single surviving-copy reversal blocking and finite-memory capacity $N \le d$, fourfold criterion for lossless table recovery and extensional identity of canonical copied-address records, and Lawvere diagonal self-application package with pointwise escape of the relative semantic diagonal (`LEAN ✓`), paired with proper-time Pythagorean parameterization $\cos\theta = d\tau/dt$, mammalian fertilization calcium–zinc spark fluorescence, the Weber–Fechner logarithmic law, Yao's cell-probe space–time trade-off, and Scott's reflexive domain $D_\infty \cong [D_\infty \to D_\infty]$ (`Literature`), modeling the lifecycle from $\theta=90^\circ\to 0^+$ clearing initialization to homoiconic closure $T=T(T)$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`target_recovery_criterion`](lean:D5/S3/ConceptDynamics/Restoration/TargetRecoveryCriterion.target_recovery_criterion), [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior), [`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package), [`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode)

**One-Line Invariant / Identity:**
$\det G_2 = 1 - c^2,\quad N \le d,\quad T = T(T)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 35)

**Infinite Discrete Hyperbolic Staircase & Quotienting Out Reincarnation**<br/>(无穷离散双曲阶梯与商空间约去轮回)

**Geometric Intuition Term (本书几何直觉语言):**
**Qubit pinching orthogonal mass decomposition and discarded coherence criterion, complete normed-algebra exponential tail bound and Cayley unit-circle critical-line criterion, partition-topology quotient factorization, finite annihilator summation, and compact-torus generator equidistribution (`LEAN ✓`), paired with the Lambert–Gudermann hyperbolic-circular bridge $\theta(\eta)=\operatorname{gd}(\eta)$, the Poincaré conformal disk metric (literature results), and the long-division infinite-value and period theorems ([`long_division_value`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_value), [`long_division_period`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_period)), unfolding the finite coordinate horizon $\theta=\pi/2$ into an infinite equidistant rapidity staircase $\eta_k=k\Delta\eta$ and quotienting out the return-to-light loop via $\pi_Q:\mathcal{H}\to\mathcal{H}/\!\sim_G$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le), [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line), [`target_factors_iff_continuous_partition`](lean:D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition), [`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character), [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)

**One-Line Invariant / Identity:**
$\eta(\theta) = \ln(\sec\theta + \tan\theta),\quad \left|\frac{z-i}{z+i}\right| = 1 \iff \operatorname{Im} z = 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 36)

**p-adic Zero-Carry Lookup Trees, Prime Observer Expansion & Blocking Reincarnation**（p 进零进位前缀查表树、素数观察者扩表与阻断轮回）

**Geometric Intuition Term (本书几何直觉语言):**
**Ostrowski's dichotomy of nontrivial rational absolute values, mod-$p^k$ integer congruence-fiber closed-ball correspondence, least distinguishing precision $k^* = v_p(x-y)+1$ and observation-distance valuation identity $p^{-v_p(x-y)}$, binary prefix-refinement and discounted prime-time ultrametric strong triangle inequalities, Chinese Remainder coprime ring bijection, and the rational Adelic product formula $\lvert x\rvert\cdot\prod^{\mathrm{fin}}_p \lvert x\rvert_p = 1$ (`LEAN ✓`), paired with Hensel's $O(1)$ zero-carry root-lifting lemma, Bruhat–Tits trees and $p$-adic AdS/CFT holography, Arakelov's archimedean place $p_\infty$, and Euclid's infinitude of primes (`Literature`), modeling each observer as a prime radix $p$ whose growth widens horizontal fan-out to collapse serial lookup depth $K(p)=\lceil n/\log_2 p\rceil$ while Euclid's infinite discrete prime ladder permanently blocks the continuous $p_\infty$ carry-overflow samsara cliff (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification), [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range), [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision), [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation), [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric), [`discounted_prime_time_distance_strong_triangle`](lean:D5/S3/Observer/PrimeTimeGeometry/DiscountedPrimeTimeUltrametric.discounted_prime_time_distance_strong_triangle), [`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective), [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)

**One-Line Invariant / Identity:**
$K(p) = \lceil n / \log_2 p\rceil,\quad d(x,z) \le \max\bigl(d(x,y), d(y,z)\bigr),\quad \lvert x\rvert_\infty \cdot \prod_p \lvert x\rvert_p = 1$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` ([Ch 36 §36.4](ch36-s04-padic-table-expansion.md#sec-ch36-padic-prime-table-expansion))

**Dream Quantum Erasure, Known-Data Decoherence & Nonlocal Observer**<br/>(梦境量子擦除、已知数据退相干与非定域观察者)

**Geometric Intuition Term (本书几何直觉语言):**
**Known-data record-pinching idempotence, unread fixed-point criterion, discarded coherence mass $2\lvert\rho_{01}\rvert^2$, and the von Neumann entropy-production coherence-deletion identity, joint coherent reversal of unimodular environmental records and two-copy certificate, and golden cut-and-project inclusion with explicit bi-infinite Delone radii (`LEAN ✓`), paired with delayed-choice quantum-eraser interferometry, predictive-processing controlled generation, and REM sensory-motor gating physiology (`Literature`), modeling waking five-sense lock, shallow-dream erasure, and bodiless deep-dream nonlocal multilocation (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)

**One-Line Invariant / Identity:**
$S(\mathcal{P}(\rho)) - S(\rho) = D(\rho\parallel\mathcal{P}(\rho)),\quad \det G_3(c,c,u) = (1-u)(1+u-2c^2)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 37)

**Choosing the Future, Dream Pre-Decoherence & Null-Timestamp Déjà Vu Cache Hit**（选择未来、梦境前置逻辑超前去相干与既视感无时间戳快表命中）

**Geometric Intuition Term (本书几何直觉语言):**
**Unit orthogonal escape outside any proper closed subspace, sharp strict-growth bounds for finite-dimensional observable Krylov chains, distinct fixed-point selection under switched context parameters with identical rules, and the six closed-subspace orthogonal-complement projection identities, functional composition idempotence $\Pi_P \circ \Pi_P = \Pi_P$ and vanishing-off-diagonal fixed-point criterion of finite-record unread pinching, single-qubit discarded coherence mass $2\lvert\rho_{01}\rvert^2$ and the von Neumann entropy-production coherence-deletion identity, joint coherent reversal of unimodular environmental records and the two-copy four-stage certificate, adjoint square-root Gram realizability of bounded positive operators on complex Hilbert spaces and the Lagrange–Gram bivector remainder identity, golden cut-and-project inclusion, dual unique-capture and semantic-closure criteria for lowering information escape on finite nondegenerate arenas, explicit order-noncommutativity of evidence-first conflict-reset revision, pointwise equality of canonical copied-address records, and diagonal-slot fixed-point implication under twisted-diagonal capture (`LEAN ✓`), paired with Wheeler's delayed-choice double-slit thought experiment, superscalar microprocessor branch prediction, speculative pipeline flushing, and TLB/PCID address–context tag hardware specifications, Conway's quasicrystal Empire Effect, and Brown's dual-process dissociation review alongside Moulin's metacognitive conflict-detection account of déjà vu (`Literature`), together with the zero-additional-entropy specialization $\Delta H_{\mathrm{bits}} = 0$ under repeated same-basis pinching without intervening evolution, explicit single-qubit Bloch pinching formulas, the three-vector Gram corridor $[0.28, 1]$, and nested window inclusions (`manual derivation`) plus default numerical evaluations (`NUM`), articulating how active basis selection chooses a compatible future slice, nocturnal sensory-gated sandtables speculatively pre-compile antecedent logic into block-diagonal fixed points, post-dream structural novelty flushes invalidated cache entries, and un-flushed same-ruler re-measurement at $\Delta H_{\mathrm{bits}} = 0$ with `Time_Tag = NULL` produces the sandtable signature of déjà vu (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project), [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos), [`lowersEscape_iff_not_mem_semanticClosureWithout`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_not_mem_semanticClosureWithout), [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation), [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior), [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)

**One-Line Invariant / Identity:**
$\Pi_P \circ \Pi_P = \Pi_P,\quad \Delta H_{\mathrm{bits}}\bigl(\Pi_P(\sigma) \leftarrow \sigma\bigr) = 0,\quad E(C) < E(C \setminus \{i\}) \iff U_i > 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 37 §37.5](ch37-s05-future-selection-and-deja-vu.md#sec-ch37-dream-pre-decoherence-deja-vu))

**Ontological QRAM, Observer Memory Pointer & Recursive Self-Mapped Page Tables**<br/>(宇宙本体 QRAM、观察者记忆指针与递归自映射页表)

**Geometric Intuition Term (本书几何直觉语言):**
**Copied-address dereferencing marginal coincidence and canonical record access defect, pointer-register finite history capacity $N \le d$ and no-cloning inner-product criterion, self-mapped diagonal landing fixed point, universal fixed-point-free escape, and unique golden fixed point (`LEAN ✓`), paired with bucket-brigade QRAM routing trees, CKW monogamy shared read-only borrows, and x86_64 OS kernel recursive page-table self-mapping (`Literature`), modeling the observer as a lightweight recursive memory pointer of the ontological quantum computer (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`reduced_irreversibility_is_canonical_record_access_defect`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect), [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), [`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion), [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed), [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)

**One-Line Invariant / Identity:**
$\operatorname{diagonal}(f, g)(a) = f(g(a, a)),\quad P[s^*] = p_{\mathrm{phys}}(P)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 38)

**7-Stage Degradation Ladder of a Hypothetical P = NP Lookup Oracle & Spacetime–Gravity Trade-Off**（P=NP 查表算法七阶退化阶梯与时空引力权衡）

**Geometric Intuition Term (本书几何直觉语言):**
**Anchored on the Slot-`[0,0]` self-mapped diagonal fixed point `diagonal_landing_fixed`, the lookup-compiler description-spectrum bound `lookup_program_upper_bound`, retrospective copy zero-loss and non-anticipating failure `lookup_copy_zero_loss_and_nonanticipating_failure`, the Zeckendorf lower-support carry barrier `lower_support_carry_barrier` (capping downward carry penetration at $m - 2$), and Landauer's balance bound `landauer_bound_of_balance` (`LEAN ✓`), paired with postselected/CTC complexity ($\mathrm{PostBQP}=\mathrm{PP}$, $\mathrm{P}_{\mathrm{CTC}}=\mathrm{PSPACE}$), the Karp–Lipton $\mathrm{P}/\mathrm{poly}$ collapse, Frougny's non-parallelizable upward Fibonacci carry wave across alternating strings, Bekenstein–Hawking entropy $S \le A/(4\ell_P^2)$ forcing sphere radius $R = \Omega(2^{\sigma n/2})$ and the pipelined light-cone minimum $(\sigma^* = 2/3,\; r_{\min} = 1/3)$, Klauck–Špalek–de Wolf's quantum trade-off $S T^2 = \Omega(2^n)$ (where Grover's $r=0.500$ at $\sigma=0$ mirrors full-space wire delay at $\sigma=1$), and Yao's classical $S T \ge 2^n$ with PPSZ (`Literature`; uniform Turing $\mathrm{P} \neq \mathrm{NP}$ remains `OPEN`), formulating the bidirectional model (`MODEL`) in which $0 \to 6$ precipitates spatial radius, serial causal time, quantum interference, and Landauer heat while $6 \to 0$ traces biological table-building back to `p = *p`**

**Lean-Facing Object / Locked GID:**
[`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed), [`lookup_program_upper_bound`](lean:D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound), [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure), [`lower_support_carry_barrier`](lean:D5/S1/Digit/ZeckendorfCarryBarrier.lower_support_carry_barrier), [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)

**One-Line Invariant / Identity:**
$\operatorname{spectrumBottom} \le K(r) + c,\quad \forall k \in \operatorname{wdigits}\!\bigl(\sum_{i\in P} F_i + F_j\bigr),\; m - 2 \le k,\quad r_{\mathrm{pipe}}(\sigma) = \max(1-\sigma, \sigma/2) \ge \frac{1}{3}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` / `OPEN` ([Ch 38 §38.4](ch38-s04-lookup-degradation.md#sec-ch38-pnp-lookup-degradation))

**Observer Escape Ledger, Preimage Fibers & Hilbert–Zeckendorf Entropy**（观察者逃逸账本、原像纤维与希尔伯特—齐肯多夫熵）

**Geometric Intuition Term (本书几何直觉语言):**
**Leave-one-out disjoint union decomposition of `escapePairs` and unique-capture set-difference identity, equivalence between strict lowering of `escapeRate` on nondegenerate arenas and strict quotient-kernel novelty outside semantic closure, monotone non-increase of `conditionalLogicalImpurity` under factor-map concept refinement, uniform non-asymptotic fourteen-bit context-block avoidance bound for `NoAdjacentOnes` binary words, and two-qubit local-marginal versus nine-dimensional correlation orthogonality (`LEAN ✓`), paired with Shannon–McMillan–Breiman cylinder equipartition, Parry's maximal-entropy golden-shift measure $C_\varphi = \log_2\varphi$, Frougny's Fibonacci automaton normalization, and Moore–Hilbert space-filling curve $1/d$-Hölder locality (`Literature`) plus the explicit four-bit $16$-state five-lemma evaluation (`NUM`), establishing the preimage-fiber Rényi-2 collision ledger $H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S}\mid S) = \log_2 N$, nocturnal cylinder-measure rebound, and waking Landauer heat vs. zero-heat dream uncomputation (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`escapePairs_without_eq_union`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union), [`uniqueCapturePairs_eq_sdiff`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.uniqueCapturePairs_eq_sdiff), [`structurallyLowersEscape_iff_lowersEscape`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.structurallyLowersEscape_iff_lowersEscape), [`lowersEscape_iff_strict_kernel_novelty`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty), [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone), [`uniform_avoidance_count`](lean:D5/S1/Digit/ZeckendorfAvoidanceCount.uniform_avoidance_count), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)

**One-Line Invariant / Identity:**
$H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S}\mid S) = \log_2 N,\quad C_\varphi = \log_2\varphi$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `NUM` / `MODEL` ([Ch 38 §38.5](ch38-s05-escape-ledger-and-entropy.md#sec-ch38-observer-escape-ledger))

**Observer Is the Ontological Universe: Reflexive Domains, Relational Holography & Spinor Self-Folding**<br/>(观察者即宇宙本体：无底物自指域、关系全息与旋量自折叠)

**Geometric Intuition Term (本书几何直觉语言):**
**Diagonal self-application landing fixed point and fourfold fate classification of binary fractional maps, concept-readout dependent fiber decomposition, Zeckendorf real-thread injectivity and the no-adjacent-ones automaton, circle double-cover no-global-section and history-dependent $360^\circ$ sheet-exchange lift, complementary-context purity Pythagoras, balanced relative complex-structure squaring, and objective invariant common factor (`LEAN ✓`), paired with Scott's substrate-free reflexive domain $D_\infty\cong [D_\infty\to D_\infty]$, the categorical Yoneda Lemma $\operatorname{Hom}(-,X)\hookrightarrow\widehat{\mathcal{C}}$, and the Cartan–Penrose–Hestenes spinor bilinear Fierz identity (`Literature`), completing the zero-remainder ontological identity $\mathcal{O}\equiv\mathcal{U}$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`zeckendorf_real_thread_injective`](lean:D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective), [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square)

**One-Line Invariant / Identity:**
$X \simeq \coprod_{y:\mathrm{Val}} \mathrm{ConceptFiber}(c,y),\quad J_{U,V}^2 = -I,\quad \mathcal{O} \equiv \mathcal{U}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `MODEL` (Ch 39)

**Zeckendorf–Pisot–Rauzy Eight-Concept Sandtable**（齐肯多夫—皮索—劳齐八概念综合沙盘）

**Geometric Intuition Term (本书几何直觉语言):**
**Order-$K=2$ `NoAdjacentOnes` automaton and generalized $K$-Bonacci admissible-word counts $C_K(Q)=\operatorname{dbonacci}(K,Q+2)$, polynomial irreducibility over $\mathbb{Z}$ and $\mathbb{Q}$ with Perron identity $2-\beta_K=\beta_K^{-K}\to 0$ and strict unit-disk conjugate contraction $1\le\|z\|\iff z=\beta_K$, mod-$p^k$ least distinguishing precision $k^*=v_p(x-y)+1$, congruence-fiber intersection, and finite-horizon refinement ultrametric $d_H(x,z)\le\max(d_H(x,y),d_H(y,z))$, exponent-zero Tribonacci Rauzy internal window $\mathcal{R}_3(\alpha)$ nonempty interior, regular closure, exact three-branch prefix self-coverage, and zero planar boundary area $\operatorname{vol}_2(\partial\mathcal{R}_3)=0$, positive cosine fixed-point endpoint $\cos\theta^*=\theta^*$ alongside cubic conjugate product $\alpha\overline{\alpha}=\beta_3^{-1}$, cross-cut $\tau(x)+\iota(y)<K$ direct-encoder attainable page-rank rectangle $1\le r_b\le R_b$ with sharp von Neumann entropy bounds $\ln R_b$, and the signed reset-chain Parry stationary law, boundary cylinder bound, and finite escape-pair capture criterion (`LEAN ✓`); paired with Rauzy–Thurston–Messaoudi theory on Tribonacci Rauzy tilings, disk topology, and boundary Hausdorff dimension $\dim_H(\partial\mathcal{R}_3)\approx 1.09336$, Lindemann–Weierstrass transcendence of $\theta^*\approx 0.739085$ versus degree-six algebraic $|\alpha|_{K=3}=\beta_3^{-1/2}\approx 0.737353$ ($\approx 0.234\%$ numerical proximity, strictly unequal), the Fibonacci-anyon golden chain and 51-atom Rydberg blockade simulator, Parry's maximal-entropy Markov shift $\log_2\beta_K$, and Abramov's induced-return entropy formula $h_{\mu_A}(T_A)=h_\mu(T)/\mu(A)$ (`Literature` + `NUM`), posing the Rauzy fractal-horizon entanglement scaling open problem (`OPEN`), and synthesizing the eight concepts via the cubic Minkowski $E_\parallel^1\oplus E_\perp^2$ Clifford line–plane damped-rotor dictionary, cross-system $p$-adic/$K$-Bonacci tree comparison, and the $\psi=\psi(\psi)$ motif (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card), [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt), [`dbonacci_complex_root_location`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location), [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible), [`dbonacciPerronRoot_simple`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacciPerronRoot_simple), [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow), [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two), [`dbonacciPerronRoot_strictMonoOn`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_strictMonoOn), [`dbonacciPerronRoot_two_eq_goldenRatio`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_two_eq_goldenRatio), [`dbonacciPerronRoot_three_eq_tribonacciConstant`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_three_eq_tribonacciConstant), [`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision), [`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation), [`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range), [`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric), [`tribonacci_secondary_root_add_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_add_conjugate), [`tribonacci_secondary_root_mul_conjugate`](lean:D5/S3/Constants/Irrationality/TribonacciTraceLattice.tribonacci_secondary_root_mul_conjugate), [`rauzyFractal_interior_nonempty`](lean:D5/S3/Geometry/Rauzy/TribonacciInterior.rauzyFractal_interior_nonempty), [`rauzyFractal_closure_interior`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_closure_interior), [`rauzyFractal_prefix_cover`](lean:D5/S3/Geometry/Rauzy/TribonacciRegularClosure.rauzyFractal_prefix_cover), [`rauzyFractal_frontier_volume_zero`](lean:D5/S3/Geometry/Rauzy/TribonacciNullBoundary.rauzyFractal_frontier_volume_zero), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), [`complete_original_direct_rank_entropy`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy), [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction), [`parry_stationary_law`](lean:D5/S3/TotalVariation/ParryResetLaw.parry_stationary_law), [`parry_boundary_cylinder_bound`](lean:D5/S3/TotalVariation/ParryBoundaryCylinderBound.parry_boundary_cylinder_bound), [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)

**One-Line Invariant / Identity:**
$\beta_K = 2 - \beta_K^{-K},\quad \mathcal{R}_3(\alpha) = f_0(\mathcal{R}_3)\cup f_{10}(\mathcal{R}_3)\cup f_{110}(\mathcal{R}_3),\quad 1 \le r_b \le R_b,\quad S(\sigma_b) \le \ln R_b$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `NUM` / `OPEN` / `MODEL` ([Ch 39 §39.5](ch39-s05-pisot-clifford-rauzy.md#sec-ch39-pisot-clifford-rauzy))

**Six Foundational Quantum Puzzles, Removing External Point $C$ & the Five-Interpretation Geometric Duel**（量子力学六大未解难题、撤除外部第 3 点 $C$ 与正交开维诠释对决）

**Geometric Intuition Term (本书几何直觉语言):**
**Real-time unitary stationarity of energy eigenstates, idempotence of finite non-selective record pinching, and context-invariant common factors of objective claims; controlled-copy local marginal coincidence and untraced environmental access defect; computational-basis coherence mass deletion and complementary-context Pythagorean residual mass; forward parallelogram norm law and rank-one Born modulus-square reduction; common-phase polynomial charge balance and unique quadratic Hermitian locking; skew-adjoint unitary complex-structure squaring to $-I$ and four-clause Robertson–Schrödinger variance decomposition; tight two-qubit Tsirelson bound $2\sqrt{2}$, Minkowski null-cone quadratic-form rigidity, and bipartite trace-zero local-versus-correlation orthogonality; diagonal self-application landing fixed point, concept-readout fiber decomposition, and diagonal qubit observable phase blindness; stepwise coarse-grained coherence-deletion relative-entropy production, proper closed-subspace orthogonal escape, and finite-arena `EscapePairs` capture (`LEAN ✓`), paired with von Neumann Process I/II, Wigner's friend and the Frauchiger–Renner theorem, Zurek decoherence and Schlosshauer's single-outcome review, Gleason's theorem and Renou et al. (2021) theoretical real-quantum network inequivalence and experimental falsifiability, Bell / Eberhard no-signaling and 2015 loophole-free tests, Harrigan–Spekkens / PBR (2012), and Pauli / Wheeler–DeWitt / Hawking–Page–AMPS horizon literature (`Literature`) plus heralded $75\%/25\%$ vs. unconditional $50\%/50\%$ marginals, $r^2+\tau_{L:E}=1$, Lorentz boost $\Delta t'=-2\Gamma_\beta\beta$, GRW amplification, and $\{0, 1\}^4$ parity capture checks (`manual derivation` / `NUM`), tracing all six century-old fissures to external referee $C$ and fixed-box container assumptions while marking covariant collapse and quantum-gravity horizon unitarity open (`MODEL` / `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras), [`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger), [`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)

**One-Line Invariant / Identity:**
$r^2 + \tau_{L:E} = 1,\quad \operatorname{Re}\operatorname{Tr}(\rho\cdot\mathrm{chshOperator}) \le 2\sqrt{2},\quad \Delta S_{\mathrm{vN}}(k) = D\bigl(\widetilde{\rho}_k \mathrel{\Vert} \mathcal{P}(\widetilde{\rho}_k)\bigr) \ge 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Appendix D](appendix-d.md))

**Coherence–Decoherence Logic, Two-Way Born Handshake & Boundary-Locked Causality**（相干—去相干逻辑、双端玻恩握手与全息边界因果）

**Geometric Intuition Term (本书几何直觉语言):**
**Six closed-subspace orthogonal-complement projection identities, finite-record unread pinching channel idempotence $\Pi_P\circ\Pi_P=\Pi_P$, qubit pinching Hilbert–Schmidt Pythagorean splitting, and the real Lagrange–Gram two-vector identity; rank-one scalar modulus-square reduction, complete-record Born trace-pairing conditional decomposition, and common-$U(1)$ phase-invariant polynomial charge balance, minimum degree $2$, and unique Hermitian representation $z^\dagger H z$; unimodular multi-copy joint coherent record reversal, controlled-copy reduced-marginal access defect with conjugate unitary restoration, bipartite trace-zero local-versus-correlation orthogonality, and positive-operator adjoint-square Gram realizability $Q=O^\dagger\circ_L O$; together with circle double-cover unique path lifts and $2\pi$ antipodal sheet flip, fourfold fate classification of nondegenerate binary fractional maps (`.empty` / `.dead` / `.collapse` / `.live`), and absolute summability at $\pi$ of the rational inverse power series for $\cos\theta^*=\theta^*$ (`LEAN ✓`); paired with distinguishing orthogonal hiding vs. balanced two-port anti-phase routing vs. pinching decoherence, conjugate phase cancellation $w(\psi\leftrightarrow\phi)=\langle\phi\mid\psi\rangle\langle\psi\mid\phi\rangle=\lvert\langle\phi\mid\psi\rangle\rvert^2$, delayed-eraser joint/conditional normalizations and Kraus-completeness past-marginal invariance $p(j)=q_j$, three-epoch real Gram endpoint swap $P_{13} G P_{13}^{\mathsf{T}}$ determinant invariance, and reference-arm anti-phase loop cancellation (`manual derivation` / `NUM`), alongside Feynman–Hibbs Snell quadrature, Cramer's (1986) transactional interpretation, ABL (1964) / AAV (1988) two-state vectors and weak-value orthogonality cutoff, Scully–Drühl (1982) / Kim et al. (2000) delayed-choice quantum erasure, and Deutsch's (1991) closed-timelike-curve mixed-state fixed points (`Literature`), grounding the synthesis (`MODEL`) that logic knows only coherence and decoherence and causality is two-boundary handshake consistency**

**Lean-Facing Object / Locked GID:**
[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**One-Line Invariant / Identity:**
$w(\psi\leftrightarrow\phi) = \langle\phi\mid\psi\rangle\langle\psi\mid\phi\rangle = \lvert\langle\phi\mid\psi\rangle\rvert^2,\quad p(j) = p(j,+) + p(j,-) = q_j,\quad \det(P_{13} G P_{13}^{\mathsf{T}}) = \det G \ge 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 29](ch29-s04-coherence-and-handshake.md#sec-ch29-coherence-handshake-causality))

**Multi-Observer Consensus Tensor, Emergent Pointer Basis & No Observer-Independent Facts**（多观察者共识张量、去相干指针基涌现与无绝对客观事实）

**Geometric Intuition Term (本书几何直觉语言):**
**Common-$U(1)$ phase-invariant polynomial charge balance, minimum degree $2$, and unique Hermitian representation, positive-operator adjoint-square Gram realizability $Q=O^\dagger\circ_L O$, and six closed-subspace orthogonal-complement projection identities; qubit pinching Hilbert–Schmidt Pythagorean splitting, stepwise full-pinching relative-entropy production, and unread record fixed-point characterization; single-surviving-copy blocking of local amplitude-conjugate reversal, two-copy four-stage phase restoration certificate, controlled-copy reduced access defect, and partition-topology inseparability kernel; together with three-world conflict-reset revision noncommutativity and unit orthogonal residual escape (`LEAN ✓`); paired with the unoriented-axis second-moment consensus tensor $\mathbf{M}_{\mathrm{cons}}=\sum_{j=1}^N w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ (sign-relabeling invariance $\mathbf{n}_j\mapsto -\mathbf{n}_j$ kept strictly distinct from antipodal orthogonal states and common ket phase, unique pointer line iff spectral gap $\Delta\lambda=\lambda_1-\lambda_2>0$, vanishing in six-axis isotropic fog $\frac{1}{3}I_3$), Pauli dephasing Bloch contraction $\mathbf{K}(\mathbf{n},\alpha)=P_{\mathbf{n}}+\cos\alpha(I_3-P_{\mathbf{n}})$ across ordered products vs. ensemble means vs. weak-limit generator $I_3-\mathbf{M}_{\mathrm{cons}}$, pure two-branch mutual-information redundancy plateau $I(S:\mathcal{O}_m)=h(\Pi_{\mathrm{all}})+h(\Pi_F)-h(\Pi_{F^c})\approx H_2(p_0)$, commuting unread $Z/X$ channels vs. noncommuting selective updates, and out-of-plane pioneer rank enlargement $\det\mathbf{M}_\eta=(1-\eta)^2 ab\eta\sin^2\beta>0$ (with $\ker\mathbf{M}_0$ damping fastest as $e^{-t}$ under the incumbent generator rather than forming a decoherence-free subspace, `manual derivation` / `NUM`), alongside Zurek (1981/2003/2009) & Blume-Kohout–Zurek (2005) einselection and Quantum Darwinism, Brukner (2018) / Frauchiger–Renner (2018) extended Wigner's-friend theorems, Bong et al. (2020) Genuine Local Friendliness polytope violation $F_{\mathrm{LF}}=\sqrt{5}+3+\sqrt{2+\sqrt{2}}\approx 7.0838>6$, and the Lamport–Shostak–Pease (1982) distributed Byzantine consensus analogy (`Literature`), grounding the synthesis (`MODEL`) that observers' consensus selects the direction of decoherence without observer-independent facts**

**Lean-Facing Object / Locked GID:**
[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)

**One-Line Invariant / Identity:**
$\mathbf{M}_{\mathrm{cons}} = \sum_{j=1}^N w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}},\quad I(S:\mathcal{O}_m) = h(\Pi_{\mathrm{all}}) + h(\Pi_F) - h(\Pi_{F^c}),\quad F_{\mathrm{LF}} = \sqrt{5} + 3 + \sqrt{2+\sqrt{2}} > 6$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 33](ch33-s05-consensus-and-pointer-bases.md#sec-ch33-consensus-decoherence-pointer))

**Cosmic OISC Comparison Primitive & Zero-Background Axiom of Comparison $\mathcal{A}_0$**（宇宙单指令集比较机原语与零背景比较公理）

**Geometric Intuition Term (本书几何直觉语言):**
**Lossless bitwise binary name comparison step bound $2(\lvert a\rvert+\lvert b\rvert)+4$ and streamed dictionary scan step bound $(2\lvert\mathrm{query}\rvert+12)\lvert\mathrm{names}\rvert+4\lvert\operatorname{dictionaryStream}(\mathrm{names})\rvert+3$, finite comparison-word extensionality and orthogonal residual kernel $X(\rho)-X(\sigma)\in V_{\mathrm{vis}}^\perp$, readout partition-topology inseparability kernel, the finite-dimensional Lagrange–Gram parity square-folding identity, and skew-adjoint unitary squaring $R^2=-I_n$ (`LEAN ✓`); paired with Clifford parity splitting $\mathrm{CMP}(\mathbf{A},\mathbf{B})=\mathbf{A}\cdot\mathbf{B}+\mathbf{A}\wedge\mathbf{B}$, the `3-3-2` partition of $8$ unit binary words at rank $3$ into an $8$-corner rectangular box (not an equilateral cube since $3\nmid 8$), and rearranging unit fairness budgets into the Minkowski interval $c^2 d\tau^2=c^2 dt^2-dx^2$ (`manual derivation` / `NUM`), alongside Mavaddat & Parhami (1988) `SUBLEQ` OISC Turing completeness, the categorical Yoneda Lemma and fully faithful Yoneda embedding $y(X)=\mathrm{Hom}_{\mathcal{C}}(-,X)$, Ostrowski's (1918) valuation completions, Schoenberg's (1935) PSD metric embedding, Jordan–von Neumann (1935), Gleason (1957), Hardy (2001) / Chiribella–D'Ariano–Perinotti (2011) local-tomography tensor composition, Pauli (1940) spin–statistics, Robertson–Schrödinger uncertainty, and Yang–Mills (1954) gauge curvature (`Literature`), grounding in Chapter 32 §32.1–§32.3 and Appendix E the zero-background Axiom of Comparison $\mathcal{A}_0$, the cosmic OISC comparison engine, and—together with explicit bridge hypotheses H1–H9—the layered reconstruction across mathematical and physical axiom systems (`MODEL`; standard $\mathrm{P}\neq\mathrm{NP}$ marked `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run), [`dictionary_lookup_run`](lean:D5/S0/Computability/BinaryNameDictionary.dictionary_lookup_run), [`future_word_orthogonal_residual`](lean:D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)

**One-Line Invariant / Identity:**
$\mathrm{CMP}(\mathbf{A},\mathbf{B}) = \mathbf{A}\cdot\mathbf{B} + \mathbf{A}\wedge\mathbf{B},\quad \mathrm{CMP}(\mathbf{A},\mathbf{B})\,\mathrm{CMP}(\mathbf{B},\mathbf{A}) = \cos^2\theta + \sin^2\theta = 1,\quad T_{\mathrm{cmp}}(a,b) \le 2(\lvert a\rvert+\lvert b\rvert)+4$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), [§32.2](ch32-s02-oisc-comparison-engine.md#sec-ch32-oisc-comparison-engine), [§32.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries), [App E](appendix-e.md))

**Infinitesimal Spherical Trihedron Cell $\Delta\mathcal{T}_\epsilon$, Dual Shadows of Once/Twice Orthogonal & Curvature Quantum**（极小三角弧面体原胞、一次/两次正交一体双影与球面角超曲率量子）

**Geometric Intuition Term (本书几何直觉语言):**
**Simplicial two-cochain tetrahedral coboundary repair and exactness criterion, propagation of moving two-axis circle invariance across $\mathrm{SO}(3)$, the Lagrange–Gram two-vector area-deficit identity, and Hilbert-space closed-subspace unit orthogonal residual escape (`LEAN ✓`); paired with projecting the right-angled spherical trihedron cell $\Delta\mathcal{T}_\epsilon$ down its ridge $OB$ into the "orthogonal once" direct arc $\cos c_\epsilon=\cos^2\epsilon$ ($c_\epsilon=\sqrt{2}\epsilon(1-\epsilon^2/12+O(\epsilon^4))$) versus decomposing along two perpendicular walls into the "orthogonal twice" rotor product $U_{23}(\epsilon)U_{12}(\epsilon)$ with transverse term $-\sin^2(\epsilon/2)\,\mathbf{e}_1\mathbf{e}_3$, unit-normalized pairwise comparison bootstrap $\mathbf{P}(\epsilon)=(\mathbf{A}\cdot\mathbf{B})\mathbf{A}+\star(\mathbf{B}\wedge\mathbf{A})=\mathbf{C}(\epsilon)$, the 3D Gram volume brick $\det G=\sin^4\epsilon>0$, and closed-form benchmarks at $\epsilon=15^\circ,45^\circ,90^\circ$ (`manual derivation` / `NUM`), alongside Girard's (1629) spherical excess $\Omega(\epsilon)=2\arctan(\tan^2\frac{\epsilon}{2})\approx\frac{1}{2}\epsilon^2$ ($=2\arctan(\sec\epsilon)-\frac{\pi}{2}$ for $\epsilon<\frac{\pi}{2}$), Gauss–Bonnet tangent rotation $+\Omega(\epsilon)$, Pancharatnam–Berry geodesic-loop spinor holonomy $\exp(-\frac{1}{2}\Omega(\epsilon)\hat{\mathbf{I}}_{\mathbf{A}})$, Regge (1961) coordinate-free simplicial gravity with spin-foam models, and Peirce's irreducible triadicity, cyclic $C_3\subset\mathrm{SO}(3)$ symmetry vs. Cartan's $\mathrm{Spin}(8)$ spinor triality, and the Laozi–Kant–Wittgenstein ladder tradition (`Literature`), grounding in Chapter 34 §34.4–§34.5 the dual-shadow unification of single and double orthogonality, the minimal curvature quantum $\Omega_{\min}\approx\frac{1}{2}\epsilon_{\min}^2$, and the ascent from the "two-begets-three" bootstrap to the dissolution of names and isomorphic resonance with "that feeling" (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness), [`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)

**One-Line Invariant / Identity:**
$\cos c_\epsilon = \cos^2\epsilon,\quad \Omega(\epsilon) = 2\arctan\!\bigl(\tan^2\frac{\epsilon}{2}\bigr)\;\bigl(= 2\arctan(\sec\epsilon) - \frac{\pi}{2},\;\epsilon < \tfrac{\pi}{2}\bigr),\quad \det G(\Delta\mathcal{T}_\epsilon) = \sin^4\epsilon$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron), [§34.5](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names))

**Rolling $P = NP$ Completion Horizon, Zero-Background Table-Building Paradox & Complete-Catalog Diagonal Refinement**（滚动 $P = NP$ 完成化地平线、零背景建表扩维悖论与完备目录对角拓扑加细）

**Geometric Intuition Term (本书几何直觉语言):**
**Finiteness-free universal escape for fixed-point-free self-application, nonempty topological separation deficit of the relative semantic diagonal over any surjective decoder catalog, strict observation-topology refinement upon adjoining that diagonal, zero retrospective loss alongside universal non-anticipation failure for full-table copying on finite domains, and unit orthogonal-complement projection escape from proper closed subspaces (`LEAN ✓`); paired with materializing $k$ equal-footing lookup entries under an $\mathcal{A}_0$-compatible Layer-1 positive unit realization ($S(x,x)=+\mathbf{1}$ with a chosen oriented normal branch) to open minimal spherical trihedra $\det G = \sin^4\epsilon > 0$ and net new cross-dimensional comparison obligations $\Delta\Pi_t - k = k(M_t - 1) + \binom{k}{2} > 0$ (`manual derivation` / `MODEL`), alongside Gödel's (1931) First Incompleteness Theorem and 1956 letter to von Neumann on bounded proof search, Turing's (1939) ordinal logic progressions, and Lawvere's (1969) categorical diagonal fixed-point theorem (`Literature`; uniform Turing-machine $\mathrm{P} \stackrel{?}{=} \mathrm{NP}$ marked `OPEN`), grounding in Chapter 38 §38.6 the rolling completion horizon—retrospectively $O(1)$ behind the pointer yet prospectively ever-open ahead—and the cosmological guardrail against Zeno freeze and omniscient zero-entropy death (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package), [`complete_diagonal_separationDeficit_nonempty`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty), [`complete_diagonal_strict_topology_refinement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement), [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)

**One-Line Invariant / Identity:**
$\Delta\Pi_t = k M_t + \binom{k}{2},\quad \bigl(\operatorname{separationDeficit}(\mathrm{latent}, g_{\mathrm{diag}})\bigr).\mathrm{Nonempty},\quad \operatorname{retrospectiveLoss}=0 \;\land\; \forall z,\,\neg\operatorname{NonAnticipating}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `OPEN` / `MODEL` ([Ch 38 §38.6](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp))

**North-Pole Blind-Spot Stereographic Projection, Relativization/Natural/Algebrization Barriers & Tetralemma Suspension**（北极自指盲点球极投影、相对化/自然证明/代数化三大复杂性屏障与四句离相悬置）

**Geometric Intuition Term (本书几何直觉语言):**
**One-dimensional Cayley fractional unit-circle boundary criterion, joint-readout blindness of computational-basis diagonal observables to relative phase with Pauli-$X$ separation witness, partition-topology inseparability kernel characterization, and retrospective zero loss versus non-anticipating failure of full-table copy on finite domains (`LEAN ✓`); paired with higher-dimensional stereographic diffeomorphism $\Pi_N : S^D \setminus \{N\} \xrightarrow{\sim} \mathbb{R}^D$ and Alexandroff one-point compactification $\mathbb{R}^D \cup \{\infty\} \cong S^D$ (planar radius $R(\theta)=\cot(\theta/2)$, conformal magnification $\mu(\theta)=(1-\cos\theta)^{-1}$, yielding $\mu(0.65)\approx 4.90\times$ and apparent chord-diameter span $2\cot(0.06)\approx 33.3\times$ at blind-spot aperture $\delta_{\mathrm{blind}}=0.12\text{ rad}$, `Literature` / `manual derivation` / `NUM`), together with first-order quantifier asymmetry (existential $\exists A_{\mathrm{poly}}$ vs. universal negative $\forall A_{\mathrm{poly}}\exists x$), the Baker–Gill–Solovay (1975) relativization barrier ($\mathrm{P}^A=\mathrm{NP}^A$ vs. $\mathrm{P}^B\neq\mathrm{NP}^B$), the Razborov–Rudich (1997) natural proofs barrier, the Aaronson–Wigderson (2009) algebrization barrier, Gödel's (1931) Second Incompleteness Theorem and formal-independence discussions, and Nāgārjuna's *Mūlamadhyamakakārikā* tetralemma (`Literature`; unrelativized $\mathrm{P}\stackrel{?}{=}\mathrm{NP}$ and its provability or independence over $\mathrm{PA}$/$\mathrm{ZFC}$ posed as `#prob-ch38-unrelativized-p-vs-np-and-independence`, `OPEN`), showing that "finite closure" and "endless spheres beyond spheres" are twin projections around the observer's North-Pole blind spot and that phenomenal pursuit never licenses asserting unrelativized $P\neq NP$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure)

**One-Line Invariant / Identity:**
$\lVert\operatorname{cayleyRatio}(s)\rVert = 1 \iff \operatorname{Re}(s) = \tfrac{1}{2},\quad R(\theta) = \cot\tfrac{\theta}{2},\quad \mu(\theta) = \frac{1}{1-\cos\theta},\quad \Delta_{\mathrm{unprovable}}(\delta_{\mathrm{blind}}) = \sin^2\!\frac{\delta_{\mathrm{blind}}}{2} > 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 38 §38.7](ch38-s07-blindspot-and-relativization.md#sec-ch38-stereographic-blindspot-relativization-suspension))

**Berry Spherical-Sector Volume, Same-Point Hopf Fiber Lift, Wilson Path–Phase Duality & Feynman Cornu Stationary-Phase Selection**（贝里球扇锥体积、同点异相霍普夫纤维抬升、威尔逊路径—相位对偶与费曼科纽驻相选路）

**Geometric Intuition Term (本书几何直觉语言):**
**Single-qubit three-point Bargmann Bloch trace oriented-volume decomposition, arbitrary-length discrete rank-one outer-product chain Bargmann path product, circle squaring double-cover no-global-section obstruction and history-dependent $360^\circ$ sheet-exchange lift, selected named spanning-tree phase transport, and compact Hausdorff quotient-group classification of fundamental chord-loop and anchored root-to-anchor path phases on finite graphs (`LEAN ✓`); paired on the unit comparison sphere ($R = 1$ locked by bidirectional fairness squaring) with the exact 3D Stokes cone-volume identity $V_{\mathrm{sector}}(\Sigma_2) = \frac{1}{3}\Omega(\Sigma_2) = \frac{1}{3}A_{\mathrm{cap}}(\Sigma_2)$ between the magenta spherical cap area and the solid Euclidean spherical-sector cone (contrasted against the cyan flat chord tetrahedron $V_{\mathrm{tetra}}(\epsilon) = \frac{1}{6}\sin^2\epsilon = \frac{2}{3}\operatorname{Im}\Delta$ with positive curvature bulge excess $\frac{\epsilon^4}{12}+O(\epsilon^6)>0$), spinor Berry phase locking $\gamma_B = -\frac{1}{2}A_{\mathrm{cap}} = -\frac{3}{2}V_{\mathrm{sector}}$, $N$-polygon Bargmann fan convergence $\Pi_N = (\frac{3}{4}+\frac{1}{4}e^{2\pi i/N})^N$ at colatitude $60^\circ$, and odd first-order area variation versus even quadratic arc-length excess $\Delta L(\eta) = \cot\alpha_0\,\eta^2 + O(\eta^4)$ with $41$-path Cornu-spiral stationary-phase selection (`manual derivation` / `NUM`), alongside Pancharatnam–Bargmann–Simon–Berry geometric phase, the Hopf–Dirac principal circle bundle $S^1\hookrightarrow S^3\to S^2$ and topological quantization $2s\in\mathbb{Z}$, Wess–Zumino (1971) / Witten (1983) higher-dimensional topological volume extensions, Mandelstam–Giles–Barrett Wilson-loop connection reconstruction modulo local gauge equivalence, and Feynman (1948)–Klauder (1979) spin coherent-state path integrals (`Literature`), establishing the unified model (`MODEL`) in which base points are fairness-squared shadows, phase fibers record swept sector volume, and Cornu cancellation carves classical geodesics**

**Lean-Facing Object / Locked GID:**
[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch), [`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product), [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)

**One-Line Invariant / Identity:**
$V_{\mathrm{sector}}(\Sigma_2) = \tfrac{1}{3}A_{\mathrm{cap}}(\Sigma_2) = \tfrac{1}{3}\Omega(\Sigma_2),\quad \gamma_B = -\tfrac{1}{2}A_{\mathrm{cap}} = -\tfrac{3}{2}V_{\mathrm{sector}},\quad \bigl((E \to \operatorname{Circle}) / N\bigr) \simeq_{\mathrm{t}*} \bigl(\operatorname{Fin}(m + k - n) \to \operatorname{Circle}\bigr)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral))

**Phase-Integral Standing-Wave Volume Emergence, Multi-Phase Arrival Bundle, Circle Phase-Density Pushforward, Closed-Loop Berry Cosine & Inverted Weyl Volume Law**（相位积分驻波成体、一点多相到达丛、圆周相位态密度前推、闭合贝里余弦与外尔体积倒读）

**Geometric Intuition Term (本书几何直觉语言):**
**Reference phase transport along a selected named spanning tree, compact Hausdorff quotient-group classification of multi-path fundamental chord-loop holonomies and anchored root-to-anchor path phases on finite graphs, arbitrary-length discrete rank-one chain closed Bargmann path product, single-qubit three-point Bargmann Bloch signed-volume trace, Haar-integral convergence of irrational-step circle orbit averages, finite cyclic-group annihilator character cancellation and standing-wave sieve, and rotated-real factorization of phase-locked complex overlaps (`LEAN ✓`); paired on the infinitesimal spherical trihedron $\Delta\mathcal{T}_\epsilon$ with the omnidirectional arrival phase bundle $\mathcal{F}(x) = \{\phi(\Gamma \to x)\}$ hosted by each fairness-squared quotient-shell base point $x$, measure pushforward along the phase functional $\Gamma \mapsto e^{i\Phi[\Gamma]}$ onto the unit circle $S^1$ to form the first Fourier centroid moment $\Psi(x) = \int_0^{2\pi}\rho(x,\phi)e^{i\phi}\,d\phi$, bidirectional fairness squaring canceling odd sine terms under path exchange to yield the coordinate-free closed-loop Berry cosine self-consistency identity $\lvert\Psi(x)\rvert^2 = \iint \mathcal{D}\Gamma_1\mathcal{D}\Gamma_2\cos\gamma_B(\Gamma_1\circ\Gamma_2^{-1}) = \langle\cos\gamma_B\rangle_x$, uniform phase-dispersion void cancellation $\rho = \frac{1}{2\pi} \implies \Psi = 0$ alongside the discrete Dirichlet coherence bound $\lvert C_M(\Delta\gamma)\rvert = \left|\frac{\sin(M\Delta\gamma/2)}{M\sin(\Delta\gamma/2)}\right| \le \bigl(M\lvert\sin(\Delta\gamma/2)\rvert\bigr)^{-1}$, and the five-stage path-density sweep $M \in \{3, 8, 16, 32, 64\}$ plus $\operatorname{ZMod} 12$ subgroup $H = \{0,3,6,9\}$ annihilator $\{0,4,8\}$ standing-wave benchmark (`manual derivation` / `NUM`), together with Bohr–Sommerfeld (1913/1916) and Kostant–Souriau (1970) geometric quantization integrality, the right-to-left ontological inversion of Weyl's (1912) asymptotic volume law $\mathrm{Vol}_\Omega \equiv (2\pi)^d N_{\mathrm{standing}}$, Ponzano–Regge (1968) / Rovelli–Smolin (1995) spin-foam $\mathrm{SU}(2)$ Haar stationary-phase volume emergence, and Gabor (1948) 3D standing-wave optical holography (`Literature`), establishing the causal-inversion model (`MODEL`) in which paths are phase integrals, destructive phase cancellation carves zero-volume void, and spatial volume condenses exclusively at uncancelled phase-locked standing-wave nodes**

**Lean-Facing Object / Locked GID:**
[`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product), [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch), [`continuous_average_tendsto_haar`](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar), [`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character), [`phase_locked_overlap_is_rotated_real`](lean:D5/S3/QuantumStates/PhaseLockedOverlap.phase_locked_overlap_is_rotated_real)

**One-Line Invariant / Identity:**
$\Psi(x) = \int_0^{2\pi}\rho(x,\phi)\,e^{i\phi}\,d\phi,\quad \lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x,\quad \mathrm{Vol}_\Omega \equiv (2\pi)^d \cdot N_{\mathrm{standing}}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.7](ch34-s07-standing-wave-volume.md#sec-ch34-standing-wave-volume-emergence))

**Four-in-One Clifford Monad of the Minimal Arc-Body, Gradient–Path–Phase Threefold Geometric Lock & Multi-Cell Boundary Cancellation Grade Sieve**（极小圆弧体的四位一体克利福德单胞、梯度—路径—相位三重几何锁与多胞边界抵消维度筛）

**Geometric Intuition Term (本书几何直觉语言):**
**Tetrahedral $3$-coboundary defect identity and $1$-cochain edge-potential exactness, spherical rotation-system opposite-dart boundary cancellation and cycle-space exactness, commutator gradient flow of Born projection probabilities under Hermitian generators, the Lagrange–Gram inner-product deficit and bivector wedge-square identity, existence of a unit common perpendicular axis for any pair of vectors in $\mathbb{R}^3$, and single-qubit three-point Bargmann signed-volume trace decomposition (`LEAN ✓`); paired on a single minimal spherical trihedron $\Delta\mathcal{T}_\epsilon$ ($N = 1$) with intrinsic natural-unit scale collapse $\epsilon_{\min}^0 = \epsilon_{\min}^1 = \epsilon_{\min}^2 = \epsilon_{\min}^3 = 1$, cotangent-gradient to tangent-path musical isomorphism $d\Psi \leftrightarrow \delta\mathbf{x} = (d\Psi)^\sharp$ upon first-step symmetry breaking from standing-wave equilibrium, unit-norm radial freezing $\operatorname{Re}\langle\psi\mid d\psi\rangle = 0$ locking first-order state variation onto Berry connection phase $\mathcal{A} = i\langle\psi\mid d\psi\rangle = d\phi$ and the two-wall covariant gradient commutator $[D_\mu, D_\nu]\psi = i\mathcal{F}_{\mu\nu}\psi$ onto minimal Berry phase $-\frac{1}{2}\Omega(\Delta\mathcal{T}_\epsilon)$, three-dimensional $1\text{-}3\text{-}3\text{-}1$ Hodge star duality $\star : \Lambda^2\mathbb{R}^3 \xrightarrow{\sim} \Lambda^1\mathbb{R}^3$ and $\star : \Lambda^3\mathbb{R}^3 \xrightarrow{\sim} \Lambda^0\mathbb{R}^3$ alongside minimal Stokes duality $\langle d\mathcal{A},\Delta\mathcal{T}_\epsilon\rangle = \langle\mathcal{A},\partial\Delta\mathcal{T}_\epsilon\rangle$, the canonical four-grade Clifford multivector encoding $\mathcal{M}(\Delta\mathcal{T}_\epsilon) \in \mathrm{Cl}_3$ satisfying $(\Lambda^0)^2 + \lVert\Lambda^1_{\mathrm{step}}\rVert^2 + (\Lambda^2)^2 = 1$, and the five-angle single-cell benchmark $\epsilon \in \{15^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$ plus $k \times k$ spherical-triangle subdivision ($N \in \{1,4,9,16,25\}$, cancelling $3k(k-1)$ interior opposite dart incidences with $1/k$ rim survival) and 3D $3 \times 3 \times 3$ ($N = 27$, cancelling $108$ of $162$ cell-face incidences to leave $54$ outer-shell faces) boundary cancellation checks (`manual derivation` / `NUM`), together with Clifford (1878) geometric algebra, Hodge (1941) star duality, Kähler's (1962) Dirac–Kähler operator, Hestenes–Sobczyk (1984) geometric calculus, and Lawvere (1967) / Kock (1981) synthetic differential geometry over $D = \{\epsilon \mid \epsilon^2 = 0\}$ (`Literature`), establishing the unified model (`MODEL`) in which the $N = 1$ minimal arc-body is simultaneously point gradient, minimal path, minimal Berry phase, and minimal volume before $\partial^2 = 0$ multi-cell cancellation sieves out macroscopic dimensions**

**Lean-Facing Object / Locked GID:**
[`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness), [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact), [`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`unit_perpendicular_pair`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair), [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)

**One-Line Invariant / Identity:**
$\mathcal{M}(\Delta\mathcal{T}_\epsilon) = \cos^2\!\frac{\epsilon}{2} + \frac{1}{2}\sin\epsilon(\mathbf{e}_{AB}+\mathbf{e}_{BC}) + \sin^2\!\frac{\epsilon}{2}\,\hat{\mathbf{I}}_{AC} + \frac{1}{3}\Omega(\epsilon)\,\mathbf{I}_3 \in \mathrm{Cl}_3,\quad (\Lambda^0)^2 + \lVert\Lambda^1_{\mathrm{step}}\rVert^2 + (\Lambda^2)^2 = 1,\quad \partial^2 = 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.8](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling))

**Reversal as Movement: Gram Dimensional Overflow, Arrival-Path Diagonalization & the Bi-Infinite Path Concept Cut**（反者道之动：格拉姆溢出开维、来路对角化与双无限路径概念切口）

**Geometric Intuition Term (本书几何直觉语言):**
**Unit-norm inner-product equality and quotient equivalence, two- and three-anchor real Gram determinant positivity criteria for linear independence, unit orthogonal residual escape from proper closed subspaces, equivalence between lowering rational escape-pair collision rate and strict joint-kernel refinement, pointwise catalog escape of the relative semantic diagonal under fixed-point-free twists, strict observation partition-topology refinement under complete diagonal joins, and the six orthogonal-complement projection identities alongside double-orthogonal topological closure (`LEAN ✓`); paired under the zero-background Axiom of Comparison $\mathcal{A}_0$ with the five-step Gram determinant and `EscapePairs` overflow ladder (`0D` Point $\langle u,v\rangle=1$ $\to$ `1D` Line $\det G_2=\sin^2\theta>0$ $\to$ `2D` Surface $\det G_3>0$ $\to$ `3D` Volume $\det G_4>0 / S^\perp\neq\{0\}$ $\to$ `3+1D` Time, where bidirectional fairness squaring $\lvert\psi\rvert^2$ folds distinct arrival phases onto the same 3D standing-wave node to create `EscapePairs > 0`, forcing strict joint-kernel refinement along a fourth orthogonal temporal axis), explicit $+\pi\bmod 2\pi$ main-diagonal phase flipping on a single point's $4\times 4$ arrival-path lookup table $T$ generating $\Gamma_{\mathrm{diag}}$ and strictly refining partition topologies $T\to T'\to T''$, and linear cut-contrast collapse $\Delta_{\mathrm{cut}}(\kappa_-)=\kappa_-$ of $P_{\mathrm{eff}}(\kappa_-)=P_M+(1-\kappa_-)P_{M^\perp}$ to $0\;\mathrm{bits}$ at $\kappa_-=0$ (`manual derivation` / `NUM`), together with Cantor's (1891) diagonal construction, Gödel's (1931) incompleteness theorems, Lawvere's (1969) categorical diagonal fixed-point theorem, homotopy type theory (HoTT 2013) iterated loop-space towers $\Omega^n(X,x)$, Laozi's *Dao De Jing* Ch. 40 ("reversal is the movement of the Way"), Spinoza's (1674) *determinatio negatio est*, Dedekind (1872) / Conway (1976) two-sided cuts $\{L\mid R\}$, and Birkhoff–von Neumann (1936) quantum orthocomplemented lattices (`Literature`), establishing the five-tier self-referential concept cascade (`Point → Line → Surface → Volume → Time`) in which tier $k$'s unreachable overflow $M_k^\perp$ inverts into tier $(k+1)$'s reachable generator $M_{k+1}$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`two_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_pos_iff), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`lowersEscape_iff_strict_kernel_novelty`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty), [`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode), [`complete_diagonal_strict_topology_refinement`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure)

**One-Line Invariant / Identity:**
$\det G_k > 0 \;\Rightarrow\; D \to D+1,\quad \phi_{\mathrm{diag}}^{(k)} = (\phi_k^{(k)}+\pi)\bmod 2\pi \neq \phi_k^{(k)},\quad \mathcal{H} = M \oplus M^\perp,\quad M^{\perp\perp} = \overline{M},\quad \Delta_{\mathrm{cut}}(\kappa_-) = \kappa_-$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.9](ch34-s09-reversal-and-concept-cascade.md#sec-ch34-reversal-diagonal-and-concept-cascade), [Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison))

**Complete-Graph $K_N$ Comparability, Triangle-Like Stability of the Minimal Arc-Body & the 3D Rigidity Lock**（新旧概念全连通 $K_N$、极小圆弧体“三角形稳定性”与三维空间刚性锁死）

**Geometric Intuition Term (本书几何直觉语言):**
**Ambient unitary rigidity extension from equal column Gram matrices, 3D real Bloch decomposition of $2\times 2$ Hermitian matrices and unit-sphere pure-state criterion, explicit three-anchor real Gram determinant formula and positivity criterion for linear independence, Fubini–Study spherical triangle inequality on unit states, exact finite-word generation of $\mathrm{SO}(3)$ from rotations about any two non-collinear axes, spherical Euler rotation-system face-boundary kernel and simple-cycle exactness, and tetrahedral coboundary defect identity, anchored repair bounds, and one-cochain exactness on ordered simplices (`LEAN ✓`); paired under the zero-background Axiom of Comparison $\mathcal{A}_0$ with complete-graph comparability $K_{N+1}$ ($E=\binom{N+1}{2}$) between every new concept $C_{N+1}$ and all old concepts eliminating isolated 1D edges in favor of minimal spherical arc-bodies $\Delta\mathcal{T}_\epsilon$, the Maxwell–Laman 3D rigidity surplus polynomial $\Delta E(N)=\binom{N}{2}-(3N-6)\equiv\frac{(N-3)(N-4)}{2}$ hitting dual exact isostatic roots at the elementary arc-body $N=3$ and closed tetrahedral shell $N=4$ ($\Delta E(3)=\Delta E(4)=0$), continuous shear $c_{13}(\gamma)=\frac{1}{4}+\frac{3}{4}\cos\gamma$ of an equilateral $\theta_0=60^\circ$ spherical four-bar linkage $C_4$ versus zero-shear lock of the regular tetrahedron $K_4$ ($\det G_3=0.5000$, $\theta_{\mathrm{tet}}=\arccos(1/3)\approx 70.5288^\circ$), and positive Regge hinge deficit angles triggered when the 10th chord of $K_5$ ($\Delta E(5)=+1$) departs from its flat Euclidean value $2\sqrt{6}/3\approx 1.6330$ ($\delta_e^{(3)}\approx +148.4137^\circ$ for $3$ tetrahedra and $\delta_e^{(5)}\approx +7.3561^\circ$ for $5$ tetrahedra, `manual derivation` / `NUM`), together with Cauchy (1813) / Dehn (1916) / Gluck (1975) 3D polyhedral rigidity, Maxwell (1864) / Laman (1970) isostatic bar counts, Frobenius (1878) / Hurwitz (1898) normed division-algebra associativity ceiling at $\mathbb{H}$ ($\operatorname{Im}\mathbb{H}\cong\mathbb{R}^3$), Serre (1966) $\mathfrak{su}(2)$ root-triple generation of compact semisimple Lie algebras, Cook (1971) / Tseitin (1968) `3-SAT` completeness and reduction, and Regge (1961) / Pachner (1991) simplicial deficit-angle gravity and $2\leftrightarrow 3$ bistellar flips (`Literature`), establishing the macroscopic 3D spatial rigidity lock and conversion of $N\ge 5$ relational surplus into intrinsic gravitational curvature and sequential time (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq), [`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian), [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff), [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)

**One-Line Invariant / Identity:**
$B^\dagger B = A^\dagger A \;\Rightarrow\; \exists U \in \mathrm{U}(m,\mathbb{C}),\; B = UA,\quad \Delta E(N) = \binom{N}{2} - (3N - 6) = \frac{(N-3)(N-4)}{2},\quad \delta_e = 2\pi - \sum_{k\ni e}\theta_k$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability), [Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison))

**Minimal Quantum Circular-Arc Differential, Path-Integral Stitching of Macrophysics & the Righted Calculus Duality**（量子极小圆弧微分元、路径积分缝合宏观物理与扶正的微积分对偶）

**Geometric Intuition Term (本书几何直觉语言):**
**Unit-norm bidirectional orthogonal balance and the Lagrange–Gram identity, complete normed-algebra finite-order exponential Taylor tail bound, Lie–Trotter product convergence under smooth $1/N$ subdivision, the Robertson–Schrödinger exact variance–commutator Pythagorean decomposition, circle double-cover unique history path lifting and $360^\circ$ sheet exchange, strictly positive golden cut-and-project Delone packing radius $r_{\mathrm{pack}} = \frac{1}{2}$, the multi-step discrete Bargmann path-product identity, tetrahedral simplicial two-cochain defect repair and exactness, and the unitary-pinching coherence-deletion von Neumann entropy identity (`LEAN ✓`); paired with the single-arc split between first-order flat tangent $\sin\epsilon = \epsilon - \frac{\epsilon^3}{6} + O(\epsilon^5)$ and second-order normal sagitta $1 - \cos\epsilon = \frac{\epsilon^2}{2} - \frac{\epsilon^4}{24} + O(\epsilon^6)$ alongside Girard spherical excess $\Omega(\epsilon) = 2\arctan(\tan^2\frac{\epsilon}{2}) = \frac{\epsilon^2}{2} + \frac{\epsilon^4}{12} + O(\epsilon^6)$ (six-decimal benchmarks across $\epsilon \in \{60^\circ, 30^\circ, 10^\circ, 1^\circ\}$), the scaling bifurcation between smooth Trotter decay $N(1-\cos\frac{1}{N})\to 0$ and diffusive Feynman–Itô conservation $N(1-\cos\frac{1}{\sqrt{N}}) = \frac{1}{2} - \frac{1}{24N} + O(N^{-2}) \to 0.500000 \neq 0$ ($N \in \{1, 10, 100, 1000\}$), and $41$-path circular-arc bundle refraction $m_{\mathrm{stat}}(\beta) = -\frac{8\beta}{\pi}$ under $\Phi(m;\beta) = \frac{\pi}{16}m^2 + \beta m$ with coarse-pinching entropy tax $\Delta S_{\mathrm{vN}} = \ln 41 \approx 5.357552\;\mathrm{bits}$ ($1\;\mathrm{bit}$ per folded mirror pair, `manual derivation` / `NUM`), together with Leibniz (1684) / Newton (1687) tangent calculus linearization, Itô's (1944) Brownian quadratic variation $(dW_t)^2 = dt$, Feynman's (1948) sum-over-histories derivation of $[\hat{x},\hat{p}] = i\hbar$ and least action $\delta S = 0$, Kac's (1949) Wiener-measure Feynman–Kac formula, Cameron's (1960) real-time complex-measure no-go theorem, Trotter's (1959) operator product formula, Aharonov–Bohm (1959) / Berry (1984) loop holonomy, Bargmann's (1964) multi-vertex ray invariant, and Regge (1961) / Ponzano–Regge (1968) / Rovelli–Smolin (1995) simplicial hinge deficits and spin foams (`Literature`; `3+1D` Lorentzian continuum Einsteinian gravity marked `OPEN`), righting the century-inverted calculus duality in which quantum mechanics is the minimal circular-arc differential ($\delta$) and macroscopic physics is the path-integrated coarse-grained envelope ($\int$: "stitching curves into straightness; in-phase forms volume; leaked phase becomes heat", `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le), [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product), [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone), [`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)

**One-Line Invariant / Identity:**
$1 - \cos\epsilon = \tfrac{\epsilon^2}{2} + O(\epsilon^4),\quad \lim_{N\to\infty} N\bigl(1 - \cos\tfrac{1}{\sqrt{N}}\bigr) = \tfrac{1}{2} > 0,\quad \operatorname{bargmann}(\Psi) = \Bigl(\prod_{j=0}^{n-1}\Psi_j^\dagger\Psi_{j+1}\Bigr)(\Psi_n^\dagger\Psi_0),\quad \Delta S_{\mathrm{vN}} = \sum_{k=0}^{N-1} D\bigl(\tilde{\rho}_k \,\Vert\, \Pi_{\mathrm{diag}}(\tilde{\rho}_k)\bigr) \ge 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral), [Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), [App E](appendix-e.md))

**One Arc Begets Three Phases, Triadic Line–Surface–Volume / Particle–Wave–Field Isomorphism & Mutual Path-Integral Reversal Loop**（一弧生三相（线·面·体 $\leftrightarrow$ 粒子·波·场）与万物互为路径积分回环）

**Geometric Intuition Term (本书几何直觉语言):**
**Finite cyclic Poisson bidirectional summation across subgroups and annihilators, the orthogonal annihilator character sieve cancelling outside the subgroup, convergence of irrational circular-arc orbital averages to unit-circle Haar measure, the six orthogonal-complement projection identities, the Lagrange–Gram unit-sphere balance identity, exact finite-word triadic generation of $\mathrm{SO}(3)$ from two non-collinear circular-arc axes, strict positivity of three-anchor Gram determinants, scalar-cosine and oriented-volume decomposition of the qubit three-vertex Bargmann trace, and tetrahedral simplicial two-cochain defect repair with one-cochain exactness (`LEAN ✓`); paired with the three-order unfolding of a unit-sphere minimal circular arc locked onto the integer three by $\dim\mathfrak{su}(2)=\dim\mathfrak{so}(3)=3$ and the three-step exterior complex $\Lambda^0\xrightarrow{\nabla}\Lambda^1\xrightarrow{\nabla\times}\Lambda^2\xrightarrow{\nabla\cdot}\Lambda^3\to 0$ ($d^2=0$)—first-order tangential chord $\sin\epsilon=\epsilon-\frac{\epsilon^3}{6}+O(\epsilon^5)$ (Line $\equiv$ Particle), second-order normal sagitta $1-\cos\epsilon=\frac{\epsilon^2}{2}+O(\epsilon^4)$ and Girard excess $\Omega(\epsilon)=2\arctan(\tan^2\frac{\epsilon}{2})$ (Surface $\equiv$ Wave), and third-order local box $\sin^3\epsilon=\epsilon^3+O(\epsilon^5)$ alongside sector/Bargmann volumes $V_{\mathrm{sector}}=\Omega/3,\;\operatorname{Im}\Delta_3^\perp=\frac{1}{4}\sin^2\epsilon$ (Volume $\equiv$ Field, verified to four decimals across $\epsilon\in\{60^\circ,30^\circ,10^\circ,1^\circ,0^\circ\}$)—plus the $\mathbb{Z}/12\mathbb{Z}$ Poisson duality loop across localized particle $H_0=\{0\}$, standing-wave lattice $H_3=\{0,3,6,9\}$ ($H_3^\perp=\{0,4,8\}$), and omnipresent field $H_{12}=\mathbb{Z}/12\mathbb{Z}$ with exact peripheral cancellation across all $11$ off-origin sites (`manual derivation` / `NUM`), together with Pontryagin (1934) locally compact abelian duality, Cartan (1945) / de Rham (1955) exterior complexes $d^2=0$, Schwinger (1951) proper-time worldline field theory and Feynman–Hibbs (1965) path integrals, Wilson (1974) lattice gauge links $U_e\in G$, and Levin–Wen (2005) string-net condensation (`Literature`; non-perturbative `3+1D` Lorentzian continuum QFT measures and chiral Standard Model lattice fermions bounded by Appendix E `H8`/`H9`, `OPEN`), establishing the zero-brick ontological loop in which one minimal circular arc integrates out all fields and peripheral field cancellation re-begets localized particles ("reversal is the movement of the Dao", `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation), [`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character), [`continuous_average_tendsto_haar`](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff), [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)

**One-Line Invariant / Identity:**
$\sum_{h\in H} f(h) = \frac{\lvert H\rvert}{m}\sum_{k\in H^\perp}(\operatorname{ZMod.dft}\,f)(k),\quad \sum_{k\in H^\perp}\chi_k(x) = \lvert H^\perp\rvert\,\mathbf{1}_{x\in H},\quad \Lambda^0 \xrightarrow{\nabla} \Lambda^1 \xrightarrow{\nabla\times} \Lambda^2 \xrightarrow{\nabla\cdot} \Lambda^3 \to 0,\quad \operatorname{Im}\operatorname{tripleBargmann}(r_1,r_2,r_3) = \tfrac{1}{4}\,r_1\cdot(r_2\times_3 r_3)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.12](ch34-s12-triadic-duality.md#sec-ch34-triadic-duality-and-field-loop), [Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), [App E](appendix-e.md))

**Point–Volume Octave Helix, 1—3—3—1 Hodge Reset, Cross-Level Renormalization & Particle-as-Field Duality**（点体同源八度螺旋（1—3—3—1 霍奇归零）、跨层重整化捏合与粒子即场对偶）

**Geometric Intuition Term (本书几何直觉语言):**
**Unit-modulus overlap pure-state indistinguishability, the three-anchor Gram determinant volume closure formula, the triple-anchor Bargmann–Bloch scalar triple-product identity, six closed-subspace orthogonal-complement idempotent projection identities, finite-record unread pinching idempotence, golden-helix intra-octave Fourier character deck preservation paired with joint discrete-level step detection, finite cyclic subgroup–annihilator Poisson summation and character orthogonality cancellation, and the golden cut-and-project strictly positive Delone packing radius $r_{\mathrm{pack}} = \frac{1}{2}$ (`LEAN ✓`); paired with directional saturation and $\mathrm{SO}(3)$ rotational isotropy reset across the exterior binomial dimension sequence $\dim\Lambda^k(\mathbb{R}^3) = (1,3,3,1)$ ($\det G_3 = \frac{1}{2} = 0.500000$ and $\operatorname{tripleBargmann} = \frac{5}{8} + \frac{\sqrt{2}}{8}i \approx 0.625000 + 0.176777i$ at symmetric $\epsilon = 60^\circ$), discrete Helmholtz–Yukawa Green reciprocity $(-\Delta_{\mathrm{lat}} + m^2 I)G = \delta_{\mathbf{0}}$ on the periodic cubic lattice $(\mathbb{Z}/4\mathbb{Z})^3$ ($G(\mathbf{0}) = \frac{523}{3003} \approx 0.174159$ and nearest-neighbor wing $G(\mathbf{e}_1) = \frac{47}{1287} \approx 0.036519$ at $m=1$), ultraviolet self-energy regularization by the positive packing floor $r_{\mathrm{pack}} = \frac{1}{2}$ (Coulomb field energy $E_{\mathrm{field}}(\frac{1}{2};0) = \frac{1}{4\pi} \approx 0.079577$ vs. bare-point divergence as $r_{\min}\to 0^+$, and Yukawa field energy $E_{\mathrm{field}}(\frac{1}{2};1) = \frac{3}{8\pi e} \approx 0.043912$), and exact zero-approximation Poisson point–field reciprocity between $\lvert H_0\rvert = 1$ and $\lvert H_0^\perp\rvert = 12$ on $\mathbb{Z}/12\mathbb{Z}$ (invariant product $\lvert H\rvert\cdot\lvert H^\perp\rvert = 12$, `manual derivation` / `NUM`), together with Hodge's (1941) exterior differential forms and Hodge star duality $\star : \Lambda^k \to \Lambda^{n-k}$, Yukawa's (1935) finite-range screened nuclear potential $\frac{e^{-mr}}{4\pi r}$ and distributional Helmholtz–Yukawa Green equation $(-\nabla^2+m^2)G = \delta^{(3)}$, Schwinger's (1951) proper-time worldline propagator representation, and Wilson's (1971, 1974) renormalization-group block-spin coarse-graining and effective UV cutoffs (`Literature`; continuum distributions and gauge dynamics bounded by Appendix E `H6`/`H8`, with the `3+1D` non-Abelian Yang–Mills mass gap marked `OPEN`), establishing the cross-level octave-helix renormalization model in which volume resets to point ($\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$) and every single particle is simultaneously a field (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula), [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`golden_helix_fourier_readout_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_fourier_readout_step), [`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step), [`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation), [`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character), [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone)

**One-Line Invariant / Identity:**
$\dim\Lambda^k(\mathbb{R}^3) = (1,3,3,1),\quad (-\nabla^2 + m^2)G = \delta^{(3)},\quad \sum_{h\in H} f(h) = \tfrac{\lvert H\rvert}{m}\sum_{k\in H^\perp}(\operatorname{ZMod.dft}\,f)(k),\quad r_{\mathrm{pack}} = \tfrac{1}{2} > 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field), [Ch 10](ch10-gram-geometry-and-order.md), [Ch 15](ch15-grover-qft-and-period-finding.md), [Ch 31 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion), [Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), [App E](appendix-e.md))

**Spatial Path-Integral Time, Lorentz Minus Sign $\mathbf{I}_3^2 = -1$, Standard Model `1—2—3` Gauge Ceiling & Point–Line–Surface–Volume Octave**（空间路径积分生时与洛伦兹负号（$\mathbf{I}_3^2 = -1$）、标准模型 `1—2—3` 规范群封顶与“点·线·面·体”跨层八度）

**Geometric Intuition Term (本书几何直觉语言):**
**Single-qubit Pauli Weyl anticommutation and involution laws, explicit $2\times 2$ traceless Bloch matrix expansion, real hyperbolic norm conservation, Minkowski null-cone quadratic-form scalar rigidity, Jordan–Wigner fermionic on-site canonical anticommutation normalization and distinct-site anticommutativity, named spanning-tree 1D circle phase transport and finite-graph anchored gauge-holonomy classification, non-collinear two-axis finite rotation words, the three-anchor Gram determinant positivity criterion for linear independence, finite-record unread pinching idempotence, and finite cyclic subgroup–annihilator Poisson summation (`LEAN ✓`); paired with the intrinsic negative square $\mathbf{I}_3^2 = -1$ of the saturated volume pseudoscalar $\mathbf{I}_3 = \mathbf{e}_1\mathbf{e}_2\mathbf{e}_3 = iI_2$ in purely positive-definite $\mathcal{Cl}_{3,0}(\mathbb{R})$, the intra-octave multivector metric $\langle(c\,dt\,\mathbf{I}_3 + d\mathbf{x})^2\rangle_0 = -c^2 dt^2 + d\mathbf{x}^2$ and post-octave paravector determinant $\det(c\,dt\,I_2 + B(d\mathbf{x})) = c^2 dt^2 - d\mathbf{x}^2$, the five-velocity proper-time standing-wave budget $(d\tau/dt)^2 = 1-\beta^2$ across $\beta \in \{0, 0.5, 0.8, 0.99, 1\}$, orthogonal three-color baryon full-rank closure $\det G_3(\mathbf{e}_R,\mathbf{e}_G,\mathbf{e}_B) = 1.0000$ versus duplicate-color diquark exclusion $\det G_3 = 0.0000$, integer nucleon charge closure ($+1, 0$), and the charged-pion Yukawa Compton range $\lambda_\pi = \hbar c/(m_{\pi^\pm} c^2) \approx 1.4138\;\mathrm{fm}$ versus proton charge radius $r_p \approx 0.8409\;\mathrm{fm}$ (screened flux factor $0.8798$, `manual derivation` / `NUM`), together with Hestenes's (1966) spacetime Clifford algebra, Baylis's (1999) Algebra of Physical Space (APS) paravector metric, Yang & Mills's (1954) non-Abelian gauge theory, the Glashow–Weinberg–Salam (1961–1968) electroweak unification and Englert–Brout–Higgs (1964) mass mechanism, Fritzsch–Gell-Mann–Leutwyler's (1973) quantum chromodynamics, Wilson's (1974) lattice area-law confinement criterion, Yukawa's (1935) meson-exchange nuclear potential, and Heisenberg & Euler's (1936) virtual $e^+e^-$-loop nonlinear effective electromagnetic vacuum (`Literature`; continuum gauge dynamics bounded by Appendix E `H6`/`H8`/`H9`, with the `3+1D` continuum non-Abelian Yang–Mills mass gap and chiral lattice Standard Model fermion construction marked `OPEN`), establishing the cross-level octave model uniting spatial path-integral time emergence with the Standard Model particle–field hierarchy (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star), [`B_formula_core`](lean:D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core), [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`fullC_CAR`](lean:D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_CAR), [`fullC_anticomm_of_lt`](lean:D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_anticomm_of_lt), [`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation)

**One-Line Invariant / Identity:**
$\mathbf{I}_3^2 = (\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3)^2 = -1,\quad \det\bigl(c\,dt\,I_2 + B(d\mathbf{x})\bigr) = c^2 dt^2 - d\mathbf{x}^2,\quad \mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C,\quad \Lambda^3_{\mathrm{color}} \cong \Lambda^0_{\mathrm{hadron}}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave), [Ch 14](ch14-cloning-codes-and-braids.md), [Ch 17](ch17-lorentz-geometry.md), [Ch 18](ch18-spinors-and-gauge-curvature.md), [Ch 25](ch25-rewriting-and-xor.md), [App E](appendix-e.md))

**Quantum Gates as Minimal Circular-Arc Trihedra, Orthogonal Gate-Commutator Excess & Bottom-Up Six-Tier Cosmic Concept Tower (`L0`–`L5`)**（量子门即极小圆弧体、正交门换位角盈与自底向上六层宇宙概念塔（`L0`–`L5`））

**Geometric Intuition Term (本书几何直觉语言):**
**The Lagrange–Gram two-vector wedge area-deficit identity, single-qubit Pauli Weyl anticommutation and involution laws, explicit $2\times 2$ traceless Bloch matrix expansion, full $\mathrm{SO}(3)$ generation by non-collinear two-axis finite rotation words, bipartite CHSH operator-square collapse $S^2 = 4\cdot 1$ under local commutativity, rank-one Bell pure-state idempotence with maximally mixed local marginal $\frac{1}{2}I_2$, the three-anchor Gram determinant positivity criterion for linear independence, Jordan–Wigner on-site canonical anticommutation normalization, finite-graph named spanning-tree anchored gauge-holonomy classification, finite cyclic subgroup–annihilator Poisson summation reciprocity, Minkowski null-cone quadratic-form scalar rigidity, stepwise unitary-plus-pinching coherence-deletion relative-entropy production, and circle double-cover history path lifting with no continuous global section and full-turn $2\pi$ sheet exchange, alongside leave-one-out escape-pair disjoint union decomposition, finite-domain full-table copy zero retrospective loss versus non-anticipation failure, and the invariant common factor requirement for cross-context objective claims (`LEAN ✓`); paired with continuous single-qubit circular-arc rotor gates $\hat{U}_{\mathbf{n}}(\epsilon) = \cos\frac{\epsilon}{2}I_2 - i\sin\frac{\epsilon}{2}(\mathbf{n}\cdot\boldsymbol{\sigma})$ versus zero-curvature Boolean jumps ($\Omega = 0$), the exact non-perturbative four-step orthogonal gate commutator $\hat{C}_{xy}(\epsilon) = (1 - 2\sin^4\frac{\epsilon}{2})I_2 - 2i\sin^2\frac{\epsilon}{2}(-\sin\frac{\epsilon}{2}\cos\frac{\epsilon}{2}\sigma_x + \sin\frac{\epsilon}{2}\cos\frac{\epsilon}{2}\sigma_y + \cos^2\frac{\epsilon}{2}\sigma_z)$, its $\mathrm{SO}(3)$ Bloch rotation angle $\Phi_{\mathrm{comm}}(\epsilon) = 2\arccos(1 - 2\sin^4\frac{\epsilon}{2})$ and spinor Berry half-angle $\gamma_{\mathrm{gate}}(\epsilon) = \frac{1}{2}\Phi_{\mathrm{comm}}(\epsilon) = \frac{\epsilon^2}{2} + O(\epsilon^4) = \Omega(\Delta\mathcal{T}_\epsilon) + O(\epsilon^4)$ benchmarked to six decimals across $\epsilon \in \{10^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$ (with Cauchy–Schwarz collapse to $\lvert\langle S_{\mathrm{CHSH}}\rangle\rvert \le 2$ as $\Omega \to 0$), two-qubit entangling Segre wedge concurrence $\mathcal{C}(\eta) = \lvert\sin\eta\rvert$ and marginal linear entropy $S_{\mathrm{lin}}(\rho_A) = \frac{1}{2}\sin^2\eta$ for $\hat{U}_{\mathrm{ent}}(\eta)\lvert 00\rangle$, the universal `1—3—3—1` four-beat exterior grammar $\Lambda^0_\ell \to \Lambda^1_\ell \to \Lambda^2_\ell \to \Lambda^3_\ell \overset{\star}{\longleftrightarrow} \Lambda^0_{\ell+1}$ paired with intrinsic volume pseudoscalar proper time $(\mathbf{I}_3^{(\ell)})^2 = -1$, the Dottie self-referential cosine fixed point $\cos\theta^* = \theta^* \approx 0.739085\;\mathrm{rad}$ ($42.3465^\circ$), and the two-turn spinor closure $\hat{U}_{\mathbf{n}}(2\pi) = -I_2,\;\hat{U}_{\mathbf{n}}(4\pi) = +I_2$ (`manual derivation` / `NUM`), together with Solovay–Kitaev (1995/1997) polylogarithmic universal gate compilation, Nielsen's (2006) Finsler circuit complexity geometry, Wootters's (1998) concurrence and the Horodecki et al. (1995) optimal CHSH criterion, Levin & Wen's (2005) string-net condensation unifying emergent gauge bosons and fermions, Swingle's (2012) MERA and Pastawski et al.'s (2015) HaPPY holographic quantum error-correcting tensor networks, Regge's (1961) simplicial gravity, Bekenstein–Hawking (1973/1975) horizon area entropy, and Zurek's (2009) Quantum Darwinism (`Literature`; continuum gauge dynamics and the UV-complete `3+1D` quantum-gravity continuum limit governed by Appendix E `H6`/`H8`/`H9` and marked `OPEN`), establishing the bottom-up Six-Tier Cosmic Concept Tower (`L0`–`L5`) pivoted on the quantum-gate minimal circular-arc trihedron and closing back to `L0` via a $4\pi$ one-sided Möbius twist (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`qubit_weyl_star`](lean:D5/S3/Quantum/FiniteDimensional.qubit_weyl_star), [`B_formula_core`](lean:D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`chsh_square_eq_four_of_local_pair_commutes`](lean:D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes), [`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff), [`fullC_CAR`](lean:D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_CAR), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`escapePairs_without_eq_union`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union), [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)

**One-Line Invariant / Identity:**
$\gamma_{\mathrm{gate}}(\epsilon) = \arccos\!\bigl(1 - 2\sin^4\!\tfrac{\epsilon}{2}\bigr) = \Omega(\Delta\mathcal{T}_\epsilon) + O(\epsilon^4),\quad \mathcal{C}(\eta) = \lvert\sin\eta\rvert,\quad \Lambda^0_\ell \to \Lambda^1_\ell \to \Lambda^2_\ell \to \Lambda^3_\ell \overset{\star}{\longleftrightarrow} \Lambda^0_{\ell+1},\quad \hat{U}_{\mathbf{n}}(4\pi) = +I_2$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.15](ch34-s15-quantum-gates-and-concept-tower.md#sec-ch34-quantum-gate-and-cosmic-concept-tower), [Ch 11](ch11-pulses-and-virtual-z.md), [Ch 13](ch13-entanglement-and-chsh.md), [Ch 19](ch19-tensor-networks-and-holography.md), [Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), [Ch 38](ch38-observer-memory-pointer-and-ontological-qram.md), [Ch 39](ch39-observer-is-ontological-universe.md), [App E](appendix-e.md))

**Symmetry Breaking & Conservation as One Coset Trihedron $\Delta\mathcal{T}_\epsilon \subset G/H$, Cartan–CCWZ Curvature Splitting & Five Concept-Tower Families**（破缺与守恒同体：陪集极小圆弧体（$\Delta\mathcal{T}_\epsilon \subset G/H$）、嘉当曲率拆账与五大物理概念塔谱系）

**Geometric Intuition Term (本书几何直觉语言):**
**Observation partition-topology inseparability kernel criterion, real-vector Lagrange–Gram identity and complete complex inner-product monitored complementary-projection return probability conservation, semi-conjugate covariant commutator factorization, non-collinear two-axis finite rotation words, three-anchor Gram determinant positivity criterion for linear independence, finite directed-graph named spanning-tree anchored gauge-holonomy classification, real hyperbolic norm conservation and Minkowski null-cone quadratic-form scalar rigidity, finite cyclic subgroup–annihilator Poisson summation, finite-dimensional computational-basis pinching coherence-deletion relative-entropy production identity, cross-contextual objective interpretation invariant common-factor extraction, and positive cosine fixed-point rational inverse endpoint (`LEAN ✓`); paired with symmetric reductive Lie-algebra $\mathfrak{g} = \mathfrak{h}\oplus\mathfrak{m}$ Maurer–Cartan splitting $U^{-1}dU = e^a X_a + \omega^i T_i$ and the Cartan–CCWZ curvature identity $F^i(\omega) = -\frac{1}{2}f^i_{ab}\,e^a\wedge e^b$, the six-angle $\epsilon \in \{0^\circ, 15^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$ Pythagorean budget $\cos^2\epsilon+\sin^2\epsilon=1.000000$ versus $-d\omega^3 = e^1\wedge e^2 = \sin\theta\,d\theta\wedge d\phi$ and Girard trihedral excess $\Omega(\Delta\mathcal{T}_\epsilon)=2\arctan(\tan^2\frac{\epsilon}{2})$ table on $\mathrm{SU}(2)/\mathrm{U}(1)\cong S^2$, exact electroweak $\mathrm{SU}(2)_L\times\mathrm{U}(1)_Y \to \mathrm{U}(1)_{\mathrm{em}}$ real bosonic DOF conservation $4\times 2 + 4 = 3\times 3 + 1\times 2 + 1 = 12$ (on-shell $\sin^2\theta_W \approx 0.223052$, $\lambda_W \approx 2.455018\times 10^{-3}\;\mathrm{fm}$, $\lambda_Z \approx 2.163967\times 10^{-3}\;\mathrm{fm}$), a naive scale comparison of the sum of light-quark renormalized running mass parameters $2m_u+m_d = 8.99\;\mathrm{MeV}$ with $m_p = 938.272\;\mathrm{MeV}$ ($\overline{\mathrm{MS}}$, $\mu=2\;\mathrm{GeV}$; arithmetic remainder $99.04\%$, not a physical mass decomposition), Skyrmion winding $B = +1$, and the superconducting Cooper-pair half-flux quantum $\Phi_0 = \frac{h}{2e} \approx 2.067834\times 10^{-15}\;\mathrm{Wb}$ (`manual derivation` / `NUM`), together with Noether's (1918) continuous-symmetry conservation theorem, Nambu–Goldstone (1960–1962) massless broken modes, Cartan (1926) and Callan–Coleman–Wess–Zumino (1969) nonlinear coset effective field theory, Anderson (1963) and Englert–Brout–Higgs (1964) `2+1=3` gauge screening mass generation, Skyrme (1961) and Witten (1983) $\pi_3(G/H)=\mathbb{Z}$ topological baryon solitons and WZW anomaly, MacDowell–Mansouri (1977) / Stelle–West (1980) Cartan gauge gravity, and BCS / London–Meissner / Abrikosov (1933–1957) superconducting vortex theory (`Literature`; purely analytic first-principles `3+1D` QCD color confinement and dynamical chiral breaking alongside UV-complete `3+1D` quantum gravity bounded by Appendix E `H6`/`H8`/`H9`, marked `OPEN`), establishing the four-beat coset-trihedron bootstrap and the five-family cross-tower cascade relay (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff), [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation), [`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**One-Line Invariant / Identity:**
$\cos^2\epsilon + \sin^2\epsilon = 1,\quad F^i(\omega) = -\frac{1}{2}f^i_{ab}\,e^a \wedge e^b,\quad 2_{\Lambda^2} + 1_{\Lambda^1} = 3_{\Lambda^3},\quad B = \frac{1}{24\pi^2}\int_{S^3}\operatorname{Tr}\bigl((U^{-1}dU)^3\bigr) \in \mathbb{Z},\quad \Phi_0 = \frac{h}{2e}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers), [Ch 8](ch08-erasure-and-time-arrows.md), [Ch 9](ch09-axes-and-state-addressing.md), [Ch 17](ch17-lorentz-geometry.md), [Ch 18](ch18-spinors-and-gauge-curvature.md), [Ch 33](ch33-all-beings-observers-and-mutual-attractors.md), [App E](appendix-e.md))

**Cross-Horizon Entanglement Arc-Bodies, Bounded Non-Presumption Partial Trace, Modular Temperature & Laws of Thermodynamics**（跨边界极小圆弧体纠缠、“受限不妄我”偏迹视界、模流有效温度与热力学四律）

**Geometric Intuition Term (本书几何直觉语言):**
**Product-state right and left marginal recovery identities, rank-one Bell pure-state idempotence with maximally mixed local marginal $\frac{1}{2}I_2$, bipartite traceless Hermitian orthogonal decomposition into local marginal and correlation blind-spot sectors, reduced-state irreversibility as environmental record access defect, leave-one-out `escapePairs` disjoint union decomposition, single-qubit computational-basis pinching Hilbert–Schmidt Pythagoras, stepwise unitary-plus-pinching coherence-deletion relative-entropy production, Gibbs thermal free-energy relative-entropy difference identity, Landauer balance identity with nonnegative heat bound and exact saturation criterion, extended quantum relative-entropy channel data-processing inequality, and positive cosine fixed-point rational inverse endpoint (`LEAN ✓`); paired with pure-state Schmidt decomposition $\lvert\Psi_{AB}(\theta)\rangle = \cos\theta\lvert 0_A 0_B\rangle + \sin\theta\lvert 1_A 1_B\rangle$ local-versus-entanglement Pythagorean budget $P_{\mathrm{loc}}(\theta) + C_{\mathrm{ent}}(\theta) = \cos^2(2\theta) + \sin^2(2\theta) = 1$, two-level spectrum-matching modular Hamiltonian $K_A = -\ln\rho_A$ and effective modular temperature parametrization $\frac{k_B T_{\mathrm{eff}}(\theta)}{\Delta E} = \frac{1}{2\ln\cot\theta}$ (strictly distinguished from physical bath thermometers and the Rindler Bisognano–Wichmann Unruh temperature $k_B T_U = \frac{\hbar a}{2\pi c}$), the deterministic $12$-qubit nested-pair cut tent curve $S(A;\theta) = \min(N_A, 12-N_A)S_A(\theta)$ (contrasted with Haar-random typical Page entropy), and six-decimal benchmarks at the Dottie homeostatic root $\theta^* = \cos\theta^* \approx 0.739085\;\mathrm{rad}$ ($42.346459^\circ$, $\theta$ the Schmidt angle, $S_A(\theta^*) \approx 0.993820\;\mathrm{bits}$, net order bias $9.25\%$, `manual derivation` / `NUM`), together with von Neumann (1927/1932) partial-trace entropy, Tomita (1967)–Takesaki (1970) modular automorphism flow and KMS thermal periodicity, Connes–Rovelli (1994) thermal time, Bisognano–Wichmann (1975/1976) and Unruh (1976) horizon thermality, Landauer's (1961) erasure principle, Bekenstein–Hawking (1973/1975) and Ryu–Takayanagi (2006) holographic minimal-surface entropy, Page's (1993) radiation curve, Jacobson's (1995) thermodynamic horizon equation of state, and Schrödinger (1944) / Prigogine (1977) dissipative living homeostasis (`Literature`; microscopic black-hole evaporation unitarity and continuum `3+1D` quantum gravity governed by Appendices D/E and marked `OPEN`), establishing the four-step causal chain from entanglement and bounded non-presumption partial trace to entropy, modular flow temperature, and the laws of thermodynamics (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`marginalRight_productState`](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.marginalRight_productState), [`marginalLeft_productState`](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.marginalLeft_productState), [`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`escapePairs_without_eq_union`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`gibbs_relative_entropy_energy_difference`](lean:D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.gibbs_relative_entropy_energy_difference), [`marginal_entropy_change_eq_mutual_information_change`](lean:D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.marginal_entropy_change_eq_mutual_information_change), [`landauer_identity_from_balances`](lean:D5/S3/DivergenceSupport/LandauerIdentity.landauer_identity_from_balances), [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance), [`landauer_saturation_iff`](lean:D5/S3/DivergenceSupport/LandauerSaturation.landauer_saturation_iff), [`extended_quantum_relative_entropy_channel_dpi`](lean:D5/S3/Quantum/Divergence/CanonicalChannelDPI.extended_quantum_relative_entropy_channel_dpi), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**One-Line Invariant / Identity:**
$S_{\mathrm{global}}(\lvert\Psi_{AB}\rangle\langle\Psi_{AB}\rvert) = 0,\quad S_A(\theta) = -\cos^2\theta\ln\cos^2\theta - \sin^2\theta\ln\sin^2\theta,\quad \frac{k_B T_{\mathrm{eff}}(\theta)}{\Delta E} = \frac{1}{2\ln\cot\theta},\quad \beta Q \ge -\Delta S_A$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.17](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics), [Ch 4](ch04-decoherence.md), [Ch 8](ch08-erasure-and-time-arrows.md), [Ch 30 §30.5](ch30-s05-entanglement-and-entropy.md#sec-ch30-entanglement-entropy-complexity-triad), [Ch 38 §38.5](ch38-s05-escape-ledger-and-entropy.md#sec-ch38-observer-escape-ledger), [App D](appendix-d.md), [App E](appendix-e.md))

**Gram Window $\mathcal{W}_M$, Schur Feasibility Corridor, Forgetting Reopening & Chordal Consensus**（格拉姆窗口（$\mathcal{W}_M$）、舒尔补可行性走廊、遗忘重开与弦图局部—全局共识拼图）

**Geometric Intuition Term (本书几何直觉语言):**
**Unit-norm pure-state overlap-one indistinguishability equivalence, two-anchor and three-anchor Gram determinant formulas and strict positivity linear-independence criteria, complete complex inner-product positive-operator adjoint-square Gram realizability, finite-dimensional equal-Gram unitary rigidity extension, six closed-subspace orthogonal-complement projection identities with unit-norm residual escape, finite-memory orthogonal history capacity $N \le d$, single surviving environmental copy blocking local reversal, and cross-contextual objective interpretation invariant common factor, alongside concept-refinement conditional logical impurity monotonicity and Landauer's heat-balance erasure bound (`LEAN ✓`); paired with the bordered Gram Schur-complement identity $\det G_{M+1} = (\det G_M)(1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M)$ and Albert's Moore–Penrose pseudoinverse PSD criterion ($\mathbf{c}_M \in \operatorname{ran}(G_M)$ and $1 - \mathbf{c}_M^\top G_M^+\mathbf{c}_M \ge 0$) for singular $G_M$ ($M > 3$ in $\mathbb{R}^3$), strict separation between high-$d$ equality-elliptope slices and 3D spherical coherence-cap corridors $\Omega_M = \{x \in S^2 \mid \langle x, v_j\rangle \ge \cos\alpha_{\mathrm{coh}}\}$, six-decimal Gauss–Bonnet benchmarks on golden-angle spiral caps ($\alpha_{\mathrm{coh}} = 60^\circ$) shrinking from $\lvert\Omega_3\rvert \approx 1.802272\;\mathrm{sr}$ to $\lvert\Omega_9\rvert \approx 0.054604\;\mathrm{sr}$ and first becoming strictly empty at $M = 10$ ($\lvert\Omega_{10}\rvert = 0$), sliding-window forgetting log-volume reopening $q_9 = \ln(\lvert\Omega_8\rvert/\lvert\Omega_9\rvert) \approx 1.338960\;\mathrm{nats}$ ($1.931710\;\mathrm{bits}$, connected to Landauer heat under uniform accessible-volume and isothermal-reset assumptions), and dual-observer tilted corridors ($\eta \in \{10^\circ, 25^\circ, 30^\circ\}$) emptying at $M = 9$ while reopening consensus upon mutual forgetting to $M = 3$ (`manual derivation` / `NUM`), together with Schur's (1917) determinant complement, Albert's (1969) pseudoinverse PSD theorem, Schoenberg's (1935) Euclidean metric embedding, the Grone–Johnson–Sá–Wolkowicz (1984) chordal PSD matrix completion theorem, and Landauer (1961) / Bennett (1982) memory-reset thermodynamics (`Literature`), establishing adaptive sliding Gram-window breathing and decentralized local-to-global consensus stitching (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`two_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_formula), [`two_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_pos_iff), [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone), [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)

**One-Line Invariant / Identity:**
$\det G_{M+1} = (\det G_M)\bigl(1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M\bigr),\quad N \le d,\quad q_M = \ln\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert},\quad B^\dagger B = A^\dagger A \implies B = UA$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.18](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus), [Ch 10](ch10-gram-geometry-and-order.md), [Ch 29](ch29-timeless-causality-and-gram-space.md), [Ch 33](ch33-all-beings-observers-and-mutual-attractors.md), [Ch 35](ch35-light-pulse-and-self-referential-table.md), [Ch 37](ch37-dreams-quantum-eraser-and-nonlocal-observer.md))

**Round-Trip Double Projection $\cos^2\theta$, Azimuthal Blind Cone & Imaginary Blind Plane $i$**（往返双投影玻恩平方律（$\cos^2\theta$）、方位角盲锥与 $90^\circ$ 正交盲区“对‘我’不见即为‘虚’（$i$）”）

**Geometric Intuition Term (本书几何直觉语言):**
**Iterated observer Schrödinger–Heisenberg pullback trace identity, complete record-measurement rank-one Born trace pairing weight and pure-state modulus-square reduction, finite-dimensional three-part Born probability skeleton, common-phase-invariant polynomial charge balance with minimal degree-two Hermitian uniqueness, the Lagrange–Gram two-vector wedge remainder identity, six closed-subspace orthogonal-complement projection identities, relative-phase blindness of arbitrary diagonal observable families on equal superpositions, the exact Robertson–Schrödinger variance–covariance–commutator Pythagorean identity, skew-Hermitian unitary and balanced relative complex-structure squaring $R^2 = -I_n$, and the Hermitian commutator derivative law for projection-probability flow, alongside the observation-partition inseparability kernel and circle double-cover history path lift (`LEAN ✓`); paired with the background-free round-trip operator sandwich $P_{\mathbf{I}} P_{\mathbf{V}} P_{\mathbf{I}} = (\cos^2\theta) P_{\mathbf{I}}$ between observer self-axis $\mathbf{I}$ and target state $\mathbf{V}$ (where one-way amplitude $\cos\theta$ carries unfixed gauge sign/phase whereas round-trip echo closure locks Born weight $\cos^2\theta$ and blind-spot deficit $\sin^2\theta$), the azimuthal blind-cone fiber $\mathbf{V}(\theta,\varphi) = \cos\theta\,\mathbf{I} + \sin\theta(\cos\varphi\,\mathbf{e}_1 + \sin\varphi\,\mathbf{e}_2)$ (yielding identical echo $0.546247$, solid angle $2\pi(1-\cos\theta^*) \approx 1.639376\;\mathrm{sr}$, and blind-circle circumference $2\pi\sin\theta^* \approx 4.232429$ at Dottie $\theta^* \approx 42.346459^\circ$), first-person identification of the $90^\circ$ transverse bivector plane $\hat{\mathbf{I}}_{\perp} = \mathbf{e}_1\wedge\mathbf{e}_2$ satisfying $\hat{\mathbf{I}}_{\perp}^2 = -1$ (first quarter-turn landing in the observer's $\mathbf{I}\cdot\mathbf{e}_\perp = 0$ blind zone—invisible to `I`, hence "imaginary" `i`—and second quarter-turn returning antipodally to $-\mathbf{I}$), and six-decimal comparison between norm-preserving complex Schrödinger circular arcs $\lVert e^{-i\omega t}\psi_0\rVert^2 \equiv 1$ and $i$-free real decay $\lVert e^{-\gamma t}\psi_0\rVert^2 = e^{-2\gamma t}$ (`manual derivation` / `NUM`), together with Malus's (1809) $\cos^2\theta$ law, Born's (1926) statistical rule, Lüders's (1951) projection update, Gleason's (1957) measure theorem, Descartes (1637) and Gauss (1831) on geometric complex numbers, Stueckelberg's (1960) real-space antisymmetric $J^2 = -I$, and the Renou et al. (2021) three-node real-quantum network inequivalence and experimental proposal (`Literature`), completing Chapter 34's forward nineteen-rung first-person observer-geometry synthesis (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction), [`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square), [`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary)

**One-Line Invariant / Identity:**
$P_{\mathbf{I}} P_{\mathbf{V}} P_{\mathbf{I}} = (\cos^2\theta)\,P_{\mathbf{I}},\quad \cos^2\theta + \sin^2\theta = 1,\quad R^\dagger = -R \land RR^\dagger = I \implies R^2 = -I,\quad \frac{d}{dt}\operatorname{Tr}(\rho_t P) = \operatorname{Re}\bigl(i\operatorname{Tr}(\rho_t[H,P])\bigr)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), [Ch 2](ch02-born-rule.md), [Ch 5](ch05-complex-phase-and-rotors.md), [Ch 12](ch12-measurement-computation-and-gradients.md), [Ch 31 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion), [Ch 35](ch35-light-pulse-and-self-referential-table.md))

**Spherical Attractor Basins, Bounded-Martingale Sampling Laws & Single-Outcome Selection Boundary**（球面吸引盆、有界鞅抽样律与单次记录选支实现边界）

**Geometric Intuition Term (本书几何直觉语言):**
**Rank-one Born trace pairing weight, complete record-weight normalization, positive-weight Lüders conditional-state positivity, unread-pinching fixed-point characterization and idempotence, and finite-step stabilization of state-deleting finite set updates (`LEAN ✓`); paired with explicit bistable-drift and non-uniform-threshold countermodels violating Born frequencies (at $p_0 = \cos^2 30^\circ = 3/4$, i.e. $z_0 = +1/2$, the fixed deterministic equatorial separatrix $\lambda \equiv 0$ yields $p_+^{\mathrm{det}}(+1/2) = 1$, while the $p_0$-independent hemispherical area share is $1/2$ and symmetric quadratic noise $f_{\mathrm{quad}}(\lambda) = \frac{3}{2}\lambda^2$ yields $9/16 \neq 3/4$) versus a bounded-martingale state-space symmetric random walk with absorbing endpoints whose hitting probability conserves $\mathbb{P}(Z_\tau = 1 \mid Z_0 = p_0) = p_0$ (`manual derivation` / `Literature`), separating ensemble Born weights and non-selective Lüders dephasing from single-run outcome selection `prob-ch34-single-outcome-realization` (`MODEL` / `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`recordWeight_sum`](lean:D5/S3/Observer/Conditioning.recordWeight_sum), [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)

**One-Line Invariant / Identity:**
$\operatorname{Tr}(\rho\,\lvert v\rangle\langle v\rvert) = \langle v, \rho v\rangle,\quad \Phi_{\mathcal{R}}^2 = \Phi_{\mathcal{R}},\quad \bigl(\mathbb{E}[Z_\tau] = Z_0 = p_0,\; Z_\tau \in \{0, 1\}\;\text{a.s.}\bigr) \implies \mathbb{P}(Z_\tau = 1\mid Z_0 = p_0) = p_0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `MODEL` / `OPEN` ([Ch 34 §34.20](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins), [App C](appendix-c.md), [App D](appendix-d.md), [App E](appendix-e.md))

**Perception–Action Loop, Causal Intervention in the Gram Corridor & Anchored Holonomy Control**（感知—行动闭环、格拉姆可行走廊内的因果干预与锚定和乐控制）

**Geometric Intuition Term (本书几何直觉语言):**
**Observer pullback trace identity, revision-conflict noncommutation, two-axis finite rotation words and moving-axis propagation invariance, the Fubini–Study record-time lower bound, named spanning-tree phase transport, and anchored loop holonomy classification (`LEAN ✓`); paired with an explicit benchmark separating active state rotation ($\rho \mapsto U\rho U^\dagger$ against a fixed observable $A$, shifting $\operatorname{Tr}(U\rho U^\dagger A)$) from passive basis corepresentation ($\rho \mapsto U\rho U^\dagger,\; A \mapsto U A U^\dagger$, leaving expectation values $\operatorname{Tr}(\rho A)$ invariant even though both preserve the eigenvalue spectrum of $\rho$), constrained optimal control inside the bordered-Gram Schur corridor $\Delta_{\mathrm{Schur}} \ge 0$ under Mandelstam–Tamm speed bounds, and anchored Berry/gauge holonomy memory along closed sensorimotor loops (`manual derivation` / `Literature` / `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`observer_pullback_trace_identity`](lean:D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity), [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`moving_axis_invariance`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance), [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound), [`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)

**One-Line Invariant / Identity:**
$[R_a, R_b] \neq 0,\quad T \cdot \Delta E \ge \hbar\,\arccos\lvert\langle\psi_0\mid\psi_T\rangle\rvert,\quad \Delta_{\mathrm{Schur}}(\mathbf{u}) = 1 - \mathbf{c}(\mathbf{u})^\top G_M^{-1}\mathbf{c}(\mathbf{u}) \ge 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `MODEL` ([Ch 34 §34.21](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy), [Ch 18](ch18-spinors-and-gauge-curvature.md), [App D](appendix-d.md), [App E](appendix-e.md))

**Octave Memory Renormalization, Predictive Sufficient-Statistic Distillation & Minimal Landauer Dissipation**（八度记忆重整化、预测充分统计蒸馏与最小兰道尔散热）

**Geometric Intuition Term (本书几何直觉语言):**
**Concept-quotient fiber decomposition, partition-refinement impurity monotonicity, extended quantum-channel relative-entropy DPI, exact two-way Landauer entropy–energy balance, retrospective lookup zero-loss versus non-anticipating causal failure, and future-word orthogonal residual characterization (`LEAN ✓`); paired with the three-bit history space $H = \{0,1\}^3$ parity-distillation benchmark (erasing the $2\text{-bit}$ redundant fiber $R = (X_1, X_3)$ at minimal Landauer heat cost $\Delta Q_{\min} = 2 k_B T \ln 2$, matching FIFO's $2\text{-bit}$ heat cost while retaining $I(Q_\star; Y) = 1\;\mathrm{bit}$ versus FIFO's $I = 0$) alongside the acausal answer-table copy foil failing `NonAnticipating`, and directional Schur-complement selectivity of 3D three-anchor centroid synthesis $\mathbf{a} = \frac{\mathbf{e}_1+\mathbf{e}_2+\mathbf{e}_3}{\sqrt{3}}$ versus FIFO deletion (`manual derivation` / `Literature` / `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone), [`extended_quantum_relative_entropy_channel_dpi`](lean:D5/S3/Quantum/Divergence/CanonicalChannelDPI.extended_quantum_relative_entropy_channel_dpi), [`landauer_identity_from_balances`](lean:D5/S3/DivergenceSupport/LandauerIdentity.landauer_identity_from_balances), [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure), [`future_word_orthogonal_residual`](lean:D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual)

**One-Line Invariant / Identity:**
$D(\mathcal{N}(\rho)\,\|\,\mathcal{N}(\sigma)) \le D(\rho\,\|\,\sigma),\quad I(Q(H); Y) \le I(H; Y),\quad Q_{\mathrm{erase}}^{\min} = k_B T \ln 2 \cdot H(H \mid Q_\star(H))$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `MODEL` ([Ch 34 §34.22](ch34-s22-memory-renormalization-and-learning.md#sec-ch34-memory-renormalization-and-learning), [§34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field), [§34.18](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus), [Ch 35](ch35-light-pulse-and-self-referential-table.md))

**Shared Thermodynamic Arrow, Twin Past-Hypothesis Initial Conditions & Horizon Anti-Circularity Boundary for $\Lambda_{\mathrm{cos}}$**（共享热力学时间箭头、过去假设双重初值与宇宙学常数视界反循环边界）

**Geometric Intuition Term (本书几何直觉语言):**
**Vanishing product-state quantum mutual information, exact bipartite unitary marginal-entropy vs. mutual-information balance $\Delta S_A + \Delta S_B = \Delta I(A{:}B)$, Cayley unit-circle critical-line criterion, finite-layer projection escape, and uniform completion obstruction (`LEAN ✓`); paired with the two-qubit countermodels of $U = (I_4 - i X\otimes X)/\sqrt{2}$ disentangling the Bell-type state $(\lvert 00\rangle + i\lvert 11\rangle)/\sqrt{2}$ ($\Delta S_A = \Delta S_B = -1\;\mathrm{bit} = -\ln 2\;\mathrm{nats}$ arrow reversal), globally maximally mixed product bath $(I_2/2)\otimes(I_2/2)$ stall ($\Delta S_A = \Delta S_B = 0$), and `SWAP` on $(I_2/2)\otimes\lvert 0\rangle\langle 0\rvert$ (opposing local arrows $(\Delta S_A, \Delta S_B) = (-1, +1)\;\mathrm{bit}$)—clarifying that $I_0(A{:}B) = 0$ suffices for a nonnegative **sum** $\Delta S_A + \Delta S_B = I_1 \ge 0$, while unsaturated local marginals ($S_{\alpha,0} < \ln d_\alpha$) supply positive **headroom** permitting strict local entropy growth without alone forcing every individual $\Delta S_\alpha \ge 0$ under arbitrary `SWAP`-like unitaries—alongside the Minkowski ($\Lambda_{\mathrm{cos}}=0$ Rindler horizon) and anti-de Sitter ($\Lambda_{\mathrm{cos}}<0$) vs. de Sitter $R_H^2 = 3/\Lambda_{\mathrm{cos}}$ ($S_{\mathrm{dS}} = 3\pi/(\Lambda_{\mathrm{cos}}\ell_P^2)$) anti-circularity audit anchoring `prob-ch34-past-hypothesis-and-cosmological-constant` (`manual derivation` / `Literature` / `MODEL` / `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`quantumMutualInformation_productState`](lean:D5/S3/Quantum/Information/PartialTraceMutualInformation.quantumMutualInformation_productState), [`marginal_entropy_change_eq_mutual_information_change`](lean:D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.marginal_entropy_change_eq_mutual_information_change), [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`uniform_completion_obstruction`](lean:D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction)

**One-Line Invariant / Identity:**
$\Delta S_A + \Delta S_B = \Delta I(A{:}B),\quad I(A{:}B)_{\rho_A\otimes\rho_B} = 0,\quad \Lambda_{\mathrm{cos}}\ell_P^2 = \frac{3\pi}{S_{\mathrm{dS}}}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `MODEL` / `OPEN` ([Ch 34 §34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor), [Ch 38 §38.6–§38.7](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp), [App C](appendix-c.md), [App D](appendix-d.md), [App E](appendix-e.md))

**Orientation Parity Cancellation, Even Positive Sagitta Composition & Spin-$2$ Gravitational Boundary**（绕向奇偶相消、偶正定矢高合成与自旋-$2$ 引力动力学边界）

**Geometric Intuition Term (本书几何直觉语言):**
**Triple Bargmann–Bloch scalar-triple-product trace decomposition, explicit qubit orientation-reversal conjugation, three-anchor real Gram determinant formula, and Lagrange–Gram identity (`LEAN ✓`); paired with orientation-odd Bargmann imaginary cancellation $\operatorname{Im}\Delta_3(u,w,v) = -\operatorname{Im}\Delta_3(u,v,w)$ versus orientation-even spherical sagitta nonnegativity $1-\cos\epsilon = 2\sin^2(\epsilon/2) \ge 0$, the composition countermodel contrasting two separate cells of opposite windings $+\epsilon, -\epsilon$ with extensive positive sagitta sum $d_{\mathrm{sep}}(\epsilon, -\epsilon) = 2(1-\cos\epsilon) = 4\sin^2(\epsilon/2) > 0$ against sequential inverse gates on a single state cancelling $\hat{U}(-\epsilon)\hat{U}(\epsilon) = \mathbf{1} \implies d_{\mathrm{seq}}(\epsilon, -\epsilon) = 0$, and the relativistic QFT tree-level static force sign $(-1)^s$ ($s=0,2$ like-charge attraction vs. $s=1$ repulsion), demarcating geometric analogy from `prob-ch34-gravity-dynamics-and-coupling` (`manual derivation` / `Literature` / `MODEL` / `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch), [`explicit_qubit_orientation`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation), [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)

**One-Line Invariant / Identity:**
$\operatorname{Im}\Delta_3(u,w,v) = -\operatorname{Im}\Delta_3(u,v,w),\quad 1 - \cos\epsilon = 2\sin^2\frac{\epsilon}{2} \ge 0,\quad V_{\mathrm{static}}^{(s)}(r) \propto (-1)^s\,\frac{g_s^2}{4\pi r}e^{-m_s r}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `MODEL` / `OPEN` ([Ch 34 §34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition), [§34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability), [App C](appendix-c.md), [App E](appendix-e.md))

**Countermodel Audit of Three-Generation Models & the Quantitative Boundary of Standard Model Couplings**（三代手征费米子候选机制反例审计与标准模型连续耦合参数边界）

**Geometric Intuition Term (本书几何直觉语言):**
**3D Tribonacci Perron root identity, circle-rotation three-gap ceiling $\le 3$, and $S^2$ open orthogonality-free cover lower bound $\ge 6$ (`LEAN ✓`); paired with three explicit countermodels—all $5$ perturbative gauge/gravitational anomaly traces plus the global $\mathrm{SU}(2)_L$ Witten anomaly vanishing identically within each generation for any $N_{\mathrm{gen}} \ge 1$ (including $\sum Y^3 = 0$), the Kobayashi–Maskawa physical CP-phase count $\frac{1}{2}(N_{\mathrm{gen}}-1)(N_{\mathrm{gen}}-2)$ enforcing only the lower bound $N_{\mathrm{gen}} \ge 3$ ($N_{\mathrm{gen}}=4$ carries $3$ phases), and continuous gauge/Yukawa moduli $(g_1, g_2, g_3) \in \mathbb{R}_{>0}^3$, $(Y_u, Y_d, Y_e) \in \mathrm{GL}_3(\mathbb{C})^3$ (where degenerate $Y_\ell = y_0 I_3$ preserves gauge anomalies while erasing the $m_e : m_\mu : m_\tau$ hierarchy)—anchoring `prob-ch34-sm-generations-and-couplings` (`manual derivation` / `Literature` / `MODEL` / `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`dbonacciPerronRoot_three_eq_tribonacciConstant`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_three_eq_tribonacciConstant), [`three_gap_card_le_three`](lean:D5/S1/Phase/ThreeGap/Main.three_gap_card_le_three), [`sphere_two_open_orthogonality_free_cover_lower_six`](lean:D5/S3/Topology/SphereOrthogonalityCover.sphere_two_open_orthogonality_free_cover_lower_six)

**One-Line Invariant / Identity:**
$\sum_{\text{1 gen}} Y_f^3 = 3\Bigl(\frac{1}{6}\Bigr)^3\!\cdot 2 + 3\Bigl(-\frac{2}{3}\Bigr)^3 + 3\Bigl(\frac{1}{3}\Bigr)^3 + \Bigl(-\frac{1}{2}\Bigr)^3\!\cdot 2 + 1^3 = 0,\quad N_{\mathrm{CP}}(N_{\mathrm{gen}}) = \frac{(N_{\mathrm{gen}}-1)(N_{\mathrm{gen}}-2)}{2}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `MODEL` / `OPEN` ([Ch 34 §34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary), [§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave), [App C](appendix-c.md), [App E](appendix-e.md))

**Minimal Arc-Trihedron Interior-Chord Cuts, Pivot Octave Renormalization Breaking the Sorting Barrier & Instanton Tunneling**（极小圆弧体内割弦面、打破排序壁垒的枢轴八度重整化与瞬子隧穿）

**Geometric Intuition Term (本书几何直觉语言):**
**Unit-vector Fubini–Study geodesic angle triangle inequality, real-vector Lagrange–Gram bivector area-deficit identity, observation-readout partition-topology inseparability kernel equivalence, global positive-semidefinite matrix completion on finite chordal graphs via simplicial vertex elimination, canonical concept-fiber dependent-sum equivalence $X \simeq \sum_{b:B}\operatorname{ConceptFiber}(q_C, b)$, and universe-polymorphic single-vertex tropical $(\min, +)$ Schur walk compression and walk-infimum distance preservation (`LEAN ✓`); paired on the unit-sphere right-angled trihedron $\Delta\mathcal{T}_\epsilon$ across all $\epsilon \in (0, \frac{\pi}{2}]$ with the strict three-face hierarchy $L_{\mathrm{tunnel}}(\epsilon) = \sqrt{2}\sin\epsilon < L_{\mathrm{cap}}(\epsilon) = \arccos(\cos^2\epsilon) < L_{\mathrm{walls}}(\epsilon) = 2\epsilon$, midpoint radial bulk depth $\Delta r_{\mathrm{bulk}}(\epsilon) = 1 - \sqrt{\frac{1+\cos^2\epsilon}{2}} > 0$ (benchmarked to six decimals at $\epsilon \in \{15^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$, saving $54.98\%$ at the octant limit), and six-vertex positive-weight digraph elimination reducing outer jump cost $11$ to exact interior tunnel weight $W_{\mathrm{eff}}(p_1, p_2) = 7$ via $k=4$ unsorted parallel relaxation rounds plus the tropical $(\min, +)$ Schur complement (`manual derivation` / `NUM`), together with Dijkstra's (1959) greedy wavefront search, Fredman–Tarjan (1987) Fibonacci-heap $O(m+n\log n)$, the $\Omega(n\log n)$ total-order output lower bound, the Duan–Mao–Mao–Shu–Yin (STOC 2025) deterministic $O(m\log^{2/3}n)$ directed SSSP algorithm computing exact distances without outputting a sorted vertex list, Agmon's (1982) sub-barrier Euclidean instanton metric $ds_{\mathrm{Agmon}} = \sqrt{2m(V-E)}\,ds$, Misra–Sudarshan (1977) Quantum Zeno arrest, Tsu–Esaki (1973) Fabry–Pérot resonant tunneling, and Vidal (2007) / Swingle (2012) MERA hyperbolic bulk renormalization (`Literature`), establishing the centripetal pivot-octave cone ($\Lambda^0_\ell \to \Lambda^2_\ell \to \Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$) and interactive laboratory `trihedron-chord-pivot-tunneling-sandbox` (`CHORD//TUNNEL`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`exists_posSemidef_completion`](lean:D5/S3/QuadraticForms/ChordalPsdCompletion.exists_posSemidef_completion), [`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition), [`pivot_walks_and_distance`](lean:D5/S3/Combinatorics/Graph/Walks/TropicalSchurElimination.pivot_walks_and_distance)

**One-Line Invariant / Identity:**
$L_{\mathrm{tunnel}}(\epsilon) = \sqrt{2}\sin\epsilon < L_{\mathrm{cap}}(\epsilon) = \arccos(\cos^2\epsilon) < L_{\mathrm{walls}}(\epsilon) = 2\epsilon,\quad W_{\mathrm{eff}}(p_1, p_2) = \min\bigl(W_{p_1 p_2}, \min_{b\in\mathrm{Int}}(W_{p_1 b} + W_{b p_2})\bigr),\quad X \simeq \sum_{b:B}\operatorname{ConceptFiber}(q_C, b)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 34 §34.26](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization), [§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron), [§34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field), [Ch 7](ch07-geometric-time-and-speed-limits.md), [Ch 19](ch19-tensor-networks-and-holography.md))

**Orthogonal Imaginary-Chord Tunneling & Attosecond Temporal Double-Slit Self-Interference**（正交虚空间割弦隧穿与阿秒时间双缝跨时刻自干涉）

**Geometric Intuition Term (本书几何直觉语言):**
**Six closed-subspace orthogonal-complement projection identities, skew-adjoint right-unitary and balanced two-subspace relative complex-structure minus-identity squares ($R^2 = -I_n,\; J^2 = -I_n$), joint readout blindness of computational-basis diagonal observable families to relative phase alongside the Pauli-$X$ witness, explicit off-diagonal coherence mass $\lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2$ discarded by standard-basis qubit pinching, and monitored unitary first-return recurrence with finite-horizon probability conservation, together with energy-eigenstate stationarity, zero energy variance, and the pinching Hilbert–Schmidt Pythagorean split (`LEAN ✓`); paired with stationary sub-barrier $E < V(x)$ momentum rotation by $90^\circ$ into $p = \hat{\mathbf{i}}\hbar\kappa(x)$ ($\kappa = \sqrt{2m(V-E)}/\hbar$) triggering $\hat{\mathbf{i}}^2 = -1$ along a non-oscillating interior chord $e^{-\kappa x}$, real-unit rectangular electron nanobarrier benchmarks ($V_0 = 1.00\;\mathrm{eV},\; L = 0.50\;\mathrm{nm},\; \kappa_0 \approx 5.123167\;\mathrm{nm}^{-1}$) across $E/V_0 \in \{0.20, 0.50, 0.80, 0.99, 1.00^-\}$ ($T(0.50) \approx 0.101362$, grazing $T(1.00^-) \approx 0.378727$), dual-time-gate $(t_1, t_2)$ spectral interference $P(E) = \lvert\mathcal{A}_1\rvert^2 + \lvert\mathcal{A}_2\rvert^2 + 2\lvert\mathcal{A}_1\mathcal{A}_2\rvert\cos(E\Delta t/\hbar + \Delta\gamma_B)$ with Planck reciprocity comb spacing $\Delta E = h/\Delta t$ across nine orders of magnitude ($500\;\mathrm{as} \to 8.271335\;\mathrm{eV}$, $50\;\mathrm{fs} \to 82.713354\;\mathrm{meV}$, $100\;\mathrm{ns} \to 41.356677\;\mathrm{neV}$), and midway Which-Time pinching discarding $0.500000$ coherence mass (`manual derivation` / `NUM`), together with Gamow (1928) and Gurney–Condon (1928/1929) wave-mechanical barrier tunneling, Misra–Sudarshan (1977) Quantum Zeno arrest, Aharonov–Albert–Vaidman (1988) weak values, Lindner et al. (2005) attosecond photoionization temporal double slits, Tirole et al. (2023) femtosecond ITO optical time slits, Rao et al. (2025) magnon time-diffraction combs, and Angulo–Wiseman–Steinberg et al. (2026) postselected negative weak atomic excitation dwell times $(-0.82 \pm 0.31)\tau_0$ (`Literature`; non-perturbative real-time path-integral measures and gravitational tunneling-time operators marked `OPEN`), bridging spatial and temporal blindspot chord cuts alongside interactive laboratory `imaginary-chord-temporal-double-slit-sandbox` (`IMAG//TUNNEL`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation), [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary), [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)

**One-Line Invariant / Identity:**
$\exp\!\bigl(\tfrac{\hat{\mathbf{i}}}{\hbar}(\hat{\mathbf{i}}\hbar\kappa)x\bigr) = e^{-\kappa x},\quad \Delta E = \frac{h}{\Delta t},\quad \lVert\rho - \mathcal{P}(\rho)\rVert_{\mathrm{HS}}^2 = \lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2,\quad \sum_{n=0}^{N-1} p_{n+1} + s_N = 1$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.27](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit), [§34.18](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus), [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), [§34.26](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization), [§34.28](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs), [Ch 7](ch07-geometric-time-and-speed-limits.md), [App E](appendix-e.md))

**The Riemann Path Integral & Prime Minimal Arc-Trihedra: Euler Winding Operators, Half-Density Square Law & Critical-Line Cancellation**（黎曼路径积分与素数极小圆弧体：欧拉绕行算子、半密度平方律与临界线相消）

**Geometric Intuition Term (本书几何直觉语言):**
**Rational linear independence of prime logarithms, the Dirichlet-series and Euler-product identity on $\operatorname{Re}(s) > 1$, entire functional reflection and conjugation covariance of $\operatorname{xiReading}$, the quartic counterexample exhibiting off-critical zero quartets $\{\frac{1}{2}\pm\delta\pm i\gamma\}$ under full zeta symmetry, the unconditional integrated explicit formula on $y > 0$, and alternating Dirichlet partial-sum continuation on $\operatorname{Re}(s) > 0$ ($s \neq 1$), together with rank-one Born modulus-square pairing weights (`LEAN ✓`); paired on each prime minimal arc-trihedron $\Delta\mathcal{T}_p$ (intrinsic step $L_p = \ln p$, composite path action $S[\Gamma_n] = \ln n$) with the two-arm interferometer floor $\lvert p^{-\sigma}e^{i\alpha} + p^{-(1-\sigma)}e^{i\beta}\rvert \ge \lvert p^{-\sigma} - p^{-(1-\sigma)}\rvert$, the Kostant–Souriau half-density square law $\lvert\psi_n\rvert^2 = n^{-2\sigma} = n^{-1} \iff \sigma = \frac{1}{2}$, identical vanishing $\operatorname{Im}\operatorname{xiReading}(\frac{1}{2}+it) = 0$ on the critical line (codimension $2 \to 1$), 100-digit critical-line nulling across the first five zeros versus detuned $\sigma = 0.38/0.62$ dual-shell splitting, and $K \in \{5, 20, 50\}$ critical-zero standing-wave reconstructions of Chebyshev's midpoint staircase $\psi_0(x)$ (`manual derivation` / `NUM`), together with Riemann's (1859) circle-theta Poisson continuation, the von Mangoldt (1895) and Weil (1952) pointwise explicit formula, Littlewood's (1912) equivalence $\mathrm{RH} \iff M(x) = \mathcal{O}_\varepsilon(x^{1/2+\varepsilon})$, the Davenport–Heilbronn (1936) Euler-product-free off-critical counterexample, Selberg (1956) and Gutzwiller (1971) / Berry–Keating (1999) hyperbolic periodic-orbit half-density prefactors $p^{-1/2}$, and Julia (1990) / Bost–Connes (1995) primon-gas partition functions (`Literature`; the global Riemann Hypothesis remains strictly `OPEN`), establishing the arithmetic `1—3—3—1` concept tower and interactive laboratory `riemann-prime-arc-path-integral-sandbox` (`ZETA//SPIRAL`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence), [`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product), [`xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection), [`xi_reading_one_sub_conj`](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj), [`full_symmetry_not_fixed_line_localization`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization), [`actual_integrated_explicit_formula`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula), [`tendsto_alternating_partialSums_eta_of_ne_one`](lean:D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.tendsto_alternating_partialSums_eta_of_ne_one), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)

**One-Line Invariant / Identity:**
$\zeta(\sigma + \hat{\mathbf{i}}t) = \prod_{p\in\mathbb{P}}(1 - p^{-s})^{-1} = \sum_{n=1}^{\infty} e^{-\sigma\ln n}e^{-\hat{\mathbf{i}}t\ln n}\;(\sigma > 1),\quad \lvert\psi_n\rvert^2 = n^{-2\sigma} = n^{-1} \iff \sigma = \frac{1}{2},\quad \operatorname{Im}\operatorname{xiReading}\!\bigl(\tfrac{1}{2}+it\bigr) = 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.28](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs), [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), [§34.27](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit), [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling), [Ch 22 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4), [App C](appendix-c.md))

**Arithmetic Pivot Renormalization & Multi-Stage Critical-Strip Resonant Tunneling: Confronting the Turán–Zeno Trap & Probing the 4/7 Mollifier Wall**（算术枢轴重整与临界带多级共振隧穿：直面图兰芝诺陷阱与叩问 4/7 磨光器墙）

**Geometric Intuition Term (本书几何直觉语言):**
**Unique simple pole of residue $1$ at $s = 1$, nonvanishing completed $\zeta$ on $\operatorname{Re}(s) \ge 1$, sufficiency of excluding zeros from the open right half-strip $\frac{1}{2} < \operatorname{Re}(\rho) < 1$ for `RiemannHypothesis`, the Cayley unit-circle criterion $\lVert w(s)\rVert = \lvert(s-1)/s\rvert = 1 \iff \operatorname{Re}(s) = \frac{1}{2}$ and vanishing radial-defect equivalence, Hilbert-space operator Gram square-root realizability, chordal and rank-bounded positive-semidefinite clique completion, explicit finite-window Robin violation triggered by hypothetical right-half-strip zeros, and the variational `IsLeast` minimum of Hermitian block Schur-complement quadratic forms for strictly positive-definite interior blocks (`LEAN ✓`); paired with the 100-digit interval Rouché certificate for the first Turán spurious zero of $\zeta_{19}(s)$ at $\sigma_0 \approx 1.0069878449,\; t_0 \approx 1.554178\times 10^{14}$ (contrasted with interval-certified positivity $L_M(\sigma) > 0$ for $1 \le M \le 10^6$), exact rational block Schur reduction $\widetilde{G}_{PP} = \bigl(\begin{smallmatrix} 5/9 & 5/18 \\ 5/18 & 8/9 \end{smallmatrix}\bigr) \succ 0$ ($\det G = \frac{3}{4}\cdot\frac{5}{12} = \frac{5}{16}$) and Moore–Penrose pseudoinverse inheritance on `[1, 2 | 3, 6]`, and conditional dyadic Cayley repeated-squaring amplification $\lvert w\rvert^{2^\ell}$ exploding in $O(\log(\gamma_0/\delta))$ layers at height $\gamma_1$ (`manual derivation` / `NUM`), together with Turán (1948), Haselgrove (1958), Montgomery (1983), and Platt–Trudgian (2016) partial-sum zero classification, the Nyman–Beurling–Báez-Duarte–Burnol sequential logarithmic lower bound $C_{\mathrm{NBB}}/\ln M \approx 0.046191/\ln M$, Selberg–Levinson–Conrey ($\vartheta = \frac{4}{7}$) and Pratt–Robles–Zaharescu–Zeindler ($> 41.72\%$) mollifier dispersion bounds, and Duan–Mao–Mao–Shu–Yin (2025) total-order-free local-wavefront sparse shortest-path pivots (`Literature`; area-law decay of transverse shift-convolution entanglement `prob-ch34-arithmetic-pivot-area-law` and the global Riemann Hypothesis marked `OPEN`), establishing the Arithmetic MERA Schur-pivot and multi-stage resonant-tunneling synthesis alongside interactive laboratory `arithmetic-pivot-resonant-tunneling-sandbox` (`ARITH//PIVOT`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`classical_zeta_unique_simple_pole_residue_one`](lean:D5/S3/Zeros/ZetaUpgrade.classical_zeta_unique_simple_pole_residue_one), [`completedRiemannZeta_ne_zero_of_one_le_re`](lean:D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_ne_zero_of_one_le_re), [`golden_right_half_strip_implies_rh`](lean:D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh), [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line), [`cayley_critical_line_zeta_criterion`](lean:D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`exists_posSemidef_completion`](lean:D5/S3/QuadraticForms/ChordalPsdCompletion.exists_posSemidef_completion), [`exists_posSemidef_completion_rank_le`](lean:D5/S3/QuadraticForms/RankBoundedChordalPsdCompletion.exists_posSemidef_completion_rank_le), [`original_zero_robin5040_localA`](lean:D5/S3/Arith/Robin/OffLinePeak/OriginalLocalA.original_zero_robin5040_localA), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)

**One-Line Invariant / Identity:**
$\widetilde{G}_{PP}^{(\ell)} = G_{PP}^{(\ell)} - G_{PI}^{(\ell)}\bigl(G_{II}^{(\ell)}\bigr)^+ G_{IP}^{(\ell)} \succeq 0,\quad \lVert w(s)\rVert = \Bigl\lvert\frac{s-1}{s}\Bigr\rvert = 1 \iff \operatorname{Re}(s) = \frac{1}{2},\quad \vartheta = \frac{4}{7}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling), [§34.26](ch34-s26-chord-tunneling-and-pivot-renormalization.md#sec-ch34-chord-tunneling-and-pivot-renormalization), [§34.27](ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.md#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit), [§34.28](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs), [§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes), [Ch 22 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4), [App C](appendix-c.md))

**Rebuilding Calculus from Minimal Circular-Arc Bodies: Rotor Differentials, the Sagitta Phase Transition & Finite-Precision Stokes Exactness**（极小圆弧体微积分重塑：以旋代差、矢高相变与有限精度斯托克斯定理）

**Geometric Intuition Term (本书几何直觉语言):**
**Finite-index Lagrange–Gram bivector area identity, skew-adjoint right-unitary and balanced orthogonal-pair endogenous complex-structure negative-square laws $R^2 = -I_n$, ring-theoretic limit-free covariant commutator factorization $Uf - fU = (f_{\mathrm{tr}} - f)U$, Hermitian Born projection-probability commutator flow and conservation, complete normed-algebra non-asymptotic exponential Taylor tail bound $\frac{r^n}{n!}e^r$ and Lie–Trotter interleaved product convergence, spherical rotation-system $\mathbb{Z}/2\mathbb{Z}$ opposite-dart boundary exactness and Jordan cycle disk separation, and general `AddCommGroup A` simplicial two-cochain repair with $d^2 = 0$ exactness (alongside inline spanning-tree transport `selected_tree_transport`, anchored holonomy classification `anchored_phase_classification`, and triple Bargmann trace `triple_bargmann_bloch`, `LEAN ✓`); paired with finite-aperture ($\epsilon \ge \varepsilon_{\mathrm{self}} > 0$) comparative rotor $\hat{\mathcal{D}}_\epsilon = \exp(\hat{\mathbf{B}}\kappa\epsilon)$ chord–sagitta circle conservation $(1-v_\epsilon)^2 + c_\epsilon^2 \equiv 1$ (cancellation-free haversine $v_\epsilon = 2\sin^2(\kappa\epsilon/2)$, recovering Kock–Lawvere nilpotent infinitesimals $D_1=\{d\mid d^2=0\}$ as the mod-$v_\epsilon$ tangent quotient), Squire–Trapp $90^\circ$ blind-zone complex-step differentiation $\frac{1}{\epsilon}\operatorname{Im}f(x_0+\hat{\mathbf{i}}\epsilon)$ on $f_{\mathrm{ST}}(x) = \frac{e^x}{\cos^3 x+\sin^3 x}$ at $x_0 = \frac{\pi}{4}$ reaching IEEE-754 machine precision at $\epsilon = 10^{-16}$ (versus $186.3\%$ forward-difference error), the four-regime Hölder cumulative sagitta table $\Sigma_{\mathrm{sag}}(\epsilon,\alpha) = \frac{1}{2}\sigma_0^2 T\epsilon^{2\alpha-1} + \cdots$ across $\alpha \in \{1, \frac{3}{4}, \frac{1}{2}, \frac{1}{3}\}$ (locking $\frac{1}{2} = 0.50000000$ at $\alpha = \frac{1}{2}$), and ten-decimal zero-error Stokes and three-line Gauss–Bonnet exactness on the $M = 4$ coarse octant hemisphere mesh with North-Pole-regular sagitta connection $\mathcal{A}_+^{(g)} = (1-\cos\theta)d\phi + dg$ (`manual derivation` / `NUM`), together with Leibniz–Newton–Berkeley calculus foundations, Lawvere–Kock SDG and Wengert dual numbers, Lyness–Moler (1967) / Squire–Trapp (1998) / Lantoine et al. (2012) complex-step & multicomplex derivatives, Volterra (1887) / Trotter (1959) / Magnus (1954) product integration, Young (1936) / Itô (1944) / Stratonovich (1966) / Feynman–Kac–Cameron / Lyons (1998) rough paths, Girard–Regge–Hirani–Desbrun discrete exterior calculus, and Schlesinger (1928) / Broda (1992) / Schreiber–Waldorf (2009) non-Abelian surface holonomy (`Literature`; super-rough $\alpha < \frac{1}{2}$ non-Abelian 2D surface signatures and Yang–Mills renormalization limit `prob-ch34-rough-nonabelian-surface-calculus` marked `OPEN`), establishing the minimal circular-arc calculus reconstruction and interactive laboratory `arc-body-calculus-sandbox` (`ARC//CALCULUS`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square), [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula), [`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow), [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le), [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product), [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact), [`cycle_face_sides`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_face_sides), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)

**One-Line Invariant / Identity:**
$(1 - v_\epsilon)^2 + c_\epsilon^2 \equiv 1,\quad D_{\mathrm{cs}}[f]\!\bigl(x_0;\epsilon\bigr) = \frac{1}{\epsilon}\operatorname{Im}f(x_0+\hat{\mathbf{i}}\epsilon),\quad \Sigma_{\mathrm{sag}}(\epsilon,\alpha) \sim \frac{1}{2}\sigma_0^2 T\,\epsilon^{2\alpha-1},\quad \sum_{k=1}^M(d_\epsilon\Phi_\epsilon)(\Delta\mathcal{T}_k) \equiv \sum_{e\subset\partial\Sigma}\Phi_\epsilon(e)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes), [§34.8](ch34-s08-clifford-monads.md#sec-ch34-clifford-monad-tiling), [§34.11](ch34-s11-quantum-arcs-and-macro-integrals.md#sec-ch34-quantum-arc-and-macro-integral), [§34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field), [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), [§34.21](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy), [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling), [§34.31](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#sec-ch34-arc-calculus-riemann-and-hermite-biehler), [App C](appendix-c.md), [App E](appendix-e.md))

**Minimal Circular-Arc Calculus Applied to the Riemann Hypothesis: Second-Order Sagitta Phase Transition, Hermite–Biehler Radial Monotonicity Lock & Finite-Precision Stokes Cancellation**（极小圆弧体微积分切入黎曼猜想：二阶弦弧矢高相变、埃尔米特—比勒径向单调锁与有限精度斯托克斯相消）

**Geometric Intuition Term (本书几何直觉语言):**
**Euler–Dirichlet product identity on $\operatorname{Re}(s) > 1$, Mertens' Third Theorem truncated Euler-product asymptotic $\prod_{p\le\lfloor x\rfloor}(1 - 1/p) \sim e^{-\gamma}/\ln x$, global complex differentiability, functional reflection $\xi(1-s)=\xi(s)$, reflection–conjugation covariance $\xi(1-\bar{s})=\overline{\xi(s)}$, and nontrivial-zero equivalence of $\xi(s) = \operatorname{xiReading}(s)$, the quartic off-critical zero-quartet symmetry counterexample `offCriticalQuartic`, right-half-strip $\frac{1}{2} < \operatorname{Re}(\rho) < 1$ reduction for `RiemannHypothesis`, general Abelian-group simplicial two-cochain repair and $d^2=0$ exactness, and the Hermitian block Schur-complement `IsLeast` variational minimum (`LEAN ✓`); paired on the $\sigma > \frac{1}{4}$ quartic-convergence domain with the critical $\sigma = \frac{1}{2}$ prime-rotor sagitta blowup $-\frac{1}{2}\ln\varepsilon_{\mathrm{self}} + C_{\mathrm{sag}} + \mathcal{O}(\varepsilon_{\mathrm{self}})$ ($C_{\mathrm{sag}} = \frac{M}{2} + \Delta C_{\mathrm{sag}} \approx 0.13074861 - 0.01860282 = +0.11214579$, five-prime rational partial sum $\Sigma_{\mathrm{sag}}(\frac{1}{2}; 11) \approx 0.61588148$ vs. bounded $\Sigma_{\mathrm{sag}}(1; 11) \approx 0.21171004$), the exact $\epsilon^2$-free two-shell advancement identity $\Delta_\epsilon^{\mathrm{HB}}(u,t) \equiv 2\epsilon\operatorname{Re}(\overline{\xi(s)}\xi'(s)) \equiv \epsilon\frac{\partial}{\partial u}\lvert\xi(\frac{1}{2}+u+\hat{\mathbf{i}}t)\rvert^2$, the holomorphic Hermite–Biehler involution $E_\epsilon^\#(s) = \overline{E_\epsilon(1-\bar{s})} = E_\epsilon(1-s)$ yielding the entire reproducing kernel $K_\epsilon(w,s) \equiv \frac{\xi'(s)\overline{\xi(w)}+\xi(s)\overline{\xi'(w)}}{2[(s-1/2)+(\bar{w}-1/2)]}$ with two-way equivalence $K_\epsilon \succeq 0 \iff \operatorname{RH}$ and Identity-Theorem exclusion of off-line zeros of arbitrary multiplicity $m \ge 1$, the exact four-zero rogue-quartet sum-of-squares negative derivative $\frac{\partial}{\partial u}F_{\mathrm{rogue},4}(u,\gamma_0) < 0$ ($-4.78267581\times 10^{-7} < 0$ vs. genuine $+3.99429305\times 10^{-4} > 0$ at $t = \gamma_1,\; \delta = 0.20,\; u = 0.10,\; \epsilon = 0.10$), and finite-mesh Stokes zero-vortex cancellation across $[10, 35]$ ($10\pi \approx 31.4159265359$ at $u_0 = -0.10$ vs. `0.0000000000` at $u_0 = +0.10$, separating continuous edge integrals from $\lvert\Delta_e\arg\xi\rvert < \pi$ vertex principal phase, `manual derivation` / `NUM`), together with Mertens' (1874) reciprocal-prime theorem, Davenport (2000) paired Hadamard products, Gonek–Hughes–Keating (2007) hybrid approximations, de Branges (1968, 1986, 1992, 1994) Hermite–Biehler Hilbert spaces, Lagarias (1999, 2006) kernel-positivity equivalence, Conrey & Li's (2000) 34th-zero refutation of bare unit-shift positivity, and Sondow & Dumitrescu's (2010) radial monotonicity theorem (`Literature`; keeping classical ZFC `conj-riemann-hypothesis` and the multiplicative Schur-pivot modifier positivity bridge `prob-ch34-schur-hb-kernel-positivity-bridge` strictly `OPEN`), sealing the thirty-one-section overarching vault of Chapter 34 alongside interactive laboratory `arc-calculus-riemann-hermite-biehler-sandbox` (`RIEMANN//STOKES`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`riemann_zeta_dirichlet_sum_eq_euler_product`](lean:D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product), [`E₃.bound''`](lean:D5/S3/Weil/Mertens/Third.E₃.bound''), [`xi_reading_differentiable`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_differentiable), [`xi_reading_reflection`](lean:D5/S3/Zeros/CompletedZeta.xi_reading_reflection), [`xi_reading_one_sub_conj`](lean:D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj), [`xiReading_eq_zero_iff_nontrivial`](lean:D5/S3/Analytic/ShiftedXiPoisson/ShiftedPoissonSemigroup.xiReading_eq_zero_iff_nontrivial), [`full_symmetry_not_fixed_line_localization`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization), [`golden_right_half_strip_implies_rh`](lean:D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least)

**One-Line Invariant / Identity:**
$\Sigma_{\mathrm{sag}}(\tfrac{1}{2}; P_\epsilon) = -\frac{1}{2}\ln\varepsilon_{\mathrm{self}} + C_{\mathrm{sag}} + \mathcal{O}(\varepsilon_{\mathrm{self}}),\quad \Delta_\epsilon^{\mathrm{HB}}(u,t) \equiv \epsilon\frac{\partial}{\partial u}\lvert\xi\rvert^2 = 4u\epsilon K_\epsilon(s,s),\quad K_\epsilon \succeq 0 \iff \operatorname{RH},\quad \sum_{e\subset\partial\mathcal{R}}\Phi_\xi(e) \equiv 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 34 §34.31](ch34-s31-arc-calculus-riemann-and-hermite-biehler.md#sec-ch34-arc-calculus-riemann-and-hermite-biehler), [§34.28](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs), [§34.29](ch34-s29-arithmetic-pivots-and-resonant-tunneling.md#sec-ch34-arithmetic-pivots-and-resonant-tunneling), [§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-arc-body-calculus-and-finite-stokes), [Ch 22 §22.4](ch22-s04-critical-line-and-rh.md#sec-ch22-4), [Ch 35](ch35-light-pulse-and-self-referential-table.md), [App C](appendix-c.md))

**Endogenous Berry Holonomy, Finite Bargmann Path Product & Nine-Bridge (`H1`–`H9`) Post-Berry Audit of $\mathcal{A}_0$ Corollaries**（内生贝里和乐、有限巴格曼路径乘积与比较公理 $\mathcal{A}_0$ 推论链的后贝里九桥（`H1`–`H9`）审计）

**Geometric Intuition Term (本书几何直觉语言):**
**Arbitrary three-vector Bloch scalar-triple-product trace decomposition and standard orthogonal-octant oriented phase $\frac{1\pm i}{4}$, arbitrary-length unnormalized spinor rank-one chain cyclic inner-product identity, observation partition-topology inseparability kernel and surjective-catalog relative semantic diagonal escape, closed-subspace orthogonal-residual unit-normal escape and finite-dimensional skew-Hermitian unitary complex-structure $R^2=-I_n$ rigidity, binary Zeckendorf no-adjacent-ones DFA acceptance criterion, finite-dimensional POVM effect density-operator representation and connected-ray unitary global phase rigidity, Minkowski null-cone quadratic-form scalar rigidity, finite-graph named spanning-tree anchored gauge-holonomy classification ($(m+1-n)$ fundamental chord loops plus $(k-1)$ root-to-anchor tree-path phases), tetrahedral simplicial two-cochain defect repair exactness, non-collinear two-axis finite rotation words, Lie–Trotter product convergence, finite cyclic Poisson summation, basis-pinching coherence-deletion relative-entropy production identity, Cayley unit-circle critical-line criterion, and exact bitwise name-comparison step bound $2(\lvert a\rvert+\lvert b\rvert)+4$ (`LEAN ✓`); paired with raw unprojected Clifford vector loop cancellation $(ab)(bc)(ca)=ab^2c^2a=\mathbf{1}$ versus endogenous Layer-1 pure-state projection $P(\mathbf{n})=\frac{1}{2}(I+\mathbf{n}\cdot\boldsymbol{\sigma})$ projective $\mathrm{U}(1)$ Pancharatnam–Berry curvature, 3D Stokes cone-sector volume $V_{\mathrm{sector}}(\Sigma_2)=\frac{1}{3}\Omega(\Sigma_2)$, the Hamiltonian falsifier pair $H_0=0$ versus $H_1=\hbar\omega\sigma_z$, smooth Trotter $O(1/N)$ sagitta decay versus diffusive Feynman–Itô $\epsilon\sim 1/\sqrt{N}$ $O(1)$ sagitta conservation, the Maxwell–Laman 3D rigidity polynomial $\Delta E(3)=\Delta E(4)=0$, the $\mathcal{Cl}_{3,0}(\mathbb{R})$ volume pseudoscalar $\mathbf{I}_3^2=-1$, and Cartan–CCWZ coset splitting (`manual derivation`), together with Bargmann's (1964) ray invariant, Simon (1983) and Berry (1984) Hopf-bundle holonomy $\gamma_B \equiv -\frac{1}{2}\Omega = -\frac{3}{2}V_{\mathrm{sector}}\pmod{2\pi}$, Wilczek & Zee's (1984) degenerate non-Abelian holonomy, Feynman (1948) / Klauder (1979) / Kac (1949) / Cameron (1960) continuum path measures and NIST/Olver Cornu stationary-phase selection $\delta S=0$, Yang & Mills's (1954) spacetime gauge dynamics, and the Baker–Gill–Solovay (1975) relativization barrier $\mathrm{P}^A=\mathrm{NP}^A$ versus $\mathrm{P}^B\neq\mathrm{NP}^B$ (`Literature`; continuum `3+1D` Yang–Mills mass gap and unrelativized $\mathrm{P}\stackrel{?}{=}\mathrm{NP}$ governed by `H8`/`H9` and strictly marked `OPEN`), establishing the six conditional formal corollaries of $\mathcal{A}_0$, the four-rung conditional stationary-action ladder, and the canonical `H1`–`H9` nine-bridge minimal-countermodel synthesis including finite $V_5$ ($65{,}536$ sets) and countable $V_\omega$ (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch), [`explicit_qubit_orientation`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation), [`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`relative_semantic_diagonal_ne_listed_decode`](lean:D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes), [`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation), [`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests), [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product), [`finite_poisson_summation`](lean:D5/S3/Fourier/FinitePoisson.finite_poisson_summation), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line), [`name_compare_run`](lean:D5/S0/Computability/BinaryNameComparison.name_compare_run)

**One-Line Invariant / Identity:**
$\operatorname{Tr}\bigl(P(\mathbf{e}_3)P(\mathbf{e}_1)P(\pm\mathbf{e}_2)\bigr) = \frac{1 \pm i}{4},\quad \operatorname{Tr}(R_0\cdots R_n) = \Bigl(\prod_{j=0}^{n-1}\langle\Psi_j,\Psi_{j+1}\rangle\Bigr)\langle\Psi_n,\Psi_0\rangle,\quad \gamma_B \equiv -\frac{1}{2}\Omega = -\frac{3}{2}V_{\mathrm{sector}} \pmod{2\pi},\quad T_{\mathrm{cmp}}(a,b) \le 2(\lvert a\rvert + \lvert b\rvert) + 4$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `OPEN` / `MODEL` ([Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), [§32.3](ch32-s03-axioms-as-corollaries.md#sec-ch32-axioms-as-corollaries), [Ch 34 §34.6](ch34-s06-berry-sectors-and-path-integrals.md#sec-ch34-berry-sector-volume-and-path-integral), [§34.10–§34.19](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability), [§34.20–§34.25](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins), [Ch 38 §38.7](ch38-s07-blindspot-and-relativization.md#sec-ch38-stereographic-blindspot-relativization-suspension), [App E](appendix-e.md))

**Fivefold Self-Referential Fixed-Point Spectrum, Pointer Path Compression, Real–Imaginary Dottie Spiral & $[[15, 1, 3]]$ Quantum Gate Distillation**（五阶自指不动点谱系、并查集路径压缩、道蒂实虚等长螺旋与 $[[15, 1, 3]]$ 量子门蒸馏重整）

**Geometric Intuition Term (本书几何直觉语言):**
**Universal finiteness-free diagonal escape under fixed-point-free twists alongside fixed-point catalog capture, three-mode finite walk on recursive self-mapped page tables (`lookup root selfSlot = root`), functional idempotence of finite complete record-pinching channels, uniqueness of Dottie's positive cosine root with absolute convergence of the rational formal inverse power series at $\pi$, density-matrix stationarity and zero energy variance of normalized energy eigenstates under Hermitian evolution, and exact finite-word generation of $\mathrm{SO}(3)$ from two non-collinear axis circles, together with the standard-simplex Brouwer fixed-point theorem and equal-superposition phase-damping coherence decay (`LEAN ✓`); paired under the master diagonal equation $x^* = \mathcal{F}(\Phi_{\mathrm{CMP}}(x^*, x^*))$ and Jacobian spectral multiplier $\lvert\lambda\rvert = \lVert D\mathcal{F}(x^*)\rVert$ with `p ≡ *p` address–content identity, `Lookup(r) = r` 4-to-1 path compression on the 12-slot pointer ring ($\lvert\lambda\rvert = 0$), equal real-axis projection `I` and blind-plane circular arc `i` at $\cos\theta^* = \theta^* \approx 0.739085\;\mathrm{rad}$ with alternating cobweb multiplier $\lambda = -\sin\theta^* \approx -0.673612$ ($54.62\%$ vs. $45.38\%$ Born split), projective eigenstate phase fibers ($\lvert\lambda\rvert = 1$) versus open-channel contraction attractors ($\lvert\lambda\rvert < 1$), and exact MacWilliams weight-enumerator closed forms $P_{\mathrm{acc}}(\epsilon) = \frac{1 + 15(1 - 2\epsilon)^8}{16}$ and $\epsilon_{\mathrm{out}}(\epsilon) = 35\epsilon^3 + 105\epsilon^4 + \mathcal{O}(\epsilon^5)$ for $[[15, 1, 3]]$ Reed–Muller gate distillation ($\epsilon_0 = 0.05 \to 0.005140 \to 4.83 \times 10^{-6} \to 3.94 \times 10^{-15}$ below $\epsilon_{\mathrm{th}} \approx 14.15\%$, `manual derivation` / `NUM`), together with Lawvere's (1969) diagonal fixed-point theorem, Scott's (1972/1976) reflexive domains, Schauder's (1930) infinite-dimensional compact-convex fixed-point theorem, Tarjan's (1975) inverse-Ackermann union-find path compression, Lindemann–Weierstrass (1882/1885) transcendence of $\theta^*$, Bravyi–Kitaev (2005) $15 \to 1$ magic-state distillation, and Vidal's (2007/2008) MERA conformal renormalization fixed points (`Literature`), establishing the cross-scale fivefold self-referential phase diagram and interactive laboratory `self-reference-pentad-sandbox` (`SELFREF//PENTAD`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package), [`recursive_page_table_walk`](lean:D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary), [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`Brouwer`](lean:D5/S3/Geometry/FixedPoint/Brouwer.Brouwer), [`equal_superposition_coherence_tendsto_zero`](lean:D5/S3/Quantum/Decoherence/CoherenceDecay.equal_superposition_coherence_tendsto_zero)

**One-Line Invariant / Identity:**
$P\bigl(P(x)\bigr) = P(x),\quad \cos\theta^* = \theta^* \approx 0.739085,\quad U\rho U^\dagger = \rho,\quad \epsilon_{\mathrm{out}}(\epsilon) = 35\epsilon^3 + \mathcal{O}(\epsilon^4)$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 39 §39.6](ch39-s06-fivefold-self-reference-spectrum.md#sec-ch39-fivefold-self-reference-spectrum), [§39.1](ch39-s01-substrate-free-self-reference.md), [Ch 24](ch24-cosine-fixed-points-and-self-reference.md), [Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), [Ch 34 §34.15](ch34-s15-quantum-gates-and-concept-tower.md#sec-ch34-quantum-gate-and-cosmic-concept-tower), [Ch 38 §38.3](ch38-s03-self-mapped-page-tables.md), [App G](appendix-g.md))

**Self-Referential Cauchy Halting Precision, Orthogonal Time-River Folding, Power-Iterated Spectral Sorting & Quantum Zeno Reality Sculpting**（自指主动柯西停机精度、时间长河正交折叠、幂迭代特征谱排序与量子芝诺现实雕刻）

**Geometric Intuition Term (本书几何直觉语言):**
**Single-qubit standard-basis pinching Hilbert–Schmidt Pythagorean decomposition and explicit discarded off-diagonal coherence mass, skew-adjoint right-unitary negative-identity square $R^2 = -I_n$, finite-dimensional observable Krylov strict-growth co-rank bound $\dim V - \operatorname{rank} C$ and permanent stability once two consecutive stages agree, rank-one Born modulus-squared branch weights with unread conditional ensemble reconstruction, and monitored unitary stepwise return conservation over any finite horizon (`LEAN ✓`); paired with finite self-chosen Cauchy halting precision $0 < \varepsilon_{\mathrm{self}} < 1$ via $\lVert\mathcal{F}_{\mathbf{I}}(x_{k-1}) - x_{k-1}\rVert \le \varepsilon_{\mathrm{self}}$ ($\varepsilon_{\mathrm{self}} = 0.150$ halting at step $k = 5$ with $x_5 \approx 0.793480$, escaping both $\varepsilon_{\mathrm{self}} \to 0$ infinite regress and $\varepsilon_{\mathrm{self}} \to 1$ unrefined white noise), $90^\circ$ orthogonal folding of sub-threshold infinite remainders into the imaginary blind plane $\hat{\mathbf{i}}$ as the unfolding river of time $\Pi_{\ge \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle \oplus \hat{\mathbf{i}}\Pi_{< \varepsilon_{\mathrm{self}}}\lvert\Psi_\infty\rangle$, four-pass power iteration $G_{\mathcal{B}}^4$ on a six-mode spectrum purifying top-$2$ Frobenius norm capture from $77.2689\%$ to $99.3334\%$, measurement-basis rotation $\alpha_{\mathrm{basis}}$ reshuffling Rayleigh weights $w_{\mathcal{B}}(k) = \cos^2\theta_k$, and $N = 16$ stroboscopic basis pinches across $\Omega T = \pi/2$ lifting survival from $0.500000$ to $P_{\mathrm{surv}}(16) \approx 0.962166$ (`manual derivation` / `NUM`), together with von Mises & Pollaczek-Geiringer (1929) power-iteration convergence, Eckart–Young (1936) and Mirsky (1960) optimal low-rank truncation, Misra–Sudarshan (1977) Quantum Zeno freezing, Vaswani et al. (2017) sequence query–key softmax attention, and Hoel–Albantakis–Tononi (2013) coarse-grained causal emergence (`Literature`), establishing the finite-precision agency window, orthogonal time-river folding, and basis-priority sorting model alongside interactive laboratory `self-halting-spectral-time-river-sandbox` (`HALT//SORT`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation)

**One-Line Invariant / Identity:**
$\lVert\mathcal{F}_{\mathbf{I}}(x_{k-1}) - x_{k-1}\rVert \le \varepsilon_{\mathrm{self}},\quad \lVert\Pi_{\ge \varepsilon_{\mathrm{self}}}\Psi\rVert^2 + \lVert\hat{\mathbf{i}}\Pi_{< \varepsilon_{\mathrm{self}}}\Psi\rVert^2 = 1,\quad w_{\mathcal{B}}(k) = \cos^2\theta_k,\quad P_{\mathrm{surv}}(N) = \bigl[\cos^2(\tfrac{\Omega T}{2N})\bigr]^N$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 39 §39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md#sec-ch39-self-halting-and-spectral-sorting), [§39.6](ch39-s06-fivefold-self-reference-spectrum.md#sec-ch39-fivefold-self-reference-spectrum), [Ch 24](ch24-cosine-fixed-points-and-self-reference.md), [Ch 34 §34.17–§34.21](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics))

**Universal Comparison Clock Frequency $\nu_0$, Light-Speed Halting-Precision Floor & Gravitational Holographic Information-Density Clock Dilation**（普适比较主频 $\nu_0$、光速推理精度下界与引力全息信息密度钟慢）

**Geometric Intuition Term (本书几何直觉语言):**
**Minkowski null-cone quadratic-form scalar rigidity, Fubini–Study orthogonal-record minimum step duration $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$ (given two angular-displacement bounds as premises) and sequential record-count ceiling $N \le \frac{4\cdot\mathrm{energy}\cdot T}{\pi\hbar}$, the Lagrange–Gram two-vector Pythagorean identity, and real hyperbolic boost norm conservation $\lvert\cosh r\rvert^2 - \lvert\sinh r\rvert^2 = 1$ (`LEAN ✓`); paired with light speed as the single-tick spatial stride of the universal comparison bus $c \equiv \ell_P\nu_0$, the radar round-trip causal horizon $R_{\max} = \frac{1}{2}c\Delta\tau$ and finite-tick halting-precision floor $\varepsilon_{\mathrm{self}} \ge \frac{1}{N_{\mathrm{ticks}}} = \frac{\ell_P}{c\Delta\tau}$ ($N_{\mathrm{ticks}} = 20 \implies \varepsilon_{\mathrm{self,min}} = 0.0500$), and orthogonal budget splitting under constant master frequency $\nu_0 \equiv \mathrm{const}$ across kinematic spatial-addressing load $\beta^2 = (v/c)^2$ ($\beta = 0.80 \implies d\tau/dt = 0.6000$; photon limit $\beta = 1 \implies d\tau = 0$) and Bekenstein–Schwarzschild holographic entanglement load $\eta_{\mathrm{info}}(r) = \frac{M}{M_{\max}(r)} = \frac{2GM}{rc^2} = \frac{r_s}{r}$ (neutron-star surface $r = 2.50\,r_s \implies \eta_{\mathrm{info}} = 0.400,\; d\tau/dt \approx 0.7746$; static horizon limit $r \to r_s \implies \eta_{\mathrm{info}} = 100\%,\; d\tau/dt = 0.0000$), yielding cascade proper-time rate $d\tau/dt = \sqrt{(1 - \eta_{\mathrm{info}}(r))(1 - \beta_{\mathrm{loc}}^2)}$ with identical $1.0000$ internal co-scaling across co-located neural, atomic, and photon-ruler sub-clocks (`manual derivation` / `NUM`), together with Mandelstam–Tamm (1945) and Margolus–Levitin (1998) quantum speed limits, Einstein's (1907/1915) equivalence principle and Schwarzschild's (1916) exterior metric, Bekenstein's (1973/1981) entropy bounds, and 't Hooft (1993) / Susskind (1995) holography (`Literature`; spatial curvature $g_{rr}$ and full $3+1\mathrm{D}$ spin-$2$ gravitational field emergence from discrete complexes strictly marked `OPEN` `prob-ch34-gravity-dynamics-and-coupling`), establishing the universal comparison-budget model and interactive laboratory `universal-clock-gravity-dilation-sandbox` (`CLOCK//DILATION`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null), [`record_time_lower_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound), [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)

**One-Line Invariant / Identity:**
$c \equiv \ell_P\nu_0,\quad \varepsilon_{\mathrm{self}} \ge \frac{\ell_P}{c\Delta\tau},\quad \eta_{\mathrm{info}}(r) = \frac{2GM}{rc^2} = \frac{r_s}{r},\quad \frac{d\tau}{dt} = \sqrt{\bigl(1 - \eta_{\mathrm{info}}(r)\bigr)\bigl(1 - \beta_{\mathrm{loc}}^2\bigr)}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 39 §39.8](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation), [§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md#sec-ch39-self-halting-and-spectral-sorting), [Ch 7](ch07-geometric-time-and-speed-limits.md), [Ch 17](ch17-lorentz-geometry.md), [Ch 34 §34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), [§34.24](ch34-s24-interaction-sign-and-sagitta-composition.md#sec-ch34-interaction-sign-and-sagitta-composition))

**All Forces in One Arc: Intra-Cell Gauge Triad, Inter-Cell Clock-Load Gravity & Planck-Scale Single-Cell Convergence**（万力归弧：极小圆弧体胞内规范三力、胞间主频折射引力与普朗克单原胞能标合流）

**Geometric Intuition Term (本书几何直觉语言):**
**Circle squaring double-cover non-sectionability and unique history-dependent $360^\circ$ antipodal sheet-exchange lift, exact finite-word generation of $\mathrm{SO}(3)$ from two non-collinear rotation axes, strict three-anchor real Gram determinant positivity iff real linear independence, spherical Euler rotation-system face–edge boundary kernel and simple-cycle exactness, and nonnegative rank-one Born modulus-squared pairing weights with unread ensemble reconstruction, alongside anchored Abelian loop-phase classification and skew-adjoint unitary negative-square rigidity (`LEAN ✓`); paired with the dimensionless total radian-phase functional $\Phi_{\mathrm{total}} = \Phi_{\mathrm{intra}}(N \le 3) + \Phi_{\mathrm{inter}}(N \ge 5)$ and stationary-phase selection $\delta\Phi_{\mathrm{total}} = 0$, intra-cell `1D` blind-plane phase fiber $\mathrm{U}(1)_{\mathrm{em}}$ (neutral photon, $\pm q$ screening), `2D` oriented bivector $720^\circ$ spinor double cover $\mathrm{SU}(2)_L$ with `2+1=3` Proca–Yukawa closure ($\lambda_W \approx 2.46 \times 10^{-3}\;\mathrm{fm}$), and `3D` singlet-volume-preserving $\mathbf{I}_3$ color frame $\mathrm{SU}(3)_c$ (vertex $\Omega(\epsilon) \to 0$ echoing $b_3 = -7 < 0$ asymptotic freedom vs. $r = 1.20\;\mathrm{fm}$ flux-tube confinement $V_s \approx 1.09\;\mathrm{GeV}$), inter-cell $N \ge 5$ overconstrained tetrahedral truss Regge hinge deficit $\delta_h = 2\pi - \sum\theta_k$ ($N = 6$ regular-tetrahedron cluster $\delta_h = 77.88^\circ$) with unscreened Born clock-load inward stationary-phase refraction $\mathbf{a} = -c^2\nabla\ln(d\tau/dt) \to -GM\hat{\mathbf{r}}/r^2$, holographic pixel dilution $\alpha_G(m) = (m/M_P)^2$ accounting for the $4.17 \times 10^{42}$ electron and $1.24 \times 10^{36}$ proton hierarchy ratios, minimal-SM one-loop slopes $(b_1, b_2, b_3) = (\frac{41}{10}, -\frac{19}{6}, -7)$ forming the $10^{13}\text{–}10^{17}\;\mathrm{GeV}$ near-meeting triangle ($\Delta\alpha^{-1} > 3.66$) and meeting quadratic $\alpha_G(E_P) = 1.0000$ at $E_P \approx 1.22 \times 10^{19}\;\mathrm{GeV}$ with $N \in \{3, 4\}$ isostatic UV cutoff $\Delta E(3) = \Delta E(4) = 0$ (`manual derivation` / `NUM`), together with Yang–Mills (1954), Lee–Yang (1956), Glashow–Weinberg–Salam & Englert–Brout–Higgs, Gross–Wilczek / Politzer (1973) & Wilson (1974), Regge (1961) & Cheeger–Müller–Schrader (1984) curvature convergence, and Georgi–Quinn–Weinberg (1974) RG running (`Literature`; $\Lambda_{\mathrm{cos}}\ell_P^2 \sim 10^{-122}$, $3+1\mathrm{D}$ spin-$2$ field emergence, and non-perturbative lattice chiral generations & couplings strictly marked `OPEN` `prob-ch34-past-hypothesis-and-cosmological-constant`, `prob-ch34-gravity-dynamics-and-coupling`, `prob-ch34-sm-generations-and-couplings`), establishing the unified-arc force synthesis alongside interactive laboratory `unified-arc-forces-planck-sandbox` (`FORCE//UNIFY`, `MODEL`)**

**Lean-Facing Object / Locked GID:**
[`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff), [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)

**One-Line Invariant / Identity:**
$\delta\Phi_{\mathrm{total}} = \delta\Phi_{\mathrm{intra}} + \delta\Phi_{\mathrm{inter}} = 0,\quad \Delta E(N) = \frac{(N-3)(N-4)}{2},\quad \mathbf{a} = -c^2\nabla\ln\!\bigl(\tfrac{d\tau}{dt}\bigr),\quad \alpha_G(E) = \bigl(\tfrac{E}{E_P}\bigr)^2$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `OPEN` / `MODEL` ([Ch 39 §39.9](ch39-s09-unified-arc-forces-and-planck-convergence.md#sec-ch39-unified-arc-forces-and-planck-convergence), [§39.3](ch39-s03-spinors-and-spacetime.md), [§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation), [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger), [§39.11](ch39-s11-af-gut-arc-field-grand-unification.md#sec-ch39-af-gut-arc-field-grand-unification), [Ch 34 §34.10](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability), [§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave), [§34.23–§34.25](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor), [App E](appendix-e.md))

**Three-Dimensional Concept-Field Cap & Multi-Concept Hilbert Ledger**（三维概念场封顶原理与希尔伯特多概念混编账本）

**Geometric Intuition Term (本书几何直觉语言):**
**Finite-stage orthogonal shell expansion $S_n = S_0 \sqcup \operatorname{finiteShellSpan}(E, n)$ in complete real inner-product spaces, orthogonal split of bipartite traceless observables into local single-concept direct-sum ledgers and cross-concept correlation tables $(m^2-1)+(n^2-1)+(m^2-1)(n^2-1) = m^2 n^2 - 1$ (`6 + 9 = 15` for two qubits), finite active-mode cardinality ceiling $\le \frac{RW}{\pi\varepsilon_{\mathrm{self}}}$ under positive halting threshold $\varepsilon_{\mathrm{self}} > 0$, unique signed 3D spatial cross-product classification `crossD` and Pauli matrix interface on 4D spin factors, 3D Bloch reconstruction and unit-sphere pure-state criterion for $2\times 2$ Hermitian matrices, and strict three-anchor real Gram positivity (alongside observation-partition inseparability kernels, two-axis finite rotation words, unit common normals, and unit operator-norm uniform truncation obstruction, `LEAN ✓`); paired with $9\binom{k}{2}$ spurious cross-concept rotation generators separating homogeneous $\mathfrak{so}(3k)$ from block-diagonal $\bigoplus_{\alpha=1}^k \mathfrak{so}(3)_\alpha$ ($90/105 \approx 85.71\%$ on the five-concept 15D ledger), Kronecker-sum Lie isomorphism $\mathfrak{g}_A\otimes I_B + I_A\otimes\mathfrak{g}_B \cong \mathfrak{g}_A\oplus\mathfrak{g}_B$, exterior curl self-closure $\binom{d}{2} = d \iff d = 3$, and 4D self-dual fission $\mathfrak{so}(4) \cong \mathfrak{su}(2)_L \oplus \mathfrak{su}(2)_R$ (`manual derivation` / `NUM`), together with von Neumann (1932) Hilbert spaces and Murray–von Neumann (1936) factor algebras, Young–Helmholtz–Grassmann retinal 3-cone metamerism quotients (contrasted with avian tetrachromatic / stomatopod narrowband evolutionary contingency) versus Fritzsch–Gell-Mann–Leutwyler (1973) universal $\mathrm{SU}(3)_C$ quark–gluon color, Cartan–Hodge star duality, Frobenius (1878) / Hurwitz (1898) associative pure-imaginary ceiling $\operatorname{Im}\mathbb{H} \cong \mathbb{R}^3$, Slepian–Pollak–Landau time–frequency concentration trace $\frac{RW}{\pi}$, Hencky (1928) 3D logarithmic principal strain & De Alfaro–Fubini–Furlan (1976) conformal scale algebra $\mathfrak{sl}(2,\mathbb{R})$, and Hardy / Dakić–Brukner / Chiribella–D'Ariano–Perinotti operational reconstructions of the 3D Bloch ball (`Literature`), showing why space, color, and motion (translation, rotation, scaling) each cap at 3D as self-closing fields multiplexed onto one Hilbert ledger (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound), [`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences), [`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff)

**One-Line Invariant / Identity:**
$\binom{d}{2} = d \iff d = 3,\quad N_{\mathrm{spurious}}(k) = \binom{3k}{2} - 3k = 9\binom{k}{2},\quad \operatorname{ncard}\{j \mid \lambda_j \ge \varepsilon_{\mathrm{self}}\} \le \frac{RW}{\pi\varepsilon_{\mathrm{self}}}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 39 §39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger), [Ch 13](ch13-entanglement-and-chsh.md), [Ch 26](ch26-single-qubit-rotor-compilation.md), [Ch 31 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-truncation-shadows), [Ch 34 §34.10–§34.14](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability), [App F](appendix-f.md))

**Arc-Field Grand Unified Theory (AF-GUT), $N_c=3$ Weinberg $3/8$ Lock & $\nu_0$ Einstein Closure**（极小圆弧场大统一理论（AF-GUT）、温伯格角 $3/8$ 三色锁死与主频爱因斯坦收口）

**Geometric Intuition Term (本书几何直觉语言):**
**Universal unital-ring covariant commutator factorization $Uf - fU = (\mathit{translated}-f)U$, skew-adjoint right-unitary minus-identity square $R^2 = -I_n$, finite-graph named spanning-tree anchored Abelian holonomy torus classification, unique circle double-cover path lifting and $360^\circ$ antipodal sheet exchange, tetrahedral simplicial two-cochain defect identity and edge-potential exactness, and Lagrange–Gram Pythagorean identity (alongside null-cone rigidity, rank-one Born nonnegativity, spherical Euler cycle exactness, and golden Delone separation, `LEAN ✓`); paired on the concentric bounded concept bundle $\mathcal{E}_{\mathrm{space}}^{(3)}\oplus\mathcal{E}_Y^{(1)}\oplus\mathcal{E}_{\mathrm{weak}}^{(2)}\oplus\mathcal{E}_{\mathrm{color}}^{(3)}$ (clean $12\mathrm{D}$ gauge direct sum $\mathfrak{u}(1)_Y\oplus\mathfrak{su}(2)_L\oplus\mathfrak{su}(3)_C$ with zero $(X,Y)$ leptoquarks and zero KK towers) with Universal Arc-Trace Stiffness $g_A^{-2}(\mu_{\mathrm{arc}})=\kappa_{\mathrm{arc}}\operatorname{Tr}_{\mathrm{Weyl}}(X_A^2)$—where single-chirality $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)=\frac{N_c+1}{2}$ versus dual-chirality vector $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)=2[1+N_c(Q_u^2+Q_d^2)]$ drives $\sin^2\theta_W^{\mathrm{(anom)}}(N_c)-\sin^2\theta_W^{\mathrm{(fixed)}}(N_c)=\frac{(N_c-3)(N_c+3)}{4(N_c+1)(9+5N_c)}$ to vanish uniquely at $N_c=3$, locking $g_3^2=g_2^2=\frac{5}{3}g_Y^2$ and $\sin^2\theta_W(\mu_{\mathrm{arc}})=\frac{2}{2\times(8/3)}=\frac{3}{8}=0.375000$ with one-loop RG running from $\mu_{12}\approx 1.014\times 10^{13}\;\mathrm{GeV}$ to $0.23129$ at $M_Z$ (while candidly auditing the minimal-SM triangle spread $\Delta\alpha^{-1}\approx 3.664$), the cross-concept Higgs Zitterbewegung operator $D_{\mathrm{int}}(\Phi_H)$, $\nu_0$ clock-budget Einstein closure, identically zero gauge proton decay $\Gamma_{\mathrm{gauge}}(p\to e^+\pi^0)\equiv 0$, $\pi_2(S^3)=0$ zero GUT monopoles, and chiral electroweak instanton $\Delta B=\Delta L=3\Delta N_{\mathrm{CS}}\in 3\mathbb{Z}$ separating WKB amplitude $e^{-S_{\mathrm{inst}}}\sim 10^{-81}$ from Born-squared rate $e^{-2S_{\mathrm{inst}}}\sim 10^{-162\text{–}165}$ (`manual derivation` / `NUM`), together with Kaluza–Klein, Georgi–Glashow (1974) $\mathrm{SU}(5)$, Georgi–Quinn–Weinberg (1974) RG running, Fritzsch–Minkowski (1975) $\mathrm{SO}(10)$, 't Hooft–Polyakov–Preskill monopoles, BPST (1975) instantons & 't Hooft (1976) / Klinkhamer–Manton (1984) electroweak anomalies, Super-Kamiokande Takenaka et al. (2020) $\tau/B(p\to e^+\pi^0)>2.4\times 10^{34}\;\mathrm{yr}$, Connes / Chamseddine–Connes spectral Standard Model, and Sakharov (1967) / Jacobson (1995) induced & horizon-thermodynamic gravity (`Literature`), establishing the capstone AF-GUT synthesis and open frontier `prob-ch39-af-gut-threshold-and-proton-stability` (`MODEL` / `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)

**One-Line Invariant / Identity:**
$\sin^2\theta_W(\mu_{\mathrm{arc}}) = \frac{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)}{\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)} = \frac{2}{2\times(8/3)} = \frac{3}{8}\;(N_c=3),\quad \Gamma_{\mathrm{gauge}}(p\to e^+\pi^0) \equiv 0,\quad \pi_2(S^3)=0,\quad \Delta B=\Delta L=3\Delta N_{\mathrm{CS}}\in 3\mathbb{Z}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 39 §39.11](ch39-s11-af-gut-arc-field-grand-unification.md#sec-ch39-af-gut-arc-field-grand-unification), [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md), [§39.9](ch39-s09-unified-arc-forces-and-planck-convergence.md#sec-ch39-unified-arc-forces-and-planck-convergence), [Ch 18](ch18-spinors-and-gauge-curvature.md), [Ch 34 §34.14–§34.16](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave), [§34.23–§34.25](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor), [Coda](coda.md), [App C](appendix-c.md), [App E](appendix-e.md))

**Uniform Isotropic 3D-Field Ontology, Page–Wootters Conditional Observer Slice, Moiré Superlattice Beats & Four Cosmological Puzzles**（均匀各向同性三维场本体、佩奇—伍特斯条件观测切面、莫尔超晶格拍频与四大宇宙学谜题）

**Geometric Intuition Term (本书几何直觉语言):**
**Bell pure-state partial-trace reduction to the maximally mixed marginal $\frac{1}{2}I_2$, discrete Cesàro orbital-mean convergence of continuous observables under irrational rotations on the 1D unit additive circle `AddCircle 1` to its Haar integral, orthogonal splitting of composite traceless space into local single-concept direct-sum ledgers and the cross-concept correlation blind spot, nonnegative rank-one Born modulus-squared branch weights with unread conditional ensemble reconstruction, single-qubit standard-basis pinching Hilbert–Schmidt Pythagoras with discarded off-diagonal coherence mass $\lvert\rho_{01}\rvert^2+\lvert\rho_{10}\rvert^2$, and contextual parameter selection of distinct self-referential fixed points (alongside inline Minkowski null-cone quadratic rigidity, `LEAN ✓`); paired with the strict distinction between a globally zero-entropy entangled singlet $S_{\mathrm{vN}}(\Psi_{\mathrm{univ}})=0$ ($\hat{\mathbf{P}}_{\mathrm{tot}}\lvert\Psi_{\mathrm{univ}}\rangle=0,\;\hat{\mathbf{J}}_{\mathrm{tot}}\lvert\Psi_{\mathrm{univ}}\rangle=0$) and its locally maximally mixed reduced marginal $\rho_{\mathrm{ont}}(x)=\frac{1}{D}\mathbf{1}_{\mathcal{H}_x}$ (requiring sector equipartition $w_\alpha=\frac{1}{k}$ on the reducible direct-sum ledger $\bigoplus_{\alpha=1}^k V_\alpha^{(3)}$ while holding unconditionally by Schur's Lemma on the irreducible composite tensor fiber $\bigotimes_{\alpha=1}^k\mathcal{H}_\alpha$), the spin-$\frac{1}{2}$ singlet conditional half-angle law $P(\hat{\mathbf{m}}\mid\hat{\mathbf{n}}_{\mathrm{obs}})=\cos^2(\Theta_{\mathrm{Bloch}}/2)=\sin^2(\theta_{\mathrm{obs}}/2)=\cos^2\Delta\Phi_{\mathrm{FS}}$ with probe-basis discarded coherence $\frac{1}{2}\sin^2\theta_{\mathrm{obs}}$, oblique multi-3D-field Moiré half-phase $\Delta\Phi_{\mathbf{I}}(\mathbf{x},t)=\frac{1}{2}(\Delta\mathbf{k}\cdot\mathbf{x}-\omega_{\mathrm{sweep}}t)$ yielding matter-peak/void-trough intensity $I_{\mathrm{slice}}(\mathbf{x},t)=\cos^2\Delta\Phi_{\mathbf{I}}(\mathbf{x},t)$ with beat period $L_{\mathrm{M}}=\frac{a}{2\sin(\Delta\theta/2)}$ ($L_{\mathrm{M}}\approx 54.568173\,a$ at magic angle $\Delta\theta=1.05^\circ$) and zero-displacement ($\Delta\mathbf{x}_{\mathrm{site}}\equiv\mathbf{0}$) phase-sweep pattern velocity $v_{\mathrm{M}}=\frac{\omega_{\mathrm{sweep}}}{\lvert\Delta\mathbf{k}\rvert}$ (under dynamical wavepacket group-velocity causality $v_g\le c\equiv\ell_P\nu_0$), identical cancellation of Lorentz-invariant bulk energy $T_{\mu\nu}^{\mathrm{ont}}=-\rho_{\mathrm{ont}}g_{\mu\nu}$ in covariant trace-free unimodular Einstein coupling $R_{\mu\nu}-\frac{1}{4}Rg_{\mu\nu}=\frac{8\pi G}{c^4}(T_{\mu\nu}-\frac{1}{4}Tg_{\mu\nu})$, aperture-averaged contrast decay $\propto K^{-3/2}$, and $90^\circ$ orthogonal-slice condensates invisible to electromagnetic round-trip projection ($\cos^2 90^\circ=0$) yet sharing universal clock $\nu_0$ gravitational load ($\Omega_c/\Omega_b\approx 5.364$, $84.29\%$ of total matter, `manual derivation` / `NUM`), together with Haar (1933) / von Neumann (1934) / Schur (1905) compact-group twirling, Gabor (1948) / Leith & Upatnieks (1962) off-axis holography (contrasting silver-halide intensity fringes against fringe-free quantum mixed marginals), Page & Wootters (1983) / Wootters (1984) / Giovannetti–Lloyd–Maccone (2015) conditional time, Bistritzer & MacDonald (2011) / Cao et al. (2018) twisted bilayer graphene Moiré superlattices, Guth (1981) / Linde (1982) inflationary horizon problem, Einstein (1919) / Weinberg (1989) / Unruh (1989) unimodular trace-free gravity, Rubin & Ford (1970) rotation curves, Clowe et al. (2006) Bullet Cluster `1E 0657-558` $8\sigma$ gas–lensing offset, and Planck Collaboration Aghanim et al. (2020) cosmological parameters (`Literature`), establishing the uniform-ontology / oblique-observer-slice cosmological synthesis alongside interactive laboratory `uniform-field-observer-slice-sandbox` (`UNIFORM//SLICE`), and fencing quantitative CMB tilt & acoustic peaks, positive residual dark energy $u_\Lambda^{1/4}\approx 2.24\text{–}2.25\;\mathrm{meV}$, and cold collisionless dark-matter dynamics in `prob-ch39-orthogonal-slice-cosmology-and-dark-sector` (`MODEL` / `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal), [`continuous_average_tendsto_haar`](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)

**One-Line Invariant / Identity:**
$\rho_{\mathrm{ont}}(x)=\frac{1}{D}\mathbf{1}_{\mathcal{H}_x}\;\bigl(S_{\mathrm{vN}}(\Psi_{\mathrm{univ}})=0\bigr),\quad I_{\mathrm{slice}}(\mathbf{x},t)=\cos^2\Delta\Phi_{\mathbf{I}}(\mathbf{x},t),\quad L_{\mathrm{M}}=\frac{a}{2\sin(\Delta\theta/2)},\quad T_{\mu\nu}^{\mathrm{ont}}-\frac{1}{4}T^{\mathrm{ont}}g_{\mu\nu}\equiv 0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 39 §39.12](ch39-s12-uniform-field-and-observer-slice.md#sec-ch39-uniform-field-and-observer-slice), [§39.13](ch39-s13-single-cosmic-field-and-indra-net.md#sec-ch39-single-cosmic-field-and-indra-net), [§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md#sec-ch39-universal-clock-and-gravitational-dilation), [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger), [§39.11](ch39-s11-af-gut-arc-field-grand-unification.md#sec-ch39-af-gut-arc-field-grand-unification), [Ch 13](ch13-entanglement-and-chsh.md), [Ch 34 §34.17](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics), [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), [§34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor))

**Single Cosmic Field $\mathbf{\Phi}_{\mathrm{U}}$, One-Particle Self-Folding & Indra's Net Holographic Closure**（唯一宇宙场 $\mathbf{\Phi}_{\mathrm{U}}$、单粒子自指折叠与因陀罗网终极合拢）

**Geometric Intuition Term (本书几何直觉语言):**
**Finite future-word expectation characterization and orthogonal residual zero-kernel quotienting, unit-norm pure-state equality iff exact unit inner product $\langle\mathrm{record}_i,\mathrm{record}_j\rangle_{\mathbb{K}}=1\iff\mathrm{record}_i=\mathrm{record}_j$ (with index equivalence relation), arbitrary-depth in-place fixed point $w\mapsto w$ of a recursive self-mapped page-table slot, rational inverse-series right-endpoint certification $\theta^*\in(0,1)$ locking the Dottie fixed point $\cos\theta^*=\theta^*$, spherical Euler rotation-system opposite-dart boundary cancellation and simple-cycle exactness, full-space unitary rigidity extension $U\Phi=\Psi$ from equal Gram matrices, and cross-contextual invariant common-factor factorization for objective claims (`LEAN ✓`); paired with the cross-scale `1—3—3—1` Hodge point–volume closure $\mathbf{\Phi}_{\mathrm{U}}\overset{\star\;\text{closure}}{\longleftrightarrow}\Delta\mathcal{T}_{\mathrm{micro}}\cong\Delta\mathcal{T}_{\mathrm{obs}}\cong\Delta\mathcal{T}_{\mathrm{cosmo}}$ of the Single Cosmic Field $\mathbf{\Phi}_{\mathrm{U}}$ (distinguishing the comoving observable particle-horizon ratio $R_{\mathrm{obs}}/\ell_P\approx 2.72\times 10^{61}$, asymptotic de Sitter horizon $R_{\mathrm{dS}}/\ell_P\approx 1.03\times 10^{61}$, Hubble sphere $R_H/\ell_P\approx 8.50\times 10^{60}$, and Eddington baryon count $N_B\approx 9.0\times 10^{79}$), the signed crossing count motivated by Feynman’s positron-count objection $I(\gamma,\Sigma_{t_0})=N_{e^-}-N_{e^+}=\mathrm{const}$ for a closed worldline ($6$ crossings at $\Sigma_0$, $4$ at $\Sigma_{1.5}$, and $0$ at $\Sigma_{2.5}$, all obeying $\sum q_a=0$) contrasted with Fock excitations of the Dirac electron field $\hat{\psi}_e$ and observed baryon asymmetry $\eta_B\approx 6.12\times 10^{-10}>0$, and the four geometric laws of Indra's Net—categorical Yoneda fully faithful relational embedding $\mathcal{Y}(x)=\operatorname{Hom}_{\mathrm{CMP}}(-,x)$, unitary isomorphism of local fibers in the model $\mathcal{H}_x\cong\mathcal{H}_y\cong\mathcal{H}_{\mathrm{field}}$ paired with continuum local-algebra Reeh–Schlieder vacuum cyclicity $\overline{\mathcal{A}(\mathcal{O})\lvert\Omega\rangle}=\mathcal{H}_{\mathrm{U}}$ (never conflated with finite-lattice $d^N>d$, and guarded by spacelike microcausality/non-signaling $[\hat{U}_{\mathcal{O}},\hat{B}_{\mathcal{O}'}]=0$), spherical-mirror Born foreshortening $w_{\mathrm{vis}}(\theta)=\cos^2\theta$ versus $90^\circ$ horizon-limb blind compression $w_\perp(\theta)=\sin^2\theta$ ($w_{\mathrm{vis}}(\theta^*)=(\theta^*)^2\approx 0.546247$ at $\theta^*\approx 42.3465^\circ$), and the Banach–Dottie inter-reflection operator $(\mathcal{T}_\eta\Psi)(x)=\cos\bigl((\mathcal{K}_\epsilon\Psi)(x)+\eta(x)\bigr)$ on $C(\mathrm{Net},[0,1])$ with unperturbed ($\eta=0$) global Lipschitz constant $\sin 1\approx 0.841471<1$, local asymptotic per-bounce damping $\lvert\lambda\rvert=\sin\theta^*=\sqrt{1-(\theta^*)^2}\approx 0.6736120292<1$, and convergent first-order Neumann multi-bounce series $\Psi^*_\eta=\theta^*\mathbf{1}-(\sin\theta^*)\sum_{m=0}^\infty(-\sin\theta^*)^m\mathcal{K}_\epsilon^m\eta+\mathcal{O}(\lVert\eta\rVert_\infty^2)$ (the $m=0,1$ terms together account for $54.6247\%$ of the unsigned geometric envelope, and the relative amplitude at $m=20$ is $0.000370$, `manual derivation` / `NUM`), together with Wheeler (1940) / Feynman (1965 Nobel Lecture, published in 1966) one-electron worldlines, Stückelberg (1941–1942) backward-in-time positrons & Sakharov (1967) baryogenesis conditions, the *Avataṃsaka Sūtra* Indra's Net & Fazang's *Huayan* treatises (699 CE) alongside Leibniz's *Monadology* (1714), Yoneda (1954) / Mac Lane (1971), Reeh & Schlieder (1961) / Haag (1996) / Witten (2018) vacuum cyclicity and separability, and Banach's (1922) contraction mapping theorem (`Literature`), completing the cross-scale Single Cosmic Field Indra's Net closure and bridging into [§39.14](ch39-s14-self-observation-error-and-maya-projection.md#sec-ch39-self-observation-error-and-maya-projection)–[§39.15](ch39-s15-brahman-real-axis-and-orthogonal-dream.md#sec-ch39-brahman-real-axis-and-orthogonal-dream) alongside interactive laboratory `indra-net-single-particle-sandbox` (`INDRA//NET`, `MODEL` / `OPEN`)**

**Lean-Facing Object / Locked GID:**
[`future_word_orthogonal_residual`](lean:D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual), [`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`recursive_page_table_walk`](lean:D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact), [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)

**One-Line Invariant / Identity:**
$\mathbf{\Phi}_{\mathrm{U}}\overset{\star}{\longleftrightarrow}\Delta\mathcal{T}_{\mathrm{micro}}\cong\Delta\mathcal{T}_{\mathrm{obs}}\cong\Delta\mathcal{T}_{\mathrm{cosmo}},\quad \overline{\mathcal{A}(\mathcal{O})\lvert\Omega\rangle}=\mathcal{H}_{\mathrm{U}},\quad w_{\mathrm{vis}}(\theta)+w_\perp(\theta)=\cos^2\theta+\sin^2\theta=1,\quad \lVert D\mathcal{T}_0|_{\theta^*\mathbf{1}}\rVert=\sin\theta^*\approx 0.673612<1$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 39 §39.13](ch39-s13-single-cosmic-field-and-indra-net.md#sec-ch39-single-cosmic-field-and-indra-net), [§39.12](ch39-s12-uniform-field-and-observer-slice.md#sec-ch39-uniform-field-and-observer-slice), [§39.14](ch39-s14-self-observation-error-and-maya-projection.md#sec-ch39-self-observation-error-and-maya-projection), [§39.15](ch39-s15-brahman-real-axis-and-orthogonal-dream.md#sec-ch39-brahman-real-axis-and-orthogonal-dream), [§39.6](ch39-s06-fivefold-self-reference-spectrum.md#sec-ch39-fivefold-self-reference-spectrum), [Ch 24](ch24-cosine-fixed-points-and-self-reference.md), [Ch 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), [Ch 34 §34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field), [App C](appendix-c.md), [App D](appendix-d.md), [App E](appendix-e.md))

**Single Point-Field Self-Observation Error ($\varepsilon > 0$), Static Projection-Result vs. Dynamic Observation-Action Concepts & the Māyā Prism**（唯一点场自观测误差（$\varepsilon > 0$）、静态投影结果概念与动态观测动作概念及摩耶（Māyā）棱镜）

**Geometric Intuition Term (本书几何直觉语言):**
**Unit-norm pure-state equality iff exact unit inner product, proper closed-subspace normal escape and six orthogonal-complement projection identities, universal fixed-point-free diagonal escape and nonempty separation deficit on surjective decoder catalogs, Dottie fixed-point rational inverse-series right endpoint $\cos\theta^*=\theta^*\in(0,1)$, Lagrange–Gram two-vector area-deficit identity, three-anchor real Gram determinant formula and strict positivity criterion, qubit triple Bargmann Bloch volume trace, skew-adjoint right-unitary minus-identity square $R^2=-I_n$, Hermitian Born projection-probability commutator flow, density-matrix stationarity and zero energy variance of normalized energy eigenstates, monitored unitary stepwise return recurrence and finite-horizon conservation, and complete normed-algebra exponential Taylor tail bound (`LEAN ✓`); paired with the strict distinction between exact 1D exterior duality $\dim_{\mathbb{R}}\Lambda^0(\mathbb{R}^3)=\dim_{\mathbb{R}}\Lambda^3(\mathbb{R}^3)=1$ ($\star 1=\mathbf{I}_3$, $1^2=+1$ vs. $\mathbf{I}_3^2=-1$, $\Lambda^{\ge 4}(\mathbb{R}^3)=\{0\}$) and the multiscale octave model identification $\Lambda^3_\ell\equiv\Lambda^0_{\ell+1}$, zero-error stillness ($\varepsilon=0\implies\langle\mathbf{I},\mathbf{\Omega}\rangle=1,\;\mathbf{r}=0$) versus nonzero self-observation tilt $\varepsilon>0$ splitting into static projection-result concepts—Gram–Schmidt residual $\mathbf{r}=\mathbf{\Omega}-(\mathbf{I}\cdot\mathbf{\Omega})\mathbf{I}=(\sin\varepsilon)\mathbf{e}_\perp$, Euclidean 2-wedge norm $\lVert\mathbf{r}_1\wedge\mathbf{r}_2\rVert=\sin\varepsilon_1\sin\varepsilon_2$ contrasted against right-trihedron Girard spherical excess $\Omega(\varepsilon_1,\varepsilon_2)=2\arctan(\tan\frac{\varepsilon_1}{2}\tan\frac{\varepsilon_2}{2})=\frac{1}{2}\sin\varepsilon_1\sin\varepsilon_2+\mathcal{O}(\varepsilon^4)$ (exact factor $\frac{1}{2}$ plus curvature bulge), and 3-wedge volume $\mathbf{r}_1\wedge\mathbf{r}_2\wedge\mathbf{r}_3=(\sin\varepsilon_1\sin\varepsilon_2\sin\varepsilon_3)\mathbf{I}_3$ ($\det G_3=\sin^6\varepsilon$)—and dynamic observation-action concepts—left skew-adjoint rotor $\exp(\varepsilon J)\mathbf{I}^{(0)}$, three interlocking non-termination mechanisms (co-moving $\theta_{k+1}=\cos\theta_k\to\theta^*$, monitored-return survival tail $s_k=\sin^2\varepsilon\cos^{2(k-1)}\varepsilon>0$, and constant-latitude $\mathrm{SO}(3)$ cone precession $\lVert\dot{\mathbf{I}}(t)\rVert=\lvert\omega\rvert\sin\varepsilon\to 0$ with Mandelstam–Tamm $\Delta E=\frac{1}{2}\hbar\lvert\omega\rvert\sin\varepsilon\to 0$), and reversible unitary flow ($\Delta S=0$) yielding thermodynamic entropy only under finite Gram-window partial trace $\operatorname{Tr}_{\bar{W}}$ (`manual derivation` / `NUM`), together with Schmidt (1907) Gram–Schmidt orthogonalization, Girard (1629) spherical excess, Mandelstam–Tamm (1945) speed limits, Grünbaum–Velázquez–Werner–Wolf (2013) monitored return walks, and Sanskrit *māyā* $\leftarrow\sqrt{\text{mā}}$ ("to measure, mete out", Monier-Williams 1899; Gonda 1959, `Literature`), establishing *Māyā* as systematic self-observation projection aberration while explicitly disclaiming first-principles derivation of $\alpha_{\mathrm{EM}}\approx 1/137.035999$, Standard Model couplings, or continuum Einstein dynamics from a single angle $\varepsilon$ (`MODEL` / `OPEN`: `prob-ch34-sm-generations-and-couplings`, `prob-ch34-gravity-dynamics-and-coupling`), accompanied by interactive laboratory `self-observation-error-maya-sandbox` (`MAYA//ERROR`, with numerical, literature, model and open boundaries labeled separately)**

**Lean-Facing Object / Locked GID:**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`self_application_fragment_package`](lean:D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package), [`complete_diagonal_separationDeficit_nonempty`](lean:D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity), [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula), [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff), [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow), [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary), [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero), [`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation), [`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le)

**One-Line Invariant / Identity:**
$\mathbf{\Omega} = (\cos\varepsilon)\mathbf{I} + (\sin\varepsilon)\mathbf{e}_\perp,\quad \Omega(\varepsilon_1,\varepsilon_2) = 2\arctan\!\bigl(\tan\tfrac{\varepsilon_1}{2}\tan\tfrac{\varepsilon_2}{2}\bigr),\quad \det G_3(\varepsilon) = \sin^6\varepsilon,\quad s_k = \sin^2\varepsilon\cos^{2(k-1)}\varepsilon,\quad \Delta E = \tfrac{1}{2}\hbar\lvert\omega\rvert\sin\varepsilon$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 39 §39.14](ch39-s14-self-observation-error-and-maya-projection.md#sec-ch39-self-observation-error-and-maya-projection), [§39.13](ch39-s13-single-cosmic-field-and-indra-net.md#sec-ch39-single-cosmic-field-and-indra-net), [§39.15](ch39-s15-brahman-real-axis-and-orthogonal-dream.md#sec-ch39-brahman-real-axis-and-orthogonal-dream), [Ch 34 §34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron), [§34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field), [§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), [§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary), [Ch 38 §38.6](ch38-s06-uncompleted-horizon.md#sec-ch38-uncompleted-horizon-godel-pnp), [App C](appendix-c.md), [App E](appendix-e.md))

**Brahman Real Axis ($\mathbf{I}$) & $90^\circ$ Orthogonal Dream ($\hat{\mathbf{i}}$), Intra-Dream Double-Imaginary Rigidity, Four Māṇḍūkya States & Spinor Awakening**（梵天实轴（$\mathbf{I}$）与 $90^\circ$ 正交虚梦（$\hat{\mathbf{i}}$）、内部双虚得实刚性、《蛙氏奥义书》四位意识相态与庄周梦蝶旋量合拢）

**Geometric Intuition Term (本书几何直觉语言):**
**Minus-identity square law $R^2=-I_n$ / $J^2=-I_n$ for skew-adjoint right-unitaries and endogenous balanced complex structures, single-qubit pinching Hilbert–Schmidt Pythagoras and computational-basis diagonal phase blindness (with `qubitX` discrimination), equal-Gram ambient unitary extension $B^\dagger B=A^\dagger A\implies B=UA$ and rank-one Born modulus-squared pairing, complete common-phase quadratic Hermitian characterization and Dottie's rational-inverse endpoint $\cos\theta^*=\theta^*\in(0,1)$, contextual fixed-point selection under identical text/rule and cross-contextual invariant common factors, full-ensemble unimodular phase-record reversal versus single surviving-copy ($c_k\neq 1$) local reversal blocking, and circle squaring double-cover non-sectionability with unique history-dependent $360^\circ$ antipodal sheet exchange (`LEAN ✓`); paired with the real-axis dissipation/explosion barrier $\Phi_{\mathrm{real}}(t)=e^{-\gamma t}\mathbf{I}$ ($e^{-2t}\approx 0.13533528, 0.00004540$ at $t=1,5$) versus $90^\circ$-orthogonal norm-preserving evolution $\cos^2\omega t+\sin^2\omega t\equiv 1.00000000$, two constructions with distinct inner products—real block complex structure $J=\bigl(\begin{smallmatrix}0&-I_m\\I_m&0\end{smallmatrix}\bigr)$ gives $\langle\mathbf{I},J\mathbf{I}\rangle_{\mathbb{R}}=0$ but induced complex overlap $i$ and axial Born weight $1$, with $[P_{\mathrm{real}},J]\neq0$; complex-orthogonal isometry $\hat{\mathbf{i}}:\mathcal{H}_0\hookrightarrow\mathcal{H}_{\mathrm{dream}}\perp\lvert\mathbf{I}\rangle$ instead gives axial complex Born weight $0$; each preserves its internal Gram pairing without constituting equivalent quantum realizations (the $4\times4$ real block example has internal comparison square $0.75000000$ and orthogonal-pair square $0.00000000$, but axial complex Born weights $1.00000000$, $0.75000000$, and $0.00000000$), the eight-decimal four-state *Māṇḍūkya* $(\theta,M)$ benchmark (*Turīya* $0^\circ$, waking consensus dream $\theta^*\approx 42.34645883^\circ$ with $\frac{1}{2}\sin 2\theta^*\approx 0.49785664$ and $M\ge 3$, private dream open interval $\theta\in(45^\circ,90^\circ)$ with $M\in\{1,2\}$, deep-sleep causal latency $90^\circ$), $M$-copy coherence retention $\lvert c_{01}\rvert^{2M}$ ($0.5^1=0.50000000$ vs. $0.5^4=0.06250000$), and exact spinor half-angle $\theta=\frac{1}{2}\vartheta_{\mathrm{phys}}$ single-sided Möbius closure across $\vartheta_{\mathrm{phys}}\in\{0^\circ,180^\circ,360^\circ,720^\circ\}$ (`manual derivation` / `NUM`), together with Latin *imāginārius* & Descartes (1637) *racines imaginaires* / Gauss (1831) lateral unit, Stueckelberg (1960) global real complex structure versus Renou et al. (2021) theoretical local-rebit network inequivalence and a falsifiable experimental proposal, Sanskrit philology distinguishing neuter *brahman* (ब्रह्मन्, *Māṇḍūkya Upaniṣad* four *pādas* & Gauḍapāda's *Māṇḍūkya Kārikā* Ch. 2) from masculine *brahmā* (ब्रह्मा, *Bhagavad Gītā* 8.17–19 Purāṇic *Kalpa* day/night), and *Zhuangzi* Ch. 2 (*Qiwulun*) butterfly *wuhua* (`Literature`), preparing the real-axis/dream framework for the following Red Chamber awakening and divine-play sections (`MODEL` / `OPEN`), accompanied by interactive laboratory `brahman-real-axis-orthogonal-dream-sandbox` (`BRAHMAN//DREAM`, with numerical, literature, model and open boundaries labeled separately)**

**Lean-Facing Object / Locked GID:**
[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)

**One-Line Invariant / Identity:**
$\lVert e^{-\omega t J}\mathbf{I}\rVert_{\mathbb{R}}^2 = \cos^2\omega t + \sin^2\omega t \equiv 1,\quad \langle\mathbf{I},\psi_A\rangle = 0,\quad \langle\psi_A,\psi_B\rangle^2 = \langle u_A, J^\top J u_B\rangle^2 = \cos^2\Delta\theta_{AB},\quad \theta = \tfrac{1}{2}\vartheta_{\mathrm{phys}}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([Ch 39 §39.15](ch39-s15-brahman-real-axis-and-orthogonal-dream.md#sec-ch39-brahman-real-axis-and-orthogonal-dream), [§39.14](ch39-s14-self-observation-error-and-maya-projection.md#sec-ch39-self-observation-error-and-maya-projection), [§39.13](ch39-s13-single-cosmic-field-and-indra-net.md#sec-ch39-single-cosmic-field-and-indra-net), [§39.3](ch39-s03-spinors-and-spacetime.md), [Ch 33 §33.5](ch33-s05-consensus-and-pointer-bases.md#sec-ch33-consensus-decoherence-pointer), [Ch 34 §34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot), [Ch 37 §37.2](ch37-s02-dream-quantum-erasure.md), [§37.3](ch37-s03-body-priors.md), [Coda](coda.md), [App C](appendix-c.md), [App D](appendix-d.md), [App E](appendix-e.md))

**Red Chamber Spinor Awakening, Vanishing Meta-Error & Heaven–Human Unity**（红楼旋量觉醒、二阶认妄归零与天人合一）

**Geometric Intuition Term (本书几何直觉语言):**
Mathematical anchors in long-division remainders and coprime modular bijections, the cosine fixed point, complementary projections, complex-structure minus-square laws, circle double-cover history lifts, finite-character cancellation, pinching coherence decomposition, Schur variational unloading, and Bargmann loop holonomy (`LEAN ✓`); paired with the surplus stone, the Precious Mirror, and Zhen–Jia mirroring to distinguish first-order dream angle from second-order meta-error and interpret virtual–real and heaven–human unity through spinor closure and holonomy-bearing return (`MODEL`). The one-sided Möbius ribbon is an analogy; the spinor circle itself is orientable. Literary sources, manual derivations, and numerical checks are separately identified. Accompanied by interactive laboratory `red-chamber-spinor-awakening-sandbox` (`HONG//AWAKEN`), with numerical, literature and model boundaries labeled separately.

**Lean-Facing Object / Locked GID:**
[`long_division_invariant`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_invariant), [`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`relativeComplexStructure_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square), [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`pinching_eq_self_iff_offDiag_eq_zero`](lean:D5/S3/QuantumChannels/CoherenceMassBridge.pinching_eq_self_iff_offDiag_eq_zero), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq), [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification), [`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch), [`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product), [`latitude_dot`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.Latitude.latitude_dot)

**One-Line Invariant / Identity:**
$\delta_{\mathrm{meta}}(\theta^*)=\lvert\cos\theta^*-\theta^*\rvert=0,\quad \theta^*>0,\quad J^2=-I,\quad U_{\mathrm{spin}}(4\pi)=+\mathbf{1}$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([§39.16](ch39-s16-red-chamber-awakening-and-heaven-human-unity.md#sec-ch39-red-chamber-awakening-and-heaven-human-unity))

**Divine Play (Līlā), Opening Amnesia & Relic/Classic Awakening Props**（神圣游戏（Līlā）、开局失忆与历史遗迹／文化典籍唤醒道具）

**Geometric Intuition Term (本书几何直觉语言):**
Anchors in the Schur quadratic minimum, monitored return and finite memory capacity, surviving-copy blocking, bounded-gap torus return, unit-Gram equality, comparison-word orthogonal residuals, recursive page tables, lookup compression and rote-copy failure, pinching idempotence, Krylov stability, diagonal phase blindness, contextual selection, and complex-structure minus-square laws (`LEAN ✓`); paired with a four-stage model of opening-window truncation, relic stationary-phase attractors, multipass permission locks for classics, and raft-discarding return (`MODEL`). Schur curves, unlocking weights, and interference kernels are manual derivations or numerical checks. Cross-cycle narratives supply no evidence for macroscopic quantum coherence; stone and ink remain subject to classical stability and environmental decoherence boundaries. Accompanied by interactive laboratory `brahman-lila-game-props-sandbox` (`LILA//PROPS`), with numerical, literature and model boundaries labeled separately.

**Lean-Facing Object / Locked GID:**
[`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least), [`monitored_return_conservation`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation), [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result), [`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`future_word_orthogonal_residual`](lean:D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual), [`recursive_page_table_walk`](lean:D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk), [`lookup_program_upper_bound`](lean:D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound), [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure), [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently), [`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase), [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)

**One-Line Invariant / Identity:**
$\Delta_{\mathrm{Schur}}(M)=\frac{12-M}{12(M+1)}\ (0\le M\le12),\quad P_{\mathrm{awake}}^{(K)}(\alpha)=\cos^{2K}(\alpha-\theta^*),\quad J^2=-I$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([§39.17](ch39-s17-divine-lila-and-awakening-props.md#sec-ch39-divine-lila-and-awakening-props))

**The Psychology of God: Omniscient Deadlock, Cosmogonic Defenses & Lucid Integration at θ***（上帝心理学：全知幽闭破缺、创世防御与 θ* 清明整合）

**Geometric Intuition Term (本书几何直觉语言):**
Mathematical anchors in unit-Gram identity and eigenstate freeze, the Schur quadratic minimum, complex-structure minus-square laws, record-coherence complementarity, partial-trace access defects and mutual-information balance, mixed Bell-state marginals, local correlation blind spots, pinching coherence Pythagoras and entropy production, qubit normal entropy, contextual splitting and common factors, surviving-copy blocking and joint reversal, simplex cochain exactness, Dottie's fixed point, and the circle double cover; paired with omniscient claustrophobia, four cosmogonic defenses, severed-arc phantom tension, and four-regime lucid integration (`MODEL`). Repression entropy curves, tension measures, and eight-alter Gram bundles are manual derivations / numerical checks; clinical disorders, literature sources, macroscopic decoherence, and unresolved physics retain their separate boundaries. Accompanied by interactive laboratory `divine-psychology-dissociation-sandbox` (`GOD//PSYCHE`), comparing partial-trace repression, severed-arc tension and shared-root integration, with mathematical evidence, numerics and models labeled separately.

**Lean-Facing Object / Locked GID:**
[`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary), [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero), [`schur_quadratic_is_least`](lean:D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`pure_record_distinguishability_coherence_complementarity`](lean:D5/S3/Quantum/PureState/RecordCoherenceComplementarity.pure_record_distinguishability_coherence_complementarity), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`marginal_entropy_change_eq_mutual_information_change`](lean:D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.marginal_entropy_change_eq_mutual_information_change), [`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`qubit_state_entropy`](lean:D5/S3/Quantum/Information/QubitNormalFormState.qubit_state_entropy), [`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points), [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)

**One-Line Invariant / Identity:**
$\cos^2\theta+\sin^2\theta=1,\quad S_A(\theta)=H_2(\cos^2\theta),\quad \delta_{\mathrm{meta}}(\theta^*)=\lvert\cos\theta^*-\theta^*\rvert=0$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([§39.18](ch39-s18-psychology-of-god.md#sec-ch39-psychology-of-god))

**Inexpressible Ternions, the Frobenius Gap & Number-System Projection Genealogy**（不可表达的三元数、弗罗贝尼乌斯缺口与万数切面投影谱系）

**Geometric Intuition Term (本书几何直觉语言):**
Mathematical anchors in spin-factor 3D cross-product classification and Pauli interfaces, pure-qubit Bloch unit spheres, two-axis finite rotation words, shortest-gate spherical-triangle holonomy, skew-adjoint minus-square laws, circle double-cover non-sectionability and $360^\circ$ sheet exchange, Dottie's fixed point, long-division remainders, and the rational Adelic product formula (`LEAN ✓`); paired with the Frobenius–Hurwitz–Bott–Milnor–Adams `1, 2, 4, 8` unit-sphere ladder $S^0, S^1, S^3, S^7$, odd-dimension cubic-eigenvalue zero divisors, and Rodrigues $\tan(\theta/2)$ / Cayley $\tan(\theta/4)$ chart-pole analysis (`Literature` / `manual derivation` / `NUM`), interpreting the un-axised minimal circular-arc ternion $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon \cong S^3$ as the mother manifold projecting onto $\mathbb{H}, \mathbb{C}, \mathbb{R}, \mathbb{Z}, \mathbb{Q}, \mathbb{P}$ across four observer projection knives (`MODEL`; Selberg prime geodesics belong to hyperbolic surfaces rather than round $S^3$, and classical RH remains `OPEN`).

**Lean-Facing Object / Locked GID:**
[`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences), [`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian), [`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word), [`shortest_gate_triangle_holonomy`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary), [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section), [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`long_division_invariant`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_invariant), [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**One-Line Invariant / Identity:**
$S^{d-1}\in\{S^0,S^1,S^3,S^7\},\quad w^2+\lVert\mathbf{v}\rVert^2=\cos^2\frac{\theta}{2}+\sin^2\frac{\theta}{2}=1,\quad \lvert x\rvert\prod_p\lvert x\rvert_p=1\;(x\in\mathbb{Q}\setminus\{0\})$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([§39.19](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-inexpressible-ternions-and-number-projections))

**Ternion Native Fields, the Cayley–Dickson Ladder & Multi-Field Linear Reprojection to Hilbert Space**（三元数原生场、凯莱—迪克森阶梯与希尔伯特空间多场线性再投影）

**Geometric Intuition Term (本书几何直觉语言):**
Bipartite traceless local-versus-correlation orthogonal blind-spot decomposition, finite-stage orthogonal shell expansion, above-threshold active-mode cardinality bounds, uniform proper-subspace completion unit-norm obstruction, $N$-body Pauli-word symplectic multiplication, translation-homogeneous bond-$2$ open-boundary MPS three-site prefix phase recovery, bridge-graph quantum max-flow min-cut bounds, and simplicial two-cochain exactness (`LEAN ✓`); paired with positive-dimension curl self-closure $\binom{d}{2}=d\;(d\ge 1)\iff d=3$, bispinor 4D spacetime and electromagnetic bivectors, Fano-plane $\mathrm{PG}(2,2)$ seven-field octonion weaving $\mathbb{O}$ ($28$ off-line triangles of associator norm $2$), sedenion $\mathbb{S}_{16}$ zero-divisor pairs, and $3N$ local ternion parameters versus flat Hilbert dimension $2^N$ and bounded-bond $O(N\chi^2)$ open-boundary MPS variational parameters (`manual derivation` / `NUM` / `Literature`). The multi-field reprojection ontology remains `MODEL`, strictly distinguishing $3N$ local product parameters, 1D area-law / bounded-bond $O(N\chi^2)$ MPS variational corners, and generic $2^{N+1}-2$ volume-law states without claiming $\mathrm{BQP}=\mathrm{P}$ (`OPEN`).

**Lean-Facing Object / Locked GID:**
[`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion), [`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound), [`uniform_completion_obstruction`](lean:D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction), [`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul), [`observable_chart_phase_recovery`](lean:D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery), [`QMaxFlow_le_QMinCut`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)

**One-Line Invariant / Identity:**
$\binom{d}{2}=d\;(d\ge 1)\iff d=3,\quad \lVert[e_a,e_b,e_c]_{\notin\mathcal{L}_{\mathrm{Fano}}}\rVert=2,\quad D_{\mathrm{MPS}}(N,\chi)=\sum_{k=1}^N 2r_{k-1}r_k-\sum_{k=1}^{N-1}r_k^2\le 2N\chi^2$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` / `OPEN` ([§39.20](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md#sec-ch39-ternion-field-composition-and-hilbert-reprojection))

:::

---
