# 35.6.7.2 Local parent Hamiltonians and heat-bath chains {#sec-ch39-s05-s07-s02-parent-and-heatbath}

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
