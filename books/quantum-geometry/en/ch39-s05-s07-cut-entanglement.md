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

For equal-weight samples, this move is the three-site case of a sorting procedure for words of any length with no adjacent ones. Complement the bits at positions $2,4,6,\ldots$. On each neighboring pair, legality now says that an occupied odd site forces its even neighbor to be occupied. Thus intersecting and taking the union of two transformed supports preserves legality. Undoing the complement gives two legal words with the same combined site counts. On the pyramid base, `100` and `001` become `110` and `011`. Intersection and union give `010` and `111`, which decode to `000` and `101`.

Repeated exchanges can sort the transformed supports by inclusion. If a site occurs $c$ times after the complement, it lies in exactly the last $c$ supports of the sorted list. The original site counts and $m$ therefore determine the sorted multiset. Two samples with the same size and site counts can be joined through this common multiset by legal two-word exchanges. This applies to rational laws after writing both laws with a common denominator. [Connectivity at fixed occupancies](lean:D5/S1/Words/AdmissibleWords/UncrossingFiber.adm_phi_fiber_common_endpoint)

The same threshold construction works for real occupancy probabilities. Suppose $\mu_i\in[0,1]$ and $\mu_i+\mu_{i+1}\le1$. Draw one uniform $U$ on $(0,1)$. Occupy an odd-numbered site if $U<\mu_i$ and an even-numbered site if $U>1-\mu_i$. Adjacent sites have disjoint intervals, so every sampled word is legal. Each site is occupied with probability $\mu_i$, the length of its interval. Sites of the same parity have nested intervals and joint occupancy $\min(\mu_i,\mu_j)$. Sites of opposite parity have intersection length $\max(0,\mu_i+\mu_j-1)$. This one sampling rule attains all these pairwise extremes simultaneously. [Shared realization at real marginals](lean:D5/S1/Words/AdmissibleWords/FIBThresholdPairExtrema.threshold_pair_extrema)
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
