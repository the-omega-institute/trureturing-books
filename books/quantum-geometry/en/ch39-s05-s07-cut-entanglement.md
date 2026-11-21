# 35.6.7 Cross-Cut $1^K$ Prohibition and Attainable Schmidt Ranks of Direct Encoders {#sec-ch39-p2e-entanglement}

Partition a binary physical register of length $m_X + m_Y$ ($m_X, m_Y \ge 1$) across a cut into a left block $X$ of length $m_X$ and a right block $Y$ of length $m_Y$. Even when $x \in \{0, 1\}^{m_X}$ and $y \in \{0, 1\}^{m_Y}$ are individually $1^K$-free, their concatenation $xy$ can still assemble $K$ consecutive `1`s across the junction: writing $\tau(x)$ for the terminal run of `1`s in $x$ and $\iota(y)$ for the initial run of `1`s in $y$, the concatenated word $xy$ is admissible if and only if

$$
\tau(x) + \iota(y) < K.
$$

In the `trureturing` direct-encoder model, fix integers $N \ge 2$ and $K \ge 2$, and partition $\{0, 1, \dots, N\}$ by primality into the nonprime logical page ($b = \mathrm{false}$, dimension $M_0 > 0$) and the prime logical page ($b = \mathrm{true}$, dimension $M_1 > 0$). Let $C_{m, b}$ denote the set of length-$m$ admissible $1^K$-free words with first bit $b$, of cardinality $c_{m, b} = |C_{m, b}|$; for each threshold $0 \le s < K$, define the cumulative low-tail left row count and compatible right neighborhood count on page $1$ by

$$
a_s = \#\bigl\{x \in C_{m_X, 1} : \tau(x) < s\bigr\},\qquad n_s = \#\bigl\{y \in C_{m_Y, 1} : \iota(y) < K - s\bigr\},
$$

and set the combinatorial page-rank caps

$$
R_0 = \min\bigl(c_{m_X, 0},\; \lfloor c_{m_Y, 0} / M_0 \rfloor\bigr),\qquad R_1 = \min\Bigl(c_{m_X, 1},\; \min_{0 \le s < K}\bigl(a_s + \lfloor n_s / M_1 \rfloor\bigr)\Bigr).
$$

An isometric encoding matrix $J : \mathbb{C}^{\mathrm{Logical}(N)} \to \mathbb{C}^{\{0,1\}^{m_X} \times \{0,1\}^{m_Y}}$ paired with left-register page density states $\sigma_0, \sigma_1$ satisfies `directContract` if: (i) $J^* J = I$; (ii) physical first-bit page projectors on both $X$ and $Y$ intertwine the logical page projectors $\Pi_b$, with $\sigma_b$ supported in $C_{m_X, b}$; (iii) for **every** logical operator $A$, $\operatorname{Tr}_Y(J A J^*) = \sum_{b \in \{0,1\}} \operatorname{Tr}(\Pi_b A)\,\sigma_b$; and (iv) every concatenated pair $(x, y)$ violating the $1^K$-free law has zero encoded amplitude $(J\psi)(x, y) = 0$ for every logical input $\psi$. Under this contract, the attainable Schmidt ranks and von Neumann entropies are characterized completely:

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


::: {.example #ex-ch39-p2e-local-parent title="Paper derivation (not Lean-verified): a local parent Hamiltonian for the positive equal-amplitude legal-word state"}
The preceding entropy calculations specify a state. Can a local energy select it as its unique ground state? Start with two sites and the forbidden word `11`. In the basis $00,01,10,11$, take

$$
H_{2,2}=\begin{pmatrix}
2&-1&-1&0\\
-1&1&0&0\\
-1&0&1&0\\
0&0&0&1
\end{pmatrix}.
$$

The upper block is the Laplacian of the three-vertex path $01\leftrightarrow00\leftrightarrow10$: equal amplitudes at neighboring vertices cost no energy. The final diagonal entry penalizes the illegal word `11`. The spectrum is $0,1,1,3$, and the unique normalized zero state, up to overall phase, is $(1,1,1,0)/\sqrt3$. We now extend this mechanism to every finite length. This is an application of the standard configuration-graph Laplacian method with a paper proof; the complete construction has not been verified in Lean.

Fix $K\ge2$ and $N\ge0$. On the full space $\mathcal H_N=(\mathbb C^2)^{\otimes N}$, let $n_j=|1\rangle_j\langle1|$ and let $X_i$ flip bit $i$. Every length-$K$ window lies entirely within the chain, with no periodic wraparound. Define

$$
\begin{aligned}
B_a&=\prod_{j=a}^{a+K-1}n_j
\quad(1\le a\le N-K+1),\\
\mathcal W_i&=\{a:1\le a\le N-K+1,\ a\le i<a+K\},\\
C_i&=\prod_{a\in\mathcal W_i}
\left(I-\prod_{\substack{a\le j<a+K\\j\ne i}}n_j\right),\\
h_i&=C_i(I-X_i)C_i,\\
H_{K,N}&=\sum_{i=1}^{N}h_i+\sum_{a=1}^{N-K+1}B_a.
\end{aligned}
$$

Sums over empty index sets are $0$ and products are the identity, so there are no windows when $N<K$. The diagonal projector $C_i$ does not depend on the central bit and commutes with $X_i$. It examines only sites within distance $K-1$ of $i$: each $h_i$ is supported on at most $2K-1$ consecutive sites, truncated at the boundary, while each $B_a$ acts on $K$ sites. For $K=2$, $C_i$ is the product of vacancy projectors at the neighbors that lie within the chain.

**First expand in the full word basis.** Write $\Omega_N=\{0,1\}^N$, number sites from $1$ to $N$, and let $\sigma_iw$ flip only bit $i$. The diagonal entry of the original control projector is

$$
\begin{aligned}
c_i(w)&:=\langle w|C_i|w\rangle\\
&=\prod_{a\in\mathcal W_i}
\left(1-\prod_{\substack{a\le j<a+K\\j\ne i}}w_j\right)\in\{0,1\},\\
c_i(\sigma_iw)&=c_i(w),\qquad \sigma_i^2w=w.
\end{aligned}
$$

No factor reads $w_i$, so the last two identities hold for every full word, including illegal words. With row $v$ and column $w$, the permutation matrix of $X_i$ has entry $\langle v|X_i|w\rangle=\delta_{v,\sigma_iw}$. Insert resolutions of the identity in the full word basis to expand the operator product already defined above:

$$
\begin{aligned}
\langle v|h_i|w\rangle
&=\sum_{r,s\in\Omega_N}
\langle v|C_i|r\rangle\langle r|I-X_i|s\rangle
\langle s|C_i|w\rangle\\
&=c_i(v)\bigl(\delta_{v,w}-\delta_{v,\sigma_iw}\bigr)c_i(w).
\end{aligned}
$$

If $c_i(w)=1$, every full window containing $i$ has a zero away from the center, and that zero remains after the flip. All other windows are unchanged. Thus $w\in W_N$ if and only if $\sigma_iw\in W_N$, without any initial legality assumption. Enabled flips therefore preserve both the legal and illegal sectors. An enabled control does not certify global legality: take $K=2,N=4,w=1100,i=4$. The only window containing the center, $[3,4]$, passes the test because site $3$ is zero, so $c_4(1100)=1$; nevertheless, both $1100$ and $1101$ retain the forbidden window $[1,2]=11$. The local term $h_4$ still has diagonal entries $1$ and flip entries $-1$ on this illegal pair.

**How does the energy recognize legal words?** Fix a configuration $\eta$ outside site $i$, and write $\eta0,\eta1$ for the two words obtained by inserting the central bit at site $i$. Then $C_i(\eta)=1$ exactly when setting that bit to $1$ creates no forbidden window containing $i$. On this two-dimensional block, $h_i$ is

$$
\begin{pmatrix}1&-1\\-1&1\end{pmatrix};
$$

all other blocks vanish. Thus $h_i$ is positive semidefinite, as is the projector $B_a$. For an arbitrary $|\phi\rangle=\sum_w a_w|w\rangle$, let $\nu_K(w)$ count its all-$1$ windows of length $K$. The full-space energy identity is

$$
\begin{aligned}
\langle\phi|H_{K,N}|\phi\rangle
={}&\sum_{i=1}^{N}\ \sum_{\eta:C_i(\eta)=1}
|a_{\eta0}-a_{\eta1}|^2\\
&+\sum_{w\in\{0,1\}^N}\nu_K(w)|a_w|^2.
\end{aligned}
$$

Each undirected flip pair with fixed exterior configuration is counted once, with no extra factor of $2$. Zero energy first forces every illegal-word amplitude to vanish. Deleting any $1$ from a legal word preserves legality and has $C_i=1$, so the first sum forces the two legal-word amplitudes to agree. Repeated deletion connects every legal word to the all-zero word.

Conversely, a flip with $C_i=1$ preserves the legality status of the word: windows containing $i$ are legal at both endpoints, and all other windows are unchanged. Equal amplitudes on legal words and zero amplitudes on illegal words therefore annihilate every square and every penalty above. With $W_N$ again denoting all length-$N$ words avoiding $1^K$ and $z_N=|W_N|$, this gives

$$
\begin{aligned}
|\Psi_{K,N}\rangle&=z_N^{-1/2}\sum_{w\in W_N}|w\rangle,\\
\ker H_{K,N}&=\mathbb C|\Psi_{K,N}\rangle.
\end{aligned}
$$

The ground-state ray is consequently unique on the full tensor space, and every positive local term separately vanishes on it: the model is frustration-free. Each term preserves the span of legal words; on that subspace, $\sum_i h_i$ is precisely the Laplacian of the legal single-bit flip graph. The illegality penalty promotes uniqueness on this restricted space to uniqueness on the full space. It is essential: removing it in the $K=N=2$ example leaves $|11\rangle$ as an additional zero state.

**Length and physical interpretation.** For $N=0$, the space is the one-dimensional vacuum space and $H_{K,0}=0$; there is no excited level from which to define a gap. For each fixed $N\ge1$, the matrix is finite-dimensional and positive semidefinite with a one-dimensional kernel, so its first positive eigenvalue is strictly positive. This supplies no lower bound uniform in $N$. For $1\le N<K$, all $C_i=I$ and there is no penalty, giving $H_{K,N}=\sum_i(I-X_i)$, ground state $|+\rangle^{\otimes N}$, and gap exactly $2$.

The finite-cut entropy and fixed-$K$ two-sided limit of the preceding positive equal-amplitude state thus also describe ground-state entanglement in this specifically designed model. This does not identify it with the state selected by a physical Rydberg array, golden chain, Tribonacci hopping chain, or Rauzy geometry, and does not resolve the open relation between fractal boundaries and entanglement scaling.

Sources and correspondence: §15.9, Definition 15.22 and Proposition 15.23 of the [currently pinned source](trureturing:), theory volume `docs/develop/theory/AURIC_FIB_ATOM_PYRAMID_BOUNDARY_CALCULUS.md`, already provide a legal-space local parent for $K=2$ with positive activities $a_i$, together with the deletion proof. Here $a_i=1$, the control projector checks every forbidden window containing the center, and full-space penalties are included. Proposition 15.25 explicitly identifies the failure of full-space uniqueness without a penalty. Equations (3)–(5) of [Lesanovsky's three-body model](https://arxiv.org/abs/1010.2349v2) provide related physical context; signs, positive scale, and boundary correspondence are given in Attribution 15.24 of that volume. The arbitrary-$K$ construction here is justified by the displayed energy identity, rather than attributed to that paper as a proved experimental implementation.
:::

::: {.example #ex-ch39-p2e-heatbath-scale title="Paper derivation (not Lean-verified): heat-bath clocks of rate one per site and the full-space gap"}
The configuration-graph Laplacian in [@ex-ch39-p2e-local-parent] also has an exact stochastic interpretation. Fix $K\ge2$ and $N\ge1$, retaining its open boundaries and notation $W_N,z_N,C_i,h_i,B_a,H_{K,N}$ and $|\Psi_{K,N}\rangle$, and abbreviate $z=z_N$. Give legal words the uniform law $\pi(w)=1/z$. We derive this application directly on paper.

**What does one refresh do?** For site $i$, write $\mathrm{outside}_i$ for all bits except bit $i$. For an exterior configuration $\eta$ that occurs in $W_N$, set

$$
\begin{aligned}
F_i(\eta)&=\{w\in W_N:w_{-i}=\eta\},\\
(E_i f)(w)&=\frac1{|F_i(w_{-i})|}
\sum_{v\in F_i(w_{-i})}f(v).
\end{aligned}
$$

Here the exterior fixes all $N-1$ bits other than bit $i$. For a legal word $w$, denote this actual completion fiber also by

$$
\begin{aligned}
A_i(w)&:=F_i(w_{-i})\\
&=\{u\in W_N:u_j=w_j\ \forall j\ne i\}.
\end{aligned}
$$

A Boolean word with the same exterior can only be $w$ or $\sigma_iw$. If $c_i(w)=1$, the parent example's equivalence of legality puts both in $W_N$. Their bits at site $i$ differ, so $A_i(w)=\{w,\sigma_iw\}$ has cardinality exactly $2$. If $c_i(w)=0$, some full window containing $i$ has all its other bits equal to $1$. Legality of $w$ forces $w_i=0$, and flipping it to $1$ violates that window. Thus $A_i(w)=\{w\}$ has cardinality exactly $1$. This identifies the actual fibers using the original control condition.

This is conditional expectation given $\mathrm{outside}_i$. Setting any bit of a legal word to zero preserves legality, so each nonempty fiber is either $\{\eta0,\eta1\}$ or the forced-zero singleton $\{\eta0\}$; the central bit is inserted at site $i$. On a two-word fiber $C_i=1$, while on a forced-zero singleton $C_i=0$. The corresponding matrices are therefore

$$
\begin{aligned}
E_i&=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},\\
h_i&=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}=2(I-E_i),
\end{aligned}
$$

where the last equality uses the identification of function values with legal basis amplitudes. On a singleton $E_i=I$, and both sides vanish.

**Check the factor two entry by entry.** Define the refresh kernel on legal words, with row $v$ the current word and column $w$ the refreshed word. The uniform law $\pi$ gives

$$
\begin{aligned}
T_i(v,w)&=\frac{\mathbf1_{\{w\in A_i(v)\}}}{|A_i(v)|},\\
(E_if)(v)&=\sum_{w\in W_N}T_i(v,w)f(w),\\
\sum_{w\in W_N}T_i(v,w)&=1.
\end{aligned}
$$

When the control is enabled, each of the two words in the fiber has mass $1/2$, including a probability $1/2$ of drawing the current word again. When it is disabled, only $T_i(v,v)=1$ is nonzero. Words in the same fiber have the same $A_i$, so $T_i(v,w)=T_i(w,v)$. Operator rows and columns, by contrast, index output and input amplitudes. To compare that array with the refresh kernel acting on functions here, the flip involution gives $\delta_{v,\sigma_iw}=\delta_{w,\sigma_iv}$, while control invariance gives $c_i(\sigma_iv)=c_i(v)$.

Now take legal $v,w$. On the diagonal, the original product has entry $c_i(v)^2=c_i(v)$: this is $2(1-1/2)=1$ when enabled and $2(1-1)=0$ when disabled. If $w=\sigma_iv$, legality of both words forces the control to be enabled, since otherwise the window just described would exclude one of them. The product entry is then $-1=2(0-1/2)$. If the words are neither equal nor related by this flip, both the product entry and refresh mass vanish. Hence, in the same legal word basis,

$$
\langle v|h_i|w\rangle
=2\bigl(\delta_{v,w}-T_i(v,w)\bigr)
\qquad(v,w\in W_N).
$$

Each legal word in $W_N\subseteq\Omega_N$ still labels its original full word basis vector; equality and the Kronecker symbols are unchanged. This is precisely the restricted-space meaning of $h_i=2(I-E_i)$ above. The domain of $T_i$ consists of legal words, so this stochastic kernel identity does not directly extend to the native operator on illegal words.

For example, take $K=N=2$ and $i=2$. In legal basis order $(00,01,10)$, the actual fibers are $\{00,01\}$ and $\{10\}$, giving

$$
\begin{aligned}
T_2&=\begin{pmatrix}1/2&1/2&0\\1/2&1/2&0\\0&0&1\end{pmatrix},\\
h_2|_{\mathcal H_{\mathrm{legal}}}
&=\begin{pmatrix}1&-1&0\\-1&1&0\\0&0&0\end{pmatrix}
=2(I-T_2).
\end{aligned}
$$

The three row sums are $1/2+1/2=1$, $1/2+1/2=1$, and $1=1$. Site $1$ similarly connects $00$ with $10$. Adding the two local matrices and restoring penalty $1$ on the illegal basis vector $11$ gives exactly the parent example's original full $H_{2,2}$, still with spectrum $0,1,1,3$. For $N<K$, every $c_i=1$ and every actual single-site fiber has two words. For $N=0$, there are no sites or site entries, and this calculation makes no excited-gap assertion.

Give each site an independent Poisson clock of rate $1$. When its clock rings, resample that bit from the conditional law above, allowing the old value to be drawn again. The continuous-time generator of this heat-bath chain, acting on functions, is

$$
L=\sum_{i=1}^N(E_i-I).
$$

Thus each legal flip edge has jump rate $1/2$, and the chain makes an average of $N$ refresh attempts per unit time. If $P=N^{-1}\sum_iE_i$ is the discrete-time operator that chooses a uniformly random site and refreshes it once, then

$$
-L=N(I-P).
$$

A process with total refresh rate $1$ instead has generator $P-I=L/N$: the two clock conventions differ by a factor of $N$.

**From conditional variance to quantum energy.** Allow $f,g:W_N\to\mathbb C$. Use an inner product conjugate-linear in its first argument, and define

$$
\begin{aligned}
\langle f,g\rangle_\pi&=\frac1z\sum_{w\in W_N}\overline{f(w)}g(w),\\
\pi f&=\frac1z\sum_{w\in W_N}f(w),\\
\operatorname{Var}_\pi(f)&=\frac1z\sum_{w\in W_N}|f(w)-\pi f|^2.
\end{aligned}
$$

Averaging within fibers makes $E_i$ an orthogonal projection for this inner product: it is self-adjoint and idempotent, with range the functions constant on each fiber. Consequently,

$$
\begin{aligned}
\mathcal E(f,f)&:=-\langle f,Lf\rangle_\pi\\
&=\sum_i\|f-E_if\|_\pi^2\\
&=\sum_i\mathbb E_\pi\operatorname{Var}
(f\mid\mathrm{outside}_i)\\
&=\frac1{2z}\sum_{\{u,v\}\in\mathscr E_N}|f(u)-f(v)|^2,
\end{aligned}
$$

where conditional variance means $E_i(|f-E_if|^2)$ and $\mathscr E_N$ is the set of unordered legal word pairs differing at one bit, each edge counted once. The coefficient can be checked on a single pair: its conditional variance is $|f(u)-f(v)|^2/4$, and its fiber has $\pi$ mass $2/z$. Singleton fibers contribute zero. This also proves that $-L$ is self-adjoint and positive semidefinite.

Let $\mathcal H_{\mathrm{legal}}=\operatorname{span}\{|w\rangle:w\in W_N\}$, and define

$$
Uf=z^{-1/2}\sum_{w\in W_N}f(w)|w\rangle.
$$

To read this correspondence in the reverse direction for native complex amplitudes, write $Z=z=z_N$, so $\pi(w)=1/Z$. Any legally supported vector $|\psi_L\rangle=\sum_{w\in W_N}a_w|w\rangle$ has the explicit inverse image

$$
(U^{-1}\psi_L)(w)=f(w)=\sqrt Z\,a_w.
$$

For another legally supported vector $|\phi_L\rangle=\sum_{w\in W_N}b_w|w\rangle$, put $g(w)=\sqrt Z\,b_w$. The pairing, conjugate-linear in its first argument, and the norm satisfy

$$
\begin{aligned}
\langle f,g\rangle_\pi
&=\frac1Z\sum_{w\in W_N}
\overline{\sqrt Z\,a_w}\sqrt Z\,b_w\\
&=\sum_{w\in W_N}\overline{a_w}b_w
=\langle\psi_L,\phi_L\rangle,\\
\|f\|_\pi^2
&=\frac1Z\sum_{w\in W_N}|\sqrt Z\,a_w|^2
=\|\psi_L\|^2.
\end{aligned}
$$

All sums are finite and $Z>0$, so arbitrary legal complex amplitudes have a unique inverse image without further integrability or normalization assumptions. Thus $U:L^2(\pi)\to\mathcal H_{\mathrm{legal}}$ preserves inner products and is onto, hence unitary. Penalties vanish on the legal space, so the fiberwise matrix identity gives

$$
\begin{aligned}
H_{\mathrm{legal}}
&:=H_{K,N}|_{\mathcal H_{\mathrm{legal}}}
=U(-2L)U^{-1}\\
&=2N\,U(I-P)U^{-1},\\
\langle Uf,H_{K,N}Uf\rangle&=2\mathcal E(f,f),\\
U1&=|\Psi_{K,N}\rangle,\\
\langle\Psi_{K,N}|Uf\rangle&=\pi f.
\end{aligned}
$$

For these native amplitudes, set $\beta=\langle\Psi_{K,N}|\psi_L\rangle$. The finite mean and variance formulas become

$$
\begin{aligned}
\pi f&=\frac1Z\sum_{w\in W_N}\sqrt Z\,a_w
=\beta,\\
\operatorname{Var}_\pi(f)
&=\|f\|_\pi^2-|\pi f|^2\\
&=\|\psi_L\|^2-|\beta|^2
=\|\psi_L-\beta\Psi_{K,N}\|^2.
\end{aligned}
$$

Mean zero therefore corresponds exactly to orthogonality to the ground state. Writing $Q(A,\phi)=\langle\phi,A\phi\rangle$ for the quadratic form of a native self-adjoint operator, we also have, site by site,

$$
Q(h_i,\psi_L)=2\|f-E_if\|_\pi^2.
$$

Summing over sites recovers the total-energy identity above, $Q(H_{K,N},\psi_L)=2\mathcal E(f,f)$; every $B_a$ has zero quadratic form on legal support. The coefficient $2$ continues to correspond to clocks of rate $1$ per site.

**Why does the legal-space gap suffice?** Clearing one $1$ at a time connects every legal word to the all-zero word, so the legal flip graph is connected. Since $N\ge1$ and $K\ge2$, both the all-zero word and the word with only its first bit equal to $1$ are vertices. The edge energy therefore vanishes exactly on constant functions. The first positive eigenvalue $\lambda_{K,N}$ of $-L$ exists and satisfies

$$
\lambda_{K,N}=\inf_{f\not\equiv\mathrm{constant}}
\frac{\mathcal E(f,f)}{\operatorname{Var}_\pi(f)}>0.
$$

This variational formula follows directly from the finite-dimensional self-adjoint spectral decomposition: subtract the mean and expand in an orthogonal eigenbasis for the positive eigenvalues. The quotient is a weighted average of those eigenvalues, and a smallest-eigenvalue eigenvector attains the infimum.

We must also control $\mathcal H_{\mathrm{illegal}}=\mathcal H_{\mathrm{legal}}^\perp$. The parent example proves that flips enabled by $C_i$ preserve legality status. Thus each $h_i$ preserves both spaces, as do the diagonal $B_a$. If the illegal space is nonempty, then for any $|\chi\rangle=\sum_{w\notin W_N}a_w|w\rangle$ in it, each illegal word contains at least one forbidden window, giving

$$
\begin{aligned}
\langle\chi,H_{K,N}\chi\rangle
&\ge\sum_{w\notin W_N}\nu_K(w)|a_w|^2\\
&\ge\|\chi\|^2.
\end{aligned}
$$

The first step uses $h_i\ge0$; the second uses $\nu_K(w)\ge1$. Write $\Delta_{K,N}$ for the first positive eigenvalue of the full $H_{K,N}$. Every vector orthogonal to the ground state splits uniquely as $Uf+\chi$ with $\pi f=0$. There is no cross energy between these orthogonal blocks, so

$$
\begin{aligned}
\langle Uf+\chi,H_{K,N}(Uf+\chi)\rangle
&\ge2\lambda_{K,N}\|f\|_\pi^2+\|\chi\|^2,\\
\min\{1,2\lambda_{K,N}\}
&\le\Delta_{K,N}\le2\lambda_{K,N}.
\end{aligned}
$$

For the upper bound, take an eigenvector for the smallest positive legal-space eigenvalue. If the illegal space is absent, $\chi=0$ throughout and the sharper equality $\Delta_{K,N}=2\lambda_{K,N}$ holds; there is no additional excitation of energy $1$.

**Two exact boundary checks.** For $1\le N<K$, every word is legal, the illegal space is absent, and $E_i=(I+X_i)/2$. The product characters $f_A(w)=(-1)^{\sum_{i\in A}w_i}$, indexed by $A\subseteq\{1,\ldots,N\}$, form an orthogonal basis of function space and satisfy $-Lf_A=|A|f_A$. Hence $\lambda_{K,N}=1$ and $\Delta_{K,N}=2$, including $N=1$. For $K=N=2$, in the legal-word order $00,01,10$,

$$
-L=\frac12\begin{pmatrix}2&-1&-1\\-1&1&0\\-1&0&1\end{pmatrix}.
$$

The vectors $(1,1,1)$, $(0,1,-1)$ and $(-2,1,1)$ have eigenvalues $0,1/2,3/2$, respectively. Both $h_i$ vanish on the illegal word $11$, whose penalty energy is $1$. The full spectrum is therefore $0,1,1,3$, agreeing with the parent example.

For fixed $K$, the two-sided bounds show that $\inf_{N\ge1}\Delta_{K,N}>0$ if and only if $\inf_{N\ge1}\lambda_{K,N}>0$. By the variational formula, this is equivalent to the existence of a finite constant $C_K>0$, depending only on $K$, such that for every $N\ge1$ and every complex-valued function,

$$
\operatorname{Var}_\pi(f)\le C_K\mathcal E(f,f).
$$

For example, a heat-bath gap bound $c_K>0$ would yield the full gap bound $\min\{1,2c_K\}$; conversely, a full gap bound $d_K>0$ would yield a heat-bath gap bound $d_K/2$. This reduction alone proves neither the existence nor a value of such a constant uniform in length. The next example supplies an explicit uniform Poincaré estimate for this same hard-constraint heat-bath chain with open boundaries. Transfer-matrix mixing along word length controls spatial correlations; without a further theorem relating the two dynamics, it cannot replace this estimate in refresh time.
:::

::: {.example #ex-ch39-p2e-uniform-parent-gap title="Paper derivation (not Lean-verified): a uniform gap at fixed forbidden-run length"}
A single refresh changes only one bit, but a zero interrupts every all-ones constraint crossing it. Refreshing several adjacent bits together lets a disagreement in the boundary conditions stop propagating at the first common zero. We turn this mechanism into an explicit bound independent of chain length. This is a paper derivation and adds no Lean verification.

Retain the model of [@ex-ch39-p2e-heatbath-scale], fix an integer $K\ge2$, and put

$$
R=K-1,\qquad \ell=2K-1,\qquad C_K=\ell^2 2^\ell.
$$

For every $N\ge1$, we will prove

$$
\begin{aligned}
\operatorname{Var}_\pi(f)&\le C_K\mathcal E(f,f)
&&\text{for every }f:W_N\to\mathbb C,\\
\lambda_{K,N}&\ge C_K^{-1},\\
\Delta_{K,N}&\ge 2C_K^{-1}
=\frac{2^{2-2K}}{(2K-1)^2}.
\end{aligned}
$$

The constant does not depend on $N$. It is not asserted to be optimal or uniform in $K$.

**First refresh blocks.** Number the sites $1,\ldots,N$. For every integer $a=2-\ell,\ldots,N$, retain the indexed nonempty interval

$$
B_a=[a,a+\ell-1]\cap[1,N],\qquad M=N+\ell-1.
$$

Even when two truncated intervals coincide, retain their separate indices. Each site belongs to exactly $\ell$ blocks: those containing $u$ have indices $u-\ell+1,\ldots,u$.

First write one conditional refresh as a matrix on the actual legal words. For any finite set of sites $B\subseteq[1,N]$, take complements in $[1,N]$. Put $Z=\#W_N=z_N>0$ (the all-zero word is legal), and for $x,y\in W_N$ define

$$
\begin{aligned}
\mathcal A_B(x)&=\{y\in W_N:y|_{B^c}=x|_{B^c}\},\\
m_B(x)&=\#\mathcal A_B(x)>0,\\
T_B(x,y)&=\frac{\mathbf1_{\{y\in\mathcal A_B(x)\}}}{m_B(x)},\\
(E_Bf)(x)&=\sum_{y\in W_N}T_B(x,y)f(y).
\end{aligned}
$$

The denominator is nonzero because $x\in\mathcal A_B(x)$. Given the entire exterior $x|_{B^c}$, the fiber has probability $m_B(x)/Z$, and each full word in it has conditional probability exactly $(1/Z)/(m_B(x)/Z)=1/m_B(x)$. Thus $T_B$ is precisely the uniform legal-word refresh with every exterior bit fixed; restricting to $B$ gives the block update law.

Equal exterior data partition $W_N$ into disjoint nonempty fibers. If $y\in\mathcal A_B(x)$, then $\mathcal A_B(y)=\mathcal A_B(x)$ and $m_B(y)=m_B(x)$; if the words lie in different fibers, both matrix entries vanish. Hence $T_B$ is a nonnegative real symmetric matrix. Each row distributes unit mass uniformly over its fiber, and symmetry gives unit column sums as well. In particular, both marginals of the joint law $\pi(x)T_B(x,y)$ are exactly the original uniform law:

$$
\begin{aligned}
\sum_yT_B(x,y)&=1, &\sum_xT_B(x,y)&=1,\\
\sum_y\pi(x)T_B(x,y)&=\frac1Z,
&\sum_x\pi(x)T_B(x,y)&=\frac1Z.
\end{aligned}
$$

For each such fiber $C$, write $\bar f_C=(\#C)^{-1}\sum_{x\in C}f(x)$. The function $E_Bf$ equals $\bar f_C$ throughout $C$, so averaging again changes nothing: $E_B^2=E_B$. For arbitrary complex-valued $f,g$, group the finite sums by fibers to obtain

$$
\begin{aligned}
\langle f,E_Bg\rangle_\pi
&=\frac1Z\sum_C(\#C)\overline{\bar f_C}\,\bar g_C\\
&=\langle E_Bf,g\rangle_\pi,\\
\langle f,E_Bf\rangle_\pi
&=\frac1Z\sum_C(\#C)|\bar f_C|^2\ge0.
\end{aligned}
$$

Thus $E_B$ is self-adjoint, positive semidefinite, and the orthogonal projection onto functions constant on each fiber. These properties follow from the actual fiber averages. The residual energy can also be computed directly on each fiber: expand squared complex moduli and use $\sum_{x\in C}f(x)=(\#C)\bar f_C$ to get

$$
\begin{aligned}
\sum_{x\in C}\overline{f(x)}(f(x)-\bar f_C)
&=\sum_{x\in C}|f(x)|^2
-\frac{\left|\sum_{x\in C}f(x)\right|^2}{\#C}\\
&=\sum_{x\in C}|f(x)-\bar f_C|^2\\
&=\frac1{2\#C}\sum_{x,y\in C}|f(x)-f(y)|^2.
\end{aligned}
$$

The last step is another finite expansion, with conjugate cross terms paired into real parts. Here conditional variance means $\operatorname{Var}(f\mid B^c)=E_B(|f-E_Bf|^2)$, using squared complex modulus. Sum the identity over all fibers and divide by the global word count $Z$ to obtain

$$
\begin{aligned}
\operatorname{Re}\langle f,(I-E_B)f\rangle_\pi
&=\frac1{2Z}\sum_x\sum_yT_B(x,y)|f(x)-f(y)|^2\\
&=\frac1Z\sum_x\sum_yT_B(x,y)
|f(y)-(E_Bf)(x)|^2\\
&=\pi\!\left[\operatorname{Var}(f\mid B^c)\right].
\end{aligned}
$$

The inner product on the left is already real and nonnegative, and also equals $\|f-E_Bf\|_\pi^2$. The exterior data of a fiber $C$ occur with probability $\#C/Z$, and its conditional variance is $(\#C)^{-1}\sum_{x\in C}|f(x)-\bar f_C|^2$; this explains the global factor $1/Z$ after averaging over the exterior. For $B=\varnothing$, $E_B=I$; for $B=[1,N]$, $E_Bf=\pi f$. These fiber identities also hold for the single empty word at $N=0$, without assigning an excited gap to the empty chain.

Now define, using the original block indices,

$$
P_B=\frac1M\sum_a E_{B_a},\qquad
L_B=M(P_B-I),\qquad
\mathcal E_B(f,f)=\sum_a\pi\!\left[\operatorname{Var}(f\mid B_a^c)\right].
$$

Each indexed block has its own rate-one clock. Thus $-L_B=\sum_a(I-E_{B_a})$; summing the energy identity just proved over these indices gives $\mathcal E_B(f,f)=\langle f,-L_Bf\rangle_\pi$. Repeated block values still contribute once per clock index, with no additional $1/M$.

**One boundary disagreement has a bounded cost.** Start with two legal words $x,y$ agreeing at every site other than $u$ (allowing $x=y$), and choose the same block index for both chains. If the block contains $u$, their exteriors agree, and identical whole-block refreshes erase the disagreement.

For a distant block, we must compare the laws restricted to the block after conditioning on every exterior bit. More generally, take any finite set of sites $B\subseteq[1,N]\setminus\{u\}$ with $|v-u|\ge K$ for every $v\in B$. For $z=x,y$, use $\mathcal A_B(z)$ as defined above, and denote the restriction to $B$ of the uniform full-word conditional law on this fiber by $\mu_B^z$. The two completion sets contain $x$ and $y$, respectively, so their normalizing denominators are nonzero.

For $w\in\mathcal A_B(x)$, replace its bit at $u$ by $y_u$ and leave all other bits unchanged, obtaining $\Phi(w)$. A length-$K$ window avoiding $u$ is unchanged. A window containing $u$ cannot meet $B$, so after the replacement it agrees throughout with the legal word $y$. Thus $\Phi(w)$ is legal and agrees with $y$ on the entire exterior $B^c$. Replacing the bit at $u$ by $x_u$ gives the inverse map. This bijection preserves every bit in $B$, so it preserves both the total number of completions and the number with each assignment $b\in\{0,1\}^B$. Consequently,

$$
\begin{aligned}
\mu_B^x(b)
&=\frac{\#\{w\in\mathcal A_B(x):w|_B=b\}}{\#\mathcal A_B(x)}\\
&=\frac{\#\{w\in\mathcal A_B(y):w|_B=b\}}{\#\mathcal A_B(y)}
=\mu_B^y(b).
\end{aligned}
$$

We may therefore draw the same assignment from this common block law for a synchronous refresh, creating no new disagreement. If $x_u\ne y_u$, the refreshed full words still differ at the exterior site $u$, and their full-word conditional laws are unequal. The argument only needs that no length-$K$ window meets both $u$ and $B$; the distance condition guarantees this. The set $B$ need not be contiguous, nonempty, or on one side of $u$. The cases $B=\varnothing$, $x=y$, and short chains $N<K$ are included (short chains have no such windows).

There are at most $2R$ remaining affected blocks excluding $u$: a right block starts at one of $u+1,\ldots,u+R$, and a left block ends at one of $u-R,\ldots,u-1$. Truncation only reduces these index ranges. When $N<\ell$, coincident whole-chain blocks still count separately among the blocks containing $u$.

For an affected right block, sample its conditional law sequentially from left to right. Given any admissible sampled prefix of either chain, the conditional probability that the next bit is $0$ is at least $1/2$: changing the next bit of any legal completion from $1$ to $0$, with every other bit fixed, gives a distinct legal zero-completion. This is an injection because deleting a one cannot create an all-ones constraint violation.

At each step use a fresh shared uniform random variable, with each chain's own conditional threshold, to choose the next bit. Given the full joint sampled past, the probability of a common zero is at least $1/2$. After the first common zero, the two conditional laws of the remaining suffix coincide: every contiguous window connecting earlier history to the unsampled suffix crosses that zero and already satisfies its constraint, while the exterior data at the far end agree. The rest of the suffix can therefore be sampled identically. Every step preserves each chain's conditional sampling law; stopping at a common zero does not alter either marginal.

Set $m=|B|$, and write $(X_j,Y_j)$ for the output bit pairs in scan order, $1\le j\le m$. Define the first-common-zero position on every output: take its earliest scanned position when it exists, and set $T=m+1$ when the entire block has no common zero. Let $\mathcal G_j$ be the information generated by the first $j$ sampled bit pairs, and put $A_j=\{T>j\}$, with $A_0$ the whole sample space. All statements here about probabilities conditional on sampled histories concern only histories of positive probability.

Before the first common zero, continue using a fresh shared uniform random variable at each step even if the two remaining conditional laws already agree; after a common zero, only a shared completion from the common suffix law is needed. On $A_{j-1}$, the next pair has conditional common-zero probability at least $1/2$. Thus, for $1\le j\le m$,

$$
\begin{aligned}
\Pr(A_j)
&=\mathbb E\!\left[\mathbf1_{A_{j-1}}
  \Pr\!\left((X_j,Y_j)\ne(0,0)\mid\mathcal G_{j-1}\right)\right]\\
&\le\frac12\Pr(A_{j-1})
\le2^{-j}.
\end{aligned}
$$

The event $A_j$ excludes only a common zero in the first $j$ steps; it still permits $(1,1)$ and does not mean that every step disagrees. At a common zero the bits agree, and the remaining suffix is synchronized, so a disagreement at scanned position $j$ requires $T>j$. The same joint law therefore satisfies both

$$
\begin{aligned}
\Pr(X_j\ne Y_j)&\le\Pr(T>j)\le2^{-j}
&& (1\le j\le m),\\
\mathbb E\!\left[\sum_{j=1}^{m}\mathbf1_{X_j\ne Y_j}\right]
&\le\sum_{j=1}^{m}2^{-j}=1-2^{-m}\le1.
\end{aligned}
$$

The expectation bound uses only linearity of finite sums, with no independence assumption on disagreements at different positions. At $j=m$, $A_m=\{T=m+1\}$ is exactly the event of no common zero anywhere in the block. This example uses nonempty blocks; extending this paper construction to $m=0$ gives $T=1$, an empty sum, and zero cost. If the two initial conditional block laws already coincide, they may instead be sampled synchronously: their disagreement cost is zero without requiring an actual zero anywhere in the block.

To separate the native emitted law from the paper's shared-threshold construction, fix the finite coordinates explicitly. Let $W_n=\operatorname{Fin}(n)\to\{\mathrm{false},\mathrm{true}\}$, and let $C(k,n,F,z)$ be the set of complete words accepted by the original `DBonacciAdmissible` scan and agreeing with $z$ on the finite set $F\subseteq\operatorname{Fin}(n)$. When this fiber has witness $h$, write $L(F,z,h)=\operatorname{completionLaw}(F,z,h)$. For two nonempty fibers, write the original definition as $P(s,F,x,y,h_x,h_y)=\operatorname{prefixCoupling}(s,F,x,y,h_x,h_y)$. Following the Lean source, these names mean: $\operatorname{completionLaw}(F,z,h)$ is the uniform distribution on the nonempty fiber $C(k,n,F,z)$; $\operatorname{resetReady}(F,x,y)$ says that there is a coordinate $z_0$ with $x(z_0)=y(z_0)=\mathrm{false}$, every coordinate up to $z_0$ lies in $F$, and $x$ and $y$ agree on the coordinates of $F$ beyond $z_0$; and $P$ is a joint law of two completions, defined by recursion on the scan list $s$. If $\operatorname{resetReady}(F,x,y)$ holds, it fixes such a $z_0$ and a legal word $v$ in the fiber of $y$, draws one completion $u$ from $L(F,x,h_x)$, and emits $(u,\operatorname{resetMap}(z_0,v,u))$, where $\operatorname{resetMap}(z_0,v,u)$ takes $v$ on coordinates up to $z_0$ and $u$ elsewhere. Otherwise, if $s$ is empty, the two sides are sampled independently from their own completion laws; if $s=i::s'$, a shared-threshold coupling draws a pair $(b_1,b_2)$ of the two conditional bits at coordinate $i$ (both marginals are kept, and the probability of a common `false` is the smaller of the two `false` probabilities), $i$ is added to $F$, $x(i)$ and $y(i)$ are replaced by $b_1$ and $b_2$, and the recursion continues on $s'$; if either refined fiber is empty (such bit pairs carry zero mass), it falls back to independent sampling. For an emitted pair $w=(w_1,w_2)$, define

$$
A_j(w)\;:\Longleftrightarrow\;\forall i\in\operatorname{take}(j,s),\;
\neg\bigl(w_1(i)=\mathrm{false}\land w_2(i)=\mathrm{false}\bigr).
$$

Here `take` takes the first $j$ coordinates in list order; the coordinates are only required to be duplicate-free, with no increasing-order, complement-cover, or interval assumption. The native emitted event therefore has the following exact Lean attribution:

::: {.theorem #thm-ch39-p2e-native-emitted-tail title="Geometric Tail for the Original Conditional Coupling's Complete Emitted Output" lean="D5/S1/Words/AdmissibleWords/KBonacciEmittedTail.prefix_coupling_emitted_tail"}
For every $k,n\in\mathbb N$ with $0<k$, every duplicate-free list $s:\operatorname{List}(\operatorname{Fin}(n))$, and every finite fixed set $F:\operatorname{Finset}(\operatorname{Fin}(n))$ whose elements are disjoint from $s$, take arbitrary $x,y:W_n$ with nonempty fibers $C(k,n,F,x)$ and $C(k,n,F,y)$. For each $j\le |s|$, under the original joint law $P(s,F,x,y,h_x,h_y)$, the mean of the indicator of $A_j$ satisfies

$$
\operatorname{mean}\!\left(P(s,F,x,y,h_x,h_y),\;w\mapsto\mathbf 1_{A_j(w)}\right)\le 2^{-j}.
$$

This retains `prefixCoupling`'s initial `resetReady` test, recursive branch, and independent fallback for impossible refinements. The event permits $(\mathrm{true},\mathrm{true})$ and includes $j=0$, empty scans, the whole scan, $x=y$, and the initial reset branch.
:::

::: proof
Use counting induction in each fixed completion fiber: changing a selected free coordinate from `true` to `false` is an injection, so the event that the first $j$ selected coordinates are all `true` has mass at most $2^{-j}$. In the `resetReady` branch the two outputs agree coordinatewise on free sites, so the event reduces exactly to that all-`true` counting bound. In the recursive branch the emitted head is the sampled bit pair; the `(false,false)` child contributes zero to the event, while every positive-mass other child enters the corresponding refined fibers and uses the induction hypothesis, with the half-failure budget supplying the next factor $1/2$. Zero-mass and impossible refinements contribute nothing. The induction applies directly to the original `prefixCoupling`, without replacing its initial test or independent fallback. The full proof is checked by the Lean kernel.
:::

The common-zero tail bound controls the probability of not yet seeing a common zero. To use it to control later disagreements, one also needs agreement of the complete outputs after a common zero. In an increasing scan of all free coordinates, a common `false` at the head leaves every coordinate to its left fixed. If the farther fixed data also agree, the original reset condition holds. The following statement places this mechanism directly on the output support of the same $P$.

::: {.theorem #thm-ch39-p2e-native-supported-coalescence title="Common-Zero Coalescence on the Complete Output Support of the Original Conditional Coupling" lean="D5/S1/Words/AdmissibleWords/KBonacciSupportedCoalescence.prefix_coupling_supported_coalescence"}
For every $k,n\in\mathbb N$ with $0<k$, take a duplicate-free (`Nodup`) list $s:\operatorname{List}(\operatorname{Fin}(n))$ strictly increasing in coordinate value, and a finite fixed set $F:\operatorname{Finset}(\operatorname{Fin}(n))$ such that, for every $i\in\operatorname{Fin}(n)$, $i\in s$ if and only if $i\notin F$. Take arbitrary histories $x,y:W_n$ and witnesses $h_x,h_y$ that the original completion fibers $C(k,n,F,x)$ and $C(k,n,F,y)$ are nonempty. Assume further that

$$
\forall i\in s,\;\forall t\in F,\quad i<t\ \Longrightarrow\ x(t)=y(t).
$$

For every complete output pair $w=(w_1,w_2)\in W_n\times W_n$ with $P(s,F,x,y,h_x,h_y)(w)\ne0$, and all $r,q\in\operatorname{Fin}(|s|)$ with $r\le q$,

$$
w_1(s[r])=\mathrm{false}\ \land\ w_2(s[r])=\mathrm{false}
\quad\Longrightarrow\quad w_1(s[q])=w_2(s[q]).
$$

Here $s[r]$ is the scan coordinate at the zero-based index $r$; the histories $x,y$ need not themselves be admissible words. The conclusion is vacuous for an empty scan, including $n=0$. The statement includes $F=\varnothing$, $x=y$, an initially satisfied reset condition, $r=q$, and $k=1$.
:::

::: proof
Induct on the scan list, retaining the same complete output pair $w$ throughout. If `resetReady` holds initially, the original definition chooses a reset coordinate $z$ and an actual legal representative $v$ from the completion fiber of $y$. Map support for the reset law writes $w$ as $(u,\operatorname{resetMap}(z,v,u))$. Every coordinate at or before $z$ is fixed, so every free scan coordinate lies strictly after $z$, where `resetMap` retains $u$. Thus the two complete outputs agree at every scanned coordinate. This uses an actual legal representative rather than assuming the arbitrary history is legal; the chosen reset coordinate need not be the head just scanned.

Otherwise, a nonempty scan samples the head bit pair from the original next-bit coupling. Bind support supplies a bit pair of nonzero mass and retains the same $w$ in the support of its child law. Both refined completion fibers for this bit pair are nonempty. The original definition retains both independent fallback branches for impossible refinements; the corresponding bit pairs simply have zero mass. The child's exact completion-law marginals and fixed-coordinate property together identify the head of $w$ with the sampled bit pair. If the common zero is at the head, both sampled bits are therefore `false`. Strict order, complement cover, and agreement at farther fixed coordinates make the refined histories satisfy `resetReady`, so the reset argument gives agreement at every remaining scanned position. If the common zero occurs later, strict order, complement cover, and farther fixed agreement pass to the refined histories, and induction applies to the same $w$, including when the child has already reset. For $r=q$, equality follows directly because both values are `false`; an empty scan has no finite index to choose. The full proof is checked by the Lean kernel.
:::

Under all the hypotheses of [@thm-ch39-p2e-native-supported-coalescence], its conclusion combines with [@thm-ch39-p2e-native-emitted-tail] on the same native joint law to bound pointwise disagreement and finite Hamming cost. Explicitly, retain $k>0$ and $n\in\mathbb N$; let $s$ be duplicate-free, strictly increasing in coordinate value, and enumerate exactly the complement of $F$. The two original completion fibers of the arbitrary histories $x,y$ are nonempty, and $i<t$ implies $x(t)=y(t)$ whenever $i\in s$ and $t\in F$. The histories themselves need not be admissible. Fix

$$
\begin{aligned}
m&=|s|,\qquad a=\tfrac12\in\mathbb R_{\ge0}\cup\{\infty\},\\
P&=P(s,F,x,y,h_x,h_y).
\end{aligned}
$$

Throughout, $P$ is the original `prefixCoupling` above, including its initial `resetReady` test, actual completion-representative choices, and both independent fallback branches for impossible refinements. For a zero-based index $q\in\operatorname{Fin}(m)$, define the disagreement indicator and scan cost, with values in the extended nonnegative reals, by

$$
\begin{aligned}
D_q(w)&=\mathbf1_{\{w_1(s[q])\ne w_2(s[q])\}},\\
H_s(w)&=\sum_{q\in\operatorname{Fin}(m)}D_q(w)
=\operatorname{scanHamming}(s,w).
\end{aligned}
$$

$H_s$ counts disagreements only at scanned coordinates; absence of duplicates makes each free coordinate count exactly once. Relative to the paper construction's one-based numbering above, this $q$ corresponds to $j=q+1$. This correspondence of indices does not identify the two joint laws.

Fix $q$ and a complete output with $P(w)\ne0$. A common `false` among the first $q+1$ scanned positions has some zero-based index $r\le q$, so supported coalescence forces agreement at position $q$. Taking the contrapositive gives

$$
\{w:D_q(w)=1\}\cap\operatorname{supp}(P)
\subseteq A_{q+1}\cap\operatorname{supp}(P).
$$

Here $A_j$ retains its preceding definition: it excludes common zeros, permits $(\mathrm{true},\mathrm{true})$, and does not require disagreement at every position. Outside the support, $P(w)=0$, so the weighted term vanishes even where the event inclusion need not hold. Thus every complete output satisfies

$$
P(w)D_q(w)\le P(w)\mathbf1_{A_{q+1}(w)}.
$$

Summing these nonnegative terms and applying the tail bound to this same $P$ at $j=q+1\le m$ yields

$$
\begin{aligned}
\Pr_P(D_q=1)
&=\operatorname{mean}(P,D_q)\\
&\le\operatorname{mean}(P,\mathbf1_{A_{q+1}})
\le a^{q+1}.
\end{aligned}
$$

Now add the pointwise bounds under the same joint law. Both the complete-pair space $W_n\times W_n$ and the scan index set are finite. Writing the nonnegative sum in `mean` as a finite sum, distributing multiplication, and exchanging the two finite sums gives

$$
\begin{aligned}
\operatorname{mean}(P,H_s)
&=\sum_{w\in W_n\times W_n}P(w)
  \sum_{q\in\operatorname{Fin}(m)}D_q(w)\\
&=\sum_{q\in\operatorname{Fin}(m)}\operatorname{mean}(P,D_q)\\
&\le\sum_{q=0}^{m-1}a^{q+1}=1-a^m.
\end{aligned}
$$

The final geometric identity uses lawful subtraction in the extended nonnegative reals. First take $b=1/2$ in $\mathbb R_{\ge0}$. The finite geometric-sum identity gives

$$
\left(\sum_{q=0}^{m-1}b^q\right)(1-b)=1-b^m,
\qquad 1-b=b.
$$

Hence $\sum_{q=0}^{m-1}b^{q+1}=1-b^m$. The standard embedding $\mathbb R_{\ge0}\hookrightarrow\mathbb R_{\ge0}\cup\{\infty\}$ preserves finite sums, powers, and truncated subtraction, giving the displayed identity for $a$. Here $b^m\le1$, and every term and the result are finite; no infinite quantity is canceled. The mean calculation uses only finite sums and requires no independence between disagreement events at different positions.

When $m=0$, the pointwise statement is vacuous, $H_s=0$, and the right side is $1-a^0=0$; this includes $n=0$. For a nonempty scan, the endpoint $q=m-1$ uses precisely the whole-scan event $A_m$ and gives $a^m$, retaining the last position. Empty $F$, equal histories $x=y$, an initial reset, and $k=1$ all remain within the same hypotheses, with no exclusion of degenerate cases and no change of coupling.

This is an application of the two cited results to one native joint law; neither Lean declaration individually states these combined inequalities. The two original completion-law marginals of `prefixCoupling` are already established. The remaining step for the actual block refresh below is to identify the relevant completion fibers, their restrictions, and the laws after restoring exterior data with this example's $\mu_B^z$ and $T_B(z,\cdot)$. For left blocks, simultaneous transport of both outputs, support, and events through `Fin.rev` also remains to be supplied. Equality in law between the paper's shared-threshold construction and the native joint law is not supplied here and does not follow from these estimates. The preceding paper derivation therefore retains its boundary as a complete P2E application; no physical identification with an experimental Hamiltonian is established here.

Reverse the scan for a left block. Write $d$ for Hamming distance on full words.

To turn the block coupling into one joint law of full words, restore the exterior data. For any block $B$, likewise let $\mu_B^z$ denote the restriction of $T_B(z,\cdot)$ to the block. For $z=x,y$ and an assignment $b\in\{0,1\}^B$, define

$$
R_z(b)_i=
\begin{cases}
b_i,&i\in B,\\
z_i,&i\notin B.
\end{cases}
$$

Restriction $w\mapsto w|_B$ is a bijection from $\mathcal A_B(z)$ onto the support of $\mu_B^z$, with inverse $R_z$: once the exterior is fixed, each feasible block assignment has exactly one full-word completion. Drawing from $\mu_B^z$ and restoring the exterior therefore gives exactly the full-word law $T_B(z,\cdot)$, supported on legal words. Let $J$ be the joint law of the two block updates constructed above. Draw $(b,c)\sim J$ and set $(X',Y')=(R_x(b),R_y(c))$ simultaneously. This defines one joint law $Q$ of legal full-word pairs, with marginals $T_B(x,\cdot)$ and $T_B(y,\cdot)$.

When $u\notin B$, the exteriors agree everywhere except possibly at $u$. Write $\delta=\mathbf1_{\{x_u\ne y_u\}}$ and $d_B(b,c)=\sum_{i\in B}\mathbf1_{\{b_i\ne c_i\}}$. The pointwise distance identity and its expectation under this joint law are

$$
\begin{aligned}
d(R_x(b),R_y(c))&=d_B(b,c)+\delta,\\
\mathbb E_Q[d(X',Y')]&=\mathbb E_J[d_B(b,c)]+\delta.
\end{aligned}
$$

Thus the synchronous coupling of a distant block leaves full-word distance exactly $\delta$. The scan coupling of an affected block has expected full-word distance at most $1+\delta$, hence at most $2$ for adjacent inputs. If the block contains $u$, the common full-word draw chosen earlier has distance $0$. For $x=y$, identical refreshes can be chosen for every block, keeping the full-word distance at $0$.

Averaging these three cases over the block indices, the complete one-step block refresh satisfies

$$
\mathbb E[d(X',Y')]
\le 1-\frac\ell M+\frac{2R}M
=1-\frac1M
\quad\text{when }d(x,y)=1.
$$

**From coupling to a block gap.** Only the actual couplings of adjacent legal words are needed here. First make their finite sums explicit. Write $T_a=E_{B_a}$, and for each oriented adjacent pair $(s,t)$ and each original clock index $a$, let $Q_a(s,t;v,w)$ be the mass of the single joint law of refreshed full words constructed above. It satisfies

$$
\begin{aligned}
Q_a(s,t;v,w)&\ge0,\\
\sum_wQ_a(s,t;v,w)&=T_{B_a}(s,v),\\
\sum_vQ_a(s,t;v,w)&=T_{B_a}(t,w),\\
\sum_{v,w}Q_a(s,t;v,w)&=\sum_vT_{B_a}(s,v)=1.
\end{aligned}
$$

All word indices range over the original $W_N$. The last equality follows from the first marginal and the row sum already proved. Define the full Hamming cost using this joint law:

$$
C_a(s,t)=\sum_{v,w}Q_a(s,t;v,w)d(v,w).
$$

Since $0\le d(v,w)\le N$ and the total mass is $1$, $C_a(s,t)$ is a finite real number in $[0,N]$. The $\ell$ indices containing the disagreement site have cost zero, at most $2R$ affected indices have cost at most $2$, and all remaining indices have cost $1$. Thus, for these same actual couplings,

$$
\begin{aligned}
\sum_a(C_a(s,t)-1)&\le-\ell+2R=-1,\\
\sum_a C_a(s,t)&\le M-1.
\end{aligned}
$$

There are exactly $N-(2-\ell)+1=M=N+\ell-1\ge\ell\ge3$ indices, so the second line simply expands the $M$ subtracted ones in the first. Choosing an index uniformly gives joint mass $M^{-1}\sum_aQ_a(s,t;v,w)$, with total mass $1$, marginals $P_B(s,\cdot)$ and $P_B(t,\cdot)$, and expected full distance $M^{-1}\sum_aC_a(s,t)$. This also derives the factor $1/M$ in the preceding one-step expectation bound. Coincident clipped blocks continue to count separately by index.

Now consider function differences. The legal-word set is closed under deleting ones. Delete from $x$ to the coordinatewise intersection $x\cap y$, then add toward $y$. Every word on the first part is coordinatewise at most $x$, and every word on the second is coordinatewise at most $y$, so the entire path is legal. Each differing coordinate flips exactly once, giving length $d(x,y)$; any single-bit path needs at least that many steps. The shortest-path distance in the legal flip graph is therefore full Hamming distance. Since $N\ge1$ and $K\ge2$, the all-zero word and the word with only its first bit set form an edge, so the edge set is nonempty.

For any $g:W_N\to\mathbb C$, define the finite maximum over adjacent edges and the global seminorm by

$$
\begin{aligned}
L_{\partial}(g)&=\max_{d(s,t)=1}|g(s)-g(t)|,\\
\operatorname{Lip}(g)&=\max_{x\ne y}
\frac{|g(x)-g(y)|}{d(x,y)}.
\end{aligned}
$$

Both maxima are attained on nonempty finite sets. The triangle inequality for function differences along the path gives $|g(x)-g(y)|\le L_{\partial}(g)d(x,y)$, hence $\operatorname{Lip}(g)\le L_{\partial}(g)$. Substituting adjacent pairs in the global maximum gives the reverse inequality. The two quantities are equal and vanish exactly when $g$ is constant. In particular, a nonconstant function has a strictly positive, finite maximum edge oscillation.

Fix an adjacent edge and a clock. The two original marginals give the following comparison under one common joint law:

$$
\begin{aligned}
(T_ag)(s)-(T_ag)(t)
&=\sum_{v,w}Q_a(s,t;v,w)(g(v)-g(w)),\\
|(T_ag)(s)-(T_ag)(t)|
&\le\sum_{v,w}Q_a(s,t;v,w)|g(v)-g(w)|\\
&\le L_{\partial}(g)C_a(s,t).
\end{aligned}
$$

The equality uses the row and column marginals, respectively. The inequalities use nonnegative masses and the global function-difference bound just proved. Averaging over the original $M$ clocks now gives, directly on each edge,

$$
\begin{aligned}
|(P_Bg)(s)-(P_Bg)(t)|
&\le\frac{L_{\partial}(g)}M\sum_aC_a(s,t)\\
&\le\left(1-\frac1M\right)L_{\partial}(g).
\end{aligned}
$$

Sum these function-difference bounds along a legal shortest path to obtain, for every $x,y\in W_N$,

$$
\begin{aligned}
|(P_Bg)(x)-(P_Bg)(y)|
&\le\left(1-\frac1M\right)\operatorname{Lip}(g)d(x,y),\\
\operatorname{Lip}(P_Bg)
&\le\left(1-\frac1M\right)\operatorname{Lip}(g).
\end{aligned}
$$

This extends the bound on function differences without requiring a joint law for nonadjacent inputs. If a nonconstant eigenfunction satisfies $P_Bg=\mu g$, homogeneity and strict positivity of the seminorm immediately give the stated absolute bound $|\mu|\le1-1/M$, excluding additional eigenfunctions at eigenvalue $1$ as well.

The generator bound can also be read directly from an edge attaining the maximum. Put

$$
A=-L_B=\sum_a(I-T_a)=M(I-P_B).
$$

Let a nonconstant real function $h$ satisfy $Ah=\lambda h$, with $\lambda\in\mathbb R$. Choose an edge attaining $L=L_{\partial}(h)>0$, and reverse its orientation if necessary so that $h(s)-h(t)=L$. Apply the comparison for each clock on this edge and subtract the eigenfunction equations at its endpoints:

$$
\begin{aligned}
(M-\lambda)L
&=\sum_a\bigl((T_ah)(s)-(T_ah)(t)\bigr)\\
&\le L\sum_aC_a(s,t)\le L(M-1).
\end{aligned}
$$

Dividing by the strictly positive finite number $L$ gives $\lambda\ge1$. This is the bound for a generator with rate $1$ at each index. Changing the total refresh rate to $1$ would give generator $-A/M$ and the corresponding bound $1/M$.

The eigenfunction comparison uses the actual marginals and costs and does not require matrix symmetry. Real symmetry enters the spectral passage: each $T_a$ is the actual real symmetric fiber matrix, so $A$ has a real orthonormal eigenbasis for the uniform inner product. Unit row sums give $A1=0$, and the comparison excludes every nonconstant zero eigenfunction. Since $\|1\|_\pi^2=Z/Z=1$, we may take $e_0=1$, with the remaining $e_j$ orthogonal to constants and their eigenvalues $\lambda_j\ge1$. Positivity of the conditional projections and their complementary projections also gives $0\le P_B\le I$, hence nonnegative discrete-time eigenvalues; the absolute contraction bound itself already follows from the edge estimate.

For any real $h$, put $u=h-\pi h=\sum_{j=1}^{Z-1}c_je_j$. Orthonormality and self-adjointness give

$$
\begin{aligned}
\operatorname{Var}_\pi(h)=\|u\|_\pi^2
&=\sum_{j=1}^{Z-1}c_j^2\\
&\le\sum_{j=1}^{Z-1}\lambda_jc_j^2
=\langle u,Au\rangle_\pi\\
&=\langle h,Ah\rangle_\pi.
\end{aligned}
$$

The last equality uses $A1=0$ and $\langle1,Ah\rangle_\pi=\langle A1,h\rangle_\pi=0$. The normalization remains the original $\pi=1/Z$ throughout. For complex $f=h+ik$, the real matrix $A$ acts separately on the real and imaginary parts, and variance and energy split additively:

$$
\begin{aligned}
\operatorname{Var}_\pi(f)
&=\operatorname{Var}_\pi(h)+\operatorname{Var}_\pi(k)\\
&\le\langle h,Ah\rangle_\pi+\langle k,Ak\rangle_\pi\\
&=\operatorname{Re}\langle f,Af\rangle_\pi
=\mathcal E_B(f,f).
\end{aligned}
$$

The last step is exactly the complex conditional-variance identity summed over the original clocks above. The original complex block variance bound thus follows from finite scalar spectral decomposition, without an additional all-pair coupling assumption.

**Return the block energy to the single-site clocks.** Fix a block $B=B_a$. For a realizable exterior assignment $e\in\{0,1\}^{B^c}$, write $e\sqcup b$ for the full word obtained by joining $e$ to a block assignment $b$, and define

$$
\begin{aligned}
A_e&=\{b\in\{0,1\}^B:e\sqcup b\in W_N\},\\
m_e&=\#A_e,\qquad \pi_e(b)=\frac1{m_e}\quad(b\in A_e),\\
f_e(b)&=f(e\sqcup b),\\
\Pr_\pi(w|_{B^c}=e)&=\frac{m_e}{Z}.
\end{aligned}
$$

Realizability gives $m_e>0$. With the exterior fixed, each block assignment determines exactly one full word, so $\pi_e$ is the actual conditional law inside the block. Deletion closure here applies only to coordinates in $B$: changing any of the ones in $b$ to zeros cannot create a forbidden window, and leaves the entire exterior $e$ unchanged. Thus $A_e$ is a nonempty family closed under deletions, with $m_e\le2^{|B|}\le2^\ell$.

Next fix all block bits other than $i\in B$, using data realizable in $A_e$. The conditional support of bit $i$ is either $\{0\}$ or $\{0,1\}$, never $\{1\}$: if $1$ is allowed, deleting it gives an allowed $0$ with the same exterior and all other bits unchanged. The uniform law $\pi_e$ gives probability $1/2$ to each point of a two-point fiber and leaves a singleton fixed. Hence the conditional heat-bath clock of rate $1$ at each site has jump rate exactly $1/2$ along every legal flip edge.

Let $\mathscr D_e$ be the set of ordered pairs in $A_e$ differing at exactly one site, and $\mathscr U_e$ the corresponding unordered edges, each counted once. For any complex-valued function $g:A_e\to\mathbb C$, the conditional single-site energy is therefore

$$
\begin{aligned}
\mathcal E_{\mathrm{site},A_e}(g,g)
&:=\sum_{i\in B}\mathbb E_{\pi_e}
\operatorname{Var}_{\pi_e}(g\mid B\setminus\{i\})\\
&=\frac1{4m_e}\sum_{(b,c)\in\mathscr D_e}|g(b)-g(c)|^2\\
&=\frac1{2m_e}\sum_{\{b,c\}\in\mathscr U_e}|g(b)-g(c)|^2.
\end{aligned}
$$

Variance still uses the squared complex modulus. A two-point fiber has conditional variance $|g(b)-g(c)|^2/4$ and $\pi_e$ mass $2/m_e$, giving coefficient $1/(2m_e)$ to each unordered edge; a singleton fiber contributes zero.

Temporarily write $A=A_e$ and $m=m_e$ to apply the preceding path estimate for families closed under deletions. The legal path through the intersection between any $x,y\in A$ has length at most $\ell$. The uniform variance identity, Cauchy–Schwarz along each path, and the bound of $m(m-1)/2$ on the number of unordered-pair paths using any edge give

$$
\begin{aligned}
\operatorname{Var}_A(g)
&=\frac1{m^2}\sum_{\{x,y\}\subset A}|g(x)-g(y)|^2\\
&\le\frac\ell2\sum_{\{x,y\}\text{ a legal single-bit edge}}|g(x)-g(y)|^2\\
&=\ell m\,\mathcal E_{\mathrm{site},A}(g,g)
\le\ell2^\ell\mathcal E_{\mathrm{site},A}(g,g).
\end{aligned}
$$

When $m_e=1$, the variance and all energies vanish. If $B=\varnothing$, $A_e$ contains only the empty assignment, and the empty sum defining the single-site energy is also zero.

We can now identify the conditional single-site energy with that of the original chain. Fixing $e$ and $b|_{B\setminus\{i\}}$ fixes the entire exterior $i^c=[1,N]\setminus\{i\}$ of site $i$ in the full word. Both the conditional support and its point probabilities therefore agree exactly with the original site-$i$ conditional law. Write $v_i(w)=\operatorname{Var}_\pi(f\mid i^c)(w)$. Then

$$
\mathcal E_{\mathrm{site},A_e}(f_e,f_e)
=\sum_{i\in B}\frac1{m_e}\sum_{b\in A_e}v_i(e\sqcup b).
$$

Regard $e=w|_{B^c}$ as the random exterior sampled from the original chain. Averaging with its actual probability $m_e/Z$ gives

$$
\begin{aligned}
\mathbb E_\pi[\mathcal E_{\mathrm{site},A_e}(f_e,f_e)]
&=\sum_e\frac{m_e}{Z}\mathcal E_{\mathrm{site},A_e}(f_e,f_e)\\
&=\frac1Z\sum_e\sum_{b\in A_e}\sum_{i\in B}v_i(e\sqcup b)\\
&=\sum_{i\in B}\mathbb E_\pi[\operatorname{Var}_\pi(f\mid i^c)].
\end{aligned}
$$

The sum over $e$ includes only realizable exteriors, and the words $e\sqcup b$ enumerate $W_N$ exactly once. The factor $1/m_e$ in the conditional average has already canceled the $m_e$ in the exterior probability, so there is no further normalization. Apply the variance bound for deletion-closed families to $f_e$ and average with this same exterior law to obtain the comparison for each block:

$$
\mathbb E_\pi[\operatorname{Var}_\pi(f\mid B^c)]
\le\ell2^\ell\sum_{i\in B}
\mathbb E_\pi[\operatorname{Var}_\pi(f\mid i^c)].
$$

Finally sum over all original block indices $a$. Each site $i$ belongs to exactly the $\ell$ blocks indexed by $a=i-\ell+1,\ldots,i$. Even on a short chain where several blocks equal the whole chain, their clocks each have rate $1$ and contribute separately. Thus

$$
\begin{aligned}
\mathcal E_B(f,f)
&\le\ell2^\ell\sum_a\sum_{i\in B_a}
\mathbb E_\pi[\operatorname{Var}_\pi(f\mid i^c)]\\
&=\ell^2 2^\ell\mathcal E(f,f).
\end{aligned}
$$

Combine this with the block variance bound to obtain the stated Poincaré inequality and $\lambda_{K,N}\ge C_K^{-1}$. The full-space spectral comparison in [@ex-ch39-p2e-heatbath-scale] then gives $\Delta_{K,N}\ge2/C_K$, since $2/C_K<1$ for $K\ge2$. For example, $K=2$ gives $1/36$, and $K=3$ gives $1/400$. The empty chain $N=0$ still has no excited gap; the exact gap for a short chain $1\le N<K$ remains $2$.

**From the gap to an energy estimate for arbitrary amplitudes.** Fix $K\ge2,N\ge1$ and abbreviate $H=H_{K,N}$, $\Psi=\Psi_{K,N}$. Any complex vector $|\psi\rangle=\sum_{w\in\Omega_N}a_w|w\rangle$ in the full Boolean-word space splits according to the actual legal and illegal words as

$$
\begin{aligned}
\psi&=\psi_L+\psi_I,\\
|\psi_L\rangle&=\sum_{w\in W_N}a_w|w\rangle,\\
|\psi_I\rangle&=\sum_{w\in\Omega_N\setminus W_N}a_w|w\rangle,\\
\beta&=\langle\Psi|\psi\rangle
=\langle\Psi|\psi_L\rangle.
\end{aligned}
$$

Take the inverse image from the preceding example, $f(w)=\sqrt Z\,a_w$, with $Z=|W_N|$. The normalization and energy identities checked above, followed by this example's Poincaré bound for the actual chain, give

$$
\begin{aligned}
\pi f&=\beta,\\
\operatorname{Var}_\pi(f)&=\|\psi_L\|^2-|\beta|^2,\\
Q(H,\psi_L)&=2\mathcal E(f,f)\\
&\ge\frac2{C_K}
\bigl(\|\psi_L\|^2-|\beta|^2\bigr).
\end{aligned}
$$

The parent example's matrix-entry expansion gives zero entries between the legal and illegal sectors, so their cross energy vanishes. The preceding example's illegal-penalty estimate gives $Q(H,\psi_I)\ge\|\psi_I\|^2$. Since $C_K=(2K-1)^2 2^{2K-1}\ge72$, set $c_K=2/C_K\le1$ and combine these estimates:

$$
\begin{aligned}
Q(H,\psi)&=Q(H,\psi_L)+Q(H,\psi_I)\\
&\ge c_K\bigl(\|\psi_L\|^2-|\beta|^2\bigr)
+\|\psi_I\|^2\\
&\ge c_K\bigl(\|\psi\|^2-|\langle\Psi|\psi\rangle|^2\bigr).
\end{aligned}
$$

This is the native operator inequality $H\ge c_K(I-|\Psi\rangle\langle\Psi|)$ in the sense of quadratic forms. The vector need be neither normalized nor orthogonal to the ground state; for $\|\psi\|=1$, the residual on the right is $1-|\langle\Psi|\psi\rangle|^2$. When $1\le N<K$, every word is legal and $\psi_I=0$, so the same derivation applies. At $N=0$ there is only the one-dimensional vacuum: both energy and the residual after removing the ground-state component vanish, giving no excited-gap claim.

This explicitly applies the derived gap, uniform in chain length at fixed $K$, to an arbitrary-state energy estimate. It remains an application of the paper derivation above and adds no Lean verification. Physical identification with an experimental Rydberg or anyon Hamiltonian, and correspondence with Rauzy-boundary dimension, remain separate questions.
:::

::: {.remark #rem-ch39-p2e-rydberg-anyon-literature title="Literature Result: The Fibonacci Anyon Golden Chain and Rydberg Blockade Simulators (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In condensed-matter and atomic-physics literature, the order-$K = 2$ `NoAdjacentOnes` Hilbert space arises in two celebrated many-body settings: first, the topological Fibonacci-anyon "golden chain" of A. E. Feiguin et al. (*Phys. Rev. Lett.* **98**, 2007, 160409), where the fusion rule $\tau \times \tau = \mathbf{1} + \tau$ makes fusion-space dimensions grow as Fibonacci numbers; second, van der Waals $1/r^6$ Rydberg blockade arrays (modeled theoretically by I. Lesanovsky, *Phys. Rev. Lett.* **106**, 2011, 025301, and probed experimentally on a 51-atom quantum simulator by H. Bernien et al., *Nature* **551**, 2017, 579–584). Two scope boundaries apply whenever citing these physical realizations: first, nearest-neighbor pairwise Rydberg blockade forbids adjacent excitations $|11\rangle$ ($K = 2$, the PXP subspace), whereas simply extending pairwise blockade range forbids *all* pairs within distance $R_b$ (eliminating `101` along with `111`) and **does not** by itself enforce the $K > 2$ "no $K$ consecutive ones" constraint—realizing a $K > 2$ $K$-Bonacci subspace requires a dedicated multi-body $K$-local interaction; second, neither the anyon fusion chain nor a finite-blockade Rydberg Hamiltonian is formally identical to the exact zero-amplitude isometric `directContract` encoder of [@thm-ch39-p2e-direct-encoder-ranks].
:::

::: {.viz src="pisot-clifford-rauzy-sandtable" preset="entanglement" height="500"}
**Cross-Cut Prohibition and Attainable Rank Rectangle Card (`entanglement`)**: On the left, tests junction legality $\tau(x) + \iota(y) < K$ (cyan for legal concatenations, magenta for blocked $1^K$ collisions); on the right, plots the feasible page-rank rectangle $[1, R_0] \times [1, R_1]$ and entropy ceiling $\ln R_b$, with amber marking the selected parameters and rank pair. The rank rectangle and entropy bounds carry status `LEAN ✓`, concrete parameter counts carry status `NUM`, and anyon/Rydberg context carries status `Literature`.
:::

Finally, when finite admissible words extend to long trajectories, uncertainty and distinguishability register along three distinct mathematical tracks: a Markov stationary reset law, boundary cylinder bounds, and finite observation escape pairs.
