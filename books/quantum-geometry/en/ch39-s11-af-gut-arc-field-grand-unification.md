# 39.11 Arc-Field Grand Unified Theory (AF-GUT): Concentric Four-Field Arc Connections, Weinberg Angle 3/8 Running, and Clock-Budget Einstein Closure {#sec-ch39-af-gut-arc-field-grand-unification}

> *"Unify all forces through fields and minimal circular arcs, and construct a Grand Unified Theory."*

Ascending to the highest crest of Chapter 39—the culminating peak of the ten-part main text—the preceding two sections have forged the two load-bearing pillars of grand unification: in [§39.9](ch39-s09-unified-arc-forces-and-planck-convergence.md), we traced electromagnetism, the weak interaction, the strong interaction, and gravitation back to intra-cell `1D — 2D — 3D` fiber spherical excess and inter-cell $N \ge 5$ overconstrained Regge hinge deficits on one minimal circular-arc trihedron $\Delta\mathcal{T}_\epsilon$; immediately afterward in [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md), the **Three-Dimensional Concept-Field Cap Principle** ([@thm-ch39-hilbert-concept-ledger-and-3d-cap]) dispelled the mirage of literal higher spatial dimensions, revealing high- and infinite-dimensional Hilbert spaces to be multi-concept bookkeeping ledgers multiplexing independent **concept fields**—space, color, spin, and motion—each individually capped at dimension $D \le 3$.

The opening epigraph now locks those two pillars together at the summit into a quantitative, falsifiable synthesis—**Arc-Field Grand Unified Theory (AF-GUT)** (this book's capstone `MODEL`, anchored formally by the six frozen Lean 4 declarations of [@thm-ch39-af-gut-arc-field-unification] covering covariant commutator factorization, skew-adjoint unitary complex structure, anchored Abelian loop classification, spinor double-cover path lifting, tetrahedral coboundary defect exactness, and the Lagrange–Gram Pythagorean identity, calibrated against classic GUT, noncommutative-geometric, and horizon-thermodynamic literature in [@rem-ch39-georgi-glashow-connes-jacobson-literature], and bounded openly by [@prob-ch39-af-gut-threshold-and-proton-stability]): **grand unification requires neither cramming quarks and leptons into a monolithic Georgi–Glashow $\mathrm{SU}(5)$ or $\mathrm{SO}(10)$ matrix—at the price of proton decay and magnetic-monopole overproduction—nor inflating physical spacetime into unseen ten- or eleven-dimensional Kaluza–Klein / string manifolds; every fundamental interaction is already a concentric minimal circular-arc connection across bounded parallel concept fields (`1D` hypercharge, `2D` chiral weak isospin, `3D` color volume, and `3D` spatial truss) sharing one universal comparison clock $\nu_0$!**

## 39.11.1 Beyond Monolithic Simple-Group Matrices and Extra Spatial Dimensions: The Parallel Concept-Field Bundle $\mathcal{E}_{\mathrm{total}}$ and Master Arc Connection {#sec-ch39-11-1}

Look back across a century of attempts to construct a Grand Unified Theory (GUT) or Theory of Everything (ToE). Both dominant strategies tried to erase the boundary between distinct concepts by algebraic brute force, and both collided head-on with low-energy empirical exclusions (`Literature`, detailed in [@rem-ch39-georgi-glashow-connes-jacobson-literature]):

1. **First classical route — monolithic simple-group matrix packing ($\mathrm{SU}(5)$ / $\mathrm{SO}(10)$)**:
   In 1974, Georgi and Glashow embedded the Standard Model gauge group $G_{\mathrm{SM}} = \mathrm{SU}(3)_C \times \mathrm{SU}(2)_L \times \mathrm{U}(1)_Y$ ($\dim_{\mathbb{R}} = 8 + 3 + 1 = 12$) into the rank-$4$ simple group $\mathrm{SU}(5)$ ($\dim\mathfrak{su}(5) = 24$, or into $\mathrm{SO}(10)$ with $\dim\mathfrak{so}(10) = 45$), forcing colored quarks and colorless leptons into shared column multiplets ($\bar{\mathbf{5}} \oplus \mathbf{10}$). Erasing the concept boundary between color and lepton number exacted two steep penalties: first, off-diagonal matrix blocks inevitably introduce $24 - 12 = 12$ superheavy $(X, Y)$ leptoquark gauge bosons (charges $\pm\frac{4}{3}, \pm\frac{1}{3}$) mediating tree-level $\Delta B = \Delta L = -1$ proton decay $p \to e^+ \pi^0$, whose minimal nonsupersymmetric lifetime prediction ($\sim 10^{29\text{–}31}\;\mathrm{yr}$) is decisively ruled out by the Super-Kamiokande bound $\tau / B(p \to e^+\pi^0) > 2.4 \times 10^{34}\;\mathrm{yr}$; second, breaking a simply connected simple group down to a subgroup containing $\mathrm{U}(1)$ enforces $\pi_2\bigl(\mathrm{SU}(5) / [(\mathrm{SU}(3)\times\mathrm{SU}(2)\times\mathrm{U}(1))/\mathbb{Z}_6]\bigr) \cong \mathbb{Z}$, flooding the early universe with superheavy 't Hooft–Polyakov magnetic monopoles while still leaving gravitation outside the gauge matrix.
2. **Second classical route — literal extra physical spatial dimensions ($5\mathrm{D}$ Kaluza–Klein and $10\mathrm{D}/11\mathrm{D}$ superstrings)**:
   Stretching from Kaluza (1921) and Klein (1926) to superstring and M-theory compactifications, the rival program reinterprets internal gauge symmetries as isometries of $6$ or $7$ curled-up extra spatial dimensions. Yet as shown in [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md), mistaking internal concept fibers for extra spatial axes violates the associative quaternion-spinor and three-anchor Gram cap on $D = 3$ physical space while spawning unobserved infinite towers of massive Kaluza–Klein (KK) excitations and vast compactification landscape moduli.

Seen from the **three-dimensional concept-field ledger** of [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md), the remedy is immediate: color is never a fourth, fifth, or sixth spatial coordinate, nor need leptons be mixed with quarks inside baryon-number-violating $5 \times 5$ matrices! Within our AF-GUT `MODEL`, the base complex $\mathcal{K}$ is woven purely out of three-dimensional minimal circular-arc trihedra $\Delta\mathcal{T}_\epsilon$, above which four bounded concept fields—the `3D` spatial frame $\mathcal{E}_{\mathrm{space}}^{(3)}$, `1D` blind-plane hypercharge fiber $\mathcal{E}_Y^{(1)}$, `2D` left-handed bivector spinor fiber $\mathcal{E}_{\mathrm{weak}}^{(2)}$, and `3D` unimodular color-volume fiber $\mathcal{E}_{\mathrm{color}}^{(3)}$—coexist concentrically via **direct sum $\oplus$ on the Lie-parameter ledger and tensor product $\otimes$ on quantum state fibers** (matching Clause 2 of [@thm-ch39-hilbert-concept-ledger-and-3d-cap], [`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot), which separates Kronecker-sum local generators from cross-concept correlation sectors):

$$
\mathcal{E}_{\mathrm{total}} \;=\; \mathcal{E}_{\mathrm{space}}^{(3)} \;\oplus\; \mathcal{E}_{Y}^{(1)} \;\oplus\; \mathcal{E}_{\mathrm{weak}}^{(2)} \;\oplus\; \mathcal{E}_{\mathrm{color}}^{(3)}, \qquad \mathfrak{g}_{\mathrm{AF\text{-}GUT}}^{\mathrm{gauge}} \;=\; \mathfrak{u}(1)_Y \;\oplus\; \mathfrak{su}(2)_L \;\oplus\; \mathfrak{su}(3)_C \quad (\dim_{\mathbb{R}} = 1 + 3 + 8 = 12).
$$

This immediately raises the central physical question: **if the local gauge algebra remains the clean $12$-dimensional direct sum $\mathfrak{u}(1)_Y \oplus \mathfrak{su}(2)_L \oplus \mathfrak{su}(3)_C$ without an ambient $\mathrm{SU}(5)$ matrix, why aren't the three gauge couplings independent arbitrary constants at the ultraviolet single-cell scale $\mu_{\mathrm{arc}}$—and how do they lock the exact rational Weinberg angle $\sin^2\theta_W(\mu_{\mathrm{arc}}) = \frac{3}{8}$?** Because all three gauge connections act on **one shared chiral Weyl comparison ledger $\mathcal{H}_{\mathrm{Weyl}}$** and draw radian phase from **one universal comparison clock $\nu_0$**! We formalize this unified geometric architecture in the definition below:

::: {.definition #def-ch39-af-gut-master-connection title="AF-GUT Concentric Master Arc Connection and Universal Arc-Trace Stiffness Postulate (MODEL)"}
Over the minimal circular-arc simplicial complex $\mathcal{K} = \{\Delta\mathcal{T}_\epsilon\}$ clocked at universal comparison frequency $\nu_0 \equiv c / \ell_P$ ([§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md)), **Arc-Field Grand Unified Theory (AF-GUT)** (`MODEL`) is specified by three concentric circular-arc connection layers and one universal stiffness postulate:

1. **Horizontal Intra-Concept Circular-Arc Gauge Transport**: Along each directed spatial link $\ell = (x \to y)$ of $\mathcal{K}$, comparison states on a complete chiral Weyl fermion ledger $\mathcal{H}_{\mathrm{Weyl}} = \mathcal{H}_L \oplus \mathcal{H}_R$ undergo block-preserving unitary circular-arc parallel transport

   $$
   U_\ell \;=\; \exp\!\Bigl(i\,\epsilon_\ell\,\mathcal{A}_\ell\Bigr) \;\in\; \mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C, \qquad \mathcal{A}_\ell \;=\; g_Y B_\ell\,Y \;+\; g_2 W_\ell^i\,T_2^i \;+\; g_3 G_\ell^a\,T_c^a,
   $$

   with zero off-diagonal leptoquark bosons $(X, Y)$, whose boundary holonomy $U_{\partial\Delta\mathcal{T}_\epsilon} = \exp\bigl(i\Omega_{\mathrm{gauge}}(\Delta\mathcal{T}_\epsilon)\bigr)$ around each minimal cell encodes the microscopic gauge triad;
2. **Vertical Cross-Concept Chiral-Folding Bridge (Higgs–Zitterbewegung Operator)**: At each spatial vertex $x \in \mathcal{K}^{(0)}$, an internal operator $D_{\mathrm{int}}\!\bigl(\Phi_H(x)\bigr) \in \operatorname{Hom}(\mathcal{H}_L, \mathcal{H}_R) \oplus \operatorname{Hom}(\mathcal{H}_R, \mathcal{H}_L)$ executes a $90^\circ$ orthogonal circular-arc fold between left-handed doublet fibers $\mathcal{H}_L$ and right-handed singlet fibers $\mathcal{H}_R$ ([`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)), intertwining with horizontal link transport $U_\ell$ via the covariant commutator identity [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula);
3. **Inter-Cell Overconstrained Hinge Curvature and $\nu_0$ Phase Closure**: Across $N \ge 5$ tetrahedral trusses sharing codimension-$2$ hinges $h \in \mathcal{K}^{(1)}$ with Regge dihedral deficits $\delta_h = 2\pi - \sum_{k \ni h}\theta_k$, intra-cell gauge/Higgs holonomies and inter-cell hinge curvature enter one dimensionless master partition functional

   $$
   \mathcal{Z}_{\mathrm{AF\text{-}GUT}} \;=\; \sum_{\{\Delta\mathcal{T}_\epsilon,\, U_\ell,\, \Phi_H,\, \psi\}} \exp\!\Biggl\{\,i\Bigl(\Phi_{\mathrm{arc\text{-}gauge}}[U_\ell] \;+\; \Phi_{\mathrm{Higgs\text{-}Zitter}}[U_\ell, \Phi_H, \psi] \;+\; \frac{1}{8\pi}\sum_{h \in \mathcal{K}^{(1)}} N_h\,\delta_h(\Delta\mathcal{T}_\epsilon)\Bigr)\Biggr\};
   $$

4. **Universal Arc-Trace Stiffness Postulate (`MODEL`)**: At the single-cell ultraviolet arc-unification scale $\mu_{\mathrm{arc}}$, the comparison ledger treats every active Weyl circular-arc twist without concept bias—each unrescaled concept generator $X_A$ rotating $\mathcal{H}_{\mathrm{Weyl}}$ through an infinitesimal radian angle $\delta\vartheta_A$ incurs a quadratic phase stiffness cost proportional to $\kappa_{\mathrm{arc}}\,\operatorname{Tr}_{\mathrm{Weyl}}(X_A^2)$ with one universal dimensionless stiffness $\kappa_{\mathrm{arc}} > 0$. Matching to canonical continuum gauge kinetic normalization $-\frac{1}{4}\int F_{\mu\nu}^A F^{A\,\mu\nu}\,d^4x$ locks every inverse squared coupling at $\mu_{\mathrm{arc}}$ directly to its Weyl quadratic trace:

   $$
   \frac{1}{g_A^2(\mu_{\mathrm{arc}})} \;=\; \kappa_{\mathrm{arc}}\,\operatorname{Tr}_{\mathrm{Weyl}}\!\bigl(X_A^2\bigr).
   $$

:::

Notice the conceptual inversion achieved by Clause 4 of [@def-ch39-af-gut-master-connection]: whereas Georgi–Glashow $\mathrm{SU}(5)$ buys coupling alignment by embedding $\mathfrak{g}_{\mathrm{SM}}$ inside a $24$-generator simple matrix algebra—dragging proton-destabilizing $(X, Y)$ bosons along with it—AF-GUT keeps the gauge group strictly equal to the $12$-generator direct product $\mathrm{U}(1)_Y \times \mathrm{SU}(2)_L \times \mathrm{SU}(3)_C$ and derives ultraviolet coupling unification from **uniform per-radian stiffness on the shared chiral Weyl comparison ledger $\mathcal{H}_{\mathrm{Weyl}}$**!

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="concentric-four-field-monad" height="500"}
Orbit the minimal circular-arc cell $\Delta\mathcal{T}_\epsilon$ and drag the amber handle to inspect the four concentric bounded concept-field shells: cyan marks the 3D spatial-truss and gravitational shell $F_{\mathrm{pos}}$, silver-white marks the 1D $\mathrm{U}(1)_Y$ hypercharge phase arc, purple marks the 2D $\mathrm{SU}(2)_L$ spinor double-cover shell, and blue marks the 3D $\mathrm{SU}(3)_C$ three-anchor color volume lock—preserving the clean $1 + 3 + 8 = 12$ direct-sum gauge algebra with zero $(X, Y)$ leptoquark mixing (green box: `anchored_phase_classification` and `circle_double_cover_history_lift`; four-shell monad reading: `MODEL`).
:::

## 39.11.2 Chiral-Versus-Vector Circular-Arc Trace Theorem, Unique $N_c = 3$ Curve Intersection, and Weinberg Running $\frac{3}{8} \to 0.23129$ {#sec-ch39-11-2}

Let us carry out the Weyl trace algebra of [@def-ch39-af-gut-master-connection] explicitly (`manual derivation`, adopting the Gell-Mann–Nishijima convention $Q = T_3 + Y$ of [§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary) [@ex-ch34-anomaly-and-yukawa-countermodels], where $L_L = (\nu_L, e_L)^\top$ carries $Y_L = -\frac{1}{2}$ and $e_R^c$ carries $Y_{e^c} = +1$). To test how the three-dimensional color-field cap $N_c = 3$ ([§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)) governs electroweak–strong unification, leave the number of colors $N_c \ge 1$ arbitrary at first across one complete left-handed two-component Weyl generation ($4N_c + 3$ Weyl spinors: $Q_L : (\mathbf{N}_c, \mathbf{2}, Y_Q)$, $u_R^c : (\overline{\mathbf{N}}_c, \mathbf{1}, -Q_u)$, $d_R^c : (\overline{\mathbf{N}}_c, \mathbf{1}, -Q_d)$, $L_L : (\mathbf{1}, \mathbf{2}, -\frac{1}{2})$, $e_R^c : (\mathbf{1}, \mathbf{1}, +1)$; adjoining a sterile right-handed neutrino $\nu_R^c : (\mathbf{1}, \mathbf{1}, 0)$ adds zero to every gauge trace):

1. **Vector color trace versus single-chirality weak trace — strong–weak equality singles out $N_c = 3$ (`manual derivation`)**:

   - For any canonically normalized $\mathrm{SU}(N_c)_C$ color generator $T_c^a$ ($N_c \ge 2$, with fundamental Dynkin index $T(\mathbf{N}_c) = T(\overline{\mathbf{N}}_c) = \frac{1}{2}$): the left-handed quark doublet $Q_L = (u_L, d_L)^\top$ contributes $2$ fundamental color triplets while the conjugate singlets $u_R^c, d_R^c$ contribute $2$ antitriplets (vector-like across $L \oplus R$!), so for every $N_c \ge 2$,

     $$
     \operatorname{Tr}_{\mathrm{Weyl}}\!\bigl((T_c^a)^2\bigr) \;=\; 2 \cdot \frac{1}{2} \;+\; 1 \cdot \frac{1}{2} \;+\; 1 \cdot \frac{1}{2} \;=\; 2.
     $$

   - For weak isospin $T_3 = \operatorname{diag}(+\frac{1}{2}, -\frac{1}{2}) \in \mathfrak{su}(2)_L$: **only left-handed doublets** carry $T_3 \neq 0$ (all right-handed singlets have $T_3 = 0$, purely chiral coupling!). Summing $L_L$ ($\frac{1}{4} + \frac{1}{4} = \frac{1}{2}$) and $N_c$ colors of $Q_L$ ($N_c \times \frac{1}{2}$) yields

     $$
     \operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) \;=\; \frac{1}{2} + \frac{N_c}{2} \;=\; \frac{N_c + 1}{2}.
     $$

   Under the Universal Arc-Trace Stiffness Postulate $g_A^{-2}(\mu_{\mathrm{arc}}) = \kappa_{\mathrm{arc}}\operatorname{Tr}_{\mathrm{Weyl}}(X_A^2)$, the ultraviolet strong-to-weak squared-coupling ratio becomes linear in $N_c$:

   $$
   \frac{g_3^2(\mu_{\mathrm{arc}})}{g_2^2(\mu_{\mathrm{arc}})} \;=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)}{\operatorname{Tr}_{\mathrm{Weyl}}\!\bigl((T_c^a)^2\bigr)} \;=\; \frac{(N_c + 1)/2}{2} \;=\; \frac{N_c + 1}{4}!
   $$

   Look at that ratio: because $\mathrm{SU}(2)_L$ acts on only one chirality whereas $\mathrm{SU}(3)_C$ acts vectorially on both chiralities, weak and strong couplings equalize at $\mu_{\mathrm{arc}}$ ($g_3^2 = g_2^2$) **if and only if $N_c = 3$**, where $3$ quark colors plus $1$ lepton channel ($3 + 1 = 4$) compensate the missing right-handed weak chirality!

2. **Anomaly-locked curve versus fixed-charge curve and the chiral-to-vector factor `2`: unique intersection at $N_c = 3 \implies \sin^2\theta_W(\mu_{\mathrm{arc}}) = \frac{3}{8}$ (`manual derivation`)**:
   Next evaluate electric charge $Q = T_3 + Y$ and the Weinberg mixing angle. Because $\operatorname{Tr}_{\mathbf{2}}(T_3 Y) = (+\frac{1}{2} - \frac{1}{2})Y = 0$ on every doublet and $T_3 = 0$ on singlets, $T_3$ and $Y$ are trace-orthogonal: $\operatorname{Tr}_{\mathrm{Weyl}}(T_3 Y) = 0$. From $\frac{1}{e^2(\mu_{\mathrm{arc}})} = \frac{1}{g_2^2(\mu_{\mathrm{arc}})} + \frac{1}{g_Y^2(\mu_{\mathrm{arc}})} = \kappa_{\mathrm{arc}}\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)$, the arc-unification Weinberg angle is the exact trace ratio

   $$
   \sin^2\theta_W(\mu_{\mathrm{arc}}) \;=\; \frac{g_Y^2(\mu_{\mathrm{arc}})}{g_2^2(\mu_{\mathrm{arc}}) + g_Y^2(\mu_{\mathrm{arc}})} \;=\; \frac{e^2(\mu_{\mathrm{arc}})}{g_2^2(\mu_{\mathrm{arc}})} \;=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)}{\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)}.
   $$

   Here one **crucial chiral-versus-vector factor of `2`** must be displayed with complete arithmetic precision: whereas $\mathrm{SU}(2)_L$ couples to a **single (left) chirality** in the numerator $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)$, unbroken electromagnetism $\mathrm{U}(1)_{\mathrm{em}}$ couples **vectorially to both left-handed and right-handed Weyl components**—$(\nu_L, e_L, u_L, d_L)$ and $(e_R^c, u_R^c, d_R^c)$ carry identical squared charges $Q^2$! Summing over all chiral Weyl states therefore multiplies the single-chirality charge sum by an explicit **dual-chirality vector factor `2`**:

   $$
   \operatorname{Tr}_{\mathrm{Weyl}}(Q^2) \;=\; \mathbf{2}\,\Bigl[\bigl(0^2 + (-1)^2\bigr) \;+\; N_c\bigl(Q_u^2 + Q_d^2\bigr)\Bigr]!
   $$

   (Verify this safeguard immediately at $N_c = 3,\; Q_u = +\frac{2}{3},\; Q_d = -\frac{1}{3}$: omitting the vector factor `2` and writing the single-chirality sum $1 + 3\times\frac{5}{9} = \frac{8}{3}$ in the denominator would yield the false fraction $\frac{2}{8/3} = \frac{3}{4} = 0.75 \neq \frac{3}{8}$! Retaining the full dual-chirality Weyl trace $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2) = 2 \times \frac{8}{3} = \frac{16}{3}$—which identically matches $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) + \operatorname{Tr}_{\mathrm{Weyl}}(Y^2) = 2 + \frac{10}{3} = \frac{16}{3}$—gives the exact ratio $\frac{2}{16/3} = \frac{6}{16} = \frac{3}{8} = 0.375000$!)

   Now compare two natural curves across $N_c > 0$:

   - **Curve I (anomaly-cancelled hypercharge curve)**: Cancelling the $[\mathrm{SU}(2)_L]^2\mathrm{U}(1)_Y$ anomaly requires $N_c Y_Q + Y_L = N_c Y_Q - \frac{1}{2} = 0$, locking $Y_Q = \frac{1}{2N_c}$, $Q_u = \frac{N_c + 1}{2N_c}$, and $Q_d = -\frac{N_c - 1}{2N_c}$ (under which $[\mathrm{SU}(N_c)]^2\mathrm{U}(1)_Y$, $\mathrm{grav}^2\mathrm{U}(1)_Y$, and $[\mathrm{U}(1)_Y]^3$ also vanish identically for all $N_c$, while Witten's global $\mathrm{SU}(2)_L$ anomaly requires an even doublet count $N_c + 1$, hence odd $N_c$). Along this curve, $\operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}}$ and $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)_{\mathrm{anom}}$ simplify to closed rational forms:

     $$
     \begin{aligned}
     \operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}} &\;=\; 2\!\left(-\frac{1}{2}\right)^2 + 1^2 + 2N_c\!\left(\frac{1}{2N_c}\right)^2 + N_c\!\left[\left(\frac{N_c+1}{2N_c}\right)^2 + \left(\frac{N_c-1}{2N_c}\right)^2\right] \;=\; \frac{(N_c + 1)(N_c + 2)}{2N_c}, \\
     \operatorname{Tr}_{\mathrm{Weyl}}(Q^2)_{\mathrm{anom}} &\;=\; \operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) + \operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}} \;=\; \frac{N_c + 1}{2} + \frac{(N_c + 1)(N_c + 2)}{2N_c} \;=\; \frac{(N_c + 1)^2}{N_c}!
     \end{aligned}
     $$

     Adding $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)$ and $\operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}}$ completes the exact square $(N_c + 1)^2 / N_c$, yielding the hypercharge normalization factor and anomaly-locked Weinberg angle

     $$
     k_Y(N_c) \;:=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}}}{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)} \;=\; \frac{N_c + 2}{N_c}, \qquad \sin^2\theta_W^{\mathrm{(anom)}}(N_c) \;=\; \frac{(N_c + 1)/2}{(N_c + 1)^2 / N_c} \;=\; \frac{N_c}{2(N_c + 1)}.
     $$

   - **Curve II (fixed empirical quark charges $(+\frac{2}{3}, -\frac{1}{3})$)**: Holding $(Q_u, Q_d) = (+\frac{2}{3}, -\frac{1}{3})$ fixed ($Q_u^2 + Q_d^2 = \frac{5}{9}$) gives $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)_{\mathrm{fixed}} = 2\bigl(1 + \frac{5}{9}N_c\bigr) = \frac{2(9 + 5N_c)}{9}$ and

     $$
     \sin^2\theta_W^{\mathrm{(fixed)}}(N_c) \;=\; \frac{(N_c + 1)/2}{2(9 + 5N_c)/9} \;=\; \frac{9(N_c + 1)}{4(9 + 5N_c)}.
     $$

   Taking their difference cancels the linear $18N_c$ terms identically:

   $$
   \sin^2\theta_W^{\mathrm{(anom)}}(N_c) \;-\; \sin^2\theta_W^{\mathrm{(fixed)}}(N_c) \;=\; \frac{2N_c(9 + 5N_c) - 9(N_c + 1)^2}{4(N_c + 1)(9 + 5N_c)} \;=\; \frac{N_c^2 - 9}{4(N_c + 1)(9 + 5N_c)} \;=\; \frac{(N_c - 3)(N_c + 3)}{4(N_c + 1)(9 + 5N_c)}!
   $$

   On $N_c > 0$, this rational difference vanishes **if and only if $N_c = 3$**! Thus the three-dimensional color-field cap $N_c = 3$ is the **unique positive dimension** that simultaneously achieves **(a) complete local and global chiral anomaly cancellation**, **(b) ultraviolet strong–weak coupling equality $g_3^2 = g_2^2$**, **(c) canonical hypercharge normalization $k_Y(3) = \frac{5}{3}$ (so $g_1^2 := \frac{5}{3}g_Y^2 = g_2^2 = g_3^2$)**, and **(d) the exact ultraviolet Weinberg angle**

   $$
   \sin^2\theta_W(\mu_{\mathrm{arc}}) \;=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)}{\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)} \;=\; \frac{2}{16/3} \;=\; \frac{3}{8} \;=\; 0.375000!
   $$

3. **One-loop renormalization-group running from $\frac{3}{8}$ down to $M_Z = 91.1876\;\mathrm{GeV}$ (`manual derivation` + `Literature`)**:
   Why do precision measurements at the $Z$ pole $M_Z = 91.1876\;\mathrm{GeV}$ find $\sin^2\widehat{\theta}_W(M_Z) = 0.23129 \pm 0.00004$ (PDG 2024 five-flavor $\overline{\mathrm{MS}}$) rather than $0.37500$? Across multi-cell infrared scales, the `1D` Abelian hypercharge circle $\mathrm{U}(1)_Y$ (whose anchored Abelian loop torus is classified by [`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)) undergoes vacuum-polarization screening ($b_1 = +\frac{41}{10} > 0$, weakening toward the infrared), whereas the `2D` non-Abelian spinor double cover $\mathrm{SU}(2)_L$ ($720^\circ$ sheet-exchange lift [`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)) undergoes non-Abelian self-coupling anti-screening ($b_2 = -\frac{19}{6} < 0$, strengthening toward the infrared)! Integrating the Georgi–Quinn–Weinberg (1974) one-loop flow with minimal-SM slope difference $b_1 - b_2 = \frac{41}{10} - (-\frac{19}{6}) = \frac{109}{15}$ from $\alpha_1(\mu_{12}) = \alpha_2(\mu_{12})$ ($\sin^2\widehat{\theta}_W(\mu_{12}) = \frac{3}{8}$) down to $M_Z$ gives

   $$
   \sin^2\widehat{\theta}_W(M_Z) \;=\; \frac{3}{8} \;-\; \frac{5(b_1 - b_2)}{16\pi}\,\widehat{\alpha}(M_Z)\,\ln\!\left(\frac{\mu_{12}}{M_Z}\right) \;=\; 0.37500 \;-\; \frac{109}{48\pi}\,\widehat{\alpha}(M_Z)\,\ln\!\left(\frac{\mu_{12}}{M_Z}\right).
   $$

   With $\widehat{\alpha}(M_Z)^{-1} = 127.930$, evolving from the scale $\mu_{12} = 1.014 \times 10^{13}\;\mathrm{GeV}$ where $\alpha_1 = \alpha_2$ ($\ln(\mu_{12}/M_Z) \approx 25.4345$; this scale is solved from the input $\sin^2\widehat{\theta}_W(M_Z) = 0.23129$) subtracts $0.14371$ from $\frac{3}{8} = 0.37500$ and returns the input **$0.23129$**: one scale fitted to one datum, not a prediction (`NUM`). At the same time, upholding the epistemic rigor of [§39.9](ch39-s09-unified-arc-forces-and-planck-convergence.md) and [§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary), we note candidly that if one imposes naive threshold-free three-line concurrency $\alpha_1 = \alpha_2 = \alpha_3$ with $\alpha_3(M_Z) = 0.1180$ ($\mu_{\mathrm{GQW}} \approx 6.76 \times 10^{14}\;\mathrm{GeV}$), the minimal-SM one-loop Georgi–Quinn–Weinberg formula yields $\sin^2\widehat{\theta}_W^{\mathrm{(GQW)}}(M_Z) \approx 0.2076$, mirroring the $10^{13}\text{–}10^{17}\;\mathrm{GeV}$ near-meeting triangle spread $\Delta\alpha^{-1} > 3.66$ ($\approx 3.664$). Closing that $\Delta\alpha^{-1} \approx 3.664$ inverse-coupling triangle residual from discrete minimal-arc lattice-to-continuum matching thresholds and higher-loop/gravitational operators is registered explicitly in [@prob-ch39-af-gut-threshold-and-proton-stability], Clause 1.

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="weinberg-angle-rg-running" height="500"}
Slide the amber energy-scale cursor $\mu$ along the silver-white scale axis from $M_Z$ to the Planck regime to cross-check the two Weinberg-angle curves and one-loop inverse-coupling trajectories: the anomaly-cancelled curve $\frac{N_c}{2(N_c+1)}$ and fixed-charge curve $\frac{9(N_c+1)}{4(9+5N_c)}$ intersect uniquely at the blue three-color lock $N_c = 3$ with $\sin^2\theta_W = \frac{3}{8} = 0.375000$, linking the electroweak crossing $\log_{10}(\mu_{12}/\mathrm{GeV}) = 13.0060$ to $\sin^2\widehat{\theta}_W(M_Z) = 0.23129$ (one-loop RG literature: `ARGUED`; crossings and triangle residual: `NUM`; threshold closure in the drawer's red `OPEN` marker).
:::

## 39.11.3 Cross-Concept Higgs Zitterbewegung Bridge, $\nu_0$ Einstein Closure, and the Four-Point Proton & Monopole Audit {#sec-ch39-11-3}

Three decisive tests complete the AF-GUT architecture: **how rest masses arise without inventing an ad hoc fifth force, how all four internal concept fields source Einstein's gravitational equations under the universal clock $\nu_0$, and how AF-GUT avoids both proton decay and cosmological magnetic monopoles.**

1. **Higgs field $\Phi_H \leftrightarrow D_{\mathrm{int}}$ as the cross-concept chiral Zitterbewegung bridge (`MODEL` + `LEAN ✓` algebraic anchor, contrasted with Connes's spectral Standard Model `Literature`)**:
   In the unbroken phase $\Phi_H = 0$, every chiral Weyl fermion commits $100\%$ of its universal comparison frequency $\nu_0$ to spatial hopping ($\beta = 1,\; d\tau/dt = 0$, locked onto the null cone by [`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)), racing masslessly at $c = \ell_P\nu_0$ without rest-frame memory ([Chapter 36, §36.1](ch36-s01-light-and-memory.md)). Rest mass emerges from Clause 2 of [@def-ch39-af-gut-master-connection]: alongside **horizontal link unitaries** $U_\ell$ connecting adjacent spatial cells, each vertex carries the **vertical cross-concept circular-arc operator** $D_{\mathrm{int}}(\Phi_H)$ folding left-handed doublets $\mathcal{H}_L$ into right-handed singlets $\mathcal{H}_R$!
   By the frozen covariant commutator theorem [`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula) ($U\cdot f - f\cdot U = (\mathit{translated} - f)\cdot U$, `LEAN ✓`), failing to commute horizontal spatial transport $U_\ell$ with vertical chiral folding $f = \Phi_H$ generates the covariant Higgs derivative $D_\mu\Phi_H$, while purely vertical curvature generates the Mexican-hat potential $V(\Phi_H) = -\mu_H^2\Phi_H^\dagger\Phi_H + \lambda(\Phi_H^\dagger\Phi_H)^2$. Once vacuum condensation locks the cross-concept fold angle at $\langle\Phi_H\rangle = \frac{1}{\sqrt{2}}(0, v)^\top$ ($v \approx 246.22\;\mathrm{GeV}$), two mass mechanisms fire in unison:

   - **Gauge sector `2 + 1 = 3` longitudinal closure**: Three broken coset circular-arc phases are absorbed by the $2$ transverse polarizations of $W^\pm, Z^0$ to close massive `3D` Proca standing waves $m_W = \frac{1}{2}g_2 v$ and $m_Z = \frac{1}{2}\sqrt{g_2^2 + g_Y^2}\,v = m_W / \cos\theta_W$, while $Q = T_3 + Y$ annihilates $\langle\Phi_H\rangle$ ($Q\langle\Phi_H\rangle = 0$) to keep the photon strictly massless ($m_\gamma \equiv 0$);
   - **Fermion sector chiral Zitterbewegung localization**: Yukawa couplings $-y_\psi\overline{\psi}_L\Phi_H\psi_R + \mathrm{h.c.}$ fold forward null hopping across $\mathcal{H}_L \leftrightarrow \mathcal{H}_R$ at chiral coupling rate $\omega_{\mathrm{couple}} = m_\psi c^2/\hbar$ (free-Dirac Zitterbewegung beat frequency $\omega_Z = 2m_\psi c^2/\hbar$, [Chapter 18](ch18-spinors-and-gauge-curvature.md) [@rem-dirac-zitterbewegung-literature]), diverting a fraction of $\nu_0$ into localized `3D` standing-wave rest mass

     $$
     m_\psi \;=\; \frac{y_\psi\,v}{\sqrt{2}}.
     $$

   Historically, pairing horizontal gauge connections with a vertical internal Higgs operator parallels the **almost-commutative spectral Standard Model** $M_4 \times F$ of Connes (1995) and Chamseddine & Connes (1997, 2012; `Literature`, [@rem-ch39-georgi-glashow-connes-jacobson-literature], Item 4); ontologically, however, Connes's heat-kernel spectral action $\operatorname{Tr}\!\bigl(f(D/\Lambda)\bigr)$ presupposes a smooth four-dimensional Euclidean Riemannian background manifold $M_4$ (and initially predicted $m_H \approx 170\;\mathrm{GeV}$ prior to the 2012 real-singlet extension matching $m_H \approx 125.1\;\mathrm{GeV}$), whereas AF-GUT presupposes no continuum background manifold—both spatial simplices and internal concept fibers arise from discrete circular-arc comparisons clocked by $\nu_0$.

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="higgs-cross-concept-zitterbewegung" height="500"}
Adjust the amber cross-concept Higgs bridge handle $\tilde{\Phi}_H$ to watch horizontal spatial link transport intertwine noncommutatively with vertical $90^\circ$ chiral folding across $\mathcal{H}_L \leftrightarrow \mathcal{H}_R$: the purple $\mathrm{SU}(2)_L$ spinor shell and silver-white $\mathrm{U}(1)_Y$ phase shell close massive $W^\pm, Z^0$ standing waves via `2 + 1 = 3` longitudinal absorption while keeping the photon massless, and null fermion hopping folds into localized Zitterbewegung rest mass (green box: `covariant_commutator_formula` and `square_eq_neg_one_of_skewAdjoint_unitary`; electroweak literature: `ARGUED`; mass ratios: `NUM`; chiral bridge: `MODEL`).
:::

2. **Universal-clock $\nu_0$ Pythagorean closure: four-field clock load sources Einstein's field equations (`MODEL` + `LEAN ✓` Pythagorean/cochain anchors)**:
   In the constant-clock hardware ledger of [§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md), every minimal cell runs at $\nu_0 \equiv \mathrm{const}$. Under the constant-clock budget postulate (`MODEL`; the Lagrange–Gram identity and the nonnegativity of Born weights supply only the algebraic fact that squared terms are nonnegative, while the budget equation itself is postulated), and using the Lagrange–Gram Pythagorean identity [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) ([@thm-ch39-af-gut-arc-field-unification], Clause 6, `LEAN ✓`) and nonnegative rank-one Born squared weights [`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight) (`LEAN ✓`), Abelian flux $\Omega_{\mathrm{U}(1)}$, weak double-cover curvature $\Omega_{\mathrm{SU}(2)}$, color gluon flux $\Omega_{\mathrm{SU}(3)}$, and cross-concept Higgs–Yukawa standing waves $\Phi_H$ all tax the per-tick squared budget with strictly nonnegative, unscreened clock loads:

   $$
   \nu_\tau^2 \;+\; \nu_{\mathrm{move}}^2 \;+\; \nu_{\mathrm{arc\text{-}load}}^2\!\bigl[\Omega_{\mathrm{U}(1)},\,\Omega_{\mathrm{SU}(2)},\,\Omega_{\mathrm{SU}(3)},\,\Phi_H\bigr] \;=\; \nu_0^2.
   $$

   Across overconstrained trusses ($N \ge 5$), [`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness) ([@thm-ch39-af-gut-arc-field-unification], Clause 5, `LEAN ✓`) proves that nonzero tetrahedral coboundary defects ($\operatorname{tetraDefects}(F) > 0$) cannot be gauged away by any flat edge potential (the theorem itself is the exactness criterion for 2-cochains with values in an abelian group: the tetrahedral coboundary vanishes everywhere if and only if $F$ is the coboundary of an edge potential; reading nonzero defects as gravitational curvature frustration is an analogy of this book, `MODEL`). Under coarse-grained fat-simplex averaging and local causal-horizon Clausius balance ($\delta Q = T\,dS$, Sakharov 1967 and Jacobson 1995 `Literature`), stationary-phase variation $\delta\Phi_{\mathrm{AF\text{-}GUT}} = 0$ can, under those literature premises, be read as equating **spatial inter-cell Regge hinge curvature** on the left-hand side to **intra-cell four-field circular-arc clock load** on the right-hand side (`MODEL` continuum target, with full Lorentzian spin-$2$ emergence audited under [@prob-ch34-gravity-dynamics-and-coupling]):

   $$
   G_{\mu\nu} \;+\; \Lambda_{\mathrm{cos}}\,g_{\mu\nu} \;=\; \frac{8\pi G}{c^4}\,T_{\mu\nu}\!\bigl[\Omega_{\mathrm{U}(1)},\,\Omega_{\mathrm{SU}(2)},\,\Omega_{\mathrm{SU}(3)},\,\Phi_H\bigr].
   $$

   Two built-in geometric cutoffs flank this equation: in the **ultraviolet**, shrinking down to a single triangular face or tetrahedral minimal arc shell ($N \in \{3, 4\}$; degenerate $N = 1, 2$ point/rod states likewise carry zero redundant constraints) drives the non-collinear rigidity surplus ($N \ge 3$, spherical-Euler anchor [`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact)) $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ identically to zero (reinforced by strict positive Delone packing separation in cut-and-project model sets, `1D` formal prototype [`exists_golden_modelSet_delone`](lean:D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone) in [Coda §C.3](coda-s03-golden-cut-observers.md#sec-coda-trureturing-golden-cut-observer), `LEAN ✓`), so that in this model there is no independent inter-cell deficit degree of freedom below a single cell (`MODEL`; this is not a proof of ultraviolet finiteness); in the **infrared**, a minimal angular comparison step $\epsilon_{\min} \sim N_{\mathrm{horizon}}^{-1}$ across $N_{\mathrm{horizon}} \sim R_H/\ell_P \sim 10^{61}$ carries positive sagitta $1 - \cos\epsilon_{\min} \approx \frac{1}{2}\epsilon_{\min}^2 \sim N_{\mathrm{horizon}}^{-2} \sim 10^{-122}$ (`MODEL` kinematic correspondence; per the anti-circularity guardrail of [§34.23](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor) [@ex-ch34-horizon-blindspot-anticircularity], non-circular derivation without assuming $R_H$ remains registered in [@prob-ch39-af-gut-threshold-and-proton-stability], Clause 4).

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="einstein-pythagorean-clock-balance" height="500"}
Inspect on the universal-clock $\nu_0$ Pythagorean balance how gravitation closes with internal gauge loads: nonnegative squared clock loads from silver-white $\mathrm{U}(1)_Y$ phase, purple $\mathrm{SU}(2)_L$ spinor curvature, blue $\mathrm{SU}(3)_C$ color flux, and the amber Higgs bridge $\tilde{\Phi}_H$ jointly compress the cyan proper-time share $\nu_\tau / \nu_0$ while driving Regge hinge deficits across the cyan spatial shell $F_{\mathrm{pos}}$ for $N \ge 5$ trusses (green box: `lagrange_gram_identity` and `tetra_defects_incidence_repair_and_exactness`; balance and defect counts: `NUM`; continuum spin-$2$ limit in the drawer's red `OPEN` marker).
:::

3. **Four-point proton stability, monopole, and nonperturbative topology audit (`manual derivation` + `Literature`)**:
   AF-GUT has the gauge group of the Standard Model, so for baryon-number conservation and topological defects it inherits the Standard Model's **four sharp selection rules**; these separate it from simple-group unification, not from the Standard Model itself:

   - **(i) Identically zero gauge-boson proton decay ($\Gamma_{\mathrm{gauge}}(p \to e^+\pi^0) \equiv 0$)**: Because $\mathcal{E}_{\mathrm{color}}^{(3)}$ and $\mathcal{E}_{\mathrm{weak}}^{(2)} \oplus \mathcal{E}_Y^{(1)}$ unify via shared clock-budget stiffness rather than an $\mathrm{SU}(5)/\mathrm{SO}(10)$ matrix embedding, **superheavy $(X, Y)$ leptoquark gauge bosons are completely absent**. Gauge-mediated single-proton decay vanishes identically,

     $$
     \Gamma_{\mathrm{gauge}}^{\mathrm{AF\text{-}GUT}}(p \to e^+ \pi^0) \;\equiv\; 0,
     $$

     in full agreement with the Super-Kamiokande bound $\tau / B(p \to e^+\pi^0) > 2.4 \times 10^{34}\;\mathrm{yr}$ ($90\%\;\mathrm{CL}$, **A. Takenaka et al.**, *Phys. Rev. D* **102**, 112011, 2020). Even if Planck-cell effects at $E_P \approx 1.22 \times 10^{19}\;\mathrm{GeV}$ permitted dimension-$6$ operators $\frac{c_6}{M_P^2}qqq\ell$ with $c_6 \sim \mathcal{O}(1)$, dimensional scaling gives $\tau_p^{\mathrm{Planck}} \sim M_P^4 / m_p^5 \sim 10^{45}\;\mathrm{yr} \gg 2.4 \times 10^{34}\;\mathrm{yr}$ (whether concept-bundle orthogonality enforces $c_6 \equiv 0$ exactly is posed in [@prob-ch39-af-gut-threshold-and-proton-stability], Clause 3).
   - **(ii) Zero topological GUT magnetic monopoles ($\pi_2(S^3) = 0$)**: With no high-energy symmetry breaking from a simply connected simple group into $\mathrm{U}(1)_Y$, the sole gauge coset transition is electroweak breaking $[\mathrm{SU}(2)_L \times \mathrm{U}(1)_Y] / \mathrm{U}(1)_{\mathrm{em}} \cong S^3$. Since the second homotopy group of the $3$-sphere vanishes identically,

     $$
     \pi_2(S^3) \;=\; 0,
     $$

     **topological GUT magnetic monopoles do not exist**, eliminating Preskill's (1979) cosmological monopole glut at the root!
   - **(iii) Vector-like QCD instantons strictly conserve baryon number ($\Delta B_{\mathrm{QCD}} = 0$) alongside Skyrmion protection**: Although $\pi_3(\mathrm{SU}(3)_C) = \mathbb{Z}$ classifies Euclidean BPST gluon instantons (Belavin–Polyakov–Schwarz–Tyupkin, 1975), $\mathrm{SU}(3)_C$ couples **vectorially** to $q_L$ and $q_R$, lifting axial $\mathrm{U}(1)_A$ ($\eta'$ mass) while conserving vector baryon number identically, **$\Delta B_{\mathrm{QCD}} \equiv 0$**; in the confined infrared phase, chiral meson coset winding $\pi_3(S^3) = \mathbb{Z}$ topologically protects integer Skyrmion baryon charge ([§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers)).
   - **(iv) Chiral electroweak anomaly $\Delta B = \Delta L = 3\Delta N_{\mathrm{CS}} \in 3\mathbb{Z}$ and the factor-of-$2$ exponent separating tunneling amplitude from transition rate**: Only chiral $\mathrm{SU}(2)_L$ ($\pi_3(\mathrm{SU}(2)_L) = \mathbb{Z}$) shifts baryon and lepton number across Chern–Simons jumps $\Delta N_{\mathrm{CS}} \in \mathbb{Z}$ via 't Hooft's anomaly (1976):

     $$
     \Delta B \;=\; \Delta L \;=\; N_{\mathrm{gen}}\,\Delta N_{\mathrm{CS}} \;=\; 3\,\Delta N_{\mathrm{CS}} \;\in\; 3\mathbb{Z}!
     $$

     Two exact consequences follow: first, $\Delta B \in 3\mathbb{Z}$ **strictly forbids $|\Delta B| = 1$ single-proton decay** ($p \nrightarrow e^+\pi^0,\; p \nrightarrow \bar{\nu}K^+$) and $|\Delta B| = 2$ dinucleon decay at all perturbative and nonperturbative orders, allowing only $|\Delta B| = 3$ three-baryon transitions (and early-universe electroweak sphaleron baryogenesis above $T \sim 130\text{–}160\;\mathrm{GeV}$, Klinkhamer & Manton 1984); second, at zero temperature one must never conflate the WKB **tunneling amplitude** with the Born-squared **transition rate**—from the Euclidean BPST instanton action $S_{\mathrm{inst}} = \frac{8\pi^2}{g_2^2(M_Z)} = \frac{2\pi}{\alpha_2(M_Z)} \approx 2\pi \times 29.59 \approx 185.9$, the **amplitude** scales as

     $$
     \mathcal{A}_{\mathrm{inst}} \;\propto\; \exp\!\left(-\frac{8\pi^2}{g_2^2}\right) \;=\; e^{-S_{\mathrm{inst}}} \;\approx\; e^{-185.9} \;\sim\; 1.8 \times 10^{-81},
     $$

     whereas the physical zero-temperature $\Delta B = 3$ **rate** is the modulus squared ([`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)), carrying an exact factor of $2$ in the exponent:

     $$
     \Gamma_{\Delta B = 3}^{(T = 0)} \;\propto\; \bigl\lvert\mathcal{A}_{\mathrm{inst}}\bigr\rvert^2 \;\propto\; \exp\!\left(-\frac{16\pi^2}{g_2^2}\right) \;=\; e^{-2 S_{\mathrm{inst}}} \;\approx\; e^{-371.8} \;\sim\; 10^{-162\text{–}165},
     $$

     more than a hundred orders of magnitude slower than the inverse age of the universe!

## 39.11.4 Formal Anchor Theorem, Four-Part Audit Benchmark, Open Frontier, and Grand Finale Handoff to *Outside All Spheres* {#sec-ch39-11-4}

We assemble below the **six frozen Lean 4 kernel declarations** anchoring AF-GUT's algebraic, topological, cohomological, and clock-budget skeleton—covariant commutator factorization, $90^\circ$ skew-adjoint unitary complex structure $R^2 = -I_n$, anchored Abelian holonomy torus classification, spinor $360^\circ$ sheet-exchange path lifting, tetrahedral coboundary defect exactness, and the Lagrange–Gram Pythagorean identity:

::: {.theorem #thm-ch39-af-gut-arc-field-unification title="Covariant Commutator Factorization, Skew-Adjoint Unitary Complex Structure, Anchored Abelian Holonomy Classification, Double-Cover Sheet Lift, Tetrahedral Defect Exactness, and Lagrange-Gram Pythagorean Closure" lean="D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness,D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
Across the frozen quantum-algebra, anchored-holonomy, concept-topology double-cover, simplex two-cochain repair, and quantum-bounds modules of `trureturing`, the following six theorems hold simultaneously:

1. **Universal Ring Factorization of the Covariant Commutator** ([`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)): Let $B$ be any unital ring (`[Ring B]`, without assuming commutativity, topology, or norm), and let $U, f, \mathit{translated} \in B$ satisfy $\operatorname{SemiconjBy}\;U\;f\;\mathit{translated}$ ($U \cdot f = \mathit{translated} \cdot U$). Then

   $$
   U \cdot f - f \cdot U \;=\; (\mathit{translated} - f) \cdot U.
   $$

2. **Negative-Identity Square of Skew-Adjoint Right-Unitary Matrices** ([`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)): Let $n$ be a finite decidable index type (`[Fintype n]`, `[DecidableEq n]`), and let $R \in M_n(\mathbb{C})$ satisfy skew-adjointness $R^\dagger = -R$ and right-unitarity $R R^\dagger = I_n$. Then

   $$
   R^2 \;=\; -I_n.
   $$

3. **Anchored Abelian Circular-Arc Phase Classification and Quotient Torus Isomorphism** ([`anchored_phase_classification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification)): Let $V, E$ be finite types (`[Fintype V]`, `[Fintype E]`), $s, t : E \to V$, $T \subseteq E$, $ht : \operatorname{NamedSpanningTree}\;s\;t\;T$, and $R \subseteq V$ an anchor set with $r \in R$. Write $\chi = \operatorname{coordinateHom}\;ht\;R\;r$, $\sigma = \operatorname{phaseSection}\;s\;t\;T\;R\;r$, $N = \operatorname{range}(\operatorname{coboundary}\;s\;t\;R)$, and $c = \lvert\{e : E \mid e \notin T\}\rvert$, $a = \lvert\{x : V \mid x \in R \land x \neq r\}\rvert$, $n = \lvert V\rvert$, $m = \lvert E\rvert$, $k = \lvert R\rvert$. Then: (a) $\chi(\operatorname{gauge}\;s\;t\;g\;u) = \chi(u)$ for all $g \in \operatorname{anchoredGroup}(R)$ and $u : E \to \mathrm{Circle}$, with $\chi(u) = \chi(w) \iff \exists g \in \operatorname{anchoredGroup}(R),\; \operatorname{gauge}\;s\;t\;g\;u = w$; (b) $\sigma$ is a continuous multiplicative right inverse ($\chi \circ \sigma = \mathrm{id}$) and $\ker(\chi) = N$ is closed; (c) the induced quotient map $q : ((E \to \mathrm{Circle}) / N) \simeq_{\mathrm{t}*} \operatorname{Coordinates}(T, R, r)$ is a compact Hausdorff topological-group isomorphism; and (d) $\lvert T\rvert + 1 = n$, $c = m + 1 - n$, $a = k - 1$, $c + a = m + k - n$, with $\operatorname{Nonempty}\bigl(\operatorname{Coordinates}(T, R, r) \simeq_{\mathrm{t}*} (\operatorname{Fin}(m + k - n) \to \mathrm{Circle})\bigr)$.

4. **Unique Circle Double-Cover Path Lifting and $360^\circ$ Antipodal Sheet Exchange** ([`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)): Let $I = [0, 1] \subset \mathbb{R}$, $\operatorname{square} : \mathrm{Circle} \to \mathrm{Circle}$ ($z \mapsto z^2$), and $\mathrm{covering} := (\operatorname{Circle.isQuotientCoveringMap\_npow}\;2).\mathrm{isCoveringMap}$. For every $\mathrm{basePath} \in C(I, \mathrm{Circle})$, $\mathrm{initial} \in \mathrm{Circle}$, and $\mathrm{initialOver} : \mathrm{basePath}(0) = \operatorname{square}(\mathrm{initial})$, $\mathrm{lifted} := \mathrm{covering.liftPath}(\mathrm{basePath}, \mathrm{initial}, \mathrm{initialOver})$ uniquely satisfies $\operatorname{square} \circ \mathrm{lifted} = \mathrm{basePath}$ and $\mathrm{lifted}(0) = \mathrm{initial}$; no continuous global section $s : \mathrm{Circle} \to \mathrm{Circle}$ with $(s(z))^2 = z$ exists, and lifting $\mathrm{fullTurn}(t) := \operatorname{Circle.exp}(2\pi t)$ from $\mathrm{initial} = 1$ satisfies

   $$
   \operatorname{square} \circ \mathrm{lifted} = \mathrm{fullTurn} \;\land\; \mathrm{lifted}(0) = 1 \;\land\; \mathrm{lifted}(1) = -1.
   $$

5. **Tetrahedral Coboundary Curvature Defect Identity, Anchored Repair Bound, and One-Cochain Exactness** ([`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)): Let $V$ be a finite nonempty vertex type (`[Fintype V]`, `[Nonempty V]`), $A$ an additive commutative group (`[AddCommGroup A]`), and $F : V \to V \to V \to A$ a ternary two-cochain. Then

   $$
   \begin{aligned}
   &\left(\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)\right)
   \;\land\; \bigl(\exists r \in V,\; \lvert V\rvert \cdot \operatorname{faceErrors}(F, r) \le \operatorname{tetraDefects}(F)\bigr) \\
   &\quad \land\; \bigl(\forall \mathrm{edge} : V \to V \to A,\; \operatorname{tetraDefects}(F) \le 4\lvert V\rvert \cdot \operatorname{edgeErrors}(F, \mathrm{edge})\bigr) \\
   &\quad \land\; \Bigl(\bigl(\forall r, i, j, k \in V,\; F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) = 0\bigr) \\
   &\qquad\quad \Longleftrightarrow\; \bigl(\exists \mathrm{edge} : V \to V \to A,\; \forall i, j, k \in V,\; F(i, j, k) = \mathrm{edge}(j, k) - \mathrm{edge}(i, k) + \mathrm{edge}(i, j)\bigr)\Bigr).
   \end{aligned}
   $$

6. **Lagrange–Gram Inner- and Exterior-Product Pythagorean Identity** ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)): For any index type $\iota$, finite set $s : \mathrm{Finset}\,\iota$, and real functions $u, v : \iota \to \mathbb{R}$,

   $$
   \left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
   $$

:::

::: proof
Clause 1 expands $(\mathit{translated} - f)\cdot U = \mathit{translated}\cdot U - f\cdot U$ via right distributivity in `Ring B` and substitutes $U\cdot f = \mathit{translated}\cdot U$ (see [@prop-covariant-commutator]). Clause 2 substitutes $R^\dagger = -R$ into $R R^\dagger = I_n$ to obtain $-R^2 = I_n$, hence $R^2 = -I_n$ (see [@lemma-skew-adjoint-unitary-square]). Clause 3 cancels interior vertex gauge factors around fundamental chord loops and fixed anchors in $R$ via tree-transport endpoint covariance, reconstructs anchored gauge equivalences from root-phase ratios, verifies $\chi \circ \sigma = \mathrm{id}$ and $\ker(\chi) = N$ using unit tree values of `sectionLoops`, and deduces the compact Hausdorff quotient isomorphism and torus dimension $c + a = (m + 1 - n) + (k - 1) = m + k - n$ (see [@cor-anchored-phase-classification]). Clause 4 combines covering-map path-lifting uniqueness with global non-sectionability and verifies explicitly that $\operatorname{Circle.exp}(\pi t)$ lifts $\mathrm{fullTurn}(t) = \operatorname{Circle.exp}(2\pi t)$ from $1$ to $-1$. Clause 5 rewrites each tetrahedral coboundary as an $r$-anchored face-reconstruction error in $A$, sums over $r \in V$ for the first identity, extracts a minimum-error anchor by averaging, applies a four-face union bound for $4\lvert V\rvert$, and sets $\mathrm{edge}(x, y) := F(r_0, x, y)$ whenever all tetrahedral coboundaries vanish (see [@thm-ch34-trihedron-rigidity-and-complete-graph], Clause 8). Clause 6 expands $(u_i v_j - u_j v_i)^2$ inside the double sum and divides by $2$. The full proof is checked by the Lean kernel.
:::

External physics literature governing extra-dimensional unification, simple-group GUTs, monopoles and instantons, noncommutative spectral geometry, and thermodynamic emergent gravity is attributed below:

::: {.remark #rem-ch39-georgi-glashow-connes-jacobson-literature title="Epistemic Boundaries on Kaluza-Klein Extra Dimensions, Simple-Group GUTs & Weinberg Running, Proton Decay & Instanton/Monopole Topology, Connes Spectral Geometry, and Sakharov-Jacobson Gravity (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Our Arc-Field Grand Unified Theory (`MODEL`) is benchmarked strictly against five bodies of external theoretical and experimental literature (none of which are formalized as continuum $3+1\mathrm{D}$ quantum field or cosmological theorems in `trureturing@dev`):

1. **Kaluza–Klein Extra-Dimensional Unification**: Geometrizing Abelian gauge potentials as off-diagonal metric components of a compact fifth spatial circle originates in T. Kaluza (*Sitzungsber. Preuss. Akad. Wiss. Berlin*, 966–972, 1921) and O. Klein (*Z. Phys.* **37**, 895–906, 1926, DOI `10.1007/BF01397481`), prefiguring $10\mathrm{D}/11\mathrm{D}$ superstring and M-theory compactifications;
2. **Simple-Group $\mathrm{SU}(5)$ / $\mathrm{SO}(10)$ GUTs and Renormalization-Group Running of $\sin^2\theta_W = \frac{3}{8}$**: Embedding $G_{\mathrm{SM}}$ into rank-$4$ $\mathrm{SU}(5)$ (introducing $12$ $(X, Y)$ leptoquark bosons and fixing $\sin^2\theta_W = \frac{3}{8}$ at unification) is due to H. Georgi and S. L. Glashow (*Phys. Rev. Lett.* **32**, 438–441, 1974, DOI `10.1103/PhysRevLett.32.438`); one-loop RG running of $\sin^2\theta_W$ down to the electroweak scale was established by H. Georgi, H. R. Quinn, and S. Weinberg (*Phys. Rev. Lett.* **33**, 451–454, 1974, DOI `10.1103/PhysRevLett.33.451`); unifying a $16$-component Weyl family (with $\nu_R$) inside a single spinor representation of $\mathrm{SO}(10)$ was formulated by H. Fritzsch and P. Minkowski (*Ann. Phys.* **93**, 193–266, 1975, DOI `10.1016/0003-4916(75)90211-0`);
3. **Topological Monopoles, BPST Instantons, Electroweak Baryon Anomaly, and the Super-Kamiokande Proton-Lifetime Bound**: Topological $\pi_2(G/H) = \mathbb{Z}$ magnetic monopoles and cosmological monopole overproduction originate in G. 't Hooft (*Nucl. Phys. B* **79**, 276–284, 1974), A. M. Polyakov (*JETP Lett.* **20**, 194–195, 1974), and J. P. Preskill (*Phys. Rev. Lett.* **43**, 1365–1368, 1979, DOI `10.1103/PhysRevLett.43.1365`); Euclidean self-dual $\pi_3(\mathrm{SU}(2)) = \mathbb{Z}$ Yang–Mills instantons ($S_{\mathrm{inst}} = 8\pi^2/g^2$) are due to A. A. Belavin, A. M. Polyakov, A. S. Schwarz, and Yu. S. Tyupkin (*Phys. Lett. B* **59**, 85–87, 1975, DOI `10.1016/0370-2693(75)90163-X`); the chiral electroweak selection rule $\Delta B = \Delta L = N_{\mathrm{gen}}\Delta N_{\mathrm{CS}}$ and zero-temperature squared rate $\propto e^{-16\pi^2/g_2^2}$ were derived by G. 't Hooft (*Phys. Rev. Lett.* **37**, 8–11, 1976, DOI `10.1103/PhysRevLett.37.8`; *Phys. Rev. D* **14**, 3432–3450, 1976), with thermal sphaleron saddle barriers constructed by F. R. Klinkhamer and N. S. Manton (*Phys. Rev. D* **30**, 2212–2220, 1984, DOI `10.1103/PhysRevD.30.2212`); the experimental lower bound $\tau / B(p \to e^+\pi^0) > 2.4 \times 10^{34}\;\mathrm{yr}$ ($90\%\;\mathrm{CL}$) was established by the Super-Kamiokande Collaboration, **A. Takenaka et al.** (*Phys. Rev. D* **102**, 112011, 2020, DOI `10.1103/PhysRevD.102.112011`);
4. **Almost-Commutative Noncommutative Geometry and the Spectral Standard Model**: Interpreting the Higgs doublet as the discrete finite-space Dirac component on $M_4 \times F$ and extracting Yang–Mills–Higgs plus gravitational terms from a spectral action is due to A. Connes (*J. Math. Phys.* **36**, 6194–6231, 1995, DOI `10.1063/1.531241`) and A. H. Chamseddine and A. Connes (*Commun. Math. Phys.* **186**, 731–750, 1997, DOI `10.1007/s002200050126`; real-singlet extension compatible with $m_H \approx 125\;\mathrm{GeV}$ in *J. High Energy Phys.* **2012**(09), 104, 2012, DOI `10.1007/JHEP09(2012)104`);
5. **Induced Vacuum Elasticity and Horizon-Thermodynamic Einstein Equations**: Interpreting Einstein–Hilbert gravity as metric elasticity induced by quantum vacuum fluctuations was proposed by A. D. Sakharov (*Dokl. Akad. Nauk SSSR* **177**, 70–71, 1967; *Sov. Phys. Dokl.* **12**, 1040–1041, 1968), and deriving Einstein's field equations as a local Rindler horizon equation of state from $\delta Q = T\,dS$ and horizon area entropy is due to T. Jacobson (*Phys. Rev. Lett.* **75**, 1260–1263, 1995, DOI `10.1103/PhysRevLett.75.1260`).

:::

The four-part worked audit below verifies the unique $N_c = 3$ trace intersection across $N_c \in \{1 \dots 5\}$, one-loop Weinberg running from $M_Z$ to $E_P$, representative Higgs–Zitterbewegung masses, and the $\nu_0$ clock-budget and electroweak instanton exponents:

::: {.example #ex-ch39-af-gut-weinberg-higgs-einstein-audit title="Four-Part AF-GUT Quantitative Audit: Unique N_c=3 Curve Intersection, Weinberg 3/8 Running, Higgs Zitterbewegung Masses, and Clock-Budget Instanton Exponents"}
**Manual derivation and empirical benchmark verification (with CODATA 2022 / PDG 2024 inputs `NUM`).** All tables below use pure single-line cells:

1. **Part I: Chiral-versus-vector Weyl traces and unique Weinberg-angle curve intersection across $N_c \in \{1, 2, 3, 4, 5\}$ (`manual derivation`)**:
   Evaluating $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) = \frac{N_c+1}{2}$, $\operatorname{Tr}_{\mathrm{Weyl}}(Y^2)_{\mathrm{anom}} = \frac{(N_c+1)(N_c+2)}{2N_c}$, $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)_{\mathrm{anom}} = \frac{(N_c+1)^2}{N_c}$, $\frac{g_3^2}{g_2^2} = \frac{N_c+1}{4}$ (algebraic continuation at $N_c = 1$), $\sin^2\theta_W^{\mathrm{(anom)}} = \frac{N_c}{2(N_c+1)}$, and $\sin^2\theta_W^{\mathrm{(fixed)}} = \frac{9(N_c+1)}{4(9+5N_c)}$ from [§39.11.2](#sec-ch39-11-2):

   | Color Dim $N_c$ | Weak $\operatorname{Tr}(T_3^2)$ | Anomaly $\operatorname{Tr}(Y^2)_{\mathrm{anom}}$ | Anomaly $\operatorname{Tr}(Q^2)_{\mathrm{anom}}$ | UV Ratio $g_3^2 / g_2^2$ | Anomaly $\sin^2\theta_W^{\mathrm{(anom)}}$ | Fixed-Charge $\sin^2\theta_W^{\mathrm{(fixed)}}$ | Gap $\Delta\sin^2\theta_W$ |
   | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
   | $1$ | $1$ | $3$ | $4$ | $0.5000$ (algebraic cont.) | $\frac{1}{4} = 0.250000$ | $\frac{9}{28} \approx 0.321429$ | $-\frac{1}{14} \approx -0.071429$ |
   | $2$ | $\frac{3}{2}$ | $3$ | $\frac{9}{2}$ | $0.7500$ (odd-doublet anom.) | $\frac{1}{3} \approx 0.333333$ | $\frac{27}{76} \approx 0.355263$ | $-\frac{5}{228} \approx -0.021930$ |
   | **$3$** | **$2$** | **$\frac{10}{3}$** | **$2\times\frac{8}{3} = \frac{16}{3}$** | **$1.0000$ ($k_Y = \frac{5}{3}$ lock)** | **$\frac{3}{8} = 0.375000$** | **$\frac{3}{8} = 0.375000$** | **$0.000000$ (unique root)** |
   | $4$ | $\frac{5}{2}$ | $\frac{15}{4}$ | $\frac{25}{4}$ | $1.2500$ (odd-doublet anom.) | $\frac{2}{5} = 0.400000$ | $\frac{45}{116} \approx 0.387931$ | $+\frac{7}{580} \approx +0.012069$ |
   | $5$ | $3$ | $\frac{21}{5}$ | $\frac{36}{5}$ | $1.5000$ | $\frac{5}{12} \approx 0.416667$ | $\frac{27}{68} \approx 0.397059$ | $+\frac{1}{51} \approx +0.019608$ |

2. **Part II: One-loop inverse couplings, Weinberg running, and gravitational climb from $M_Z$ to $E_P$ (`manual derivation` + `NUM`)**:
   Using PDG 2024 inputs at $M_Z = 91.1876\;\mathrm{GeV}$ ($\widehat{\alpha}(M_Z)^{-1} = 127.930$, $\sin^2\widehat{\theta}_W(M_Z) = 0.23129$, $\alpha_3(M_Z) = 0.1180$) with minimal-SM slopes $(b_1, b_2, b_3) = (+\frac{41}{10}, -\frac{19}{6}, -7)$, $\sin^2\widehat{\theta}_W(\mu) = \frac{\alpha_2^{-1}(\mu)}{\frac{5}{3}\alpha_1^{-1}(\mu) + \alpha_2^{-1}(\mu)}$, and $\alpha_G(\mu) = (\mu / E_P)^2$:

   | Benchmark Landmark | Scale $\mu\;(\mathrm{GeV})$ | $\log_{10}(\mu/\mathrm{GeV})$ | $(\alpha_1^{-1},\, \alpha_2^{-1},\, \alpha_3^{-1})(\mu)$ | Running $\sin^2\widehat{\theta}_W(\mu)$ | Gravity $\alpha_G(\mu) = (\mu/E_P)^2$ |
   | :--- | :---: | :---: | :---: | :---: | :---: |
   | **Electroweak $Z$ pole $M_Z$** | $91.1876$ | $1.96$ | $(59.00,\, 29.59,\, 8.47)$ | **$0.23129$** (PDG benchmark) | $5.58 \times 10^{-35}$ |
   | **Electroweak arc crossing $\mu_{12}$ ($\alpha_1 = \alpha_2$)** | $1.014 \times 10^{13}$ | $13.01$ | $(42.41,\, 42.41,\, 36.81)$ | **$\frac{3}{8} = 0.37500$** | $6.90 \times 10^{-13}$ |
   | **Hypercharge–color crossing $\mu_{13}$ ($\alpha_1 = \alpha_3$)** | $2.41 \times 10^{14}$ | $14.38$ | $(40.34,\, 44.00,\, 40.34)$ | $0.39559$ (min gap $\Delta\alpha^{-1} > 3.66$, $\approx 3.664$) | $3.90 \times 10^{-10}$ |
   | **Weak–color crossing $\mu_{23}$ ($\alpha_2 = \alpha_3$)** | $9.77 \times 10^{16}$ | $16.99$ | $(36.42,\, 47.03,\, 47.03)$ | $0.43655$ | $6.40 \times 10^{-5}$ |
   | **Single-cell Planck limit $E_P$** | $1.2209 \times 10^{19}$ | $19.09$ | $(33.27,\, 49.46,\, 52.41)$ | $0.47146$ | **$1.0000$** (single-cell lock) |

3. **Part III: Cross-concept Higgs–Zitterbewegung mass ledger ($v \approx 246.22\;\mathrm{GeV},\; v/\sqrt{2} \approx 174.10\;\mathrm{GeV}$; `manual derivation` + `NUM`)**:

   | Representative Mode | Cross-Concept Circular-Arc Mechanism | Coupling / Gauge Combination | Rest Mass (PDG 2024) | Per-Tick Planck Load $m / M_P$ |
   | :--- | :--- | :---: | :---: | :---: |
   | **Photon $\gamma$** | Unbroken $Q = T_3 + Y$ horizontal blind-plane arc ($Q\langle\Phi_H\rangle = 0$) | $e = g_2\sin\theta_W$ | $0$ (exact, $\beta = 1$) | $0$ |
   | **Weak bosons $W^\pm,\, Z^0$** | `2 + 1 = 3` absorption of broken coset arcs into Proca shells | $\frac{1}{2}g_2,\; \frac{1}{2}\sqrt{g_2^2 + g_Y^2}$ | $80.369,\; 91.188\;\mathrm{GeV}/c^2$ | $6.58 \times 10^{-18},\; 7.47 \times 10^{-18}$ |
   | **Electron $e^-$** | Ultra-weak $\mathcal{H}_L \leftrightarrow \mathcal{H}_R$ Yukawa Zitterbewegung fold | $y_e \approx 2.935 \times 10^{-6}$ | $0.5110\;\mathrm{MeV}/c^2$ | $4.19 \times 10^{-23}$ |
   | **Top quark $t$** | Near-maximal $\mathcal{O}(1)$ cross-concept chiral standing-wave lock | $y_t \approx 0.9912$ | $172.57\;\mathrm{GeV}/c^2$ | $1.41 \times 10^{-17}$ |
   | **Higgs boson $H^0$** | Radial oscillation of the cross-concept fold angle | $\lambda = \frac{m_H^2}{2v^2} \approx 0.129$ | $125.20\;\mathrm{GeV}/c^2$ | $1.03 \times 10^{-17}$ |

4. **Part IV: $\nu_0$ Einstein clock-budget check and electroweak instanton amplitude-versus-rate factor of $2$ (`manual derivation`)**:

   - Outside a static spherical mass $M$ ($r > r_s$), the combined four-field rest energy $E = Mc^2$ imposes entanglement load $\eta_{\mathrm{info}}(r) = \frac{2GM}{rc^2}$, so $\nu_\tau^2 + \nu_{\mathrm{arc\text{-}load}}^2 = \nu_0^2$ yields $d\tau/dt = \sqrt{1 - 2GM/(rc^2)}$ and inward weak-field refraction $\mathbf{a} = -c^2\nabla\ln(d\tau/dt) \to -(GM/r^2)\hat{\mathbf{r}}$;
   - For an $\mathrm{SU}(2)_L$ BPST instanton at $\alpha_2^{-1}(M_Z) \approx 29.5889$, $S_{\mathrm{inst}} = \frac{8\pi^2}{g_2^2(M_Z)} = 2\pi\alpha_2^{-1}(M_Z) \approx 185.91$: the WKB **amplitude** is $e^{-S_{\mathrm{inst}}} \approx 1.82 \times 10^{-81}$, whereas the Born-squared zero-temperature $\Delta B = \Delta L = 3$ **rate** is $e^{-2 S_{\mathrm{inst}}} = \exp(-16\pi^2/g_2^2) \approx 3.30 \times 10^{-162}$ ($\sim 10^{-162\text{–}165}$ including Yukawa/running prefactors), differing in the exponent by an exact factor of $2$, while $\Delta B = 1$ single-proton decay vanishes identically.

:::

Honoring our zero-tolerance anti-numerology covenant across the entire monograph, we register the four quantitative first-principles problems separating AF-GUT's geometric unification architecture from a parameter-free completion as the culminating open frontier of Chapter 39:

::: {.problem #prob-ch39-af-gut-threshold-and-proton-stability title="Open Problems on AF-GUT Threshold Closure, Lattice Chiral Three-Generation Spectra, and Continuum Gravitational Calibration"}
Within the concentric multi-concept circular-arc framework of [@def-ch39-af-gut-master-connection]—without post-hoc curve-fitting parameters and linked directly to the three foundational frontier markers [@prob-ch34-past-hypothesis-and-cosmological-constant], [@prob-ch34-gravity-dynamics-and-coupling], and [@prob-ch34-sm-generations-and-couplings]—can one resolve from first principles the following four quantitative mathematical-physics problems (`OPEN`):

1. **Discrete circular-arc threshold closure of the $10^{13}\text{–}10^{17}\;\mathrm{GeV}$ RG triangle and Higgs mass calibration**: Compute lattice-to-continuum matching thresholds, higher-loop gauge terms, and Planck-cell gravitational operators from $\mathcal{Z}_{\mathrm{AF\text{-}GUT}}$ to close the minimal-SM one-loop inverse-coupling spread ($\Delta\alpha^{-1} > 3.66$, $\approx 3.664$, reconciling the threshold-free three-line GQW value $0.2076$ with $\sin^2\widehat{\theta}_W(M_Z) = 0.23129$), and derive $\lambda \approx 0.129$ ($m_H \approx 125.2\;\mathrm{GeV}/c^2$) together with $v / M_P \sim 10^{-17}$;
2. **Nonperturbative 4D chiral Weyl realization and $N_{\mathrm{gen}} = 3$ family truncation** (linked to [@prob-ch34-sm-generations-and-couplings]): Formulate a chiral $\mathrm{SU}(2)_L \times \mathrm{U}(1)_Y$ operator on the discrete minimal-arc complex evading Nielsen–Ninomiya fermion doubling, and prove a topological index or acceptance-window cohomology theorem uniquely selecting $N_{\mathrm{gen}} = 3$ generations;
3. **Three-generation Yukawa singular values, flavor mixing, and Planck-scale $\Delta B$ selection rules** (linked to [@prob-ch34-sm-generations-and-couplings]): Derive the five-decade Yukawa matrices $(Y_u, Y_d, Y_e)$, CKM/PMNS mixing angles, and neutrino mass operator from $D_{\mathrm{int}}(\Phi_H)$, and determine whether parallel concept-field orthogonality forbids dimension-$6$ Planck-suppressed operators $\frac{c_6}{M_P^2}qqq\ell$ ($c_6 \equiv 0$) at all orders or leaves an ultra-rare $\tau_p \sim 10^{45}\;\mathrm{yr}$ signature;
4. **Continuum Lorentzian spin-$2$ emergence and non-circular $\Lambda_{\mathrm{cos}}\ell_P^2 \sim 10^{-122}$ derivation** (linked to [@prob-ch34-gravity-dynamics-and-coupling] and [@prob-ch34-past-hypothesis-and-cosmological-constant]): Derive diffeomorphism-covariant massless helicity-$\pm 2$ gravitational propagation and $G_N$ normalization from discrete Regge deficits and $\nu_0$ clock loads, and determine both the positive sign and the $10^{-122}$ scale of $\Lambda_{\mathrm{cos}}\ell_P^2$ without presupposing the cosmic horizon radius $R_H$?

:::

Finally, we place **AF-GUT (Arc-Field Grand Unification)** side by side against the two twentieth-century unification paradigms—**$\mathrm{SU}(5)/\mathrm{SO}(10)$ simple-group matrix GUTs** and **$10\mathrm{D}/11\mathrm{D}$ string / Kaluza–Klein extra-dimensional theories**—across six falsifiable discriminants:

| Physical & Epistemic Axis | Simple-Group Matrix GUTs ($\mathrm{SU}(5) / \mathrm{SO}(10)$) | Extra-Dimensional Unification ($5\mathrm{D}$ KK / $10\text{–}11\mathrm{D}$ Strings) | **Arc-Field Grand Unification (AF-GUT, This Book's `MODEL`)** |
| :--- | :--- | :--- | :--- |
| **Macroscopic Spatial Dimension** | Presupposes smooth $3+1\mathrm{D}$ Minkowski manifold | Postulates $9\text{–}10$ spatial axes ($6\text{–}7$ curled up) | **Strictly capped at $D = 3$ space** (three-anchor Gram & Maxwell–Laman $N \in \{3, 4\}$ root lock) |
| **Identity of Higher Hilbert Axes** | Quarks & leptons packed into $\mathbf{5}^*,\mathbf{10},\mathbf{16}$ columns | Infinite Kaluza–Klein harmonic towers on compact manifolds | **Parallel bounded concept ledger** $\mathcal{E}_{\mathrm{space}}^{(3)}\oplus\mathcal{E}_Y^{(1)}\oplus\mathcal{E}_{\mathrm{weak}}^{(2)}\oplus\mathcal{E}_{\mathrm{color}}^{(3)}$ |
| **Local Gauge Algebra & Exotic Bosons** | $\dim\mathfrak{su}(5)=24$, mandates $12$ $(X,Y)$ leptoquarks | Higher-D gauge/string modes with KK towers & moduli | **Clean $12\mathrm{D}$ direct sum** $\mathfrak{u}(1)_Y\oplus\mathfrak{su}(2)_L\oplus\mathfrak{su}(3)_C$; **zero $(X,Y)$, zero KK towers** |
| **Origin of UV $\sin^2\theta_W = \frac{3}{8}$** | Embedding generators into one $5\times 5$ matrix trace | Model-dependent compactification flux & intersection choices | **Shared Weyl chiral-vs-vector arc-trace ratio** $\frac{2}{2\times(8/3)}=\frac{3}{8}$ (unique at $N_c=3$) |
| **Proton Decay $p \to e^+\pi^0$ Test** | Tree-level $(X,Y)$ exchange; minimal $\mathrm{SU}(5)$ $\sim 10^{29\text{–}31}\;\mathrm{yr}$ (**excluded**) | Model-dependent ($d=5,6$ operators often near current bounds) | **Gauge rate $\Gamma_{\mathrm{gauge}} \equiv 0$** (consistent with Super-K $>2.4\times 10^{34}\;\mathrm{yr}$); instantons obey $\Delta B\in 3\mathbb{Z}$ |
| **Monopoles & Gravitation** | $\pi_2(G/H)=\mathbb{Z}$ overproduces GUT monopoles; **gravity excluded** | Includes graviton mode, but $\sim 10^{500}$ vacua underdetermined | **$\pi_2(S^3)=0$ zero GUT monopoles**; inter-cell $N\ge 5$ Regge deficits & $\nu_0$ clock load close gravity |

::: {.viz src="af-gut-arc-field-unification-sandbox" preset="afgut-ledger-split-vs-unify" height="500"}
Drag the amber ledger-convergence handle continuously between the split four-column concept ledger—where cyan $F_{\mathrm{pos}}$, silver-white $\mathrm{U}(1)_Y$, purple $\mathrm{SU}(2)_L$, and blue $\mathrm{SU}(3)_C$ keep strict block boundaries with zero $(X, Y)$ proton decay and $\pi_2(S^3) = 0$ zero GUT monopoles—and the single ultraviolet $\Delta\mathcal{T}_\epsilon$ concentric four-shell monad, contrasting AF-GUT directly against simple-group matrix and extra-dimensional models (literature benchmarks: `ARGUED`; coupling and topological readouts: `NUM`; continuous convergence: `MODEL`; four frontier problems marked red `OPEN` in the drawer).
:::

---

**Grand Finale of Chapter 39 and the Ten-Part Main Text: From Pairwise Measurement to Arc-Field Unification—Stepping Outside All Spheres.** Pause here at the summit and look back across the entire ten-part ascent traversed since the [Prelude](README.md) and [Chapter 1](ch01-measurement.md): beginning by restoring the static noun "quantum" to the relational verb of pairwise measurement and eliminating the external Third Point $C$ in [Chapter 2](ch02-born-rule.md), we climbed rung by rung along ***Point $\longrightarrow$ Line $\longrightarrow$ Plane $\longrightarrow$ Sphere $\longrightarrow$ Sphere Beyond Spheres***—through idempotent projection lines, $90^\circ$ blind-plane complex rotors, Landauer's erasure ledger, Berry holonomy, Bell cosine arcs, cyclotomic gate polytopes, Lorentz null cones, holographic minimum cuts, Cantor–Gödel diagonal escapes, Euler prime bases, quaternion integer lattices, and Dottie's cosine fixed point $\cos\theta^* = \theta^*$; onward through timeless Gram causality, the horizon between fields ($P$) and lines ($NP$), fivefold quantum fairness, the zero-background Axiom of Comparison $\mathcal{A}_0$, universal mutual-attractor observers, the holographic concept tower of minimal circular-arc trihedra, homoiconic table expansion $T = T(T)$, hyperbolic staircases quotienting out amnesia loops, nocturnal dream erasure, and ontological QRAM self-mapped page tables `p ≡ *p`, until reaching this final chapter's substrate-free identity **"The observer is the ontological universe"**—uniting self-referential fixed points, autonomous halting precision $\varepsilon_{\mathrm{self}}$, universal clock dilation $\nu_0$ ([§39.6](ch39-s06-fivefold-self-reference-spectrum.md), [§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md), and [§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md)), intra- and inter-cell force convergence, the three-dimensional concept-field cap ([§39.9](ch39-s09-unified-arc-forces-and-planck-convergence.md)–[§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)), and finally **Arc-Field Grand Unified Theory (AF-GUT)** into concentric minimal circular arcs!

Yet precisely because every page from first to last has honored our four-tier epistemic covenant—separating kernel-verified theorems (green `LEAN ✓`), literature and manual derivations, geometric synthesis (`MODEL`), and open scientific frontiers (red `OPEN`) without papering over a single seam—standing atop this unification peak never seals reality inside a closed iron sphere. On the contrary, whether in the strictly positive sagitta remainder $1 - \cos\epsilon > 0$ of every finite circular-arc polyhedron, the unending orthogonal lift of Lawvere–Gödel diagonalization, or the four red `OPEN` frontier markers of [@prob-ch39-af-gut-threshold-and-proton-stability] standing candidly in the mountain air, every uncancelled remainder offers the same quiet invitation: **whenever we think we have finally seen the whole sphere, a larger sphere already encloses it.** Take one breath at the summit, push open the final door of the main text, and step into the [Coda](coda.md)—***Outside All Spheres***.

::: {.viz src="af-gut-arc-field-unification-sandbox" height="640"}
Full interactive laboratory (`AFGUT//UNIFY`): explore all five progressive experiment cards and couple the amber handles for energy scale $\mu$, Higgs bridge $\tilde{\Phi}_H$, and ledger-to-monad convergence—uniting the four concentric $\Delta\mathcal{T}_\epsilon$ field shells, the unique $N_c = 3$ intersection at $\sin^2\theta_W = \frac{3}{8}$ with one-loop running, the chiral Zitterbewegung mass bridge, and the $\nu_0$ Pythagorean Einstein balance—across green `LEAN ✓`, `ARGUED`, `NUM`, `MODEL`, and red `OPEN` frontier tiers.
:::
