# E.8.1.7 Reconstruction Bounds for $\mathrm{SU}(2)$ Gains on Chordal Graphs {#sec-appe-chordal-su2-sharp-bounds}

Think of each directed edge gain as a unit quaternion. Transport along two edges multiplies their gains in order. If transport along two sides of each ordered triangle differs from direct transport by at most $\delta$, can we pick a local frame at every vertex with a uniform bound on the error along each edge? For any finite connected chordal graph, the coefficient $\frac{434}{125}=3.472<\frac72<4$ improves the general group-valued bound in [@thm-appe-chordal-uniform-gain-potential]. Small defects and small cliques let us use the local geometry of the sphere to obtain tighter bounds.

Write $U=\{q\in\mathbb H:\|q\|=1\}$ for the group of unit real quaternions, identified with $\mathrm{SU}(2)$. Its round distance is $d(q,r)=\arccos(\operatorname{Re}(q\bar r))$, with values in $[0,\pi]$. Left and right multiplication by unit quaternions each preserve this distance.

## E.8.1.7.1 Gains, Triangle Defects, and Potentials

::: {.definition #def-appe-chordal-su2-skew title="Skew Gains" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.SU2Skew"}
Let $V$ be any type, $G$ a simple graph on $V$, and $g:V\times V\to U$. The gain $g$ is skew on $G$ if $g(v,u)=g(u,v)^{-1}$ for every ordered pair $(u,v)$ of adjacent vertices.
:::

::: {.definition #def-appe-chordal-su2-triangle-bound title="Triangle Defect Bound" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.SU2TriangleBound"}
Let $V$ be any type, $G$ a simple graph on $V$, $g:V\times V\to U$, and $\delta\in\mathbb R$. The triangle defect of $g$ on $G$ is at most $\delta$ if for every $u,v,w\in V$ with edges $uv,vw,uw$, we have $d(g(u,v)g(v,w),g(u,w))\le\delta$.
:::

::: {.definition #def-appe-chordal-su2-fits title="Error Bound for a Potential" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.SU2Fits"}
Let $V$ be any type, $G$ a simple graph on $V$, $g:V\times V\to U$, $p:V\to U$, and $r\in\mathbb R$. The potential $p$ fits $g$ on $G$ with error at most $r$ if $d(g(u,v),p(u)^{-1}p(v))\le r$ for every ordered pair $(u,v)$ of adjacent vertices.
:::

## E.8.1.7.2 Reconstruction for Arbitrary Clique Size

::: {.theorem #thm-appe-chordal-su2-global title="Uniform Reconstruction Bound on Finite Connected Chordal Graphs" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_su2_gain_potential_global_sharp"}
Let $V$ be a finite type, $G$ a connected simple chordal graph on $V$, and $g:V\times V\to U$ skew on $G$. Let $\delta\in\mathbb R$ with $\delta\ge0$, and suppose the triangle defect of $g$ on $G$ is at most $\delta$. Then there is a potential $p:V\to U$ that fits $g$ on $G$ with error at most $\frac{434}{125}\delta$.
:::

::: {.proof #pf-appe-chordal-su2-global}
**From shadows to caps.** Partition the graph into layers by distance from a root. For a connected component of the subgraph at or above a given layer, its shadow consists of its neighbors in the preceding layer. Chordality makes the shadow a clique. The root serves as the anchor for the first layer. For each higher layer, the shadow has a common neighbor one layer further back that serves as its anchor. For a new vertex $x$ in the component, transport from the anchor $a$ through each predecessor $i$ gives a candidate $q_i=g(a,i)g(i,x)$, with the identity gain used for coincident vertices. The gains between predecessors in the anchor frame are $h_{ij}=g(a,i)g(i,j)g(a,j)^{-1}$. The triangle bound controls the distances of $h_{ij}$, $q_i^{-1}h_{ij}q_j$, and $h_{ij}h_{jk}h_{ki}$ from the identity.

**From holonomy to a radius.** With convex weights $w_i$, form the quaternionic Hermitian matrix $M_{ij}=\sqrt{w_iw_j}\,h_{ij}$. View it as a self-adjoint operator on a real inner-product space and use the first, second, and third eigenvalue moments to control Rayleigh quotients. The third moment is controlled by the real parts of the triangle holonomies. For $0\le\delta<\arccos(9/16)$, if the origin were in the convex hull, Carathéodory's theorem would give a witness using at most $5$ candidates. The spectral moment estimate excludes this witness, so the candidates lie in an open hemisphere. Normalizing the nonzero point in their convex hull closest to the origin gives the cap center. For $0\le\delta\le4/5$, the candidate diameter is at most $2\delta$, and the spherical Jung bound gives radius $R=\arccos\sqrt{(3\cos^2\delta-1)/2}$. In the higher defect range, the closest point is a convex combination of at most $4$ contact points, and the spectral estimate supplies a lower bound on its norm through the closed-form cosine

$$
H(t)=\frac{(1+2t)(1-3t-3t^2)}{\sqrt{1-2t-2t^2}}.
$$

When $0\le t\le1/4$, $4t^2+4t-1\ge0$, and $1-6t^2-4t^3\le\cos\delta$, a certified $0<s\le H(t)$ gives a cap of radius $R=\arccos s$.

**From caps to edges.** Transport the frame along the shared anchors and use each cap center to assign the potential. Across layers, a common candidate transport compares the two ends of an edge with total error at most $2R$. For adjacent vertices in the same layer, chordality forces one predecessor set to lie inside the other. After transport along the edge, candidates indexed by the smaller set are within $\delta$ of their counterparts, and the corresponding gains between predecessors agree. Put $K=434/125$. In the first range $0\le\delta\le4/5$, projection of a convex combination compares the centers within a layer. For $\delta\le1/2$ the trigonometric estimate is direct, and on $[1/2,4/5]$ a certificate with $15$ rational subintervals completes the bound $3\delta$ on every edge. In the second range $4/5<\delta$ with $K\delta\le\pi$, a certificate with $22$ rational subintervals controls $2R$. Within a layer, lower bounds on three Rayleigh quotients for the common matrix force three unit columns to have sufficiently large projections on the same quaternionic eigenline. If the centers were farther apart than $K\delta$, the pairings of the columns would violate the overlap inequality for those projections. Both certificates verify the inequalities with rational endpoints and alternating-series bounds for sine and cosine. For $K\delta>\pi$, the diameter of the sphere allows a constant potential. Inverting gains and using bi-invariance gives the same bound on reverse edges. The full proof is checked by the Lean kernel.
:::

## E.8.1.7.3 Simplicial Insertion at Small Defect

In reverse perfect elimination order, the earlier neighbors of the vertex $a$ being inserted form a clique. Each such neighbor $i$ gives a candidate $p(i)g(i,a)$ that fits the edge $ia$ exactly. If the earlier edges have error at most $r$, then any two candidates are at distance at most $\delta+r$ by invariance under multiplication on either side and the triangle inequality. A cap of radius $r$ lets us assign its center to $a$ and keep the earlier potential values. With no earlier neighbor, use the identity. The same error bound holds on reverse edges.

::: {.theorem #thm-appe-chordal-su2-small-two title="Reconstruction Bound for Defect at Most $\pi/6$" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_su2_gain_potential_small_defect_two"}
Let $V$ be a finite type, $G$ a simple chordal graph on $V$, and $g:V\times V\to U$ skew on $G$. Let $\delta\in\mathbb R$ with $0\le\delta\le\pi/6$, and suppose the triangle defect of $g$ on $G$ is at most $\delta$. Then there is a potential $p:V\to U$ that fits $g$ on $G$ with error at most $2\delta$.
:::

::: {.proof #pf-appe-chordal-su2-small-two}
Take $r=2\delta$. The candidates are pairwise at distance at most $3\delta\le\pi/2$, so their inner products are nonnegative and their convex hull avoids the origin. The spherical Jung bound in real dimension $4$ gives a center with inner product at least $\sqrt{(1+3\cos(3\delta))/4}$ with every candidate. The double- and triple-angle identities factor the difference of the squared cosine bounds as $(1-c)(4c+1)(4c^2-3)/4$, where $c=\cos\delta\ge\sqrt3/2$. The difference is nonnegative, so the lower bound on the inner products is at least $\cos(2\delta)$, and each insertion preserves the error bound. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-su2-small-eight-fifths title="Reconstruction Bound for Defect at Most $1/10$" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_su2_gain_potential_small_defect_eight_fifths"}
Let $V$ be a finite type, $G$ a simple chordal graph on $V$, and $g:V\times V\to U$ skew on $G$. Let $\delta\in\mathbb R$ with $0\le\delta\le1/10$, and suppose the triangle defect of $g$ on $G$ is at most $\delta$. Then there is a potential $p:V\to U$ that fits $g$ on $G$ with error at most $\frac85\delta$.
:::

::: {.proof #pf-appe-chordal-su2-small-eight-fifths}
Take $r=\frac85\delta$, so the candidate diameter is at most $r+\delta=\frac{13}{5}\delta\le\pi/2$. By the double-angle formula, the squared comparison required by the spherical Jung bound becomes $\frac32\sin^2(\frac{13}{10}\delta)\le\sin^2(\frac85\delta)$. Bound the sine on the left by $\sin x\le x$ and the sine on the right by $\sin x\ge x-x^3/6$. The constants satisfy $\sqrt{3/2}\cdot\frac{13}{10}\le\frac{637}{400}\le\frac{14936}{9375}$, and $\delta\le1/10$ gives $\frac{14936}{9375}\delta\le\sin(\frac85\delta)$. This gives the required cap radius, including when $\delta=0$. The full proof is checked by the Lean kernel.
:::

## E.8.1.7.4 Reconstruction for Small Cliques

If every clique has at most $k$ vertices, the vertex being inserted forms a clique with its earlier neighbors, so there are at most $k-1$ candidates. Any set of at most $4$ candidates lies in a closed hemisphere. Take a unit normal to their affine span and choose its sign so that their common inner product with it is nonnegative. With a triangle defect bound and fewer candidates, the radius can be reduced further.

::: {.theorem #thm-appe-chordal-su2-clique-three title="Reconstruction Bound for Cliques of Size at Most Three" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_cliqueThree_su2_gain_potential_min"}
Let $V$ be a finite type, $G$ a simple chordal graph on $V$, and $g:V\times V\to U$ skew on $G$. Let $\delta\in\mathbb R$ with $\delta\ge0$, and suppose the triangle defect of $g$ on $G$ is at most $\delta$. If every finite set of vertices forming a clique in $G$ has at most $3$ elements, then there is a potential $p:V\to U$ that fits $g$ on $G$ with error at most $\min(\delta,\pi/2)$.
:::

::: {.proof #pf-appe-chordal-su2-clique-three}
For $\delta<\pi/2$, take $r=\delta$. There are at most $2$ candidates, at distance at most $2\delta<\pi$ from each other. The midpoint of their shortest spherical arc is within $\delta$ of both. A single candidate serves as its own center. For $\delta\ge\pi/2$, use a closed hemisphere at each insertion, including at equality. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-su2-clique-four title="Reconstruction Bound for Cliques of Size at Most Four" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_cliqueFour_su2_gain_potential_two"}
Let $V$ be a finite type, $G$ a simple chordal graph on $V$, and $g:V\times V\to U$ skew on $G$. Let $\delta\in\mathbb R$ with $\delta\ge0$, and suppose the triangle defect of $g$ on $G$ is at most $\delta$. If every finite set of vertices forming a clique in $G$ has at most $4$ elements, then there is a potential $p:V\to U$ that fits $g$ on $G$ with error at most $2\delta$.
:::

::: {.proof #pf-appe-chordal-su2-clique-four}
For $\delta\le\pi/5$, the spherical Jung bound for at most $3$ candidates gives radius $2\delta$. For $\pi/5<\delta<\pi/4$, form the quaternionic Hermitian matrix using weights for the closest point of the candidate convex hull, repeating candidates to fill the list as needed. The first and second spectral moments are $1$ and $1$, and the triangle holonomies give the third moment a lower bound of $1-2(1-c)/9$, where $c=\cos\delta$. The old edge errors and the triangle defect give lower bounds on two Rayleigh quotients. A uniform endpoint estimate using $\sqrt{2}/2\le c\le5/6$ compares the moments with these quotients and excludes a closest point of norm below $\cos(2\delta)$. Normalizing that point gives the required center. At $\delta=\pi/4$ and above, the closed hemisphere radius $\pi/2$ is at most $2\delta$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-su2-clique-five title="Closed-Hemisphere Reconstruction for Cliques of Size at Most Five" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalSU2SharpBounds.SimpleGraph.IsChordal.exists_cliqueFive_su2_gain_potential_half_pi"}
Let $V$ be a finite type, $G$ a simple chordal graph on $V$, and $g:V\times V\to U$ skew on $G$. If every finite set of vertices forming a clique in $G$ has at most $5$ elements, then there is a potential $p:V\to U$ that fits $g$ on $G$ with error at most $\pi/2$.
:::

::: {.proof #pf-appe-chordal-su2-clique-five}
At each insertion there are at most $4$ candidates. Their affine span has dimension at most $3$. Use the unit normal of the closed hemisphere just described as the potential value. The extension needs only the clique bound and inversion on reverse edges, so it applies with arbitrary triangle defects. The full proof is checked by the Lean kernel.
:::

## E.8.1.7.5 Current Bounds and Estimates Awaiting Formalization

The optimal uniform coefficient remains open. Estimates beyond the results in this section include the universal upper coefficient $3.44569$ and the finite-curvature lower coefficient on the fourth power of a path $P_{2000}^4$, namely $1.241>\sqrt{3/2}$. For clique sizes at most $5$ and $6$, respectively, the upper coefficients are $\pi/\arccos(1/3)$ and $2\arccos(-1/4)/\arccos(1/6)$. These bounds and the tangent lower bound for the width-$4$ path-power family are proved in [Appendix E.8.1.9](appendix-e-s08-s01-s09-hilbert-reversal-circle-su2.md#sec-appe-hilbert-reversal-circle-su2).
