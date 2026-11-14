# Chapter 7 The Duality of Time: Why the Line Is Classical Time and the Area Is Quantum Time {#ch07-geometric-time-and-speed-limits}

As the author of this monograph observes:

> *"My intuition is that the line is classical time, and the area is quantum time."*
>
> *"When we bring the observer in endogenously, whether we see a particle or a wave seems to be a question of the observer's attention."*

In [Chapter 6](ch06-geometric-product.md), Clifford's geometric product $\vv{A}\vv{B} = \vv{A}\cdot\vv{B} + \vv{A}\wedge\vv{B}$ sutured wave and particle in space: **the particle is the collinear inner-product projection line ($\cos\theta$), and the wave is the orthogonal exterior bivector area ($\sin\theta\,\vv{I}$)**. Take one more step along this orthogonal thread, and one of the deepest riddles in natural philosophy — **what is time?** — reveals its dual geometric face!

In Newtonian mechanics and everyday life, time is pictured as a one-dimensional scalar line $t \in \mathbb{R}$: a pendulum ticks off a single file of discrete records, like holes punched along a paper tape. In the microscopic realm governed by the Schrödinger equation $i\hbar\frac{d}{dt}\lvert\psi(t)\rangle = H\lvert\psi(t)\rangle$, however, as long as no projective measurement punches the tape, the state vector rotates smoothly across two-dimensional phase planes and interferes coherently across multiple histories at once!

Why does one and the same universe wear two such different faces of time? This chapter establishes the author's geometric diagnosis — **"the line is classical time, and the area is quantum time"**:

1. **Quantum time is oriented bivector area**: The infinitesimal generator $G = -(i/\hbar)H_{\mathrm{op}}$ of any norm-preserving unitary flow $U(t) = \exp\bigl((-it/\hbar)H_{\mathrm{op}}\bigr)$ is necessarily **skew-adjoint** ($G^* = -G$); what the Hamiltonian $H_{\mathrm{op}} = i\hbar G$ measures is the **rate at which bivector rotation area is swept per unit time**;
2. **Classical time is the one-dimensional idempotent projection line**: Only when an observer intercepts that sweeping area with an idempotent projector $P^2 = P$ — crossing a $90^\circ$ orthogonal wall ($\langle m_0, m_1\rangle = 0$) to register an unmistakable discrete tick — does continuous two-dimensional quantum area condense into a sequential one-dimensional timeline!

::: {.figure src="ch07-overview"}
**Figure 7.** The chapter at a glance. Panel I: an amber arrow turns from $m_0$ to the perpendicular $m_1$, sweeping a magenta quarter disc; its two end points are two ticks. Panel II: against the turning angle $\omega t$, the grey dashed curve is the chance of still reading $\lvert 0\rangle$ when nobody looks, and the cyan curve the chance when $\lvert 0\rangle$ is measured $4$ times, with $0.531$ left at $180^\circ$. Panel III: the deposit $D_{\mathrm{freeze}} = \Delta E_{\mathrm{pass}} - \Delta S/\beta$ against the inverse temperature $\beta$, negative (magenta) left of $\beta_c$ and positive (cyan) to its right.
:::

## 7.1 Geometric Translation of the Schrödinger Equation: The Hamiltonian $H$ as the Bivector Area Swept per Unit Time {#sec-schrodinger-bivector-rate}

Open any standard quantum mechanics textbook and the Schrödinger equation $i\hbar\partial_t\psi = H\psi$ arrives with two seemingly arbitrary features: why does the imaginary unit $i$ sit on the left-hand side, and why must the energy operator (the Hamiltonian $H$) be self-adjoint ($H^* = H$)?

Translate the equation into the bivector language of [Chapter 5](ch05-complex-phase-and-rotors.md), and both features become self-evident.

Consider a continuous inner-product-preserving evolution $U(t)$ parameterized by $t \in \mathbb{R}$: it starts at the identity $U(0) = I$, obeys the additive group law $U(s + t) = U(s)U(t)$, and preserves norms everywhere via $U(t)^* U(t) = I$. Let $G := U'(0)$ be its instantaneous rate of change (generator) at $t = 0$. Differentiating the norm-preservation identity $U(t)^* U(t) = I$ at $t = 0$ by the product rule immediately gives:

$$
\left.\frac{d}{dt}\bigl(U(t)^* U(t)\bigr)\right|_{t=0} = G^* U(0) + U(0)^* G = G^* + G = 0 \quad\Longrightarrow\quad G^* = -G!
$$

Look at that result: **the true geometric generator $G$ of any norm-preserving continuous flow is automatically skew-adjoint ($G^* = -G$) — it is a planar bivector rotation generator!**

Physicists write a self-adjoint Hamiltonian $H_{\mathrm{op}}$ ($H_{\mathrm{op}}^* = H_{\mathrm{op}}$) only because we prefer real eigenvalues on energy dials: multiplying the skew-adjoint rotation generator $G$ by the $90^\circ$ factor $i\hbar$ (where $\hbar \neq 0$ calibrates radians per second into joules) defines

$$
H_{\mathrm{op}} := (i\hbar) G \quad\Longleftrightarrow\quad G = -\frac{i}{\hbar} H_{\mathrm{op}}!
$$

Because both $i$ and $G$ flip sign under conjugate transposition ($(-i)(-G) = +iG$), the two minus signs cancel, repackaging the skew-adjoint **bivector area rate $G$** as a self-adjoint **Hermitian Hamiltonian $H_{\mathrm{op}}$**! The Schrödinger equation is nothing more than the rigid-body angular-velocity equation: **instantaneous turning rate equals bivector area $G$ swept per unit time**.

::: {.figure src="ch07-area-rate"}
**A norm-preserving generator only pushes the arrow sideways.** At the tip of the amber arrow $\psi(t)$, the violet arrow $G\psi$ points along the tangent, at a right angle to $\psi$, so the arrow turns without stretching; the faint arrows are earlier positions $\Delta t$ apart, and each $\Delta t$ sweeps an equal magenta sector. Schematic: a complex phase rotation drawn as a turn in the real plane; self-adjointness and the exponential law are [@thm-calibrated-unitary-group].
:::

In the Lean 4 module `Quantum/Dynamics/CalibratedUnitaryGroup`, the following theorem proves on a complete complex inner-product space $H$ that calibrating the generator $G$ of a one-parameter unitary group by $i\hbar$ yields a self-adjoint Hamiltonian $H_{\mathrm{op}}$, an exponential rotor flow $U(t) = \exp((-it/\hbar)H_{\mathrm{op}})$, and the exact operator Schrödinger equation at every time $t$.

::: {.theorem #thm-calibrated-unitary-group title="Calibrated Self-Adjoint Hamiltonian and Exponential Schrödinger Law of a Unitary Group" lean="D5/S3/Quantum/Dynamics/CalibratedUnitaryGroup.calibrated_group"}
Let $H$ be a complete complex inner-product space, let $U : \mathbb{R} \to (H \to_L[\mathbb{C}] H)$ be a one-parameter family of continuous linear operators, and let $G : H \to_L[\mathbb{C}] H$ be the derivative of $U$ at $t = 0$ (`HasDerivAt U G 0`). Suppose $U$ satisfies the unitary group axioms:

1. **Identity at the origin**: $U(0) = 1$;
2. **One-parameter group law**: $\forall s, t \in \mathbb{R},\, U(s + t) = U(s)U(t)$;
3. **Left-unitarity everywhere**: $\forall t \in \mathbb{R},\, U(t)^* U(t) = 1$.

Then for every nonzero real calibration constant $\hbar \in \mathbb{R}$ ($\hbar \neq 0$), defining the calibrated Hamiltonian $H_{\mathrm{op}} := (i\hbar)\cdot G$, all three conclusions hold:

1. **Self-adjointness of the calibrated Hamiltonian**: $H_{\mathrm{op}}$ is self-adjoint (`IsSelfAdjoint H_op`, i.e., $H_{\mathrm{op}}^* = H_{\mathrm{op}}$);
2. **Exponential rotor representation**: for all $t \in \mathbb{R}$,
   $$
   U(t) = \exp\Bigl(\bigl(-\frac{it}{\hbar}\bigr) H_{\mathrm{op}}\Bigr);
   $$
3. **Global Schrödinger differential equation**: for all $t \in \mathbb{R}$, $U$ has derivative $-\frac{i}{\hbar} H_{\mathrm{op}} U(t)$ at $t$ (`HasDerivAt U ((-Complex.I / ↑ℏ) • (H_op * U t)) t`).
:::

::: proof
First derive skew-adjointness of the generator $G$ inside the proof: differentiate the bilinear product $t \mapsto U(t)^* U(t)$ at $t = 0$. Using $U(0) = 1$ and the product rule gives derivative $G^* \cdot 1 + 1^* \cdot G = G^* + G$, while differentiating the constant map $U(t)^* U(t) = 1$ gives $0$, so uniqueness of derivatives forces $G^* + G = 0$, i.e., $G^* = -G$. Taking the adjoint of $H_{\mathrm{op}} = (i\hbar)G$ for real $\hbar$ then yields $H_{\mathrm{op}}^* = \overline{i\hbar}\,G^* = (-i\hbar)(-G) = (i\hbar)G = H_{\mathrm{op}}$ (claim 1). Next, translating the derivative $G$ at $s = 0$ via $U(t + s) = U(t)U(s)$ and invoking uniqueness of the Banach-algebra initial-value problem $f'(t) = G f(t),\, f(0) = 1$ gives $U(t) = \exp(t G)$. Since $\hbar \neq 0$ implies $\bigl(-\frac{it}{\hbar}\bigr)(i\hbar) = -i^2 t = t$, we have $\bigl(-\frac{it}{\hbar}\bigr)H_{\mathrm{op}} = t G$, establishing claims 2 and 3. The full proof is checked by the Lean kernel.
:::

Now suppose that while the two-dimensional rotor $U(t) = e^{-itH}$ ($\hbar = 1$, [`hamiltonianPropagator`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.hamiltonianPropagator)) turns continuously, an observer monitors a fixed one-dimensional idempotent line $P$ ($P^2 = P = P^*$). How does the **particle detection probability** $p(t) := \operatorname{Re}\operatorname{bornProbability}(\rho_t, P)$ ([`projectionProbability`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projectionProbability)) of the evolved density matrix $\rho_t := e^{-itH}\rho e^{itH}$ ([`evolvedDensity`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.evolvedDensity)) change with time?

The next proposition proves a striking identity: **the rate of change $p'(t)$ of particle probability along the line $P$ is driven entirely by the commutator bivector area $[H, P] = HP - PH$ between the Hamiltonian $H$ and the projector $P$!**

::: {.proposition #prop-projection-probability-flow title="Commutator Current Formula and Conservation Law for Projection Probability Flow" lean="D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow"}
Let $n$ be a finite index type with decidable equality, let $H, P \in M_n(\mathbb{C})$ satisfy $H^* = H$ and the star-projection condition $P^2 = P = P^*$, and let $\rho : \mathrm{DensityState}\,n$ be a density state. Write $\rho_t := e^{-itH}\rho e^{itH}$ ([`evolvedDensity`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.evolvedDensity)) and $p(t) := \operatorname{Re}\operatorname{bornProbability}(\rho_t, P)$ ([`projectionProbability`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projectionProbability)). Then:

1. **Real-valued Born trace pairing**: for all $t \in \mathbb{R}$, $(p(t) : \mathbb{C}) = \operatorname{bornProbability}(\rho_t, P) = \Tr(\rho_t P)$;
2. **Commutator probability-current derivative**: for all $t \in \mathbb{R}$, $p(t)$ has derivative at $t$ given by
   $$
   p'(t) = \operatorname{Re}\Bigl(i\Tr\bigl(\rho_t (H P - P H)\bigr)\Bigr),
   $$
   and $i\Tr\bigl(\rho_t(H P - P H)\bigr)$ is already purely real: $\bigl(\operatorname{Re}(i\Tr(\rho_t(HP - PH))) : \mathbb{C}\bigr) = i\Tr\bigl(\rho_t(HP - PH)\bigr)$;
3. **Conservation under commuting projection**: if $H P - P H = 0$, then $\forall t \in \mathbb{R},\, p(t) = p(0)$.
:::

::: proof
For claim 1, unitarity of $e^{-itH}$ preserves the density-state axioms on $\rho_t$, so $P^2 = P = P^*$ and the Born reality theorem of [Chapter 2](ch02-born-rule.md) ensure that $\Tr(\rho_t P)$ is real. For claim 2, differentiating $\rho_t = e^{-itH}\rho e^{itH}$ via [`hamiltonianGenerator`](lean:D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.hamiltonianGenerator) $-iH$ yields $\frac{d}{dt}\rho_t = -i(H\rho_t - \rho_t H)$; multiplying by $P$ and applying trace linearity and cyclicity $\Tr(H\rho_t P) = \Tr(\rho_t P H)$ gives

$$
\frac{d}{dt}\Tr(\rho_t P) = -i\Tr\bigl((H\rho_t - \rho_t H)P\bigr) = i\Tr\bigl(\rho_t(HP - PH)\bigr).
$$

Conjugate symmetry of $\rho_t, H, P$ implies that $i\Tr(\rho_t(HP - PH))$ equals its own complex conjugate and is therefore real. Finally, if $HP - PH = 0$, then $p'(t) = 0$ for all $t \in \mathbb{R}$, so $p(t) = p(0)$ is constant (claim 3). The full proof is checked by the Lean kernel.
:::

In particular, when $\psi$ is an energy eigenstate ($H\psi = E\psi$), theorems [`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) and [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero) in `Quantum/Dynamics/EnergyEigenstateStationarity` prove that its energy variance vanishes and $\psi(t) = e^{-itE/\hbar}\psi$ acquires only an unobservable global phase, leaving its rank-one projector and all expectation values stationary for all $t \in \mathbb{R}$! **Without a nonzero commutator bivector area $[H, P] \neq 0$, no classical tick can ever register along the line $P$!**

::: {.figure src="ch07-commutator-flow"}
**The shadow moves only when the axis and the ruler are not parallel.** The one-qubit special case: the ruler $P = \lvert 0\rangle\langle 0\rvert$ is the cyan vertical axis, and the violet axis $H$ is tilted $40^\circ$ from the vertical. The amber state starts at the north pole and goes once round a dashed small circle about the violet axis, and its shadow on the cyan axis moves up and down; on the right the cyan curve is the probability $p(t)$ of staying in $\lvert 0\rangle$, swinging between $1$ and $0.59$. When the axis and the ruler coincide, $[H, P] = 0$ and the grey $p(t)$ stays at $1$ ([@prop-projection-probability-flow]; the one-qubit curves are a hand derivation and numerics).
:::

## 7.2 Quantum Speed Limits (Mandelstam–Tamm and Margolus–Levitin): The Minimum Time to Cross a $90^\circ$ Orthogonal Wall {#sec-quantum-speed-limit}

If "the line is classical time and the area is quantum time," **what is the minimum duration required to convert continuous two-dimensional quantum rotation into two genuinely distinguishable ticks of a classical clock?**

Pose the question geometrically. When do two target states $m_0$ and $m_1$ constitute two truly distinct, non-overlapping clock records? Only when they are **mutually orthogonal** ($\langle m_0, m_1\rangle_{\mathbb{C}} = 0$), so that their Fubini–Study geodesic angle ([`fsAngle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fsAngle) $\theta_{\mathrm{FS}}(x, y) := \arccos\|\langle x, y\rangle_{\mathbb{C}}\|$) equals a full right angle:

$$
\theta_{\mathrm{FS}}(m_0, m_1) = \arccos\|0\| = \frac{\pi}{2} = 90^\circ!
$$

In other words: **every unmistakable tick of classical linear time requires the quantum state to traverse a $90^\circ$ ($\pi/2$ radian) orthogonal wall on the projective sphere!**

In the Lean module `QuantumBounds/FubiniStudyRecordTime`, we first establish the Fubini–Study spherical triangle inequality $\theta_{\mathrm{FS}}(a, c) \le \theta_{\mathrm{FS}}(a, b) + \theta_{\mathrm{FS}}(b, c)$ for unit vectors ([`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle)). Whenever the angular displacements from an anchor state $a$ to two orthogonal target records $m_0, m_1$ ($\langle m_0, m_1\rangle_{\mathbb{C}} = 0$) obey the speed-limit bounds $\theta_{\mathrm{FS}}(a, m_k) \le \mathrm{energy}\cdot\tau / \hbar$ ($k = 0, 1$), the two legs must bridge the $\pi/2$ orthogonal separation, locking in both a universal lower bound on the step duration $\tau$ and an upper bound on the number of sequential records $N$ achievable in total time $T$!

::: {.figure src="ch07-wall"}
**Two legs, each no longer than $E\tau/\hbar$, must together span at least $90^\circ$.** On the equator, $m_0$ and $m_1$ are orthogonal, joined by the magenta $90^\circ$ arc; from the amber anchor $a$ a cyan arc runs to each, and each is capped by the speed bound $\le E\tau/\hbar$ ($E$ is the theorem's $\mathrm{energy}$). The two cyan arcs together are no shorter than the magenta one, so $2E\tau/\hbar \ge \frac{\pi}{2}$ ([@thm-fubini-study-record-time]). Schematic: the sphere of real unit vectors, on which the Fubini–Study angle is the arc length when overlaps are positive.
:::

::: {.theorem #thm-fubini-study-record-time title="Fubini–Study Lower Bound on Orthogonal Record Time and Upper Bound on Sequential Record Count" lean="D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound"}
Let $E$ be a complex inner-product space, and let $a, m_0, m_1 \in E$ be unit vectors ($\|a\| = \|m_0\| = \|m_1\| = 1$) with orthogonal target records $\langle m_0, m_1\rangle_{\mathbb{C}} = 0$. Write $\theta_{\mathrm{FS}}(x, y) := \arccos\|\langle x, y\rangle_{\mathbb{C}}\|$ ([`fsAngle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fsAngle)). Let $\mathrm{energy} > 0$, $\hbar > 0$, and $\tau \in \mathbb{R}$. If the Fubini–Study angles from the anchor state $a$ to $m_0$ and $m_1$ satisfy the speed-limit bounds

$$
\theta_{\mathrm{FS}}(a, m_0) \le \frac{\mathrm{energy}\cdot\tau}{\hbar}, \qquad \theta_{\mathrm{FS}}(a, m_1) \le \frac{\mathrm{energy}\cdot\tau}{\hbar},
$$

then the record step duration $\tau$ obeys the lower bound

$$
\tau \ge \frac{\pi \hbar}{4 \cdot \mathrm{energy}}.
$$

Furthermore, for any step count $N \in \mathbb{N}$, indexed families $a, m_0, m_1 : \mathrm{Fin}\,N \to E$, step durations $\tau : \mathrm{Fin}\,N \to \mathbb{R}$, and total time $T \in \mathbb{R}$, if every step $i \in \mathrm{Fin}\,N$ satisfies $\|a(i)\| = \|m_0(i)\| = \|m_1(i)\| = 1$, $\langle m_0(i), m_1(i)\rangle_{\mathbb{C}} = 0$, $\theta_{\mathrm{FS}}(a(i), m_0(i)) \le \frac{\mathrm{energy}\cdot\tau(i)}{\hbar}$, and $\theta_{\mathrm{FS}}(a(i), m_1(i)) \le \frac{\mathrm{energy}\cdot\tau(i)}{\hbar}$ under the total time budget $\sum_{i \in \mathrm{Fin}\,N} \tau(i) \le T$ (with $\mathrm{energy} > 0, \hbar > 0$), then the total record count satisfies ([`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound)):

$$
N \le \frac{4 \cdot \mathrm{energy} \cdot T}{\pi \hbar}.
$$
:::

::: proof
Since $\langle m_0, m_1\rangle_{\mathbb{C}} = 0$, we have $\theta_{\mathrm{FS}}(m_0, m_1) = \arccos 0 = \frac{\pi}{2}$. Applying the spherical triangle inequality [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle) to the unit triple $(m_0, a, m_1)$ and using symmetry $\theta_{\mathrm{FS}}(m_0, a) = \theta_{\mathrm{FS}}(a, m_0)$ gives

$$
\frac{\pi}{2} = \theta_{\mathrm{FS}}(m_0, m_1) \le \theta_{\mathrm{FS}}(a, m_0) + \theta_{\mathrm{FS}}(a, m_1) \le \frac{\mathrm{energy}\cdot\tau}{\hbar} + \frac{\mathrm{energy}\cdot\tau}{\hbar} = \frac{2\cdot\mathrm{energy}\cdot\tau}{\hbar}.
$$

Since $\mathrm{energy} > 0$ and $\hbar > 0$, multiplying both sides by $\frac{\hbar}{2\cdot\mathrm{energy}} > 0$ yields $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$. For the indexed family, each step $i \in \mathrm{Fin}\,N$ obeys $\tau(i) \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$ by the single-step bound; summing over $i \in \mathrm{Fin}\,N$ gives $N \cdot \frac{\pi\hbar}{4\cdot\mathrm{energy}} \le \sum_{i \in \mathrm{Fin}\,N} \tau(i) \le T$, and multiplying by $\frac{4\cdot\mathrm{energy}}{\pi\hbar} > 0$ yields [`record_count_upper_bound`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound): $N \le \frac{4\cdot\mathrm{energy}\cdot T}{\pi\hbar}$. The full proof is checked by the Lean kernel.
:::

[@thm-fubini-study-record-time] expresses the conversion between “classical time” and “quantum time” as a conditional geometric constraint: two legs from a common anchor, each limited by a speed bound $\mathrm{energy}/\hbar$, must together span the orthogonal wall. Here $\mathrm{energy}>0$ is an upper-bound parameter, with no automatic identification as a system's actual energy. The preparation and evolution must be specified before this picture of “orthogonal tokens” can describe a concrete clock.

The $\mathrm{energy}$ of the theorem is an abstract speed parameter. Replacing it by the energy fluctuation of a concrete Hamiltonian shows when the bound is attained, when it is not, and how long a real qubit takes to cross the wall once.

::: {.viz src="speed-limit-zeno" preset="equal" height="500"}
**Two even levels: the angle runs along the speed line into the wall.** The frame stops just before the wall, at $t = 0.9\,\pi\hbar/E$: on the left two cyan arrows of length one half are about to point opposite ways and the amber dot is only $0.16$ from the magenta centre; once they are opposite their sum vanishes and the dot falls into the centre. On the right the cyan angle curve runs along the dashed speed line $\Delta H\,t/\hbar$, at $81^\circ$ now, and meets the magenta $90^\circ$ wall at $t = \pi\hbar/E$. The half-way point splits it into $45^\circ + 45^\circ$, exactly the case in which [@thm-fubini-study-record-time] holds with equality ([@ex-orthogonalization-times]).
:::

::: {.example #ex-orthogonalization-times title="Working the Speed Limit Out: Attained for Two Levels, Not for Three, and Never Reached by an Unequal Superposition"}
This example computes directly with concrete Hamiltonians. Each of the two general bounds it uses — the Mandelstam–Tamm bound $\tau_\perp \ge \frac{\pi\hbar}{2\,\Delta H}$ and the Margolus–Levitin bound $\tau_\perp \ge \frac{\pi\hbar}{2\langle H\rangle}$ — is a **literature result, not formalized in this book** (see [@rem-qsl-zeno-literature]); here $\Delta H$ is the standard deviation of the energy and $\langle H\rangle$ the mean energy above the ground level.

**1. Equal superposition of two levels: attained.** Take levels $0$ and $E$ and the initial state $\psi(0) = \frac{1}{\sqrt{2}}\bigl(\lvert 0\rangle + \lvert 1\rangle\bigr)$. Then $\psi(t) = \frac{1}{\sqrt{2}}\bigl(\lvert 0\rangle + e^{-iEt/\hbar}\lvert 1\rangle\bigr)$ and

$$
\begin{aligned}
\bigl\lvert\langle\psi(0), \psi(t)\rangle\bigr\rvert &= \Bigl\lvert\frac{1 + e^{-iEt/\hbar}}{2}\Bigr\rvert = \Bigl\lvert\cos\frac{Et}{2\hbar}\Bigr\rvert, \\
\theta_{\mathrm{FS}}\bigl(\psi(0), \psi(t)\bigr) &= \frac{Et}{2\hbar} \qquad \Bigl(0 \le t \le \frac{\pi\hbar}{E}\Bigr).
\end{aligned}
$$

The first orthogonality occurs at $\tau_\perp = \frac{\pi\hbar}{E}$. For this state $\langle H\rangle = \frac{E}{2}$ and $\Delta H = \frac{E}{2}$, so the angle grows uniformly at speed exactly $\Delta H/\hbar$, both bounds equal $\frac{\pi\hbar}{E}$, and both are attained. Compare with [@thm-fubini-study-record-time]: take $m_0 = \psi(0)$, $m_1 = \psi(\tau_\perp)$, the anchor $a = \psi(\tau_\perp/2)$, $\mathrm{energy} = \Delta H = \frac{E}{2}$ and $\tau = \frac{\tau_\perp}{2}$. Both legs have angle $\frac{\pi}{4} = \frac{\mathrm{energy}\cdot\tau}{\hbar}$, so the hypotheses hold with equality, and so does the conclusion $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}} = \frac{\pi\hbar}{2E}$.

**2. Equal superposition of three levels: not attained.** Take levels $0, E, 2E$ and $\psi(0) = \frac{1}{\sqrt{3}}\bigl(\lvert 0\rangle + \lvert 1\rangle + \lvert 2\rangle\bigr)$. With $z = e^{-iEt/\hbar}$ the overlap is $\frac{1}{3}(1 + z + z^2)$, which first vanishes when $z$ becomes a primitive cube root of unity:

$$
\tau_\perp = \frac{2\pi\hbar}{3E} \approx 2.0944\,\frac{\hbar}{E} .
$$

The energy statistics are $\langle H\rangle = E$, $\langle H^2\rangle = \frac{5}{3}E^2$ and $\Delta H = \sqrt{\tfrac{2}{3}}\,E \approx 0.8165\,E$.

| Quantity | Value (in units of $\hbar/E$) |
| :--- | :---: |
| Actual orthogonalization time $\tau_\perp$ | $2.0944$ |
| Mandelstam–Tamm bound $\frac{\pi\hbar}{2\,\Delta H}$ | $1.9238$ |
| Margolus–Levitin bound $\frac{\pi\hbar}{2\langle H\rangle}$ | $1.5708$ |

Both bounds hold and neither is attained. The reason can be computed: the state still moves through projective space at speed $\Delta H/\hbar$, and by $\tau_\perp$ it has travelled an arc of length $\Delta H\,\tau_\perp/\hbar \approx 1.7101$ radians, whereas the geodesic between its endpoints measures only $\frac{\pi}{2} \approx 1.5708$ radians. The orbit is curved and about $8.9\%$ longer. Angle and arc length along the way ($t$ in units of $\hbar/E$, rounded to the digits shown):

| $t$ | Overlap $\lvert\langle\psi(0), \psi(t)\rangle\rvert$ | Angle $\theta_{\mathrm{FS}}$ (radians) | Arc length $\Delta H\,t/\hbar$ (radians) |
| :---: | :---: | :---: | :---: |
| $0.5$ | $0.9184$ | $0.4068$ | $0.4082$ |
| $1.0$ | $0.6935$ | $0.8044$ | $0.8165$ |
| $1.5$ | $0.3805$ | $1.1805$ | $1.2247$ |
| $2.0944$ | $0$ | $1.5708$ | $1.7101$ |

**3. An unequal superposition: the wall is never reached.** Take $\psi(0) = \cos\alpha\,\lvert 0\rangle + \sin\alpha\,\lvert 1\rangle$ (levels $0, E$ as before, $0 < \alpha \le 45^\circ$). Then

$$
\bigl\lvert\langle\psi(0), \psi(t)\rangle\bigr\rvert^2 = \cos^4\alpha + \sin^4\alpha + 2\cos^2\alpha\,\sin^2\alpha\,\cos\frac{Et}{\hbar} \;\ge\; \cos^2 2\alpha ,
$$

so the smallest overlap is $\lvert\cos 2\alpha\rvert$ and the largest angle is $2\alpha$. For $\alpha = 30^\circ$ the state turns through at most $60^\circ$, for $\alpha = 40^\circ$ at most $80^\circ$; only the equal superposition $\alpha = 45^\circ$ just reaches $90^\circ$. Not every state can sound a "tick": if its weights on the two levels are unequal, it keeps some overlap with its own past forever.

**4. Why only the equal two-level superposition attains the bound.** The proof of the Margolus–Levitin bound uses the inequality $\cos x \ge 1 - \frac{2}{\pi}(x + \sin x)$ for $x \ge 0$:

| $x$ | $0$ | $\frac{\pi}{2}$ | $\pi$ | $\frac{3\pi}{2}$ | $2\pi$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $\cos x$ | $1$ | $0$ | $-1$ | $0$ | $1$ |
| $1 - \frac{2}{\pi}(x + \sin x)$ | $1$ | $-0.6366$ | $-1$ | $-1.3634$ | $-3$ |

Equality occurs only at $x = 0$ and $x = \pi$. Attaining the bound requires the phase $E_n\tau_\perp/\hbar$ of every energy component at time $\tau_\perp$ to sit at one of these two points, which is case 1 (phases $0$ and $\pi$); in case 2 the three phases are $0, \frac{2\pi}{3}, \frac{4\pi}{3}$, so the inequality is strict.

**5. Orders of magnitude.** A qubit with level splitting $E = hf$, $f = 5\,\mathrm{GHz}$ ($E \approx 20.7\,\mu\mathrm{eV}$), precessing freely, has for the equal superposition the orthogonalization time

$$
\tau_\perp = \frac{\pi\hbar}{E} = \frac{1}{2f} = 100\,\mathrm{ps} .
$$

By the counting bound of [@thm-fubini-study-record-time] with $\mathrm{energy} = \Delta H = \frac{hf}{2}$, provided each step satisfies the common-preparation and two-endpoint displacement assumptions and the sequential contact budget, within $T = 25\,\mathrm{ns}$ one has $N \le \frac{4\cdot\mathrm{energy}\cdot T}{\pi\hbar} = 4fT = 500$. Under drive the situation differs: [@ex-five-ghz-pi-over-two] of [Chapter 11](ch11-pulses-and-virtual-z.md) removes the carrier in the rotating frame, the energy scale of the effective Hamiltonian is the Rabi frequency $\Omega = 2\pi \times 10\,\mathrm{MHz}$, the initial state $\lvert 0\rangle$ has $\Delta H = \frac{\hbar\Omega}{2}$, and the orthogonalization time is $\tau_\perp = \frac{\pi}{\Omega} = 50\,\mathrm{ns}$, exactly twice the $25\,\mathrm{ns}$ quarter turn computed there. These two preparation-and-evolution protocols have orthogonalization times differing by a factor of five hundred. Each must be evaluated using its evolution generator and specified readout reference.
:::

::: {.viz src="speed-limit-zeno" preset="three" height="500"}
**Three even levels: a bent path and a late arrival.** On the left three cyan arrows close into a triangle at $t = \frac{2\pi}{3}$ and the amber dot returns to the magenta centre. On the right the cyan curve bends below the dashed speed line: the speed line reaches the wall at MT $1.924$, the curve touches the magenta wall only at $\tau_\perp = 2.094$, and the ML mark sits at $1.571$. Both bounds are literature results, not formalized in this book.
:::

The three-level state arrives late but does reach the wall; once the two-level weights leave the even split, say at $\alpha = 30^\circ$, the angle rises no higher than $2\alpha = 60^\circ$.

::: {.viz src="speed-limit-zeno" preset="unequal" height="500"}
**Uneven weights: the wall is out of reach.** Weight angle $\alpha = 30^\circ$: on the left a long cyan arrow of $0.75$ and a short one of $0.25$ never cancel, and the amber dot comes no closer to the magenta centre than $0.5 = \lvert\cos 2\alpha\rvert$. On the right the angle rises to $2\alpha = 60^\circ$ at most and never touches the magenta wall.
:::


## 7.3 The Quantum Zeno Effect: Exterior-Area Evolution Frozen by High-Frequency Inner-Product Measurements {#sec-quantum-zeno-effect}

Now ask the converse question: what happens if a state begins sweeping out exterior area $\vv{A}\wedge\vv{B} = \sin(\omega t/2)\,\vv{I}$ in a plane, but an impatient observer refuses to wait for it to reach $90^\circ$ — repeatedly projecting the state back onto the initial axis $\vv{A}$ via $P_{\vv{A}}^2 = P_{\vv{A}}$ at tiny intervals $\delta t = T / N$?

The result is the celebrated **Quantum Zeno Effect** — a watched pot never boils!

In our line-and-area geometry, the mechanism is completely elementary: **over a tiny step $\delta t = T/N \ll 1$, the exterior wedge altitude grows at first order as $\sin(\omega\delta t/2) \approx \frac{\omega T}{2N}$, whereas the inner-product survival probability along the initial line $\vv{A}$ drops only at second order as $\cos^2(\omega\delta t/2) = 1 - \sin^2(\omega\delta t/2) \approx 1 - \frac{\omega^2 T^2}{4N^2}$!** When high-frequency inner-product projections repeatedly flatten the incipient first-order wedge area back onto the reference line, $N$ second-order losses accumulate to only $N \times O(N^{-2}) = O(N^{-1}) \to 0$, freezing the state in place!

::: {.figure src="ch07-zeno-n"}
**The more often you measure, the closer the chance of staying in $\lvert 0\rangle$ comes to $1$.** Against the number of measurements $N$ (log scale), the cyan curve is $P_N = \bigl[\cos^2\frac{\pi}{2N}\bigr]^N$, and the cyan points mark $N = 1, 4, 16, 64$ at $0$, $0.531$, $0.857$ and $0.962$; the grey dashed curve is the approximation $1 - \frac{\pi^2}{4N}$, which hugs the cyan curve as $N$ grows: the gap shrinks like $\frac{1}{N}$. The values come from the closed form in [@ex-zeno-strobe-freezing].
:::

::: {.example #ex-zeno-strobe-freezing title="Analytical Formula and Numerical Ledger (N = 1, 4, 16, 64) for Stroboscopic Quantum Zeno Freezing"}
Prepare a single qubit at the north pole $\lvert 0\rangle$ under the Hamiltonian $H = \frac{\hbar\omega}{2}\sigma_x$, which rotates the Bloch vector uniformly about the $X$ axis at angular speed $\omega$. Over total duration $T = \pi / \omega$ (which would flip an unmeasured qubit by $180^\circ$ straight to the orthogonal south pole $\lvert 1\rangle$), insert $N$ equally spaced projective checks onto $\lvert 0\rangle\langle 0\rvert$ at intervals $\delta t = \frac{T}{N} = \frac{\pi}{\omega N}$:

1. **Single-step survival probability**: Over one step $\delta t$, the Bloch angle advances by $\delta\theta = \omega\delta t = \frac{\pi}{N}$, so Born's half-angle law ([Chapter 2](ch02-born-rule.md)) gives survival probability
   $$
   p_1 = \cos^2\Bigl(\frac{\omega T}{2N}\Bigr) = \cos^2\Bigl(\frac{\pi}{2N}\Bigr) = 1 - \frac{\pi^2}{4N^2} + O(N^{-4}).
   $$
2. **$N$-step cumulative survival probability**: Surviving all $N$ stroboscopic checks occurs with probability
   $$
   P_N(T) = \left[\cos^2\Bigl(\frac{\pi}{2N}\Bigr)\right]^N = \left(1 - \frac{\pi^2}{4N^2} + O(N^{-4})\right)^N = 1 - \frac{\pi^2}{4N} + O(N^{-2}) \;\xrightarrow{\;N \to \infty\;}\; 1!
   $$

Evaluating $P_N(T)$ at $N = 1, 4, 16, 64$ shows how rapid inner-product polling freezes exterior-area rotation:

| Strobe Count $N$ | Step Angle $\delta\theta = \frac{180^\circ}{N}$ | Single-Step Survival $\cos^2(\frac{\pi}{2N})$ | Cumulative Survival $P_N = [\cos^2(\frac{\pi}{2N})]^N$ | Asymptotic $1 - \frac{\pi^2}{4N}$ | Geometric Diagnosis |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **$N = 1$** (end only) | $180^\circ$ | $0.0000$ | **$0.0000$ ($0.0\%$)** | — | Uninterrupted area sweep reaches $\lvert 1\rangle$ |
| **$N = 4$** | $45^\circ$ | $0.8536$ | **$0.5308$ ($53.1\%$)** | $0.3831$ | Over half the ensemble is pulled back to North $\lvert 0\rangle$ |
| **$N = 16$** | $11.25^\circ$ | $0.9904$ | **$0.8569$ ($85.7\%$)** | $0.8458$ | Incipient wedge area is sheared off at $11.25^\circ$ steps |
| **$N = 64$** | $2.8125^\circ$ | $0.9994$ | **$0.9622$ ($96.2\%$)** | $0.9614$ | High-frequency inner-product checks lock the state at $\lvert 0\rangle$ |
:::

::: {.viz src="speed-limit-zeno" preset="strobe4" height="500"}
**Four strobes: half of it stays.** The arrow is pulled back after every $45^\circ$; the cyan arc is as far as each turn gets. The frame stops before the fourth look, with the arrow at the end of its turn: the magenta part off the line is $\sin 45^\circ \approx 0.71$ long, first order, while the cyan shadow is only $1 - \cos 45^\circ \approx 0.29$ shorter, second order. On the right the chance to stay drops a step at each look and is $0.531$ now, while the dashed unwatched path has lost everything by $180^\circ$. The ring marks are the end points for $N = 1, 16, 64$ ([@ex-zeno-strobe-freezing]).
:::

[@ex-zeno-strobe-freezing] follows only one branch: the one in which every probe answers "still in $\lvert 0\rangle$". The same stroboscopic detector can keep a second ledger. Start from the initial state $v$; after each unitary step $U$ ask "has it returned to $v$?". If the answer is yes, stop the clock; if no, the state is projected onto the orthogonal complement of $v$ and the next step begins. This yields two sequences of numbers: the probability of returning for the first time exactly at step $n$, and the probability of not having returned during the first $n$ steps. This ledger has a frozen Lean theorem, valid for every unitary evolution.

::: {.definition #def-monitored-return title="Monitored Step, Return Amplitude, Return Probability, and Survival Probability" lean="D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitoredStep D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitoredHistory D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.returnAmplitude D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.returnProbability D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.survivalProbability"}
Let $E$ be a complete complex inner-product space (`[NormedAddCommGroup E]`, `[InnerProductSpace ℂ E]`, `[CompleteSpace E]`), $U : E \simeq_{\mathrm{li}}[\mathbb{C}] E$ a linear isometric equivalence, and $v \in E$. Write $P_v$ for the orthogonal projection onto the span $\mathbb{C} v$ (a line when $v \neq 0$). In the module `MonitoredReturnConservation`:

1. The **monitored step** [`monitoredStep`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitoredStep) $U\ v = (\mathrm{id} - P_v) \circ U$: evolve one step, then project onto the "no return" subspace;
2. The **monitored history** [`monitoredHistory`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitoredHistory) $U\ v\ n = (\operatorname{monitoredStep}\ U\ v)^n\, v$: the unnormalized state after $n$ consecutive "no" answers;
3. The **return amplitude** [`returnAmplitude`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.returnAmplitude) $U\ v\ n = \bigl\langle v,\ U\bigl(\operatorname{monitoredHistory}\ U\ v\ (n - 1)\bigr)\bigr\rangle$, where $n - 1$ is natural-number subtraction;
4. The **return probability** [`returnProbability`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.returnProbability) $U\ v\ n = \lVert\operatorname{returnAmplitude}\ U\ v\ n\rVert^2$;
5. The **survival probability** [`survivalProbability`](lean:D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.survivalProbability) $U\ v\ n = \lVert\operatorname{monitoredHistory}\ U\ v\ n\rVert^2$.
:::

Below, $\operatorname{returnProbability}\ U\ v\ n$ is abbreviated $p_n$ and $\operatorname{survivalProbability}\ U\ v\ n$ is abbreviated $s_n$.

::: {.proposition #prop-monitored-return-conservation title="Stepwise and Finite Conservation for the Monitored Return Protocol" lean="D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation"}
With the notation of [@def-monitored-return], let $\lVert v\rVert = 1$ (`hv`). Then all three of the following hold:

1. $s_0 = 1$;
2. For every $n \in \mathbb{N}$: $p_{n+1} = s_n - s_{n+1}$;
3. For every $N \in \mathbb{N}$:

   $$
   \sum_{n=0}^{N-1} p_{n+1} \;+\; s_N \;=\; 1 .
   $$
:::

::: proof
Claim 1: the history after zero probes is $v$ itself, of squared norm $1$. Claim 2: decompose the vector $U\bigl(\operatorname{monitoredHistory}\ U\ v\ n\bigr)$ along $\mathbb{C}v$ and its orthogonal complement by Pythagoras (`Submodule.norm_sq_eq_add_norm_sq_starProjection`). $U$ is an isometry, so the squared norm on the left equals $s_n$; the component along $\mathbb{C}v$ is identified, through the formula for a rank-one projection (`Submodule.starProjection_singleton`) and $\lVert v\rVert = 1$, as the return amplitude, of squared norm $p_{n+1}$; the component in the orthogonal complement is exactly the next monitored history, of squared norm $s_{n+1}$. Claim 3 sums claim 2 over $n = 0, \dots, N - 1$; the right-hand side telescopes (`Finset.sum_range_sub'`), and $s_0 = 1$ is inserted. The full proof is checked by the Lean kernel.
:::

[@prop-monitored-return-conservation] says that no probability is lost: the probability of a first return within the first $N$ steps, plus the probability of no return so far, is exactly $1$. It does not depend on what $U$ is, nor on the dimension of the space. Applied to the rotating qubit of [@ex-zeno-strobe-freezing], it leads to a conclusion that stands exactly opposite to Zeno freezing.

Before computing a mean return time, ask which directions the initial state can actually visit. In a finite-dimensional complex inner-product space $E$, let $U$ be unitary, take $v\in E$, and write

$$
C=\operatorname{span}_{\mathbb C}\{U^n v:n\in\mathbb N\},
\qquad
P_v=\text{the orthogonal projection onto }\mathbb C v.
$$

This orbit span is the cyclic space of the initial vector. Two finite-dimensional arguments explain why a direction that never triggers the detector must be treated differently inside and outside $C$.

::: {.proposition #rem-monitored-cyclic-observability title="No permanent dark state in the cyclic space" lean="D5/S3/QuantumChannels/ProjectionDiagnostics/CyclicMonitoredContraction.cyclic_future_kernel_eq_bot"}
Retain the finite-dimensional complex inner-product space $E$, unitary $U$, arbitrary vector $v\in E$, and cyclic space $C$ defined above. Put $T=(I-P_v)U$. The operator $U$ preserves $C$, and the range of $P_v$ lies in $C$, so both $T$ and $P_vU$ restrict to operators from $C$ to itself:

$$
A=T|_C,\qquad B=(P_vU)|_C.
$$

Then the directions producing no click at any future step form the zero subspace:

$$
K=\bigcap_{n\in\mathbb N}\ker(BA^n)=\{0\}.
$$
:::

::: proof
For $x\in K$, the equation $Bx=0$ gives $Ax=Ux$. Shifting the click history by one step also gives $Ax\in K$, so $U$ preserves $K$. The restriction $U|_K$ is injective on a finite-dimensional space and hence surjective; therefore $U^{-1}$ preserves $K$ too. Write any $x\in K$ as $x=Uy$ with $y\in K$. Since $By=P_vUy=0$, we have $x\perp v$. Iterating backwards under $U$ now gives $x\perp U^nv$ for every $n\ge0$. Yet $x$ belongs to their span $C$, so

$$
K=\{0\}.
$$

No unit-vector assumption is needed: when $v=0$, the cyclic space is zero. Omitting the cyclic restriction would make the conclusion false. With $U=I$ and $v=e_1$, any nonzero vector orthogonal to $e_1$ never clicks. This argument establishes observability within the cyclic space; it does not yet compute an infinite return-probability sum. The full proof is checked by the Lean kernel.
:::

::: {.proposition #rem-monitored-cyclic-power-contraction title="Strict power contraction of the actual cyclic monitored operator" lean="D5/S3/QuantumChannels/ProjectionDiagnostics/CyclicMonitoredPowerBound.cyclic_power_contraction"}
Retain the finite-dimensional complex inner-product space $E$, unitary $U$, cyclic space $C$, and actual restriction $A=((I-P_v)U)|_C$ from [@rem-monitored-cyclic-observability], and assume $\norm v=1$. Then there exist $N\in\mathbb N$ and $q\in\mathbb R$ such that

$$
N\ge1,\qquad 0\le q<1,\qquad \norm{A^N}_{\mathrm{op}}\le q,
$$

where the norm is the operator norm on $C\to C$.
:::

::: proof
Let $d=\dim_{\mathbb C}C\ge1$. Orthogonal projection and the isometry of $U$ give, for $x\in C$,

$$
\norm{Ax}^2+\norm{Bx}^2=\norm{x}^2.
$$

Set $K_m=\bigcap_{j=0}^{m-1}\ker(BA^j)$, with $K_0=C$. If $K_m=K_{m+1}$ at any step, shifting the history shows that $A$ preserves $K_m$, so it is already the permanent dark space. The preceding argument makes that space zero. Thus its dimension must decrease strictly whenever $K_m\ne\{0\}$, and $K_d=\{0\}$ after at most $d$ steps.

For each unit vector $x\in C$, finite conservation therefore gives

$$
\norm{A^d x}^2
=1-\sum_{j=0}^{d-1}\norm{BA^j x}^2<1.
$$

The unit sphere is compact in finite dimension, so the continuous function $x\mapsto\norm{A^dx}$ attains its maximum, which is still strictly below one. Choosing $N=d$ and $q=\norm{A^d}_{\mathrm{op}}$ yields

$$
N\ge1,\qquad 0\le q<1,\qquad \norm{A^N}_{\mathrm{op}}\le q.
$$

Compactness turns a loss in every direction into one strict loss bound shared by all directions. The formal proof expresses $A,B$ in orthonormal coordinates as a conservative single-channel matrix system and reuses the finite-step contraction estimate for zero dark space, choosing the same $N=d$ and $q=\norm{A^d}_{\mathrm{op}}$. The full proof is checked by the Lean kernel.
:::

The bound may depend on $U,v$; it is not a uniform constant across all systems. The complete finite-dimensional monitored mean law follows below. Its literature source is Grünbaum, Velázquez, Werner and Werner, *Recurrence for discrete time unitary evolutions*, [arXiv:1202.3903v3](https://arxiv.org/abs/1202.3903v3), Theorem 2.

::: {.theorem #prob-monitored-spectral-mean title="Finite-dimensional unitary monitored return: the mean counts distinct occupied spectral values" lean="D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredSpectralMean.monitored_spectral_mean"}
Let $E$ be any finite-dimensional complex inner-product space, $U:E\simeq_{\mathrm{li}}[\mathbb C]E$ a unitary operator, and $v\in E$ with $\norm v=1$. Let $P_v$ be the orthogonal projection onto $\mathbb Cv$, put $T=(I-P_v)U$, and retain the actual first-return probability $p_{n+1}=\lvert\langle v,UT^nv\rangle\rvert^2$ from [@def-monitored-return]. Define the actual forward cyclic space and occupied spectrum by

$$
\begin{aligned}
C&=\operatorname{span}_{\mathbb C}\{U^n v:n\in\mathbb N\},\\
S&=\{\lambda\in\mathbb C:\exists w\in E,\ Uw=\lambda w\ \text{and}\ \langle w,v\rangle\ne0\}.
\end{aligned}
$$

Then all four conclusions hold:

1. $S$ is finite;
2. $\#S=\dim_{\mathbb C}C$;
3. The weighted first-return series converges, with $\sum_{n=0}^{\infty}(n+1)p_{n+1}=\#S$;
4. The first-return probability series converges, with $\sum_{n=0}^{\infty}p_{n+1}=1$.

The last two conclusions correspond to `HasSum` in Lean. Certain return is a conclusion, with no separate recurrence assumption. The cardinality $\#S$ counts distinct occupied spectral values, irrespective of eigenspace dimension or algebraic multiplicity.
:::

::: proof
On $C$, write $W=U|_C$ and $A=T|_C$. Finite dimension makes the injective restriction $W$ surjective, so it is still unitary. The unit-vector assumption gives $I_C-AA^*=\lvert v\rangle\langle v\rvert$. Conjugating term by term and telescoping yields

$$
\sum_{n=0}^{H-1}\lvert A^nv\rangle\langle A^nv\rvert
=I_C-A^H(A^H)^*.
$$

Take the trace, then apply finite summation by parts to $p_{n+1}=s_n-s_{n+1}$ from [@prop-monitored-return-conservation]:

$$
\begin{aligned}
\sum_{n=0}^{H-1}s_n
&=\dim_{\mathbb C}C-\operatorname{Re}\Tr\bigl(A^H(A^H)^*\bigr),\\
\sum_{n=0}^{H-1}(n+1)p_{n+1}
&=\sum_{n=0}^{H-1}s_n-Hs_H.
\end{aligned}
$$

By [@rem-monitored-cyclic-power-contraction], along the cofinal horizons $H=kN$ we have $\norm{A^{kN}}_{\mathrm{op}}\le q^k$ and $s_{kN}\le q^{2k}$, where $0\le q<1$. The trace remainder tends to zero, and so does $kN s_{kN}$, using $kq^{2k}\to0$. Monotonicity of the nonnegative partial sums extends this cofinal limit to the whole series, giving weighted sum $\dim_{\mathbb C}C$. Finite probability conservation and the same survival-tail bound give total return probability $1$.

Finally choose an orthonormal eigenbasis of the cyclic unitary $W$. Each basis vector has nonzero overlap with $v$, since otherwise it would be a permanent dark state excluded by [@rem-monitored-cyclic-observability]. Two basis vectors with the same eigenvalue would admit a nonzero linear combination orthogonal to $v$, giving the same contradiction. Their eigenvalues are therefore distinct. Conversely, every occupied ambient eigenvector projects to a nonzero vector in $C$: this projection preserves its overlap with $v$ and commutes with $U$, yielding a cyclic eigenvector with the same eigenvalue. Expansion in the chosen eigenbasis identifies that eigenvalue. Thus $S$ is exactly the set of these distinct cyclic eigenvalues, finite with cardinality $\dim_{\mathbb C}C$. The full proof is checked by the Lean kernel.
:::

This theorem concerns the stepwise pure-state projection-return protocol under finite-dimensional unitary evolution. Infinite-dimensional spectral-measure and winding formulations, general quantum instruments, and physical clock or speed-limit interpretations lie outside its scope.

::: {.remark #rem-monitored-unital-kac title="A Quantum Kac Formula on the Relevant Space (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Integer mean return times also admit a route that does not begin by counting spectral points. Sinkovicz, Kurucz, Kiss and Asbóth, *Quantized recurrence time in iterated open quantum dynamics*, [arXiv:1411.0568v1](https://arxiv.org/abs/1411.0568v1), Sections II–III, Eqs. (11)–(20), consider a finite-dimensional system prepared in a pure state. Each step applies the same completely positive, trace-preserving channel, followed by a test for return to that initial state. The relevant space is spanned by the supports of states reachable from this preparation under the unmonitored evolution. If the channel preserves the identity operator on this relevant space, the mean first return time equals its dimension. The condition concerns the actual relevant space of this preparation. Complete positivity and trace preservation alone do not include it, and the dimension in the conclusion cannot be replaced by that of the whole ambient space.

The mechanism retains the unnormalized conditional state for “no return yet.” Its trace is the survival probability; the difference between successive traces is the first-return probability. Summing these conditional states first, then taking the trace, connects the return mean to a space dimension. Under the stated conditions, Eq. (18) of the paper identifies this operator sum with the identity on the relevant space. Time counts detections after the first evolution step; unmonitored overlap probabilities cannot replace the monitored first-return probabilities.

For the unitary evolution in this section, the relevant space is the cyclic space introduced above. [@prob-monitored-spectral-mean] connects the sum over actual survival histories to the cyclic dimension, then identifies that dimension with the number of distinct occupied spectral values; strict power contraction removes the long-time remainders in its proof. The theorem covers unitary pure-state return. The general channel result in this remark, requiring complete positivity, trace preservation, and preservation of the identity on the actual relevant space, remains a literature result beyond the unitary theorem.
:::

::: {.example #ex-first-return-qubit title="First-Return Statistics of a Rotating Qubit: The Mean Return Time Is Always 2, Whatever the Step"}
Let a qubit turn through the Bloch angle $\delta$ about the $X$ axis at each step, $U = \cos\frac{\delta}{2}\,I - i\sin\frac{\delta}{2}\,X$, with initial state $v = \lvert 0\rangle$. Write $c = \cos\frac{\delta}{2}$ and $s = \sin\frac{\delta}{2}$, and assume $s \neq 0$.

**Step by step.** First step: $U\lvert 0\rangle = c\,\lvert 0\rangle - i s\,\lvert 1\rangle$, so $p_1 = c^2$, the component that has not returned is $-is\,\lvert 1\rangle$, and $s_1 = s^2$. From then on the state sits on $\lvert 1\rangle$: $U\lvert 1\rangle = c\,\lvert 1\rangle - is\,\lvert 0\rangle$, and at each step it returns with conditional probability $s^2$ and stays on $\lvert 1\rangle$ with conditional probability $c^2$. Hence, for $n \ge 1$:

$$
\begin{aligned}
p_1 &= c^2, \\
p_{n+1} &= s^4\,c^{2(n-1)}, \\
s_n &= s^2\,c^{2(n-1)} .
\end{aligned}
$$

Check claim 2 of [@prop-monitored-return-conservation] term by term: $s_n - s_{n+1} = s^2 c^{2(n-1)}(1 - c^2) = s^4 c^{2(n-1)} = p_{n+1}$.

**Total return probability and mean return time.** Summing geometric series:

$$
\begin{aligned}
\sum_{n \ge 1} p_n &= c^2 + \frac{s^4}{1 - c^2} = c^2 + s^2 = 1, \\
\sum_{n \ge 1} n\,p_n &= c^2 + s^4\cdot\frac{2 - c^2}{(1 - c^2)^2} = c^2 + (2 - c^2) = 2 .
\end{aligned}
$$

The mean first-return time is exactly $2$ steps, independently of $\delta$.

**Numbers.**

| step $\delta$ | $p_1$ | $p_2$ | $p_3$ | $s_3$ | $p_1 + p_2 + p_3 + s_3$ | probability $s^2$ of no return at step one | conditional mean return time given no return at step one, $1 + \frac{1}{s^2}$ | mean return time |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $\frac{\pi}{16}$ | $0.990393$ | $9.23\times10^{-5}$ | $9.14\times10^{-5}$ | $0.009424$ | $1.000000$ | $0.009607$ | $105.09$ | $2.000000$ |
| $\frac{\pi}{4}$ | $0.853553$ | $0.021447$ | $0.018306$ | $0.106694$ | $1.000000$ | $0.146447$ | $7.83$ | $2.000000$ |
| $\frac{\pi}{2}$ | $0.500000$ | $0.250000$ | $0.125000$ | $0.125000$ | $1.000000$ | $0.500000$ | $3.00$ | $2.000000$ |
| $2$ | $0.291927$ | $0.501368$ | $0.146363$ | $0.060343$ | $1.000000$ | $0.708073$ | $2.41$ | $2.000000$ |

The entry $p_1 = 0.853553$ in the row $\delta = \frac{\pi}{4}$ is the single-step survival probability for $N = 4$ in [@ex-zeno-strobe-freezing]. The conservation sums and the means in every row were confirmed by numerical simulation ($4000$ iterations).

**Reading.** The smaller the step, the closer the probability of returning at the very first probe comes to $1$; this is Zeno freezing. But if the first probe finds no return (probability $s^2$), coming back takes $\frac{1}{s^2}$ further steps on average. The product makes up exactly one step: $c^2\cdot 1 + s^2\cdot\bigl(1 + \frac{1}{s^2}\bigr) = 2$. However diligently one probes, only the shape of the distribution changes, not its mean.

**The finite-dimensional unitary case.** [@prob-monitored-spectral-mean] gives certain return and proves that the mean first detected return time equals the number of distinct occupied spectral values, hence is an integer. Here that number is $2$. Numerical simulation with random unitaries in dimensions $3$ and $4$ gives means $3.000000$ and $4.000000$.
:::

::: {.viz src="speed-limit-zeno" preset="mean" height="500"}
**First return: always 2 steps on average.** With $\delta = 45^\circ$ each column is the ledger after one more step: cyan is the probability of having returned, magenta of not yet, and every column reaches exactly the line at $1$ ([@prop-monitored-return-conservation]). The total magenta area is the mean return time; step by step it grows from $1$ towards $2$ ([@ex-first-return-qubit]). The dashed magenta staircase is the same ledger for the step $\delta = 90^\circ$: half comes back at the first step, a quite different shape, yet its magenta area also reaches $2$.
:::

The Zeno effect says that if one looks often enough, the state cannot leave. The first-return ledger supplies the other half: however often one looks, the fact that it comes back once every two steps on average does not change, because what this number counts is not time but how many directions this qubit has to go.

::: {.viz src="speed-limit-zeno" height="560"}
**Speed limits and the Zeno strobe: the full lab.** Three scenes on one rail: overlap and angle (change the number of levels and the weights), the strobe on the Bloch sphere (change $N$), and the first-return ledger (change the step $\delta$).
:::

## 7.4 Observer Attention and Scalar Free-Energy Accounting: When to Read Out Particle Ticks and When to Audit Thermodynamic Cost {#sec-observer-attention-freeze}

Place the quantum speed limit of Section 7.2 alongside the Zeno effect of Section 7.3, and re-read the second epigraph at the head of this chapter:

> *"When we bring the observer in endogenously, whether we see a particle or a wave seems to be a question of the observer's attention."*

- When the observer **relaxes the sampling rate** (allowing $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$ without projective interruption), the state has room to unfold its two-dimensional **exterior wave area** $\vv{A}\wedge\vv{B}$, executing coherent interference and unitary gate rotations;
- When the observer **ramps up the sampling frequency** ($\delta t \ll \frac{\hbar}{\mathrm{energy}}$, demanding continual yes/no particle readings along a fixed axis), the incipient two-dimensional area is repeatedly pinched back onto the **one-dimensional particle line**.

We must keep two distinct notions cleanly separated: the projective Zeno effect of Section 7.3 is a dynamical survival phenomenon under stroboscopic projective measurements, whereas on the thermodynamic accounting side we often ask an independent scalar question — when a candidate transition incurs a passive energy cost $\Delta E_{\mathrm{pass}} > 0$ against an entropy tax $\Delta S \in \mathbb{R}$ at inverse temperature $\beta = 1/(k_B T) > 0$, when is its **scalar free-energy accounting deposit** ([`freezeDeposit`](lean:D5/S3/QuantumChannels/DecoherenceFreeze.freezeDeposit) in Lean module `QuantumChannels/DecoherenceFreeze`),

$$
D_{\mathrm{freeze}}(\beta, \Delta S, \Delta E_{\mathrm{pass}}) := \Delta E_{\mathrm{pass}} - \frac{\Delta S}{\beta},
$$

strictly positive relative to the **critical inverse temperature** ([`criticalInverseTemperature`](lean:D5/S3/QuantumChannels/DecoherenceFreeze.criticalInverseTemperature))

$$
\beta_c(\Delta S, \Delta E_{\mathrm{pass}}) := \frac{\Delta S}{\Delta E_{\mathrm{pass}}}?
$$

The theorem below establishes this **scalar free-energy accounting criterion**: for positive scalars $\beta > 0$ and $\Delta E_{\mathrm{pass}} > 0$, the net deposit $D_{\mathrm{freeze}} = \Delta E_{\mathrm{pass}} - \Delta S/\beta$ is strictly positive if and only if $\beta > \beta_c = \Delta S/\Delta E_{\mathrm{pass}}$. (Note that the Lean theorem certifies only this scalar algebraic equivalence; it does not by itself dynamically arrest state evolution or suppress decoherence without an additional physical bath or barrier model.)

::: {.figure src="ch07-freeze-threshold"}
**The deposit is positive exactly when $\beta$ passes $\beta_c = \Delta S/\Delta E_{\mathrm{pass}}$.** With $\Delta E_{\mathrm{pass}} = 1$: on the line $\Delta S = \beta\,\Delta E_{\mathrm{pass}}$ the deposit $D_{\mathrm{freeze}}$ is $0$; in the cyan region below it $D_{\mathrm{freeze}} > 0$, in the magenta region above it $D_{\mathrm{freeze}} < 0$. The amber dashed line holds $\Delta S = \frac{1}{2}$ and walks right, crossing the line at $\beta_c = \frac{1}{2}$ into the cyan region ([@thm-decoherence-freeze-critical]). The figure draws only this scalar inequality, not any dynamics.
:::

::: {.theorem #thm-decoherence-freeze-critical title="Scalar Free-Energy Accounting Criterion for a Positive Deposit Above Critical Inverse Temperature" lean="D5/S3/QuantumChannels/DecoherenceFreeze.decoherence_freeze_iff_above_critical"}
Let the inverse temperature $\beta \in \mathbb{R}$ satisfy $\beta > 0$, let the passive energy shift $\Delta E_{\mathrm{pass}} \in \mathbb{R}$ satisfy $\Delta E_{\mathrm{pass}} > 0$, and let $\Delta S \in \mathbb{R}$ be the entropy tax. Define the scalar accounting deposit and critical inverse temperature by ([`freezeDeposit`](lean:D5/S3/QuantumChannels/DecoherenceFreeze.freezeDeposit), [`criticalInverseTemperature`](lean:D5/S3/QuantumChannels/DecoherenceFreeze.criticalInverseTemperature))

$$
D_{\mathrm{freeze}}(\beta, \Delta S, \Delta E_{\mathrm{pass}}) := \Delta E_{\mathrm{pass}} - \frac{\Delta S}{\beta}, \qquad \beta_c(\Delta S, \Delta E_{\mathrm{pass}}) := \frac{\Delta S}{\Delta E_{\mathrm{pass}}}.
$$

Then the scalar deposit is strictly positive if and only if $\beta$ strictly exceeds the critical threshold $\beta_c$:

$$
0 < D_{\mathrm{freeze}}(\beta, \Delta S, \Delta E_{\mathrm{pass}}) \;\Longleftrightarrow\; \beta_c(\Delta S, \Delta E_{\mathrm{pass}}) < \beta.
$$
:::

::: proof
By definition, $0 < \Delta E_{\mathrm{pass}} - \frac{\Delta S}{\beta}$ holds if and only if $\frac{\Delta S}{\beta} < \Delta E_{\mathrm{pass}}$. Since $\beta > 0$ and $\Delta E_{\mathrm{pass}} > 0$, multiplying both sides by $\frac{\beta}{\Delta E_{\mathrm{pass}}} > 0$ preserves the strict inequality and shows that $\frac{\Delta S}{\beta} < \Delta E_{\mathrm{pass}}$ holds if and only if $\frac{\Delta S}{\Delta E_{\mathrm{pass}}} < \beta$, i.e., $\beta_c(\Delta S, \Delta E_{\mathrm{pass}}) < \beta$. By the same rearrangement, $D_{\mathrm{freeze}} = 0 \iff \beta = \beta_c$ and $D_{\mathrm{freeze}} < 0 \iff \beta < \beta_c$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-qsl-zeno-literature title="Mandelstam–Tamm, Margolus–Levitin Dynamical Speed Limits, and the Misra–Sudarshan Zeno Theorem (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** In this chapter, [@thm-fubini-study-record-time] derives $\tau \ge \frac{\pi\hbar}{4\cdot\mathrm{energy}}$ and $N \le \frac{4\cdot\mathrm{energy}\cdot T}{\pi\hbar}$ in Lean 4 from the Fubini–Study spherical triangle inequality [`fs_angle_triangle`](lean:D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle) taking the single-leg displacement bound $\theta_{\mathrm{FS}}(a, m_k) \le \mathrm{energy}\cdot\tau/\hbar$ as an explicit hypothesis. We first derive the global displacement bound for autonomous pure-state evolution, then give the related classical references and the scope of the Zeno limit.

**Autonomous orbits: from two levels to arbitrary finite dimension.** The two-level orbit of [@ex-orthogonalization-times] already exposes the mechanism. In the energy basis, $A=\begin{pmatrix}0&0\\0&E\end{pmatrix}$; the initial state is an equal superposition, and evolution multiplies its second component by $e^{-iEt/\hbar}$. Removing the common phase generated by the mean energy $\mu=E/2$ leaves two components rotating with opposite phases and fluctuation $\Delta=E/2$. Until first orthogonality, the angle equals $\Delta t/\hbar$. Beyond it, $\arccos|\cos(Et/(2\hbar))|$ turns back while the distance travelled keeps increasing. A global speed bound controls the endpoint angle at every time; it does not require that angle to increase monotonically.

Now take any finite-dimensional complex inner-product space $E$, a self-adjoint continuous complex-linear operator $A:E\to E$, a unit initial state $\psi$, and $\hbar>0$. Here $E$ denotes the space, rather than the preceding example's energy gap. The inner product is linear in its second argument. Define the mean energy, centered fluctuation, and actual evolution for this same preparation by

$$
\begin{aligned}
\mu&=\operatorname{Re}\langle\psi,A\psi\rangle,\\
\Delta&=\norm{A\psi-(\mu:\mathbb C)\psi},\\
\psi_t&=\exp\!\left(\frac{-it}{\hbar}A\right)\psi
\qquad(t\in\mathbb R).
\end{aligned}
$$

Self-adjointness makes the energy expectation real, with $\Delta^2=\langle\psi,A^2\psi\rangle-\mu^2$. Thus $\Delta$ is the energy standard deviation of this Hamiltonian in this initial state, rather than an operator norm. The classical Mandelstam–Tamm angle bound is

$$
\arccos\bigl|\langle\psi,\psi_t\rangle\bigr|
\le \frac{|t|\Delta}{\hbar}
\qquad\text{for every }t\in\mathbb R.
$$

The projective angle here is precisely the arccosine of the overlap modulus, with no extra factor of $2$. See S. Deffner and S. Campbell, *Quantum speed limits: from Heisenberg's uncertainty principle to optimal quantum control*, J. Phys. A: Math. Theor. **50**, 453001 (2017), [arXiv:1705.08023v2](https://arxiv.org/abs/1705.08023v2), §2.5, Eqs. (23), (28)–(33), [DOI:10.1088/1751-8121/aa86c6](https://doi.org/10.1088/1751-8121/aa86c6). We spell out the autonomous pure-state case below, including its endpoints.

**Remove the phase that leaves the projective state unchanged.** Let $I$ be the identity operator and set

$$
\begin{aligned}
B&=A-\mu I,& G&=-iB/\hbar,\\
v(t)&=e^{tG}\psi,& w(t)&=v'(t)=Gv(t),\\
c&=\Delta/\hbar.&
\end{aligned}
$$

Since $B$ is self-adjoint and $G^*=-G$, $e^{tG}$ is unitary and commutes with $B$. Hence

$$
\begin{aligned}
\norm{v(t)}&=1,\\
\norm{w(t)}&=\norm{e^{tG}G\psi}=c,\\
\langle v(t),w(t)\rangle
&=-\frac{i}{\hbar}\langle\psi,B\psi\rangle=0.
\end{aligned}
$$

The last equality says that the velocity has no phase component along the state itself: the motion is horizontal. The first two say that it moves on the unit sphere at constant speed $c$.

**Project the velocity onto the real overlap.** Write $r(t)=\operatorname{Re}\langle\psi,v(t)\rangle$, so $-1\le r(t)\le1$ and $r(0)=1$. Regard the complex space as a real inner-product space. Subtracting the real projection along $v(t)$ leaves $\psi-r(t)v(t)$, with

$$
\norm{\psi-r(t)v(t)}^2=1-r(t)^2.
$$

Since $\langle v,w\rangle=0$, Cauchy–Schwarz gives

$$
\begin{aligned}
|r'(t)|
&=\bigl|\operatorname{Re}\langle\psi-r(t)v(t),w(t)\rangle\bigr|\\
&\le c\sqrt{1-r(t)^2}.
\end{aligned}
$$

**Integrate without excluding endpoints.** Differentiating $\arccos r$ directly would introduce a zero denominator at $r=\pm1$. Instead fix $0\le q<1$ and use $f_q(t)=\arccos(qr(t))$. Its denominator is everywhere strictly positive, and

$$
\begin{aligned}
|f_q'(t)|
&=\frac{q|r'(t)|}{\sqrt{1-q^2r(t)^2}}\\
&\le c\frac{q\sqrt{1-r(t)^2}}{\sqrt{1-q^2r(t)^2}}
\le c.
\end{aligned}
$$

The last step uses $q^2(1-r^2)\le1-q^2r^2$, equivalently $q^2\le1$. The mean value theorem between $0$ and any real $t$ yields

$$
|f_q(t)-f_q(0)|\le c|t|,
\qquad f_q(0)=\arccos q.
$$

Take $q=n/(n+1)$ for $n\in\mathbb N$ and let $n\to\infty$. Continuity of $\arccos$ on the closed interval $[-1,1]$ gives $\arccos r(t)\le c|t|$. No division at a sphere endpoint occurs, and no displacement bound has been assumed in deriving it.

**Restore the actual Hamiltonian evolution.** Since $A=B+\mu I$,

$$
\begin{aligned}
\psi_t&=e^{-i\mu t/\hbar}v(t),\\
r(t)&\le|\langle\psi,v(t)\rangle|
=|\langle\psi,\psi_t\rangle|.
\end{aligned}
$$

The scalar phase has modulus $1$. The decreasing nature of $\arccos$ now gives the claimed global bound. It includes $t=0$, negative times, arbitrarily large real times, and overlap modulus $0$ or $1$. The left side always lies in $[0,\pi/2]$; at long times the right side may exceed $\pi/2$, with no need to truncate the time domain. If $\Delta=0$, then $B\psi=0$ and $v(t)=\psi$: actual evolution changes only the common phase, the projective angle stays zero, and orthogonality is impossible. If $\Delta>0$ and orthogonality is reached after a nonnegative physical duration $\tau_\perp$, then

$$
\tau_\perp\ge\frac{\pi\hbar}{2\Delta}.
$$

**Connecting to the conditional record-time theorem.** [@thm-fubini-study-record-time] needs two displacement bounds from the same unit anchor $a$ to orthogonal endpoints $m_0,m_1$. One sufficient realization specifies, for each $k=0,1$, an autonomous self-adjoint Hamiltonian $A_k$ on the finite-dimensional space, evolving from the same preparation $a$ to $m_k$ at time $t_k$, up to a scalar phase of modulus one, with

$$
\begin{aligned}
\mu_k&=\operatorname{Re}\langle a,A_ka\rangle,\\
\Delta_k&=\norm{A_ka-\mu_k a}\le\mathrm{energy},\\
|t_k|&\le\tau,\qquad \mathrm{energy}>0.
\end{aligned}
$$

The bound in this remark then gives $\theta_{\mathrm{FS}}(a,m_k)\le\mathrm{energy}\cdot\tau/\hbar$ for each endpoint. Only with actual orthogonality of the two endpoints does the conditional theorem yield $\tau\ge\pi\hbar/(4\cdot\mathrm{energy})$. Using matching symbols in two formulas, or merely choosing a geometric midpoint, cannot supply the trajectories, preparation, and common resource bound. The equal-weight two-level orbit above supplies a particular realization: take its temporal midpoint as anchor, with the two endpoints on opposite half-orbits and $\tau=\tau_\perp/2$. The half-orbit factor $\pi/4$ is thus consistent with the full-orbit factor $\pi/2$.

Counting records independently requires the total contact budget $\sum_i\tau(i)\le T$. When sequential, nonoverlapping contact intervals justify that physical budget, their timing must be checked separately; the angle bound does not establish it. The result here is a literature speed bound for the specified finite-dimensional autonomous Hamiltonian, with no claim for arbitrary open, driven, or unbounded dynamics or for a universal clock tick. The full monitored first-return mean is given separately by [@prob-monitored-spectral-mean] for the finite-dimensional unitary pure-state protocol. Its spectral counting and operator-summation proof establish neither this dynamical speed bound nor the physical contact budget.

1. **Mandelstam–Tamm energy-variance speed limit (L. Mandelstam & I. Tamm, 1945)**: *The uncertainty relation between energy and time in non-relativistic quantum mechanics* (J. Phys. USSR **9**, 249–254, 1945) and the projective formulation of Anandan and Aharonov (Phys. Rev. Lett. **65**, 1697, 1990) provide the classical background to the derivation above. The orbit has path-length speed $\Delta H/\hbar$. A general orbit need not follow a geodesic, but its endpoint geodesic angle cannot exceed its length. The exact locator in the Deffner–Campbell review appears above.
2. **Margolus–Levitin mean-energy speed limit (N. Margolus & L. B. Levitin, 1998)**: In *The maximum speed of dynamical evolution* (Physica D **120**, 188–195, 1998), bounding the spectral expansion via $\cos x \ge 1 - \frac{2}{\pi}(x + \sin x)$ shows that the mean energy $\langle H\rangle$ above the ground state $E_0 = 0$ imposes the complementary bound
   $$
   \tau_\perp \ge \frac{\pi\hbar}{2\,\langle H\rangle}.
   $$
3. **Misra–Sudarshan dynamical quantum Zeno theorem (B. Misra & E. C. G. Sudarshan, 1977)**: In the bounded special case of finite dimensions (or bounded self-adjoint $H$) with an orthogonal projection $P$, the stroboscopic limit takes the strong form $\lim_{N\to\infty} (P e^{-iHT/\hbar N} P)^N = P e^{-i(PHP)T/\hbar} P$, halting transitions into $I-P$ in that special case. Unbounded Hamiltonians require additional domain, semiboundedness, and strong-limit hypotheses; finite energy expectation alone does not establish the general formula.

These dynamical path-integral bounds and strong-operator limits are cited from the physics literature and are not claimed in the book's Lean verification ledger.
:::

We have now seen the first half of time's duality: as long as the exterior bivector area $\vv{A}\wedge\vv{B}$ rotates unitarily, quantum time is reversible; the moment an observer projects onto an idempotent line $P$ to record a classical tick, that transverse area is flattened onto the diagonal.

One urgent question remains: **where does the flattened two-dimensional coherence area go, and why does writing down classical ticks give birth to an irreversible thermodynamic arrow of time?** Turn to the closing chapter of Part II — [Chapter 8](ch08-erasure-and-time-arrows.md).
