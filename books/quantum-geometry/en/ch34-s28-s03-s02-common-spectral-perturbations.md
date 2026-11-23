# One spectral perturbation for many tests

The [finite perturbation bound](ch34-s28-s03-s02-spectral-perturbations.md) chooses the grid offsets for a given moment test. A sequence of cutoffs in a single comparison spectrum needs a common choice. Let $g_j$ be the unperturbed frequencies, indexed by a set $J$. At coordinate $j$, choose the perturbation radius $\varepsilon_j>0$ and a grid of $M_j+2$ equally spaced offsets between $-\varepsilon_j$ and $\varepsilon_j$, with $M_j$ a nonnegative integer.

Test $k$ specifies a finite support $J_k\subseteq J$, nonnegative weights on that support, a natural degree $p_k$ and a resolution $\eta_k\ge0$. Let $E_k(g')$ be the weighted near-collision mass of $g'$ on $J_k$. Write $D_k$ for the diagonal mass, $W_k$ for the weight sum and $B_k=W_k^{2p_k}-D_k$ for the full off-diagonal weight. Require $b_k>0$ when $B_k>0$. For tests with $B_k>0$ and $b_k<1$, take an upper bound $\rho_k$ on

$$
\frac{\min\{M_j+2,\,1+\lfloor\eta_k(M_j+1)/\varepsilon_j\rfloor\}}{M_j+2}
\qquad (j\in J_k).
$$

Define $a_k=\rho_k/b_k$ for tests with $B_k>0$ and $b_k<1$. The bound holds for every assignment when $B_k=0$ or $b_k\ge1$, and these tests have $a_k=0$.

::: {.theorem #thm-ch31-common-spectral-perturbations title="One grid assignment for a family of collision bounds" lean="D5/S3/Fourier/Concentration/CommonSpectralPerturbations.exists_common_nearby_collision_bounds"}
If $\sum_{k\in T} a_k\le1$ for every finite set of tests $T$, there is an assignment of integers $0\le f_j\le M_j+1$ defining a single spectrum

$$
g'_j=g_j+\varepsilon_j\left(\frac{2f_j}{M_j+1}-1\right).
$$

It satisfies $|g'_j-g_j|\le\varepsilon_j$ at every coordinate and $E_k(g')\le D_k+b_kB_k$ for every test.
:::

::: proof
Take a finite set of tests and average over the product of the grids on the union of their supports. For each test, the restriction of this uniform distribution to its support is uniform. The finite grid count gives a mean excess $E_k-D_k$ of at most $\rho_k B_k$. Every excess lies between zero and $B_k$.

For the tests charged to the budget, sum the excesses divided by $b_k B_k$. If an assignment violates any test, the sum strictly exceeds one. The mean of the sum is at most one, so an assignment satisfying the finite family exists even at budget one.

On the full product of finite discrete grids, a test depends on finitely many coordinates and its acceptable assignments form a closed set. The product is compact, and these closed sets have the finite intersection property. This gives one assignment for the entire family. The full proof is checked by the Lean kernel.
:::

For an exact-budget example, take $g_j=0$ on three coordinates, $\varepsilon_j=1$ and $M_j=2$. Use two supports $\{0,1\}$ and $\{1,2\}$, both with unit weights, degree one, resolution zero and $b_k=1/2$. Each has $\rho_k=1/4$, so the budget is one. The assignment $(-1,1,-1)$ has no off-diagonal contribution on either support. A test on a singleton support contributes zero to the budget because $B_k=0$.

The theorem controls a common comparison spectrum. To carry over a counting law for an increasing infinite spectrum, the radii still need a bound on how many coordinates can cross each counting threshold. The high-order weighted near-collision estimate for the fixed actual ζ ordinates remains open here.
