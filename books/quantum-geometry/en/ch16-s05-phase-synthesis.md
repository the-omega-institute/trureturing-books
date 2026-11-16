# 16.5 From the complete polynomial pair to phases on the whole signed circle {#sec-phase-synthesis}

The previous section supplies all four matrix entries. A separate question remains: can this **same matrix field** be written as a finite ordered product of signals and phases? We first remove the last step at the polynomial level, then restore each step as a matrix product on the circle, keeping the completion witnesses throughout.

The results below reuse `exists_phases` from `QSVT/QSP/Existence.lean` and its supporting proofs in `QSP/PolyW.lean`, `QSP/Poly.lean`, and `Polynomial/Parity.lean` in shosonoda's [fixed auto-res/lean-qsvt revision](https://github.com/auto-res/lean-qsvt/tree/42c4b9149d5957db497e4226bc02da92d10f7a3c). The original work is Copyright (c) 2026 shosonoda, licensed under Apache-2.0; the source repository preserves the full license in `docs/reports/licenses/auto-res-lean-qsvt-LICENSE.txt`. The mathematical source is Gilyén–Su–Low–Wiebe, [arXiv:1806.01838v1, Theorem 3, equations (4)–(8), printed pages 8–9](https://arxiv.org/abs/1806.01838v1): the sufficiency direction in the rotation convention. The receiving source adapts namespaces, imports, and visibility and adds the native signed-circle application; no mathematical novelty is claimed here. The complete [source](lean:D5/S3/ContinuousObservables/PhaseSynthesis.exists_phases) is `D5/S3/ContinuousObservables/PhaseSynthesis.lean`; its frozen state and Blueprint are `Golden/Frozen/state/D5/S3/ContinuousObservables/PhaseSynthesis.lean.json` and `Blueprint/D5/S3/ContinuousObservables/PhaseSynthesis.md`. These files and the license above are in the book's pinned source tree [{commit}](trureturing:).

For $R=\sum_jr_jX^j\in\mathbb C[X]$, write $R^\#=\sum_j\overline{r_j}X^j$ for **coefficient conjugation** (`conjP` in the source), without reversing exponents. At real $x$, $R^\#(x)=\overline{R(x)}$. Set $e(\phi)=\exp(i\phi)$; scalar multiplication below means multiplication by a constant polynomial. As before, $\operatorname{HasParity}(R,m)$ means that all coefficients of parity opposite to $m$ vanish; $k-1=\max(k-1,0)$ is truncated natural subtraction, and $\operatorname{natDegree}0=0$.

::: {.definition #def-phase-polynomial-fold title="The phase step and left fold of polynomial pairs" lean="D5/S3/ContinuousObservables/PhaseSynthesis.stepW D5/S3/ContinuousObservables/PhaseSynthesis.qspPolyW"}
For $\phi\in\mathbb R$ and $R,S\in\mathbb C[X]$, define

$$
\operatorname{stepW}_\phi(R,S)=
\bigl(e(\phi)[XR+(X^2-1)S],\ e(-\phi)[XS+R]\bigr).
$$

Given $\phi_0\in\mathbb R$ and a real list $\Phi=[\phi_1,\ldots,\phi_\ell]$, start with $(R_0,S_0)=(e(\phi_0),0)$ and set $(R_j,S_j)=\operatorname{stepW}_{\phi_j}(R_{j-1},S_{j-1})$ in list order. Define $\operatorname{qspPolyW}(\phi_0,\Phi)=(R_\ell,S_\ell)$; the empty list gives $(e(\phi_0),0)$. The initial phase $\phi_0$ is separate from the list length.
:::

::: {.theorem #thm-polynomial-phase-synthesis title="Exact synthesis of the complete complex pair at every admissible budget" lean="D5/S3/ContinuousObservables/PhaseSynthesis.exists_phases"}
For every $k\in\mathbb N$ and every $P,Q\in\mathbb C[X]$, suppose

$$
\begin{aligned}
\operatorname{natDegree}P&\le k,\\
\operatorname{natDegree}Q&\le k-1,\\
k=0&\ \Longrightarrow\ Q=0,\\
\operatorname{HasParity}(P,k)&,\qquad
\operatorname{HasParity}(Q,k-1),\\
PP^\#+(1-X^2)QQ^\#&=1\quad\text{in }\mathbb C[X].
\end{aligned}
$$

Then there exist a real number $\phi_0$ and a real list $\Phi$ satisfying both

$$
\begin{aligned}
\operatorname{length}\Phi&=k,\\
\operatorname{qspPolyW}(\phi_0,\Phi)&=(P,Q).
\end{aligned}
$$
:::

::: proof
**Removing one step from budget $k=n+1$.** Write $a=[X^{n+1}]P$ and $b=[X^n]Q$. The $X^{2n+2}$ coefficient in the normalization identity is zero; the degree bounds exclude contributions from higher terms, giving

$$
a\overline a=b\overline b.
$$

If $b\ne0$, $a/b$ has modulus $1$. Choose a real angle $\theta$ with $a/b=e(\theta)$ and set $\phi=\theta/2$; then $e(-\phi)a=e(\phi)b$. If $b=0$, the same relation forces $a=0$, and $\phi=0$ works without division. This includes inputs whose actual degrees lie below the budget.

Following [`unstepW`](lean:D5/S3/ContinuousObservables/PhaseSynthesis.unstepW), set

$$
\begin{aligned}
R&=e(-\phi)XP+e(\phi)(1-X^2)Q,\\
S&=e(\phi)XQ-e(-\phi)P.
\end{aligned}
$$

Expansion gives $\operatorname{stepW}_\phi(R,S)=(P,Q)$ and preserves normalization:

$$
RR^\#+(1-X^2)SS^\#=PP^\#+(1-X^2)QQ^\#=1.
$$

The crude bound for $R$ is $n+2$, whose coefficient is $e(-\phi)a-e(\phi)b=0$. Since $R$ has parity $n$, its $X^{n+1}$ coefficient also vanishes, leaving $\operatorname{natDegree}R\le n$. The crude bound for $S$ is $n+1$, with the opposite top coefficient, again zero. Its parity is $n+1$, so the $X^n$ coefficient vanishes too, giving $\operatorname{natDegree}S\le n-1$. For $n>0$, $n+1$ and $n-1$ have the same parity. For $n=0$, the first reduction makes $S$ constant and its constant coefficient is zero; hence $S=0$, which also has the even parity required by the truncated budget $n-1=0$. The bound $\operatorname{natDegree}S\le0$ alone would not imply $S=0$.

Thus $(R,S)$ satisfies every hypothesis at budget $n$. After induction supplies $\phi_0,\Phi'$, append $\phi$ on the right: $\Phi=\Phi'\mathbin{\text{++}}[\phi]$. Its length increases from $n$ to $n+1$ and the left fold returns the original pair exactly. Even when $a=b=0$, the induction reduces the budget one step at a time; replacing it by actual degree would lose the requested length.

**Zero budget and zero components.** At $k=0$, the explicit condition gives $Q=0$, while $P$ is a constant $u$ and normalization gives $|u|=1$. Choose $e(\phi_0)=u$ and $\Phi=[]$; $u$ need not be $1$. The zero polynomial has both parities, so cancellation and degree bounds also cover zero components. The pair $(0,0)$ itself is excluded by normalization. The full proof is checked by the Lean kernel.
:::

::: {.definition #def-phase-field-product title="The native signal, diagonal phases, and ordered field product" lean="D5/S3/ContinuousObservables/PhaseSynthesis.phaseDiagonal D5/S3/ContinuousObservables/PhaseSynthesis.phaseProduct"}
Let $T=\operatorname{AddCircle}(1:\mathbb R)=\mathbb R/\mathbb Z$, $z(t)=\operatorname{windingPhase}(t)=e^{2\pi it}$, $x(t)=\operatorname{Re}z(t)$, and $y(t)=\operatorname{Im}z(t)$. Write

$$
\mathcal A_2=C\bigl(T,M_{\mathrm{ZMod}\,2}(\mathbb C)\bigr)
=\mathrm{CyclicObservable}\,2
$$

for the algebra of continuous complex matrix fields with rows and columns indexed by $\mathrm{ZMod}\,2$. Multiplication is pointwise, star is pointwise conjugate transpose, and $1$ is the constant identity field. Define the constant field and signal field

$$
\begin{aligned}
D(\phi)(t)&=\operatorname{phaseDiagonal}(\phi)(t)
=\begin{pmatrix}e(\phi)&0\\0&e(-\phi)\end{pmatrix},\\
W(t)&=\operatorname{phaseCompletion}(X,0,1)(t)
=\begin{pmatrix}x(t)&iy(t)\\iy(t)&x(t)\end{pmatrix}.
\end{aligned}
$$

The field $\operatorname{phaseProduct}(\phi_0,\Phi)$ is the left fold starting from $D(\phi_0)$ and applying $V\mapsto V\,W\,D(\phi)$ in list order. Thus

$$
\operatorname{phaseProduct}(\phi_0,[\phi_1,\ldots,\phi_\ell])
=D(\phi_0)(WD(\phi_1))\cdots(WD(\phi_\ell)).
$$

Factors are written from left to right in list order; the rightmost factor acts first on a column vector. The sign of $y(t)$ is retained.
:::

::: {.theorem #thm-signed-circle-phase-factorization title="The same SOS witnesses factor on the entire signed circle" lean="D5/S3/ContinuousObservables/PhaseSynthesis.exists_phase_factorization"}
For every $k\in\mathbb N$ and every $p\in\mathbb R[X]$, suppose

$$
\begin{aligned}
\operatorname{natDegree}p&\le k,\\
\operatorname{HasParity}(c(p),k)&,\\
p(x)^2&\le1\quad(x\in[-1,1]).
\end{aligned}
$$

Then there exist **one common set of witnesses** $B,C\in\mathbb R[X]$, $U\in\mathcal A_2$, $\phi_0\in\mathbb R$, and $\Phi\in\operatorname{List}(\mathbb R)$ satisfying all of the following simultaneously:

$$
\begin{aligned}
1-p^2&=B^2+(1-X^2)C^2\quad\text{in }\mathbb R[X],\\
\operatorname{natDegree}B&\le k,\\
\operatorname{natDegree}C&\le k-1,\\
k=0&\ \Longrightarrow\ C=0,\\
\operatorname{HasParity}(c(B),k)&,\qquad
\operatorname{HasParity}(c(C),k-1).
\end{aligned}
$$

Here $c$ is coefficientwise complexification and $k-1$ is truncated natural subtraction. The matrix field witness satisfies

$$
\begin{aligned}
U&=\operatorname{phaseCompletion}(p,B,C),\\
U(t)&=\begin{pmatrix}
p(x(t))+iB(x(t))&iy(t)C(x(t))\\
iy(t)C(x(t))&p(x(t))-iB(x(t))
\end{pmatrix}\quad(t\in T),\\
\operatorname{star}(U)U&=1,\qquad U\operatorname{star}(U)=1,\\
\det U(t)&=1\quad(t\in T),\\
\operatorname{Re}(U(t)_{00})&=p(x(t))\quad(t\in T).
\end{aligned}
$$

Moreover, for the exact pair $P=c(p)+i\,c(B)$, $Q=c(C)$, these phase witnesses satisfy

$$
\begin{aligned}
\operatorname{length}\Phi&=k,\\
\operatorname{qspPolyW}(\phi_0,\Phi)&=(c(p)+i\,c(B),c(C)),\\
\operatorname{phaseProduct}(\phi_0,\Phi)&=U\quad\text{in }\mathcal A_2.
\end{aligned}
$$
:::

::: proof
Obtain $B,C,U$ **once** from [@thm-phase-unitary-completion], retaining its SOS identity, degrees, parities, zero-budget condition, and every field conclusion. Set $P=c(p)+i\,c(B)$ and $Q=c(C)$. Real coefficients are fixed by conjugation, so $P^\#=c(p)-i\,c(B)$ and $Q^\#=Q$. Complexifying the SOS identity gives exactly $PP^\#+(1-X^2)QQ^\#=1$. The degrees and parities satisfy [@thm-polynomial-phase-synthesis], which supplies a phase list of length exactly $k$ and equality of the whole polynomial pair.

We must still carry that equality to **all four matrix entries**. For real $x,y$ satisfying $x^2+y^2=1$, write

$$
E_{x,y}(R,S)=\begin{pmatrix}
R(x)&iyS(x)\\iyS^\#(x)&R^\#(x)
\end{pmatrix}.
$$

Direct multiplication gives

$$
E_{x,y}(R,S)\begin{pmatrix}x&iy\\iy&x\end{pmatrix}D(\phi)
=E_{x,y}\bigl(\operatorname{stepW}_\phi(R,S)\bigr).
$$

This uses only $y^2=1-x^2$, with no assumption $y\ge0$. The empty list gives $D(\phi_0)$. Restoring successive list entries identifies the full product at every $t\in T$ with $E_{x(t),y(t)}(P,Q)$. Since $Q=c(C)$ has real coefficients, this is the original $\operatorname{phaseCompletion}(p,B,C)(t)$. Pointwise extensionality of continuous fields gives $\operatorname{phaseProduct}(\phi_0,\Phi)=U$, retaining the completion witnesses and the entire matrix. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-phase-zero-and-padded-budget title="Zero budget and a larger admissible budget for a lower-degree pair (hand calculation)"}
These are explicit checks of the definitions, not additional formal theorems.

**$k=0$ retains every unimodular constant.** For any $u\in\mathbb C$ with $|u|=1$, the pair $(P,Q)=(u,0)$ satisfies every hypothesis; choose $e(\phi_0)=u$ and the empty list. For the real target $p=1/2$, take $B=\sqrt3/2,C=0$. Then $1-p^2=B^2=3/4$, and $\phi_0=\pi/3$ gives

$$
U=D(\pi/3)=\begin{pmatrix}
\frac12+i\frac{\sqrt3}{2}&0\\0&\frac12-i\frac{\sqrt3}{2}
\end{pmatrix}.
$$

**Actual degree $1$, requested budget $3$.** Take $(P,Q)=(X,1)$. Normalization is $X^2+(1-X^2)=1$. Since $X$ is odd and $1$ is even, budget $k=3$ is admissible despite $\operatorname{natDegree}P=1<3$. Choose

$$
\phi_0=-\pi/2,\qquad\Phi=[\pi/2,0,0].
$$

Substitution into the step definition gives the successive complete pairs

$$
(-i,0)\ \xrightarrow{\ \pi/2\ }\ (X,-1)
\ \xrightarrow{\ 0\ }\ (1,0)
\ \xrightarrow{\ 0\ }\ (X,1).
$$

The first step uses $e(\pi/2)=i$ and $e(-\pi/2)=-i$. In the second, the first component is $X^2-(X^2-1)=1$ and the second is $-X+X=0$. This checks length exactly $3$ and illustrates inverse reduction at budgets $3$ and $2$ with both top coefficients zero.

For the second theorem, take $p=X,B=0,C=1$, satisfying every SOS constraint at budget $3$. The same list factors $U=W$ on the entire circle. At $t=-1/6$, $x=1/2,y=-\sqrt3/2$, and both off-diagonal entries are $-i\sqrt3/2$, unlike the $+i\sqrt3/2$ entries of the positive-square-root interval pullback. At budget $1$, one can also take $\phi_0=0,\Phi=[0]$. The theorem establishes existence at the given admissible budget, rather than a shortest list.
:::

::: {.remark #rem-phase-synthesis-boundaries title="Exact phase existence and the subsequent operator interface"}
[@thm-polynomial-phase-synthesis] and [@thm-signed-circle-phase-factorization] establish phase existence for legal polynomial pairs and exact factorization of the same sum-of-squares completion on the **entire native signed circle**. The initial phase is existentially quantified outside the list, rather than arbitrarily prescribed in advance. These results assert no optimal or computable phase solver, uniqueness, continuous choice, or numerical stability.

The rotation-to-reflection convention and lifting to arbitrary projected unitaries are connected below by the same witnesses in [@thm-native-phase-projected-lifting]. Equality with the positive square root on the upper semicircle still cannot replace field equality on the whole signed circle. The remaining real-part ancilla, circuit, and query boundaries are stated in [@rem-projected-lifting-provenance-boundaries].
:::
