# 19.1 Entanglement hierarchies and finite tensor networks {#sec-mera-hierarchy}

Suppose two composite quantum subsystems — a left boundary and a right boundary — communicate through an intermediate network of contracted tensor legs. If only a single one-dimensional scalar wire links the two sides, the induced linear map across the cut has rank at most $1$ regardless of how large the boundary Hilbert spaces are. When multiple internal bonds bridge the interface in parallel, the operator rank across the cut (the number of nonzero Schmidt singular values) can grow with the product of the bond dimensions.

As illustrated in [Figure 19](ch19-tensor-networks-and-holography.md), Panel I, hierarchical tensor networks such as MERA are widely used in the physics literature to motivate a geometric link between boundary entanglement and bulk bottleneck cuts. In general tensor networks, however, the quantum max-flow (the maximum matrix rank achievable by varying local tensors) can be strictly smaller than the quantum min-cut (the minimum product of bond dimensions across a disconnecting cut). (Literature result: S. X. Cui, M. H. Freedman, O. Sattath, R. Stong and G. Minton, *Quantum max-flow/min-cut*, J. Math. Phys. 57, 062206 (2016), arXiv:1508.04644.) To establish a theorem verified by the Lean kernel, we focus on an explicit finite-dimensional bridge network whose parameters and cone domain are completely specified.

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
