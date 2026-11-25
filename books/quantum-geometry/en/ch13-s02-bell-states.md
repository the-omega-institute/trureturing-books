# 13.2 Bell States: Central Marginals and Shared Correlations {#sec-bell-local-zero}

Let us now zoom in on the Bell pure state $\mathrm{bellVector} = \lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ and its density matrix $\mathrm{bellDensity} = \lvert\Phi^+\rangle\langle\Phi^+\rvert$ from [@thm-local-correlation-sectors].

If a classical observer believes that "a whole is nothing more than the sum of its local parts," then hearing that a two-qubit system is in a globally pure, rank-one, idempotent state ($\rho^2 = \rho$) would lead them to expect each individual qubit to point along some definite pure direction on its own Bloch sphere. The next lemma establishes the exact opposite via seven matrix conjuncts: when the two qubits are maximally interwoven into the Bell state, each local marginal collapses all the way to the center of the ball!

::: {.lemma #lemma-bell-mixed-marginal title="The Bell Pure State Has a Maximally Mixed Marginal" lean="D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal"}
For the fixed two-qubit Bell state vector $\mathrm{bellVector} = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ and the fixed $4\times 4$ complex density matrix $\mathrm{bellDensity} = \mathrm{vecMulVec}\,\mathrm{bellVector}\,(\mathrm{star}\,\mathrm{bellVector})$, all seven properties hold:

1. **Unit vector normalization**: $\mathrm{star}\,\mathrm{bellVector} \mathbin{\cdot_{\mathrm{v}}} \mathrm{bellVector} = 1$;
2. **Global positive semidefiniteness**: $\mathrm{bellDensity}.\mathrm{PosSemidef}$;
3. **Global unit trace**: $\Tr(\mathrm{bellDensity}) = 1$;
4. **Global rank one**: $\operatorname{rank}(\mathrm{bellDensity}) = 1$;
5. **Global projective idempotence**: $\mathrm{bellDensity} \cdot \mathrm{bellDensity} = \mathrm{bellDensity}$;
6. **Maximally mixed marginal upon tracing out the second factor**:

   $$
   \mathrm{traceEnvironment}(\mathrm{bellDensity}) = \Bigl(\frac{1}{2} : \mathbb{C}\Bigr) \cdot (1 : \mathrm{QubitMatrix}) = \frac{1}{2}I_2;
   $$

7. **Strict non-idempotence of the reduced marginal**:

   $$
   \mathrm{traceEnvironment}(\mathrm{bellDensity}) \cdot \mathrm{traceEnvironment}(\mathrm{bellDensity}) \neq \mathrm{traceEnvironment}(\mathrm{bellDensity}).
   $$
:::

::: proof
Expanding over the four basis indices $(0,0), (0,1), (1,0), (1,1)$, $\mathrm{bellVector}$ takes value $1/\sqrt{2}$ at $(0,0)$ and $(1,1)$ and $0$ elsewhere, so its inner product with itself is $(1/\sqrt{2})^2 + (1/\sqrt{2})^2 = 1$ (property 1). Its rank-one outer product $\mathrm{bellDensity}$ is therefore positive semidefinite, has trace $1$ and rank $1$, and satisfies $(\lvert\Phi^+\rangle\langle\Phi^+\rvert)^2 = \langle\Phi^+\mid\Phi^+\rangle\lvert\Phi^+\rangle\langle\Phi^+\rvert = \mathrm{bellDensity}$ (properties 2–5). Summing over the second index $a \in \mathrm{Fin}\,2$ in $\mathrm{traceEnvironment}(\mathrm{bellDensity})_{i,j} = \sum_{a \in \{0,1\}} (\mathrm{bellDensity})_{(i,a),(j,a)}$ gives $1/2 + 0 = 1/2$ for $i = j = 0$, $0 + 1/2 = 1/2$ for $i = j = 1$, and $0$ for $i \neq j$ because $\mathrm{bellVector}$ has support only on diagonal pairs $(0,0)$ and $(1,1)$. Hence $\mathrm{traceEnvironment}(\mathrm{bellDensity}) = \frac{1}{2}I_2$ (property 6). Squaring gives $(\frac{1}{2}I_2)(\frac{1}{2}I_2) = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$, proving non-idempotence of the marginal (property 7). The full proof is checked by the Lean kernel.
:::

Measured against the criterion of [Chapter 3](ch03-projectors-and-duality.md) ("existence as an idempotent line $P^2 = P$"), properties 5 and 7 of [@lemma-bell-mixed-marginal] form a striking contrast (Figure 13, Panel II):

- Globally in $4\times 4$ space, $\mathrm{bellDensity}^2 = \mathrm{bellDensity}$ holds strictly — the pair is an uncompromising rank-one idempotent projector;
- Locally in $2\times 2$ space, $(\frac{1}{2}I_2)^2 = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$ — Alice's local Bloch vector $\vv{r} = \vv{0}$ and Bob's local Bloch vector $\vv{s} = \vv{0}$ both vanish at the center of $S^2$!

Where did the global purity go? Expanding $\rho_{\Phi^+} = \mathrm{bellDensity}$ in the four Pauli sectors tells the whole story:

$$
\rho_{\Phi^+} = \frac{1}{4}\bigl(I_2 \otimes I_2 + \sigma_X \otimes \sigma_X - \sigma_Y \otimes \sigma_Y + \sigma_Z \otimes \sigma_Z\bigr).
$$

Every local coefficient along $\sigma_i \otimes I_2$ and $I_2 \otimes \sigma_j$ is $0$, while inside the $9$-dimensional correlation sector $\sigma_i \otimes \sigma_j$, the three diagonal cells $(X,X)$, $(Y,Y)$, and $(Z,Z)$ carry unit correlation entries $+1$, $-1$, and $+1$, forming the correlation matrix $T_{\Phi^+} = \operatorname{diag}(+1, -1, +1)$!

When applying [@lemma-bell-mixed-marginal], two precise boundaries must be respected:

1. **Distinguishing the frozen triplet $\lvert\Phi^+\rangle$ from the singlet $\lvert\Psi^-\rangle$**: The declaration [@lemma-bell-mixed-marginal] is proved for the triplet Bell state $\mathrm{bellVector} = \lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$, whose correlation tensor is $T_{\Phi^+} = \operatorname{diag}(+1, -1, +1)$ (because $\sigma_Y \otimes \sigma_Y$ contains two factors of $-i$ whose product $(-i)^2 = -1$ gives a minus sign on $\lvert 00\rangle \leftrightarrow \lvert 11\rangle$). By contrast, since $i\sigma_Y\lvert 0\rangle = -\lvert 1\rangle$ and $i\sigma_Y\lvert 1\rangle = \lvert 0\rangle$, the antisymmetric singlet state obeys the exact vector identity $\lvert\Psi^-\rangle = \frac{1}{\sqrt{2}}(\lvert 01\rangle - \lvert 10\rangle) = \bigl(I_2 \otimes (-i\sigma_Y)\bigr)\lvert\Phi^+\rangle = (i\sigma_Y \otimes I_2)\lvert\Phi^+\rangle$ (whereas $(I_2 \otimes i\sigma_Y)\lvert\Phi^+\rangle = -\lvert\Psi^-\rangle$ differs by a global $-1$ phase while yielding the same density matrix $\rho_{\Psi^-}$), and has Pauli decomposition

   $$
   \rho_{\Psi^-} = \frac{1}{4}\bigl(I_2 \otimes I_2 - \sigma_X \otimes \sigma_X - \sigma_Y \otimes \sigma_Y - \sigma_Z \otimes \sigma_Z\bigr), \qquad T_{\Psi^-} = -I_3 = \operatorname{diag}(-1, -1, -1).
   $$

   While $\lvert\Psi^-\rangle$ exhibits isotropic anti-correlation $\langle(\vv{n}\cdot\vv{\sigma})\otimes(\vv{n}\cdot\vv{\sigma})\rangle_{\Psi^-} = -1$ along every shared axis $\vv{n} \in S^2$, $\lvert\Phi^+\rangle$ exhibits positive correlation $+1$ along every shared axis in the real $(Z, X)$ meridian plane ($n_y = 0$) and $-1$ along the $Y$ axis. The Pauli signs of $\lvert\Phi^+\rangle$ and $\lvert\Psi^-\rangle$ are converted into one another by the local rotation $-i\sigma_Y = \sigma_X \sigma_Z$ on Bob's qubit (or $i\sigma_Y = \sigma_Z \sigma_X$ on Alice's qubit) and must never be conflated.
2. **A vanishing local Bloch line ($\frac{1}{2}I_2$) does not by itself imply entanglement for arbitrary states**: Only when the global state is already known to be **pure** ($\operatorname{rank}\rho = 1$, $\Tr(\rho^2) = 1$) does a maximally mixed marginal $\frac{1}{2}I_2$ certify maximal two-qubit entanglement. For general mixed states — such as $\mathrm{classicalCorrelatedDensity} = \frac{1}{4}(I_4 + \sigma_Z \otimes \sigma_Z)$ ($T = \operatorname{diag}(0,0,1)$) in [@thm-local-correlation-sectors] or the completely maximally mixed state $\frac{1}{4}I_4$ ($T = 0$) — the local marginals are also $\frac{1}{2}I_2$ without any entanglement whatsoever.

Alongside partial traces, applying **partial transposition** on the first factor of a two-term Kronecker sum exposes the algebraic rigidity of Bell-type superpositions through matrix-rank doubling. Check first the $2\times 1$ column example corresponding to the unnormalized Bell vector $\lvert 00\rangle + \lvert 11\rangle$: take $m_1 = m_2 = 2$, $n_1 = n_2 = 1$, and $A_1 = B_1 = \binom{1}{0}$, $A_2 = B_2 = \binom{0}{1}$, so that both pairs $(A_1, A_2)$ and $(B_1, B_2)$ are linearly independent over $\mathbb{C}$. Their two-term sum $\operatorname{tensorSum}(A_1, A_2, B_1, B_2) = A_1 \otimes_{\mathrm{K}} B_1 + A_2 \otimes_{\mathrm{K}} B_2$ is the $4\times 1$ column $(1, 0, 0, 1)^T$ of rank $1$, whereas applying the ordinary matrix transpose to the first factor gives $\operatorname{partialTranspose}(A_1, A_2, B_1, B_2) = A_1^T \otimes_{\mathrm{K}} B_1 + A_2^T \otimes_{\mathrm{K}} B_2 = \bigl(\begin{smallmatrix} 1 & 0 \\ 0 & 1 \end{smallmatrix}\bigr) = I_2$ of rank $2 = 2 \cdot 1$. Comparing block concatenations, stacking vertically yields $\operatorname{fromRows}(A_1, A_2) = (1, 0, 0, 1)^T$ of rank $\operatorname{vRank}(A_1, A_2) = 1$, while concatenating horizontally yields $\operatorname{fromCols}(A_1, A_2) = I_2$ of rank $\operatorname{hRank}(A_1, A_2) = 2 = 2\,\operatorname{vRank}(A_1, A_2)$ (and identically for $B_1, B_2$).

More generally, for arbitrary natural-number dimensions $m_1, n_1, m_2, n_2 \in \mathbb{N}$ and rectangular complex matrices $A_1, A_2 \in M_{m_1 \times n_1}(\mathbb{C})$, $B_1, B_2 \in M_{m_2 \times n_2}(\mathbb{C})$, define $\operatorname{tensorSum}(A_1, A_2, B_1, B_2) := A_1 \otimes_{\mathrm{K}} B_1 + A_2 \otimes_{\mathrm{K}} B_2$, $\operatorname{partialTranspose}(A_1, A_2, B_1, B_2) := \operatorname{tensorSum}(A_1^T, A_2^T, B_1, B_2)$, the horizontal block rank $\operatorname{hRank}(X_1, X_2) := \operatorname{rank}\bigl(\operatorname{fromCols}(X_1, X_2)\bigr) \in \mathbb{N}$, and the vertical block rank $\operatorname{vRank}(X_1, X_2) := \operatorname{rank}\bigl(\operatorname{fromRows}(X_1, X_2)\bigr) \in \mathbb{N}$. The classification theorem below characterizes when partial transposition achieves the extremal factor-of-two rank saturation.

::: {.theorem #thm-partial-transpose-rank-saturation title="Partial-Transpose Rank Saturation for Two-Term Tensor Sums" lean="D5/S3/Quantum/Entanglement/PartialTransposeSaturation/Classification.result"}
Let $m_1, n_1, m_2, n_2 \in \mathbb{N}$, and let $A_1, A_2 \in M_{m_1 \times n_1}(\mathbb{C})$ and $B_1, B_2 \in M_{m_2 \times n_2}(\mathbb{C})$ satisfy $\operatorname{LinearIndependent}_{\mathbb{C}}\,![A_1, A_2]$ and $\operatorname{LinearIndependent}_{\mathbb{C}}\,![B_1, B_2]$. Then the rank of the partial transpose equals twice the rank of the two-term tensor sum if and only if both pairs simultaneously double in vertical block rank or simultaneously double in horizontal block rank:

$$
\begin{aligned}
&\operatorname{rank}\bigl(\operatorname{partialTranspose}(A_1, A_2, B_1, B_2)\bigr) = 2\,\operatorname{rank}\bigl(\operatorname{tensorSum}(A_1, A_2, B_1, B_2)\bigr) \\
\iff\;& \bigl(\operatorname{vRank}(A_1, A_2) = 2\,\operatorname{hRank}(A_1, A_2) \;\land\; \operatorname{vRank}(B_1, B_2) = 2\,\operatorname{hRank}(B_1, B_2)\bigr) \\
&\lor\; \bigl(\operatorname{hRank}(A_1, A_2) = 2\,\operatorname{vRank}(A_1, A_2) \;\land\; \operatorname{hRank}(B_1, B_2) = 2\,\operatorname{vRank}(B_1, B_2)\bigr).
\end{aligned}
$$
:::

::: proof
Under $\mathbb{C}$-linear independence of $(A_1, A_2)$ and of $(B_1, B_2)$, row-space and column-space decompositions express the rank of $A_1 \otimes_{\mathrm{K}} B_1 + A_2 \otimes_{\mathrm{K}} B_2$ through the horizontal and vertical concatenation ranks $\operatorname{hRank}$ and $\operatorname{vRank}$ of both pairs, while ordinary transposition $(\cdot)^T$ on the first factor swaps its horizontal and vertical ranks: $\operatorname{hRank}(A_1^T, A_2^T) = \operatorname{vRank}(A_1, A_2)$ and $\operatorname{vRank}(A_1^T, A_2^T) = \operatorname{hRank}(A_1, A_2)$. Subspace-sum bounds limit the partial-transpose rank to at most twice the rank of $\operatorname{tensorSum}(A_1, A_2, B_1, B_2)$, and equality holds if and only if the two summands collapse maximally along columns (or rows) before partial transposition while forming a zero-intersection direct sum after swapping row and column spaces on the first factor, splitting cleanly into either $\operatorname{vRank} = 2\,\operatorname{hRank}$ on both pairs or $\operatorname{hRank} = 2\,\operatorname{vRank}$ on both pairs. The full proof is checked by the Lean kernel.
:::

Mind the exact scope of [@thm-partial-transpose-rank-saturation]: the dimensions $m_1, n_1, m_2, n_2 \in \mathbb{N}$ are arbitrary rectangular matrix sizes (not restricted to square density matrices), `partialTranspose` applies the **ordinary transpose** $A_i^T$ (not the conjugate transpose $A_i^*$) on the first factor, and $\operatorname{rank}$ is $\mathbb{N}$-valued; moreover, $\mathbb{C}$-linear independence of both pairs and the restriction to two-term tensor sums are essential hypotheses, so the result does not extrapolate to sums of three or more Kronecker terms, general mixed-state Peres–Horodecki PPT separability, or a direct CHSH-violation test from matrix rank alone.

## 13.2.1 Bell-Diagonal Geometry, Pure-State Conservation, and Rank Saturation {#sec-ch13-2-1-bell-tetrahedron-pythagorean-pt-rank}

Above, [@lemma-bell-mixed-marginal] and [@thm-partial-transpose-rank-saturation] established the central marginal of the Bell state and the rank-doubling classification for two-term tensor sums. Pursuing these two results raises four quantitative questions: on the Bell-diagonal tetrahedron of central-marginal states (with marginal $\frac{1}{2}I_2$), what three-dimensional Euclidean volume fractions are separable, entangled yet CHSH-local, and CHSH-violating; what conservation law links local Bloch length, correlation tensor, and entanglement for every two-qubit pure state; why is each hypothesis of [@thm-partial-transpose-rank-saturation] sharp; and how do partial-transpose rank transitions compare with maximal CHSH values across canonical states? We answer these four questions in turn.

### 13.2.1.1 Bell-Diagonal Tetrahedron, Octahedron, and CHSH Volume {#sec-ch13-2-1-1-bell-tetrahedron-octahedron-chsh-volume}

Consider the diagonal-correlation states with vanishing local Bloch vectors, $\rho(\mathbf{t}) = \frac{1}{4}\bigl(I_4 + \sum_{j=1}^3 t_j\,\sigma_j \otimes \sigma_j\bigr)$, where $\mathbf{t} = (t_1, t_2, t_3) \in \mathbb{R}^3$ and $\sigma_1, \sigma_2, \sigma_3$ denote the Pauli matrices $\sigma_X, \sigma_Y, \sigma_Z$. In the Bell basis $(\lvert\Phi^+\rangle, \lvert\Phi^-\rangle, \lvert\Psi^+\rangle, \lvert\Psi^-\rangle)$, the state $\rho(\mathbf{t})$ diagonalizes into the four linear eigenvalues $\lambda_v = \frac{1 + v \cdot \mathbf{t}}{4}$ indexed by the sign vertices $v_{\Phi^+} = (1, -1, 1)$, $v_{\Phi^-} = (-1, 1, 1)$, $v_{\Psi^+} = (1, 1, -1)$, and $v_{\Psi^-} = (-1, -1, -1)$. Because $\sum_v v = 0$ and $\sum_v v v^T = 4I_3$, these four eigenvalues are barycentric coordinates on the regular tetrahedron $\mathcal{T} := \{\mathbf{t} \in \mathbb{R}^3 \mid \forall v,\; 1 + v \cdot \mathbf{t} \ge 0\}$; the simplex determinant has absolute value $16$, giving Euclidean volume $\operatorname{Vol}(\mathcal{T}) = \frac{8}{3}$.

Taking the partial transpose $\rho(\mathbf{t})^{T_A}$ on the first qubit uses $\sigma_Y^T = -\sigma_Y$ to reflect the coordinates to $(t_1, -t_2, t_3)$ and map the eigenvalue multiset $\{\lambda_v\}$ to $\{\frac{1}{2} - \lambda_v\}$. The eight face inequalities of $\mathcal{T}$ and the reflected tetrahedron $\mathcal{T}^{T_A}$ exhaust all sign choices $\pm t_1 \pm t_2 \pm t_3 \le 1$, so their intersection is precisely the regular octahedron $\mathcal{O} := \{\mathbf{t} \in \mathbb{R}^3 \mid |t_1| + |t_2| + |t_3| \le 1\}$, of volume $8 \cdot \frac{1}{6} = \frac{4}{3}$, or exactly $\frac{1}{2}$ of $\mathcal{T}$. Each axis vertex $\pm e_j$ is an equal mixture of product eigenstates, so convexity together with the two-qubit PPT criterion (A. Peres, *Separability Criterion for Density Matrices*, *Phys. Rev. Lett.* **77**(8), 1996, pp. 1413–1415, Eqs. (3), (6), [10.1103/PhysRevLett.77.1413](https://doi.org/10.1103/PhysRevLett.77.1413); R. Horodecki & M. Horodecki, *Information-theoretic aspects of inseparability of mixed states*, *Phys. Rev. A* **54**(3), 1996, pp. 1838–1843, §§IV–V, [10.1103/PhysRevA.54.1838](https://doi.org/10.1103/PhysRevA.54.1838); M. Horodecki, P. Horodecki & R. Horodecki, *Separability of mixed states: necessary and sufficient conditions*, *Phys. Lett. A* **223**(1–2), 1996, pp. 1–8, Theorem 3, [10.1016/S0375-9601(96)00706-2](https://doi.org/10.1016/S0375-9601%2896%2900706-2)) shows that $\rho(\mathbf{t})$ is separable if and only if $\mathbf{t} \in \mathcal{O}$.

The complement $\mathcal{T} \setminus \mathcal{O}$ splits into four congruent corner tetrahedra cut off by $\lambda_v > \frac{1}{2}$, each homothetic at linear scale $\frac{1}{2}$ to $\mathcal{T}$ and therefore of volume $\frac{1}{3}$. Across $\mathcal{T}$, the least partial-transpose eigenvalue is $\lambda_{\min}(\rho^{T_A}) = \frac{1}{2} - \lambda_{\max}$, so at most one eigenvalue is negative and the negativity equals $\mathcal{N}(\rho) = \max(0, \lambda_{\max} - \frac{1}{2})$. Because the spin flip $\widetilde{\rho} = (\sigma_Y \otimes \sigma_Y)\bar{\rho}(\sigma_Y \otimes \sigma_Y)$ fixes each Bell projector, Wootters' matrix is $R = \sqrt{\sqrt{\rho}\,\widetilde{\rho}\,\sqrt{\rho}} = \rho$ (W. K. Wootters, *Entanglement of Formation of an Arbitrary State of Two Qubits*, *Phys. Rev. Lett.* **80**(10), 1998, pp. 2245–2248, Eqs. (4)–(5), (9)–(10), [10.1103/PhysRevLett.80.2245](https://doi.org/10.1103/PhysRevLett.80.2245)), yielding the exact linear concurrence law $C(\rho) = 2\mathcal{N}(\rho) = \max(0, 2\lambda_{\max} - 1)$.

We next overlay the two-setting spin CHSH test on $\mathcal{T}$ (below, "CHSH-local" always means $S_{\max} \le 2$ for this two-setting spin test, as distinct from general projective local hidden-variable models). By the Horodecki criterion (R. Horodecki, P. Horodecki & M. Horodecki, *Violating Bell inequality by mixed spin-½ states: necessary and sufficient condition*, *Phys. Lett. A* **200**(5), 1995, pp. 340–344, [10.1016/0375-9601(95)00214-N](https://doi.org/10.1016/0375-9601%2895%2900214-N)), the maximal spin CHSH expectation of any two-qubit state is $S_{\max}(\rho) = 2\sqrt{M(\rho)}$, where $M(\rho)$ sums the two largest eigenvalues of $T^T T$; for Bell-diagonal states, letting $t_{(1)}, t_{(2)}$ denote the two coordinates of largest absolute value gives $M(\mathbf{t}) = t_{(1)}^2 + t_{(2)}^2$. Throughout $\mathcal{O}$ we have $M(\mathbf{t}) \le (\sum_{j=1}^3 |t_j|)^2 \le 1$, confining violation strictly to the four entangled corners. In the $\Phi^+$ corner, write $\mathbf{t} = (x, -y, z)$ in the ordered sector $x \ge y \ge z \ge 0$: among the four face bounds, $1 - x - y + z \ge 0$ lies below the other three by $2(x + y)$, $2(x - z)$, and $2(y - z)$, giving the sole active lower bound $z \ge x + y - 1$; violation $x^2 + y^2 > 1$ forces $x + y > 1$, so for each $x \in (1/\sqrt{2}, 1]$ and $y \in (\sqrt{1 - x^2}, x]$, the coordinate $z$ sweeps an interval of length $1 - x$, namely $[x + y - 1, y]$. Since coordinate permutations and paired sign flips preserve both the tetrahedron $\mathcal{T}$ and the CHSH condition, multiplying by $4$ corners and $6$ coordinate permutations yields the closed form:

$$
\begin{aligned}
\lambda_{\Phi^\pm} &= \frac{1 \pm t_1 \mp t_2 + t_3}{4}, \qquad \lambda_{\Psi^\pm} = \frac{1 \pm t_1 \pm t_2 - t_3}{4}, \qquad \lambda_{\min}\bigl(\rho^{T_A}\bigr) = \frac{1}{2} - \lambda_{\max}, \\
C(\rho) &= 2\mathcal{N}(\rho) = \max\bigl(0,\, 2\lambda_{\max} - 1\bigr), \qquad \frac{\operatorname{Vol}(\mathcal{O})}{\operatorname{Vol}(\mathcal{T})} = \frac{4/3}{8/3} = \frac{1}{2}, \\
V_{\mathrm{CHSH}} &= 24 \int_{1/\sqrt{2}}^{1} \int_{\sqrt{1 - x^2}}^{x} (1 - x)\,dy\,dx = 4 + 4\sqrt{2} - 3\pi.
\end{aligned}
$$

Dividing the total violating volume $V_{\mathrm{CHSH}} = 4 + 4\sqrt{2} - 3\pi \approx 0.232076$ (each corner cap has volume $1 + \sqrt{2} - \frac{3\pi}{4} \approx 0.058019$) by $\frac{8}{3}$ splits $\mathcal{T}$ into three exact Euclidean fractions: $\frac{1}{2}$ ($0.500000$) separable, $\frac{9\pi}{8} - 1 - \frac{3\sqrt{2}}{2} \approx 0.412971$ entangled yet CHSH-local, and $\frac{3}{2} + \frac{3\sqrt{2}}{2} - \frac{9\pi}{8} \approx 0.087029$ CHSH-violating—so over four-fifths of the entangled Bell-diagonal volume satisfies every spin CHSH inequality.

Along the main diagonal $\mathbf{t} = (-p, -p, -p)$, the Werner family $\rho_W(p) = (1 - p)\frac{I_4}{4} + p\lvert\Psi^-\rangle\langle\Psi^-\rvert$ (R. F. Werner, *Quantum states with Einstein-Podolsky-Rosen correlations admitting a hidden-variable model*, *Phys. Rev. A* **40**(8), 1989, pp. 4277–4281, [10.1103/PhysRevA.40.4277](https://doi.org/10.1103/PhysRevA.40.4277); and Peres 1996, Eqs. (7)–(8)) condenses this layering into a one-dimensional slice. This family is physical on $[-\frac{1}{3}, 1]$ and separable on $[-\frac{1}{3}, \frac{1}{3}]$; since $M(\rho_W(p)) = 2p^2$, CHSH violation occurs exactly when $p > \frac{1}{\sqrt{2}} \approx 0.707107$, leaving a gap of width $\frac{1}{\sqrt{2}} - \frac{1}{3} \approx 0.373773$ on the entangled CHSH-local interval $(\frac{1}{3}, \frac{1}{\sqrt{2}}]$.

Pure integer comparisons $2 \cdot 7^2 = 98 < 100 = 10^2$ and $2 \cdot 5^2 = 50 > 49 = 7^2$ bracket this threshold between $p = \frac{7}{10}$ ($M = \frac{49}{50}$, $S_{\max} = \frac{7\sqrt{2}}{5} \approx 1.979899 < 2$, yet $C = \frac{11}{20}$) and $p = \frac{5}{7}$ ($M = \frac{50}{49}$, $S_{\max} = \frac{10\sqrt{2}}{7} \approx 2.020305 > 2$). The table below pairs the continuum fractions (rounded to six decimal places) with finite integer-grid censuses at denominators $N = 12, 24$ (boundaries assigned to the non-strict regions):

| Region | Continuum fraction | Rounded | $N = 12$ (of $5225$) | $N = 24$ (of $39249$) |
| :----------------------- | :-------------------- | -------------: | -----------------: | ---------------------: |
| Separable ($\mathcal{O}$) | $\frac{1}{2}$ | $0.500000$ | $2625$ | $19649$ |
| Entangled ($S_{\max} \le 2$) | $\frac{9\pi}{8} - 1 - \frac{3\sqrt{2}}{2}$ | $0.412971$ | $1900$ | $15416$ |
| Violating ($S_{\max} > 2$) | $\frac{3}{2} + \frac{3\sqrt{2}}{2} - \frac{9\pi}{8}$ | $0.087029$ | $700$ | $4184$ |

### 13.2.1.2 Pure-State Pythagorean Lock and Rational Families {#sec-ch13-2-1-2-pure-state-pythagorean-lock}

Turn now to an arbitrary normalized two-qubit pure state $\lvert\psi\rangle = \sum_{i,j=0}^1 c_{ij}\lvert ij\rangle$, arranged as the $2 \times 2$ amplitude matrix $A = (c_{ij})$ with $\|A\|_F^2 = 1$. Summing over the second or first index gives the reduced marginals $\rho_A = A A^*$ and $\rho_B = A^T \overline{A}$: both have trace $1$ and determinant $|\det A|^2$, hence the same two-point spectrum $\frac{1 \pm \sqrt{1 - C^2}}{2}$, where $C(\psi) := 2|\det A| = 2|c_{00}c_{11} - c_{01}c_{10}| \in [0, 1]$ is the pure-state concurrence (Wootters 1998, Eq. (7)). Comparing with the single-qubit Bloch determinant $\det\rho_A = \frac{1 - \|\vv{r}\|^2}{4}$ shows that both local Bloch lengths coincide and satisfy the exact Pythagorean lock $\|\vv{r}\|^2 + C(\psi)^2 = 1$; combining this with the Pauli orthogonality identity $4\Tr(\rho^2) = 1 + \|\vv{r}\|^2 + \|\vv{s}\|^2 + \|T\|_F^2 = 4$ locks the squared Frobenius norm of the correlation sector to $\|T\|_F^2 = 1 + 2C(\psi)^2$.

This conservation law also explains the sharp contrast between pure and mixed states under CHSH tests. Applying the singular value decomposition of $A$, local unitaries take $\lvert\psi\rangle$ to $u\lvert 00\rangle + v\lvert 11\rangle$ ($u, v \ge 0$, $u^2 + v^2 = 1$, $C = 2uv$), whose correlation tensor is diagonal, $\operatorname{diag}(C, -C, 1)$. Since local unitaries induce real orthogonal rotations on Pauli coordinates and preserve singular values, every two-qubit pure state has correlation tensor $T$ with singular values $(1, C, C)$ and $T^T T$ eigenvalues $(1, C^2, C^2)$, giving $S_{\max}(\psi) = 2\sqrt{1 + C(\psi)^2}$—the exact form of Gisin's theorem (N. Gisin, *Bell's inequality holds for all non-product states*, *Phys. Lett. A* **154**(5–6), 1991, pp. 201–202, [10.1016/0375-9601(91)90805-I](https://doi.org/10.1016/0375-9601%2891%2990805-I)): every entangled two-qubit pure state ($C > 0$) violates CHSH. At the same time, the second boundary of [@lemma-bell-mixed-marginal] becomes transparent: for mixed states, a positive purity deficit $1 - \Tr(\rho^2) = \frac{3 - (\|\vv{r}\|^2 + \|\vv{s}\|^2 + \|T\|_F^2)}{4} > 0$ breaks the total-budget-$3$ lock, permitting $\vv{r} = \vv{s} = \vv{0}$ without entanglement.

$$
\begin{aligned}
\|\vv{r}\|^2 &= \|\vv{s}\|^2 = 1 - C(\psi)^2, \qquad \|\vv{r}\|^2 + C(\psi)^2 = 1, \qquad \|T\|_F^2 = 1 + 2C(\psi)^2, \\
\|\vv{r}\|^2 &+ \|\vv{s}\|^2 + \|T\|_F^2 = 3, \qquad S_{\max}(\psi) = 2\sqrt{1 + C(\psi)^2}.
\end{aligned}
$$

Choosing nonzero integer pairs $(a, b)$ and setting $d := a^2 + b^2 > 0$ defines the rational pure-state family $\lvert\psi_{a,b}\rangle$. Its scaled density $d\,\rho_{a,b}$ is nonzero only on the $(00, 11)$ principal block $\bigl(\begin{smallmatrix} a^2 & ab \\ ab & b^2 \end{smallmatrix}\bigr)$, and partial transposition (PT) shifts the $ab$ entries to the $(01, 10)$ block. Consequently, the density entries, common Bloch length $\|\vv{r}\|$, concurrence $C$, correlation norm squared $\|T\|_F^2$, PT spectrum, and $S_{\max}^2$ are all exact rationals (with $\|\vv{r}\|$ and $C$ forming Pythagorean-triple ratios, while $S_{\max}$ itself is generally irrational):

$$
\begin{aligned}
\lvert\psi_{a,b}\rangle &:= \frac{a\lvert 00\rangle + b\lvert 11\rangle}{\sqrt{d}}, \qquad \|\vv{r}\| = \frac{|a^2 - b^2|}{d}, \qquad C = \frac{2|ab|}{d} \qquad (d := a^2 + b^2 > 0), \\
\operatorname{spec}\bigl(\rho_{a,b}^{T_A}\bigr) &= \left(\frac{a^2}{d},\; \frac{b^2}{d},\; +\frac{ab}{d},\; -\frac{ab}{d}\right), \qquad S_{\max}^2 = 4\bigl(1 + C^2\bigr).
\end{aligned}
$$

The table below lists five integer witnesses, where for $(2, 1)$, $(3, 2)$, $(4, 3)$, and $(1, 1)$ the values of $S_{\max}$ rounded to six decimal places are $2.561250$, $2.721816$, $2.772436$, and $2.828427$:

| $(a, b)$ | Common $\|\vv{r}\|$ | Concurrence $C$ | $\|T\|_F^2$ | PT spectrum | $S_{\max}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $(1, 0)$ | $1$ | $0$ | $1$ | $1, 0, 0, 0$ | $2$ |
| $(2, 1)$ | $3/5$ | $4/5$ | $57/25$ | $4/5, 1/5, \pm 2/5$ | $2\sqrt{41}/5$ |
| $(3, 2)$ | $5/13$ | $12/13$ | $457/169$ | $9/13, 4/13, \pm 6/13$ | $2\sqrt{313}/13$ |
| $(4, 3)$ | $7/25$ | $24/25$ | $1777/625$ | $16/25, 9/25, \pm 12/25$ | $2\sqrt{1201}/25$ |
| $(1, 1)$ | $0$ | $1$ | $3$ | $1/2, 1/2, \pm 1/2$ | $2\sqrt{2}$ |

### 13.2.1.3 Partial-Transpose Rank Branches and Hypothesis Sharpness {#sec-ch13-2-1-3-partial-transpose-rank-witnesses}

Return now to [@thm-partial-transpose-rank-saturation] and inspect the rank mechanics of two-term tensor sums through finite integer and Gaussian-integer matrix witnesses. Write the two-term sum, its ordinary first-factor partial transpose, and the vertical and horizontal block ranks on both factors as:

$$
\begin{aligned}
S &:= A_1 \otimes_{\mathrm{K}} B_1 + A_2 \otimes_{\mathrm{K}} B_2, \qquad S^{T_1} := A_1^T \otimes_{\mathrm{K}} B_1 + A_2^T \otimes_{\mathrm{K}} B_2, \\
(v_A, h_A) &:= \bigl(\operatorname{vRank}(A_1, A_2),\, \operatorname{hRank}(A_1, A_2)\bigr), \qquad (v_B, h_B) := \bigl(\operatorname{vRank}(B_1, B_2),\, \operatorname{hRank}(B_1, B_2)\bigr).
\end{aligned}
$$

The one-sided formulas in the upstream proof show that when $v_B = 2h_B$, we have $\operatorname{rank} S = h_A h_B$ and $\operatorname{rank} S^{T_1} = v_A h_B$; dually, when $h_B = 2v_B$, they equal $v_A v_B$ and $h_A v_B$. Thus matching H branches ($h = 2v$) double rank not only on $2 \times 1$ columns ($1 \to 2$) but also at higher rank on stacked $4 \times 2$ identity blocks $A_1 = B_1 = \binom{I_2}{0_2}$, $A_2 = B_2 = \binom{0_2}{I_2}$ ($4 \to 8$); matching V branches ($v = 2h$) double rank on $1 \times 2$ rows ($1 \to 2$); and opposing H/V branches ($2 \times 1$ columns against $1 \times 2$ rows) halve the rank from $2$ to $1$.

Each remaining hypothesis of [@thm-partial-transpose-rank-saturation] is likewise sharp. First, if either pair is linearly dependent, the sum collapses to one Kronecker product whose rank is preserved by ordinary partial transpose; the four nonzero dependent factors $A_1 = \binom{2}{0}$, $A_2 = \binom{1}{0}$, $B_1 = \binom{1}{0}$, and $B_2 = \binom{-2}{0}$ yield $S = S^{T_1} = 0$, making $0 = 2 \cdot 0$ hold while both pairs have $(v, h) = (1, 1)$ and falsify both classification branches. Second, the two-term restriction cannot be relaxed: for any $k \ge 1$, the sum $\sum_{j=1}^k e_j \otimes_{\mathrm{K}} e_j$ ($e_j \in \mathbb{C}^{k \times 1}$) has rank $1$ while its partial transpose is the rank-$k$ identity $I_k$ (for instance, $k = 3$ gives $1 \to 3$), and the four-term Bell density expansion $2\rho_{\Phi^+} = \sum_{i,j=0}^1 E_{ij} \otimes_{\mathrm{K}} E_{ij}$ jumps from rank $1$ to the rank-$4$ swap matrix.

Third, the first factor must undergo ordinary transposition $A_i^T$ rather than conjugate transposition $A_i^*$. On the $\mathbb{C}$-linearly independent $2 \times 2$ Gaussian-integer diagonal matrices $A_1 = I_2$, $A_2 = \operatorname{diag}(i, 2i)$, $B_1 = \operatorname{diag}(1, 2)$, and $B_2 = i I_2$, ordinary partial transpose gives $\operatorname{diag}(0, 1, -1, 0)$ of rank $2$, whereas conjugate partial transpose gives $\operatorname{diag}(2, 3, 3, 4)$ of rank $4$ (the sparse choice $A_1 = B_1 = I_2$, $A_2 = B_2 = \operatorname{diag}(i, 0)$ already separates ranks $3$ and $4$). Moreover, $2 \times 2$ is minimal: if either independent pair consists of column vectors or row covectors, an invertible basis change sends it to the first two standard columns or rows, reducing the transformed rank to the horizontal or vertical block rank of the other pair, which is invariant under entrywise conjugation; scalar pairs cannot be linearly independent. The table below collects seven finite witnesses (writing $e_1 = \binom{1}{0}$ and $e_2 = \binom{0}{1}$):

| Matrix witness | $(v_A, h_A)$ | $(v_B, h_B)$ | $\operatorname{rank} S \to \operatorname{rank} S^{T_1}$ | Conj. PT rank |
| :----------------------------------------- | :---------: | :---------: | :-----------------: | :---------------: |
| H minimal columns ($e_1, e_2$) | $(1, 2)$ | $(1, 2)$ | $1 \to 2$ | $2$ |
| H stacked blocks ($4 \times 2$) | $(2, 4)$ | $(2, 4)$ | $4 \to 8$ | $8$ |
| V minimal rows ($e_1^T, e_2^T$) | $(2, 1)$ | $(2, 1)$ | $1 \to 2$ | $2$ |
| H/V mismatch (columns, rows) | $(1, 2)$ | $(2, 1)$ | $2 \to 1$ | $1$ |
| Dependent zero sum ($2e_1, e_1$; $e_1, -2e_1$) | $(1, 1)$ | $(1, 1)$ | $0 \to 0$ | $0$ |
| Complex sparse ($I_2, \operatorname{diag}(i, 0)$) | $(2, 2)$ | $(2, 2)$ | $3 \to 3$ | $4$ |
| Rank doubles ($I_2, \operatorname{diag}(i, 2i)$) | $(2, 2)$ | $(2, 2)$ | $2 \to 2$ | $4$ |

### 13.2.1.4 Eight-State Comparison and Bridge to CHSH {#sec-ch13-2-1-4-eight-state-comparison-and-chsh-bridge}

Writing $\rho_{\mathrm{cl}} := \mathrm{classicalCorrelatedDensity} = \frac{1}{4}(I_4 + \sigma_Z \otimes \sigma_Z)$ for the classical mixture of [@thm-local-correlation-sectors], placing all of these measures in one eight-state table separates central marginals, partial-transpose rank changes, entanglement, and CHSH violation cleanly. Every row satisfies $\|\vv{r}\| = \|\vv{s}\|$ and $\mathcal{N} = C/2$: the octahedron-face Werner state $\rho_W(1/3)$ has full rank $4$ yet drops to rank $3$ under partial transpose while remaining separable ($S_{\max} = \frac{2\sqrt{2}}{3} \approx 0.942809$); the entangled Werner states $\rho_W(1/2)$ ($S_{\max} = \sqrt{2} \approx 1.414214$) and $\rho_W(7/10)$ ($S_{\max} = \frac{7\sqrt{2}}{5} \approx 1.979899$) acquire a negative partial-transpose eigenvalue and keep rank $4 \to 4$ without crossing the classical CHSH bound $2$; in this table only the two rows $\lvert\psi_{2,1}\rangle$ and $\lvert\Phi^+\rangle$ exhibit both the $1 \to 4$ rank jump and $S_{\max} > 2$:

| State | $\|\vv{r}\|$ | $\Tr\rho^2$ | $\|T\|_F^2$ | $C$ | $\lambda_{\min}(\rho^{T_A})$ | Rank | $S_{\max}$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $\lvert 00\rangle$ | $1$ | $1$ | $1$ | $0$ | $0$ | $1 \to 1$ | $2$ |
| $\rho_{\mathrm{cl}}$ | $0$ | $1/2$ | $1$ | $0$ | $0$ | $2 \to 2$ | $2$ |
| $I_4/4$ | $0$ | $1/4$ | $0$ | $0$ | $1/4$ | $4 \to 4$ | $0$ |
| $\rho_W(1/3)$ | $0$ | $1/3$ | $1/3$ | $0$ | $0$ | $4 \to 3$ | $2\sqrt{2}/3$ |
| $\rho_W(1/2)$ | $0$ | $7/16$ | $3/4$ | $1/4$ | $-1/8$ | $4 \to 4$ | $\sqrt{2}$ |
| $\rho_W(7/10)$ | $0$ | $247/400$ | $147/100$ | $11/20$ | $-11/40$ | $4 \to 4$ | $7\sqrt{2}/5$ |
| $\lvert\psi_{2,1}\rangle$ | $3/5$ | $1$ | $57/25$ | $4/5$ | $-2/5$ | $1 \to 4$ | $2\sqrt{41}/5$ |
| $\lvert\Phi^+\rangle$ | $0$ | $1$ | $3$ | $1$ | $-1/2$ | $1 \to 4$ | $2\sqrt{2}$ |

**Evidence Boundary and Companion Archive (`ARGUED` / `NUM`).** This section's written arguments (`ARGUED`) establish the Bell-diagonal spectrum, partial-transpose reflection, and octahedral volume ratio $\frac{1}{2}$, the exact CHSH-violating volume integral $4 + 4\sqrt{2} - 3\pi$ and three-way volume partition, the pure-state Pythagorean conservation law and singular-value CHSH formula, and the partial-transpose rank witnesses and $2 \times 2$ minimal-dimension argument. The two-qubit separability criterion, concurrence, Werner family, Gisin pure-state violation, and Horodecki criterion are drawn from the seven works cited above; the three `trureturing` declarations referenced in [@thm-local-correlation-sectors], [@lemma-bell-mixed-marginal], and [@thm-partial-transpose-rank-saturation] were verified for exact signatures and hypotheses on `origin/dev`.

The companion computational checks (symbolic and dual-precision Arb verification in Python, plus a standalone auxiliary Lean check with no explicit imports) do not count toward the theorem tally of the book's pinned `trureturing` ledger; they are archived as `NUM` evidence by `loning` under [Issue #1247](https://github.com/the-omega-institute/trureturing-books/issues/1247) in the [pinned verification archive](https://gist.github.com/loning/91667ca09a60a05a1ffd676fbadf9260/ef0aba5718a1f508ce44fa2121fa4e3e8b222410):

- [`verify_cycle22_bell_states.py`](https://gist.githubusercontent.com/loning/91667ca09a60a05a1ffd676fbadf9260/raw/ef0aba5718a1f508ce44fa2121fa4e3e8b222410/verify_cycle22_bell_states.py): generates all $96$ nested Arb enclosure pairs at $256$-bit and $320$-bit working precision (with strict containment for all $62$ non-point enclosures and coincidence for all $34$ exact point enclosures), checks $V_{\mathrm{CHSH}} = 4 + 4\sqrt{2} - 3\pi$ by independent quadrature, and verifies the eight-state table and all matrix ranks;
- `cycle22_bell_tetrahedron_pt_rank_check` ([`bell_tetrahedron_pt_rank_check.lean`](https://gist.githubusercontent.com/loning/91667ca09a60a05a1ffd676fbadf9260/raw/ef0aba5718a1f508ce44fa2121fa4e3e8b222410/bell_tetrahedron_pt_rank_check.lean)): checks the $N = 12$ and $N = 24$ lattice censuses, Bell eigenvalue and reflection coefficients, four Werner witnesses, five scaled rational pure states and their partial-transpose characteristic polynomials, nine two-term integer and Gaussian-integer rank witnesses, the three-term vector jump $1 \to 3$, and five density-matrix partial-transpose rank transitions;
- Lean file SHA-256: `6e107321eba5bb1ba00d3540f51c1b9801a1895686df06328d843346a36ba8a0`;
- [`SHA256SUMS`](https://gist.githubusercontent.com/loning/91667ca09a60a05a1ffd676fbadf9260/raw/ef0aba5718a1f508ce44fa2121fa4e3e8b222410/SHA256SUMS): SHA-256 `411f12dc928c15e6c2b9eafd5ddd5c42e13d795358123f409e30bfbea7923e52`.

This quantifies how central marginals, correlation tensors, and partial-transpose ranks layer separable, entangled CHSH-local, and CHSH-violating states. Carrying $S_{\max}(\rho) = 2\sqrt{M(\rho)}$ and the contrast between $\rho_{\mathrm{cl}}$ and $\lvert\Phi^+\rangle$ directly into operator algebra, [§13.3](ch13-s03-chsh-commutator-area.md#sec-chsh-commutator-area) next squares the CHSH operator to show how the excess beyond the classical bound $2$ arises from the commutator area of noncommuting measurements on both sides.
