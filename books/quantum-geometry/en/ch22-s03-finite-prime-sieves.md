# 22.3 The Polyhedral Prime Sieve Remainder and Phase-Oscillator Hand Calculation {#sec-ch22-3}

Write the complex exponent as $s = \sigma + it$, where the real part $\sigma = \operatorname{Re}(s)$ governs radial damping and the imaginary part $t = \operatorname{Im}(s)$ governs rotational frequency. Each prime mode in [@cor-dirichlet-sum-eq-euler-product] acts as an independent complex rotor:

$$
p^{-s} = p^{-\sigma - it} = p^{-\sigma} e^{-i t \ln p} = p^{-\sigma}\bigl(\cos(t\ln p) - i\sin(t\ln p)\bigr).
$$

In the complex plane, each prime $p$ acts as a **phase pointer (prime clock)** rotating uniformly at its intrinsic logarithmic angular frequency $\omega_p = \ln p$! Set every clock to twelve o'clock (reading $1$) at $t = 0$ and let go. Clock $2$ comes back to twelve every $2\pi/\ln 2 \approx 9.0647$ time units, clock $3$ every $2\pi/\ln 3 \approx 5.7192$. When clock $2$ completes its $12$th turn, clock $3$ has made $12\ln 3/\ln 2 \approx 19.01955$ turns and stands only $7.04^\circ$ past twelve: a near miss. Will the two ever be back at twelve together at some time $t \neq 0$?

::: {.figure src="ch22-prime-clocks"}
**Two prime clocks almost line up.** At $t = 12 \cdot 2\pi/\ln 2 \approx 108.78$, clock $2$ completes its $12$th turn and its amber hand points straight at twelve; at the same moment clock $3$ has turned $19.02$ times, and its hand is $7.04^\circ$ past twelve. The small magenta wedge is the part that fails to line up.
:::

Suppose they are: $t\ln 2 = 2\pi a$ and $t\ln 3 = 2\pi b$ with integers $a, b$. Multiply the first equation by $b$, the second by $a$, and subtract: $t\,(b\ln 2 - a\ln 3) = 0$, and as $t \neq 0$, $b\ln 2 = a\ln 3$. Since $\ln 2, \ln 3 > 0$, either $a$ and $b$ are both zero or they have the same sign; in the latter case take both positive and exponentiate, which gives $2^{b} = 3^{a}$, an even number equal to an odd one. Hence $a = b = 0$, so $t = 2\pi a/\ln 2 = 0$, contradicting $t \neq 0$. Only one mechanism is at work: exponentiation turns an integer relation among logarithms into an equality of prime-power products, and unique factorization forbids two products over disjoint sets of primes from being the same integer. The pinned module `D5/S3/Factorization/PrimeLogIndependence` freezes this mechanism for any finite set of primes, and `D5/S3/Weil/PrimeAddress/PrimeLogIndependence` restates it as linear independence over $\mathbb{Q}$.

::: {.theorem #thm-prime-log-independence title="Linear Independence of Prime Logarithms over the Integers and the Rationals" lean="D5/S3/Factorization/PrimeLogIndependence.prime_log_indep D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence"}
Write $\ln$ for the real natural logarithm (Mathlib's `Real.log`).

1. **Integer form**: let $S$ be a finite set of natural numbers each of which is prime, and let $k : \mathbb{N} \to \mathbb{Z}$ be any function. If the real equation

   $$
   \sum_{p \in S} k(p)\,\ln p \;=\; 0
   $$

   holds, then $k(p) = 0$ for every $p \in S$.
2. **Rational form**: the family of reals $p \mapsto \ln p$ indexed by the type of primes `Nat.Primes` is linearly independent over $\mathbb{Q}$ (`LinearIndependent ℚ`); that is, for every finite set $F$ of primes and every $c : \mathrm{Nat.Primes} \to \mathbb{Q}$, if $\sum_{p \in F} c(p)\,\ln p = 0$, then $c(p) = 0$ for every $p \in F$.
:::

::: proof
Item 1 follows the skeleton of the Lean file. Split $S$ by the sign of the coefficient into the disjoint parts $A = \{p \in S : k(p) \ge 0\}$ and $B = \{p \in S : k(p) < 0\}$, and move the terms from $B$ to the other side. Two logarithmic sums with nonnegative integer coefficients are now equal:

$$
\sum_{p \in A} k(p)\,\ln p \;=\; \sum_{p \in B} \bigl(-k(p)\bigr)\ln p .
$$

Exponentiating (primes are positive, so `Real.exp_log` applies) gives the real equation $\prod_{p \in A} p^{k(p)} = \prod_{p \in B} p^{-k(p)}$, which is then cast back to an equation between natural numbers. For $q \in A$, the prime factorization of the left side has exponent $k(q)$ at $q$; the right side contains only primes from $B$, and $q \notin B$, so its exponent there is $0$ (`Nat.factorization`). Hence $k(q) = 0$, and the primes of $B$ are handled in the same way. Item 2: [`prime_log_integer_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_integer_independence) embeds a finite set of primes back into $\mathbb{N}$ and obtains linear independence over $\mathbb{Z}$ from item 1; Mathlib's `LinearIndependent.iff_fractionRing` then passes from $\mathbb{Z}$ to its fraction field $\mathbb{Q}$. On paper this step is just clearing denominators: multiply rational coefficients by a common denominator to make them integers. The full proof is checked by the Lean kernel.
:::

Applying item 1 to any two distinct primes $p \neq q$ extends the opening argument to any two prime clocks (a manual derivation): if $t\ln p = 2\pi a$ and $t\ln q = 2\pi b$ for some $t \neq 0$, eliminating $t$ as before gives $b\ln p - a\ln q = 0$; with $S = \{p, q\}$, $k(p) = b$, $k(q) = -a$, item 1 yields $a = b = 0$, hence $t = 0$, a contradiction. **Once two prime clocks leave twelve o'clock together, they are never at twelve together again.** In the same way, the ratio $\ln q/\ln p$ of their periods is irrational: if it were $m/n$ with $n \neq 0$, then $n\ln q - m\ln p = 0$, and item 1 would force $n = 0$. The two periods are incommensurable.

::: {.example #ex-prime-clock-commas title="Prime Clocks That Almost Realign: Four Commas from Tuning"}
Raise the reading $p^{-it}$ of clock $p$ to an integer power $k_p$ (a negative power runs the hand backwards) and multiply the results for several clocks. This gives a **combined pointer**

$$
\prod_{p} \bigl(p^{-it}\bigr)^{k_p} \;=\; \Bigl(\frac{A}{B}\Bigr)^{-it} \;=\; e^{-it\ln(A/B)},
$$

where $A = \prod_{k_p > 0} p^{k_p}$ and $B = \prod_{k_p < 0} p^{-k_p}$. It turns at angular velocity $\ln(A/B) = \sum_p k_p \ln p$. By [@thm-prime-log-independence], as long as the coefficients are not all zero the combined pointer never stands still. It can, however, turn very slowly. Piano tuners know the following integer combinations well: they are the commas between pure fifths $3/2$, pure major thirds $5/4$ and octaves $2$. All numbers are rounded to the digits shown:

| Origin | $(k_2, k_3, k_5)$ | $A/B$ | $\ln(A/B)$ | Time per turn $2\pi/\ln(A/B)$ |
| :--- | :---: | :---: | :---: | :---: |
| 12 fifths against 7 octaves (Pythagorean comma) | $(-19, 12, 0)$ | $\frac{3^{12}}{2^{19}}$ | $0.0135510$ | $463.67$ |
| 4 fifths against 2 octaves and a major third | $(-4, 4, -1)$ | $\frac{3^{4}}{2^{4} \cdot 5}$ | $0.0124225$ | $505.79$ |
| first row divided by second row | $(-15, 8, 1)$ | $\frac{3^{8} \cdot 5}{2^{15}}$ | $0.0011285$ | $5567.67$ |
| an octave against 3 major thirds | $(7, 0, -3)$ | $\frac{2^{7}}{5^{3}}$ | $0.0237165$ | $264.93$ |

The first row is the near miss from the opening: $12\ln 3 - 19\ln 2 \approx 0.01955 \times \ln 2$, and the combined pointer needs $463.67$ time units for one turn. In every row, $A$ and $B$ (numerator and denominator) are exactly the two halves into which the Lean proof splits the coefficients by sign. They are built from disjoint sets of primes and so cannot be equal: $3^{12} = 531441$ is odd and $2^{19} = 524288$ is even, $3^{4} = 81$ has no factor $2$ or $5$, and likewise for the other two rows.

The theorem says only that $\ln(A/B) \neq 0$ and gives no lower bound, but its proof hides a crude one (a manual derivation): $A \neq B$ are positive integers, so they differ by at least $1$, and $\lvert\ln(A/B)\rvert \ge \ln\bigl(1 + 1/\min(A, B)\bigr)$. The second row, $81 = 80 + 1$, attains this bound exactly. Since $A$ and $B$ grow very fast with the exponents, the bound quickly becomes tiny; it is also only a bound, and the actual speed does not change monotonically with the size of $A$ and $B$: the third row uses lower powers of $2$ and $3$ than the first (plus a single factor $5$), yet its combined pointer is about $12$ times slower.
:::

**Never realigning is not the same as going everywhere.** That the clocks never realign only means the joint reading never returns to its start. Can it come close to *any* prescribed set of readings on the torus? Start with a single clock and look at it under a strobe light that flashes every $2\pi$ time units. The flash times $t = 2\pi m$ are exactly the moments when the reference clock $e^{-it}$ of angular frequency $1$ (the clock of the number $e$, since $\ln e = 1$) is at twelve. At the $m$-th flash, clock $2$ has turned $m\ln 2$ times, and the fractional parts of these turn counts are $0.6931$, $0.3863$, $0.0794$, $0.7726$, $0.4657$, $0.1589$, $0.8520$, $0.5452$, $0.2383$, $0.9315$, … These positions never repeat: if the $m$-th and the $m'$-th fractional parts agreed, $(m - m')\ln 2$ would be an integer and $\ln 2$ would be rational. The following lemma rules that out.

::: {.lemma #lem-log-natural-irrational title="Logarithms of Natural Numbers Are Irrational" lean="D5/S3/Constants/Irrationality/LogNaturalIrrationality.irrational_log_natCast"}
For every natural number $n$ with $n \ge 2$, the real number $\ln n$ is irrational (`Irrational (Real.log n)`): there is no rational number $q$ with $\ln n = q$.
:::

::: proof
If $\ln n = q$ were rational, then $q > 0$ (as $n > 1$), so $q = u/v$ with positive integers $u, v$, and $e^{u} = n^{v}$ would be a positive integer. It remains to show that $e^{a}$ is not rational for any positive integer $a$. For this the Lean file borrows the analytic part of the proof of the Lindemann–Weierstrass theorem in Mathlib, `LindemannWeierstrass.exp_polynomial_approx` (only this approximation lemma, not the transcendence conclusion): there is a constant $c$ such that for every sufficiently large prime $p$ there are an integer $z$ not divisible by $p$ and an integer polynomial $g$ with $\lvert z\,e^{a} - p\,g(a)\rvert \le c^{p}/(p-1)!$. If $e^{a} = u'/v'$, multiplying $z\,e^{a} - p\,g(a)$ by $v'$ produces the integer $z u' - p\,g(a)\,v'$, whose absolute value is at most $v' c^{p}/(p-1)!$; for large $p$ this is below $1$, so the integer is $0$ and $p$ divides $z u'$. But $p$ does not divide $z$ and was chosen larger than $u'$, a contradiction. The full proof is checked by the Lean kernel.
:::

Never repeating is not yet enough. To know that the flashes land in every small arc of the circle, we need a theorem that describes the closure of a power orbit.

::: {.theorem #thm-torus-power-orbit-closure title="Closures of Power Orbits on a Finite-Dimensional Torus and Kronecker Density" lean="D5/S3/Fourier/TorusOrbitClosure.result D5/S3/Fourier/BiquadraticKroneckerTimes.dense_circle_sequence"}
Let $I$ be a finite type, let $\mathbb{T}$ be the unit circle in the complex plane (Mathlib's `Circle`), and give $\mathbb{T}^I$ the product topology, with multiplication and powers taken componentwise.

1. **Orbit closures**: for all $g, z \in \mathbb{T}^I$, the point $z$ lies in the closure of the power orbit $\{g^n : n = 0, 1, 2, \dots\}$ if and only if, for every $k : I \to \mathbb{Z}$, $\prod_{j \in I} g_j^{k_j} = 1$ implies $\prod_{j \in I} z_j^{k_j} = 1$.
2. **Kronecker density**: let $a : I \to \mathbb{R}$ satisfy: for all $k : I \to \mathbb{Z}$ and $m \in \mathbb{Z}$, if $\sum_{j \in I} k_j\, a_j = m$, then every $k_j = 0$. Then for every $z \in \mathbb{T}^I$ there is a sequence of natural numbers $(m_n)_{n \in \mathbb{N}}$ such that, as $n \to \infty$,

   $$
   \bigl(e^{2\pi i\, a_j m_n}\bigr)_{j \in I} \;\longrightarrow\; z .
   $$
:::

::: proof
The "only if" half of item 1: each integer character $\chi_k(w) = \prod_j w_j^{k_j}$ is a continuous homomorphism, so if it equals $1$ at $g$, it equals $1$ at every $g^n$ and, by continuity, on the closure. The "if" half carries the content. The closure of the forward orbit coincides with the closure of the subgroup generated by $g$; it is a compact subgroup $G$. Equip it with its Haar probability measure and compare the average of a continuous function over $G$ with its average over the translate $zG$. For a character $\chi_k$: if $\chi_k(g) = 1$, the hypothesis gives $\chi_k(z) = 1$ and the two averages agree; if $\chi_k(g) \neq 1$, invariance of Haar measure under translation by $g$ forces the average of $\chi_k$ over $G$ to vanish, and both averages are $0$. Trigonometric polynomials are dense among continuous functions on the torus, so the two averages agree for every continuous function. If $z \notin G$, Urysohn's lemma provides a continuous function equal to $0$ on $G$ and to $1$ on $zG$, whose two averages are $0$ and $1$, a contradiction. Item 2: put $g_j = e^{2\pi i a_j}$. Then $\prod_j g_j^{k_j} = e^{2\pi i \sum_j k_j a_j}$ equals $1$ exactly when $\sum_j k_j a_j$ is an integer, in which case the hypothesis gives $k = 0$. So the right side of item 1 holds for every $z$, every $z$ lies in the orbit closure, and a point of the closure is written as the limit of a sequence. The full proof is checked by the Lean kernel.
:::

Back to the prime clocks (a manual derivation). Readings $e^{-i\theta}$ correspond to angles $\theta \bmod 2\pi$ one to one and continuously in both directions, so density on the circle $\mathbb{T}$ is the same as density of angles.

**One clock.** In item 2 of [@thm-torus-power-orbit-closure] let $I$ have a single element and put $a = -\ln n$ with $n \ge 2$; then $e^{2\pi i a m} = e^{-2\pi i m\ln n}$ is exactly the reading of clock $n$ at the $m$-th flash. The hypothesis asks that $k\ln n = -\ell$ with integers $k, \ell$ force $k = 0$. If $k \neq 0$, then $\ln n = -\ell/k$ would be rational, contradicting [@lem-log-natural-irrational]. So the flash readings are dense on the circle: the fractional parts listed for clock $2$ enter every small subinterval of $[0, 1)$.

**$K$ clocks.** Take distinct primes $p_1, \dots, p_K$ and flash every $\tau > 0$ time units instead, that is, put $a_j = -\tau\ln p_j/(2\pi)$. Writing $L_k = \sum_j k_j \ln p_j$, the hypothesis asks that for every nonzero integer vector $k$ and every integer $\ell$ we have $\tau L_k \neq -2\pi\ell$. By item 1 of [@thm-prime-log-independence], $L_k \neq 0$ whenever $k \neq 0$, so the values of $\tau$ that violate the hypothesis lie among the countably many numbers $-2\pi\ell/L_k$. Since $(0, \infty)$ is uncountable, a $\tau$ satisfying the hypothesis exists. For such a $\tau$ the flash readings are already dense on the $K$-dimensional torus, and so a fortiori is the whole trajectory over continuous time $t \ge 0$: the joint phase $(t\ln p_1 \bmod 2\pi,\, \dots,\, t\ln p_K \bmod 2\pi)$ winds densely over the entire torus $(\mathbb{R}/2\pi\mathbb{Z})^K$. This is the special case, for prime clocks, of the continuous-time form of Kronecker's approximation theorem (L. Kronecker, 1884). Note its limits: the existence of $\tau$ comes from a countability argument, so the derivation names no specific $\tau$, and it says nothing about how long one must wait before the readings come within a prescribed error.

Now apply the anti-Platonic lens of the [Prelude](README.md) and [Chapter 21](ch21-diagonalization-and-escape.md): what happens when a finite algorithm retains only the **first $K$ prime axes** $\{p_1, p_2, \dots, p_K\}$, building a finite-dimensional "**polyhedral prime sieve**" $P_K(s) = \prod_{k=1}^K (1 - p_k^{-s})^{-1}$? Let us work out the $K = 3$ sieve ($p \in \{2, 3, 5\}$) by hand and watch the first unfactored prime leak through the seam.

::: {.example #ex-prime-log-orthogonality-and-sieve title="Hand Calculation of the 3-Prime Euler Sieve (2, 3, 5) and the First Leaked Prime 7 (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The truncated Euler-product remainder expansion on $\operatorname{Re}(s) > 1$ and Euler's Basel identity $\zeta(2) = \frac{\pi^2}{6}$ invoked at $s = 2$ below (see also [@ex-xi-mirror-values] and [@rem-euler-zeta-literature]) belong to the classical analytic number-theory literature and are not locked as standalone theorems in this book's formalization.

For $\operatorname{Re}(s) > 1$, retain only the first $K = 3$ primes $p_1 = 2, p_2 = 3, p_3 = 5$ (the three orthogonal logarithmic axes $\ln 2, \ln 3, \ln 5$) and expand the truncated Euler product $P_{\le 5}(s)$:

$$
\begin{aligned}
P_{\le 5}(s)
&= (1 - 2^{-s})^{-1}(1 - 3^{-s})^{-1}(1 - 5^{-s})^{-1} \\
&= \bigl(1 + 2^{-s} + 4^{-s} + 8^{-s} + \cdots\bigr)\bigl(1 + 3^{-s} + 9^{-s} + \cdots\bigr)\bigl(1 + 5^{-s} + \cdots\bigr) \\
&= 1 + 2^{-s} + 3^{-s} + 4^{-s} + 5^{-s} + 6^{-s} + 8^{-s} + 9^{-s} + 10^{-s} + 12^{-s} + \cdots
\end{aligned}
$$

Subtract this three-axis arithmetic polytope $P_{\le 5}(s)$ from the full zeta series $\zeta(s) = \sum_{n=1}^\infty n^{-s}$. Between $1$ and $10$, every integer generated by $\{2, 3, 5\}$ — namely $1, 2, 3, 4 = 2^2, 5, 6 = 2\times 3, 8 = 2^3, 9 = 3^2, 10 = 2\times 5$ — cancels identically, leaving the exact truncation remainder Dirichlet series on $\operatorname{Re}(s) > 1$ (writing $P^+(n)$ for the largest prime factor of $n$):

$$
R_{> p_K}(s) \;:=\; \zeta(s) - \prod_{k=1}^K (1 - p_k^{-s})^{-1} \;=\; \sum_{\substack{n \ge 2 \\ P^+(n) > p_K}} n^{-s} \;=\; p_{K+1}^{-s} + \cdots
$$

For $K = 3$, the very first surviving term of the remainder series is **$7^{-s}$**! Because its leading Dirichlet coefficient at $n = p_{K+1}$ is $1 \neq 0$, $R_{> p_K}(s)$ is not identically zero on $\operatorname{Re}(s) > 1$; and **for every real exponent $s \in (1, \infty)$**, every omitted term $n^{-s} > 0$ is strictly positive with no oscillatory phase cancellation (whereas for complex $s = \sigma + it$ with $t \neq 0$, the phases $n^{-it}$ can interfere and cancel at isolated complex points), so on the real half-line $s > 1$ one has the pointwise strict inequality

$$
R_{> p_K}(s) \;>\; p_{K+1}^{-s} \;>\; 0 \qquad (\forall s \in \mathbb{R},\; s > 1).
$$

Check the numbers at the real point $s = 2$ ($s > 1$), where Euler's Basel identity gives $\zeta(2) = \frac{\pi^2}{6} \approx 1.644934$, while the three-prime product equals

$$
P_{\le 5}(2) = \frac{1}{1 - 1/4}\cdot\frac{1}{1 - 1/9}\cdot\frac{1}{1 - 1/25} = \frac{4}{3}\times\frac{9}{8}\times\frac{25}{24} = \frac{25}{16} = 1.5625.
$$

The strictly positive discrepancy $R_{> 5}(2) = \zeta(2) - P_{\le 5}(2) \approx 0.082434 > 0$ is led by the fourth orthogonal prime axis $7^{-2} = \frac{1}{49} \approx 0.020408$ (followed by $11^{-2} = \frac{1}{121} \approx 0.008264$, $13^{-2} = \frac{1}{169} \approx 0.005917$, and the mixed composite $14^{-2} = (2\times 7)^{-2} = \frac{1}{196} \approx 0.005102$).
:::

::: {.viz src="euler-product-sieve" preset="five" height="500"}
**The first to slip through is 7.** The list is $2, 3, 5$: the cyan cells $1, 2, 3, 4, 5, 6, 8, 9, 10, 12, \dots$ are the terms the product expands into, and $7$ is the first magenta cell. At $s = 2$ the cyan curve sits at $\frac{25}{16} = 1.5625$ against the ink $\zeta(2) = 1.6449$; the magnifier splits the gap of $0.0824$, from the bottom up, into $7^{-2}$, $11^{-2}$, $13^{-2}$ and ever thinner slices, each the $n^{-2}$ of one magenta cell. The dashed magenta curve between the ink and the cyan is the product plus $7^{-s}$, and at every $s$ drawn the gap is wider than that: $R_{>5}(s) > 7^{-s}$ (a literature result, checked by the page only at the points it draws). Click the card and the amber line sweeps from $s = 4$ down to $s = 1.3$, with $7^{-s}$ always the lowest slice in the magnifier.
:::

Notice the exact structural parallel between [@ex-prime-log-orthogonality-and-sieve] and the Euclidean–Gödelian escape of [Chapter 21](ch21-diagonalization-and-escape.md): any finite prime sieve spanned by $K$ prime axes $\{p_1, \dots, p_K\}$ is an arithmetic polytope whose remainder series $R_{> p_K}(s)$ leaks immediately at $n = p_{K+1}$ (and is strictly positive, $R_{> p_K}(s) > p_{K+1}^{-s} > 0$, for every real $s > 1$). Eliminating that leading term requires adjoining $p_{K+1}$ as a new orthogonal axis — and because the primes are inexhaustible, no finite truncation ever seals the arithmetic sphere.

::: {.viz src="euler-product-sieve" preset="thirtyone" height="500"}
**Up to 31, the leak starts at 37.** The list holds the $11$ primes up to $31$: everything from $1$ to $36$ is cyan, and the first magenta cell is $37$. At $s = 2$ the gap has shrunk to $0.0102$, yet its lowest slice in the magnifier is still $37^{-2}$: the only way to close that slice is to put $37$ on the list.
:::

Euclid's trick needs a careful reading here: multiply all the primes on the list and add one, and the result has no prime factor on the list (Euclid's argument, a literature result), yet it need not be prime itself, and the new prime it reveals need not be the next one.

::: {.viz src="sphere-escape" preset="thirteen" height="500"}
**The sum need not be prime itself.** The list is $2, 3, 5, 7, 11, 13$ and $Q = 30031$. These are remainder clocks, not the steadily turning phase clocks above: each has $p$ ticks and its hand points at the remainder of $Q$ divided by $p$. Every hand points at $1$, none at $0$. Yet $Q = 59 \times 509$ is not prime. Euclid's argument (a literature result) says only that the prime factors of $Q$ are off the list, and the new prime it finds, $59$, is not the next one, $17$.
:::

> Composite numbers are the diagonal lattice points of the prime basis; Euler's product simply projects an entangled sum along the natural-number line onto its mutually orthogonal prime axes.

## 22.3.1 Prime-Clock Comma Bounds, Constructive $\tau = 2\pi$ Waiting Times, and Critical-Strip Euler Products under External RH/GRH {#sec-ch22-3-quantitative-rh-strip}

The preceding exposition leaves three quantitative openings: [@ex-prime-clock-commas] records only a crude integer-separation lower bound without calibrating true commas against continued fractions; while the preceding text already fixes the strobe period $\tau = 2\pi$ for one clock, its generalization to $K$ prime clocks invokes uncountability without naming a universal concrete $\tau$ or finite waiting time; and the truncated Euler-product remainder stays inside the absolute-convergence half-plane $\operatorname{Re}(s) > 1$. This subsection closes all three gaps quantitatively along four threads and connects them to the external `riemannHypothesis` and Dirichlet GRH (`LFunction_eq_zero_re : DirichletLZerosOnLine`) recorded in [@conj-riemann-hypothesis] ([external proof entry](https://github.com/leanprover-community/riemann-hypothesis/blob/7c4ccbd64d02774b0a5b40a5f923f5b7a18e8abc/src/Main.lean#L9-L26), an externally verified mathematical fact **not** counted among the pinned `trureturing` frozen theorems of this book).

1. **Comma Re-Certification, Continued-Fraction Sandwich for $\ln 3 / \ln 2$, and the Gap Between Elementary and Baker/LMN Bounds (Manual Derivation + Literature + 256/320-Bit Arb)**:
   We re-certified all four tuning commas of [@ex-prime-clock-commas] in 256/320-bit Arb: aside from the second-row syntonic comma $81/80$ ($A - B = 1$), which attains the elementary integer-separation lower bound $\ln(1 + 1/\min(A, B))$ exactly (ratio identically $1$), the true logarithmic angular velocities of the Pythagorean comma $531441/524288$ ($A - B = 7153$), the schisma $32805/32768$ ($A - B = 37$), and the diesis $128/125$ ($A - B = 3$) exceed their elementary bounds by factors of about $7104.65$, $36.98$, and $2.98$ (with elementary bounds about $1.9073\times 10^{-6}$, $3.0517\times 10^{-5}$, and $7.9682\times 10^{-3}$). To quantify the best near-alignments of the two-clock pair $(2, 3)$, we certify the first thirteen partial quotients of $\alpha := \ln 3 / \ln 2 \approx 1.584963$ as $[1;\, 1, 1, 2, 2, 3, 1, 5, 2, 23, 2, 2, 1, \dots]$ (zero-indexed from $p_0/q_0 = 1/1$, giving convergents $4$ through $11$ as $19/12$, $65/41$, $84/53$, $485/306$, $1054/665$, $24727/15601$, $50508/31867$, and $125743/79335$). From the continued-fraction determinant identity $\lvert q_n \alpha - p_n\rvert = (q_n \alpha_{n+1} + q_{n-1})^{-1}$, $a_{n+1} < \alpha_{n+1} < a_{n+1} + 1$, and, for all $n \ge 2$, $0 < q_{n-1} < q_n$, the strict two-sided sandwich holds:

   $$
   \frac{\ln 2}{(a_{n+1} + 2) q_n} \;<\; \lvert q_n \ln 3 - p_n \ln 2\rvert \;<\; \frac{\ln 2}{a_{n+1} q_n}.
   $$

   The table below lists six landmark convergents with values rounded to five significant digits — the measured angular-velocity gap, the continued-fraction sandwich, and the elementary integer bound $\ln\bigl(1 + 1/\min(2^{p_n}, 3^{q_n})\bigr)$ (where the sharp drop at $1054/665$ is driven by the large next partial quotient $a_9 = 23$, with exact integer direction $3^{665} > 2^{1054}$):

   | Convergent $p_n/q_n$ (index & next $a_{n+1}$) | Exact ordering | Measured gap $\lvert q_n\ln 3 - p_n\ln 2\rvert$ (five sig. digits) | CF sandwich $[L_{\mathrm{CF}},\, U_{\mathrm{CF}}]$ (five sig. digits) | Elementary integer bound (five sig. digits) |
   | :---: | :---: | :---: | :---: | :---: |
   | $19/12$ ($n = 4,\; a_5 = 3$) | $3^{12} > 2^{19}$ | $1.3551\times 10^{-2}$ | $[1.1552\times 10^{-2},\; 1.9254\times 10^{-2}]$ | $1.9073\times 10^{-6}$ |
   | $84/53$ ($n = 6,\; a_7 = 5$) | $3^{53} > 2^{84}$ | $2.0881\times 10^{-3}$ | $[1.8683\times 10^{-3},\; 2.6156\times 10^{-3}]$ | $5.1699\times 10^{-26}$ |
   | $485/306$ ($n = 7,\; a_8 = 2$) | $2^{485} > 3^{306}$ | $1.0222\times 10^{-3}$ | $[5.6630\times 10^{-4},\; 1.1326\times 10^{-3}]$ | $1.0021\times 10^{-146}$ |
   | $1054/665$ ($n = 8,\; a_9 = 23$) | $3^{665} > 2^{1054}$ | $4.3654\times 10^{-5}$ | $[4.1693\times 10^{-5},\; 4.5319\times 10^{-5}]$ | $5.1807\times 10^{-318}$ |
   | $24727/15601$ ($n = 9,\; a_{10} = 2$) | $2^{24727} > 3^{15601}$ | $1.8195\times 10^{-5}$ | $[1.1107\times 10^{-5},\; 2.2215\times 10^{-5}]$ | $2.6996\times 10^{-7444}$ |
   | $125743/79335$ ($n = 11,\; a_{12} = 1$) | $2^{125743} > 3^{79335}$ | $3.6647\times 10^{-6}$ | $[2.9123\times 10^{-6},\; 8.7370\times 10^{-6}]$ | $3.8482\times 10^{-37853}$ |

   Thus the elementary lower bound extracted solely from unique factorization ($A \neq B$) collapses exponentially like $2^{-p_n}$ (at $p_{11}/q_{11} = 125743/79335$ already reaching order $10^{-37853}$), whereas the true gap sits at the two-sided $(a_{n+1} q_n)^{-1}$ scale. In the transcendence literature, A. Baker (*Acta Arith.* **21**, 117–129, 1972, p. 117 eq. (1), [DOI 10.4064/aa-21-1-117-129](https://api.crossref.org/works/10.4064/aa-21-1-117-129)) established inverse-polynomial lower bounds in the coefficient height $H$ for nonzero linear forms in logarithms of fixed algebraic bases with integer coefficients, while M. Laurent, M. Mignotte, and Yu. Nesterenko (*J. Number Theory* **55**, 285–321, 1995, [DOI 10.1006/jnth.1995.1141](https://api.crossref.org/works/10.1006/jnth.1995.1141)) gave explicit quantitative $\exp\bigl(-O((\ln H)^2)\bigr)$ bounds for nonzero linear forms in two logarithms, decisively overcoming the elementary exponential collapse.

2. **Constructive Strobe Period $\tau = 2\pi$, One-Dimensional Star Discrepancy, and Certified Antipodal Waiting Times (Manual Derivation + Literature + 256/320-Bit Arb)**:
   When extending to $K$ prime clocks, the preceding text invokes an uncountability argument for a strobe interval $\tau$, yet no non-constructive choice is needed: the very same **$\tau = 2\pi$** used for one clock (giving $a_j = -\ln p_j$) works for **every** finite prime set $\{p_1, \dots, p_K\}$ and satisfies the integer-independence hypothesis of [@thm-torus-power-orbit-closure] item 2 (`dense_circle_sequence`) (`manual derivation`). Indeed, suppose $k \in \mathbb{Z}^K$ and $m \in \mathbb{Z}$ satisfy $\sum_{j=1}^K k_j \ln p_j = m$: if $m = 0$, the pinned [@thm-prime-log-independence] item 1 immediately forces $k = 0$; if $m \neq 0$, exponentiating yields $e^m = \prod_{j=1}^K p_j^{k_j} \in \mathbb{Q}_{>0}$, hence $e^{\lvert m\rvert} \in \mathbb{Q}_{>0}$, directly contradicting the fact already Lean-verified inside the proof of [@lem-log-natural-irrational] that for every positive integer $a$, $e^a$ is irrational (and implied classically by Ch. Hermite's 1873 transcendence of $e$, reprint [DOI 10.1017/CBO9780511702778.012](https://api.crossref.org/works/10.1017/CBO9780511702778.012)). Consequently, flashing whenever the reference clock $e^{-it}$ strikes twelve ($t = 2\pi m$) already produces a dense joint orbit of $\{p_1, \dots, p_K\}$ on $(\mathbb{R}/\mathbb{Z})^K$.

   Begin with the single clock $p_1 = 2$. In 256/320-bit Arb we re-certified all ten initial flash fractional parts $\{m\ln 2\}$ (whose first and tenth entries round to $0.6931$ and $0.9315$) and certified the continued-fraction expansion of $\ln 2$ as $[0;\, 1, 2, 3, 1, 6, 3, 1, 1, 2, 1, 1, 1, 1, \dots]$, whose convergent denominators are $1, 1, 3, 10, 13, 88, 277, 365, 642, 1649, \dots$ (with the number of distinct gap lengths governed by the three-gap theorem `three_gap_card_le_three` frozen at the resolved `dev` commit). From the sorted fractional parts $x_1 < \dots < x_N$, we compute the exact star discrepancy $D_N^*(\ln 2) := \max_{1 \le i \le N}\max\bigl(\frac{i}{N} - x_i,\, x_i - \frac{i-1}{N}\bigr)$ (see L. Kuipers & H. Niederreiter, *Uniform Distribution of Sequences*, Wiley, 1974, [Archive record](https://archive.org/details/uniformdistribut0000kuip), [Crossref review](https://api.crossref.org/works/10.1137/1019028)): at the four convergent denominators $N = 10, 88, 277, 1649$, $N D_N^*(\ln 2)$ achieves strict adjacent local minima (strictly below the values at $N - 1$ and $N + 1$), rounding to six decimal places as $0.931472$, $0.996952$, $0.998231$, and $0.999701$; by contrast, the convergent denominator $N = 13$ gives $13 D_{13}^*(\ln 2) \approx 0.989087$ and is **not** a strict adjacent local minimum ($12 D_{12}^*(\ln 2) \approx 0.953299$ is strictly smaller), while at the generic scales $N = 50, 100, 1000, 10000$, $N D_N^*(\ln 2)$ takes the values, rounded to six decimal places, $1.789408$, $1.639343$, $2.585607$, and $2.670074$.

   Fixing the antipodal target $\bigl(\frac{1}{2}, \dots, \frac{1}{2}\bigr) \in (\mathbb{R}/\mathbb{Z})^K$ (by inversion symmetry, the circular $L^\infty$ distance from $\{-m\ln p_j\}$ to the target equals that from $\{m\ln p_j\}$), step-by-step interval certification verifying that for every $1 \le m < m_*$ the distance is strictly above $\varepsilon$ while at $m = m_*$ it is strictly below $\varepsilon$ yields the exact minimal flash waiting times $m_*(\varepsilon)$ below (distances rounded to six decimal places):

   | Dimension $K$ (prime axes) | $L^\infty$ tolerance $\varepsilon$ | Certified waiting time $m_*(\varepsilon)$ | Distance at hit $m_*$ (six d.p.) | Closest earlier $\min_{1 \le m < m_*}$ (six d.p.) |
   | :---: | :---: | :---: | :---: | :---: |
   | $K = 1$ ($\{2\}$) | $0.1$ | $5$ | $0.034264$ | $0.113706$ |
   | $K = 1$ ($\{2\}$) | $0.01$ | $44$ | $0.001524$ | $0.012437$ |
   | $K = 1$ ($\{2\}$) | $0.001$ | $321$ | $0.000245$ | $0.001524$ |
   | $K = 2$ ($\{2, 3\}$) | $0.1$ and $0.05$ | $5$ | $0.034264$ | $0.272589$ |
   | $K = 2$ ($\{2, 3\}$) | $0.02$ | $2084$ | $0.018724$ | $0.020003$ |
   | $K = 3$ ($\{2, 3, 5\}$) | $0.1$ and $0.05$ | $96$ | $0.042129$ | $0.110658$ |
   | $K = 3$ ($\{2, 3, 5\}$) | $0.02$ | $2449$ | $0.017445$ | $0.035543$ |

   For the three-dimensional strobe orbit $(2, 3, 5)$, over all frequencies with $0 < \|k\|_\infty \le 2$ (forming $62$ conjugate pairs of nonzero frequencies), we evaluate the normalized Weyl sums $\bigl\lvert\frac{1}{N}\sum_{m=1}^N e^{-2\pi i m (k_1\ln 2 + k_2\ln 3 + k_3\ln 5)}\bigr\rvert$: at $k = (1, 1, 1)$ for $N = 100, 1000, 10000$, they round to four significant digits as $3.858\times 10^{-3}$, $6.103\times 10^{-4}$, and $8.629\times 10^{-6}$; across all three sampled sizes, the maximum over this frequency box is attained at $\pm(2, 0, 1)$, rounding to six decimal places as $0.726226$, $0.055595$, and $0.006332$, vividly illustrating in these three measured samples how a low-order near-resonance amplifies the Weyl coefficient.

3. **Real-Axis $1\%$ Sieve Thresholds, Pole-Renormalized Euler Products under External RH, and Pole-Free Convergence under External GRH (Manual Derivation + Literature + 256/320-Bit Arb + Zero-Axiom Lean)**:
   On the unconditional real half-line $s > 1$, the exact rational products at $s = 2$ are $P_{\le 5}(2) = \frac{25}{16}$ and $P_{\le 31}(2) = \frac{82920037520482019}{50722704772300800}$, with truncation remainders $R_{>5}(2) \approx 0.082434$ and $R_{>31}(2) \approx 0.010162$; termwise bounds $p^{-s} < -\ln(1 - p^{-s}) < p^{-s}/(1 - p^{-s})$ yield the strict logarithmic tail sandwich $\sum_{p > p_K} p^{-s} < \ln\bigl(\zeta(s)/P_{\le p_K}(s)\bigr) < (1 - p_{K+1}^{-s})^{-1}\sum_{p > p_K} p^{-s}$ (at $s = 2$, $p_K = 5$ gives $0.051136 < 0.051413 < 0.052202$ and $p_K = 31$ gives $0.006196 < 0.006197 < 0.006201$, rounded to six decimal places). Because the finite product increases strictly with each adjoined prime, two consecutive relative errors straddling the threshold uniquely certify the minimal prime count $K_{0.01}(s)$ that first achieves $R_{> p_K}(s)/\zeta(s) < 0.01$ — supplying the exact coordinate values behind the second small plot of the interactive lab below (relative errors rounded to seven decimal places):

   | Real exponent $s$ | Minimal prime count $K_{0.01}(s)$ | $K_{0.01}$-th prime | Prior rel. error $K_{0.01} - 1$ (seven d.p.) | Qualifying rel. error $K_{0.01}$ (seven d.p.) |
   | :---: | :---: | :---: | :---: | :---: |
   | $3.0$ | $3$ | $5$ | $0.0126814$ | $0.0047191$ |
   | $2.5$ | $4$ | $7$ | $0.0147901$ | $0.0071315$ |
   | $2.0$ | $9$ | $23$ | $0.0102672$ | $0.0083927$ |
   | $1.75$ | $20$ | $71$ | $0.0100055$ | $0.0094351$ |
   | $1.5$ | $110$ | $601$ | $0.0100212$ | $0.0099540$ |
   | $1.4$ | $430$ | $2999$ | $0.0100039$ | $0.0099904$ |
   | $1.3$ | $4551$ | $43669$ | $0.0100002$ | $0.0099993$ |

   Writing the complex variable as $s = \sigma + it$, crossing $\operatorname{Re}(s) = 1$ into the critical strip $\frac{1}{2} < \sigma < 1$ requires dispelling a common misconception: **even under RH, the raw truncated Euler product $P_{\le X}(s) := \prod_{p \le X}(1 - p^{-s})^{-1}$ diverges throughout $\frac{1}{2} < \sigma < 1$** (`manual derivation`). Indeed, on $\operatorname{Re}(s) > 0$ defining $\ln P_{\le X}(s) := -\sum_{p \le X}\ln(1 - p^{-s})$ as the sum of the prime-factor logarithm power series, the simple pole of $\zeta(s)$ at $s = 1$ ([@lem-riemann-zeta-residue-one]), via the external-RH prime-counting error $E(u) := \pi(u) - \int_2^u \frac{dv}{\ln v} = O(\sqrt{u}\ln u)$ together with absolute summability of the higher prime powers ($m \ge 2$), yields via summation by parts $\ln P_{\le X}(s) = \int_2^X \frac{u^{-s}}{\ln u}\,du + O_s(1)$, where the integral carries the diverging drift $\int_2^X \frac{u^{-s}}{\ln u}\,du = \frac{X^{1-s}}{(1-s)\ln X} + O_s(1 + X^{1-\sigma}/\ln^2 X)$: taking real parts, on the real axis $t = 0$ one has $P_{\le X}(\sigma) \to +\infty$, while for $t \neq 0$ choosing two subsequences aligning $-t\ln X$ with positive and negative extrema of the real part of the leading term yields $\limsup_{X\to\infty}\lvert P_{\le X}(s)\rvert = \infty$ and $\liminf_{X\to\infty}\lvert P_{\le X}(s)\rvert = 0$. More precisely, invoking the external `riemannHypothesis` recorded in [@conj-riemann-hypothesis] (which supplies $E(u) = O(\sqrt{u}\ln u)$ above), on $\operatorname{Re}(s) > 1$ taking $\ln\zeta(s)$ as its Euler-series branch, summation by parts yields the exact identity

   $$
   \ln P_{\le X}(s) + E_1\bigl((s - 1)\ln X\bigr) \;=\; \ln\zeta(s) + X^{-s} E(X) - s\int_X^\infty E(u)\,u^{-s-1}\,du - \sum_{p > X}\sum_{m \ge 2}\frac{p^{-ms}}{m},
   $$

   where $E_1(z)$ takes its principal branch on $\mathbb{C} \setminus (-\infty, 0]$. Under external RH, both tail terms converge locally uniformly and absolutely on the entire half-plane $\operatorname{Re}(s) > \frac{1}{2}$, where $\zeta(s)$ has no zeros and only the simple pole at $s = 1$; analytically continuing $\ln\zeta(s)$ from its Euler-series branch on $\operatorname{Re}(s) > 1$ to the simply connected slit half-plane $\Omega_{1/2} := \{\operatorname{Re}(s) > \frac{1}{2}\} \setminus (-\infty, 1]$, the identity extends throughout $\Omega_{1/2}$, so the **pole-renormalized Euler product**

   $$
   Q_X(s) \;:=\; \exp\!\bigl(E_1((s - 1)\ln X)\bigr)\,P_{\le X}(s)
   $$

   converges locally uniformly on $\Omega_{1/2}$ under external RH at rate $O_s(X^{\frac{1}{2} - \sigma}\ln X)$ to $\zeta(s)$. Furthermore, because the principal branch expands as $E_1(z) = -\gamma - \ln z - \sum_{j \ge 1}(-z)^j/(j\,j!)$, multiplying by $(s - 1)$ extends $(s - 1)Q_X(s)$ across $(-\infty, 1]$ to a single-valued holomorphic function on $\operatorname{Re}(s) > \frac{1}{2}$ that converges locally uniformly under external RH to $(s - 1)\zeta(s)$ (and conversely, if $(s - 1)Q_X$ converges locally uniformly on $\operatorname{Re}(s) > \frac{1}{2}$, then on $\operatorname{Re}(s) > 1$ the absolutely convergent Euler product unconditionally gives $P_{\le X}(s) \to \zeta(s)$ while $E_1((s - 1)\ln X) \to 0$, so the identity theorem uniquely identifies the limit as $(s - 1)\zeta(s)$; since each holomorphic extension of $(s - 1)Q_X(s)$ is zero-free on $\operatorname{Re}(s) > \frac{1}{2}$, Hurwitz's theorem and functional-equation reflection then imply RH). Three quantitative consequences follow immediately: first, evaluating at $s = 1$ yields the external-RH Mertens third-theorem error $P_{\le X}(1)/(e^\gamma \ln X) = 1 + O(X^{-1/2}\ln X)$; second, on $\sigma = 1,\; t \neq 0$, the classical quantitative prime number theorem with remainder already guarantees unconditional convergence of the raw product, yet under external RH the difference $P_{\le X}(1 + it) - \zeta(1 + it)$ remains governed by the leading term $-\zeta(1 + it)X^{-it}/(it\ln X)$ at slow rate $O_t(1/\ln X)$, whereas pole renormalization accelerates convergence under external RH to $O_t(X^{-1/2}\ln X)$; third, for the non-principal modulo-$4$ Dirichlet character $\chi_4$ (whose $L$-function $L(s, \chi_4)$ has no pole at $s = 1$), external Dirichlet GRH (`LFunction_eq_zero_re : DirichletLZerosOnLine`, with convergence at $s = 1$ already unconditional via the quantitative prime number theorem in arithmetic progressions for fixed modulus), prime-power removal, and summation by parts give $\sum_{p \le X}\chi_4(p) = O(\sqrt{X}\ln X)$, so the **raw unrenormalized product** $P_{\le X}(s, \chi_4) := \prod_{p \le X}(1 - \chi_4(p)p^{-s})^{-1}$ converges locally uniformly throughout $\operatorname{Re}(s) > \frac{1}{2}$ at rate $O_s(X^{\frac{1}{2} - \sigma}\ln X)$ directly to $L(s, \chi_4)$. The table below summarizes the 256/320-bit Arb certification (first zero ordinate $\gamma_1 \approx 14.134725$, all entries rounded to six decimal places):

   | Cutoff $X$ | $s = 1$ ratio $\frac{P_{\le X}(1)}{e^\gamma\ln X}$ | $\sigma = 1$ raw / norm. error ($t = \gamma_1$) | $\sigma = 0.75$ raw / norm. error ($t = \gamma_1$) | $\sigma = 0.62$ raw / norm. error ($t = \gamma_1$) | $\chi_4$ raw error $s = 1$ / $s = 0.75$ |
   | :---: | :---: | :---: | :---: | :---: | :---: |
   | $10^2$ | $1.013316$ | $0.016818$ / $0.013432$ | $0.045673$ / $0.038127$ | $0.074759$ / $0.064378$ | $0.012315$ / $0.052564$ |
   | $10^3$ | $1.003882$ | $0.004038$ / $0.002689$ | $0.016208$ / $0.014389$ | $0.032318$ / $0.032826$ | $0.001353$ / $0.016020$ |
   | $10^4$ | $1.001232$ | $0.001877$ / $0.000628$ | $0.007744$ / $0.006060$ | $0.006496$ / $0.018638$ | $0.001026$ / $0.014067$ |
   | $10^5$ | $1.000304$ | $0.001904$ / $0.000172$ | $0.017663$ / $0.002922$ | $0.035832$ / $0.011928$ | $0.000265$ / $0.006675$ |
   | $10^6$ | $1.000039$ | $0.001692$ / $0.000033$ | $0.031008$ / $0.001178$ | $0.119989$ / $0.006989$ | $0.000002$ / $0.001225$ |

   Three regimes stand in sharp relief: at $s = 1$, the scaled deviation $\sqrt{X}\bigl(P_{\le X}(1)/(e^\gamma\ln X) - 1\bigr)$ rounds at the five cutoffs to $0.133155$, $0.122765$, $0.123178$, $0.096213$, and $0.038939$; at $\sigma = 0.75, 0.62$, the raw error increases markedly at the two larger sampled cutoffs ($X = 10^5, 10^6$) (analytically its limsup is infinite while along subsequences where the raw product tends to zero the absolute error tends to $\lvert\zeta(s)\rvert$), whereas the pole-renormalized error decays steadily; and for non-principal $\chi_4$, the raw error at $s = 1$ at $X = 10^6$ drops to $1.6895\times 10^{-6}$ (rounding to $0.000002$ at six decimal places), and even at the real strip point $s = 0.75$, the raw product converges directly to $L(0.75, \chi_4) \approx 0.732107$. At the first critical-line zero $s = \frac{1}{2} + i\gamma_1$, which lies on the boundary outside the $\operatorname{Re}(s) > \frac{1}{2}$ theorem above, the archive certifies only the five finite-cutoff normalized moduli $\lvert Q_X(\frac{1}{2} + i\gamma_1)\rvert$ as strictly positive values rounding to $0.102537$, $0.066753$, $0.048700$, $0.039277$, and $0.031396$ (for dedicated critical-line Euler-product hypotheses and smoothed cutoffs, see K. Conrad, *Canad. J. Math.* **57**(2), 267–297, 2005, §7 and Theorem 6.3, [DOI 10.4153/CJM-2005-012-6](https://api.crossref.org/works/10.4153/CJM-2005-012-6), [preprint](https://kconrad.math.uconn.edu/articles/eulerprod.pdf), and S. M. Gonek, *Trans. Amer. Math. Soc.* **364**(4), 2157–2191, 2012, Theorem 3.1, [DOI 10.1090/S0002-9947-2011-05546-7](https://api.crossref.org/works/10.1090/S0002-9947-2011-05546-7), [arXiv:0704.3448](https://arxiv.org/abs/0704.3448)).

   From a purely finitary arithmetic viewpoint, writing the partial sum of the Möbius function $\mu$ as the Mertens function $M(N) := \sum_{n=1}^N \mu(n)$, the Littlewood–Mertens bound $M(N) = O_\varepsilon(N^{\frac{1}{2}+\varepsilon})$ equivalent to external RH can be reformulated using integer powers and quantification over positive integers, with no transcendental functions: $\forall k \in \mathbb{N}_+,\; \exists C \in \mathbb{N}_+,\; \forall N \in \mathbb{N}_+,\; M(N)^{2k} \le C^{2k} N^{k+1}$ (without reviving the unconditionally disproved Mertens conjecture $\lvert M(N)\rvert \le \sqrt{N}$). On $1 \le n \le 10^6$, exact integer sieving certifies $M(n)^2 \le n$ with equality solely at $n = 1$ (extrema first attained at $M(926265) = -368$ and $M(992998) = 311$, with benchmarks $M(100) = 1$, $M(200) = -8$, $M(10^6) = 212$), whence for every integer $k \ge 1$ on $[1, 10^6]$ one has $M(n)^{2k} \le n^k \le n^{k+1}$. Moreover, the standalone zero-import Lean `4.35.0` verification script `omega_prime_sieve_check.lean` bundled in the archive checks via `by decide` the exact rational sieve fractions $P_{\le 5}(2) = \frac{25}{16}$ and $P_{\le 31}(2) = \frac{82920037520482019}{50722704772300800}$, all six integer comma separations ($3^{12} = 2^{19} + 7153$, $3^4 = 2^4 \cdot 5 + 1$, $3^8 \cdot 5 = 2^{15} + 37$, $2^7 = 5^3 + 3$, $3^{53} > 2^{84}$, $3^{665} > 2^{1054}$), $M(100) = 1$, $M(200) = -8$, and for every $1 \le n \le 200$ the bound $M(n)^2 \le n$, with `#print axioms` reporting `'cycle15_omega_prime_sieve_check' does not depend on any axioms` (this script is an auxiliary archive check and is **not** counted among the pinned `trureturing` frozen theorems of this book).

4. **256/320-Bit FLINT/Arb Dual-Precision Interval Certification and Reproducible Archive (`NUM`)**:
   All numerical and algebraic computations above were completed independently at both 256-bit and 320-bit working precisions using single-threaded `python-flint 0.9.0` (`FLINT 3.6.0`), `SymPy 1.14.0`, and `mpmath 1.3.0`, while the zero-import Lean `4.35.0` check ran separately: all **113** exact records (suite 1: 26, suite 2: 50, suite 3: 37) match identically across precisions (`exact_mismatch_keys = []`); all **395** interval-ball pairs (suite 1: 69, suite 2: 104, suite 3: 222) overlap with every 320-bit ball strictly contained inside its 256-bit counterpart (`overlap_only_keys = []`, `disjoint_keys = []`); and the exponential integral $E_1(z)$ was additionally four-way cross-checked via horizontal contour quadrature with rigorous tail bounds, Arb `expint(1)`, the `ei` branch identity, and `mpmath 1.3.0` (20 evaluation-point and cutoff combinations cross-checked).

   The complete reproduction scripts, dual-precision CSV certificates, zero-import Lean verification source, standalone replay instructions, and analysis notes are archived at the immutable public Gist revision [`2f78871b751a4dec6f3644775a55d0fc23d715cf`](https://gist.github.com/loning/5d3c9aec136603005e5be86f125a6730/2f78871b751a4dec6f3644775a55d0fc23d715cf) (pinned raw manifest [`SHA256SUMS`](https://gist.githubusercontent.com/loning/5d3c9aec136603005e5be86f125a6730/raw/2f78871b751a4dec6f3644775a55d0fc23d715cf/SHA256SUMS), itself having SHA-256 `15cd5ad53bcaa872b1cd13e97f0feee68f4ee58c10c5e428a8d410a424103fe9`; archival verification and replay log at [Issue #1102 comment](https://github.com/the-omega-institute/trureturing-books/issues/1102#issuecomment-7106965108)).

::: {.viz src="euler-product-sieve" height="560"}
The full lab of the Euler product and the sieve: scrub the rail to add or drop primes, drag the amber line to move $s$, and click a magenta cell to put its largest prime factor on the list. In the first small plot below, the ink curve $(s - 1)\zeta(s)$ heads for the green dashed line at $1$ ([@lem-riemann-zeta-residue-one]) while the cyan $(s - 1)$ times the product heads for $0$; the second shows how many primes the product needs to come within $1\%$ of $\zeta(s)$.
:::
