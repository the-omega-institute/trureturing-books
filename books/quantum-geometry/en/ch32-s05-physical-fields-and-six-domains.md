# 32.5 Co-Origin Derivation of Physical Fields and the Six-Domain Holographic Isomorphism Table {#sec-ch32-physical-fields}

Extending the bridges built in Part V ([Chapter 17](ch17-lorentz-geometry.md)–[Chapter 20](ch20-complexity-and-spacetime.md)) and [Section 32.4](ch32-s04-generative-laws.md#sec-ch32-generative-laws), our unified-field interpretive program (`MODEL`) views matter spinors, gauge interactions, macroscopic gravitational spacetime, and ultraviolet regularization not as heterogeneous bricks bolted together, but as grade- and dimension-indexed facets of one orthogonal multivector structure:

1. **Matter Spinors and Special Relativity (Inner-Product Proper Time vs. Exterior Spatial Bifurcation, `MODEL` + `LEAN ✓`)**:
   Minkowski null-cone rigidity (Conjunct 1 of [@thm-ch32-null-cone-holonomy-and-holographic-cut] below, `LEAN ✓`) proves that fixing null-cone rays determines the entire Lorentzian quadratic form up to a single scalar factor! In our geometric model (`MODEL`), we interpret rest mass as collinear inner-product self-locking along an observer's proper-time axis and the limiting propagation speed as a $90^\circ$ orthogonal horizon (external continuum proper-time rearrangement and first-order spinor wave-equation formulations are recorded in Item 1 of [@rem-ch32-dirac-yang-mills-jacobson-literature] below).

::: {.viz src="unified-field-slice" preset="photon" height="500"}
**Pushed towards light, the point on the circle creeps up to 90°.** The rapidity η goes from ln 2 to 4: the worldline hugs the white light line and the amber point on the circle approaches θ = 90°; the cyan line (the proper-time rate) shrinks to 0.04 and the magenta height (the speed v/c) nears 1 without reaching it. The card starts from η = ln 2, where the cyan line is cos θ = 0.8 = 1/γ and the magenta height sin θ = 0.6, and 0.8² + 0.6² = 1 is the (dτ/dt)² + (v/c)² = 1 of item 1 of [@rem-ch32-dirac-yang-mills-jacobson-literature] below. Reading 90° as an orthogonal horizon is this book's interpretation (`MODEL`).
:::

2. **Gauge Interactions and the Orthogonal Sphere Ladder (Loop Alignment Residuals, `MODEL` + `LEAN ✓`)**:
   On finite directed graphs, `trureturing`'s **anchored phase classification theorem** (Conjunct 2 of [@thm-ch32-null-cone-holonomy-and-holographic-cut] below, `LEAN ✓`) proves that circle-valued edge phases modulo anchored coboundaries are classified isomorphically by $m + 1 - n$ off-tree chord holonomies together with $k - 1$ relative anchor phases. Building on this discrete theorem and [Chapter 31](ch31-quantum-fairness.md)'s **Seat Fairness**, our interpretive layer proposes a heuristic **local-frame alignment and sphere-ladder hypothesis (`MODEL`)**, reading non-canceling loop alignment residuals as geometric interaction sources and organizing single-plane circle phases and higher orthogonal frame symmetries into an internal symmetry ladder (external continuum gauge-connection, non-Abelian field-strength, and Standard Model gauge-group literature and boundaries are recorded in Item 2 of [@rem-ch32-dirac-yang-mills-jacobson-literature] below).

::: {.viz src="unified-field-slice" preset="plaquette" height="500"}
**Back and forth in two planes leaves a turn behind.** Turns of 60° about e₁ and about e₂, applied as R₂⁻¹, R₁⁻¹, R₂, R₁: the amber arrow does not get home, the magenta arc is the gap, and the violet line is the axis of the turn left over; U = R₁R₂R₁⁻¹R₂⁻¹ leaves a turn of 57.9°, with its bivector mostly in the e₁e₂ plane (for the literature on commutator curvature see item 2 of [@rem-ch32-dirac-yang-mills-jacobson-literature] below). Put both turns about one axis (one plane) and the four steps cancel: the arrow comes home and U = 1.
:::

3. **Holographic Thermodynamic Gravity and Endogenous Horizon Curvature (Bridge Flow–Cut Duality and Horizon Hypothesis, `MODEL` + `LEAN ✓`)**:
   On balanced quadratic-cone bridge tensor networks, `trureturing`'s quantum max-flow min-cut theorem (Conjunct 3 of [@thm-ch32-null-cone-holonomy-and-holographic-cut] below, `LEAN ✓`) proves that quantum maximum flow equals the minimum-cut capacity $\min(ad, bc)$. Motivated by this discrete flow–cut duality, our unified-field model (`MODEL`) models spatial geometry as a relational network woven from correlation budgets: increasing local collinear inner-product locking drains surrounding orthogonal correlation capacity under complementary Pythagorean conservation (Conjunct 2 of [@thm-ch31-seat-pythagorean-monogamy-fairness], `LEAN ✓`), manifesting as endogenous geometric curvature, while the bounded observer's $90^\circ$ orthogonal equator provides an endogenous observer-horizon hypothesis for a positive cosmological constant (`MODEL`; external continuum holographic-entanglement and horizon-thermodynamic gravity literature is recorded in Item 3 of [@rem-ch32-dirac-yang-mills-jacobson-literature] below).

::: {.viz src="unified-field-slice" preset="horizon" height="500"}
**The edges a horizon cuts cap the entanglement across it.** The observer sits at the north pole and the horizon is pushed down to 90°: the cyan edges stay inside and the 10 magenta edges are cut; if every edge carries a D-dimensional index, the Schmidt rank across the horizon is at most D¹⁰. This is a counting sketch of the network of relations (`MODEL`); the frozen flow–cut theorem lives on a different network, the bridge graph, in Conjunct 3 of [@thm-ch32-null-cone-holonomy-and-holographic-cut] below.
:::

4. **Discrete Cut-and-Project Lattice and Zeckendorf Ultraviolet Cutoff (`MODEL` + `LEAN ✓`)**:
   At the level of discrete automata and algebraic number theory, Conjunct 4 of [@thm-ch32-generative-self-reference-and-zeckendorf] proves that the binary Zeckendorf DFA accepts precisely the `NoAdjacentOnes` language (`LEAN ✓`), while Cassini's identity fixes the unit golden-norm seam $(-1)^{k+1}$ ([`fib_cassini_from_golden_norm`](lean:D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm), `LEAN ✓`). At our physical modeling layer (`MODEL`), we combine these two discrete theorems into a **polyhedral ultraviolet coding-cutoff hypothesis (`MODEL`)**, forbidding unbounded adjacent high-frequency pileups without positing an infinitely divisible continuum stage.

We now state the three formal theorems anchoring null-cone metric rigidity, spanning-tree gauge holonomy, and holographic bridge-graph min-cut:

::: {.theorem #thm-ch32-null-cone-holonomy-and-holographic-cut title="Three Formal Spacetime and Gauge-Holography Anchors: Null-Cone Rigidity, Anchored Gauge Holonomy, and Bridge-Graph Min-Cut" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result"}
Across the frozen null-cone-certificate, agency-holonomy, and bridge-graph tensor-network modules of `trureturing`, the following three theorems hold simultaneously:

1. **Minkowski Null-Cone Quadratic-Form Rigidity in Arbitrary Spatial Dimension** ([`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)): For every spatial dimension $d \in \mathbb{N}$ and real quadratic form $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\mathrm{Space}\;d)$ on $\mathrm{Space}(d) = \mathbb{R} \times \mathbb{R}^d$, if $S$ vanishes on the entire Minkowski null cone ($\forall v,\; \operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$), then $S$ is an exact scalar multiple of the Minkowski form:

   $$
   S \;=\; S(1, 0)\bullet \operatorname{minkowski}_d;
   $$

2. **Complete Chord-Holonomy Classification of Anchored Abelian Gauge Fields** ([`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)): Let $(V, E)$ be a finite directed graph equipped with a spanning tree `ht : NamedSpanningTree s t T` and nonempty anchor set $R \subseteq V$ ($r \in R$), with $|V| = n,\, |E| = m,\, |R| = k$ and coboundary subgroup $N = \operatorname{range}(\operatorname{coboundary}_{s,t,R})$. Then the coordinate homomorphism $\chi = \operatorname{coordinateHom}(ht, R, r)$ and continuous multiplicative section $\sigma = \operatorname{phaseSection}(s, t, T, R, r)$ satisfy $\chi \circ \sigma = \mathrm{id}$ and $\ker\chi = N$, inducing compact topological-group isomorphisms onto $c = m + 1 - n$ chord holonomies plus $a = k - 1$ relative anchor phases:

   $$
   (E \to \mathrm{Circle}) / N \;\simeq_{\mathrm{top}*}\; \operatorname{Coordinates}(T, R, r) \;\simeq_{\mathrm{top}*}\; \bigl(\operatorname{Fin}(m + k - n) \to \mathrm{Circle}\bigr);
   $$

3. **Holographic Bridge-Graph Quantum Max-Flow Min-Cut Theorem** ([`QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result)): For all bond dimensions $a, b, c, d \in \mathbb{N}$ satisfying positivity and balanced-cone bounds $0 < a \le b$, $0 < c \le d$, $a^2 + b^2 \le 3ab$, and $c^2 + d^2 \le 3cd$, quantum maximum flow equals quantum minimum cut:

   $$
   \operatorname{QMaxFlow}(a, b, c, d) \;=\; \operatorname{QMinCut}(a, b, c, d) \;=\; \min(a d,\; b c).
   $$
:::

::: proof
Conjunct 1 polarizes $S$ across null pairs $(\pm\|w\|, w)$ to eliminate time–space cross terms and lock $S(0, w) = -S(1, 0)\|w\|^2$; Conjunct 2 transports phases uniquely along the spanning tree to split $(E \to \mathrm{Circle})/N$ into $(m+1-n) + (k-1) = m + k - n$ circle factors; Conjunct 3 combines `QMaxFlow_le_QMinCut` with width-two rational witnesses and castling strong-induction descent `cone_descent`. The full proof is checked by the Lean kernel.
:::

Twisting free vertex phases directly on a four-plaquette lattice illustrates Conjunct 2 of [@thm-ch32-null-cone-holonomy-and-holographic-cut]—gauging away spanning-tree edge phases while leaving off-tree chord holonomies and relative anchor phases invariant:

::: {.viz src="lattice-gauge-loop" preset="anchor" height="500"}
**The tree-path phase between two anchors cannot be twisted.** On four squares, the root $r$ and the top-right corner $a$ are locked squares and every other corner turns freely: each edge along the tree path $r \to a$ (the cyan band) moves (the faint arcs are the angles swept), yet the path phase shown by the cyan hand on the right stays put. What survives these twists is exactly the loop phases on the chords outside the tree and the path phase between the anchors: the classification of item 2 of [@thm-ch32-null-cone-holonomy-and-holographic-cut].
:::

The continuum special-relativistic spinor, non-Abelian gauge curvature, and horizon-thermodynamic gravitational field equations paired with this section are recorded below:

::: {.remark #rem-ch32-dirac-yang-mills-jacobson-literature title="Continuum STA Dirac Equation, Yang–Mills Curvature, and Jacobson's Thermodynamic Einstein Equation (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Continuum field equations referenced in this section belong to classic theoretical-physics literature and are not formalized in `trureturing@dev`:

1. **Proper-Time Euclidean Rearrangement and STA Dirac Equation (D. Hestenes, *Space-Time Algebra*, 1966)**: Dividing $c^2 d\tau^2 = c^2 dt^2 - d\mathbf{x}^2$ ($v = |d\mathbf{x}/dt| \le c$) by $c^2 dt^2$ gives $\left(\frac{d\tau}{dt}\right)^2 + \left(\frac{v}{c}\right)^2 = 1$; factoring $E^2 - \mathbf{p}^2 c^2 = m^2 c^4$ in $\mathcal{Cl}_{1,3}(\mathbb{R})$ yields the matrix-free real spinor Dirac equation $\nabla\psi\,\mathbf{I}_{21} = m\psi\gamma_0$ ($\hbar = c = 1$; cf. [Chapter 18](ch18-spinors-and-gauge-curvature.md) [@rem-dirac-zitterbewegung-literature]);
2. **Yang–Mills Non-Abelian Curvature and Standard Model Gauge Group (C. N. Yang & R. L. Mills, *Phys. Rev.* **96**, 191–195, 1954)**: The commutator of covariant derivatives $D_\mu = \partial_\mu + A_\mu$ yields the Lie-algebra curvature 2-form $F_{\mu\nu} = [D_\mu, D_\nu] = \partial_\mu A_\nu - \partial_\nu A_\mu + [A_\mu, A_\nu]$; the Standard Model local gauge group is $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_c$ (with compact Lie-group isomorphism $\mathrm{SU}(2) \cong S^3 \cong \operatorname{Spin}(3) \subset \mathcal{Cl}_{3,0}^+$; interpreting the full product group via an orthogonal sphere ladder belongs to our `MODEL`, whereas rigorous chiral fermion anomaly cancellation and non-Abelian confinement remain subjects of external quantum field theory and open mathematical physics);
3. **Ryu–Takayanagi Entanglement Surface and Jacobson's Horizon Equation of State (T. Jacobson, *Phys. Rev. Lett.* **75**, 1260–1263, 1995; S. Ryu & T. Takayanagi, *Phys. Rev. Lett.* **96**, 181602, 2006)**: Holographic entanglement entropy obeys $S(A) = \frac{\operatorname{Area}(\gamma_A)}{4 G_N \hbar}$; Jacobson showed that imposing Clausius heat–entropy balance $\delta Q = T\,\delta S$ ($\delta S = \eta\,\delta\mathcal{A}$) across all local Rindler causal horizons together with $\nabla^\mu T_{\mu\nu} = 0$ and the contracted Bianchi identity implies Einstein's field equation

   $$
   R_{\mu\nu} - \frac{1}{2}R\,g_{\mu\nu} + \Lambda\,g_{\mu\nu} \;=\; \frac{8\pi G}{c^4}\,T_{\mu\nu},
   $$

   where $\Lambda$ enters Jacobson's derivation as an integration constant (identifying $\Lambda > 0$ with a finite observer's $90^\circ$ equatorial horizon curvature is our `MODEL` hypothesis).
:::

## 32.5.1 Six-Domain Holographic Isomorphism Synthesis {#sec-ch32-six-domain-synthesis}

Bringing all thirty-two chapters onto a single canvas, one set of orthogonal primitives establishes a six-domain holographic isomorphism across **geometry/topology, quantum gauge fields, relativistic holography, arithmetic number theory, complexity/hydrodynamics, and observer dynamics**:

::: {.figure src="ch32-six-readings"}
**One meeting, read once in each of six domains.** The six small panels draw the same thing: two unit arrows at an angle $\theta$, a cyan shadow and a magenta parallelogram; the two lines beneath give how the table's "one-dimensional inner product" and "two-dimensional outer product" rows read in that domain—in relativity, for instance, the cyan line reads as the proper-time rate $d\tau/dt$ and the magenta area as the speed $v/c$. This is the book's synthesis (`MODEL`); the evidential tier of each entry is the one marked in the table below.
:::

Unfolding these six cross-domain readings row by row, the master ledger below aligns the ambient space, Grade-0 inner line, Grade-2 exterior plane, topological seam, finite fairness law, and contractive fixed core across all six domains along with their explicit evidential tiers:

::: {.remark #rem-ch32-six-domain-isomorphism-table title="Six-Domain Holographic Isomorphism Master Ledger of the Orthogonal Self-Referential Unified Field (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The master table below synthesizes structural correspondences across six domains: sub-items tagged `LEAN ✓` cite frozen theorems in `trureturing@dev`, external equations ($H\mathbf{\Psi}=0$, $F_{\mu\nu}$, RT surfaces, Hilbert reciprocity $\prod_v (a,b)_v = +1$, Arnold geodesics, BBBV/ETH bounds, and $\theta^* \approx 0.739085$) cite chapter literature remarks, unproved problems ($\mathrm{P}\neq\mathrm{NP}$, Critical Line $\sigma=1/2$, unforced 3D NS regularity) carry `OPEN`, and the cross-domain unification architecture constitutes our philosophical–geometric `MODEL`:

**Static Ambient Space**

**Pure Geometry & Topology:**
High-D orthogonal lattice / parallelizable spinor sphere

**Quantum & Gauge Fields:**
Timeless constraint $H\mathbf{\Psi}=0$ (`Literature`) & Gram ledger (`LEAN ✓`)

**Relativity & Holographic Gravity:**
Block-universe holographic bulk (`MODEL`)

**Arithmetic Geometry & Number Theory:**
Integer lattices & prime orthogonal axes $\{\vv{e}_p\}$ (`Literature`)

**Complexity & Fluid Fields:**
Idealized global field $P = NP$ (`MODEL`) / Arnold geodesics (`Literature`)

**Observer & Soul Dynamics:**
Timeless causal compatibility crystal (`MODEL`)

**1D Inner Projection ($\mathbf{A}\cdot\mathbf{B}=\cos\theta$)**

**Pure Geometry & Topology:**
Idempotent ray $P^2=P$ (`LEAN ✓`)

**Quantum & Gauge Fields:**
Particle reading & rank-one Born weight (`LEAN ✓`)

**Relativity & Holographic Gravity:**
Proper-time rate $d\tau/dt$ & rest-mass self-locking (`Literature` / `MODEL`)

**Arithmetic Geometry & Number Theory:**
Quaternion trace filtering $\mathbb{Z}$ & elliptic Hasse trace $\cos\theta_p$ (`Literature`)

**Complexity & Fluid Fields:**
Polynomial verification along a 1D witness thread ($NP$ is a line, `MODEL`)

**Observer & Soul Dynamics:**
Zeckendorf discrete memory anchors (`LEAN ✓` / `MODEL`)

**2D Exterior Rotation ($\mathbf{A}\wedge\mathbf{B}=\sin\theta\,\hat{\mathbf{I}}$)**

**Pure Geometry & Topology:**
Oriented area & $R^2=-I_n$ (`Literature` / `LEAN ✓`)

**Quantum & Gauge Fields:**
Unitary gate rotors & Yang–Mills curvature $F_{\mu\nu}$ (`Literature`)

**Relativity & Holographic Gravity:**
Spatial velocity share $v/c$ & bridge/RT min-cut area (`LEAN ✓` / `Literature`)

**Arithmetic Geometry & Number Theory:**
Mod-4 prime splitting $p=a^2+b^2$ & Frobenius rotation (`Literature`)

**Complexity & Fluid Fields:**
Irrotational guiding field ($P$ is a field, `MODEL`) & vorticity $\nabla\wedge\mathbf{u}$ (`Literature`)

**Observer & Soul Dynamics:**
Orthogonal evolution potential & Landauer bath heat (`LEAN ✓`)

**Topological Seam & Frustration**

**Pure Geometry & Topology:**
Hairy-ball $\chi(S^2)=2$ & $720^\circ$ defect (`Literature`)

**Quantum & Gauge Fields:**
Spinor $4\pi$ double cover & monopole charge (`LEAN ✓` / `Literature`)

**Relativity & Holographic Gravity:**
Black-hole & $90^\circ$ horizon barrier (`MODEL`)

**Arithmetic Geometry & Number Theory:**
Pell $\pm 1$ seam (`LEAN ✓` / `Literature`) & semantic diagonal escape (`LEAN ✓`)

**Complexity & Fluid Fields:**
3-SAT frustration, local $\mathrm{P} \neq \mathrm{NP}$ & 3D NS vortex stretching (`OPEN` / `LEAN ✓`)

**Observer & Soul Dynamics:**
Cassini $(-1)^{k+1}$ cross-round spiral offset (`LEAN ✓` / `MODEL`)

**Finite Slice & Fairness**

**Pure Geometry & Topology:**
Real symmetric Gram elliptope $G \succeq 0,\; G_{ii}=1$, including its singular boundary (`Literature`)

**Quantum & Gauge Fields:**
Complementary Pythagoras, no-cloning & CKW monogamy (`LEAN ✓` / `Literature`)

**Relativity & Holographic Gravity:**
Null-cone rigidity & circuit min-depth (`LEAN ✓`)

**Arithmetic Geometry & Number Theory:**
Hilbert reciprocity $\prod_v (a,b)_v = +1$ (`Literature`) & finite prime sieves

**Complexity & Fluid Fields:**
Subexponential tensor seam at an illustrative crossover of about $2^{558}$ ($c=1$ schematic curve comparison, `MODEL`; see [@ex-ch30-galactic-crossover-scale])

**Observer & Soul Dynamics:**
Internal phase $u \in E_\perp^3$, forgetting reset & torus ergodic holism (`LEAN ✓` / `MODEL`)

**Ultimate Fixed Core**

**Pure Geometry & Topology:**
Contractive fixed point

**Quantum & Gauge Fields:**
Operator = state $\cos\theta^* = \theta^*$ (`Literature` / `MODEL`)

**Relativity & Holographic Gravity:**
Stationary action $\delta S = 0$ (`Literature`)

**Arithmetic Geometry & Number Theory:**
Riemann critical line $\sigma = 1/2$ (`OPEN`)

**Complexity & Fluid Fields:**
Forced / self-referential equilibrium

**Observer & Soul Dynamics:**
Meta-axiom $\psi = \psi(\psi)$, golden $\varphi$ (`LEAN ✓`) & spatial attractors (`MODEL`)

:::

Stepping into the full interactive unified-field laboratory below lets us drive relativistic rapidity clocks, non-Abelian plaquette holonomies, and $90^\circ$ horizon cut capacities along a single shared rail:

::: {.viz src="unified-field-slice" height="620"}
**A slice of the orthogonal self-referential unified field: the full lab.** Three scenes share one rail: Clock pushes the rapidity η, Loop walks the four steps R₂⁻¹, R₁⁻¹, R₂, R₁, and Horizon pushes the observer's horizon down from the north pole. Every number is computed live; green marks only the Lean theorems this chapter cites, and the rest is labelled as literature result or as this book's interpretation.
:::

With the six-domain internal isomorphism of the Orthogonal Self-Referential Unified Field complete, [Section 32.6](ch32-s06-meta-unification-and-icosian-bridge.md#sec-ch32-meta-coordinates-and-icosians) turns outward to eight grand foundational programs of modern science, situating them on a three-dimensional diagnostic coordinate system and the quaternionic golden lattice bridge.
