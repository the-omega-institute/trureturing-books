# Bounding the sum of inverse perturbation scales

Assume $r_j\ge\rho>0$. For distinct degree-$p$ vectors put $S(m,n)=\sum_j((m_j-n_j)r_j)^2$. Let $I_p$ be the sum of $c_mc_n/\sqrt{S(m,n)}$ over these ordered pairs. Define
$$
T=W^{2p},\qquad A_i=\binom pi^2W^{2(p-i)}D_i,\qquad
B_h=\min_{0\le i\le h}\min(A_i,T)-D_p.
$$
For $0\le h<p$, put $Q_h=1/(\rho\sqrt{2(p-h)})$. At $p=0$ take $Q_0=0$.

::: {.theorem #thm-ch31-weighted-inverse-scale-budget title="Lower-degree diagonals bound the sum of inverse scales" lean="D5/S3/Fourier/Concentration/OverlapPerturbationBudget.weighted_inverse_scale_le_of_overlap"}
$$
I_p\le (T-D_p)Q_0+\sum_{0\le h<p-1}B_{h+1}(Q_{h+1}-Q_h).
$$
The correction sum is empty for $p\le1$.
:::

::: proof
Write $H=\sum_j\min(m_j,n_j)$ for the common count. A distinct pair has $H<p$, and its reciprocal scale is at most $Q_H$. Split this charge into $Q_0$ and its nonnegative increments through $H$. The increment from $h$ to $h+1$ applies precisely when $H\ge h+1$. Each tail bound for a threshold $i\le h+1$ applies to these pairs. Taking their minimum and subtracting the diagonal gives $B_{h+1}$.
:::

For finitely many independent uniform offsets and closed resolution $\eta\ge0$, the Euclidean interval bound controls the weighted probability budget by the right side multiplied by $e^{1/2}\sqrt{15\pi/2}\,\eta$. The localized budget can also use the base frequency gap to discard unreachable pairs. The fixed $\zeta$ ordinates still require an arithmetic estimate at positive resolution.
