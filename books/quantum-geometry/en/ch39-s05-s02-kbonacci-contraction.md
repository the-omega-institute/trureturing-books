# 39.5.2 Generalized $K$-Bonacci Prohibition and Pisot Conjugate Disk Contraction {#sec-ch39-p2e-kbonacci}

For each integer order $K \ge 2$, define the $K$-Bonacci characteristic polynomial

$$
P_K(X) = X^K - \sum_{j=0}^{K-1} X^j.
$$

Multiplying $P_K(X)$ by $(X - 1)$ yields $(X - 1)P_K(X) = X^{K+1} - 2X^K + 1$, so every root $x \neq 1$ satisfies the self-referential algebraic relation $x = 2 - x^{-K}$. On the real interval $(1, 2)$, $P_K$ possesses a unique real Perron root $\beta_K = \operatorname{dbonacciPerronRoot}(K)$, while in the complex plane all remaining $K - 1$ Galois conjugates are forced strictly inside the open unit disk:

::: {.theorem #thm-ch39-p2e-kbonacci-pisot title="Complex Root Location and Unit-Disk Conjugate Contraction for K-Bonacci Polynomials" lean="D5/S0/Tower/DBonacci/Irreducibility.dbonacci_complex_root_location"}
Let $q \ge 2$ be an integer order, and let $z \in \mathbb{C}$ be any complex root of the characteristic polynomial $X^q - \sum_{i=0}^{q-1} X^i \in \mathbb{C}[X]$. Then

$$
1 \le \|z\| \iff z = \beta_q,
$$

where $\beta_q = \operatorname{dbonacciPerronRoot}(q)$ is the real Perron root embedded in $\mathbb{C}$. Equivalently, every complex conjugate root $z \neq \beta_q$ strictly satisfies $\|z\| < 1$.
:::

::: proof
By the Perron-root identity [`two_sub_dbonacciPerronRoot_eq_inv_pow`](lean:D5/S0/Tower/DBonacci/PerronRoot.two_sub_dbonacciPerronRoot_eq_inv_pow), $2 - \beta_q = \beta_q^{-q}$ for every $q \ge 2$, so $\beta_q \in (1, 2)$ and $\|(\beta_q : \mathbb{C})\| = \beta_q \ge 1$ (with $\beta_q \to 2$ as $q \to \infty$ by [`dbonacciPerronRoot_tendsto_two`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_tendsto_two)). Conversely, suppose $z$ is a root satisfying $1 \le \|z\|$; multiplying by $(z - 1)$ gives $(z - 1)(z^q - \sum_{i=0}^{q-1} z^i) = z^{q+1} - 2z^q + 1 = 0$, or equivalently $z^q(2 - z) = 1$. If $\|z\| > 1$, applying the triangle inequality to $z^q = \sum_{i=0}^{q-1} z^i$ gives $\|z\|^q \le \sum_{i=0}^{q-1} \|z\|^i$, which forces $\|z\| \le \beta_q < 2$ because the real characteristic polynomial is strictly positive on $(\beta_q, \infty)$; meanwhile, combining $z^q(2 - z) = 1$ with the reverse triangle inequality yields $0 < 2 - \beta_q \le 2 - \|z\| \le \|2 - z\| = \|z\|^{-q}$, so $\|z\|^q(2 - \|z\|) \le \|z\|^q \|2 - z\| = 1$. Define $f(t) := t - 2 + t^{-q}$ on $(0, \infty)$: since $f(1) = 0$, $f(\beta_q) = 0$ (as $\beta_q^q(2 - \beta_q) = 1$), and $f''(t) = q(q + 1)t^{-q - 2} > 0$ for every $t > 0$, $f$ is **strictly convex** on $[1, \beta_q]$; therefore every interior point $t = (1 - \lambda)\cdot 1 + \lambda\beta_q \in (1, \beta_q)$ ($0 < \lambda < 1$) satisfies $f(t) < (1 - \lambda)f(1) + \lambda f(\beta_q) = 0$, i.e., $2 - t > t^{-q}$, hence $t^q(2 - t) > 1$. Consequently, $1 < \|z\| < \beta_q$ would imply $\|z\|^q(2 - \|z\|) > 1$, contradicting $\|z\|^q(2 - \|z\|) \le \|z\|^q \|2 - z\| = 1$; together with $\|z\| \le \beta_q$, this forces $\|z\| = \beta_q$, and substituting $\|z\| = \beta_q$ into $2 - \|z\| \le \|2 - z\| = \beta_q^{-q} = 2 - \beta_q$ forces equality $2 - \|z\| = \|2 - z\|$ with $\|z\| < 2$, whence $z$ lies on the positive real ray and $z = \|z\| = \beta_q$. If $\|z\| = 1$, $2z^q = z^{q+1} + 1$ with $\|z^{q+1}\| = 1$ forces $z^{q+1} = 1$ and hence $z = 1$, contradicting $1^q - q = 1 - q \neq 0$ for $q \ge 2$. Together with irreducibility over both $\mathbb{Z}$ and $\mathbb{Q}$ in [`dbonacci_irreducible`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacci_irreducible), $P_q(X)$ is irreducible in $\mathbb{Z}[X]$ and $\mathbb{Q}[X]$. The full proof is checked by the Lean kernel.
:::

Alongside this unit-disk root-location law, the frozen library verifies $\beta_2 = \varphi$ ([`dbonacciPerronRoot_two_eq_goldenRatio`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_two_eq_goldenRatio)), $\beta_3 = \operatorname{tribonacciConstant}$ ([`dbonacciPerronRoot_three_eq_tribonacciConstant`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_three_eq_tribonacciConstant)), strict monotonicity in the order $\beta_2 < \beta_3 < \beta_4 < \cdots$ ([`dbonacciPerronRoot_strictMonoOn`](lean:D5/S0/Tower/DBonacci/PerronRoot.dbonacciPerronRoot_strictMonoOn)), and simplicity of the Perron root via nonvanishing derivative ([`dbonacciPerronRoot_simple`](lean:D5/S0/Tower/DBonacci/Irreducibility.dbonacciPerronRoot_simple)). Taken together, these algebraic theorems prove that every $\beta_K$ ($K \ge 2$) is a Pisot–Vijayaraghavan number of exact algebraic degree $K$. Double-precision root finding (`NUM`) places the first three Perron roots at $\beta_2 \approx 1.618034$, $\beta_3 \approx 1.839287$, and $\beta_4 \approx 1.927562$, with gap $2 - \beta_K = \beta_K^{-K} \sim 2^{-K}$. Note that these statements establish polynomial algebra and root location; by themselves they do not constitute a geometric tiling theorem for general Pisot substitutions.

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="kbonacci" height="500"}
**$K$-Bonacci Pisot Root Spectrum Card (`kbonacci`)**: Plots the unit circle in $\mathbb{C}$, the cyan Perron root $\beta_K \in (1, 2)$ on the real axis, and the cluster of Galois conjugates strictly inside the open unit disk; magenta markers flag the $1^K$ carry threshold and amber highlights the active order $K$. Polynomial irreducibility and strict unit-disk conjugate contraction carry status `LEAN ✓`; decimal root coordinates carry status `NUM`.
:::

As $K \to \infty$, the forbidden run $1^K$ recedes to infinite depth and $\beta_K \nearrow 2$ approaches the smallest prime radix $2$. To make the vertical metric geometry of discrete lookup trees precise, we next examine prime-power congruence readouts alongside the general finite-horizon refinement ultrametric.
