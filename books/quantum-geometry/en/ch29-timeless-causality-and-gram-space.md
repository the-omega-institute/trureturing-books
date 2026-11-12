# Timeless Causality and the Gram Compatible Space: From the Pythagorean Pell Seam to Elliptic-Curve Tori

> *"The essence of order-independence is that sequential before-and-after time does not exist at all ... and that is precisely why causality is necessary. Because the observer is finite, the causality experienced is finite; the observer's choice is made within the causally compatible space, continuously picking points in the time field."*

Across the twenty-eight chapters of Parts I–VII, we have traveled from pairwise inner-product projections to mechanical verification inside the Lean 4 kernel. Opening **Part VIII** of the monograph, we now confront two foundational ontological questions at the summit of our geometric architecture: first, how do Pythagoras's theorem and "All Is Number" connect—through the $\pm 1$ Pell arithmetic seam—to prime duality, congruent-number elliptic-curve tori, and the spinor 3-sphere $S^3$? Second, why does the order-independent Gram matrix rigidity of Chapter 10 abolish sequential time while simultaneously grounding Spinozist causal necessity and a finite observer's freedom of choice inside the Gram elliptope?

::: {.figure src="ch29-overview"}
**Figure 29.** A map of the chapter. Panel I: four steps carrying the cyan $\mathbb{Q}$ and the magenta $\sqrt{2}$, $\pi$ and $\theta^*$; each magenta constant is the one that escaped the step below. Panel II: on the mod $4$ dial a sum of two squares lands only in the cyan cells $0$, $1$, $2$, while cell $3$, outlined in dashed magenta, stays empty ([@lem-ch29-square-residues-mod-four]). Panel III: the Gram window for $c_{AB} = \cos 60^\circ$, violet inside where $\det G > 0$ and $\det G = 0$ on the rim; the amber segment is the range open to $c_{AC}$ when $c_{BC} = \cos 45^\circ$.
:::

---

## Pythagoras, "All Is Number," and the Four-Tier Escape of Number {#sec-coda-pythagoras-all-is-number}

If we compress all thirty-nine chapters of this monograph back into the foundational seed of mathematical civilization, we find that the entire architecture was already latent twenty-five centuries ago in the twin mottoes of the Pythagorean school: **the Pythagorean Theorem ($a^2 + b^2 = c^2$)** and **"All Is Number" ($\pi\alpha\nu\tau\alpha\ \dot{\alpha}\rho\iota\theta\mu\acute{o}\varsigma$ / 万物皆数)**. Viewed through Clifford geometric algebra and a formal proof kernel, these two ancient principles unfold as a three-act geometric drama.

### Act I: The True Face of the Pythagorean Theorem—1D Segments Cannot Add, 2D Areas Conserve {#sec-coda-pythagoras-act1}

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

Normalizing the hypotenuse to unit radius $c = 1$ transforms the Pythagorean theorem $a^2 + b^2 = 1$ into the **mother conservation law** governing all eight parts of this book:

1. **Quantum Mechanics (Parts I–III)**: The particle-like inner-product projection $\cos\theta$ and the wave-like exterior bivector gate area $\sin\theta$ obey $\cos^2\theta + \sin^2\theta = 1$—Born's probability conservation $P(0) + P(1) = 1$ ([`born_probability_skeleton`](lean:D5/S3/Quantum/FiniteDimensional.born_probability_skeleton)) and the inner-product parallelogram/Pythagorean norm laws ([`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law) and [`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)) are simply the Pythagorean theorem on the unit circle;
2. **Special Relativity (Part V, Chapter 17)**: In Minkowski spacetime, the proper-time rate $d\tau/dt$ and the normalized spatial speed $v/c$ obey $(d\tau/dt)^2 + (v/c)^2 = 1$ (the orthogonal rearrangement of $d\tau^2 = dt^2 - dx^2/c^2$, corresponding to hyperbolic Bogoliubov norm conservation [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation))—a photon experiences zero proper time for the purely geometric reason that its unit Pythagorean hypotenuse is projected entirely onto the spatial axis $v/c = 1$;
3. **Diophantine Number Theory and Spinor Algebra (Part VI, Chapter 23)**: The unit quaternion sphere $S^3$ norm $s^2 + x^2 + y^2 + z^2 = 1$, the Eisenstein quadratic norm form identity ([`Qform_eq_eisNorm`](lean:D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm)), and the golden-integer Pell norm identity ([`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)) express the higher-dimensional Pythagorean theorem across orthogonal and quadratic lattices.

### Act II: Hippasus's Crack and the Indestructible Pell Remainder $m^2 - 2n^2 = \pm 1$ {#sec-coda-pythagoras-act2}

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

### Act III: Reclaiming "All Is Number"—From the Verb `shǔ` to the Four-Tier Escape {#sec-coda-pythagoras-act3}

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

## The $\pm 1$ Arithmetic Seam, Prime Duality, and the $S^3$ Projection on Elliptic Curve Tori {#sec-coda-primes-elliptic-curves}

When we look closely at the Pell remainder $m^2 - 2n^2 = \pm 1$ ([@thm-ch29-silver-pell-remainder]) left by Hippasus on the integer grid, a deeper arithmetic question immediately arises: **is this oscillation between $+1$ and $-1$ an isolated quirk of $\sqrt{2}$, or does the $\pm 1$ seam govern the splitting of prime numbers, the topology of elliptic curves, and the $\cos\theta$ projection that runs through the entire book?**

Following this $\pm 1$ crack uncovers three structural bridges uniting number theory, algebraic geometry, and quantum spinor geometry.

### Pillar 1: The $\pm 1$ Pell Seam Splits Odd Primes into "Line Primes" and "Plane Primes" {#sec-coda-pell-prime-splitting}

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

::: {.viz src="pythagoras-number-escape" preset="minus" height="500"}
**$d = 13$: first $-1$, then $+1$.** The amber convergent walks along the line $m = \sqrt{13}\,n$. At $18/5$ the gap is $m^2 - 13n^2 = -1$ (magenta, below the line), the entry for $p = 13$ in the last column of the table above; one more period on, at $649/180$, it flips to $+1$ (cyan). That the negative Pell equation of every plane prime is solvable is a literature result, recorded in the remark below.
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

::: {.viz src="pythagoras-number-escape" preset="five" height="500"}
**Plane primes and line primes.** When the circle of radius $\sqrt{p}$ passes through a lattice point, $p = a^2 + b^2$ is a plane prime, and squaring $a + bi$ gives an integer right triangle; step through the odd primes with the rail under the figure, and for $p \equiv 3 \pmod 4$ the circle touches no lattice point at all.
:::

### Pillar 2: Intersecting Two Quadratic Seams ($2 \times 2 = 4$)—From a Single Quadric to the Congruent-Number Elliptic Curve Torus {#sec-coda-congruent-elliptic-torus}

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

### Pillar 3: Finite-Field Elliptic-Curve Reduction, the Frobenius Cosine, and the $S^3 \cong \mathrm{SU}(2)$ Projection {#sec-coda-hasse-sato-tate}

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
**Counting points mod $13$.** Put $y^2 = x^3 - x$ into a grid of only $13$ numbers and check every cell: $4$ cyan lattice points, $3$ amber points with $y = 0$ and the point at infinity make $8$, six fewer than $p + 1 = 14$, so $a_{13} = 6$; the amber cosine on the right is $6/(2\sqrt{13}) \approx 0.832$. Since $13 = 3^2 + 2^2$ and $6 = 2 \cdot 3$, the deficit is twice the odd leg of the Gaussian triangle, as in item 2 above (literature result, not formalized in this book).
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

Geometrically, on the three-dimensional unit quaternion rotor sphere $S^3 \cong \mathrm{SU}(2)$—the parallelizable hypersphere defined by $s^2 + x^2 + y^2 + z^2 = 1$ with $\chi(S^3) = 0$ (cf. [@rem-hairy-ball-adams-literature])—the two-dimensional latitude sphere at polar angle $\theta \in [0, \pi]$ has radius $\sin\theta$ and surface area proportional to $\sin^2\theta$; projecting the uniform Haar measure of $S^3 \cong \mathrm{SU}(2)$ onto the normalized trace diameter $u = \frac{1}{2}\operatorname{Tr}(U) = \cos\theta \in [-1, +1]$ yields $\frac{2}{\pi}\sin^2\theta\,d\theta$.

Across the first two sections of this chapter, the Lindemann–Weierstrass theorem and T. Y. Chow's (1999) elementary-field theorem conditional on Schanuel's conjecture ([@conj-schanuel-dottie]), the splitting and inertia of primes in the Gaussian integers / negative Pell solvability for primes $p \equiv 1 \pmod 4$ / Hilbert's reciprocity law in [@rem-ch29-pell-primes-hilbert-literature], the complex elliptic-curve torus topology and abelian group law in [@rem-ch29-elliptic-torus-literature], Hasse's bound and Gauss's CM point-count derivation in [@rem-ch29-hasse-gauss-literature] and [@rem-ch29-gauss-character-application], and the Sato–Tate equidistribution theorem in the present remark are classical mathematical literature results outside the `trureturing@dev` formalization locked by this book; kernel-verified results in these sections are strictly the boxes with a `lean` attribute (such as [@lem-ch29-square-residues-mod-four], [@thm-ch29-face-prime-two-squares], [@lem-ch29-line-prime-descent], [@thm-ch29-two-squares-classification], [@thm-ch29-silver-pell-remainder], and [@thm-ch29-silver-best-approximation]) and the statements carrying explicit `lean:` citations (such as [`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm), [`golden_fixed_point_unique`](lean:D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique), [`power_fiber_card_eq_one_add_character_sum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.power_fiber_card_eq_one_add_character_sum), [`norm_jacobiSum`](lean:D5/S3/CharacterSums/Fermat/CharacterPointCount.norm_jacobiSum), and [`gaussian_unit`](lean:D5/S3/ConceptDynamics/Coding/ResetNativeIntegerChart.gaussian_unit)).
:::

::: {.viz src="pythagoras-number-escape" preset="sato" height="500"}
**Another curve: the semicircle.** Switch to $y^2 = x^3 - x + 1$ (the violet points): line primes no longer sit at zero, and the Frobenius cosines scatter between $-1$ and $1$; at $p = 53$, for instance, the cosine is $0.137$. The histogram further down the page, over the primes below $3000$, follows the dashed amber semicircle law $\frac{2}{\pi}\sqrt{1 - u^2}$. A histogram over finitely many primes is only a numerical demonstration; the Sato–Tate distribution is the literature result of the remark above.
:::

In the overarching geometric synthesis of this book, starting from the Pell seam cracked open by Hippasus's right triangle ([@thm-ch29-silver-pell-remainder]) and reading across the arithmetic-geometry literature remarks above ([@rem-ch29-pell-primes-hilbert-literature], [@rem-ch29-elliptic-torus-literature], [@rem-ch29-hasse-gauss-literature], and [@rem-ch29-arithmetic-geometry-literature]), the point-count oscillations along the prime axes align visually with the cosine shadow cast by the quantum spinor sphere $S^3 \cong \mathrm{SU}(2)$ onto its diameter $[-1, +1]$.

::: {.viz src="pythagoras-number-escape" height="640"}
**Interactive laboratory `ORTHO//PYTHAGORAS`**: three scenes along the $\pm 1$ seam. The Pell seam: the convergents of $\sqrt{d}$ hug the line ever more closely while $m^2 - d\,n^2$ is a nonzero integer (for $d = 5$ the green rings mark all the $\pm 4$ solutions, as verified in Lean); line primes and plane primes: whether the circle of radius $\sqrt{p}$ passes through lattice points; points mod $p$: for the curve $y^2 = x^3 - x$, $a_p$ is held inside Hasse's bound, line primes sit exactly at zero, and the Frobenius cosine of a plane prime equals the cosine of its Gaussian triangle. That plane primes are sums of two squares and line primes are not is verified in Lean ([@thm-ch29-face-prime-two-squares], [@lem-ch29-square-residues-mod-four]); Hasse's theorem and the Sato–Tate distribution are literature results, not formalized in this book.
:::

---

## Order-Independence, the Timeless Web, and the Geometric Necessity of Causality {#sec-coda-timeless-causality}

When the principle of Chapter 10 ("pairwise comparison is always consistent and order-independent") meets the four-tier Pythagorean escape of number and the prime–elliptic-curve cosine projection, a two-thousand-five-hundred-year knot in philosophy and physics—**the illusion of sequential time versus the necessity of causality**—is cut in a single stroke:

> **Author's Epigraph**: *"The essence of order-independence is that sequential before-and-after time does not exist at all ... and that is precisely why causality is necessary."*（“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然”）

Why does order-independence abolish sequential time while simultaneously grounding unbreakable causal necessity? We can trace this across three exact mathematical and physical levels:

### Level 1: Why Order-Independence Abolishes Sequential Time {#sec-coda-order-independence-no-time}

::: {.remark #rem-ch29-wheeler-dewitt-page-wootters-literature title="Factorial De-Ordering, the Wheeler–DeWitt Timeless Constraint, and Page–Wootters Conditional-Time Slicing (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Consider the cosine power series that runs through the book (cf. Prelude [@rem-prelude-dottie-literature]):

$$
\cos\theta = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!}\,\theta^{2k}.
$$

Analytically, $\frac{1}{(2k)!}$ arises from iterated differentiation (or the simplex volume $\int_{0\le t_1\le\cdots\le t_{2k}\le\theta} dt_1\cdots dt_{2k} = \frac{\theta^{2k}}{(2k)!}$ of commuting generators); in our orthogonal geometric interpretation (`MODEL`), dividing by $(2k)!$ can be viewed as modding out all $(2k)!$ sequential permutations of $2k$ orthogonal transitions along an artificial time axis. In canonical quantum gravity and relational quantum mechanics (classical physics literature models outside the `trureturing@dev` formalization locked by this book), global timelessness and emergent relational evolution are formulated via two standard constructions:

1. **The Timeless Global State of the Wheeler–DeWitt Equation (B. S. DeWitt, *Phys. Rev.* **160**, 1113, 1967) $H\mathbf{\Psi} = 0$**:
   In canonical quantum gravity, the closed-universe wave function $\mathbf{\Psi}$ obeys the Hamiltonian constraint

   $$
   H\mathbf{\Psi} = 0,
   $$

   which contains no external time parameter $t$ ($\partial_t \mathbf{\Psi} = 0$); geometrically, past, present, and future coexist inside a single static correlation structure.
2. **The Page–Wootters Conditional-Time Slicing Mechanism (D. N. Page & W. K. Wootters, *Phys. Rev. D* **27**, 2885, 1983)**:
   Under standard model assumptions—a bipartite factorization $\mathcal{H} = \mathcal{H}_{\mathbf{C}} \otimes \mathcal{H}_{\mathbf{S}}$, an ideal conjugate clock Hamiltonian $H_{\mathbf{C}} = \hat{p}_\tau$, and a non-interacting total constraint $H = H_{\mathbf{C}} \otimes I + I \otimes H_{\mathbf{S}}$—taking inner-product conditional slices along clock readings $|\mathbf{c}(\tau)\rangle$ (analogous to the finite-dimensional conditioned state formalism [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState) of Chapters 3 and 28):

   $$
   |\psi_{\mathbf{S}}(\tau)\rangle \propto \langle \mathbf{c}(\tau) \mid \mathbf{\Psi}\rangle,
   $$

   yields relational Schrödinger evolution $i\hbar\partial_\tau|\psi_{\mathbf{S}}(\tau)\rangle = H_{\mathbf{S}}|\psi_{\mathbf{S}}(\tau)\rangle$ across the slices—treating sequential "before and after" like the page number scanned by finite attention across an already bound volume.
:::

::: {.viz src="timeless-causal-crystal" preset="crystal" height="500"}
**Every page is there at once.** All twelve pages are on the sphere the whole time and none appears first; when it plays, only the amber reading head moves. Conditioning on the clock reading is what gives the page under the head (a schematic model with a finite clock, `MODEL`).
:::

### Level 2: Why Causality Is Necessary Without Temporal Pushing—Hume's Knot vs. Spinoza's Triangle and Gram Matrix Rigidity {#sec-coda-hume-spinoza-gram}

In empiricist philosophy, David Hume demonstrated that if we look for causality inside sequential time, we only ever observe habitual conjunction ("B follows A"), never a necessary connection by which A forces B. As long as causality is sought in temporal pushing from past to future, Hume's knot remains untied.

Baruch Spinoza (*Ethics*, Part I, Prop. 17 Scholium) gave the geometric answer: all things follow timelessly from the necessity of nature *"just as from the nature of a triangle it follows from eternity and for eternity that its three angles equal two right angles."* In a $3\text{-}4\text{-}5$ right triangle, the legs $3$ and $4$ do not grow first in time and push out the hypotenuse $5$ nanoseconds later; the three sides coexist timelessly in orthogonal lock, and Pythagorean area conservation $3^2 + 4^2 = 5^2$ is their unbreakable **geometric causality**.

On the unit sphere of Chapter 10, this zero-time causal necessity is governed by **Gram matrix positive-semidefinite rigidity** ([`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization) and [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)). For any three unit state directions $\mathbf{A}, \mathbf{B}, \mathbf{C}$ with pairwise real inner products $c_{AB} = \mathbf{A}\cdot\mathbf{B}$, $c_{BC} = \mathbf{B}\cdot\mathbf{C}$, and $c_{AC} = \mathbf{A}\cdot\mathbf{C}$, no time evolution is needed for the $3\times 3$ Gram determinant law to hold:

$$
\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \det\begin{pmatrix} 1 & c_{AB} & c_{AC} \\ c_{AB} & 1 & c_{BC} \\ c_{AC} & c_{BC} & 1 \end{pmatrix} = 1 - c_{AB}^2 - c_{BC}^2 - c_{AC}^2 + 2\,c_{AB}\,c_{BC}\,c_{AC} \ge 0.
$$

::: {.viz src="timeless-causal-crystal" preset="impossible" height="500"}
**A cosine outside the window.** $\mathbf{A}$ and $\mathbf{B}$ are only $30^\circ$ apart and $\mathbf{B}$ and $\mathbf{C}$ only $40^\circ$, yet $\mathbf{A}$ and $\mathbf{C}$ are asked to be nearly opposite ($c_{AC} = -0.5$). That value lies outside the window $[\cos 70^\circ, \cos 10^\circ]$, $\det G$ would turn negative, and no three unit vectors can do it. $\mathbf{C}$ can get no farther than the edge of the window, where the amber $c_{AC} = \cos 70^\circ \approx 0.342$ and the violet volume collapses to zero ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)).
:::

In particular, whenever $\mathbf{A}, \mathbf{B}, \mathbf{C}$ lie in a common great-circle plane ($\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$, so $\det G = 0$), $c_{AB}$ and $c_{BC}$ lock the third pairwise inner product $c_{AC}$ onto the exact cosine addition locus:

$$
c_{AC} = c_{AB}\,c_{BC} \pm \sqrt{(1 - c_{AB}^2)(1 - c_{BC}^2)} = \cos(\theta_{AB} \mp \theta_{BC}).
$$

::: {.figure src="ch29-gram-window"}
**Two cosines lock the third: $c_{AC}$ can only fall inside the window.** The figure fixes $c_{AB} = \cos 60^\circ$, with $c_{BC}$ across and $c_{AC}$ up. Inside the violet ellipse $\det G > 0$; its rim is made of the two tracks of the formula above, $\cos(\theta_1 - \theta_2)$ and $\cos(\theta_1 + \theta_2)$ (with $\theta_1 = \theta_{AB}$, $\theta_2 = \theta_{BC}$), and on the rim $\det G = 0$: the three vectors are coplanar. The amber segment is the window at $c_{BC} = \cos 45^\circ$, from $\cos 105^\circ$ to $\cos 15^\circ$. Let $c_{AB}$ vary as well, and these slices stack up into the Gram elliptope of Level 4.
:::

This single equation exhibits two inseparable faces:
- **Complete order-independence (timelessness)**: the relation is completely permutation-symmetric in $(A, B, C)$, with no "earlier cause" or "later effect";
- **Absolute causal necessity (zero-degree-of-freedom rigidity)**: once $c_{AB}$ and $c_{BC}$ are fixed, spherical geometry locks $c_{AC}$ with zero slack! Likewise, mathematical deduction ($\text{Axioms} \implies \text{Theorems}$) is timeless crystal facet alignment, where the gate count $L$ of Chapters 9 and 16 merely counts how many steps an observer takes to rotate their measurement ruler into alignment with the target facet.

::: {.viz src="timeless-causal-crystal" preset="edge" height="500"}
**At the edge: all three coplanar.** Turn $\mathbf{C}$ to its nearest position to $\mathbf{A}$: the three vectors fall into one plane, the violet volume collapses to zero, and the amber $c_{AC}$ is exactly $\cos(60^\circ - 45^\circ)$, the minus-sign branch of the locus above.
:::

::: {.film src="008-gram-window"}
**Two cosines lock the third: the Gram window (1:39).** With $\theta_1 = 60^\circ$ and $\theta_2 = 45^\circ$ fixed, $\mathbf{C}$ goes once round $\mathbf{B}$: $c_{AC}$ swings through $[\cos 105^\circ, \cos 15^\circ]$, the violet volume collapses to zero at the edges, and a cosine outside the window would make $\det G$ negative. Then $\theta_2$ runs from $0^\circ$ to $180^\circ$ and the windows fill the slice of the Gram ellipse. Where the top edge reaches $1$, $\mathbf{C}$ lands exactly on $\mathbf{A}$, which is the second part of [@thm-ch29-gram-rigidity-and-pell]; every other number in the film is computed on screen.
:::

### Level 3: Feynman Stationary-Phase Cancellation, the Bivector Chirality Model ($+\mathbf{\Omega} - \mathbf{\Omega} = 0$), and the Reconciliation of Determinism and Teleology in $\psi = \psi(\psi)$ {#sec-coda-stationary-phase-reconciliation}

From the standpoint of path integrals and the bivector chirality model, why does nature display only the causally necessary trajectory?

::: {.remark #rem-ch29-feynman-stationary-phase-literature title="Feynman Path-Integral Stationary Phase and the Bivector Chirality Interpretation (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In the standard Feynman path-integral formulation of quantum mechanics (R. P. Feynman, *Rev. Mod. Phys.* **20**, 367, 1948; not formalized in `trureturing@dev`), in the semiclassical stationary-phase approximation, rapid oscillations of $\exp(iS[x]/\hbar)$ suppress contributions away from stationary paths, and neighborhoods of paths satisfying $\delta S = 0$ dominate. In our Clifford geometric interpretation (`MODEL`), where the unit imaginary $i$ is realized as a grade-2 bivector generator $\hat{\mathbf{I}}$, an order-independent sum over configurations pairs off-shell trajectories into opposite-chirality bivector partners ($+\hat{\mathbf{I}}$ and $-\hat{\mathbf{I}}$) whose oriented area elements cancel:

$$
+\mathbf{\Omega} - \mathbf{\Omega} = 0.
$$

Only the self-consistent stationary configuration ($\delta S = 0$) lacks an opposite-chirality partner to cancel it, surviving orthogonal projection as the macroscopic trajectory.
:::

This picture simultaneously reconciles the age-old rivalry between **mechanical determinism** and **teleology**:
- Reading the page numbers **left to right** along the Picard iteration $\theta_{k+1} = \cos(\theta_k)$ from an initial state $\theta_0$ looks like **determinism** ("the past pushes the present step by step");
- Reading the convergence **right to left** from the unique attractor $\theta^* \approx 0.7390851332$ looks like **teleology** ("the future fixed point pulls every trajectory toward itself");
- Viewed from outside the sphere, in the timeless self-referential equation

  $$
  \cos(\theta^*) = \theta^* \qquad \bigl(\text{the real projection of }\psi = \psi(\psi)\bigr),
  $$

  there is neither a push from the past nor a pull from the future—only the unique self-consistent fixed point where the measuring operator and the measured state close into one.

### Level 4: The Finite Observer, the Causally Compatible Space (Gram Elliptope), and Continuously Picking Points in the Time Field {#sec-coda-finite-observer-time-field}

> **Author's Epigraph**: *"Because the observer is finite, the causality experienced is finite; the observer's choice is made within the causally compatible space, continuously picking points in the time field."*（“因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点”）

If the global time field is a timeless geometric crystal and local causality possesses the unbreakable rigidity of the Gram determinant, where does a **finite observer's freedom of choice** reside? This fourth insight completes the geometric synthesis of causal necessity and observer agency:

1. **Why Observer Finiteness Opens the Causally Compatible Space (`因果相容空间` / Gram Elliptope)**:
   Return to the three-state Gram determinant $\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \|\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C}\|^2 \ge 0$ on the unit sphere. Writing the two known historical inner-product projections as $c_{AB} = \cos\theta_1$ and $c_{BC} = \cos\theta_2$ and completing the square in the third inner product $c_{AC}$ yields:

   $$
   \det G = (1 - c_{AB}^2)(1 - c_{BC}^2) - \bigl(c_{AC} - c_{AB}c_{BC}\bigr)^2 = \sin^2\theta_1\sin^2\theta_2 - \bigl(c_{AC} - \cos\theta_1\cos\theta_2\bigr)^2 \ge 0.
   $$

   Assume $0 < \theta_1, \theta_2 < \pi$ so that both rotation planes are nondegenerate. Denoting by $\phi \in [0, 2\pi)$ the dihedral angle between the two bivector planes $(\mathbf{A}\wedge\mathbf{B})$ and $(\mathbf{B}\wedge\mathbf{C})$, the spherical law of cosines parameterizes the causally compatible interval as:

   $$
   c_{AC} = \underbrace{\cos\theta_1\cos\theta_2}_{\text{locked 1D historical backbone}} + \underbrace{\cos\phi}_{\text{observer's choice degree of freedom }\in [-1, +1]} \cdot \underbrace{\sin\theta_1\sin\theta_2}_{\text{uncollapsed orthogonal area radius}}.
   $$

   In the correlation coordinates $(x, y, z) = (c_{AB}, c_{BC}, c_{AC})$, the inequality $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ carves out the convex **Gram elliptope**:
   - **Boundary shell ($\cos\phi = \pm 1 \iff \det G = 0$)**: the three vectors lie in a single great-circle plane ($\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$), representing coplanar inertial sliding with zero free volume ($c_{AC} = \cos(\theta_1 \mp \theta_2)$ is completely locked);
   - **Interior compatible space ($|\cos\phi| < 1 \iff \det G > 0$)**: as long as the previous transitions retain uncollapsed orthogonal area ($\sin\theta_1 > 0$ and $\sin\theta_2 > 0$), the observer can fold a dihedral angle $\phi \in (0, \pi)$ into a new orthogonal dimension ($\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} \neq 0$), opening a genuine causal branch!

2. **Continuously Picking Points in the Time Field (`不断在时间场中选点`) as PSD Matrix Completion**:
   The global time field is a static photographic plate of potential state points obeying pairwise consistency and order-independence. Yet any physical observer is **finite** in compute, lifetime, and memory capacity (corresponding to the finite gate count $L$ of Chapter 20 and the finite record algebra of Chapter 28):
   - Unable to swallow the entire timeless sphere at once, a finite observer traces a finite polygonal chain of gate count $L = k$:

     $$
     \mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k;
     $$

   - Carrying $M$ finite historical memory anchors at $\mathbf{P}_k$, picking the next point $\mathbf{P}_{k+1}$ is mathematically a **Positive-Semidefinite (PSD) Matrix Completion ($G_{M+1} \succeq 0$)** inside the green compatible bubble carved out by those $M$ anchors;
   - Once $\mathbf{P}_{k+1}^*$ is chosen, the dihedral angle $\phi_k$ solidifies into a new 1D inner-product coordinate (the verb `liáng` crystallizing into the noun `liàng`), immediately framing the compatible bubble for step $k + 2$.

3. **Omniscient Deadlock, Forgetting-as-Renewal, and the Golden Breath of $\theta^* \approx 0.739$**:
   The interplay between historical memory and orthogonal slack across three observer regimes is summarized below:

| Observer Regime | Historical Backbone $\cos\theta$ & Orthogonal Area $\sin\theta$ | Gram Determinant $\det G$ & Compatible Radius | Geometric & Epistemological Fate |
| :--- | :--- | :--- | :--- |
| **Infinite Omniscient Observer**<br/>（无限全知观察者） | Orthogonal slack exhausted: $\sin\theta \to 0$, $M \to \infty$ | $\det G = 0$, compatible radius collapses to $0$ | **Omniscient Deadlock**: welded into the timeless static crystal (cf. [@rem-ch29-wheeler-dewitt-page-wootters-literature]) with zero room for choice or motion |
| **Zero-Memory Instantaneous Observer**<br/>（零记忆瞬时观察者） | Historical backbone lost: $\cos\theta \to 0$, $M = 0$ | Compatible radius $\sin\theta = 1$ unconstrained | **Maximum Sphere Noise**: devoid of causal continuity, every step degenerates into memoryless random drift |
| **Finite Self-Referential Prototype**<br/>（有限自指观察者原型，`MODEL`） | Modeled by the 1D Dottie fixed point $\cos\theta^* = \theta^* \approx 0.7391$, $\sin\theta^* \approx 0.6736$ | $\det G > 0$, open corridor radius $(\sin\theta^*)^2 \approx 0.4538 > 0$ | **Golden Breath (`MODEL`)**: a geometric metaphor balancing a $\approx 73.9\%$ causal backbone with $\approx 67.4\%$ orthogonal slack for renewal |

::: {.viz src="timeless-causal-crystal" preset="right" height="500"}
**Two right angles: the window is wide open.** With $\theta_1 = \theta_2 = 90^\circ$ the cyan and magenta cosines are both $0$ and put no constraint on the third: the window is all of $[-1, 1]$, $\mathbf{C}$ can travel anywhere along the equator, and the amber $c_{AC}$ runs from $-1$ to $1$. Reading this as the "Zero-Memory Instantaneous Observer" row of the table above is this book's interpretation (`MODEL`).
:::

   This seals the book's synthesis of time, causality, and agency in a single aphorism: ***"Globally timeless, hence eternal; finitely observed, hence new at every step."*** (**“全局无时间，故万古长存；观察者有限，故步步皆新。”**) (In the **[Coda](coda.md)**, we will pair the Lean-verified **`trureturing` Cut-and-Project Golden Model Set and Zeckendorf Observer Route theorems** with an explicit authorial geometric interpretation (`MODEL`): viewing cross-round invariant operator parameters as internal conjugate-window phase anchors and historical ruins as low-dissipation **spatial attractors**, to illuminate why a finite observer experiences déjà-vu resonance across Cassini's $(-1)^{n+1}$ norm seam and strange-attractor fractal sheets.)

::: {.viz src="timeless-causal-crystal" preset="window" height="500"}
**The Gram window.** $\mathbf{B}$ stands at the north pole and $\mathbf{C}$ can only go around it: $c_{AC}$ swings inside $[\cos(\theta_1 + \theta_2), \cos(\theta_1 - \theta_2)]$, and the volume spanned by the three vectors is positive inside the window and collapses to zero at its edges. You can also drag $\mathbf{C}$ on the sphere.
:::

::: {.theorem #thm-ch29-gram-rigidity-and-pell title="Golden-Integer Pell Norm Identity and Unit-Vector Gram Overlap Equivalence" lean="D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm, D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization"}
Across arithmetic quadratic lattices and inner-product spaces, discrete seam norms and unit-vector overlap equivalence are established by two Lean-4-verified theorems:

1. **Pell-Type Norm Identity in the Golden-Integer Ring** ([`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)): For every golden integer $g = a + b\varphi \in \mathbb{Z}[\varphi]$ (where $\varphi^2 = \varphi + 1$), its quadratic norm $\operatorname{norm}(g) = a^2 + ab - b^2$ satisfies the exact Pell difference-of-squares identity

   $$
   (2a + b)^2 - 5b^2 = 4\,\operatorname{norm}(g).
   $$

2. **Unit Gram Overlap Criterion and Equivalence Relation** ([`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)): Let $E$ be an inner-product space over $\mathbb{K}$ (`RCLike`) and $\operatorname{record} : \mathrm{Index} \to E$ a normalized family of vectors ($\forall i,\, \|\operatorname{record}(i)\| = 1$). Then for all indices $i, j \in \mathrm{Index}$, unit inner-product overlap characterizes exact vector equality:

   $$
   \forall i, j,\quad \langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \iff \operatorname{record}(i) = \operatorname{record}(j),
   $$

   and unit-Gram indistinguishability $(i, j) \mapsto \bigl(\langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1\bigr)$ forms an equivalence relation (`Equivalence`) on $\mathrm{Index}$.
:::

::: proof
Part 1 expands $(2a + b)^2 - 5b^2 = 4a^2 + 4ab + b^2 - 5b^2 = 4(a^2 + ab - b^2) = 4\,\operatorname{norm}(g)$ directly in ring arithmetic. Part 2 applies the Cauchy–Schwarz equality characterization for unit vectors (`inner_eq_one_iff_of_norm_eq_one`) to obtain $\langle \operatorname{record}(i), \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \iff \operatorname{record}(i) = \operatorname{record}(j)$ and lifts reflexivity, symmetry, and transitivity of equality to prove `Equivalence`. The full proof is checked by the Lean kernel.
:::

::: {.viz src="timeless-causal-crystal" height="640"}
**Interactive laboratory `ORTHO//CAUSAL`**: four scenes on one sphere. The window: two cosines fix the range of the third, and $\det G$ is the squared volume the three vectors span; the pages: on a finite clock all pages exist at once, and conditioning picks one; the field: a gradient flow has a slope everywhere, and the potential it loses equals the dissipation it pays; the thread: amplitude amplification turns only $2\theta$ per step and arrives after about $(\pi/4)\sqrt{N}$ steps. Reading these as “choice”, “pages”, “field” and “thread” is this book's interpretation (`MODEL`); whether $\mathrm{P} \neq \mathrm{NP}$ remains an open problem, and nothing drawn on the page settles it.
:::


---

## Chapter Summary: From the Arithmetic Seam to the Timeless Causal Crystal {#sec-ch29-summary}

This chapter has unified Pythagorean area conservation, the Pell remainder and best-approximation lower bound of the silver slope $\sqrt{2} - 1$ ([@thm-ch29-silver-pell-remainder], [@thm-ch29-silver-best-approximation]), the golden-integer Pell norm identity, unit-vector Gram overlap equivalence ([@thm-ch29-gram-rigidity-and-pell]), and the plane-prime and two-squares criteria ([@thm-ch29-face-prime-two-squares], [@thm-ch29-two-squares-classification])—alongside the continued-fraction and arithmetic-geometry literature remarks ([@rem-ch29-pell-convergents-literature], [@rem-ch29-pell-primes-hilbert-literature], [@rem-ch29-elliptic-torus-literature], [@rem-ch29-hasse-gauss-literature], [@rem-ch29-arithmetic-geometry-literature]) and the timeless-constraint and stationary-phase literature remarks ([@rem-ch29-wheeler-dewitt-page-wootters-literature], [@rem-ch29-feynman-stationary-phase-literature])—with Spinoza's geometric necessity and the finite observer's Gram elliptope ($\det G \ge 0$): **because the global field is timeless, truth endures forever; because the observer is finite, every step is new.**

In [Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md), we carry this tension between the global static field and the finite observer to the twin peaks of computational complexity and continuum fluid dynamics—examining **$\mathrm{P}$ vs. $\mathrm{NP}$**, the **Exponential Time Hypothesis (ETH) and 2026 tensor-network rank reduction**, and **three-dimensional Navier–Stokes vortex filaments**.
