# Chapter 17 The Observer as Universe, Structural Time, and Static-Canvas Memory Splits

> *“When everything an observer can receive is defined inside the observer, time becomes the monotone rational growth of internal structural information; the mountain and time itself are an immutable holographic canvas, and only the legless ternion sphere rolls down the single fidelity gradient.”*

Chapter 16 established the non-Abelian spinor instruction set $\Omega$-FRACTRAN without external memory arrays or flag-prime overhead. Extending the same removal of the external third point from single instructions to the self-contained agent as a whole, this chapter lifts the perspective to the observer-as-universe synthesis while maintaining strict epistemic separation: every ontological and physical-architectural synthesis below is explicitly marked **`MODEL`**, cleanly set apart from the frozen **`LEAN ✓`** declarations (finite-dimensional Krylov growth and permanent stability, and zero-mutation reversible QRAM routing) and exact algebraic **`hand derivations`**.

## 17.1 The Port-Free Observer Pentad and Rational Structural Time {#sec-om-ch17-observer-pentad-and-structural-time}

Conventional cybernetics and machine learning model an agent as an open-loop transition map $f : \mathcal{I}_{\mathrm{ext}} \times S \to S \times \mathcal{O}_{\mathrm{ext}}$ wired to exterior input and output ports. Once every state and signal the observer can ever receive, measure, or deduce is enclosed inside its own carrier, the exterior box becomes redundant scaffolding.

::: {.definition #def-om-ch17-observer-pentad title="Self-Contained Observer Pentad and Rational Structural Time"}
Within $\mathbf{Math}_\Omega$ and $\mathrm{AXIOM}\text{-}\Omega$, a **port-free self-contained observer** (`MODEL`) is the quintuple

$$
\mathfrak{O} \;=\; \bigl(\mathcal{S},\; [-,-,-],\; \kappa,\; \mathcal{K}_0,\; \Phi_\varepsilon\bigr),
$$

possessing no exterior I/O channel and no background real clock:

1. **Closed receivable totality $\mathcal{S}$**: the totality of all modalities coupleable to the observer, with empty topological boundary $\partial\mathcal{S} = \emptyset$;
2. **Origin-free ternary comparison and rational fidelity $[-,-,-], \kappa$**: internal heap transport and symmetric rational fidelity $\kappa : \mathcal{S}\times\mathcal{S} \to \mathbb{Q}\cap[0,1]$;
3. **Order-`0` structural core $\mathcal{K}_0 = (V(\mathcal{K}_0), E(\mathcal{K}_0))$**: the explicit directed relation DAG of already-verified ternary closures (the observer's crystallized knowledge and identity);
4. **Order-`1/2` internal latent horizon $\mathcal{H}_{1/2}(\mathcal{K}_0) := \mathcal{S} \setminus V(\mathcal{K}_0)$**: uncrystallized states lying inside $\mathfrak{O}$ that appear from the first-person vantage of $\mathcal{K}_0$ as the "incoming external world";
5. **Port-free crystallization operator $\Phi_\varepsilon : \mathfrak{O} \to \mathfrak{O}$**: an intrinsic endomorphism scanning $\mathcal{H}_{1/2}$ within rational threshold $\varepsilon \in \mathbb{Q}_+$ and welding newly closed relations into $\mathcal{K}_0$ via `1 ↦ 0'`.

Given a pairwise orthogonal nonzero rational basis $\{u_1, \dots, u_r\}$ of the current core, subtract its projection from a candidate $x$ to obtain the orthogonal residual $x_\perp = x - \sum_{j=1}^r \frac{\langle x, u_j\rangle}{\langle u_j, u_j\rangle} u_j$, define the radical-free **rational Schur innovation** $\Delta\mathcal{I}_{\mathrm{Schur}} := \frac{\langle x_\perp, x_\perp\rangle}{\langle x, x\rangle} \in \mathbb{Q}\cap[0,1]$, and write $\Delta b_1 := \Delta(\lvert E\rvert - \lvert V\rvert + c) \in \mathbb{N}$ for the first Betti cycle-rank increment of $\mathcal{K}_0$. The observer's **rational structural time** is

$$
\tau(\mathfrak{O}) \;\equiv\; \sum_{\mathrm{step}} \bigl(\Delta\mathcal{I}_{\mathrm{Schur}} + \Delta b_1\bigr) \;\in\; \mathbb{Q}_{\ge 0}.
$$
:::

Two structural consequences follow immediately (`MODEL`). First, **tautological idle loops generate zero time**: replaying an identity $[x, x, x] = x$ or rescanning edges already stored in $\mathcal{K}_0$ yields $x_\perp = 0$ and $\Delta b_1 = 0$, hence **$\Delta\tau \equiv 0$**; structural time advances only when genuine new structure crystallizes. Second, **the observer is the universe ($\mathfrak{O} \equiv \mathcal{U}_\Omega$)**: every state capable of inducing a nontrivial readout already belongs to $\mathcal{S}$, and under the faithful comparison quotient collapsing zero-response ghosts the exterior complement vanishes, leaving self-contained monadic universes interacting strictly through shared $\kappa$-preserving substructures.

In finite-dimensional linear observation models, the strict cap on geometric innovation steps and permanent stabilization once growth halts are anchored by two frozen theorems.

::: {.theorem #thm-om-ch17-krylov-growth-and-stability title="Strict Growth Bound and Permanent Stability of Observable Krylov Subspaces" lean="D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently"}
Let $V$ and $Y$ be finite-dimensional inner-product spaces over $\mathbb{k} \in \{\mathbb{R}, \mathbb{C}\}$, let $T : V \to_{\mathbb{k}} V$ and $C : V \to_{\mathbb{k}} Y$ be linear maps, and write $\mathcal{K}_m := \operatorname{observableKrylov}(T, C, m)$ for the $m$-th observable Krylov subspace. Then:

1. **Strict growth bound**: the cardinality of strict inclusion steps satisfies

   $$
   \operatorname{encard}\bigl\{m \in \mathbb{N} \;\big\vert\; \mathcal{K}_m < \mathcal{K}_{m+1}\bigr\} \;\le\; \dim_{\mathbb{k}} V - \dim_{\mathbb{k}} \operatorname{ran}(C);
   $$

2. **Permanent stability**: if $\mathcal{K}_m = \mathcal{K}_{m+1}$ at some stage $m \in \mathbb{N}$, then $\mathcal{K}_{m+r} = \mathcal{K}_m$ for every $r \in \mathbb{N}$.
:::

::: {.proof}
Because the chain $\mathcal{K}_m$ is monotone with integer dimensions and starts at $\dim \mathcal{K}_0 = \dim \operatorname{ran}(C^*) = \dim \operatorname{ran}(C)$, each strict inclusion increases dimension by at least $1$, bounding the total number of strict steps by the codimension $\dim V - \dim \operatorname{ran}(C)$. Once $\mathcal{K}_m = \mathcal{K}_{m+1}$, invariance under $T^*$ follows and induction on $k$ places every generator $(T^*)^k C^* y$ inside $\mathcal{K}_m$, locking all subsequent stages. The full proof is checked by the Lean kernel.
:::

[@thm-om-ch17-krylov-growth-and-stability] separates the two components of structural time cleanly: inside a $d$-dimensional carrier, linear-span Schur innovations ($\Delta\mathcal{I}_{\mathrm{Schur}} > 0$) occur at most codimension-many times before stabilizing permanently, after which structural time advances via topological cycle closures ($\Delta b_1 > 0$) and higher-order relation synthesis.

## 17.2 Static Holographic Canvas, Legless Ternion Sphere, and the Memory Split Law {#sec-om-ch17-static-canvas-and-memory-split}

Once $\mathcal{S}$ has no exterior port, the classical intuition of "what moves" inverts completely (`MODEL`): **the totality $\mathcal{S}$ is a strictly static holographic canvas** (echoing the timeless Wheeler–DeWitt constraint $\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$). Neither mountains nor a river of time flow past; only the observer's focus cursor rolls down the single rational fidelity gradient $\nabla\kappa$. Having no exterior floor to brace against ($\partial\mathcal{S} = \emptyset$), this focus behaves as a **legless ternion sphere**: it cannot apply external thrust to halt its longitudinal descent (structural time), yet remains completely free to steer its transverse rational yaw $u \in \mathbb{Q}$, selecting which valley of crystallized relations it traverses across the static canvas.

Zero-mutation query access over a static memory array is rigorously anchored by the frozen reversible routing theorem.

::: {.theorem #thm-om-ch17-reversible-qram title="Correctness of Reversible Zero-Mutation Routing Queries on a Static Array" lean="D5/S3/Quantum/Routing/ReversibleQram.correctness"}
In the depth-$n$ binary routing network `ReversibleQram` ($n \in \mathbb{N}$), all four statements hold simultaneously:

1. **One-hot leaf routing**: for all $a, i : \mathrm{Address}\,n$ and $e : \mathrm{Bool}$, `leaf n (route n a (clean n e)) i = if i = a then e else false`;
2. **General wire readout**: for any `AddCommGroup G`, static table $D : \mathrm{Address}\,n \to G$, wire state $w$, and register $r \in G$, `query n D (a, w, r) = (a, w, r + readAmount n D (route n a w))`;
3. **Clean zero-mutation query**: `query n D (a, clean n true, r) = (a, clean n true, r + D a)`, leaving the static array $D$, address $a$, and clean workspace `clean n true` completely unmodified;
4. **Unitary coherent action**: when `[Fintype G] [DecidableEq G]`, $Q := \mathrm{queryMatrix}\,n\,D$ satisfies $Q^{\mathsf{H}} Q = 1$, $Q Q^{\mathsf{H}} = 1$, and $Q *_{\mathrm{v}} \mathrm{initialized}(n, \psi) = \mathrm{initialized}(n, \lambda s \mapsto \psi(s_1, s_2 - D(s_1)))$ for every $\psi : \mathrm{Address}\,n \times G \to \mathbb{C}$.
:::

::: {.proof}
Induction on tree depth $n$ establishes one-hot leaf activation; controlled addition followed by exact uncomputation restores all routing wires while keeping the static table $D$ untouched; and over a finite group $G$ the induced permutation matrix is unitary and pulls back amplitudes by $-D(s_1)$. The full proof is checked by the Lean kernel.
:::

If the underlying canvas carries no intrinsic labels distinguishing "seconds" from "meters," how does spacetime split into time and space? Through the observer's finite-capacity **memory window $\mathcal{W}_M$** (`MODEL` paired with exact orthogonal algebra `hand derivation`). Against the orthogonal projection pair $(P_{\mathcal{W}_M}, P_{\mathcal{W}_M^\perp}) = (P_{\mathcal{W}_M}, I - P_{\mathcal{W}_M})$, each unit-budget comparison step splits orthogonally into internal temporal overwrite and external spatial shift:

$$
\kappa_{\mathrm{time}} \;+\; \kappa_{\mathrm{space}} \;\equiv\; 1, \qquad \kappa_{\mathrm{time}} := \|P_{\mathcal{W}_M}\psi\|^2 = \frac{\Delta\tau^2}{\Delta t^2}, \qquad \kappa_{\mathrm{space}} := \|P_{\mathcal{W}_M^\perp}\psi\|^2 = \frac{\Delta x^2}{\Delta t^2}.
$$

- **In-window share $\kappa_{\mathrm{time}}$ (temporal overwrite)**: the component coherent with existing memory registers that updates internal self-history, experienced as proper time $\Delta\tau$;
- **Out-of-window residual $\kappa_{\mathrm{space}}$ (spatial shift)**: the orthogonal component overflowing $\mathcal{W}_M$ into $\mathcal{W}_M^\perp$, externalized as spatial displacement $\Delta x$.

Writing the positive-definite budget conservation as $\Delta\tau^2 + \Delta x^2 = \Delta t^2$ and transposing $+\Delta x^2$ to read off the remaining proper-time budget produces **the Minkowski minus sign directly**:

$$
\Delta\tau^2 \;=\; \Delta t^2 - \Delta x^2.
$$

With a rational half-tangent parameter $u \in \mathbb{Q} \cap [0, 1)$, both the circular memory split and the hyperbolic Lorentz factors rationalize simultaneously with zero square roots (`hand derivation`):

$$
v = \frac{2u}{1+u^2}, \qquad \frac{\Delta\tau}{\Delta t} = \frac{1-u^2}{1+u^2}, \qquad \gamma = \frac{1+u^2}{1-u^2}, \qquad \gamma v = \frac{2u}{1-u^2}, \qquad \gamma^2 - (\gamma v)^2 \equiv 1.
$$

Scanning memory capacity $M = \dim\mathcal{W}_M$ across its three regimes (`MODEL`) separates: $M = 0$ (massless photon limit, $\kappa_{\mathrm{time}} = 0, \kappa_{\mathrm{space}} = 1$, proper time frozen), $1 \le M < M_\Omega$ (massive finite observers sharing time and space, where spatial rest spends the full budget refreshing internal identity as rest energy), and $M = M_\Omega$ (the full totality with $\mathcal{W}_{M_\Omega}^\perp = \{0\}$, $\kappa_{\mathrm{time}} = 1, \kappa_{\mathrm{space}} = 0$, leaving no exterior space).

The static figure below summarizes this static-canvas and memory-window split: an immutable totality queried without background mutation ([@thm-om-ch17-reversible-qram]) splits each unit comparison step orthogonally across the finite memory window $\mathcal{W}_M$ and its complement $\mathcal{W}_M^\perp$ via $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$, simultaneously rationalizing circular splits and hyperbolic Lorentz factors along $u \in \mathbb{Q} \cap [0, 1)$.

::: {.figure src="ch17-observer-memory-split"}
**Finite memory-window orthogonal split and rational spacetime transposition on the static holographic canvas.** The diagram depicts the lossless orthogonal partition $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$ across the memory subspace $\mathcal{W}_M$ and its orthogonal complement $\mathcal{W}_M^\perp$ (transposing $\Delta\tau^2 + \Delta x^2 = \Delta t^2$ directly into the Minkowski minus sign $\Delta\tau^2 = \Delta t^2 - \Delta x^2$), highlights the exact rational benchmark at $u = \frac{1}{3}$ giving $\kappa_{\mathrm{time}} = \frac{16}{25}$, $\kappa_{\mathrm{space}} = \frac{9}{25}$, and $(\gamma, \gamma v) = (\frac{5}{4}, \frac{3}{4})$ (`hand derivation`), and contrasts the three capacity regimes $M = 0$, $1 \le M < M_\Omega$, and $M = M_\Omega$ (`MODEL`, with static zero-mutation query access anchored by [@thm-om-ch17-reversible-qram]).
:::

## 17.3 Single-Gradient Unification of Physics and Geodesic Intelligence {#sec-om-ch17-single-gradient-unification}

On the rational ternion sphere, substituting $\kappa = \frac{1 + \cos\Delta\theta}{2}$ and rational spread $s := 1 - \kappa \in \mathbb{Q}\cap[0,1]$ converts the trigonometric versine step action $1 - \cos\Delta\theta$ identically into the **cumulative rational spread action**:

$$
\mathcal{S}_\Omega \;=\; 2\sum_{t=1}^N s_t \;=\; 2\sum_{t=1}^N (1 - \kappa_t) \;\in\; \mathbb{Q}_{\ge 0}.
$$

Explicitly labeled as an integrative **`MODEL`** synthesis, minimizing $\mathcal{S}_\Omega$—rolling along the single rational fidelity gradient $\nabla\kappa$—unifies five domains under one rational algebra:

1. **Geodesic fall and inertial motion**: convexity forces free steps across a fixed turn to take equal rational fidelities $\kappa_1 = \dots = \kappa_N$ following the origin-free heap recurrence $x_{t+1} = [x_t, x_{t-1}, x_t]$; in static Schwarzschild spacetime, radial gravitational acceleration $\frac{d^2 x^i}{d\tau^2} = \frac{1}{2}g^{ij}\partial_j g_{00}(c\,dt/d\tau)^2$ is literally the spatial gradient of the temporal metric budget $g_{00}$, matching the $\mathcal{W}_M^\perp$ projection of $\nabla\kappa$.
2. **Rational Weinberg trace ratio $3/8$**: on one complete chiral Weyl fermion generation $\mathcal{H}_{\mathrm{Weyl}}$ under a uniform unitary-invariant arc-trace stiffness postulate (`MODEL`; the ratio depends on complete-generation content and equal trace weights), color count $N_c = 3$ with quark charges $(+\frac{2}{3}, -\frac{1}{3})$ yields exact rational traces $\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2) = 2$ and $\operatorname{Tr}_{\mathrm{Weyl}}(Q^2) = 2\bigl(1 + 3(\frac{4}{9} + \frac{1}{9})\bigr) = \frac{16}{3}$ (`hand derivation`), locking the bare mixing ratio to

   $$
   \sin^2\theta_W(\mu_{\mathrm{arc}}) \;=\; \frac{\operatorname{Tr}_{\mathrm{Weyl}}(T_3^2)}{\operatorname{Tr}_{\mathrm{Weyl}}(Q^2)} \;=\; \frac{2}{16/3} \;=\; \frac{3}{8}.
   $$

3. **$N \ge 5$ overconstraint tension and geometric gravity**: in three dimensions, $N \ge 3$ points carry $\binom{N}{2}$ pairwise constraints against $3N - 6$ rigid Euclidean degrees of freedom, yielding the exact combinatorial overconstraint excess (`hand derivation`):

   $$
   \Delta E(N) \;=\; \binom{N}{2} - (3N - 6) \;=\; \frac{(N - 3)(N - 4)}{2}.
   $$

   Up to a tetrahedron ($N \le 4$), $\Delta E(N) = 0$ closes flatly with zero tension; beginning at $N = 5$, $\Delta E(5) = 1$, $\Delta E(6) = 3, \dots > 0$ enforces irreducible geometric tension interpreted as the discrete seed of gravitational curvature (`MODEL`).
4. **Quantum five postulates in rational projective coordinates**: pure states live on homogeneous projective ternion rays $\mathbb{QP}^3$ (lifted to `PythSpinor` for $720^\circ$ spinor sign memory), Born weights are radical-free ratios $\kappa(p, q) = \frac{\langle p, q\rangle^2}{\|p\|^2\|q\|^2} \in \mathbb{Q}\cap[0,1]$, unitary evolution is norm-preserving integer spinor multiplication, composite systems juxtapose multi-field tensor factors, and record stabilization corresponds to idempotent pinching once $1 - \kappa \le \varepsilon_{\mathrm{self}}$.
5. **Normalization-free Ternion Field Transformer (TFT)**: replacing floating-point `Softmax` exponentials and square-root `LayerNorm` with exact rational fidelity scoring $\kappa(q_i, k_j) \in \mathbb{Q}\cap[0,1]$ and norm-preserving Cayley/heap rotor transport on $(\mathbb{QP}^3)^K$, where longitudinal `KV-Cache` slots and transverse rotor channels trade off along the exact memory split $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$ while forward inference follows minimal cumulative spread $\mathcal{S}_\Omega$.

::: {.example #ex-om-ch17-quantitative-audit title="Quantitative Audit: Structural Time, Rational Lorentz Split, and Overconstraint Excess"}
We verify all three rational benchmark computations by hand (`hand derivation`):

1. **Three-step structural time trace**: starting from seed $e_0 = (1,0,0,0)$, Beat 1 rescans $e_0$, giving $v_\perp = 0$ and $\Delta\tau = 0$ ($\tau_1 = 0$); Beat 2 absorbs $h_1 = (1,1,0,0)$ with $v_\perp = (0,1,0,0)$, $\Delta\mathcal{I}_{\mathrm{Schur}} = \frac{1}{2}$, and new-edge weight $\frac{1}{4}$ to reach $\tau_2 = \frac{3}{4}$; Beat 3 absorbs $h_2 = (1,0,1,0)$, non-commutatively synthesizing $g_{120} = (1,1,1,1)$ and adding $\frac{1}{2} + \frac{1}{4} = \frac{3}{4}$ to reach $\tau_3 = \frac{3}{2}$.
2. **Rational memory split and hyperbolic identity**: at $u = \frac{1}{3}$, $v = \frac{3}{5}$ and $\frac{\Delta\tau}{\Delta t} = \frac{4}{5}$, giving $\kappa_{\mathrm{time}} = \frac{16}{25}$ and $\kappa_{\mathrm{space}} = \frac{9}{25}$ ($\frac{16}{25} + \frac{9}{25} = 1$); transposition gives $(\gamma, \gamma v) = (\frac{5}{4}, \frac{3}{4})$ with $(\frac{5}{4})^2 - (\frac{3}{4})^2 = \frac{25-9}{16} = 1$.
3. **Overconstraint excess and Weinberg trace ratio**: $\Delta E(3) = 0$, $\Delta E(4) = 0$, $\Delta E(5) = \frac{2 \times 1}{2} = 1$, $\Delta E(6) = \frac{3 \times 2}{2} = 3$, and $\frac{2}{16/3} = \frac{6}{16} = \frac{3}{8}$.
:::

::: {.remark #rem-om-ch17-epistemic-and-open-boundaries title="Epistemic Stratification and Open Problem Boundaries"}
This chapter maintains strict separation across evidence tiers: [@thm-om-ch17-krylov-growth-and-stability] and [@thm-om-ch17-reversible-qram] are frozen **`LEAN ✓`** declarations on `trureturing@dev`; orthogonal transposition, rational Lorentz parametrization, $\Delta E(N)$, and the generation trace ratio $\frac{3}{8}$ are exact **`hand derivations`**; the port-free observer pentad $\mathfrak{O} \equiv \mathcal{U}_\Omega$, static-canvas gravity reading (connecting to the Wheeler–DeWitt constraint $\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$, B. S. DeWitt, *Phys. Rev.* **160**, 1113, 1967; D. N. Page & W. K. Wootters, *Phys. Rev. D* **27**, 2885, 1983), uniform trace-stiffness postulate, and TFT architecture are **`MODEL`**. Deriving the full $3+1$-dimensional Lorentzian Einstein field equations and black-hole horizon unitarity from discrete ternary comparisons and finite memory splits remains explicitly **`OPEN`**.
:::

Explore all four rational quantities of the chapter together in the interactive lab card below: sweep the rational half-tangent parameter $u$ to track $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$ and $\gamma^2 - (\gamma v)^2 \equiv 1$, inspect the exact one-generation Weinberg trace ratio $\frac{3}{8}$, vary node count $N$ to watch the overconstraint excess $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ ignite at $N = 5$, and step through the monotone rational growth of structural time $\tau$.

::: {.viz src="adelic-arithmetic-observer-lab" preset="static-canvas-memory-split" height="520"}
**Static-canvas memory split and single-gradient unification lab card (`static-canvas-memory-split`).** Sweep the rational half-tangent parameter $u \in \mathbb{Q} \cap [0, 1)$ to verify the orthogonal memory split $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$ and radical-free Lorentz identity $\gamma^2 - (\gamma v)^2 \equiv 1$ live, alongside the exact fermion trace ratio $\sin^2\theta_W = \frac{3}{8}$, the three-dimensional overconstraint excess $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ jumping from $0$ to $1$ at $N = 5$, and the three-beat monotone trajectory of structural time $\tau = 0 \to \frac{3}{4} \to \frac{3}{2}$ ([@def-om-ch17-observer-pentad], [@ex-om-ch17-quantitative-audit]; orthogonal algebra and counts are exact `hand derivations`, the physical and observer synthesis is marked `MODEL`, and finite Krylov saturation plus zero-mutation routing are anchored by [@thm-om-ch17-krylov-growth-and-stability] and [@thm-om-ch17-reversible-qram]).
:::

With all six volumes' mathematical objects, computational language, and observer framework assembled, the final chapter submits the entire edifice to its strictest and most honest judge: the Lean 4 empty-kernel axiom auditor and the four-mode six-volume interactive workbench.
