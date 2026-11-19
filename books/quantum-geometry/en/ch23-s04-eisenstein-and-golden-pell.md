# 23.4 Formal Proofs of Eisenstein Shear Invariance and the Golden Pell Identity {#sec-ch23-2}

Three kernel-verified theorems in `CrossingNormForm` establish the unimodular shear reduction, constant discriminant $\Delta = -3$, and identical value range of $\operatorname{Qform}(t, \cdot, \cdot)$.

::: {.theorem #thm-qform-eq-eisnorm title="Unimodular Shear Reduction of the Crossing Form to the Principal Eisenstein Norm" lean="D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm"}
For all integers $t, P, Q \in \mathbb{Z}$, the crossing form $\operatorname{Qform}(t, P, Q)$ reduces under the explicit unimodular substitution $(P, Q) \mapsto (P - (t + 1)Q,\; Q)$ to the principal Eisenstein norm form:

$$
\operatorname{Qform}(t, P, Q) \;=\; \operatorname{eisNorm}\bigl(P - (t + 1)Q,\; Q\bigr).
$$
:::

::: proof
Expanding the right-hand side according to [@def-qform-and-eisnorm] with $x = P - (t + 1)Q$ and $y = Q$ gives

$$
\begin{aligned}
\operatorname{eisNorm}\bigl(P - (t + 1)Q,\; Q\bigr)
&= \bigl(P - (t + 1)Q\bigr)^2 + \bigl(P - (t + 1)Q\bigr)Q + Q^2 \\
&= P^2 - 2(t + 1)PQ + (t + 1)^2 Q^2 + PQ - (t + 1)Q^2 + Q^2 \\
&= P^2 - (2t + 1)PQ + \bigl((t^2 + 2t + 1) - (t + 1) + 1\bigr)Q^2 \\
&= P^2 - (2t + 1)PQ + (t^2 + t + 1)Q^2 = \operatorname{Qform}(t, P, Q).
\end{aligned}
$$

In Lean, unfolding `Qform` and `eisNorm` followed by `ring` verifies the identity directly. The full proof is checked by the Lean kernel.
:::

Why does the integer shear $\begin{pmatrix} 1 & -(t+1) \\ 0 & 1 \end{pmatrix} \in \mathrm{SL}_2(\mathbb{Z})$ collapse $\operatorname{Qform}(t, P, Q)$ back to $x^2 + xy + y^2$ for every $t \in \mathbb{Z}$? Because its discriminant $\Delta = b^2 - 4ac$ is locked identically at $-3$, independent of $t$.

::: {.lemma #lem-qform-discriminant title="Constant Discriminant Δ = −3 of the Crossing Form Family" lean="D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_discriminant"}
For every integer $t \in \mathbb{Z}$, the discriminant of $\operatorname{Qform}(t, P, Q)$ is identically $-3$:

$$
(2t + 1)^2 - 4(t^2 + t + 1) = -3.
$$
:::

::: proof
Expanding $(2t + 1)^2 - 4(t^2 + t + 1) = (4t^2 + 4t + 1) - (4t^2 + 4t + 4)$ cancels $4t^2$ and $4t$ identically, leaving $-3$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="norm-lattice" preset="shear" height="500"}
**The basis slides; the cell keeps its area.** In the complex plane $t$ runs from $-1$ to $2$: the points and circles stay put, and only the amber basis vector $u_2$ slides along the amber dashed line, shearing the magenta cell while its area stays $\sqrt{3}/2$. The discriminant of the form is $-4$ times the square of that area, hence always $-3$ ([@lem-qform-discriminant]).
:::

Because the shear map $(P, Q) \mapsto (P - (t+1)Q, Q)$ is a bijection on $\mathbb{Z} \times \mathbb{Z}$ with explicit integer inverse $(x, y) \mapsto (x + (t+1)y, y)$, the set of integers represented by $\operatorname{Qform}(t, \cdot, \cdot)$ is independent of $t$ and coincides with the set of Eisenstein/Löschian norms.

::: {.corollary #cor-qform-range-eq-eisnorm title="Range Invariance: Every Crossing Form Represents Exactly the Eisenstein Norms" lean="D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm"}
For every integer $t \in \mathbb{Z}$, the range (`Set.range`) of $(P, Q) \mapsto \operatorname{Qform}(t, P, Q)$ on $\mathbb{Z} \times \mathbb{Z}$ equals the range of $(x, y) \mapsto \operatorname{eisNorm}(x, y)$:

$$
\operatorname{ Set.range }\bigl(\lambda p : \mathbb{Z} \times \mathbb{Z} \Rightarrow \operatorname{Qform}(t, p.1, p.2)\bigr)
\;=\;
\operatorname{ Set.range }\bigl(\lambda p : \mathbb{Z} \times \mathbb{Z} \Rightarrow \operatorname{eisNorm}(p.1, p.2)\bigr).
$$
:::

::: proof
By set extensionality: ($\subseteq$) if $n = \operatorname{Qform}(t, P, Q)$, then [@thm-qform-eq-eisnorm] gives $n = \operatorname{eisNorm}(P - (t+1)Q, Q)$ in the right-hand range; ($\supseteq$) if $n = \operatorname{eisNorm}(x, y)$, evaluating $\operatorname{Qform}(t, x + (t+1)y, y)$ via [@thm-qform-eq-eisnorm] and cancelling $(x + (t+1)y) - (t+1)y = x$ yields $\operatorname{eisNorm}(x, y) = n$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="norm-lattice" preset="range" height="500"}
**Every $t$ takes the same values.** In integer coordinates $t$ runs from $-1$ to $2$: each row of points slides along itself (the thin lines trace the paths) and the cyan ellipse leans further over; at every integer $t$ the points fill the integer grid again, and the values lit at the bottom right are always 0, 1, 3, 4, 7, 9, 12, 13 ([@cor-qform-range-eq-eisnorm]).
:::

Alongside the positive-definite hexagonal norm lock of discriminant $\Delta = -3 < 0$, let us examine the **indefinite hyperbolic norm lock** of discriminant $\Delta = +5 > 0$ in the real quadratic ring of golden integers $\mathbb{Z}[\varphi]$ (where $\varphi = \frac{1 + \sqrt{5}}{2}$ satisfies $\varphi^2 = \varphi + 1$, whose uniqueness as a positive fixed point of $x \mapsto 1 + 1/x$ will be proved in [Chapter 24](ch24-cosine-fixed-points-and-self-reference.md)).

In `D5/S0/Carrier/Ring` and `D5/S0/Carrier/Norm`, golden integers and their field norm are formalized as follows.

::: {.definition #def-golden-int-and-norm title="The Golden Integer Ring GoldenInt and Its Quadratic Norm" lean="D5/S0/Carrier/Ring.GoldenInt D5/S0/Carrier/Norm.norm"}
A **golden integer** (the structure [`GoldenInt`](lean:D5/S0/Carrier/Ring.GoldenInt) in Lean) is a pair of integers $(a, b) \in \mathbb{Z} \times \mathbb{Z}$ representing $g = a + b\varphi \in \mathbb{Z}[\varphi]$, with componentwise addition and multiplication reduced by $\varphi^2 = \varphi + 1$:

$$
(a_1, b_1) \cdot (a_2, b_2) \;:=\; \bigl(a_1 a_2 + b_1 b_2,\; a_1 b_2 + b_1 a_2 + b_1 b_2\bigr).
$$

For any $g = (a, b) \in \mathrm{GoldenInt}$, its **golden norm** ([`norm`](lean:D5/S0/Carrier/Norm.norm) $g$, equal to the product of $g$ with its Galois conjugate $\bar{g} = (a + b) - b\varphi$) is

$$
\operatorname{norm}(g) \;:=\; a^2 + ab - b^2 \in \mathbb{Z}.
$$
:::

::: {.viz src="norm-lattice" preset="norm" height="500"}
**The golden norm is the area of a rectangle.** Draw $g = a + b\varphi$ in the $(g, \bar{g})$ plane: the amber $g = 2 + \varphi$ and the origin span a magenta rectangle of area $g\bar{g} = 2^2 + 2 \cdot 1 - 1^2 = 5$; every point of the magenta hyperbolas spans a rectangle of area $\pm 5$, and the grey hyperbolas belong to the other norms.
:::

Because $\varphi + \bar{\varphi} = 1$, the **algebraic trace** of $g = a + b\varphi$ is the integer linear combination $\operatorname{trace}(g) = g + \bar{g} = 2a + b$. Subtracting $5b^2$ from the squared trace $(2a + b)^2$ yields the **Golden Pell identity** bridging trace coordinates and the quadratic norm.

::: {.proposition #prop-pell-form-eq-four-mul-norm title="The Golden Pell Discriminant Form Equals Four Times the Golden Norm" lean="D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm"}
For every golden integer $g = (a, b) \in \mathrm{GoldenInt}$, the Pell quadratic form in the trace coordinate $2a + b$ and second coordinate $b$ equals four times $\operatorname{norm}(g)$:

$$
(2a + b)^2 - 5b^2 \;=\; 4\,\operatorname{norm}(g).
$$
:::

::: proof
Unfolding `norm_def` from [@def-golden-int-and-norm] gives $4\,\operatorname{norm}(g) = 4(a^2 + ab - b^2) = 4a^2 + 4ab - 4b^2$, which matches the expansion $(2a + b)^2 - 5b^2 = (4a^2 + 4ab + b^2) - 5b^2 = 4a^2 + 4ab - 4b^2$ in $\mathbb{Z}$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="norm-lattice" preset="pell" height="500"}
**Read at 45°: the trace and the Pell identity.** The shadow on the cyan diagonal is the trace $2a + b = 5$, the one on the dashed diagonal is $\sqrt{5}\,b$; $5^2 - 5 \cdot 1^2 = 20 = 4 \times 5$, so in these new axes the magenta hyperbola is $x^2 - 5y^2 = 20$ ([@prop-pell-form-eq-four-mul-norm]).
:::

In `GoldenPell`, [@prop-pell-form-eq-four-mul-norm] serves as the exact bridge for the theorem [`pell_pm_four_iff_signed_lucas_fib`](lean:D5/S3/Arith/GoldenPell.pell_pm_four_iff_signed_lucas_fib): an integer pair $(x, y) \in \mathbb{Z}^2$ satisfies the Pell equation

$$
x^2 - 5y^2 = \pm 4
$$

**if and only if** $g = \bigl(\frac{x-y}{2}, y\bigr) \in \mathrm{GoldenInt}$ is a unit of norm $\operatorname{norm}(g) = \pm 1$ ([`isUnit_iff_norm_eq_one_or_neg_one`](lean:D5/S0/Carrier/Units.isUnit_iff_norm_eq_one_or_neg_one)), which holds **if and only if** $(x, y) = (\pm L_n, \pm F_n)$ is a simultaneously signed integer-indexed Lucas–Fibonacci pair!

::: {.viz src="norm-lattice" preset="units" height="500"}
**Multiply by $\varphi$: hopping along the hyperbola.** Starting from $1$, each multiplication by $\varphi$ makes the amber point hop between the magenta hyperbolas $g\bar{g} = +1$ and $-1$: the rectangle grows long and thin while its area flips between $+1$ and $-1$. The pairs $(2a + b, b)$ beside the points run $(2, 0)$, $(1, 1)$, $(3, 1)$, $(4, 2)$, $(7, 3)$: exactly $(L_n, F_n)$.
:::

Let us test both quadratic norm locks ($\Delta = -3$ and $\Delta = +5$) by hand on concrete integer coordinates.

::: {.example #ex-eisenstein-and-golden-pell-lattice title="Explicit Calculation of the Eisenstein Shear (t = 2) and Golden Pell Lucas–Fibonacci Lattice"}
**Part 1: $\Delta = -3$ Eisenstein crossing shear at $t = 2$.** From [@def-qform-and-eisnorm], setting $t = 2$ gives

$$
\operatorname{Qform}(2, P, Q) = P^2 - 5PQ + 7Q^2, \qquad \Delta = 5^2 - 4\times 7 = 25 - 28 = -3.
$$

At $(P, Q) = (8, 3)$, direct evaluation gives $\operatorname{Qform}(2, 8, 3) = 64 - 120 + 63 = 7$. Applying the unimodular shear of [@thm-qform-eq-eisnorm], $x = P - (t+1)Q = 8 - 3\times 3 = -1$ and $y = Q = 3$, immediately recovers the principal hexagonal norm:

$$
\operatorname{eisNorm}(-1, 3) = (-1)^2 + (-1)(3) + 3^2 = 1 - 3 + 9 = 7!
$$

For every $t \in \mathbb{Z}$, the represented values remain locked onto the Löschian norm set $\{0, 1, 3, 4, 7, 9, 12, 13, 16, 19, 21, \dots\}$.

**Part 2: $\Delta = +5$ Golden Pell hyperbola and Lucas–Fibonacci pairs.** Evaluate powers of the fundamental unit $\varphi^n = a_n + b_n\varphi \in \mathrm{GoldenInt}$:

| Index $n$ | Golden Coordinates $g_n = (a_n, b_n)$ | Norm $\operatorname{norm}(g_n) = a_n^2 + a_n b_n - b_n^2$ | Trace $x_n = 2a_n + b_n = L_n$ | Second Coord $y_n = b_n = F_n$ | Pell Identity $x_n^2 - 5y_n^2 = 4\operatorname{norm}(g_n)$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $0$ | $(1, 0)$ | $+1$ | $2(1)+0 = 2$ | $0$ | $2^2 - 5(0)^2 = +4$ |
| $1$ | $(0, 1)$ | $-1$ | $2(0)+1 = 1$ | $1$ | $1^2 - 5(1)^2 = -4$ |
| $2$ | $(1, 1)$ | $+1$ | $2(1)+1 = 3$ | $1$ | $3^2 - 5(1)^2 = +4$ |
| $3$ | $(1, 2)$ | $-1$ | $2(1)+2 = 4$ | $2$ | $4^2 - 5(2)^2 = -4$ |
| $4$ | $(2, 3)$ | $+1$ | $2(2)+3 = 7$ | $3$ | $7^2 - 5(3)^2 = +4$ |
| $5$ | $(3, 5)$ | $-1$ | $2(3)+5 = 11$ | $5$ | $11^2 - 5(5)^2 = -4$ |

Pinning the golden norm to $\operatorname{norm}(g) = \pm 1$ via [@prop-pell-form-eq-four-mul-norm] locks $(x, y) = (2a + b, b)$ onto the discrete Lucas–Fibonacci lattice $(L_n, F_n)$!
:::

::: {.viz src="norm-lattice" height="560"}
**Lattices and their norms: the full lab.** Two scenes share one rail: the Eisenstein scene drives the parameter $t$ and switches between the integer coordinates $(P, Q)$ and the complex plane; the golden scene counts multiplications by $\varphi$ and can turn the axes by 45° to read off the trace. Click any lattice point to make it the amber current point.
:::
