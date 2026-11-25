# M.2.5 A variance lower bound for near-collisions {#a-variance-lower-bound-for-near-collisions}

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

## Common shifted bins and a parabolic test function

Restricting attention to one central interval discards the weight outside it. A common shift can instead control the second moment of all bin indices, after which a clipped quadratic test weights the entire family of bins.

For arbitrary finite real data $z_i,c_i$, there exists $0\le u<1$ such that

$$
\sum_i c_i\lfloor z_i+u\rfloor^2
\le \sum_i c_i\bigl(z_i^2+\{z_i\}(1-\{z_i\})\bigr).
$$

Here $\{z\}$ denotes the fractional part, and the weights $c_i$ may be signed. The proof computes the integral of the left-hand side over the unit interval in $u$. [Lean proof of common shifted rounding](https://github.com/the-omega-institute/trureturing/blob/fd4ef379635ad487726a2a103296d25cd326fb45/D5/S3/Fourier/Concentration/ShiftedBinVariance.lean#L69) With $z=(G_m-p\mu)/\eta$ and nonnegative weights $c_m$, the bin second moment is at most $MW^p$, for $M=pV/\eta^2+1/4$. All same-bin ordered pairs belong to the closed distance band $|G_m-G_n|\le\eta$.

More generally, let a finite family $(x_i,c_i)$ have nonnegative weights of total mass $A=\sum_i c_i$ and second moment $\sum_i c_i(x_i-a)^2\le BA$ about an arbitrary center $a$. Write $M=B/\eta^2+1/4$ and $E(\eta)=\sum_{|x_i-x_j|\le\eta}c_ic_j$ for $\eta>0$. For every positive integer $r$ with $M\le r^2$,

$$
A^2(1-M/r^2)^2\le
\left(\frac{16r}{15}-\frac{1}{15r^3}\right)E(\eta).
$$

Set $q(k)=\max(0,1-k^2/r^2)$. If $b_k$ is the mass in the selected bin, then $\sum_k b_kq(k)\ge A(1-M/r^2)$. The exact integer square and fourth-power sums give $\sum_k q(k)^2=16r/15-1/(15r^3)$. Apply Cauchy–Schwarz and then $\sum_k b_k^2\le E(\eta)$ to obtain the lower bound. [Lean proof of the parabolic lower bound](https://github.com/the-omega-institute/trureturing/blob/fd4ef379635ad487726a2a103296d25cd326fb45/D5/S3/Fourier/Concentration/ShiftedBinVariance.lean#L187)

For degree-$p$ frequency sums set $A=W^p$ and $B=pV$, strengthening the necessary condition for the moment test above. For $B>0$, as $\eta/\sqrt B\to0$, choosing $r=\lceil\sqrt{5M}\rceil$ makes the normalized coefficient of the lower bound tend to $3/(5\sqrt5)$. Thus $\liminf E(\eta)\sqrt B/(A^2\eta)\ge3/(5\sqrt5)$ when $A>0$. Optimality of this asymptotic consequence and an upper bound for actual zeta ordinates require further proofs.
