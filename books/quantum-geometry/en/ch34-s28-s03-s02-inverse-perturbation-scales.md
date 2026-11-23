# Bounding the sum of inverse perturbation scales

Assume $r_j\ge\rho>0$. For distinct degree-$p$ vectors put $S(m,n)=\sum_j((m_j-n_j)r_j)^2$. Let $I_p=\sum_{m\ne n}c_mc_n/\sqrt{S(m,n)}$ over ordered pairs of degree $p$, and write
$$
T=W^{2p},\qquad A_k=\binom pk^2 W^{2(p-k)}D_k,\qquad
L=\rho\sqrt{2(p-k+1)},\qquad U=\rho\sqrt2.
$$

::: {.theorem #thm-ch31-weighted-inverse-scale-budget title="A lower-degree diagonal bounds the sum of inverse scales" lean="D5/S3/Fourier/Concentration/OverlapPerturbationBudget.weighted_inverse_scale_le_of_overlap"}
For $0\le k\le p$,
$$
I_p\le \frac{T-D_p}{L}+
\bigl(\min(A_k,T)-D_p\bigr)\left(\frac1U-\frac1L\right).
$$
:::

::: proof
Distinct vectors of equal degree have $H(m,n)<p$, so $\sqrt S\ge U$. When $H(m,n)<k$, the stronger bound $\sqrt S\ge L$ holds. Assign $1/L$ to every distinct pair and add the difference $1/U-1/L$ for pairs with $H(m,n)\ge k$. The total weight is $T$, and the weight above the overlap threshold is at most $\min(A_k,T)$. Subtract the diagonal of mass $D_p$ in both terms, since every diagonal pair has $H(m,m)=p$.
:::

At $k=0$ every distinct pair receives the correction. At $k=p$ the two scales agree. Both endpoints give $(T-D_p)/U$. For finitely many independent uniform offsets and closed resolution $\eta\ge0$, the Euclidean interval bound controls the weighted probability budget by the right side multiplied by $e^{1/2}\sqrt{15\pi/2}\,\eta$. The localized budget can also use the base frequency gap to discard unreachable pairs. The fixed $\zeta$ ordinates still require an arithmetic estimate at positive resolution.
