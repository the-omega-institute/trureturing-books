# E.8.1.8 Exact Chordal Banach Reconstruction Strata {#sec-appe-chordal-banach-exact-strata}

Given gains on edges, how well can vertex potentials fit all of them if the only control comes from triangle defects? The longest cycle determines the exact scalar coefficient. Group-valued reconstruction on path powers has three distinct regimes, while real $L_1$ and inner-product bounds depend on radii of finite point sets. Stacked three-trees let us compare ancestral and offline budgets, and a weighted staircase graph measures the extra cost of requiring a linear filling.

Let $G$ be a simple graph on $V$. Unless a statement specifies edgewise skewness, an additive gain is skew on all ordered pairs, with $g(v,u)=-g(u,v)$. Its triangle defect is at most $\varepsilon$ if $\|g(a,b)+g(b,c)-g(a,c)\|\le\varepsilon$ whenever $ab,bc,ac$ are edges. A potential $p$ has edge error $\|g(a,b)-(p(b)-p(a))\|$, with absolute value for scalar gains. Group-valued gains reverse by inversion on edges. Their triangle defect and edge error are $d(g(a,b)g(b,c),g(a,c))$ and $d(g(a,b),p(a)^{-1}p(b))$, respectively. In a bi-invariant pseudometric, left and right multiplication are isometries.

## E.8.1.8.1 Scalar circumference, modular reduction, and group strata

::: {.theorem #thm-appe-chordal-exact-scalar-circumference title="Exact Scalar Circumference Reconstruction" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.scalar_circumference_exact"}
Let $G$ be a simple chordal graph on a finite vertex set $V$. Let $L$ be the length of a longest simple cycle and suppose a cycle of that length exists. Both assertions hold.

1. Every real gain $g$ that is skew on the edges of $G$ and has absolute defect at most $1$ on every ordered triangle admits a potential with error at most $1-2/L$ on every directed edge.
2. There is a real gain $g$ with $g(b,a)=-g(a,b)$ for every ordered pair and $|g(a,b)+g(b,c)-g(a,c)|\le1$ for every ordered triple. Every potential has some directed edge with error at least $1-2/L$.
:::

::: {.proof #pf-appe-chordal-exact-scalar-circumference}
Triangulating a simple cycle of length $\ell$ bounds its signed gain sum in absolute value by $\ell-2$. Adding $1-2/L$ to every directed weight makes simple cycles and backtracks nonnegative. Split closed walks at repeated vertices and use shortest walk costs as the potential. For the lower bound, rank vertices in the order of a longest cycle with its final edge removed. Use the sign of the rank difference as the gain. Each edge on the cycle contributes $1$ except the closing edge, which contributes $-1$. Potential differences telescope, so some edge attains the required lower bound. The full proof is checked by the Lean kernel.
:::

Fix a spanning tree $T$. The canonical integer cochain vanishes on tree edges and uses one coordinate per cotree edge, assigning the corresponding basis vector in increasing vertex order and its negative in reverse. The defect set contains zero and every ordered triangle defect. Reconstruction with $k$ terms from $U$ means there is a potential such that each directed residual is a sum of $k$ elements of $U$, with repetition allowed.

::: {.theorem #thm-appe-chordal-exact-modulus title="Finite Modulus Decides Abelian Reconstruction" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.GainReduction.finite_modulus_decides_abelian_reconstruction"}
Let $V$ be finite and linearly ordered, let $G$ be simple and chordal, and let $T$ be a spanning tree of $G$. Take natural numbers $k,q$ with $q>3k+1$. The following are equivalent.

1. Reduce the canonical integer cochain and its defect set coordinatewise modulo $q$. The resulting cochain can be reconstructed using $k$ terms from the reduced defect set.
2. For every abelian group $A$ in the same type universe as $V$, every $g:V\times V\to A$, and every $U\subseteq A$, if $g$ is skew on edges and its defect set is contained in $U$, then $g$ can be reconstructed using $k$ terms from $U$.
:::

::: {.proof #pf-appe-chordal-exact-modulus}
Lift the modular edge residuals to short integer sums, taking opposite lifts on opposite orientations. The discrepancy around a triangle is a multiple of $q$ in each coordinate with absolute value at most $3k+1$, so it vanishes. Chordality lets the lifted edge differences integrate to a potential. In an arbitrary abelian group, first remove the potential integrated on the tree, then map each cotree basis vector to the normalized gain of that edge. The map sends canonical defects into $U$ and preserves short sums. For the reverse direction, take the canonical modular cochain itself. The full proof is checked by the Lean kernel.
:::

A triangle shows the endpoint of the lifting estimate. Take $k=3$ and $q=10$, with canonical gains $1,0,0$ around the triangle. Use residual $-3$ on each edge, a sum of three allowed terms $-1$. The gains minus these residuals sum to $10$ around the triangle, so they arise from a potential modulo $10$. Each residual has a unique integer representative in $[-3,3]$. The same modular potential therefore has no integer lift satisfying these short-residual constraints.

Write $P_n^k$ for the path power on $\mathrm{Fin}(n)$, with edges between distinct indices at distance at most $k$. A uniform group coefficient $C$ is nonnegative and works for every $n$, every group with a bi-invariant pseudometric, and every gain that reverses by inversion and has triangle defect at most $1$. It guarantees a potential with error at most $C$ on every edge.

::: {.theorem #thm-appe-chordal-exact-group-path title="Exact Group Strata for Path Powers" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.pathPower_group_exact_strata"}
Let $k\in\mathbb N$ with $1\le k$, and let $C\in\mathbb R$. Then $C$ is a uniform group coefficient for the family of $k$th powers of paths if and only if $C\ge0$ when $k=1$, $C\ge1$ when $k=2$, and $C\ge2$ when $k\ge3$.
:::

::: {.proof #pf-appe-chordal-exact-group-path}
Integrating the gains on consecutive edges handles the first two widths. At width $2$, a nonflat triangle in an integral word metric forces error at least $1$. At width $k\ge3$, on $9k$ vertices use cyclic factors modulo $9$, with $k-1$ factors. A fit below $2$ permits only unit word residuals. The long edges in each phase together with the two end blocks would force every coordinate of a zero-sum displacement to be positive. The uniform interval-graph upper bound gives $2$. The full proof is checked by the Lean kernel.
:::

For a fixed graph $G$, an admissible group coefficient likewise requires $C\ge0$ and guarantees the fit on $G$ for every such gain with triangle defect at most $1$. The target group ranges over the same type universe as the vertex type.

::: {.theorem #thm-appe-chordal-exact-group-integral title="Integral Group Coefficient on Connected Chordal Graphs" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.group_coefficient_integral"}
Let $G$ be a connected simple chordal graph on a finite linearly ordered vertex set. There is $k\in\mathbb N$ with $k\le4$ such that, for every $C\in\mathbb R$, $C$ is admissible for $G$ if and only if $k\le C$.
:::

::: {.proof #pf-appe-chordal-exact-group-integral}
Normalize tree edges to the identity. Use the free group on cotree edges with letters given by the triangle holonomies and their conjugates. Closed-walk factorization guarantees that the letters generate the free group, and the resulting bi-invariant word metric has integer distances. Every normalized target gain is an image of the canonical free-group gain. The triangle bound sends each letter into the unit ball, so the integer word budget transfers to every target. The free group gives the reverse bound. The universal four-defect estimate puts the least feasible integer at most $4$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-group-width-three title="Cyclic Abelian Witness at Width Three" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.pathPower_width_three_cyclic_exact"}
If 14 ≤ n, under the ChordalPath49.cayleyMetric instance there is g : Fin n → Fin n → ChordalPath49.M with inverse reversal on pathPower n 3 edges, triangle group-distance defect at most 1, a potential with edge error at most 2, and, for every potential, an edge with error at least 2.
:::

::: {.proof #pf-appe-chordal-exact-group-width-three}
The target is cyclic of order $49$ with the specified Cayley word metric. Gains on consecutive edges are zero, so a fit below $2$ requires consecutive potential increments in the unit word ball. Checking the last two increments under the period-three gain rule leaves no extension by vertex $14$. The third power of a path is chordal with clique size at most $4$, so the clique-four bound gives a matching fit. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-group-split-four title="Eight-Vertex Split-Graph Witness at Clique Four" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.split_clique_four_group_witness"}
Under the ChordalEightVertex.cayleyMetric instance, the eight-vertex graph is chordal, every clique has cardinality at most 4, and a clique A has independent complement Aᶜ. Its specified abelian gain has triangle defect at most 1, a potential with edge error at most 2, and, for every potential, an edge with error at least 2.
:::

::: {.proof #pf-appe-chordal-exact-group-split-four}
Attach one vertex to each triangular face of a $4$-clique. The specified Cayley gain takes values in $11$ cyclic factors of order $8$. Translate the potential to be zero at one central vertex. An error below $2$ constrains differences in the central clique to a finite word ball. Checking those states excludes an extension to all $4$ outer vertices. The split-graph construction supplies a fit with error at most $2$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-group-subtwo title="Two Finite Abelian Witnesses Exclude a Strictly Sub-Two Fit" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.not_subtwo_finite_group"}
Let subtwo_finite_group_claim be the source-defined proposition saying that either the specified cyclic path witness or the eight-vertex split-graph witness has a fitting potential with error strictly less than 2. Then the proposition is false.
:::

::: {.proof #pf-appe-chordal-exact-group-subtwo}
The cyclic word witness and the eight-vertex residual witness exclude the two disjuncts separately. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-group-clique-four title="Group-Valued Upper Bound at Clique Four" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_clique_four_group_gain_potential"}
Let $G$ be a finite simple chordal graph with at most $4$ vertices in each clique. Let $H$ be a group with a bi-invariant pseudometric and let $g:V\times V\to H$ reverse by inversion on edges, with triangle defect at most $\varepsilon\ge0$. Then there is a potential $p:V\to H$ with error at most $2\varepsilon$ on every directed edge.
:::

::: {.proof #pf-appe-chordal-exact-group-clique-four}
The clique-four algebraic factorization writes each residual as a product of at most two triangle defects. Bi-invariance turns the word-length bound into the distance bound. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-group-clique-five title="Group-Valued Upper Bound at Clique Five" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_clique_five_group_gain_potential"}
Let $G$ be a finite simple chordal graph with at most $5$ vertices in each clique. Let $H$ be a group with a bi-invariant pseudometric and let $g:V\times V\to H$ reverse by inversion on edges, with triangle defect at most $\varepsilon\ge0$. Then there is a potential $p:V\to H$ with error at most $3\varepsilon$ on every directed edge.
:::

::: {.proof #pf-appe-chordal-exact-group-clique-five}
The clique-five factorization uses at most three triangle defects, giving 3 ε. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-group-clique-number title="Group-Valued Bound for Arbitrary Clique Number" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_clique_number_group_gain_potential"}
Let $G$ be a finite simple chordal graph with at most $k\in\mathbb N$ vertices in each clique. Let $H$ be a group with a bi-invariant pseudometric and let $g:V\times V\to H$ reverse by inversion on edges, with triangle defect at most $\varepsilon\ge0$. Then there is a potential $p:V\to H$ with error at most $(k-1)\varepsilon$ on every directed edge, where $k-1$ is truncated at zero in the natural numbers before casting to the reals.
:::

::: {.proof #pf-appe-chordal-exact-group-clique-number}
For $k\le2$ there are no triangles, and integrating on the forest gives an exact fit. The clique-four construction handles $3\le k\le4$, and the universal four-defect estimate handles $k\ge5$. In these ranges, respectively, $2\le k-1$ and $4\le k-1$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-group-walk-factors title="Triangle Factorization of Closed Walks" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.closed_walk_triangle_factors"}
Let $V$ be finite, let $G$ be simple and chordal, and let $H$ be a group. Suppose $g:V\times V\to H$ reverses by inversion on edges. Every closed walk $p$ admits an ordered list of factors in $H$ of length at most the length of $p$ minus $2$, with natural-number subtraction truncated at zero. Their product is the ordered product of the gains along $p$. Each factor has the form $qg(a,b)g(b,c)g(c,a)q^{-1}$ for some $q\in H$ and edges $ab,bc,ca$.
:::

::: {.proof #pf-appe-chordal-exact-group-walk-factors}
Rotate the walk to a simplicial vertex in the subgraph induced by its support. Delete a backtrack there, or use the edge between its neighbors to cut off a triangle. Apply induction to the shorter walk and conjugate back to the original basepoint. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-tree-spanner title="Tree-Spanner Approximation Bound" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_tree_spanner_approximate_gain_potential"}
Let $G$ be a finite simple chordal graph and let $T$ be a spanning tree in which the endpoints of each edge of $G$ are at distance at most $t\in\mathbb N$. Let $H$ be a group with a bi-invariant pseudometric and let $g:V\times V\to H$ reverse by inversion on edges, with triangle defect at most $\varepsilon\ge0$. Then there is a potential $p:V\to H$ with error at most $((t:\mathbb R)-1)\varepsilon$ on every directed edge.
:::

::: {.proof #pf-appe-chordal-exact-tree-spanner}
Integrating along tree paths accumulates at most t − 1 triangle defects on an edge of G. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-radius title="Radius Approximation Bound" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_radius_approximate_gain_potential"}
Let $G$ be a finite connected simple chordal graph and let $o\in V$ be at graph distance at most $r\in\mathbb N$ from every vertex. Let $H$ be a group with a bi-invariant pseudometric and let $g:V\times V\to H$ reverse by inversion on edges, with triangle defect at most $\varepsilon\ge0$. Then there is a potential $p:V\to H$ with error at most $(2r-1)\varepsilon$ on every directed edge, with subtraction in the reals.
:::

::: {.proof #pf-appe-chordal-exact-radius}
The paths from the root to the two endpoints have total length at most 2 r, so the tree-path estimate gives (2 r − 1) ε. The full proof is checked by the Lean kernel.
:::

## E.8.1.8.2 Ancestors, closed recurrences, and Hilbert bounds

::: {.theorem #thm-appe-chordal-exact-ancestor title="Banach Potential on Bounded Ancestor Edges of a Rooted Tree" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsTree.exists_ancestor_banach_gain_potential"}
Let $S$ be a tree on $V$ with a chosen root and let $k$ be a positive integer. In the ancestor graph, two vertices are adjacent when one is a strict ancestor of the other and their tree distance is at most $k$. Let $E$ be a real seminormed space and let $g:V\times V\to E$ be globally skew with triangle defect at most $\varepsilon\ge0$ on the ancestor graph. There is a potential $p:V\to E$ with error at most $(2-2/k)\varepsilon$ on every directed edge of that graph.
:::

::: {.proof #pf-appe-chordal-exact-ancestor}
For each residue class of depths modulo $k$, integrate along the marked ancestors, then extend to the vertex. On an ancestor edge the endpoint depths differ by at most $k$, so comparing these paths charges at most one triangle defect per endpoint, with no charge at a marked endpoint. Each endpoint is marked in exactly one residue class. Averaging the $k$ potentials gives $2-2/k$. The full proof is checked by the Lean kernel.
:::

The pair-retention family starts with an $m$-clique. At each generation and for each pair in a current bag, attach a clique containing that pair and $n$ new vertices. Iterate for $D$ generations. Write $U(G,E,C)$ for the property that every globally skew gain into a real seminormed space $E$ with triangle defect at most $1$ has a potential with error at most $C$ on every edge.

::: {.theorem #thm-appe-chordal-exact-pair-retention title="Exact Pair-Retention Coefficient at Arbitrary Depth" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.PairRetention.family_exact"}
Let $m,n,D\in\mathbb N$ with $3\le m$. For every nonzero real normed space $E$ and every $C\in\mathbb R$, $U(G,E,C)$ holds if and only if $1-2/(m(n+1)^D)\le C$, where $G$ is the pair-retention graph just defined.
:::

::: {.proof #pf-appe-chordal-exact-pair-retention}
The complete-graph root layer gives 1 − 2 / m. The extension recurrence and an exponentially long cycle give the upper and lower bounds, which combine into the displayed equality. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-doubled-radius title="Power-Path Coefficients Dominate Twice the Radius" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.powerPath_uniform_ge_doubled_radius"}
Let $E$ be a real seminormed space, let $k$ be a positive integer, and let $C,r\in\mathbb R$ with $0\le C$. Suppose $U(P_n^k,E,C)$ holds for every $n\in\mathbb N$. Let $x:\mathrm{Fin}(k)\to E$ have $\|x_a-x_b\|\le1$ for all $a,b$. If for every $y\in E$ there is some $a$ with $r\le\|2x_a-y\|$, then $r\le C$.
:::

::: {.proof #pf-appe-chordal-exact-doubled-radius}
Translate one point to the origin. In each phase, assign its point to short forward edges and twice that point to edges of length $k$. The diameter bound controls the triangle defects. Sum the potential increments along each phase. Comparing phases via short edges in the first and last rows encloses the doubled points in a ball of radius at most $C+2C/M$, where $M$ is the number of full phase cycles. Letting $M$ grow removes the endpoint correction. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-hilbert-jung title="Hilbert Jung Clique Bound" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_hilbert_jung_gain_potential"}
Let $V$ be finite and $G$ chordal. Let $k\in\mathbb N$ with $1\le k$ and suppose every clique has size at most $k+1$. Let $E$ be a real inner-product space, and let $g:V\times V\to E$ be globally skew with triangle defect at most $\varepsilon\ge0$. There is a potential $\phi:V\to E$ with error at most $\dfrac{J_k}{1-J_k}\varepsilon$ on every directed edge, where $J_k=\sqrt{(k-1)/(2k)}$.
:::

::: {.proof #pf-appe-chordal-exact-hilbert-jung}
Insert vertices in reverse perfect elimination order. There are at most $k$ candidate potential values. If old edges have error at most $R$, the candidates have diameter at most $R+\varepsilon$, and the finite inner-product Jung bound gives radius $J_k(R+\varepsilon)$. Taking $R=J_k\varepsilon/(1-J_k)$ preserves the error bound. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-hilbert-simplex title="Hilbert Regular-Simplex Lower Bound for Power Paths" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.hilbert_powerPath_uniform_lower"}
Let $k$ be a positive integer and $C\ge0$. If $U(P_n^k,\mathbb R^k,C)$ holds for every $n\in\mathbb N$, with the Euclidean norm on $\mathbb R^k$, then $\sqrt{2-2/k}\le C$.
:::

::: {.proof #pf-appe-chordal-exact-hilbert-simplex}
Scale the coordinate unit vectors of $\mathbb R^k$ to obtain a regular simplex of diameter one. For the doubled vertices, the mean squared distance to any center equals $2-2/k$ plus the squared distance from the center to their centroid. Thus the farthest vertex lies at distance at least $\sqrt{2-2/k}$. Apply the doubled-radius bound. The full proof is checked by the Lean kernel.
:::

## E.8.1.8.3 Real $L_1$, separators, and path witnesses

::: {.theorem #thm-appe-chordal-exact-l1-jung title="Real $L_1$ Jung Clique Bound" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.IsChordal.exists_l1_jung_gain_potential"}
Let $G$ be a finite simple chordal graph and let $m\in\mathbb N$ with $1\le m$, with every clique of size at most $2m+2$. On any measure space $(\Omega,\mu)$, let $g$ be a globally skew gain into real $L_1(\mu)$ with triangle defect at most $\varepsilon\ge0$. There is a potential with error at most $(2m-1)\varepsilon$ on every directed edge.
:::

::: {.proof #pf-appe-chordal-exact-l1-jung}
The finite odd-family center radius in L₁ is 1 − 1 / (2 m). Substitution into the finite-center formula gives 2 m − 1. The full proof is checked by the Lean kernel.
:::

Taking $m=1$ gives coefficient at most $1$ for clique size at most $4$. Taking $m=2$ gives coefficient at most $3$ for clique size at most $6$.

::: {.theorem #thm-appe-chordal-exact-l1-clique-four title="Exact Real L₁ Coefficient at Clique Four" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.l1_clique_four_exact"}
Let $(\Omega,\mu)$ be a measure space with nonzero real $L_1(\mu)$, and let $C\in\mathbb R$. For every $n\in\mathbb N$ and every simple chordal graph $G$ on $\mathrm{Fin}(n+1)$ whose cliques have at most $4$ vertices, $U(G,L_1(\mu),C)$ holds. This assertion is equivalent to $1\le C$.
:::

::: {.proof #pf-appe-chordal-exact-l1-clique-four}
The clique-four Jung upper bound is 1, and a chordal-fan limit gives the lower bound. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-l1-uniform-jung title="Exact Uniform Jung Radius in Real L₁" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.ChordalL1.l1_uniform_jung_exact"}
Let m,k ∈ ℕ with 0 < m and 2 m ≤ k ≤ 2 m + 1. For C ∈ ℝ, the following are equivalent. For every Ω : Type with MeasurableSpace Ω, every Measure μ, and every Finset s of Lp ℝ 1 μ, if s.card ≤ k and every two members have distance at most 1, there is c : Lp ℝ 1 μ with distance at most C from every member. The second assertion is
$$
1-\frac{1}{2(m:\mathbb R)}\le C.
$$
:::

::: {.proof #pf-appe-chordal-exact-l1-uniform-jung}
A balanced-cut family with counting measure gives the lower bound, and the odd-family center theorem gives the upper bound. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-l1-even-path title="Exact Real L₁ Coefficient for Even-Width Power Paths" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.l1_even_powerPath_exact"}
Let $m$ be a positive integer and let $C\in\mathbb R$. Let $E$ be the real coordinate space with the $\ell_1$ norm indexed by all permutations of $2m$ labels. Then $C\ge0$ and $U(P_n^{2m},E,C)$ for every $n\in\mathbb N$ if and only if $2-2/(2m)\le C$.
:::

::: {.proof #pf-appe-chordal-exact-l1-even-path}
The balanced-cut family gives the doubled-radius lower bound, and the Banach power-path upper bound gives the reverse implication. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-l1-path104 title="Three-Dimensional Real L₁ Lower Bound on the 104-Vertex Fourth Power" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.BanachPathPower.path104_l1_three_lower"}
If $U(P_{104}^4,\ell_1^3,C)$, where the target is real three-dimensional space with the $\ell_1$ norm, then $75/53\le C$ and $\sqrt2<75/53$.
:::

::: {.proof #pf-appe-chordal-exact-l1-path104}
The four tetrahedral sign vectors with coordinates of absolute value $1/4$ in $\ell_1^3$ have diameter $1$. After doubling them, each coordinate has two positive and two negative values, so the mean distance from any center is at least $3/2$. With $4$ phases and $25$ steps, the phase endpoint estimate bounds that mean by $C(1+(2/25)(3/4))=53C/50$. Solving gives $C\ge75/53$, and squaring gives $75/53>\sqrt2$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-group-separator title="Group Bound from Clique-Tree Separators" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.CliqueTreeGroupSeparator.cliqueTree_separator_group_potential"}
Let V be finite, let T,G,K form IsCliqueTree T G K, and suppose adjacent bag intersections are nonempty with cardinality at most s. Under Group H, PseudoMetricSpace H, IsIsometricSMul H H, and IsIsometricSMul Hᵐᵒᵖ H, if g is inverse-reversed on G-edges, δ ≥ 0, and the triangle defect is at most δ, there is a potential with edge error at most (max 1 s : ℕ) δ.
:::

::: {.proof #pf-appe-chordal-exact-group-separator}
Anchor each bag at its oldest vertex and freeze each potential value upon first appearance. In comparing the endpoints of an edge, each charged anchor change uses a different older vertex of the first relevant separator. At most $s-1$ changes are charged, and closing the edge costs one more triangle defect. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-l1-separator title="L₁ Bounds for Separators of Size Two through Five" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.CliqueTreeL1Separator.cliqueTree_l1_separator_potential"}
Let $G$ have a finite vertex set and a clique tree $T$ with a finite bag index set. Let $q\in\{2,3,4,5\}$, and suppose each adjacent bag intersection has size at most $q$. For every globally skew gain $g$ into real $L_1$ of any measure space with triangle defect at most $\varepsilon\ge0$, there is a potential with error at most $c(q)\varepsilon$ on every directed edge, where $c(2)=1$, $c(3)=5/3$, $c(4)=3$, and $c(5)=25/7$.
:::

::: {.proof #pf-appe-chordal-exact-l1-separator}
Assign each new vertex a convex combination of the mean separator candidate and a Jung center. For separator sizes $3$ and $5$ the weights balance errors on old–new edges and edges between new vertices. An empty separator permits an independent clique potential, and running intersection makes the extensions agree. The full proof is checked by the Lean kernel.
:::

## E.8.1.8.4 Banach clique trees, rolling cliques, and linear fillings

::: {.theorem #thm-appe-chordal-exact-clique-tree-height title="Finite-Height Banach Clique-Tree Formula" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.cliqueTree_height_banach_gain_potential"}
Let V and I be finite, let T,G,K form IsCliqueTree T G K, let adjacent bag intersections be nonempty with cardinality at most q, where 2 ≤ q, and let the distance from a root r to every bag index be at most h. If E has SeminormedAddCommGroup and NormedSpace ℝ E instances, g is skew, ε ≥ 0, and the triangle defect is at most ε, there is a potential with edge error at most
$$
\left((q:\mathbb R)-1-((q:\mathbb R)-2)\left(\frac{(q:\mathbb R)-1}{q}\right)^h\right)\varepsilon.
$$
:::

::: {.proof #pf-appe-chordal-exact-clique-tree-height}
The clique-tree diameter is at most 2 h. Substitution of h into the closed radius recurrence gives the displayed expression. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-clique-tree-two title="Banach Bound Two under Mixed Separator Rules" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.SimpleGraph.CliqueTreeBanachOverlap.cliqueTree_banach_two"}
Let $G$ have a finite vertex set and a finite clique tree rooted at bag $r$. For each nonroot bag, let $S$ be its intersection with its parent and let $U$ be the parent’s intersection with the grandparent, taking $U$ empty when the parent is the root. At least one condition must hold.

- The parent is the root.
- $|S|\le3$.
- $4\le|S|\le6$ and $|U|\le2$.
- $4\le|S|\le5$ and $|S\cap U|\le1$.

Let $E$ be a real seminormed space and let $g$ be globally skew with values in $E$ and triangle defect at most $\varepsilon\ge0$. Then there is a potential with error at most $2\varepsilon$ on every directed edge.
:::

::: {.proof #pf-appe-chordal-exact-clique-tree-two}
The root layer uses the allowed separator rule, and later layers recurse along the tree. All mixed separator cases combine into twice the defect. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-rolling-potential title="Potential Bound for Span-One Rolling Cliques" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.RollingCliques.SpanOne.exists_potential"}
Let M,n,k ∈ ℕ with 2 ≤ M. On the graph in Omega.RollingCliques.SpanOne, if E has SeminormedAddCommGroup and NormedSpace ℝ E instances, g is skew, ε ≥ 0, and every graph triangle has defect at most ε, there is a potential φ with edge error at most
$$
\left(2-\frac{2}{(M:\mathbb R)^2}\right)\varepsilon.
$$
:::

::: {.proof #pf-appe-chordal-exact-rolling-potential}
Every cross-block edge joins a parent block to an immediate child block. Define the potential along histories, averaging over the $M^2$ retained labels in the parent. Internal edges cost at most one defect. In the cross-block average one term vanishes, and each remaining term costs at most two defects. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-rolling-l1 title="Exact Rolling-Clique L₁ Coefficient at Even Labels" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.RollingCliques.SpanOne.uniform_l1_exact"}
Let $M\ge2$ be even and let $C\in\mathbb R$. Let $E$ be the real coordinate space with the $\ell_1$ norm indexed by all permutations of $M^2$ labels. Then $U(G,E,C)$ holds for every span-one rolling clique graph $G$ at every depth and replication parameter if and only if $2-2/M^2\le C$.
:::

::: {.proof #pf-appe-chordal-exact-rolling-l1}
The preceding potential gives the upper bound. For the lower bound, use a full history spine with a balanced-cut family on its $M^2$ retained labels. Gains at the ends use one sample, and the gains between internal layers use sums of two samples, so each triangle defect reduces to a within-block difference. Telescoping along paths with common endpoints and increasing the depth removes the endpoint correction. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-stacked-orders title="Total-Order Curvature Stratum on Stacked Three-Trees" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.StackedTriangleCurvature.Build.total_order_curvature_stratum"}
Let $n\in\mathbb N$ and let $b$ be a stacking obtained from a triangle by $n$ insertions on triangular faces. All three assertions hold.

1. The curvature vectors of globally skew real gains with absolute value at most $1$ on every face form exactly the convex hull of total-order curvature vectors. A total order is represented by an injection $r$ from the vertices into $\mathbb R$.
2. The polytope of valid curvatures of $b$ has exactly $2\cdot3^n$ extreme points. In terms of the total number of vertices $N=n+3$, this is $2\cdot3^{N-3}$.
3. For every edge-gain array $z$ with $\sum_v z(u,v)=0$ at every vertex $u$, there is such an injection $r$ for which the triangle-filling norm equals the pairing of $z$ with the order gain of $r$, and the pairing for any other injection $s$ is at most that value.
:::

::: {.proof #pf-appe-chordal-exact-stacked-orders}
Each attachment gives $3$ new faces whose consistently oriented curvatures sum to the parent curvature. On a slice with parent curvature fixed, a linear objective is maximized by assigning $-1$ and $1$ to the least and greatest weights. An old extreme point has exactly $3$ extensions as extreme points, obtained by inserting the new vertex into the parent vertex order. The root face supplies $2$ initial extreme points. The quotient of the face-chain $\ell_1$ norm by the boundary kernel gives the filling norm, with these bounded curvatures as its dual tests. The full proof is checked by the Lean kernel.
:::

An ancestral fit on a single-copy history assigns each vertex $v$ a real edge chain with boundary $v$ minus the root, supported on edges in its ancestral history. On each directed edge the edge chain corrected by the chains of its endpoints must have triangle-filling dual norm at most the budget. Banach feasibility on a stacking means that every globally skew gain into any real Banach space with triangle defect at most $1$ has a potential with edge error at most the budget.

::: {.theorem #thm-appe-chordal-exact-causal-limit title="Limit Equivalence of Banach and Ancestral Causal Budgets" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.PureThreeTree.banach_causal_limit_for_build"}
Let $R\in\mathbb R$ with $R\ge0$. The following are equivalent.

1. For every $m\in\mathbb N$, every stacking $b$ with $m$ insertions, and every $\varepsilon>0$, Banach reconstruction on $b$ is feasible at budget $R+\varepsilon$, quantifying over target types in the base universe.
2. For every $n\in\mathbb N$ and every $\varepsilon>0$, ancestral reconstruction on the single-copy depth-$n$ history is feasible at budget $R+\varepsilon$.
:::

::: {.proof #pf-appe-chordal-exact-causal-limit}
A replicated history graph has a finite stacking presentation, so the budget for all stackings applies to that graph. Average the offline chain rule over permutations of copies and restrict each vertex chain to its own history. The resulting error correction tends to zero as the copy count increases. Split any positive relaxation between the starting budget and this correction. In reverse, copy the ancestral rule to the history graph and transfer it to each stacking by a retraction preserving edge and triangle defects. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-banach-to-causal title="Banach-to-Causal Transfer at a Replication Factor" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.PureThreeTree.banach_to_causal"}
Let $n,k\in\mathbb N$ with $k>0$, and let $R,\varepsilon\in\mathbb R$ with $R\ge0$ and $\varepsilon>0$. If the depth-$n$ history with $k+1$ copies per insertion is uniformly Banach feasible at budget $R$ for targets in the base universe, then ancestral reconstruction on the single-copy depth-$n$ history is feasible at budget $(R+\varepsilon)+2(R+\varepsilon)/k$.
:::

::: {.proof #pf-appe-chordal-exact-banach-to-causal}
At the positive relaxation $R+\varepsilon$, turn the Banach budget into an offline edge-chain rule. Average over copy permutations and retract each vertex chain to its own spine. Prescribing one more copy choice reduces the discrepancy between the paired retractions by a geometric factor. Summation gives the additional error $2(R+\varepsilon)/k$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-appe-chordal-exact-causal-to-banach title="Ancestral Causal Transfer to Every Stacked Three-Tree" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.Omega.PureThreeTree.banach_of_causal_for_build"}
Let $b$ be a finite stacking with $m$ insertions. If ancestral reconstruction on the single-copy depth-$m$ history is feasible at budget $R$, then every globally skew gain on $b$ into any real Banach space $E$ with triangle defect at most $1$ admits a potential with error at most $R$ on every directed edge.
:::

::: {.proof #pf-appe-chordal-exact-causal-to-banach}
Assign each new vertex a fresh copy index and a history retaining its attaching triangle. The image of the stacking is closed under history prefixes. Its simplicial retraction preserves the triangle defect bound for pulled-back gains, and the copied ancestral rule supplies the potential on the original stacking. The full proof is checked by the Lean kernel.
:::

On the weighted five-label binary staircase graph, a common envelope $c$ supplies coordinatewise capacities for triangle fillings. Each admissible demand requires a valid filling whose edge boundary is the corresponding lane flow and whose coordinate magnitudes are bounded by the same $c$. For a linear envelope, one real linear map on the demand space must provide all the fillings.

::: {.theorem #thm-appe-chordal-exact-envelope title="Linear Filling Gap on the Weighted Binary Staircase Five-Tree" lean="D5/S3/Combinatorics/Graph/Chordal/Reconstruction/ChordalBanachExactStrata.FiveLaneRouting.BinaryStaircase.exact_graph_envelope_costs"}
On this weighted five-tree, a common envelope attains total cost $16/15$, and every common envelope has total cost at least $16/15$. A common linear envelope attains total cost $32/25$, and every common linear envelope has total cost at least $32/25$.
:::

::: {.proof #pf-appe-chordal-exact-envelope}
Project old and new face coordinates onto pair routings at each cap and slab side. Unrestricted routing on the five labels requires total capacity $10/3$. For linear routing, taking the trace of the divergence identity forces capacity at least $4$. Lifting the optimal capacities back along triangle strips gives weighted graph costs $16/15$ and $32/25$. The full proof is checked by the Lean kernel.
:::

## E.8.1.8.5 Frozen boundary

subtwo_cyclic_path_claim and subtwo_finite_group_claim are predicate definitions in the source file. The frozen theorem not_subtwo_finite_group proves that the latter is false. The 80-vertex clique-five group witness, strict-branching Banach disproofs for rolling trees, signed-star upper bounds below 2, Hilbert–$L_1$ reversals at clique cutoffs $5$ through $10$, and the $689/200$ $\mathrm{SU}(2)$ improvement remain outside Lean-verified theorem boxes.

This page corresponds to the frozen ChordalBanachExactStrata declarations from the merge recorded in trureturing PR #35073. The book cites only the 34 public theorem anchors, while open problems retain their open status.
