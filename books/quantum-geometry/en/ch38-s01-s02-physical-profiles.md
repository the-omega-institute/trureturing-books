# 36.2.2 Physical record profiles and fidelity minimizers {#sec-ch38-s01-s02-physical-profiles}


Start with a hand calculation at depth one in the Hann sequential spatial circuit above. The two addresses are $a_0=(\mathrm{false},())$ and $a_1=(\mathrm{true},())$, the input bus is $\mathrm{false}$, and each address has amplitude $1/\sqrt2$; the classical memory $D$ is arbitrary and fixed. After the complete load, the sole router has label $0$ or $1$, respectively. For $0\le q\le1$, use an orthonormal basis $e_*,e_W,e_0,e_1$ of a four-dimensional environment to store one local record:

$$
\begin{aligned}
r_0&=\sqrt q\,e_*+\sqrt{1-q}\,e_0,\\
r_1&=\sqrt q\,e_*+\sqrt{1-q}\,e_1.
\end{aligned}
$$

Each record has norm $1$, and their cross overlap is $q$. Continuing through the original ideal gates gives the two orthogonal output basis vectors $\lvert o_i\rangle=\lvert\operatorname{clean}(1,a_i,D(a_i))\rangle$: since the input bus is false, its XOR with $D(a_i)$ is simply $D(a_i)$. The joint system–environment vector is

$$
\frac{\lvert o_0\rangle\otimes r_0
+\lvert o_1\rangle\otimes r_1}{\sqrt2}.
$$

Ignoring the environment means summing the record outer product attached to each system matrix entry over the environment basis. In the output basis $(o_0,o_1)$, the record overlap matrix $K_{1,q}$, the reduced state, and the coordinates of the ideal vector are

$$
\begin{aligned}
K_{1,q}&=\begin{pmatrix}1&q\\q&1\end{pmatrix},\\
\rho_{\mathrm{out}}&=\frac12 K_{1,q},\\
u&=\frac1{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}.
\end{aligned}
$$

The **squared fidelity** with this ideal pure state is $F=u^\dagger\rho_{\mathrm{out}}u$, so

$$
\begin{aligned}
F&=\frac{1+q+q+1}{4}\\
 &=\frac{1+q}{2}.
\end{aligned}
$$

At $q=1/2$, this gives $F=3/4$. The quantity calculated here is the squared fidelity itself; no further square root is taken.

Fix the noise scope precisely. After the actual sequential load `load n n` of [@thm-ch38-spatial-qutrit-qram-correctness], apply the same local record coupling once, independently at every actual internal router. Then perform the original bus exchange, spatial transport, fixed classical leaf readout, and inverse of the complete forward circuit. All gates, address slots, the external bus, and spatial rails remain ideal. The preceding ideal reversible Boolean network, the ideal Hann spatial qutrit circuit, and this circuit with a single router hold are three separately specified finite objects. The literature path illustration above retains the interpretation given in [@rem-ch38-qram-page-wootters-literature].

To specify the complete output, retain the previously defined $A_n$, $Q=\{W,0,1\}$, and $S_n=\operatorname{State}(n)$. Let $n\in\mathbb N$, including $0$, $N=2^n$, $q\in[0,1]$, and let $D:A_n\to\operatorname{Bool}$ be any fixed classical memory. The notation below abbreviates objects in `HannRouterDephasing`; `load`, `clean`, `initialized`, and the remaining circuit operations retain their `HannSpatialQram` definitions above.

Each router's environment coordinates are $\{*\}\sqcup Q$: `none` and `some s` in `Option Qutrit`. For any label $s\in Q$, write

$$
r_s=\sqrt q\,e_*+\sqrt{1-q}\,e_s.
$$

Its coordinate $r_s(e)$ is exactly `localRecord q s e`. For a complex $Q\times Q$ matrix $X$, let $\operatorname{diag}_Q(X)$ retain only the diagonal entries in the $W,0,1$ basis, and let $\mathcal E_q(X)$ be the local marginal matrix obtained by multiplying each $X_{st}$ by $\sum_e r_s(e)\overline{r_t(e)}$. The basis index set $\mathcal E_n$ for all independent environments is `Environment n`:

$$
\begin{aligned}
\mathcal E_0&=\operatorname{Unit},\\
\mathcal E_{n+1}&=(\{*\}\sqcup Q)
\times\mathcal E_n\times\mathcal E_n.
\end{aligned}
$$

Let $I_n$ be the internal router positions of `Tree n`: empty at depth zero, and consisting at each branch of the root router and the two copies of the child positions. Incident and output rails do not belong to $I_n$. For any tree configuration $t$, let $t_v$ be the router label at position $v$. The product record and its overlap in density-matrix orientation are

$$
\begin{aligned}
R_t(e)&=\prod_{v\in I_n}r_{t_v}(e_v),\\
\Omega_q(t,u)&=\sum_{e\in\mathcal E_n}
 R_t(e)\overline{R_u(e)}.
\end{aligned}
$$

These are `environmentRecord` and `recordOverlap`, respectively; the depth-zero product is $1$. Write $m(t,u)=\#\{v\in I_n:t_v\ne u_v\}$ for `routerMismatch`, which counts only internal router coordinates.

For $s\in S_n$, let $T(s)=s.2.2$ be its spatial-tree projection. Put $L_n=\operatorname{load}(n,n)$ and $P_{n,D}=\operatorname{postLoad}(n,D)$. The latter performs `exchange`, `transport`, `readLeaves n D`, and `(forward n).symm`, in that order, preserving all uninvolved coordinates of the full system at each step. Abbreviate the actual loaded trees and the inverse images by

$$
\begin{aligned}
\tau_{a,b}&=T\bigl(L_n(\operatorname{clean}(n,a,b))\bigr),\\
v_s&=P_{n,D}^{-1}(s),\\
w_s&=L_n^{-1}(v_s).
\end{aligned}
$$

For any joint complex amplitudes $\psi:A_n\times\operatorname{Bool}\to\mathbb C$, let $\alpha_\psi=\operatorname{initialized}(n,\psi)$. Define the joint amplitudes $J_\psi$ and the system matrix $\rho_{\mathrm{out}}$ on the complete physical basis:

$$
\begin{aligned}
J_\psi(s,e)&=\alpha_\psi(w_s)R_{T(v_s)}(e),\\
\rho_{\mathrm{out}}(s,t)
 &=\Omega_q\bigl(T(v_s),T(v_t)\bigr)\\
 &\quad\cdot\alpha_\psi(w_s)
 \overline{\alpha_\psi(w_t)}.
\end{aligned}
$$

These are exactly `jointOutput n q D ψ` and `noisyOutput n q D ψ`. The records attach to the actual router configuration after loading and before the ideal continuation. The next theorem gives their environment partial-trace relationship.

The function `addressWord n a` writes an address as a length-$n$ Boolean word in the actual loading order, with the first bit first: the empty address gives the empty word, and $(c,a)$ prepends $c$ to the tail address word. Let $\ell(a,a')$ be the length of their longest common prefix, namely the length of `BinaryWordGeometry.lcp`. Define

$$
\begin{aligned}
d_n(a,a')&=\begin{cases}
0,&a=a',\\
2(n-\ell(a,a'))-1,&a\ne a',
\end{cases}\\
K_{n,q}(a,a')&=\begin{cases}
1,&a=a',\\
q^{2(n-\ell(a,a'))-1},&a\ne a'.
\end{cases}
\end{aligned}
$$

Here $K_{n,q}$ is the real-valued `kernel`. Distinct addresses have $\ell<n$, so their exponent is a positive integer. Equal addresses have the separately specified value $1$, including at $q=0$ and at the unique empty address.

Write $\mathcal C_n=\{\operatorname{clean}(n,a,b):a\in A_n,\ b\in\operatorname{Bool}\}$. Label the ideal output by the input address and bus:

$$
\begin{aligned}
o_{a,b}&=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a)),\\
\lvert\phi_\psi\rangle
 &=\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
 \psi(a,b)\lvert o_{a,b}\rangle.
\end{aligned}
$$

Here $o_{a,b}$ is `outputBasis n D (a,b)`, and $\phi_\psi:S_n\to\mathbb C$ is the full coordinate vector `idealOutput n D ψ`. Define the address weights, the real quadratic form, and the squared fidelity by

$$
\begin{aligned}
p_a&=\sum_{b\in\operatorname{Bool}}|\psi(a,b)|^2,\\
E_{n,q}(p)&=\sum_{a\in A_n}\sum_{a'\in A_n}
 p_a p_{a'}K_{n,q}(a,a'),\\
F_{n,q,D}(\psi)
 &=\langle\phi_\psi\rvert\rho_{\mathrm{out}}
 \lvert\phi_\psi\rangle\\
 &=\sum_{s,t\in S_n}\overline{\phi_\psi(s)}
 \rho_{\mathrm{out}}(s,t)\phi_\psi(t).
\end{aligned}
$$

These are `addressProbability`, `addressEnergy`, and `squaredFidelity`, respectively; $|z|^2$ is `Complex.normSq z`. The condition `Normalized n ψ` means

$$
\sum_{a\in A_n}\sum_{b\in\operatorname{Bool}}
 |\psi(a,b)|^2=1.
$$

No factorization of $\psi(a,b)$ into separate address and bus amplitudes is required. Finally, write `minimumFidelity n q` as

$$
\begin{aligned}
f_n(q)&=\frac{1+\displaystyle\sum_{j=0}^{n-1}
 2^j q^{2j+1}}{2^n}\\
 &=2^{-n}\left(1+\sum_{j=1}^{n}
 2^{j-1}q^{2j-1}\right),
\end{aligned}
$$

where both sums are empty at $n=0$. Write $h_n$ for `uniformInput n`: $h_n(a,b)=1/\sqrt{2^n}$ when $b=\mathrm{false}$ and $0$ when $b=\mathrm{true}$.

::: {.theorem #thm-ch38-single-hold-router-dephasing title="A Single Router Hold: Dephasing, Complete Output, and Sharp Squared Fidelity" lean="D5/S3/Quantum/Routing/HannRouterDephasing.result"}
For every $n\in\mathbb N$, $q\in[0,1]$, and fixed classical memory $D:A_n\to\operatorname{Bool}$, use the actual load, independent local records, and original ideal continuation specified above. The following hold.

1. For any complex $Q\times Q$ matrix $X$, the local environment partial trace gives the channel

   $$
   \mathcal E_q(X)=qX+(1-q)\operatorname{diag}_Q(X),
   $$

   where $\operatorname{diag}_Q$ retains only the diagonal entries in the $W,0,1$ basis. Entrywise, for every $s,t\in Q$,

   $$
   \begin{aligned}
   &\left(\sum_{e\in\{*\}\sqcup Q}
   r_s(e)\overline{r_t(e)}\right)X_{st}\\
   &\quad=qX_{st}+(1-q)
   \begin{cases}X_{st},&s=t,\\0,&s\ne t.\end{cases}
   \end{aligned}
   $$

   For every $t\in\operatorname{Tree}(n)$, $\Omega_q(t,t)=1$.

2. For all $a,a'\in A_n$ and $b,b'\in\operatorname{Bool}$, the actual loaded trees satisfy

   $$
   \begin{aligned}
   m(\tau_{a,b},\tau_{a',b'})&=d_n(a,a'),\\
   \Omega_q(\tau_{a,b},\tau_{a',b'})&=K_{n,q}(a,a').
   \end{aligned}
   $$

   The right sides are independent of both bus labels; the real number $K_{n,q}$ is naturally embedded in the complex equality.

3. For arbitrary complex amplitudes $\psi$, without requiring normalization, the complete environment partial trace satisfies, for all $s,t\in S_n$,

   $$
   \sum_{e\in\mathcal E_n}
   J_\psi(s,e)\overline{J_\psi(t,e)}
   =\rho_{\mathrm{out}}(s,t).
   $$

   For all $a,a',b,b'$, every clean output matrix entry is

   $$
   \begin{aligned}
   &\rho_{\mathrm{out}}(o_{a,b},o_{a',b'})\\
   &\quad=\psi(a,b)\overline{\psi(a',b')}
   K_{n,q}(a,a').
   \end{aligned}
   $$

   If $s\notin\mathcal C_n$ or $t\notin\mathcal C_n$, then $\rho_{\mathrm{out}}(s,t)=0$. Thus the matrix is supported on the span of the clean output basis vectors.

4. If $\psi$ is normalized, the complete ideal output vector is normalized too, and the squared fidelity is real and satisfies

   $$
   \begin{aligned}
   \sum_{s\in S_n}|\phi_\psi(s)|^2&=1,\\
   F_{n,q,D}(\psi)&=E_{n,q}(p)\\
   &=\sum_{a,a'\in A_n}p_a p_{a'}K_{n,q}(a,a')\\
   &\ge f_n(q).
   \end{aligned}
   $$

5. The input $h_n$ is normalized, and for every address $a$,

   $$
   \begin{aligned}
   h_n(a,\mathrm{false})&=2^{-n/2},\\
   h_n(a,\mathrm{true})&=0,\\
   F_{n,q,D}(h_n)&=f_n(q),\\
   f_0(q)&=1.
   \end{aligned}
   $$

   The amplitude $2^{-n/2}$ is positive and real. This input attains the bound for every $n,q,D$ above.
:::

::: proof
First use correctness of the actual `load n n` to identify its tree projection with `programmed n a n`. Equal addresses give equal routers throughout. If distinct addresses share a prefix of length $\ell$, their first $\ell$ routers agree. At the first differing bit, one router stores $0$ and the other stores $1$, contributing one mismatch. Beyond that point the paths enter disjoint subtrees. Each tail contains $n-\ell-1$ occupied routers, while the other configuration has the waiting label $W$ at those positions. The total mismatch count is therefore

$$
1+2(n-\ell-1)=2(n-\ell)-1.
$$

The bus remains in its separate external coordinate during loading, so neither $b$ nor $b'$ enters the count. A local record overlap is $1$ for equal labels and $q$ for unequal labels. Independence multiplies these overlaps, giving $K_{n,q}$ on actual loaded trees and self-overlap $1$ on every tree. The local matrix-entry identity also gives $qX+(1-q)\operatorname{diag}_Q(X)$ directly.

Keep the environment records fixed and apply the original $P_{n,D}$ to the system alone. The ideal query sends each clean input to $o_{a,b}$. Pulling amplitudes back along the inverse permutations on the complete system basis gives precisely the definitions of $J_\psi$ and $\rho_{\mathrm{out}}$. Summing over the environment coordinates proves the partial-trace identity. Initialized amplitudes vanish outside the clean input basis, and the ideal query maps that basis bijectively onto the clean output basis. This determines every clean entry and every zero entry outside its span.

Substituting the ideal vector into the complete system double sum gives $|\psi(a,b)|^2|\psi(a',b')|^2K_{n,q}(a,a')$ for each pair of input labels. Summing independently over both bus labels leaves $p_a p_{a'}$, yielding the exact real quadratic form. No independence of address and bus amplitudes is assumed.

For the bound, induct on the binary-tree depth. Split real address weights at depth $n+1$ by their first bit into $p_0,p_1$, with masses $s=\sum_a p_0(a)$ and $t=\sum_a p_1(a)$, and put $c=q^{2n+1}$. Within a branch the kernel is the depth-$n$ kernel; between branches it is the constant $c$. Hence

$$
\begin{aligned}
E_{n+1,q}(p)&=E_{n,q}(p_0)+E_{n,q}(p_1)\\
 &\quad+2cst,\\
f_{n+1}(q)&=\frac{f_n(q)+c}{2}.
\end{aligned}
$$

The induction uses the homogeneous bound $E_{n,q}(p_i)\ge f_n(q)(\sum_a p_i(a))^2$ for arbitrary total mass. Since $0\le q\le1$, the same recurrence gives $f_n(q)\ge c$. The sum of the branch bounds exceeds the required homogeneous bound by the nonnegative remainder

$$
\begin{aligned}
&f_n(q)(s^2+t^2)+2cst\\
&\quad-f_{n+1}(q)(s+t)^2\\
&=\frac{f_n(q)-c}{2}(s-t)^2\ge0.
\end{aligned}
$$

At depth zero the quadratic form is the square of the total mass; normalization sets that mass to $1$ and gives the stated bound. Finally, every kernel row has the same sum:

$$
\begin{aligned}
\sum_{a'\in A_n}K_{n,q}(a,a')
 &=1+\sum_{j=0}^{n-1}2^j q^{2j+1}\\
 &=2^n f_n(q).
\end{aligned}
$$

The uniform input $h_n$ has probability $2^{-n}$ at each of the $2^n$ addresses, with total probability $1$. The constant row sum therefore gives $F_{n,q,D}(h_n)=f_n(q)$. This supplies an attaining input and makes the bound sharp. The full proof is checked by the Lean kernel.
:::

Substitution into the finite sum gives the closed endpoints $f_n(0)=2^{-n}$ and $f_n(1)=1$. For any normalized input, $q=0$ removes only terms between distinct addresses, giving $F=\sum_a p_a^2$, with uniform address weights attaining $2^{-n}$. At $q=1$ every kernel entry is $1$, so $F=(\sum_a p_a)^2=1$. At $n=0$ there are no routers; the empty product and empty sum give $F=1$ for every normalized input and all $q\in[0,1]$. These conclusions concern the single independent router hold and otherwise ideal gates specified in [@thm-ch38-single-hold-router-dephasing]. This adds a channel result for the finite Hann circuit above. The ideal Boolean network, ideal Hann query, and external literature retain their stated scopes. The result does not cover gate noise, correlated or repeated holds, or hardware fault tolerance, and does not prove the infinite address ontology or the observer-pointer `MODEL` consequences below.

**Heterogeneous routers: which addresses does the environment distinguish?** The homogeneous hold above assigns the same $q$ to every router. We now vary just this parameter: each actual internal router $v$ has its own $q(v)\in[0,1]$, with one independent record after complete sequential loading, followed by the original ideal continuation. At $q(v)=1$, the local environment retains only its common coordinate and cannot distinguish the router labels. At $q(v)=0$, it distinguishes $W,0,1$ completely. The number of addresses can therefore exceed the number of distinct environment records. To describe this degeneracy, we first identify the physical coordinates being recorded, then group addresses with identical visible labels.

::: {.definition #def-ch38-profile-routers title="Actual internal routers and loaded labels" lean="D5/S3/Quantum/Routing/HannRouterProfiles.Router D5/S3/Quantum/Routing/HannRouterProfiles.routerLabel D5/S3/Quantum/Routing/HannRouterProfiles.snoc D5/S3/Quantum/Routing/HannRouterProfiles.deepest D5/S3/Quantum/Routing/HannRouterProfiles.loadedLabel"}
Retain the head-first addresses $A_0=\{()\}$, $A_{m+1}=\operatorname{Bool}\times A_m$, together with $Q=\{W,0,1\}$, the spatial trees, and the complete system basis space $S_n$. The following objects belong to `HannRouterProfiles`; circuit operations still come from `HannSpatialQram`.

Explicitly, $\operatorname{Tree}(m)=Q\times\operatorname{Interior}(m)$, $\operatorname{Interior}(0)=\operatorname{Unit}$, $\operatorname{Interior}(m+1)=Q\times\operatorname{Tree}(m)\times\operatorname{Tree}(m)$, and $S_n=(\operatorname{Fin}(n)\to Q)\times Q\times\operatorname{Tree}(n)$. The first tree coordinate is the incident mode; the first interior coordinate is the router.

The internal router positions are

$$
I_0=\varnothing,\qquad
I_{m+1}=\{\mathrm{root}\}\sqcup(\operatorname{Bool}\times I_m).
$$

This is `Router n`: the root is `none`, and $(c,v)$ is `some (c,v)`, with false selecting the left subtree and true the right. `routerLabel n t v`, written $t_v$, reads only the router field of $t$. Incident modes and output rails are excluded from $I_n$.

Let $L_n=\operatorname{load}(n,n)$, and let $T(s)$ project a system configuration $s$ onto its tree. For $a\in A_n$ and any external qutrit bus label $\beta\in Q$, define

$$
\begin{aligned}
\tau_{a,\beta}&=T\bigl(L_n(\operatorname{loading}(n,a,\beta,0))\bigr),\\
\lambda_{a,\beta}(v)&=(\tau_{a,\beta})_v.
\end{aligned}
$$

The second line is `loadedLabel n a β v`. `snoc m u c` appends a final bit $c$ to $u\in A_m$. The deepest router reached along prefix $u$ is $d_m(u)=\operatorname{deepest}(m,u)\in I_{m+1}$, located recursively in the head-first address order.
:::

Actual loading correctness gives $\tau_{a,\beta}=\operatorname{programmed}(n,a,n)$, so $\lambda_{a,\beta}$ is independent of $\beta$; we also write it as $\lambda_a$. These are the tree coordinates after loading. Routers off the programmed path retain their literal $W$ labels and participate in the environment record as well.

::: {.definition #def-ch38-profile-records title="Heterogeneous local records and the physical tensor environment" lean="D5/S3/Quantum/Routing/HannRouterProfiles.Environment D5/S3/Quantum/Routing/HannRouterProfiles.treeRecord D5/S3/Quantum/Routing/HannRouterProfiles.record"}
Given $q:I_n\to[0,1]$, attach to each position $v$ an environment with orthonormal basis $e_*,e_W,e_0,e_1$, and local record

$$
r_{v,s}=\sqrt{q(v)}\,e_*+\sqrt{1-q(v)}\,e_s,
\qquad s\in Q.
$$

This is `HannRouterDephasing.localRecord (q v) s`. The environment basis indices form $\mathcal E_n=(\{*\}\sqcup Q)^{I_n}$, the `Environment n` of this section. For any $t\in\operatorname{Tree}(n)$, define

$$
\begin{aligned}
\mathcal R_t(e)&=\prod_{v\in I_n}r_{v,t_v}(e_v),\\
R_a(e)&=\prod_{v\in I_n}r_{v,\lambda_{a,W}(v)}(e_v).
\end{aligned}
$$

These are `treeRecord n q t` and `record n q a`, respectively. At $n=0$, the environment has a single basis index, and both empty products equal $1$.

The local coupling sends router basis vector $\lvert s\rangle$ with a blank environment to $\lvert s\rangle\otimes r_{v,s}$. Independent couplings at every position send a tree basis vector to $\lvert t\rangle\otimes\mathcal R_t$, preserving the other system coordinates.
:::

::: {.definition #def-ch38-active-profiles title="Realized active profiles and class records" lean="D5/S3/Quantum/Routing/HannRouterProfiles.SameProfile D5/S3/Quantum/Routing/HannRouterProfiles.Separates D5/S3/Quantum/Routing/HannRouterProfiles.Profile D5/S3/Quantum/Routing/HannRouterProfiles.profile D5/S3/Quantum/Routing/HannRouterProfiles.classRecord"}
A position $v$ is active exactly when $q(v)<1$. For any real function $q:I_n\to\mathbb R$, `SameProfile n q a a' β β'` means

$$
\forall v\in I_n,\quad q(v)<1\ \Longrightarrow\
\lambda_{a,\beta}(v)=\lambda_{a',\beta'}(v).
$$

`Separates n q` means that this condition implies $a=a'$ for every $a,a'\in A_n$ and $\beta,\beta'\in Q$. Write $\pi(a)$ for the restriction of $\lambda_{a,W}$ to active positions, and $C_{n,q}=\pi(A_n)$ for its actual image. These are `profile` and `Profile`. Label assignments realized by no address are absent from $C_{n,q}$.

In the physical range $q(v)\in[0,1]$, the class record $R_c$ is $R_a$ for any representative satisfying $\pi(a)=c$; this is `classRecord`. Members of one class agree at active positions. At every remaining position $q(v)=1$, the record is always $e_*$. Thus the definition is independent of the representative.
:::

::: {.theorem #thm-ch38-profile-separation title="Exact separation criterion at the deepest physical routers" lean="D5/S3/Quantum/Routing/HannRouterProfiles.profile_separation_iff"}
For every $m\in\mathbb N$ and every real function $q:I_{m+1}\to\mathbb R$, with no interval restriction,

$$
\begin{aligned}
&\bigl[\forall a,a'\in A_{m+1},\ \forall\beta,\beta'\in Q,\\
&\qquad\operatorname{SameProfile}(m+1,q,a,a',\beta,\beta')
\ \Longrightarrow\ a=a'\bigr]\\
&\qquad\Longleftrightarrow\quad
\forall u\in A_m,\ q(d_m(u))<1.
\end{aligned}
$$
:::

::: {.proof #pf-ch38-profile-separation}
Write an arbitrary address as $\operatorname{snoc}(m,u,c)$. At the deepest positions, the actual loaded tree satisfies

$$
\lambda_{\operatorname{snoc}(m,u,c),\beta}(d_m(i))
=\begin{cases}\operatorname{encode}(c),&i=u,\\W,&i\ne u.\end{cases}
$$

The two sibling addresses with prefix $u$ agree at every internal router other than $d_m(u)$. If this deepest position is inactive, those distinct addresses have the same active profile, proving necessity. Conversely, suppose every deepest position is active. Observe $d_m(u)$ under the first address prefix: different prefixes produce an encoded label versus $W$, while equal prefixes leave the encoded labels to distinguish the last bits. Loading labels do not depend on the external bus, so the argument allows arbitrary, possibly different, bus labels. This separation criterion is combinatorial; the square roots and normalization of physical records still use the closed interval assumption. The full proof is checked by the Lean kernel.
:::

::: {.definition #def-ch38-profile-gram-energy title="Complex Gram matrix, class coefficient sums, and energies" lean="D5/S3/Quantum/Routing/HannRouterProfiles.gram D5/S3/Quantum/Routing/HannRouterProfiles.classSum D5/S3/Quantum/Routing/HannRouterProfiles.addressEnergy D5/S3/Quantum/Routing/HannRouterProfiles.classEnergy"}
In the physical range above, define the complex Gram matrix in density-matrix orientation by

$$
G(a,a')=\sum_{e\in\mathcal E_n}R_a(e)\overline{R_{a'}(e)}.
$$

This is `gram n q`. For arbitrary complex coefficients $z:A_n\to\mathbb C$, the class coefficient sums are

$$
(\Sigma_qz)_c=\sum_{a:\pi(a)=c}z_a,
$$

the function `classSum`. The same finite sum also applies to real coefficients. For arbitrary real vectors $p:A_n\to\mathbb R$ and $x:C_{n,q}\to\mathbb R$, define

$$
\begin{aligned}
E_q(p)&=\sum_{a,a'\in A_n}p_ap_{a'}\operatorname{Re}G(a,a'),\\
H_q(x)&=\sum_{e\in\mathcal E_n}
\left|\sum_{c\in C_{n,q}}x_cR_c(e)\right|^2.
\end{aligned}
$$

These are `addressEnergy` and `classEnergy`. Here $|z|^2$ means `Complex.normSq z`. The energy definitions themselves impose neither nonnegativity nor a total weight of $1$.
:::

::: {.definition #def-ch38-profile-laws title="Probability simplexes, class masses, and deepest activity" lean="D5/S3/Quantum/Routing/HannRouterProfiles.AddressDistribution D5/S3/Quantum/Routing/HannRouterProfiles.ClassDistribution D5/S3/Quantum/Routing/HannRouterProfiles.classMass D5/S3/Quantum/Routing/HannRouterProfiles.inputDistribution D5/S3/Quantum/Routing/HannRouterProfiles.distributionInput D5/S3/Quantum/Routing/HannRouterProfiles.DeepestActive"}
Let $\Delta(A_n)$ and $\Delta(C_{n,q})$ denote the probability simplexes: nonnegative weights summing to $1$. They are `AddressDistribution` and `ClassDistribution`. The class-mass map `classMass` is

$$
(\pi_*p)_c=\sum_{a:\pi(a)=c}p_a.
$$

For arbitrary joint complex amplitudes $\psi:A_n\times\operatorname{Bool}\to\mathbb C$, let $p^\psi_a=\sum_b|\psi(a,b)|^2$. The input is normalized when $\sum_{a,b}|\psi(a,b)|^2=1$; then $p^\psi\in\Delta(A_n)$ is `inputDistribution`. No product form between address and bus is required. For $p\in\Delta(A_n)$, `distributionInput` is

$$
\psi_p(a,b)=\begin{cases}\sqrt{p_a},&b=\mathrm{false},\\0,&b=\mathrm{true},\end{cases}
$$

with the square root embedded in $\mathbb C$ as a nonnegative real number.

`DeepestActive n q` is true at $n=0$. At $n=m+1$, it means $\forall u\in A_m,\ q(d_m(u))<1$.
:::

::: {.definition #def-ch38-profile-output title="Complete output and squared fidelity of the actual hold" lean="D5/S3/Quantum/Routing/HannRouterProfiles.jointOutput D5/S3/Quantum/Routing/HannRouterProfiles.noisyOutput D5/S3/Quantum/Routing/HannRouterProfiles.squaredFidelity"}
Fix any classical memory $D:A_n\to\operatorname{Bool}$. Retain $P_{n,D}=\operatorname{postLoad}(n,D)$, which performs the original bus exchange, spatial transport, leaf readout, and inverse of the complete forward circuit, in that order. It does not act on the environment. For $s\in S_n$, write

$$
v_s=P_{n,D}^{-1}(s),\qquad w_s=L_n^{-1}(v_s),\qquad
\alpha_\psi=\operatorname{initialized}(n,\psi).
$$

Define the heterogeneous joint amplitudes, complete system density matrix, and squared fidelity by

$$
\begin{aligned}
J^q_\psi(s,e)&=\alpha_\psi(w_s)\mathcal R_{T(v_s)}(e),\\
\rho^q_\psi(s,t)&=\sum_{e\in\mathcal E_n}
J^q_\psi(s,e)\overline{J^q_\psi(t,e)},\\
F^q_D(\psi)&=\sum_{s,t\in S_n}
\overline{\phi_\psi(s)}\rho^q_\psi(s,t)\phi_\psi(t).
\end{aligned}
$$

Here $o_{a,b}=\operatorname{clean}(n,a,b\mathbin{\oplus}D(a))$, and $\phi_\psi=\sum_{a,b}\psi(a,b)\lvert o_{a,b}\rangle$ is the original complete ideal output. These three formulas are this section's `jointOutput`, `noisyOutput`, and `squaredFidelity`. The sums range over the entire physical system $S_n$; only the independent router environments are traced out. The same finite sums define these quantities for unnormalized amplitudes, while their interpretation as state fidelity applies to normalized inputs.

Here $\operatorname{clean}(n,a,b)=\operatorname{loading}(n,a,\operatorname{encode}(b),0)$: the address slots hold the encoded address, the external bus holds the encoded Boolean bit, and the tree is vacuum. Initialization satisfies $\alpha_\psi(\operatorname{clean}(n,a,b))=\psi(a,b)$ and vanishes at every other basis configuration.
:::

::: {.theorem #thm-ch38-physical-profile-event title="Heterogeneous physical profiles, complex coefficient kernel, and all fidelity minimizers" lean="D5/S3/Quantum/Routing/HannRouterProfiles.physical_profile_event"}
For every $n\in\mathbb N$ and every real router function $q:I_n\to\mathbb R$, assume $0\le q(v)\le1$ at every $v\in I_n$. Fix any classical memory $D:A_n\to\operatorname{Bool}$. With the actual loading, one independent record, and original ideal continuation defined above, all of the following hold.

1. **(P1) Actual loaded records for every bus.** For all $a\in A_n$ and $\beta\in Q$, $\mathcal R_{\tau_{a,\beta}}=R_a$, as functions of the entire environment index.
2. **(P2) Record normalization for every tree.** For all $t\in\operatorname{Tree}(n)$, $\sum_e|\mathcal R_t(e)|^2=1$.
3. **(P3) Classes equal exactly when visible labels agree.** For all $a,a'\in A_n$ and $\beta,\beta'\in Q$,

   $$
   \pi(a)=\pi(a')\ \Longleftrightarrow\
   \forall v\in I_n,\ q(v)<1\Rightarrow
   \lambda_{a,\beta}(v)=\lambda_{a',\beta'}(v).
   $$

4. **(P4) Complex linear independence of class records.** $\{R_c:c\in C_{n,q}\}$ is linearly independent over $\mathbb C$.
5. **(P5) Exact rank.** $\operatorname{rank}_{\mathbb C}G=|C_{n,q}|$.
6. **(P6) Complete kernel for arbitrary complex coefficients.** For every $z:A_n\to\mathbb C$,

   $$
   Gz=0\ \Longleftrightarrow\
   \forall c\in C_{n,q},\ \sum_{a:\pi(a)=c}z_a=0.
   $$

7. **(P7) Full-rank criterion.** $\operatorname{rank}_{\mathbb C}G=2^n$ if and only if `DeepestActive n q`.
8. **(P8) Rank at depth zero.** If $n=0$, then $\operatorname{rank}_{\mathbb C}G=1$.
9. **(P9) Factorization through class masses.** For every $p\in\Delta(A_n)$, $E_q(p)=H_q(\pi_*p)$.
10. **(P10) Pullback of the complete ideal output.** For arbitrary complex amplitudes $\psi$ and every $s\in S_n$, $\phi_\psi(s)=\alpha_\psi(w_s)$, without a normalization assumption.
11. **(P11) Every clean output matrix element.** For arbitrary complex amplitudes $\psi$ and all $a,a'\in A_n$, $b,b'\in\operatorname{Bool}$,

    $$
    \rho^q_\psi(o_{a,b},o_{a',b'})
    =\psi(a,b)\overline{\psi(a',b')}G(a,a').
    $$

12. **(P12) Exact fidelity formula on the complete system.** For arbitrary complex amplitudes $\psi$, $F^q_D(\psi)=E_q(p^\psi)$, with the right side naturally embedded in $\mathbb C$. Normalization is unnecessary for this identity, and the value is real.
13. **(P13) Normalization of both complete vectors.** If $\psi$ is normalized, then

    $$
    \begin{aligned}
    \sum_{s\in S_n}\sum_{e\in\mathcal E_n}|J^q_\psi(s,e)|^2&=1,\\
    \sum_{s\in S_n}|\phi_\psi(s)|^2&=1.
    \end{aligned}
    $$

14. **(P14) Every address law is realizable.** For every $p\in\Delta(A_n)$, $\psi_p$ is normalized, and its `inputDistribution` is exactly $p$.
15. **(P15) Unique class minimizer and complete minimizing fibers.** There exists $\mu^*\in\Delta(C_{n,q})$ such that $H_q(\mu^*)\le H_q(\nu)$ for every $\nu\in\Delta(C_{n,q})$. Any class law also satisfying this minimum condition equals $\mu^*$. The map $\pi_*:\Delta(A_n)\to\Delta(C_{n,q})$ is surjective. For every $p\in\Delta(A_n)$,

    $$
    \begin{aligned}
    &[\forall r\in\Delta(A_n),\ E_q(p)\le E_q(r)]\\
    &\qquad\Longleftrightarrow\quad \pi_*p=\mu^*.
    \end{aligned}
    $$

    For every normalized joint input $\psi$,

    $$
    \begin{aligned}
    &[\forall\varphi\ \text{normalized},\
    \operatorname{Re}F^q_D(\psi)\le\operatorname{Re}F^q_D(\varphi)]\\
    &\qquad\Longleftrightarrow\quad \pi_*p^\psi=\mu^*.
    \end{aligned}
    $$

    All minimizing address laws form the entire set defined by $p_a\ge0$, $\sum_ap_a=1$, and $\sum_{a:\pi(a)=c}p_a=\mu^*_c$. Neither class weights nor address weights are required to be strictly positive.
:::

::: {.proof #pf-ch38-physical-profile-event}
The actual loaded tree is the completely programmed tree, immediately giving the independence from arbitrary external qutrit bus labels in P1 and P3. For any two local labels $s,t$, multiplication of the four environment coordinates gives

$$
\sum_\eta r_{v,s}(\eta)\overline{r_{v,t}(\eta)}
=\begin{cases}1,&s=t,\\q(v),&s\ne t.\end{cases}
$$

Equal labels contribute $q(v)+(1-q(v))=1$; distinct labels share only the common coordinate. The finite tensor product multiplies these node overlaps. Every tree record consequently has norm $1$, giving P2. The address Gram entry can also be read directly as $\prod_{v:\lambda_a(v)\ne\lambda_{a'}(v)}q(v)$. Empty products preserve depth zero and both endpoints; no division by any $q(v)$ is needed.

For P4, choose an actual environment basis index $e^{(c)}$ for each realized class $c$: select its label coordinate at every active node, and the common coordinate elsewhere. Then

$$
\begin{aligned}
R_d(e^{(c)})&=\begin{cases}\delta_q,&d=c,\\0,&d\ne c,\end{cases}\\
\delta_q&=\prod_{v:q(v)<1}\sqrt{1-q(v)}>0.
\end{aligned}
$$

Evaluation at this coordinate isolates the coefficient of class $c$ in any complex linear combination of class records. Let the column matrix be $M(e,a)=R_a(e)$. Every record coordinate is real, so the density-oriented $G$ here also equals $M^\dagger M$. The Gram matrix and the column matrix have the same kernel and rank, while

$$
\sum_a z_aR_a=\sum_c(\Sigma_qz)_cR_c.
$$

Class-record independence and surjectivity of $\pi$ onto its actual image now give P5 and P6. By [@thm-ch38-profile-separation], injectivity of the class map at positive depth is equivalent to activity of every deepest router, giving P7. At depth zero there is only the empty address with its unit record, so $G=(1)$ and P8 follows; `DeepestActive` adds no condition there.

Group the real address coefficients by class. The squared norm of the resulting record superposition is precisely $E_q$, proving P9. For every real vector $x\ne0$, class-record independence also gives $H_q(x)>0$. Expansion of the squared norm yields the midpoint gap

$$
H_q\!\left(\frac{x+y}{2}\right)
=\frac{H_q(x)+H_q(y)}2-\frac{H_q(x-y)}4.
$$

The class simplex is nonempty and compact, and $H_q$ is continuous, so a minimum exists. If two distinct minimizers existed, their midpoint would remain in the simplex and the displayed identity would strictly lower the energy. The minimizing class law is therefore unique. This argument does not require it to lie in the simplex interior.

Every class has a representative address. Placing all of a class's mass on one representative lifts any class law to an address law, including classes of zero mass. Thus $\pi_*$ is surjective. P9 and uniqueness of the class minimizer give the address equivalence in P15, allowing every nonnegative allocation within each class. If $\mu^*_c=0$, every address weight in that class must vanish; these boundary laws belong to the same complete fiber.

For the output clauses, use the original actual circuit. The ideal query sends $\operatorname{clean}(n,a,b)$ to $o_{a,b}$; pulling the initialized amplitudes back through the inverse permutations gives P10. At this output basis, $J^q_\psi(o_{a,b},e)=\psi(a,b)R_a(e)$, so tracing the environment gives P11. On the entire $S_n$, the joint amplitudes and density matrix are still determined by the defining pullbacks and environment sums. By P2, P10, and norm preservation under the ideal permutation, both the joint vector and ideal vector have norm $1$, giving P13.

Insert P11 into the expectation in the complete ideal output. Each pair of input labels contributes $|\psi(a,b)|^2|\psi(a',b')|^2G(a,a')$. Summing separately over $b,b'$ gives P12, without a product-state or normalization assumption. For P14, the nonnegative square roots give $\sum_b|\psi_p(a,b)|^2=p_a$; summing over $a$ gives $1$. Every address law therefore has a normalized joint-input realization. Together with P12, this makes minimization over address laws equivalent to minimization over all normalized joint inputs, completing P15. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch38-heterogeneous-profile-fiber title="Depth two: three records and a complete minimizing address fiber"}
Take depth $2$, and name the root, left-child, and right-child routers $r,\ell,h$. Set $q(r)=1$, $q(\ell)=0$, and $q(h)=1$. Write addresses in head-first order as $00,01,10,11$. The actual loaded labels are

$$
\begin{array}{c|ccc}
a&r&\ell&h\\\hline
00&0&0&W\\
01&0&1&W\\
10&1&W&0\\
11&1&W&1
\end{array}
$$

Only the left-child router is active. The root and right-child environments always record $e_*$, so in tensor order $(r,\ell,h)$,

$$
\begin{aligned}
R_{00}&=e_*\otimes e_0\otimes e_*,\\
R_{01}&=e_*\otimes e_1\otimes e_*,\\
R_{10}=R_{11}&=e_*\otimes e_W\otimes e_*.
\end{aligned}
$$

This directly gives three realized classes, $c_0=\{00\}$, $c_1=\{01\}$, and $c_W=\{10,11\}$, with

$$
G=\begin{pmatrix}
1&0&0&0\\0&1&0&0\\0&0&1&1\\0&0&1&1
\end{pmatrix}.
$$

Its rank is $3$, and its complex coefficient kernel is exactly $z_{00}=z_{01}=0$, $z_{10}+z_{11}=0$. The inactive deepest router on the right accounts for the merged sibling addresses. The three class records are orthonormal, so class masses $(x,y,z)$ have energy $H_q=x^2+y^2+z^2$. Under $x+y+z=1$,

$$
x^2+y^2+z^2-\frac13
=\left(x-\frac13\right)^2+
\left(y-\frac13\right)^2+\left(z-\frac13\right)^2.
$$

The unique minimizing class law is $(1/3,1/3,1/3)$, and the minimum squared fidelity is $1/3$. All minimizing address laws are

$$
(p_{00},p_{01},p_{10},p_{11})
=\left(\frac13,\frac13,t,\frac13-t\right),
\qquad 0\le t\le\frac13.
$$

Each endpoint has a zero address weight and belongs in the fiber. The uniform address law has class masses $(1/4,1/4,1/2)$ and energy $3/8>1/3$. For each fixed classical $D$, a normalized joint complex input minimizes fidelity exactly when each of its three class masses is $1/3$. This condition retains all allowed complex phases, allocations within a class, and address–bus entanglement. These values are hand calculations from the displayed actual records, a concrete specialization of [@thm-ch38-physical-profile-event].
:::

::: {.remark #rem-ch38-profile-scope title="Rank, minimizing fibers, and physical scope"}
P6 describes the kernel of the complex Gram matrix acting on address coefficient vectors. It is not a statement about the kernel of a channel acting on density matrices. Likewise, uniqueness in P15 belongs to the class probability law. Every nonnegative address allocation with the optimal class masses remains allowed, and joint inputs may also differ in phase and entanglement. In general, $\mu^*$ is not required to have full support, and no closed formula or algorithm for the minimum at arbitrary heterogeneous rates is supplied. The example shows why uniform address optimality from the homogeneous case cannot be transferred without qualification.

At depth zero there are no routers, only one address and one class. The unit record gives $G=(1)$ and $F=1$ for normalized inputs. If every node has $q(v)=1$, all addresses again lie in a single class, every entry of $G$ equals $1$, and every address law belongs to the minimizing fiber. At positive depth, full rank requires activity of every deepest router, without requiring every ancestor to be active. Here “active” refers specifically to the environment's ability to distinguish labels; it does not mean that the router is programmed in every address branch.

The scope remains a finite set of actual internal routers, fixed classical data, one independent router record after complete sequential loading, and otherwise ideal gates. This does not extend to a noisy continuation, gate noise, correlated records, repeated holds, or hardware fault tolerance. Nor does it provide a new physical proof of the infinite address ontology or observer-pointer `MODEL` interpretation. The interpretations below retain their own premises.
:::
