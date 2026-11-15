# 16.6 Lifting the Same Scalar Word to a Raw Projected Unitary {#sec-raw-projected-unitary-lifting}

How can a single entry of a two-dimensional matrix determine a block in a much larger space? Picture an input window $\Pi$, a raw unitary $U$, and an output window $\widetilde\Pi$. The windows may have different sizes; the output window may even be closed entirely. Amplitude outside a window remains in the space, and the next $U^*$ can bring it back. Tracking only the currently visible component cannot establish the action of an arbitrary alternating word.

Fix an arbitrary finite-dimensional complex inner product space $H$, including $H=\{0\}$. All operators are complex-linear endomorphisms of $H$. Products mean composition, with the rightmost factor acting first. The **raw** operators satisfy

$$
\begin{aligned}
U^*U&=1,& UU^*&=1,\\
\Pi^*&=\Pi,& \Pi^2&=\Pi,\\
\widetilde\Pi^*&=\widetilde\Pi,&\widetilde\Pi^2&=\widetilde\Pi.
\end{aligned}
$$

Set $A=\widetilde\Pi U\Pi$ and $G=A^*A$. The star denotes the inner product adjoint; the source uses the standard inner product and adjoint here, with no alternative norm convention. The operator $A$ need not be self-adjoint, the projections need not have equal rank, and no positive singular value is assumed.

::: {.definition #def-projected-unitary-word title="Raw encoding, projector phases, and the alternating word determined by tail length" lean="D5/S3/ContinuousObservables/ProjectedUnitaryLifting.ofRaw D5/S3/ContinuousObservables/ProjectedUnitaryLifting.phaseOp D5/S3/ContinuousObservables/ProjectedUnitaryLifting.altSeq D5/S3/ContinuousObservables/ProjectedUnitaryLifting.Scalar.Rref D5/S3/ContinuousObservables/ProjectedUnitaryLifting.Scalar.phaseZ D5/S3/ContinuousObservables/ProjectedUnitaryLifting.Scalar.seqR"}
Under these assumptions, $E=\operatorname{ofRaw}(U,\Pi,\widetilde\Pi)$ is the projected-unitary encoding formed from these three operators. The source's projector predicate is positivity together with idempotence, equivalent here to self-adjoint idempotence. For an orthogonal projection $J$ and $\theta\in\mathbb R$, define

$$
F_J(\theta)=e(\theta)J+e(-\theta)(1-J).
$$

Write $V_E(\Psi)=\operatorname{altSeq}(E,\Psi)$. For every real phase list, define recursively

$$
\begin{aligned}
V_E([])&=1,\\
V_E(\theta::\Theta)&=
\begin{cases}
F_{\widetilde\Pi}(\theta)U V_E(\Theta),&|\Theta|\text{ is even},\\
F_\Pi(\theta)U^* V_E(\Theta),&|\Theta|\text{ is odd}.
\end{cases}
\end{aligned}
$$

Also put $s(x)=\sqrt{1-x^2}$, using the nonnegative real square root, and define the scalar reflection word

$$
\begin{aligned}
R_{\mathrm{ref}}(x)&=\begin{pmatrix}x&s(x)\\s(x)&-x\end{pmatrix},&
D(\theta)&=\begin{pmatrix}e(\theta)&0\\0&e(-\theta)\end{pmatrix},\\
S([],x)&=I_2,&
S(\theta::\Theta,x)&=D(\theta)R_{\mathrm{ref}}(x)S(\Theta,x).
\end{aligned}
$$

The factors of $S(\Psi,x)=\operatorname{seqR}(\Psi,x)$ follow list order from left to right and act from right to left.
:::

For example, $V_E([\alpha])=F_{\widetilde\Pi}(\alpha)U$, whereas $V_E([\alpha,\beta])=F_\Pi(\alpha)U^*F_{\widetilde\Pi}(\beta)U$. The recursion tests the length of the **tail**; replacing this with an informal phase-index convention can interchange $U$ and $U^*$. The operator $F_J$ multiplies $\operatorname{range}J$ by $e(\theta)$ and its orthogonal complement by $e(-\theta)$. When their dimensions differ, its determinant need not be $1$.

## 16.6.1 Two Frames Keep Both the Visible and Complementary Amplitudes {#two-frames-keep-both-the-visible-and-complementary-amplitudes}

::: {.definition #def-singular-pair-frames title="An arbitrary singular pair and its input and output frames" lean="D5/S3/ContinuousObservables/ProjectedUnitaryLifting.IsSingularPair D5/S3/ContinuousObservables/ProjectedUnitaryLifting.lvOf D5/S3/ContinuousObservables/ProjectedUnitaryLifting.lvtOf D5/S3/ContinuousObservables/ProjectedUnitaryLifting.rvpOf"}
The predicate $\operatorname{IsSingularPair}(E,\psi,\sigma)$ means exactly

$$
\Pi\psi=\psi,\qquad 0\le\sigma\le1,\qquad
A^*A\psi=\sigma^2\psi.
$$

Neither $\|\psi\|=1$ nor $\psi\ne0$ is required. Set $s=\sqrt{1-\sigma^2}$ and define

$$
\begin{aligned}
\ell&=\begin{cases}0,&\sigma=0,\\\sigma^{-1}A\psi,&\sigma\ne0,\end{cases}\\
\widetilde\ell&=s^{-1}(1-\widetilde\Pi)U\psi,\\
\psi_\perp&=s^{-1}(1-\Pi)U^*\ell.
\end{aligned}
$$

Inverses are taken in $\mathbb C$, with $0^{-1}=0$. The input frame is $(\psi,\psi_\perp)$ and the output frame is $(\ell,\widetilde\ell)$. These frames may degenerate; they are not asserted always to be two-dimensional bases.
:::

First examine $0<\sigma<1$ with $\psi\ne0$. We have $A\psi=\sigma\ell$ and $A^*\ell=\sigma\psi$, while each window kills its frame's second vector: $\Pi\psi_\perp=0$ and $\widetilde\Pi\widetilde\ell=0$. An inner product calculation gives $\|A\psi\|=\sigma\|\psi\|$, hence $\|\ell\|=\|\psi\|$. Pythagoras for the projections then gives $\|\widetilde\ell\|=\|\psi_\perp\|=\|\psi\|$. The vectors within either frame are orthogonal, but the input and output frames generally differ. They are orthonormal frames in their respective planes only when $\psi$ is a unit vector.

The source's induction uses all four action identities

$$
\begin{aligned}
U\psi&=\sigma\ell+s\widetilde\ell,&
U\psi_\perp&=s\ell-\sigma\widetilde\ell,\\
U^*\ell&=\sigma\psi+s\psi_\perp,&
U^*\widetilde\ell&=s\psi-\sigma\psi_\perp.
\end{aligned}
$$

For example, when $s>0$, the identity $s\psi_\perp=U^*\ell-\sigma\psi$ and unitarity give

$$
\begin{aligned}
sU\psi_\perp&=\ell-\sigma U\psi\\
&=(1-\sigma^2)\ell-\sigma s\widetilde\ell\\
&=s^2\ell-\sigma s\widetilde\ell.
\end{aligned}
$$

Cancel $s$ to obtain the second action identity. The fourth follows similarly from $s\widetilde\ell=U\psi-\sigma\ell$. This switches between input and output frames; it does not assume that $U$ is the same reflection in a single fixed frame.

Between the appropriate frames, both $U$ and $U^*$ are represented by $R_{\mathrm{ref}}(\sigma)$. The projector phase then multiplies the first coordinate by $e(\theta)$ and the second by $e(-\theta)$, giving $D(\theta)R_{\mathrm{ref}}(\sigma)$. The identities also hold at both endpoints below; the picture of a nondegenerate plane alone does not establish them.

**$\sigma=0$: the left vector vanishes, but the output does not.** The identity $\|A\psi\|^2=\sigma^2\|\psi\|^2$ gives $A\psi=0$. Thus $\ell=\psi_\perp=0$, but $s=1$, $\widetilde\ell=U\psi$, and $U^*\widetilde\ell=\psi$. The input frame degenerates to $(\psi,0)$ and the output frame to $(0,U\psi)$. The swap $R_{\mathrm{ref}}(0)$ transfers amplitude between precisely these degenerate frames. Retaining only a normalized left singular vector would discard $U\psi$ entirely.

**$\sigma=1$: cancellation by a zero square root is unavailable.** Here $s=0$, and the inverse-zero convention gives $\widetilde\ell=\psi_\perp=0$. One must still prove $U\psi=\ell$ and $U^*\ell=\psi$. Since $\widetilde\Pi U\psi=\ell$ and $\|\ell\|=\|U\psi\|=\|\psi\|$, the projection's Pythagorean identity forces $(1-\widetilde\Pi)U\psi=0$; the reverse direction is analogous. Norm saturation supplies the endpoint action.

::: {.theorem #thm-alternating-singular-pair-action title="The full two-component action of any phase list on a singular pair" lean="D5/S3/ContinuousObservables/ProjectedUnitaryLifting.altSeq_apply_singular"}
For any encoding $E$ as above, any $\psi,\sigma$ satisfying $\operatorname{IsSingularPair}(E,\psi,\sigma)$, and any $\Psi\in\operatorname{List}(\mathbb R)$, including the empty list, put $M=S(\Psi,\sigma)$. Then

$$
V_E(\Psi)\psi=
\begin{cases}
M_{00}\psi+M_{10}\psi_\perp,&|\Psi|\text{ is even},\\
M_{00}\ell+M_{10}\widetilde\ell,&|\Psi|\text{ is odd}.
\end{cases}
$$
:::

::: proof
For the empty list, $M=I_2$ and $V_E([])\psi=\psi$. In the induction step, $U$ takes the input frame to the output frame when the tail length is even; $U^*$ takes the output frame back to the input frame when it is odd. The four action identities and the phase rules update both coordinates:

$$
\begin{aligned}
a'&=e(\theta)(\sigma a+s b),\\
b'&=e(-\theta)(s a-\sigma b).
\end{aligned}
$$

Keeping $b=M_{10}$ is essential: the next $00$ coefficient contains $s b$. A final projected readout does not justify removing the complementary component earlier. The endpoint action identities have already been established separately, and all formulas also cover $\psi=0$. This theorem concerns vectors satisfying the singular-pair predicate; it is not an unconditional assertion about every physical input state. The full proof is checked by the Lean kernel.
:::

## 16.6.2 From the Complete Input Gram Spectrum to the Compressed Operator {#from-the-complete-input-gram-spectrum-to-the-compressed-operator}

The operator $G=A^*A$ is a positive self-adjoint contraction with $\Pi G=G\Pi=G$. The source applies the pinned Mathlib finite-dimensional symmetric spectral theorem to its restriction to $\operatorname{range}\Pi$, obtaining a complete orthonormal eigenbasis $\{\psi_j\}_{j\in\mathrm{Fin}(\dim\operatorname{range}\Pi)}$ of that **input subspace**. This is not a thin decomposition listing only positive singular values, nor is this family asserted to be a basis of all $H$. Write $G\psi_j=\lambda_j\psi_j$. Positivity and $\|A\psi_j\|\le\|\psi_j\|$ give $\lambda_j\in[0,1]$; set $\sigma_j=\sqrt{\lambda_j}$. Every zero eigenvalue remains in the basis.

For $R(X)=\sum_m r_mX^m\in\mathbb C[X]$, algebraic evaluation means

$$
R(G)=\operatorname{aeval}_G(R)=\sum_m r_m G^m,
\qquad G^0=1_H.
$$

This is `Polynomial.aeval`: the constant term multiplies the identity on the entire space, rather than evaluating each matrix entry separately. Consequently $R(G)\psi_j=R(\sigma_j^2)\psi_j$, and $R(G)$ commutes with $\Pi$.

::: {.theorem #thm-projected-unitary-polynomial-lifting title="Even and odd compressed lifting of an arbitrary complex scalar polynomial identity" lean="D5/S3/ContinuousObservables/ProjectedUnitaryLifting.polynomial_lifting"}
Under the finite-dimensional space and encoding assumptions above, let $\Psi$ be any real phase list and $R\in\mathbb C[X]$ any polynomial. Assume, for **every** $x\in[0,1]$, that

$$
S(\Psi,x)_{00}=\begin{cases}
R(x^2),&|\Psi|\text{ is even},\\
xR(x^2),&|\Psi|\text{ is odd}.
\end{cases}
$$

Then both conditional statements hold:

$$
\begin{aligned}
|\Psi|\text{ is even}&\ \Longrightarrow\
\Pi V_E(\Psi)\Pi=\Pi R(G)\Pi,\\
|\Psi|\text{ is odd}&\ \Longrightarrow\
\widetilde\Pi V_E(\Psi)\Pi=A R(G).
\end{aligned}
$$
:::

::: proof
Apply [@thm-alternating-singular-pair-action] to every input eigenvector $\psi_j$. For even length, projection by $\Pi$ removes $\psi_\perp$, leaving $R(\sigma_j^2)\psi_j$. For odd length, projection by $\widetilde\Pi$ removes $\widetilde\ell$, leaving $\sigma_jR(\sigma_j^2)\ell=R(\sigma_j^2)A\psi_j$. This includes $\sigma_j=0$ without division by it.

For any $v\in H$, expand $\Pi v$ in the complete input basis and extend by linearity. Both sides vanish on $(1-\Pi)v$. The odd right-hand side does not need an explicit final $\Pi$, because $A\Pi=A$ and $R(G)\Pi=\Pi R(G)$. If the input space is zero, the basis index set is empty and the same expansion still applies. The whole-interval scalar premise has not been weakened to a statement only at selected spectral points. On $\operatorname{range}\Pi\cap\ker A$, the even action is $R(0)$ times the input vector; when $A=0$, the entire even block is $R(0)\Pi$, while the odd block is zero. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-projected-lifting-degenerate title="The empty list, a closed output window, and both singular endpoints (hand calculation)"}
These calculations check the definitions directly and add no formal theorem.

**The empty list.** With $\Psi=[]$ and $R=1$, we have $S_{00}=1=R(x^2)$ throughout the interval and $V_E=1$. The even conclusion reads $\Pi1\Pi=\Pi=\Pi R(G)\Pi$, for any output projection.

**Nonzero input with zero output projection.** Take $H=\mathbb C^2$, $\Pi=\operatorname{diag}(1,0)$, $\widetilde\Pi=0$, and $U=\begin{pmatrix}0&1\\1&0\end{pmatrix}$. Then $A=G=0$, but the input basis still contains $\psi=(1,0)$, with $\sigma=0$, $\ell=\psi_\perp=0$, and $\widetilde\ell=(0,1)$. For any $\alpha,\beta$, set

$$
\begin{aligned}
\Psi&=[\alpha,\beta],\\
R(T)&=e(\alpha)\bigl[e(\beta)T+e(-\beta)(1-T)\bigr].
\end{aligned}
$$

Multiplying $D(\alpha)R_{\mathrm{ref}}(x)D(\beta)R_{\mathrm{ref}}(x)$ gives $S_{00}=R(x^2)$ throughout the interval. The operator word is $V_E=e(-\beta)F_\Pi(\alpha)$, so

$$
\Pi V_E\Pi=e(\alpha-\beta)\Pi=R(0)\Pi.
$$

For $\alpha=\pi/3,\beta=\pi/6$, the coefficient is $\sqrt3/2+i/2$, not zero. The even transform must retain $R(0)$ on the input kernel; summing only over positive singular values would lose the entire answer.

**$\sigma=0$ and $\sigma=1$ in one two-dimensional family.** Take $U=R_{\mathrm{ref}}(\sigma)$, $\Pi=\widetilde\Pi=\operatorname{diag}(1,0)$, and $\psi=(1,0)$. For $0<\sigma<1$, the frames have $\ell=(1,0)$ and $\widetilde\ell=\psi_\perp=(0,1)$. At $\sigma=0$, $\ell=\psi_\perp=0$ and $\widetilde\ell=(0,1)$; at $\sigma=1$, $\ell=(1,0)$ and both complementary vectors vanish. A single step gives

$$
V_E([\theta])\psi=
\begin{pmatrix}e(\theta)\sigma\\e(-\theta)\sqrt{1-\sigma^2}\end{pmatrix}.
$$

Thus the full output is $e(-\theta)(0,1)$ at the zero endpoint and $e(\theta)(1,0)$ at the unit endpoint. Both agree with the two-component formula. At the zero endpoint, the projected readout is zero while the full vector still has norm $1$.
:::
