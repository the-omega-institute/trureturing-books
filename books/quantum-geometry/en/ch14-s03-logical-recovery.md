# 14.3 Logical Recovery from Orthogonal Syndromes {#sec-orthogonal-syndrome-recovery}

Once environmental errors kick an encoded logical state $\rho \in M_d(\mathbb{C})$ into distinct error channels, how does recovery strip away the error matrix $\sigma$ and restore $\rho$ intact?

Geometrically, the mechanism relies on **mutually orthogonal syndrome subspaces** (Figure 14, Panel II). Let $s$ (syndrome indices), $n$ (physical dimension), and $d$ (logical code dimension) be finite index types with `[DecidableEq s]` and `[DecidableEq d]` ($n$ requires no explicit `DecidableEq` instance). In `OrthogonalSyndromeDecoding`, a family of embedding matrices $S : s \to M_{n \times d}(\mathbb{C})$ satisfies `OrthogonalSyndromes S` if

$$
\forall i, j : s,\qquad S_i^* S_j = \begin{cases} I_d & \text{if } i = j, \\ 0 & \text{if } i \neq j. \end{cases}
$$

Each $S_i$ isometrically embeds the $d$-dimensional logical space into the $i$-th syndrome subspace ($S_i^* S_i = I_d$), while distinct syndrome subspaces are strictly orthogonal ($S_i^* S_j = 0$ for $i \neq j$).

::: {.viz src="syndrome-decoding" preset="rooms" height="500"}
**An error moves the state, whole, into another room.** Below, the eight basis states fall into four rooms $S_j = E_jV$ ($E \in \{I, X_1, X_2, X_3\}$) according to the readings of the two checks. The middle qubit flips and both lights go on; the two cyan bars of $\alpha\lvert 000\rangle + \beta\lvert 111\rangle$ move unchanged into room $(-1,-1)$, onto $\lvert 010\rangle$ and $\lvert 101\rangle$, and the other three rooms stay empty.
:::

For any syndrome coefficient matrix $\sigma \in M_s(\mathbb{C})$ and any logical matrix $\rho \in M_d(\mathbb{C})$, the **syndrome encoding map** is

$$
\mathrm{syndromeEncoding}(S, \sigma, \rho) = \sum_{j \in s} \sum_{k \in s} \sigma_{jk}\, S_j \rho S_k^* \in M_n(\mathbb{C}),
$$

and the **syndrome decoding map** is

$$
\mathrm{syndromeDecoding}(S, \mathrm{state}) = \sum_{i \in s} S_i^* \,\mathrm{state}\, S_i \in M_d(\mathbb{C}).
$$

The next proposition proves that decoding any syndrome-encoded state collapses all cross-syndrome terms and returns $\Tr(\sigma) \bullet \rho$.

::: {.proposition #prop-orthogonal-syndrome-recovery title="Exact Logical Recovery from Orthogonal Syndrome Subspaces" lean="D5/S3/Quantum/Recovery/OrthogonalSyndromeDecoding.orthogonal_syndrome_recovery"}
Let $s, n, d$ be finite index types (with `[DecidableEq s]` and `[DecidableEq d]`), and let $S : s \to M_{n \times d}(\mathbb{C})$ satisfy `OrthogonalSyndromes S`. Then for every complex matrix $\sigma \in M_s(\mathbb{C})$ and every complex matrix $\rho \in M_d(\mathbb{C})$,

$$
\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr) = \Tr(\sigma) \bullet \rho.
$$
:::

::: proof
Substituting the double sum of $\mathrm{syndromeEncoding}(S, \sigma, \rho)$ into $\mathrm{syndromeDecoding}$ and expanding by linearity gives

$$
\mathrm{syndromeDecoding}\bigl(S,\, \mathrm{syndromeEncoding}(S, \sigma, \rho)\bigr)
= \sum_{i \in s} \sum_{j \in s} \sum_{k \in s} \sigma_{jk}\, (S_i^* S_j)\, \rho\, (S_k^* S_i).
$$

By `OrthogonalSyndromes S`, $S_i^* S_j = \delta_{ij} I_d$ and $S_k^* S_i = (S_i^* S_k)^* = \delta_{ik} I_d$. For each fixed $i \in s$, every term with $j \neq i$ or $k \neq i$ vanishes, leaving only the $j = k = i$ term $\sigma_{ii}(I_d \rho I_d) = \sigma_{ii}\rho$. Summing over $i \in s$ yields $\bigl(\sum_{i \in s} \sigma_{ii}\bigr)\rho = \Tr(\sigma) \bullet \rho$. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch14-trace-survives"}
**After decoding, only the diagonal of $\sigma$ survives.** At the top is the $4\times 4$ noise matrix $\sigma$: the four cyan diagonal cells take the values $\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{8}$ from step four of [@ex-repetition-code-syndrome], and the other twelve, the magenta cross-room coherences, are all struck out. The diagonal adds up to $\Tr\sigma = 1$, and decoding outputs $1 \cdot \rho = \rho$ ([@prop-orthogonal-syndrome-recovery]). With non-zero coherences, a numerical check on the three-qubit code returns the same $\rho$.
:::

Two important domain boundaries apply to [@prop-orthogonal-syndrome-recovery]:

1. **No positivity, unit-trace, or diagonality assumption on $\sigma$ or $\rho$**: The identity holds for **arbitrary** complex matrices $\sigma \in M_s(\mathbb{C})$ and $\rho \in M_d(\mathbb{C})$. In particular, off-diagonal coherent error superpositions $\sigma_{jk}$ ($j \neq k$) between distinct syndrome subspaces are automatically annihilated by $S_i^* S_j = \delta_{ij}I_d$ and $S_k^* S_i = \delta_{ik}I_d$, and when $\Tr(\sigma) = 1$, exact unscaled recovery $\mathrm{syndromeDecoding}(S, \mathrm{syndromeEncoding}(S, \sigma, \rho)) = \rho$ follows as a special case.

::: {.viz src="syndrome-decoding" preset="mix" height="500"}
**Four branches each come back and add up to the state.** Take $\sigma = \operatorname{diag}\bigl(\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{8}\bigr)$ (step 4 of [@ex-repetition-code-syndrome]) and $\rho = \lvert +\rangle\langle +\rvert$: four branches, no error and a flip of the first, second or third qubit, each cyan bar as wide as its weight and each branch in its own room. Decoding pulls every branch back into the code space, where they line up side by side into one whole bar that fills the dashed outline exactly: $\Tr(\sigma)\,\rho = \rho$, which is [@prop-orthogonal-syndrome-recovery].
:::

2. **Algebraic decoding on the syndrome support versus a globally trace-preserving channel**: $\mathrm{syndromeDecoding}(S, \cdot) = \sum_{i \in s} S_i^* (\cdot) S_i$ is an algebraic recovery formula on the direct sum $\bigoplus_{i \in s} \operatorname{range}(S_i)$. Whenever $|s|d < n$ so that $\sum_{i \in s} S_i S_i^* \neq I_n$, one cannot unconditionally claim that $\{S_i^*\}_{i \in s}$ alone defines a trace-preserving (CPTP) channel on the entire physical space $M_n(\mathbb{C})$; a full physical channel requires completing the Kraus operators on the orthogonal complement $I_n - \sum_{i \in s} S_i S_i^*$.

Orthogonal syndromes are the clearest coordinate form: they assume the coefficient matrix is diagonal in advance. The frozen source also gives a finite rectangular construction without that assumption. Its input errors are $n\times d$ matrices, while the recovery operators are $d\times n$ matrices, so the result crosses the physical/logical dimension boundary explicitly.

::: {.theorem #thm-finite-kraus-recovery-sufficiency title="Finite Rectangular Kraus Scalar Products Give an Actual Recovery" lean="D5/S3/Quantum/Recovery/FiniteKrausReversibility.scalar_products_construct_left_inverse"}
Let $s,n,d$ be finite index types, each with finite-type and decidable-equality instances. Let $E : s \to M_{n\times d}(\mathbb{C})$, choose a logical index $v : d$, and let $c\in M_s(\mathbb{C})$ satisfy

$$
\sum_{a\in s} E_a^*E_a=I_d,
\qquad
E_a^*E_b=c_{ab}I_d \quad (a,b\in s).
$$

Then there are a finite $r\in\mathbb{N}$ and a recovery Kraus family $A : \mathrm{Fin}\,r \to M_{d\times n}(\mathbb{C})$ such that

$$
\sum_{b\in\mathrm{Fin}\,r} A_b^*A_b=I_n
$$

and, for every complex logical matrix $X\in M_d(\mathbb{C})$,

$$
\sum_{b\in\mathrm{Fin}\,r} A_b
\left(\sum_{a\in s}E_a X E_a^*\right)A_b^*=X.
$$

The explicit term $v:d$ witnesses a nonempty logical interface; the theorem does not use the vacuous zero-dimensional case. The rectangular sizes are part of the statement: noise sends logical matrices into $M_n(\mathbb{C})$, and $A_b$ returns them to $M_d(\mathbb{C})$.
:::

::: proof
The proof follows the existing spectral construction recorded in the source Blueprint. The chosen $v$ turns $c$ into a Gram matrix, giving positive semidefiniteness; an Hermitian spectral decomposition then unitarily rotates the errors into orthogonal branches weighted by eigenvalues. Strictly positive branches are normalized by $\sqrt{\lambda}$, while zero-eigenvalue branches are removed through an actual finite subtype, so no division by zero is hidden. For the remaining orthogonal syndrome family, the source `completeKraus` adds complementary reset rows on the orthogonal complement of the syndrome support. That completion extends adjoint decoding from the correctable support to a normalized recovery on the whole physical input. Finally the finite index is reindexed as `Fin r`, yielding the identity for every complex matrix $X$. The full proof is checked by the Lean kernel.
:::

This sufficiency result extends [@prop-orthogonal-syndrome-recovery] in three ways: $c$ may begin with off-diagonal coherences and is diagonalized by the spectral rotation; zero spectral weights are removed explicitly rather than assuming every error branch has positive probability; and the recovery family is completed on the unused physical complement, so its normalization covers the whole physical input. It remains a statement about a **finite** Kraus family. It does not assert a finite Kraus representation for every bundled channel, and it supplies no recovery-time or noise-robustness bound.

**Ordinary encoding notation (paper derivation, not a new Lean specialization check).** Let the physical and logical dimensions $n$ and $d$ be finite positive integers, and let the error index set $s$ be finite. Let $V\in M_{n\times d}(\mathbb{C})$ satisfy $V^*V=I_d$, let the physical error family $(E_i)_{i\in s}$ have $E_i\in M_n(\mathbb{C})$ satisfying $\sum_iE_i^*E_i=I_n$, and put $F_i=E_iV\in M_{n\times d}(\mathbb{C})$. If the logical Knill–Laflamme condition is

$$
V^*E_i^*E_jV=\alpha_{ij}I_d,
$$

the two premises transport exactly to the rectangular theorem:

$$
F_i^*F_j=V^*E_i^*E_jV=\alpha_{ij}I_d,
\qquad
\sum_iF_i^*F_i=V^*\left(\sum_iE_i^*E_i\right)V=V^*V=I_d.
$$

Choose any logical index $v\in\{1,\ldots,d\}$ as the nonempty witness. The theorem then gives a finite $r$ and a recovery family $(A_t)_{t\in\mathrm{Fin}\,r}$ with $A_t\in M_{d\times n}(\mathbb{C})$ and $\sum_t A_t^*A_t=I_n$, such that, for every complex matrix $X\in M_d(\mathbb{C})$,

$$
\sum_tA_t\left(\sum_iE_iVXV^*E_i^*\right)A_t^*=X.
$$

The parenthesized term is the physical $n\times n$ output; after the $A_t$ sandwich, $X$ is the logical $d\times d$ output. The two boundaries must not be conflated into an identity on the physical space.
