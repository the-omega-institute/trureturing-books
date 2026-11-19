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

1. **Quantum Singular Value Transformation (QSVT): complex unitary completion versus real-polynomial extraction** (A. Gilyén, Y. Su, G. H. Low, and N. Wiebe, *Quantum singular value transformation and beyond: exponential improvements for quantum matrix arithmetics*, Proc. 51st ACM STOC, 193–204, 2019, doi:10.1145/3313276.3316366, Theorem 3 and Theorem 17 / Corollary 18): Given a block encoding $\tilde{\Pi} U \Pi = A$ ($\norm{A}_{\mathrm{op}} \le 1$), the literature distinguishes two levels of polynomial realizability:
   - **Direct two-dimensional complex QSP (Theorem 3)**: A pair of complex polynomials $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ is realized directly as the matrix entries of a single phase-modulated sequence $U_{\Phi}(x)$ if and only if $\deg(P_{\mathrm{c}}) \le d$, $\deg(Q_{\mathrm{c}}) \le d - 1$, $P_{\mathrm{c}}$ has parity $d \bmod 2$, $Q_{\mathrm{c}}$ has opposite parity $(d - 1) \bmod 2$, and $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$ for all $x \in [-1, 1]$.
   - **General bounded real-polynomial QSVT via complex completion and real-part extraction (Theorem 17 / Corollary 18)**: For a general real target polynomial $P_{\mathrm{target}} \in \mathbb{R}[x]$ of degree $\le d$, definite parity $d \bmod 2$, and uniform bound $\max_{x \in [-1, 1]} |P_{\mathrm{target}}(x)| \le 1$ (for instance $P_{\mathrm{target}}(x) = x/2$, where $P_{\mathrm{target}}(1)^2 = 1/4 < 1$ precludes any real completion $P_{\mathrm{target}}(x)^2 + (1 - x^2)Q(x)^2 = 1$), Fejér–Riesz factorization constructs a complex completion pair $(P_{\mathrm{c}}, Q_{\mathrm{c}}) \in \mathbb{C}[x]^2$ satisfying Theorem 3 with $\operatorname{Re} P_{\mathrm{c}}(x) = P_{\mathrm{target}}(x)$ and $|P_{\mathrm{c}}(x)|^2 + (1 - x^2)|Q_{\mathrm{c}}(x)|^2 = 1$. Introducing one additional $\lvert +\rangle$ control ancilla to superpose the forward and negated phase sequences $\frac{1}{2}(U_{\Phi} + U_{-\Phi})$, followed by ancilla $\langle +\rvert$ projection and the parity-dependent block projection ($\tilde{\Pi}(\cdot)\Pi$ for odd $d$, $\Pi(\cdot)\Pi$ for even $d$), extracts the exact real transformation $P_{\mathrm{target}}^{(\mathrm{SV})}(A)$ across every singular-value $2\times 2$ block using $d$ queries to $U$ and $U^*$.

2. **Exponential quantum-walk speedup on glued trees and its structural limits** (A. M. Childs, R. Cleve, E. Deotto, E. Farhi, S. Gutmann, and D. A. Spielman, *Exponential algorithmic speedup by a quantum walk*, Proc. 35th ACM STOC, 59–68, 2003, doi:10.1145/780542.780552, arXiv:quant-ph/0209131): On two depth-$n$ binary trees joined by a random cycle of alternating edges at the leaves, a continuous-time quantum walk starting at the entrance root remains confined to the $(2n+2)$-dimensional symmetric column subspace and reaches the `EXIT` root in $\mathrm{poly}(n)$ time, whereas Childs et al. prove that any classical algorithm making at most $2^{n/6}$ oracle queries finds the `EXIT` vertex with probability at most $4\cdot 2^{-n/6}$ (yielding a $2^{\Omega(n)}$ classical query lower bound for bounded success probability). This exponential separation relies critically on graph symmetry, oracle access, and task definition; on general unstructured graphs, interference does not automatically cancel all backtracking paths.

:::

**From a whole Laurent loop to ordered factors.** A further layer of QSP decomposition works directly with matrix coefficients: J. Haah, *Product Decomposition of Periodic Functions in Quantum Signal Processing*, Quantum **3**, 190 (2019), [doi:10.22331/q-2019-10-07-190](https://doi.org/10.22331/q-2019-10-07-190), [arXiv:1806.10236v4, Definition 1 and Theorem 2](https://arxiv.org/html/1806.10236v4#Thmlemma1). The algebraic theorem below is formalized in Lean; completion and implementation retain their separate hypotheses.

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

The underlying permutation-contraction correspondence is classical. Gessel, *Generalized Rook Polynomials and Orthogonal Polynomials* (1989, 159–176, [doi:10.1007/978-1-4684-0637-5_13](https://doi.org/10.1007/978-1-4684-0637-5_13), [author's original](https://people.brandeis.edu/~gessel/homepage/papers/rookp.pdf)), defines compatible conditions by distinct rows and columns in Section 2, defines $T_n^A$ as the actual intersection of satisfying sets in Section 3, page 5, and gives the permutation-contraction bijection in Section 8, page 11. The cycle count changes by the number of directed cycles among the prescribed edges.

A closer source for the endpoints, counts, and probabilities below is Boaz Tsaban, *Permutation graphs, fast forward permutations, and sampling the cycle structure of a permutation*, *Journal of Algorithms* **47** (2003), 104–121, [doi:10.1016/S0196-6774(03)00017-8](https://doi.org/10.1016/S0196-6774(03)00017-8). On pages 107–109, Lemma 1.1 obtains path components with unique minimal and maximal endpoints from an acyclic partial permutation graph; Lemma 1.2 connects these endpoints to exhaust all single-cycle completions and gives their factorial count; Lemma 1.3 distinguishes closing a component from merging distinct components; and Definition 1.4 and Lemma 1.5 give uniform endpoint choices and query-sequence probabilities for forward and inverse permutation queries. These endpoint, counting, and probability laws already appear in the literature; they do not originate in this book.

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

Frieze–Suen, *Counting the Number of Hamilton Cycles in Random Digraphs* ([doi:10.1002/rsa.3240030303](https://doi.org/10.1002/rsa.3240030303), [original, pages 4–5](https://www.math.cmu.edu/~af1p/Texfiles/hamsuen.pdf)), also contract directed paths to identify uniquely all Hamilton cycles containing the prescribed edges, obtaining the count $(n-t-1)!$. Their prescribed $t$ edges belong to an already given Hamilton cycle. Here extension existence is first proved for arbitrary raw $E$ satisfying the hypotheses, and $c=N-|E|$ then gives the same count; existence must not be assumed in advance.

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

The direct source entry for this unbounded inventory count is [`compatible_cycle_card`](lean:D5/S3/Combinatorics/Graph/LinearForests/CompatibleCycleInventory.compatible_cycle_card). The positive-crossing branch has classical BEST provenance: Paidi Creed and Mary Cryan, *The number of Euler tours of random directed graphs*, *Electronic Journal of Combinatorics* **20**(3) (2013), P13, [doi:10.37236/2377](https://doi.org/10.37236/2377), Theorem 1, pages 2–3 ([original](https://www.combinatorics.org/ojs/index.php/eljc/article/download/v20i3p13/pdf)). Pages 1–2 identify Euler tours modulo cyclic rotation only; the discussion and footnote following the theorem allow loops and parallel arcs. For $m>0$, the auxiliary two-state graph is strongly connected. There are $m$ spanning in-trees into either root, and outdegrees $m+p,m+q$, so BEST gives the same positive-inventory formula. The formal proof here uses actual deletion, insertion, and first returns rather than a general BEST theorem as a black box. Ordinary forest contraction retains the Tsaban and Gessel provenance given above. The empty carrier, disconnected zero-crossing inventories, endpoint balance, and complete raw-forest synthesis are not attributed verbatim to those sources, and no literature novelty is claimed.

Both feasible and impossible cases can be checked by hand. For $E=\varnothing,n=2$, the four isolated vertices give $a=b=2,p=q=0$, and count $2$: $(r_1\ b_1\ r_2\ b_2)$ and $(r_1\ b_2\ r_2\ b_1)$. A single path $r_1\to b_1$ spanning all vertices has $m=q=0,p=1$; the component identity cycle gives its unique closure. The two oppositely directed paths at the start of this subsection have $m=0,p=q=1$, giving count zero. Thus the theorem assumes neither a completion, a positive count, a supplied path decomposition, nor strong connectivity.

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

The two permutation representations of a simple full cycle have a classical antecedent: Greenhill, Janson, Kim and Wormald, *Permutation pseudographs and contiguity*, [doi:10.1017/S0963548301005065](https://doi.org/10.1017/S0963548301005065), p. 3, gives permutation multiplicities for two-regular pseudographs. Here the objects are ordinary simple full cycles on at least three vertices. On two vertices the inverse permutations coincide, and a disconnected union of cycles is not the shadow of one full-cycle permutation. That reference supplies the classical multiplicity provenance, rather than every strengthened correspondence and insertion clause above. No undirected probability law, alternating count, random-name or port law, adaptive-query bound or `EXIT` bound follows here.

**Which bridges to a classical oracle lower bound remain?** [@thm-directed-forest-cycle-completion] gives the ordinary directed model's static uniform law, and [@thm-alternating-forest-classification] classifies and counts all actual completions of the alternating model. Three distinctions separate them from the glued-trees result in [@rem-qsvt-walks-literature]:

1. **Graph distribution and orientation.** Ben-David et al. (*SIAM Journal on Computing* **53**(6), 2024, [doi:10.1137/23M1573975](https://doi.org/10.1137/23M1573975), §6.3.2, Lemmas 6.11–6.13, PDF pages 37–39) use one uniform cycle on each side's leaves for the self-weld, and a uniform alternating cycle between the two sides for the weld. [@thm-alternating-forest-classification] now supplies the directed alternating static classification and cardinality; it states neither an alternating conditional probability mass nor an explicit event-probability ratio. For ordinary undirected full cycles, [@thm-undirected-cycle-orientation-fibers] now identifies orientations and representation multiplicities over the same actual completed graph: each fiber is exactly a pair of reversed lifts, with edge-insertion events preserved. This static correspondence supplies neither an undirected probability law nor an alternating extension. An alternating conditional completion law still needs its own probability interface; the ordinary model's $1/(c-1)$ cannot simply be transferred.
2. **Conditioning information.** The ordinary directed theorem conditions only on all edges of fixed $E$ being present; the alternating theorem itself states only classification and counting. An adaptive algorithm's full query history also involves random names, query choices, answers listing all neighbors, and possibly color information. One must prove, on the same random graph realization, that these history conditions leave precisely the asserted uniform completion set, or establish the appropriate different conditional law. Replacing a history by $E$ does not establish this. The cited Ben-David et al. lemmas permit only queries to names already in the knowledge graph; queries outside it require a separate argument. Whether sparse random names provide additional information is also beyond this theorem.
3. **Queries, embeddings, and success events.** In [quant-ph/0209131v2, Section IV](https://arxiv.org/abs/quant-ph/0209131v2), Childs et al. first handle guessed new names, colors, and games restricted to known names, then pass to random tree embeddings and bound collision and `EXIT` events to obtain the original Theorem 9. Ben-David et al.'s footnote 14 explicitly notes that queries returning all neighbors give an embedding tree with $O(t)$ vertices, not literally $t$. Their printed component lower bound $2^k-2t$, pair bound $2/(2^k-2t)$, and equation (6.4), $O(t^2/(2^k-t))$, are retained as separately stated in the source; no unproved explicit constant or parameter range is assembled from them here.

The ordinary contraction law supplies static counting and conditioning; the alternating theorem adds classification and counting on the actual static carrier. The written proof in [@thm-undirected-cycle-orientation-fibers] adds orientation fibers, the reversal quotient and edge insertion over the same ordinary undirected full cycle. Undirected probability laws, alternating conditional laws and their undirected extension, names, ports and history conditioning, query complexity, and the full classical `EXIT` lower bound still require their own models and proofs. The broader scope of [request #11](https://github.com/the-omega-institute/trureturing-requests/issues/11) remains unfinished. The next section turns to the quantum side, studying a specified weighted path and its endpoint probability.
