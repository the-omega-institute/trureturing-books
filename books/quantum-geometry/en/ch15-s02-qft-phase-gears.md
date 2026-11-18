# 15.2 Phase Kickback and the Binary Gears of the QFT {#sec-qft-phase-gears}

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
