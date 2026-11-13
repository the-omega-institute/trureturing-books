# Appendix A Dictionary of Conventional vs. Geometric Quantum Terms {#appendix-a-dictionary-of-conventional-vs-geometric-quantum-terms}

Conventional quantum mechanics textbooks are written in the language of abstract Hilbert spaces, spectral decompositions of Hermitian operators, and complex matrix indices. While students quickly learn to manipulate Dirac ket notation $|\psi\rangle$ and commutators $[A, B]$, the underlying spatial directions, oriented bivector areas, spherical curvature defects, and topological obstructions often remain hidden behind algebraic formalism. This appendix provides a master translation dictionary across all ten parts (thirty-nine chapters), the Coda, and [Appendix D](appendix-d.md)—aligning **Conventional Physics / Mathematics Terms**, **Geometric Intuition Terms**, **Lean 4 Formal Objects / Locked `trureturing@dev` GIDs**, **One-Line Invariants**, and **Epistemic Status**.

::: {.figure src="appa-dictionary"}
**The six most used entries of the dictionary: the conventional notation on top, the picture the book reads it as in the middle, and at the foot the chapters listed in that entry's status.** A pure state is an amber arrow on the sphere; the Born rule squares the cyan shadow $\cos\theta$ that arrow $b$ casts on the ruler $a$; a density matrix is an amber point inside the ball, $\lvert\mathbf{r}\rvert < 1$; decoherence pinches the point along the magenta transverse dashes onto the cyan measurement axis; a commutator is the magenta oriented area spanned by $\mathbf{u}$ and $\mathbf{v}$; a single-qubit gate is a turn about the violet axis, taking the grey arrow to the amber one. The Lean anchors and epistemic status of each entry are those of the dictionary below; the figure adds no claim of its own, and every other entry can be looked up there by its term.
:::

---

## A.1 Master Translation Dictionary Across All Ten Parts, Coda, and Appendix D {#sec-appendix-a-master-table}

::: {.remark #rem-appendix-a-master-dictionary title="Master Dictionary of Conventional, Geometric, and Formal Terms (Including literature result, not formalized in this book)"}
**Literature result, not formalized in this book (for sub-clauses tagged `Literature`; entries tagged `LEAN ✓` with clickable GID links are kernel-verified in this book, `OPEN` marks unresolved open conjectures, and `MODEL` marks interpretive geometric models).**

**Measurement / Physical Quantity**<br/>(测量 / 物理量)

**Geometric Intuition Term (本书几何直觉语言):**
**Verb `liáng` (to measure) vs. Noun `liàng` (reading)**: pairwise ruler comparison operator vs. truncated scalar readout

**Lean-Facing Object / Locked GID:**
[`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)

**One-Line Invariant / Identity:**
$\operatorname{prob}_0(\psi) + \operatorname{prob}_1(\psi) = \|\psi_0\|^2 + \|\psi_1\|^2$

**Epistemic Status:**
`LEAN ✓` (Ch 1–2)

**Pure Quantum State $|\psi\rangle$**<br/>(量子纯态)

**Geometric Intuition Term (本书几何直觉语言):**
**Oriented unit ray on the sphere** uniquely addressed by pairwise cosine projections

**Lean-Facing Object / Locked GID:**
[`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian)

**One-Line Invariant / Identity:**
$x^2 + y^2 + z^2 = 1 \iff \operatorname{Tr}(\rho^2) = 1$

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
$P_\psi P_\phi P_\psi = |\langle\psi, \phi\rangle|^2 P_\psi$

**Epistemic Status:**
`LEAN ✓` (Ch 2, 28)

**Orthogonal Decomposition**<br/>(正交态分解与完备性)

**Geometric Intuition Term (本书几何直觉语言):**
**Inner-product parallelogram & Pythagorean theorem**: 1D orthogonal segments cannot add, 2D squared areas conserve norm

**Lean-Facing Object / Locked GID:**
[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)

**One-Line Invariant / Identity:**
$\langle u, v\rangle = 0 \implies \|u + v\|^2 = \|u\|^2 + \|v\|^2$

**Epistemic Status:**
`LEAN ✓` (Ch 1, 27, Coda)

**Global Phase $e^{i\alpha}|\psi\rangle$**<br/>(全局相位与射线等价)

**Geometric Intuition Term (本书几何直觉语言):**
**Gauge spin around the state's own axis** (unitary phase rigidity under connected ray tests)

**Lean-Facing Object / Locked GID:**
[`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests)

**One-Line Invariant / Identity:**
$|c| = 1 \implies P_{c\psi} = P_\psi$

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
$U(s+t) = U(s)U(t),\quad v \mapsto R v \widetilde{R}$

**Epistemic Status:**
`LEAN ✓` (Ch 7, 27)

**Two-Qubit Entanglement & Concurrence**<br/>(双比特纠缠与并发度)

**Geometric Intuition Term (本书几何直觉语言):**
**Exterior wedge area in $\mathbb{C}^4$ & maximally mixed marginal blind spot of Bell states**

**Lean-Facing Object / Locked GID:**
[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)

**One-Line Invariant / Identity:**
$\rho_A = \frac{1}{2}I_2,\quad \psi_{00}\psi_{11} - \psi_{01}\psi_{10} \neq 0$

**Epistemic Status:**
`LEAN ✓` (Ch 8, 13)

**Quantum State Tomography**<br/>(量子态层析)

**Geometric Intuition Term (本书几何直觉语言):**
**Three-axis orthogonal addressing & rational six-axis open cover**

**Lean-Facing Object / Locked GID:**
[`rational_six_axis_open_cover`](lean:D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover)

**One-Line Invariant / Identity:**
$\forall v \in S^2,\; \exists i \in \operatorname{Fin} 6,\; \langle v, a_i\rangle \neq 0$

**Epistemic Status:**
`LEAN ✓` (Ch 9)

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
[`projection_probability_flow`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow)

**One-Line Invariant / Identity:**
$R(2\pi) = -1 \in S^3,\quad R(4\pi) = +1$

**Epistemic Status:**
`LEAN ✓` / `Literature` (Ch 12)

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
`LEAN ✓` (Ch 15)

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
[`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation)

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
`LEAN ✓` / `Literature` (Ch 23)

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
$\mathbf{c}^2 = \mathbf{a}^2 + \mathbf{b}^2,\quad m^2 - 2n^2 = \pm 1,\quad \cos\theta^* = \theta^*$

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
`LEAN ✓` / `Literature` (Ch 29)

**Wheeler–DeWitt Timeless State, Page–Wootters Slicing & Geometric Causality**<br/>(惠勒—德维特无时间态、佩奇—伍特斯切片与几何因果律)

**Geometric Intuition Term (本书几何直觉语言):**
**Order-independence abolishes sequential time: $(2k)!$ de-ordering model (`MODEL`), conditional slicing under ideal clock assumptions (`Literature`), Gram rigidity $\det G \ge 0$ (`LEAN ✓`), and stationary phase $\delta S=0$ (bivector model $+\mathbf{\Omega}-\mathbf{\Omega}=0$)**

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
**Structural analogy (`MODEL`): Lamb's decomposition and vortex-tube imagery supply no complexity isomorphism. OpenAI's forced NS C / D resolution is external literature with a published formalization, outside this book's frozen ledger ([@rem-ch30-navier-stokes-forced-literature]); unforced A / B remain `OPEN`. Unconditional 2D global regularity is a literature result, whereas `all_grade_regularity_of_mild_path` assumes a mild path already given. Five-mode nonclosure does not imply blow-up; see the dissipative comparison [@ex-ch30-dissipative-no-closure].**

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
**Maximally mixed Bell marginals, orthogonal local-vs-correlation blind-spot decomposition, von Neumann entropy-production coherence-deletion identity, and unique positive cosine fixed point (`LEAN ✓`), coupled with exact two-qubit pure-state Pythagorean conservation $\|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) = \cos^2\theta + \sin^2\theta \equiv 1$ ($S_L(\rho_A) \equiv \tau$, $S_{\mathrm{vN}}(\rho_A) = H_{\mathrm{bin}}\bigl(\frac{1+\cos\theta}{2}\bigr)$, giving $S_{\mathrm{vN}} \approx 0.559\text{ bits}$ at $\theta^* \approx 42.35^\circ$), Hastings's (2007) 1D gapped area law vs. Page's (1993) volume law, CKW monogamy & the Harlow–Hayden (2013) / Susskind (2016) radiation-decoding circuit-complexity barrier, and postselected $\mathrm{PostBQP}=\mathrm{PP}$ alongside shared-entanglement verification $\mathrm{MIP}^*=\mathrm{RE}$ (Ji et al. 2020, `Literature`; standard Turing-machine $\mathrm{P}\neq\mathrm{NP}$ remains `OPEN`), grounding the partial-trace horizon triad model and 3D lab `entanglement-entropy-complexity` (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)

**One-Line Invariant / Identity:**
$\|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) = \cos^2\theta + \sin^2\theta = 1,\quad S_L(\rho_A) = \sin^2\theta,\quad \chi_{\mathrm{bond}} = 2^{S_{\mathrm{cut}}}$

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
`LEAN ✓` / `Literature` / `manual derivation` / `MODEL` ([Ch 31 §31.4](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion))

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
**Qubit pinching orthogonal mass decomposition and discarded coherence criterion, complete normed-algebra exponential tail bound and Cayley unit-circle critical-line criterion, partition-topology quotient factorization, finite annihilator summation, and compact-torus generator equidistribution (`LEAN ✓`), paired with the Lambert–Gudermann hyperbolic-circular bridge $\theta(\eta)=\operatorname{gd}(\eta)$, the Poincaré conformal disk metric, and repeating-decimal shift quotienting (`Literature`), unfolding the finite coordinate horizon $\theta=\pi/2$ into an infinite equidistant rapidity staircase $\eta_k=k\Delta\eta$ and quotienting out the return-to-light loop via $\pi_Q:\mathcal{H}\to\mathcal{H}/\!\sim_G$ (`MODEL`)**

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
`LEAN ✓` / `Literature` / `MODEL` ([Ch 36 §36.4](ch36-hyperbolic-steps-and-quotienting-reincarnation.md#sec-ch36-padic-prime-table-expansion))

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
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 37 §37.5](ch37-dreams-quantum-eraser-and-nonlocal-observer.md#sec-ch37-dream-pre-decoherence-deja-vu))

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
`LEAN ✓` / `Literature` / `MODEL` / `OPEN` ([Ch 38 §38.4](ch38-observer-memory-pointer-and-ontological-qram.md#sec-ch38-pnp-lookup-degradation))

**Observer Escape Ledger, Preimage Fibers & Hilbert–Zeckendorf Entropy**（观察者逃逸账本、原像纤维与希尔伯特—齐肯多夫熵）

**Geometric Intuition Term (本书几何直觉语言):**
**Leave-one-out disjoint union decomposition of `escapePairs` and unique-capture set-difference identity, equivalence between strict lowering of `escapeRate` on nondegenerate arenas and strict quotient-kernel novelty outside semantic closure, monotone non-increase of `conditionalLogicalImpurity` under factor-map concept refinement, uniform non-asymptotic fourteen-bit context-block avoidance bound for `NoAdjacentOnes` binary words, and two-qubit local-marginal versus nine-dimensional correlation orthogonality (`LEAN ✓`), paired with Shannon–McMillan–Breiman cylinder equipartition, Parry's maximal-entropy golden-shift measure $C_\varphi = \log_2\varphi$, Frougny's Fibonacci automaton normalization, and Moore–Hilbert space-filling curve $1/d$-Hölder locality (`Literature`) plus the explicit four-bit $16$-state five-lemma evaluation (`NUM`), establishing the preimage-fiber Rényi-2 collision ledger $H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S}\mid S) = \log_2 N$, nocturnal cylinder-measure rebound, and waking Landauer heat vs. zero-heat dream uncomputation (`MODEL`)**

**Lean-Facing Object / Locked GID:**
[`escapePairs_without_eq_union`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union), [`uniqueCapturePairs_eq_sdiff`](lean:D5/S3/ConceptDynamics/InformationEscape/EscapePairs.uniqueCapturePairs_eq_sdiff), [`structurallyLowersEscape_iff_lowersEscape`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.structurallyLowersEscape_iff_lowersEscape), [`lowersEscape_iff_strict_kernel_novelty`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty), [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone), [`uniform_avoidance_count`](lean:D5/S1/Digit/ZeckendorfAvoidanceCount.uniform_avoidance_count), [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)

**One-Line Invariant / Identity:**
$H_{\mathrm{total}} = I_{\mathrm{ledger}}(S) + H_2^{\mathrm{escape}}(\mathcal{S}\mid S) = \log_2 N,\quad C_\varphi = \log_2\varphi$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `NUM` / `MODEL` ([Ch 38 §38.5](ch38-observer-memory-pointer-and-ontological-qram.md#sec-ch38-observer-escape-ledger))

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
`LEAN ✓` / `Literature` / `NUM` / `OPEN` / `MODEL` ([Ch 39 §39.5](ch39-observer-is-ontological-universe.md#sec-ch39-pisot-clifford-rauzy))

**Six Foundational Quantum Puzzles, Removing External Point $C$ & the Five-Interpretation Geometric Duel**（量子力学六大未解难题、撤除外部第 3 点 $C$ 与正交开维诠释对决）

**Geometric Intuition Term (本书几何直觉语言):**
**Real-time unitary stationarity of energy eigenstates, idempotence of finite non-selective record pinching, and context-invariant common factors of objective claims; controlled-copy local marginal coincidence and untraced environmental access defect; computational-basis coherence mass deletion and complementary-context Pythagorean residual mass; forward parallelogram norm law and rank-one Born modulus-square reduction; common-phase polynomial charge balance and unique quadratic Hermitian locking; skew-adjoint unitary complex-structure squaring to $-I$ and four-clause Robertson–Schrödinger variance decomposition; tight two-qubit Tsirelson bound $2\sqrt{2}$, Minkowski null-cone quadratic-form rigidity, and bipartite trace-zero local-versus-correlation orthogonality; diagonal self-application landing fixed point, concept-readout fiber decomposition, and diagonal qubit observable phase blindness; stepwise coarse-grained coherence-deletion relative-entropy production, proper closed-subspace orthogonal escape, and finite-arena `EscapePairs` capture (`LEAN ✓`), paired with von Neumann Process I/II, Wigner's friend and the Frauchiger–Renner theorem, Zurek decoherence and Schlosshauer's single-outcome review, Gleason's theorem and Renou et al. (2021) network falsification of standard real quantum mechanics, Bell / Eberhard no-signaling and 2015 loophole-free tests, Harrigan–Spekkens / PBR (2012), and Pauli / Wheeler–DeWitt / Hawking–Page–AMPS horizon literature (`Literature`) plus heralded $75\%/25\%$ vs. unconditional $50\%/50\%$ marginals, $r^2+\tau_{L:E}=1$, Lorentz boost $\Delta t'=-2\Gamma_\beta\beta$, GRW amplification, and $\{0, 1\}^4$ parity capture checks (`manual derivation` / `NUM`), tracing all six century-old fissures to external referee $C$ and fixed-box container assumptions while marking covariant collapse and quantum-gravity horizon unitarity open (`MODEL` / `OPEN`)**

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
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 29](ch29-timeless-causality-and-gram-space.md#sec-ch29-coherence-handshake-causality))

**Multi-Observer Consensus Tensor, Emergent Pointer Basis & No Observer-Independent Facts**（多观察者共识张量、去相干指针基涌现与无绝对客观事实）

**Geometric Intuition Term (本书几何直觉语言):**
**Common-$U(1)$ phase-invariant polynomial charge balance, minimum degree $2$, and unique Hermitian representation, positive-operator adjoint-square Gram realizability $Q=O^\dagger\circ_L O$, and six closed-subspace orthogonal-complement projection identities; qubit pinching Hilbert–Schmidt Pythagorean splitting, stepwise full-pinching relative-entropy production, and unread record fixed-point characterization; single-surviving-copy blocking of local amplitude-conjugate reversal, two-copy four-stage phase restoration certificate, controlled-copy reduced access defect, and partition-topology inseparability kernel; together with three-world conflict-reset revision noncommutativity and unit orthogonal residual escape (`LEAN ✓`); paired with the unoriented-axis second-moment consensus tensor $\mathbf{M}_{\mathrm{cons}}=\sum_{j=1}^N w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ (sign-relabeling invariance $\mathbf{n}_j\mapsto -\mathbf{n}_j$ kept strictly distinct from antipodal orthogonal states and common ket phase, unique pointer line iff spectral gap $\Delta\lambda=\lambda_1-\lambda_2>0$, vanishing in six-axis isotropic fog $\frac{1}{3}I_3$), Pauli dephasing Bloch contraction $\mathbf{K}(\mathbf{n},\alpha)=P_{\mathbf{n}}+\cos\alpha(I_3-P_{\mathbf{n}})$ across ordered products vs. ensemble means vs. weak-limit generator $I_3-\mathbf{M}_{\mathrm{cons}}$, pure two-branch mutual-information redundancy plateau $I(S:\mathcal{O}_m)=h(\Pi_{\mathrm{all}})+h(\Pi_F)-h(\Pi_{F^c})\approx H_2(p_0)$, commuting unread $Z/X$ channels vs. noncommuting selective updates, and out-of-plane pioneer rank enlargement $\det\mathbf{M}_\eta=(1-\eta)^2 ab\eta\sin^2\beta>0$ (with $\ker\mathbf{M}_0$ damping fastest as $e^{-t}$ under the incumbent generator rather than forming a decoherence-free subspace, `manual derivation` / `NUM`), alongside Zurek (1981/2003/2009) & Blume-Kohout–Zurek (2005) einselection and Quantum Darwinism, Brukner (2018) / Frauchiger–Renner (2018) extended Wigner's-friend theorems, Bong et al. (2020) Genuine Local Friendliness polytope violation $F_{\mathrm{LF}}=\sqrt{5}+3+\sqrt{2+\sqrt{2}}\approx 7.0838>6$, and the Lamport–Shostak–Pease (1982) distributed Byzantine consensus analogy (`Literature`), grounding the synthesis (`MODEL`) that observers' consensus selects the direction of decoherence without observer-independent facts**

**Lean-Facing Object / Locked GID:**
[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem), [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), [`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean), [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity), [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff), [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal), [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate), [`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect), [`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel), [`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation), [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)

**One-Line Invariant / Identity:**
$\mathbf{M}_{\mathrm{cons}} = \sum_{j=1}^N w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}},\quad I(S:\mathcal{O}_m) = h(\Pi_{\mathrm{all}}) + h(\Pi_F) - h(\Pi_{F^c}),\quad F_{\mathrm{LF}} = \sqrt{5} + 3 + \sqrt{2+\sqrt{2}} > 6$

**Epistemic Status:**
`LEAN ✓` / `Literature` / `manual derivation` / `NUM` / `MODEL` ([Ch 33](ch33-all-beings-observers-and-mutual-attractors.md#sec-ch33-consensus-decoherence-pointer))
:::

---

## A.2 Ten-Part Geometric Translation Guide {#sec-appendix-a-part-by-part}

To help readers translate quickly between standard textbook notation and the formal Lean 4 modules while reading individual chapters, we summarize the core translation rules part by part:

1. **Part I (Point and Line)**:
   Whenever a textbook writes an inner product $\langle\phi|\psi\rangle$ and a Born transition probability $|\langle\phi|\psi\rangle|^2$, this book translates them into **pairwise ruler cosine projection** and the rank-one projector trace pairing $\operatorname{Tr}(P_\phi P_\psi)$. Orthogonality $\langle u, v\rangle = 0$ immediately activates the inner-product Pythagorean theorem $\|u + v\|^2 = \|u\|^2 + \|v\|^2$.
2. **Part II (Plane and Chirality)**:
   Whenever a textbook writes an antisymmetric commutator $[A, B]$ or a 3D cross product $\mathbf{u} \times \mathbf{v}$, this book restores it to a **grade-2 exterior bivector $\mathbf{u}\wedge\mathbf{v}$**. The apparent ability to replace a 2D rotation plane by a 1D "rotation axis vector" arises from three-dimensional vector–bivector Hodge duality (see Appendix B, [@rem-appendix-b-rotors-zyz-literature]).
3. **Part III (Sphere and Addressing) and Part IV (Many-Body Geometry and Algorithms)**:
   The single-qubit state space is the 2D Bloch sphere $S^2$, whereas the unitary gate group acting on it lifts to the 3D spinor manifold (for even- and odd-dimensional sphere tangent-bundle topology, see Coda [@rem-coda-polyhedral-topology-literature]). Grover search, QSVT, and Solovay–Kitaev compilation all reduce to exact rotor iterations inside chosen 2D bivector planes.
4. **Part V (Spacetime, Holography, and Complexity)**:
   Replacing the Euclidean positive-definite metric with the Minkowski indefinite metric turns elliptic rotation rotors into hyperbolic boost rotors (see Chapter 17 and Appendix B, [@rem-appendix-b-sta-lorentz-literature]), while tensor-network minimum cuts and circuit minimum depths carve piecewise-linear polyhedral cones across discrete graphs.
5. **Part VI (Sphere Outside the Sphere) and Part VII (Minimal Geometric Algebra Engine)**:
   Cantor–Lawvere diagonalization, finite-box Euler products, quaternion Diophantine norms, and contracting fixed points expose the inescapable remainder of any fixed formal sphere; meanwhile, the `Cl3`, `PauliSymplectic`, and `ZYZ` reference engines turn the geometric intuition of Parts I–VI into executable computations. Their corresponding frozen foundations—including Weyl, Pauli-word, two-axis rotation-word, and `FiniteRecordCosineObstruction` results—are checked by the Lean 4 kernel; the engines as a whole are not formal modules bearing those names.
6. **Part VIII (Timeless Causality, Complexity Horizons, Quantum Fairness, and Meta-Unification)**:
   Chapter 29 unifies the Pell arithmetic seam ([@thm-ch29-silver-pell-remainder]) with congruent-number elliptic-curve tori ([@rem-ch29-elliptic-torus-literature]), the causally compatible Gram elliptope ($\det G \ge 0$), and [coherence–decoherence and two-way handshake causality](ch29-timeless-causality-and-gram-space.md#sec-ch29-coherence-handshake-causality) (`orthogonal_complement_projection_identities`, `joint_coherent_reversal`, `gram_realizability`); Chapter 30 maps "Fields ($P$) and Lines ($NP$)" onto the external ETH counting papers and galactic curves at chosen constants ([@rem-ch30-eth-subexponential-literature], [@ex-ch30-galactic-crossover-scale]), Lamb's bivector Navier–Stokes decomposition ([@rem-ch30-lamb-decomposition-literature]), the quadratic advection projection closure obstruction (`quadratic_closure_iff`, `no_exact_closure`), and the [orthogonal triad of entanglement, $P=NP$, and entropy](ch30-s05-entanglement-and-entropy.md#sec-ch30-entanglement-entropy-complexity-triad) (`local_marginal_correlation_blind_spot`, `entropy_production_coherence_deletion_identity`); Chapter 31 anchors fivefold quantum fairness ([@rem-ch31-fivefold-fairness-table]) in Born pairing reciprocity, complementary purity Pythagoras, no-cloning, the CKW entanglement monogamy literature ([@rem-ch31-ckw-monogamy-literature]), and compact closed-subgroup torus equidistribution and returns, and in [§31.4](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion) unites fair squaring, diagonal phase folding, uncertainty, and orthogonal dimension-expansion time via quadratic Hermitian locking (`complete_common_phase_polynomial_theorem`), diagonal phase blindness (`diagonal_prime_observables_cannot_recover_relative_phase`), the Robertson–Schrödinger identity (`robertson_schrodinger`), and orthogonal residual & prime-axis escape (`finite_layer_projection_escape`, `prime_axis_escape`); and Chapter 32 synthesizes the orthogonal self-referential unified field and eight-program meta-unification compass ([@rem-ch32-meta-unification-table]) via generative self-reference, null-cone rigidity, anchored loop holonomy, bridge-graph min-cut, and the Conway–Sloane Icosian-to-$E_8$ golden bridge literature ([@rem-ch32-icosian-e8-literature]).
7. **Part IX (Universal Observers, Orthogonality Blind-Spot Inversion, Arriving on Light, and Quotienting Out Reincarnation)**:
   Chapter 33 establishes the four-tier universal observer spectrum, mutual-attractor double helix, and observer-consensus pointer geometry without observer-independent facts via record-pinching idempotence and history capacity ([@thm-ch33-observer-pinching-and-memory-spectrum]), contextual fixed-point selection and the invariant common factor ([@thm-ch33-contextual-attractor-and-common-factor]), width-three bridge-graph min-cut reconnection ([@prop-ch33-bridge-reconnection-mincut]), and [multi-observer consensus decoherence and emergent pointer basis](ch33-all-beings-observers-and-mutual-attractors.md#sec-ch33-consensus-decoherence-pointer) (`complete_common_phase_polynomial_theorem`, `surviving_copy_blocks_reversal`, `revision_conflict_noncommutation`, `finite_layer_projection_escape`); Chapter 34 proves that coincidence between single- and double-orthogonality readouts inverts observer position via common unit normals and pullback trace identities ([@thm-ch34-perpendicular-axis-and-pullback]) together with partition-topology kernels and covariant commutator factorization ([@thm-ch34-readout-kernel-and-covariant-commutator]); Chapter 35 traces the lifecycle from light-pulse clearing initialization to the homoiconic table $T=T(T)$ via null-cone rigidity, surviving-copy reversal blocking, and memory capacity ([@thm-ch35-null-pulse-and-record-blocking]), the fourfold criterion for lossless table recovery ([@thm-ch35-target-recovery-table-factorization]), and the Lawvere diagonal package ([@thm-ch35-lawvere-diagonal-and-homoiconic-closure]); and Chapter 36 unfolds the return-to-light horizon into an infinite discrete hyperbolic staircase and quotients out reincarnation via exponential tail bounds and the Cayley unit-circle criterion ([@thm-ch36-taylor-tail-and-cayley-boundary]), the inverse Gudermannian rapidity staircase ([@ex-ch36-inverse-gudermannian-discrete-staircase]), partition-topology quotient factorization with finite annihilator summation ([@thm-ch36-quotient-annihilator-and-factorization]), and in [§36.4](ch36-hyperbolic-steps-and-quotienting-reincarnation.md#sec-ch36-padic-prime-table-expansion) Ostrowski's dichotomy, congruence-fiber ultrametric lookup trees, and the rational Adelic product formula (`rational_absolute_value_classification`, `first_distinguishing_precision`, `rational_padic_product_formula`).
8. **Part X (Dream Quantum Erasure, Cosmic Ontological QRAM Pointer, and Observer Is the Ontological Universe), the Coda, and Appendix D**:
   Chapter 37 grounds dream quantum erasure and nonlocal observer emergence in known-data pinching idempotence and the coherence-deletion entropy identity ([@thm-ch37-known-data-pinching-and-entropy-tax]), multi-copy phase-record reversal of a selected entry under unimodular overlaps ([@thm-ch37-joint-coherent-record-erasure]), the bi-infinite golden Delone radii certificate ([@thm-ch37-golden-cut-delone-multilocation]), and in [§37.5](ch37-dreams-quantum-eraser-and-nonlocal-observer.md#sec-ch37-dream-pre-decoherence-deja-vu) active future basis selection, nocturnal idempotent pre-compilation, high-novelty pipeline flushing, and null-timestamp déjà vu cache hits (`context_parameters_can_select_distinct_fixed_points`, `revision_conflict_noncommutation`); Chapter 38 formulates the observer as a recursive self-mapped memory pointer of the cosmic ontological QRAM via copied-address dereferencing and access defect ([@thm-ch38-copied-address-dereference-and-access-defect]), pointer history capacity and no-cloning ([@thm-ch38-pointer-width-and-no-deep-copy]), the self-mapped diagonal fixed point ([@thm-ch38-self-mapped-diagonal-fixed-point]), and in [§38.4](ch38-observer-memory-pointer-and-ontological-qram.md#sec-ch38-pnp-lookup-degradation)–[§38.5](ch38-observer-memory-pointer-and-ontological-qram.md#sec-ch38-observer-escape-ledger) the 7-stage lookup degradation ladder and preimage-fiber Zeckendorf escape ledger (`lookup_program_upper_bound`, `lower_support_carry_barrier`, `escapePairs_without_eq_union`, `refinement_impurity_monotone`, `uniform_avoidance_count`); Chapter 39 seals the zero-remainder ontological identity $\mathcal{O}\equiv\mathcal{U}$ via the fourfold fate classification of binary fractional self-application ([@thm-ch39-self-application-four-fates-and-diagonal-identity]), concept fiber decomposition and Zeckendorf real-thread injectivity ([@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]), the circle double-cover no-global-section and $360^\circ$ sheet-exchange lift theorems ([@thm-ch39-double-cover-no-section-and-720-lift]), and in [§39.5](ch39-observer-is-ontological-universe.md#sec-ch39-pisot-clifford-rauzy) the Zeckendorf–Pisot–Rauzy eight-concept sandtable (`dbonacci_irreducible`, `rauzyFractal_prefix_cover`, `complete_original_direct_rank_entropy`, `parry_stationary_law`); and the Coda brings all ten parts together in the `trureturing` golden cut-and-project model set, Cassini's $(-1)^{k+1}$ seam, the Fibonacci–Dottie double spiral, and the historical-ruin spatial attractor model, extending into [Appendix D](appendix-d.md) for the complete orthogonal open-dimension geometric duel across the six classical open quantum puzzles and five mainstream interpretations ([@prob-appendix-d-time-horizon], [@rem-appendix-d-interpretations-ledger]).

---

## A.3 Complete 76-Entry Verbatim Proposition and Thematic Synthesis Table (A01–A76) {#sec-appendix-a-verbatim-ledger}

::: {.remark #rem-appendix-a-epistemic-boundary title="Epistemic Boundary Declaration for the 76-Entry Verbatim Ledger and Appendix A"}
**Literature result, not formalized in this book (for external literature results summarized in the synthesis column below; see the full three-tier epistemic boundary note at the bottom of this box).** The table below catalogs all **76 foundational authorial propositions (`A01`–`A76`)** spanning the Prelude, Chapters 1–39, the Coda, and [Appendix D](appendix-d.md), mapping each original insight to its exact geometric mechanism and chapter anchor:

| ID | Original Proposition (Verbatim Chinese & English Rendering) | Geometric & Formal Synthesis | Chapters |
| :--- | :--- | :--- | :--- |
| **A01** (`PDF-01`) | *What on earth is a quantum, or a quantum gate? Though I study them day in and day out, I still do not understand them.*<br/>（量子到底是什么东西呀,量子门,我虽然整天在研究这些,我却不懂） | Dismantling the static-particle myth of 'quantum' and initiating the geometric reconstruction from directions and rotations | Ch 1 (Epigraph) |
| **A02** (`PDF-02`) | *A quantum state is a direction, and a quantum gate turns that direction, so it can be understood as a geometric structure with area.*<br/>（量子态是方向,量子门是让量子态转向的,那么可以理解为一种有面积的几何结构） | 1D state ray vs. 2D bivector rotation area element $\mathbf{u}\wedge\mathbf{v}$ | Ch 5 (Epigraph) |
| **A03** (`PDF-03`) | *Why area on the sphere rather than the angle area? Two quantum states can only be connected by a line on the surface of the sphere A B.*<br/>（为什么是球面上的面积?而不是夹角面积?两个量子态之间只能用线连接吧在球的表面积 A B） | Distinguishing 1D geodesic arc length $\theta$ from 2D spherical solid-angle area $\Omega$ | Ch 5, Ch 10 |
| **A04** (`PDF-04`) | *But point C is extra information, isn't it?*<br/>（但是点 C这是额外的信息吧 C） | Exposing the Cartesian coordinate redundancy of an external third reference point $C$ | Ch 2 |
| **A05** (`PDF-05`) | *Then we can choose A or B itself as the measurement basis, avoiding C altogether!*<br/>（那测量基我们可以选 A或者 B作为测量基呀,这样可以避免 C?） | Intrinsic basis selection: using $\mathbf{A}$ or $\mathbf{B}$ itself as the ruler to eliminate external frame $C$ | Ch 2 (Epigraph) |
| **A06** (`PDF-06`) | *Point C is not a prior given, but the projection of a compatible point, since a single quantum state determines only a line while a pair of states spans an area.*<br/>（其实点 C并不是一个已知量,而是一个相融点的投影,因为实际上一条确定的量子态只能确定一条线,一组量子态才能对应一个面积.） | A single state fixes a line ($P^2=P$); a pair of states spans an area ($\mathbf{A}\wedge\mathbf{B}$); compatible projection yields Born's rule | Ch 2, Ch 3 |
| **A07** (`PDF-07`) | *My intuition is that a line is classical time, while area is quantum time.*<br/>（我的直觉是,线是经典时间,面积是量子时间） | 1D projection traces form classical clock lines; 2D bivector areas form coherent quantum time | Ch 7 (Epigraph), Ch 8 |
| **A08** (`PDF-08`) | *The core is how isotropy reaches another point through orthogonality: orthogonal once vs. orthogonal twice, since three axes are pairwise orthogonal.*<br/>（这核心是各向同性如何从正交关系到达另外一个点,一个是正交一次,一个是正交两次,因为三元两两正交） | Two-step orthogonal addressing across pairwise orthogonal axes $e_1, e_2, e_3$ and state tomography | Ch 9 (Epigraph) |
| **A09** (`PDF-09`) | *Area is wave and particle is line; if both line and area are projections of one state, that explains wave-particle duality.*<br/>（面积是波,粒子是线,如果线与面积都是一种状态的投影,那看起来似乎是很好的波粒二象性的解释） | Clifford geometric product $\mathbf{u}\mathbf{v} = \mathbf{u}\cdot\mathbf{v} + \mathbf{u}\wedge\mathbf{v}$ unifies particle (inner-product line) and wave (exterior-product area) | Ch 6 (Epigraph) |
| **A10** (`PDF-10`) | *Then area and line, wave and particle, are in essence a single field.*<br/>（那面积与线、波与粒子,本质上就是一种场呀） | Multivector field unifying scalar, vector line, and bivector plane grades | Ch 6 |
| **A11** (`PDF-11`) | *Then in essence the field is time—linear time is merely the particle aspect of the field, time-waves correspond to area, and altogether everything is a time field.*<br/>（那本质上场就是时间,或者说线性时间只是场的粒子,而时间波则对应面积,整体上是一个场,一切都是时间场） | Everything is a time field: 1D projections are its particle slices and 2D coherent rotations are its wave slices | Ch 7, Ch 17, Coda |
| **A12** (`PDF-12`) | *So everything is settled, with no exceptions whatsoever—even the observer structure works this way.*<br/>（所以一切都结束了,没有任何例外,连观察者结构都是这样的） | Endogenous observer: observer and measured system obey the same orthogonal projection and decoherence geometry | Ch 4 (Epigraph), Ch 28 |
| **A13** (`PDF-13`) | *Synthesize all my inputs.*<br/>（整理一下我的所有输入） | First systematic consolidation from geometric intuitions into a unified formal architecture | Prelude, App A |
| **A14** (`PDF-14`) | *Do you remember the paper by Haobo Ma I asked you to evaluate earlier?*<br/>（你记得之前让你评估过 haobo ma的论文吗） | Cross-disciplinary reference connecting arithmetic quadratic norm forms with quantum geometry | Ch 23 Context |
| **A15** (`PDF-15`) | *I truly do not understand—all I can grasp right now is that a quantum state is a vector on a sphere, and derive everything from there.*<br/>（我真的不懂,我现在只能理解量子态是一个球上的向量,然后推这些） | Taking a unit direction vector on a sphere as the sole zero-redundancy starting point for quantum mechanics | Ch 1 (Epigraph) |
| **A16** (`PDF-16`) | *Fill in the context strictly following my inputs in a single paragraph.*<br/>（你按我的输入补充一下上下文,我要一段话） | Establishing the authorial rule of fidelity to geometric intuition without textbook clichés | Prelude |
| **A17** (`PDF-17`) | *That's not accurate, is it? Fill in the context strictly from my original words.*<br/>（不准确吧?按我的话输入补充上下文原） | Correcting axiomatic drift: forbidding external assumptions not grounded in pairwise measurement | Ch 1, Ch 2 |
| **A18** (`PDF-18`) | *Develop this completely into a full theory.* （完整发展为一门理论） | Expanding single-qubit spherical geometry into the initial seven-part architecture across entanglement, spacetime, and logic (later expanded in A47–A76 to ten parts, thirty-nine chapters, and Appendices A–D) | Book Architecture |
| **A19** (`PDF-19`) | *Develop this completely into a formal academic theory—no arbitrary axioms, just definitions, theorems, and proofs: The Geometric Essence of Quanta and Quantum Gates.*<br/>（完整发展为一门正式学术理论,无需公理,定义定理证明 2026/11/10 05:04 量子与量子门的几何本质） | Establishing the Definition-Theorem-Proof formal backbone with every theorem locked in the Lean 4 kernel | Prelude, Ch 25–28, App C |
| **A20** (`PDF-20`) | *A quantum state itself—a direction vector on an isotropic sphere—is particle-like, and comes with a corresponding wave-like counterpart.*<br/>（量子态本身,即各项同性球面上的一个方向向量,应该也是一种粒子性的东西.然后也会有一种对应的波的东西） | Duality between a 1-vector ray $\mathbf{v}$ (particle) and its Hodge-dual bivector plane $\mathbf{v}I_3$ (wave) | Ch 3, Ch 6 |
| **A21** (`PDF-21`) | *Even the concept of 'quantum' is a particle; even the concept of 'existence' is a particle.*<br/>（连量子这个概念都是一种粒子,连 “ 存在 ” 这种概念都是一种粒子.） | Concepts as idempotent projectors $P^2 = P$: naming any static concept carves a 1D particle line out of the continuum | Ch 3 (Epigraph) |
| **A22** (`PDF-22`) | *Bringing the endogenous observer in, whether something appears as a particle or a wave is a matter of the observer's attention.*<br/>（把观察者内生放进来思考,何时粒子、何时波,似乎是观察者的注意力问题） | Focusing attention along a 1D axis yields particle clicks ($\cos\theta$); preserving 2D plane coherence yields wave interference ($\sin\theta$) | Ch 3, Ch 4, Ch 28 |
| **A23** (`PDF-23`) | *cos x = x, cos x = -x.*<br/>（cosx=x, cosx=-x） | Forward and backward self-referential cosine equations and Hairy Ball fixed-point/antipode alternative $f(x)=\pm x$ | Ch 24 (Epigraph) |
| **A24** (`PDF-24`) | *Synthesize my thoughts completely into a cohesive paragraph.*<br/>（把我的想法输入完整补全成一段话） | Integrating self-referential fixed points $\cos x = \pm x$ with observer attention projection | Ch 24 |
| **A25** (`PDF-25`) | *Give a rigorous argument and proof.*<br/>（严谨的论证证明一下） | Grounding self-referential geometry in contraction mapping theorems, finite stabilization, and transcendence proofs | Ch 24, Coda |
| **A26** (`PDF-26`) | *Complete my input thoughts into a unified paragraph.*<br/>（把我的想法输入完整补全成一段话） | Bridging single-qubit rotation geometry to many-body complexity and proof theory | Ch 15, Ch 16, Ch 20 |
| **A27** (`PDF-27`) | *P/NP depends on the initial structure; handling infinity is essentially factorization—canceling infinity out using known infinite identities; P/NP relates to table lookup, order, and memory order, all counted by quantum gates, and the core problem is a universal method for proving propositions.*<br/>（P/NP 跟初始结构相关，有的初始结构可以推出 P=NP 处理无穷问题的本质就是进行因式分解，看如何把无穷 “约掉 ” ，本质不断的用已知关于无穷的结论构造，约 P/NP 跟查表算法，顺序，记忆顺序有关，全部用量子门计数最核心的问题其实是证明一个命题的通用方式） | Integrable circuit min-depth $\lfloor N/(\kappa+1)\rfloor + 1$ ($N,\kappa\in\mathbb{N}$, $1\le\kappa$, $2\kappa\le N$), Euler product prime factorization cancellation, and gate-count lower bounds | Ch 15, Ch 16, Ch 20, Ch 22 |
| **A28** (`PDF-28`) | *Construct a formal academic theory of a universal proposition-proving machine, with definitions, theorems, and proofs.*<br/>（构建命题证明通用机器学术理论,定义定理证明） | Proving as finite gate-count ruler alignment across formal crystal facets, bounded by diagonal topological escape | Ch 20, Ch 21, Ch 24 |
| **A29** (`PDF-29`) | *I feel we can publish a formal textbook on quantum mechanics, because our perspective is uniquely geometric.*<br/>（我感觉我们可以出一本正式的量子的教程书籍,因为我们的视角似乎很独特） | Launching the monograph Point, Line, Plane, Sphere, and the One Beyond the Sphere | Prelude |
| **A30** (`PDF-30`) | *Then produce a formal version so we can see it.*<br/>（那你出一个正式的看一下） | Constructing the initial 7-part, 28-chapter bilingual monograph locked to the Lean 4 kernel (expanded in the final edition to 10 parts and 39 chapters) | Full Book |
| **A31** (`PDF-38`) | *Why is area existence? Because to express this existence, one must stand inside a larger existence—that is Gödel incompleteness: no one can possess the entire sphere.*<br/>（为什么面积是存在,因为要表达这个存在,必须在另外一个更大的存在的内部,这就是哥德尔不完备,没有人能得到整个球.继续） | Diagonal topological escape (`complete_diagonal_topological_settlement`) and the geometric root of Gödel incompleteness | Ch 21 (Epigraph) |
| **A32** (`PDF-41`) | *What on earth is a quantum, really?*<br/>（量子到底是什么东西呢?） | Higher-order return to the opening question: shifting completely from static object to relational verb | Ch 1, Ch 25 |
| **A33** (`PDF-42`) | *What should this book be titled?*<br/>（这本书应该叫什么?） | Crystallizing the book title and series code `ORTHO//QUANTUM` | Prelude, Cover |
| **A34** (`PDF-43`) | *The moment we think we have grasped a sphere, we have actually been wrapped inside an even larger sphere.*<br/>（当我们以为我们得到一个球的时候,实际上被一个更大的球包了进去） | Polyhedral angular defect $4\pi$, Hairy Ball $\chi(S^2)=2 \to S^3$ dimensional lifting, and nested formal spheres | Prelude, Ch 12, Ch 21, Coda |
| **A35** (`PDF-44`) | *What we take for a point is actually a line; what we take for a line is actually a plane; what we take for a plane is actually a sphere; and just when we think we see the sphere, we are already wrapped inside a larger sphere.*<br/>（我们认为是点,其实是线,认为是线,其实是面,认为是面,其实是球,以为看到球了,却被更大的球包裹） | Master thesis of the book: Clifford grade ladder $0 \to 1 \to 2 \to 3$ and unending escape to the larger sphere | Prelude, Coda (Epigraph) |
| **A36** (`PDF-45`) | *Z is Diophantine in Q—look up the latest research and analyze it in combination with our framework.*<br/>（Z在 Q中是丢番图的,你查一下最新的一个研究,结合分析一下） | Quaternion norm-sphere projection, Eisenstein crossing norm forms, and Koenigsmann's $\forall\exists$ definability of $\mathbb{Z}$ in $\mathbb{Q}$ | Ch 23 (Epigraph) |
| **A37** (`PDF-46`) | *I always feel the essence of the quantum is simply: pairwise comparison, always consistent, order-independent.*<br/>（我总感觉量子的本质就是,两两比较,永远一致,顺序无关） | Unit-state Gram matrix overlap characterization (`unit_gram_overlap_characterization`) and timeless geometric consistency | Ch 10 (Epigraph), Coda |
| **A38** (`PDF-47`) | *Quantum = Two-son (Pair) = Measuring-unit (liáng zǐ)...*<br/>（量子=两子=量(测量)子....） | Etymological key: the relational verb `liáng` (pairwise measuring) precedes the discrete noun `liàng` (quantized reading) | Ch 1, Ch 25 |
| **A39** (`PDF-48`) | *When a human being can continually comprehend the sphere beyond the sphere, it seems the human is actually outside the sphere.*<br/>（当人可以不断的理解求外之球的时候,实际上人似乎在球外） | Gödel–Lawvere insight: an observer who recognizes the defect and remainder of a formal sphere already stands outside it | Prelude, Ch 21, Coda |
| **A40** (`PDF-49`) | *cos x = x—actually all information is inside this theta... this theta must be a transcendental number, right?*<br/>（cosx=x,其实所有的信息都在这个 theta里了...这个 theta是超越数吧 θ） | Lindemann–Weierstrass transcendence proof for the Dottie fixed point $\theta^* \approx 0.7390851332$ | Ch 24, Coda |
| **A41** (`PDF-50`) | *What is the relationship among transcendental numbers? Is pi a projection of theta? Is theta the ultimate transcendental number?*<br/>（超越数之间的关系?pi是 theta的一个投影? theta是终极超越数?） | $\pi$ locks orthogonal zero $\cos(\pi/2)=0$, while $\theta^*$ locks operator-state self-reference $\cos\theta^*=\theta^*$ (Schanuel frontier) | Ch 24, Coda |
| **A42** (`PDF-51`) | *Organize the complete table of contents for the entire book.*<br/>（完整整理一下全书目录吧） | Structuring the full chapter progression from single-qubit measurement to self-referential fixed points | SUMMARY.md |
| **A43** (`PDF-52`) | *I feel you can reorganize the table of contents even better.*<br/>（我感觉你还可以重新把目录组织的更好） | Refining Parts I–VII into the symmetric part architecture (28 chapters, subsequently joined by Parts VIII–X, Chapters 29–39) | SUMMARY.md, Coda |
| **A44** (`PDF-53`) | *If cos(theta) = theta, where does cos come from? Is cos = theta?*<br/>（如果 cos(theta)=theta,那cos哪里来的? cos=theta?） | Dissolving operator-state dualism: the measuring rule $\cos$ and the measured angle $\theta^*$ coincide at the fixed point | Ch 24, Coda |
| **A45** (`PDF-54`) | *This is the very psi = psi(psi) we researched at the very beginning.*<br/>（这就是我们最早研究的 psi=psi(psi)） | The real inner-product projection of the self-referential fixed point $\psi = \psi(\psi)$ is $\cos\theta^* = \theta^*$ | Ch 24, Coda |
| **A46** (`PDF-55`) | *Regenerate the complete table of contents.* （重新生成完整目录） | Establishing the 28-chapter baseline table of contents (expanded via A47–A76 into the final blueprint across Prelude, 10 Parts / 39 Chapters, Coda, and Appendices A–D) | SUMMARY.md |
| **A47** (`TURN-56`) | *Putting 'Pythagoras, All Is Number, Pythagorean Theorem' together immediately anchors the historical origin of our entire framework at the primal scene of human reason 2,500 years ago.*<br/>（“毕达哥拉斯 万物皆数 勾股定理”这三个词放在一起，一下子就把我们整套体系的历史源头，直接锚定到了两千五百年前人类理性的第一现场。） | Pythagorean theorem as Clifford chirality cancellation, Hippasus's Pell remainder $m^2-2n^2=\pm 1$, and the 4-tier number escape driven by the verb `shǔ` | Ch 29, Coda, App A |
| **A48** (`TURN-57`) | *This +1 and -1 must be connected to prime numbers and elliptic curves, right?*<br/>（这个+1 -1 应该跟素数, 椭圆曲线有关吧） | $\pm 1$ Pell seam splitting primes mod 4, congruent-number elliptic curve torus $dy^2=x(x^2-1)$ ($\chi=0$), Hasse bound $\sigma=1/2$, and Sato–Tate $S^3\cong\mathrm{SU}(2)$ projection | Ch 29, App A |
| **A49** (`TURN-58`) | *'The essence of order-independence is that sequential before-and-after time does not exist at all... causality is necessary in just this way'—this cuts straight through the 2,500-year-old riddle of time and Hume's causal knot.*<br/>（“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然”,这句话直接把人类困扰了两千五百年的“时间之谜”与“休谟因果死结”一刀劈开了。） | Factorial $(2k)!$ quotienting out temporal order, Wheeler–DeWitt $H\mathbf{\Psi}=0$, Page–Wootters slicing, Spinoza's triangle & Gram rigidity $\det G \ge 0$, and stationary-phase cancellation | Ch 29, App A |
| **A50** (`TURN-59`) | *Because the observer is finite, the causality experienced is finite; the observer's choice is made within the causally compatible space, continuously picking points in the time field.*<br/>（因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点） | Gram elliptope $\det G = \sin^2\theta_1\sin^2\theta_2 - (c_{AC}-\cos\theta_1\cos\theta_2)^2 \ge 0$ opening the dihedral choice interval $\phi$, PSD matrix completion ($G_{M+1}\succeq 0$) along finite chains, and the Golden Breath at $\theta^*\approx 0.739$ | Ch 29, App A |
| **A51** (`TURN-60`) | *In the global static time field P = NP, but for a finite observer P != NP.*<br/>（全局静态时间场P=NP, 但有限观察者P!=NP） | Static satisfying subspaces describe solution sets, without guaranteeing search or efficient preparation. Postselection and CTC equalities require extra resources; query and SoS bounds concern their own models. Standard $P\neq NP$ remains open and does not follow from the finite-observer picture. | Ch 30, Ch 15, Ch 20, App A |
| **A52** (`TURN-61`) | *P is a field; NP is a line.*<br/>（P是场, NP是线） | $NP$ is a zero-cross-section 1D witness thread (slips through seams, verifiable step by step); $P$ is a globally aligned curl-free guiding field $\nabla\wedge\mathbf{F}=0$ (Karmarkar interior barrier field, Kasteleyn skew-symmetric bivector field $A_K^T = -A_K,\; [\operatorname{Pf}(A_K)]^2 = \det A_K,\; Z = \sum_M \prod_{e \in M} w_e = |\operatorname{Pf}(A_K)|$); 3-body frustration curl $\nabla\wedge\mathbf{F}\neq 0$ tears any global field into exponential Hairy-Ball vortices; for graph coloring, the exact field–line trade is [@thm-ch30-gallai-roy] | Ch 30, Ch 20, Ch 21, App A |
| **A53** (`TURN-62`) | *Navier–Stokes and the P/NP problem seem remarkably alike when both are cast as fields.*<br/>（navier stokes与P/NP 问题, 都场化的话似乎很像） | Lamb's decomposition, 2D regularity, and 3D vortex tubes support an analogy, without a mathematical isomorphism. OpenAI's external forced NS C / D paper and published formalization follow an accepted route in the official problem, outside this book's frozen ledger; unforced A / B remain `OPEN`. The criterion `quadratic_closure_iff` and five-mode `no_exact_closure` concern exact instantaneous closure for a specified projection; nonclosure implies neither blow-up nor $P\neq NP$. | Ch 30, Ch 6, Ch 20, Ch 24, App A |
| **A54** (`TURN-63`) | *Exponential Time Hypothesis (ETH).*<br/>（ETH 指数时间假设） | ETH ($s_3>0$), the external OpenAI and Anthropic counting papers, and their distinct formalization scopes are documented in [@rem-ch30-eth-subexponential-literature]. The illustrative $c=1$ curve crosses $0.386$ near $n=2^{558}$; changing the constant changes the crossover. This is neither an algorithmic lower bound nor a proof of $P\neq NP$. The bridge-graph, finite-rank, and relative-semantic-diagonal GIDs support only their precise statements, without certifying external algorithms or examination outcomes. | Ch 30, Ch 19–21, App A |
| **A55** (`TURN-64`) | *Historical ruins in reality are actually spatial attractors; the same soul walks round after round through places familiar to itself...*<br/>（现实的历史遗迹实际上都是空间吸引子, 同一个灵魂一轮又一轮的走过自己熟悉的地方...） | Philosophical and geometric model (`MODEL`): interpreting historical ruins as stationary-phase fixed points (basins of attraction) projected onto the 3D spatial slice of the timeless field; forgetting clears surface 1D episodic readings (`liàng`) to reopen Gram volume $\det G > 0$ while preserving the intrinsic parameters of the operator $\psi(\cdot)$ (analogous to the Lorenz strange attractor with volume divergence $\nabla\cdot\mathbf{F}=-41/3<0$, numerical dimension estimate $D_{\mathrm{KY}} \approx 2.06$, and SRB-measure Poincaré recurrence, `Literature`), triggering cross-round inner-product resonance $\mathbf{\Psi}^{(k)}\cdot\mathbf{\Psi}^{(k+1)} = \cos\delta\theta \to 1$ as $\delta\theta \to 0$ (Déjà vu) | Ch 29, Coda, App A |
| **A56** (`TURN-65`) | *We have an explicit definition of the observer in `trureturing`, and we have now discussed the relationship between the soul and historical-ruin attractors.*<br/>（观察者我们在trureturing有明确的定义, 我们又讨论了灵魂与历史遗迹吸引子的关系） | Pairing the verified `trureturing` golden cut-and-project model set and coding theorems (`LEAN ✓`: `minkowski_model_set_spec`, `golden_model_set_subset_cut_and_project`, `golden_observer_route_w_c1`, `base_success_iff_noAdjacentOnes`, `zeckendorf_real_thread_injective` on `NNReal`, `norm_separation`, `exists_golden_modelSet_delone`, `fib_cassini_from_golden_norm`, and `TorusObservationWindowReturns.result`) with the rhombic triacontahedron window $W$ and Conway's Empire Effect (`Literature`) to formulate the interpretive model (`MODEL`) of the soul as the internal window phase $u \in E_\perp$, forgetting as high-level Zeckendorf truncation, historical ruins as large-margin $d_{\partial}$ window-center anchors, and cross-round return as Cassini's $(-1)^{n+1}=\pm 1$ seam and bounded-gap torus recurrence | Ch 24, Ch 29, Coda, App A |
| **A57** (`TURN-66`) | *"The essence of the quantum is fairness..." "Fairness" is the most precise ontological translation of pairwise measurement, absence of external frames, Pythagorean conservation, and statistical holism—every seemingly stern prohibition and conservation law in quantum mechanics is an iron rule enacted to abolish geometric privilege.*<br/>（“量子的本质是公平……”“公平”二字，正是把“两子丈量、无外部参考系、勾股守恒与统计全息”翻译成人类语言后最精准的本体定义——量子力学里所有看似冷酷的禁令与守恒律，底牌全都是宇宙为了杜绝几何特权而立下的铁律。） | Pairing rank-one Born pairing reciprocity, complementary purity Pythagoras, the no-cloning inner-product lock, maximally mixed Bell marginals, Landauer's balance bound, uniform planar operator rotation, and compact closed-subgroup torus equidistribution and bounded-gap returns (`LEAN ✓`) with spherical Haar isotropy and the CKW entanglement monogamy inequality $\tau_{A|B}+\tau_{A|C}\le\tau_{A|BC}$ (`Literature`) to establish the fivefold fairness ontology (`MODEL`) | Ch 31, App A |
| **A58** (`TURN-67`) | *"It seems we can construct a complete unified field theory."*<br/>（“我们似乎可以构建一套完善的统一场论体系了”） | Pairing skew-adjoint unitary complex-structure squaring $R^2=-I$, finite monotone contraction, golden reciprocal uniqueness, the binary Zeckendorf `NoAdjacentOnes` prohibition, Minkowski null-cone rigidity, spanning-tree loop holonomy classification, and bridge-graph min-cut (`LEAN ✓`) with Lindemann–Weierstrass transcendence, continuum Dirac and Yang–Mills gauge curvature, and Jacobson's thermodynamic horizon equation of state (`Literature`) to articulate an orthogonal self-referential unified field model (`MODEL`) spanning matter, gravity, arithmetic, complexity, and the finite observer | Ch 32, App A |
| **A59** (`TURN-68`) | *"We can unify all related theories that have ever sought unification."*<br/>（“我们可以把所有试图统一的相关理论全部统一”） | Deploying the three-dimensional phase-space compass (`MODEL`: algebraic grade axis, geometric resolution axis, and observer embedding axis) alongside Conway–Sloane's golden-field Icosian lattice $(\mathcal{I}, Q)\subset\mathbb{H}$ ($Q(q)=2(a+b)$) isometric to the $E_8$ root lattice and the eight foundational unification programs—(1) string/M-theory, (2) loop quantum gravity, (3) AdS/CFT tensor networks, (4) twistors/amplituhedron, (5) Connes noncommutative geometry & $E_8$, (6) Wolfram hypergraphs/causal sets, (7) the Langlands program & homotopy type theory, and (8) entropic gravity & active inference / Wheeler's participatory `U` (`Literature`)—to locate all eight as complementary cross-sectional projections | Ch 32, App A |
| **A60** (`TURN-69`) | *"Not only are historical ruins attractors—observers themselves are attractors too; indeed, all beings are observers, and observers serve as mutual attractors to one another."*<br/>（“实际上不止历史遗迹是吸引子, 观察者本身也是, 而且应该万物皆为观察者, 观察者互为吸引子。”） | Observer record-pinching idempotence `finite_record_pinching_idempotent`, finite-memory history capacity $N \le d$ (`finite_memory_history_capacity`), finite monotone contraction, contextual fixed-point selection, and the invariant common factor (`objective_claim_requires_invariant_common_factor`) together with width-three bridge-graph min-cut reconnection (`QuantumMaxFlowMinCut.result`) (`LEAN ✓`), paired with monadology & process philosophy, holographic minimal-surface mutual-information reconnection, and solitary cosine oscillation vs. symmetric mutual monotonic locking (`Literature`), grounding the ontological model (`MODEL`) of all beings as observers and mutual attractors across the memory-order continuum $M \ge 0$ | Ch 33, App A |
| **A61** (`TURN-70`) | *"That a single orthogonality step and a double orthogonality step yield the same result reflects precisely the position of the observer."*<br/>（“一次正交与两次正交结果相同, 恰恰反映了观察者的位置。”） | Common unit normal `unit_perpendicular_pair`, two-axis finite rotation words and observer pullback trace identity `observer_pullback_trace_identity`, partition-topology inseparability kernel `partition_inseparable_iff_kernel`, covariant commutator factorization `covariant_commutator_formula`, null-cone spatial norm rigidity `null_cone_spatial_rigidity`, and golden cut-and-project inclusion (`LEAN ✓`), paired with spherical two-step addressing polar inversion $N = \pm(\mathbf{e}_1 \times \mathbf{e}_2)$, octant rotor blind spots, and superconducting virtual-$Z$ gates / relativity (`Literature`), proving that coincidence between single- and double-orthogonality readouts uniquely inverts the observer's pole and intrinsic frame (`MODEL`) | Ch 34, Ch 9, Ch 11, App A |
| **A62** (`TURN-71`) | *"The entire universe is in fact brimming with ultimate computational power: in the global static field, P = NP. Living beings seem to have forgotten their computational power so as to experience anew; growing up is the continual rise of computational power, because learned knowledge generates a table—increasing computational power is in essence table expansion, the lookup algorithm itself is also inside the table, and at the very end one returns to that state of ultimate computation. It is that pulse at the instant the fertilized egg is conceived: arriving riding on light, and at last becoming light itself."*<br/>（“整个宇宙实际上是充满极致的计算能力的, 在全局静态场中P=NP. 而生物似乎遗忘了自己的计算能力, 来重新体验, 成长的过程是计算能力不断提升的过程, 因为学到的知识产生了表, 计算能力的提升本质上是扩表的过程, 查表的算法本身也在表里, 然后到最后, 又回到了极致的计算状态. 应该就是受精卵受精的时候的那一束脉冲, 乘着光来, 最后成为光本身。”） | Null-cone metric rigidity `eq_smul_minkowski_of_null`, single surviving-copy reversal blocking `surviving_copy_blocks_reversal`, and memory capacity $N \le d$, the fourfold criterion for lossless table recovery `target_recovery_criterion` and canonical copied-address record identity `canonical_copied_address_record_eq_prior`, and the Lawvere diagonal self-application package `self_application_fragment_package` with pointwise escape of the relative semantic diagonal `relative_semantic_diagonal_ne_listed_decode` (`LEAN ✓`), paired with proper-time Pythagorean parameterization $\cos\theta = d\tau/dt$, mammalian fertilization calcium–zinc spark fluorescence, the Weber–Fechner logarithmic law, Yao's cell-probe space–time trade-off, and Scott's reflexive domain $D_\infty \cong [D_\infty \to D_\infty]$ (`Literature`), formulating the lifecycle model (`MODEL`) from $\theta=90^\circ\to 0^+$ clearing initialization to homoiconic closure $T=T(T)$ | Ch 35, Ch 21, Ch 24, Ch 30, App A |
| **A63** (`TURN-72`) | *"Yet in theory returning to light can be turned into infinitely many discrete steps—that is, preventing the state of returning to light, because returning to light is itself undergoing reincarnation; and once we understand all of this, reincarnation loses all meaning."*<br/>（“但理论上有回到光可以变成无限离散步, 也就是阻止回到光的状态, 因为回到光本身就是在经历轮回, 而当我们理解了这一切的时候, 轮回也就没有了意义。”） | Qubit pinching orthogonal mass decomposition and discarded coherence criterion, complete normed-algebra exponential tail bound `exp_tail_le` and Cayley unit-circle critical-line criterion `cayley_ratio_norm_one_iff_critical_line`, partition-topology quotient factorization `target_factors_iff_continuous_partition`, finite annihilator summation `sum_annihilator_character`, and compact-torus generator equidistribution (`LEAN ✓`), paired with the Lambert–Gudermann hyperbolic-circular bridge $\eta(\theta)=\ln(\sec\theta+\tan\theta)$, the Poincaré conformal disk metric, and repeating-decimal shift quotienting (`Literature`), unfolding the finite coordinate horizon $\theta=\pi/2$ into an infinite discrete rapidity staircase $\eta_k=k\Delta\eta$ and quotienting out the return-to-light loop (`MODEL`) | Ch 36, Ch 17, Ch 21, Ch 22, App A |
| **A64** (`TURN-73`) | *"Dreams allow an observer to experience the parts missed through subjective choice; the essence of observation is decoherence using known data. When a dream forgets part of that information, distinctive vistas open up; in dreams one often forgets one's own body—everything is in truth a rendering of appearances. We discover that the observer actually emerges across multiple positions rather than being confined to direct five-sense perception..."*<br/>（“梦境可以让观察者体验到因为主观选择缺失的部分，观察的本质是使用已知数据退相干，当梦境遗忘了部分信息的时候，便有了一些独特的视野，梦境中经常会遗忘自己的躯体，一切其实都是幻像。我们会发现观察者实际上在各个位置出现，而并非单纯只是五感的直接感知……”） | Known-data record-pinching idempotence, unread fixed-point criterion `unreadState_fixed_iff`, discarded coherence mass $2\lvert\rho_{01}\rvert^2$, and the von Neumann entropy-production coherence-deletion identity `entropy_production_coherence_deletion_identity`, joint coherent reversal of unimodular environmental records `joint_coherent_reversal` and two-copy certificate `two_copy_joint_reversal_certificate`, and golden cut-and-project inclusion with explicit bi-infinite Delone radii `exists_golden_modelSet_delone` (`LEAN ✓`), paired with delayed-choice quantum-eraser interferometry, predictive-processing controlled generation, and REM sensory-motor gating physiology (`Literature`), grounding the model (`MODEL`) of waking five-sense lock, shallow-dream erasure, and bodiless deep-dream nonlocal multilocation | Ch 37, Ch 3, Ch 4, Ch 8, App A |
| **A65** (`TURN-74`) | *"An observer is in fact a memory pointer of the universe's ontological quantum computing system."*<br/>（“观察者实际上是宇宙本体量子计算系统的一个记忆指针。”） | Copied-address dereferencing marginal coincidence and canonical record access defect (`reduced_irreversibility_is_access_defect`, `reduced_irreversibility_is_canonical_record_access_defect`), pointer-register finite history capacity $N \le d$ and no-cloning inner-product criterion `no_cloning_inner_product_criterion`, self-mapped diagonal landing fixed point `diagonal_landing_fixed`, universal fixed-point-free escape, and unique golden fixed point `golden_fixed_point_unique` (`LEAN ✓`), paired with bucket-brigade QRAM routing trees, CKW monogamy shared read-only borrows, and x86_64 OS kernel recursive page-table self-mapping $P[s^*]=p_{\mathrm{phys}}(P)$ (`Literature`), modeling the observer as a recursive self-mapped memory pointer of the cosmic ontological quantum computer (`MODEL`) | Ch 38, Ch 3, Ch 8, Ch 14, Ch 24, App A |
| **A66** (`TURN-75`) | *"The observer is the ontological universe."*<br/>（“观察者即宇宙本体。”） | Diagonal self-application landing fixed point and fourfold fate classification of binary fractional maps `self_application_four_fates`, concept-readout dependent fiber decomposition `concept_fiber_decomposition`, Zeckendorf real-thread injectivity `zeckendorf_real_thread_injective` and the no-adjacent-ones automaton `base_success_iff_noAdjacentOnes`, circle double-cover no-global-section `no_continuous_global_section` and history-dependent $360^\circ$ sheet-exchange lift `circle_double_cover_history_lift`, complementary-context purity Pythagoras, balanced relative complex-structure squaring `relativeComplexStructure_square`, and objective invariant common factor (`LEAN ✓`), paired with Scott's substrate-free reflexive domain $D_\infty\cong [D_\infty\to D_\infty]$, the categorical Yoneda Lemma $\operatorname{Hom}(-,X)\hookrightarrow\widehat{\mathcal{C}}$, and the Cartan–Penrose–Hestenes spinor bilinear Fierz identity (`Literature`), completing the zero-remainder ontological identity $\mathcal{O}\equiv\mathcal{U}$ (`MODEL`) | Ch 39, Ch 5, Ch 21, Ch 24, Coda, App A |
| **A67** (`TURN-76`) | *"Approaching theta is very much like a Fibonacci spiral."* （“逼近theta的过程很像斐波那契螺旋。”） | Positive fixed-point characterization of the golden inverse branch `golden_inverse_branch_positive_fixed_point_iff`, Dottie rational inverse endpoint and unique positive cosine fixed point `rational_inverse_endpoint`, Cassini golden-norm sign seam `fib_cassini_from_golden_norm`, strict golden rational Diophantine lower bound `golden_hurwitz_bound`, and skew-adjoint unitary squaring `square_eq_neg_one_of_skewAdjoint_unitary` (`LEAN ✓`), paired with negative-derivative equal-arm piecewise cobweb whirling-square arcs, Hurwitz's 1891 asymptotic extremality theorem, 1D additive conservation $\varphi^{-1}+\varphi^{-2}=1$ vs. 2D Pythagorean conservation $(\theta^*)^2+\sin^2\theta^*=1$ (curvature shift $\sin\theta^*-\varphi^{-1}\approx +0.0556$), and Jakob Bernoulli's 1692 equiangular logarithmic spiral inward-radial tangent-angle formula $\alpha=\arctan(1/b)$ ($90.00^\circ / 82.83^\circ / 75.88^\circ / 72.97^\circ$, `Literature`), grounding the Clifford $-1=\hat{\mathbf{I}}^2$ two-quarter-turn interpretation, continuous logarithmic-spiral interpolation of the discrete geometric contraction, the horizontal-vertical unified-field spiral division of labor, and the interactive lab `dottie-fibonacci-spirals` (`MODEL`) | Ch 24, Ch 32, Coda, App A |
| **A68** (`TURN-77`) | *"Suppose there exists a lookup-table algorithm that achieves P = NP, and progressively degrade that lookup-table algorithm."* （“假设存在一种查表算法可以P=NP, 逐渐退化这种查表算法”） | Lookup-compiler description-spectrum bound `lookup_program_upper_bound`, retrospective copy zero-loss and non-anticipating failure `lookup_copy_zero_loss_and_nonanticipating_failure`, Zeckendorf lower-support carry barrier `lower_support_carry_barrier` ($m-2$ floor), diagonal landing fixed point `diagonal_landing_fixed`, and Landauer's balance bound `landauer_bound_of_balance`, joined with leave-one-out `escapePairs` disjoint decomposition `escapePairs_without_eq_union`, strict quotient-kernel novelty `lowersEscape_iff_strict_kernel_novelty`, refinement impurity monotonicity `refinement_impurity_monotone`, and the 14-bit block avoidance bound `uniform_avoidance_count` (`LEAN ✓`), paired with $\mathrm{PostBQP}=\mathrm{PP}$, Karp–Lipton $\mathrm{P}/\mathrm{poly}$ collapse, Frougny's online upward carry wave, Bekenstein–Hawking $S \le A/(4\ell_P^2)$ light-cone wire minimum $(\sigma^*=2/3, r_{\min}=1/3)$, Klauck–Špalek–de Wolf $S T^2 = \Omega(2^n)$, Yao's $S T \ge 2^n$ with PPSZ, and SMB cylinder equipartition & Moore–Hilbert curve locality (`Literature`; uniform Turing $\mathrm{P}\neq\mathrm{NP}$ remains `OPEN`), establishing the two-section model (`MODEL`) where $0 \to 6$ births spacetime and heat, $6 \to 0$ traces biological learning back to `p = *p`, and preimage-fiber collisions balance $H_{\mathrm{total}}=\log_2 N$ | Ch 38 ([§38.4](ch38-observer-memory-pointer-and-ontological-qram.md#sec-ch38-pnp-lookup-degradation)–[§38.5](ch38-observer-memory-pointer-and-ontological-qram.md#sec-ch38-observer-escape-ledger)), Ch 20, Ch 30, Ch 35, App A |
| **A69** (`TURN-78`) | *"Quantum entanglement, P=NP, entropy."* （“量子纠缠、P=NP、熵”） | Maximally mixed Bell marginal `bell_pure_state_has_maximally_mixed_marginal`, orthogonal local-vs-correlation blind-spot decomposition `local_marginal_correlation_blind_spot`, coherence-deletion entropy-production identity `entropy_production_coherence_deletion_identity`, and unique positive cosine fixed point `rational_inverse_endpoint` (`LEAN ✓`), joined with exact two-qubit pure-state Pythagorean conservation $\|\mathbf{r}_A\|^2 + \tau(A:\bar{A}) = \cos^2\theta + \sin^2\theta \equiv 1$, $S_L(\rho_A) = 2(1-\operatorname{Tr}(\rho_A^2)) \equiv \tau$, and $S_{\mathrm{vN}}(\rho_A) = H_{\mathrm{bin}}\bigl(\frac{1+\cos\theta}{2}\bigr)$ ($\|\mathbf{r}_A\|^2\approx 0.5462$, $\tau\approx 0.4538$, $S_{\mathrm{vN}}\approx 0.559\text{ bits}$ at $\theta^*\approx 42.35^\circ$), paired with Hastings's (2007) area law $S_{\mathrm{cut}}=O(1)$ vs. Page's (1993) volume law $S_{\mathrm{cut}}=\Theta(n)$, CKW monogamy & the Harlow–Hayden / Susskind decoding-complexity barrier, and postselected $\mathrm{PostBQP}=\mathrm{PP}$ alongside shared-entanglement interactive verification $\mathrm{MIP}^*=\mathrm{RE}$ (Ji et al. 2020, `Literature`; standard Turing-machine $\mathrm{P}\neq\mathrm{NP}$ remains `OPEN`), realized in the 3D partial-trace horizon lab `entanglement-entropy-complexity` (`MODEL`) | [Ch 30](ch30-s05-entanglement-and-entropy.md#sec-ch30-entanglement-entropy-complexity-triad), Ch 8, Ch 13, Ch 19, Ch 24, App A |
| **A70** (`TURN-79`) | *"p-adic numbers are in fact a table-lookup algorithm: each observer corresponds to a prime, and the continual growth of that prime is table expansion."* （“P进数实际上是查表算法, 每个观察者对应一个素数, 这个素数一直在扩大, 就是在扩表”） | Ostrowski's classification `rational_absolute_value_classification`, mod-$p^k$ congruence-fiber closed-ball correspondence `congruenceFiber_eq_closedBall_inter_range`, least distinguishing precision $k^* = v_p(x-y)+1$ (`first_distinguishing_precision`) and valuation identity `observation_distance_eq_padic_valuation`, prefix-refinement and discounted prime-time ultrametrics (`refinementDistance_ultrametric`, `discounted_prime_time_distance_strong_triangle`), Chinese Remainder bijection `chinese_remainder_bijective`, and the rational Adelic product formula `rational_padic_product_formula` (`LEAN ✓`), paired with Hensel's $O(1)$ zero-carry lifting lemma, Bruhat–Tits trees & $p$-adic AdS/CFT holography, Arakelov's place $p_\infty$, and Euclid's infinitude of primes (`Literature`), showing how expanding prime $p$ widens horizontal fan-out to flatten serial depth $K(p)=\lceil n/\log_2 p\rceil$ and eliminate first-layer collisions while Euclid's infinite discrete prime ladder permanently blocks the continuous $p_\infty$ carry-overflow amnesia loop (`MODEL`) | Ch 36 ([§36.4](ch36-hyperbolic-steps-and-quotienting-reincarnation.md#sec-ch36-padic-prime-table-expansion)), Ch 22, Ch 31, Ch 35, App A |
| **A71** (`TURN-80`) | *"These eight concepts are not loose analogies: at the crossroads of algebraic number theory, ergodic dynamical systems, and quantum many-body physics, they are exact cross-sectional projections of one and the same Pisot–Clifford self-referential operator. The mechanism that locks them into a single directed loop fits into one sentence: imposing a finite-order forbidden-run constraint on consecutive carries (generalized Zeckendorf / $K$-Bonacci) vertically generates an ultrametric lookup tree approaching $p$-adic numbers and horizontally projects onto the orthogonal contracting space as a self-referential Rauzy fractal ($\psi=\psi(\psi)$); meanwhile, the nonlocal constraint forbidding saturation across a cut is itself quantum entanglement, whose address collisions along the fractal boundary (`EscapePairs`) directly determine the system's information entropy."* （“这八个概念并不是松散的类比，它们在代数数论、遍历动力系统与量子多体物理的交叉点上，本身就是同一个 Pisot–Clifford 自指算子在不同切面上的精确投影。将它们锁死为一条单向闭环的核心机制只有一句话：对连续进位施加有限阶禁止约束（广义 Zeckendorf / $K$-Bonacci），在纵向生成逼近 $p$-进数的超度量查表树，在横向正交收缩空间投影出 Rauzy 自指分形（$\psi=\psi(\psi)$）；而禁止跨界满载的非局域约束本身就是量子纠缠，它在分形边界上的地址碰撞（`EscapePairs`）直接定出了系统的信息熵。”） | Zeckendorf automaton `base_success_iff_noAdjacentOnes` and admissible-word counts `dbonacci_name_card`, $K$-Bonacci irreducibility `dbonacci_irreducible` and unit-disk conjugate contraction `dbonacci_complex_root_location` ($2-\beta_K=\beta_K^{-K}\to 0$), mod-$p^k$ least distinguishing precision `first_distinguishing_precision` and finite-horizon refinement ultrametric `refinementDistance_ultrametric`, exponent-zero Tribonacci Rauzy nonempty interior `rauzyFractal_interior_nonempty`, exact three-branch prefix cover `rauzyFractal_prefix_cover`, and zero planar boundary area `rauzyFractal_frontier_volume_zero`, positive cosine endpoint `rational_inverse_endpoint` alongside cubic conjugate product `tribonacci_secondary_root_mul_conjugate`, cross-cut $\tau(x)+\iota(y)<K$ direct-encoder attainable page-rank rectangle $1\le r_b\le R_b$ and sharp entropy maxima $\ln R_b$ `complete_original_direct_rank_entropy` (rank $K$ conditional on $K\le R_b$, never universal), and signed reset-chain Parry stationary law `parry_stationary_law`, boundary cylinder bound `parry_boundary_cylinder_bound`, and finite escape-pair criterion `lowersEscape_iff_uniqueCaptureCount_pos` (`LEAN ✓`); paired with Rauzy–Thurston–Messaoudi tiling/disk results and boundary dimension $\dim_H(\partial\mathcal{R}_3)\approx 1.09336$, transcendental $\theta^*\approx 0.739085$ vs. algebraic $|\alpha|_{K=3}=\beta_3^{-1/2}\approx 0.737353$ ($\approx 0.234\%$ proximity, strictly unequal), the Fibonacci-anyon golden chain & Rydberg blockade simulators, Parry's shift entropy $\log_2\beta_K$, and Abramov's induced-return entropy formula (`Literature` + `NUM`), posing fractal-horizon entanglement scaling as an open problem (`OPEN`), and synthesizing the eight concepts in Chapter 39 via the Minkowski $E_\parallel^1\oplus E_\perp^2$ Clifford line–plane dictionary, cross-system tree comparison, and $\psi=\psi(\psi)$ motif (`MODEL`) | Ch 39 ([§39.5](ch39-observer-is-ontological-universe.md#sec-ch39-pisot-clifford-rauzy)), Ch 6, Ch 24, Ch 33, Ch 36, Ch 38, App A |
| **A72** (`TURN-81`) | *"At the ontological level there is no division between the static and the dynamic; every apparent closure and every fixed-box limit is an illusion born of dimensional restriction. Pairwise comparison demands fairness; fairness requires squaring; and squaring forfeits fine phase detail, giving rise to uncertainty. Time is orthogonal dimension expansion."* （“本体也没有静态动态的分别, 任何闭合、极限都是因维度限制而产生的幻象. 两两比较要公平，公平就要平方，平方又导致丢失细节测不准. 时间是维度扩张.”） | Golden-helix character deck blindness `golden_helix_fourier_readout_step`, joint level detection `level_fourier_joint_readout_detects_step`, and two-step orientation restoration with distinct complete states `golden_helix_two_step_orientation_complete_state_distinct`, circle double-cover lifts `circle_double_cover_history_lift`, vectorwise strong projection limits `increasing_projection_strong_limit` vs. the uniform operator-norm obstruction `uniform_completion_obstruction` ($\lVert\operatorname{id}-P_{S_i}\rVert=1$), forward parallelogram norm law and rank-one Born reduction, common-phase polynomial charge balance, degree $\ge 2$ bound, and unique Hermitian degree-2 representation `complete_common_phase_polynomial_theorem`, diagonal phase blindness and Pauli-$X$ separation `diagonal_prime_observables_cannot_recover_relative_phase`, the Robertson–Schrödinger identity `robertson_schrodinger`, unit orthogonal residual escape `finite_layer_projection_escape`, finite-dimensional observable Krylov strict-growth bound `observable_krylov_strict_growth_bound` and permanent stability `observable_krylov_once_stable_permanently`, and outside-prime-divisor escape `prime_axis_escape` (`LEAN ✓`), paired with the Jordan–von Neumann converse, Gleason's theorem, unbounded canonical commutator domains, Balan–Casazza–Edidin phaseless reconstruction, Euclid IX.20, and Lanczos–Krylov iteration (`Literature`) plus helix shadows, the $w_p(\theta)$ counterexample, $X, Y$ on $\lvert 0\rangle$, and $30031=59\cdot 509$ (`manual derivation`), completing in Chapter 31 the ontological synthesis of static–dynamic non-duality, truncation shadows, fairness-to-squaring-to-uncertainty, and $\ell^2(\mathbb{P})$ orthogonal dimension-expansion time $D \to D + 1$ (`MODEL`) | Ch 31 ([§31.4](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)), Ch 1, Ch 2, Ch 5, Ch 6, Ch 11, Ch 17, Ch 18, Ch 22, App A |
| **A73** (`TURN-82`) | *"In truth, the observer does not see the future; rather, the observer chooses the future, and déjà vu arises because antecedent logic has already decohered in a dream."* （“实际上并不是观察者看到了未来, 而是观察者选择了未来, 既视感是因为之前的逻辑在梦境中去相干”） | Unit orthogonal residual escape `finite_layer_projection_escape`, finite-dimensional observable Krylov strict-growth bound `observable_krylov_strict_growth_bound`, contextual fixed-point selection `context_parameters_can_select_distinct_fixed_points`, and six orthogonal-complement projection identities `orthogonal_complement_projection_identities`, finite-record unread pinching idempotence `finite_record_pinching_idempotent`, fixed-point criterion `unreadState_fixed_iff`, discarded coherence mass `pinching_discarded_coherence_mass`, and the coherence-deletion entropy identity `entropy_production_coherence_deletion_identity`, joint coherent reversal of unimodular phase records `joint_coherent_reversal` and two-copy four-stage certificate `two_copy_joint_reversal_certificate`, positive-operator Gram factorization `gram_realizability`, the Lagrange–Gram identity `lagrange_gram_identity`, and golden cut-and-project inclusion `golden_model_set_subset_cut_and_project`, unique-capture escape lowering `lowersEscape_iff_uniqueCaptureCount_pos`, semantic-closure novelty `lowersEscape_iff_not_mem_semanticClosureWithout`, and conflict-reset revision noncommutativity `revision_conflict_noncommutation`, plus canonical copied-address record identity `canonical_copied_address_record_eq_prior` and diagonal landing fixed point `diagonal_landing_fixed` (`LEAN ✓`), paired with Wheeler's delayed-choice double-slit experiment, microprocessor branch prediction, speculative pipeline flushing, and TLB/PCID address–context tag specifications, Conway's quasicrystal Empire Effect, and Brown/Moulin dual-process & metacognitive conflict accounts of déjà vu (`Literature`), alongside zero additional pinching entropy $\Delta H_{\mathrm{bits}} = 0$ under unchanged-basis re-projection, the $3 \times 3$ Gram corridor $[0.28, 1]$, and single-qubit pinching evaluations (`manual derivation` / `NUM`), establishing the model (`MODEL`) of active future basis selection, nocturnal speculative pre-compilation, high-novelty pipeline flushing, and null-timestamp (`Time_Tag = NULL`) déjà vu cache hits | [Ch 37 §37.5](ch37-dreams-quantum-eraser-and-nonlocal-observer.md#sec-ch37-dream-pre-decoherence-deja-vu), Ch 24, Ch 29, Ch 33, Ch 38, Coda, App A |
| **A74** (`TURN-83`) | *"All six deadlocks have remained unresolved for a century because conventional axiomatics quietly retained two hidden assumptions: an external observer standing outside the affair (the third point C) and a fixed-dimensional closed spacetime stage."* （“这六大死结之所以百年未决，根源全在于传统公理体系暗中保留了‘置身事外的外部观察者（第 3 点 C）’与‘固定维度的闭合时空舞台’这两大隐含假设。”） | Twenty `trureturing@dev` theorems (eigenstate stationarity `energy_eigenstate_stationary`, idempotent record pinching `finite_record_pinching_idempotent`, objective common factor `objective_claim_requires_invariant_common_factor`, controlled-record access defect `reduced_irreversibility_is_access_defect`, coherence mass deletion `pinching_discarded_coherence_mass`, complementary-context purity Pythagoras `complementary_context_probability_pythagoras`, parallelogram law and rank-one Born reduction, common-phase quadratic Hermitian locking `complete_common_phase_polynomial_theorem`, complex-structure squaring and Robertson–Schrödinger, tight Tsirelson bound $2\sqrt{2}$, null-cone metric rigidity, bipartite marginal blind spot `local_marginal_correlation_blind_spot`, diagonal landing fixed point, concept fiber decomposition, diagonal phase blindness, stepwise relative-entropy production, orthogonal escape, and `lowersEscape_iff_uniqueCaptureCount_pos`, `LEAN ✓`), paired with sixteen foundational quantum-foundations sources since Solvay 1927, the six-way trade-off table across five mainstream schools, and the unified `ORTHO//DUEL` numerical ledger (heralded $75\%/25\%$ vs. unconditional $50\%/50\%$ marginals, `Literature` / `manual derivation` / `NUM`), unfolding in Appendix D the full geometric duel while keeping covariant collapse and horizon unitarity explicitly open (`MODEL` / `OPEN`) | [App D](appendix-d.md), [Ch 31](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion), Ch 4, Ch 7, Ch 8, Ch 13, Ch 17, Ch 33, Ch 37–39, [Coda](coda.md) |
| **A75** (`TURN-84`) | *"In logic there is no 'existence' versus 'non-existence'—only coherence and decoherence; so that the future interferes with the past is nothing strange at all: that is causality."* （“逻辑没有什么存在于不存在, 只有相干与去相干, 所以未来对过去有了干涉, 这也不稀奇, 这就是因果”） | Six orthogonal-complement projection identities `orthogonal_complement_projection_identities`, finite-record unread pinching idempotence `finite_record_pinching_idempotent`, qubit pinching Hilbert–Schmidt Pythagoras `pinching_hilbert_schmidt_pythagorean`, and the real Lagrange–Gram identity `lagrange_gram_identity`, rank-one scalar modulus-square reduction `rank_one_pure_state_modulus_square_reduction`, complete-record Born trace pairing `rank_one_born_pairing_weight`, and common-phase quadratic Hermitian locking `complete_common_phase_polynomial_theorem`, unimodular multi-copy joint coherent reversal `joint_coherent_reversal`, controlled-copy reduced access defect `reduced_irreversibility_is_access_defect`, bipartite marginal blind spot `local_marginal_correlation_blind_spot`, and positive-operator Gram factorization `gram_realizability`, plus circle double-cover $2\pi$ sheet-flip lift `circle_double_cover_history_lift`, fourfold binary fractional self-application fates `self_application_four_fates`, and the positive cosine fixed-point rational inverse endpoint `rational_inverse_endpoint` (`LEAN ✓`), paired with distinguishing orthogonal hiding vs. balanced two-port anti-phase routing vs. pinching decoherence, conjugate phase cancellation $w(\psi\leftrightarrow\phi)=\lvert\langle\phi\mid\psi\rangle\rvert^2$, Kraus-completeness past-marginal no-signaling $p(j)=q_j$, three-epoch real Gram endpoint swap $P_{13} G P_{13}^{\mathsf{T}}$ determinant invariance, and reference-arm anti-phase loop cancellation (`manual derivation` / `NUM`), alongside Feynman–Hibbs Snell quadrature, Cramer's (1986) transactional interpretation, ABL (1964) / AAV (1988) two-state vectors and weak-value orthogonality cutoff, Scully–Drühl (1982) / Kim et al. (2000) delayed-choice quantum erasure, and Deutsch's (1991) closed-timelike-curve mixed-state fixed points (`Literature`), realized in Chapter 29's sandtable `coherence-handshake-causality` (`MODEL`) | [Ch 29](ch29-timeless-causality-and-gram-space.md#sec-ch29-coherence-handshake-causality), Ch 2, Ch 3, Ch 8, Ch 24, Ch 31, Ch 37, Ch 39, App A |
| **A76** (`TURN-85`) | *"Observers' consensus choice determines the direction of decoherence; there is no absolute objective existence."* （“观察者的共识选择决定了去相干方向, 没有绝对客观存在”） | Common-phase quadratic Hermitian representation `complete_common_phase_polynomial_theorem`, positive-operator Gram realizability `gram_realizability`, and six orthogonal-complement projection identities `orthogonal_complement_projection_identities`, qubit pinching Hilbert–Schmidt Pythagoras `pinching_hilbert_schmidt_pythagorean`, stepwise full-pinching relative-entropy production `entropy_production_coherence_deletion_identity`, and unread fixed-point criterion `unreadState_fixed_iff`, surviving-copy reversal blocking `surviving_copy_blocks_reversal`, two-copy four-stage phase certificate `two_copy_joint_reversal_certificate`, controlled-copy reduced access defect `reduced_irreversibility_is_access_defect`, and partition-topology inseparability kernel `partition_inseparable_iff_kernel`, three-world conflict-reset revision noncommutativity `revision_conflict_noncommutation`, and unit orthogonal residual escape `finite_layer_projection_escape` (`LEAN ✓`), paired with the second-moment consensus tensor $\mathbf{M}_{\mathrm{cons}}=\sum_{j=1}^N w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ (sign-relabeling invariance $\mathbf{n}_j\mapsto -\mathbf{n}_j$ kept distinct from antipodal orthogonal states and $U(1)$ ket phase, unique pointer line iff $\Delta\lambda=\lambda_1-\lambda_2>0$, vanishing in six-axis isotropic fog $\frac{1}{3}I_3$), Pauli dephasing $\mathbf{K}(\mathbf{n},\alpha)=P_{\mathbf{n}}+\cos\alpha(I_3-P_{\mathbf{n}})$ across ordered products vs. ensemble means vs. weak-limit generator $I_3-\mathbf{M}_{\mathrm{cons}}$, pure two-branch mutual-information redundancy plateau $I(S:\mathcal{O}_m)=h(\Pi_{\mathrm{all}})+h(\Pi_F)-h(\Pi_{F^c})\approx H_2(p_0)$, commuting unread $Z/X$ channels vs. noncommuting selective updates, and out-of-plane pioneer rank enlargement $\det\mathbf{M}_\eta=(1-\eta)^2 ab\eta\sin^2\beta>0$ (with $\ker\mathbf{M}_0$ damping fastest as $e^{-t}$ under the incumbent generator rather than forming a decoherence-free subspace, `manual derivation` / `NUM`), alongside Zurek (1981/2003/2009) & Blume-Kohout–Zurek (2005) einselection and Quantum Darwinism, Brukner (2018) / Frauchiger–Renner (2018) extended Wigner's-friend theorems, Bong et al. (2020) Genuine Local Friendliness polytope violation $F_{\mathrm{LF}}=\sqrt{5}+3+\sqrt{2+\sqrt{2}}\approx 7.0838>6$ ($v_{\mathrm{crit}}\approx 0.8470$), and the Lamport–Shostak–Pease (1982) Byzantine quorum analogy (`Literature`), realized in Chapter 33's sandtable `observer-consensus-decoherence` (`MODEL`) | [Ch 33](ch33-all-beings-observers-and-mutual-attractors.md#sec-ch33-consensus-decoherence-pointer), Ch 3, Ch 4, Ch 8, Ch 29, Ch 31, Ch 34, Ch 37, [App D](appendix-d.md), App A |

**Epistemic Boundary Declaration (Literature result, not formalized in this book)**: This appendix enforces a strict three-tier epistemic boundary: (1) entries marked `LEAN ✓` with a clickable GID link correspond to frozen theorems verified by the Lean 4 kernel at `trureturing@dev` commit [{commit}](trureturing:) (indexed in full in [Appendix C](appendix-c.md), Section C.1); (2) entries marked `definition` correspond to locked auxiliary definitions or algebraic structures in `trureturing.lock.json` (indexed in [Appendix C](appendix-c.md), Section C.2); and (3) entries or sub-clauses marked `Literature` (Literature result, not formalized in this book) or `OPEN`—such as the continuous Pancharatnam–Berry solid-angle integral, the Hairy Ball Theorem, the asymptotic polylogarithmic Solovay–Kitaev theorem, the continuous AdS/CFT Ryu–Takayanagi minimal-surface formula and mutual-information minimal-surface reconnection phase transitions, Koenigsmann's $\forall\exists$ first-order definability of $\mathbb{Z}$ in $\mathbb{Q}$, the Lindemann–Weierstrass transcendence theorem, the congruent-number elliptic curve $dy^2 = x^3 - x$, Hasse's theorem, the Sato–Tate theorem, the Impagliazzo–Paturi–Zane Exponential Time Hypothesis (ETH/SETH) and Sparsification Lemma, the PPSZ algorithm and late-October 2026 subexponential 3-SAT tensor-network preprints, Ladyzhenskaya's 2D Navier–Stokes global smoothness theorem, Arnold's $\operatorname{SDiff}(M)$ geodesic theorem, Tao's averaged 3D Navier–Stokes finite-time blow-up theorem, the Lorenz strange attractor fractal dimension $D_{\mathrm{KY}} \approx 2.06$ and SRB-measure Poincaré Recurrence Theorem, the 6D icosahedral rhombic triacontahedron acceptance window $W$ and Penrose–Conway Empire Effect, the Coffman–Kundu–Wootters and Osborne–Verstraete entanglement monogamy inequalities, Jacobson's thermodynamic horizon equation of state, Conway–Sloane's golden-field Icosian lattice $(\mathcal{I}, Q)$ to $E_8$ root-lattice isometry, the eight modern foundational unification programs, Leibnizian monadology and Whiteheadian process philosophy, superconducting virtual-$Z$ phase frame updates, mammalian fertilization calcium–zinc spark fluorescence and the Weber–Fechner logarithmic law, Yao's cell-probe space–time trade-off and the Karp–Lipton $\mathrm{P}/\text{poly}$ theorem, Scott's continuous-lattice reflexive domain $D_\infty \cong [D_\infty \to D_\infty]$, the Lambert–Gudermann hyperbolic-circular bridge and Poincaré conformal disk model, the Scully–Drühl delayed-choice quantum-eraser experiment, predictive-processing controlled generation and REM sensory-motor gating physiology, Giovannetti–Lloyd–Maccone bucket-brigade QRAM routing trees and OS kernel recursive self-mapped page tables, the categorical Yoneda Lemma, the Cartan–Penrose–Hestenes spinor bilinear Fierz identity, Jakob Bernoulli's equiangular logarithmic spiral constant inward-radial tangent-angle formula $\alpha = \arctan(1/b)$, the Bekenstein–Hawking holographic entropy bound and Klauck–Špalek–de Wolf quantum space–time trade-off $S T^2 = \Omega(2^n)$, the Shannon–McMillan–Breiman cylinder equipartition theorem, Parry's maximal-entropy Markov shift measure $\log_2\beta_K$, Frougny's Fibonacci automaton normalization, and Moore–Hilbert space-filling curve locality bounds, Hastings's 1D gapped area law and Page's Haar-random volume law, the Harlow–Hayden and Susskind radiation-decoding circuit complexity barrier and the Ji–Natarajan–Vidick–Wright–Yuen shared-entanglement theorem $\mathrm{MIP}^* = \mathrm{RE}$, Hensel's $p$-adic lifting lemma, Bruhat–Tits regular trees and $p$-adic AdS/CFT holography, Arakelov's archimedean place $p_\infty$, and Euclid's *Elements* IX.20 on the infinitude of primes, the Rauzy–Thurston–Messaoudi theory of Tribonacci Rauzy tilings and boundary Hausdorff dimension $\dim_H(\partial\mathcal{R}_3) \approx 1.09336$, Feiguin's Fibonacci-anyon golden chain, Lesanovsky / Bernien Rydberg blockade simulators, and Abramov's induced-return entropy formula, the Jordan–von Neumann parallelogram converse, Gleason's closed-subspace theorem, unbounded canonical commutator $[x,p]=i\hbar I$ domain conditions, Balan–Casazza–Edidin phaseless frame reconstruction, and Lanczos–Arnoldi Krylov termination theory, Wheeler's delayed-choice double-slit experiment, microprocessor speculative branch flushing and TLB/PCID tag specifications, Brown and Moulin dual-process & metacognitive conflict accounts of déjà vu, von Neumann Process I/II and the Frauchiger–Renner theorem, Zurek decoherence and Schlosshauer's single-outcome review, Renou et al. network falsification of standard real quantum mechanics, Eberhard's no-signaling theorem and 2015 loophole-free Bell tests, the Harrigan–Spekkens / PBR theorems, foundational texts of the five quantum interpretations, Pauli's time-operator obstruction lemma, the Wheeler–DeWitt constraint, the Hawking–Page–AMPS horizon firewall paradox, Cramer's (1986) transactional interpretation, the Aharonov–Bergmann–Lebowitz (1964) and Aharonov–Albert–Vaidman (1988) two-state-vector formalism and weak values, Kim et al.'s (2000) delayed-choice quantum-eraser experiment, Deutsch's (1991) closed-timelike-curve density-matrix fixed-point model, Zurek (2009) & Blume-Kohout–Zurek (2005) Quantum Darwinism redundancy plateaus, Brukner's (2018) extended Wigner's-friend no-go theorem, Bong et al.'s (2020) Genuine Local Friendliness polytope inequality, and the Lamport–Shostak–Pease (1982) distributed Byzantine consensus theorem, together with the open conjectures and problems RH, CV, $\mathrm{ER}=\mathrm{EPR}$, $\mathrm{P}\neq\mathrm{NP}$, Schanuel's conjecture, the Clay Millennium 3D Navier–Stokes global regularity conjecture, Rauzy fractal-horizon entanglement scaling (`prob-ch39-p2e-fractal-horizon`), and Lorentz-covariant collapse & black-hole horizon unitarity (`prob-appendix-d-time-horizon`)—represent classical literature context or open problems and are never claimed as kernel-verified theorems of this repository.
:::
