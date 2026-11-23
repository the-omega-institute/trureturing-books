# 16.2 Quantum Walks: Coherent Superposition and Its Limits {#sec-quantum-walk-interference}

When a quantum state carries a two-level internal coin and steps coherently across the vertices of a graph, we obtain a **discrete-time quantum walk**.

In the source module `D5/S3/Quantum/Walks/SymmetricCoinMaximalWalkEntanglement.lean`, the walk takes place on the $p$-vertex cycle $\mathrm{ZMod}\,p$ ($p \in \mathbb{N}, 1 \le p$) with coin space $\mathrm{Fin}\,2$. The single-step Hadamard walk operator `hadamardStep p` acts on wavefunctions $\psi : \mathrm{Fin}\,2 \times \mathrm{ZMod}\,p \to \mathbb{C}$ by

$$
\mathrm{hadamardStep}(p)(\psi)(j) = \begin{cases}
\dfrac{\psi(0, j.2 + 1) + \psi(1, j.2 + 1)}{\sqrt{2}} & \text{if } j.1 = 0, \\[8pt]
\dfrac{\psi(0, j.2 - 1) - \psi(1, j.2 - 1)}{\sqrt{2}} & \text{if } j.1 = 1.
\end{cases}
$$

Starting at site $j.2 = 0$ with initial coin spinor $c : \mathrm{Fin}\,2 \to \mathbb{C}$ satisfying `UnitSpinor c` ($\sum_{b \in \mathrm{Fin}\,2} \mathrm{Complex.normSq}(c_b) = 1$), the $n$-step walk state is

$$
\mathrm{walkState}(p, n, c) = \bigl(\mathrm{hadamardStep}(p)\bigr)^{[n]}\bigl(j \mapsto \text{if } j.2 = 0 \text{ then } c(j.1) \text{ else } 0\bigr),
$$

and the balanced symmetric coin spinor is

$$
\mathrm{cStar} = c_* = \begin{pmatrix} 1/\sqrt{2} \\ i/\sqrt{2} \end{pmatrix}.
$$

::: {.viz src="walk-spreading" preset="fifty" height="500"}
**One origin, two ways to walk; after fifty steps, nearly four times as wide.** From the origin with the coin $c_*$, fifty steps of the rule above: the cyan quantum distribution above is symmetric, its two peaks already out at $\pm 34$ and all of it inside the dashed lines $\pm 50$; the grey classical random walk below spreads only to about $\pm 7$. Quantum width $\sigma = 27.07$, classical $\sigma = \sqrt{50} = 7.07$.
:::
To quantify multi-mode entanglement across the entire mode set $\iota = \mathrm{Fin}\,2 \times \mathrm{ZMod}\,p$, the source maps any amplitude profile $\lambda : \iota \to \mathbb{C}$ to the single-excitation W-state `wState(λ)` on Boolean occupation configurations $s : \iota \to \mathrm{Bool}$ (assigning $\lambda_k$ when $s$ is `true` at $k$ alone and $0$ otherwise), defines modewise product states $\mathrm{productState}(z)(s) = \prod_{k \in \iota} z_k(\text{if } s_k \text{ then } 1 \text{ else } 0)$ over tuples of unit spinors `unitFactors z`, and defines the inner-product overlap helper $\mathrm{overlap}(\lambda, z)$ (taking the amplitude profile $\lambda : \iota \to \mathbb{C}$ first and the spinor family $z : \iota \to \mathrm{Fin}\,2 \to \mathbb{C}$ second) and maximum squared overlap:

$$
\begin{aligned}
\mathrm{overlap}(\lambda, z) &= \sum_{s : \iota \to \mathrm{Bool}} \overline{\mathrm{productState}(z, s)}\,\mathrm{wState}(\lambda, s), \\
\mathrm{gMax}(\lambda) &= \sup\Bigl\{\,\mathrm{Complex.normSq}\bigl(\mathrm{overlap}(\lambda, z)\bigr) \;\Big|\; \mathrm{unitFactors}(z)\,\Bigr\}, \qquad
\mathrm{geometricEntanglement}(\lambda) = 1 - \mathrm{gMax}(\lambda).
\end{aligned}
$$

The next lemma (whose source header is `theorem result : claim`) proves that for every $p \ge 1$, every step count $n \in \mathbb{N}$, and every unit coin spinor $c$, the symmetric coin $\mathrm{cStar} = (1, i)/\sqrt{2}$ maximizes `geometricEntanglement`.

::: {.viz src="walk-spreading" preset="ring" height="500"}
**Wrapped round, still a mirror.** A cycle of only $p = 9$ points, coin $c_*$, twenty steps: the walk has long since wrapped round, and the cyan bars, like the grey ones, cover the whole ring with no front running outwards; yet they are still mirror images of each other, with no magenta. [@lemma-symmetric-coin-walk] holds for every cycle length $p \ge 1$ and every number of steps $n$.
:::


::: {.lemma #lemma-symmetric-coin-walk title="The Symmetric Coin Maximizes Multi-Mode Geometric Entanglement in the Cycle Hadamard Walk" lean="D5/S3/Quantum/Walks/SymmetricCoinMaximalWalkEntanglement.result"}
Unfolding `claim` in the declaration `theorem result : claim`: for every $p \in \mathbb{N}$ with $1 \le p$ (supplying `NeZero p`), every step count $n \in \mathbb{N}$, and every coin spinor $c : \mathrm{Fin}\,2 \to \mathbb{C}$ satisfying `UnitSpinor c`,

$$
\mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, c)\bigr) \le \mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, \mathrm{cStar})\bigr).
$$
:::

::: proof
In `SymmetricCoinMaximalWalkEntanglement`, `walk_linearity` and `walk_reflection` establish `walk_pair_probabilities`: for every site $x \in \mathrm{ZMod}\,p$ and every unit coin $c$, the mirror mode pair $(0, x)$ and $(1, -x)$ has fixed total probability $|\mathrm{walkState}(p, n, c)(0, x)|^2 + |\mathrm{walkState}(p, n, c)(1, -x)|^2 = a^2 + b^2$, while the circularly polarized coin $\mathrm{cStar} = (1/\sqrt{2}, i/\sqrt{2})$ equalizes the two weights to $(a^2 + b^2)/2$. Applying the fixed-sum pair-balancing lemmas `pair_balancing` and `pair_average_le` across all pairs $((0, x), (1, -x))$ proves $\mathrm{gMax}\bigl(\mathrm{walkState}(p, n, \mathrm{cStar})\bigr) \le \mathrm{gMax}\bigl(\mathrm{walkState}(p, n, c)\bigr)$, and subtracting from $1$ yields $\mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, c)\bigr) \le \mathrm{geometricEntanglement}\bigl(\mathrm{walkState}(p, n, \mathrm{cStar})\bigr)$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="walk-spreading" preset="coin" height="500"}
**Half and half is not enough; it needs the $i$.** The pair from the proof sketch: one bar per position $x$, its lower part the probability of the mode $(0, x)$, its upper part that of the mirror mode $(1, -x)$, with a tick at the half. With the real coin $(1, 1)/\sqrt{2}$, half and half as before, after fifty steps every pair still reaches exactly the dashed outline (the same pair's total with the coin $c_*$), but its two parts are unequal: magenta is how far the lower part is from the half, and within a pair the two parts differ by at most $0.145$. With $c_*$ the two parts are equal and the magenta is gone. The figure shows probabilities, not the geometric entanglement of [@lemma-symmetric-coin-walk].
:::
Two strict boundaries apply to [@lemma-symmetric-coin-walk]:

1. **All-mode single-excitation W-state geometric entanglement versus coin–position bipartite entropy**: Here `geometricEntanglement` measures the single-excitation W-state across all $2p$ modes $\iota = \mathrm{Fin}\,2 \times \mathrm{ZMod}\,p$ relative to modewise product states (`1 - gMax`); it is **not** the reduced von Neumann entropy of the coin after tracing out position.
2. **Scope of quantum-walk interference**: [@lemma-symmetric-coin-walk] analyzes coin-phase symmetry on the cycle $\mathrm{ZMod}\,p$; it does **not** prove exponential speedup on general mazes, does **not** imply that all backtracking paths cancel to zero on arbitrary graphs, and is **not** the glued-trees oracle separation theorem.

::: {.viz src="walk-spreading" preset="width" height="500"}
**A straight line against a $\sqrt{n}$.** Width against the steps: the cyan quantum width is a straight line ($\sigma / n$ stays near $0.54$), the grey classical width is $\sqrt{n}$; at sixty steps it is $32.5$ against $7.75$. On a line the gap between them is a square, not an exponential; the exponential separation for the specific glued-trees oracle traversal task and its scope are in item 2 of [@rem-qsvt-walks-literature] (literature results, not formalized in this book), and the curves are the page's numbers.
:::

::: {.remark #rem-qsvt-walks-literature title="Full QSVT Realizability and the Glued-Trees Separation (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** This note records the full literature statements for QSVT and quantum walks. The sufficiency direction of Theorem 3 in the rotation convention, and signed-circle factorization of the same completion, are formalized separately below in [@thm-polynomial-phase-synthesis] and [@thm-signed-circle-phase-factorization]. The full iff characterization, real-part circuits, and query semantics stated here retain their literature status; complex-polynomial lifting on arbitrary raw projected unitaries is treated separately in [@thm-projected-unitary-polynomial-lifting] and [@thm-native-phase-projected-lifting]. Haah's complete ordered Laurent-loop factorization appears separately in [@thm-haah-laurent-factorization].

1. **Quantum Singular Value Transformation (QSVT): complex unitary completion versus real-polynomial extraction** (A. Gilyén, Y. Su, G. H. Low, and N. Wiebe, *Quantum singular value transformation and beyond: exponential improvements for quantum matrix arithmetics*, Proc. 51st ACM STOC, 193–204, 2019, [10.1145/3313276.3316366](https://doi.org/10.1145/3313276.3316366), Theorem 3 and Theorem 17 / Corollary 18): Given a block encoding $\tilde{\Pi} U \Pi = A$ ($\norm{A}_{\mathrm{op}} \le 1$), the literature distinguishes two levels of polynomial realizability:
   - **Direct two-dimensional complex QSP (Theorem 3)**: A pair of complex polynomials $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ is realized directly as the matrix entries of a single phase-modulated sequence $U_{\Phi}(x)$ if and only if $\deg(P_{\mathrm{c}}) \le d$, $\deg(Q_{\mathrm{c}}) \le d - 1$, $P_{\mathrm{c}}$ has parity $d \bmod 2$, $Q_{\mathrm{c}}$ has opposite parity $(d - 1) \bmod 2$, and $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$ for all $x \in [-1, 1]$.
   - **General bounded real-polynomial QSVT via complex completion and real-part extraction (Theorem 17 / Corollary 18)**: For a general real target polynomial $P_{\mathrm{target}} \in \mathbb{R}[x]$ of degree $\le d$, definite parity $d \bmod 2$, and uniform bound $\max_{x \in [-1, 1]} |P_{\mathrm{target}}(x)| \le 1$ (for instance $P_{\mathrm{target}}(x) = x/2$, where $P_{\mathrm{target}}(1)^2 = 1/4 < 1$ precludes any real completion $P_{\mathrm{target}}(x)^2 + (1 - x^2)Q(x)^2 = 1$), Fejér–Riesz factorization constructs a complex completion pair $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ satisfying Theorem 3 with $\operatorname{Re} P_{\mathrm{c}}(x) = P_{\mathrm{target}}(x)$ and $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$. Introducing one additional $\lvert +\rangle$ control ancilla to superpose the forward and negated phase sequences $\frac{1}{2}(U_{\Phi} + U_{-\Phi})$, followed by ancilla $\langle +\rvert$ projection and the parity-dependent block projection ($\tilde{\Pi}(\cdot)\Pi$ for odd $d$, $\Pi(\cdot)\Pi$ for even $d$), extracts the exact real transformation $P_{\mathrm{target}}^{(\mathrm{SV})}(A)$ across every singular-value $2\times 2$ block using $d$ queries to $U$ and $U^*$.

2. **Exponential quantum-walk speedup on glued trees and its structural limits** (A. M. Childs, R. Cleve, E. Deotto, E. Farhi, S. Gutmann, and D. A. Spielman, *Exponential algorithmic speedup by a quantum walk*, Proc. 35th ACM STOC, 59–68, 2003, [10.1145/780542.780552](https://doi.org/10.1145/780542.780552), [arXiv:quant-ph/0209131](https://arxiv.org/abs/quant-ph/0209131)): On two depth-$n$ binary trees joined by a random cycle of alternating edges at the leaves, a continuous-time quantum walk starting at the entrance root remains confined to the $(2n+2)$-dimensional symmetric column subspace and reaches the `EXIT` root in $\mathrm{poly}(n)$ time, whereas Childs et al. prove that any classical algorithm making at most $2^{n/6}$ oracle queries finds the `EXIT` vertex with probability at most $4\cdot 2^{-n/6}$ (yielding a $2^{\Omega(n)}$ classical query lower bound for bounded success probability). This exponential separation relies critically on graph symmetry, oracle access, and task definition; on general unstructured graphs, interference does not automatically cancel all backtracking paths.

:::

**From a whole Laurent loop to ordered factors.** A further layer of QSP decomposition works directly with matrix coefficients: J. Haah, *Product Decomposition of Periodic Functions in Quantum Signal Processing*, Quantum **3**, 190 (2019), [10.22331/q-2019-10-07-190](https://doi.org/10.22331/q-2019-10-07-190), [arXiv:1806.10236v4, Definition 1 and Theorem 2](https://arxiv.org/html/1806.10236v4#Thmlemma1). The algebraic theorem below is formalized in Lean; completion and implementation retain their separate hypotheses.

Fix $n\in\mathbb{N}$. Let $C:\mathbb{Z}\to M_2(\mathbb{C})$ be any finitely supported coefficient family, defining the formal Laurent polynomial $F(t)=\sum_{j\in\mathbb{Z}}C_jt^j$. Haah's $\mathcal{P}_n$ requires $C_j=0$ for $|j|>n$ and $F(\eta)\in\mathrm{SU}(2)$ for every $|\eta|=1$: explicitly, $F(\eta)^*F(\eta)=I$ and $\det F(\eta)=1$, where the star is the conjugate transpose of the evaluated matrix. The subset $\mathcal{E}_n$ additionally requires support in $\{-n,-n+2,\ldots,n\}$, so every nonzero exponent has the parity of $n$. **Actual degree $n$** means $C_n\ne0$ **or** $C_{-n}\ne0$, rather than merely an upper bound on degree.

For a rank-one orthogonal projector $P$ ($P^*=P$, $P^2=P$, $\operatorname{rank}P=1$), define the primitive factor

$$
E_P(t)=tP+t^{-1}(I-P).
$$

This multiplies the projected line by $t$ and its orthogonal complement by $t^{-1}$; for $P=\operatorname{diag}(1,0)$ it is simply $\operatorname{diag}(t,t^{-1})$. On the unit circle both eigenvalues have modulus $1$ and their product is $1$, so $E_P\in\mathcal{E}_1$.

::: {.theorem #thm-haah-laurent-factorization title="Unique Ordered Factorization of an SU(2) Laurent Loop" lean="D5/S3/ContinuousObservables/LaurentLoopFactorization.haah_factorization"}
For every $n\ge0$ and every $F\in\mathcal{E}_n$ of actual degree $n$, there are a unique $E_0\in\mathrm{SU}(2)$ and a unique **ordered list of exactly $n$** rank-one orthogonal projectors $(P_1,\ldots,P_n)$ such that

$$
F(t)=E_0\prod_{k=1}^{n}\bigl(tP_k+t^{-1}(I-P_k)\bigr).
$$

Factors appear from left to right in increasing order of $k$, and equality is coefficientwise as a Laurent polynomial. For $n=0$, $F=C_0$ is any constant in $\mathrm{SU}(2)$, $E_0=C_0$, and the projector list is empty; evaluation at $t=0$ is never used. Conversely, any product of $n$ primitive factors belongs to $\mathcal{E}_n$, but its actual degree can be smaller.
:::

::: proof
**Why can the last factor be peeled off?** Haah's Definition 1 defines the coefficient adjoint as $F^{\dagger}(t)=\sum_j C_j^{\dagger}t^j$, without reversing exponents. Thus on the unit circle $F(\eta)^*=F^{\dagger}(\eta^{-1})$, generally not $F^{\dagger}(\eta)$. The infinitely many circle values promote unitarity and determinant relations to Laurent identities: multiply each entry by a sufficiently large power of $t$, and an ordinary polynomial vanishing at infinitely many points has all coefficients zero. For $n>0$, comparison of the extreme coefficients gives

$$
\begin{aligned}
\det C_n&=\det C_{-n}=0,\\
C_{-n}^{\dagger}C_n&=0,\qquad C_nC_{-n}^{\dagger}=0.
\end{aligned}
$$

Every nonzero endpoint matrix therefore has rank one. The paper uses these relations to select the unique terminal projector $P$ satisfying $C_n(I-P)=0$ and $C_{-n}P=0$. In the branch $n>0$ and $C_n\ne0$, projection onto the row space of $C_n$ gives

$$
P=P_n=\frac{C_n^{\dagger}C_n}{\Tr(C_n^{\dagger}C_n)}.
$$

The denominator is strictly positive in this branch; the constant case does not use this formula. If the nonzero negative endpoint is used instead, the paper's parallel argument selects the complementary projector from the row space of $C_{-n}$, satisfying the same two cancellation conditions. The original disjunction therefore needs no additional positive-endpoint assumption.

Set $G(t)=F(t)\bigl(t^{-1}P+t(I-P)\bigr)=F(t)E_P(t)^{-1}$. With coefficients outside the support understood to be zero, multiplication gives the update

$$
G_j=C_{j+1}P+C_{j-1}(I-P).
$$

The two cancellation conditions remove the $t^{n+1}$ and $t^{-n-1}$ terms, and parity reduces the degree bound to $n-1$; the circle values remain in $\mathrm{SU}(2)$. The degree is exactly $n-1$: a smaller degree would contradict the actual degree $n$ of $F$ through $F=GE_P$ and $\deg F\le\deg G+1$. Induction on $G\in\mathcal{E}_{n-1}$ then reconstructs the list by appending $P_n=P$ on the right. In any decomposition of length exactly $n$, the terminal projector must satisfy those same endpoint cancellation conditions and is uniquely determined by a nonzero endpoint. Repeated peeling establishes uniqueness of the entire ordered list and residual constant. The full proof is checked by the Lean kernel.
:::

For example, expansion using $P(I-P)=0$ gives $E_P(t)E_{I-P}(t)=I$: artificially padded lists do not have the stated uniqueness.

**Boundaries of exact synthesis.** Theorem 2 factors an already specified whole matrix loop with values in $\mathrm{SU}(2)$ everywhere on the unit circle and the stated parity. Completing a bounded real target polynomial to such a loop, fixing the phase convention relating $t$ to the signal variable, and imposing inversion symmetry to restrict the $P_k$ to the Bloch equator in a particular QSP convention require additional hypotheses and arguments (Haah §3.1 and the Gilyén et al. completion results above). Lifting the two-dimensional signal action to a matrix singular-value transformation also requires the block-encoding and projection bridges. Uniqueness of the ordered projectors here therefore gives neither uniqueness of real angle representatives nor uniqueness for padded lists, and does not by itself guarantee numerical stability, efficiency, or hardware implementation.

The combinatorial counts for directed, alternating, and undirected glued-tree cycle completions, together with the full formal QSVT synthesis chain from central-defect spectral bounds and interval sum-of-squares completion through whole-circle phase factorization and raw projected-unitary lifting, are collected in [Appendix L](appendix-l.md) ([§L.1](appendix-l-s01-forest-cycle-counting.md)–[§L.6](ch16-s07-native-phase-witness.md)). Explore the full walk-spreading laboratory below before moving on to finite-word gate polytopes in [§16.3](ch16-s08-finite-gate-polytopes.md).

::: {.viz src="walk-spreading" height="560"}
**The walk-spreading lab.** Drag the rail to change the steps, change the coin's share $w$ and phase $\varphi$, or shorten the cycle: cyan above is the quantum walk, grey below the classical random walk, and magenta what the quantum distribution has beyond its mirror image. The green box is [@lemma-symmetric-coin-walk]; the widths and the lopsidedness are the page's numbers.
:::
