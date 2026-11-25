# 16.1 QSVT: Two-Dimensional Blocks and Chebyshev Recurrences {#sec-qsvt-chebyshev-blocks}

Why can contemporary quantum algorithms unify search, eigenvalue filtering, Hamiltonian simulation, and matrix inversion into polynomial transformations of singular values (this "grand unification" is a literature result: J. M. Martyn, Z. M. Rossi, A. K. Tan, and I. L. Chuang, *Grand unification of quantum algorithms*, PRX Quantum **2**, 040203, 2021, [10.1103/PRXQuantum.2.040203](https://doi.org/10.1103/PRXQuantum.2.040203); it is not formalized in this book)? Because inside a unitary operator, a natural bounded scalar input is a projection cosine $x = \cos\theta \in [-1, 1]$; iterating a two-dimensional rotation block $m$ times multiplies the rotation angle from $\theta$ to $m\theta$, turning the top-left entry into the degree-$m$ **Chebyshev polynomial of the first kind**, $T_m(x) = \cos(m\arccos x)$!

At the purely algebraic level, the three-term Chebyshev recurrence requires neither trigonometry nor analysis: it is a universal identity for power sums $a^m + b^m$ of any two elements satisfying $a \cdot b = 1$ in a commutative ring $R$, as formalized in `D5/S1/Recurrence/NormOneTraceAddition.lean`.

::: {.theorem #thm-chebyshev-trace-recurrence title="Second-Order Power-Sum Recurrence for Reciprocal Pairs in a Commutative Ring" lean="D5/S1/Recurrence/NormOneTraceAddition.trace_recurrence"}
Let $R$ be any commutative ring, let $a, b \in R$ satisfy $a \cdot b = 1$, and let $m \in \mathbb{N}$ be any natural number. Then

$$
a^{m + 2} + b^{m + 2} = (a + b)\bigl(a^{m + 1} + b^{m + 1}\bigr) - (a^m + b^m).
$$
:::

::: proof
Expanding the product on the right-hand side in the commutative ring $R$ gives

$$
\begin{aligned}
(a + b)\bigl(a^{m + 1} + b^{m + 1}\bigr)
&= a^{m + 2} + a b^{m + 1} + b a^{m + 1} + b^{m + 2} \\
&= a^{m + 2} + b^{m + 2} + (a \cdot b)\bigl(a^m + b^m\bigr).
\end{aligned}
$$

Substituting $a \cdot b = 1$ reduces the cross term to $1 \cdot (a^m + b^m) = a^m + b^m$, which cancels against $-(a^m + b^m)$ and leaves $a^{m + 2} + b^{m + 2}$. The full proof is checked by the Lean kernel.
:::

Let us now construct the explicit hand-calculated bridge from the scalar ring identity [@thm-chebyshev-trace-recurrence] to two-dimensional signal blocks (Figure 16, Panel I):

Setting $t_m = a^m + b^m$ ($ab = 1$) gives $t_0 = 2$, $t_1 = a + b$, and $t_{m+2} = (a + b)t_{m+1} - t_m$. Taking $R = \mathbb{C}$ with $a = e^{i\theta}$ and $b = e^{-i\theta}$ for $x = \cos\theta \in [-1, 1]$ satisfies $ab = 1$ and $a + b = 2\cos\theta = 2x$, so $t_m = 2\cos(m\theta) = 2 T_m(x)$ and

$$
T_0(x) = 1, \qquad T_1(x) = x, \qquad T_{m+2}(x) = 2x\,T_{m+1}(x) - T_m(x).
$$

Here $\theta = \arccos x \in [0, \pi]$. In a two-dimensional quantum signal block, the $\mathrm{SU}(2)$ rotation matrix

$$
W(x) = \begin{pmatrix} x & i\sqrt{1 - x^2} \\ i\sqrt{1 - x^2} & x \end{pmatrix} = \begin{pmatrix} \cos\theta & i\sin\theta \\ i\sin\theta & \cos\theta \end{pmatrix} = \exp(i\theta \sigma_X) \in \mathrm{SU}(2) \qquad (x \in [-1, 1])
$$

has eigenvalues $a = e^{i\theta}$ and $b = e^{-i\theta}$ ($\det W(x) = ab = 1$, $\Tr W(x) = 2x$), so its $m$-th power $W(x)^m$ carries $T_m(x) = \cos(m\theta)$ in its top-left entry!

::: {.figure src="ch16-chebyshev-shadows"}
**Turn $m$ times and the shadow is $T_m(x)$.** Take $x = \cos\theta = \frac{1}{2}$ ($\theta = 60^\circ$): four arrows, each turned one more violet angle $\theta$, stop at $0^\circ$, $60^\circ$, $120^\circ$ and the amber $180^\circ$. Their cyan shadows on the axis are $T_0 = 1$, $T_1 = \frac{1}{2}$, $T_2 = -\frac{1}{2}$ and $T_3 = -1$, matching the recurrence of [@thm-chebyshev-trace-recurrence] term by term. Two violet dashed lines complete arrows $0$ and $2$ into a rhombus whose diagonal is $2\cos\theta = 2x$ times arrow $1$ (here it ends exactly at its tip), so the shadows give $T_0 + T_2 = 2xT_1$, that is $1 - \frac{1}{2} = 2 \cdot \frac{1}{2} \cdot \frac{1}{2}$.
:::

**Strict mathematical boundary**: [@thm-chebyshev-trace-recurrence] is a scalar recurrence in an arbitrary commutative ring $R$ with $ab = 1$ and makes no assumptions about matrices, singular values, or phase sequences; connecting it to $W(x) \in \mathrm{SU}(2)$ is an explicit hand calculation, not a formalization of the full QSVT theorem. In particular, one cannot realize an arbitrary polynomial from this recurrence alone (the polynomial realizability conditions for full QSVT are recorded in [@rem-qsvt-walks-literature]).

::: {.film src="chebyshev-blocks"}
**Turn the block, read the corner (2 min 30 s).** The amber hand of a dial turns through the violet angle $\theta$, and its cyan shadow on the floor is $x = \cos\theta = 0.6$; one more turn makes the shadow $\cos 2\theta = -0.28$ (the dial is an analogy). Written as the $2 \times 2$ block $W(0.6)$, each multiplication moves a clock hand one more step $\theta$, and the cyan corner reads $T_0 = 1$, $T_1 = 0.6$, $T_2 = -0.28$, $T_3 = -0.936$, $T_4 = -0.8432$; in the ledger each entry is $1.2$ times the previous one minus the one before. On the unit circle the two eigenvalues $a = e^{i\theta}$ and $b = e^{-i\theta}$ have product $1$ and the cyan sum $2x = 1.2$, and the power sums are $a^m + b^m = 2T_m$; the recurrence is [@thm-chebyshev-trace-recurrence], and halving is a hand step. Three blocks at $x = 0.9, 0.6, 0.2$ then turn three steps together and read $T_3 = 0.216, -0.936, -0.568$; one block per singular value is a QSVT literature result, not formalized in this book. With violet phases between the turns, a polynomial pair of the right degree, parity and normalization is built exactly by a starting phase $\phi_0$ and a list of exactly $k$ more phases ([@thm-polynomial-phase-synthesis]): existence only, with no recipe and no claim of uniqueness or of the shortest list; all phases zero with $k = 3$ give $(4x^3 - 3x, 4x^2 - 1)$. The grand unification of algorithms is a literature result; every number in the film is computed on screen.
:::

