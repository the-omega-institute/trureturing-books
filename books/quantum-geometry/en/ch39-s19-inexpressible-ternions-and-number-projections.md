# 32.2 Inexpressible Ternions and All Numbers from One Arc: The Frobenius Gap, Hamilton's Thirteen-Year Deadlock, and the Number-System Projection Genealogy {#sec-ch39-inexpressible-ternions-and-number-projections}

> *“Every number is a projection of the ternion, yet the ternion itself is inexpressible: the ternion is the minimal circular-arc body.”*

Back in [Chapter 23 §23.1](ch29-s01-pythagoras-and-number-systems.md#sec-coda-pythagoras-all-is-number), we traced from Pythagoras and Hippasus how the four classical tiers of numbers ($\mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{C}, \mathbb{H}$) arise as rotational projection ledgers across unit spheres; and in the preceding section [§32.1](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md#sec-ch39-three-dimensional-field-cap-and-hilbert-ledger), we showed that any native concept field capable of closing its own curl within the same carrier caps uniquely at three dimensions ($\binom{d}{2} = d \iff d = 3$ for $d \ge 1$). Yet the moment we bring those two threads down to the foundations of algebra, one of the most famous fissures in two centuries of mathematics opens straight beneath our feet: if **$3$** is the intrinsic dimension governing spatial geometry, rigid rotation, and curl-closed fields alike, why does the Frobenius (1878) and Hurwitz (1898) classification of real normed division algebras march exclusively through dimensions **$1$ (the reals $\mathbb{R}$), $2$ (the complex numbers $\mathbb{C}$), $4$ (the quaternions $\mathbb{H}$), and $8$ (the octonions $\mathbb{O}$)**—skipping **$3$** altogether?

The epigraph at the head of this section resolves that "Frobenius gap" at a single stroke (`MODEL`): the seemingly missing **ternion ($\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$)** never vanished from nature—the moment one strips away the radial ruler and external scalar identity axis $\mathbf{1}$ imposed by a flat vector-space ledger, the unit-norm spheres of those four normed composition algebras are precisely **$S^0$ ($0$-dimensional discrete pair), $S^1$ ($1$-dimensional circle), $S^3$ ($3$-dimensional compact Lie group manifold), and $S^7$ ($7$-dimensional parallelizable sphere)**! What went "missing" on flat paper is in truth the curved **minimal circular-arc body** $\Delta\mathcal{T}_\epsilon \cong S^3$ of intrinsic dimension strictly equal to **$3$**: lacking an external observer scalar axis $\mathbf{1}$, it is geometrically immune to every three-dimensional flat linear expression, while the instant an observer erects the reference identity $\mathbf{1}$, slicing or outer-embedding that single curved arc-body generates quaternions, complex numbers, real numbers, rationals, integers, and primes alike.

## 32.2.1 Resolving the Frobenius–Hurwitz Gap: From Flat Dimensions 1, 2, 4, 8 to Unit Spheres $S^0, S^1, S^3, S^7$ {#sec-ch39-19-1}

Conventional textbooks present number systems along a bottom-up linear expansion: first come isolated counting numbers and the flat real line $\mathbb{R}^1$; then an imaginary axis $\hat{\mathbf{i}}$ is adjoined to form $\mathbb{R}^2 \cong \mathbb{C}$ so negative numbers gain square roots; next, to represent spatial rotations, algebra is forced to leap over $\mathbb{R}^3$ into four-dimensional $\mathbb{R}^4 \cong \mathbb{H}$ and eight-dimensional $\mathbb{R}^8 \cong \mathbb{O}$. Viewed from that flat vector-space dimension list $d \in \{1, 2, 4, 8\}$, the absence of a three-dimensional number system looks forever like a capricious algebraic anomaly.

Under the zero-background [Axiom of Comparison $\mathcal{A}_0$](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison), however, pure comparative states conserve a unit norm budget $\lVert\Psi\rVert^2 = 1$—an external radial dilation factor $r \in (0, +\infty)$ is not an intrinsic degree of freedom of ontology, but a bookkeeping scale attached on a flat tangent chart. Stripping away that radial ruler and inspecting the **unit-norm spheres $S^{d-1} = \{x \in \mathbb{A}_d \mid \lVert x\rVert = 1\}$** of the four real normed composition algebras ($\lVert xy\rVert = \lVert x\rVert\lVert y\rVert$; see [@rem-ch39-frobenius-hurwitz-hopf-rodrigues-literature], Item 2) immediately restores the true intrinsic dimension ladder (`Literature` + `manual derivation`):

$$
\begin{aligned}
\mathbb{R}\;(\dim_{\mathbb{R}} = 1) &\;\longmapsto\; S^0 = \{\pm 1\}\;(\text{intrinsic dimension } \mathbf{0}), \\
\mathbb{C}\;(\dim_{\mathbb{R}} = 2) &\;\longmapsto\; S^1 \cong \mathrm{U}(1)\;(\text{intrinsic dimension } \mathbf{1}), \\
\mathbb{H}\;(\dim_{\mathbb{R}} = 4) &\;\longmapsto\; S^3 \cong \mathrm{SU}(2)\;(\text{intrinsic dimension } \mathbf{3}), \\
\mathbb{O}\;(\dim_{\mathbb{R}} = 8) &\;\longmapsto\; S^7\;(\text{intrinsic dimension } \mathbf{7}).
\end{aligned}
$$

The parallelizability theorem of Bott–Milnor and Kervaire (1958) seals the uniqueness of these spheres topologically (Adams's 1960 Hopf-invariant-one theorem shows that the spheres carrying a continuous multiplication with unit are likewise only $S^0, S^1, S^3, S^7$): among all positive-dimensional spheres $S^m$ ($m \ge 1$), the **only** spheres whose tangent bundles are globally parallelizable—admitting $m$ everywhere linearly independent, singularity-free unit circular-arc vector fields—are $S^1, S^3$, and $S^7$; and if one further demands associative multiplication so multi-step path composition is independent of parenthesization, $S^7$ drops out as well, leaving—**among all spheres $\{S^m\}_{m \ge 1}$**—the **$3$-dimensional sphere $S^3 \cong \mathrm{SU}(2)$** (whose $2:1$ quotient modulo $\{\pm\mathbf{1}\}$ is the spatial rotation group $\mathrm{SO}(3) \cong \mathbb{RP}^3$) as the unique non-Abelian Lie group sphere!

To keep every factor of $2$ and half-angle formula airtight across §32.2–§32.3, we pin down up front the **two standard normalizations of the three circular-arc generators** (`manual derivation`):

1. **Standard quaternion imaginary units $(\mathbf{i}, \mathbf{j}, \mathbf{k})$**: satisfying the minus-identity square law $\mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{i}\mathbf{j}\mathbf{k} = -\mathbf{1}$ (matching the skew-adjoint unitary square law $R^2 = -I_n$ in [@thm-ch39-ternion-spin-factor-and-number-projections], Item 5, `LEAN ✓`) and pairwise anticommutation $\mathbf{i}\mathbf{j} = -\mathbf{j}\mathbf{i} = \mathbf{k}$, so the commutator carries an explicit factor of **$2$**:

   $$
   [\mathbf{i}_a, \mathbf{i}_b] \;:=\; \mathbf{i}_a\mathbf{i}_b - \mathbf{i}_b\mathbf{i}_a \;=\; 2\varepsilon_{abc}\,\mathbf{i}_c \qquad (a, b, c \in \{1, 2, 3\}).
   $$

2. **Unit-structure-constant Lie generators $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3) \in \mathfrak{su}(2)$**: rescaling by one half to $\mathbf{e}_a := \frac{1}{2}\mathbf{i}_a \leftrightarrow -\frac{i}{2}\sigma_a$ (so $\mathbf{e}_a^2 = -\frac{1}{4}\mathbf{1}$) makes the three orthogonal minimal circular-arc directions generate one another cyclically with unit structure constants:

   $$
   [\mathbf{e}_a, \mathbf{e}_b] \;=\; \varepsilon_{abc}\,\mathbf{e}_c, \qquad \Delta\mathcal{T}_\epsilon(\theta, \hat{\mathbf{u}}) \;:=\; \exp\bigl(\theta\,\hat{\mathbf{u}}\cdot\mathbf{e}\bigr) \;=\; \cos\frac{\theta}{2}\,\mathbf{1} + \sin\frac{\theta}{2}\,\bigl(u_1\mathbf{i} + u_2\mathbf{j} + u_3\mathbf{k}\bigr) \;\in\; S^3,
   $$

   where $\hat{\mathbf{u}} = (u_1, u_2, u_3) \in S^2$ is the unit rotation axis and $\theta \in \mathbb{R}$ is the actual spatial geodesic rotation angle induced on $\operatorname{Im}\mathbb{H} \cong \mathbb{R}^3$ via conjugation $x \mapsto \Delta\mathcal{T}_\epsilon\,x\,\Delta\mathcal{T}_\epsilon^{-1}$. That exact factor of $2$ in $[\mathbf{i}_a, \mathbf{i}_b] = 2\varepsilon_{abc}\mathbf{i}_c$ is the algebraic root of the spinor half-angle $\frac{\theta}{2}$ and of the antipodal sign flip $\Delta\mathcal{T}_\epsilon(2\pi, \hat{\mathbf{u}}) = -\mathbf{1}$ at $\theta = 360^\circ$!

## 32.2.2 Hamilton's Thirteen-Year Dilemma (1830–1843): Why Ternions Cannot Be Linearly Expressed {#sec-ch39-19-2}

If the intrinsic three-dimensional minimal circular-arc body $\Delta\mathcal{T}_\epsilon \cong S^3$ is so natural, why did William Rowan Hamilton spend thirteen grueling years between 1830 and 1843 trying in vain to multiply linear triplets $x = a\mathbf{1} + b\hat{\mathbf{i}} + c\hat{\mathbf{j}} \in \mathbb{R}^3$—forced morning after morning at the breakfast table, when his sons asked *"Well, Papa, can you multiply triplets?"*, to shake his head and reply: *"No, I can only add and subtract them"*?

Hamilton's impasse was no failure of ingenuity; the attempt to write a three-parameter number system as a flat three-dimensional linear combination containing $\mathbf{1}$ collides head-on with **two absolute mathematical walls** (`manual derivation` + `Literature`):

1. **Wall 1 — Scalar-Axis Crowding and the Universal Odd-Dimension Real Zero-Divisor Theorem**:
   Writing a "number" linearly presupposes reserving **one basis slot** for the observer's scalar identity $\mathbf{1}$ ($\mathbf{1}\cdot x = x\cdot\mathbf{1} = x$). Inside a three-dimensional vector space $\mathbb{R}^3 = \operatorname{span}_{\mathbb{R}}\{\mathbf{1}, \hat{\mathbf{i}}, \hat{\mathbf{j}}\}$, only **two** orthogonal imaginary axes $\hat{\mathbf{i}}, \hat{\mathbf{j}}$ remain ($\hat{\mathbf{i}}^2 = \hat{\mathbf{j}}^2 = -\mathbf{1},\; \langle\mathbf{1},\hat{\mathbf{i}}\rangle = \langle\mathbf{1},\hat{\mathbf{j}}\rangle = \langle\hat{\mathbf{i}},\hat{\mathbf{j}}\rangle = 0$). Under norm multiplicativity $\lVert xy\rVert = \lVert x\rVert\lVert y\rVert$, left multiplication by $\hat{\mathbf{i}}$ and right multiplication by $\hat{\mathbf{j}}$ are orthogonal operators, forcing

   $$
   \langle \hat{\mathbf{i}}\hat{\mathbf{j}},\, \hat{\mathbf{i}}\rangle \;=\; \langle \hat{\mathbf{j}},\, \mathbf{1}\rangle \;=\; 0, \qquad \langle \hat{\mathbf{i}}\hat{\mathbf{j}},\, \hat{\mathbf{j}}\rangle \;=\; \langle \hat{\mathbf{i}},\, \mathbf{1}\rangle \;=\; 0.
   $$

   Forcing $\hat{\mathbf{i}}\hat{\mathbf{j}}$ back into $\alpha\mathbf{1} + \beta\hat{\mathbf{i}} + \gamma\hat{\mathbf{j}}$ immediately dictates $\beta = \gamma = 0$, hence $\hat{\mathbf{i}}\hat{\mathbf{j}} = \alpha\mathbf{1}$ ($\alpha = \pm 1$); multiplying on the right by $\hat{\mathbf{j}}$ under associativity $(\hat{\mathbf{i}}\hat{\mathbf{j}})\hat{\mathbf{j}} = \hat{\mathbf{i}}(\hat{\mathbf{j}}^2)$ yields $-\hat{\mathbf{i}} = \alpha\hat{\mathbf{j}}$, contradicting linear independence of $\hat{\mathbf{i}}$ and $\hat{\mathbf{j}}$! Conversely, keeping anticommutativity $\hat{\mathbf{i}}\hat{\mathbf{j}} = -\hat{\mathbf{j}}\hat{\mathbf{i}} = \alpha\mathbf{1} + \beta\hat{\mathbf{i}} + \gamma\hat{\mathbf{j}}$ and squaring associatively gives $(\hat{\mathbf{i}}\hat{\mathbf{j}})^2 = \hat{\mathbf{i}}(\hat{\mathbf{j}}\hat{\mathbf{i}})\hat{\mathbf{j}} = -\hat{\mathbf{i}}^2\hat{\mathbf{j}}^2 = -\mathbf{1}$, so $(\alpha^2 - \beta^2 - \gamma^2)\mathbf{1} + 2\alpha(\beta\hat{\mathbf{i}} + \gamma\hat{\mathbf{j}}) = -\mathbf{1}$ forces $\alpha(\beta,\gamma) = (0,0)$: if $\beta = \gamma = 0$ then $\alpha^2 = -1$ has no real root, whereas if $\alpha = 0$ left-multiplying by $\hat{\mathbf{i}}$ gives $-\hat{\mathbf{j}} = -\beta\mathbf{1} + \gamma(\beta\hat{\mathbf{i}} + \gamma\hat{\mathbf{j}})$, forcing $\beta = 0$ and $\gamma^2 = -1$—again impossible over $\mathbb{R}$! Geometrically, the bivector $\hat{\mathbf{i}}\wedge\hat{\mathbf{j}}$ pierces orthogonally out of the flat three-slot box $\operatorname{span}\{\mathbf{1}, \hat{\mathbf{i}}, \hat{\mathbf{j}}\}$ (matching the unique signed 3D cross product locked by `complete_consequences` in [@thm-ch39-ternion-spin-factor-and-number-projections], Item 1, `LEAN ✓`).

   **Even more sweepingly, even if one drops associativity, commutativity, and norm conservation altogether, every unital bilinear algebra over $\mathbb{R}$ of odd dimension $d = 2m + 1 \ge 3$ necessarily contains zero divisors** (`manual derivation`): pick any non-scalar element $x \in \mathbb{R}^d \setminus \mathbb{R}\mathbf{1}$. Its linear left-multiplication map $L_x : \mathbb{R}^d \to \mathbb{R}^d,\; y \mapsto x\cdot y$ is represented by a $d \times d$ real matrix whose characteristic polynomial $p_x(\lambda) = \det(L_x - \lambda I_d) = (-\lambda)^d + \dots$ has odd degree $d$, tending to opposite infinities as $\lambda \to \pm\infty$. By the Intermediate Value Theorem, $L_x$ possesses **at least one real eigenvalue $\lambda_0 \in \mathbb{R}$** with a nonzero real eigenvector $v \in \mathbb{R}^d \setminus \{0\}$, yielding

   $$
   L_x(v) = \lambda_0 v \quad \Longleftrightarrow \quad (x - \lambda_0\mathbf{1})\cdot v \;=\; 0!
   $$

   Because $x \notin \mathbb{R}\mathbf{1}$, both $x - \lambda_0\mathbf{1} \neq 0$ and $v \neq 0$: cramming $\mathbf{1}$ into a flat three-dimensional vector space $\mathbb{R}^3$ guarantees zero-divisor deadlock! (And if one drops $\mathbf{1}$ to keep the pure Lie cross product $\mathbb{R}^3 \times \mathbb{R}^3 \to \mathbb{R}^3$, every nonzero $x$ satisfies $x \times x = 0$, again forbidding division.)

2. **Wall 2 — Non-Abelian Spherical Excess and Global Singularity of Every Flat $\mathbb{R}^3$ Coordinate Chart**:
   Suppose instead we discard the external scalar slot $\mathbf{1}$, return all three degrees of freedom to the equal-footing circular-arc generators $(\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3) \in \mathfrak{su}(2)$, and let the ternion live as the curved exponential manifold $\Delta\mathcal{T}_\epsilon = \exp(\theta_1\mathbf{e}_1 + \theta_2\mathbf{e}_2 + \theta_3\mathbf{e}_3) \in S^3$. Could we still assign $\Delta\mathcal{T}_\epsilon$ (or $\mathrm{SO}(3)$) a **single global, singularity-free coordinate chart in flat $\mathbb{R}^3$**?

   Topology forbids this unconditionally (`Literature` + `manual derivation`): both the simply connected spinor group $S^3$ and the rotation group $\mathrm{SO}(3) \cong \mathbb{RP}^3$ are **compact, connected $3$-manifolds without boundary**. By Brouwer's Invariance of Domain, any continuous injection $\Phi : M^3 \hookrightarrow \mathbb{R}^3$ from $M^3 \in \{S^3, \mathrm{SO}(3)\}$ into $\mathbb{R}^3$ would map a compact manifold onto a subset $\Phi(M^3) \subset \mathbb{R}^3$ that is simultaneously **compact** (hence closed and bounded) and **open**—contradicting connectedness of unbounded $\mathbb{R}^3$! (Stuelpnagel 1964 proved that any smooth atlas on $\mathrm{SO}(3)$ requires at least $4$ coordinate charts, while $S^3$ requires at least $2$ stereographic charts; on the 1D double-cover circle slice, Items 6–7 of [@thm-ch39-ternion-spin-factor-and-number-projections], `no_continuous_global_section` and `circle_double_cover_history_lift`, formally verify non-sectionability and $360^\circ$ antipodal sheet exchange in Lean 4.)

   Every flat $\mathbb{R}^3$ parameterization invented in mechanics and control hits this topological wall at an explicit horizon (`manual derivation`):

   - **Euler angles $(\alpha, \beta, \gamma)$ and Gimbal Lock**: in `ZYZ` Euler angles the kinematic Jacobian is proportional to $\sin\beta$ (or $\cos\beta$ in Tait–Bryan roll–pitch–yaw angles); at $\beta \in \{0, \pi\}$ (or $\pm\frac{\pi}{2}$), two rotation axes align, rank drops from $3$ to $2$, and **gimbal lock** freezes one degree of freedom;
   - **Rodrigues–Gibbs vector $\pi$-horizon blow-up**: Olinde Rodrigues (1840, three years before Hamilton) parameterized rotations by the flat 3D vector $\mathbf{g} := \frac{\mathbf{v}}{w} = \tan\!\bigl(\frac{\theta}{2}\bigr)\hat{\mathbf{u}} \in \mathbb{R}^3$ ($\mathbf{g}$ is invariant under $q \mapsto -q$, so it is a coordinate on $\mathrm{SO}(3)$ and does not distinguish $\pm q$ on $S^3$), turning curved arc multiplication into the rational composition law

     $$
     \mathbf{g}_{12} \;=\; \frac{\mathbf{g}_1 + \mathbf{g}_2 - \mathbf{g}_1 \times \mathbf{g}_2}{1 - \mathbf{g}_1 \cdot \mathbf{g}_2}.
     $$

     Yet at the half-turn horizon $\theta \to 180^\circ$ ($w = \cos 90^\circ \to 0$), the composition denominator $1 - \mathbf{g}_1\cdot\mathbf{g}_2$ vanishes while the coordinate norm $\lVert\mathbf{g}(\theta)\rVert = \bigl\lvert\tan\frac{\theta}{2}\bigr\rvert$ diverges to $+\infty$;
   - **Stereographic / Cayley quarter-angle vector $2\pi$ south-pole blow-up**: switching to the modified Rodrigues (stereographic spinor) vector $\mathbf{c} := \frac{\mathbf{v}}{1 + w} = \tan\!\bigl(\frac{\theta}{4}\bigr)\hat{\mathbf{u}} \in \mathbb{R}^3$ regularizes $\theta = 180^\circ$ ($\lVert\mathbf{c}(180^\circ)\rVert = 1$) only to blow up to $+\infty$ at the spinor south pole $\theta \to 360^\circ$ ($q = -\mathbf{1},\; w = -1$)!

This is the exact geometric meaning of *"the ternion is inexpressible: the ternion is the minimal circular-arc body"* (`MODEL`): "inexpressibility" is not a defect of the ternion, but the **topological immunity of a closed curved manifold against every flat Cartesian cage**—two circular arcs compose smoothly on $S^3$ with exact non-Abelian spherical triangle holonomy (`shortest_gate_triangle_holonomy` in [@thm-ch39-ternion-spin-factor-and-number-projections], Item 4), while refusing every singularity-free three-column flat ledger!

::: {.viz src="ternion-number-projection-sandbox" preset="flat-3d-zero-divisor-gimbal-deadlock" height="500"}
Flat triplet and $180^\circ$ pole card: at $\theta = 179^\circ$, the flat 3-tuple left-multiplication matrix $L_x$ exposes a real eigenvalue and nonzero null witness while the uncapped Rodrigues readout reaches $\lvert\tan(\theta/2)\rvert = 114.5887$ (the stage magenta pillar is drawn at $\min(4, \lvert\tan(\theta/2)\rvert)$ with a limit ring at $180^\circ$), yet the central violet circular-arc rotor glides smoothly past the half turn. Coordinates and matrices are `NUM`, pole obstructions are `ARGUED`, and ternion primacy is `MODEL`.
:::

## 32.2.3 All Numbers from One Arc: Four Observer Projection Knives Generating $\mathbb{H}, \mathbb{C}, \mathbb{R}$, and $\mathbb{Z}, \mathbb{Q}, \mathbb{P}$ {#sec-ch39-19-3}

If the native ternion $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$ has neither a privileged origin nor an external scalar axis $\mathbf{1}$—sustaining itself solely through three mutually generating circular arcs $[\mathbf{e}_a, \mathbf{e}_b] = \varepsilon_{abc}\mathbf{e}_c$—where does the entire classical edifice of numbers come from? **Only when an observer erects their own first-person reference axis $\mathbf{1}$ (the real axis $\mathbf{I}$ of [§38.7](ch39-s15-brahman-real-axis-and-orthogonal-dream.md#sec-ch39-brahman-real-axis-and-orthogonal-dream)) to measure or transcribe that un-axised circular-arc body do four distinct embedding and slicing knives carve out the entire family of classical number systems!**

We formalize this inverted ontological genealogy of numbers as follows:

::: {.definition #def-ch39-ternion-and-number-projection-operators title="The Un-Axised Ternion (Minimal Circular-Arc Body) and Its Four Observer Number-System Projection Operators (Model Definition)"}
Within the comparative geometric ontology (`MODEL`), define the **native ternion manifold** as the compact three-dimensional minimal circular-arc group manifold $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon \cong S^3 \cong \mathrm{SU}(2)$ generated exponentially by $\mathfrak{su}(2) = \operatorname{span}_{\mathbb{R}}\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\}$ ($[\mathbf{e}_a, \mathbf{e}_b] = \varepsilon_{abc}\mathbf{e}_c$) without an external linear scalar axis $\mathbf{1}$. Once an observer chooses a reference identity $\mathbf{1}$ (and optional positive radial scale $r > 0$), the four classical number-system families arise via four canonical operators:

1. **Quaternionic outer embedding $\iota_{\mathbb{H}} : \mathbb{T}_3 \hookrightarrow \mathbb{H} \cong \mathbb{R} \oplus \mathfrak{su}(2)$ ($4\mathrm{D}$ redundant cosine-shadow embedding)**: adjoining an auxiliary fourth scalar bookkeeping axis $w = \cos\frac{\theta}{2}\,\mathbf{1}$ embeds the curved $3$-manifold $\mathbb{T}_3$ isometrically into flat $\mathbb{R}^4$:

   $$
   \iota_{\mathbb{H}}\bigl(\Delta\mathcal{T}_\epsilon(\theta, \hat{\mathbf{u}})\bigr) \;:=\; \underbrace{\cos\frac{\theta}{2}}_{w}\,\mathbf{1} \;+\; \underbrace{\sin\frac{\theta}{2}\,(u_1\mathbf{i} + u_2\mathbf{j} + u_3\mathbf{k})}_{\mathbf{v}} \;\in\; S^3 \subset \mathbb{H}, \qquad w^2 + \lVert\mathbf{v}\rVert^2 \;\equiv\; 1,
   $$

   which upon radial scaling $r \ge 0$ spans $\mathbb{H} = \{r\,\iota_{\mathbb{H}}(U) \mid r \ge 0,\; U \in \mathbb{T}_3\}$, where $v_{1/2}(\theta) := 1 - w = 2\sin^2\frac{\theta}{4}$ is the **half-angle cosine-sagitta projection tax** paid to linearize curved arc composition into $4 \times 4$ real matrix multiplication;

2. **The complex equatorial slice $\Pi_{\mathbb C}^{(\hat{\mathbf i})}$ and a complex coordinate on the Hopf base**. Choose $\hat{\mathbf i}=\mathbf i$. The orthogonal projection of a quaternion $q=w+x\mathbf i+y\mathbf j+z\mathbf k$ onto the plane $\mathbb C_{\mathbf i}=\mathbb R\mathbf1\oplus\mathbb R\mathbf i$ is $\Pi_{\mathbb C}^{(\mathbf i)}(q)=w+x\mathbf i$. The image of the unit quaternions $S^3$ fills the closed unit disk. The intersection of $S^3$ with the plane is the great circle $S^1_{\mathbf i}$, the commutative group of unit complex numbers. Radial scaling of this circle gives the whole complex plane.

   The [Hopf map in Chapter 1](ch01-measurement.md#rem-pure-ray-literature) sends a normalized spinor $(\psi_0,\psi_1)$ to its ray on the Bloch sphere. For $\psi_0\ne0$ the ray has complex coordinate $\zeta=\psi_1/\psi_0$, since the common phase cancels in the ratio. The north pole $[1:0]$ has $\zeta=0$. In the other chart the south pole $[0:1]$ has coordinate $\psi_0/\psi_1=0$.

3. **Real inner-product trace $\Pi_{\mathbb{R}}^{\mathrm{tr}} : \mathbb{T}_3 \to [-1, 1] \subset \mathbb{R}$ ($1\mathrm{D}$ observer-axis trace and straightened geodesic arc length)**: taking the normalized trace of the $2 \times 2$ spinor representation $U \in \mathrm{SU}(2)$ along the observer identity,

   $$
   \Pi_{\mathbb{R}}^{\mathrm{tr}}(U) \;:=\; \frac{1}{2}\operatorname{Tr}(U) \;=\; \cos\frac{\theta}{2} \;\in\; [-1, 1]
   $$

   (surjecting onto $[-1, 1]$ with value $0$ at $\theta = 180^\circ$, or unwrapping geodesic arc length $s \in \mathbb{R}$ along a fixed generator), strips away every $90^\circ$ blind-zone orientation phase, leaving inside the resulting 1D real algebra $\mathbb{R}$ only the zero-dimensional unit sphere $S^0 = \{x \in \mathbb{R} \mid \lvert x\rvert = 1\} = \{\pm 1\}$;

4. **Topological winding quantization $\Pi_{\mathbb{Z}} : [S^3, \mathbb{T}_3] \xrightarrow{\deg} \mathbb{Z}$ ($0\mathrm{D}$ full-cycle closure into $\mathbb{Z}, \mathbb{Q}, \mathbb{P}$)**: when continuous field configurations from compactified three-space $S^3$ into $\mathbb{T}_3$ achieve `1—3—3—1` volume-to-point closure ($\Lambda^3 \equiv \Lambda^0$), the **third homotopy degree** $\deg : \pi_3(\mathbb{T}_3) = \pi_3(S^3) \xrightarrow{\sim} \mathbb{Z}$ (and, along a chosen 1D equatorial slice $S^1_{\hat{\mathbf{i}}}$, the fundamental-group loop winding $\pi_1(S^1_{\hat{\mathbf{i}}}) \xrightarrow{\sim} \mathbb{Z}$, whereas the full sphere has $\pi_1(S^3) = 0$) quantizes continuous arcs into signed **integers $\mathbb{Z}$**; commensurable phase-locked winding ratios $p/q$ ($q \neq 0$) between two closed equatorial orbits yield **rationals $\mathbb{Q}$**; and irreducible primitive closed orbits model **primes $\mathbb{P}$**.
:::

::: {.viz src="ternion-number-projection-sandbox" preset="hamilton-quaternion-w-shadow-tax" height="500"}
Fourth coordinate and sagitta card: at $\theta = 2\theta^* \approx 84.69^\circ$ (fixed point anchored by [`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint), `LEAN ✓`), the silver scalar column locks onto $w = \cos\theta^* = \theta^* \approx +0.7391$, the cyan vector norm reads $\lVert\mathbf{v}\rVert \approx 0.6736$ ($w^2 + \lVert\mathbf{v}\rVert^2 = 1$), and magenta marks the half-angle sagitta tax $1 - w \approx 0.2609$. Components are `NUM`, and the outer-shadow reading is `MODEL`.
:::

Viewed through [@def-ch39-ternion-and-number-projection-operators], Hamilton's flash of insight at Brougham Bridge on October 16, 1843 becomes transparent (`MODEL` + `Literature`):

- Carving $\mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{i}\mathbf{j}\mathbf{k} = -1$ into the bridge stone did not conjure up a fourth physical dimension—it **borrowed an auxiliary fourth cosine-shadow axis $w = \cos\frac{\theta}{2}\,\mathbf{1}$ from the observer** so the curved three-dimensional ternion $S^3$ could be outer-embedded into a flat four-dimensional ledger $\mathbb{R}^4$! Because $w^2 + x^2 + y^2 + z^2 \equiv 1$ fixes $w = \pm\sqrt{1 - \lVert\mathbf{v}\rVert^2}$ locally on each open hemisphere ($\theta \in [0^\circ, 180^\circ)$ lies on the northern hemisphere $w > 0$, crosses the equator $w = 0$ at $180^\circ$ into the southern hemisphere $w < 0$ on $(180^\circ, 360^\circ]$, and reaches the antipodal south pole $w = -1$ at $\theta = 360^\circ$), $w$ is not an independent fourth degree of freedom, merely the cosine complement of the irreducible sagitta remainder $1 - w = 1 - \cos\frac{\theta}{2}$;
- Restrict multiplication to the plane spanned by $\mathbf{1},\mathbf{i}$. Every pair of elements in this plane commutes, and the inherited quaternion product makes it a copy of the **complex field $\mathbb{C}$**; projecting out the remaining imaginary axis $\hat{\mathbf{i}}$ via $\frac{1}{2}\operatorname{Tr}(U)$ leaves **real numbers $\mathbb{R}$** (where the spinor trace $\frac{1}{2}\operatorname{Tr}_{\mathrm{SU}(2)}(U(\theta)) = \cos\frac{\theta}{2}$ faithfully detects the antipodal sheet $-1$ at $\theta = 360^\circ$, whereas the adjoint trace $\operatorname{Tr}_{\mathrm{SO}(3)}(R(\theta)) = 1 + 2\cos\theta = 4w^2 - 1$ squares away the sign and returns early to $+3$); and counting only completed topological cycles via $\pi_3(S^3) \cong \mathbb{Z}$ and $\pi_1(S^1) \cong \mathbb{Z}$ condenses the continuum into discrete **integers $\mathbb{Z}$**, periodic **rationals $\mathbb{Q}$** (governed by [`long_division_invariant`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_invariant)), and Adelically balanced **prime factors $\mathbb{P}$** (governed by [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula))!

::: {.viz src="ternion-number-projection-sandbox" preset="complex-equatorial-hopf-slice" height="500"}
Equatorial slice card: at $\theta = 120^\circ$ and transverse tilt $\alpha = 0^\circ$, the spherical triangle collapses onto one equatorial great circle so spherical excess vanishes ($\Omega = 0.0000\;\mathrm{sr}$), leaving a commutative unit phase; raising $\alpha$ restores non-Abelian excess (triangle holonomy anchored in [@thm-ch39-ternion-spin-factor-and-number-projections], readouts `NUM`).
:::

## 32.2.4 Formal Anchor Theorem, Literature Boundaries, Eight-Decimal Singularity Audit, and the Number Genealogy Table {#sec-ch39-19-4}

We now assemble the **eight frozen Lean 4 kernel theorems** anchoring the spin-factor cross product, pure-qubit Bloch sphere, two-axis finite rotation words, non-Abelian spherical triangle holonomy, complex-structure minus-identity square, double-cover non-sectionability and $360^\circ$ sheet exchange, and rational Adelic prime-norm conservation:

::: {.theorem #thm-ch39-ternion-spin-factor-and-number-projections title="Spin-Factor Cross-Product Uniqueness, Pure Bloch Sphere, Two-Axis Finite Words, Shortest-Gate Triangle Holonomy, Complex Minus-Square, Double-Cover Lift, and Rational Adelic Product Formula" lean="D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences,D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian,D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word,D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy,D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section,D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift,D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula"}
In the pinned `trureturing` frozen declaration set, the following eight mathematical theorems hold simultaneously:

1. **Unique 3D cross-product classification and Pauli matrix interface on 4D spin factors** ([`complete_consequences`](lean:D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences)): On the four-dimensional real spin-factor carrier $E = \mathbb{R} \times (\operatorname{Fin} 3 \to \mathbb{R})$, for every binary operation $D : E \to E \to E$ satisfying two-point Gram positive semidefiniteness `P2 D` and orthogonal phase balance `PB D`, there exists an orientation $\varepsilon : \mathrm{Orientation}$ ($\varepsilon = \mathrm{.plus}$ or $\varepsilon = \mathrm{.minus}$) such that $D(a, b) = \operatorname{crossD}(\varepsilon, a, b)$ for all $a, b \in E$, together with the full consequence bundle `Consequences D` and $2 \times 2$ complex Pauli interface `MatrixInterfaces (orientationBool ε) D`;

2. **3D real Bloch reconstruction of $2 \times 2$ Hermitian matrices and unit-sphere criterion for pure projections** ([`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian)): For every Hermitian matrix $M \in M_2(\mathbb{C})$ ($M.\mathrm{IsHermitian}$), $M = \operatorname{blochMatrix}\bigl(\operatorname{Re}(\operatorname{Tr} M),\, \operatorname{bloch}(M)\bigr)$, and whenever $\operatorname{Tr} M = 1$ and $M \cdot M = M$, its real Bloch vector satisfies $\lVert\operatorname{bloch}(M)\rVert = 1$;

3. **Exact finite-word generation of $\mathrm{SO}(3)$ from any two non-collinear rotation axes** ([`two_axis_finite_word`](lean:D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word)): For any vectors $a, b \in \mathrm{Space}$ satisfying strict Cauchy–Schwarz non-collinearity $\langle a, b\rangle_{\mathbb{R}}^2 < \lVert a\rVert^2 \lVert b\rVert^2$ and any orthogonal transformation $R \in \mathrm{Orthogonal}$ with $\operatorname{determinant}(R) = 1$, there exists a finite list $l : \operatorname{List}\;\mathrm{Orthogonal}$ satisfying $\operatorname{IsAxisWord}(a, b, l)$ whose product equals $R$: $l.\mathrm{prod} = R$;

4. **Non-Abelian spherical triangle holonomy of three shortest rotor gates** ([`shortest_gate_triangle_holonomy`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy)): For any unit vectors $a, b, c : \operatorname{Fin} 3 \to \mathbb{R}$ ($a \cdot a = b \cdot b = c \cdot c = 1$) that are pairwise non-antipodal ($b \neq -a,\; c \neq -b,\; a \neq -c$), setting $S_{abc} := \operatorname{triangleS}(a, b, c)$ and $D_{abc} := \operatorname{triangleD}(a, b, c)$, one has

   $$
   S_{abc}^2 + D_{abc}^2 \;=\; 2(1 + a \cdot b)(1 + b \cdot c)(1 + c \cdot a) \;>\; 0,
   $$

   the three-step rotor loop closes purely around the initial axis $a$ as

   $$
   \operatorname{rotor}(c, a)\,\operatorname{rotor}(b, c)\,\operatorname{rotor}(a, b) \;=\; \bigl(\sqrt{S_{abc}^2 + D_{abc}^2}\bigr)^{-1}\bigl(S_{abc}\,I_2 - i D_{abc}\,\operatorname{pauliCombination}(a)\bigr),
   $$

   and every unit state $\psi$ ($\psi^\dagger \psi = 1$) fixed by $\operatorname{qubitProjector}(a)\psi = \psi$ acquires the exact return phase $\frac{S_{abc} - i D_{abc}}{\sqrt{S_{abc}^2 + D_{abc}^2}}\,\psi$ under $\operatorname{shortestGate}(a, \operatorname{shortestGate}(c, \operatorname{shortestGate}(b, \psi)))$;

5. **Minus-identity square law for skew-adjoint right-unitary matrices** ([`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)): For any complex matrix $R \in M_n(\mathbb{C})$ over a finite decidable index type $n$ satisfying $R^\dagger = -R$ and $R R^\dagger = I_n$, necessarily $R^2 = -I_n$;

6. **Absence of any continuous global section of the circle squaring double cover** ([`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)): On $\mathrm{Circle}$, there exists no continuous map $s : \mathrm{Circle} \to \mathrm{Circle}$ satisfying $(s(z))^2 = z$ for all $z \in \mathrm{Circle}$;

7. **Unique history-dependent path lifting and $360^\circ$ antipodal sheet exchange** ([`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)): Under $\mathrm{square}(z) := z^2$, every continuous path $\gamma \in C(I, \mathrm{Circle})$ and initial lift $z_0 \in \mathrm{Circle}$ with $\gamma(0) = z_0^2$ admit a **unique** continuous lift $\tilde{\gamma} \in C(I, \mathrm{Circle})$ satisfying $\mathrm{square} \circ \tilde{\gamma} = \gamma$ and $\tilde{\gamma}(0) = z_0$; in particular, lifting $\mathrm{fullTurn}(t) = \exp(2\pi i t)$ ($t \in [0, 1]$) from $+1$ terminates on the antipodal negative sheet $\tilde{\gamma}(1) = -1$;

8. **Rational Archimedean–$p$-adic product formula** ([`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)): For every nonzero rational number $x \in \mathbb{Q}$ ($x \neq 0$), the product of its real absolute value with all prime $p$-adic norms over $\mathrm{Nat.Primes}$ equals $1$:

   $$
   \lvert x\rvert \cdot \prod_{p \in \mathrm{Nat.Primes}}^{\mathrm{fin}} \operatorname{padicNorm}(p, x) \;=\; 1.
   $$

:::

::: proof
Item 1 uses `P2 D` on $E = \mathbb{R} \times \mathbb{R}^3$ to establish spatial skew-symmetry and Cauchy–Schwarz norm bounds, invokes `PB D` to fix orthonormal cross-product norms and connected orientation $\varepsilon \in \{\mathrm{.plus}, \mathrm{.minus}\}$, extends to all four coordinates, and verifies `Consequences` and `MatrixInterfaces` via the Pauli embedding (see [@thm-appf-spin-factor-classification]). Item 2 reconstructs $M$ entrywise from Hermiticity $M^\dagger = M$ and uses $\operatorname{Tr}(M^2) = \frac{1}{2}(1 + \lVert\operatorname{bloch}(M)\rVert^2) = 1$ under $\operatorname{Tr} M = 1$ and $M^2 = M$ to deduce $\lVert\operatorname{bloch}(M)\rVert = 1$. Item 3 shows that the subgroup generated by two non-collinear one-parameter rotation circles is both open and closed inside connected compact $\mathrm{SO}(3)$, hence exhausts all determinant-$1$ orthogonal maps by finite words. Item 4 expands the product of three non-antipodal geodesic rotors $\operatorname{rotor}(u, v) = \frac{(1 + u\cdot v)I_2 - i((u\times v)\cdot\boldsymbol{\sigma})}{\sqrt{2(1 + u\cdot v)}}$ ([`rotor_shortest_gate`](lean:D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.rotor_shortest_gate)), cancels transverse Pauli components back onto $\operatorname{pauliCombination}(a)$, verifies $S_{abc}^2 + D_{abc}^2 = 2(1+a\cdot b)(1+b\cdot c)(1+c\cdot a) > 0$ via the Lagrange–Gram identity ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)), and evaluates on $\operatorname{pauliCombination}(a)\psi = \psi$. Item 5 substitutes $R^\dagger = -R$ into $R R^\dagger = I_n$ to obtain $R(-R) = I_n$, hence $-R^2 = I_n$ and $R^2 = -I_n$. Items 6–7 apply quotient covering path lifting to $z \mapsto z^2$, witness $\tilde{\gamma}(0) = +1 \mapsto \tilde{\gamma}(1) = -1$ via $\exp(\pi i t)$, and rule out any continuous section $s$ since $s(\exp(2\pi i t))$ would force $+1 = -1$. Item 8 factors $x = \pm \prod_p p^{v_p(x)}$ over $\mathrm{Nat.Primes}$ and cancels $\operatorname{padicNorm}(p, x) = p^{-v_p(x)}$ term by term against $\lvert x\rvert = \prod_p p^{v_p(x)}$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch39-frobenius-hurwitz-hopf-rodrigues-literature title="Hamilton's Triplets, Rodrigues's Formula, the Frobenius–Hurwitz–Bott–Milnor–Adams Theorems, Atlas Lower Bounds, and the Selberg Geodesic Boundary (Literature & Epistemic Scope)"}
**Literature results and epistemic scope.** To maintain strict four-tier epistemic honesty, we record the external mathematical literature and model boundaries invoked in this section:

1. **Rodrigues's rotation parameters and Hamilton's thirteen-year search for triplets** (O. Rodrigues, *J. Math. Pures Appl.* **5**, 380–440, 1840; W. R. Hamilton, *Proc. R. Irish Acad.* **2**, 424–434, 1844; *Philos. Mag.* **25**, 489–495, 1844): Rodrigues derived the half-angle rotation composition law and tangent vector $\mathbf{g} = \tan(\frac{\theta}{2})\hat{\mathbf{u}}$ in 1840; Hamilton sought linear 3-tuple multiplication from 1830 until adjoining a fourth scalar coordinate at Brougham Bridge on October 16, 1843;
2. **The `1, 2, 4, 8` division-algebra and sphere-parallelizability theorems** (F. G. Frobenius, *J. Reine Angew. Math.* **84**, 1–63, 1878; A. Hurwitz, *Nachr. Ges. Wiss. Göttingen*, 309–316, 1898; H. Hopf, *Math. Ann.* **104**, 637–665, 1931 & *Comment. Math. Helv.* **13**, 219–239, 1940; R. Bott & J. Milnor, *Bull. Amer. Math. Soc.* **64**, 87–89, 1958; M. Kervaire, *Proc. Natl. Acad. Sci. USA* **44**, 280–283, 1958; J. F. Adams, *Ann. of Math.* **72**, 20–104, 1960): Frobenius classified finite-dimensional associative real division algebras as $\mathbb{R}, \mathbb{C}, \mathbb{H}$; Hurwitz classified unital normed composition algebras as dimensions $1, 2, 4, 8$; Hopf proved cohomologically that real division-algebra dimensions must be powers of $2$; Bott–Milnor and Kervaire proved via $K$-theory that even non-associative real division algebras exist only in dimensions $1, 2, 4, 8$; the same theorems show that among positive-dimensional spheres only $S^1, S^3, S^7$ are parallelizable; and Adams proved that the only spheres carrying a continuous multiplication with unit are $S^0, S^1, S^3, S^7$;
3. **Global flat-chart impossibility and atlas lower bounds on $\mathrm{SO}(3)$ and $S^3$** (J. Stuelpnagel, *SIAM Rev.* **6**(4), 422–430, 1964, DOI `10.1137/1006093`): proves that no continuous injection or singularity-free 3-parameter chart can cover compact $\mathrm{SO}(3)$, and any smooth atlas on $\mathrm{SO}(3)$ requires at least $4$ charts (while $S^3$ requires at least $2$ stereographic charts);
4. **Homotopy degree $\pi_3(S^3) \cong \mathbb{Z}$ and the hyperbolic scope of prime geodesics** (H. Hopf, 1931; A. Selberg, *J. Indian Math. Soc.* **20**, 47–87, 1956): $\pi_3(S^3) \cong \mathbb{Z}$ and $\pi_1(S^1) \cong \mathbb{Z}$ are exact theorems of algebraic topology, whereas identifying primes $\mathbb{P}$ with irreducible primitive closed circular-arc knots (echoing [§31.1](ch34-s28-riemann-path-integral-and-prime-arcs.md#sec-ch34-riemann-path-integral-and-prime-arcs)) is a comparative arithmetic `MODEL`—on positively curved round $S^3$ all primitive closed great-circle geodesics share identical length $2\pi$, while Selberg's discrete prime-geodesic length spectrum $\{\ln N(\gamma_p)\}$ lives on **negatively curved hyperbolic surfaces $\Gamma\backslash\mathbb{H}^2$** (or Adelic quotients), not on round $S^3$, and the classical Riemann Hypothesis [@conj-riemann-hypothesis] remains strictly `OPEN`.
:::

::: {.viz src="ternion-number-projection-sandbox" preset="real-trace-geodesic-projection" height="500"}
Real trace half-angle card: at $\theta = 360^\circ$, the half spinor trace detects the antipodal negative sheet $\frac{1}{2}\operatorname{Tr} U = \cos 180^\circ = -1.0000$, whereas the 3D rotation trace has already returned to $1 + 2\cos 360^\circ = +3.0000$. Full-turn sheet exchange is anchored by Item 7 of [@thm-ch39-ternion-spin-factor-and-number-projections] (`LEAN ✓`), with trace values `NUM`.
:::

We verify all four pillars quantitatively—flat 3D zero divisors, eight-decimal singularity blow-ups across eight benchmark angles, non-Abelian Hurwitz integer quaternion composition, and rational long-division / Adelic prime balance—in the following four-part audit:

::: {.example #ex-ch39-ternion-deadlock-and-eight-angle-projections title="Explicit 3D Zero-Divisor Witness, Eight-Angle Projection & Singularity Audit, Hurwitz 120° Composition, and Adelic Product Check"}
We verify each algebraic and numerical claim in four steps (`manual derivation` / `NUM`):

1. **Part I: Explicit cubic real eigenvalue and zero-divisor pair on flat $\mathbb{R}^3 = \operatorname{span}\{\mathbf{1}, \hat{\mathbf{i}}, \hat{\mathbf{j}}\}$ (`manual derivation`)**:
   Suppose a candidate bilinear multiplication on $\mathbb{R}^3$ keeps $\mathbf{1}$ as two-sided identity, sets $\hat{\mathbf{i}}^2 = \hat{\mathbf{j}}^2 = -\mathbf{1}$, and forces $\hat{\mathbf{i}}\hat{\mathbf{j}}$ back into the plane via $\hat{\mathbf{i}}\hat{\mathbf{j}} = \hat{\mathbf{i}},\; \hat{\mathbf{j}}\hat{\mathbf{i}} = -\hat{\mathbf{i}}$. For the non-scalar element $x = \hat{\mathbf{j}} \notin \mathbb{R}\mathbf{1}$, left multiplication in the ordered basis $(\mathbf{1}, \hat{\mathbf{i}}, \hat{\mathbf{j}})$ maps $\mathbf{1} \mapsto \hat{\mathbf{j}}$, $\hat{\mathbf{i}} \mapsto -\hat{\mathbf{i}}$, and $\hat{\mathbf{j}} \mapsto -\mathbf{1}$, giving

   $$
   L_{\hat{\mathbf{j}}} \;=\; \begin{pmatrix} 0 & 0 & -1 \\ 0 & -1 & 0 \\ 1 & 0 & 0 \end{pmatrix}, \qquad \det(L_{\hat{\mathbf{j}}} - \lambda I_3) \;=\; -(\lambda + 1)(\lambda^2 + 1).
   $$

   The cubic characteristic polynomial exhibits the guaranteed real eigenvalue $\lambda_0 = -1 \in \mathbb{R}$ with nonzero real eigenvector $v = \hat{\mathbf{i}} \neq 0$, yielding the **explicit zero-divisor product**:

   $$
   (x - \lambda_0\mathbf{1}) \cdot v \;=\; (\hat{\mathbf{j}} + \mathbf{1}) \cdot \hat{\mathbf{i}} \;=\; \hat{\mathbf{j}}\hat{\mathbf{i}} + \hat{\mathbf{i}} \;=\; -\hat{\mathbf{i}} + \hat{\mathbf{i}} \;=\; 0 \qquad \bigl(\hat{\mathbf{j}} + \mathbf{1} \neq 0,\; \hat{\mathbf{i}} \neq 0\bigr)!
   $$

2. **Part II: Eight-angle 8-decimal audit of projections and flat-chart singularities (`NUM`, 80-digit checked)**:
   At twice the Dottie self-referential fixed point $\theta^* = \cos\theta^* \approx 0.73908513\;\mathrm{rad} \approx 42.34645883^\circ$ ([`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint))—namely at spatial geodesic angle $\theta = 2\theta^* \approx 84.69291767^\circ$—the fourth-dimension quaternion scalar shadow locks directly onto $w(2\theta^*) = \cos\theta^* = \theta^* \approx 0.73908513$! Across eight benchmark angles $\theta$, we compare $w = \cos\frac{\theta}{2}$, vector norm $\lVert\mathbf{v}\rVert = \lvert\sin\frac{\theta}{2}\rvert$, half-angle sagitta tax $v_{1/2} = 1 - \cos\frac{\theta}{2}$, Rodrigues norm $\lVert\mathbf{g}\rVert = \lvert\tan\frac{\theta}{2}\rvert$, Cayley quarter-angle norm $\lVert\mathbf{c}\rVert = \lvert\tan\frac{\theta}{4}\rvert$, and adjoint trace $\operatorname{Tr}_{\mathrm{SO}(3)}(R) = 1 + 2\cos\theta = 4w^2 - 1$ (versus normalized spinor trace $\frac{1}{2}\operatorname{Tr}_{\mathrm{SU}(2)}(U) = w$):

   | Spatial Angle $\theta$ | Scalar Shadow $w = \cos\frac{\theta}{2}$ | Vector Norm $\lvert\sin\frac{\theta}{2}\rvert$ | Sagitta Tax $1 - \cos\frac{\theta}{2}$ | Rodrigues $\lvert\tan\frac{\theta}{2}\rvert$ | Cayley $\lvert\tan\frac{\theta}{4}\rvert$ | Adjoint Trace $1 + 2\cos\theta$ |
   | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
   | **$0^\circ$ (Identity)** | $+1.00000000$ | $0.00000000$ | $0.00000000$ | $0.00000000$ | $0.00000000$ | $+3.00000000$ |
   | **$60^\circ$ (Sextant Arc)** | $+0.86602540$ | $0.50000000$ | $0.13397460$ | $0.57735027$ | $0.26794919$ | $+2.00000000$ |
   | **$2\theta^* \approx 84.69291767^\circ$** | **$+0.73908513$** | $0.67361203$ | $0.26091487$ | $0.91141331$ | $0.38733701$ | $+1.18498734$ |
   | **$90^\circ$ (Quarter-Turn)** | $+0.70710678$ | $0.70710678$ | $0.29289322$ | $1.00000000$ | $0.41421356$ | $+1.00000000$ |
   | **$120^\circ$ (Hurwitz Unit)** | $+0.50000000$ | $0.86602540$ | $0.50000000$ | $1.73205081$ | $0.57735027$ | $0.00000000$ |
   | **$179^\circ$ (Near $\pi$ Horizon)** | $+0.00872654$ | $0.99996192$ | $0.99127346$ | **$114.58865013$** | $0.99131121$ | $-0.99969539$ |
   | **$180^\circ$ (Rodrigues Pole)** | **$0.00000000$** | $1.00000000$ | $1.00000000$ | **$+\infty$ (undefined pole)** | $1.00000000$ | $-1.00000000$ |
   | **$360^\circ$ (Antipodal $-\mathbf{1}$)** | **$-1.00000000$** | $0.00000000$ | $2.00000000$ | $0.00000000$ | **$+\infty$ (south pole)** | $+3.00000000$ |

   Rows 6–8 expose the flat-chart trap starkly: as $\theta$ steps from $179^\circ$ to $180^\circ$, the curved ternion glides serenely across the equator $(w = 0,\; \lVert\mathbf{v}\rVert = 1)$, while the 3D Rodrigues coordinate explodes from $114.58865013$ to $+\infty$; switching to the Cayley chart survives $180^\circ$ only to explode to $+\infty$ at the spinor south pole $\theta = 360^\circ$ ($q = -\mathbf{1}$)!

3. **Part III: Non-Abelian spherical composition of two orthogonal $90^\circ$ arcs into a $120^\circ$ Hurwitz integer unit (`manual derivation`)**:
   Composing a $90^\circ$ rotation about $\mathbf{i}$ followed by a $90^\circ$ rotation about orthogonal $\mathbf{j}$ does not yield a flat Pythagorean sum $\sqrt{90^2 + 90^2} \approx 127.27922061^\circ$; on $S^3$ their rotor product yields a **Hurwitz unit integer quaternion** (see [Chapter 23](ch23-diophantine-definability.md)):

   $$
   \Delta\mathcal{T}(\tfrac{\pi}{2}, \mathbf{j})\,\Delta\mathcal{T}(\tfrac{\pi}{2}, \mathbf{i}) \;=\; \frac{\mathbf{1} + \mathbf{j}}{\sqrt{2}}\cdot\frac{\mathbf{1} + \mathbf{i}}{\sqrt{2}} \;=\; \frac{\mathbf{1} + \mathbf{i} + \mathbf{j} - \mathbf{k}}{2} \;=\; \cos 60^\circ\,\mathbf{1} + \sin 60^\circ\,\frac{\mathbf{i} + \mathbf{j} - \mathbf{k}}{\sqrt{3}},
   $$

   locking the composite spatial angle at exactly **$120^\circ$** around the body diagonal $\frac{1}{\sqrt{3}}(1, 1, -1)$ while awakening the third orthogonal axis $-\frac{1}{2}\mathbf{k}$—the elementary prototype of `two_axis_finite_word`!

4. **Part IV: Rational long-division period and Adelic prime-norm product check (`manual derivation`)**:
   For $p/q = 1/7$ in base $b = 10$, [`long_division_invariant`](lean:D5/S3/Arith/RepeatingDecimal/RepeatingDecimalQuotient.long_division_invariant) at step $n = 6$ gives $\operatorname{longDivisionPrefix}(10, 1, 7, 6) = 142857$ and $\operatorname{remainder}(10, 1, 7, 6) = 1$, satisfying $7 \times 142857 + 1 = 10^6 \times 1$ around the closed $6$-cycle $(1 \to 3 \to 2 \to 6 \to 4 \to 5 \to 1)$; and for $x = \frac{12}{35} = 2^2 \cdot 3^1 \cdot 5^{-1} \cdot 7^{-1}$, [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula) multiplies $\lvert x\rvert = \frac{12}{35}$ against $\lvert x\rvert_2 = \frac{1}{4},\; \lvert x\rvert_3 = \frac{1}{3},\; \lvert x\rvert_5 = 5,\; \lvert x\rvert_7 = 7$ (with $\lvert x\rvert_p = 1$ for all $p \notin \{2,3,5,7\}$) to give

   $$
   \left\lvert\frac{12}{35}\right\rvert \cdot \frac{1}{4} \cdot \frac{1}{3} \cdot 5 \cdot 7 \;=\; \frac{12}{35} \cdot \frac{35}{12} \;=\; 1.00000000!
   $$

:::

::: {.viz src="ternion-number-projection-sandbox" preset="homotopy-pi3-integer-winding" height="500"}
Two-turn closure and prime-norm balance card: at $\theta = 720^\circ$, two silver beads count $n = \lfloor\theta/360^\circ\rfloor = 2$ completed turns while the spinor lift returns to $+1.0000$; switching $p/q \in \{1/7, 3/5, 12/35, 5/13\}$ checks recurring remainders alongside the Adelic product $\lvert x\rvert\prod_p\lvert x\rvert_p = 1.0000$ (`LEAN ✓` / `ARGUED` / `NUM`; prime-knot analogy `MODEL`).
:::

We summarize the complete number-system projection genealogy across the observer's four knives in the single-line reference table below:

| Number System | Observer Projection / Embedding Knife | Flat Linear Dimension | Unit-Sphere Intrinsic Dim | Associated Constraint, Loss, or Redundancy |
| :--- | :--- | :---: | :---: | :--- |
| **Native Ternion $\mathbb{T}_3 \equiv \Delta\mathcal{T}_\epsilon$** | Un-sliced curved circular-arc closure | **Inexpressible linearly** (odd-$d$ zero divisors & chart poles) | **$3\mathrm{D}$ ($S^3 \cong \mathrm{SU}(2)$)** | Zero redundancy, no external $\mathbf{1}$, full 3-axis non-Abelian excess |
| **Quaternions $\mathbb{H}$** | Outer 4th-dim cosine shadow $\iota_{\mathbb{H}} : w = \cos\frac{\theta}{2}$ | $4\mathrm{D}$ real linear ($1 + 3$) | $3\mathrm{D}$ ($S^3$) | $1$ redundant scalar axis constrained by $w^2 + \lVert\mathbf{v}\rVert^2 = 1$ (tax $1-w$) |
| **Complex Numbers $\mathbb{C}$** | Restriction to the subalgebra spanned by $\mathbf{1},\mathbf{i}$ | $2\mathrm{D}$ real linear ($1 + 1$) | $1\mathrm{D}$ ($S^1$) | Its unit circle is a great circle of $S^3$. Orthogonal projection of $S^3$ fills the disk |
| **Real Numbers $\mathbb{R}$** | Normalized observer trace $\Pi_{\mathbb{R}}^{\mathrm{tr}} = \frac{1}{2}\operatorname{Tr}(U)$ | $1\mathrm{D}$ real linear | $0\mathrm{D}$ ($S^0 = \{\pm 1\}$) | Strips all $90^\circ$ blind-zone orientation phases, keeping signed magnitude |
| **Integers, Rationals & Primes $\mathbb{Z}, \mathbb{Q}, \mathbb{P}$** | Homotopy winding $\pi_3(S^3) \cong \mathbb{Z}$ & phase ratios | $0\mathrm{D}$ discrete lattice / field | Discrete topological charge | Filters out unclosed fractional arcs, retaining full turns, period ratios & prime knots |

This table turns the ontological hierarchy of numbers completely right-side up (`MODEL`): whereas textbooks begin with discrete finger-counting $1, 2, 3$ and patch on negatives, fractions, irrationals, imaginaries, and quaternions as if each step grew more artificial, in zero-background comparative geometry **what exists self-sufficiently first is the un-writable three-dimensional minimal circular-arc ternion $\Delta\mathcal{T}_\epsilon$**! Every number that can be written down in linear symbols has already bowed to the observer's reference axis $\mathbf{1}$—borrow a fourth cosine shadow and it writes as a quaternion, slice one plane and it writes as a complex number, compress to a single trace and it writes as a real number, count only closed full turns and it writes as an integer. Only the ternion that gives birth to all numbers cannot be linearly written, because it erects no isolated $\mathbf{1}$—and precisely because it cannot be written, it lacks nothing.

Yet slicing a single ternion downward into classical numbers is only half of the story! What happens when, instead of slicing curvature away from one ternion, we **couple multiple ternion fields upward** and force their joint state back onto the observer's flat linear ledger? Why do the octonions weave seven ternion fields across the Fano plane, why do the sixteen-dimensional sedenions collapse into zero divisors, and why does quantum mechanics seem to explode into **$2^N$-dimensional many-body Hilbert space and infinite-dimensional functional spaces**? Let us open the third section of Chapter 32—[§32.3 Ternions Are Native Fields: Demystifying the Cayley–Dickson Ladder, Fano Octonions, and Hilbert Space as Multi-Field Linear Reprojections](ch39-s20-ternion-field-composition-and-hilbert-reprojection.md).

::: {.viz src="ternion-number-projection-sandbox" height="620"}
Full laboratory: toggle between the All-Numbers-from-Arc and Division-Algebra & Homotopy lenses, sweep rotation $\theta \in [0^\circ, 720^\circ]$, transverse tilt $\alpha$, and rational $p/q$, and compare flat-triplet zero divisors, quaternion scalar shadows, equatorial slices, spinor traces, and full-turn closures side by side. Frozen statements, numerics, literature, models, and open problems are labeled separately in the evidence panel and theory drawer.
:::
