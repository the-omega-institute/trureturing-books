# E.8.1.6 Banach Reconstruction Bounds for 3-Trees and the Exact Constant for Third Powers of Paths {#sec-appe-three-tree-banach-sharp-bounds}

How well can vertex potentials fit gains with triangle defect at most $1$ when every clique has at most $4$ vertices? For these finite chordal graphs, including every $3$-tree, the uniform Banach coefficient $S_4$ satisfies $\frac43\le S_4\le\frac{72537}{50000}=1.45074<\frac32$. The supremum over third powers of paths is exactly $\frac43$. A prefix correction gives the upper bound on each path, and gains in a hexagonal plane give finite-path lower bounds. The general chordal upper bound comes from a polygon preserved along the elimination order.

Write $V_n=\mathrm{Fin}(n)=\{i\in\mathbb N:i<n\}$. The simple graph $P_n^3$ joins distinct indices in $V_n$ at distance at most $3$. For a simple graph $G$, a gain $g:V\times V\to E$ is skew if $g(j,i)=-g(i,j)$ for every ordered pair of vertices. It has triangle defect at most $\varepsilon$ if $\|g(i,j)+g(j,k)-g(i,k)\|\le\varepsilon$ for every ordered triangle $(i,j,k)$, meaning that $ij,jk,ik$ are all edges. The error of a potential $\varphi:V\to E$ on the directed edge $(i,j)$ is $\|g(i,j)-(\varphi(j)-\varphi(i))\|$.

For a fixed graph, $C_{\mathrm{Ban}}(G)$ is the infimum of nonnegative real numbers $C$ with the following property. For every real Banach space $E$ and every skew gain with values in $E$ and triangle defect at most $1$, there is a potential with error at most $C$ on every directed edge. On $P_n^3$ this is the path coefficient defined in Lean. The infimum defining $S_4$ requires the same $C$ to work for all finite simple chordal graphs whose cliques have at most $4$ vertices.

For $n>0$, put $c(j)=\min(\max(j-2,0),n-1)\in V_n$ and integrate the adjacent gains as $I(k)=\sum_{0\le j<k}g(c(j),c(j+1))$. Set $f(j,k)=g(c(j),c(k))-(I(k)-I(j))$, $a_j=f(j,j+2)$, and $b_j=f(j,j+3)$. The causal potential defined in Lean is

$$
\varphi_g(i)=I(i+2)+\frac13\sum_{0\le j<i}(b_j-a_j+a_{j+1}).
$$

For $n=0$, $\varphi_g$ is the map on the empty vertex set.

::: {.theorem #thm-appe-three-tree-causal-error title="Error Bound for the Causal Potential on Third Powers of Paths" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.pathPowerThree_causal_potential_error"}
Let $E$ be a real seminormed vector space, $n\in\mathbb N$, $g:V_n\times V_n\to E$, and $\varepsilon\in\mathbb R$ with $\varepsilon\ge0$. If $g$ is skew on all ordered pairs and has triangle defect at most $\varepsilon$ on $P_n^3$, then on every directed edge $(i,j)$,

$$
\|g(i,j)-(\varphi_g(j)-\varphi_g(i))\|\le\frac43\varepsilon.
$$
:::

::: {.proof #pf-appe-three-tree-causal-error}
The adjacent term $f(j,j+1)$ vanishes. Subtracting a potential difference preserves each triangle defect, so $\|a_j\|$, $\|a_j-b_j\|$, and $\|a_{j+1}-b_j\|$ are at most $\varepsilon$. When clamped vertices coincide, skew symmetry makes the corresponding defect zero. With $x$ the initial index of an increasing edge, substitution of the prefix sum gives the following expressions for the residual multiplied by $3$.

$$
\begin{aligned}
j=x+1:\quad &(a_x-b_x)-a_{x+1},\\
j=x+2:\quad &a_{x+2}+(a_{x+2}-b_{x+1})+(a_x-b_x),\\
j=x+3:\quad &(b_{x+2}-a_{x+2})+(b_{x+2}-a_{x+3})\\
&\qquad +(a_{x+2}-b_{x+1})+(a_x-b_x).
\end{aligned}
$$

Every term has seminorm at most $\varepsilon$, so the longest edges give the uniform bound $\frac43\varepsilon$. Reversing an edge negates the residual, and the empty graph has no edge constraints. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-three-tree-path-upper title="Banach Reconstruction Upper Bound for Third Powers of Paths" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.pathPowerThree_banach_upper_four_thirds"}
Let $E$ be a real seminormed vector space, $n\in\mathbb N$, $g:V_n\times V_n\to E$, and $\varepsilon\in\mathbb R$ with $\varepsilon\ge0$. If $g$ is skew on all ordered pairs and has triangle defect at most $\varepsilon$ on $P_n^3$, then there exists a potential $\varphi:V_n\to E$ such that every directed edge $(i,j)$ satisfies

$$
\|g(i,j)-(\varphi(j)-\varphi(i))\|\le\frac43\varepsilon.
$$
:::

::: {.proof #pf-appe-three-tree-path-upper}
Choose the causal potential $\varphi_g$ of [@thm-appe-three-tree-causal-error]. The full proof is checked by the Lean kernel.
:::

To test whether the bound can be lowered uniformly, we need one gain assignment that constrains every potential. The following witness uses a two-dimensional target.

::: {.theorem #thm-appe-three-tree-path-lower title="Hexagonal-Plane Lower Bound for Third Powers of Paths" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.pathPowerThree_banach_lower_four_thirds"}
Let $H=\{x\in\mathbb R^3:x_0+x_1+x_2=0\}$ carry the supremum norm inherited from $\mathbb R^3$. For every $m\in\mathbb N$ with $1\le m$, there is a gain $g:V_{3m+3}\times V_{3m+3}\to H$ that is skew on all ordered pairs and has triangle defect at most $1$ on $P_{3m+3}^3$. For every potential $\varphi:V_{3m+3}\to H$, some directed edge $(i,j)$ satisfies

$$
\frac{4m}{3m+4}\le\|g(i,j)-(\varphi(j)-\varphi(i))\|.
$$
:::

::: {.proof #pf-appe-three-tree-path-lower}
On increasing edges of length $3$, the gain from $i$ is $L_i=\frac23(1,1,1)-2e_{i\bmod 3}$, where $e_r$ is the unit vector of coordinate $r$. For length $2$ take $A_i=(L_i+L_{i+2})/2$, and for length $1$ take zero. Negate the gain on reversal and use zero on nonedges. For increasing triangles, the defect vectors are $-A_i$, $A_i-L_i$, and $A_{i+1}-L_i$. Each has norm at most $1$ by checking the coordinates. Permuting the vertices can only change the defect's sign.

Fix a potential and let $M$ be its maximum edge error. For each residue $r$, read coordinate $r$ along $r,r+3,\ldots,r+3m$. The change in that coordinate at each step is at most $-\frac43+M$, so telescoping gives a total increase of at most $m(-\frac43+M)$. When summing over residues, move the three starting coordinates to the middle vertex of the starting triple and do the same at the end. Only the two outer coordinates in each triple move, each by at most $M$ since adjacent gains vanish. The coordinate sums at the two middle vertices are zero, so the sum of the three total increases is at least $-4M$. Thus $4m\le(3m+4)M$. The edge set is finite and nonempty, so some edge attains $M$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-three-tree-path-sup title="Exact Supremum over Third Powers of Paths" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.pathPowerThree_banach_sup_four_thirds"}
$$
\sup_{n\in\mathbb N}C_{\mathrm{Ban}}(P_n^3)=\frac43.
$$
:::

::: {.proof #pf-appe-three-tree-path-sup}
Taking $\varepsilon=1$ in [@thm-appe-three-tree-path-upper] gives an upper bound on every path coefficient. At width $3$, the fixed-width limit in [@thm-appe-chordal-banach-limit-two] gives $\lim_{n\to\infty}C_{\mathrm{Ban}}(P_n^3)=\frac43$, so the supremum is at least that limit. The hexagonal witness also illustrates the approach through finite graphs, since $\frac{4m}{3m+4}\to\frac43$. The full proof is checked by the Lean kernel.
:::

The path bound uses the linear order of the vertices. For general chordal graphs, an elimination order still reduces the problem to extending by one vertex at a time, provided the fit retains enough information on each predecessor triangle.

::: {.theorem #thm-appe-three-tree-chordal-upper title="Reconstruction Upper Bound for Chordal Graphs with Cliques of Size at Most Four" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.IsChordal.exists_cliqueFour_banach_gain_potential_polygon"}
Let $V$ be a finite type and $G$ a simple chordal graph on $V$ with every clique $C\subseteq V$ of cardinality at most $4$. Let $E$ be a real seminormed vector space, $g:V\times V\to E$, and $\varepsilon\in\mathbb R$ with $\varepsilon\ge0$. If $g$ is skew on all ordered pairs and has triangle defect at most $\varepsilon$ on $G$, then there exists a potential $\varphi:V\to E$ such that every directed edge $(i,j)$ satisfies

$$
\|g(i,j)-(\varphi(j)-\varphi(i))\|\le\frac{72537}{50000}\varepsilon.
$$
:::

::: {.proof #pf-appe-three-tree-chordal-upper}
**An invariant on triangles.** In reverse perfect elimination order, the earlier neighbors of each new vertex $z$ form a clique of size at most $3$. Write $r_{ab}=g(a,b)-(p(b)-p(a))$ and $\Delta_{abc}=g(a,b)+g(b,c)-g(a,c)$. On an ordered triangle $a<b<c$ already inserted, record $(A,C,t)=(r_{ab},r_{bc},\Delta_{abc})$. The remaining edge residual is $A+C-t$. For every continuous real linear functional $f$ of norm at most $1$ and every $\delta\ge\varepsilon$ with $\delta>0$, require $(f(A),f(C),f(t))/\delta$ to lie in a fixed convex polytope. This polytope is the convex hull of a $13$-sided polygon in the defect layer $t=1$ and its reflection in the layer $t=-1$. It bounds the absolute values of all three scalar residuals by $R=72537/50000$.

**Extending to a new vertex.** With $3$ predecessors, put $u=\Delta_{abz}$ and $v=\Delta_{bcz}$. The third new defect is $u+v-t$. Use the following middle residual.

$$
B=-\frac{1513}{5000}A+\frac{177}{500}C+\frac{50948}{100000}u-\frac{14557}{100000}v-\frac{15689}{100000}t.
$$

Set $p(z)=p(b)+g(b,z)-B$. The new residuals are $A+B-u$, $B$, and $B-C+v$. The $117$ sign-transition inequalities verify the $13$ boundary inequalities for each of $9$ transitions. Convex combinations cover all admissible scalar defects, so the three new faces $(A,B,u)$, $(A+C-t,B-C+v,u+v-t)$, and $(C,B-C+v,v)$ inherit the invariant. With $2$ predecessors $a<b$, use a virtual copy of $b$ to complete a face with $C=-A/(2R)$ and $t=0$. The midpoint of $g(a,z)-g(a,b)$ and $g(b,z)$ supplies a bridge gain, giving the two virtual child faces defects $-u/2$ and $u/2$. The actual child face then inherits the invariant. With $1$ predecessor use exact transport, and with none use zero.

**Returning to the seminorm.** Hahn–Banach gives a real linear functional of norm at most $1$ attaining the seminorm of each residual. The scalar estimate holds for every allowed $\delta$. Taking $\delta$ down to $\varepsilon$ gives $R\varepsilon$, including at $\varepsilon=0$. Each insertion preserves the earlier potential values, and skew symmetry gives the same bound on reverse edges. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-three-tree-clique-four-bracket title="Banach Coefficient Bounds for Clique Size at Most Four" lean="D5/S3/Combinatorics/Graph/Chordal/ThreeTreeBanachSharpBounds.SimpleGraph.cliqueFour_banach_coefficient_bounds"}
$$
\frac43\le S_4\le\frac{72537}{50000}<\frac32.
$$
:::

::: {.proof #pf-appe-three-tree-clique-four-bracket}
Third powers of paths are chordal because they have the interval representation $[i,i+3]$. In any clique the smallest and largest indices differ by at most $3$, so the clique has at most $4$ vertices. Every admissible coefficient in the definition of $S_4$ must bound the coefficients of these graphs, and [@thm-appe-three-tree-path-sup] gives the lower endpoint. Taking $\varepsilon=1$ in [@thm-appe-three-tree-chordal-upper] supplies an admissible coefficient and hence an upper bound on the infimum. The final strict inequality follows by comparing rationals. The full proof is checked by the Lean kernel.
:::

The exact value of $S_4$ remains open. The tighter analytic or computational bound $S_4\le1.37453$ and the resulting interval $[\frac43,1.37453]$, along with further results for general $k$, Hilbert spaces, and $L_1$, lie beyond the scope of the Lean declarations cited here. For reconstruction with spherical group-valued gains, see [Appendix E.8.1.7](appendix-e-s08-s01-s07-chordal-su2-sharp-bounds.md#sec-appe-chordal-su2-sharp-bounds).
