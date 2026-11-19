# 35.6.1 The Zeckendorf Forbidden-Adjacency Language: Starting from $K=2$ Carry-Free Coding {#sec-ch39-p2e-zeckendorf}

Everything begins with the lowest-level local rule against carry saturation. At order $K = 2$, the binary Zeckendorf automaton operates on the list carrier `List (Fin 2)`: the frozen theorem [`base_success_iff_noAdjacentOnes`](lean:D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes) established in §38.2 (Conjunct 3 of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]) proves that the automaton accepts a list of binary digits if and only if it contains no two adjacent `1`s (`NoAdjacentOnes`). Generalizing the local forbidden run from $2$ to an arbitrary order $K \ge 2$, `trureturing` defines `DBonacciName K Q` on the fixed-length function carrier `Fin Q → Bool` as the type of length-$Q$ Boolean words with no $K$ consecutive `true` entries (passing between `List (Fin 2)` and fixed-length Boolean functions requires an explicit carrier conversion).

The counting theorem [`dbonacci_name_card`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card) establishes the exact cardinality normalization for every order $d \ge 2$ and word length $Q \in \mathbb{N}$:

$$
\bigl|\operatorname{DBonacciName}(K, Q)\bigr| = \operatorname{dbonacci}(K, Q + 2),
$$

governed by the $K$-step recurrence $C_K(n + K) = \sum_{i=0}^{K-1} C_K(n + i)$. Below the forbidden threshold ($Q < K$), the short-prefix theorem [`dbonacci_name_card_of_lt`](lean:D5/S0/Tower/DBonacci/Names.dbonacci_name_card_of_lt) proves that no pruning yet occurs, so the admissible count equals the full binary power $2^Q$; once $Q \ge K$, every saturated $1^K$ branch is cleanly pruned away. At $K = 2$, the counts for $Q = 0, 1, 2, 3, 4, 5$ are the Fibonacci numbers $F_{Q+2} = 1, 2, 3, 5, 8, 13$; at $K = 3$ (no `111`), the counts for $Q = 0, 1, 2, 3, 4$ are $1, 2, 4, 7, 13$. Along the finite name grid at depth $Q$, there are $\min(K, Q)$ distinct adjacent gap lengths—stabilizing at all $K$ distinct gap scales only once $Q \ge K$.

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="zeckendorf" height="500"}
**Zeckendorf Forbidden-Adjacency Card (`zeckendorf`)**: Displays the binary word tree of increasing depth at order $K = 2$. Cyan nodes and edges trace admissible words free of adjacent `11`, magenta crosses mark forbidden branches pruned upon hitting `11`, and amber highlights the selected word-length layer $Q$ alongside its Fibonacci count $F_{Q+2}$. Automaton equivalence (Conjunct 3 of [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]) and exact word counts carry status `LEAN ✓`.
:::

As the observer widens the forbidden window from $K = 2$ to general $K \ge 2$, the asymptotic growth rate of admissible words comes under the control of a single family of characteristic polynomials.
