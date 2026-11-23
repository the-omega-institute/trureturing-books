# One spectral perturbation for many tests

## One choice on finite grids

The [finite perturbation bound](ch34-s28-s03-s02-spectral-perturbations.md) chooses the grid offsets for a given moment test. A sequence of cutoffs in a single comparison spectrum needs a common choice. Let $g_j$ be the unperturbed frequencies, indexed by a set $J$. Choose a radius $\varepsilon_j\ge0$ and $M_j+2$ indexed offsets evenly spaced between $-\varepsilon_j$ and $\varepsilon_j$. Here $M_j$ is a nonnegative integer, and radius zero keeps the coordinate fixed.

Test $k$ specifies a finite support $J_k\subseteq J$, nonnegative weights on that support, a natural degree $p_k$ and a resolution $\eta_k\ge0$. Let $E_k(g')$ be the weighted near-collision mass of $g'$ on $J_k$. Write $D_k$ for the diagonal mass, $W_k$ for the weight sum and $B_k=W_k^{2p_k}-D_k$ for the full off-diagonal weight. Require $b_k>0$ when $B_k>0$. For tests with $B_k>0$ and $b_k<1$, require $\varepsilon_j>0$ on $J_k$ and take an upper bound $\rho_k$ on

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
Take a finite set of tests and average over the product of the grids on the union of their supports. For each test, the restriction of this uniform distribution to its support is uniform. Every excess lies between zero and $B_k$. For tests charged to the budget, the finite grid count bounds the mean excess by $\rho_k B_k$.

For the tests charged to the budget, sum the excesses divided by $b_k B_k$. If an assignment violates any test, the sum strictly exceeds one. The mean of the sum is at most one, so an assignment satisfying the finite family exists even at budget one.

On the full product of finite discrete grids, a test depends on finitely many coordinates and its acceptable assignments form a closed set. The product is compact, and these closed sets have the finite intersection property. This gives one assignment for the entire family. The full proof is checked by the Lean kernel.
:::

For an exact-budget example, take $g_j=0$ on three coordinates, $\varepsilon_j=1$ and $M_j=2$. Use two supports $\{0,1\}$ and $\{1,2\}$, both with unit weights, degree one, resolution zero and $b_k=1/2$. Each has $\rho_k=1/4$, so the budget is one. The assignment $(-1,1,-1)$ has no off-diagonal contribution on either support. A test on a singleton support contributes zero to the budget because $B_k=0$.

## Common perturbations on intervals

For uniform perturbations on intervals, lengths replace grid counts, and each pair of degree vectors can use its strongest coordinate.

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

Under the countable product measure, the offsets lie within their radii almost surely. If the normalized sum exceeded $C$ at every allowed realization, its expectation would be strictly greater than $C$, contradicting the bound. Choose an allowed realization where the sum is at most $C$. Every summand is nonnegative and therefore at most $C\le1$. The full proof is checked by the Lean kernel.
:::

The conditioning step uses the same dependence on a nonzero coordinate as the character average in the comparison repository. In the interval problem, the slope controls the length of the admissible section. For diffuse coefficient vectors, the density theorem of Rudelson and Vershynin instead gives a bound involving the Euclidean norm of $((m_j-n_j)\varepsilon_j)_j$. [Comparison character average](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L78) · [Rudelson and Vershynin, Theorem 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)

For an endpoint example, take $g_j=0$ and $\varepsilon_j=1$ on three coordinates. Use two degree-one tests with supports $\{0,1\}$ and $\{1,2\}$, unit weights, $\eta_k=1/8$ and $b_k=1/2$. Each test has $A_k=1/4$, so the budget sum is one. The offsets $(-1,1,-1)$ give zero excess on both supports.

At zero resolution the pairwise contribution to $A_k$ is zero. For positive resolution the estimate applies to a chosen comparison spectrum with prescribed radii. When $C=0$, the collision mass of every test equals its diagonal mass.

## A sinc bound for perturbations across coordinates

In a pair of degree vectors $m,n$, a centered uniform perturbation at coordinate $j$ enters their frequency difference with coefficient $c_j=(m_j-n_j)r_j$, where $r_j$ is the perturbation radius. For independent uniform variables on $[-1,1]$, each coordinate contributes the factor $\operatorname{sinc}(c_jt)$ to the characteristic function. A fixed intercept adds a phase of modulus one. The next bound uses the sum of squared coefficients when they are spread over several coordinates.

::: {.theorem #thm-ch31-diffuse-sinc-product title="Reciprocal quadratic bound for the product" lean="D5/S3/Fourier/Concentration/DiffuseSincProduct.diffuse_sinc_product_le"}
Let $A$ be a finite set and $c_j$ real coefficients. Put $S=\sum_{j\in A}c_j^2$ and suppose $\sum_{j\in A} c_j^4\le S^2/2$. With $\operatorname{sinc}(0)=1$ and $\operatorname{sinc}(x)=\sin(x)/x$ for $x\ne0$, every real $t$ satisfies

$$
\prod_{j\in A}|\operatorname{sinc}(c_jt)|
\le \frac{1}{1+St^2/15}.
$$
:::

::: proof
First, $\operatorname{sinc}(x)^2(1+2x^2/15)\le1$. On $0\le x\le2$, integration of $\cos u\le 1-u^2/5$ gives $0\le\operatorname{sinc}(x)\le 1-x^2/15$. Taking $z=x^2/15$, the needed inequality follows from $(1-z)^2(1+2z)=1-z^2(3-2z)$. For $x\ge2$, use $|\sin x|\le1$ and $1+2x^2/15\le x^2$. Evenness covers negative $x$.

Set $b_j=2(c_jt)^2/15$ and $U=\sum_j b_j$. The constant, linear and quadratic terms in $\prod_j(1+b_j)$ sum to $1+U+(U^2-\sum_j b_j^2)/2$. Every remaining term is nonnegative. The fourth-moment condition gives $\sum_j b_j^2\le U^2/2$, so the quadratic term is at least $U^2/4$. Multiply the scalar estimates and use $\prod_j(1+b_j)\ge(1+U/2)^2$. The full proof is checked by the Lean kernel.
:::

The fourth-moment condition follows if every $c_j^2\le S/2$. For example, $(c_1,c_2,c_3)=(3,2,2)$ satisfies the fourth-moment condition with $S=17$ and largest square $9$. For $S>0$, the envelope has integral $\pi\sqrt{15/S}$. To turn the envelope into a collision budget, one needs a bound passing from the characteristic function to the probability of a short interval. Rudelson and Vershynin's density theorem gives the sharper probability estimate $\min(1,\sqrt2\,\eta/\sqrt S)$ for an interval of length $2\eta$ under independent uniform perturbations. [Rudelson and Vershynin, Theorem 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)

For a comparison spectrum, the next section [controls threshold crossings and handles recomputed weights](ch34-s28-s03-s02-spectral-count-perturbations.md). The actual ζ ordinates still require estimates for their fixed high-order frequency differences.
