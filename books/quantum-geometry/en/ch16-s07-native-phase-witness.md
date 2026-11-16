# 16.7 The SAME Native Phase Object: Joint Witnesses for the Circle Field and Raw Operator {#sec-native-phase-lifting}

We can now connect the earlier completion to the raw $U,\Pi,\widetilde\Pi$ without choosing a second completion. First fix the rotation and reflection conventions. The interval rotation matrix

$$
W_{\mathrm{rot}}(x)=\begin{pmatrix}x&i s(x)\\i s(x)&x\end{pmatrix}
$$

is the native signal field evaluated on the semicircle with nonnegative imaginary part. Write $W_{\mathrm{word}}(\phi_0,\Phi;x)=D(\phi_0)\prod_{j=1}^{|\Phi|}(W_{\mathrm{rot}}(x)D(\phi_j))$, with factors in list order. The native field continues to use signed $y(t)$; the whole circle has not been replaced by a nonnegative square root.

::: {.definition #def-native-reflection-phases title="The reflection-phase convention for a nonempty rotation list" lean="D5/S3/ContinuousObservables/PhaseSynthesisLifting.cor8Phases"}
Given $\phi_0\in\mathbb R$ and a nonempty list $\Phi=[\phi_1,\ldots,\phi_d]$, define

$$
\begin{aligned}
\Psi&=\operatorname{cor8Phases}(\phi_0,\Phi)\\
&=\bigl[\phi_0+\phi_d+(d-1)\pi/2,\
\phi_1-\pi/2,\ldots,\phi_{d-1}-\pi/2\bigr].
\end{aligned}
$$

The first phase combines the initial phase, final phase, and length correction. The remaining phases come from `dropLast`, each reduced by $\pi/2$. Here $d=|\Phi|>0$; for $d=1$, the list contains just its first entry.
:::

The convention calculation retains both the scalar factor and the final diagonal factor:

$$
\begin{aligned}
W_{\mathrm{rot}}(x)&=iD(-\pi/4)R_{\mathrm{ref}}(x)D(-\pi/4),\\
\Xi&=[\phi_0-\pi/4,\phi_1-\pi/2,\ldots,\phi_{d-1}-\pi/2],\\
W_{\mathrm{word}}(\phi_0,\Phi;x)&=i^d S(\Xi,x)D(\phi_d-\pi/4).
\end{aligned}
$$

In the $00$ entry, the right diagonal contributes $e(\phi_d-\pi/4)$ and $i^d=e(d\pi/2)$. Combining them with the first phase $\phi_0-\pi/4$ gives precisely the first phase of $\Psi$. Thus $W_{\mathrm{word},00}=S(\Psi,x)_{00}$. This does not identify the two **complete matrix words**.

::: {.definition #def-polynomial-parity-roots title="The even and odd roots of the same complex polynomial" lean="D5/S3/ContinuousObservables/IntervalSOSCompletion.Poly.evenRoot D5/S3/ContinuousObservables/IntervalSOSCompletion.Poly.oddRoot"}
For $P(X)=\sum_j a_jX^j\in\mathbb C[X]$, define

$$
\begin{aligned}
\operatorname{evenRoot}P(T)&=\sum_{m\ge0}a_{2m}T^m=\operatorname{contract}(2,P)(T),\\
\operatorname{oddRoot}P(T)&=\sum_{m\ge0}a_{2m+1}T^m
=\operatorname{contract}(2,P.\operatorname{divX})(T).
\end{aligned}
$$

Here `divX` discards the constant term and lowers the remaining exponents. A “root” halves exponents; it does not select a numerical square root. If $P$ is even, then $P(x)=\operatorname{evenRoot}P(x^2)$; if it is odd, then $P(x)=x\operatorname{oddRoot}P(x^2)$, including at $x=0$.
:::

::: {.theorem #thm-native-phase-projected-lifting title="The same completion and native phase tuple lifted to the raw projected unitary" lean="D5/S3/ContinuousObservables/PhaseSynthesisLifting.native_phase_lifting"}
Let $H,U,\Pi,\widetilde\Pi$ satisfy all the finite-dimensional, unitary, and self-adjoint idempotent assumptions preceding [@def-projected-unitary-word]. Given $d\in\mathbb N$ and $p\in\mathbb R[X]$, assume

$$
0<d,\qquad \operatorname{natDegree}p\le d,\qquad
\operatorname{HasParity}(c(p),d),\qquad
|p(x)|\le1\quad(x\in[-1,1]).
$$

There is **a single joint collection of witnesses** $B,C\in\mathbb R[X]$, $U_{\mathrm{field}}\in\mathcal A_2$, $\phi_0\in\mathbb R$, $\Phi\in\operatorname{List}(\mathbb R)$, and a witness to $\Phi\ne[]$, such that all the following hold simultaneously. The sum-of-squares and parity budgets are

$$
\begin{aligned}
1-p^2&=B^2+(1-X^2)C^2,\\
\operatorname{natDegree}B&\le d,&\operatorname{natDegree}C&\le d-1,\\
d=0&\ \Longrightarrow\ C=0,\\
\operatorname{HasParity}(c(B),d)&,&\operatorname{HasParity}(c(C),d-1)&.
\end{aligned}
$$

Here $d-1=\max(d-1,0)$ is truncated natural subtraction. Although $d>0$, the source's conjunct $d=0\Rightarrow C=0$ is retained. For every $t\in T$, the same matrix field satisfies

$$
\begin{aligned}
U_{\mathrm{field}}&=\operatorname{phaseCompletion}(p,B,C),\\
U_{\mathrm{field}}(t)&=\begin{pmatrix}
p(x(t))+iB(x(t))&iy(t)C(x(t))\\
iy(t)C(x(t))&p(x(t))-iB(x(t))
\end{pmatrix},\\
\operatorname{star}(U_{\mathrm{field}})U_{\mathrm{field}}&=1,
&U_{\mathrm{field}}\operatorname{star}(U_{\mathrm{field}})&=1,\\
\det U_{\mathrm{field}}(t)&=1,
&\operatorname{Re}(U_{\mathrm{field}}(t)_{00})&=p(x(t)).
\end{aligned}
$$

The same native phase tuple satisfies

$$
\begin{aligned}
\Phi&\ne[],& |\Phi|&=d,\\
\operatorname{qspPolyW}(\phi_0,\Phi)&=(c(p)+i\,c(B),c(C)),\\
\operatorname{phaseProduct}(\phi_0,\Phi)&=U_{\mathrm{field}}
\quad\text{throughout }\mathcal A_2.
\end{aligned}
$$

Finally put $\Psi=\operatorname{cor8Phases}(\phi_0,\Phi)$, $P=c(p)+i\,c(B)$, $E=\operatorname{ofRaw}(U,\Pi,\widetilde\Pi)$, $A=\widetilde\Pi U\Pi$, and $G=A^*A$. **These same witnesses** also satisfy

$$
\begin{aligned}
|\Psi|&=d,\\
S(\Psi,x)_{00}&=P(x)\quad\text{for every }x\in[0,1],\\
d\text{ is even}&\ \Longrightarrow\
\Pi V_E(\Psi)\Pi=\Pi(\operatorname{evenRoot}P)(G)\Pi,\\
d\text{ is odd}&\ \Longrightarrow\
\widetilde\Pi V_E(\Psi)\Pi=A(\operatorname{oddRoot}P)(G).
\end{aligned}
$$

Both root polynomials are evaluated at $G$ by `aeval`.
:::

::: proof
Take $B,C,U_{\mathrm{field}},\phi_0,\Phi$ just once from [@thm-signed-circle-phase-factorization]; $|p|\le1$ supplies its squared bound $p^2\le1$. Retain every sum-of-squares, budget, field, and polynomial-pair conjunct. The equality $|\Phi|=d>0$ gives nonemptiness and $|\Psi|=d$.

The native polynomial recursion gives the first row of the interval rotation word as $(P(x),i\,c(C)(x)s(x))$. This induction keeps the second component too, since it contributes to the first component at the next multiplication. The reflection convention above then transports the $00$ entry, giving $S(\Psi,x)_{00}=P(x)$ for every $x\in[0,1]$. The polynomial $P$ has parity $d$; substituting the even or odd root of this same $P$ into [@thm-projected-unitary-polynomial-lifting] yields the two compressed identities for the raw operator. Equality of all four field entries on the whole circle comes from the earlier native factorization. The final rotation-to-reflection transport needs and uses only the $00$ equality. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-native-complex-lift title="The complex lift differs from the real target at positive budget (hand calculation)"}
Return to $p=X/2$. Take $d=1$, $B=\sqrt3 X/2$, $C=1$, and

$$
\phi_0=\pi/6,\qquad\Phi=[\pi/6],\qquad\Psi=[\pi/3].
$$

One `stepW` gives

$$
\operatorname{qspPolyW}(\pi/6,[\pi/6])
=(e(\pi/3)X,1)=(c(p)+i\,c(B),c(C)).
$$

Thus the same circle field has diagonal entries $e(\pi/3)x$ and $e(-\pi/3)x$, and off-diagonal entries $iy$; this completion holds on the entire signed circle. The reflection word satisfies $S([\pi/3],x)_{00}=e(\pi/3)x$, whose odd root is the constant $e(\pi/3)$. For any raw encoding above, its compressed block is

$$
\widetilde\Pi V_E([\pi/3])\Pi=e(\pi/3)A
=\left(\frac12+i\frac{\sqrt3}{2}\right)A.
$$

The real target corresponds to the singular-value transform $A/2$, but the block itself retains an imaginary contribution. At $\sigma=1/2$ in the preceding two-dimensional family, the $00$ coefficient is $1/4+i\sqrt3/4$, not $1/4$. A real-part readout equal to $p$ cannot be restated as an already realized channel for the real target.

An even budget can also retain the zero spectrum. Take $p=1/2$, $d=2$, $B=\sqrt3/2$, $C=0$, $\phi_0=-\pi/6$, and $\Phi=[\pi/2,0]$. The polynomial pairs are

$$
(e(-\pi/6),0)\ \longmapsto\ (e(\pi/3)X,-e(\pi/3))
\ \longmapsto\ (e(\pi/3),0).
$$

Here $\Psi=[\pi/3,0]$, $S=D(\pi/3)$, and $V_E=F_\Pi(\pi/3)$. The even root is the constant $e(\pi/3)$, so $\Pi V_E\Pi=e(\pi/3)\Pi$, including the entire input kernel when $A=0$. This exhibits the same phases at a legal budget of $2$; it asserts no shortest-circuit result.
:::

::: {.remark #rem-projected-lifting-provenance-boundaries title="Proof reuse, compressed semantics, and the remaining circuit boundaries"}
The structural proofs behind [@thm-alternating-singular-pair-action] and [@thm-projected-unitary-polynomial-lifting] reuse shosonoda's [auto-res/lean-qsvt@42c4b9149d5957db497e4226bc02da92d10f7a3c](https://github.com/auto-res/lean-qsvt/tree/42c4b9149d5957db497e4226bc02da92d10f7a3c): `QSVT/Operator/Basic.lean`, `Encoding/Projected.lean`, `QSP/Conventions.lean`, and `SVT/PhaseOp.lean`, `AltSeq.lean`, `EigenBasis.lean`, `SVTransform.lean`, `SVD.lean`, `TwoVector.lean`, `TwoFrame.lean`, and `SingularPair.lean`. Convention transport reuses the proofs from `Wrot_eq_Rref` through `seqW_apply_zero_zero_eq` in `QSVT/QSP/Conversion.lean`; the earlier native interfaces connect the scalar recursion and matrix field. Copyright (c) 2026 shosonoda is retained, together with the Copyright (c) 2025 Hayata Yamasaki attribution inherited from lean-quantum in `Operator/Basic.lean`. Both are under Apache-2.0; the full license is retained in the pinned source repository at `docs/reports/licenses/auto-res-lean-qsvt-LICENSE.txt`. The receiving spectral decomposition reuses standard results from pinned Mathlib. The mathematical references are Gilyén–Su–Low–Wiebe, [arXiv:1806.01838v1, Definitions 15–16, Theorem 17 (printed pp. 17–19), and Corollary 8](https://arxiv.org/abs/1806.01838v1). This is a receiving formal bridge for established mathematics. Finite-frame helpers and convention normalization are supporting steps, not independent new mathematical results or resolutions of external open problems.

The same native phase object now acts on arbitrary-rank projections and the raw unitary, but the compressed block implements $P=c(p)+i\,c(B)$. **Unscaled real-part extraction with one ancilla, literal circuit realization, exact accounting of calls to the original $U/U^*$, a zero-query SAME-phase circuit for $d=0$, and correspondence between physical sources and the formal operators** each still require their own justification. Negating phases generally does not take the adjoint of the entire physical word: an adjoint also reverses product order and exchanges $U$ with $U^*$. A compressed identity does not guarantee a deterministic successful whole-output channel; the unread complementary component can remain nonzero.
:::



::: {.viz src="walk-spreading" height="560"}
**The walk-spreading lab.** Drag the rail to change the steps, change the coin's share $w$ and phase $\varphi$, or shorten the cycle: cyan above is the quantum walk, grey below the classical random walk, and magenta what the quantum distribution has beyond its mirror image. The green box is [@lemma-symmetric-coin-walk]; the widths and the lopsidedness are the page's numbers.
:::
