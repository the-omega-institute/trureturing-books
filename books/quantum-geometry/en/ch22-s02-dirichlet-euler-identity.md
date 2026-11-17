# 22.2 Formal Identities for the Residue, Dirichlet Series, and Euler Product {#sec-ch22-2}

Before entering the half-plane $\operatorname{Re}(s) > 1$, we anchor the most prominent landmark of $\zeta(s)$ in the complex plane: its **unique simple pole at $s = 1$**, where the harmonic series diverges with unit residue.

Geometrically, as $s \to 1^+$, the divergence of $\sum_{n=1}^\infty n^{-s}$ reflects the unbounded accumulation of prime amplification factors $(1 - p^{-1})^{-1} = \frac{p}{p-1}$ across infinitely many orthogonal prime axes, scaled by $(s - 1)^{-1}$ with residue exactly $1$.

::: {.viz src="euler-product-sieve" preset="near" height="500"}
**The closer to 1, the wider the gap.** The list holds the $11$ primes up to $31$ and the amber line stands at $s = 1.1$: the cyan product reaches only $4.93$ against the ink $\zeta(1.1) = 10.58$, so the magenta gap is larger than the product itself. Moving left only widens it: at $s = 1$ the cyan curve stops at the finite value $\prod_{p \le 31} \frac{p}{p-1} \approx 6.54$, while the ink $\zeta$ runs off the top of the picture, at the pole of [@lem-riemann-zeta-residue-one].
:::

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

::: {.figure src="ch22-euler-staircase"}
**The Euler product over finitely many primes climbs towards $\zeta(2)$ step by step, yet always falls short.** The cyan staircase is the product over the first $K$ primes at $s = 2$, reaching $\frac{25}{16}$ at $K = 3$; the ink line is $\zeta(2) = \frac{\pi^2}{6}$. The magenta gap between them keeps narrowing, but with all $25$ primes up to $97$ it is still $0.0030$; only the product over every prime equals $\zeta(s)$ ([@thm-riemann-zeta-euler-product]). The values plotted are numerical.
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

::: {.viz src="euler-product-sieve" preset="all" height="500"}
**Every cell cyan, the gap still wide.** Primes join the list one by one up to $97$: every cell from $1$ to $96$ turns cyan, so each of these integers appears in the expansion of the product. The amber line stands at $s = 1.2$: the cyan product is only $4.37$ against the ink $\zeta(1.2) = 5.59$, and the magenta gap of $1.23$ is still more than a fifth of $\zeta$, with $101^{-s}$ as its lowest slice in the magnifier. Only with every prime multiplied in does the product equal the whole series ([@cor-dirichlet-sum-eq-euler-product]).
:::

**The same trick for sums.** The Euler product rests on multiplicative decomposition: every $n$ is uniquely a product of prime powers, and each prime axis contributes its own geometric series. Replace “multiply” by “add” and the trick still works. Split $N$ into a sum of positive parts, ignoring order. Each part size $n$ is an axis, and the number of times it occurs, $m_n$, is the coordinate on that axis; summing along the axis is again a geometric series $1 + x^n + x^{2n} + \cdots = (1 - x^n)^{-1}$. If parts of size $n$ come in $c_n$ colours, and parts of the same size and colour are indistinguishable, the axis splits into $c_n$ axes and the factor becomes $(1 - x^n)^{-c_n}$. The following theorem pins this down on genuine finite sets: the left side is a coefficient of a formal power series, the right side is the number of elements of a finite type, and the two are defined independently of each other.

::: {.theorem #thm-coloured-partition-euler-product title="Coloured Partition Count: The Coefficients of the Additive Euler Product" lean="D5/S3/Combinatorics/Partitions/ColouredEulerLedger.coloured_coefficient"}
Fix colour counts $c : \mathbb{N} \to \mathbb{N}$ ($c_n$ may be $0$). For $N \in \mathbb{N}$, a **coloured partition** of $N$ consists of a partition of $N$ together with, for each part size $d$ that occurs (with multiplicity $m_d$), a multiset of $m_d$ colours chosen with repetition from $c_d$ colours. In the ring $\mathbb{Z}[[x]]$ of formal power series with integer coefficients, write

$$
E_c(x) = \prod_{n \ge 1} (1 - x^n)^{-c_n}, \qquad (1 - x^n)^{-c} = \sum_{k \ge 0} \binom{c + k - 1}{k}\, x^{kn},
$$

where the $x^N$ coefficient of $E_c$ is taken to be the $x^N$ coefficient of the product of the first $N$ factors $n = 1, \dots, N$ (the later factors have no non-constant term below $x^{N+1}$ and do not affect it). Then

$$
[x^N]\, E_c(x) = \#\{\, \text{coloured partitions of } N \,\}.
$$
:::

::: proof
The Lean proof does not start from the product and “guess” its coefficients. It counts each side on its own terms and meets in the middle.

(1) The right side. The set of coloured partitions is a dependent sum: choose a partition $p$, then independently choose a multiset for each part size $d$ occurring in $p$. There are $\binom{c + m - 1}{m}$ ways to choose $m$ items with repetition from $c$ colours (stars and bars), so the total is $\sum_p \prod_d \binom{c_d + m_d - 1}{m_d}$. This is exactly the $x^N$ coefficient of Mathlib's weighted partition generating function, with weight $\binom{c_d + m - 1}{m}$ for size $d$ and multiplicity $m$.

(2) The left side. The same generating function is also the infinite product, in the sense of coefficientwise convergence, of the local factors $1 + \sum_{j \ge 1} \binom{c_d + j - 1}{j}\, x^{dj}$; comparing coefficients shows that this local factor is $(1 - x^d)^{-c_d}$. Limits of infinite products are unique, and every coefficient of $E_c$ is already fixed by finitely many factors, so the two sides agree. The full proof is checked by the Lean kernel.
:::

**Counting boson states (manual derivation).** Picture a collection of independent harmonic modes: $c_n$ modes of frequency $n\omega$ for $n = 1, 2, 3, \dots$, each able to hold any number of identical bosons, each particle carrying energy $n\hbar\omega$ (zero-point energy ignored). A Fock state assigns an occupation number to every mode. Treat the $c_n$ modes of frequency $n\omega$ as $c_n$ colours: if their occupations add up to $m_n$, a list of occupations is exactly a multiset of $m_n$ colours chosen with repetition from $c_n$. The total energy is $\sum_n n\, m_n$ units of $\hbar\omega$. So Fock states of total energy $N\hbar\omega$ correspond one-to-one to coloured partitions of $N$, and by [@thm-coloured-partition-euler-product] their number is the $x^N$ coefficient of $E_c$. Setting $x = e^{-\hbar\omega/k_B T}$ turns $E_c(x)$ into the canonical partition function of this Bose gas. The theorem, however, is about coefficients of a formal power series; substituting a number for $x$ also needs the product to converge (for instance, if $c_n$ is bounded and $0 \le x < 1$, then $\sum_n c_n x^n < \infty$ and the product converges).

::: {.example #ex-coloured-partitions-small title="One, Two and n Colours: The First Terms by Hand, Checked Against Enumerated Fock States"}
**One colour ($c_n = 1$).** These are the ordinary partition numbers $p(N)$. The partitions of $N = 4$ are the $5$ sums $4$, $3 + 1$, $2 + 2$, $2 + 1 + 1$ and $1 + 1 + 1 + 1$.

**Two colours ($c_n = 2$).** Take $N = 2$. The partition $2$ has one part, with $2$ choices of colour. The partition $1 + 1$ needs $2$ colours chosen with repetition from $2$, and there are $\binom{3}{2} = 3$ such multisets (two red, two blue, one of each). That makes $5$ in all. Physically, this is a one-dimensional cavity with two polarizations at every frequency: it has $5$ states of energy $2\hbar\omega$.

**$n$ colours ($c_n = n$).** Take $N = 2$. The part $2$ comes in $2$ colours, giving $2$ states; $1 + 1$ has only one colour available, giving $1$. That makes $3$ in all.

Expanding the three products up to $x^{10}$:

| $N$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $c_n = 1$ | $1$ | $1$ | $2$ | $3$ | $5$ | $7$ | $11$ | $15$ | $22$ | $30$ | $42$ |
| $c_n = 2$ | $1$ | $2$ | $5$ | $10$ | $20$ | $36$ | $65$ | $110$ | $185$ | $300$ | $481$ |
| $c_n = n$ | $1$ | $1$ | $3$ | $6$ | $13$ | $24$ | $48$ | $86$ | $160$ | $282$ | $500$ |

Every entry was computed in two independent ways: by expanding the product term by term as the theorem says, and, without touching the product at all, by enumerating the occupation numbers of every mode and counting the Fock states of total energy $N$. For all three rows and $N \le 10$ the two agree exactly.

**Literature result, not formalized in this book.** The row $c_n = n$ is exactly the number of plane partitions (MacMahon, 1916); the bijection between those and coloured partitions is outside the scope of this book. The growth of the ordinary partition numbers is given by the Hardy–Ramanujan asymptotic $p(N) \sim \dfrac{e^{\pi\sqrt{2N/3}}}{4\sqrt{3}\,N}$ (Hardy & Ramanujan, 1918). The table compares the leading term with the exact values; the relative error shrinks only slowly, like $1/\sqrt{N}$:

| $N$ | $p(N)$ | Leading term $\dfrac{e^{\pi\sqrt{2N/3}}}{4\sqrt{3}\,N}$ | Leading term $/\, p(N) - 1$ |
| ---: | ---: | ---: | ---: |
| $10$ | $42$ | $48.10$ | $+14.5\%$ |
| $50$ | $204226$ | $2.176 \times 10^{5}$ | $+6.5\%$ |
| $100$ | $190569292$ | $1.993 \times 10^{8}$ | $+4.6\%$ |
| $200$ | $3972999029388$ | $4.100 \times 10^{12}$ | $+3.2\%$ |
:::

**The Euler product is itself a Bose gas.** Carry the same reading back to [@cor-dirichlet-sum-eq-euler-product]. Let each prime $p$ be a bosonic mode with single-particle energy $\ln p$. A Fock state assigns an occupation $a_p$ to each prime (only finitely many nonzero). It corresponds to the integer $n = \prod_p p^{a_p}$, and its total energy is $\sum_p a_p \ln p = \ln n$; unique prime factorization makes the correspondence one-to-one (manual derivation). Hence $\sum_n n^{-s} = \sum_{\text{states}} e^{-sE}$: $\zeta(s)$ is the partition function of this “prime gas” at inverse temperature $s$, and the Euler product is the product of the geometric series of the individual modes. By [@lem-riemann-zeta-residue-one], $\zeta(s)$ blows up like $1/(s - 1)$ as $s \to 1^{+}$: the partition function diverges as the temperature rises to $1$, and at higher temperatures ($s \le 1$) the series $\sum_n n^{-s}$ itself diverges (compare the harmonic series). This physical reading comes from the literature (B. Julia, 1990; D. Spector, 1990); the book makes no formal claim about it.

> Multiplication splits into primes, addition into parts; both times an infinite sum comes apart into many independent geometric series.
