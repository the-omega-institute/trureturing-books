# 24.3 The Unique Algebraic Golden Lock: $x = 1 + 1/x$ and $\varphi = \frac{1+\sqrt{5}}{2}$ {#sec-ch24-3}

Before stepping into the cosine self-referential equation $\cos\theta = \theta$ (Section 24.4), let us examine the cleanest **rational self-referential fixed point** on the positive real half-line $(0, +\infty)$:

Combine the two elementary arithmetic operations "add $1$" and "invert $1/x$" into the continued-fraction feedback loop

$$
x_{k+1} = 1 + \frac{1}{x_k}, \qquad x_0>0.
$$

A finite expansion has only finitely many fraction layers, with the initial value $x_0$ still at the bottom. The infinite continued fraction $1+1/(1+1/(\cdots))$ denotes the limit of these truncations, whose convergence must be established separately; it is not equal to every finite $x_{k+1}$. The example below gives a direct convergence argument.

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

Golden self-reference is a length relation inside the regular pentagon: a regular pentagon of unit side has diagonals of length $2\cos\frac{\pi}{5} = \varphi$. Thus $\varphi$ is a cosine reading as well, taken at $\frac{\pi}{5}$ and landing in the quadratic field $\mathbb{Q}(\sqrt{5})$; what happens arithmetically when an angle equals its own cosine ($\cos\theta^* = \theta^*$), and whether such an angle can be commensurable with $\pi$, are established in the literature remarks [@rem-banach-dottie-hairy-ball-literature] and [@rem-dottie-angle-incommensurable] of Section 24.4.
