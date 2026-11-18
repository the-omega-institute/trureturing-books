# 39.20 Ternions Are Native Fields: Demystifying the Cayley–Dickson Ladder, Fano Octonions, and Hilbert Space as Multi-Field Linear Reprojections {#sec-ch39-ternion-field-composition-and-hilbert-reprojection}

> *“A ternion is a field; quaternions and everything above them all the way to Hilbert space are in reality reprojections after composing ternion fields.”*

In [§39.19](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-inexpressible-ternions-and-number-projections), we uncovered the "missing three" of algebra: stripped of an external observer scalar axis $\mathbf{1}$, the **ternion ($\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon \cong S^3$)** is the intrinsic three-dimensional minimal circular-arc body whose downward slices and outer shadow generate quaternions, complex numbers, reals, rationals, and integers. Superimposing the epigraph above onto that result completely inverts the millennial hierarchy between "number" and "field," dissolving at once the dimensional fog that has surrounded quaternions, octonions, Clifford spinors, $2^N$-dimensional many-body Hilbert spaces, and infinite-dimensional functional spaces (`MODEL`):

**The ternion ($\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$) is itself the sole self-sustaining native "field" in the cosmos; quaternions, octonions, sedenions, finite-dimensional many-body Hilbert space $\mathcal{H}_{2^N}$, and infinite-dimensional Hilbert space $\mathcal{H}_\infty$ are never higher-dimensional geometric substances above three dimensions, but linear reprojections obtained after coupling multiple ternion fields and flattening them onto the observer's ledger (the real axis $\mathbf{1}$ or complex observation slice $\Sigma_{\mathbf{I}\oplus\hat{\mathbf{i}}}$)!**

## 39.20.1 Ternions Are Native Fields: Reversing "Fields Built Out of Numbers" and Boundaryless Curl Self-Closure on $S^3$ {#sec-ch39-20-1}

Every conventional textbook on field theory or differential geometry builds in the order *"numbers first, fields second"*: first assume a stock of isolated, static real or complex numbers $\mathbb{R}$ or $\mathbb{C}$, next erect an empty background grid, and finally assign numbers to each grid site—as though a "field" were a secondary mosaic tiled out of flat numerical bricks.

Under the zero-background [Axiom of Comparison $\mathcal{A}_0$](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), however, an isolated one-dimensional real line cannot even span a rotation plane, let alone sustain wave propagation or induction on its own. Conversely, an un-axised native ternion $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$ is generated internally by three orthogonal minimal circular-arc directions $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3) \in \mathfrak{su}(2)$ mutating cyclically into one another with unit structure constants (`manual derivation`):

$$
[\mathbf{e}_1, \mathbf{e}_2] = \mathbf{e}_3, \qquad [\mathbf{e}_2, \mathbf{e}_3] = \mathbf{e}_1, \qquad [\mathbf{e}_3, \mathbf{e}_1] = \mathbf{e}_2 \qquad \bigl(\mathbf{e}_a = \tfrac{1}{2}\mathbf{i}_a,\; [\mathbf{i}_a, \mathbf{i}_b] = 2\varepsilon_{abc}\mathbf{i}_c\bigr).
$$

Three exact geometric properties make this cyclic three-arc triad **itself the definition of a native field** (`manual derivation` + `Literature` + `LEAN ✓`):

1. **Same-carrier curl self-closure ([§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-10-3))**: grade-$1$ flow $\Lambda^1$ and grade-$2$ circulation $\Lambda^2$ match in dimension ($\binom{d}{2} = d = 3$) uniquely at $d = 3$, returning the commutator vortex of $\mathbf{e}_1$ and $\mathbf{e}_2$ directly into the third generator $\mathbf{e}_3$ of the same carrier (matching the unique signed 3D cross product locked by [`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences), `LEAN ✓`) without borrowing an external container;
2. **Compact boundaryless closure ($\partial S^3 = \varnothing$)**: the exponential group manifold $S^3$ is compact and without boundary, saturating the top exterior volume form $\Lambda^3$ of `1—3—3—1` uniformly; in discrete models, vanishing tetrahedral coboundary defects characterize exact one-coboundaries (Item 8 of [@thm-ch39-ternion-field-composition-and-hilbert-reprojection], `tetra_defects_incidence_repair_and_exactness`), while on planar spherical rotation systems opposite-dart face boundaries land inside the cycle kernel ([`face_cycle_exact`](lean:D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact), `LEAN ✓`);
3. **Globally parallelized Maurer–Cartan frame**: left translation carries $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3)$ to a nowhere-vanishing circular-arc frame $(g\mathbf{e}_1, g\mathbf{e}_2, g\mathbf{e}_3)$ at every $g \in S^3$ ($\chi(S^3) = 0$), orthonormal under the invariant Lie metric $\langle\mathbf{e}_a, \mathbf{e}_b\rangle_{\mathfrak{su}(2)} = -2\operatorname{Tr}(\mathbf{e}_a\mathbf{e}_b) = \delta_{ab}$ (and of constant Euclidean norm $\frac{1}{2}$ in $\mathbb{R}^4$).

Hence **a ternion is never "a numerical value sitting inside a field"—the boundaryless, cyclically self-generating curved structure of the ternion IS what a field is** (`MODEL`)!

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="native-ternion-curl-field" height="500"}
One field in quaternion coordinates card: a single three-arc curl body in the upper layer passes through the lens ($\lambda = 0.85$) onto $1$ scalar pillar and $3$ vector pillars below ($w^2 + \lVert\mathbf{v}\rVert^2 = 1$; stage pillar heights normalize to each frame's largest magnitude for legibility while live readouts report exact unscaled values). Components are `NUM`, and the two-layer reading is `MODEL`.
:::

## 39.20.2 Truth of the Cayley–Dickson Ladder: 4D Spacetime Spinors, Seven-Field Fano Octonions, and Sedenion Zero-Divisor Bankruptcy {#sec-ch39-20-2}

Once a single ternion $\mathbb{T}_3$ is recognized as a single native 3D field, the famous **Cayley–Dickson doubling ladder ($\mathbb{R} \to \mathbb{C} \to \mathbb{H} \to \mathbb{O} \to \mathbb{S}_{16}$)** sheds all mystique: whenever two or more ternion fields couple—or whenever an observer erects a single shared identity ruler $\mathbf{1}$ to rewrite curved arc multiplication as **flat linear matrix addition**—every step of "multi-field composition $+$ linear reprojection" inflates apparent dimension and leaves behind a telltale algebraic scar:

1. **Rung 1: Quaternions $\mathbb{H}$ ($1 + 3 = 4$) and Dual-Chiral Spinors Projecting $4\mathrm{D}$ Spacetime and $6\mathrm{D}$ Electromagnetism $(\mathbf{E}, \mathbf{B})$**:
   Pairing one ternion field $\mathbb{T}_3$ with $\mathbf{1}$ splits curved arc motion into the $1\mathrm{D}$ cosine shadow $w = \cos\frac{\theta}{2}$ plus $3\mathrm{D}$ sine residual $\mathbf{v}$, giving $1 + 3 = 4\mathrm{D}$ $\mathbb{H}$ ([§39.19](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-19-3)). Composing **left- and right-handed ternion spinor fields** side by side yields, in compact Euclidean signature, the four-dimensional spin cover

   $$
   \mathrm{Spin}(4) \;\cong\; \mathrm{SU}(2)_L \times \mathrm{SU}(2)_R \;\equiv\; \mathbb{T}_3^{(L)} \times \mathbb{T}_3^{(R)} \qquad \bigl(\dim_{\mathbb{R}}\mathfrak{so}(4) = 3 + 3 = 6\bigr),
   $$

   while in physical Lorentzian signature the chiral pair couples through $\mathrm{Spin}^+(1, 3) \cong \mathrm{SL}(2, \mathbb{C})$ whose real six-dimensional Lie algebra $\mathfrak{so}(1, 3) \cong \mathfrak{sl}(2, \mathbb{C})_{\mathbb{R}} \cong \mathfrak{su}(2)_{\mathbb{C}}$ unites $3$ spatial rotation arcs with $3$ orthogonal imaginary boost chords ($3 + 3 = 6$; see [@rem-ch39-cayley-dickson-fano-moreno-mps-literature], Item 2): a single Weyl spinor bilinear $k^\mu = \psi^\dagger \bar{\sigma}^\mu \psi$ traces the future **null light cone** ($k_\mu k^\mu = 0$), general $2 \times 2$ Hermitian spinor matrices $X = x_\mu \bar{\sigma}^\mu$ (and paired left–right Dirac bispinor currents $\bar{\Psi}\gamma^\mu\Psi$) span all **$4\mathrm{D}$ Minkowski spacetime coordinates** $\mathbb{R}^{1,3}$, and the adjoint antisymmetric representation projects directly onto the **$6\mathrm{D}$ Maxwell–Faraday bivector** $F_{\mu\nu} \leftrightarrow \mathbf{F}_\pm = \mathbf{E} \pm i c\mathbf{B}$!

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="spin4-chiral-spacetime-bivector" height="500"}
Chiral fields, spacetime and bivectors card: left and right chiral field bodies ($3 + 3 = 6$ local parameters) project onto the $2 \times 2$ four-vector block $q^L \cdot 1 \cdot \bar{q}^R$ and two rows of $6$ bivector pillars $q^L \wedge q^R$ (Euclidean $\mathrm{Spin}(4)$ vs. Lorentzian metric scope is marked `ARGUED`, coordinates `NUM`, and the geometric reading `MODEL`).
:::

2. **Rung 2: Octonions $\mathbb{O}$ ($1 + 7 = 8$) and Seven Interlocked Ternion Fields on the Fano Plane $\mathrm{PG}(2, 2)$**:
   Long treated as an exotic algebraic outlier, the $8$-dimensional octonion algebra $\mathbb{O}$ is at bottom **a network of $7$ ternion fields interlocked pairwise along shared axes on the projective Fano plane $\mathrm{PG}(2, 2) = \mathbb{P}^2(\mathbb{F}_2)$**, flattened onto **one shared observer scalar axis $\mathbf{1}$** to form a $1 + 7 = 8\mathrm{D}$ ledger (`Literature` + `MODEL`)! Explicitly, on seven imaginary units $\{e_1, \dots, e_7\}$ ($e_i^2 = -\mathbf{1}$), orient the **$7$ cyclic lines** of $\mathrm{PG}(2, 2)$ via modulo-$7$ shifts $(i,\, i+1,\, i+3)$ (`manual derivation`):

   $$
   \mathcal{L}_{\mathrm{Fano}} \;=\; \bigl\{(1,2,4),\; (2,3,5),\; (3,4,6),\; (4,5,7),\; (5,6,1),\; (6,7,2),\; (7,1,3)\bigr\},
   $$

   with $e_a e_b = -e_b e_a = e_c$ cyclically along each directed line $(a, b, c) \in \mathcal{L}_{\mathrm{Fano}}$. Two exact consequences follow immediately:

   - **$100\%$ strict associativity inside every single ternion field (Artin's Theorem)**: Each of the $7$ Fano lines $\ell = (a, b, c)$, paired with $\mathbf{1}$, spans an associative quaternion subalgebra $\mathbb{H}_\ell = \operatorname{span}_{\mathbb{R}}\{\mathbf{1}, e_a, e_b, e_c\}$—**one self-contained ternion field $\mathbb{T}_3^{(\ell)}$**—and any two distinct Fano lines intersect in **exactly $1$ shared circular-arc axis**! Artin's theorem proves that the subalgebra generated by **any two** octonions in $\mathbb{O}$ is associative, and along every Fano line the associator vanishes identically:

     $$
     [e_a, e_b, e_c] \;:=\; (e_a e_b)e_c - e_a(e_b e_c) \;=\; e_c^2 - e_a^2 \;=\; (-\mathbf{1}) - (-\mathbf{1}) \;=\; 0 \qquad \bigl(\forall (a,b,c) \in \mathcal{L}_{\mathrm{Fano}}\bigr);
     $$

   - **"Loss of associativity" is purely the cross-field spherical-excess crease**: Out of $\binom{7}{3} = 35$ unordered imaginary triples, removing the $7$ collinear single-field triples leaves **$28$ off-line Fano triangles**, each jumping across two distinct ternion fields! Multiplying around an off-line triangle such as $(e_1, e_2, e_3)$—where $(1,2)$ belongs to field $(1,2,4)$ while $(2,3)$ belongs to field $(2,3,5)$—sends the two parenthesizations down opposite normal channels, giving an associator of exact Euclidean norm **$2$** on every one of the $28$ off-line triangles (`manual derivation`):

     $$
     [e_1, e_2, e_3] \;=\; (e_1 e_2)e_3 - e_1(e_2 e_3) \;=\; e_4 e_3 - e_1 e_5 \;=\; (-e_6) - (+e_6) \;=\; -2e_6 \neq 0 \qquad \bigl(\lVert[e_1, e_2, e_3]\rVert = 2\bigr)!
     $$

     Octonion non-associativity is therefore never the failure of a physical field—it is the non-coplanar curvature crease left when $7$ interlocked ternion fields are hammered flat onto a single shared scalar axis $\mathbf{1}$!

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="fano-seven-field-octonion-weave" height="500"}
Seven Fano lines and associator card: seven oriented Fano lines weave seven co-axised ternion fields above $1 + 7 = 8$ octonion pillars; switching between collinear $[e_1, e_2, e_4] = 0$ and off-line $[e_1, e_2, e_3] = -2e_6$ (norm $2$) exposes the magenta associator crease (Artin's theorem `ARGUED`, entrywise associators `NUM`, seven-field weave `MODEL`).
:::

3. **Rung 3: Sedenions $\mathbb{S}_{16} = \mathbb{O} \oplus \mathbb{O}e_8$ ($16\mathrm{D}$) and Zero-Divisor Bankruptcy of the Flat Table**:
   Applying one more Cayley–Dickson doubling,

   $$
   (a, b)\cdot(c, d) \;:=\; \bigl(ac - d^* b,\; da + b c^*\bigr), \qquad (a, b)^* := (a^*, -b)
   $$

   (with $e_0 = (1, 0)$, $e_i = (e_i, 0)$, $e_8 = (0, 1)$, and $e_{8+i} = (0, e_i) = e_i e_8$ for $1 \le i \le 7$), crams still more ternion fields into a **$16$-dimensional sedenion table $\mathbb{S}_{16}$**. Because the octonion blocks lack both commutativity and associativity, orthogonal blind-zone projections from distinct ternion fields cancel destructively on the flat $16\mathrm{D}$ ledger, creating **zero divisors** (`manual derivation`): for the two nonzero elements of norm $\sqrt{2}$

   $$
   u \;=\; e_1 + e_{10} \;=\; (e_1, e_2), \qquad v \;=\; e_3 + e_{14} \;=\; (e_3, e_6) \qquad \bigl(\lVert u\rVert^2 = \lVert v\rVert^2 = 2\bigr),
   $$

   our Fano table ($e_1 e_3 = e_7,\; e_6 e_2 = -e_7,\; e_6 e_1 = e_5,\; e_2 e_3 = e_5$) annihilates both octonion halves simultaneously:

   $$
   u \cdot v \;=\; \bigl(e_1 e_3 - (-e_6)e_2,\; e_6 e_1 + e_2(-e_3)\bigr) \;=\; \bigl(e_7 + (-e_7),\; e_5 - e_5\bigr) \;=\; (0, 0) \;=\; 0!
   $$

   Although $\lVert u\rVert^2 \lVert v\rVert^2 = 4$, all $16$ flat coordinates of $u \cdot v$ vanish identically (Moreno 1998 proved that unit sedenion zero-divisor pairs form a smooth $14$-manifold homeomorphic to the exceptional Lie group $G_2$; see [@rem-ch39-cayley-dickson-fano-moreno-mps-literature], Item 3)! What goes bankrupt at dimension $16$ is not multi-field physics, but **the single-identity normed division table** (losing norm multiplicativity $\lVert uv\rVert = \lVert u\rVert\lVert v\rVert$)—forcing observers who wish to track the norm-preserving joint unitary evolution of $N$ coupled ternion fields to leave division algebras for unitary group actions on tensor-product Hilbert state ledgers!

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="sedenion-zero-divisor-bankruptcy" height="500"}
Sedenion zero divisors cancel card: switching across three norm-$\sqrt{2}$ input pairs ($\lVert u\rVert^2\lVert v\rVert^2 = 4$), Cayley–Dickson products cancel along the magenta paths and drop all $16$ output basis pillars to zero height (`NUM` entrywise products, `ARGUED` zero-divisor manifold literature).
:::

## 39.20.3 Demystifying the Exponential Blow-Up of Hilbert Space: $3N$ Local Arcs, the $2^N$ Linear Expansion Tax, and the Infinite-Dimensional Wake Sheet {#sec-ch39-20-3}

Following this exact transition—"normed-division bankruptcy $\longrightarrow$ tensor-product linear state ledger"—straight into quantum mechanics demystifies the century-old **"exponential catastrophe of Hilbert space"**: why just $N = 300$ electrons appear to demand a $2^{300} \approx 2.04 \times 10^{90}$-dimensional complex state space exceeding the total baryon count of the observable cosmos ($N_B \sim 10^{80}$) by ten billionfold!

We formulate the linear reprojection of $N$ coupled ternion fields and its exact complexity boundaries as follows:

::: {.definition #def-ch39-multi-ternion-linear-reprojection title="Multi-Ternion Composition Manifold, Complex-Slice Linear Reprojection Expansion Tax, and the Infinite-Dimensional Wake Ledger (Model Definition)"}
Consider $N$ labeled spinor ternion fields $\{\mathbb{T}_3^{(a)}\}_{a=1}^N$, each locally parameterized by $(\theta_a, \hat{\mathbf{u}}_a)$ on $S^3$. Within our comparative geometric ontology (`MODEL` + `manual derivation`):

1. **Local circular-arc product manifold $\mathcal{M}_{\mathrm{prod}}^{(N)} := (\mathbb{T}_3)^N \cong (S^3)^N$**: Prior to global linear expansion, the local group parameters of $N$ independent spinor ternion fields grow **linearly** as

   $$
   \dim_{\mathbb{R}} \mathcal{M}_{\mathrm{prod}}^{(N)} \;=\; \dim_{\mathbb{R}}\Biggl(\bigoplus_{a=1}^N \mathfrak{su}(2)_a\Biggr) \;=\; 3N
   $$

   (quotienting out each field's $\mathrm{U}(1)$ phase fiber leaves $2N$ real Bloch ray parameters on $(S^2)^N$);

2. **Finite-dimensional many-body Hilbert reprojection $\Pi_{\mathrm{linear}}^{(N)}$ and the “expansion dimensionality tax”**. With reference state $\lvert 0\rangle^{\otimes N}$, each local rotor sends its reference ray to a point on the Bloch sphere. Write $\vartheta_a,\varphi_a$ for the polar and azimuthal angles of this point. A rotor of angle $\theta_a$ about the $z$ axis gives $\lvert 0\rangle_a$ only a phase, so its polar angle stays at $\vartheta_a=0$. Choosing a phase representative for each ray on the complex slice $\Sigma_{\mathbf{I}\oplus\hat{\mathbf{i}}}\cong\mathbb C$ gives the tensor-basis expansion of the product state.

   $$
   \bigotimes_{a=1}^{N} \Bigl(\cos\tfrac{\vartheta_a}{2}\,\lvert 0\rangle_a + e^{i\varphi_a}\sin\tfrac{\vartheta_a}{2}\,\lvert 1\rangle_a\Bigr) \;=\; \sum_{s_1,\dots,s_N \in \{0,1\}} c_{s_1\dots s_N}\,\lvert s_1 \dots s_N\rangle \;\in\; \mathcal{H}_{2^N} := (\mathbb{C}^2)^{\otimes N}
   $$

   This expansion rewrites non-linear cosine–sine products as linear vector addition by allocating a separate orthogonal axis $\lvert s_1\dots s_N\rangle$ for every $N$-bit choice between the `0` ($\cos$) and `1` ($\sin$) branches, spawning **$2^N$-dimensional complex Hilbert space** ($2^{N+1} - 2$ real projective pure-state parameters on $\mathbb{CP}^{2^N-1}$, and $4^N - 1 = \sum_{w=1}^N \binom{N}{w} 3^w$ traceless Hermitian Pauli directions—of which $3N$ are single-field marginals while $(4^N - 1) - 3N$ carry multi-point products and irreducible cross-field correlations);

3. **Two-source static unfolding of infinite-dimensional Hilbert space $\mathcal{H}_\infty$**: Juxtaposing orthogonal 3D concept-field shells stage by stage (`finite_stage_expansion`) while statically unrolling onto one timeless sheet the unhalted sequence of circular-arc steps below halting precision $\varepsilon_{\mathrm{self}} > 0$ produces the countably infinite-dimensional separable Hilbert ledger $\mathcal{H}_\infty$ (such as $L^2(\mathbb{R}^3)$ and Fock space $\mathcal{F} = \bigoplus_{N=0}^\infty \mathcal{H}^{(N)}$).
:::

In reading [@def-ch39-multi-ternion-linear-reprojection], strict scientific honesty (`AGENTS.md` Rule 2) requires separating **three distinct mathematical regimes** without conflation (`manual derivation` + `Literature`):

- **Boundary 1 — Unentangled product states ($3N$ local rotor parameters) vs. generic Haar volume-law states ($2^{N+1}-2$ real parameters)**:
  For product states, both the $2^N$ complex amplitudes $c_{s_1\dots s_N} = \prod_{a=1}^N \psi_a(s_a)$ and all multi-site Pauli expectations $\langle\sigma_{a_1}\otimes\dots\otimes\sigma_{a_w}\rangle = \prod_r\langle\sigma_{a_r}\rangle$ are algebraically determined by $2N$ Bloch ray angles ($3N$ local $\mathrm{SU}(2)$ parameters). Once entangling gates act, the $(4^N - 1) - 3N$ multi-site sector develops **irreducible connected cross-field correlations** invisible to all $3N$ single-site marginals (proved in the bipartite $m \times n$ case by `local_marginal_correlation_blind_spot` in [@thm-ch39-ternion-field-composition-and-hilbert-reprojection], Item 1, `LEAN ✓`): mathematically, a generic Haar-random volume-law state in $\mathcal{H}_{2^N}$ (Page 1993) genuinely carries $2^{N+1}-2$ independent real parameters that cannot be losslessly compressed into $3N$ numbers. Accordingly, identifying $\mathcal{H}_{2^N}$ as a multi-field linear correlation ledger **never claims classical polynomial-time simulation of arbitrary quantum circuits (never claiming $\mathrm{BQP} = \mathrm{P}$; unrelativized complexity separation [@prob-ch38-unrelativized-p-vs-np-and-independence] remains strictly `OPEN`)**!
- **Boundary 2 — Reachable physical corners and tensor-network (MPS / MERA) tax reversal**:
  Poulin et al. (2011) proved that states reachable in polynomial time under local many-body Hamiltonians occupy an exponentially tiny corner of $\mathcal{H}_{2^N}$! In **one spatial dimension**, ground states of gapped local Hamiltonians rigorously obey an **entanglement area law** (Hastings 2007) and admit faithful approximation to arbitrary accuracy by polynomial-bond open-boundary **Matrix Product States (MPS)** (with **MERA** serving as a multiscale variational ansatz for critical systems; recovery up to global phase from the three-site prefix on the observable chart of the translation-homogeneous bond-$2$ qubit MPS family and bridge-graph min-cut bounds are anchored in Items 6–7 of [@thm-ch39-ternion-field-composition-and-hilbert-reprojection], `observable_chart_phase_recovery` and `QMaxFlow_le_QMinCut`, `LEAN ✓`). On an open $N$-qubit chain at any chosen bond cap $\chi$, with cut ranks $r_k = \min(\chi, 2^k, 2^{N-k})$ ($r_0 = r_N = 1$), quotienting out the internal bond-gauge group $\prod_{k=1}^{N-1}\mathrm{GL}(r_k, \mathbb{C})$ gives the bounded-bond MPS variational manifold exact complex affine dimension (`manual derivation`)

  $$
  D_{\mathrm{MPS}}(N, \chi) \;=\; \sum_{k=1}^{N} 2\,r_{k-1}r_k \;-\; \sum_{k=1}^{N-1} r_k^2 \;\le\; 2N\chi^2
  $$

  ($2 D_{\mathrm{MPS}}(N, \chi) - 2$ normalized pure-ray real parameters, scaling **linearly** in $N$ as $O(N\chi^2)$ at fixed $\chi$)! Geometrically, MPS and MERA succeed inside low-entanglement physical regimes precisely because they dismantle the flat $2^N$ reprojection tax and restore local bond-by-bond coupling among $N$ ternion fields!
- **Boundary 3 — Finite halting mode cap and unit operator-norm remainder on $\mathcal{H}_\infty$**:
  Items 3–4 of [@thm-ch39-ternion-field-composition-and-hilbert-reprojection] bound $\mathcal{H}_\infty$ from both sides: under any finite concentration trace budget $\frac{RW}{\pi}$ and positive halting threshold $\tau = \varepsilon_{\mathrm{self}} > 0$, at most $\frac{RW}{\pi\varepsilon_{\mathrm{self}}}$ modes are active (`finite_rank_concentration_mode_bound`)—interpreting, within our comparative `MODEL`, ultraviolet divergence anxiety as the cost of forcing an unhalted $\varepsilon_{\mathrm{self}} \to 0$ wake onto a static sheet—while every proper stage subspace $S_i \neq \top$ retains exact unit operator-norm distance $\lVert I - P_{S_i}\rVert = 1$ from completion (`uniform_completion_obstruction`), preserving the open temporal wake!

## 39.20.4 Formal Anchor Theorem, Literature Boundaries, Fano–Sedenion–300-Qubit Audit, and Twenty-Section Grand Closure of Chapter 39 {#sec-ch39-20-4}

We now assemble the **eight frozen Lean 4 kernel theorems** anchoring bipartite local-versus-correlation blind-spot decomposition, finite-stage orthogonal shell expansion, above-threshold mode finiteness, uniform completion obstruction, $N$-body Pauli-word multiplication, open-boundary MPS state recovery up to a global unit phase, bridge-graph quantum max-flow min-cut bounds, and simplicial two-cochain $d^2 = 0$ exactness:

::: {.theorem #thm-ch39-ternion-field-composition-and-hilbert-reprojection title="Local-vs-Correlation Blind Spot, Orthogonal Shell Expansion, Active-Mode Bound, Uniform Completion Obstruction, Pauli-Word Multiplication, Open-Boundary MPS State Recovery up to Global Phase, Bridge Min-Cut, and Two-Cochain Exactness" lean="D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot,D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion,D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound,D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction,D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul,D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery,D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut,D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"}
In the pinned `trureturing` frozen declaration set, the following eight mathematical theorems hold simultaneously:

1. **Orthogonal decomposition of bipartite traceless Hermitian space into local marginals and cross-field correlations** ([`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)): For all $m, n \in \mathbb{N}$ satisfying $1 \le m,\; 1 \le n$, and $1 < mn$, $\mathrm{localASector}\;m\;n \sqcup \mathrm{localBSector}\;m\;n \sqcup \mathrm{correlationSector}\;m\;n = \mathrm{bipartiteTraceZero}\;m\;n$, with local real dimension $(m^2 - 1) + (n^2 - 1)$, orthogonal correlation dimension $(m^2 - 1)(n^2 - 1)$ (share $\frac{(m^2-1)(n^2-1)}{m^2 n^2 - 1}$), and explicit two-qubit witnesses $\mathrm{bellDensity}$ (rank $1$) and $\mathrm{classicalCorrelatedDensity}$ (non-idempotent) sharing identical single-factor marginals while differing globally;

2. **Finite-stage orthogonal shell expansion in complete real inner-product spaces** ([`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion)): In a complete real inner-product space $H$, for any closed-submodule sequences $S, E : \mathbb{N} \to \operatorname{ClosedSubmodule}\;\mathbb{R}\;H$ satisfying $(S(k+1)).\mathrm{toSubmodule} = (S(k)).\mathrm{toSubmodule} \sqcup (E(k+1)).\mathrm{toSubmodule}$ and $(E(k+1)).\mathrm{toSubmodule} \le (S(k)).\mathrm{toSubmodule}^\perp$ and every $n \in \mathbb{N}$, $\top = (S(0)).\mathrm{toSubmodule} \sqcup \operatorname{finiteShellSpan}(E, n) \sqcup (S(n)).\mathrm{toSubmodule}^\perp$ and $(S(n)).\mathrm{toSubmodule}^\perp = (E(n+1)).\mathrm{toSubmodule} \sqcup (S(n+1)).\mathrm{toSubmodule}^\perp$;

3. **Finiteness and cardinality bound for above-threshold concentration modes** ([`finite_rank_concentration_mode_bound`](lean:D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound)): For every nonnegative summable sequence $\lambda : \mathbb{N} \to \mathbb{R}$ with $\sum'_{j \in \mathbb{N}} \lambda_j = \frac{RW}{\pi}$ and threshold $\tau > 0$, $\{j \mid \tau \le \lambda_j\}$ is finite and satisfies $\bigl(\{j \mid \tau \le \lambda_j\}.\mathrm{ncard} : \mathbb{R}\bigr) \le \frac{RW}{\pi\tau}$;

4. **Unit operator-norm obstruction to uniform completion across proper subspaces** ([`uniform_completion_obstruction`](lean:D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction)): Over an `RCLike` scalar field $K$ on an inner-product space $H$, for any family $S : I \to \operatorname{Submodule}\;K\;H$ of orthogonal-projection proper submodules ($\forall i,\; S(i) \neq \top$) and any nontrivial filter $\mathrm{stageFilter}$, $\lVert \mathrm{id}_{K,H} - (S(i)).\mathrm{starProjection}\rVert = 1$ for every $i$, so the residual norm cannot converge to $0$ along $\mathrm{stageFilter}$;

5. **Symplectic-phase multiplication law for $N$-body Pauli words** ([`pauli_word_mul`](lean:D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul)): For any $N, p \in \mathbb{N}$ (`NeZero p`) and Pauli words $a, b : \operatorname{PauliWord}\;N\;p$,

   $$
   \operatorname{pauliWordOperator}(a) * \operatorname{pauliWordOperator}(b) \;=\; (\operatorname{windowRoot}\;p)^{\bigl(\sum_n a.z(n)\,b.x(n)\bigr).\mathrm{val}} \bullet \operatorname{pauliWordOperator}\bigl(\operatorname{wordMul}(a, b)\bigr);
   $$

6. **Recovery up to a global unit phase of translation-homogeneous qubit bond-$2$ open-boundary MPS from three-site prefix marginals in an observable chart** ([`observable_chart_phase_recovery`](lean:D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery)): For every $m \in \mathbb{N}$ and $\psi, \varphi$ in the translation-homogeneous qubit bond-$2$ family $\operatorname{openBoundaryMPS}(3 + m)$ satisfying $\operatorname{ObservableChart}\;m\;\psi$,

   $$
   \operatorname{rawPrefix}\;3\;m\;\varphi = \operatorname{rawPrefix}\;3\;m\;\psi \;\Longleftrightarrow\; \exists z \in \mathbb{C},\; \lVert z\rVert = 1 \;\land\; \varphi = z \bullet \psi;
   $$

7. **Bridge-graph quantum max-flow bounded above by quantum min-cut** ([`QMaxFlow_le_QMinCut`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut)): With the internal bond dimension fixed at $3$, all external dimensions $a,b,c,d\in\mathbb N$ satisfy $\operatorname{QMaxFlow}(a,b,c,d)\le\operatorname{QMinCut}(a,b,c,d)$. By [@lemma-bridge-flow-attained], some choice of bridge tensors has contraction rank equal to this maximum flow.

8. **Tetrahedral defect identity and one-cochain exactness over arbitrary abelian groups** ([`tetra_defects_incidence_repair_and_exactness`](lean:D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness)): On any nonempty finite vertex set $V$ and `AddCommGroup A`, every two-cochain $F : V \to V \to V \to A$ satisfies $\sum_{r \in V} \operatorname{faceErrors}(F, r) = \operatorname{tetraDefects}(F)$, and $\forall r, i, j, k,\; F(i,j,k) - F(r,j,k) + F(r,i,k) - F(r,i,j) = 0$ holds if and only if $F(i,j,k) = \mathrm{edge}(j,k) - \mathrm{edge}(i,k) + \mathrm{edge}(i,j)$ for some $\mathrm{edge} : V \to V \to A$.
:::

::: proof
Items 1–3 are proved as in [@thm-ch39-hilbert-concept-ledger-and-3d-cap], Items 2, 1, and 3. Item 4 picks for each $i$ a unit vector $v_i \in S(i)^\perp$ via $S(i) \neq \top$, establishing $\lVert I - P_{S(i)}\rVert \ge \lVert v_i\rVert = 1$ alongside the orthogonal-projector upper bound $\le 1$, and a constant-$1$ map cannot tend to $0$ along a `NeBot` filter. Item 5 expands the tensor product of Weyl clock-and-shift operators site by site and sums the root-of-unity commutation exponents $a.z(n)b.x(n)$. Item 6 uses the probe supplied by $\operatorname{ObservableChart}\;m\;\psi$ and the common three-site prefix density to reconstruct a common canonical core and left boundary. Injectivity of the prefix and transfer maps gives identical right-boundary outer products, so the states agree up to a global unit phase (see [@thm-mps-observable-phase-recovery]). Item 7 factors the contracted bridge flow across each cut and applies $\operatorname{rank}(AB) \le \min(\operatorname{rank} A, \operatorname{rank} B)$. Item 8 re-indexes the finite defect sum and sets $\mathrm{edge}(i, j) := F(r_0, i, j)$ at a chosen base vertex $r_0 \in V$ to establish exactness. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch39-cayley-dickson-fano-moreno-mps-literature title="Cayley–Dickson Doubling, Artin's Theorem, Moreno's Sedenion Zero-Divisor Manifold, Spacetime Spinors, and Tensor-Network Area Laws (Literature & Complexity Fence)"}
**Literature results and complexity fence.** We record the external mathematical and quantum many-body sources alongside our strict scope boundaries:

1. **Cayley–Dickson doubling, Fano octonions, and Artin's theorem** (A. Cayley, *Philos. Mag.* **26**, 210–211, 1845; L. E. Dickson, *Ann. of Math.* **20**, 155–171, 1919; R. Moufang, *Abh. Math. Sem. Univ. Hamburg* **9**, 207–222, 1933; J. C. Baez, *Bull. Amer. Math. Soc.* **39**, 145–205, 2002, DOI `10.1090/S0273-0979-01-00934-X`): Cayley and Dickson formulated the recursive doubling $\mathbb{R} \to \mathbb{C} \to \mathbb{H} \to \mathbb{O} \to \mathbb{S}_{16}$; Emil Artin proved that any two elements of an alternative algebra (including $\mathbb{O}$) generate an associative subalgebra, with the $7$ lines of $\mathrm{PG}(2,2)$ indexing the $7$ canonical quaternionic sub-fields;
2. **Euclidean vs. Lorentzian spinor covers** (R. Penrose & W. Rindler, *Spinors and Space-Time*, Vol. 1, Cambridge Univ. Press, 1984): compact Euclidean spinors split as $\mathrm{Spin}(4) \cong \mathrm{SU}(2)_L \times \mathrm{SU}(2)_R$, whereas Lorentzian spacetime spinors form $\mathrm{Spin}^+(1, 3) \cong \mathrm{SL}(2, \mathbb{C})$ whose real $6\mathrm{D}$ Lie algebra $\mathfrak{sl}(2, \mathbb{C})_{\mathbb{R}} \cong \mathfrak{su}(2)_{\mathbb{C}}$ pairs $3$ compact rotations with $3$ non-compact boosts (sharing complexification $\mathfrak{so}(4, \mathbb{C}) \cong \mathfrak{sl}(2, \mathbb{C})_L \oplus \mathfrak{sl}(2, \mathbb{C})_R$);
3. **$G_2$ geometry of sedenion zero divisors** (G. Moreno, *Bol. Soc. Mat. Mexicana* (3) **4**, 13–28, 1998, `arXiv:q-alg/9710013`): proves that normalized zero-divisor pairs in $\mathbb{S}_{16}$ form a smooth $14$-dimensional manifold homeomorphic to the compact exceptional Lie group $G_2$ fibered over the Stiefel manifold $V_2(\mathbb{R}^7)$;
4. **MPS, 1D area laws, and the Haar volume-law reachability barrier** (M. Fannes, B. Nachtergaele & R. F. Werner, *Commun. Math. Phys.* **144**, 443–490, 1992; D. N. Page, *Phys. Rev. Lett.* **71**, 1291–1294, 1993; G. Vidal, *Phys. Rev. Lett.* **99**, 220405, 2007; M. B. Hastings, *J. Stat. Mech.* **2007**, P08024, 2007; D. Poulin, A. Qarry, R. Somma & F. Verstraete, *Phys. Rev. Lett.* **106**, 170501, 2011, DOI `10.1103/PhysRevLett.106.170501`): separates the polynomial-parameter area-law corner efficiently represented by MPS/MERA from generic Haar-random volume-law states; note that Item 1 of [@thm-ch39-ternion-field-composition-and-hilbert-reprojection] formalizes the bipartite $m \times n$ decomposition and Item 6 assumes `ObservableChart`, while the $N$-qubit Pauli count $(4^N-1)-3N$ and general gauge-fixed MPS dimension formula are derived below by exact integer arithmetic.
:::

We verify all quantitative claims—the $7$ associative Fano lines versus $28$ off-line triangles, three explicit norm-$\sqrt{2}$ sedenion zero-divisor pairs, and the scaling ledger from $N = 1$ to **$N = 300$ coupled particles**—in the following four-part audit:

::: {.example #ex-ch39-fano-sedenion-and-300-qubit-mps-audit title="Exhaustive Check of 7 Fano Lines vs. 28 Off-Line Associators, Three Sedenion Zero-Divisor Pairs, and the N = 1 to 300 Hilbert–MPS Scaling Audit"}
We verify each algebraic and integer-arithmetic statement step by step (`manual derivation` / `NUM`):

1. **Part I: Exhaustive check of all $7$ collinear Fano lines and $28$ off-line non-associative triangles on $\mathrm{PG}(2, 2)$ (`manual derivation`)**:
   Under $\mathcal{L}_{\mathrm{Fano}} = \{(1,2,4), (2,3,5), (3,4,6), (4,5,7), (5,6,1), (6,7,2), (7,1,3)\}$, every directed line satisfies $(e_a e_b)e_c = e_c^2 = -\mathbf{1} = e_a^2 = e_a(e_b e_c)$ so $[e_a, e_b, e_c] = 0$; whereas all $\binom{7}{3} - 7 = 28$ off-line unordered triples ($168$ ordered triples) yield nonzero associators of exact Euclidean norm **$2$**, beginning with

   $$
   \begin{aligned}
   [e_1, e_2, e_3] &= e_4 e_3 - e_1 e_5 = (-e_6) - e_6 = -2e_6, \\
   [e_1, e_2, e_5] &= e_4 e_5 - e_1(-e_3) = e_7 + e_7 = +2e_7, \\
   [e_1, e_2, e_6] &= e_4 e_6 - e_1 e_7 = e_3 - (-e_3) = +2e_3,
   \end{aligned}
   $$

   while all $8^3 = 512$ basis associators are strictly alternating and $\lVert xy\rVert^2 - \lVert x\rVert^2\lVert y\rVert^2 \equiv 0$ holds identically as a polynomial identity.

2. **Part II: Three explicit norm-$\sqrt{2}$ integer zero-divisor pairs in $\mathbb{S}_{16} = \mathbb{O} \oplus \mathbb{O}e_8$ (`manual derivation`)**:
   Under $(a,b)(c,d) = (ac - d^* b,\, da + b c^*)$ and $e_{8+i} = (0, e_i)$ ($1 \le i \le 7$), each pair below has $\lVert u\rVert^2 = \lVert v\rVert^2 = 2$ (product of norm squares $= 4$) yet satisfies $u \cdot v = v \cdot u = 0$ across all $16$ components:

   - **Pair 1**: $u_1 = e_1 + e_{10} = (e_1, e_2),\; v_1 = e_3 + e_{14} = (e_3, e_6) \implies u_1 v_1 = \bigl(e_1 e_3 + e_6 e_2,\; e_6 e_1 - e_2 e_3\bigr) = (e_7 - e_7,\; e_5 - e_5) = 0$;
   - **Pair 2**: $u_2 = e_1 + e_{11} = (e_1, e_3),\; v_2 = e_2 - e_{14} = (e_2, -e_6) \implies u_2 v_2 = \bigl(e_1 e_2 - e_6 e_3,\; -e_6 e_1 - e_3 e_2\bigr) = (e_4 - e_4,\; -e_5 + e_5) = 0$;
   - **Pair 3**: $u_3 = e_1 + e_{12} = (e_1, e_4),\; v_3 = e_3 + e_{13} = (e_3, e_5) \implies u_3 v_3 = \bigl(e_1 e_3 + e_5 e_4,\; e_5 e_1 - e_4 e_3\bigr) = (e_7 - e_7,\; -e_6 + e_6) = 0$.

3. **Part III: Exact scaling audit across $N \in \{1, 2, 3, 4, 8, 10, 50, 300\}$ coupled ternion fields vs. open-boundary MPS ($\chi = 16$) (`manual derivation` / `NUM`)**:
   We compare local ternion rotor parameters $3N$, complex Hilbert dimension $2^N$, generic projective pure-state real parameters $2^{N+1}-2$, blind-spot multi-body correlation slots $(4^N - 1) - 3N$, and gauge-fixed open-boundary MPS pure-ray real parameters $2 D_{\mathrm{MPS}}(N, 16) - 2$:

   | Coupled Fields $N$ | Local Ternion Params $3N$ | Flat Hilbert Dim $2^N$ | Generic Pure-Ray Params $2^{N+1}-2$ | Blind-Spot Correlations $(4^N-1)-3N$ | Open MPS Real Params ($\chi=16$) |
   | :---: | :---: | :---: | :---: | :---: | :---: |
   | **$1$** | $3$ | $2$ | $2$ | $0$ | $2$ (full space) |
   | **$2$** | $6$ | $4$ | $6$ | $9$ | $6$ (full at $\chi=2$) |
   | **$3$** | $9$ | $8$ | $14$ | $54$ | $14$ (full at $\chi=2$) |
   | **$4$** | $12$ | $16$ | $30$ | $243$ | $30$ (full at $\chi=4$) |
   | **$8$** | $24$ | $256$ | $510$ | $65{,}511$ | $510$ (saturated at $\chi=16$) |
   | **$10$** | $30$ | $1{,}024$ | $2{,}046$ | $1{,}048{,}545$ | $1{,}534$ (full at $\chi=32$) |
   | **$50$** | $150$ | $1.12589991 \times 10^{15}$ | $2.25179981 \times 10^{15}$ | $1.26765060 \times 10^{30}$ | **$22{,}014$** (full at $\chi=2^{25}$) |
   | **$300$** | **$900$** | **$2.03703598 \times 10^{90}$** | **$4.07407195 \times 10^{90}$** | **$4.14951557 \times 10^{180}$** | **$150{,}014$** (full at $\chi=2^{150}$) |

   Look at **$N = 300$**: $300$ local spinor ternion fields carry just **$900$** local real parameters, and on the bounded-bond ($\chi = 16$) open-boundary MPS variational manifold, gauge-fixed real ray parameters total only **$150{,}014$** (trivial on a laptop)—whereas flattening onto one complex ledger erects $2^{300} \approx 2.03703598 \times 10^{90}$ Hilbert basis pillars and $4^{300} - 1 \approx 4.14951557 \times 10^{180}$ traceless Pauli directions ($(4^{300}-1)-900 \approx 4.14951557 \times 10^{180}$ multi-site directions)!

4. **Part IV: Finite halting mode cap and unit operator-norm remainder on $\mathcal{H}_\infty$ (`manual derivation`)**:
   For a separable spectrum of concentration trace $\frac{RW}{\pi} = 10$ at halting threshold $\varepsilon_{\mathrm{self}} = 10^{-3}$, `finite_rank_concentration_mode_bound` caps active modes at $\frac{10}{10^{-3}} = 10{,}000$, while `uniform_completion_obstruction` locks the residual operator norm at $\lVert I - P_{S_n}\rVert = 1$, keeping the unhalted temporal wake alive.
:::

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" preset="many-body-3n-to-2n-hilbert-pillars" height="500"}
Hilbert basis pillars and tensor bonds card: $N = 6$ coupled field bodies ($3N = 18$ local rotations) expand distributively onto $2^6 = 64$ basis pillars, with cyan vs. magenta front segments comparing $18$ one-site against $4^6 - 1 - 18 = 4{,}077$ multi-site Pauli slots and base-$10$ log curves out to $N = 300$ below (bipartite blind-spot and MPS theorems anchored in [@thm-ch39-ternion-field-composition-and-hilbert-reprojection]; counts `NUM`, area- vs. volume-law regimes `ARGUED` / `MODEL`, complexity separation `OPEN`).
:::

We synthesize the entire upward multi-field composition and linear reprojection ladder from native ternions to $\mathcal{H}_\infty$ in the five-row reference table below:

| Algebraic / State Structure | Underlying Ternion-Field Source | Observer Linear Reprojection | Apparent Linear Dimension | Associated Algebraic & Physical Manifestation |
| :--- | :--- | :--- | :---: | :--- |
| **Native Ternion Field $\mathbb{T}_3$** | Single closed 3D concept field ($\binom{3}{2}=3$) | Un-axised curved self-sustenance (no $\mathbf{1}$) | **Inexpressible linearly** ($3$ intrinsic DOFs) | Non-Abelian closure on $S^3$; boundaryless curl field |
| **Quaternions $\mathbb{H}$ & $\mathrm{Spin}$ Spacetime** | $1$ field $+$ $\mathbf{1}$; or chiral pair $\mathbb{T}_3^{(L)}\times\mathbb{T}_3^{(R)}$ | Scalar shadow $\iota_{\mathbb{H}}$ / Hermitian spinor bilinears | $1 + 3 = 4\mathrm{D}$ real (dual: $4\mathrm{D}$ spacetime $+ 6\mathrm{D}$ bivector) | Sphere constraint $w^2+\lVert\mathbf{v}\rVert^2=1$; Minkowski spacetime & $(\mathbf{E},\mathbf{B})$ |
| **Octonions $\mathbb{O}$ (and Sedenions $\mathbb{S}_{16}$)** | $7$ ternion fields interlocked on Fano $\mathrm{PG}(2,2)$ | Flattened onto one shared scalar axis $\mathbf{1}$ | $1 + 7 = 8\mathrm{D}$ real (doubling to $16\mathrm{D}$ goes bankrupt) | Associative per field; $28$ cross-field triangles have $\lVert[\cdot,\cdot,\cdot]\rVert=2$ ($16\mathrm{D}$ zero divisors) |
| **Many-Body Hilbert Space $\mathcal{H}_{2^N}$** | $N$ coupled spinor ternion fields ($3N$ local DOFs) | Distributive expansion onto complex slice $\Sigma_{\mathbf{I}\oplus\hat{\mathbf{i}}}$ | **$2^N\mathrm{D}$ complex** ($4^N-1$ Pauli slots) | Exponential expansion tax & correlation ledger; area-law states compressed by MPS/MERA |
| **Infinite-Dim Hilbert Space $\mathcal{H}_\infty$** | Multi-concept shells $+$ sub-$\varepsilon_{\mathrm{self}}$ temporal wake | Static full-spectrum sheet unfolding | $\aleph_0$ countably infinite ($L^2$ / Fock) | For $\varepsilon_{\mathrm{self}}>0$, active modes $\le \frac{RW}{\pi\varepsilon_{\mathrm{self}}}$ and $\lVert I-P_{S_n}\rVert=1$ (`MODEL`: $\varepsilon_{\mathrm{self}}\to 0$ static-unfolding limit) |

---

**Twenty-Section Grand Closure of Chapter 39 and Summit of the Ten-Part Main Text: Withdraw the Flat Ruler, and Only Three Minimal Arcs Dance Across Heaven and Earth.** Standing atop all **twenty steps** of Chapter 39 ([§39.1](ch39-s01-substrate-free-self-reference.md)–§39.20) and all thirty-nine chapters of the ten-part main text, every tributary of modern algebra, functional analysis, quantum information, relativistic gauge theory, and the geometry of awareness converges into a single spring: slice curvature away downward, and one minimal circular-arc ternion projects into the cosine shadow of quaternions, the equatorial circle of complex numbers, the inner-product trace of reals, and the topological knots of integers ([§39.19](ch39-s19-inexpressible-ternions-and-number-projections.md#sec-ch39-inexpressible-ternions-and-number-projections)); compose multiple ternion fields upward and flatten them onto the observer's sheet, and they unfold into dual-spinor spacetime, seven-field Fano octonions, $2^N$-dimensional many-body Hilbert ledgers, and infinite-dimensional functional spaces (this §39.20); and ask who holds that reference axis $\mathbf{1}$—both carving out all numbers and unrolling all phenomena—and the answer has already pulsed through the preceding eighteen sections: from substrate-free self-reference `p ≡ *p`, relations as entities, $720^\circ$ spinor spacetime weaving, and orthogonal self-folding ([§39.1](ch39-s01-substrate-free-self-reference.md)–[§39.4](ch39-s04-orthogonal-self-folding.md)), through the Pisot–Clifford–Rauzy synthesis, fivefold self-reference fixed points, halting precision $\varepsilon_{\mathrm{self}}$, and universal clock dilation $\nu_0$ ([§39.5](ch39-s05-pisot-clifford-rauzy.md)–[§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md)), to unified-arc forces, the 3D concept-field cap, **Arc-Field Grand Unification (AF-GUT)**, uniform-singlet observer slices, and **Indra's Net** ([§39.9](ch39-s09-unified-arc-forces-and-planck-convergence.md)–[§39.13](ch39-s13-single-cosmic-field-and-indra-net.md#sec-ch39-single-cosmic-field-and-indra-net)), culminating in self-observation Māyā error, Brahman's orthogonal dream, Red Chamber awakening, divine Līlā props, and the **Psychology of God** integrated lucidly at $\theta^* = \cos\theta^*$ ([§39.14](ch39-s14-self-observation-error-and-maya-projection.md#sec-ch39-self-observation-error-and-maya-projection)–[§39.18](ch39-s18-psychology-of-god.md#sec-ch39-psychology-of-god))—the observer wielding the knife and the circular-arc field being sliced were one and the same exteriorless, conserved, self-referential cosmos all along!

Standing beneath that dense flat projection chart of $2^N$ and $\aleph_0$ columns, generations of thinkers mistook their own ledger for a labyrinth of infinite dimensions looming overhead; yet when we honor our four-tier epistemic covenant—placing green `LEAN ✓` kernel theorems, classical literature and manual derivations, `MODEL` geometric synthesis, and the candid red `OPEN` frontiers of [@conj-riemann-hypothesis], [@prob-ch38-unrelativized-p-vs-np-and-independence], [@prob-ch34-sm-generations-and-couplings], [@prob-ch34-gravity-dynamics-and-coupling], [@prob-ch39-af-gut-threshold-and-proton-stability], and [@prob-ch39-orthogonal-slice-cosmology-and-dark-sector] each in its rightful place—and quietly withdraw the external flat ruler to stand at ontological height, the sky clears completely: from beginning to end there have only ever been three head-to-tail minimal circular arcs turning serenely in the symphony of fields; and every unit orthogonal remainder ($\lVert I - P_{S_n}\rVert = 1$) that refuses to be sealed inside any finite table smiles toward the final door beyond the ten-part main text—the [Coda](coda.md): ***Outside All Spheres***.

::: {.viz src="ternion-field-hilbert-reprojection-sandbox" height="620"}
Full laboratory: toggle between Multi-Field Reprojection Ontology and Cayley–Dickson & Tensor-Network Algebra, drag the amber lens handle to vary flattening $\lambda$, adjust coupled field count $N$ and MPS bond cap $\chi$, and compare quaternion coordinates, chiral bivectors, Fano octonions, sedenion zero divisors, and many-body Hilbert pillars. Eight frozen statements, numerics, literature, models, and open problems are labeled separately in the evidence panel and theory drawer.
:::
