# 24.3 The Unique Algebraic Golden Lock: $x = 1 + 1/x$ and $\varphi = \frac{1+\sqrt{5}}{2}$ {#sec-ch24-3}

Before stepping into the cosine self-referential equation $\cos\theta = \theta$ (Section 24.4), let us examine the cleanest **rational self-referential fixed point** on the positive real half-line $(0, +\infty)$:

Combine the two elementary arithmetic operations "add $1$" and "invert $1/x$" into the continued-fraction feedback loop

$$
x_{k+1} = 1 + \frac{1}{x_k}, \qquad x_0>0.
$$

A finite expansion has only finitely many fraction layers, with the initial value $x_0$ still at the bottom. The infinite continued fraction $1+1/(1+1/(\cdots))$ denotes the limit of these truncations, whose convergence must be established separately; it is not equal to every finite $x_{k+1}$. Convergence can be checked by hand (manual derivation): from any $x_0 > 0$ we get $x_1 > 1$, every later term is at least $1$, and $\lvert x_{k+1} - \varphi\rvert = \lvert 1/x_k - 1/\varphi\rvert = \lvert x_k - \varphi\rvert/(x_k\varphi) \le \lvert x_k - \varphi\rvert/\varphi$, so each step shrinks the error by at least the factor $1/\varphi \approx 0.618$.

In `D5/S1/FixedPoints/Algebraic/GoldenFixedPoint`, this reciprocal residual map is formalized as [`goldenReciprocalMap`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap).

::: {.definition #def-golden-reciprocal-map title="The Golden Reciprocal Map goldenReciprocalMap" lean="D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap"}
On the real numbers $\mathbb{R}$, define the **golden reciprocal map** [`goldenReciprocalMap`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.goldenReciprocalMap) $: \mathbb{R} \to \mathbb{R}$ by

$$
\operatorname{goldenReciprocalMap}(x) \;:=\; 1 + \frac{1}{x}.
$$
:::

The next corollary proves that across all positive real numbers $x > 0$, the self-referential equation $\operatorname{goldenReciprocalMap}(x) = x$ locks onto **one and only one positive fixed point** — the golden ratio $\varphi = \frac{1 + \sqrt{5}}{2}$!

::: {.corollary #cor-golden-fixed-point-unique title="Uniqueness of the Golden Ratio as a Positive Fixed Point of the Reciprocal Map" lean="D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique"}
For $\operatorname{goldenReciprocalMap}(x) = 1 + 1/x$ of [@def-golden-reciprocal-map], all three properties hold:

1. **Positivity**: $0 < \frac{1 + \sqrt{5}}{2}$;
2. **Fixed-point identity**: $\operatorname{goldenReciprocalMap}\left(\frac{1 + \sqrt{5}}{2}\right) = \frac{1 + \sqrt{5}}{2}$;
3. **Uniqueness on the positive reals**: for every real number $x > 0$,

   $$
   \operatorname{goldenReciprocalMap}(x) = x \quad\Longleftrightarrow\quad x = \frac{1 + \sqrt{5}}{2}.
   $$
:::

::: proof
Rewriting $\frac{1 + \sqrt{5}}{2}$ as `Real.goldenRatio` via [`golden_ratio_spec`](lean:D5/S0/Carrier/GoldenRatio.golden_ratio_spec), claim 1 is `Real.goldenRatio_pos` and claim 2 is `golden_ratio_reciprocal_fixed_point` ($1 + 1/\varphi = \varphi$). For claim 3, let $x > 0$ (so $x \neq 0$). The reverse implication is immediate from claim 2. Conversely, if $1 + 1/x = x$, clearing the nonzero denominator via `quadratic_fixed_point_iff` yields $x^2 = x + 1$. Subtracting $\varphi^2 = \varphi + 1$ factors as

$$
(x - \varphi)(x + \varphi - 1) = x^2 - \varphi^2 - (x - \varphi) = 0.
$$

Since $x > 0$ and $\varphi > 1$ (`Real.one_lt_goldenRatio`), the second factor is strictly positive ($x + \varphi - 1 > 0$), forcing $x - \varphi = 0$, i.e., $x = \frac{1 + \sqrt{5}}{2}$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="fixed-point-convergence" preset="golden" height="500"}
**Closing on φ from both sides.** Pressing $1 + 1/x$ again and again from $x_0 = 1$, the path lands on $2, \frac{3}{2}, \frac{5}{3}, \frac{8}{5}, \dots$ and closes in, from alternating sides, on $\varphi$, where the cyan curve $y = 1 + 1/x$ meets the grey line $y = x$; each turn is about $1/\varphi^2 \approx 0.382$ times as wide as the one before, the size of the slope of the dashed magenta line (the tangent at the fixed point). That this crossing is the only positive fixed point is [@cor-golden-fixed-point-unique]; the convergence and its rate are the page's numerical illustration.
:::

[@cor-golden-fixed-point-unique] answers "what is the fixed point of $1 + 1/x$" but steps around an earlier question: **why $1 + 1/x$?** Calling it "the simplest combination of adding one and taking a reciprocal" is an impression. To turn the impression into a theorem, one has to list every map of the same kind and examine each.

"The same kind" means the fractional linear maps $x \mapsto \frac{ax + b}{cx + d}$ whose coefficients are only $0$ and $1$. Setting the map equal to $x$ and clearing the denominator gives the fixed-point equation

$$
c\,x^2 + (d - a)\,x - b \;=\; 0,
$$

with discriminant $(d - a)^2 + 4bc$. The Lean module `D5/S0/Diagonal/SelfApplicationFates` defines these quantities one by one and assigns each map a "self-application fate" according to the shape of its equation.

::: {.definition #def-binary-fractional-map-fates title="Binary Fractional Maps, Fixed-Point Coefficients, Discriminant, and the Four Self-Application Fates" lean="D5/S0/Diagonal/SelfApplicationFates.BinaryFractionalMap D5/S0/Diagonal/SelfApplicationFates.determinant D5/S0/Diagonal/SelfApplicationFates.Nondegenerate D5/S0/Diagonal/SelfApplicationFates.fixedCoefficients D5/S0/Diagonal/SelfApplicationFates.discriminant D5/S0/Diagonal/SelfApplicationFates.SelfApplicationFate D5/S0/Diagonal/SelfApplicationFates.HasFate D5/S0/Diagonal/SelfApplicationFates.IsPhiFamily"}
In the module `SelfApplicationFates`:

1. A **binary fractional map** [`BinaryFractionalMap`](lean:D5/S0/Diagonal/SelfApplicationFates.BinaryFractionalMap) is a structure with four components $a, b, c, d$ taking values in $\operatorname{Fin} 2 = \{0, 1\}$;
2. The **determinant** [`determinant`](lean:D5/S0/Diagonal/SelfApplicationFates.determinant) is the integer $\operatorname{determinant} m = a\,d - b\,c$; $m$ is **nondegenerate** ([`Nondegenerate`](lean:D5/S0/Diagonal/SelfApplicationFates.Nondegenerate)) if $\operatorname{determinant} m \neq 0$;
3. The **fixed-point coefficients** [`fixedCoefficients`](lean:D5/S0/Diagonal/SelfApplicationFates.fixedCoefficients) are the integer triple $\operatorname{fixedCoefficients} m = (c,\; d - a,\; -b)$;
4. The **discriminant** [`discriminant`](lean:D5/S0/Diagonal/SelfApplicationFates.discriminant) is the integer $\operatorname{discriminant} m = (d - a)^2 + 4\,b\,c$;
5. The **self-application fate** [`SelfApplicationFate`](lean:D5/S0/Diagonal/SelfApplicationFates.SelfApplicationFate) is an inductive type with exactly four constructors `empty`, `dead`, `collapse`, `live`; the predicate [`HasFate`](lean:D5/S0/Diagonal/SelfApplicationFates.HasFate) $m$ is defined on the four constructors by:
   - `empty`: $\operatorname{fixedCoefficients} m = (0, 0, 0)$;
   - `dead`: $\operatorname{fixedCoefficients} m = (0, 0, -1)$;
   - `collapse`: $\operatorname{discriminant} m = 0$ or $\operatorname{discriminant} m = 4$, and $\operatorname{fixedCoefficients} m \neq (0, 0, 0)$, and $\operatorname{fixedCoefficients} m \neq (0, 0, -1)$;
   - `live`: $\operatorname{discriminant} m = 5$;
6. The **$\varphi$-family** [`IsPhiFamily`](lean:D5/S0/Diagonal/SelfApplicationFates.IsPhiFamily) $m$ is defined as $(a, b, c, d) = (1, 1, 1, 0)$ or $(a, b, c, d) = (0, 1, 1, 1)$.
:::

Reading the four bits $(a, b, c, d)$ as the map $x \mapsto \frac{ax+b}{cx+d}$ is this book's interpretation; the Lean definitions in [@def-binary-fractional-map-fates] involve only the four bits and the integers computed from them. (The same module also contains [`fixedPolynomial`](lean:D5/S0/Diagonal/SelfApplicationFates.fixedPolynomial), whose value at a rational $x$ is $c\,x^2 + (d - a)\,x - b$, the left-hand side of the fixed-point equation above.) The four names mean what they say: `empty` is the equation $0 = 0$, where every point is fixed and the equation carries no information; `dead` is the equation $-1 = 0$, with no fixed point; `collapse` is the case of a perfect-square discriminant $0$ or $4$, where the roots fall back into the rationals; `live` is the case of discriminant $5$, where the roots are irrational.

::: {.theorem #thm-self-application-four-fates title="The Four Self-Application Fates of Nondegenerate Binary Fractional Maps and the Characterization of the φ-Family" lean="D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates"}
Let $m$ be a binary fractional map ([@def-binary-fractional-map-fates]) that is nondegenerate (`hm : Nondegenerate m`). Then all four of the following hold:

1. **A fate exists and is unique**: there is exactly one $\mathrm{fate}$ such that $\operatorname{HasFate}\ m\ \mathrm{fate}$;
2. **`live` if and only if in the $\varphi$-family**:

   $$
   \operatorname{HasFate}\ m\ \mathtt{live} \quad\Longleftrightarrow\quad \operatorname{IsPhiFamily}\ m\,;
   $$

3. **Fixed-point coefficients when `live`**: if $\operatorname{HasFate}\ m\ \mathtt{live}$, then $\operatorname{fixedCoefficients} m = (1, -1, -1)$ or $\operatorname{fixedCoefficients} m = (1, 1, -1)$;
4. **Discriminant when `live`**: if $\operatorname{HasFate}\ m\ \mathtt{live}$, then $\operatorname{discriminant} m = 1^2 + 4$.
:::

::: proof
`BinaryFractionalMap` has only $2^4 = 16$ elements. The proof splits $m$ into its four components, cases on each being $0$ or $1$ (`fin_cases`), and simplifies the hypothesis `hm` with `norm_num`, which discards the degenerate cases at once. In each remaining case, existence in claim 1 is obtained by exhibiting the corresponding constructor and deciding it with `decide`, and uniqueness by casing on the four constructors and simplifying after unfolding `HasFate`, `fixedCoefficients`, and `discriminant`; claims 2, 3, and 4 are decidable propositions on a finite case and are settled by `decide`. The full proof is checked by the Lean kernel.
:::

There are only six nondegenerate binary fractional maps, so all of them can be laid on the table.

::: {.example #ex-six-binary-fractional-maps title="Enumerating the Six Nondegenerate Binary Fractional Maps"}
Exactly six quadruples with $a, b, c, d \in \{0, 1\}$ have determinant $ad - bc \neq 0$: three with $a = d = 1$ and $bc = 0$, and three with $b = c = 1$ and $ad = 0$. Computing the quantities of [@def-binary-fractional-map-fates] one by one:

| $(a, b, c, d)$ | map $x \mapsto \frac{ax+b}{cx+d}$ | fixed-point equation | discriminant | fate | real fixed points |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $(1, 0, 0, 1)$ | $x \mapsto x$ | $0 = 0$ | $0$ | `empty` | every $x$ |
| $(1, 1, 0, 1)$ | $x \mapsto x + 1$ | $-1 = 0$ | $0$ | `dead` | none |
| $(1, 0, 1, 1)$ | $x \mapsto \frac{x}{x+1}$ | $x^2 = 0$ | $0$ | `collapse` | $0$ |
| $(0, 1, 1, 0)$ | $x \mapsto \frac{1}{x}$ | $x^2 - 1 = 0$ | $4$ | `collapse` | $\pm 1$ |
| $(1, 1, 1, 0)$ | $x \mapsto 1 + \frac{1}{x}$ | $x^2 - x - 1 = 0$ | $5$ | `live` | $\varphi,\ -\varphi^{-1}$ |
| $(0, 1, 1, 1)$ | $x \mapsto \frac{1}{1+x}$ | $x^2 + x - 1 = 0$ | $5$ | `live` | $\varphi^{-1},\ -\varphi$ |

Every row has exactly one fate, in agreement with claim 1 of [@thm-self-application-four-fates]; the two `live` rows are precisely the $\varphi$-family, with fixed-point coefficients $(1, -1, -1)$ and $(1, 1, -1)$, in agreement with claims 2 and 3. The two `live` maps are conjugate to each other: if $x = 1 + 1/x$, then $y = 1/x$ satisfies $y = 1/(1 + y)$.
:::

So $1 + 1/x$ was not picked at random. Among all six nondegenerate fractional maps that can be written with $0$ and $1$, one says nothing, one has nowhere to stop, two stop at rational numbers, and only $1 + 1/x$ and its conjugate $1/(1+x)$ stop where the rationals cannot reach. [@cor-golden-fixed-point-unique] already computed the unique positive fixed point of the former; the corresponding statement for the latter also has a frozen Lean proof.

::: {.figure src="ch24-six-maps"}
**The six maps and where they meet the diagonal.** Each small plot is one row of the table above: the ink curve is $x \mapsto \frac{ax+b}{cx+d}$, the grey dashed line is $y = x$, and the crossings are the real fixed points. The `empty` curve lies on the diagonal; the `dead` one runs parallel to it; the two `collapse` maps cross it at the cyan rationals $0$ and $\pm 1$; only the two `live` maps cross it at the magenta irrationals $\varphi, -\varphi^{-1}$ and $\varphi^{-1}, -\varphi$ ([@thm-self-application-four-fates]).
:::

::: {.lemma #lem-golden-inverse-branch-fixed-point title="The Unique Positive Fixed Point of 1/(1+x) Is the Inverse Golden Ratio" lean="D5/S3/Analytic/Characterizations/GoldenInverseBranchFixedPoint.golden_inverse_branch_positive_fixed_point_iff"}
For every real number $x$ with $0 < x$,

$$
\frac{1}{x + 1} = x \quad\Longleftrightarrow\quad x = \varphi^{-1},
$$

where $\varphi$ is Mathlib's `Real.goldenRatio`.
:::

::: proof
First extract the identity $\varphi - 1 = \varphi^{-1}$ from `golden_transfer_triangle`. Forward direction: since $x > 0$ we have $x + 1 \neq 0$, so $\frac{1}{x+1} = x$ is equivalent to $1 = x\,(x + 1)$; together with $\varphi^2 = \varphi + 1$ (`Real.goldenRatio_sq`) and $\varphi > 1$ (`Real.one_lt_goldenRatio`), nonlinear arithmetic yields $x = \varphi - 1 = \varphi^{-1}$. Reverse direction: substituting $x = \varphi^{-1}$ and using $\varphi^{-1} + 1 = \varphi$ gives $\frac{1}{\varphi^{-1} + 1} = \frac{1}{\varphi} = \varphi^{-1}$. The full proof is checked by the Lean kernel.
:::

Up to this point, golden self-reference is a purely algebraic matter: addition, division, one quadratic equation. Section 24.4 will place it alongside the cosine self-reference $\cos\theta = \theta$ (whose classical analytic and number-theoretic properties are recorded in the literature remarks of Section 24.4). Yet the two kinds of self-reference are not unrelated. The golden ratio is itself a cosine reading, taken at the angles of the regular pentagon.

::: {.proposition #prop-pentagon-golden-cosines title="The Doubled Pentagon Cosines Read the Golden Ratio, Its Inverse, and √5" lean="D5/S3/Constants/PentagonCosines.pentagon_golden_cosines"}
Let $\varphi$ denote Mathlib's `Real.goldenRatio`. All four of the following hold:

1. $2\cos\dfrac{\pi}{5} = \varphi$;
2. $2\cos\dfrac{2\pi}{5} = \varphi^{-1}$;
3. $2\cos\dfrac{\pi}{5} + 2\cos\dfrac{2\pi}{5} = \sqrt{5}$;
4. $2\cos\dfrac{2\pi}{5}$ is irrational.
:::

::: proof
Claim 1 is Mathlib's closed form `Real.cos_pi_div_five` ($\cos\frac{\pi}{5} = \frac{1 + \sqrt5}{4}$) multiplied by $2$. For claim 2, write $\frac{2\pi}{5}$ as $2\cdot\frac{\pi}{5}$ and use the double-angle formula $\cos 2\alpha = 2\cos^2\alpha - 1$ with the same closed form to compute $\cos\frac{2\pi}{5} = \frac{\sqrt5 - 1}{4}$ (using $(\sqrt5)^2 = 5$); `Real.inv_goldenRatio` rewrites $\varphi^{-1}$ as $-\frac{1 - \sqrt5}{2}$, which matches. Claim 3 adds the first two and obtains $\sqrt5$ from `Real.goldenRatio_sub_goldenConj`. Claim 4 follows from the irrationality of $\varphi$ (`Real.goldenRatio_irrational`), which is preserved under taking inverses. The full proof is checked by the Lean kernel.
:::

Substituting the first two claims of [@prop-pentagon-golden-cosines] into the golden fixed-point equation $1 + \varphi^{-1} = \varphi$ (claim 2 of [@cor-golden-fixed-point-unique]) turns it into a trigonometric identity:

$$
1 + 2\cos\frac{2\pi}{5} \;=\; 2\cos\frac{\pi}{5}.
$$

Golden self-reference is a length relation inside the regular pentagon: a regular pentagon of unit side has diagonals of length $2\cos\frac{\pi}{5} = \varphi$. Thus $\varphi$ is also twice the cosine at $\frac{\pi}{5}$, landing in the quadratic field $\mathbb{Q}(\sqrt{5})$.

## 24.3.1 Exact Projective Möbius Contraction, Balanced-Ternary Fractional Classification, the Hurwitz Approximation Barrier, and Pentagon Chebyshev–Spread Closure {#sec-ch24-3-1-golden-mobius-ternary-hurwitz-chebyshev}

Building on the preceding results—the unique positive fixed points of $1 + 1/x$ and $1/(1 + x)$, the four fates of nondegenerate maps on the binary coefficient set $\{0, 1\}^4$, and the doubled pentagon cosine readings—the subsections below complete four foundational algebraic structures. The first two sharpen the opening $1/\varphi$ error bound into the projective cross-ratio multiplier $-\varphi^{-2}$ and exact step-by-step contraction laws in the original coordinate, then test whether the golden family remains unique when the coefficient set expands from binary $\{0, 1\}^4$ to balanced ternary $\{-1, 0, 1\}^4$. The last two use quadratic norms in $\mathbb{Z}[\varphi]$ and $\mathbb{Z}[\sqrt{2}]$ to derive the $\sqrt{5}$ and $2\sqrt{2}$ approximation barriers for the golden and silver ratios directly without infinite continued-fraction limits, then isolate the algebraic pentagon core of [@prop-pentagon-golden-cosines] as pure integer-coefficient Chebyshev and spread polynomial identities.

### 24.3.1.1 Projective $\mathrm{GL}(2, \mathbb{Z})$ Iteration, Cross-Ratio Linearization with Multiplier $-\varphi^{-2}$, and Reciprocal-Conjugate Shifted Duality {#sec-ch24-3-1-1-projective-mobius-contraction}

On the real projective line $\mathbb{RP}^1$, the unimodular integer matrix $A = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} \in \mathrm{GL}(2, \mathbb{Z}) \subset \mathrm{GL}(2, \mathbb{R})$ acts linearly over $\mathbb{R}$ on homogeneous coordinates while preserving the rational projective line $\mathbb{QP}^1 \subset \mathbb{RP}^1$ (A. F. Beardon, *The Geometry of Discrete Groups*, 1983, Sections 4.2–4.3, [10.1007/978-1-4612-1146-4](https://doi.org/10.1007/978-1-4612-1146-4)). Restricted to the finite affine chart $(x, 1)^\top$ ($x \neq 0$), this action realizes the feedback map $x \mapsto 1 + 1/x$ and encompasses both arbitrary positive real seeds $x_0 > 0$ and the two irrational fixed points $\varphi, \varphi'$.

Define the Fibonacci sequence $F_0 = 0, F_1 = 1, F_{n+2} = F_{n+1} + F_n$: induction from $A^2 = A + I$ gives for every $n \ge 1$ the power $A^n = \begin{pmatrix} F_{n+1} & F_n \\ F_n & F_{n-1} \end{pmatrix}$, and taking determinants ($\det A = -1$) immediately yields Cassini's identity $F_{n+1} F_{n-1} - F_n^2 = (-1)^n$. Substituting $A^{-n} = (-1)^n \begin{pmatrix} F_{n-1} & -F_n \\ -F_n & F_{n+1} \end{pmatrix}$ into $A^{m-n} = A^m A^{-n}$ and equating $(1, 2)$ entries (checking $n = 0$ directly via $F_m \cdot 1 - F_{m+1} \cdot 0 = F_m$) yields d'Ocagne's identity $F_m F_{n+1} - F_{m+1} F_n = (-1)^n F_{m-n}$ for all $m \ge n \ge 0$.

For any positive seed $x_0 > 0$ and every $n \ge 1$, the $n$-th iterate is $x_n = \frac{F_{n+1} x_0 + F_n}{F_n x_0 + F_{n-1}}$ (with strictly positive denominator). Induction from $\varphi^2 = \varphi + 1$ and $\varphi' = 1 - \varphi = -\varphi^{-1}$ yields $F_{n+1} - \varphi F_n = (-\varphi^{-1})^n$ ($n \ge 0$), hence $(F_{n+1} x_0 + F_n) - \varphi(F_n x_0 + F_{n-1}) = (-\varphi^{-1})^n (x_0 - \varphi)$; combining this with the single-step residual identity [`golden_mobius_sub_golden`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenCrossRatioLinearization.golden_mobius_sub_golden) and the two-step product $x_n x_{n+1} = x_n(1 + 1/x_n) = x_n + 1$ gives the closed-form error and two-step contraction laws:

$$
\begin{aligned}
x_n - \varphi &= \frac{(-1)^n (x_0 - \varphi)}{\varphi^n (F_n x_0 + F_{n-1})} \quad (n \ge 1), \\
x_{n+1} - \varphi &= -\frac{x_n - \varphi}{\varphi x_n}, \\
x_{n+2} - \varphi &= \frac{x_n - \varphi}{\varphi^2 (x_n + 1)}.
\end{aligned}
$$

Define the projective cross-ratio coordinate $\chi(x) = (x - \varphi)/(x - \varphi')$; each step multiplies $\chi(x)$ by $-\varphi^{-2}$, yielding the linearization $\chi(x_n) = (-\varphi^{-2})^n \chi(x_0)$ (see [`golden_cross_ratio_iterate`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenCrossRatioLinearization.golden_cross_ratio_iterate) and [`golden_projective_multiplier_eq_neg_conjugate_sq`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenMobiusMap.golden_projective_multiplier_eq_neg_conjugate_sq)).

Back in the original coordinate, whenever $x_0 \neq \varphi$, the signed single-step error ratio is $-\frac{1}{\varphi x_n}$. Every seed in the open interval $(0, \varphi^{-1})$ satisfies $\varphi x_0 < 1$ and strictly expands the error on the first step; from $n \ge 1$ onward, however, $x_n > 1$ enforces both the uniform single-step contraction bound $\frac{1}{\varphi x_n} < \frac{1}{\varphi}$ and the two-step bound $\frac{1}{\varphi^2(x_n + 1)} < \frac{1}{2\varphi^2}$ (archived enclosure rounding to $0.190983$). Because for every $n \ge 2$ we have $x_n \in (1, 2)$, every $n \ge 3$ satisfies $x_n \in (\frac{3}{2}, 2)$ with two-step factor strictly below $\frac{2}{5\varphi^2}$ ($0.152786$).

Starting from the visualization seed $x_0 = 1$, every iterate $x_n = F_{n+2}/F_{n+1}$ ($n \ge 1$) already lies in $[\frac{3}{2}, 2]$ (attaining at $n = 2$ the two-step bound $\frac{2}{5\varphi^2}$), with exact error $x_n - \varphi = \frac{(-1)^{n+1}}{\varphi^{n+1} F_{n+1}}$. The magnitude of the signed step ratio $-\frac{F_{n+1}}{\varphi F_{n+2}}$ alternates strictly across $\varphi^{-2} = \frac{3 - \sqrt{5}}{2}$ ($0.381966$): after $n = 1$ ($0.309017$) and $n = 2$ ($0.412023$), it tightens at $n = 12$ ($x_{12} = \frac{377}{233}$, error magnitude rounding to $0.000008$) to $0.381968$, and at $n = 14$ ($x_{14} = \frac{987}{610}$) matches $\varphi^{-2}$ to six decimals.

For the reciprocal-conjugate branch $y_{n+1} = \frac{1}{1 + y_n}$ of [@lem-golden-inverse-branch-fixed-point] (conjugate to $x \mapsto 1 + 1/x$ via $y = 1/x$, not its functional inverse $y \mapsto 1/(y - 1)$) with $y_0 = 1/x_0 > 0$, induction gives for every $n \ge 0$ the identity $y_n = 1/x_n = x_{n+1} - 1$; subtracting $\varphi^{-1} = \varphi - 1$ yields the exact shifted duality $y_n - \varphi^{-1} = x_{n+1} - \varphi$ (for instance, at $x_0 = 1, n = 1$, both $y_1 = \frac{1}{2}$ and $x_2 = \frac{3}{2}$ have the same signed difference $\frac{3}{2} - \varphi$ from their respective fixed points).

### 24.3.1.2 Classification of Nondegenerate Balanced-Ternary Fractional Maps on $\{-1, 0, 1\}^4$ and Unimodular Golden Uniqueness {#sec-ch24-3-1-2-balanced-ternary-classification}

Extend the coefficient set of [@def-binary-fractional-map-fates] and [@thm-self-application-four-fates] from binary $\{0, 1\}^4$ to the symmetric balanced-ternary set $\{-1, 0, 1\}^4$, writing each integer matrix as $M = (a, b, c, d) \in \{-1, 0, 1\}^4$ ($3^4 = 81$ in total). Among pairs $(a, d) \in \{-1, 0, 1\}^2$, the product $ad$ equals $+1$, $-1$, and $0$ in exactly $2, 2, 5$ ways respectively, so singularity $\det M = ad - bc = 0$ holds on $2^2 + 2^2 + 5^2 = 33$ matrices, leaving $48$ nondegenerate matrices.

Modulo overall sign $M \sim -M$ (choosing the canonical representative with first nonzero entry $+1$), these $48$ nondegenerate matrices form $24$ nondegenerate projective fractional maps (among the $40$ nonzero sign classes, the remaining $16$ are singular). Across these $24$ nondegenerate projective classes, $\lvert\det M\rvert = 2$ occurs only when $\{ad, bc\} = \{+1, -1\}$ ($2 \cdot 2 + 2 \cdot 2 = 8$ matrices, or $4$ projective classes), whereas the remaining $20$ projective classes ($40$ matrices) are unimodular ($\lvert\det M\rvert = 1$).

On the projective line, the homogeneous fixed-point equation $c X^2 + (d - a) X Y - b Y^2 = 0$ reduces on the finite chart $x = X/Y$ to $c x^2 + (d - a) x - b = 0$ (while the point at infinity $[1 : 0]$, where $Y = 0$, is fixed if and only if $c = 0$), with discriminant $\Delta = (d - a)^2 + 4bc = (a + d)^2 - 4\det M$. Because $(d - a)^2 \in \{0, 1, 4\}$ and $4bc \in \{-4, 0, 4\}$, achieving $\Delta = 1$ forces $(d - a)^2 = 1$ and $bc = 0$, so one of $a, d$ vanishes and $\det M = ad - bc = 0$ (singular); nondegenerate classes therefore take only $\Delta \in \{-4, -3, 0, 4, 5, 8\}$.

Over the signed coefficient set, the fate predicates extend via the polynomial coefficient triple $(c, d - a, -b)$: `empty` means $(0, 0, 0)$; `dead` covers both nonzero constant cases $(0, 0, \pm 1)$ (no finite affine fixed point, fixing only $[1 : 0]$); `elliptic` means $\Delta < 0$ (no real fixed points); and the remaining classes split by square $\Delta \in \{0, 4\}$ (`collapse`) versus positive non-square $\Delta \in \{5, 8\}$ (`live`).

Define the projective order $k$ as the least positive integer with $M^k$ a nonzero scalar matrix, and set $t = a + d$ and $D = \det M$; Cayley–Hamilton ($M^2 - t M + D I = 0$) then determines every elliptic projective order directly: $\Delta = -4, D = 1$ forces $t = 0$, giving $M^2 = -I$ (order $2$); $\Delta = -4, D = 2$ forces $t = \pm 2$, giving $M^2 = \pm 2M - 2I$ and $M^3 = 2M \mp 4I$ non-scalar while $M^4 = -4I$ (order $4$); and $\Delta = -3$ forces $D = 1, t = \pm 1$, giving $M^2 = \pm M - I$ non-scalar while $M^3 = \mp I$ (order $3$).

Every non-`live` row count follows directly by discriminant cases. For $\Delta = 0$, $4bc = -(d - a)^2$ with $bc = -1$ forces $(d - a)^2 = 4$, $ad = -1$, and $\det M = 0$ (singular), so $bc = 0$ and canonically $a = d = 1$, partitioning into $b = c = 0$ (`empty`, $1$ class), $c = 0, b = \pm 1$ (`dead`, $2$ classes), and $b = 0, c = \pm 1$ (`collapse`, $2$ classes).

For $\Delta = 4$, taking $bc = 0$ with canonical $a = 1, d = -1$ gives $c = 0, b \in \{-1, 0, 1\}$ ($3$ classes, where the homogeneous fixed-point equation rewrites as $Y(-2X - b Y) = 0$, yielding one finite rational fixed point and $[1 : 0]$) plus $b = 0, c = \pm 1$ ($2$ classes, each with two distinct finite rational fixed points); taking $bc = 1$ forces $a = d$ and by nondegeneracy $a = d = 0$, adding $(0, 1, 1, 0)$ ($1$ class, two distinct finite fixed points $\pm 1$) for $6$ classes total.

For $\Delta < 0$, necessarily $bc = -1$, where $a = d = 0$ yields $1$ class, $a = d = 1$ with $b = -c = \pm 1$ yields $2$ classes, and $(d - a)^2 = 1$ combines the choice of nonzero diagonal position, its sign, and $b = -c = \pm 1$ to produce $8$ matrices ($4$ classes modulo overall sign). The table below summarizes all $24$ nondegenerate projective classes (ordered by `empty`, `dead`, `collapse`, `elliptic`, `live`, they account for $1, 2, 8, 7, 6$ classes, or $2, 4, 16, 14, 12$ matrices):

| Fate | $\Delta$ | $\lvert\det\rvert$ | Classes | Order / Structure |
| :--- | ---: | ---: | ---: | :--- |
| `empty` | $0$ | $1$ | $1$ | Identity $x \mapsto x$ |
| `dead` | $0$ | $1$ | $2$ | Shifts $x \mapsto x \pm 1$ (fix only $[1 : 0]$) |
| `collapse` | $0$ | $1$ | $2$ | Double rational root $0$ ($(1, 0, \pm 1, 1)$) |
| `collapse` | $4$ | $1$ | $6$ | $3$ with $c = 0$ (one finite fixed point and $[1 : 0]$), $3$ with $c \neq 0$ (two distinct finite fixed points) |
| `elliptic` | $-4$ | $1$ | $1$ | Order $2$ ($(0, 1, -1, 0)$, $\mathbb{Q}(i)$) |
| `elliptic` | $-4$ | $2$ | $2$ | Order $4$ ($(1, \mp 1, \pm 1, 1)$, $\mathbb{Q}(i)$) |
| `elliptic` | $-3$ | $1$ | $4$ | Order $3$ (e.g., $(1, -1, 1, 0)$, $\mathbb{Q}(\sqrt{-3})$) |
| `live` | $5$ | $1$ | $4$ | Golden family $\mathbb{Q}(\sqrt{5})$ (always $\det = -1$) |
| `live` | $8$ | $2$ | $2$ | Silver family $\mathbb{Q}(\sqrt{2})$ (always $\det = -2$) |

The key structural distinction separates the two `live` families: for $\Delta = (d - a)^2 + 4bc$ to be a positive non-square, we must have $bc = 1$ and $(d - a)^2 \in \{1, 4\}$, leaving only $\Delta = 5$ and $\Delta = 8$. When $\Delta = 5$, $(d - a)^2 = 1$ forces exactly one of $a, d$ to vanish, so $ad = 0$ and always $\det M = -1$ (the four classes $(1, 1, 1, 0), (0, 1, 1, -1)$ with $x^2 - x - 1 = 0$, and $(0, 1, 1, 1), (1, -1, -1, 0)$ with $x^2 + x - 1 = 0$).

When $\Delta = 8$, $(d - a)^2 = 4$ forces $\{a, d\} = \{-1, 1\}$, so $ad = -1$ and always $\det M = -2$ (the two classes $(1, 1, 1, -1)$ with $x^2 - 2x - 1 = 0$ and roots $1 \pm \sqrt{2}$, and $(1, -1, -1, -1)$ with $x^2 + 2x - 1 = 0$ and roots $-1 \pm \sqrt{2}$, linking directly to Chapter 23's silver slope $s = \sqrt{2} - 1$). Consequently, within the balanced-ternary coefficient set $\{-1, 0, 1\}^4$, imposing unimodularity ($\lvert\det M\rvert = 1$) eliminates the silver family altogether, leaving **$\Delta = 5$ as the unique hyperbolic real-quadratic self-reference discriminant**.

### 24.3.1.3 Norms in `QPhi`, `QSqrt2`, $\mathbb{Z}[\varphi]$, and $\mathbb{Z}[\sqrt{2}]$ and the Hurwitz Approximation Barrier {#sec-ch24-3-1-3-hurwitz-norm-barrier}

In [§32.8.4.2](ch39-s36-lean4-zero-axiom-omega-math-architecture.md#sec-ch39-finite-algebraic-rings-qsqrt2-qphi), the zero-axiom quadratic fields `QPhi` and `QSqrt2` and their integer rings $\mathbb{Z}[\varphi]$ and $\mathbb{Z}[\sqrt{2}]$ provide the algebraic setting for deriving the golden and silver approximation barriers directly from quadratic norms without infinite continued-fraction limits, complementing Hurwitz's general theorem for all irrationals (A. Hurwitz, *Ueber die angenäherte Darstellung der Irrationalzahlen durch rationale Brüche*, 1891, Satz I–II and pp. 279–282, [10.1007/BF01206656](https://doi.org/10.1007/BF01206656)) and Chapter 23's silver best-approximation bound [@thm-ch29-silver-best-approximation].

For $\alpha \in \{\varphi, \sigma, s\}$ (with $\sigma = 1 + \sqrt{2}$ and $s = \sqrt{2} - 1$), let $\alpha'$ be its Galois conjugate and $L = \alpha - \alpha'$ its root gap (with $\varphi$ having $L = \sqrt{5}$ and $\sigma, s$ both having $L = 2\sqrt{2}$), and take the integer norm forms $N_\varphi(p, q) = p^2 - pq - q^2$ (in $\mathbb{Q}(\sqrt{5})$) together with $N_\sigma(p, q) = (p - q)^2 - 2q^2$ and $N_s(p, q) = (p + q)^2 - 2q^2$ (in $\mathbb{Q}(\sqrt{2})$).

For every nonzero integer pair $(p, q)$, if $q = 0$ then $p \neq 0$ directly gives $N_\alpha(p, 0) = p^2 \ge 1$. If $q \neq 0$, then in $4 N_\varphi(p, q) = (2p - q)^2 - 5q^2$, the case $2p = q$ gives $-5q^2 \neq 0$ while otherwise $(2p - q)^2$ and $5q^2$ are both nonzero with opposite $5$-adic valuation parities; likewise, for $N_\sigma(p, q) = (p - q)^2 - 2q^2$ ($p = q$ gives $-2q^2 \neq 0$) and $N_s(p, q) = (p + q)^2 - 2q^2$ ($p = -q$ gives $-2q^2 \neq 0$), the two terms otherwise have opposite $2$-adic valuation parities, so $\lvert N_\alpha(p, q)\rvert \ge 1$ always holds.

Hence for any rational $r = p/q$ ($q \ge 1$), expanding $N_\alpha(p, q) = q^2(r - \alpha)(r - \alpha')$ yields the non-asymptotic one-sided strict barrier and the explicit denominator cap under any stronger constant:

$$
\begin{aligned}
q^2 \lvert r - \alpha\rvert \cdot \lvert r - \alpha'\rvert &= \lvert N_\alpha(p, q)\rvert \ge 1, \\
r < \alpha &\implies \lvert r - \alpha\rvert > \frac{1}{L\,q^2}, \\
\bigl(C > L \;\land\; \lvert r - \alpha\rvert < \tfrac{1}{C q^2}\bigr) &\implies q < \frac{1}{\sqrt{C(C - L)}}.
\end{aligned}
$$

Both implications follow directly: if $r < \alpha$, then $\alpha' < r < \alpha$ gives $0 < r - \alpha' < L$ and hence $q^2\lvert r - \alpha\rvert > 1/L$, while $r \le \alpha'$ already gives $\lvert r - \alpha\rvert \ge L > \frac{1}{L q^2}$ (since $L^2 \in \{5, 8\}$ implies $L^2 > 1$). If $C > L$ and $q^2\lvert r - \alpha\rvert < 1/C$, multiplying the triangle inequality $\lvert r - \alpha'\rvert \le L + \lvert r - \alpha\rvert < L + \frac{1}{C q^2}$ by $q^2\lvert r - \alpha\rvert$ yields $1 < \frac{L}{C} + \frac{1}{C^2 q^2}$, which rearranges directly to $q < \frac{1}{\sqrt{C(C - L)}}$.

This universal barrier aligns with two theorems in the pinned `trureturing` library:

- [`golden_hurwitz_bound`](lean:D5/S1/Depth/GoldenHurwitzBound.golden_hurwitz_bound): proves $\frac{1}{\sqrt{5}\,\operatorname{den}(q)^2 + \operatorname{den}(q)} < \lvert\varphi - q\rvert$ for every rational $q$;
- [`golden_fibonacci_approximation_constant_tendsto`](lean:D5/S3/AnalyticClosure/GoldenApproximationConstant.golden_fibonacci_approximation_constant_tendsto): gives the exact asymptotic limit for the Fibonacci convergents, namely $\lim_{n\to\infty} F_n^2 \lvert\varphi - F_{n+1}/F_n\rvert = \frac{1}{\sqrt{5}}$.

Specializing $C$ pins down the exact exception set in $\mathbb{Q}$. For $\varphi$ ($L = \sqrt{5}$ rounding to $2.236068$ and $1/\sqrt{5}$ to $0.447214$), setting $C = \frac{5}{2}$ gives denominator cap $1.231073$, leaving only denominators $q = 1$ (integers); since $5 > \frac{121}{25}$ and $5 > \frac{81}{25}$ force $2 - \varphi < \frac{2}{5} < \varphi - 1$, **$2/1$ is the unique rational exception in $\mathbb{Q}$**. At $C = 3$, $3(3 - \sqrt{5}) > 1$ (equivalently $64 > 45$) forces cap $0.660560 < 1$, proving **zero exceptions in $\mathbb{Q}$**.

For $\sigma$ and $s$ ($L = 2\sqrt{2}$ rounding to $2.828427$ and $1/(2\sqrt{2})$ to $0.353553$), setting $C = 3$ gives cap $1.393847$, again leaving only denominators $q = 1$ (integers); every integer lies at distance at least $\sqrt{2} - 1 > \frac{1}{3}$ from both numbers (as $2 > \frac{16}{9}$), so **zero rational exceptions** remain at $C = 3$.

To test sharpness at the critical threshold $1/(L q^2)$, consider the Fibonacci convergents $F_{n+1}/F_n$ together with the Pell convergents defined by $Q_n + P_n\sqrt{2} = (1 + \sqrt{2})^n$ ($n \ge 1$), namely $(Q_n + P_n)/P_n$ (for $\sigma$) and $(Q_n - P_n)/P_n$ (for $s$). For Fibonacci convergents, Cassini's identity gives $N_\varphi(F_{n+1}, F_n) = F_{n+1} F_{n-1} - F_n^2 = (-1)^n$; for Pell convergents, multiplying $Q_n + P_n\sqrt{2} = (1 + \sqrt{2})^n$ by its conjugate $Q_n - P_n\sqrt{2} = (1 - \sqrt{2})^n$ yields $Q_n^2 - 2P_n^2 = (-1)^n$, which evaluates both $N_\sigma$ and $N_s$ to $(-1)^n$.

Because any common divisor $d$ satisfies $d^2 \mid N_\alpha(p_n, q_n) = (-1)^n$, all three convergent families are reduced fractions. Starting from $F_1 = F_2 = 1$, the Fibonacci denominators increase strictly from $n = 2$ onward (for $n \ge 2$, $F_{n+1} \ge F_n + 1$); multiplying $Q_n + P_n\sqrt{2}$ by $1 + \sqrt{2}$ gives the recurrences $Q_{n+1} = Q_n + 2P_n$ and $P_{n+1} = Q_n + P_n$, so induction from $Q_1 = P_1 = 1$ yields for every $n \ge 1$ both $Q_n \ge P_n \ge 1$ and $P_{n+1} > P_n$, sending all three denominator sequences to infinity.

For every $n \ge 1$, both $F_{n+1}/F_n \ge 1 > \varphi'$ and $Q_n \ge P_n$ (giving $(Q_n + P_n)/P_n \ge 2 > \sigma'$ and $(Q_n - P_n)/P_n \ge 0 > s'$) imply $r_n > \alpha'$, so $r_n - \alpha$ carries sign $(-1)^n$; meanwhile $\lvert F_{n+1}/F_n - \varphi\rvert < 1/F_n^2$ and $\lvert Q_n/P_n - \sqrt{2}\rvert = (\sqrt{2} - 1)^n / P_n$ give $r_n \to \alpha$. Thus even-index convergents approach $\alpha$ from above with error strictly below $1/(L q_n^2)$, whereas odd-index convergents approach $\alpha$ from below with error strictly above $1/(L q_n^2)$.

The companion exhaustive scan over all $19025$ reduced rationals with $q \le 250$ in each of the three intervals confirms that the only rationals with error strictly below the critical line are six even-index Fibonacci convergents in $[1, 2]$ ($\frac{2}{1}, \frac{5}{3}, \frac{13}{8}, \frac{34}{21}, \frac{89}{55}, \frac{233}{144}$), three even-index Pell convergents in $[2, 3]$ ($\frac{5}{2}, \frac{29}{12}, \frac{169}{70}$), and three in $[0, 1]$ ($\frac{1}{2}, \frac{5}{12}, \frac{29}{70}$), with $0$ violations from below across all three intervals.

For each $\alpha \in \{\varphi, \sigma, s\}$, define the asymptotic approximation constant $L(\alpha) = \bigl(\liminf_{q \to \infty} q^2 \lvert p/q - \alpha\rvert\bigr)^{-1}$ (taken over reduced fractions $p/q$). On one side, the explicit denominator cap permits only finitely many exceptions for every $C > L$, forcing $\liminf_{q \to \infty} q^2 \lvert p/q - \alpha\rvert \ge 1/L$ from both sides; on the other, along the reduced convergents $r_n = p_n/q_n \to \alpha$ ($q_n \to \infty$) we have $\lvert r_n - \alpha'\rvert \to L$ and $q_n^2 \lvert r_n - \alpha\rvert = 1/\lvert r_n - \alpha'\rvert \to 1/L$, establishing $L(\varphi) = \sqrt{5}$ and $L(\sigma) = L(s) = 2\sqrt{2}$.

Because $2\sqrt{2} > \sqrt{5}$, between the golden and silver cases compared here, $\varphi$ attains the strictly smaller asymptotic constant, matching Hurwitz's universal threshold $\sqrt{5}$; for the integer shift $\varphi + 1$, the map $p/q \mapsto (p + q)/q$ is a bijection on reduced fractions because $\gcd(p + q, q) = \gcd(p, q)$, preserving both the reduced denominator $q$ and the residual $\lvert(p + q)/q - (\varphi + 1)\rvert = \lvert p/q - \varphi\rvert$, so $\varphi + 1$ shares the same asymptotic constant $\sqrt{5}$.

### 24.3.1.4 Twin Factorizations of $T_5(x) \pm 1$ and Rational-Polynomial Spread Closure of the Regular Pentagon {#sec-ch24-3-1-4-pentagon-chebyshev-spread}

Finally, without invoking $\pi$ or trigonometric evaluation, the algebraic relations behind [@prop-pentagon-golden-cosines] reduce completely to integer-coefficient polynomial factorizations (linking with the `QPhi` check of [§32.8.4.2](ch39-s36-lean4-zero-axiom-omega-math-architecture.md#sec-ch39-finite-algebraic-rings-qsqrt2-qphi)), while identifying their roots with the pentagon cosines uses only the final bridge $T_5(\cos\theta) = \cos(5\theta)$ together with angle intervals.

Over the integer polynomial ring, the standard Chebyshev recurrences in J. C. Mason & D. C. Handscomb (*Chebyshev Polynomials*, 2002, Chapter 2, [10.1201/9781420036114](https://doi.org/10.1201/9781420036114)), given by $T_0 = 1, T_1 = x, T_{n+1} = 2x T_n - T_{n-1}$ and $U_0 = 1, U_1 = 2x, U_{n+1} = 2x U_n - U_{n-1}$, yield $T_5(x) = 16x^5 - 20x^3 + 5x$ and $U_4(x) = 16x^4 - 12x^2 + 1$.

In rational trigonometry, spreads and spread polynomials are introduced by N. J. Wildberger (*A Rational Approach to Trigonometry*, 2007, [10.1080/10724117.2007.11974738](https://doi.org/10.1080/10724117.2007.11974738), [author manuscript](https://web.maths.unsw.edu.au/~norman/papers/RationalTrig.pdf), Sections 3 and 6, for the spread definition and examples).

Using the general spread-polynomial recurrence in J. Cigler & H.-C. Herbig (*Factorization of spread polynomials*, 2026, Sections 1–2, [10.61091/ars166-01](https://doi.org/10.61091/ars166-01)), namely $S_0(s) = 0, S_1(s) = s, S_{n+1}(s) = 2(1 - 2s)\,S_n(s) - S_{n-1}(s) + 2s$, yields $S_5(s) = 256s^5 - 640s^4 + 560s^3 - 200s^2 + 25s$. Under the substitution $s = 1 - x^2$, direct coefficient comparison in $\mathbb{Z}[x]$ and $\mathbb{Z}[s]$ establishes five exact identities:

$$
\begin{aligned}
T_5(x) + 1 &= (x + 1)(4x^2 - 2x - 1)^2, \\
T_5(x) - 1 &= (x - 1)(4x^2 + 2x - 1)^2, \\
U_4(x) &= (4x^2 - 2x - 1)(4x^2 + 2x - 1), \\
1 - T_5(x)^2 &= (1 - x^2)\,U_4(x)^2 = S_5(1 - x^2), \\
S_5(s) &= s(16s^2 - 20s + 5)^2.
\end{aligned}
$$

Setting $y = 2x$ turns the quadratic factors $4x^2 - 2x - 1$ and $4x^2 + 2x - 1$ inside the two squares into the two `live` fixed-point polynomials $y^2 - y - 1$ and $y^2 + y - 1$ of [@thm-self-application-four-fates] (and their squared factors into the corresponding squares); these two polynomials are linked by the pure algebraic translation $(y - 1)^2 + (y - 1) - 1 = y^2 - y - 1$—the polynomial core of the trigonometric identity $1 + 2\cos\frac{2\pi}{5} = 2\cos\frac{\pi}{5}$ once $\pi$ is removed.

The identity $T_5(\cos\theta) = \cos(5\theta)$ simultaneously implies $S_5(\sin^2\theta) = \sin^2(5\theta)$. Accordingly, the pentagon cosines $x_1 = \cos\frac{\pi}{5} = \frac{\varphi}{2}$ (rounding to $0.809017$) and $x_2 = \cos\frac{2\pi}{5} = \frac{\varphi - 1}{2}$ ($0.309017$) are uniquely selected by the intervals $(\frac{1}{2}, 1)$ and $(0, \frac{1}{2})$, while the two pentagon spreads are the nonzero double roots of $S_5(s) = 0$, namely $s_1 = 1 - x_1^2 = \frac{3 - \varphi}{4} = \frac{5 - \sqrt{5}}{8}$ ($0.345492$) and $s_2 = 1 - x_2^2 = \frac{2 + \varphi}{4} = \frac{5 + \sqrt{5}}{8}$ ($0.904508$).

They satisfy the purely rational elementary symmetric invariants $s_1 + s_2 = \frac{5}{4}$ and $s_1 s_2 = \frac{5}{16}$ alongside the double-angle linear identities $1 - 2s_1 = x_2$ and $1 - 2s_2 = -x_1$; multiplying $(3 - \varphi)(\varphi + 1) = 2 + \varphi$ directly gives the exact spread ratio $s_2 / s_1 = \varphi + 1 = \varphi^2$ ($2.618034$, reciprocal $s_1 / s_2 = \varphi^{-2}$ rounding to $0.381966$).

Because $16s^2 - 20s + 5$ has discriminant $80 = 16 \cdot 5$ (non-square in $\mathbb{Q}$), neither nontrivial pentagon cosines nor nontrivial pentagon spreads lie in $\mathbb{Q}$, requiring precisely the quadratic extension $\mathbb{Q}(\sqrt{5}) = \mathbb{Q}(\varphi)$ without any trigonometric evaluation.

Thus the pentagon cosines remain inside a quadratic algebraic field; when an angle equals its own cosine ($\cos\theta^* = \theta^*$), the literature remark on transcendence appears in Section 24.4 [@rem-banach-dottie-hairy-ball-literature], and the incommensurability corollary with $\pi$ appears in Section 24.5 [@rem-dottie-angle-incommensurable].

**Evidence Boundary and Companion Archive (`ARGUED` / `NUM`).** The matrix powers and Cassini–d'Ocagne identities, closed-form error bounds and reciprocal-conjugate shifted duality, balanced-ternary classification counts, unimodular uniqueness, and elliptic-order proofs, quadratic-norm barriers and asymptotic-constant comparison, and Chebyshev and fifth-spread identities above are established by this section's written arguments (`ARGUED`). Classical background is drawn from the literature cited above, while single-step residuals, cross-ratio linearization, the uniform Hurwitz lower bound, and the Fibonacci asymptotic limit refer to the five `trureturing` declarations cited in §§24.3.1.1 and 24.3.1.3.

The companion finite enumerations, dual-working-precision Arb enclosures, and standalone auxiliary Lean check (not counted toward the theorem tally of the book's pinned `trureturing` ledger) are preserved as `NUM` evidence by `loning` under [Issue #1190](https://github.com/the-omega-institute/trureturing-books/issues/1190) in the [pinned verification archive](https://gist.github.com/loning/855b1541c06856ebc2014216057f1d30/e0d93c62fe5b39598858cf8b7948bcdf176f9f6e):

- `cycle19_golden_self_reference_check` ([`golden_self_reference_check.lean`](https://gist.githubusercontent.com/loning/855b1541c06856ebc2014216057f1d30/raw/e0d93c62fe5b39598858cf8b7948bcdf176f9f6e/golden_self_reference_check.lean)): standalone auxiliary Lean declaration with no explicit imports;
- [`SHA256SUMS`](https://gist.githubusercontent.com/loning/855b1541c06856ebc2014216057f1d30/raw/e0d93c62fe5b39598858cf8b7948bcdf176f9f6e/SHA256SUMS): SHA-256 `5f112bb611452a3aea5f1da0277e05a9b8f507dbc85376ba4733f0054f6d8302`.
