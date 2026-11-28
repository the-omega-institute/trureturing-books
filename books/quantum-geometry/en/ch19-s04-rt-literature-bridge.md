# 19.4 From discrete bridge graphs to the RT literature {#sec-rt-literature-bridge}

Combining the universal upper bound $\operatorname{QMaxFlow} \le \operatorname{QMinCut}$ ([@prop-bridge-flow-cut-bound]) with the cone simplification $\operatorname{QMinCut} = \min(ad, bc)$ ([@cor-bridge-cone-mincut]) leaves the constructive lower bound: on the ordered cone domain $0 < a \le b$, $0 < c \le d$ with $a^2 + b^2 \le 3ab$ and $c^2 + d^2 \le 3cd$, does there always exist a pair $(M, N)$ whose bridge contraction achieves rank $\min(ad, bc)$?

The Lean module `D5.S3.Quantum.TensorNetworks.BridgeGraph.QuantumMaxFlowMinCut` proves this in full via [`result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result), where `claim` expands to the universal statement below.

::: {.theorem #thm-bridge-quantum-maxflow-mincut title="Discrete bridge-graph quantum max-flow min-cut" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result"}
For all natural numbers $a, b, c, d \in \mathbb{N}$ satisfying $0 < a$, $a \le b$, $0 < c$, $c \le d$, and the quadratic cone inequalities

$$
a^2 + b^2 \le 3ab \qquad\text{and}\qquad c^2 + d^2 \le 3cd,
$$

both equalities hold simultaneously:

$$
\operatorname{QMaxFlow}(a, b, c, d) = \operatorname{QMinCut}(a, b, c, d) \qquad\text{and}\qquad \operatorname{QMinCut}(a, b, c, d) = \min(ad, bc).
$$

:::

::: proof
The second equality $\operatorname{QMinCut}(a, b, c, d) = \min(ad, bc)$ is [@cor-bridge-cone-mincut], and the upper bound $\operatorname{QMaxFlow}(a, b, c, d) \le \operatorname{QMinCut}(a, b, c, d)$ is [@prop-bridge-flow-cut-bound]. To prove the equality $\operatorname{QMaxFlow}(a, b, c, d) = \min(ad, bc)$, `claim_of_hypotheses` in [`QuantumMaxFlowMinCut.result`](lean:D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result) applies strong induction (`Nat.strong_induction_on`) on the outer dimension sum $n = b + d$:

1. **Explicit rational witnesses for equal-width and mixed-ratio regimes (`widthTwo_proved`)**: When $a = b$ or $c = d$ (`square_left`, `square_right`), or when one pair lies in the large-ratio regime while the other lies in the small-ratio regime ($2a \le b \land d \le 2c$ in `mixed_left`, and $b \le 2a \land 2c \le d$ in `mixed_right` via transpose duality `witness_swap`), explicit block partial-identity matrices construct a `RationalWitness` embedding an identity submatrix of order $\min(ad, bc)$ inside $\operatorname{flow}(M, N)$;
2. **Base regime with both ratios below two (`base_witness`)**: When $a < b < 2a$ and $c < d < 2c$, the base module supplies a full-rank rational witness;
3. **Simultaneous quadratic-cone descent when both ratios are at least two (`cone_descent` and `full_rank_of_descent`)**: When $2a \le b$ and $2c \le d$, the polynomial identity $(3a - b)^2 + a^2 - 3(3a - b)a = a^2 + b^2 - 3ab \le 0$ maps $(a, b, c, d)$ to the strictly smaller cone quadruple $(a', b', c', d') = (3a - b,\, a,\, 3c - d,\, c)$ with $b' + d' = a + c < b + d$. By the induction hypothesis, the smaller quadruple achieves full rank $\min((3a - b)c,\, a(3c - d))$; combining this with the castling deficit invariance identity (`castling_proved`: $u y - \operatorname{QMaxFlow}(u, x, v, y) = x(3y - v) - \operatorname{QMaxFlow}(x, 3x - u, y, 3y - v)$) and the cut balance $(3a - b)c + bc = a(3c - d) + ad$ forces the rank deficit of $(a, b, c, d)$ to vanish, establishing $\operatorname{QMaxFlow}(a, b, c, d) = \min(ad, bc)$.

The full proof is checked by the Lean kernel.
:::

Respect the exact boundaries of [@thm-bridge-quantum-maxflow-mincut]:

- No extra geometric structure beyond the matrix contraction `flow` is assumed: the theorem applies to the width-three (`Fin 3`) Kronecker bridge $\sum_{r \in \operatorname{Fin} 3} M_r \otimes N_r$ over $\mathbb{C}$;
- The theorem is stated under the listed positivity, ordering, and quadratic cone hypotheses ($0 < a \le b$, $0 < c \le d$, $a^2 + b^2 \le 3ab$, $c^2 + d^2 \le 3cd$);
- The theorem does **not** generalize unconditionally to arbitrary tensor networks, full MERA hierarchies, continuum AdS/CFT, or the Ryu–Takayanagi formula.

[@thm-bridge-quantum-maxflow-mincut] determines the attainable rank, not the distribution of singular values. If a nonzero bridge flow $F$ has nonzero singular values $\sigma_1,\ldots,\sigma_R$, viewing it as a pure-state amplitude matrix across its row–column bipartition and normalizing gives Schmidt weights $p_j=\sigma_j^2/\sum_k\sigma_k^2$. Rank counts the nonzero weights; entanglement entropy reaches $\ln R$ only when every weight equals $1/R$. The permutation matrix in [@ex-bridge-two-three] has both full rank and a flat spectrum, but the rank theorem does not promise both at every allowed dimension tuple.

Keep the original grouping from Section 19.1: $M_r\in M_{a\times b}(\mathbb C)$, $N_r\in M_{d\times c}(\mathbb C)$, and

$$
F=\sum_{r=0}^2 M_r\otimes N_r: \mathbb C^b\otimes\mathbb C^c\longrightarrow \mathbb C^a\otimes\mathbb C^d.
$$

Here $F^*$ denotes the conjugate transpose. A stronger requirement than rank attainment is the existence of a single choice of matrix families $M,N$ and a single positive real scalar $\lambda$ satisfying

$$
\begin{aligned}
bc\le ad&\ \Longrightarrow\ F^*F=\lambda I_{bc},\\
ad\le bc&\ \Longrightarrow\ FF^*=\lambda I_{ad}.
\end{aligned}
$$

These identities require the columns or rows, respectively, to form an orthogonal family of norm $\sqrt{\lambda}$, making all singular values on the smaller side equal to $\sqrt{\lambda}$. On the seam $ad=bc$, both implications apply to the same $F$ and the same $\lambda$. The following necessary condition reveals a restriction that rank alone cannot detect.

Start with the geometry behind $2c$. When $c=1$, two combinations $y_0,y_1\in\mathbb C^d$ of the right factors with $y_0^*y_0=y_1^*y_1=1$ and $y_0^*y_1=0$ would be two orthogonal unit vectors, requiring $d\ge2$. For general $c$, the corresponding objects are isometries $J_0,J_1:\mathbb C^c\to\mathbb C^d$ with $J_\alpha^*J_\beta=\delta_{\alpha\beta}I_c$. Their two $c$-dimensional ranges are orthogonal, requiring $d\ge2c$. We first find two common coefficient directions, then derive these maps from the original Gram identity.

::: {.theorem #thm-bridge-common-coefficient-plane title="A common complex two-plane for every Hermitian coefficient kernel" lean="D5/S3/Quantum/Algebra/GenericCommonCoefficientPlane.common_plane"}
Let $a,b\in\mathbb N$ satisfy the strict threshold $3a<2b$. Let

$$
X:\operatorname{Fin}3\longrightarrow M_{a\times b}(\mathbb C)
$$

be a complex-linearly independent triple, and let the coefficient-first stack $S=\operatorname{stack}(X)$ (with row index $(r,i)\in\operatorname{Fin}3\times\operatorname{Fin}a$) be injective as a linear map. Then there is a complex two-dimensional subspace $L\subset\mathbb C^3$ such that for every Hermitian coefficient matrix $T\in M_3(\mathbb C)$, whenever

$$
S^*(T\otimes I_a)S=0,
$$

we have the full complex sesquilinear pairing

$$
u^*Tv=0\qquad(u,v\in L).
$$

The quantifiers include the case where the Hermitian coefficient kernel is zero; no nonzero-kernel, signature, or positivity premise is added.
:::

::: proof
Write

$$
\Phi_X(T)=S^*(T\otimes I_a)S=\sum_{r,s}T_{rs}X_r^*X_s,
$$

as in [compression](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.compression) and [compression_eq_sum](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.compression_eq_sum). Two product-rank lower bounds give $\operatorname{rank}\Phi_X(T)\ge a\operatorname{rank}T-2(3a-b)$. If $\Phi_X(T)=0$ and $\operatorname{rank}T=3$, then $2b\le3a$, a contradiction. Thus every coefficient-kernel matrix has rank at most $2$. If $T$ is positive semidefinite, write $T=C^*C$. Taking the trace of $\Phi_X(T)=0$ gives a zero sum of squared matrix norms, so each row of $C$ gives $\sum_r C_{jr}X_r=0$; independence forces $C=0$. Apply the same argument to $-T$. Every nonzero Hermitian kernel form therefore has one positive, one negative, and one zero eigenvalue.

If the Hermitian kernel is zero, any complex two-plane works. Otherwise, put one nonzero kernel form into $\operatorname{diag}(1,-1,0)$ by an invertible adjoint congruence and change the coefficients of $X$ accordingly; independence and stack injectivity are preserved. Work temporarily in these coordinates. Equal column Grams $X_0^*X_0=X_1^*X_1$ give $X_1=UX_0$ for a unitary $U$ on the codomain $\mathbb C^a$. Set

$$
\begin{aligned}
D&=\operatorname{range}X_0,& E&=X_2(\ker X_0),\\
r&=\dim D,&s&=\dim E.
\end{aligned}
$$

Stack injectivity makes $X_2$ injective on $\ker X_0$, so $r+s=b$. Since $r,s\le a$ and $3a<2b$, we have $2r>a$. For every Hermitian kernel form $Q$, pairing on $\ker X_0$ first gives $Q_{22}=0$, and pairing between arbitrary input vectors gives

$$
(Q_{20}I_a+Q_{21}U)D\perp E.
$$

If some $Q$ has a nonzero cross pair, put $K=Q_{20}I_a+Q_{21}U$. The preceding relation yields $\dim\ker(K|_D)\ge r+s-a=b-a$, hence

$$
\dim\bigl(\ker(K|_D)\cap E\bigr)\ge b+s-2a\ge2b-3a>0.
$$

Choose a nonzero $v$ in that intersection. Then $Q_{21}\ne0$ and $Uv=wv$, where $w=-Q_{20}/Q_{21}$ and $|w|=1$. Pairing this same $v\in D\cap E$ in the cross relation for every kernel form gives the common relation $Q_{20}+wQ_{21}=0$. A preimage of $v$ under $X_0$ gives the remaining equality $(1,w,0)^*Q(1,w,0)=0$.

If all cross pairs vanish, set

$$
A(Q)=(Q_{00}+Q_{11})I_a+Q_{01}U+Q_{10}U^*.
$$

The identities $X_0^*A(Q)X_0=0$ and $2r>a$ make every $A(Q)$ singular. Diagonalize the same $U$ once. The diagonal entries are finitely many real-linear functionals on the real vector space of Hermitian kernel forms. Their kernels cover that space; a real vector space cannot be covered by finitely many proper linear subspaces, so one fixed diagonal entry vanishes on the entire kernel. Its unitary eigenvalue supplies one common unit phase $w$, again with $(1,w,0)^*Q(1,w,0)=0$ for every $Q$.

In either branch, all four basis pairings on $L=\operatorname{span}_{\mathbb C}\{(0,0,1),(1,w,0)\}$ vanish, using $Q_{22}=0$, the cross relation, its conjugate, and the final quadratic relation. Sesquilinearity then gives the full $u^*Qv=0$ for all $u,v\in L$. Invertible coefficient congruence transports this common plane back to the original coordinates, preserving complex dimension and the full pairing. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-bridge-native-rectangular-bound title="A native rectangular dimension bound for three tensor summands" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/NativeRectangularBound.bound"}
For arbitrary natural numbers $a,b,c,d$, take complex matrix families

$$
M_r\in M_{a\times b}(\mathbb C),\qquad N_r\in M_{d\times c}(\mathbb C)\qquad(r=0,1,2),
$$

Define the original contraction (rows indexed by $\operatorname{Fin}a\times\operatorname{Fin}d$ and columns by $\operatorname{Fin}b\times\operatorname{Fin}c$)

$$
F=\sum_{r=0}^2M_r\otimes N_r: \mathbb C^b\otimes\mathbb C^c\longrightarrow\mathbb C^a\otimes\mathbb C^d.
$$

If $\lambda\in\mathbb R$ satisfies $\lambda>0$ and

$$
F^*F=\lambda I_{bc},\qquad 3a<2b,
$$

then

$$
2c\le d.
$$

The original triples need not be independent, whitened, or normalized. There are no additional dimension-positivity, ordering, or quadratic cone hypotheses; all natural dimensions are quantified, including zero-dimensional cases.
:::

::: proof
If $c=0$, the conclusion is $0\le d$. Assume $c>0$ below; the strict threshold gives $b>0$. If $a=0$ or $d=0$, every column of $F$ is zero, contradicting $F^*F=\lambda I_{bc}$; $b=0$ violates the threshold. Thus no zero-dimensional case has been silently removed. In the stronger range $2a<b$, [@thm-bridge-scalar-gram-obstruction] below already gives the stronger conclusion $3c\le d$. We explain the general mechanism for $2c\le d$.

Express the same $F$ as an exact tensor sum with the fewest terms, $\sum_{r<k}A_r^{(0)}\otimes D_r$, where $0\le k\le3$. A dependence on either factor side lets us solve for one factor and absorb its term into the others, reducing the width. Both factor families in a minimal decomposition are therefore complex-linearly independent. Set $A_r=A_r^{(0)}/\sqrt\lambda$, obtaining

$$
\widehat F=\frac{F}{\sqrt\lambda}=\sum_{r<k}A_r\otimes D_r,\qquad \widehat F^*\widehat F=I_{bc}.
$$

Independence and normalization have been derived from the original premise.

For $c>0$, independence of the right factors makes the normalized Hilbert–Schmidt Gram

$$
H_{rs}=\frac1c\Tr(D_r^*D_s)
$$

positive definite: $z^*Hz=c^{-1}\|\sum_r z_rD_r\|_{\mathrm{HS}}^2>0$ for nonzero $z$. Hence $H=B^*B$ for an invertible $B$. Apply paired coefficient whitening:

$$
\begin{aligned}
X_r&=\sum_sB_{rs}A_s,\\
Y_r&=\sum_s(B^{-T})_{rs}D_s,\\
B^{-T}&=(B^T)^{-1}.
\end{aligned}
$$

The inverse transpose is required by the bilinear coefficient pairing of the tensor sum: $B^TB^{-T}=I_k$ ensures $\sum_rX_r\otimes Y_r=\widehat F$. This preserves the normalized contraction and factor independence. Taking the partial trace of $\widehat F^*\widehat F=I_b\otimes I_c$ over the second factor and dividing by $c$ gives

$$
\begin{aligned}
\sum_{r,s}H_{rs}A_r^*A_s&=I_b,\\
\sum_rX_r^*X_r&=I_b.
\end{aligned}
$$

The coefficient-first stack $S:\mathbb C^b\to\mathbb C^k\otimes\mathbb C^a$ therefore satisfies $S^*S=I_b$, so it is injective and $b\le ka$. Widths $k=0,1$ both contradict $b>a$.

For the remaining widths $k=2,3$, define the compression and the Gram defect for each pair of right indices:

$$
\begin{aligned}
\Phi_X(T)&=S^*(T\otimes I_a)S
=\sum_{r,s}T_{rs}X_r^*X_s,\\
(G_{\ell m})_{rs}&=(Y_r^*Y_s)_{\ell m},\\
R_{\ell m}&=G_{\ell m}-\delta_{\ell m}I_k
\qquad(0\le\ell,m<c).
\end{aligned}
$$

Here $\delta$ is the Kronecker symbol: every complex right-Gram defect has the form $R=G-\delta I$. Expand $\widehat F^*\widehat F=I_{bc}$, take the $(\ell,m)$ entry in the second factor, and subtract $\delta_{\ell m}\sum_rX_r^*X_r$. This gives $\Phi_X(R_{\ell m})=0$.

For $k=2$, $\operatorname{rank}S=b$. Two product-rank lower bounds give

$$
\operatorname{rank}\Phi_X(T)\ge a\operatorname{rank}T-2(2a-b).
$$

A nonzero $T$ with zero compression would have $\operatorname{rank}T\ge1$, forcing $2b\le3a$, a contradiction. Thus the compression kernel is zero, every $R_{\ell m}=0$, and $Y_r^*Y_s=\delta_{rs}I_c$. For $c=1$, $Y_0,Y_1$ are two orthogonal unit vectors in $\mathbb C^d$. For general $c$, the maps $Y_0,Y_1:\mathbb C^c\to\mathbb C^d$ are isometries with mutually orthogonal $c$-dimensional ranges. Their concatenation $[\,Y_0\ Y_1\,]$ has $2c$ orthonormal columns, hence $2c\le d$.

For $k=3$, we have derived the independence and stack injectivity required by [@thm-bridge-common-coefficient-plane]. Its common plane $L$ works for the entire Hermitian compression kernel, including a zero kernel. A complex defect $R=G-\delta I_3$ need not be Hermitian, and blocks with $\ell\ne m$ cannot be omitted. Since $\Phi_X(R^*)=\Phi_X(R)^*$, both Hermitian parts

$$
\begin{aligned}
R_{\mathrm R}&=\frac{R+R^*}{2},\\
R_{\mathrm I}&=\frac{R-R^*}{2i},\\
R&=R_{\mathrm R}+iR_{\mathrm I}.
\end{aligned}
$$

lie in the kernel. The same $L$ annihilates the full pairings of both parts of every block, so $u^*R_{\ell m}v=0$ for all $\ell,m$ and $u,v\in L$. These are Hermitian parts formed using the adjoint, not entrywise real and imaginary parts.

Choose an orthonormal basis matrix $V\in M_{3\times2}(\mathbb C)$ for $L$ and set

$$
W=[\,Y_0\ Y_1\ Y_2\,],\qquad C=V\otimes I_c.
$$

All the block relations, together with $V^*V=I_2$, give

$$
\begin{aligned}
(WC)^*(WC)&=I_{2c},\\
2c&=\operatorname{rank}(WC)\le d.
\end{aligned}
$$

For $c=1$, the two columns of $WC$ are orthogonal unit vectors; for general $c$, its two groups of columns span mutually orthogonal $c$-dimensional ranges. This conclusion uses every block of the tensor Gram, rather than following from the ambient inequality $bc\le ad$ alone. Minimal decomposition, whitening, stacking, and compression are proof auxiliaries; the original rows $(a,d)$ and columns $(b,c)$ of $F$ remain fixed. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-bridge-scalar-gram-obstruction title="A scalar-Gram obstruction for width-three bridge flows" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/RestrictedFlatSpectrum.obstruction"}
Let $a,b,c,d\in\mathbb N$ with $c>0$ and $b>2a$. For any three $a\times b$ complex matrices $M_r$, three $d\times c$ complex matrices $N_r$, and positive real scalar $\lambda$, if

$$
F=\sum_{r=0}^2M_r\otimes N_r,\qquad F^*F=\lambda I_{bc},
$$

then $d\ge3c$. No additional assumption $a>0$, ordering condition, or quadratic cone condition is required.
:::

::: {.proof #pf-bridge-scalar-gram-obstruction}
Stack the three matrices $M_r$ vertically to form the auxiliary map

$$
V:\mathbb C^b\longrightarrow\mathbb C^3\otimes\mathbb C^a,\qquad Vx=\sum_{r=0}^2e_r\otimes M_rx.
$$

If $Vx=0$, then every $M_rx=0$, so $F(x\otimes y)=0$. Choose nonzero $y\in\mathbb C^c$. The identity $F^*F=\lambda I_{bc}$ gives $\lambda\|x\|^2\|y\|^2=0$, hence $x=0$. Thus $W=\operatorname{range}V$ has dimension $b$.

Fix any nonzero coefficient direction $z=(z_0,z_1,z_2)\in\mathbb C^3$. The subspace $z\otimes\mathbb C^a$ has dimension $a$ inside an ambient space of dimension $3a$. Since $b+a>3a$, we have $W\cap(z\otimes\mathbb C^a)\ne\{0\}$. There are therefore nonzero $x,u$ with $Vx=z\otimes u$, meaning $M_rx=z_ru$ for every $r$.

This makes the nine matrices $M_r^*M_s$ linearly independent. Indeed, suppose a complex coefficient matrix $T=(t_{rs})$ satisfies $\sum_{r,s}t_{rs}M_r^*M_s=0$. Pairing with the chosen $x$ on both sides gives

$$
0=\sum_{r,s}t_{rs}\langle M_rx,M_sx\rangle =\|u\|^2z^*Tz.
$$

Thus $z^*Tz=0$ for every $z$, including $z=0$. Substituting $e_r$, then $e_r+e_s$ and $e_r+i e_s$ for $r\ne s$, yields

$$
t_{rr}=0,\qquad t_{rs}+t_{sr}=0,\qquad it_{rs}-it_{sr}=0.
$$

Hence every $t_{rs}=0$. Both real and imaginary directions matter here; testing only real vectors $z$ would not suffice.

Next expand the original column Gram identity:

$$
\sum_{r,s}(M_r^*M_s)\otimes(N_r^*N_s) =\lambda I_b\otimes I_c.
$$

Since $c>0$, fix a coordinate $k$ and define $H_{rs}=(N_r^*N_s)_{kk}$. Let $\delta_{ij}$ denote the Kronecker delta. For any $i,j$, take the $(i,j)$ matrix entry in the second tensor factor, then subtract $\delta_{ij}$ times the corresponding $(k,k)$ equation. This gives

$$
\sum_{r,s}\bigl((N_r^*N_s)_{ij}-\delta_{ij}H_{rs}\bigr)M_r^*M_s=0.
$$

Linear independence of the nine matrices $M_r^*M_s$ forces every coefficient to vanish. Thus all cross Grams are scalar matrices: $N_r^*N_s=H_{rs}I_c$. The $(k,k)$ equation can also be written using the vertical stack $V$ as

$$
V^*(H\otimes I_a)V=\lambda I_b.
$$

Since $\lambda>0$, the right side has rank $b$. The rank of the product cannot exceed that of its middle factor, so

$$
b\le\operatorname{rank}(H\otimes I_a) =a\operatorname{rank}H.
$$

The $3\times3$ matrix $H$ has rank at most $3$. Rank at most $2$ would imply $b\le2a$, contradicting the hypothesis. Therefore $\operatorname{rank}H=3$. Finally, concatenate horizontally:

$$
C=[\,N_0\ N_1\ N_2\,]\in M_{d\times3c}(\mathbb C).
$$

Its Gram matrix is $C^*C=H\otimes I_c$, giving

$$
3c=c\operatorname{rank}H =\operatorname{rank}(C^*C) \le\operatorname{rank}C\le d.
$$

The auxiliary stack and concatenation serve only the proof; the original three summands and row–column grouping remain unchanged. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-bridge-two-five-flat-spectrum title="Rank ten without a flat spectrum: $(2,5,2,5)$"}
Take $(a,b,c,d)=(2,5,2,5)$. All positivity, ordering, and quadratic cone assumptions hold:

$$
\begin{aligned}
0<a=2&\le b=5,\qquad 0<c=2\le d=5,\\
a^2+b^2=c^2+d^2&=29\le30=3ab=3cd.
\end{aligned}
$$

This tuple remains allowed even with the additional ratio bounds $2b\le5a$ and $2d\le5c$, because $2b=5a=10$ and $2d=5c=10$.

Here $ad=bc=10$ and $3ac=12$, so [@thm-bridge-quantum-maxflow-mincut] gives $\operatorname{QMaxFlow}=\operatorname{QMinCut}=10$. By [@lemma-bridge-flow-attained], some choice of the three matrix pairs achieves rank $10$. Yet $b=5>2a=4$: if $F^*F=\lambda I_{10}$ held for some $\lambda>0$, [@thm-bridge-scalar-gram-obstruction] would require $d\ge3c=6$, contradicting $d=5$. Thus the column identity fails for every such pair of complex matrix triples and every positive $\lambda$.

This counterexample lies exactly on the seam $ad=bc$, where both scalar-Gram requirements apply. The impossible column identity already rules out their joint satisfaction by a single witness. A full-rank bridge flow exists, but no bridge flow has ten equal positive singular values: across this row–column bipartition, attaining rank $10$ does not yield normalized entanglement entropy $\ln10$.
:::

The Schmidt-weight and entropy discussion above is a spectral interpretation for a normalized pure state; the theorem itself states only a necessary dimension condition. This obstruction concerns the specified grouping of three complex Kronecker summands and exact spectral flatness. It supplies no error bound for approximate flatness and establishes no claim about general tensor networks, physical realization, or continuum holography.

Does tightening the ratios to $b\le2a$ and $d\le2c$ guarantee an exactly flat spectrum? The older $b>2a$ obstruction no longer applies, but [@thm-bridge-native-rectangular-bound] can still exclude it. We retain the existing fixed-size result and its source below; it is also a specialization of the general bound at $(3,5,3,5)$.

::: {.theorem #thm-bridge-three-five-flat-spectrum-obstruction title="A positive scalar-Gram obstruction at $(3,5,3,5)$" lean="D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.positive_scalar_obstruction"}
For arbitrary triples of complex matrices $M_r\in M_{3\times5}(\mathbb C)$ and $N_r\in M_{5\times3}(\mathbb C)$ ($r=0,1,2$), and every real $\lambda>0$, let

$$
F=\sum_{r=0}^2M_r\otimes N_r: \mathbb C^5\otimes\mathbb C^3\longrightarrow \mathbb C^3\otimes\mathbb C^5.
$$

Then $F^*F\ne\lambda I_{15}$, where $I_{15}$ is indexed by $\operatorname{Fin}5\times\operatorname{Fin}3$.
:::

::: {.proof #pf-bridge-three-five-flat-spectrum-obstruction}
Suppose $F^*F=\lambda I_{15}$. Since $3a=9<10=2b$, [@thm-bridge-native-rectangular-bound] requires $2c=6\le d=5$, a contradiction. Here the general proof is the impossibility of fitting two orthogonal three-dimensional ranges into a five-dimensional space; the original fixed-size [common_plane](lean:D5/S3/Quantum/Algebra/CommonCoefficientPlane.common_plane) also supplies the common coefficient plane used here. This result retains its separate source [positive_scalar_obstruction](lean:D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.positive_scalar_obstruction). The full proof is checked by the Lean kernel.
:::

::: {.example #ex-bridge-three-five-flat-spectrum title="All eight premises hold: rank fifteen without a flat spectrum at $(3,5,3,5)$"}
Take $(a,b,c,d)=(3,5,3,5)$. Check each of the eight premises of the original universal [`claim`](lean:D5/S3/Quantum/Algebra/NativeWidthAtMostThreeRefutation.claim):

$$
\begin{aligned}
0<a&:\quad0<3,& a\le b&:\quad3\le5,\\
0<c&:\quad0<3,& c\le d&:\quad3\le5,\\
a^2+b^2\le3ab&:\quad34\le45,\\
c^2+d^2\le3cd&:\quad34\le45,\\
b\le2a&:\quad5\le6,& d\le2c&:\quad5\le6.
\end{aligned}
$$

The first six are exactly the hypotheses of [@thm-bridge-quantum-maxflow-mincut]; that rank theorem makes no additional promise of a flat spectrum. Since $ad=bc=15$ and $3ac=27$, it gives $\operatorname{QMaxFlow}=\operatorname{QMinCut}=15$. Then [@lemma-bridge-flow-attained] supplies matrices with $\operatorname{rank}F=15$. This combines the existing declarations using the same `flow` definition and row and column indices.

Yet [@thm-bridge-three-five-flat-spectrum-obstruction] excludes $F^*F=\lambda I_{15}$ for every pair of matrix triples and every $\lambda>0$. Hence no exactly flat positive singular spectrum of length $15$ is attainable. The earlier [@thm-bridge-scalar-gram-obstruction] does not apply here because $b=5\le2a=6$.

The original universal claim requires the same $M,N$ and the same positive $\lambda$ to witness both conditional Gram equations at the start of this section. Here $ad=bc$ activates both conditions, and the column equation alone contradicts the new theorem. Even after imposing $b\le2a$ and $d\le2c$, rank attainability on the cone therefore cannot be strengthened to attainability of an exactly flat spectrum.
:::

For a positive scalar column Gram with $a<b$, [@thm-bridge-native-three-rectangular-bound] requires $3c\le2d$. With this bound, [@thm-bridge-native-scalar-gram-iff] gives the exact thresholds in each interval and classifies all dimensions. In the ordered cone, $(3,4,3,4)$ and $(5,6,5,6)$ lie in the first shrinking interval and violate $3c\le2d$, ruling out a three-term realization of either. The dimensions $(2,3,2,3)$ attain both equalities $2b=3a$ and $3c=2d$ and admit a realization. The thirty-dimensional example below returns to the question of whether any unitary at $(5,6,5,6)$ admits four terms. The quantitative gap from a flat spectrum in general dimensions remains open.

[@thm-bridge-native-four-staircase] gives an exact minimum width of four at $(3,4,3,4)$ and classifies width-four attainment for $2a<b$ or $2d<c$ when the other input dimension is positive. The four-term unitary question at $(5,6,5,6)$ in [@ex-bridge-rectangular-partition-5-6] and the general necessary conditions in the small-ratio regime $a<b\le2a$ remain open.
At $(4,5,4,5)$, $(5,6,4,5)$, and $(5,6,5,6)$, [@thm-bridge-native-four-clifford-rank-three] rules out compression kernels congruent into the Pauli–Clifford span or containing a rank-three Hermitian matrix, leaving mixed rank-two and rank-four kernels open and the minimum width at $(5,6,5,6)$ unresolved between $4$ and $5$.

## 19.4.1 Rectangle partitions and the exact decomposition width of a fixed operator {#sec-bridge-rectangular-partition}

Keep the original local input and output spaces and allow any finite number of terms. Partitioning the coordinate rectangle into blocks with equally many row and column indices gives a unitary and, for that unitary, its minimum number of product terms.

::: {.theorem #thm-bridge-rectangular-partition title="Unitary rectangle routing with exact decomposition width" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/RectangularBlockPartition.unitary_exact_width"}
Let $X,Y,T$ be arbitrary finite sets. For each $t\in T$, let $I_t\subseteq X$, $J_t\subseteq Y$, and let $\phi_t:J_t\to I_t$ be a bijection. Suppose every $(x,y)\in X\times Y$ belongs to exactly one rectangle $I_t\times J_t$. Define $A_t\in M_{X\times Y}(\mathbb C)$ by $(A_t)_{ij}=1$ when $j\in J_t$ and $i=\phi_t(j)$, and zero otherwise. Put

$$
\begin{aligned}
U&=\sum_{t\in T}A_t\otimes A_t^*,\\
U&:\mathbb C^Y\otimes\mathbb C^X\longrightarrow\mathbb C^X\otimes\mathbb C^Y,\\
T_+&=\{t\in T:J_t\ne\varnothing\}.
\end{aligned}
$$

Here $A_t^*$ denotes the conjugate transpose of $A_t$. Define realignment using the original local indices:

$$
\begin{aligned}
\mathcal R(U)_{(i,j),(k,l)}&=U_{(i,k),(j,l)},\\
i,l&\in X,\qquad j,k\in Y.
\end{aligned}
$$

Then $U^*U=I_{Y\times X}$, $UU^*=I_{X\times Y}$, and

$$
\begin{aligned}
\operatorname{rank}\mathcal R(U)&=|T_+|,\\
U&=\sum_{t\in T_+}A_t\otimes A_t^*.
\end{aligned}
$$

Moreover, there are row and column maps $r:T_+\to X\times Y$ and $s:T_+\to Y\times X$ with $\mathcal R(U)_{r(t),s(u)}=\delta_{tu}$ for all $t,u\in T_+$. For every finite $R$ and arbitrary complex matrices $M_r\in M_{X\times Y}(\mathbb C)$, $N_r\in M_{Y\times X}(\mathbb C)$, a decomposition of this same operator $U=\sum_{r\in R}M_r\otimes N_r$ requires $|T_+|\le|R|$. Index sets and blocks may be empty; the factors in a proposed decomposition need not be linearly independent or nonzero.
:::

::: {.proof #pf-bridge-rectangular-partition}
First expand the tensor sum in coordinates:

$$
U_{(i,k),(j,l)}= \sum_{u\in T}(A_u)_{ij}\overline{(A_u)_{lk}}.
$$

For an input basis index $(j,l)\in Y\times X$, choose its unique block with $l\in I_t$ and $j\in J_t$. A nonzero $u$-summand requires $j\in J_u$ and $l\in I_u$ from the supports of its two factors, so unique coverage forces $u=t$. The remaining summand equals $1$ exactly when $i=\phi_t(j)$ and $k=\phi_t^{-1}(l)$, and vanishes otherwise. Thus each input is routed as

$$
(j,l)\longmapsto\bigl(\phi_t(j),\phi_t^{-1}(l)\bigr).
$$

Call this route $\rho$. The output $(i,k)$ stays in the same rectangle $I_t\times J_t$, so unique coverage recovers $t$. Its inverse is

$$
\rho^{-1}(i,k)=\bigl(\phi_t^{-1}(i),\phi_t(k)\bigr),
$$

and both compositions are the identity. Hence $U_{w,p}=\delta_{w,\rho(p)}$. For $p,q\in Y\times X$ and $w,z\in X\times Y$, direct calculation gives

$$
\begin{aligned}
(U^*U)_{p,q}
&=\sum_{w\in X\times Y}\overline{U_{w,p}}U_{w,q}\\
&=\delta_{\rho(p),\rho(q)}=\delta_{p,q},\\
(UU^*)_{w,z}
&=\sum_{p\in Y\times X}U_{w,p}\overline{U_{z,p}}\\
&=\delta_{\rho^{-1}(w),\rho^{-1}(z)}=\delta_{w,z}.
\end{aligned}
$$

These are the two Gram identities on the original input and output spaces.

For each nonempty block choose $j_t\in J_t$ and set $i_t=\phi_t(j_t)$. Unique coverage gives

$$
(A_u)_{i_tj_t}=\delta_{ut}.
$$

The following actual submatrix of the realignment is therefore an identity:

$$
\begin{aligned}
\mathcal R(U)_{(i_t,j_t),(j_s,i_s)}
&=\sum_u(A_u)_{i_tj_t}\overline{(A_u)_{i_sj_s}}\\
&=\delta_{ts}.
\end{aligned}
$$

The row map is $r(t)=(i_t,j_t)$ and the column map is $s(t)=(j_t,i_t)$. Representatives from distinct blocks are distinct, so both maps are injective. This supplies an actual identity submatrix and gives $\operatorname{rank}\mathcal R(U)\ge|T_+|$. Empty blocks give zero matrices, so dropping them preserves $U$ and supplies an actual decomposition with $|T_+|$ terms.

Finally, any decomposition $U=\sum_{r\in R}M_r\otimes N_r$ gives a factorization $\mathcal R(U)=BC$, where

$$
\begin{aligned}
B_{(i,j),r}&=(M_r)_{ij},\\
C_{r,(k,l)}&=(N_r)_{kl}.
\end{aligned}
$$

Here $C$ uses the entries of $N_r$ directly, without conjugation. Hence $\operatorname{rank}\mathcal R(U)\le\operatorname{rank}B\le|R|$. Applied to the nonempty-block decomposition, this gives the matching rank upper bound; applied to arbitrary complex factors, it gives the minimum term count.

If $J_t$ is empty, its bijection makes $I_t$ empty as well, and $A_t=0$. If $X$ or $Y$ is empty, all blocks are empty, $T_+$ is empty, and $U$ is the unique map between two zero-dimensional spaces; both Gram identities are identities of empty square matrices. Conversely, if $T_+$ is empty (in particular, if $T$ is empty), unique coverage forces $X\times Y$ to be empty. The realignment rank is then $0$, the identity submatrix and the achieved decomposition of width $0$ are empty, and the lower bound reads $0\le|R|$. The full proof is checked by the Lean kernel.
:::

The exact width concerns this constructed operator $U$: it needs precisely $|T_+|$ product terms. Whether another unitary with the same local dimensions admits fewer terms is a separate question. No physical swap is composed with the operator to transfer the result to a different local operator-Schmidt partition.

::: {.example #ex-bridge-rectangular-partition-5-6 title="A thirty-dimensional unitary requiring exactly five terms"}
Take $X=\{0,1,2,3,4\}$ and $Y=\{0,1,2,3,4,5\}$, partitioned into the five rectangles below:

| $t$ | $I_t$ | $J_t$ | Size |
| :--- | :--- | :--- | :--- |
| $0$ | $\{0,1,2\}$ | $\{0,1,2\}$ | $3\times3$ |
| $1$ | $\{0,1,2\}$ | $\{3,4,5\}$ | $3\times3$ |
| $2$ | $\{3,4\}$ | $\{0,1\}$ | $2\times2$ |
| $3$ | $\{3,4\}$ | $\{2,3\}$ | $2\times2$ |
| $4$ | $\{3,4\}$ | $\{4,5\}$ | $2\times2$ |

For a concrete choice, set, on each respective $J_t$,

$$
\begin{aligned}
\phi_0(j)&=j,&\phi_1(j)&=j-3,\\
\phi_2(j)&=j+3,&\phi_3(j)&=j+1,\\
\phi_4(j)&=j-1.
\end{aligned}
$$

Each is a bijection from the listed $J_t$ to $I_t$; any other choice of bijections within these blocks also works. The first three rows are covered by two $3\times3$ blocks, and the last two rows by three $2\times2$ blocks, with each grid point appearing exactly once. All five blocks are nonempty, so the construction yields

$$
\begin{aligned}
U&:\mathbb C^6\otimes\mathbb C^5\longrightarrow
\mathbb C^5\otimes\mathbb C^6,\\
\operatorname{rank}\mathcal R(U)&=5.
\end{aligned}
$$

For these specific bijections, choose the representative grid points in order as

$$
(0,0),\quad(0,3),\quad(3,0),\quad(3,2),\quad(3,4).
$$

Using these as realignment row indices, and reversing each coordinate pair for the column indices, gives an actual $5\times5$ identity submatrix. The five blocks also supply a five-term decomposition, so the lower bound is attained.

This is a thirty-dimensional unitary requiring exactly five terms on the displayed original local partition. It supplies a five-term realization in these dimensions. Whether a different unitary of the same dimensions admits four terms remains open here; the example does not determine the global minimum term count over all such unitaries.
:::

::: {.figure src="ch19-discrete-vs-rt"}
**What this chapter proves stops on the left.** On the left, the width-three bridge graph, with the green tag for max-flow equal to min-cut in the cone ([@thm-bridge-quantum-maxflow-mincut]); on the right, a disc standing for a slice of continuum spacetime, the cyan arc the boundary region $A$ and the violet arc $\gamma_A$ leaving the ends of $A$ at right angles to the rim, the minimal surface of the RT formula (literature result, not formalized in this book). The crossed-out arrow between them: the continuum limit from left to right is not proved in this book.
:::

To situate this discrete theorem alongside the high-energy physics literature without overclaiming, we state the continuum Ryu–Takayanagi formula and its scope restrictions in the following remark.

::: {.remark #rem-ryu-takayanagi-literature title="The Ryu–Takayanagi Holographic Entanglement Entropy Formula and Its Scope (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In the static, classical, leading-order semiclassical anti-de Sitter / conformal field theory (AdS/CFT) correspondence (with $c = 1$), the von Neumann entanglement entropy $S(A) = -\Tr(\rho_A \ln\rho_A)$ of a boundary spatial subregion $A$ is given by the **Ryu–Takayanagi (RT) formula**

$$
S(A) = \frac{\operatorname{Area}(\gamma_A)}{4 G_N \hbar},
$$

where $G_N$ is the bulk Newton gravitational constant and $\gamma_A$ is the minimal-area codimension-two bulk surface anchored on the boundary $\partial A$ ($\partial\gamma_A = \partial A$) and homologous to $A$. Bulk quantum corrections and time-dependent covariant Hubeny–Rangamani–Takayanagi (HRT) extremal surfaces lie outside the scope of this chapter's frozen statements.

Two guardrails are mandatory when comparing discrete tensor-network bounds with holographic entanglement entropy:

1. **Never write $S(A) = a \wedge b$** or assert that arbitrary tensor networks universally saturate their minimum cut;
2. **Respect the R3 discrete-facet boundary**: in this book, the geometric bridge from [@thm-bridge-quantum-maxflow-mincut] to holographic ideas proceeds strictly through the discrete log-capacity polyhedral facets, bottlenecks, and seam stitching of [@ex-log-capacity-facets], without claiming that a continuum limit or holographic duality has been proved.

See S. Ryu & T. Takayanagi, *Phys. Rev. Lett.* **96**, 181602 (2006), DOI: [10.1103/PhysRevLett.96.181602](https://doi.org/10.1103/PhysRevLett.96.181602); B. Swingle, *Phys. Rev. D* **86**, 065007 (2012), DOI: [10.1103/PhysRevD.86.065007](https://doi.org/10.1103/PhysRevD.86.065007); and J. D. Bekenstein, *Phys. Rev. D* **7**, 2333 (1973), DOI: [10.1103/PhysRevD.7.2333](https://doi.org/10.1103/PhysRevD.7.2333).
:::

::: {.viz src="layered-network-cut" preset="grow" height="500"}
**Double the interval, and the cut gains only about two legs.** The amber interval keeps its right end and grows from 1 site to 16; the magenta minimal cut climbs layer by layer from 1 bond to only 8, whereas severing every leg would take 16. For every interval of this 32-site network the cut stays within $2\log_2 L + 1$ (checked one by one on the page). Reading the number of severed legs as the “area” of an RT minimal surface is Swingle's MERA analogy (a literature result, not formalized in this book).
:::

With more than one interval there is more than one candidate cut: the two intervals can be cut off separately, or one large cut can enclose both together with the gap between them while the gap's own legs are cut on their own; the minimal cut is whichever way severs the fewest bonds.

::: {.viz src="layered-network-cut" preset="two" height="500"}
**Two intervals: cut them apart, or cut them together.** Two sites separate the amber intervals A and B, and A grows leftward from a single site. While A is short, the magenta minimal cut is two separate cuts; from 7 sites on, one large cut around A, B and the gap, plus a small cut through the two legs of the gap, is cheaper: at 10 sites, cutting together takes 10 bonds and cutting apart 13. The minimal cut is always the cheapest of the candidates; for the analogous verified bound on the width-three bridge graph see [@prop-bridge-flow-cut-bound].
:::
