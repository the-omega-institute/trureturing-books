# M.2.6 Weighted near-collisions under small perturbations {#weighted-near-collisions-under-small-perturbations}

Let $(g_j)$ be a finite family of frequencies with nonnegative weights $w_j$ and total weight $W=\sum_j w_j$. For each nonnegative integer vector $m$ of degree $p$, put $c_m=\binom{p}{m}\prod_j w_j^{m_j}$ and $G_m=\sum_j m_j g_j$. The ordered pairs with $|G_m-G_n|\le\eta$ contribute weight $c_mc_n$ to $E_{p,g}(\eta)$. The diagonal pairs $m=n$ contribute total weight $D=\sum_m c_m^2$.

::: {.theorem #thm-ch31-finite-spectral-perturbation title="A weighted near-collision bound for finite spectral perturbations" lean="D5/S3/Fourier/Concentration/FiniteSpectralPerturbation.exists_nearby_collision_bound"}
For all nonnegative integers $p,M$, every perturbation radius $\varepsilon>0$, and every resolution $\eta\ge0$, there are integers $0\le f_j\le M+1$ such that the frequencies

$$
g'_j=g_j+\varepsilon\left(\frac{2f_j}{M+1}-1\right)
$$

satisfy $|g'_j-g_j|\le\varepsilon$ for each $j$ and

$$
E_{p,g'}(\eta)\le D+
\frac{\min\{M+2,\,1+\lfloor\eta(M+1)/\varepsilon\rfloor\}}{M+2}\bigl(W^{2p}-D\bigr).
$$
:::

::: proof
Choose each offset independently from $M+2$ equally spaced points of $[-\varepsilon,\varepsilon]$. For $m\ne n$, take a coordinate with $m_j-n_j\ne0$. With the other offsets fixed, the difference of frequency sums is affine in that grid index, with slope magnitude $2\varepsilon|m_j-n_j|/(M+1)$. If any indices satisfy the closed distance condition, the largest and smallest differ by at most $\eta(M+1)/(\varepsilon|m_j-n_j|)$. At most $1+\lfloor\eta(M+1)/\varepsilon\rfloor$ indices qualify, and the grid has $M+2$ points.

Apply this count to every ordered pair and average over the finite product of offset sets. The weights $c_mc_n$ are nonnegative, and the diagonal always contributes $D$. The multinomial expansion gives total off-diagonal weight $W^{2p}-D$. At least one offset assignment has total near-collision weight at most the bound for the mean. The full proof is checked by the Lean kernel.
:::

The coordinate averaging is related to the character argument that bounds a nonzero real mode by $1/(\pi |m|R)$ after averaging on $[0,R]$. Here the quantity averaged in one coordinate is the indicator of a closed interval in the grid index. [Character average in riemann-hypothesis](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78)

At $\eta=0$, the factor on the off-diagonal weight is $1/(M+2)$. At positive resolution it approaches $\min\{1,\eta/\varepsilon\}$ as the grid grows. The frequencies may be chosen separately for each $p$ and $\eta$. For comparison, continuous independent perturbations can be treated by density bounds for linear combinations. [Rudelson and Vershynin, Theorem 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)

The bound can be substituted into the moment test for a bounded range of starts on the selected comparison spectrum. Actual ζ ordinates are fixed in advance. Controlling their high-order weighted near-collisions for that test remains open here. [Weighted near-collisions and the range of missing-window starts](ch34-s28-s03-s02-weighted-near-collisions.md#thm-ch31-bounded-tail-window-start)
