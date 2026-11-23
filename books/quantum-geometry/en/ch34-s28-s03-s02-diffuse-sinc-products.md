# The Euclidean scale of a sinc product

In a pair of degree vectors $m,n$, a centered uniform perturbation at coordinate $j$ enters their frequency difference with coefficient $c_j=(m_j-n_j)r_j$, where $r_j$ is the perturbation radius. For independent uniform variables on $[-1,1]$, each coordinate contributes the factor $\operatorname{sinc}(c_jt)$ to the characteristic function. A fixed intercept adds a phase of modulus one. The next bound uses the sum of squared coefficients when they are spread over several coordinates.

::: {.theorem #thm-ch31-diffuse-sinc-product title="Reciprocal quadratic bound for the product" lean="D5/S3/Fourier/Concentration/DiffuseSincProduct.diffuse_sinc_product_le"}
Let $A$ be a finite set and $c_j$ real coefficients. Put $S=\sum_{j\in A}c_j^2$ and suppose $c_j^2\le S/2$ for every $j\in A$. With $\operatorname{sinc}(0)=1$ and $\operatorname{sinc}(x)=\sin(x)/x$ for $x\ne0$, every real $t$ satisfies

$$
\prod_{j\in A}|\operatorname{sinc}(c_jt)|
\le \frac{1}{1+St^2/24}.
$$
:::

::: proof
First, $\operatorname{sinc}(x)^2(1+x^2/12)\le1$. On $0\le x\le2$, integration of $\cos u\le 1-u^2/8$ gives $0\le\operatorname{sinc}(x)\le 1-x^2/24$. Taking $z=x^2/24$, the needed inequality follows from $(1-z)^2(1+2z)=1-z^2(3-2z)$. For $x\ge2$, use $|\sin x|\le1$ and $1+x^2/12\le x^2$. Evenness covers negative $x$.

Set $b_j=(c_jt)^2/12$ and $U=\sum_j b_j$. The constant, linear and quadratic terms in $\prod_j(1+b_j)$ sum to $1+U+(U^2-\sum_j b_j^2)/2$. Every remaining term is nonnegative. Since each $b_j\le U/2$, the quadratic term is at least $U^2/4$. Multiply the scalar estimates and use $\prod_j(1+b_j)\ge(1+U/2)^2$. The full proof is checked by the Lean kernel.
:::

For $S>0$, the envelope has integral $\pi\sqrt{24/S}$. To turn the envelope into a collision budget, one needs a bound passing from the characteristic function to the probability of a short interval. Rudelson and Vershynin's density theorem gives the sharper probability estimate $\min(1,\sqrt2\,\eta/\sqrt S)$ for an interval of length $2\eta$ under independent uniform perturbations. For fixed ζ ordinates, the comparison problem still requires an arithmetic estimate. [Rudelson and Vershynin, Theorem 1.2](https://arxiv.org/html/1402.4492#S1.Thmtheorem2)
