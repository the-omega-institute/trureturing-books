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
