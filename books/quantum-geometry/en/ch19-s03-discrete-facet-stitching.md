# 19.3 Cone domains and discrete capacity facets {#sec-discrete-facet-stitching}

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
