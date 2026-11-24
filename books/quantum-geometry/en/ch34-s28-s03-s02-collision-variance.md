# M.2.4 A variance lower bound for near-collisions {#a-variance-lower-bound-for-near-collisions}

Take a finite family of frequencies $(g_j)$ with nonnegative weights $(w_j)$ of positive total weight $W=\sum_jw_j$. The mean and variance under the normalized weights are

$$
\mu=W^{-1}\sum_j w_jg_j,
\qquad
V=W^{-1}\sum_jw_j(g_j-\mu)^2.
$$

For each nonnegative integer vector $m$ of total degree $p$, put $G_m=\sum_jm_jg_j$ and $c_m=\binom{p}{m}\prod_jw_j^{m_j}$. An ordered pair within distance $\eta$ contributes $c_mc_n$. Write $E_p(\eta)$ for the sum of these contributions.

::: {.theorem #thm-ch31-variance-collision-lower title="A weighted near-collision lower bound from variance" lean="D5/S3/Fourier/Concentration/FiniteCollisionVariance.tailCollisionMass_lower_variance"}
For every positive integer $p$ and real $\eta>0$,

$$
\frac{9}{16}W^{2p}\le
\left(1+\frac{4\sqrt{pV}}{\eta}\right) E_p(\eta).
$$
:::

::: proof
Subtracting $\mu$ from each frequency shifts every $G_m$ by $-p\mu$, preserving pair distances. The $p$-th power of the real exponential sum $A(t)=\sum_jw_j e^{(g_j-\mu)t}$ expands with the same coefficients $c_m$. At zero, $A(0)=W$, $A'(0)=0$, and $A''(0)=WV$. Evaluating the expansion and its second derivative at zero gives $\sum_m c_m=W^p$ and $\sum_m c_m(G_m-p\mu)^2=pVW^p$.

This second moment puts at least three quarters of the coefficient weight in the closed interval of radius $2\sqrt{pV}$ about $p\mu$. If $V=0$, all positive weight is at the center. Bins of width $\eta$ partition the interval into at most $\lfloor 4\sqrt{pV}/\eta\rfloor+1$ bins. Cauchy–Schwarz bounds the sum of their squared weights from below. Every ordered pair from the same bin contributes to $E_p(\eta)$, which gives the stated bound. The full proof is checked by the Lean kernel.
:::

If the moment test for a bounded range of starts requires $KNE_p(2/L)<\delta^{2p}$, with $K=3+\pi^2/3$, $N$ time samples and $\delta>0$, then

$$
\frac{9}{16}KN(W/\delta)^{2p}<1+2L\sqrt{pV}.
$$

See [weighted near-collisions and the range of starts](ch34-s28-s03-s02-weighted-near-collisions.md#thm-ch31-bounded-tail-window-start).

For example, fix $0<\beta<1$ and use the ζ tail frequencies $g_\gamma=\gamma/r$ with fixed $r>0$ and $\gamma\le T$. With $W\asymp(\log T)^2$, $\delta=\log T$, and $p\asymp T^\beta\log T$, the bound $\sqrt V\le T/r$ implies that a successful moment test requires

$$
\log L\ge \log N+2p\log\log T-O(p+\log T).
$$

This inequality constrains the averaging length of the moment test. An upper bound for high-order weighted near-collisions of actual ζ ordinates at positive resolution and the possible existence of missing windows in shorter ranges remain open here.
