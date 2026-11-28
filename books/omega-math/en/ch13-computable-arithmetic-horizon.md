# Chapter 13 Euclid Prime Escape, Finite Continued Fractions, and Quarter-Depth Budgets

Having constructed rational harmonic analysis on the three-sphere across Volume IV — from the integer-coefficient Chebyshev character kernels of [Chapter 10](ch10-peter-weyl-rational-spin-shells.md) and the $\pi$-free factorial Haar integral of [Chapter 11](ch11-pi-free-haar-integration.md) to the zero-axiom quadratic extensions and rational Schur positivity of [Chapter 12](ch12-algebraic-extensions-and-schur-positivity.md) — we now enter Volume V: **Adelic Arithmetic and Rational Hecke–Riemann Spectral Theory**.

Classical number theory routinely begins from a Platonic premise: that the natural numbers $\mathbb{N}$ form a completed infinite totality and that the primes $\mathbb{P}$ sit already laid out along an infinite number line. Analytic number theory then layers on the real completion $\mathbb{R}$, infinite limits, and the transcendental logarithm $\ln x$. In zero-axiom rational mathematics without infinity or transcendentals (`OmegaMath`), we face a foundational challenge before touching a single spectrum: **if we reject completed infinities, limits, and transcendental functions, can the three workhorses of arithmetic — the inexhaustibility of primes, best rational approximation, and geometric error-decay budgets — be rebuilt entirely as finite, terminating, executable integer constructions?**

This chapter delivers three affirmative answers and anchors all core integer pillars in D5 on the strict backend (`strict_omega.axioms: []`). First, we formalize Bézout's identity and the **Euclid Prime-Escape theorem** with literal zero axioms, replacing the static claim of infinitely many primes with a constructive proof that every finite natural-number list of positive product carries a blind-spot witness $N_S = 1 + \prod S$ birthing a fresh prime outside the list. Second, we anchor the **Euler–Wallis convergent determinant** and automatic convergent coprimality in zero axioms, pairing them with classical Layer-2 Lean theorems on reduced denominators, logarithmic convergent length, and executable prime-factor order stripping in decidable monoids. Third, we certify the **quarter-depth integer budget inequality** in literal zero axioms and contrast it with the Layer-2 real-shadow bridge onto classical real majorants.

## 13.1 From Completed Infinite Sets to the Computable Arithmetic Horizon

An observer inside a finite computational horizon holds only finite integer tables and finite arithmetic loops. Traditional textbooks often frame Euclid's proof by contradiction: suppose only finitely many primes exist, derive an absurdity, and conclude that $\mathbb{P}$ is an infinite set. Within bare inductive type theory, turning a constructive procedure into a proof by contradiction hides the real engine beneath an unnecessary classical detour.

From a zero-axiom standpoint, arithmetic is governed not by completed infinities but by **computable closure and escape rules**. For any natural numbers $a, b$ with $b > 0$, **Euclidean division** terminates in at most $a$ bounded steps and outputs unique quotient $q$ and remainder $r$ satisfying

$$
a = q b + r, \qquad 0 \le r < b.
$$

Iterating the Euclidean step $(a, b) \mapsto (b, a \bmod b)$ produces a strictly decreasing sequence of remainders that reaches $0$ in finitely many steps, yielding $\gcd(a, b)$ (with $\gcd(0, 0) = 0$). Back-substituting the quotients along that finite trace yields the following **zero-axiom Bézout identity**, checked in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch13-bezout-identity title="Natural-Number Bézout Identity" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.bezout_identity"}
The cited D5 declarations record `strict_omega.axioms: []`. For all natural numbers $a, b \in \mathbb{N}$ (`Omega.Nat`, including zero inputs), there exist signed integers $x, y \in \mathbb{Z}$ (`Omega.Int`) satisfying

$$
a x + b y = \gcd(a, b).
$$

:::

::: {.proof}
The proof proceeds by strong induction on the second argument $b$. In the base case $b = 0$, we have $\gcd(a, 0) = a$ and the choice $(x, y) = (1, 0)$ satisfies $a \cdot 1 + 0 \cdot 0 = a$. When $b > 0$, Euclidean division yields $a = q b + r$ with $0 \le r < b$ and $\gcd(a, b) = \gcd(b, r)$. Applying the inductive hypothesis to the strictly smaller remainder $r < b$ produces integers $x', y'$ with $b x' + r y' = \gcd(b, r)$. Substituting $r = a - q b$ gives $a y' + b (x' - q y') = \gcd(a, b)$, so setting $x = y'$ and $y = x' - q y'$ completes the zero-axiom construction. The full proof is checked by the Lean kernel.
:::

Euclidean division together with [@thm-ch13-bezout-identity] already unlocks the core of elementary arithmetic: whenever a prime $p$ divides a product $a b$ and $p \nmid a$, we have $\gcd(p, a) = 1$, and multiplying $p x + a y = 1$ by $b$ yields $p (b x) + (a b) y = b$, forcing $p \mid b$ (Euclid's lemma, proved purely constructively with no completed infinity or choice; `by direct algebraic derivation`).

## 13.2 Euclidean Division, Bézout's Identity, and the Euclid Prime-Escape Mechanism

Restoring Euclid's ancient argument from contradiction back to an explicit algorithm yields the first dynamical law of the arithmetic horizon: **every finite list of positive natural numbers — in particular, every finite prime list — leaves a common blind spot, and stepping into that blind spot deterministically generates a new prime outside the list within a bounded search.**

::: {.definition #def-ch13-euclid-escape-witness title="Euclid Prime-Escape Witness and Smallest Prime Divisor Search"}
For any finite list of natural numbers $S = [a_1, a_2, \dots, a_k]$ (including the empty list $S = []$, with empty product $1$; every finite prime list satisfies $\prod S > 0$), define its **Euclid product-plus-one witness** by

$$
N_S := 1 + \prod_{a \in S} a \;\ge\; 2 \qquad \bigl(\text{whenever } \prod S > 0\bigr).
$$

For every integer $n \ge 2$, define the **bounded smallest prime divisor operator** $\operatorname{minPrimeDiv}(n)$ as the least divisor of $n$ in the finite range $\{2, 3, \dots, n\}$:

$$
\operatorname{minPrimeDiv}(n) := \min\{\, d \in \{2, 3, \dots, n\} : d \mid n \,\}.
$$

:::

This construction needs no non-constructive existence principle, and its full prime-escape law is formally anchored in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch13-euclid-prime-escape title="Euclid Prime-Escape Theorem" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape"}
The cited D5 declarations record `strict_omega.axioms: []`. Let $s$ be any finite natural-number list (`s : NatList`) with strictly positive product ($0 < s.\mathrm{prod}$). Then there exists a natural number $p$ satisfying simultaneously

$$
\operatorname{IsPrime}(p) \;\wedge\; \bigl(p \mid (s.\mathrm{prod} + 1)\bigr) \;\wedge\; p \notin s.
$$

:::

::: {.proof}
From $0 < s.\mathrm{prod}$ we have $s.\mathrm{prod} \ge 1$, so the witness $N_s := s.\mathrm{prod} + 1$ satisfies $N_s \ge 2$. Within the finite range $\{2, \dots, N_s\}$, $N_s$ divides itself, so bounded smallest-divisor search returns a least divisor $p$ with $2 \le p \le N_s$ and $p \mid N_s$. Any proper divisor $1 < a < p$ of $p$ would divide $N_s$ by transitivity, contradicting minimality; hence $\operatorname{IsPrime}(p)$ holds. For escape, if $p \in s$ then $p \mid s.\mathrm{prod}$; combined with $p \mid (s.\mathrm{prod} + 1)$ this forces $p \mid 1$ (mirrored arithmetically by remainder $1$ and the Bézout certificate $1 \cdot N_s - M_p \cdot p = 1$), contradicting primality ($p \ge 2$). Therefore $p \notin s$. The full proof is checked by the Lean kernel.
:::

One classic misconception must be guarded against: **the witness $N_S$ itself need not be prime.** [@thm-ch13-euclid-prime-escape] guarantees that $N_S$ possesses a prime divisor outside $S$ (such as the bounded smallest divisor $q = \operatorname{minPrimeDiv}(N_S)$), not that $N_S$ stays indivisible. The worked ledger below exhibits the exact threshold where $N_S$ first splits.

::: {.example #ex-ch13-euclid-escape-chain title="Worked Constructive Prime-Escape Chain: From Empty List to 30031 = 59 × 509"}
Starting from the empty list, compute $N_S$, its remainder modulo every $p \in S$, and its smallest prime divisor $q = \operatorname{minPrimeDiv}(N_S)$ for the initial prime prefixes (illustrating [@thm-ch13-euclid-prime-escape] and [@thm-ch13-bezout-identity]):

| Finite prime list $S$ | Product $\prod S$ | Witness $N_S = 1 + \prod S$ | Remainders mod $p \in S$ | Smallest prime $q$ | Full factorization of $N_S$ |
| :--- | ---: | ---: | :---: | ---: | :--- |
| $[]$ | $1$ | $2$ | (vacuous) | $2$ | $2$ (prime) |
| $[2]$ | $2$ | $3$ | $1$ | $3$ | $3$ (prime) |
| $[2, 3]$ | $6$ | $7$ | $1, 1$ | $7$ | $7$ (prime) |
| $[2, 3, 5]$ | $30$ | $31$ | $1, 1, 1$ | $31$ | $31$ (prime) |
| $[2, 3, 5, 7]$ | $210$ | $211$ | $1, 1, 1, 1$ | $211$ | $211$ (prime) |
| $[2, 3, 5, 7, 11]$ | $2310$ | $2311$ | all $1$ | $2311$ | $2311$ (prime) |
| $[2, 3, 5, 7, 11, 13]$ | $30030$ | $30031$ | all $1$ | $59$ | $59 \times 509$ (composite) |

Across the first six rows, $N_S$ happens to be prime itself; at the seventh row $S = [2, 3, 5, 7, 11, 13]$, $N_S = 30031$ first factors into the composite product $59 \times 509$. Even so, $30031$ leaves remainder $1$ upon division by each of $2, 3, 5, 7, 11, 13$, bounded trial division captures the fresh prime $q = 59 \notin S$ on the spot, and explicit Bézout identities such as $1 \cdot 30031 - 2310 \cdot 13 = 1$ certify in pure integer arithmetic that no prior prime can divide $N_S$.
:::

## 13.3 Finite Continued Fractions, the Euler–Wallis Determinant, and the Logarithmic Length Bound

Collecting the successive quotients of the Euclidean algorithm carries divisibility seamlessly into **finite continued fractions**. Given any rational $x \in \mathbb{Q}$, set $a_0 = \lfloor x \rfloor$; as long as the fractional part $\operatorname{fract}(x) = x - \lfloor x \rfloor$ is nonzero, invert it and take the floor again. Because each inversion strictly lowers the reduced denominator, the process terminates in finitely many stages $m$, producing partial quotients $[a_0; a_1, \dots, a_m]$ with $a_0 \in \mathbb{Z}$ and $a_k \in \mathbb{Z}_{\ge 1}$ for $k \ge 1$.

::: {.definition #def-ch13-euler-wallis-convergents title="Finite Continued-Fraction Convergents and the Euler–Wallis Recurrence"}
Given partial quotients $[a_0; a_1, \dots, a_m]$ ($a_0 \in \mathbb{Z}$, $a_k \ge 1$ for $1 \le k \le m$), define the **Euler–Wallis numerator and denominator sequences** $(p_n), (q_n)$ by

$$
p_{-2} = 0,\quad p_{-1} = 1,\qquad q_{-2} = 1,\quad q_{-1} = 0,
$$

together with the second-order linear integer recurrence

$$
p_n = a_n p_{n-1} + p_{n-2}, \qquad q_n = a_n q_{n-1} + q_{n-2} \qquad (0 \le n \le m).
$$

Writing $M_k := \begin{pmatrix} a_k & 1 \\ 1 & 0 \end{pmatrix} \in \mathrm{GL}_2(\mathbb{Z})$, every stage $0 \le n \le m$ satisfies the matrix product identity

$$
\begin{pmatrix} p_n & p_{n-1} \\ q_n & q_{n-1} \end{pmatrix}
= M_0 M_1 \cdots M_n.
$$

:::

This $2 \times 2$ integer matrix product exposes the algebraic rigidity of continued fractions at once: every step matrix has determinant $\det(M_k) = a_k \cdot 0 - 1 \cdot 1 = -1$, so evaluating a finite natural-number partial-quotient list `coeffs` of length `coefficientCount coeffs` flips the determinant sign at every step while preserving unit area. Both the **Euler–Wallis convergent determinant identity** and automatic **convergent coprimality** are formally verified in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch13-cf-convergent-determinant title="Finite Continued-Fraction Convergent Determinant Identity" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_determinant"}
The cited D5 declarations record `strict_omega.axioms: []`. For every finite list of natural-number partial quotients $\mathrm{coeffs} : \mathrm{NatList}$, the integer determinant of its Euler–Wallis convergent pair $\operatorname{convergentPair}(\mathrm{coeffs})$ satisfies

$$
\bigl(\operatorname{convergentPair}(\mathrm{coeffs})\bigr).\mathrm{determinant} = (-1)^{\operatorname{coefficientCount}(\mathrm{coeffs})}.
$$

:::

::: {.proof}
The proof proceeds by structural induction on `coeffs : NatList`. For the empty list (`coefficientCount = 0`), the base convergent pair is the identity matrix $\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ (corresponding to $p_{-1} = 1, p_{-2} = 0, q_{-1} = 0, q_{-2} = 1$), whose determinant is $1 = (-1)^0$. Each step incorporating a partial quotient $a \in \mathbb{N}$ acts via $M(a) = \begin{pmatrix} a & 1 \\ 1 & 0 \end{pmatrix}$ and satisfies $(a p + p') q - p (a q + q') = -(p q' - p' q)$, multiplying the determinant by $-1$ while incrementing `coefficientCount` by $1$. For a nonempty prefix $[a_0, \dots, a_m]$ (coefficient count $m + 1$), this reads $p_m q_{m-1} - p_{m-1} q_m = (-1)^{m+1}$, equivalently $p_{n+1} q_n - p_n q_{n+1} = (-1)^{n+2} = (-1)^n$ for $-1 \le n \le m - 1$. The full proof is checked by the Lean kernel.
:::

The unit determinant immediately enforces our first zero-axiom structural corollary: every convergent fraction is automatically in lowest terms, requiring no secondary reduction.

::: {.theorem #thm-ch13-cf-convergent-coprime title="Coprimality of Continued-Fraction Convergent Numerator and Denominator" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_coprime"}
The cited D5 declarations record `strict_omega.axioms: []`. For every finite list of natural-number partial quotients $\mathrm{coeffs} : \mathrm{NatList}$ with convergent numerator $\mathrm{num}$ and denominator $\mathrm{den}$ in $\operatorname{convergentPair}(\mathrm{coeffs})$, any natural number $d \in \mathbb{N}$ dividing both $\mathrm{num}$ and $\mathrm{den}$ ($d \mid \mathrm{num}$ and $d \mid \mathrm{den}$) satisfies

$$
d = 1.
$$

:::

::: {.proof}
By [@thm-ch13-cf-convergent-determinant], the determinant formed from $\mathrm{num}$, $\mathrm{den}$, and the preceding convergent pair equals $(-1)^{\operatorname{coefficientCount}(\mathrm{coeffs})} \in \{-1, 1\}$. Since $d \mid \mathrm{num}$ and $d \mid \mathrm{den}$, the natural number $d$ divides this integer linear combination $\pm 1$, forcing $d \mid 1$ in `Omega.Nat` and therefore $d = 1$. The full proof is checked by the Lean kernel.
:::

Dividing the determinant identity by the positive product $q_n q_{n+1}$ yields a second free corollary (`by direct algebraic derivation`): adjacent convergents satisfy $\frac{p_{n+1}}{q_{n+1}} - \frac{p_n}{q_n} = \frac{(-1)^n}{q_n q_{n+1}}$, bracketing the target rational from alternating sides inside a purely rational interval of width $(q_n q_{n+1})^{-1}$.

In the classical `Mathlib` layer of the pinned `trureturing` library, both the canonical denominator formula for reduced rationals and the logarithmic length bound for the executable Euclidean convergent list are also formally verified:

::: {.theorem #thm-ch13-reduced-den title="Exact GCD Formula for Reduced Rational Denominators" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den"}
For all natural numbers $s, r \in \mathbb{N}$ with $0 < r$, put $\operatorname{reduced}(s, r) := (s : \mathbb{Q}) / r$. Its canonical positive denominator equals

$$
\operatorname{den}\bigl(\operatorname{reduced}(s, r)\bigr) = \frac{r}{\gcd(s, r)}.
$$

:::

::: {.proof}
Constructing the canonical rational `mkRat s r` for $r > 0$ divides both numerator $s$ and denominator $r$ by $\gcd(s, r)$, leaving the reduced denominator exactly $r / \gcd(s, r)$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch13-convergents-length-log title="Logarithmic Length Bound for Rational Continued-Fraction Convergents" lean="D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log"}
For every rational number $x \in \mathbb{Q}$, define the executable Euclidean convergent list $\operatorname{convergents}(x) : \mathrm{List}\,\mathbb{Q}$ recursively by returning $[\lfloor x \rfloor]$ when $\operatorname{fract}(x) = 0$, and otherwise prepending $\lfloor x \rfloor$ to the image of $\operatorname{convergents}(\operatorname{fract}(x)^{-1})$ under $z \mapsto \lfloor x \rfloor + z^{-1}$. Then the length of this finite list obeys

$$
\operatorname{length}\bigl(\operatorname{convergents}(x)\bigr) \le 2\lfloor\log_2 \operatorname{den}(x)\rfloor + 1,
$$

where $\lfloor\log_2 d\rfloor$ denotes the natural base-$2$ floor logarithm (`Nat.log 2 d`, with `Nat.log 2 1 = 0`).
:::

::: {.proof}
The proof proceeds by strong induction on $d = \operatorname{den}(x)$. When $\operatorname{fract}(x) = 0$, the list has length $1 \le 2\lfloor\log_2 d\rfloor + 1$. Otherwise set $t = \operatorname{fract}(x)^{-1}$, whose denominator satisfies $\operatorname{den}(t) < d$; if $\operatorname{fract}(t) = 0$, then $d \ge 2$ forces $\lfloor\log_2 d\rfloor \ge 1$ and the list has length $2 \le 3 \le 2\lfloor\log_2 d\rfloor + 1$. If $\operatorname{fract}(t) \neq 0$, put $u = \operatorname{fract}(t)^{-1}$. Because $\lfloor t \rfloor \ge 1$, the key lemma `second_den_sum_le` establishes $\operatorname{den}(u) + \operatorname{den}(t) \le d$; combined with $\operatorname{den}(u) < \operatorname{den}(t)$ this yields $2\operatorname{den}(u) \le d$, so the denominator halves at least once every two Euclidean stages ($\lfloor\log_2 \operatorname{den}(u)\rfloor + 1 \le \lfloor\log_2 d\rfloor$). Applying the inductive hypothesis to $u$ completes the bound (counting complete-quotient stages, not bit operations). The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch13-fibonacci-convergents title="Worked Verification: Euler–Wallis Determinants and Length Bound for 34/21"}
Take the ratio of consecutive Fibonacci numbers $x = \frac{34}{21}$ (the worst-case growth profile for Euclidean stages). Checking [@thm-ch13-reduced-den] first on a reducible fraction, $\gcd(12, 30) = 6$ gives $\operatorname{den}(\operatorname{reduced}(12, 30)) = 30 / 6 = 5$; for $x = 34/21$, $\gcd(34, 21) = 1$ gives $\operatorname{den}(34/21) = 21$. Expanding $\frac{34}{21} = [1; 1, 1, 1, 1, 1, 2]$ produces all $7$ convergents and their Euler–Wallis determinants (illustrating [@thm-ch13-cf-convergent-determinant] and [@thm-ch13-cf-convergent-coprime], with row $n$ matching the prefix of coefficient count $k = n + 2$):

| Stage $n$ | Partial quotient $a_n$ | Convergent $p_n / q_n$ | Determinant $p_{n+1} q_n - p_n q_{n+1}$ | $(-1)^n = (-1)^{n+2}$ |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $1$ | $1 / 1$ | $2\cdot 1 - 1\cdot 1 = +1$ | $+1$ |
| $1$ | $1$ | $2 / 1$ | $3\cdot 1 - 2\cdot 2 = -1$ | $-1$ |
| $2$ | $1$ | $3 / 2$ | $5\cdot 2 - 3\cdot 3 = +1$ | $+1$ |
| $3$ | $1$ | $5 / 3$ | $8\cdot 3 - 5\cdot 5 = -1$ | $-1$ |
| $4$ | $1$ | $8 / 5$ | $13\cdot 5 - 8\cdot 8 = +1$ | $+1$ |
| $5$ | $1$ | $13 / 8$ | $34\cdot 8 - 13\cdot 21 = 272 - 273 = -1$ | $-1$ |
| $6$ | $2$ | $34 / 21$ | (terminates) | — |

Every convergent is certified coprime by [@thm-ch13-cf-convergent-coprime]. Testing [@thm-ch13-convergents-length-log]: since $2^4 = 16 \le 21 < 32 = 2^5$, we have $\lfloor\log_2 21\rfloor = 4$, giving upper bound $2 \times 4 + 1 = 9 \ge 7$. At every double step the Fibonacci sum confirms the halving inequality directly: $8 + 13 = 21 \le 21$ and $3 + 5 = 8 \le 8$.
:::

The static figure below places the chapter's three zero-axiom arithmetic pillars side by side: the Euclid prime-escape chain through $30031 = 59 \times 509$ ([@thm-ch13-euclid-prime-escape], [@ex-ch13-euclid-escape-chain]), the Euler–Wallis alternating determinant chain for $34/21$ ([@thm-ch13-cf-convergent-determinant], [@thm-ch13-cf-convergent-coprime], [@ex-ch13-fibonacci-convergents]), and a preview of the base-$4$ quarter-depth integer budget $70 < 128$ formalized in Section 13.5 ([@thm-ch13-omega-quarter-depth-integer], [@ex-ch13-quarter-depth-worked]).

::: {.figure src="ch13-euclid-cf-depth"}
**Prime escape, finite continued fractions, and quarter-depth budgets.** The figure juxtaposes the Euclid witness sequence $N_S = 1 + \prod S$ reaching its first composite split at $30031 = 59 \times 509$ ([@thm-ch13-euclid-prime-escape]), the seven Euler–Wallis convergents of $34/21$ preserving alternating unit determinant $p_{n+1}q_n - p_n q_{n+1} = (-1)^n$ and automatic coprimality ([@thm-ch13-cf-convergent-determinant], [@thm-ch13-cf-convergent-coprime]), and the limit-free integer budget $70 < 2 \cdot 4^3 = 128$ certified at sharp depth $N = 2$ for majorant $7/2$ and tolerance $1/10$ ([@thm-ch13-omega-quarter-depth-integer]).
:::

## 13.4 Executable Prime-Factor Stripping in Decidable Monoids

Finite arithmetic algorithms extend well beyond fraction reduction. Suppose an operator or rotation $x$ in a monoid $G$ with decidable equality returns to the identity after $m > 0$ steps ($x^m = 1$), and we wish to find its **exact minimal period (order)** $\operatorname{orderOf}(x)$. We do not need to scan all $m$ exponents: given any finite list $P$ covering the prime divisors of $m$, repeatedly testing whether dividing the current exponent by $p \in P$ preserves $x^{n/p} = 1$ strips away every extraneous factor and lands squarely on $\operatorname{orderOf}(x)$.

::: {.theorem #thm-ch13-strip-factors-correct title="Correctness of Executable Prime-Factor Stripping for Element Order" lean="D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct"}
Let $G$ be a monoid with decidable equality (`DecidableEq`), let $x \in G$, and let $m \in \mathbb{N}$ satisfy $0 < m$ and $x^m = 1$. Let $P : \mathrm{List}\,\mathbb{N}$ be any finite list covering all prime divisors of $m$ (for every prime $p$, $p \mid m \implies p \in P$; duplicates and extra naturals are permitted). Define $\operatorname{stripFactor}(x, p, n)$ to recurse on $n/p$ whenever $1 < p$, $0 < n$, $p \mid n$, and $x^{n/p} = 1$, returning $n$ otherwise, and let $M := \operatorname{stripFactors}(x, P, m)$ fold $\operatorname{stripFactor}$ over $P$. Then

$$
0 < M, \qquad M \mid m, \qquad x^M = 1, \qquad M = \operatorname{orderOf}(x).
$$

:::

::: {.proof}
Strong induction on $m$ first establishes the single-factor invariant for $M_p = \operatorname{stripFactor}(x, p, m)$: $0 < M_p$, $m = p^k M_p$ for some $k \in \mathbb{N}$, $x^{M_p} = 1$, and whenever $1 < p$, $p \nmid M_p / \operatorname{orderOf}(x)$ (otherwise $M_p / p$ would still be a multiple of $\operatorname{orderOf}(x)$, forcing $x^{M_p / p} = 1$ and contradicting termination). Induction along the list $P$ preserves $0 < M$, $M \mid m$, and $x^M = 1$, while ensuring $p \nmid M / \operatorname{orderOf}(x)$ for every $p \in P$ with $1 < p$. Because $P$ covers all prime divisors of $m$ (and hence of $M$), the quotient $M / \operatorname{orderOf}(x)$ has no prime divisors and must equal $1$, so $M = \operatorname{orderOf}(x)$ (no complexity claim is attached to the theorem). The full proof is checked by the Lean kernel.
:::

As a concrete hand check, in the multiplicative group $(\mathbb{Z}/13\mathbb{Z})^\times$, we know $3^{12} \equiv 1 \pmod{13}$ and $P = [2, 3]$ covers the primes dividing $12 = 2^2 \cdot 3$. Stripping $p = 2$ tests $3^6 \equiv 729 \equiv 1 \pmod{13}$ (reducing to $6$) and $3^3 \equiv 27 \equiv 1 \pmod{13}$ (reducing to $3$); stripping $p = 3$ tests $3^1 \equiv 3 \not\equiv 1 \pmod{13}$ and halts, returning the exact order $M = 3 = \operatorname{orderOf}(3)$ (`by direct algebraic derivation`).

## 13.5 Computable Quarter-Depth Integer Budgets and Limit-Free Real Transfer

Analytic number theory and spectral estimates abound with arguments that appear inseparable from real logarithms and limits: given a majorant $C > 0$ and a tolerance $\varepsilon > 0$, because $(1/4)^N \to 0$, there exists a convolution depth $N$ such that $(1/4)^{N+1} C < \varepsilon$. In classical real analysis, locating $N$ invokes either a non-constructive convergence threshold or an irrational logarithm $\log_4(C/\varepsilon)$ computed in floating point.

Yet the moment we bound the majorant by a rational fraction $C \le c/d$ and express the tolerance rationally as $\varepsilon = p/q$, the entire geometric budget collapses into a single total function of natural numbers:

$$
\operatorname{quarterDepth}(c, d, p, q) := \left\lfloor \log_4 \left\lfloor \frac{c q}{d p} \right\rfloor \right\rfloor.
$$

In the pinned `trureturing` library, this budget exhibits the monograph's cleanest separation between the **zero-axiom integer core** and the **Layer-2 real shadow**. First, the integer strict inequality itself is proved with **literal zero axioms (`strict_omega.axioms: []`)** in the strict build of D5 using `OmegaInit` and `OmegaMath`, importing neither Lean's standard `Init` nor `Mathlib`:

::: {.theorem #thm-ch13-omega-quarter-depth-integer title="Strict Integer Inequality for the Quarter-Depth Budget" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.quarterDepth_integer_sound"}
The cited D5 declarations record `strict_omega.axioms: []`. For all natural numbers $c, d, p, q, N \in \mathbb{N}$ (`Omega.Nat`) satisfying $0 < d$, $0 < p$, and $\operatorname{quarterDepth}(c, d, p, q) \le N$, the exact integer strict inequality holds:

$$
c \cdot q < (d \cdot p) \cdot 4^{N + 1}.
$$

:::

::: {.proof}
From $0 < d$ and $0 < p$ we have $d \cdot p > 0$. Set $m := \lfloor (c \cdot q) / (d \cdot p) \rfloor$ using zero-axiom natural Euclidean division in `Omega.Nat`. By the discrete base-$4$ construction of `quarterDepth`, the bound $\operatorname{quarterDepth}(c, d, p, q) \le N$ implies $m < 4^{N + 1}$, hence $m + 1 \le 4^{N + 1}$. Writing $c \cdot q = (d \cdot p) m + r$ with strict remainder bound $r < d \cdot p$ gives directly

$$
c \cdot q = (d \cdot p) m + r < (d \cdot p)(m + 1) \le (d \cdot p) \cdot 4^{N + 1},
$$

using only inductive natural-number arithmetic inside `OmegaInit` and `OmegaMath` with empty axiom closure. The full proof is checked by the Lean kernel.
:::

When classical analytic Weil–Burnol estimates require transferring this integer budget onto a real majorant $C \in \mathbb{R}$, the Layer-2 `Mathlib` module `BurnolRationalDepthBudget` provides the parallel `Init`/`Mathlib` integer certificate (`rationalQuarterDepth_integer_sound`) together with the one-way, limit-free real-shadow transfer (`rationalQuarterDepth_real_sound`):

::: {.theorem #thm-ch13-quarter-depth-integer title="Exact Integer Strict Inequality for the Quarter-Depth Budget" lean="D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound"}
For natural numbers $c, d, p, q \in \mathbb{N}$, define the computable integer depth

$$
\operatorname{rationalQuarterDepth}(c, d, p, q) := \operatorname{Nat.log}\; 4\; \bigl((c \cdot q) / (d \cdot p)\bigr),
$$

using natural floor division and the total convention $\operatorname{Nat.log}\; 4\; 0 = 0$. Whenever $0 < d$, $0 < p$, and $N \in \mathbb{N}$ satisfies $\operatorname{rationalQuarterDepth}(c, d, p, q) \le N$, the exact integer strict inequality holds:

$$
c q < (d p) \cdot 4^{N + 1}.
$$

:::

::: {.proof}
Set $m := \lfloor (c q) / (d p) \rfloor$. Because $d > 0$ and $p > 0$, we have $d p > 0$, and the hypothesis $\operatorname{Nat.log}\; 4\; m \le N < N + 1$ implies $m < 4^{N + 1}$, equivalently $m + 1 \le 4^{N + 1}$ in $\mathbb{N}$. Writing Euclidean division as $c q = (d p) m + r$ with $r < d p$ gives immediately

$$
c q = (d p) m + r < (d p)(m + 1) \le (d p) \cdot 4^{N + 1}.
$$

Not a single real number, logarithm, or floating-point rounding step appears anywhere in the proof. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch13-quarter-depth-real title="Limit-Free Real Transfer of the Quarter-Depth Integer Budget" lean="D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_real_sound"}
Let $c, d, p, q, N \in \mathbb{N}$ satisfy $0 < d$, $0 < p$, $0 < q$, and $\operatorname{rationalQuarterDepth}(c, d, p, q) \le N$. Then for every real number $C \in \mathbb{R}$ bounded above by $C \le \frac{c}{d}$, without any limiting argument,

$$
\left(\frac{1}{4}\right)^{N + 1} C < \frac{p}{q}.
$$

:::

::: {.proof}
Casting the exact integer inequality $c q < (d p) \cdot 4^{N + 1}$ from [@thm-ch13-quarter-depth-integer] into $\mathbb{R}$ and dividing both sides by the strictly positive product $d q \cdot 4^{N + 1}$ gives $\frac{c / d}{4^{N + 1}} < \frac{p}{q}$. Dividing $C \le \frac{c}{d}$ by $4^{N + 1} > 0$ and chaining the inequalities yields $(1/4)^{N + 1} C \le \frac{c / d}{4^{N + 1}} < \frac{p}{q}$. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch13-quarter-depth-worked title="Worked Example: Sharp Depth N = 2 for Majorant 7/2 and Error Budget 1/10"}
Take the rational majorant $\frac{c}{d} = \frac{7}{2}$ ($c = 7, d = 2$) and target error budget $\frac{p}{q} = \frac{1}{10}$ ($p = 1, q = 10$), and evaluate [@thm-ch13-omega-quarter-depth-integer] and [@thm-ch13-quarter-depth-real] by hand (`by direct algebraic derivation`). The cross products are $c q = 7 \times 10 = 70$ and $d p = 2 \times 1 = 2$, yielding natural quotient $\lfloor 70 / 2 \rfloor = 35$. Since $4^2 = 16 \le 35 < 64 = 4^3$, the computable depth is exactly

$$
N_0 = \operatorname{quarterDepth}(7, 2, 1, 10) = \lfloor\log_4 35\rfloor = 2.
$$

At $N = 2$, both the exact integer certificate and the real transfer bound hold cleanly:

$$
c q = 70 < (d p) \cdot 4^{2 + 1} = 2 \times 64 = 128,
\qquad
\left(\frac{1}{4}\right)^3 \cdot \frac{7}{2} = \frac{7}{128} = 0.0546875 < \frac{1}{10} = 0.1.
$$

Conversely, reducing the depth to $N = 1$ fails both tests immediately: $(d p) \cdot 4^{1 + 1} = 2 \times 16 = 32 < 70$ and $(1/4)^2 \cdot (7/2) = \frac{7}{32} = 0.21875 > 0.1$. Hence $N = 2$ is not only sufficient, but sharp.
:::

::: {.remark #rem-ch13-zero-axiom-horizon title="The Strict Integer Core and the Classical Real Shadow"}
Stepping back across the chapter's ten frozen theorems reveals a razor-sharp axiomatic boundary. Bézout's identity ([@thm-ch13-bezout-identity]), Euclid prime escape ([@thm-ch13-euclid-prime-escape]), the Euler–Wallis convergent determinant ([@thm-ch13-cf-convergent-determinant]), convergent coprimality ([@thm-ch13-cf-convergent-coprime]), and the integer quarter-depth inequality ([@thm-ch13-omega-quarter-depth-integer]) are all formally verified in the strict build of D5 using `OmegaInit` and `OmegaMath` with **literal zero axioms (`strict_omega.axioms: []`)**, touching neither classical choice, quotient axioms, nor real completeness. Meanwhile, [@thm-ch13-reduced-den], [@thm-ch13-convergents-length-log], [@thm-ch13-strip-factors-correct], and the classical `BurnolRationalDepthBudget` pair ([@thm-ch13-quarter-depth-integer] and [@thm-ch13-quarter-depth-real]) supply the Layer-2 `Mathlib` bridge whenever classical analytic Weil–Burnol majorants are needed — exemplifying the one-way shadow architecture audited across the full monograph in [Chapter 18](ch18-zero-axiom-kernel-and-shadow-bridge.md).
:::

The film below follows the chapter's hand-worked examples, threading Euclidean division, prime escape, finite continued fractions, and the quarter-depth budget into a single line.

::: {.film src="euclids-escape"}
**A division that always stops is enough to make primes escape, fractions close in, and error budgets land in integers (2 min 45 s).** A cyan bar cuts $30031$ into $2310$ blocks of $13$ plus a magenta remainder $1$, and the amber certificate $1 \cdot 30031 - 2310 \cdot 13 = 1$ leads to the green Bézout identity ([@thm-ch13-bezout-identity]). In the escape ledger the first six witnesses $2, 3, 7, 31, 211, 2311$ are prime; at $30031$ bounded trial division stops at the amber $59$, $30031 = 59 \times 509$, and the green tag points to [@thm-ch13-euclid-prime-escape]. Euclid's ladder unfolds $34/21$ as $[1; 1, 1, 1, 1, 1, 2]$, and the Euler–Wallis convergents $1/1$ through $34/21$ meet the length bound $7 \le 2 \cdot 4 + 1 = 9$ ([@thm-ch13-convergents-length-log]); the step determinant $-1$, the determinant $(-1)^7$ of $M(1)^6 M(2)$, and the neighbouring cross products $\pm 1$ correspond to [@thm-ch13-cf-convergent-determinant] and [@thm-ch13-cf-convergent-coprime], while the alternating gaps $1/(q_n q_{n+1})$ on the number line are a violet hand derivation. Finally, majorant $7/2$ and tolerance $1/10$ give $\lfloor 70/2 \rfloor = 35$ and depth $2$; the green integer inequality $70 < 128$ ([@thm-ch13-omega-quarter-depth-integer]) sits beside the classical shadow $7/128 < 1/10$ ([@thm-ch13-quarter-depth-real]), and depth $1$ fails. All worked numbers are computed on screen; "strict backend, zero axioms" appears only on the five theorems the chapter records that way.
:::

Before moving on to global adelic closure, you can test all three finite integer constructions interactively in the lab card below: step through the prime-escape chain up to $30031 = 59 \times 509$, trace the Euler–Wallis alternating determinants on $34/21$, and vary the rational majorant and tolerance to inspect the sharp quarter-depth threshold $70 < 128$.

::: {.viz src="adelic-arithmetic-observer-lab" preset="euclid-cf-quarter-depth" height="520"}
**Prime escape, continued fractions, and quarter-depth budget lab card (`euclid-cf-quarter-depth`).** Step interactively through finite prime lists and the Euclid witness $N_S = 1 + \prod S$ up to the composite split $30031 = 59 \times 509$ ([@thm-ch13-euclid-prime-escape]), inspect the Euler–Wallis convergents and alternating unit determinants $\pm 1$ for $34/21$ ([@thm-ch13-cf-convergent-determinant], [@thm-ch13-cf-convergent-coprime]), and verify the integer inequality $c q = 70 < (d p)\cdot 4^{N+1} = 128$ at sharp depth $N = 2$ for majorant $c/d = 7/2$ and tolerance $p/q = 1/10$ alongside its limit-free real shadow ([@thm-ch13-omega-quarter-depth-integer], [@thm-ch13-quarter-depth-real]).
:::

Finite arithmetic now guarantees that primes emerge on demand whenever stepping escapes all prior periods. Two deeper questions immediately arise: **across all metrics on $\mathbb{Q}$, how does flat archimedean stretching balance against every prime contraction? And when an odd prime leaves the commutative line to split into non-commuting integer spinors on the three-sphere $\mathbb{T}_3(\mathbb{Q})$, what free geometric labyrinth does it build?** We turn to these questions in [Chapter 14](ch14-adelic-closure-and-hurwitz-primes.md).
