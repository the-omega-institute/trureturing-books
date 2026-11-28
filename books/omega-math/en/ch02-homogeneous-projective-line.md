# Chapter 2 The Homogeneous Projective Line and Antipodal Closure

> *"The real line explodes into $\infty$ not because the universe escapes to infinity, but because slope crudely divides by the second coordinate $Q$; keep the homogeneous integer pair $[P : Q]$, and the dreaded $1/0$ becomes an ordinary anchor $[1 : 0]$ whose denominator is strictly $1$."*

The very first object handed to us in classical analysis is the open real line $\mathbb{R}$. Familiar as it looks, it carries two structural defects. First, as a ray rotates toward $90^\circ$, its affine slope $t = P/Q$ stretches wildly, magnifying tiny directional changes into runaway numerical amplification. Second, the instant $Q = 0$, the single-number slope crashes into division by zero; the line tears apart at both ends, forcing us to glue on an alien symbol $\infty$ that breaks ordinary arithmetic.

In this chapter we abolish the open real line atop our bare CIC floor and replace one-dimensional scales with the **homogeneous projective line $\mathbb{QP}^1$**. Replacing the single denominator $Q$ with the sum of integer squares $P^2 + Q^2$ makes fidelity $\kappa$, spread $s$, and rational Cayley circle coordinates globally finite, singularity-free, and radical-free. Every one of the six theorems proved in this chapter cites a frozen D5 declaration whose strict record lists `OmegaInit` and `OmegaMath` and reports `strict_omega.axioms: []`.

## 2.1 From the Open Real Line to the Homogeneous Projective Line $\mathbb{QP}^1$ {#sec-ch02-qp1-construction}

Rewriting a rational slope $t = P/Q$ as a homogeneous integer pair $[P : Q]$ welds an open broken wire back into a closed ring. Whenever $(P, Q) \in \mathbb{Z}^2$ is not $(0, 0)$, its integer squared norm

$$
\operatorname{normSq}(P, Q) \;=\; P^2 + Q^2 \;\ge\; 1
$$

is strictly positive. Enforcing coprimality $\gcd(\lvert P\rvert, \lvert Q\rvert) = 1$ together with a canonical sign rule (say $Q > 0$, or $Q = 0$ and $P = 1$) assigns every point of $\mathbb{QP}^1$ a unique canonical integer pair, allowing exact componentwise equality without ever invoking `Quot.sound`.

Inside the zero-axiom library `OmegaMath`, exact fractions are built even more directly as inductive types without embedding proofs inside data: both nonnegative `Omega.Ratio` and signed `Omega.IntRatio` have two constructors—an explicit `undefined` constructor for zero denominator, and a finite fraction constructor storing a strictly positive denominator by its predecessor natural number. Equivalence of two fractions (`Omega.Ratio.Equivalent` and `Omega.IntRatio.Equivalent`) is defined by cross-multiplication on finite fractions, with `undefined` equivalent solely to `undefined`.

::: {.definition #def-ch02-qp1-kappa-spread title="Homogeneous Projective Pairs, Fidelity $\kappa$, Spread $s$, and Rational Cayley Coordinates"}
For any natural or signed integer coordinate pair $(p, q)$, define its squared norm $\operatorname{normSq}(p, q) := p^2 + q^2 \in \mathbb{N}$. Taking values in `Omega.Ratio` (for natural pairs) or `Omega.IntRatio` (for signed integer pairs), with the explicit `undefined` value when $p^2 + q^2 = 0$, define:

1. **Projective fidelity (overlap)** and **spread**:

   $$
   \kappa(p, q) \;:=\; \frac{q^2}{p^2 + q^2}, \qquad s(p, q) \;:=\; \operatorname{spread}(p, q) \;:=\; \frac{p^2}{p^2 + q^2}.
   $$

2. **Rational Cayley unit-circle coordinates**: for signed integers $(p, q)$, define

   $$
   \operatorname{cayleyX}(p, q) \;:=\; \frac{q^2 - p^2}{p^2 + q^2}, \qquad \operatorname{cayleyY}(p, q) \;:=\; \frac{pq + qp}{p^2 + q^2} \;=\; \frac{2pq}{p^2 + q^2}.
   $$

3. **Nonzero condition**: call a signed integer pair $(p, q)$ nonzero (written $\operatorname{Nonzero}(p, q)$) when $p \neq 0 \lor q \neq 0$. The space of coprime homogeneous integer pairs modulo $(p, q) \sim (-p, -q)$ is written $\mathbb{QP}^1$, with point $[p : q]$.
:::

For these readouts to belong intrinsically to the projective point $[p : q]$ rather than to an arbitrary representative, the first check is **scale invariance**: rescaling both coordinates by a common nonzero factor must leave the reading unchanged. We begin with positive natural rescaling—a zero-axiom theorem in `OmegaInit`/`OmegaMath` with empty axiom closure:

::: {.theorem #thm-ch02-nat-kappa-scale title="Positive Natural Scaling Preserves Projective Fidelity" lean="D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale"}
Let $p, q, k$ be arbitrary natural numbers in `Omega.Nat`, and put $s = k + 1$. Writing $\kappa(p, q)$ in `Omega.Ratio` for the ratio with numerator $q^2$ and denominator $p^2 + q^2$ (taking `undefined` when the denominator is zero), we have

$$
\kappa(ps,\, qs) \;\equiv\; \kappa(p, q)
$$

under `Omega.Ratio.Equivalent`, including the degenerate case $p = q = 0$ where both sides are `undefined`.
:::

::: {.proof}
Multiplying $p$ and $q$ by the positive natural scale $s = k + 1$ multiplies the numerator by $s^2$ to $(qs)^2 = q^2 s^2$ and the denominator by $s^2$ to $(ps)^2 + (qs)^2 = (p^2 + q^2)s^2$. Split on whether $p^2 + q^2$ is zero: if it is zero, the scaled denominator $(p^2 + q^2)s^2$ is also zero, so both ratios evaluate to `undefined` and are equivalent by definition; if $p^2 + q^2 > 0$, then $s^2 = (k+1)^2 > 0$ keeps both ratios finite, and cross-multiplication yields $(q^2 s^2)(p^2 + q^2) = q^2\bigl((p^2 + q^2)s^2\bigr)$ by associativity and commutativity of natural multiplication. The full proof is checked by the Lean kernel.
:::

Unsigned magnitudes alone cannot tell the upper semicircle $[1 : 1]$ apart from the lower semicircle $[-1 : 1]$. Moving to signed integers $p, q \in \mathbb{Z}$ allows arbitrary nonzero signed scales $k \in \mathbb{Z} \setminus \{0\}$—in particular, $k = -1$ confirms that $(-p, -q)$ and $(p, q)$ produce identical overlaps. This signed invariance is likewise proved with zero axioms in `OmegaMath`:

::: {.theorem #thm-ch02-int-kappa-scale title="Nonzero Signed Integer Scaling Preserves Projective Fidelity" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_scale"}
Let $p, q, k$ be arbitrary signed integers in `Omega.Int` with $k \neq 0$. Then the signed projective overlap satisfies

$$
\kappa(kp,\, kq) \;\equiv\; \kappa(p, q)
$$

under `Omega.IntRatio.Equivalent`.
:::

::: {.proof}
Since $k \neq 0$, its squared magnitude $K := \lvert k\rvert^2 \in \mathbb{N}$ is strictly nonzero. Signed squaring satisfies $(kq)^2 = q^2 \cdot K$ and $\operatorname{normSq}(kp, kq) = \operatorname{normSq}(p, q) \cdot K$. Both numerator and denominator are scaled by the strictly positive natural factor $K$: if $\operatorname{normSq}(p, q) = 0$, both sides remain `undefined`; otherwise cross-multiplication cancels $K$ identically, establishing `Omega.IntRatio.Equivalent`. The full proof is checked by the Lean kernel.
:::

## 2.2 Complementary Conservation, the Rational Cayley Circle, and the Three Causal Anchors {#sec-ch02-anchors-and-cayley}

In classical trigonometry, the Pythagorean identity $\cos^2\theta + \sin^2\theta = 1$ sits downstream of $\pi$, radian measure, and infinite power series. On $\mathbb{QP}^1$, complementary conservation collapses to adding two integer squares over a shared positive denominator—zero angles, zero radicals, zero axioms:

::: {.theorem #thm-ch02-kappa-add-spread title="Fidelity and Spread Sum to One" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one"}
For every signed integer pair $(p, q)$ satisfying $\operatorname{Nonzero}(p, q)$ (that is, $p \neq 0 \lor q \neq 0$), the sum of fidelity and spread is equivalent to $1$ under `Omega.IntRatio.Equivalent`:

$$
\kappa(p, q) + \operatorname{spread}(p, q) \;\equiv\; 1.
$$
:::

::: {.proof}
Because $(p, q)$ is nonzero, $d := \operatorname{normSq}(p, q) = p^2 + q^2$ is a strictly positive natural number. Adding the two same-denominator fractions produces numerator $q^2 + p^2 = d$ over denominator $d$; since $d \neq 0$, cross-multiplication equates $d/d$ to `IntRatio.ofInt 1`. The full proof is checked by the Lean kernel.
:::

Now feed any nonzero homogeneous pair $(p, q)$ into the rational Cayley map $C(p, q) = \bigl(\operatorname{cayleyX}(p, q),\, \operatorname{cayleyY}(p, q)\bigr)$. It bends the entire projective line $\mathbb{QP}^1$ seamlessly onto the **rational unit circle $S^1(\mathbb{Q})$**. Without a single square root, sine, or cosine, every nonzero integer pair lands squarely on the unit circle:

::: {.theorem #thm-ch02-cayley-unit title="The Rational Cayley Image Lies on the Unit Circle" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit"}
For every signed integer pair $(p, q)$ satisfying $\operatorname{Nonzero}(p, q)$, the rational Cayley coordinates satisfy

$$
\operatorname{cayleyX}(p, q)^2 + \operatorname{cayleyY}(p, q)^2 \;\equiv\; 1
$$

under `Omega.IntRatio.Equivalent`.
:::

::: {.proof}
Expanding the numerator sum of squares yields the pure integer identity $(q^2 - p^2)^2 + (2pq)^2 = q^4 - 2p^2 q^2 + p^4 + 4p^2 q^2 = (p^2 + q^2)^2$ (proved inside `OmegaMath` by squaring $(p, q)$ under homogeneous circle multiplication and applying the norm-multiplicativity identity of the next section). Since $\operatorname{Nonzero}(p, q)$ forces $d = p^2 + q^2 > 0$, the common denominator $d^2$ is strictly positive and equals the numerator, giving equivalence to $1$ in `Omega.IntRatio.Equivalent`. The full proof is checked by the Lean kernel.
:::

Three points on this rational circle stand out as the **three causal anchors**—carrying the exact rational cadence $\{1,\, \frac{1}{2},\, 0\}$ in fidelity $\kappa$ (equivalently $\{0,\, \frac{1}{2},\, 1\}$ in spread $s = 1 - \kappa$):

1. **Past anchor $[0 : 1]$**: evaluating at $(p, q) = (0, 1)$ gives $\operatorname{normSq} = 1$, $\kappa = 1$, $s = 0$, and $C([0 : 1]) = (1, 0)$. The state coincides exactly with the reference, recording zero spread.
2. **Present self-dual anchor $[1 : 1]$ (and its mirror $[-1 : 1]$)**: evaluating at $(p, q) = (1, 1)$ gives $\operatorname{normSq} = 1^2 + 1^2 = 2$, $\kappa = \frac{1}{2}$, $s = \frac{1}{2}$, and $C([1 : 1]) = (0, 1)$ (while $[-1 : 1]$ lands opposite on the southern meridian $(0, -1)$). Under complementary conservation $\kappa + s = 1$, asking for fidelity and spread to split in exact self-duality writes down a single rational equation:

   $$
   \kappa \;=\; 1 - \kappa \quad \Longleftrightarrow \quad \kappa \;=\; \frac{1}{2}, \quad s \;=\; \frac{1}{2}.
   $$

   In a $\pi$-free, radian-free language, right-angle orthogonality is not the transcendental number $\pi/2$; it is the unique self-dual fixed point $\kappa = s = \frac{1}{2}$.

3. **Future antipodal pole $[1 : 0]$ (and every $[p : 0]$ with $p \neq 0$)**: on the open real line $\mathbb{R}$, setting $q = 0$ triggers division by zero $p/0$ and gets banished as "$\infty$". On $\mathbb{QP}^1$, as long as $p \neq 0$, the denominator $p^2 + 0^2 = p^2$ remains strictly positive! The next zero-axiom theorem permanently tames infinity with zero division by zero:

::: {.theorem #thm-ch02-antipodal-closure title="Finite Readouts and Cayley Closure at the Antipodal Pole" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure"}
Let $p$ be any nonzero signed integer ($p \neq 0$). At the homogeneous antipodal point $(p, 0)$ where affine slope would divide by zero, all four projective readouts are finite and simultaneously satisfy, under `Omega.IntRatio.Equivalent`:

$$
\begin{aligned}
\kappa(p, 0) &\equiv 0, & \operatorname{spread}(p, 0) &\equiv 1, \\
\operatorname{cayleyX}(p, 0) &\equiv -1, & \operatorname{cayleyY}(p, 0) &\equiv 0.
\end{aligned}
$$
:::

::: {.proof}
Because $p \neq 0$, the squared norm $d := \operatorname{normSq}(p, 0) = p^2$ is a strictly positive natural number. Substituting $q = 0$ directly into the four definitions gives $\kappa(p, 0) = 0/d \equiv 0$, $\operatorname{spread}(p, 0) = p^2/d = d/d \equiv 1$, $\operatorname{cayleyX}(p, 0) = (-p^2)/d \equiv -1$, and $\operatorname{cayleyY}(p, 0) = 0/d \equiv 0$, with no zero denominator ever encountered. The full proof is checked by the Lean kernel.
:::

Start at $[0 : 1]$, pass $[1 : 1]$ and the antipode $[1 : 0]$, then return through $[-1 : 1]$ to $[0 : 1]$. Homogeneous coordinates keep the readings finite even at the antipode. For any rational unit point $(X,Y)\ne(-1,0)$, take the inverse parameter $p/q=Y/(1+X)$ and clear denominators to get a nonzero integer pair. The point $[1:0]$ supplies $(-1,0)$, so every rational unit point is covered.

In the topology inherited from the real circle, $S^1(\mathbb{Q})$ is noncompact (hand derivation). Choose rational $t_n\to\sqrt{2}$, for example $t_n=\lfloor 10^n\sqrt{2}\rfloor/10^n$. The rational Cayley images tend to $(-1/3,2\sqrt{2}/3)$, whose irrational second coordinate puts it outside the rational circle. The real circle is Hausdorff, so a compact subset would be closed. The figure traces the ambient real circle and marks specific anchors with homogeneous readouts.

::: {.figure src="ch02-qp1-antipodal"}
**The homogeneous projective line $\mathbb{QP}^1$ closing into the rational unit circle $S^1(\mathbb{Q})$ via the Cayley map.** The three causal anchors—Past $[0 : 1] \mapsto (1, 0)$ ($\kappa = 1, s = 0$), Present self-dual equator $[1 : 1] \mapsto (0, 1)$ and $[-1 : 1] \mapsto (0, -1)$ ($\kappa = s = \frac{1}{2}$), and the singularity-free Future antipodal pole $[1 : 0] \mapsto (-1, 0)$ ($\kappa = 0, s = 1$)—close the loop without division by zero; formal grounds in [@thm-ch02-cayley-unit] and [@thm-ch02-antipodal-closure].
:::

The table below collects five fundamental projective anchors and their exact rational readouts (`NUM`):

| Projective Point $[P : Q]$ | Squared Norm $P^2 + Q^2$ | Fidelity $\kappa$ | Spread $s$ | Cayley Point $C([P : Q])$ | Causal and Geometric Role |
| :---: | :---: | :---: | :---: | :---: | :--- |
| $[0 : 1]$ | $1$ | $1$ | $0$ | $(1, 0)$ | Past halted anchor (exact coincidence) |
| $[1 : 2]$ | $5$ | $4/5$ | $1/5$ | $(3/5, 4/5)$ | Smallest primitive Pythagorean arc $(3, 4, 5)$ |
| $[1 : 1]$ | $2$ | $1/2$ | $1/2$ | $(0, 1)$ | Present self-dual anchor ($\kappa = 1 - \kappa$) |
| $[1 : 0]$ | $1$ | $0$ | $1$ | $(-1, 0)$ | Future antipodal pole (taming $\infty$) |
| $[-1 : 1]$ | $2$ | $1/2$ | $1/2$ | $(0, -1)$ | Southern self-dual mirror of Present |

## 2.3 Homogeneous Circle Multiplication, Norm Multiplicativity, and Finite Farey Horizons {#sec-ch02-circle-multiplication}

Points of $\mathbb{QP}^1$ do not merely sit statically on a circle—they compose by a **purely integer circle multiplication** that never translates through radians or transcendental arctangents.

Following `OmegaMath.Projective.Circle`, view a signed integer pair $(p, q)$ as the Gaussian integer $q + ip$, where the second coordinate $q$ is the real part and the first coordinate $p$ is the imaginary part. Multiplying two pairs $(p_1, q_1)$ and $(p_2, q_2)$ gives

$$
\operatorname{projectiveMul}(p_1, q_1, p_2, q_2) \;:=\; \bigl(p_1 q_2 + q_1 p_2,\;\; q_1 q_2 - p_1 p_2\bigr).
$$

Notice what happens when a pair $(p, q)$ multiplies itself: we obtain $(2pq,\; q^2 - p^2)$, whose second coordinate is literally the numerator of $\operatorname{cayleyX}(p, q)$ and whose first coordinate is literally the numerator of $\operatorname{cayleyY}(p, q)$! Better still, multiplying two nonzero pairs can never collapse to $(0, 0)$, guaranteed by the zero-axiom Brahmagupta–Fibonacci norm-multiplicativity theorem:

::: {.theorem #thm-ch02-circle-mul-normsq title="Brahmagupta–Fibonacci Norm Multiplicativity of Homogeneous Circle Multiplication" lean="D5/S3/Quantum/AURICOmega/OmegaCircleClosure.projective_circle_mul_normSq"}
For all signed integers $p_1, q_1, p_2, q_2 \in \mathbb{Z}$, the squared norm of the homogeneous product $\operatorname{projectiveMul}(p_1, q_1, p_2, q_2) = (p_1 q_2 + q_1 p_2,\; q_1 q_2 - p_1 p_2)$ equals the product of the two squared norms as an exact natural-number equality:

$$
\operatorname{normSq}(p_1, q_1)\cdot \operatorname{normSq}(p_2, q_2) \;=\; \operatorname{normSq}\bigl(\operatorname{projectiveMul}(p_1, q_1, p_2, q_2)\bigr),
$$

or explicitly in signed integers,

$$
\begin{aligned}
(p_1^2 + q_1^2)(p_2^2 + q_2^2) &= (p_1 q_2 + q_1 p_2)^2 + (q_1 q_2 - p_1 p_2)^2 \\
&= (p_1 p_2 - q_1 q_2)^2 + (p_1 q_2 + q_1 p_2)^2.
\end{aligned}
$$
:::

::: {.proof}
Expanding the two squares on the right produces $p_1^2 q_2^2 + q_1^2 p_2^2 + 2p_1 q_1 p_2 q_2$ and $q_1^2 q_2^2 + p_1^2 p_2^2 - 2p_1 q_1 p_2 q_2$. The cross terms $\pm 2p_1 q_1 p_2 q_2$ cancel identically, and the remaining four terms factor as $(p_1^2 + q_1^2)(p_2^2 + q_2^2)$; injectivity of the natural-to-integer embedding transfers the equality directly to `Omega.Nat`. In particular, whenever both input pairs are nonzero, both squared norms are at least $1$, so their product is at least $1$ and the composed pair never vanishes. The full proof is checked by the Lean kernel.
:::

This single identity turns transcendental angle addition into mental integer arithmetic. Let us verify three concrete cases by hand.

::: {.example #ex-ch02-hand-calculations title="Pi-Free Angle Addition, Antipodal Round Trips, and Finite Farey Horizons by Hand (NUM)"}
1. **Euler's arctangent identity by two integer multiplications**: take $[1 : 2]$ ($\operatorname{normSq} = 5$, Cayley point $(3/5, 4/5)$) and $[1 : 3]$ ($\operatorname{normSq} = 10$, Cayley point $(4/5, 3/5)$). Homogeneous circle multiplication yields

   $$
   \operatorname{projectiveMul}(1, 2, 1, 3) \;=\; (1\cdot 3 + 2\cdot 1,\; 2\cdot 3 - 1\cdot 1) \;=\; (5, 5).
   $$

   Check norm multiplicativity: $5 \times 10 = 50 = 5^2 + 5^2$. Cancelling the common factor $k = 5$ via [@thm-ch02-int-kappa-scale] reduces $(5, 5)$ straight to the Present anchor $[1 : 1]$ ($\kappa = \frac{25}{50} = \frac{1}{2}$, $C([1:1]) = (0, 1)$). What classical calculus writes as the transcendental relation $\arctan\frac{1}{2} + \arctan\frac{1}{3} = \frac{\pi}{4}$ is on $\mathbb{QP}^1$ the elementary integer product $[1:2] \odot [1:3] = [5:5] = [1:1]$.

2. **Doubling Present reaches Future; doubling Future returns to Past**: squaring the Present anchor $[1 : 1]$ gives

   $$
   \operatorname{projectiveMul}(1, 1, 1, 1) \;=\; (1\cdot 1 + 1\cdot 1,\; 1\cdot 1 - 1\cdot 1) \;=\; (2, 0) \;\sim\; [1 : 0],
   $$

   with squared norm $2 \times 2 = 4 = 2^2 + 0^2$: two $\frac{1}{2}$ half-steps land squarely on the Future pole $[1 : 0]$ ($\kappa = 0, s = 1$) without ever dividing by zero! Squaring $[1 : 0]$ once more gives $\operatorname{projectiveMul}(1, 0, 1, 0) = (0, -1) \sim [0 : 1]$, closing cleanly back onto Past.

3. **Finite Farey horizon counts**: coupling $\mathbb{QP}^1$ with the precision contract $\varepsilon_{\mathrm{self}} = 1/M$ from [Chapter 1](ch01-axiom-omega-and-cic.md), the horizon $M = 1$ contains exactly the $4$ cardinal anchors $\{[0:1], [1:1], [1:0], [-1:1]\}$, while $M = 2$ contains exactly $8$ coprime points $\{[0:1], [1:2], [1:1], [2:1], [1:0], [-2:1], [-1:1], [-1:2]\}$. In general, writing $\Phi(M) = \sum_{j=1}^M \varphi(j)$ for the totient summatory function, $\mathbb{QP}^1_{\le M}$ contains exactly $4\Phi(M)$ rational points—exactly $184$ points at $M = 12$ (`ARGUED`).
:::

::: {.film src="the-line-that-closes"}
**A slope ruler that breaks at $1/0$ closes into a rational circle with finite readings everywhere once directions are kept as homogeneous integer pairs $[P : Q]$ (2 min 49 s).** A white ray tilts toward upright while the amber slope readout climbs through $1/2$, $1$, $2$, $5$, $10$ and turns into a magenta $1/0$ at $Q = 0$; on the lattice, $2 : 4$, $3 : 6$ and $-1 : -2$ light up as the single point $[1 : 2]$, with $\kappa(2, 4) = 16/20 \equiv 4/5$ (computed on screen), and the green labels for scale invariance point to [@thm-ch02-nat-kappa-scale] and [@thm-ch02-int-kappa-scale]. Cyan and magenta cell bars split $[1 : 2]$ into $4/5 + 1/5$ and $[2 : 3]$ into $9/13 + 4/13$, with the green $\kappa + s \equiv 1$ resting on [@thm-ch02-kappa-add-spread]; points on the vertical line slide onto the Cayley circle, $[1 : 2] \mapsto (3/5, 4/5)$ and $[2 : 3] \mapsto (5/13, 12/13)$, with the green $X^2 + Y^2 \equiv 1$ resting on [@thm-ch02-cayley-unit]. The readings of the three anchors $[0 : 1]$, $[1 : 1]$, $[1 : 0]$ come from the table above, and the green label at the antipodal pole is [@thm-ch02-antipodal-closure]; a cyan and a magenta arc join to show $[1 : 2] \odot [1 : 3] = [1 : 1]$ and $5 \times 10 = 50 = 5^2 + 5^2$, with the green label for norm multiplicativity resting on [@thm-ch02-circle-mul-normsq], while the amber squaring walk $[1 : 1] \to [1 : 0] \to [0 : 1]$ is computed on screen (see [@ex-ch02-hand-calculations]). Finally the horizon counts $4$, $8$, $184$ at $M = 1, 2, 12$ are enumerated on screen, and the general count $4\Phi(M)$ and the commutativity limit ([@rem-ch02-abelian-limit]) are marked violet as argued.
:::

Try testing this singularity-free circle arithmetic live in the interactive card below: drag the integer sliders for the homogeneous pair $[P : Q]$ across the Past anchor $[0 : 1]$, the Pythagorean pair $[1 : 2]$, the Present self-dual anchor $[1 : 1]$, and straight through the Future antipodal pole $[1 : 0]$ where affine slope would crash, and watch complementary conservation $\kappa + s = 1$ together with the rational Cayley identity $X^2 + Y^2 = 1/1$ hold identically at every nonzero integer pair.

::: {.viz src="ternion-cayley-lab" preset="qp1-antipodal-circle" height="520"}
**Interactive rational circle closure on $\mathbb{QP}^1$.** Drag the integer sliders for $[P : Q]$ through $[0 : 1]$, $[1 : 1]$, and the antipodal pole $[1 : 0]$ to watch exact fraction arithmetic hold $\kappa(P, Q) + s(P, Q) = 1$ and $X^2 + Y^2 = 1/1$ identically (with $X = \operatorname{cayleyX}(P, Q)$ and $Y = \operatorname{cayleyY}(P, Q)$), with zero division by zero and no square roots; see the proofs in [@thm-ch02-kappa-add-spread], [@thm-ch02-cayley-unit], and [@thm-ch02-antipodal-closure].
:::

The homogeneous projective circle is already remarkably complete: zero actual infinity, zero transcendentals, zero division by zero, and six zero-axiom theorems locked in the bare kernel. Could we stop here and build all of mathematics and physics on the one-dimensional ring $\mathbb{QP}^1$?

The answer is **no**. Look once more at the formula for `projectiveMul`:

::: {.remark #rem-ch02-abelian-limit title="Why the One-Dimensional Projective Circle Remains Commutative (ARGUED)"}
Swap $(p_1, q_1)$ and $(p_2, q_2)$ in `projectiveMul`: the first component $p_2 q_1 + q_2 p_1 = p_1 q_2 + q_1 p_2$ is unchanged, and the second component $q_2 q_1 - p_2 p_1 = q_1 q_2 - p_1 p_2$ is unchanged as well. Consequently, defining ternary transport on $\mathbb{QP}^1$ by $[a, b, c] := a \odot \bar{b} \odot c$ (with $\bar{b} = (-p_b, q_b)$) satisfies Laws I and II of `AXIOM-Ω` from [Chapter 1](ch01-axiom-omega-and-cic.md), yet identically obeys $[a, b, c] = [c, b, a]$—**failing Law III's order sensitivity**. A single circle holds only one rotation plane, so operations always commute.
:::

For the order of rotations to change a reading, we must leave this commutative projective circle. A non-Abelian Lie algebra with a positive-definite invariant form needs at least three dimensions. Canonical integer ternions give a noncommutative rational projective example. See [Chapter 3](ch03-canonical-ternion-manifold.md).
