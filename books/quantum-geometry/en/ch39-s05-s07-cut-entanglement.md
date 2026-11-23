# 35.6.7 Cross-Cut $1^K$ Prohibition and Attainable Schmidt Ranks of Direct Encoders {#sec-ch39-p2e-entanglement}

Partition a binary physical register of length $m_X + m_Y$ ($m_X, m_Y \ge 1$) across a cut into a left block $X$ of length $m_X$ and a right block $Y$ of length $m_Y$. Even when $x \in \{0, 1\}^{m_X}$ and $y \in \{0, 1\}^{m_Y}$ are individually $1^K$-free, their concatenation $xy$ can still assemble $K$ consecutive `1`s across the junction: writing $\tau(x)$ for the terminal run of `1`s in $x$ and $\iota(y)$ for the initial run of `1`s in $y$, the concatenated word $xy$ is admissible if and only if

$$
\tau(x) + \iota(y) < K.
$$

::: {.example #ex-ch39-fib-pyramid title="The three-site pyramid and joint endpoint occupancy"}
Take $K=2$ and consider three sites. When the middle site is empty, the four endpoint assignments `000`, `100`, `001`, and `101` form the corners of a square. An occupied middle site forces both endpoints to be empty and gives the apex `010`. A probability law on these words gives three mean occupancies $(\mu_1,\mu_2,\mu_3)$. Their possible values fill the convex hull of the five vertices, specified by nonnegativity and the two inequalities $\mu_1+\mu_2\le1$ and $\mu_2+\mu_3\le1$. [Three-site occupancy pyramid](lean:D5/S1/Words/AdmissibleWords/PathStableSetPolytope.convexHull_three_pyramid)

Write $q=\Pr(101)$. In word order `000`, `100`, `010`, `001`, `101`, the probabilities are $1-\mu_1-\mu_2-\mu_3+q$, $\mu_1-q$, $\mu_2$, $\mu_3-q$, and $q$. Requiring all five entries to be nonnegative gives

$$
\max(0,\mu_1+\mu_2+\mu_3-1)\le q\le\min(\mu_1,\mu_3).
$$

For example, keep the middle site empty and start with probability $1/4$ on each of the four base words. Switch to probability $1/2$ each on `000` and `101`. Each endpoint still has occupancy $1/2$, but the joint occupancy rises from $1/4$ to $1/2$. The switch adds $1/4$ to each diagonal entry and subtracts $1/4$ from each off-diagonal entry, preserving the row and column sums. The fixed-seed construction in [§39.3](ch39-s26-axiom-omega-quantum-mechanics-five-postulates.md) uses the same four-cell move. Even with all word probabilities in the computational basis specified, the relative phases between words can vary, as in [@ex-ch39-p2e-phase-counterexample]. [FIB atom source, §§2–4](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md#L178-L216)

Order the four cells as `00`, `01`, `10`, and `11`. For nonnegative integers $a,b,c,d,s$, change the counts from $(a,b+s,c+s,d)$ to $(a+s,b,c,d+s)$. Both tables have total $N=a+b+c+d+2s$ and left and right occupancy counts $c+d+s$ and $b+d+s$, respectively. The joint count changes from $d$ to $d+s$. For $N>0$, the joint occupancy probability increases by exactly $s/N$. Cross multiplication compares these ratios exactly. The four-sample example takes $(a,b,c,d,s)=(1,0,0,1,1)$. Both endpoint readings of $2/4$ equal $1/2$, which is also the projective reading $\kappa([1:1])=1^2/(1^2+1^2)$. The joint reading goes from $1/4$ to $2/4$. [§39.12](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)

For equal-weight samples, this move is the three-site case of a sorting procedure for words of any length with no adjacent ones. Complement the bits at positions $2,4,6,\ldots$. On each neighboring pair, legality now says that an occupied odd site forces its even neighbor to be occupied. Thus intersecting and taking the union of two transformed supports preserves legality. Undoing the complement gives two legal words with the same combined site counts. On the pyramid base, `100` and `001` become `110` and `011`. Intersection and union give `010` and `111`, which decode to `000` and `101`.

Repeated exchanges can sort the transformed supports by inclusion. If a site occurs $c$ times after the complement, it lies in exactly the last $c$ supports of the sorted list. The original site counts and $m$ therefore determine the sorted multiset. Two samples with the same size and site counts can be joined through this common multiset by legal two-word exchanges. This applies to rational laws after writing both laws with a common denominator. [Connectivity at fixed occupancies](lean:D5/S1/Words/AdmissibleWords/UncrossingFiber.adm_phi_fiber_common_endpoint)

The same threshold construction works for real occupancy probabilities. Suppose $\mu_i\in[0,1]$ and $\mu_i+\mu_{i+1}\le1$. Draw one uniform $U$ on $(0,1)$. Occupy an odd-numbered site if $U<\mu_i$ and an even-numbered site if $U>1-\mu_i$. Adjacent sites have disjoint intervals, so every sampled word is legal. Each site is occupied with probability $\mu_i$, the length of its interval. Sites of the same parity have nested intervals and joint occupancy $\min(\mu_i,\mu_j)$. Sites of opposite parity have intersection length $\max(0,\mu_i+\mu_j-1)$. This one sampling rule attains all these pairwise extremes simultaneously. [Shared realization at real marginals](lean:D5/S1/Words/AdmissibleWords/FIBThresholdPairExtrema.threshold_pair_extrema)
:::

::: {.example #ex-ch39-fib-deletion-coherence title="Coherence between the two alternating words"}
The same five allowed words also give a quantum example. Compare the pure state
$(|010\rangle+|101\rangle)/\sqrt2$ with the equal incoherent mixture of the same two basis states. The computational-basis law and every two-site reduced state agree. Tracing out any site kills the cross term because the two words differ at that site. Yet the mixture is a mixture of product states, while the pure state has Schmidt coefficients $(1/\sqrt2,1/\sqrt2)$ across every one-site cut. A joint measurement of $X\otimes X\otimes X$, with $X$ the bit flip, has expectation one on the pure state and zero on the mixture. [Auric FIB atom, §18.2–18.3](https://github.com/the-omega-institute/trureturing-source-theories/blob/2a39da5107abbfa3a72cc883486dbc15a15994a1/docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md#L4163-L4280)

For an open chain of length at least two with no adjacent occupied sites, the only matrix entries that can differ at fixed single-site deletion traces are those between the two alternating words. To see this, let $D$ be the difference of the two density matrices, extended by zero on forbidden words. If two words agree at site $i$, the zero deletion trace relates the entries of $D$ with their common bit set to zero or one by a change of sign. If either word occupies a neighbor $j$, the entry with the common bit set to one is already zero. If both leave $j$ empty, first set the common bit at $i$ to one and use the deletion equation at $j$. Both endpoints occupied is forbidden, so that entry also vanishes. Thus any surviving pair differs at every site. Since both complementary words are legal, each edge must change the bit, leaving just the alternating pair. Conversely their cross terms vanish in every one-site deletion trace. In a Hermitian matrix difference the two entries are complex conjugates. [Exact deletion kernel on a finite graph](lean:D5/S3/Quantum/Entanglement/Marginals/IndependentWordMarginals.deletion_kernel_iff)
:::

::: {.example #ex-ch39-fib-forbidden-window-coherence title="Coherence with forbidden windows"}
For the ban on $K$ consecutive ones, take a chain of length $n\ge K$. An entry between two words can differ between density matrices with the same one-site deletion traces exactly when every window of $K$ sites contains a position of type $(0,1)$ and a position of type $(1,0)$ in the ordered word pair. To see this, fix all differing bits and let each common bit vary. The two entries in a deletion sum are opposites, so a nonzero entry forces every simultaneous assignment of the common bits to stay in the legal support. Setting all common bits to one checks all assignments at once. Each forbidden window must still contain a zero in each word. [Exact support criterion for binary deletion](lean:D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionSupport.survives_iff)

Every surviving pattern gives a matrix with entries of opposite sign when a common bit is flipped. The differing positions contain both orientations, so the ordered pattern and its transpose have disjoint supports. Adding the adjoint produces a nonzero Hermitian matrix with zero deletion traces and zero trace. On the legal subspace add and subtract a sufficiently small multiple of this matrix from the normalized identity. The two resulting density matrices realize the difference. For $K=3$, the pairs $(010,100)$ and $(011,101)$ share one pattern. Their entries cancel when the common last bit is deleted, and deleting either of the differing bits gives zero in each summand.
:::

::: {.theorem #thm-ch39-fib-forbidden-triple-dimension lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionDimension.noTriple_finrank" title="Dimension of the deletion kernel with a ban on triples"}
On an open chain of length $n\ge3$, allow only words with no three consecutive ones. Let $d_n$ be the complex dimension of the space of matrices supported on allowed words in both indices and with zero partial trace over each individual site. Then
$$
d_3=12,\quad d_4=24,\quad d_5=44,\qquad d_n=d_{n-1}+d_{n-2}+d_{n-3}\quad(n\ge6).
$$
:::

::: {.proof}
At each site, record whether the two bits agree, go from zero to one, or go from one to zero. Each allowed pattern has one complex coefficient, read at the word pair where every common bit is zero. Flipping a common bit multiplies the coefficient by $-1$. Distinct patterns have disjoint entry sets, so their coefficients can vary independently. [Dimension formula for any finite allowed word family](lean:D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionDimension.supportedKernel_finrank)

For the ban on triples, every three consecutive symbols must contain both orientations. Let $A,B,C,D$ count patterns whose last two symbols are the same orientation, opposite orientations, an orientation followed by agreement, or agreement followed by an orientation, respectively. Appending one symbol sends these counts to $(B,A+B+D,B,C)$. At length two each count is two, and the pair of agreement symbols has no legal extension. At lengths three, four, and five the totals are $12,24,44$. Apply the update four times to see that the fourth vector is the sum of the first three updated vectors. Summing its coordinates gives the recurrence. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch39-fib-forbidden-window-growth lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionGrowth.kernelDimension_lower" title="Growth of the deletion kernel for windows of length four or more"}
On an open chain of length $n=k+2$, forbid $K\ge4$ consecutive ones. Let $d_{n,K}$ be the complex dimension of the supported matrices with zero partial trace over each site. Then

$$
d_{n,K}\ge (100/43)^k.
$$
:::

::: {.proof}
Start with two opposite orientations. Append symbols so that the last four sites still contain both orientations. Record how far back each orientation last appeared, with the more recent one first. The six possible age pairs are $(0,1),(0,2),(0,3),(1,2),(1,3),(2,3)$, with weights $100,75,43,58,32,18$. Each step appends agreement or one of the two orientations. If an orientation's age would reach four, that orientation must be appended. For each state, the weights of its allowed successors sum to at least $100/43$ times its own weight.

The initial weight and maximum single weight are both $100$. After appending $k$ symbols the total weight of all paths is at least $100(100/43)^k$, so there are at least $(100/43)^k$ distinct patterns. Every window of length $K\ge4$ contains a four-site window, so all these patterns contribute to $d_{n,K}$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch39-fib-forbidden-window-growth-relative lean="D5/S3/Quantum/Entanglement/Marginals/BinaryDeletionGrowth.kernelDimension_to_allowedCount" title="Growth relative to the allowed word count"}
On the same chain, write $a_{n,K}$ for the number of allowed words, which is the dimension of the allowed Hilbert space. Then

$$
\frac{d_{n,K}}{a_{n,K}}\ge\frac{(50/43)^k}{4}.
$$
:::

::: {.proof}
There are at most $2^{k+2}$ allowed words, including the all-zero word. Divide the previous lower bound by this upper bound on the positive denominator. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch39-fib-oriented-difference lean="D5/S1/Words/AdmissibleWords/FIBPathPairBounds.sharp_hard_core_difference" title="The sharp endpoint difference from a fixed site"}
Number sites from zero and let $X_k$ indicate occupancy in a word with no adjacent ones. Put $Y_k=X_k$ at even sites and $Y_k=1-X_k$ at odd sites, and write $q_k=\Pr(Y_k=1)$. Prescribe site occupancies in $[0,1]$ with adjacent sums at most one. For any fixed site $i$, the sharp bound at each $j\ge i$ is

$$
\Pr(Y_i=1,\ Y_j=0)\ \le\
\min\!\left(q_i,\ 1-q_j,\ \sum_{k=i}^{j-1}(q_k-q_{k+1})_+\right).
$$

One law on legal words attains all these bounds from $i$ at once. [Finite-word construction](lean:D5/S1/Words/AdmissibleWords/FIBPathPairBounds.word_attainment)
:::

::: {.proof}
Represent any law on the finite set of legal words by partitioning $[0,1)$ into intervals of the corresponding word probabilities. Let $A_k$ be the event $Y_k=1$. Each neighboring pair of events is nested because neighboring occupied sites are disjoint. Hence $\Pr(A_k\setminus A_{k+1})=(q_k-q_{k+1})_+$. Every sample in $A_i\setminus A_j$ exits the events somewhere between $i$ and $j$. The union bound gives the sum in the displayed formula, and the two endpoint probabilities give the other bounds.

For attainment, divide the unit interval at $q_i$. At site $j$, take initial intervals in the two parts with lengths $u_j$ and $q_j-u_j$. For $j\ge i$, set $u_j=\max(0,q_i+q_j-1,q_i-\sum_{k=i}^{j-1}(q_k-q_{k+1})_+)$. Before $i$, use $u_j=\min(q_i,q_j)$. Both lengths increase when $q_j$ increases and decrease when it decreases, in the weak sense. Thus the resulting $A_j$ nest in the required direction at every adjacent pair. At site $i$ the first interval has length $q_i$ and the second is empty, so $\Pr(A_i\setminus A_j)=q_i-u_j$.
:::

The fixed starting site matters. With five sites of occupancies $(1/2,0,1/2,0,1/2)$, taking equality for all three pairs of even sites would make three half-mass events pairwise disjoint up to null sets, exceeding the available unit mass.

Close the hard-core chain into a four-cycle and call the two sides $s,t$ and $x,y$. Give $s,t,y$ occupancy $1/2$ and $x$ occupancy zero. Along $s,x,t$, the site $x$ is empty with probability one, so this path alone permits one endpoint to be occupied while the other is empty. Along $s,y,t$, both endpoint occupancy events lie inside the event that $y$ is empty. All three events have probability $1/2$, so they can differ only on a null set. The probability of $s$ occupied and $t$ empty is therefore zero.

::: {.theorem #thm-ch39-fib-graph-oriented-difference lean="D5/S1/Words/AdmissibleWords/NestedEventGraphBounds.sharp_difference" title="A sharp bound on event differences on a graph"}
Fix a vertex $s$ that can reach every vertex of a simple graph. Let $A_v$ be measurable events in the half-open unit interval with prescribed probabilities $q_v\in[0,1]$. Require the two events on each edge to be comparable by inclusion. Let $d(s,v)$ be the infimum over walks from $s$ to $v$ of the sum of decreases $(q_u-q_w)_+$ over the steps. Then

$$
\Pr(A_s\setminus A_v)\le \min(q_s,1-q_v,d(s,v)).
$$

One event family attains every bound simultaneously. In this family the event of smaller probability on an edge is contained in the event of larger probability. Events with equal probabilities on an edge coincide.
:::

::: {.proof}
Along any finite walk, every sample in $A_s\setminus A_v$ must leave the current event at least once. Adjacent events are comparable by inclusion, so the probability of leaving at a step is precisely the decrease in probability. Taking the infimum over walks gives the third term. The first two come from the endpoint probabilities.

For attainment, split the unit interval at $q_s$. Use an initial interval in each piece, with lengths $u_v$ and $q_v-u_v$, where $u_v=\max(0,q_s+q_v-1,q_s-d(s,v))$. For neighbors $a,b$ with $q_a\le q_b$, the step from $a$ to $b$ costs zero and the reverse step costs $q_b-q_a$. Both interval lengths are therefore nondecreasing from $a$ to $b$. The source event is exactly the first piece, so its mass outside $A_v$ is $q_s-u_v$. The full proof is checked by the Lean kernel.
:::

For a hard-core model on a bipartite graph, complement the occupancy events on one side. Disjoint neighbors then become nested neighbors. Complementing $x,y$ in the four-cycle gives probability profiles $(1/2,1,1/2)$ and $(1/2,1/2,1/2)$ along the two walks from $s$ to $t$. Their total decreases are $1/2$ and zero. The second walk forces the endpoint difference to have probability zero.

With two sources, the individual upper bounds can be coupled. The following five-vertex graph gives the full joint range of two event differences.

::: {.theorem #thm-ch39-fib-two-source-capacity lean="D5/S1/Words/AdmissibleWords/FIBTwoSourceObstruction.five_vertex_range" title="The joint range of two event differences"}
Let $q,c,a,b$ be real. There exist five measurable events $S,H,K,T,W$ in the half-open unit interval with probabilities $q,q+c,q+c,q,q$, inclusions $S,W\subseteq H\cap K$ and $T\subseteq K$, and differences $\Pr(W\setminus S)=a$ and $\Pr(T\setminus H)=b$ if and only if
$$
0\le a\le q,\qquad 0\le b\le\min(q,1-q-c),\qquad a+b\le c.
$$
:::

::: {.proof}
The difference $W\setminus S$ lies inside $H$. The difference $T\setminus H$ lies outside $H$. Both lie in $K\setminus S$, so their total mass is at most $c$. The first difference is also bounded by the mass of $W$, and the second by both the mass of $T$ and the mass outside $H$.

The inequalities also give $q,c\ge0$ and $q+c\le1$. To attain $(a,b)$, take $S=[0,q)$ and $K=[0,q+c)$. Reserve the last interval of length $b$ in $K$ for $T\setminus H$, and use an interval of the same length just to the right of $K$ to complete $H$. The rest of $T$ is the initial interval of length $q-b$ in $S$. For $W$, take the initial interval of length $q-a$ in $S$ and the interval of length $a$ immediately after $S$. The inequality $a+b\le c$ puts the latter interval inside both $H$ and $K$. The full proof is checked by the Lean kernel.
:::

With $q=1/2$ and $c=1/6$, the entire feasible region is the first-quadrant triangle $a+b\le1/6$. Each coordinate can attain $1/6$ on its own. Complement the events at $H,K$ to obtain the hard-core occupancy model on the bipartite graph. Three sites have occupancy $1/2$ and two have occupancy $1/3$. The endpoint occupancies sum to $5/6$ on each edge, and the two sources still draw on the same probability budget.

Cycles give another family of joint constraints on a graph. Add a reference bit $O$ fixed at zero and write $d_{uv}$ for the probability that two sites disagree. Then $d_{Ov}$ equals the marginal at $v$. Mark an odd number of edges on a closed walk and replace $d_{uv}$ by $1-d_{uv}$ on those edges. The resulting sum is at least one. Every binary outcome violates at least one of the parity requirements along the walk, so every common law satisfies this inequality.

::: {.theorem #thm-ch39-fib-cycle-completion lean="D5/S1/Words/AdmissibleWords/FIBCycleRelaxation.cycle_completion_iff" title="The exact range allowed by cycle inequalities"}
Let $q,c\ge0$ and $q+c\le1$. In the five-vertex notation, prescribe distances $q$ from the reference to $S,T,W$ and $q+c$ to $H,K$. Give the five inclusion edges distance $c$, and prescribe $d_{WS}=2a$ and $d_{TH}=c+2b$. These readings can be completed to a symmetric distance table satisfying every odd-subset cycle inequality exactly when

$$
0\le a\le\min(q,c),\qquad
0\le b\le\min(q,c,1-q-c).
$$
:::

::: {.proof}
On $O\to W\to S\to O$, marking only the last edge or only the middle edge gives $a\ge0$ or $a\le q$, respectively. Marking only the return edge of $W\to H\to S\to W$ gives $a\le c$. The same choices on $O\to T\to H\to O$ give $b\ge0$ and $b\le q$, and marking all three edges gives $b\le1-q-c$. Marking just the return edge of $T\to K\to S\to H\to T$ gives $b\le c$.

For sufficiency, set $d_{HK}=2b$ and $d_{ST}=d_{WT}=\max(a,2b)$. The resulting distances satisfy the triangle inequalities and each triangle has perimeter at most two. Use two copies of every vertex, with distance $d_{uv}$ within a copy and $1-d_{uv}$ across copies. The triangle and perimeter bounds give the triangle inequalities on the two copies together. Switching copies at the marked edges brings the walk to the other copy of its starting vertex. The copies are at distance one, so every such walk costs at least one. The full proof is checked by the Lean kernel.
:::

For $q=1/2,c=1/6$, the cycle checks admit the entire square $[0,1/6]^2$. The exact region of common laws also requires $a+b\le1/6$. In distance coordinates, this additional condition comes from adding the pentagonal cut inequality to the triangle inequality $d_{HT}\le d_{HK}+d_{KT}$ and eliminating the unspecified $d_{HK}$. [Avis, Imai and Ito, Definition 6 and Theorem 4](https://arxiv.org/abs/math/0601375)

The same shared capacity applies when the five marginal probabilities differ. Each event difference has its own interval, and their sum is still limited by the mass of $K$ outside $S$.

::: {.theorem #thm-ch39-fib-unequal-joint-range lean="D5/S1/Words/AdmissibleWords/FIBUnequalMarginals.joint_range" title="The exact joint range at five prescribed marginals"}
Require measurable events $S,H,K,T,W$ in the half-open unit interval to have probabilities $s,h,k,t,w$, with $S,W\subseteq H\cap K$ and $T\subseteq K$. Prescribe $a=\Pr(W\setminus S)$ and $b=\Pr(T\setminus H)$. Such events exist if and only if

$$
\begin{aligned}
&k\le1,\qquad t\le k,\\
&\max(0,w-s)\le a\le\min(w,h-s),\\
&\max(0,t-h)\le b\le\min(t,1-h),\qquad a+b\le k-s.
\end{aligned}
$$
:::

::: {.proof}
The difference $W\setminus S$ lies in both $W$ and $H\setminus S$, while $T\setminus H$ lies in both $T$ and the complement of $H$. The lower bounds come from the maximum mass that can remain inside $S$ or $H$. The differences are disjoint subsets of $K\setminus S$, so their total probability is at most $k-s$.

For attainment, take $K=[0,k)$ and put $H\cap K$ in an initial interval of length $r=\max(s+a,t-b,h+k-1)$. The assumptions give $r\le h$ and $r\le k-b$, and leave room after $K$ for the remaining mass $h-r$ of $H$. Fit $S,W$ into the initial interval with overlap of length $w-a$. Put mass $t-b$ of $T$ inside the initial interval and the remaining length $b$ immediately after it. The full proof is checked by the Lean kernel.
:::

In the `trureturing` direct-encoder model, fix integers $N \ge 2$ and $K \ge 2$, and partition $\{0, 1, \dots, N\}$ by primality into the nonprime logical page ($b = \mathrm{false}$, dimension $M_0 > 0$) and the prime logical page ($b = \mathrm{true}$, dimension $M_1 > 0$). Let $C_{m, b}$ denote the set of length-$m$ admissible $1^K$-free words with first bit $b$, of cardinality $c_{m, b} = |C_{m, b}|$; for each threshold $0 \le s < K$, define the cumulative low-tail left row count and compatible right neighborhood count on page $1$ by

$$
a_s = \#\bigl\{x \in C_{m_X, 1} : \tau(x) < s\bigr\},\qquad n_s = \#\bigl\{y \in C_{m_Y, 1} : \iota(y) < K - s\bigr\},
$$

and set the combinatorial page-rank caps

$$
R_0 = \min\bigl(c_{m_X, 0},\; \lfloor c_{m_Y, 0} / M_0 \rfloor\bigr),\qquad R_1 = \min\Bigl(c_{m_X, 1},\; \min_{0 \le s < K}\bigl(a_s + \lfloor n_s / M_1 \rfloor\bigr)\Bigr).
$$

An isometric encoding matrix $J : \mathbb{C}^{\mathrm{Logical}(N)} \to \mathbb{C}^{\{0,1\}^{m_X} \times \{0,1\}^{m_Y}}$ paired with left-register page density states $\sigma_0, \sigma_1$ satisfies `directContract` if: (i) $J^* J = I$; (ii) physical first-bit page projectors on both $X$ and $Y$ intertwine the logical page projectors $\Pi_b$, with $\sigma_b$ supported in $C_{m_X, b}$; (iii) for **every** logical operator $A$, $\operatorname{Tr}_Y(J A J^*) = \sum_{b \in \{0,1\}} \operatorname{Tr}(\Pi_b A)\,\sigma_b$; and (iv) every concatenated pair $(x, y)$ violating the $1^K$-free law has zero encoded amplitude $(J\psi)(x, y) = 0$ for every logical input $\psi$. Under this contract, the attainable Schmidt ranks and von Neumann entropies are characterized completely:

- [35.6.7.1 Direct-encoder ranks and entanglement entropy](ch39-s05-s07-s01-rank-and-entropy.md)
- [35.6.7.2 Local parent Hamiltonians and heat-bath chains](ch39-s05-s07-s02-parent-and-heatbath.md)
- [35.6.7.3 A uniform gap at fixed forbidden-word length](ch39-s05-s07-s03-uniform-gap.md)
