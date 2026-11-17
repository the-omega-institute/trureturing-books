# Chapter 19 Entanglement Weaves Space: Tensor Networks, Holographic Duality, and the Discrete Min-Cut Theorem {#entanglement-weaves-space-tensor-networks-holographic-duality-and-the-discrete-min-cut-theorem}

> *"Point C is not an independently known quantity but a projection of overlap: one definite quantum state determines only a line; a collection of states can span an area."*

In [Chapter 2](ch02-born-rule.md) and [Chapter 3](ch03-projectors-and-duality.md), we emphasized a basic dimensional fact of linear algebra: in the global Hilbert space, **a single definite pure quantum state determines only a rank-one idempotent projector line** ($\rho = \lvert\Psi\rangle\langle\Psi\rvert$, $\operatorname{rank}\rho = 1$). Once we partition a composite system across a bipartite interface $\mathcal{H}_L \otimes \mathcal{H}_R$ and view the amplitude tensor via **tensor flattening** as a linear map from the right subsystem to the left subsystem (or trace out one side to form the reduced density matrix $\rho_L = \Tr_R\lvert\Psi\rangle\langle\Psi\rvert$), however, a qualitative leap appears: a single product basis vector $\lvert 0\rangle_L \otimes \lvert 0\rangle_R$ still has bipartite **Schmidt rank** $1$, whereas spanning a bipartite cross-section of Schmidt rank greater than $1$ and transmitting multiple distinguishable parallel channels across the cut requires a **collection of orthogonal local channel states** superposed coherently across the interface (for instance, the two-qubit Bell state $\lvert\Phi^+\rangle = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ has global pure-state density rank $1$, yet pairs two orthogonal local states across the cut so that both its bipartite flattening map and its reduced state $\rho_L$ have rank $\operatorname{rank}\rho_L = 2$).

The opening epigraph takes this linear-algebraic fact as the intuitive bridge to tensor networks: when we move from a single state ray to a **tensor network** wired together by contracted bond indices, how is the maximum entanglement rank ("flow") transmissible across the network constrained by the narrowest bottleneck cross-section ("cut capacity") inside it?

In keeping with our three-tier epistemological contract and the discrete facet-stitching principle (R3), this chapter maintains three strict boundaries:

1. **Lean-verified finite-dimensional bridge-graph and open-boundary MPS theorems**: In the `BridgeGraph` module family, for the width-three (`Fin 3`) Kronecker bridge contraction $\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r$, we prove attainment of maximal rank ([@lemma-bridge-flow-attained]), the universal min-cut upper bound ([@prop-bridge-flow-cut-bound]), simplification of the min-cut on the quadratic cone ([@cor-bridge-cone-mincut]), and the exact discrete quantum max-flow min-cut theorem on the ordered cone ([@thm-bridge-quantum-maxflow-mincut]); we then prove in the open-boundary bond-dimension-$2$ matrix product state (MPS) modules that an unnormalized three-site prefix marginal determines the global state up to a unit phase on an explicit observable chart ([@thm-mps-observable-phase-recovery]), and that for chain lengths $3 + m \ge 5$ phase-unique recovery from any interior three-site marginal holds on a nonempty open dense principal locus ([@thm-mps-generic-interior-recovery]);
2. **Discrete log-capacity polyhedral facets and seam stitching (R3)**: Passing to logarithmic bond-capacity coordinates ([@ex-log-capacity-facets]), we show how the lower envelope of three affine hyperplanes carves out discrete polyhedral facets joined along the bottleneck seam $ad = bc$;
3. **Literature boundary for continuum holography**: Multi-scale entanglement renormalization ansatz (MERA) schematics and the continuum AdS/CFT Ryu–Takayanagi (RT) minimal-surface formula are confined to an explicit literature remark ([@rem-ryu-takayanagi-literature]), never conflated with our finite-dimensional width-three bridge theorem.

::: {.figure src="ch19-overview"}
**Figure 19.** The chapter at a glance. Panel I: in an ordinary binary tree (not the layered network of the later experiment cards), the 4 amber legs along the bottom are cut off by just the 2 bonds marked magenta (a schematic model). Panel II: on the width-three bridge graph $(a, b, c, d) = (2, 3, 2, 3)$, the solid magenta $ad$ above and the dashed magenta $bc$ below are the two min cuts, $ad = bc = 6$, and flow equals cut ([@thm-bridge-quantum-maxflow-mincut]). Panel III: in log capacity, the solid magenta $ad$ facet and the dashed magenta $bc$ facet join into one bent line at the dashed vertical seam.
:::

## 19.1 Entanglement hierarchies and finite tensor networks {#sec-mera-hierarchy}

Suppose two composite quantum subsystems — a left boundary and a right boundary — communicate through an intermediate network of contracted tensor legs. If only a single one-dimensional scalar wire links the two sides, the induced linear map across the cut has rank at most $1$ regardless of how large the boundary Hilbert spaces are. When multiple internal bonds bridge the interface in parallel, the operator rank across the cut (the number of nonzero Schmidt singular values) can grow with the product of the bond dimensions.

As illustrated in Panel I of the figure above, hierarchical tensor networks such as MERA are widely used in the physics literature to motivate a geometric link between boundary entanglement and bulk bottleneck cuts. In general tensor networks, however, the quantum max-flow (the maximum matrix rank achievable by varying local tensors) can be strictly smaller than the quantum min-cut (the minimum product of bond dimensions across a disconnecting cut). (Literature result: S. X. Cui, M. H. Freedman, O. Sattath, R. Stong and G. Minton, *Quantum max-flow/min-cut*, J. Math. Phys. 57, 062206 (2016), arXiv:1508.04644.) To establish a theorem verified by the Lean kernel, we focus on an explicit finite-dimensional bridge network whose parameters and cone domain are completely specified.

::: {.viz src="layered-network-cut" preset="one" height="500"}
**One site: the cut is its own leg.** Site 16 at the bottom of the layered network forms the amber interval on its own, and the magenta minimal cut severs only that one leg. A single bond crosses the cut, so the rank across it is at most the dimension of that bond; only when more bonds are cut does the bound become the product of their dimensions.
:::

Lengthen the interval from one site to four neighbouring sites: cutting the legs directly takes $4$, but the minimal cut can dip inside the network.

::: {.viz src="layered-network-cut" preset="four" height="500"}
**Four sites: the cut runs through the network.** Four neighbouring sites at the bottom form the amber interval. Severing their four legs is not the cheapest option: the magenta minimal cut dips into the network and severs only 3 bonds, with the cyan tensors on its inner side. The page counts severed legs, which only bounds the rank from above; as noted above, in a general network the max-flow can fall short of the min-cut, and the network itself is a schematic model.
:::

The bridge-graph model, the definitions of `QMaxFlow` and `QMinCut`, and the cone-domain "flow equals cut" statement below (the source's Conjecture 3.15) come from F. Gesmundo, V. Lysikov and V. Steffan, *Quantum max-flow in the bridge graph*, Transformation Groups 30 (2025) 1751–1784 (DOI: `10.1007/s00031-024-09863-2`, arXiv:2212.09794); the source letters $(a, b, a', b')$ correspond to our $(a, b, c, d)$. In the Lean module `D5.S3.Quantum.TensorNetworks.BridgeGraph.QuantumMaxFlowBound`, fix four natural-number bond dimensions $a, b, c, d \in \mathbb{N}$ and a bridge of width $3$ (indexed by $r \in \operatorname{Fin} 3$):

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

## 19.2 Rank and cut capacity in a width-three bridge graph {#sec-bridge-flow-cut}

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

The six-dimensional permutation matrix above satisfies a more precise identity than full rank: its columns are distinct standard basis vectors, so $F^*F=I_6$. Writing the input and output dimensions of the right factors as $c=2q$ and $d=3q$ extends the same construction to every admissible pair of left dimensions. The task is to give each input coordinate a unique output coordinate, with no collisions between different inputs.

::: {.theorem #thm-bridge-native-saturation-iff title="Exact column Gram saturation for a native three-term tensor sum" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeSaturation.native_saturation_iff"}
For all natural numbers $a,b,q\in\mathbb N$ with $q>0$, there exist complex matrix families

$$
\begin{aligned}
M_r&\in M_{a\times b}(\mathbb C),\\
N_r&\in M_{3q\times2q}(\mathbb C)
\qquad(r=0,1,2),
\end{aligned}
$$

whose tensor sum satisfies

$$
\begin{aligned}
F&=\sum_{r=0}^2M_r\otimes N_r,\\
F^*F&=I_{2bq},
\end{aligned}
$$

if and only if $2b\le3a$. Here $F^*$ is the conjugate transpose, the rows of $F$ are indexed by $\operatorname{Fin}a\times\operatorname{Fin}(3q)$, its columns by $\operatorname{Fin}b\times\operatorname{Fin}(2q)$, and $I_{2bq}$ is the identity matrix on this column index set.
:::

::: {.proof #pf-bridge-native-saturation-iff}
First prove necessity. If $F^*F=I_{2bq}$, the rank bound for a product and the number of rows of $F$ give

$$
\begin{aligned}
2bq&=\operatorname{rank}(F^*F)\\
&\le\operatorname{rank}F\le3aq.
\end{aligned}
$$

Since $q>0$, cancelling $q$ yields $2b\le3a$.

Conversely, suppose $2b\le3a$. Use zero-based indices throughout, with ranges

$$
\begin{aligned}
0\le i<a,&\qquad0\le j<b,\\
0\le\ell<3q,&\qquad0\le k<2q.
\end{aligned}
$$

Let $\mathbf1_{\{P\}}$ be $1$ when $P$ holds and $0$ otherwise. Choose the three left slices

$$
\begin{aligned}
(M_0)_{ij}&=\mathbf1_{\{i=j\}},\\
(M_1)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)\}},\\
(M_2)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)+1\}},
\end{aligned}
$$

and the three right slices

$$
\begin{aligned}
(N_0)_{\ell k}&=\mathbf1_{\{\ell=k\}},\\
(N_1)_{\ell k}&=\mathbf1_{\{k<q,\ \ell=2q+k\}},\\
(N_2)_{\ell k}&=\mathbf1_{\{q\le k,\ \ell=q+k\}}.
\end{aligned}
$$

The last two left slices vanish when $j<a$; the difference $j-a$ matters only when $j\ge a$, where it is an ordinary nonnegative integer difference.

To see how the slices move a column, define the output route for an input index $(j,k)$ by

$$
\rho(j,k)=
\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,2q+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,q+k\bigr),&j\ge a,\ q\le k.
\end{cases}
$$

Every output lies in the required range. In the first branch, $j<a$ and $k<2q<3q$. In the other two branches put $t=j-a$. Since $j+1\le b$ and $2b\le3a$,

$$
2(t+1)\le2(b-a)\le a.
$$

Thus both $2t$ and $2t+1$ are less than $a$, while the second output coordinate lies in $[2q,3q)$. When $b\le a$, every input takes the first branch.

Write the input standard basis as $E_{j,k}=e_j\otimes e_k$ and the output standard basis as $U_{i,\ell}=e_i\otimes e_\ell$. When $j<a$, only term $0$ acts. When $j\ge a$, term $0$ vanishes, and terms $1$ and $2$ divide the inputs according to $k<q$ or $k\ge q$. Hence every column has exactly one nonzero entry, equal to $1$:

$$
F E_{j,k}=U_{\rho(j,k)}.
$$

We must also check that different columns never reach the same row. The first branch has second output coordinate below $2q$, disjoint from the other two branches. The latter have even and odd first output coordinates, respectively, so they too are disjoint. Within each branch the output uniquely recovers $j,k$: read both directly in the first branch; in the second recover $t$ from $i=2t$ and set $k=\ell-2q$; in the third recover $t$ from $i=2t+1$ and set $k=\ell-q$. In the last two branches set $j=a+t$. Thus $\rho$ is injective.

This determines the entire column Gram matrix, including every off-diagonal entry. Abbreviate the input indices as $x=(j,k)$ and $y=(j',k')$, and use the usual complex inner product, conjugate-linear in its first argument. Then

$$
\begin{aligned}
(F^*F)_{x,y}
&=\langle F E_x,F E_y\rangle\\
&=\langle U_{\rho(x)},U_{\rho(y)}\rangle\\
&=\delta_{x,y}.
\end{aligned}
$$

Here $\delta$ is the Kronecker symbol. Expanding the three terms also accounts for every cross term explicitly: term $0$ has a second output coordinate in a range disjoint from those of terms $1$ and $2$, while terms $1$ and $2$ have first output coordinates of opposite parity. Consequently, for $r\ne s$,

$$
(M_r^*M_s)\otimes(N_r^*N_s)=0.
$$

Each diagonal term is the coordinate projection onto its input branch, and the three branches partition the entire input index set. Therefore

$$
\begin{aligned}
F^*F
&=\sum_{r,s=0}^2(M_r^*M_s)\otimes(N_r^*N_s)\\
&=I_{2bq}.
\end{aligned}
$$

The zero-dimensional cases are included. If $b=0$, $F$ has no input columns, and both $F^*F$ and $I_0$ are the unique empty square matrix; the identity holds, and $2b\le3a$ always holds. If $a=0$, the threshold forces $b=0$. If instead $b>0$, positivity of $q$ makes the input dimension positive and the output dimension zero, already ruled out by the rank inequality in the necessity argument. The full proof is checked by the Lean kernel.
:::

Setting $a=2$, $b=3$, and $q=1$ gives exactly the six slices displayed in [@ex-bridge-two-three]: the first four input basis vectors retain their coordinates, and the remaining two follow

$$
\begin{aligned}
(2,0)&\longmapsto(0,2),\\
(2,1)&\longmapsto(1,2)
\end{aligned}
$$

completing the six output basis vectors. Thus [@thm-bridge-native-saturation-iff] extends that permutation example across the whole parameter family $c=2q$, $d=3q$. In general, the inputs need only occupy distinct output coordinates; they need not exhaust the output space.

In the range $a<b$ with $2b\le3a$, this family satisfies $3c=6q=2d$. This equality follows directly from choosing $c=2q$ and $d=3q$. The theorem classifies existence of the original matrix triples within this fixed family of right dimensions; the identity column Gram follows directly from the coordinate routing of the displayed factors. This construction alone does not prove that, for arbitrary $c,d$, $a<b$ and the positive scalar column Gram identity $F^*F=\lambda I_{bc}$ ($\lambda>0$) necessarily imply $3c\le2d$. The bound $2c\le d$ in [@thm-bridge-native-rectangular-bound] below uses the strict threshold $3a<2b$, on the opposite side of the threshold from $2b\le3a$ here.

The two right input blocks need not have equal lengths. Split the $c$ input coordinates into blocks of lengths $\lfloor c/2\rfloor$ and $\lceil c/2\rceil$, and give them the even and odd left slots, respectively. The same routing then works. Thus neither even $c$ nor the exact choice $d=3c/2$ is essential to this existence construction: the right output only needs room for the original $c$ rows and an additional strip of $\lceil c/2\rceil$ rows.

::: {.theorem #thm-bridge-native-scalar-gram-exists title="Positive scalar column Gram existence for native three-term tensor sums in the first region" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeScalarGram.native_scalar_gram_exists"}
For any natural numbers $a,b,c,d\in\mathbb N$ satisfying

$$
2b\le3a,\qquad3c\le2d,
$$

and every real number $\lambda$ with $\lambda>0$, there exist complex matrix families

$$
\begin{aligned}
M&:\operatorname{Fin}3\longrightarrow M_{a\times b}(\mathbb C),\\
N&:\operatorname{Fin}3\longrightarrow M_{d\times c}(\mathbb C),
\end{aligned}
$$

whose original tensor sum satisfies

$$
\begin{aligned}
F&=\sum_{r=0}^2M_r\otimes N_r,\\
F^*F&=\lambda I_{bc}.
\end{aligned}
$$

Here $F^*$ is the conjugate transpose, the rows of $F$ are indexed by $\operatorname{Fin}a\times\operatorname{Fin}d$, and its columns by $\operatorname{Fin}b\times\operatorname{Fin}c$. The matrix $I_{bc}$ is the identity on this column index set, and the real number $\lambda$ is viewed as a complex scalar through the natural embedding. There is no assumption that $a<b$, that $c$ has either parity, that $d$ has a particular exact value, that the factors are linearly independent, or that any dimension is strictly positive.
:::

::: {.proof #pf-bridge-native-scalar-gram-exists}
First construct a tensor sum with identity column Gram, then scale by a real scalar. Put

$$
q=\lfloor c/2\rfloor,\qquad c-q=\lceil c/2\rceil.
$$

Use indices starting at $0$ throughout, with ranges

$$
\begin{aligned}
0\le i<a,&\qquad0\le j<b,\\
0\le s<d,&\qquad0\le k<c.
\end{aligned}
$$

As before, let $\mathbf1_{\{P\}}$ be the indicator of $P$. Take the same three unscaled left slices as in the preceding construction, now denoted by $L_r$:

$$
\begin{aligned}
(L_0)_{ij}&=\mathbf1_{\{i=j\}},\\
(L_1)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)\}},\\
(L_2)_{ij}&=\mathbf1_{\{a\le j,\ i=2(j-a)+1\}}.
\end{aligned}
$$

Choose the $d\times c$ right slices

$$
\begin{aligned}
(N_0)_{sk}&=\mathbf1_{\{s=k\}},\\
(N_1)_{sk}&=\mathbf1_{\{k<q,\ s=c+k\}},\\
(N_2)_{sk}&=\mathbf1_{\{q\le k,\ s=c+(k-q)\}}.
\end{aligned}
$$

The differences $j-a$ and $k-q$ matter only when $j\ge a$ and $k\ge q$, respectively, so both are ordinary nonnegative integer differences. For $G=\sum_{r=0}^2L_r\otimes N_r$, these factors give the route

$$
\rho(j,k)=
\begin{cases}
(j,k),&j<a,\\
\bigl(2(j-a),\,c+k\bigr),&j\ge a,\ k<q,\\
\bigl(2(j-a)+1,\,c+(k-q)\bigr),&j\ge a,\ q\le k.
\end{cases}
$$

Check the coordinate ranges explicitly. If $j\ge a$, put $t=j-a$. Since $j+1\le b$ and $2b\le3a$,

$$
2(t+1)\le2(b-a)\le a.
$$

Thus $2t<a$ and $2t+1<a$. If $b\le a$, there are no inputs in these residual branches: every column takes the first branch.

The required integer bound on the right is

$$
\begin{aligned}
d&\ge\lceil3c/2\rceil\\
&=c+\lceil c/2\rceil=c+(c-q)\ge c.
\end{aligned}
$$

This follows exactly from $3c\le2d$. Explicitly, write $c=2q+\varepsilon$, where $\varepsilon\in\{0,1\}$. Then $2d\ge6q+3\varepsilon$, and integrality of $d$ gives $d\ge3q+2\varepsilon=c+(c-q)$. The first branch has $k<c\le d$; the second has

$$
c\le c+k<c+q\le c+(c-q)\le d;
$$

and the third has

$$
c\le c+(k-q)<c+(c-q)\le d.
$$

Thus $\rho(j,k)$ is always a valid output coordinate. The two right input blocks may differ in length; the additional output strip needs only as many rows as the longer block, namely $c-q$.

Let $E_{j,k}=e_j\otimes e_k$ be the input standard basis and $U_{i,s}=e_i\otimes e_s$ the output standard basis. When $j<a$, the corresponding columns of $L_1,L_2$ vanish, leaving only term $0$. When $j\ge a$, we have $(L_0)_{ij}=0$ because $i<a$, and the other two terms divide the inputs according to $k<q$ and $q\le k$. Every column therefore has exactly one nonzero entry, equal to $1$, and

$$
G E_{j,k}=U_{\rho(j,k)}.
$$

Distinct inputs cannot collide. The first branch has second output coordinate below $c$, whereas the other two branches have second coordinate at least $c$. Although the latter share the additional right strip, their first output coordinates are even and odd, respectively, so their images are disjoint. Within each branch the output $(i,s)$ uniquely recovers the input: in the first, $(j,k)=(i,s)$; in the second, $j=a+i/2$ and $k=s-c$; in the third, $j=a+(i-1)/2$ and $k=q+s-c$. The divisions are exact in their respective parity branches. Hence $\rho$ is injective. For any input indices $x,y$, the usual complex inner product now gives

$$
\begin{aligned}
(G^*G)_{x,y}
&=\langle G E_x,G E_y\rangle\\
&=\langle U_{\rho(x)},U_{\rho(y)}\rangle
=\delta_{x,y}.
\end{aligned}
$$

This determines every Gram entry directly. Finally, the actual original factors are

$$
\begin{aligned}
M_r&=\sqrt{\lambda}\,L_r,\qquad N_r\ \text{as specified above},\\
F&=\sqrt{\lambda}\,G,\\
F^*F&=\overline{\sqrt{\lambda}}\sqrt{\lambda}\,G^*G
=\lambda I_{bc},
\end{aligned}
$$

because $\lambda>0$ makes $\sqrt{\lambda}$ real with square $\lambda$. Throughout, the argument uses the displayed original $a\times b$ and $d\times c$ factors.

The zero-dimensional cases remain subject to both dimension hypotheses. If $b=0$ or $c=0$, the input index set is empty, and $F^*F$ and $\lambda I_0$ are the unique empty square matrix. If $a=0$, $2b\le3a$ forces $b=0$; if $d=0$, $3c\le2d$ forces $c=0$. Nor is $q>0$ needed: when $c=1$, $q=0$, the second branch is empty, and the third works as written. Zero or linearly dependent factors need not be excluded. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-bridge-native-scalar-gram-odd title="Nine-column routing with an odd right input dimension"}
Take

$$
(a,b,c,d,\lambda)=(2,3,3,5,2).
$$

Then $2b=6=3a$, $3c=9\le10=2d$, and $q=1$; the two right input blocks have lengths $1$ and $2$. The original left factors are three $2\times3$ matrices:

$$
\begin{aligned}
M_0&=\sqrt2\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix},\\
M_1&=\sqrt2\begin{pmatrix}0&0&1\\0&0&0\end{pmatrix},\\
M_2&=\sqrt2\begin{pmatrix}0&0&0\\0&0&1\end{pmatrix}.
\end{aligned}
$$

The original right factors are all $5\times3$ matrices. The nonzero entries of $N_0$ are $(N_0)_{00}=(N_0)_{11}=(N_0)_{22}=1$; $N_1$ has only $(N_1)_{30}=1$; and $N_2$ has only $(N_2)_{31}=(N_2)_{42}=1$. All other entries vanish. Thus $F=\sum_{r=0}^2M_r\otimes N_r$ has $10$ rows and $9$ columns. Its first six columns $(j,k)$, with $j=0,1$ and $k=0,1,2$, are $\sqrt2\,U_{j,k}$; the remaining three are

$$
\begin{aligned}
F E_{2,0}&=\sqrt2\,U_{0,3},\\
F E_{2,1}&=\sqrt2\,U_{1,3},\\
F E_{2,2}&=\sqrt2\,U_{1,4}.
\end{aligned}
$$

The nine output coordinates are distinct, and only $(0,4)$ is unused. Every column therefore has squared norm $2$, and any two distinct columns have inner product zero, giving $F^*F=2I_9$ directly. Unequal right input blocks still allow the original three-term factors to produce an exact scalar column Gram.
:::

[@thm-bridge-native-scalar-gram-exists] extends the existence construction to arbitrary natural right dimensions satisfying $3c\le2d$, while retaining the left hypothesis $2b\le3a$. It is a sufficient condition: it does not assert that $3c\le2d$ is universally necessary for arbitrary original factors, and it does not give an existence classification in all dimensions. Under $3a<2b$, the later necessary bound gives $2c\le d$ ([@thm-bridge-native-rectangular-bound]); under the stronger threshold $2a<b$, it gives $3c\le d$ ([@thm-bridge-scalar-gram-obstruction]). The result here is an exact Gram identity in the finite native matrix model; it supplies no quantitative gap for approximate spectral flatness, physical realization, or derivation of the RT formula.

## 19.3 Cone domains and discrete capacity facets {#sec-discrete-facet-stitching}

In [@ex-bridge-two-three], the internal bridge cut $3ac = 12$ sits well above the outer boundary cuts $ad = bc = 6$. Why do the quadratic cone inequalities $a^2 + b^2 \le 3ab$ and $c^2 + d^2 \le 3cd$ lie inside the natural domain where the three-bridge interior never bottlenecks the outer cuts?

A one-line algebraic check tells the story: when $a > 0$, $a^2 + b^2 \le 3ab$ forces $b^2 < a^2 + b^2 \le 3ab$, so $b < 3a$ (and similarly $c > 0$ with $c^2 + d^2 \le 3cd$ forces $d < 3c$). Multiplying $b < 3a$ by $c$ gives $bc < 3ac$, and multiplying $d < 3c$ by $a$ gives $ad < 3ac$. Thus, whenever $(a, b)$ and $(c, d)$ lie inside the quadratic cone $a^2 + b^2 \le 3ab$ and $c^2 + d^2 \le 3cd$ (with $a > 0$ and $c > 0$), the internal cut $3ac$ never undercuts $\min(ad, bc)$, so $\operatorname{QMinCut}(a, b, c, d)$ simplifies to $\min(ad, bc)$.

::: {.viz src="eth-horizon-crossover" preset="narrow" height="500"}
**Bridges too narrow: they are the bottleneck.** The bridge graph $(a, b, c, d) = (1, 5, 1, 5)$: both outer cuts are $5$, but the three bridges carry only $3ac = 3$, and the smallest cut, marked by the dashed magenta line, crosses leg $a$, the three bridges and leg $c$. On the right the flow matrix is $5 \times 5$, and its cyan singular values vanish after the third: the rank is just $3$. Since $1^2 + 5^2 = 26 > 3 \cdot 1 \cdot 5$, these dimensions lie outside the cone ([@prop-bridge-flow-cut-bound]).
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

## 19.4 From discrete bridge graphs to the RT literature {#sec-rt-literature-bridge}

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
- The theorem is stated under the listed positivity, ordering, and quadratic cone hypotheses ($0 < a \le b$, $0 < c \le d$, $a^2 + b^2 \le 3ab$, $c^2 + d^2 \le 3cd$);
- The theorem does **not** generalize unconditionally to arbitrary tensor networks, full MERA hierarchies, continuum AdS/CFT, or the Ryu–Takayanagi formula.

[@thm-bridge-quantum-maxflow-mincut] determines the attainable rank, not the distribution of singular values. If a nonzero bridge flow $F$ has nonzero singular values $\sigma_1,\ldots,\sigma_R$, viewing it as a pure-state amplitude matrix across its row–column bipartition and normalizing gives Schmidt weights $p_j=\sigma_j^2/\sum_k\sigma_k^2$. Rank counts the nonzero weights; entanglement entropy reaches $\ln R$ only when every weight equals $1/R$. The permutation matrix in [@ex-bridge-two-three] has both full rank and a flat spectrum, but the rank theorem does not promise both at every allowed dimension tuple.

Keep the original grouping from Section 19.1: $M_r\in M_{a\times b}(\mathbb C)$, $N_r\in M_{d\times c}(\mathbb C)$, and

$$
F=\sum_{r=0}^2 M_r\otimes N_r:
\mathbb C^b\otimes\mathbb C^c\longrightarrow
\mathbb C^a\otimes\mathbb C^d.
$$

Here $F^*$ denotes the conjugate transpose. A stronger requirement than rank attainment is the existence of a single choice of matrix families $M,N$ and a single positive real scalar $\lambda$ satisfying

$$
\begin{aligned}
bc\le ad&\ \Longrightarrow\ F^*F=\lambda I_{bc},\\
ad\le bc&\ \Longrightarrow\ FF^*=\lambda I_{ad}.
\end{aligned}
$$

These identities require the columns or rows, respectively, to form an orthogonal family of norm $\sqrt{\lambda}$, making all singular values on the smaller side equal to $\sqrt{\lambda}$. On the seam $ad=bc$, both implications apply to the same $F$ and the same $\lambda$. The following necessary condition reveals a restriction that rank alone cannot detect.

Start with the geometry behind $2c$. When $c=1$, two combinations $y_0,y_1\in\mathbb C^d$ of the right factors with $y_0^*y_0=y_1^*y_1=1$ and $y_0^*y_1=0$ would be two orthogonal unit vectors, requiring $d\ge2$. For general $c$, the corresponding objects are isometries $J_0,J_1:\mathbb C^c\to\mathbb C^d$ with $J_\alpha^*J_\beta=\delta_{\alpha\beta}I_c$. Their two $c$-dimensional ranges are orthogonal, requiring $d\ge2c$. We first find two common coefficient directions, then derive these maps from the original Gram identity.

::: {.theorem #thm-bridge-common-coefficient-plane title="A common complex two-plane for every Hermitian coefficient kernel" lean="D5/S3/Quantum/Algebra/GenericCommonCoefficientPlane.common_plane"}
Let $a,b\in\mathbb N$ satisfy the strict threshold $3a<2b$. Let

$$
X:\operatorname{Fin}3\longrightarrow M_{a\times b}(\mathbb C)
$$

be a complex-linearly independent triple, and let the coefficient-first stack $S=\operatorname{stack}(X)$ (with row index $(r,i)\in\operatorname{Fin}3\times\operatorname{Fin}a$) be injective as a linear map. Then there is a complex two-dimensional subspace $L\subset\mathbb C^3$ such that for every Hermitian coefficient matrix $T\in M_3(\mathbb C)$, whenever

$$
S^*(T\otimes I_a)S=0,
$$

we have the full complex sesquilinear pairing

$$
u^*Tv=0\qquad(u,v\in L).
$$

The quantifiers include the case where the Hermitian coefficient kernel is zero; no nonzero-kernel, signature, or positivity premise is added.
:::

::: proof
Write

$$
\Phi_X(T)=S^*(T\otimes I_a)S=\sum_{r,s}T_{rs}X_r^*X_s,
$$

as in [compression](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.compression) and [compression_eq_sum](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.compression_eq_sum). Two product-rank lower bounds give $\operatorname{rank}\Phi_X(T)\ge a\operatorname{rank}T-2(3a-b)$. If $\Phi_X(T)=0$ and $\operatorname{rank}T=3$, then $2b\le3a$, a contradiction. Thus every coefficient-kernel matrix has rank at most $2$. If $T$ is positive semidefinite, write $T=C^*C$. Taking the trace of $\Phi_X(T)=0$ gives a zero sum of squared matrix norms, so each row of $C$ gives $\sum_r C_{jr}X_r=0$; independence forces $C=0$. Apply the same argument to $-T$. Every nonzero Hermitian kernel form therefore has one positive, one negative, and one zero eigenvalue.

If the Hermitian kernel is zero, any complex two-plane works. Otherwise, put one nonzero kernel form into $\operatorname{diag}(1,-1,0)$ by an invertible adjoint congruence and change the coefficients of $X$ accordingly; independence and stack injectivity are preserved. Work temporarily in these coordinates. Equal column Grams $X_0^*X_0=X_1^*X_1$ give $X_1=UX_0$ for a unitary $U$ on the codomain $\mathbb C^a$. Set

$$
\begin{aligned}
D&=\operatorname{range}X_0,& E&=X_2(\ker X_0),\\
r&=\dim D,&s&=\dim E.
\end{aligned}
$$

Stack injectivity makes $X_2$ injective on $\ker X_0$, so $r+s=b$. Since $r,s\le a$ and $3a<2b$, we have $2r>a$. For every Hermitian kernel form $Q$, pairing on $\ker X_0$ first gives $Q_{22}=0$, and pairing between arbitrary input vectors gives

$$
(Q_{20}I_a+Q_{21}U)D\perp E.
$$

If some $Q$ has a nonzero cross pair, put $K=Q_{20}I_a+Q_{21}U$. The preceding relation yields $\dim\ker(K|_D)\ge r+s-a=b-a$, hence

$$
\dim\bigl(\ker(K|_D)\cap E\bigr)\ge b+s-2a\ge2b-3a>0.
$$

Choose a nonzero $v$ in that intersection. Then $Q_{21}\ne0$ and $Uv=wv$, where $w=-Q_{20}/Q_{21}$ and $|w|=1$. Pairing this same $v\in D\cap E$ in the cross relation for every kernel form gives the common relation $Q_{20}+wQ_{21}=0$. A preimage of $v$ under $X_0$ gives the remaining equality $(1,w,0)^*Q(1,w,0)=0$.

If all cross pairs vanish, set

$$
A(Q)=(Q_{00}+Q_{11})I_a+Q_{01}U+Q_{10}U^*.
$$

The identities $X_0^*A(Q)X_0=0$ and $2r>a$ make every $A(Q)$ singular. Diagonalize the same $U$ once. The diagonal entries are finitely many real-linear functionals on the real vector space of Hermitian kernel forms. Their kernels cover that space; a real vector space cannot be covered by finitely many proper linear subspaces, so one fixed diagonal entry vanishes on the entire kernel. Its unitary eigenvalue supplies one common unit phase $w$, again with $(1,w,0)^*Q(1,w,0)=0$ for every $Q$.

In either branch, all four basis pairings on $L=\operatorname{span}_{\mathbb C}\{(0,0,1),(1,w,0)\}$ vanish, using $Q_{22}=0$, the cross relation, its conjugate, and the final quadratic relation. Sesquilinearity then gives the full $u^*Qv=0$ for all $u,v\in L$. Invertible coefficient congruence transports this common plane back to the original coordinates, preserving complex dimension and the full pairing. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-bridge-native-rectangular-bound title="A native rectangular dimension bound for three tensor summands" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeRectangularBound.bound"}
For arbitrary natural numbers $a,b,c,d$, take complex matrix families

$$
M_r\in M_{a\times b}(\mathbb C),\qquad N_r\in M_{d\times c}(\mathbb C)\qquad(r=0,1,2),
$$

Define the original contraction (rows indexed by $\operatorname{Fin}a\times\operatorname{Fin}d$ and columns by $\operatorname{Fin}b\times\operatorname{Fin}c$)

$$
F=\sum_{r=0}^2M_r\otimes N_r:
\mathbb C^b\otimes\mathbb C^c\longrightarrow\mathbb C^a\otimes\mathbb C^d.
$$

If $\lambda\in\mathbb R$ satisfies $\lambda>0$ and

$$
F^*F=\lambda I_{bc},\qquad 3a<2b,
$$

then

$$
2c\le d.
$$

The original triples need not be independent, whitened, or normalized. There are no additional dimension-positivity, ordering, or quadratic cone hypotheses; all natural dimensions are quantified, including zero-dimensional cases.
:::

::: proof
If $c=0$, the conclusion is $0\le d$. Assume $c>0$ below; the strict threshold gives $b>0$. If $a=0$ or $d=0$, every column of $F$ is zero, contradicting $F^*F=\lambda I_{bc}$; $b=0$ violates the threshold. Thus no zero-dimensional case has been silently removed. In the stronger range $2a<b$, [@thm-bridge-scalar-gram-obstruction] below already gives the stronger conclusion $3c\le d$. We explain the general mechanism for $2c\le d$.

Express the same $F$ as an exact tensor sum with the fewest terms, $\sum_{r<k}A_r^{(0)}\otimes D_r$, where $0\le k\le3$. A dependence on either factor side lets us solve for one factor and absorb its term into the others, reducing the width. Both factor families in a minimal decomposition are therefore complex-linearly independent. Set $A_r=A_r^{(0)}/\sqrt\lambda$, obtaining

$$
\widehat F=\frac{F}{\sqrt\lambda}=\sum_{r<k}A_r\otimes D_r,\qquad
\widehat F^*\widehat F=I_{bc}.
$$

Independence and normalization have been derived from the original premise.

For $c>0$, independence of the right factors makes the normalized Hilbert–Schmidt Gram

$$
H_{rs}=\frac1c\Tr(D_r^*D_s)
$$

positive definite: $z^*Hz=c^{-1}\|\sum_r z_rD_r\|_{\mathrm{HS}}^2>0$ for nonzero $z$. Hence $H=B^*B$ for an invertible $B$. Apply paired coefficient whitening:

$$
\begin{aligned}
X_r&=\sum_sB_{rs}A_s,\\
Y_r&=\sum_s(B^{-T})_{rs}D_s,\\
B^{-T}&=(B^T)^{-1}.
\end{aligned}
$$

The inverse transpose is required by the bilinear coefficient pairing of the tensor sum: $B^TB^{-T}=I_k$ ensures $\sum_rX_r\otimes Y_r=\widehat F$. This preserves the normalized contraction and factor independence. Taking the partial trace of $\widehat F^*\widehat F=I_b\otimes I_c$ over the second factor and dividing by $c$ gives

$$
\begin{aligned}
\sum_{r,s}H_{rs}A_r^*A_s&=I_b,\\
\sum_rX_r^*X_r&=I_b.
\end{aligned}
$$

The coefficient-first stack $S:\mathbb C^b\to\mathbb C^k\otimes\mathbb C^a$ therefore satisfies $S^*S=I_b$, so it is injective and $b\le ka$. Widths $k=0,1$ both contradict $b>a$.

For the remaining widths $k=2,3$, define the compression and the Gram defect for each pair of right indices:

$$
\begin{aligned}
\Phi_X(T)&=S^*(T\otimes I_a)S
=\sum_{r,s}T_{rs}X_r^*X_s,\\
(G_{\ell m})_{rs}&=(Y_r^*Y_s)_{\ell m},\\
R_{\ell m}&=G_{\ell m}-\delta_{\ell m}I_k
\qquad(0\le\ell,m<c).
\end{aligned}
$$

Here $\delta$ is the Kronecker symbol: every complex right-Gram defect has the form $R=G-\delta I$. Expand $\widehat F^*\widehat F=I_{bc}$, take the $(\ell,m)$ entry in the second factor, and subtract $\delta_{\ell m}\sum_rX_r^*X_r$. This gives $\Phi_X(R_{\ell m})=0$.

For $k=2$, $\operatorname{rank}S=b$. Two product-rank lower bounds give

$$
\operatorname{rank}\Phi_X(T)\ge a\operatorname{rank}T-2(2a-b).
$$

A nonzero $T$ with zero compression would have $\operatorname{rank}T\ge1$, forcing $2b\le3a$, a contradiction. Thus the compression kernel is zero, every $R_{\ell m}=0$, and $Y_r^*Y_s=\delta_{rs}I_c$. For $c=1$, $Y_0,Y_1$ are two orthogonal unit vectors in $\mathbb C^d$. For general $c$, the maps $Y_0,Y_1:\mathbb C^c\to\mathbb C^d$ are isometries with mutually orthogonal $c$-dimensional ranges. Their concatenation $[\,Y_0\ Y_1\,]$ has $2c$ orthonormal columns, hence $2c\le d$.

For $k=3$, we have derived the independence and stack injectivity required by [@thm-bridge-common-coefficient-plane]. Its common plane $L$ works for the entire Hermitian compression kernel, including a zero kernel. A complex defect $R=G-\delta I_3$ need not be Hermitian, and blocks with $\ell\ne m$ cannot be omitted. Since $\Phi_X(R^*)=\Phi_X(R)^*$, both Hermitian parts

$$
\begin{aligned}
R_{\mathrm R}&=\frac{R+R^*}{2},\\
R_{\mathrm I}&=\frac{R-R^*}{2i},\\
R&=R_{\mathrm R}+iR_{\mathrm I}.
\end{aligned}
$$

lie in the kernel. The same $L$ annihilates the full pairings of both parts of every block, so $u^*R_{\ell m}v=0$ for all $\ell,m$ and $u,v\in L$. These are Hermitian parts formed using the adjoint, not entrywise real and imaginary parts.

Choose an orthonormal basis matrix $V\in M_{3\times2}(\mathbb C)$ for $L$ and set

$$
W=[\,Y_0\ Y_1\ Y_2\,],\qquad C=V\otimes I_c.
$$

All the block relations, together with $V^*V=I_2$, give

$$
\begin{aligned}
(WC)^*(WC)&=I_{2c},\\
2c&=\operatorname{rank}(WC)\le d.
\end{aligned}
$$

For $c=1$, the two columns of $WC$ are orthogonal unit vectors; for general $c$, its two groups of columns span mutually orthogonal $c$-dimensional ranges. This conclusion uses every block of the tensor Gram, rather than following from the ambient inequality $bc\le ad$ alone. Minimal decomposition, whitening, stacking, and compression are proof auxiliaries; the original rows $(a,d)$ and columns $(b,c)$ of $F$ remain fixed. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-bridge-scalar-gram-obstruction title="A scalar-Gram obstruction for width-three bridge flows" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/RestrictedFlatSpectrum.obstruction"}
Let $a,b,c,d\in\mathbb N$ with $c>0$ and $b>2a$. For any three $a\times b$ complex matrices $M_r$, three $d\times c$ complex matrices $N_r$, and positive real scalar $\lambda$, if

$$
F=\sum_{r=0}^2M_r\otimes N_r,\qquad
F^*F=\lambda I_{bc},
$$

then $d\ge3c$. No additional assumption $a>0$, ordering condition, or quadratic cone condition is required.
:::

::: {.proof #pf-bridge-scalar-gram-obstruction}
Stack the three matrices $M_r$ vertically to form the auxiliary map

$$
V:\mathbb C^b\longrightarrow\mathbb C^3\otimes\mathbb C^a,\qquad
Vx=\sum_{r=0}^2e_r\otimes M_rx.
$$

If $Vx=0$, then every $M_rx=0$, so $F(x\otimes y)=0$. Choose nonzero $y\in\mathbb C^c$. The identity $F^*F=\lambda I_{bc}$ gives $\lambda\|x\|^2\|y\|^2=0$, hence $x=0$. Thus $W=\operatorname{range}V$ has dimension $b$.

Fix any nonzero coefficient direction $z=(z_0,z_1,z_2)\in\mathbb C^3$. The subspace $z\otimes\mathbb C^a$ has dimension $a$ inside an ambient space of dimension $3a$. Since $b+a>3a$, we have $W\cap(z\otimes\mathbb C^a)\ne\{0\}$. There are therefore nonzero $x,u$ with $Vx=z\otimes u$, meaning $M_rx=z_ru$ for every $r$.

This makes the nine matrices $M_r^*M_s$ linearly independent. Indeed, suppose a complex coefficient matrix $T=(t_{rs})$ satisfies $\sum_{r,s}t_{rs}M_r^*M_s=0$. Pairing with the chosen $x$ on both sides gives

$$
0=\sum_{r,s}t_{rs}\langle M_rx,M_sx\rangle
=\|u\|^2z^*Tz.
$$

Thus $z^*Tz=0$ for every $z$, including $z=0$. Substituting $e_r$, then $e_r+e_s$ and $e_r+i e_s$ for $r\ne s$, yields

$$
t_{rr}=0,\qquad t_{rs}+t_{sr}=0,\qquad
it_{rs}-it_{sr}=0.
$$

Hence every $t_{rs}=0$. Both real and imaginary directions matter here; testing only real vectors $z$ would not suffice.

Next expand the original column Gram identity:

$$
\sum_{r,s}(M_r^*M_s)\otimes(N_r^*N_s)
=\lambda I_b\otimes I_c.
$$

Since $c>0$, fix a coordinate $k$ and define $H_{rs}=(N_r^*N_s)_{kk}$. Let $\delta_{ij}$ denote the Kronecker delta. For any $i,j$, take the $(i,j)$ matrix entry in the second tensor factor, then subtract $\delta_{ij}$ times the corresponding $(k,k)$ equation. This gives

$$
\sum_{r,s}\bigl((N_r^*N_s)_{ij}-\delta_{ij}H_{rs}\bigr)M_r^*M_s=0.
$$

Linear independence of the nine matrices $M_r^*M_s$ forces every coefficient to vanish. Thus all cross Grams are scalar matrices: $N_r^*N_s=H_{rs}I_c$. The $(k,k)$ equation can also be written using the vertical stack $V$ as

$$
V^*(H\otimes I_a)V=\lambda I_b.
$$

Since $\lambda>0$, the right side has rank $b$. The rank of the product cannot exceed that of its middle factor, so

$$
b\le\operatorname{rank}(H\otimes I_a)
=a\operatorname{rank}H.
$$

The $3\times3$ matrix $H$ has rank at most $3$. Rank at most $2$ would imply $b\le2a$, contradicting the hypothesis. Therefore $\operatorname{rank}H=3$. Finally, concatenate horizontally:

$$
C=[\,N_0\ N_1\ N_2\,]\in M_{d\times3c}(\mathbb C).
$$

Its Gram matrix is $C^*C=H\otimes I_c$, giving

$$
3c=c\operatorname{rank}H
=\operatorname{rank}(C^*C)
\le\operatorname{rank}C\le d.
$$

The auxiliary stack and concatenation serve only the proof; the original three summands and row–column grouping remain unchanged. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-bridge-two-five-flat-spectrum title="Rank ten without a flat spectrum: $(2,5,2,5)$"}
Take $(a,b,c,d)=(2,5,2,5)$. All positivity, ordering, and quadratic cone assumptions hold:

$$
\begin{aligned}
0<a=2&\le b=5,\qquad 0<c=2\le d=5,\\
a^2+b^2=c^2+d^2&=29\le30=3ab=3cd.
\end{aligned}
$$

This tuple remains allowed even with the additional ratio bounds $2b\le5a$ and $2d\le5c$, because $2b=5a=10$ and $2d=5c=10$.

Here $ad=bc=10$ and $3ac=12$, so [@thm-bridge-quantum-maxflow-mincut] gives $\operatorname{QMaxFlow}=\operatorname{QMinCut}=10$. By [@lemma-bridge-flow-attained], some choice of the three matrix pairs achieves rank $10$. Yet $b=5>2a=4$: if $F^*F=\lambda I_{10}$ held for some $\lambda>0$, [@thm-bridge-scalar-gram-obstruction] would require $d\ge3c=6$, contradicting $d=5$. Thus the column identity fails for every such pair of complex matrix triples and every positive $\lambda$.

This counterexample lies exactly on the seam $ad=bc$, where both scalar-Gram requirements apply. The impossible column identity already rules out their joint satisfaction by a single witness. A full-rank bridge flow exists, but no bridge flow has ten equal positive singular values: across this row–column bipartition, attaining rank $10$ does not yield normalized entanglement entropy $\ln10$.
:::

The Schmidt-weight and entropy discussion above is a spectral interpretation for a normalized pure state; the theorem itself states only a necessary dimension condition. This obstruction concerns the specified grouping of three complex Kronecker summands and exact spectral flatness. It supplies no error bound for approximate flatness and establishes no claim about general tensor networks, physical realization, or continuum holography.

Does tightening the ratios to $b\le2a$ and $d\le2c$ guarantee an exactly flat spectrum? The older $b>2a$ obstruction no longer applies, but [@thm-bridge-native-rectangular-bound] can still exclude it. We retain the existing fixed-size result and its source below; it is also a specialization of the general bound at $(3,5,3,5)$.

::: {.theorem #thm-bridge-three-five-flat-spectrum-obstruction title="A positive scalar-Gram obstruction at $(3,5,3,5)$" lean="D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.positive_scalar_obstruction"}
For arbitrary triples of complex matrices $M_r\in M_{3\times5}(\mathbb C)$ and $N_r\in M_{5\times3}(\mathbb C)$ ($r=0,1,2$), and every real $\lambda>0$, let

$$
F=\sum_{r=0}^2M_r\otimes N_r:
\mathbb C^5\otimes\mathbb C^3\longrightarrow
\mathbb C^3\otimes\mathbb C^5.
$$

Then $F^*F\ne\lambda I_{15}$, where $I_{15}$ is indexed by $\operatorname{Fin}5\times\operatorname{Fin}3$.
:::

::: {.proof #pf-bridge-three-five-flat-spectrum-obstruction}
Suppose $F^*F=\lambda I_{15}$. Since $3a=9<10=2b$, [@thm-bridge-native-rectangular-bound] requires $2c=6\le d=5$, a contradiction. Here the general proof is the impossibility of fitting two orthogonal three-dimensional ranges into a five-dimensional space; the original fixed-size [common_plane](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.common_plane) also supplies the common coefficient plane used here. This result retains its separate source [positive_scalar_obstruction](lean:D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.positive_scalar_obstruction). The full proof is checked by the Lean kernel.
:::

::: {.example #ex-bridge-three-five-flat-spectrum title="All eight premises hold: rank fifteen without a flat spectrum at $(3,5,3,5)$"}
Take $(a,b,c,d)=(3,5,3,5)$. Check each of the eight premises of the original universal [`claim`](lean:D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.claim):

$$
\begin{aligned}
0<a&:\quad0<3,& a\le b&:\quad3\le5,\\
0<c&:\quad0<3,& c\le d&:\quad3\le5,\\
a^2+b^2\le3ab&:\quad34\le45,\\
c^2+d^2\le3cd&:\quad34\le45,\\
b\le2a&:\quad5\le6,& d\le2c&:\quad5\le6.
\end{aligned}
$$

The first six are exactly the hypotheses of [@thm-bridge-quantum-maxflow-mincut]; that rank theorem makes no additional promise of a flat spectrum. Since $ad=bc=15$ and $3ac=27$, it gives $\operatorname{QMaxFlow}=\operatorname{QMinCut}=15$. Then [@lemma-bridge-flow-attained] supplies matrices with $\operatorname{rank}F=15$. This combines the existing declarations using the same `flow` definition and row and column indices.

Yet [@thm-bridge-three-five-flat-spectrum-obstruction] excludes $F^*F=\lambda I_{15}$ for every pair of matrix triples and every $\lambda>0$. Hence no exactly flat positive singular spectrum of length $15$ is attainable. The earlier [@thm-bridge-scalar-gram-obstruction] does not apply here because $b=5\le2a=6$.

The original universal claim requires the same $M,N$ and the same positive $\lambda$ to witness both conditional Gram equations at the start of this section. Here $ad=bc$ activates both conditions, and the column equation alone contradicts the new theorem. Even after imposing $b\le2a$ and $d\le2c$, rank attainability on the cone therefore cannot be strengthened to attainability of an exactly flat spectrum.
:::

This example establishes neither a smallest counterexample, an optimal ratio threshold, nor a complete dimension classification. It supplies no quantitative gap for approximately flat spectra. Its scope remains a finite-dimensional contraction in the fixed row/column bipartition, without a claim of physical realization or saturation of the RT formula.

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

## 19.5 Open-boundary matrix product states: three-site marginal recovery and intrinsic genericity {#sec-open-boundary-mps-recovery}

Whereas the width-three bridge graph bounds the entanglement rank transmissible across a fixed bottleneck cut, one-dimensional **open-boundary matrix product states** (MPS) of bond dimension $2$ address the dual inverse problem: **when does a single contiguous three-site unnormalized marginal matrix uniquely determine the global many-body state up to a unit-modulus phase $z$ ($\|z\| = 1$)?**

Following the Lean formalization, write `Bond := Matrix (Fin 2) (Fin 2) ℂ` for $2\times 2$ virtual bond matrices and `Word n := Fin n → Fin 2` for length-$n$ qubit words. Given site matrices $a_0, a_1 \in \mathrm{Bond}$ and open-boundary vectors $b_0, b_1 \in \mathbb{C}^2$, the open-boundary MPS amplitude and state family are

$$
\operatorname{mpsState}(n, a_0, a_1, b_0, b_1)(w) := b_0 \cdot_{\mathrm{v}} \Bigl(\Bigl(\prod_{j \in \mathrm{Fin}\,n} a_{w(j)}\Bigr) *_{\mathrm{v}} b_1\Bigr), \qquad \operatorname{openBoundaryMPS}(n) := \bigl\{\psi \;\big|\; \exists a_0, a_1, b_0, b_1,\; \psi = \operatorname{mpsState}(n, a_0, a_1, b_0, b_1)\bigr\},
$$

where $\cdot_{\mathrm{v}}$ denotes the unconjugated bilinear `dotProduct`. Splitting a chain of length $k + m$ into its first $k$ sites and remaining $m$ sites defines the flattened matrix $\operatorname{amplitudeColumns}(k, m, \psi)_{u, b} := \psi(\operatorname{append}(u, b))$ and the **unnormalized** $k$-site prefix marginal

$$
\operatorname{rawPrefix}(k, m, \psi) := \operatorname{amplitudeColumns}(k, m, \psi)\,\bigl(\operatorname{amplitudeColumns}(k, m, \psi)\bigr)^* \in M_{\mathrm{Word}\,k}(\mathbb{C}).
$$

Two concrete hand checks anchor the definitions. First, on a $3$-site chain with commuting diagonal matrices $a_0 = I_2$, $a_1 = \operatorname{diag}(1, 2)$ and boundary vectors $b_0 = b_1 = (1, 1)^T$, the word $w = 010$ has amplitude $(1, 1)\cdot \operatorname{diag}(1, 2)(1, 1)^T = 1 + 2 = 3$; multiplying $\psi$ by $i$ leaves $\psi\psi^*$ and every $\operatorname{rawPrefix}$ unchanged since $i\overline{i} = 1$, illustrating why a global unit phase is invisible to unnormalized marginals (note also that this commuting diagonal example has a non-injective transfer map and therefore lies outside the observable chart defined below). Second, at the minimal tail length $m = 2$ needed for interior windows (total chain length $3 + m = 5$, spanning $2^5 = 32$ complex amplitudes), $\operatorname{rawPrefix}(3, 2, \psi)$ is an $8\times 8$ Hermitian positive-semidefinite matrix, while leaving $p = 1$ site on the left and $q = 1$ site on the right ($p + q = 2$) produces the $8\times 8$ unnormalized interior marginal $\operatorname{rawInterior}(1, 3, 1, \psi)$ on the middle three sites $\{1, 2, 3\}$.

To isolate nondegenerate chains, define for any pair $A : \mathrm{Fin}\,2 \to \mathrm{Bond}$ the transfer map $\operatorname{transfer}(A)(X) := \sum_{i \in \mathrm{Fin}\,2} A_i X A_i^*$ and dual transfer map $\operatorname{dualTransfer}(A)(X) := \sum_{i \in \mathrm{Fin}\,2} A_i^* X A_i$. From a three-site slice $t : \mathrm{Word}\,3 \to \mathbb{C}$, minor and adjugate polynomials construct the rational canonical core $\operatorname{canonicalCore}(t) : \mathrm{Fin}\,2 \to \mathrm{Bond}$ guarded by the denominator polynomial `chartPoly : MvPolynomial (Word 3) ℂ`. A state $\psi : \mathrm{Word}\,(3 + m) \to \mathbb{C}$ satisfies `ObservableChart m ψ` when there exists a probe vector $v : \mathrm{Word}\,3 \to \mathbb{C}$ such that, setting $t := \operatorname{rawPrefix}(3, m, \psi) *_{\mathrm{v}} v$, both $\operatorname{eval}_t(\mathrm{chartPoly}) \neq 0$ and $\operatorname{transfer}(\operatorname{canonicalCore}(t))$ is injective on $M_2(\mathbb{C})$.

::: {.theorem #thm-mps-observable-phase-recovery title="MPS Phase Recovery in an Observable Chart" lean="D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery"}
Let $m \in \mathbb{N}$, and let $\psi, \varphi : \mathrm{Word}\,(3 + m) \to \mathbb{C}$ belong to $\operatorname{openBoundaryMPS}(3 + m)$ with $\operatorname{ObservableChart}(m, \psi)$. Then their unnormalized three-site prefix marginals agree if and only if $\varphi$ and $\psi$ differ by a unit-modulus complex phase:

$$
\operatorname{rawPrefix}(3, m, \varphi) = \operatorname{rawPrefix}(3, m, \psi) \iff \exists z \in \mathbb{C},\; \|z\| = 1 \;\land\; \varphi = z \cdot \psi.
$$

:::

::: proof
If $\varphi = z \cdot \psi$ with $\|z\| = 1$, then $\operatorname{amplitudeColumns}(3, m, \varphi) = z\,\operatorname{amplitudeColumns}(3, m, \psi)$, so $z\overline{z} = \|z\|^2 = 1$ cancels in $\operatorname{rawPrefix}(3, m, \varphi) = \operatorname{rawPrefix}(3, m, \psi)$. Conversely, assume $\operatorname{rawPrefix}(3, m, \varphi) = \operatorname{rawPrefix}(3, m, \psi)$ and choose $v$ witnessing $\operatorname{ObservableChart}(m, \psi)$. Both states produce the identical slice $t = \operatorname{rawPrefix}(3, m, \psi) *_{\mathrm{v}} v$ with $\operatorname{eval}_t(\mathrm{chartPoly}) \neq 0$ (avoiding zero-denominator rational junk values) and injective $\operatorname{transfer}(\operatorname{canonicalCore}(t))$. Gauge similarity uniqueness for bond-dimension-$2$ injective transfer operators together with full-rank boundary Gram propagation forces $\varphi$ and $\psi$ onto the same complex ray, and matching their positive traces $\Tr(\operatorname{rawPrefix}(3, m, \varphi)) = \Tr(\operatorname{rawPrefix}(3, m, \psi)) > 0$ pins $\|z\| = 1$. The full proof is checked by the Lean kernel.
:::

Is such local recoverability rare or generic inside $\operatorname{openBoundaryMPS}(3 + m)$? Whenever $m \ge 2$ (total chain length $3 + m \ge 5$, accommodating at least $p \ge 1$ left boundary site and $q \ge 1$ right boundary site with $p + q = m$), tracing out the left $p$ sites and right $q$ sites defines the unnormalized interior three-site marginal $\operatorname{rawInterior}(p, 3, q, \cdot) \in M_{\mathrm{Word}\,3}(\mathbb{C})$. Writing $\mathrm{ObsIndex} := \mathrm{Word}\,3 \times \mathrm{Word}\,3$, the predicate `intrinsicInteriorRecovery m` asserts that there exists a nonzero real multivariable polynomial $R \in \mathrm{MvPolynomial}\,(\mathrm{ObsIndex} \oplus \mathrm{ObsIndex})\,\mathbb{R}$ (in the real and imaginary parts of $\operatorname{rawPrefix}(3, m, \psi)$) whose nonvanishing locus $\operatorname{actualPrincipalLocus}(m, R)$ inside the subtype $\operatorname{openBoundaryMPS}(3 + m)$ (equipped with the subspace topology) is **nonempty**, **open** (`IsOpen`), **dense** (`Dense`), and **invariant under unit-modulus phases**; furthermore, for every $\psi$ in $\operatorname{actualPrincipalLocus}(m, R)$, its $13$-coordinate real quotient invariant $x$ and canonical parameter $\theta = \operatorname{positiveRepresentative}(x)$ satisfy simultaneously: (i) $\sigma(x) > 0$ and $\psi = z \cdot \operatorname{state}(3 + m, \theta)$ for some $\|z\| = 1$; (ii) $\operatorname{TwoSiteSpanning}(\operatorname{core}(\theta))$ (the four products $A_i A_j$ span $M_2(\mathbb{C})$) and injectivity of $\operatorname{transfer}(\operatorname{core}(\theta))$; (iii) for every $k \ge 1$, the $k$-step iterated left and right $2\times 2$ boundary Gram matrices under $\operatorname{dualTransfer}(\operatorname{core}(\theta))$ and $\operatorname{transfer}(\operatorname{core}(\theta))$ are strictly positive definite (`PosDef`); and (iv) for every interior split $p \ge 1, q \ge 1, p + q = m$ (with index cast $\mathrm{cast}_h : \mathrm{Word}\,((p + 3) + q) \to \mathrm{Word}\,(3 + m)$) and every $\varphi \in \operatorname{openBoundaryMPS}(3 + m)$,

$$
\operatorname{rawInterior}(p, 3, q, \varphi \circ \mathrm{cast}_h) = \operatorname{rawInterior}(p, 3, q, \psi \circ \mathrm{cast}_h) \iff \exists z \in \mathbb{C},\; \|z\| = 1 \;\land\; \varphi = z \cdot \psi.
$$

::: {.theorem #thm-mps-generic-interior-recovery title="Intrinsic Genericity of Interior MPS Recovery" lean="D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorGenericity.intrinsic_interior_recovery"}
For every natural number $m \in \mathbb{N}$ satisfying $2 \le m$ (total chain length $3 + m \ge 5$), $\operatorname{intrinsicInteriorRecovery}(m)$ holds: there exists a nonzero real polynomial $R \neq 0$ in the real and imaginary coordinates of the three-site prefix marginal whose principal nonvanishing locus in $\operatorname{openBoundaryMPS}(3 + m)$ is nonempty, open, dense, and unit-phase invariant, and on which every state admits canonical positive-representative reconstruction, two-site spanning, an injective transfer map, positive-definite iterated boundary Gram matrices, and phase-unique recovery inside $\operatorname{openBoundaryMPS}(3 + m)$ from any contiguous interior three-site unnormalized marginal ($p \ge 1, q \ge 1, p + q = m$).
:::

::: proof
Fix $m \ge 2$. The formalization packages two-site spanning, transfer injectivity, the quotient-chart positivity $\sigma(x) > 0$, and positive-definite boundary propagation into a single real polynomial $R$ evaluated on the real and imaginary entries of $\operatorname{rawPrefix}(3, m, \psi)$, and exhibits an explicit nondegenerate bond-dimension-$2$ witness to certify $R \neq 0$ and nonemptiness of $\operatorname{actualPrincipalLocus}(m, R)$. Continuity of $\psi \mapsto \operatorname{rawPrefix}(3, m, \psi)$ makes the nonvanishing locus open in the subspace topology, while real-analytic line perturbations from any parameter tuple toward the explicit witness have only isolated zeros and establish density in $\operatorname{openBoundaryMPS}(3 + m)$. At every $\psi$ in this locus, properties (ii) and (iii) ensure full-rank positive-definite left ($p \ge 1$) and right ($q \ge 1$) boundary Gram matrices, allowing $\operatorname{rawInterior}(p, 3, q, \psi \circ \mathrm{cast}_h)$ to determine the canonical gauge invariants and lock any $\varphi \in \operatorname{openBoundaryMPS}(3 + m)$ sharing that interior marginal to $z \cdot \psi$ with $\|z\| = 1$. The full proof is checked by the Lean kernel.
:::

Three scope guardrails govern [@thm-mps-observable-phase-recovery] and [@thm-mps-generic-interior-recovery]. First, $\operatorname{rawPrefix}$ and $\operatorname{rawInterior}$ are **unnormalized** outer products ($\psi$ is not assumed to have unit norm, and the marginal trace encodes $\|\psi\|^2$). Second, neither `ObservableChart m ψ` nor $R \neq 0$ can be omitted: singular states such as product states, GHZ states, and the commuting diagonal chain checked above genuinely sit inside the lower-dimensional complement of the principal locus and are not uniquely determined by a three-site marginal. Third, "genericity" here means topological openness and density (`IsOpen` and `Dense`) in the subtype topology of $\operatorname{openBoundaryMPS}(3 + m)$, neither asserting "probability $1$" with respect to an unspecified measure nor claiming polynomial-time numerical robustness against finite-sample noise.

Across both the width-three bridge network and one-dimensional open-boundary MPS chains, we have seen how finite virtual bond dimensions govern bipartite rank capacity via $\min(ad, bc)$ ([@thm-bridge-quantum-maxflow-mincut]) and lock global pure-state phases from contiguous three-site marginals on the principal locus ([@thm-mps-observable-phase-recovery], [@thm-mps-generic-interior-recovery]). Rank saturation does not guarantee entropy saturation, as [@ex-bridge-two-five-flat-spectrum] shows exactly. Assuming in the model considered next that entanglement entropy has reached the bound given by the logarithm of the cut capacity remains a separate scenario assumption, and is not equivalent to thermal equilibrium. We now turn to circuit depth and gate count: what rigorous limits constrain them, and where do those results end and conjectures about holographic complexity begin? See [Chapter 20](ch20-complexity-and-spacetime.md), the closing chapter of Part V.

::: {.viz src="layered-network-cut" height="560"}
The full laboratory of the layered network and its cut: drag one or two intervals along the boundary and watch the magenta minimal cut thread through the network, counting the bonds it severs. The network is a schematic model and the counts are computed by the page; the RT formula and the MERA analogy are literature results, not formalized in this book, and green is reserved for [@prop-bridge-flow-cut-bound].
:::
