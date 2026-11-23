# Common counts of weighted multinomial vectors

Let $J$ be finite and $w_j\ge 0$. Write $W=\sum_j w_j$. For a nonnegative count vector $m$, let $|m|=\sum_jm_j$ and $c_m=\binom{|m|}{m}\prod_jw_j^{m_j}$. Put $D_k=\sum_{|l|=k}c_l^2$. Two vectors of degree $p$ have $H(m,n)=\sum_j\min(m_j,n_j)$ occurrences in common.

::: {.theorem #thm-ch31-weighted-overlap-diagonal title="Large common counts are bounded by a lower-degree diagonal" lean="D5/S3/Fourier/Concentration/FiniteMultinomialOverlap.weighted_overlap_le_diagonal"}
For $0\le k\le p$,
$$
\sum_{\substack{|m|=|n|=p\\ H(m,n)\ge k}} c_mc_n
  \le \binom{p}{k}^{2} W^{2(p-k)}D_k .
$$
The sum counts ordered pairs.
:::

::: proof
If $H(m,n)\ge k$, there is a subvector $l$ of degree $k$ with $l_j\le\min(m_j,n_j)$ for every $j$. The pair is then counted at least once if we count all ways to select the $l_j$ occurrences from each vector. For a fixed $l$, this multiplies $c_m$ by $\prod_j\binom{m_j}{l_j}$. Writing $m=l+u$ gives $\binom{p}{k}c_lc_u$; the factorials cancel coordinate by coordinate. The sum over $u$ of degree $p-k$ is $W^{p-k}$. Sum independently for the two vectors and then sum over $l$ to obtain the bound. The full proof is checked by the Lean kernel.
:::

At $k=0$ the bound equals the total weight of all pairs. At $k=p$ the overlap condition forces $m=n$, and the bound is the degree-$p$ diagonal itself.

::: {.theorem #thm-ch31-overlap-euclidean-scale title="Unmatched counts give a lower bound on the Euclidean scale" lean="D5/S3/Fourier/Concentration/FiniteMultinomialOverlap.weighted_count_difference_sq_ge"}
For two count vectors of degree $p$ and radii $r_j\ge\rho\ge0$, set $S=\sum_j((m_j-n_j)r_j)^2$. Then
$$
S\ge 2\rho^2(p-H(m,n)).
$$
:::

::: proof
The absolute count differences sum to $2(p-H(m,n))$. Each integer difference has square at least its absolute value. Multiply this bound by the square of the common lower radius and sum. The full proof is checked by the Lean kernel.
:::

For independently perturbed comparison frequencies, the scale bound is effective on pairs with few common occurrences. The lower-degree diagonal controls the remaining pair weight. The arithmetic upper bound for weighted near-collisions of the fixed ζ ordinates at positive resolution remains open.
