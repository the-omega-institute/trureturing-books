# Appendix G Beyond the Stabilizer Polytope: Majorana Codes, Clifford Magic, and Steering {#sec-appendix-g}

Across the main chapters of this book, five converging geometric threads have mapped out the algebraic skeleton of finite-dimensional quantum structures: [Chapter 10](ch10-gram-geometry-and-order.md) analyzed commutation order, compatible Gram geometry, and doily contextuality parity; [Chapter 13](ch13-entanglement-and-chsh.md) showed how the two-qubit cosine arc breaks the classical polygonal Bell (CHSH) bound and shapes remote conditional states into a steering ellipsoid; [Chapter 14](ch14-cloning-codes-and-braids.md) and [Section 14.2](ch14-s02-pauli-syndromes.md) established generalized Pauli-word syndromes and symplectic orthogonality for stabilizer codes; [Chapter 16](ch16-qsvt-walks-and-compilation.md) and [Section 16.8](ch16-s08-finite-gate-polytopes.md) traced how finite discrete gate sets carve polyhedral approximations on the three-sphere; and [Appendix B](appendix-b.md) compiled the graded blade identities, XOR multiplication table, and binary symplectic phase-space dictionary of the Clifford algebra $\mathrm{Cl}_{3,0}(\mathbb{R})$.

Once we step **beyond the boundary of the stabilizer polytope and local hidden-state models**, five concrete finite-dimensional reachability questions immediately arise:

1. **Distance obstructions for small Majorana stabilizer codes**: Under binary self-orthogonality, inclusion of the all-ones total-parity vector, and positive logical dimension ($2 \dim c < n$), can $n \le 14$ Majorana modes ever host a binary code of distance at least $4$?
2. **Multiplicative tensor law for discrete phase-space magic on the equator**: When two single-qubit density states both lie on the equatorial plane of the Bloch ball ($Z$-component equal to $0$), does their two-qubit discrete Wigner $\ell^1$ distance obey an exact compositional formula?
3. **Limits of single-factor factorization for non-equatorial tensor deficits**: Once the second qubit leaves the equator and enters the strictly positive Bloch octant, can the gap (deficit) between the multiplicative baseline and the true two-qubit Wigner distance still factor universally as $\operatorname{COne}(\rho)\, f(\sigma)$?
4. **Pointwise positivity test for odd-prime Clifford third moments**: In odd-prime qudit dimensions, must the third-moment trace $\kappa$ of a normalized state against every stochastic Lagrangian subspace operator stay inside the pointwise interval $0 \le \kappa \le 1$, as the pointwise clause of Conjecture 2 of Zhu, Mao, and Yi (2024) asserts?
5. **Sharp ellipsoid-centre radius for three-setting Pauli steering**: In a two-qubit state, at what exact Euclidean norm $t = \|\vec{c}_B\|$ of Bob's conditional steering-ellipsoid centre does every violation $F_3 > 1$ of the three-orthonormal-setting steering bound vanish?

This appendix answers all five questions through explicit finite-dimensional hand calculations paired with five frozen Lean 4 kernel-verified theorems (verification boundaries in [Appendix C](appendix-c.md)). All five come from the published literature: question 1 from M. B. Hastings (*Quantum Inf. Comput.* **17**, 2017); questions 2 and 3 are Conjecture 5.6 and the factorization clause of Conjecture 5.5 of S. Dutta and Tushar (arXiv:2603.20792); question 4 is the pointwise clause of Conjecture 2 of H. Zhu, C. Mao, and C. Yi (arXiv:2410.13575); question 5 comes from A. F. Ducuara, C. E. Susa, and P. Skrzypczyk (*Phys. Rev. A* **110**, 022435, 2024). At the outset, we state an explicit epistemic boundary: the unifying mathematical thread across Sections G.1–G.5 is **where finite algebraic and polyhedral characterizations close cleanly and where naive extrapolations break down on explicit counterexamples**; this book **does not claim** that binary Hamming code weight, single- and two-qubit Wigner $\ell^1$ distances, odd-prime Clifford third moments, and the three-setting steering parameter are mutually equivalent resource measures.

---

## G.1 Low-Weight Logical Operators for Majorana Codes up to Fourteen Modes {#sec-appendix-g-1}

Recalling the real Clifford generator conventions of [Appendix B](appendix-b.md) (as motivating physical background), let $n$ Majorana operators $\gamma_0, \dots, \gamma_{n-1}$ satisfy $\gamma_i^2 = I$ and $\gamma_i \gamma_j = -\gamma_j \gamma_i$ for $i \neq j$. A binary indicator vector $x : \operatorname{Fin} n \to \operatorname{ZMod} 2$ marks which Majorana modes appear in a monomial product; whenever two indicator vectors both have even Hamming weight, their Majorana monomials commute if and only if they overlap on an even number of modes—that is, their standard coordinate dot product over $\operatorname{ZMod} 2$ vanishes. When a binary check subspace $c$ is self-orthogonal, contains the all-ones total-fermion-parity vector $\mathbf{1} = (1, \dots, 1)$, and leaves at least one logical degree of freedom ($2 \dim_{\mathbb{F}_2} c < n$), any vector $v \in c^\perp \setminus c$ represents a nontrivial logical operator commuting with every stabilizer check without belonging to the stabilizer itself. Achieving code distance at least $4$ requires that no vector in $c^\perp \setminus c$ have Hamming weight strictly below $4$.

Before stating the general fourteen-mode theorem, we work out the smallest nontrivial instance $n = 4$ by hand. In $(\operatorname{Fin} 4 \to \operatorname{ZMod} 2)$, take the one-dimensional subspace $c = \operatorname{span}_{\operatorname{ZMod} 2}\{\mathbf{1}\}$ with $\mathbf{1} = (1, 1, 1, 1)$:

1. **Self-orthogonality and parity check**: Over $\operatorname{ZMod} 2$, $\mathbf{1} \cdot \mathbf{1} = 1 + 1 + 1 + 1 = 4 \equiv 0 \pmod{2}$, and pairings with the zero vector vanish trivially, so $c$ is self-orthogonal and contains $\mathbf{1}$; moreover $\dim_{\operatorname{ZMod} 2} c = 1$ satisfies $2 \times 1 = 2 < 4 = n$.
2. **Explicit low-weight logical operator**: Inspect $v = (1, 1, 0, 0)$. Its dot product with the generator $\mathbf{1}$ is $\mathbf{1} \cdot v = 1 + 1 + 0 + 0 = 2 \equiv 0 \pmod{2}$, placing $v \in c^\perp$, whereas $c = \{(0,0,0,0), (1,1,1,1)\}$ gives $v \notin c$. Its Hamming weight is $\operatorname{wt}(v) = 2 < 4$, immediately ruling out distance $4$.

To state the general bound up to $n \le 14$, we align with the exact formal definitions in `BinaryCharacterCodeDuality` and `MajoranaFourteenModeDistanceFour`:

- Over any commutative semiring $K$ and finite index type $I$ (`[Fintype I]`), `standardCoordinatePairing K I` is the coordinatewise dot-product bilinear form $\sum_{i \in I} x_i y_i$, and `characterOrthogonalComplement K space` is the submodule orthogonal to `space` under that pairing (for $K = \operatorname{ZMod} 2$, $\{v \mid \forall x \in c,\, x \cdot v = 0\}$);
- A binary submodule $c : \operatorname{Submodule} (\operatorname{ZMod} 2) (\iota \to \operatorname{ZMod} 2)$ satisfies `IsSelfOrthogonal c` when $x \cdot y = 0$ for all $x \in c$ and $y \in c$;
- The Hamming weight of $v$ is counted by `hammingNorm v`.

::: {.theorem #thm-appg-majorana-fourteen-bound title="Low-Weight Logical Operators for Majorana Codes up to Fourteen Modes" lean="D5/S3/Quantum/Codes/MajoranaFourteenModeDistanceFour.result"}
For every natural number $n \le 14$ and every binary submodule $c : \operatorname{Submodule} (\operatorname{ZMod} 2) (\operatorname{Fin} n \to \operatorname{ZMod} 2)$, if `IsSelfOrthogonal c` holds, $(\text{fun } \_ \Rightarrow 1) \in c$, and

$$
2 \cdot \operatorname{finrank}_{\operatorname{ZMod} 2}(c) < n,
$$

then there exists $v \in \operatorname{characterOrthogonalComplement} (\operatorname{ZMod} 2)\, c$ such that $v \notin c$ and $\operatorname{hammingNorm}(v) < 4$.
:::

::: proof
Assume $n \le 14$ and let $c$ satisfy self-orthogonality, $(\text{fun } \_ \Rightarrow 1) \in c$, and $2 \cdot \operatorname{finrank}_{\operatorname{ZMod} 2}(c) < n$. Because $(\text{fun } \_ \Rightarrow 1) \in c$ is orthogonal to itself over $\operatorname{ZMod} 2$, $n$ must be even, and every vector in the orthogonal complement has even Hamming weight; together with $2 \dim c < n$, this rules out $n = 0$ as well as the self-dual boundary $\dim c = n / 2$, restricting $(n, \dim c)$ to a finite table of even mode counts $n \in \{4, 6, 8, 10, 12, 14\}$. Assuming for contradiction that every element of $c^\perp \setminus c$ has Hamming weight at least $4$, the Lean development combines coordinate-duality rank identities, weight-distribution constraints, and puncturing/shortening reductions across the remaining cases up to $n = 14$ to force a contradiction, establishing some $v \in c^\perp \setminus c$ with $\operatorname{hammingNorm}(v) < 4$. The full proof is checked by the Lean kernel.
:::

Two strict scope boundaries govern [@thm-appg-majorana-fourteen-bound]:

1. **An impossibility bound, never a distance-$4$ code construction**: This theorem **excludes** minimum logical weight $\ge 4$ across the entire stated family for $n \le 14$ (indeed, since $(\text{fun } \_ \Rightarrow 1) \in c$ forces every $v \in c^\perp \setminus c$ to be nonzero of even weight, $\operatorname{hammingNorm}(v) < 4$ implies weight $2$); it must never be misread as constructing a fourteen-mode distance-$4$ Majorana code. As a manual and literature benchmark outside this frozen theorem, at the very next even mode count $n = 16$, the first-order Reed–Muller code $RM(1, 4) \subset \mathbb{F}_2^{16}$ has dimension $5$ ($2 \times 5 = 10 < 16$), contains $\mathbf{1}$, has doubly-even weights in $\{0, 8, 16\}$ (hence is self-orthogonal), and has dual $RM(2, 4)$ of minimum nonzero weight $4$—explaining why the cutoff $n \le 14$ is algebraically sharp.
2. **Finite binary algebra versus physical fault tolerance**: Neither $(\text{fun } \_ \Rightarrow 1) \in c$ nor $2 \cdot \operatorname{finrank}_{\operatorname{ZMod} 2}(c) < n$ may be dropped (for instance, at $n = 4$ the self-dual code $c = \operatorname{span}\{1100, 0011\}$ has $2 \dim c = 4$ and $c^\perp \setminus c = \varnothing$). Moreover, this is a theorem of finite binary linear coding theory and does not by itself supply continuous-time fermionic Hamiltonian dynamics or hardware fault-tolerance thresholds.

---

## G.2 Equatorial-State Tensor Rules for Wigner Distance {#sec-appendix-g-2}

Whereas stabilizer codes carve invariant subspaces, [Chapter 16, Section 16.8](ch16-s08-finite-gate-polytopes.md) showed that universal gate synthesis requires non-Clifford gates such as $T$ to break out of the Clifford polytope, because Clifford unitaries alone cannot generate non-stabilizer "magic." On one and two qubits, how can we measure the exact $\ell^1$ distance in discrete phase space from a quantum state to the stabilizer convex hull?

We follow verbatim the definitions in `FiniteDimensional`, `PauliMatrix`, `BinaryStabilizerLocalInequivalence`, `DensitySpan`, `WignerDistanceMinimum`, and `QubitWignerDistanceTensorRules`:

- **Single- and two-qubit matrices and density states**: Write `QubitMatrix := Matrix (Fin 2) (Fin 2) ℂ` and `TwoQubitMatrix := Matrix (Fin 2 × Fin 2) (Fin 2 × Fin 2) ℂ`. For any finite dimension $d$, `IsDensity A` is `A.PosSemidef ∧ Matrix.trace A = 1`. The map `pauliMatrix` sends $\mathrm{I} \mapsto I_2$, $\mathrm{X} \mapsto \bigl(\begin{smallmatrix} 0 & 1 \\ 1 & 0 \end{smallmatrix}\bigr)$, $\mathrm{Z} \mapsto \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & -1 \end{smallmatrix}\bigr)$, and $\mathrm{Y} \mapsto i X Z = \bigl(\begin{smallmatrix} 0 & -i \\ i & 0 \end{smallmatrix}\bigr)$, with Bloch readouts $\operatorname{bloch}(\rho, p) = \operatorname{Re}\operatorname{Tr}(\rho \cdot \operatorname{pauliMatrix}(p))$.
- **Discrete phase-point kernels and Wigner quasiprobabilities**: Set `PhasePoint := Fin 2 × Fin 2`. At each phase point $a = (a_1, a_2) \in \{0, 1\}^2$, the single-qubit kernel `phasePoint a` is

  $$
  A_{(a_1, a_2)} = \frac{1}{2}\Bigl(I_2 + (-1)^{a_2} X + (-1)^{a_1 + a_2} Y + (-1)^{a_1} Z\Bigr),
  $$

  and the two-qubit product kernel is `phasePointTwo (a, b) := phasePoint a ⊗ₖ phasePoint b`. On any finite index type $\iota$ of cardinality $|\iota|$, `Wigner A ρ a := (ρ * A a).trace.re / Fintype.card ι`; specializing to $|\iota| = 2$ and $|\iota| = 4$ gives `WignerOne ρ : PhasePoint → ℝ` and `WignerTwo ρ : PhasePoint × PhasePoint → ℝ`.
- **Stabilizer polytope `Wfree` and $\ell^1$ distances `COne`, `CTwo`**: Let `pauliSet = {c • pauliMatrix p | c ∈ {1, -1, i, -i}}` and `pauliTwo = {c • (pauliMatrix p ⊗ₖ pauliMatrix q) | c ∈ {1, -1, i, -i}}`. The set `Stab P` collects all rank-one projectors $\psi\psi^\dagger$ of unit vectors $\psi$ uniquely stabilized (one-dimensional $+1$ joint eigenspace) by an abelian subgroup $S \le \operatorname{U}(\iota)$ of cardinality $|\iota|$ contained in $P$; its Wigner polytope is `Wfree A P := convexHull ℝ (Wigner A '' Stab P)`. Measuring distances in the $\ell^1$-normed space `WithLp 1`, we define

  $$
  \begin{aligned}
  \operatorname{COne}(\rho) &:= \operatorname{infDist}_{\ell^1}\bigl(\operatorname{WignerOne}(\rho),\; \operatorname{Wfree}(\operatorname{phasePoint}, \operatorname{pauliSet})\bigr), \\
  \operatorname{CTwo}(\tilde{\rho}) &:= \operatorname{infDist}_{\ell^1}\bigl(\operatorname{WignerTwo}(\tilde{\rho}),\; \operatorname{Wfree}(\operatorname{phasePointTwo}, \operatorname{pauliTwo})\bigr).
  \end{aligned}
  $$

Let us compute every number explicitly on the equatorial pure state $\rho_A$ with rational Bloch vector $(3/5, 4/5, 0)$:

$$
\rho_A = \frac{1}{2}\left(I_2 + \frac{3}{5}X + \frac{4}{5}Y\right) = \begin{pmatrix} \frac{1}{2} & \frac{3}{10} - \frac{2}{5}i \\[4pt] \frac{3}{10} + \frac{2}{5}i & \frac{1}{2} \end{pmatrix}.
$$

Using $W_1(\rho)(a_1, a_2) = \frac{1}{4}\bigl(1 + (-1)^{a_2} x + (-1)^{a_1 + a_2} y + (-1)^{a_1} z\bigr)$ in the phase-point order $(0,0), (0,1), (1,0), (1,1)$, the four Wigner weights are

$$
\operatorname{WignerOne}(\rho_A) = \left(\frac{1 + 3/5 + 4/5}{4},\; \frac{1 - 3/5 - 4/5}{4},\; \frac{1 + 3/5 - 4/5}{4},\; \frac{1 - 3/5 + 4/5}{4}\right) = \left(\frac{3}{5},\; -\frac{1}{10},\; \frac{1}{5},\; \frac{3}{10}\right).
$$

Now inspect the single-qubit stabilizer vertices: `Stab pauliSet` consists of the six axial projectors $\lvert\pm X\rangle\langle\pm X\rvert, \lvert\pm Y\rangle\langle\pm Y\rvert, \lvert\pm Z\rangle\langle\pm Z\rvert$, whose `WignerOne` vectors each have two entries equal to $\frac{1}{2}$ and two entries equal to $0$ (for example, $\lvert +X\rangle\langle +X\rvert \mapsto (\frac{1}{2}, 0, \frac{1}{2}, 0)$ and $\lvert +Y\rangle\langle +Y\rvert \mapsto (\frac{1}{2}, 0, 0, \frac{1}{2})$). Every convex combination $q \in \operatorname{Wfree}(\operatorname{phasePoint}, \operatorname{pauliSet})$ therefore satisfies $0 \le q_a \le \frac{1}{2}$ at all four phase points $a$, giving an immediate $\ell^1$ lower bound:

$$
\|\operatorname{WignerOne}(\rho_A) - q\|_1 \;\ge\; \left|\frac{3}{5} - q_{(0,0)}\right| + \left|-\frac{1}{10} - q_{(0,1)}\right| \;\ge\; \left(\frac{3}{5} - \frac{1}{2}\right) + \left(0 - \left(-\frac{1}{10}\right)\right) = \frac{1}{10} + \frac{1}{10} = \frac{1}{5}.
$$

Conversely, the stabilizer-edge mixture $q_* = \frac{2}{5} W_1(\lvert +X\rangle\langle +X\rvert) + \frac{3}{5} W_1(\lvert +Y\rangle\langle +Y\rvert) = (\frac{1}{2}, 0, \frac{1}{5}, \frac{3}{10}) \in \operatorname{Wfree}$ attains $\|\operatorname{WignerOne}(\rho_A) - q_*\|_1 = \frac{1}{10} + \frac{1}{10} + 0 + 0 = \frac{1}{5}$, proving $\operatorname{COne}(\rho_A) = \frac{1}{5}$. For the two-qubit product $\rho_A \otimes \rho_A$, the theorem below bypasses any brute-force search over the $60$-vertex two-qubit stabilizer polytope in $\mathbb{R}^{16}$ and yields directly:

$$
\operatorname{CTwo}(\rho_A \otimes \rho_A) = \frac{1}{5} + \frac{1}{5} + \frac{1}{5}\times\frac{1}{5} = \frac{11}{25}, \qquad \text{equivalently}\quad 1 + \operatorname{CTwo}(\rho_A \otimes \rho_A) = \bigl(1 + \operatorname{COne}(\rho_A)\bigr)^2 = \frac{36}{25}.
$$

::: {.theorem #thm-appg-wigner-equatorial-tensor title="Equatorial-State Tensor Rules for Wigner Distance" lean="D5/S3/Quantum/Magic/QubitWignerDistanceTensorRules.resultEquatorial"}
For any single-qubit matrices $\rho, \sigma : \operatorname{QubitMatrix}$ satisfying `IsDensity ρ`, `IsDensity σ`, and vanishing $Z$-Bloch components

$$
\operatorname{bloch}(\rho, \mathrm{Z}) = 0, \qquad \operatorname{bloch}(\sigma, \mathrm{Z}) = 0,
$$

the two-qubit Wigner $\ell^1$ distance of their Kronecker product satisfies

$$
\operatorname{CTwo}(\rho \otimes_k \sigma) = \operatorname{COne}(\rho) + \operatorname{COne}(\sigma) + \operatorname{COne}(\rho) \cdot \operatorname{COne}(\sigma).
$$

:::

::: proof
Let $\rho$ and $\sigma$ be single-qubit density matrices with $\operatorname{bloch}(\rho, \mathrm{Z}) = \operatorname{bloch}(\sigma, \mathrm{Z}) = 0$. For the upper bound, any pair of single-qubit free distributions $p, q \in \operatorname{Wfree}$ has tensor product $(a, b) \mapsto p_a q_b$ inside the convex hull of product stabilizer states, hence inside `Wfree phasePointTwo pauliTwo`; decomposing $w_\rho \otimes w_\sigma - p \otimes q = (w_\rho - p) \otimes q + w_\rho \otimes (w_\sigma - q)$ and using $\|q\|_1 = 1$ together with $\|w_\rho\|_1 \le 1 + \operatorname{COne}(\rho)$ yields $\operatorname{CTwo}(\rho \otimes_k \sigma) \le \operatorname{COne}(\rho) + \operatorname{COne}(\sigma) + \operatorname{COne}(\rho)\operatorname{COne}(\sigma)$. For the matching lower bound on the equator, the module uses nearest-edge projections from `WignerSimplexNearestEdge` to construct dual sign vectors $\eta_\rho, \eta_\sigma \in \{-1, +1\}^4$ certifying $\operatorname{COne}(\rho)$ and $\operatorname{COne}(\sigma)$, and verifies that their Kronecker sign functional $\eta_\rho \otimes \eta_\sigma$ has pairing at most $1$ against every pure stabilizer state in `Stab pauliTwo` (both product and entangled). The full proof is checked by the Lean kernel.
:::

Two precision guardrails apply to [@thm-appg-wigner-equatorial-tensor]:

1. **Covers mixed as well as pure equatorial states, but never non-equatorial states**: The theorem assumes only `IsDensity ρ`, `IsDensity σ`, and $\operatorname{bloch}(\rho, \mathrm{Z}) = \operatorname{bloch}(\sigma, \mathrm{Z}) = 0$—**no purity hypothesis is imposed**, so every mixed state in the equatorial disk $x^2 + y^2 < 1, z = 0$ (including interior stabilizer mixtures with $|x| + |y| \le 1$ and $\operatorname{COne} = 0$) is covered. Conversely, the identity must never be extrapolated off the equator, as the next section refutes even a weakened factorization once one factor acquires a nonzero $Z$-component.
2. **Functional-specific definition**: `COne` and `CTwo` denote the $\ell^1$ infimum distances to `Wfree` for the exact `phasePoint` sign convention $(-1)^{a_2}, (-1)^{a_1 + a_2}, (-1)^{a_1}$ and `IsDensity` inputs; they are neither matrix trace distances nor claimed to be unconditionally monotone under arbitrary quantum channels.

---

## G.3 Refutation of a Single-Factor Wigner Deficit Formula {#sec-appendix-g-3}

Because pairs of equatorial states satisfy $1 + \operatorname{CTwo}(\rho \otimes_k \sigma) = (1 + \operatorname{COne}(\rho))(1 + \operatorname{COne}(\sigma))$, it is tempting to conjecture a separated correction law when one state leaves the equator: if $\rho$ remains an equatorial magic state ($\operatorname{bloch}(\rho, \mathrm{Z}) = 0$ and $\operatorname{COne}(\rho) > 0$) while $\sigma$ enters the strictly positive Bloch octant $\operatorname{bloch}(\sigma, \mathrm{X})\operatorname{bloch}(\sigma, \mathrm{Y})\operatorname{bloch}(\sigma, \mathrm{Z}) > 0$, does the **tensor deficit** factor linearly in $\operatorname{COne}(\rho)$ as $\operatorname{deficit}(\rho, \sigma) = \operatorname{COne}(\rho)\, f(\sigma)$ for some universal function $f$ of $\sigma$ alone?

In `QubitWignerDeficitFactorRefutation`, the deficit functional `deficit` and the candidate factorization statement `claim` are defined explicitly as

$$
\operatorname{deficit}(\rho, \sigma) := \bigl(1 + \operatorname{COne}(\rho)\bigr)\bigl(1 + \operatorname{COne}(\sigma)\bigr) - 1 - \operatorname{CTwo}(\rho \otimes_k \sigma),
$$

with `claim` asserting the existence of a single map $f : \operatorname{QubitMatrix} \to \mathbb{R}$ such that $\operatorname{deficit}(\rho, \sigma) = \operatorname{COne}(\rho) \cdot f(\sigma)$ for all $\rho, \sigma : \operatorname{QubitMatrix}$ satisfying `IsDensity ρ`, $\operatorname{bloch}(\rho, \mathrm{Z}) = 0$, $0 < \operatorname{COne}(\rho)$, `IsDensity σ`, and $0 < \operatorname{bloch}(\sigma, \mathrm{X})\cdot\operatorname{bloch}(\sigma, \mathrm{Y})\cdot\operatorname{bloch}(\sigma, \mathrm{Z})$.

To see concretely why this single-factor ansatz fails, we evaluate the three rational $2\times 2$ witness matrices constructed in the source module:

1. **First equatorial pure state `rhoA`**: Again taking $\rho_A = \bigl(\begin{smallmatrix} 1/2 & 3/10 - 2i/5 \\ 3/10 + 2i/5 & 1/2 \end{smallmatrix}\bigr)$ with Bloch vector $(\frac{3}{5}, \frac{4}{5}, 0)$, Section G.2 established $\operatorname{WignerOne}(\rho_A) = (\frac{3}{5}, -\frac{1}{10}, \frac{1}{5}, \frac{3}{10})$ and $\operatorname{COne}(\rho_A) = \frac{1}{5} > 0$.
2. **Second equatorial pure state `rhoB`**: Built from the $(5, 12, 13)$ Pythagorean triple,

   $$
   \rho_B = \begin{pmatrix} \frac{1}{2} & \frac{5}{26} - \frac{6}{13}i \\[4pt] \frac{5}{26} + \frac{6}{13}i & \frac{1}{2} \end{pmatrix}, \qquad \text{Bloch vector } \left(\frac{5}{13},\; \frac{12}{13},\; 0\right).
   $$

   Its four phase-point weights are $\operatorname{WignerOne}(\rho_B) = (\frac{15}{26}, -\frac{1}{13}, \frac{3}{26}, \frac{5}{13})$. Because every $q \in \operatorname{Wfree}$ obeys $q_{(0,0)} \le \frac{1}{2}$ and $q_{(0,1)} \ge 0$, we have $\|W_1(\rho_B) - q\|_1 \ge (\frac{15}{26} - \frac{13}{26}) + \frac{2}{26} = \frac{2}{13}$, matched by the edge mixture $\frac{3}{13} W_1(\lvert +X\rangle\langle +X\rvert) + \frac{10}{13} W_1(\lvert +Y\rangle\langle +Y\rvert) = (\frac{1}{2}, 0, \frac{3}{26}, \frac{5}{13})$, so $\operatorname{COne}(\rho_B) = \frac{2}{13} > 0$.
3. **Positive-octant non-equatorial pure state `sigma`**: Built from the quadruple $1^2 + 4^2 + 8^2 = 9^2$,

   $$
   \sigma = \begin{pmatrix} \frac{17}{18} & \frac{1}{18} - \frac{2}{9}i \\[4pt] \frac{1}{18} + \frac{2}{9}i & \frac{1}{18} \end{pmatrix}, \qquad \text{Bloch vector } \left(\frac{1}{9},\; \frac{4}{9},\; \frac{8}{9}\right).
   $$

   Here $\operatorname{Tr}(\sigma) = 1$ and $\det(\sigma) = \frac{17}{324} - (\frac{1}{324} + \frac{16}{324}) = 0$, confirming `IsDensity sigma`, while $\frac{1}{9}\times\frac{4}{9}\times\frac{8}{9} = \frac{32}{729} > 0$ places $\sigma$ strictly inside the positive octant. Its Wigner vector is $\operatorname{WignerOne}(\sigma) = (\frac{11}{18}, \frac{1}{3}, -\frac{1}{18}, \frac{1}{9})$; since $\sum_a q_a = 1$ and $q_{(0,0)} \le \frac{1}{2}$ force $\|W_1(\sigma) - q\|_1 \ge 2(\frac{11}{18} - \frac{1}{2}) = \frac{2}{9}$, attained at $\frac{2}{9} W_1(\lvert +Y\rangle\langle +Y\rvert) + \frac{7}{9} W_1(\lvert +Z\rangle\langle +Z\rvert) = (\frac{9}{18}, \frac{7}{18}, 0, \frac{2}{18})$, we have $\operatorname{COne}(\sigma) = \frac{2}{9}$.

Geometrically, along the first-quadrant equatorial arc, $\operatorname{COne}(\rho) = \frac{x + y - 1}{2}$ depends **only on the sum $x + y$ and is completely blind to the transverse difference $x - y$**. In two qubits, however, `Stab pauliTwo` contains not only $36$ nonnegative product stabilizer vertices, but also even-permutation entangled stabilizer vertices such as $\lvert\Phi^+\rangle\langle\Phi^+\rvert = \frac{1}{4}(II + XX - YY + ZZ)$, whose $16$-point Wigner distribution takes $+\frac{1}{8}$ twelve times and **$-\frac{1}{8}$ four times**. Once $\sigma$ carries a nonzero $Z$-component, mixing in entangled stabilizer vertices to absorb negative entries of $W_2(\rho \otimes_k \sigma)$ couples to the transverse coordinate $x - y$ ($-\frac{1}{5}$ for $\rho_A$ versus $-\frac{7}{13}$ for $\rho_B$). Because $\operatorname{COne}(\rho_A) = \frac{1}{5} > 0$ and $\operatorname{COne}(\rho_B) = \frac{2}{13} > 0$ are strictly positive (never invoking division-by-zero total extensions), any universal function $f$ satisfying `claim` would require

$$
\frac{\operatorname{deficit}(\rho_A, \sigma)}{\operatorname{COne}(\rho_A)} = f(\sigma) = \frac{\operatorname{deficit}(\rho_B, \sigma)}{\operatorname{COne}(\rho_B)},
$$

which the formal proof refutes directly.

::: {.theorem #thm-appg-wigner-deficit-nonfactorization title="Refutation of a Single-Factor Wigner Deficit Formula" lean="D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.result"}
Define $\operatorname{deficit}(\rho, \sigma) := (1 + \operatorname{COne}(\rho))(1 + \operatorname{COne}(\sigma)) - 1 - \operatorname{CTwo}(\rho \otimes_k \sigma)$. There does not exist a function $f : \operatorname{QubitMatrix} \to \mathbb{R}$ such that for all single-qubit matrices $\rho, \sigma : \operatorname{QubitMatrix}$ satisfying `IsDensity ρ`, $\operatorname{bloch}(\rho, \mathrm{Z}) = 0$, $0 < \operatorname{COne}(\rho)$, `IsDensity σ`, and

$$
0 < \operatorname{bloch}(\sigma, \mathrm{X}) \cdot \operatorname{bloch}(\sigma, \mathrm{Y}) \cdot \operatorname{bloch}(\sigma, \mathrm{Z}),
$$

the identity $\operatorname{deficit}(\rho, \sigma) = \operatorname{COne}(\rho) \cdot f(\sigma)$ holds (that is, `¬ claim` holds).
:::

::: proof
Suppose for contradiction that such a function $f : \operatorname{QubitMatrix} \to \mathbb{R}$ existed. Instantiating `claim` on the explicit rational $2\times 2$ witness matrices `rhoA`, `rhoB`, and `sigma`, the proof first checks `IsDensity rhoA`, `IsDensity rhoB`, `IsDensity sigma`, $\operatorname{bloch}(\rho_A, \mathrm{Z}) = \operatorname{bloch}(\rho_B, \mathrm{Z}) = 0$, $\operatorname{COne}(\rho_A) = 1/5 > 0$, $\operatorname{COne}(\rho_B) = 2/13 > 0$, and $\operatorname{bloch}(\sigma, \mathrm{X})\operatorname{bloch}(\sigma, \mathrm{Y})\operatorname{bloch}(\sigma, \mathrm{Z}) > 0$. Eliminating $f(\sigma)$ between $(\rho_A, \sigma)$ and $(\rho_B, \sigma)$ forces $\operatorname{deficit}(\rho_A, \sigma) / \operatorname{COne}(\rho_A) = \operatorname{deficit}(\rho_B, \sigma) / \operatorname{COne}(\rho_B)$. By exhibiting primal rational convex combinations in `Wfree phasePointTwo pauliTwo` (upper-bounding $\operatorname{CTwo}$) paired with dual $\ell^\infty$ separating hyperplanes on the $16$-point two-qubit phase space (lower-bounding $\operatorname{CTwo}$), the module proves that the two normalized deficits are strictly unequal, a contradiction. The full proof is checked by the Lean kernel.
:::

Respect the exact quantifier structure: `¬ claim` refutes the existence of a **single universal factor $f(\sigma)$ valid across all admissible pairs $(\rho, \sigma)$** ($\neg\exists f\,\forall \rho, \sigma$). It does **not** assert that the deficit fails to factor at a fixed pair (where the trivial ratio $\operatorname{deficit}(\rho, \sigma)/\operatorname{COne}(\rho)$ always works when $\operatorname{COne}(\rho) > 0$), nor does it invalidate [@thm-appg-wigner-equatorial-tensor] or rule out genuinely bivariate tensor bounds.

---

## G.4 Negative Clifford Third-Moment Expectation in Dimension Eleven {#sec-appendix-g-4}

For qubits ($d = 2$), discrete phase-point distributions of entangled stabilizer states already exhibit negative entries; in odd prime dimensions $d \ge 3$ (such as $d = 3, 5, 7, 11$), by contrast, Gross's theorem (literature context, not re-locked here) ensures that pure stabilizer states have nonnegative discrete Wigner functions. That nonnegativity can easily tempt a positivity conjecture—the pointwise clause of Conjecture 2 of Zhu, Mao, and Yi (2024)—in Clifford Schur–Weyl duality: for the **stochastic Lagrangian subspace operators** $R(d, n, T)$ spanning the third-moment commutant of the $n$-qudit Clifford group, must the expectation trace $\kappa(d, n, \Psi, T) = \operatorname{Tr}(R(d, n, T)\cdot\operatorname{stateCube}(\Psi))$ satisfy the pointwise bound $0 \le \kappa \le 1$ across all odd primes $d$, all mode counts $n$, all normalized states $\Psi$, and all stochastic Lagrangian subspaces $T$?

We record the exact definitions in `CliffordThirdMomentNegativity`:

- **Stochastic Lagrangian subspaces `IsStochasticLagrangian`**: For $d \in \mathbb{N}$ and a $\operatorname{ZMod} d$-submodule $T \subseteq (\operatorname{Fin} 3 \to \operatorname{ZMod} d) \times (\operatorname{Fin} 3 \to \operatorname{ZMod} d)$, `IsStochasticLagrangian d T` requires three conditions:
  1. Quadratic isotropy: for every $p = (p_1, p_2) \in T$, $\sum_{k \in \operatorname{Fin} 3} p_1(k)^2 - \sum_{k \in \operatorname{Fin} 3} p_2(k)^2 = 0 \in \operatorname{ZMod} d$;
  2. Lagrangian dimension: $\operatorname{finrank}_{\operatorname{ZMod} d}(T) = 3$;
  3. Stochastic diagonal vector: $(\mathbf{1}, \mathbf{1}) = (\text{fun } \_ \Rightarrow 1,\, \text{fun } \_ \Rightarrow 1) \in T$.
- **Subspace indicator matrix `R d n T`**: Indexed by three-copy $n$-qudit words $(\operatorname{Fin} 3 \to \operatorname{Fin} n \to \operatorname{ZMod} d)$, the complex matrix $R(d, n, T)$ has entries

  $$
  R(d, n, T)_{X, Y} := \prod_{j \in \operatorname{Fin} n} \begin{cases} 1, & \text{if } \bigl((k \mapsto X_{k, j}),\, (k \mapsto Y_{k, j})\bigr) \in T, \\ 0, & \text{otherwise.} \end{cases}
  $$

- **Three-copy state cube `stateCube` and third-moment trace `kappa`**: For $\Psi : (\operatorname{Fin} n \to \operatorname{ZMod} d) \to \mathbb{C}$, set $(\operatorname{stateCube} \Psi)_{X, Y} := \prod_{k \in \operatorname{Fin} 3} \Psi(X_k)\,\overline{\Psi(Y_k)}$ and, under `[NeZero d]`,

  $$
  \kappa(d, n, \Psi, T) := \operatorname{Tr}\bigl(R(d, n, T) \cdot \operatorname{stateCube}(\Psi)\bigr) \in \mathbb{C}.
  $$

- **The refuted universal pointwise bound `claim`**: Under `open scoped ComplexOrder`—where $z \le w$ in $\mathbb{C}$ means $\operatorname{Re}(z) \le \operatorname{Re}(w) \land \operatorname{Im}(z) = \operatorname{Im}(w)$, so $0 \le \kappa \le 1$ **simultaneously requires $\operatorname{Im}(\kappa) = 0$ and $0 \le \operatorname{Re}(\kappa) \le 1$**—`claim` asserts that for every prime $d \neq 2$, every $n \in \mathbb{N}$, every $\Psi$ with $\sum_x \|\Psi(x)\|^2 = 1$, and every $T$ satisfying `IsStochasticLagrangian d T`, one has $0 \le \kappa(d, n, \Psi, T) \land \kappa(d, n, \Psi, T) \le 1$.

The source module constructs an explicit counterexample at prime dimension $d = 11$ and mode count $n = 1$, whose hypotheses can be verified directly by hand:

1. **Mod-$11$ stochastic orthogonal matrix $O$ and graph subspace $T$**: Inspect the symmetric circulant matrix over $\operatorname{ZMod} 11$:

   $$
   O = \begin{pmatrix} 7 & 8 & 8 \\ 8 & 7 & 8 \\ 8 & 8 & 7 \end{pmatrix} \in M_3(\operatorname{ZMod} 11).
   $$

   Computing modulo $11$:
   - Row sum: $7 + 8 + 8 = 23 = 2 \times 11 + 1 \equiv 1 \pmod{11}$, so $O\mathbf{1} = \mathbf{1}$;
   - Diagonal dot product: $7^2 + 8^2 + 8^2 = 49 + 64 + 64 = 177 = 16 \times 11 + 1 \equiv 1 \pmod{11}$;
   - Off-diagonal dot product: $7 \times 8 + 8 \times 7 + 8 \times 8 = 56 + 56 + 64 = 176 = 16 \times 11 \equiv 0 \pmod{11}$.

   Hence $O^{\mathsf{T}} O = I_3$ in $M_3(\operatorname{ZMod} 11)$! Defining the graph submodule $T = \{(O y, y) \mid y \in (\operatorname{ZMod} 11)^3\}$ (`LinearMap.range graphMap`), projection onto the second factor gives $\operatorname{finrank}_{\operatorname{ZMod} 11}(T) = 3$; every $(O y, y) \in T$ satisfies $y^{\mathsf{T}}(O^{\mathsf{T}} O - I_3)y = 0 \in \operatorname{ZMod} 11$; and $y = \mathbf{1}$ yields $(\mathbf{1}, \mathbf{1}) \in T$. Thus `IsStochasticLagrangian 11 T` holds! Moreover, since $O^{\mathsf{T}} = O$ and $O^2 = I_3$, $R(11, 1, T)$ is a real symmetric permutation matrix, forcing $\operatorname{Im}(\kappa) = 0$.
2. **Gaussian-integer witness state `psi` and negative rational value**: Take the $11$-tuple of Gaussian integers $v : \operatorname{ZMod} 11 \to \mathbb{Z}[i]$ given by

   $$
   (-2,\; 0,\; -2i,\; 1 - 2i,\; -1 - i,\; 1 + 2i,\; -1 - 2i,\; -2,\; -2i,\; 2 - i,\; 1 - i),
   $$

   whose squared moduli sum to

   $$
   \sum_{a = 0}^{10} |v(a)|^2 = 4 + 0 + 4 + 5 + 2 + 5 + 5 + 4 + 4 + 5 + 2 = 40.
   $$

   Setting $\psi(x) = v(x_0) / \sqrt{40}$ gives $\sum_x \|\psi(x)\|^2 = 40 / 40 = 1$. In the third-moment trace, the normalization factor produces denominator $(\sqrt{40})^6 = 40^3 = 64000$, while summing $\prod_{k=0}^2 v(y_k)\overline{v((Oy)_k)}$ over all $11^3 = 1331$ triples $y \in (\operatorname{ZMod} 11)^3$ yields $-1196$:

   $$
   \kappa(11, 1, \psi, T) = -\frac{1196}{64000} = -\frac{299}{16000} < 0,
   $$

   violating $0 \le \kappa$ in `ComplexOrder`!

::: {.theorem #thm-appg-clifford-third-moment-negative title="Negative Clifford Third-Moment Expectation in Dimension Eleven" lean="D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.result"}
Under `ComplexOrder`, it is not the case that for every prime $d \neq 2$, every natural number $n$, every normalized state $\Psi : (\operatorname{Fin} n \to \operatorname{ZMod} d) \to \mathbb{C}$ satisfying $\sum_x \|\Psi(x)\|^2 = 1$, and every submodule $T$ satisfying `IsStochasticLagrangian d T`, one has

$$
0 \le \kappa(d, n, \Psi, T) \;\land\; \kappa(d, n, \Psi, T) \le 1
$$

(that is, `¬ claim` holds).
:::

::: proof
Assume `claim` holds universally, and instantiate it at prime $d = 11$ (`Nat.Prime 11` and $11 \neq 2$), $n = 1$, the graph submodule $T = \operatorname{range}(\operatorname{graphMap})$ of the mod-$11$ orthogonal stochastic matrix $O = \left(\begin{smallmatrix} 7 & 8 & 8 \\ 8 & 7 & 8 \\ 8 & 8 & 7 \end{smallmatrix}\right)$, and the Gaussian-integer witness state $\psi$ normalized by $\sqrt{40}$. After verifying $O^{\mathsf{T}} O = I_3$, $O\mathbf{1} = \mathbf{1}$, and $\operatorname{finrank}_{\operatorname{ZMod} 11}(T) = 3$ to establish `IsStochasticLagrangian 11 T`, together with $\sum_x \|\psi(x)\|^2 = 1$, the Lean proof evaluates the finite matrix trace $\kappa(11, 1, \psi, T)$ to the exact negative scalar $-1196 / 64000$, contradicting $0 \le \kappa$ in `ComplexOrder`. The full proof is checked by the Lean kernel.
:::

Three strict caveats govern [@thm-appg-clifford-third-moment-negative]:

1. **Preserve `ComplexOrder` faithfully**: Because `kappa` has codomain $\mathbb{C}$, the inequality $0 \le \kappa \le 1$ is typed in `ComplexOrder` (constraining both real and imaginary parts) and must not be silently rewritten as an inequality on `.re` alone.
2. **Existence counterexample at $d = 11$, not a minimal-dimension claim**: The theorem refutes universal odd-prime pointwise nonnegativity via a concrete $d = 11, n = 1$ witness; it **does not claim** that $d = 11$ is the smallest odd prime admitting $\kappa < 0$, nor that $\kappa$ is negative in every dimension.
3. **Distinct from Wigner negativity and from aggregated bounds**: Negativity of a single three-copy Lagrangian moment $\kappa(11, 1, \psi, T)$ is distinct from single-copy discrete Wigner negativity, and refuting the pointwise bound $0 \le \kappa \le 1$ does not refute aggregated magic monotones summed or averaged across all stochastic Lagrangian subspaces.

---

## G.5 Sharp Ellipsoid-Centre Threshold for Three-Setting Steering {#sec-appendix-g-5}

Having examined binary parity codes, phase-space $\ell^1$ polytopes, and third-moment Clifford commutants, we return to the two-qubit correlation geometry of [Chapter 13](ch13-entanglement-and-chsh.md) to locate a sharp threshold for **Einstein–Podolsky–Rosen (EPR) quantum steering**—the operational hierarchy sitting strictly between entanglement and Bell nonlocality.

When Alice and Bob share a two-qubit density matrix $\rho$, projective measurements on Alice's qubit steer Bob's conditional state across a three-dimensional **steering ellipsoid** $\mathcal{E}_{B|A}$ inside Bob's Bloch ball. When the ellipsoid centre $\vec{c}_B$ sits near the origin ($t = \|\vec{c}_B\|$ small) and the ellipsoid has large semi-axes, Bob can measure along three mutually orthogonal spin axes and certify correlations impossible for any local hidden-state (LHS) model; when $\vec{c}_B$ is pushed toward the boundary sphere ($t \to 1$), spherical positivity squeezes the ellipsoid until three-setting steering collapses. **At what exact centre norm $t = \|\vec{c}_B\|$ does three-setting steering $F_3 > 1$ become impossible?**

We align with every formal definition in `SteeringEllipsoidFullyEntangledFraction`, `PauliThreeWeightBayesianInverseUniqueness`, and `SteeringEllipsoidFThreeThreshold`:

- **Local Bloch vectors and correlation matrix**: Let `TwoQubit := Matrix (Fin 2 × Fin 2) (Fin 2 × Fin 2) ℂ`, let `pauli : Fin 3 → Matrix (Fin 2) (Fin 2) ℂ` list $(X, Y, Z)$, and write $\operatorname{vlen}(v) := \sqrt{\sum_{i \in \operatorname{Fin} 3} v_i^2}$. For $\rho : \operatorname{TwoQubit}$, define

  $$
  \begin{aligned}
  \operatorname{blochA}(\rho)_i &:= \operatorname{Re}\operatorname{Tr}\bigl(\rho \cdot (\operatorname{pauli}_i \otimes_k I_2)\bigr), \\
  \operatorname{blochB}(\rho)_j &:= \operatorname{Re}\operatorname{Tr}\bigl(\rho \cdot (I_2 \otimes_k \operatorname{pauli}_j)\bigr), \\
  \operatorname{corr}(\rho)_{i, j} &:= \operatorname{Re}\operatorname{Tr}\bigl(\rho \cdot (\operatorname{pauli}_i \otimes_k \operatorname{pauli}_j)\bigr).
  \end{aligned}
  $$

- **Ellipsoid centre `centreB` with explicit pure-marginal branch**: Rather than letting a pure Alice marginal ($\operatorname{vlen}(\operatorname{blochA}(\rho)) = 1$) fall into Lean's total division-by-zero convention $x / 0 = 0$, `centreB ρ : Fin 3 → ℝ` branches explicitly:

  $$
  \operatorname{centreB}(\rho) := \begin{cases}
  \operatorname{blochB}(\rho), & \text{if } \operatorname{vlen}(\operatorname{blochA}(\rho)) = 1, \\[6pt]
  \displaystyle j \mapsto \frac{\operatorname{blochB}(\rho)_j - \sum_{i \in \operatorname{Fin} 3} \operatorname{corr}(\rho)_{i, j}\,\operatorname{blochA}(\rho)_i}{1 - \operatorname{vlen}(\operatorname{blochA}(\rho))^2}, & \text{if } \operatorname{vlen}(\operatorname{blochA}(\rho)) \neq 1.
  \end{cases}
  $$

- **Three-setting value set `fThreeValues` and supremum `fThree`**: Writing $\operatorname{spin}(r) := r_0 X + r_1 Y + r_2 Z$ for $r : \operatorname{Fin} 3 \to \mathbb{R}$, define

  $$
  \operatorname{fThreeValues}(\rho) := \left\{\, r \in \mathbb{R} \;\middle|\; \begin{aligned}
  &\exists \alpha, \beta : \operatorname{Fin} 3 \to \operatorname{Fin} 3 \to \mathbb{R}, \\
  &(\forall i,\, \operatorname{vlen}(\alpha_i) = 1) \;\land\; (\forall i, j,\, \beta_i \cdot \beta_j = \delta_{i j}) \;\land \\
  &r = \frac{\left\|\sum_{i \in \operatorname{Fin} 3} \operatorname{Tr}\bigl(\rho \cdot (\operatorname{spin}(\alpha_i) \otimes_k \operatorname{spin}(\beta_i))\bigr)\right\|}{\sqrt{3}}
  \end{aligned} \,\right\},
  $$

  and set $\operatorname{fThree}(\rho) := \operatorname{sSup}(\operatorname{fThreeValues}(\rho))$ (note that Alice's three settings $\alpha_i$ need only be unit vectors, whereas Bob's $\beta_i$ form an orthonormal triad; $\operatorname{fThree}(\rho) > 1$ witnesses three-setting steering).

Three hand calculations anchor the formula before the theorem box:

1. **Maximally entangled Bell state $\rho_{\Phi^+} = \lvert\Phi^+\rangle\langle\Phi^+\rvert = \frac{1}{4}(II + XX - YY + ZZ)$**: Here $\operatorname{blochA} = \operatorname{blochB} = (0, 0, 0)$, so the second branch gives $\operatorname{centreB}(\rho_{\Phi^+}) = (0, 0, 0)$ and $t = 0$. Since $\operatorname{corr}(\rho_{\Phi^+}) = \operatorname{diag}(1, -1, 1)$, choosing $\beta = (e_1, e_2, e_3)$ and $\alpha = (e_1, -e_2, e_3)$ gives $r = |1 + 1 + 1|/\sqrt{3} = \sqrt{3}$, saturating $\max(\sqrt{3(1 - 0)}, 1) = \sqrt{3}$ and confirming $\operatorname{fThree}(\rho_{\Phi^+}) = \sqrt{3} > 1$.
2. **Pure product state $\rho_{00} = \lvert 00\rangle\langle 00\rvert$ (exercising the `vlen = 1` branch and the `, 1` floor)**: Here $\operatorname{blochA}(\rho_{00}) = (0, 0, 1)$ has norm $1$, triggering the first branch $\operatorname{centreB}(\rho_{00}) = \operatorname{blochB}(\rho_{00}) = (0, 0, 1)$ ($t = 1$). Although $\sqrt{3(1 - 1)} = 0$, choosing all three of Alice's unit vectors equal to $\alpha_i = (0, 0, 1)$ and tilting Bob's orthonormal triad symmetrically so each $\beta_i$ has $Z$-component $1/\sqrt{3}$ achieves $r = \frac{1}{\sqrt{3}}(\frac{1}{\sqrt{3}} + \frac{1}{\sqrt{3}} + \frac{1}{\sqrt{3}}) = 1$—showing why the universal upper bound must be $\max(\sqrt{3(1 - t)}, 1)$.
3. **Critical threshold $t = \frac{2}{3}$ versus the maximally mixed state $\rho_{\mathrm{mix}} = \frac{1}{4} I_4$**: Equating the two branches gives

   $$
   \sqrt{3(1 - t)} = 1 \;\Longleftrightarrow\; 3(1 - t) = 1 \;\Longleftrightarrow\; t = \frac{2}{3}.
   $$

   Whenever $t \ge \frac{2}{3}$, $\max(\sqrt{3(1 - t)}, 1) = 1$, ruling out $\operatorname{fThree}(\rho) > 1$ for every two-qubit density state. Conversely, $\rho_{\mathrm{mix}} = \frac{1}{4} I_4$ has $t = 0 < \frac{2}{3}$ yet $\operatorname{fThree}(\rho_{\mathrm{mix}}) = 0 \le 1$: thus $t < \frac{2}{3}$ characterizes **which centre lengths admit a steering-violating state**, never claiming that every state with $t < \frac{2}{3}$ violates!

::: {.theorem #thm-appg-steering-fthree-threshold title="Sharp Ellipsoid-Centre Threshold for Three-Setting Steering" lean="D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.result"}
The two-qubit three-setting steering parameter $\operatorname{fThree}$ and ellipsoid-centre norm $\operatorname{vlen}(\operatorname{centreB}(\rho))$ satisfy both of the following:

1. **Universal ellipsoid-centre upper bound**: For every two-qubit matrix $\rho : \operatorname{TwoQubit}$, if $\rho.\operatorname{PosSemidef}$ and $\operatorname{Tr}(\rho) = 1$, then

   $$
   \operatorname{fThree}(\rho) \le \max\!\left(\sqrt{3\bigl(1 - \operatorname{vlen}(\operatorname{centreB}(\rho))\bigr)},\; 1\right).
   $$

2. **Pointwise sharpness below $2/3$**: For every real number $t \in \mathbb{R}$, if $0 \le t < \frac{2}{3}$, then there exists a two-qubit matrix $\rho : \operatorname{TwoQubit}$ such that

   $$
   \rho.\operatorname{PosSemidef} \;\land\; \operatorname{Tr}(\rho) = 1 \;\land\; \operatorname{vlen}\bigl(\operatorname{centreB}(\rho)\bigr) = t \;\land\; 1 < \operatorname{fThree}(\rho).
   $$

:::

::: proof
The proof establishes the universal upper bound and the sharpness witness in turn. First, for any positive-semidefinite trace-one matrix $\rho$, `fThreeValues ρ` is shown to be nonempty and bounded above so that the conditional real supremum `sSup` is well-behaved. When $\operatorname{vlen}(\operatorname{blochA}(\rho)) = 1$, pure-marginal factorization reduces the correlation tensor to product form, and Cauchy–Schwarz across Bob's orthonormal triad gives $\operatorname{fThree}(\rho) \le 1 \le \max(\dots, 1)$; when $\operatorname{vlen}(\operatorname{blochA}(\rho)) < 1$, the spin-flip purity identity `flip_purity_identity` together with the ellipsoid-radius bounds `bob_radius_le` and `delta_le_centre` from `SteeringEllipsoidCHSH` bound every three-setting sum above by $\max(\sqrt{3(1 - \operatorname{vlen}(\operatorname{centreB}(\rho)))}, 1)$. Second, for any $0 \le t < 2/3$, instantiating the explicit witness family `tightState` (with `tight_psd`, unit trace, and `tight_centre`) and evaluating `tight_readouts` on a symmetric orthonormal triad achieves $\sqrt{3(1 - t)} > \sqrt{3(1 - 2/3)} = 1$, proving $1 < \operatorname{fThree}(\rho)$. The full proof is checked by the Lean kernel.
:::

Total-function and physical boundaries remain explicit: `sSup` and `Real.sqrt` (which evaluates to `0` on negative inputs in Lean) carry operational steering meaning only under `PosSemidef` and `trace ρ = 1`; furthermore, $F_3 > 1$ tests the three-orthonormal-setting linear steering inequality on Bob and **does not** equate to all-setting one-way steering or full Bell nonlocality.

---

## G.6 Synthesis and Epistemic Scope Audit Table {#sec-appendix-g-6}

Taken together, Sections G.1–G.5 chart both sides of the finite-dimensional frontier outside the stabilizer polytope and local hidden-state models: alongside two exact positive laws—the **multiplicative equatorial Wigner tensor rule** ([@thm-appg-wigner-equatorial-tensor]) and the **sharp $t = 2/3$ ellipsoid-centre threshold for three-setting steering** ([@thm-appg-steering-fthree-threshold])—stand three exact obstructions and counterexamples that cut off plausible over-generalizations: **low-weight logical operators in binary self-orthogonal parity codes up to $14$ modes** ([@thm-appg-majorana-fourteen-bound]), **non-factorization of the off-equator two-qubit Wigner tensor deficit** ([@thm-appg-wigner-deficit-nonfactorization]), and **negative Clifford third-moment expectation at odd prime dimension $d = 11$** ([@thm-appg-clifford-third-moment-negative]).

The table below audits the exact hypotheses, verified conclusions, and non-negotiable epistemic boundaries of all five kernel-verified theorems in this appendix (reiterating that the five quantities live in distinct algebraic settings—binary linear codes, one- and two-qubit discrete Wigner convex geometry, odd-prime three-copy Clifford representation theory, and two-qubit steering ellipsoids—with **no claim** of mutual equivalence):

| Section & Theorem | Frozen Lean Declaration (`LEAN ✓`) | Role | Exact Hypotheses & Domain | Kernel-Verified Conclusion | Epistemic Boundary (Never Overclaim) |
| :--- | :--- | :---: | :--- | :--- | :--- |
| G.1 [@thm-appg-majorana-fourteen-bound] | [`MajoranaFourteenModeDistanceFour.result`](lean:D5/S3/Quantum/Codes/MajoranaFourteenModeDistanceFour.result) | Obstruction bound | $n \le 14$, binary $c \subseteq \mathbb{F}_2^n$ self-orthogonal, $\mathbf{1} \in c$, $2\dim c < n$ | Exists $v \in c^\perp \setminus c$ with $\operatorname{hammingNorm}(v) < 4$ | Rules out distance $\ge 4$ in this family (never claims to construct a distance-$4$ code); finite binary algebra only |
| G.2 [@thm-appg-wigner-equatorial-tensor] | [`QubitWignerDistanceTensorRules.resultEquatorial`](lean:D5/S3/Quantum/Magic/QubitWignerDistanceTensorRules.resultEquatorial) | Positive tensor law | Qubit `IsDensity ρ`, `IsDensity σ`, and $\operatorname{bloch}(\rho,\mathrm{Z}) = \operatorname{bloch}(\sigma,\mathrm{Z}) = 0$ | $\operatorname{CTwo}(\rho \otimes_k \sigma) = \operatorname{COne}(\rho) + \operatorname{COne}(\sigma) + \operatorname{COne}(\rho)\operatorname{COne}(\sigma)$ | Covers pure and mixed equatorial states alike (do not add purity), but never extrapolates off the equator or to other metrics |
| G.3 [@thm-appg-wigner-deficit-nonfactorization] | [`QubitWignerDeficitFactorRefutation.result`](lean:D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.result) | Refutation (`¬ claim`) | Equatorial `IsDensity ρ` ($\operatorname{COne}(\rho) > 0$) and positive-octant `IsDensity σ` ($xyz > 0$) | No single function $f$ satisfies $\operatorname{deficit}(\rho,\sigma) = \operatorname{COne}(\rho)f(\sigma)$ universally | Refutes universal single-factor factorization only, not fixed-pair ratios or general bivariate bounds |
| G.4 [@thm-appg-clifford-third-moment-negative] | [`CliffordThirdMomentNegativity.result`](lean:D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.result) | Refutation (`¬ claim`) | Odd prime $d \neq 2$, unit state $\Psi$, `IsStochasticLagrangian d T` ($d=11, n=1$ witness) | Refutes universal pointwise $0 \le \kappa \le 1$ in `ComplexOrder` ($\kappa = -1196/64000 < 0$) | Keep `ComplexOrder` on $\mathbb{C}$; $d=11$ is an existence witness (not claimed minimal); distinct from Wigner negativity and summed bounds |
| G.5 [@thm-appg-steering-fthree-threshold] | [`SteeringEllipsoidFThreeThreshold.result`](lean:D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.result) | Upper bound + sharp threshold | Two-qubit PSD trace-$1$ $\rho$; `centreB` includes explicit `vlen(blochA)=1` branch | $\operatorname{fThree}(\rho) \le \max(\sqrt{3(1-t)}, 1)$, and $\forall\, 0 \le t < 2/3$, $\exists \rho$ with $t$ and $\operatorname{fThree} > 1$ | Never claim every state with $t < 2/3$ violates (e.g., $\frac{1}{4}I_4$ has $t=0, F_3=0$), nor equate $F_3 > 1$ to all nonlocality |
