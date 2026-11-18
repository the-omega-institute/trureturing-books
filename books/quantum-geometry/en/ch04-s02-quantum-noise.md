# 4.2 Understanding Quantum Noise Geometrically Without Memorizing Kraus Operators {#sec-ch04-2}

Once we see how the partial trace shortens the local Bloch vector in this example, the operator-sum formulas of standard textbook noise models turn completely transparent. Without memorizing a single abstract matrix, each of the benchmark single-qubit noise models analyzed below (pinching, phase damping, amplitude damping, and depolarizing noise) acts geometrically by **compressing or shifting the Bloch ball**!

Start with complete transverse dephasing — **standard-basis pinching** $\mathcal{P}(\rho)$ ([`pinching`](lean:D5/S3/QuantumChannels/Pinching.pinching) in Lean, preserving diagonal entries $\rho_{00}, \rho_{11}$ and zeroing off-diagonal entries $\rho_{01}, \rho_{10}$). Under the Hilbert–Schmidt inner product ([`hilbertSchmidtInner`](lean:D5/S3/QuantumChannels/Pinching.hilbertSchmidtInner) $\langle A, B\rangle_{\mathrm{HS}} = \Tr(A^* B)$), pinching is an exact orthogonal projection flattening the Bloch sphere onto its vertical diameter $[-\vv{e}_3, +\vv{e}_3]$, and the discarded equatorial mass equals the sum of squared moduli of the two off-diagonal entries!

::: {.viz src="bloch-noise" preset="pinch" height="500"}
**Squashed onto the axis.** One step of complete dephasing: the cyan ball is squashed into a vertical line, and the violet dashes mark the whole axis as fixed. $\rho$ and $\sigma$ have the same height and differ only sideways, so they land on the same point of the axis and the white line shrinks to nothing; the two magenta segments are the sideways parts of the two starting points that are squashed away, and they carry the coherence mass, which the top left reads off for $\rho$ as it drops from $0.375$ to $0$ ([@thm-pinching-pythagorean]).
:::

::: {.theorem #thm-pinching-pythagorean title="Hilbert–Schmidt Pythagorean Split and Discarded Coherence Mass of Qubit Pinching" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass"}
For every qubit matrix $\rho \in M_2(\mathbb{C})$, writing $\mathcal{P}(\rho)_{ij} = \delta_{ij}\rho_{ij}$ for standard-basis pinching and $\langle A, B\rangle_{\mathrm{HS}} = \Tr(A^* B)$ for the Hilbert–Schmidt inner product:

1. **Orthogonal Pythagorean decomposition**:

   $$
   \langle \rho, \rho\rangle_{\mathrm{HS}} = \langle \mathcal{P}(\rho), \mathcal{P}(\rho)\rangle_{\mathrm{HS}} + \langle \rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}};
   $$

2. **Explicit discarded coherence mass**:

   $$
   \langle \rho - \mathcal{P}(\rho),\, \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = |\rho_{01}|^2 + |\rho_{10}|^2.
   $$

:::

::: proof
Split $\rho = \mathcal{P}(\rho) + D$ with purely off-diagonal residual $D = \rho - \mathcal{P}(\rho)$. Because $\mathcal{P}$ is Hilbert–Schmidt self-adjoint ($\langle \mathcal{P}(A), B\rangle_{\mathrm{HS}} = \langle A, \mathcal{P}(B)\rangle_{\mathrm{HS}}$) and $\mathcal{P}(D) = 0$, both cross-terms $\langle \mathcal{P}(\rho), D\rangle_{\mathrm{HS}} = \langle \rho, \mathcal{P}(D)\rangle_{\mathrm{HS}} = 0$ and $\langle D, \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = 0$ vanish, yielding the Pythagorean identity upon expanding $\langle \mathcal{P}(\rho) + D,\, \mathcal{P}(\rho) + D\rangle_{\mathrm{HS}}$ (claim 1). Substituting $D = \bigl(\begin{smallmatrix} 0 & \rho_{01} \\ \rho_{10} & 0 \end{smallmatrix}\bigr)$ into $\Tr(D^* D)$ sums its two diagonal entries $|\rho_{10}|^2$ and $|\rho_{01}|^2$ to $|\rho_{01}|^2 + |\rho_{10}|^2$ (claim 2). The full proof is checked by the Lean kernel.
:::

In continuous laboratory time, nature rarely crushes the sphere flat in a single blow; instead, repeated weak collisions in the strictly noisy regime multiply the equatorial waist by a retention factor $c \in [0, 1)$ at each step (with $c = 1$ being the noiseless identity endpoint). That is **phase damping** ($T_2$ transverse relaxation): whenever $c \in [0, 1)$, every vertical height $r_z$ stays frozen while the equatorial radius $(r_x, r_y)$ contracts strictly as $c^N$, squeezing the sphere into a prolate cigar that converges onto the north–south axis as $N \to \infty$!

::: {.viz src="bloch-noise" preset="dephase" height="500"}
**The waist goes, the height stays.** Each step multiplies the sideways part by $c = 0.7$ and keeps the height: the cyan ball pinches into an upright cigar and thins towards the violet axis, while $\rho$ and $\sigma$ move horizontally towards it. The rail below counts the steps $N$ ([@prop-phase-damping-decay]).
:::

::: {.proposition #prop-phase-damping-decay title="Iterated Phase-Damping Entries and Exponential Decay of Equatorial Coherence" lean="D5/S3/Quantum/QubitWitnesses.phaseDampingIterate_apply D5/S3/Quantum/Decoherence/CoherenceDecay.equal_superposition_coherence_tendsto_zero"}
Let $c \in [0, 1]$ be a real coherence-retention coefficient, and let $\mathcal{D}_c^{(N)}$ denote the $N$-fold iterate ($N \in \mathbb{N}$) of the single-step phase-damping map that preserves diagonal entries and scales off-diagonal entries by $c$. Then:

1. For every qubit matrix $\rho \in M_2(\mathbb{C})$ and indices $i, j \in \{0, 1\}$,

   $$
   \bigl(\mathcal{D}_c^{(N)}(\rho)\bigr)_{i, j} = \begin{cases} \rho_{i, j}, & i = j, \\ c^N \rho_{i, j}, & i \neq j; \end{cases}
   $$

2. Whenever $c < 1$, for the equal-superposition density matrix $\rho_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$, the off-diagonal coherence converges to zero as $N \to \infty$:

   $$
   \lim_{N \to \infty} \bigl(\mathcal{D}_c^{(N)}(\rho_+)\bigr)_{0, 1} = 0.
   $$

:::

::: proof
Claim 1 follows by induction on $N$: $N = 0$ is the identity ($c^0 = 1$), and step $N \to N + 1$ leaves diagonal entries $i = j$ untouched while multiplying off-diagonal entries $i \neq j$ by one more factor of $c$ to give $c^{N+1}\rho_{ij}$. For claim 2, evaluating claim 1 on $\rho_+$ at $(0, 1)$ gives $\frac{1}{2}c^N$; since $0 \le c < 1$, $|c| < 1$ implies $c^N \to 0$ as $N \to \infty$, and scaling by $\frac{1}{2}$ preserves convergence to $0$. The full proof is checked by the Lean kernel.
:::

In [@prop-phase-damping-decay], the north–south computational basis serves as the decoherence-free pointer axis because `phaseDamping` preserves diagonal entries directly in computational coordinates. If phase damping acts instead in Fourier (Hadamard) coordinates, the fixed-point spine rotates onto the equatorial axis. To state this change of frame precisely on `QubitMatrix := Matrix (Fin 2) (Fin 2) ℂ` with closed-interval damping parameter `DampingCoefficient := Set.Icc (0 : ℝ) 1` ($c \in [0, 1]$), recall that $(\operatorname{phaseDamping}(c,\rho))_{ij}$ equals $\rho_{ij}$ for $i = j$ and $c\,\rho_{ij}$ for $i \neq j$, and for any coordinate equivalence `coordinates : QubitMatrix ≃ QubitMatrix` define $\operatorname{phaseDampingInBasis}(\mathrm{coordinates}, c, \rho) := \mathrm{coordinates}^{-1}\bigl(\operatorname{phaseDamping}(c, \mathrm{coordinates}(\rho))\bigr)$. Taking the self-inverse Hadamard coordinate map

$$
\operatorname{hadamardCoordinates}(\rho) := \begin{pmatrix} \dfrac{\rho_{00} + \rho_{01} + \rho_{10} + \rho_{11}}{2} & \dfrac{\rho_{00} - \rho_{01} + \rho_{10} - \rho_{11}}{2} \\[6pt] \dfrac{\rho_{00} + \rho_{01} - \rho_{10} - \rho_{11}}{2} & \dfrac{\rho_{00} - \rho_{01} - \rho_{10} + \rho_{11}}{2} \end{pmatrix},
$$

whose forward and inverse maps coincide (forming the involutive equivalence `hadamardCoordinateEquiv`), we set $\operatorname{fourierPhaseDamping}(c, \rho) := \operatorname{phaseDampingInBasis}(\mathrm{hadamardCoordinateEquiv}, c, \rho)$. A quick hand check at the complete-dephasing endpoint $c = 0$ contrasts the two axes: for the equatorial state $\rho_+ = \lvert +\rangle\langle +\rvert = \frac{1}{2}\bigl(\begin{smallmatrix} 1 & 1 \\ 1 & 1 \end{smallmatrix}\bigr)$, $\operatorname{hadamardCoordinates}(\rho_+) = \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & 0 \end{smallmatrix}\bigr)$ already has zero off-diagonal entries, is fixed by $\operatorname{phaseDamping}(0, \cdot)$, and transforms back to $\rho_+$; by contrast, for the north-pole state $\rho_0 = \lvert 0\rangle\langle 0\rvert = \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & 0 \end{smallmatrix}\bigr)$, $\operatorname{hadamardCoordinates}(\rho_0) = \frac{1}{2}\bigl(\begin{smallmatrix} 1 & 1 \\ 1 & 1 \end{smallmatrix}\bigr)$ loses its off-diagonals at $c = 0$ to become $\frac{1}{2}I_2$, which transforms back to the maximally mixed center $\frac{1}{2}I_2 \neq \rho_0$. The theorem below extends this fixed-point characterization to every nontrivial damping coefficient $c \neq 1$.

::: {.theorem #thm-fourier-pointer-fixed title="Fixed Points of Fourier Pointer-Basis Damping" lean="D5/S3/Quantum/PointerBasis.fourier_phase_damping_fixed_iff"}
Let $c \in [0, 1]$ (`c : DampingCoefficient`) satisfy $(c : \mathbb{R}) \neq 1$, and let $\rho \in M_2(\mathbb{C})$ (`rho : QubitMatrix`). Then $\rho$ is a fixed point of Fourier phase damping if and only if every off-diagonal entry of its Hadamard coordinate matrix vanishes:

$$
\operatorname{fourierPhaseDamping}(c, \rho) = \rho \iff \forall i, j \in \mathrm{Fin}\,2,\; i \neq j \implies \operatorname{hadamardCoordinates}(\rho)_{i,j} = 0.
$$
:::

::: proof
Unfolding `fourierPhaseDamping` and applying the bijection `hadamardCoordinateEquiv` to both sides reduces $\operatorname{fourierPhaseDamping}(c, \rho) = \rho$ to the matrix equality $\operatorname{phaseDamping}(c, \operatorname{hadamardCoordinates}(\rho)) = \operatorname{hadamardCoordinates}(\rho)$. Checking entries on `Fin 2`, the diagonal positions $i = j$ hold automatically, while for $i \neq j$ the equality reads $c \cdot \operatorname{hadamardCoordinates}(\rho)_{i,j} = \operatorname{hadamardCoordinates}(\rho)_{i,j}$, or equivalently $(c - 1)\operatorname{hadamardCoordinates}(\rho)_{i,j} = 0$. Because $(c : \mathbb{R}) \neq 1$ ensures $c - 1 \neq 0$ in $\mathbb{C}$, cancellation in $\mathbb{C}$ shows that this holds for all $i \neq j$ if and only if $\operatorname{hadamardCoordinates}(\rho)_{i,j} = 0$. The full proof is checked by the Lean kernel.
:::

Two scope boundaries deserve emphasis. First, the hypothesis $(c : \mathbb{R}) \neq 1$ is indispensable: at the noiseless endpoint $c = 1$, $\operatorname{fourierPhaseDamping}(1, \cdot)$ is the identity on all of $M_2(\mathbb{C})$ and fixes matrices such as $\lvert 0\rangle\langle 0\rvert$ whose off-diagonal Hadamard coordinates are nonzero. Second, although `hadamardCoordinates` agrees with unitary Hadamard conjugation $H\rho H$ on $M_2(\mathbb{C})$, the general combinator `phaseDampingInBasis` accepts an arbitrary bijection `QubitMatrix ≃ QubitMatrix` (not necessarily a physical unitary channel), and this theorem characterizes the fixed-point subspace of the Fourier phase-damping model rather than declaring $\{\lvert +\rangle, \lvert -\rangle\}$ a universal pointer basis for arbitrary physical environments.

The qubit formula above compresses the environment's action into one real number $c$. What if the system has many branches and complex phases enter the overlaps? Attach a unit environment vector $E_i$ to each system address $i$. After the controlled recording map $V\lvert i\rangle=\lvert i\rangle\otimes\lvert E_i\rangle$, tracing out the environment multiplies entry $(i,j)$ by $G_{ij}=\sum_a E_i(a)\overline{E_j(a)}$, the entry formula of [`environment_marginal_channel`](lean:D5/S3/Quantum/Decoherence/EnvironmentMarginalChannel.environment_marginal_channel). Exact orthogonality can therefore be relaxed to a sufficient condition with a quantitative error bound.

::: {.theorem #thm-repeated-record-decay title="Exponential Error Bound for Repeated Finite Records and Record-Class Pinching" lean="D5/S3/Quantum/Decoherence/RepeatedRecordExponentialDecay.repeated_record_exponential_decay"}
Let $d,e\in\mathbb{N}$ and $E:\mathrm{Fin}\,d\to\mathrm{Fin}\,e\to\mathbb{C}$, with $\sum_a |E_i(a)|^2=1$ for every system address $i$. Define

$$
G_{ij}=\sum_a E_i(a)\overline{E_j(a)},\qquad
\Phi_E(\rho)_{ij}=G_{ij}\rho_{ij}.
$$

Given $q\in[0,1)$, assume that $|G_{ij}|\le q$ whenever $E_i\ne E_j$. For each $v\in\operatorname{range} E$, define the diagonal projector

$$
\begin{aligned}
(P_v)_{ij}&=\begin{cases}1,&i=j\text{ and }E_i=v,\\0,&\text{otherwise},\end{cases}\\
\Pi_E(\rho)&=\sum_{v\in\operatorname{range}E}P_v\rho P_v.
\end{aligned}
$$

Then for every $N\in\mathbb{N}$, $\rho\in M_d(\mathbb{C})$ and $i,j\in\mathrm{Fin}\,d$, all three statements hold:

$$
\begin{aligned}
\bigl(\Phi_E^N(\rho)\bigr)_{ij}&=G_{ij}^N\rho_{ij},\\
\Pi_E(\rho)_{ij}&=\begin{cases}\rho_{ij},&E_i=E_j,\\0,&E_i\ne E_j,\end{cases}\\
\|\Phi_E^N(\rho)-\Pi_E(\rho)\|_{\mathrm F}
&\le q^N\|\rho-\Pi_E(\rho)\|_{\mathrm F},
\end{aligned}
$$

Here $\|A\|_{\mathrm F}=(\sum_{i,j}|A_{ij}|^2)^{1/2}$ is the Frobenius, or Hilbert–Schmidt, norm, and $\Phi_E^0$ is the identity map.
:::

::: proof
Each application multiplies entry $(i,j)$ by $G_{ij}$ again, so induction gives the first identity. Multiplication on both sides by the diagonal projector $P_v$ retains precisely rows and columns carrying record $v$; summing gives the second identity. Equal normalized records have $G_{ij}=1$, so their error vanishes. Across different classes, the error is $G_{ij}^N\rho_{ij}$, whose magnitude is at most $q^N|\rho_{ij}|$. Square these bounds, sum over entries and take the square root to obtain the third statement. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-nonorthogonal-record-decay title="A Little Separation Each Time: How Much Error Remains after Ten Steps?"}
Take the nonorthogonal unit records $E_0=(1,0)$ and $E_1=(1/2,\sqrt{3}/2)$. Then $G_{01}=G_{10}=1/2$, so $q=1/2$ is admissible. The records are distinct, their classes are singletons, and $\Pi_E$ is computational-basis pinching. Substituting the equatorial state $\rho_+=\frac12\bigl(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\bigr)$ gives

$$
\Phi_E^N(\rho_+)=\frac12\begin{pmatrix}1&2^{-N}\\2^{-N}&1\end{pmatrix},\qquad
\|\Phi_E^N(\rho_+)-\Pi_E(\rho_+)\|_{\mathrm F}=\frac{2^{-N}}{\sqrt2}.
$$

After ten steps the error relative to the initial off-diagonal residual is $1/1024$. No finite step has been called exact erasure: this is the coherence residual of the specified model.
:::

Classes here mean **identical record vectors**. Coherence within a class survives; the limit is complete dephasing of individual basis addresses only when all classes are singletons. If $E_1=-E_0$, the vectors are distinct but $|G_{01}|=1$, violating the strict overlap bound: the channel changes phase without reducing this coherence's magnitude. Distinct vectors alone do not establish distinguishable environment records.

::: {.remark #rem-ray-record-orbit title="Ray-Representative Reduction and Rotating Coherent Blocks (Application Derivation)"}
Grouping instead by the **unit rays of the environment records** folds the global-phase redundancy above directly into an application derivation from [@thm-repeated-record-decay], while keeping the original channel $\Phi_E$ rather than replacing $E_i$ by vectorized density matrices $\lvert E_i\rangle\langle E_i\rvert$ (which would replace the Gram entries $G_{ij}$ by $|G_{ij}|^2$ and alter the channel).

Let $d,e\in\mathbb{N}$ be arbitrary natural numbers, and let $E:\mathrm{Fin}\,d\to\mathrm{Fin}\,e\to\mathbb{C}$ satisfy $\sum_a |E_i(a)|^2=1$ for each system address $i$, with

$$
G_{E,ij}=\sum_a E_i(a)\overline{E_j(a)},\qquad
\Phi_E(\rho)_{ij}=G_{E,ij}\rho_{ij}.
$$

Define ray equivalence $i\sim j$ if and only if there exists a unit-modulus complex scalar $u\in\mathbb{C}$ ($|u|=1$) carrying $E_j$ to $E_i$ ($E_i=uE_j$), and let the ray-pinching map $P_{\mathrm{ray}}$ retain and only retain same-ray matrix entries:

$$
P_{\mathrm{ray}}(\rho)_{ij}=\begin{cases}\rho_{ij},&i\sim j,\\0,&i\not\sim j.\end{cases}
$$

Choose a unit representative $R_c$ for each ray $c$, and set $R_i=R_{c(i)}$ for each system address $i\in\mathrm{Fin}\,d$ (representative records remain indexed by system addresses, and every entry in row $i$ uses the same representative), so that $E_i=u_i R_{c(i)}$ with $|u_i|=1$. In a finite-dimensional complex inner-product space, the equality criterion of the Cauchy–Schwarz inequality $|G_{R,ij}|\le\|R_i\|_2\|R_j\|_2=1$ shows that two unit vectors attain the upper bound on inner-product modulus if and only if they lie on the same ray ($i\sim j$); hence representatives of distinct rays ($i\not\sim j$, equivalently $R_i\ne R_j$) have overlap modulus $|G_{E,ij}|=|G_{R,ij}|<1$. Because there are only finitely many cross-ray index pairs $(i,j)$, their overlap moduli admit a uniform bound $q\in[0,1)$ (with $q=0$ when no cross-ray pairs exist). This $q$ is determined by the record family $E$ and holds uniformly across all $i,j$, all step counts $N\in\mathbb{N}$, and all system matrices $\rho$; no uniform positive gap across all record families is claimed.

Expanding the inner product gives $G_{E,ij}=u_i\overline{u_j}G_{R,ij}$. Setting $U=\operatorname{diag}(u_i)$, the $N$-fold iterate of the original channel is related to the representative channel for all $N\in\mathbb{N}$ and every complex system matrix $\rho\in M_d(\mathbb{C})$ by

$$
\Phi_E^N(\rho)=U^N\Phi_R^N(\rho)(U^N)^*.
$$

The vector-equality classes $R_i=R_j$ of the representative records $R$ are precisely the ray classes $i\sim j$, so $\Pi_R$ coincides with $P_{\mathrm{ray}}$ and $|G_{R,ij}|\le q<1$ whenever $R_i\ne R_j$. Applying [@thm-repeated-record-decay] to $R$ and using the Frobenius-norm invariance of unitary diagonal conjugation yields, for every natural number $N\in\mathbb{N}$ and every complex system matrix $\rho\in M_d(\mathbb{C})$ (with no extra density-matrix, positivity, unit-trace, or nonemptiness hypotheses):

$$
\bigl\|\Phi_E^N(\rho)-U^N P_{\mathrm{ray}}(\rho)(U^N)^*\bigr\|_{\mathrm F}
\le q^N\bigl\|\rho-P_{\mathrm{ray}}(\rho)\bigr\|_{\mathrm F}.
$$

The asymptotic comparison object under ray grouping is therefore the **rotating coherent-block orbit** $U^N P_{\mathrm{ray}}(\rho)(U^N)^*$, not static full diagonalization. On the same ray ($i\sim j$), $G_{E,ij}=u_i\overline{u_j}$, so after $N$ steps the coherence magnitude $|\rho_{ij}|$ is preserved while the conditional phase continues to rotate. These conditional phases are fixed by the actual controlled coupling or phase calibration; knowing only the density matrices $\lvert E_i\rangle\langle E_i\rvert$ of the individual environment records cannot determine them. The persistence of rotating components in quantum-channel asymptotics is not a new physical finding (literature result, not formalized in this book: see Victor V. Albert, *Asymptotics of quantum channels: conserved quantities, an adiabatic limit, and matrix product states*, Quantum **3**, 151 (2019), DOI [10.22331/q-2019-06-06-151](https://doi.org/10.22331/q-2019-06-06-151), Section 2 on rotating points and asymptotic projections; that paper provides general channel background, whereas the finite-record norm bound above is derived directly from [@thm-repeated-record-decay] via the representative construction).
:::

::: {.example #ex-ray-record-rotation title="Three-Record Hand Calculation: Simultaneous Phase Rotation and Cross-Ray Contraction"}
Take $d=3,e=2$ and three unit environment records

$$
E_0=(1,0),\qquad
E_1=(i,0),\qquad
E_2=\left(\frac{3}{5},\frac{4}{5}\right).
$$

Here $E_0$ and $E_1$ differ only by a unit phase, partitioning the addresses into ray classes $\{0,1\}$ and $\{2\}$. Choosing ray representatives $R_0=R_1=(1,0)$ and $R_2=(3/5,4/5)$ gives phases $u=(1,i,1)$ and cross-ray overlap moduli $|G_{02}|=|G_{12}|=3/5$, so we may take $q=3/5$.

Let $\rho\in M_3(\mathbb{C})$ have all $3\times 3$ entries equal to $1/3$; it is the density matrix of the normalized equal-superposition pure state. After $N$ steps:

1. **Unattenuated phase rotation within the shared ray**: Indices $(0,1)$ lie on the same ray with $G_{01}=1\cdot\overline{i}=-i$, so

   $$
   \bigl(\Phi_E^N(\rho)\bigr)_{01}=\frac{(-i)^N}{3},\qquad
   \bigl|\bigl(\Phi_E^N(\rho)\bigr)_{01}\bigr|=\frac{1}{3},
   $$

   while the conjugate entry $(1,0)$ is $i^N/3$, keeping modulus $1/3$ for all $N$.
2. **Contraction as $(3/5)^N$ across distinct rays**: Each of the four cross-ray entries $(0,2),(2,0),(1,2),(2,1)$ has modulus $\frac{1}{3}(3/5)^N$, so the Frobenius error to the rotating coherent block $U^N P_{\mathrm{ray}}(\rho)(U^N)^*$ is

   $$
   \begin{aligned}
   \bigl\|\Phi_E^N(\rho)-U^N P_{\mathrm{ray}}(\rho)(U^N)^*\bigr\|_{\mathrm F}
   &=\sqrt{4\cdot\frac{1}{9}\left(\frac{3}{5}\right)^{2N}} \\
   &=\frac{2}{3}\left(\frac{3}{5}\right)^N.
   \end{aligned}
   $$

   The error is $2/3$ at $N=0$, $2/5$ at $N=1$, and $\frac{2}{3}(3/5)^{10}=0.0040310784$ at $N=10$.
:::

Interpreting $\Phi_E^N$ as successive collisions also requires each step to implement the same reduced channel. One realization uses a fresh, initially uncorrelated environment register and the same recording interaction at every step. Reusing an environment or introducing correlations does not justify $G_{ij}^N$ from a one-step overlap alone. Together these results control the error after relaxing ideal orthogonality: the original vector-grouping theorem [@thm-repeated-record-decay] still assumes the strict overlap bound as a hypothesis, whereas the ray-grouping application in [@rem-ray-record-orbit] derives that bound from finitely many unit records; in both formulations, record normalization, the specified controlled coupling, and the physical applicability of a repeated reduced channel remain model premises requiring independent physical evidence, and the Frobenius norm must be distinguished from trace distance or an experimental discrimination error rate.

::: {.remark #rem-retained-environment-defect title="Retained Environments and the Accumulated Defect Bound (Application Derivation)"}
When the environment is retained rather than discarded and replaced, the actual reduced trajectory can be compared with the reset model without defining the true marginal trajectory as powers of a single channel. Let $\tau_k$ be actual joint density states evolved by a fixed joint unitary $U$ ($\tau_{k+1}=U\tau_k U^*$), $\rho_k=\Tr_{\mathrm{E}}(\tau_k)$ their system marginals, $\eta$ a fixed reference environment density state, and $R(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes\eta)U^*\bigr)$ the single-step reset channel. Write $D(\rho,\sigma)=\frac{1}{2}\|\rho-\sigma\|_1$ for half the trace norm of a state difference (the trace distance of [@def-trace-distance] below), and set $\delta_k=D(\tau_k,\,\rho_k\otimes\eta)$ for the step-$k$ joint factorization defect. The channel-contraction clause of [@prop-trace-distance-metric-contraction] below is stated for channels with identical input and output index types (such as the joint unitary conjugation $X\mapsto UXU^*$ and the same-index system reset channel $R$); for the rectangular partial trace $\Tr_{\mathrm{E}}$ from the joint space to the system, contractivity follows directly as an application derivation outside that frozen box: writing an Hermitian difference in Jordan form $A=P-Q$ with $P,Q$ positive semidefinite and $\operatorname{traceNorm}(A)=\Tr(P)+\Tr(Q)$, positivity and trace preservation of $\Tr_{\mathrm{E}}$ together with the trace-norm triangle inequality and $\operatorname{traceNorm}(B)=\Tr(B)$ for positive $B$ give $\operatorname{traceNorm}(\Tr_{\mathrm{E}}A)\le\operatorname{traceNorm}(\Tr_{\mathrm{E}}P)+\operatorname{traceNorm}(\Tr_{\mathrm{E}}Q)=\Tr(P)+\Tr(Q)=\operatorname{traceNorm}(A)$. Combining invariance of $D$ under tensoring with the fixed density state $\eta$ ($D(\rho\otimes\eta,\sigma\otimes\eta)=D(\rho,\sigma)$), the partial-trace and same-index reset-channel contractions above, and the triangle inequality over $0\le k<N$ gives

$$
\begin{aligned}
D\bigl(\rho_{k+1},\,R(\rho_k)\bigr)&=D\Bigl(\Tr_{\mathrm{E}}(U\tau_k U^*),\,\Tr_{\mathrm{E}}\bigl(U(\rho_k\otimes\eta)U^*\bigr)\Bigr)\le D(\tau_k,\,\rho_k\otimes\eta)=\delta_k,\\
D\bigl(R(\rho_k),\,R^{k+1}(\rho_0)\bigr)&=D\Bigl(\Tr_{\mathrm{E}}\bigl(U(\rho_k\otimes\eta)U^*\bigr),\,\Tr_{\mathrm{E}}\bigl(U(R^k(\rho_0)\otimes\eta)U^*\bigr)\Bigr)\le D\bigl(\rho_k,\,R^k(\rho_0)\bigr),\\
D\bigl(\rho_N,\,R^N(\rho_0)\bigr)&\le\sum_{k=0}^{N-1}\delta_k.
\end{aligned}
$$

Here the reference state $\eta$ may be mixed; this estimate neither defines the true marginal trajectory $\rho_k$ as the reset powers $R^k(\rho_0)$ nor assumes or proves that the defects $\delta_k$ are small.

For a pure reference basis state $\eta=\lvert a\rangle\langle a\rvert$ ($a\in\mathrm{Fin}\,e$), the controlled-record action can be specified by the actual columns $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$ on the reference environment input $a$. If $J$ embeds a system vector at environment coordinate $a$ ($J_{(i,b),\,j}=[j=i][b=a]$) and $W$ is the controlled-record matrix $W_{(i,b),\,j}=[j=i]\,E_i(b)$, these columns give $UJ=W$ and $\rho\otimes\lvert a\rangle\langle a\rvert=J\rho J^*$, so the partial-trace identity `environment_marginal_channel` derives $R(\rho)=\Tr_{\mathrm{E}}(W\rho W^*)=\Phi_E(\rho)$ (namely $\operatorname{recordChannel}(E)$) from the coupling. Furthermore, the $((j,a),(j,a))$ diagonal entry of $U^* U=I$ gives

$$
1=(U^* U)_{(j,a),\,(j,a)}=\sum_{i\in\mathrm{Fin}\,d}\,\sum_{b\in\mathrm{Fin}\,e}\bigl|U_{(i,b),\,(j,a)}\bigr|^2=\sum_{b\in\mathrm{Fin}\,e}|E_j(b)|^2,
$$

so record normalization $\sum_b |E_j(b)|^2=1$ follows from unitarity of these columns rather than entering as an independent hypothesis. Unitarity of $U$ alone, however, does not imply this controlled-record column form: the specified controlled coupling, the pure reference state $\lvert a\rangle\langle a\rvert$, and control of the joint defects $\delta_k$ remain physical model hypotheses. For literal vector-equality classes $E_i=E_j$, [@thm-repeated-record-decay] retains the strict cross-class overlap premise ($|G_{ij}|\le q<1$ whenever $E_i\ne E_j$); if the ray formulation of [@rem-ray-record-orbit] is used instead, the comparison target rotates as $U_{\mathrm{ray}}^N P_{\mathrm{ray}}(\rho_0)(U_{\mathrm{ray}}^N)^*$ (with diagonal address-phase matrix $U_{\mathrm{ray}}=\operatorname{diag}(u_i)$) and its finite unit-record separation bound $q<1$ applies across distinct rays ($i\not\sim j$).

Under the remaining strict cross-class overlap premise, apply [@thm-repeated-record-decay] to $R^N(\rho_0)=\Phi_E^N(\rho_0)$. Since the Frobenius norm is bounded above by the trace norm ($\|M\|_{\mathrm F}\le\|M\|_1$) and $D(\rho,\sigma)=\frac{1}{2}\|\rho-\sigma\|_1$ uses the half-trace-norm convention, converting $D(\rho_N,R^N(\rho_0))$ to Frobenius norm introduces a factor of $2$, so the actual system marginal's Frobenius error relative to record-class pinching $\Pi_E(\rho_0)$ satisfies

$$
\begin{aligned}
\bigl\|\rho_N-R^N(\rho_0)\bigr\|_{\mathrm F}&\le\bigl\|\rho_N-R^N(\rho_0)\bigr\|_1=2\,D\bigl(\rho_N,\,R^N(\rho_0)\bigr)\le 2\sum_{k=0}^{N-1}\delta_k,\\
\bigl\|\rho_N-\Pi_E(\rho_0)\bigr\|_{\mathrm F}&\le 2\sum_{k=0}^{N-1}\delta_k+q^N\bigl\|\rho_0-\Pi_E(\rho_0)\bigr\|_{\mathrm F}.
\end{aligned}
$$

(In the ray formulation of [@rem-ray-record-orbit], replacing $\Pi_E(\rho_0)$ on the left by the rotating target $U_{\mathrm{ray}}^N P_{\mathrm{ray}}(\rho_0)(U_{\mathrm{ray}}^N)^*$ and on the right by $P_{\mathrm{ray}}(\rho_0)$ yields the corresponding rotating-block bound with $q<1$ across distinct rays.) This combined inequality is application reasoning outside the displayed frozen declaration [@thm-repeated-record-decay], not an additional clause or new result of the cited GID.
:::

::: {.example #ex-retained-environment-cnot title="Two-Qubit Controlled Flip: Stationary Environment and Reset Deviation"}
Stationarity of an environment marginal is not by itself a bound on the accumulated joint-state defects $\sum_{k<N}\delta_k$. For system-controlled $X$ on two qubits, $U=\lvert 0\rangle\langle 0\rvert\otimes I+\lvert 1\rangle\langle 1\rvert\otimes X$, start the system in the equatorial plus state $\rho_0=\lvert +\rangle\langle +\rvert=\frac{1}{2}\bigl(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\bigr)$, take the reference environment state $\eta_r=\frac{1}{2}(I+rX)=\frac{1}{2}\bigl(\begin{smallmatrix}1&r\\r&1\end{smallmatrix}\bigr)$ with $0\le r\le 1$, and evolve from the product initial state $\tau_0=\rho_0\otimes\eta_r$ via $\tau_{k+1}=U\tau_k U^*$:

1. **Period-two actual evolution versus multiplication by $r$ under reset**: Because $X\eta_r X=\eta_r$, the actual environment marginal remains stationary at every step, $\Tr_{\mathrm{S}}(\tau_k)=\eta_r$. Meanwhile, the joint unitary $U$ has period $2$ ($U^2=I$), whereas the single-step reset channel $R(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes\eta_r)U^*\bigr)$ multiplies the system's transverse off-diagonal entries by $\Tr(\eta_r X)=r$. At even step $N=2m$, the actual system marginal and the reset iterate are therefore

   $$
   \rho_{2m}=\rho_0=\frac{1}{2}\begin{pmatrix}1&1\\1&1\end{pmatrix},\qquad
   R^{2m}(\rho_0)=\frac{1}{2}\begin{pmatrix}1&r^{2m}\\r^{2m}&1\end{pmatrix}.
   $$

2. **Even-step trace distance and numerical comparison for a near-pure environment**: Direct evaluation of $\rho_{2m}-R^{2m}(\rho_0)=\frac{1-r^{2m}}{2}X$ and $\eta_1-\eta_r=\frac{1-r}{2}X$ gives both the trace distance between the actual system state and the reset iterate at even step $N=2m$ and the trace distance from $\eta_r$ to the pure plus state $\lvert +\rangle\langle +\rvert$:

   $$
   D\bigl(\rho_{2m},\,R^{2m}(\rho_0)\bigr)=\frac{1-r^{2m}}{2},\qquad
   D\bigl(\eta_r,\,\lvert +\rangle\langle +\rvert\bigr)=\frac{1-r}{2}.
   $$

   For instance, at $r=0.99$ and $N=100$ ($m=50$), the environment's trace-distance impurity from $\lvert +\rangle\langle +\rvert$ is only $\frac{1-0.99}{2}=0.005$, yet the step-$100$ trace-distance discrepancy between the actual system marginal and the reset iterate reaches

   $$
   D\bigl(\rho_{100},\,R^{100}(\rho_0)\bigr)=\frac{1-0.99^{100}}{2}\approx 0.3169838293633854.
   $$

3. **Exact purity endpoint versus fixed-$N$ and time-uniform bounds**: At $r=1$, $\eta_1=\lvert +\rangle\langle +\rvert$ and the discrepancy vanishes identically ($0$ for all $N$), so this example does not refute an exactly pure, unchanged environment premise. Instead, it separates two distinct obligations: for any **fixed** step count $N=2m$, the discrepancy $\frac{1-r^{2m}}{2}\to 0$ as $r\to 1$; yet for any fixed $r\in[0,1)$, the even-time supremum is $\sup_{m\ge 1}\frac{1-r^{2m}}{2}=\frac{1}{2}$, so a stationary near-pure environment marginal does not by itself yield a reset approximation uniform in time. This elementary two-qubit calculation illustrates that mathematical distinction and does not claim a physical experiment, a novel result, or a universal explanation of open-system dynamics; controlling the joint correlations, identifying the physical coupling, and experimental support remain outside these mathematical applications.
:::

::: {.remark #rem-pure-environment-marginal-defect title="Exact-Purity Marginal Factorization and the Near-Pure Single-Step Defect Bound (Application Derivation)"}
In contrast to the stationary mixed environment marginal of [@ex-retained-environment-cnot], **exact purity of the actual environment marginal** has a stronger algebraic consequence, while **near purity** relative to a specified pure state directly bounds the single-step factorization defect (all statements below are application derivations outside frozen theorem boxes, not additional clauses of the cited frozen declarations or new formal theorems):

1. **Tensor factorization from an exactly pure actual environment marginal**: Let $X\in M_{\mathrm{Fin}\,d\times\mathrm{Fin}\,e}(\mathbb{C})$ be a finite-dimensional positive semidefinite joint matrix of trace $1$, writing $\Tr_{\mathrm{S}}(X)$ for the partial trace over the system (with entry $(b,b')$ equal to $\sum_i X_{(i,b),\,(i,b')}$) and $\Tr_{\mathrm{E}}(X)$ for the partial trace over the environment (with entry $(i,j)$ equal to $\sum_b X_{(i,b),\,(j,b)}$). Fix an environment basis index $a\in\mathrm{Fin}\,e$ and its pure basis projector $p=\lvert a\rangle\langle a\rvert$ ($p_{b,b'}=\delta_{b,a}\delta_{b',a}$). If the actual environment marginal satisfies $\Tr_{\mathrm{S}}(X)=p=\lvert a\rangle\langle a\rvert$, then for every $b\ne a$ the environment diagonal entry vanishes:

   $$
   0=p_{b,b}=\bigl(\Tr_{\mathrm{S}}(X)\bigr)_{b,b}=\sum_{i\in\mathrm{Fin}\,d}X_{(i,b),\,(i,b)}.
   $$

   Because $X$ is positive semidefinite, every joint diagonal entry satisfies $X_{(i,b),\,(i,b)}\ge 0$; a sum of nonnegative real numbers vanishes if and only if each summand vanishes, so $X_{(i,b),\,(i,b)}=0$ for all $i$ and all $b\ne a$. By the positive semidefinite entry bound $|X_{\alpha,\beta}|^2\le X_{\alpha,\alpha}X_{\beta,\beta}$ (from Cauchy–Schwarz on the columns of $\sqrt{X}$), every joint entry with $b\ne a$ or $b'\ne a$ satisfies $X_{(i,b),\,(j,b')}=0$; thus all joint rows and columns outside $a$ vanish identically. The remaining $(a,a)$ environment block is precisely the actual system marginal $\bigl(\Tr_{\mathrm{E}}(X)\bigr)_{i,j}=\sum_b X_{(i,b),\,(j,b)}=X_{(i,a),\,(j,a)}$, giving

   $$
   X=\bigl(\Tr_{\mathrm{E}}(X)\bigr)\otimes p.
   $$

   Neither a global pure-state assumption on $X$ nor a separately assumed product condition is needed; however, this factorization is an algebraic consequence of $\Tr_{\mathrm{S}}(X)=p$ and does not prove that the actual environment marginal of a physical system remains pure.

2. **Reset powers from an exact pure marginal at every input step of a finite horizon**: Fix a finite horizon $N\in\mathbb{N}$ and a joint unitary $U$, evolve the actual joint states by $\tau_{k+1}=U\tau_k U^*$ with system marginals $\rho_k=\Tr_{\mathrm{E}}(\tau_k)$, and define explicitly the pure-reference single-step reset map

   $$
   R_p(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes p)U^*\bigr).
   $$

   If at every input step $0\le k<N$, $\tau_k$ is positive semidefinite (and trace-one) and its actual environment marginal is the exact same pure projector $\Tr_{\mathrm{S}}(\tau_k)=p$, then item 1 gives $\tau_k=\rho_k\otimes p$ at each input $0\le k<N$, so $\rho_{k+1}=\Tr_{\mathrm{E}}(U\tau_k U^*)=\Tr_{\mathrm{E}}\bigl(U(\rho_k\otimes p)U^*\bigr)=R_p(\rho_k)$. Induction on $k$ yields

   $$
   \rho_N=R_p^N(\rho_0),
   $$

   including $N=0$ ($R_p^0(\rho_0)=\rho_0$). Exact purity at the required inputs $k<N$ therefore removes the independent product-state assumption, but $\Tr_{\mathrm{S}}(\tau_k)=p$ at each input $k<N$ remains an explicit physical premise at every such step: it is not proved by unitarity of $U$, must not be overgeneralized to all physical systems, and is distinct from stationarity of a mixed marginal alone, from approximate purity, and from merely choosing a pure state $p$ as a comparison reference.

3. **Dimension-independent single-step defect bound for a near-pure actual marginal**: For any finite-dimensional positive semidefinite joint matrix $X\in M_{\mathrm{Fin}\,d\times\mathrm{Fin}\,e}(\mathbb{C})$ with $\Tr(X)=1$, fix an environment basis point $a\in\mathrm{Fin}\,e$ and pure projector $p=\lvert a\rangle\langle a\rvert$, set $\sigma=\Tr_{\mathrm{E}}(X)$ for the actual system marginal, and define the leakage outside $a$ by

   $$
   \varepsilon=1-\operatorname{Re}\Bigl(\bigl(\Tr_{\mathrm{S}}(X)\bigr)_{a,a}\Bigr)\in[0,1].
   $$

   With the half-trace-norm convention $D(A,B)=\frac{1}{2}\operatorname{traceNorm}(A-B)=\frac{1}{2}\|A-B\|_1$ and with no product assumption on $X$, the single-step defect to $\sigma\otimes p$ satisfies the dimension-independent bound

   $$
   D(X,\,\sigma\otimes p)\le\sqrt{\varepsilon}+\frac{\varepsilon}{2}.
   $$

   The self-contained proof combines two estimates. First, set the joint orthogonal projector $P=I\otimes p$ ($P^*=P=P^2$), take the positive semidefinite square root $S=\sqrt{X}$ ($S^*=S$, $S^2=X$), and put $C=PS$. Using $\Tr(PX)=\bigl(\Tr_{\mathrm{S}}(X)\bigr)_{a,a}=1-\varepsilon$ and $(I-P)^2=I-P$, the Frobenius norms satisfy $\|S\|_{\mathrm F}^2=\Tr(X)=1$, $\|C\|_{\mathrm F}^2=\Tr(S^* P^2 S)=\Tr(PX)=1-\varepsilon\le 1$, and $\|S-C\|_{\mathrm F}^2=\Tr\bigl(S^*(I-P)^2 S\bigr)=\Tr\bigl((I-P)X\bigr)=\varepsilon$, so $\|S\|_{\mathrm F}=1$, $\|C\|_{\mathrm F}\le 1$, and $\|S-C\|_{\mathrm F}=\|S^*-C^*\|_{\mathrm F}=\sqrt{\varepsilon}$. Expanding $X-PXP=SS^*-CC^*$ as $(S-C)S^*+C(S^*-C^*)$ and applying the trace-norm triangle inequality together with the Cauchy–Schwarz product bound $\operatorname{traceNorm}(AB)\le\|A\|_{\mathrm F}\|B\|_{\mathrm F}$ gives

   $$
   \begin{aligned}
   \operatorname{traceNorm}(X-PXP)&\le\operatorname{traceNorm}\bigl((S-C)S^*\bigr)+\operatorname{traceNorm}\bigl(C(S^*-C^*)\bigr) \\
   &\le\|S-C\|_{\mathrm F}\|S^*\|_{\mathrm F}+\|C\|_{\mathrm F}\|S^*-C^*\|_{\mathrm F}\le 2\sqrt{\varepsilon}.
   \end{aligned}
   $$

   Second, write $(A_b)_{i,j}=X_{(i,b),\,(j,b)}$ for the $(b,b)$ diagonal environment block of $X$, and abbreviate the $a$-block as $A_0=A_a$. Then $PXP=A_0\otimes p$, while $\sigma-A_0=\sum_{b\ne a}A_b$ is the sum of the discarded positive semidefinite diagonal environment blocks; hence $\sigma-A_0$ and $(\sigma-A_0)\otimes p$ are positive semidefinite, and the trace norm of $(\sigma-A_0)\otimes p$ equals its trace:

   $$
   \begin{aligned}
   \operatorname{traceNorm}\bigl((\sigma-A_0)\otimes p\bigr)&=\Tr\bigl((\sigma-A_0)\otimes p\bigr) \\
   &=\bigl(\Tr(\sigma)-\Tr(A_0)\bigr)\Tr(p)=1-(1-\varepsilon)=\varepsilon.
   \end{aligned}
   $$

   Splitting $X-\sigma\otimes p=(X-PXP)-\bigl((\sigma-A_0)\otimes p\bigr)$, applying the trace-norm triangle inequality, and dividing by $2$ yields $D(X,\sigma\otimes p)\le\frac{1}{2}(2\sqrt{\varepsilon}+\varepsilon)=\sqrt{\varepsilon}+\frac{\varepsilon}{2}$.

4. **Finite-horizon trajectory sum, controlled-record identification, and distinction between $R_p$ and $R_\eta$**: Along an actual trajectory $\tau_{k+1}=U\tau_k U^*$, define the step-$k$ leakage $\varepsilon_k=1-\operatorname{Re}\bigl((\Tr_{\mathrm{S}}\tau_k)_{a,a}\bigr)\in[0,1]$ relative to the same fixed pure basis state $p=\lvert a\rangle\langle a\rvert$, so that $\delta_{k,p}=D(\tau_k,\rho_k\otimes p)\le\sqrt{\varepsilon_k}+\varepsilon_k/2$. Substituting this into the accumulated defect estimate of [@rem-retained-environment-defect] for the pure-reference reset map $R_p$ gives, for every finite horizon $N\in\mathbb{N}$,

   $$
   D\bigl(\rho_N,\,R_p^N(\rho_0)\bigr)\le\sum_{k=0}^{N-1}\left(\sqrt{\varepsilon_k}+\frac{\varepsilon_k}{2}\right).
   $$

   Only when $R_p$ is identified with the controlled-record channel $\Phi_E$ under the actual controlled-column hypothesis $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$ already explained in [@rem-retained-environment-defect] (together with the cross-class overlap bound $|G_{ij}|\le q<1$, or the ray-separation bound of [@rem-ray-record-orbit]) can this finite-horizon sum also supply the actual-trajectory Frobenius pinching error budget. Crucially, the comparison targets must be kept distinct: the defect bound above measures deviation $D(\tau_k,\rho_k\otimes p)$ relative to the **pure projector** $p$ and directly controls the pure-reference reset map $R_p(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes p)U^*\bigr)$; it **does not automatically establish** either $R_p=R_\eta$ or an error bound for a mixed-reference reset map $R_\eta(\rho)=\Tr_{\mathrm{E}}\bigl(U(\rho\otimes\eta)U^*\bigr)$ (distinct reference states need not induce distinct reset maps — for example, $U=I$ induces the identity system map for every trace-one environment reference — but unless $R_p=R_\eta$ is independently established, replacing $\eta$ by $p$ requires a separate comparison between $R_p$ and $R_\eta$ and their iterates), so this pure-reference defect bound cannot be applied directly to the mixed-reference CNOT reset channel $R_{\eta_r}$ ($0\le r<1$) of [@ex-retained-environment-cnot]. Finally, this bound is a one-step estimate whose trajectory application sums over the finite horizon $N$; it proves neither physical smallness of $\varepsilon_k$ nor an error bound uniform in time.
:::

::: {.remark #rem-pure-record-support-compatibility title="Population-Support Restriction and Coherence-Magnitude Preservation Under Pure-Environment Retention (Application Derivation)"}
Item 2 of [@rem-pure-environment-marginal-defect] derives the finite-horizon identity $\rho_N=R_p^N(\rho_0)$ from exact environment purity $\Tr_{\mathrm{S}}(\tau_k)=p=\lvert a\rangle\langle a\rvert$ at the **input steps** $0\le k<N$ alone, leaving the final output $\tau_N$ unconstrained: even for $N=1$, an input satisfying $\Tr_{\mathrm{S}}(\tau_0)=p$ gives $\rho_1=R_p(\rho_0)$ while still permitting genuine environment recording and system decoherence at the final output $\tau_1$. Requiring a transition $\tau'=U\tau U^*$ to **preserve** the same specified pure environment marginal $p=\lvert a\rangle\langle a\rvert$ across the step imposes exact purity at both endpoints ($\Tr_{\mathrm{S}}(\tau)=p$ and $\Tr_{\mathrm{S}}(\tau')=p$), which is a strictly stronger condition (all statements below remain finite-dimensional analytic application derivations outside frozen theorem boxes, not additional clauses of the cited frozen declarations or new formal theorems). In the finite-dimensional controlled-record model on $\mathrm{Fin}\,d\times\mathrm{Fin}\,e$ with the controlled columns $U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$ of [@rem-retained-environment-defect] (so that $\sum_{b\in\mathrm{Fin}\,e}|E_i(b)|^2=1$ and $R_p=\Phi_E$), let $\tau$ be a positive semidefinite, trace-one joint input with system marginal $\rho=\Tr_{\mathrm{E}}(\tau)$ and control-basis **population support** $S=\{i\in\mathrm{Fin}\,d:\rho_{ii}>0\}$. By item 1 of [@rem-pure-environment-marginal-defect], the input marginal condition $\Tr_{\mathrm{S}}(\tau)=p$ already supplies the tensor factorization $\tau=\rho\otimes p$. Under the controlled columns above, the output joint state $\tau'=U(\rho\otimes p)U^*$ has environment marginal diagonal entry $\sum_{i\in\mathrm{Fin}\,d}\rho_{ii}|E_i(b)|^2$ at $b\in\mathrm{Fin}\,e$; if the output environment marginal is also $p=\lvert a\rangle\langle a\rvert$, then at every $b\ne a$,

$$
0=p_{b,b}=\Bigl(\Tr_{\mathrm{S}}\bigl(U(\rho\otimes p)U^*\bigr)\Bigr)_{b,b}=\sum_{i\in\mathrm{Fin}\,d}\rho_{ii}|E_i(b)|^2.
$$

Because $\rho$ is positive semidefinite, every summand satisfies $\rho_{ii}|E_i(b)|^2\ge 0$; a sum of nonnegative real numbers vanishes if and only if each summand vanishes, so $E_i(b)=0$ for every occupied address $i\in S$ ($\rho_{ii}>0$) and every $b\ne a$. Record normalization $\sum_{b\in\mathrm{Fin}\,e}|E_i(b)|^2=1$ then forces every occupied record on $S$ to align with $\lvert a\rangle$ up to a unit complex phase:

$$
E_i=u_i\lvert a\rangle,\qquad u_i=E_i(a)\in\mathbb{C},\qquad |u_i|=1\qquad (i\in S).
$$

Consequently, for every pair of occupied addresses $i,j\in S$, the Gram multiplier is $G_{ij}=\sum_{b\in\mathrm{Fin}\,e}E_i(b)\overline{E_j(b)}=u_i\overline{u_j}$ with unit modulus $|G_{ij}|=1$, and the single-step channel identity $R_p(\rho)_{ij}=\Phi_E(\rho)_{ij}=G_{ij}\rho_{ij}$ preserves $|\rho_{ij}|$ on $S\times S$. Outside the occupied support, whenever $i\notin S$ or $j\notin S$, at least one of the nonnegative diagonal populations $\rho_{ii},\rho_{jj}\ge 0$ vanishes; the positive semidefinite entry bound $|\rho_{ij}|^2\le\rho_{ii}\rho_{jj}$ then forces the entire row and column of a zero diagonal entry to vanish ($\rho_{ij}=0$, and hence $R_p(\rho)_{ij}=G_{ij}\rho_{ij}=0$). Therefore, **every system entry magnitude** is preserved across the transition, including entries outside $S$:

$$
G_{ij}=u_i\overline{u_j},\quad |G_{ij}|=1\quad (i,j\in S),\qquad \bigl|R_p(\rho)_{ij}\bigr|=|\rho_{ij}|\quad (\forall i,j\in\mathrm{Fin}\,d).
$$

Rotation by the relative phase $u_i\overline{u_j}$ (or a change in a single real quadrature such as $\operatorname{Re}R_p(\rho)_{ij}$) is a phase turn in the complex plane, not a loss of coherence magnitude $|\rho_{ij}|$. This derivation uses only positive semidefiniteness, unit trace, and the endpoint marginals $p$; it assumes neither a pure system state $\rho$, a pure joint state $\tau$, full rank, nor full population support $S=\mathrm{Fin}\,d$ (conversely, a rank-one pure superposition such as the equal superposition over all basis states can have full population support $S=\mathrm{Fin}\,d$).

Because the vanishing sum $\sum_i\rho_{ii}|E_i(b)|^2=0$ constrains only addresses with $\rho_{ii}>0$, the resulting restriction on the global channel $R_p$ is sensitive to the input's population support $S$. When the input has **full population support** $S=\mathrm{Fin}\,d$, the relation $E_i=u_i\lvert a\rangle$ ($|u_i|=1$) holds at every system address, so with $U_{\mathrm{ray}}=\operatorname{diag}(u_i)$ the reset map reduces to unitary diagonal conjugation $R_p(\sigma)=U_{\mathrm{ray}}\sigma U_{\mathrm{ray}}^*$ on **every** complex system matrix $\sigma\in M_d(\mathbb{C})$. When the input has **deficient population support** ($S\subsetneq\mathrm{Fin}\,d$), the record columns $E_i$ at unoccupied addresses $i\notin S$ remain unconstrained by this trajectory and the global reset channel $R_p$ need not be unitary: for example, for $d=3$ and orthogonal environment basis states $\lvert a\rangle\perp\lvert b\rangle$, taking $E_0=E_1=\lvert a\rangle$ and $E_2=\lvert b\rangle$ preserves the output environment marginal $p$ and all entry magnitudes on any coherent input supported on $\{0,1\}$, while still dephasing coherences involving address $2$ ($G_{02}=G_{12}=0$) on other inputs that populate address $2$. Along the actual joint trajectory $\tau_{k+1}=U\tau_k U^*$ generated by the **same fixed** controlled unitary $U$, however, a single transition from $\tau_0$ preserving $p$ on $S=\{i:(\rho_0)_{ii}>0\}$ already fixes $U(\lvert i\rangle\otimes\lvert a\rangle)=u_i(\lvert i\rangle\otimes\lvert a\rangle)$ for all $i\in S$. The joint subspace spanned by $\{\lvert i\rangle\otimes\lvert a\rangle:i\in S\}$ (and joint density matrices supported on $S\times\{a\}$) is therefore invariant under $U$, keeping the populations $(\rho_k)_{ii}=(\rho_0)_{ii}$ and support $S$ fixed so that every subsequent step $k\in\mathbb{N}$ automatically retains $\Tr_{\mathrm{S}}(\tau_k)=p$ and satisfies

$$
(\rho_k)_{ij}=(u_i\overline{u_j})^k(\rho_0)_{ij}\quad (i,j\in S),\qquad \bigl|(\rho_k)_{ij}\bigr|=\bigl|(\rho_0)_{ij}\bigr|\quad (\forall i,j\in\mathrm{Fin}\,d),
$$

with no new endpoint purity assumption needed at later steps $k\ge 1$ for that fixed $U$. Changing couplings $U_k$ instead require the corresponding controlled-column and pure-marginal preservation conditions at each transition, and the conclusion covers neither unobserved intermediate times nor arbitrary unitaries outside the controlled-record column form — for instance, the product unitary $U=H\otimes I$ with a system Hadamard $H$ preserves the environment marginal $p$ while rotating the plus state $\lvert +\rangle\langle +\rvert$ to the basis state $\lvert 0\rangle\langle 0\rvert$, changing computational-basis coherences and populations without controlled-record dephasing.

Combining this occupied-support restriction with the preceding decay hypotheses clarifies how the model premises interact. If the strict literal-vector cross-class overlap bound of [@thm-repeated-record-decay] ($|G_{ij}|\le q<1$ whenever $E_i\ne E_j$) is also imposed, no two occupied addresses $i,j\in S$ can have distinct record vectors $E_i\ne E_j$, since their Gram magnitude $|G_{ij}|=|u_i\overline{u_j}|=1$ cannot satisfy $1\le q<1$; all occupied records on $S$ must then be literally equal ($E_i=u\lvert a\rangle$ with a single common phase $u$), $R_p(\rho)=\rho$ fixes this input, and its record-class pinching error $\|\rho-\Pi_E(\rho)\|_{\mathrm F}$ is zero. In the ray formulation of [@rem-ray-record-orbit], the occupied records $E_i=u_i\lvert a\rangle$ ($i\in S$) share the single ray $\mathbb{C}\lvert a\rangle$, so the ray-pinching error $\|\rho-P_{\mathrm{ray}}(\rho)\|_{\mathrm F}$ vanishes on this input while the coherent phase orbit $(u_i\overline{u_j})^k\rho_{ij}$ remains. Throughout, **exact purity of the actual complete environment marginal** $\Tr_{\mathrm{S}}(\tau)=p$ must be kept distinct from pure conditional record vectors $\lvert E_i\rangle$ (which are unit vectors in every controlled-record model even when the reduced environment marginal $\sum_i\rho_{ii}\lvert E_i\rangle\langle E_i\rvert$ is mixed), from global joint purity of $\tau$, from a pure reference $p$ chosen merely for comparison in $R_p$, from stationarity of a mixed environment marginal ([@ex-retained-environment-cnot]), and from approximate purity ($\varepsilon_k>0$ in [@rem-pure-environment-marginal-defect]): none of those substitutes establishes the stated endpoint premise. These deductions are finite-dimensional analytic applications of the existing matrix, partial-trace, and controlled-record results, and assert neither a converse, an infinite-dimensional theorem, mathematical novelty, nor experimental validation.
:::

::: {.remark #rem-actual-environment-purity-loss title="Controlling Single-Step System Coherence Loss by Actual Output Environment Purity (Application Derivation)"}
Both [@rem-pure-environment-marginal-defect] and [@rem-pure-record-support-compatibility] measure environment purity relative to a fixed pure reference basis state $p=\lvert a\rangle\langle a\rvert$ chosen in advance. Without selecting any comparison ray, one can directly compare the single-step **loss of system purity (and off-diagonal coherence)** against the **purity of the actual output environment marginal** (all statements below remain finite-dimensional analytic application derivations outside frozen theorem boxes, not additional clauses of the cited frozen declarations or new formal theorems). Start with a transparent single-qubit hand calculation ($d=2$): let two normalized environment records $E_0,E_1$ have overlap $G_{01}=\sum_b E_0(b)\overline{E_1(b)}$. If the system starts in the equatorial pure superposition $\rho=\lvert +\rangle\langle +\rvert=\frac{1}{2}\bigl(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\bigr)$ (with diagonal populations $p_0=p_1=\frac{1}{2}$ and squared off-diagonal moduli $|\rho_{01}|^2=|\rho_{10}|^2=\frac{1}{4}$), controlled recording multiplies the off-diagonal entries of the reduced output $\rho'$ by $G_{01}$ and $\overline{G_{01}}$, lowering system purity from $F_2(\rho)=\Tr(\rho^2)=1$ to $F_2(\rho')=\Tr(\rho'^2)=\frac{1}{2}+\frac{1}{2}|G_{01}|^2$ with purity loss $L_2=F_2(\rho)-F_2(\rho')=\frac{1-|G_{01}|^2}{2}$; meanwhile, the actual output environment marginal $\sigma_{\mathrm{E}}=\frac{1}{2}\lvert E_0\rangle\langle E_0\rvert+\frac{1}{2}\lvert E_1\rangle\langle E_1\rvert$ has purity $q=F_2(\sigma_{\mathrm{E}})=\Tr(\sigma_{\mathrm{E}}^2)=\frac{1+|G_{01}|^2}{2}$ and linear entropy $\Delta=1-q=\frac{1-|G_{01}|^2}{2}$, matching $L_2$ identically. Conversely, if the system starts in the maximally mixed center $\rho=\frac{1}{2}I_2$ with orthogonal records ($G_{01}=0$), the system marginal stays unchanged at $\rho'=\rho=\frac{1}{2}I_2$ ($L_2=0$), whereas the actual output environment still branches into an equal mixture of two orthogonal records ($q=\frac{1}{2}$ and $\Delta=1-q=\frac{1}{2}$):

$$
\begin{aligned}
\rho=\lvert +\rangle\langle +\rvert:\quad & L_2=F_2(\rho)-F_2(\rho')=\frac{1-|G_{01}|^2}{2}=1-q=\Delta,\\
\rho=\frac{1}{2}I_2\;\;(G_{01}=0):\quad & L_2=0<\frac{1}{2}=1-q=\Delta.
\end{aligned}
$$

To generalize this calculation to arbitrary finite system and environment dimensions ($d,e\in\mathbb{N}$), let $\rho\in M_d(\mathbb{C})$ be a positive semidefinite system density matrix of trace $1$, let each environment record $E_i\in\mathbb{C}^e$ ($i\in\mathrm{Fin}\,d$) be normalized ($\sum_{b\in\mathrm{Fin}\,e}|E_i(b)|^2=1$), and follow the notation of [@thm-repeated-record-decay] in writing $p_i=\rho_{ii}\ge 0$ for the diagonal populations and $G_{ij}=\sum_{b\in\mathrm{Fin}\,e}E_i(b)\overline{E_j(b)}$ for the Gram overlaps. Set the controlled-record matrix $W_{(i,b),\,j}=[j=i]\,E_i(b)$ (record normalization makes $W^*W=I_d$ an isometry), and define the recorded joint state together with its two actual partial-trace marginals by

$$
\begin{aligned}
X&=W\rho W^*,\qquad \sigma_{\mathrm{E}}=\Tr_{\mathrm{S}}(X),\qquad \rho'=\Tr_{\mathrm{E}}(X),\\
F_2(A)&=\|A\|_{\mathrm F}^2=\sum_{i,j}|A_{ij}|^2,\qquad C_2(A)=\|A-\operatorname{diag}(A)\|_{\mathrm F}^2=\sum_{i\ne j}|A_{ij}|^2.
\end{aligned}
$$

Here $\sigma_{\mathrm{E}}$ and $\rho'$ are both actual marginals of the same recorded joint state $X$, and the subscript $2$ in $F_2(A)$ and $C_2(A)$ explicitly denotes that these quantities are already **squared** sums defined consistently with this chapter's Frobenius norm $\|A\|_{\mathrm F}=\bigl(\sum_{i,j}|A_{ij}|^2\bigr)^{1/2}$ (namely the sum of squared moduli of all entries or of all off-diagonal entries, not a norm whose square is taken a second time). Identifying $X=W\rho W^*$ with the actual single-step output $U(\rho\otimes\lvert a\rangle\langle a\rvert)U^*$ of a joint unitary $U$ requires the product input $\rho\otimes\lvert a\rangle\langle a\rvert$ with a pure initial environment $\lvert a\rangle\langle a\rvert$ ($a\in\mathrm{Fin}\,e$) and the specified controlled columns $UJ=W$ ($U_{(i,b),\,(j,a)}=[j=i]\,E_i(b)$) of [@rem-retained-environment-defect]; the coefficient-$1$ bound below holds within this pure-initial-environment and normalized-finite-record scope and is not asserted for a mixed initial environment.

Evaluating the partial trace over the system gives $(\sigma_{\mathrm{E}})_{b,c}=\sum_{i\in\mathrm{Fin}\,d}p_i E_i(b)\overline{E_i(c)}$, so summing $|(\sigma_{\mathrm{E}})_{b,c}|^2$ over $b,c\in\mathrm{Fin}\,e$ yields the actual output environment purity $q=F_2(\sigma_{\mathrm{E}})=\sum_{i,j\in\mathrm{Fin}\,d}p_i p_j|G_{ij}|^2$ (equivalently, arranging the record vectors $E_i$ as columns of the $e\times d$ matrix $B$ gives $\sigma_{\mathrm{E}}=B\operatorname{diag}(p)B^*$ and $(B^*B)_{ij}=\overline{G_{ij}}$, so cyclicity of the trace likewise yields $\Tr(\sigma_{\mathrm{E}}^2)=\sum_{i,j}p_i p_j|G_{ij}|^2$). Meanwhile, the partial-trace identity `environment_marginal_channel` used in [@thm-repeated-record-decay] supplies $\rho'_{ij}=G_{ij}\rho_{ij}$. Because the input $\rho$ and both marginals $\rho',\sigma_{\mathrm{E}}$ are Hermitian density matrices, $F_2(A)=\Tr(A^2)$ for each of them. Writing $L_2=F_2(\rho)-F_2(\rho')$ for the system purity loss and $\Delta=1-q=1-F_2(\sigma_{\mathrm{E}})$ for the output environment's linear entropy, and combining $\sum_{i,j}p_i p_j=\bigl(\sum_i p_i\bigr)^2=1$, the normalization consequences $G_{ii}=1$ and $|G_{ij}|\le 1$, and the positive semidefinite entry bound $|\rho_{ij}|^2\le\rho_{ii}\rho_{jj}=p_i p_j$ from [@rem-pure-environment-marginal-defect], termwise comparison across the nonnegative factors $1-|G_{ij}|^2\ge 0$ gives

$$
\begin{aligned}
(\sigma_{\mathrm{E}})_{b,c}&=\sum_{i\in\mathrm{Fin}\,d}p_i E_i(b)\overline{E_i(c)},\qquad q=F_2(\sigma_{\mathrm{E}})=\sum_{i,j\in\mathrm{Fin}\,d}p_i p_j|G_{ij}|^2,\\
L_2&=F_2(\rho)-F_2(\rho')=C_2(\rho)-C_2(\rho')=\sum_{i,j\in\mathrm{Fin}\,d}|\rho_{ij}|^2\bigl(1-|G_{ij}|^2\bigr),\\
\Delta&=1-q=1-F_2(\sigma_{\mathrm{E}})=\sum_{i,j\in\mathrm{Fin}\,d}p_i p_j\bigl(1-|G_{ij}|^2\bigr),\qquad 0\le L_2\le 1-q=\Delta.
\end{aligned}
$$

Record normalization and the positive semidefinite entry bound are the entire proof mechanism: no comparison ray, no positive lower bound on the populations $p_i$, and no full-rank premise on $\rho$ is needed (zero populations $p_i=0$ force $\rho_{ij}=0$ via $|\rho_{ij}|^2\le p_i p_j$ and cause no exception). Since the diagonal entries are unchanged ($\rho'_{ii}=G_{ii}\rho_{ii}=\rho_{ii}$), the purity loss $L_2$ equals the loss of squared off-diagonal Frobenius coherence $C_2(\rho)-C_2(\rho')$; crucially, this is the decrease in squared off-diagonal norm, **not** the squared Frobenius distance $F_2(\rho-\rho')=\|\rho-\rho'\|_{\mathrm F}^2$ between $\rho$ and $\rho'$. For a pure system input $\rho$, $|\rho_{ij}|^2=p_i p_j$ holds for all $i,j$, giving equality $L_2=1-q=\Delta$; for mixed system inputs only the inequality $L_2\le 1-q$ holds in general, as illustrated above by $\rho=\frac{1}{2}I_2$ with orthogonal records ($L_2=0<\frac{1}{2}=1-q$).

In particular, if the actual output environment marginal has unit purity $q=F_2(\sigma_{\mathrm{E}})=1$ (so $\Delta=1-q=0$), the vanishing nonnegative sum $\sum_{i,j}p_i p_j(1-|G_{ij}|^2)=0$ forces $|G_{ij}|=1$ for every occupied pair $i,j\in S=\{i\in\mathrm{Fin}\,d:p_i>0\}$. By the equality criterion of the Cauchy–Schwarz inequality on unit vectors, all occupied records share a single unit output ray: there exist a unit environment vector $v\in\mathbb{C}^e$ ($\sum_{b\in\mathrm{Fin}\,e}|v(b)|^2=1$) and unit phases $u_i\in\mathbb{C}$ ($|u_i|=1$ for $i\in S$) such that $E_i=u_i v$ on $S$. On this input $\rho$, the system undergoes only the corresponding diagonal phase action $\rho'_{ij}=u_i\overline{u_j}\rho_{ij}$ on $S\times S$ (with entries outside $S\times S$ still vanishing), preserving every entry magnitude ($L_2=0$). Because no reference ray was fixed in advance, however, the shared output ray $v$ **need not equal** the initial environment reference $\lvert a\rangle$, and $\rho'$ **need not equal** $\rho$. In particular, for the qubit plus input $\rho=\lvert +\rangle\langle +\rvert$, the antiparallel records $E_0=v$ and $E_1=-v$ give a pure output environment $\sigma_{\mathrm{E}}=\lvert v\rangle\langle v\rvert$ ($L_2=\Delta=0$) while flipping the system to the orthogonal minus state $\rho'=\lvert -\rangle\langle -\rvert$, whose half-trace-norm distance under [@def-trace-distance] is $D(\rho,\rho')=\frac{1}{2}\|\rho-\rho'\|_1=1$:

$$
\begin{aligned}
q=1\;\;(\Delta=0)\quad&\Longrightarrow\quad E_i=u_i v,\quad |u_i|=1\quad (i\in S),\qquad \rho'_{ij}=u_i\overline{u_j}\rho_{ij}\quad (i,j\in S),\\
E_0=v,\;E_1=-v,\;\rho=\lvert +\rangle\langle +\rvert\quad&\Longrightarrow\quad \rho'=\lvert -\rangle\langle -\rvert,\quad L_2=\Delta=0,\quad D(\rho,\rho')=1.
\end{aligned}
$$

Furthermore, in sharp contrast to the two-endpoint application of [@rem-pure-record-support-compatibility] — where preserving the **same** reference state $p=\lvert a\rangle\langle a\rvert$ across the step yields an invariant occupied subspace and guarantees pure environment marginals and preserved coherence magnitudes at all later steps of a fixed $U$ — a pure output environment at a **different** ray $\lvert v\rangle\ne\lvert a\rangle$ gives **no future purity or coherence-retention guarantee** under repeated application of the same fixed unitary $U$. Concretely, on a three-level environment basis $\{\lvert 0\rangle,\lvert 1\rangle,\lvert 2\rangle\}$ ($e=3$) controlled by a qubit ($d=2$), let $U=\lvert 0\rangle\langle 0\rvert\otimes V_0+\lvert 1\rangle\langle 1\rvert\otimes V_1$, where $V_0$ swaps $\lvert 0\rangle\leftrightarrow\lvert 1\rangle$ and fixes $\lvert 2\rangle$, while $V_1$ cycles $\lvert 0\rangle\mapsto\lvert 1\rangle\mapsto\lvert 2\rangle\mapsto\lvert 0\rangle$. Starting from initial environment $\lvert 0\rangle$ and system plus state $\rho_0=\lvert +\rangle\langle +\rvert$, the first contact produces identical records $V_0\lvert 0\rangle=V_1\lvert 0\rangle=\lvert 1\rangle$, so the joint state is $\tau_1=\lvert +\rangle\langle +\rvert\otimes\lvert 1\rangle\langle 1\rvert$ with pure output environment ($q_1=1$) and preserved system coherence $\rho_1=\lvert +\rangle\langle +\rvert$; on the second contact with the same retained environment and fixed $U$, however, $\lvert 1\rangle$ maps to the orthogonal records $V_0\lvert 1\rangle=\lvert 0\rangle$ and $V_1\lvert 1\rangle=\lvert 2\rangle$, completely removing the system's off-diagonal coherence in $\rho_2=\frac{1}{2}I_2$:

$$
\begin{aligned}
V_0\lvert 0\rangle&=\lvert 1\rangle,\quad V_0\lvert 1\rangle=\lvert 0\rangle,\quad V_0\lvert 2\rangle=\lvert 2\rangle,\qquad
V_1\lvert 0\rangle=\lvert 1\rangle,\quad V_1\lvert 1\rangle=\lvert 2\rangle,\quad V_1\lvert 2\rangle=\lvert 0\rangle,\\
\tau_1&=\lvert +\rangle\langle +\rvert\otimes\lvert 1\rangle\langle 1\rvert\quad (q_1=1,\;\rho_1=\lvert +\rangle\langle +\rvert),\qquad
\rho_2=\frac{1}{2}I_2,\quad \sigma_{\mathrm{E},2}=\frac{1}{2}\bigl(\lvert 0\rangle\langle 0\rvert+\lvert 2\rangle\langle 2\rvert\bigr)\quad (q_2=\frac{1}{2}).
\end{aligned}
$$

Small output linear entropy $\Delta=1-q$ therefore controls the **input-weighted loss of squared coherence magnitude** $L_2$; because $\Delta=\sum_{i,j}p_i p_j(1-|G_{ij}|^2)$ weights each pair by $p_i p_j$, a small $\Delta$ does not uniformly bound every relative pair loss $1-|G_{ij}|^2$ when populations can be arbitrarily small, nor does it bound the state trace distance $D(\rho,\rho')$. Likewise, this single-step application supplies no multi-step reset identification, monotonic retained-environment trajectory, uniform-in-time estimate, or exponential decay law, and makes no claim of mathematical novelty or empirical validation.
:::

**Decay to zero: is it still reversible?** In [@prop-phase-damping-decay] the coherence is multiplied by $c$ at each step, leaving $c^N\rho_{01}$ after $N$ steps and finally zero. Section 4.1 showed that one step of decoherence can be seen as a reversible coupling followed by discarding the environment ([@thm-stinespring-dilation], [@thm-reduced-access-defect]). But "each step can be seen this way" and "all the steps together are still the shadow of one reversible evolution" are different claims: the first allows a different dilation at every step, the second asks one unitary $U$ to account for all the powers $T^n$ at once. The next theorem says that the second holds for every contraction.

::: {.theorem #thm-unitary-power-dilation title="Sz.-Nagy Unitary Power Dilation: Every Power of a Contraction Is a Shadow of the Same Unitary" lean="D5/S3/HilbertOperators/UnitaryPowerDilation.exists_unitary_power_dilation"}
Let $E$ be a complex Hilbert space (a complete complex inner product space), and let $T : E \to E$ be a bounded linear operator with $\lVert T\rVert \le 1$. Then there are a complex Hilbert space $H$, a bounded linear operator $V : E \to H$ and a unitary operator $U$ on $H$ such that:

1. $V$ preserves inner products: $\langle Vx, Vy\rangle = \langle x, y\rangle$ for all $x, y \in E$;
2. $V^{\dagger}\,U^n\,V x = T^n x$ for all $n \in \mathbb{N}$ and $x \in E$.
:::

::: proof
The Lean proof has two steps, and the second is exactly a "collision model".

(1) One step: the Halmos dilation. On $E \oplus E$ take the self-adjoint block operator $a = \begin{pmatrix} 0 & T \\ T^{\dagger} & 0 \end{pmatrix}$, whose norm is at most $\lVert T\rVert \le 1$; with the continuous functional calculus, build $\sqrt{I - a^2}$, so that $a + i\sqrt{I - a^2}$ is unitary, and multiply by the permutation that swaps the two components to get a unitary $J$. Since $a^2$ is block diagonal, so is $\sqrt{I - a^2}$, and therefore the first component of $J$ applied to $(x, 0)$ is exactly $Tx$.

(2) All steps: the collision model. Take $H = \ell^2(\mathbb{Z};\, E \oplus E)$, with one copy of the system and one of the environment at every integer site. $U$ first applies $J$ at every site at once and then moves every environment component one site to the right; a product of two unitaries, it is unitary. $V$ puts $x$ into the system component of site 0, and $V^{\dagger}$ reads back the system component of site 0. Induction on $n$ shows that after $n$ steps the system component of site 0 is $T^n x$, its environment component is zero, and all sites with negative index are zero. The reason is that at every step the system at site 0 meets a blank environment arriving from the left, while the used environment leaves to the right and never comes back. The full proof is checked by the Lean kernel.
:::

**Why the total dilation space $H$ must be infinite-dimensional.** When a decaying vector exists, building an infinite-dimensional total dilation space $H$ in the proof is not laziness (this is manual application reasoning, not formalized in this book; the frozen existence theorem [@thm-unitary-power-dilation] does not itself assert this corollary): fix complete complex Hilbert spaces $E$ and $H$, bounded linear operators $T : E \to E$ and $V : E \to H$, and a fixed unitary operator $U$ on $H$, and suppose that for some nonzero vector $x \in E$ ($x \neq 0$) with $\lVert T^n x\rVert \to 0$, the same pair $(U, V)$ satisfies the exact all-power compression $V^{\dagger} U^n V x = T^n x$ for every $n \in \mathbb{N}$ (note that the $n = 0$ case already gives $V^{\dagger} V x = T^0 x = x$, so a separate global isometry or contraction assumption is not even needed for this contradiction). If the **total dilation space $H$ is finite-dimensional**, the bounded-operator space on $H$ is finite-dimensional and its unitary group is closed and bounded, hence compact. By compact-group recurrence of powers (or elementary extraction of a convergent subsequence $U^{n_k} \to W$ with strictly increasing gaps $m_k = n_{k+1} - n_k \to \infty$, so that $U^{m_k} = U^{n_{k+1}}(U^{n_k})^{-1} \to W W^{-1} = I$), there exists a strictly increasing sequence of arbitrarily late powers $m_k \to \infty$ with $U^{m_k} \to I$. Continuity of the compressed observable $W \mapsto \lVert V^{\dagger} W V x\rVert$ then yields, along this subsequence,

$$
\lVert T^{m_k} x\rVert = \lVert V^{\dagger} U^{m_k} V x\rVert \;\longrightarrow\; \lVert V^{\dagger} I V x\rVert = \lVert x\rVert > 0,
$$

contradicting $\lVert T^n x\rVert \to 0$! Whenever $T$ has a nonzero decaying vector $\lVert T^n x\rVert \to 0$, any exact common compression of all natural powers therefore requires the **total dilation space $H$ to be infinite-dimensional**. Crucially, the premise used by compactness is finite dimensionality of the **entire dilation space $H$**, not of the environment alone: when the system space $E$ can be infinite-dimensional, a finite-dimensional environment does not make the total space $H$ finite-dimensional, so this argument yields no obstruction from environment dimension alone; only when $E$ itself is finite-dimensional (such as $E = \mathbb{C}$ in the next example) does infinite total dimension of $H$ force an infinite-dimensional auxiliary environment. Moreover, this compact-group return argument provides no quantitative return-time bound, claims no general exact periodicity, and excludes neither finite-horizon dilations ($n \le N$) nor finite-horizon approximations.

::: {.example #ex-halmos-one-step-recurrence title="A One-Step Dilation Only Covers One Step: at c = 0.8 the Leaked Amplitude Comes Back"}
Take the simplest contraction, $E = \mathbb{C}$ and $T = c = 0.8$: the factor by which the coherence of [@prop-phase-damping-decay] is multiplied at each step. With $s = \sqrt{1 - c^2} = 0.6$, the Halmos construction of step (1) of the proof gives

$$
J = \begin{pmatrix} c & i s \\ i s & c \end{pmatrix} = \begin{pmatrix} 0.8 & 0.6\,i \\ 0.6\,i & 0.8 \end{pmatrix}.
$$

At the first step it indeed sends the amplitude $1$ to $0.8$, and $0.6\,i$ leaks into the environment. If the same $J$ is used again with the same environment, then $J = \cos\varphi\, I + i\sin\varphi\,\sigma_x$ (with $\varphi = \arccos 0.8 = 36.87^\circ$) is just a rotation about the $x$ axis, and $(J^n)_{00} = \cos n\varphi$. The fourth column of the table is a numerical simulation of the collision model (site 0 meets a fresh environment at every step); values are rounded to the digits shown.

| $n$ | $c^n$ (wanted) | $(J^n)_{00}$ (one environment reused) | collision model, site 0 | leaked probability $1 - c^{2n}$ |
| ---: | ---: | ---: | ---: | ---: |
| $1$ | $0.8000$ | $0.8000$ | $0.8000$ | $0.3600$ |
| $2$ | $0.6400$ | $0.2800$ | $0.6400$ | $0.5904$ |
| $3$ | $0.5120$ | $-0.3520$ | $0.5120$ | $0.7379$ |
| $4$ | $0.4096$ | $-0.8432$ | $0.4096$ | $0.8322$ |
| $5$ | $0.3277$ | $-0.9971$ | $0.3277$ | $0.8926$ |
| $6$ | $0.2621$ | $-0.7522$ | $0.2621$ | $0.9313$ |

From the second step on, a single environment sends the leaked amplitude back; at $n = 39$, $(J^{39})_{00} = 0.99934$, an almost complete recovery, while $c^{39} = 0.00017$. Site 0 of the collision model gives exactly $c^n$ in every row, in agreement with the induction in the proof. The leaked probability $1 - c^{2n}$ has not vanished: it is spread over sites $1, 2, \dots, n$, and the total norm stays $1$.
:::

::: {.figure src="ch04-fresh-environment"}
**The same environment sends the amplitude back; only a fresh one lets it go for good.** The cyan points are $c^n$ ($c = 0.8$) at cell $0$ of the collision model, which meets a fresh environment at every step and decays to zero ([@thm-unitary-power-dilation]); the grey points are $(J^n)_{00} = \cos n\varphi$ for the same environment used again and again, swinging between $-1$ and $1$ and back at $0.999$ at $n = 39$ (the circled point). Both columns of numbers are the hand computation of [@ex-halmos-one-step-recurrence]; that a finite-dimensional total dilation space must send the amplitude back is the text's manual application argument, not formalized in this book.
:::

> Leaked amplitude does not come back, not because it has vanished, but because the environment that meets the system is always a fresh one.

::: {.remark #rem-arbitrary-density-prefix title="An Exact Prefix Bound for an Arbitrary Initial Environment Density (Manual Application)"}
**Manual application, not formalized in this book.** Recurrence over all time leaves room for finite windows. Yet if two pure states remain fixed while their mutual coherence follows an exact geometric sequence with ratio of modulus less than one, the dimension of a fixed environment also limits the window. The argument below follows [the source, §§9–10, proof of Theorem 10.1](https://github.com/the-omega-institute/trureturing/blob/3476ce98dd3c4326181683b37fc2ddad3e33a743/docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_MINIMAL_RECORD_DILATIONS.md#L980-L1058). That theorem concerns a balanced ten-dimensional channel: in a fixed frame, it identifies orthonormal states $h_+,h_-$, verifies that their pure projectors are fixed and their coherence multiplier is $\lambda=1-4p$ with $|\lambda|<1$, and then uses branch histories and finite Prony annihilation. Here $a,b$ take the roles of $h_+,h_-$, and the same part of the proof applies to a model satisfying those two-state conditions. The generic two-state formulation below is an application of that proof; the source theorem itself concerns its ten-dimensional channel. The research entry point is [trureturing #31041](https://github.com/the-omega-institute/trureturing/issues/31041).

Fix integers $m\ge2,d\ge1$, a natural number $N$, a real number $-1<\lambda<1$, and orthonormal vectors $a,b\in\mathbb C^m$. Let $E=\mathbb C^d$ and let the initial environment density $\sigma\in M_d(\mathbb C)$ be positive semidefinite with $\Tr\sigma=1$, allowing arbitrary rank and coherences in any basis. One fixed unitary $W$ acts on $\mathbb C^m\otimes E$, with actual reduced maps

$$
\Psi_n(X)=\Tr_E\bigl(W^n(X\otimes\sigma)W^{*n}\bigr).
$$

The environment is initially independent of the system input. The data $W,E,\sigma,a,b,\lambda$ stay fixed throughout the window, with no reset, intermediate intervention, external clock control, or replacement of the environment. Write $P_a=\lvert a\rangle\langle a\rvert$, $P_b=\lvert b\rangle\langle b\rvert$, and $O=\lvert a\rangle\langle b\rvert$. If, for every $0\le n\le N$,

$$
\begin{aligned}
\Psi_n(P_a)&=P_a,\qquad \Psi_n(P_b)=P_b,\\
\langle a,\Psi_n(O)b\rangle&=\lambda^n,
\end{aligned}
$$

then $N+1\le d^2$: counting the zeroth sample, at most $d^2$ such exact geometric-coherence samples can agree. Although $O$ is not a density matrix, the displayed definition of the maps acts on all system matrices. Equality of entire channels on density matrices also determines their action on $O$ by linearity.

**Pure outputs reveal the actual branches.** For $N=0$ the conclusion is simply $1\le d^2$; hence take $N\ge1$. Diagonalize $\sigma$ on its positive support $S=\operatorname{supp}\sigma$:

$$
\sigma=\sum_{j=1}^r s_j\lvert e_j\rangle\langle e_j\rvert,
\qquad s_j>0,\quad \sum_j s_j=1,
$$

where $r=\dim S$ and the $e_j$ form an orthonormal basis of $S$. The pure output $\Psi_n(P_a)=P_a$ means that the total probability of leaving the $a$ direction vanishes:

$$
\begin{aligned}
0&=\Tr\bigl((I-P_a)\Psi_n(P_a)\bigr)\\
&=\sum_j s_j\bigl\|((I-P_a)\otimes I_E)W^n(a\otimes e_j)\bigr\|^2.
\end{aligned}
$$

Every term is nonnegative and $s_j>0$, so each term vanishes. By linearity, for every $e\in S$,

$$
\begin{aligned}
W^n(a\otimes e)&=a\otimes T_{a,n}e,\\
W^n(b\otimes e)&=b\otimes T_{b,n}e
\qquad(0\le n\le N).
\end{aligned}
$$

Unitarity makes each $T_{a,n},T_{b,n}:S\to E$ an isometry; $T_{a,0}$ and $T_{b,0}$ are the support inclusion. This diagonalizes the given arbitrary $\sigma$, without assuming it is diagonal in a prescribed basis or increasing the environment dimension by purification.

**One actual evolution makes the histories compatible.** Set

$$
F_a=\operatorname{span}\{T_{a,n}S:0\le n<N\}.
$$

On each generating vector the actual $W$ satisfies

$$
W(a\otimes T_{a,n}e)=a\otimes T_{a,n+1}e.
$$

Thus $W$ maps $a\otimes F_a$ into $a\otimes E$, defining a single linear isometry $L_a:F_a\to E$ with $L_aT_{a,n}e=T_{a,n+1}e$. Any linear combination of history vectors that vanishes still vanishes after applying the actual linear operator $W$. The assignment therefore respects every linear relation; compatibility of histories chosen independently at different times is not an extra assumption. Since $F_a$ and $L_a(F_a)$ have equal dimensions, their orthogonal complements in $E$ also have equal dimensions. Choosing an isometric bijection between these complements extends $L_a$ to a unitary $A$ on $E$. The same construction on the $b$ branch gives a unitary $B$. Induction yields

$$
A^ne=T_{a,n}e,\qquad B^ne=T_{b,n}e
\quad(e\in S,\ 0\le n\le N).
$$

These auxiliary operators reproduce only the occupied support histories within the window; they do not supply a global controlled decomposition of $W$.

**Coherence becomes a finite sum of unit-circle frequencies.** Define the auxiliary sequence $f_n=\Tr(A^n\sigma B^{-n})$ for $n\ge0$. Within the window, the partial trace of the actual off-diagonal input gives

$$
\begin{aligned}
\langle a,\Psi_n(O)b\rangle
&=\sum_j s_j\langle B^ne_j,A^ne_j\rangle\\
&=\Tr(A^n\sigma B^{-n})=f_n=\lambda^n.
\end{aligned}
$$

Outside the window this auxiliary sequence need not equal the actual readings from $W$. Spectrally decompose $A=\sum_i u_iP_i$ and $B=\sum_j v_jQ_j$, with $|u_i|=|v_j|=1$. Then

$$
\begin{aligned}
f_n&=\sum_{i,j}c_{ij}(u_i\overline{v_j})^n,\\
c_{ij}&=\Tr(P_i\sigma Q_j).
\end{aligned}
$$

These weights can be complex and cannot be treated as nonnegative probabilities. For arbitrary densities one also cannot directly reuse the positive Gram matrix and orthogonal-innovation argument for a maximally mixed state. Combine equal frequencies and discard terms whose combined weight is zero to obtain $f_n=\sum_{\ell=1}^K\alpha_\ell\omega_\ell^n$, where $|\omega_\ell|=1$. Each unitary has at most $d$ distinct eigenvalues, and $f_0=\Tr\sigma=1$ ensures at least one term remains. Hence $1\le K\le d^2$.

Finite Prony annihilation needs only the polynomial

$$
q(z)=\prod_{\ell=1}^K(z-\omega_\ell)=\sum_{j=0}^K q_jz^j.
$$

Substitution gives $\sum_{j=0}^Kq_jf_j=\sum_\ell\alpha_\ell q(\omega_\ell)=0$, without positive weights. If $N\ge K$, the geometric values within the window would give $q(\lambda)=0$. This is impossible: all roots of $q$ lie on the unit circle, whereas $|\lambda|<1$. Thus $N<K\le d^2$, or $N+1\le d^2$. Zero and negative $\lambda$ are included: the zeroth power is always $1$, and at $\lambda=0$ one has $q(0)=(-1)^K\prod_\ell\omega_\ell\ne0$. The endpoints $\lambda=\pm1$ violate strict contraction, so this contradiction does not apply there.

For qubit dephasing take $m=2,a=e_0,b=e_1$: the diagonal pure states stay fixed and the off-diagonal entries acquire the factor $\lambda^n$, exactly as required. Consequently, at $d=2$ one has $N\le3$: no initial environment density can support an exact common prefix through the fourth step. This is a necessary bound for the stated autonomous model; qutrit attainment for four steps is given separately in [@rem-four-step-qutrit]. The bound alone supplies no exact minimum environment dimension for general windows, general attainability, approximate error bound, or physical realization of arbitrary spectral moment data, and it is not a universal physical law. Unperturbed marginal channel identities likewise do not determine the full joint-state histories of a retained environment or a process tensor with intermediate interventions. The formal status of this generic application remains unsettled; verification of its components does not make it a Lean-verified statement.
:::

::: {.remark #rem-four-step-qutrit title="Four Common Steps with a Qutrit Environment (Written Derivation)"}

**Ordinary written derivation, not formalized in this book.** The preceding necessary bound excludes a two-level environment for four steps but supplies no three-level realization. Split the environment into a stationary line and a rotating two-dimensional block. The line contributes a constant; the trace overlap of two conditional rotations contributes two cosines. With suitable angles and weights, the first four nontrivial powers of one six-dimensional unitary produce the required geometric coherence. The rotating block is a complex two-dimensional subspace, and the trace overlap is an algebraic mechanism; no random environment is refreshed over time.

**Objects and quantifiers.** Fix any real $-1<\lambda<1$, with system $S=\mathbb C^2$ and environment $E=\mathbb C^3$. For every complex matrix $X=(x_{ij})\in M_2(\mathbb C)$, define

$$
\mathcal D_\lambda(X)=
\begin{pmatrix}x_{00}&\lambda x_{01}\\\lambda x_{10}&x_{11}\end{pmatrix},
\qquad \mathcal D_\lambda^0=\operatorname{id}.
$$

This map is also $\frac{1+\lambda}{2}X+\frac{1-\lambda}{2}Z_SXZ_S$, where $Z_S=\operatorname{diag}(1,-1)$, so zero and negative $\lambda$ also define channels. For each fixed $\lambda$, we choose $W,\sigma$ once, then cover every input and all $n=0,1,2,3,4$ simultaneously. The realization is not chosen anew for each input or time. The zeroth power is $1$, including at $\lambda=0$.

**Explicit parameters.** All parameters below depend only on $\lambda$:

$$
\begin{aligned}
D&=\sqrt{\lambda^2+2\lambda+5},&
p&=\frac{1+\lambda}{5-3\lambda},\\
k&=\frac{2\lambda}{D},&r&=\sqrt{1-k^2},\\
x_+&=\frac{\lambda-1+D}{4},&x_-&=\frac{\lambda-1-D}{4},\\
\theta_+&=\arccos x_+,&\theta_-&=\arccos x_-,\\
\alpha&=\frac{\theta_++\theta_-}{2},&
\beta&=\frac{\theta_--\theta_+}{2}.
\end{aligned}
$$

Every denominator and square root has a specified domain. Since $D^2=(\lambda+1)^2+4>0$ and $5-3\lambda>2$,

$$
\begin{aligned}
0<p<1,\qquad 1-p&=\frac{4(1-\lambda)}{5-3\lambda}>0,\\
1-k^2&=\frac{(\lambda+1)(5-3\lambda)}{D^2}>0.
\end{aligned}
$$

Thus $-1<k<1$ and $r>0$. The nodes are the roots of $q(x)=x^2-\frac{\lambda-1}{2}x-\frac{\lambda+1}{4}$. The signs $q(-1)=(\lambda+1)/4>0$, $q(0)=-(\lambda+1)/4<0$, and $q(1)=(5-3\lambda)/4>0$ give $-1<x_-<0<x_+<1$. Both inverse cosines therefore lie in $(0,\pi)$, with $\alpha-\beta=\theta_+$ and $\alpha+\beta=\theta_-$.

**Fixed matrices.** On the two-dimensional environment block, write the Pauli matrices as $Z,X_P$ to distinguish them from the arbitrary system input $X$:

$$
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
X_P=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
H=kZ+rX_P.
$$

On $E=\mathbb C\oplus\mathbb C^2$, take

$$
\begin{aligned}
A&=1\oplus A_2,\qquad A_2=\cos\alpha\,I_2+\mathrm i\sin\alpha\,Z,\\
B&=1\oplus B_2,\qquad B_2=\cos\beta\,I_2+\mathrm i\sin\beta\,H,\\
A&=\begin{pmatrix}
1&0&0\\0&e^{\mathrm i\alpha}&0\\0&0&e^{-\mathrm i\alpha}
\end{pmatrix},\\
B&=\begin{pmatrix}
1&0&0\\
0&\cos\beta+\mathrm i k\sin\beta&\mathrm i r\sin\beta\\
0&\mathrm i r\sin\beta&\cos\beta-\mathrm i k\sin\beta
\end{pmatrix},\\
\sigma&=\operatorname{diag}\left(p,\frac{1-p}{2},\frac{1-p}{2}\right).
\end{aligned}
$$

Let $P_0=\lvert0\rangle\langle0\rvert$ and $P_1=\lvert1\rangle\langle1\rvert$ be system projections, and define the single joint unitary used throughout:

$$
W=P_0\otimes A+P_1\otimes B
=\begin{pmatrix}A&0_3\\0_3&B\end{pmatrix}
\quad\text{on }\mathbb C^2\otimes\mathbb C^3.
$$

Here $W$ is a $6\times6$ matrix. The identities $Z^*=Z$, $X_P^*=X_P$, $Z^2=X_P^2=I_2$, and $ZX_P+X_PZ=0$ give $H^*=H$ and $H^2=(k^2+r^2)I_2=I_2$. Every self-adjoint involution $K$ satisfies $(\cos t\,I+\mathrm i\sin t\,K)(\cos t\,I-\mathrm i\sin t\,K)=I$, so $A,B,W$ are unitary. The three diagonal entries of $\sigma$ are strictly positive and sum to $1$. Thus $\sigma$ is a full-rank density and commutes with $A,B$. Full rank is a choice for this witness, not a hypothesis on all realizations; the controlled form is likewise this construction, not a restriction on arbitrary $W$ in the preceding necessary bound.

**How the common powers produce two cosines.** Multiplication and the angle addition formulas give, by induction for a self-adjoint involution,

$$
\begin{aligned}
A_2^n&=\cos(n\alpha)I_2+\mathrm i\sin(n\alpha)Z,\\
B_2^{-n}&=\cos(n\beta)I_2-\mathrm i\sin(n\beta)H
\qquad(n\ge0).
\end{aligned}
$$

Using $\Tr Z=\Tr H=0$ and $\Tr(ZH)=2k$, the actual coherence multiplier is

$$
\begin{aligned}
f_n&=\Tr(A^n\sigma B^{-n})=p+(1-p)g_n,\\
g_n&=\tfrac12\Tr(A_2^nB_2^{-n})\\
&=\cos(n\alpha)\cos(n\beta)+k\sin(n\alpha)\sin(n\beta)\\
&=w\cos(n\theta_+)+(1-w)\cos(n\theta_-),\\
w&=\frac{1+k}{2}=\frac12+\frac{\lambda}{D}\in(0,1).
\end{aligned}
$$

This keeps the order $A^nB^{-n}$; it does not replace that product by $(AB^{-1})^n$ or require $A,B$ to commute. Let $T_n$ be the first-kind Chebyshev polynomial, with $T_n(\cos\theta)=\cos(n\theta)$. Then $g_n=wT_n(x_+)+(1-w)T_n(x_-)$.

**Exact moments for the first four steps.** Put $M_j=wx_+^j+(1-w)x_-^j$. The quadratic equation for the nodes gives

$$
\begin{aligned}
M_0&=1,\qquad M_1=\frac{3\lambda-1}{4},\\
M_{j+2}&=\frac{\lambda-1}{2}M_{j+1}
+\frac{\lambda+1}{4}M_j\qquad(j\ge0).
\end{aligned}
$$

Substituting the recurrence into $T_0=1$, $T_1=x$, $T_2=2x^2-1$, $T_3=4x^3-3x$, and $T_4=8x^4-8x^2+1$ gives each value explicitly:

$$
\begin{aligned}
g_0&=1,\\
g_1&=\frac{3\lambda-1}{4},\\
g_2&=\frac{3\lambda^2-2\lambda-1}{4},\\
g_3&=\frac{3\lambda^3-2\lambda^2-2\lambda-1}{4},\\
g_4&=\frac{3\lambda^4-2\lambda^3-2\lambda^2-2\lambda-1}{4}.
\end{aligned}
$$

For $1\le n\le4$, these have the common expression $4g_n=3\lambda^n-2\sum_{j=1}^{n-1}\lambda^j-1$, with an empty sum equal to zero. Using $(1-\lambda)\sum_{j=1}^{n-1}\lambda^j=\lambda-\lambda^n$, without dividing by $\lambda$, yields

$$
\begin{aligned}
f_0&=p+(1-p)=1,\\
f_n&=\frac{1+\lambda+4(1-\lambda)g_n}{5-3\lambda}
=\lambda^n\qquad(1\le n\le4).
\end{aligned}
$$

For example, at $\lambda=0$ one has $p=1/5$, $k=0$, $r=1$, and $x_\pm=(-1\pm\sqrt5)/4$. The same formulas give $(f_0,f_1,f_2,f_3,f_4)=(1,0,0,0,0)$ directly. Negative $\lambda$ uses the same formulas and identities, with no separate change in the dynamics.

**From the scalar to the entire channel.** Write $E_{ij}=\lvert i\rangle\langle j\rvert$. Orthogonality of the system projections gives $W^n=P_0\otimes A^n+P_1\otimes B^n$. The environmental trace on each diagonal matrix unit is $1$; the off-diagonal units acquire $f_n$ and $\overline{f_n}$. Hence for every $X\in M_2(\mathbb C)$,

$$
\begin{aligned}
\Psi_n(X)&:=\Tr_E\bigl(W^n(X\otimes\sigma)W^{-n}\bigr)\\
&=\begin{pmatrix}x_{00}&f_nx_{01}\\\overline{f_n}x_{10}&x_{11}\end{pmatrix}\\
&=\mathcal D_\lambda^n(X)=\mathcal D_{\lambda^n}(X)
\qquad(0\le n\le4).
\end{aligned}
$$

For any positive integer $s$ and finite untouched reference $R=\mathbb C^s$, expand an arbitrary system–reference matrix as $Y=\sum_{a,b}X_{ab}\otimes F_{ab}$, where $F_{ab}$ are reference matrix units. In the $S\otimes R\otimes E$ order used by $Y\otimes\sigma$, explicitly define the canonical unitary permutation and the actual evolution:

$$
\begin{aligned}
J&:S\otimes R\otimes E\longrightarrow S\otimes E\otimes R,\\
J(u\otimes v\otimes z)&=u\otimes z\otimes v,\\
\widehat{W}&=J^{-1}(W\otimes I_R)J,\\
\widehat{W}^{\,n}&=J^{-1}(W^n\otimes I_R)J.
\end{aligned}
$$

The permutation fixes the tensor notation; $\widehat{W}$ acts as the identity on the reference and always uses the same $W$. Applying the preceding identity to each $X_{ab}$ gives

$$
\begin{aligned}
&\Tr_E\bigl[\widehat{W}^{\,n}(Y\otimes\sigma)
\widehat{W}^{-n}\bigr]\\
&\qquad=(\mathcal D_\lambda^n\otimes\operatorname{id}_R)(Y)
\qquad(0\le n\le4).
\end{aligned}
$$

This includes every possibly entangled system–reference density. The initial environment must be independent of the system–reference input. It is prepared once, and the same $W,E,\sigma$ serves every time, with no intermediate intervention, reset, environment replacement, or external clock control. No later refactorization of the joint state is assumed.

**Known scalar method and realization limits.** The nodes $1,x_+,x_-$ and weights $p,(1-p)w,(1-p)(1-w)$ are related to the three-node Gauss–Radau endpoint rule for Poisson–Chebyshev moments: these three nodes match every polynomial moment of degree at most four. This is a known scalar moment method. The evidence here is the direct formulas and the $1+2$ block realization above, rather than an unchecked quadrature theorem. Arbitrary scalar quadrature nodes and weights need not be realizable by common unitary powers in a prescribed environment dimension. See the [account of Radau quadrature](https://mathworld.wolfram.com/RadauQuadrature.html) for the known method; no worldwide mathematical novelty is claimed for this construction.

Combining this construction with the still unformalized arbitrary-density bound in [@rem-arbitrary-density-prefix], $N=4$ gives $5\le d^2$, excluding $d\le2$, while the construction attains $d=3$. Thus, for every $-1<\lambda<1$, the minimum four-step environment dimension, allowing any initial environment density, is $3$ at the level of ordinary written derivation in this precisely defined autonomous qubit dephasing model. This is not a Lean minimality result. The full channel and reference identities remain unformalized; existing Lean checks cover only some parameter, matrix, and trace identities and do not verify the full conclusion. The construction and partial formal evidence are documented in the [result note for trureturing #31054](https://github.com/the-omega-institute/trureturing/issues/31054#issuecomment-6903256672).

Continuing the same recurrence to $T_5=16x^5-20x^3+5x$ gives

$$
\begin{aligned}
g_5&=\frac{3\lambda^5-2\lambda^4-2\lambda^3-5\lambda^2+4}{4},\\
f_5-\lambda^5&=1-\lambda^2>0.
\end{aligned}
$$

Thus these matrices fail at the fifth step; they do not exclude another qutrit construction. Exact minimum dimensions for general windows, realization of general compatible trace moments, and the full approximate resource–error tradeoff remain unresolved; the next remark preserves the weighted history interface under small leakage. This construction does not extend to the balanced ten-dimensional source channel. It supplies neither a full retained-environment joint-history identity nor a process-tensor identity with inserted interventions, and it establishes no experimental support or model universality.

**What finite unitary dilation still leaves to prove.** Farenick's [finite-power unitary dilation theorem, Corollary 3.2](https://doi.org/10.1007/s44146-024-00170-6), represents any prescribed finite window of powers of a contraction as compressions of the powers of one unitary on a containing space. If the original space is finite-dimensional, the dilating space can also be chosen finite-dimensional. The theorem permits a choice of dilating space; it does not fix the three-dimensional environment required here or supply one pair of branch unitaries and one positive semidefinite initial state. Finite-power dilatability therefore does not yet answer the fifth-step question. The missing construction must preserve these common-realization constraints, beyond the existence of scalar moments.

:::

::: {.remark #rem-weighted-history-stability title="Weighted histories under small leakage with fixed unitaries (written derivation)"}

**Ordinary written derivation, not formalized in this book.** View the joint evolution as motion between two system branches. Compression back into a branch can shorten a vector; the escaped part remains in the actual joint history and may return later. Polar decomposition separates this compression into a positive shortening and a unitary motion. Even with zero directions, the unitary motion can be completed within the original environment. A single such motion follows the actual history, with errors accumulating additively in the number of steps. This remark preserves the [existing complete ordinary argument](https://github.com/the-omega-institute/trureturing/issues/31078#issuecomment-6904102516), without asserting a new formal result.

**Objects, norms, and quantifiers.** Let $d,N\ge1$ be arbitrary integers, take a unitary on $\mathbb C^2\otimes\mathbb C^d$, denoted $W\in M_{2d}(\mathbb C)$, and let $\sigma\in M_d(\mathbb C)$ be any positive semidefinite matrix of trace one. A star denotes the adjoint. For any rectangular complex matrix $M$, the Hilbert–Schmidt and operator norms mean, respectively,

$$
\begin{aligned}
\|M\|_{\mathrm{HS}}^2&=\Tr(M^*M)=\sum_{i,j}|M_{ij}|^2,\\
\|M\|_{\mathrm{op}}&=\sup_{\|v\|_2\le1}\|Mv\|_2.
\end{aligned}
$$

The operator norm measures the largest amplification of a vector. Calling a block a contraction below means that its operator norm is at most one, rather than imposing a bound of one on its Hilbert–Schmidt norm. With $e_0,e_1$ the standard system basis, define

$$
\begin{aligned}
S&=\sqrt{\sigma}\in M_d(\mathbb C),\qquad S^*=S,\quad S^2=\sigma,\\
J_b&:\mathbb C^d\longrightarrow\mathbb C^2\otimes\mathbb C^d,
\qquad J_bv=e_b\otimes v,\\
P_b&=J_bJ_b^*,\qquad Q_b=I_{2d}-P_b
\qquad(b\in\{0,1\}),\\
L_N&=\max_{\substack{b\in\{0,1\}\\0\le k\le N}}
\|Q_bW^kJ_bS\|_{\mathrm{HS}}^2,\qquad
\epsilon=\sqrt{L_N}.
\end{aligned}
$$

Here $k$ is an integer. The matrices $P_b,Q_b\in M_{2d}(\mathbb C)$ are orthogonal projections, $J_b^*J_b=I_d$, and $\|S\|_{\mathrm{HS}}^2=\Tr\sigma=1$. The quantity $L_N$ uses the **actual weighted history** of the same $W,\sigma$ on both branches from time zero through time $N$. It is neither one-step leakage, a collection of separately chosen realizations, nor an unweighted operator norm. For every set of these data, the original $\mathbb C^d$ admits unitaries $A_0,A_1$ that, once chosen, simultaneously satisfy for every integer $0\le n\le N$

$$
\max_{\substack{b\in\{0,1\}\\0\le n\le N}}
\|W^nJ_bS-J_bA_b^nS\|_{\mathrm{HS}}
\le4N\sqrt{L_N}.
$$

The constant $4$ is independent of $d,N,W,\sigma$; no optimality is claimed. The full derivation follows.

**Compression and one polar completion.** Fix either branch $b\in\{0,1\}$, abbreviate $J=J_b,P=P_b,Q=Q_b$, and define blocks on the original spaces by

$$
\begin{aligned}
K&=J^*WJ\in M_d(\mathbb C),&
R&=QWJ\in M_{2d\times d}(\mathbb C),\\
B&=J^*WQ\in M_{d\times2d}(\mathbb C),&
E&=QWQ\in M_{2d}(\mathbb C).
\end{aligned}
$$

Since $J$ is an isometry, $Q$ an orthogonal projection, and $W$ unitary, the operator norms of $K,R,B,E$ are at most one. In particular, left multiplication by either of $B,E$ cannot increase the Hilbert–Schmidt norm of a matrix with compatible rows: apply vector contraction to each column and sum the squared norms. Direct block multiplication gives

$$
\begin{aligned}
K^*K+R^*R
&=J^*W^*(P+Q)WJ\\
&=J^*W^*WJ=I_d.
\end{aligned}
$$

Finite-dimensional square polar decomposition admits a unitary completion even in the singular case:

$$
K=AH,\qquad A^*A=AA^*=I_d,\qquad
H=(K^*K)^{1/2},\qquad 0\le H\le I_d.
$$

Here $A,H\in M_d(\mathbb C)$. Each of the eigenvalues of $H$, denoted $h$, is nonnegative and satisfies $h^2\le1$, hence satisfies $h\in[0,1]$. Choose $A$ once from the fixed matrix $K$. The static polar step is supported by Higham, *Computing the Polar Decomposition—with Applications*, DOI [10.1137/0907079](https://doi.org/10.1137/0907079), [full text](https://eprints.maths.manchester.ac.uk/694/1/high86p.pdf), Theorem 1.1 and Lemma 2.1. These supply square unitary completion and identify the positive square root; they do not supply the weighted history bound below.

**Polar error for any rectangular weight.** In a unitary eigenbasis of $H$, the eigenvalues of $2H(I_d-H)$ are $2h(1-h)\ge0$, so

$$
D:=(I_d-H^2)-(I_d-H)^2=2H(I_d-H)\ge0.
$$

For every natural number $r$ and every rectangular matrix $X\in M_{d\times r}(\mathbb C)$, congruence gives $X^*DX\ge0$, with nonnegative trace equal to the sum over columns $x_j$ of their quadratic forms $\sum_j x_j^*Dx_j$. Thus, without requiring $X$ to commute with $H$, we obtain

$$
\begin{aligned}
\|(K-A)X\|_{\mathrm{HS}}^2
&=\Tr\bigl(X^*(I_d-H)^2X\bigr)\\
&\le\Tr\bigl(X^*(I_d-H^2)X\bigr)\\
&=\Tr(X^*R^*RX)=\|RX\|_{\mathrm{HS}}^2.
\end{aligned}
$$

The first equality uses $K-A=A(H-I_d)$ and $A^*A=I_d$; the last uses $I_d-H^2=R^*R$. Traces of the positive semidefinite matrices here are real. In particular, set $T_k=J^*W^kJ\in M_d(\mathbb C)$ and substitute the actual weight $X=T_kS$. Since $S^2=\sigma$, cyclicity of trace gives

$$
\begin{aligned}
\|(K-A)T_kS\|_{\mathrm{HS}}^2
&=\Tr\bigl(\sigma T_k^*(I_d-H)^2T_k\bigr)\\
&\le\Tr\bigl(\sigma T_k^*(I_d-H^2)T_k\bigr)\\
&=\|RT_kS\|_{\mathrm{HS}}^2.
\end{aligned}
$$

This comparison uses positive semidefinite congruence followed by trace. Factors are moved only cyclically inside the trace; $\sigma,T_k,H$ are never commuted, and no eigenvalue of $\sigma$ is divided out.

**Recurrence along the actual trajectory.** For every integer $0\le k\le N$, define

$$
\begin{aligned}
x_k&=J^*W^kJS=T_kS\in M_d(\mathbb C),\\
y_k&=QW^kJS\in M_{2d\times d}(\mathbb C),\\
W^kJS&=Jx_k+y_k,\qquad Qy_k=y_k,\\
x_0&=S,\qquad y_0=0,\qquad
\|y_k\|_{\mathrm{HS}}\le\epsilon.
\end{aligned}
$$

Apply the same $W$ to this decomposition and project onto its two components. For every integer $0\le k<N$ this gives

$$
\begin{aligned}
x_{k+1}&=Kx_k+By_k,\\
y_{k+1}&=Rx_k+Ey_k,\\
\|Rx_k\|_{\mathrm{HS}}
&=\|y_{k+1}-Ey_k\|_{\mathrm{HS}}\\
&\le\|y_{k+1}\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le2\epsilon.
\end{aligned}
$$

Put $r_k=x_{k+1}-Ax_k\in M_d(\mathbb C)$. Apply the rectangular comparison to the actual matrix $X=x_k$ and use contraction by $B$ to obtain

$$
\begin{aligned}
r_k&=(K-A)x_k+By_k,\\
\|r_k\|_{\mathrm{HS}}
&\le\|(K-A)x_k\|_{\mathrm{HS}}+\|By_k\|_{\mathrm{HS}}\\
&\le\|Rx_k\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le3\epsilon.
\end{aligned}
$$

**Additive telescoping with a fixed unitary.** Fix an integer $1\le n\le N$ and put $f(k)=A^{n-k}x_k$ for $0\le k\le n$. For $k<n$, we have

$$
\begin{aligned}
f(k+1)-f(k)&=A^{n-1-k}(x_{k+1}-Ax_k)
=A^{n-1-k}r_k,\\
x_n-A^nS&=f(n)-f(0)
=\sum_{k=0}^{n-1}A^{n-1-k}r_k,\\
\|x_n-A^nS\|_{\mathrm{HS}}
&\le\sum_{k=0}^{n-1}\|r_k\|_{\mathrm{HS}}
\le3n\epsilon.
\end{aligned}
$$

This sums consecutive matrix differences in the additive group and uses invariance of the Hilbert–Schmidt norm under unitary left multiplication. Finally, the isometry $J$ and the triangle inequality give

$$
\begin{aligned}
\|W^nJS-JA^nS\|_{\mathrm{HS}}
&=\|J(x_n-A^nS)+y_n\|_{\mathrm{HS}}\\
&\le3n\epsilon+\epsilon=(3n+1)\epsilon\\
&\le4N\epsilon\qquad(1\le n\le N).
\end{aligned}
$$

The last step uses $3n+1\le3N+1\le4N$; at $n=0$ the error is exactly zero. Choose the two polar completions $A_0,A_1$ independently and use their common $\epsilon=\sqrt{L_N}$ to obtain the stated maximum bound.

**Scope and remaining boundary.** If $L_N=0$, all errors are exactly zero; the argument never divides by $\epsilon$. It includes rank-deficient $\sigma$ and $\sigma$ with arbitrarily small positive eigenvalues: it uses only $S=\sqrt\sigma$, with no inverse, full-rank condition, or spectral gap. The environment remains the original $\mathbb C^d$, with no purification, enlargement, reset, intervention, or time-dependent $A_b$, and no assumption of later factorization of the joint state. The compression $K$ need not be normal. No identification of $T_k$ with $K^k$ is made; excursions and returns remain in the actual $y_k$.

Static polar completion and positivity of positive semidefinite trace pairing are reusable supplies in the existing sources and are not counted here as new mathematics. A complete Lean formalization of the result has not been verified; the ordinary derivation does not constitute Lean verification. This history interface also supplies no uniform quantitative comparison with the target dephasing channel in diamond norm or over arbitrary finite untouched references, and no quantitative lower bound or realizing upper construction for actually realizable common-power frequency histories. The full resource–error tradeoff for general windows remains open. No successor event is selected or proved here, and no worldwide novelty or physical universality is claimed.

:::

::: {.remark #rem-maxmixed-saturation-obstruction title="A capacity obstruction to saturated moments for a maximally mixed environment (ordinary derivation)"}

**Ordinary derivation, not formalized in this book.** The preceding dimension bound allows the number of samples to equal the dimension of the matrix space, but does not guarantee that this boundary is attainable. The obstruction is one of capacity: a first moment close to one requires almost all the probability to lie in a short arc of the unit circle. Saturation of the moment conditions allows at most two nodes in that arc, while a maximally mixed initial state caps the probability at each node. The following gives the full finite-dimensional argument from the [original result and its scope](https://github.com/the-omega-institute/trureturing/issues/31099#issuecomment-6904917000).

**Objects and the proposed saturation.** Fix an integer $d\ge2$ and a real number $0<r<1$, and put $m=d^2$. On the same $\mathbb C^d$, let $A,B\in U(d)$ be any two unitaries; they need not commute. Define the normalized trace sequence of their common powers, and suppose that it matches the saturated window:

$$
f_n=\frac1d\operatorname{Tr}(A^nB^{-n})=r^n
\qquad(0\le n\le m-1).
$$

All step indices here and below are integers. The aim is a necessary inequality for this condition and an explicit parameter that violates it, rather than a classification of optimal dimensions for all windows.

**Spectral weights and support.** Diagonalize each unitary, allowing repeated eigenvalues:

$$
\begin{aligned}
A&=V\operatorname{diag}(a_0,\ldots,a_{d-1})V^*,\\
B&=W\operatorname{diag}(b_0,\ldots,b_{d-1})W^*,\qquad U=V^*W,\\
z_{ij}&=a_i\overline{b_j},\qquad |z_{ij}|=1,\\
w_{ij}&=\frac{|U_{ij}|^2}{d},\qquad
0\le w_{ij}\le\frac1d,\qquad
\sum_{i,j=0}^{d-1}w_{ij}=1,\\
\mu&=\sum_{i,j=0}^{d-1}w_{ij}\delta_{z_{ij}},\qquad
f_n=\int z^n\,\mathrm d\mu(z).
\end{aligned}
$$

The star denotes conjugate transpose, and $\delta_z$ is unit point mass at $z$. Expanding the trace gives the last identity. The squared moduli in each row of a unitary sum to one, giving both the total weight and the bound on each entry. Thus $\mu$ is a positive probability measure supported on at most $m$ points. At this stage, however, coincident ratios could merge into an atom of mass larger than $1/d$. Distinctness must be proved before applying the node capacity. Since the weights are real and nonnegative, conjugation determines the negative moments:

$$
\int z^q\,\mathrm d\mu(z)=r^{|q|}
\qquad(-(m-1)\le q\le m-1).
$$

**Saturation forces every node to be present and distinct.** Use the measure-induced positive semidefinite pairing $\langle p,q\rangle_\mu=\int\overline{p(z)}q(z)\,\mathrm d\mu(z)$. The monomial Gram matrix is

$$
T_{jk}=\langle z^j,z^k\rangle_\mu=r^{|j-k|}
\qquad(0\le j,k\le m-1).
$$

Replace the basis by the constant $1$ and $g_k(z)=z^k-rz^{k-1}$ for $1\le k\le m-1$. This triangular change of basis has ones on its diagonal. Direct substitution of the known moments gives

$$
\begin{aligned}
\langle1,g_k\rangle_\mu&=r^k-r\,r^{k-1}=0,\\
\langle g_j,g_k\rangle_\mu
&=r^{k-j}-r\,r^{k-j-1}-r\,r^{k-j+1}
+r^2r^{k-j}=0\quad(1\le j<k\le m-1),\\
\|1\|_\mu^2&=1,\qquad
\|g_k\|_\mu^2=1-2r^2+r^2=1-r^2>0.
\end{aligned}
$$

Thus $T$ is positive definite and has rank $m$. If merging coincident atoms and removing zero masses leaves $K$ support points, the Gram matrix factors through evaluation at those points and has rank at most $K$. Hence $m\le K\le m$. There were only $m$ index pairs to begin with, so every $w_{ij}>0$ and all the $z_{ij}$ are distinct. Each actual atom now has its original mass $w_{ij}\le1/d$. Repeated eigenvalues or zero overlaps provide no hidden exception: they would reduce the support and are excluded by full rank.

**The node polynomial uses only the given moment orders.** Write these $m$ nodes as $\zeta_1,\ldots,\zeta_m$, and define the monic annihilating polynomial and the linear functionals

$$
\begin{aligned}
P(z)&=\prod_{\ell=1}^{m}(z-\zeta_\ell),\\
L_k(F)&=\int z^{-k}F(z)\,\mathrm d\mu(z)
\qquad(1\le k\le m-1,\ \deg F\le m).
\end{aligned}
$$

Since $P$ vanishes on the support, every $L_k(P)=0$. On $\operatorname{span}(z,\ldots,z^{m-1})$, the matrix of these functionals is the corresponding positive definite principal submatrix of $T$, so their joint rank is $m-1$. The space of polynomials of degree at most $m$ has dimension $m+1$, and the common kernel therefore has dimension two. Two linearly independent polynomials in it are

$$
\begin{aligned}
Q(z)&=z^m-rz^{m-1},\qquad R(z)=1-rz,\\
L_k(Q)&=r^{m-k}-r\,r^{m-1-k}=0,\\
L_k(R)&=r^k-r\,r^{k-1}=0
\qquad(1\le k\le m-1).
\end{aligned}
$$

Their different degrees make them linearly independent. Comparing leading coefficients gives $P=Q+cR$. Since every root has modulus one, the constant term satisfies $|c|=|P(0)|=\prod_{\ell=1}^m|\zeta_\ell|=1$. Each node therefore satisfies

$$
z^{m-1}\frac{z-r}{1-rz}=\tau,\qquad
\tau=-c,\qquad |\tau|=1.
$$

The denominator is nonzero because $|rz|=r<1$. In particular, although $Q$ has degree $m$, the highest moment order in $L_k(Q)$ is only $m-1$. No moment of order $m$ or higher has been used.

**A short closed arc contains at most two nodes.** Set

$$
\theta=\frac{\pi}{2(m-1)},\qquad
\mathcal A_\theta=\{e^{\mathrm it}: -\theta\le t\le\theta\}.
$$

On this arc choose the following continuous argument; the half-angle identity directly verifies that its exponential equals the indicated quotient:

$$
\begin{aligned}
\beta(t)&=2\arctan\left(\frac{1+r}{1-r}\tan\frac t2\right),\\
e^{\mathrm i\beta(t)}&=\frac{e^{\mathrm it}-r}{1-re^{\mathrm it}},\\
\beta'(t)&=\frac{1-r^2}{1-2r\cos t+r^2}>0
\qquad(-\theta\le t\le\theta).
\end{aligned}
$$

Since $d\ge2$, the whole arc lies strictly within $-\pi<t<\pi$, where this tangent is continuous. The real arctangent takes values strictly between $-\pi/2$ and $\pi/2$, so $\beta(\theta)-\beta(-\theta)<2\pi$. Put $h(t)=(m-1)t+\beta(t)$. Then

$$
\begin{aligned}
h'(t)&=m-1+\beta'(t)>0,\\
h(\theta)-h(-\theta)
&=2(m-1)\theta+\beta(\theta)-\beta(-\theta)<3\pi.
\end{aligned}
$$

For $\tau$, fix any argument $\alpha$. The node equation becomes $h(t)=\alpha+2\pi k$, with $k\in\mathbb Z$. Strict monotonicity assigns distinct integers to distinct nodes. Three nodes would require a phase difference of at least $4\pi$ between the first and last, contradicting the variation bound. This count includes both endpoints of the arc. Consequently,

$$
\mu(\mathcal A_\theta)\le\frac2d,\qquad
\mu(\mathbb T\setminus\mathcal A_\theta)\ge1-\frac2d,
\qquad \mathbb T=\{z\in\mathbb C:|z|=1\}.
$$

**The necessary capacity inequality and an exact counterexample.** Outside the arc, $1-\operatorname{Re}z\ge1-\cos\theta$; on the whole circle this integrand is nonnegative. The first moment gives

$$
\begin{aligned}
1-r&=\int(1-\operatorname{Re}z)\,\mathrm d\mu(z)\\
&\ge\left(1-\frac2d\right)(1-\cos\theta)\\
&=\left(1-\frac2d\right)
\left(1-\cos\frac{\pi}{2(d^2-1)}\right).
\end{aligned}
$$

For each $d\ge3$, this is a nontrivial necessary condition for saturation with a maximally mixed state. Take $d=3$ and $r=999/1000$, so $m=9$ and $\theta=\pi/16$. Concavity of sine on $[0,\pi/2]$ places it above the chord between the endpoints: $\sin x\ge2x/\pi$. Hence

$$
\begin{aligned}
\sin\frac{\pi}{32}&\ge\frac1{16},\\
1-\cos\frac{\pi}{16}
&=2\sin^2\frac{\pi}{32}\ge\frac1{128},\\
1-r&\ge\frac13\cdot\frac1{128}=\frac1{384},\\
1-r&=\frac1{1000}<\frac1{384}.
\end{aligned}
$$

This is a contradiction. The same calculation can be read directly as a shortage of capacity:

$$
\begin{aligned}
\mu(\mathcal A_{\pi/16})
&\ge1-\frac{1-r}{1-\cos(\pi/16)}
\ge1-\frac{128}{1000}=\frac{109}{125},\\
\frac{109}{125}-\frac23&=\frac{77}{375}>0.
\end{aligned}
$$

Thus no pair $A,B\in U(3)$ satisfies $f_n=r^n$ for $0\le n\le8$. This excludes every unitary pair, including noncommuting pairs; it is not a failed parametrization or numerical optimization. The argument does not even use all the compatibility conditions imposed by the grid of spectral ratios and weights that are squared moduli of a unitary.

**Zero and negative parameters, and a two-level environment.** Replacing $A$ by $-A$ replaces $f_n$ by $(-1)^nf_n$, so the parameter $r=-999/1000$ is also impossible in the same dimension. Zero has a different boundary: a saturated window exists for every positive integer $d$. Set

$$
\begin{aligned}
m&=d^2,\qquad \omega=e^{2\pi\mathrm i/m},\\
a_i&=\omega^i,\qquad b_j=\omega^{-dj},\\
F_{ij}&=\frac1{\sqrt d}e^{2\pi\mathrm i\,ij/d}
\qquad(0\le i,j<d),\\
A&=\operatorname{diag}(a_0,\ldots,a_{d-1}),\qquad
B=F\operatorname{diag}(b_0,\ldots,b_{d-1})F^*.
\end{aligned}
$$

A finite geometric sum shows that the columns of the Fourier matrix $F$ are orthonormal, so it is unitary. Each squared modulus in the relative eigenbasis is $1/d$, giving weights $1/d^2=1/m$. The ratios $a_i\overline{b_j}=\omega^{i+dj}$ run through all the $m$th roots of unity. This also covers $d=1$, whose window has no positive step. Therefore,

$$
f_0=1,\qquad
f_n=\frac1m\sum_{q=0}^{m-1}\omega^{qn}=0
\qquad(1\le n\le m-1).
$$

At zero the zeroth power is taken to be one. For $d=2$, the capacity inequality is trivial because $1-2/d=0$, consistent with the existing three-step construction using a maximally mixed two-level environment. Its proof need not be repeated here.

**From trace moments to actual channels, and the converse reduction.** To distinguish the joint unitary from the eigenbasis matrix above, denote it by $\mathcal W$. Let the system be $\mathbb C^2$ and fix the initial environment state $\sigma=I_d/d$, independent of the input. For a controlled joint unitary and system matrix units, write

$$
\begin{aligned}
E_{ab}&=|a\rangle\langle b|\quad(a,b\in\{0,1\}),\\
\mathcal W&=E_{00}\otimes A+E_{11}\otimes B,\\
\Psi_n(X)&=\operatorname{Tr}_E\bigl(\mathcal W^n(X\otimes I_d/d)\mathcal W^{*n}\bigr),\\
\Psi_n(E_{00})&=E_{00},\qquad \Psi_n(E_{11})=E_{11},\\
\Psi_n(E_{01})&=f_nE_{01},\qquad
\Psi_n(E_{10})=\overline{f_n}E_{10}.
\end{aligned}
$$

Both diagonal coefficients are one, by unit trace; the off-diagonal identities follow directly from the environment partial trace. Matrix units form a linear basis of all system matrices, so these identities determine the entire map. For any finite untouched reference $R$, write any system–reference matrix as $Y=\sum_{a,b=0}^1E_{ab}\otimes Y_{ab}$. Each reference block $Y_{ab}$ is unchanged, while its system block acquires the coefficient above. This includes inputs entangling the system and reference, provided the environment is independent of the entire input. After the standard reordering of tensor factors, the actual common evolution acts on the system and environment and as the identity on the reference.

Conversely, this exclusion for a maximally mixed state is not confined to an assumed controlled form. Write any joint unitary as a two-by-two matrix of environment blocks $\mathcal W=(C_{ab})_{a,b=0}^1$. If the one-step map exactly preserves both basis-state projectors, its wrong-output populations are

$$
\begin{aligned}
0&=\langle1,\Psi_1(E_{00})1\rangle
=\frac1d\operatorname{Tr}(C_{10}C_{10}^*)
=\frac1d\|C_{10}\|_{\mathrm{HS}}^2,\\
0&=\langle0,\Psi_1(E_{11})0\rangle
=\frac1d\operatorname{Tr}(C_{01}C_{01}^*)
=\frac1d\|C_{01}\|_{\mathrm{HS}}^2.
\end{aligned}
$$

The squared Hilbert–Schmidt norm is the sum of the squared moduli of all entries, so $C_{10}=C_{01}=0$. Joint unitarity then makes $C_{00},C_{11}$ unitary, giving a pair $A,B$. Full rank of the maximally mixed state makes the zero-leakage constraint apply to the entire environment space. Thus, if an actual channel with the same three-dimensional maximally mixed environment were to realize, at $0\le n\le8$, the dephasing powers with parameter $r=999/1000$ for all inputs, the counterexample already excludes it on $E_{01}$. An untouched reference cannot restore feasibility.

**Scope.** The argument uses one joint unitary and one initial preparation throughout, with no environment reset, replacement, enlargement, time-dependent control, or intermediate intervention. It does not assume that later system–environment states factorize. For a general initial density $\sigma$, the spectral coefficients are $\operatorname{Tr}(P_i\sigma Q_j)$, where $P_i,Q_j$ are the respective spectral projections of the two unitaries. Those coefficients may be complex and have neither the positive-probability interpretation nor the node capacity used here. This remark therefore does not refute dimension-attainability claims that allow arbitrary initial densities. The inequality is necessary only; sufficiency and optimality have not been proved. It does not classify feasibility for general windows, supply an approximation lower bound, or determine full joint-state histories or laws under intermediate interventions.

Orthogonal polynomials on the unit circle provide a neighboring classical framework: see Barry Simon, [arXiv:math/0405111](https://arxiv.org/abs/math/0405111), §1 for the recurrence and §2.1(c) for the Bernstein–Szegő case. Those passages are not cited as a theorem supplying this entire obstruction to the restricted realization. All node, phase, and capacity arguments needed here have been given explicitly. No worldwide novelty or physical universality is claimed. No complete Lean proof of this conclusion is available for citation in the book; this ordinary derivation does not constitute kernel verification.

:::

::: {.theorem #thm-positive-interior-grid-algebraic-obstruction title="An algebraic obstruction for an interior spectral grid" lean="D5/S3/Quantum/Analysis/PositiveInteriorGridObstruction.positive_interior_grid_algebraic_obstruction"}
Fix $0<r<1$, take complex numbers $u,v$, and take real numbers $s,t$. The following relations are incompatible:

$$
\begin{aligned}
u+v&=2,\\
us+vt+st+3-3(s+t)&=0,\\
s&=|u|^2,\qquad t=|v|^2,\qquad |uv|^2=r^2.
\end{aligned}
$$

The Lean statement splits the first two complex equations into real and imaginary parts and expresses each squared modulus as a sum of squares in real coordinates.
:::

::: {.proof #pf-positive-interior-grid-algebraic-obstruction}
If $\operatorname{Im}u\ne0$, then $v=2-u$ and the imaginary part of the second equation give $s=t$. Equal squared moduli force $\operatorname{Re}u=1$, so $r=|uv|=s>1$. If $u$ is real, then $v$ is real as well. Set $q=uv$ and use $u+v=2$ to write $s+t=4-2q$, $us+vt=u^3+v^3=8-6q$, and $st=q^2$. The second equation reduces to $q^2=1$, contradicting $r<1$.

The full proof is checked by the Lean kernel.
:::

In the maximally mixed spectral grid above, suppose saturation identifies nine distinct ratio nodes as the roots of $P(z)=z^9-rz^8+\eta(1-rz)$. Newton's identities give the unweighted grid sums $S_k=r^k$ for $k=1,2,3$. Write the two triples of unit-circle factors as $a_i,d_j$, with $d_j=b_j^{-1}$, and set $x=\sum_i a_i$, $y=\sum_j d_j$, $\alpha=\prod_i a_i$, and $\beta=\prod_j d_j$. Since $xy=r$, we can set $u=x^2/(\alpha\overline{x})$ and $v=y^2/(\beta\overline{y})$. The two second power sums are $x^2-2\alpha\overline x$ and $y^2-2\beta\overline y$. The third power sums are $x^3-3\alpha|x|^2+3\alpha$ and $y^3-3\beta|y|^2+3\beta$. Set $s=|x|^2$ and $t=|y|^2$, so $s=|u|^2$, $t=|v|^2$, and $|uv|=r$. Dividing $S_2=r^2$ by $x^2y^2$ gives $(1-2/u)(1-2/v)=1$, hence $u+v=2$. Dividing $S_3=r^3$ by $x^3y^3$ and multiplying by $uvst$ gives

$$
(us-3s+3)(vt-3t+3)=uvst.
$$

Expanding and substituting $u+v=2$ in the term $st(u+v)$ gives $us+vt+st+3-3(s+t)=0$, the other complex equation in [@thm-positive-interior-grid-algebraic-obstruction].

The Lean reference covers the contradiction from the reduced equations. The passage from trace moments of one pair of qutrit unitaries to saturated nodes, the grid, and the reduced equations remains a written derivation. Feasibility for arbitrary initial densities and shorter windows requires separate arguments. [Upstream proof and scope](https://github.com/the-omega-institute/trureturing/pull/31199)

Alongside energy-conserving $T_2$ dephasing stands energy-relaxing **amplitude damping** ($T_1$ spontaneous emission): an excited state at the south pole ($-1$) emits a quantum of energy into a cold bath and relaxes toward the ground state at the north pole ($+1$). Geometrically, the Bloch ball does not merely shrink around the origin — its center **drifts upward** along the vertical axis via the affine map [`dampedAxis`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.dampedAxis) $u \mapsto u' = (1 - \gamma)u + \gamma$ ($0 \le \gamma < 1$).

::: {.viz src="bloch-noise" preset="amp" height="500"}
**Shrink and drift north.** Amplitude damping with $\gamma = 0.3$ per step: the cyan ball shrinks while it drifts towards the north pole, more slowly across than up; the violet north pole $\lvert 0\rangle$ stays put, and the amber $\rho$ climbs all the way from the south pole towards it.
:::

When we measure transverse coherence contraction under this axial drift using monotone Riemannian metrics of quantum information geometry — comparing the symmetric logarithmic derivative profile $\varphi_{\mathrm{SLD}}(u) = 1$ against the right logarithmic derivative profile $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$ via [`coherenceRatio`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.coherenceRatio) $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\frac{\varphi(u')}{\varphi(u)}$ — their behavior at the pure ground-state boundary $u \to 1^-$ contrasts sharply!

::: {.proposition #prop-amplitude-damping-contraction title="SLD and RLD Coherence-Contraction Endpoints Under Amplitude Damping" lean="D5/S3/QuantumChannels/AmplitudeDampingContraction.amplitude_damping_sld_rld_endpoints"}
Let $0 \le \gamma < 1$, write $u'(\gamma, u) = (1 - \gamma)u + \gamma$ for the damped axial coordinate, and for a radial profile $\varphi : \mathbb{R} \to \mathbb{R}$ define the coherence contraction ratio $\mathcal{R}_\varphi(\gamma, u) = (1 - \gamma)\varphi(u'(\gamma, u)) / \varphi(u)$. With $\varphi_{\mathrm{SLD}}(u) = 1$ and $\varphi_{\mathrm{RLD}}(u) = \frac{1}{1 - u^2}$, both properties hold:

1. **Constant SLD contraction**: for all $u \in \mathbb{R}$, $\mathcal{R}_{\varphi_{\mathrm{SLD}}}(\gamma, u) = 1 - \gamma$;
2. **RLD interior bound and pure-boundary limit**: $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$ for every interior coordinate $u \in (-1, 1)$, and as $u$ approaches the pure boundary $1$ from below,

   $$
   \lim_{u \to 1^-} \mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = 1.
   $$

:::

::: proof
Claim 1 simplifies immediately since $\varphi_{\mathrm{SLD}}(u) = 1$. For claim 2 — packaged in Lean via the predicate [`HasPureBoundaryEndpoint`](lean:D5/S3/QuantumChannels/AmplitudeDampingContraction.HasPureBoundaryEndpoint), conjunction of the interior upper bound $\le 1$ on $u \in (-1, 1)$ and the left-neighborhood filter limit as $u \to 1^-$ — when $u \in (-1, 1)$ and $0 \le \gamma < 1$, note that $1 - u' = 1 - ((1 - \gamma)u + \gamma) = (1 - \gamma)(1 - u)$. Substituting $\varphi_{\mathrm{RLD}}(v) = \frac{1}{(1 - v)(1 + v)}$ cancels $(1 - \gamma)(1 - u)$ cleanly between numerator and denominator:

$$
\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) = (1 - \gamma)\cdot\frac{1 - u^2}{1 - u'^2} = (1 - \gamma)\cdot\frac{(1 - u)(1 + u)}{(1 - \gamma)(1 - u)(1 + u')} = \frac{1 + u}{1 + (1 - \gamma)u + \gamma}.
$$

Because $u < 1$ and $\gamma \ge 0$, subtracting numerator from denominator gives $\gamma(1 - u) \ge 0$ with positive denominator, proving $\mathcal{R}_{\varphi_{\mathrm{RLD}}}(\gamma, u) \le 1$ on $(-1, 1)$; letting $u \to 1^-$ sends both numerator and denominator continuously to $2$, yielding limit $\frac{2}{2} = 1$. The full proof is checked by the Lean kernel.
:::

We can now summarize the four workhorse single-qubit noise channels as simple three-dimensional deformations of the Bloch ball — no Kraus tables required:

| Noise Channel (Strictly Contracting Domain) | Affine Bloch Map $\vv{r} = (r_x, r_y, r_z) \mapsto \vv{r}'$ | Geometric Deformation of the Sphere | Fixed-Point Locus on Strictly Contracting Domain |
| :--- | :---: | :--- | :--- |
| **Phase Damping** ($0 \le c < 1$) | $(c\,r_x,\; c\,r_y,\; r_z)$ | Horizontal waist squeeze into a vertical cigar around $Z$ | $Z$-axis segment $(0, 0, r_z)$ |
| **Bit-Flip Channel** ($0 < p < 1$) | $\bigl(r_x,\; (1-2p)r_y,\; (1-2p)r_z\bigr)$ | Radial cylindrical squeeze toward the $X$ axis (with transverse sign flip for $p > \frac{1}{2}$) | $X$-axis segment $(r_x, 0, 0)$ |
| **Depolarizing Channel** ($0 < \lambda \le 1$) | $\bigl((1-\lambda)r_x,\; (1-\lambda)r_y,\; (1-\lambda)r_z\bigr)$ | Uniform isotropic contraction toward the origin | Bloch center $\vv{r} = \vv{0}$ only |
| **Amplitude Damping** ($0 < \gamma < 1$) | $\bigl(\sqrt{1-\gamma}\,r_x,\; \sqrt{1-\gamma}\,r_y,\; (1-\gamma)r_z + \gamma\bigr)$ | Ellipsoidal contraction + upward drift toward North $+\vv{e}_3$ | North pole $+\vv{e}_3 = (0, 0, 1)$ only |

(Note: At the **zero-noise identity endpoints** $c = 1$, $p = 0$, $\lambda = 0$, or $\gamma = 0$, each channel reduces to the identity map $\vv{r}' = \vv{r}$ and fixes the **entire Bloch ball**. At $p = 1$, the bit-flip map is the unitary $\pi$-rotation $\rho \mapsto X\rho X$, $\vv{r}' = (r_x, -r_y, -r_z)$ about the $X$ axis and preserves the distance between states; at $\gamma = 1$, amplitude damping resets the entire Bloch ball in one step to the pure north pole $+\vv{e}_3 = (0, 0, 1)$, so the output distance between any two states is zero.)

::: {.figure src="ch04-noise-gallery"}
**Four kinds of noise, four deformations.** Each panel is a vertical cross-section of the Bloch ball at half strength ($c = \frac{1}{2}$, $p = \frac{1}{4}$, $\lambda = \frac{1}{2}$, $\gamma = \frac{1}{2}$), drawn from the affine formulas of the table: the thin line is the original shell, cyan its image after one application, violet what stays fixed. Phase damping gives a tall narrow ellipse and fixes the vertical axis; bit flip a flat wide ellipse and fixes the $x$ axis; depolarizing a concentric circle of half the radius and fixes only the centre; amplitude damping shrinks the ball and lifts it until its top touches the north pole, which alone stays fixed. The affine forms in the table are literature results, not formalized in this book.
:::

The last row raises a geometric question: once the axial drift toward the ground-state north pole is fixed, **how much transverse length can remain before the ellipsoid pierces the sphere?** Let $\lambda$ now denote the common real retention factor of the two transverse coordinates, and consider

$$
F_{a,\lambda}(x,y,z) = (\lambda x,\,\lambda y,\,az+1-a), \qquad 0 \le a \le 1.
$$

The north pole $(0,0,1)$ stays fixed. The correspondence with the preceding notation is $a=1-\gamma$: expanding the existing axial coordinate gives exactly $\operatorname{dampedAxis}(1-a,z)=az+1-a$. Its relaxation interpretation is restricted here to **zero-temperature affine drift toward a fixed north pole with an isotropic transverse factor**.

::: {.theorem #thm-north-pole-ball-criterion title="Exact Criterion for a North-Pole Affine Map to Preserve the Whole Closed Unit Ball" lean="D5/S3/QuantumChannels/ContractionGeometry/NorthPoleBallCriterion.north_pole_ball_preserving_iff"}
Let $a,\lambda \in \mathbb{R}$ with $0 \le a \le 1$, allowing either sign of $\lambda$. The following are equivalent:

1. For every real $x,y,z$ satisfying $x^2+y^2+z^2 \le 1$,

   $$
   (\lambda x)^2+(\lambda y)^2+(az+1-a)^2 \le 1.
   $$

2. $\lambda^2 \le a$.
:::

::: proof
For sufficiency, bound the squared transverse radius using $\lambda^2 \le a$ and the input ball condition:

$$
\begin{aligned}
&\lambda^2(x^2+y^2)+(az+1-a)^2 \\
&\quad\le a(1-z^2)+(az+1-a)^2 \\
&\quad=1-a(1-a)(1-z)^2 \le 1.
\end{aligned}
$$

For necessity, construct a specific escaping point. If $\lambda^2>a$, set

$$
\begin{gathered}
\delta=\frac{\lambda^2-a}{\lambda^2+1}, \\
(x,y,z)=\bigl(\sqrt{\delta(2-\delta)},\,0,\,1-\delta\bigr).
\end{gathered}
$$

Since $0\le a$, we have $0<\delta\le1$, so the point is real and $x^2+y^2+z^2=1$. Using $\delta(\lambda^2+1)=\lambda^2-a$ and $\delta(\lambda^2-a^2)\le\delta(\lambda^2+1)$, its image exceeds the sphere's squared radius by

$$
\begin{aligned}
&\norm{F_{a,\lambda}(x,0,z)}^2-1 \\
&\quad=\delta\bigl[2(\lambda^2-a)-\delta(\lambda^2-a^2)\bigr] \\
&\quad\ge\delta(\lambda^2-a)>0.
\end{aligned}
$$

Thus the north-pole cap intuition has an exact criterion on the whole closed ball, including the endpoints $a=0$ and $a=1$. The full proof is checked by the Lean kernel.
:::

[@thm-north-pole-ball-criterion] gives the transverse bound $|\lambda|\le\sqrt a$. Pure amplitude damping in the table takes $\lambda=\sqrt a$, so $\lambda^2=a$ saturates this bound; additional transverse decay can make the inequality strict. In particular, $a=0$ forces $\lambda=0$, while $a=1$ permits exactly $|\lambda|\le1$. This criterion concerns ball preservation; complete positivity also imposes conditions on extended systems and cannot be inferred from this real-coordinate criterion alone.

::: {.figure src="ch04-ball-criterion"}
**How much transverse length may survive is set by the axial factor.** The green region is the criterion $\lambda^2 \le a$ of [@thm-north-pole-ball-criterion], bounded by the two branches $\lambda = \pm\sqrt{a}$; its upper edge is pure amplitude damping, $\lambda = \sqrt{a}$. It closes to a point at $a = 0$ and opens to $|\lambda| \le 1$ at $a = 1$. The magenta point $(a, \lambda) = (0.15, 0.75)$ outside it is a map that pushes part of the ball through the shell.
:::

Now assign exponential envelopes to the factors of **the same map**. For any positive real $T_1,T_2,t$, set

$$
a=e^{-t/T_1}, \qquad \lambda=e^{-t/T_2}.
$$

Then $0<a<1$. By the theorem, $F_{a,\lambda}$ maps the entire closed unit ball into itself if and only if

$$
\begin{aligned}
&e^{-2t/T_2}\le e^{-t/T_1} \\
&\quad\Longleftrightarrow -\frac{2t}{T_2}\le-\frac{t}{T_1} \\
&\quad\Longleftrightarrow T_2\le2T_1.
\end{aligned}
$$

The first step uses strict monotonicity of the real exponential; the second cancels positive time and multiplies by positive time constants. This explains a direct specialization of the theorem under the stated exponential envelopes. At $t=0$, both factors equal $1$ for every positive pair $T_1,T_2$, giving the identity map; zero time alone constrains no rate.

::: {.viz src="bloch-noise" preset="wide" height="500"}
**Keep too much sideways and the skin is pierced.** Take $T_2 = 6T_1$, that is $\lambda = a^{1/6} > \sqrt{a}$: near the north pole the cyan image bulges out through the unit ball drawn as a glass shell, the magenta part is no longer inside, and the magenta dot marks the image point farthest from the centre. Set $T_2 \le 2T_1$ again and the magenta disappears ([@thm-north-pole-ball-criterion]).
:::

::: {.remark #rem-relaxation-envelope-literature title="Physical Conditions for Exponential Envelopes and Rate Addition (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Krantz et al., *A quantum engineer's guide to superconducting qubits* ([arXiv:1904.06560v3](https://arxiv.org/abs/1904.06560v3), equations 40–43), introduce longitudinal and transverse relaxation rates in the Bloch–Redfield description. The text adjacent to equation 41 explicitly notes that expressing the transverse rate as a sum presumes exponential individual decay functions. This supplies physical context for the relaxation model used here.

If, in addition to pure amplitude damping, we **assume a product of envelopes** and supply a nonnegative pure-dephasing rate $k\ge0$, namely

$$
e^{-t/T_2}=e^{-t/(2T_1)}e^{-kt},
$$

then for $T_1,T_2,t>0$, taking logarithms and canceling $t$ gives

$$
\frac{1}{T_2}=\frac{1}{2T_1}+k\ge\frac{1}{2T_1}.
$$

For $k>0$, one may write $k=1/T_\varphi$; $k=0$ gives saturation under pure amplitude damping. The product law is an additional physical assumption, not a consequence of geometric preservation. Here $T_2\le2T_1$ applies within the stated scope of a fixed north pole, zero-temperature affine drift, isotropic transverse contraction, and exponential envelopes; it is not extended to arbitrary environments or arbitrary nonexponential decay.
:::

The three kinds of noise deform the ball in different ways, yet they share one feature: none of them pulls two points of the ball farther apart. This sentence has a precise form. The **trace distance** between two states is $T(\rho, \sigma) = \frac{1}{2}\lVert\rho - \sigma\rVert_1$; for a qubit, the two eigenvalues of $\rho - \sigma = \frac{1}{2}(\vv{r} - \vv{s})\cdot\vv{\sigma}$ are $\pm\frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$, so

$$
T(\rho, \sigma) \;=\; \frac{1}{2}\,\lVert\vv{r} - \vv{s}\rVert ,
$$

half the Euclidean distance between the two Bloch vectors (this step is a manual computation).

::: {.definition #def-trace-distance title="The Trace Distance between Finite-Dimensional Density States" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance"}
Let $\iota$ be a finite type (`[Fintype ι]`, `[DecidableEq ι]`). For two density states $\rho, \sigma$ (`DensityState ι`: positive semidefinite complex $\iota \times \iota$ matrices of trace $1$), define

$$
\operatorname{traceDistance}(\rho, \sigma) \;=\; \frac{1}{2}\,\operatorname{traceNorm}(\rho - \sigma),
$$

where `traceNorm` $M$ is the real part of the trace of $\sqrt{M^{\dagger}M}$.
:::

::: {.proposition #prop-trace-distance-metric-contraction title="Trace-Distance Bounds and Contraction under Quantum Channels on a Fixed Finite Index Type" lean="D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_nonneg D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_symm D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_triangle D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_le_one D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_contract"}
Let $\iota$ be a finite type and $\rho, \sigma, \tau$ density states on $\iota$; use the notation of [@def-trace-distance] and abbreviate $T = \operatorname{traceDistance}$. Then:

1. **Nonnegativity**: $0 \le T(\rho, \sigma)$;
2. **Symmetry**: $T(\rho, \sigma) = T(\sigma, \rho)$;
3. **Triangle inequality**: $T(\rho, \tau) \le T(\rho, \sigma) + T(\sigma, \tau)$;
4. **Boundedness**: $T(\rho, \sigma) \le 1$;
5. **Contraction under channels**: for every quantum channel $\Phi$ whose input and output are both indexed by $\iota$ (`QuantumChannel ι ι`, a trace-preserving completely positive map),

   $$
   T\bigl(\Phi(\rho),\ \Phi(\sigma)\bigr) \;\le\; T(\rho, \sigma).
   $$
:::

::: proof
The first four claims come from the nonnegativity of the trace norm, the identity $\operatorname{traceNorm}(-M) = \operatorname{traceNorm}(M)$, the triangle inequality for the trace norm (`traceNorm_add_le`), and the fact that the trace norm of a positive semidefinite matrix equals its trace. Claim 5: take the Jordan decomposition $\rho - \sigma = P - M$ of the Hermitian matrix $\rho - \sigma$ into its positive and negative parts, both positive semidefinite, whose trace norm equals $\operatorname{Tr} P + \operatorname{Tr} M$ (`trace_norm_jordan_mass`). A channel maps positive semidefinite matrices to positive semidefinite matrices and preserves the trace, so $\operatorname{traceNorm}\bigl(\Phi(P) - \Phi(M)\bigr) \le \operatorname{Tr}\Phi(P) + \operatorname{Tr}\Phi(M) = \operatorname{Tr} P + \operatorname{Tr} M$. Dividing by $2$ gives the claim. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-bloch-distance-contraction title="Distance Contraction under Three Kinds of Qubit Noise: A Numerical Check (With Literature Context, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The standard Bloch-ball affine maps for general single-qubit dephasing, amplitude-damping, and depolarizing channels and the Euclidean Bloch formula $T(\rho, \sigma) = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert_2$ below come from the standard quantum-information literature and numerically illustrate the general kernel-verified trace-distance contraction theorem [@prop-trace-distance-metric-contraction] above.

Take the Bloch forms of three channels, each with parameter $\frac{1}{2}$: dephasing $(x, y, z) \mapsto \bigl(\frac{x}{2}, \frac{y}{2}, z\bigr)$; amplitude damping $(x, y, z) \mapsto \bigl(\frac{x}{\sqrt{2}}, \frac{y}{\sqrt{2}}, \frac{1 + z}{2}\bigr)$; depolarizing $\vv{r} \mapsto \frac{1}{2}\vv{r}$. Consider two pairs of states: the north pole and $+x$ ($\vv{r} = (0, 0, 1)$, $\vv{s} = (1, 0, 0)$), and $+x$ and $-x$. Trace distances are computed from $T = \frac{1}{2}\lVert\vv{r} - \vv{s}\rVert$:

| channel | north pole and $+x$ | $+x$ and $-x$ |
| :---: | :---: | :---: |
| before | $0.7071$ | $1.0000$ |
| dephasing | $0.5590$ | $0.5000$ |
| amplitude damping | $0.4330$ | $0.7071$ |
| depolarizing | $0.3536$ | $0.5000$ |

No entry exceeds the first row, in agreement with claim 5 of [@prop-trace-distance-metric-contraction]. The first number in the amplitude-damping row was recomputed by applying the Kraus operators to the density matrices and taking the trace norm, again giving $0.4330$. Note that amplitude damping pushes the whole ball toward the north pole, so the centre is not fixed, yet the distance between any two points still does not increase.
:::

So "a mixed state is a shortened line inside the ball" can be stated as a theorem that does not depend on any particular noise model: a channel may translate, squash, or rotate the ball, but it can never pull any two of its points apart. Distinguishability can only be lost; it never grows out of nothing.

::: {.viz src="bloch-noise" preset="distance" height="500"}
**Two states only get closer.** The first pair of the example: $\rho$ at the north pole and $\sigma$ at $+x$, one step of amplitude damping ($\gamma = \frac{1}{2}$). $\rho$ stays, $\sigma$ is pulled north, and the distance on the white line drops from the dashed $0.707$ to $0.433$ ([@prop-trace-distance-metric-contraction]).
:::
