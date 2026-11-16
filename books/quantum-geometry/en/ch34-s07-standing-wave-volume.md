# 34.7 Phase-Integral Standing Waves as Emergent Volume: Multi-Phase Points, Circle Phase-Density Integrals, and Uncancelled Standing-Wave Nodes {#sec-ch34-standing-wave-volume-emergence}

> *"A corollary of Berry phase is that at any point on the infinitesimal spherical sector, each distinct path corresponds to a phase—the fundamental essence of a path is a phase integral. Volume is merely the standing-wave points where phase integrals fail to cancel out, because infinitely many paths with infinitely many phase integrals converge onto a single point."*

Following directly on the heels of Berry spherical-sector holonomy, these two sentences invert the causal order among points, paths, and spatial volume from top to bottom. In §34.6, to bridge smoothly from textbook intuition, we still leaned on a transitional scaffold: "first the elementary trihedron $\Delta\mathcal{T}_\epsilon$ possesses cap area and solid sector volume, and then distinct paths traversing it pick up distinct Berry phases." The epigraph above kicks away that final container-first crutch in three linked ontological steps (`MODEL`): first, a "point" on $\Delta\mathcal{T}_\epsilon$ is merely a memoryless quotient shell onto which infinitely many arrival paths deposit distinct phases; second, stripped of extrinsic spatial coordinates, a "path" *is* in its fundamental essence nothing other than a **phase integral**; and third—the decisive causal reversal—**volume is not a pre-existing solid arena through which paths travel; rather, at generic locations infinitely many incoming phase integrals mutually annihilate into zero-volume void, and what we experience as spatial volume consists solely of the surviving phase-locked standing-wave nodes that escape total cancellation!**

## 34.7.1 One Point, Infinitely Many Phases: Base Points as Quotient Shells and Paths as Phase Integrals {#sec-ch34-7-1}

Why does everyday geometric intuition insist that "points come first as tiny solid pebbles, and piling up points builds lines, surfaces, and volumes"? Because static visual perception mistakes the post-projection endpoint for a self-subsistent object. On the curved comparison cell $\Delta\mathcal{T}_\epsilon \subset S^2$, as revealed by the Hopf bundle projection $S^1 \hookrightarrow S^3 \xrightarrow{\;\pi\;} S^2$ in §34.6.2 (or the rank-one density projector $P(x) = \lvert\psi_x\rangle\langle\psi_x\rvert$), a base label $x \in \Delta\mathcal{T}_\epsilon$ is merely an **empty quotient-equivalence shell** left behind after bidirectional fairness squaring folds away the entire $U(1)$ phase fiber. Under the zero-background Axiom of Comparison $\mathcal{A}_0$ ([Chapter 32 §32.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)), no base state floats in isolation: $x$ is addressed only from a reference anchor $x_0$ along some comparison chain $\Gamma : x_0 = v_0 \to v_1 \to \dots \to v_K = x$ (or its piecewise-smooth continuum limit).

Once external Euclidean coordinate rulers are removed, what operational content does a "path" $\Gamma$ from $x_0$ to $x$ actually carry? Along a discrete $K$-step comparison chain, each step contributes its Pancharatnam overlap factor $\langle\psi_{k+1}\mid\psi_k\rangle$; relative to a chosen endpoint reference section, the sole intrinsic datum deposited at $x$ is the cumulative overlap argument—converging as $K \to \infty$ to the line integral of the Berry connection 1-form $\mathcal{A} = i\langle\psi\mid d\psi\rangle$ (or the total geometric-plus-dynamical action 1-form) along $\Gamma$ (literature result + `MODEL`):

$$
\phi(\Gamma \to x) \;=\; \arg\prod_{k=0}^{K-1}\langle\psi_{k+1}\mid\psi_k\rangle \;\xrightarrow{\;K \to \infty\;}\; \int_{\Gamma \to x} \mathcal{A}.
$$

Gauge dependence and gauge invariance separate here with surgical precision: whereas the open-path reading $\phi(\Gamma \to x)$ depends on the reference fiber frames chosen at $x_0$ and $x$ (such as the canonical spanning-tree reference `rootPhase`), the relative phase between **any two paths $\Gamma_1, \Gamma_2 : x_0 \to x$ converging on the very same point $x$** immediately closes into the loop holonomy $\phi(\Gamma_1 \to x) - \phi(\Gamma_2 \to x) = \gamma_B(\Gamma_1 \circ \Gamma_2^{-1}) = -\frac{1}{2}\Omega(\Gamma_1 \circ \Gamma_2^{-1}) = -\frac{3}{2}V_{\mathrm{sector}}(\Gamma_1 \circ \Gamma_2^{-1})$, completely independent of local gauge choices! Consequently, an arbitrary point $x \in \Delta\mathcal{T}_\epsilon$ never carries a single phase value, but hosts an **omnidirectional arrival phase bundle**

$$
\mathcal{F}(x) \;=\; \bigl\{\,\phi(\Gamma \to x) \in \mathbb{R}/2\pi\mathbb{Z} \;\big|\; \Gamma : x_0 \to x\,\bigr\}.
$$

Stripped of its visual trajectory husk, a "path" is in essence a **phase-integral functional** $\Gamma \mapsto e^{i\Phi[\Gamma]}$ mapping relational chains into the unit circle (`MODEL`).

::: {.viz src="standing-wave-volume-sandbox" preset="multi-phase-point" height="520"}
**One point, many phases: base point $x$ is an empty quotient shell while each incoming path deposits its own phase integral.** Drag the amber probe point $x$ across $\Delta\mathcal{T}_\epsilon$: distinct spherical routes from anchor $x_0$ into the same base point $x$ sweep different spherical-sector solid angles and populate a spread of Pancharatnam–Berry arrival phases $\phi(\Gamma_m \to x)$ around the violet $S^1$ phase wheel on the right (anchored by green `LEAN ✓` `selected_tree_transport` and `anchored_phase_classification`).
:::

Before pushing this omnidirectional phase bundle to its standing-wave interference limit, we unite **seven frozen kernel theorems** in `trureturing`—spanning tree-and-chord holonomy classification, Bargmann cyclic traces, irrational-rotation Haar cancellation, finite-group annihilator sieves, and phase-locked real overlap reduction—as the formal anchor of this section:

::: {.theorem #thm-ch34-phase-cancellation-and-standing-sieve title="Multi-Path Tree-Chord Holonomy, Bargmann Closed Volume Trace, Irrational-Rotation Haar Cancellation, Annihilator Standing-Wave Sieve, and Phase-Locked Real Overlap" lean="D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar D5/S3/Fourier/FinitePoisson.sum_annihilator_character D5/S3/QuantumStates/PhaseLockedOverlap.phase_locked_overlap_is_rotated_real"}
Across the frozen agency-holonomy, qubit-Bargmann, continuous-phase-averaging, finite-Poisson-duality, and phase-locked-overlap modules of `trureturing`, the following seven exact statements hold simultaneously:

1. **Reference Phase Transport Along a Selected Spanning Tree** ([`selected_tree_transport`](lean:D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport)): For arbitrary vertex and edge types $V, E$, endpoint maps $s, t : E \to V$, a named spanning tree $ht : \operatorname{NamedSpanningTree}\;s\;t\;T$, and root vertex $r \in V$, the tree transport map $\operatorname{rootPhase}\;ht\;r$ satisfies $\operatorname{rootPhase}(u, r) = 1$, tree-edge recursion $\operatorname{rootPhase}(u, t(e)) = u(e)\cdot\operatorname{rootPhase}(u, s(e))$ for every $e \in T$, vertex gauge covariance $\operatorname{rootPhase}(\operatorname{gauge}(s, t, g, u), a) = g(a)\cdot\operatorname{rootPhase}(u, a)\cdot g(r)^{-1}$, product-topology continuity, pointwise multiplicativity $\operatorname{rootPhase}(u \cdot w, a) = \operatorname{rootPhase}(u, a)\cdot\operatorname{rootPhase}(w, a)$, and $\operatorname{rootPhase}(1, a) = 1$;

2. **Complete Quotient Classification of Multi-Path Chord Holonomies and Anchored Path Phases** ([`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)): For finite types `[Fintype V] [Fintype E]`, $ht : \operatorname{NamedSpanningTree}\;s\;t\;T$, and anchor set $R \subseteq V$ with $r \in R$, setting $N = \operatorname{range}(\operatorname{coboundary}\;s\;t\;R)$, $n = \lvert V\rvert$, $m = \lvert E\rvert$, $k = \lvert R\rvert$, fundamental chord-cycle count $c = \lvert\{e : E \mid e \notin T\}\rvert = m + 1 - n$, and non-root anchor count $a = \lvert\{x : V \mid x \in R \land x \neq r\}\rvert = k - 1$, two edge phase configurations $u, w : E \to \operatorname{Circle}$ lie in the same anchored gauge orbit if and only if all $c$ fundamental chord-loop holonomies and $a$ root-to-anchor path phases coincide ($\chi(u) = \chi(w)$), inducing compact Hausdorff topological-group isomorphisms

   $$
   \bigl((E \to \operatorname{Circle}) / N\bigr) \;\simeq_{\mathrm{t}*}\; \operatorname{Coordinates}(T, R, r) \;\simeq_{\mathrm{t}*}\; \bigl(\operatorname{Fin}(m + k - n) \to \operatorname{Circle}\bigr);
   $$

3. **Discrete Rank-One Chain Closed Bargmann Path Product** ([`bargmann_path_product`](lean:D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product)): For every $n \in \mathbb{N}$ and arbitrary two-component complex vectors $\Psi : \operatorname{Fin}(n+1) \to \operatorname{Fin} 2 \to \mathbb{C}$ (writing $v_j = \Psi(j)$, $R_j = v_j v_j^\dagger$, and $\langle u, v\rangle = u^\dagger v$ without normalization or nonzero assumptions),

   $$
   \operatorname{bargmann}(\Psi) \;=\; \operatorname{Tr}(R_0 \cdots R_n) \;=\; \left(\prod_{j=0}^{n-1}\langle v_j, v_{j+1}\rangle\right)\langle v_n, v_0\rangle;
   $$

4. **Single-Qubit Three-Point Bargmann Bloch Trace and Signed Volume Decomposition** ([`triple_bargmann_bloch`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch)): For arbitrary vectors $\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3 \in \mathbb{R}^3$ (without requiring unit norm; $P(\mathbf{r}) = \frac{1}{2}(I + \mathbf{r}\cdot\boldsymbol{\sigma})$),

   $$
   \operatorname{tripleBargmann}(\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3) \;=\; \operatorname{Tr}\bigl(P(\mathbf{r}_1)\,P(\mathbf{r}_2)\,P(\mathbf{r}_3)\bigr) \;=\; \frac{1 + \mathbf{r}_1\cdot\mathbf{r}_2 + \mathbf{r}_2\cdot\mathbf{r}_3 + \mathbf{r}_3\cdot\mathbf{r}_1}{4} \;+\; i\,\frac{\mathbf{r}_1\cdot(\mathbf{r}_2 \times \mathbf{r}_3)}{4};
   $$

5. **Haar-Integral Convergence of Irrational-Step Circle Orbit Averages** ([`continuous_average_tendsto_haar`](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar)): For every irrational step $\alpha \in \mathbb{R}$ (`Irrational α`), every initial phase $\rho \in \mathbb{R}$, and every continuous observable $f : \operatorname{AddCircle}(1 : \mathbb{R}) \to \mathbb{C}$ (`Continuous f` on $\mathbb{R}/\mathbb{Z}$), the $N$-step Cesàro orbit averages converge as $N \to \infty$ to the normalized Haar integral (`AddCircle.haarAddCircle`):

   $$
   \lim_{N \to \infty} \frac{1}{(N : \mathbb{C})} \sum_{i=0}^{N-1} f\bigl((\rho + i\alpha : \operatorname{AddCircle}(1 : \mathbb{R}))\bigr) \;=\; \int_{\operatorname{AddCircle}(1 : \mathbb{R})} f(x)\,d\mu_{\mathrm{Haar}}(x);
   $$

6. **Finite-Group Annihilator Character Cancellation and Standing-Wave Sieve** ([`sum_annihilator_character`](lean:D5/S3/Fourier/FinitePoisson.sum_annihilator_character)): For any nonzero modulus $m \in \mathbb{N}$ (`[NeZero m]`), any additive subgroup $H \le \operatorname{ZMod} m$, and any point $x \in \operatorname{ZMod} m$, with standard additive character $\operatorname{character}(k, x) = \operatorname{stdAddChar}(k \cdot x)$ and explicit annihilator $\operatorname{annihilator}(H) = \{k \in \operatorname{ZMod} m \mid \forall h \in H,\; \operatorname{character}(k, h) = 1\}$, summing across dual annihilator modes cancels identically outside $H$ and survives constructively on $H$:

   $$
   \sum_{k \in \operatorname{annihilator}(H)} \operatorname{character}(k.1, x) \;=\;
   \begin{cases}
   \bigl(\lvert\operatorname{annihilator}(H)\rvert : \mathbb{C}\bigr), & x \in H, \\
   0, & x \notin H;
   \end{cases}
   $$

7. **Rotated-Real Factorization of Phase-Locked Complex Overlaps** ([`phase_locked_overlap_is_rotated_real`](lean:D5/S3/QuantumStates/PhaseLockedOverlap.phase_locked_overlap_is_rotated_real)): For any complex numbers $\mathrm{phase}, \mathrm{overlap} \in \mathbb{C}$ satisfying unit modulus $\lVert\mathrm{phase}\rVert = 1$ and the phase-locking conjugation identity $\overline{\mathrm{overlap}} = (\mathrm{phase}^{-1})^2 \cdot \mathrm{overlap}$, there exists a real amplitude $r \in \mathbb{R}$ (given explicitly by $r = \operatorname{Re}(\mathrm{phase}^{-1}\cdot\mathrm{overlap})$) such that

   $$
   \mathrm{overlap} \;=\; \mathrm{phase} \cdot r.
   $$
:::

::: proof
Conjuncts 1–4 combine the spanning-tree transport, anchored loop classification, and single-qubit Bargmann chain/triple-trace identities verified in §34.6 [@thm-ch34-berry-sector-holonomy-and-bargmann-lift]: the spanning tree $T$ supplies a reference arrival phase `rootPhase` at each vertex while every non-tree chord $e \notin T$ provides a competing arrival route whose closed-loop holonomy against $T$ is gauge-invariant and pairs via `bargmann_path_product` and `triple_bargmann_bloch` with the signed chord-tetrahedron volume $\frac{1}{6}\,\mathbf{r}_1\cdot(\mathbf{r}_2\times\mathbf{r}_3)$. Conjunct 5 cites [@lem-irrational-rotation-equidistribution] ([Chapter 24](ch24-cosine-fixed-points-and-self-reference.md)): irrationality bounds geometric sums on every nonzero Fourier mode $q \neq 0$ so their $O(N^{-1})$ orbit averages vanish like their Haar integrals, and $1$-Lipschitz equicontinuity together with trigonometric density extends convergence to all continuous functions. Conjunct 6 cites [@prop-finite-character-cancellation] ([Chapter 15](ch15-grover-qft-and-period-finding.md)) and Conjunct 2 of [@thm-ch36-quotient-annihilator-and-factorization] ([Chapter 36](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)), identifying `annihilator H` via `annihilatorEquivQuotient H` with the character group of $(\operatorname{ZMod} m)/H$ so finite character orthogonality forces exact cancellation $0$ off $H$ and constructive reinforcement $\lvert\operatorname{annihilator}(H)\rvert$ on $H$. Conjunct 7 cites [@prop-phase-locked-overlap] ([Chapter 5](ch05-complex-phase-and-rotors.md)): $\lVert\mathrm{phase}\rVert = 1$ implies $\overline{\mathrm{phase}^{-1}} = \mathrm{phase}$, making $w = \mathrm{phase}^{-1}\cdot\mathrm{overlap}$ self-conjugate ($\overline{w} = w$) and hence real ($w = r \in \mathbb{R}$), yielding $\mathrm{overlap} = \mathrm{phase}\cdot r$. The full proof is checked by the Lean kernel.
:::

## 34.7.2 Stripping the Scaffold off Path Integrals: Circle Phase-Density Pushforward and the Closed-Loop Berry Cosine Equation {#sec-ch34-7-2}

Equipped with these seven kernel anchors, we can strip away the intimidating infinite-dimensional clothing of the path integral and expose its one-dimensional circle geometry (manual derivation + `MODEL`).

Why does a formal path sum $\Psi(x) = \int_{\Gamma \to x} \mathcal{D}\Gamma\,e^{i\Phi[\Gamma]}$ look as if nature has to track infinitely many spatial curves one by one? Only because our notation still indexes each term by its full spatial trajectory $\Gamma$! Once we take seriously the epigraph's statement that **"the fundamental essence of a path is a phase integral,"** the sole payload any trajectory $\Gamma \to x$ delivers to the interference sum at $x$ is its modulo-$2\pi$ **arrival phase angle** $\Phi[\Gamma] \bmod 2\pi \in [0, 2\pi) \cong S^1$—two geometrically distinct detours that deposit the same phase modulo $2\pi$ enter the superposition with the exact same unit phasor $e^{i\phi}$.

Given any regularized ensemble of incoming paths $\{\Gamma \to x\}$ with normalized weight $\int_{\Gamma \to x}\mathcal{D}\Gamma = 1$ (or a finite $M$-path bundle $\frac{1}{M}\sum_{m=0}^{M-1}$), pushing the path measure forward along the phase map $\Phi : \{\Gamma \to x\} \to S^1$ defines the **local arrival phase-density distribution** on the unit circle:

$$
\rho(x, \phi) \;=\; \int_{\Gamma \to x} \mathcal{D}\Gamma\,\delta_{\bmod 2\pi}\!\bigl(\phi - \Phi[\Gamma]\bigr), \qquad \int_0^{2\pi} \rho(x, \phi)\,d\phi \;=\; 1
$$

(with $\delta_{\bmod 2\pi}$ the $2\pi$-periodic Dirac comb on $S^1$). At once, summing over an infinite-dimensional path space collapses without remainder into the **first Fourier moment** on a single one-dimensional circle (alongside its discrete $M$-ray quadrature):

$$
\Psi(x) \;=\; \int_{\Gamma \to x} \mathcal{D}\Gamma\,e^{i\Phi[\Gamma]} \;=\; \int_0^{2\pi} \rho(x, \phi)\,e^{i\phi}\,d\phi, \qquad \Psi_M(x) \;=\; \frac{1}{M}\sum_{m=0}^{M-1} e^{i\phi_m(x)}.
$$

Geometrically, the total path-integral amplitude $\Psi(x) \in \mathbb{C}$ is nothing other than the **center of mass of the violet arrival phase-density ring $\rho(x, \phi)$ inside the complex unit disk**! Whenever $\rho(x, \phi)$ is mirror-symmetric across a principal locking angle $\phi_0$ ($\rho(x, 2\phi_0 - \phi) = \rho(x, \phi)$), complex conjugation gives $\overline{\Psi(x)} = e^{-2i\phi_0}\Psi(x) = \bigl((e^{i\phi_0})^{-1}\bigr)^2\Psi(x)$, and Conjunct 7 of [@thm-ch34-phase-cancellation-and-standing-sieve] (`phase_locked_overlap_is_rotated_real`) immediately collapses $\Psi(x) = e^{i\phi_0}\,r(x)$ onto a **purely real signed standing-wave amplitude** $r(x) \in \mathbb{R}$ along $e^{i\phi_0}$!

Better still, while $\Psi(x)$ itself still carries the endpoint reference phase $e^{i\phi_0}$, applying **bidirectional fairness squaring** ([Chapter 31 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion)) to form the standing-wave survival intensity $\lvert\Psi(x)\rvert^2 = \Psi(x)\,\overline{\Psi(x)}$ eliminates every trace of gauge convention (manual derivation):

$$
\begin{aligned}
\lvert\Psi(x)\rvert^2 \;=\; \Psi(x)\,\overline{\Psi(x)} &\;=\; \iint_{\Gamma_1, \Gamma_2 \to x} \mathcal{D}\Gamma_1\,\mathcal{D}\Gamma_2\,\exp\!\Bigl(i\bigl(\Phi[\Gamma_1] - \Phi[\Gamma_2]\bigr)\Bigr) \\
&\;=\; \iint_{\Gamma_1, \Gamma_2 \to x} \mathcal{D}\Gamma_1\,\mathcal{D}\Gamma_2\,\cos\!\Bigl(\gamma_B\bigl(\Gamma_1 \circ \Gamma_2^{-1}\bigr)\Bigr) \;\equiv\; \bigl\langle \cos\gamma_B \bigr\rangle_x.
\end{aligned}
$$

Two structural miracles happen simultaneously in this double integral:

1. **Open arrival paths suture into gauge-invariant closed loops**: Conjugation reverses $\Gamma_2 : x_0 \to x$ into a return leg $\Gamma_2^{-1} : x \to x_0$, joining $\Gamma_1$ and $\Gamma_2^{-1}$ into a **strictly closed loop** $\Gamma_1 \circ \Gamma_2^{-1}$ passing through $x$; in the pure geometric holonomy sector, $\Phi[\Gamma_1] - \Phi[\Gamma_2] = \gamma_B(\Gamma_1 \circ \Gamma_2^{-1}) = -\frac{1}{2}\Omega(\Gamma_1 \circ \Gamma_2^{-1}) = -\frac{3}{2}V_{\mathrm{sector}}(\Gamma_1 \circ \Gamma_2^{-1})$ is strictly gauge-invariant;
2. **Antisymmetric sine terms self-annihilate under path exchange**: Swapping $(\Gamma_1, \Gamma_2) \leftrightarrow (\Gamma_2, \Gamma_1)$ reverses the loop orientation and flips $i\sin(\Phi_1 - \Phi_2) \mapsto -i\sin(\Phi_1 - \Phi_2)$, canceling the imaginary part identically across the double integral (and across the finite double sum $\lvert\Psi_M(x)\rvert^2 = \frac{1}{M^2}\sum_{m_1, m_2=0}^{M-1}\cos(\phi_{m_1} - \phi_{m_2})$) to leave the pure **closed-loop Berry cosine self-consistency average** $\langle\cos\gamma_B\rangle_x \in [0, 1]$!

Without referencing a single background coordinate, $\lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x$ states the exact condition for spatial presence: **a point $x$ survives omnidirectional interference if and only if the average cosine of the closed-loop holonomies formed by path pairs meeting at $x$ stays strictly positive!**

::: {.viz src="standing-wave-volume-sandbox" preset="circle-density-pushforward" height="520"}
**Circle phase-density pushforward: infinite path sums reduce to the $S^1$ centroid moment and closed-loop Berry cosine $\lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x$.** Incoming spherical paths on the left push forward onto the violet arrival phase-density ring $\rho(x, \phi)$ on the unit circle: concentrated phase-locked peaks drive a large cyan disk centroid $\Psi(x) = \int_0^{2\pi}\rho(x,\phi)e^{i\phi}\,d\phi$ (conjugate phase-locked real reduction anchored by green `LEAN ✓` `phase_locked_overlap_is_rotated_real`), whose fairness square equals the pairwise closed-loop cosine mean $\langle\cos\gamma_B\rangle_x$ (`MODEL` / manual derivation).
:::

## 34.7.3 Causal Inversion of Volume: Destructive Cancellation as Void and Uncancelled Standing-Wave Nodes as Volume {#sec-ch34-7-3}

We are now ready for the epigraph's breathtaking ontological reversal: **"Volume is merely the standing-wave points where phase integrals fail to cancel out, because infinitely many paths with infinitely many phase integrals converge onto a single point."** Notice the force of the word **"because"**: why does flooding a point with *infinitely many* paths and phase integrals carve away almost everything into empty void rather than packing every point solid? Both halves of the mechanism follow directly from our circle moment identity:

1. **Destructive Cancellation Is Void (Zero-Volume Background Is Phase Equidistribution, Not Path Absence)**:
   At any generic off-resonant location $x_{\mathrm{off}}$ lacking global phase locking, the boundless variety of incoming trajectories sweeps across all solid angles and spreads the arrival phase density into the isotropic **uniform Haar distribution** $\rho(x_{\mathrm{off}}, \phi) = \frac{1}{2\pi}$ around $S^1$. Its disk centroid vanishes identically:

   $$
   \Psi(x_{\mathrm{off}}) \;=\; \int_0^{2\pi} \frac{1}{2\pi}\,e^{i\phi}\,d\phi \;=\; 0 \qquad \Longleftrightarrow \qquad \bigl\langle \cos\gamma_B \bigr\rangle_{x_{\mathrm{off}}} \;=\; 0.
   $$

   For a finite $M$-path bundle with uniform relative Berry phase step $\Delta\gamma \notin 2\pi\mathbb{Z}$, summing $\Psi_M = \frac{1}{M}\sum_{m=0}^{M-1} e^{im\Delta\gamma} = \frac{1 - e^{iM\Delta\gamma}}{M(1 - e^{i\Delta\gamma})}$ yields the exact **Dirichlet coherence kernel bound** (manual derivation):

   $$
   \lvert\Psi_M\rvert \;=\; C_M(\Delta\gamma) \;=\; \left|\frac{\sin(M\Delta\gamma / 2)}{M\sin(\Delta\gamma / 2)}\right| \;\le\; \frac{1}{M\,\lvert\sin(\Delta\gamma / 2)\rvert} \;\xrightarrow{\;M \to \infty\;}\; 0.
   $$

   Whenever the normalized step is irrational—such as the golden-angle increment $\Delta\gamma_{\mathrm{gold}} = 2\pi\varphi^{-1}$ ($\alpha = \varphi^{-1} \notin \mathbb{Q}$)—Conjunct 5 of [@thm-ch34-phase-cancellation-and-standing-sieve] (`continuous_average_tendsto_haar`) guarantees without continuum approximations that the discrete orbit average converges as $M \to \infty$ to the vanishing Haar character integral $\int_{\mathbb{R}/\mathbb{Z}} e^{2\pi i u}\,d\mu_{\mathrm{Haar}}(u) = 0$! In zero-background geometry (`MODEL`), **"empty zero-volume void" is never a desert unvisited by paths—it is a plenum of infinitely many paths whose phases distribute uniformly around $S^1$ and cancel one another to exact zero!** The denser the incoming path bundle $M$, the tighter the magenta phasor polygon closes upon itself and the cleaner the void becomes!

::: {.viz src="standing-wave-volume-sandbox" preset="void-cancellation" height="520"}
**Destructive cancellation as zero-volume void: incommensurate arrival phases equidistribute on $S^1$ and self-annihilate.** Increase the incoming path count $M$ at an off-resonant point $x_{\mathrm{off}}$: under an irrational golden-angle increment $\Delta\gamma_{\mathrm{gold}} = 2\pi\varphi^{-1}$ or detuned step, violet arrival phases coat $S^1$ uniformly while magenta phasors coil into a closed zero-sum polygon, driving $\lvert\Psi_M\rvert \to 0$ and $\langle\cos\gamma_B\rangle_M \to 0$ (anchored by green `LEAN ✓` `continuous_average_tendsto_haar`).
:::

2. **The Dual Phase-Locking Sieve and Standing-Wave Volume Condensation**:
   What, then, allows a select locus of points $x_*$ to survive omnidirectional phase annihilation and condense into **"the standing-wave points where phase integrals fail to cancel out"**? A point must pass **both** stages of a strict **dual phase-locking sieve** (manual derivation + `Literature` + `MODEL`):
   - **Sieve I (Local Stationary Phase $\delta\Phi = 0$)**: Within each local tube of neighboring paths, first-order transverse phase variations must vanish ($\delta\Phi = 0$, §34.6.4), preventing immediate local Cornu-spiral coiling;
   - **Sieve II (Global Single-Valued Loop Quantization $\gamma_B(\Sigma_{\mathrm{closed}}) \in 2\pi\mathbb{Z}$)**: Local stationarity alone does not suffice! On a curved cell or compact manifold, distinct macroscopic path families wrapping from opposite sides (such as northern arcs $\Gamma_{\mathrm{N}}$ versus southern detours $\Gamma_{\mathrm{S}}$) intersect again at $x_*$; if the closed cycle $\Sigma_{\mathrm{closed}}$ they bound encloses an odd multiple of $\pi$ (e.g., $\Delta\Phi = \pi$), the two locally stationary beams still annihilate head-on at $x_*$ ($e^{i\Phi_{\mathrm{N}}} + e^{i\Phi_{\mathrm{S}}} = 0$)! Constructive survival across arbitrary winding numbers demands **global single-valued phase closure** $e^{i\gamma_B(\Sigma_{\mathrm{closed}})} = +1 \Longleftrightarrow \gamma_B(\Sigma_{\mathrm{closed}}) = 2\pi n$ ($n \in \mathbb{Z}$): for integer-spin vector holonomy ($\gamma = -\Omega$) this quantizes enclosed solid angle to $\Omega = 2\pi n$ ($V_{\mathrm{sector}} = \frac{2\pi}{3}n$), whereas on the spin-$\frac{1}{2}$ Hopf double cover ($\gamma_B = -\frac{1}{2}\Omega$) full spinor sign return $e^{-i\Omega/2} = +1$ requires $\Omega = 4\pi n$ (matching `circle_double_cover_history_lift`'s $360^\circ$ antipodal flip $-1$ versus $720^\circ$ full return $+1$, while general spin-$s$ monopole bundles on closed 2-spheres obey Dirac's integrality $2s \in \mathbb{Z}$). On finite cyclic groups $\operatorname{ZMod} m$, this exact all-or-nothing standing-wave sieve is kernel-verified in Conjunct 6 of [@thm-ch34-phase-cancellation-and-standing-sieve] (`sum_annihilator_character`): summing dual characters $\sum_{k \in \operatorname{annihilator}(H)} \operatorname{character}(k.1, x)$ yields **exact zero** at every off-lattice site $x \notin H$, while erecting a sharp constructive standing-wave peak of height $\lvert\operatorname{annihilator}(H)\rvert$ exclusively on the resonant subgroup $x \in H$!

   Viewed from this inverted summit, four classic pillars of mathematical physics (**literature results, not formalized in this book**, unified here within our `MODEL`) reveal a single shared geometry:
   - **Bohr–Sommerfeld & Kostant–Souriau Geometric Quantization**: A classical symplectic manifold $(M, \omega)$ admits a nontrivial prequantum line bundle $\mathcal{L} \to M$ whose parallel transport avoids destructive multi-loop self-cancellation if and only if its curvature periods pass the integrality sieve $\frac{1}{2\pi}\oint_{\Sigma_2}\omega \in \mathbb{Z}$, carving discrete Bohr–Sommerfeld standing-wave leaves $\oint_\gamma p\,dq = 2\pi\hbar\bigl(n + \frac{\mu}{4}\bigr)$ out of continuous phase space;
   - **Reading Weyl's Asymptotic Volume Law (1912) from Right to Left**: Semiclassical spectral geometry links the symplectic volume $\mathrm{Vol}_\Omega$ of a phase-space region to the number $N_{\mathrm{standing}}$ of orthogonal standing-wave eigenstates it supports ($\hbar = 1$ units):

     $$
     N_{\mathrm{standing}} \;\sim\; \frac{\mathrm{Vol}_\Omega}{(2\pi)^d} \qquad \Longleftrightarrow \qquad \mathrm{Vol}_\Omega \;\equiv\; (2\pi)^d \cdot N_{\mathrm{standing}}.
     $$

     Textbooks habitually read this **left-to-right** ("a pre-existing box of volume $\mathrm{Vol}_\Omega$ accommodates $N_{\mathrm{standing}}$ standing waves"); our ontological inversion (`MODEL`) reads it **right-to-left**: **there is no prior box—each independent standing-wave node that survives omnidirectional phase cancellation defines and contributes one $(2\pi)^d$ quantum of emergent volume, and wherever all standing waves cancel out ($N_{\mathrm{standing}} = 0$), volume vanishes identically ($\mathrm{Vol}_\Omega = 0$)!**
   - **Ponzano–Regge (1968) & Spin-Foam Quantum Gravity (Rovelli–Smolin 1995)**: In 3D discrete quantum gravity, neither edge lengths nor tetrahedron volumes are posited up front; integrating $\mathrm{SU}(2)$ holonomies against the Haar measure annihilates non-geometric spin configurations while stationary-phase saddle points of Wigner `{6j}` symbols ($\sim \cos(S_{\mathrm{Regge}} + \frac{\pi}{4})$) condense classical Regge tetrahedron volumes and discrete volume spectra out of pure group phase interference;
   - **Gabor 3D Optical Holography (1948)**: Intersecting coherent reference and object wavefronts from all angles across empty air extinguish one another everywhere off-node while locking constructively at standing-wave antinodes to suspend a three-dimensional volumetric image in mid-space—a tangible optical realization (`MODEL`) of volume sculpted purely out of uncancelled phase integrals!

::: {.viz src="standing-wave-volume-sandbox" preset="bohr-sommerfeld-quantization" height="520"}
**Dual phase-locking sieve and Bohr–Sommerfeld standing-wave quantization: only shells meeting full-cycle closure condense into volume.** Sweep the loop enclosure and curvature flux: off-integer flux causes multi-winding paths to extinguish one another in magenta, whereas hitting integer period closure (discrete prototype anchored by green `LEAN ✓` `sum_annihilator_character`) ignites phase-locked cyan standing-wave shells that count out quantized volume via Weyl's law (`Literature` / `MODEL`).
:::

## 34.7.4 Ontology-Inversion Synthesis Table and the Path-Density Contrast Experiment {#sec-ch34-7-4}

The five-row synthesis table below contrasts the conventional container-first worldview against the standing-wave volume inversion point by point:

| Structural Element | Conventional Container-First View | Standing-Wave Volume Inversion (`MODEL`) | Formal Anchor & Quantitative Criterion |
| :--- | :--- | :--- | :--- |
| **1. Status of Point $x$** | Pre-existing pebble inside a Euclidean or Riemannian box | Empty fairness-squared quotient shell hosting an arrival phase bundle $\mathcal{F}(x)$ | `selected_tree_transport`, `anchored_phase_classification` |
| **2. Path Integral Essence** | Summing particle trajectories across a pre-built spatial stage | Paths *are* phase functionals $\Gamma \mapsto e^{i\Phi[\Gamma]}$; pushforward reduces to the $S^1$ first Fourier moment | $\Psi(x) = \int_0^{2\pi}\rho(x,\phi)e^{i\phi}\,d\phi$, `phase_locked_overlap_is_rotated_real` |
| **3. Void (Zero-Volume Region)** | An "empty region" unvisited by matter or paths | Dynamic cancellation zone where infinitely many incoming phases equidistribute on $S^1$ and self-annihilate | $\rho = \frac{1}{2\pi} \implies \Psi = 0$, $\langle\cos\gamma_B\rangle_x = 0$, `continuous_average_tendsto_haar` |
| **4. Emergent Volume** | Primordial background metric measure $\iiint dV$ | Count of surviving standing-wave nodes passing $\delta\Phi = 0$ and $\gamma_B \in 2\pi\mathbb{Z}$ | $\lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x > 0$, `sum_annihilator_character`, $\mathrm{Vol}_\Omega \equiv (2\pi)^d N_{\mathrm{standing}}$ |
| **5. Path Density $M \to \infty$** | More paths appear to crowd the space ever more densely | **Higher path density cleanses off-shell void at rate $O(M^{-2})$ while sharpening the standing-wave volume core** | Off-shell $\lvert C_M\rvert^2 \le \bigl(M\lvert\sin\frac{\Delta\gamma}{2}\rvert\bigr)^{-2} \to 0$; core $\lvert C_M(0)\rvert^2 \equiv 1$ |

Row 5 delivers the signature counterintuitive experiment of this section: **more paths create cleaner emptiness and sharper volume**. With only $M = 3$ sparse arrival paths per point, incomplete cancellation leaves a muddy residual haze ($\lvert C_3\rvert \approx 0.11\text{–}0.16$) across detuned regions, blurring any boundary between bulk and void. As we sweep the incoming path density upward through $M = 8 \to 16 \to 32 \to 64$, **pouring over twenty times as many paths into every point does not fill up the background**—instead, off-shell regions self-cleanse at rate $O(M^{-2})$ into pitch-dark zero-volume void while the phase-locked cyan standing-wave nodes hold steady at $\lvert\Psi_M\rvert^2 = \langle\cos\gamma_B\rangle_M = 1$, crystallizing a crisp three-dimensional volumetric core straight out of omnidirectional phase interference!

::: {.viz src="standing-wave-volume-sandbox" preset="standing-volume-emergence" height="520"}
**Path-density contrast experiment ($M = 3 \to 64$): denser incoming path bundles cleanse the void while crystallizing surviving standing-wave volume.** Sweep the amber path-bundle density slider from $M = 3$ to $M = 64$: sparse-bundle background haze collapses as $O(M^{-2})$ into dark zero-volume void, while phase-locked cyan standing-wave nodes hold invariant at $\langle\cos\gamma_B\rangle_M = 1$ to sculpt a sharp 3D volumetric crystal (`NUM` / `MODEL`).
:::

::: {.example #ex-ch34-standing-wave-density-sweep-benchmark title="Analytical and Numerical Benchmark of Path-Density Dirichlet Cancellation and the ZMod 12 Annihilator Standing-Wave Sieve (Manual Derivation and Numerical Check)"}
We verify both continuous phase-density cancellation and the discrete finite-group standing-wave sieve with exact reproducible benchmarks:

1. **Five-Stage Path-Density Sweep $M \in \{3, 8, 16, 32, 64\}$ (Standing-Wave Core vs. Off-Shell Void)**: For an $M$-ray equal-weight arrival bundle with uniform relative Berry phase step $\Delta\gamma$, the circle centroid modulus obeys the exact Dirichlet closed form

   $$
   \lvert C_M(\Delta\gamma)\rvert \;=\; \left|\frac{1}{M}\sum_{m=0}^{M-1} e^{im\Delta\gamma}\right| \;=\; \left|\frac{\sin(M\Delta\gamma / 2)}{M\sin(\Delta\gamma / 2)}\right| \qquad (\Delta\gamma \notin 2\pi\mathbb{Z}),
   $$

   with fairness-squared closed-loop cosine density $\langle\cos\gamma_B\rangle_M = \frac{1}{M^2}\sum_{m_1, m_2=0}^{M-1}\cos\bigl((m_1 - m_2)\Delta\gamma\bigr) = \lvert C_M(\Delta\gamma)\rvert^2$. Compare three canonical loci: (i) a **resonant standing-wave core node** $\Delta\gamma = 0$ (or $2\pi$); (ii) a **detuned off-shell point** $\Delta\gamma_{\mathrm{off}} = 0.73\pi \approx 2.293363\;\mathrm{rad}$ ($131.400^\circ$); and (iii) an **irrational golden-angle void point** $\Delta\gamma_{\mathrm{gold}} = 2\pi\varphi^{-1} \approx 3.883222\;\mathrm{rad}$ ($222.492^\circ$, matching the complementary golden angle $2\pi\varphi^{-2} \approx 2.399963\;\mathrm{rad} \approx 137.508^\circ$, where $\varphi^{-1} \notin \mathbb{Q}$ activates `continuous_average_tendsto_haar`). Below, $\lvert C_M\rvert$ is rounded to $4$ decimal places and $\langle\cos\gamma_B\rangle_M = \lvert C_M\rvert^2$ is rounded to $6$ decimal places to retain full $O(M^{-2})$ suppression precision:

| Paths $M$ | Core $\lvert C_M(0)\rvert$ | Core $\langle\cos\gamma_B\rangle_M$ | Detuned $\lvert C_M(0.73\pi)\rvert$ | Detuned $\langle\cos\gamma_B\rangle_M$ | Golden Void $\lvert C_M(2\pi\varphi^{-1})\rvert$ | Golden Void $\langle\cos\gamma_B\rangle_M$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **$3$** | $1.0000$ | $1.000000$ | $0.1075$ | $0.011565$ | $0.1582$ | $0.025042$ |
| **$8$** | $1.0000$ | $1.000000$ | $0.0341$ | $0.001163$ | $0.0234$ | $0.000546$ |
| **$16$** | $1.0000$ | $1.000000$ | $0.0330$ | $0.001091$ | $0.0230$ | $0.000529$ |
| **$32$** | $1.0000$ | $1.000000$ | $0.0290$ | $0.000838$ | $0.0216$ | $0.000467$ |
| **$64$** | $1.0000$ | $1.000000$ | $0.0155$ | $0.000241$ | $0.0165$ | $0.000273$ |

   Increasing $M$ from $3$ to $64$ leaves the resonant standing-wave core untouched at $\langle\cos\gamma_B\rangle_{64} = 1.000000$ while suppressing both detuned and golden-irrational void intensities below $3 \times 10^{-4}$ (bounded in amplitude by $\bigl(64\lvert\sin(\Delta\gamma/2)\rvert\bigr)^{-1}$, equal to $0.0171$ and $0.0168$ respectively)—exceeding a $3600 : 1$ core-to-void contrast!

2. **Exact Standing-Wave Annihilator Sieve on $\operatorname{ZMod} 12$ (anchored by `sum_annihilator_character`)**: Set $m = 12$ and take the order-$4$ resonant subgroup $H = \{0, 3, 6, 9\} \le \operatorname{ZMod} 12$ ($\lvert H\rvert = 4$). Dual modes $k \in \operatorname{ZMod} 12$ satisfy $e^{2\pi i k h / 12} = 1$ for all $h \in H$ iff $3k \equiv 0 \pmod{12}$, selecting the $3$-element annihilator subgroup $\operatorname{annihilator}(H) = \{0, 4, 8\}$ ($\lvert H\rvert \cdot \lvert\operatorname{annihilator}(H)\rvert = 4 \times 3 = 12$). Evaluating the three-mode character sum

   $$
   S(x) \;=\; \sum_{k \in \{0, 4, 8\}} e^{2\pi i k x / 12} \;=\; 1 + e^{2\pi i x / 3} + e^{4\pi i x / 3}
   $$

   across all $x \in \operatorname{ZMod} 12$ gives:
   - At the $4$ resonant standing-wave nodes $x \in H = \{0, 3, 6, 9\}$, $e^{2\pi i x / 3} = 1$, so all three phasors align to $S(x) = 1 + 1 + 1 = 3 = \lvert\operatorname{annihilator}(H)\rvert$;
   - At all $8$ off-resonant sites $x \in \{1, 2, 4, 5, 7, 8, 10, 11\} = (\operatorname{ZMod} 12) \setminus H$, the cube roots of unity close into an equilateral triangle $1 + \omega + \omega^2 = 0$ ($\omega = e^{\pm 2\pi i / 3}$), yielding **exact zero** $S(x) = 0$—$4$ surviving discrete volume nodes framed by $8$ exact-zero void sites!
:::

::: {.remark #rem-ch34-geometric-quantization-weyl-spinfoam-literature title="Epistemic Boundaries on Geometric Quantization, Weyl's Volume Law, Ponzano-Regge Spin Foams, and Optical Holography (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Three strict epistemic tiers govern this section:

1. **Bohr–Sommerfeld Quantization, Kostant–Souriau Integrality, and Weyl's Volume Law**: Closed-loop phase-integral quantization originates in N. Bohr (*Phil. Mag.* **26**, 1, 1913) and A. Sommerfeld (*Ann. Phys.* **51**, 1, 1916), with caustic Maslov indices formulated by J. B. Keller (*Ann. Phys.* **4**, 180, 1958) and V. P. Maslov (1965); the prequantum line-bundle integrality theorem $\frac{1}{2\pi}[\omega] \in H^2(M, \mathbb{Z})$ was established independently by B. Kostant (*Lecture Notes in Math.* **170**, 87, 1970) and J.-M. Souriau (*Structure des systèmes dynamiques*, Dunod, 1970); and asymptotic proportionality between standing-wave state count and phase-space volume $N_{\mathrm{standing}} \sim (2\pi)^{-d}\mathrm{Vol}_\Omega$ is due to H. Weyl (*Math. Ann.* **71**, 441, 1912);
2. **Ponzano–Regge Spin Foams and Gabor Wavefront Holography**: Semiclassical emergence of 3D Euclidean tetrahedral volumes and Regge actions from stationary-phase Wigner `{6j}` asymptotics was discovered by G. Ponzano & T. Regge (*Spectroscopic and Group Theoretical Methods in Physics*, North-Holland, 1, 1968), followed by discrete area/volume spectra and spin-foam sum-over-histories models in C. Rovelli & L. Smolin (*Nucl. Phys. B* **442**, 593, 1995) and J. C. Baez (*Class. Quantum Grav.* **15**, 1827, 1998); three-dimensional volumetric wavefront reconstruction by coherent interference originates in D. Gabor (*Nature* **161**, 777, 1948);
3. **Kernel-Verified Foundations (`LEAN ✓`) vs. Ontological Inversion (`MODEL`)**: Spanning-tree phase transport, anchored chord-loop and path phase classification, cyclic rank-one Bargmann path products, single-qubit Bloch triple volume traces, irrational-rotation Haar equidistribution, finite-group annihilator character sieves, and phase-locked real overlap reduction are kernel-verified in [@thm-ch34-phase-cancellation-and-standing-sieve]; the circle pushforward moment, closed-loop Berry cosine identity $\lvert\Psi(x)\rvert^2 = \langle\cos\gamma_B\rangle_x$, and Dirichlet bounds are exact elementary derivations; and inverting Weyl's law and Berry holonomy to interpret spatial volume as the surviving standing-wave nodal locus of uncancelled phase integrals constitutes this book's theoretical `MODEL` (claiming neither a rigorous 4D Lorentzian continuum gravitational path-integral measure nor equating finite `ZMod m` character sieves with full infinite-dimensional Kostant–Souriau quantization).
:::

Across the first seven stages of Chapter 34, coincidence between single and double orthogonality inverted the observer's pole on a static slice (§§34.1–34.3), "two-begets-three" bootstrapping opened the curved spherical trihedron $\Delta\mathcal{T}_\epsilon$ (§§34.4–34.5), solid sector volume wrote path memory onto the Hopf fiber (§34.6), and omnidirectional phase integrals swept detuned regions clean into void while condensing uncancelled standing-wave nodes into macroscopic spatial volume (§34.7). Yet holding §34.6 and §34.7 side by side exposes an even sharper foundational question: if macroscopic paths are integrated step by step, macroscopic phases are integrated increment by increment, and spatial points and volumes emerge both as standing-wave cancellations of path/phase integrals and as boundary cancellations of countless adjacent arc-bodies—then when we zoom all the way back down to a **single uncancelled minimal arc-body** ($N = 1$), is that indivisible geometric atom **minimal phase**, **minimal path**, or **the gradient at a point**? Sweep the path-bundle density $M = 3 \to 64$ inside the `STANDING//VOLUME` interactive laboratory below, then step into §34.8 to uncover the "four-in-one" Clifford monad at the minimal scale and the multi-cell boundary cancellation law that sieves macroscopic dimensions apart:

::: {.viz src="standing-wave-volume-sandbox" height="640"}
**Phase-integral standing waves as emergent volume: the full interactive lab (`STANDING//VOLUME`).** Switch freely among Multi-Phase Point, Circle Density Pushforward, Void Cancellation, Bohr–Sommerfeld Quantization, and Standing Volume Emergence while sweeping the amber probe point $x$, path-bundle density $M \in [3, 64]$, and detuning/flux controls to watch omnidirectional arrival phases push forward onto the violet $S^1$ density ring $\rho(x,\phi)$, self-annihilate across golden-angle void regions, and condense at $\langle\cos\gamma_B\rangle_x = 1$ into a cyan 3D standing-wave volume crystal; green `LEAN ✓` badges mark the seven frozen kernel theorems.
:::

---
