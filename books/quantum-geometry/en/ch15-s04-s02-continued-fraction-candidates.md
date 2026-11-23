# K.2 Continued-fraction candidates and observation events {#sec-ch15-s04-s02-continued-fraction-candidates}


Passing from the distribution to postprocessing requires a number-theoretic bridge. The earlier $N=7,Q=4,r=3$ example concerns only the marginal: $N^2=49>4$, so it cannot instantiate the recovery results below. Now impose the resolution condition $N^2\le Q$ and ask a deterministic question: given the measured integer, which finite list is guaranteed to contain the required fraction?

::: {.definition #def-shor-observable-candidates title="Finite continued-fraction candidates from observable inputs" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.candidates"}
For natural numbers $y,Q,N$, let $C(x)$ be the finite list of continued-fraction convergents of a rational $x$. Define

$$
\operatorname{candidates}(y,Q,N)
=\bigl[z\in C(y/Q)\mid\operatorname{den}(z)<N\bigr].
$$

Its only inputs are the measured integer $y$, counting capacity $Q$, and modulus $N$. The unknown order $r$ and phase index $s$ are not inputs. Each rational is represented in lowest terms with positive denominator.
:::

How is $C(x)$ actually enumerated? Put $a_0=\lfloor x\rfloor$ and $f=x-a_0$. If $f=0$, return $[a_0]$. Otherwise recursively enumerate $C(1/f)$, replace each entry $z$ by $a_0+1/z$, and prepend $a_0$. For example, $21/64$ starts with $a_0=0$, then $64/21=3+1/21$, yielding $[0,1/3,21/64]$. The positive reduced denominator strictly decreases at every recursive call, making the list finite. Below we also bound its length, while distinguishing stage counts from actual work. The source definition [`convergents`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.convergents) also accepts negative rationals, zero, and integers. Totalized rational division defines candidates even at $Q=0$, although the application below always has $Q>0$.

This is a list of genuine real continued-fraction convergents. The exact correspondence [`mem_convergents_iff`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.mem_convergents_iff) says that, for any rationals $x,z$, membership $z\in C(x)$ is equivalent to the existence of $k\in\mathbb N$ with $\operatorname{Real.convergent}(x,k)=z$. The real definition repeats the terminal value after a rational expansion terminates; the finite list only needs to retain that value. Write [`reduced`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced) for the rational $s/r$. For $r>0$, its denominator formula [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) is $d=r/\gcd(s,r)$.

Beyond termination, the list's length can be bounded. Write $d=\operatorname{den}(x)$ for the canonical positive reduced denominator of a rational $x$, and read $\operatorname{Nat.log}(2,d)$ as $\lfloor\log_2d\rfloor$; here $d\ge1$ always.

::: {.theorem #thm-rational-convergents-log-length title="Logarithmic length of the rational convergent list" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log"}
For every rational $x\in\mathbb Q$,

$$
\operatorname{length}(C(x))\le2\operatorname{Nat.log}(2,\operatorname{den}(x))+1.
$$

This includes negative rationals, zero, and integers. An integer has denominator $1$ and a singleton list, attaining equality.
:::

::: proof
Use strong induction on the positive reduced denominator. An integer terminates immediately. If the reciprocal fractional part is still nonintegral, the denominators after two and one recursive steps sum to at most the original denominator, and the former is strictly smaller than the latter. Thus two steps at least halve the denominator. Monotonicity of the natural logarithm and its multiplication-by-two identity account for the two removed entries before applying the induction hypothesis. The full proof is checked by the Lean kernel.
:::

For the observable candidates, only $y,Q,N\in\mathbb N$ and $Q>0$ are needed. Filtering cannot increase length, and

$$
\operatorname{den}(y/Q)=\frac{Q}{\gcd(y,Q)}\le Q.
$$

Applying [@thm-rational-convergents-log-length] and monotonicity of the natural logarithm gives

$$
\begin{aligned}
\operatorname{length}(\operatorname{candidates}(y,Q,N))
&\le2\operatorname{Nat.log}(2,Q)+1,\\
\operatorname{length}(\operatorname{candidates}(y,2^n,N))&\le2n+1
\quad(n\in\mathbb N).
\end{aligned}
$$

This application requires neither $y<Q$ nor $N>0$. At $n=0$ the bound is $1$; at $N=0$ the filtered list is empty. It counts entries or Euclidean recursive stages. It supplies no bound on all the repeated `map` work, arithmetic bit complexity, or gate complexity. A short list does not certify an exact selector or make every candidate denominator divide the true order. The recovery results below still require their actual parameters, resolution, nearestness, and coprimality hypotheses.

::: {.theorem #thm-shor-nearest-candidate title="Conditional candidate membership for a nearest sample" lean="D5/S3/Quantum/ShorContinuedFractions.shor_nearest_candidate"}
For every actual padded modular-multiplication record $c:\operatorname{Parameters}$, write $N=c.\operatorname{modulus}\ge2$ and $a=c.\operatorname{base}\in\mathbb N$, with $\gcd(a,N)=1$. Its work width $w=c.\operatorname{width}$ satisfies $N\le2^w$, and its true order $r=c.\operatorname{period}=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)$ satisfies $0<r<N$. For every independently chosen counting width $n\in\mathbb N$, put $Q=2^n$. For every $s\in\mathrm{Fin}\,r$ and $y\in\mathrm{Fin}\,Q$, assume

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right).
$$

Then

$$
\begin{aligned}
\operatorname{reduced}(s.\operatorname{val},r)
&\in\operatorname{candidates}(y.\operatorname{val},Q,N),\\
\operatorname{den}\bigl(\operatorname{reduced}(s.\operatorname{val},r)\bigr)&\mid r.
\end{aligned}
$$
:::

::: proof
Excluding wrap-around turns circular nearestness into ordinary absolute error at most $1/(2Q)$. If $d$ is the reduced denominator, $d\le r<N$ and $N^2\le Q$ give $d^2<Q$, so the error is strictly below $1/(2d^2)$. Legendre's approximation theorem supplies a real-convergent index; the finite-list correspondence gives actual membership, and $d<N$ passes the candidate filter. The denominator formula $d=r/\gcd(s.\operatorname{val},r)$ gives $d\mid r$. The full proof is checked by the Lean kernel.
:::

The hypothesis is $\operatorname{Nearest}$ itself. As defined above, it asserts the existence of an integer $z$ such that

$$
\left|\frac{s.\operatorname{val}}r-\frac{y.\operatorname{val}}Q-z\right|\le\frac1{2Q}.
$$

Why can no wrap occur here? Put $\theta=s.\operatorname{val}/r$ and $u=y.\operatorname{val}/Q$. Then $0\le\theta\le1-1/r$ and $0\le u\le1-1/Q$. The nearest nonzero integer shifts, $z=1$ and $z=-1$, give errors at least $1/r$ and $1/Q$, respectively, both strictly greater than $1/(2Q)$; more distant integers are also excluded. Thus $z=0$. The non-strict nearest-grid hypothesis still admits either rounding tie. Strictness in Legendre's radius comes from the denominator's square:

$$
\left|\frac{y.\operatorname{val}}Q-\frac{s.\operatorname{val}}r\right|
\le\frac1{2Q}<\frac1{2d^2},
\qquad d\le r<N,\quad N^2\le Q.
$$

::: {.theorem #thm-shor-coprime-candidate title="Conditional true-order membership for a coprime phase" lean="D5/S3/Quantum/ShorContinuedFractions.shor_coprime_candidate"}
For every actual record $c$ above ($N\ge2$, $\gcd(a,N)=1$, $N\le2^w$, and $0<r=\operatorname{orderOf}(a:\mathrm{ZMod}\,N)<N$), every independent counting width $n\in\mathbb N$, $Q=2^n$, $s\in\mathrm{Fin}\,r$, and $y\in\mathrm{Fin}\,Q$, assume

$$
N^2\le Q,\qquad
\operatorname{Nearest}\!\left(Q,\frac{s.\operatorname{val}}r,y\right),\qquad
\gcd(s.\operatorname{val},r)=1.
$$

Then the true order occurs in the list of candidate denominators:

$$
r\in\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr).
$$
:::

::: proof
By [@thm-shor-nearest-candidate], the reduced phase belongs to the candidates. Coprimality makes its denominator $r/\gcd(s.\operatorname{val},r)$ equal to $r$. The full proof is checked by the Lean kernel.
:::

The latent parameters $r,s$ describe hypotheses about the measurement; they are unknown when computing the candidates. The second result places the true order in a finite list without certifying how to select it. The first result's divisibility conclusion concerns only the distinguished reduced phase, never every candidate. The following are independent exact rational computations, without additional Lean badges for the examples:

| $N,a,Q;r,s,y$ | Nearest error and bound | $\operatorname{candidates}(y,Q,N)$ |
| --- | --- | --- |
| $7,2,64;3,1,21$ | $1/192\le1/128$ | $[0,1/3]$ |
| $13,4,256;6,1,43$ | $1/768\le1/512$ | $[0,1/5,1/6]$ |
| $7,2,64;3,0,0$ | $0\le1/128$ | $[0]$ |

The first row's full list was computed by Euclidean recursion above; $21/64$ is removed because its denominator is not below $7$. The second row's full list is $[0,1/5,1/6,21/125,43/256]$. Filtering retains both the correct denominator $6$ and the denominator $5$, which does not divide $6$. Thus neither “take the last candidate” nor “pass one modular-exponentiation test” is an exact-order selection algorithm certified here. Even a passing test $a^d\equiv1\pmod N$ alone establishes only $r\mid d$: the tested exponent is a multiple of the order, and need not equal it.

The rational zero has denominator $1$, so the first theorem includes $s=0$. When $r=1$, the sole phase is $s=0$ and $\gcd(0,1)=1$, so the second theorem applies too. The recovery conditions $N\ge2$ and $N^2\le2^n$ already exclude $n=0,1$, whereas the preceding marginal permits these widths. Neither candidate theorem requires $r\mid Q$ or identifies work width $w$ with counting width $n$. With this chapter's positive-exponent final transform $\mathcal F_+$, first reflect the observed label $k_+$ to $y=\rho(k_+)=(-k_+)\bmod Q$, then use nearestness for the same phase $s/r$ and compute these candidates. Keeping the label unchanged would change the phase being approximated.

**One actual measurement: the probability that the candidate list contains the true order.** We can now connect conditional recovery to the actual marginal. Fix any actual parameter record $c$ as above, with $N=c.\operatorname{modulus}\ge2$, $r=c.\operatorname{period}$, $0<r<N$, $Q=2^n$, and $N^2\le Q$. Use exactly $c.\operatorname{modularOperator}$ and $c.\operatorname{input}$: modular multiplication fixes the padding, the work input is $|1\rangle$, and the work and counting widths are independent. Define the finite measurement event

$$
\begin{aligned}
E=\bigl\{y\in\mathrm{Fin}\,Q:\;&r\in\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr)\bigr\},\\
p(y)&=\operatorname{normSquared}\!\left(
\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y\right),\\
k(s,y)&=p_Q(s.\operatorname{val}/r,y),\qquad A=\frac4{\pi^2}.
\end{aligned}
$$

The event $E$ is exactly the source predicate `r ∈ (candidates y.val Q N).map Rat.den`. The unknown $r$ defines success; the candidate computation still takes only $y.\operatorname{val},Q,N$. All quotients are real after casting natural numbers. By [@thm-shor-distribution-normalized], $\Pr_-(E)=\sum_{y\in E}p(y)$ is the event probability of this actual counting measurement. We will obtain

$$
\Pr_-(E)\ge\frac4{\pi^2}\frac{\varphi(r)}r,
\qquad \varphi(r)=\operatorname{Nat.totient}(r).
$$

This bound follows by combining the cited results with finite counting.

**First find an admissible nearest label for each phase.** For $s\in\mathrm{Fin}\,r$, round the real number $x=Qs.\operatorname{val}/r$ to an integer $m$. The nearest-integer estimate `abs_sub_round` gives $|x-m|\le1/2$. Since $0<r<N$ and $N^2\le Q$ imply $r<Q$, we have

$$
\begin{aligned}
0\le x&\le Q-\frac Qr<Q-1,\\
-\frac12\le m&\le x+\frac12<Q-\frac12.
\end{aligned}
$$

Since $m$ is an integer, $0\le m<Q$. Thus we may take $y_s\in\mathrm{Fin}\,Q$ with $y_s.\operatorname{val}=m$. Dividing by $Q>0$ gives

$$
\left|\frac{s.\operatorname{val}}r-\frac{y_s.\operatorname{val}}Q\right|
\le\frac1{2Q}.
$$

This satisfies $\operatorname{Nearest}$ with integer shift $z=0$. Only existence is needed; at a midpoint tie, either non-strict nearest choice satisfies the same estimate. Phase $s=0$ is included.

**Next bound the same event within each component.** Let

$$
\mathcal C=\{s\in\mathrm{Fin}\,r:\gcd(s.\operatorname{val},r)=1\}.
$$

For each $s\in\mathcal C$, [@thm-shor-coprime-candidate] places the chosen $y_s$ in $E$, and [@thm-qpe-arbitrary-phase-lower-bound] gives $k(s,y_s)\ge A$. Every $k(s,y)$ is a squared complex modulus and hence nonnegative, so

$$
\begin{aligned}
\sum_{y\in E}k(s,y)&\ge k(s,y_s)\ge A
&& (s\in\mathcal C),\\
\sum_{y\in E}k(s,y)&\ge0
&& (s\notin\mathcal C).
\end{aligned}
$$

We have first summed the event $E$ within each component. We have neither added possibly coinciding $y_s$ as distinct measurement outcomes nor needed to prove the chosen labels distinct.

**Finally combine the actual mixture with the coprime count.** By [@thm-shor-qpe-probability-mixture], $p(y)=r^{-1}\sum_{s\in\mathrm{Fin}\,r}k(s,y)$. Interchanging finite sums and applying the component event bounds with the positive weight $1/r$ gives

$$
\begin{aligned}
\Pr_-(E)
&=\sum_{y\in E}\frac1r\sum_{s\in\mathrm{Fin}\,r}k(s,y)\\
&=\frac1r\sum_{s\in\mathrm{Fin}\,r}\sum_{y\in E}k(s,y)\\
&\ge\frac1r\sum_{s\in\mathcal C}A\\
&=\frac{|\mathcal C|}{r}\,A
=\frac4{\pi^2}\frac{\varphi(r)}r.
\end{aligned}
$$

The last step is finite counting: `Fin.sum_univ_eq_sum_range` rewrites the sum over $\mathrm{Fin}\,r$ as a sum over $0\le s<r$, and `Nat.coprime_comm` aligns the coprimality predicate with the definition of `Nat.totient`. Thus $|\mathcal C|=\#\{a\in\mathbb N:a<r,\ \gcd(r,a)=1\}=\varphi(r)$. This ratio comes from the spectral weights and number of coprime phases for the same actual input; it assumes no additional experiment that samples a latent phase uniformly. For $r=1$, $\mathcal C=\{0\}$ and $\varphi(1)=1$; the sole phase and the only measurement outcome with nonzero probability are zero, and the zero candidate has denominator $1$. The actual event probability is $1$, so the bound still holds. The derivation needs no $r\mid Q$ and adds no width restriction beyond the existing resolution condition.

**Positive-exponent outputs use a reflected event.** If the final transform is $\mathcal F_+$ and $b$ is the observed label, use the involution $\rho(b)=(-b)\bmod Q$ defined above. The event is then

$$
\begin{aligned}
E_+&=\{b\in\mathrm{Fin}\,Q:\rho(b)\in E\},\\
\Pr_+(E_+)&=\sum_{\rho(b)\in E}P_+(b)\\
&=\sum_{y\in E}P_-(y)
\ge\frac4{\pi^2}\frac{\varphi(r)}r.
\end{aligned}
$$

The equality uses $P_+(b)=P_-(\rho(b))$ and $\rho^2=\mathrm{id}$. Both nearestness and candidate computation apply to the reflected label $\rho(b)$, so the list is `candidates (rho b).val Q N`. This does not replace the unreflected positive-exponent candidate event by $E$.

This lower bound concerns the probability that the finite candidate list from one actual measurement contains the true order. It does not certify exact-order selection from the list, nor that every candidate denominator divides the true order. It specifies no joint law for two measurements; the next application adds an explicit independent-reset sampling premise. An exact least-common-multiple product law for ideal phase sampling, factor extraction, full bit or gate complexity, hardware realization, and empirical performance remain outside this single-run derivation. Concentration of a conditioned posterior comb has not been established by bounding the actual marginal event.

**Application: two independent resets let two denominators recover the true order.** Reduction can remove prime factors from one recovered denominator; a second denominator can supply the missing factors. Following the two-reset application in the owning `ShorContinuedFractions` exposition, we ask whether the all-pairs least-common-multiple list computed from two observed integers contains the true order.

Fix the same actual parameter record $c$ throughout, with

$$
N=c.\operatorname{modulus}\ge2,\qquad
r=c.\operatorname{period}>0,\qquad
Q=2^n,\qquad N^2\le Q.
$$

We still have $r<N$. Each run starts afresh with the original counting state and the original work input $c.\operatorname{input}=|1\rangle$, uses the same $c.\operatorname{modularOperator}$, and ends with the inverse Fourier transform. The base, modulus, work width, and counting width are identical in the two runs. Write

$$
\begin{aligned}
A_-(y)&=\operatorname{runQPE}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}\,y,\\
p(y)&=\operatorname{normSquared}(A_-(y))
=\sum_{u\in\mathrm{Fin}\,c.\operatorname{dimension}}|A_-(y)(u)|^2.
\end{aligned}
$$

This is the actual marginal, summing over the full work register, including padding. **Independent resets are an explicit modeling and sampling premise of this application**: the outputs $Y_1,Y_2$ of the two complete preparations and measurements have joint law

$$
\Pr_-(Y_1=y,Y_2=z)=p(y)p(z).
$$

Equal marginals alone do not imply this law. For example, always copying the first outcome into the second can preserve both marginals while usually changing the joint law. Retaining an unreset work register or allowing arbitrary correlated repetitions does not justify the product law either. Nonnegative squared norms and [@thm-shor-distribution-normalized] give

$$
p(y)p(z)\ge0,\qquad
\sum_{y,z\in\mathrm{Fin}\,Q}p(y)p(z)
=\left(\sum_y p(y)\right)\left(\sum_z p(z)\right)=1.
$$

**The decoder sees only the two observed integers.** Define the denominator lists and their all-pairs list by

$$
\begin{aligned}
D(y)&=\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr),\\
L(y,z)&=\operatorname{flatMap}\!\left(D(y),
 d\mapsto\operatorname{map}\bigl(e\mapsto\operatorname{lcm}(d,e),D(z)\bigr)\right).
\end{aligned}
$$

The source expressions are `(candidates y.val Q N).map Rat.den` and `(D y).flatMap (fun d => (D z).map (fun e => Nat.lcm d e))`. For each $d$ in the first list, form its least common multiple with every $e$ in the second, then concatenate those smaller lists. The computation uses only $y,z,Q,N$, with neither the unknown $r$ nor a latent phase index as input. Define success by

$$
E_2(y,z)\ \Longleftrightarrow\ r\in L(y,z),\qquad
\Pr_-^{(2)}(E_2)=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{E_2(y,z)}\,p(y)p(z).
$$

The indicator $\mathbf1_{E_2(y,z)}$ is one when membership holds and zero otherwise. Each observed pair is counted once, even if candidate entries repeat or several denominator pairs produce $r$. The true order defines mathematical success without entering the list computation. We will derive

$$
\Pr_-^{(2)}(E_2)\ge\frac8{\pi^4}.
$$

**Conditional recovery: what does each denominator lose?** For every $s,t\in\mathrm{Fin}\,r$, the preceding nearest-integer construction supplies labels $y_s,y_t\in\mathrm{Fin}\,Q$ satisfying $\operatorname{Nearest}$ for $s.\operatorname{val}/r$ and $t.\operatorname{val}/r$, respectively. Explicitly, round $Qs.\operatorname{val}/r$ to an integer $m$ with error at most $1/2$; $r<Q$ ensures $0\le m<Q$. Only existence is needed, including phase zero and either non-strict nearest choice at a midpoint tie.

By [@thm-shor-nearest-candidate], both reduced phases belong to their respective candidate lists. The existing [`reduced_den`](lean:D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den) formula identifies the two distinguished denominators:

$$
d_s=\frac r{\gcd(s.\operatorname{val},r)}\in D(y_s),\qquad
d_t=\frac r{\gcd(t.\operatorname{val},r)}\in D(y_t).
$$

Both gcds divide $r$. Applying `Nat.div_lcm_eq_div_gcd` and `Nat.gcd_gcd_gcd_right` gives the exact identity

$$
\operatorname{lcm}(d_s,d_t)
=\frac r{\gcd\bigl(\gcd(s.\operatorname{val},t.\operatorname{val}),r\bigr)}.
$$

Thus $r\in L(y_s,y_t)$ whenever the phase pair is **jointly primitive**, meaning $\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1$. Neither numerator needs to be individually coprime to $r$. This makes no divisibility claim about the other candidate denominators.

For example, take the actual modulus $N=13$, base $a=4$, work width $w=4$, and $Q=256$, with true order $r=6$. For phase numerators $s=2,t=3$, nearest observations are $y=85,z=128$, with errors $1/768\le1/512$ and $0$, respectively. Computing directly from the observable inputs gives

$$
\begin{aligned}
\operatorname{candidates}(85,256,13)&=[0,1/3],& D(85)&=[1,3],\\
\operatorname{candidates}(128,256,13)&=[0,1/2],& D(128)&=[1,2],\\
L(85,128)&=[1,2,3,6].
\end{aligned}
$$

Here $\gcd(2,6)=2$ and $\gcd(3,6)=3$. The recovered denominators $3$ and $2$ are both smaller than the true order, but their least common multiple is $6$. The phases and true order explain why this observed pair succeeds; they were not used to enumerate its lists. This is a deterministic hand calculation, not a substitution of one observed pair's probability for the probability of the whole event.

**At least half of all phase pairs are jointly primitive.** Let

$$
H_r=\#\{(s,t)\in\mathrm{Fin}\,r\times\mathrm{Fin}\,r:
\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1\}.
$$

Every failing pair has some prime $p\mid r$ dividing both numerators. For each such $p$, send a label with $p\mid s.\operatorname{val}$ to $s.\operatorname{val}/p$. This is an injection into $\mathrm{Fin}(r/p)$; since $p\mid r$, the division of $r$ is exact. Zero is included among the divisible numerators. At most $(r/p)^2$ ordered pairs therefore have both coordinates divisible by $p$. A union bound over the distinct prime factors gives

$$
\begin{aligned}
r^2-H_r&\le\sum_{p\in\operatorname{primeFactors}(r)}(r/p)^2,\\
\frac{r^2-H_r}{r^2}&\le
\sum_{p\in\operatorname{primeFactors}(r)}\frac1{p^2}.
\end{aligned}
$$

Repeated prime factors appear only once in this sum, and overlaps among bad sets merely weaken the upper bound. Ratios are taken after casting to the reals.

Separate $2,3,5$. Every remaining prime divisor is odd, at least $7$, and at most $r$, hence belongs to $\{7+2k:0\le k<r\}$. Use the original finite-tail estimate [`reciprocal_square_shifted_finite_tail_le`](lean:D5/S3/Quantum/QPECircularTail.reciprocal_square_shifted_finite_tail_le): for every real $b>0$ and every $m\in\mathbb N$,

$$
\sum_{k=0}^{m-1}\frac1{(b+k)^2}\le\frac1{b^2}+\frac1b.
$$

This retains the full positivity hypothesis and the whole reciprocal-square sequence. The proof keeps the first term and bounds subsequent terms using

$$
\frac1{(x+1)^2}\le\frac1x-\frac1{x+1}\qquad(x>0).
$$

The resulting finite sum telescopes; dropping its nonnegative reciprocal endpoint gives the stated bound. For $m=0$ the left side is an empty sum. With $b=7/2$ and $m=r$,

$$
\begin{aligned}
\sum_{p\in\operatorname{primeFactors}(r)}\frac1{p^2}
&\le\frac14+\frac19+\frac1{25}
 +\frac14\sum_{k=0}^{r-1}\frac1{(7/2+k)^2}\\
&\le\frac14+\frac19+\frac1{25}
 +\frac14\left(\frac4{49}+\frac27\right)\\
&=\frac{21739}{44100}<\frac12.
\end{aligned}
$$

Good and bad pairs partition the $r^2$ phase pairs, giving the sufficient bound $2H_r\ge r^2$. Only this half-density estimate is needed. The exact density $\prod_{p\mid r}(1-p^{-2})$ in an ideal model of independent uniform phases is a distinct literature quantity. The union estimate above neither proves that exact product formula nor identifies it with the actual finite-clock candidate-event probability. Combining these standard counting and tail arguments makes no claim of mathematical novelty.

**First fix a phase pair and bound the whole event within that component.** Retain $k(s,y)=p_Q(s.\operatorname{val}/r,y)$ and $A=4/\pi^2$. For a fixed $(s,t)$, define

$$
\begin{aligned}
K_{s,t}(y,z)&=k(s,y)k(t,z)\ge0,\\
M_{s,t}&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{E_2(y,z)}K_{s,t}(y,z).
\end{aligned}
$$

If $(s,t)$ is jointly primitive, conditional recovery gives $E_2(y_s,y_t)$. The [specialization to actual modular phases](lean:D5/S3/Quantum/ShorCountingMarginal.shor_phase_accuracy_bound) of [@thm-qpe-arbitrary-phase-lower-bound] gives $k(s,y_s)\ge A$ and $k(t,y_t)\ge A$. Every other summand is nonnegative, so

$$
\begin{aligned}
M_{s,t}&\ge K_{s,t}(y_s,y_t)\ge A^2
&&\text{if }\gcd(\gcd(s.\operatorname{val},t.\operatorname{val}),r)=1,\\
M_{s,t}&\ge0&&\text{for all other phase pairs}.
\end{aligned}
$$

This bounds the mass of the **entire membership event in one fixed component**. It does not repeatedly add actual observed-point probabilities indexed by different latent phases.

**Then expand the actual product law and combine with weight $1/r^2$.** By [@thm-shor-qpe-probability-mixture], each actual marginal is $p(y)=r^{-1}\sum_s k(s,y)$. Under the explicitly assumed independent-reset law,

$$
\begin{aligned}
p(y)p(z)&=\frac1{r^2}
\sum_{s,t\in\mathrm{Fin}\,r}K_{s,t}(y,z),\\
\Pr_-^{(2)}(E_2)
&=\frac1{r^2}\sum_{s,t\in\mathrm{Fin}\,r}
\sum_{y,z\in\mathrm{Fin}\,Q}\mathbf1_{E_2(y,z)}K_{s,t}(y,z)\\
&=\frac1{r^2}\sum_{s,t\in\mathrm{Fin}\,r}M_{s,t}\\
&\ge\frac{H_r}{r^2}\left(\frac4{\pi^2}\right)^2
\ge\frac8{\pi^4}.
\end{aligned}
$$

The second line simply interchanges finite sums. Latent phase pairs index the spectral expansion of the actual product distribution; they are neither decoder inputs nor additional measured random variables. Even if several phase pairs choose the same observed pair, that observed pair has a single indicator, and the expansion decomposes its own actual mass. Neither duplicate candidates nor colliding nearest labels overcount the event.

**Positive Fourier transforms and the native positive circuit: reflect both labels on the same controlled state.** Keep the identical actual state before the Fourier transform,

$$
V=\operatorname{runControlled}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}.
$$

For each work coordinate $u$, put $A_+(y)(u)=\operatorname{QFT}\,Q\,(k\mapsto V(k)(u))\,y$, where $\operatorname{QFT}$ is the chapter's positive-exponent $\mathcal F_+$. Write $\nu$ for the same label reflection previously denoted by $\rho$:

$$
\begin{aligned}
e&=(\operatorname{ZMod.finEquiv}\,Q).\operatorname{toEquiv},&
\nu(y)&=e^{-1}(-e(y)),\\
\nu(0)&=0,&\nu(\nu(y))&=y,\\
\nu(y).\operatorname{val}
&=\begin{cases}0,&y=0,\\Q-y.\operatorname{val},&y\ne0.\end{cases}
\end{aligned}
$$

The zero branch is essential: zero reflects to zero, not to the integer $Q$ outside $\mathrm{Fin}\,Q$. On each column of this same $V$, the positive kernel equals the negative kernel at the reflected label. In the nonzero branch their phases differ by the integral frequency $k.\operatorname{val}$; at zero they agree directly. Applying the existing `phase_conj` and `phase_shift_int` identities gives exact equality of the full work vectors:

$$
A_+(y)=A_-(\nu(y)).
$$

This compares all work amplitudes, not just one orbit coordinate. Defining $p_+(y)=\operatorname{normSquared}(A_+(y))$ and summing squared moduli over the full work carrier gives

$$
p_+(y)=p(\nu(y))\ge0,\qquad
\sum_y p_+(y)=\sum_y p(\nu(y))=1.
$$

The final equality reindexes by the involution $\nu$. For any predicate $F$ on observed pairs, reindexing by the product permutation on both coordinates yields

$$
\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(\nu(y),\nu(z))}p_+(y)p_+(z)
=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(y,z)}p(y)p(z).
$$

Thus, when the two positive-Fourier experiments explicitly assume independent resets with joint mass $p_+(y)p_+(z)$, the correct success event and bound are

$$
\begin{aligned}
E_{2,+}(y,z)&\ \Longleftrightarrow\ r\in L(\nu(y),\nu(z)),\\
\Pr_+^{(2)}(E_{2,+})&=\Pr_-^{(2)}(E_2)\ge\frac8{\pi^4}.
\end{aligned}
$$

This positive product law is also nonnegative and normalized. Both observed labels must be reflected before candidate computation. No such bound is asserted here for the raw, unreflected positive event $r\in L(y,z)$. The argument reflects actual observations and assumes no equivariance of a nearest-label selection rule.

[@thm-qft-circuit-action] connects the same conclusion to the actual native positive circuit. For every `OracleModel` and its `Interpretation`, let $M_n$ be the `onBinaryLabels` matrix of `Source.circuit oracles n` under that interpretation. The cited statement identifies its action with $\operatorname{QFT}\,Q$ on every vector. Applying it to each column $k\mapsto V(k)(u)$ of the same actual controlled state gives

$$
\sum_{k\in\mathrm{Fin}\,Q}(M_n)_{y,k}V(k)(u)
=A_+(y)(u)=A_-(\nu(y))(u).
$$

Summing squared moduli over all $u$ gives exactly the same $p_+$. Its normalization, the event identity reflecting both coordinates, and the $8/\pi^4$ bound under two independent resets therefore apply. The controlled modular multiplication, work input, and joint state before the Fourier transform have not been replaced.

**Edge cases and scope.** Recovery needs only the stated resolution $N^2\le2^n$, without $r\mid Q$. When $r=1$, the only phase pair is $(0,0)$; it is jointly primitive, $H_1=1$, and the prime-factor set is empty. Both actual outcomes are zero, $D(0)=[1]$, $L(0,0)=[1]$, and the actual success probability is $1$. For every $r>0$, the definitions retain zero numerators, one or two zero observed labels, and repeated prime factors. In particular, phase $s=0$ has distinguished reduced denominator $1$. Both midpoint ties are allowed, with no uniqueness requirement for nearest labels. Reflection and native circuit equality themselves include $n=0,Q=1$; recovery with $N\ge2,N^2\le Q$ already excludes $n=0,1$. The finite-tail estimate also applies when its summation range is empty.

The combined application establishes precisely that the full all-pairs list computed from two observations contains their common true order with probability at least $8/\pi^4$, under independent resets of the same actual modular-multiplication experiment. It gives no certified exact-order selector from the full candidate least-common-multiple list. It also does not certify that taking the least common multiple of every entry in that list equals the true order: other candidates can introduce extra factors. Guarantees for arbitrary correlated repetitions, efficient uniform-unit sampling, recursive prime factorization, bit or gate complexity, and hardware performance remain outside this application. The uniform-unit Good bound and simultaneous gcd extraction below concern another sampling law. Without an explicit common joint law, their probabilities cannot simply be multiplied by this quantum event probability.

The candidate-membership and list-length results come from `ShorContinuedFractions`, `FiniteRationalConvergents`, and `FiniteRationalConvergentsLength` at the pinned source. The rational-list and length proofs are supplied by aicyberg; the modules retain the provenance and Apache 2.0 license of *Finite-register phase estimation and spectral Shor order finding* ([solanaqubits/leanbook, fixed revision](https://github.com/solanaqubits/leanbook/tree/9b742770a2a5dbcf30cf9abc44e711194e957a00)). Source audit [#30614](https://github.com/the-omega-institute/trureturing/issues/30614) still has three validated items and one unfinished item: the broader clock statement and independent ideal-sampling product law are not settled by this specialization to the modular bound. The separate earlier marginal-source audit [#30521](https://github.com/the-omega-institute/trureturing/issues/30521) still has three validated and fifty-nine unfinished items. These statuses describe coverage, not a refutation of the mathematical proofs above. The single-run list-membership bound above combines conditional membership, the actual mixture, and finite coprime counting. The two-run all-pairs list event instead uses a sufficient half-density bound for jointly primitive phase pairs under an explicit independent-reset premise. Below, a separate finite cyclic-family count yields the Good proportion for uniformly sampled units and both factor certificates on the same event. Independence remains a sampling premise; arbitrary correlated repetitions, certification of each individual return, classical bit complexity, full quantum gate complexity, and hardware performance retain the boundaries in [@rem-grover-qft-shor-literature].

**Application: choose the least passing exponent from the observed list.** The preceding application combines two denominator lists into a finite menu and bounds the probability that the true order belongs to it. We now add a definite selection rule: test each exponent by modular exponentiation, then take the least value that passes. Following the selector application in the `ShorContinuedFractions` source exposition, we derive the result here from existing list and multiplicative-order properties.

For arbitrary natural numbers $a,N$ and any finite list $L$ of natural numbers, write

```text
select a N L =
  List.argmin id
    (L.filter (fun d => decide (0 < d ∧ Nat.powMod a d N = 1)))
```

This composes existing functions. The filter keeps positive exponents that pass the modular-power test; `List.argmin id` returns their least natural value as `some m`, or `none` if the filtered list is empty. Its only inputs are $a,N,L$. There is no unknown true-order input $r$, latent phase, or flag saying whether this attempt is exact. The domain retains list order, duplicates, and empty lists. We do not first replace the list by a set or assume that every entry divides the order.

**Connect the executable test to the actual multiplicative order.** To interpret the output in terms of order, fix any actual parameter record $c:\operatorname{QuantumShorOrderFindingCore.Parameters}$ and put

$$
\begin{aligned}
a&=c.\operatorname{base},&N&=c.\operatorname{modulus}\ge2,\\
r&=c.\operatorname{period}
=\operatorname{orderOf}(a:\operatorname{ZMod}N)>0.
\end{aligned}
$$

The record also supplies $\gcd(a,N)=1$ and a work width large enough for the modulus. Thus $r$ is the actual order for this same base and modulus. The following list argument is independent of counting width, resolution, and how $L$ was obtained. By `Nat.powMod_def`, the test computes the natural residue $a^d\bmod N$. Since $1<N$, the literal residue $1$ is its canonical representative. `ZMod.natCast_eq_natCast_iff'` and `Nat.cast_pow` therefore give

$$
\operatorname{Nat.powMod}(a,d,N)=1
\quad\Longleftrightarrow\quad
(a:\operatorname{ZMod}N)^d=1.
$$

Call the filtered list $S$. If $\operatorname{select}(a,N,L)=\operatorname{some}(m)$, then `List.argmin_mem` puts $m$ in $S$, yielding

$$
m\in L,\qquad m>0,\qquad
\operatorname{Nat.powMod}(a,m,N)=1,\qquad r\mid m.
$$

The last clause follows from `orderOf_dvd_of_pow_eq_one`. Every $d\in L$ that is positive and passes the modular-power test belongs to $S$, so `List.le_of_mem_argmin` gives

$$
\forall d\in L,\quad
\bigl(d>0\ \land\ \operatorname{Nat.powMod}(a,d,N)=1\bigr)
\ \Longrightarrow\ m\le d.
$$

This is **minimality among passing entries of the supplied list**. Every positive passing exponent is a positive multiple of $r$, hence $r\le m$; `orderOf_le_of_pow_eq_one` also gives that inequality directly. Nonpassing entries do not enter the comparison, and missing exponents are not searched. A return therefore certifies positivity, a passing test, list membership, minimality within the list, and $r\mid m$. It carries no flag certifying $m=r$ and performs no search for smaller positive exponents outside the list that give residue one.

**The selector returns the true order if and only if the menu contains it.** For every actual $c$ above and every finite $L$, the exact correspondence is

$$
\operatorname{select}(a,N,L)=\operatorname{some}(r)
\quad\Longleftrightarrow\quad r\in L.
$$

For the forward direction, the returned $r$ belongs to the filtered list $S$ and therefore to the original list $L$.

For the reverse direction, suppose $r\in L$. Since $r>0$ and $(a:\operatorname{ZMod}N)^r=1$, it passes the modular-power test and belongs to $S$. By `List.argmin_eq_none`, a return of `none` would require $S=[]$. Here $S$ is nonempty, so the return is `some m`. This $m$ is a positive passing exponent, which gives $r\le m$ by the order property. Meanwhile, $r$ itself is a passing entry in the list, so minimality gives $m\le r$. The two inequalities force $m=r$. They connect two minima: $r$ is the least positive exponent giving residue one, while $m$ is the least such exponent present in the menu. Membership of $r$ makes them coincide.

The failure return has a complete equivalence as well:

$$
\operatorname{select}(a,N,L)=\operatorname{none}
\quad\Longleftrightarrow\quad
\forall d\in L,\ \neg\bigl(d>0\ \land\
\operatorname{Nat.powMod}(a,d,N)=1\bigr).
$$

Indeed, `argmin` returns `none` exactly when $S$ is empty, and the filter is empty exactly when the original list has no positive passing entry. Thus `none` reports failure of this menu; the actual parameter record still has a true order. An empty list returns `none`, zero exponents fail the positivity condition, and repeated passing entries remain repeated entries. On ties, `argmin` retains the first occurrence. Its score here is `id` on natural numbers, so tied scores are the same exponent and do not affect the contract. The case $r=1$ is included.

**Rewrite membership probability as exact-output probability, one summand at a time.** Return to the same actual $c$ and counting width $n$ as in the preceding application, retaining $Q=2^n$ and $N^2\le Q$. Both runs still use the same $c.\operatorname{modularOperator}$, the same $c.\operatorname{input}=|1\rangle$, and the same full work carrier, including padded coordinates. To make the selector's input explicit, recall the list definitions:

$$
\begin{aligned}
D(y)&=\operatorname{map}\bigl(\operatorname{den},
\operatorname{candidates}(y.\operatorname{val},Q,N)\bigr),\\
L(y,z)&=\operatorname{flatMap}\!\left(D(y),
 d\mapsto\operatorname{map}\bigl(e\mapsto\operatorname{lcm}(d,e),D(z)\bigr)\right).
\end{aligned}
$$

The latter is `(D y).flatMap (fun d => (D z).map (Nat.lcm d))`, retaining all pairs and duplicates. Define the exact-output event by

$$
X_2(y,z)\ \Longleftrightarrow\
\operatorname{select}(a,N,L(y,z))=\operatorname{some}(r).
$$

The generic list contract gives $X_2(y,z)\Longleftrightarrow E_2(y,z)$ pointwise, where $E_2(y,z)$ still means $r\in L(y,z)$. Selection builds the menu from observed integers and runs the tests; the unknown $r$ appears only in the mathematical success predicate.

Write $p_-(y)=p(y)=\operatorname{normSquared}(A_-(y))$. Continue to assume explicitly that the two complete preparations and measurements have independent resets, with joint mass $p_-(y)p_-(z)$. This product is nonnegative and sums to $1$. For any event $F$, define its probability by

$$
\Pr_-^{(2)}(F)=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{F(y,z)}p_-(y)p_-(z)
$$

The indicators of $X_2$ and $E_2$ agree at every observed pair, so every summand remains unchanged. Consequently,

$$
\begin{aligned}
\Pr_-^{(2)}(X_2)&=\Pr_-^{(2)}(E_2)\\
&\ge\frac{H_r}{r^2}\left(\frac4{\pi^2}\right)^2
\ge\frac8{\pi^4}.
\end{aligned}
$$

The bound still comes from the actual phase mixture, the mass of the whole event within each jointly primitive component, and $2H_r\ge r^2$. No additional experiment independently sampling latent phases is assumed, and no injective choice of nearest-label witnesses is needed. An observed pair has a single exact-output indicator, however many occurrences of $r$ or successful denominator pairs its menu contains. Resolution, target padding, and actual input are the same, and $r\mid Q$ is still unnecessary. One or two zero observed labels are included.

**Native positive Fourier circuit: reflect both observations before selection.** Use the same

$$
V=\operatorname{runControlled}\,c.\operatorname{modularOperator}\,n\,c.\operatorname{input}
$$

as above, together with $A_+(y)(u)=\operatorname{QFT}\,Q\,(k\mapsto V(k)(u))\,y$ and $p_+(y)=\operatorname{normSquared}(A_+(y))$. Reflection remains the negation involution $\nu$ transported through $\operatorname{ZMod.finEquiv}\,Q$, including $\nu(0)=0$ and $\nu(\nu(y))=y$. The full work-vector identity on this same controlled state gives

$$
A_+(y)=A_-(\nu(y)),\qquad p_+(y)=p_-(\nu(y)).
$$

The appropriate event is therefore

$$
X_{2,+}(y,z)\ \Longleftrightarrow\
\operatorname{select}\bigl(a,N,L(\nu(y),\nu(z))\bigr)=\operatorname{some}(r).
$$

Reflect both labels first; a zero label still maps to zero. The two positive-Fourier experiments explicitly use the independent-reset law $p_+(y)p_+(z)$. Reindexing the finite sum by the involution $(y,z)\mapsto(\nu(y),\nu(z))$ gives

$$
\begin{aligned}
\Pr_+^{(2)}(X_{2,+})
&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{X_2(\nu(y),\nu(z))}p_+(y)p_+(z)\\
&=\sum_{y,z\in\mathrm{Fin}\,Q}
\mathbf1_{X_2(y,z)}p_-(y)p_-(z)\\
&=\Pr_-^{(2)}(X_2)\ge\frac8{\pi^4}.
\end{aligned}
$$

For every `OracleModel` and its `Interpretation`, [@thm-qft-circuit-action] identifies the action of the native positive circuit's `onBinaryLabels` matrix $M_n$ with $\operatorname{QFT}\,Q$ on the same column $k\mapsto V(k)(u)$. Thus, coordinate by coordinate,

$$
\sum_{k\in\mathrm{Fin}\,Q}(M_n)_{y,k}V(k)(u)
=A_+(y)(u)=A_-(\nu(y))(u).
$$

Summing squared moduli over the full carrier gives the same $p_+$, so the reflected selection event applies to this same native circuit. The probability equality relies on involutive reindexing of both coordinates. It supplies no such bound for the unreflected positive-label menu $L(y,z)$. An unreset target, dependent repetitions, or an unspecified correlated state also cannot use this product law.

**Minimization cannot supply an order missing from the menu.** Consider a finite deterministic calculation with

$$
N=21,\qquad a=2,\qquad Q=512,\qquad y=z=43.
$$

Here $21^2=441\le512$. The Euclidean expansion of $43/512$ successively uses

$$
\begin{aligned}
512&=11\cdot43+39,\\
43&=1\cdot39+4,\\
39&=9\cdot4+3,\\
4&=1\cdot3+1.
\end{aligned}
$$

ending with $3=3\cdot1$. Its full list is $[0,1/11,1/12,10/119,11/131,43/512]$. Filtering for denominators strictly below $21$ gives

$$
\begin{aligned}
\operatorname{candidates}(43,512,21)&=[0,1/11,1/12],\\
D(43)&=[1,11,12],\\
L(43,43)&=[1,11,12,11,11,132,12,132,12].
\end{aligned}
$$

The last line concatenates the rows $[1,11,12]$, $[11,11,132]$, and $[12,132,12]$, with no deduplication. The first six positive powers of $2$ modulo $21$ have residues

$$
2,\ 4,\ 8,\ 16,\ 11,\ 1,
$$

so the true order is $r=6$. For the distinct menu values $1,11,12,132$, the modular-power residues are respectively $2,11,1,1$. The least positive passing value is $12$, hence

$$
\operatorname{select}(2,21,L(43,43))=\operatorname{some}(12),\qquad
\operatorname{Nat.powMod}(2,12,21)=1.
$$

The true order $6$ is absent from this menu, and the return is twice that order. This example establishes candidate computation and selection for the given integers. No positive probability for the observed pair $(43,43)$ in the actual quantum experiment is asserted here.

Using the returned $12$ as though it were the true order would give the half exponent $12/2=6$, whereas the actual half order is $6/2=3$. Their residues differ:

$$
2^{12/2}\bmod21=1,\qquad
2^{6/2}\bmod21=8.
$$

The former yields gcds $\gcd(63,21)=21$ and $\gcd(65,21)=1$; the latter yields $\gcd(7,21)=7$ and $\gcd(9,21)=3$. Passing the modular-power test cannot replace the true-order premise in the classical factor extraction below. Nor does the all-pairs construction guarantee that a missing order appears. List-relative minimization is exact when the true order is present; it does not make every menu complete.

**Probability guarantee and certificates for individual returns.** Under the stated actual input, resolution, and independent-reset law, the probability that the returned value equals the true order is at least $8/\pi^4$. This is a bounded-error guarantee for exact output. A return `some m` carries no flag identifying whether this attempt was exact: it may be a larger positive multiple. A return `none` means only that no positive menu entry passed. This is not a Las Vegas procedure that certifies every returned order and recognizes every unsuccessful attempt. Repeating these returns alone supplies no exactness certificate; this application makes no probability-amplification claim.

Exactness can be tested with additional resources. The existing `orderOf_eq_of_pow_and_pow_div_prime` says that a positive passing exponent $m$ is the order if every prime divisor $p\mid m$ satisfies

$$
(a:\operatorname{ZMod}N)^{m/p}\ne1
\quad\Longleftrightarrow\quad
\operatorname{Nat.powMod}(a,m/p,N)\ne1
$$

The mechanism is direct. Since $r\mid m$, write $m=rk$. If $k>1$, choose a prime divisor $p\mid k$. Then $r\mid m/p$, so this prime-division test must give residue $1$, a contradiction. Thus $k=1$. To use these tests as a finite certificate, a **complete verified prime factorization of $m$** is needed to cover all its distinct prime divisors; testing a few primes is insufficient. For $m=1$, the prime tests are empty, and positive passing already forces order $1$. Obtaining a complete factorization and verifying supplied factors are separate tasks. The selector does not supply the factors, and no efficient method for obtaining them is asserted here.

The minimum-of-order-multiples idea appears explicitly in Ekerå, *On the success probability of quantum order finding*, [arXiv:2201.07791v2, §4.1.7](https://arxiv.org/html/2201.07791v2#S4.SS1.SSS7): when processed values are all positive multiples of the order and at least one is the order, their minimum is the order. The citation concerns this minimum argument. The paper's offset search and smoothness-based processing differ from the all-pairs menu here; their algorithms and performance estimates do not transfer with that argument.

Finite lists and executable modular exponentiation specify a computation. The logarithmic length bound above counts convergents or Euclidean stages; it does not automatically cover every recursive list operation or the bit cost of rational arithmetic. This application supplies no end-to-end bit cost, quantum gate bound, efficient acquisition of complete factors, recursive factoring algorithm, or hardware-performance conclusion. Its exact-output event concerns counting observations for a fixed actual base, whereas the classical Good event below uses a separate unit-group sampling law. Combining their probabilities still requires an explicit common joint sampling construction.
