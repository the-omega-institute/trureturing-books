# 35.6.8.5 Alternating substitution discrepancy and log-squared bounds {#sec-ch39-s05-s08-s05-substitution-discrepancy}

For the Tribonacci word, ordinary letter-count balance and a sum weighted by position parity are different observables. Retain the letter encoding $A=0$, $B=1$, $C=2$ and take integer weights

$$
\begin{aligned}
w(A)&=2,\qquad w(B)=1,\qquad w(C)=0,\\
F(v)&=\sum_{r=0}^{|v|-1}(-1)^r w(v_r),\\
W_{[s,s+m)}&=W_sW_{s+1}\cdots W_{s+m-1}.
\end{aligned}
$$

Here $s,m\in\mathbb N$, positions start at zero, and the empty word $\varepsilon$ has $F(\varepsilon)=0$. Each interval starts with a positive sign, independently of the parity of its global start $s$. The preceding hoppings are exactly $t_X=\rho^{w(X)}$, so finite products satisfy

$$
\prod_{r=0}^{m-1}t_{W_{s+r}}^{\,(-1)^r}
=\rho^{F(W_{[s,s+m)})}.
$$

This explains why alternating charge enters estimates of hopping ratios, without yet giving a spectral bound. The exact statement and construction below come from the [source proof of the Tribonacci prefix refutation](https://github.com/the-omega-institute/trureturing/pull/30577).

::: {.theorem #thm-ch39-p2e-tribonacci-prefix-log-refutation title="Failure of a Uniform Logarithmic Interval Bound for the Actual Tribonacci Word" lean="D5/S1/Words/TribonacciPrefixRefutation.result"}
For the fixed actual word $W$ and integer weights $w$ above,

$$
\neg\left(
\begin{aligned}
&\exists K\in\mathbb R,\quad 0<K\ \land\\
&\forall s,m\in\mathbb N,\quad
\left|F(W_{[s,s+m)})\right|
\le K\log(m+2)
\end{aligned}
\right).
$$

In this inequality, the integer charge and natural-number length are viewed as real numbers, and $\log$ is the natural logarithm. The quantifiers include $m=0$, with no lower length cutoff or restriction on the start.
:::

::: proof
Set $\tau=\sigma^4$ and extend it to finite words by concatenation. Four literal substitution steps give

$$
\begin{aligned}
\tau(A)&=ABACABAABACAB,&|\tau(A)|&=13,\\
\tau(B)&=ABACABAABAC,&|\tau(B)|&=11,\\
\tau(C)&=ABACABA,&|\tau(C)|&=7.
\end{aligned}
$$

Every $\tau^n(X)$ has odd length: at $n=0$ its length is one, and the next level concatenates $13$, $11$, or $7$ preceding-level blocks of odd length. This proves the assertion simultaneously for all letters by induction. For arbitrary finite words, concatenation satisfies

$$
F(uv)=F(u)+(-1)^{|u|}F(v).
$$

Thus, when expanding $\tau^{n+1}(X)$, each preceding-level block reverses the sign of the next block. Write $a_n=F(\tau^n(A))$, $b_n=F(\tau^n(B))$, and $c_n=F(\tau^n(C))$. Alternating block signs in the three literal images above gives the recurrence, valid for every $n\in\mathbb N$,

$$
\begin{aligned}
(a_0,b_0,c_0)&=(2,1,0),\\
a_{n+1}&=a_n,\\
b_{n+1}&=2a_n-b_n,\\
c_{n+1}&=4a_n-2b_n-c_n.
\end{aligned}
$$

The recurrence $a_{n+1}=a_n$ and its initial value give $a_n=2$, so the recurrence for $b$ becomes $b_{n+1}-2=-(b_n-2)$. Set $d_n=(-1)^n(c_n-2)$; the recurrence for $c$ becomes $d_{n+1}=d_n-2$, with $d_0=-2$. The solution at every level is therefore

$$
\begin{aligned}
a_n&=2,\\
b_n&=2-(-1)^n,\\
c_n&=2-(2n+2)(-1)^n.
\end{aligned}
$$

The charge of a whole $A$ image remains $2$, but this does not control its internal prefixes. Define the explicit finite-word family

$$
U_0=\varepsilon,\qquad
U_{n+1}=\tau^{n+1}(C)U_n,\qquad m_n=|U_n|.
$$

The new block is prepended. The literal identity $\tau(A)=\tau(C)\,A\,BACAB$ gives

$$
\tau^{n+1}(A)=
\tau^{n+1}(C)\,\tau^n(A)\,\tau^n(BACAB).
$$

The empty word $U_0$ is a prefix of $A$. If $\tau^n(A)=U_nR_n$, the identity becomes

$$
\tau^{n+1}(A)=
U_{n+1}R_n\,\tau^n(BACAB).
$$

Inductively, $U_n$ is a literal prefix of $\tau^n(A)=\sigma^{4n}(A)$, hence

$$
W_{[0,m_n)}=U_n.
$$

This uses the original infinite word starting from $A$, with no additional occurrence assumption, cyclic closure, or position shift. All three fourth images are nonempty, so $m_n>0$ for $n\ge1$. Simultaneous induction over all letters uses at most thirteen preceding-level images at each step and gives $|\tau^n(X)|\le13^n$. Prefix containment then yields

$$
0<m_n\le|\tau^n(A)|\le13^n\qquad(n\ge1).
$$

Let $q_n=F(U_n)$. The prepended block $\tau^{n+1}(C)$ has odd length, so

$$
q_0=0,\qquad q_{n+1}=c_{n+1}-q_n.
$$

To solve this accumulation explicitly, set $r_n=(-1)^n(q_n-1)$. Substitution of the formula for $c_{n+1}$ gives $r_0=-1$ and $r_{n+1}=r_n-(2n+4)$. Summation yields

$$
\begin{aligned}
q_n&=1-(-1)^n(n^2+3n+1)\\
&=\begin{cases}
-n(n+3),&n\text{ even},\\
(n+1)(n+2),&n\text{ odd}.
\end{cases}
\end{aligned}
$$

Consequently $|q_n|\ge n^2$, including $n=0$. For $n\ge1$, we have $13^n\ge1$ and $3\le3^n$, so the length bound gives $m_n+2\le13^n+2\le3\cdot13^n\le39^n$, and therefore

$$
\log(m_n+2)\le n\log39.
$$

Now suppose the uniform bound negated in the theorem holds. Take its constant $K>0$ and choose a natural number $n>K\log39$. Since $K\log39>0$, we have $n\ge1$. On an actual prefix starting at zero,

$$
\begin{aligned}
\left|F(W_{[0,m_n)})\right|
&=|q_n|\ge n^2\\
&>Kn\log39
\ge K\log(m_n+2),
\end{aligned}
$$

contradicting the uniform bound at $s=0$, $m=m_n$. This contradiction covers every positive real $K$. The explicit family starting at zero is a construction within the proof, with no extra hypothesis and no extrapolation from finite samples. The full proof is checked by the Lean kernel.
:::

The counterexample family shows how charge can accumulate across levels in certain actual prefixes. Controlling intervals of every length at every start also requires control of all prefixes inside each level's blocks. A reusable estimate, independent of the Tribonacci alphabet, supplies this step: at each level, at most one child block remains unfinished, while the charges of the complete children contribute a sum over levels.

The prefix envelope controls every truncated prefix of a general substitution word, and the uniform squared-logarithmic bound controls every interval of the actual Tribonacci word. The later open-chain convergence theorem gives convergence to zero of the minimum absolute eigenvalue along the full sequence of specified even open prefixes for each fixed $0<\rho<1$. The quantitative bound and parameter-uniform convergence in [@ex-ch39-p2e-tribonacci-prefix-rate] remain a paper application and are not supplied by this convergence theorem.

::: {.lemma #lem-ch39-p2e-substitution-prefix-envelope title="A Level Prefix Envelope for Substitution Words" lean="D5/S1/Words/SubstitutionPrefixEnvelope.prefix_envelope"}
Let $\mathcal A$ be any alphabet, let $w:\mathcal A\to\mathbb Z$ be an integer weight, and let $f$ send each letter to a finite word, extended to finite words by concatenation. Take $f^0(a)$ to be the one-letter word $a$, and set

$$
Q(v)=\sum_{r=0}^{|v|-1}(-1)^r w(v_r).
$$

Suppose $M\in\mathbb Z$, $B\in\mathbb N$, and $H:\mathbb N\to\mathbb Z$ satisfy

$$
\begin{aligned}
&0\le M,\qquad 0\le H(i)
&&\text{for every }i\in\mathbb N,\\
&|w(a)|\le M,\qquad |f(a)|\le B
&&\text{for every }a\in\mathcal A,\\
&|Q(f^i(a))|\le H(i)
&&\text{for every }i\in\mathbb N,\ a\in\mathcal A.
\end{aligned}
$$

Then, for every $j,t\in\mathbb N$ and $a\in\mathcal A$,

$$
\left|Q\bigl(\operatorname{take}_t(f^j(a))\bigr)\right|
\le P(j):=M+B\sum_{i=0}^{j-1}H(i).
$$

Here $\operatorname{take}_t$ takes the first $\min(t,|f^j(a)|)$ letters, and the sum is empty at $j=0$. The conclusion includes empty prefixes, whole images, and indices beyond the word's end. It requires neither a finite alphabet, nonempty images, nor any prescribed parity of image lengths.
:::

::: {.proof #pf-ch39-p2e-substitution-prefix-envelope}
This proof follows the statement and argument of [the source declaration `prefix_envelope`](lean:D5/S1/Words/SubstitutionPrefixEnvelope.prefix_envelope).

The alternating charge with a local positive first sign satisfies $Q(uv)=Q(u)+(-1)^{|u|}Q(v)$, hence $|Q(uv)|\le|Q(u)|+|Q(v)|$. A level-zero image is a single letter, so every prefix has absolute charge at most $M$. Write $f^{j+1}(a)$ as the concatenation of at most $B$ level-$j$ children specified by $f(a)$. Each prefix consists of complete children followed by at most one child's prefix. The complete part contributes at most $BH(j)$, and induction bounds the unfinished part by $P(j)$, giving $P(j)+BH(j)=P(j+1)$. An index beyond the total length leaves only complete blocks; empty images add no charge. This induction uses absolute values while retaining the exact concatenation phase.

The full proof is checked by the Lean kernel.
:::

For the literal Tribonacci word, the complete-block charge formulas give a linear $H(j)$, so this estimate yields a quadratic $P(j)$. To obtain a bound independent of the start, we must also place each actual interval inside blocks at a suitable level.

::: {.theorem #thm-ch39-p2e-tribonacci-uniform-log-squared title="A Uniform Squared-Logarithmic Interval Bound for the Actual Tribonacci Word" lean="D5/S1/Words/TribonacciUniformLogSquared.uniform_log_squared"}
Take $\sigma(A)=AB$, $\sigma(B)=AC$, and $\sigma(C)=A$, and let $W=\lim_{n\to\infty}\sigma^n(A)$ be the infinite word starting from $A$, indexed from zero. Assign integer weights $w(A)=2$, $w(B)=1$, and $w(C)=0$, and define the charge with a positive first sign within each interval:

$$
F(W_{[s,s+m)})=\sum_{r=0}^{m-1}(-1)^r w(W_{s+r}).
$$

There exists a real constant $C>0$, independent of both start and length, such that

$$
\forall s,m\in\mathbb N,\qquad
\left|F(W_{[s,s+m)})\right|
\le C\bigl(\log(m+2)\bigr)^2.
$$

The integer charge and natural-number length are viewed as real numbers in this inequality, and $\log$ is the natural logarithm. The quantifiers include $m=0$, when the charge is zero. The first sign remains positive even when $s$ is odd.
:::

::: {.proof #pf-ch39-p2e-tribonacci-uniform-log-squared}
This proof follows the statement and argument of [the source declaration `uniform_log_squared`](lean:D5/S1/Words/TribonacciUniformLogSquared.uniform_log_squared).

**From complete blocks to prefixes.** Retain $\tau=\sigma^4$, whose three image lengths are $13,11,7$. The complete-block charges computed above are $2$, $2-(-1)^j$, and $2-(2j+2)(-1)^j$. Thus, for every letter $X$ and level $j$,

$$
|F(\tau^j(X))|\le H(j):=2j+4.
$$

Apply [@lem-ch39-p2e-substitution-prefix-envelope] with $M=2$, $B=13$, and this $H$. Every prefix of every level-$j$ image has the common envelope

$$
\begin{aligned}
P(j)&=2+13\sum_{i=0}^{j-1}(2i+4)\\
&=2+13j^2+39j.
\end{aligned}
$$

This controls every truncation position; the constant charge $2$ of a complete $A$ block cannot replace it.

**From prefixes to local intervals.** Let $v$ be a contiguous subword of $T=\tau^j(X)\tau^j(Y)$. Each prefix of $T$ is the concatenation of at most one prefix from each block, so its absolute charge is at most $2P(j)$. If $R$ is the prefix preceding $v$, then both $R$ and $Rv$ are prefixes of $T$, and

$$
F(Rv)-F(R)=(-1)^{|R|}F(v).
$$

Taking absolute values gives

$$
|F(v)|\le4P(j)\le156(j+1)^2\qquad(j\in\mathbb N).
$$

This two-block estimate requires no odd-length hypothesis and assumes no occurrence of these blocks in the infinite word. An interval contained in a single block also qualifies, since it is a contiguous subword of $\tau^j(X)\tau^j(X)$.

**Containment in the actual word.** Each $\tau$ image has length at least $7$. Starting with length one at level zero, simultaneous induction over all letters concatenates at least seven preceding-level images at every step, giving

$$
|\tau^j(X)|\ge7^j\qquad\text{for every }j\in\mathbb N,\ X\in\{A,B,C\}.
$$

Now fix any $s$ and $m>0$. Take $k=\lfloor\log_7 m\rfloor$ and $j=k+1$, so $7^k\le m<7^j$. Choose $N\ge j$ large enough that $s+m\le|\tau^N(A)|$. These $A$ images are actual prefixes of $W$, so $W_{[s,s+m)}$ is exactly the word obtained by dropping the first $s$ letters of $\tau^N(A)$ and taking the next $m$. The concatenation identity for substitution iterates gives

$$
\tau^N(A)=\tau^j\bigl(\tau^{N-j}(A)\bigr).
$$

The right side is a concatenation of level-$j$ blocks in their actual order, each strictly longer than $m$. Starting in the block containing its first letter, an interval of length $m$ either stays there or enters the immediately following block. In the latter case its remaining length is less than $m$, so it cannot cross the entire second block. If the starting block is already the last one, the total-length condition ensures that the interval ends inside it. Thus the whole actual interval lies in one block or two adjacent blocks, and the bound $156(j+1)^2$ applies. The higher level $N$ merely accommodates the start $s$; the level $j$ determining the bound depends only on $m$.

**From level to length.** Since $2^k\le7^k\le m$, monotonicity of the logarithm gives

$$
\begin{aligned}
k\log2&\le\log(m+2),\\
\log2&\le\log(m+2),\\
(j+1)\log2=(k+2)\log2&\le3\log(m+2).
\end{aligned}
$$

Both sides are nonnegative and $\log2>0$. Squaring and inserting the interval estimate yields

$$
\begin{aligned}
|F(W_{[s,s+m)})|
&\le156(j+1)^2\\
&\le\frac{1404}{(\log2)^2}\bigl(\log(m+2)\bigr)^2.
\end{aligned}
$$

An empty interval has zero charge and satisfies the same inequality directly. Hence $C=1404/(\log2)^2>0$ is one sufficient witness for the existential statement; no optimization of this constant is asserted.

The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch39-p2e-tribonacci-refutation-boundaries title="Alternating Discrepancy, Spectral Literature, and Physical Scope"}
**Literature background and scope, not a formalized physical conclusion of this book.** The square in the prefix estimate $|q_n|\ge n^2$ is a square of the substitution level $n$, but the existing length estimates also determine the worst-case order. In this remark, write $Q(s,m)=F(W_{[s,s+m)})$, with charges and lengths viewed as real numbers in the following inequalities. For $n\ge1$, we already have $0<\log(m_n+2)\le n\log39$. Both sides are nonnegative and $\log39>0$, so squaring and applying [@thm-ch39-p2e-tribonacci-uniform-log-squared] gives, with one $C>0$,

$$
\begin{aligned}
\frac{(\log(m_n+2))^2}{(\log39)^2}
&\le n^2\le|q_n|=|Q(0,m_n)|\\
&\le C(\log(m_n+2))^2.
\end{aligned}
$$

The recursion gives $m_{n+1}=|\sigma^{4(n+1)}(C)|+m_n>m_n$, since every letter image is nonempty. These actual prefix lengths therefore increase strictly and are unbounded, giving matching squared-logarithmic bounds along this sequence. At $n=0$, we have $m_0=q_0=0$, outside the scope of this positive lower bound.

To distinguish a length cutoff from an exact length, define in this remark

$$
\begin{aligned}
P(M)&=\max_{\substack{m\in\mathbb N\\0\le m\le M}}|Q(0,m)|,\\
R(M)&=\sup_{\substack{s\in\mathbb N\\m\in\mathbb N,\ m\le M}}|Q(s,m)|.
\end{aligned}
$$

Here $M\in\mathbb N$; in $R(M)$, the start $s$ ranges over all natural numbers, without a restriction by $M$. The maximum defining $P(M)$ is over a nonempty finite set, and the uniform upper bound makes the nonempty set defining $R(M)$ bounded above. For every positive natural $M$, the same constant $C>0$ satisfies

$$
\begin{aligned}
\frac{(\log(M+2))^2}{4(\log39)^2}
&\le P(M)\le R(M)\\
&\le C(\log(M+2))^2.
\end{aligned}
$$

The lower bound follows directly from the existing prefix estimates. For $M\ge13$, take $n=\lfloor\log_{13}M\rfloor\ge1$. Then $13^n\le M<13^{n+1}$ and $m_n\le13^n\le M$, so $P(M)\ge|Q(0,m_n)|\ge n^2$. Also, $M+2\le3M$ gives

$$
\begin{aligned}
\log(M+2)&\le\log3+\log M\\
&\le\log3+(n+1)\log13\\
&\le(n+1)\log39\le2n\log39.
\end{aligned}
$$

Squaring and dividing by the positive number $4(\log39)^2$ proves the required lower bound. For $1\le M\le12$, use the actual one-letter prefix $W_{[0,1)}=A$, whose charge is $Q(0,1)=2$, so $P(M)\ge2$. Meanwhile, $\log(M+2)\le\log14<\log39$, so the required lower bound's left side is less than $1/4$. For the upper bound, for every $m\le M$ and arbitrary $s\in\mathbb N$, apply the uniform estimate and $0<\log(m+2)\le\log(M+2)$, then take the maximum or supremum. Taking $s=0$ gives $P(M)\le R(M)$. Thus the prefix running maximum and the running supremum over all starts both have squared-logarithmic order: the uniform upper bound has sharp worst-case order. No constant is optimized here. At $M=0$, we have $P(0)=R(0)=0$, so the displayed positive lower bound fails.

Statements at every exact length require a separate distinction. Complete $A$ images supply another family of actual prefixes: put $\ell_n=|\sigma^{4n}(A)|$. The preceding identity $a_n=2$ and actual prefix containment give

$$
Q(0,\ell_n)=2,\qquad \ell_n\ge4n+1\qquad(n\in\mathbb N).
$$

The length bound follows from $\sigma^{k+1}(A)=\sigma^k(A)\sigma^k(B)$ for $k\ge0$: every $B$ image is nonempty, so the length starts at one and increases by at least one per step. Hence $\ell_n\to\infty$, while $|Q(0,\ell_n)|/(\log(\ell_n+2))^2\to0$. There are no $c>0$ and $m_0\in\mathbb N$ such that every $m\ge m_0$ satisfies $|Q(0,m)|\ge c(\log(m+2))^2$. Requiring this lower bound simultaneously at all starts also fails, since it includes start zero. If instead the exact length is fixed before taking the supremum over starts, write $E(m)=\sup_{s\in\mathbb N}|Q(s,m)|$. Whether there exist $c>0$ and $m_0\in\mathbb N$ such that every $m\ge m_0$ satisfies $E(m)\ge c(\log(m+2))^2$ is not determined by this argument: constant charge at one start does not control other starts, and a running maximum may select a shorter length. Optimal constants are likewise undetermined here. The bond-word prefix length $m_n$ cannot be identified directly with the specified even site count $N_j$.

Adamczewski, *Symbolic discrepancy and self-similar dynamics* ([10.5802/aif.2079](https://doi.org/10.5802/aif.2079), Theorem 1 and Propositions 10–11), provides a general framework for substitution discrepancy and cancellation in the critical spectrum. The existence of a suitable zero-mean letter weight in its weighted lower bounds does not automatically select the position-alternating weight here. Encoding position parity in an enlarged alphabet would require separate checks of primitivity, frequencies, weights, and cancellation conditions. The proof above computes directly on the original word; it neither uses that existence statement to select its weights nor claims literature novelty for the mechanism or explicit formula.

For physical spectral quantities, Juhász derives an auxiliary-matrix method from an open transverse-field Ising chain ([10.1103/PhysRevB.106.064204](https://doi.org/10.1103/PhysRevB.106.064204), [arXiv:2206.11575v2](https://arxiv.org/abs/2206.11575v2)). The positive eigenvalues of the $2L\times2L$ zero-diagonal path matrix in Eq. (6), with $L>1$ and all adjacent couplings nonzero, are the singular values of the bidiagonal matrix in Eq. (7). Equations (18) and (28) give finite-chain lower and upper bounds on the smallest positive value. Appendix B, Eq. (B4), places a commonly used approximate gap below the rigorous lower bound, so that approximation cannot serve as an upper bound on the true gap. The comparison concerns the auxiliary matrix's spectrum; it does not identify the original Ising many-body gap with a many-body gap of this hopping chain.

Hermisson's discussion of multi-letter substitutions with marginal renormalization eigenvalues and infinite dynamical exponent ([10.1088/0305-4470/33/1/304](https://doi.org/10.1088/0305-4470/33/1/304), [arXiv:cond-mat/9808238](https://arxiv.org/abs/cond-mat/9808238), p. 11) gives no specific scaling for this word in that passage. In Hida's Fibonacci XXZ analysis ([10.1143/JPSJ.73.2296](https://doi.org/10.1143/JPSJ.73.2296), [arXiv:cond-mat/0404606v2](https://arxiv.org/abs/cond-mat/0404606v2)), the scale $\Delta E\sim\exp[-\kappa(\log N)^2]$ in Eq. (38) comes from perturbative renormalization of the interacting isotropic model with separated strong and weak couplings. The free XY case in Eq. (28) instead gives a finite power-law exponent, $\Delta E\sim N^{-z}$. These conclusions do not replace checks of this chain's actual finite matrices, endpoints, parity truncations, and spectral quantity.

[@thm-ch39-p2e-tribonacci-prefix-log-refutation] rules out using the uniform logarithmic interval bound as a premise for an inverse-matrix estimate. [@thm-ch39-p2e-tribonacci-uniform-log-squared] supplies control of alternating charge on the actual word, uniformly over starts. Together with the finite-product identity above, it provides a combinatorial input for analyzing hopping ratios. It gives no full-inverse norm or mass estimate by itself and does not refute a polynomial spectral-gap bound. [@thm-ch39-p2e-tribonacci-open-chain-zero-gap] instead uses explicit positive-charge prefixes and one full-inverse entry to prove $\delta_{\rho,j}\to0$; below, [@ex-ch39-p2e-tribonacci-prefix-rate] already assembles the same actual hoppings, odd repeated windows, and full-inverse mass estimate into the stronger paper application $73728/N_j$, with convergence uniform in the parameter. This does not follow from the alternating-charge bound alone. For the Slater-state route described above, spatial entanglement additionally requires construction of the actual occupied projector and analysis of its spatial compression. The relation between the spatial cut of the chain and its internal window remains to be established. Spatial entanglement scaling of the chain's Slater state is posed in [@prob-ch39-p2e-fractal-horizon].
:::
