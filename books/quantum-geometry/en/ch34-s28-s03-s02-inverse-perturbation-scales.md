# Bounding the sum of inverse perturbation scales

For finite $J$, let $w_j\ge0$ and $r_j\ge\rho>0$. Write $W=\sum_jw_j$ and $c_m=\binom{p}{m}\prod_jw_j^{m_j}$ for a vector of degree $p$. As usual $D_k$ is the sum of squared weighted coefficients at degree $k$. For distinct vectors of degree $p$ set $S(m,n)=\sum_j((m_j-n_j)r_j)^2$.

::: {.theorem #thm-ch31-weighted-inverse-scale-budget title="A lower-degree diagonal bounds the sum of inverse scales" lean="D5/S3/Fourier/Concentration/OverlapPerturbationBudget.weighted_inverse_scale_le_of_overlap"}
For $0\le k\le p$,
$$
\sum_{\substack{|m|=|n|=p\\m\ne n}}\frac{c_mc_n}{\sqrt{S(m,n)}}
\le
\frac{W^{2p}}{\rho\sqrt{2(p-k+1)}}+
\frac{\binom pk^2 W^{2(p-k)}D_k}{\rho\sqrt{2}} .
$$
The sum is over ordered pairs.
:::

::: proof
Let $H(m,n)=\sum_j\min(m_j,n_j)$. Distinct vectors of equal degree have $H<p$, since equality forces every coordinate of each vector to equal its minimum with the other vector. In consequence $\sqrt S\ge\rho\sqrt2$. When $H<k$ the scale is at least $\rho\sqrt{2(p-k+1)}$. The weight in that part is bounded by the total $W^{2p}$. The weight with $H\ge k$ is bounded by the lower-degree diagonal expression in the second numerator. The full proof is checked by the Lean kernel.
:::

For a finite product of independent uniform offsets and closed resolution $\eta\ge0$, the Euclidean band estimate bounds each distinct pair's contribution by $e^{1/2}\sqrt{15\pi/2}\,\eta\, c_mc_n/\sqrt S$. Thus the right side also bounds the weighted probability budget after multiplication by $e^{1/2}\sqrt{15\pi/2}\,\eta$. The same estimate applies when the budget discards unreachable pairs and takes the minimum with a largest-coordinate bound. The fixed ζ ordinates still require an arithmetic estimate at positive resolution.
