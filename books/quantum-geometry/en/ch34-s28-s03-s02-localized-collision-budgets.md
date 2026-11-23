# Pairwise bounds for a common spectral perturbation

Consider countable frequency indices $J$ and tests $K$. Each frequency $g_j$ has a radius $r_j>0$. Test $k$ uses a finite support, nonnegative weights, a natural degree $p_k$, a closed resolution $\eta_k\ge 0$ and a positive excess budget $b_k$. Write $G_m=\sum_j m_jg_j$ and $c_m=\binom{p_k}{m}\prod_jw_j^{m_j}$ for its degree vectors. Write $E_k(h)$ for the weighted collision mass of a spectrum $h$ at this resolution, and $D_k=\sum_m c_m^2$ for the diagonal.

For distinct degree vectors $m,n$ on the support of test $k$, set $a_j=m_j-n_j$ and
$$
A=\sum_j|a_j|r_j,\qquad M=\max_j|a_j|r_j,\qquad S=\sum_j(a_jr_j)^2,\qquad C=e^{1/2}\sqrt{15\pi/2}.
$$
Let $q_k(m,n)=0$ if $|G_m-G_n|>\eta_k+A$. Otherwise let
$$
q_k(m,n)=\min\{1,\eta_k/M,C\eta_k/\sqrt S\}.
$$
Both denominators are positive for a distinct pair. Let $B_k=\sum_{m\ne n}c_mc_n q_k(m,n)$, with ordered pairs.

::: {.theorem #thm-ch31-localized-collision-budgets title="One spectrum satisfies the pairwise collision budgets" lean="D5/S3/Fourier/Concentration/LocalizedCollisionBudgets.exists_continuous_common_nearby_localized_bounds"}
If $\sum_k B_k/b_k\le1$, there exists a single spectrum $h$ such that $|h_j-g_j|\le r_j$ for every $j$, and
$$
\sum_k\frac{E_k(h)-D_k}{b_k}\le \sum_k\frac{B_k}{b_k},
\qquad E_k(h)\le D_k+b_k\quad(k\in K).
$$
:::

::: proof
Choose independent uniform offsets $x_j\in[-r_j,r_j]$ with one product law. For each pair the change in frequency difference is $\sum_j a_jx_j$, with absolute value at most $A$. Thus a pair whose initial distance exceeds $\eta_k+A$ has collision probability zero. The largest-coordinate interval bound and the Euclidean-scale affine bound both apply to the other pairs under the same finite marginal law. Their minimum, capped at one, bounds the probability.

Subtracting the diagonal leaves a finite sum of indicators with nonnegative weights. Its expectation is at most $B_k$. The expectation of the countable normalized sum is at most $\sum_k B_k/b_k$. Some assignment in the allowed intervals realizes a value at most this bound. Each individual normalized excess is bounded by that sum. The full proof is checked by the Lean kernel.
:::

For two ordinates at distance four, unit radii, and resolution one, the two distinct degree-one vectors have zero collision probability. At distance three the closed band can be reached at the endpoints, so the support test uses strict inequality. The construction controls the selected comparison spectrum. An upper bound for the weighted high-order collisions of the fixed ζ ordinates at positive resolution remains open.
