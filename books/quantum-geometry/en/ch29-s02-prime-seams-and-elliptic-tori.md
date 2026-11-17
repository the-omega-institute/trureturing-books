# 29.2 The $\pm 1$ Arithmetic Seam, Prime Duality, and the $S^3$ Projection on Elliptic Curve Tori {#sec-coda-primes-elliptic-curves}

When we look closely at the Pell remainder $m^2 - 2n^2 = \pm 1$ ([@thm-ch29-silver-pell-remainder]) left by Hippasus on the integer grid, a deeper arithmetic question immediately arises: **is this oscillation between $+1$ and $-1$ an isolated quirk of $\sqrt{2}$, or does the $\pm 1$ seam govern the splitting of prime numbers, the topology of elliptic curves, and the $\cos\theta$ projection that runs through the entire book?**

Following this $\pm 1$ crack uncovers three structural bridges uniting number theory, algebraic geometry, and quantum spinor geometry.

## 29.2.1 Pillar 1: The $\pm 1$ Pell Seam Splits Odd Primes into "Line Primes" and "Plane Primes" {#sec-coda-pell-prime-splitting}

Even in the elementary lattice of natural numbers, once the smallest even prime $2$ and the smallest odd prime $3$ form the hexagonal period base $2 \times 3 = 6$, every prime $p \ge 5$ is forced to inhabit the $\pm 1$ seams flanking multiples of $6$:

$$
p = 6k \pm 1.
$$

A far deeper bifurcation occurs the moment we replace the base $2$ in Pell's equation $m^2 - 2n^2 = \pm 1$ by an arbitrary odd prime $p$ and inspect the generalized Pell equation

$$
m^2 - p\,n^2 = \pm 1.
$$

At first glance, the right-hand side is merely a sign choice between $+1$ and $-1$. Yet in the two-dimensional Clifford exterior plane, $-1$ is the square of the skew-adjoint unitary complex structure (the bivector imaginary generator) $\hat{\mathbf{I}}$, namely $\hat{\mathbf{I}}^2 = -1$ ([`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary))! Depending on whether $\sqrt{-1}$ exists modulo $p$—that is, whether the Legendre symbol $\left(\frac{-1}{p}\right) = (-1)^{(p-1)/2}$ equals $+1$ or $-1$, a dividing line that manual derivation 2 below obtains from frozen theorems—the $\pm 1$ seam splits all odd primes into two families of distinct geometric dimension:

**Plane primes** are the odd primes with $p \equiv 1 \pmod 4$ ($5, 13, 17, 29, 37, \dots$); **line primes** are the odd primes with $p \equiv 3 \pmod 4$ ($3, 7, 11, 19, 23, \dots$). The core of this dichotomy is frozen at the pinned `trureturing@dev` commit, and each of the two lemmas and two theorems below is checked by the Lean kernel. Start with the plainest mechanism: put the squares of the integers on a clock face with only four slots, the residues modulo $4$. The square of an even number $2k$ is $4k^2$ and lands in slot $0$; the square of an odd number $2k + 1$ is $4(k^2 + k) + 1$ and lands in slot $1$. A sum of two squares can therefore only land in slots $0$, $1$ or $2$; slot $3$ stays empty forever.

::: {.figure src="ch29-mod-four-dial"}
**The mod $4$ dial: a sum of two squares lands only in cells $0$, $1$ and $2$; cell $3$ stays empty.** The three cyan cells show which residues of the two squares add up to land there, $0 + 0$, $0 + 1$ and $1 + 1$; cell $3$, outlined in dashed magenta, is empty, and the magenta line primes $3, 7, 11, 19, 23$ on the left point straight into it, while the cyan plane primes $5, 13, 17, 29, 37$ on the right sit in cell $1$ ([@lem-ch29-square-residues-mod-four]).
:::

::: {.lemma #lem-ch29-square-residues-mod-four title="Squares Are 0 or 1 Modulo 4, and a Sum of Two Squares Is Never 3 Modulo 4" lean="D5/S3/PrimeForms/QuadraticResidues.square_residues_and_sum_obstruction"}
For every natural number $n$, either $n^2 \bmod 4 = 0$ or $n^2 \bmod 4 = 1$; and for all natural numbers $a, b$, $(a^2 + b^2) \bmod 4 \neq 3$.
:::

::: proof
The Lean proof is the clock face above. Write $n = r + 2k$, where $r \in \{0, 1\}$ is the remainder of $n$ on division by $2$; expand the square in the cases $r = 0$ and $r = 1$ (`ring_nf`) and read off the remainders $0$ and $1$ (`omega`). For the second part, the residues of $a^2$ and $b^2$ each take one of two values, and the four combinations sum to $0, 1, 1, 2$, never to $3$. The full proof is checked by the Lean kernel.
:::

The clock face shows at once that a line prime **cannot** be a sum of two squares: $p \bmod 4 = 3$ is exactly the empty slot. The converse direction, that a plane prime **always** is one, cannot be read off the clock face; it requires that arithmetic modulo $p$ really contain a $90^\circ$ rotation.

::: {.viz src="pythagoras-number-escape" preset="seven" height="500"}
**7: no lattice point on the circle.** The magenta circle of radius $\sqrt{7}$ threads between the lattice points and touches none of them: $7 \bmod 4 = 3$ falls exactly into the empty slot of the clock face, so $7$ is not a sum of two squares ([@lem-ch29-square-residues-mod-four]); it is a line prime.
:::

::: {.theorem #thm-ch29-face-prime-two-squares title="A Prime Congruent to 1 Modulo 4 Is a Sum of Two Squares; a Gaussian Integer Times Its Conjugate Is a Sum of Two Squares" lean="D5/S3/PrimeForms/SumTwoSquares.prime_eq_sq_add_sq_of_mod_four_eq_one D5/S3/PrimeForms/GaussianIntegers/GaussianIntegerNorm.gaussian_integer_mul_conj_eq_sq_add_sq"}
1. Let $p$ be a prime natural number with $p \bmod 4 = 1$. Then there are natural numbers $a, b$ with $p = a^2 + b^2$.
2. For all integers $a, b$, in the complex numbers $\mathbb{C}$, $(a + bi)\,\overline{(a + bi)} = a^2 + b^2$.
:::

::: proof
In the Lean file, part 1 is a single wrapper: $p \bmod 4 = 1$ gives $p \bmod 4 \neq 3$, and Mathlib's version of Fermat's two-square theorem, `Nat.Prime.sq_add_sq`, does the rest. Mathlib argues in the Gaussian integers $\mathbb{Z}[i]$. Since $p \bmod 4 \neq 3$, $-1$ is a square modulo $p$ (`ZMod.exists_sq_eq_neg_one_iff`), so there is $0 \le k < p$ with $p \mid k^2 + 1 = (k + i)(k - i)$. Both factors have norm $k^2 + 1$, smaller than the norm $p^2$ of $p$, so $p$ divides neither of them, and $p$ is not a prime element of $\mathbb{Z}[i]$. In the Euclidean ring $\mathbb{Z}[i]$ this means $p$ is reducible: $p = uv$ with neither $u$ nor $v$ a unit. Taking norms, $N(u)\,N(v) = p^2$ with neither factor equal to $1$, which forces $N(u) = p$; taking $a$ and $b$ to be the absolute values of the real and imaginary parts of $u$ gives $p = a^2 + b^2$. Part 2 rewrites $z\,\overline{z}$ as the squared modulus with `Complex.mul_conj` and evaluates the squared modulus of $z = a + bi$ as $a^2 + b^2$ (`norm_num`). The full proof is checked by the Lean kernel.
:::

Geometrically, $p = a^2 + b^2$ says that the circle of radius $\sqrt{p}$ passes through the lattice point $(a, b)$; part 2 writes this as the product of a conjugate pair of vectors in the Gaussian plane, $p = (a + bi)(a - bi)$. Read $i$ as the bivector generator $\hat{\mathbf{I}}$ introduced above, and the prime $p$ spans an orthogonal face: hence the name "plane prime." A line prime, in turn, has an even stronger rigidity: not only is it not a sum of two squares itself, but as soon as it divides a sum of two squares it must divide both legs.

::: {.viz src="pythagoras-number-escape" preset="five" height="500"}
**Plane primes and line primes.** When the circle of radius $\sqrt{p}$ passes through a lattice point, $p = a^2 + b^2$ is a plane prime, and squaring $a + bi$ gives an integer right triangle; step through the odd primes with the rail under the figure, and for $p \equiv 3 \pmod 4$ the circle touches no lattice point at all.
:::

::: {.lemma #lem-ch29-line-prime-descent title="A Prime Congruent to 3 Modulo 4 That Divides a Sum of Two Squares Divides Both Bases" lean="D5/S3/PrimeForms/ThreeModFourDescent.prime_dvd_dvd_of_dvd_sq_add_sq"}
Let $q$ be a prime with $q \bmod 4 = 3$, and let $a, b$ be natural numbers. If $q \mid a^2 + b^2$, then $q \mid a$ and $q \mid b$.
:::

::: proof
Move the divisibility into the finite field $\mathbb{Z}/q\mathbb{Z}$ (`ZMod q` in Lean), where it reads $a^2 + b^2 = 0$. If $b \neq 0$, then $b$ is invertible and $a^2 = -b^2$ gives $(a\,b^{-1})^2 = -1$, so $-1$ is a square modulo $q$; Mathlib's `ZMod.mod_four_ne_three_of_sq_eq_neg_sq'` then yields $q \bmod 4 \neq 3$, contradicting the hypothesis. Hence $b = 0$, so $a^2 = 0$, and since a field has no zero divisors, $a = 0$. Finally $a = 0$ and $b = 0$ translate back to $q \mid a$ and $q \mid b$. The full proof is checked by the Lean kernel.
:::

Putting the behaviour of the two kinds of prime together yields a criterion for every natural number: plane primes and $2 = 1^2 + 1^2$ may be multiplied in freely, while line primes can only enter in pairs.

::: {.theorem #thm-ch29-two-squares-classification title="The Prime-Factorization Criterion for Sums of Two Squares" lean="D5/S3/PrimeForms/SumTwoSquaresClassification.eq_sq_add_sq_iff_even_factorization"}
For a natural number $n$ and a prime $q$, let $v_q(n)$ denote the exponent of $q$ in the prime factorization of $n$ ($0$ when $q \nmid n$; by Lean's convention, every exponent of $n = 0$ is $0$). Then for every natural number $n$: there are natural numbers $a, b$ with $n = a^2 + b^2$ if and only if $v_q(n)$ is even for every prime $q$ with $q \bmod 4 = 3$.
:::

::: proof
The Lean file only changes the form of the statement. Mathlib's `Nat.eq_sq_add_sq_iff` states the condition only for the primes dividing $n$ and measures exponents with the $p$-adic valuation `padicValNat`; the wrapper restates it for all primes: for a prime dividing $n$ the two exponents agree (`Nat.factorization_def`), a prime not dividing $n$ has exponent $0$ (`Nat.factorization_eq_zero_of_not_dvd`), and for $n = 0$ both sides hold. The mathematics lives in Mathlib's proof, which passes through the intermediate form "$n = g^2 m$ with $-1$ a square modulo $m$." For $\Rightarrow$: if $n = x^2 + y^2 > 0$, pull out $g = \gcd(x, y)$; in the remaining $m = x_1^2 + y_1^2$ the numbers $x_1, y_1$ are coprime and $-1$ is a square modulo $m$. A prime congruent to $3$ modulo $4$ dividing $m$ would make $-1$ a square modulo that prime, which is impossible, so $v_q(n) = 2v_q(g)$. For $\Leftarrow$: write $n$ as a square times a squarefree $m$. The exponent condition leaves $m$ with no prime factor congruent to $3$ modulo $4$, so $-1$ is a square modulo each prime factor of $m$, and by the Chinese remainder theorem also modulo $m$. Induction over the prime factors of $m$ then finishes: each prime factor is a sum of two squares (Fermat's theorem), and a product of sums of two squares is again one,

$$
(x^2 + y^2)(u^2 + v^2) = (xu - yv)^2 + (xv + yu)^2,
$$

after which the square factor is multiplied back in. The full proof is checked by the Lean kernel.
:::

**Three manual derivations.** The following three statements are not frozen as such; apart from elementary congruence arithmetic, they use only the lemmas and theorems above (the derivations themselves are this book's manual derivations):

1. **An odd prime $p$ is a sum of two squares if and only if $p \equiv 1 \pmod 4$.** Sufficiency is part 1 of [@thm-ch29-face-prime-two-squares]; necessity comes from [@lem-ch29-square-residues-mod-four]: an odd prime leaves remainder $1$ or $3$ modulo $4$, and slot $3$ is empty.
2. **For an odd prime $p$, the congruence $x^2 \equiv -1 \pmod p$ is solvable if and only if $p \equiv 1 \pmod 4$.** If $p \equiv 1$, take $p = a^2 + b^2$. Here $b = 0$ would make the prime $p = a^2$ a perfect square, and $b^2 \le p < p^2$ gives $b < p$; so $0 < b < p$ and $b$ is invertible modulo $p$. From $a^2 \equiv -b^2$, the residue $x \equiv a\,b^{-1}$ satisfies $x^2 \equiv -1$. If $p \equiv 3$ and $x^2 \equiv -1$ with $0 \le x < p$, then $p \mid x^2 + 1^2$, and [@lem-ch29-line-prime-descent] gives $p \mid 1$, a contradiction. This is precisely the dividing line, drawn above, between primes modulo which $\sqrt{-1}$ exists and those modulo which it does not.
3. **For a line prime the negative Pell equation has no solution: if $p \equiv 3 \pmod 4$, then $m^2 - p\,n^2 = -1$ has no integer solution.** Otherwise $m^2 + 1 = p\,n^2$, so $p \mid \lvert m\rvert^2 + 1^2$, and [@lem-ch29-line-prime-descent] again gives $p \mid 1$. The value $+1$, on the other hand, is reached, for instance $2^2 - 3 \cdot 1^2 = +1$ and $8^2 - 7 \cdot 3^2 = +1$.

::: {.viz src="pythagoras-number-escape" preset="locked" height="500"}
**$d = 7$: $-1$ is never reached.** The convergents $2/1, 3/1, 5/2, 8/3, \dots$ close in on the line $m = \sqrt{7}\,n$, while $m^2 - 7n^2$ runs through $-3, +2, -3, +1$ and repeats. The magenta points (negative gap) only reach $-3$; every cycle comes back to a cyan $+1$ (such as $8/3$) and never touches $-1$. This is hand derivation 3.
:::

::: {.example #ex-ch29-face-and-line-primes title="The Two Legs of a Plane Prime, the 90° Rotation Modulo p, and the Four Years 2024 to 2027"}
For the first five plane primes, here are the decomposition, the $\sqrt{-1}$ built by manual derivation 2, and, for comparison with the literature remark below, the least positive solution of the negative Pell equation (the one with the smallest $n \ge 1$; every entry can be checked directly in exact integer arithmetic):

| $p$ | $p = a^2 + b^2$ | $p = (a + bi)(a - bi)$ | $x \equiv \pm a\,b^{-1}$, $x < p/2$ | $x^2 + 1$ | least negative-Pell $(m, n)$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $5$ | $1^2 + 2^2$ | $(1 + 2i)(1 - 2i)$ | $2$ | $5 = 1 \cdot 5$ | $(2, 1)$ |
| $13$ | $2^2 + 3^2$ | $(2 + 3i)(2 - 3i)$ | $5$ | $26 = 2 \cdot 13$ | $(18, 5)$ |
| $17$ | $1^2 + 4^2$ | $(1 + 4i)(1 - 4i)$ | $4$ | $17 = 1 \cdot 17$ | $(4, 1)$ |
| $29$ | $2^2 + 5^2$ | $(2 + 5i)(2 - 5i)$ | $12$ | $145 = 5 \cdot 29$ | $(70, 13)$ |
| $37$ | $1^2 + 6^2$ | $(1 + 6i)(1 - 6i)$ | $6$ | $37 = 1 \cdot 37$ | $(6, 1)$ |

For the line primes $3, 7, 11, 19, 23$ not a single row can be filled in: the second column is blocked by [@lem-ch29-square-residues-mod-four], and the fourth and last columns are ruled out by manual derivations 2 and 3.

Now apply [@thm-ch29-two-squares-classification] to a few specific numbers:

| $n$ | $n \bmod 4$ | factorization | exponents at primes $\equiv 3 \pmod 4$ | as two squares |
| :---: | :---: | :---: | :---: | :---: |
| $45$ | $1$ | $3^2 \cdot 5$ | $v_3 = 2$ | $3^2 + 6^2$ |
| $2024$ | $0$ | $2^3 \cdot 11 \cdot 23$ | $v_{11} = 1$, $v_{23} = 1$ | no |
| $2025$ | $1$ | $3^4 \cdot 5^2$ | $v_3 = 4$ | $0^2 + 45^2 = 27^2 + 36^2$ |
| $2026$ | $2$ | $2 \cdot 1013$ | no such prime factor | $1^2 + 45^2$ |
| $2027$ | $3$ | $2027$ (prime) | $v_{2027} = 1$ | no |

The clock face already stops $2027$. It cannot stop $2024$, which is $0$ modulo $4$; what excludes $2024$ is the pair of odd exponents $v_{11} = v_{23} = 1$. The number $45$ shows the descent at work: $3 \mid 3^2 + 6^2$, so by [@lem-ch29-line-prime-descent] it divides both $3$ and $6$; cancelling $3^2$ leaves $5 = 1^2 + 2^2$, and the exponent $v_3$ drops by $2$ in one step. In $2026 = 2 \cdot 1013$ the factor $1013$ is $1$ modulo $4$, a plane prime with $1013 = 22^2 + 23^2$, and the product identity above gives

$$
\begin{aligned}
2026 &= (1^2 + 1^2)(22^2 + 23^2) \\
&= (22 - 23)^2 + (23 + 22)^2 = 1^2 + 45^2,
\end{aligned}
$$

which are exactly the two legs read off from the Gaussian product $(1 + i)(22 + 23i) = -1 + 45i$.
:::

::: {.remark #rem-ch29-pell-primes-hilbert-literature title="Splitting and Inertia of Primes in the Gaussian Integers, the Negative Pell Equation for Plane Primes, and Hilbert Reciprocity (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** The boxes and manual derivations above stop at "is a sum of two squares" and "descends under division." The following three classical results lie outside the frozen declarations of the `trureturing@dev` commit locked by this book:

1. **Splitting, inertia and ramification in the Gaussian integers.** In the ring $\mathbb{Z}[i]$ of Gaussian integers, for $p \equiv 1 \pmod 4$ the factors $a + bi$ and $a - bi$ are two non-associate Gaussian primes ($p$ splits); for $p \equiv 3 \pmod 4$ the prime $p$ remains a Gaussian prime ($p$ is inert); and $2 = -i(1 + i)^2$ is the only ramified prime.
2. **The negative Pell equation for plane primes.** For every prime $p \equiv 1 \pmod 4$ the negative Pell equation $m^2 - p\,n^2 = -1$ has an integer solution (the last column of the table above shows the first five cases), so the fundamental unit of the real quadratic field $\mathbb{Q}(\sqrt{p})$ has norm $-1$. In this book's geometric reading, a unit of norm $-1$ is a glide reflection that flips orientation, and only its square, with $(-1)^2 = +1$, returns to the branch of pure rotations. The "no solution" half on the side of line primes has already been obtained from a frozen lemma in manual derivation 3.
3. **Hilbert reciprocity.** For all nonzero rationals $a, b \in \mathbb{Q}^\times$, the local Hilbert symbol $(a, b)_v \in \{+1, -1\}$ equals $-1$ at only finitely many places $v$, and its product over all prime places and the real place at infinity equals $+1$:

   $$
   \prod_{v \le \infty} (a, b)_v = +1.
   $$

   In this book's geometric reading, a $-1$ chiral twist can never arise in isolation on a single prime axis; it must cancel in pairs across places, an arithmetic echo of the principle of Chapter 10 that "pairwise comparison is always consistent and order-independent."
:::

## 29.2.2 Pillar 2: Intersecting Two Quadratic Seams ($2 \times 2 = 4$)—From a Single Quadric to the Congruent-Number Elliptic Curve Torus {#sec-coda-congruent-elliptic-torus}

Passing from a single quadratic conic to the classical congruent-number problem—where a rational right triangle simultaneously satisfies a Pythagorean hypotenuse constraint and a prescribed orthogonal area—leads to the following classical algebraic-geometric and Riemann-surface structure:

::: {.remark #rem-ch29-elliptic-torus-literature title="Congruent-Number Birational Reduction, Complex Elliptic-Curve Torus Topology, and Abelian Group Law (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In classical number theory, algebraic geometry, and Riemann-surface theory (outside the `trureturing@dev` formalization locked by this book), passing from a single conic to the intersection of two quadric surfaces in projective three-space $\mathbb{P}^3$ is governed by the following results:

- **From a genus-$0$ conic to the congruent-number elliptic curve**: A single Pell equation $m^2 - d\,n^2 = \pm 1$ is a single quadratic conic of genus $g = 0$; over $\mathbb{C}$, a smooth projective curve of genus $0$ is topologically a 2-sphere $S^2$ with Euler characteristic $\chi(S^2) = 2$ (for the Hairy Ball obstruction, see Chapter 21, [@rem-hairy-ball-adams-literature]), which cannot support a globally nowhere-vanishing group flow without singularities. In the classical **Congruent Number Question**—which positive integers $d$ occur as the area of a rational right triangle $(a, b, c) \in \mathbb{Q}_{>0}^3$?—one simultaneously imposes two quadratic constraints:

  $$
  a^2 + b^2 = c^2 \quad (\text{Pythagorean hypotenuse}), \qquad \frac{1}{2}ab = d \quad (\text{orthogonal bivector area}),
  $$

  equivalently intersecting the two quadric surfaces defined by $(a + b)^2 = c^2 + 4d$ and $(a - b)^2 = c^2 - 4d$ in projective three-space $\mathbb{P}^3$ after homogenization (degree $2 \times 2 = 4$). Under the classical birational substitution $x = (a+c)/b,\; y = 2(a+c)/b^2$ (or $X = dx = d(a+c)/b,\; Y = d^2 y = 2d^2(a+c)/b^2$ for the standard Weierstrass model $Y^2 = X^3 - d^2 X$), this pair of Pythagorean constraints is birationally equivalent to the **congruent-number elliptic curve**:

  $$
  E_d :\quad d\,y^2 = x^3 - x = x(x - 1)(x + 1),
  $$

  whose three roots $0,\; +1,\; -1$ on the right-hand side mark the origin together with the $\pm 1$ seam boundaries.
- **Complex torus topology and abelian group law**: Over $\mathbb{C}$, the Riemann surface $E_d(\mathbb{C}) \cong \mathbb{C}/(\mathbb{Z}\omega_1 \oplus \mathbb{Z}\omega_2)$ branched over $\{0, +1, -1, \infty\}$ is no longer a genus-$0$ 2-sphere $S^2$ ($\chi = 2$), but a **genus-$1$ torus $T^2 = S^1 \times S^1$ with Euler characteristic $\chi(T^2) = 2 - 2g = 0$**;
- Because $\chi(T^2) = 0$, the even-sphere Hairy Ball obstruction (cf. [@rem-hairy-ball-adams-literature]) disappears on the torus: the invariant holomorphic differential $\omega = dx/y$ is everywhere nonvanishing and pole-free on the smooth projective curve $E_d$, endowing $E_d(\mathbb{Q})$ with a smooth global abelian group law $P \oplus Q$ (cf. [@rem-diophantine-z-in-q-literature] in Chapter 23 on Poonen's elliptic-curve divisibility method).
:::

::: {.viz src="hairy-ball-normal-escape" preset="torus" height="500"}
**On a torus the arrows vanish nowhere.** On the torus $\bigl((R + r\cos\theta)\cos\phi,\, (R + r\cos\theta)\sin\phi,\, r\sin\theta\bigr)$ ($R > r > 0$) the cyan unit tangent vectors $\hat{\mathbf{e}}_\phi = (-\sin\phi, \cos\phi, 0)$ all point along the big circle, with length $1$ everywhere; the amber point goes once round, its arrow never shrinking, and there is no magenta ring of a zero on the torus. $\chi(T^2) = 0$, against $\chi(S^2) = 2$ for the sphere (literature result, not formalized in this book; see [@rem-ch29-elliptic-torus-literature]). The picture shows a surface of the same topology, not the elliptic curve itself.
:::

## 29.2.3 Pillar 3: Finite-Field Elliptic-Curve Reduction, the Frobenius Cosine, and the $S^3 \cong \mathrm{SU}(2)$ Projection {#sec-coda-hasse-sato-tate}

A deeper arithmetic–geometric correspondence appears when we reduce the normalized congruent-number elliptic curve $E : y^2 = x^3 - x$ onto each odd prime axis $\mathbb{F}_p$ ($p \ge 3$) from Chapter 22:

::: {.remark #rem-ch29-hasse-gauss-literature title="Finite-Field Point-Count Deviation, Hasse's Bound, and Gauss's CM Point-Count Formula (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In classical arithmetic geometry (outside the `trureturing@dev` formalization locked by this book), over the finite field $\mathbb{F}_p$ ($p \ge 3$), the flat projective line $\mathbb{P}^1(\mathbb{F}_p)$ has $p + 1$ points (including the point at infinity), and the point-count deviation of the smooth projective elliptic curve $E(\mathbb{F}_p)$ ($E : y^2 = x^3 - x$) from $p + 1$ is given by the Legendre-symbol character sum

$$
a_p = p + 1 - \#E(\mathbb{F}_p) = -\sum_{x=0}^{p-1} \left(\frac{x^3 - x}{p}\right),
$$

which is governed by two foundational theorems:

1. **Hasse's Theorem (H. Hasse, 1936; the proved Riemann Hypothesis for elliptic curves over finite fields)**: For every prime $p$ of good reduction, the point-count deviation obeys

   $$
   |a_p| \le 2\sqrt{p}.
   $$

   The scaling factor $\sqrt{p} = p^{1/2}$ carries the critical-line exponent $\sigma = 1/2$ of the local finite-field zeta function. Dividing $a_p$ by $2\sqrt{p}$ normalizes the Frobenius eigenvalues $\alpha_p, \bar{\alpha}_p = \sqrt{p}\,e^{\pm i\theta_p}$ onto the unit circle and turns each prime's point-count deviation into a **Frobenius cosine projection**:

   $$
   \cos\theta_p := \frac{a_p}{2\sqrt{p}} \in [-1, +1].
   $$

   In the chord–sagitta language of [§34.30](ch34-s30-arc-body-calculus-and-finite-stokes.md#sec-ch34-30-1): the normalized Frobenius eigenvalue $\alpha_p/\sqrt p=e^{i\theta_p}$ is a rotor and $v_p:=1-\dfrac{a_p}{2\sqrt p}=1-\cos\theta_p$ is its sagitta; the Hasse bound $\lvert a_p\rvert\le2\sqrt p$ is $0\le v_p\le2$, and the point-count formula $\#E(\mathbb{F}_{p^n})=p^n+1-\alpha_p^n-\bar\alpha_p^{\,n}$ (literature result) reads $\#E(\mathbb{F}_{p^n})=(p^{n/2}-1)^2+2p^{n/2}\bigl[1-T_n(1-v_p)\bigr]$, with $T_n$ the Chebyshev polynomial of the first kind.

2. **Gauss's CM Point-Count Formula and the Line/Plane Prime Dichotomy**: On the Pythagorean congruent curve $y^2 = x^3 - x$ (which has complex multiplication by $\mathbb{Z}[i]$), the two odd-prime families of Pillar 1 ([@thm-ch29-face-prime-two-squares], [@lem-ch29-line-prime-descent]) separate cleanly under $\cos\theta_p$:
   - **At inert "Line Primes" $p \equiv 3 \pmod 4$**: because $(-x)^3 - (-x) = -(x^3 - x)$ and $\left(\frac{-1}{p}\right) = -1$, the spins at $+x$ and $-x$ cancel pairwise, forcing

     $$
     a_p = 0 \implies \cos\theta_p = 0 \quad (\theta_p = \pi/2\text{, the orthogonal equator})!
     $$

   - **At split "Plane Primes" $p \equiv 1 \pmod 4$**: for any integers $a,b$ satisfying $p=a^2+b^2$, with $a$ odd and $b$ even, the classical Gauss formula (a literature result; see [@rem-ch29-gauss-character-application]) gives $|a_p|=2|a|$. The magnitude of the Frobenius cosine therefore equals the **Pythagorean cosine** (adjacent leg over hypotenuse) of the prime's own Gaussian right triangle $(|a|, |b|, \sqrt{p})$:

     $$
     |\cos\theta_p| = \frac{|a_p|}{2\sqrt{p}} = \frac{|a|}{\sqrt p} = \frac{|a|}{\sqrt{a^2 + b^2}}.
     $$
:::

::: {.viz src="pythagoras-number-escape" preset="count" height="500"}
**Counting points mod $13$.** Put $y^2 = x^3 - x$ into a grid of only $13$ numbers and check every cell: $4$ cyan lattice points, $3$ neutral branch points with $y = 0$ and the point at infinity make $8$, six fewer than $p + 1 = 14$, so $a_{13} = 6$. The ring of spins at the upper right places $x = 0, 1, \dots, 12$ on a circle and colours each by the Legendre symbol $\left(\frac{x^3 - x}{13}\right)$: $2$ cyan $+1$ (the column holds a pair of points $\pm y$), $8$ magenta $-1$ (the column is empty) and $3$ neutral $0$, summing to $-6$, which is $-a_{13}$ in the formula above; the amber cosine on the right is $6/(2\sqrt{13}) \approx 0.832$. Since $13 = 3^2 + 2^2$ and $6 = 2 \cdot 3$, the deficit is twice the odd leg of the Gaussian triangle, as in item 2 above (literature result, not formalized in this book).
:::

::: {.remark #rem-ch29-gauss-character-application title="From Square Fibers to a Gaussian Triangle (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** Why does the same odd leg $|a|$ appear in the curve's point count? The key is to express the deviation as the sum of two conjugate complex numbers. Conjugation cancels their imaginary parts, leaving twice the real part, while their length is the square root of the prime $p$. Here is the classical character-sum derivation. Schoof's survey provides background on point counting and complex multiplication[^gauss-count-background].

Fix any prime $p\equiv1\pmod4$ and any integers $a,b$ with $p=a^2+b^2$, $a$ odd and $b$ even. Throughout, take $F=\mathbb{F}_p$ and the same curve $E:y^2=x^3-x$. Its projective equation is $Y^2Z=X^3-XZ^2$; its discriminant is $64\ne0$, so it is smooth. Setting $Z=0$ shows that its unique point at infinity is $O=[0:1:0]$. Write

$$
N=\#E(F),\qquad T=p+1-N=a_p.
$$

Let $\phi(t)=\left(\frac{t}{p}\right)$ be the quadratic character, with $\phi(0)=0$. Each vertical line $x=\text{constant}$ meets the affine curve in zero, one, or two points, since for every $t\in F$,

$$
\#\{y\in F:y^2=t\}=1+\phi(t).
$$

A nonzero square has two roots, a nonsquare has none, and zero has one. Thus the actual curve points consist of these vertical fibers together with exactly one $O$:

$$
N=1+\sum_{x\in F}\bigl(1+\phi(x^3-x)\bigr),\qquad
T=-\sum_{x\in F}\phi(x^3-x).
$$

Next record the fibers in the complex plane. The group $F^\times$ is cyclic of order $p-1$, and $4\mid p-1$, so we may choose a multiplicative character $\chi:F\to\mathbb{C}$ of exact order four, again extended by zero at zero. On nonzero elements its values lie in $\{1,i,-1,-i\}$, and its square is the unique nontrivial quadratic character. Hence $\chi^2=\phi$, with the integer values of $\phi$ understood through their usual embedding into $\mathbb{C}$. This auxiliary $\chi$ is constructed from $p$, rather than imposed as an additional assumption. We have $\phi(-1)=1$, and $\chi,\phi,\chi\phi=\chi^{-1}$ are all nontrivial.

Define the Jacobi sum

$$
J(\chi,\phi)=\sum_{t\in F}\chi(t)\phi(1-t).
$$

Now group terms by $t=x^2$. Since $\chi(x^2)=\phi(x)$, we have $\phi(x^3-x)=\chi(x^2)\phi(x^2-1)$. The weight is constant on each square fiber, so

$$
\begin{aligned}
\sum_{x\in F}\phi(x^3-x)
&=\sum_{t\in F}\#\{x\in F:x^2=t\}\,\chi(t)\phi(t-1)\\
&=\sum_{t\in F}(1+\phi(t))\chi(t)\phi(1-t)\\
&=J(\chi,\phi)+J(\chi^{-1},\phi)\\
&=J(\chi,\phi)+\overline{J(\chi,\phi)}.
\end{aligned}
$$

The second line uses $\phi(-1)=1$, the third uses $\phi\chi=\chi^{-1}$, and the last uses complex conjugation of character values. This grouping includes the zero fiber: $t=0$ has one square root but $\chi(0)=0$; at $t=1$ the weight contains $\phi(0)=0$. Thus $x=0,\pm1$ have not been discarded: each contributes one affine point to the original count. Writing $J=J(\chi,\phi)$ gives $T=-2\operatorname{Re}J$.

All these character values are Gaussian integers, so $J=r+si$ for integers $r,s$. The classical Jacobi-sum norm formula applies when both characters and their product are nontrivial, giving $|J|=\sqrt p$[^gauss-jacobi-background], hence $r^2+s^2=p$. We still need to identify which leg is the real part. The integrality congruence for quartic Jacobi sums gives some $z\in\mathbb{Z}[i]$ such that

$$
J=-1+z(i-1)^2.
$$

Writing $z=u+vi$ with $u,v\in\mathbb{Z}$ and using $(i-1)^2=-2i$, we obtain

$$
J=(-1+2v)-2ui,\qquad r=-1+2v\text{ is odd},\quad s=-2u\text{ is even}.
$$

Finally compare $r+si$ with the given $a+bi$. The Gaussian norm $N_G(x+yi)=(x+yi)(x-yi)=x^2+y^2$ is multiplicative. Both numbers have norm equal to the prime $p$, ruling out a factorization into nonunits; in the Euclidean ring $\mathbb{Z}[i]$, they are therefore Gaussian primes. Since $p=(a+bi)(a-bi)$, unique factorization in the Gaussian integers makes $r+si$ associate to either $a+bi$ or $a-bi$. A unit must have norm $1$, and the integer equation $x^2+y^2=1$ gives just the units $1,-1,i,-i$. Multiplication by $\pm i$ would put the even imaginary coordinate in the real slot, contradicting the oddness of $r$; multiplication by $\pm1$ only changes the real part's sign. Therefore $|r|=|a|$ for every such pair $a,b$, and

$$
|T|=2|r|=2|a|,\qquad
\left|\frac{T}{2\sqrt p}\right|
=\frac{|a|}{\sqrt p}
=\frac{|a|}{\sqrt{a^2+b^2}}.
$$

This explains the adjacent-leg projection: $J$ has length $\sqrt p$, and its absolute real part is precisely the odd leg $|a|$. No sign for $T$ is chosen, and no restriction modulo $8$ is imposed on $p$. For example, at $p=5=1^2+2^2$, the values of $\phi(x^3-x)$ for $x=0,1,2,3,4$ are $0,0,1,1,0$. There are seven affine points and the point $O$, so $N=8$, $T=-2$, and the absolute cosine is $1/\sqrt5$.

The three algebraic results used here have distinct scopes. The [power-fiber counting formula](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.power_fiber_card_eq_one_add_character_sum) applies to every finite field $K$, positive integer $d$, and complex multiplicative character $\eta:K\to\mathbb{C}$ of exact order $d$. For every $t\in K$, it states, in $\mathbb{C}$,

$$
\#\{x\in K:x^d=t\}
=1+\sum_{j=1}^{d-1}\eta^j(t).
$$

Characters are extended by zero at zero, and the natural-number count on the left is embedded in $\mathbb{C}$ in the usual way. Taking $K=\mathbb{F}_p$, $d=2$, and $\eta=\phi$ gives the square-fiber formula above, including at $t=0$.

The [Jacobi-sum norm formula](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.norm_jacobiSum) applies to complex multiplicative characters $\alpha,\beta$ on any finite field $K$, under all three hypotheses $\alpha\ne1$, $\beta\ne1$, and $\alpha\beta\ne1$. Its conclusion is

$$
\left|\sum_{t\in K}\alpha(t)\beta(1-t)\right|
=\sqrt{\#K}.
$$

Here $1$ denotes the trivial multiplicative character, equal to $1$ away from zero and $0$ at zero. For $K=\mathbb{F}_p$, $\alpha=\chi$, and $\beta=\phi$, the exact orders are four for $\chi$, two for $\phi$, and four for $\chi\phi=\chi^{-1}$, so all three nontriviality hypotheses hold. The [classification of Gaussian units](lean:D5/S3/ConceptDynamics/Coding/ResetNativeIntegerChart.gaussian_unit) states that every invertible Gaussian integer $u\in\mathbb{Z}[i]^\times$ satisfies $u=1$, $u=i$, $u=-1$, or $u=-i$: precisely the four possibilities used above to rule out exchanging the two legs.

The quartic integrality congruence corresponds to Mathlib's `exists_jacobiSum_eq_neg_one_add`, with $n=4$, primitive fourth root $i$, and $4\mid p-1$. The three algebraic results respectively control an individual fiber, the length of a Jacobi sum, and the units of the Gaussian integers; none assumes the curve's trace formula. The complete derivation connecting the actual curve's point count, Jacobi sums, Gaussian primes, and the normalized cosine remains a **literature result, not formalized in this book**. It supplies no formal proof of the adjacent inert-prime cancellation, the general Hasse bound, or the non-CM Sato–Tate distribution.
:::

[^gauss-count-background]: René Schoof, “Counting points on elliptic curves over finite fields”, *Journal de Théorie des Nombres de Bordeaux* 7 (1995), §§1, 3. Cited here only for background on standard Weierstrass point counts and Gaussian complex multiplication.

[^gauss-jacobi-background]: Keith Conrad, *Gauss and Jacobi Sums*, author's notes, Theorem 2.4 and Corollary 2.5, on the norm of Gauss sums of nontrivial characters and the Jacobi-sum norm when both characters and their product are nontrivial. This citation supports only the norm step here, not the complete trace derivation for this curve.

::: {.remark #rem-ch29-arithmetic-geometry-literature title="Sato–Tate Equidistribution on Non-CM Elliptic Curves and Formalization Boundary (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** Passing to a generic elliptic curve over $\mathbb{Q}$ without extra complex-multiplication symmetry (such as $y^2 = x^3 - x + 1$), the asymptotic distribution of the normalized cosines $\cos\theta_p \in [-1, +1]$ as $p \to \infty$ over all primes of good reduction is established by the **Sato–Tate Theorem** (proved for non-CM elliptic curves over $\mathbb{Q}$ by Barnet-Lamb, Geraghty, Harris, and Taylor, *Publ. Res. Inst. Math. Sci.* **47**(1), 29–98 (2011)): $\theta_p \in [0, \pi]$ is equidistributed with respect to the **four-dimensional hyperspherical slice law**:

$$
d\mu_{\mathrm{ST}}(\theta) = \frac{2}{\pi}\sin^2\theta\,d\theta \quad \Longleftrightarrow \quad \frac{2}{\pi}\sqrt{1 - u^2}\,du \quad (u = \cos\theta \in [-1, +1]).
$$

Geometrically, on the three-dimensional unit quaternion rotor sphere $S^3 \cong \mathrm{SU}(2)$—the parallelizable hypersphere defined by $s^2 + x^2 + y^2 + z^2 = 1$ with $\chi(S^3) = 0$ (cf. [@rem-hairy-ball-adams-literature])—the two-dimensional latitude sphere at polar angle $\theta \in [0, \pi]$ has radius $\sin\theta$ and surface area proportional to $\sin^2\theta$; projecting the uniform Haar measure of $S^3 \cong \mathrm{SU}(2)$ onto the normalized trace diameter $u = \frac{1}{2}\operatorname{Tr}(U) = \cos\theta \in [-1, +1]$ yields the $u$-coordinate density $\frac{2}{\pi}\sqrt{1-u^2}\,du$; in the polar angle $\theta$, the same measure is $\frac{2}{\pi}\sin^2\theta\,d\theta$.

Across the first two sections of this chapter, the Lindemann–Weierstrass theorem and T. Y. Chow's (1999) elementary-field theorem conditional on Schanuel's conjecture ([@conj-schanuel-dottie]), the splitting and inertia of primes in the Gaussian integers / negative Pell solvability for primes $p \equiv 1 \pmod 4$ / Hilbert's reciprocity law in [@rem-ch29-pell-primes-hilbert-literature], the complex elliptic-curve torus topology and abelian group law in [@rem-ch29-elliptic-torus-literature], Hasse's bound and Gauss's CM point-count derivation in [@rem-ch29-hasse-gauss-literature] and [@rem-ch29-gauss-character-application], and the Sato–Tate equidistribution theorem in the present remark are classical mathematical literature results outside the `trureturing@dev` formalization locked by this book; kernel-verified results in these sections are strictly the boxes with a `lean` attribute (such as [@lem-ch29-square-residues-mod-four], [@thm-ch29-face-prime-two-squares], [@lem-ch29-line-prime-descent], [@thm-ch29-two-squares-classification], [@thm-ch29-silver-pell-remainder], and [@thm-ch29-silver-best-approximation]) and the statements carrying explicit `lean:` citations (such as [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm), [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique), [`power_fiber_card_eq_one_add_character_sum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.power_fiber_card_eq_one_add_character_sum), [`norm_jacobiSum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.norm_jacobiSum), and [`gaussian_unit`](lean:D5/S3/ConceptDynamics/Coding/ResetNativeIntegerChart.gaussian_unit)).
:::

::: {.viz src="pythagoras-number-escape" preset="sato" height="500"}
**Another curve: the semicircle.** Switch to $y^2 = x^3 - x + 1$ (the cyan points): line primes no longer sit at zero, and the Frobenius cosines scatter between $-1$ and $1$; at $p = 53$, for instance, the cosine is $0.137$. On the right, the violet histogram over the $428$ primes of good reduction below $3000$ follows the dashed amber semicircle law $\frac{2}{\pi}\sqrt{1 - u^2}$, and the amber vertical line marks the $0.137$ of $p = 53$. A histogram over finitely many primes is only a numerical demonstration; the Sato–Tate distribution is the literature result of the remark above.
:::

In the overarching geometric synthesis of this book, starting from the Pell seam cracked open by Hippasus's right triangle ([@thm-ch29-silver-pell-remainder]) and reading across the arithmetic-geometry literature remarks above ([@rem-ch29-pell-primes-hilbert-literature], [@rem-ch29-elliptic-torus-literature], [@rem-ch29-hasse-gauss-literature], and [@rem-ch29-arithmetic-geometry-literature]), the point-count oscillations along the prime axes align visually with the cosine shadow cast by the quantum spinor sphere $S^3 \cong \mathrm{SU}(2)$ onto its diameter $[-1, +1]$.

::: {.viz src="pythagoras-number-escape" height="640"}
**Interactive laboratory `ORTHO//PYTHAGORAS`**: three scenes along the $\pm 1$ seam. The Pell seam: the convergents of $\sqrt{d}$ hug the line ever more closely while $m^2 - d\,n^2$ is a nonzero integer (for $d = 5$ the gray rings mark $\pm 4$ solutions from the family verified in Lean); line primes and plane primes: whether the circle of radius $\sqrt{p}$ passes through lattice points; points mod $p$: for the curve $y^2 = x^3 - x$, $a_p$ is held inside Hasse's bound, line primes sit exactly at zero, and the absolute value of the Frobenius cosine of a plane prime equals the cosine of its Gaussian triangle measured from the odd leg $|a|$. That plane primes are sums of two squares and line primes are not is verified in Lean ([@thm-ch29-face-prime-two-squares], [@lem-ch29-square-residues-mod-four]); Hasse's theorem and the Sato–Tate distribution are literature results, not formalized in this book.
:::

---
