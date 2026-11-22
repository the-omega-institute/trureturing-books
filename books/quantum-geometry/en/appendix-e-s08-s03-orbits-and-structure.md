# E.8.3 Orbits, observers, and complex structure {#sec-appendix-e-s08-s03-orbits-and-structure}

## E.8.3.1 Orbits: the Record of Comparisons of One Object along Time {#sec-appe-orbit-records}

[@rem-appe-sagitta-continuity] deals with a time-homogeneous family of objects $x_t$, $\mathrm{CMP}(x_s,x_t)=w(t-s)$. Keep its notation: $f(t)=\varphi\bigl(w(t)\bigr)$, $\xi_s=\pi\bigl(w(s)\bigr)\Omega$, $\mathcal{K}=\overline{\operatorname{span}}\{\xi_s\}$, $\langle\xi_r,\xi_s\rangle=f(s-r)$, and assume that the sagitta reading is continuous at zero, so that $U_t$ is strongly continuous on $\mathcal{K}$. By Stone's theorem and the spectral theorem (`Literature`) there are a self-adjoint $H$ and a probability measure $\mu$ (the energy distribution of $\Omega$ under $H$) with $f(t)=\int e^{-i\lambda t}\,d\mu(\lambda)$; $\mathcal{K}$ is unitarily equivalent to $L^2(\mu)$, and $\dim\mathcal{K}$ equals the number of points in the support of $\mu$. The three readings are the similarity reading $\varphi\bigl(S(x_0,x_t)\bigr)=\operatorname{Re}f(t)$, the difference reading $\varphi\bigl(A(x_0,x_t)\bigr)=i\operatorname{Im}f(t)$, and the Born weight of the ray returning to where it started, $\lvert f(t)\rvert^2$. The sagitta reading minimized over a global phase, $\min_\alpha\bigl(1-\operatorname{Re}(e^{i\alpha}f(t))\bigr)=1-\lvert f(t)\rvert$, is called the **ray sagitta**.

Sampling with a fixed step $\tau>0$, the table of the samples $\xi_0,\xi_\tau,\dots,\xi_{(n-1)\tau}$ is $G_{jk}=f\bigl((k-j)\tau\bigr)$, $j,k=0,\dots,n-1$. Its rank is computed by the following frozen theorem.

::: {.theorem #thm-appe-prony-hankel-rank title="A Hankel Section of a Finite Exponential Sum Has Rank Equal to the Number of Modes" lean="D5/S3/Analytic/GoldenTomography/FinitePronyHankelReconstruction.prony_hankel_rank"}
Let $K$ be a field, let $m\le n$ be natural numbers, let the nodes $z_1,\dots,z_m\in K$ be pairwise distinct and let the weights $w_1,\dots,w_m\in K$ all be nonzero. Then the $n\times n$ matrix over $K$

$$
H_{ij}=\sum_{l=1}^{m}w_l\,z_l^{\,i+j},\qquad i,j=0,1,\dots,n-1,
$$

has rank $m$.
:::

::: proof
$H$ factors as $V\operatorname{diag}(w)V^{\mathsf T}$ with the $n\times m$ Vandermonde matrix $V_{il}=z_l^{\,i}$. The factorization bounds the rank by $m$. The leading $m\times m$ block is a product of two square Vandermonde matrices and a diagonal matrix; distinct nodes and nonzero weights make its determinant nonzero, so the rank is at least $m$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-appe-orbit-rank-and-recurrence title="The Rank of an Orbit's Table Counts Energy Levels; an Orbit with Finitely Many Levels Comes Back (Manual Derivation and Literature)"}
**Manual derivation.** Let $\mu=\sum_{l=1}^{m}p_l\delta_{\lambda_l}$ with pairwise distinct $\lambda_l$ and $p_l>0$, and assume that the nodes $z_l=e^{-i\lambda_l\tau}$ are pairwise distinct.

1. **Rank.** $\operatorname{rank}G=\min(n,m)$. Reversing the rows of $G$ gives $G_{n-1-j,\,k}=\sum_l\bigl(p_lz_l^{-(n-1)}\bigr)z_l^{\,j+k}$, which is the section of [@thm-appe-prony-hankel-rank] with $K=\mathbb{C}$ and weights $p_lz_l^{-(n-1)}\neq0$; reversing rows does not change the rank, so for $n\ge m$ the rank is $m$. For $n<m$, $G=V\operatorname{diag}(p)V^*$ where $V_{jl}=z_l^{-j}$ is an $n\times m$ Vandermonde matrix of rank $n$ and $\operatorname{diag}(p)$ is positive definite, so the rank is $n$. A general energy distribution can be read the same way: for $\alpha\in\mathbb{C}^n$, $\alpha^*G\alpha=\int\bigl\lvert\sum_j\alpha_je^{-ij\lambda\tau}\bigr\rvert^2d\mu(\lambda)$, and the sum is a polynomial of degree less than $n$ in $e^{-i\lambda\tau}$, so the rank of $G$ is the smaller of $n$ and the number of support points of the push-forward $(e^{-i\lambda\tau})_*\mu$.
2. **Residual.** The sample $\xi_{k\tau}$ has a nonzero orthogonal residual outside the span of $\xi_0,\dots,\xi_{(k-1)\tau}$ exactly when the table of the first $k+1$ samples has larger rank than that of the first $k$, that is, exactly when $k<m$. So in $\mathcal{K}$, the span $S_k$ of the first $k$ samples satisfies $S_k^\perp\neq\bot$ (the hypothesis of [`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)) exactly when $k<m$; the sampled residual never runs dry exactly when the push-forward has infinitely many support points.
3. **Return.** For every $T>0$ and every integer $Q\ge2$ there is $t\in[T,\,Q^{m-1}T]$ with ray sagitta $1-\lvert f(t)\rvert\le2\sin^2\frac{\pi}{Q}$; for $Q\ge4$ this is equivalent to the return Born weight satisfying $\lvert f(t)\rvert^2\ge\cos^2\frac{2\pi}{Q}$. Derivation: apply Dirichlet's simultaneous approximation theorem to the $m-1$ reals $\alpha_l=(\lambda_l-\lambda_1)T/2\pi$, giving an integer $1\le q\le Q^{m-1}$ such that each $q\alpha_l$ lies within $\frac1Q$ of an integer (pigeonhole: the $Q^{m-1}+1$ points $k\alpha$, $k=0,\dots,Q^{m-1}$, taken modulo $1$, fall into $Q^{m-1}$ small cubes of side $\frac1Q$; take the difference of two points in the same cube). With $t=qT$, each $(\lambda_l-\lambda_1)t$ lies within $\frac{2\pi}{Q}\le\pi$ of $2\pi\mathbb{Z}$, so
$$
\lvert f(t)\rvert\ \ge\ \operatorname{Re}\left(e^{i\lambda_1t}f(t)\right)=\sum_lp_l\cos\bigl((\lambda_l-\lambda_1)t\bigr)\ \ge\ \cos\frac{2\pi}{Q}=1-2\sin^2\frac{\pi}{Q}.
$$
The same argument with the $m$ reals $\lambda_lT/2\pi$ gives $t\in[T,Q^mT]$ with sagitta reading $1-\operatorname{Re}f(t)\le2\sin^2\frac{\pi}{Q}$.
4. **Evidence of dimension.** If $1-\lvert f(t)\rvert>2\sin^2\frac{\pi}{Q}$ for all $t\in[T,Q^{m-1}T]$, then $\dim\mathcal{K}>m$: otherwise $\mu$ has exactly $m'\le m$ atoms, and item 3 gives a counterexample in $[T,Q^{m'-1}T]\subseteq[T,Q^{m-1}T]$. If there are $T$ and $\delta>0$ with $1-\lvert f(t)\rvert\ge\delta$ for all $t\ge T$, choose $Q$ with $2\sin^2\frac\pi Q<\delta$; the previous sentence applies to every $m$, so $\dim\mathcal{K}=\infty$. For example, a Gaussian energy distribution $N(0,\sigma^2)$ gives $f(t)=e^{-\sigma^2t^2/2}$, and the ray sagitta tends to $1$.

**Literature result.** Dirichlet's simultaneous approximation theorem (Dirichlet 1842); recurrence of quantum orbits with discrete spectrum (Bocchieri–Loinger 1957). The latter shows that the condition in item 4 is only sufficient: with infinitely many atoms the orbit still comes back, while $\dim\mathcal{K}=\infty$. Under aliasing (for example $\lambda_2=\lambda_1+2\pi/\tau$) two levels share a node and the sampled rank sees only one.
:::

So the "orthogonal residual never runs dry" of `H4` has a form that can be stated with the comparison readings of one object along time: **each increase of the rank of the table proves one more energy level; an object whose ray sagitta stays away from zero after some time cannot live in a finite-dimensional state space.** The first statement is a characterization, the second a sufficient condition. Neither derives `H4`: a model whose Hamiltonian has finitely many levels satisfies every clause.

The same record also answers a question left by E.8.2.2: to what extent the Hamiltonian is an input beyond the readings.

::: {.remark #rem-appe-orbit-record-channels title="What Each of the Three Readings of an Orbit Determines: Neither Channel Can Be Dropped (Manual Derivation and Literature)"}
**Manual derivation.** Write $\mu^{\mathrm r}(B)=\mu(-B)$ for the reflection of the energy distribution.

1. **Full comparison readings.** $f$ determines $\mu$, and with it $(\mathcal{K},H\vert_{\mathcal{K}},\Omega)$ up to unitary equivalence. In finite dimension this is visible directly: exponentials $e^{-i\lambda t}$ with distinct $\lambda$ are linearly independent, so the expression $f=\sum_lp_le^{-i\lambda_lt}$ is unique.
2. **Similarity readings only.** $\operatorname{Re}f(t)=\int\cos(\lambda t)\,d\mu$ determines only the symmetrization $\frac12(\mu+\mu^{\mathrm r})$, that is, the distribution of $\lvert\lambda\rvert$. Two levels already give a counterexample: $H=\operatorname{diag}(1,2)$ and $H'=\operatorname{diag}(1,-2)$ with initial state $\frac{1}{\sqrt2}(1,1)$ both have similarity reading $\frac12(\cos t+\cos2t)$, while their return Born weights are $\frac12(1+\cos t)$ and $\frac12(1+\cos3t)$.
3. **Born weights only.** $\lvert f(t)\rvert^2=\int\!\!\int e^{-i(\lambda-\lambda')t}\,d\mu(\lambda)\,d\mu(\lambda')$ determines only the autocorrelation of $\mu$. For two levels this is enough to fix $\mu$ up to translation and reflection: the autocorrelation of $\mu=p\delta_a+q\delta_b$ gives $pq$, $p^2+q^2$ and $\lvert b-a\rvert$. Three levels already give a genuine ambiguity: levels $0,1,2$ with populations $\frac1{12}(1,5,6)$ and $\frac1{12}(2,7,3)$, whose generating polynomials $1+5z+6z^2=(1+2z)(1+3z)$ and $2+7z+3z^2=(2+z)(1+3z)$ differ only in that the root $-\frac12$ is replaced by its reciprocal $-2$; both have Born weight $\frac{1}{144}(62+70\cos t+12\cos2t)$, yet the two distributions differ by no translation, are not reflections of each other, and have different similarity readings.
4. **Similarity readings and Born weights together.** For two distributions with finitely many levels each, the two together determine $\mu$ up to reflection. Derivation: $(\operatorname{Im}f)^2=\lvert f\rvert^2-(\operatorname{Re}f)^2$ is known; if $f$ and $f'$ give the same two readings, then $g=\operatorname{Im}f$ and $g'=\operatorname{Im}f'$ are finite trigonometric sums, hence real-analytic, and $(g-g')(g+g')\equiv0$; one factor vanishes at uncountably many points and so vanishes identically. Hence $f'=f$ or $f'=\bar f$, and the latter means $\mu'=\mu^{\mathrm r}$, the time reversal $H\mapsto-H$.

**Literature result.** Stone's theorem, the spectral theorem and Bochner's theorem; the root-flipping ambiguity of one-dimensional phase retrieval (Walther 1963; Hofstetter 1964) and homometric sets (Patterson 1944; Rosenblatt–Seymour 1982).
:::

The ledger of E.8.2.2 records the Hamiltonian $H$ as an input that remains. This remark makes the statement precise: **on the space spanned by an orbit, $H$ is not an input beyond the readings; the complete record of the orbit in both channels determines it up to unitary equivalence.** Reading only the similarity channel loses more than the direction of time: it loses the sign of every level. Reading only the Born weights of the ray already leaves a genuine ambiguity with three levels. Similarity readings and Born weights together leave exactly the overall sign of the difference channel, which is time reversal. Clause II splits comparison into a similarity channel and a difference channel, and in dynamics neither can be dropped. What remains an input is the choice of orbit and the action of $H$ outside $\mathcal{K}$.

## E.8.3.2 Comparisons between Observers: Time Order Selects the Hyperbolic Row {#sec-appe-observer-comparison}

Now let the objects of comparison be inertial observers in $1+1$ dimensions, each with its own coordinates $(t,x)$. For observers $o,o'$, let $\Lambda_{o\leftarrow o'}$ convert the coordinates of an event in $o'$ into its coordinates in $o$, and put $\mathrm{CMP}(o,o')=\Lambda_{o\leftarrow o'}$, with values in the real $*$-algebra $(M_2(\mathbb{R}),{}^\sharp)$ used in E.8.1.1, $a^\sharp=\operatorname{tr}(a)\mathbf{1}-a$, $aa^\sharp=\det(a)\mathbf{1}$. That coordinate changes are linear is an input here (`MODEL`); [@rem-appe-causal-order-linearity] shows that in $1+1$ dimensions it cannot be derived from the causal order.

Here Clause III says $\det\Lambda_{o\leftarrow o'}=1$, and then Clause II only says that the reverse change is the inverse; the similarity part $S=\frac12\operatorname{tr}(\Lambda)\mathbf{1}$ is always a real scalar, so the sagitta table of E.8.1.1 applies directly. Write $\Lambda_{o\leftarrow o'}=\begin{pmatrix}a&b\\c&d\end{pmatrix}$. The origin of $o'$, $(\tau,0)$, is $(a\tau,c\tau)$ in $o$, so for $a\neq0$ the velocity reading of $o'$ relative to $o$ is $v(o,o')=c/a$; from the inverse matrix, $v(o',o)=-c/d$ for $d\neq0$.

::: {.remark #rem-appe-frame-change-family title="The One-Parameter Family of Observer Comparisons: the Three Signs of K Are the Three Rows of the Sagitta Table (Manual Derivation and Literature)"}
**Manual derivation.** Let $V$ be the set of velocity readings of all pairs of observers. Assume:

1. Clause III: $\det\Lambda_{o\leftarrow o'}=1$ for every pair of observers;
2. antisymmetric velocity readings: for every pair, $a\neq0$ and $v(o',o)=-v(o,o')$;
3. one law: there is a map $L:V\to M_2(\mathbb{R})$ with $\Lambda_{o\leftarrow o'}=L(v(o,o'))$ for every pair, and $L(v)L(v')\in L(V)$ for $v,v'\in V$;
4. $V$ contains a nonzero element.

Then $0=v(o,o)\in V$, $L(0)=\mathbf{1}$, and there is a constant $K\in\mathbb{R}$ such that for every $v\in V$

$$
L(v)=\gamma(v)\begin{pmatrix}1&Kv\\v&1\end{pmatrix},\qquad \gamma(v)^2\left(1-Kv^2\right)=1;
$$

the sign of $\gamma(v)$ is not fixed by these assumptions. If $L(v)L(v')=L(w)$, then $1+Kvv'\neq0$, $w=\dfrac{v+v'}{1+Kvv'}$ and $\gamma(w)=\gamma(v)\gamma(v')(1+Kvv')$. Moreover

$$
S=\gamma\,\mathbf{1},\qquad A=\gamma\begin{pmatrix}0&Kv\\v&0\end{pmatrix},\qquad A^2=\gamma^2Kv^2\,\mathbf{1}=(\gamma^2-1)\,\mathbf{1},
$$

and the sagitta is $1-\gamma$. So for $v\neq0$, $K<0$, $K=0$ and $K>0$ fall in the elliptic, parabolic and hyperbolic rows of the table of E.8.1.1.

Derivation: take $v\in V$, $v\neq0$, $L(v)=\begin{pmatrix}a&b\\c&d\end{pmatrix}$, $c=av\neq0$. Since $v$ is the velocity reading of some pair of observers, item 2 applied to that pair gives $c/a=c/d$, so $a=d$. Item 1 gives $a^2-bc=1$, so $b=K(v)\,va$ with $K(v)=\dfrac{a^2-1}{a^2v^2}$, and $a^2(1-K(v)v^2)=1$. For $v,v'\in V\setminus\{0\}$, item 3 gives $L(v)L(v')=L(w)$ with $w\in V$, whose two diagonal entries are equal (by the previous step when $w\neq0$; it is $\mathbf{1}$ when $w=0$). These diagonal entries are $\gamma(v)\gamma(v')(1+K(v)vv')$ and $\gamma(v)\gamma(v')(1+K(v')vv')$, so $K(v)=K(v')$. The diagonal entries of $L(w)$ are nonzero, which is $1+Kvv'\neq0$; the composition law is the ratio of the first entry of the second row to the first entry of the first row of the product.

How the assumptions correspond to the classical derivation: linearity (homogeneity) is the value algebra $M_2(\mathbb{R})$; the relativity principle is item 3, where Clause IV gives only $\Lambda_{o\leftarrow o'}\Lambda_{o'\leftarrow o''}=\Lambda_{o\leftarrow o''}$, and closure also needs every velocity in $V$ to be available from every observer; the reciprocity principle is item 2, which says that velocity is a difference reading; "no dilation", which the classical derivation obtains from reciprocity and isotropy, is given here directly by Clause III, so isotropy does not appear.

**Literature result.** The family with one constant $K$, obtained from the relativity principle without using light: P. Frank and H. Rothe, *Ann. Phys.* **339**, 825–855 (1911); J.-M. Lévy-Leblond, *Am. J. Phys.* **44**, 271–277 (1976) (homogeneity, isotropy, group structure and causality leave only the Lorentz transformations and their Galilean limit); N. D. Mermin, *Am. J. Phys.* **52**, 119–124 (1984). Reciprocity derived from the relativity principle, homogeneity of space-time and isotropy of space: V. Berzi and V. Gorini, *J. Math. Phys.* **10**, 1518–1524 (1969).
:::

The sign of $K$ is still open. The next remark says what excludes $K<0$ and what separates $K=0$ from $K>0$.

::: {.remark #rem-appe-time-order-repetition title="Repeating a Comparison Never Reverses the Order in Time Exactly When the Similarity Reading Is at Least 1 (Manual Derivation)"}
**Manual derivation.** Let $\mathcal{A}$ be a real $*$-algebra and $uu^*=u^*u=\mathbf{1}$, with similarity reading $S=s\mathbf{1}$.

1. For every $n\ge0$, $S(u^n)=T_n(s)\,\mathbf{1}$.
2. $T_n(s)>0$ for every $n\ge1$ if and only if $s\ge1$. For $-1<s<1$, write $s=\cos\alpha$ with $0<\alpha<\pi$; the least $n$ with $T_n(s)<0$ is $\lfloor\frac{\pi}{2\alpha}\rfloor+1$.
3. In the family of [@rem-appe-frame-change-family], for $v\neq0$: $K>0$ if and only if $L(v)$ has two distinct real invariant lines; they are $x=\pm t/\sqrt{K}$, the same for every $v$. The line $t=0$ is invariant if and only if $K=0$. $A^2=0$ if and only if $K=0$.

Derivation: item 1 follows from [@rem-appe-bounded-recurrence], $u^n=T_n(s)\mathbf{1}+U_{n-1}(s)A$ and $(u^n)^*=u^{-n}=T_n(s)\mathbf{1}-U_{n-1}(s)A$, by averaging. Item 2: for $s=\cosh\eta\ge1$, $T_n(s)=\cosh n\eta\ge1$; for $s\le-1$, $T_1(s)=s<0$; for $-1<s<1$, $T_n(s)=\cos n\alpha$, which is not negative for $n\le\frac{\pi}{2\alpha}$, while $n_0=\lfloor\frac{\pi}{2\alpha}\rfloor+1$ satisfies $\frac\pi2<n_0\alpha\le\frac\pi2+\alpha<\frac{3\pi}2$. Item 3: the eigenvalues of $L(v)$ are $\gamma(1\pm\sqrt{K}\,v)$; for $K>0$ the eigenvectors are $(1,\pm1/\sqrt{K})^{\mathsf T}$; for $K<0$ the eigenvalues are not real; for $K=0$, $L(v)=\gamma(\mathbf{1}+vN)$ with $N=\begin{pmatrix}0&0\\1&0\end{pmatrix}$, $N^2=0$, and the only real invariant line is spanned by $(0,1)^{\mathsf T}$; in general $L(v)(0,1)^{\mathsf T}=\gamma(Kv,1)^{\mathsf T}$.

In the observer model (a `MODEL` reading), $S(\Lambda_{o\leftarrow o'})=a$ is the $o$-time of the event "one unit of $o'$-time has passed at the origin of $o'$". Say that the **time-order condition** holds if $S(u^n)>0$ for every comparison $u$ and every $n\ge1$: applying the same change of frame $n$ times, a later event at the origin is still later. By item 2 this is equivalent to $\gamma(v)\ge1$ for every $v$, that is, $K\ge0$ and $\gamma(v)>0$ for all $v$. For $K<0$ and $\gamma(v)>0$, put $\tan\alpha=\sqrt{-K}\,\lvert v\rvert$ with $0<\alpha<\frac\pi2$. In the coordinates $(t,\sqrt{-K}\,x)$, $L(v)$ is a rotation by $\alpha$, $S(L(v)^n)=\cos n\alpha$, and the first negative value occurs at $n=\lfloor\frac{\pi}{2\alpha}\rfloor+1$. If $n\alpha=\frac\pi2$ for some $n$, then $S(L(v)^n)=0$ and the velocity reading $c/a$ of that step is undefined; this is the case $1+Kvv'=0$ of the composition law.

By item 3, under the time-order condition the following are equivalent: $K>0$; there is a finite speed $1/\sqrt{K}$ that is invariant for all observers; for $v\neq0$ the difference part is not square-zero. $K=0$ is the Galilean case: simultaneity is invariant under comparison, and the difference part $\gamma vN$ is square-zero.
:::

So the time-order condition excludes the elliptic row (and comparisons with $s\le-1$), "the difference part is not square-zero" then excludes the parabolic row, and together they select the hyperbolic row with $s>1$. The difference part satisfies $A^*=-A$, so $A^2=0$ means $A^*A=0$; the second statement is therefore the special case, for difference parts, of "no nonzero $a$ satisfies $a^*a=0$" in [@rem-appe-positivity-invisible-part]. The algebra $(M_2(\mathbb{R}),{}^\sharp)$ has no states ($a=\operatorname{diag}(1,-1)$ gives $a^\sharp a=-\mathbf{1}$), so the conclusions about readings there do not apply here.

Item 2 of [@rem-appe-time-order-repetition] is frozen in the pinned repository, in the following form; items 1 and 3 and the reading in the observer model are not formalized.

::: {.proposition #prop-appe-chebyshev-positivity-threshold title="The Positivity Threshold of Chebyshev Values and the Index of the First Sign Change" lean="D5/S3/Analytic/Chebyshev/PositivityThreshold.forall_pos_eval_T_iff_one_le D5/S3/Analytic/Chebyshev/PositivityThreshold.eval_T_cos_floor_succ_neg_and_nonneg_before"}
Let $T_n$ be the Chebyshev polynomials of the first kind: $T_0=1$, $T_1(x)=x$, $T_{n+1}(x)=2xT_n(x)-T_{n-1}(x)$.

1. For a real number $s$: $T_n(s)>0$ for every natural number $n\ge1$ if and only if $s\ge1$.
2. Let $0<\alpha<\pi$ and $n_0=\lfloor\frac{\pi}{2\alpha}\rfloor+1$. Then $T_{n_0}(\cos\alpha)<0$, and $T_n(\cos\alpha)\ge0$ for every natural number $n<n_0$.
:::

::: proof
Item 2: $T_n(\cos\alpha)=\cos n\alpha$. By the definition of the floor, $n_0-1\le\frac{\pi}{2\alpha}<n_0$, so $\frac\pi2<n_0\alpha\le\frac\pi2+\alpha<\frac{3\pi}2$ and $\cos n_0\alpha<0$; for $n<n_0$ we have $n\le\frac{\pi}{2\alpha}$, hence $0\le n\alpha\le\frac\pi2$ and $\cos n\alpha\ge0$.

Item 1: for $s\ge1$, $T_n(s)\ge1$ (writing $s=\cosh\eta$, $T_n(s)=\cosh n\eta$); for $s\le-1$, $T_1(s)=s<0$; for $-1<s<1$ take $\alpha=\arccos s$, so that $0<\alpha<\pi$, and item 2 gives $T_{n_0}(s)<0$ with $n_0\ge1$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-appe-rotor-boost-coexistence title="Bounded and Order-Preserving Are Complementary Selections: Rotations and Boosts Live in One Algebra (Manual Derivation and Literature)"}
**Manual derivation.** Let $u\neq\mathbf{1}$, $uu^*=u^*u=\mathbf{1}$, $S=s\mathbf{1}$. On $\mathbb{R}[A]=\operatorname{span}\{\mathbf{1},A\}$ one has $(x+yA)^*(x+yA)=\left(x^2-y^2(s^2-1)\right)\mathbf{1}$; together with [@rem-appe-bounded-recurrence] and [@rem-appe-time-order-repetition] this gives:

| Row | $s$ | positivity condition on $\mathbb{R}[A]$ (equivalent to bounded integer powers) | time-order condition | $A^2\neq0$ |
| :--- | :--- | :---: | :---: | :---: |
| elliptic | $-1<s<1$ | holds | fails | holds |
| parabolic | $s=1$, $A\neq0$ | fails | holds | fails |
| parabolic | $s=-1$, $A\neq0$ | fails | fails | fails |
| $u=-\mathbf{1}$ | $s=-1$, $A=0$ | holds | fails | — |
| hyperbolic | $s>1$ | fails | holds | holds |
| hyperbolic | $s<-1$ | fails | fails | holds |

So no $u\neq\mathbf{1}$ satisfies both conditions; the positivity condition alone selects the elliptic row (plus $-\mathbf{1}$); the time-order condition together with $A^2\neq0$ selects the hyperbolic row with $s>1$. `H2` and `H8` use the same three-way table but select different rows for different comparisons: comparisons between directions and states take the bounded row, comparisons between observers take the order-preserving row.

Both can live in one algebra.

1. In $\mathrm{Cl}(p,q)$ with orthonormal $e_i$, $(e_ie_j)^2=-e_i^2e_j^2$ for $i\neq j$: this is $-1$ when $e_i^2$ and $e_j^2$ have the same sign and $+1$ otherwise. With reversion as the involution, $B=e_ie_j$ satisfies $B^*B=-B^2$. So the positivity condition holds on coordinate planes inside a definite block and fails on mixed planes. Signature $(1,d)$ has $\frac{d(d-1)}2$ spatial coordinate planes (rotations, elliptic) and $d$ space-time coordinate planes (boosts, hyperbolic).
2. View $M_2(\mathbb{C})$ as a real $*$-algebra with the involution $\sharp$ of E.8.1.1; the elements with $uu^\sharp=\mathbf{1}$ form $\mathrm{SL}(2,\mathbb{C})$. On the quaternion subalgebra $\operatorname{span}_{\mathbb{R}}\{\mathbf{1},i\sigma_1,i\sigma_2,i\sigma_3\}$ one has $a^\sharp a=\lvert a\rvert^2\mathbf{1}$, so the positivity condition holds; $\sigma_3^\sharp\sigma_3=-\mathbf{1}$, so it fails as soon as one boost generator is added. Every $u\in\mathrm{SL}(2,\mathbb{C})$ is uniquely $u=kb$ with $k\in\mathrm{SU}(2)$, $\frac12\operatorname{tr}k\in[-1,1]$, and $b$ positive definite Hermitian with determinant $1$, $\frac12\operatorname{tr}b\ge1$. Repeating the rotation factor does not amplify; repeating the boost factor does not reverse the order in time.
3. One time direction only. On $\mathbb{R}^p\times\mathbb{R}^q$ take $Q(a,b)=\lvert a\rvert^2-\lvert b\rvert^2$. The open cone $\{Q>0\}$ deformation-retracts onto $\mathbb{R}^p\setminus\{0\}$ through $(a,(1-\lambda)b)$, $0\le\lambda\le1$, so it is connected for $p\ge2$ and has exactly two components for $p=1$, exchanged by $w\mapsto-w$. The "future and past" that the time-order condition needs exist only for $p=1$. For $p\ge2$ the plane spanned by two time directions is definite, its rotations are the elliptic comparisons of item 1, and repeating one turns the time axis around.

The step from null cone to quadratic form is carried by the frozen proposition [@prop-null-cone-rigidity]: as Chapter 17 explains after that proposition, a linear map $B$ that maps the null cone into itself satisfies $\operatorname{minkowski}_d(Bw)=\lambda\operatorname{minkowski}_d(w)$ with $\lambda=\operatorname{minkowski}_d(Be_0)$, for every $d\in\mathbb{N}$. Comparing Gram determinants gives $\det(B)^2=\lambda^{d+1}$. If $\det B=\pm1$: for $d\ge2$ a negative $\lambda$ would change the signature, so $\lambda=1$; for $d=1$, $\lambda=-1$ does occur (the rotation by $90^\circ$, with $\det B=1$), its similarity reading is $0$, and the time-order condition excludes it. The proposition does not say why a null cone exists (that is $K>0$), nor does it give linearity or the time orientation.

**Literature result.** The polar decomposition of matrices, and $\mathrm{SL}(2,\mathbb{C})$ as the spin cover of the Lorentz group.
:::

What remains is linearity.

::: {.remark #rem-appe-causal-order-linearity title="In 1+1 Dimensions the Causal Order Does Not Force Linearity (Manual Derivation and Literature)"}
**Manual derivation.** In $1+1$ dimensions use the null coordinates $p=t+x$, $q=t-x$. An event $Y$ lies in the closed future cone of $X$ ($t_Y-t_X\ge\lvert x_Y-x_X\rvert$) if and only if $p_Y\ge p_X$ and $q_Y\ge q_X$. Hence for any two strictly increasing bijections $f,g:\mathbb{R}\to\mathbb{R}$, the map $(p,q)\mapsto(f(p),g(q))$ preserves the causal order in both directions; it is affine if and only if $f$ and $g$ are, and $f(s)=s+\frac12\sin s$, $g(s)=s^3+s$ are not. So in $1+1$ dimensions the linearity in [@rem-appe-frame-change-family] is an input.

**Literature result.** E. C. Zeeman, *J. Math. Phys.* **5**, 490–493 (1964): the group of automorphisms of Minkowski space that preserve the causal partial order is generated by the inhomogeneous Lorentz group and dilations. The example above shows that this fails in $1+1$ dimensions; this book has not checked in which dimensions it holds.
:::

## E.8.3.3 Entropy Gain under Pinching: Exact Identities and Two-Sided Bounds {#sec-appe-pinching-entropy}

Item 4 of E.6 uses [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) to show that a unit-preserving basis pinching makes the entropy gain a relative entropy, hence nonnegative. The question here is how large it is. Take projections $P_1,\dots,P_m$ on $\mathbb{C}^d$, pairwise orthogonal with sum $\mathbf{1}$, and put $\mathcal{P}(\rho)=\sum_kP_k\rho P_k$, $X=\rho-\mathcal{P}(\rho)$, the discarded coherence mass $c=\lVert X\rVert_2^2=\sum_{k\neq l}\lVert P_k\rho P_l\rVert_2^2$ ($\lVert\cdot\rVert_2$ the Hilbert–Schmidt norm), and the entropy gain $\Delta S=S(\mathcal{P}(\rho))-S(\rho)$, with entropies in natural logarithms. For a qubit in the standard basis, the Hilbert–Schmidt Pythagorean split and $c=\lvert\rho_{01}\rvert^2+\lvert\rho_{10}\rvert^2$ are frozen for every complex $2\times2$ matrix ([@thm-pinching-pythagorean]).

::: {.remark #rem-appe-pinching-exact-identities title="Three Exact Identities for Block Pinching (Manual Derivation and Literature)"}
**Manual derivation.** For every state $\rho$ and every block pinching:

1. The purity drops by exactly the discarded mass: $\operatorname{tr}\rho^2-\operatorname{tr}\mathcal{P}(\rho)^2=c$, and $\operatorname{tr}(\rho\,\mathcal{P}(\rho))=\operatorname{tr}\mathcal{P}(\rho)^2$.
2. $\Delta S=D(\rho\Vert\mathcal{P}(\rho))$.
3. The second-order Rényi entropy $S_2(\sigma)=-\log\operatorname{tr}\sigma^2$ increases by $S_2(\mathcal{P}(\rho))-S_2(\rho)=-\log\left(1-\dfrac{c}{\operatorname{tr}\rho^2}\right)$.

Derivation: item 1. $\mathcal{P}$ is idempotent and self-adjoint for $\langle A,B\rangle=\operatorname{tr}(A^*B)$, so $\langle\mathcal{P}(\rho),X\rangle=\langle\mathcal{P}(\rho),\rho\rangle-\langle\mathcal{P}(\rho),\mathcal{P}(\rho)\rangle=0$; expand $\langle\mathcal{P}(\rho)+X,\mathcal{P}(\rho)+X\rangle$. This is [@thm-pinching-pythagorean] in general dimension and for general blocks. Item 2: with $U_j=\sum_ke^{2\pi ijk/m}P_k$, orthogonality of roots of unity gives $\mathcal{P}(\rho)=\frac1m\sum_{j=0}^{m-1}U_j\rho U_j^*\ge\frac1m\rho$, so the support of $\rho$ lies in the support of $\mathcal{P}(\rho)$. Like $\mathcal{P}(\rho)$, $\log\mathcal{P}(\rho)$ (taken on the support) is block diagonal, and $\operatorname{tr}(\rho B)=\operatorname{tr}(\mathcal{P}(\rho)B)$ for block-diagonal $B$; hence $-\operatorname{tr}\rho\log\mathcal{P}(\rho)=S(\mathcal{P}(\rho))$, and it remains to substitute into $D(\rho\Vert\sigma)=-S(\rho)-\operatorname{tr}\rho\log\sigma$. Item 3 follows directly from item 1.

Item 2 is frozen for rank-one basis pinching: it is the step $k=0$ of [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) with $U=\mathbf{1}$. There the entropy and relative entropy are defined with Mathlib's convention $\log0=0$; by the support inclusion above, this agrees with the usual definitions here.

**Literature result.** Under basis pinching, $\Delta S$ is the relative-entropy measure of coherence: T. Baumgratz, M. Cramer and M. B. Plenio, *Phys. Rev. Lett.* **113**, 140401 (2014). The inequality $\mathcal{P}(\rho)\ge\rho/m$ is the pinching inequality: M. Hayashi, *J. Phys. A* **35**, 10759–10773 (2002).
:::

On the purity side the statement is exact: the purity drops by exactly the coherence mass that is discarded. On the entropy side the gain is not a function of $c$, but $c$ bounds it from below.

::: {.remark #rem-appe-pinching-entropy-lower title="The Entropy Gain Is at Least the Discarded Coherence Mass; the Exact Range on a Qubit (Manual Derivation and Literature)"}
**Manual derivation.**

1. For every state and every block pinching,

$$
\Delta S\ \ge\ \tfrac12\lVert\rho-\mathcal{P}(\rho)\rVert_1^2\ \ge\ c .
$$

The constant $1$ in $\Delta S\ge c$ cannot be raised: for a qubit with $z=0$, $\Delta S/c\to1$ as $r\to0$.
2. Pure states: $\Delta S=H(p)\ge-\log(1-c)$ with $p_k=\operatorname{tr}(P_k\rho)$. This fails for mixed states: for a qubit with $z=0$, $\Delta S=\frac{r^2}2+\frac{r^4}{12}+O(r^6)$, while $-\log(1-c)=\frac{r^2}2+\frac{r^4}8+O(r^6)$.
3. For a qubit $\rho=\frac12(\mathbf{1}+\mathbf{r}\cdot\boldsymbol\sigma)$, $\mathbf{r}=(x,y,z)$, $r=\lvert\mathbf{r}\rvert\le1$, pinched in the eigenbasis of $\sigma_3$ (for $r=1$ the integral is a convergent improper integral):

$$
\Delta S=\int_{\lvert z\rvert}^{r}\operatorname{artanh}t\,dt,\qquad c=\frac{r^2-z^2}{2}=\int_{\lvert z\rvert}^{r}t\,dt,
$$

and for each $c\in(0,\frac12]$,

$$
\ln2-h\left(\frac{1+\sqrt{2c}}{2}\right)\ \le\ \Delta S\ \le\ h\left(\frac{1+\sqrt{1-2c}}{2}\right),
$$

where $h(q)=-q\ln q-(1-q)\ln(1-q)$; the lower end is attained by the state with $z=0$, the upper end by a pure state.

Derivation: the first inequality of item 1 is the quantum Pinsker inequality (`Literature`) combined with item 2 of [@rem-appe-pinching-exact-identities]. The second: $X$ is Hermitian and traceless; with eigenvalues $\lambda_i$, the sum of the positive eigenvalues and the sum of the absolute values of the negative ones both equal $\frac12\lVert X\rVert_1$, so $\sum\lambda_i^2\le\left(\sum_{\lambda_i>0}\lambda_i\right)^2+\left(\sum_{\lambda_i<0}\lvert\lambda_i\rvert\right)^2=\frac12\lVert X\rVert_1^2$, with equality exactly when $X$ has at most one positive and one negative eigenvalue. Item 2: $\mathcal{P}(\lvert\psi\rangle\langle\psi\rvert)=\sum_kp_k\lvert\psi_k\rangle\langle\psi_k\rvert$ with pairwise orthogonal $\psi_k$, so $\Delta S=H(p)$ and $c=1-\sum p_k^2$; then use $H(p)\ge-\log\sum p_k^2$ (Jensen's inequality). Item 3: with $g(t)=h(\frac{1+t}2)$ one has $S(\rho)=g(r)$, $S(\mathcal{P}(\rho))=g(\lvert z\rvert)$ and $g'(t)=-\operatorname{artanh}t$. Fix $c$ and let $F(z)=g(z)-g(\sqrt{z^2+2c})$ on $0\le z\le\sqrt{1-2c}$; then $F'(z)=z\left(\frac{\operatorname{artanh}r}{r}-\frac{\operatorname{artanh}z}{z}\right)\ge0$ because $t\mapsto\operatorname{artanh}t/t$ is increasing, and the values at the two ends are the two bounds.

**Numerical check (`NUM`).** On $6000$ random states of $d=2,3,4,5$ with random blocks and all ranks (fixed random seed), neither inequality of item 1 is violated, and the second holds with equality up to rounding in some cases; the closed form of item 3 agrees with numerical integration to $3\times10^{-14}$, and both ends are attained at $c=0.05,0.2,0.45$. The pure-state example of [§36.1.5.2](ch37-s05-future-selection-and-deja-vu.md#sec-ch37-p2g-dream-precompile) ($\theta=\frac\pi6$, $c=\frac38$) sits at the upper end: $\Delta S=h(\frac34)\approx0.5623$ (that is, $0.8113$ bits).

**Literature result.** The quantum Pinsker inequality $D(\rho\Vert\sigma)\ge\frac12\lVert\rho-\sigma\rVert_1^2$: F. Hiai, M. Ohya and M. Tsukada, *Pacific J. Math.* **96**, 99–109 (1981). The classical case is frozen as [`pinsker_inequality`](lean:D5/S3/TotalVariation/Pinsker.pinsker_inequality).
:::

On the upper side there is a frozen proposition for rank-one basis pinching.

::: {.proposition #prop-appe-l1-coherence-bound title="Relative-Entropy Coherence Is at Most ℓ1 Coherence" lean="D5/S3/Divergence/CoherenceL1RelativeEntropyBound.result"}
Let $n\in\mathbb{N}$ and let $\rho$ be a positive semidefinite complex $n\times n$ matrix with trace $1$. Put $S_{\mathrm{bit}}(\sigma)=-\operatorname{Re}\operatorname{tr}f(\sigma)$, where $f(x)=x\log_2x$, $f(0)=0$, and $f(\sigma)$ is given by the continuous functional calculus. Then

$$
S_{\mathrm{bit}}\left(\operatorname{diag}(\rho_{11},\dots,\rho_{nn})\right)-S_{\mathrm{bit}}(\rho)\ \le\ \sum_{i\neq j}\lvert\rho_{ij}\rvert .
$$
:::

::: proof
Split the basis pinching into $n$ steps; step $k$ is the binary pinching with the $k$-th coordinate projection $P$ and $\mathbf{1}-P$. A binary pinching is the average of $\sigma$ and its reflection $R\sigma R$ ($R=2P-\mathbf{1}$), so the entropy gain of the step is the quantum Jensen–Shannon divergence of the two; by the frozen binary Holevo bound it is at most $\frac12\lVert\sigma-R\sigma R\rVert_1=2\lVert P\sigma(\mathbf{1}-P)\rVert_1$. The matrix $P\sigma(\mathbf{1}-P)$ has rank one, and its trace norm is the Euclidean length of the piece of the row deleted in this step, which is at most the sum of the moduli of its entries; the factor $2$ accounts for row and column together. The entropy gains of the steps telescope to the left-hand side, and the right-hand sides add up to at most $\sum_{i\neq j}\lvert\rho_{ij}\rvert$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-appe-pinching-entropy-upper title="Upper Bounds on the Entropy Gain, and Why None Is Linear in the Coherence Mass (Manual Derivation and Literature)"}
**Manual derivation.**

1. $\Delta S\le\log m$.
2. $\Delta S\le T\log(d-1)+h(T)$ with $T=\frac12\lVert X\rVert_1\le T':=\frac12\sqrt{\operatorname{rank}(X)\,c}$; if $T'\le1-\frac1d$, $T$ may be replaced by $T'$, because $T\mapsto T\log(d-1)+h(T)$ is increasing on $[0,1-\frac1d]$.
3. Rank-one basis pinching ($m=d$): by [@prop-appe-l1-coherence-bound] and the Cauchy–Schwarz inequality, $\dfrac{\Delta S}{\ln2}\le\sum_{i\neq j}\lvert\rho_{ij}\rvert\le\sqrt{d(d-1)\,c}$.
4. There is no upper bound of the form $\Delta S\le Kc$. The pure state $\psi=\sqrt{1-\epsilon}\,\lvert0\rangle+\sqrt\epsilon\,\lvert1\rangle$ has $c=2\epsilon(1-\epsilon)$ and $\Delta S=h(\epsilon)$; as $\epsilon\to0$, $\Delta S/c=\frac12\ln\frac2c+\frac12+o(1)\to\infty$.

Derivation: item 1 follows from $\mathcal{P}(\rho)=\frac1m\sum_jU_j\rho U_j^*$ in the derivation of item 2 of [@rem-appe-pinching-exact-identities] and $S(\sum_jq_j\rho_j)\le\sum_jq_jS(\rho_j)+H(q)$ (`Literature`). Item 2 is Audenaert's continuity bound (`Literature`) together with $\lVert X\rVert_1\le\sqrt{\operatorname{rank}X}\,\lVert X\rVert_2$. Item 3 compares the moduli of the $d(d-1)$ off-diagonal entries with their sum of squares $c$ by Cauchy–Schwarz.

So the lower bound is of the order of $c$, while the known general upper bounds are only of the order of $\sqrt{c}$. On a qubit, item 3 of [@rem-appe-pinching-entropy-lower] gives the exact upper end, which is $\frac c2\ln\frac2c+O(c)$ as $c\to0$; whether for $d\ge3$ the upper bound can be improved to the order of $c\log\frac1c$ is not treated in this book.

**Literature result.** K. M. R. Audenaert, *J. Phys. A* **40**, 8127–8136 (2007); the reverse inequality for concavity of the entropy used above is in M. A. Nielsen and I. L. Chuang, *Quantum Computation and Quantum Information* (Cambridge, 2000), Chapter 11. The inequality of [@prop-appe-l1-coherence-bound] was proposed as a conjecture by S. Rana, P. Parashar and M. Lewenstein, *Phys. Rev. A* **93**, 012110 (2016), Conjecture 7.
:::

So the item "a unit-preserving pinching does not decrease the entropy" of `H8` now has a quantitative form in finite dimension: the entropy gain is at least the discarded coherence mass $c$, the known general upper bounds are of the order of $\sqrt{c}$, and the purity drops by exactly $c$. What remains an input is the choice itself that coarse-graining is a unit-preserving pinching; the active-reset counterexample in item 4 of E.6 shows that it cannot be dropped.

## E.8.3.4 Finite-Step Path Products: Stationary Phase Is Exact for Quadratic Actions {#sec-appe-finite-step-path-product}

Item 3 of E.6 records $\delta S=0$ as a conditional result reached only through a continuum functional measure and the limit $\hbar\to0$. This subsection asks how much survives at a finite number of steps. Take $\hbar=m=1$, $H=\frac12p^2+\frac12\omega^2x^2$, $V=\frac12\omega^2x^2$, $\varepsilon=t/N$, and the single step

$$
U_\varepsilon=e^{-i\varepsilon V/2}\,e^{-i\varepsilon p^2/2}\,e^{-i\varepsilon V/2},
$$

whose kernel is the trapezoid short-time kernel $(2\pi i\varepsilon)^{-1/2}\exp i\left[\frac{(x-y)^2}{2\varepsilon}-\frac{\varepsilon\omega^2}{4}(x^2+y^2)\right]$; $U_\varepsilon^N$ is the $N$-step path product.

::: {.remark #rem-appe-oscillator-time-slicing title="The N-Step Sliced Product of the Oscillator Is an Oscillator with a Modified Frequency (Manual Derivation and Literature)"}
**Manual derivation.** Let $0<\varepsilon\omega<2$ and put

$$
\cos\theta=1-\frac{\varepsilon^2\omega^2}{2},\quad 0<\theta<\pi,\qquad \tilde\Omega=\omega\sqrt{1-\frac{\varepsilon^2\omega^2}{4}},\qquad \tilde H=\frac12p^2+\frac12\tilde\Omega^2x^2,
$$

so that $\sin\theta=\varepsilon\tilde\Omega$. Let $\tilde\varphi_n$ be the Hermite functions of frequency $\tilde\Omega$, $\tilde a=(\sqrt{\tilde\Omega}\,x+ip/\sqrt{\tilde\Omega})/\sqrt2$ and $\tilde n=\tilde a^\dagger\tilde a$.

1. $U_\varepsilon\tilde\varphi_n=e^{-i\theta(n+\frac12)}\tilde\varphi_n$ for all $n$. Hence, exactly on $L^2(\mathbb{R})$, $U_\varepsilon=\exp\left(-i\theta(\tilde n+\tfrac12)\right)=\exp\left(-i\frac{\theta}{\tilde\Omega}\tilde H\right)$.
2. For $\sin N\theta\neq0$ the kernel of $U_\varepsilon^N$ is the Mehler kernel of frequency $\tilde\Omega$ and angle $\Theta=N\theta$:

$$
K_N(x,y)=\left(\frac{\tilde\Omega}{2\pi\lvert\sin\Theta\rvert}\right)^{1/2}e^{-i\pi/4-i\pi\nu/2}\exp\left(\frac{i\tilde\Omega}{2\sin\Theta}\left[(x^2+y^2)\cos\Theta-2xy\right]\right),\qquad \nu=\left\lfloor\frac{\Theta}{\pi}\right\rfloor .
$$

3. The discrete action

$$
S_N=\sum_{k=0}^{N-1}\frac{(x_{k+1}-x_k)^2}{2\varepsilon}-\frac{\varepsilon\omega^2}{2}\sum_{k=1}^{N-1}x_k^2-\frac{\varepsilon\omega^2}{4}\left(x_0^2+x_N^2\right)
$$

with $x_0=y$, $x_N=x$ has a unique stationary point $\bar x$:

$$
\delta S_N=0\iff \bar x_k-\frac{\bar x_{k+1}+\bar x_{k-1}}{2}=(1-\cos\theta)\,\bar x_k,\qquad \bar x_k=\frac{y\sin((N-k)\theta)+x\sin(k\theta)}{\sin N\theta}.
$$

The Hessian $Q$ of $S_N$ in $x_1,\dots,x_{N-1}$ has $\det Q=\varepsilon^{-(N-1)}\dfrac{\sin N\theta}{\sin\theta}$ and $\nu$ negative eigenvalues, and

$$
K_N(x,y)=(2\pi\varepsilon)^{-N/2}e^{-i\pi N/4}\,(2\pi)^{(N-1)/2}\lvert\det Q\rvert^{-1/2}e^{i\pi\operatorname{sgn}Q/4}\,e^{iS_N(\bar x)} .
$$

The right-hand side is exactly the leading stationary-phase term at $\bar x$, including the prefactor $\lvert\det Q\rvert^{-1/2}$ and the Maslov phase $e^{-i\pi\nu/2}$. So **at every finite number of steps the path product equals the contribution of the stationary path exactly**, with zero remainder and without any limit $\hbar\to0$. The discrete Euler–Lagrange equation says that the sagitta of each step (its midpoint deviation) is $1-\cos\theta=\frac{\varepsilon^2\omega^2}2$ times the position.
4. Errors against continuous time:

$$
\frac{(\omega t)^3}{24N^2}\le\Theta-\omega t\le\frac{(\omega t)^3}{24N^2\left(1-(\omega t/2N)^2\right)},\qquad \frac{(\omega t)^2}{8N^2}\le1-\frac{\tilde\Omega}{\omega}\le\frac{(\omega t)^2}{4N^2},
$$

and for a Schwartz function $\varphi$, with $\varphi_s=e^{-isH}\varphi$,

$$
\lVert U_\varepsilon^N\varphi-e^{-itH}\varphi\rVert\le(\Theta-\omega t)\,\lVert(\tilde n+\tfrac12)\varphi\rVert+t\left[\left(\frac{\omega}{\tilde\Omega}-1\right)\sup_{0\le s\le t}\tfrac12\lVert p^2\varphi_s\rVert+\omega(\omega-\tilde\Omega)\sup_{0\le s\le t}\tfrac12\lVert x^2\varphi_s\rVert\right],
$$

and the right-hand side is $O(N^{-2})$.

Derivation: item 1. The Heisenberg actions of the three factors are $p\mapsto p-\frac{\varepsilon\omega^2}2x$, $x\mapsto x+\varepsilon p$ and $p\mapsto p-\frac{\varepsilon\omega^2}2x$; together $U_\varepsilon^*(x,p)^{\mathsf T}U_\varepsilon=M_\varepsilon(x,p)^{\mathsf T}$ with

$$
M_\varepsilon=\begin{pmatrix}\cos\theta&\varepsilon\\-\varepsilon\tilde\Omega^2&\cos\theta\end{pmatrix}=\begin{pmatrix}\cos\theta&\sin\theta/\tilde\Omega\\-\tilde\Omega\sin\theta&\cos\theta\end{pmatrix},
$$

which is the flow of $\tilde H$ for time $\theta/\tilde\Omega$. Hence $U_\varepsilon^*\tilde aU_\varepsilon=e^{-i\theta}\tilde a$, $U_\varepsilon$ maps $\ker\tilde a=\mathbb{C}\tilde\varphi_0$ into itself, and $U_\varepsilon\tilde\varphi_n$ carries one more factor $e^{-in\theta}$ than $U_\varepsilon\tilde\varphi_0$. The phase on the ground state: label $e^{-zx^2/2}$ ($\operatorname{Re}z>0$) by $z$. A kick maps $z$ to $z+\frac{i\varepsilon\omega^2}2$; a free step maps $e^{-zx^2/2}$ to $(1+i\varepsilon z)^{-1/2}e^{-\frac{z}{1+i\varepsilon z}x^2/2}$ (principal branch; Fourier transform of a Gaussian). Starting from $z_0=\tilde\Omega$: $z_1=\tilde\Omega+\frac{i\varepsilon\omega^2}2$ and $1+i\varepsilon z_1=\cos\theta+i\sin\theta=e^{i\theta}$. Expanding with $\tilde\Omega^2=\omega^2-\frac{\varepsilon^2\omega^4}4$ gives $z_1=(\tilde\Omega-\frac{i\varepsilon\omega^2}2)e^{i\theta}$, so the free step leads to $\tilde\Omega-\frac{i\varepsilon\omega^2}2$, the second kick returns to $\tilde\Omega$, and the total phase is $e^{-i\theta/2}$. Completeness of the Hermite functions gives the operator identity. Item 2 is Mehler's formula (`Literature`) for $\exp(-i\Theta(\tilde n+\frac12))$. Item 3: the stationarity equation is $\partial S_N/\partial x_k=0$. $Q=\frac1\varepsilon(2\cos\theta\,\mathbf{1}-J)$ with $J$ the adjacency matrix of the path graph, whose eigenvalues are $2\cos\frac{j\pi}N$ ($1\le j\le N-1$); this gives the determinant and the number $\#\{j:j\pi/N<\theta\}=\nu$ of negative eigenvalues. Integrate over $x_1,\dots,x_{N-1}$ with the Gauss–Fresnel integral (understood with Gaussian regularization; `Literature`: for a nondegenerate real quadratic form it equals the value at the stationary point times $(2\pi)^{n/2}\lvert\det Q\rvert^{-1/2}e^{i\pi\operatorname{sgn}Q/4}$), and use $(2\pi i\varepsilon)^{-1/2}=(2\pi\varepsilon)^{-1/2}e^{-i\pi/4}$. The modulus of the prefactor is $(2\pi)^{-1/2}\lvert\sin\theta/(\varepsilon\sin\Theta)\rvert^{1/2}=(\tilde\Omega/(2\pi\lvert\sin\Theta\rvert))^{1/2}$ and its phase is $e^{-i\pi N/4}e^{i\pi(N-1-2\nu)/4}=e^{-i\pi/4-i\pi\nu/2}$; the exponent agrees with item 2 because both are kernels of the same operator. Item 4: $f(u)=\arcsin u-u$ satisfies $\frac{u^2}2\le f'(u)\le\frac{u^2}{2(1-u^2)}$, and $\Theta-\omega t=2Nf(\frac{\omega t}{2N})$; also $1-\sqrt{1-y}\in[\frac y2,y]$. For the state bound insert $e^{-i\omega t(\tilde n+\frac12)}=e^{-i(\omega t/\tilde\Omega)\tilde H}$; the first difference is bounded by the spectral theorem and $\lvert e^{-ia}-e^{-ib}\rvert\le\lvert a-b\rvert$, the second by Duhamel's formula and $\frac{\omega}{\tilde\Omega}\tilde H-H=\left(\frac{\omega}{\tilde\Omega}-1\right)\frac{p^2}2-\omega(\omega-\tilde\Omega)\frac{x^2}2$.

**Numerical check (`NUM`).** With $U_\varepsilon$ implemented by fast Fourier transform on a $4096$-point grid: for $\varepsilon\omega=0.3,1,1.9$, $\lVert U_\varepsilon\tilde\varphi_n-e^{-i\theta(n+\frac12)}\tilde\varphi_n\rVert\le4\times10^{-15}$ ($n<6$), while the ground state of frequency $\omega$ is not an eigenvector (residuals $2.4\times10^{-3}$, $8.8\times10^{-2}$, $0.49$ after removing the best multiple); $U_\varepsilon^N$ applied to a Gaussian wave packet differs from the integral against the kernel of item 2 by at most $6\times10^{-15}$, for cases with $\nu$ from $0$ to $19$; the assembly of item 3 agrees with item 2 at random points to $2\times10^{-13}$, and every count of negative eigenvalues matches. For a coherent state centred at $x=1$ and $t=3$, $N^2\lVert U_\varepsilon^N\varphi-e^{-itH}\varphi\rVert$ stays at $1.51$ from $N=8$ to $128$ and is always below the bound of item 4 (for example $9.2\times10^{-5}\le5.3\times10^{-4}$ at $N=128$).

**Literature result.** The modified Hamiltonian of the Störmer–Verlet integrator for linear oscillators and the stability condition $\varepsilon\omega<2$: E. Hairer, C. Lubich and G. Wanner, *Geometric Numerical Integration*, 2nd ed. (Springer, 2006). The time-sliced oscillator and the angle $\theta$ with $2\sin\frac\theta2=\varepsilon\omega$: H. Kleinert, *Path Integrals in Quantum Mechanics, Statistics, Polymer Physics, and Financial Markets*, 5th ed. (World Scientific, 2009); the slicing convention there has not been checked term by term against the trapezoid convention used here. Background on the metaplectic representation: G. B. Folland, *Harmonic Analysis in Phase Space* (Princeton, 1989).
:::

The $1-\cos\theta$ of item 3 is exactly the sagitta of E.8.1.1, and it also decides how large a time step may be.

::: {.example #ex-appe-time-step-trichotomy title="The Sagitta of a Time Step: Elliptic, Parabolic and Hyperbolic Slicings (Manual Derivation and Numerical Check)"}
**Manual derivation.** The single-step matrix $M_\varepsilon=\begin{pmatrix}1-\frac{\varepsilon^2\omega^2}2&\varepsilon\\-\varepsilon\omega^2\left(1-\frac{\varepsilon^2\omega^2}4\right)&1-\frac{\varepsilon^2\omega^2}2\end{pmatrix}$ (with $\det M_\varepsilon=1$ for every $\varepsilon\omega>0$) has similarity reading $\frac12\operatorname{tr}M_\varepsilon=1-v$ with sagitta $v=\frac{\varepsilon^2\omega^2}2$. By the table of E.8.1.1: for $0<\varepsilon\omega<2$, $0<v<2$, elliptic, and $M_\varepsilon^n$ is bounded; for $\varepsilon\omega=2$, $v=2$, $M_\varepsilon=\begin{pmatrix}-1&\varepsilon\\0&-1\end{pmatrix}$, parabolic, and $M_\varepsilon^n=(-1)^n\begin{pmatrix}1&-n\varepsilon\\0&1\end{pmatrix}$ grows linearly; for $\varepsilon\omega>2$, $v>2$, hyperbolic, with exponential growth. $U_\varepsilon$ is always unitary; what grows is the spread in position and momentum, so the time step has to satisfy $\varepsilon\omega<2$ for the sliced product to keep it bounded.

**Numerical check (`NUM`).** With $\omega=1$: for $\varepsilon=1.9$, $\lVert M_\varepsilon^n\rVert$ at $n=10,100,1000$ is $1.10$, $2.26$, $1.95$; for $\varepsilon=2$ it is $20.05$, $200$, $2000$; for $\varepsilon=2.1$ it is $9.4\times10^2$, $3.9\times10^{27}$, $6.0\times10^{273}$.
:::

Beyond quadratic actions there is no such exact equality at a finite number of steps. What remains are one-dimensional cancellation bounds: a stretch without a stationary point contributes a bounded amount, however long it is.

::: {.remark #rem-appe-oscillatory-cancellation-bounds title="Stretches without a Stationary Point Cancel: Explicit Bounds for One-Dimensional Oscillatory Integrals and Sums (Manual Derivation and Literature)"}
**Manual derivation.** Let $\lambda>0$.

1. If $\varphi\in C^2[a,b]$, $\varphi'$ is monotone and $\lvert\varphi'\rvert\ge\mu>0$, then $\left\lvert\int_a^be^{i\lambda\varphi(s)}ds\right\rvert\le\dfrac{3}{\lambda\mu}$.
2. If $\varphi\in C^2[a,b]$ and $\lvert\varphi''\rvert\ge\mu>0$, then $\left\lvert\int_a^be^{i\lambda\varphi(s)}ds\right\rvert\le\dfrac{4\sqrt3}{\sqrt{\lambda\mu}}$.
3. If $A<B$ are integers, $f\in C^1[A,B]$, $f'$ is monotone, and $m+\delta\le f'\le m+1-\delta$ for an integer $m$ and some $0<\delta\le\frac12$, then $\left\lvert\sum_{n=A}^{B-1}e^{2\pi if(n)}\right\rvert\le\cot\dfrac{\pi\delta}{2}$, independently of the number of terms.

Derivation: item 1, integrate by parts: $\int e^{i\lambda\varphi}=\left[\frac{e^{i\lambda\varphi}}{i\lambda\varphi'}\right]_a^b-\int e^{i\lambda\varphi}\left(\frac{1}{i\lambda\varphi'}\right)'$; the boundary term is at most $\frac2{\lambda\mu}$, and by monotonicity the integral term is at most $\frac1\lambda\left\lvert\frac1{\varphi'(b)}-\frac1{\varphi'(a)}\right\rvert\le\frac1{\lambda\mu}$. Item 2: $\varphi'$ is strictly monotone, $\{\lvert\varphi'\rvert<\eta\}$ is an interval of length at most $\frac{2\eta}{\mu}$, and on the remaining at most two intervals $\lvert\varphi'\rvert\ge\eta$, each contributing at most $\frac3{\lambda\eta}$ by item 1; the total $\frac6{\lambda\eta}+\frac{2\eta}\mu$ is smallest at $\eta=\sqrt{3\mu/\lambda}$. Item 3: $g_n=f(n+1)-f(n)\in[m+\delta,m+1-\delta]$ is monotone in $n$. With $c_n=\left(e^{2\pi ig_n}-1\right)^{-1}=-\frac12-\frac i2\cot\pi g_n$ one has $e^{2\pi if(n)}=c_n\left(e^{2\pi if(n+1)}-e^{2\pi if(n)}\right)$. Abel summation gives the bound $\lvert c_A\rvert+\lvert c_{B-1}\rvert+\sum_{n=A+1}^{B-1}\lvert c_n-c_{n-1}\rvert$; here $\lvert c_n\rvert\le\frac1{2\sin\pi\delta}$, and by monotonicity the last sum telescopes to $\frac12\lvert\cot\pi g_{B-1}-\cot\pi g_A\rvert\le\cot\pi\delta$; in total $\frac{1+\cos\pi\delta}{\sin\pi\delta}=\cot\frac{\pi\delta}2$.

All three are one-dimensional; the $N$-step product is an $(N-1)$-dimensional integral, and how the constants behave with the dimension needs a separate estimate.

**Numerical check (`NUM`).** For random phases and random quadratic oscillatory sums, the largest ratio of the integral to the bound is $0.57$ for item 1 and $0.45$ for item 2, and the largest ratio of the sum to the bound of item 3 is $0.97$.

**Literature result.** Items 1 and 2 are van der Corput's lemma; for the constants see E. M. Stein, *Harmonic Analysis* (Princeton, 1993), Chapter VIII (where the constant of order $k$ is $5\cdot2^{k-1}-2$; here item 2 has $4\sqrt3<8$). Item 3 is the Kusmin–Landau inequality: L. J. Mordell, *Acta Arith.* **4**, 3–9 (1958); S. W. Graham and G. Kolesnik, *Van der Corput's Method of Exponential Sums* (Cambridge, 1991).
:::

What remains is the continuum-time limit.

::: {.remark #rem-appe-path-integral-remaining-inputs title="What the Continuum-Time Limit Still Needs (Literature Result, Not Formalized in This Book; OPEN)"}
**Literature result, not formalized in this book.**

1. At fixed $\hbar$, no path measure is needed at the level of operators: if $H_0=\frac12p^2$ and $V$ are such that $H_0+V$ is essentially self-adjoint on $D(H_0)\cap D(V)$, then $\left(e^{-itV/N}e^{-itH_0/N}\right)^N\to e^{-itH}$ strongly. H. F. Trotter, *Proc. Amer. Math. Soc.* **10**, 545–551 (1959); E. Nelson, *J. Math. Phys.* **5**, 332–343 (1964). The frozen [`trotter_product`](lean:D5/S3/Quantum/Analysis/TrotterProduct.trotter_product) is the version for bounded elements of a Banach algebra and does not cover $p^2$.
2. On path space there is no countably additive complex measure of bounded total variation that represents $e^{iS}\mathcal{D}x$: R. H. Cameron, *J. Math. and Phys.* **39**, 126–140 (1960). So the "continuum functional measure" of E.6 and E.7 should be read as "the limit of time-sliced oscillatory integrals", not as such a measure.
3. For non-quadratic potentials: convergence of the time-sliced integrals and construction of the fundamental solution, D. Fujiwara, *J. Analyse Math.* **35**, 41–96 (1979) and *Duke Math. J.* **47**, 559–600 (1980); stationary phase with a remainder estimate on spaces of large dimension, D. Fujiwara, *Nagoya Math. J.* **124**, 61–97 (1991); monograph *Rigorous Time Slicing Approach to Feynman Path Integrals* (Springer, 2017). The conditions these results impose on the potential have not been checked item by item in this book.

So the selection of paths by $\delta S=0$ is exact at a finite number of steps only for quadratic actions ([@rem-appe-oscillator-time-slicing]); for general actions there are only asymptotic statements in $\hbar$, with the explicit one-dimensional bounds of [@rem-appe-oscillatory-cancellation-bounds] and, in many dimensions, the literature of item 3.

**OPEN.** Interacting field theory in $3+1$ dimensions has no counterpart of any of these theorems; this item stays open, as `H9` in E.7.
:::

## E.8.3.5 Complex Structure, Exchange Sign and Valuation: The Exact Shape of Three Inputs {#sec-appe-complex-exchange-valuation}

After E.8.2.3 the ledger still lists three items as plain inputs: the central complex structure and the exchange sector of `H7`, and the choice of valuation in `H4`. This subsection writes the first as a condition on generators and readings, places the second in configuration space, and writes the third as a boundedness criterion; all three remain inputs.

The algebras below are finite direct sums $\mathcal{A}=M_{n_1}(F_1)\oplus\cdots\oplus M_{n_m}(F_m)$ with $F_k\in\{\mathbb{R},\mathbb{C},\mathbb{H}\}$, $n_k\ge1$, and blockwise conjugate transpose as involution. Write $\operatorname{Sa}(\mathcal{A})=\{a:a^*=a\}$ (similarity parts), $\operatorname{Skew}(\mathcal{A})=\{a:a^*=-a\}$ (difference parts) and $U(\mathcal{A})=\{u:u^*u=uu^*=\mathbf{1}\}$ (fair elements). The splitting $a=\frac12(a+a^*)+\frac12(a-a^*)$ is the $S$ and $A$ of E.8.1.1.

::: {.remark #rem-appe-agreement-difference-count title="Dimensions of Similarity and Difference Parts: In a Single Matrix Algebra They Are Equal Only in the Complex Case (Manual Derivation)"}
**Manual derivation.** Let $d=\dim_{\mathbb{R}}F\in\{1,2,4\}$. In $M_n(F)$ the diagonal entries of a self-adjoint matrix are real, those of a skew-adjoint matrix are purely imaginary ($d-1$ parameters each), and each pair $i<j$ carries one free entry of $F$ in both cases. Hence

$$
\dim\operatorname{Sa}=K_d(n)=n+d\cdot\frac{n(n-1)}{2},\qquad \dim\operatorname{Skew}=dn^2-K_d(n),\qquad \dim\operatorname{Sa}-\dim\operatorname{Skew}=(2-d)\,n,
$$

where $K_d$ is the counting function of [@rem-appe-tomography-count]. The difference is $n$, $0$ and $-2n$ for real, complex and quaternionic scalars, and it carries the same factor $2-d$ as the composite defect $\frac{d(2-d)}4a(a-1)b(b-1)$ there. For direct sums, equal dimensions no longer settle the matter: in $M_2(\mathbb{R})\oplus\mathbb{H}$ one has $\dim\operatorname{Sa}=3+1=4=1+3=\dim\operatorname{Skew}$, and neither summand is complex.
:::

In E.8.2.2 a family of fair elements is generated by a difference part (the chord rate $-iH$), and what is read is a similarity part ($H$); in complex quantum theory the two correspond one to one by multiplication with $i$, and the correspondence does not depend on the frame. The next remark turns this into a condition that also applies to direct sums.

::: {.remark #rem-appe-generator-reading-dictionary title="A Generator–Reading Dictionary Exists Exactly When the Center Contains a Right-Angle Comparison (Manual Derivation and Numerical Check)"}
**Manual derivation.** Call a real-linear bijection $\Phi:\operatorname{Skew}(\mathcal{A})\to\operatorname{Sa}(\mathcal{A})$ a **covariant dictionary** if $\Phi(uxu^*)=u\,\Phi(x)\,u^*$ for all $u\in U(\mathcal{A})$ and $x\in\operatorname{Skew}(\mathcal{A})$. The following are equivalent:

1. a covariant dictionary exists;
2. the center of $\mathcal{A}$ contains $J$ with $J^*=-J$ and $J^2=-\mathbf{1}$;
3. every $F_k=\mathbb{C}$;
4. in the center, the difference parts and the similarity parts have the same dimension.

When they hold, such $J$ are exactly $(\pm i\mathbf{1}_1,\dots,\pm i\mathbf{1}_m)$, $2^m$ of them, and $\Phi(x)=Jx$ is a covariant dictionary. For $\mathcal{A}=M_n(\mathbb{C})$ the covariant real-linear maps are exactly $\Phi(x)=J\bigl(\alpha x+\gamma\operatorname{tr}(x)\mathbf{1}\bigr)$ with $\alpha,\gamma\in\mathbb{R}$ and $\operatorname{tr}$ the complex trace; for $n\ge2$ such a map is bijective if and only if $\alpha\neq0$ and $\alpha+n\gamma\neq0$, and for $n=1$ if and only if $\alpha+\gamma\neq0$. For $m\ge2$ the dictionary is not unique: the central parts of different summands can be mixed by an arbitrary real-linear map.

Derivation. (a) The real span of $U(M_n(F))$ is $M_n(F)$: the span is closed under products and contains the diagonal matrices with unit entries of $F$ (these span all diagonal matrices) and the permutation matrices, and a permutation matrix times a diagonal matrix unit gives every $qE_{ij}$; in a direct sum, $(1,\dots,u_k,\dots,1)$ and $(-1,\dots,u_k,\dots,-1)$ average to $(0,\dots,u_k,\dots,0)$. So the elements commuting with every fair element are exactly the central ones. (b) The center of $M_n(F)$ is $Z(F)\mathbf{1}$, with $Z(\mathbb{R})=\mathbb{R}$, $Z(\mathbb{C})=\mathbb{C}$, $Z(\mathbb{H})=\mathbb{R}$; so the central similarity parts form an $m$-dimensional space, and the dimension of the central difference parts is the number of complex summands.

- **2⇒1.** If $J$ is central and $J^*=-J$, then $(Jx)^*=x^*J^*=xJ=Jx$, so $x\mapsto Jx$ sends difference parts to similarity parts, with inverse $y\mapsto-Jy$, and $J\,uxu^*=u\,Jx\,u^*$.
- **1⇒4.** By covariance, $\Phi(x)$ is fixed by every conjugation when $x$ is; the converse follows from injectivity. So $\Phi$ maps the two fixed subspaces onto each other, and by (a) these are the central parts.
- **4⇒3⇒2.** By (b), item 4 says that $m$ equals the number of complex summands; then take $J=(i\mathbf{1}_1,\dots,i\mathbf{1}_m)$. A central difference part has components in $i\mathbb{R}\mathbf{1}_k$, and $J^2=-\mathbf{1}$ forces each to be $\pm i$.
- **Covariant maps on $M_n(\mathbb{C})$.** Let $L(h)=\Phi(-Jh)$, a covariant map from $\operatorname{Sa}$ to itself. A real diagonal $D$ is fixed by the diagonal fair elements, so $L(D)$ commutes with all of them and is real diagonal; on real diagonals $L$ commutes with permutations, so $L(D)=\alpha D+\gamma\operatorname{tr}(D)\mathbf{1}$. Every $h$ is some $uDu^*$, hence $L(h)=\alpha h+\gamma\operatorname{tr}(h)\mathbf{1}$; $L$ multiplies the traceless part by $\alpha$ and $\mathbf{1}$ by $\alpha+n\gamma$.

**Numerical check (`NUM`).** Realizing each algebra as a real matrix algebra and writing the covariance condition with random fair elements and blockwise reflections, the solution space is $1$-dimensional for $M_1(\mathbb{C})$ and $2$-dimensional for $M_n(\mathbb{C})$, $n=2,3,4$, with invertible solutions; $M_n(\mathbb{R})$, $M_n(\mathbb{H})$ ($n\le4$), $\mathbb{R}\oplus\mathbb{C}$, $\mathbb{R}\oplus\mathbb{H}$, $M_2(\mathbb{R})\oplus\mathbb{H}$ and $M_3(\mathbb{R})\oplus\mathbb{H}\oplus\mathbb{H}$ have no invertible solution; for $\mathbb{C}\oplus\mathbb{C}$, $M_2(\mathbb{C})\oplus\mathbb{C}$ and $M_2(\mathbb{C})\oplus M_2(\mathbb{C})$ the solution space has dimension $4$, $5$ and $6$ and contains invertible solutions.
:::

So the "central complex structure" of `H7` can be restated (`MODEL`): **every difference part comes with a similarity reading, and this correspondence is linear, invertible and unchanged by a change of frame through a fair element.**

::: {.remark #rem-appe-dictionary-independence title="The Dictionary Does Not Follow from Clauses I–IV and Positivity, and It Gives the Complex Carrier of H4 (Manual Derivation and Literature)"}
**Manual derivation.**

1. **Models satisfying every clause without a dictionary.** For $F=\mathbb{R}$ or $\mathbb{H}$ take $X=U(M_n(F))$ (that is, $\mathrm{O}(n)$ or $\mathrm{Sp}(n)$), $\mathcal{A}=M_n(F)$ and $\mathrm{CMP}(x,y)=x^*y$. Clause II: $\mathrm{CMP}(x,y)^*=y^*x=\mathrm{CMP}(y,x)$; Clause III: $x^*y\,y^*x=\mathbf{1}$; Clause IV: $x^*y\,y^*z=x^*z$; Clause I: $\mathrm{CMP}(x,\mathbf{1})=\mathrm{CMP}(y,\mathbf{1})$ already gives $x=y$. Positivity: $\operatorname{Re}\operatorname{tr}(a^*a)=\sum_{i,j}\lvert a_{ij}\rvert^2$, so $a^*a=-t\mathbf{1}$ ($t\ge0$) forces $-tn\ge0$, $t=0$ and $a=0$. By [@rem-appe-generator-reading-dictionary] these models have no covariant dictionary.
2. **It is not "the count multiplies".** The commutative algebra $\mathbb{R}^n$ ($d=0$ in [@rem-appe-tomography-count]) has a multiplicative count, but $\operatorname{Skew}=0$ and there is no dictionary. Only within single matrix algebras ($n\ge2$) do the three conditions (the count multiplies, the two parts have equal dimension, a covariant dictionary exists) all select the complex numbers.
3. **Complex carrier.** Let the center of $\mathcal{A}$ contain $J$ with $J^*=-J$ and $J^2=-\mathbf{1}$, and let $\pi$ be a unital $*$-representation of $\mathcal{A}$ on a finite-dimensional real inner-product space $V$ ($\pi(a^*)=\pi(a)^{\mathsf T}$). Then $R=\pi(J)$ satisfies $R^{\mathsf T}=-R$ and $R^2=-I$ and commutes with every $\pi(a)$; so $V$ becomes a complex vector space with $R$ as $i$, $\pi(\mathcal{A})$ acts complex-linearly, and $(\det R)^2=(-1)^{\dim V}$ forces $\dim V$ to be even. This is the even real dimension and complex carrier of [@rem-appe-arithmetic-chain], item 3.
4. **The sign of $J$.** On each summand $J$ is fixed only up to sign: entrywise complex conjugation of $M_n(\mathbb{C})$ is a $*$-automorphism exchanging $i\mathbf{1}$ and $-i\mathbf{1}$. Item 5 of [@rem-appe-real-realizability-return-phase] uses the same complex conjugation: it keeps the pairwise similarity readings and changes the sign of $D$.

**Literature result.** Stueckelberg (1960, *Helv. Phys. Acta* 33, 727) argued from the uncertainty relations that quantum theory on a real Hilbert space must carry a complex structure commuting with every observable, which makes it equivalent to complex quantum theory; Moretti and Oppio obtain from Poincaré symmetry a complex structure that commutes with every observable and is unique up to sign (2017, *Rev. Math. Phys.* 29, 1750021; the quaternionic case in 2019, same journal 31, 1950013). In general probabilistic theories, the three postulates of Barnum, Müller and Ududec (2014, *New J. Phys.* 16, 123029) leave candidates that include real, complex and quaternionic quantum theory, and adding "observability of energy" leaves only complex quantum theory. That finite-dimensional real $C^*$-algebras are, up to $*$-isomorphism, exactly the direct sums above is a classical result; this remark uses only the given direct sums and does not depend on it. The network experiments that separate real from complex quantum theory (Renou et al. 2021, *Nature* 600, 625; Chen et al. 2022 and Li et al. 2022, *Phys. Rev. Lett.* 128, 040403 and 040402) compare real and complex tensor-product composition in networks with independent sources, see [Appendix D](appendix-d.md); they say nothing about a dictionary on a single system.
:::

The exchange sector has an exact place in configuration space. Two identical objects in $\mathbb{R}^d$, with the center of mass removed, are described by the relative vector $r\neq0$, with $r$ and $-r$ regarded as the same configuration.

::: {.remark #rem-appe-exchange-configuration-space title="The Exchange Loop Is Not Filled by Triangles: Configuration Space Leaves Only a Sign (Manual Derivation and Literature)"}
**Manual derivation.** Let $P_d=(\mathbb{R}^d\setminus\{0\})/\{r\sim-r\}$. The map $r\mapsto r/\lvert r\rvert$ is compatible with the antipodal map and deformation-retracts $P_d$ onto $S^{d-1}/\{\pm1\}=\mathbb{RP}^{d-1}$.

1. $d=1$: $P_1\cong(0,\infty)$ (take $\lvert r\rvert$), which is contractible; there is no exchange path without collision.
2. $d=2$: $\mathbb{RP}^1\cong S^1$ (angle doubling), with fundamental group $\mathbb{Z}$ generated by the half turn $\varphi\in[0,\pi]$; the one-dimensional unitary characters are $e^{i\alpha}$ with arbitrary $\alpha$.
3. $d\ge3$: $S^{d-1}$ is simply connected and the antipodal map has no fixed point, so $S^{d-1}\to\mathbb{RP}^{d-1}$ is the two-sheeted universal cover and the fundamental group is $\mathbb{Z}/2$. The exchange loop ($r$ moving along half a great circle to $-r$) lifts to a path that does not close, so it is the nontrivial element; doing it twice is a whole great circle, contractible in $S^{d-1}$. A one-dimensional unitary character satisfies $\chi^2=1$, so only $\pm1$ remain.

In the language of [@rem-appe-triangle-simple-connectivity] (`MODEL`): a $\mathrm{U}(1)$-valued comparison transported along paths is flat if it is trivial around every contractible loop; for $d\ge3$ the exchange loop is not contractible and is not filled by triangles, and flatness leaves its value $\pm1$ undetermined. This is the configuration-space form of "Clause I removes labels and does not choose a sector" ([@rem-appe-swap-sagitta]).

**Literature result.** That path-integral weights of identical particles form a one-dimensional representation of the fundamental group is due to Laidlaw–DeWitt (1971, *Phys. Rev. D* 3, 1375); arbitrary phases in two dimensions are due to Leinaas–Myrheim (1977, *Nuovo Cimento B* 37, 1). The fundamental group of $\mathbb{RP}^{d-1}$ is a standard covering-space computation. For three or more objects with $d\ge3$ the fundamental group is the symmetric group $S_N$, which also has higher-dimensional irreducible representations (parastatistics); this remark does not treat them.
:::

Can a construction select the sign? The following redoes a classical construction and shows at which step $(-1)^{2S}$ appears.

::: {.example #ex-appe-berry-robbins-transport title="A Transported Basis for Two Spins S: Where the Exchange Sign Appears (Manual Derivation and Numerical Check)"}
**Manual derivation.** Use Schwinger's representation: spin $S$ of object 1 uses $2S$ quanta in two oscillators $a_1,a_2$, and object 2 uses $2S$ quanta in $b_1,b_2$. On the space of $N=4S$ quanta in the four oscillators define the generators of the exchange $\mathrm{SU}(2)$:

$$
K_x=\frac12\sum_{i}\bigl(a_i^\dagger b_i+b_i^\dagger a_i\bigr),\qquad K_y=-\frac{i}{2}\sum_{i}\bigl(a_i^\dagger b_i-b_i^\dagger a_i\bigr),\qquad K_z=\frac12\sum_{i}\bigl(a_i^\dagger a_i-b_i^\dagger b_i\bigr).
$$

The physical two-spin space $\mathcal{P}$ is the part with $K_z=0$, of dimension $(2S+1)^2$. Let $E$ be the exchange $a_i\leftrightarrow b_i$, that is, the swap of the two spins.

1. **A rotation by $\pi$ is the swap times a number.** On each doublet $(a_i^\dagger,b_i^\dagger)$, $K_x$ acts as $\frac12\sigma_x$ and $e^{-i\pi\sigma_x/2}=-i\sigma_x$: every creation operator is swapped and multiplied by $-i$. So on $N$ quanta $e^{-i\pi K_x}=(-i)^NE$, and for $N=4S$ the number is $(-1)^{2S}$.
2. **Transported basis.** For $r=(\theta,\varphi)\in S^2$ put $n_\varphi=(-\sin\varphi,\cos\varphi,0)$, $U(r)=\exp(-i\theta\,n_\varphi\cdot K)$ and $\lvert M(r)\rangle=U(r)\lvert M\rangle$ for $\lvert M\rangle\in\mathcal{P}$. At $\theta=\pi$ the angle $\varphi$ is undetermined, but $U(r)\lvert M\rangle=e^{-i\gamma K_z}e^{-i\pi K_x}\lvert M\rangle$ with $\gamma=\varphi+\frac\pi2$, $e^{-i\pi K_x}\lvert M\rangle\in\mathcal{P}$, and rotations about $K_z$ act as the identity on $\mathcal{P}$; so $\lvert M(r)\rangle$ depends only on $r$.
3. **Exchange property.** $-r=(\pi-\theta,\varphi+\pi)$ and $n_{\varphi+\pi}=-n_\varphi$, so $U(r)^{-1}U(-r)=\exp(i\pi\,n_\varphi\cdot K)=e^{-i\gamma K_z}e^{i\pi K_x}e^{i\gamma K_z}$. On $\mathcal{P}$ both $K_z$ factors are the identity and $e^{i\pi K_x}=i^NE$, hence

   $$
   \lvert M(-r)\rangle=(-1)^{2S}\,\lvert EM(r)\rangle .
   $$

4. **Parallel transport.** $U^{-1}dU$ lies in $i\operatorname{span}\{K_x,K_y,K_z\}$; $K_x$ and $K_y$ change $K_z$ by $\pm1$, and $K_z$ vanishes on $\mathcal{P}$, so $\langle M'(r)\rvert d\lvert M(r)\rangle=0$.
5. **Single-valuedness gives the sign.** With $\Psi(r)=\sum_M\psi_M(r)\lvert M(r)\rangle$ and the requirement $\Psi(-r)=\Psi(r)$, one gets $\psi_{EM}(-r)=(-1)^{2S}\psi_M(r)$.

Two points need care. First, for $r\neq\pm\hat z$ the vectors $\lvert M(r)\rangle$ are in general not in $\mathcal{P}$: they live in the larger space of $4S$ quanta in four oscillators. Second, the factor $-i\sigma_x$ on each quantum squares to $-\mathbf{1}$, so it is a right-angle rotor, and the sign is the product of $4S$ such factors. It is not the half comparison $r(u)$ of [@rem-appe-half-comparison-holonomy]: $r(u)$ is defined only for similarity readings $s>-1$, and the similarity reading of $-\mathbf{1}$ is $-1$. The number $(-1)^{2S}$ equals the sign $e^{-2\pi iS_z}=(-1)^{2S}$ of a $2\pi$ rotation of one spin $S$; the construction does not derive this equality from anything else.

**Numerical check (`NUM`).** For $S=\frac12,1,\frac32$ ($N=2,4,6$): $\lVert e^{-i\pi K_x}-(-i)^NE\rVert_{\max}\le7\times10^{-16}$; on $200$ random directions the residual of item 3 is $\le1.3\times10^{-15}$, while the opposite sign leaves a residual $\ge0.9$; the central-difference residual of item 4 is $\le6\times10^{-10}$.
:::

::: {.remark #rem-appe-spin-statistics-inputs title="The Transported Basis Does Not Choose the Sign; Spin–Statistics Remains an Input (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** [@ex-appe-berry-robbins-transport] is the construction of Berry–Robbins (1997, *Proc. R. Soc. Lond. A* 453, 1771): the axis of the exchange rotation is $e_3\times r$, the rotation acts on the larger space of the Schwinger representation, and it gives the exchange rule $\lvert M(-r)\rangle=(-1)^{2S}\lvert EM(r)\rangle$ together with the parallel-transport condition (the comparison here relies on the account of Papadopoulos and Reyes-Lega 2010, *Found. Phys.* 40, 829). Berry and Robbins (2000, *J. Phys. A* 33, L207) describe constructions that meet all their earlier requirements but give the opposite exchange sign, for instance replacing commutators by anticommutators in the Schwinger representation, and suggest why these might be unacceptable. Redoing item 1 of [@ex-appe-berry-robbins-transport] with fermionic oscillators for $S=\frac12$ gives $e^{-i\pi K_x}a_i^\dagger b_j^\dagger\lvert0\rangle=+a_j^\dagger b_i^\dagger\lvert0\rangle$, so the exchange rule has sign $+1$ (`NUM`). The single-valuedness requirement $\Psi(-r)=\Psi(r)$ in the form advocated by Berry and Robbins has itself been questioned (Reyes-Lega 2011, *J. Phys. A* 44, 325308). The connection between spin and statistics comes from relativistic local quantum field theory: Fierz (1939), Pauli (1940, *Phys. Rev.* 58, 716), Lüders–Zumino (1958, *Phys. Rev.* 110, 1450), Burgoyne (1958, *Nuovo Cimento* 8, 607). The comparison axiom does not derive it.
:::

So the exchange input now has an exact shape: for $d\ge3$ the exchange loop can carry only $\pm1$, and flat comparison does not choose between them; the Schwinger transported basis writes the sign as a product of $4S$ right-angle rotors, while constructions of the same kind also give the opposite sign.

Last, the valuation. E.8.1.1 characterizes the elliptic row by "integer powers are bounded" ([@rem-appe-bounded-recurrence]); the Ostrowski bifurcation has a criterion of the same form.

::: {.remark #rem-appe-bounded-integers-ultrametric title="Bounded Integer Multiples Exactly When Ultrametric: A Two-Row Table of Valuations (Manual Derivation and Literature)"}
**Manual derivation.** Let $\lvert\cdot\rvert$ be an absolute value on a field $K$ (multiplicative, satisfying the triangle inequality, zero only at $0$). The following are equivalent:

1. $\{\lvert n\cdot1\rvert:n\in\mathbb{Z}\}$ is bounded;
2. $\lvert n\cdot1\rvert\le1$ for every integer $n$;
3. the strong triangle inequality $\lvert x+y\rvert\le\max(\lvert x\rvert,\lvert y\rvert)$ holds for all $x,y$.

Derivation: 3⇒2 by induction on $n$, $\lvert n+1\rvert\le\max(\lvert n\rvert,1)$, together with $\lvert-1\rvert=1$. 2⇒1 is clear. 1⇒2: $\lvert n\rvert^k=\lvert n^k\rvert$ is bounded in $k$, which forces $\lvert n\rvert\le1$. 2⇒3: by the binomial expansion and item 2, $\lvert x+y\rvert^k\le\sum_{j=0}^{k}\lvert\binom kj\rvert\,\lvert x\rvert^j\lvert y\rvert^{k-j}\le(k+1)\max(\lvert x\rvert,\lvert y\rvert)^k$; take $k$-th roots and let $k\to\infty$.

Under the strong triangle inequality, if $\lvert x\rvert>\lvert y\rvert$, then $\lvert x+y\rvert\le\lvert x\rvert$, and $\lvert x\rvert\le\max(\lvert x+y\rvert,\lvert y\rvert)$ forces $\lvert x\rvert\le\lvert x+y\rvert$, so $\lvert x+y\rvert=\lvert x\rvert$. Hence in a triangle with sides $x-y$, $y-z$, $x-z$ the two longest sides are equal.

| Absolute values of integers | Triangle inequality | Nontrivial absolute values on $\mathbb{Q}$ |
| :--- | :--- | :--- |
| bounded ($\le1$) | strong; every triangle is isosceles | equivalent to some $\lvert\cdot\rvert_p$ |
| unbounded | ordinary | equivalent to $\lvert\cdot\rvert_\infty$ |

What this shares with [@rem-appe-bounded-recurrence] is only the form of the criterion: there, the difference part of a comparison satisfies the positivity condition exactly when its integer powers are bounded; here, an absolute value is ultrametric exactly when, for every integer, the absolute values of its powers are bounded. Three things differ. Multiplicativity makes $\lvert n^k\rvert=\lvert n\rvert^k$ either bounded or exponentially growing, so nothing corresponds to the linear growth of the parabolic row. On $\mathbb{Q}$, in the unbounded row the positive integers grow like a power, $\lvert n\rvert=n^\alpha$ with $0<\alpha\le1$. And the bounded row gives $\mathbb{Q}_p$, while the elliptic rotations of E.8.1.1 and $\mathbb{C}$ sit over the unbounded, archimedean row. So the two tables share the criterion, not an object.

**Literature result.** The equivalence 1⇔2⇔3 is classical; its part 2⇔3 (with $n$ ranging over the natural numbers) is `isUltrametricDist_iff_forall_norm_natCast_le_one` in Mathlib, for normed division rings (not frozen in the upstream library). The last column of the table comes from the frozen theorem [`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification) ([@thm-ch36-ostrowski-padic-ball-and-blind-spot]; Ostrowski 1916, *Acta Math.* 41, 271): a nontrivial absolute value on $\mathbb{Q}$ is equivalent to $\lvert\cdot\rvert_\infty$ or to exactly one $\lvert\cdot\rvert_p$; the former is unbounded on the integers, the latter is at most $1$ there, and equivalence preserves boundedness. The form $\lvert n\rvert=n^\alpha$ of the unbounded row is the classical statement of the same classification. The standard absolute values of both rows satisfy the product formula $\lvert x\rvert_\infty\prod_p\lvert x\rvert_p=1$ ($x\in\mathbb{Q}$, $x\neq0$), the frozen theorem [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula) ([@thm-ch36-crt-and-adelic-product-formula]).
:::

None of the three reduces the number of inputs: real and quaternionic matrix algebras satisfy Clauses I–IV and the positivity condition without a dictionary; both characters of the exchange loop are compatible with flatness; both rows of valuations are given by the frozen classification, and the clauses on comparison do not choose between them.

## E.8.3.6 What Changes in the Ledger {#sec-appe-reduced-ledger}

::: {.remark #rem-appe-reduced-ledger title="The Ledger after E.8 (Supplement to [@rem-appe-master-audit-table])"}
**Supplementary audit (`MODEL` + `manual derivation`; the theorem boxes correspond to frozen theorems).** The table lists only the entries that change. For `H1` the processing mechanism is that of [@rem-appe-master-audit-table].

| Entry | Original treatment | Treatment in E.8 | Basis |
| :--- | :--- | :--- | :--- |
| `H2` positive self-pairing | explicit Layer-1 calibration | follows from Clause IV | [@rem-appe-anchoring-consequences], item 1 |
| `H2` elliptic negative square | `T3` bifurcation | follows from the positivity condition when the similarity readings are real scalars; in that case the positivity condition for the difference part of each comparison is equivalent to boundedness of its integer powers; fails otherwise; when readings are given by states (on a real algebra, states compatible with the involution) and at least one state exists, the positivity condition is equivalent to the absence of nonzero elements of square zero, and this part (which excludes the parabolic branch) cannot be derived from any condition on readings by states | [@rem-appe-involution-positivity], [@rem-appe-bounded-recurrence], [@rem-appe-positivity-invisible-part] |
| `H2` Gram positivity for any number of points | explicit Layer-1 condition | follows from Clause IV plus a positive functional, with the converse; for scalar similarity it follows from Clause IV plus the positivity condition; for scalar similarity with an opposite for every object it is equivalent to every ensemble having a nonnegative averaged similarity with itself, and without opposites this is not enough; an explicit lower bound away from flatness | [@thm-appe-chordal-gain-potential], [@rem-appe-gram-from-flatness], [@rem-appe-ensemble-positivity], [@rem-appe-near-flat-gram-bound] |
| `H3` parallelogram polarization | `T2` condition | the chord distance comes from the GNS inner product of a positive functional, so the input "inner product" becomes "positive reading"; completion remains `T1` | [@rem-appe-gram-from-flatness], item 2 |
| `H4` the orthogonal residual never runs dry | `T2/T4` input | for one time-homogeneous object: the rank of the sampled table equals the number of levels the sampling sees, and the residual never runs dry exactly when infinitely many levels are seen; an orbit with finitely many levels comes back, a ray sagitta that stays above a threshold throughout a finite window bounds the dimension from below, and one that stays away from zero after some time implies that the orbit space is infinite-dimensional; still an input | [@thm-appe-prony-hankel-rank], [@rem-appe-orbit-rank-and-recurrence] |
| `H4` complex carrier $R^2=-I$ | `T3` parity of the carrier dimension | if the center contains $J$ with $J^*=-J$ and $J^2=-\mathbf{1}$, then on every unital $*$-representation the image of $J$ is skew, squares to $-I$ and commutes with everything, and the carrier has even real dimension; the central complex structure itself remains an input (see `H7`) | [@rem-appe-dictionary-independence], item 3 |
| `H4` Ostrowski choice of valuation | `T3` bifurcation | a two-row criterion: an absolute value is bounded on the integers exactly when it satisfies the strong triangle inequality (then every triangle is isosceles); on $\mathbb{Q}$, by the frozen classification, the bounded row is equivalent to some $\lvert\cdot\rvert_p$ and the unbounded row to $\lvert\cdot\rvert_\infty$; same form as the boundedness criterion of E.8.1.1, but with no third row corresponding to the parabolic one, and the bounded row is not the row of the elliptic rotations; which row is chosen remains an input | [@rem-appe-bounded-integers-ultrametric], [@thm-ch36-ostrowski-padic-ball-and-blind-spot] |
| `H5` Born weight | `T2` additivity condition | only for rules that depend on pairwise comparison alone: for $d\ge3$, boundedness, normalization on every orthonormal basis and $f(1)=1$ already give the Born rule; for $d=2$ and continuous rules, full effect additivity can be replaced by "antipodal normalization, $f(1)=1$ and minimal tomographic rank", or, without continuity, by ensemble extensionality (read as Clause I applied to ensembles under `MODEL`); still a `T2` input | [@rem-appe-born-zonal-minimal-rank], [@rem-appe-ensemble-extensionality-born] |
| `H8` Lorentz signature | `T3` bifurcation | uses the same three-way table as `H2` but selects another row for comparisons between observers: in the $1+1$-dimensional observer model (with linearity of coordinate changes as an input), Clause III, antisymmetric velocity readings and one law give a family with one constant $K$ whose sign is the row of the sagitta table; the time-order condition (repeating the same comparison never reverses the order in time) excludes the elliptic row, and "the difference part is not square-zero" then excludes the parabolic row; for a single comparison the positivity condition and the time-order condition cannot both hold; the step from null cone to quadratic form is carried by a frozen proposition | [@rem-appe-frame-change-family], [@rem-appe-time-order-repetition], [@prop-appe-chebyshev-positivity-threshold], [@rem-appe-rotor-boost-coexistence], [@rem-appe-causal-order-linearity], [@prop-null-cone-rigidity] |
| `H8` projective holonomy of Layer 1 | native to Layer 1 | closed form in $\mathcal{Cl}_{3,0}$ as the three-point holonomy of the half comparison; in the Pauli-matrix model the product formula and the return phase are frozen | [@rem-appe-half-comparison-holonomy], [@thm-appe-bloch-triangle-return-phase] |
| `H8` entropy gain under unit-preserving pinching | `T2` condition | the purity drops by exactly the discarded coherence mass $c$; the entropy gain equals a relative entropy, and $\Delta S\ge\frac12\lVert\rho-\mathcal{P}(\rho)\rVert_1^2\ge c$; the exact range of $\Delta S$ at fixed $c$ on a qubit; the known general upper bounds are of the order of $\sqrt{c}$ (the $\ell_1$ bound for rank-one basis pinching is frozen), and no upper bound linear in $c$ exists; "coarse-graining is a unit-preserving pinching" remains an input | [@rem-appe-pinching-exact-identities], [@rem-appe-pinching-entropy-lower], [@prop-appe-l1-coherence-bound], [@rem-appe-pinching-entropy-upper] |
| `H6` two-sided invertibility | `T2` condition | the defect of one-sided fairness is a projection, and the unilateral shift as a comparison value violates Clause III; it can nevertheless arise as the induced evolution in a model satisfying Clauses I–IV and the positivity condition, even when the algebra carries a faithful trace; past completeness or a finite-dimensional state space is each sufficient | [@rem-appe-one-sided-fairness], [@ex-appe-bilateral-shift-model] |
| `H6` strong continuity | `T2` condition | for a time-homogeneous family, equivalent to continuity of the sagitta reading at zero; measurability alone is not enough; in finite dimension this connects with [@thm-calibrated-unitary-group] | [@rem-appe-sagitta-continuity] |
| `H6` generator | `T4` input $H$ | the chord rate tends to $-iH$ and the sagitta rate to $H^2/2$, with explicit errors; finite-step speed bounds; on the space spanned by an orbit, the record of the orbit in both channels determines $H$ up to unitary equivalence, while similarity readings alone or Born weights alone do not (two-level and three-level counterexamples); the choice of orbit and the action of $H$ outside it remain inputs | [@rem-appe-generator-chord-sagitta], [@rem-appe-orbit-record-channels] |
| `H6` Lüders conditioning | `T2` condition | the Lüders state is the state of largest fidelity among those certain to pass the test, and it is unique; the trace norm and the Hilbert–Schmidt distance among trace-one states do not give the Lüders state; the reading used remains an input | [@rem-appe-luders-nearest] |
| `H7` local tomography and exchange statistics | `T2` + `T3` | parameter count $K_d(ab)-K_d(a)K_d(b)=\frac{d(2-d)}4a(a-1)b(b-1)$; the swap is a fair involution with sagitta $0$ and $2$, and Clause I removes labels without choosing a sector; whether a given family of objects needs complex amplitudes, keeping its Gram matrix up to phases: when comparable triangles fill every cycle, exactly when some three-point Bargmann product is not real (frozen when one object is non-orthogonal to every other one), and on a qubit exactly when the Bloch vectors do not lie in one plane through the center; in finite direct sums of $M_n(\mathbb{R})$, $M_n(\mathbb{C})$ and $M_n(\mathbb{H})$ a central complex structure is equivalent to a covariant generator–reading dictionary (a real-linear bijection from difference parts to similarity parts that commutes with changes of frame by fair elements), which does not follow from Clauses I–IV and the positivity condition; for $d\ge3$ the exchange loop admits only the two characters $\pm1$, flat comparison does not choose between them, and the Schwinger transported basis writes the sign as a product of $4S$ right-angle rotors, while constructions of the same kind also give the opposite sign; the central complex structure and the choice of sector remain inputs | [@rem-appe-tomography-count], [@rem-appe-swap-sagitta], [@rem-appe-real-realizability-return-phase], [@prop-appe-real-rephasing-star], [@rem-appe-generator-reading-dictionary], [@rem-appe-dictionary-independence], [@rem-appe-exchange-configuration-space], [@ex-appe-berry-robbins-transport], [@rem-appe-spin-statistics-inputs] |
| `H9` continuum path integral and stationary action | `T4` input | for a quadratic action the $N$-step sliced product equals the contribution of the stationary path exactly at every finite $N$ (prefactor and Maslov phase included); for the oscillator the error is an explicit $O(N^{-2})$, and the time step has to lie in the elliptic row of the sagitta table; for general actions only explicit one-dimensional cancellation bounds remain; at fixed $\hbar$ the continuum limit at the level of operators is given by the Trotter–Nelson theorem and needs no path measure (no such complex measure of bounded variation exists); convergence of time slicing and stationary phase in large dimension for non-quadratic potentials are literature results; interacting field theory remains `OPEN` | [@rem-appe-oscillator-time-slicing], [@ex-appe-time-step-trichotomy], [@rem-appe-oscillatory-cancellation-bounds], [@rem-appe-path-integral-remaining-inputs] |

The two new inputs are Clause IV ([@def-appe-third-point-redundancy]) and the positivity condition ([@rem-appe-involution-positivity]); when readings are given by states and at least one state exists, the latter is equivalent to the absence of nonzero elements of square zero, and this part is invisible to every reading by a state ([@rem-appe-positivity-invisible-part]); when the similarity readings are not real scalars, positive semidefiniteness of the table needs a positive functional in addition. Clause IV need not hold for all triples: it is enough that comparable triangles fill every cycle, and over all groups this is exactly the condition that is enough ([@rem-appe-triangle-simple-connectivity]). Clause IV excludes every holonomy of full comparisons, so it describes the flat skeleton of Layer 1. A Layer-2 connection with genuine curvature has to give it up, and then [@thm-appe-chordal-gain-potential-stability], [@thm-appe-chordal-uniform-gain-potential] and [@rem-appe-near-flat-gram-bound] state the price of the deviation.

E.8.2.2 and E.8.2.3 add no clause: each of the invertibility and continuity items of `H6` gets a sufficient condition stated in terms of objects and readings (past completeness; continuity of the sagitta reading at zero), conditioning is recast as an optimization principle, and `H7` gets a one-line counting formula; these conditions remain inputs.

E.8.2.4 and E.8.3.1 add no clause either. E.8.2.4 applies comparison to ensembles: to obtain a positive semidefinite table, the positivity condition can be replaced by "every object has an opposite, and every ensemble has a nonnegative averaged similarity with itself", which still allows only parabolic pairs invisible to every similarity reading; the qubit Born rule follows from ensemble extensionality. E.8.3.1 reads the orbit of one object: `H4` gets a form in terms of readings that can be checked in finitely many steps, and on the orbit space the $H$ of `H6` can be read from the record in both channels.

E.8.3.2–E.8.3.4 add two inputs for comparisons between observers: the time-order condition, and "the difference part is not square-zero" (the special case, for difference parts, of the condition in [@rem-appe-positivity-invisible-part]); in $1+1$ dimensions the linearity of coordinate changes also remains an input. For a single comparison the positivity condition and the time-order condition cannot both hold, and this separates `H2` from `H8`: they select different rows of one table for different comparisons. E.8.3.3 does not change the input "coarse-graining is a unit-preserving pinching"; it quantifies its consequences. E.8.3.4 narrows the path-integral item of `H9`: quadratic actions are exact at a finite number of steps, general actions have only asymptotic statements, and the existence of the continuum limit at the level of operators is a literature result.

E.8.3.5 adds no clause. The central complex structure of `H7` becomes a covariant dictionary condition: every difference part is paired with a similarity reading, linearly, invertibly and independently of the frame; in finite direct sums of $M_n(\mathbb{R})$, $M_n(\mathbb{C})$ and $M_n(\mathbb{H})$ it is equivalent to a central complex structure and gives the complex carrier of `H4`, and real and quaternionic matrix algebras satisfy Clauses I–IV and the positivity condition without it. The exchange sector becomes a character of the fundamental group of configuration space, which for $d\ge3$ is $\pm1$. The choice of valuation in `H4` becomes "are integer multiples bounded". All three remain inputs.
:::

This section does not bring the number of inputs down to zero. It changes their shape: when the similarity readings are real scalars, the three items of `H2` were three geometric statements about self-pairing, bivectors and Gram matrices, and they are now replaced by two conditions that can be stated with comparison alone. One says that a third party does not change the ratio of two. The other says that the round trip of a difference leaves a positive trace.
