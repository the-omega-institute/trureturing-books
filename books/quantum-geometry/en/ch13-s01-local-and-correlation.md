# 13.1 Local Lines and Correlation Areas: 6 + 9 = 15 {#sec-pauli-local-correlation}

Why can "an arrow $\vv{r} \in \mathbb{R}^3$ on Alice's sphere" plus "an arrow $\vv{s} \in \mathbb{R}^3$ on Bob's sphere" never account for a bipartite quantum state? Let us begin with a rigorous audit of real dimensions and orthogonal operator subspaces.

For any positive integer dimension $d \ge 1$, the space of $d \times d$ complex Hermitian matrices forms a $d^2$-dimensional real vector space, denoted `HermitianSpace d`. Equipped with the canonical real Hilbert–Schmidt inner product

$$
\langle A, B\rangle_{\mathrm{HS}} = \operatorname{Re}\Tr(A^* B) = \operatorname{Re}\Tr(AB),
$$

`HermitianSpace d` is a real inner-product space. Within it, real scalar multiples of the identity matrix span the $1$-dimensional scalar subspace $\mathrm{scalarHermitian}\,d = \mathbb{R}\cdot I_d$, while the traceless $d\times d$ Hermitian matrices form its $(d^2 - 1)$-dimensional orthogonal complement $\mathrm{traceZeroHermitian}\,d = \{A \in \mathrm{HermitianSpace}\,d \mid \Tr A = 0\}$ (since $\langle A, I_d\rangle_{\mathrm{HS}} = \operatorname{Re}\Tr(A) = 0$).

Now consider a composite system formed by an $m$-dimensional subsystem $A$ and an $n$-dimensional subsystem $B$ ($m, n \in \mathbb{N}$ with $1 \le m$, $1 \le n$, and $1 < mn$), living in the real tensor product space

$$
\mathcal{H}_{m,n}^{\mathrm{Herm}} = \mathrm{HermitianSpace}\,m \otimes_{\mathbb{R}} \mathrm{HermitianSpace}\,n
$$

equipped with the induced real Hilbert–Schmidt tensor inner product. For subspaces $P \le \mathrm{HermitianSpace}\,m$ and $Q \le \mathrm{HermitianSpace}\,n$, the source module defines the embedded sector $\mathrm{tensorSector}(P, Q) = \operatorname{range}(\mathrm{TensorProduct.mapIncl}\,P\,Q) \le \mathcal{H}_{m,n}^{\mathrm{Herm}}$ as the range of their canonical inclusion into the ambient tensor product (note that the carrier is this embedded submodule inside $\mathcal{H}_{m,n}^{\mathrm{Herm}}$, a distinction that cannot be elided). The bipartite traceless space $\mathrm{bipartiteTraceZero}\,m\,n = (\mathrm{scalarSector}\,m\,n)^\perp$ — the orthogonal complement of the $1$-dimensional global identity line $\mathrm{scalarSector}\,m\,n = \mathrm{tensorSector}(\mathrm{scalarHermitian}\,m, \mathrm{scalarHermitian}\,n)$, of total real dimension $m^2 n^2 - 1$ — then splits naturally into three operationally distinct sectors:

1. **The local $A$ sector** $\mathrm{localASector}\,m\,n = \mathrm{tensorSector}(\mathrm{traceZeroHermitian}\,m,\, \mathrm{scalarHermitian}\,n)$: operators of the form $A_0 \otimes I_n$ ($\Tr A_0 = 0$), which interrogate subsystem $A$ alone and are blind to subsystem $B$, of real dimension $m^2 - 1$;
2. **The local $B$ sector** $\mathrm{localBSector}\,m\,n = \mathrm{tensorSector}(\mathrm{scalarHermitian}\,m,\, \mathrm{traceZeroHermitian}\,n)$: operators of the form $I_m \otimes B_0$ ($\Tr B_0 = 0$), which interrogate subsystem $B$ alone, of real dimension $n^2 - 1$;
3. **The bipartite correlation sector** $\mathrm{correlationSector}\,m\,n = \mathrm{tensorSector}(\mathrm{traceZeroHermitian}\,m,\, \mathrm{traceZeroHermitian}\,n)$: spanned by joint traceless tensor products $A_0 \otimes B_0$ ($\Tr A_0 = \Tr B_0 = 0$), of real dimension $(m^2 - 1)(n^2 - 1)$.

At the concrete two-qubit matrix level ($m = n = 2$, with matrix type $\mathrm{TwoQubitMatrix} = M_{\mathrm{Fin}\,2 \times \mathrm{Fin}\,2}(\mathbb{C})$), we also define the maximally entangled Bell state vector $\mathrm{bellVector} = \lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ (with entries $\delta_{ij}/\sqrt{2}$ on $(i, j) \in \mathrm{Fin}\,2 \times \mathrm{Fin}\,2$), its rank-one outer-product density matrix

$$
\mathrm{bellDensity} = \lvert\Phi^+\rangle\langle\Phi^+\rvert = \frac{1}{2}\begin{pmatrix} 1 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 1 & 0 & 0 & 1 \end{pmatrix},
$$

and the decohered classical diagonally correlated mixture

$$
\mathrm{classicalCorrelatedDensity} = \frac{1}{2}\bigl(\lvert 00\rangle\langle 00\rvert + \lvert 11\rangle\langle 11\rvert\bigr) = \operatorname{diag}\Bigl(\frac{1}{2},\, 0,\, 0,\, \frac{1}{2}\Bigr).
$$

Writing $\mathrm{traceEnvironment}(\rho)_{i,j} = \sum_a \rho_{(i,a),(j,a)}$ for the partial trace over the second factor and $\mathrm{traceFirstFactor}(\rho)_{i,j} = \sum_a \rho_{(a,i),(a,j)}$ for the partial trace over the first factor, the following theorem combines the general $(m, n)$ orthogonal sector decomposition with the two-qubit marginal blind-spot witnesses.

::: {.theorem #thm-local-correlation-sectors title="Orthogonal Decomposition of Local and Correlation Sectors and the Marginal Blind Spot" lean="D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot"}
Let $m, n \in \mathbb{N}$ satisfy $1 \le m$, $1 \le n$, and $1 < mn$. In the real tensor product space $\mathrm{HermitianSpace}\,m \otimes_{\mathbb{R}} \mathrm{HermitianSpace}\,n$ equipped with the real Hilbert–Schmidt inner product, together with the two-qubit density witnesses, all of the following hold:

1. **Exhaustive decomposition of the traceless bipartite space**:

   $$
   \mathrm{localASector}\,m\,n \sqcup \mathrm{localBSector}\,m\,n \sqcup \mathrm{correlationSector}\,m\,n = \mathrm{bipartiteTraceZero}\,m\,n;
   $$

2. **Real dimension of the combined local sector**:

   $$
   \operatorname{finrank}_{\mathbb{R}}\bigl(\mathrm{localASector}\,m\,n \sqcup \mathrm{localBSector}\,m\,n\bigr) = (m^2 - 1) + (n^2 - 1);
   $$

3. **Real dimension of the correlation sector**:

   $$
   \operatorname{finrank}_{\mathbb{R}}\bigl(\mathrm{correlationSector}\,m\,n\bigr) = (m^2 - 1)(n^2 - 1);
   $$

4. **Dimension ratio of the correlation sector to the traceless bipartite space**: coerced from $\mathbb{N}$ into $\mathbb{R}$,

   $$
   \frac{\operatorname{finrank}_{\mathbb{R}}(\mathrm{correlationSector}\,m\,n)}{\operatorname{finrank}_{\mathbb{R}}(\mathrm{bipartiteTraceZero}\,m\,n)} = \frac{((m^2 - 1)(n^2 - 1) : \mathbb{N})}{((m^2 n^2 - 1) : \mathbb{N})};
   $$

5. **Mutual orthogonality of the local and correlation sectors**: over $\mathbb{R}$,

   $$
   \operatorname{IsOrtho}_{\mathbb{R}}\bigl(\mathrm{localASector}\,m\,n \sqcup \mathrm{localBSector}\,m\,n,\; \mathrm{correlationSector}\,m\,n\bigr);
   $$

6. **Pure-state properties of the Bell density matrix**: $\mathrm{bellDensity}$ is positive semidefinite, $\Tr(\mathrm{bellDensity}) = 1$, and $\operatorname{rank}(\mathrm{bellDensity}) = 1$;
7. **Mixed-state properties of the classically correlated density matrix**: $\mathrm{classicalCorrelatedDensity}$ is positive semidefinite, $\Tr(\mathrm{classicalCorrelatedDensity}) = 1$, and is non-idempotent:

   $$
   \mathrm{classicalCorrelatedDensity} \cdot \mathrm{classicalCorrelatedDensity} \neq \mathrm{classicalCorrelatedDensity};
   $$

8. **Identical local marginals despite distinct global states**:

   $$
   \begin{aligned}
   \mathrm{traceEnvironment}(\mathrm{bellDensity}) &= \mathrm{traceEnvironment}(\mathrm{classicalCorrelatedDensity}), \\
   \mathrm{traceFirstFactor}(\mathrm{bellDensity}) &= \mathrm{traceFirstFactor}(\mathrm{classicalCorrelatedDensity}), \\
   \mathrm{bellDensity} &\neq \mathrm{classicalCorrelatedDensity}.
   \end{aligned}
   $$
:::

::: proof
In each factor $\mathrm{HermitianSpace}\,d$, the scalar line $\mathbb{R}\cdot I_d$ and the traceless subspace $\mathrm{traceZeroHermitian}\,d$ form an orthogonal direct sum, splitting the full tensor product into four mutually orthogonal embedded sectors: the scalar sector, local $A$ sector, local $B$ sector, and correlation sector. Removing the $1$-dimensional scalar sector leaves the supremum of the remaining three orthogonal sectors equal to $\mathrm{bipartiteTraceZero}\,m\,n$, with $\mathrm{localASector} \sqcup \mathrm{localBSector}$ orthogonal to $\mathrm{correlationSector}$ (conjuncts 1 and 5). Because $\operatorname{finrank}_{\mathbb{R}}(\mathrm{traceZeroHermitian}\,d) = d^2 - 1$, orthogonal direct-sum and tensor dimension formulas give $(m^2 - 1) + (n^2 - 1)$ for the combined local sector, $(m^2 - 1)(n^2 - 1)$ for the correlation sector, and $m^2 n^2 - 1$ for $\mathrm{bipartiteTraceZero}\,m\,n$, yielding the stated ratio (conjuncts 2, 3, and 4). For the two-qubit witnesses, $\mathrm{bellDensity} = \lvert\Phi^+\rangle\langle\Phi^+\rvert$ is a rank-one self-adjoint outer product of a unit vector, hence positive semidefinite of trace $1$ and rank $1$ (conjunct 6); the diagonal matrix $\mathrm{classicalCorrelatedDensity} = \operatorname{diag}(1/2, 0, 0, 1/2)$ has nonnegative entries summing to $1$, while its square $\operatorname{diag}(1/4, 0, 0, 1/4)$ differs from $\mathrm{classicalCorrelatedDensity}$ (conjunct 7). Finally, summing over the second or first index gives $\frac{1}{2}I_2$ for both marginals of both states, whereas entry $((0,0),(1,1))$ equals $1/2$ in $\mathrm{bellDensity}$ and $0$ in $\mathrm{classicalCorrelatedDensity}$ (conjunct 8). The full proof is checked by the Lean kernel.
:::

Specializing [@thm-local-correlation-sectors] to two qubits ($m = n = 2$) reveals the dimensional accounting immediately (Figure 13, Panel I):

- Alice's single-qubit traceless observables ($\sigma_X \otimes I_2,\, \sigma_Y \otimes I_2,\, \sigma_Z \otimes I_2$) span $2^2 - 1 = 3$ real dimensions;
- Bob's single-qubit traceless observables ($I_2 \otimes \sigma_X,\, I_2 \otimes \sigma_Y,\, I_2 \otimes \sigma_Z$) likewise span $2^2 - 1 = 3$ real dimensions;
- Together, the **local lines** accessible to Alice and Bob acting separately span only $3 + 3 = 6$ real dimensions;
- Yet the full traceless two-qubit Hermitian space has dimension $4^2 - 1 = 15$! The remaining $(2^2 - 1)(2^2 - 1) = 3 \times 3 = 9$ orthogonal dimensions — a full $\frac{9}{15} = 60\%$ of the traceless state space — live inside the **correlation sector** $\mathrm{correlationSector}\,2\,2$ spanned by the nine joint Pauli products $\{\sigma_i \otimes \sigma_j\}_{i,j \in \{X,Y,Z\}}$!

This gives rigorous operator-space meaning to our opening epigraph: on a single sphere, a state determines only a local direction line ($\vv{r}$ or $\vv{s}$, totaling $6$ real parameters), whereas between two spheres stretches a $3 \times 3 = 9$-cell correlation tensor grid $T_{ij} = \Tr\bigl(\rho(\sigma_i \otimes \sigma_j)\bigr)$.

Two strict mathematical boundaries in [@thm-local-correlation-sectors] must be kept in mind:

1. **The correlation sector includes classical correlations and must not be called an "entanglement subspace"**: $\mathrm{correlationSector}\,m\,n$ is an orthogonal summand of the observable tensor space, not a set of entangled states. Indeed, the separable classical mixture $\mathrm{classicalCorrelatedDensity} = \frac{1}{2}(\lvert 00\rangle\langle 00\rvert + \lvert 11\rangle\langle 11\rvert) = \frac{1}{4}(I_4 + \sigma_Z \otimes \sigma_Z)$ in conjuncts 7 and 8 has zero entanglement, yet its traceless part $\frac{1}{4}\sigma_Z \otimes \sigma_Z$ lies entirely inside the $(Z, Z)$ coordinate of $\mathrm{correlationSector}\,2\,2$!
2. **The operator tensor sector is not the ordinary outer product of two Bloch vectors in $\mathbb{R}^3$**: for an uncorrelated product state $\rho_A \otimes \rho_B$, the correlation matrix collapses to a rank-at-most-one outer product $T_{ij} = r_i s_j$ determined by the $6$ local coordinates; only general bipartite states can independently populate higher-rank configurations across $\mathrm{correlationSector}\,2\,2$ (such as $\lvert\Phi^+\rangle$, which simultaneously excites $\sigma_X \otimes \sigma_X$, $-\sigma_Y \otimes \sigma_Y$, and $\sigma_Z \otimes \sigma_Z$).

::: {.figure src="ch13-two-states"}
**Same marginals, different correlation cells.** Each cell holds $\Tr\bigl(\rho(\sigma_p \otimes \sigma_q)\bigr)$, computed from the two $4\times 4$ density matrices. For the classical correlated state on the left and the Bell state $\lvert\Phi^+\rangle$ on the right, all six cyan local cells in the first row and column are empty, so both have marginals $\frac{1}{2}I_2$; among the magenta correlation cells the classical state fills only $(Z, Z)$, while the Bell state fills $(X, X)$, $(Y, Y)$ and $(Z, Z)$ with $+1$, $-1$, $+1$ ([@thm-local-correlation-sectors], items 7 and 8).
:::
