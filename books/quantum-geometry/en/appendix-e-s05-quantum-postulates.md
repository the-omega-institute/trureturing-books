# E.5 Clause-by-Clause Bridging and Countermodel Audit of the Five Quantum Postulates {#sec-appe-quantum}

The fourth deduction chain (paired with Corollary [@cor-ch32-quantum-postulates-core]) stress-tests all **five Dirac–von Neumann textbook postulates**, pinpointing why single-qubit ($d = 2$) probabilities, post-measurement updates, infinite-dimensional dynamics, and composite tensor spaces require explicit `T2` operational bridges:

$$
\text{Layer-1 CMP} \;\xrightarrow{\;\text{T1 + T3}\;}\; \mathcal{H} \;\xrightarrow{\;\text{full effect / }d\ge 3\text{ star-proj. additivity (T2)}\;}\; \operatorname{Tr}(\rho E) \;\xrightarrow{\;\text{repeatability + 2-sided inv. (T2)}\;}\; (P_k\rho P_k,\, U_t) \;\xrightarrow{\;\text{local tomog. (T2) + }S_N\text{ (T3)}\;}\; \mathcal{H}_1\otimes_{\mathbb{C}}\mathcal{H}_2,\;\bigwedge^N\mathcal{H}.
$$

::: {.remark #rem-appe-quantum-chain title="Deduction Chain IV Audit: Clause-by-Clause Bridging of the Five Quantum Postulates, Effect Additivity, and Local Tomographic Minimality (LEAN ✓ and Literature)"}
**Bridge Conditions and Countermodels Across Postulates I–V.**

1. **Postulate I (Complex Hilbert State Space $\mathcal{H}$)**: Assembled from Layer-1 polarization, `T3` complex structure $J^2 = -I$, and `T1` Cauchy completion (the complex structure $J$ must also be compatible with the inner product; omitting completion leaves countably infinite $\mathbb{Q}[i]^d$).
2. **Postulate II (Observables and Born's Rule $p(E) = \operatorname{Tr}(\rho E)$)**: On a single qubit ($d = 2$), orthogonal-projector additivity $f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) = 1$ **fails** to force Born's rule—beyond the discontinuous hemisphere indicator of [Chapter 2](ch02-born-rule.md) [@ex-qubit-busch-reconstruction], smooth nonlinear countermodels exist (see [@ex-appe-qubit-cubic-and-tomography] below)! Two kernel-verified finite-dimensional routes bridge this gap: the finite-dimensional effect route retains finite additivity across **all POVM effects $0 \le E \le I$ (`T2`)**, whereby Busch's theorem [`effect_density_representation`](lean:D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation) ([@thm-busch-effect-density], `LEAN ✓`) uniquely locks $p(E) = \operatorname{Tr}(\rho E)$ for all $d \ge 2$; the finite-complex $d \ge 3$ projection route imposes nonnegativity, unit normalization, and binary orthogonal additivity across all star projections (`T2`, without replacing orthogonal-projection additivity by arbitrary matrix additivity), applying [Chapter 2](ch02-born-rule.md)'s verified finite-complex projection Gleason theorem [`gleason_representation`](lean:D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation) ([@thm-gleason-finite-projection], `LEAN ✓`) to obtain the unique density representation $p(P) = \operatorname{Re}\operatorname{Tr}(\rho P)$. Neither theorem derives the underlying inner-product structure or the assignment axioms directly from pairwise fairness alone; broader real-Hilbert-space and infinite-dimensional closed-subspace Gleason forms as well as countably additive infinite-dimensional Busch forms require separate declarations and extra hypotheses (Gleason 1957; Busch 2003, [@rem-gleason-literature], `Literature`). For the complementary geometric reconstruction of finite-dimensional state cones via exclusion-ball face polarity and spin factors, see [Appendix F](appendix-f.md).
3. **Postulate III (Post-Measurement Conditioning and Robertson–Schrödinger Uncertainty)**: Rank-one Born pairing weights are verified in [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) (`LEAN ✓`), and the commutator–anticommutator uncertainty bound in [`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger) (`LEAN ✓`). However, single-shot Born statistics alone **do not** uniquely fix the state-update rule!
   - **Finite Non-Repeatable Reset-Instrument Countermodel (`manual derivation`)**: Compare the Lüders projection instrument $\mathcal{I}_k(\rho) = P_k \rho P_k$ against the reset instrument $\mathcal{J}_k(\rho) = \operatorname{Tr}(\rho P_k)\,|+\rangle\langle +|$ ($P_0 = |0\rangle\langle 0|,\; P_1 = |1\rangle\langle 1|,\; |+\rangle = \frac{|0\rangle+|1\rangle}{\sqrt{2}}$). Both yield **identical single-shot Born probabilities** $\operatorname{Tr}(\mathcal{J}_k(\rho)) = \operatorname{Tr}(\rho P_k)$, yet for any input state with $\operatorname{Tr}(\rho P_0) > 0$ (so the conditional denominator $\operatorname{Tr}(\mathcal{J}_0(\rho)) = \operatorname{Tr}(\rho P_0) > 0$ is nonzero and well-defined), two consecutive $Z$ measurements see $\mathcal{J}_0$ flip an observed $0$ into $1$ with probability

     $$
     P_{\mathcal{J}}(1 \text{ after } 0) \;=\; \frac{\operatorname{Tr}\bigl(P_1 \mathcal{J}_0(\rho)\bigr)}{\operatorname{Tr}\bigl(\mathcal{J}_0(\rho)\bigr)} \;=\; |\langle 1 | +\rangle|^2 \;=\; \frac{1}{2} \;\neq\; 0 \;=\; P_{\mathcal{I}}(1 \text{ after } 0)!
     $$

     Hence **repeatability ($\mathcal{I}_k$ idempotence) and minimal disturbance on compatible observables (`T2`)** are required to single out Lüders projection (for the boundary between ensemble Born weights, non-selective Lüders pinching, and single-outcome realization alongside physical causal intervention versus passive basis rotation, see [Chapter 34 §34.20](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–[§34.21](ch34-s21-perception-action-holonomy.md#sec-ch34-perception-action-holonomy) and [@prob-ch34-single-outcome-realization]).
4. **Postulate IV (Unitary Evolution, Ray-Phase Rigidity, and Stone's Hamiltonian Generator)**: On finite-dimensional $\mathbb{C}^d$, every inner-product-preserving linear map $V^\dagger V = I_d$ is automatically unitary, and [`unitary_phase_of_connected_ray_tests`](lean:D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests) (`LEAN ✓`) proves that **once a finite-dimensional unitary $A \in U(\iota, \mathbb{C})$** (`[Fintype ι] [DecidableEq ι]`) preserves all coordinate rays and a support-connected test-ray family, global phase rigidity forces $A = cI$ (whereas recovering unitarity or anti-unitarity from pure nonlinear transition probabilities $|\langle\psi\mid\phi\rangle|^2$ without presupposing linearity invokes Wigner's 1931 theorem, `Literature`). On **countably infinite-dimensional** $\ell^2(\mathbb{N})$, moreover, the unilateral shift $S|n\rangle = |n + 1\rangle$ preserves all pairwise comparisons $\langle S\psi, S\phi\rangle = \langle\psi, \phi\rangle$ ($S^\dagger S = I$) while missing $|0\rangle$ ($S S^\dagger = I - |0\rangle\langle 0| \neq I$, non-unitary!). Infinite-dimensional dynamics therefore requires **two-sided reversibility / surjectivity (`T2`)** (it does not follow from Clauses I–IV of the comparison axiom and the positivity condition; past completeness is one sufficient condition, see [@ex-appe-bilateral-shift-model]), combined with strong time-continuity (Stone's theorem 1932, `Literature`, ruling out discontinuous Hamel-basis automorphisms) and **selection of a specific self-adjoint Hamiltonian $H$** (`T4` dynamical input) to yield $U(t) = e^{-itH/\hbar}$.
5. **Postulate V (Composite Tensor Product $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$ and Fermionic Pauli Sector $\bigwedge^N\mathcal{H}$)**: Two distinct bridges govern many-body composition—first, **complex local tomographic minimality (`T2`)** (Hardy 2001; Chiribella–D'Ariano–Perinotti 2011, `Literature`) rules out both real two-rebit hidden correlations and direct-sum dark sectors (worked out in [@ex-appe-qubit-cubic-and-tomography] below); second, because nonzero symmetric bosonic states $|\psi\rangle \otimes |\psi\rangle \in \mathrm{Sym}^2(\mathcal{H})$ are equally valid in Hilbert space, Pauli exclusion $|\psi\rangle \wedge |\psi\rangle = 0$ specifically selects the **odd sign representation of $S_N$ (`T3` exchange bifurcation)**, tied to half-integer spin in $3+1$D local relativistic QFT by Pauli's spin-statistics theorem (1940, `Literature`).
:::

::: {.example #ex-appe-qubit-cubic-and-tomography title="Single-Qubit Odd-Cubic Frame-Function Countermodel and Two-Rebit Local-Tomography Breakdown (Manual Derivation)"}
**Manual derivation.** Two explicit finite-dimensional calculations demonstrate why `T2` operational hypotheses are indispensable in Postulates II and V:

1. **Smooth Odd-Cubic Frame Function on a Single Qubit (Refuting $d = 2$ Born Rule from Projective Additivity Alone)**:
   On the Bloch sphere $\mathbf{r} = (r_x, r_y, r_z) \in S^2$, assign to each rank-one projector $P_{\mathbf{r}} = \frac{1}{2}(I_2 + \mathbf{r}\cdot\boldsymbol{\sigma})$ the smooth function

   $$
   f(P_{\mathbf{r}}) \;:=\; \frac{1}{2}\bigl(1 + r_z^3\bigr), \qquad f(0) := 0, \qquad f(I_2) := 1.
   $$

   Since $r_z \in [-1, 1]$, we have $0 \le f(P_{\mathbf{r}}) \le 1$, and because every orthonormal basis of $\mathbb{C}^2$ corresponds to an antipodal pair $\{P_{\mathbf{r}}, P_{-\mathbf{r}}\}$,

   $$
   f(P_{\mathbf{r}}) + f(P_{-\mathbf{r}}) \;=\; \frac{1}{2}(1 + r_z^3) + \frac{1}{2}\bigl(1 + (-r_z)^3\bigr) \;=\; 1
   $$

   holds on **every orthonormal qubit basis**! Yet the cubic term $r_z^3$ prevents $f$ from equaling $\operatorname{Tr}(\rho P_{\mathbf{r}}) = \frac{1}{2}(1 + \mathbf{s}\cdot\mathbf{r})$ for any density matrix $\rho$. Testing $f$ on the meridian trine POVM $E_k = \frac{2}{3}P_{\mathbf{r}_k}$ ($k = 1, 2, 3$) with

   $$
   \mathbf{r}_1 = (0, 0, 1), \qquad \mathbf{r}_2 = \left(\tfrac{\sqrt{3}}{2},\, 0,\, -\tfrac{1}{2}\right), \qquad \mathbf{r}_3 = \left(-\tfrac{\sqrt{3}}{2},\, 0,\, -\tfrac{1}{2}\right), \qquad \sum_{k=1}^3 \mathbf{r}_k = \mathbf{0} \;\Longrightarrow\; \sum_{k=1}^3 E_k = I_2,
   $$

   effect additivity and homogeneity would demand $\sum_{k=1}^3 \frac{2}{3}f(P_{\mathbf{r}_k}) = f(I_2) = 1$; substituting $r_{1,z}^3 = 1$ and $r_{2,z}^3 = r_{3,z}^3 = -\frac{1}{8}$ instead yields

   $$
   \sum_{k=1}^3 \frac{2}{3}\,f(P_{\mathbf{r}_k}) \;=\; \frac{2}{3}\left[1 + \frac{1}{2}\left(1 - \frac{1}{8}\right) + \frac{1}{2}\left(1 - \frac{1}{8}\right)\right] \;=\; \frac{2}{3}\left(1 + \frac{7}{16} + \frac{7}{16}\right) \;=\; \frac{5}{4} \;\neq\; 1!
   $$

   This exact $1.25 \neq 1$ violation shows how effect additivity in [@thm-busch-effect-density] (`effect_density_representation`) eliminates every nonlinear frame function in $d = 2$.
2. **Two-Rebit Antisymmetric Correlator and Direct-Sum Dark Sectors (Refuting $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$ Without Local Tomography)**:
   - *Local-tomography failure over $\mathbb{R}$*: On two real qubits $\mathbb{R}^2 \otimes_{\mathbb{R}} \mathbb{R}^2 \cong \mathbb{R}^4$, symmetric observables form a $\frac{4 \times 5}{2} = 10$-dimensional space, whereas products of single-rebit symmetric observables ($\dim = \frac{2 \times 3}{2} = 3$) span only $3 \times 3 = 9 < 10$ dimensions! The missing $10$-th observable is

     $$
     W \;=\; J \otimes J, \qquad J = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}, \qquad W^{\mathsf{T}} = (-J) \otimes (-J) = J \otimes J = W \neq 0,
     $$

     which satisfies $\operatorname{Tr}\bigl(W(A_1 \otimes A_2)\bigr) = \operatorname{Tr}(J A_1)\operatorname{Tr}(J A_2) = 0 \cdot 0 = 0$ for all real symmetric $A_1^{\mathsf{T}} = A_1,\; A_2^{\mathsf{T}} = A_2$—making the orthogonal states $\rho_{\pm} = \frac{1}{4}(I_4 \pm W)$ completely invisible to all local product measurements! Over $\mathbb{C}$, Hermitian real dimensions satisfy $(d_1 d_2)^2 = d_1^2 \cdot d_2^2$, closing local tomography exactly.
   - *Non-minimal dark sector*: Embedding local operators into $(\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2) \oplus \mathcal{K}$ ($\dim\mathcal{K} \ge 1$) via $(A_1 \otimes A_2) \oplus 0_{\mathcal{K}}$ preserves all single-system comparisons while hiding states on $\mathcal{K}$ from local probes. **Complex local tomographic minimality (`T2`)** uniquely locks $\mathcal{H}_1 \otimes_{\mathbb{C}} \mathcal{H}_2$.
:::
