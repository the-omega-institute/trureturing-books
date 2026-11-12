# Entanglement Weaves Space: Tensor Networks, Holographic Duality, and the Discrete Min-Cut Theorem

> *"Point C is not an independently known quantity but a projection of overlap: one definite quantum state determines only a line; a collection of states can span an area."*

In [Chapter 2](ch02-born-rule.md) and [Chapter 3](ch03-projectors-and-duality.md), we emphasized a basic dimensional fact of linear algebra: in the global Hilbert space, **a single definite pure quantum state determines only a rank-one idempotent projector line** ($\rho = \lvert\Psi\rangle\langle\Psi\rvert$, $\operatorname{rank}\rho = 1$). Once we partition a composite system across a bipartite interface $\mathcal{H}_L \otimes \mathcal{H}_R$ and view the amplitude tensor via **tensor flattening** as a linear map from the right subsystem to the left subsystem (or trace out one side to form the reduced density matrix $\rho_L = \Tr_R\lvert\Psi\rangle\langle\Psi\rvert$), however, a qualitative leap appears: a single product basis vector $\lvert 0\rangle_L \otimes \lvert 0\rangle_R$ still has bipartite **Schmidt rank** $1$, whereas spanning a bipartite cross-section of Schmidt rank greater than $1$ and transmitting multiple distinguishable parallel channels across the cut requires a **collection of orthogonal local channel states** superposed coherently across the interface (for instance, the two-qubit Bell state $\lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ has global pure-state density rank $1$, yet pairs two orthogonal local states across the cut so that both its bipartite flattening map and its reduced state $\rho_L$ have rank $\operatorname{rank}\rho_L = 2$).

The opening epigraph takes this linear-algebraic fact as the intuitive bridge to tensor networks: when we move from a single state ray to a **tensor network** wired together by contracted bond indices, how is the maximum entanglement rank ("flow") transmissible across the network constrained by the narrowest bottleneck cross-section ("cut capacity") inside it?

In keeping with our three-tier epistemological contract and the discrete facet-stitching principle (R3), this chapter maintains three strict boundaries:

1. **Lean-verified finite-dimensional bridge-graph theorems**: In the `BridgeGraph` module family, for the width-three (`Fin 3`) Kronecker bridge contraction $\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r$, we prove attainment of maximal rank ([@lemma-bridge-flow-attained]), the universal min-cut upper bound ([@prop-bridge-flow-cut-bound]), simplification of the min-cut on the quadratic cone ([@cor-bridge-cone-mincut]), and the exact discrete quantum max-flow min-cut theorem on the ordered cone ([@thm-bridge-quantum-maxflow-mincut]);
2. **Discrete log-capacity polyhedral facets and seam stitching (R3)**: Passing to logarithmic bond-capacity coordinates ([@ex-log-capacity-facets]), we show how the lower envelope of three affine hyperplanes carves out discrete polyhedral facets joined along the bottleneck seam $ad = bc$;
3. **Literature boundary for continuum holography**: Multi-scale entanglement renormalization ansatz (MERA) schematics and the continuum AdS/CFT Ryu–Takayanagi (RT) minimal-surface formula are confined to an explicit literature remark ([@rem-ryu-takayanagi-literature]), never conflated with our finite-dimensional width-three bridge theorem.

::: {.figure src="ch19-overview"}
**Figure 19.** The chapter at a glance. Panel I: in a binary layered network, the 4 amber legs along the bottom are cut off by just the 2 bonds marked magenta (a schematic model). Panel II: on the width-three bridge graph $(a, b, c, d) = (2, 3, 2, 3)$, the two magenta min cuts above and below have capacity $ad = bc = 6$, and flow equals cut ([@thm-bridge-quantum-maxflow-mincut]). Panel III: in log capacity, the blue $ad$ facet and the orange $bc$ facet join into one bent line at the dashed vertical seam; the violet tag is the RT formula (literature result, not formalized in this book).
:::

## Entanglement hierarchies and finite tensor networks {#sec-mera-hierarchy}

Suppose two composite quantum subsystems — a left boundary and a right boundary — communicate through an intermediate network of contracted tensor legs. If only a single one-dimensional scalar wire links the two sides, the induced linear map across the cut has rank at most $1$ regardless of how large the boundary Hilbert spaces are. When multiple internal bonds bridge the interface in parallel, the operator rank across the cut (the number of nonzero Schmidt singular values) can grow with the product of the bond dimensions.

::: {.viz src="layered-network-cut" preset="one" height="500"}
**One site: the cut is its own leg.** Site 16 at the bottom of the layered network forms the amber interval on its own, and the magenta minimal cut severs only that one leg. A single bond crosses the cut, so the rank across it is at most the dimension of that bond; only when more bonds are cut does the bound become the product of their dimensions.
:::

As illustrated in Panel I of the figure above, hierarchical tensor networks such as MERA are widely used in the physics literature to motivate a geometric link between boundary entanglement and bulk bottleneck cuts. In general tensor networks, however, the quantum max-flow (the maximum matrix rank achievable by varying local tensors) can be strictly smaller than the quantum min-cut (the minimum product of bond dimensions across a disconnecting cut). To establish a theorem verified by the Lean kernel, we focus on an explicit finite-dimensional bridge network whose parameters and cone domain are completely specified.

::: {.viz src="layered-network-cut" preset="four" height="500"}
**Four sites: the cut runs through the network.** Four neighbouring sites at the bottom form the amber interval. Severing their four legs is not the cheapest option: the magenta minimal cut dips into the network and severs only 3 bonds, with the cyan tensors on its inner side. The page counts severed legs, which only bounds the rank from above; as noted above, in a general network the max-flow can fall short of the min-cut, and the network itself is a schematic model.
:::

In the Lean module `D5.S3.Quantum.TensorNetworks.BridgeGraph.QuantumMaxFlowBound`, fix four natural-number bond dimensions $a, b, c, d \in \mathbb{N}$ and a bridge of width $3$ (indexed by $r \in \operatorname{Fin} 3$):

- Let $M : \operatorname{Fin} 3 \to M_{a\times b}(\mathbb{C})$ be a triple of $a\times b$ complex matrices and $N : \operatorname{Fin} 3 \to M_{d\times c}(\mathbb{C})$ a triple of $d\times c$ complex matrices;
- Define the **width-three bridge flow matrix** `flow` as the sum of three Kronecker products:

$$
\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r \in M_{(a\times d)\times (b\times c)}(\mathbb{C}),
$$

with row indices in $\operatorname{Fin} a \times \operatorname{Fin} d$ ($ad$ rows) and column indices in $\operatorname{Fin} b \times \operatorname{Fin} c$ ($bc$ columns);

- Define the set of attainable ranks $\operatorname{attainable}(a, b, c, d) = \bigl\{\, r \in \mathbb{N} \;\big|\; \exists M, N,\; \operatorname{rank}(\operatorname{flow}(M, N)) = r \,\bigr\}$, and define the **quantum max-flow** `QMaxFlow` as its supremum:

$$
\operatorname{QMaxFlow}(a, b, c, d) = \sup\operatorname{attainable}(a, b, c, d) \in \mathbb{N}.
$$

Because every attainable rank is a natural number bounded above by the row count $ad$, this supremum is always attained by a concrete pair of matrix triples $(M, N)$.

::: {.lemma #lemma-bridge-flow-attained title="Attainment of maximal rank" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_attained"}
For all natural numbers $a, b, c, d \in \mathbb{N}$ (including $0$), there exist matrix families $M : \operatorname{Fin} 3 \to M_{a\times b}(\mathbb{C})$ and $N : \operatorname{Fin} 3 \to M_{d\times c}(\mathbb{C})$ such that

$$
\operatorname{rank}\bigl(\operatorname{flow}(M, N)\bigr) = \operatorname{QMaxFlow}(a, b, c, d).
$$
:::

::: proof
Choosing $M = 0$ and $N = 0$ shows that $\operatorname{attainable}(a, b, c, d) \subseteq \mathbb{N}$ is nonempty. Since $\operatorname{flow}(M, N)$ is indexed by $\operatorname{Fin} a \times \operatorname{Fin} d$ on the left, its rank never exceeds $ad$, so $\operatorname{attainable}(a, b, c, d)$ is bounded above in $\mathbb{N}$. Every nonempty bounded set of natural numbers contains its supremum, yielding a witness pair $(M, N)$ with $\operatorname{rank}(\operatorname{flow}(M, N)) = \operatorname{QMaxFlow}(a, b, c, d)$. The full proof is checked by the Lean kernel.
:::

Note the honesty boundary of [@lemma-bridge-flow-attained]: the lemma proves the mathematical **existence** of rank-maximizing tensors $(M, N)$ via boundedness in $\mathbb{N}$, which does not by itself supply an efficient polynomial-time optimization algorithm for arbitrary tensor networks.

## Rank and cut capacity in a width-three bridge graph {#sec-bridge-flow-cut}

Now count the three cut-capacity bounds used by the source to limit the rank of $\operatorname{flow}(M, N) = \sum_{r=0}^2 M_r \otimes N_r$:

1. **Left outer cut (row-space bound)**: $\operatorname{flow}(M, N)$ has $|\operatorname{Fin} a \times \operatorname{Fin} d| = ad$ rows, so its rank cannot exceed $ad$;
2. **Right outer cut (column-space bound)**: $\operatorname{flow}(M, N)$ has $|\operatorname{Fin} b \times \operatorname{Fin} c| = bc$ columns, so its rank cannot exceed $bc$;
3. **Internal width-three bridge cut**: For each $r \in \operatorname{Fin} 3$, $\operatorname{rank}(M_r) \le a$ and $\operatorname{rank}(N_r) \le c$, so $\operatorname{rank}(M_r \otimes N_r) \le ac$; summing over the three bridge channels $r = 0, 1, 2$ bounds the rank of the sum by $3ac$.

Taking the minimum of these three cut-capacity bounds used by the source defines its **discrete quantum min-cut** `QMinCut`:

$$
\operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr) \in \mathbb{N}.
$$

For general dimensions, the graph has a fourth cut of capacity $3bd$; when $a \le b$ and $c \le d$, $3bd \ge 3ac$, so this term is redundant.

::: {.figure src="ch19-three-cuts"}
**The figure shows the three cut-capacity bounds used by the source; QMinCut is their minimum.** For $(a, b, c, d) = (2, 3, 2, 3)$: the upper dashed line crosses legs $a$ and $d$, capacity $ad = 6$; the lower one crosses legs $b$ and $c$, capacity $bc = 6$; the slanting grey line crosses leg $a$, the three bridges and leg $c$, capacity $3ac = 12$. The two magenta outer cuts tie for smallest, so $\operatorname{QMinCut} = 6$.
:::

Our next proposition shows that for all natural numbers $a, b, c, d \in \mathbb{N}$, with no cone assumptions needed, the quantum max-flow never exceeds the quantum min-cut.

::: {.proposition #prop-bridge-flow-cut-bound title="Flow is bounded by cut capacity" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut"}
For all natural numbers $a, b, c, d \in \mathbb{N}$,

$$
\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr).
$$
:::

::: proof
Choose $(M, N)$ attaining $\operatorname{QMaxFlow}(a, b, c, d)$ by [@lemma-bridge-flow-attained]. Because $\operatorname{flow}(M, N)$ has $ad$ rows and $bc$ columns, its rank never exceeds its row count $ad$ or its column count $bc$, so $\operatorname{rank}(\operatorname{flow}(M, N)) \le \min(ad, bc)$ (`flow_rank_le_outer`). Moreover, the source explicitly factors the bridge contraction as the matrix product $\operatorname{flow}(M, N) = \operatorname{cutLeft}(N) \cdot \operatorname{cutRight}(M)$ (`flow_factor`) through the intermediate index type $\operatorname{Fin} 3 \times (\operatorname{Fin} a \times \operatorname{Fin} c)$ of cardinality $3ac$, so the rank-of-product inequality bounds its rank by $3ac$ (`flow_rank_le_inner`). Combining both bounds gives $\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$. The full proof is checked by the Lean kernel.
:::

Here $\operatorname{QMinCut}(a, b, c, d)$ is strictly a **finite-dimensional matrix-rank upper bound**, not a continuum differential-geometric surface area. Let us work through an explicit hand calculation at $a = c = 2$, $b = d = 3$ to see how three Kronecker summands of rank at most $ac = 4$ (with individual ranks $4, 1, 1$) cooperate to saturate a rank-six outer cut.

::: {.example #ex-bridge-two-three title="Explicit Construction of a Rank-Six Bridge Flow at a = c = 2, b = d = 3"}
Set $a = c = 2$ and $b = d = 3$. First verify the quadratic cone inequalities:

$$
a^2 + b^2 = c^2 + d^2 = 2^2 + 3^2 = 13 \le 3 \cdot 2 \cdot 3 = 18.
$$

The three cut capacities are $3ac = 12$, $ad = 6$, and $bc = 6$, so $\operatorname{QMinCut}(2, 3, 2, 3) = \min(12, 6, 6) = 6$. Although any single Kronecker product $M_r \otimes N_r$ has rank at most $ac = 4 < 6$, summing three channels ($r = 0, 1, 2$) produces a full-rank $6\times 6$ permutation matrix. Choose the explicit matrices

$$
\begin{aligned}
M_0 &= \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{pmatrix}, \qquad
&N_0 &= \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}, \\
M_1 &= \begin{pmatrix} 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}, \qquad
&N_1 &= \begin{pmatrix} 0 & 0 \\ 0 & 0 \\ 1 & 0 \end{pmatrix}, \\
M_2 &= \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}, \qquad
&N_2 &= \begin{pmatrix} 0 & 0 \\ 0 & 0 \\ 0 & 1 \end{pmatrix}.
\end{aligned}
$$

Inspect the sum $\operatorname{flow}(M, N) = M_0 \otimes N_0 + M_1 \otimes N_1 + M_2 \otimes N_2$:

- $M_0 \otimes N_0$ maps the four basis pairs in $\{0, 1\} \times \{0, 1\}$ bijectively onto rows $\{0, 1\} \times \{0, 1\}$, contributing rank $4$;
- $M_1 \otimes N_1$ places a single $1$ at column $(2, 0)$ and row $(0, 2)$, supplying the fifth independent basis direction;
- $M_2 \otimes N_2$ places a single $1$ at column $(2, 1)$ and row $(1, 2)$, supplying the sixth independent basis direction.

Tabulating the six basis pairs of $\operatorname{Fin} 3 \times \operatorname{Fin} 2$ against $\operatorname{Fin} 2 \times \operatorname{Fin} 3$ shows explicitly how the three bridge channels partition the six unit entries without overlap:

| Bridge Channel $r \in \operatorname{Fin} 3$ | Input Column $(j, l) \in \operatorname{Fin} 3 \times \operatorname{Fin} 2$ | Output Row $(i, k) \in \operatorname{Fin} 2 \times \operatorname{Fin} 3$ | Nonzero Entry $(M_r)_{i,j}(N_r)_{k,l}$ |
| :---: | :---: | :---: | :---: |
| $r = 0$ | $(0, 0),\; (0, 1),\; (1, 0),\; (1, 1)$ | $(0, 0),\; (0, 1),\; (1, 0),\; (1, 1)$ | $(M_0)_{i,i}(N_0)_{k,k} = 1 \cdot 1 = 1$ |
| $r = 1$ | $(2, 0)$ | $(0, 2)$ | $(M_1)_{0,2}(N_1)_{2,0} = 1 \cdot 1 = 1$ |
| $r = 2$ | $(2, 1)$ | $(1, 2)$ | $(M_2)_{1,2}(N_2)_{2,1} = 1 \cdot 1 = 1$ |

Together, $\operatorname{flow}(M, N)$ is a $6\times 6$ permutation matrix of rank $6 = \operatorname{QMinCut}(2, 3, 2, 3)$, confirming $\operatorname{QMaxFlow}(2, 3, 2, 3) = 6$ via [@prop-bridge-flow-cut-bound].
:::

::: {.figure src="ch19-permutation"}
**Together the three bridges tile a $6 \times 6$ permutation matrix exactly.** The cyan cells are the non-zero entries of $\operatorname{flow}(M, N)$, and the number in each is the bridge $r$ that puts it there: bridge $0$ fills the $4$ cells at the top left, bridges $1$ and $2$ add one cell each; the six cells share no row and no column, so the rank is $6$ ([@ex-bridge-two-three]).
:::

## Cone domains and discrete capacity facets {#sec-discrete-facet-stitching}

In [@ex-bridge-two-three], the internal bridge cut $3ac = 12$ sits well above the outer boundary cuts $ad = bc = 6$. Why do the quadratic cone inequalities $a^2 + b^2 \le 3ab$ and $c^2 + d^2 \le 3cd$ carve out the natural domain where the three-bridge interior never bottlenecks the outer cuts?

A one-line algebraic check tells the story: when $a > 0$, $a^2 + b^2 \le 3ab$ forces $b^2 < a^2 + b^2 \le 3ab$, so $b < 3a$ (and similarly $c > 0$ with $c^2 + d^2 \le 3cd$ forces $d < 3c$). Multiplying $b < 3a$ by $c$ gives $bc < 3ac$, and multiplying $d < 3c$ by $a$ gives $ad < 3ac$. Thus, whenever $(a, b)$ and $(c, d)$ lie inside the quadratic cone $a^2 + b^2 \le 3ab$ and $c^2 + d^2 \le 3cd$ (with $a > 0$ and $c > 0$), the internal cut $3ac$ never undercuts $\min(ad, bc)$, so $\operatorname{QMinCut}(a, b, c, d)$ simplifies to $\min(ad, bc)$.

::: {.viz src="eth-horizon-crossover" preset="narrow" height="500"}
**Bridges too narrow: they are the bottleneck.** The bridge graph $(a, b, c, d) = (1, 5, 1, 5)$: both outer cuts are $5$, but the three bridges carry only $3ac = 3$, and the smallest cut, marked by the dashed amber line, crosses leg $a$, the three bridges and leg $c$. On the right the flow matrix is $5 \times 5$, and its cyan singular values vanish after the third: the rank is just $3$. Since $1^2 + 5^2 = 26 > 3 \cdot 1 \cdot 5$, these dimensions lie outside the cone ([@prop-bridge-flow-cut-bound]).
:::

::: {.corollary #cor-bridge-cone-mincut title="Minimum cut on the cone" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.cone_QMinCut"}
Let $a, b, c, d \in \mathbb{N}$ satisfy $0 < a$, $0 < c$, and the quadratic cone inequalities

$$
a^2 + b^2 \le 3ab \qquad\text{and}\qquad c^2 + d^2 \le 3cd.
$$

Then the minimum cut capacity simplifies to

$$
\operatorname{QMinCut}(a, b, c, d) = \min(ad, bc).
$$
:::

::: proof
By definition, $\operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$, so it suffices to show $\min(ad, bc) \le 3ac$. If $ad \le bc$ and $3ac < ad$, cancelling $a > 0$ gives $3c < d$, which contradicts $c^2 + d^2 \le 3cd < d^2$; symmetrically, if $bc \le ad$ and $3ac < bc$, cancelling $c > 0$ gives $3a < b$, contradicting $a^2 + b^2 \le 3ab < b^2$. Hence $\min(ad, bc) \le 3ac$. The full proof is checked by the Lean kernel.
:::

Notice the exact hypotheses of [@cor-bridge-cone-mincut]: this corollary requires $0 < a$, $0 < c$, $a^2 + b^2 \le 3ab$, and $c^2 + d^2 \le 3cd$, and **does not assume the ordering conditions $a \le b$ or $c \le d$** (which are needed only for the lower-bound construction in the next section).

Now let us interpret $\operatorname{QMinCut}(a, b, c, d) = \min(3ac, ad, bc)$ through our **discrete polyhedral facet-stitching lens (R3)**. For positive integers $a, b, c, d > 0$, introduce logarithmic bond capacities

$$
u = \ln a, \qquad v = \ln b, \qquad w = \ln c, \qquad z = \ln d.
$$

Taking logarithms turns products into sums, so the log cut capacity becomes the **piecewise-affine lower envelope of three hyperplanes**:

$$
\ln\operatorname{QMinCut}(a, b, c, d) = \min(\ln 3 + u + w,\; u + z,\; v + w).
$$

In $(u, v, w, z)$-space, these three affine planes intersect along polyhedral facets: inside the cone domain, the bridge plane $\ln 3 + u + w$ lies above the lower envelope, and the active minimum cut is stitched together from the left-boundary facet $u + z = \ln(ad)$ and the right-boundary facet $v + w = \ln(bc)$ along the **seam** $u + z = v + w$ (that is, $ad = bc$).

> A finite tensor network does not hand us a smooth spacetime manifold out of thin air; in logarithmic capacity coordinates it carves out piecewise-affine polyhedral facets whose seams mark where the bottleneck cut jumps from one side of the network to the other.

::: {.example #ex-log-capacity-facets title="Log-Capacity Polyhedral Facets and Seam Crossing (d = 2 → 3 → 4)"}
Fix $a = 2, b = 3, c = 2$ (satisfying $0 < a \le b$ and $a^2 + b^2 = 13 \le 3ab = 18$) and let the outer bond dimension $d$ step through $2 \to 3 \to 4$, tracking how $\operatorname{QMinCut}(a, b, c, d) = \min(3ac, \min(ad, bc))$ crosses from the left outer facet across the seam into the right outer facet:

1. **Inside the left facet at $(a, b, c, d) = (2, 3, 2, 2)$ ($d = 2$)**: First verify $0 < c \le d$ ($2 \le 2$) and the quadratic cone inequality $c^2 + d^2 = 2^2 + 2^2 = 8 \le 3 \cdot 2 \cdot 2 = 12$. The three candidate cut capacities are $(3ac, ad, bc) = (12, 4, 6)$, the three affine planes evaluate to $(\ln 12, \ln 4, \ln 6)$, and $\operatorname{QMinCut}(2, 3, 2, 2) = \min(12, \min(4, 6)) = 4 = ad$. This lattice point lies strictly inside the $ad < bc$ ($4 < 6$) left-boundary facet, where the bottleneck cut is uniquely $ad = 4$.
2. **On the seam at $(a, b, c, d) = (2, 3, 2, 3)$ ($d = 3$)**: In logarithmic coordinates $(u, v, w, z) = (\ln 2, \ln 3, \ln 2, \ln 3)$, the three affine planes evaluate to

$$
\ln 3 + u + w = \ln 12, \qquad u + z = \ln 6, \qquad v + w = \ln 6.
$$

Here $(3ac, ad, bc) = (12, 6, 6)$ with $ad = 6 = bc$, so this lattice point sits squarely on the seam $u + z = v + w$ where the left and right outer facets meet, with $\operatorname{QMinCut}(2, 3, 2, 3) = \min(12, \min(6, 6)) = 6$.

3. **Crossing the seam into the right facet at $(a, b, c, d) = (2, 3, 2, 4)$ ($d = 4$)**: Increase $d$ from $3$ to $4$. First check that $(c, d) = (2, 4)$ remains inside the quadratic cone:

$$
c^2 + d^2 = 2^2 + 4^2 = 20 \le 3 \cdot 2 \cdot 4 = 24.
$$

The three candidate cut capacities are now $(3ac, ad, bc) = (12, 8, 6)$, with $\operatorname{QMinCut}(2, 3, 2, 4) = \min(12, \min(8, 6)) = 6 = bc$. Across the three steps $d = 2 \to 3 \to 4$, the candidate cut triple progresses through $(12, 4, 6) \to (12, 6, 6) \to (12, 8, 6)$, crossing from the $ad < bc$ facet through the seam $ad = bc$ into the $ad > bc$ facet and switching the unique controlling bottleneck from the left outer cut $ad$ to the right outer cut $bc$. Keep in mind that our finite-dimensional rank theorems certify only the discrete integer lattice points on these affine facets.
:::

::: {.figure src="ch19-facet-seam"}
**The min cut is the lower envelope of three planes, and crossing the seam changes the bottleneck.** With $a = 2, b = 3, c = 2$ and $\ln d$ across: the thick line climbs along the blue $\ln ad$, bends at the dashed vertical $ad = bc$ onto the orange $\ln bc$, and the grey $\ln 3ac$ stays above throughout. The lattice points $d = 2, 3, 4$ carry the candidate cuts $(12, 4, 6)$, $(12, 6, 6)$, $(12, 8, 6)$ ([@ex-log-capacity-facets]); the theorem speaks only about these integer points.
:::

## From discrete bridge graphs to the RT literature {#sec-rt-literature-bridge}

Combining the universal upper bound $\operatorname{QMaxFlow} \le \operatorname{QMinCut}$ ([@prop-bridge-flow-cut-bound]) with the cone simplification $\operatorname{QMinCut} = \min(ad, bc)$ ([@cor-bridge-cone-mincut]) leaves the constructive lower bound: on the ordered cone domain $0 < a \le b$, $0 < c \le d$ with $a^2 + b^2 \le 3ab$ and $c^2 + d^2 \le 3cd$, does there always exist a pair $(M, N)$ whose bridge contraction achieves rank $\min(ad, bc)$?

The Lean module `D5.S3.Quantum.TensorNetworks.BridgeGraph.QuantumMaxFlowMinCut` proves this in full via [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result), where `claim` expands to the universal statement below.

::: {.theorem #thm-bridge-quantum-maxflow-mincut title="Discrete bridge-graph quantum max-flow min-cut" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result"}
For all natural numbers $a, b, c, d \in \mathbb{N}$ satisfying $0 < a$, $a \le b$, $0 < c$, $c \le d$, and the quadratic cone inequalities

$$
a^2 + b^2 \le 3ab \qquad\text{and}\qquad c^2 + d^2 \le 3cd,
$$

both equalities hold simultaneously:

$$
\operatorname{QMaxFlow}(a, b, c, d) = \operatorname{QMinCut}(a, b, c, d) \qquad\text{and}\qquad \operatorname{QMinCut}(a, b, c, d) = \min(ad, bc).
$$
:::

::: proof
The second equality $\operatorname{QMinCut}(a, b, c, d) = \min(ad, bc)$ is [@cor-bridge-cone-mincut], and the upper bound $\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d)$ is [@prop-bridge-flow-cut-bound]. To prove the equality $\operatorname{QMaxFlow}(a, b, c, d) = \min(ad, bc)$, `claim_of_hypotheses` in [`QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) applies strong induction (`Nat.strong_induction_on`) on the outer dimension sum $n = b + d$:

1. **Explicit rational witnesses for equal-width and mixed-ratio regimes (`widthTwo_proved`)**: When $a = b$ or $c = d$ (`square_left`, `square_right`), or when one pair lies in the large-ratio regime while the other lies in the small-ratio regime ($2a \le b \land d \le 2c$ in `mixed_left`, and $b \le 2a \land 2c \le d$ in `mixed_right` via transpose duality `witness_swap`), explicit block partial-identity matrices construct a `RationalWitness` embedding an identity submatrix of order $\min(ad, bc)$ inside $\operatorname{flow}(M, N)$;
2. **Base regime with both ratios below two (`base_witness`)**: When $a < b < 2a$ and $c < d < 2c$, the base module supplies a full-rank rational witness;
3. **Simultaneous quadratic-cone descent when both ratios are at least two (`cone_descent` and `full_rank_of_descent`)**: When $2a \le b$ and $2c \le d$, the polynomial identity $(3a - b)^2 + a^2 - 3(3a - b)a = a^2 + b^2 - 3ab \le 0$ maps $(a, b, c, d)$ to the strictly smaller cone quadruple $(a', b', c', d') = (3a - b,\, a,\, 3c - d,\, c)$ with $b' + d' = a + c < b + d$. By the induction hypothesis, the smaller quadruple achieves full rank $\min((3a - b)c,\, a(3c - d))$; combining this with the castling deficit invariance identity (`castling_proved`: $u y - \operatorname{QMaxFlow}(u, x, v, y) = x(3y - v) - \operatorname{QMaxFlow}(x, 3x - u, y, 3y - v)$) and the cut balance $(3a - b)c + bc = a(3c - d) + ad$ forces the rank deficit of $(a, b, c, d)$ to vanish, establishing $\operatorname{QMaxFlow}(a, b, c, d) = \min(ad, bc)$.

The full proof is checked by the Lean kernel.
:::

Respect the exact boundaries of [@thm-bridge-quantum-maxflow-mincut]:

- No extra geometric structure beyond the matrix contraction `flow` is assumed: the theorem applies to the width-three (`Fin 3`) Kronecker bridge $\sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r$ over $\mathbb{C}$;
- Every positivity, ordering, and quadratic cone hypothesis ($0 < a \le b$, $0 < c \le d$, $a^2 + b^2 \le 3ab$, $c^2 + d^2 \le 3cd$) is essential;
- The theorem does **not** generalize unconditionally to arbitrary tensor networks, full MERA hierarchies, continuum AdS/CFT, or the Ryu–Takayanagi formula.

::: {.figure src="ch19-discrete-vs-rt"}
**What this chapter proves stops on the left.** On the left, the width-three bridge graph, with the green tag for max-flow equal to min-cut in the cone ([@thm-bridge-quantum-maxflow-mincut]); on the right, a disc standing for a slice of continuum spacetime, the cyan arc the boundary region $A$ and the violet arc $\gamma_A$ leaving the ends of $A$ at right angles to the rim, the minimal surface of the RT formula (literature result, not formalized in this book). The crossed-out arrow between them: the continuum limit from left to right is not proved in this book.
:::

To situate this discrete theorem alongside the high-energy physics literature without overclaiming, we state the continuum Ryu–Takayanagi formula and its scope restrictions in the following remark.

::: {.remark #rem-ryu-takayanagi-literature title="The Ryu–Takayanagi Holographic Entanglement Entropy Formula and Its Scope (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In the static, classical, leading-order semiclassical anti-de Sitter / conformal field theory (AdS/CFT) correspondence (with $c = 1$), the von Neumann entanglement entropy $S(A) = -\Tr(\rho_A \ln\rho_A)$ of a boundary spatial subregion $A$ is given by the **Ryu–Takayanagi (RT) formula**

$$
S(A) = \frac{\operatorname{Area}(\gamma_A)}{4 G_N \hbar},
$$

where $G_N$ is the bulk Newton gravitational constant and $\gamma_A$ is the minimal-area codimension-two bulk surface anchored on the boundary $\partial A$ ($\partial\gamma_A = \partial A$) and homologous to $A$. Bulk quantum corrections and time-dependent covariant Hubeny–Rangamani–Takayanagi (HRT) extremal surfaces lie outside the scope of this chapter's frozen statements.

Two guardrails are mandatory when comparing discrete tensor-network bounds with holographic entanglement entropy:

1. **Never write $S(A) = a \wedge b$** or assert that arbitrary tensor networks universally saturate their minimum cut;
2. **Respect the R3 discrete-facet boundary**: in this book, the geometric bridge from [@thm-bridge-quantum-maxflow-mincut] to holographic ideas proceeds strictly through the discrete log-capacity polyhedral facets, bottlenecks, and seam stitching of [@ex-log-capacity-facets], without claiming that a continuum limit or holographic duality has been proved.

See S. Ryu & T. Takayanagi, *Phys. Rev. Lett.* **96**, 181602 (2006), DOI: `10.1103/PhysRevLett.96.181602`; B. Swingle, *Phys. Rev. D* **86**, 065007 (2012), DOI: `10.1103/PhysRevD.86.065007`; and J. D. Bekenstein, *Phys. Rev. D* **7**, 2333 (1973), DOI: `10.1103/PhysRevD.7.2333`.
:::

::: {.viz src="layered-network-cut" preset="grow" height="500"}
**Double the interval, and the cut gains only about two legs.** The amber interval keeps its right end and grows from 1 site to 16; the magenta minimal cut climbs layer by layer from 1 bond to only 8, whereas severing every leg would take 16. For every interval of this 32-site network the cut stays within $2\log_2 L + 1$ (checked one by one on the page). Reading the number of severed legs as the “area” of an RT minimal surface is Swingle's MERA analogy (a literature result, not formalized in this book).
:::

With more than one interval there is more than one candidate cut: the two intervals can be cut off separately, or one large cut can enclose both together with the gap between them while the gap's own legs are cut on their own; the minimal cut is whichever way severs the fewest bonds.

::: {.viz src="layered-network-cut" preset="two" height="500"}
**Two intervals: cut them apart, or cut them together.** Two sites separate the amber intervals A and B, and A grows leftward from a single site. While A is short, the magenta minimal cut is two separate cuts; from 7 sites on, one large cut around A, B and the gap, plus a small cut through the two legs of the gap, is cheaper: at 10 sites, cutting together takes 10 bonds and cutting apart 13. The minimal cut is always the cheapest of the candidates; for the analogous verified bound on the width-three bridge graph see [@prop-bridge-flow-cut-bound].
:::

::: {.viz src="layered-network-cut" height="560"}
The full laboratory of the layered network and its cut: drag one or two intervals along the boundary and watch the magenta minimal cut thread through the network, counting the bonds it severs. The network is a schematic model and the counts are computed by the page; the RT formula and the MERA analogy are literature results, not formalized in this book, and green is reserved for [@prop-bridge-flow-cut-bound].
:::

Across the width-three bridge network, we have seen how a collection of quantum channels saturates the discrete minimum cut $\min(ad, bc)$ ([@thm-bridge-quantum-maxflow-mincut]) and stitches together affine log-capacity facets along the seam $ad = bc$. Yet what happens in a dynamical quantum circuit after boundary entanglement has already saturated its cut bound? How do parallel circuit depth, exact two-qubit gate synthesis lower bounds, and closed graph walks behave — and where is the exact boundary between Lean-verified circuit theorems and the great open conjectures of holographic complexity and computational complexity theory? Let us turn to [Chapter 20](ch20-complexity-and-spacetime.md).
