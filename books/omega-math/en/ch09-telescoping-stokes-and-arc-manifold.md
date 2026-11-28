# Chapter 9 Telescoping Heap Integrals, Simplicial Homotopy, and Osculating Arc Manifolds

In [Chapter 7](ch07-second-order-jet-calculus.md) and [Chapter 8](ch08-dfinite-jets-and-cayley-unification.md), second-order and arbitrary-order rational jet rings eliminated $\epsilon\text{-}\delta$ limits from differentiation. We now confront the global half of calculus and differential geometry: **integration, Stokes' theorem, and the definition of a manifold itself.**

Classical analysis rests on two entrenched dogmas: first, that line and surface integrals demand infinite mesh refinement ($h \to 0$) to wash out $O(h^2)$ discretization errors in Stokes' theorem; second, that curved manifolds must be cobbled together from flattened Euclidean coordinate charts $\mathbb{R}^n$, flat tangent plates $T_p M \cong \mathbb{R}^n$, and non-analytic $C^\infty$ bump functions. This chapter dismantles both dogmas. Using Law I heap cancellation $[\mathbf{y}, \mathbf{x}, \mathbf{x}] \equiv \mathbf{y}$, we derive **exact finite-mesh Stokes identities**, using compatible paths and factor order for non-Abelian products; we certify in the zero-axiom kernel **finite-chain endpoint telescoping, universal coboundary nilpotency, and Choice-free vertex-cone homotopy exactness** on arbitrary vertex types and commutative groups alongside the frozen simplicial cochain repair theorem; and we replace Riemann's 1854 flat tangent plates and $C^\infty$ partitions of unity with the **second-order osculating ternion-sphere manifold $\mathcal{M}_\Omega$**, stitched by the rational conformal Möbius group and anchored to a compact solenoid braid by the zero-charge solenoid theorem.

## 9.1 Subdivision-Free Exact Stokes Theorem via Ternary Heap Folding {#sec-ch09-telescoping-heap-stokes}

Why do the fundamental theorem of calculus and Stokes' theorem appear to require a mesh-refinement limit $h \to 0$? Only because classical analysis forces flat rectangles onto curved domains and conflates quadrature error with boundary cancellation. Defining integration directly by **ternary heap folding** lets us trace the exact cancellations on a finite mesh. For non-Abelian holonomy, we also have to track the path and factor order at each gluing step.

::: {.definition #def-ch09-heap-line-integral title="Ternary heap line integral and finite-mesh plaquette holonomy"}
Let $(\mathcal{M}, [-,-,-])$ be an origin-free ternary heap as introduced in [Chapter 4](ch04-heaps-and-lie-triple-curvature.md) (canonically realized by the rational ternion sphere $\mathbb{T}_3(\mathbb{Q}) = S^3(\mathbb{Q})$, obeying Law I cancellation $[\mathbf{x}, \mathbf{x}, \mathbf{y}] = \mathbf{y}$ and $[\mathbf{y}, \mathbf{x}, \mathbf{x}] = \mathbf{y}$ together with heap associativity).

1. **Exact ternary heap line integral**: Along any finite directed chain $\Gamma = (\mathbf{x}_0, \mathbf{x}_1, \dots, \mathbf{x}_n)$, define the **heap-folded line integral** inductively by

   $$
   \mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0) := \mathbf{x}_0, \qquad \mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0, \dots, \mathbf{x}_k, \mathbf{x}_{k+1}) := \bigl[\mathbf{x}_{k+1},\; \mathbf{x}_k,\; \mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0, \dots, \mathbf{x}_k)\bigr].
   $$

2. **Non-Abelian discrete connection and whiskered plaquettes**: On a finite oriented triangulated surface $\Sigma$, assign to each directed edge $e_{ij}$ a rational unit spinor transport $\mathbf{U}_{ij} \in S^3(\mathbb{Q})$ satisfying $\mathbf{U}_{ji} = \mathbf{U}_{ij}^{-1}$, and define path holonomy along $\gamma = (v_0 \to v_1 \to \dots \to v_m)$ right-to-left by $\operatorname{Hol}(\gamma) := \mathbf{U}_{v_{m-1} v_m}\cdots \mathbf{U}_{v_0 v_1}$. Given a path from the boundary root $r$ to the starting vertex $v_k$ of a plaquette loop, write $\mathbf{P}_{r \to v_k}$ for its transport. Conjugate the plaquette holonomy $\mathbf{W}_k$ back to $r$ to get the **whiskered plaquette** $\widetilde{\mathbf{W}}_k^{(r)} := \mathbf{P}_{r \to v_k}^{-1}\,\mathbf{W}_k\,\mathbf{P}_{r \to v_k}$.
:::

By Law I cancellation $[\mathbf{y}, \mathbf{x}, \mathbf{x}] \equiv \mathbf{y}$ and associativity, both one-dimensional and two-dimensional exact Stokes laws hold with zero subdivision limit (manual derivation for non-Abelian heap folding and shelled spinor plaquettes, while finite-chain endpoint telescoping and closed-loop vanishing in any additive commutative group are kernel-verified with zero axioms in [@thm-ch09-chain-telescope-and-nilpotency] below):

1. **Exact telescoping on arbitrary 1D chains**: Assuming inductively that $\mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0, \dots, \mathbf{x}_k) = \mathbf{x}_k$, Law I cancellation gives at the next vertex

   $$
   \mathcal{I}_{\mathrm{heap}}(\mathbf{x}_0, \dots, \mathbf{x}_k, \mathbf{x}_{k+1}) \;=\; \bigl[\mathbf{x}_{k+1},\; \mathbf{x}_k,\; \mathbf{x}_k\bigr] \;\equiv\; \mathbf{x}_{k+1}.
   $$

   In any anchored group representation, every intermediate vertex $\mathbf{x}_1, \dots, \mathbf{x}_{n-1}$ cancels pairwise via $(\mathbf{x}_n \bar{\mathbf{x}}_{n-1})(\mathbf{x}_{n-1}\bar{\mathbf{x}}_{n-2})\cdots(\mathbf{x}_1\bar{\mathbf{x}}_0) \equiv \mathbf{x}_n \bar{\mathbf{x}}_0$ with zero discretization error.
2. **Subdivision-free 2D Stokes theorem on coarse meshes**: Let a finite oriented disk $\Sigma$ be tiled arbitrarily coarsely by $M$ triangular plaquettes $\{\Delta_k\}_{k=1}^M$.
   - **Abelian cochain case**: For edge assignments in an additive commutative group $A$ ($\Phi(e_{BA}) = -\Phi(e_{AB})$), every shared interior edge is traversed once in each orientation, so $\Phi(e_{AB}) + \Phi(e_{BA}) \equiv 0$ and the sum of interior plaquette fluxes equals the boundary sum identically: $\sum_{k=1}^M (\delta\Phi)(\Delta_k) \equiv \sum_{e \subset \partial\Sigma} \Phi(e)$.
   - **Non-Abelian spinor case (hand derivation).** Start with a triangle incident to the root $r$. At each gluing step, suppose the current oriented boundary from $r$ consists of three successive paths: a prefix, the shared edge path, and a suffix. The new boundary replaces just the shared path with the exposed path of the new triangle and keeps the prefix and suffix. Write $P,B,C,D$ for the transports along the prefix, the old path, the new path, and the suffix, respectively. The two paths have the same endpoints. The oriented face loop follows the exposed path and returns along the shared path, so its holonomy based at the start of the splice is $B^{-1}C$.

     $$
     DCP = (DBP)\bigl(P^{-1}B^{-1}CP\bigr).
     $$

     Thus at each step we use the **current boundary prefix** as the whisker and multiply the old holonomy by the new factor **on the right**. If the gluing sequence admits this rooted boundary at every step, iteration gives $\operatorname{Hol}(\partial\Sigma)=\widetilde{\mathbf{W}}_1^{(r)}\cdots\widetilde{\mathbf{W}}_M^{(r)}$, with the first factor based directly at $r$. Adjacent inverses cancel exactly even on a mesh as coarse as two triangles.

::: {.example #ex-ch09-coarse-two-plaquette-stokes title="Exact non-Abelian Stokes computation on a four-vertex two-plaquette mesh"}
Consider a four-vertex disk $\Sigma = (0, 1, 2, 3)$ split coarsely along a single interior diagonal $(1, 3)$ into two triangles, $\Delta_1 = (0 \to 1 \to 3 \to 0)$ and $\Delta_2 = (1 \to 2 \to 3 \to 1)$, with outer boundary $\partial\Sigma = (0 \to 1 \to 2 \to 3 \to 0)$. Assign purely rational Cayley unit spinors to the five directed edges (manual derivation):

$$
\begin{aligned}
\mathbf{U}_{01} &= \bigl(\tfrac{3}{5}, \tfrac{4}{5}, 0, 0\bigr), &
\mathbf{U}_{12} &= \bigl(\tfrac{3}{5}, 0, \tfrac{4}{5}, 0\bigr), &
\mathbf{U}_{23} &= \bigl(\tfrac{3}{5}, 0, 0, \tfrac{4}{5}\bigr), \\
\mathbf{U}_{30} &= \bigl(\tfrac{1}{2}, \tfrac{1}{2}, \tfrac{1}{2}, \tfrac{1}{2}\bigr), &
\mathbf{U}_{13} &= \bigl(\tfrac{4}{5}, \tfrac{3}{5}, 0, 0\bigr).
\end{aligned}
$$

Anchor at $r = 0$, using the edge $\mathbf{U}_{01}$ as the whisker for $\Delta_2$:

1. **First plaquette (anchored directly at $0$)**: Since $\mathbf{U}_{13}\mathbf{U}_{01} = (0, 1, 0, 0) = \mathbf{i}$, we get immediately $\mathbf{W}_1 = \mathbf{U}_{30}\mathbf{U}_{13}\mathbf{U}_{01} = \bigl(-\frac{1}{2}, \frac{1}{2}, \frac{1}{2}, -\frac{1}{2}\bigr)$;
2. **Second plaquette (whiskered to $0$ via $\mathbf{U}_{01}$)**: Direct multiplication yields $\mathbf{F}_2 = \mathbf{U}_{13}^{-1}\mathbf{U}_{23}\mathbf{U}_{12} = \bigl(-\frac{12}{125}, -\frac{91}{125}, \frac{84}{125}, \frac{12}{125}\bigr)$, and conjugation gives $\widetilde{\mathbf{W}}_2 = \mathbf{U}_{01}^{-1}\mathbf{F}_2\mathbf{U}_{01} = \bigl(-\frac{12}{125}, -\frac{91}{125}, -\frac{12}{125}, -\frac{84}{125}\bigr)$;
3. **Exact shelling product**. Multiply the first face's holonomy by the whiskered second face on the right to obtain

   $$
   \mathbf{W}_1\,\widetilde{\mathbf{W}}_2 \;=\; \left(\frac{31}{250},\; -\frac{17}{250},\; \frac{7}{10},\; \frac{7}{10}\right) \;=\; \mathbf{U}_{30}\mathbf{U}_{23}\mathbf{U}_{12}\mathbf{U}_{01} \;=\; \operatorname{Hol}(\partial\Sigma),
   $$

   In the expanded product $(\mathbf{U}_{30}\mathbf{U}_{13}\mathbf{U}_{01})(\mathbf{U}_{01}^{-1}\mathbf{U}_{13}^{-1}\mathbf{U}_{23}\mathbf{U}_{12}\mathbf{U}_{01})$, the inverse pairs become adjacent and cancel in turn. Reversing the order gives $\widetilde{\mathbf{W}}_2\mathbf{W}_1=\bigl(\frac{31}{250}, \frac{7}{10}, -\frac{7}{10}, \frac{17}{250}\bigr)\ne\operatorname{Hol}(\partial\Sigma)$.

Use the same triangulation to test the path condition. Set $\mathbf{U}_{01}=\mathbf{U}_{12}=\mathbf{U}_{30}=1$, $\mathbf{U}_{23}=\mathbf{j}$, and $\mathbf{U}_{13}=\mathbf{i}$. The outer boundary has holonomy $\mathbf{j}$, and the face loops give $\mathbf{W}_1=\mathbf{i}$ and $\mathbf{F}_2=-\mathbf{k}$. Whiskering the second face along $0\to1$ gives the product $\mathbf{i}(-\mathbf{k})=\mathbf{j}$. The path $0\to3\to1$ in the tree $\{03,31,12\}$ has transport $-\mathbf{i}$ and conjugates the second face to $\mathbf{k}$. With that path the same order gives $\mathbf{i}\mathbf{k}=-\mathbf{j}$.
:::

## 9.2 Coarse Simplicial Cochain Calculus and Choice-Free Cone Homotopy {#sec-ch09-simplicial-cone-homotopy}

Lifting two-dimensional plaquettes to tetrahedra and higher-dimensional simplices leads directly to the algebraic backbone of discrete exterior calculus: finite-chain telescoping, $\delta^2 = 0$, and a constructive, Choice-free Poincaré lemma.

For any vertex type $V$ and additive commutative group $(A, G)$ obeying the group laws `G.Laws` (associativity, commutativity, left zero, left inverse), define cochain spaces on all ordered vertex tuples (including repeated vertices) by $C^0(V, A) := V \to A$, $C^1(V, A) := V \to V \to A$, $C^2(V, A) := V \to V \to V \to A$, and $C^3(V, A) := V \to V \to V \to V \to A$, with alternating coboundary operators

$$
\begin{aligned}
(\delta_0 f)(x, y) &:= f(y) - f(x), \\
(\delta_1 e)(x, y, z) &:= \bigl(e(y, z) + e(x, y)\bigr) - e(x, z), \\
(\delta_2 F)(x, y, z, w) &:= \bigl(F(y, z, w) + F(x, y, w)\bigr) - \bigl(F(x, z, w) + F(x, y, z)\bigr).
\end{aligned}
$$

(When $V$ is specialized to the ordered complete simplex $K_n = \{0, 1, \dots, n-1\}$ and cochains are restricted to alternating functions on strictly increasing $(j+1)$-tuples, the general formula $(\delta_j \omega)(v_0, \dots, v_{j+1}) = \sum_{i=0}^{j+1}(-1)^i\omega(v_0, \dots, \widehat{v_i}, \dots, v_{j+1})$ obeys $\delta_{j+1}\circ\delta_j = 0$ at every degree $j$; higher degrees are manual derivation.) On every vertex type $V$ and additive commutative group $A$, finite-chain endpoint telescoping, closed-loop vanishing, and universal nilpotency in degrees $0 \to 1 \to 2$ and $1 \to 2 \to 3$ are frozen with zero axioms in `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch09-chain-telescope-and-nilpotency title="Finite-chain endpoint telescoping, loop vanishing, and universal coboundary nilpotency" lean="D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0 D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0_loop D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_d0 D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_d1"}
Let $V$ be any vertex type (`V : Sort u`) and let $(A, G)$ be any additive commutative group obeying `G.Laws`. For endpoints $v_{\mathrm{first}}, v_{\mathrm{last}} \in V$, write $\operatorname{VertexChain}(V, v_{\mathrm{first}}, v_{\mathrm{last}})$ for a finite directed vertex chain from $v_{\mathrm{first}}$ to $v_{\mathrm{last}}$, and write $\operatorname{sum}_G(\gamma, e)$ for the sum of a $1$-cochain $e$ along the directed steps of $\gamma$ (zero on an empty chain). The following four zero-axiom identities hold:

1. **Finite-chain endpoint telescoping** ([`sum_d0`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0)): for every $f \in C^0(V, A)$ and every finite chain $\gamma : \operatorname{VertexChain}(V, v_{\mathrm{first}}, v_{\mathrm{last}})$,

   $$
   \operatorname{sum}_G(\gamma,\, \delta_0 f) \;=\; (\delta_0 f)(v_{\mathrm{first}}, v_{\mathrm{last}}) \;=\; f(v_{\mathrm{last}}) - f(v_{\mathrm{first}}).
   $$

2. **Closed-loop vanishing** ([`sum_d0_loop`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.sum_d0_loop)): for every base vertex $b \in V$ and every closed chain $\gamma : \operatorname{VertexChain}(V, b, b)$,

   $$
   \operatorname{sum}_G(\gamma,\, \delta_0 f) \;=\; 0.
   $$

3. **Universal pointwise coboundary nilpotency** ([`d1_d0`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_d0), [`d2_d1`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_d1)): for every $f \in C^0(V, A)$, $e \in C^1(V, A)$, and all vertices $x, y, z, w \in V$,

   $$
   \delta_1(\delta_0 f)(x, y, z) \;=\; 0, \qquad \delta_2(\delta_1 e)(x, y, z, w) \;=\; 0.
   $$
:::

::: {.proof}
Part 1 proceeds by structural recursion on the vertex chain: the empty chain at $v$ satisfies $0 = f(v) - f(v)$, and prepending an edge $(x, y)$ cancels the intermediate vertex via $(f(y) - f(x)) + (f(z) - f(y)) = f(z) - f(x)$. Part 2 specializes part 1 to $v_{\mathrm{first}} = v_{\mathrm{last}} = b$ and uses $f(b) - f(b) = 0$. For part 3, $\delta_1(\delta_0 f)(x, y, z) = \bigl((f(z) - f(y)) + (f(y) - f(x))\bigr) - (f(z) - f(x)) = 0$; in $\delta_2(\delta_1 e)(x, y, z, w)$, regrouping by associativity and commutativity simplifies both the positive and negative pairs identically to $\bigl(e(z, w) + e(y, z) + e(x, y)\bigr) - e(x, w)$, whose difference is zero. The full proof is checked by the Lean kernel.
:::

Moreover, supplying any explicit base vertex $b \in V$ yields contracting cone homotopy operators requiring zero Axiom of Choice (`Classical.choice`).

::: {.definition #def-ch09-cone-homotopy title="Choice-free vertex-cone homotopy operators"}
On any vertex type $V$ and additive commutative group $(A, G)$, fix an explicit base vertex $b \in V$ and define the **vertex-cone homotopy operators** $H_j b : C^j(V, A) \to C^{j-1}(V, A)$ ($j \in \{1, 2, 3\}$) by prepending $b$:

$$
(H_1 b\, e)(x) := e(b, x), \qquad (H_2 b\, F)(x, y) := F(b, x, y), \qquad (H_3 b\, D)(x, y, z) := D(b, x, y, z).
$$

On alternating cochains over the ordered complete simplex $K_n = \{0, 1, \dots, n-1\}$ with $b = 0$, any tuple with a repeated vertex vanishes automatically, recovering the piecewise form taking $\omega(0, v_0, \dots, v_{j-1})$ when $0$ is absent and $0$ when $0$ is present.
:::

Both the degree-$1$ and degree-$2$ cone homotopy identities and constructive degree-$2$ Poincaré exactness hold pointwise with empty axiom closure in `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch09-cone-homotopy-exactness title="Choice-free vertex-cone homotopy identities and degree-two simplicial exactness" lean="D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d0_H1_add_H2_d1 D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_H2_add_H3_d2 D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_H2_of_d2_eq_zero D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff"}
Let $V$ be any vertex type, let $(A, G)$ be an additive commutative group obeying `G.Laws`, and let $b \in V$ be any explicitly chosen base vertex. The following four zero-axiom results hold:

1. **Degree-$1$ cone homotopy identity** ([`d0_H1_add_H2_d1`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d0_H1_add_H2_d1)): for every $e \in C^1(V, A)$ and all $x, y \in V$,

   $$
   \delta_0(H_1 b\, e)(x, y) + H_2 b\,(\delta_1 e)(x, y) \;=\; e(x, y).
   $$

2. **Degree-$2$ cone homotopy identity** ([`d1_H2_add_H3_d2`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_H2_add_H3_d2)): for every $F \in C^2(V, A)$ and all $x, y, z \in V$,

   $$
   \delta_1(H_2 b\, F)(x, y, z) + H_3 b\,(\delta_2 F)(x, y, z) \;=\; F(x, y, z).
   $$

3. **Explicit cone primitive for closed $2$-cochains** ([`d1_H2_of_d2_eq_zero`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_H2_of_d2_eq_zero)): if $F \in C^2(V, A)$ satisfies $\forall x, y, z, w \in V,\; (\delta_2 F)(x, y, z, w) = 0$, then for all $x, y, z \in V$,

   $$
   \delta_1(H_2 b\, F)(x, y, z) \;=\; F(x, y, z).
   $$

4. **Constructive degree-$2$ Poincaré exactness** ([`d2_eq_zero_iff`](lean:D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_eq_zero_iff)): for every $F \in C^2(V, A)$, closedness and exactness are equivalent,

   $$
   \bigl(\forall x, y, z, w \in V,\; (\delta_2 F)(x, y, z, w) = 0\bigr) \;\Longleftrightarrow\; \bigl(\exists e \in C^1(V, A),\; \forall x, y, z \in V,\; (\delta_1 e)(x, y, z) = F(x, y, z)\bigr),
   $$

   with the forward direction explicitly witnessed by $e := H_2 b\, F$ without `Classical.choice`.
:::

::: {.proof}
Parts 1 and 2 both instantiate the Abelian-group identity $(u - v) + \bigl((c + v) - u\bigr) = c$: in degree $1$ with $u = e(b, y)$, $v = e(b, x)$, $c = e(x, y)$, and in degree $2$ with $u = F(b, y, z) + F(b, x, y)$, $v = F(b, x, z)$, $c = F(x, y, z)$, canceling every $b$-anchored term pairwise. Part 3 substitutes $H_3 b\,(\delta_2 F)(x, y, z) = (\delta_2 F)(b, x, y, z) = 0$ into part 2. Part 4 exhibits $e := H_2 b\, F$ via part 3 in the forward direction, while the converse applies $\delta_2 \circ \delta_1 = 0$ from [@thm-ch09-chain-telescope-and-nilpotency]. The full proof is checked by the Lean kernel.
:::

Specializing back to alternating rational cochains $C^j(K_n; \mathbb{Q})$ on the ordered complete simplex $K_n = \{0, \dots, n-1\}$ ($n \ge 4$), the decomposition $F = \delta_1(H_2 0\, F) + H_3 0\,(\delta_2 F)$ of [@thm-ch09-cone-homotopy-exactness] also yields exact coboundary ranks and a vanishing second Betti number (manual derivation): restriction to $0$-containing triangles gives an isomorphism $\ker\delta_2 = \operatorname{im}\delta_1 \cong \mathbb{Q}^{\binom{n-1}{2}}$, yielding $\operatorname{rank}\delta_1 = \binom{n-1}{2}$, $\operatorname{rank}\delta_2 = \binom{n-1}{3}$, and $\beta_2(K_n) = 0$.

The figure below juxtaposes both subdivision-free mechanisms side by side: on the left, the opposing interior edges and the whisker $0\to1$ for the second face of the coarse disk; on the right, the Choice-free vertex-cone homotopy $e = H_2 b\, F$ rooted at an explicit base vertex $b$, pulling any closed $2$-cochain ($\delta_2 F = 0$) directly back to an explicit edge $1$-cochain.

::: {.figure src="ch09-coarse-stokes-cone"}
**Coarse-mesh interior edge cancellation and Choice-free vertex-cone homotopy.** The left panel shows the shared diagonal $(1,3)$ and the whisker $0\to1$ in the two-plaquette disk ([@ex-ch09-coarse-two-plaquette-stokes]). With this whisker on the second face, adjacent inverses cancel in $\mathbf{W}_1\widetilde{\mathbf{W}}_2$, giving the holonomy of the cyan boundary. The right panel illustrates the explicit vertex-cone operator $e(x, y) = (H_2 b\, F)(x, y) = F(b, x, y)$ from base vertex $b$ ([@def-ch09-cone-homotopy]), recovering any closed $2$-cochain constructively via $\delta_1(H_2 b\, F) = F$ ([@thm-ch09-cone-homotopy-exactness]).
:::

When no base vertex $b$ is provided in advance—assuming only a finite nonempty vertex type (`[Fintype V]`, `[Nonempty V]`)—exactness together with quantitative defect incidence and repair bounds for **non-closed** $2$-cochains is certified by a companion frozen theorem:

::: {.theorem #thm-ch09-simplex-cochain-repair title="Tetrahedral defect incidence, optimal anchor bound, and edge-potential exactness" lean="D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"}
Let $V$ be a finite nonempty vertex type (`[Fintype V]`, `[Nonempty V]`), let $A$ be an additive commutative group (`[AddCommGroup A]`), and let $F : V \to V \to V \to A$ be any $2$-cochain. Write the $r$-anchored face error count, the total tetrahedral coboundary defect count, and the error count of an edge potential $\mathrm{edge} : V \to V \to A$ as

$$
\begin{aligned}
\operatorname{faceErrors}(F, r) &:= \bigl\lvert\{(i, j, k) \in V^3 \mid F(i,j,k) \neq F(r,j,k) - F(r,i,k) + F(r,i,j)\}\bigr\rvert, \\
\operatorname{tetraDefects}(F) &:= \bigl\lvert\{(r, i, j, k) \in V^4 \mid F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) \neq 0\}\bigr\rvert, \\
\operatorname{edgeErrors}(F, \mathrm{edge}) &:= \bigl\lvert\{(i, j, k) \in V^3 \mid F(i,j,k) \neq \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)\}\bigr\rvert.
\end{aligned}
$$

Then all four statements hold simultaneously:

1. **Incidence sum identity**: $\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$;
2. **Optimal reference vertex bound**: there exists $r \in V$ such that $\lvert V\rvert \cdot \operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)$;
3. **Linear edge-error lower bound**: for every $\mathrm{edge} : V \to V \to A$, $\operatorname{tetraDefects}(F) \le 4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})$;
4. **Exactness equivalence**:

   $$
   \bigl(\forall r, i, j, k \in V,\; F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) = 0\bigr) \;\Longleftrightarrow\; \bigl(\exists\,\mathrm{edge} : V \to V \to A,\; \forall i, j, k \in V,\; F(i,j,k) = \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)\bigr).
   $$
:::

::: {.proof}
Part 1 rewrites $F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j)$ as $F(i,j,k) - (F(r,j,k) - F(r,i,k) + F(r,i,j))$ inside the quadruple sum. Part 2 chooses a minimizer $r \in V$ of $\operatorname{faceErrors}(F, r)$ on the nonempty finite set $V$ and applies the averaging inequality. Part 3 bounds each nonzero tetrahedral defect by the sum of error indicators on its four faces $(i,j,k)$, $(r,j,k)$, $(r,i,k)$, and $(r,i,j)$ and reindexes the four quadruple sums to obtain $4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})$. Part 4 sets $\mathrm{edge}(i,j) := F(r,i,j)$ for any $r \in V$ in the forward direction, while the converse cancels all six edge terms pairwise in $A$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch09-choice-free-boundary title="Zero-axiom pointed exactness versus abstract finite-set repair"}
Compare the axiom boundaries of the two kernel-verified theorems above: [@thm-ch09-cone-homotopy-exactness] takes an explicit base vertex $b \in V$ and certifies the cone identities and degree-$2$ exactness with empty axiom closure for **any** vertex type $V$ (needing neither finiteness nor `[Nonempty V]`, and zero `Classical.choice`). By contrast, [@thm-ch09-simplex-cochain-repair] operates on an abstract `[Fintype V]`, `[Nonempty V]` without a pre-selected anchor, invoking `Classical.choice` to choose a minimizing reference vertex $r \in V$ and thereby supplying quantitative two-sided repair bounds even when $F$ is not closed.
:::

## 9.3 The Second-Order Osculating Ternion-Sphere Manifold $\mathcal{M}_\Omega$ {#sec-ch09-osculating-manifold}

With both differentiation and integration grounded in rational arcs, we can now re-examine the deepest foundation of post-1854 differential geometry: **why do classical Riemannian manifolds look smooth while hiding tangent-plate creases and non-analytic dead zones underneath?**

A classical Riemannian manifold $(M, g)$ attaches a zero-curvature first-order flat tangent plate $T_p M \cong \mathbb{R}^n$ to every point $p \in M$ and glues local charts with $C^\infty$ partitions of unity built from non-analytic bump functions such as Cauchy's flat function $\beta(u) = e^{-1/u^2}\mathbf{1}_{u \neq 0}$ (whose derivatives all vanish at $u = 0$ even though it rises arbitrarily away from zero; literature result). This "flatten first, patch later" workflow carries two structural liabilities. First, discarding second-order sagitta forces coordinate-dependent Christoffel connection patches $\Gamma^k_{ij}$ and fails even under mesh refinement of flat polyhedra: the Schwarz lantern inscribed in a unit cylinder ($R = H = 1$) with $m = n^2$ layers converges uniformly in position while its surface-area ratio converges to the spurious limit $\sqrt{1 + \pi^4/4} \approx 5.0351$ (H. A. Schwarz, 1880; literature result), and $12$ flat tangent plates circumscribing $S^2$ as a regular dodecahedron lock the entire $20 \times 36^\circ = 720^\circ = 4\pi$ Regge deficit into sharp corners. Second, $C^\infty$ bump functions destroy real-analytic rigidity, under which a single arc determines its entire great circle.

Under $\mathrm{AXIOM}\text{-}\Omega$, we replace flat tangent plates with the **second-order osculating ternion-sphere manifold $\mathcal{M}_\Omega$**:

::: {.definition #def-ch09-osculating-manifold title="Second-order osculating ternion-sphere manifold and Möbius stitching model"}
Define the **second-order osculating ternion-sphere manifold** $\mathcal{M}_\Omega$ (`MODEL`) by three coupled structures:

1. **Locally osculating ternion-sphere base**: Replace first-order flat tangent plates $T_p M \cong \mathbb{R}^n$ at each point $p$ with a locally osculating rational ternion sphere $\mathbb{T}_3^{(p)}(\mathbb{Q}) \cong S^3(\mathbb{Q})$ carrying intrinsic positive curvature (matching the second-order isotropic curvature budget $\frac{1}{2} + \frac{1}{2} = 1$ along orthogonal directions);
2. **Rational conformal Möbius stitching without bump functions**: Replace $C^\infty$ partitions of unity by overlaps stitched through the **rational conformal Möbius group** $\mathrm{PSL}_2(\mathbb{H}, \mathbb{Q})$ of quaternionic fractional linear transformations

   $$
   \mathbf{q} \;\longmapsto\; (\mathbf{a}\mathbf{q} + \mathbf{b})(\mathbf{c}\mathbf{q} + \mathbf{d})^{-1} \qquad \bigl(\mathbf{a}, \mathbf{b}, \mathbf{c}, \mathbf{d} \in \mathbb{H}(\mathbb{Q})\bigr),
   $$

   which preserve rational spheres, angles, and analytic continuation rigidity. On every constant-curvature (isotropic) patch, the osculating sphere $\mathbb{T}_3^{(p)}$ coincides identically with the underlying sphere, so native heap parallel transport follows great circles directly and **relative Christoffel connection patches vanish identically ($\Gamma^k_{ij} \equiv 0$)**;
3. **Compact solenoid braid on maximal circle fibers**: Along maximal circle fibers $S^1 \subset \mathbb{T}_3$ (since $S^3$ itself is simply connected, $\pi_1(S^3) = 0$, multi-winding covers act strictly on $S^1$ fibers rather than on $S^3$ as a whole), weave compatible power-map lifts across all positive integer scales into the compact, connected, leafwise real-analytic solenoid lamination $\mathcal{S}_{\mathbb{A}} = \lim_{\longleftarrow\,(N,\,\mid)} S^1_{(N)}$.
:::

This compact solenoid braid welds the differential arc manifold directly to the adelic arithmetic of Volume V. In the frozen Lean library, the exact condition pinning a multiscale complex power thread onto the compact unit-modulus solenoid—with neither radial blowup nor collapse—is proved as a sharp equivalence:

::: {.theorem #thm-ch09-solenoid-zero-charge title="Zero logarithmic charge characterizes the unit-modulus solenoid locus" lean="D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff"}
Let $z$ be a compatible nonzero complex power thread (`ComplexPowerThread`): a family of nonzero complex coordinates $z_m \in \mathbb{C} \setminus \{0\}$ indexed by $m \in \mathbb{N}_+$ satisfying $z_{mn}^n = z_m$ for all $m, n \in \mathbb{N}_+$. Define its Archimedean logarithmic charge by $\operatorname{logarithmicCharge}(z) := \ln\lVert z_1\rVert$. Then

$$
\operatorname{logarithmicCharge}(z) = 0 \;\Longleftrightarrow\; \forall m \in \mathbb{N}_+,\; \lVert z_m\rVert = 1.
$$
:::

::: {.proof}
Setting $m = 1$ in the power-compatibility law gives $z_n^n = z_1$; taking norms and real logarithms yields level-independent conservation $n \ln\lVert z_n\rVert = \ln(\lVert z_n\rVert^n) = \ln\lVert z_n^n\rVert = \ln\lVert z_1\rVert = \operatorname{logarithmicCharge}(z)$. When the charge vanishes, $n > 0$ forces $\ln\lVert z_n\rVert = 0$; strict positivity $\lVert z_n\rVert > 0$ excludes the totalized logarithm branch $\ln 0 = 0$, implying $\lVert z_n\rVert = 1$ for every $n \in \mathbb{N}_+$. Conversely, evaluating $\lVert z_1\rVert = 1$ gives $\ln 1 = 0$. The full proof is checked by the Lean kernel.
:::

[@thm-ch09-solenoid-zero-charge] anchors the compact solenoid braid inside $\mathcal{M}_\Omega$: any nonzero logarithmic charge drives a radial factor $\exp(q/m)$ off the unit circle, whereas the zero-charge locus locks every integer-winding level simultaneously onto $\lVert z_m\rVert \equiv 1$, forming the compact boundaryless solenoid phase fiber.

::: {.remark #rem-ch09-anisotropic-obstruction-boundary title="Vanishing connection on constant-curvature patches versus anisotropic tidal curvature"}
**Literature result and exact geometric boundary.** Mathematical honesty requires distinguishing isotropic constant-curvature patches from general anisotropic manifolds. In dimension $n \ge 3$, the algebraic curvature tensor splits orthogonally into scalar, trace-free Ricci, and Weyl conformal tidal parts, $R = R_{\mathrm{Scal}} + R_{\mathring{\mathrm{Ric}}} + W$ (I. M. Singer and J. A. Thorpe, 1969; A. L. Besse, *Einstein Manifolds*, 1987; literature result), so any single constant-curvature osculating sphere of sectional curvature $K$ obeys the exact residual identity (manual derivation)

$$
\lVert R - R^{(K)}\rVert^2 \;=\; \lVert W\rVert^2 \;+\; \frac{4}{n - 2}\lVert\mathring{\mathrm{Ric}}\rVert^2 \;+\; \frac{2}{n(n - 1)}\bigl(\mathrm{Scal} - n(n - 1)K\bigr)^2.
$$

Thus an osculating sphere $\mathbb{T}_3^{(p)}$ tuned to $K_* = \frac{\mathrm{Scal}}{n(n-1)}$ absorbs all isotropic second-order curvature completely—making relative Christoffel patches vanish identically on constant-curvature patches—while on genuinely anisotropic tidal manifolds the irreducible obstruction $\lVert W\rVert^2 + \frac{4}{n-2}\lVert\mathring{\mathrm{Ric}}\rVert^2 > 0$ lives transparently in the Möbius transition cocycle between neighboring osculating spheres.
:::

## 9.4 Volume III Ledger and Transition to Volume IV {#sec-ch09-volume3-synthesis}

Volume III has reconstructed differentiation, higher-order recurrences, integration, and smooth manifolds without limits or transcendentals. The table below summarizes the structural replacement across all five pillars:

| Core theme | Classical calculus and Riemannian manifolds | Volume III jet calculus and $\mathcal{M}_\Omega$ | Pathology eliminated |
| :--- | :--- | :--- | :--- |
| **First and second derivatives** | Cauchy $\epsilon\text{-}\delta$ limit $\lim_{h \to 0}$ and secant chords | Second-order jet ring $\mathcal{J}_2(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^3)$ two-term inverse | Removes $0/0$ ghosts and finite secant bias |
| **Discrete spherical steps** | Left-endpoint Itô / explicit Euler ($\alpha = 0$) | Symmetric midpoint Cayley step ($\alpha = \frac{1}{2}$) with half-step conservation | Eliminates tangent derailment and chain-rule breakdown |
| **Transcendentals and $\pi$** | Infinite convergent series and real constants $\pi, e$ | Arbitrary-order D-finite jets $J_N(\mathbb{Q})$, Cayley unification, $\pi$-free Machin brackets | Replaces transcendentals with rational recurrences and on-demand intervals |
| **Integration and Stokes** | $h \to 0$ Riemann subdivisions and $O(h^2)$ remainder | Heap telescoping, plaquette holonomy with compatible paths and factor order, Choice-free cone homotopy | Exact finite boundary cancellation |
| **Manifold base and gluing** | Flat tangent plates $T_p M \cong \mathbb{R}^n$ and $C^\infty$ bump functions | Osculating spheres $\mathbb{T}_3^{(p)}(\mathbb{Q})$, Möbius stitching, zero-charge solenoid | Eliminates Christoffel patches on constant-curvature regions and flat dead zones |

The short film below follows the chapter's main line and works the "integration and Stokes" and "manifold base" rows of this table through small hand-checkable examples.

::: {.film src="exact-on-a-coarse-grid"}
**On a coarse grid, only the boundary survives (2 min 49 s).** The film first folds a five-point chain with heap law I $[\mathbf{y},\mathbf{x},\mathbf{x}]=\mathbf{y}$ and watches the integral collapse to the final point (violet, hand derivation); the commutative telescoping "the steps sum to last minus first" carries the green LEAN ✓ tag ([@thm-ch09-chain-telescope-and-nilpotency]), and the on-screen sum $-4+7-5+3=1=6-5$ is computed. Integer edge values on the four-vertex two-plaquette disk then give face circulations $9$ and $0$; the violet diagonal, walked once each way, cancels, and the amber rim again gives $9$ (cyan `NUM`; the general abelian case is a hand derivation). With the rational unit quaternions of [@ex-ch09-coarse-two-plaquette-stokes], $\mathbf{W}_1\widetilde{\mathbf{W}}_2=\bigl(\frac{31}{250},-\frac{17}{250},\frac{7}{10},\frac{7}{10}\bigr)=\operatorname{Hol}(\partial\Sigma)$, while reversing the order or anchoring along the dashed amber path $0\to3\to1$ changes the result, turning $\mathbf{j}$ into $-\mathbf{j}$ (exact computation; the peeling identity is a hand derivation). In the cone scene the amber base vertex $b$ is the apex; green tags give $\delta_2\circ\delta_1=0$, the splitting $F=\delta_1(H_2 b\,F)+H_3 b\,(\delta_2 F)$ and closed-iff-exact with the explicit witness $H_2 b\,F$ ([@thm-ch09-chain-telescope-and-nilpotency], [@thm-ch09-cone-homotopy-exactness]), and the four-vertex example $10=9+1$ is computed on screen. Finally, the osculating three-sphere caps and Möbius gluing are a schematic picture of the model (violet, [@def-ch09-osculating-manifold]); the zero-charge criterion for solenoid threads carries a green tag ([@thm-ch09-solenoid-zero-charge]), and the magenta thread with $\lvert z_1\rvert=2$ drifting off the unit circle is computed on screen. The Volume III ledger closes the film.
:::

In the interactive laboratory card below, erase the common edge to check the sum of integer circulations and compare how the quaternion product changes with the whisker or factor order. Then switch the explicit apex vertex `base` and $2$-cochain assignments $F$, build the Choice-free cone primitive `e = H2(base, F)` on the fly, and verify the exact homotopy identity $\delta_1(H_2 b\, F) + H_3 b\,(\delta_2 F) = F$ face by face ([@thm-ch09-chain-telescope-and-nilpotency], [@thm-ch09-cone-homotopy-exactness]).

::: {.viz src="dfinite-algebraic-schur-lab" preset="simplicial-stokes-cone" height="520"}
**Subdivision-free coarse Stokes and simplicial cone homotopy card (`simplicial-stokes-cone`).** Erase the violet shared edge to see the two integer face circulations add up to the boundary circulation. The readout compares the two-face quaternion product for a different whisker or reversed order ([@ex-ch09-coarse-two-plaquette-stokes]). Select an explicit apex vertex `base` to construct the explicit primitive `e = H2(base, F)` and compare exact recovery $\delta_1 e = F$ for closed $2$-cochains ($\delta_2 F = 0$) against the tetrahedral defect remainder $H_3 b\,(\delta_2 F)$ when $F$ is non-closed ([@thm-ch09-cone-homotopy-exactness]).
:::

With local jets, arbitrary-order D-finite algebra, subdivision-free integration, and the osculating ternion-sphere manifold $\mathcal{M}_\Omega$ in place, the next question rises naturally: **how does the Fourier spectrum of the compact real three-sphere split into shells, and which of its spectral quantities can be computed exactly with rational polynomials and finite factorial ratios?** Volume IV ([Chapter 10](ch10-peter-weyl-rational-spin-shells.md)–[Chapter 12](ch12-algebraic-extensions-and-schur-positivity.md)) opens that spectral frontier through Peter–Weyl rational spin shells, $\pi$-free factorial Haar integration, and zero-axiom Schur positivity.
