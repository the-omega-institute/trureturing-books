# Invariant-Plane Rotations and Equatorial Area Gears: Grover Search, QFT, and Shor Factoring

> *"The core is how isotropy lets us reach another point through orthogonal relations: one orthogonal step, then two, because the three directions are pairwise orthogonal."*

In [Chapter 13](ch13-entanglement-and-chsh.md) and [Chapter 14](ch14-cloning-codes-and-braids.md), we saw how higher-dimensional spheres store and shield quantum information. Now we confront the central question of quantum algorithms: **how do unitary operations navigate an exponentially large state space to find targets and hidden periods faster than classical search?**

When stripped of circuit notation, the two flagship families of quantum algorithms — **Grover amplitude amplification** and **Quantum Fourier Transform (QFT) period finding in Shor's algorithm** — embody the two geometric mechanisms pointed to in our opening epigraph:

- **Grover search composes two reflections into an invariant-plane rotation**: Inside an isotropic $l$-dimensional search space, the prepared state and the target projection span a common two-dimensional block plane; reflecting first across the orthogonal complement of the target subspace ("one orthogonal step") and then across the prepared subspace ("two orthogonal steps") rotates the state vector by $2\theta$ straight toward the target!
- **QFT and period finding harness character orthogonality across binary phase gears**: Conjugating Weyl shift and clock operators kicks back symplectic phases that wind binary equatorial gears; summing characters over the dual annihilator subgroup cancels every non-resonant frequency to zero while constructively reinforcing the hidden period!

::: {.figure src="ch15-overview"}
**Figure 15.** The chapter at a glance. Panel I: for $N = 4$, one Grover step turns the arrow $U$ through the violet $2\theta = 60^\circ$, and the amber $QU$ lands exactly on the success direction $W$. Panel II: the three phase gears for $x = 5 = (101)_2$, with $2$, $4$ and $8$ teeth; their amber pointers sit at $\pi$, $\pi/2$ and $5\pi/4$. Panel III: after the QFT of the $Q = 16$, $r = 4$ period state, only $k = 0, 4, 8, 12$ keep a cyan bar, each of height $1/4$.
:::

## Grover: The Common Invariant Plane of Two Reflections {#sec-grover-invariant-plane}

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

::: {.viz src="grover-reflections" preset="mirrors" height="500"}
**Two mirrors make one turn.** For $N = 8$, $\theta \approx 20.70^\circ$: the amber arrow is first mirrored in the failure axis $B$ (mirror 1), its tip dropping along the vertical dashed line below the axis; then in the dashed line of $\lvert s\rangle$ (mirror 2), and it comes back $2\theta \approx 41.41^\circ$ higher than where it started; the violet arc is that turn. The cyan shadow on the target axis $W$ is the success amplitude, growing from $0.354$ to $0.884$ ([@thm-grover-uniform-rotation] with $n = 1$).
:::

Three boundaries in [@thm-grover-uniform-rotation] must be kept explicit (Figure 15, Panel I):

1. **Retaining the $p = 1$ branch**: Because $B$ divides by $\sqrt{1 - p}$, the case $p = 1$ is handled by the explicit branch $U = W$, while for $0 < p < 1$ the $n = 0$ case recovers $U = \sin\theta\,W + \cos\theta\,B$.
2. **Column-wise two-dimensional planes for general $s$**: When $|s| = 1$, $W$ and $B$ are two orthonormal vectors spanning a single $2$-dimensional plane. When $|s| > 1$, each source column $j \in s$ spans its own $2$-dimensional plane $\operatorname{span}\{W_{\cdot, j}, B_{\cdot, j}\}$ orthogonal to the planes of all other columns, and all $|s|$ planes rotate in lockstep by $2\theta$ (rather than confining the entire multi-column operator to a single $2$-dimensional Hilbert space).
3. **Discrete integer-step overshoot**: Because $n \in \mathbb{N}$ is an integer, $(2n + 1)\theta$ steps discretely. For small $p = 1/N$, choosing $n \approx \frac{\pi}{4}\sqrt{N}$ brings $(2n + 1)\theta$ close to $\pi/2$, but except for special angles such as $p = 1/4$ ($\theta = \pi/6, n = 1$), standard integer-step Grover iteration cannot hit $\sin((2n + 1)\theta) = 1$ exactly for arbitrary $N$ (an exact coin-assisted remedy for known $p$ is proved in [Chapter 16](ch16-qsvt-walks-and-compilation.md), [@cor-exact-source-query-count]).

::: {.viz src="grover-reflections" preset="over" height="500"}
**Whole steps overshoot.** One more step at $N = 8$: the arrow turns to $7\theta \approx 144.9^\circ$, the cyan shadow shrinks back to $0.575$ and the success probability falls from $0.945$ to $0.330$; the bars on the right rise and then fall, with bar $2$ the highest.
:::

::: {.viz src="grover-reflections" preset="sqrt" height="500"}
**About $\frac{\pi}{4}\sqrt{N}$ steps to the top.** At $N = 256$ each step turns only $2\theta \approx 7.17^\circ$; twelve small violet arcs carry the amber arrow from $3.6^\circ$ to $89.6^\circ$, success $0.99995$. Twelve is the first-peak step count, next to $\frac{\pi}{4}\sqrt{256} \approx 12.57$.
:::

::: {.viz src="grover-reflections" height="560"}
The full lab of Grover's two reflections: drag the initial state on mirror 2 to change $\theta$, change $N$, and apply the mirrors one at a time with ← →; the bars on the right are the success probabilities $\sin^2((2n+1)\theta)$ after each step ([@thm-grover-uniform-rotation]). The $\Omega(\sqrt{N})$ query lower bound is a literature result, not formalized in this book.
:::

## Phase Kickback and the Binary Gears of the QFT {#sec-qft-phase-gears}

Whereas Grover's algorithm rotates states in a real two-dimensional plane, the Quantum Fourier Transform (QFT) and phase estimation wind relative phases around equatorial circles like meshed binary gears (Figure 15, Panel II).

::: {.viz src="phase-gears" preset="basis" height="500"}
**A row of gears, each half as fast.** $Q = 8$ with the single cell $x = 5$: each cell along the rail turns the three violet gears by $\frac{1}{2}$, $\frac{1}{4}$ and $\frac{1}{8}$ of a turn, and at $5$ they rest at $\pi$, $\frac{\pi}{2}$ and $\frac{5\pi}{4}$; frequency $k = 7$ uses all three, and the one cyan arrow of the chain points at their sum, $\frac{3\pi}{4}$. The spectrum is flat, every bar $\frac{1}{8}$. The binary product form of the QFT is a literature result, not formalized in this book.
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

Three details of [@lemma-phase-kickback-weyl] should be noted:

1. **Subtraction in $\mathrm{ZMod}\,M$ precedes `.val`**: The exponent $(b \cdot c - a \cdot d).\mathrm{val}$ is computed by subtracting $a \cdot d$ from $b \cdot c$ inside $\mathrm{ZMod}\,M$ first and then taking its natural-number representative `.val` in $\{0, \dots, M-1\}$.
2. **Conjugate transpose `star` and the positive phase convention**: Here `star` is the conjugate transpose $(\cdot)^*$, and the positive sign in $\omega_M^{(bc - ad).\mathrm{val}}$ matches $\omega_M = \exp(+2\pi i / M)$, the shift action $(X\psi)_i = \psi_{i-1}$, and the operator order $X^e Z^f$.
3. **Scope**: [@lemma-phase-kickback-weyl] establishes the algebraic core of finite Weyl phase kickback, not the full controlled-phase gate compilation of the multi-qubit QFT circuit (which is worked out in [@ex-grover-four-shor-fifteen] and discussed in [@rem-grover-qft-shor-literature]).

## Finite Character Orthogonality and Nonresonant Cancellation {#sec-period-frequency-cancellation}

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

Note the normalization boundary in [@prop-finite-character-cancellation]: for $x \in H$, the sum equals the **unnormalized** cardinality $|\mathrm{annihilator}(H)|$; one must divide by the state and QFT normalization factors ($\sqrt{|H|}$ and $\sqrt{m}$) before interpreting the result as a quantum amplitude or probability.

## Finite Period Sampling and Order Reconstruction in Shor’s Algorithm {#sec-shor-order-reconstruction}

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

::: {.remark #rem-shor-divisibility-boundary-literature title="Scope Boundaries Between Finite Poisson Summation and Non-Divisible Shor Order Recovery (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Two critical boundaries govern how [@cor-finite-poisson-period] connects to Shor's algorithm — in particular, the Dirichlet/Fejér kernel concentration for $r \nmid Q$ and continued-fraction denominator recovery in Item 2 belong to the quantum-algorithms literature (see [@rem-grover-qft-shor-literature] below) and are not formalized in this book:

1. **Finite Poisson summation is not the full Shor factoring theorem**: [@cor-finite-poisson-period] is an algebraic identity on $\mathrm{ZMod}\,m$, not a formalization of Shor's full success probability, continued-fraction recovery theorem, or polynomial gate complexity (which are detailed in [@rem-grover-qft-shor-literature]).
2. **Exact divisibility ($r \mid Q$) versus general non-divisibility ($r \nmid Q$)**: Non-resonant frequencies vanish identically only when the period $r$ divides the register size $m = Q$. When $r \nmid Q$, the Fourier transform exhibits a peaked Dirichlet/Fejér kernel around multiples of $Q/r$ rather than exact zeros, requiring continued-fraction rounding to extract $r$.
:::

::: {.viz src="phase-gears" preset="leak" height="500"}
**When the period does not divide, the peaks spread.** $Q = 64$ and period $6$: the magenta marks $sQ/r$ fall between integers at $10.67$, $21.33$ and so on, and each peak spreads over neighbouring cells — $k = 11$ has $0.115$, $k = 10$ only $0.026$, and the six cells nearest $sQ/r$ carry $0.80$ together; the continued fraction of the amber-framed $k = 11$ reads $\frac{1}{6}$. This concentration and the continued-fraction recovery are literature results, not formalized in this book.
:::

Let us now work through the four-part calculation covering Grover search at $N = 4$ and $N = 8$, the $3$-qubit QFT phase gears at $x = 5$, Shor order finding for $N = 15$, and the finite Poisson cross-check on $\mathrm{ZMod}\,16$.

::: {.example #ex-grover-four-shor-fifteen title="Grover Search for N=4 and N=8, 3-Qubit QFT Phase Gears, and Shor Order Finding for N=15 (With Literature Context, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Steps 1 and 4 below instantiate this chapter's kernel-verified [@thm-grover-uniform-rotation], [@prop-finite-character-cancellation], and [@cor-finite-poisson-period], whereas the binary tensor-product QFT decomposition with bit-reversal SWAPs in Step 2 and the Shor order-finding and classical $\gcd(a^{r/2} \pm 1, N)$ factoring reduction in Step 3 belong to the quantum-algorithms literature (see [@rem-grover-qft-shor-literature] below) and are not formalized in this book.

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

::: {.viz src="grover-reflections" preset="four" height="500"}
**$N = 4$: one step onto the target.** With $\theta = 30^\circ$ one step turns by $60^\circ$ and the amber arrow lands exactly on the target axis $W$: the cyan shadow has length $1$, the magenta one vanishes, and bar $1$ reaches $1$.
:::

::: {.viz src="grover-reflections" preset="eight" height="500"}
**$N = 8$: two steps still fall short.** The success probability is $\frac{25}{32}$ after step $1$ and $\frac{121}{128}$ after step $2$: the arrow stops at $5\theta \approx 103.5^\circ$, just past the vertical axis, with a magenta shadow of $-0.234$ left.
:::

::: {.viz src="phase-gears" preset="four" height="500"}
**Period 4 leaves four peaks.** $Q = 16$, comb $\{0, 4, 8, 12\}$: following $k = 4$, all four cyan arrows point right and the chain has length $4$; after the sweep only the four bars at $0$, $4$, $8$ and $12$ remain, each $\frac{1}{4}$, right on the magenta marks $sQ/r$, and the other twelve are $0$.
:::

::: {.viz src="phase-gears" preset="read" height="500"}
**Reading the order from a peak.** The same spectrum: $k = 4$ and $12$ give $\frac{4}{16} = \frac{1}{4}$ and $\frac{12}{16} = \frac{3}{4}$, whose denominator is the order $4$; the amber-framed $k = 8$ only gives $\frac{1}{2}$, and $2$ is a proper divisor of the order that must be checked again; $k = 0$ carries nothing.
:::

::: {.remark #rem-grover-qft-shor-literature title="Grover Query Lower Bounds, QFT Circuit Complexity, and Shor's Factoring Algorithm (Literature Result, Not Formalized in This Book)"}
<!-- alias: #rem-shor-factoring-literature -->
**Literature result, not formalized in this book.** To complement the frozen algebraic results of this chapter ([@thm-grover-uniform-rotation], [@lemma-phase-kickback-weyl], [@prop-finite-character-cancellation], and [@cor-finite-poisson-period]), three major results from the quantum algorithms literature should be noted:

1. **Grover's algorithm and query lower bounds** (L. K. Grover, *A fast quantum mechanical algorithm for database search*, Proc. 28th ACM STOC, 212–219, 1996, doi:10.1145/237814.237866; G. Brassard, P. Høyer, M. Mosca, and A. Tapp, *Quantum amplitude amplification and estimation*, Contemp. Math. **305**, 53–74, 2002, arXiv:quant-ph/0005055): Amplitude amplification finds a marked item among $N$ candidates using $O(\sqrt{N})$ oracle queries, matching the $\Omega(\sqrt{N})$ black-box query lower bound proved by Bennett, Bernstein, Brassard, and Vazirani (1997).
2. **Gate complexity of the QFT circuit**: Expanding the $Q = 2^q$-point QFT into the binary product form of [@ex-grover-four-shor-fifteen] requires $q$ Hadamard gates, $q(q-1)/2$ controlled phase gates, and $\lfloor q/2\rfloor$ SWAP gates, totaling $O(q^2) = O((\log Q)^2)$ elementary gates.
3. **Shor's factoring algorithm and continued-fraction order recovery** (P. W. Shor, *Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer*, SIAM J. Comput. **26**, 1484–1509, 1997, doi:10.1137/S0097539795293172): For a general odd composite $N$ with $r \nmid Q$ ($N^2 \le Q < 2N^2$), Dirichlet-kernel concentration guarantees that QFT sampling lands within $|k/Q - s/r| < \frac{1}{2r^2}$ with constant probability, from which continued-fraction expansion uniquely recovers $s/r$; when $\gcd(s, r) = 1$ (with probability $\varphi(r)/r = \Omega(1/\log\log r)$), testing $r$ and applying the classical randomized reduction from factoring to order finding factors $N$ in polynomial time. (Note that describing period finding as "canceling an infinite period down to $1$" is a heuristic metaphor, not a formalized mathematical claim.)
:::

::: {.viz src="phase-gears" height="560"}
The full lab of phase gears and the period: change the register size $Q$, the period $r$ and the offset, and click a bar to choose a frequency $k$ and watch its phase arrows laid head to tail; when $r$ divides $Q$ and the comb is a complete coset (offset $x_0<r$), the off-resonant chains close to zero ([@prop-finite-character-cancellation]). This page's comb does not wrap: truncating it at the boundary changes peak heights and leaves off-resonant weight. When $r$ does not divide $Q$, the spectrum is still the finite sum over the comb's actual cells: in Shor's setting (offset $x_0<r$, the comb running to the end of the register, $Q \ge N^2 > r^2$) the peaks concentrate near $sQ/r$, and the order read by continued fractions must still be checked (a literature result, not formalized in this book); a truncated comb can lose that concentration, and a single cell gives a flat spectrum.
:::

Seeing how Grover's planar rotations and the QFT's Fourier cancellation operate, two deeper questions arise: **can we unify search, phase estimation, Hamiltonian simulation, and matrix inversion under a single Chebyshev polynomial recurrence on two-dimensional blocks (Quantum Singular Value Transformation, QSVT)? And when we compile continuous rotations into finite words over a discrete gate set $\{H, T\}$, how do finite-vertex polytopes approximate the sphere?** Let us enter the concluding chapter of Part IV — [Chapter 16](ch16-qsvt-walks-and-compilation.md).
