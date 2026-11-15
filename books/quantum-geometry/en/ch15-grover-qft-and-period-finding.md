# Chapter 15 Invariant-Plane Rotations and Equatorial Area Gears: Grover Search, QFT, and Shor Factoring {#invariant-plane-rotations-and-equatorial-area-gears-grover-search-qft-and-shor-factoring}

> *"The core is how isotropy lets us reach another point through orthogonal relations: one orthogonal step, then two, because the three directions are pairwise orthogonal."*

In [Chapter 13](ch13-entanglement-and-chsh.md) and [Chapter 14](ch14-cloning-codes-and-braids.md), we saw how higher-dimensional spheres store and shield quantum information. Now we confront the central question of quantum algorithms: **how do unitary operations navigate an exponentially large state space to find targets and hidden periods faster than classical search?**

When stripped of circuit notation, the two flagship families of quantum algorithms — **Grover amplitude amplification** and **Quantum Fourier Transform (QFT) period finding in Shor's algorithm** — embody the two geometric mechanisms pointed to in our opening epigraph:

- **Grover search composes two reflections into an invariant-plane rotation**: Inside an isotropic $l$-dimensional search space, the prepared state and the target projection span a common two-dimensional block plane; reflecting first across the orthogonal complement of the target subspace ("one orthogonal step") and then across the prepared subspace ("two orthogonal steps") rotates the state vector by $2\theta$ straight toward the target!
- **QFT and period finding harness character orthogonality across binary phase gears**: Conjugating Weyl shift and clock operators kicks back symplectic phases that wind binary equatorial gears; in the finite cyclic group $\mathrm{ZMod}\,m$ ($m>0$), applying the QFT to a normalized uniform superposition over the position subgroup $H$ sums characters over $H$: the phase arrows at non-resonant frequencies form closed chains and cancel to zero, while the resonant frequencies in the dual annihilator $H^\perp$ add in phase to reveal the hidden period! The dual-sum proposition below runs in the reverse direction, summing over $H^\perp$ with nonzero values only on $H$.

::: {.figure src="ch15-overview"}
**Figure 15.** The chapter at a glance. Panel I: for $N = 4$, one Grover step turns the arrow $U$ through the violet $2\theta = 60^\circ$, and the amber $QU$ lands exactly on the success direction $W$. Panel II: the three phase gears for $x = 5 = (101)_2$, with $2$, $4$ and $8$ teeth; their amber pointers sit at $\pi$, $\pi/2$ and $5\pi/4$. Panel III: after the QFT of the $Q = 16$, $r = 4$ period state, only $k = 0, 4, 8, 12$ keep a cyan bar, each of height $1/4$.
:::

## 15.1 Grover: The Common Invariant Plane of Two Reflections {#sec-grover-invariant-plane}

Suppose we search for marked items inside an $l$-dimensional space. Whereas a classical search inspects candidates one by one, a quantum algorithm distributes unit $\ell^2$ norm across the search space from the start (note that unit normalization for quantum column vectors is always the Euclidean/Hilbert $\ell^2$ norm $\sum_i |\psi_i|^2 = 1$, never the $\sup$ norm on function spaces).

To unify single-state Grover search with multi-column subspace amplification, the source module `CoherentUniformAmplification` formulates amplitude amplification in block-matrix terms. Let $s$ (source indices) and $l$ (ambient search-space indices) be finite index types with decidable equality:

- $J \in M_{l \times s}(\mathbb{C})$ is an isometric source embedding ($J^* J = I_s$);
- $C \in M_{l \times l}(\mathbb{C})$ is a unitary preparation matrix ($C^* C = I_l$), forming the prepared isometry $U = C J \in M_{l \times s}(\mathbb{C})$;
- $P \in M_{l \times l}(\mathbb{C})$ is a Hermitian idempotent target projector ($P^* = P$, $P^2 = P$).

The uniform success condition requires the projected block $P(CJ)$ to have scalar Gram matrix $p I_s$ for some $p \in (0, 1]$:

$$
\bigl(P(CJ)\bigr)^* \bigl(P(CJ)\bigr) = (p : \mathbb{C}) \bullet I_s \qquad (0 < p \le 1).
$$

Under this condition, we define the normalized success block $W$, the normalized failure block $B$, the amplification iterate $\mathrm{iterate}(U, P)$ (the product of the target reflection $I_l - 2P$ and the source reflection $2 U U^* - I_l$), and the initial angle $\theta$:

$$
\begin{aligned}
W &= \mathrm{success}(U, P, p) = (\sqrt{p})^{-1}\,P U, &\qquad
B &= \mathrm{failure}(U, P, p) = (\sqrt{1 - p})^{-1}\,(I_l - P) U, \\
\mathrm{iterate}(U, P) &= (2 U U^* - I_l)(I_l - 2P), &\qquad
\theta &= \arcsin(\sqrt{p}).
\end{aligned}
$$

The following theorem establishes that for every $n \in \mathbb{N}$ — and under arbitrary Kronecker tensoring with any reference matrix $R$ — the $n$-step state remains locked inside the $\{W, B\}$ plane at angle $(2n + 1)\theta$.

::: {.figure src="ch15-two-reflections"}
**Two mirrors make one turn.** For $N = 8$ the ink arrow $U$ makes the angle $\theta$ with the failure direction $B$. The first mirror is the $B$ axis ($I - 2P$): it flips $U$ down to the grey dashed arrow. The second mirror is the line of $U$ ($2UU^* - I$): it flips that arrow back up to the amber $QU$. After both flips the arrow has turned through the violet $2\theta$; see [@thm-grover-uniform-rotation].
:::

::: {.theorem #thm-grover-uniform-rotation title="Uniform Operator Rotation in Coherent Amplitude Amplification" lean="D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation"}
Let $s, l$ be finite index types with decidable equality, and let $J \in M_{l \times s}(\mathbb{C})$, $C, P \in M_{l \times l}(\mathbb{C})$, and $p \in \mathbb{R}$ satisfy

$$
J^* J = 1, \quad C^* C = 1, \quad P^* = P, \quad P^2 = P, \quad
\bigl(P(CJ)\bigr)^* \bigl(P(CJ)\bigr) = (p : \mathbb{C}) \bullet (1 : M_s(\mathbb{C})), \quad 0 < p \le 1.
$$

Let

$$
U := C J, \qquad W := \mathrm{success}(U, P, p), \qquad B := \mathrm{failure}(U, P, p), \qquad \theta := \arcsin(\sqrt{p}).
$$

If $p = 1$, then $U = W$; otherwise ($0 < p < 1$), all of the following hold:

1. **Orthonormality of the success and failure blocks**:

   $$
   W^* W = 1, \qquad B^* B = 1, \qquad W^* B = 0;
   $$

2. **Exact $n$-step rotation formula and Kronecker reference invariance**: for every $n \in \mathbb{N}$,

   $$
   \mathrm{iterate}(U, P)^n \cdot U = \bigl(\sin((2n + 1)\theta) : \mathbb{C}\bigr) \bullet W + \bigl(\cos((2n + 1)\theta) : \mathbb{C}\bigr) \bullet B,
   $$

   and for every type $z$ and every complex matrix $R \in M_z(\mathbb{C})$,

   $$
   \bigl(\mathrm{iterate}(U, P)^n \cdot U\bigr) \otimes_{\mathrm{K}} R = \bigl(\sin((2n + 1)\theta) : \mathbb{C}\bigr) \bullet (W \otimes_{\mathrm{K}} R) + \bigl(\cos((2n + 1)\theta) : \mathbb{C}\bigr) \bullet (B \otimes_{\mathrm{K}} R).
   $$
:::

::: proof
If $p = 1$, then $W = P U$ and the failure block $(I_l - P)U$ has Gram matrix $U^*(I_l - P)U = I_s - I_s = 0$, forcing $(I_l - P)U = 0$ and $U = P U = W$.

When $0 < p < 1$, both $\sqrt{p} > 0$ and $\sqrt{1 - p} > 0$. From $(PU)^*(PU) = p I_s$ we obtain $W^* W = I_s$; from $U^* U = I_s$ and $P^* = P = P^2$ we obtain $((I_l - P)U)^*((I_l - P)U) = (1 - p)I_s$, hence $B^* B = I_s$; and $P(I_l - P) = 0$ gives $W^* B = 0$ (claim 1).

At $n = 0$, $U = P U + (I_l - P)U = \sin\theta\,W + \cos\theta\,B$. Because $P W = W$ and $P B = 0$, the first reflection $(I_l - 2P)$ maps $W \mapsto -W$ and $B \mapsto B$; using $U^* W = \sin\theta\,I_s$ and $U^* B = \cos\theta\,I_s$, the second reflection $(2U U^* - I_l)$ combines with the first so that $Q = \mathrm{iterate}(U, P)$ acts on $\{W, B\}$ by a $2\theta$ rotation:

$$
Q W = \cos(2\theta)\,W - \sin(2\theta)\,B, \qquad Q B = \sin(2\theta)\,W + \cos(2\theta)\,B.
$$

Induction on $n \in \mathbb{N}$ using the angle-addition formulas for $\sin((2n+1)\theta + 2\theta)$ and $\cos((2n+1)\theta + 2\theta)$ proves the $n$-step rotation formula, and bilinearity of $\otimes_{\mathrm{K}}$ yields the tensored identity with $R$ (claim 2). The full proof is checked by the Lean kernel.
:::

Three boundaries in [@thm-grover-uniform-rotation] must be kept explicit (Figure 15, Panel I):

1. **Retaining the $p = 1$ branch**: Because $B$ divides by $\sqrt{1 - p}$, the case $p = 1$ is handled by the explicit branch $U = W$, while for $0 < p < 1$ the $n = 0$ case recovers $U = \sin\theta\,W + \cos\theta\,B$.
2. **Column-wise two-dimensional planes for general $s$**: When $|s| = 1$, $W$ and $B$ are two orthonormal vectors spanning a single $2$-dimensional plane. When $|s| > 1$, each source column $j \in s$ spans its own $2$-dimensional plane $\operatorname{span}\{W_{\cdot, j}, B_{\cdot, j}\}$ orthogonal to the planes of all other columns, and all $|s|$ planes rotate in lockstep by $2\theta$ (rather than confining the entire multi-column operator to a single $2$-dimensional Hilbert space).
3. **Discrete integer-step overshoot**: Because $n \in \mathbb{N}$ is an integer, $(2n + 1)\theta$ steps discretely. For small $p = 1/N$, choosing $n \approx \frac{\pi}{4}\sqrt{N}$ brings $(2n + 1)\theta$ close to $\pi/2$, but except for special angles such as $p = 1/4$ ($\theta = \pi/6, n = 1$), standard integer-step Grover iteration cannot hit $\sin((2n + 1)\theta) = 1$ exactly for arbitrary $N$.

::: {.viz src="grover-reflections" preset="sqrt" height="500"}
**About $\frac{\pi}{4}\sqrt{N}$ steps to the top.** At $N = 256$ each step turns only $2\theta \approx 7.17^\circ$; twelve small violet arcs carry the amber arrow from $3.6^\circ$ to $89.6^\circ$, success $0.99995$. Twelve is the first-peak step count, next to $\frac{\pi}{4}\sqrt{256} \approx 12.57$.
:::

Whole steps can only approach $\pi/2$: take one more step than the best count and the arrow turns past the target.

::: {.viz src="grover-reflections" preset="over" height="500"}
**Whole steps overshoot.** One more step at $N = 8$: the arrow turns to $7\theta \approx 144.9^\circ$, the cyan shadow shrinks back to $0.575$ and the success probability falls from $0.945$ to $0.330$; the bars on the right rise and then fall, with bar $2$ the highest.
:::

An exact coin-assisted remedy for known $p$ is proved in [Chapter 16](ch16-qsvt-walks-and-compilation.md), [@cor-exact-source-query-count].

::: {.viz src="grover-reflections" height="560"}
The full lab of Grover's two reflections: drag the initial state on mirror 2 to change $\theta$, change $N$, and apply the mirrors one at a time with ← →; the bars on the right are the success probabilities $\sin^2((2n+1)\theta)$ after each step ([@thm-grover-uniform-rotation]). The $\Omega(\sqrt{N})$ query lower bound is a literature result, not formalized in this book.
:::

## 15.2 Phase Kickback and the Binary Gears of the QFT {#sec-qft-phase-gears}

Whereas Grover's algorithm rotates states in a real two-dimensional plane, the Quantum Fourier Transform (QFT) and phase estimation wind relative phases around equatorial circles like meshed binary gears (Figure 15, Panel II).

::: {.viz src="phase-gears" preset="basis" height="500"}
**A row of gears, each half as fast.** $Q = 8$ with the single cell $x = 5$: each cell along the rail turns the three violet gears by $\frac{1}{2}$, $\frac{1}{4}$ and $\frac{1}{8}$ of a turn, and at $5$ they rest at $\pi$, $\frac{\pi}{2}$ and $\frac{5\pi}{4}$; frequency $k = 7$ uses all three, and the one cyan arrow of the chain points at their sum, $\frac{3\pi}{4}$. The spectrum is flat, every bar $\frac{1}{8}$. The actual circuit's positive-exponent action is given by [@thm-qft-circuit-action]; these animated gears illustrate its label convention.
:::

At the algebraic foundation of phase kickback lies the conjugation law of discrete Weyl shift and clock operators on $\mathrm{ZMod}\,M$ ($M \in \mathbb{N}$ with `[NeZero M]`). In `WeylDisplacementConjugation`, with $\omega_M = \mathrm{windowRoot}(M) = \exp(2\pi i / M)$, the $M \times M$ building blocks on $M_{\mathrm{Fin}\,M}(\mathbb{C})$ are:

- **The diagonal clock matrix** $\mathrm{clockMatrix}(M) = \operatorname{diag}\bigl(j \mapsto \omega_M^{j.\mathrm{val}}\bigr)$;
- **The cyclic shift matrix** $\mathrm{shiftMatrix}(M) = \mathrm{circulant}\bigl(i \mapsto \text{if } i = 1 \text{ then } 1 \text{ else } 0\bigr)$, acting on column vectors by $(X\psi)_i = \psi_{i - 1}$;
- **The Weyl displacement operator** $\mathrm{displacement}(M, e, f) = \mathrm{shiftMatrix}(M)^{e.\mathrm{val}} \cdot \mathrm{clockMatrix}(M)^{f.\mathrm{val}}$ ($e, f \in \mathrm{ZMod}\,M$).

Conjugating one displacement operator $D(c, d)$ by another $D(a, b)$ kicks back a symplectic root-of-unity phase, as proved in the next lemma.

::: {.lemma #lemma-phase-kickback-weyl title="Weyl Displacement Conjugation and Phase Kickback" lean="D5/S3/Quantum/Algebra/WeylDisplacementConjugation.displacement_conjugation"}
Let $M \in \mathbb{N}$ with `[NeZero M]`. For all $a, b, c, d \in \mathrm{ZMod}\,M$,

$$
\begin{aligned}
&\mathrm{displacement}(M, a, b) \cdot \mathrm{displacement}(M, c, d) \cdot \mathrm{star}\bigl(\mathrm{displacement}(M, a, b)\bigr) \\
&= \mathrm{windowRoot}(M)^{(b \cdot c - a \cdot d).\mathrm{val}} \bullet \mathrm{displacement}(M, c, d).
\end{aligned}
$$
:::

::: proof
Write $X = \mathrm{shiftMatrix}(M)$ and $Z = \mathrm{clockMatrix}(M)$. Unitarity of $X$ and $Z$ implies $D(a, b) \cdot \mathrm{star}(D(a, b)) = I_M$. Commuting $X^{c.\mathrm{val}} Z^{d.\mathrm{val}}$ past $Z^{b.\mathrm{val}}$ and $X^{a.\mathrm{val}}$ via $Z^b X^c = \omega_M^{(b \cdot c).\mathrm{val}} X^c Z^b$ and $X^a Z^d = \omega_M^{(-a \cdot d).\mathrm{val}} Z^d X^a$ accumulates the net phase $\omega_M^{(b \cdot c - a \cdot d).\mathrm{val}}$, while the remaining $D(a, b) \cdot \mathrm{star}(D(a, b))$ cancels to $I_M$. The full proof is checked by the Lean kernel.
:::


::: {.figure src="ch15-weyl-area"}
**Conjugation leaves only a phase, set by the area the two displacements span.** Take $M = 8$. On the left is the lattice $\mathrm{ZMod}\,8 \times \mathrm{ZMod}\,8$, horizontally the number of shifts $a$, vertically the number of clock steps $b$; the two cyan arrows $(a, b) = (2, 1)$ and $(c, d) = (1, 3)$ span a magenta parallelogram of oriented area $ad - bc = 5$. On the right is a phase clock with $8$ positions; the amber hand rests on $\omega_8^{3}$, since $bc - ad = -5 \equiv 3 \pmod 8$ ([@lemma-phase-kickback-weyl]). Reading the exponent as minus the oriented area is only a geometric reading of the determinant $bc - ad$; the position of the hand is checked directly with $8 \times 8$ matrices.
:::
Three details of [@lemma-phase-kickback-weyl] should be noted:

1. **Subtraction in $\mathrm{ZMod}\,M$ precedes `.val`**: The exponent $(b \cdot c - a \cdot d).\mathrm{val}$ is computed by subtracting $a \cdot d$ from $b \cdot c$ inside $\mathrm{ZMod}\,M$ first and then taking its natural-number representative `.val` in $\{0, \dots, M-1\}$.
2. **Conjugate transpose `star` and the positive phase convention**: Here `star` is the conjugate transpose $(\cdot)^*$, and the positive sign in $\omega_M^{(bc - ad).\mathrm{val}}$ matches $\omega_M = \exp(+2\pi i / M)$, the shift action $(X\psi)_i = \psi_{i-1}$, and the operator order $X^e Z^f$.
3. **Scope**: [@lemma-phase-kickback-weyl] gives the algebraic phase kickback of finite Weyl conjugation. The actual multi-qubit QFT action and native event counts are supplied separately by [@thm-qft-circuit-action] and [@thm-qft-native-event-count]; they do not follow directly from the Weyl conjugation formula.

Turning the gears into a circuit equality requires fixing both instruction order and binary labels. We use the actual recursive `QuantumAlg.QuantumFourierTransform.Source.circuit`: each layer executes a leading Hadamard, its ordered controlled-phase prefix, and the embedded recursive tail, followed by the terminal disjoint bit-reversal SWAP network. `onBinaryLabels` identifies its execution matrix with integer labels $0,\ldots,2^q-1$ in big-endian order, with the most significant bit first.

::: {.theorem #thm-qft-circuit-action title="Exact action of the actual QFT circuit on every complex vector" lean="D5/S3/Quantum/FourierCircuit/Correctness.circuit_action"}
For every $\operatorname{oracles}:\operatorname{OracleModel}$, every natural width $q$, every interpretation $\operatorname{environment}:\operatorname{oracles.Interpretation}$, and every complex vector $v:\mathrm{Fin}(2^q)\to\mathbb C$, let $U$ be the execution matrix of the circuit above under `onBinaryLabels`. Then

$$
\begin{aligned}
U v&=\mathcal F_+(v),\\
(\mathcal F_+(v))(k)&=\frac{1}{\sqrt{2^q}}
\sum_{x\in\mathrm{Fin}(2^q)}e^{+2\pi i k.\operatorname{val}\,x.\operatorname{val}/2^q}v(x)
\quad(k\in\mathrm{Fin}(2^q)).
\end{aligned}
$$

This is exact equality of complex vectors, including global phase. Neither normalization of $v$ nor $q>0$ is required.
:::

::: proof
Width induction computes the entries of the actual circuit before the terminal swaps, with the output label bit reversed. The terminal SWAP network cancels this reversal. The resulting entries are the positive Fourier kernel times $1/\sqrt{2^q}$; summing over input coordinates gives the equality on every vector. The full proof is checked by the Lean kernel.
:::

Execution and accounting observe the same `circuit`; an abstract Fourier operator alone does not supply circuit costs. Write $\delta(g,e)=1$ when the native gate event $g$ equals $e$, and $0$ otherwise.

::: {.theorem #thm-qft-native-event-count title="Every native event count of the same QFT circuit" lean="D5/S3/Quantum/FourierCircuit/Primitives/QFT/Source/Resources.qftSource_circuit_event_count"}
For every $\operatorname{oracles}:\operatorname{OracleModel}$, every event $e:\operatorname{Resource.Event}(\operatorname{quantum}(\operatorname{FourierGate.model},\operatorname{oracles}))$, and every $q\in\mathbb N$, the `eventCost` of the circuit $\operatorname{circuit}(\operatorname{oracles},q)$ above satisfies

$$
\begin{aligned}
\operatorname{count}(e,\operatorname{eventCost})
&=q\,\delta(H,e)+\binom q2\delta(\operatorname{controlledPhase},e)\\
&\quad+\lfloor q/2\rfloor\,\delta(\operatorname{SWAP},e).
\end{aligned}
$$

Here $H$, $\operatorname{controlledPhase}$, and $\operatorname{SWAP}$ denote their native gate events. Their occurrence counts are respectively $q$, $\binom q2$, and $\lfloor q/2\rfloor$. Every other event, including oracle events, has count zero; at $q=0$ all counts are zero.
:::

::: proof
Each actual layer contributes one Hadamard and the controlled phases in its specified prefix. Embedding the tail preserves its event counts; width induction accumulates $q$ and $\binom q2$. The terminal reversal contains $\lfloor q/2\rfloor$ SWAPs. Sequential composition gives the formula for every event coordinate. The full proof is checked by the Lean kernel.
:::

At $q=3$ there are $3$ Hadamards, $3$ controlled phases, and $1$ SWAP: $7$ ideal native occurrences. At $q=0$ the one-coordinate transform is the identity and uses no gates. These counts exclude input loading, full classical coefficient readout, synthesis over a finite discrete gate set, and hardware costs. The later three-qubit product formula explains this big-endian, positive-exponent convention by hand; it does not certify every geometric tensor identity or interactive behavior on the page.

The actual recursive circuit proofs and event counts are supplied by QudeLeap Team's [Lean-QuantumAlg, fixed revision](https://github.com/QudeLeap/Lean-QuantumAlg/tree/971dc8be8a153a116b6d7cd748f984d545861b00); the transplanted source retains its Apache 2.0 license and attribution. Source audit [#30752](https://github.com/the-omega-institute/trureturing/issues/30752) still has three validated, seven unresolved, and fifty-six incomplete items. These two citations do not settle the remaining supplier-library audit.

## 15.3 Finite Character Orthogonality and Nonresonant Cancellation {#sec-period-frequency-cancellation}

Once a periodic subgroup $H \le \mathrm{ZMod}\,m$ ($m \in \mathbb{N}$ with `[NeZero m]`) has been imprinted into a quantum register, why does a Fourier transform annihilate every non-resonant frequency?

The mechanism is **finite character orthogonality** (Figure 15, Panel III). In `D5/S3/Fourier/FinitePoisson.lean`, for each frequency $k \in \mathrm{ZMod}\,m$, the additive character is `character k = ZMod.stdAddChar.mulShift k`, given explicitly by

$$
\mathrm{character}(k)(x) = \chi_k(x) = \exp\Bigl(+\frac{2\pi i k x}{m}\Bigr) \qquad (x \in \mathrm{ZMod}\,m).
$$

For any additive subgroup $H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$, its **annihilator subgroup (dual resonant lattice)** is

$$
\mathrm{annihilator}(H) = H^\perp = \bigl\{k \in \mathrm{ZMod}\,m \;\big|\; \forall h \in H,\; \mathrm{character}(k)(h) = 1\bigr\}.
$$

Summing $\mathrm{character}(k.1)(x)$ over all $k \in \mathrm{annihilator}(H)$ yields exact constructive alignment on $H$ and exact destructive cancellation outside $H$.

::: {.proposition #prop-finite-character-cancellation title="Character Sum Orthogonality over the Annihilator Subgroup" lean="D5/S3/Fourier/FinitePoisson.sum_annihilator_character"}
Let $m \in \mathbb{N}$ with `[NeZero m]`, let $H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$ be an additive subgroup, and let $x \in \mathrm{ZMod}\,m$. Then

$$
\sum_{k : \mathrm{annihilator}(H)} \mathrm{character}(k.1)(x) = \begin{cases} \bigl(\mathrm{Fintype.card}(\mathrm{annihilator}(H)) : \mathbb{C}\bigr) & \text{if } x \in H, \\ 0 & \text{if } x \notin H. \end{cases}
$$
:::

::: proof
If $x \in H$, then $\mathrm{character}(k.1)(x) = 1$ for every $k \in \mathrm{annihilator}(H)$ by definition, so the sum of $1$ over $\mathrm{annihilator}(H)$ equals $(\mathrm{Fintype.card}(\mathrm{annihilator}(H)) : \mathbb{C})$. If $x \notin H$, Pontryagin duality for the finite cyclic group $\mathrm{ZMod}\,m$ provides $k_0 \in \mathrm{annihilator}(H)$ with $\mathrm{character}(k_0.1)(x) \neq 1$. Reindexing the finite sum by the translation bijection $k \mapsto k + k_0$ on $\mathrm{annihilator}(H)$ gives $\mathrm{character}(k_0.1)(x) \cdot S = S$, hence $(\mathrm{character}(k_0.1)(x) - 1)S = 0$ and $S = 0$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="phase-gears" preset="cancel" height="500"}
**Off-resonant arrows go round in a loop.** $Q = 16$, comb $\{0, 4, 8, 12\}$, $k = 1$: only the slowest gear is lit, and the four cyan arrows $1$, $i$, $-1$, $-i$ close into a square and return to the start; bar $1$ of the spectrum grows during the sweep and shrinks back to $0$ at the end ([@prop-finite-character-cancellation]).
:::

Note the normalization boundary in [@prop-finite-character-cancellation]: for $x \in H$, the sum equals the **unnormalized** cardinality $|\mathrm{annihilator}(H)|$, which cannot be read directly as probability $1$. The summation index here is $k \in H^\perp$: if the input is the normalized uniform superposition over the annihilator $H^\perp$, divide by the state normalization factor $\sqrt{|H^\perp|}$ and the unitary QFT factor $\sqrt{m}$ to obtain amplitude $\frac{|H^\perp|}{\sqrt{|H^\perp|}\sqrt{m}} = \frac{1}{\sqrt{|H|}}$ at each $x \in H$, and zero outside $H$, using $|H|\,|H^\perp| = m$. The Born probability is the squared modulus of the amplitude, so each position in $H$ has probability $1/|H|$, all others have zero, and the total is $1$. The adjacent lab cards run in the reverse direction: the input is uniform over the position subgroup $H$, so its state normalization factor is $\sqrt{|H|}$; the QFT then gives amplitude $1/\sqrt{|H^\perp|}$ and probability $1/|H^\perp|$ at each frequency in $H^\perp$.

::: {.viz src="phase-gears" preset="four" height="500"}
**Period 4 leaves four peaks.** $Q = 16$, comb $\{0, 4, 8, 12\}$: following $k = 4$, all four cyan arrows point right and the chain has length $4$, an unnormalized sum and not a probability $1$; after the sweep only the four bars at $0$, $4$, $8$ and $12$ remain, each $\frac{1}{4}$, right on the magenta marks $sQ/r$, and the other twelve are $0$.
:::

## 15.4 Finite Period Sampling and Order Reconstruction in Shor’s Algorithm {#sec-shor-order-reconstruction}

Applying [@prop-finite-character-cancellation] to an arbitrary function $f : \mathrm{ZMod}\,m \to \mathbb{C}$ yields the **finite Poisson summation formula**.

Be careful to note the exact Fourier convention used by Mathlib's `ZMod.dft` in the source file: `ZMod.dft f` is the **unnormalized, negative-exponent** discrete Fourier transform

$$
(\mathrm{ZMod.dft}\,f)(k) = \sum_{x \in \mathrm{ZMod}\,m} \exp\Bigl(-\frac{2\pi i x k}{m}\Bigr)\,f(x) = \sum_{x \in \mathrm{ZMod}\,m} \mathrm{character}(-k)(x)\,f(x).
$$

One must never silently replace `ZMod.dft` with the physics convention $\mathcal{F}_+(f)(k) = \frac{1}{\sqrt{m}}\sum_x \exp(+2\pi i k x / m)f(x)$ without accounting for the $1/\sqrt{m}$ factor and the sign reversal $k \leftrightarrow -k$ (though because $\mathrm{annihilator}(H)$ is an additive subgroup, $k \in \mathrm{annihilator}(H) \iff -k \in \mathrm{annihilator}(H)$, leaving the sum over $\mathrm{annihilator}(H)$ invariant).

::: {.corollary #cor-finite-poisson-period title="Finite Poisson Summation over an Additive Subgroup of ZMod m" lean="D5/S3/Fourier/FinitePoisson.finite_poisson_summation"}
Let $m \in \mathbb{N}$ with `[NeZero m]`, let $H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$ be an additive subgroup, and let $f : \mathrm{ZMod}\,m \to \mathbb{C}$ be any complex-valued function. Then

$$
\sum_{h : H} f(h.1) = \frac{(\mathrm{Fintype.card}\,H : \mathbb{C})}{(m : \mathbb{C})} \cdot \sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1.
$$
:::

::: proof
Expanding `ZMod.dft` on the right-hand side and interchanging the finite sums over $k \in \mathrm{annihilator}(H)$ and $x \in \mathrm{ZMod}\,m$ gives

$$
\sum_{k : \mathrm{annihilator}(H)} \mathrm{ZMod.dft}\,f\,k.1
= \sum_{x \in \mathrm{ZMod}\,m} f(x) \sum_{k : \mathrm{annihilator}(H)} \mathrm{character}(-k.1)(x).
$$

Since negation $k \mapsto -k$ is a bijection on the subgroup $\mathrm{annihilator}(H)$, [@prop-finite-character-cancellation] reduces the inner sum to $|\mathrm{annihilator}(H)|$ for $x \in H$ and $0$ for $x \notin H$. Multiplying by $\frac{|H|}{m}$ and using the cardinality identity $|H| \cdot |\mathrm{annihilator}(H)| = m$ cancels the prefactor to $1$, leaving $\sum_{h : H} f(h.1)$. The full proof is checked by the Lean kernel.
:::


In the example with $m = 32$ and period $r = 8$, the comb of positions $H = \{0, 8, 16, 24\}$ has only $4$ cells, while the annihilator $H^\perp = \{0, 4, 8, \dots, 28\}$ has $8$ frequencies, spaced $m/r = 4$ apart.

::: {.viz src="phase-gears" preset="dual" height="500"}
**The peaks are $Q/r$ apart, not $r$.** $Q = 32$ and period $r = 8$: the cyan comb $H = \{0, 8, 16, 24\}$ on the register has only $4$ cells, $8$ apart; after the sweep the spectrum keeps $8$ equal bars, each $\frac{1}{8}$, at $0, 4, 8, \dots, 28$, exactly the $8$ frequencies of $H^\perp$, spaced $Q/r = 4$ apart. At $k = 4$ the four cyan arrows all point right and the chain has length $4$; $\lvert H\rvert \cdot \lvert H^\perp\rvert = 4 \cdot 8 = 32$ ([@cor-finite-poisson-period]). In the example, $Q = 16$ and $r = 4$ happen to give $r = Q/r = 4$, so the two combs coincide.
:::
::: {.remark #rem-shor-divisibility-boundary-literature title="Boundaries between finite Poisson summation, conditional candidates, and the full Shor algorithm"}
**Scope.** To connect [@cor-finite-poisson-period] to Shor's algorithm, first distinguish two boundaries, then derive the counting-register distribution from the actual input when the period need not divide the register size. The exact marginal, normalization, and pointwise bound are stated next with their frozen declarations; the derivation below explains those statements, while the full algorithmic claims remain in [@rem-grover-qft-shor-literature].

1. **Finite Poisson summation is not the full Shor factoring theorem**: [@cor-finite-poisson-period] is an algebraic identity on $\mathrm{ZMod}\,m$, not a formalization of Shor's full success probability, continued-fraction recovery theorem, or polynomial gate complexity. Conditional candidate membership is supplied separately by [@thm-shor-nearest-candidate] and [@thm-shor-coprime-candidate]; the full algorithmic boundaries remain in [@rem-grover-qft-shor-literature].
2. **Exact divisibility ($r \mid Q$) versus general non-divisibility ($r \nmid Q$)**: When $r \mid Q$, a complete periodic comb is a coset of a subgroup of $\mathrm{ZMod}\,Q$, so non-resonant frequencies vanish **exactly** by [@prop-finite-character-cancellation]. When $r \nmid Q$, the comb cut off at the register boundary does not support this use of the subgroup identity. One must calculate a finite geometric sum. After obtaining a probability bound near a peak, passing from a frequency approximation to candidates remains a separate number-theoretic task; the conditional theorems below settle its membership component.

:::

::: {.theorem #thm-shor-qpe-probability-mixture title="Actual-input Shor counting marginal" lean="D5/S3/Quantum/ShorCountingMarginal.shor_qpe_probability_mixture"}
For every parameter record $c$ (with modulus at least $2$, a coprime natural base, target width whose dimension $D=2^{\mathrm{width}}$ contains the modulus, and period $r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)>0$), every control width $n\in\mathbb N$, and every $y\in\mathrm{Fin}(2^n)$,

$$
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right)
=\frac{1}{r}\sum_{s\in\mathrm{Fin}\,r}
\operatorname{probability}\!\left(2^n,\frac{s.\operatorname{val}}{r},y\right).
$$

Here `normSquared` sums the squared moduli over every one of the $D$ physical target coordinates. The input is the record's computational basis vector at coordinate $1$; the equality gives the marginal probability of the specified counting outcome after summing over the entire work register.
:::

::: proof
The frozen declaration expands the actual basis input into the orthonormal Fourier eigenstates of its modular orbit, applies the controlled powers and inverse Fourier transform, and uses orthogonality to remove the cross terms. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-shor-distribution-normalized title="Normalization of the actual Shor counting marginal" lean="D5/S3/Quantum/ShorCountingMarginal.shor_distribution_normalized"}
For every parameter record $c$, writing $r=c.\operatorname{period}$, and every $n\in\mathbb N$,

$$
\sum_{y\in\mathrm{Fin}(2^n)}
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right)=1.
$$

This includes the edge case $n=0$, where the control register has the single outcome $y=0$.
:::

::: proof
Summing the actual-input mixture over all counting outcomes invokes the normalized arbitrary-phase kernels; the period factor cancels because the period is positive. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-shor-mixture-peak-lower-bound title="Pointwise nearest-grid lower bound for the actual marginal" lean="D5/S3/Quantum/ShorCountingMarginal.shor_mixture_peak_lower_bound"}
For every parameter record $c$, writing $r=c.\operatorname{period}$, every $n\in\mathbb N$, every $s\in\mathrm{Fin}\,r$, and every $b\in\mathrm{Fin}(2^n)$, assume

$$
\operatorname{Nearest}\!\left(2^n,\frac{s.\operatorname{val}}{r},b\right).
$$

By definition, this assumption means

$$
\exists z\in\mathbb Z,\ \left|\frac{s.\operatorname{val}}{r}-\frac{b.\operatorname{val}}{2^n}-z\right|\le\frac{1}{2\cdot2^n}.
$$

Then

$$
\frac{1}{r}\,\frac{4}{\pi^2}
\le
\operatorname{normSquared}\!\left(\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,b\right).
$$

This is a pointwise statement for the selected phase and grid label; distinct phases may select the same label, so it is not an aggregate-event probability.
:::

::: proof
The arbitrary-phase bound supplies $4/\pi^2$ for the selected eigenphase. The actual mixture has weight $1/r$ for that component, and all other squared norms are nonnegative. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-qpe-arbitrary-phase-lower-bound title="Circular nearest-grid bound for one phase" lean="D5/S3/Quantum/ShorCountingMarginal.qpe_arbitrary_phase_lower_bound"}
For every $N\in\mathbb N$ with $0<N$, every real phase $\theta$, and every $b\in\mathrm{Fin}\,N$, assume

$$
\operatorname{Nearest}(N,\theta,b).
$$

By definition, this assumption means

$$
\exists z\in\mathbb Z,\ \left|\theta-\frac{b.\operatorname{val}}{N}-z\right|\le\frac{1}{2N}.
$$

We have

$$
\frac{4}{\pi^2}\le\operatorname{probability}(N,\theta,b).
$$

The integer shift makes this a circular condition, including both midpoint ties and the $0/1$ seam.
:::

::: proof
The proof shifts the phase by the supplied integer, evaluates the finite geometric sum, applies the sine bounds on the nearest interval, and squares the resulting $2/\pi$ amplitude estimate. The full proof is checked by the Lean kernel.
:::

A nearest-grid lower bound concerns one bar. Controlling the total weight outside a window requires summing the tail. In the inverse-Fourier convention, write

$$
\begin{aligned}
A_Q(\theta,j)&=\frac1Q\sum_{x=0}^{Q-1}e^{2\pi i x(\theta-j.\operatorname{val}/Q)},\\
p_Q(\theta,j)&=|A_Q(\theta,j)|^2=\operatorname{probability}(Q,\theta,j),\\
d_Q(\theta,j)&=\left\|\left(\theta-\frac{j.\operatorname{val}}Q:\mathbb R/\mathbb Z\right)\right\|.
\end{aligned}
$$

The last line is exactly Lean's `UnitAddCircle` norm: circular distance after reducing the error modulo integers, with values in $[0,1/2]$. We use $\varepsilon$ for the radius to distinguish it from the label reflection $\rho$ below.

::: {.theorem #thm-qpe-circular-tail title="Circular-window tail for single-phase QPE" lean="D5/S3/Quantum/QPECircularTail.qpe_circular_tail_le"}
For every $n\in\mathbb N$, every real phase $\theta\in\mathbb R$, and every real radius $\varepsilon>0$, put $Q=2^n$. Then

$$
\sum_{\substack{j\in\mathrm{Fin}\,Q\\\varepsilon\le d_Q(\theta,j)}}p_Q(\theta,j)
\le\frac1{2Q\varepsilon}+\frac1{2(Q\varepsilon)^2}.
$$

The bad event includes labels at distance exactly $\varepsilon$. The phase need not lie in $[0,1)$, and no nearest-grid, order, or coprimality hypothesis is required.
:::

::: proof
Subtract a nearest integer from each error to obtain absolute value at most $1/2$. The geometric sum and a sine lower bound give $|A_Q(\theta,j)|\le1/(2Qd_Q(\theta,j))$ at positive distance. Lift the labels to integers; reduction modulo $Q$ proves that the lifts are distinct. Squaring and summing reduces the estimate to a finite reciprocal-square tail on each side of the center. Retain each side's first term and bound the rest by a telescoping sum of reciprocal differences, yielding the stated constants. The full proof is checked by the Lean kernel.
:::

Combining the tail with [normalization of the single-phase kernel](lean:D5/S3/Quantum/ShorCountingMarginal.qpe_probability_normalized), partition all labels into the bad event and its strict good window to obtain the direct consequence

$$
\sum_{\substack{j\in\mathrm{Fin}\,Q\\d_Q(\theta,j)<\varepsilon}}p_Q(\theta,j)
\ge1-\frac1{2Q\varepsilon}-\frac1{2(Q\varepsilon)^2}.
$$

This applies the cited tail and normalization, without introducing another frozen declaration. The good-window inequality is strict: equality with the radius belongs to the bad event. At $Q=128$ and $\varepsilon=1/16$, $Q\varepsilon=8$, the tail bound is $1/16+1/128=9/128$, and the strict good window has mass at least $119/128$, for every real phase. The theorem includes $n=0$, negative phases, integer shifts, the $0/1$ seam, and midpoint ties. When $\varepsilon>1/2$, the bad event is empty. A bound larger than $1$ merely means that this estimate is loose at that scale.

The supplied proof comes from QudeLeap Team's [Lean-QuantumAlg, fixed revision](https://github.com/QudeLeap/Lean-QuantumAlg/tree/971dc8be8a153a116b6d7cd748f984d545861b00), retaining its attribution and Apache 2.0 license. The single-shot estimate appears in Lin Lin, *Lecture Notes on Quantum Algorithms for Scientific Computation*, [arXiv:2201.08309v1](https://arxiv.org/abs/2201.08309v1), §3.5, equations (3.48)–(3.50). This sums only the existing inverse-Fourier single-phase kernel. It does not automatically establish aggregate success for the Shor eigenphase mixture, concentration of every conditioned comb, a repeated-sampling law, or factor extraction. With a positive final $\mathcal F_+$, first reflect the label by $\rho(k)=(-k)\bmod Q$, as below, before using the same phase.

::: {.remark #rem-shor-actual-input-marginal title="Actual-input derivation and the remaining Shor boundaries"}
The following actual-input derivation explains the four statements about the marginal, normalization, and pointwise lower bounds; the later [@thm-shor-nearest-candidate] and [@thm-shor-coprime-candidate] separately establish conditional continued-fraction candidate membership. It remains deliberately narrower than the full Shor algorithm: the aggregate success event, coprime sampling, factor extraction, and gate complexity stay in [@rem-grover-qft-shor-literature].

**The actual input is $|1\rangle$.** Let the modulus be $N\ge2$ and the natural-number base $a$ satisfy $\gcd(a,N)=1$. The work register has $w$ qubits and dimension $D=2^w$, with only $N\le D$ required. Independently, the counting register has size $Q=2^n$ for any natural number $n$, including $0$. Work basis labels are $t\in\mathrm{Fin}\,D$; the padded modular permutation and its linear action are

$$
\begin{aligned}
\pi_a(t)&=\begin{cases}at\bmod N,&t<N,\\t,&N\le t<D,\end{cases}\\
U_a|t\rangle&=|\pi_a(t)\rangle.
\end{aligned}
$$

Coprimality makes multiplication modulo $N$ a permutation, while the extra padding coordinates stay fixed. Set $r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)>0$ and write $t_j=a^j\bmod N$ for $0\le j<r$. These $r$ basis vectors are distinct, and $U_a|t_j\rangle=|t_{j+1\bmod r}\rangle$. The circuit starts in the basis vector $|1\rangle=|t_0\rangle$: it requires neither prior knowledge of $r$ nor preparation of an unknown eigenstate. The order $r$ is a parameter used to analyze this actual modular cycle.

**Where does the uniform phase mixture come from?** On this cycle define the normalized Fourier vectors

$$
\begin{aligned}
|u_s\rangle&=\frac{1}{\sqrt r}\sum_{j=0}^{r-1}e^{-2\pi i sj/r}|t_j\rangle,
\qquad 0\le s<r,\\
U_a|u_s\rangle&=e^{+2\pi i s/r}|u_s\rangle,\\
\langle u_s\mid u_{s'}\rangle&=\delta_{ss'},
\qquad |1\rangle=\frac{1}{\sqrt r}\sum_{s=0}^{r-1}|u_s\rangle.
\end{aligned}
$$

The negative sign in the first line matches the positive sign in the second: shifting the orbit index from $j$ to $j+1$ extracts $e^{+2\pi i s/r}$. Orthogonality follows by summing $r$th roots of unity. Summing over $s$ then leaves only $j=0$, yielding the last identity. This is a coherent decomposition of a pure state, without assuming an initially sampled classical phase. These vectors span the orbit subspace; they are not asserted to form an eigenbasis of the entire $D$-dimensional work space.

**Two factors of $1/\sqrt Q$ give $1/Q$ in the amplitude.** After uniform preparation of the counting register, the binary control bits apply powers $U_a^{2^j}$. On branch $x=\sum_j x_j2^j$, their product is $U_a^x$. Thus the actual joint state before the Fourier transform is

$$
|\Psi_{\mathrm{pre}}\rangle
=\frac{1}{\sqrt Q}\sum_{x=0}^{Q-1}|x\rangle U_a^x|1\rangle
=\frac{1}{\sqrt Q}\sum_{x=0}^{Q-1}|x\rangle|a^x\bmod N\rangle.
$$

First use the source's inverse transform $\mathcal F_- =\mathcal F_+^{-1}$, whose matrix elements are $Q^{-1/2}e^{-2\pi i kx/Q}$. Let $v_-(k)$ be the work vector at counting outcome $k$ after this transform. Then

$$
\begin{aligned}
v_-(k)&=\frac{1}{Q}\sum_{x=0}^{Q-1}e^{-2\pi i kx/Q}|a^x\bmod N\rangle\\
&=\frac{1}{\sqrt r}\sum_{s=0}^{r-1}A_Q(s/r,k)|u_s\rangle,\\
A_Q(\theta,k)&=\frac{1}{Q}\sum_{x=0}^{Q-1}e^{2\pi i x(\theta-k/Q)},\\
p_Q(\theta,k)&=|A_Q(\theta,k)|^2.
\end{aligned}
$$

The factor $1/Q$ includes both the $1/\sqrt Q$ from uniform input preparation and the $1/\sqrt Q$ from the inverse Fourier transform. Neither may be omitted.

**The actual probability sums over every work outcome.** The unconditional counting-register marginal is

$$
\begin{aligned}
P_-(k)&=\sum_{t=0}^{D-1}|v_-(k)(t)|^2\\
&=\frac{1}{r}\sum_{s=0}^{r-1}p_Q(s/r,k).
\end{aligned}
$$

The left side includes all $D$ coordinates. Coordinates outside the orbit, including the padding, have zero amplitude for this input. On the right, the uniform weight $1/r$ follows from eliminating cross terms with $\langle u_s\mid u_{s'}\rangle=\delta_{ss'}$. This is neither the probability for a single eigenphase nor the comb distribution conditioned on a particular work outcome. For any real phase $\theta$, expanding the square and using orthogonality of $Q$th roots of unity gives a direct normalization check:

$$
\begin{aligned}
\sum_{k=0}^{Q-1}p_Q(\theta,k)
&=\frac{1}{Q^2}\sum_{x,x'=0}^{Q-1}e^{2\pi i(x-x')\theta}
  \sum_{k=0}^{Q-1}e^{-2\pi i k(x-x')/Q}\\
&=\frac{1}{Q^2}\sum_{x=0}^{Q-1}Q=1,\\
\sum_{k=0}^{Q-1}P_-(k)&=\frac{1}{r}\sum_{s=0}^{r-1}1=1.
\end{aligned}
$$

Here $x,x'$ both range from $0$ to $Q-1$, so the inner sum is $Q$ precisely when $x=x'$ and is zero otherwise. At $n=0$, $Q=1$, the controlled-power sequence is empty, $A_1(\theta,0)=1$, and the sole counting outcome still has actual probability $P_-(0)=1$. At $r=1$, the orbit consists only of $|1\rangle$ and the mixture has just the phase-$0$ component, so $P_-(0)=1$ and every other counting outcome has probability zero. None of this uses $r\mid Q$, $Q>r^2$, or $n>0$.

**The chapter's positive-exponent convention reflects the output.** Let $e:\mathrm{Fin}\,Q\simeq\mathrm{ZMod}\,Q$ be `ZMod.finEquiv`, identifying labels by their least nonnegative representatives, and write $\rho(k)=e^{-1}(-e(k))$, namely $(-k)\bmod Q$. For any coordinate function $f$ under this identification, the unnormalized negative-exponent `ZMod.dft` used in this section satisfies

$$
\begin{aligned}
(\mathcal F_-f)(k)&=\frac{1}{\sqrt Q}(\mathrm{ZMod.dft}\,f)(e(k)),\\
(\mathcal F_+f)(\rho(k))&=(\mathcal F_-f)(k).
\end{aligned}
$$

Thus, if the final transform follows this chapter's $\mathcal F_+$ convention, the same work vector occurs at the reflected label: $v_+(\rho(k))=v_-(k)$, hence $P_+(\rho(k))=P_-(k)$. The phase label remains $s/r$. An inverse-transform outcome near $sQ/r$ corresponds to $\rho(k)$ for the positive transform; changing the Fourier sign cannot silently leave the peak label unchanged.

**The nearest-grid lower bound is pointwise.** Fix any $s\in\mathrm{Fin}\,r$ and $b\in\mathrm{Fin}\,Q$ satisfying the circular nearest-grid condition

$$
\exists z\in\mathbb Z,\qquad
\left|\frac{s}{r}-\frac{b}{Q}-z\right|\le\frac{1}{2Q}.
$$

Either midpoint choice is allowed, including a tie across the $0/1$ seam. Put $\delta=s/r-b/Q-z$; shifting the phase by an integer does not change $A_Q$. If $\delta=0$, then $A_Q(s/r,b)=1$. Otherwise, the finite geometric sum gives

$$
|A_Q(s/r,b)|
=\frac{|\sin(\pi Q\delta)|}{Q|\sin(\pi\delta)|}
\ge\frac{2Q|\delta|}{Q\pi|\delta|}
=\frac{2}{\pi}.
$$

The inequalities are $|\sin u|\ge2|u|/\pi$ for $|\pi Q\delta|\le\pi/2$ and $|\sin u|\le|u|$. The denominator is strictly positive in this nonzero branch. Squaring gives separate bounds for a phase component and the actual marginal:

$$
\begin{aligned}
p_Q(s/r,b)&\ge\frac{4}{\pi^2},\\
P_-(b)&\ge\frac{1}{r}p_Q(s/r,b)\ge\frac{4}{r\pi^2},\\
P_+(\rho(b))&\ge\frac{4}{r\pi^2}.
\end{aligned}
$$

The quantifiers cover every $n\ge0$, every phase index $s<r$, and every $b<Q$ satisfying the nearest-grid condition. Different $s$ can select the same $b$, especially when $Q<r$. These pointwise bounds cannot simply be added as though they referred to distinct measurement events.

**A small non-divisible example: $N=7,a=2,D=8,Q=4,r=3$.** The modular cycle is $1,2,4$, and the state before the transform is

$$
|\Psi_{\mathrm{pre}}\rangle
=\frac12\bigl(|0\rangle|1\rangle+|1\rangle|2\rangle
+|2\rangle|4\rangle+|3\rangle|1\rangle\bigr).
$$

At $k=0$, $v_-(0)=(2|1\rangle+|2\rangle+|4\rangle)/4$, so the actual probability is $(4+1+1)/16=3/8$. The phase kernels also give $p_4(0,0)=1$ and $p_4(1/3,0)=p_4(2/3,0)=1/16$, whose uniform mixture is $(1+1/16+1/16)/3=3/8$. But conditioning on work outcome $2$ before the final Fourier transform leaves the counting state $|1\rangle$, giving probability $1/4$ at each of the four Fourier outcomes. Expanding every coordinate shows the full distinction:

| Counting label $k$ | Actual $P_-(k)$ | Conditional $P_-(k\mid t=2)$ |
| --- | --- | --- |
| $0$ | $3/8$ | $1/4$ |
| $1$ | $1/4$ | $1/4$ |
| $2$ | $1/8$ | $1/4$ |
| $3$ | $1/4$ | $1/4$ |

Work outcomes $1,2,4$ have probabilities $1/2,1/4,1/4$, respectively. Averaging their conditional distributions with these weights gives the actual marginal. Here $3\nmid4$ and $Q<r^2$, yet all the formulas above apply. This example makes no claim about continued-fraction recovery or integer factorization.

The frozen mathematical source is [`D5/S3/Quantum/ShorCountingMarginal.lean`](https://github.com/the-omega-institute/trureturing/blob/0ee6636c21a9d8fb2bafd11c91a8fb6247154a25/D5/S3/Quantum/ShorCountingMarginal.lean) at the merged trureturing commit `0ee6636c21a9d8fb2bafd11c91a8fb6247154a25`: its `Parameters.shor_qpe_probability_mixture`, `shor_distribution_normalized`, and `shor_mixture_peak_lower_bound` are cited above, and its `QuantumPhaseEstimationGeneral.qpe_arbitrary_phase_lower_bound` supplies the per-phase estimate. The source parameters `modulus, base, width, dimension, period` correspond to $N,a,w,D,r$; `runQPE` uses $\mathcal F_-$, and `normSquared` sums squared coordinate moduli over the entire work register. The transplant preserves the supplier's Apache 2.0 notice and source reference in the Lean file. The literature basis for the surrounding algorithmic discussion is R. Cleve, A. Ekert, C. Macchiavello, and M. Mosca, *Quantum Algorithms Revisited*, [arXiv:quant-ph/9708016](https://arxiv.org/abs/quant-ph/9708016), §§5–6, Eqs. (5.2)–(5.4) and (6.1)–(6.4).

The scope of this application is the actual-input marginal, its normalization, and a pointwise nearest-grid lower bound. Conditional candidate membership is treated separately below; aggregate-event success probability, coprime sampling, certified order selection, integer factorization, and gate complexity retain their literature status in [@rem-grover-qft-shor-literature]. No guarantee for arbitrary non-power-of-two $Q$, every conditioned posterior comb, or hardware implementation follows here.
:::

Passing from the distribution to postprocessing requires a number-theoretic bridge. The earlier $N=7,Q=4,r=3$ example concerns only the marginal: $N^2=49>4$, so it cannot instantiate the recovery results below. Now impose the resolution condition $N^2\le Q$ and ask a deterministic question: given the measured integer, which finite list is guaranteed to contain the required fraction?

::: {.definition #def-shor-observable-candidates title="Finite continued-fraction candidates from observable inputs" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.candidates"}
For natural numbers $y,Q,N$, let $C(x)$ be the finite list of continued-fraction convergents of a rational $x$. Define

$$
\operatorname{candidates}(y,Q,N)
=\bigl[z\in C(y/Q)\mid\operatorname{den}(z)<N\bigr].
$$

Its only inputs are the measured integer $y$, counting capacity $Q$, and modulus $N$. The unknown order $r$ and phase index $s$ are not inputs. Each rational is represented in lowest terms with positive denominator.
:::

How is $C(x)$ actually enumerated? Put $a_0=\lfloor x\rfloor$ and $f=x-a_0$. If $f=0$, return $[a_0]$. Otherwise recursively enumerate $C(1/f)$, replace each entry $z$ by $a_0+1/z$, and prepend $a_0$. For example, $21/64$ starts with $a_0=0$, then $64/21=3+1/21$, yielding $[0,1/3,21/64]$. The positive reduced denominator strictly decreases at every recursive call, making the list finite. Below we also bound its length, while distinguishing stage counts from actual work. The source definition [`convergents`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.convergents) also accepts negative rationals, zero, and integers. Totalized rational division defines candidates even at $Q=0$, although the application below always has $Q>0$.

This is a list of genuine real continued-fraction convergents. The exact correspondence [`mem_convergents_iff`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.mem_convergents_iff) says that, for any rationals $x,z$, membership $z\in C(x)$ is equivalent to the existence of $k\in\mathbb N$ with $\operatorname{Real.convergent}(x,k)=z$. The real definition repeats the terminal value after a rational expansion terminates; the finite list only needs to retain that value. Write [`reduced`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced) for the rational $s/r$. For $r>0$, its denominator formula [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) is $d=r/\gcd(s,r)$.

Beyond termination, the list's length can be bounded. Write $d=\operatorname{den}(x)$ for the canonical positive reduced denominator of a rational $x$, and read $\operatorname{Nat.log}(2,d)$ as $\lfloor\log_2d\rfloor$; here $d\ge1$ always.

::: {.theorem #thm-rational-convergents-log-length title="Logarithmic length of the rational convergent list" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log"}
For every rational $x\in\mathbb Q$,

$$
\operatorname{length}(C(x))\le2\operatorname{Nat.log}(2,\operatorname{den}(x))+1.
$$

This includes negative rationals, zero, and integers. An integer has denominator $1$ and a singleton list, attaining equality.
:::

::: proof
Use strong induction on the positive reduced denominator. An integer terminates immediately. If the reciprocal fractional part is still nonintegral, the denominators after two and one recursive steps sum to at most the original denominator, and the former is strictly smaller than the latter. Thus two steps at least halve the denominator. Monotonicity of the natural logarithm and its multiplication-by-two identity account for the two removed entries before applying the induction hypothesis. The full proof is checked by the Lean kernel.
:::

For the observable candidates, only $y,Q,N\in\mathbb N$ and $Q>0$ are needed. Filtering cannot increase length, and

$$
\operatorname{den}(y/Q)=\frac{Q}{\gcd(y,Q)}\le Q.
$$

Applying [@thm-rational-convergents-log-length] and monotonicity of the natural logarithm gives

$$
\begin{aligned}
\operatorname{length}(\operatorname{candidates}(y,Q,N))
&\le2\operatorname{Nat.log}(2,Q)+1,\\
\operatorname{length}(\operatorname{candidates}(y,2^n,N))&\le2n+1
\quad(n\in\mathbb N).
\end{aligned}
$$

This application requires neither $y<Q$ nor $N>0$. At $n=0$ the bound is $1$; at $N=0$ the filtered list is empty. It counts entries or Euclidean recursive stages. It supplies no bound on all the repeated `map` work, arithmetic bit complexity, or gate complexity. A short list does not certify an exact selector or make every candidate denominator divide the true order. The recovery results below still require their actual parameters, resolution, nearestness, and coprimality hypotheses.

::: {.theorem #thm-shor-nearest-candidate title="Conditional candidate membership for a nearest sample" lean="D5/S3/Quantum/ShorContinuedFractions.shor_nearest_candidate"}
For every actual padded modular-multiplication record $c:\operatorname{Parameters}$, write $N=c.\operatorname{modulus}\ge2$ and $a=c.\operatorname{base}\in\mathbb N$, with $\gcd(a,N)=1$. Its work width $w=c.\operatorname{width}$ satisfies $N\le2^w$, and its true order $r=c.\operatorname{period}=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)$ satisfies $0<r<N$. For every independently chosen counting width $n\in\mathbb N$, put $Q=2^n$. For every $s\in\mathrm{Fin}\,r$ and $y\in\mathrm{Fin}\,Q$, assume

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right).
$$

Then

$$
\begin{aligned}
\operatorname{reduced}(s.\operatorname{val},r)
&\in\operatorname{candidates}(y.\operatorname{val},Q,N),\\
\operatorname{den}\bigl(\operatorname{reduced}(s.\operatorname{val},r)\bigr)&\mid r.
\end{aligned}
$$
:::

::: proof
Excluding wrap-around turns circular nearestness into ordinary absolute error at most $1/(2Q)$. If $d$ is the reduced denominator, $d\le r<N$ and $N^2\le Q$ give $d^2<Q$, so the error is strictly below $1/(2d^2)$. Legendre's approximation theorem supplies a real-convergent index; the finite-list correspondence gives actual membership, and $d<N$ passes the candidate filter. The denominator formula $d=r/\gcd(s.\operatorname{val},r)$ gives $d\mid r$. The full proof is checked by the Lean kernel.
:::

The hypothesis is $\operatorname{Nearest}$ itself. As defined above, it asserts the existence of an integer $z$ such that

$$
\left|\frac{s.\operatorname{val}}r-\frac{y.\operatorname{val}}Q-z\right|\le\frac1{2Q}.
$$

Why can no wrap occur here? Put $\theta=s.\operatorname{val}/r$ and $u=y.\operatorname{val}/Q$. Then $0\le\theta\le1-1/r$ and $0\le u\le1-1/Q$. The nearest nonzero integer shifts, $z=1$ and $z=-1$, give errors at least $1/r$ and $1/Q$, respectively, both strictly greater than $1/(2Q)$; more distant integers are also excluded. Thus $z=0$. The non-strict nearest-grid hypothesis still admits either rounding tie. Strictness in Legendre's radius comes from the denominator's square:

$$
\left|\frac{y.\operatorname{val}}Q-\frac{s.\operatorname{val}}r\right|
\le\frac1{2Q}<\frac1{2d^2},
\qquad d\le r<N,\quad N^2\le Q.
$$

::: {.theorem #thm-shor-coprime-candidate title="Conditional true-order membership for a coprime phase" lean="D5/S3/Quantum/ShorContinuedFractions.shor_coprime_candidate"}
For every actual record $c$ above ($N\ge2$, $\gcd(a,N)=1$, $N\le2^w$, and $0<r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)<N$), every independent counting width $n\in\mathbb N$, $Q=2^n$, $s\in\mathrm{Fin}\,r$, and $y\in\mathrm{Fin}\,Q$, assume

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right),\qquad
\gcd(s.\operatorname{val},r)=1.
$$

Then the true order occurs in the list of candidate denominators:

$$
r\in\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr).
$$
:::

::: proof
By [@thm-shor-nearest-candidate], the reduced phase belongs to the candidates. Coprimality makes its denominator $r/\gcd(s.\operatorname{val},r)$ equal to $r$. The full proof is checked by the Lean kernel.
:::

The latent parameters $r,s$ describe hypotheses about the measurement; they are unknown when computing the candidates. The second result places the true order in a finite list without certifying how to select it. The first result's divisibility conclusion concerns only the distinguished reduced phase, never every candidate. The following are independent exact rational computations, without additional Lean badges for the examples:

| $N,a,Q;r,s,y$ | Nearest error and bound | $\operatorname{candidates}(y,Q,N)$ |
| --- | --- | --- |
| $7,2,64;3,1,21$ | $1/192\le1/128$ | $[0,1/3]$ |
| $13,4,256;6,1,43$ | $1/768\le1/512$ | $[0,1/5,1/6]$ |
| $7,2,64;3,0,0$ | $0\le1/128$ | $[0]$ |

The first row's full list was computed by Euclidean recursion above; $21/64$ is removed because its denominator is not below $7$. The second row's full list is $[0,1/5,1/6,21/125,43/256]$. Filtering retains both the correct denominator $6$ and the denominator $5$, which does not divide $6$. Thus neither “take the last candidate” nor “pass one modular-exponentiation test” is an exact-order selection algorithm certified here. Even a passing test $a^d\equiv1\pmod N$ alone establishes only $r\mid d$: the tested exponent is a multiple of the order, and need not equal it.

The rational zero has denominator $1$, so the first theorem includes $s=0$. When $r=1$, the sole phase is $s=0$ and $\gcd(0,1)=1$, so the second theorem applies too. The recovery conditions $N\ge2$ and $N^2\le2^n$ exclude $n=0$, whereas the preceding marginal permits it. Neither candidate theorem requires $r\mid Q$ or identifies work width $w$ with counting width $n$. With this chapter's positive-exponent final transform $\mathcal F_+$, first reflect the observed label $k_+$ to $y=\rho(k_+)=(-k_+)\bmod Q$, then use nearestness for the same phase $s/r$ and compute these candidates. Keeping the label unchanged would change the phase being approximated.

These results come from `ShorContinuedFractions`, `FiniteRationalConvergents`, and `FiniteRationalConvergentsLength` at the pinned source. The rational-list and length proofs are supplied by aicyberg; the modules retain the provenance and Apache 2.0 license of *Finite-register phase estimation and spectral Shor order finding* ([solanaqubits/leanbook, fixed revision](https://github.com/solanaqubits/leanbook/tree/9b742770a2a5dbcf30cf9abc44e711194e957a00)). Source audit [#30614](https://github.com/the-omega-institute/trureturing/issues/30614) still has three validated items and one unfinished item: the broader clock statement and independent ideal-sampling product law are not settled by this specialization to the modular bound. The separate earlier marginal-source audit [#30521](https://github.com/the-omega-institute/trureturing/issues/30521) still has three validated and fifty-nine unfinished items. These statuses describe coverage, not a refutation of the mathematical proofs above. Candidate membership establishes no aggregate success probability, random coprimality rate, repeated-sample independence, certified selector, factor extraction, classical bit complexity, quantum gate complexity, or hardware performance; the boundaries in [@rem-grover-qft-shor-literature] remain.

::: {.viz src="phase-gears" preset="leak" height="500"}
**When the period does not divide, the peaks spread.** $Q = 64$ and period $6$: the magenta marks $sQ/r$ fall between integers at $10.67$, $21.33$ and so on, and each peak spreads over neighbouring cells — $k = 11$ has $0.115$, $k = 10$ only $0.026$, and the six cells nearest $sQ/r$ carry $0.80$ together; the continued fraction of the amber-framed $k = 11$ reads $\frac{1}{6}$. This card specifies no actual modulus and base with which to check $N^2\le Q$, so its concentration and reading remain a numerical teaching example. The conditional membership theorems above do not certify this card's last-convergent rule or identify its conditioned-comb peak heights with the actual marginal probabilities.
:::

Let us now work through the four-part calculation covering Grover search at $N = 4$ and $N = 8$, the $3$-qubit QFT phase gears at $x = 5$, Shor order finding for $N = 15$, and the finite Poisson cross-check on $\mathrm{ZMod}\,16$.

::: {.example #ex-grover-four-shor-fifteen title="Grover Search for N=4 and N=8, 3-Qubit QFT Phase Gears, and Shor Order Finding for N=15: Hand Calculations and Evidence Boundaries"}
Steps 1 and 4 instantiate [@thm-grover-uniform-rotation], [@prop-finite-character-cancellation], and [@cor-finite-poisson-period]. Step 2 expands the three-qubit phases in the positive-exponent, big-endian convention with terminal bit reversal of [@thm-qft-circuit-action]. The hand-derived tensor product explains that convention without certifying every tensor identity. The complete Shor order-finding and classical $\gcd(a^{r/2} \pm 1,N)$ factoring reduction in Step 3 remain literature results, not formalized in this book (see [@rem-grover-qft-shor-literature]).

This example provides a four-part hand-calculated verification:

**Step 1: Grover search for $N = 4$ (exact 1-step hit) versus $N = 8$ (integer-step residual).**
For $N = 4$ ($l = \mathrm{Fin}\,4, s = \mathrm{Fin}\,1$) with one marked state $|0\rangle$, set $P = |0\rangle\langle 0|$, $J = |0\rangle$, and $C = H \otimes H$, so $U = CJ = |s\rangle = \frac{1}{2}(|0\rangle + |1\rangle + |2\rangle + |3\rangle)$. Here $p = \frac{1}{4}$, $\alpha = \arcsin(\sqrt{1/4}) = \frac{\pi}{6} = 30^\circ$, $W = |0\rangle$, and $B = \frac{1}{\sqrt{3}}(|1\rangle + |2\rangle + |3\rangle)$. After $n = 1$ step of $Q = (2|s\rangle\langle s| - I_4)(I_4 - 2P)$, [@thm-grover-uniform-rotation] gives

$$
Q U = \sin(3\alpha)\,W + \cos(3\alpha)\,B = \sin\Bigl(\frac{\pi}{2}\Bigr)|0\rangle + \cos\Bigl(\frac{\pi}{2}\Bigr)B = |0\rangle,
$$

an exact hit in a single step! By contrast, for $N = 8$ with one marked state ($p = 1/8$, $\theta = \arcsin(1/\sqrt{8})$), $\sin(3\theta) = 3\sin\theta - 4\sin^3\theta = \frac{5}{\sqrt{32}}$, so after $n = 1$ step the success probability is

$$
P_{\mathrm{succ}}(N=8,\, n=1) = \sin^2\Bigl(3\arcsin\frac{1}{\sqrt{8}}\Bigr) = \frac{25}{32} = 0.78125,
$$

and after $n = 2$ steps it reaches $\sin^2(5\theta) = \frac{121}{128} = 0.9453125 < 1$, illustrating the integer-step residual when $\frac{\pi}{4\theta} - \frac{1}{2} \notin \mathbb{N}$.

**Step 2: Three-qubit QFT tensor-factor ordering and phase gears at $x = 5 = (101)_2$.**
We adopt the explicit **most-significant-bit (MSB) to least-significant-bit (LSB) output tensor order**, meaning the circuit includes the final bit-reversal SWAPs. Writing the input as $x = x_2 x_1 x_0 = 4x_2 + 2x_1 + x_0$ and binary fractions as $0.b_1 \cdots b_r = \sum_{j=1}^r b_j 2^{-j}$, the unitary QFT $\mathcal{F}_+|x\rangle = \frac{1}{\sqrt{8}}\sum_{k=0}^7 e^{+2\pi i k x / 8}|k_2 k_1 k_0\rangle$ factors as

$$
\mathcal{F}_+|x_2 x_1 x_0\rangle = \frac{|0\rangle + e^{2\pi i (0.x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_1 x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_2 x_1 x_0)}|1\rangle}{\sqrt{2}}.
$$

Notice that the binary fraction grows from the least significant input bit ($0.x_0 \to 0.x_1 x_0 \to 0.x_2 x_1 x_0$), while the **first output tensor factor corresponds to the most significant output bit $k_2$** (one must never conflate pre-SWAP and post-SWAP bit orders!). At $x = 5 = (101)_2$ ($x_2 = 1, x_1 = 0, x_0 = 1$), the three equatorial phase angles are:

- First factor ($0.x_0 = 0.1_2 = 1/2$): $\phi_1 = 2\pi \cdot \frac{1}{2} = \pi$;
- Second factor ($0.x_1 x_0 = 0.01_2 = 1/4$): $\phi_2 = 2\pi \cdot \frac{1}{4} = \frac{\pi}{2}$;
- Third factor ($0.x_2 x_1 x_0 = 0.101_2 = 5/8$): $\phi_3 = 2\pi \cdot \frac{5}{8} = \frac{5\pi}{4}$;

with overall normalization factor $\frac{1}{(\sqrt{2})^3} = \frac{1}{\sqrt{8}}$.

**Step 3: Order finding for $N = 15$, $a = 2$ with $Q = 16$.**
For $N = 15$ and $a = 2$, $2^x \bmod 15$ cycles through $1, 2, 4, 8$ with period $r = 4$. With register size $Q = 16$ (an exact $r \mid Q$ example), conditioning on outcome $1$ in the second register leaves the first register in $(|0\rangle + |4\rangle + |8\rangle + |12\rangle)/2$. Applying the unitary $16$-point QFT $\mathcal{F}_+$ gives amplitude $1/2$ (probability $1/4$) on $k \in \{0, 4, 8, 12\}$ and $0$ elsewhere:

- **$k = 4$ or $k = 12$**: $k/Q = 1/4$ or $3/4$ recovers $r = 4$; then $2^{r/2} = 4$, and $\gcd(4 - 1, 15) = 3$, $\gcd(4 + 1, 15) = 5$ factors $15 = 3 \times 5$;
- **$k = 0$**: yields $k/Q = 0$ and fails to recover the order;
- **$k = 8$**: yields $k/Q = 8/16 = 1/2$ with reduced denominator $2$ (a proper divisor of $r = 4$), which must be checked via $2^2 \equiv 4 \not\equiv 1 \pmod{15}$ or repeated.

**Step 4: Character-sum and Poisson cross-check on $\mathrm{ZMod}\,16$.**
In $\mathrm{ZMod}\,16$, let $H = \{0, 4, 8, 12\}$; then $H^\perp = \mathrm{annihilator}(H) = \{0, 4, 8, 12\}$. By [@prop-finite-character-cancellation], $\sum_{k \in H^\perp} \chi_k(x) = 4$ for $x \in H$ and $0$ for $x \notin H$. For the indicator $f = \mathbf{1}_H$, the unnormalized negative-exponent DFT is $\mathrm{ZMod.dft}\,\mathbf{1}_H = 4 \cdot \mathbf{1}_H$, and both sides of [@cor-finite-poisson-period] evaluate to $4 = \frac{4}{16}(4 + 4 + 4 + 4) = 4$.
:::

Look back at Step 1 of the example: for $N = 4$ a single step puts the arrow on the target.

::: {.viz src="grover-reflections" preset="four" height="500"}
**$N = 4$: one step onto the target.** With $\theta = 30^\circ$ one step turns by $60^\circ$ and the amber arrow lands exactly on the target axis $W$: the cyan shadow has length $1$, the magenta one vanishes, and bar $1$ reaches $1$.
:::

For $N = 8$ two steps still fall short, and the success probability stops at $\frac{121}{128}$.

::: {.viz src="grover-reflections" preset="eight" height="500"}
**$N = 8$: two steps still fall short.** The success probability is $\frac{25}{32}$ after step $1$ and $\frac{121}{128}$ after step $2$: the arrow stops at $5\theta \approx 103.5^\circ$, just past the vertical axis, with a magenta shadow of $-0.234$ left.
:::

In Step 3 the periodic state, after the QFT, leaves peaks only at the four frequencies $k \in \{0, 4, 8, 12\}$.

The order is then read off a peak: $k = 4$ and $12$ give the order $4$ directly, $k = 8$ gives only its proper divisor $2$, and $k = 0$ carries no information.

::: {.viz src="phase-gears" preset="read" height="500"}
**Reading the order from a peak.** The same spectrum: $k = 4$ and $12$ give $\frac{4}{16} = \frac{1}{4}$ and $\frac{12}{16} = \frac{3}{4}$, whose denominator is the order $4$; the amber-framed $k = 8$ only gives $\frac{1}{2}$, and $2$ is a proper divisor of the order that must be checked again; $k = 0$ carries nothing.
:::

::: {.remark #rem-grover-qft-shor-literature title="Grover Query Lower Bounds, Ideal QFT Counts, and the Full Shor Algorithm: Boundaries"}
<!-- alias: #rem-shor-factoring-literature -->
The chapter cites Lean results for uniform amplitude amplification, Weyl conjugation, character cancellation, and finite Poisson summation, together with the actual QFT circuit action and native event counts ([@thm-qft-circuit-action], [@thm-qft-native-event-count]), the single-phase circular tail ([@thm-qpe-circular-tail]), the actual-input marginal and pointwise bounds, rational-list length, and conditional candidate membership. These supply no certified selector. Items 1 and 3 below remain **literature results, not formalized in this book**; item 2 summarizes the cited circuit counts and their cost boundaries.

1. **Grover's algorithm and query lower bounds** (L. K. Grover, *A fast quantum mechanical algorithm for database search*, Proc. 28th ACM STOC, 212–219, 1996, doi:10.1145/237814.237866; G. Brassard, P. Høyer, M. Mosca, and A. Tapp, *Quantum amplitude amplification and estimation*, Contemp. Math. **305**, 53–74, 2002, arXiv:quant-ph/0005055): For unstructured search among $N$ candidates with a known number $M$ of marked items and the promise $1 \le M \le N/4$, start from the uniform superposition and choose the iteration count using the known initial success probability $p = M/N$. Amplitude amplification then raises the success probability to $\ge 1 - M/N$ using $O(\sqrt{N/M})$ queries to the marking oracle. Under this sparse-solution promise, any quantum black-box algorithm finding a marked item with bounded error requires $\Omega(\sqrt{N/M})$ queries (by reduction from the single-solution black-box lower bound of Bennett, Bernstein, Brassard, and Vazirani, 1997): the quadratic speedup reaches the quantum geometric limit for this oracle task.
2. **Ideal native gate count of the same QFT circuit**: [@thm-qft-native-event-count] gives $q$ Hadamards, $q(q-1)/2$ controlled phases, and $\lfloor q/2\rfloor$ SWAPs, totaling $\frac{q(q+1)}2+\lfloor q/2\rfloor$ ideal native occurrences. The usual asymptotic count is therefore $O(q^2)=O((\log Q)^2)$ for $Q=2^q$; [@thm-qft-circuit-action] gives its exact positive-exponent action on a prepared complex vector. Loading arbitrary input data, full classical Fourier-coefficient readout, synthesis of ideal phase gates over a finite discrete gate set, and hardware performance are outside this count.
3. **Shor's factoring algorithm and continued-fraction order recovery** (P. W. Shor, *Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer*, SIAM J. Comput. **26**, 1484–1509, 1997, doi:10.1137/S0097539795293172): For a general odd composite $N$ with $r \nmid Q$ ($N^2 \le Q < 2N^2$), Dirichlet-kernel concentration guarantees that QFT sampling lands within $|k/Q - s/r| < \frac{1}{2r^2}$ with constant probability, under the actual parameter and nearestness hypotheses, membership of the reduced phase in finite candidates is now covered by [@thm-shor-nearest-candidate], while certified selection remains a separate task. When $\gcd(s, r) = 1$ (with probability $\varphi(r)/r = \Omega(1/\log\log r)$), testing $r$ and applying the classical randomized reduction from factoring to order finding factors $N$ in polynomial time. (Note that describing period finding as "canceling an infinite period down to $1$" is a heuristic metaphor, not a formalized mathematical claim.)
:::

::: {.viz src="phase-gears" height="560"}
The full lab of phase gears and the period: change the register size $Q$, the period $r$ and the offset, and click a bar to choose a frequency $k$ and watch its phase arrows laid head to tail; when $r$ divides $Q$ and the comb is a complete coset (offset $x_0<r$), the off-resonant chains close to zero ([@prop-finite-character-cancellation]). This page's comb does not wrap: truncating it at the boundary changes peak heights and leaves off-resonant weight. When $r$ does not divide $Q$, the spectrum is still the finite sum over the comb's actual cells: in Shor's setting (offset $x_0<r$, the comb running to the end of the register, $Q \ge N^2 > r^2$) the peaks concentrate near $sQ/r$; this aggregate concentration retains its literature status, and the page's continued-fraction reading must still be checked. [@thm-shor-nearest-candidate] guarantees only candidate membership under the actual parameter, resolution, and nearestness hypotheses; a truncated comb can lose that concentration, and a single cell gives a flat spectrum.
:::

Seeing how Grover's planar rotations and the QFT's Fourier cancellation operate, two deeper questions arise: **can we unify search, phase estimation, Hamiltonian simulation, and matrix inversion under a single Chebyshev polynomial recurrence on two-dimensional blocks (Quantum Singular Value Transformation, QSVT)? And when we compile continuous rotations into finite words over a discrete gate set $\{H, T\}$, how do finite-vertex polytopes approximate the sphere?** Let us enter the concluding chapter of Part IV — [Chapter 16](ch16-qsvt-walks-and-compilation.md).
