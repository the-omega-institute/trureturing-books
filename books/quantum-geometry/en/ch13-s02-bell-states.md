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
