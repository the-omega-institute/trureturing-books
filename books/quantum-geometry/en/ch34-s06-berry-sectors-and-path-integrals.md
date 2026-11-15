# 34.6 Berry Spherical-Sector Volume, Same-Point Fiber Lift, Path–Phase Duality, and Feynman Stationary-Phase Selection {#sec-ch34-berry-sector-volume-and-path-integral}

> *"We know Berry phase: in essence this phase should be tied to the volume or surface area of that infinitesimal spherical sector. Why do we arrive at the very same point with different phases? Because the paths differ—path and phase are dual, and this too must be connected to the path integral."*

With deceptive simplicity, this remark locks four pillars of modern quantum physics—**Berry geometric phase**, **same-point history memory on the Hopf fiber**, **Wilson path–phase holonomy duality**, and **Feynman stationary-phase trajectory selection**—onto the curved cap and solid bulk of §34.4's elementary trihedron $\Delta\mathcal{T}_\epsilon$. Standard textbooks often introduce Berry phase as an adiabatic perturbation correction and treat the path integral as a formal sum over an abstract function space. Within zero-background comparison geometry, both are readouts of one and the same geometric ledger: a "point" on the base sphere $S^2$ is merely a memoryless shadow left after bidirectional fairness squaring, whereas the hidden phase fiber suspended above that point records the **magenta spherical cap area $A_{\mathrm{cap}}$ and solid spherical-sector cone volume $V_{\mathrm{sector}}$** swept between rival paths, and uses coiled phase cancellation among off-geodesic detours to select classical trajectories.

## 34.6.1 Cap Area Equals Three Sector Volumes: $\gamma_B = -\frac{1}{2}A_{\mathrm{cap}} = -\frac{3}{2}V_{\mathrm{sector}}$ and 3D Stokes Extension {#sec-ch34-6-1}

Why does the epigraph speak in one breath of **"infinitesimal circular-arc volume or circular-arc surface area"**? Because on the unit comparison sphere $S^2 \subset \mathbb{R}^3$—whose unit radius $R = 1$ is locked by bidirectional fairness squaring $\lVert\mathbf{n}\rVert^2 = \cos^2\theta + \sin^2\theta = 1$—the 2D surface area of any oriented spherical patch $\Sigma_2 \subset S^2$ and the 3D volume of the solid spherical sector cone subtended from the origin $O$ are not independent quantities at all, but **strictly proportional realizations of the very same solid-angle invariant $\Omega(\Sigma_2)$**! Retaining §34.4's right-angled trihedral vertices $\mathbf{B} = \mathbf{e}_2$, $\mathbf{A}(\epsilon) = \sin\epsilon\,\mathbf{e}_1 + \cos\epsilon\,\mathbf{e}_2$, and $\mathbf{C}(\epsilon) = \sin\epsilon\,\mathbf{e}_3 + \cos\epsilon\,\mathbf{e}_2$ ($\epsilon \in (0, \frac{\pi}{2}]$, summing repeated indices $i, j, k \in \{1, 2, 3\}$), we establish this proportionality and its spinor holonomy in three steps:

1. **2D Magenta Spherical Cap Area $A_{\mathrm{cap}}(\Sigma_2) = \Omega(\Sigma_2)$ (Literature result, not formalized in this book)**: On the unit sphere $S^2$, the outward-oriented area 2-form coincides with the solid-angle form $d\Omega = \frac{1}{2}\epsilon_{ijk}\,n^i\,dn^j\wedge dn^k$, so the surface area of $\Sigma_2$ equals its solid angle:

   $$
   A_{\mathrm{cap}}(\Sigma_2) \;=\; \iint_{\Sigma_2} d\Omega \;=\; \iint_{\Sigma_2} \frac{1}{2}\epsilon_{ijk}\,n^i\,dn^j\wedge dn^k \;=\; \Omega(\Sigma_2).
   $$

   For the right-angled cell $\Delta\mathcal{T}_\epsilon$ with magenta cap $\Sigma_2 = \triangle_{\mathrm{sph}}ABC$, Girard's theorem gives

   $$
   A_{\mathrm{cap}}(\epsilon) \;=\; \Omega(\epsilon) \;=\; 2\arctan\!\left(\tan^2\frac{\epsilon}{2}\right) \;=\; \frac{\epsilon^2}{2} + \frac{\epsilon^4}{12} + O(\epsilon^6).
   $$

2. **Exact 3D Solid Spherical-Sector Cone Volume $V_{\mathrm{sector}}(\Sigma_2) = \frac{1}{3}A_{\mathrm{cap}}(\Sigma_2)$ via Stokes' Theorem (Manual derivation)**: Form the solid Euclidean cone from the origin $O$ to $\Sigma_2 \subset S^2$ inside the unit ball $B^3 \subset \mathbb{R}^3$,

   $$
   \mathcal{C}(\Sigma_2) \;=\; \bigl\{\, r\mathbf{n} \in \mathbb{R}^3 \;\big|\; 0 \le r \le 1,\;\mathbf{n} \in \Sigma_2 \,\bigr\} \;\subset\; B^3,
   $$

   and equip $\mathbb{R}^3$ with the radial Euclidean 2-form $\omega_2 = \frac{1}{3!}\epsilon_{ijk}\,x^i\,dx^j\wedge dx^k = \frac{1}{6}\epsilon_{ijk}\,x^i\,dx^j\wedge dx^k$. Since all $3! = 6$ permutations of $(1, 2, 3)$ contribute with the same sign, its exterior derivative is the exact Euclidean volume form $d\omega_2 = \frac{1}{6}\epsilon_{ijk}\,dx^i\wedge dx^j\wedge dx^k = dx^1\wedge dx^2\wedge dx^3 = dV_{\mathbb{R}^3}$. The boundary $\partial\mathcal{C}(\Sigma_2)$ consists of the outward-oriented magenta spherical cap $\Sigma_2$ at $r = 1$ together with the lateral cone walls $[0, 1] \times \partial\Sigma_2$ (a conical skirt over a general boundary curve, or the three flat coordinate sector walls $OAB$, $OBC$, $OCA$ on $\Delta\mathcal{T}_\epsilon$). Along every lateral wall patch $(r, s) \mapsto x(r, s) = r\mathbf{n}(s)$, the position vector $x = r\mathbf{n}$ is parallel to the radial tangent $\partial_r x = \mathbf{n}$, so the antisymmetric contraction $\epsilon_{ijk}x^i\,\partial_r x^j\,\partial_s x^k = r\,\epsilon_{ijk}n^i n^j\dot{n}^k \equiv 0$ vanishes identically! Without any small-angle approximation, 3D Stokes' theorem yields

   $$
   V_{\mathrm{sector}}(\Sigma_2) \;=\; \iiint_{\mathcal{C}(\Sigma_2)} dV_{\mathbb{R}^3} \;=\; \iint_{\Sigma_2} \frac{1}{3!}\epsilon_{ijk}\,n^i\,dn^j\wedge dn^k \;=\; \frac{1}{3}\Omega(\Sigma_2) \;=\; \frac{1}{3}A_{\mathrm{cap}}(\Sigma_2)
   $$

   (scaling for general sphere radius $R$ as $V_{\mathrm{sector}} = \frac{R}{3}A_{\mathrm{cap}} = \frac{1}{3}R^3\Omega$, with unit-norm fairness $R = 1$ fixing the exact factor $\frac{1}{3}$). Contrast this curved **magenta solid spherical-sector cone** $V_{\mathrm{sector}}(\epsilon) = \frac{1}{3}\Omega(\epsilon) = \frac{\epsilon^2}{6} + \frac{\epsilon^4}{36} + O(\epsilon^6)$ with the **cyan flat chord tetrahedron $O\mathbf{A}\mathbf{B}\mathbf{C}$**, whose signed volume is read directly from the imaginary part of the three-point Bargmann trace in [Chapter 10](ch10-gram-geometry-and-order.md) [@thm-qubit-bargmann-bloch] (`triple_bargmann_bloch`, `LEAN ✓`):

   $$
   V_{\mathrm{tetra}}(\epsilon) \;=\; \frac{1}{6}\,\mathbf{A}(\epsilon)\cdot\bigl(\mathbf{B}\times\mathbf{C}(\epsilon)\bigr) \;=\; \frac{1}{6}\sin^2\epsilon \;=\; \frac{2}{3}\operatorname{Im}\operatorname{Tr}\bigl(P(\mathbf{A}(\epsilon))\,P(\mathbf{B})\,P(\mathbf{C}(\epsilon))\bigr) \;=\; \frac{\epsilon^2}{6} - \frac{\epsilon^4}{18} + O(\epsilon^6).
   $$

   The curved sector cone and flat chord tetrahedron agree at leading quadratic order $\frac{\epsilon^2}{6}$ as $\epsilon \to 0^+$, while at every finite step $\epsilon \in (0, \frac{\pi}{2}]$ the bulging magenta cap contributes a strictly positive fourth-order volume excess $V_{\mathrm{sector}}(\epsilon) - V_{\mathrm{tetra}}(\epsilon) = \frac{\epsilon^4}{12} + O(\epsilon^6) > 0$!

3. **Spin-$1$ Tangent Rotation, Spin-$\frac{1}{2}$ Berry Phase, and the Wess–Zumino Distinction (Literature result, not formalized in this book)**: Parallel transport around $\partial\Sigma_2$ on the tangent bundle $TS^2$ rotates tangent vectors by $\Delta\alpha_{\mathrm{vec}} = +\Omega = +A_{\mathrm{cap}} = +3V_{\mathrm{sector}}$ (giving spin-$1$ helicity vector phase $-\Omega = -A_{\mathrm{cap}} = -3V_{\mathrm{sector}}$), whereas lifting to the spin-$\frac{1}{2}$ double cover $\mathrm{Spin}(3) \cong \mathrm{SU}(2) \cong S^3$ (under the spin-up convention of [Chapter 10](ch10-gram-geometry-and-order.md)) locks the elementary Berry phase to minus one-half the cap area—equivalently, minus three-halves the solid sector volume:

   $$
   \gamma_B(\Delta\mathcal{T}_\epsilon) \;=\; -\frac{1}{2}A_{\mathrm{cap}}(\epsilon) \;=\; -\frac{3}{2}V_{\mathrm{sector}}(\epsilon) \;=\; -\frac{1}{2}\Omega(\epsilon).
   $$

   Mathematical precision requires keeping three distinct geometric extensions cleanly separated rather than conflating them: (i) the exact 3D Euclidean cone volume $V_{\mathrm{sector}}(\Sigma_2) = \frac{1}{3}\Omega(\Sigma_2) \subset B^3$ derived above; (ii) the $(0+1)$-dimensional spin-$s$ **Wess–Zumino 2-disk action** $S_{\mathrm{WZ}}[\tilde{\mathbf{n}}] = -s\iint_{D^2}\frac{1}{2}\epsilon_{ijk}\,\tilde{n}^i\,d\tilde{n}^j\wedge d\tilde{n}^k = -s\,\Omega$, needed because the nontrivial first Chern number $|c_1| = 1$ forbids any global nonsingular connection 1-form $\mathcal{A}$ on $S^2$, where choosing the complementary cap shifts $\Omega \mapsto \Omega - 4\pi$ so single-valuedness of $e^{i S_{\mathrm{WZ}}}$ enforces Dirac's quantization $e^{i 4\pi s} = 1 \Longleftrightarrow 2s \in \mathbb{Z}$; and (iii) the $(1+1)$-dimensional $\mathrm{SU}(2)$ **Wess–Zumino–Witten (WZW) 3-ball topological term** $\Gamma_{\mathrm{WZW}}[g] = \frac{k}{24\pi}\iiint_{\mathcal{B}_3}\operatorname{Tr}\bigl[(g^{-1}dg)^3\bigr]$ ($k \in \mathbb{Z}$, surveyed in [@rem-ch34-berry-wzw-wilson-feynman-literature]).

::: {.viz src="berry-sector-path-sandbox" preset="sector-volume" height="520"}
**Cap surface area and solid sector volume: $\gamma_B = -\frac{1}{2}A_{\mathrm{cap}} = -\frac{3}{2}V_{\mathrm{sector}}$.** Drag the amber step handle $\epsilon$: on the unit sphere, the magenta spherical cap area $A_{\mathrm{cap}}(\epsilon) = \Omega(\epsilon)$ and magenta 3D solid spherical-sector cone volume $V_{\mathrm{sector}}(\epsilon) = \frac{1}{3}\Omega(\epsilon)$ remain locked in a strict $3:1$ ratio, bulging at finite $\epsilon$ beyond the cyan flat chord tetrahedron $V_{\mathrm{tetra}}(\epsilon) = \frac{1}{6}\sin^2\epsilon$ (green `LEAN ✓` `triple_bargmann_bloch`); continuous solid-angle holonomy is marked `ARGUED`.
:::

## 34.6.2 Why Arriving at the Same Point Carries Different Phases: Fairness-Squared Base Shadows and the Hopf Fiber History Ledger {#sec-ch34-6-2}

Once $A_{\mathrm{cap}}$ and $V_{\mathrm{sector}}$ are locked together, the epigraph's second question—**"Why do we arrive at the very same point with different phases? Because the paths differ"**—exposes the epistemic split uncovered in [Chapter 31 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion) and [Chapter 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison):

- **A base point $\mathbf{C} \in S^2$ is a memoryless fairness-squared shadow**: Under the bilateral sandwich projection $\mathbf{C} = \psi\mathbf{e}_0\widetilde{\psi}$ (or rank-one density projector $P(\mathbf{C}) = \lvert\psi\rangle\langle\psi\rvert$), reciprocal fairness forces conjugate squaring, folding an entire circle $U(1) \cong S^1$ of relative phase (`EscapePairs` / `diagonal_prime_observables_cannot_recover_relative_phase`) onto a single point of $S^2$. Topologically, this forms the **Hopf principal bundle** $S^1 \hookrightarrow S^3 \xrightarrow{\;\pi\;} S^2$ (literature result, whose 1D squaring covering prototype is anchored in Conjunct 3 of [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] by `no_continuous_global_section` and `circle_double_cover_history_lift`, `LEAN ✓`). Thus $\mathbf{C}$ records only an instantaneous Markovian comparison snapshot stripped of arrival history.
- **Distinct paths climb to different heights along the hidden violet $S^1$ fiber**: Starting from the same lifted spinor $\psi_0 \in \pi^{-1}(\mathbf{A}(\epsilon))$ on $\Delta\mathcal{T}_\epsilon$, compare the two canonical routes to $\mathbf{C}(\epsilon)$:
  1. **Path $\Gamma_1 = \widehat{AC}$ ("orthogonal once")**: the cyan direct great-circle geodesic chord;
  2. **Path $\Gamma_2 = \widehat{AB} + \widehat{BC}$ ("orthogonal twice")**: the two-wall path pivoting by $90^\circ$ at $\mathbf{B}$.

  Under strict horizontal parallel transport ($\langle\psi \mid d\psi\rangle = 0$, zero local self-twisting along the fiber at every step), closing $\Gamma_2$ back to $\mathbf{A}(\epsilon)$ along $\Gamma_1^{-1} = \widehat{CA}$ bounds $\triangle_{\mathrm{sph}}ABC$ and its solid sector cone $\mathcal{C}(\triangle_{\mathrm{sph}}ABC)$. Since the direct geodesic rotor $U_{AC} = U_{CA}^{-1}$ transports the unit tangent bivector via $U_{AC}\hat{\mathbf{I}}_{\mathbf{A}}\widetilde{U}_{AC} = \hat{\mathbf{I}}_{\mathbf{C}}$, left-multiplying §34.4.2's closed-loop holonomy $U_{CA}U_{\Gamma_2} = \exp\bigl(-\frac{1}{2}\Omega(\epsilon)\hat{\mathbf{I}}_{\mathbf{A}}\bigr)$ by $U_{AC}$ proves that both lifted endpoints project to the **exact same base state** $\pi(\psi_{\Gamma_1}) = \pi(\psi_{\Gamma_2}) = \mathbf{C}(\epsilon)$, yet stand separated on the **violet Hopf $S^1$ fiber** above $\mathbf{C}(\epsilon)$ by

  $$
  \psi_{\Gamma_2} \;=\; \exp\!\left(-\frac{1}{2}\Omega(\epsilon)\,\hat{\mathbf{I}}_{\mathbf{C}}\right)\psi_{\Gamma_1} \;=\; \exp\!\left(-\frac{3}{2}V_{\mathrm{sector}}(\epsilon)\,\hat{\mathbf{I}}_{\mathbf{C}}\right)\psi_{\Gamma_1}
  $$

  (recovering $\gamma_B = -\frac{\pi}{4}$ at the octant limit $\epsilon = \frac{\pi}{2}$). **Base points forget where they came from; phases remember the solid sector swept between paths.** A standalone projective measurement at $\mathbf{C}$ sees only $|e^{i\gamma_B}|^2 = 1$, whereas interfering $\Gamma_1$ with $\Gamma_2$ at $\mathbf{C}$ turns that hidden fiber separation directly into an observable fringe shift $\cos\gamma_B(\epsilon)$!

::: {.viz src="berry-sector-path-sandbox" preset="hopf-fiber-lift" height="520"}
**Same-point Hopf fiber lift: one base point $\mathbf{C}$, distinct heights on the violet $S^1$ phase fiber.** The cyan direct geodesic $\Gamma_1 = \widehat{AC}$ and amber two-wall path $\Gamma_2 = \widehat{AB} + \widehat{BC}$ arrive at the very same base point $\mathbf{C} \in S^2$, yet climb to different phase heights on the violet Hopf $S^1$ fiber column on the right, separated by $-\frac{3}{2}V_{\mathrm{sector}}(\epsilon)$ of the magenta sector cone enclosed between them (1D covering history lift anchored by green `LEAN ✓` `circle_double_cover_history_lift` and `no_continuous_global_section`).
:::

Six frozen theorems in `trureturing` unite the three-point oriented volume trace, arbitrary-length discrete Bargmann path products, history-dependent double-cover lifts, and spanning-tree holonomy classification without continuum approximations:

::: {.theorem #thm-ch34-berry-sector-holonomy-and-bargmann-lift title="Three-Point Bargmann Volume Trace, Discrete Rank-One Path Product, Double-Cover History Lift, and Anchored Tree-Loop Phase Classification" lean="D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification"}
Across the frozen qubit-Bargmann, covering-topology, and agency-holonomy modules of `trureturing`, the following five statements hold simultaneously:

1. **Single-Qubit Three-Point Bargmann Bloch Trace** ([`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)): For arbitrary vectors $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{R}^3$ (without requiring unit norm; $P(\mathbf{r}) = \frac{1}{2}(I + \mathbf{r}\cdot\boldsymbol{\sigma})$ is a projector iff $\lVert\mathbf{r}\rVert = 1$),

   $$
   \operatorname{Tr}\bigl(P(\mathbf{a})\,P(\mathbf{b})\,P(\mathbf{c})\bigr) \;=\; \frac{1 + \mathbf{a}\cdot\mathbf{b} + \mathbf{b}\cdot\mathbf{c} + \mathbf{c}\cdot\mathbf{a}}{4} \;+\; i\,\frac{\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c})}{4};
   $$

2. **Discrete Rank-One Chain Bargmann Product** ([`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product)): For every $n \in \mathbb{N}$ and arbitrary vectors $v_0, \dots, v_n \in \mathbb{C}^2$ (without normalization or nonzero assumptions), setting $R_j = v_j v_j^\dagger$ and $\langle u, v\rangle = u^\dagger v$,

   $$
   \operatorname{Tr}(R_0 \cdots R_n) \;=\; \left(\prod_{j=0}^{n-1}\langle v_j, v_{j+1}\rangle\right)\langle v_n, v_0\rangle
   $$

   (with the empty product equal to $1$ at $n = 0$, giving $\operatorname{Tr}(R_0) = \langle v_0, v_0\rangle$);

3. **Circle Double-Cover History Lift and No Continuous Global Section** ([`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift), [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)): Under the squaring covering map $\operatorname{sq} : \operatorname{Circle} \to \operatorname{Circle}$, $z \mapsto z^2$, every continuous path $\gamma : [0, 1] \to \operatorname{Circle}$ with $z_0^2 = \gamma(0)$ admits a unique continuous lift $\widetilde{\gamma} : [0, 1] \to \operatorname{Circle}$ satisfying $\operatorname{sq}\circ\widetilde{\gamma} = \gamma$ and $\widetilde{\gamma}(0) = z_0$; no continuous map $s : \operatorname{Circle} \to \operatorname{Circle}$ satisfies $(s(z))^2 = z$ for all $z \in \operatorname{Circle}$; and the unique lift of the full loop $\gamma_\circ(t) = e^{2\pi i t}$ from $z_0 = 1$ ends at the antipodal fiber sheet $\widetilde{\gamma}_\circ(1) = -1$;

4. **Selected Spanning-Tree Phase Transport** ([`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport)): For arbitrary vertex and edge types $V, E$, endpoints $s, t : E \to V$, a named spanning tree $ht : \operatorname{NamedSpanningTree}\;s\;t\;T$, and root $r \in V$, the tree transport map $\operatorname{rootPhase}\;ht\;r$ on $E \to \operatorname{Circle}$ satisfies $\operatorname{rootPhase}(u, r) = 1$, $\operatorname{rootPhase}(u, t(e)) = u(e)\cdot\operatorname{rootPhase}(u, s(e))$ for every $e \in T$, endpoint gauge covariance $\operatorname{rootPhase}(\operatorname{gauge}(s, t, g, u), a) = g(a)\cdot\operatorname{rootPhase}(u, a)\cdot g(r)^{-1}$, product-topology continuity, pointwise multiplicativity, and $\operatorname{rootPhase}(1, a) = 1$;

5. **Anchored Loop-and-Path Phase Classification** ([`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)): For finite types `[Fintype V] [Fintype E]`, $ht : \operatorname{NamedSpanningTree}\;s\;t\;T$, and anchor set $R \subseteq V$ with $r \in R$, writing $N = \operatorname{range}(\operatorname{coboundary}\;s\;t\;R)$, $n = |V|$, $m = |E|$, $k = |R|$, $c = |\{e : E \mid e \notin T\}| = m + 1 - n$, and $a = |\{x : V \mid x \in R \land x \neq r\}| = k - 1$, two edge phase configurations $u, w : E \to \operatorname{Circle}$ lie in the same anchored gauge orbit ($\exists g \in \operatorname{anchoredGroup}(R),\; \operatorname{gauge}(s, t, g, u) = w$) if and only if their fundamental chord-loop holonomies and anchored root-to-anchor path phases coincide ($\chi(u) = \chi(w)$), inducing compact Hausdorff topological-group isomorphisms

   $$
   \bigl((E \to \operatorname{Circle}) / N\bigr) \;\simeq_{\mathrm{t}*}\; \operatorname{Coordinates}(T, R, r) \;\simeq_{\mathrm{t}*}\; \bigl(\operatorname{Fin}(m + k - n) \to \operatorname{Circle}\bigr).
   $$
:::

::: proof
Conjunct 1 cites Conjunct 1 of [@thm-qubit-bargmann-bloch] ([Chapter 10](ch10-gram-geometry-and-order.md)), expanding the Pauli algebra product and taking the trace to separate pairwise inner products from the scalar triple product. Conjunct 2 cites [@thm-rank-one-chain-trace] ([Chapter 3](ch03-projectors-and-duality.md)), inducting along rank-one outer products via $(u u^\dagger)(w w^\dagger) = \langle u, w\rangle u w^\dagger$ and closing the trace at $\langle v_n, v_0\rangle$. Conjunct 3 cites all three clauses of [@thm-circle-double-cover-history-lift] ([Chapter 5](ch05-complex-phase-and-rotors.md)). Conjuncts 4 and 5 cite [@thm-tree-phase-transport] and [@cor-anchored-phase-classification] ([Chapter 18](ch18-spinors-and-gauge-curvature.md)), quotienting out internal vertex gauge phases along the chosen spanning tree to identify $(E \to \operatorname{Circle})/N$ with the torus of $c = m + 1 - n$ fundamental chord-loop holonomies and $a = k - 1$ anchored open tree-path phases. The full proof is checked by the Lean kernel.
:::

## 34.6.3 Exact Path–Phase Duality: Wilson Holonomy Characters and Gauge-Reconstruction Boundaries {#sec-ch34-6-3}

This elevates the epigraph's third thesis—**"path and phase are dual"**—into an exact functorial pairing. In continuum gauge theory (literature result, not formalized in this book), the **thin-homotopy path groupoid** $\mathcal{P}_1(M)$ of a manifold $M$ (paths modulo orientation-preserving reparameterization and immediate backtracking $\Gamma \circ \Gamma^{-1} \sim \mathrm{id}$) pairs with unitary **Wilson holonomy operators**

$$
W(\Gamma) \;=\; \mathcal{P}\exp\!\left(-i\int_{\Gamma} \mathcal{A}\right)
$$

(reducing in the abelian $U(1)$ case to character pairing between 1-chains and $\operatorname{Circle}$), whose exact discrete graph realization is anchored in Conjuncts 4–5 of [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] by `selected_tree_transport` and `anchored_phase_classification` (`LEAN ✓`):

| Geometric Path Space $\mathcal{P}_1(M)$ / Graph Walks | Dual Phase & Holonomy Space $\operatorname{Circle}$ / $\mathrm{SU}(2)$ | Realization on $\Delta\mathcal{T}_\epsilon$ and Discrete Graphs |
| :--- | :--- | :--- |
| **1. Path concatenation** $\Gamma_2 \circ \Gamma_1$ | **Phase addition / ordered holonomy product** $W(\Gamma_2)\,W(\Gamma_1)$ (abelian $e^{i(\gamma_2 + \gamma_1)}$) | Two-wall walk $\widehat{AB} + \widehat{BC}$ multiplies wall rotors $U_{23}(\epsilon)\,U_{12}(\epsilon)$ and recurses `rootPhase` along tree edges |
| **2. Orientation reversal** $\Gamma^{-1}$ | **Complex conjugation / unitary inversion** $W(\Gamma)^\dagger = W(\Gamma)^{-1}$ (abelian $e^{-i\gamma}$) | Return arc $\widehat{CA} = \widehat{AC}^{-1}$ inverts $U_{CA} = U_{AC}^\dagger$ and conjugates the Bargmann trace $\Delta \mapsto \overline{\Delta}$ |
| **3. Closed-loop boundary** $\partial\Sigma_2 = \Gamma_2 \circ \Gamma_1^{-1}$ | **Enclosed curvature flux & sector volume** $\oint_{\partial\Sigma_2}\mathcal{A} = \iint_{\Sigma_2}\mathcal{F}$ | Closing $\Gamma_2$ against cyan $\Gamma_1$ encloses magenta sector volume $V_{\mathrm{sector}} = \frac{1}{3}\Omega$, locking $-\frac{3}{2}V_{\mathrm{sector}}$ and chord holonomy |
| **4. Simply connected flat domain** ($\mathcal{F} = 0,\; \pi_1(M) = 0$) | **Path-independent pure-gauge tree potential** $e^{i(\phi(\mathbf{C}) - \phi(\mathbf{A}))}$ | On a chordless cyan spanning tree $T$ ($c = m + 1 - n = 0$), open phases depend solely on anchored endpoints |

Two sharp mathematical boundary conditions keep this duality completely rigorous:

1. **Simple connectedness ($\pi_1(M) = 0$) is mandatory for $\mathcal{F} = 0 \implies$ global path independence**: On a multiply connected domain such as the punctured Aharonov–Bohm plane $\mathbb{R}^2 \setminus \{0\}$ ([Chapter 18](ch18-spinors-and-gauge-curvature.md)), curvature vanishes locally everywhere outside the solenoid ($\mathcal{F} = 0$), yet non-contractible loops still carry nontrivial holonomy $e^{iq\Phi_B/\hbar} \neq 1$—mirroring nontrivial fundamental chord cycles $c = m + 1 - n > 0$ wrapping a hole in `anchored_phase_classification`.
2. **Holonomy reconstructs the connection up to gauge equivalence (Literature result)**: By the Mandelstam (1962), Giles (1981), and Barrett (1991) reconstruction theorems, Wilson-loop (and anchored-path) holonomies determine the gauge connection $\mathcal{A}$ **modulo local gauge transformations $g$**, never fixing gauge-redundant internal vertex phases—the exact continuum counterpart of the quotient isomorphism $\bigl((E \to \operatorname{Circle}) / N\bigr) \simeq_{\mathrm{t}*} \operatorname{Coordinates}(T, R, r)$ in Conjunct 5 of [@thm-ch34-berry-sector-holonomy-and-bargmann-lift]!

::: {.viz src="berry-sector-path-sandbox" preset="stokes-wilson-duality" height="520"}
**Path–phase duality and Wilson holonomy reconstruction: local vertex gauge twists leave magenta loop flux invariant.** Compare the path-independent cyan spanning-tree potential `rootPhase` on $T$ against the magenta closed chord-loop holonomy: twisting unanchored vertex phases rotates individual edge pointers while leaving fundamental loop phases and anchored path phases untouched (green `LEAN ✓` `selected_tree_transport` and `anchored_phase_classification`).
:::

## 34.6.4 From Discrete Bargmann Fan Products to the Feynman Path Integral: Cornu Spirals and Stationary-Phase Trajectory Selection {#sec-ch34-6-4}

We can now complete the epigraph's closing bridge—**"and this too must be connected to the path integral"**—across two rigorous stages linking discrete overlaps (`LEAN ✓`) to continuum path summation (`Literature` / `MODEL`):

1. **Stage 1: Discrete $N$-Step Bargmann–Pancharatnam Fan Triangulation and Continuum Limit**:
   Along an $N$-vertex closed chain $\mathbf{n}_0, \mathbf{n}_1, \dots, \mathbf{n}_{N-1} \in S^2$ (or an open path from $\mathbf{A}$ to $\mathbf{C}$ closed back via fixed reference geodesics $\widehat{\mathbf{C}\mathbf{n}_{\mathrm{ref}}} + \widehat{\mathbf{n}_{\mathrm{ref}}\mathbf{A}}$ away from the antipodal cut), Conjunct 2 of [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] (`bargmann_path_product`, `LEAN ✓`) rewrites the cyclic projector trace $\operatorname{Tr}(P_0 P_1 \cdots P_{N-1})$ as the product of adjacent overlaps:

   $$
   \Pi_N \;=\; \operatorname{Tr}(P_0 P_1 \cdots P_{N-1}) \;=\; \prod_{k=0}^{N-1} \langle\psi_k, \psi_{k+1}\rangle \qquad (\psi_N \equiv \psi_0).
   $$

   Geometrically, joining a hub (such as the North Pole) to each step $\widehat{\mathbf{n}_k\mathbf{n}_{k+1}}$ slices the enclosed cap and solid sector into $N$ **violet spherical-sector fan wedges**. As $N \to \infty$ along a piecewise-$C^1$ loop with step lengths $\delta s_k = O(N^{-1})$, the quantum Zeno overlap modulus recovers unit norm $|\Pi_N| = \prod_{k=0}^{N-1}\cos\frac{\delta s_k}{2} = 1 - O(N^{-1}) \to 1$, while the cumulative negative overlap phase $-\sum_{k=0}^{N-1}\arg\langle\psi_k, \psi_{k+1}\rangle$ converges to the continuum spin-$\frac{1}{2}$ Berry phase $-\frac{1}{2}\Omega[\Gamma] = -\frac{3}{2}V_{\mathrm{sector}}[\Gamma]$ (literature result). Inserting overcomplete spin-$s$ coherent-state resolutions $\int_{S^2}\frac{2s+1}{4\pi}\,d\Omega(\mathbf{n})\,\lvert\mathbf{n}\rangle\langle\mathbf{n}\rvert = I$ at each time slice yields the formal continuum spin coherent-state propagator

   $$
   \mathcal{K}(\mathbf{C}, T; \mathbf{A}, 0) \;=\; \int_{\mathbf{n}(0)=\mathbf{A}}^{\mathbf{n}(T)=\mathbf{C}} \mathcal{D}\mathbf{n}(t)\,\exp\!\left(i\,S_{\mathrm{WZ}}[\mathbf{n}] \;-\; \frac{i}{\hbar}\int_0^T H\bigl(\mathbf{n}(t)\bigr)\,dt\right),
   $$

   whose rigorous continuum definition requires Klauder coherent-state time-slicing or spherical Wiener regularization (literature result, not formalized in this book).

::: {.viz src="berry-sector-path-sandbox" preset="pancharatnam-fan" height="520"}
**Discrete $N$-step Bargmann–Pancharatnam fan triangulation: adjacent overlap products converge to the sector-volume Berry phase.** Vary the polygon vertex count $N$: violet fan ribs partition the enclosed sector from a common hub while the cyclic overlap product $\Pi_N = \prod_k \langle\psi_k, \psi_{k+1}\rangle$ (green `LEAN ✓` `bargmann_path_product`) approaches $|\Pi_N| \to 1$ with phase $-\frac{3}{2}V_{\mathrm{sector}}$ (`NUM` / `ARGUED`).
:::

2. **Stage 2: First-Order vs. Second-Order Spherical Variations and Cornu-Spiral Stationary-Phase Selection (connecting back to [Chapter 29 §29.6](ch29-s04-coherence-and-handshake.md#sec-ch29-coherence-handshake-causality))**:
   How does summing phases over competing paths from $\mathbf{A}$ to $\mathbf{C}$ select classical trajectories? Here exact calculus on $S^2$ cleanly separates odd first-order area shifts from even second-order length stationarity (manual derivation + `NUM` + `MODEL`):
   - **One-sided transverse deflection has odd first-order solid angle**: Let $\Gamma_0 = \widehat{AC}$ be a great-circle geodesic of length $2\alpha_0 \in (0, \pi)$ (half-length $\alpha_0 \in (0, \frac{\pi}{2})$), and bow its midpoint transversely by angle $\eta \in (-\frac{\pi}{2}, \frac{\pi}{2})$ to $\mathbf{M}(\eta)$, forming the broken geodesic $\Gamma(\eta) = \widehat{A M(\eta)} + \widehat{M(\eta) C}$. By the spherical solid-angle tangent formula, the signed area between $\Gamma(\eta)$ and $\Gamma_0$ is an **odd** function of $\eta$,

     $$
     \Omega_{\mathrm{bow}}(\eta) \;=\; 2\arctan\!\left(\frac{\sin\alpha_0\sin\eta}{\cos\alpha_0 + \cos\eta}\right) \;=\; 2\tan\frac{\alpha_0}{2}\,\eta + O(\eta^3), \qquad \Omega_{\mathrm{bow}}(-\eta) \;=\; -\Omega_{\mathrm{bow}}(\eta),
     $$

     driving the odd geometric fiber phase shift $\Delta\gamma_B(\eta) = -\frac{1}{2}\Omega_{\mathrm{bow}}(\eta) = -\frac{3}{2}V_{\mathrm{sector,bow}}(\eta)$.
   - **Bilateral mirror cancellation characterizes great-circle geodesics ($\kappa_g = 0$)**: For symmetric mirror fluctuations $\theta_0 \mapsto \theta_0 \pm \eta$ flanking a base curve at colatitude $\theta_0 \in (0, \pi)$ (geodesic curvature $\kappa_g = \cot\theta_0$) across azimuth span $\phi_0$, the identity $\cos(\theta_0 + \eta) + \cos(\theta_0 - \eta) = 2\cos\theta_0\cos\eta$ gives the paired solid-angle sum

     $$
     \Delta\Omega(+\eta) + \Delta\Omega(-\eta) \;=\; 2\phi_0\cos\theta_0\,(1 - \cos\eta),
     $$

     which vanishes identically ($\equiv 0$) **if and only if $\theta_0 = \frac{\pi}{2}$ ($\kappa_g = 0$, a great-circle geodesic)**!
   - **Quadratic arc-length excess and Cornu-spiral phase-locking**: Meanwhile, the broken-geodesic arc-length excess over $\Gamma_0$ is strictly **even and quadratic**,

     $$
     \Delta L(\eta) \;=\; 2\arccos(\cos\alpha_0\cos\eta) - 2\alpha_0 \;=\; \cot\alpha_0\,\eta^2 + O(\eta^4) \;\ge\; 0,
     $$

     with stationary derivative $\Delta L'(0) = 0$! Consequently, for a finite $M$-path quadrature bundle centered at deflection $\eta_0$ with effective wavenumber $k_{\mathrm{eff}} > 0$,

     $$
     A_M(\eta_0) \;=\; \frac{1}{M}\sum_{m=1}^{M} \exp\!\Bigl(i\,k_{\mathrm{eff}}\,\Delta L(\eta_0 + \delta\eta_m)\Bigr),
     $$

     paths flanking the geodesic ($\eta_0 = 0$) share stationary phase $\Phi'(0) = 0$ and add constructively in **cyan** ($\lvert A_M(0)\rvert \approx 1$), whereas paths centered around an off-geodesic detour ($\eta_0 \neq 0$) experience rapid linear phase drift $\Phi'(\eta_0) = 2k_{\mathrm{eff}}\cot\alpha_0\,\eta_0 + O(\eta_0^3) \neq 0$ and coil into a self-canceling **magenta Cornu spiral** ($\lvert A_M(\eta_0)\rvert \ll 1$)! Fairness squaring erased path details from a single point, yet destructive interference across the hidden phase ledger carves classical trajectories straight back out of the quantum sum!

::: {.viz src="berry-sector-path-sandbox" preset="feynman-stationary" height="520"}
**Feynman path bundles and Cornu-spiral stationary-phase selection: cyan phase-locking at $\eta_0 = 0$ vs. magenta spiral cancellation at $\eta_0 \neq 0$.** Drag the amber bundle-center deflection handle $\eta_0$: the lower complex-plane panel sums $M = 41$ neighboring path phasors head-to-tail—aligning constructively in cyan on the geodesic $\eta_0 = 0$ where $\Delta L'(0) = 0$, and coiling into a self-canceling magenta Cornu spiral off-geodesic (`NUM` / `MODEL`).
:::

::: {.example #ex-ch34-sector-volume-hopf-and-cornu-benchmark title="Analytical and Numerical Benchmark of Berry Sector Volume, Polygonal Bargmann Fan Convergence, and 41-Path Cornu Stationary Phase (Manual Derivation and Numerical Check)"}
We assemble reproducible closed-form and numerical benchmarks across all three mechanisms of this section:

1. **Sector Cone vs. Flat Chord Tetrahedron on $\Delta\mathcal{T}_\epsilon$**: Across $\epsilon \in \{15^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\}$, compare the magenta cap area $A_{\mathrm{cap}}(\epsilon) = \Omega(\epsilon) = 2\arctan(\tan^2\frac{\epsilon}{2})$, magenta solid sector volume $V_{\mathrm{sector}}(\epsilon) = \frac{1}{3}\Omega(\epsilon)$, cyan flat chord tetrahedron volume $V_{\mathrm{tetra}}(\epsilon) = \frac{1}{6}\sin^2\epsilon = \frac{2}{3}\operatorname{Im}\Delta$ (`triple_bargmann_bloch` in [@thm-ch34-berry-sector-holonomy-and-bargmann-lift]), curved cap excess $V_{\mathrm{sector}} - V_{\mathrm{tetra}}$, and spinor Berry phase $\gamma_B(\epsilon) = -\frac{1}{2}\Omega(\epsilon) = -\frac{3}{2}V_{\mathrm{sector}}(\epsilon)$:

| Step $\epsilon$ | Cap Area $A_{\mathrm{cap}} = \Omega(\epsilon)$ | Sector Volume $V_{\mathrm{sector}} = \frac{1}{3}\Omega$ | Chord Tetrahedron $V_{\mathrm{tetra}} = \frac{1}{6}\sin^2\epsilon$ | Bulge Excess $V_{\mathrm{sector}} - V_{\mathrm{tetra}}$ | Spinor Berry Phase $\gamma_B = -\frac{3}{2}V_{\mathrm{sector}}$ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **$15^\circ$** | $0.034661\;\mathrm{rad}$ ($1.986^\circ$) | $0.011554$ | $0.011165$ | $0.000389$ | $-0.017331\;\mathrm{rad}$ ($-0.993^\circ$) |
| **$30^\circ$** | $0.143348\;\mathrm{rad}$ ($8.213^\circ$) | $0.047783$ | $0.041667$ | $0.006116$ | $-0.071674\;\mathrm{rad}$ ($-4.107^\circ$) |
| **$45^\circ$** | $0.339837\;\mathrm{rad}$ ($19.471^\circ$) | $0.113279$ | $0.083333$ | $0.029946$ | $-0.169918\;\mathrm{rad}$ ($-9.736^\circ$) |
| **$60^\circ$** | $0.643501\;\mathrm{rad}$ ($36.870^\circ$) | $0.214500$ | $0.125000$ | $0.089500$ | $-0.321751\;\mathrm{rad}$ ($-18.435^\circ$) |
| **$90^\circ$** | $\frac{\pi}{2} \approx 1.570796\;\mathrm{rad}$ ($90.000^\circ$) | $\frac{\pi}{6} \approx 0.523599$ | $\frac{1}{6} \approx 0.166667$ | $0.356932$ | $-\frac{\pi}{4} \approx -0.785398\;\mathrm{rad}$ ($-45.000^\circ$) |

2. **$N$-Polygon Bargmann Fan Convergence on Colatitude $\theta_0 = 60^\circ$**: Around the northern latitude circle $\theta_0 = 60^\circ$ (enclosing cap solid angle $\Omega = 2\pi(1 - \cos 60^\circ) = \pi$ and sector volume $V_{\mathrm{sector}} = \frac{\pi}{3}$), place $N$ equally spaced states $\psi_k = \operatorname{latitude}(\frac{1}{4}, e^{2\pi i k/N})$ at $t = \sin^2 30^\circ = \frac{1}{4}$. Combining [Chapter 10](ch10-gram-geometry-and-order.md) [@cor-latitude-complex-overlap] (`latitude_dot`) with `bargmann_path_product` gives

   $$
   \Pi_N \;=\; \left(\frac{3}{4} + \frac{1}{4}e^{2\pi i/N}\right)^N,
   $$

   yielding exact $|\Pi_3| = \frac{7\sqrt{7}}{64} \approx 0.289379$ ($\gamma_3 = -3\arctan\frac{\sqrt{3}}{5} \approx -57.320^\circ$), exact $|\Pi_4| = \frac{25}{64} = 0.390625$ ($\gamma_4 = -4\arctan\frac{1}{3} \approx -73.740^\circ$), $|\Pi_{12}| \approx 0.733976$ ($\gamma_{12} \approx -88.431^\circ$), and $|\Pi_{36}| \approx 0.902271$ ($\gamma_{36} \approx -89.828^\circ$), converging as $N \to \infty$ to $|\Pi_N| \to 1$ and $\gamma_N \to -\frac{\pi}{2} = -90.000^\circ = -\frac{3}{2}V_{\mathrm{sector}}$.

3. **$41$-Path Cornu Bundle Coherence (`NUM` / `MODEL`)**: For $\alpha_0 = \frac{\pi}{4}$ ($\cot\alpha_0 = 1$), $k_{\mathrm{eff}} = 30$, and $M = 41$ uniformly spaced offsets $\delta\eta_m \in [-0.20, +0.20]$, the bundle coherence drops sharply from $\lvert A_{41}(0.00)\rvert \approx 0.9329$ on the geodesic to $\lvert A_{41}(0.25)\rvert \approx 0.2255$ and $\lvert A_{41}(0.50)\rvert \approx 0.1816$ off-geodesic.
:::

::: {.remark #rem-ch34-berry-wzw-wilson-feynman-literature title="Epistemic Boundaries on Geometric Phase, the Hopf Monopole Bundle, Wess-Zumino Topological Terms, Wilson-Loop Reconstruction, and Coherent-State Path Integrals (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Three epistemic tiers govern this section:

1. **Geometric Phase, Hopf Fiber Bundle, and Wess–Zumino Literature**: Discrete and continuous geometric phases originate in S. Pancharatnam (*Proc. Indian Acad. Sci. A* **44**, 247, 1956), V. Bargmann (*J. Math. Phys.* **5**, 862, 1964), B. Simon (*Phys. Rev. Lett.* **51**, 2167, 1983), and M. V. Berry (*Proc. R. Soc. A* **392**, 45, 1984); the principal circle bundle $S^1 \hookrightarrow S^3 \to S^2$ and topological quantization $2s \in \mathbb{Z}$ go back to H. Hopf (*Math. Ann.* **104**, 637, 1931) and P. A. M. Dirac (*Proc. R. Soc. A* **133**, 60, 1931); and higher-dimensional topological action extensions stem from J. Wess & B. Zumino (*Phys. Lett. B* **37**, 95, 1971) and E. Witten (*Nucl. Phys. B* **223**, 422, 1983);
2. **Wilson-Loop Gauge Reconstruction and Path-Integral Literature**: Connection reconstruction from loop holonomies modulo gauge transformations is established in S. Mandelstam (*Ann. Phys.* **19**, 1, 1962), R. Giles (*Phys. Rev. D* **24**, 2160, 1981), and J. W. Barrett (*Int. J. Theor. Phys.* **30**, 1171, 1991); sum-over-histories amplitude interference originates in R. P. Feynman (*Rev. Mod. Phys.* **20**, 367, 1948), with spin coherent-state time-slicing and Wiener regularization formulated by J. R. Klauder (*Phys. Rev. D* **19**, 2349, 1979);
3. **Kernel-Verified Anchors (`LEAN ✓`) and Book Synthesis (`MODEL`)**: The three-point Bargmann Bloch trace, rank-one chain product, circle double-cover history lift and no-section obstruction, and spanning-tree / anchored-loop phase classification are kernel-verified in [@thm-ch34-berry-sector-holonomy-and-bargmann-lift] (together with [@cor-latitude-complex-overlap]); the 3D Stokes identity $V_{\mathrm{sector}} = \frac{1}{3}A_{\mathrm{cap}}$ and broken-geodesic variations are exact elementary derivations; and unifying fairness-squared base shadows, sector-volume fiber memory, and $41$-path Cornu stationary-phase selection on $\Delta\mathcal{T}_\epsilon$ constitutes this book's `MODEL`.
:::

::: {.remark #rem-ch34-subentropy-gaussian-vs-feynman-loop title="Gaussian Representation of Subentropy, Oscillatory Path Integrals, and Loop Holonomy"}
**Epistemic status**: This remark pairs reused finite-dimensional mathematical facts for subentropy (positive complex Gaussian representation, rectangular Gram invariance $Q(VV^*) = Q(V^*V)$, pure-state $Q = 0$, and pinned `bargmann_path_product`) with hand analysis of series convergence and loop holonomy.

1. **Positive Gaussian representation vs. oscillatory Feynman amplitudes**: For $t > 0$ and any finite-dimensional density operator $\rho \ge 0$ with $\operatorname{Tr}\rho = 1$, the inverse determinant inside $Q(\rho)$ admits the exact finite-dimensional complex Gaussian representation

   $$
   \begin{aligned}
   \det(I + \rho/t)^{-1} &= \int_{\mathbb{C}^d} \frac{d^{2d}z}{\pi^d}\,e^{-z^\dagger(I + \rho/t)z} \\
   &= \mathbb{E}_{z \sim \mathrm{CN}(0, I)}\bigl[e^{-z^\dagger\rho z / t}\bigr].
   \end{aligned}
   $$

   Although this expresses the spectral kernel as an auxiliary partition expectation, it is a positive Gaussian integral on $\mathbb{C}^d$ indexed by the spectral parameter $t$; it contains no time-sliced Hamiltonian coupling and cannot serve as an oscillatory real-time amplitude weight $e^{iS/\hbar}\mathcal{D}x$. Separately, for an ensemble $\rho = \sum_a p_a |\psi_a\rangle\langle\psi_a|$ with weighted Gram matrix $G_{ab} = \sqrt{p_a p_b}\langle\psi_a|\psi_b\rangle$, rectangular Gram invariance gives $Q(\rho) = Q(G)$, while $\operatorname{Tr}\rho^k = \operatorname{Tr}G^k$ expands into Bargmann products around closed state-index loops; however, $\ln\det(I + sG) = \sum_{k\ge 1}\frac{(-1)^{k+1}s^k}{k}\operatorname{Tr}G^k$ converges absolutely on the sufficient open domain $|s|\lVert G\rVert < 1$ (boundary cases with $|s|\lVert G\rVert = 1$ can still converge, e.g., $G=[1], s=1$), and without further control it cannot be substituted and integrated term-by-term over the entire $t > 0$ half-axis.
2. **Curvature–area holonomy of smooth loops vs. vanishing squared-step sum**: Subdividing a smooth latitude circle at colatitude $\theta_0$ into $N$ equal steps gives $\beta_j = O(N^{-1})$, so the local squared-step sum $\sum_{j=1}^N \beta_j^2 = O(N^{-1}) \to 0$ (and $|\Pi_N| \to 1$) while the closed-loop geometric phase converges to $\gamma = -\pi(1 - \cos\theta_0)$. This nonzero holonomy depends continuously on the enclosed cap area (solid angle) as a curvature–area holonomy rather than a topological invariant; so long as global evolution stays pure and unentangled with records, $Q = 0$ throughout. Nonzero $Q$ arises instead from tracing out distinguishing history records, as shown next.
:::

::: {.example #ex-ch34-complex-action-history-subentropy-erasure title="Complex-Action Two-History Model, Record Gram Matrix, and Reduced-History Subentropy"}
**Epistemic status**: This is a theoretical `MODEL` and hand calculation linking tunneling suppression, temporal double-slit interference, and marker erasure in [Chapter 37 §37.2](ch37-s02-dream-quantum-erasure.md) (reusing pure-state $Q = 0$ and qubit $q(r)$; not pinned as a new Lean theorem).

Under a semiclassical two-history ansatz, let two orthogonal early and late output modes $|1\rangle, |2\rangle$ ($\langle 1|2\rangle = 0$) carry complex-action amplitudes

$$
a_j = C_j\exp\!\left(\frac{i\Phi_j - K_j}{\hbar}\right) \qquad (j = 1, 2),
$$

where $K_j \ge 0$ sets exponential suppression and $\Phi_j$ sets phase accumulation. Let $N = |a_1|^2 + |a_2|^2 > 0$ be the conditional output weight (throughput), $p = |a_1|^2/N \in (0, 1)$ the early-history weight, and $\phi = \arg(a_1^* a_2)$ the consistent relative phase. Coupling the two histories to normalized record states $|e_1\rangle, |e_2\rangle$ with overlap $g = \langle e_2|e_1\rangle$ and $v = |g| \in [0, 1]$ keeps the global state pure,

$$
|\Psi\rangle = \sqrt{p}\,|1\rangle|e_1\rangle + e^{i\phi}\sqrt{1-p}\,|2\rangle|e_2\rangle,
$$

with $Q(|\Psi\rangle\langle\Psi|) = 0$. Tracing out the records yields the reduced history density matrix

$$
\rho_{\mathrm{hist}} = \operatorname{Tr}_E(|\Psi\rangle\langle\Psi|) = \begin{pmatrix} p & \sqrt{p(1-p)}\,e^{-i\phi}g \\ \sqrt{p(1-p)}\,e^{i\phi}\overline{g} & 1-p \end{pmatrix},
$$

whose determinant and squared Bloch radius are

$$
\begin{aligned}
\delta &= \det\rho_{\mathrm{hist}} = p(1-p)(1 - v^2), \\
r^2 &= (2p - 1)^2 + 4p(1-p)v^2,
\end{aligned}
$$

giving exact reduced-history subentropy $Q(\rho_{\mathrm{hist}}) = q(r)$. When two gates separated by $\Delta t = t_2 - t_1$ share identical spectral envelopes $S_0(E)$ and relative phase $E\Delta t/\hbar + \alpha(E)$, the frequency-resolved spectrum exhibits cosine fringes

$$
\begin{aligned}
I(E) &\propto S_0(E)\Bigl[1 + \mathcal{V}\cos\!\left(\frac{E\Delta t}{\hbar} + \alpha(E)\right)\Bigr], \\
\mathcal{V} &= 2\sqrt{p(1-p)}\,v.
\end{aligned}
$$

Four structural consequences follow directly:

1. **Fringe spacing and perfect dark fringes**: When the extra phase $\alpha$ has no $E$-dependence, the interference phase factor has exact period $\Delta E = h/\Delta t$, and when $\alpha(E)$ varies negligibly over one fringe, the fringe spacing is approximately $h/\Delta t$ (constant $\alpha$ is sufficient rather than necessary, since a periodic $\alpha(E)$ can still preserve that fundamental period). **Perfect dark fringes** ($\mathcal{V} = 1$, vanishing minima) occur **only** when the coherent amplitudes are equal ($p = \frac{1}{2}$, $|a_1| = |a_2|$) and record coherence is complete ($v = 1$).
2. **Weight imbalance, visibility, and conditional throughput**: Since $r^2 = (2p - 1)^2 + \mathcal{V}^2$, the relation $Q(\rho_{\mathrm{hist}}) = q(\mathcal{V})$ holds **only** at balanced weight $p = \frac{1}{2}$ (where $r = v = \mathcal{V}$; writing $\theta = \arccos|g| \in [0, \frac{\pi}{2}]$ gives $\delta = \frac{1}{4}\sin^2\theta$, and applying the [near-pure qubit subentropy bound in §34.4](ch34-s04-infinitesimal-trihedron.md#thm-ch34-qubit-subentropy-near-pure) yields by hand $Q(\rho_{\mathrm{hist}}) = \frac{\theta^2}{4} + O(\theta^4|\ln\theta|)$ as $\theta \to 0$, while the record-determinant formula and physical mapping remain unformalized model derivations). For imbalanced weights ($p \neq \frac{1}{2}$), measuring visibility $\mathcal{V}$ alone cannot determine $Q(\rho_{\mathrm{hist}})$. Moreover, record overlap $v$ and conditional throughput $N$ (or transmission $T$) are distinct quantities.
3. **Frequency-domain interference of time-disjoint pulses**: Two pulses with disjoint temporal support (such as $\psi(t) = f(t-t_1) + e^{i\alpha}f(t-t_2)$) interfere in energy readout without spatially catching up, because the spectrometer superposes their Fourier amplitudes at each energy $E$.
4. **Post-transmission marking preserves total $T$**: Applying an isometric which-time marker *after* barrier transmission (see [§37.2](ch37-s02-dream-quantum-erasure.md)) can drive $v \to 0$ to erase spectral fringes and raise $Q(\rho_{\mathrm{hist}})$ while strictly preserving total transmission $T$. Conversely, placing a detector *inside* the barrier requires specifying its coupling Hamiltonian and backreaction; there is no universal theorem forcing $T$ and fringes to collapse simultaneously.
:::

Across §§34.1–34.6, orthogonality blind spots inverted the observer's axis, the "two-begets-three" bootstrap opened the elementary curved cell $\Delta\mathcal{T}_\epsilon$, and its magenta spherical-sector cone volume $V_{\mathrm{sector}} = \frac{1}{3}A_{\mathrm{cap}}$ recorded arrival histories along the hidden Hopf fiber to select classical geodesics via Cornu interference. Yet press just half a step further and the entire classical narrative undergoes a radical **ontological inversion**: in §34.6 we still spoke *as though* the curved surface and solid bulk of $\Delta\mathcal{T}_\epsilon$ sat there beforehand as a ready-made container across which paths subsequently traveled to accumulate Berry phases. If infinitely many comparison paths carrying infinitely many phase integrals converge onto *every* point of $\Delta\mathcal{T}_\epsilon$, why is the universe not drowned in uniform phase noise—and what is "volume" itself once the container-first premise is turned upside down? Explore all five cards of the `BERRY//PATH` interactive laboratory below before turning to §34.7, where volume is revealed not as a pre-existing stage for paths, but as the surviving standing-wave nodal locus where omnidirectional phase integrals fail to cancel out:

::: {.viz src="berry-sector-path-sandbox" height="640"}
**Berry sector volume, Hopf fiber lift, and Feynman stationary-phase selection: the full interactive lab (`BERRY//PATH`).** Switch freely among Sector Volume, Hopf Fiber Lift, Stokes–Wilson Duality, Pancharatnam Fan, and Feynman Stationary while dragging the amber step handle $\epsilon$, polygon count $N$, and bundle deflection $\eta_0$ to compare the magenta spherical cap $A_{\mathrm{cap}}$ and solid sector cone $V_{\mathrm{sector}} = \Omega/3$, cyan flat chord tetrahedron and direct geodesic, violet Hopf $S^1$ fiber column, and lower Cornu phasor spiral; green `LEAN ✓` badges mark the six frozen kernel theorems.
:::

---
