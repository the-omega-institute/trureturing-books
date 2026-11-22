# 4.2.2 Finite-environment histories and saturation obstructions {#sec-ch04-s02-s02-finite-environment-histories}


> Leaked amplitude does not come back, not because it has vanished, but because the environment that meets the system is always a fresh one.

::: {.remark #rem-arbitrary-density-prefix title="An Exact Prefix Bound for an Arbitrary Initial Environment Density (Manual Application)"}
**Manual application, not formalized in this book.** Recurrence over all time leaves room for finite windows. Yet if two pure states remain fixed while their mutual coherence follows an exact geometric sequence with ratio of modulus less than one, the dimension of a fixed environment also limits the window. The argument below follows [the source, §§9–10, proof of Theorem 10.1](https://github.com/the-omega-institute/trureturing/blob/3476ce98dd3c4326181683b37fc2ddad3e33a743/docs/develop/theory/RECURSIVE_RELATIONAL_OBSERVATION_MINIMAL_RECORD_DILATIONS.md#L980-L1058). That theorem concerns a balanced ten-dimensional channel: in a fixed frame, it identifies orthonormal states $h_+,h_-$, verifies that their pure projectors are fixed and their coherence multiplier is $\lambda=1-4p$ with $|\lambda|<1$, and then uses branch histories and finite Prony annihilation. Here $a,b$ take the roles of $h_+,h_-$, and the same part of the proof applies to a model satisfying those two-state conditions. The generic two-state formulation below is an application of that proof; the source theorem itself concerns its ten-dimensional channel. The research entry point is [trureturing #31041](https://github.com/the-omega-institute/trureturing/issues/31041).

Fix integers $m\ge2,d\ge1$, a natural number $N$, a real number $-1<\lambda<1$, and orthonormal vectors $a,b\in\mathbb C^m$. Let $E=\mathbb C^d$ and let the initial environment density $\sigma\in M_d(\mathbb C)$ be positive semidefinite with $\Tr\sigma=1$, allowing arbitrary rank and coherences in any basis. One fixed unitary $W$ acts on $\mathbb C^m\otimes E$, with actual reduced maps

$$
\Psi_n(X)=\Tr_E\bigl(W^n(X\otimes\sigma)W^{*n}\bigr).
$$

The environment is initially independent of the system input. The data $W,E,\sigma,a,b,\lambda$ stay fixed throughout the window, with no reset, intermediate intervention, external clock control, or replacement of the environment. Write $P_a=\lvert a\rangle\langle a\rvert$, $P_b=\lvert b\rangle\langle b\rvert$, and $O=\lvert a\rangle\langle b\rvert$. If, for every $0\le n\le N$,

$$
\begin{aligned}
\Psi_n(P_a)&=P_a,\qquad \Psi_n(P_b)=P_b,\\
\langle a,\Psi_n(O)b\rangle&=\lambda^n,
\end{aligned}
$$

then $N+1\le d^2$: counting the zeroth sample, at most $d^2$ such exact geometric-coherence samples can agree. Although $O$ is not a density matrix, the displayed definition of the maps acts on all system matrices. Equality of entire channels on density matrices also determines their action on $O$ by linearity.

**Pure outputs reveal the actual branches.** For $N=0$ the conclusion is simply $1\le d^2$; hence take $N\ge1$. Diagonalize $\sigma$ on its positive support $S=\operatorname{supp}\sigma$:

$$
\sigma=\sum_{j=1}^r s_j\lvert e_j\rangle\langle e_j\rvert,
\qquad s_j>0,\quad \sum_j s_j=1,
$$

where $r=\dim S$ and the $e_j$ form an orthonormal basis of $S$. The pure output $\Psi_n(P_a)=P_a$ means that the total probability of leaving the $a$ direction vanishes:

$$
\begin{aligned}
0&=\Tr\bigl((I-P_a)\Psi_n(P_a)\bigr)\\
&=\sum_j s_j\bigl\|((I-P_a)\otimes I_E)W^n(a\otimes e_j)\bigr\|^2.
\end{aligned}
$$

Every term is nonnegative and $s_j>0$, so each term vanishes. By linearity, for every $e\in S$,

$$
\begin{aligned}
W^n(a\otimes e)&=a\otimes T_{a,n}e,\\
W^n(b\otimes e)&=b\otimes T_{b,n}e
\qquad(0\le n\le N).
\end{aligned}
$$

Unitarity makes each $T_{a,n},T_{b,n}:S\to E$ an isometry; $T_{a,0}$ and $T_{b,0}$ are the support inclusion. This diagonalizes the given arbitrary $\sigma$, without assuming it is diagonal in a prescribed basis or increasing the environment dimension by purification.

**One actual evolution makes the histories compatible.** Set

$$
F_a=\operatorname{span}\{T_{a,n}S:0\le n<N\}.
$$

On each generating vector the actual $W$ satisfies

$$
W(a\otimes T_{a,n}e)=a\otimes T_{a,n+1}e.
$$

Thus $W$ maps $a\otimes F_a$ into $a\otimes E$, defining a single linear isometry $L_a:F_a\to E$ with $L_aT_{a,n}e=T_{a,n+1}e$. Any linear combination of history vectors that vanishes still vanishes after applying the actual linear operator $W$. The assignment therefore respects every linear relation; compatibility of histories chosen independently at different times is not an extra assumption. Since $F_a$ and $L_a(F_a)$ have equal dimensions, their orthogonal complements in $E$ also have equal dimensions. Choosing an isometric bijection between these complements extends $L_a$ to a unitary $A$ on $E$. The same construction on the $b$ branch gives a unitary $B$. Induction yields

$$
A^ne=T_{a,n}e,\qquad B^ne=T_{b,n}e
\quad(e\in S,\ 0\le n\le N).
$$

These auxiliary operators reproduce only the occupied support histories within the window; they do not supply a global controlled decomposition of $W$.

**Coherence becomes a finite sum of unit-circle frequencies.** Define the auxiliary sequence $f_n=\Tr(A^n\sigma B^{-n})$ for $n\ge0$. Within the window, the partial trace of the actual off-diagonal input gives

$$
\begin{aligned}
\langle a,\Psi_n(O)b\rangle
&=\sum_j s_j\langle B^ne_j,A^ne_j\rangle\\
&=\Tr(A^n\sigma B^{-n})=f_n=\lambda^n.
\end{aligned}
$$

Outside the window this auxiliary sequence need not equal the actual readings from $W$. Spectrally decompose $A=\sum_i u_iP_i$ and $B=\sum_j v_jQ_j$, with $|u_i|=|v_j|=1$. Then

$$
\begin{aligned}
f_n&=\sum_{i,j}c_{ij}(u_i\overline{v_j})^n,\\
c_{ij}&=\Tr(P_i\sigma Q_j).
\end{aligned}
$$

These weights can be complex and cannot be treated as nonnegative probabilities. For arbitrary densities one also cannot directly reuse the positive Gram matrix and orthogonal-innovation argument for a maximally mixed state. Combine equal frequencies and discard terms whose combined weight is zero to obtain $f_n=\sum_{\ell=1}^K\alpha_\ell\omega_\ell^n$, where $|\omega_\ell|=1$. Each unitary has at most $d$ distinct eigenvalues, and $f_0=\Tr\sigma=1$ ensures at least one term remains. Hence $1\le K\le d^2$.

Finite Prony annihilation needs only the polynomial

$$
q(z)=\prod_{\ell=1}^K(z-\omega_\ell)=\sum_{j=0}^K q_jz^j.
$$

Substitution gives $\sum_{j=0}^Kq_jf_j=\sum_\ell\alpha_\ell q(\omega_\ell)=0$, without positive weights. If $N\ge K$, the geometric values within the window would give $q(\lambda)=0$. This is impossible: all roots of $q$ lie on the unit circle, whereas $|\lambda|<1$. Thus $N<K\le d^2$, or $N+1\le d^2$. Zero and negative $\lambda$ are included: the zeroth power is always $1$, and at $\lambda=0$ one has $q(0)=(-1)^K\prod_\ell\omega_\ell\ne0$. The endpoints $\lambda=\pm1$ violate strict contraction, so this contradiction does not apply there.

For qubit dephasing take $m=2,a=e_0,b=e_1$: the diagonal pure states stay fixed and the off-diagonal entries acquire the factor $\lambda^n$, exactly as required. Consequently, at $d=2$ one has $N\le3$: no initial environment density can support an exact common prefix through the fourth step. This is a necessary bound for the stated autonomous model; qutrit attainment for four steps is given separately in [@rem-four-step-qutrit]. The bound alone supplies no exact minimum environment dimension for general windows, general attainability, approximate error bound, or physical realization of arbitrary spectral moment data, and it is not a universal physical law. Unperturbed marginal channel identities likewise do not determine the full joint-state histories of a retained environment or a process tensor with intermediate interventions. The formal status of this generic application remains unsettled; verification of its components does not make it a Lean-verified statement.
:::

::: {.remark #rem-four-step-qutrit title="Four Common Steps with a Qutrit Environment (Written Derivation)"}

**Ordinary written derivation, not formalized in this book.** The preceding necessary bound excludes a two-level environment for four steps but supplies no three-level realization. Split the environment into a stationary line and a rotating two-dimensional block. The line contributes a constant; the trace overlap of two conditional rotations contributes two cosines. With suitable angles and weights, the first four nontrivial powers of one six-dimensional unitary produce the required geometric coherence. The rotating block is a complex two-dimensional subspace, and the trace overlap is an algebraic mechanism; no random environment is refreshed over time.

**Objects and quantifiers.** Fix any real $-1<\lambda<1$, with system $S=\mathbb C^2$ and environment $E=\mathbb C^3$. For every complex matrix $X=(x_{ij})\in M_2(\mathbb C)$, define

$$
\mathcal D_\lambda(X)=
\begin{pmatrix}x_{00}&\lambda x_{01}\\\lambda x_{10}&x_{11}\end{pmatrix},
\qquad \mathcal D_\lambda^0=\operatorname{id}.
$$

This map is also $\frac{1+\lambda}{2}X+\frac{1-\lambda}{2}Z_SXZ_S$, where $Z_S=\operatorname{diag}(1,-1)$, so zero and negative $\lambda$ also define channels. For each fixed $\lambda$, we choose $W,\sigma$ once, then cover every input and all $n=0,1,2,3,4$ simultaneously. The realization is not chosen anew for each input or time. The zeroth power is $1$, including at $\lambda=0$.

**Explicit parameters.** All parameters below depend only on $\lambda$:

$$
\begin{aligned}
D&=\sqrt{\lambda^2+2\lambda+5},&
p&=\frac{1+\lambda}{5-3\lambda},\\
k&=\frac{2\lambda}{D},&r&=\sqrt{1-k^2},\\
x_+&=\frac{\lambda-1+D}{4},&x_-&=\frac{\lambda-1-D}{4},\\
\theta_+&=\arccos x_+,&\theta_-&=\arccos x_-,\\
\alpha&=\frac{\theta_++\theta_-}{2},&
\beta&=\frac{\theta_--\theta_+}{2}.
\end{aligned}
$$

Every denominator and square root has a specified domain. Since $D^2=(\lambda+1)^2+4>0$ and $5-3\lambda>2$,

$$
\begin{aligned}
0<p<1,\qquad 1-p&=\frac{4(1-\lambda)}{5-3\lambda}>0,\\
1-k^2&=\frac{(\lambda+1)(5-3\lambda)}{D^2}>0.
\end{aligned}
$$

Thus $-1<k<1$ and $r>0$. The nodes are the roots of $q(x)=x^2-\frac{\lambda-1}{2}x-\frac{\lambda+1}{4}$. The signs $q(-1)=(\lambda+1)/4>0$, $q(0)=-(\lambda+1)/4<0$, and $q(1)=(5-3\lambda)/4>0$ give $-1<x_-<0<x_+<1$. Both inverse cosines therefore lie in $(0,\pi)$, with $\alpha-\beta=\theta_+$ and $\alpha+\beta=\theta_-$.

**Fixed matrices.** On the two-dimensional environment block, write the Pauli matrices as $Z,X_P$ to distinguish them from the arbitrary system input $X$:

$$
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
X_P=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
H=kZ+rX_P.
$$

On $E=\mathbb C\oplus\mathbb C^2$, take

$$
\begin{aligned}
A&=1\oplus A_2,\qquad A_2=\cos\alpha\,I_2+\mathrm i\sin\alpha\,Z,\\
B&=1\oplus B_2,\qquad B_2=\cos\beta\,I_2+\mathrm i\sin\beta\,H,\\
A&=\begin{pmatrix}
1&0&0\\0&e^{\mathrm i\alpha}&0\\0&0&e^{-\mathrm i\alpha}
\end{pmatrix},\\
B&=\begin{pmatrix}
1&0&0\\
0&\cos\beta+\mathrm i k\sin\beta&\mathrm i r\sin\beta\\
0&\mathrm i r\sin\beta&\cos\beta-\mathrm i k\sin\beta
\end{pmatrix},\\
\sigma&=\operatorname{diag}\left(p,\frac{1-p}{2},\frac{1-p}{2}\right).
\end{aligned}
$$

Let $P_0=\lvert0\rangle\langle0\rvert$ and $P_1=\lvert1\rangle\langle1\rvert$ be system projections, and define the single joint unitary used throughout:

$$
W=P_0\otimes A+P_1\otimes B
=\begin{pmatrix}A&0_3\\0_3&B\end{pmatrix}
\quad\text{on }\mathbb C^2\otimes\mathbb C^3.
$$

Here $W$ is a $6\times6$ matrix. The identities $Z^*=Z$, $X_P^*=X_P$, $Z^2=X_P^2=I_2$, and $ZX_P+X_PZ=0$ give $H^*=H$ and $H^2=(k^2+r^2)I_2=I_2$. Every self-adjoint involution $K$ satisfies $(\cos t\,I+\mathrm i\sin t\,K)(\cos t\,I-\mathrm i\sin t\,K)=I$, so $A,B,W$ are unitary. The three diagonal entries of $\sigma$ are strictly positive and sum to $1$. Thus $\sigma$ is a full-rank density and commutes with $A,B$. Full rank is a choice for this witness, not a hypothesis on all realizations; the controlled form is likewise this construction, not a restriction on arbitrary $W$ in the preceding necessary bound.

**How the common powers produce two cosines.** Multiplication and the angle addition formulas give, by induction for a self-adjoint involution,

$$
\begin{aligned}
A_2^n&=\cos(n\alpha)I_2+\mathrm i\sin(n\alpha)Z,\\
B_2^{-n}&=\cos(n\beta)I_2-\mathrm i\sin(n\beta)H
\qquad(n\ge0).
\end{aligned}
$$

Using $\Tr Z=\Tr H=0$ and $\Tr(ZH)=2k$, the actual coherence multiplier is

$$
\begin{aligned}
f_n&=\Tr(A^n\sigma B^{-n})=p+(1-p)g_n,\\
g_n&=\tfrac12\Tr(A_2^nB_2^{-n})\\
&=\cos(n\alpha)\cos(n\beta)+k\sin(n\alpha)\sin(n\beta)\\
&=w\cos(n\theta_+)+(1-w)\cos(n\theta_-),\\
w&=\frac{1+k}{2}=\frac12+\frac{\lambda}{D}\in(0,1).
\end{aligned}
$$

This keeps the order $A^nB^{-n}$; it does not replace that product by $(AB^{-1})^n$ or require $A,B$ to commute. Let $T_n$ be the first-kind Chebyshev polynomial, with $T_n(\cos\theta)=\cos(n\theta)$. Then $g_n=wT_n(x_+)+(1-w)T_n(x_-)$.

**Exact moments for the first four steps.** Put $M_j=wx_+^j+(1-w)x_-^j$. The quadratic equation for the nodes gives

$$
\begin{aligned}
M_0&=1,\qquad M_1=\frac{3\lambda-1}{4},\\
M_{j+2}&=\frac{\lambda-1}{2}M_{j+1}
+\frac{\lambda+1}{4}M_j\qquad(j\ge0).
\end{aligned}
$$

Substituting the recurrence into $T_0=1$, $T_1=x$, $T_2=2x^2-1$, $T_3=4x^3-3x$, and $T_4=8x^4-8x^2+1$ gives each value explicitly:

$$
\begin{aligned}
g_0&=1,\\
g_1&=\frac{3\lambda-1}{4},\\
g_2&=\frac{3\lambda^2-2\lambda-1}{4},\\
g_3&=\frac{3\lambda^3-2\lambda^2-2\lambda-1}{4},\\
g_4&=\frac{3\lambda^4-2\lambda^3-2\lambda^2-2\lambda-1}{4}.
\end{aligned}
$$

For $1\le n\le4$, these have the common expression $4g_n=3\lambda^n-2\sum_{j=1}^{n-1}\lambda^j-1$, with an empty sum equal to zero. Using $(1-\lambda)\sum_{j=1}^{n-1}\lambda^j=\lambda-\lambda^n$, without dividing by $\lambda$, yields

$$
\begin{aligned}
f_0&=p+(1-p)=1,\\
f_n&=\frac{1+\lambda+4(1-\lambda)g_n}{5-3\lambda}
=\lambda^n\qquad(1\le n\le4).
\end{aligned}
$$

For example, at $\lambda=0$ one has $p=1/5$, $k=0$, $r=1$, and $x_\pm=(-1\pm\sqrt5)/4$. The same formulas give $(f_0,f_1,f_2,f_3,f_4)=(1,0,0,0,0)$ directly. Negative $\lambda$ uses the same formulas and identities, with no separate change in the dynamics.

**From the scalar to the entire channel.** Write $E_{ij}=\lvert i\rangle\langle j\rvert$. Orthogonality of the system projections gives $W^n=P_0\otimes A^n+P_1\otimes B^n$. The environmental trace on each diagonal matrix unit is $1$; the off-diagonal units acquire $f_n$ and $\overline{f_n}$. Hence for every $X\in M_2(\mathbb C)$,

$$
\begin{aligned}
\Psi_n(X)&:=\Tr_E\bigl(W^n(X\otimes\sigma)W^{-n}\bigr)\\
&=\begin{pmatrix}x_{00}&f_nx_{01}\\\overline{f_n}x_{10}&x_{11}\end{pmatrix}\\
&=\mathcal D_\lambda^n(X)=\mathcal D_{\lambda^n}(X)
\qquad(0\le n\le4).
\end{aligned}
$$

For any positive integer $s$ and finite untouched reference $R=\mathbb C^s$, expand an arbitrary system–reference matrix as $Y=\sum_{a,b}X_{ab}\otimes F_{ab}$, where $F_{ab}$ are reference matrix units. In the $S\otimes R\otimes E$ order used by $Y\otimes\sigma$, explicitly define the canonical unitary permutation and the actual evolution:

$$
\begin{aligned}
J&:S\otimes R\otimes E\longrightarrow S\otimes E\otimes R,\\
J(u\otimes v\otimes z)&=u\otimes z\otimes v,\\
\widehat{W}&=J^{-1}(W\otimes I_R)J,\\
\widehat{W}^{\,n}&=J^{-1}(W^n\otimes I_R)J.
\end{aligned}
$$

The permutation fixes the tensor notation; $\widehat{W}$ acts as the identity on the reference and always uses the same $W$. Applying the preceding identity to each $X_{ab}$ gives

$$
\begin{aligned}
&\Tr_E\bigl[\widehat{W}^{\,n}(Y\otimes\sigma)
\widehat{W}^{-n}\bigr]\\
&\qquad=(\mathcal D_\lambda^n\otimes\operatorname{id}_R)(Y)
\qquad(0\le n\le4).
\end{aligned}
$$

This includes every possibly entangled system–reference density. The initial environment must be independent of the system–reference input. It is prepared once, and the same $W,E,\sigma$ serves every time, with no intermediate intervention, reset, environment replacement, or external clock control. No later refactorization of the joint state is assumed.

**Known scalar method and realization limits.** The nodes $1,x_+,x_-$ and weights $p,(1-p)w,(1-p)(1-w)$ are related to the three-node Gauss–Radau endpoint rule for Poisson–Chebyshev moments: these three nodes match every polynomial moment of degree at most four. This is a known scalar moment method. The evidence here is the direct formulas and the $1+2$ block realization above, rather than an unchecked quadrature theorem. Arbitrary scalar quadrature nodes and weights need not be realizable by common unitary powers in a prescribed environment dimension. See the [account of Radau quadrature](https://mathworld.wolfram.com/RadauQuadrature.html) for the known method; no worldwide mathematical novelty is claimed for this construction.

Combining this construction with the still unformalized arbitrary-density bound in [@rem-arbitrary-density-prefix], $N=4$ gives $5\le d^2$, excluding $d\le2$, while the construction attains $d=3$. Thus, for every $-1<\lambda<1$, the minimum four-step environment dimension, allowing any initial environment density, is $3$ at the level of ordinary written derivation in this precisely defined autonomous qubit dephasing model. This is not a Lean minimality result. The full channel and reference identities remain unformalized; existing Lean checks cover only some parameter, matrix, and trace identities and do not verify the full conclusion. The construction and partial formal evidence are documented in the [result note for trureturing #31054](https://github.com/the-omega-institute/trureturing/issues/31054#issuecomment-6903256672).

Continuing the same recurrence to $T_5=16x^5-20x^3+5x$ gives

$$
\begin{aligned}
g_5&=\frac{3\lambda^5-2\lambda^4-2\lambda^3-5\lambda^2+4}{4},\\
f_5-\lambda^5&=1-\lambda^2>0.
\end{aligned}
$$

Thus these matrices fail at the fifth step; they do not exclude another qutrit construction. Exact minimum dimensions for general windows, realization of general compatible trace moments, and the full approximate resource–error tradeoff remain unresolved; the next remark preserves the weighted history interface under small leakage. This construction does not extend to the balanced ten-dimensional source channel. It supplies neither a full retained-environment joint-history identity nor a process-tensor identity with inserted interventions, and it establishes no experimental support or model universality.

**What finite unitary dilation still leaves to prove.** Literature result, not formalized in this book. Farenick's [finite-power unitary dilation theorem, Corollary 3.2](https://doi.org/10.1007/s44146-024-00170-6), represents any prescribed finite window of powers of a contraction as compressions of the powers of one unitary on a containing space. If the original space is finite-dimensional, the dilating space can also be chosen finite-dimensional. The theorem permits a choice of dilating space; it does not fix the three-dimensional environment required here or supply one pair of branch unitaries and one positive semidefinite initial state. Finite-power dilatability therefore does not yet answer the fifth-step question. The missing construction must preserve these common-realization constraints, beyond the existence of scalar moments.

:::

::: {.remark #rem-weighted-history-stability title="Weighted histories under small leakage with fixed unitaries (written derivation)"}

**Ordinary written derivation, not formalized in this book.** View the joint evolution as motion between two system branches. Compression back into a branch can shorten a vector; the escaped part remains in the actual joint history and may return later. Polar decomposition separates this compression into a positive shortening and a unitary motion. Even with zero directions, the unitary motion can be completed within the original environment. A single such motion follows the actual history, with errors accumulating additively in the number of steps. This remark preserves the [existing complete ordinary argument](https://github.com/the-omega-institute/trureturing/issues/31078#issuecomment-6904102516), without asserting a new formal result.

**Objects, norms, and quantifiers.** Let $d,N\ge1$ be arbitrary integers, take a unitary on $\mathbb C^2\otimes\mathbb C^d$, denoted $W\in M_{2d}(\mathbb C)$, and let $\sigma\in M_d(\mathbb C)$ be any positive semidefinite matrix of trace one. A star denotes the adjoint. For any rectangular complex matrix $M$, the Hilbert–Schmidt and operator norms mean, respectively,

$$
\begin{aligned}
\|M\|_{\mathrm{HS}}^2&=\Tr(M^*M)=\sum_{i,j}|M_{ij}|^2,\\
\|M\|_{\mathrm{op}}&=\sup_{\|v\|_2\le1}\|Mv\|_2.
\end{aligned}
$$

The operator norm measures the largest amplification of a vector. Calling a block a contraction below means that its operator norm is at most one, rather than imposing a bound of one on its Hilbert–Schmidt norm. With $e_0,e_1$ the standard system basis, define

$$
\begin{aligned}
S&=\sqrt{\sigma}\in M_d(\mathbb C),\qquad S^*=S,\quad S^2=\sigma,\\
J_b&:\mathbb C^d\longrightarrow\mathbb C^2\otimes\mathbb C^d,
\qquad J_bv=e_b\otimes v,\\
P_b&=J_bJ_b^*,\qquad Q_b=I_{2d}-P_b
\qquad(b\in\{0,1\}),\\
L_N&=\max_{\substack{b\in\{0,1\}\\0\le k\le N}}
\|Q_bW^kJ_bS\|_{\mathrm{HS}}^2,\qquad
\epsilon=\sqrt{L_N}.
\end{aligned}
$$

Here $k$ is an integer. The matrices $P_b,Q_b\in M_{2d}(\mathbb C)$ are orthogonal projections, $J_b^*J_b=I_d$, and $\|S\|_{\mathrm{HS}}^2=\Tr\sigma=1$. The quantity $L_N$ uses the **actual weighted history** of the same $W,\sigma$ on both branches from time zero through time $N$. It is neither one-step leakage, a collection of separately chosen realizations, nor an unweighted operator norm. For every set of these data, the original $\mathbb C^d$ admits unitaries $A_0,A_1$ that, once chosen, simultaneously satisfy for every integer $0\le n\le N$

$$
\max_{\substack{b\in\{0,1\}\\0\le n\le N}}
\|W^nJ_bS-J_bA_b^nS\|_{\mathrm{HS}}
\le4N\sqrt{L_N}.
$$

The constant $4$ is independent of $d,N,W,\sigma$; no optimality is claimed. The full derivation follows.

**Compression and one polar completion.** Fix either branch $b\in\{0,1\}$, abbreviate $J=J_b,P=P_b,Q=Q_b$, and define blocks on the original spaces by

$$
\begin{aligned}
K&=J^*WJ\in M_d(\mathbb C),&
R&=QWJ\in M_{2d\times d}(\mathbb C),\\
B&=J^*WQ\in M_{d\times2d}(\mathbb C),&
E&=QWQ\in M_{2d}(\mathbb C).
\end{aligned}
$$

Since $J$ is an isometry, $Q$ an orthogonal projection, and $W$ unitary, the operator norms of $K,R,B,E$ are at most one. In particular, left multiplication by either of $B,E$ cannot increase the Hilbert–Schmidt norm of a matrix with compatible rows: apply vector contraction to each column and sum the squared norms. Direct block multiplication gives

$$
\begin{aligned}
K^*K+R^*R
&=J^*W^*(P+Q)WJ\\
&=J^*W^*WJ=I_d.
\end{aligned}
$$

Finite-dimensional square polar decomposition admits a unitary completion even in the singular case:

$$
K=AH,\qquad A^*A=AA^*=I_d,\qquad
H=(K^*K)^{1/2},\qquad 0\le H\le I_d.
$$

Here $A,H\in M_d(\mathbb C)$. Each of the eigenvalues of $H$, denoted $h$, is nonnegative and satisfies $h^2\le1$, hence satisfies $h\in[0,1]$. Choose $A$ once from the fixed matrix $K$. The static polar step is supported by Higham, *Computing the Polar Decomposition—with Applications*, DOI [10.1137/0907079](https://doi.org/10.1137/0907079), [full text](https://eprints.maths.manchester.ac.uk/694/1/high86p.pdf), Theorem 1.1 and Lemma 2.1. These supply square unitary completion and identify the positive square root; they do not supply the weighted history bound below.

**Polar error for any rectangular weight.** In a unitary eigenbasis of $H$, the eigenvalues of $2H(I_d-H)$ are $2h(1-h)\ge0$, so

$$
D:=(I_d-H^2)-(I_d-H)^2=2H(I_d-H)\ge0.
$$

For every natural number $r$ and every rectangular matrix $X\in M_{d\times r}(\mathbb C)$, congruence gives $X^*DX\ge0$, with nonnegative trace equal to the sum over columns $x_j$ of their quadratic forms $\sum_j x_j^*Dx_j$. Thus, without requiring $X$ to commute with $H$, we obtain

$$
\begin{aligned}
\|(K-A)X\|_{\mathrm{HS}}^2
&=\Tr\bigl(X^*(I_d-H)^2X\bigr)\\
&\le\Tr\bigl(X^*(I_d-H^2)X\bigr)\\
&=\Tr(X^*R^*RX)=\|RX\|_{\mathrm{HS}}^2.
\end{aligned}
$$

The first equality uses $K-A=A(H-I_d)$ and $A^*A=I_d$; the last uses $I_d-H^2=R^*R$. Traces of the positive semidefinite matrices here are real. In particular, set $T_k=J^*W^kJ\in M_d(\mathbb C)$ and substitute the actual weight $X=T_kS$. Since $S^2=\sigma$, cyclicity of trace gives

$$
\begin{aligned}
\|(K-A)T_kS\|_{\mathrm{HS}}^2
&=\Tr\bigl(\sigma T_k^*(I_d-H)^2T_k\bigr)\\
&\le\Tr\bigl(\sigma T_k^*(I_d-H^2)T_k\bigr)\\
&=\|RT_kS\|_{\mathrm{HS}}^2.
\end{aligned}
$$

This comparison uses positive semidefinite congruence followed by trace. Factors are moved only cyclically inside the trace; $\sigma,T_k,H$ are never commuted, and no eigenvalue of $\sigma$ is divided out.

**Recurrence along the actual trajectory.** For every integer $0\le k\le N$, define

$$
\begin{aligned}
x_k&=J^*W^kJS=T_kS\in M_d(\mathbb C),\\
y_k&=QW^kJS\in M_{2d\times d}(\mathbb C),\\
W^kJS&=Jx_k+y_k,\qquad Qy_k=y_k,\\
x_0&=S,\qquad y_0=0,\qquad
\|y_k\|_{\mathrm{HS}}\le\epsilon.
\end{aligned}
$$

Apply the same $W$ to this decomposition and project onto its two components. For every integer $0\le k<N$ this gives

$$
\begin{aligned}
x_{k+1}&=Kx_k+By_k,\\
y_{k+1}&=Rx_k+Ey_k,\\
\|Rx_k\|_{\mathrm{HS}}
&=\|y_{k+1}-Ey_k\|_{\mathrm{HS}}\\
&\le\|y_{k+1}\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le2\epsilon.
\end{aligned}
$$

Put $r_k=x_{k+1}-Ax_k\in M_d(\mathbb C)$. Apply the rectangular comparison to the actual matrix $X=x_k$ and use contraction by $B$ to obtain

$$
\begin{aligned}
r_k&=(K-A)x_k+By_k,\\
\|r_k\|_{\mathrm{HS}}
&\le\|(K-A)x_k\|_{\mathrm{HS}}+\|By_k\|_{\mathrm{HS}}\\
&\le\|Rx_k\|_{\mathrm{HS}}+\|y_k\|_{\mathrm{HS}}
\le3\epsilon.
\end{aligned}
$$

**Additive telescoping with a fixed unitary.** Fix an integer $1\le n\le N$ and put $f(k)=A^{n-k}x_k$ for $0\le k\le n$. For $k<n$, we have

$$
\begin{aligned}
f(k+1)-f(k)&=A^{n-1-k}(x_{k+1}-Ax_k)
=A^{n-1-k}r_k,\\
x_n-A^nS&=f(n)-f(0)
=\sum_{k=0}^{n-1}A^{n-1-k}r_k,\\
\|x_n-A^nS\|_{\mathrm{HS}}
&\le\sum_{k=0}^{n-1}\|r_k\|_{\mathrm{HS}}
\le3n\epsilon.
\end{aligned}
$$

This sums consecutive matrix differences in the additive group and uses invariance of the Hilbert–Schmidt norm under unitary left multiplication. Finally, the isometry $J$ and the triangle inequality give

$$
\begin{aligned}
\|W^nJS-JA^nS\|_{\mathrm{HS}}
&=\|J(x_n-A^nS)+y_n\|_{\mathrm{HS}}\\
&\le3n\epsilon+\epsilon=(3n+1)\epsilon\\
&\le4N\epsilon\qquad(1\le n\le N).
\end{aligned}
$$

The last step uses $3n+1\le3N+1\le4N$; at $n=0$ the error is exactly zero. Choose the two polar completions $A_0,A_1$ independently and use their common $\epsilon=\sqrt{L_N}$ to obtain the stated maximum bound.

**Scope and remaining boundary.** If $L_N=0$, all errors are exactly zero; the argument never divides by $\epsilon$. It includes rank-deficient $\sigma$ and $\sigma$ with arbitrarily small positive eigenvalues: it uses only $S=\sqrt\sigma$, with no inverse, full-rank condition, or spectral gap. The environment remains the original $\mathbb C^d$, with no purification, enlargement, reset, intervention, or time-dependent $A_b$, and no assumption of later factorization of the joint state. The compression $K$ need not be normal. No identification of $T_k$ with $K^k$ is made; excursions and returns remain in the actual $y_k$.

Static polar completion and positivity of positive semidefinite trace pairing are reusable supplies in the existing sources and are not counted here as new mathematics. A complete Lean formalization of the result has not been verified; the ordinary derivation does not constitute Lean verification. This history interface also supplies no uniform quantitative comparison with the target dephasing channel in diamond norm or over arbitrary finite untouched references, and no quantitative lower bound or realizing upper construction for actually realizable common-power frequency histories. The full resource–error tradeoff for general windows remains open. No successor event is selected or proved here, and no worldwide novelty or physical universality is claimed.

:::

::: {.remark #rem-maxmixed-saturation-obstruction title="A capacity obstruction to saturated moments for a maximally mixed environment (ordinary derivation)"}

**Ordinary derivation, not formalized in this book.** The preceding dimension bound allows the number of samples to equal the dimension of the matrix space, but does not guarantee that this boundary is attainable. The obstruction is one of capacity: a first moment close to one requires almost all the probability to lie in a short arc of the unit circle. Saturation of the moment conditions allows at most two nodes in that arc, while a maximally mixed initial state caps the probability at each node. The following gives the full finite-dimensional argument from the [original result and its scope](https://github.com/the-omega-institute/trureturing/issues/31099#issuecomment-6904917000).

**Objects and the proposed saturation.** Fix an integer $d\ge2$ and a real number $0<r<1$, and put $m=d^2$. On the same $\mathbb C^d$, let $A,B\in U(d)$ be any two unitaries; they need not commute. Define the normalized trace sequence of their common powers, and suppose that it matches the saturated window:

$$
f_n=\frac1d\operatorname{Tr}(A^nB^{-n})=r^n
\qquad(0\le n\le m-1).
$$

All step indices here and below are integers. The aim is a necessary inequality for this condition and an explicit parameter that violates it, rather than a classification of optimal dimensions for all windows.

**Spectral weights and support.** Diagonalize each unitary, allowing repeated eigenvalues:

$$
\begin{aligned}
A&=V\operatorname{diag}(a_0,\ldots,a_{d-1})V^*,\\
B&=W\operatorname{diag}(b_0,\ldots,b_{d-1})W^*,\qquad U=V^*W,\\
z_{ij}&=a_i\overline{b_j},\qquad |z_{ij}|=1,\\
w_{ij}&=\frac{|U_{ij}|^2}{d},\qquad
0\le w_{ij}\le\frac1d,\qquad
\sum_{i,j=0}^{d-1}w_{ij}=1,\\
\mu&=\sum_{i,j=0}^{d-1}w_{ij}\delta_{z_{ij}},\qquad
f_n=\int z^n\,\mathrm d\mu(z).
\end{aligned}
$$

The star denotes conjugate transpose, and $\delta_z$ is unit point mass at $z$. Expanding the trace gives the last identity. The squared moduli in each row of a unitary sum to one, giving both the total weight and the bound on each entry. Thus $\mu$ is a positive probability measure supported on at most $m$ points. At this stage, however, coincident ratios could merge into an atom of mass larger than $1/d$. Distinctness must be proved before applying the node capacity. Since the weights are real and nonnegative, conjugation determines the negative moments:

$$
\int z^q\,\mathrm d\mu(z)=r^{|q|}
\qquad(-(m-1)\le q\le m-1).
$$

**Saturation forces every node to be present and distinct.** Use the measure-induced positive semidefinite pairing $\langle p,q\rangle_\mu=\int\overline{p(z)}q(z)\,\mathrm d\mu(z)$. The monomial Gram matrix is

$$
T_{jk}=\langle z^j,z^k\rangle_\mu=r^{|j-k|}
\qquad(0\le j,k\le m-1).
$$

Replace the basis by the constant $1$ and $g_k(z)=z^k-rz^{k-1}$ for $1\le k\le m-1$. This triangular change of basis has ones on its diagonal. Direct substitution of the known moments gives

$$
\begin{aligned}
\langle1,g_k\rangle_\mu&=r^k-r\,r^{k-1}=0,\\
\langle g_j,g_k\rangle_\mu
&=r^{k-j}-r\,r^{k-j-1}-r\,r^{k-j+1}
+r^2r^{k-j}=0\quad(1\le j<k\le m-1),\\
\|1\|_\mu^2&=1,\qquad
\|g_k\|_\mu^2=1-2r^2+r^2=1-r^2>0.
\end{aligned}
$$

Thus $T$ is positive definite and has rank $m$. If merging coincident atoms and removing zero masses leaves $K$ support points, the Gram matrix factors through evaluation at those points and has rank at most $K$. Hence $m\le K\le m$. There were only $m$ index pairs to begin with, so every $w_{ij}>0$ and all the $z_{ij}$ are distinct. Each actual atom now has its original mass $w_{ij}\le1/d$. Repeated eigenvalues or zero overlaps provide no hidden exception: they would reduce the support and are excluded by full rank.

**The node polynomial uses only the given moment orders.** Write these $m$ nodes as $\zeta_1,\ldots,\zeta_m$, and define the monic annihilating polynomial and the linear functionals

$$
\begin{aligned}
P(z)&=\prod_{\ell=1}^{m}(z-\zeta_\ell),\\
L_k(F)&=\int z^{-k}F(z)\,\mathrm d\mu(z)
\qquad(1\le k\le m-1,\ \deg F\le m).
\end{aligned}
$$

Since $P$ vanishes on the support, every $L_k(P)=0$. On $\operatorname{span}(z,\ldots,z^{m-1})$, the matrix of these functionals is the corresponding positive definite principal submatrix of $T$, so their joint rank is $m-1$. The space of polynomials of degree at most $m$ has dimension $m+1$, and the common kernel therefore has dimension two. Two linearly independent polynomials in it are

$$
\begin{aligned}
Q(z)&=z^m-rz^{m-1},\qquad R(z)=1-rz,\\
L_k(Q)&=r^{m-k}-r\,r^{m-1-k}=0,\\
L_k(R)&=r^k-r\,r^{k-1}=0
\qquad(1\le k\le m-1).
\end{aligned}
$$

Their different degrees make them linearly independent. Comparing leading coefficients gives $P=Q+cR$. Since every root has modulus one, the constant term satisfies $|c|=|P(0)|=\prod_{\ell=1}^m|\zeta_\ell|=1$. Each node therefore satisfies

$$
z^{m-1}\frac{z-r}{1-rz}=\tau,\qquad
\tau=-c,\qquad |\tau|=1.
$$

The denominator is nonzero because $|rz|=r<1$. In particular, although $Q$ has degree $m$, the highest moment order in $L_k(Q)$ is only $m-1$. No moment of order $m$ or higher has been used.

**A short closed arc contains at most two nodes.** Set

$$
\theta=\frac{\pi}{2(m-1)},\qquad
\mathcal A_\theta=\{e^{\mathrm it}: -\theta\le t\le\theta\}.
$$

On this arc choose the following continuous argument; the half-angle identity directly verifies that its exponential equals the indicated quotient:

$$
\begin{aligned}
\beta(t)&=2\arctan\left(\frac{1+r}{1-r}\tan\frac t2\right),\\
e^{\mathrm i\beta(t)}&=\frac{e^{\mathrm it}-r}{1-re^{\mathrm it}},\\
\beta'(t)&=\frac{1-r^2}{1-2r\cos t+r^2}>0
\qquad(-\theta\le t\le\theta).
\end{aligned}
$$

Since $d\ge2$, the whole arc lies strictly within $-\pi<t<\pi$, where this tangent is continuous. The real arctangent takes values strictly between $-\pi/2$ and $\pi/2$, so $\beta(\theta)-\beta(-\theta)<2\pi$. Put $h(t)=(m-1)t+\beta(t)$. Then

$$
\begin{aligned}
h'(t)&=m-1+\beta'(t)>0,\\
h(\theta)-h(-\theta)
&=2(m-1)\theta+\beta(\theta)-\beta(-\theta)<3\pi.
\end{aligned}
$$

For $\tau$, fix any argument $\alpha$. The node equation becomes $h(t)=\alpha+2\pi k$, with $k\in\mathbb Z$. Strict monotonicity assigns distinct integers to distinct nodes. Three nodes would require a phase difference of at least $4\pi$ between the first and last, contradicting the variation bound. This count includes both endpoints of the arc. Consequently,

$$
\mu(\mathcal A_\theta)\le\frac2d,\qquad
\mu(\mathbb T\setminus\mathcal A_\theta)\ge1-\frac2d,
\qquad \mathbb T=\{z\in\mathbb C:|z|=1\}.
$$

**The necessary capacity inequality and an exact counterexample.** Outside the arc, $1-\operatorname{Re}z\ge1-\cos\theta$; on the whole circle this integrand is nonnegative. The first moment gives

$$
\begin{aligned}
1-r&=\int(1-\operatorname{Re}z)\,\mathrm d\mu(z)\\
&\ge\left(1-\frac2d\right)(1-\cos\theta)\\
&=\left(1-\frac2d\right)
\left(1-\cos\frac{\pi}{2(d^2-1)}\right).
\end{aligned}
$$

For each $d\ge3$, this is a nontrivial necessary condition for saturation with a maximally mixed state. Take $d=3$ and $r=999/1000$, so $m=9$ and $\theta=\pi/16$. Concavity of sine on $[0,\pi/2]$ places it above the chord between the endpoints: $\sin x\ge2x/\pi$. Hence

$$
\begin{aligned}
\sin\frac{\pi}{32}&\ge\frac1{16},\\
1-\cos\frac{\pi}{16}
&=2\sin^2\frac{\pi}{32}\ge\frac1{128},\\
1-r&\ge\frac13\cdot\frac1{128}=\frac1{384},\\
1-r&=\frac1{1000}<\frac1{384}.
\end{aligned}
$$

This is a contradiction. The same calculation can be read directly as a shortage of capacity:

$$
\begin{aligned}
\mu(\mathcal A_{\pi/16})
&\ge1-\frac{1-r}{1-\cos(\pi/16)}
\ge1-\frac{128}{1000}=\frac{109}{125},\\
\frac{109}{125}-\frac23&=\frac{77}{375}>0.
\end{aligned}
$$

Thus no pair $A,B\in U(3)$ satisfies $f_n=r^n$ for $0\le n\le8$. This excludes every unitary pair, including noncommuting pairs; it is not a failed parametrization or numerical optimization. The argument does not even use all the compatibility conditions imposed by the grid of spectral ratios and weights that are squared moduli of a unitary.

**Zero and negative parameters, and a two-level environment.** Replacing $A$ by $-A$ replaces $f_n$ by $(-1)^nf_n$, so the parameter $r=-999/1000$ is also impossible in the same dimension. Zero has a different boundary: a saturated window exists for every positive integer $d$. Set

$$
\begin{aligned}
m&=d^2,\qquad \omega=e^{2\pi\mathrm i/m},\\
a_i&=\omega^i,\qquad b_j=\omega^{-dj},\\
F_{ij}&=\frac1{\sqrt d}e^{2\pi\mathrm i\,ij/d}
\qquad(0\le i,j<d),\\
A&=\operatorname{diag}(a_0,\ldots,a_{d-1}),\qquad
B=F\operatorname{diag}(b_0,\ldots,b_{d-1})F^*.
\end{aligned}
$$

A finite geometric sum shows that the columns of the Fourier matrix $F$ are orthonormal, so it is unitary. Each squared modulus in the relative eigenbasis is $1/d$, giving weights $1/d^2=1/m$. The ratios $a_i\overline{b_j}=\omega^{i+dj}$ run through all the $m$th roots of unity. This also covers $d=1$, whose window has no positive step. Therefore,

$$
f_0=1,\qquad
f_n=\frac1m\sum_{q=0}^{m-1}\omega^{qn}=0
\qquad(1\le n\le m-1).
$$

At zero the zeroth power is taken to be one. For $d=2$, the capacity inequality is trivial because $1-2/d=0$, consistent with the existing three-step construction using a maximally mixed two-level environment. Its proof need not be repeated here.

**From trace moments to actual channels, and the converse reduction.** To distinguish the joint unitary from the eigenbasis matrix above, denote it by $\mathcal W$. Let the system be $\mathbb C^2$ and fix the initial environment state $\sigma=I_d/d$, independent of the input. For a controlled joint unitary and system matrix units, write

$$
\begin{aligned}
E_{ab}&=|a\rangle\langle b|\quad(a,b\in\{0,1\}),\\
\mathcal W&=E_{00}\otimes A+E_{11}\otimes B,\\
\Psi_n(X)&=\operatorname{Tr}_E\bigl(\mathcal W^n(X\otimes I_d/d)\mathcal W^{*n}\bigr),\\
\Psi_n(E_{00})&=E_{00},\qquad \Psi_n(E_{11})=E_{11},\\
\Psi_n(E_{01})&=f_nE_{01},\qquad
\Psi_n(E_{10})=\overline{f_n}E_{10}.
\end{aligned}
$$

Both diagonal coefficients are one, by unit trace; the off-diagonal identities follow directly from the environment partial trace. Matrix units form a linear basis of all system matrices, so these identities determine the entire map. For any finite untouched reference $R$, write any system–reference matrix as $Y=\sum_{a,b=0}^1E_{ab}\otimes Y_{ab}$. Each reference block $Y_{ab}$ is unchanged, while its system block acquires the coefficient above. This includes inputs entangling the system and reference, provided the environment is independent of the entire input. After the standard reordering of tensor factors, the actual common evolution acts on the system and environment and as the identity on the reference.

Conversely, this exclusion for a maximally mixed state is not confined to an assumed controlled form. Write any joint unitary as a two-by-two matrix of environment blocks $\mathcal W=(C_{ab})_{a,b=0}^1$. If the one-step map exactly preserves both basis-state projectors, its wrong-output populations are

$$
\begin{aligned}
0&=\langle1,\Psi_1(E_{00})1\rangle
=\frac1d\operatorname{Tr}(C_{10}C_{10}^*)
=\frac1d\|C_{10}\|_{\mathrm{HS}}^2,\\
0&=\langle0,\Psi_1(E_{11})0\rangle
=\frac1d\operatorname{Tr}(C_{01}C_{01}^*)
=\frac1d\|C_{01}\|_{\mathrm{HS}}^2.
\end{aligned}
$$

The squared Hilbert–Schmidt norm is the sum of the squared moduli of all entries, so $C_{10}=C_{01}=0$. Joint unitarity then makes $C_{00},C_{11}$ unitary, giving a pair $A,B$. Full rank of the maximally mixed state makes the zero-leakage constraint apply to the entire environment space. Thus, if an actual channel with the same three-dimensional maximally mixed environment were to realize, at $0\le n\le8$, the dephasing powers with parameter $r=999/1000$ for all inputs, the counterexample already excludes it on $E_{01}$. An untouched reference cannot restore feasibility.

**Scope.** The argument uses one joint unitary and one initial preparation throughout, with no environment reset, replacement, enlargement, time-dependent control, or intermediate intervention. It does not assume that later system–environment states factorize. For a general initial density $\sigma$, the spectral coefficients are $\operatorname{Tr}(P_i\sigma Q_j)$, where $P_i,Q_j$ are the respective spectral projections of the two unitaries. Those coefficients may be complex and have neither the positive-probability interpretation nor the node capacity used here. This remark therefore does not refute dimension-attainability claims that allow arbitrary initial densities. The inequality is necessary only; sufficiency and optimality have not been proved. It does not classify feasibility for general windows, supply an approximation lower bound, or determine full joint-state histories or laws under intermediate interventions.

Orthogonal polynomials on the unit circle provide a neighboring classical framework: see Barry Simon, [arXiv:math/0405111](https://arxiv.org/abs/math/0405111), §1 for the recurrence and §2.1(c) for the Bernstein–Szegő case. Those passages are not cited as a theorem supplying this entire obstruction to the restricted realization. All node, phase, and capacity arguments needed here have been given explicitly. No worldwide novelty or physical universality is claimed. No complete Lean proof of this conclusion is available for citation in the book; this ordinary derivation does not constitute kernel verification.

:::

::: {.theorem #thm-positive-interior-grid-algebraic-obstruction title="An algebraic obstruction for an interior spectral grid" lean="D5/S3/Quantum/Analysis/PositiveInteriorGridObstruction.positive_interior_grid_algebraic_obstruction"}
Fix $0<r<1$, take complex numbers $u,v$, and take real numbers $s,t$. The following relations are incompatible:

$$
\begin{aligned}
u+v&=2,\\
us+vt+st+3-3(s+t)&=0,\\
s&=|u|^2,\qquad t=|v|^2,\qquad |uv|^2=r^2.
\end{aligned}
$$

The Lean statement splits the first two complex equations into real and imaginary parts and expresses each squared modulus as a sum of squares in real coordinates.
:::

::: {.proof #pf-positive-interior-grid-algebraic-obstruction}
If $\operatorname{Im}u\ne0$, then $v=2-u$ and the imaginary part of the second equation give $s=t$. Equal squared moduli force $\operatorname{Re}u=1$, so $r=|uv|=s>1$. If $u$ is real, then $v$ is real as well. Set $q=uv$ and use $u+v=2$ to write $s+t=4-2q$, $us+vt=u^3+v^3=8-6q$, and $st=q^2$. The second equation reduces to $q^2=1$, contradicting $r<1$.

The full proof is checked by the Lean kernel.
:::

In the maximally mixed spectral grid above, suppose saturation identifies nine distinct ratio nodes as the roots of $P(z)=z^9-rz^8+\eta(1-rz)$. Newton's identities give the unweighted grid sums $S_k=r^k$ for $k=1,2,3$. Write the two triples of unit-circle factors as $a_i,d_j$, with $d_j=b_j^{-1}$, and set $x=\sum_i a_i$, $y=\sum_j d_j$, $\alpha=\prod_i a_i$, and $\beta=\prod_j d_j$. Since $xy=r$, we can set $u=x^2/(\alpha\overline{x})$ and $v=y^2/(\beta\overline{y})$. The two second power sums are $x^2-2\alpha\overline x$ and $y^2-2\beta\overline y$. The third power sums are $x^3-3\alpha|x|^2+3\alpha$ and $y^3-3\beta|y|^2+3\beta$. Set $s=|x|^2$ and $t=|y|^2$, so $s=|u|^2$, $t=|v|^2$, and $|uv|=r$. Dividing $S_2=r^2$ by $x^2y^2$ gives $(1-2/u)(1-2/v)=1$, hence $u+v=2$. Dividing $S_3=r^3$ by $x^3y^3$ and multiplying by $uvst$ gives

$$
(us-3s+3)(vt-3t+3)=uvst.
$$

Expanding and substituting $u+v=2$ in the term $st(u+v)$ gives $us+vt+st+3-3(s+t)=0$, the other complex equation in [@thm-positive-interior-grid-algebraic-obstruction].

The Lean reference covers the contradiction from the reduced equations. The passage from trace moments of one pair of qutrit unitaries to saturated nodes, the grid, and the reduced equations remains a written derivation. Feasibility for arbitrary initial densities and shorter windows requires separate arguments. [Upstream proof and scope](https://github.com/the-omega-institute/trureturing/pull/31199)
