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

::: {.viz src="euler-product-sieve" height="560"}
The full lab of the Euler product and the sieve: scrub the rail to add or drop primes, drag the amber line to move $s$, and click a magenta cell to put its largest prime factor on the list. In the first small plot below, the ink curve $(s - 1)\zeta(s)$ heads for the green dashed line at $1$ ([@lem-riemann-zeta-residue-one]) while the cyan $(s - 1)$ times the product heads for $0$; the second shows how many primes the product needs to come within $1\%$ of $\zeta(s)$.
:::
