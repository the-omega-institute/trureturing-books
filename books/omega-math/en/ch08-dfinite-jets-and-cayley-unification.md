# Chapter 8 Arbitrary-Order D-Finite Jets and Rational Machin Brackets

[Chapter 7](ch07-second-order-jet-calculus.md) showed that inside the second-order nilpotent jet ring $\mathcal{J}_2(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^3)$, the base state, connection derivative, and curvature of any rational function can be extracted exactly by finite rational arithmetic with no $\epsilon\text{-}\delta$ limits. Yet mathematics and physics abound with classical "transcendental functions"—exponential, sine, cosine, and arctangent—which textbooks routinely invoke to argue that the real continuum $\mathbb{R}$, infinite series, and constants such as $\pi$ and $e$ are indispensable.

This chapter overturns that assumption. Following R. P. Stanley's algebraic framework for differentiably finite (D-finite) power series (1980), we generalize second-order jets to the arbitrary-order rational jet ring $J_N(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^{N+1})$ and the unified rational coefficient stream `JetSeq`. At every truncation order $N \in \mathbb{N}$, the exponential, sine, cosine, and arctangent jets constructed at the origin are finite rational polynomials determined by their initial data and linear differential recurrences. Their universal Leibniz rule, exponential addition and inversion laws, Pythagorean identity, and arctangent ODE are all kernel-verified with zero axioms. Inside `OmegaInit` and `OmegaMath`, we further certify the **unit norm and coupled ODE uniqueness of the rational Cayley circle**, the **universal formal composition chain rule**, and **Cayley–trigonometry algebraic unification** at every truncation order $N \in \mathbb{N}$, together with a **purely rational Machin tangent chain** that pairs with $\pi$-free alternating brackets shrinking below $1.57 \times 10^{-25}$ without ever postulating $\pi$.

## 8.1 Arbitrary-Order D-Finite Jet Rings and Fundamental Algebraic Laws {#sec-ch08-dfinite-jet-ring}

To keep a jet rational, we need rational data from the equation and from the initial conditions at the chosen center. Suppose $f$ satisfies the order-$m$ linear equation $\sum_{j=0}^m p_j(x)f^{(j)}(x)=0$ with $p_j\in\mathbb{Q}[x]$. At a rational ordinary point $a$, meaning $p_m(a)\ne0$, all Taylor coefficients are rational if and only if $f(a),f'(a),\ldots,f^{(m-1)}(a)$ are rational. The recurrence follows by hand. Differentiate the equation $n$ times and solve at $a$ for the highest-order term $p_m(a)f^{(m+n)}(a)$. The remaining terms involve only lower derivatives of $f$, rational derivatives of the polynomials, and integer binomial coefficients. Dividing the resulting derivatives by $k!$ gives the rational Taylor coefficients $f^{(k)}(a)/k!$, ready to package in the truncated polynomial quotient.

Changing to another rational center can take the initial values outside $\mathbb{Q}$. For example, $f(x)=\sqrt{1+x}$ satisfies $2(1+x)f'(x)=f(x)$ and has $f(0)=1$ at the ordinary point $0$. At the ordinary point $1$, however, $f(1)=\sqrt{2}$ and $f'(1)=\sqrt{2}/4$. The frozen laws below concern formal coefficient streams and the specified initial conditions.

::: {.definition #def-ch08-dfinite-jets title="Arbitrary-order D-finite rational jet ring and canonical generators"}
For every natural number $N \in \mathbb{N}$, define the **order-$N$ rational differential jet ring** as the truncated quotient ring

$$
J_N(\mathbb{Q}) \;:=\; \mathbb{Q}[\eta]/(\eta^{N+1}) \;=\; \left\{\,\sum_{k=0}^{N} c_k \eta^k \;\middle|\; c_k \in \mathbb{Q}\,\right\}, \qquad \eta^{N+1} \equiv 0.
$$

Define the formal algebraic derivative $D : J_N(\mathbb{Q}) \to J_{N-1}(\mathbb{Q})$ (also written $f \mapsto f'$) by $D\!\left(\sum_{k=0}^N c_k \eta^k\right) := \sum_{k=1}^N k c_k \eta^{k-1}$ (and the zero map for $N = 0$). In zero-axiom `OmegaMath`, all truncation orders are unified as rational coefficient streams `JetSeq := ℕ → IntRatio`: full equivalence `Equivalent` asserts $f_k \equiv g_k$ for all $k \in \mathbb{N}$, while degree-$N$ equivalence `EquivalentAt N` asserts $f_k \equiv g_k$ for all $k \le N$ (congruence in $J_N(\mathbb{Q})$); multiplication is the Cauchy product $(f \cdot g)_k = \sum_{i=0}^k f_i g_{k-i}$, and formal differentiation is $(Df)_k = (k+1) f_{k+1}$. The four canonical D-finite rational jet generators are specified coefficientwise by

$$
\begin{aligned}
\mathrm{Exp}(a)_n &= \frac{a^n}{n!}, &
\mathrm{Cos}_{2k} &= \frac{(-1)^k}{(2k)!},\quad \mathrm{Cos}_{2k+1} = 0, \\
\mathrm{Sin}_{2k+1} &= \frac{(-1)^k}{(2k+1)!},\quad \mathrm{Sin}_{2k} = 0, &
\mathrm{Atan}_{2k+1} &= \frac{(-1)^k}{2k+1},\quad \mathrm{Atan}_{2k} = 0,
\end{aligned}
$$

whose truncations to $k \le N$ give the finite polynomials $\mathrm{Exp}_N(a\eta)$, $\mathrm{Cos}_N(\eta)$, $\mathrm{Sin}_N(\eta)$, and $\mathrm{Atan}_N(\eta)$ in $J_N(\mathbb{Q})$.
:::

Without invoking radii of convergence or analytic continuation, all core calculus identities on these rational coefficient streams—the Leibniz rule through every truncation degree $N$, exponential and trigonometric differential equations, exponential addition and inversion, the Pythagorean identity, and the arctangent ODE—are frozen with zero axioms in `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch08-dfinite-calculus-laws title="Universal calculus laws for arbitrary-order D-finite rational jets" lean="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_mul_equivAt D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_exp D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_cos D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_sin D5/S3/Quantum/AURICOmega/OmegaJetCalculus.exp_add D5/S3/Quantum/AURICOmega/OmegaJetCalculus.exp_inverse D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cos_sq_add_sin_sq D5/S3/Quantum/AURICOmega/OmegaJetCalculus.atan_ode"}
On the zero-axiom rational stream carrier `Omega.JetSeq` (writing `oneAddEtaSq` for $1 + \eta^2$), the following identities hold with empty axiom closure:

1. **Universal algebraic Leibniz rule at every degree $N$** ([`deriv_mul_equivAt`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_mul_equivAt)): for every $N \in \mathbb{N}$ and all $f, g \in \mathrm{JetSeq}$, coefficients agree through degree $N$ inclusive:

   $$
   D(f \cdot g) \;\equiv_N\; (Df)\cdot g + f \cdot (Dg).
   $$

2. **Exponential and trigonometric differential equations** ([`deriv_exp`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_exp), [`deriv_cos`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_cos), [`deriv_sin`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.deriv_sin)): for every $a \in \mathrm{IntRatio}$, at every degree,

   $$
   D\bigl(\mathrm{Exp}(a)\bigr) \;\equiv\; a \cdot \mathrm{Exp}(a), \qquad D(\mathrm{Cos}) \;\equiv\; -\mathrm{Sin}, \qquad D(\mathrm{Sin}) \;\equiv\; \mathrm{Cos}.
   $$

3. **Exponential addition and finite-parameter inversion** ([`exp_add`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.exp_add), [`exp_inverse`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.exp_inverse)): for all $a, b \in \mathrm{IntRatio}$, $\mathrm{Exp}(a)\cdot\mathrm{Exp}(b) \equiv \mathrm{Exp}(a + b)$; in particular, for every finite parameter $a$ ($a.\mathrm{Finite}$),

   $$
   \mathrm{Exp}(a)\cdot\mathrm{Exp}(-a) \;\equiv\; 1.
   $$

4. **Exact algebraic Pythagorean identity** ([`cos_sq_add_sin_sq`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cos_sq_add_sin_sq)): at every degree,

   $$
   \mathrm{Cos}\cdot\mathrm{Cos} + \mathrm{Sin}\cdot\mathrm{Sin} \;\equiv\; 1.
   $$

5. **Arctangent rational ODE** ([`atan_ode`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.atan_ode)): at every degree,

   $$
   (1 + \eta^2)\cdot D(\mathrm{Atan}) \;\equiv\; 1.
   $$
:::

::: {.proof}
The Leibniz rule splits the degree-$k$ coefficient $(k+1)\sum_{i=0}^{k+1} f_i g_{k+1-i} = \sum_{i=1}^{k+1} i f_i g_{k+1-i} + \sum_{i=0}^k f_i (k+1-i) g_{k+1-i}$ and reindexes the first sum for every $k \le N$. The exponential and trigonometric derivative identities follow directly from $(k+1)/(k+1)! = 1/k!$ and the four-step rotation of powers of $i$. Exponential addition reduces at each degree $m$ by the binomial sum $\sum_{j=0}^m \frac{a^j}{j!}\frac{b^{m-j}}{(m-j)!} = \frac{(a+b)^m}{m!}$; when $a$ is finite, $a + (-a) \equiv 0$ and $\mathrm{Exp}(0) \equiv 1$ yield multiplicative inversion. Applying the Leibniz rule and trigonometric derivatives to $\mathrm{Cos}^2 + \mathrm{Sin}^2$ annihilates every derivative coefficient; combining constant term $1^2 + 0^2 = 1$ with characteristic-zero rigidity ($(k+1)c_{k+1} = 0 \implies c_{k+1} = 0$) locks every higher coefficient to zero. Multiplying the alternating even stream $D(\mathrm{Atan})$ by $1 + \eta^2$ telescopes every positive degree to zero. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch08-stanley-dfinite title="Literature context for D-finite power series"}
**Literature result, not formalized in this book.** The systematic algebraic theory of D-finite (holonomic) formal power series—characterized by linear differential equations with polynomial coefficients and closed under addition, multiplication, Hadamard products, and algebraic substitution—was formulated by R. P. Stanley (*Differentiably finite power series*, *European J. Combin.* **1**(2), 175–188, 1980). Restricting this machinery to the finite rational quotient rings $J_N(\mathbb{Q})$ eliminates real convergence domains and transcendental evaluations altogether.
:::

## 8.2 Cayley–Trigonometry Algebraic Unification and the $\eta = 1/2$ Audit {#sec-ch08-cayley-trig-unification}

Conventional pedagogy treats $(\cos\theta, \sin\theta)$ as inhabitants of transcendental analysis while relegating the rational Cayley circle map $t \mapsto \bigl(\frac{1-t^2}{1+t^2}, \frac{2t}{1+t^2}\bigr)$ to an algebraic curiosity. Inside $J_N(\mathbb{Q})$, the two are algebraically identical at every finite order $N$. On the zero-axiom homogeneous projective circle, unit-norm closure of the rational Cayley map is already kernel-verified without any axioms:

::: {.theorem #thm-ch08-cayley-circle-unit title="Unit norm of the homogeneous rational Cayley circle" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit"}
Let $p, q \in \mathbb{Z}$ be signed integers satisfying `Nonzero p q` (that is, $p \neq 0 \lor q \neq 0$). Writing $\operatorname{normSq}(p, q) = p^2 + q^2$ and defining the rational Cayley coordinates in `IntRatio` by

$$
\operatorname{cayleyX}(p, q) = \frac{q^2 - p^2}{p^2 + q^2}, \qquad \operatorname{cayleyY}(p, q) = \frac{2pq}{p^2 + q^2},
$$

the sum of their squares is equivalent to unity under `IntRatio.Equivalent`:

$$
\operatorname{cayleyX}(p, q)^2 + \operatorname{cayleyY}(p, q)^2 \;\sim\; 1.
$$
:::

::: {.proof}
In pure integer arithmetic, $(q^2 - p^2)^2 + (2pq)^2 = q^4 - 2p^2 q^2 + p^4 + 4p^2 q^2 = (p^2 + q^2)^2$. The hypothesis `Nonzero p q` guarantees that the denominator $p^2 + q^2$ is strictly positive, so the numerator of the summed squared ratio equals the squared denominator and cross-multiplication establishes equivalence with $1/1$ with zero external axioms. The full proof is checked by the Lean kernel.
:::

We now unite this zero-axiom Cayley circle with the D-finite trigonometric jets inside $J_N(\mathbb{Q})$. Because $1 + \eta^2$ has constant term $1 \neq 0$, its formal inverse in `Omega.JetSeq` defines the two integer-coefficient streams `CayleyCos` and `CayleySin` (written $U, V$):

$$
U(\eta) \;:=\; \frac{1 - \eta^2}{1 + \eta^2} \;\equiv\; 1 + 2\sum_{k \ge 1} (-1)^k \eta^{2k}, \qquad
V(\eta) \;:=\; \frac{2\eta}{1 + \eta^2} \;\equiv\; 2\sum_{k \ge 0} (-1)^k \eta^{2k+1}.
$$

Both their coupled differential equations and their initial-value uniqueness through every truncation degree $N$ are frozen with zero axioms in `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch08-cayley-ode-uniqueness title="Coupled differential equations and arbitrary-order uniqueness of rational Cayley jets" lean="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_cos_ode D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_sin_ode D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_unique_at"}
In `Omega.JetSeq`, let `CayleyCos` denote $1 + 2\sum_{k \ge 1}(-1)^k \eta^{2k}$ and `CayleySin` denote $2\sum_{k \ge 0}(-1)^k \eta^{2k+1}$. The following zero-axiom statements hold:

1. **Coupled rational Cayley ODE system** ([`cayley_cos_ode`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_cos_ode), [`cayley_sin_ode`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_sin_ode)): at every degree,

   $$
   (1 + \eta^2)\cdot D(\mathrm{CayleyCos}) \;\equiv\; (-2)\cdot\mathrm{CayleySin}, \qquad
   (1 + \eta^2)\cdot D(\mathrm{CayleySin}) \;\equiv\; 2\cdot\mathrm{CayleyCos}.
   $$

2. **Arbitrary-order ODE uniqueness** ([`cayley_unique_at`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.cayley_unique_at)): for every truncation degree $N \in \mathbb{N}$ and any pair of streams $f, g \in \mathrm{JetSeq}$ satisfying initial values $f_0 \equiv 1$ and $g_0 \equiv 0$, together with the coupled equations for all $k < N$,

   $$
   \bigl((1 + \eta^2)\cdot Df\bigr)_k \;\equiv\; (-2 g)_k, \qquad
   \bigl((1 + \eta^2)\cdot Dg\bigr)_k \;\equiv\; (2 f)_k,
   $$

   every coefficient through degree $N$ inclusive is forced to match $(\mathrm{CayleyCos}, \mathrm{CayleySin})$:

   $$
   f \;\equiv_N\; \mathrm{CayleyCos} \quad \land \quad g \;\equiv_N\; \mathrm{CayleySin}.
   $$
:::

::: {.proof}
The coupled ODEs are checked directly at each degree by alternating-sign cancellation when multiplying `D(CayleyCos)` and `D(CayleySin)` by $1 + \eta^2$. For uniqueness, strong induction on degree $k$ starts from $f_0 \equiv 1 = \mathrm{CayleyCos}_0$ and $g_0 \equiv 0 = \mathrm{CayleySin}_0$. Assuming agreement through degree $k$ ($k < N$), equating degree-$k$ coefficients gives $(k+1) f_{k+1} + (k-1) f_{k-1} \equiv -2 g_k$ and $(k+1) g_{k+1} + (k-1) g_{k-1} \equiv 2 f_k$ (with the $k-1$ term absent at $k = 0$). Since the lower-degree terms match `CayleyCos` and `CayleySin` and $k + 1 \ge 1$ is invertible in $\mathbb{Q}$, we obtain $f_{k+1} \equiv \mathrm{CayleyCos}_{k+1}$ and $g_{k+1} \equiv \mathrm{CayleySin}_{k+1}$, closing the induction at $N$. The full proof is checked by the Lean kernel.
:::

We now place formal series composition and the universal formal chain rule in D5 on the strict backend (`strict_omega.axioms: []`): for any coefficientwise finite streams $f, g \in \mathrm{JetSeq}$ (every coefficient satisfying `IntRatio.Finite`) with vanishing inner constant term ($g_0 \equiv 0$), defining $(\mathrm{compose}\;f\;g)_n := \bigl(\sum_{k=0}^{n} f_k \cdot g^k\bigr)_n$ locks in both the universal formal chain rule and **Cayley–trigonometry algebraic unification** at every truncation degree $N \in \mathbb{N}$:

::: {.theorem #thm-ch08-cayley-composition-unification title="Formal chain rule and arbitrary-order Cayley–trigonometry unification" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.deriv_compose_equivAt D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.cos_two_atan_eq_cayley D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.sin_two_atan_eq_cayley"}
On the rational coefficient stream carrier `Omega.JetSeq` used by the cited D5 results (`strict_omega.axioms: []`), write $g^k := \mathrm{power}\;g\;k$ for the $k$-th Cauchy power and $(\mathrm{compose}\;f\;g)_n := \bigl(\sum_{k=0}^{n} f_k \cdot g^k\bigr)_n$ for formal series composition. The following three zero-axiom identities hold for **every truncation degree $N \in \mathbb{N}$**:

1. **Universal formal chain rule at every degree $N$** ([`deriv_compose_equivAt`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.deriv_compose_equivAt)): for every $N \in \mathbb{N}$ and all coefficientwise finite streams $f, g \in \mathrm{JetSeq}$ (`Finite f`, `Finite g`) satisfying $g_0 \equiv 0$, coefficients agree through degree $N$ inclusive:

   $$
   D(\mathrm{compose}\;f\;g) \;\equiv_N\; \bigl(\mathrm{compose}\;(Df)\;g\bigr) \cdot Dg.
   $$

2. **Cayley–cosine algebraic unification** ([`cos_two_atan_eq_cayley`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.cos_two_atan_eq_cayley)): for every $N \in \mathbb{N}$, through degree $N$ inclusive,

   $$
   \mathrm{compose}\;\mathrm{Cos}\;(2\,\mathrm{Atan}) \;\equiv_N\; \mathrm{CayleyCos}.
   $$

3. **Cayley–sine algebraic unification** ([`sin_two_atan_eq_cayley`](lean:D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.sin_two_atan_eq_cayley)): for every $N \in \mathbb{N}$, through degree $N$ inclusive,

   $$
   \mathrm{compose}\;\mathrm{Sin}\;(2\,\mathrm{Atan}) \;\equiv_N\; \mathrm{CayleySin}.
   $$
:::

::: {.proof}
For the formal chain rule, because $g$ is coefficientwise finite with $g_0 \equiv 0$, induction on $k$ proves that every coefficient of $g^k$ below degree $k$ vanishes ($n < k \implies (g^k)_n \equiv 0$). Consequently, the finite partial substitution $\mathrm{partialCompose}\;f\;g\;m = \sum_{k=0}^{m-1} f_k \cdot g^k$ stabilizes at degree $n$ to $(\mathrm{compose}\;f\;g)_n$ for every cutoff $m > n$. Meanwhile, induction on $k$ via the Leibniz rule ([@thm-ch08-dfinite-calculus-laws]) yields the power derivative law $D(g^{k+1}) \equiv (k+1)\,g^k \cdot Dg$, and summing termwise gives $D(\mathrm{partialCompose}\;f\;g\;(m+1)) \equiv \mathrm{partialCompose}\;(Df)\;g\;m \cdot Dg$. Evaluating at any degree $n \le N$ and invoking cutoff stabilization establishes $(D(\mathrm{compose}\;f\;g))_n \equiv \bigl(\mathrm{compose}\;(Df)\;g \cdot Dg\bigr)_n$ for all $n \le N$.

For Cayley–trigonometry unification, set $g := 2\,\mathrm{Atan}$. Then $g$ is coefficientwise finite with $g_0 \equiv 0$, and scaling the arctangent ODE of [@thm-ch08-dfinite-calculus-laws] by $2$ gives $(1 + \eta^2)\cdot Dg \equiv 2$. Applying the chain rule to any coefficientwise finite outer stream $f$ and multiplying by $1 + \eta^2$ yields $(1 + \eta^2)\cdot D(\mathrm{compose}\;f\;g) \equiv 2\cdot\mathrm{compose}\;(Df)\;g$. Instantiating $f = \mathrm{Cos}$ and $f = \mathrm{Sin}$ with $D(\mathrm{Cos}) \equiv -\mathrm{Sin}$, $D(\mathrm{Sin}) \equiv \mathrm{Cos}$, and constant terms $(\mathrm{compose}\;\mathrm{Cos}\;g)_0 \equiv 1$ and $(\mathrm{compose}\;\mathrm{Sin}\;g)_0 \equiv 0$ verifies every initial-value and coupled-ODE hypothesis of [@thm-ch08-cayley-ode-uniqueness]; invoking `cayley_unique_at` immediately proves both identities for all $N \in \mathbb{N}$. The full proof is checked by the Lean kernel.
:::

Written in $J_N(\mathbb{Q})$ as $\mathrm{Cos}_N\bigl(2\,\mathrm{Atan}_N(\eta)\bigr) \equiv \frac{1 - \eta^2}{1 + \eta^2} \pmod{\eta^{N+1}}$ and $\mathrm{Sin}_N\bigl(2\,\mathrm{Atan}_N(\eta)\bigr) \equiv \frac{2\eta}{1 + \eta^2} \pmod{\eta^{N+1}}$, this zero-axiom identity inverts the classical hierarchy: **rather than the Cayley map approximating transcendental trigonometry, infinite trigonometric series merely re-expand what was already a single closed-form rational Cayley quotient.** The following examples quantify the coordinate error after evaluation.

::: {.example #ex-ch08-cayley-first-product-tolerance title="Minimum coordinate error for two Cayley steps"}
At $t=2/5$, the exact Cayley step is $P=(21+20i)/29$. Use the largest coordinate error of its cubic truncation, $32/725$, as the tolerance on each factor. Choose two rational complex factors whose coordinates meet that tolerance and whose least common clearing denominators are each at most $28$.

For the product target $P^2=(41+840i)/841$, the least possible maximum coordinate error is $1/841$. The unique unordered pair attaining it is $z=(5+5i)/7$ and $w=(11+10i)/15$. Their product is $1/21+i$, with signed coordinate errors $(-20/17661,1/841)$ and squared-norm defect $\bigl\lvert\lvert zw\rvert^2-1\bigr\rvert=1/441$.

The endpoint follows by an integer calculation. Write each factor as $(a+bi)/d$ with $1\le d\le28$, $\gcd(a,b,d)=1$, $493d\le725a\le557d$, and $468d\le725b\le532d$. Write the product over the denominator $D=df$ as $(X+Yi)/D$. An imaginary error at most $1/841$ requires $0\le D-Y\le2D/841<2$ since $D\le784$. Of the unordered pairs formed from the 51 factors, 29 have $D-Y=0$, and 15 have $D-Y=1$ with $2D\ge841$. Only the displayed pair also meets the real condition $\lvert841X-41D\rvert\le D$. Its imaginary error equals $1/841$, which rules out every smaller tolerance. [Exact arithmetic replay](https://github.com/the-omega-institute/trureturing-books/issues/1964#issuecomment-7243255979)
:::

::: {.example #ex-ch08-cayley-half-truncation title="Truncation error table at $\eta = 1/2$ mapping to $(3/5, 4/5)$"}
At $\eta = \frac{1}{2}$, the untruncated zero-axiom rational Cayley map ([@thm-ch08-cayley-circle-unit], $p = 1, q = 2$) lands directly on the exact Pythagorean rational point $\bigl(\frac{3}{5}, \frac{4}{5}\bigr)$ with zero error. Evaluating instead the canonical degree-$\le N$ polynomial representatives $U_N(\eta)$ and $V_N(\eta)$ of the $J_N(\mathbb{Q})$ congruence at the nonzero point $\eta = \frac{1}{2}$ (evaluation at a nonzero point does not factor through the quotient ideal) produces alternating geometric rational errors across $N = 2, 4, 6, 8, 12$ (manual derivation):

| Truncation order $N$ | Canonical polynomial $U_N(\frac{1}{2})$ | Exact cosine error $U_N(\frac{1}{2}) - \frac{3}{5}$ | Canonical polynomial $V_N(\frac{1}{2})$ | Exact sine error $V_N(\frac{1}{2}) - \frac{4}{5}$ |
| :---: | :---: | :---: | :---: | :---: |
| $2$ | $1/2$ | $-1/10$ | $1$ | $+1/5$ |
| $4$ | $5/8$ | $+1/40$ | $3/4$ | $-1/20$ |
| $6$ | $19/32$ | $-1/160$ | $13/16$ | $+1/80$ |
| $8$ | $77/128$ | $+1/640$ | $51/64$ | $-1/320$ |
| $12$ | $1229/2048$ | $+1/10240$ | $819/1024$ | $-1/5120$ |

Increasing $N$ by $2$ multiplies each truncation error by $-\frac{1}{4}$. If one instead nests the truncated polynomials directly without re-truncating modulo $\eta^{N+1}$, $\bigl(\mathrm{Cos}_N(2\,\mathrm{Atan}_N(\frac{1}{2})),\; \mathrm{Sin}_N(2\,\mathrm{Atan}_N(\frac{1}{2}))\bigr)$ at $N = 12$ still carries signed errors $+1.235579 \times 10^{-5}$ and $-9.267049 \times 10^{-6}$, whereas the native rational Cayley ratio hits $(\frac{3}{5}, \frac{4}{5})$ exactly in one step.
:::

This exact link between rational formal power series and classical real analysis also governs the transcendental self-referential fixed point $\cos\theta = \theta$ (the Dottie number $\theta^* \approx 0.739085$). In the classical analytic shadow layer, a frozen Lean theorem certifies that even this transcendental fixed point arises from evaluating the purely rational formal compositional inverse of a rational power series in $\mathbb{Q}[[X]]$ at $\pi$:

::: {.theorem #thm-ch08-dottie-rational-inverse-endpoint title="Rational formal inverse series endpoint convergence to the cosine fixed point" lean="D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint"}
In the ring of rational formal power series $\mathbb{Q}[[X]]$, define the odd arcsine series $\mathrm{arcsine} = \sum_{n=0}^{\infty} \alpha_n X^n$ with $\alpha_{2k} = 0$ and $\alpha_{2k+1} = \binom{2k}{k} / \bigl(4^k (2k+1)\bigr)$, put $\mathrm{forward} := 2X + 2\,\mathrm{arcsine} \in \mathbb{Q}[[X]]$, and let $\mathrm{inverse} \in \mathbb{Q}[[X]]$ be its formal compositional inverse ($\mathrm{forward}(\mathrm{inverse}(X)) = X$). Then there exists a unique positive real number $\theta \in (0, 1)$ satisfying $\cos\theta = \theta$ (every $t > 0$ with $\cos t = t$ equals $\theta$), and the rational-coefficient series converges absolutely at $\pi$ to $\theta$:

$$
\sum_{n=0}^{\infty} \bigl\lvert(\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\bigr\rvert\,\pi^n < \infty, \qquad \sum_{n=0}^{\infty} (\operatorname{coeff}_n(\mathrm{inverse}) : \mathbb{R})\,\pi^n = \theta.
$$
:::

::: {.proof}
Inverting $z \mapsto z + \sin z$ on the complex disk $\lvert w\rvert < \frac{7}{4}$ via the contracting iteration $z \mapsto (w + z - \sin z)/2$ yields an analytic function $y \mapsto \sin(\mathrm{selectedInverse}(y/2))$ on the closed disk $\lvert y\rvert \le \frac{13}{4}$ that takes real values on the real axis. Uniqueness of the formal compositional inverse identifies its Taylor coefficients with the rational coefficients of $\mathrm{inverse}$. Since $\pi < \frac{13}{4}$ lies strictly inside the disk of convergence, evaluating at $y = \pi$ gives absolute summability and proves $\cos\theta = \theta$ together with uniqueness on $(0, \infty)$. The full proof is checked by the Lean kernel.
:::

Notice the sharp epistemological distinction between [@thm-ch08-cayley-circle-unit] and [@thm-ch08-dottie-rational-inverse-endpoint]. The former lives inside the zero-axiom `OmegaMath` kernel without ever mentioning $\pi$ or $\mathbb{R}$. The latter bridges into the classical analytic shadow layer: it reveals that the rational coefficient DNA of $\theta^*$ already resides in $\mathbb{Q}[[X]]$, while inside native rational fidelity coordinates $\kappa \in [0, 1]$, the self-dual midpoint anchor simplifies immediately to the linear rational equation $\kappa = 1 - \kappa \iff \kappa^* = \frac{1}{2}$.

## 8.3 Purely Rational Machin Tangent Chain and $\pi$-Free Alternating Brackets {#sec-ch08-machin-brackets}

What if an external comparison or classical benchmark demands rational approximations to the radian constant $\pi$ at an arbitrary observer precision $\varepsilon_{\mathrm{self}}$? One still never needs to postulate a completed transcendental real number $\pi$. Rewriting homogeneous circle multiplication from [Chapter 2](ch02-homogeneous-projective-line.md) in affine tangent coordinates turns Machin's classical formula into a four-step finite rational chain and a strictly nested $\pi$-free rational bracket.

::: {.definition #def-ch08-rational-tangent-law title="Rational tangent addition law and $\pi$-free Machin alternating brackets"}
For rational numbers $u, v \in \mathbb{Q}$ satisfying $uv \neq 1$ and $uv \neq -1$ respectively, define **rational tangent addition** and **subtraction**:

$$
u \oplus v \;:=\; \frac{u + v}{1 - uv}, \qquad u \ominus v \;:=\; \frac{u - v}{1 + uv}.
$$

For $x \in (0, 1) \cap \mathbb{Q}$ and $M \in \mathbb{Z}_{\ge 1}$, denote the $M$-term alternating partial sum by $A_M(x) := \sum_{k=0}^{M-1} \frac{(-1)^k x^{2k+1}}{2k+1} \in \mathbb{Q}$. Define the purely rational lower and upper endpoints

$$
\begin{aligned}
L_M &:= 16 \min\!\bigl(A_M(\tfrac{1}{5}),\; A_{M+1}(\tfrac{1}{5})\bigr) - 4 \max\!\bigl(A_M(\tfrac{1}{239}),\; A_{M+1}(\tfrac{1}{239})\bigr) \;\in\; \mathbb{Q}, \\
U_M &:= 16 \max\!\bigl(A_M(\tfrac{1}{5}),\; A_{M+1}(\tfrac{1}{5})\bigr) - 4 \min\!\bigl(A_M(\tfrac{1}{239}),\; A_{M+1}(\tfrac{1}{239})\bigr) \;\in\; \mathbb{Q}.
\end{aligned}
$$

We call $[L_M, U_M] \subset \mathbb{Q}$ the **order-$M$ $\pi$-free rational Machin bracket**, with exact rational width $W_M := U_M - L_M \in \mathbb{Q}_{>0}$.
:::

Starting from the single seed $t_1 = \frac{1}{5}$, three rational tangent operations with strictly nonzero denominators complete the **purely rational Machin chain** without ever mentioning $\pi$ or $\arctan$:

$$
t_1 = \frac{1}{5} \;\longmapsto\; t_2 = t_1 \oplus t_1 = \frac{2/5}{24/25} = \frac{5}{12} \;\longmapsto\; t_4 = t_2 \oplus t_2 = \frac{5/6}{119/144} = \frac{120}{119} \;\longmapsto\; t_4 \ominus \frac{1}{239} = \frac{120 \cdot 239 - 119}{119 \cdot 239 + 120} = \frac{28561}{28561} = 1.
$$

Before cancellation, the final numerator and denominator both equal $28561 = 13^4$, landing squarely on the self-dual equatorial anchor $1$ (the homogeneous point $[1 : 1]$). This finite integer tangent chain is frozen with zero axioms in `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch08-machin-rational-chain title="Purely rational Machin tangent chain hitting unity" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.machin_rational_chain"}
On the zero-axiom rational carrier `Omega.IntRatio`, using rational tangent addition `tangentAdd` ($\oplus$) and subtraction `tangentSub` ($\ominus$) induced by homogeneous circle multiplication, define

$$
\mathrm{machinChain} \;:=\; \left(\left(\frac{1}{5} \oplus \frac{1}{5}\right) \oplus \left(\frac{1}{5} \oplus \frac{1}{5}\right)\right) \ominus \frac{1}{239}.
$$

Then $\mathrm{machinChain}$ is equivalent to unity under `IntRatio.Equivalent`:

$$
\mathrm{machinChain} \;\equiv\; 1.
$$
:::

::: {.proof}
Doubling via homogeneous circle multiplication maps $(1, 5)$ to $(10, 24)$, which is equivalent to the reduced pair $(5, 12)$; doubling a second time produces $(120, 119)$; subtracting $1/239$ (homogeneous multiplication by $(-1, 239)$) yields the unreduced pair $(28561, 28561)$ with $28561 = 13^4 > 0$, which cross-multiplies directly to equivalence with `IntRatio.ofInt 1`. The full proof is checked by the Lean kernel.
:::

Building on this zero-axiom tangent chain, consecutive partial sums differ by $\lvert A_{M+1}(x) - A_M(x)\rvert = \frac{x^{2M+1}}{2M+1}$, so the bracket width has the exact closed rational form (manual derivation):

$$
W_M \;=\; U_M - L_M \;=\; \frac{16}{5^{2M+1}(2M+1)} \;+\; \frac{4}{239^{2M+1}(2M+1)} \;\in\; \mathbb{Q}_{>0}.
$$

Purely inside $\mathbb{Q}$, these intervals form a strictly nested rational sequence $L_M < L_{M+1} < U_{M+1} < U_M$: for any observer tolerance $\varepsilon_{\mathrm{self}} = p/q > 0$, finitely many integer multiplications select an index $M$ satisfying $W_M < \varepsilon_{\mathrm{self}}$, **without ever assuming a completed real constant $\pi$**. Only when projecting through the one-way shadow functor $\Pi_{\mathbb{R}}$ into classical real analysis do $\tan(4\arctan\frac{1}{5} - \arctan\frac{1}{239}) = 1$ and $0 < 4\arctan\frac{1}{5} - \arctan\frac{1}{239} < \frac{\pi}{2}$ identify the nested intersection with classical $\pi$.

The figure below juxtaposes both purely rational mechanisms: on the left, the canonical $J_N(\mathbb{Q})$ polynomials at $\eta = \frac{1}{2}$ converge geometrically with factor $-\frac{1}{4}$ toward the exact one-step Cayley point $(\frac{3}{5}, \frac{4}{5})$; on the right, the $\pi$-free rational Machin intervals $[L_M, U_M]$ contract steeply in exact width $W_M$.

::: {.figure src="ch08-dfinite-machin-brackets"}
**D-finite Cayley truncation convergence and $\pi$-free rational Machin bracket contraction.** The left panel contrasts the exact one-step rational Cayley circle point $(\frac{3}{5}, \frac{4}{5})$ ([@thm-ch08-cayley-circle-unit]) against the alternating geometric error decay with factor $-\frac{1}{4}$ of the canonical $J_N(\mathbb{Q})$ polynomials at $\eta = \frac{1}{2}$ for $N = 2, 4, 6, 8, 12$ ([@thm-ch08-cayley-ode-uniqueness], [@thm-ch08-cayley-composition-unification], [@ex-ch08-cayley-half-truncation]). The right panel tracks the nested rational intervals $[L_M, U_M]$ anchored by the purely rational Machin tangent chain ([@thm-ch08-machin-rational-chain]) and the geometric contraction of their exact width $W_M = \frac{16}{5^{2M+1}(2M+1)} + \frac{4}{239^{2M+1}(2M+1)}$ with order $M$.
:::

::: {.example #ex-ch08-machin-width-table title="Exact contraction of the $\pi$-free Machin rational bracket width $W_M$"}
At $M = 1$, exact fraction arithmetic yields the closed rational interval $[L_1, U_1] = \bigl[\frac{281476}{89625},\; \frac{651864872}{204778785}\bigr]$ (endpoints rounded to six decimal places: $3.140597$ and $3.183264$), with exact width $W_1 = \frac{218431204}{5119469625} \approx 4.266676 \times 10^{-2}$. As $M$ increases, $W_M$ contracts by roughly a factor of $25^{-1}$ per step, reaching $1.57 \times 10^{-25}$ at $M = 17$ (manual derivation and exact rational arithmetic):

| Order $M$ | Base-$5$ denominator $5^{2M+1}(2M+1)$ | Exact bracket width $W_M$ (7 sig. figs.) | Equivalent decimal lock |
| :---: | :---: | :---: | :---: |
| $1$ | $375$ | $4.266676 \times 10^{-2}$ | $\approx 1$ digit |
| $2$ | $15{,}625$ | $1.024000 \times 10^{-3}$ | $\approx 3$ digits |
| $4$ | $17{,}578{,}125$ | $9.102222 \times 10^{-7}$ | $\approx 6$ digits |
| $6$ | $15{,}869{,}140{,}625$ | $1.008246 \times 10^{-9}$ | $\approx 9$ digits |
| $8$ | $12{,}969{,}970{,}703{,}125$ | $1.233619 \times 10^{-12}$ | $\approx 12$ digits |
| $12$ | $7{,}450{,}580{,}596{,}923{,}828{,}125$ | $2.147484 \times 10^{-18}$ | $\approx 17$ digits |
| $17$ | $1.018634 \times 10^{26}$ | $1.570731 \times 10^{-25}$ | $> 24$ digits |

Even at $M = 17$, every computation remains finite integer-numerator and integer-denominator arithmetic with no transcendentals and no limits.
:::

## 8.4 From Local Algebraic Jets to Global Subdivision-Free Integration {#sec-ch08-bridge-to-ch09}

Across Chapters 7 and 8, the differential half of calculus has been rebuilt entirely over $\mathbb{Q}$: the second-order jet ring $\mathcal{J}_2(\mathbb{Q})$ locks the `{0 · 1/2 · 1}` synchronous readout of state, connection, and curvature, while $J_N(\mathbb{Q})$ gives rational truncations of the exponential, sine, cosine, and arctangent series at the origin. The rational Cayley tangent chain also yields successively tighter brackets for $\pi$.

::: {.film src="jets-of-any-order"}
**From a row of rational coefficients to Machin's tangent chain: jets of any order explain trigonometry and the circle constant without assuming $\pi$ (2 min 52 s).** A jet of order $N$ appears as a row of $N + 1$ rational coefficients, and differentiation slides each coefficient one place left and multiplies it by its old index. The rows of the exponential, cosine, sine and arctangent are listed cell by cell; cosine squared plus sine squared is recomputed as $1, 0, 0, \dots$ through degree $12$ (cyan NUM, computed on screen), and the green LEAN ✓ goes only to the Pythagorean identity at every degree ([@thm-ch08-dfinite-calculus-laws]). A magenta chord of the unit circle then carries $t = \frac{1}{2}$ to the amber point $\bigl(\frac{3}{5}, \frac{4}{5}\bigr)$ ([@thm-ch08-cayley-circle-unit]); composing the cosine row with twice the arctangent row cancels every factorial and odd denominator down to $\pm 2$, matching CayleyCos cell by cell ([@thm-ch08-cayley-composition-unification]), while the violet box marks "the series re-expands the fraction" as the chapter's reading. The truncation table at $\eta = \frac{1}{2}$ with its factor $-\frac{1}{4}$ ([@ex-ch08-cayley-half-truncation]) and the endpoints and width bars of the $\pi$-free brackets ([@ex-ch08-machin-width-table]) are exact recomputations on screen; Machin's chain $\frac{1}{5} \mapsto \frac{5}{12} \mapsto \frac{120}{119} \mapsto \frac{28561}{28561} = 1$ carries the green LEAN ✓ ([@thm-ch08-machin-rational-chain]); only the classical shadow calls the nested intersection $\pi$, marked violet as argued.
:::

In the interactive laboratory card below, step through truncation orders $N = 2, 4, \dots, 12$ and Machin bracket orders $M$ directly: watch the canonical polynomials $U_N(\frac{1}{2})$ and $V_N(\frac{1}{2})$ close in on the exact one-step rational Cayley target $\bigl(\frac{3}{5}, \frac{4}{5}\bigr)$ down to exact fractional errors $\bigl(+\frac{1}{10240}, -\frac{1}{5120}\bigr)$, trace the purely rational Machin tangent chain $\frac{1}{5} \mapsto \frac{5}{12} \mapsto \frac{120}{119} \mapsto \frac{28561}{28561} = 1$, and observe the $\pi$-free bracket width $W_M$ contract by roughly a factor of $25^{-1}$ per order.

::: {.viz src="dfinite-algebraic-schur-lab" preset="dfinite-cayley-machin" height="520"}
**D-finite Cayley unification and $\pi$-free Machin bracket card (`dfinite-cayley-machin`).** Sweep the truncation order $N = 2 \dots 12$ at $\eta = \frac{1}{2} \mapsto \bigl(\frac{3}{5}, \frac{4}{5}\bigr)$ to compare the exact one-step rational Cayley ratio against the $J_N(\mathbb{Q})$ truncation residuals ([@thm-ch08-dfinite-calculus-laws], [@thm-ch08-cayley-ode-uniqueness], [@thm-ch08-cayley-composition-unification]), and advance the Machin order $M$ to follow the rational tangent chain ([@thm-ch08-machin-rational-chain]) alongside the shrinking width $W_M = U_M - L_M$ of the nested brackets $[L_M, U_M]$.
:::

The global half remains. If local differentiation no longer leans on flat tangent lines, can **integration, Stokes' theorem, and smooth manifolds themselves** likewise shed infinite Riemann subdivisions, flat tangent plates $T_p M \cong \mathbb{R}^n$, and non-analytic $C^\infty$ bump functions? [Chapter 9](ch09-telescoping-stokes-and-arc-manifold.md) completes Volume III by answering affirmatively through telescoping heap integrals, Choice-free simplicial cone homotopy, and the second-order osculating ternion-sphere manifold $\mathcal{M}_\Omega$.
