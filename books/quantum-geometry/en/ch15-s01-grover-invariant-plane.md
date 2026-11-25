# 15.1 Grover: The Common Invariant Plane of Two Reflections {#sec-grover-invariant-plane}

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

::: {.film src="grover-two-mirrors"}
**Two mirrors make a turn (2 min 22 s).** Two cyan mirror lines meet at $30^\circ$; a white shape bounced off each in turn becomes the amber image, turned by the violet $60^\circ$: two flips make one turn, by twice the angle. Four boxes hide one prize: the start has amplitude $\tfrac12$ in every box and sits exactly $\theta = 30^\circ$ off the failure direction $B$. The first mirror $I - 2P$ flips the sign of the magenta prize bar, the second mirror $2UU^* - I$ flips every bar about the average $\tfrac14$, so $(\tfrac12, \tfrac12, \tfrac12, \tfrac12) \to (-\tfrac12, \tfrac12, \tfrac12, \tfrac12) \to (1, 0, 0, 0)$ and the amber arrow turns from $30^\circ$ to $90^\circ$. The general rule is [@thm-grover-uniform-rotation]: for $p < 1$ the state after $n$ steps sits exactly at $(2n+1)\theta$, and for $p = 1$ the start is the success block. Keep turning and the four-box success chances run $\tfrac14, 1, \tfrac14, \tfrac14, 1$: past the top, the next turn walks back down, and only coming round again returns to the top. At $N = 100$ the best whole step of the first peak is $n = 7$, with $15\theta \approx 86.1^\circ$ and success about $0.995$, while $\frac{\pi}{4}\sqrt{N}$ is only an estimate on top of the theorem; for one prize among $N > 1$ boxes, no whole step lands exactly except at $N = 4$, by Niven's theorem (a literature result). In the scene of the theorem the orbit on the left is drawn with the schematic angle $\theta = 11^\circ$. That unstructured search needs $\Omega(\sqrt{N})$ oracle queries is a literature result, not formalized in this book; "search is turning" is an interpretation, marked ARGUED. Every number in the film is computed on screen.
:::

To apply the two mirrors one at a time by hand, open the full lab below:

::: {.viz src="grover-reflections" height="560"}
The full lab of Grover's two reflections: drag the initial state on mirror 2 to change $\theta$, change $N$, and apply the mirrors one at a time with ← →; the bars on the right are the success probabilities $\sin^2((2n+1)\theta)$ after each step ([@thm-grover-uniform-rotation]). The $\Omega(\sqrt{N})$ query lower bound is a literature result, not formalized in this book.
:::
