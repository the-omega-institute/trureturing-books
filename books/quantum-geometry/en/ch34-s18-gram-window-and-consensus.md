# 34.7 The Gram Window ($\mathcal{W}_M$), Schur-Complement Feasibility Corridors, and Multi-Observer Consensus: Finite-Memory Over-Constraint Lock, Forgetting Reopening, and Block-Matrix PSD Completion {#sec-ch34-gram-window-and-consensus}

> *The **Gram Window ($\mathcal{W}_M$)** is the exact algebraic landing point on the cosmic comparison ledger of the preceding section's "bounded, non-delusional observer": because all pairwise comparison relations across the universe are carried by a potentially infinite-dimensional Gram inner-product matrix $G_\infty$, no finite self-referential observer embedded inside the system can ever read or write the entire infinite table at once; instead, the observer can only extract a **finite sliding principal submatrix $G_M$** of order $M$ along its historical trajectory and relational web—within the window sit the causal anchors retained coherently for multi-step cross-validation, while outside the window lies earlier history actively released back into the thermodynamic background via partial trace ($\operatorname{Tr}_{\bar{W}}$).*

In [§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics), we saw how thermodynamics emerges the moment an embedded observer abides honestly in its bounded, non-delusional vantage—neither usurping an omniscient oracle that reads the global pure state without remainder, nor clinging to a sealed, unentangled island of selfhood, but instead applying the partial trace $\operatorname{Tr}_{\bar{A}}$ across its finite horizon $\partial A$: the phase surplus of minimal circular-arc trihedra severed across $\partial A$ manifests directly as entanglement entropy $S_A$, inducing the modular effective temperature $T_{\mathrm{eff}}$ and thermodynamic arrow of time inside the horizon. Turning now from a static spatial boundary $\partial A$ to the sequential memory chain along an observer's proper time raises an equally foundational algebraic question: if every pairwise comparison across the cosmos assembles into a potentially infinite-dimensional **cosmic Gram ledger** $G_\infty = [\langle\mathbf{v}_i, \mathbf{v}_j\rangle]$, how does a finite-register observer read, test, and update that ledger from one step to the next?

Our opening proposition supplies the exact algebraic answer (`MODEL`): what a finite observer actually holds inside $G_\infty$ is an order-$M$ **sliding principal submatrix—the Gram Window $\mathcal{W}_M$ (represented by $G_M$)**. Inside the window reside at most $M$ coherently retained historical state anchors that simultaneously cross-lock past causal geometry and bound the next step's admissible corridor through the **Schur complement** of the bordered Gram matrix; outside the window sit older anchors surrendered back to the thermal bath via $\operatorname{Tr}_{\bar{W}}$. Far from being a cognitive handicap, this finite sliding window holds the three simultaneous keys to **causal geometric rigidity**, **free-choice breathing room**, and **multi-observer consensus reality**.

## 34.7.1 The Cosmic Comparison Ledger and the Finite Gram Window: Schur-Complement Margin $\Delta_{\mathrm{Schur}}(M)$, Pseudoinverse Generalization, and the Elliptope vs. Spherical-Cap Views {#sec-ch34-18-1}

Why must an observer's local historical memory take the form of a finite positive semidefinite (PSD) Gram submatrix $G_M$ rather than an arbitrary list of unconstrained numbers? Across `trureturing`'s pure-state distinguishability, Gram realizability, Gram unitary rigidity, and finite-memory capacity modules, four kernel-verified theorems (`LEAN ✓`) lock the foundational algebraic contract of the Gram ledger:

1. **Unit-overlap criterion and equivalence kernel**: By [`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization), over any scalar field $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$ (`[RCLike 𝕜]`) and normed inner-product space $E$, any indexed family of unit records $\{\mathbf{v}_i\}$ ($\lVert\mathbf{v}_i\rVert = 1$) satisfies $\langle\mathbf{v}_i, \mathbf{v}_j\rangle_{\mathbb{K}} = 1 \iff \mathbf{v}_i = \mathbf{v}_j$, and unit inner product defines an exact equivalence relation on indices—unit diagonal entries $G_{ii} = 1$ pin self-identity, while off-diagonal departures from $1$ measure state distinguishability;
2. **PSD Gram realizability and unitary rigid-body uniqueness**: By [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability), a continuous $\mathbb{C}$-linear operator $Q$ on a complete complex inner-product space $V$ is positive ($0 \le Q$) if and only if $Q = O^\dagger \circ_L O$ with $\langle Q x, y\rangle_{\mathbb{C}} = \langle O x, O y\rangle_{\mathbb{C}}$ for some continuous linear operator $O$; furthermore, by [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq), any two finite-dimensional state-column matrices $A, B \in \operatorname{Matrix}(m, n, \mathbb{C})$ sharing the same pairwise Gram matrix $B^\dagger B = A^\dagger A$ are related by a global ambient unitary $U \in \mathrm{U}(m, \mathbb{C})$ satisfying $B = U A$—**up to a global rigid unitary frame rotation, a PSD Gram matrix uniquely determines the entire intrinsic relational geometry of its states**;
3. **Hard dimensional ceiling on distinguishable histories**: By [`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity), on a $d$-dimensional complex Hilbert register, any family of $N$ historical density states $\{\rho_i\}_{i=1}^N$ perfectly discriminated without crosstalk ($\operatorname{Tr}(E_j \rho_i) = \delta_{ij}$) by a POVM $\{E_j\}_{j=1}^N$ ($\sum_j E_j = I_d$) obeys $N \le d$. No embedded observer equipped with a finite-dimensional local register can orthogonally retain infinitely many distinct histories; maintaining a finite window $\mathcal{W}_M$ is a theorem of quantum measurement geometry!

Let us now derive the exact master equation governing a one-step window extension (`manual derivation` + `Literature: Schur 1917`). Suppose the observer's current Gram window $\mathcal{W}_M$ holds $M$ unit historical anchors $\{\mathbf{v}_1, \dots, \mathbf{v}_M\}$ (corresponding along time to $\{\mathbf{v}_{t-M+1}, \dots, \mathbf{v}_t\}$), whose real pairwise overlaps form the $M \times M$ symmetric PSD matrix $G_M = [\langle\mathbf{v}_i, \mathbf{v}_j\rangle_{\mathbb{R}}]_{i,j=1}^M \succeq 0$. Testing a candidate unit state $\mathbf{x}$ ($\lVert\mathbf{x}\rVert = 1$) at the next beat appends the cross-comparison vector $\mathbf{c}_M := (\langle\mathbf{v}_1, \mathbf{x}\rangle_{\mathbb{R}}, \dots, \langle\mathbf{v}_M, \mathbf{x}\rangle_{\mathbb{R}})^\top \in [-1, 1]^M$, forming the bordered $(M+1)\times(M+1)$ Gram matrix

$$
G_{M+1}(\mathbf{x}) \;:=\; \begin{pmatrix} G_M & \mathbf{c}_M \\ \mathbf{c}_M^\top & 1 \end{pmatrix}.
$$

Coexistence of $\mathbf{x}$ with the $M$ historical anchors inside a positive-definite inner-product space requires $G_{M+1}(\mathbf{x}) \succeq 0$. Consider first the non-singular case of linearly independent anchors ($G_M \succ 0$ invertible). Block Gaussian congruence diagonalizes $G_{M+1}(\mathbf{x})$ immediately:

$$
\begin{pmatrix} I_M & \mathbf{0} \\ -\mathbf{c}_M^\top G_M^{-1} & 1 \end{pmatrix}
\begin{pmatrix} G_M & \mathbf{c}_M \\ \mathbf{c}_M^\top & 1 \end{pmatrix}
\begin{pmatrix} I_M & -G_M^{-1}\mathbf{c}_M \\ \mathbf{0}^\top & 1 \end{pmatrix}
\;=\;
\begin{pmatrix} G_M & \mathbf{0} \\ \mathbf{0}^\top & 1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M \end{pmatrix}.
$$

Taking determinants and invoking Sylvester's law of inertia yields the Schur determinant factorization and **Schur-complement feasibility margin** $\Delta_{\mathrm{Schur}}(M)$:

$$
\det G_{M+1}(\mathbf{x}) \;=\; (\det G_M)\,\Delta_{\mathrm{Schur}}(M), \qquad \Delta_{\mathrm{Schur}}(M) \;:=\; 1 - Q_M(\mathbf{x}) \;=\; 1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M \;\ge\; 0.
$$

Its geometric meaning is transparent: let $S_M := \operatorname{span}\{\mathbf{v}_1, \dots, \mathbf{v}_M\}$ denote the closed historical subspace. By [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities), any unit candidate $\mathbf{x}$ splits orthogonally into its historical projection $P_{S_M}\mathbf{x} = \sum_{i,j=1}^M (G_M^{-1})_{ij} c_j \mathbf{v}_i$ and its orthogonal innovation component $(\operatorname{id} - P_{S_M})\mathbf{x} \in S_M^\perp$. Evaluating squared norms shows that $Q_M(\mathbf{x}) = \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M = \lVert P_{S_M}\mathbf{x}\rVert^2 = \cos^2\theta_\perp$ is the exact fraction of $\mathbf{x}$'s norm budget already committed to $S_M$, whereas the Schur complement

$$
\Delta_{\mathrm{Schur}}(M) \;=\; 1 - \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M \;=\; \bigl\lVert(\operatorname{id} - P_{S_M})\mathbf{x}\bigr\rVert^2 \;=\; \sin^2\theta_\perp \;\ge\; 0
$$

is the observer's **net unallocated innovation budget** available to steer into $S_M^\perp$ (and whenever $S_M^\perp \neq \bot$, [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape) guarantees a pure-escape unit vector $\mathbf{e} \in S_M^\perp$ achieving $P_{S_M}\mathbf{e} = \mathbf{0}$ and $\Delta_{\mathrm{Schur}}(M) = 1$)!

Better still, specializing this Schur factorization to $M = 1$ and $M = 2$ recovers verbatim our frozen two-anchor and three-anchor Gram determinant theorems (`LEAN ✓` + `manual derivation`):

- **Order-$1$ Markov window ($M = 1$) recovers the two-anchor Gram determinant**: For a single unit anchor $\lVert\mathbf{v}_1\rVert = 1$ and unit candidate $\lVert\mathbf{x}\rVert = 1$, $G_1 = (1)$ and $\mathbf{c}_1 = (c_{1x}) = (\langle\mathbf{v}_1, \mathbf{x}\rangle_{\mathbb{R}})$, so

  $$
  \det G_2(\mathbf{v}_1, \mathbf{x}) \;=\; (\det G_1)\,\Delta_{\mathrm{Schur}}(1) \;=\; 1 - c_{1x}^2 \;=\; 1 - \langle\mathbf{v}_1, \mathbf{x}\rangle_{\mathbb{R}}^2,
  $$

  which is the unit-norm specialization of [`two_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_formula) ($\det G_2(u, v) = \lVert u\rVert^2\lVert v\rVert^2 - \langle u, v\rangle_{\mathbb{R}}^2$), while $\Delta_{\mathrm{Schur}}(1) > 0 \iff \lvert c_{1x}\rvert < 1$ matches [`two_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_pos_iff);
- **Order-$2$ curvature window ($M = 2$) recovers the three-anchor Gram determinant**: For two non-collinear unit anchors $\mathbf{v}_1, \mathbf{v}_2$ with overlap $c_{12} = \langle\mathbf{v}_1, \mathbf{v}_2\rangle_{\mathbb{R}} \in (-1, 1)$, we have $G_2 = \begin{pmatrix} 1 & c_{12} \\ c_{12} & 1 \end{pmatrix}$, $\det G_2 = 1 - c_{12}^2 > 0$, and $G_2^{-1} = \frac{1}{1 - c_{12}^2}\begin{pmatrix} 1 & -c_{12} \\ -c_{12} & 1 \end{pmatrix}$. Expanding $Q_2(\mathbf{x})$ for $\mathbf{c}_2 = (c_{1x}, c_{2x})^\top$ and multiplying by $\det G_2$ cancels $1 - c_{12}^2$ identically:

  $$
  \begin{aligned}
  \Delta_{\mathrm{Schur}}(2) &\;=\; 1 - \frac{c_{1x}^2 + c_{2x}^2 - 2 c_{12} c_{1x} c_{2x}}{1 - c_{12}^2}, \\
  \det G_3(\mathbf{v}_1, \mathbf{v}_2, \mathbf{x}) &\;=\; (\det G_2)\,\Delta_{\mathrm{Schur}}(2) \;=\; 1 + 2 c_{12} c_{1x} c_{2x} - c_{12}^2 - c_{1x}^2 - c_{2x}^2,
  \end{aligned}
  $$

  reproducing [`three_anchor_gram_det_formula`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula) and [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff) term for term!

Before stepping past $M = 3$, one essential linear-algebraic guardrail must be stated with complete precision: **whenever the window order $M$ exceeds the ambient spatial dimension—in particular, for any $M > 3$ unit anchors $\mathbf{v}_1, \dots, \mathbf{v}_M \in S^2 \subset \mathbb{R}^3$—we have $\operatorname{rank}(G_M) \le 3 < M$, so $\det G_M = 0$ and the ordinary inverse $G_M^{-1}$ does not exist!** In this singular regime, Albert's generalized Schur-complement theorem (Albert, 1969, `Literature` + `manual derivation`) replaces $G_M^{-1}$ with the Moore–Penrose pseudoinverse $G_M^+$:

$$
G_{M+1} = \begin{pmatrix} G_M & \mathbf{c}_M \\ \mathbf{c}_M^\top & 1 \end{pmatrix} \succeq 0 \;\Longleftrightarrow\; G_M \succeq 0, \quad \mathbf{c}_M \in \operatorname{ran}(G_M)\;\;\bigl((I_M - G_M G_M^+)\mathbf{c}_M = \mathbf{0}\bigr), \quad \Delta_{\mathrm{Schur}}^+(M) := 1 - \mathbf{c}_M^\top G_M^+\mathbf{c}_M \ge 0.
$$

The range condition $\mathbf{c}_M \in \operatorname{ran}(G_M)$ enforces linear consistency across redundant anchors: every null vector $\mathbf{u} \in \ker G_M$ represents an exact linear dependency $\sum_{j=1}^M u_j \mathbf{v}_j = \mathbf{0}$, forcing $\mathbf{u}^\top\mathbf{c}_M = \langle\sum_{j=1}^M u_j\mathbf{v}_j, \mathbf{x}\rangle = 0$ for any genuine vector $\mathbf{x}$. Moreover, once $M > 3$ anchors already span $\mathbb{R}^3$ ($\operatorname{rank}(G_M) = 3$), any candidate $\mathbf{x} \in S^2 \subset \mathbb{R}^3$ remaining inside $\mathbb{R}^3$ satisfies $P_{S_M}\mathbf{x} = \mathbf{x}$, $\mathbf{c}_M^\top G_M^+\mathbf{c}_M = 1$, and $\Delta_{\mathrm{Schur}}^+(M) = 0$ identically.

This brings into sharp relief the **two complementary geometric views** of the Gram window—two distinct problems that must never be conflated:

1. **Equality-overlap elliptope slice in ambient dimension $\ge M+1$**: When $G_M \succ 0$ has full rank and $\mathbf{x}$ may explore an ambient Hilbert space of dimension at least $M+1$, prescribing *exact equality* overlaps $\mathbf{c}_M \in [-1, 1]^M$ carves out the solid compatibility ellipsoid $\mathcal{E}(G_M) := \{\mathbf{c}_M \in \mathbb{R}^M \mid \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M \le 1\}$ inside $[-1, 1]^M$, whose $M$-dimensional Euclidean volume is $\operatorname{Vol}_M(\mathcal{E}(G_M)) = \frac{\pi^{M/2}}{\Gamma(\frac{M}{2}+1)}\sqrt{\det G_M} \propto \sqrt{\det G_M}$. Mutually orthogonal anchors maximize $\sqrt{\det G_M}$, whereas demanding incompatible equality overlaps (e.g., asking for $c_j = \frac{1}{2}$ simultaneously against $M \ge 5$ orthonormal anchors $G_M = I_M$) pushes $\mathbf{c}_M$ outside $\mathcal{E}(G_M)$ with $\Delta_{\mathrm{Schur}}(M) < 0$;
2. **3D spherical coherence-cap corridor ($\Omega_M$) on $S^2 \subset \mathbb{R}^3$**: On the fixed unit sphere $S^2 \subset \mathbb{R}^3$ of a 3D directional frame, causal continuity does not pin $\mathbf{x}$ to equality cosines; instead, each window anchor $\mathbf{v}_j \in S^2$ imposes a *threshold coherence inequality* $\mathbf{x}\cdot\mathbf{v}_j \ge \cos\alpha_{\mathrm{coh}}$ (maximum deflection half-angle $\alpha_{\mathrm{coh}} \in (0, \frac{\pi}{2})$), defining a circular spherical cap $C(\mathbf{v}_j, \alpha_{\mathrm{coh}}) \subset S^2$. Holding $M$ anchors simultaneously restricts the next admissible direction to the **intersection of $M$ spherical caps**:

   $$
   \Omega_M \;:=\; \bigcap_{j=1}^M \bigl\{\mathbf{x} \in S^2 \;\big\vert\; \mathbf{x}\cdot\mathbf{v}_j \ge \cos\alpha_{\mathrm{coh}}\bigr\}.
   $$

   Each active boundary arc of $\Omega_M$ is the sidewall of a minimal circular-arc trihedron, and the solid-angle area $\lvert\Omega_M\rvert \in [0, 4\pi]$ measures the concrete **3D directional freedom** available to the observer at the present beat!

::: {.viz src="gram-window-consensus-sandbox" preset="schur-cap-corridor" height="520"}
**Bordered Gram Schur-complement margin $\Delta_{\mathrm{Schur}}(M)$ and spherical coherence-cap corridor $\Omega_M$ card (`schur-cap-corridor`).** At $M = 2$, two $60^\circ$ coherence caps on $S^2$ intersect in the cyan lens corridor $\Omega_2$ ($2.297861\;\mathrm{sr}$) across the dashed cyan anchor great circle $\operatorname{span}(\mathbf{v}_1,\mathbf{v}_2)$ with normal pole $\mathbf{n}$; the magenta elevation arc $\delta$ of the draggable amber candidate $\mathbf{x}$ above the anchor plane directly visualizes the Schur-complement freedom $\Delta_{\mathrm{Schur}} = 1 - \mathbf{c}_2^\top G_2^{-1}\mathbf{c}_2 = \sin^2\delta \approx 0.178606$ (vanishing together with $\det G_3$ when $\mathbf{x}$ lands on the dashed great circle; green `LEAN ✓` badges mark `gram_realizability`, `orthogonal_complement_projection_identities`, `finite_layer_projection_escape`, and `two_anchor_gram_det_formula`).
:::

Projecting this architecture onto three-dimensional space ([§29.11](ch34-s10-trihedron-rigidity.md#sec-ch34-trihedron-rigidity-and-3d-stability)) leads this book to call **$M = 3$ the "golden Gram window" for any 3D observer** (`MODEL`: a choice under the example parameters, with no optimality criterion behind it)! At $M = 1$, a single cap fixes step length without curvature or turning memory; at $M = 2$, two intersecting caps form a lens-shaped digon sensitive to planar curvature but still mirror-ambiguous across its chord plane; at **$M = 3$**, three non-coplanar anchors achieve a full-rank 3D basis $\det G_3 > 0$ via [`three_anchor_gram_det_pos_iff`](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff) (forming with candidate $\mathbf{x}$ the minimal 3D isostatic rigidity core $K_4$), while carving out an open, well-proportioned **curved spherical triangle $\Omega_3 \subset S^2$**—securing chiral 3D self-orientation with zero redundant $M \ge 4$ over-cutting!

::: {.viz src="gram-window-consensus-sandbox" preset="golden-triangle-m3" height="520"}
**Full-rank 3D golden window $M = 3$ and curved spherical-triangle corridor $\Omega_3$ card (`golden-triangle-m3`).** Locking the window at $M = 3$ ($\alpha_{\mathrm{coh}} = 60^\circ$), three golden-angle spiral anchors form a full-rank 3D Gram core $\det G_3 \approx 0.041133 > 0$ (green `LEAN ✓` badges mark `three_anchor_gram_det_formula` and `three_anchor_gram_det_pos_iff`), while three magenta boundary arcs enclose a spacious cyan curved spherical triangle $\lvert\Omega_3\rvert \approx 1.802272\;\mathrm{sr}$ ($14.3420\%$ of $S^2$, with the draggable amber candidate $\mathbf{x}$ inside), uniting rigid 3D orientation with generous steering room.
:::

## 34.7.2 Monotonic Squeeze and Active Forgetting Across Window Size $M$: From Over-Constrained Zeno–Laplace Lock to Sliding-Window Reopening and Landauer Heat {#sec-ch34-18-2}

Varying the Gram window size $M$ along a winding trajectory exposes an exact inverse trade-off between **historical memory depth** and **present steering freedom**, governed by two monotonic laws (`manual derivation` + `LEAN ✓`):

1. **Monotonically non-decreasing historical projection and non-increasing Schur margin**: Along the nested subspaces $S_1 \subseteq S_2 \subseteq \dots \subseteq S_M$, decomposing $S_{k+1} = S_k \oplus (S_{k+1} \cap S_k^\perp)$ via [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities) yields $\lVert P_{S_{k+1}}\mathbf{x}\rVert^2 = \lVert P_{S_k}\mathbf{x}\rVert^2 + \lVert(P_{S_{k+1}} - P_{S_k})\mathbf{x}\rVert^2 \ge \lVert P_{S_k}\mathbf{x}\rVert^2$ for every unit vector $\mathbf{x}$ (with explicit full-rank matrix increment $Q_{k+1} - Q_k = \frac{(c_{k+1} - \mathbf{g}_k^\top G_k^{-1}\mathbf{c}_k)^2}{1 - \mathbf{g}_k^\top G_k^{-1}\mathbf{g}_k} \ge 0$ when $G_{k+1} \succ 0$). Consequently,

   $$
   0 \;\le\; Q_1(\mathbf{x}) \;\le\; Q_2(\mathbf{x}) \;\le\; \dots \;\le\; Q_M(\mathbf{x}) \;\le\; 1 \quad\Longleftrightarrow\quad 1 \;\ge\; \Delta_{\mathrm{Schur}}(1) \;\ge\; \Delta_{\mathrm{Schur}}(2) \;\ge\; \dots \;\ge\; \Delta_{\mathrm{Schur}}(M) \;\ge\; 0.
   $$

2. **Nested spherical-corridor contraction and the over-constrained Zeno–Laplace lock**: On $S^2$, intersecting each additional anchor cap monotonically narrows the feasible region:

   $$
   \Omega_0 = S^2 \;\supseteq\; \Omega_1 \;\supseteq\; \Omega_2 \;\supseteq\; \dots \;\supseteq\; \Omega_M, \qquad 4\pi = \lvert\Omega_0\rvert \;\ge\; \lvert\Omega_1\rvert \;\ge\; \lvert\Omega_2\rvert \;\ge\; \dots \;\ge\; \lvert\Omega_M\rvert \;\ge\; 0,
   $$

   echoing how finer conceptual partitions monotonically reduce conditional logical impurity in [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone) (`LEAN ✓`). Carrying $M$ anchors simultaneously enforces $\binom{M}{2}$ internal pairwise ties alongside $M$ step inequalities; as the historical path meanders across $S^2$, ancient caps $C(\mathbf{v}_{t-M+1}, \alpha_{\mathrm{coh}})$ and recent caps $C(\mathbf{v}_t, \alpha_{\mathrm{coh}})$ pinch from opposite sides until $\Omega_M$ collapses to a sliver and finally $\Omega_M = \emptyset$ (the instant any two retained anchors separate beyond $2\alpha_{\mathrm{coh}}$, even their pairwise cap intersection vanishes!). At the microscopic quantum-memory level, the frozen theorem [`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal) (`LEAN ✓`) delivers an even sharper verdict: even if an observer coherently reverses $M - 1$ environmental/memory copies (all with unit-modulus overlap), **a single unreleased historical copy $k$ satisfying $\operatorname{recordOverlap}(r_k, i, j) \neq 1$ unilaterally blocks coherent restoration of any nonzero off-diagonal entry $\rho_{ij} \neq 0$**! In this book's reading (`MODEL`), clinging to an unpruned infinite window ($M \to \infty$) is not omniscience—it is **over-constrained Zeno freezing and Laplace deterministic lock**.

::: {.viz src="gram-window-consensus-sandbox" preset="overconstrained-lock-m9" height="520"}
**Over-constrained window squeeze at $M = 9$ and Zeno–Laplace lock card (`overconstrained-lock-m9`).** Deepening the window from $M = 3$ up to $M = 9$ wraps nine golden-angle spiral caps around $S^2$ and tightens the magenta boundary, squeezing the cyan feasible corridor more than thirty-three-fold from $1.802272\;\mathrm{sr}$ down to a pinhole $\lvert\Omega_9\rvert \approx 0.054604\;\mathrm{sr}$ ($0.4345\%$ of $S^2$, magnified in the stage loupe, while closing the tenth cap at $M = 10$ hits exact magenta lock $\Omega_{10} = \emptyset$, $\lvert\Omega_{10}\rvert = 0$, alongside negative orthonormal Schur margins $\Delta_{\mathrm{Schur}} < 0$ for $M \ge 5$); green `LEAN ✓` badges mark `surviving_copy_blocks_reversal`, `finite_memory_history_capacity`, and `gram_realizability`.
:::

How does a bounded observer break free from over-constraint lock? Through **active forgetting—sliding the Gram window forward by tracing out the oldest anchor $\mathbf{v}_{t-M}$ via $\operatorname{Tr}_{\mathbf{v}_{t-M}}$**! Deleting the oldest row and column reduces $G_M$ to $G_{M-1}$ and lifts the rear spherical-cap wall, reopening the feasible corridor $\Omega_M \hookrightarrow \Omega_{M-1}$ by the dimensionless phase-space log-ratio

$$
q_M \;:=\; \ln\!\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert} \;\ge\; 0 \qquad \Bigl(\text{or }\frac{q_M}{\ln 2} = \log_2\!\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert}\;\mathrm{bits}\Bigr).
$$

Here epistemic precision is essential: by itself, $q_M = \ln(\lvert\Omega_{M-1}\rvert / \lvert\Omega_M\rvert)$ is a pure geometric solid-angle log-ratio, and geometric shrinkage/expansion alone does not establish physical heat dissipation. **Under an explicit uniform accessible-volume memory prior and isothermal reset model**—in which releasing an anchor erases/resets a memory register uniformly weighting the $\lvert\Omega_{M-1}\rvert / \lvert\Omega_M\rvert$ state-space ratio (system entropy reduction $-\Delta S_{\mathrm{sys}} = q_M$) into a thermal reservoir at inverse temperature $\beta = (k_B T_{\mathrm{eff}})^{-1}$ obeying the balance law $\beta\,\Delta Q_{\mathrm{forget}} = -\Delta S_{\mathrm{sys}} + I_{\mathrm{mut}} + D_{\mathrm{res}}$ ($I_{\mathrm{mut}} \ge 0,\; D_{\mathrm{res}} \ge 0$)—invoking the kernel-verified Landauer bound [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance) (`LEAN ✓`; see also [Chapter 8](ch08-erasure-and-time-arrows.md)) yields the minimum isothermal heat cost of one-step window reopening:

$$
\Delta Q_{\mathrm{forget}} \;\ge\; k_B T_{\mathrm{eff}}\,q_M \;=\; k_B T_{\mathrm{eff}}\,\ln\!\frac{\lvert\Omega_{M-1}\rvert}{\lvert\Omega_M\rvert}.
$$

In this light (`MODEL`), decoherence times in open quantum systems, nocturnal synaptic pruning during sleep (see [§36.1](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)), and generational reset at biological conception (see [§35.1](ch35-light-pulse-and-self-referential-table.md)) are never accidental hardware defects: **forgetting is the thermodynamic chisel that pays Landauer heat to carve open nonzero steering solid angle inside a rigid causal web**! The five structural phases of the Gram window across $M = 0 \dots \ge 4$ are summarized below (single-line Markdown cells throughout):

| Gram Window Order | Bordered Matrix Size | Spherical Corridor $\Omega_M$ Geometry | Schur Margin & Rank Regime | Physical & Cognitive Dynamical Signature |
| :--- | :---: | :--- | :--- | :--- |
| **$M = 0$ (Unanchored Fog)** | $1 \times 1$ | Full unit sphere $S^2$ ($4\pi\;\mathrm{sr}$) | $Q_0 = 0,\;\Delta_{\mathrm{Schur}} = 1$ (no reference scale) | Zero historical continuity; isotropic white-noise drift where "total freedom" collapses for lack of self-coordinates |
| **$M = 1$ (Markov Polar Cap)** | $2 \times 2$ | Single circular cap $C(\mathbf{v}_t, \alpha_{\mathrm{coh}})$ | $\det G_2 = 1 - c_{1x}^2$ (locks grade-$1$ step "line") | Preserves one-step overlap without turning-plane or curvature memory; memoryless Brownian-like wandering |
| **$M = 2$ (Lens Curvature Corridor)** | $3 \times 3$ | Two-cap lens digon $\Omega_2$ | $\det G_3 = (1 - c_{12}^2)\Delta_{\mathrm{Schur}}(2)$ (senses "surface" excess) | Closes a single minimal circular-arc trihedron and senses Pancharatnam–Berry curvature, up to reflection parity |
| **$M = 3$ (3D Golden Triangle)** | $4 \times 4$ | **Curved spherical triangle $\Omega_3$** | Full-rank $\det G_3 > 0$ in $\mathbb{R}^3$ (locks chiral "volume" & $K_4$) | **Living operating point chosen in this book** (`MODEL`): pins chiral 3D self-frame while keeping a wide, uncrowded steering corridor |
| **$M \ge 4$ (Redundant / Tight Squeeze)** | $(M+1) \times (M+1)$ | Multi-arc sliver shrinking toward $\emptyset$ | Singular $G_M$ in $\mathbb{R}^3$ ($\operatorname{rank}\le 3$); high-$d$ equality window hits $\Delta_{\mathrm{Schur}} \le 0$ | Cross-generational over-constraint squeezes $\Omega_M \to \emptyset$, driving the trajectory toward Zeno–Laplace lock |

::: {.viz src="gram-window-consensus-sandbox" preset="forgetting-reopen" height="520"}
**Sliding-window partial-trace forgetting reopening $\Omega_9 \hookrightarrow \Omega_8$ and isothermal Landauer heat card (`forgetting-reopen`).** Releasing the oldest retained anchor $\mathbf{v}_9$ ($M : 9 \to 8$) turns the discarded cap and pinched $\Omega_9$ outline into dashed magenta traces while reopening the cyan feasible corridor nearly fourfold from $0.054604\;\mathrm{sr}$ to $0.208320\;\mathrm{sr}$ with single-step log-volume ratio $q_9 = \ln(\lvert\Omega_8\rvert/\lvert\Omega_9\rvert) \approx 1.338960\;\mathrm{nats}$ ($1.931710\;\mathrm{bits}$, expanding $33$-fold to $1.802272\;\mathrm{sr}$ upon stepping down to $M = 3$ in the full sandbox) and uniform isothermal Landauer lower bound $k_B T_{\mathrm{eff}}\,q_9$ (green `LEAN ✓` marks `surviving_copy_blocks_reversal` and `landauer_bound_of_balance`).
:::

## 34.7.3 Partial Block-Gram Completion and Multi-Observer Consensus: Chordal Graph Criterion, Joint Acceptance Window $\Omega_A \cap \Omega_B$, and Tolerance as Mutual Forgetting {#sec-ch34-18-3}

Beyond governing a single observer's longitudinal balance between memory and freedom, the Gram window directly determines horizontally whether two bounded observers $\mathcal{O}_A$ and $\mathcal{O}_B$ can inhabit a shared, contradiction-free **inter-subjective consensus reality** (bridging the acceptance-window intersections of [§34.4](ch33-s04-acceptance-windows.md) and pointer-basis consensus tensors of [§34.5](ch33-s05-consensus-and-pointer-bases.md#sec-ch33-consensus-decoherence-pointer)).

Suppose observer $\mathcal{O}_A$ holds a private window $\mathcal{W}_{M_A}$ ($G_{M_A} \succeq 0$) and observer $\mathcal{O}_B$ holds a private window $\mathcal{W}_{M_B}$ ($G_{M_B} \succeq 0$). Communicating across finite-bandwidth signals or shared probes, the two observers never measure all $M_A \times M_B$ cross-inner products; instead, only a sparse subset of entries in the off-diagonal cross-comparison block $C_{AB}$ is specified, leaving the rest unspecified (`?`) inside a **partial block Gram matrix**:

$$
G_{A \cup B} \;=\; \begin{pmatrix} G_{M_A} & C_{AB} \\ C_{AB}^\top & G_{M_B} \end{pmatrix}.
$$

When can such locally PSD private windows and sparse communication ties be completed into a globally PSD matrix $\widetilde{G}_{A\cup B} \succeq 0$, admitting a common Hilbert-space realization via [`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability) and [`exists_unitary_mul_eq_of_conjTranspose_mul_eq`](lean:D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq)? The celebrated **Grone–Johnson–Sá–Wolkowicz PSD Matrix Completion Theorem** (Grone, Johnson, Sá & Wolkowicz, *Linear Algebra Appl.* **58**, 109–124, 1984, `Literature`) provides the exact graph-theoretic criterion: let $\mathcal{G} = (V, E)$ be the undirected specification graph of known entries. Clearly every fully specified principal submatrix (every clique of $\mathcal{G}$) must be PSD; conversely, **every** partial Hermitian matrix on $\mathcal{G}$ with PSD cliques admits a global PSD completion **if and only if $\mathcal{G}$ is chordal** (every cycle of length $\ge 4$ possesses a chord)! Whenever inter-observer communication forms a chordless cycle of length $\ge 4$ (e.g., $A_1 \leftrightarrow B_1 \leftrightarrow A_2 \leftrightarrow B_2 \leftrightarrow A_1$ without diagonal cross-checks), local pairwise compatibility no longer suffices: cycle-holonomy obstructions can block every PSD completion (compare the $3\times 3$ and cycle countermodels in [Appendix E](appendix-e.md)); and embedding into a shared 3D Euclidean direction frame further requires $\operatorname{rank}(\widetilde{G}_{A\cup B}) \le 3$ (Schoenberg 1935; Laurent & Poljak 1995, `Literature`).

On the directional sphere $S^2 \subset \mathbb{R}^3$, for a candidate next-step event $\mathbf{x} \in S^2$ to remain simultaneously coherent with both observers' causal windows, $\mathbf{x}$ must lie inside their **Joint Orthogonal Acceptance Window**:

$$
\Omega_{\mathrm{consensus}}(A, B) \;:=\; \Omega_A(M_A) \cap \Omega_B(M_B) \;=\; \bigcap_{j=1}^{M_A}\bigl\{\mathbf{x}\in S^2 \mid \mathbf{x}\cdot\mathbf{v}_j \ge \cos\alpha_{\mathrm{coh}}\bigr\} \;\cap\; \bigcap_{k=1}^{M_B}\bigl\{\mathbf{x}\in S^2 \mid \mathbf{x}\cdot\mathbf{w}_k \ge \cos\alpha_{\mathrm{coh}}\bigr\}.
$$

This echoes, at the geometric–semantic level, the kernel-verified contextual fixed-point theorem [`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor) (`LEAN ✓`), which proves that any objective inter-contextual claim requires an invariant `commonFactor` shared across all fixed meanings. Here we must distinguish with complete mathematical precision between **rank-deficiency of realized 3D block Gram matrices** and **genuine consensus breakdown** (`manual derivation`):

- **Realized 3D anchor vectors always produce a PSD block Gram matrix $K_M = W_M W_M^\top \succeq 0$ with $\lambda_{\min}(K_M) = 0$ whenever $2M > 3$**: When $\mathbf{v}_1,\dots,\mathbf{v}_M \in S^2 \subset \mathbb{R}^3$ and $\mathbf{w}_1,\dots,\mathbf{w}_M \in S^2 \subset \mathbb{R}^3$ are actual 3D unit vectors stacked into $W_M \in \mathbb{R}^{2M\times 3}$, their fully realized $2M\times 2M$ block Gram matrix $K_M = W_M W_M^\top = \begin{pmatrix} G_A & C_{AB} \\ C_{AB}^\top & G_B \end{pmatrix}$ **always satisfies $K_M \succeq 0$ with $\operatorname{rank}(K_M) \le 3$**! Hence for every $2M > 3$ (e.g., $6\times 6$ with nullity $3$ at $M = 3$, or $18\times 18$ with nullity $15$ at $M = 9$), $\lambda_{\min}(K_M) = 0$ holds *identically* (tiny $-10^{-16}$ floating-point eigenvalues are numerical roundoff, not Gram infeasibility, and singularity of $K_M$ alone never implies $\Omega_A \cap \Omega_B = \emptyset$).
- **Where genuine algebraic or geometric breakdown occurs**: First (**incompatible partial cross-block or over-demanding equality extension $\implies \lambda_{\min} < 0$**), postulating an inconsistent cross-block $\widetilde{C}_{AB}$ across a non-chordal communication graph—or demanding equality overlaps $\mathbf{c}_{A\cup B}$ that violate $\mathbf{c}_{A\cup B} \in \operatorname{ran}(K_M)$ or $\mathbf{c}_{A\cup B}^\top K_M^+\mathbf{c}_{A\cup B} \le 1$—drives the minimum eigenvalue strictly negative ($\lambda_{\min} < 0$), ruling out any Hilbert-space completion. Second (**disjoint spherical corridors $\Omega_A(M_A) \cap \Omega_B(M_B) = \emptyset$ under over-long private windows**), even when past anchors sit consistently inside $\mathbb{R}^3$ ($K_M \succeq 0$), if $A$ and $B$ carry a nonzero frame tilt $\eta > 0$ while clinging to over-fitted windows ($M_A = M_B = 9$), their pinched corridors $\Omega_A(9)$ and $\Omega_B(9)$ shrink to tiny slivers that barely touch or miss altogether ($\Omega_A \cap \Omega_B = \emptyset$)! Rebuilding consensus then cannot be forced by distorting present measurements; **one gentle yet rigorous geometric remedy is "tolerance as mutual forgetting"**—sliding both windows down from $M = 9$ to the golden window $M = 3$ releases peripheral historical baggage so $\Omega_A(3)$ and $\Omega_B(3)$ overlap broadly once more!

::: {.viz src="gram-window-consensus-sandbox" preset="dual-window-consensus" height="520"}
**Dual-observer joint acceptance window $\Omega_A \cap \Omega_B$ and consensus restoration via mutual forgetting card (`dual-window-consensus`).** Enabling partner observer $B$ (violet caps and corridor, rotated by $\eta = 10^\circ$ about $y$ relative to cyan observer $A$): with $M = 9$ records each, the violet consensus shrinks to the dashed magenta sliver $0.010419\;\mathrm{sr}$ (and severs into exact emptiness $\Omega_A(9) \cap \Omega_B(9) = \emptyset$ at $\eta = 25^\circ$ and $30^\circ$); mutually forgetting the $6$ oldest records back to $M = 3$ reopens the violet consensus corridor more than $150$-fold to $1.570105\;\mathrm{sr}$ ($87.1181\%$ of $A$'s corridor; green `LEAN ✓` badges mark `objective_claim_requires_invariant_common_factor`, `exists_unitary_mul_eq_of_conjTranspose_mul_eq`, and `unit_gram_overlap_characterization`).
:::

## 34.7.4 Formal Anchors, Algebraic Gram-Window & Golden-Angle Spherical-Cap Spiral Benchmarks, and Literature Boundaries {#sec-ch34-18-4}

We collect the twelve kernel-verified mathematical pillars governing unit-overlap indistinguishability, two- and three-anchor Gram determinant identities and linear-independence criteria, operator Gram realizability, unitary Gram extension, orthogonal-complement projections and finite-layer escape, finite-memory history capacity, single-copy reversal blocking, and cross-contextual invariant common factors into the list of verified declarations below:

::: {.theorem #thm-ch34-gram-window-schur-and-consensus title="Twelve Verified Declarations Used in This Section: Gram Determinants and Realizability, Finite-Layer Escape, Finite-Memory Capacity, Surviving-Copy Reversal Blocking, and Others" lean="D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_formula D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_pos_iff D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor"}
Under the pinned `trureturing` frozen declarations, the following twelve mathematical statements hold simultaneously:

1. **Unit-overlap indistinguishability equivalence, operator Gram realizability, and unitary rigid-body extension**:
   In any normed inner-product space $E$ over $\mathbb{K}$ (`[RCLike 𝕜]`), for every normalized family $\operatorname{record} : \operatorname{Index} \to E$ ($\forall i,\; \lVert\operatorname{record}_i\rVert = 1$),

   $$
   \bigl(\forall i, j,\; \langle\operatorname{record}_i, \operatorname{record}_j\rangle_{\mathbb{K}} = 1 \;\Longleftrightarrow\; \operatorname{record}_i = \operatorname{record}_j\bigr) \;\land\; \operatorname{Equivalence}\bigl(\lambda i\,j \mapsto \langle\operatorname{record}_i, \operatorname{record}_j\rangle_{\mathbb{K}} = 1\bigr).
   $$

   On any complete complex inner-product space $V$, a continuous $\mathbb{C}$-linear operator $Q : V \to_L[\mathbb{C}] V$ satisfies $0 \le Q$ if and only if there exists $O : V \to_L[\mathbb{C}] V$ with $Q = O^\dagger \circ_L O$ and $\forall x, y \in V,\; \langle Q x, y\rangle_{\mathbb{C}} = \langle O x, O y\rangle_{\mathbb{C}}$; and for finite row type $m$ (`[Fintype m] [DecidableEq m]`) and finite column type $n$ (`[Finite n]`), any $A, B \in \operatorname{Matrix}(m, n, \mathbb{C})$ satisfying $B^\dagger B = A^\dagger A$ admit $U \in \operatorname{unitaryGroup}(m, \mathbb{C})$ such that $B = U A$.

2. **Closed-form two-anchor and three-anchor real Gram determinants and linear-independence positivity criteria**:
   On any real inner-product space $E$, any vectors $u, v, w \in E$ obey the exact determinant formulas and positivity equivalences:

   $$
   \begin{aligned}
   \det\bigl(\operatorname{twoAnchorGram}(u, v)\bigr) &\;=\; \lVert u\rVert^2 \lVert v\rVert^2 - \langle u, v\rangle_{\mathbb{R}}^2, \\
   0 < \det\bigl(\operatorname{twoAnchorGram}(u, v)\bigr) &\;\Longleftrightarrow\; \operatorname{LinearIndependent}_{\mathbb{R}}([u, v]); \\
   \det\bigl(\operatorname{threeAnchorGram}(u, v, w)\bigr) &\;=\; \lVert u\rVert^2 \lVert v\rVert^2 \lVert w\rVert^2 + 2\langle u, v\rangle_{\mathbb{R}}\langle u, w\rangle_{\mathbb{R}}\langle v, w\rangle_{\mathbb{R}} \\
   &\quad - \lVert u\rVert^2 \langle v, w\rangle_{\mathbb{R}}^2 - \lVert v\rVert^2 \langle u, w\rangle_{\mathbb{R}}^2 - \lVert w\rVert^2 \langle u, v\rangle_{\mathbb{R}}^2, \\
   0 < \det\bigl(\operatorname{threeAnchorGram}(u, v, w)\bigr) &\;\Longleftrightarrow\; \operatorname{LinearIndependent}_{\mathbb{R}}([u, v, w]).
   \end{aligned}
   $$

3. **Six orthogonal-complement projection identities and unit-norm finite-layer orthogonal escape**:
   For any closed submodule $M \le E$ of a complete inner-product space $E$ with orthogonal projections $P_M = M.\mathrm{starProjection}$ and $P_{M^\perp} = M^\perp.\mathrm{starProjection}$, one has $P_{M^\perp} = \operatorname{id}_{\mathbb{K}, E} - P_M$, $P_M \circ_L P_M = P_M$, $P_{M^\perp} \circ_L P_{M^\perp} = P_{M^\perp}$, $P_M \circ_L P_{M^\perp} = 0$, $P_{M^\perp} \circ_L P_M = 0$, and $P_M + P_{M^\perp} = \operatorname{id}_{\mathbb{K}, E}$; moreover, for any closed submodule $S \le V$ with $S^\perp \neq \bot$, there exists $e \in S^\perp$ satisfying

   $$
   \lVert e\rVert = 1, \quad P_S e = 0, \quad \operatorname{infDist}(e, S) = 1, \quad \lVert\operatorname{id}_{\mathbb{K}, V} - P_S\rVert = 1.
   $$

4. **Finite-memory history capacity ceiling, single-surviving-copy coherent-reversal blocking, and invariant common factor of objective claims**:
   For any $N, d \in \mathbb{N}$, if density matrices $\rho : \operatorname{Fin} N \to M_d(\mathbb{C})$ ($\rho_i \succeq 0,\; \operatorname{Tr}(\rho_i) = 1$) and POVM elements $E : \operatorname{Fin} N \to M_d(\mathbb{C})$ ($E_j \succeq 0,\; \sum_j E_j = I_d$) satisfy $\forall i, j,\; \operatorname{Tr}(E_j \rho_i) = \delta_{ij}$, then

   $$
   N \;\le\; d;
   $$

   for any finite decidable copy type $\operatorname{Copy}$, record family $\operatorname{records} : \operatorname{Copy} \to \operatorname{EnvironmentRecord}$, qubit matrix $\rho \in \operatorname{QubitMatrix}$, indices $i, j \in \operatorname{Fin} 2$, and surviving copy $k \in \operatorname{Copy}$, if every $l \neq k$ has unit-modulus overlap $\overline{\operatorname{recordOverlap}(\operatorname{records}_l, i, j)}\,\operatorname{recordOverlap}(\operatorname{records}_l, i, j) = 1$ while $\operatorname{recordOverlap}(\operatorname{records}_k, i, j) \neq 1$ and $\rho_{ij} \neq 0$, then reversing on $\operatorname{Finset.univ.erase}\,k$ fails to restore $\rho_{ij}$:

   $$
   \bigl(\operatorname{reverseChannelOn}(\operatorname{Finset.univ.erase}\,k,\; \operatorname{records})\bigl(\operatorname{multiRecordChannel}(\operatorname{records}, \rho)\bigr)\bigr)_{ij} \;\neq\; \rho_{ij};
   $$

   and for any fixed-meaning relation $\operatorname{isFixedMeaning} : \operatorname{Context} \to \operatorname{Meaning} \to \operatorname{Prop}$ and projection $\operatorname{factor} : \operatorname{Meaning} \to \operatorname{Factor}$, every witness $\operatorname{ObjectiveInterpretationClaim}(\operatorname{isFixedMeaning}, \operatorname{factor})$ yields an invariant $\operatorname{commonFactor} : \operatorname{Factor}$ with $\operatorname{factor}(\operatorname{meaning}) = \operatorname{commonFactor}$ whenever $\operatorname{isFixedMeaning}\,\operatorname{context}\,\operatorname{meaning}$ holds.
:::

::: proof
In Group 1, `unit_gram_overlap_characterization` expands $\lVert\operatorname{record}_i - \operatorname{record}_j\rVert^2 = 2 - 2\operatorname{Re}\langle\operatorname{record}_i, \operatorname{record}_j\rangle_{\mathbb{K}}$ alongside Cauchy–Schwarz on unit vectors to equate unit overlap with vector equality, inheriting reflexivity, symmetry, and transitivity; `gram_realizability` extracts the continuous self-adjoint $C^*$-square root $O$ for $0 \le Q$ in the forward direction and uses $\langle Q x, x\rangle_{\mathbb{C}} = \lVert O x\rVert^2 \ge 0$ in the converse; and `exists_unitary_mul_eq_of_conjTranspose_mul_eq` builds a linear isometry between column spans from $B^\dagger B = A^\dagger A$ and extends it across orthogonal complements in $\mathbb{C}^m$ to a unitary matrix $U$. In Group 2, `two_anchor_gram_det_formula` and `three_anchor_gram_det_formula` expand the $2\times 2$ and $3\times 3$ Leibniz determinant sums over real inner products, while `two_anchor_gram_det_pos_iff` and `three_anchor_gram_det_pos_iff` combine Sylvester's principal-minor positivity criterion with strict positivity of the Gram quadratic form on nontrivial linear combinations. In Group 3, `orthogonal_complement_projection_identities` follows directly from $E = M \oplus M^\perp$ and self-adjoint idempotency; `finite_layer_projection_escape` normalizes a nonzero vector in $S^\perp \neq \bot$ to obtain $e \in S^\perp$ ($\lVert e\rVert = 1,\; P_S e = 0$), uses $\lVert e - s\rVert^2 = 1 + \lVert s\rVert^2 \ge 1$ to establish $\operatorname{infDist}(e, S) = 1$, and pairs evaluation at $e$ with $\lVert\operatorname{id} - P_S\rVert \le 1$ to lock the operator norm at $1$. In Group 4, `finite_memory_history_capacity` combines PSD trace monotonicity $\operatorname{Tr}(E_j) \ge \operatorname{Tr}(E_j \rho_j) = 1$ with $\sum_{j=1}^N E_j = I_d$ to sum $N = \sum_j \operatorname{Tr}(E_j \rho_j) \le \operatorname{Tr}(I_d) = d$; `surviving_copy_blocks_reversal` evaluates the off-diagonal $(i, j)$ multiplier after reversing all copies $l \neq k$, reducing unit-modulus factors to $1$ while leaving the uncancelled factor $\operatorname{recordOverlap}(\operatorname{records}_k, i, j) \neq 1$ multiplying $\rho_{ij} \neq 0$; and `objective_claim_requires_invariant_common_factor` unpacks the cross-contextual witness packaged inside `ObjectiveInterpretationClaim`. The full proof is checked by the Lean kernel.
:::

We now verify in exact rational arithmetic and 80-digit closed-form spherical geometry (rounded half-up to six decimal places) the contrast between equicorrelated and orthonormal algebraic Gram windows, the Gauss–Bonnet solid-angle and forgetting ledger of a nine-anchor golden-angle spherical-cap spiral, and dual-observer consensus retention versus block-Gram spectra:

::: {.example #ex-ch34-gram-schur-cap-spiral-and-consensus-benchmark title="Algebraic Gram-Window Schur Margins, Golden-Angle Spherical-Cap Gauss–Bonnet Spiral, and Dual-Observer Consensus Benchmark"}
We evaluate three exact analytical and six-decimal benchmarks (`manual derivation` / `NUM`, computed at 80-digit working precision and rounded half-up to six decimals):

1. **Equicorrelated versus orthonormal algebraic Gram windows in ambient Hilbert dimension $\ge M+1$ ($M = 1 \dots 6$)**:
   Fix the candidate target-overlap vector at $\mathbf{c}_M = \frac{1}{2}\mathbf{1}_M$ and compare two full-rank anchor families:
   - **Family A (Equicorrelated compatible anchors)**: $G_M = (1 - r)I_M + r\mathbf{1}_M\mathbf{1}_M^\top$ with $r = \frac{1}{3}$ ($G_M = \frac{2}{3}I_M + \frac{1}{3}\mathbf{1}_M\mathbf{1}_M^\top$). Because $\mathbf{1}_M$ is an eigenvector of $G_M$ with eigenvalue $\frac{M+2}{3}$ while $\mathbf{1}_M^\perp$ has eigenvalue $\frac{2}{3}$ (multiplicity $M-1$), exact rational algebra gives $\det G_M = \bigl(\frac{2}{3}\bigr)^{M-1}\frac{M+2}{3}$, $Q_M = \mathbf{c}_M^\top G_M^{-1}\mathbf{c}_M = \frac{3M}{4(M+2)}$, and $\Delta_{\mathrm{Schur}}(M) = 1 - Q_M = \frac{M+8}{4(M+2)}$. As $M \to \infty$, $Q_M \nearrow \frac{3}{4} = 0.750000$ and $\Delta_{\mathrm{Schur}}(M) \searrow \frac{1}{4} = 0.250000 > 0$: shared positive alignment keeps this family feasible for every $M$!
   - **Family B (Orthonormal over-constrained comparison)**: $G_M = I_M$ ($\det G_M \equiv 1$) with the same target $\mathbf{c}_M = \frac{1}{2}\mathbf{1}_M$. Here $Q_M = \frac{M}{4}$ and $\Delta_{\mathrm{Schur}}(M) = 1 - \frac{M}{4}$: $M = 4$ hits exact zero-margin saturation ($\Delta_{\mathrm{Schur}}(4) = 0$, locking $\mathbf{x} = \frac{1}{2}\sum_{j=1}^4\mathbf{v}_j$ inside the anchor span), while $M = 5, 6$ yield $\Delta_{\mathrm{Schur}}(5) = -\frac{1}{4} < 0$ and $\Delta_{\mathrm{Schur}}(6) = -\frac{1}{2} < 0$—no unit vector in *any* Hilbert space can satisfy those overlaps!

| Window $M$ | Equicorr. $\det G_M$ (exact / 6 dec.) | Equicorr. $Q_M$ (exact / 6 dec.) | Equicorr. $\Delta_{\mathrm{Schur}}$ (exact / 6 dec.) | Orthonormal $Q_M = \frac{M}{4}$ | Orthonormal $\Delta_{\mathrm{Schur}} = 1 - \frac{M}{4}$ | Orthonormal Extension Regime |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **$1$** | $1$ ($1.000000$) | $\frac{1}{4}$ ($0.250000$) | $\frac{3}{4}$ ($0.750000$) | $\frac{1}{4}$ ($0.250000$) | $\frac{3}{4}$ ($0.750000$) | Positive: ample freedom |
| **$2$** | $\frac{8}{9}$ ($0.888889$) | $\frac{3}{8}$ ($0.375000$) | $\frac{5}{8}$ ($0.625000$) | $\frac{1}{2}$ ($0.500000$) | $\frac{1}{2}$ ($0.500000$) | Positive: half budget committed |
| **$3$** | $\frac{20}{27}$ ($0.740741$) | $\frac{9}{20}$ ($0.450000$) | $\frac{11}{20}$ ($0.550000$) | $\frac{3}{4}$ ($0.750000$) | $\frac{1}{4}$ ($0.250000$) | Positive: golden margin |
| **$4$** | $\frac{16}{27}$ ($0.592593$) | $\frac{1}{2}$ ($0.500000$) | $\frac{1}{2}$ ($0.500000$) | $1$ ($1.000000$) | $0$ ($0.000000$) | **Zero: exact span saturation** |
| **$5$** | $\frac{112}{243}$ ($0.460905$) | $\frac{15}{28}$ ($0.535714$) | $\frac{13}{28}$ ($0.464286$) | $\frac{5}{4}$ ($1.250000$) | $-\frac{1}{4}$ ($-0.250000$) | **Negative: infeasible lock** |
| **$6$** | $\frac{256}{729}$ ($0.351166$) | $\frac{9}{16}$ ($0.562500$) | $\frac{7}{16}$ ($0.437500$) | $\frac{3}{2}$ ($1.500000$) | $-\frac{1}{2}$ ($-0.500000$) | **Negative: infeasible lock** |

2. **Closed-form Gauss–Bonnet spherical-cap spiral and sliding-forgetting ledger on $S^2 \subset \mathbb{R}^3$ ($M = 1 \dots 9$)**:
   Set $\alpha_{\mathrm{coh}} = 60^\circ$ ($h = \cos 60^\circ = \frac{1}{2}$), golden angle $\gamma = \pi(3 - \sqrt{5}) \approx 137.507764^\circ$, colatitudes $\beta_j = \bigl(12 + 6(j - 1)\bigr)^\circ$, and azimuths $\phi_j = (j - 1)\gamma$ ($j = 1,\dots,9$), defining $\mathbf{v}_j = (\sin\beta_j\cos\phi_j,\, \sin\beta_j\sin\phi_j,\, \cos\beta_j) \in S^2$, $\Omega_0 = S^2$ ($\lvert\Omega_0\rvert = 4\pi \approx 12.566371\;\mathrm{sr}$), and $\Omega_M = \{\mathbf{x}\in S^2 \mid \forall j \le M,\; \mathbf{x}\cdot\mathbf{v}_j \ge \frac{1}{2}\}$. Because every $\Omega_M$ ($1 \le M \le 9$) has nonempty interior and is geodesically convex ($\chi = 1$), intersecting pairwise small-circle boundaries to extract active parameter spans $\Delta t_i$ and feasible vertices yields the exact fitting-free Gauss–Bonnet formula

   $$
   \lvert\Omega_M\rvert \;=\; 2\pi - h\sum_{i}\Delta t_i - \sum_{\text{vertices}}\arccos\!\left(\frac{\mathbf{v}_i\cdot\mathbf{v}_j - h^2}{1 - h^2}\right)
   $$

   (with 55- versus 80-digit stability $\le 3.48\times 10^{-56}\;\mathrm{sr}$, independently verified by $N = 10^6$ deterministic Fibonacci quadrature and analytic cell-extremum enclosures of width $\le 3.00\times 10^{-4}\;\mathrm{sr}$):

| Window $M$ | Solid Angle $\lvert\Omega_M\rvert$ ($\mathrm{sr}$) | Sphere Share $\frac{\lvert\Omega_M\rvert}{4\pi}$ | Step Log-Ratio $q_M$ ($\mathrm{nats}$) | Step Log-Ratio $\frac{q_M}{\ln 2}$ ($\mathrm{bits}$) | Active Boundary Vertices / Arcs |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$1$** | $3.141593$ ($\pi$) | $0.250000$ | $1.386294$ ($\ln 4$) | $2.000000$ | $0$ vertices / $1$ full cap |
| **$2$** | $2.297861$ | $0.182858$ | $0.312751$ | $0.451205$ | $2$ vertices / $2$-arc lens |
| **$3$** | $1.802272$ | $0.143420$ | $0.242930$ | $0.350474$ | $3$ vertices / $3$-arc golden triangle |
| **$4$** | $1.412802$ | $0.112427$ | $0.243473$ | $0.351258$ | $3$ vertices / $3$ arcs |
| **$5$** | $1.049640$ | $0.083528$ | $0.297128$ | $0.428664$ | $3$ vertices / $3$ arcs |
| **$6$** | $0.720881$ | $0.057366$ | $0.375729$ | $0.542063$ | $3$ vertices / $3$ arcs |
| **$7$** | $0.436215$ | $0.034713$ | $0.502339$ | $0.724721$ | $3$ vertices / $3$ arcs |
| **$8$** | $0.208320$ | $0.016578$ | $0.739062$ | $1.066241$ | $3$ vertices / $3$ arcs |
| **$9$** | $0.054604$ | $0.004345$ | $1.338960$ | $1.931710$ | $3$ vertices / $3$-arc tight sliver |

   Telescoping closure holds identically: $\sum_{M=1}^{9} q_M = \ln(4\pi / \lvert\Omega_9\rvert) \approx 5.438666\;\mathrm{nats}$ ($7.846336\;\mathrm{bits}$); advancing to $M = 10, 11, 12$ renders the half-space intersection strictly infeasible with exact $\lvert\Omega_{10}\rvert = \lvert\Omega_{11}\rvert = \lvert\Omega_{12}\rvert = 0$ ($\Omega_{10} = \emptyset$, complete over-constraint lock). Conversely, sliding from $M = 9$ back to the golden window $M = 3$ reopens $\lvert\Omega_M\rvert$ from $0.054604\;\mathrm{sr}$ to $1.802272\;\mathrm{sr}$—a **$33.0060\times$** expansion with cumulative log-ratio $\sum_{M=4}^{9} q_M \approx 3.496690\;\mathrm{nats}$ ($5.044657\;\mathrm{bits}$)!

3. **Dual-observer consensus solid angle and 3D block-Gram spectra across frame tilts $\eta = 10^\circ, 25^\circ, 30^\circ$ ($M = 3$ vs. $M = 9$)**:
   Let observer $A$ hold $\mathbf{v}_j$ and observer $B$ hold rotated anchors $\mathbf{w}_j = R_y(10^\circ)\mathbf{v}_j$ ($\alpha_{\mathrm{coh}} = 60^\circ$), stacking all $2M$ vectors into $W_M \in \mathbb{R}^{2M\times 3}$ with realized block Gram matrix $K_M = W_M W_M^\top$:

| Window $M$ per Observer | Single Share $\frac{\lvert\Omega_A\rvert}{4\pi}$ | Consensus Area $\lvert\Omega_A\cap\Omega_B\rvert$ ($\mathrm{sr}$) | Global Share $\frac{\lvert\Omega_{\mathrm{cons}}\rvert}{4\pi}$ | Consensus Retention $\frac{\lvert\Omega_A\cap\Omega_B\rvert}{\lvert\Omega_A\rvert}$ | Exact Block $\lambda_{\min}(K_M)$ | Smallest Positive $\lambda_+^{\min}$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$M = 3$ (Golden Window)** | $0.143420$ | $1.570105$ ($5$-gon) | $0.124945$ | **$87.1181\%$** ($0.871181$) | $0$ ($6\times 6$, rank $3$, nullity $3$) | $0.167199$ |
| **$M = 9$ (Tight Window)** | $0.004345$ | $0.010419$ ($3$-gon) | $0.000829$ | **$19.0813\%$** ($0.190813$) | $0$ ($18\times 18$, rank $3$, nullity $15$) | $2.744723$ |

   Both realized 3D block Gram matrices $K_3$ (positive spectrum $0.167199, 0.456613, 5.376189$) and $K_9$ (positive spectrum $2.744723, 3.881656, 11.373621$) have exact rank $3$ and $\lambda_{\min} = 0$; yet on $S^2$, at $\eta = 10^\circ$ clinging to $M = 9$ slashes consensus retention from **$87.1181\%$** down to **$19.0813\%$** and shrinks shared solid angle **$150.6932$-fold**! At larger frame tilts $\eta = 25^\circ$ and $\eta = 30^\circ$, $M = 8$ retains tiny overlaps ($0.043804\;\mathrm{sr}$ and $0.022659\;\mathrm{sr}$), whereas **$M = 9$ severs inter-observer consensus to the exact empty set $\lvert\Omega_A(9)\cap\Omega_B(9)\rvert = 0$** (while testing the equal-boundary candidate vector $\mathbf{c}_{2M} = \frac{1}{2}\mathbf{1}_{2M}$ in the $(2M+1)\times(2M+1)$ bordered matrix $K_M(\frac{1}{2})$ yields deeply negative $\lambda_{\min}(K_9(\frac{1}{2})) = -0.257294$ at $\eta = 25^\circ$ and $-0.281581$ at $\eta = 30^\circ$); mutually releasing the $6$ oldest anchors back to $M = 3$ immediately reopens **$1.225398\;\mathrm{sr}$** ($\eta = 25^\circ$) and **$1.112297\;\mathrm{sr}$** ($\eta = 30^\circ$) of shared reality!
:::

::: {.remark #rem-ch34-schur-schoenberg-grone-landauer-forgetting-literature title="Gram Determinants, Schur Complements, Schoenberg Embedding, Chordal PSD Completion, and Landauer Forgetting Thermodynamics: Literature & Epistemic Boundaries (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** In formulating the Gram window, spherical-cap corridors, sliding-forgetting reopening, and block-Gram consensus completion, we uphold three strict epistemic boundaries:

1. **Foundational literature on Gram determinants, Schur complements, Euclidean embeddings, PSD matrix completion, and erasure thermodynamics**: Linear-independence characterization via inner-product determinants originates with J. P. Gram (*J. Reine Angew. Math.* **94**, 41–73, 1883); block determinant factorization and definiteness reduction originate with I. Schur (*J. Reine Angew. Math.* **147**, 205–232, 1917), extended to singular PSD blocks via Moore–Penrose pseudoinverses by A. Albert (*SIAM J. Appl. Math.* **17**, 434–438, 1969); isometric embeddability of metric spaces into Euclidean spheres and Hilbert space via PSD kernels was established by I. J. Schoenberg (*Ann. of Math.* **36**, 724–732, 1935; *Trans. Amer. Math. Soc.* **44**, 522–536, 1938); the chordal-graph characterization of PSD-completable partial Hermitian matrices was proved by R. Grone, C. R. Johnson, E. M. Sá & H. Wolkowicz (*Linear Algebra Appl.* **58**, 109–124, 1984), while the geometry of unit-diagonal PSD matrices (the elliptope) and low-rank realizations was analyzed by M. Laurent & S. Poljak (*Linear Algebra Appl.* **223/224**, 439–461, 1995); thermodynamic heat bounds for logically irreversible memory reset originate with R. Landauer (*IBM J. Res. Dev.* **5**, 183–191, 1961) and C. H. Bennett (*Int. J. Theor. Phys.* **21**, 905–940, 1982); and inter-observer objective consensus via environmental redundancy (Quantum Darwinism) is due to W. H. Zurek (*Nat. Phys.* **5**, 181–188, 2009).
2. **Demarcation between kernel-verified `LEAN ✓` theorems, closed-form/numerical checks (`manual derivation` / `NUM`), and the Gram-window synthesis (`MODEL`)**: All twelve declarations in [@thm-ch34-gram-window-schur-and-consensus] together with inline anchors [`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone) and [`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance) are kernel-verified in Lean 4 without axiomatic gaps (`LEAN ✓`); general-$M$ bordered Schur complements, exact rational formulas for equicorrelated and orthonormal windows, closed-form Gauss–Bonnet spherical-cap areas, and realized block-Gram spectra are direct mathematical derivations and high-precision evaluations (`manual derivation` / `NUM`), with explicit qualification that translating $q_M$ into dissipated heat requires a uniform accessible-volume prior and an isothermal erasure/reset protocol. Interpreting cosmic relational memory through sliding submatrices $\mathcal{W}_M \subset G_\infty$, biological forgetting and sleep pruning as anti-lock reopening, and inter-subjective tolerance as joint window reopening constitutes this book's geometric and natural-philosophical model (`MODEL`).
3. **Fixed-rank PSD completion complexity and non-equilibrium multi-observer memory thermodynamics (`OPEN`)**: Deciding fixed-dimension PSD/Euclidean matrix completability ($\operatorname{rank}(\widetilde{G}) \le 3$) on arbitrary non-chordal communication graphs (a strongly hard nonconvex real-algebraic problem), as well as establishing exact fluctuation theorems for sliding-window forgetting across strongly non-Markovian, far-from-equilibrium biological and quantum observer networks beyond uniform isothermal assumptions, remain active open frontiers in mathematical optimization and quantum thermodynamics (`OPEN`).
:::

Zooming in from the $M \times M$ sliding Gram window to the individual Born echo weight $\cos^2\theta$ derived via round-trip projection in [§29.4](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot) alongside this chapter's partial-trace diagonal ensemble brings us straight to the opening challenge of Chapter 34's four-section epistemic stress-test corridor ([§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins)–[§34.11](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor)): if round-trip projection fixes deterministic squared weights $\cos^2\theta$ and horizon partial tracing turns a pure superposition into the diagonal ensemble $\operatorname{diag}(\cos^2\theta, \sin^2\theta)$, why does **a single detector click on the laboratory bench** never settle at a smeared fractional reading, but instead realizes one exclusive classical record (crossing the *And*-to-*Or* gap)? Test the breathing rhythm between over-constraint lock at $M = 9$, golden reopening at $M = 3$, and dual-observer consensus across all five presets of the `GRAM//CONSENSUS` interactive laboratory below (followed in Subsection 34.7.5 by the arithmetic elimination resource audit) before stepping into [§34.8](ch34-s20-single-outcome-and-attractor-basins.md#sec-ch34-single-outcome-attractor-basins):

::: {.viz src="gram-window-consensus-sandbox" height="640"}
**Gram Window $\mathcal{W}_M$, Schur-complement corridors, and multi-observer consensus interactive laboratory (`GRAM//CONSENSUS`).** Switch freely among Schur & Two-Cap Lens, Golden Triangle $M=3$, Over-Constrained Lock $M=9$, Forgetting Reopening, and Dual-Window Consensus inside the unified three-column laboratory while varying window length $M \in \{1,\dots,10\}$, coherence half-angle $\alpha_{\mathrm{coh}}$, and observer-$B$ tilt $\eta$ or dragging the amber candidate $\mathbf{x}$ on $S^2$ to inspect cyan single-observer corridors $\Omega_M$ and equicorrelated Schur curves, magenta squeezing arcs and log-reopening ratios $q_M$, violet dual-observer consensus $\Omega_A \cap \Omega_B$, and the interactive Gram matrix heatmap; thirteen green `LEAN ✓` badges correspond to the twelve declarations of [@thm-ch34-gram-window-schur-and-consensus] together with `landauer_bound_of_balance` cited in [§34.6](ch34-s17-entanglement-horizon-and-thermodynamics.md#sec-ch34-entanglement-horizon-and-thermodynamics).
:::

## 34.7.5 Resource Ledger of Arithmetic Elimination: Exact Circuits Are Not Sparse Algorithms {#sec-ch34-18-5}

Earlier subsections used the Schur complement to characterize single-step margins on finite memory windows; testing elimination ideas on a finite integer divisibility network requires auditing graph fill-in, approximation residuals, and storage costs with the same discipline used in [§22.4.1](ch22-s04-critical-line-and-rh.md#sec-ch22-4-1) to separate series truncation from analytic continuation. Consider the explicit finite vertex set $V_N := \{2, 3, \dots, N\}$: place an undirected edge between $d, n \in V_N$ if and only if $d \neq n$ and ($d \mid n$ or $n \mid d$), write $W$ for the symmetric $0/1$ adjacency matrix and $L_D := \operatorname{diag}(\deg) - W$ for the divisibility-graph Laplacian, and fix the anchor damping $\alpha = \frac{1}{4}$ to define the real symmetric model matrix

$$
G \;:=\; L_D + \alpha I, \qquad \alpha = \frac{1}{4}.
$$

For every nonzero real vector $x = (x_2, \dots, x_N)^\top \neq \mathbf{0}$, completing the square edge by edge yields

$$
x^\top G x \;=\; \alpha\sum_{n=2}^{N} x_n^2 \;+\; \sum_{\substack{2 \le d < n \le N \\ d \mid n}} (x_d - x_n)^2 \;>\; 0.
$$

This elementary sum-of-squares identity guarantees that $G$ is strictly positive definite and invertible, yet three boundaries must be stated upfront: first, $G = L_D + \frac{1}{4}I$ is only a **toy model matrix on a finite divisibility graph and is not equal to the Nyman–Beurling–Báez-Duarte (NBB) Gram matrix** in Hilbert space; second, $G = L_D + \frac{1}{4}I$ is symmetric strictly diagonally dominant (SDD), so subcubic iterative and graph-Laplacian solvers for $G x = b$ already exist in numerical linear algebra (and such known fast solvers for a finite divisibility graph never constitute progress on the Riemann Hypothesis), whereas unpivoted direct Gaussian–Schur elimination still suffers dense fill-in; third, [@thm-ch34-gram-window-schur-and-consensus] covers only abstract inner-product realizations, two- and three-anchor determinant criteria, orthogonal-complement escape, and finite-register dimension bounds—it **cannot be extrapolated to cover the divisibility matrix $G$, Schur elimination complexity, or the Riemann Hypothesis**, and for singular positive-semidefinite Gram blocks (such as $\alpha = 0$, where isolated vertices and component-wise constant vectors lie in the nullspace) the ordinary inverse $A^{-1}$ does not exist and must be replaced by range conditions and the Moore–Penrose pseudoinverse. The interactive laboratory holds fixed the terminal set $T_N = \{n \in V_N : 4n > 3N\}$, and both the natural and leaf-first orders eliminate only its complement $V_N \setminus T_N$ without changing the terminals across orderings. On the $N = 6$ divisibility graph $V_6 = \{2, 3, 4, 5, 6\}$ (with fixed terminals $T_6 = \{5, 6\}$), there are only three original edges $2\text{--}4$, $2\text{--}6$, and $3\text{--}6$, with vertex $5$ **isolated**; eliminating the hub vertex $2$ first immediately creates a nonzero **fill-in edge $4\text{--}6$** of weight $-\frac{4}{9}$ between the previously non-adjacent vertices $4$ and $6$.

::: {.viz src="arithmetic-schur-lab" preset="natural" height="500"}
**Three-dimensional divisibility network with fill-in edges under natural increasing elimination (`natural`).** The 3D stage displays the cyan original divisibility edges and isolated vertices of the integer divisibility network along the purple coordinate axes as interior vertices are eliminated in natural order relative to a fixed terminal set. Eliminating small high-degree hubs first creates magenta fill-in edges between previously unlinked multiples (such as $4\text{--}6$ at $N = 6$), with the amber marker indicating the selected vertex.
:::

For a block matrix $\begin{pmatrix} A & B \\ B^\top & C \end{pmatrix}$, eliminating the interior set $U$ produces the exact one-shot Schur complement $S = C - B^\top A^{-1} B$. **When comparing elimination orderings, the terminal set must never shift with the ordering; only locking a single fixed terminal set $T = V_N \setminus U$ in advance provides a well-defined comparison baseline**.

::: {.example #ex-ch34-divisibility-n6-schur-and-drop title="Verification of Natural vs. Leaf-First Schur Blocks for Fixed Terminals {5, 6} and Drop-Threshold Residual Criterion"}
On $V_6 = \{2, 3, 4, 5, 6\}$ ($\alpha = \frac{1}{4}$), lock the fixed terminal set $T = \{5, 6\}$ and interior elimination set $U = \{2, 3, 4\}$.

1. **Natural order $(2, 3, 4)$ vs. leaf-first order $(4, 3, 2)$**: Eliminating vertex $2$ first in natural order ($G_{22} = \frac{9}{4}$, $G_{24} = G_{26} = -1$) immediately introduces the nonzero fill-in entry $G^{(1)}_{46} = G^{(1)}_{64} = 0 - \frac{(-1)(-1)}{9/4} = -\frac{4}{9}$ across $4\text{--}6$, updating the diagonals to $G^{(1)}_{44} = \frac{29}{36}$ and $G^{(1)}_{66} = \frac{65}{36}$; eliminating $3$ ($G^{(1)}_{33} = \frac{5}{4}$, $G^{(1)}_{36} = -1$) gives $G^{(2)}_{66} = \frac{65}{36} - \frac{4}{5} = \frac{181}{180}$; finally eliminating $4$ yields $S_{66} = \frac{181}{180} - \frac{(4/9)^2}{29/36} = \frac{181}{180} - \frac{64}{261} = \frac{441}{580}$. Keeping the exact same terminal set $T = \{5, 6\}$ under **leaf-first order $(4, 3, 2)$**: eliminating degree-one leaf $4$ (connected only to $2$, $G_{44} = \frac{5}{4}$) updates only $G'_{22} = \frac{9}{4} - \frac{4}{5} = \frac{29}{20}$; eliminating degree-one leaf $3$ (connected only to $6$, $G'_{33} = \frac{5}{4}$) updates only $G''_{66} = \frac{29}{20}$; finally eliminating vertex $2$ (now linked solely to terminal $6$) yields $S_{66} = \frac{29}{20} - \frac{20}{29} = \frac{441}{580}$ with **zero fill-in throughout**, matching the one-shot Schur block $C - B^\top A^{-1} B$ identically:

   $$
   S_{\{5, 6\}} \;=\; \operatorname{diag}\!\left(\frac{1}{4},\; \frac{441}{580}\right) \;=\; \begin{pmatrix} \frac{1}{4} & 0 \\ 0 & \frac{441}{580} \end{pmatrix},
   $$

   where the isolated terminal $5$ retains diagonal entry $\frac{1}{4}$ at every step.
2. **Final Schur-block threshold pruning and original-system residual criteria**: The page first performs exact elimination onto the fixed terminal set $T_N$ to form the final Schur block $S$, then symmetrically zeroes off-diagonal entries satisfying $|S_{ij}| < \varepsilon$ ($i \neq j$) while leaving the diagonal entries untouched to obtain $\tilde{S}$; it solves this approximate terminal system and back-substitutes for $b = e_N$ using the exact elimination record to produce $\tilde{x}$. The laboratory jointly measures the Schur-block discrepancy $\lVert S - \tilde{S}\rVert_F$ and the **original-system residual $\lVert G\tilde{x} - b\rVert_2$**; $\tilde{x}$ can deviate from $G x = b$ only when nonzero off-diagonal terminal couplings fall below $\varepsilon$ and are pruned.
:::

::: {.viz src="arithmetic-schur-lab" preset="leaf" height="500"}
**Three-dimensional divisibility network suppressing fill-in under leaf-first elimination (`leaf`).** The 3D stage shows the cyan original divisibility edges of the integer network along the purple coordinate axes for the same fixed terminal set while degree-one leaves are eliminated ahead of interior hubs. For $N = 6$ with fixed terminals $\{5, 6\}$, the leaf-first sequence $(4, 3, 2)$ generates zero magenta fill-in edges, with the amber marker indicating the selected vertex.
:::

This example underscores a general principle: **the algebraic exactness of the Schur identity $S = C - B^\top A^{-1} B$ neither guarantees sparsity nor confers low computational cost automatically, nor does it establish an isomorphism with tropical (min-plus shortest-path) algebra**. On large-$N$ divisibility graphs, eliminating small integers of high degree links their multiples into dense cliques; whenever drop-threshold pruning is applied, one must jointly track the dropped-entry norm and the back-substituted residual $\lVert G\tilde{x} - b\rVert_2$ on the original system rather than claiming speedups from edge counts alone.

::: {.viz src="arithmetic-schur-lab" preset="drop" height="500"}
**Three-dimensional divisibility network under final Schur-block threshold pruning (`drop`).** After exact elimination onto the fixed terminals, the 3D divisibility network displays the magenta reduced couplings retained once off-diagonal entries of the final Schur block with $|S_{ij}| < \varepsilon$ are symmetrically zeroed while diagonal entries remain fixed, with the amber dot marking the currently selected vertex. This strategy prunes weak couplings only on the final terminal block and audits approximation accuracy through the Schur-block discrepancy and the original-system back-substitution residual.
:::

Conversely, one must not claim that repeated squaring on a divisibility graph inevitably triggers eigenvalue explosion. With step size $\tau = \frac{1}{1 + \max_{2 \le n \le N}\deg(n)}$ on the same divisibility graph, form the self-looped random-walk matrix

$$
P \;:=\; I - \tau L_D, \qquad \tau \;=\; \frac{1}{1 + \max\deg}.
$$

Because $L_D$ is real symmetric, $P$ is **real symmetric with a purely real spectrum**; simultaneously, this choice of $\tau$ keeps $P$ entrywise non-negative with every row summing to $1$, making $P$ a **symmetric non-negative row-stochastic matrix** whose eigenvalues lie in $(-1, 1]$ with spectral radius and spectral norm $\rho(P) = \lVert P\rVert_2 = 1 \le 1$. Applying $d$ sequential matrix-squaring layers yields $P^{2^d}$: **although there are only $d$ sequential matrix-squaring layers, the operator polynomial degree reaches $2^d$**, while $P^{2^d}$ always remains symmetric and entrywise non-negative row-stochastic with spectral radius $\rho(P^{2^d}) = 1 \le 1$ (at $d = 0$ it may still have negative eigenvalues, whereas for $d \ge 1$ its real spectrum is non-negative and bounded)—demonstrating that repeated squaring need not blow up spectrally, even though connected components rapidly fill in and their **fill density, multiply-add counts, and memory footprint** must still be accounted for.

::: {.viz src="arithmetic-schur-lab" preset="square" height="500"}
**Three-dimensional divisibility network under repeated squaring of the self-looped random walk (`square`).** Along purple coordinate axes, the 3D stage displays the integer divisibility network as the symmetric row-stochastic matrix $P = I - \tau L_D$ is squared layer by layer to $P^{2^d}$, with cyan edges marking the original divisibility adjacency. As the depth increases, magenta multistep couplings rapidly fill each non-isolated connected component while isolated vertices remain uncoupled; an amber dot on the purple scale marks the current squaring depth $d$.
:::

::: {.remark #rem-ch34-burnol-nbb-mollifier-literature title="Literature Boundaries on Burnol's Continuous-Dilation Lower Bound and the Mollifier Parameter 4/7 (Literature Results, Not Formalized Here)"}
**Literature results, not formalized in this book.** Two literature boundaries must be respected when comparing with analytic number theory: first, in $L^2(0, \infty)$, J.-F. Burnol ([arXiv:math/0103058v2](https://arxiv.org/abs/math/0103058v2), Theorem 1.3) defines $B_\lambda$ as the subspace of finite linear combinations of continuous fractional-part dilations $x \mapsto \{\theta / x\}$ with $\lambda \le \theta \le 1$, sets $D_\lambda := \operatorname{dist}(\chi, B_\lambda)$ for the NBB $L^2$ indicator target $\chi = 1_{(0, 1)}$, and proves the asymptotic lower bound

$$
\liminf_{\lambda \to 0^+} D_\lambda\sqrt{\log(1/\lambda)} \;\ge\; \sqrt{\sum_{\operatorname{Re}(\rho)=1/2} \frac{m_\rho^2}{|\rho|^2}}
$$

(where the right-hand sum with $m_\rho^2$ runs over **distinct** critical-line nontrivial zeros $\rho$ of multiplicity $m_\rho$, and the left-hand side diverges to $+\infty$ if the Riemann Hypothesis fails). Note that Burnol's continuous-dilation subspace $B_\lambda$ **is not the same finite problem** as the discrete integer Gram system over $a = 1, \dots, N$; in the case where the Riemann Hypothesis holds and all nontrivial zeros are simple, the sum inside the square root on the right-hand side equals $2 + \gamma - \log(4\pi) \approx 0.04619$, which does not yield an exact equality at arbitrary finite truncations. Second, the fraction $\frac{4}{7}$ is the logarithmic length ratio of a specific Dirichlet-polynomial **mollifier** in critical-line zero-proportion estimates rather than a universal physical tunneling barrier, and [arXiv:1207.6583v3](https://arxiv.org/abs/1207.6583v3) explicitly distinguishes specific finite-scale mollifier bounds from arbitrarily long mollifiers.

Moreover, the finite-dimensional span generated by discrete dilations $\theta = 1/n$ for $1 \le n \le M$ is only a subspace of the continuous space $B_{1/M}$, so the two are not the same finite approximation problem and the continuous-subspace distance $D_{1/M}$ must not be equated with the discrete approximation distance; under the Riemann Hypothesis, simplicity of all nontrivial zeros, and the two-sided zeros convention, $\liminf_{M \to \infty} D_{1/M}^2 \log M \ge 0.046191\dots$, so $0.046191\dots$ is an asymptotic $\liminf$ lower-bound constant for $D_{1/M}^2 \log M$ as $M \to \infty$, not an equality at finite $M$.
:::

Before passing from continuous subspaces to discrete, localized arithmetic approximations, one spatial-side fact is fundamental: **the genuine Nyman–Beurling Gram matrix is dense from the outset**. For any positive integers $a, b \ge 1$, set $f_a(x) := \{1/(ax)\}$, where $\{u\} = u - \lfloor u\rfloor \in [0, 1)$. Since the integrand is pointwise nonnegative on $(0, \infty)$ and $x > 1$ implies $0 < \frac{1}{ax} < 1$ so $f_a(x) = \frac{1}{ax}$, integrating over $(1, \infty)$ alone gives the entrywise strict lower bound

$$
G^{\mathrm{NB}}_{ab} \;=\; \int_0^\infty \left\{\frac{1}{ax}\right\}\left\{\frac{1}{bx}\right\}dx \;\ge\; \int_1^\infty \frac{dx}{ab\,x^2} \;=\; \frac{1}{ab} \;>\; 0.
$$

Because each fractional-part kernel carries a hyperbolic tail $1/(ax)$ at infinity, every pair of basis dilations has positive overlap on $(1, \infty)$: unlike sparse graph matrices whose fill-in arises only after shared hubs are eliminated, $G^{\mathrm{NB}}$ is fully dense before the first pivot, with no structural zeros to preserve. With spatial inner products intrinsically dense, an alternative moves to the Fourier–Weil spectral side: if smooth even wave packets $g$ supported in $[-R, R]$ must read out $+1$ and $-1$ at conjugate mirror nodes $t \pm i\eta$, how much differential leverage survives near the critical-line axis ($\eta \to 0$) or the imaginary symmetry axis ($t \to 0$), and what amplitude and curvature cost follows?

::: {.remark #rem-ch34-signed-orbit-support-budget title="Necessary Support–Amplitude Budget for Resolving Signed Orbits with Compactly Supported Even Functions (Unformalized Application)"}
**Provenance and verification status.** This remark gives an elementary necessary criterion for resolving a single signed spectral orbit with a compactly supported even test function, and the criterion itself follows independently from the elementary derivation below. This application is unformalized: construction names below such as `UnitSupportBurnolPacket` and `OrbitBurnolPacket` refer to candidate constructions that are not frozen, whose support windows are used here as assumptions, while the newly added necessary budget bounds are the responsibility of the written derivation in this remark. For general functions of exponential type, the classical conjugate-point difference bound appears in R. P. Boas, Jr., [DOI:10.7146/math.scand.a-10453](https://doi.org/10.7146/math.scand.a-10453), p. 29, eq. (1.3); the low-height reflection factor $m = \min(1, R|t|)$ forced by evenness, the second-order jet bound, and the connection to signed packet readouts follow directly from the elementary derivation below.

**Dimensionless normalization, transform convention, and necessary bounds.** Under the Riemann $\zeta$ spectral parametrization $\rho = \beta + it$, both the off-line displacement $\eta = \frac{1}{2} - \beta$ and the height $t$ are dimensionless pure numbers, distinct from a dimensional physical imaginary momentum $i\hbar\kappa$ in quantum mechanics. Throughout, we fix dimensionless spectral coordinates $t, \eta \in \mathbb{R}$ satisfying $t\eta \neq 0$ together with a dimensionless dual coordinate $x \in \mathbb{R}$, so the support half-width cap $R > 0$ is dimensionless as well. Let $g : \mathbb{R} \to \mathbb{C}$ be a smooth complex-valued even function satisfying $g(-x) = g(x)$ and $\operatorname{supp} g \subseteq [-R, R]$, and adopt the angular-frequency Fourier–Laplace transform over $\mathbb{R}$ without $2\pi$ in the exponent,

$$
F(z) \;:=\; \int_{-\infty}^{\infty} e^{-izx} g(x)\,dx, \qquad z_+ \;:=\; t + i\eta, \quad z_- \;:=\; t - i\eta.
$$

Define the zero- and second-order $L^1$ seminorms and the separation factor by

$$
\begin{aligned}
L_0 &\;:=\; \int_{-\infty}^{\infty} |g(x)|\,dx, \qquad & L_2 &\;:=\; \int_{-\infty}^{\infty} |g''(x)|\,dx, \\
m &\;:=\; \min(1, R|t|), \qquad & S &\;:=\; m\sinh(R|\eta|) \;>\; 0,
\end{aligned}
$$

where $t\eta \neq 0$ and $R > 0$ imply $m > 0$ and $\sinh(R|\eta|) > 0$, hence $S > 0$. If a unit signed readout holds within tolerance $0 \le \varepsilon < 1$, meaning $|F(z_+) - 1| \le \varepsilon$ and $|F(z_-) + 1| \le \varepsilon$, then

$$
L_0 S \;\ge\; 1 - \varepsilon, \qquad L_2 S \;\ge\; \max\!\bigl(0,\; |t^2 - \eta^2| - (t^2 + \eta^2)\varepsilon\bigr).
$$

At exact unit readout $\varepsilon = 0$, one has $L_0 \ge 1/S$ and $L_2 \ge |t^2 - \eta^2|/S$. Under the fixed dimensionless normalization of $(t, \eta)$ and $x$ above, $L_0$ and $L_2$ share the same dimensionless scale rather than mixing incompatible dimensions, and summing them gives the second-order jet lower bound

$$
L_0 + L_2 \;\ge\; \frac{1 + |t^2 - \eta^2|}{S}.
$$

Because $1/S$ and $(1 - \varepsilon)/S$ come from bounding the kernel pointwise in modulus, they provide only a necessary lower bound on $L_0$, not the exact minimum norm of an interpolation problem.

**Even cosine difference and integration-by-parts derivation.** Compact support $\operatorname{supp} g \subseteq [-R, R]$ ensures absolute convergence of $F(z)$. Substituting $x \mapsto -x$ and using $g(-x) = g(x)$ gives $F(z) = \int_{-R}^{R} \cos(zx)g(x)\,dx$. Expanding $\cos\bigl((t \pm i\eta)x\bigr) = \cos(tx)\cosh(\eta x) \mp i\sin(tx)\sinh(\eta x)$ yields the exact conjugate cosine difference

$$
\cos\bigl((t + i\eta)x\bigr) - \cos\bigl((t - i\eta)x\bigr) \;=\; -2i\sin(tx)\sinh(\eta x).
$$

For $|x| \le R$, $|\sin(tx)| \le \min(1, |tx|) \le \min(1, R|t|) = m$ and $|\sinh(\eta x)| \le \sinh(R|\eta|)$, so the integral triangle inequality gives $|F(z_+) - F(z_-)| \le 2 S L_0$. Conversely, writing $F(z_\pm) = \pm 1 + e_\pm$ with $|e_\pm| \le \varepsilon$, the reverse triangle inequality gives

$$
|F(z_+) - F(z_-)| \;=\; |2 + e_+ - e_-| \;\ge\; 2 - |e_+| - |e_-| \;\ge\; 2(1 - \varepsilon).
$$

Dividing by $2$ proves $L_0 S \ge 1 - \varepsilon$, valid for every integrable even function supported in $[-R, R]$. Next, since $g$ is smooth, even, and supported in $[-R, R]$, its second derivative $g''$ shares all three properties. Integrating $F_{g''}(z) = \int_{-\infty}^{\infty} e^{-izx}g''(x)\,dx$ by parts twice eliminates both boundary stages because $g$ and $g'$ vanish at $\pm R$, leaving $F_{g''}(z) = -z^2 F(z)$. Substituting $F(z_\pm) = \pm 1 + e_\pm$ together with $z_+^2 + z_-^2 = 2(t^2 - \eta^2)$ and $|z_\pm|^2 = t^2 + \eta^2$ yields

$$
\begin{aligned}
|F_{g''}(z_+) - F_{g''}(z_-)| &\;=\; \bigl|-z_+^2 - z_-^2 - z_+^2 e_+ + z_-^2 e_-\bigr| \\
&\;\ge\; 2|t^2 - \eta^2| - 2(t^2 + \eta^2)\varepsilon.
\end{aligned}
$$

Applying the cosine-difference bound to the even function $g''$ gives $|F_{g''}(z_+) - F_{g''}(z_-)| \le 2 S L_2$; combining this with $L_2 \ge 0$ proves the finite-error bound on $L_2 S$, and setting $\varepsilon = 0$ and adding $L_0 \ge 1/S$ recovers the exact-readout bound on $L_0 + L_2$. Since $|z_+^2 - z_-^2| = |z_+ - z_-|\cdot |z_+ + z_-| = 4|t\eta|$ and $S \sim R^2|t\eta|$ when $R|t|, R|\eta|$ are small, both direct collision ($\eta \to 0$) and reflection collision ($t \to 0$) are intrinsic to the evaluation functionals and persist under any change of basis coefficients. In the degenerate cases $\eta = 0$, where $z_+ = z_-$, or $t = 0$, where $z_- = -z_+$ and evenness forces $F(-z) = F(z)$, any nonzero opposite-sign target with relative error below $1$ forces a single complex value into two disjoint error disks.

**Actual Burnol packets, support caps, and repeated squaring.** The candidate construction maps a spectral point $\rho = \beta + it$ to

$$
\gamma \;:=\; \frac{\rho - 1/2}{i} \;=\; t + i\!\left(\frac{1}{2} - \beta\right), \qquad \eta \;=\; \frac{1}{2} - \beta,
$$

so $(z_+, z_-) = (\gamma, \overline{\gamma})$. Within a finite packet `OrbitBurnolPacket` and the unit-support construction in the module `UnitSupportBurnolPacket`, let $q = |\iota|$ be the channel count given by the cardinality of the finite index set $\iota$, and let $N \in \mathbb{N}$ be the shared localization (convolution) depth ($N$ is neither the channel count $q$ nor identified by default with the divisibility-graph vertex cap or graph squaring depth $d$): for each channel $i \in \iota$, `burnolBasis` convolves the $(N + 1)$-fold peak power `convolutionSuccPower` of $P.\mathrm{peak}$ at depth $N$ with the seed $P.\mathrm{killer}(i)$. For each $j \in \iota$, both the $j$-th seed $P.\mathrm{killer}(j)$ prescribed by `killer_values` and the localized synthesis `burnolSynthesis` evaluated on the $j$-th one-hot coefficient vector give exact signed readouts $F(\gamma) = 1, F(\overline{\gamma}) = -1$ ($\varepsilon = 0$) of the same orbit in that packet. Because $S$ is nondecreasing in $R$, any support cap $R$ satisfying $\operatorname{supp} g \subseteq [-R, R]$ applies validly: at the seed stage one only has $\operatorname{supp} P.\mathrm{killer}(j) \subseteq [-1, 1]$, so $R = 1$ is a **seed support cap** rather than an exact support equality; certified second-order jet upper budgets $J_0 \ge L_0, J_2 \ge L_2$ inherit the $R = 1$ bounds, with $1/S$ scaling as $\frac{1}{\min(1, |t|)\,|\eta|}$ as $\eta \to 0$ at fixed $t \neq 0$. At the one-hot `burnolSynthesis` stage, unit-support convolution gives $\operatorname{supp} \subseteq [-(N + 2), N + 2]$, so $R_N = N + 2$ is likewise only a **support cap** rather than an exact support radius. Under $L_0 \le L$, substituting $R_N = N + 2$ shows that exact readout requires $(N + 2)|\eta| \ge \operatorname{arsinh}(1/L)$; for the same exact-readout packet, when its norm upper bound $L$ and support-radius cap $R$ are fixed, $R|\eta| \ge \operatorname{arsinh}(1/L)$ prevents $|\eta|$ from being arbitrarily small, and increasing nominal multiplication layers alone does not cancel this necessary condition. When $N + 1 = 2^k$ is formed by $k$ repeated-squaring steps, $R_N = 2^k + 1$ is again only an available support cap—neither a minimum required support radius nor a refutation of logarithmic multiplication depth or an arithmetic runtime lower bound—showing only that $k$ squaring stages can conceal a $2^k + 1$ support cap.

**Necessary check, signal normalization, and scope boundaries.** Under an amplitude budget $L_0 \le L$ with $L > 0$, such as $L_0 \le 2RA$ from $|g| \le A$ on $[-R, R]$, unit readout forces $R|\eta| \ge \operatorname{arsinh}\!\bigl(\frac{1-\varepsilon}{mL}\bigr) \ge \operatorname{arsinh}\!\bigl(\frac{1-\varepsilon}{L}\bigr)$. Over a certified enclosure $|\eta| \le \eta_{\max}$, the strict inequality $L\sinh(R\eta_{\max}) < 1 - \varepsilon$ excludes readout under that budget: for any $R, L > 0$ and $0 \le \varepsilon < 1$, the generic complex spectral node $t = 1/R$, $\eta = \operatorname{arsinh}((1-\varepsilon)/L)/(2R)$—a generic test node rather than an asserted $\zeta$-zero—gives $m = 1$ and $L\sinh(R\eta) < 1 - \varepsilon$. Satisfying $L\sinh(R\eta_{\max}) \ge 1 - \varepsilon$ passes only a single-orbit necessary check and is not sufficient for single- or multi-node interpolation to exist. For opposite targets $\pm a$ with absolute error at most $e \ge 0$, one has $L_0 S \ge \max(0, |a| - e)$; scaling $g$ by $a$ scales the quadratic Weil functional by $|a|^2$, so reducing $|a|$ shrinks the raw $L^1$ budget only by shrinking signal and tolerated error proportionally. When $a \neq 0$ and $0 \le e < |a|$, setting $\varepsilon := e / |a| \in [0, 1)$ and $B := L / |a|$ gives

$$
L_0 S \;\ge\; \max(0,\; |a| - e), \qquad B S \;\ge\; 1 - \frac{e}{|a|} \;=\; 1 - \varepsilon,
$$

producing the signal-normalized **necessary budget lower bound**

$$
B_{\min} \;:=\; \frac{1 - \varepsilon}{\min(1, R|t|)\sinh(R|\eta|)}.
$$

This quantity is a necessary lower bound on $B$, not an achievable minimum or the exact minimum norm of an interpolation problem. Four boundaries apply throughout: this derivation asserts no actual off-line $\zeta$-zeros, does not prove the Riemann Hypothesis, cannot be inverted to deduce mixed spectral majorant lower bounds from lower bounds on $(L_0, L_2)$, and establishes no unconditional arithmetic or bit-complexity lower bound.
:::

::: {.viz src="arithmetic-schur-lab" preset="budget" height="500"}
**Necessary budget lower-bound surface and excluded region for resolving signed orbits with compactly supported even functions (`budget`).** The 3D $(R, |\eta|, B)$ stage displays the purple necessary budget lower-bound surface $B_{\min} = (1 - \varepsilon) / \bigl(\min(1, R|t|)\sinh(R|\eta|)\bigr)$, the magenta excluded region beneath it, and the amber dot marking the current parameter point. Controls adjust $t$ and relative error $\varepsilon$ while reading out the necessary budget lower bound $B_{\min}$; points in the magenta region violate the necessary condition, whereas lying outside it is necessary rather than sufficient for an interpolating function to exist.
:::

::: {.problem #prob-ch34-signed-orbit-joint-budget title="Joint Node-Certification, Mixed-Majorant, and Bit-Complexity Budget for Unit-Support Burnol Packets (Open Problem)"}
Over a given finite spectral orbit frame, and for the same actual finite packet `OrbitBurnolPacket` produced by the unit-support construction in the module `UnitSupportBurnolPacket` together with its localized synthesis `burnolSynthesis`, establish—or falsify under prescribed resource caps—an explicit computable conditional joint certification: for that same packet, jointly provide interval-certified node enclosures and (direct, reflection, and inter-orbit) separations, target signed readout values, second-order jet upper budgets $(J_0, J_2)$, a full mixed head–tail spectral majorant upper bound, and total bit-cost upper bounds as explicit functions of spectral height $|t|$, off-line distance $|\eta|$, channel count $q = |\iota|$, shared localization depth $N$, and error tolerance $\varepsilon$. Mixed-majorant upper bounds must be derived directly from the synthesis rather than by inverting seminorm lower bounds, and bit cost must be audited directly rather than inferred to be polynomial or Gram-sparse from sparse coefficient synthesis. The Riemann Hypothesis remains open, and no actual off-line $\zeta$-zero is provided or asserted to exist; generic complex spectral nodes may be used to stress-test candidate budgets, but they cannot replace the actual-packet consumer and are insufficient to certify a genuine arithmetic orbit frame. Any proposed unit-target budget $(R, L, \varepsilon)$ with $0 \le \varepsilon < 1$ and $t\eta \neq 0$ admits a direct falsifier: over a certified enclosure $|\eta| \le \eta_{\max}$ of generic spectral test nodes,

$$
L\sinh(R\eta_{\max}) \;<\; 1 - \varepsilon
$$

refutes that budget immediately, whereas avoiding exclusion passes only a single-orbit necessary check and certifies neither multi-node existence nor the Riemann Hypothesis. This problem audits Fourier–Weil spectral-side synthesis, mixed majorants, and bit cost for compactly supported even packets, distinct from the next open problem on spatial-side multi-level pivot compression of the dense fractional-part Gram matrix $G^{\mathrm{NB}}_{ab}$ in $L^2(0, \infty)$.
:::

::: {.problem #prob-ch34-arithmetic-schur-subcubic-question title="Bridge Between Actual Arithmetic Gram Objects and Multilevel Pivot Compression (Open Problem)"}
The divisibility-graph matrix $G = L_D + \frac{1}{4}I$ studied here is only a pedagogical model: **it is not equal to the NBB Gram matrix**, and because $G$ is symmetric strictly diagonally dominant, subcubic solvers for it are already known and must never be misrepresented as progress toward the Riemann Hypothesis. The concrete next step toward actual arithmetic objects is to work in complex $L^2(0, \infty)$ with the NBB target $\chi$ and fractional-part vectors $f_a(x) = \{1/(ax)\}$ ($1 \le a \le N$), compute the finite Gram matrix $G^{\mathrm{NB}}_{ab} = \langle f_a, f_b\rangle$ and inner-product load $b_a = \langle f_a, \chi\rangle$, and specify an explicit multilevel pivot compression or approximate elimination scheme together with its error norm; one then seeks either to construct or to rule out computable certificates guaranteeing that the resulting approximation keeps the original $L^2(0, \infty)$ target residual within $\varepsilon$, accompanied by uniform bounds on condition numbers, memory storage, and total arithmetic cost as functions of $N$, $\varepsilon$, and zero-detection height. Furthermore, **extrapolating from any finite-$N$ certificate to vanishing $L^2$ residual as $N \to \infty$ (the NBB route equivalent to [@conj-riemann-hypothesis])** must be isolated as a separate unproven step. The immediate falsifiable test is to compute actual $G^{\mathrm{NB}}_{ab}$ entries with independent quadrature error bounds and check whether the spectral error of the proposed compression genuinely decreases with level depth; if a counterexample exhibits stalling or growing spectral error, that compression scheme must be revised or abandoned.
:::

The full interactive laboratory below brings together natural-order fill-in, leaf-first elimination, thresholded Schur-complement pruning, self-looped random-walk repeated squaring on the divisibility network, and the 3D necessary budget lower-bound surface for resolving signed orbits with compactly supported even functions on a single stage:

::: {.viz src="arithmetic-schur-lab" height="640"}
**3D interactive laboratory for divisibility-network Schur elimination, repeated squaring, and signed-orbit support budgets (`arithmetic-schur-lab`).** Across the divisibility-network views, the 3D stage renders cyan original divisibility edges and magenta fill-in or multi-step coupling edges along purple axes; in the signed-orbit budget view (`budget`), it renders the purple necessary budget lower-bound surface $B_{\min} = (1 - \varepsilon) / \bigl(\min(1, R|t|)\sinh(R|\eta|)\bigr)$, the magenta excluded region beneath it, and an amber dot at the current parameter point, while in network views the amber marker highlights the active pivot or squaring depth. Controls adjust $N$, elimination order, pruning threshold, and squaring depth to inspect fill-in counts and back-substitution residuals, or adjust $t$ and relative error $\varepsilon$ in `budget` view to read out the necessary budget lower bound $B_{\min}$; entering the magenta region violates the necessary bound, whereas lying outside it is necessary rather than sufficient for an interpolating function to exist.
:::
