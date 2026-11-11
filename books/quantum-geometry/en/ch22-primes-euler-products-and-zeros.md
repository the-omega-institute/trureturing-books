# Chapter 22 Primes as the Orthogonal Basis of Arithmetic: Euler Products and Riemann Zeros

> *"I keep feeling that the essence of the quantum is pairwise comparison: always consistent, independent of order."*

In [Chapter 21](ch21-diagonalization-and-escape.md) we saw that any formal shell attempting to seal all concepts within a fixed finite coordinate system is punctured along the relative semantic diagonal, launching an unending ascent through higher-dimensional spheres. Now let us turn our gaze toward the oldest infinite-dimensional edifice in human thought — **the multiplicative arithmetic of the positive integers** — and ask a direct geometric question:

When we speak of "pairwise comparison, always consistent, independent of order," which numbers inside the multiplicative monoid $\mathbb{N}_{\ge 1}$ actually serve as mutually independent **orthogonal basis axes**?

Along the additive number line, $1, 2, 3, 4, 5, 6, \dots$ look like uniformly spaced ticks on a single one-dimensional rod. Switch from addition to multiplication, however, and $6 = 2 \times 3$ is no longer an independent direction at all — it is the diagonal resultant of axis $2$ and axis $3$, while $12 = 2^2 \times 3$ takes two steps along axis $2$ and one step along axis $3$! By the Fundamental Theorem of Arithmetic (unique prime factorization), every positive integer $n \ge 1$ factors uniquely into prime powers, **always consistent and independent of the order in which the prime factors are multiplied**:

$$
n = \prod_{p \in \mathrm{Primes}} p^{v_p(n)} \quad\Longleftrightarrow\quad \ln n = \sum_{p \in \mathrm{Primes}} v_p(n)\,\ln p.
$$

Look at the geometric structure of that correspondence: unique prime factorization embeds every positive integer $n$ into the countably infinite **formal exponent lattice** $\bigoplus_{p \in \mathrm{Primes}} \mathbb{Z}\vv{e}_p$ spanned by formal basis vectors $\{\vv{e}_p\}_{p \in \mathrm{Primes}}$ (equipped with the formal inner product $\langle \vv{e}_p, \vv{e}_q\rangle = \delta_{pq}$, so that $v_p(n) \in \mathbb{N}$ is the nonnegative integer coordinate of $n$ along the $p$-th formal prime axis $\vv{e}_p$), while taking the natural logarithm defines a linear weight functional $\ln n = \sum_p v_p(n)\,\ln p$ whose weights $\ln 2, \ln 3, \ln 5, \dots$ are linearly independent over $\mathbb{Q}$ — no prime axis casts even the slightest rational divisibility shadow onto any other prime axis (throughout this chapter, our geometric language of "orthogonal prime axes" refers to this formal exponent-lattice basis paired with its $\mathbb{Q}$-linearly independent logarithmic weights).

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

## 22.3 The Polyhedral Prime Sieve Remainder and Phase-Oscillator Hand Calculation {#sec-ch22-3}

Write the complex exponent as $s = \sigma + it$, where the real part $\sigma = \operatorname{Re}(s)$ governs radial damping and the imaginary part $t = \operatorname{Im}(s)$ governs rotational frequency. Each prime mode in [@cor-dirichlet-sum-eq-euler-product] acts as an independent complex rotor:

$$
p^{-s} = p^{-\sigma - it} = p^{-\sigma} e^{-i t \ln p} = p^{-\sigma}\bigl(\cos(t\ln p) - i\sin(t\ln p)\bigr).
$$

In the complex plane, each prime $p$ acts as a **phase pointer (prime clock)** rotating uniformly at its intrinsic logarithmic angular frequency $\omega_p = \ln p$! Why distinct prime clocks have mutually incommensurable periods and how their joint phases evolve on a high-dimensional torus is recorded in the following literature note:

::: {.remark #rem-kronecker-prime-torus-literature title="Rational Linear Independence of Prime Logarithms and Kronecker's Dense Torus Flow (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** By the fundamental theorem of arithmetic (unique prime factorization), the natural logarithms $\ln 2, \ln 3, \ln 5, \dots$ of distinct primes are linearly independent over $\mathbb{Q}$, so their periods are mutually incommensurable; consequently, by the continuous-time torus-flow corollary of Kronecker's approximation theorem (L. Kronecker, 1884), for any finite set of $K$ primes $\{p_1, \dots, p_K\}$ the joint phase trajectory $(t\ln p_1 \bmod 2\pi,\, \dots,\, t\ln p_K \bmod 2\pi)$ as $t \in \mathbb{R}$ varies winds densely across the $K$-torus $\mathbb{T}^K = (\mathbb{R}/2\pi\mathbb{Z})^K$. Both the $\mathbb{Q}$-linear independence of prime logarithms and Kronecker's dense torus-flow theorem belong to the classical number-theory and ergodic-theory literature outside the `trureturing@dev` declarations locked in this book.
:::

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

> Composite numbers are the diagonal lattice points of the prime basis; Euler's product simply projects an entangled sum along the natural-number line onto its mutually orthogonal prime axes.

## 22.4 The Critical Symmetry Line $\sigma = 1/2$ and the Epistemic Boundary of the Riemann Hypothesis {#sec-ch22-4}

As recorded in the literature notes [@rem-zeta-zero-free-region-literature] and [@rem-euler-zeta-literature] below, in classical analytic number theory $\zeta(s)$ has no zeros inside the half-plane $\operatorname{Re}(s) > 1$ of absolute Euler-product convergence, whereas once $\zeta(s)$ is analytically continued leftward across the simple pole at $s = 1$ (whose residue theorem is frozen in [@lem-riemann-zeta-residue-one] above) into the **critical strip** $0 < \operatorname{Re}(s) < 1$, the Dirichlet series and Euler product no longer converge absolutely and interference among the prime phase pointers $p^{-\sigma} e^{-it\ln p}$ produces nontrivial zeros $\zeta(\rho) = 0$ at specific complex frequencies $\rho = \sigma + it$.

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

Claim 3 of [@thm-xi-reading-entire-reflection] has an immediate consequence (a one-line manual derivation): if $\operatorname{xiReading}\ \rho = 0$ then $\operatorname{xiReading}\ (1 - \rho) = 0$. The map $s \mapsto 1 - s$ is the half-turn of the complex plane about the point $s = \frac{1}{2}$, so zeros come in pairs with respect to that point. Adding the conjugation symmetry $\xi(\overline{s}) = \overline{\xi(s)}$ (see [@prop-zeta-conjugation-covariance] below), zeros come in groups of four, $\rho,\ \overline{\rho},\ 1 - \rho,\ 1 - \overline{\rho}$; the four points coincide in pairs and shrink to a single pair exactly when $\operatorname{Re}(\rho) = \frac{1}{2}$. The Riemann hypothesis says precisely that every group has shrunk to a pair.

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

Claim 2 of [@thm-cayley-critical-line-criterion] is an **equivalent restatement of the Riemann Hypothesis, not a proof of it**: it trades "the zeros lie on a line" for "the zeros lie on a circle", and the conjecture stays open. How Mathlib's `RiemannHypothesis` predicate aligns with the critical-strip phrasing of [@conj-riemann-hypothesis] is recorded separately below ([@rem-zeta-zero-free-region-literature]).

::: {.remark #rem-zeta-zero-free-region-literature title="Zero-Free Half-Plane Re(s) ≥ 1 and Trivial Zeros of ζ (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Mathlib singles out the nontrivial zeros as "zeros that are neither of the form $-2(n+1)$ nor equal to $1$", whereas [@conj-riemann-hypothesis] singles them out as "zeros in the critical strip $0 < \operatorname{Re}(s) < 1$". That the two descriptions coincide rests on the classical theorem of analytic number theory that $\zeta(s)$ has no zeros with $\operatorname{Re}(s) \ge 1$ (Hadamard and de la Vallée Poussin, 1896) and has only the negative even integers $s = -2(n+1)$ ($n \in \mathbb{N}$) as zeros in $\operatorname{Re}(s) \le 0$.
:::

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

1. **Kernel-verified frozen theorems in this book (`LEAN ✓`)**: The eight formal blocks of this chapter — the unit residue at $s = 1$ ([@lem-riemann-zeta-residue-one]), the Dirichlet series identity on $\operatorname{Re}(s) > 1$ ([@prop-riemann-zeta-dirichlet-sum]), the Euler prime product identity on $\operatorname{Re}(s) > 1$ ([@thm-riemann-zeta-euler-product]), their direct equality on $\operatorname{Re}(s) > 1$ ([@cor-dirichlet-sum-eq-euler-product]), the entirety, reflection symmetry $\xi(1 - s) = \xi(s)$ and endpoint values of the xi reading ([@thm-xi-reading-entire-reflection]), the conjugation covariance of $\zeta$ and $\xi$ ([@prop-zeta-conjugation-covariance]), the Cayley unit-circle criterion with the radial equivalent of the Riemann Hypothesis ([@thm-cayley-critical-line-criterion]), and the quartic counterexample showing that full symmetry does not imply fixed-line localization ([@thm-full-symmetry-not-localization]) — are fully verified by the Lean kernel. Note that the Euler product is invoked solely inside the absolute-convergence half-plane `1 < s.re` ($\operatorname{Re}(s) > 1$) supplied by the Lean hypotheses.
2. **Classical theorems of analytic number theory (proved in the literature, not formalized in this book)**:
   - **Analytic continuation and trivial zeros (Riemann, 1859)**: $\zeta(s)$ extends meromorphically to $\mathbb{C}$ with a single simple pole at $s = 1$, has trivial zeros at $s = -2, -4, -6, \dots$, and has no other zeros outside the critical strip $0 < \operatorname{Re}(s) < 1$. (That the completed function $\xi$ is entire and satisfies $\xi(s) = \xi(1 - s)$ and $\xi(\overline{s}) = \overline{\xi(s)}$ no longer belongs to this layer: these are given by [@thm-xi-reading-entire-reflection] and [@prop-zeta-conjugation-covariance] through Mathlib's completed zeta.)
   - **Nonvanishing on the line $\operatorname{Re}(s) = 1$ and the Prime Number Theorem (Hadamard, de la Vallée Poussin, 1896)**: $\zeta(1 + it) \neq 0$ for all nonzero real $t \in \mathbb{R} \setminus \{0\}$ (while $t = 0$, i.e. $s = 1$, is the simple pole), implying the Prime Number Theorem $\pi(x) \sim \frac{x}{\ln x}$;
   - **Explicit formulas (von Mangoldt, Weil)**: Fourier duality pairing prime-power logarithmic weights $\Lambda(n)$ with the spectral sum over nontrivial zeros $\rho$.
3. **Open conjecture (`OPEN`)**: [@conj-riemann-hypothesis] asserts that all nontrivial zeros lie on $\operatorname{Re}(\rho) = 1/2$ (equivalently $\pi(x) = \operatorname{Li}(x) + O(x^{1/2}\ln x)$). The frozen theorems of this chapter certify the residue, the sum–product identity on $\operatorname{Re}(s) > 1$, and the reflection symmetry of $\xi$; they **do not certify the Riemann Hypothesis**: reflection symmetry only says that zeros come in pairs about $s = \frac{1}{2}$, not that they lie on the critical line; [@thm-cayley-critical-line-criterion] merely restates the conjecture equivalently on the unit circle; and [@thm-full-symmetry-not-localization] shows that the reflection and conjugation symmetries alone cannot imply it.
:::

From the concept fibers of [Chapter 21](ch21-diagonalization-and-escape.md) to the prime orthogonal axes of this chapter, we have seen the rigid crystal structure of the integers $\mathbb{Z}$. What happens, however, when $\mathbb{Z}$ is submerged inside the dense continuum of the rational field $\mathbb{Q}$, where infinitely many fractions crowd between any two integers? Can first-order polynomial equations over $\mathbb{Q}$ still isolate the discrete integer skeleton $\mathbb{Z} \subset \mathbb{Q}$ — and why does the modern lock that achieves this rely on **quaternion norm spheres** and quadratic trace projections? Let us turn to [Chapter 23](ch23-diophantine-definability.md).
