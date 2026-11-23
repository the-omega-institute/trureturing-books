# Collision budgets with recomputed harmonic weights

A common perturbation theorem fixes the support and weights of each test before selecting the frequencies. The tail of the selected spectrum can have a different support at a given cutoff, and its harmonic weights depend on the selected frequencies. An enlarged reference cutoff and a pointwise upper bound on the new weights let us preselect both inputs.

Write $g_j$ for reference ordinates and $h_j$ for the selected ordinates. Suppose $|h_j-g_j|\le r_j\le R$. Let $V$ be a finite set containing all indices with $X-R<g_j\le T+R$, and assume $r_j<g_j$ on $V$. For $a\ge0$ and $x>0$, set $w(x)=x/(a+x^2)$. Use $a=1/4$ for the harmonic weights of the ordinate sum in this chapter. The fixed majorant on $V$ is

$$
v_j=\frac{g_j}{g_j-r_j}w(g_j).
$$

For a finite support $A$ and weights $z$ on it, write $E(A,z)$ for the degree-$p$ near-collision mass at resolution $\eta$ of the selected frequencies $h|_A$, with the weight of identical degree vectors subtracted.

::: {.theorem #thm-ch31-perturbed-harmonic-weights title="Transfer to the realized cutoff" lean="D5/S3/Fourier/Concentration/PerturbedHarmonicWeights.collision_excess_le_on_perturbed_cutoff"}
Every index with $X<h_j\le T$ lies in $V$. Let $U$ be the set of those indices and set $u_j=w(h_j)$ on $U$. For every natural degree $p$ and every resolution $\eta\ge0$,

$$
E(U,u)\le E(V,v).
$$
:::

::: proof
The displacement bound gives $X-R<g_j\le T+R$ whenever $X<h_j\le T$. For the weights, put $x=g_j$, $y=h_j$, and $r=r_j$ on $V$. Since $x-r\le y\le x+r$ and $r<x$, we have $y(x-r)\le y^2$ and $y(x-r)\le x^2$. Multiplying by the positive denominators gives $w(y)\le[x/(x-r)]w(x)$.

Extend a degree vector on $U$ by zero on $V\setminus U$. Its degree, frequency, and multinomial coefficient stay the same. Each monomial product increases weakly when the surviving weights increase from $u$ to $v$. At nonnegative resolution, subtracting the diagonal leaves the sum over distinct ordered pairs. The injection preserves distinctness, and every additional pair has nonnegative weight. The full proof is checked by the Lean kernel.
:::

The factor $x/(x-r)$ is attained at $a=0$ and $y=x-r$, so it is sharp uniformly in $a\ge0$. At fixed $a=1/4$ the same formula is an upper bound. The two excesses use the same selected frequencies, the same degree and the same resolution. For a comparison spectrum, one can therefore impose the budgets on the fixed inputs $(V,v)$ and apply them after selection at the realized cutoff. A near-collision budget for the fixed zeta ordinates still requires an arithmetic estimate.
