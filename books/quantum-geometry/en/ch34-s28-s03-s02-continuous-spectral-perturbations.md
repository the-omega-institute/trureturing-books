# Common spectral perturbations on intervals

A finite grid has one-hit probability at least its reciprocal size whenever a fiber hits exactly one grid point. Uniform perturbations on intervals replace the hit count by length. They also allow the estimate for each pair to use the best coordinate for that pair.

Let the frequencies $g_j$ and radii $\varepsilon_j>0$ be indexed by a countable set. Each test $k$ has finite support $J_k$, nonnegative weights and natural degree $p_k$. For degree vectors $m,n$ on that support, write $c_m,c_n$ for the weighted multinomial coefficients and set

$$
L_k(m,n)=\max_{j\in J_k}|m_j-n_j|\varepsilon_j.
$$

Every distinct pair has $L_k(m,n)>0$. At resolution $\eta_k\ge0$, define

$$
A_k=\sum_{m\ne n}c_mc_n\min\!\left\{1,\frac{\eta_k}{L_k(m,n)}\right\},
$$

where the sum runs over ordered degree-$p_k$ pairs. As before, $D_k$ is the diagonal mass and $E_k(g')$ is the collision mass of the spectrum $g'$ on $J_k$.

::: {.theorem #thm-ch31-continuous-common-spectral-perturbations title="A common perturbation without the grid correction" lean="D5/S3/Fourier/Concentration/ContinuousSpectralPerturbations.exists_continuous_common_nearby_bounds"}
Let the tests be countable and let their excess budgets $b_k$ be positive. If $C=\sum_k A_k/b_k\le1$, one spectrum $g'$ satisfies $|g'_j-g_j|\le\varepsilon_j$ for every $j$ and

$$
\sum_k \frac{E_k(g')-D_k}{b_k}\le C.
$$

Each test then satisfies $E_k(g')\le D_k+b_k$.
:::

::: proof
Take independent uniform offsets $U_j$ on $[-\varepsilon_j,\varepsilon_j]$. For a distinct pair, fix all coordinates in its support except one attaining $L_k(m,n)$. The frequency difference as a function of $U_j$ is affine with slope $m_j-n_j$. The closed collision band cuts out an interval of length at most $2\eta_k/|m_j-n_j|$. Dividing by $2\varepsilon_j$ and capping at one gives the pairwise factor. Integrate over the other coordinates and sum with weights $c_mc_n$. The expected excess above $D_k$ is at most $A_k$.

Under the countable product measure, the offsets lie within their radii almost surely. If the normalized sum exceeded $C$ at every allowed realization, its expectation would be strictly greater than $C$, contradicting the bound. Choose an allowed realization where the sum is at most $C$. Every summand is nonnegative and therefore at most $C\le1$. Lean verifies the finite marginals and the countable averaging argument.
:::

The conditioning step uses the same dependence on a nonzero coordinate as the character average in the comparison repository. In the interval problem, the slope controls the length of the admissible section. For diffuse coefficient vectors, the density theorem of Rudelson and Vershynin instead gives a bound involving the Euclidean norm of $((m_j-n_j)\varepsilon_j)_j$. [Comparison character average](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78) · [Rudelson and Vershynin, Theorem 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)

For an endpoint example, take $g_j=0$ and $\varepsilon_j=1$ on three coordinates. Use two degree-one tests with supports $\{0,1\}$ and $\{1,2\}$, unit weights, $\eta_k=1/8$ and $b_k=1/2$. Each test has $A_k=1/4$, so the budget sum is one. The offsets $(-1,1,-1)$ give zero excess on both supports.

At zero resolution the pairwise contribution to $A_k$ is zero. For positive resolution the estimate applies to a chosen comparison spectrum with prescribed radii. An application that requires a specific counting law must control threshold crossings under those radii. The actual ζ ordinates still require estimates for their fixed high-order frequency differences.
