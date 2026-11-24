# O.1.1 Direct-encoder ranks and entanglement entropy {#sec-ch39-s05-s07-s01-rank-and-entropy}

See [§O.1](ch39-s05-s07-cut-entanglement.md#sec-ch39-p2e-entanglement) for the page-rank caps $R_0, R_1$ and the direct-encoder contract (`directContract`).

::: {.theorem #thm-ch39-p2e-direct-encoder-ranks title="Attainable Page-Rank Rectangle and von Neumann Entanglement Entropy Maxima for K-Bonacci Direct Encoders" lean="D5/S3/Quantum/Entanglement/KBonacciDirectRankEntropy.complete_original_direct_rank_entropy"}
For all integers $N \ge 2$, $K \ge 2$, and block lengths $m_X, m_Y \ge 1$, both logical page dimensions are strictly positive ($M_0 > 0,\; M_1 > 0$). Writing $r_b = \operatorname{rank}(\sigma_b)$ ($b \in \{0, 1\}$) and defining $R_0, R_1$ as above:

1. **Rank upper bounds and spectral necessity**: Every pair $(J, \sigma)$ satisfying `directContract` obeys $r_0 \le R_0$, $r_1 \le R_1$, and the page-$1$ spectral factorization necessity (`totalRowSpectralNecessity`);
2. **Exact attainable rank rectangle**: For any natural numbers $(d_0, d_1)$, there exist jointly chosen $(J, \sigma)$ satisfying `directContract` with $(r_0, r_1) = (d_0, d_1)$ if and only if $1 \le d_0 \le R_0$ and $1 \le d_1 \le R_1$; in particular, a legal direct encoder exists if and only if $R_0 \ge 1$ and $R_1 \ge 1$;
3. **Page-pure Schmidt-rank identity**: Under `directContract`, every normalized pure logical state $\psi$ supported entirely in page $b$ has encoded bipartite Schmidt rank across $X \mid Y$ equal to $r_b = \operatorname{rank}(\sigma_b)$;
4. **Sharp von Neumann entropy bounds and simultaneous attainment**: Every $(J, \sigma)$ satisfying `directContract` obeys $S(\sigma_0) \le \ln R_0$ and $S(\sigma_1) \le \ln R_1$ (in natural-logarithm units); whenever $R_0 \ge 1$ and $R_1 \ge 1$, a single joint construction $(J, \sigma)$ simultaneously attains $r_0 = R_0$, $r_1 = R_1$, $S(\sigma_0) = \ln R_0$, and $S(\sigma_1) = \ln R_1$.
:::

::: proof
Necessity follows from the spectral obstruction theorem [`actual_encoder_spectral_obstruction`](lean:D5/S3/Quantum/Entanglement/KBonacciDirectSupportObstruction.actual_encoder_spectral_obstruction): for any given encoder obeying `directContract`, factoring through an isometry $W$ on the nonzero eigenspace of $\sigma_b$ and enforcing $\tau(x) + \iota(y) < K$ confines the image of the subspace $V_s$ spanned by weighted left rows with $\tau(x) \ge s$ to the $n_s$-element compatible right neighborhood; mutual orthogonality across the $M_1$ logical basis states forces $M_1 \dim V_s \le n_s$, so $r_1 \le a_s + \dim V_s \le a_s + \lfloor n_s / M_1 \rfloor$ for all $0 \le s < K$, while page $0$ similarly gives $r_0 \le \min(c_{m_X, 0}, \lfloor c_{m_Y, 0}/M_0 \rfloor) = R_0$. Sufficiency and simultaneous extremal attainment construct $(J, \sigma)$ jointly by pairing disjoint right-hand word blocks across run strata with uniform nonzero eigenvalues $1/d_b$ (and $1/R_b$ at the corner); since a density state of rank $r_b$ has von Neumann entropy at most $\ln r_b \le \ln R_b$, the entropy bounds are sharp (note that these cross-cut rank bounds address a physical constraint distinct from the pointer history-capacity bound in [Chapter 36](ch38-observer-memory-pointer-and-ontological-qram.md), [@thm-ch38-pointer-width-and-no-deep-copy]). The full proof is checked by the Lean kernel.
:::

[@thm-ch39-p2e-direct-encoder-ranks] underscores a crucial point that slogans easily obscure: **the Schmidt rank of a direct encoder is not universally equal to $K$!** Rank $K$ is **conditionally attainable**—as one point inside the feasible rectangle $[1, R_0] \times [1, R_1]$—only if the block parameters satisfy $1 \le K \le R_b$. As an independently enumerated concrete example (`NUM`), take $N = 2,\; K = 3,\; m_X = 4,\; m_Y = 5$: on $\{0, 1, 2\}$, the nonprime page $\{0, 1\}$ has $M_0 = 2$ and the prime page $\{2\}$ has $M_1 = 1$; counting `111`-free words gives $c_4 = (7, 6)$, $c_5 = (13, 11)$, $(a_0, a_1, a_2) = (0, 3, 5)$, and $(n_0, n_1, n_2) = (11, 7, 0)$, so

$$
R_0 = \min\bigl(7, \lfloor 13 / 2 \rfloor\bigr) = 6,\qquad R_1 = \min\bigl(6, \min(0 + 11,\; 3 + 7,\; 5 + 0)\bigr) = 5.
$$

Every integer rank pair with $1 \le r_0 \le 6$ and $1 \le r_1 \le 5$ is realizable: $r_0 = r_1 = K = 3$ is one valid choice among thirty, whereas the maximal attainable ranks are $(6, 5)$ with maximal page entropies $(\ln 6, \ln 5)$.

::: {.example #ex-ch39-p2e-positive-ket-handcalculation title="By Hand: Positive Equal-Amplitude Admissible-Word States Across the Same Cut"}
This is a paper calculation for a specified finite state, not a new Lean-verified theorem. Set $m=n=1$ (that is, $m_X=m_Y=1$), cutting a two-bit word across $X\mid Y$. For $K=2$, the admissible words are exactly $00,01,10$; choose the positive equal-amplitude coherent state

$$
\lvert\psi\rangle=\frac{\lvert00\rangle+\lvert01\rangle+\lvert10\rangle}{\sqrt3},
\qquad \langle\psi\mid\psi\rangle=\frac{3}{3}=1.
$$

Ordering the words on each side as $0,1$, the coefficient matrix and partial trace are

$$
\begin{aligned}
M&=\frac1{\sqrt3}\begin{pmatrix}1&1\\1&0\end{pmatrix},\\
\rho_X&=\operatorname{Tr}_Y(\lvert\psi\rangle\langle\psi\rvert)
=MM^*=\frac13\begin{pmatrix}2&1\\1&1\end{pmatrix}.
\end{aligned}
$$

Explicitly, $\rho_{xx'}=\sum_{y=0}^1 M_{xy}\overline{M_{x'y}}$: $00$ and $10$ share the right word $y=0$, leaving off-diagonal entries $\rho_{01}=\rho_{10}=1/3$. Hence

$$
\begin{aligned}
\det(tI-\rho_X)&=t^2-t+\frac19,\\
\lambda_+&=\frac{3+\sqrt5}{6},\qquad
\lambda_-=\frac{3-\sqrt5}{6}.
\end{aligned}
$$

Each eigenvalue has multiplicity $1$; both are positive and sum to $1$. The reduced rank is $2$, and the Schmidt coefficients are $\sqrt{\lambda_+},\sqrt{\lambda_-}$. Using natural logarithms, the entanglement entropy is

$$
S(\rho_X)=-\lambda_+\ln\lambda_+-\lambda_-\ln\lambda_->0.
$$

Neither counting three words nor taking $\ln3$ gives this entropy; replacing the ket by a uniform diagonal classical mixture of the three words removes those coherence terms.

Across the same cut, every $K\ge3$ admits all four words $00,01,10,11$. The chosen positive equal-amplitude state is then

$$
\begin{aligned}
\lvert\psi\rangle&=\frac{\lvert00\rangle+\lvert01\rangle+\lvert10\rangle+\lvert11\rangle}{2}
=\lvert+\rangle\otimes\lvert+\rangle,\\
\lvert+\rangle&=\frac{\lvert0\rangle+\lvert1\rangle}{\sqrt2},\qquad
\langle\psi\mid\psi\rangle=4\left(\frac12\right)^2=1,\\
\rho_X&=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\end{aligned}
$$

Its eigenvalues $1,0$ each have multiplicity $1$. The reduced rank is $1$, the sole nonzero Schmidt coefficient is $1$, and $S(\rho_X)=0$ (with $0\ln0=0$). Here we specify a state over all admissible words, without fixing first-bit pages or imposing the logical `directContract`; the preceding theorem instead characterizes attainable ranks and entropy extrema while jointly choosing the encoder and page states under that contract. This example determines no physical ground state or general entropy limit at fixed $K$; the subsequent open problems remain open.
:::

::: {.example #ex-ch39-p2e-phase-counterexample title="By Hand: Identical Probabilities, Different Entanglement"}
Keep $m=n=1$ and the cut $X\mid Y$ from the preceding example, and fix any $K\ge3$; the admissible words are exactly $00,01,10,11$.
Compare $\lvert\psi_+\rangle=(\lvert00\rangle+\lvert01\rangle+\lvert10\rangle+\lvert11\rangle)/2$ with $\lvert\psi_{\mathrm{phase}}\rangle=(\lvert00\rangle+\lvert01\rangle+\lvert10\rangle-\lvert11\rangle)/2$: only the phase of the $11$ amplitude changes, to $\pi$.
Both states have squared norm $4(1/4)=1$, and each word has computational-basis probability $1/4$. Ordering each side as $0,1$, the latter state gives

$$
\begin{aligned}
M_{\mathrm{phase}}&=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix},\\
\rho_X&=\operatorname{Tr}_Y(\lvert\psi_{\mathrm{phase}}\rangle\langle\psi_{\mathrm{phase}}\rvert)=M_{\mathrm{phase}}M_{\mathrm{phase}}^*\\
&=\frac14\begin{pmatrix}1+1&1-1\\1-1&1+1\end{pmatrix}=\frac{I_2}{2}.
\end{aligned}
$$

In the partial trace, the right words $y=0,1$ contribute $1/4,-1/4$ to each off-diagonal entry, so they cancel. The reduced spectrum, listed with multiplicity, is $(1/2,1/2)$ (the eigenvalue $1/2$ has multiplicity $2$), and the Schmidt coefficients are $1/\sqrt2,1/\sqrt2$. With natural logarithms, the entanglement entropy is $S(\rho_X)=-2(1/2)\ln(1/2)=\ln2$, whereas the preceding example gives $0$ for $\psi_+$.

This phase change is the joint controlled-sign operation $\operatorname{diag}(1,1,1,-1)$, not a product of single-qubit local phase operations: local unitaries preserve Schmidt coefficients and cannot turn the sole nonzero Schmidt coefficient $1$ of $\psi_+$ into the two coefficients above.

Thus identical admissible-word support, counts, and even computational-basis probabilities do not determine entanglement; the chosen positive-phase equal-amplitude family remains a meaningful additional specification of the state. This is a paper calculation for finite states, with no conclusion about ground states, physical realization, or fractal entanglement scaling.
:::

::: {.example #ex-ch39-p2e-finite-kernel title="Paper derivation (not Lean-verified): compressing the positive equal-amplitude state's reduced spectrum to K dimensions"}
The preceding calculations extend to a finite matrix calculation for the same specified state family. This is a paper derivation, not a new Lean-verified result. Fix $K\ge2$ and any $m,n\ge0$. Let $W_L$ contain all length-$L$ binary words avoiding $1^K$, write $z_L=|W_L|$, and choose

$$
\lvert\psi_{m,n}\rangle
=\frac1{\sqrt{Z}}\sum_{w\in W_{m+n}}\lvert w\rangle,
\qquad Z=z_{m+n}>0.
$$

The all-zero word ensures $Z>0$. No first-bit page is fixed. Partition $W_m$ into classes $A_r$ by the length $r$ of the terminal run of ones, and $W_n$ into classes $B_s$ by the length $s$ of the initial run of ones; both lengths are $0$ for the empty word. Legality gives $0\le r,s<K$. Let $a_r=|A_r|$ and $b_s=|B_s|$ be the actual finite counts, allowing zero. For $x\in A_r$ and $y\in B_s$, concatenation is legal exactly when $r+s<K$, so

$$
Z=\sum_{r+s<K}a_r b_s.
$$

In the full computational-basis spaces of dimensions $2^m$ and $2^n$, assign each nonempty class its normalized indicator vector $u_r=\sum_{x\in A_r}|x\rangle/\sqrt{a_r}$ or $v_s=\sum_{y\in B_s}|y\rangle/\sqrt{b_s}$. Assign the zero vector to an empty class, without inverting the square root of zero. Form matrices $U,V$ from these columns and define the $K\times K$ matrix

$$
C_{rs}=\mathbf1_{\{r+s<K\}}\sqrt{\frac{a_r b_s}{Z}}.
$$

The actual state's coefficient matrix is $M_{xy}=\mathbf1_{\{xy\in W_{m+n}\}}/\sqrt Z$. Expand $UCV^*$ entry by entry: each legal $x,y$ belongs to exactly one nonempty class, and the normalization factors cancel; an illegal word or concatenation gives zero. Thus $M=UCV^*$. Distinct nonempty classes are disjoint, hence

$$
\begin{aligned}
U^*U&=D_A=\operatorname{diag}(\mathbf1_{\{a_r>0\}}),\\
V^*V&=D_B=\operatorname{diag}(\mathbf1_{\{b_s>0\}}),\\
D_A C D_B&=C.
\end{aligned}
$$

The last identity handles short words and empty classes: $U,V$ with zero columns are not isometric embeddings of the entire $K$-dimensional space. Taking the partial trace of the actual pure state now gives

$$
\begin{aligned}
\rho_X&=MM^*=U G U^*,\qquad G=CC^*,\\
G_{rr'}&=\frac{\sqrt{a_r a_{r'}}}{Z}
\sum_{s=0}^{K-1-\max(r,r')}b_s.
\end{aligned}
$$

The sum counts right words compatible with both left boundary runs. The matrix $G$ vanishes on empty left classes, while the restriction of $U$ to the coordinate space of nonempty classes is an isometric embedding. Consequently, $G$ and $\rho_X$ have the same positive eigenvalues with the same multiplicities. The right reduction has that positive spectrum too, since $C^*C$ and $CC^*$ have the same positive spectrum. If $R=\operatorname{rank}C$, the physical zero-eigenvalue multiplicities are $2^m-R$ and $2^n-R$; the auxiliary matrix $G$ instead has zero multiplicity $K-R$. These counts must be distinguished.

Since $\operatorname{Tr}G=\sum_{r,s}|C_{rs}|^2=1$, list its positive eigenvalues with multiplicity as $\nu_1,\ldots,\nu_R$. The finite-cut entanglement entropy, using natural logarithms, is

$$
\begin{aligned}
S(\rho_X)&=-\sum_{j=1}^{R}\nu_j\ln\nu_j,\\
0\le S(\rho_X)&\le\ln R
\le\ln\!\bigl(\min\{K,2^m,2^n\}\bigr).
\end{aligned}
$$

The entropy bound is the usual Shannon bound for $R$ positive numbers summing to $1$. If $m=0$ or $n=0$, then $R=1$ and the entropy is zero; at $m=n=1$, the nonzero part recovers the matrices in [@ex-ch39-p2e-positive-ket-handcalculation]. This calculation uses actual class counts without requiring their closed forms or substituting stationary probabilities. At fixed $K$, it bounds the cut entropy uniformly for this positive equal-amplitude family. Further control in $K$ is given in [@ex-ch39-p2e-uniform-entropy]; the finite-kernel calculation alone proves no entropy limit and identifies no physical ground state or relation to Rauzy-boundary dimension. These counts carry no phase information. Whether changed phases preserve this spectrum requires a separate check; the joint sign change in the preceding example changes it.
:::

::: {.example #ex-ch39-p2e-exact-rank title="Paper derivation (not Lean-verified): exact Schmidt rank from short words to saturation"}
Continue the paper derivation for the positive equal-amplitude state in [@ex-ch39-p2e-finite-kernel], and set $p=\min(m,K-1)$ and $q=\min(n,K-1)$. The class of left words with exactly $r$ trailing ones is nonempty precisely for $0\le r\le p$: use $0^{m-r}1^r$ when $r<m$, and the all-ones word when $r=m<K$; the empty word has $r=0$. On the right, $1^s0^{n-s}$ similarly realizes every $0\le s\le q$. Removing the zero rows and columns therefore leaves the coefficient kernel

$$
C_{\mathrm{occ}}=Z^{-1/2}D_A T D_B,
\qquad T_{rs}=\mathbf 1_{\{r+s<K\}},
$$

where both $D_A=\operatorname{diag}(\sqrt{a_0},\ldots,\sqrt{a_p})$ and $D_B=\operatorname{diag}(\sqrt{b_0},\ldots,\sqrt{b_q})$ are invertible. Its rank is the rank of this $(p+1)\times(q+1)$ zero–one matrix.

Write $v_r$ for row $r$ of $T$, with column coordinates $0,\ldots,q$. The zeroth row $v_0$ is all ones, and for $1\le r\le p$ the successive differences are

$$
v_r-v_{r-1}=
\begin{cases}
-e_{K-r},&K-r\le q,\\
0,&K-r>q.
\end{cases}
$$

Since $1\le K-r$, the nonzero differences occupy distinct nonzero column coordinates. There are $h=\max(0,p+q-K+1)$ of them. Taking differences and telescoping back shows that the row space is exactly the span of $v_0$ and these $h$ coordinate vectors. Column zero first forces the coefficient of $v_0$ to vanish in any linear relation; the remaining coordinates then force every other coefficient to vanish. Thus the original pure state has Schmidt rank

$$
R=1+\max(0,p+q-K+1).
$$

This gives exact finite-length boundaries: $R=K$ precisely when $m,n\ge K-1$, and $R=1$ precisely when $m=0$, $n=0$, or $m+n<K$. For two nonempty sides, this specified state becomes entangled exactly when the forbidden-word constraint can cross the cut, namely $m+n\ge K$. Its positive spectrum has $R$ entries: rank one gives zero entropy, whereas at higher rank every entry is strictly below one and the entropy is strictly positive. Full rank alone does not make those entries equal; whether the entropy reaches $\ln K$ still depends on the preceding spectrum. This derivation adds no Lean verification and establishes no entropy limit or physical ground-state conclusion.
:::


::: {.example #ex-ch39-p2e-uniform-entropy title="Paper derivation (not Lean-verified): entanglement vanishes uniformly as the forbidden run grows"}
Increasing the automaton's number of states need not increase the entanglement of this specified state. For the positive equal-amplitude family in [@ex-ch39-p2e-finite-kernel], a classical correlation inequality gives a bound uniform over all finite cuts. This remains a paper derivation and adds no Lean verification.

Under the uniform law on binary words of length $m+n$, let $D$ mean that each half is legal, and let $E$ mean that an all-ones window of length $K$ crosses the cut. Represent a word by its set of one-positions. Then $D$ is closed under deleting positions, whereas $E$ is closed under adding them. The Harris–Kleitman inequality makes such a decreasing event and increasing event negatively correlated; this is a classical literature result (Kleitman, *Families of Non-disjoint Subsets*, [10.1016/S0021-9800(66)80012-1](https://doi.org/10.1016/S0021-9800(66)80012-1), lemma on p.154). Consequently,

$$
\begin{aligned}
\delta_{K;m,n}
&:=\Pr(E\mid D)
=1-\frac{z_{m+n}}{z_mz_n}\\
&\le\Pr(E)\le d_K,
\qquad d_K=(K-1)2^{-K}.
\end{aligned}
$$

Here $\Pr(D)=z_mz_n/2^{m+n}>0$. Each length-$K$ window crossing the cut uses $K$ distinct positions and is all ones with uniform probability $2^{-K}$. There are at most $K-1$ such windows, so the final step is a union bound. Short or empty sides only reduce their number; with no such window, $E$ is empty.

Let $\lvert u\rangle$ and $\lvert v\rangle$ be the normalized equal-amplitude superpositions of legal words on the two sides, and put $\lvert\phi\rangle=\lvert u\rangle\otimes\lvert v\rangle$. Counting their common nonzero coefficients gives

$$
|\langle\phi\mid\psi_{m,n}\rangle|^2
=\frac{z_{m+n}}{z_mz_n}=1-\delta_{K;m,n}.
$$

If $\lambda_{\max}$ is the largest eigenvalue of the actual reduced state, the singular-value decomposition of its coefficient matrix gives $\lambda_{\max}\ge |\langle\phi\mid\psi_{m,n}\rangle|^2$: overlap with any unit product vector is at most the largest Schmidt coefficient. Thus $t:=1-\lambda_{\max}$ satisfies $0\le t\le\delta_{K;m,n}\le d_K\le1/4$. The last bound follows from $(K-1)\le2^{K-2}$ for every $K\ge2$.

The preceding calculation bounds the rank by $K$, leaving at most $K-1$ other eigenvalues with total mass $t$. For $t>0$, divide these entries by $t$ and apply the usual finite-probability entropy bound; at $t=0$, use the continuous value. With $h(t)=-t\ln t-(1-t)\ln(1-t)$ and its continuous endpoint values,

$$
\begin{aligned}
S_K(m,n)
&\le h(t)+t\ln(K-1)\\
&\le h(d_K)+d_K\ln(K-1)\\
&\le (K-1)2^{-K}(1+K\ln2).
\end{aligned}
$$

The second step uses the increase of $h$ on $[0,1/2]$ and $\ln(K-1)\ge0$. The third uses $-(1-d)\ln(1-d)\le d$ and substitutes $d_K$. The right-hand side tends to zero independently of $m,n$. Hence for every $\varepsilon>0$ there is a $K_0\ge2$, independent of the cut lengths, such that $S_K(m,n)<\varepsilon$ for every $K\ge K_0$ and every $m,n\ge0$. This concerns the specified state family: its rank can reach $K$ while the spectral mass outside its largest eigenvalue vanishes uniformly. It establishes no fixed-$K$ long-region entropy limit, specifies no physical ground state and does not resolve the relation between Rauzy-boundary dimension and entanglement scaling.
:::

::: {.example #ex-ch39-p2e-fixed-order-entropy-limit title="Paper derivation (not Lean-verified): the two-sided entropy limit at fixed forbidden-run order"}
Fix $K\ge2$ and let both sides of the cut grow. The question shifts from how many Schmidt coefficients are nonzero to how their mass settles. Continue with the actual positive equal-amplitude state of [@ex-ch39-p2e-finite-kernel]: all binary words avoiding $1^K$ participate, without a fixed first bit or occupation number. This is a paper derivation; the complete application has not been compiled in Lean and specifies no physical ground state.

Let $W_L$ be the legal words of length $L$, and $z_L=|W_L|$, including $z_0=1$. Set $\beta=\beta_K$, $p=\beta^{-1}$, and

$$
\begin{aligned}
w_j&=\sum_{a=1}^{K-j}p^a\quad(0\le j<K),\\
T&=\sum_{j=0}^{K-1}p^j w_j=\sum_{a=1}^{K}a p^a.
\end{aligned}
$$

The root equation gives $1<\beta<2$ and $\sum_{a=1}^Kp^a=1$, hence $w_0=1$, $p\le w_j\le1$, and $T>0$. Define real $K\times K$ matrices

$$
\begin{aligned}
C^\infty_{rs}&=\mathbf1_{\{r+s<K\}}\frac{p^{(r+s+1)/2}}{\sqrt T},\\
G^\infty_{rr'}&=\frac{p^{(r+r')/2}w_{\max(r,r')}}{T}.
\end{aligned}
$$

We will show that $G^\infty=C^\infty(C^\infty)^*$ is positive definite with trace one. For its eigenvalues $\lambda_1,\ldots,\lambda_K$, listed with multiplicity, the actual state's entropy satisfies

$$
\begin{aligned}
\lim_{\min(m,n)\to\infty}S_K(m,n)
&=S_K^\infty:=-\sum_{i=1}^{K}\lambda_i\ln\lambda_i,\\
0&<S_K^\infty<\ln K.
\end{aligned}
$$

Both lengths must diverge, but their relative growth rates are unrestricted.

**First recover the actual free-boundary counts.** Use the signed Parry chain $Q$ of the next section, on states $(b,j)\in\{\mathrm{false},\mathrm{true}\}\times\{0,\ldots,K-1\}$. Reading $0$ at $(b,j)$ flips the sign and resets to $(!b,0)$ with weight $p/w_j$; reading $1$ preserves the sign and advances to $(b,j+1)$ with weight $p w_{j+1}/w_j$, allowed only when $j+1<K$. From $x_0=(\mathrm{false},0)$, every legal word gives exactly one allowed path, and adjacent states uniquely recover each bit. The terminal sign is unrestricted: there is no extra factor of two or closing condition.

The weight of a length-$L$ path ending at run $j$ telescopes to $p^Lw_j$. If $N_L(b,j)$ counts paths ending at $(b,j)$, expansion of matrix multiplication gives

$$
\begin{aligned}
(Q^L)_{x_0,(b,j)}&=N_L(b,j)p^Lw_j,\\
z_Lp^L&=\sum_{b,j}\frac{(Q^L)_{x_0,(b,j)}}{w_j}.
\end{aligned}
$$

The terminal factor $1/w_j$ is essential: free-boundary counts are not obtained by simply taking a stationary marginal. The existing chain mixing bound and stationary law are

$$
\begin{aligned}
\pi(b,j)&=\frac{p^jw_j}{2T},\\
\operatorname{TV}(Q^L(x,\cdot),\pi)
&\le\theta_L:=(3/4)^{\lfloor L/3\rfloor}.
\end{aligned}
$$

Total variation is half the finite $\ell^1$ distance. Since $w_j\ge p$, summing with the terminal reweighting yields

$$
\begin{aligned}
z_Lp^L&=c+\varepsilon_L,\\
c&=\sum_{b,j}\frac{\pi(b,j)}{w_j}
=\frac{\sum_{j=0}^{K-1}p^j}{T}=\frac1{pT}>0,\\
|\varepsilon_L|&\le\frac2p\theta_L.
\end{aligned}
$$

The last identity for $c$ uses the root equation. This connects chain mixing to the actual word count with free boundaries.

**Then return from endpoint counts to the quantum state.** Once $m,n\ge K$, a left word with terminal run exactly $r$ has the unique form $u\,0\,1^r$, with $u\in W_{m-r-1}$; a right word with initial run exactly $s$ has the unique form $1^s\,0\,v$, with $v\in W_{n-s-1}$. The inserted zero prevents a forbidden run across the join, so these are actual bijections: $a_r=z_{m-r-1}$ and $b_s=z_{n-s-1}$. There is no all-ones exception in this eventual range.

The finite-kernel derivation uses normalized indicators of nonempty classes to factor the actual coefficient matrix as $M=UC^{m,n}V^*$, where

$$
C^{m,n}_{rs}=\mathbf1_{\{r+s<K\}}\sqrt{\frac{a_rb_s}{z_{m+n}}}.
$$

Thus the positive eigenvalues of the actual reduced state, with multiplicities, are exactly those of $G^{m,n}=C^{m,n}(C^{m,n})^*$. Additional physical zero eigenvalues contribute no entropy. For $r+s<K$, substitution of the count asymptotic gives

$$
(C^{m,n}_{rs})^2
=p^{r+s+2}\frac{(c+\varepsilon_{m-r-1})(c+\varepsilon_{n-s-1})}
{c+\varepsilon_{m+n}}
\longrightarrow\frac{p^{r+s+1}}T.
$$

All shifted indices are at least $\min(m,n)-K$, so the same vanishing bound $2\theta_{\min(m,n)-K}/p$ controls every error in these finitely many expressions. The denominator tends to $c>0$. Taking nonnegative square roots gives the joint tail limit $C^{m,n}\to C^\infty$, and hence $G^{m,n}\to G^\infty$. Direct multiplication gives the displayed formula for $G^\infty$, with $\operatorname{Tr}G^\infty=\sum_r p^rw_r/T=1$. For comparison, a standalone half-word's endpoint frequency tends to $a_r/z_m\to p^{r+1}$, whereas the stationary run mass is $p^rw_r/T$. The latter appears on the limiting Gram matrix's diagonal, but its off-diagonal entries must also be retained.

**Finally control spectrum and entropy.** Fixed dimension $K$ turns entrywise convergence into operator-norm convergence, for example through $\|E\|_{\mathrm{op}}\le K\max_{r,s}|E_{rs}|$. Apply the ordered-eigenvalue perturbation bound to the two Hermitian Gram matrices:

$$
|\lambda_i(G^{m,n})-\lambda_i(G^\infty)|
\le\|G^{m,n}-G^\infty\|_{\mathrm{op}}\longrightarrow0.
$$

Ordering retains every multiplicity and needs no simple-spectrum assumption. The function $\eta(x)=-x\ln x$ has the continuous endpoint value $\eta(0)=0$, so the fixed sum of $K$ terms converges. The actual-spectrum correspondence above makes this the physical reduced state's entropy limit.

Reversing the columns of $C^\infty$ gives a triangular matrix with constant diagonal $p^{K/2}/\sqrt T$, so $\det G^\infty=p^{K^2}/T^K>0$. Its $K\ge2$ eigenvalues are strictly positive and sum to one, making the entropy strictly positive. Strict convexity bounds entropy by $\ln K$, with equality only when every eigenvalue is $1/K$; the Hermitian spectral theorem would then force $G^\infty=I_K/K$. But $G^\infty_{0,1}=\sqrt p\,w_1/T>0$, ruling out equality.

The reused root, chain-mixing and spectral-perturbation tools are in this book's [currently pinned source](trureturing:), in `DBonacci/PerronRoot`, `ParryTwistedComparison.parry_mixing_and_complete_prefix` and `HermitianEigenvaluePerturbation.abs_eigenvalue_sub_eigenvalue_le_norm`; entropy continuity and Hermitian diagonalization use standard results of pinned Mathlib. The path counting, terminal reweighting and actual-state limit bridge are written out above, but the complete application has no Lean verification. $S_K^\infty$ is entanglement across one cut, distinct from the per-step shift entropy $\log_2\beta_K$; the uniform bound in [@ex-ch39-p2e-uniform-entropy] also passes to $S_K^\infty$. Fixed-side limits, changed phases, physical ground states and Rauzy-boundary entropy laws each need their own argument.
:::
