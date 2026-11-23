# K.3 Executable order recovery and factor certificates {#sec-ch15-s04-s03-executable-order}

**Application: halve repeatedly while preserving the same base's half-order power.** The exponent $12$ above passed the modular-power test but turned the half-order power into $1$. We can ask a smaller question: after halving the current exponent, does the same base still return to $1$? If it does, halve and ask again; otherwise stop. This step needs neither prior knowledge of the true order nor a complete prime factorization of the exponent. It removes excess factors of $2$ from a returning exponent. The odd multiple left behind can still exceed the true order.

State the rule in its full generality. Let $G:\operatorname{Type}\,u$ be a monoid with decidable equality, expressed by `Monoid G` and `DecidableEq G`. For $x\in G$ and a natural number $m$, define

```text
stripTwos x m =
  if 0 < m ∧ m % 2 = 0 ∧ x ^ (m / 2) = 1
  then stripTwos x (m / 2)
  else m
```

Division here is natural-number quotient. All three conditions must hold for a recursive call; otherwise the current exponent is returned. The inputs are only $x,m$, with no unknown $r=\operatorname{orderOf}(x)$ supplied. A monoid needs associativity and an identity; it need not be a group, finite, commutative, or cancellative. Actual evaluation also requires computable multiplication, identity, and equality. Every recursive call has $0<m/2<m$: a positive even number is at least $2$, and division by $2$ strictly decreases a positive natural number. Thus the natural measure $m$ proves termination. At $m=0$ the first condition fails and the output is $0$. Termination alone gives no bit or gate complexity bound.

::: {.theorem #thm-shor-verified-multiple-halving title="Executable halving of a positive returning exponent" lean="D5/S3/FiniteGroups/Cyclic/VerifiedMultipleHalving.stripTwos_correct"}
Let $G:\operatorname{Type}\,u$ be any monoid with decidable equality. For $x\in G$ and $m\in\mathbb N$, assume $m>0$ and $x^m=1$. Put $M=\operatorname{stripTwos}(x,m)$ and $r=\operatorname{orderOf}(x)$. Then all of the following hold:

1. $M>0$;
2. $M\mid m$;
3. $x^M=1$;
4. there is a natural number $k$ such that $m=2^kM$;
5. $M/r$ is odd;
6. if $r$ is even, then $M$ is even and $x^{M/2}=x^{r/2}$;
7. if $r$ is odd, then $M$ is odd.
:::

Here $r$ is automatically positive: the positive returning exponent and `orderOf_dvd_iff_pow_eq_one` give $r\mid m$, and zero cannot divide a positive number. The third clause similarly gives $r\mid M$, so the natural quotient in the fifth clause satisfies $M=r(M/r)$. This is not a claim about the floor of a nonintegral ratio. Zero has a defined output but lies outside the correctness statement: every element satisfies $x^0=1$, including elements with no positive returning exponent, for which `orderOf` is defined to be $0$. A zeroth power therefore cannot establish positive order.

::: proof
Use strong induction on the current positive exponent $n$, retaining four properties together: the output is positive, $n$ is a power of $2$ times the output, the output still returns $x$ to $1$, and its quotient by $r$ is odd. A continuation passes the problem to the smaller $n/2$, rather than assuming the same claim again at the original fixed $m$. If recursion gives $n/2=2^kM$, the evenness test yields

$$
n=2(n/2)=2\cdot2^kM=2^{k+1}M.
$$

Each successful halving increments the witness $k$; a terminal branch uses $k=0$. This constructs the natural witness in the fourth clause and supplies the divisibility in the second. Positivity and return to the identity are retained through the recursive premises.

At a terminal branch the output is the current positive $n$ and $x^n=1$. We have $r\mid n$. If the quotient were even, write $n/r=2j$; then

$$
n=2rj,\qquad n/2=rj,\qquad
x^{n/2}=(x^r)^j=1.
$$

All three continuation conditions would hold, contradicting termination at that branch. The quotient must be odd. This uses the usual order-divisibility and parity argument; the corresponding terminal property also appears as `div_orderOf_odd_of_pow_ne_one` in `SymbolicQuantum/Shor/ReductionLemmas.lean`, with no claim that it is a new mathematical fact.

Finally write $M/r=2t+1$. If $r$ is even, $M=r(2t+1)$ is even, and natural division gives

$$
\begin{aligned}
M/2&=rt+r/2,\\
x^{M/2}&=x^{rt}x^{r/2}
=(x^r)^t x^{r/2}=x^{r/2}.
\end{aligned}
$$

If $r$ is odd, $M=r(2t+1)$ is a product of odd numbers and is odd. Every power belongs to the same element; no interchange of different elements or cancellation law is needed. The full proof is checked by the Lean kernel.
:::

**Keep the base fixed when connecting the selector.** Fix the same actual parameter record $c$ as before, with $a=c.\operatorname{base}$, $N=c.\operatorname{modulus}\ge2$, and $x=(a:\operatorname{ZMod}N)$. A return `select a N L = some m` supplies $m>0$ and `Nat.powMod a m N = 1`. The earlier `Nat.powMod_def`, `Nat.cast_pow`, and residue conversion turn precisely this test into $x^m=1$, so the seven clauses apply to this $x,m$. The same guard can be evaluated using natural-number modular powers; for $a,m\in\mathbb N$ and $N\ge2$, Python's `pow(a,e,N)` computes $a^e\bmod N$:

```python
def strip_twos_mod(a, m, N):
    while 0 < m and m % 2 == 0 and pow(a, m // 2, N) == 1:
        m = m // 2
    return m
```

This simply expresses the same guard through modular exponentiation. A return `none` still means that the menu has no positive passing entry; it supplies no positive exponent to halve. The process always tests powers of the original base. It does not resample the base or change the controlled modular multiplication, native positive-exponent circuit, work input $|1\rangle$, or padded target carrier. For the positive-exponent experiment, both observed labels are still reflected before the original menu is formed.

If the selector returns the true order $m=r$, halving leaves it fixed. For odd $r$ the evenness test fails. For even $r$, we have $0<r/2<r$, so minimality of the true order excludes $x^{r/2}=1$ and the guard again fails. Thus `stripTwos x r = r`. The earlier exact-selection event is consequently contained in the exact-output event after halving, whose probability remains at least $8/\pi^4$. This uses the same independent-reset law as before and introduces no new joint sampling model. Halving may also recover the true order from a previously inexact return, but does not flag exactness on each output.

Return to $N=21,a=2,r=6$. Starting at $12$, the test $2^6\bmod21=1$ first reduces the exponent to $6$; then $2^3\bmod21=8\ne1$, and the process stops. Starting at $132$, it first reduces to $66$, since $2^{66}\bmod21=1$; then $2^{33}\bmod21=8\ne1$, so it stops. Hence

$$
\begin{aligned}
\operatorname{stripTwos}(2:\operatorname{ZMod}21,12)&=6,\\
\operatorname{stripTwos}(2:\operatorname{ZMod}21,132)&=66,\\
66/6&=11,\qquad 2^{33}\bmod21=2^3\bmod21=8.
\end{aligned}
$$

Both paths yield the half-power residue $8$, whose representative gives $\gcd(8-1,21)=7$ and $\gcd(8+1,21)=3$. Before halving, the half-power residue of $12$ was $1$, giving $21$ and $1$. The reduction $132\mapsto66$ retains the odd quotient $11$, making clear that a correct half-power does not imply exact order. It also tests no complete set of prime factors and cannot replace the full prime-factor certificate above.

**Preserving the half-power also preserves the need for Good.** The new interface is only $x^{M/2}=x^{r/2}$, under the even-order condition. Factor extraction still requires the same actual unit to satisfy

$$
\operatorname{Good}(x)\quad\Longleftrightarrow\quad
\operatorname{Even}(r)\ \land\ x^{r/2}\ne-1.
$$

Here powers are written after projecting the unit to $\operatorname{ZMod}N$; its order agrees with the order in the unit group. Minimality of the true order separately excludes half-order power $1$. Under the conditions $N>2$ and $\gcd(a,N)=1$ in [@ex-shor-actual-unit-factors], the existing true-order Good argument supplies two proper factors; equality of half-powers connects its certificate to the same residue of the halved output.

The halving theorem states equality of powers in a monoid. Connecting it to gcds of large natural-number powers additionally requires explicit congruence, positivity conditions for natural subtraction, and gcd invariance; a natural-number power must not be equated with its standard residue. The values $7$ and $3$ above are direct calculations on concrete residues. The halving module itself states no general natural-number gcd transport or factor probability.

Two boundaries make the scope concrete. For $N=2,a=1,m=8$, the trace is $8\mapsto4\mapsto2\mapsto1$; the true order is $1$, and the odd output supplies no even half-order extraction route. For $N=15,a=14,m=2$, we have $14^1\equiv-1\ne1\pmod{15}$, so the output remains $2$. Its order is even but the second Good condition fails; the gcds are $\gcd(13,15)=1$ and $\gcd(15,15)=15$.

This same-base halving rule also differs from Ekerå, *On completely factoring any integer efficiently in a single run of an order finding algorithm*, [arXiv:2007.10044, §3.2](https://arxiv.org/html/2007.10044), which samples new random bases and processes a squaring chain. The reference distinguishes the algorithms; its performance conclusions are not transferred here. Termination and these deterministic properties provide no efficient method for obtaining the initial $m$, complete factorization, exact-order certificate, bit or gate complexity bound, hardware success rate, guarantee for arbitrarily correlated repetitions, or Las Vegas conclusion, and no mathematical originality is claimed. The quantum product law at a fixed actual base and the Good law on uniformly sampled units remain different sampling models. Their probabilities cannot be multiplied without a common joint law and the corresponding conditional probabilities.

**One step further: cover the original exponent's prime factors and strip down to the order.** Halving removes only excess factors of $2$, so $132$ can still leave $66$. If an additional finite list contains every prime divisor of the original returning exponent, we can repeatedly test division by each entry. This additional input differs from the menu computed solely from observations: the selector does not supply it.

For any monoid $G:\operatorname{Type}\,u$ with decidable equality, an element $x$, and natural numbers $p,m$, define

```text
stripFactor x p m =
  if 1 < p ∧ 0 < m ∧ p ∣ m ∧ x ^ (m / p) = 1
  then stripFactor x p (m / p)
  else m

stripFactors x P m =
  P.foldl (fun n p => stripFactor x p n) m
```

Each successful division strictly decreases the current positive exponent because $p>1$. Otherwise the current value is returned and the fold moves to the next entry. The inputs are only $x,P,m$, with no true order supplied. Entries are processed in their original order, without deduplication or a requirement that every entry be prime.

::: {.theorem #thm-shor-verified-prime-stripping title="Executable order recovery from original prime-support coverage" lean="D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct"}
Let $G:\operatorname{Type}\,u$ be any monoid with decidable equality. For $x\in G$, a finite list $P$ of natural numbers, and $m\in\mathbb N$, assume

$$
m>0,\qquad x^m=1,\qquad
\forall p\in\mathbb N,\quad
\bigl(p\text{ is prime}\ \land\ p\mid m\bigr)\Longrightarrow p\in P.
$$

Put $M=\operatorname{stripFactors}(x,P,m)$. Then

$$
M>0,\qquad M\mid m,\qquad x^M=1,\qquad M=\operatorname{orderOf}(x).
$$
:::

Coverage concerns the **original input $m$**: each prime divisor must itself occur in $P$. It is a correctness premise, not a proof supplied as an additional function argument. The list may repeat entries or include extra composites, $0$, and $1$. No group, finiteness, commutativity, or cancellation assumption is required. Entries $0$ and $1$ never trigger recursion; the exponent $m=0$ always returns $0$ but lies outside this correctness statement. The case $m=1,P=[]$ is included.

::: proof
Write $r=\operatorname{orderOf}(x)$. A positive returning exponent gives $r>0$ and $r\mid m$. First apply strong induction to the actual recursion for a single supplied factor. If $n>0$ and $x^n=1$, the output $M$ satisfies

$$
M>0,\qquad n=p^kM\text{ for some }k\in\mathbb N,\qquad
x^M=1.
$$

When $p>1$, it also satisfies $p\nmid M/r$. In a recursive branch, combine the induction hypothesis at $n/p$ with $n=p(n/p)$, increasing the witness $k$ by $1$. At a terminal branch, $M/r=pj$ would give $M=p(rj)$. Hence $p\mid M$ and $x^{M/p}=(x^r)^j=1$: all four recursion conditions would hold, contradicting termination at this state.

Next induct over the list. The output remains a positive returning divisor of the original input, and every processed entry greater than $1$ is excluded from dividing the current output's quotient by $r$. Later processing replaces a returning exponent $A$ by a returning divisor $B$. Since $B\mid A$ and $r$ divides both, $B/r\mid A/r$. A previously excluded factor therefore cannot reappear in the later quotient. This also handles repeated entries and extra composites.

Every prime divisor of the final output divides the original $m$, so coverage places it in $P$. If division of the final exponent by this prime still returned to $1$, order divisibility would force the prime to divide $M/r$, contradicting the list invariant. Direct application of the existing `orderOf_eq_of_pow_and_pow_div_prime` gives $M=r$. The proof establishes invariants of the actual recursion and fold; the terminal order criterion retains its existing source. The complete proof is checked by the Lean kernel.
:::

**Continue from the same selector's return.** Suppose the preceding `select a N L = some m` holds. Keep the same actual parameters $c$, $N\ge2$, and $x=(a:\operatorname{ZMod}N)$. The return contract gives $m>0,x^m=1$. A list $P$ covering this original $m$ therefore makes `stripFactors x P m` equal the same base's true order, even if that order was absent from the original menu. A return `none` still means no positive entry passed; it supplies no positive exponent to this theorem. With the native positive circuit, continue to reflect both observed labels before constructing the original menu and selecting, then process the same base. This step does not replace the sampling law.

For $N=21,a=2$, input $m=12,P=[2,3]$ gives $6$; input $m=132,P=[2,3,11]$ also gives $6$, removing the odd excess factor $11$ left after halving. For the identity and $m=12$, the list $[2,3]$ gives $1$, whereas $[2]$ gives $3$ and $[6]$ gives $2$. In the last case, both original prime divisors $2,3$ divide a listed entry $6$, but neither occurs as an entry. Divisibility into some list member cannot replace the theorem's coverage condition.

**How many power tests does the program actually call?** Keep the original input, guards, and output, and add a count component. First check the arithmetic conditions $1<p$, $0<m$, and $p\mid m$. If any fails, no power-equality test is called and the count is $0$. If all pass, call the interface $x^{m/p}=1$ once, counting $1$ whether it succeeds or fails. Only success recurses, at the same quotient $m/p$. The corresponding computable pair is defined by

```text
stripFactorCost x p m =
  if 1 < p ∧ 0 < m ∧ p ∣ m then
    if x ^ (m / p) = 1 then
      let r := stripFactorCost x p (m / p)
      (r.1, r.2 + 1)
    else (m, 1)
  else (m, 0)

stripFactorsCost x P m =
  P.foldl (fun r p =>
    let s := stripFactorCost x p r.1
    (s.1, r.2 + s.2)) (m, 0)
```

The fold still processes the original list $P$ in its original order: the first component carries the current exponent, and the second accumulates calls. Write $\Phi(n)=\operatorname{Nat.log}(2,n)$. For $n>0$ this equals $\lfloor\log_2 n\rfloor$; Lean's total-function convention is $\operatorname{Nat.log}(2,0)=0$.

::: {.theorem #thm-shor-prime-stripping-cost title="Exact output and a logarithmic power-test bound" lean="D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStrippingCost.stripFactorsCost_spec"}
For every type $G:\operatorname{Type}\,u$ equipped with a monoid structure and decidable equality, every element $x\in G$, every finite list $P$ of natural numbers, and every $m\in\mathbb N$, put

$$
(M,C)=\operatorname{stripFactorsCost}(x,P,m).
$$

Then both clauses hold:

$$
\begin{aligned}
M&=\operatorname{stripFactors}(x,P,m),\\
C&\le P.\operatorname{length}+\operatorname{Nat.log}(2,m).
\end{aligned}
$$
:::

This count bound requires neither $m>0$ nor $x^m=1$. It also requires no prime-factor coverage, primality of entries, absence of duplicates, finiteness, group structure, or cancellation. For $m=0$, every entry stops at the arithmetic guard and the result is $(0,0)$; an empty list returns $(m,0)$. Entries $0$ and $1$ call no power test, while arbitrary other natural entries follow the original guards. The preceding exact-order theorem still requires its original positivity, returning, and coverage conditions.

::: proof
Strong induction on the current exponent proves equality of the first components: both programs stop under exactly the same conditions or recurse at the same $m/p$. Carry this equality through the list fold.

For one list entry, let $n$ be its input, $n'$ its output, and $c$ its count. Prove the potential inequality

$$
c+\Phi(n')\le 1+\Phi(n).
$$

If the arithmetic guard fails, $c=0,n'=n$; if the power test fails, $c=1,n'=n$. Both terminal branches satisfy the inequality. On success, $p\ge2$, $p\mid n$, and $n>0$, so $n\ge2$ and

$$
\Phi(n/p)+1\le\Phi(n/2)+1=\Phi(n).
$$

The decrease in logarithmic potential therefore pays the cost $1$ of this successful test; apply the induction hypothesis at the quotient. Sum the single-entry inequalities along the original list. Intermediate potentials cancel, giving $C+\Phi(M)\le P.\operatorname{length}+\Phi(m)$. Dropping the nonnegative final potential gives the count bound. The full proof is checked by the Lean kernel.
:::

For example, retain $N=21,a=2,m=132,P=[2,3,11]$. The tested exponents are $66,33,22,6$, with residues $1,8,16,1$, respectively. The first and last tests succeed, and the two failed tests also count, so the returned pair is $(6,4)$. Finally $11\nmid6$: only the arithmetic guard is checked, with no additional power test.

The classical repeated-division order algorithm appears in Andrew V. Sutherland, MIT 18.783, Spring 2015, Lecture 8, §8.3, Algorithm 8.2, printed page 3 ([lecture notes](https://math.mit.edu/classes/18.783/2015/LectureNotes8.pdf)). The notes start from a returning multiple in an additive group and its prime factorization. Here multiplication and the identity replace addition and zero; the statement permits arbitrary decidable monoids and extra list entries. No algorithmic originality is claimed. The count theorem above is derived in trureturing for that classical algorithm; no mathematical originality is claimed.

This conditional algorithm supplies no method for acquiring $P$ or efficiently factoring the exponent. With verified coverage, a positive returning exponent is indeed processed into the true order; obtaining the information needed for coverage remains a separate task. The logarithmic bound counts only calls to the power-equality interface. It excludes acquiring $P$, evaluating arithmetic guards, and multiplications inside modular exponentiation, and supplies no running-time, bit-complexity, quantum-gate, or complete Shor complexity bound. No new quantum success probability, uniform-unit sampler, guarantee for arbitrarily correlated repetitions, hardware implementation, or complete recursive integer-factorization result follows here. Combining the classical Good law with fixed-base quantum observations still requires an explicit common joint law.

**From the true order to factors: which bases fail?** Start with $N=15$ and $a=2$. The local orders modulo $3$ and $5$ are $2$ and $4$, so the global true order is $r=\operatorname{lcm}(2,4)=4$. The half-order power $2^2$ is locally $1$ and $-1$, respectively, and therefore is neither $1$ nor $-1$ modulo $15$. What matters is how many factors of $2$ occur in each local order: here, $1$ and $2$. We first count failing tuples in an arbitrary finite family of cyclic groups, then transport the same event to the actual unit group.

::: {.theorem #thm-half-order-family-failure-count title="Half-Order Failure Count in Finite Cyclic Families" lean="D5/S3/FiniteGroups/Cyclic/HalfOrderSynchronization.failure_count_le"}
For every nonempty finite index type $I$ and every family of groups $(G_i)_{i\in I}$, assume each $G_i$ is finite and cyclic, and specify $\epsilon_i\in G_i$ with $\operatorname{ord}(\epsilon_i)=2$. Put

$$
\begin{aligned}
P&=\prod_{i\in I}G_i,\qquad k=|I|,\qquad \epsilon=(\epsilon_i)_{i\in I},\\
\operatorname{Good}_{\epsilon}(x)
&\Longleftrightarrow \operatorname{Even}(\operatorname{ord}(x))
\ \land\ x^{\operatorname{ord}(x)/2}\ne\epsilon,\\
\operatorname{Bad}&=\{x\in P:\neg\operatorname{Good}_{\epsilon}(x)\}.
\end{aligned}
$$

Here $\operatorname{ord}$ is the true group-element order (Lean's `orderOf`), and $/2$ is natural-number division. Then

$$
|\operatorname{Bad}|\,2^{k-1}\le |P|.
$$

The factor sizes may differ, and the product $P$ need not be cyclic. The count includes every tuple, including the identity and tuples of odd order, and allows $k=1$.
:::

::: proof
Write $d_i=\operatorname{ord}(x_i)>0$ and $r=\operatorname{ord}(x)>0$. For a positive integer $d$, let $v_2(d)$ be its exponent of the prime $2$, namely `d.factorization 2`. The order in the product is the least common multiple of the local orders, so $v_2(r)=\max_i v_2(d_i)$.

In one cyclic factor, take an element $z$ of order $d$ and a positive even multiple $M$ of $d$. Since $(z^{M/2})^2=1$ and the cyclic group has a unique element $\epsilon$ of order $2$, this half-power is either $1$ or $\epsilon$. Moreover,

$$
z^{M/2}=1\ \Longleftrightarrow\ d\mid M/2
\ \Longleftrightarrow\ 2d\mid M
\ \Longleftrightarrow\ v_2(d)<v_2(M).
$$

For the last equivalence, all other prime-exponent inequalities already follow from $d\mid M$. Thus $z^{M/2}=\epsilon$ exactly when $v_2(d)=v_2(M)$. Apply this with $M=r$ in each coordinate. If $r$ is even, failure means that every local valuation reaches the same maximum; if $r$ is odd, every local valuation is $0$ and failure also occurs. Hence

$$
x\in\operatorname{Bad}\ \Longleftrightarrow\ \exists t\in\mathbb N,\ \forall i\in I,\ v_2(d_i)=t.
$$

Choose a full-order generator $g_i$ in each factor. With $n_i=|G_i|$, the number $n_i$ is even and $g_i^{n_i/2}=\epsilon_i$. Multiplication $z\mapsto zg_i$ switches $z^{n_i/2}$ between $1$ and $\epsilon_i$. The preceding criterion implies $v_2(\operatorname{ord}(zg_i))\ne v_2(\operatorname{ord}(z))$: equal valuations would agree on whether they equal $v_2(n_i)$, contradicting the switch.

Fix an anchor coordinate $i_0\in I$. Encode a failing tuple $x$ and Boolean bits $b_i$ on the other $k-1$ coordinates by retaining $y_{i_0}=x_{i_0}$ and setting $y_i=x_i$ when $b_i=0$, or $y_i=x_i g_i$ when $b_i=1$. The anchor reveals the original common valuation $t$. At every other coordinate the encoded valuation equals $t$ exactly when its bit is $0$. Thus the encoding recovers every bit, and cancellation of the generators recovers $x$. This is an injection from $\operatorname{Bad}\times\{0,1\}^{I\setminus\{i_0\}}$ into $P$; comparing cardinalities proves the bound. For $k=1$ there are no bits, every tuple fails, and the bound is equality. The full proof is checked by the Lean kernel.
:::

This common-valuation count is the classical argument in Shor (1997), Section 5, PDF page 16; no new mathematical priority is claimed. The application below follows the pinned `Blueprint/D5/S3/FiniteGroups/Cyclic/HalfOrderSynchronization.md`, `Blueprint/D5/S3/Quantum/ShorContinuedFractions.md`, and the attribution in `Library/QuantumChannels/shor1997gateorbits.md`. It derives consequences from the count and the order, congruence, and coprime-cancellation facts; the GID above does not certify an entire factoring procedure.

::: {.example #ex-shor-actual-unit-factors title="Actual-Unit CRT Counts and Both Factor Certificates on the Same Event"}
**Full prime powers.** Take any odd natural $N>1$. Let $I$ be its set of distinct prime factors, $k=|I|$, and put

$$
e_p=N.\operatorname{factorization}(p),\qquad
G_p=(\mathbb Z/p^{e_p}\mathbb Z)^\times,\qquad
U_N=(\mathbb Z/N\mathbb Z)^\times.
$$

The index set is nonempty, every $e_p>0$, and every $p$ is an odd prime. Each full prime-power unit group $G_p$ is cyclic. Its literal unit $-1$ squares to $1$ and differs from $1$, so has order $2$. Indeed, $p^{e_p}\ge p\ge3$, whereas $-1=1$ modulo $n$ is possible only for $n=1$ or $2$.

The Chinese remainder ring equivalence lifts to a multiplicative equivalence

$$
\mathcal E:U_N\ \simeq\ \prod_{p\in I}G_p.
$$

The pinned construction applies `Units.mapEquiv` to the multiplicative equivalence of `ZMod.equivPi N hN`, then composes with `MulEquiv.piUnits`, where $h_N$ proves $N\ne0$. It preserves true orders and every natural power, and sends literal $-1$ to coordinatewise literal $-1$. Consequently, for

$$
\operatorname{Good}(u)\ \Longleftrightarrow\
\operatorname{Even}(\operatorname{ord}(u))\ \land\
u^{\operatorname{ord}(u)/2}\ne-1,
$$

we have $\operatorname{Good}(u)\Longleftrightarrow\operatorname{Good}_{(-1)_p}(\mathcal E(u))$. Restricting $\mathcal E$ to the failure subtypes gives a bijection between actual failing units and failing tuples. `Nat.card_congr` transports their equal cardinalities together with equality of the full carrier cardinalities. In particular, if

$$
\begin{aligned}
T&=|U_N|=\prod_{p\in I}|G_p|,\\
F&=|\{u\in U_N:\neg\operatorname{Good}(u)\}|,\qquad
S=|\{u\in U_N:\operatorname{Good}(u)\}|,
\end{aligned}
$$

then [@thm-half-order-family-failure-count] yields $F\,2^{k-1}\le T$. Here $T>0$ because the carrier contains the identity, $2^{k-1}>0$, and $S+F=T$. Dividing by these positive quantities in the real or rational numbers gives

$$
\Pr_{u\sim\operatorname{Unif}(U_N)}[\operatorname{Good}(u)]
=\frac ST=1-\frac FT\ge1-\frac1{2^{k-1}}.
$$

This probability uses **uniform sampling of the full actual unit group**. The identity remains sampled and has false Good, since its order is $1$. If $N$ is not a prime power, its prime-factor set is nonempty and does not have cardinality $1$ (`isPrimePow_iff_card_primeFactors_eq_one`), so $k\ge2$. The failure proportion is then at most $1/2$ and success at least $1/2$. Prime powers with $k=1$ remain covered by the count, which gives only the lower bound $0$ for success. Every actual exponent is retained, with no squarefree restriction.

**The same Good gives both proper factors.** This deterministic step requires only natural $N>2$ and $\gcd(a,N)=1$; it also applies to even $N$. Let $u$ be the unit represented by $a$, put $r=\operatorname{ord}(u)$, and assume $\operatorname{Good}(u)$. Finiteness gives $r>0$, and evenness gives $m=r/2$ with $0<m<r$. Minimality of the true order excludes $u^m=1$, Good excludes $u^m=-1$, and

$$
(u^m)^2=u^{2m}=u^r=1.
$$

An arbitrary even period cannot replace the true order here. Coprimality and $N>2$ exclude $a=0$, so $a\ge1$ and the natural number $x=a^m\ge1$. Coercing the unit power to $\mathbb Z/N\mathbb Z$ identifies the residue of $x$ with $u^m$. The bound $1\le x$ permits `Nat.cast_sub` to identify natural subtraction $x-1$ with the ring difference. Therefore

$$
\begin{aligned}
N&\mid(x-1)(x+1),\\
N&\nmid x-1,\qquad N\nmid x+1.
\end{aligned}
$$

The first line follows because $(x-1)(x+1)=x^2-1$ has zero residue; the second follows from $u^m\ne1$ and $u^m\ne-1$, respectively. If $\gcd(x-1,N)=1$, coprime cancellation in the product forces $N\mid x+1$, a contradiction. Symmetrically, $\gcd(x+1,N)=1$ forces $N\mid x-1$, also a contradiction. Each gcd is positive and at most $N$; equality to $N$ would force divisibility of the corresponding factor. Thus, simultaneously,

$$
\begin{aligned}
1&<\gcd(a^m-1,N)<N,\qquad \gcd(a^m-1,N)\mid N,\\
1&<\gcd(a^m+1,N)<N,\qquad \gcd(a^m+1,N)\mid N.
\end{aligned}
$$

**Changing representatives preserves the gcd pair.** Keep $N>2$. For an actual unit $u$, put $m=\operatorname{ord}(u)/2$, let $b$ be the canonical natural representative of $u$, and let $t$ be the canonical natural representative of $u^m$. Both are coprime to $N$, hence $b,t\ge1$. Every natural representative $a$ satisfying $(a:\mathbb Z/N\mathbb Z)=u$ is also coprime to $N$ and satisfies $a\ge1$. Compatibility of powers with residues gives

$$
a^m\equiv t\pmod N,\qquad b^m\equiv t\pmod N.
$$

These are congruences, not natural-number equalities. Since $a^m,b^m,t$ are all at least $1$, `Nat.ModEq.sub` permits subtraction of $1$ on both sides; addition of $1$ preserves congruence directly. Applying `Nat.ModEq.gcd_eq` gives

$$
\begin{aligned}
\bigl(\gcd(a^m-1,N),\gcd(a^m+1,N)\bigr)
&=\bigl(\gcd(t-1,N),\gcd(t+1,N)\bigr),\\
\bigl(\gcd(b^m-1,N),\gcd(b^m+1,N)\bigr)
&=\bigl(\gcd(t-1,N),\gcd(t+1,N)\bigr).
\end{aligned}
$$

The two certificates therefore hold for the original representative's power, the canonical base's power, and the canonical half-power representative. Write $\operatorname{Both}_N(z)$ when each of $\gcd(z-1,N)$ and $\gcd(z+1,N)$ divides $N$ and lies strictly between $1$ and $N$. The certified event is explicitly

$$
\begin{aligned}
C(u)\ \Longleftrightarrow\ &\operatorname{Good}(u)\ \land\ \operatorname{Both}_N(b^m)\ \land\ \operatorname{Both}_N(t)\\
&\land\ \bigl(\forall a\in\mathbb N,\ (a:\mathbb Z/N\mathbb Z)=u
\Rightarrow\operatorname{Both}_N(a^m)\bigr).
\end{aligned}
$$

The deterministic argument proves $\operatorname{Good}(u)\Rightarrow C(u)$; projection to the first conjunct proves the converse. The identity map thus restricts to a bijection of the success subtypes, so

$$
|\{u\in U_N:C(u)\}|=S.
$$

Returning to uniform unit sampling for odd $N>1$, the same event with both certificates has probability exactly $S/T$. It inherits the bound $1-1/2^{k-1}$, and at least $1/2$ when $N$ is not a prime power. Adjoining certificates changes neither the success event nor its sampling carrier.
:::

Classical unit sampling and the preceding actual quantum measurement at a fixed base are different random choices. Their Good and candidate-list probabilities cannot simply be multiplied: a combination needs an explicit common sampling law and the appropriate conditional probabilities. The all-pairs least-common-multiple list-membership bound for exactly two actual observations has been derived above under an explicit independent-reset premise, and least-passing-entry selection gives the same bound for exact output. The argument still supplies no efficient uniform-unit sampler, certified exact-order selector from the full candidate least-common-multiple list, guarantee for arbitrary correlated repetitions, complete recursive prime-factorization implementation, or bit and gate complexity. Concentration of the conditional posterior comb retains its earlier literature boundary.
