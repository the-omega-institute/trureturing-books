# E.8.1.10 Global Hilbert Reconstruction and Finite Clique Improvements {#sec-appe-hilbert-global-sub-jung}

Given only a bound on the additive defect of each triangle, can a single vertex potential fit every edge of a chordal graph below the Jung threshold? Every finite chordal graph admits the same factor $241361/100000$, strictly below $1+\sqrt2$. Every finite clique bound reduces that factor further. At clique cutoffs $31$, $51$, and $101$, retaining the energy of the triangle curls gives smaller bounds still.

## E.8.1.10.1 The Global Bound and the Ordered Triangle Invariant

Write $g_{ij}=g(i,j)$. An ordered triangle $(i,j,k)$ has edges $ij$, $jk$, and $ik$, and its curl is $g_{ij}+g_{jk}-g_{ik}$. The residual of a potential $p$ on the directed edge $ij$ is $g_{ij}+p(i)-p(j)$. The three potential values cancel in the triangle sum, so reconstruction preserves the curl. Set $R=241361/100000$.

::: {.theorem #thm-appe-hilbert-global-sub-jung title="Global Hilbert Reconstruction Below the Jung Threshold" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJung.SimpleGraph.IsChordal.exists_hilbert_gain_potential_sub_jung"}
Let $V$ be a finite type (Finite), $G$ a simple chordal graph on $V$, and $E$ a normed additive commutative group with a real inner-product space structure. Let $g:V\times V\to E$ and let $D\ge0$ be real. Suppose $g_{ji}=-g_{ij}$ for all $i,j\in V$ and $\|g_{ij}+g_{jk}-g_{ik}\|\le D$ for every ordered triangle $(i,j,k)$. Then there exists $p:V\to E$ such that $\|g_{ij}+p(i)-p(j)\|\le RD$ on every directed edge $ij$. Moreover,

$$
\begin{aligned}
R &< \frac{2414}{1000},\\
\frac{2414}{1000} &< 1+\sqrt2,\\
\frac{3}{5000} &< 1+\sqrt2-R.
\end{aligned}
$$
:::

::: {.proof #pf-appe-hilbert-global-sub-jung}
If $D=0$, the triangle curls vanish. Inserting vertices in reverse perfect elimination order then integrates the gains exactly. If $D>0$, first divide the gains by $D$. When inserting a vertex $a$, its earlier neighbors form a clique, and each neighbor $i$ gives a candidate $c_i=g_{ia}+p(i)$. If $x_{ij}$ is the old edge residual, then $x_{ij}-(c_i-c_j)$ is the curl of the new triangle, with norm at most $1$.

Put $d(x)=R^2-\|x\|^2$. For each old triangle ordered by insertion time, maintain $F(\langle x,t\rangle/R)\le w d(x)+d(y)+d(z)$, where $x$ is its earliest edge, $y,z$ are its other edges, $t$ is its curl, $w=157/1000$, and $F$ is piecewise quadratic. A singleton constraint controls each new edge, and a constraint for each pair of earlier neighbors controls the new triangle. Write these constraints as averages of squared distances with constant offsets. Every probability mixture of the constraints induces weights $q_i$ on the earlier neighbors. The weighted barycenter minimizes the mixed squared distances.

The variance identity decomposes the reduction in variance into a diagonal term, the deficits of old edges and new curls, row-mean energy, and centered energy. For each pair, sum over the suffix starting at its later endpoint. A decreasing scalar envelope controls the fluctuations of projected curls and the deficits of their companion edges. A degree-four weighting of prefixes gives a second bound on edge deficits from old triangles with small projected curl. Combining both estimates with the variance identity bounds the minimum of every mixture by $-(57/10)\sum_i q_i^2$. The finite quadratic minimax lemma now gives a single new potential value satisfying every singleton and pair constraint. An empty predecessor clique imposes no constraints. After induction, multiply the potential by $D$. Squaring $141421/100000$ and comparing it with $2$ gives the square-root estimate needed for the three strict comparisons. The full proof is checked by the Lean kernel.
:::

The exact piecewise function, scalar envelope, and final budget inequality appear with their rational certificates in the [global scalar certificate source][global-certificate].

## E.8.1.10.2 An Improvement at Every Finite Clique Cutoff

The clique bound limits the number of weights at each insertion. Even the most evenly spread weights have a positive sum of squares determined by that bound.

::: {.theorem #thm-appe-hilbert-global-clique-credit title="Squared-Radius Improvement at Finite Clique Cutoffs" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJung.SimpleGraph.IsChordal.exists_hilbert_gain_potential_clique_credit"}
Let $V$ be a finite type (Finite), $G$ a simple chordal graph on $V$, and $E$ a normed additive commutative group with a real inner-product space structure. Take a natural number $N\ge1$ and suppose every finite clique $S$ satisfies $\lvert S\rvert\le N+1$. Let $g:V\times V\to E$ and let $D\ge0$ be real. Suppose $g_{ji}=-g_{ij}$ for all $i,j\in V$ and $\|g_{ij}+g_{jk}-g_{ik}\|\le D$ for every ordered triangle $(i,j,k)$. Set $R_N=\sqrt{R^2-57/(10N)}$, using the real value of $N$ under the square root. Then there exists $p:V\to E$ such that $\|g_{ij}+p(i)-p(j)\|\le R_ND$ on every directed edge $ij$. Moreover, $R_N\le R-59/(50N)$, with $N$ again taken as real in the right-hand side.
:::

::: {.proof #pf-appe-hilbert-global-clique-credit}
The new vertex and its earlier neighbors form a clique, so there are at most $N$ candidates. On a nonempty predecessor clique, Cauchy–Schwarz gives $\sum_i q_i^2\ge 1/N$. Use the resulting $57/(10N)$ reduction in each mixture to tighten the singleton and pair constraints. This preserves the ordered triangle invariant and lowers the squared radius from $R^2$ to $R^2-57/(10N)$. An empty predecessor clique requires no candidate values. Rescale for a positive budget and use exact integration at zero budget. The right-hand side of the linear bound is nonnegative for $N\ge1$. Squaring it gives the comparison with the radicand. The full proof is checked by the Lean kernel.
:::

## E.8.1.10.3 Retained-Curl Bounds at Three Clique Cutoffs

Here each cutoff comes with its own radius. The value $N_k$ bounds the number of earlier neighbors at insertion, and $N_k+1$ bounds the clique size in the whole graph.

| $k$ | $N_k$ | $N_k+1$ | $R_k$ |
| --- | ---: | ---: | ---: |
| `thirtyOne` | $30$ | $31$ | $22302/10000$ |
| `fiftyOne` | $50$ | $51$ | $22913/10000$ |
| `hundredOne` | $100$ | $101$ | $23434/10000$ |

::: {.theorem #thm-appe-hilbert-global-retained-curl title="Retained-Curl Reconstruction at Three Clique Cutoffs" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJung.SimpleGraph.IsChordal.exists_hilbert_gain_potential_retained_curl"}
Let $V$ be a finite type (Finite), $G$ a simple chordal graph on $V$, and $E$ a normed additive commutative group with a real inner-product space structure. Take any $k$ in the table and suppose every finite clique $W$ satisfies $\lvert W\rvert\le N_k+1$. Let $g:V\times V\to E$ and let $D\ge0$ be real. Suppose $g_{ji}=-g_{ij}$ for all $i,j\in V$ and $\|g_{ij}+g_{jl}-g_{il}\|\le D$ for every ordered triangle $(i,j,l)$. Then there exists $p:V\to E$ such that $\|g_{ij}+p(i)-p(j)\|\le R_kD$ on every directed edge $ij$.
:::

::: {.proof #pf-appe-hilbert-global-retained-curl}
Normalize a positive budget to $1$ and insert vertices in reverse perfect elimination order. On small cliques, maintain a lower bound on a weighted sum of edge deficits and squared fixed triangle curls. For cliques containing the new vertex, each subset of earlier neighbors gives a constraint on a sum of squared distances. The new triangle curls determine its constant term. Average the old clique inequalities with products of the vertex weights. The coefficient of a fixed edge or triangle is an elementary symmetric polynomial on the complementary vertices. Pair averaging gives the upper bound at uniform weights and controls the loss from uniformity by the squared variation of the weights. Substitute the resulting lower bound on old clique deficits into the weighted projection identity, then apply the scalar certificate to every probability mixture of the constraints. The common center satisfies every subset constraint, and the singleton constraints give the squared-radius bound for new edges. After induction, take square roots and restore the original scale. The empty subset gives a vacuous constraint, and zero budget allows exact integration. The full proof is checked by the Lean kernel.
:::

## E.8.1.10.4 The Source Proof for Finite Cutoffs

The finite argument first proves the unit-budget version. Use the same $V,G,E,k,g$ as in the preceding theorem, with the same clique bound and skewness condition. If the curl norm is at most $1$ on every ordered triangle, one potential $p$ has residual norm at most $R_k$ on every directed edge. The companion source gives this step and the scalar lemmas below. The three theorem boxes above cite the frozen ledger. [`exists_retained_potential`][unit-budget]

- For real $a,b,c$, if $a>0$ and $b^2<4ac$, then $c+bx+ax^2>0$ for every real $x$. Complete the square. [`quadratic_pos`][quadratic]
- For real $q,b,u,t,H,\ell$, suppose $q>0$, $q+b>0$, $\ell^2<4qH$, and $(\ell-b(t-2u))^2<4(q+b)(H-bu(t-u))$. Then $-q(x-u)^2+bx\max(t-x,0)<H+\ell(x-u)$ for every real $x$. Split at $x=t$ and apply the quadratic discriminant condition on each branch. [`penalty_affine_lt`][affine]
- Given a certificate for parameters $\tau$ and an index type $I$ with a finite enumeration (Fintype), suppose $\lvert I\rvert\le N_\tau$ and $p:I\to\mathbb R$ satisfies $\sum_i p_i=1$. The envelope $\mathcal E_\tau(p)$ is strictly below the negative of the certificate's margin, hence strictly below $0$. After padding to $N_\tau$ entries with zeros, the linear terms of the affine majorant sum to zero. Under the same hypotheses, any real $L\le\mathcal E_\tau(p)$ satisfies $L<0$. These scalar results allow signed weights. [`envelope_lt_margin`, `envelope_neg`, and `closes_mixture`][margin]
- Each of the three choices of $k$ above has margin $1/20000$. For its parameters $\tau$ and an index type $I$ with a finite enumeration (Fintype), if $\lvert I\rvert\le N_k$ and $p:I\to\mathbb R$ satisfies $\sum_i p_i=1$, then $\mathcal E_\tau(p)<-1/20000$. [`finite_envelope_neg`][finite-envelope]

The envelope combines four inputs into a single mixture bound. Given parameters $\tau$ with $N_\tau>0$, let $p:I\to\mathbb R$ for an index type $I$ with a finite enumeration (Fintype). Write $A=\sum_i p_i^2$, $M=(1-A)/2$, $u_\tau=1/N_\tau$, and $P=\sum_i p_i\max(\theta_\tau-p_i,0)$. Here $r_\tau=R_\tau^2$, $c_\tau=1+1/\mu_\tau$, $\theta_\tau=\sigma_\tau/N_\tau$, and $\beta_\tau=c_\tau\theta_\tau$. The quantities $B_\tau,Q_\tau,K_\tau$, $e_\tau$, and $J_\tau$ are `credit`, `Q`, `rankCoeff`, `edgeFactor`, and `distinctUniform N s` in the source, and $C_\tau$ is `constantTerm`. The envelope is $\mathcal E_\tau(p)=C_\tau-Q_\tau(A-u_\tau)+K_\tau P$. Suppose $B_\tau\ge0$ and the real numbers $V_0,D_0,T,H,X,F_0$ satisfy

$$
\begin{aligned}
V_0 &\le (1+\mu_\tau)(r_\tau M-D_0-c_\tau T)+c_\tau H,\\
B_\tau F_0 &\le (1+\mu_\tau)(D_0+c_\tau T),\\
J_\tau-\binom{s_\tau}{2}e_\tau(A-u_\tau)&\le F_0,\\
c_\tau H+\beta_\tau X&\le c_\tau M+K_\tau P.
\end{aligned}
$$

Combining the inequalities eliminates $D_0,T,H$ and gives $V_0-r_\tau+\beta_\tau X\le\mathcal E_\tau(p)$. The binomial coefficient here uses the real formula $s_\tau(s_\tau-1)/2$. This assembly lemma allows arbitrary $p$. When $\tau$ comes from one of the given choices of $k$, the certificate supplies $N_\tau>0$ and $B_\tau\ge0$. With the same four inputs, if also $\lvert I\rvert\le N_k$ and $\sum_i p_i=1$, then $V_0-r_\tau+\beta_\tau X<-1/20000$. [`mixture_le_envelope` and `finite_mixture_neg`][mixture]

## E.8.1.10.5 The Optimal Coefficient

As in [Appendix E.8.1.9](appendix-e-s08-s01-s09-hilbert-reversal-circle-su2.md#sec-appe-hilbert-reversal-circle-su2), let $C_{\mathrm{Hilb}}^*$ be the infimum of unit-budget coefficients valid for all finite simple chordal graphs and all real inner-product spaces. By [@thm-appe-hilbert-global-sub-jung], $C_{\mathrm{Hilb}}^*\le241361/100000<2.414<1+\sqrt2$. The restricted coefficient $C_{\mathrm{Hilb}}^{(m)}$ ranges over graphs whose cliques have at most $m$ vertices.

::: {.problem #prob-appe-hilbert-global-optimal title="The Optimal Global Hilbert Coefficient"}
Determine the exact value of $C_{\mathrm{Hilb}}^*$.
:::

Sharper numerical bounds require their own evidence. The global upper bound $2.413469$, the global lower bound $C_{\mathrm{Hilb}}^*>1.53225$, and the finite-clique bounds $C_{\mathrm{Hilb}}^{(6)}<3/2$ and $C_{\mathrm{Hilb}}^{(22)}<2$ lie outside the conclusions of the frozen declarations cited here.

[global-certificate]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungCertificate.lean#L72
[unit-budget]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L701
[quadratic]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L79
[affine]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L87
[margin]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L127-L192
[finite-envelope]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L305
[mixture]: https://github.com/the-omega-institute/trureturing/blob/8cb826a0a80a9e3bff77cd9126e1c3314d23e974/D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertGlobalSubJungFinite.lean#L313-L348
