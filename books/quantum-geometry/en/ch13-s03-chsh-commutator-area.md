# 13.3 The CHSH Square: Its Commutator Area Term {#sec-chsh-commutator-area}

Since the classical mixture $\mathrm{classicalCorrelatedDensity}$ also has local marginals $\frac{1}{2}I_2$ and occupies the $\sigma_Z \otimes \sigma_Z$ cell of the correlation sector, how can a CHSH experiment compare this classical state's one-dimensional correlation line with the coherent correlations of the Bell state $\lvert\Phi^+\rangle$ along several directions?

In 1969, Clauser, Horne, Shimony, and Holt (CHSH) introduced a four-correlator probe: Alice chooses between two dichotomic observables $A_0, A_1$ (Hermitian involutions satisfying $A_0^2 = A_1^2 = I$), Bob chooses between two dichotomic observables $B_0, B_1$ (also Hermitian, with $B_0^2 = B_1^2 = I$), and together they form the CHSH operator

$$
S = A_0 \otimes_{\mathrm{K}} B_0 + A_0 \otimes_{\mathrm{K}} B_1 + A_1 \otimes_{\mathrm{K}} B_0 - A_1 \otimes_{\mathrm{K}} B_1,
$$

where $\otimes_{\mathrm{K}}$ denotes the matrix Kronecker product.

If $A_0, A_1$ and $B_0, B_1$ were commuting numbers $\pm 1$, factoring $S = A_0(B_0 + B_1) + A_1(B_0 - B_1)$ would immediately force $S^2 = 4$ (since one of $B_0 \pm B_1$ is $\pm 2$ and the other is $0$). What extra term appears when we square the operator $S$ in a noncommutative matrix algebra? Landau's operator identity gives the exact answer: the excess over $4I$ is minus the Kronecker product of Alice's commutator $[A_0, A_1] = A_0 A_1 - A_1 A_0$ and Bob's commutator $[B_0, B_1] = B_0 B_1 - B_1 B_0$!

::: {.proposition #prop-landau-area-square title="Landau's Commutator Identity for the Squared CHSH Operator" lean="D5/S3/QuantumBounds/LandauIdentity.landau_identity"}
Let $m$ and $n$ be arbitrary finite index types with decidable equality (`[Fintype m] [DecidableEq m] [Fintype n] [DecidableEq n]`), and let $A_0, A_1 \in M_m(\mathbb{C})$ and $B_0, B_1 \in M_n(\mathbb{C})$ be complex square matrices, each Hermitian and involutive:

$$
\begin{aligned}
A_0.\mathrm{IsHermitian} \land A_0^2 = 1, &\qquad A_1.\mathrm{IsHermitian} \land A_1^2 = 1, \\
B_0.\mathrm{IsHermitian} \land B_0^2 = 1, &\qquad B_1.\mathrm{IsHermitian} \land B_1^2 = 1.
\end{aligned}
$$

Define the Kronecker-product operators $S, C \in M_{m \times n}(\mathbb{C})$ by

$$
\begin{aligned}
S &:= A_0 \otimes_{\mathrm{K}} B_0 + A_0 \otimes_{\mathrm{K}} B_1 + A_1 \otimes_{\mathrm{K}} B_0 - A_1 \otimes_{\mathrm{K}} B_1, \\
C &:= -\bigl((A_0 A_1 - A_1 A_0) \otimes_{\mathrm{K}} (B_0 B_1 - B_1 B_0)\bigr).
\end{aligned}
$$

Then

$$
S^2 = 4 \cdot (1 : M_{m \times n}(\mathbb{C})) + C.
$$
:::

::: proof
Using the mixed-product property $(X \otimes_{\mathrm{K}} Y)(X' \otimes_{\mathrm{K}} Y') = (XX') \otimes_{\mathrm{K}} (YY')$ and bilinearity of the Kronecker product, expand the square of $S = A_0 \otimes_{\mathrm{K}} (B_0 + B_1) + A_1 \otimes_{\mathrm{K}} (B_0 - B_1)$ into four block terms:

1. **The $A_0^2$ block**: $(A_0^2) \otimes_{\mathrm{K}} (B_0 + B_1)^2 = I_m \otimes_{\mathrm{K}} (B_0^2 + B_1^2 + B_0 B_1 + B_1 B_0) = 2 I_{m\times n} + I_m \otimes_{\mathrm{K}} (B_0 B_1 + B_1 B_0)$;
2. **The $A_1^2$ block**: $(A_1^2) \otimes_{\mathrm{K}} (B_0 - B_1)^2 = I_m \otimes_{\mathrm{K}} (B_0^2 + B_1^2 - B_0 B_1 - B_1 B_0) = 2 I_{m\times n} - I_m \otimes_{\mathrm{K}} (B_0 B_1 + B_1 B_0)$;
   Adding these first two blocks cancels the anticommutator $B_0 B_1 + B_1 B_0$ and leaves $4 I_{m\times n}$.
3. **The $A_0 A_1$ and $A_1 A_0$ cross blocks**: Since $B_0^2 = B_1^2 = I_n$, we have $(B_0 + B_1)(B_0 - B_1) = B_0^2 - B_1^2 - B_0 B_1 + B_1 B_0 = -(B_0 B_1 - B_1 B_0)$ and $(B_0 - B_1)(B_0 + B_1) = +(B_0 B_1 - B_1 B_0)$. Summing the two cross blocks gives

   $$
   A_0 A_1 \otimes_{\mathrm{K}} \bigl(-(B_0 B_1 - B_1 B_0)\bigr) + A_1 A_0 \otimes_{\mathrm{K}} (B_0 B_1 - B_1 B_0) = -\bigl((A_0 A_1 - A_1 A_0) \otimes_{\mathrm{K}} (B_0 B_1 - B_1 B_0)\bigr) = C.
   $$

Combining the diagonal sum $4 I_{m\times n}$ with the cross sum $C$ yields $S^2 = 4 I_{m\times n} + C$. The full proof is checked by the Lean kernel.
:::

Two features of [@prop-landau-area-square] deserve special emphasis:

First, the index types $m$ and $n$ are **arbitrary finite types with decidable equality** — they are not assumed to have cardinality $2$. Whether Alice and Bob hold single qubits, multi-qubit registers, or general finite-dimensional systems, operators on distinct factors automatically commute under Kronecker lifting, and $S^2 = 4I - [A_0, A_1] \otimes_{\mathrm{K}} [B_0, B_1]$ holds universally whenever the four observables are Hermitian involutions.

Second, when we specialize by hand to single-qubit Pauli observables $A_0 = \vv{a}_0\cdot\vv{\sigma}$, $A_1 = \vv{a}_1\cdot\vv{\sigma}$ and $B_0 = \vv{b}_0\cdot\vv{\sigma}$, $B_1 = \vv{b}_1\cdot\vv{\sigma}$ ($\vv{a}_i, \vv{b}_j \in S^2$), the Pauli product rule $(\vv{u}\cdot\vv{\sigma})(\vv{v}\cdot\vv{\sigma}) = (\vv{u}\cdot\vv{v})I_2 + i(\vv{u}\times\vv{v})\cdot\vv{\sigma}$ turns each commutator into twice the oriented parallelogram area (cross product) spanned by the two measurement axes:

$$
[A_0, A_1] = 2i(\vv{a}_0 \times \vv{a}_1)\cdot\vv{\sigma}, \qquad [B_0, B_1] = 2i(\vv{b}_0 \times \vv{b}_1)\cdot\vv{\sigma}.
$$

Substituting these into $C = -[A_0, A_1] \otimes_{\mathrm{K}} [B_0, B_1]$ cancels the minus sign via $-(2i)(2i) = +4$:

$$
S^2 = 4 I_4 + 4\bigl((\vv{a}_0 \times \vv{a}_1)\cdot\vv{\sigma}\bigr) \otimes_{\mathrm{K}} \bigl((\vv{b}_0 \times \vv{b}_1)\cdot\vv{\sigma}\bigr)!
$$

(This Pauli cross-product expansion is a hand calculation for $2\times 2$ Pauli directions and does not alter the general hypotheses of [@prop-landau-area-square]; likewise, [@prop-landau-area-square] itself is an operator identity, not the classical hidden-variable probability bound.) Read geometrically, the part of $S^2$ beyond $4$ is Alice's oriented area multiplied by Bob's. Three questions follow at once. If one side spans no area, what is $S^2$? If both sides open their area only partway, where do the eigenvalues of $S$ sit? And when the area is fully open, is there a ceiling? The next three frozen theorems answer all three in every finite dimension, with no Pauli matrices in sight.

**One side spans no area.** In the single-qubit picture, Alice asking along collinear axes ($\vv{a}_0 \parallel \vv{a}_1$) means $A_1 = \pm A_0$: her two rulers commute, and the commutator vanishes on the spot. In general dimension, "collinear" becomes "commuting", and the conclusion survives.

::: {.corollary #cor-chsh-local-commuting-collapse title="The CHSH Operator Squares to 4I When One Local Pair Commutes" lean="D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes"}
Let $m, n$ be finite index types with decidable equality, let $A_0, A_1 \in M_m(\mathbb{C})$ and $B_0, B_1 \in M_n(\mathbb{C})$ each be Hermitian with square equal to the identity (the four hypotheses of [@prop-landau-area-square]), and let $S = A_0 \otimes_{\mathrm{K}} B_0 + A_0 \otimes_{\mathrm{K}} B_1 + A_1 \otimes_{\mathrm{K}} B_0 - A_1 \otimes_{\mathrm{K}} B_1$. If

$$
A_0 A_1 = A_1 A_0 \qquad \text{or} \qquad B_0 B_1 = B_1 B_0,
$$

then

$$
S^2 = 4 \cdot (1 : M_{m \times n}(\mathbb{C})).
$$
:::

::: proof
The source first rewrites $S^2$ as $4 \cdot 1 + C$ using [@prop-landau-area-square], then splits into the two cases. If $A_0 A_1 = A_1 A_0$, Alice's commutator $A_0 A_1 - A_1 A_0$ becomes $A_1 A_0 - A_1 A_0 = 0$; if $B_0 B_1 = B_1 B_0$, Bob's commutator vanishes in the same way. The Kronecker product of the zero matrix with anything is zero, and so is its negative; hence $C = 0$ and $S^2 = 4 \cdot 1$. The full proof is checked by the Lean kernel.
:::

This corollary is an operator identity, and the Lean file says explicitly that it states no expectation bound. Getting from it to the "classical threshold" takes one more step, a manual derivation: $S$ is a sum and difference of Kronecker products of Hermitian matrices, hence Hermitian; $S^2 = 4I$ forces every eigenvalue $\lambda$ to satisfy $\lambda^2 = 4$, so $\lambda = \pm 2$; therefore $2I - S$ and $2I + S$ are both positive semidefinite, and $-2 \le \operatorname{Re}\Tr(\rho S) \le 2$ for every density matrix $\rho$. **If either party's two questions can be asked in either order, quantum correlation cannot cross the classical threshold.**

::: {.viz src="chsh-dial" preset="collinear" height="500"}
**When one side asks the same question twice, S cannot pass 2.** Alice's two solid arrows coincide on $Z$; her magenta area shrinks to a line, and the magenta mark on the gauge drops to $2$, onto the dashed classical bound. The rail turns Bob's dashed pair, and the amber bar rises and falls as $2\cos\varphi$, touching $2$ at most; the figure stops at $\varphi = -40^\circ$, with the bar at $2\cos 40^\circ \approx 1.53$ below the magenta mark ([@cor-chsh-local-commuting-collapse]).
:::

**Both sides open their area partway.** Back to qubits: let Alice's two axes meet at angle $\alpha$ and Bob's at angle $\beta$, so that $\norm{\vv{a}_0 \times \vv{a}_1} = \sin\alpha$ and $\norm{\vv{b}_0 \times \vv{b}_1} = \sin\beta$. A Pauli direction operator $\vv{u}\cdot\vv{\sigma}$ has eigenvalues $\pm\norm{\vv{u}}$, so by the hand formula above $C$ has exactly two eigenvalues, $\pm 4\sin\alpha\sin\beta$ (a manual derivation). The commutator term takes one pair of opposite values, which is precisely the hypothesis of the next proposition.

::: {.proposition #prop-chsh-four-point-spectrum title="If the Commutator Term Has Spectrum in ±N, the Real Spectrum of the CHSH Operator Lies on Four Square Roots" lean="D5/S3/QuantumBounds/CHSHSpectrum.chsh_spectrum"}
Let $N \in \mathbb{R}$ with $0 < N < 4$; let $m, n$ be finite index types with decidable equality, and let $A_0, A_1 \in M_m(\mathbb{C})$ and $B_0, B_1 \in M_n(\mathbb{C})$ each be Hermitian with square equal to the identity. Let $S$ and $C$ be as in [@prop-landau-area-square]:

$$
\begin{aligned}
S &= A_0 \otimes_{\mathrm{K}} B_0 + A_0 \otimes_{\mathrm{K}} B_1 + A_1 \otimes_{\mathrm{K}} B_0 - A_1 \otimes_{\mathrm{K}} B_1, \\
C &= -\bigl((A_0 A_1 - A_1 A_0) \otimes_{\mathrm{K}} (B_0 B_1 - B_1 B_0)\bigr).
\end{aligned}
$$

For a complex square matrix $M$, write $\operatorname{spectrum}_{\mathbb{R}} M$ for the set of real numbers $r$ such that $r \cdot 1 - M$ is not invertible. If $\operatorname{spectrum}_{\mathbb{R}} C \subseteq \{N, -N\}$, then

$$
\operatorname{spectrum}_{\mathbb{R}} S \subseteq \bigl\{\sqrt{4 + N},\; -\sqrt{4 + N},\; \sqrt{4 - N},\; -\sqrt{4 - N}\bigr\}.
$$
:::

::: proof
The source first shows that $S$ is Hermitian: a Kronecker product of Hermitian matrices is Hermitian (the private lemma `hermitian_kronecker`), and so are sums and differences of Hermitian matrices. Hence the real spectrum of $S$ is exactly its set of eigenvalues. Take an eigenvalue $x$. By the power rule for spectra (Mathlib's `spectrum.pow_mem_pow`), $x^2$ lies in the spectrum of $S^2$; by [@prop-landau-area-square], $S^2 = 4 \cdot 1 + C$, and a scalar shift moves the whole spectrum (`spectrum.add_mem_add_iff`), so $x^2 - 4$ lies in the spectrum of $C$. By hypothesis $x^2 - 4 = N$ or $x^2 - 4 = -N$, that is, $x^2 = 4 + N$ or $x^2 = 4 - N$; both numbers are positive, so $x$ is plus or minus the corresponding square root. The full proof is checked by the Lean kernel.
:::

Two points in this proposition need careful reading. First, it gives only an inclusion: the eigenvalues of $S$ cannot escape these four points, but it does not say that all four occur. Second, the hypothesis is the strict $0 < N < 4$. For qubits $N = 4\sin\alpha\sin\beta$, so the hypothesis says that neither pair of axes is collinear and that the two pairs are not both orthogonal. When both pairs are orthogonal, $N = 4$ and the proposition does not apply. A hand computation then gives the eigenvalues $8, 8, 0, 0$ for $S^2$ (the proof of [@cor-fixed-chsh-tsirelson] in the next section finds the same values for the fixed operator) and the spectrum $\{2\sqrt{2}, -2\sqrt{2}, 0\}$ for $S$.

::: {.figure src="ch13-spectrum"}
**The CHSH spectrum follows the area parameter $N$ alone.** The four magenta curves are $\pm\sqrt{4 + N}$ and $\pm\sqrt{4 - N}$: at $N = 0$ they meet at $\pm 2$ on the dim dashed lines; as $N$ grows the outer two open towards $\pm 2\sqrt{2}$ and the inner two close towards $0$. The filled points are the spectra of the rows $N = 1, 2, 3$ of the table below ($\pm\sqrt{7}$ and $\pm 1$ at $N = 3$), lying on the four points of [@prop-chsh-four-point-spectrum]. The hollow points at the ends lie outside its hypothesis $0 < N < 4$: $N = 0$ follows from [@cor-chsh-local-commuting-collapse] with the hand argument $\lambda^2 = 4$, and $N = 4$ is computed by hand from [@prop-landau-area-square].
:::

::: {.example #ex-chsh-spectrum-angle-table title="The Area Parameter N, the CHSH Spectrum, and the Bell-State Expectation at Five Angle Pairs"}
Put all four axes in the $(Z, X)$ plane and measure angles from the $Z$ axis. Alice takes $A_0 = Z$ and $A_1 = \cos\alpha\,Z + \sin\alpha\,X$; Bob takes $B_0 = Z$ and $B_1 = \cos\beta\,Z - \sin\beta\,X$ (turning the other way). A manual derivation: from $[Z, X] = 2iY$ we get $[A_0, A_1] = 2i\sin\alpha\,Y$ and $[B_0, B_1] = -2i\sin\beta\,Y$, hence

$$
C = -(2i\sin\alpha)(-2i\sin\beta)\,Y \otimes_{\mathrm{K}} Y = -4\sin\alpha\sin\beta\;Y \otimes_{\mathrm{K}} Y.
$$

Since $Y \otimes_{\mathrm{K}} Y$ takes the value $-1$ on $\lvert\Phi^+\rangle, \lvert\Psi^-\rangle$ and $+1$ on $\lvert\Phi^-\rangle, \lvert\Psi^+\rangle$, the spectrum of $C$ is $\{N, -N\}$ with $N = 4\sin\alpha\sin\beta$.

Take $\alpha = \beta = 60^\circ$: then $A_1 = \frac{1}{2}Z + \frac{\sqrt{3}}{2}X$, $B_1 = \frac{1}{2}Z - \frac{\sqrt{3}}{2}X$, $[A_0, A_1] = i\sqrt{3}\,Y$, $[B_0, B_1] = -i\sqrt{3}\,Y$, $C = -3\,Y \otimes_{\mathrm{K}} Y$, and $N = 3$. [@prop-chsh-four-point-spectrum] confines the spectrum of $S$ to $\{\pm\sqrt{7}, \pm 1\}$; expanding the characteristic polynomial of the $4\times 4$ matrix $S$ directly gives $(\lambda - 1)(\lambda + 1)(\lambda^2 - 7)$, so each of the four points occurs once. In the Bell state $\lvert\Phi^+\rangle$, the correlation of two axes in this plane is the cosine of the angle between them: $E_{00} = 1$, $E_{01} = \cos 60^\circ = \frac{1}{2}$, $E_{10} = \frac{1}{2}$, $E_{11} = \cos 120^\circ = -\frac{1}{2}$, so $\langle S\rangle_{\Phi^+} = 1 + \frac{1}{2} + \frac{1}{2} + \frac{1}{2} = \frac{5}{2}$. That is past $2$, but short of $\sqrt{7} \approx 2.6458$. The maximum hides in $\operatorname{span}\{\lvert\Phi^+\rangle, \lvert\Psi^-\rangle\}$, where $S$ acts by the matrix

$$
\begin{pmatrix} 5/2 & -\sqrt{3}/2 \\ -\sqrt{3}/2 & -5/2 \end{pmatrix},
$$

with eigenvalues $\pm\sqrt{25/4 + 3/4} = \pm\sqrt{7}$.

The five angle pairs are summarized below. The last column is $\langle S\rangle_{\Phi^+} = 1 + \cos\beta + \cos\alpha - \cos(\alpha + \beta)$; numbers are rounded to four decimal places:

| $\alpha$ | $\beta$ | $N = 4\sin\alpha\sin\beta$ | spectrum of $S$ | frozen result | $\langle S\rangle_{\Phi^+}$ |
| :---: | :---: | :---: | :--- | :--- | :---: |
| $0^\circ$ | $60^\circ$ | $0$ | $\pm 2$ (each twice) | [@cor-chsh-local-commuting-collapse] | $2$ |
| $30^\circ$ | $30^\circ$ | $1$ | $\pm\sqrt{5} \approx \pm 2.2361$, $\pm\sqrt{3} \approx \pm 1.7321$ | [@prop-chsh-four-point-spectrum] | $\frac{1}{2} + \sqrt{3} \approx 2.2321$ |
| $60^\circ$ | $60^\circ$ | $3$ | $\pm\sqrt{7} \approx \pm 2.6458$, $\pm 1$ | [@prop-chsh-four-point-spectrum] | $\frac{5}{2} = 2.5$ |
| $90^\circ$ | $30^\circ$ | $2$ | $\pm\sqrt{6} \approx \pm 2.4495$, $\pm\sqrt{2} \approx \pm 1.4142$ | [@prop-chsh-four-point-spectrum] | $\frac{3}{2} + \frac{\sqrt{3}}{2} \approx 2.3660$ |
| $90^\circ$ | $90^\circ$ | $4$ | $\pm 2\sqrt{2} \approx \pm 2.8284$, $0$ (twice) | none ($N = 4$ lies outside the proposition; hand computation from [@prop-landau-area-square]) | $2$ |

The "frozen result" column only names the frozen result that confines the spectrum to the listed points (the first row also needs the manual $\lambda^2 = 4$ step above); whether every listed point occurs, with which multiplicity, and the last column are manual derivations, checked numerically. The spectrum depends on the two angles only through $N$, and as soon as both areas are nonzero the top eigenvalue $\sqrt{4 + N}$ exceeds $2$. In the last row the spectrum already reaches $2\sqrt{2}$, yet the Bell-state expectation is only $2$: Bob's cross is in the wrong place. Where to put it is the $45^\circ$ question of the next section.
:::

::: {.viz src="chsh-dial" preset="sixty" height="500"}
**Both sides open 60°: past 2, but below √7.** On the Bell state the four cyan steps $1 + \frac{1}{2} + \frac{1}{2} + \frac{1}{2}$ stack to $\frac{5}{2}$, past the dashed $2$; the outer magenta marks sit at $\pm\sqrt{7}$ and the inner dotted ones at $\pm 1$, the four points of [@prop-chsh-four-point-spectrum]. Turn Bob's pair to about $19.1^\circ$ and the amber bar just touches $\sqrt{7}$.
:::

**The ceiling when the area is fully open.** The largest number in the table is $2\sqrt{2}$. Could other dimensions or other observables do better? The module `PeritoTsirelson` proves a more general algebraic bound: Alice has two settings, Bob has $d$ settings, and the local matrices are only required to be unitary; for $d = 2$ this is exactly the CHSH algebraic combination.

::: {.theorem #thm-unitary-bell-bound title="The Bell-Value Bound $2/\sin(\pi/(2d))$ for Finite-Dimensional Unitary Strategies" lean="D5/S3/QuantumBounds/PeritoTsirelson.bell_value_le"}
Let $d, n, m \in \mathbb{N}$ with $d \ge 2$. Let $A_0, A_1$ be $n \times n$ complex unitary matrices and $B_0, \dots, B_{d-1}$ be $m \times m$ complex unitary matrices (with rows and columns indexed by $\mathrm{Fin}\,n$ and $\mathrm{Fin}\,m$ respectively), and let $\rho$ be a density state `DensityState` on $\mathrm{Fin}\,n \times \mathrm{Fin}\,m$ (positive semidefinite with $\Tr\rho = 1$). Write $\omega_d = \exp(2\pi i/d)$ ($\mathrm{windowRoot}\,d$ in the source) and define

$$
\begin{aligned}
\mathrm{bellOperator}_d(A, B) &= \sum_{x = 0}^{1}\sum_{y = 0}^{d - 1} \omega_d^{\,xy}\, A_x \otimes_{\mathrm{K}} B_y, \\
\mathrm{bellValue}_d(A, B, \rho) &= \operatorname{Re}\Tr\bigl(\rho \cdot \mathrm{bellOperator}_d(A, B)\bigr).
\end{aligned}
$$

Then

$$
\mathrm{bellValue}_d(A, B, \rho) \le \frac{2}{\sin\bigl(\pi/(2d)\bigr)}.
$$
:::

::: proof
The source proceeds in four steps. First (the private lemma `density_trace_re_le_norm`): for a density state $\rho$ and any matrix $M$, $\operatorname{Re}\Tr(\rho M) \le \norm{M}$ (operator norm). Replace $M$ by its Hermitian part $H = \frac{1}{2}(M + M^*)$, which has the same real trace against $\rho$ and no larger norm; $\norm{H} \cdot 1 - H$ is positive semidefinite, its trace against $\rho$ is nonnegative, and $\Tr\rho = 1$. Second (the private lemma `bell_operator_factor`): pull $A_0 \otimes_{\mathrm{K}} 1$ out on the left,

$$
\mathrm{bellOperator}_d(A, B) = (A_0 \otimes_{\mathrm{K}} 1) \sum_{y = 0}^{d - 1} \bigl(1 + \omega_d^{\,y}\, U\bigr) \otimes_{\mathrm{K}} B_y, \qquad U = A_0^* A_1,
$$

and left multiplication by a unitary does not change the operator norm. Third (`PeritoTensorBlockBound.tensor_block_bound`): diagonalize the unitary $U$ as $\operatorname{diag}(z_1, \dots, z_n)$ with $\lvert z_i\rvert = 1$; after conjugating by $P \otimes_{\mathrm{K}} 1$ the operator splits into $n$ mutually orthogonal Bob blocks $\sum_y (1 + \omega_d^{\,y} z_i) B_y$. By the triangle inequality and the unitarity of the $B_y$, each block has norm at most $\sum_y \lvert 1 + \omega_d^{\,y} z_i\rvert$, so the whole operator is bounded by any common bound for these block sums. Fourth (`PeritoUnitCircleSum.unit_circle_sum_le`): writing $z = e^{2is}$ gives $\lvert 1 + \omega_d^{\,y} z\rvert = 2\lvert\cos(s + \pi y/d)\rvert$, and the absolute values of $d$ equally spaced cosines sum to at most $1/\sin(\pi/(2d))$. The full proof is checked by the Lean kernel.
:::

Setting $d = 2$ is a manual derivation: $\omega_2 = e^{i\pi} = -1$, the four coefficients are $1, 1, 1, -1$, so $\mathrm{bellOperator}_2$ is exactly the CHSH operator $S$, and the bound is $2/\sin(\pi/4) = 2\sqrt{2}$. For a physical reading as sharp measurements with outcomes $\pm 1$, the local matrices must be Hermitian involutions. These are unitary ($A^* A = A^2 = 1$); negating both $A_0$ and $A_1$ keeps them unitary and flips the sign of $S$. Hence $\lvert\operatorname{Re}\Tr(\rho S)\rvert \le 2\sqrt{2}$ in every finite dimension, for any four Hermitian involutions and any density state: this is the Tsirelson bound for finite-dimensional tensor-product strategies. The infinite-dimensional form, which assumes only commuting observables, remains in [@rem-bell-chsh-literature] at the end of the chapter. For $d = 2$ the fourth step reads $\lvert 1 + z\rvert + \lvert 1 - z\rvert \le 2\sqrt{2}$, with equality only at $z = \pm i$. For single-qubit Pauli directions, $U = A_0^* A_1 = A_0 A_1 = \cos\alpha\, I + i(\vv{a}_0 \times \vv{a}_1)\cdot\vv{\sigma}$ has eigenvalues $e^{\pm i\alpha}$, and the block bound becomes $2\lvert\cos(\alpha/2)\rvert + 2\lvert\sin(\alpha/2)\rvert = 2\sqrt{1 + \sin\alpha}$ ($0^\circ \le \alpha \le 180^\circ$). Compared with the largest eigenvalue $\sqrt{4 + N} = 2\sqrt{1 + \sin\alpha\sin\beta}$ allowed by [@prop-chsh-four-point-spectrum], it simply inflates Bob's $\sin\beta$ to $1$. It reaches $2\sqrt{2}$ at $\alpha = 90^\circ$: the ceiling is nailed exactly where Alice opens a full orthogonal cross.

::: {.figure src="ch13-unit-circle-bound"}
**The block bound reaches the ceiling at the right angle on the unit circle.** On the left is the unit circle; the amber point is $z = e^{i\alpha}$ (here $\alpha = 60^\circ$), and two cyan chords join it to $+1$ and $-1$, meeting at a right angle at $z$, with lengths $\lvert 1 - z\rvert = 2\sin(\alpha/2)$ and $\lvert 1 + z\rvert = 2\cos(\alpha/2)$; the hollow point at the top is $z = i$, where the two chords are equal. On the right the cyan curve is the sum of the two chords, $2\sqrt{1 + \sin\alpha}$: $2$ at both ends, $2.732$ at the amber point at $60^\circ$, touching the green dashed line $2\sqrt{2}$ only at $\alpha = 90^\circ$. The green dashed line is the bound of [@thm-unitary-bell-bound] at $d = 2$ (the substitution is a manual derivation); the curve is the hand calculation in the text.
:::
