# E.8.1.9 Hilbert and Real $L_1$ Coefficient Reversal, Circle Gains, and $\mathrm{SU}(2)$ Bounds {#sec-appe-hilbert-reversal-circle-su2}

With the same budget for triangle defects, how does changing the target of the gains affect reconstruction? For cliques of size at most $4$, real $L_1$ has a smaller uniform coefficient than real inner-product spaces. At clique size at most $5$, the order reverses. On path powers, gains in a fixed circle subgroup have optimal uniform coefficient $1$ even when the potential can range over the entire unit-quaternion group. For unrestricted gains, the width-$4$ family gives a lower bound of $\sqrt{3/2}$ in the round metric. A layered construction on chordal graphs gives upper bounds from spherical caps.

## E.8.1.9.1 Euclidean Projection and Clique Bounds in Inner-Product Spaces

Write $\mathbb R^d$ for real coordinate space with its Euclidean norm. For a gain $g:V\times V\to E$ in a real normed space on a simple graph $G$, the additive triangle defect is $\|g(a,b)+g(b,c)-g(a,c)\|$ when $ab,bc,ac$ are edges. The error of a potential $p:V\to E$ on the directed edge $ab$ is $\|g(a,b)-(p(b)-p(a))\|$. A uniform error bound applies to every directed edge at once.

Let $n=\lvert V\rvert$. Set $\alpha_n=(n-2)/n$ for $n\ge3$ and $\alpha_n=1$ otherwise. The subtraction and division in this ratio are real operations.

::: {.theorem #thm-appe-hilbert-reversal-plane title="Finite-Order Reconstruction Bound in the Euclidean Plane" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_euclideanPlane_gain_potential"}
Let $V$ have a finite enumeration (Fintype), let $G$ be a simple chordal graph on $V$, and let $g:V\times V\to\mathbb R^2$ and $\delta\in\mathbb R$ with $\delta\ge0$. If $g(b,a)=-g(a,b)$ on each edge $ab$ and every ordered triangle has additive defect at most $\delta$, there is a potential $p:V\to\mathbb R^2$ with error at most $\alpha_n(4/\pi)\delta$ on every directed edge.
:::

::: {.proof #pf-appe-hilbert-reversal-plane}
Project the gains onto scalar directions. Triangulating a simple cycle of length $\ell$ gives at most $\ell-2$ defects. For $n\ge3$, distributing the projected defect budget along the cycle costs at most a factor of $\alpha_n$ per edge. Add this allowance to each directed weight so that all closed walks have nonnegative weight. Shortest walk weights give a scalar potential. Removing nonnegative closed subwalks reduces the minimum to finitely many paths, so the potentials depend continuously on the projection direction. Integrate them against a rotationally invariant Gaussian measure. Its second moment recovers the vector gain, and the radial and absolute coordinate moments give $4/\pi$. With fewer than $3$ vertices, integration along edges gives an exact fit. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-hilbert-reversal-space-three title="Finite-Order Reconstruction Bound in Euclidean Three-Space" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_euclideanSpaceThree_gain_potential"}
Let $V$ have a finite enumeration (Fintype), let $G$ be a simple chordal graph on $V$, and let $g:V\times V\to\mathbb R^3$ and $\delta\in\mathbb R$ with $\delta\ge0$. If $g(b,a)=-g(a,b)$ on each edge $ab$ and every ordered triangle has additive defect at most $\delta$, there is a potential $p:V\to\mathbb R^3$ with error at most $\alpha_n(3/2)\delta$ on every directed edge.
:::

::: {.proof #pf-appe-hilbert-reversal-space-three}
The same cycle-length factor $\alpha_n$ bounds the error of the scalar shortest-walk potentials in each direction. Average over three-dimensional Gaussian directions and normalize by the coordinate second moment so that integrating the projections recovers the original vector. The radial and absolute coordinate moments in this dimension give $3/2$. With fewer than $3$ vertices, the potential fits every edge exactly. The full proof is checked by the Lean kernel.
:::

In an arbitrary real inner-product space, inner-product identities control small sets of candidate potentials. Insert vertices in reverse simplicial elimination order so that the earlier neighbors form a clique. Each earlier neighbor $i$ gives the candidate $p(i)+g(i,a)$ for the new vertex $a$. To carry the estimate forward, control both the new edge errors and the sums of squared residuals on cliques that combine old and new edges.

::: {.theorem #thm-appe-hilbert-reversal-four-upper title="Inner-Product Reconstruction with Clique Size at Most Four" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_cliqueFour_hilbert_gain_potential"}
Let $V$ be a finite type (Finite), and let $G$ be a simple chordal graph on $V$ with at most $4$ vertices in every finite clique. Let $E$ be a normed additive commutative group with a real inner-product space structure. Suppose $g:V\times V\to E$ satisfies $g(b,a)=-g(a,b)$ for all $a,b\in V$. If $\delta\in\mathbb R$, $\delta\ge0$, and every ordered triangle has additive defect at most $\delta$, then some potential $p:V\to E$ has error at most $(259/200)\delta$ on every directed edge.
:::

::: {.proof #pf-appe-hilbert-reversal-four-upper}
Rescale a positive budget to $1$. With at most $3$ earlier neighbors, center the old edge residuals and triangle defects using their opposite means to compute the sum of squared differences between candidates. Bound the variance with convex weights on the contact points of a smallest enclosing ball, using a short candidate edge when needed. Polynomial inequalities on two subintervals show that inserting the center bounds each new edge error by $259/200$ and each new triangle's sum of squared residuals by $23/5$. Induct and rescale to the original budget. At budget $0$, integrate the gains exactly using chordality. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-hilbert-reversal-four-single title="Single-Interval Reconstruction Bound with Clique Size at Most Four" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_cliqueFour_hilbert_gain_potential_zeroSplit"}
Let $V$ be a finite type (Finite), and let $G$ be a simple chordal graph on $V$ with at most $4$ vertices in every finite clique. Let $E$ be a normed additive commutative group with a real inner-product space structure. Suppose $g:V\times V\to E$ satisfies $g(b,a)=-g(a,b)$ for all $a,b\in V$. If $\delta\in\mathbb R$, $\delta\ge0$, and every ordered triangle has additive defect at most $\delta$, then some potential $p:V\to E$ has error at most $(13/10)\delta$ on every directed edge.
:::

::: {.proof #pf-appe-hilbert-reversal-four-single}
Rescale a positive budget to $1$ and use $93/20$ as the upper bound on the sum of squared residuals on each triangle. The polynomials in the enclosing-ball estimate are nonnegative linear combinations of products of powers of the squared defect and its complement. This verifies the insertion bound $13/10$ on the whole unit interval. Induct and rescale to the original budget. At budget $0$, use exact integration. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-hilbert-reversal-five-upper title="Inner-Product Reconstruction with Clique Size at Most Five" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.IsChordal.exists_cliqueFive_hilbert_gain_potential"}
Let $V$ be a finite type (Finite), and let $G$ be a simple chordal graph on $V$ with at most $5$ vertices in every finite clique. Let $E$ be a normed additive commutative group with a real inner-product space structure. Suppose $g:V\times V\to E$ satisfies $g(b,a)=-g(a,b)$ for all $a,b\in V$. If $\delta\in\mathbb R$, $\delta\ge0$, and every ordered triangle has additive defect at most $\delta$, then some potential $p:V\to E$ has error at most $\sqrt{10275/4576}\,\delta$ on every directed edge.
:::

::: {.proof #pf-appe-hilbert-reversal-five-upper}
Rescale a positive budget to $1$ and maintain bounds of $329/50$ and $621/50$ on the sums of squared residuals of triangles and four-vertex cliques, respectively. With $4$ earlier neighbors, the squared norm of the cycle component of the old residuals is $1/4$ of the sum of the squared oriented face sums. Remove that component to bound the squared differences between candidates. The contact-weight variance estimate then bounds the enclosing radius. The old face energies, the new face distance estimates, and the spare radius of candidates inside the ball preserve both invariants. Induct and rescale to the original budget. At budget $0$, use exact integration. The full proof is checked by the Lean kernel.
:::

## E.8.1.9.2 Reversal of the Uniform Coefficients

Use the notation $U(G,E,C)$ introduced before [@thm-appe-chordal-exact-pair-retention]. Every gain that is skew on all ordered pairs and has triangle defect at most $1$ must admit a potential with error at most $C$ on each directed edge. The uniform upper-bound sets below require $C\ge0$ and quantify over every $n\in\mathbb N$ and every simple chordal graph $G$ on $\mathrm{Fin}(n)$ with cliques of size at most $k$. For each such $G$, they require $U(G,E,C)$ for every target type $E$ in the given class.

- $\mathcal H_k$ consists of bounds for all normed additive commutative groups with a real inner-product space structure. Put $H_k=\inf\mathcal H_k$.
- $\mathcal F_k$ consists of bounds for all finite real coordinate $\ell_1$ spaces. The index type $I$ has a finite enumeration (Fintype), and the target is the space of real functions on $I$ with its $\ell_1$ norm.
- $\mathcal L_k$ consists of bounds for all real $L_1(\mu)$ spaces. The underlying type $\Omega$ carries a measurable structure and $\mu$ is any measure on it.
- $\mathcal B_k$ consists of bounds for all real Banach spaces, with the structures of a normed additive commutative group, a real normed space, and a complete space.

Let $B_4$ be the Banach coefficient in [@thm-appe-three-tree-clique-four-bracket]. Its definition takes the infimum of the nonnegative uniform bounds for simple chordal graphs on arbitrary finitely enumerated vertex types, with cliques of size at most $4$ and all real Banach targets. Here too the gains are globally skew with triangle defect at most $1$.

::: {.theorem #thm-appe-hilbert-reversal-four-separation title="Separation of Coefficients with Clique Size at Most Four" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.hilbert_cliqueFour_phase_separation"}
We have $1<2/\sqrt3\le H_4\le259/200<4/3\le B_4$.
:::

::: {.proof #pf-appe-hilbert-reversal-four-separation}
Third powers of paths are chordal with cliques of size at most $4$. Their regular-simplex lower bound [@thm-appe-chordal-exact-hilbert-simplex] gives $\sqrt{2-2/3}=2/\sqrt3$, so the infimum of the uniform bounds also satisfies it. At unit budget, [@thm-appe-hilbert-reversal-four-upper] places $259/200$ in the admissible set. The Banach lower bound gives the last inequality. Squaring and comparing fractions give the two strict inequalities. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-hilbert-reversal-five-separation title="Separation of Coefficients with Clique Size at Most Five" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.hilbert_cliqueFive_phase_separation"}
We have $H_5\le\sqrt{10275/4576}<2997/2000<3/2$. For every $C\in\mathbb R$, if $C\in\mathcal F_5$, then $3/2\le C$.
:::

::: {.proof #pf-appe-hilbert-reversal-five-separation}
[@thm-appe-hilbert-reversal-five-upper] gives an admissible upper bound. Squaring and comparing fractions give the strict inequalities. Any $C\in\mathcal F_5$ must work on all fourth powers of paths in the real coordinate space of the balanced-cut construction. The even-width formula in [@thm-appe-chordal-exact-l1-even-path] gives, at width $4$, $2-2/4=3/2$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-hilbert-reversal-comparison title="Reversal of the Real $L_1$ and Inner-Product Coefficients" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/HilbertCliquePhaseReversal.SimpleGraph.realL1_hilbert_banach_phase_reversal"}
We have $\inf\mathcal L_4=1$ and $1<H_4$. We also have $H_5<3/2\le\inf\mathcal L_5\le\inf\mathcal B_5$.
:::

::: {.proof #pf-appe-hilbert-reversal-comparison}
For cliques of size at most $4$, the real $L_1$ Jung bound gives coefficient $1$. Apply [@thm-appe-chordal-exact-l1-clique-four] with counting measure on one point for the reverse inequality. The two inner-product inequalities follow from the preceding separation results. A finite real coordinate $\ell_1$ space is isometric to real $L_1$ for the corresponding counting measure, so the lower bound for $\mathcal F_5$ applies to $\mathcal L_5$. Real $L_1$ spaces are complete, so $\mathcal B_5\subseteq\mathcal L_5$. The group bound for cliques of size at most $5$ supplies a common admissible bound $3$, allowing comparison of the infima. The full proof is checked by the Lean kernel.
:::

## E.8.1.9.3 The Exact Coefficient for Circle Gains on Path Powers

Write $P_n^k$ for the $k$th power of a path on $\mathrm{Fin}(n)$, with edges between distinct indices at distance at most $k$. Use the conventions for skewness, triangle defect, and fitting in [@def-appe-chordal-su2-skew], [@def-appe-chordal-su2-triangle-bound], and [@def-appe-chordal-su2-fits]. The unit-quaternion group $U$ carries the round metric $d$. Parametrize the fixed circle by $\operatorname{ph}(t)=\cos t+\mathbf i\sin t$, where $\mathbf i$ is the first imaginary quaternion unit. The circle condition applies to edge gains.

::: {.theorem #thm-appe-circle-path-upper title="Circle-Gain Upper Bound at Every Path-Power Width" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/CircleCoefficient.SimpleGraph.CirclePowerPath.powerPath_circle_coefficient_one"}
Let $n,k\in\mathbb N$ and let $g:\mathrm{Fin}(n)\times\mathrm{Fin}(n)\to U$ reverse by inversion on the edges of $P_n^k$. Suppose every directed edge $ij$ admits $t\in\mathbb R$ with $\operatorname{ph}(t)=g(i,j)$. If $\delta\in\mathbb R$, $\delta\ge0$, and the triangle defect is at most $\delta$, there is a potential $p:\mathrm{Fin}(n)\to U$ fitting $g$ on $P_n^k$ with error at most $\delta$.
:::

::: {.proof #pf-appe-circle-path-upper}
Width $0$ has no edges. Otherwise choose real angles for the gains. If $\delta<\pi/2$, the oriented sum of the four principal triangle angles of a four-vertex clique is a multiple of $2\pi$ of absolute value less than $2\pi$, so it vanishes. Recursion along the path integrates the principal angles into a skew real edge lift. Fit a real potential to the lift and take its circle phase. If $\delta\ge\pi/2$, divide the path into blocks of length equal to the width, anchor each block at its first vertex, and assign potentials in two orthogonal complex lines in alternation. The triangle bound controls errors within a block, and errors between adjacent blocks equal $\pi/2$. The full proof is checked by the Lean kernel.
:::

To test smaller coefficients, take a positive integer $L$, put $\varepsilon_L=\pi/(4L)$, and define $g_L(i,j)=\operatorname{ph}(\varepsilon_L A(i,j))$ on $P_{2L+2}^2$. Write $s_i=(-1)^i$. For $i<j$, set $A(i,i+1)=-s_i/2$, $A(i,i+2)=s_i$, and all other forward values to zero. Reverse values are negatives and diagonal values are zero. The next two theorems use this same gain.

::: {.theorem #thm-appe-circle-path-exact-defect title="The Squared-Path Witness Attains Its Defect Bound" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/CircleCoefficient.SimpleGraph.CirclePowerPath.sharpGain_exact_defect"}
For every positive integer $L$, the triangle defect of $g_L$ on $P_{2L+2}^2$ is at most $\varepsilon_L$. There are pairwise adjacent $i,j,l\in\mathrm{Fin}(2L+2)$ with $d(g_L(i,j)g_L(j,l),g_L(i,l))=\varepsilon_L$.
:::

::: {.proof #pf-appe-circle-path-exact-defect}
An increasing triangle uses three consecutive indices. The angle weights of the two steps of length $1$ cancel, and the edge of length $2$ leaves an oriented weight of absolute value $1$. Reversing the orientation changes the sign and gives the same bound. On $(0,1,2)$ the phase difference has absolute value $\varepsilon_L\le\pi$, so its round distance equals that absolute value. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-circle-path-ambient-lower title="Squared-Path Lower Bound for Unit-Quaternion Potentials" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/CircleCoefficient.SimpleGraph.CirclePowerPath.sharpGain_ambient_lower"}
Let $L$ be a positive integer, $p:\mathrm{Fin}(2L+2)\to U$, and $r\in\mathbb R$. If $p$ fits $g_L$ on $P_{2L+2}^2$ with error at most $r$, then $\varepsilon_L L/(L+1)\le r$.
:::

::: {.proof #pf-appe-circle-path-ambient-lower}
Follow the even indices from $0$ to $2L$, cross to $2L+1$, then follow the odd indices back to $1$ and close the cycle. Each step of length $2$ contributes angle weight $1$, and the two joining edges cancel, giving total angle $2L\varepsilon_L=\pi/2$. The potential differences multiply to the identity around the cycle. Bi-invariance and the triangle inequality give $\pi/2\le(2L+2)r$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-circle-path-exact-coefficient title="Exact Uniform Coefficient for Circle Gains on Path Powers" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/CircleCoefficient.SimpleGraph.CirclePowerPath.admissible_iff_one_le"}
Let $C\in\mathbb R$. For every $n,k\in\mathbb N$, every gain $g:\mathrm{Fin}(n)\times\mathrm{Fin}(n)\to U$ taking values in $\operatorname{ph}(\mathbb R)$ on the directed edges of $P_n^k$ and reversing by inversion there, and every nonnegative real budget $\delta$, suppose the triangle defect is at most $\delta$. Then some $p:\mathrm{Fin}(n)\to U$ fits $g$ with error at most $C\delta$. This property holds if and only if $1\le C$.
:::

::: {.proof #pf-appe-circle-path-exact-coefficient}
By [@thm-appe-circle-path-upper] and $\delta\ge0$, every $C\ge1$ is admissible. Conversely, given $C<1$, choose $L$ with $L/(L+1)>C$. The preceding two theorems give a finite squared path with positive budget $\varepsilon_L$ on which every unit-quaternion potential requires an error bound greater than $C\varepsilon_L$. The full proof is checked by the Lean kernel.
:::

## E.8.1.9.4 From the Round Metric to Euclidean Three-Space

On a finite simple graph $G$, let $\mathcal R(G,C)$ mean that for every $g:V\times V\to U$ and every strictly positive real $\delta$, if $g$ reverses by inversion on edges and has triangle defect at most $\delta$, then some $p:V\to U$ has round error at most $C\delta$ on every directed edge. As the gains approach the identity, this round-metric estimate transfers to the three-dimensional space of imaginary quaternions.

::: {.theorem #thm-appe-su2-tangent-transfer title="Three-Dimensional Tangent Transfer on a Fixed Connected Graph" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/SU2TangentLower.SimpleGraph.SU2Tangent.fixed_graph_euclidean_three_transfer"}
Let $V$ be a finite type (Finite) and $G$ a connected simple graph on $V$. Let $C\in\mathbb R$ with $C\ge0$. If $\mathcal R(G,C)$, then $U(G,\mathbb R^3,C)$.
:::

::: {.proof #pf-appe-su2-tangent-transfer}
Embed the Euclidean gains isometrically as pure imaginary quaternions and use them as velocities at the identity to define small unit-quaternion gains. The round triangle defects divided by the scale tend to the Euclidean triangle defects. Apply $\mathcal R(G,C)$ and normalize the resulting potential to the identity at one vertex. Connectedness provides finite walks from this vertex, so the edge estimates control the displacements from the identity. Take imaginary parts of the rescaled displacements. The first-order errors tend to zero, giving a Euclidean fit for every positive slack. Finite-dimensional closure removes the slack. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-su2-tangent-scaled title="Three-Dimensional Tangent Transfer at Every Nonnegative Budget" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/SU2TangentLower.SimpleGraph.SU2Tangent.fixed_graph_euclidean_three_scaled"}
Let $V$ be a finite type (Finite) and $G$ a connected simple graph on $V$. Let $C\in\mathbb R$ with $C\ge0$ and suppose $\mathcal R(G,C)$. Let $a:V\times V\to\mathbb R^3$ satisfy $a(v,u)=-a(u,v)$ for every $u,v\in V$. If $\delta\in\mathbb R$, $\delta\ge0$, and every ordered triangle of $a$ has additive defect at most $\delta$, there is $p:V\to\mathbb R^3$ with error at most $C\delta$ on every directed edge.
:::

::: {.proof #pf-appe-su2-tangent-scaled}
For any slack $\eta>0$, normalize the gains to unit budget using the positive scale $\delta+\eta/(C+1)$. Apply [@thm-appe-su2-tangent-transfer] and scale back to get error at most $C\delta+\eta$. Potential differences on the finite graph form a closed finite-dimensional linear subspace, so the limiting budget is attained. This includes $\delta=0$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-su2-tangent-width-four-lower title="Round-Metric Lower Bound for the Width-Four Path-Power Family" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/SU2TangentLower.SimpleGraph.SU2Tangent.round_width_four_family_lower"}
Let $C\in\mathbb R$ with $C\ge0$. If $\mathcal R(P_n^4,C)$ for every $n\in\mathbb N$, then $\sqrt{3/2}\le C$.
:::

::: {.proof #pf-appe-su2-tangent-width-four-lower}
Every nonempty fourth power of a path is connected, so tangent transfer applies to each such fixed graph. The Euclidean fitting condition on the empty graph holds vacuously. Double the vertices of a regular tetrahedron of diameter $1$ and centroid zero. Their mean squared distance to any center is $3/2$ plus the squared norm of the center. Thus one vertex is at distance at least $\sqrt{3/2}$. Apply [@thm-appe-chordal-exact-doubled-radius] using all path lengths. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-su2-tangent-width-four-obstruction title="Finite Round-Metric Obstruction Below the Width-Four Lower Bound" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/SU2TangentLower.SimpleGraph.SU2Tangent.exists_round_width_four_obstruction"}
Let $C\in\mathbb R$ with $0\le C<\sqrt{3/2}$. There are $n\in\mathbb N$, $g:\mathrm{Fin}(n)\times\mathrm{Fin}(n)\to U$, and a real $\delta>0$ such that $g$ reverses by inversion on the edges of $P_n^4$ and every ordered triangle has round defect at most $\delta$. For every $p:\mathrm{Fin}(n)\to U$, some directed edge $uv$ of $P_n^4$ satisfies $C\delta<d(g(u,v),p(u)^{-1}p(v))$.
:::

::: {.proof #pf-appe-su2-tangent-width-four-obstruction}
If $\mathcal R(P_n^4,C)$ held at every finite length, it would contradict [@thm-appe-su2-tangent-width-four-lower]. Expanding the negation at a length where it fails gives the gain, positive budget, and, for each potential, a directed edge exceeding the proposed bound. The full proof is checked by the Lean kernel.
:::

## E.8.1.9.5 Spherical Caps Across Defect Budgets

The layered construction in [@thm-appe-chordal-su2-global] uses the anchor of each shadow clique as a reference frame and encloses the two-edge transports through predecessors in a spherical cap. Two distances to a common candidate bound the error across layers. Edges within a layer require a comparison between cap centers. At small defect, the geometry of the candidate convex hull controls both estimates.

::: {.theorem #thm-appe-su2-caratheodory-small title="Carathéodory Small-Defect Bound at Arbitrary Clique Size" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2CaratheodoryBounds.SimpleGraph.IsChordal.exists_su2_gain_potential_caratheodory"}
Let $V$ be a finite type (Finite), let $G$ be a simple chordal graph on $V$, and let $g:V\times V\to U$ reverse by inversion on its edges. Let $\delta\in\mathbb R$ with $0\le\delta\le\arcsin\sqrt{5/12}$ and suppose every ordered triangle has round defect at most $\delta$. Then some $p:V\to U$ fits $g$ on $G$ with error at most $2\arcsin(\sqrt{3/2}\sin\delta)$.
:::

::: {.proof #pf-appe-su2-caratheodory-small}
In each connected component, form layers by distance from a root. The transports through predecessors from the anchor give candidates at pairwise distance at most $2\delta$. The inequality $\sin^2\delta\le5/12$ and Carathéodory's theorem in four dimensions exclude the origin from their convex hull. The closest point to the origin lies in a supporting hyperplane and is a convex combination of at most $4$ contact points. Its squared norm is at least $1-(3/2)\sin^2\delta$. Normalizing it gives a cap of radius $R=\arcsin(\sqrt{3/2}\sin\delta)$. Across layers, comparison through a common candidate bounds the error by $2R$. Within a layer, one endpoint's predecessor set contains the other's, and paired candidates differ by at most $\delta$ after transport along the edge. Use the convex weights of the closest point for the smaller set to compare the two normalized centers and obtain the same $2R$ bound. Join the component potentials. The full proof is checked by the Lean kernel.
:::

For larger defects, match a linear error budget to a fixed cap radius. With cliques of size at most $5$, [@thm-appe-chordal-su2-clique-five] gives a closed hemisphere. With cliques of size at most $6$, inserting a vertex requires a cap for at most $5$ candidates.

::: {.theorem #thm-appe-su2-caratheodory-six-cap title="Fixed Spherical Cap Bound with Clique Size at Most Six" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2CaratheodoryBounds.SimpleGraph.IsChordal.exists_cliqueSix_su2_gain_potential_cap"}
Let $V$ be a finite type (Finite) and $G$ a simple chordal graph on $V$ with at most $6$ vertices in every finite clique. Let $g:V\times V\to U$ reverse by inversion on its edges. There is $p:V\to U$ fitting $g$ on $G$ with error at most $\arccos(-1/4)$.
:::

::: {.proof #pf-appe-su2-caratheodory-six-cap}
Reverse simplicial elimination leaves at most $5$ candidates $p(i)g(i,a)$ at each insertion. If their convex hull does not contain the origin in its interior, use the unit normal of a separating or supporting hyperplane. If it does, the hull is a four-dimensional simplex. At least one vertex has barycentric weight at the origin at most $1/5$. The unit normal to the opposite facet, pointing toward that vertex, has common inner product at least $-1/4$ with the other vertices. Use the cap center as the new potential and the identity when the candidate set is empty. Bi-invariance and inversion bound the errors in both directions, and earlier edges retain their bounds. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-su2-caratheodory-five title="All-Defect Reconstruction with Clique Size at Most Five" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2CaratheodoryBounds.SimpleGraph.IsChordal.exists_cliqueFive_su2_gain_potential_caratheodory"}
Let $V$ be a finite type (Finite) and $G$ a simple chordal graph on $V$ with at most $5$ vertices in every finite clique. Let $g:V\times V\to U$ reverse by inversion on its edges. Let $\delta\in\mathbb R$ with $\delta\ge0$ and suppose every ordered triangle has round defect at most $\delta$. There is $p:V\to U$ fitting $g$ on $G$ with error at most $(\pi/\arccos(1/3))\delta$.
:::

::: {.proof #pf-appe-su2-caratheodory-five}
Set $b=\arccos(1/3)/2$. The small-defect radius $R(\delta)=\arcsin(\sqrt{3/2}\sin\delta)$ is convex on $[0,b]$, with $R(0)=0$ and $R(b)=\pi/4$. Thus $2R(\delta)$ lies below the secant line through the endpoints of its graph on this interval, with equality allowed. Above $b$, use the closed hemisphere fit with error at most $\pi/2$, the value of the same increasing line at $b$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-su2-caratheodory-six title="All-Defect Reconstruction with Clique Size at Most Six" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2CaratheodoryBounds.SimpleGraph.IsChordal.exists_cliqueSix_su2_gain_potential_caratheodory"}
Let $V$ be a finite type (Finite) and $G$ a simple chordal graph on $V$ with at most $6$ vertices in every finite clique. Let $g:V\times V\to U$ reverse by inversion on its edges. Let $\delta\in\mathbb R$ with $\delta\ge0$ and suppose every ordered triangle has round defect at most $\delta$. There is $p:V\to U$ fitting $g$ on $G$ with error at most $(2\arccos(-1/4)/\arccos(1/6))\delta$.
:::

::: {.proof #pf-appe-su2-caratheodory-six}
Set $b=\arccos(1/6)/2=\arcsin\sqrt{5/12}$. On $[0,b]$, convexity gives $2R(\delta)\le 2R(b)\delta/b$, with $2R(b)=\arccos(-1/4)$. Above $b$, the fixed cap in [@thm-appe-su2-caratheodory-six-cap] gives an error bound at most the value of that same line at the current budget. The full proof is checked by the Lean kernel.
:::

## E.8.1.9.6 Scope of the Coefficients

The width-$4$ tangent lower bound concerns the entire path-power family. A bound at a specified finite path length, including a stronger numerical lower bound at finite curvature, requires a witness for that length. The optimal uniform round coefficient for arbitrary clique size remains open. Further estimates beyond the scope of these results include the global bound $C_{\mathrm{Hilb}}^*<1+\sqrt2$, the bound $H_4<1.199724$ at clique size at most four, the bound $C_{\mathbb R^3}^{(6)}<\sqrt2$ at clique size at most six, and the global bound $C_{\mathrm{SU}(2)}^*\le3.439$.
