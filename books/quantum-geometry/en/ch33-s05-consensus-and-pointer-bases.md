# 33.5 Multi-Observer Consensus Tensor, Emergent Pointer Basis, and No Observer-Independent Facts {#sec-ch33-consensus-decoherence-pointer}

> “观察者的共识选择决定了去相干方向, 没有绝对客观存在” — "Observers' consensus choice determines the direction of decoherence; there is no absolute objective existence."

The preceding four sections dissolved the cliff between "living subjects" and "inanimate objects" and showed how two phase-resonant beings braid into a mutual-attractor double helix. Yet to uproot the hidden external referee $C$ once and for all, we must confront the central question of decoherence theory directly (verbatim ledger entry `A76` in [Appendix A](appendix-a-s03-verbatim-ledger.md#sec-appendix-a-verbatim-ledger)): **when a multitude of observers gather into a macroscopic environment, why does a quantum state decohere along one particular "classical pointer basis" rather than another? Stripped of a concrete population of observer axes, does nature pre-inscribe any privileged "absolutely objective" coordinate frame at all?**

Standard textbook presentations quietly smuggle point $C$ back in by postulating a fixed diagonal system–environment interaction Hamiltonian from the outset, then announcing that its eigenstates survive as classical pointer states. Returning to this chapter's first principle—that *all beings are observers*—exposes what "the environment" actually is: **not an inert external backdrop, but an endogenous population of observers $\{\mathcal{O}_1, \dots, \mathcal{O}_N\}$ exchanging pairwise projections with the system!** Taken in isolation, the qubit state space is a completely democratic unit Bloch sphere $S^2$ on which no direction carries built-in classical privilege; longitudinal polarization survives and transverse coherence is erased along a preferred axis *only* when the surrounding observer axes $\{\mathbf{n}_1, \dots, \mathbf{n}_N\}$ align at the second-order tensor level to open a positive spectral gap. Disperse those axes isotropically, and the Bloch ball shrinks uniformly toward its center with no pointer axis whatsoever; split the observers into two orthogonal consensus bubbles, and their local pointer records refuse to stitch into a single context-free global truth table. Throughout this section we enforce our three-tier epistemic boundary: algebraic complement projections, common-phase quadratic forms, record pinching, parameterized Bloch-axis commutators, multi-copy reversal blocking, partition-topology kernels, conflict-reset noncommutativity, and orthogonal residual escape rest on fifteen frozen Lean 4 theorems (`LEAN ✓`); the second-order consensus tensor, Pauli Bloch contraction products, and rank-two branching mutual-information curves are derived explicitly and verified numerically (`manual derivation` / `NUM`); Quantum Darwinism and the extended Wigner's-friend Local Friendliness no-go inequality carry explicit literature attribution (`Literature`); and the overarching thesis that consensus selects the decoherence axis without observer-independent facts is designated as our geometric `MODEL`.

## 33.5.1 Second-Order Consensus Structure Tensor, Sign-Reversal Invariance, and Isotropic Fog {#sec-ch33-consensus-tensor-axis}

Let us compute directly in real three-dimensional Bloch space $\mathbb{R}^3$ how a collection of observer axes aggregates into a macroscopic decoherence geometry. Consider $N \ge 1$ participating observers with normalized coupling weights (or independent encounter probabilities) $w_j \ge 0$, $\sum_{j=1}^N w_j = 1$, and unit measurement-axis directions $\mathbf{n}_j \in \mathbb{R}^3$, $\|\mathbf{n}_j\| = 1$. Taking a naive first-order vector average $\overline{\mathbf{n}} = \sum_{j=1}^N w_j \mathbf{n}_j$ immediately fails an elementary consistency test: swapping the plus/minus outcome labels of an unoriented measurement line ($\mathbf{n}_j \mapsto -\mathbf{n}_j$) would make two observers measuring the *very same* $Z$ spin axis along $+Z$ and $-Z$ cancel to zero! A two-outcome projective measurement axis is an **unoriented one-dimensional line** in $\mathbb{R}^3$, represented faithfully by its rank-one orthogonal projection dyad $P_j := \mathbf{n}_j \otimes \mathbf{n}_j = \mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}$ ($P_j^{\mathsf{T}} = P_j$, $P_j^2 = P_j$). Taking the weighted convex sum of these dyads defines the **second-order consensus structure tensor** (`manual derivation`):

$$
\mathbf{M}_{\mathrm{cons}} \;:=\; \sum_{j=1}^N w_j\,\mathbf{n}_j \otimes \mathbf{n}_j \;=\; \sum_{j=1}^N w_j\,\mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}.
$$

Entry-by-entry inspection establishes four exact spectral properties of $\mathbf{M}_{\mathrm{cons}}$: (1) **Unoriented-axis sign invariance**: flipping any subset of axis orientations $\mathbf{n}_j \mapsto -\mathbf{n}_j$ leaves $(-\mathbf{n}_j)(-\mathbf{n}_j)^{\mathsf{T}} = \mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}$ and hence $\mathbf{M}_{\mathrm{cons}}$ identically unchanged (crucially, relabeling an axis $\mathbf{n}_j \mapsto -\mathbf{n}_j$ merely swaps the two outcome labels of the same basis and **never** identifies the two orthogonal Bloch-antipode pure states $|+\mathbf{n}_j\rangle$ and $|-\mathbf{n}_j\rangle$, which satisfy $\|\rho(+\mathbf{n}_j) - \rho(-\mathbf{n}_j)\|_{\mathrm{HS}} = \sqrt{2} > 1$; nor should this real dyadic sign symmetry be conflated with common complex ket-phase gauge invariance $z \mapsto e^{i\theta} z$); (2) **Symmetry, positive semidefiniteness, and Gram factorization**: defining $B \in \mathbb{R}^{N \times 3}$ by $B_{ja} = \sqrt{w_j}\,n_{j,a}$ yields $\mathbf{M}_{\mathrm{cons}} = B^{\mathsf{T}} B = \mathbf{M}_{\mathrm{cons}}^{\mathsf{T}}$ and $0 \le \mathbf{v}^{\mathsf{T}}\mathbf{M}_{\mathrm{cons}}\mathbf{v} = \sum_{j=1}^N w_j (\mathbf{n}_j \cdot \mathbf{v})^2 \le \|\mathbf{v}\|^2$ for every $\mathbf{v} \in \mathbb{R}^3$, so $0 \preceq \mathbf{M}_{\mathrm{cons}} \preceq I_3$; (3) **Unit trace and eigenvalue bounds**: since $\operatorname{Tr}(P_j) = \|\mathbf{n}_j\|^2 = 1$, sorting eigenvalues as $\lambda_1 \ge \lambda_2 \ge \lambda_3 \ge 0$ gives $\operatorname{Tr}(\mathbf{M}_{\mathrm{cons}}) = \lambda_1 + \lambda_2 + \lambda_3 = 1$ and $\frac{1}{3} \le \lambda_1 \le 1$, motivating the nematic-style **consensus order parameter** and **leading spectral gap**

$$
\kappa \;:=\; \frac{3\lambda_1 - 1}{2} \;\in\; [0, 1], \qquad \Delta\lambda \;:=\; \lambda_1 - \lambda_2 \;\in\; [0, 1];
$$

and (4) **Pointer-axis uniqueness vs. degeneracy fog**: a convex combination of rank-one projectors is itself a projector ($\mathbf{M}_{\mathrm{cons}}^2 = \mathbf{M}_{\mathrm{cons}}$) iff its spectrum is $(1, 0, 0)$ (every positive-weight observer axis collinear or antiparallel). Whenever $\Delta\lambda = \lambda_1 - \lambda_2 > 0$, the top eigenspace singles out a **unique unoriented consensus pointer line** $\pm\mathbf{e}_{\mathrm{ptr}}$; conversely, whenever $\lambda_1 = \lambda_2$—whether in six-axis **isotropic fog** $\mathbf{M}_{\mathrm{cons}} = \frac{1}{3}I_3$ ($\lambda = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3}),\; \kappa = 0,\; \Delta\lambda = 0$) or **planar top-degeneracy** $\operatorname{diag}(\frac{1}{2}, \frac{1}{2}, 0)$ ($\kappa = \frac{1}{4},\; \Delta\lambda = 0$)—**no unique physical pointer axis exists**! (On our interactive stage, whenever $\Delta\lambda < \varepsilon = 10^{-8}$ the leading axis is explicitly marked unresolved rather than displaying an arbitrary numerical eigensolver column.)

The first preset card below shows immediately that "having many observers" does not by itself create a classical basis: six equal-weight axes along $\pm x, \pm y, \pm z$ contract the entire Bloch ball uniformly toward its center with no privileged pole:

::: {.viz src="observer-consensus-decoherence" preset="isotropic-fog" height="500"}
**Isotropic Fog Card (`isotropic-fog`)**: Six equal-weight observer axes dispersed symmetrically along $\pm x, \pm y, \pm z$ yield $\mathbf{M}_{\mathrm{cons}} = \frac{1}{3}I_3$, spectrum $\lambda = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3})$, consensus order $\kappa = 0$, and spectral gap $\Delta\lambda = 0$ (`pointerAxis = null`). Under the $N = 16, \alpha = 0.4$ ensemble-mean channel, the Bloch ball contracts isotropically by the exact factor $[(1 + 2\cos 0.4)/3]^k$ (with the weak-limit scale $e^{-k\cdot 0.4^2 / 3}$ labeled separately) and selects no preferred pointer axis (`MODEL` / `NUM`).
:::

At the Hilbert-space operator level, why does common-phase gauge invariance force degree-two Hermitian sesquilinear forms, how do positive operators factorize as Gram squares, and how does an orthogonal projection split longitudinal retention from its complement? Three frozen theorems in `trureturing` anchor these algebraic pillars:

::: {.theorem #thm-ch33-consensus-quadratic-and-gram title="Common-Phase Quadratic Hermitian Representation, Positive-Operator Gram Realizability, and Orthogonal-Complement Identities" lean="D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities"}
Across the frozen quantum-algebra and quantum-bounds modules of `trureturing`, the following three theorems hold simultaneously:

1. **Charge Balance, Minimum Quadratic Degree, and Unique Hermitian Matrix of Common-Phase Invariants** ([`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)): Let $\iota$ be a finite index type (`[Fintype ι]`), and let $p \in \operatorname{Poly}\iota = \operatorname{MvPolynomial}(\iota \oplus \iota)\,\mathbb{C}$ evaluate on amplitude vectors $z$ and conjugates $\operatorname{star} z$ via $\operatorname{actual} p\, z$. Then: (a) there exists a unique Cartesian polynomial $q$ with $\forall z,\; \operatorname{actual} q\, z = \operatorname{eval}(\operatorname{cartesian} z)\, p$, and $\operatorname{toCartesian}$ preserves both `totalDegree` and `IsHomogeneous n`; (b) invariance under $z \mapsto e^{i\theta} z$ ($\operatorname{Invariant} p$) is equivalent to holomorphic–antiholomorphic degree balance ($\operatorname{Balanced} p$) and to membership in $\operatorname{quadraticAlgebra}(\iota := \iota)$, implying $\operatorname{actual} p \in \operatorname{actualQuadraticAlgebra}(\iota := \iota)$; (c) every nonconstant ($\neg\exists c \in \mathbb{C},\, p = C(c)$) invariant polynomial satisfies $2 \le p.\mathrm{totalDegree}$, while each diagonal generator $\operatorname{quadraticGenerator}(i,i)$ is invariant of total degree $2$; and (d) if $p$ is homogeneous of degree $2$, real-valued ($\forall z,\; (\operatorname{actual} p\, z).\mathrm{im} = 0$), and invariant, there exists a unique matrix $H \in M_\iota(\mathbb{C})$ satisfying $H.\mathrm{IsHermitian}$, $\forall z,\; \operatorname{actual} p\, z = \operatorname{star} z \mathbin{\bullet_v} (H *_{\!v} z)$, $\forall i, j,\; H_{ji} = p.\mathrm{coeff}(\operatorname{pairExponent}\; i\; j)$, and $(\forall z,\; 0 \le (\operatorname{actual} p\, z).\mathrm{re}) \iff H.\mathrm{PosSemidef}$, with any $K \in M_\iota(\mathbb{C})$ inducing the same evaluation satisfying $K = H$;
2. **Gram Adjoint-Square Realizability of Positive Continuous Endomorphisms** ([`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)): Let $V$ be a complete complex inner-product space (`[NormedAddCommGroup V] [InnerProductSpace ℂ V] [CompleteSpace V]`), and let $Q : V \to_L[\mathbb{C}] V$ be a continuous $\mathbb{C}$-linear endomorphism. Then $Q$ is nonnegative in the operator order if and only if it factors as $O^\dagger \circ_L O$ for a continuous linear endomorphism $O$ on $V$ realizing its sesquilinear pairing as a Gram inner product:

   $$
   0 \le Q \;\Longleftrightarrow\; \exists\, O : V \to_L[\mathbb{C}] V,\quad Q = O^\dagger \circ_L O \;\land\; \forall x, y \in V,\; \langle Q x, y \rangle_{\mathbb{C}} = \langle O x, O y \rangle_{\mathbb{C}};
   $$

3. **Six-Identity Decomposition of Closed-Subspace Orthogonal Projections** ([`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)): Let $\mathbb{K}$ satisfy `[RCLike 𝕜]`, let $E$ be a complete inner-product space over $\mathbb{K}$, and let $M \le E$ be a closed submodule (`[IsClosed (M : Set E)]`) with orthogonal projections $P_M = M.\mathrm{starProjection}$ and $P_{M^\perp} = M^\perp.\mathrm{starProjection}$. Then all six operator identities hold simultaneously:

   $$
   P_{M^\perp} = \operatorname{id}_{\mathbb{K},E} - P_M,\quad P_M \circ_L P_M = P_M,\quad P_{M^\perp} \circ_L P_{M^\perp} = P_{M^\perp},\quad P_M \circ_L P_{M^\perp} = 0,\quad P_{M^\perp} \circ_L P_M = 0,\quad P_M + P_{M^\perp} = \operatorname{id}_{\mathbb{K},E}.
   $$
:::

::: proof
Clause 1 establishes Cartesian uniqueness and degree preservation by invertible real–imaginary change of variables, uses Fourier-mode orthogonality in $\theta$ to equate common-$U(1)$ phase invariance with equal holomorphic and antiholomorphic degrees on every nonzero monomial (forcing degree $\ge 2$ for nonconstant invariants and generation by bilinear pairs), and extracts the unique Hermitian matrix $H$ and its positive-semidefinite equivalence on real-valued degree-$2$ homogeneous invariants. Clause 2 extracts $O$ from $0 \le Q$ via the continuous $C^*$-algebra square root so $Q = O^\dagger \circ_L O$, and conversely reads $\langle Q x, x \rangle_{\mathbb{C}} = \|O x\|^2 \ge 0$ from the adjoint property. Clause 3 verifies all six identities from the Hilbert direct-sum decomposition $E = M \oplus M^\perp$ and self-adjoint idempotence. The full proof is checked by the Lean kernel.
:::

Respecting every hypothesis boundary of [@thm-ch33-consensus-quadratic-and-gram], the second preset card below juxtaposes real measurement-axis sign flips $\mathbf{n}_j \mapsto -\mathbf{n}_j$ against common complex ket-phase rotations $z \mapsto e^{i\theta} z$:

::: {.viz src="observer-consensus-decoherence" preset="phase-gauge" height="500"}
**Axis Sign Relabeling vs. Complex Phase Gauge Card (`phase-gauge`)**: Eight unsigned measurement axes ($4$ along $z$ with total weight $0.60$, $2$ along $x$ with $0.25$, $2$ along $y$ with $0.15$) give $\mathbf{M}_{\mathrm{cons}} = \operatorname{diag}(0.25, 0.15, 0.60)$, spectrum $(0.60, 0.25, 0.15)$, $\kappa = 0.40$, and gap $\Delta\lambda = 0.35$. Flipping axis signs one by one leaves every entry of $\mathbf{M}_{\mathrm{cons}}$, its spectrum, and the mean contraction channel unchanged; a dedicated ket-phase inset verifies invariance of quadratic Hermitian and Gram pairings under $z \mapsto e^{i\theta} z$ ([@thm-ch33-consensus-quadratic-and-gram]), keeping axis-label swaps strictly distinct from orthogonal antipodal states.
:::

## 33.5.2 Pauli-Dephasing Bloch Contraction, Longitudinal Pointer Survival, and Transverse Pythagorean Deletion {#sec-ch33-consensus-pinching-pointer}

With the static consensus tensor $\mathbf{M}_{\mathrm{cons}}$ in hand, we now derive—rather than fit—how sequential observer couplings sculpt the Bloch ball dynamically (`manual derivation`). Write a qubit state as $\rho = \frac{1}{2}(I_2 + \mathbf{r}\cdot\vec{\sigma})$ ($\|\mathbf{r}\| \le 1$) and set $A = \mathbf{n}\cdot\vec{\sigma}$ ($A^\dagger = A,\; A^2 = I_2$) for a unit axis $\mathbf{n}$. For coupling angle $\alpha \in [0, \frac{\pi}{2}]$, Kraus operators $L_0 = \cos(\frac{\alpha}{2}) I_2$ and $L_1 = \sin(\frac{\alpha}{2}) A$ obey $\sum_{s=0}^1 L_s^\dagger L_s = I_2$, defining the unital CPTP Pauli-dephasing channel

$$
\mathcal{E}_{\mathbf{n},\alpha}(\rho) \;=\; \cos^2\!\Bigl(\frac{\alpha}{2}\Bigr)\rho + \sin^2\!\Bigl(\frac{\alpha}{2}\Bigr)(\mathbf{n}\cdot\vec{\sigma})\rho(\mathbf{n}\cdot\vec{\sigma}).
$$

Using $A(\mathbf{r}\cdot\vec{\sigma})A = \bigl[2(\mathbf{n}\cdot\mathbf{r})\mathbf{n} - \mathbf{r}\bigr]\cdot\vec{\sigma}$, its induced linear map on Bloch vectors $\mathbf{r} \in \mathbb{R}^3$ is the exact projector decomposition

$$
\mathbf{K}(\mathbf{n}, \alpha) \;=\; \cos\alpha\,I_3 + (1 - \cos\alpha)\mathbf{n}\mathbf{n}^{\mathsf{T}} \;=\; P_{\mathbf{n}} + \cos\alpha\,(I_3 - P_{\mathbf{n}}),
$$

with eigenvalues $(1, \cos\alpha, \cos\alpha)$: the component along $\mathbf{n}$ survives intact while both transverse components multiply by $\cos\alpha$ (monotone nonnegative damping across the physical dephasing range $0 \le \alpha \le \frac{\pi}{2}$: $\alpha = 0$ is the identity, $\alpha = \frac{\pi}{2}$ is complete rank-one unread pinching, and $\alpha = \pi$ is unitary Pauli conjugation rather than irreversible decoherence). Across $N$ encounters, three distinct multi-observer compositions must retain their separate mathematical labels and never be joined by an unqualified equals sign:

1. **Prescribed chronological sequence (`ordered`)**: $\mathbf{r}_N = \mathbf{K}_{\mathrm{seq}}\mathbf{r}_0$ with $\mathbf{K}_{\mathrm{seq}} = \mathbf{K}(\mathbf{n}_N, \alpha_N)\cdots\mathbf{K}(\mathbf{n}_1, \alpha_1)$ (observer $1$ acting at the right). For generic oblique axes the factors do not commute, $\mathbf{K}_{\mathrm{seq}}$ need not be symmetric, and $\mathbf{M}_{\mathrm{cons}}$ alone does not reconstruct a finite ordered schedule;
2. **Independent weighted random-encounter mean (`mean`)**: if each of $N$ encounters independently draws axis $\mathbf{n}_j$ with probability $w_j$ at common strength $\alpha$, conditional expectation yields $\overline{\mathbf{K}} = \cos\alpha\,I_3 + (1 - \cos\alpha)\mathbf{M}_{\mathrm{cons}}$ and $\mathbb{E}[\mathbf{r}_N] = \overline{\mathbf{K}}^{\,N}\mathbf{r}_0$, with exact principal-mode multipliers $\overline{\Gamma}_i(N) = \bigl[\lambda_i + (1 - \lambda_i)\cos\alpha\bigr]^N$;
3. **Weak-coupling continuous / Lie–Trotter semigroup limit (`weak-limit`)**: expanding $\mathbf{K}(\mathbf{n}, \alpha) = I_3 - \frac{1}{2}\alpha^2(I_3 - P_{\mathbf{n}}) + O(\alpha^4)$ and taking $\alpha \to 0,\; N \to \infty$ at fixed $t = \frac{1}{2}N\alpha^2$ (or deterministic Lie–Trotter steps $\cos\alpha_j = e^{-(t/L)w_j}$ as $L \to \infty$) yields the exact Lindblad dissipator $\mathcal{L}(\rho) = \frac{1}{2}\sum_{j=1}^N w_j(A_j\rho A_j - \rho)$ and Bloch generator $G = \sum_{j=1}^N w_j(I_3 - P_j) = I_3 - \mathbf{M}_{\mathrm{cons}}$:

   $$
   \frac{d\mathbf{r}}{dt} \;=\; -(I_3 - \mathbf{M}_{\mathrm{cons}})\mathbf{r}, \qquad \Gamma_i^{\mathrm{lim}}(N) \;=\; \exp\Bigl[-\frac{1}{2}N\alpha^2(1 - \lambda_i)\Bigr].
   $$

This makes the emergence of a pointer direction quantitatively transparent: under **unanimous collinear consensus** ($\lambda_1 = 1,\; \lambda_2 = \lambda_3 = 0,\; \kappa = 1$), the longitudinal decay rate $1 - \lambda_1 = 0$ vanishes so both finite and limiting channels give $\Gamma_\parallel = 1$ exactly (pointer populations survive untouched), while the transverse coherence disk contracts by $\Gamma_{\perp,2} = \Gamma_{\perp,3} = (\cos\alpha)^N$ in the finite channel and $\exp(-\frac{1}{2}N\alpha^2)$ in the weak limit (e.g., at $\alpha = 0.4, N = 16$: $(\cos 0.4)^{16} \approx 0.2683$ vs. $e^{-1.28} \approx 0.2780$, agreeing asymptotically for small $\alpha$ rather than identically at finite $\alpha$); under partial consensus ($\lambda_2 < \lambda_1 < 1$), all modes decay toward $\frac{1}{2}I_2$ at infinite time, yet longitudinal-to-transverse survival grows exponentially as $e^{t(\lambda_1 - \lambda_2)}$, singling out the leading eigenspace as a finite-time preferred pointer line.

::: {.remark #rem-ch33-ordered-history-coverage-loss title="Initial Coverage and Loss Along the Same Finite Ordered History (Manual Derivation, Not Formalized)"}
Although the aggregate consensus tensor does not reconstruct a finite ordered product, this section's projection decomposition, orthogonal Pythagorean identity, and finite Cauchy–Schwarz inequality directly yield a comparison between coverage and loss. Fix any integer $L\ge1$, any realized ordered history $\{(\mathbf{n}_j,\alpha_j)\}_{j=1}^L$ with $\|\mathbf{n}_j\|=1$ and $\alpha_j\in[0,\pi/2]$, and any initial vector $\mathbf{r}\in\mathbb{R}^3$. Write

$$
\begin{aligned}
c_j&=\cos\alpha_j\in[0,1], & a_j&=1-c_j,\\
P_j&=\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}, & Q_j&=I_3-P_j,\\
\mathbf{x}_0&=\mathbf{r}, & \mathbf{x}_j&=(P_j+c_jQ_j)\mathbf{x}_{j-1}\quad(1\le j\le L).
\end{aligned}
$$

Here $P_j$ and $Q_j$ are the orthogonal projections onto the axis and its orthogonal complement, respectively, and all norms are Euclidean. Define the **initial coverage** and **window loss** by

$$
\begin{aligned}
C_L(\mathbf{r})&:=\sum_{j=1}^L a_j\|Q_j\mathbf{r}\|^2,\\
D_L(\mathbf{r})&:=\|\mathbf{r}\|^2-\|\mathbf{x}_L\|^2.
\end{aligned}
$$

Coverage evaluates every axis in this history against the same initial vector; loss follows the intermediate vectors actually produced by that history. They satisfy

$$
C_L(\mathbf{r})\;\le\;\frac{L(L+1)}{2}\,D_L(\mathbf{r}).
$$

To derive this step by step, use $P_i\mathbf{x}_{i-1}\perp Q_i\mathbf{x}_{i-1}$: the preserved longitudinal contribution cancels when subtracting squared norms, so the loss $d_i$ and displacement at each step satisfy

$$
\begin{aligned}
d_i&:=\|\mathbf{x}_{i-1}\|^2-\|\mathbf{x}_i\|^2
     =(1-c_i^2)\|Q_i\mathbf{x}_{i-1}\|^2\ge0,\\
\mathbf{x}_{i-1}-\mathbf{x}_i&=(1-c_i)Q_i\mathbf{x}_{i-1},\\
\|\mathbf{x}_{i-1}-\mathbf{x}_i\|^2
     &=(1-c_i)^2\|Q_i\mathbf{x}_{i-1}\|^2\le d_i,\\
\sum_{i=1}^L d_i&=D_L(\mathbf{r}).
\end{aligned}
$$

The inequality uses $(1-c_i)^2\le1-c_i^2$, and the final line telescopes along the same history. Now fix $1\le j\le L$, put $\mathbf{v}_i=Q_j(\mathbf{x}_{i-1}-\mathbf{x}_i)$ for $1\le i<j$, and put $\mathbf{v}_j=Q_j\mathbf{x}_{j-1}$. Linearity of the projection and telescoping over this prefix give

$$
\sum_{i=1}^j\mathbf{v}_i
=Q_j\left(\sum_{i=1}^{j-1}(\mathbf{x}_{i-1}-\mathbf{x}_i)+\mathbf{x}_{j-1}\right)
=Q_j\mathbf{r}.
$$

For $i<j$, contractivity of orthogonal projection and $0\le a_j\le1$ give $a_j\|\mathbf{v}_i\|^2\le\|\mathbf{x}_{i-1}-\mathbf{x}_i\|^2\le d_i$. For the terminal term, $a_j=1-c_j\le1-c_j^2$ gives $a_j\|\mathbf{v}_j\|^2\le d_j$. The triangle inequality and finite Cauchy–Schwarz inequality therefore yield

$$
\begin{aligned}
a_j\|Q_j\mathbf{r}\|^2
&\le a_j\left(\sum_{i=1}^j\|\mathbf{v}_i\|\right)^2\\
&\le j\sum_{i=1}^j a_j\|\mathbf{v}_i\|^2
\le j\sum_{i=1}^j d_i
\le jD_L(\mathbf{r}).
\end{aligned}
$$

Summing over $j$ and using $\sum_{j=1}^L j=L(L+1)/2$ gives the stated triangular coefficient. If the initial vector under consideration has a relative coverage lower bound $C_L(\mathbf{r})\ge\gamma\|\mathbf{r}\|^2$ with $\gamma>0$, then **the same finite window** has $D_L(\mathbf{r})\ge\frac{2\gamma}{L(L+1)}\|\mathbf{r}\|^2$, hence strictly positive loss for a nonzero initial vector. This supplies no automatic coverage lower bound for later windows and does not identify the realized ordered history with an ensemble mean under independent identically distributed sampling, spectral decay of the aggregate tensor, or a weak-coupling continuous limit.

The derivation never divides by $a_j$, $c_j$, or a vector norm, and its validity requires neither distinct axes, commuting factors, strict damping, nor a positive coverage lower bound. It therefore includes $L=1$, $\alpha_j=0$ or $\pi/2$, repeated or collinear axes, and $\mathbf{r}=0$. It holds for every $\mathbf{r}\in\mathbb{R}^3$ within the stated linear model; only $\|\mathbf{r}\|\le1$ corresponds to a physical density state, and $D_L$ is squared-norm loss, not entropy production or experimental evidence about real measurements. This complete inference is a manual derivation: no exact Lean statement has been compiled, kernel-verified, or checked for axiom closure. The adjacent frozen theorems do not constitute formal verification of this full inference. The coefficient comes from the finite sum above; no optimality is claimed.
:::

At the full-pinching endpoint $\alpha = \frac{\pi}{2}$ (after rotating the pointer basis into the computational basis), the deleted transverse quadratures $\rho_{+-} = \frac{1}{2}(r_2 - i r_3)$ form the exact orthogonal remainder of Hilbert–Schmidt Pythagorean splitting, each full-pinching step produces von Neumann entropy equal to quantum relative entropy while subsequent aligned passes add zero entropy by idempotence ([@thm-ch33-observer-pinching-and-memory-spectrum], Conjunct 1), and fixed states are characterized by vanishing cross-record blocks:

::: {.theorem #thm-ch33-consensus-pinching-and-fixed-points title="Qubit Pinching Hilbert–Schmidt Pythagoras, Coherence-Deletion Entropy Identity, and Unread Record Fixed Points" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity D5/S3/Observer/Conditioning.unreadState_fixed_iff"}
Across the frozen quantum-channel pinching, entropy-production dynamics, and observer-conditioning modules of `trureturing`, the following three theorems hold simultaneously:

1. **Hilbert–Schmidt Pythagorean Decomposition of Qubit Computational Pinching** ([`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)): For every $2 \times 2$ complex matrix $\rho \in \mathrm{QubitMatrix} = M_{\operatorname{Fin} 2}(\mathbb{C})$, writing $\operatorname{pinching}(\rho)$ for diagonal computational-basis pinching and $\langle A, B \rangle_{\mathrm{HS}} = \operatorname{Tr}(A^\dagger B)$ for the Hilbert–Schmidt inner product, the squared norm splits orthogonally into its pinched diagonal part and its discarded off-diagonal coherence part:

   $$
   \langle \rho, \rho \rangle_{\mathrm{HS}} \;=\; \langle \operatorname{pinching}(\rho), \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}} \;+\; \langle \rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}};
   $$

2. **Stepwise and Telescoped Entropy-Production Identity for Unitary-Then-Full-Pinching Sequences** ([`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)): Let $n$ be a finite decidable type, let $U \in \operatorname{unitaryGroup}(n, \mathbb{C})$ be a fixed unitary matrix, and let $\rho : \mathbb{N} \to \operatorname{DensityState} n$ satisfy $\forall k \in \mathbb{N},\; \rho(k + 1) = \operatorname{basisPinchingState}(\sigma_k)$, where $\sigma_k := \operatorname{unitaryConjugateState}\; U\; h_U\; (\rho(k))$ and $S_{\mathrm{vN}}, D(\cdot\,\|\,\cdot)$ use natural logarithms. Then every step's entropy gain equals the nonnegative relative entropy of $\sigma_k$ against its basis pinching, and finite $N$-step entropy production telescopes exactly:

   $$
   \forall k \in \mathbb{N},\quad S_{\mathrm{vN}}(\rho(k+1)) - S_{\mathrm{vN}}(\rho(k)) = D\bigl(\sigma_k \,\big\|\, \operatorname{basisPinchingState}(\sigma_k)\bigr) \ge 0, \qquad S_{\mathrm{vN}}(\rho(N)) - S_{\mathrm{vN}}(\rho(0)) = \sum_{k=0}^{N-1} D\bigl(\sigma_k \,\big\|\, \operatorname{basisPinchingState}(\sigma_k)\bigr);
   $$

3. **Fixed-Point Criterion for Complete Projective Unread Record Measurements** ([`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)): Let $n, \kappa$ be finite decidable types, and let $P : \kappa \to M_n(\mathbb{C})$ satisfy `IsRecordMeasurement P`. For any matrix $\rho \in M_n(\mathbb{C})$, the unread record channel fixes $\rho$ if and only if every off-diagonal cross-record block vanishes:

   $$
   \operatorname{unreadState}(P)(\rho) = \rho \;\Longleftrightarrow\; \forall k, l \in \kappa,\; k \neq l \implies P_k \rho P_l = 0.
   $$
:::

::: proof
Clause 1 expands the disjoint diagonal support of $\operatorname{pinching}(\rho)$ and off-diagonal support of $\rho - \operatorname{pinching}(\rho)$, so their Hilbert–Schmidt cross inner product vanishes identically. Clause 2 combines unitary entropy invariance $S_{\mathrm{vN}}(\sigma_k) = S_{\mathrm{vN}}(\rho(k))$ with the full-pinching cross-trace identity $\operatorname{Tr}(\sigma_k \ln \operatorname{basisPinchingState}(\sigma_k)) = \operatorname{Tr}(\operatorname{basisPinchingState}(\sigma_k) \ln \operatorname{basisPinchingState}(\sigma_k))$, applies Klein's inequality for nonnegativity, and telescopes the finite sum over $\operatorname{Finset.range} N$. Clause 3 left-multiplies $\operatorname{unreadState}(P)(\rho) = \rho$ by $P_k$ and right-multiplies by $P_l$ ($k \neq l$) using $P_k P_m = \delta_{km} P_k$ for the forward direction, and expands $\rho = \sum_{k,l} P_k \rho P_l$ via $\sum_k P_k = 1$ for the converse. The full proof is checked by the Lean kernel.
:::

Two exact scope guardrails accompany [@thm-ch33-consensus-pinching-and-fixed-points]: Clause 2 holds for steps ending in **full basis pinching** (taking $U = I$ gives $\Delta S_{\mathrm{vN}} = D(\rho\,\|\,\mathcal{P}(\rho))$, dividing both sides by $\ln 2$ for bits, whereas fractional Pauli dephasing $0 < \alpha < \frac{\pi}{2}$ does not satisfy $\Delta S_{\mathrm{vN}} = D(\rho\,\|\,\mathcal{E}(\rho))$); and Clause 3 characterizes block-diagonal mixed fixed points without asserting collapse to a single outcome. The card below displays longitudinal preservation alongside transverse disk contraction:

::: {.viz src="observer-consensus-decoherence" preset="axis-consensus" height="500"}
**Collinear Axis Consensus and Transverse Contraction Card (`axis-consensus`)**: Sixteen equal-weight axes alternate signs along $\pm z$, giving $\lambda = (1, 0, 0),\; \kappa = 1$. Acting on $\mathbf{r}_0 = (1, 0, 1)/\sqrt{2}$ with $N = 16, \alpha = 0.4$ exact Pauli channels keeps the cyan longitudinal polarization $r_z = 1/\sqrt{2}$ invariant ($\Gamma_\parallel = 1$) while contracting the magenta transverse disk by $(\cos\alpha)^k$; toggling the separate "full pinching ($\alpha = \pi/2$)" switch verifies Hilbert–Schmidt Pythagoras, full-pinching relative-entropy gain, and pointer-diagonal fixed states ([@thm-ch33-consensus-pinching-and-fixed-points]).
:::

## 33.5.3 Quantum Darwinism Redundancy Plateau, Local Reversal Blocking, and the Consensus Kernel {#sec-ch33-consensus-darwinism-kernel}

If an unread dephasing channel leaves a diagonal classical mixture on the system, why do ten passersby inspecting the same signpost independently read matching classical pointer labels, and why can no single observer restore quantum interference by erasing their own private notebook? To answer quantitatively, we move to the **pure two-branch aligned record model** in a fixed common pointer basis $\{|0\rangle_S, |1\rangle_S\}$ (`manual derivation`, explicitly distinct from non-collinear Pauli schedules above): an isometric coupling from initially blank observer records prepares the global pure state

$$
|\Psi\rangle \;=\; \sqrt{p_0}\,|0\rangle_S \bigotimes_{j=1}^N |\phi_j^{(0)}\rangle \;+\; e^{i\chi}\sqrt{p_1}\,|1\rangle_S \bigotimes_{j=1}^N |\phi_j^{(1)}\rangle \qquad (p_0, p_1 \ge 0,\; p_0 + p_1 = 1),
$$

with conditional record overlaps $c_j := \langle\phi_j^{(0)}\mid\phi_j^{(1)}\rangle$ (realized for real $c_j = \cos\alpha_j$ by $|\phi_j^{(0)}\rangle = (1, 0)^{\mathsf{T}},\, |\phi_j^{(1)}\rangle = (\cos\alpha_j, \sin\alpha_j)^{\mathsf{T}}$ under controlled rotation $U_j = |0\rangle\langle 0| \otimes I_2 + |1\rangle\langle 1| \otimes R_y(2\alpha_j)$, whose partial trace multiplies system coherence by $\cos\alpha_j$). For any observer fragment $F \subseteq \{1, \dots, N\}$ of size $m$ (with complement $F^c$ and overlap product $\Pi_F := \prod_{j \in F} c_j$, $\Pi_\varnothing := 1$), the reduced fragment state $\rho_F = p_0 |\Phi_F^{(0)}\rangle\langle\Phi_F^{(0)}| + p_1 |\Phi_F^{(1)}\rangle\langle\Phi_F^{(1)}|$ has rank at most $2$ and shares its nonzero spectrum $\frac{1 \pm d(\Pi_F)}{2}$ with the $2 \times 2$ Gram matrix

$$
V_F^\dagger V_F \;=\; \begin{pmatrix} p_0 & \sqrt{p_0 p_1}\,\Pi_F \\ \sqrt{p_0 p_1}\,\overline{\Pi_F} & p_1 \end{pmatrix}, \qquad \det(V_F^\dagger V_F) \;=\; p_0 p_1\bigl(1 - |\Pi_F|^2\bigr),
$$

where $d(q) := \sqrt{1 - 4 p_0 p_1(1 - |q|^2)}$. Writing $H_2(x) = -x\log_2 x - (1-x)\log_2(1-x)$ and $h(q) := H_2\bigl(\frac{1 - d(q)}{2}\bigr)$, global purity of $|\Psi\rangle$ implies $S(\rho_{SF}) = S(\rho_{F^c})$, so a single $O(N)$ prefix–suffix pass computes the exact quantum mutual information (in bits) between $S$ and $\mathcal{O}_m = \{1, \dots, m\}$ without ever forming a $2^{N+1} \times 2^{N+1}$ matrix:

$$
S(\rho_S) = h(\Pi_{\mathrm{all}}), \quad S(\rho_{\mathcal{O}_m}) = h(\Pi_F), \quad S(\rho_{S\mathcal{O}_m}) = h(\Pi_{F^c}), \quad I(S : \mathcal{O}_m) \;=\; h(\Pi_{\mathrm{all}}) + h(\Pi_F) - h(\Pi_{F^c}).
$$

Three exact regimes emerge immediately: (1) at $m = 0$, $\Pi_\varnothing = 1$ and $h(1) = 0$, so $I(S : \varnothing) = 0$; (2) across interior fractions $0 < m < N$, whenever $0 < p_0 < 1$ and both $|\Pi_F|$ and $|\Pi_{F^c}|$ are small (for instance at $N = 16,\, p_0 = \frac{1}{2},\, c_j = 0.3$, where $|I(S : \mathcal{O}_m) - S(\rho_S)| < 5.26 \times 10^{-4}\text{ bits}$ for all $m = 3, \dots, 13$), all three entropies sit near the classical Shannon entropy $H_2(p_0)$, carving out a flat **classical redundancy plateau** $I(S : \mathcal{O}_m) \approx H_2(p_0)$—even a small fraction of observers already captures nearly the full classical pointer information (note that this curve characterizes redundant classical correlation under pure aligned branching, not non-unitary collapse to a single outcome); and (3) at global joint access $m = N$ ($\Pi_\varnothing = 1, h(\Pi_{F^c}) = 0$) mutual information reaches the full quantum purification value $I(S : \mathcal{O}_N) = 2 S(\rho_S)$!

This likewise explains why local observers experience effective irreversibility: applying controlled inverses $U_j^\dagger$ on an accessible subset $A \subset \{1, \dots, N\}$ leaves residual system coherence $|\rho_{01}^{\mathrm{res}}| = \sqrt{p_0 p_1}\prod_{j \notin A}|c_j|$—a single inaccessible orthogonal ($c_k = 0$) or low-overlap ($|c_k| < 1$) copy blocks local restoration! In `trureturing`, unimodular amplitude-conjugation reversal blocking, the exact two-copy phase certificate, orthogonal-copy partial-trace access defect, and readout partition-topology kernels supply the formal anchors:

::: {.theorem #thm-ch33-consensus-redundant-records-and-kernel title="Surviving-Copy Reversal Blocking, Two-Copy Phase Certificate, Reduced Access Defect, and Partition-Topology Kernel" lean="D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel"}
Across the frozen joint-coherent-reversal, reduced-access-defect, and partition-topology modules of `trureturing`, the following four theorems hold simultaneously:

1. **Reversal Blocking by a Single Surviving Record Copy** ([`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal)): Let `Copy` be a finite decidable type, let $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$, let $\rho \in \mathrm{QubitMatrix}$, let $i, j \in \operatorname{Fin} 2$, and let $k \in \mathrm{Copy}$. Writing $c_l := \operatorname{recordOverlap}(\mathrm{records}\; l)\; i\; j$, if every other copy satisfies $\forall l \neq k,\; \overline{c_l}\, c_l = 1$ while copy $k$ satisfies $c_k \neq 1$ and $\rho_{ij} \neq 0$, then applying the amplitude-conjugating reverse channels to all copies except $k$ leaves entry $c_k \rho_{ij}$ and strictly fails to restore $\rho_{ij}$:

   $$
   \operatorname{reverseChannelOn}(\operatorname{Finset.univ.erase}\; k)\;\mathrm{records}\bigl(\operatorname{multiRecordChannel}\;\mathrm{records}\;\rho\bigr)_{ij} \;\neq\; \rho_{ij};
   $$

2. **Four-Stage Two-Copy Phase-Record Reversal Certificate** ([`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)): For $\rho = \operatorname{equalSuperpositionDensity}$, the single-address record $\mathrm{phaseRecord}$ with conditional amplitudes $1$ ($i = 0$) and $i$ ($i = 1$, overlap $-i$), and $\mathrm{records} : \operatorname{Fin} 2 \to \mathrm{EnvironmentRecord}$, the $(0, 1)$ coherence entry takes the four exact values across initial state, two-copy recording, reversing copy $0$ alone, and reversing both copies jointly:

   $$
   \rho_{01} = \frac{1}{2}, \quad \operatorname{multiRecordChannel}(\mathrm{records}, \rho)_{01} = -\frac{1}{2}, \quad \operatorname{reverseChannelOn}(\{0\}, \mathrm{records}, \dots)_{01} = -\frac{i}{2}, \quad \operatorname{reverseChannelOn}(\mathrm{univ}, \mathrm{records}, \dots)_{01} = \frac{1}{2};
   $$

3. **Reduced Irreversibility as Pure Record-Access Defect** ([`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect)): Let $\rho, \sigma \in \mathrm{QubitMatrix}$ have equal diagonals ($\forall i,\; \rho_{ii} = \sigma_{ii}$) and at least one distinct off-diagonal entry ($\exists i \neq j,\; \rho_{ij} \neq \sigma_{ij}$). Then $\mathrm{copyUnitary} \in \operatorname{unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$ unitarily maps blank-environment inputs to distinct joint record states $\tau_\rho \neq \tau_\sigma$ whose reduced qubit marginals coincide ($\operatorname{traceEnvironment}(\tau_\rho) = \operatorname{traceEnvironment}(\tau_\sigma)$), so no map from the reduced matrix alone recovers both $\tau_\rho$ and $\tau_\sigma$, whereas applying $\operatorname{star}\;\mathrm{copyUnitary}$ to the joint states restores both blank-environment inputs;
4. **Partition-Topology Inseparability iff Readout Kernel Equality** ([`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)): For arbitrary types $X, B$, readout $\mathrm{readout} : \operatorname{Concept} X B$, and points $x, y \in X$, topological inseparability in $\operatorname{partitionTopology}(\mathrm{readout})$ holds if and only if the readout assigns equal values:

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \;\Longleftrightarrow\; \mathrm{readout}(x) = \mathrm{readout}(y).
   $$
:::

::: proof
Clause 1 expands the entrywise Hadamard product of `multiRecordChannel` and `reverseChannelOn`, cancels $\overline{c_l} c_l = 1$ for every $l \neq k$ to leave $c_k \rho_{ij}$, and concludes $c_k \rho_{ij} \neq \rho_{ij}$ from $c_k \neq 1$ and $\rho_{ij} \neq 0$. Clause 2 evaluates the overlap $-i$ explicitly: $(-i)^2 \cdot \frac{1}{2} = -\frac{1}{2}$, $i \cdot (-\frac{1}{2}) = -\frac{i}{2}$, and $i^2 \cdot (-\frac{1}{2}) = \frac{1}{2}$. Clause 3 checks unitarity of the controlled-copy permutation, diagonal preservation and off-diagonal vanishing under partial trace, impossibility of single-valued simultaneous recovery from identical reduced inputs, and exact restoration under adjoint conjugation. Clause 4 unfolds open-set membership in the induced discrete pullback topology. The full proof is checked by the Lean kernel.
:::

Keep two exact distinctions in view when reading [@thm-ch33-consensus-redundant-records-and-kernel]: first, `reverseChannelOn` in Clauses 1–2 conjugates record amplitudes, which inverts unimodular phase records ($|c_l| = 1$) whereas on noisy branching records ($|c| < 1$) amplitude conjugation multiplies coherence by $|c|^2$ rather than inverting the coupling—so noisy-branch erasure requires controlled joint unitaries $U_j^\dagger$, while Clause 2's four-value phase certificate is displayed in its own dedicated inset; second, applying Clause 4 to the product readout $R(x) = (r_1(x), \dots, r_N(x))$ gives the **intersection** of individual equality kernels $\bigcap_{j=1}^N \ker_{\mathrm{eq}}(r_j)$ (finer than each $r_j$, never to be mislabeled "common knowledge" or confused with the linear nullspace $\ker\mathbf{M}_{\mathrm{cons}}$; a genuine cross-context invariant factor still requires the witness of [@thm-ch33-contextual-attractor-and-common-factor], Conjunct 4).

::: {.viz src="observer-consensus-decoherence" preset="darwinism-plateau" height="500"}
**Quantum Darwinism Redundancy Plateau and Reversal-Blocking Card (`darwinism-plateau`)**: Pure aligned branching model ($N = 16,\, p_0 = \frac{1}{2},\, c_j = 0.3$). Sweeping fragment size $m = 0 \dots 16$ traces the exact mutual-information curve from $I(0) = 0$ onto a flat near-$1\text{-bit}$ classical redundancy plateau ($|I(m) - S(\rho_S)| < 5.3 \times 10^{-4}\text{ bits}$ across $m = 3 \dots 13$) before rising to $2 S(\rho_S)$ at global access $m = 16$. Toggling controlled-$U_j^\dagger$ access demonstrates how uncontrolled overlaps cap residual coherence, while a separate inset displays the exact four-stage phase trajectory $\frac{1}{2} \to -\frac{1}{2} \to -\frac{i}{2} \to \frac{1}{2}$ of `two_copy_joint_reversal_certificate` ([@thm-ch33-consensus-redundant-records-and-kernel]).
:::

## 33.5.4 Dual-Wigner Orthogonal Consensus Bubbles, Local Friendliness Bounds, and Pioneer Escape Residuals {#sec-ch33-consensus-wigner-pioneers}

We now arrive at the sharpest thought experiment of all: **what happens when there is no single global consensus—when two decoupled observer bubbles $\mathcal{C}_A$ (aligned along $Z$) and $\mathcal{C}_B$ (aligned along $X$, at $90^\circ$) coexist without sharing a common pointer axis?**

First check the single-qubit algebra with complete precision (`manual derivation`): combining equal-weight $Z$ and $X$ bubbles yields $\mathbf{M}_{AB} = \frac{1}{2}(\mathbf{x}\mathbf{x}^{\mathsf{T}} + \mathbf{z}\mathbf{z}^{\mathsf{T}})$ with descending spectrum $(\frac{1}{2}, \frac{1}{2}, 0)$ and spectral gap $\Delta\lambda = 0$—each bubble possesses its own local pointer axis, yet their union has **no unique global top pointer axis**, and, when both bubbles couple with nonzero dephasing strength, their sole common unread fixed state is $\frac{1}{2}I_2$. Writing $\mathbf{K}(\mathbf{n},c) = cI_3 + (1-c)\mathbf{n}\mathbf{n}^{\mathsf{T}}$, the parameterized Bloch-axis result [@thm-ch33-axis-contraction-commutator] gives the exact commutator for **unread** Pauli-dephasing superoperators:

$$
[\mathbf{K}_{\mathbf{n}}, \mathbf{K}_{\mathbf{m}}] \;=\; (1 - \cos\alpha_n)(1 - \cos\alpha_m)(\mathbf{n}\cdot\mathbf{m})\bigl(\mathbf{n}\mathbf{m}^{\mathsf{T}} - \mathbf{m}\mathbf{n}^{\mathsf{T}}\bigr),
$$

::: {.theorem #thm-ch33-axis-contraction-commutator title="Parameterized Bloch Axis-Contraction Commutator and Oblique-Axis Noncommutation Criterion" lean="D5/S3/Quantum/Measurement/Bloch/AxisContractionCommutator.axisOuter_eq_implies_parallel D5/S3/Quantum/Measurement/Bloch/AxisContractionCommutator.axisContraction_commutator D5/S3/Quantum/Measurement/Bloch/AxisContractionCommutator.axisContraction_commutator_ne_zero_of_nonparallel_nonorthogonal"}
The frozen Bloch-axis module proves three algebraic facts. First, if the first axis vector is nonzero and its rank-one outer product is unchanged when the two axes are exchanged, then the second axis is a real scalar multiple of the first. Second, for arbitrary three-coordinate vectors $\mathbf{n},\mathbf{m}$ and real factors $c,d$,

$$
\mathbf{K}(\mathbf{n},c)\mathbf{K}(\mathbf{m},d)-\mathbf{K}(\mathbf{m},d)\mathbf{K}(\mathbf{n},c)
= (1-c)(1-d)(\mathbf{n}\cdot\mathbf{m})\bigl(\mathbf{n}\mathbf{m}^{\mathsf T}-\mathbf{m}\mathbf{n}^{\mathsf T}\bigr).
$$

Consequently, a nonzero first axis, a second axis that is not parallel to it, a nonzero dot product, and $c,d\ne 1$ force a nonzero commutator.
:::

::: proof
For the first fact, choose $i$ with $n_i\ne 0$. The outer-product equality gives $n_i m_j=m_i n_j$ for every $j$, hence $\mathbf{m}=(m_i/n_i)\mathbf{n}$. For the identity, expand both matrix products entrywise and the finite three-coordinate dot product, then normalize the resulting polynomial expressions. For noncommutation, the first fact and the nonparallel assumption imply that the skew outer-product difference is nonzero; the nonzero dot product and $c,d\ne 1$ make its scalar coefficient nonzero as well. The full proof is checked by the Lean kernel.
:::

In the qubit channel interpretation of §33.5.2, the axes are unit vectors and $c=\cos\alpha_n$, $d=\cos\alpha_m$ lie in $[0,1]$; the Lean result itself is an algebraic matrix statement and does not assert a CPTP realization. As an exact algebraic instance, take $\mathbf{e}=(1,0,0)$, $\mathbf{m}=(3/5,4/5,0)$, $c=1/2$, and $d=1/3$. The $(0,1)$ entries of $\mathbf{K}(\mathbf{e},c)\mathbf{K}(\mathbf{m},d)$ and $\mathbf{K}(\mathbf{m},d)\mathbf{K}(\mathbf{e},c)$ are $8/25$ and $4/25$, respectively.

For unit axes, this commutator vanishes identically both for parallel axes ($\mathbf{n}\cdot\mathbf{m} = \pm 1$) **and for strictly orthogonal axes** ($\mathbf{n}\cdot\mathbf{m} = 0$); it is nonzero for oblique axes such as $45^\circ$ when both factors differ from $1$. Order incompatibility between $90^\circ$ $Z$ and $X$ bubbles therefore comes **not** from unread dephasing, but from **selective post-measurement updates** $\mathcal{J}_{\mathbf{n},+}(\rho) = P_{\mathbf{n},+}\rho P_{\mathbf{n},+}$ ($P_{\mathbf{n},+} = \frac{1}{2}(I_2 + \mathbf{n}\cdot\vec{\sigma})$): starting from $\frac{1}{2}I_2$, $\mathcal{J}_{X,+}(\mathcal{J}_{Z,+}(\frac{1}{2}I_2)) = \frac{1}{4}P_{X,+}$ whereas $\mathcal{J}_{Z,+}(\mathcal{J}_{X,+}(\frac{1}{2}I_2)) = \frac{1}{4}P_{Z,+}$—both branches occur with probability $\frac{1}{4}$, yet their normalized conditional endpoints diverge to $|+X\rangle$ versus $|+Z\rangle$ (with subnormalized Hilbert–Schmidt norm difference $\frac{1}{4}$). On discrete belief sets and closed Hilbert subspaces, conflict-reset order noncommutativity and unit orthogonal escape are anchored by two frozen theorems:

::: {.theorem #thm-ch33-consensus-revision-and-escape title="Order Noncommutativity of Conflict Belief Revision and Unit Orthogonal Projection Escape" lean="D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
Across the frozen concept-revision and finite-layer-escape modules of `trureturing`, the following two theorems hold simultaneously:

1. **Order Noncommutativity of Reset-on-Conflict Belief Revision** ([`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation)): On the three-state type $\operatorname{Fin} 3 = \{0, 1, 2\}$, define $\operatorname{revision}(P, A)$ to be $A \cap P$ when $A \cap P \neq \varnothing$ and $P$ otherwise. For initial belief set $A = \{0\}$ and evidence sets $P = \{1, 2\},\; Q = \{0, 1\}$, single and composed revisions satisfy

   $$
   \operatorname{revision}(P, A) = P,\quad \operatorname{revision}(Q, A) = A,\quad \operatorname{revision}(Q, \operatorname{revision}(P, A)) = \{1\},\quad \operatorname{revision}(P, \operatorname{revision}(Q, A)) = P = \{1, 2\},
   $$

   and therefore fail to commute: $\operatorname{revision}(Q, \operatorname{revision}(P, A)) \neq \operatorname{revision}(P, \operatorname{revision}(Q, A))$;
2. **Unit Orthogonal Escape Vector and Unit Residual Operator Norm** ([`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)): Let $\mathbb{K}$ satisfy `[RCLike 𝕜]`, let $V$ be a complete inner-product space over $\mathbb{K}$, and let $S \le V$ be a closed submodule (`[IsClosed (S : Set V)]`) with nontrivial orthogonal complement $S^\perp \neq \bot$. Then there exists a unit vector $e \in S^\perp$ satisfying

   $$
   \|e\| = 1,\qquad S.\mathrm{starProjection}(e) = 0,\qquad \operatorname{infDist}(e, S) = 1,\qquad \bigl\|\operatorname{id}_{\mathbb{K},V} - S.\mathrm{starProjection}\bigr\| = 1.
   $$
:::

::: proof
Clause 1 evaluates intersection nonemptiness on $\operatorname{Fin} 3$ directly: $\{0\} \cap \{1, 2\} = \varnothing$ resets to $\{1, 2\}$, whose intersection with $\{0, 1\}$ is $\{1\}$, whereas $\{0\} \cap \{0, 1\} = \{0\}$ leaves $\{0\}$, which then resets against $\{1, 2\}$ to $\{1, 2\} \neq \{1\}$. Clause 2 normalizes a nonzero element of $S^\perp \neq \bot$ to obtain $e \in S^\perp$ with $\|e\| = 1$ and $P_S e = 0$; Pythagorean orthogonality $\|e - s\|^2 = 1 + \|s\|^2 \ge 1$ (attained at $s = 0$) gives $\operatorname{infDist}(e, S) = 1$, and $\|\operatorname{id} - P_S\| \le 1$ combined with evaluation at $e$ fixes the operator norm at $1$. The full proof is checked by the Lean kernel.
:::

When two local observer bubbles are promoted to spacelike-separated encoded logical laboratories ($V_A|k\rangle = |k\rangle|F_k\rangle$ coherently binding each system qubit to its local friend record) probed by external superobservers capable of coherent reversal and complementary measurements, whether observed outcomes admit a single observer-independent global truth assignment becomes a sharp polyhedral inequality test. The card below pairs single-qubit orthogonal-bubble updates with the bipartite Genuine Local Friendliness (LF) violation witness, followed immediately by its literature attribution and exact scope:

::: {.viz src="observer-consensus-decoherence" preset="dual-wigner-bubbles" height="500"}
**Dual-Wigner Orthogonal Bubbles and Local Friendliness Card (`dual-wigner-bubbles`)**: Upper subscene contrasts $Z$ and $X$ bubbles (50/50 combined spectrum $(\frac{1}{2}, \frac{1}{2}, 0)$ with no unique global top axis): unread dephasings commute ($[\mathbf{K}_Z, \mathbf{K}_X] = 0$, with an optional $45^\circ$ oblique toggle showing nonzero commutator), while selective $(+, +)$ updates diverge to $|+X\rangle$ vs. $|+Z\rangle$ (paired with the three-world set-revision inset of [@thm-ch33-consensus-revision-and-escape], Clause 1); lower subscene displays the rotated two-lab LF witness ($A_1 = Z,\; B_1' = X$), reaching $F_{\mathrm{LF}} = \sqrt{5} + 3 + \sqrt{2 + \sqrt{2}} \approx 7.0838 > 6$ at visibility $v = 1$ and crossing the LF bound $6$ at $v_{\mathrm{crit}} \approx 0.8470$.
:::

::: {.remark #rem-ch33-quantum-darwinism-local-friendliness-literature title="Einselection, Quantum Darwinism, and Extended Wigner's-Friend Local Friendliness Theorems (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Three foundational quantum-foundations results referenced in this section belong to external physics literature and are not formalized in `trureturing@dev`:

1. **Environment-Induced Superselection (Einselection) and Quantum Darwinism (W. H. Zurek, *Phys. Rev. D* **24**, 1516, 1981; *Rev. Mod. Phys.* **75**, 715, 2003; *Nature Physics* **5**, 181–188, 2009; R. Blume-Kohout & W. H. Zurek, *Found. Phys.* **35**, 1857–1876, 2005)**: Zurek and collaborators showed that environmental monitoring dynamically stabilizes pointer states commuting with the coupling and derived in pure many-spin branching models the mutual-information plateau $I(S : \mathcal{F}_m) \approx H(S)$ across interior fractions $0 < m/N < 1$ rising to $2H(S)$ at $m = N$. As noted above, this closed-form plateau requires aligned pure product records and characterizes redundant classical record correlations rather than non-unitary single-outcome collapse;
2. **Extended Wigner's-Friend No-Go Arguments (Č. Brukner, *Entropy* **20**, 350, 2018; D. Frauchiger & R. Renner, *Nat. Commun.* **9**, 3711, 2018)**: Combining Wigner's-friend laboratories with bipartite entanglement shows that universal unitary quantum evolution applied to encapsulated observers precludes stitching internal friend records and external superobserver measurements into one context-independent global joint distribution;
3. **Genuine Local Friendliness (LF) Polytope Inequality and Quantum Violation (K.-W. Bong et al., *Nature Physics* **16**, 1199–1205, 2020)**: Under **Absoluteness of Observed Events (AOE)**, **Locality** (parameter independence), and **No-Superdeterminism**—strictly weaker than Bell local predetermination—the binary three-setting correlation polytope ($x, y \in \{1, 2, 3\}$, $a, b \in \{-1, +1\}$, setting $1$ reading each friend's record; $96$ vertices, strictly larger than the Bell local polytope) obeys the genuine LF facet bound

   $$
   F_{\mathrm{LF}} \;:=\; -a_1 - a_2 - b_1 - b_2 - E_{11} - 2E_{12} - 2E_{21} + 2E_{22} - E_{23} - E_{32} - E_{33} \;\le\; 6,
   $$

   where $a_x = \langle A_x\rangle,\; b_y = \langle B_y\rangle,\; E_{xy} = \langle A_x B_y\rangle$. In the ideal coherently controlled two-qubit logical-lab model on $|\Phi^+\rangle$ with $XZ$-plane unit Pauli observables $A_1 = Z,\, A_2 = X,\, A_3 = (X+Z)/\sqrt{2}$ and $B_1 = -(Z+2X)/\sqrt{5},\, B_2 = -[(2+\frac{1}{\sqrt{2}})Z + (-2+\frac{1}{\sqrt{2}})X]/3,\, B_3 = -[\frac{1}{\sqrt{2}}Z + (1+\frac{1}{\sqrt{2}})X]/\sqrt{2+\sqrt{2}}$ (simultaneously rotating Bob's state and observables by $\theta = \operatorname{atan2}(-1, -2)$ about $Y$ sets $A_1 = Z,\, B_1' = X$ while preserving all correlations), local means vanish and the exact quantum witness attains

   $$
   F_{\mathrm{LF}} \;=\; \|A_1 + 2A_2\| + \|2A_1 - 2A_2 + A_3\| + \|A_2 + A_3\| \;=\; \sqrt{5} + 3 + \sqrt{2 + \sqrt{2}} \;\approx\; 7.083827 \;>\; 6;
   $$

   under white noise $\rho_v = v|\psi'\rangle\langle\psi'| + (1 - v)\frac{1}{4}I_4$ ($0 \le v \le 1$), $F_{\mathrm{LF}}(v) = v F_{\mathrm{LF}}(1)$ violates the bound whenever $v > v_{\mathrm{crit}} = 6 / (\sqrt{5} + 3 + \sqrt{2 + \sqrt{2}}) \approx 0.8470$. Photonic experiments confirm this logical two-qubit violation, whereas extrapolating to macroscopic human observers requires stipulated ideal coherent isolation and reversal control.
:::

Finally, what if an existing community's consensus is confined to a rank-$2$ plane $S = \operatorname{span}(\mathbf{e}_1, \mathbf{e}_2) \subset \mathbb{R}^3$—for example $\mathbf{M}_0 = \operatorname{diag}(a, b, 0)$ with $a, b > 0,\; a + b = 1$ (note $\operatorname{Tr}(\mathbf{M}_0) = 1$, distinct from the trace-$2$ subspace projector $P_S = \operatorname{diag}(1, 1, 0)$)? Does consensus trap observation inside that flat plane forever? By Clause 3 of [@thm-ch33-consensus-quadratic-and-gram] and Clause 2 of [@thm-ch33-consensus-revision-and-escape], because $S^\perp = \operatorname{span}(\mathbf{e}_3) \neq \bot$, a **pioneer observer** tilting out of the plane along $\mathbf{n}(\beta) = \cos\beta\,\mathbf{e}_1 + \sin\beta\,\mathbf{e}_3$ ($\beta \in [0, \frac{\pi}{2}]$) carries exact orthogonal escape residual $\|(I_3 - P_S)\mathbf{n}(\beta)\| = |\sin\beta|$! Assigning pioneer weight $\eta \in (0, 1)$ and rescaling the existing community by $1 - \eta$ yields

$$
\mathbf{M}_\eta \;=\; (1 - \eta)\mathbf{M}_0 + \eta\,\mathbf{n}(\beta)\mathbf{n}(\beta)^{\mathsf{T}}, \qquad \det \mathbf{M}_\eta \;=\; (1 - \eta)^2 a b \eta \sin^2\beta,
$$

which satisfies $\det\mathbf{M}_\eta > 0$ for all $0 < \eta < 1$ and $\sin\beta \neq 0$ (at default $a = 0.7, b = 0.3, \eta = 0.15, \beta = \frac{\pi}{4}$: residual $1/\sqrt{2}$, spectrum $(0.6793, 0.2550, 0.0657)$, and $\det\mathbf{M}_\eta \approx 0.01138 > 0$), expanding the represented consensus span from rank $2$ to rank $3$! One crucial dynamical boundary must be stated plainly: under the **old** generator $G_0 = I_3 - \mathbf{M}_0 = \operatorname{diag}(1-a, 1-b, 1)$, the unrecorded $\mathbf{e}_3$ mode has eigenvalue $1$ and damps at the **fastest** rate $e^{-t}$—**$\ker\mathbf{M}_0$ is *not* a decoherence-free subspace; unendorsed directions are washed out fastest by the incumbent consensus, and only sustained positive pioneer weight $\eta > 0$ stabilizes the third rank inside the ambient $3$-space (here $D \to D + 1$ denotes represented-span enlargement, while literal physical Hilbert-space creation remains a `MODEL` / `OPEN` frontier)**:

::: {.viz src="observer-consensus-decoherence" preset="new-axis-pioneers" height="500"}
**Orthogonal Pioneer Escape and Rank-Enlargement Card (`new-axis-pioneers`)**: Incumbent consensus lies in the $xy$ plane $\mathbf{M}_0 = \operatorname{diag}(0.7, 0.3, 0)$ (shown separately from the geometric projector $P_S = \operatorname{diag}(1, 1, 0)$). Tilting a weight-$\eta = 0.15$ pioneer axis $\mathbf{n}(\beta) = \cos\beta\,\mathbf{x} + \sin\beta\,\mathbf{z}$ lifts a magenta orthogonal residual of norm $\sin\beta$ ([@thm-ch33-consensus-revision-and-escape], Clause 2), opening $\lambda_3 \approx 0.0657 > 0$ (rank $2 \to 3$) at $\beta = \frac{\pi}{4}$ while a dedicated damping cue shows that under $G_0$ the unrecorded $z$ component decays fastest as $e^{-t}$ rather than enjoying decoherence-free protection.
:::

We consolidate the contrast between pre-posited absolute objectivity and multi-observer consensus decoherence in the five-row comparison box below:

::: {.remark #rem-ch33-consensus-vs-absolute-objectivity title="Five-Way Comparison: Pre-Posited Absolute Objectivity vs. Multi-Observer Consensus Decoherence and Distributed Consensus Analogy"}
**Model Synthesis and Three-Tier Warrant Boundary (`MODEL` / `LEAN ✓` / `Literature`).** In the table below, common-phase quadratic Hermitian locking, Gram factorization, complement projections, qubit pinching Pythagoras, full-pinching relative-entropy production, unread fixed points, parameterized oblique-axis contraction commutators, surviving-copy blocking, reduced access defect, partition-topology kernels, conflict-reset noncommutativity, and orthogonal escape rest on [@thm-ch33-consensus-quadratic-and-gram], [@thm-ch33-consensus-pinching-and-fixed-points], [@thm-ch33-consensus-redundant-records-and-kernel], [@thm-ch33-axis-contraction-commutator], and [@thm-ch33-consensus-revision-and-escape] (`LEAN ✓`); Quantum Darwinism and the Genuine Local Friendliness bound follow [@rem-ch33-quantum-darwinism-local-friendliness-literature] (`Literature`); and the analogy to distributed fault-tolerant ledgers (cf. L. Lamport, R. Shostak & M. Pease, *ACM Trans. Program. Lang. Syst.* **4**, 382–401, 1982 Byzantine quorum consensus—shared classical history stabilized by redundant honest majorities without an external master clock, while noting that quantum consensus acts via positive-semidefinite dyadic contraction $\mathbf{M}_{\mathrm{cons}}$ and entangled branching rather than classical signed message voting) belongs explicitly to our interpretive `MODEL`:

| Dimension | Pre-Posited Absolute Objectivity (Hidden Point $C$) | Multi-Observer Consensus Decoherence (Formal–Geometric Synthesis) |
| :--- | :--- | :--- |
| **1. Origin of Pointer Basis** | Assumes nature pre-installs an observer-independent privileged classical basis prior to interaction | The Bloch sphere is democratic; a pointer line emerges endogenously from $\mathbf{M}_{\mathrm{cons}} = \sum_j w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ iff $\Delta\lambda > 0$, vanishing in isotropic fog $\frac{1}{3}I_3$ or planar top-degeneracy (`manual derivation` / `MODEL`) |
| **2. Sign & Phase Gauge** | Confuses vector averages $\sum w_j\mathbf{n}_j$ with collective axes, or conflates axis relabeling with state identity | Unoriented sign flips $(-\mathbf{n}_j)(-\mathbf{n}_j)^{\mathsf{T}} = \mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ leave $\mathbf{M}_{\mathrm{cons}}$ invariant (without identifying orthogonal antipodal states), while common ket-phase invariance locks quadratic Hermitian & Gram forms ([@thm-ch33-consensus-quadratic-and-gram]) |
| **3. Decoherence Dynamics** | Treats decoherence as an opaque one-way sink and blurs finite schedules with continuum limits | Single-step Pauli dephasing fixes $\mathbf{n}$ and scales transverse axes by $\cos\alpha$, keeping ordered products, ensemble means $\overline{\mathbf{K}}$, and weak-limit generator $I_3 - \mathbf{M}_{\mathrm{cons}}$ distinct while full pinching obeys Pythagorean & relative-entropy identities ([@thm-ch33-consensus-pinching-and-fixed-points]) |
| **4. Macroscopic Objectivity** | Equates classical facts with observer-free absolutes and local irreversibility with global destruction | Pure aligned branching yields the interior redundancy plateau $I(S:\mathcal{O}_m) \approx H_2(p_0)$; local irreversibility reflects uncontrolled surviving copies and reduced access defects, while shared ledgers track readout kernels & invariant common factors ([@thm-ch33-consensus-redundant-records-and-kernel], [@thm-ch33-contextual-attractor-and-common-factor]) |
| **5. Split Bubbles & Pioneers** | Assumes all local records fit one global truth table and unrecorded directions cannot enter | Orthogonal $Z/X$ unread channels commute, whereas nonparallel nonorthogonal axes have a nonzero unread commutator when both contractions are nonidentity; selective updates & conflict revisions do not commute, two encoded labs violate Genuine LF at $F_{\mathrm{LF}} \approx 7.0838 > 6$, and out-of-plane pioneers enlarge span rank $2 \to 3$ despite $e^{-t}$ old-generator damping ([@thm-ch33-axis-contraction-commutator], [@thm-ch33-consensus-revision-and-escape], [@rem-ch33-quantum-darwinism-local-friendliness-literature]) |
:::

Step into the full interactive laboratory `ORTHO//CONSENSUS` below to switch freely across all six presets on one unified 3D Bloch/consensus ellipsoid, fragment-arc, and two-lab correlation stage, sweeping axis distributions, dephasing angles, fragment sizes, white-noise visibility, and pioneer tilt:

::: {.viz src="observer-consensus-decoherence" height="640"}
**Interactive Laboratory `ORTHO//CONSENSUS`**: Multi-observer consensus tensor, emergent pointer basis, and no observer-independent facts sandtable. Unites `isotropic-fog` (six-axis $\mathbf{M}_{\mathrm{cons}}=\frac{1}{3}I_3$ isotropic contraction with `pointerAxis = null`), `axis-consensus` (collinear longitudinal survival $\Gamma_\parallel=1$, transverse $(\cos\alpha)^k$ decay, and $\alpha=\pi/2$ full pinching), `phase-gauge` (sign-flip dyad invariance alongside common ket-phase quadratic Hermitian data), `darwinism-plateau` ($N=16$ pure branching mutual-information plateau, controlled-$U_j^\dagger$ access residual, and four-stage phase certificate), `dual-wigner-bubbles` (commuting unread $Z/X$ channels, an oblique-axis commutator toggle, selective branching, set-revision noncommutativity, and Genuine Local Friendliness violation $F_{\mathrm{LF}} \approx 7.0838 > 6$), and `new-axis-pioneers` (out-of-plane residual $\sin\beta$ rank enlargement $2 \to 3$ vs. fastest $e^{-t}$ old-generator damping). The green boxes cover the twelve frozen declarations already represented in this lab; the section cites fifteen frozen declarations in total. Quantum Darwinism, LF bounds, numerical curves, and distributed-consensus analogies carry explicit literature, numerical, and model labels.
:::

Yet once the universe excises the external reference point $C$ so that all beings measure one another as mobile attractors and select local pointer axes through multi-observer consensus, an urgent geometric question immediately arises: **on a featureless unit sphere with no privileged origin, how does an observer ever determine *where* it stands? Why does a single inner-product reading leave an entire equatorial circle of degeneracy, and why is it specifically the degeneracy and breaking of *orthogonality ($90^\circ$)* that pins down an observer's unique address?** That is the door we open in [Chapter 34](ch34-orthogonality-degeneracy-and-observer-position.md).
