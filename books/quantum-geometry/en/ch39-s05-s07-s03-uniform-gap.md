# 35.6.7.3 A uniform gap at fixed forbidden-word length {#sec-ch39-s05-s07-s03-uniform-gap}

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
