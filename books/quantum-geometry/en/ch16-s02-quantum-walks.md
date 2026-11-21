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

## 16.2.1 Static Directed Forests: Completing One Global Cycle {#sec-directed-forest-cycle-completion}

In the classical glued-trees argument, “connect randomly to an unused endpoint” can conceal a constraint: the target is one cycle through all leaves, so a small component must not close early. First isolate this constraint in a static directed model. Suppose the prescribed edges are $a\to b$ and $c\to d$, with an isolated vertex $e$. The three components are $(a,b)$, $(c,d)$, and $(e)$; the only single-cycle completions are the permutations $(a\ b\ c\ d\ e)$ and $(a\ b\ e\ c\ d)$. Thus the successor of $b$ is equally likely to be $c$ or $e$, and is never $a$. Adding $b\to a$ respects the degree bounds but leaves the other vertices outside that cycle.

The underlying permutation-contraction correspondence is classical. Gessel, *Generalized Rook Polynomials and Orthogonal Polynomials* (1989, 159–176, [10.1007/978-1-4684-0637-5_13](https://doi.org/10.1007/978-1-4684-0637-5_13), [author's original](https://people.brandeis.edu/~gessel/homepage/papers/rookp.pdf)), defines compatible conditions by distinct rows and columns in Section 2, defines $T_n^A$ as the actual intersection of satisfying sets in Section 3, page 5, and gives the permutation-contraction bijection in Section 8, page 11. The cycle count changes by the number of directed cycles among the prescribed edges.

A closer source for the endpoints, counts, and probabilities below is Boaz Tsaban, *Permutation graphs, fast forward permutations, and sampling the cycle structure of a permutation*, *Journal of Algorithms* **47** (2003), 104–121, [10.1016/S0196-6774(03)00017-8](https://doi.org/10.1016/S0196-6774(03)00017-8). On pages 107–109, Lemma 1.1 obtains path components with unique minimal and maximal endpoints from an acyclic partial permutation graph; Lemma 1.2 connects these endpoints to exhaust all single-cycle completions and gives their factorial count; Lemma 1.3 distinguishes closing a component from merging distinct components; and Definition 1.4 and Lemma 1.5 give uniform endpoint choices and query-sequence probabilities for forward and inverse permutation queries. These endpoint, counting, and probability laws already appear in the literature; they do not originate in this book.

Below we present these classical results using actual completion sets on the same vertex set, an endpoint bijection, and static conditional distributions, retaining the full written proof. Tsaban's query model concerns values of a permutation and its inverse; it does not directly cover the full adaptive query history of glued trees. No mathematical novelty is claimed. Formalization is registered in [request #11](https://github.com/the-omega-institute/trureturing-requests/issues/11); the Lean results for path order, endpoint completion, and exact counts precede the combined derivation on the original vertex set.

Contracting each weak component to a point turns a completed cycle into a cycle of components. Below, the components, endpoints, and completion sets are defined directly from the original edge relation; a full cycle here means a permutation with exactly one orbit on its vertex set.

::: {.theorem #thm-directed-forest-component-path-order title="The unique directed path order of an actual component" lean="D5/S3/Combinatorics/Graph/LinearForests/DirectedForestPathOrder.component_path_order"}
Let $V$ be a finite type and let $E:V\to V\to\operatorname{Prop}$ be right-unique, left-unique, and acyclic in the sense that `Relation.TransGen E` is irreflexive. Write $\operatorname{Component}(E)=V/\operatorname{EqvGen}(E)$. For each actual component $A\in\operatorname{Component}(E)$, define its vertex fiber by

$$
V_A=\{x\in V:[x]_E=A\},\qquad m_A=|V_A|.
$$

There is a unique bijection $e_A:\{0,\ldots,m_A-1\}\simeq V_A$ such that, for every pair of indices $i,j$,

$$
E\bigl(e_A(i),e_A(j)\bigr)\quad\Longleftrightarrow\quad i+1=j.
$$

Fiber elements are identified here with their underlying vertices. The bijection visits every vertex of the component exactly once, and the equivalence characterizes all directed edges. No lower bound of two on the component count is required: an isolated component has a singleton enumeration, and an empty carrier has no component $A$.
:::

::: proof
Any two vertices in one component have directed paths to its tail. Reverse these paths and use uniqueness of predecessors to compare the vertices. Acyclicity then makes directed reachability a strict total order on the fiber. Enumerate the finite fiber in this order. An original edge cannot skip an intermediate position: uniqueness of successors would force a nonempty directed cycle. Conversely, a nonempty path between consecutive positions cannot have an intermediate vertex, so it is an original edge. The index change between two enumerations satisfying the equivalence is strictly increasing. A strictly increasing self-map of a finite linear order is the identity, proving uniqueness. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-directed-forest-completion-core title="The endpoint-completion core for a directed linear forest" lean="D5/S3/Combinatorics/Graph/LinearForests/DirectedForestCompletion.directed_forest_completion"}
Let $V$ be a finite type and $E:V\to V\to\operatorname{Prop}$ be right-unique (at most one outgoing neighbor), left-unique (at most one incoming neighbor), and acyclic in the sense that `Relation.TransGen E` is irreflexive. Assume that the weak-component quotient $\operatorname{Component}(E)$ has at least two elements. Let $\operatorname{Tail}(E)$ and $\operatorname{Head}(E)$ be the subtypes of vertices with no outgoing and no incoming $E$-edge. Let $\operatorname{CycleCompletion}(E)$ consist of the actual permutations extending $E$ and satisfying `IsCycleOn Set.univ`, and let $\operatorname{FullCycle}(W)$ consist of the actual permutations on $W$ satisfying `IsCycleOn Set.univ`.

Then there are equivalences
$q:\operatorname{Component}(E)\simeq\operatorname{Tail}(E)$,
$h:\operatorname{Component}(E)\simeq\operatorname{Head}(E)$, and
$\Phi:\operatorname{CycleCompletion}(E)\simeq\operatorname{FullCycle}(\operatorname{Component}(E))$. The underlying vertices of $q(A)$ and $h(A)$ lie in component $A$, and every completion $\sigma$ satisfies the endpoint equation
$\sigma(q(A))=h(\Phi(\sigma)(A))$.

Moreover, $\operatorname{CycleCompletion}(E)$ is nonempty and has finite cardinality $(|\operatorname{Component}(E)|-1)!$ (using natural-number truncated subtraction and factorial). The defined `UniformCompletionLaw` also holds: there are uniform probability masses $\mu_0$ on actual full cycles and $\mu_E$ on completions. The extension event meets the support of $\mu_0$, and conditioning $\mu_0$ by `PMF.filter` equals the pushforward of $\mu_E$ along the natural inclusion into the full-cycle set. The pushforward of $\mu_E$ along $\Phi$ is uniform on component full cycles. Under this same $\mu_E$, the probability that the raw endpoint image $\sigma(q(A))$ equals $h(B)$ is $0$ when $A=B$ and $1/(c-1)$ when $A\ne B$, where $c=|\operatorname{Component}(E)|$.
:::

::: proof
Finiteness, acyclicity, and uniqueness of successors identify a tail in each weak component; applying the same argument to the reversed relation identifies its head. Every extending permutation bijects the tails with the heads. First returns to the heads identify the orbits of the original permutation with those of the component permutation, giving the equivalence between full-cycle completions. This equivalence gives the factorial count and nonemptiness. Conditioning and pushing forward finite uniform probability masses give the same completion law, and the endpoint equation transports component-successor marginals back to the original vertices. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-directed-forest-edge-and-completion-mass title="Edge count and extension-event mass of a directed forest" lean="D5/S3/Combinatorics/Graph/LinearForests/DirectedForestCompletionCounts.edge_and_completion_mass"}
Let $E$ be a right-unique and left-unique relation on a finite vertex set $V$ with irreflexive `Relation.TransGen E`. Write $N=|V|\ge2$ and $c=|\operatorname{Component}(E)|\ge2$, including every isolated vertex among the weak components. Then the actual edge set $\{(x,y):E(x,y)\}$ has cardinality $N-c$.

For any uniform probability mass $\mu$ on the actual full cycles on $V$, the outer measure of the extension event $\{\sigma:\forall x,y,\ E(x,y)\Rightarrow\sigma(x)=y\}$ is $(c-1)!/(N-1)!$, and this value is strictly positive.
:::

::: proof
Projection to the source is a bijection from the edges to the vertices with an outgoing edge. The complementary vertices are the component tails. The endpoint-completion equivalence counts the extension event, and uniformity divides that count by the total number of full cycles.
:::

[@thm-directed-forest-component-path-order] identifies the path in each component. [@thm-directed-forest-completion-core] gives the completion equivalence and conditional law, and [@thm-directed-forest-edge-and-completion-mass] gives the edge count and the event mass before conditioning. The next subsection covers static classification and counting under alternation. Orientation fibers over ordinary undirected full cycles appear in [@thm-undirected-cycle-orientation-fibers].

::: {.remark #thm-directed-forest-cycle-completion title="Single-cycle completion of a directed forest and its static uniform law"}
Let $V$ be a finite labelled set of cardinality $N\ge2$, and let $E\subseteq V\times V$. Suppose every vertex has at most one incoming and at most one outgoing edge in $E$, and $E$ has no directed cycle. Let $\mathcal C$ be the set of all weak components of $(V,E)$, including every isolated vertex, and suppose $c=|\mathcal C|\ge2$.

Each component $A$ is a directed path uniquely determined by $E$, with a unique head $h(A)$ having no incoming edge and a unique tail $q(A)$ having no outgoing edge. For an isolated component $\{v\}$ both endpoints are $v$. Moreover, $|E|=N-c$. For a nonempty finite set $X$, write $\operatorname{Cyc}(X)$ for its permutations with exactly one orbit. Define the actual completion sets

$$
\begin{aligned}
\Omega_0&=\operatorname{Cyc}(V),\\
\Omega_E&=\{\sigma\in\Omega_0:\quad
       \sigma(u)=v\ \text{for every }(u,v)\in E\}.
\end{aligned}
$$

Then $\Omega_E\ne\varnothing$, and there is a bijection

$$
\begin{aligned}
\Phi:\Omega_E&\simeq\operatorname{Cyc}(\mathcal C),\\
\sigma(q(A))&=h\bigl(\Phi(\sigma)(A)\bigr)
\quad(A\in\mathcal C).
\end{aligned}
$$

The endpoint equation uniquely determines $\Phi(\sigma)$. The inverse retains every $E$-edge and adds $q(A)\to h(\pi(A))$ for each $A$. It exhausts $\Omega_E$, rather than merely constructing a family within it.

We have $|\Omega_E|=(c-1)!$. Let $\nu_0$ be uniform on $\Omega_0$ and $\mu_E$ uniform on $\Omega_E$. Then

$$
\nu_0(\Omega_E)=\frac{(c-1)!}{(N-1)!}>0,
$$

and conditioning $\nu_0$ on extension of $E$ gives exactly $\mu_E$. The pushforward of $\mu_E$ under $\Phi$ is uniform on $\operatorname{Cyc}(\mathcal C)$. For every $A,B\in\mathcal C$,

$$
\mu_E\{\sigma:\sigma(q(A))=h(B)\}
=\begin{cases}
0,&A=B,\\
\dfrac{1}{c-1},&A\ne B.
\end{cases}
$$
:::

::: {.proof #pf-directed-forest-cycle-completion}
The following gives a full static account of Tsaban's component endpoints, single-cycle completions, and uniform law; the contraction correspondence also appears in Gessel's Section 8. Both existence of a completion and exhaustiveness of the correspondence are proved explicitly.

**Derive the paths from the raw edge set.** From any vertex, follow its unique predecessor backwards. Finiteness and the absence of directed cycles force this process to end at a vertex $h$ with no incoming edge. Following the unique successor forwards from $h$ likewise visits no vertex twice and ends at a vertex $q$ with no outgoing edge. Every internal vertex already has an incoming and an outgoing edge; $h$ has no incoming edge and $q$ no outgoing edge. Thus no vertex outside this path can be joined to it by an $E$-edge. The path is exactly the starting vertex's entire weak component. Only $h$ lacks a predecessor and only $q$ lacks a successor, so its order and endpoints are unique. An isolated vertex gives a path of length zero. Summing $|A|-1$ edges over all components gives $|E|=N-c$, without assuming a supplied path list.

**Contract every actual extending permutation.** First take any permutation $\sigma$ of $V$ extending $E$, without assuming it has only one orbit. Every non-head already has its incoming edge fixed by $E$. Injectivity forces the image of each tail to be a head. Surjectivity supplies a preimage for every head, and that preimage must be a tail because the images of non-tails are fixed inside their paths. Hence $\sigma$ bijects all tails with all heads, uniquely determining a component permutation $\pi$ by $\sigma(q(A))=h(\pi(A))$.

Conversely, for any permutation $\pi$ of $\mathcal C$, retain the successors within each path and specify the successors of tails by this equation. Each non-head has its original path predecessor, and each head has exactly the tail of $\pi^{-1}(A)$ as predecessor. The resulting map is a permutation of $V$ extending $E$. These operations are pointwise inverses. Following the lifted permutation traverses every vertex of the current path before entering the head of the component specified by $\pi$. Its orbits therefore correspond bijectively to those of $\pi$; in particular, one has exactly one orbit if and only if the other does. Restriction gives the asserted $\Phi$ on all of $\Omega_E$.

**Count and condition.** Fix a component $A_0$. Arrange all components as $A_0,A_1,\ldots,A_{c-1}$, connect them in that order, and return from the last to $A_0$. This gives a single-orbit $\pi$ and hence an actual completion, proving nonemptiness. Starting at fixed $A_0$, each component cycle has exactly one such ordering, so there are $(c-1)!$ of them. Likewise $|\Omega_0|=(N-1)!$. Each $\sigma\in\Omega_E$ originally has mass $1/(N-1)!$; dividing by the positive event probability $(c-1)!/(N-1)!$ gives conditional mass $1/(c-1)!$. A bijection has one preimage per point, so its pushforward is uniform as well.

Finally, since $c\ge2$, a single-orbit $\pi$ cannot fix $A$, and the same-component endpoint event is empty. For $A\ne B$, start the component cycle at $A$ and require $B$ next. The remaining $c-2$ components can appear in any order, giving $(c-2)!$ possibilities. The endpoint probability is $(c-2)!/(c-1)!=1/(c-1)$, including $0!=1$ when $c=2$.
:::

**Boundaries and the obstruction.** Isolated vertices must enter the component count: if $E=\varnothing$, then $c=N$, and the theorem recovers the uniform law on all single cycles. In particular, when $N=c=2$, the unique completion exchanges the two vertices; it is a directed two-cycle, not a two-sided polygon in an undirected simple graph. When $c=2$, each tail must lead to the other component's head. The final closure at $c=1$ lies outside the theorem's probability formula: a path already spanning all vertices must then close from its tail to its own head. The presence of other components makes early closure an obstruction; the degree bounds alone do not forbid it.

Frieze–Suen, *Counting the Number of Hamilton Cycles in Random Digraphs* ([10.1002/rsa.3240030303](https://doi.org/10.1002/rsa.3240030303), [original, pages 4–5](https://www.math.cmu.edu/~af1p/Texfiles/hamsuen.pdf)), also contract directed paths to identify uniquely all Hamilton cycles containing the prescribed edges, obtaining the count $(n-t-1)!$. Their prescribed $t$ edges belong to an already given Hamilton cycle. Here extension existence is first proved for arbitrary raw $E$ satisfying the hypotheses, and $c=N-|E|$ then gives the same count; existence must not be assumed in advance.

## 16.2.2 Alternating forests: counting with both endpoint colors retained {#sec-alternating-forest-classification}

Ordinary contraction treats each path as one label. Requiring the full cycle to alternate red and blue also requires retaining each path's head and tail colors. The smallest obstruction already occurs with two edges: $r_1\to b_1$ and $b_2\to r_2$ each alternate, yet cannot form an alternating full cycle on all four vertices, because both available connectors would lead to a head of the same color. In contrast, $r_1\to b_1$ and $r_2\to b_2$ have the unique completion $(r_1\ b_1\ r_2\ b_2)$. These are actual labelled vertices; contraction does not merge the component labels.

Write $R,B$ for red and blue (`false,true` in the source), with $\overline R=B$ and $\overline B=R$. For any finite set $X$, define

$$
\operatorname{Cyc}(X)=\{\rho\in\operatorname{Perm}(X):
 X\ne\varnothing,\ \rho.\mathrm{IsCycleOn}(X)\}.
$$

Here the set in `IsCycleOn` is the whole carrier. Thus $\operatorname{Cyc}(\varnothing)=\varnothing$, whereas the identity on a singleton is a full cycle. Cycle notation suppresses only the starting point: cyclic rotations of $(x_0\ x_1\cdots x_{j-1})$ describe the same permutation, while reversing the order generally describes another permutation. There is no further quotient by reversal.

::: {.theorem #thm-alternating-forest-classification title="Alternating completion classification and four count branches for a balanced two-color raw forest" lean="D5/S3/Combinatorics/Graph/LinearForests/CompatibleCycleInventory.alternating_completion_classification"}
For every natural number $n$, finite labelled set $V$, relation $E\subseteq V\times V$, and coloring $k:V\to\{R,B\}$, assume that each vertex has at most one outgoing and at most one incoming $E$-neighbor; $\operatorname{TransGen}(E)$ is irreflexive; every $E$-edge joins opposite colors; and $|k^{-1}(R)|=|k^{-1}(B)|=n$.

Let $\mathcal C=V/\operatorname{EqvGen}(E)$ be the actual weak-component quotient of all vertices by the equivalence relation generated by $E$, including every isolated vertex; write $[x]_E$ for a vertex's quotient class. Let $\operatorname{Head}(E)$ and $\operatorname{Tail}(E)$ be the actual vertex subtypes with no incoming and no outgoing edge, respectively, and define

$$
\Omega_k(E)=\{\sigma\in\operatorname{Cyc}(V):
 \ \sigma(x)=y\text{ whenever }E(x,y),\quad
 k(\sigma(x))\ne k(x)\text{ for every }x\in V\}.
$$

There are equivalences

$$
\begin{aligned}
t&:\mathcal C\simeq\operatorname{Tail}(E),\\
h&:\mathcal C\simeq\operatorname{Head}(E),\\
\Phi&:\Omega_k(E)\simeq
 \{\tau\in\operatorname{Cyc}(\mathcal C):
    k(t(A))\ne k(h(\tau(A)))\text{ for every }A\in\mathcal C\},
\end{aligned}
$$

with actual component membership $[t(A)]_E=A$ and $[h(A)]_E=A$, and the connector equation, for every $\sigma\in\Omega_k(E)$ and $A\in\mathcal C$,

$$
\sigma(t(A))=h\bigl(\Phi(\sigma)(A)\bigr).
$$

Using these same endpoints, define the four actual component counts

$$
\begin{aligned}
a&=|\{A:(k(h(A)),k(t(A)))=(R,R)\}|,\\
b&=|\{A:(k(h(A)),k(t(A)))=(B,B)\}|,\\
p&=|\{A:(k(h(A)),k(t(A)))=(R,B)\}|,\\
q&=|\{A:(k(h(A)),k(t(A)))=(B,R)\}|.
\end{aligned}
$$

Then $a=b$, $|\mathcal C|=a+b+p+q$, and $n\ne0\Rightarrow |\mathcal C|>0$. Put $m=a=b$. The cardinality is

$$
|\Omega_k(E)|=
\begin{cases}
0,&n=0,\\
m(m+p-1)!(m+q-1)!,&n>0,\ m>0,\\
(p+q-1)!,&n>0,\ m=0,\ p+q>0,\ pq=0,\\
0,&n>0,\ m=0,\ p>0,\ q>0.
\end{cases}
$$

All subtraction is truncated natural-number subtraction, and $0!=1$. When $n>0,m=0$, the condition $p+q>0$ follows from the component total and nonemptiness above; it is not an additional hypothesis.
:::

::: proof
**Actual endpoints and all completions.** Follow the unique predecessors and successors in raw $E$. Finiteness and acyclicity make both searches terminate; the path argument in the preceding subsection identifies the resulting path with the entire weak component, yielding the bijections $h,t$ and both quotient-membership equations. An isolated vertex is its own head and tail. Neither a path decomposition nor a completion is supplied in advance.

For any actual permutation extending $E$, successors of non-tail vertices and predecessors of non-head vertices are already fixed. Injectivity and surjectivity therefore make the remaining tails biject precisely with all heads, determining a unique component permutation $\tau$. Conversely, retain every internal path edge and add $t(A)\to h(\tau(A))$; this recovers the original permutation pointwise. After visiting a head, the walk must traverse its entire component, and the next head visited is exactly $h(\tau(A))$. This first-return correspondence identifies the orbits on both sides. The original permutation is consequently a full cycle exactly when $\tau$ is a component full cycle. Internal edges already alternate, so alternation everywhere is equivalent to opposite colors at every tail connector. Restricting the correspondence gives $\Phi$ on the whole of $\Omega_k(E)$, with its connector equation, rather than the image of a selected construction. The quotient map carries nonemptiness of $V$ to nonemptiness of $\mathcal C$; a representative of a quotient class gives the converse. Both sides thus obey this subsection's nonempty-cycle convention, including its exclusion of the empty carrier.

**Balance from occupied incoming and outgoing edges.** The raw edges biject red vertices having an outgoing edge with blue vertices having an incoming edge. Unique successors define the map, unique predecessors give injectivity, incoming-edge existence gives surjectivity, and edge alternation fixes the colors. Write $u$ for their common cardinality. Subtracting these occupied vertices from the two color fibers, both of size $n$, gives

$$
\begin{aligned}
|\{x\in\operatorname{Tail}(E):k(x)=R\}|&=n-u,\\
|\{x\in\operatorname{Head}(E):k(x)=B\}|&=n-u.
\end{aligned}
$$

Transporting along $t,h$, the two sides are $a+q$ and $b+q$, respectively, so $a=b$. The four endpoint types partition all components, giving the total. If $n>0$, the original red fiber is nonempty, hence so is the quotient. Each conclusion follows from the raw hypotheses.

**Component labels as auxiliary two-state arcs.** Set
$s(A)=k(h(A))$ and $d(A)=\overline{k(t(A))}$.
Regard each actual component label $A$ as an auxiliary arc $s(A)\to d(A)$. Compatibility is exactly $d(A)=s(\tau(A))$. Thus $a,b$ count crossing arcs $R\to B,B\to R$, while $p,q$ count loops at $R,B$; the source-state fibers have sizes $r=m+p$ and $\ell=m+q$. A loop here is an auxiliary arc, not an edge of the original forest. Parallel arcs retain distinct component labels.

**Delete a loop and reinsert it before its actual successor.** For $m>0$, use strong induction on the number of component labels. If $c$ is a loop at state $z$, the retained carrier $L=\mathcal C\setminus\{c\}$ still has $m>0$ crossing arcs in each direction. Therefore $L$ and both source-state fibers remain nonempty. This nonemptiness requirement is essential.

Take any compatible full cycle $\tau$ on the original carrier. Since another label remains, $y=\tau(c)\ne c$; compatibility gives $s(y)=z$. Delete $c$ by connecting its actual predecessor directly to $y$, obtaining a permutation $\rho$ of $L$. Compatibility survives: the sole rewritten connection satisfies $d(\tau^{-1}(c))=s(c)=s(y)$. Conversely, for any compatible full cycle $\rho$ on $L$ and any slot $y\in L$ with $s(y)=z$, replace $\rho^{-1}(y)\to y$ by $\rho^{-1}(y)\to c\to y$. These operations are inverse. First returns skipping $c$ take one or two steps and preserve orbit relations among all retained labels; $c$ belongs to the same orbit as $y$. Hence there is one full cycle before deletion exactly when there is one afterward.

This is a product bijection between all actual full cycles and all retained full cycles paired with all slots of the required state. Deleting a red loop leaves a source fiber of size $r-1$, multiplying the count by $r-1$; a blue loop gives the factor $\ell-1$. Both retained source fibers have at least $m$ elements, so the identity $j(j-1)!=j!$ for $j>0$ advances the factorial recurrence. No deletion step treats a singleton loop as insertion into an empty carrier.

**The first-return base case with crossing arcs only.** With no loops, there are $m>0$ labels in each source-state fiber $L_R,L_B$. Restricting any compatible permutation gives bijections $f:L_R\simeq L_B$ and $g:L_B\simeq L_R$; conversely, every such pair combines into a unique actual permutation on the two fibers. Every blue label enters the red fiber in one step, and a red label's first return takes exactly two steps, with return permutation $\kappa=g\circ f$. All labels lie in one orbit exactly when $\kappa\in\operatorname{Cyc}(L_R)$. The complete parameters are therefore an arbitrary bijection $f$ and an arbitrary red-fiber full cycle $\kappa$, with $g=\kappa\circ f^{-1}$ uniquely recovered. This accounts for every compatible permutation. The base count is

$$
m!\,(m-1)!=m\bigl((m-1)!\bigr)^2.
$$

Fix an order for reinserting the $p,q$ labelled loops. The red slot counts are $m,m+1,\ldots,m+p-1$, and the blue slot counts are $m,m+1,\ldots,m+q-1$, yielding $m(r-1)!(\ell-1)!$.

**Zero crossing inventory and the empty carrier.** If $m=0$, every auxiliary arc is a loop, and compatible permutations preserve source color. When $p,q$ are both positive, the two nonempty color sets cannot lie in one orbit, so the count is zero. If $pq=0$ and $p+q>0$, source color is constant and every full cycle on the labels is compatible. Fixing one label as the written starting point leaves the other labels free to appear in any order, giving $(p+q-1)!$. This includes the identity cycle of a single loop, treated separately from deletion with a nonempty retained carrier. Finally, if $n=0$, both color fibers are empty, so $V$ and $\mathcal C$ are empty. The explicit nonemptiness condition gives zero actual completions; truncated subtraction followed by $0!$ must not introduce an empty cycle. Transporting these counts through $\Phi$ gives the four branches. The full proof is checked by the Lean kernel.
:::

The direct source entry for this unbounded inventory count is [`compatible_cycle_card`](lean:D5/S3/Combinatorics/Graph/LinearForests/CompatibleCycleInventory.compatible_cycle_card). The positive-crossing branch has classical BEST provenance: Paidi Creed and Mary Cryan, *The number of Euler tours of random directed graphs*, *Electronic Journal of Combinatorics* **20**(3) (2013), P13, [10.37236/2377](https://doi.org/10.37236/2377), Theorem 1, pages 2–3 ([original](https://www.combinatorics.org/ojs/index.php/eljc/article/download/v20i3p13/pdf)). Pages 1–2 identify Euler tours modulo cyclic rotation only; the discussion and footnote following the theorem allow loops and parallel arcs. For $m>0$, the auxiliary two-state graph is strongly connected. There are $m$ spanning in-trees into either root, and outdegrees $m+p,m+q$, so BEST gives the same positive-inventory formula. The formal proof here uses actual deletion, insertion, and first returns rather than a general BEST theorem as a black box. Ordinary forest contraction retains the Tsaban and Gessel provenance given above. The empty carrier, disconnected zero-crossing inventories, endpoint balance, and complete raw-forest synthesis are not attributed verbatim to those sources, and no literature novelty is claimed.

Both feasible and impossible cases can be checked by hand. For $E=\varnothing,n=2$, the four isolated vertices give $a=b=2,p=q=0$, and count $2$: $(r_1\ b_1\ r_2\ b_2)$ and $(r_1\ b_2\ r_2\ b_1)$. A single path $r_1\to b_1$ spanning all vertices has $m=q=0,p=1$; the component identity cycle gives its unique closure. The two oppositely directed paths at the start of this subsection have $m=0,p=q=1$, giving count zero. Thus the theorem assumes neither a completion, a positive count, a supplied path decomposition, nor strong connectivity.

::: {.theorem #thm-alternating-completion-law title="The extension-event and conditional laws for an alternating forest" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingCompletionLaw.alternating_completion_law"}
Under the hypotheses of [@thm-alternating-forest-classification], assume each color class has $n>0$ vertices. Let $\Omega$ be all directed alternating full cycles on the original labelled vertices, $S_E\subseteq\Omega$ the event of extending $E$, and $M=|\Omega_k(E)|$ the number of actual completions from that classification. There is a uniform probability mass $\mu$ on $\Omega$, giving each cycle mass $1/[n!(n-1)!]$, with
$$
\mu(S_E)=\frac{M}{n!(n-1)!}.
$$
Lean expresses this finite event probability as an outer measure. It is strictly positive if and only if $\Omega_k(E)$ is nonempty.

For each component $A$, its tail $t(A)$ and head $h(A)$ lie in $A$. The bijection $\Phi$ from completions to compatible component full cycles satisfies $\sigma(t(A))=h(\Phi(\sigma)(A))$. Given a witness that $S_E$ meets the support of $\mu$, there is a uniform probability mass $\nu$ on actual completions with mass $1/M$ at each completion. The pushforward of $\nu$ along inclusion is $\mu$ conditioned on $S_E$. The pushforward of the same $\nu$ along $\Phi$ gives mass $1/M$ to each compatible component full cycle.
:::

::: proof
On the original labels, choosing the opposite of the source color as the target color gives an inventory of $n$ crossing labels in each direction and $n!(n-1)!$ full cycles. Equivalently, fix a red label as the starting point and order all blue labels and the remaining red labels in their respective slots. The extension event consists of exactly the permutations in the completion set, so uniformity gives the ratio of the two cardinalities. On a positive event, normalization assigns equal mass to every completion, and the component bijection transfers that mass to its unique corresponding cycle.
:::

Gessel applies a linear functional to a product of cycle rook polynomials to obtain the cycle-weight enumerator for permutations that exchange two equally sized parts. The linear coefficient of this enumerator gives the same $n!(n-1)!$. For the empty forest, $M=n!(n-1)!$ and the event has probability $1$. The incompatible pair of paths at the start of this subsection has $M=0$ and probability $0$. [Original, Section 8, page 12](https://people.brandeis.edu/~gessel/homepage/papers/rookp.pdf)

::: {.theorem #thm-alternating-connector-mass title="Probability of a prescribed connector between distinct components" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingConnectorLaw.connector_mass"}
Use the uniform law on compatible component cycles from [@thm-alternating-completion-law]. Fix distinct components $A,B$. The event $\sigma(t(A))=h(B)$ has probability zero if $s(B)\ne d(A)$.

If $s(B)=d(A)$, remove label $A$ and set the source color of $B$ to $s(A)$. Leave all other source colors and the remaining destination colors unchanged. Let $R$ be the remaining carrier, $a',b'$ the two source-color counts, $m'$ the number of false-to-true labels, and $p',q'$ the two same-color counts. Define
$$
M'=
\begin{cases}
m'(a'-1)!(b'-1)!, & m'>0,\\
(|R|-1)!, & m'=0 \text{ and } (p'=0\text{ or }q'=0),\\
0, & m'=0 \text{ and }p',q'>0 .
\end{cases}
$$
The conditional probability of the connector is $M'/M$, where $M$ is the original positive completion count.
:::

::: proof
The component bijection identifies the event with $\pi(A)=B$. In such a cycle, the predecessor of $A$ is redirected to $B$ after $A$ is removed. Assigning $B$ the old source color of $A$ preserves compatibility at that redirected edge. The inverse inserts $A$ immediately before $B$, using $s(B)=d(A)$ for the inserted edge. The resulting transition inventory is balanced: the auxiliary transitions $s(A)\to d(A)$ and $s(B)\to d(B)$ are replaced by $s(A)\to d(B)$. The inventory count on $R$ is therefore $M'$. Each original compatible component cycle has mass $1/M$.
:::

::: {.theorem #thm-alternating-successor-set-bound title="A successor-set bound for compatible single cycles" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingSuccessorSetBound.successor_set_mass_le"}
Each label $A$ in a finite component set has a source color $s(A)$ and a destination color $d(A)$, and each of the two source colors occurs at least twice. Assume at least one single-cycle permutation $\pi$ satisfies $s(\pi(A))=d(A)$ for every label $A$, and sample uniformly among those permutations. Fix a label $A$ and a set of targets $T$ excluding $A$. Let $c_A$ count labels whose source color equals $d(A)$. Then

$$
\Pr(\pi(A)\in T)\le\frac{|T|}{c_A-1}.
$$

:::

::: proof
[@thm-alternating-connector-mass] expresses a prescribed connector's probability as the ratio of the counts after and before contraction. A color mismatch gives probability zero. For a color match, substituting the contracted transition counts into that ratio bounds the mass of a single target by $1/(c_A-1)$. Sum over $T$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-alternating-forest-successor-bound title="The successor of a component in a prescribed alternating forest" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingForestSuccessorBound.mass_of_successor_components"}
Let $E$ be a directed relation prescribed on a finite set with $n$ vertices of each color, and write $m=|E|$. Suppose $m+2\le n$ and at least one directed alternating full cycle extends $E$. Sample uniformly from those completions.

The weak components of $E$ have unique tails and heads. For a component $A$ and a set $T$ of components that excludes $A$, the probability that the successor of the tail of $A$ is the head of a component in $T$ is at most

$$
\frac{|T|}{n-m-1}.
$$
:::

::: proof
In a completion every vertex has one incoming edge and one outgoing edge, so $E$ prescribes at most one of each at every vertex. Any directed cycle in $E$ would already contain every vertex, which is impossible under the edge count. Classify the components by their endpoints using [@thm-alternating-forest-classification]. Each prescribed edge removes at most one head from a color class, so each class has at least $n-m$ heads. Apply [@thm-alternating-successor-set-bound] to the uniform admissible single-cycle permutation of components with the head colors and the colors required by the tails. The full proof is checked by the Lean kernel.
:::

## 16.2.3 Undirected full cycles: two orientations of the same completed graph {#sec-undirected-cycle-orientation-fibers}

On an undirected cycle through five labelled vertices, clockwise and counterclockwise traversal give different successor permutations with exactly the same edges. Forgetting direction must identify those two actual representations, rather than merely divide a count by two. The correspondence below keeps the original labelled vertices; the prescribed edges may even already form a complete cycle.

The full application is developed in trureturing's [RotationFaces exposition](https://github.com/the-omega-institute/trureturing/blob/2731c2994260e6ac22ed3385bbc04b37a63ac7a3/Blueprint/D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.md). Its frozen supplier, [`cycle_boundary_walk`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationFaces.cycle_boundary_walk), identifies the two directions of a simple closed walk from an actual rotation system and an exact binary facial boundary. The broader statement below must first construct those inputs from graphs and permutations. It therefore retains a complete written proof rather than a Lean badge for the whole application.

::: {.theorem #thm-undirected-cycle-orientation-fibers title="Orientation fibers and edge insertion for the same undirected full cycle" status="written-proof" proof="pf-undirected-cycle-orientation-fibers" repository="https://github.com/the-omega-institute/trureturing" source="RotationFaces, orientation-fiber application" request="https://github.com/the-omega-institute/trureturing-requests/issues/12"}
Let $V$ be a finite labelled set with $|V|\ge3$, and let $F$ be any simple graph on $V$. Define

$$
\mathcal H(F)=\{C:\ C\text{ is a connected simple graph on }V,
\deg_C(v)=2\ (v\in V),\ F\le C\}.
$$

Let $\mathcal L(F)$ contain all actual pairs $(E,\sigma)$ where $E\subseteq V\times V$ orients each edge of $F$ exactly once, contains no other edges, and has at most one incoming and one outgoing edge at each vertex; $\sigma\in\operatorname{Cyc}(V)$ extends $E$, meaning $E(u,v)\Rightarrow\sigma(u)=v$. Every isolate of $F$ remains in $V$. Define the undirected shadow by

$$
C_\sigma.\operatorname{Adj}(u,v)
\quad\Longleftrightarrow\quad
\sigma(u)=v\ \text{or}\ \sigma(v)=u.
$$

Then $(E,\sigma)\mapsto C_\sigma$ is onto $\mathcal H(F)$. Above the shadow of any $(E,\sigma)\in\mathcal L(F)$, the entire fiber consists of exactly the two distinct actual pairs

$$
(E,\sigma),\qquad(E^{\mathrm{op}},\sigma^{-1}),
\qquad E^{\mathrm{op}}(u,v)\Longleftrightarrow E(v,u).
$$

Reversal $\iota(E,\sigma)=(E^{\mathrm{op}},\sigma^{-1})$ is an involution without fixed points and induces an equivalence

$$
\mathcal L(F)/\langle\iota\rangle\ \simeq\ \mathcal H(F).
$$

It sends each class to that same actual completed graph, preserving every adjacency event. The set $\mathcal H(F)$ may be empty.

For any distinct $u,v\in V$, let $F+uv$ add just the undirected edge $\{u,v\}$. There is also an equivalence

$$
\mathcal L(F+uv)\ \simeq
\{(E,\sigma)\in\mathcal L(F):C_\sigma.\operatorname{Adj}(u,v)\}.
$$

This equivalence keeps $\sigma$ and the same shadow and commutes with reversal. Neither $F$ nor $F+uv$ is required to be a forest: closing a spanning path and the case $F=C$ are included.
:::

::: {.proof #pf-undirected-cycle-orientation-fibers}
**Construct an actual representation from the raw graph.** In a finite connected simple graph $C$ of degree two everywhere, start at any vertex and continue along edges, always avoiding the edge just traversed. Degree two makes each next step unique, and finiteness eventually forces a repeated vertex. The first repetition must return to the starting vertex: any other repeated vertex already has two neighbors on the simple path so far, and another arrival would require a third neighbor or an immediate backtrack. This gives a simple closed walk $p$. Both edges at each vertex of the cycle are already occupied, so no edge can leave it. Connectedness therefore makes its support all of $V$ and its undirected edges exactly those of $C$.

Taking successors along $p$ defines a full-cycle permutation $\tau$ on $V$. Since $|V|\ge3$, it has neither fixed points nor two-cycles, and its shadow is exactly $C$. For $F\le C$, put

$$
E_\tau(x,y)\quad\Longleftrightarrow\quad
F.\operatorname{Adj}(x,y)\ \text{and}\ \tau(x)=y.
$$

Every edge of $F$ has exactly one direction along $\tau$, with at most one incoming and one outgoing edge per vertex. Thus $(E_\tau,\tau)$ is an actual lift, giving the existence needed for surjectivity. No orientation, path decomposition or completion was supplied with $F$.

**Read the shadow and orientation of any actual lift.** Conversely, take any $(E,\sigma)\in\mathcal L(F)$. The full-cycle condition makes every orbit have length $|V|$, so $\sigma(v)\ne v$ and $\sigma(v)\ne\sigma^{-1}(v)$. The shadow has exactly these two distinct neighbors at $v$, hence is simple and two-regular; the full permutation orbit makes it connected. Since $\sigma$ extends the chosen direction of every edge of $F$, we have $F\le C_\sigma$. In fact, for every $x,y$,

$$
E(x,y)\quad\Longleftrightarrow\quad
F.\operatorname{Adj}(x,y)\ \text{and}\ \sigma(x)=y.
$$

If the implication from right to left failed, $E$ would have to choose the reverse edge, forcing both $\sigma(x)=y$ and $\sigma(y)=x$, a forbidden two-cycle. Thus $\sigma$ determines the entire pair. This describes all actual lifts, not merely the image of one construction.

**Exhaust the two directions through the actual facial boundary.** Fix the raw graph $C$ and its spanning simple closed walk $p$, and take any full-cycle permutation $\sigma$ with shadow $C$. An actual oriented edge $d=(x,y)$ is a dart. At each vertex, interchange its two outgoing darts, pointing to $\sigma(x)$ and $\sigma^{-1}(x)$. This defines a rotation system $R$: its rotor orbits are exactly the two darts with the same first vertex. The facial successor reverses a dart and then applies this interchange. Label darts by

$$
\ell(x,y)=
\begin{cases}1,&\sigma(x)=y,\\0,&\sigma^{-1}(x)=y,\end{cases}
\qquad\ell(x,y)\in\mathbb F_2.
$$

The facial successor sends $(x,\sigma(x))$ to $(\sigma(x),\sigma^2(x))$ and $(x,\sigma^{-1}(x))$ to $(\sigma^{-1}(x),\sigma^{-2}(x))$, preserving the label in both cases. As it is a permutation, its inverse preserves the label too. Hence $\ell$ is constant on each actual facial orbit under all integer iterates and descends to a function $z$ on the face quotient, with $z(R.\operatorname{face}(d))=\ell(d)$. Opposite darts have opposite labels, so their sum in $\mathbb F_2$ is one on every undirected edge. Since $p$ traverses exactly all edges of $C$, this binary boundary is precisely the edge indicator of $p$.

Every input of the frozen `cycle_boundary_walk` is now constructed: the actual graph is $C$, the rotation is $R$, the simple closed walk is $p$, the face function is $z$, and the boundary equality holds on every edge. It supplies $q=p$ or $q=p^{\mathrm{reverse}}$ and, for every actual dart,

$$
\bigl(z(R.\operatorname{face}(d)),z(R.\operatorname{face}(d^{\mathrm{op}}))\bigr)=(1,0)
\quad\Longleftrightarrow\quad d\in q.\operatorname{darts}.
$$

The left side is exactly the successor direction of $\sigma$, so $\sigma=\tau$ or $\sigma=\tau^{-1}$. This applies to every actual lift. Global orientation coherence is a conclusion, and no Euler equation has been assumed.

**Recover actual pairs, the quotient and edge insertion.** Applying this conclusion to two arbitrary lifts of the same shadow makes their permutations equal or inverse. The forced-orientation formula then makes the pairs equal or reversals. Reversing twice restores the original pair. A pair fixed by reversal would satisfy $\sigma^2=\operatorname{id}$, contradicting a full cycle of length at least three. Every fiber therefore consists of exactly the two distinct pairs stated above. Surjectivity and this exact fiber description identify reversal orbits with completed graphs. Each class still maps to the same $C_\sigma$, so every adjacency event is preserved.

Finally, from $\mathcal L(F+uv)$ keep $\sigma$ and restrict $E$ to edges of $F$; its shadow still contains $uv$. Conversely, from any pair on the right keep $\sigma$ and define

$$
E'(x,y)\quad\Longleftrightarrow\quad
(F+uv).\operatorname{Adj}(x,y)\ \text{and}\ \sigma(x)=y.
$$

The shadow contains $F+uv$, and absence of two-cycles selects exactly one direction for each edge. The permutation gives the incoming and outgoing bounds. Forced orientation shows that restriction and expansion are inverse and that the expansion is unique. Both keep the shadow; replacing $\sigma$ by its inverse reverses every selected direction, so both commute with $\iota$. Nothing in this argument excludes an insertion that closes the full cycle. This is a written proof, for which the author and reviewers are responsible.
:::

The two permutation representations of a simple full cycle have a classical antecedent: Greenhill, Janson, Kim and Wormald, *Permutation pseudographs and contiguity*, [10.1017/S0963548301005065](https://doi.org/10.1017/S0963548301005065), p. 3, gives permutation multiplicities for two-regular pseudographs. Here the objects are ordinary simple full cycles on at least three vertices. On two vertices the inverse permutations coincide, and a disconnected union of cycles is not the shadow of one full-cycle permutation. That reference supplies the classical multiplicity provenance, rather than every strengthened correspondence and insertion clause above.

::: {.theorem #thm-uniform-undirected-cycle-completion title="The uniform law on undirected cycle completions" lean="D5/S3/Combinatorics/Graph/LinearForests/UndirectedCycleCompletionLaw.uniform_undirected_completion" proof="pf-uniform-undirected-cycle-completion"}
Let $V$ be a finite labelled vertex set with $|V|\ge3$. Let $F$ be a simple graph on $V$ with $\mathcal H(F)$ nonempty. Write $\pi\colon\mathcal L(F)\to\mathcal H(F)$ for the map that forgets orientation. There are probability masses $\mu$ on $\mathcal L(F)$ and $\nu$ on $\mathcal H(F)$ such that every lift $l$ and completed graph $C$ satisfy

$$
\mu(l)=\frac{1}{|\mathcal L(F)|},\qquad
\nu(C)=\frac{1}{|\mathcal H(F)|},\qquad \pi_*\mu=\nu.
$$
:::

::: {.proof #pf-uniform-undirected-cycle-completion}
Each completed graph has two oriented lifts. Once a direction is fixed on one edge, the successor at the next vertex must use the other edge, since returning immediately would form a two-cycle. The choice propagates around the entire graph, so any two lifts of the same graph coincide or are reversals. The pushforward adds the two equal masses in each fiber, giving $2/|\mathcal L(F)|=1/|\mathcal H(F)|$. The full proof is checked by the Lean kernel.
:::

The law concerns a fixed ordinary undirected simple graph. Alternating color constraints, random names and ports, and adaptive histories require their own probability models.

::: {.theorem #thm-alternating-undirected-completion-law title="Fixed-edge conditioning for alternating undirected cycles" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingUndirectedCompletionLaw.alternating_undirected_completion_law"}
Let the two color classes of a finite labelled vertex set each have $n\ge2$ vertices. Write $\Omega$ for all undirected full cycles on these vertices whose edges cross between the classes. For a prescribed simple graph $F$ on the same vertices, write $\Omega(F)$ for the members of $\Omega$ containing every edge of $F$. Then
$$
|\Omega|=\frac{n!(n-1)!}{2}.
$$
There is a uniform probability mass $\mu$ on $\Omega$. Its outer measure of the event of containing $F$ is $|\Omega(F)|/|\Omega|$, and this is positive exactly when $\Omega(F)$ is nonempty. For an event of positive mass, conditioning $\mu$ on containing $F$ gives the uniform probability mass on $\Omega(F)$ pushed forward along inclusion.
:::

::: proof
An alternating successor permutation gives an alternating undirected cycle by forgetting direction. Both directions of an alternating undirected cycle are alternating, so each undirected cycle has exactly two directed representatives. Divide the directed ambient count $n!(n-1)!$ by two. Containing $F$ selects the subset $\Omega(F)$ of this finite uniform space. Normalizing the equal point masses on that subset gives the conditional law. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-complete-neighborhood-history title="Complete neighborhood transcripts characterize edge extension with degree bounds" lean="D5/S3/Combinatorics/Graph/Queries/CompleteNeighborhoodHistory.history_eq_iff_extension"}
Fix a finite labelled vertex set and a deterministic adaptive protocol that queries vertices and receives their complete unordered neighbor sets. Take the actual transcript from its run on a graph $H$ and let $F$ consist of the undirected edges returned in the transcript. The run on a candidate simple graph $G$ on the same labels has the same transcript exactly when $F\le G$ and, at every recorded query, the degree in $G$ is at most the number of vertices in that reply.
:::

::: proof
If the transcripts agree, each recorded reply is also the complete neighbor set in $G$ at its recorded vertex. This supplies every edge of $F$ and gives equality in every degree bound.

Conversely, suppose $G$ contains $F$ and satisfies the recorded degree bounds. The fixed protocol starts with the same query on both graphs. Inclusion of $F$ puts every neighbor in the first reply inside the candidate neighbor set at that vertex. The degree bound gives the reverse cardinality inequality, so the finite sets are equal. This reply selects the same continuation. Its remaining recorded edges are still contained in $G$ and its recorded degree bounds are inherited, so induction through the continuation gives equality of the whole transcript. The full proof is checked by the Lean kernel.
:::

Suppose the distribution is supported on graphs with the same degree at each labelled vertex as the reference graph $H$. Every candidate in that class then satisfies the recorded degree bounds. The transcript event is then exactly $F\le G$, and the two events give the same conditional distribution whenever their probability is positive. This model fixes the labels, the deterministic protocol, and the complete unordered replies. Random naming, queries outside the named vertex set, and replies with additional port or color information require their own observation models.

::: {.theorem #thm-fixed-neighbor-order-likelihood title="Likelihood with one fixed neighbor order per vertex" lean="D5/S3/Combinatorics/Graph/Queries/FixedNeighborOrder.fixed_neighbor_order_likelihood"}
Fix a finite labelled vertex set and a degree function $d$. At each vertex $v$, choose an ordering of its $d(v)$ neighbors uniformly and independently of the other vertices. Every query at $v$ returns its full ordered list from that same choice. Fix a deterministic adaptive protocol and an ordered transcript $\tau$ that occurs on a reference graph of degree profile $d$ with some orders. Let $F_\tau$ have the edges returned in the transcript and let $Q_\tau$ contain its distinct queried labels.

For a candidate graph $G$ with the same degree profile, the likelihood of this transcript over its port orders is
$$
\Pr(\tau\mid G)=\mathbf{1}_{\{F_\tau\le G\}}\left(\prod_{v\in Q_\tau}d(v)!\right)^{-1}.
$$
:::

::: proof
If a reported edge is absent, the transcript cannot occur. If all reported edges are present, the degree at every queried label forces the reported neighbors to be the whole neighbor set. Each distinct queried label then prescribes one permutation of its neighbor set. Such a table of prescribed local orders makes the protocol replay the transcript. All unqueried vertex orders are free, and each repeated query reads the order already fixed for its label. Dividing the number of allowed order tables by the number of all order tables gives the likelihood. The full proof is checked by the Lean kernel.
:::

At positive transcript probability the same factor multiplies each candidate graph that extends $F_\tau$, so the posterior graph law is the prior conditioned on that extension event. An independent fresh ordering on each query would describe a different experiment, with the product indexed by query occurrences.

A path may reveal only one of the two forward slots at a vertex of the abstract exploration tree. Give each abstract position an independent uniform ordering of its two available values. The available pair may change with the underlying graph.

::: {.theorem #thm-partial-forward-order-likelihood title="Likelihood of partial observations of binary forward orders" lean="D5/S3/Combinatorics/Graph/Queries/PartialForwardOrderLaw.partial_forward_order_likelihood"}
Fix finitely many positions, each with two distinct available values. An observation at a position may specify neither, one, or both ordered slots. Call the observation compatible if every specified value is available at its position, and two specified slots at one position have distinct values. If $s$ positions have at least one specified slot, the observation has probability $2^{-s}$ when compatible and zero otherwise.
:::

::: proof
At a touched position the first specified value fixes one of the two orders. A second specified value agrees precisely when it is the other available value. Compatibility thus determines one independent local order at every touched position, leaving all other orders free. The full proof is checked by the Lean kernel.
:::

After conditioning on the observed positions, a later segment that reads entirely unused positions still contributes one factor of one half per position.

::: {.theorem #thm-fresh-forward-suffix title="The conditional likelihood of slots at unused positions" lean="D5/S3/Combinatorics/Graph/Queries/ForwardSuffixLaw.suffix_after_prefix"}
Fix two distinct values at each of finitely many positions and give each position an independent uniform order. Consider two fixed partial observations whose sets of observed positions are disjoint. Assume the earlier observation is compatible in the sense of [@thm-partial-forward-order-likelihood]. Given that observation, the later observation has probability $2^{-s}$ if compatible and zero otherwise, where $s$ is its number of observed positions.
:::

::: proof
The joint event matches the combined observation because the two tables constrain disjoint sets of positions. Its likelihood has one factor of one half for every position observed by either table, and it vanishes if the later table is incompatible. Dividing by the earlier observation's positive likelihood cancels all factors for its positions. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-partial-forward-order-posterior title="The posterior for a partial forward-order observation" lean="D5/S3/Combinatorics/Graph/Queries/PartialForwardOrderLaw.partial_forward_order_posterior"}
Let a world drawn from a probability mass function $\pi$ determine the available pair at each position. At each position, flip an independent fair coin to keep or swap the two indices. The coin flips are independent of the world. Apply them to the available values supplied by that world. Let $C$ be the set of worlds compatible with a fixed observation $E$. If $E$ has positive probability, then for every set of worlds $B$,

$$
\Pr(B\mid E)=\frac{\pi(B\cap C)}{\pi(C)}.
$$

:::

::: proof
The same positions are touched in every world. By [@thm-partial-forward-order-likelihood], the joint mass associated with worlds in $B$ is $2^{-s}\pi(B\cap C)$, and the total observation mass is $2^{-s}\pi(C)$. Their ratio gives the claimed law. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-world-mixed-forward-suffix title="Bounding a fresh suffix across graph worlds" lean="D5/S3/Combinatorics/Graph/Queries/WorldMixedForwardSuffix.joint_fresh_suffix_bound"}
Draw a graph world $w$ from an arbitrary probability mass function. Each world supplies two distinct indexed values at every position of a finite set. At each position, flip a fair coin to keep or swap the two indices. The flips are independent of one another and of the world. Apply the permutations to the sampled world's values. Fix a partial prefix table and let $E$ be the event that the resulting slot values match it. Specify a partial suffix table for each world, using positions disjoint from those of the prefix table. Let $F$ be the event that the slot values match the suffix table for the sampled world.

Let $B$ be any set of worlds whose suffix tables each observe at least $n$ distinct positions. If $\Pr(E)>0$, then

$$
\Pr(w\in B,\ F\mid E)\le \Pr(w\in B\mid E)\,2^{-n}.
$$

Lean states the bound using probability ratios in the extended nonnegative reals. If the prefix has probability zero, both numerator events are contained in $E$ and also have probability zero. With the convention $0/0=0$, the ratio bound holds with equality in this case.
:::

::: proof
Fix a world. If it is incompatible with the prefix, the prefix and all of its subevents have probability zero there. If it is compatible, [@thm-fresh-forward-suffix] gives the conditional probability of matching the suffix. In each world of $B$, the suffix specifies at least $n$ new positions, so that probability is at most $2^{-n}$. Average the joint probabilities using the prior and divide by the total prefix probability. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-uniform-remaining-name-hit title="Guessing an available name after a partial observation" lean="D5/S3/Combinatorics/Probability/PartialNameAssignment.uniform_remaining_name_hit"}
Choose an injection uniformly from a finite vertex set into a finite name set. Fix an injective naming on a subset $K$ and a set $A$ of available names disjoint from the names already fixed. Assume at least one injection agrees with the fixed naming and assigns names in $A$ to all other vertices. Conditional on those requirements, the law is uniform over the consistent injections. Under this same law, for each $a\in A$ the probability that some remaining vertex receives $a$ is the number of remaining vertices divided by $|A|$.
:::

::: proof
All consistent injections have the same prior mass, so conditioning gives them the same mass. Restricting to the remaining vertices gives a bijection with injections into $A$: extending by the fixed names preserves injectivity because those names lie outside $A$. At any remaining vertex, swapping two names from $A$ exchanges the sets of injections assigning those names there. A specified name therefore has probability $1/|A|$ at each remaining vertex, and it can occur at most once in an injection. Adding the disjoint probabilities over those vertices gives the formula. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-uniform-residual-naming-restriction title="Joint uniformity of the names on a fixed remaining selection" lean="D5/S3/Combinatorics/Probability/NamingRestrictionLaw.uniform_residual_restriction"}
Let the vertex set and the name set $N$ both be finite. Fix an injective assignment of names in $N$ to some vertices, and choose a set of available names $A \subseteq N$ disjoint from the fixed names. Suppose at least one injective naming extends the fixed assignment and uses only names from $A$ on the other vertices. Draw uniformly from these extensions.

Let $\iota$ inject a finite index set $Z$ into the remaining vertices. The names at the vertices selected by $\iota$, read together as an injection $g\colon Z\hookrightarrow A$, have the uniform law on all such injections. Each $g$ has probability $1/|\operatorname{Inj}(Z,A)|$.
:::

::: proof
Use the bijection from consistent completions to residual injections in [@thm-uniform-remaining-name-hit]. For any two specified restricted namings, extend their name-to-name bijection to a permutation of the whole set $A$. Postcomposing each residual injection with that permutation pairs the two completion fibers bijectively. Their masses are equal, and the probabilities of the possible restricted namings sum to one. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-uniform-naming-update title="Uniform completions after an expanded naming" lean="D5/S3/Combinatorics/Probability/NamingUpdate.uniform_after_reveal"}
Let the vertex and name sets both be finite. Fix an injective naming on a vertex subset $K$ and require all remaining vertices to use names from a set $A$. Choose a set $L$ containing $K$ and an expanded injective naming on $L$. It preserves the fixed names on $K$ and gives each vertex in $L\setminus K$ a name in $A$. Suppose at least one original completion agrees with the expanded naming.

The original completions agreeing with the expanded naming correspond bijectively to the completions of that naming using the remaining available names. The remaining available names are the elements of $A$ after removing every name used by the expanded assignment. The correspondence preserves the full vertex naming. Thus the original uniform completion law conditioned on agreement with the expanded assignment equals the uniform law on the new completions when both are read as distributions of full namings.
:::

::: proof
If a full naming agrees with the expanded assignment on $L$, injectivity prevents any vertex outside $L$ from using one of those assigned values. Conversely, a completion of the expanded assignment uses names from $A$ at the newly assigned vertices and continues to use names from $A$ outside $L$. The correspondence reads the same injection under the two sets of constraints. Conditioning the finite uniform law makes it uniform on the agreeing completions. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ordered-naming-reply title="The probability of an ordered naming reply" lean="D5/S3/Combinatorics/Probability/OrderedNamingReply.ordered_reply_mass"}
Let the vertex set $V$ and the name set $N$ be finite. Fix an injective naming on a subset of $V$ and choose a set of available names $A\subseteq N$ disjoint from the fixed names. Suppose at least one injective completion uses only names in $A$ for the other vertices. Sample uniformly from these completions.

Fix a request map $r\colon I\to V$ and return the name of $r(i)$ at position $i$. Let $U$ be the set of distinct requested vertices without a fixed name. A reply $a\colon I\to N$ is consistent exactly when it returns the fixed name at each position with one, returns a name in $A$ at every other position, and satisfies $a(i)=a(j)$ if and only if $r(i)=r(j)$ for all $i,j$. Every consistent reply has probability $1/|\operatorname{Inj}(U,A)|$. Every inconsistent reply has probability zero.
:::

::: proof
For each vertex of $U$, read its name from any request position that selects it. Consistency makes the choice of position immaterial and gives different names to distinct vertices. Each consistent reply therefore determines a unique injection from $U$ into $A$. Conversely, this injection and the fixed names reconstruct the reply at every position. Transfer the uniform distribution in [@thm-uniform-residual-naming-restriction] along this correspondence. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-joint-ordered-reply-completion title="The joint law of an ordered reply and the full naming" lean="D5/S3/Combinatorics/Probability/JointNamingReplyCompletion.joint_ordered_reply_completion"}
Fix an injective naming on a subset $K$ of a finite vertex set $V$ with names from a finite set $N$. Let $A\subseteq N$ be a set of available names disjoint from the fixed names, and suppose there is at least one injective completion that uses only names from $A$ outside $K$. Fix a request map $r\colon I\to V$, and set $L=K\cup r(I)$ and $U=r(I)\setminus K$.

Draw a full naming $f$ uniformly from these completions and read the reply $a=f\circ r$. With consistency as in [@thm-ordered-naming-reply], every consistent reply has probability $1/|\operatorname{Inj}(U,A)|$, and every other reply has probability zero. For each positive-probability reply there is an expanded injective naming on $L$ that returns the reply at all request positions and admits at least one completion whose names outside $L$ come from $A$ after removing all names assigned on $L$. There is a conditional sampling rule that draws uniformly from those completions at each positive-probability reply. Sampling the reply first and then using this rule gives the same joint distribution of $(a,f)$ as sampling the full naming first and then reading the reply.
:::

::: proof
Among the original completions, giving a specified reply is equivalent to agreeing with the expanded naming on $L$. By [@thm-uniform-naming-update], the conditional law on that event is the uniform completion law using the remaining available names. Multiplying the probability of each reply by the corresponding conditional completion probability recovers the joint probability of every pair of reply and full naming. The full proof is checked by the Lean kernel.
:::

For example, two unnamed vertices and five available names give a hit probability of $2/5$ for any specified available name. To use the law after an adaptive graph query, one must identify the naming constraints imposed by the actual replies. Childs et al. use a sparse name space to bound guesses outside the known names in [quant-ph/0209131v2, Section IV](https://arxiv.org/abs/quant-ph/0209131v2).

Fix a graph and a deterministic strategy whose query is a name. On a hit, the oracle returns the complete unordered set of neighbor names. On a miss, it returns a separate marker. In the actual record, let $S$ contain the initially supplied names, the names of successful queries, and the returned neighbor names. Let $B$ contain the names that received a miss. The fresh names form $A=N\setminus(S\cup B)$.

::: {.theorem #thm-named-neighborhood-history-fiber title="Consistent namings for one assignment of the observed names" lean="D5/S3/Combinatorics/Graph/Queries/NamedNeighborhoodHistory.history_fiber_iff"}
Assume all initially supplied names occur in the reference naming. Among injections that agree with the reference naming at the vertices carrying names in $S$, the injections replaying the complete reference record are exactly those that give every remaining vertex a name in $A$.
:::

::: proof
Agreement on the successful query names and all the corresponding neighbor names reproduces the hit replies. Avoiding $B$ reproduces the misses. With each reply reproduced, the deterministic strategy makes the same next query. In the other direction, replaying each miss excludes those names from the range, and injectivity reserves $S$ for the already named vertices. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-named-neighborhood-fresh-name-hit title="The conditional hit probability for a fresh name" lean="D5/S3/Combinatorics/Graph/Queries/NamedNeighborhoodHistory.conditional_unseen_name_hit"}
Take the vertex set $V$ and name set $N$ finite. Choose the naming uniformly among injections and condition on the actual reference record and agreement on the initially supplied names, all of which occur in the reference naming. For each $a\in A$, the probability that a query at $a$ hits a vertex is
$$
\frac{|V|-|S|}{|A|}.
$$
:::

::: proof
The reference naming witnesses a nonempty conditioning event. Each compatible naming occupies exactly $|V|-|S|$ fresh names. Swapping two fresh names preserves the initial assignments and every recorded answer, so it defines a bijection between the compatible namings that hit the two names. Counting pairs of a compatible naming and one of its occupied fresh names gives the probability. The full proof is checked by the Lean kernel.
:::

The formula only needs the transcript as seen by the strategy and the prescribed initial assignments. The vertices carrying subsequently observed names can vary across compatible namings. With one hidden vertex, two names initially available, and a recorded miss on one of them, the other name hits with probability one. The calculation concerns one next query under the specified oracle. The game reduction in Childs et al. also controls the event that any previously unrevealed name is guessed over an entire bounded run [quant-ph/0209131v2, §IV, Lemma 4](https://arxiv.org/abs/quant-ph/0209131v2).

A strategy can keep queries to unknown names in its own computation and record a synthetic miss. The simulator calls the oracle only when the queried name is already known. In each world both the actual run and the simulation use the oracle determined by that world.

::: {.theorem #thm-known-name-simulation-budget title="Known-name simulation respects the query budget" lean="D5/S3/Combinatorics/Graph/Queries/KnownNameSimulation.simulated_sent_names_bound"}
Fix a query function returning a complete set of neighbor names or a miss marker, and a set of initially known names. If every branch of the deterministic strategy makes at most $q$ queries, then the simulation makes at most $q$ actual oracle calls.
:::

::: proof
Each simulated step follows a branch of the strategy, whether its answer came from the oracle or from the simulator. The simulated record has at most $q$ entries. The actual calls count only entries sent to the oracle. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-known-name-simulation-success title="Guessing an unknown name controls the difference in success" lean="D5/S3/Combinatorics/Graph/Queries/KnownNameSimulation.success_mass_le_simulated_add_guessed_hit"}
Take a probability mass function on worlds. Each world determines a query function, and success may depend on that world and the complete record. Let $E$ be the event that at least one query in the actual run hits a name that was unknown at the time. Then
$$
\Pr(\text{actual run succeeds})\le \Pr(\text{simulated run succeeds})+\Pr(E).
$$
:::

::: proof
Outside $E$, a query at a known name receives the same answer in the two runs. The actual oracle returns a miss on a query at an unknown name as well. The two runs therefore follow the same continuation and update the same known-name set at every step. As their complete records agree, every actual success lies in the union of simulated success and $E$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-known-name-exploration-size title="How many names a known-name exploration discovers" lean="D5/S3/Combinatorics/Graph/Queries/KnownNameExplorationSize.known_names_card_bound"}
Fix a finite name space and an injection from vertices into it. Initially only the root name is available. Suppose the root has degree at most $b$ and every vertex has degree at most $b+1$. Run the known-name simulator of [@thm-known-name-simulation-success] and suppose it sends $q$ complete unordered neighborhood queries to the real oracle. Count every forwarded call, including repeats. The simulator knows at most $1+bq$ distinct names at the end of the run. A degree-two root and maximum degree three give the bound $1+2q$.
:::

::: proof
The root supplies the first name. Each later known vertex first appeared in the reply for a neighbor whose name was already known. A query at such a vertex therefore returns at most $b+1$ neighbors, at least one with a known name. A query at the root adds at most $b$ names by its degree bound. Queries intercepted by the simulator add zero names and zero real oracle calls. The full proof is checked by the Lean kernel.
:::

The next query can also be recovered partway through the run. Given the actual prefix of length $i$, follow the strategy using each recorded answer. If the strategy has stopped, there is no next query. Otherwise it is the query at zero-based index $i$ in the record, as proved by [`nextQuery_of_prefix`](lean:D5/S3/Combinatorics/Graph/Queries/KnownNameSimulation.nextQuery_of_prefix). This allows the one-step law of [@thm-named-neighborhood-fresh-name-hit] to be applied on each prefix when studying $\Pr(E)$ over a whole query budget.

The one-step law bounds the probability over the whole run. Again fix a finite simple graph and the initially given name-to-vertex assignments, and sample uniformly among injections preserving them. Write $|N|$ for the total number of names, $|V|$ for the number of vertices, and $S_0$ for the initial set of known names. There are $L=|N|-|S_0|$ initially unknown names, of which $D=|N|-|V|$ name no vertex. Set $r=\min(q,L)$.

::: {.theorem #thm-fresh-name-budget-survival title="A hypergeometric bound on adaptive fresh-name guesses" lean="D5/S3/Combinatorics/Graph/Queries/FreshNameGuessBound.fresh_guess_survival_ge"}
Under this distribution, a deterministic strategy may choose each next query from the complete unordered neighbor replies and miss markers. Truncate its run after at most $q$ queries. The probability that every successful query uses a name known before the query is at least
$$
\frac{\binom{D}{r}}{\binom{L}{r}}.
$$
Thus the probability of at least one hit at a then-unknown name within the budget is at most one minus this ratio.
:::

::: proof
Group the namings that have avoided a fresh-name hit by their actual prefixes. The next query is fixed in each group. If it uses a known name, repeats a recorded miss, or the strategy has stopped, every naming in the group survives the step. Otherwise let $d$ be the number of newly revealed valid names and $b$ the number of distinct recorded misses. By [@thm-named-neighborhood-fresh-name-hit], the conditional hit probability is $(L-D-d)/(L-d-b)$. After $i$ queries, $b\le i$. When $i<D$, this gives a hit probability at most $(L-D)/(L-i)$. Summing the group contributions bounds the conditional survival probability at each step by $(D-i)/(L-i)$ from below. Multiplying these bounds gives the binomial ratio. If $r>D$, the numerator is zero. If every valid name is initially known, every run survives. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-fresh-name-budget-attainment title="Distinct guesses attain the bound" lean="D5/S3/Combinatorics/Graph/Queries/FreshNameGuessBound.exists_strategy_attaining_guess_survival"}
In the same model and with the same budget as [@thm-fresh-name-budget-survival], there is a deterministic strategy making at most $q$ queries on every branch for which this probability is exactly $\binom{D}{r}/\binom{L}{r}$.
:::

::: proof
Choose $r$ distinct initially unknown names, query them in a fixed order and stop at the first hit. Every query misses exactly when the sampled naming avoids the entire list. Counting injections of the remaining vertices gives the stated ratio. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-first-observed-cycle title="When an exploration first observes a cycle" lean="D5/S3/Combinatorics/Graph/Queries/FirstObservedCycle.first_observed_cycle"}
Start at a root of a finite simple graph. Query the complete neighborhood of a vertex reachable from the root through edges already exposed. The exposed graph at any time consists of the original edges incident to at least one queried vertex. Suppose the exposed graph is acyclic just before a query at $x$. The reply creates a cycle exactly when $x$ has never been queried and $x$ has an unqueried neighbor that was already reachable from the root before the query.
:::

::: proof
A repeated query adds no edges. For a first query at $x$, its new edges are precisely those to unqueried neighbors. If such a neighbor was already reachable, the new edge closes a path in the earlier exposure. Otherwise all the new neighbors were isolated in the exposed graph. Indeed, every exposed edge meets a previously queried vertex, and all queried vertices are reachable from the root. The query therefore attaches leaves and preserves acyclicity. The full proof is checked by the Lean kernel.
:::

A collision witness can end with several edges of a fixed binary tree after its last weld edge. The following sum groups the possible leaf endpoints of that weld edge by their distance from the vertex where the two paths meet.

::: {.theorem #thm-binary-tree-weighted-leaf-distance title="The total dyadic weight of the leaves of a complete binary tree" lean="D5/S3/Combinatorics/Graph/Queries/BinaryTreeLeafDistance.weighted_leaf_distance"}
Identify the vertices of a complete binary tree of depth $k$ with bit strings of length at most $k$. Two vertices are adjacent exactly when one string extends the other by one bit. For a vertex $z$ of depth $d$ and each depth-$k$ leaf $y$, let $d_{\mathrm{tree}}(z,y)$ be their graph distance. Then

$$
\sum_{|y|=k} 2^{-d_{\mathrm{tree}}(z,y)}
=\frac32-2^{-(d+1)}.
$$

The leaf enumeration in the sum lists each depth-$k$ string once.
:::

::: proof
A shortest path can go up to the longest common prefix and then down to the target. Each edge changes the remaining prefix distance by at most one, and this route stays within the depth cap. At the root the $2^k$ leaves all contribute $2^{-k}$. If $d>0$, the contribution of the branch containing $z$ is the same sum in a tree of depth $k-1$ from depth $d-1$. Each of the $2^{k-1}$ leaves in the opposite branch is at distance $k+d$, so that branch contributes $2^{-(d+1)}$. The two contributions give the formula by induction. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-bounded-word-tree-cut title="The two components after a parent edge is deleted" lean="D5/S3/Combinatorics/Graph/Queries/WordTreeCut.bounded_reachable_after_extension_cut"}
In a binary word tree with depth cap $k$, fix a parent word $p$ and a bit $a$ such that the child word $pa$, formed by appending $a$, has length at most $k$. Delete the edge between $p$ and $pa$. Two vertices remain connected exactly when both have prefix $pa$ or both lack that prefix.
:::

::: proof
Every tree edge appends or removes the final bit. The only edge across the prefix boundary joins $p$ and $pa$. Inside the subtree, removing final bits leads to $pa$. Outside the subtree it leads to the empty word. These paths stay within the depth cap and avoid the deleted edge. The full proof is checked by the Lean kernel.
:::

For a random graph, the transcript can also change the graph's distribution. Sample a graph index $g$ from a prior $\pi$ on graphs on the same finite vertex set $V$. Independently choose a uniform injective naming from $V$ into a finite name set $N$, subject to the prescribed initial assignments. Use a reference graph and naming consistent with the initial assignments to fix an actual transcript $\tau$ of a deterministic strategy whose replies are complete unordered neighborhoods or misses. Let $S$ consist of the initial names and the names in successful queries and their replies. Let $B$ be the set of names that received a miss.

A placement is an injection $S\hookrightarrow V$. It is feasible on $g$ if it agrees with the initial assignments and maps every successful reply to the entire neighborhood of the vertex named in the query. Write $F_\tau(g)$ for the number of feasible placements.

::: {.theorem #thm-joint-named-transcript-count title="Feasible placements have equally many naming extensions" lean="D5/S3/Combinatorics/Graph/Queries/JointNamedTranscript.transcript_naming_count"}
The number of injective namings on $g$ that agree with the initial assignments and replay $\tau$ is

$$
F_\tau(g)\bigl(|N|-|S|-|B|\bigr)_{\underline{|V|-|S|}},
$$

where $a_{\underline b}$ denotes the falling factorial.
:::

::: proof
A compatible naming determines a unique placement by taking its inverse on $S$. For each feasible placement, complete the naming by injecting the vertices outside its image into $N\setminus(S\cup B)$. These injections preserve the exact successful replies and keep the names in $B$ absent. Since the strategy is deterministic, these local constraints replay the entire transcript, including its stopping point. Counting the injections gives the stated factor. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-joint-named-transcript-posterior title="Transcript posterior on graph indices" lean="D5/S3/Combinatorics/Graph/Queries/JointNamedTranscript.graph_posterior"}
If $\tau$ has positive probability in this joint experiment, then

$$
\Pr(g\mid \tau)=
\frac{\pi(g)F_\tau(g)}{\sum_h\pi(h)F_\tau(h)}.
$$

:::

::: proof
The likelihood on each graph is its compatible naming count divided by the total number of namings extending the initial assignments. The total number and the falling factorial in [@thm-joint-named-transcript-count] are common to all graph indices. The positive transcript probability lets these factors cancel in the conditional ratio. The full proof is checked by the Lean kernel.
:::

As an example, choose uniformly among the graphs on vertices $0,\ldots,4$ with degree vector $(3,2,2,2,1)$, and fix the name $r$ for vertex $0$. Each graph is connected: the component of $0$ has at least four vertices and all vertices have positive degree. Each graph has five edges, so it has one cycle. The degree vector leaves two possibilities, each with three labeled graphs: a square with edge $04$ attached, or a triangle with a two-edge path from $0$ to $4$ attached.

Suppose the query at $r$ returns $\{a,b,c\}$ and the subsequent query at $a$ returns $\{r,d\}$, with all five names distinct. On a square, $a$ can name either cycle neighbor of $0$, and $b,c$ can be assigned to the other two neighbors in either order. On a triangle, $a$ must name the interior vertex of the attached path, and $b,c$ again have two orders. The placement counts are therefore four and two. Each square has posterior probability $2/9$, and each triangle has posterior probability $1/9$, even though all six graphs have the same prior probability and the same degree at every vertex.

::: {.theorem #thm-alternating-weld-orientation title="A common law for the weld and its orientations" lean="D5/S3/Combinatorics/Graph/LinearForests/AlternatingWeldOrientationLaw.alternating_weld_orientation_law"}
On a finite carrier of at least three vertices with two colors, fix a simple graph $F$ that extends to an alternating undirected full cycle. The uniform law on oriented alternating completions projects to the uniform law on the undirected alternating completions of $F$. Each prescribed orientation has $|F|$ arcs, where $|F|$ counts undirected edges. Given a prescribed orientation of positive mass, the full successor permutation is uniform among the directed alternating full cycles that extend it. Including any such directed completion into the original sample space retains both the prescribed orientation and the successor permutation.
:::

::: proof
An undirected completion has exactly two reversed lifts, and alternation is equivalent before and after forgetting direction. Conditioning the two laws on alternation therefore preserves the projection. Every edge of $F$ gets one prescribed direction. Fixing those directions leaves a fiber in bijection with the directed alternating completions of that relation, and uniformity is preserved by this bijection. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-unordered-weld-transcript-law title="The conditional weld law for a complete unordered transcript" lean="D5/S3/Combinatorics/Graph/Queries/UnorderedWeldTranscript.weld_transcript_law"}
Embed two disjoint sets of $n\ge2$ leaves into the vertex set of a fixed finite graph by one injection. Add a uniformly sampled undirected alternating full cycle on the leaves. A deterministic adaptive protocol queries any vertex and receives its entire unordered neighbor set. Fix a reference alternating full cycle on these leaves whose embedded edges are disjoint from the fixed graph. Remove the fixed edges from the reference transcript's recorded edges, and pull the remaining edges back to the leaf set to obtain $F$.

A candidate cycle gives the reference transcript exactly when it contains $F$. If $M$ undirected alternating full cycles contain $F$, the probability of that transcript is
$$
\frac{M}{n!(n-1)!/2}.
$$
At positive transcript mass, the weld is conditionally uniform over those completions.
:::

::: proof
Replaying the reference transcript requires every recorded edge outside the fixed graph. Both endpoints of such an edge come from leaves. Conversely, containing $F$ supplies every recorded edge once the fixed graph is added. The reference cycle adds two edges outside the fixed graph at each leaf and adds zero at other vertices. The degree in the candidate union is therefore at most the reference degree at each query. Apply [@thm-complete-neighborhood-history] to recover the full transcript and [@thm-alternating-undirected-completion-law] to count and normalize its event. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-weld-completion-fresh-neighbor title="A fresh weld neighbor with prescribed edges" lean="D5/S3/Combinatorics/Graph/Queries/AlternatingWeldQueryBound.weld_neighbor_mass_le"}
Split a finite set of at least three vertices into two color classes of size $n$. Let $F$ be a simple graph that extends to an undirected alternating full cycle, and write $f=|E(F)|$. Suppose $f+2\le n$. Draw uniformly among these completions. For a vertex $x$ and a finite target set $S$, the probability that some edge from $x$ to $S$ lies in the completion and outside $F$ is at most

$$
\frac{2|S|}{n-f-1}.
$$

:::

::: proof
Use [@thm-alternating-weld-orientation] to orient the completion and condition on the orientation of $F$. The directed successor estimate bounds the chance of a fresh outgoing edge into $S$ in every such fiber. The same bound holds for an incoming edge by reversal. Every fresh undirected edge is included in the union of those two events. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-weld-query-prefix-bound title="A fresh weld edge after a complete unordered query transcript" lean="D5/S3/Combinatorics/Graph/Queries/AlternatingWeldQueryBound.weld_query_prefix_bound"}
Use the uniform alternating weld and the complete unordered query model of [@thm-unordered-weld-transcript-law]. Fix a reference transcript of positive probability containing $q$ actual calls, with a reference cycle disjoint in edges from the fixed graph. Let $F$ be the weld edges recorded in that transcript. If $2q+2\le n$, then for any fixed leaf $x$ and set $S$ of leaves, the conditional probability of a weld edge from $x$ to a leaf in $S$ that is absent from $F$ is at most

$$
\frac{2|S|}{n-2q-1}.
$$
:::

::: proof
Each call records at most two additional weld edges. Given the reference transcript, the weld is uniform over the completions of $F$. Orient a uniform completion and condition on the prescribed directions of the edges of $F$. A fresh outgoing arc of $x$ joins the tail of its component to a head in a different component. The target vertices belong to at most $|S|$ distinct components, so [@thm-alternating-forest-successor-bound] bounds the outgoing probability on each orientation fiber. Averaging recovers the full law on oriented completions. Reversal gives the same bound for incoming arcs, and the union of the two events gives the undirected bound. The full proof is checked by the Lean kernel.
:::

An observed slot may depend on the previous steps. In a nonbacktracking walk, the previous vertex determines which incident edge is excluded from the forward choices.

::: {.theorem #thm-graph-path-posterior title="The graph posterior after disclosing a path" lean="D5/S3/Combinatorics/Graph/Queries/ForwardPathPosterior.graph_path_posterior"}
Draw a world from a prior mass function $\pi$. Each world gives a simple undirected graph on a common vertex set $V$ and contains the same initial incoming edge. All incoming endpoints and candidate vertices belong to $V$. Fix a finite set of positions, a schedule of position and slot requests, and two distinct candidates for each world, position and incoming pair. Independently of the world, each position uses an independent fair keep-or-swap choice on its two indices. After a slot returns a vertex, the next incoming pair consists of the current vertex and the returned vertex.

Fix an actual reference disclosure $\tau$ of positive probability. Its rows never return the predecessor, and every occurrence of a given position has the same incoming pair. The partial slot table records exactly the values in the reference rows, and the set of observed positions consists of those with a recorded slot. In each world containing a row's incoming edge, require that the vertex recorded in that row is one of the two candidates exactly when it is adjacent to the current vertex and differs from the predecessor.

Let $C_\tau$ be the set of worlds containing every recorded edge from a current vertex to its returned vertex. Then for every set of worlds $B$,

$$
\Pr(B\mid \tau)=\frac{\pi(B\cap C_\tau)}{\pi(C_\tau)}.
$$

:::

::: proof
Replaying the schedule matches the reference rows exactly when it matches the recorded slot values at their reference incoming pairs. The first incoming edge is common to every world, and every recorded outgoing edge supplies the incoming edge for the next row. Induction shows that every recorded vertex is available at its row exactly when all recorded edges are present. In the reference run, each position always uses the same incoming pair. Its permutation sends the two slots to distinct candidates, so their recorded values differ whenever both are observed. Together these facts give the compatibility of the table. The common likelihood factor from [@thm-partial-forward-order-likelihood] cancels in the posterior. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-branching-path-posterior title="The graph posterior after a branching disclosure" lean="D5/S3/Combinatorics/Graph/Queries/BranchingPathPosterior.graph_branching_posterior"}
Draw a world from the prior $\pi$. Each world gives a simple graph on a common vertex set, and all graphs contain the same initial edge. Fix a schedule of slot requests over finitely many positions. Draw an independent uniform permutation of two slots at each position, independently of the world. The world, position and incoming directed edge fix an ordered pair of distinct candidate vertices. At each visit, apply that position's permutation to the indices of this ordered pair to select the reply.

The position and current record length select an earlier directed edge as the incoming pair. An index outside the record selects the initial edge. Each reply prepends the edge from the incoming endpoint to the returned vertex. Fix a reference run in which every reference row at a given position uses the same incoming pair and returns a vertex different from the start of that pair. The observation table records exactly the positions, slots and values returned in the reference rows. Its seen set contains exactly the positions with recorded slots. For any candidate world containing a reference row's incoming edge $(u,v)$, the row's returned value $y$ is among the row's two candidates exactly when $y$ is adjacent to $v$ and $y\ne u$.

Let $H$ be the event that replay gives the reference disclosure, and let $C$ consist of worlds containing all the reference reply edges. If $H$ has positive probability, then for every world event $B$,

$$
\Pr(B\mid H)=\frac{\pi(B\cap C)}{\pi(C)}.
$$
:::

::: proof
Check replay along the reference record. When the earlier recorded edges are present, the selected incoming edge is present. Availability of the returned value is then equivalent to presence of its recorded reply edge. Repeated visits at one position share the reference pair and permutation, so its two recorded slots have distinct values whenever both are observed. Compatible worlds all have the same likelihood determined by the number of seen positions. That common factor cancels in the posterior. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-meeting-arms-last-weld title="The forest tail after the last weld crossing" lean="D5/S3/Combinatorics/Graph/Walks/LastWeldCrossing.meeting_arms_last_weld"}
Let $H$ be a forest and $W$ a weld graph on the same vertices. In their union, take two simple paths from $a$ to $b$ with positive total length. Require their final edges to be distinct whenever both exist. Follow the first path and then the reverse of the second, obtaining a closed walk of length $L$. This walk has an edge of $W$ outside $H$. Number its edges from zero and let $j$ index the last such edge. If $y$ is the vertex reached by that edge, the remaining walk has the same ordered vertex list as a simple path in $H$ from $y$ to $a$, and

$$
L-(j+1)=d_H(y,a).
$$

:::

::: proof
Each arm has no immediate reversal, and the different final edges prevent a reversal at the join. In a forest, a walk without an immediate reversal is a simple path. A nonempty closed walk of this kind must therefore use an edge outside $H$. After the last such edge, the entire suffix lies in $H$ and still has no immediate reversals. Its length equals the distance because it is the unique simple path between its endpoints. The full proof is checked by the Lean kernel.
:::

The length identity gives a way to sum over possible last crossings. Once the arrival leaf is fixed, its tree distance to the target determines the crossing index. The next bound combines this observation with a tail estimate for each leaf.

::: {.theorem #thm-weighted-tree-tail-bound title="Summing crossing events by arrival leaf" lean="D5/S3/Combinatorics/Graph/Queries/WeightedTreeTailBound.mass_of_weighted_tail"}
In a complete binary tree of height $k$, fix a target vertex $z$ of depth $d$ and a total path length $r$. The common bound $\alpha$ is an extended nonnegative real. For each step index $j$ and leaf $y$, consider a crossing event $C_{j,y}$ and a tail event $T_{j,y}$ on the outcome type of one probability mass function. Measure all events by its induced outer measure $\mu$. Suppose a collision event $A$ satisfies three conditions.

- Every outcome in $A$ belongs to some $C_{j,y}\cap T_{j,y}$ with $j+1+d_{\mathrm{tree}}(z,y)=r$.
- Each crossing event has mass at most $\alpha$.
- Each intersection $C_{j,y}\cap T_{j,y}$ has mass at most $\mu(C_{j,y})2^{-d_{\mathrm{tree}}(z,y)}$.

Then

$$
\mu(A)\leq \alpha\left(\frac32-2^{-(d+1)}\right).
$$

:::

::: proof
For a leaf that can witness a collision, its distance to $z$ fixes the index $j$. Subadditivity therefore counts at most one event for each leaf. Multiply the crossing bound by the tail weight for that leaf and sum using [@thm-binary-tree-weighted-leaf-distance]. The full proof is checked by the Lean kernel.
:::

Applying the estimate to a concrete welded-tree exploration still requires the crossing and joint tail bounds for the given query prefix.

::: {.theorem #thm-fresh-meeting-arm title="The next edge on the second arm is fresh" lean="D5/S3/Combinatorics/Graph/Walks/FreshMeetingArm.fresh_edge_after_first_arm"}
In a single simple undirected graph, take two simple paths starting at the same vertex. If the first path is nonempty, require the two first edges to differ. Every internal vertex of the second path lies outside the first path, and its terminal vertex may lie on the first path. Reveal the edges of the first path and a strict prefix of the second. The next edge on the second path is absent from the revealed edges.
:::

::: proof
At the common start, a simple path uses only its first edge incident to that vertex. At a later departure, the vertex lies outside the first path, so the edge cannot lie on it. The second path itself never repeats an edge. The full proof is checked by the Lean kernel.
:::

Each step in this disclosure records the selected path edge. A full neighborhood reply also includes the other edges incident to the queried vertex.

**Which bridges to a classical oracle lower bound remain?** [@thm-directed-forest-cycle-completion] gives the ordinary directed model's static uniform law, and [@thm-alternating-forest-classification] counts the alternating completions, with the conditional law given by [@thm-alternating-completion-law]. Three distinctions separate them from the glued-trees result in [@rem-qsvt-walks-literature]:

1. **Graph distribution and orientation.** Ben-David et al. (*SIAM Journal on Computing* **53**(6), 2024, [10.1137/23M1573975](https://doi.org/10.1137/23M1573975), §6.3.2, Lemmas 6.11–6.13, PDF pages 37–39) use one uniform cycle on each side's leaves for the self-weld, and a uniform alternating cycle between the two sides for the weld. [@thm-alternating-forest-classification] gives the alternating completion counts, and [@thm-alternating-completion-law] gives the fixed-edge event mass and conditional law. For ordinary undirected full cycles, [@thm-undirected-cycle-orientation-fibers] now identifies orientations and representation multiplicities over the same actual completed graph: each fiber is exactly a pair of reversed lifts, with edge-insertion events preserved. [@thm-uniform-undirected-cycle-completion] gives the uniform law for ordinary undirected completions of a fixed $F$. [@thm-alternating-connector-mass] gives the conditional probability of a specified connector, and [@thm-alternating-successor-set-bound] bounds the probability of a whole set of candidate successors. [@thm-alternating-forest-successor-bound] gives the resulting estimate in terms of the number of prescribed directed edges. [@thm-alternating-undirected-completion-law] gives the ambient count and fixed-edge conditional law for undirected alternating cycles. [@thm-alternating-weld-orientation] puts the directed and undirected weld completions on one probability space.
2. **Conditioning information.** The fixed-edge laws condition on all edges of $E$ being present. For fixed labels and complete unordered replies, [@thm-complete-neighborhood-history] gives the transcript event in terms of edge inclusion and degree bounds. In a degree class this reduces to the fixed-edge event. With one persistent order per vertex, the ordered transcript has the likelihood in [@thm-fixed-neighbor-order-likelihood]. On a fixed graph, [@thm-uniform-remaining-name-hit] gives the hit probability under a fixed partial naming, and [@thm-named-neighborhood-fresh-name-hit] gives the fresh-name hit probability conditioned on the actual unordered transcript. When the graph and its names are both random, [@thm-joint-named-transcript-posterior] gives the graph posterior for the complete unordered transcript. The conditional laws with color information or with joint port orders and random names still require proofs. [@thm-unordered-weld-transcript-law] gives the undirected weld law conditioned on an actual unordered reply prefix.
3. **Queries, embeddings, and success events.** In [quant-ph/0209131v2, Section IV](https://arxiv.org/abs/quant-ph/0209131v2), Childs et al. first handle guessed new names, colors, and games restricted to known names, then pass to random tree embeddings and bound collision and `EXIT` events to obtain the original Theorem 9. [@thm-first-observed-cycle] gives a deterministic criterion for the first cycle seen in a known-vertex exploration. Its collision probability still depends on the law of the random weld given the actual queries. [@thm-known-name-exploration-size] bounds the number of known names by $1+2q$ after $q$ actual oracle calls in the degree-two entrance and maximum-degree-three model. Ben-David et al.'s footnote 14 explicitly notes that queries returning all neighbors give an embedding tree with $O(t)$ vertices, not literally $t$. Their printed component lower bound $2^k-2t$, pair bound $2/(2^k-2t)$, and equation (6.4), $O(t^2/(2^k-t))$, are retained as separately stated in the source; no unproved explicit constant or parameter range is assembled from them here.

The ordinary contraction law supplies static counting and conditioning; the alternating results give classification, counting and the fixed-edge conditional law on the actual carrier. The written proof in [@thm-undirected-cycle-orientation-fibers] adds orientation fibers, the reversal quotient and edge insertion over the same ordinary undirected full cycle. The ordinary undirected probability law is [@thm-uniform-undirected-cycle-completion]. The actual named transcript gives a one-step hit probability on a fixed graph. The whole-budget hit bound is [@thm-fresh-name-budget-survival], and [@thm-fresh-name-budget-attainment] attains it. Query complexity and the full classical `EXIT` lower bound remain to be proved. The broader scope of [request #11](https://github.com/the-omega-institute/trureturing-requests/issues/11) remains unfinished. The next section turns to the quantum side, studying a specified weighted path and its endpoint probability.
