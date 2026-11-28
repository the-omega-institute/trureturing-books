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

Given a pairwise orthogonal nonzero rational basis $\{u_1, \dots, u_r\}$ of the current core, subtract its projection from a nonzero candidate $x$ to obtain the orthogonal residual $x_\perp = x - \sum_{j=1}^r \frac{\langle x, u_j\rangle}{\langle u_j, u_j\rangle} u_j$, define the radical-free **rational Schur innovation** $\Delta\mathcal{I}_{\mathrm{Schur}} := \frac{\langle x_\perp, x_\perp\rangle}{\langle x, x\rangle} \in \mathbb{Q}\cap[0,1]$. In the finite comparison graph keep the old vertices and edges at each step. To count cycles, forget edge directions. If there are $c$ connected components, then $b_1=|E|-|V|+c$. The increment $\Delta b_1$ is a nonnegative integer since graph inclusion preserves the old cycle space. The observer's **rational structural time** starts at $\tau_0=0$ and is given by

$$
\tau(\mathfrak{O}) \;\equiv\; \sum_{\mathrm{step}} \bigl(\Delta\mathcal{I}_{\mathrm{Schur}} + \Delta b_1\bigr) \;\in\; \mathbb{Q}_{\ge 0}.
$$
:::

Two structural consequences follow immediately (`MODEL`). First, **tautological idle loops generate zero time**: replaying $[x, x, x] = x$ on a stored state or rescanning an old comparison in $\mathcal{K}_0$ yields $x_\perp = 0$ and $\Delta b_1 = 0$, hence **$\Delta\tau \equiv 0$**; structural time advances only when genuine new structure crystallizes. Second, **the observer is the universe ($\mathfrak{O} \equiv \mathcal{U}_\Omega$)**: every state capable of inducing a nontrivial readout already belongs to $\mathcal{S}$, and under the faithful comparison quotient collapsing zero-response ghosts the exterior complement vanishes, leaving self-contained monadic universes interacting strictly through shared $\kappa$-preserving substructures.

A fixed linear evolution and observation give a concrete tower of growing subspaces. Two frozen theorems give its growth bound and permanence of a plateau.

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

When each positive Schur innovation enlarges the span, a $d$-dimensional carrier starting from rank $r$ allows at most $d-r$ such steps. Permanent stability after one stagnant step applies when the successive spans are exactly the Krylov tower of one fixed pair $(T,C)$. For example, $T=I$ on $\mathbb R^2$ and $C(x,y)=x$ give the constant tower $\operatorname{span}(e_1)$, yet an independent crystallization rule can accept $e_2$ with Schur innovation $1$. Once the span fills the carrier, further time increments can only come from new comparison cycles.

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
\kappa_{\mathrm{time}} \;+\; \kappa_{\mathrm{space}} \;\equiv\; 1, \qquad \kappa_{\mathrm{time}} := \|P_{\mathcal{W}_M}\psi\|^2 = \frac{(\Delta\tau_{\mathrm{mem}})^2}{\Delta t^2}, \qquad \kappa_{\mathrm{space}} := \|P_{\mathcal{W}_M^\perp}\psi\|^2 = \frac{\Delta x^2}{\Delta t^2}.
$$

- **In-window share $\kappa_{\mathrm{time}}$ (temporal overwrite)**: the component coherent with existing memory registers that updates internal self-history, experienced as proper time $\Delta\tau_{\mathrm{mem}}$;
- **Out-of-window residual $\kappa_{\mathrm{space}}$ (spatial shift)**: the orthogonal component overflowing $\mathcal{W}_M$ into $\mathcal{W}_M^\perp$, externalized as spatial displacement $\Delta x$.

Writing the positive-definite budget conservation as $(\Delta\tau_{\mathrm{mem}})^2 + \Delta x^2 = \Delta t^2$ and transposing $+\Delta x^2$ to read off the remaining proper-time budget produces **the Minkowski minus sign directly**:

$$
(\Delta\tau_{\mathrm{mem}})^2 \;=\; \Delta t^2 - \Delta x^2.
$$

With a rational half-tangent parameter $u \in \mathbb{Q} \cap [0, 1)$, both the circular memory split and the hyperbolic Lorentz factors rationalize simultaneously with zero square roots (`hand derivation`):

$$
v = \frac{2u}{1+u^2}, \qquad \frac{\Delta\tau_{\mathrm{mem}}}{\Delta t} = \frac{1-u^2}{1+u^2}, \qquad \gamma = \frac{1+u^2}{1-u^2}, \qquad \gamma v = \frac{2u}{1-u^2}, \qquad \gamma^2 - (\gamma v)^2 \equiv 1.
$$

Scanning memory capacity $M = \dim\mathcal{W}_M$ across its three regimes (`MODEL`) separates: $M = 0$ (massless photon limit, $\kappa_{\mathrm{time}} = 0, \kappa_{\mathrm{space}} = 1$, proper time frozen), $1 \le M < M_\Omega$ (massive finite observers sharing time and space, where spatial rest spends the full budget refreshing internal identity as rest energy), and $M = M_\Omega$ (the full totality with $\mathcal{W}_{M_\Omega}^\perp = \{0\}$, $\kappa_{\mathrm{time}} = 1, \kappa_{\mathrm{space}} = 0$, leaving no exterior space).

The memory projection uses $\Delta\tau_{\mathrm{mem}}$ for its proper-time readout. The structural clock $\tau$ of §17.1 uses the innovations and cycles of the comparison graph. The figure shows both readouts.

::: {.figure src="ch17-observer-memory-split"}
**Memory projection and the structural clock.** Left, the unit step has in-window and out-of-window legs of lengths $4/5$ and $3/5$. Right, the seed replay is flat, the first comparison edge adds no cycle, and the second new state closes a triangle. The dashed line repeats only the seed.
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

1. **The three-beat structural clock.** Start with the seed $e_0=(1,0,0,0)$ and no edges. Beat $1$ repeats the seed, giving $\Delta\mathcal I_{\mathrm{Schur}}=\Delta b_1=0$. Beat $2$ adds $h_1=(1,1,0,0)$ and the comparison $e_0\to h_1$. The residual is $(0,1,0,0)$, so $\Delta\mathcal I_{\mathrm{Schur}}=1/2$. The graph remains a tree and $\tau_2=1/2$. Beat $3$ adds $h_2=(1,0,1,0)$ and the comparisons $e_0\to h_2$ and $h_1\to h_2$. The residual is $(0,0,1,0)$, again giving $1/2$. The underlying triangle has $b_1=3-3+1=1$, so $\tau_3=1/2+1/2+1=2$. The directed graph is acyclic. The lab takes the quaternion product $h_1h_2=(1,1,1,1)$ as a separate candidate at beat $4$.
2. **Rational memory split and hyperbolic identity**: at $u = \frac{1}{3}$, $v = \frac{3}{5}$ and $\frac{\Delta\tau_{\mathrm{mem}}}{\Delta t} = \frac{4}{5}$, giving $\kappa_{\mathrm{time}} = \frac{16}{25}$ and $\kappa_{\mathrm{space}} = \frac{9}{25}$ ($\frac{16}{25} + \frac{9}{25} = 1$); transposition gives $(\gamma, \gamma v) = (\frac{5}{4}, \frac{3}{4})$ with $(\frac{5}{4})^2 - (\frac{3}{4})^2 = \frac{25-9}{16} = 1$.
3. **Overconstraint excess and Weinberg trace ratio**: $\Delta E(3) = 0$, $\Delta E(4) = 0$, $\Delta E(5) = \frac{2 \times 1}{2} = 1$, $\Delta E(6) = \frac{3 \times 2}{2} = 3$, and $\frac{2}{16/3} = \frac{6}{16} = \frac{3}{8}$.
:::

::: {.remark #rem-om-ch17-epistemic-and-open-boundaries title="Epistemic Stratification and Open Problem Boundaries"}
This chapter maintains strict separation across evidence tiers: [@thm-om-ch17-krylov-growth-and-stability] and [@thm-om-ch17-reversible-qram] are frozen **`LEAN ✓`** declarations on `trureturing@dev`; orthogonal transposition, rational Lorentz parametrization, $\Delta E(N)$, and the generation trace ratio $\frac{3}{8}$ are exact **`hand derivations`**; the port-free observer pentad $\mathfrak{O} \equiv \mathcal{U}_\Omega$, static-canvas gravity reading (connecting to the Wheeler–DeWitt constraint $\hat{\mathcal{H}}\lvert\mathbf{\Psi}\rangle = 0$, B. S. DeWitt, *Phys. Rev.* **160**, 1113, 1967; D. N. Page & W. K. Wootters, *Phys. Rev. D* **27**, 2885, 1983), uniform trace-stiffness postulate, and TFT architecture are **`MODEL`**. Deriving the full $3+1$-dimensional Lorentzian Einstein field equations and black-hole horizon unitarity from discrete ternary comparisons and finite memory splits remains explicitly **`OPEN`**.
:::

::: {.film src="the-observer-as-the-universe"}
**An observer without ports, whose time is new structure and whose space is the share outside its memory window (2 min 58 s).** A box with input and output ports closes into the violet port-free observer pentad; the residuals and cycles of the comparison graph's three beats give structural time $\tau = 0, \tfrac{1}{2}, 2$. The Krylov dimensions $1, 2, 3, 4, 4$ of a cyclic shift on $\mathbb{Q}^4$ meet the green ceiling, and the zero-write query reads $D(a) = 4$ from a sample depth-$2$ table ([@thm-om-ch17-krylov-growth-and-stability], [@thm-om-ch17-reversible-qram]). At $u = \tfrac{1}{3}$ the unit step splits into a cyan $4/5$ and a magenta $3/5$, with shares $\tfrac{16}{25} + \tfrac{9}{25} = 1$, $\gamma = \tfrac{5}{4}$ and $\gamma v = \tfrac{3}{4}$; the bar chart gives $\Delta E(N) = 0, 0, 1, 3, 6, 10$ and the trace ratio is $\tfrac{3}{8}$. All numbers are computed on screen (`hand derivation`); the observer as universe, the still canvas and the equal-weight trace postulate are violet `MODEL`, and deriving the Einstein field equations and horizon unitarity is red `OPEN`.
:::

Explore all four rational quantities of the chapter together in the interactive lab card below: sweep the rational half-tangent parameter $u$ to track $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$ and $\gamma^2 - (\gamma v)^2 \equiv 1$, inspect the exact one-generation Weinberg trace ratio $\frac{3}{8}$, vary node count $N$ to watch the overconstraint excess $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ ignite at $N = 5$, and step through the monotone rational growth of structural time $\tau$.

::: {.viz src="adelic-arithmetic-observer-lab" preset="static-canvas-memory-split" height="520"}
**Static-canvas memory split and single-gradient unification lab card (`static-canvas-memory-split`).** Sweep the rational half-tangent parameter $u \in \mathbb{Q} \cap [0, 1)$ to verify the orthogonal memory split $\kappa_{\mathrm{time}} + \kappa_{\mathrm{space}} \equiv 1$ and radical-free Lorentz identity $\gamma^2 - (\gamma v)^2 \equiv 1$ live, alongside the exact fermion trace ratio $\sin^2\theta_W = \frac{3}{8}$, the three-dimensional overconstraint excess $\Delta E(N) = \frac{(N-3)(N-4)}{2}$ jumping from $0$ to $1$ at $N = 5$, and the three-beat monotone trajectory of structural time $\tau = 0 \to \frac{1}{2} \to 2$ ([@def-om-ch17-observer-pentad], [@ex-om-ch17-quantitative-audit]; orthogonal algebra and counts are exact `hand derivations`, the physical and observer synthesis is marked `MODEL`, and finite Krylov saturation plus zero-mutation routing are anchored by [@thm-om-ch17-krylov-growth-and-stability] and [@thm-om-ch17-reversible-qram]).
:::

With the mathematics, computation, and observer model in place, the final chapter turns to Lean 4 replay of selected strict library closures and paired D5 evidence, then returns to the four-mode workbench.
