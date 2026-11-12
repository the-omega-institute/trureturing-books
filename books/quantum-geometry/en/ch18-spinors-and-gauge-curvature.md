# Dirac Spinors and Gauge Fields: Why Fermions Detour Through the Sphere and Why Force Is Area Curvature

> *"Then area and line, wave and particle, are all aspects of a field."*

In the [previous chapter](ch17-lorentz-geometry.md), we saw how vanishing on the null cone locks the spacetime quadratic form up to a scalar factor $t^2 - \norm{w}^2$ ([@prop-null-cone-rigidity]), while hyperbolic rotors preserve the relativistic dispersion relation $E^2 - p^2 = m^2$ (in natural units $c = 1$). Now we turn to matter and interactions moving across that relativistic stage and confront two questions that go to the heart of modern field theory:

1. **Why can a massive free Dirac fermion not decouple into independent left- and right-chiral Weyl modes like a massless chiral fermion, and how does the off-diagonal mass term $m$ couple left- and right-chiral components into massive Dirac energy eigenstates (producing chiral oscillations when initialized in a definite-chirality state or Zitterbewegung when positive- and negative-energy components are superposed)?**
2. **Why is a gauge interaction — electromagnetic or Yang–Mills — geometrically neither Newtonian action at a distance nor an isolated phase on an unanchored open edge, but an invariant phase captured by closed plaquette loops (and root-to-anchor transport between fixed reference vertices) that no allowed gauge transformation can erase?**

The opening epigraph points to the common geometric thread linking both questions: when one-dimensional idempotent lines (particles) and two-dimensional bivector phase rotations (waves and areas) are placed on a network, chiral spinor coupling and gauge curvature emerge as two facets of a field. Following our three-tier epistemological contract, this chapter begins with the Lean-verified two-dimensional anticommuting Weyl pair ([@lemma-qubit-clifford-pair]) and the algebraic covariant commutator identity ([@prop-covariant-commutator]), then proves the exact spanning-tree phase transport theorem ([@thm-tree-phase-transport]) and anchored loop-phase classification theorem ([@cor-anchored-phase-classification]) for abelian $U(1)$ (`Circle`) gauge fields on named graphs, while keeping four-dimensional Dirac Zitterbewegung and continuum non-abelian gauge theory within explicitly demarcated literature remarks.

::: {.figure src="ch18-overview"}
**Figure 18.** A map of the chapter. Panel I: the two components of the two-component chiral model $H = pZ + mX$, the blue upper component $Z = +1$ and the orange, striped lower component $Z = -1$, each carry only their diagonal term $\pm p$, and the mass $m$ is the only link between them. Panel II: on a $3 \times 3$ lattice the cyan spanning tree is the three rows and the left column, the other $4 = m + 1 - n$ vertical edges are chords, and the magenta chord closes, through the tree, the magenta fundamental loop. Panel III: the single square of the worked example under the violet gauge $g = (1, i, -1, -i)$; the phase pointers at the edge midpoints read $(i, i, i, -1)$, and the magenta loop phase at the centre is still $i$ ([@cor-anchored-phase-classification]).
:::

## Chiral decomposition and explicit anticommutation {#sec-chiral-factorization}

Begin with the algebraic puzzle Paul Dirac faced in 1928. A relativistic particle of rest mass $m$ and momentum $p$ obeys the quadratic dispersion relation $E^2 = p^2 + m^2$. Quantum time evolution, however, is first-order in time: to build a linear first-order Hamiltonian $H = p\alpha + m\beta$ free of the square root $\sqrt{p^2 + m^2}$, the square of the linear operator $p\alpha + m\beta$ must reproduce the sum of squares $p^2 + m^2$ identically:

$$
(p\alpha + m\beta)^2 = p^2 \alpha^2 + pm(\alpha\beta + \beta\alpha) + m^2 \beta^2 \stackrel{!}{=} (p^2 + m^2)I.
$$

If $\alpha$ and $\beta$ were ordinary commuting numbers, the cross term $2pm\alpha\beta$ could never vanish for nonzero $p$ and $m$. To keep $\alpha^2 = I$ and $\beta^2 = I$ while annihilating $\alpha\beta + \beta\alpha = 0$, $\alpha$ and $\beta$ must **anticommute**: $\alpha\beta = -\beta\alpha$.

In finite-dimensional complex matrix algebra, the smallest faithful carrier of an anticommuting self-adjoint involution pair is the $2\times 2$ qubit matrix algebra $\operatorname{QubitMatrix} = M_2(\mathbb{C})$ equipped with $\operatorname{qubitX}$ and $\operatorname{qubitZ}$ from [Chapter 1](ch01-measurement.md). Keep three dimensions distinct: the spinor state carrier $\mathbb{C}^2$ has **complex dimension $2$** (and **real dimension $4$**); the rotation Lie algebra $\mathfrak{su}(2) \simeq \mathbb{R}^3$ spanned by traceless skew-Hermitian Pauli generators has **real dimension $3$**; and the full $2\times 2$ matrix algebra $\operatorname{QubitMatrix} = M_2(\mathbb{C})$ has **complex dimension $4$** and **real dimension $8$** (isomorphic as a real algebra to the $8$-dimensional Clifford algebra $\mathrm{Cl}_{3,0}(\mathbb{R})$).

::: {.lemma #lemma-qubit-clifford-pair title="A two-dimensional anticommuting pair" lean="D5/S3/Quantum/FiniteDimensional.qubit_weyl_star"}
In the $2\times 2$ complex matrix algebra $\operatorname{QubitMatrix} = M_2(\mathbb{C})$ (of complex dimension $4$, acting on the two-dimensional complex Hilbert space $\mathbb{C}^2$), define the fixed matrices

$$
\operatorname{qubitX} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \qquad \operatorname{qubitZ} = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}.
$$

Writing $\operatorname{star}(A) = A^*$ for the conjugate transpose and $1 = I_2$ for the $2\times 2$ identity matrix, all five identities hold simultaneously:

$$
\begin{aligned}
\operatorname{qubitZ} \cdot \operatorname{qubitX} &= -(\operatorname{qubitX} \cdot \operatorname{qubitZ}), \qquad
\operatorname{star}(\operatorname{qubitX}) = \operatorname{qubitX}, \qquad
\operatorname{star}(\operatorname{qubitZ}) = \operatorname{qubitZ}, \\
\operatorname{qubitX}^2 &= 1, \qquad
\operatorname{qubitZ}^2 = 1.
\end{aligned}
$$
:::

::: proof
Direct matrix multiplication over `Fin 2 × Fin 2` gives $\operatorname{qubitZ}\cdot\operatorname{qubitX} = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ and $\operatorname{qubitX}\cdot\operatorname{qubitZ} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} = -\operatorname{qubitZ}\cdot\operatorname{qubitX}$. Because both matrices have real entries symmetric across the main diagonal with unit row norms, self-adjointness and $\operatorname{qubitX}^2 = \operatorname{qubitZ}^2 = 1$ follow entrywise. The full proof is checked by the Lean kernel.
:::

Note the precise scope of [@lemma-qubit-clifford-pair] in this chapter: it is the finite-dimensional two-component algebraic starting point for Dirac-type linearization of $p^2 + m^2$, not a formalization of the four-dimensional continuum Dirac partial differential equation. Using this pair, we can immediately work out an explicit two-component chiral coupling example by hand.

::: {.example #ex-chiral-two-by-two title="Explicit Spectrum of the Two-By-Two Chiral Hamiltonian H = 3Z + 4X"}
In natural units ($\hbar = c = 1$), consider the two-component chiral Hamiltonian $H = pZ + mX$ (with $Z = \operatorname{qubitZ}$ and $X = \operatorname{qubitX}$) at momentum $p = 3$ and mass coupling $m = 4$:

$$
H = 3Z + 4X = \begin{pmatrix} 3 & 4 \\ 4 & -3 \end{pmatrix}.
$$

Without solving a characteristic polynomial, apply the five identities of [@lemma-qubit-clifford-pair] directly to compute $H^2$:

$$
H^2 = 3^2 Z^2 + 3\cdot 4(ZX + XZ) + 4^2 X^2 = 9I + 12(0) + 16I = 25I.
$$

Thus $E^2 = 25$, giving energy eigenvalues $E = \pm 5$ (the Pythagorean triple $3^2 + 4^2 = 5^2$).

Inspect the structure of $H = \begin{pmatrix} 3 & 4 \\ 4 & -3 \end{pmatrix}$: at $m = 0$, $H = 3Z = \operatorname{diag}(3, -3)$ is diagonal and the two chiral eigenstates of $Z$ propagate independently without coupling; turning on $m = 4$ introduces the off-diagonal operator $mX$ that linearly couples the two chiral components (with coupling angular frequency scale $m/\hbar$). Keep **operator coupling** distinct from **mandatory state oscillation**: an energy eigenstate of $H = 3Z + 4X$ — such as $\frac{1}{\sqrt{5}}(2, 1)^\top$ for $E = +5$ or $\frac{1}{\sqrt{5}}(1, -2)^\top$ for $E = -5$ — is a stationary coherent superposition of both chiral components that evolves purely by the phase factor $e^{\mp 5it}$, keeping its chiral probabilities ($4/5$ and $1/5$) constant in time; coherent oscillations between the two chiral populations occur when the state is initialized in a definite-chirality basis vector (such as $(1, 0)^\top$, which superposes the $E = +5$ and $E = -5$ eigenstates). Here we treat $H$ strictly as an exact $2\times 2$ Hermitian matrix model: we do not assign an unconditional stochastic reflection rate to measurements, nor do we conflate this two-dimensional pedagogical matrix with full four-dimensional Dirac dynamics.
:::

::: {.figure src="ch18-chiral-levels"}
**The mass pushes the two chiral levels $\pm 3$ apart to $\pm 5$.** Left column, $m = 0$: the bar at $E = +3$ is all blue (upper component, $Z = +1$) and the bar at $E = -3$ all striped orange (lower component, $Z = -1$). Right column, $m = 4$: the bars are pushed to $E = \pm 5$; the $+5$ bar is $4/5$ blue and $1/5$ striped orange, and the $-5$ bar the other way round. Each energy eigenstate is now a fixed-ratio mixture of the two chiral components.
:::

The $4/5$ and $1/5$ of the $+5$ bar do not change in time; started in the pure upper component $(1, 0)^\top$, the upper population swings back and forth instead.

::: {.figure src="ch18-chiral-precession"}
**Started in the pure upper component, the upper population swings back and forth; started in an energy eigenstate, it stands still.** Left, the $x$–$z$ section of the Bloch sphere: the violet axis points along $(4, 0, 3)/5$, the direction of $H = 3Z + 4X$, and the violet dot at its tip is the eigenstate of $E = +5$; the amber arrow is the pure upper component $(1, 0)^\top$, and the circle it sweeps about the violet axis is seen edge-on as a dashed amber segment, whose cyan shadow on the $z$ axis runs from $P = 1$ to $P = 9/25$. Right: the cyan curve is the upper population started from $(1, 0)^\top$, swinging between $1$ and $9/25$; the flat violet line starts from the eigenstate $\tfrac{1}{\sqrt{5}}(2, 1)^\top$ and stays at $4/5$ ([@ex-chiral-two-by-two]). The curves are computed point by point from the $2\times 2$ matrix.
:::

::: {.remark #rem-dirac-zitterbewegung-literature title="Four-Dimensional Dirac Equation and Zitterbewegung Frequencies (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In $(1 + 3)$-dimensional Minkowski spacetime, linearizing $E^2 - p_x^2 - p_y^2 - p_z^2 = m^2$ requires four mutually anticommuting operators, realized by $4\times 4$ Dirac gamma matrices satisfying the Clifford algebra relations

$$
\gamma^\mu \gamma^\nu + \gamma^\nu \gamma^\mu = 2\eta^{\mu\nu} I_4 \qquad (\mu, \nu \in \{0, 1, 2, 3\}),
$$

where the mass term $m$ couples left-handed and right-handed two-component Weyl spinors.

In the physics literature, three distinct quantities must be kept carefully separate:

1. **The chiral coupling frequency $\omega_{\mathrm{couple}} = mc^2/\hbar$**, which sets the matrix element coupling left- and right-handed chiral components in the Dirac Hamiltonian;
2. **The rest-scale free-Dirac Zitterbewegung angular frequency $\omega_{\mathrm{Z}} = 2mc^2/\hbar$**, which arises from interference between positive-energy ($+mc^2$) and negative-energy ($-mc^2$) components separated by the energy gap $2mc^2$;
3. **The per-step reversal amplitude in Feynman's $1+1$-dimensional checkerboard path integral**, where each lattice step carries a complex amplitude weight $i\varepsilon mc^2/\hbar$ rather than a classical Markov reflection probability.

See R. P. Feynman & A. R. Hibbs, *Quantum Mechanics and Path Integrals* (McGraw–Hill, 1965); and D. Hestenes, *Space-Time Algebra* (Gordon and Breach, 1966).
:::

## Plaquette transport and commutators {#sec-curvature-plaquette}

Now take the next geometric step: when a quantum state carrying an internal phase moves from one site to a neighboring site, how do we compare phases across the step?

In gauge theory, comparing states across separated points requires a **parallel transport operator** $U$. In any associative ring $B$, suppose transporting past an observable or field element $f$ intertwines $f$ with a shifted element $\mathit{translated}$ via semiconjugacy ([`SemiconjBy`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)): $U f = \mathit{translated} \cdot U$. What is the commutator $U f - f U$ measuring the discrepancy between acting with $f$ before transport versus after transport?

The Lean module `CovariantCommutator` shows that in any ring whatsoever, this commutator factors into the shift difference $(\mathit{translated} - f)$ multiplied on the right by the transporter $U$.

::: {.proposition #prop-covariant-commutator title="Covariant commutator factorization" lean="D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula"}
Let $B$ be any type equipped with a ring structure (`Ring B`, without assuming commutativity, a topology, or a norm), and let $U, f, \mathit{translated} \in B$. If $\operatorname{SemiconjBy}\;U\;f\;\mathit{translated}$ holds (that is, $U \cdot f = \mathit{translated} \cdot U$), then

$$
U \cdot f - f \cdot U = (\mathit{translated} - f) \cdot U.
$$
:::

::: proof
By the semiconjugacy hypothesis `hcov : SemiconjBy U f translated`, we have $U \cdot f = \mathit{translated} \cdot U$. Right distributivity of multiplication over subtraction (`sub_mul`) in `Ring B` gives

$$
(\mathit{translated} - f) \cdot U = \mathit{translated} \cdot U - f \cdot U = U \cdot f - f \cdot U.
$$

The full proof is checked by the Lean kernel.
:::

Notice the generality and restraint of [@prop-covariant-commutator]: `translated` is an abstract ring element satisfying $Uf = \mathit{translated}\,U$, and must not be automatically interpreted as a differentiable spacetime translation operator unless additional continuum structure is supplied. When two transport steps along distinct directions are composed around the four edges of an elementary square (a **plaquette**), the failure of transport to commute around the closed boundary measures gauge curvature.

::: {.remark #rem-gauge-holonomy-literature title="Covariant Derivative Commutators, Non-Abelian Holonomy, and the Aharonov–Bohm Effect (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In continuum differential geometry and Yang–Mills gauge theory, writing the covariant derivative in the mathematical connection convention $D_\mu = \partial_\mu + A_\mu$ expresses the curvature two-form components directly as the commutator

$$
F_{\mu\nu} = [D_\mu, D_\nu] = \partial_\mu A_\nu - \partial_\nu A_\mu + [A_\mu, A_\nu].
$$

When written in terms of the physical electromagnetic or gauge potential $D_\mu = \partial_\mu - \frac{iq}{\hbar} A^{\mathrm{phys}}_\mu$, the commutator becomes $[D_\mu, D_\nu] = -\frac{iq}{\hbar} F^{\mathrm{phys}}_{\mu\nu}$ (in the abelian $U(1)$ case $[A_\mu, A_\nu] = 0$, and the line integral around a closed loop yields the magnetic flux phase shift $\Delta\varphi = q\Phi_B/\hbar$ of the Aharonov–Bohm effect). In continuum lattice-gauge approximations, integrating a smooth gauge potential counter-clockwise around an oriented elementary plaquette spanned by small displacements $\Delta x^\mu$ and $\Delta x^\nu$ (with fixed indices $\mu, \nu$ not summed) yields the small-plaquette asymptotic expansion
$$
U_\square = \exp\left(\frac{iq}{\hbar} F^{\mathrm{phys}}_{\mu\nu}\Delta x^\mu \Delta x^\nu\right) + O\bigl(\norm{\Delta x}^3\bigr) \qquad (\text{continuum small-plaquette approximation}).
$$

For a non-abelian gauge group, closed-loop holonomy transforms by basepoint conjugation $U_\square \mapsto g_0 U_\square g_0^{-1}$, so only its **conjugacy class** or Wilson loop trace $\Tr U_\square$ is gauge-invariant. The continuum small-plaquette expansion above belongs to differential-geometric approximation theory, whereas the frozen Lean theorems in the next two sections ([@thm-tree-phase-transport] and [@cor-anchored-phase-classification]) apply strictly to exact discrete abelian unit-circle phases $\operatorname{Circle} = U(1)$ on named graphs without any continuum limit, and must not be promoted into continuum non-abelian Yang–Mills theorems. See Y. Aharonov & D. Bohm, *Phys. Rev.* **115**, 485 (1959), DOI: `10.1103/PhysRev.115.485`; and K. G. Wilson, *Phys. Rev. D* **10**, 2445 (1974), DOI: `10.1103/PhysRevD.10.2445`.
:::

## Phase transport on a selected spanning tree {#sec-tree-gauge-transport}

Let us now analyze abelian $U(1)$ gauge fields on an arbitrary graph completely, without a single continuum approximation.

Let $V$ be any vertex type and $E$ any named directed edge type (in this section, **no finiteness assumption is required on $V$ or $E$**), with source and target maps $s, t : E \to V$. Each directed edge $e \in E$ carries a phase $u(e) \in \operatorname{Circle} = \{z \in \mathbb{C} \mid |z| = 1\}$. Under a vertex gauge transformation $g : V \to \operatorname{Circle}$, edge phases transform via

$$
\operatorname{gauge}(s, t, g, u)(e) = g\bigl(t(e)\bigr) \cdot u(e) \cdot g\bigl(s(e)\bigr)^{-1}.
$$

::: {.viz src="lattice-gauge-loop" preset="twist" height="500"}
**Twist one corner, and the phases on its two edges run through every value.** On a single square only corner 1 turns, a full circle (the amber gauge hand): the hands on $e_0$ and $e_1$ turn opposite ways, each passing $1, i, -1, -i$, and the faint arcs are the angles they have swept; the magenta loop phase at the centre stays at $i$, with no arc on its dial.
:::

Because $g$ can rotate the phase at each endpoint independently, the phase on a single open edge is never gauge-invariant by itself. To synchronize phases across the graph, we select a **named spanning tree** (`NamedSpanningTree`) $T \subseteq E$ and a reference root vertex $r \in V$:

- Every tree edge $e \in T$ is non-loop ($\forall e \in T,\; s(e) \neq t(e)$);
- The undirected endpoint map $e \mapsto \{s(e), t(e)\}$ is injective on $T$ (no parallel tree edges);
- The simple support graph $\operatorname{treeSupport}(s, t, T)$ is a connected acyclic tree (`IsTree`), while non-tree edges $e \notin T$ outside $T$ may freely include parallel edges and self-loops.

In $\operatorname{treeSupport}(s, t, T)$, every vertex $a \in V$ is connected to the root $r$ by a unique simple tree path $\operatorname{rootPath}(ht, r, a)$. Multiplying the edge phases along this unique tree path (multiplying by $u(e)$ along forward steps and $u(e)^{-1}$ along reverse steps) defines the **root-to-vertex tree phase** `rootPhase` $\operatorname{rootPhase}(ht, r, u, a) \in \operatorname{Circle}$. Our next theorem establishes all six fundamental properties of tree phase transport.

::: {.figure src="ch18-root-path"}
**The tree phase multiplies along the one tree path.** Cyan is the spanning tree $T$; the grey dashed edges are the chords outside it, among them a self-loop and an edge parallel to a tree edge. The thick cyan path from the root $r$ to $a$ runs through $e_1$, $e_2$, $e_3$: walking with an edge's arrow multiplies by $u(e)$, walking against it ($e_2$) by $u(e)^{-1}$, so $\operatorname{rootPhase}(a) = u(e_1)\,u(e_2)^{-1}\,u(e_3)$.
:::

::: {.theorem #thm-tree-phase-transport title="Selected-tree phase transport" lean="D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport"}
Let $V$ and $E$ be arbitrary types, $s, t : E \to V$ source and target maps, $T \subseteq E$ a selected subset of edges, $ht : \operatorname{NamedSpanningTree}\;s\;t\;T$ a named spanning tree, and $r \in V$ a root vertex. For edge phase fields valued in $\operatorname{Circle} = U(1)$, all six properties hold simultaneously:

1. **Root normalization**: For all $u : E \to \operatorname{Circle}$, $\operatorname{rootPhase}\;ht\;r\;u\;r = 1$;
2. **Tree-edge reconstruction**: For all $e \in T$ and all $u : E \to \operatorname{Circle}$,

$$
\operatorname{rootPhase}\;ht\;r\;u\;\bigl(t(e)\bigr) = u(e) \cdot \operatorname{rootPhase}\;ht\;r\;u\;\bigl(s(e)\bigr);
$$

3. **Endpoint gauge covariance**: For all vertex gauges $g : V \to \operatorname{Circle}$, all edge fields $u : E \to \operatorname{Circle}$, and all vertices $a \in V$,

$$
\operatorname{rootPhase}\;ht\;r\;(\operatorname{gauge}\;s\;t\;g\;u)\;a = g(a) \cdot \operatorname{rootPhase}\;ht\;r\;u\;a \cdot g(r)^{-1};
$$

4. **Continuity**: For all $a \in V$, the evaluation map $u \mapsto \operatorname{rootPhase}\;ht\;r\;u\;a$ is continuous with respect to the product topology;
5. **Pointwise multiplicativity**: For all $u, w : E \to \operatorname{Circle}$ and all $a \in V$,

$$
\operatorname{rootPhase}\;ht\;r\;(u \cdot w)\;a = \operatorname{rootPhase}\;ht\;r\;u\;a \cdot \operatorname{rootPhase}\;ht\;r\;w\;a;
$$

6. **Trivial field preservation**: For all $a \in V$, $\operatorname{rootPhase}\;ht\;r\;1\;a = 1$.
:::

::: proof
In $\operatorname{treeSupport}(s, t, T)$, the unique simple path from $r$ to $r$ is the empty walk `.nil`, giving transport product $1$ (property 1). For any tree edge $e \in T$, appending $e$ to the tree path from $r$ to $s(e)$ shares the same reduced tree path as $\operatorname{rootPath}(ht, r, t(e))$, cancelling backtracking steps to yield $\operatorname{rootPhase}(t(e)) = u(e)\operatorname{rootPhase}(s(e))$ (property 2). Inducting along any walk shows that intermediate gauge factors $g(v)^{-1}g(v) = 1$ telescope at every internal vertex, leaving only the endpoint factors $g(a)$ and $g(r)^{-1}$ (property 3). Because each fixed tree path has finite length and $\operatorname{Circle}$ is a compact abelian topological group, continuity, multiplicativity, and preservation of the identity field $1$ (properties 4–6) follow by induction along the walk. The full proof is checked by the Lean kernel.
:::

## Loop phases and anchored gauge equivalence {#sec-gauge-loop-coordinates}

Look closely at property 3 of [@thm-tree-phase-transport]: under a gauge transformation $g$, the tree transport phase to vertex $a$ transforms as $g(a)\cdot\operatorname{rootPhase}(u, a)\cdot g(r)^{-1}$. Two immediate invariants jump out:

- For every **non-tree chord edge** $e \notin T$, traversing the unique tree path from $r$ to $s(e)$, crossing $e$ itself, and returning along the tree from $t(e)$ to $r$ forms a **fundamental closed loop** whose phase $\operatorname{rootPhase}(u, s(e))\,u(e)\,\operatorname{rootPhase}(u, t(e))^{-1}$ cancels both $g(s(e))$ and $g(t(e))$ identically.

::: {.viz src="lattice-gauge-loop" preset="chord" height="500"}
**The fundamental loop of a chord ignores gauge transformations.** On two squares, the cyan spanning tree is the top and bottom rows and the leftmost column; the fundamental loop of the right-hand chord is the whole rectangle inside the dashed magenta line. Every corner except the root turns: every hand on an edge moves, and the faint arcs are the angles they sweep; yet the magenta hands of both squares and of the outer loop stay put, with no arc on their dials (property 3 of [@thm-tree-phase-transport]).
:::

- Moreover, if we fix a set of **reference anchor vertices** $R \subseteq V$ containing the root $r \in R$ and restrict gauge transformations to the **anchored gauge subgroup**

$$
\operatorname{anchoredGroup}(R) = \bigl\{\, g : V \to \operatorname{Circle} \;\big|\; \forall a \in R,\; g(a) = 1 \,\bigr\},
$$

then for every non-root anchor $a \in R \setminus \{r\}$, the root-to-anchor tree phase $\operatorname{rootPhase}(u, a)$ also becomes strictly invariant because $g(a) = g(r) = 1$!

::: {.viz src="lattice-gauge-loop" preset="anchor" height="500"}
**The tree-path phase between two anchors cannot be twisted.** On four squares, the root $r$ and the top-right corner $a$ are both locked squares and every other corner turns freely: each edge along the tree path $r \to a$ (the cyan band) moves (the faint arcs are the angles swept), yet the path phase shown by the cyan hand on the right stays put, with no arc on its dial.
:::

When $V$ and $E$ are finite (`[Fintype V] [Fintype E]`), [`AnchoredPhaseClassification`](lean:D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification) packages these two families of invariants into the product coordinate space

$$
\operatorname{Coordinates}(T, R, r) = \bigl(\{e : E \mid e \notin T\} \to \operatorname{Circle}\bigr) \times \bigl(\{x : V \mid x \in R \land x \neq r\} \to \operatorname{Circle}\bigr),
$$

defines the continuous multiplicative coordinate homomorphism $\chi = \operatorname{coordinateHom}(ht, R, r)$ and its canonical section $\sigma = \operatorname{phaseSection}(s, t, T, R, r)$, and establishes the complete topological-group classification of anchored abelian gauge fields.

::: {.corollary #cor-anchored-phase-classification title="Anchored phase classification" lean="D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification"}
Let $V$ and $E$ be finite types (`[Fintype V] [Fintype E]`), $s, t : E \to V$, $T \subseteq E$, $ht : \operatorname{NamedSpanningTree}\;s\;t\;T$, $R \subseteq V$ an anchor set, and $r \in V$ with $r \in R$. Set $\chi = \operatorname{coordinateHom}\;ht\;R\;r$, $\sigma = \operatorname{phaseSection}\;s\;t\;T\;R\;r$, $N = \operatorname{range}(\operatorname{coboundary}\;s\;t\;R)$, and define the cardinalities $c = |\{e : E \mid e \notin T\}|$, $a = |\{x : V \mid x \in R \land x \neq r\}|$, $n = |V|$, $m = |E|$, and $k = |R|$. Then all of the following hold:

1. **Gauge invariance and exact orbit characterization**: For all $g \in \operatorname{anchoredGroup}(R)$ and $u : E \to \operatorname{Circle}$, $\chi(\operatorname{gauge}\;s\;t\;g\;u) = \chi(u)$; and for all $u, w : E \to \operatorname{Circle}$,

$$
\chi(u) = \chi(w) \iff \exists g \in \operatorname{anchoredGroup}(R),\; \operatorname{gauge}\;s\;t\;g\;u = w;
$$

2. **Continuous multiplicative section and kernel identity**: $\operatorname{RightInverse}\;\sigma\;\chi$ ($\chi \circ \sigma = \mathrm{id}$), $\sigma$ is continuous, and $\sigma(z \cdot z') = \sigma(z) \cdot \sigma(z')$ for all $z, z' \in \operatorname{Coordinates}(T, R, r)$; furthermore $\ker(\chi) = N$, and in the quotient group $(E \to \operatorname{Circle}) / N$,

$$
[u]_N = [w]_N \iff \exists g \in \operatorname{anchoredGroup}(R),\; \operatorname{gauge}\;s\;t\;g\;u = w;
$$

3. **Quotient topological-group isomorphism and separation**: There exists a topological-group isomorphism $q : ((E \to \operatorname{Circle}) / N) \simeq_{\mathrm{t}*} \operatorname{Coordinates}(T, R, r)$ satisfying $q([u]_N) = \chi(u)$ for all $u$ and $q^{-1}(z) = [\sigma(z)]_N$ for all $z$; the quotient $(E \to \operatorname{Circle}) / N$ is a `CompactSpace`, `T2Space` (Hausdorff), and `IsTopologicalGroup`, and $N$ is closed (`IsClosed`);
4. **Combinatorial dimension identities and torus isomorphism**:

$$
\begin{aligned}
|T| + 1 &= n, \qquad c + |T| = m, \qquad a + 1 = k, \qquad c + a + n = m + k, \\
c + a &= m + k - n, \qquad c = m + 1 - n, \qquad c + a = c + k - 1,
\end{aligned}
$$

and $\operatorname{Nonempty}\bigl(\operatorname{Coordinates}(T, R, r) \simeq_{\mathrm{t}*} (\operatorname{Fin}(m + k - n) \to \operatorname{Circle})\bigr)$.
:::

::: proof
By endpoint gauge covariance in [@thm-tree-phase-transport], the vertex gauge factors at $s(e)$ and $t(e)$ cancel in every fundamental chord loop $e \notin T$, while $g(a) = g(r) = 1$ at every anchor $a \in R$, so function extensionality (`Prod.ext` and `funext`) establishes $\chi(\operatorname{gauge}\;s\;t\;g\;u) = \chi(u)$; conversely, if $\chi(u) = \chi(w)$, defining the root-referenced vertex potential ratio $g(v) = \operatorname{rootPhase}(w, v)\cdot\operatorname{rootPhase}(u, v)^{-1}$ gives $g \in \operatorname{anchoredGroup}(R)$ (by root normalization and equality of non-root anchor coordinates) and satisfies $\operatorname{gauge}\;s\;t\;g\;u = w$ edge-by-edge (`funext e`, using property 2 `hedge` on tree edges and chord coordinate equality outside $T$). For the canonical section $\sigma(z) = \operatorname{gauge}(s, t, \operatorname{sectionPotential}(z), \operatorname{sectionLoops}(z))$, because `sectionLoops` is identically $1$ on $T$, its tree transport `rootPhase` is identically $1$, so endpoint gauge covariance gives $\operatorname{rootPhase}(\sigma(z), v) = \operatorname{sectionPotential}(z, v)$, proving $\chi(\sigma(z)) = z$ (`RightInverse`) and $\ker(\chi) = N$ (claims 1–2). Because $\chi$ and $\sigma$ are continuous homomorphisms between compact Hausdorff abelian topological groups with $\chi \circ \sigma = \mathrm{id}$, the quotient homomorphism $q$ is a homeomorphic group isomorphism (claim 3). Finally, a spanning tree on $n$ vertices has $|T| = n - 1$ edges, leaving $c = m - |T| = m + 1 - n$ non-tree chords and $a = k - 1$ non-root anchors, so the coordinate torus has dimension $c + a = m + k - n$ (claim 4). The full proof is checked by the Lean kernel.
:::

::: {.viz src="lattice-gauge-loop" preset="two" height="500"}
**Multiply the loop phases of two neighbouring squares and you get the outer loop.** On two squares only the shared middle edge turns (amber): the magenta hand of the left square turns by $+150^\circ$, the right square by $-150^\circ$ (the faint magenta arcs), and the magenta hand of the outer loop does not move and has no arc. The shared edge is walked in opposite directions in the two squares and cancels in the product, so only $c = m + 1 - n = 7 + 1 - 6 = 2$ of the three loops are independent (claim 4 of [@cor-anchored-phase-classification]).
:::

> Phase along an unanchored tree branch can be ironed flat by local gauge choices; the fundamental closed-loop phases and the root-to-anchor tree phases between fixed reference vertices are the exact invariants that no anchored gauge transformation can erase.

::: {.viz src="lattice-gauge-loop" preset="tree" height="500"}
**Iron the spanning tree flat: tree edges become 1 and only loop phases are left on the chords.** On four squares, the rail turns every corner by the inverse of its tree transport phase: all 8 cyan tree edges turn to $1$, and the 4 chords keep the phases of their fundamental loops — a chord in the middle column equals the square to its left, a chord in the right column the product of the two squares in its row. This is exactly the shape of the section $\sigma$ ([@cor-anchored-phase-classification]).
:::

Let us verify [@cor-anchored-phase-classification] by hand on a four-vertex plaquette loop.

::: {.example #ex-plaquette-phase title="Gauge Transformation and Coordinate Counting on a Four-Vertex Plaquette Loop"}
Consider the directed four-vertex cycle $0 \xrightarrow{e_0} 1 \xrightarrow{e_1} 2 \xrightarrow{e_2} 3 \xrightarrow{e_3} 0$ with vertex set $V = \{0, 1, 2, 3\}$ and edge set $E = \{e_0, e_1, e_2, e_3\}$.

1. **Initial edge field and plaquette holonomy**: Take $u = (u(e_0), u(e_1), u(e_2), u(e_3)) = (1, 1, 1, i) \in \operatorname{Circle}^4$. Multiplying around the closed loop gives the plaquette phase

$$
U_\square = u(e_0)u(e_1)u(e_2)u(e_3) = 1 \cdot 1 \cdot 1 \cdot i = i.
$$

2. **Anchored vertex gauge transformation**: Fix the single anchor $R = \{0\}$ with root $r = 0$, and apply the vertex gauge transformation $g = (1, i, -1, -i) \in \operatorname{anchoredGroup}(R)$. Evaluating $u'(e) = g(t(e))u(e)g(s(e))^{-1}$ on each edge gives

$$
\begin{aligned}
u'(e_0) &= i \cdot 1 \cdot 1^{-1} = i, \qquad &u'(e_1) &= (-1) \cdot 1 \cdot i^{-1} = i, \\
u'(e_2) &= (-i) \cdot 1 \cdot (-1)^{-1} = i, \qquad &u'(e_3) &= 1 \cdot i \cdot (-i)^{-1} = -1.
\end{aligned}
$$

Thus $u' = (i, i, i, -1)$ redistributes phase across all four edges, yet the closed-loop product remains unchanged: $u'(e_0)u'(e_1)u'(e_2)u'(e_3) = i \cdot i \cdot i \cdot (-1) = i = U_\square$.

3. **Tree coordinate classification and dimension count**: Choose the first three edges $T = \{e_0, e_1, e_2\}$ as the spanning tree, leaving the single non-tree chord $e_3 \notin T$. Here $n = 4$, $m = 4$, $k = 1$, $|T| = 3$, $c = m + 1 - n = 1$, and $a = k - 1 = 0$, so the number of independent gauge-invariant phase coordinates in [@cor-anchored-phase-classification] is

$$
c + a = m + k - n = 4 + 1 - 4 = 1.
$$

At the chord $e_3$ ($3 \to 0$), $\operatorname{rootPhase}(u, 3) = 1$ and $\operatorname{rootPhase}(u', 3) = i^3 = -i$, so $\chi(u)(e_3) = 1 \cdot i \cdot 1^{-1} = i$ and $\chi(u')(e_3) = (-i) \cdot (-1) \cdot 1^{-1} = i$, confirming $\chi(u) = \chi(u')$ exactly.
:::

::: {.viz src="lattice-gauge-loop" preset="plaquette" height="500"}
**The four edges of the example: the phase spreads out, the loop is still $i$.** The edge phases start at $(1, 1, 1, i)$ and the violet hands turn the gauge from $1$ to $g = (1, i, -1, -i)$; at the end of the rail the four edges read $(i, i, i, -1)$, and the faint arcs are the angles their hands swept; the magenta loop phase at the centre is $i$ throughout, with no arc on its dial.
:::

From two-by-two anticommuting chiral matrices ([@lemma-qubit-clifford-pair]) to anchored phase classification on graphs ([@cor-anchored-phase-classification]), we see how unanchored local gauge redundancy is absorbed along free spanning-tree branches, while the complete gauge-invariant content resides in the $c = m + 1 - n$ fundamental closed-loop phases across non-tree chords together with the $a = k - 1$ root-to-anchor tree phases between fixed reference vertices (reducing purely to closed-loop holonomies in the single-anchor case $k = 1, a = 0$). What happens when many local quantum degrees of freedom are wired into a tensor network and we ask how much entanglement rank can flow across a bottleneck cut? Let us turn to [Chapter 19](ch19-tensor-networks-and-holography.md).

::: {.viz src="lattice-gauge-loop" height="560"}
**The lattice gauge lab.** Switch between 1, 2 and 4 squares, drag a hand on an edge to change its phase, drag the violet hand at a corner to make a gauge transformation, or lock the far corner $a$ as a second anchor: the readouts keep track of $c = m + 1 - n$, $a = k - 1$ and the number of invariant phases $c + a = m + k - n$, while the magenta loop phases move only when an edge phase itself is changed.
:::
