# 29.1 Pythagoras, "All Is Number," and the Four-Tier Escape of Number {#sec-coda-pythagoras-all-is-number}

If we compress all thirty-nine chapters of this monograph back into the foundational seed of mathematical civilization, we find that the entire architecture was already latent twenty-five centuries ago in the twin mottoes of the Pythagorean school: **the Pythagorean Theorem ($a^2 + b^2 = c^2$)** and **"All Is Number" ($\pi\alpha\nu\tau\alpha\ \dot{\alpha}\rho\iota\theta\mu\acute{o}\varsigma$ / 万物皆数)**. Viewed through Clifford geometric algebra and a formal proof kernel, these two ancient principles unfold as a three-act geometric drama.

## 29.1.1 Act I: The True Face of the Pythagorean Theorem—1D Segments Cannot Add, 2D Areas Conserve {#sec-coda-pythagoras-act1}

Why can two orthogonal legs $\mathbf{a} \perp \mathbf{b}$ of a right triangle never add linearly as one-dimensional lengths ($a + b \neq c$), yet become strictly additive the moment we **square them** ($a^2 + b^2 = c^2$)?

In the Clifford geometric algebra $\mathcal{Cl}_{3,0}(\mathbb{R})$, a single line of algebra reveals the mechanism. Treat the orthogonal legs as vectors satisfying $\mathbf{a}\cdot\mathbf{b} = 0$, so the hypotenuse vector is $\mathbf{c} = \mathbf{a} + \mathbf{b}$. Squaring $\mathbf{c}$ via the geometric product yields

$$
\mathbf{c}^2 = (\mathbf{a} + \mathbf{b})(\mathbf{a} + \mathbf{b}) = \mathbf{a}^2 + \mathbf{b}^2 + (\mathbf{a}\mathbf{b} + \mathbf{b}\mathbf{a}).
$$

Because $\mathbf{a} \perp \mathbf{b}$, the symmetric inner-product part $\mathbf{a}\cdot\mathbf{b} = \frac{1}{2}(\mathbf{a}\mathbf{b} + \mathbf{b}\mathbf{a}) = 0$ vanishes, reducing the cross term to the sum of two exterior bivectors of opposite chirality (oriented area elements):

$$
\mathbf{a}\mathbf{b} + \mathbf{b}\mathbf{a} = \mathbf{a}\wedge\mathbf{b} + \mathbf{b}\wedge\mathbf{a} = \mathbf{a}\wedge\mathbf{b} - \mathbf{a}\wedge\mathbf{b} = 0.
$$

The clockwise and counterclockwise bivector areas cancel identically, leaving only the scalar sum of squares:

$$
c^2 = a^2 + b^2.
$$

In other words, **one-dimensional projected segments are locked to incompatible axes and cannot be added across a $90^\circ$ turn; only when we ascend to two-dimensional squares (areas/norms) do opposite directional chiralities cancel in the antisymmetric exterior product, allowing orthogonal components to merge into a conserved total!**

Normalizing the hypotenuse to unit radius $c = 1$ transforms the Pythagorean theorem $a^2 + b^2 = 1$ into the **mother conservation law** governing all ten parts of this book:

1. **Quantum Mechanics (Parts I–III)**: The particle-like inner-product projection $\cos\theta$ and the wave-like exterior bivector gate area $\sin\theta$ obey $\cos^2\theta + \sin^2\theta = 1$—Born's probability conservation $P(0) + P(1) = 1$ ([`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)) and the inner-product parallelogram/Pythagorean norm laws ([`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) and [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)) are simply the Pythagorean theorem on the unit circle;
2. **Special Relativity (Part V, Chapter 17)**: In Minkowski spacetime, the proper-time rate $d\tau/dt$ and the normalized spatial speed $v/c$ obey $(d\tau/dt)^2 + (v/c)^2 = 1$ (the orthogonal rearrangement of $d\tau^2 = dt^2 - dx^2/c^2$, corresponding to hyperbolic Bogoliubov norm conservation [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation))—a photon experiences zero proper time for the purely geometric reason that its unit Pythagorean hypotenuse is projected entirely onto the spatial axis $v/c = 1$;
3. **Diophantine Number Theory and Spinor Algebra (Part VI, Chapter 23)**: The unit quaternion sphere $S^3$ norm $s^2 + x^2 + y^2 + z^2 = 1$, the Eisenstein quadratic norm form identity ([`Qform_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm)), and the golden-integer Pell norm identity ([`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)) express the higher-dimensional Pythagorean theorem across orthogonal and quadratic lattices.

## 29.1.2 Act II: Hippasus's Crack and the Indestructible Pell Remainder $m^2 - 2n^2 = \pm 1$ {#sec-coda-pythagoras-act2}

Yet this very Pythagorean theorem shattered the original static rational sphere of the early Pythagoreans.

Take the simplest isosceles right triangle: $a = 1, b = 1$, sitting along the symmetric $45^\circ = \pi/4$ bisector between two orthogonal axes—the exact angle at which the Bell–CHSH inequality attains Tsirelson's quantum bound $2\sqrt{2}$ in Part IV (Chapter 13). The Pythagorean theorem gives $c^2 = 1^2 + 1^2 = 2$, so $c = \sqrt{2}$.

Under the early Pythagorean dogma that "all is a ratio of whole numbers," there should exist positive integers $m, n$ with $(m/n)^2 = 2$, or $m^2 = 2n^2$. Placed inside the prime orthogonal coordinate lattice of Part VI (Chapter 22), the fundamental theorem of arithmetic renders an immediate verdict: each prime $p$ spans an independent orthogonal axis in $\mathbb{Q}_{>0}^\times \cong \bigoplus_p \mathbb{Z}\,\mathbf{e}_p$; along the $p = 2$ axis, the $2$-adic valuation $v_2(m^2) = 2v_2(m)$ is always **even**, whereas $v_2(2n^2) = 2v_2(n) + 1$ is always **odd**. Because an even integer can never equal an odd integer, $m^2 = 2n^2$ has no nonzero integer solution!

Since no ratio of whole numbers ever reaches $\sqrt{2}$, all the integer grid can still do is count in the verbal sense of `shǔ`: approach step by step and write down how far off each step remains. Strip off the integer part of $\sqrt{2}$ and what is left, $s = \sqrt{2} - 1 \approx 0.414$, is the amount by which the $45^\circ$ diagonal exceeds the unit side; read as a slope, it is the "silver slope" defined below. Line up its multiples against the integer marks: $1\cdot s \approx 0.414$ misses $0$ by $+0.414$; $2s \approx 0.828$ misses $1$ by $-0.172$; $5s \approx 2.071$ misses $2$ by $+0.071$; $12s \approx 4.971$ misses $5$ by $-0.029$. Try $m = 1, 2, 3, \dots$ in turn and keep only the multiples that come closer to an integer than every multiple before them: you get exactly $1, 2, 5, 12, \dots$ (checked by script for $m < 3000$). Each is twice its predecessor plus the one before that, and the integers they approach, $0, 1, 2, 5, \dots$, are the same sequence shifted back by one. At every step the error changes sign and shrinks by a factor of $s$: smaller and smaller, but never zero. The frozen definitions and theorems below turn this counting machine into exact statements.

::: {.definition #def-ch29-pell-silver-slope title="Pell Numbers, Companion Pell Numbers, and the Silver Slope" lean="D5/S1/Recurrence/PellCompanionGcd.P D5/S1/Recurrence/PellCompanionGcd.Q D5/S1/Words/Mechanical/SilverSlopeAbelianPeriodDefs.silverSlope"}
The Pell numbers $P : \mathbb{N} \to \mathbb{N}$ and the companion Pell numbers $Q : \mathbb{N} \to \mathbb{N}$ obey the same second-order recurrence with different initial values:

$$
\begin{aligned}
&P_0 = 0,\quad P_1 = 1,\quad P_{n+2} = 2P_{n+1} + P_n,\\
&Q_0 = 1,\quad Q_1 = 1,\quad Q_{n+2} = 2Q_{n+1} + Q_n.
\end{aligned}
$$

The silver slope is the real number $s = \sqrt{2} - 1$.
:::

Thus $P = 0, 1, 2, 5, 12, 29, 70, 169, \dots$ and $Q = 1, 1, 3, 7, 17, 41, 99, 239, \dots$.

::: {.lemma #lem-ch29-pell-companion-step title="First-Order Cross Recurrence and Coprimality of Pell and Companion Pell Numbers" lean="D5/S1/Recurrence/PellCompanionGcd.pell_companion_step D5/S1/Recurrence/PellCompanionGcd.pell_companion_coprime"}
For every natural number $n$,

$$
P_{n+1} = P_n + Q_n,\qquad Q_{n+1} = 2P_n + Q_n,
$$

and $P_n$ and $Q_n$ are coprime: $\gcd(P_n, Q_n) = 1$.
:::

::: proof
Both recurrences are proved together by induction on $n$. For $n = 0$, $P_1 = 1 = P_0 + Q_0$ and $Q_1 = 1 = 2P_0 + Q_0$. The inductive step unfolds $P_{n+2}$ and $Q_{n+2}$ by definition and substitutes the induction hypothesis; both sides become the same linear combination of $P_n$ and $Q_n$, and linear arithmetic (`omega`) closes the goal. Coprimality is again an induction on $n$: $\gcd(0, 1) = 1$; in the inductive step the recurrence just proved writes the pair as $\bigl(P_n + Q_n,\ P_n + (P_n + Q_n)\bigr)$, and subtracting the first number from the second, then $P_n$ from the first, leaves the gcd unchanged, so the goal falls back to $\gcd(Q_n, P_n) = 1$. This is the Euclidean algorithm run one step backwards. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch29-silver-pell-remainder title="The Pell Remainder of the Silver Slope: Exact Error, $\pm 1$ Determinant, and Phase Mass" lean="D5/S1/Words/Mechanical/SilverSlopeAbelianPellArithmetic.silverPell_error_formula D5/S1/Words/Mechanical/SilverSlopeAbelianPellArithmetic.silverPell_determinant D5/S1/Words/Mechanical/SilverSlopeAbelianPellArithmetic.silver_phase_mass"}
For every natural number $k$:

1. in $\mathbb{R}$, $P_{k+1}\,s - P_k = (-1)^k\,s^{k+1}$;
2. in $\mathbb{Z}$, $P_{k+2}\,P_k - P_{k+1}^2 = (-1)^{k+1}$;
3. in $\mathbb{R}$, $\bigl(P_{k+2} + s\,P_{k+1}\bigr)\,s^{k+1} = 1$.
:::

::: proof
All three use only two facts: the recurrence $P_{n+2} = 2P_{n+1} + P_n$, and the quadratic relation $s^2 + 2s = 1$, which follows from $(\sqrt{2})^2 = 2$. For item 1, Lean first proves the two-step recurrence $P_{k+3}\,s - P_{k+2} = s^2\,(P_{k+1}\,s - P_k)$, unfolding the recurrence and simplifying with $s^2 = 1 - 2s$ and $s^3 = 5s - 2$. Strong induction on $k$ then finishes: for $k = 0$, $1\cdot s - 0 = s$; for $k = 1$, $2s - 1 = -s^2$; after that, every two steps multiply the error by $s^2$ and leave the sign $(-1)^k$ unchanged. Item 2 is an induction on $k$: for $k = 0$, $P_2P_0 - P_1^2 = -1$; in the inductive step, substituting the recurrence for $P_{k+3}$ and $P_{k+2}$ shows by ring arithmetic that the new determinant is exactly the negative of the old one, so the sign flips at every step. Item 3 is also an induction on $k$: for $k = 0$, $(2 + s)\,s = 1$; after substituting $P_{k+3} = 2P_{k+2} + P_{k+1}$, the inductive step differs from the previous one by $P_{k+2}\,s^{k+1}(s^2 + 2s - 1) = 0$, so the left side falls back to the previous value $1$. The full proof is checked by the Lean kernel.
:::

**From the error to the unit remainder (a manual derivation).** By [@lem-ch29-pell-companion-step], $Q_{k+1} = 2P_k + Q_k = P_k + P_{k+1}$, so item 1 is the error of $\sqrt{2}$ itself: $P_{k+1}\,s - P_k = P_{k+1}\sqrt{2} - Q_{k+1}$. Likewise $P_{k+2} - P_{k+1} = Q_{k+1}$, so the bracket in item 3 is $P_{k+2} + s\,P_{k+1} = Q_{k+1} + P_{k+1}\sqrt{2}$. Multiplying the two:

$$
\begin{aligned}
Q_{k+1}^2 - 2P_{k+1}^2
&= \bigl(Q_{k+1} - P_{k+1}\sqrt{2}\bigr)\bigl(Q_{k+1} + P_{k+1}\sqrt{2}\bigr)\\
&= -(-1)^k\,s^{k+1}\bigl(P_{k+2} + s\,P_{k+1}\bigr) = (-1)^{k+1}.
\end{aligned}
$$

With $n = k + 1$ this is the unit Pell remainder $Q_n^2 - 2P_n^2 = (-1)^n$ for $n \ge 1$: $1^2 - 2\cdot 1^2 = -1$, $3^2 - 2\cdot 2^2 = +1$, $7^2 - 2\cdot 5^2 = -1$, …, $99^2 - 2\cdot 70^2 = 9801 - 9800 = +1$. The narrow side $Q_n - P_n\sqrt{2} = (-1)^n s^n$ measures how far the lattice point $(P_n, Q_n)$ sits off the line $Q = \sqrt{2}\,P$; it changes sign and shrinks by a factor of $s$ at each step. The wide side $Q_n + P_n\sqrt{2} = s^{-n} = (1 + \sqrt{2})^n$ (item 3, using $s\,(1 + \sqrt{2}) = 1$) grows by a factor of $1 + \sqrt{2}$ at each step. Their product is always $\pm 1$: the error cannot vanish, because multiplied by a finite wide side it must still give $\pm 1$. Without items 1 and 3, item 2 together with [@lem-ch29-pell-companion-step] leads to the same conclusion: substituting $Q_n = P_{n+1} - P_n$ and $P_{n+2} = 2P_{n+1} + P_n$ gives $Q_n^2 - 2P_n^2 = -\bigl(P_{n+2}P_n - P_{n+1}^2\bigr) = (-1)^n$, and this route covers $n = 0$ as well ($1^2 - 2\cdot 0^2 = 1$).

The error never vanishes, but is it the smallest possible? The next theorem says yes: until the next Pell number, no multiple comes closer to an integer.

::: {.theorem #thm-ch29-silver-best-approximation title="Best-Approximation Lower Bound for the Silver Slope" lean="D5/S1/Words/Mechanical/SilverSlopeAbelianPellArithmetic.silver_best_approximation"}
Let $k, m$ be natural numbers with $0 < m < P_{k+2}$. Then for every integer $z$, in $\mathbb{R}$,

$$
s^{k+1} \le |m\,s - z|.
$$
:::

::: proof
The core is an integer-lattice lemma that knows nothing about $\sqrt{2}$ (`unimodular_opposite_error_bound`): let $\alpha, d, e$ be real numbers and let the integer pairs $(q, p)$ and $(q', p')$ satisfy $qp' - pq' = 1$, $q' > 0$, $0 < m < q$, and have errors of opposite signs, $q\alpha - p = d > 0$ and $q'\alpha - p' = -e < 0$; then $e \le |m\alpha - z|$ for every integer $z$. The reason is that an integer matrix of determinant $1$ is invertible over the integers: $(m, z) = a\,(q, p) + b\,(q', p')$ with integers $a = mp' - zq'$ and $b = zq - mp$, and the errors combine with the same coefficients, $m\alpha - z = ad - be$. Since $0 < m = aq + bq' < q$, $a \ge 1$ forces $b \le -1$, and $a \le 0$ forces $b \ge 1$. In both cases $ad$ and $-be$ never have opposite signs, so they cannot cancel, and $|be| \ge e$; hence the absolute value is at least $e$. For the silver slope, take the neighbouring pairs $(P_{k+2}, P_{k+1})$ and $(P_{k+1}, P_k)$: item 1 of [@thm-ch29-silver-pell-remainder] gives the opposite errors $(-1)^{k+1}s^{k+2}$ and $(-1)^k s^{k+1}$, and item 2 gives the determinant $(-1)^{k+1}$. For odd $k$ the lemma applies directly; for even $k$ the determinant is $-1$, and Lean negates $s$, the second entries of both pairs, and $z$ before applying it, then restores the original quantity with $|-x| = |x|$. The positivity $P_{k+1}, P_{k+2} > 0$ comes from $P_{n+1} = P_n + Q_n$ together with the oddness of $Q_n$ (`companion_odd`). The full proof is checked by the Lean kernel.
:::

(A manual derivation.) Because $m\,s - z = m\sqrt{2} - (m + z)$ and $m + z$ runs over all integers as $z$ does, [@thm-ch29-silver-best-approximation] says: for $0 < m < P_{k+2}$, the distance from $m\sqrt{2}$ to the nearest integer is at least $s^{k+1}$. By the error formula, $m = P_{k+1}$ and $z = P_k$ attain this bound exactly (and $0 < P_{k+1} < P_{k+2}$, so this $m$ is admissible); hence no denominator in this range approximates better than $P_{k+1}$, and the first denominator that does better is the next Pell number $P_{k+2}$, whose error is $s^{k+2}$.

::: {.example #ex-ch29-silver-pell-table title="Counting Out the First Six Steps"}
Let $\delta_k$ be the minimum of $|m\,s - z|$ over $0 < m < P_{k+2}$ and $z \in \mathbb{Z}$, found by a script that runs through every $m$. Decimals are rounded to the digits shown:

| $k$ | $Q_{k+1}/P_{k+1}$ | $P_{k+1}\,s - P_k$ | $Q_{k+1}^2 - 2P_{k+1}^2$ | $P_{k+2}$ | $\delta_k$ |
| :-: | :-: | --: | :-: | --: | --: |
| $0$ | $1/1$ | $+0.41421356$ | $-1$ | $2$ | $0.41421356$ |
| $1$ | $3/2$ | $-0.17157288$ | $+1$ | $5$ | $0.17157288$ |
| $2$ | $7/5$ | $+0.071067812$ | $-1$ | $12$ | $0.071067812$ |
| $3$ | $17/12$ | $-0.029437252$ | $+1$ | $29$ | $0.029437252$ |
| $4$ | $41/29$ | $+0.012193309$ | $-1$ | $70$ | $0.012193309$ |
| $5$ | $99/70$ | $-0.0050506339$ | $+1$ | $169$ | $0.0050506339$ |

The error column alternates in sign, and its absolute value shrinks by a factor of $s \approx 0.414$ from row to row; the fourth column takes only the values $\pm 1$; the last column equals the absolute error, and in these six rows the minimum is attained only at $m = P_{k+1}$ (the uniqueness is an observation from the enumeration; the two theorems guarantee only that the minimum equals $s^{k+1}$ and is attained at $m = P_{k+1}$). For $k = 1$, for instance, only $m = 1, 2, 3, 4$ are allowed, at distances $0.41421356$, $0.17157288$, $0.24264069$ and $0.34314575$, and the smallest is exactly $m = P_2 = 2$. The row $k = 5$ can also be checked in integers: the determinant is $P_7P_5 - P_6^2 = 169\cdot 29 - 70^2 = 4901 - 4900 = 1$, and the phase-mass bracket $P_7 + s\,P_6 = 99 + 70\sqrt{2} \approx 197.99495$ times $s^6 \approx 0.0050506339$ is exactly $1$.
:::

::: {.figure src="ch29-pell-seam"}
**The error changes sign and shrinks by the factor $s$ at every step, yet never reaches zero; $Q^2 - 2P^2$ stays $\pm 1$.** The stems are the errors $P_{k+1}\,s - P_k$ of the third column above, cyan and upwards when positive, magenta and downwards when negative. The vertical axis is logarithmic in the size of the error, so shrinking by $s \approx 0.414$ is one equal step, and every stem ends on the dashed envelope $\pm s^{k+1}$ (part 1 of [@thm-ch29-silver-pell-remainder]). Each stem carries its convergent $Q_{k+1}/P_{k+1}$; the bottom row is the fourth column, $Q_{k+1}^2 - 2P_{k+1}^2$.
:::

::: {.remark #rem-ch29-pell-convergents-literature title="$Q_n/P_n$ and the Continued-Fraction Convergents of $\sqrt{2}$ (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** Classical continued-fraction theory gives

$$
\sqrt{2} = 1 + \dfrac{1}{2 + \dfrac{1}{2 + \dfrac{1}{2 + \cdots}}},
$$

whose convergents are $1/1,\ 3/2,\ 7/5,\ 17/12,\ 41/29,\ 99/70,\ \dots$; counting from $1/1$, the $n$-th convergent is exactly $Q_n/P_n$. Lagrange's theorem from the general theory adds that every best approximation of the second kind of an irrational number $\alpha$ (a fraction $p/q$ with $|q\alpha - p| < |q'\alpha - p'|$ for every other fraction $p'/q'$ whose denominator does not exceed $q$) is a convergent. The pinned Lean library proves [@lem-ch29-pell-companion-step], [@thm-ch29-silver-pell-remainder] and [@thm-ch29-silver-best-approximation] from the recurrence alone and does not match $P, Q$ with Mathlib's continued-fraction expansion (the source file states that this identification is unproved). The identification "$Q_n/P_n$ are the continued-fraction convergents of $\sqrt{2}$" and the general theory of best approximation therefore remain literature results; the unit remainder $Q_n^2 - 2P_n^2 = (-1)^n$ and the best-approximation lower bound above do not depend on them.
:::

The determinant $P_{k+2}P_k - P_{k+1}^2 = (-1)^{k+1}$ of [@thm-ch29-silver-pell-remainder] has exactly the shape of the Fibonacci–Cassini identity $F_kF_{k+2} - F_{k+1}^2 = (-1)^{k+1}$ of the [Coda](coda.md), and its unit remainder echoes the golden-integer Pell identity $(2a + b)^2 - 5b^2 = 4\operatorname{norm}(g)$ proved in Chapter 23 ([`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)): any attempt to stitch a $90^\circ$ orthogonal area rotation onto a one-dimensional integer grid leaves an irreducible unit arithmetic seam. What Hippasus uncovered was not the failure of mathematics, but **the first seam of a larger sphere breaking through the static rational sphere**.

::: {.viz src="pythagoras-number-escape" preset="hippasus" height="500"}
**Always one cell off.** The convergents $1/1, 3/2, 7/5, 17/12, \dots$ hug the line $m = \sqrt{2}\,n$ ever more closely; the two bands on the right are the cell counts $m^2$ and $2n^2$, and in the magnifier they are always one cell apart.
:::

## 29.1.3 Act III: Reclaiming "All Is Number"—From the Verb `shǔ` to the Four-Tier Escape {#sec-coda-pythagoras-act3}

If rational numbers cannot even hold the hypotenuse $\sqrt{2}$ of a unit square, was Pythagoras wrong to proclaim that "All Is Number"?

Quite the opposite! Just as Chapter 1 revealed that the Chinese character **量** unites the verb **liáng** (the active operation of pairwise measurement) and the noun **liàng** (the truncated scalar reading), the character **数** in "万物皆数" unites two distinct dimensions:

- The 3rd-tone verb **数 (`shǔ`, to count / to compare / to iterate)**: the active operator of recursive counting, pairwise comparison, orthogonal squaring, cyclotomic halving, and self-referential feedback;
- The 4th-tone noun **数 (`shù`, a number / a coordinate mark)**: the static coordinate notch left on a ruler after the operator is truncated at a fixed stage.

When "number" is reduced to a static noun (`shù`), every number system is inevitably punctured by the next geometric operation; when "number" is restored to its generative verb (`shǔ`), each fracture of an old sphere becomes the engine that constructs the next enclosing sphere. From integers to the self-referential fixed point, the history of number is a **Four-Tier Escape of Enclosing Spheres**:

::: {.remark #rem-ch29-four-tier-sphere-table title="Four-Tier Escape of Enclosing Spheres (Includes Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book (for the classical continued-fraction, $\pi$, and cosine-fixed-point $\theta^*$ transcendence properties summarized below; golden-ratio fixed-point uniqueness is formally verified by `golden_fixed_point_unique`, and algebraic independence is marked `OPEN` in [@conj-schanuel-dottie]).**

| Sphere Tier | Number Domain & Landmark Constants | Generative Geometric / Algebraic Operator (Verb `shǔ`) | Internal Closure Law (Noun `shù`) | The Crack & Remainder Forcing Escape to the Next Sphere |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1 Sphere** | Integers $\mathbb{Z}$ & Rationals $\mathbb{Q}$<br/>(ratio marks $m/n$) | $0^\circ$ collinear Euclidean algorithm and linear addition/subtraction | Finite commensurable closure on a 1D rational ruler: $n \cdot (m/n) = m$ | $90^\circ$ orthogonal Pythagorean squaring $1^2 + 1^2 = 2$ triggers a $2$-adic parity clash (for the Pell remainder, see [@thm-ch29-silver-pell-remainder]; for the continued-fraction identification, [@rem-ch29-pell-convergents-literature]) |
| **Tier 2 Sphere** | Algebraic Numbers $\overline{\mathbb{Q}}$<br/>(diagonal $\sqrt{2}$, golden ratio $\varphi = \frac{1+\sqrt{5}}{2}$) | Finite-dimensional orthogonal Pythagorean area conservation $a^2 + b^2 = c^2$ and polynomial root extraction | Finite algebraic polyhedral closure: $x^2 - 2 = 0$, $x^2 - x - 1 = 0$ ([`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique)) | Infinite $2^k$-gon cyclotomic halving limit (for classical arc-transcendence literature notes, see [@rem-banach-dottie-hairy-ball-literature]) |
| **Tier 3 Sphere** | Elementary Period Constants<br/>(circle constant $\pi$, natural base $e$) | Infinite Pythagorean half-angle iteration $\sin(\theta/2) = \sqrt{(1-\cos\theta)/2}$ and exponential map $e^{i\theta} = \cos\theta + i\sin\theta$ | Static unit-circle and spherical period closure: $e^{i\pi} + 1 = 0$, $\cos(\pi/2) = 0$ | Arc input $\theta$ and chord projection $\cos\theta$ remain split across the operator (for nonzero algebraic residuals, see [@rem-banach-dottie-hairy-ball-literature]) |
| **Tier 4 Sphere** | Self-Referential Cosine Fixed Point<br/>(Dottie constant $\theta^*$) | Self-referential feedback $\theta_{k+1} = \cos(\theta_k)$ equating the Pythagorean leg projection $\cos\theta$ with the arc angle $\theta$ itself | Operator-coordinate unification: $\cos(\theta^*) = \theta^*$ (the real-axis projection of $\psi = \psi(\psi)$) | Classical transcendence literature in [@rem-banach-dottie-hairy-ball-literature]; algebraic-independence frontier with $\pi, e$ in open conjecture [@conj-schanuel-dottie] (`OPEN`) |

:::

Seen through this four-tier table, Pythagoras and the overarching thesis of this book converge into a single arc:

- In the **Tier 1 Sphere**, we measure back and forth along a single line and mistake rational ratios $m/n$ for the whole universe;
- The Pythagorean theorem erects an orthogonal axis and uses area conservation $1^2 + 1^2 = (\sqrt{2})^2$ to propel us into the **Tier 2 Sphere** of algebraic polyhedra;
- Applying the Pythagorean theorem infinitely many times to inscribed $2^k$-gons bends polygonal chords into circular arcs, crystallizing $\pi$ and closing the static **Tier 3 Sphere**;
- Finally, when we stop separating the measuring operator $\cos$ from the measured angle $\theta$ as "ruler" versus "reading" and ask what happens when the ruler's projected output equals its own opening angle ($\cos\theta = \theta$), the fixed point $\theta^*$ emerges and carries us into the **Tier 4 Sphere**—where the counting verb **shǔ ($\cos$)** and the counted noun **shù ($\theta$)** become one!

::: {.figure src="ch29-four-tiers"}
**Four tiers: each is broken open by the next operation.** Tier 1 is the cyan rational points $m/n$ on the number line; the magenta diagonal $\sqrt{2}$ of the unit square breaks it and opens tier 2; the cyan octagon hugging the magenta circle stands for the inscribed polygons whose limit gives tier 3 its $\pi$; the cyan curve $y = \cos\theta$ meets the dashed line $y = \theta$ at the magenta point $\theta^* \approx 0.739$, tier 4. The constants on the steps are the four rows of [@rem-ch29-four-tier-sphere-table]; the transcendence statements behind them are literature results, not formalized in this book.
:::

---
