# E.8.1.5 The Sharp Universal Chordal Banach Reconstruction Constant {#sec-appe-sharp-chordal-banach-four}

When clique size is bounded, the preceding elimination and weighted averaging methods improve the reconstruction bound. If cliques can be arbitrarily large, can a better choice of potential for each gain assignment uniformly lower the coefficient $4$ of [@thm-appe-chordal-uniform-gain-potential]? The challenge is to find a single gain assignment that forces a large error for every potential.

::: {.theorem #thm-appe-chordal-banach-sharp-four title="Sharp Banach Reconstruction Lower Bound on Finite Connected Chordal Graphs" lean="D5/S3/Combinatorics/Graph/Chordal/ChordalBanachSharpFour.SimpleGraph.exists_chordal_banach_gain_lower_four"}
For every real $\varepsilon>0$, there exist a finite vertex set $V$, a connected chordal simple graph $G$ on $V$, a finite-dimensional real Banach space $E$, and a map $g:V\times V\to E$ with the following properties.

1. For all $u,v\in V$, we have $g(v,u)=-g(u,v)$.
2. For all $u,v,w\in V$, if $uv,vw,uw$ are edges of $G$, then $\|g(u,v)+g(v,w)-g(u,w)\|\le1$.
3. For every potential $p:V\to E$, there is a directed edge $(u,v)$ of $G$ such that

   $$
   \|g(u,v)-(p(v)-p(u))\|\ge4-\varepsilon.
   $$
:::

::: {.proof #pf-appe-chordal-banach-sharp-four}
**A tree of rolling clique histories.** Choose a band width $m\ge1$, depth $n=m^2+m+1$, retention parameter $M>1$, and branch-copy parameter $k$. Each history node carries a new complete clique of size $M^{m+2}$. Along a history, the clique born at step $b$ retains $M^{m+2-(t-b)}$ vertices at step $t$ ($b\le t\le b+m$), and none beyond the band width. Attach each new clique along the clique of retained older vertices, including all permitted retention choices and branch copies. The graph is finite and connected. On any simple cycle of length at least $4$, the two cycle neighbors of a vertex of maximal birth depth lie in its clique of earlier or same-depth neighbors. Their adjacency supplies a chord.

**Gains from chains.** In the space of real chains indexed by ordered vertex pairs, write $[uv]$ for the skew oriented edge chain, whose boundary is $\delta_v-\delta_u$. Define the norm by pairing with scalar cochains $f$,

$$
\|z\|_*=\sup_f |\langle f,z\rangle|,
$$

where every coordinate satisfies $|f(u,v)|\le3$ and every oriented triangle boundary $T=[uv]+[vw]-[uw]$ satisfies $|\langle f,T\rangle|\le1$. Testing with the coordinate signs multiplied by $1/3$ bounds the sum of absolute chain coefficients by $3\|z\|_*$. The subspace of chains supported on graph edges with zero boundary is thus a finite-dimensional real Banach space $E$. Choose a root $o$ and a path chain $P_v$ from $o$ to $v$. Set $g(u,v)=[uv]+P_u-P_v$ on edges and zero elsewhere. The triangle sum is $T$, of norm at most $1$. Adding any potential $p(v)$ to $P_v$ gives a chain $q_v$ with the same boundary $\delta_v-\delta_o$, and the edge residual is exactly $[uv]+q_u-q_v$.

**Averaging and localization.** Suppose all residuals are less than $R=4-\varepsilon$. Subtract the mean of the chains over the root clique, average over graph automorphisms preserving depth and ancestry, and project each chain onto its vertex's ancestral spine. The sum of absolute coefficients is now bounded by $L=13(n+1)$, and localization increases the residual bound by at most $12L/(k+1)$. Interchangeable vertices in the same retained clique have equal chain load, and the fraction retained at each step is at most $1/M$. Consequently the parent and child test-cochain pairings each change by at most $12L/M$. The correction from averaging over the root clique is at most $3/M^{m+2}$. Choose $M,k$ large enough that these three contributions together are at most $\varepsilon/2$.

**Periodic band cochains.** For $0\le r<m$ and time $t$, put $\rho_r(t)=\mathbf{1}_{t\bmod m=r}-1/m$. For $u<v\le u+m$, define the band cochain $B_r(u,v)$ as $\rho_r(v)$, adding $\rho_r(u)$ when $v-u=m$, negating the value on reversal and zero on the diagonal. Using the last retained time of a vertex as its age, the test cochains distinguish the two endpoints of an edge while keeping triangle defects at most $1$ and absolute values at most $3$. The localization estimates yield real-valued functions $H_r(t)$ satisfying $\sum_r H_r(t)=0$ and, for $0\le u<v\le u+m$ with $v\le n$,

$$
2+B_r(u,v)+H_r(u)-H_r(v)\le4-\varepsilon/2.
$$

For each residue $r$, go from $0$ to the time between $1$ and $m$ with residue $r$, take $m$ steps of width $m$, then finish at $n$. Each full-width step has $2+B_r=4-2/m$, and the initial and final steps have nonnegative $2+B_r$. Sum along the path to telescope the intermediate $H_r$ terms, then average over residues to cancel the endpoint terms as well. This gives

$$
m(4-2/m)\le(m+2)(4-\varepsilon/2).
$$

At the outset $m$ can be chosen large enough that the reverse strict inequality holds. The assumed residual bound is impossible, so every potential has an edge attaining the required lower bound. The full proof is checked by the Lean kernel.
:::

Use the definition of $C_{\mathrm{Ban}}(G)$ from [@thm-appe-chordal-banach-limit-two]. On every finite connected chordal graph, [@thm-appe-chordal-uniform-gain-potential] applied to the additive group of a real Banach space with $d(x,y)=\|x-y\|$ gives $C_{\mathrm{Ban}}(G)\le4$. For every $\varepsilon>0$, the theorem above supplies such a graph with coefficient at least $4-\varepsilon$. Letting $\varepsilon$ tend to zero gives the exact universal constant

$$
\sup_{G\text{ finite, connected, chordal}} C_{\mathrm{Ban}}(G)=4.
$$

Both bounds determining this equality are checked by the Lean kernel. The [corresponding registration file](https://github.com/the-omega-institute/trureturing/blob/0ab3edce883d165b87f2d0ace6431d8bc026ea3e/Reg/D5/S3/Combinatorics/Graph/Chordal/ChordalBanachSharpFour.lean) also verifies strict obstruction thresholds exceeding $3$, $7/2$, and $399/100$. The same bounds establish the universal coefficient $4$ for groups with bi-invariant pseudometrics, since additive groups of real Banach spaces belong to this class. The exact supremum need not be attained on an individual finite graph.

For chordal graphs with the additional property of a dominating clique, the optional coefficient $3$ ceiling still requires its own formal evidence, as do further bounded-clique improvements for $3$-trees and other $k$-trees. For the fixed round target $\mathrm{SU}(2)$, the universal chordal coefficient remains undetermined, and the global Lean formalization of $C_{\mathrm{SU}(2)}(K_4)=c_*$ remains outstanding. See [@prob-appe-round-quaternion-k4-optimal-constant].
