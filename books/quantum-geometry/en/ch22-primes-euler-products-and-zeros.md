# Chapter 22 Primes as the Orthogonal Basis of Arithmetic: Euler Products and Riemann Zeros

> *"I keep feeling that the essence of the quantum is pairwise comparison: always consistent, independent of order."*

In [Chapter 21](ch21-diagonalization-and-escape.md) we saw that any formal shell attempting to seal all concepts within a fixed finite coordinate system is punctured along the relative semantic diagonal, launching an unending ascent through higher-dimensional spheres. Now let us turn our gaze toward the oldest infinite-dimensional edifice in human thought — **the multiplicative arithmetic of the positive integers** — and ask a direct geometric question:

When we speak of "pairwise comparison, always consistent, independent of order," which numbers inside the multiplicative monoid $\mathbb{N}_{\ge 1}$ actually serve as mutually independent **orthogonal basis axes**?

Along the additive number line, $1, 2, 3, 4, 5, 6, \dots$ look like uniformly spaced ticks on a single one-dimensional rod. Switch from addition to multiplication, however, and $6 = 2 \times 3$ is no longer an independent direction at all — it is the diagonal resultant of axis $2$ and axis $3$, while $12 = 2^2 \times 3$ takes two steps along axis $2$ and one step along axis $3$! By the Fundamental Theorem of Arithmetic (unique prime factorization), every positive integer $n \ge 1$ factors uniquely into prime powers, **always consistent and independent of the order in which the prime factors are multiplied**:

$$
n = \prod_{p \in \mathrm{Primes}} p^{v_p(n)} \quad\Longleftrightarrow\quad \ln n = \sum_{p \in \mathrm{Primes}} v_p(n)\,\ln p.
$$

Look at the geometric structure of that correspondence: unique prime factorization embeds every positive integer $n$ into the countably infinite **formal exponent lattice** $\bigoplus_{p \in \mathrm{Primes}} \mathbb{Z}\vv{e}_p$ spanned by formal basis vectors $\{\vv{e}_p\}_{p \in \mathrm{Primes}}$ (equipped with the formal inner product $\langle \vv{e}_p, \vv{e}_q\rangle = \delta_{pq}$, so that $v_p(n) \in \mathbb{N}$ is the nonnegative integer coordinate of $n$ along the $p$-th formal prime axis $\vv{e}_p$), while taking the natural logarithm defines a linear weight functional $\ln n = \sum_p v_p(n)\,\ln p$ whose weights $\ln 2, \ln 3, \ln 5, \dots$ are linearly independent over $\mathbb{Q}$ ([@thm-prime-log-independence]) — no prime axis casts even the slightest rational divisibility shadow onto any other prime axis (throughout this chapter, our geometric language of "orthogonal prime axes" refers to this formal exponent-lattice basis paired with its $\mathbb{Q}$-linearly independent logarithmic weights).

Guided by this geometric realization of primes as orthogonal axes, this chapter establishes the Lean-verified identities linking the **Dirichlet natural-number series**, the **simple-pole residue at $s = 1$**, and the **Euler prime product** on the half-plane of absolute convergence $\operatorname{Re}(s) > 1$, examines the "polyhedral prime sieve" remainder under finite truncation, and demarcates the exact epistemic boundary separating these proved theorems from the open **Riemann Hypothesis**.

![Primes as orthogonal basis axes, the Euler product, and the Riemann critical line: the Dirichlet–Euler identity on Re(s) > 1, finite prime-sieve truncation remainder, and the open critical-line conjecture at σ = 1/2](../assets/fig-22-euler-prime-resonator.svg)

## 22.1 Orthogonal Prime Axes and Canceling Infinity by Factorization {#sec-ch22-1}

Why do the author's foundational notes observe that *"the essence of handling an infinite problem is factorization — seeing how to cancel infinity out"*?

Consider an infinite series summed over all positive integers $n = 1, 2, 3, \dots$. Viewed additively, each term $n^{-s}$ sits entangled with infinitely many composite neighbors. Once we apply order-independent unique prime factorization, however, every composite number $n = p_1^{a_1} \cdots p_r^{a_r}$ resolves into a product of independent components along the prime axes, $n^{-s} = p_1^{-a_1 s} \cdots p_r^{-a_r s}$. At that moment, **the global infinite sum over all natural numbers factorizes into an infinite product of one-dimensional geometric series along the individual prime axes!**

Along each single prime axis $p$, summing over the coordinate ticks $a = 0, 1, 2, 3, \dots$ is nothing more than a geometric series with ratio $p^{-s}$ (satisfying $|p^{-s}| = p^{-\operatorname{Re}(s)} < 1$ whenever $\operatorname{Re}(s) > 1$):

$$
1 + p^{-s} + p^{-2s} + p^{-3s} + \cdots \;=\; \frac{1}{1 - p^{-s}} \;=\; (1 - p^{-s})^{-1}.
$$

In a single algebraic stroke, the infinite sum $1 + p^{-s} + p^{-2s} + \cdots$ along axis $p$ collapses into the closed factor $(1 - p^{-s})^{-1}$! Multiplying those factors across all mutually orthogonal prime axes $p \in \mathrm{Primes}$ traverses every finitely supported exponent vector $(v_2, v_3, v_5, \dots)$ exactly once by the distributive law, identifying the Dirichlet sum over $\mathbb{N}$ with the Euler product over primes.

To state these theorems with complete formal precision in Lean 4, we first record the conventions of module `D5/S3/Weil/Convention`.

::: {.definition #def-classical-zeta title="Formal Convention for the Riemann Zeta Function and Simple-Pole Predicate" lean="D5/S3/Weil/Convention.classicalZeta D5/S3/Zeros/ZetaUpgrade.HasUniqueSimplePoleWithResidue"}
On the complex plane $\mathbb{C}$, let [`classicalZeta`](lean:D5/S3/Weil/Convention.classicalZeta) $: \mathbb{C} \to \mathbb{C}$ denote Mathlib's totalized Riemann zeta function `riemannZeta`. For any complex function $f : \mathbb{C} \to \mathbb{C}$, pole location $z \in \mathbb{C}$, and residue $\mathrm{residue} \in \mathbb{C}$, the predicate [`HasUniqueSimplePoleWithResidue`](lean:D5/S3/Zeros/ZetaUpgrade.HasUniqueSimplePoleWithResidue) $f\ z\ \mathrm{residue}$ is the conjunction of three conditions:

1. **Analyticity away from $z$**: $f$ is complex analytic on a neighborhood of the complement $\{z\}^c = \mathbb{C} \setminus \{z\}$ (`AnalyticOnNhd ℂ f ({z}ᶜ)`);
2. **First Laurent residue limit**: $(s - z)f(s) \to \mathrm{residue}$ along the punctured neighborhood filter $\mathcal{N}_{\neq}(z)$;
3. **Nonzero residue**: $\mathrm{residue} \neq 0$.
:::

## 22.2 Formal Identities for the Residue, Dirichlet Series, and Euler Product {#sec-ch22-2}

Before entering the half-plane $\operatorname{Re}(s) > 1$, we anchor the most prominent landmark of $\zeta(s)$ in the complex plane: its **unique simple pole at $s = 1$**, where the harmonic series diverges with unit residue.

Geometrically, as $s \to 1^+$, the divergence of $\sum_{n=1}^\infty n^{-s}$ reflects the unbounded accumulation of prime amplification factors $(1 - p^{-1})^{-1} = \frac{p}{p-1}$ across infinitely many orthogonal prime axes, scaled by $(s - 1)^{-1}$ with residue exactly $1$.

::: {.lemma #lem-riemann-zeta-residue-one title="Unit Residue of the Riemann Zeta Function at s = 1" lean="D5/S3/Zeros/ZetaIdentities.riemann_zeta_residue_one"}
For the Riemann zeta function $\operatorname{classicalZeta} : \mathbb{C} \to \mathbb{C}$ of [@def-classical-zeta], as $s \in \mathbb{C}$ approaches $1$ along the punctured neighborhood filter $\mathcal{N}_{\neq}(1)$,

$$
\lim_{\substack{s \to 1 \\ s \neq 1}} (s - 1)\,\operatorname{classicalZeta}(s) = 1.
$$
:::

::: proof
Unfolding [`classicalZeta`](lean:D5/S3/Weil/Convention.classicalZeta) in `ZetaIdentities` reduces the claim directly to Mathlib's theorem `riemannZeta_residue_one` (which in `ZetaUpgrade` is combined with analyticity on $\{1\}^c$ to form [`classical_zeta_unique_simple_pole_residue_one`](lean:D5/S3/Zeros/ZetaUpgrade.classical_zeta_unique_simple_pole_residue_one)). The full proof is checked by the Lean kernel.
:::

Now we enter the half-plane of absolute convergence $\operatorname{Re}(s) > 1$ (written explicitly as the hypothesis `hs : 1 < s.re` in Lean). In strict adherence to our formal verification contract, **every series and product theorem below retains the explicit half-plane hypothesis $\operatorname{Re}(s) > 1$**, where absolute convergence makes unconditional summation (`tsum`) and infinite multiplication (`tprod`) completely rigorous and order-independent.

::: {.proposition #prop-riemann-zeta-dirichlet-sum title="Dirichlet Series Representation of the Riemann Zeta Function for Re(s) > 1" lean="D5/S3/Zeros/ZetaIdentities.riemann_zeta_dirichlet_sum"}
Let $s \in \mathbb{C}$ satisfy $\operatorname{Re}(s) > 1$ (`1 < s.re`). Then the unconditionally summable series (`tsum`) over all natural numbers equals $\operatorname{classicalZeta}(s)$:

$$
\sum_{n : \mathbb{N}} (n : \mathbb{C})^{-s} = \operatorname{classicalZeta}(s).
$$
:::

::: proof
When $\operatorname{Re}(s) > 1$, we have $-s \neq 0$, so the $n = 0$ term evaluates to $(0 : \mathbb{C})^{-s} = 0$ in Mathlib's complex power convention; the `ℕ`-indexed `tsum` therefore coincides with the classical Dirichlet series over $n \ge 1$. Unfolding [`classicalZeta`](lean:D5/S3/Weil/Convention.classicalZeta) and applying Mathlib's `tsum_riemannZetaSummand` under `hs : 1 < s.re` yields the identity. The full proof is checked by the Lean kernel.
:::

On the exact same half-plane $\operatorname{Re}(s) > 1$, we now pass from additive summation over $\mathbb{N}$ to multiplicative factorization across `Nat.Primes`.

::: {.theorem #thm-riemann-zeta-euler-product title="Euler Prime Product Representation of the Riemann Zeta Function for Re(s) > 1" lean="D5/S3/Zeros/ZetaIdentities.riemann_zeta_euler_product"}
Let $s \in \mathbb{C}$ satisfy $\operatorname{Re}(s) > 1$ (`1 < s.re`). Then the infinite product (`tprod`) over the type of prime numbers `Nat.Primes` equals $\operatorname{classicalZeta}(s)$:

$$
\prod_{p : \mathrm{Nat.Primes}} \bigl(1 - (p : \mathbb{C})^{-s}\bigr)^{-1} = \operatorname{classicalZeta}(s).
$$
:::

::: proof
Under the half-plane hypothesis `hs : 1 < s.re`, $n \mapsto (n : \mathbb{C})^{-s}$ is a completely multiplicative, absolutely summable arithmetic function. By unique prime factorization and Mathlib's Euler product theorem `riemannZeta_eulerProduct_tprod`, the infinite product of local geometric-series factors $(1 - p^{-s})^{-1} = \sum_{k=0}^\infty p^{-ks}$ over $p : \mathrm{Nat.Primes}$ converges to `riemannZeta s = classicalZeta s`. The full proof is checked by the Lean kernel.
:::

Eliminating the intermediate symbol $\operatorname{classicalZeta}(s)$ joins [@prop-riemann-zeta-dirichlet-sum] and [@thm-riemann-zeta-euler-product] directly on $\operatorname{Re}(s) > 1$: the sum over all natural numbers equals the product over the prime orthogonal basis alone!

::: {.corollary #cor-dirichlet-sum-eq-euler-product title="Equality of the Natural-Number Dirichlet Series and Prime Euler Product for Re(s) > 1" lean="D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product"}
Let $s \in \mathbb{C}$ satisfy $\operatorname{Re}(s) > 1$ (`1 < s.re`). Then the natural-number Dirichlet series equals the prime-indexed Euler product:

$$
\sum_{n : \mathbb{N}} (n : \mathbb{C})^{-s}
\;=\;
\prod_{p : \mathrm{Nat.Primes}} \bigl(1 - (p : \mathbb{C})^{-s}\bigr)^{-1}.
$$
:::

::: proof
Under `hs : 1 < s.re`, transitivity of equality combines [@prop-riemann-zeta-dirichlet-sum] ($\sum'_{n : \mathbb{N}} n^{-s} = \operatorname{classicalZeta}(s)$) with the symmetry of [@thm-riemann-zeta-euler-product] ($\operatorname{classicalZeta}(s) = \prod'_{p : \mathrm{Nat.Primes}} (1 - p^{-s})^{-1}$). The full proof is checked by the Lean kernel.
:::

::: {.viz src="sphere-escape" preset="euclid" height="500"}
**Multiply, add one.** Each time the list gains a prime, multiply them all and add one to get $Q$. Every dial has $p$ ticks and its hand points at the remainder of $Q$ divided by $p$: all of them point at $1$ and none at the red $0$, so any prime dividing $Q$ is not on the list (Euclid's argument, a literature result). Opened full screen, the plot below shows how far the Euler product over finitely many primes still is from $\zeta(2)$ ([@thm-riemann-zeta-euler-product] with $s = 2$).
:::

## 22.3 The Polyhedral Prime Sieve Remainder and Phase-Oscillator Hand Calculation {#sec-ch22-3}

Write the complex exponent as $s = \sigma + it$, where the real part $\sigma = \operatorname{Re}(s)$ governs radial damping and the imaginary part $t = \operatorname{Im}(s)$ governs rotational frequency. Each prime mode in [@cor-dirichlet-sum-eq-euler-product] acts as an independent complex rotor:

$$
p^{-s} = p^{-\sigma - it} = p^{-\sigma} e^{-i t \ln p} = p^{-\sigma}\bigl(\cos(t\ln p) - i\sin(t\ln p)\bigr).
$$

In the complex plane, each prime $p$ acts as a **phase pointer (prime clock)** rotating uniformly at its intrinsic logarithmic angular frequency $\omega_p = \ln p$! Set every clock to twelve o'clock (reading $1$) at $t = 0$ and let go. Clock $2$ comes back to twelve every $2\pi/\ln 2 \approx 9.0647$ time units, clock $3$ every $2\pi/\ln 3 \approx 5.7192$. When clock $2$ completes its $12$th turn, clock $3$ has made $12\ln 3/\ln 2 \approx 19.01955$ turns and stands only $7.04^\circ$ past twelve: a near miss. Will the two ever be back at twelve together at some time $t \neq 0$?

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

Notice the exact structural parallel between [@ex-prime-log-orthogonality-and-sieve] and the Euclidean–Gödelian escape of [Chapter 21](ch21-diagonalization-and-escape.md): any finite prime sieve spanned by $K$ prime axes $\{p_1, \dots, p_K\}$ is an arithmetic polytope whose remainder series $R_{> p_K}(s)$ leaks immediately at $n = p_{K+1}$ (and is strictly positive, $R_{> p_K}(s) > p_{K+1}^{-s} > 0$, for every real $s > 1$). Eliminating that leading term requires adjoining $p_{K+1}$ as a new orthogonal axis — and because the primes are inexhaustible, no finite truncation ever seals the arithmetic sphere.

::: {.viz src="sphere-escape" preset="thirteen" height="500"}
**The sum need not be prime itself.** The list is $2, 3, 5, 7, 11, 13$ and $Q = 30031$: every clock hand points at $1$, none at $0$. Yet $Q = 59 \times 509$ is not prime. Euclid's argument (a literature result) says only that the prime factors of $Q$ are off the list, and the new prime it finds, $59$, is not the next one, $17$.
:::

> Composite numbers are the diagonal lattice points of the prime basis; Euler's product simply projects an entangled sum along the natural-number line onto its mutually orthogonal prime axes.

## 22.4 The Critical Symmetry Line $\sigma = 1/2$ and the Epistemic Boundary of the Riemann Hypothesis {#sec-ch22-4}

As shown below ([@prop-xi-zeros-strip-zeros] and the one-line manual derivation after it), $\zeta(s)$ has no zeros inside the half-plane $\operatorname{Re}(s) > 1$ of absolute Euler-product convergence (nor on the line $\operatorname{Re}(s) = 1$), whereas once $\zeta(s)$ is analytically continued leftward across the simple pole at $s = 1$ (whose residue theorem is frozen in [@lem-riemann-zeta-residue-one] above) into the **critical strip** $0 < \operatorname{Re}(s) < 1$, the Dirichlet series and Euler product no longer converge absolutely and interference among the prime phase pointers $p^{-\sigma} e^{-it\ln p}$ produces nontrivial zeros $\zeta(\rho) = 0$ at specific complex frequencies $\rho = \sigma + it$.

Why does every nontrivial zero ever computed lie on the vertical **critical line** $\operatorname{Re}(s) = \frac{1}{2}$ (recorded in `D5/S3/Weil/Convention` as the self-dual abscissa [`criticalAbscissa`](lean:D5/S3/Weil/Convention.criticalAbscissa) $= 1/2$)?

Geometrically, Riemann's completed zeta function $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)$ obeys the reflection symmetry $\xi(s) = \xi(1 - s)$, whose fixed locus under $s \leftrightarrow 1 - \bar{s}$ is precisely the vertical axis $\operatorname{Re}(s) = \frac{1}{2}$ — the Fourier-dual balance line between primal scale and spectral frequency.

The previous paragraph cited the reflection symmetry $\xi(s) = \xi(1 - s)$ as an intuitive picture. The symmetry itself is not a conjecture, and it need not stay at the level of the literature: the module `D5/S3/Zeros/CompletedZeta` of the pinned repository freezes it together with the fact that $\xi$ is entire.

::: {.definition #def-xi-reading title="The Completed Zeta Reading and the Pole-Removed Xi Reading" lean="D5/S3/Zeros/CompletedZeta.completedZetaReading D5/S3/Zeros/CompletedZeta.xiReading"}
In the module `CompletedZeta`:

1. The **completed zeta reading** [`completedZetaReading`](lean:D5/S3/Zeros/CompletedZeta.completedZetaReading) $s$ is defined as Mathlib's `completedRiemannZeta s`, the holomorphic continuation of $\Lambda(s) = \pi^{-s/2}\,\Gamma(s/2)\,\zeta(s)$ (with Mathlib's conventional values at $s = 0$ and $s = 1$);
2. The **xi reading** [`xiReading`](lean:D5/S3/Zeros/CompletedZeta.xiReading) is defined as

   $$
   \operatorname{xiReading}\ s \;=\; \frac{1}{2}\Bigl(s\,(s - 1)\,\Lambda_0(s) + 1\Bigr),
   $$

   where $\Lambda_0$ is Mathlib's `completedRiemannZeta₀`: the entire function obtained from $\Lambda$ by subtracting its two simple poles at $s = 0$ and $s = 1$, so that $\Lambda(s) = \Lambda_0(s) - \frac{1}{s} - \frac{1}{1 - s}$.
:::

::: {.theorem #thm-xi-reading-entire-reflection title="Four Properties of the Xi Reading: Relation to the Completed Zeta, Entirety, Reflection Symmetry, and Endpoint Values" lean="D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta D5/S3/Zeros/CompletedZeta.xi_reading_differentiable D5/S3/Zeros/CompletedZeta.xi_reading_reflection D5/S3/Zeros/Endpoints/XiEndpointValues.xi_reading_endpoint_values"}
For $\operatorname{xiReading}$ of [@def-xi-reading], the following four statements hold:

1. **Relation to the completed zeta**: for every $s \in \mathbb{C}$ with $s \neq 0$ and $s \neq 1$,

   $$
   \operatorname{xiReading}\ s \;=\; \frac{1}{2}\,s\,(s - 1)\,\operatorname{completedZetaReading}\ s ;
   $$

2. **Entirety**: $\operatorname{xiReading}$ is complex differentiable on all of $\mathbb{C}$ (`Differentiable ℂ xiReading`);
3. **Reflection symmetry**: for every $s \in \mathbb{C}$,

   $$
   \operatorname{xiReading}\ (1 - s) \;=\; \operatorname{xiReading}\ s ;
   $$

4. **Endpoint values**: $\operatorname{xiReading}\ 0 = \frac{1}{2}$ and $\operatorname{xiReading}\ 1 = \frac{1}{2}$.
:::

::: proof
Claim 1 substitutes Mathlib's identity `completedRiemannZeta_eq` ($\Lambda(s) = \Lambda_0(s) - \frac{1}{s} - \frac{1}{1-s}$) into the definition and clears denominators under the hypotheses $s \neq 0$ and $1 - s \neq 0$. Claim 2 follows from the entirety of $\Lambda_0$ (`differentiable_completedZeta₀`) and the differentiability of the polynomial factor. Claim 3 follows from the reflection symmetry `completedRiemannZeta₀_one_sub` ($\Lambda_0(1 - s) = \Lambda_0(s)$), because the factor $s\,(s - 1)$ is invariant under $s \mapsto 1 - s$. For claim 4 the factor $s\,(s - 1)$ vanishes at $s = 0$ and at $s = 1$, and the definition gives $\frac{1}{2}$ directly. The full proof is checked by the Lean kernel.
:::

Claim 3 of [@thm-xi-reading-entire-reflection] has an immediate consequence (a one-line manual derivation): if $\operatorname{xiReading}\ \rho = 0$ then $\operatorname{xiReading}\ (1 - \rho) = 0$. The map $s \mapsto 1 - s$ is the half-turn of the complex plane about the point $s = \frac{1}{2}$, so zeros come in pairs with respect to that point. Adding the conjugation symmetry $\xi(\overline{s}) = \overline{\xi(s)}$ (see [@prop-zeta-conjugation-covariance] below), zeros come in groups of four, $\rho,\ \overline{\rho},\ 1 - \rho,\ 1 - \overline{\rho}$; for non-real $\rho$ the four points coincide in pairs and shrink to a single pair exactly when $\operatorname{Re}(\rho) = \frac{1}{2}$ (the zeros of $\xi$ are exactly the zeros of $\zeta$ in the critical strip, see [@prop-xi-zeros-strip-zeros], and none of them is real, see [@prop-zeta-real-axis-sign]). The Riemann hypothesis says precisely that every group has shrunk to a pair.

The reflection symmetry pairs up values that look entirely unrelated.

::: {.example #ex-xi-mirror-values title="One Number on Both Sides of the Mirror: ζ(2) and ζ(−1), ζ(4) and ζ(−3)"}
Each of the special values used here — $\zeta(2) = \frac{\pi^2}{6}$, $\zeta(4) = \frac{\pi^4}{90}$, $\zeta(6) = \frac{\pi^6}{945}$, $\zeta(-1) = -\frac{1}{12}$, $\zeta(-3) = \frac{1}{120}$, $\zeta(-5) = -\frac{1}{252}$, and the values of the $\Gamma$ function at half-integers — is a **literature result, not formalized in this book**; each row is obtained by direct substitution into $\xi(s) = \frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)\zeta(s)$ and was checked numerically at 30 digits.

**Hand computation at $s = 2$ and $s = -1$.** With $\Gamma(1) = 1$:

$$
\xi(2) \;=\; \frac{1}{2}\cdot 2\cdot 1\cdot \pi^{-1}\cdot\Gamma(1)\cdot\frac{\pi^2}{6} \;=\; \frac{\pi}{6} .
$$

With $\Gamma\bigl(-\tfrac{1}{2}\bigr) = -2\sqrt{\pi}$:

$$
\xi(-1) \;=\; \frac{1}{2}\cdot(-1)\cdot(-2)\cdot\pi^{1/2}\cdot\bigl(-2\sqrt{\pi}\bigr)\cdot\Bigl(-\frac{1}{12}\Bigr) \;=\; \frac{\pi}{6} .
$$

The two agree, exactly as claim 3 of [@thm-xi-reading-entire-reflection] asserts at $s = 2$: $\xi(-1) = \xi(2)$.

| mirror pair $(s,\ 1 - s)$ | value used on the right | values used on the left | common value of $\xi$ | numerically |
| :---: | :---: | :---: | :---: | :---: |
| $(2,\ -1)$ | $\zeta(2) = \frac{\pi^2}{6}$ | $\zeta(-1) = -\frac{1}{12}$, $\Gamma(-\frac{1}{2}) = -2\sqrt{\pi}$ | $\frac{\pi}{6}$ | $0.5235988$ |
| $(4,\ -3)$ | $\zeta(4) = \frac{\pi^4}{90}$ | $\zeta(-3) = \frac{1}{120}$, $\Gamma(-\frac{3}{2}) = \frac{4\sqrt{\pi}}{3}$ | $\frac{\pi^2}{15}$ | $0.6579736$ |
| $(6,\ -5)$ | $\zeta(6) = \frac{\pi^6}{945}$ | $\zeta(-5) = -\frac{1}{252}$, $\Gamma(-\frac{5}{2}) = -\frac{8\sqrt{\pi}}{15}$ | $\frac{2\pi^3}{63}$ | $0.9843262$ |
| $(1,\ 0)$ | — | — | $\frac{1}{2}$ | $0.5000000$ |
| $(\frac{1}{2},\ \frac{1}{2})$ | — | — | — | $0.4971208$ |

The fourth row is claim 4 of [@thm-xi-reading-entire-reflection]; the fifth row is the value at the fixed point $s = \frac{1}{2}$ of the mirror.

**Along the critical line.** On $s = \frac{1}{2} + it$ with real $t$, $\xi$ takes real values. Numerical evaluation gives $\xi\bigl(\tfrac{1}{2} + 14i\bigr) \approx +2.01\times10^{-4}$ and $\xi\bigl(\tfrac{1}{2} + 15i\bigr) \approx -7.06\times10^{-4}$: the sign changes between the two, in agreement with the first nontrivial zero $\rho_1 \approx \frac{1}{2} + 14.134725\,i$ recorded in the literature. Thus $\zeta(-1) = -\frac{1}{12}$, so often singled out for dramatic effect, and the Basel value $\zeta(2) = \frac{\pi^2}{6}$ are two readings of one and the same number $\frac{\pi}{6}$ on opposite sides of the mirror.
:::

The position of the mirror, $\operatorname{Re}(s) = \frac{1}{2}$, is kernel-checked by [@thm-xi-reading-entire-reflection]; whether every nontrivial zero stands on the mirror remains the open conjecture stated at the end of this section.

The mirror has been located, but the reflection $s \mapsto 1 - s$ of [@thm-xi-reading-entire-reflection] is only a half-turn about the point $s = \frac{1}{2}$, and a half-turn fixes a single point. To fix the whole line $\operatorname{Re}(s) = \frac{1}{2}$ one must compose it with complex conjugation. This second half is also frozen at the pinned commit, in the module `D5/S3/Zeros/Symmetry/ZetaConjugationCovariance`.

::: {.proposition #prop-zeta-conjugation-covariance title="Conjugation Covariance of ζ and of the ξ Reading" lean="D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.riemann_zeta_conj D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_conj D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj"}
For every $s \in \mathbb{C}$, with $\overline{s}$ the complex conjugate of $s$:

1. $\operatorname{riemannZeta}\ \overline{s} = \overline{\operatorname{riemannZeta}\ s}$, where `riemannZeta` is Mathlib's Riemann zeta function (the function to which `classicalZeta` of [@def-classical-zeta] unfolds);
2. $\operatorname{xiReading}\ \overline{s} = \overline{\operatorname{xiReading}\ s}$;
3. $\operatorname{xiReading}\ (1 - \overline{s}) = \overline{\operatorname{xiReading}\ s}$.
:::

::: proof
Claim 2: the function $\Lambda_0$ of [@def-xi-reading] is the Mellin transform of a real-valued function, and the Mellin transform of a real-valued function commutes with complex conjugation; the factor $s\,(s - 1)$ and the constants $\frac{1}{2}$ and $1$ have real coefficients. Claim 1: at $s = 0$ both sides equal $-\frac{1}{2}$; for $s \neq 0$, Mathlib's `riemannZeta_def_of_ne_zero` writes $\zeta(s)$ as the completed zeta divided by $\Gamma_{\mathbb{R}}(s) = \pi^{-s/2}\Gamma(s/2)$, and each of the two commutes with conjugation (the latter by `Complex.Gamma_conj`). Claim 3 composes Claim 2 with the reflection symmetry of [@thm-xi-reading-entire-reflection]. The full proof is checked by the Lean kernel.
:::

Take $s = \frac{1}{2} + it$ with real $t$ in Claim 3. Then $1 - \overline{s} = s$, so $\operatorname{xiReading}\ s = \overline{\operatorname{xiReading}\ s}$: the function $\xi$ is real on the critical line (a one-line manual derivation). The statement "real along the critical line" at the end of [@ex-xi-mirror-values] is thereby kernel-backed. The two values $\xi\bigl(\tfrac{1}{2} + 14i\bigr) > 0$ and $\xi\bigl(\tfrac{1}{2} + 15i\bigr) < 0$ quoted there remain numerical computations; granting them, the real continuous function $t \mapsto \xi\bigl(\tfrac{1}{2} + it\bigr)$ must vanish somewhere between $14$ and $15$ (intermediate value theorem), and that zero lies exactly on the critical line.

**Rolling the critical line into the unit circle.** Since Chapter 1 this book has done its geometry on unit circles and unit spheres. The critical line is a straight line, but in a different coordinate it is a circle.

::: {.definition #def-cayley-ratio title="The Cayley Ratio and the Logarithmic Radial Defect" lean="D5/S3/Midline/CayleyCriticalLine.cayleyRatio D5/S3/Midline/Cayley/CayleyUnitarityDefect.cayleyCoefficient D5/S3/Midline/Cayley/LogarithmicRadialDefect.logarithmicRadialDefect"}
For $s \in \mathbb{C}$:

1. The **Cayley ratio** [`cayleyRatio`](lean:D5/S3/Midline/CayleyCriticalLine.cayleyRatio) $s$ is defined as $\dfrac{s - 1}{s}$. The [`cayleyCoefficient`](lean:D5/S3/Midline/Cayley/CayleyUnitarityDefect.cayleyCoefficient) $s$ of the module `CayleyUnitarityDefect` is the same expression $\dfrac{s - 1}{s}$. Under Lean's total division, both take the value $0$ at $s = 0$.
2. The **logarithmic radial defect** [`logarithmicRadialDefect`](lean:D5/S3/Midline/Cayley/LogarithmicRadialDefect.logarithmicRadialDefect) $s$ is defined as $\operatorname{Real.log}\,\norm{\operatorname{cayleyCoefficient}\ s}$, where `Real.log` is Mathlib's real logarithm (with the convention $\operatorname{Real.log}\ 0 = 0$).
:::

::: {.theorem #thm-cayley-critical-line-criterion title="The Cayley Ratio Lies on the Unit Circle Exactly on the Critical Line; a Radial Equivalent of the Riemann Hypothesis" lean="D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion"}
In the notation of [@def-cayley-ratio]:

1. **Unit-circle criterion.** For every $s \in \mathbb{C}$,

   $$
   \norm{\operatorname{cayleyRatio}\ s} = 1 \;\Longleftrightarrow\; \operatorname{Re}(s) = \frac{1}{2},
   $$

   and the same holds for $\operatorname{cayleyCoefficient}$.
2. **Radial equivalent.** Mathlib's proposition `RiemannHypothesis` — for every $s \in \mathbb{C}$, if $\operatorname{riemannZeta}\ s = 0$, and there is no natural number $n$ with $s = -2(n + 1)$, and $s \neq 1$, then $\operatorname{Re}(s) = \frac{1}{2}$ — holds if and only if: for every $\rho \in \mathbb{C}$, if $\operatorname{riemannZeta}\ \rho = 0$, and there is no natural number $n$ with $\rho = -2(n + 1)$, and $\rho \neq 1$, then

   $$
   \operatorname{logarithmicRadialDefect}\ \rho = 0 .
   $$
:::

::: proof
Claim 1: at $s = 0$ the Cayley ratio is $0$, so its norm is not $1$, and the real part is not $\frac{1}{2}$ either; both sides are false. For $s \neq 0$, $\norm{(s - 1)/s} = 1$ is equivalent to $|s - 1| = |s|$, that is, $s$ is equidistant from the points $1$ and $0$, which describes the perpendicular bisector $\operatorname{Re}(s) = \frac{1}{2}$ of the segment $[0, 1]$; algebraically, $|s - 1|^2 - |s|^2 = 1 - 2\operatorname{Re}(s)$. Claim 2, forward direction: a zero on the critical line has a Cayley ratio of norm $1$, whose logarithm is $0$. Backward direction: $\zeta(0) = -\frac{1}{2} \neq 0$, so a zero $\rho$ is nonzero; also $\rho \neq 1$, so the Cayley ratio is nonzero and its norm is positive; a positive number with logarithm $0$ equals $1$, and Claim 1 applies. The full proof is checked by the Lean kernel.
:::

Claim 2 of [@thm-cayley-critical-line-criterion] is an **equivalent restatement of the Riemann Hypothesis, not a proof of it**: it trades "the zeros lie on a line" for "the zeros lie on a circle", and the conjecture stays open. One piece of wording still has to be matched. Claim 2 uses Mathlib's notion of a "nontrivial zero": a zero that is neither of the form $-2(n+1)$ nor equal to $1$. [@conj-riemann-hypothesis], on the other hand, speaks of the zeros in the critical strip $0 < \operatorname{Re}(s) < 1$. Whether the two phrasings give the same conjecture depends on where $\zeta$ can vanish outside the strip. Start with the one line that can be worked by hand: the real axis.

**Subtract the even terms twice.** On $\operatorname{Re}(s) > 1$, removing the even terms of $\zeta(s)$ twice makes the signs alternate (a manual derivation, using $2\,(2m)^{-s} = 2^{1-s}\,m^{-s}$):

$$
\begin{aligned}
\bigl(1 - 2^{1-s}\bigr)\,\zeta(s)
&= \sum_{n \ge 1} n^{-s} \;-\; 2\sum_{m \ge 1} (2m)^{-s} \\
&= 1 - 2^{-s} + 3^{-s} - 4^{-s} + \cdots .
\end{aligned}
$$

The right-hand side still converges for $\operatorname{Re}(s) > 0$: grouping neighboring terms into pairs $(2n+1)^{-s} - (2n+2)^{-s}$, each pair has modulus at most $\lvert s\rvert\,(2n+1)^{-\operatorname{Re}(s)-1}$, which is summable. At a real point $s = x > 0$, every pair is a positive number. This is the same mechanism that made the remainder $R_{>p_K}(s)$ of [@ex-prime-log-orthogonality-and-sieve] positive term by term on the real half-line, with "term" replaced by "pair": positive plus positive leaves nothing to cancel.

::: {.lemma #lem-alternating-zeta-partial-sums title="The Alternating Partial Sums Converge to $(1 - 2^{1-s})\,\zeta(s)$ for $\operatorname{Re}(s) > 0$, $s \neq 1$" lean="D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.tendsto_alternating_partialSums_eta_of_ne_one D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.alternating_partialSums_eta_atom_fails_at_one"}
For $s \in \mathbb{C}$ and a natural number $N$, let $S_N(s) = \sum_{n=0}^{N-1} (-1)^n\,(n+1)^{-s}$, where $(n+1)^{-s} = e^{-s\ln(n+1)}$; $\zeta$ is Mathlib's `riemannZeta` ([@def-classical-zeta]).

1. If $\operatorname{Re}(s) > 0$ and $s \neq 1$, then $S_N(s) \to \bigl(1 - 2^{1-s}\bigr)\,\zeta(s)$ as $N \to \infty$.
2. At $s = 1$ the same formula fails: $S_N(1)$ does not converge to $\bigl(1 - 2^{1-1}\bigr)\,\zeta(1)$. Here $\zeta(1)$ is the value Mathlib assigns at the pole; since $1 - 2^{0} = 0$, this right-hand side equals $0$.
:::

::: proof
Claim 1: the partial sums with an even number of terms are paired sums, $S_{2N}(s) = \sum_{n<N}\bigl[(2n+1)^{-s} - (2n+2)^{-s}\bigr]$. By the mean value theorem each pair has modulus at most $\lvert s\rvert\,(2n+1)^{-\operatorname{Re}(s)-1}$; this majorant is uniformly summable on a small neighborhood of $s$, so the paired series converges and is holomorphic on $\operatorname{Re}(s) > 0$. A partial sum with an odd number of terms has one extra term, whose modulus $(2N+1)^{-\operatorname{Re}(s)}$ tends to $0$. On $\operatorname{Re}(s) > 1$, splitting the Dirichlet series into odd and even terms shows that the paired series equals $(1 - 2\cdot 2^{-s})\,\zeta(s)$. Both sides are holomorphic on the two convex sets $\{\operatorname{Re}(s) > 0,\ \operatorname{Im}(s) > 0\}$ and $\{\operatorname{Re}(s) > 0,\ \operatorname{Im}(s) < 0\}$ (neither contains the pole $s = 1$) and agree near $2 \pm i$, so by the identity theorem they agree on both regions; a point $x \neq 1$ of the positive real axis is reached as the limit of $x + \frac{i}{n+1}$. Finally $2\cdot 2^{-s} = 2^{1-s}$. Claim 2: the right-hand side is $0$; the real parts of $S_N(1)$ are the partial sums of the alternating harmonic series, whose terms $\frac{1}{n+1}$ decrease in absolute value, so any limit is at least $S_2(1) = 1 - \frac{1}{2} = \frac{1}{2}$ and cannot be $0$. The full proof is checked by the Lean kernel.
:::

On the real axis the left-hand side of [@lem-alternating-zeta-partial-sums] is positive pair by pair, while the factor $1 - 2^{1-x}$ on the right is negative for $0 < x < 1$. So $\zeta(x)$ has no choice but to be negative.

::: {.proposition #prop-zeta-real-axis-sign title="The Sign of ζ on the Real Axis and Its Real Zeros" lean="D5/S3/Analytic/Isolation/RiemannZetaPositiveRealSign.riemannZeta_ofReal_sign D5/S3/Weil/ZetaBridge/AlternatingZetaContinuation.riemannZeta_ne_zero_of_real_mem_Ioo D5/S3/Weil/ZetaBridge/RealAxisNonvanishing.riemannZeta_real_zero_outside_Ioo"}
Let $x$ be a real number, and let $\zeta(x)$ denote the value of Mathlib's `riemannZeta` at the complex number $x + 0i$.

1. If $x > 0$ and $x \neq 1$, then $\operatorname{Im}\zeta(x) = 0$, and either $x < 1$ and $\operatorname{Re}\zeta(x) < 0$, or $x > 1$ and $\operatorname{Re}\zeta(x) > 0$.
2. If $0 < x < 1$, then $\zeta(x) \neq 0$.
3. If "$0 < x < 1$" fails and $\zeta(x) = 0$, then there is a natural number $n$ with $x = -2(n + 1)$.
:::

::: proof
Claim 1: the module `RiemannZetaPositiveRealSign` rebuilds, independently, the paired series $P(s) = \sum_n \bigl[(2n+1)^{-s} - (2n+2)^{-s}\bigr]$ of the proof of [@lem-alternating-zeta-partial-sums] and, again by the identity theorem (on the upper region only) and a limit, obtains $P(x) = (1 - 2\cdot 2^{-x})\,\zeta(x)$ for $x > 0$, $x \neq 1$. Since $t \mapsto t^{-x}$ is strictly decreasing, every pair is a positive real number, and so is $P(x)$. For $0 < x < 1$ one has $2^{-x} > \frac{1}{2}$, so the real factor $1 - 2\cdot 2^{-x}$ is negative; comparing imaginary parts gives $\operatorname{Im}\zeta(x) = 0$, comparing real parts gives $\operatorname{Re}\zeta(x) < 0$. For $x > 1$ two Mathlib theorems apply directly: $\zeta(x)$ is real with positive real part. Claim 2 follows from Claim 1: zero has real part $0$, which is not negative. Claim 3: if $x > 0$, then $x \ge 1$, contradicting Mathlib's theorem that $\zeta$ has no zero on $\operatorname{Re}(s) \ge 1$. If $x \le 0$: $\zeta(0) = -\frac{1}{2}$, so $x \neq 0$, and therefore $\zeta(x) = \Lambda(x)/\Gamma_{\mathbb{R}}(x)$, where $\Lambda$ is the completed zeta and $\Gamma_{\mathbb{R}}(s) = \pi^{-s/2}\,\Gamma(s/2)$. The frozen theorem [`completedRiemannZeta_ne_zero_of_re_nonpos`](lean:D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_ne_zero_of_re_nonpos) says that $\Lambda$ does not vanish on $\operatorname{Re}(s) \le 0$, so the quotient can only vanish because its denominator does: Mathlib's $\Gamma$ takes the conventional value $0$ at its poles (the non-positive integers), and under Lean's total division the quotient is then $0$. Now $\Gamma_{\mathbb{R}}(x) = 0$ exactly when $x = -2n$ ($n \in \mathbb{N}$), and $x \neq 0$ forces $n \ge 1$. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-alternating-eta-real-axis title="Adding Up the Alternating Series at s = 1/2: Positive Pairs, a Negative Factor"}
The numbers in this example come from a high-precision numerical computation (40 significant digits), rounded to the digits shown; the sum $\ln 2$ of the alternating harmonic series, used in the last paragraph, is a literature result, not formalized in this book.

**The partial sums are squeezed from both sides.** Take $s = \frac{1}{2}$ and write $S_N = S_N(\tfrac{1}{2})$. The first four partial sums are $S_1 = 1$, $S_2 = 1 - \tfrac{1}{\sqrt{2}} = 0.292893$, $S_3 = 0.870243$, $S_4 = 0.370243$. A partial sum with an even number of terms gains a positive pair at each step and increases; a partial sum with an odd number of terms gains $-(2k)^{-1/2} + (2k+1)^{-1/2} < 0$ at each step and decreases. The limit $L = (1 - \sqrt{2})\,\zeta(\tfrac{1}{2}) = 0.604899$ of [@lem-alternating-zeta-partial-sums] is caught in between:

| $N$ | $S_N$ | $S_N - L$ |
| :---: | :---: | :---: |
| $1$ | $1.000000$ | $+0.395101$ |
| $2$ | $0.292893$ | $-0.312005$ |
| $3$ | $0.870243$ | $+0.265345$ |
| $4$ | $0.370243$ | $-0.234655$ |
| $100$ | $0.555024$ | $-0.049875$ |
| $101$ | $0.654527$ | $+0.049629$ |
| $1000$ | $0.589091$ | $-0.015807$ |
| $1001$ | $0.620698$ | $+0.015800$ |

For large $N$ the error is roughly half the next term $(N+1)^{-1/2}$, so convergence is slow; but the sign is settled from the second partial sum on: $L > S_2 = 1 - 2^{-1/2} > 0$.

**Dividing by a negative factor.** The factor $1 - 2^{1 - 1/2} = 1 - \sqrt{2} = -0.414214$ is negative, so $\zeta(\tfrac{1}{2}) = L/(1 - \sqrt{2}) = -1.460355$: a positive number divided by a negative one gives the minus sign asserted in Claim 1 of [@prop-zeta-real-axis-sign].

**A sweep along the real axis.** Write $\eta(x) = (1 - 2^{1-x})\,\zeta(x)$ for the sum of the alternating series:

| $x$ | $1 - 2^{1-x}$ | $\eta(x)$ | $\zeta(x)$ | $(x - 1)\,\zeta(x)$ |
| :---: | :---: | :---: | :---: | :---: |
| $0.1$ | $-0.866066$ | $0.522270$ | $-0.603038$ | $0.542734$ |
| $0.5$ | $-0.414214$ | $0.604899$ | $-1.460355$ | $0.730177$ |
| $0.9$ | $-0.071773$ | $0.676832$ | $-9.430114$ | $0.943011$ |
| $1.1$ | $0.066967$ | $0.708809$ | $10.584448$ | $1.058445$ |
| $1.5$ | $0.292893$ | $0.765147$ | $2.612375$ | $1.306188$ |
| $2$ | $0.500000$ | $0.822467$ | $1.644934$ | $1.644934$ |

Along the whole range $\eta$ is a positive, gently varying number; the change of sign of $\zeta$ comes entirely from the factor $1 - 2^{1-x}$, which passes from negative to positive at $x = 1$. Near $x = 1$ the factor is about $(x - 1)\ln 2$ (first-order expansion, a manual derivation) while $\eta$ is close to $\ln 2 = 0.693147$, so $\zeta(x) \approx \frac{1}{x - 1}$: the last column reads $0.943011$ at $x = 0.9$ and $1.058445$ at $x = 1.1$, closing in from both sides on the unit residue of [@lem-riemann-zeta-residue-one]. At $x = 1$ itself the alternating harmonic partial sums $S_{10}(1) = 0.645635$, $S_{100}(1) = 0.688172$, $S_{1000}(1) = 0.692647$ tend to $\ln 2$ (a literature result, not formalized in this book), whereas the right-hand side $(1 - 2^{0})\,\zeta(1)$ of the formula is $0$: exactly the case excluded by Claim 2 of [@lem-alternating-zeta-partial-sums].
:::

**From the real axis to the whole plane.** Off the real axis the pairs become complex numbers and the positivity argument no longer applies. What the pinned repository supplies instead is the location of the zeros of the completed function $\Lambda$ and of the xi reading.

::: {.proposition #prop-xi-zeros-strip-zeros title="The Zeros of the Xi Reading Are Exactly the Zeros of ζ in the Critical Strip; the Completed Zeta Does Not Vanish on Re(s) ≥ 1" lean="D5/S3/Analytic/ShiftedXiPoisson/ShiftedPoissonSemigroup.xiReading_eq_zero_iff_nontrivial D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_eq_zero_iff_of_re_pos D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_ne_zero_of_one_le_re"}
In the notation of [@def-xi-reading], let $\Lambda(s)$ be Mathlib's `completedRiemannZeta s` (that is, $\operatorname{completedZetaReading}\ s$), and let $\zeta$ be `riemannZeta`.

1. For every $s \in \mathbb{C}$: $\operatorname{xiReading}\ s = 0$ if and only if $\zeta(s) = 0$ and $0 < \operatorname{Re}(s) < 1$.
2. For every $s \in \mathbb{C}$ with $\operatorname{Re}(s) > 0$: $\Lambda(s) = 0$ if and only if $\zeta(s) = 0$.
3. For every $s \in \mathbb{C}$ with $\operatorname{Re}(s) \ge 1$: $\Lambda(s) \neq 0$.
:::

::: proof
Claim 2: for $\operatorname{Re}(s) > 0$ one has $s \neq 0$ and $\Gamma_{\mathbb{R}}(s) \neq 0$, so Mathlib's relation $\zeta(s) = \Lambda(s)/\Gamma_{\mathbb{R}}(s)$ can be rewritten as $\Lambda(s) = \Gamma_{\mathbb{R}}(s)\,\zeta(s)$, and the two sides vanish together. Claim 3 follows from Claim 2 and Mathlib's theorem that $\zeta$ has no zero on $\operatorname{Re}(s) \ge 1$. Claim 1: if $\operatorname{xiReading}\ s = 0$, Claim 4 of [@thm-xi-reading-entire-reflection] gives $s \neq 0, 1$, and its Claim 1 gives $\operatorname{xiReading}\ s = \frac{1}{2}\,s\,(s - 1)\,\Lambda(s)$ with a nonzero prefactor, so $\Lambda(s) = 0$. The frozen theorem [`completedRiemannZeta_eq_zero_iff`](lean:D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_eq_zero_iff) says that the zeros of $\Lambda$ are exactly the zeros of $\zeta$ in the critical strip: $\Lambda$ does not vanish on $\operatorname{Re}(s) \ge 1$ (Claim 3), nor, by $\Lambda(1 - s) = \Lambda(s)$, on $\operatorname{Re}(s) \le 0$, and inside the strip Claim 2 applies. The converse runs the same chain backwards. The full proof is checked by the Lean kernel.
:::

Claims 2 and 3 give a one-line manual derivation: if $\operatorname{Re}(s) \ge 1$ and $\zeta(s) = 0$, Claim 2 yields $\Lambda(s) = 0$, contradicting Claim 3. So $\zeta$ has no zero on the closed half-plane $\operatorname{Re}(s) \ge 1$; the part on the line $\operatorname{Re}(s) = 1$ is what Hadamard and de la Vallée Poussin (1896) established on the way to the Prime Number Theorem. In Lean this fact enters the proof of Claim 3 as a Mathlib theorem; the derivation above shows that it can also be read off directly from the frozen statements. Claim 1 says that the four-point symmetry that [@thm-xi-reading-entire-reflection] and [@prop-zeta-conjugation-covariance] give for $\xi$ is the symmetry of the zeros of $\zeta$ in the critical strip; by [@prop-zeta-real-axis-sign], none of those zeros is real.

::: {.theorem #thm-right-half-strip-rh-forms title="The Riemann Hypothesis Reduces to the Right Half-Strip; Mathlib's Nontrivial Zeros Lie in the Critical Strip, and the Two Formulations Agree" lean="D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh D5/S3/Zeros/ActualZeroGeometry.rh_iff_nontrivial_zeros_on_line D5/S3/Weil/Mertens/Cryptids/VonMangoldtCount/Foundation.mem_criticalStrip_of_isNontrivialZetaZero"}
Let `RiemannHypothesis` be Mathlib's proposition (spelled out in Claim 2 of [@thm-cayley-critical-line-criterion]), and let $\zeta$ be `riemannZeta`.

1. **Right half-strip reduction.** If there is no $\rho \in \mathbb{C}$ with both $\zeta(\rho) = 0$ and $\frac{1}{2} < \operatorname{Re}(\rho) < 1$, then `RiemannHypothesis` holds.
2. **The two formulations agree.** `RiemannHypothesis` holds if and only if, for every $\rho \in \mathbb{C}$ with $\zeta(\rho) = 0$ and $0 < \operatorname{Re}(\rho) < 1$, one has $\operatorname{Re}(\rho) = \frac{1}{2}$.
3. **Mathlib's nontrivial zeros lie in the critical strip.** For every $\rho \in \mathbb{C}$, if $\zeta(\rho) = 0$, there is no natural number $n$ with $\rho = -2(n + 1)$, and $\rho \neq 1$, then $0 < \operatorname{Re}(\rho) < 1$.
:::

::: proof
Claim 1: take a nontrivial zero $\rho$ in Mathlib's sense (not of the form $-2(n+1)$ and not equal to $1$), suppose $\operatorname{Re}(\rho) \neq \frac{1}{2}$, and derive a contradiction in each of four cases. $\operatorname{Re}(\rho) \ge 1$: this contradicts Mathlib's theorem that $\zeta$ has no zero there. $\frac{1}{2} < \operatorname{Re}(\rho) < 1$: this contradicts the hypothesis. $0 < \operatorname{Re}(\rho) < \frac{1}{2}$: Mathlib's functional equation $\zeta(1 - \rho) = 2\,(2\pi)^{-\rho}\,\Gamma(\rho)\cos\bigl(\tfrac{\pi\rho}{2}\bigr)\,\zeta(\rho)$ gives $\zeta(1 - \rho) = 0$, and $1 - \rho$ lies in the right half-strip, again contradicting the hypothesis. $\operatorname{Re}(\rho) \le 0$: first, $\zeta(0) = -\frac{1}{2}$ gives $\rho \neq 0$; put $t = 1 - \rho$, so that $\operatorname{Re}(t) \ge 1$, and the functional equation writes $\zeta(\rho) = \zeta(1 - t)$ as $2\,(2\pi)^{-t}\,\Gamma(t)\cos\bigl(\tfrac{\pi t}{2}\bigr)\,\zeta(t)$; since $(2\pi)^{-t}$, $\Gamma(t)$ and $\zeta(t)$ are all nonzero, $\cos\bigl(\tfrac{\pi t}{2}\bigr) = 0$, that is, $t = 2k + 1$ with an integer $k \ge 0$, hence $\rho = -2k$, and $\rho \neq 0$ forces $\rho = -2(n+1)$, contradicting nontriviality (in the module `RightHalfStripRiemannReduction` this step is a private auxiliary lemma). Claim 2, forward: a zero in the critical strip has positive real part, so it is not of the form $-2(n+1)$, and real part below $1$, so it is not $1$; `RiemannHypothesis` applies directly. Backward: a zero in the right half-strip lies in the critical strip, so by hypothesis its real part is $\frac{1}{2}$, contradicting a real part above $\frac{1}{2}$; now apply Claim 1. Claim 3 is proved in a different frozen module, by exactly the arguments of the first and last cases of Claim 1: the real part is below $1$ because Mathlib's $\zeta$ has no zero on $\operatorname{Re}(s) \ge 1$, and it is positive because, if $\operatorname{Re}(\rho) \le 0$, the functional-equation argument above applied to $t = 1 - \rho$ forces $\rho = -2(n+1)$, contrary to the hypothesis. In that module the step is a public frozen theorem. The full proof is checked by the Lean kernel.
:::

Claim 1 is the mirror picture of this section: the functional equation sends a zero $\rho$ in the left half-strip $0 < \operatorname{Re}(s) < \frac{1}{2}$ to the zero $1 - \rho$ in the right half-strip, so it suffices to guard one side of the mirror. In the forged quartet of [@ex-quartic-mock-quartet] below, for instance, $\tfrac{1}{4} + 14i$ in the left half-strip is sent by $s \mapsto 1 - s$ to $\tfrac{3}{4} - 14i$ in the right half-strip. (The Lean proof uses Mathlib's functional equation for $\zeta$ itself rather than the reflection of $\xi$ in [@thm-xi-reading-entire-reflection]; both describe the same symmetry $s \mapsto 1 - s$.) Claim 3 answers the question of wording raised at the start: Mathlib's nontrivial zeros all lie in the critical strip, and conversely a zero in the strip has real part strictly between $0$ and $1$, so it is neither of the form $-2(n+1)$ nor equal to $1$ (a one-line manual derivation). The two phrasings pick out the same zeros. The right-hand side of Claim 2 is the formula of [@conj-riemann-hypothesis], so Mathlib's `RiemannHypothesis`, the radial form of [@thm-cayley-critical-line-criterion] and the conjecture box at the end of this section are three equivalent ways of writing one proposition. All of them are **restatements and reductions, not proofs**: the Riemann Hypothesis remains open.

::: {.remark #rem-zeta-zero-free-region-literature title="The Trivial Zeros of ζ (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The negative even integers $-2, -4, -6, \dots$ are indeed zeros of $\zeta$ (Riemann, 1859). The frozen results above only cover the other direction: Claim 3 of [@prop-zeta-real-axis-sign] says that a real zero outside $(0, 1)$ can only be one of these negative even integers, and Claim 3 of [@thm-right-half-strip-rh-forms] says that a zero outside the critical strip can only be one of them or $s = 1$, which the manual derivation after [@prop-xi-zeros-strip-zeros] rules out. That these negative even integers really are zeros is the Mathlib theorem `riemannZeta_neg_two_mul_nat_add_one`; the pinned repository only uses it inside proofs and does not freeze it as a citable declaration.
:::

We now return to the Cayley coordinate and look at the reflection and the conjugation on the unit circle.

Write $w = \dfrac{s - 1}{s}$. Each of the three symmetries takes a clean form in the coordinate $w$ (one line of manual derivation each):

$$
\begin{aligned}
s \mapsto 1 - s &:\qquad w \mapsto \frac{(1 - s) - 1}{1 - s} = \frac{s}{s - 1} = \frac{1}{w}, \\
s \mapsto \overline{s} &:\qquad w \mapsto \overline{w}, \\
s \mapsto 1 - \overline{s} &:\qquad w \mapsto \frac{1}{\overline{w}} .
\end{aligned}
$$

The third line is **inversion in the unit circle**: it moves a point inside the circle to the point outside on the same ray and leaves the circle itself fixed. "The critical line is a mirror" and "the unit circle is the fixed circle of inversion" are one and the same sentence. The four-point orbit $\rho,\ \overline{\rho},\ 1 - \rho,\ 1 - \overline{\rho}$ of an off-line zero becomes $w,\ \overline{w},\ \frac{1}{w},\ \frac{1}{\overline{w}}$ in the coordinate $w$: two points inside the circle and two outside. The departure from the circle also has a closed form (from $|s - 1|^2 - |s|^2 = 1 - 2\sigma$, with $s = \sigma + it$):

$$
|w|^2 - 1 \;=\; \frac{1 - 2\sigma}{\sigma^2 + t^2} .
$$

::: {.example #ex-cayley-unit-circle-zeros title="Where the First Five Zeros Sit on the Unit Circle, and How Far an Off-Line Point Leaves It"}
**Points on the critical line.** For $s = \frac{1}{2} + it$ one has $s - 1 = -\overline{s}$, hence $w = -\overline{s}/s$ and $|w| = 1$. For $t > 0$, $\arg s = \arctan(2t)$, so

$$
\arg w \;=\; \pi - 2\arctan(2t) \;=\; 2\arctan\frac{1}{2t} .
$$

The point $t = 0$ (that is, $s = \frac{1}{2}$) lands at $w = -1$, and $w \to 1$ as $t \to +\infty$. The upper half of the critical line is rolled onto the upper semicircle, running from $-1$ to $1$.

**The first five zeros.** The imaginary parts $t_n$ are taken from the literature (a literature result, not formalized in this book); the other columns are computed from the formula above and rounded to the digits shown:

| $n$ | $t_n$ | $\arg w_n$ (radians) | $\arg w_n$ (degrees) | $w_n$ |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $14.134725$ | $0.070718$ | $4.0519^\circ$ | $0.997501 + 0.070659\,i$ |
| $2$ | $21.022040$ | $0.047560$ | $2.7250^\circ$ | $0.998869 + 0.047542\,i$ |
| $3$ | $25.010858$ | $0.039977$ | $2.2905^\circ$ | $0.999201 + 0.039967\,i$ |
| $4$ | $30.424876$ | $0.032865$ | $1.8830^\circ$ | $0.999460 + 0.032859\,i$ |
| $5$ | $32.935062$ | $0.030360$ | $1.7395^\circ$ | $0.999539 + 0.030356\,i$ |

The zero of smallest imaginary part in the upper half-plane is $t_1$, so all nontrivial zeros of the upper half-plane (if the Riemann Hypothesis holds) are crowded into a short arc of the unit circle with argument at most $4.06^\circ$, accumulating at $w = 1$; the zeros of the lower half-plane are their conjugates.

**A few reference points.** $s = 2 \mapsto w = \frac{1}{2}$ (inside the circle), and its reflection $s = -1 \mapsto w = 2$ (outside), reciprocals of each other; $s = 1 \mapsto w = 0$; $s = \frac{1}{2} \mapsto w = -1$.

**Off-line points.** Take $s = 0.6 + 14i$: $|w|^2 - 1 = \dfrac{1 - 1.2}{0.36 + 196} = -1.0185\times10^{-3}$ and $|w| = 0.999491$. Its mirror image $1 - \overline{s} = 0.4 + 14i$ gives $|w|^2 - 1 = \dfrac{1 - 0.8}{0.16 + 196} = +1.0196\times10^{-3}$ and $|w| = 1.000510$. The product of the two norms is $1$, as inversion requires. At height $14$, leaving the critical line by $0.1$ moves the norm of the Cayley ratio away from $1$ by only about five parts in ten thousand: in the coordinate $w$, the high part of the critical strip is squeezed into a thin film hugging the circle.
:::

**Symmetry alone does not pin the zeros.** Since $\xi$ has both the reflection and the conjugation symmetry, could these two symmetries by themselves force the zeros onto the mirror? They cannot, and a quartic polynomial suffices as a counterexample. The module `D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization` at the pinned commit writes it down.

::: {.definition #def-off-critical-quartic title="The Off-Critical Quartic, Full ζ Symmetry, and Fixed-Line Localization" lean="D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.offCriticalQuartic D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.sourceZeros D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.HasFullZetaSymmetry D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.FixedLineLocalization"}
For real numbers $\delta, \gamma$ and a function $F : \mathbb{C} \to \mathbb{C}$:

1. The **off-critical quartic** [`offCriticalQuartic`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.offCriticalQuartic) $\delta\ \gamma\ s$ is defined as

   $$
   \bigl((z - \delta)^2 + \gamma^2\bigr)\,\bigl((z + \delta)^2 + \gamma^2\bigr), \qquad z = s - \frac{1}{2} ;
   $$

2. [`sourceZeros`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.sourceZeros) $\delta\ \gamma$ is the finite set $\bigl\{\tfrac{1}{2} + \delta + i\gamma,\ \tfrac{1}{2} + \delta - i\gamma,\ \tfrac{1}{2} - \delta + i\gamma,\ \tfrac{1}{2} - \delta - i\gamma\bigr\}$;
3. $F$ has **full $\zeta$ symmetry**, [`HasFullZetaSymmetry`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.HasFullZetaSymmetry) $F$, if $F(1 - s) = F(s)$ for every $s$ and $F(\overline{s}) = \overline{F(s)}$ for every $s$;
4. $F$ satisfies **fixed-line localization**, [`FixedLineLocalization`](lean:D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.FixedLineLocalization) $F$, if for every $s$, $F(s) = 0$ implies $\operatorname{Re}(s) = \frac{1}{2}$.
:::

::: {.theorem #thm-full-symmetry-not-localization title="An Entire Function with Full ζ Symmetry Can Have No Zero on the Critical Line" lean="D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization"}
Let $\delta, \gamma \in \mathbb{R}$ with $\delta \neq 0$ and $\gamma \neq 0$, in the notation of [@def-off-critical-quartic]. Then:

1. The function $F = \operatorname{offCriticalQuartic}\ \delta\ \gamma$ is complex differentiable on all of $\mathbb{C}$ and has full $\zeta$ symmetry; for every $s$, $F(s) = 0$ if and only if $s \in \operatorname{sourceZeros}\ \delta\ \gamma$; the set $\operatorname{sourceZeros}\ \delta\ \gamma$ has exactly $4$ elements; and every zero $s$ of $F$ satisfies $\operatorname{Re}(s) \neq \frac{1}{2}$.
2. Consequently, the statement "every function $F : \mathbb{C} \to \mathbb{C}$ that is complex differentiable on $\mathbb{C}$ and has full $\zeta$ symmetry satisfies fixed-line localization" is false.
:::

::: proof
Since $(z \mp \delta)^2 + \gamma^2 = (z \mp \delta - i\gamma)(z \mp \delta + i\gamma)$, the quartic splits into four linear factors and its zeros are exactly $z = \pm\delta \pm i\gamma$. The reflection $s \mapsto 1 - s$ is $z \mapsto -z$, which swaps the two quadratic factors; all coefficients are real, so the function commutes with conjugation. A polynomial is complex differentiable everywhere. The four zeros have real parts $\frac{1}{2} \pm \delta$, none equal to $\frac{1}{2}$ when $\delta \neq 0$; they are pairwise distinct when $\delta \neq 0$ and $\gamma \neq 0$. Claim 2 follows by instantiating the universal statement at the $F$ of Claim 1. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-quartic-mock-quartet title="A Forged Off-Line Quartet of Zeros: δ = 1/4, γ = 14"}
Take $\delta = \frac{1}{4}$ and $\gamma = 14$. The four zeros supplied by [@thm-full-symmetry-not-localization] are

$$
\tfrac{1}{4} \pm 14i, \qquad \tfrac{3}{4} \pm 14i ,
$$

all inside the critical strip $0 < \operatorname{Re}(s) < 1$, at about the height of the first zero of $\zeta$, and none of them on the critical line.

**Numerical check of the symmetries.** At $s = 0.3 + 2i$, $F(s) = 36903.7205 - 307.1640\,i$; $F(1 - s) = F(0.7 - 2i)$ returns the same number; $F(\overline{s}) = 36903.7205 + 307.1640\,i$ is its conjugate.

**On the critical line.** Substituting $z = it$ and expanding (a manual derivation):

$$
F\bigl(\tfrac{1}{2} + it\bigr) \;=\; \bigl(\delta^2 + \gamma^2 - t^2\bigr)^2 + 4\delta^2 t^2 .
$$

The value is real — a necessary consequence of full symmetry, for the same reason that $\xi$ is real on the critical line — and strictly positive. Minimizing over $t^2$, the minimum is attained at $t^2 = \gamma^2 - \delta^2$ and equals $4\delta^2\gamma^2 = 49$; at $t = 14$, $F = 49.0039$. This function never changes sign along the critical line.

**In the Cayley coordinate.** The images of the four zeros have $|w| = 0.998727$ (for $\frac{3}{4} \pm 14i$) and $|w| = 1.001274$ (for $\frac{1}{4} \pm 14i$): two inside the unit circle and two outside, paired by inversion, with logarithmic radial defects $\mp 1.2735\times10^{-3}$, none of them zero.

Compare [@ex-xi-mirror-values]: $\xi$ is likewise real along the critical line, but it changes sign between $t = 14$ and $t = 15$. Symmetry guarantees "real on the mirror"; it does not guarantee "changes sign on the mirror".
:::

Hence the information needed to prove the Riemann Hypothesis must come from outside these two symmetries. That much is guaranteed by [@thm-full-symmetry-not-localization]; what the extra information is — for instance the arithmetic structure carried by the Euler product in the first half of this chapter — this book does not assert.

**Reading the Euler product at $s = 1$: Robin's inequality.** Between the arithmetic of the Euler product and the zeros runs a one-way channel that the kernel has already checked, and its integer end needs no complex numbers at all. Take a positive integer $n$ and divide the sum $\sigma(n)$ of all its divisors by $n$. By the prime-axis factorization of Section 22.1 (a manual derivation), $\sigma(n)/n = \sum_{d \mid n} 1/d$ is a finite truncation of the Euler product at $s = 1$: only the prime axes that $n$ actually occupies are switched on, and the geometric series on each axis is cut off at the exponent $v_p(n)$. For $n \ge 2$,

$$
\frac{\sigma(n)}{n} \;=\; \prod_{p \mid n}\Bigl(1 + \frac{1}{p} + \cdots + \frac{1}{p^{v_p(n)}}\Bigr) \;<\; \prod_{p \mid n}\Bigl(1 - \frac{1}{p}\Bigr)^{-1} .
$$

The right-hand side fills every prime axis of $n$ to infinite depth; each of its factors is the local factor $(1 - p^{-s})^{-1}$ of [@thm-riemann-zeta-euler-product] evaluated at $s = 1$ (the full product diverges at $s = 1$: multiplying out these factors for the primes up to $x$ produces every $1/n$ with $n \le x$ exactly once, so the partial product is at least $\sum_{n \le x} 1/n$; and $s = 1$ is precisely the pole of [@lem-riemann-zeta-residue-one]). For $5040 = 2^4\cdot 3^2\cdot 5\cdot 7$:

$$
\frac{\sigma(5040)}{5040} \;=\; \frac{31}{16}\cdot\frac{13}{9}\cdot\frac{6}{5}\cdot\frac{8}{7} \;=\; \frac{403}{105} \;\approx\; 3.8381,
$$

while its saturated value is $2\cdot\frac{3}{2}\cdot\frac{5}{4}\cdot\frac{7}{6} = \frac{35}{8} = 4.375$. To make $\sigma(n)/n$ large, an integer has to occupy many small prime axes at once, and the more axes it occupies, the larger the integer itself becomes. The balance between the two is measured by the ruler $e^{\gamma}\ln\ln n$, where $\gamma = 0.5772\ldots$ is the Euler–Mascheroni constant; where this ruler comes from is explained at the end of this passage, and its classical link with the Riemann Hypothesis is recorded in [@rem-robin-criterion-literature]. The modules `D5/S3/Arith/Robin/FewDistinctPrimes` and `D5/S3/Arith/Robin/OffLinePeak/OriginalLocalA` of the pinned repository freeze two pieces of that link.

::: {.definition #def-divisor-ratio-mertens-error title="The Divisor Ratio, the Complete Mangoldt Cumulative Error, and Nontrivial Zeros" lean="D5/S3/Arith/Robin/PrimeFiberPropagation.divisorRatio D5/S3/Arith/Robin/CompleteMertensPeak.U D5/S3/Weil/ZeroSum.IsNontrivialZero"}
Write $\sigma(n) = \sum_{d \mid n} d$ for the divisor sum (Mathlib's `ArithmeticFunction.sigma 1`), $\gamma$ for the Euler–Mascheroni constant (`Real.eulerMascheroniConstant`), and $\ln$ for Mathlib's real logarithm `Real.log`.

1. The **divisor ratio** [`divisorRatio`](lean:D5/S3/Arith/Robin/PrimeFiberPropagation.divisorRatio) $n$ of a natural number $n$ is the real number $\sigma(n)/n$ (under Lean's total division it equals $0$ at $n = 0$).
2. The **complete Mangoldt cumulative error** [`U`](lean:D5/S3/Arith/Robin/CompleteMertensPeak.U) of a real number $t$ is

   $$
   U(t) \;=\; t\sum_{0 < k \le \lfloor t\rfloor}\frac{\Lambda(k)}{k} \;-\; \psi(t) \;-\; t\ln t \;+\; (1 + \gamma)\,t ,
   $$

   where $\lfloor t\rfloor$ is the natural-number floor `⌊t⌋₊`, $\Lambda$ is the von Mangoldt function ($\Lambda(p^j) = \ln p$ for a prime $p$ and $j \ge 1$, and $0$ otherwise; it is a function on the natural numbers, not the $\Lambda(s)$ of [@def-xi-reading]), and $\psi(t) = \sum_{0 < k \le \lfloor t\rfloor}\Lambda(k)$ is the Chebyshev function (Mathlib's `Chebyshev.psi`).
3. $\rho$ is a **nontrivial zero**, [`IsNontrivialZero`](lean:D5/S3/Weil/ZeroSum.IsNontrivialZero) $\rho$, if $\operatorname{classicalZeta}(\rho) = 0$ and $0 < \operatorname{Re}(\rho) < 1$ (for $\operatorname{classicalZeta}$ see [@def-classical-zeta]).
:::

::: {.theorem #thm-robin-at-most-eight-primes title="Robin's Inequality on at Most Eight Prime Axes, and for Every Integer with $5040 < n < 223092870$" lean="D5/S3/Arith/Robin/FewDistinctPrimes.robin_of_card_primeFactors_le_eight D5/S3/Arith/Robin/FewDistinctPrimes.robin_lt_223092870"}
In the notation of [@def-divisor-ratio-mertens-error], let $\omega(n)$ be the number of distinct prime factors of $n$ (`n.primeFactors.card`).

1. For every natural number $n$ with $5040 < n$ and $\omega(n) \le 8$,

   $$
   \frac{\sigma(n)}{n} \;<\; e^{\gamma}\,\ln\ln n .
   $$

2. For every natural number $n$ with $5040 < n < 223092870$, the same inequality holds. Here $223092870 = 2\cdot 3\cdot 5\cdot 7\cdot 11\cdot 13\cdot 17\cdot 19\cdot 23$.
:::

::: proof
Claim 1 is proved in two ranges. **(i) $5040 < n < 6000$.** If every prime factor of $n$ lies in $\{2, 3, 5, 7, 11\}$, the frozen 11-smooth case [`robin_eleven_smooth`](lean:D5/S3/Arith/Robin/ElevenSmooth.robin_eleven_smooth) of the same library applies directly. Otherwise $n$ has a prime factor $p \ge 13$; split $n = p^a\cdot r$ with $r$ coprime to $p$. Then $p^a \ge 13$ forces $r < 462$; the factor on the $p$-axis is below $\frac{p}{p-1} \le \frac{13}{12}$, and the kernel checks $\sigma(r)/r \le \frac{13}{4}$ for each $r < 462$, so $\sigma(n)/n \le \frac{169}{48} \approx 3.521$, whereas $e^{\gamma} > \frac{89}{50}$ and $\ln\ln 5040 > \frac{1071}{500}$ give $e^{\gamma}\ln\ln n > 3.8127$.

**(ii) $n \ge 6000$.** Whenever a larger prime carries a larger exponent than a smaller prime, swap the two exponents; repeating this yields $m \le n$ with the same number of distinct prime factors, exponents non-increasing along the primes, and $\sigma(n)/n \le \sigma(m)/m$ (the frozen theorem [`exists_antitone_exponent_form`](lean:D5/S3/Arith/ExponentExchange/PrefixNormalForm.exists_antitone_exponent_form)). Non-increasing exponents mean that the primes of $m$ form an initial segment of the primes, so with at most eight of them they come from $2, 3, \dots, 19$. If $m \le 5040$: the frozen theorem [`golden_resource_unique_optimum`](lean:D5/S3/Arith/GoldenResourceOptimalInteger.golden_resource_unique_optimum) says that $5040$ is the unique maximizer of $\ln(\sigma(n)/n) - \frac{1}{25}\ln n$ over all positive integers, whence $\sigma(m)/m \le \frac{403}{105} \approx 3.8381$, while $e^{\gamma}\ln\ln n > \frac{89}{50}\cdot\frac{54}{25} \approx 3.8448$. If $m > 5040$: for $m < 10^{12}$ the kernel enumerates all products of $2, 3, \dots, 19$ with non-increasing exponents, bounds $\sigma(m)/m \le K/100$ on twelve intervals, and compares with a rational lower bound for $\ln\ln$ at the left end of each interval; for $m \ge 10^{12}$ the saturation bound $\sigma(m)/m \le \prod_{p \le 19}\frac{p}{p-1} = \frac{323323}{55296} < 5.85 \le \frac{89}{50}\cdot\frac{3317}{1000}$ suffices. Finally, $\ln\ln$ is increasing and $m \le n$, which carries the strict inequality from $m$ back to $n$. Every lower bound for $\ln\ln$ is a rational number obtained from a binary splitting $t = 2^k y$ ($1 \le y < 2$) and partial sums of the $\operatorname{artanh}$ series; $e^{\gamma} > \frac{89}{50}$ comes from a decimal lower bound for $\gamma$ and the first few terms of the exponential series.

**Claim 2.** If $n < 223092870$ had at least nine distinct prime factors, nine of them would multiply to a divisor of $n$ that is at least the product $223092870$ of the first nine primes, a contradiction; hence $\omega(n) \le 8$ and Claim 1 applies. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-robin-5040-threshold title="Why the Threshold Is 5040: Divisor Ratios Against Robin's Ruler"}
**The threshold itself.** Continuing the hand computation above: $\ln 5040 = 8.5251614$, $\ln\ln 5040 = 2.1430220$, $e^{\gamma}\ln\ln 5040 = 3.8168773$, whereas $\sigma(5040)/5040 = 3.8380952$, an excess of $0.0212180$. So $5040$ violates Robin's inequality, and the hypothesis $5040 < n$ of [@thm-robin-at-most-eight-primes] cannot be relaxed by a single step. Checking $3 \le n \le 5040$ one by one (a numerical computation, not a Lean theorem) finds exactly $26$ integers with $\sigma(n)/n \ge e^{\gamma}\ln\ln n$:

$$
\begin{aligned}
&3,\ 4,\ 5,\ 6,\ 8,\ 9,\ 10,\ 12,\ 16,\ 18,\ 20,\ 24,\ 30,\ 36, \\
&48,\ 60,\ 72,\ 84,\ 120,\ 180,\ 240,\ 360,\ 720,\ 840,\ 2520,\ 5040 .
\end{aligned}
$$

Claim 2 of [@thm-robin-at-most-eight-primes] says that after $5040$ there is not a single further one below $223092870$.

**A comparison table.** Entries are rounded to the digits shown; the last column names the claim that covers the integer:

| $n$ | factorization | $\omega(n)$ | $\sigma(n)/n$ | $e^{\gamma}\ln\ln n$ | covered by |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $5040$ | $2^4\cdot 3^2\cdot 5\cdot 7$ | $4$ | $3.8380952$ | $3.8168773$ | violation, out of range |
| $5041$ | $71^2$ | $1$ | $1.0142829$ | $3.8169187$ | Claims 1 and 2 |
| $10080$ | $2^5\cdot 3^2\cdot 5\cdot 7$ | $4$ | $3.9000000$ | $3.9561030$ | Claims 1 and 2 |
| $55440$ | $2^4\cdot 3^2\cdot 5\cdot 7\cdot 11$ | $5$ | $4.1870130$ | $4.2583230$ | Claims 1 and 2 |
| $720720$ | $2^4\cdot 3^2\cdot 5\cdot 7\cdot 11\cdot 13$ | $6$ | $4.5090909$ | $4.6339957$ | Claims 1 and 2 |
| $223092870$ | $2\cdot 3\cdot 5\cdots 23$ | $9$ | $3.7476568$ | $5.2650506$ | neither |
| $3491888400$ | $2^4\cdot 3^3\cdot 5^2\cdot 7\cdot 11\cdot 13\cdot 17\cdot 19$ | $8$ | $5.3262898$ | $5.5032407$ | Claim 1 |

Right after the threshold, $5041 = 71^2$ sits on a single large prime axis and reaches only $26.6\%$ of the ruler. The dangerous integers are those that occupy the first few axes starting from $2$ with exponents that never increase from one axis to the next: $10080$, $55440$ and $720720$ reach $98.6\%$, $98.3\%$ and $97.3\%$ of the ruler, which is exactly why the proof moves the larger exponents onto the smaller primes. $223092870$ occupies nine axes but goes only one step along each, reaching $71.2\%$ of the ruler; that it satisfies the inequality is a numerical fact, and neither claim covers it. $3491888400$ is larger than $223092870$ but occupies only eight axes, so Claim 1 covers it.

**Why the saturation bound suffices above $10^{12}$.** With all eight axes $2, 3, \dots, 19$ filled, $\prod_{p \le 19}\frac{p}{p-1} = 5.8471318$, while $\ln\ln 10^{12} = 3.3189391$ and $e^{\gamma}\ln\ln 10^{12} = 5.9112709$: above $10^{12}$, an integer on at most eight axes cannot reach the ruler, however large its exponents. Each additional axis multiplies the saturated value by one more factor $\frac{p}{p-1} > 1$, which is why the proof must cap the number of axes.
:::

**The other direction: an off-line zero leaves evidence in the integers.** [@thm-robin-at-most-eight-primes] checks one fragment: the integers on at most eight prime axes. On the other side stands an implication: if $\zeta$ has a single zero to the right of the critical line, then some integer above $5040$ violates Robin's inequality, and its shape is prescribed — it is the least common multiple of $1, 2, \dots, \lfloor t\rfloor$, which occupies every prime axis below $t$.

::: {.theorem #thm-off-line-zero-robin-violation title="A Zero Right of the Critical Line Forces Some $\operatorname{lcm}(1, \dots, \lfloor t\rfloor)$ to Violate Robin's Inequality" lean="D5/S3/Arith/Robin/OffLinePeak/OriginalLocalA.original_zero_robin5040_localA"}
In the notation of [@def-divisor-ratio-mertens-error], let $\rho \in \mathbb{C}$ satisfy $\operatorname{IsNontrivialZero}\ \rho$, $\operatorname{Re}(\rho) > \frac{1}{2}$ and $\operatorname{Im}(\rho) > 0$. Put

$$
\begin{aligned}
\delta &= \operatorname{Re}(\rho) - \tfrac{1}{2}, \qquad D = \operatorname{Im}(\rho) + 10, \\
m_0 &= \frac{100\,D^2}{\delta^2}, \qquad m_1 = \frac{500\,D^4}{\delta^2}, \\
B_0 &= \exp\bigl(4\,(28\,m_1 + 20)^2\bigr) .
\end{aligned}
$$

Then there is a real number $A$ with $e^{4m_0} \le A \le e^{28m_1}$ and

$$
\sqrt{A}\,\bigl(4\ln A + 9\bigr) \;<\; U(A),
$$

and, for this $A$, a real number $t$ with $A \le t \le \exp\bigl(4(\ln A + 20)^2\bigr)$ such that $N = \operatorname{lcm}(1, 2, \dots, \lfloor t\rfloor)$ (Mathlib's `Nat.lcmUpto ⌊t⌋₊`) satisfies all of

$$
5040 < N, \qquad \operatorname{divisorRatio}\ N \;>\; e^{\gamma}\ln\ln N, \qquad N \;\le\; \exp\bigl(B_0\ln B_0\bigr) .
$$
:::

::: proof
The proof has two steps, matching the two parts of the Lean module `OriginalLocalA`.

**Step 1: from the zero to a peak.** The frozen result [`actual_height_gt_ten`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_height_gt_ten) of the pinned repository says that every nontrivial zero satisfies $|\operatorname{Im}\rho| > 10$, so $D > 20$; also $0 < \delta < \frac{1}{2}$, hence $m_0 > 160000$. A spectral selection lemma first picks a scale $m \in [m_0, m_1]$ at which the contribution of $\rho$ itself dominates all other zeros; the zero term $H(y)$ (a sum over all nontrivial zeros) is then probed with a Gaussian kernel centred at $y = 16m$, of width comparable to $\sqrt{m}$, and modulated at the frequency $\operatorname{Im}\rho$. The zero $\rho$ makes this response at least $\frac{1}{2}e^{am}$ with $a = \operatorname{Re}(\rho)^2 + 16\operatorname{Re}(\rho) = \frac{33}{4} + 17\delta + \delta^2$, and $e^x \ge x^2/2$ together with $m \ge m_0$ gives $4000\,mD^2 < e^{17\delta m}$. Now argue by contradiction: suppose $U(A) \le \sqrt{A}(4\ln A + 9)$ throughout the window $[e^{4m_0}, e^{28m_1}]$. The integrated explicit formula gives $H(y) \le U(e^y)$, hence $H(y) \le (4y + 11)e^{y/2}$ for $y \in [4m, 28m]$; the mass of the Gaussian kernel is concentrated on this stretch (the rest is estimated separately), so the response is at most $2000\,mD^2e^{33m/4} < \frac{1}{2}e^{am}$, a contradiction. The surplus $17\delta + \delta^2$ in the exponent is the price of the zero leaving the critical line: at $\delta = 0$ the two bounds have the same exponent and the contradiction disappears.

**Step 2: from the peak to an integer.** By a frozen tail identity, $U(A) = -A\int_A^{\infty}\frac{\psi(u) - u}{u^2}\,du$ for $A \ge 2$: a large $U(A)$ means that from $A$ onwards $\psi(u)$ lies, on average, below the straight line $u$. Regard a certain weighted average of the Chebyshev tail beyond $e^y$ as a function of $y$; multiplied by a positive weight, its Gaussian average over $[\ln A,\ 4(\ln A + 20)^2]$ is nearly zero (at most $1000/(A\ln A)$ in absolute value, less than $\frac{1}{2\sqrt{A}}$ times the Gaussian average of the weight itself), so some $y$ in that range makes the weighted average exceed $-\frac{1}{2\sqrt{A}}$. Consequently the Mertens error $E_3(t) = \sum_{p \le t}\ln(1 - 1/p) + \ln\ln t + \gamma$ cannot stay at or above $-4/\sqrt{t} - (\psi(t) - t)/(t\ln t)$ on all of $[A, e^y]$, for integrating it back would contradict the peak (the frozen theorem [`finite_mertens_peak_of_signed_endpoint`](lean:D5/S3/Arith/Robin/CompleteMertensPeak.finite_mertens_peak_of_signed_endpoint)). At a point $t$ where $E_3(t)$ drops below this threshold, take $N = \operatorname{lcm}(1, \dots, \lfloor t\rfloor)$: then $\ln N = \psi(t)$, and the divisor ratio of $N$ is the product of the truncated Euler factors on every prime axis below $t$, whose logarithm differs from that of the saturated value $\prod_{p \le t}\frac{p}{p-1}$ by at most $4/\sqrt{t}$; on the side of the ruler, $\ln\bigl(e^{\gamma}\ln\ln N\bigr) = \gamma + \ln\ln\psi(t)$, and the tangent inequality $\ln\ln\psi(t) \le \ln\ln t + \frac{\psi(t) - t}{t\ln t}$ compares it with $\ln\ln t$ (this is where the second term of the threshold comes from); so the drop of $E_3(t)$ turns into $\operatorname{divisorRatio}\ N > e^{\gamma}\ln\ln N$ (the frozen theorem [`common_robin_response`](lean:D5/S3/Arith/Robin/LcmRobinResponse.common_robin_response)). Finally, Mathlib's Chebyshev upper bound yields $\psi(t) \le t\ln t$, so $N \le e^{t\ln t}$, and $t \le \exp(4(\ln A + 20)^2)$ together with $\ln A \le 28m_1$ gives $N \le \exp(B_0\ln B_0)$. The full proof is checked by the Lean kernel.
:::

[@thm-off-line-zero-robin-violation] is an implication; it does not assert that an off-line zero exists. Combined with the symmetries of this section it yields, by a manual derivation: **if $\sigma(n)/n < e^{\gamma}\ln\ln n$ for every $n > 5040$, then [@conj-riemann-hypothesis] holds.** The reasoning (a manual derivation): if the conjecture fails, some zero $\rho$ in the critical strip has $\operatorname{Re}(\rho) \neq \frac{1}{2}$. Inside the critical strip the zeros of $\zeta$ are exactly the zeros of $\xi$ (the factor $\frac{1}{2}s(s-1)\pi^{-s/2}\Gamma(s/2)$ does not vanish there), so by the groups of four described after [@thm-xi-reading-entire-reflection], $\rho,\ \overline{\rho},\ 1 - \rho,\ 1 - \overline{\rho}$ are all nontrivial zeros, and at least one of them has $\operatorname{Re} > \frac{1}{2}$ and $\operatorname{Im} \ge 0$; the frozen result [`actual_height_gt_ten`](lean:D5/S3/Weil/ZeroData/ActualReciprocalSquareBounds.actual_height_gt_ten) rules out $\operatorname{Im} = 0$. [@thm-off-line-zero-robin-violation] then produces an $N > 5040$ that violates Robin's inequality. The reverse direction lies outside the frozen part of this book (see [@rem-robin-criterion-literature]), and the statement "Robin's inequality holds for every $n > 5040$" is itself as open as the Riemann Hypothesis: [@thm-robin-at-most-eight-primes] checks only the fragment $\omega(n) \le 8$.

The bounds in the theorem are explicit, but far too large for any search. To get a feel for their size, substitute the coordinates of the test point $0.6 + 14i$ of [@ex-cayley-unit-circle-zeros] into the formulas (without assuming a zero there): $\delta = 0.1$, $D = 24$, $m_0 = 5760000$ and $m_1 = 1.65888\times10^{10}$; the peak sits at some $A \ge e^{23040000}$, a number with more than ten million decimal digits; and in the bound $\exp(B_0\ln B_0)$ for $N$, $\ln B_0 = 4(28m_1 + 20)^2 \approx 8.62990\times10^{23}$. The theorem guarantees that a violator exists; it does not supply a test that could actually be run.

**Where the ruler comes from.** Both the shape and the constant of Robin's ruler $e^{\gamma}\ln\ln n$ have frozen support in the pinned repository. The two envelopes of Gronwall's theorem (T. H. Gronwall, 1913) are frozen as [`gronwall_envelopes`](lean:D5/S3/Weil/GronwallLowerEnvelope.gronwall_envelopes): for every real $\varepsilon > 0$,

1. there is an $N$ such that every natural number $n \ge N$ satisfies $\dfrac{\sigma(n)}{e^{\gamma}\,n\ln\ln n} \le 1 + \varepsilon$;
2. for every $N$ there is a natural number $n \ge N$ with $\dfrac{\sigma(n)}{e^{\gamma}\,n\ln\ln n} \ge 1 - \varepsilon$.

A manual derivation follows: replace the constant $e^{\gamma}$ of the ruler by any smaller positive number $c$, and item 2 (with $\varepsilon$ chosen so that $(1 - \varepsilon)e^{\gamma} > c$) produces arbitrarily large violators; replace it by any larger $c$, and item 1 says that the inequality holds from some point on. Robin's inequality asks about the constant $e^{\gamma}$ itself, with no $\varepsilon$ to spare, and demands it from $5040$ on. In Lean, the proof of the upper envelope splits the prime factors of $n$ at a cutoff, pads the small ones to all prime axes below the cutoff, and estimates them with Mertens' third theorem, which is frozen as well, as [`E₃.bound''`](lean:D5/S3/Weil/Mertens/Third.E₃.bound''): as the real number $x \to \infty$, $\prod_{p \le x}(1 - 1/p) \sim e^{-\gamma}/\ln x$; taking reciprocals (a manual derivation), the saturated value $\prod_{p \le x}(1 - 1/p)^{-1}$ of all prime axes below $x$ is asymptotic to $e^{\gamma}\ln x$. The lower envelope uses powers of primorials as witnesses.

::: {.remark #rem-robin-criterion-literature title="Robin's Criterion (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** **Robin's criterion** (G. Robin, 1984): the Riemann Hypothesis holds if and only if $\sigma(n)/n < e^{\gamma}\ln\ln n$ for every $n > 5040$. The direction "the inequality implies the hypothesis" follows in this book from [@thm-off-line-zero-robin-violation] and the symmetries of this section by a manual derivation (see above); the direction "the hypothesis implies the inequality" is not frozen in this form at the pinned commit.
:::

Yet aesthetic symmetry is not a proof. In strict compliance with our three-tier epistemic contract (`OPEN`), we state the Riemann Hypothesis as an open conjecture (carrying no `lean` attribute), followed by a literature audit delineating what the frozen Lean theorems of this chapter do and do not certify.

::: {.conjecture #conj-riemann-hypothesis title="The Riemann Hypothesis"}
Every nontrivial zero of the analytically continued Riemann zeta function $\zeta(s)$ (that is, every zero $\rho \in \mathbb{C}$ lying in the critical strip $0 < \operatorname{Re}(\rho) < 1$) has real part equal to $\frac{1}{2}$:

$$
\forall \rho \in \mathbb{C},\qquad \bigl(0 < \operatorname{Re}(\rho) < 1 \;\land\; \zeta(\rho) = 0\bigr) \;\Longrightarrow\; \operatorname{Re}(\rho) = \frac{1}{2}.
$$

*(This statement is **OPEN**; the block intentionally carries no `lean` attribute.)*
:::

::: {.remark #rem-euler-zeta-literature title="Audit of Certified Half-Plane Identities vs. Analytic Continuation and the Riemann Hypothesis (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Readers should keep the three epistemic layers of this chapter sharply distinct:

1. **Kernel-verified frozen theorems in this book (`LEAN ✓`)**: The seventeen formal blocks of this chapter — the unit residue at $s = 1$ ([@lem-riemann-zeta-residue-one]), the Dirichlet series identity on $\operatorname{Re}(s) > 1$ ([@prop-riemann-zeta-dirichlet-sum]), the Euler prime product identity on $\operatorname{Re}(s) > 1$ ([@thm-riemann-zeta-euler-product]), their direct equality on $\operatorname{Re}(s) > 1$ ([@cor-dirichlet-sum-eq-euler-product]), the linear independence of prime logarithms over the integers and the rationals ([@thm-prime-log-independence]), the irrationality of logarithms of natural numbers ([@lem-log-natural-irrational]), the closure of power orbits on a finite-dimensional torus together with Kronecker density ([@thm-torus-power-orbit-closure]), the entirety, reflection symmetry $\xi(1 - s) = \xi(s)$ and endpoint values of the xi reading ([@thm-xi-reading-entire-reflection]), the conjugation covariance of $\zeta$ and $\xi$ ([@prop-zeta-conjugation-covariance]), the Cayley unit-circle criterion with the radial equivalent of the Riemann Hypothesis ([@thm-cayley-critical-line-criterion]), the convergence of the alternating partial sums to $(1 - 2^{1-s})\,\zeta(s)$ ([@lem-alternating-zeta-partial-sums]), the sign of $\zeta$ on the real axis and its real zeros ([@prop-zeta-real-axis-sign]), the zeros of the xi reading as exactly the zeros of $\zeta$ in the critical strip together with the nonvanishing of the completed zeta on $\operatorname{Re}(s) \ge 1$ ([@prop-xi-zeros-strip-zeros]), the right half-strip reduction and the agreement of Mathlib's formulation with the critical-strip one ([@thm-right-half-strip-rh-forms]), the quartic counterexample showing that full symmetry does not imply fixed-line localization ([@thm-full-symmetry-not-localization]), Robin's inequality on at most eight prime axes and for every $5040 < n < 223092870$ ([@thm-robin-at-most-eight-primes]), and the theorem that a zero right of the critical line forces some $\operatorname{lcm}(1, \dots, \lfloor t\rfloor)$ to violate Robin's inequality ([@thm-off-line-zero-robin-violation]) — are fully verified by the Lean kernel. Note that the Euler product is invoked solely inside the absolute-convergence half-plane `1 < s.re` ($\operatorname{Re}(s) > 1$) supplied by the Lean hypotheses.
2. **Classical theorems of analytic number theory (proved in the literature, not formalized in this book)**:
   - **Analytic continuation and trivial zeros (Riemann, 1859)**: $\zeta(s)$ extends meromorphically to $\mathbb{C}$ with a single simple pole at $s = 1$, and has trivial zeros at $s = -2, -4, -6, \dots$ ([@rem-zeta-zero-free-region-literature]). (That there are no other zeros outside the critical strip $0 < \operatorname{Re}(s) < 1$ no longer belongs to this layer: it follows from Claim 3 of [@thm-right-half-strip-rh-forms] and the one-line manual derivation after [@prop-xi-zeros-strip-zeros]; for the real axis see [@prop-zeta-real-axis-sign].) (That the completed function $\xi$ is entire and satisfies $\xi(s) = \xi(1 - s)$ and $\xi(\overline{s}) = \overline{\xi(s)}$ no longer belongs to this layer: these are given by [@thm-xi-reading-entire-reflection] and [@prop-zeta-conjugation-covariance] through Mathlib's completed zeta.)
   - **From nonvanishing on the line $\operatorname{Re}(s) = 1$ to the Prime Number Theorem (Hadamard, de la Vallée Poussin, 1896)**: the nonvanishing $\zeta(1 + it) \neq 0$ ($t \neq 0$; $t = 0$, i.e. $s = 1$, is the simple pole) no longer belongs to this layer, since it follows from [@prop-xi-zeros-strip-zeros] by a one-line manual derivation; the book cites no frozen declaration for the step from it to the Prime Number Theorem $\pi(x) \sim \frac{x}{\ln x}$ by contour integration or a Tauberian theorem;
   - **Explicit formulas (von Mangoldt, Weil)**: Fourier duality pairing prime-power logarithmic weights $\Lambda(n)$ with the spectral sum over nontrivial zeros $\rho$. (One integrated form no longer belongs to this layer: the pinned repository freezes [`actual_integrated_explicit_formula`](lean:D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula), which says that for every real $y > 0$ the sum $\sum_{\rho} e^{\rho y}/(\rho(1 - \rho))$ over all nontrivial zeros, counted with multiplicity, equals $U(e^y) - \ln(2\pi) + \sum_{n \ge 1} e^{-2ny}/(2n(2n + 1))$, with $U$ as in [@def-divisor-ratio-mertens-error]; the proof of [@thm-off-line-zero-robin-violation] uses it.)
3. **Open conjecture (`OPEN`)**: [@conj-riemann-hypothesis] asserts that all nontrivial zeros lie on $\operatorname{Re}(\rho) = 1/2$ (equivalently $\pi(x) = \operatorname{Li}(x) + O(x^{1/2}\ln x)$). The frozen theorems of this chapter certify the residue, the sum–product identity on $\operatorname{Re}(s) > 1$, and the reflection symmetry of $\xi$; they **do not certify the Riemann Hypothesis**: reflection symmetry only says that zeros come in pairs about $s = \frac{1}{2}$, not that they lie on the critical line; [@thm-cayley-critical-line-criterion] merely restates the conjecture equivalently on the unit circle; [@thm-right-half-strip-rh-forms] merely reduces it to the right half-strip and shows that Mathlib's formulation agrees with the critical-strip one; [@thm-full-symmetry-not-localization] shows that the reflection and conjugation symmetries alone cannot imply it; and [@thm-off-line-zero-robin-violation] only turns an off-line zero into a counterexample to Robin's inequality, without excluding off-line zeros.
:::

From the concept fibers of [Chapter 21](ch21-diagonalization-and-escape.md) to the prime orthogonal axes of this chapter, we have seen the rigid crystal structure of the integers $\mathbb{Z}$. What happens, however, when $\mathbb{Z}$ is submerged inside the dense continuum of the rational field $\mathbb{Q}$, where infinitely many fractions crowd between any two integers? Can first-order polynomial equations over $\mathbb{Q}$ still isolate the discrete integer skeleton $\mathbb{Z} \subset \mathbb{Q}$ — and why does the modern lock that achieves this rely on **quaternion norm spheres** and quadratic trace projections? Let us turn to [Chapter 23](ch23-diophantine-definability.md).
