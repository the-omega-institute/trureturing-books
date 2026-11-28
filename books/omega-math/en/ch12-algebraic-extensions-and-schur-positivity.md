# Chapter 12 Quadratic Extensions and Rational Schur Positivity {#chapter-12-zero-axiom-quadratic-extensions-and-rational-schur-positivity}

> *"Meeting $\sqrt{2}$ or the golden ratio $\varphi$ never requires retreating to an axiom-of-choice continuum; adjoining one finite relation $\alpha^2 = b\alpha + c$ to ordered pairs of rationals closes algebraic extrema, pentagonal Chebyshev cycles, and Schur positivity certificates in finite arithmetic."*

The previous two chapters carried purely rational harmonic analysis to unexpected depth: the integer-spin characters $E_n(\kappa)$ eliminated $\sqrt{\kappa}$, and the factorial Haar functional $H(a, b, c, d)$ eliminated $\pi$. Yet physics and geometry confront three genuine boundaries that cannot stay inside $\mathbb{Q}$:

1. **Unit normalization along a non-square ray**: The canonical equatorial state `pHalf = (1, 1, 0, 0)` has squared norm $\lVert p_{\mathrm{Half}}\rVert^2 = 2$, which is not a rational square. Although its projective fidelity $\kappa = \frac{1}{2}$ and adjoint rotation $\operatorname{Ad}(p_{\mathrm{Half}}) \in \mathrm{SO}(3, \mathbb{Z})$ remain purely rational, normalizing along the same ray to a unit spinor $p_{\mathrm{Half}} / \lVert p_{\mathrm{Half}}\rVert$ inevitably encounters $\sqrt{2}$.
2. **Quantum nonlocality extrema**: The Tsirelson quantum ceiling of the Clauser–Horne–Shimony–Holt (CHSH) Bell inequality equals $2\sqrt{2}$.
3. **Pentagonal symmetry and golden Chebyshev closure**: Pentagonal and icosahedral spinor cycles hinge on $\cos(\pi/5) = \varphi/2$, a root of the irreducible quadratic $4x^2 - 2x - 1 = 0$.

Classical analysis reacts to any of these three thresholds by dumping the entire calculation into the real continuum $\mathbb{R}$, built from Cauchy equivalence classes and the axiom of choice. This chapter executes the surgical alternative of `OmegaMath`: **never swallow an uncountable continuum merely to adjoin a single square root**. Constructing degree-2 algebraic extensions `QuadPoly(b, c)` (realized over integral parameters as `RatQuadPoly b c`) directly as ordered pairs of finite rationals—and pairing them with rational Lagrange–Gram identities and block Schur complement positivity—captures both algebraic extrema and operator positivity with zero limits and zero numerical eigenvalue approximations. The full zero-axiom core—norm multiplicativity, exact inversion, `QSqrt2` and `QPhi` extrema, pentagonal Chebyshev closure, and rational Lagrange–Gram and Schur completion—is proved in D5 on the strict backend (`strict_omega.axioms: []`).

---

## 12.1 Degree-2 Algebraic Extensions QuadPoly(b, c) via Ordered Pairs {#sec-ch12-quadpoly-extensions}

Forming the quadratic extension $\mathbb{Q}[\alpha]/(\alpha^2 - b\alpha - c)$ ($b, c \in \mathbb{Q}$) never requires locating an infinite decimal expansion $\alpha$ on a real line. Inside bare Calculus of Inductive Constructions (CIC), it is simply the type of ordered pairs $(p, q) \in \mathbb{Q}^2$ (written intuitively as $p + q\alpha$), endowed with finite arithmetic completely determined by the rewrite rule $\alpha^2 \mapsto b\alpha + c$.

::: {.definition #def-ch12-quadpoly title="Ordered-Pair Construction of Quadratic Extensions"}
Fix rational parameters $b, c \in \mathbb{Q}$. Define the quadratic quotient algebra $\operatorname{QuadPoly}(b, c) := \mathbb{Q}[\alpha]/(\alpha^2 - b\alpha - c)$ on ordered pairs $(p, q) \in \mathbb{Q} \times \mathbb{Q}$ (representing $p + q\alpha$) with the following zero-axiom rational operations:

1. **Addition, subtraction, and multiplication**:

   $$
   (p, q) \pm (r, s) \;=\; (p \pm r,\; q \pm s), \qquad (p, q) \cdot (r, s) \;=\; (pr + c q s,\; ps + qr + b q s);
   $$

2. **Galois conjugation**: encoding Vieta's trace identity $\alpha + \bar{\alpha} = b$,

   $$
   \overline{(p, q)} \;:=\; (p + bq,\; -q);
   $$

3. **Galois norm and exact inversion**: define the rational norm

   $$
   N(p, q) \;:=\; p^2 + b p q - c q^2 \;\in\; \mathbb{Q}.
   $$

   Whenever $N(p, q) \neq 0$, the exact multiplicative inverse is given in four rational operations by

   $$
   (p, q)^{-1} \;=\; \left(\frac{p + bq}{N(p, q)},\; \frac{-q}{N(p, q)}\right).
   $$

:::

Every field law of this construction follows by direct polynomial expansion on pairs, with zero axioms and zero limits:

- **Conjugate-product identity**: Expanding $(p, q)\cdot\overline{(p, q)}$ gives $\alpha$-coefficient $-pq + q(p + bq) - bq^2 = 0$ and constant term $p(p + bq) - cq^2 = N(p, q)$, so $(p, q)\cdot\overline{(p, q)} = (N(p, q), 0)$; dividing by $N(p, q)$ immediately verifies $(p, q)\cdot(p, q)^{-1} = (1, 0)$.
- **Galois automorphism and norm multiplicativity**: Direct pair expansion verifies $\overline{x \cdot y} = \bar{x}\cdot\bar{y}$, yielding the **universal norm multiplicativity law**

  $$
  N(x \cdot y) \;=\; (x \cdot y)\,\overline{(x \cdot y)} \;=\; x\bar{x}\,y\bar{y} \;=\; N(x)\,N(y).
  $$

- **Discriminant irreducibility and true field criterion**: Setting $\Delta := b^2 + 4c \in \mathbb{Q}$, completing the square gives

  $$
  4\,N(p, q) \;=\; (2p + bq)^2 - \Delta\,q^2.
  $$

  Whenever $\Delta$ is not a rational square, every nonzero pair $(p, q) \neq (0, 0)$ satisfies $N(p, q) \neq 0$ (otherwise $q \neq 0$ forces $\Delta = ((2p + bq)/q)^2$, a contradiction, while $q = 0$ forces $p = 0$). Without quotients or the axiom of choice, `QuadPoly(b, c)` is a **computable, decidable quadratic number field**.

---

## 12.2 Two Physical Workhorses: QSqrt2 and QPhi {#sec-ch12-qsqrt2-and-qphi}

Specializing $(b, c)$ to two elementary integer choices captures both quantum Bell extrema and pentagonal golden geometry in exact finite arithmetic.

### 12.2.1 QSqrt2 ($b = 0, c = 2$): Unit $90^\circ$ Spinor and the CHSH Tsirelson Ceiling {#sec-ch12-qsqrt2-chsh}

Setting $b = 0$ and $c = 2$ (relation $\delta^2 = 2$, discriminant $\Delta = 8$, not a rational square) yields the zero-axiom field $\operatorname{QSqrt2} = \mathbb{Q}[\delta]/(\delta^2 - 2)$, with conjugation $\overline{p + q\delta} = p - q\delta$ and norm $N(p, q) = p^2 - 2q^2$. Two constructions traditionally thought to demand $\mathbb{R}$ become exact pair arithmetic:

1. **Unit $90^\circ$ spinor $u_{90^\circ}$ and eight-beat double-cover closure**: Along the equatorial ray `pHalf = (1, 1, 0, 0)`, form the unit spinor $u_{90^\circ} := \frac{\delta}{2}(1 + \mathbf{i})$. Its squared norm inside `QSqrt2` is identically $\bigl(\frac{\delta}{2}\bigr)^2 + \bigl(\frac{\delta}{2}\bigr)^2 = \frac{2}{4} + \frac{2}{4} = 1$, and repeated squaring gives

   $$
   u_{90^\circ}^2 \;=\; \frac{\delta^2}{4}(1 + 2\mathbf{i} - 1) \;=\; \mathbf{i}, \qquad u_{90^\circ}^4 \;=\; -1, \qquad u_{90^\circ}^8 \;=\; 1.
   $$

   Each beat advances the adjoint frame by $90^\circ$: four beats ($360^\circ$) flip the spinor cleanly to $-1$, and eight beats ($720^\circ$) close back to $+1$.

2. **Floating-point-free CHSH Tsirelson ceiling**: On the maximally entangled Bell state $\lvert\Phi^+\rangle = \frac{\delta}{2}(\lvert 00\rangle + \lvert 11\rangle)$ (whose Pauli correlators satisfy $\langle Z \otimes Z\rangle = \langle X \otimes X\rangle = 1$ and $\langle Z \otimes X\rangle = \langle X \otimes Z\rangle = 0$), take four self-adjoint unitary observables over `QSqrt2`:

   $$
   A_0 = Z, \qquad A_1 = X, \qquad B_0 = \frac{\delta}{2}(Z + X), \qquad B_1 = \frac{\delta}{2}(Z - X).
   $$

   Using $Z^2 = X^2 = I$, $ZX + XZ = 0$, and $\delta^2 = 2$ verifies $B_0^2 = B_1^2 = \frac{\delta^2}{4}(2I) = I$. The four bipartite correlators equal $\langle A_0 \otimes B_0\rangle = \langle A_0 \otimes B_1\rangle = \langle A_1 \otimes B_0\rangle = +\frac{\delta}{2}$ and $\langle A_1 \otimes B_1\rangle = -\frac{\delta}{2}$, locking the Bell combination identically to

   $$
   S_{\mathrm{CHSH}} \;=\; \langle A_0 \otimes B_0\rangle + \langle A_0 \otimes B_1\rangle + \langle A_1 \otimes B_0\rangle - \langle A_1 \otimes B_1\rangle \;=\; 2\delta, \qquad S_{\mathrm{CHSH}}^2 \;=\; 4\delta^2 \;=\; 8.
   $$

   In the operator shadow, any CHSH operator $C = A_0\otimes(B_0 + B_1) + A_1\otimes(B_0 - B_1)$ built from self-adjoint unitaries obeys Landau's identity $C^2 = 4I - [A_0, A_1]\otimes[B_0, B_1]$, forcing $\lVert C\rVert^2 \le 8$; the `QSqrt2` construction saturates this bound exactly.

Norm multiplicativity and exact inversion for general integral-parameter quadratic algebras `RatQuadPoly b c`, together with the `QSqrt2` unit $90^\circ$ spinor closure and squared CHSH bound, are proved in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch12-zero-axiom-quadpoly-qsqrt2 title="Quadratic Norm Multiplicativity, Exact Inversion, and QSqrt2 Spinor and Bell Extrema" lean="D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.quadratic_norm_mul D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.quadratic_mul_inv D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.sqrt_two_spinor D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.sqrt_two_bell"}
The cited D5 declarations record `strict_omega.axioms: []`. The following four theorems hold:

1. **Universal quadratic norm multiplicativity** (`quadratic_norm_mul`): for all integers `b c : Omega.Int` and all elements `z w : RatQuadPoly b c`, under `Omega.FiniteRatio.Equivalent`,

   $$
   N(z \cdot w) \;\equiv\; N(z)\,N(w).
   $$

2. **Exact inversion for nonzero norm** (`quadratic_mul_inv`): for all integers `b c : Omega.Int` and any `z : RatQuadPoly b c` whose norm numerator is nonzero (`(norm z).num ≠ 0`), under `QuadPoly.Equivalent`,

   $$
   z \cdot z^{-1} \;\equiv\; 1.
   $$

3. **Unit $90^\circ$ spinor normalization and eight-beat closure** (`sqrt_two_spinor`): in `QSqrt2`, the right-angle spinor `u90` simultaneously satisfies $\operatorname{normSq}(u_{90}) \equiv 1$ (under `QSqrt2.scalarRing.eqv`) and $u_{90}^8 \equiv 1$ (under `QSqrt2.spinorRing.eqv`).

4. **Squared CHSH Bell value** (`sqrt_two_bell`): in `QSqrt2`, the Bell combination `QSqrt2.bell` satisfies under `QSqrt2.scalarRing.eqv`

   $$
   \mathrm{bell}^2 \;\equiv\; 8.
   $$

:::

::: {.proof}
The first two items are proved inside `module` + `prelude` files directly from ordered-pair multiplication `(pr + cqs, ps + qr + bqs)` and the norm $N(p, q) = p^2 + bpq - cq^2$: direct ring expansion in `rationalRing` yields $N(zw) \equiv N(z)N(w)$, and when the norm numerator is nonzero, the inverse `z.inv` divides the conjugate pair by $N(z)$ so $z \cdot z^{-1} \equiv 1$ under `QuadPoly.Equivalent`. The last two items evaluate directly in `QSqrt2` ($\delta^2 = 2$), checking $\operatorname{normSq}(u_{90}) = \frac{\delta^2}{4} + \frac{\delta^2}{4} \equiv 1$ and repeated squaring $u_{90}^2 \equiv \mathbf{i}$, $u_{90}^4 \equiv -1$, $u_{90}^8 \equiv 1$, together with $\mathrm{bell}^2 \equiv 4\delta^2 \equiv 8$. The full proof is checked by the Lean kernel.
:::

### 12.2.2 QPhi ($b = 1, c = 1$): Fibonacci Power Law, Cassini Norm, and Pentagonal Chebyshev Closure {#sec-ch12-qphi-fibonacci-pentagon}

Setting $b = 1$ and $c = 1$ (relation $\varphi^2 = \varphi + 1$, discriminant $\Delta = 5$, not a rational square) defines the golden field $\operatorname{QPhi} = \mathbb{Q}[\varphi]/(\varphi^2 - \varphi - 1)$, with conjugation $\overline{p + q\varphi} = (p + q) - q\varphi$ ($\bar{\varphi} = 1 - \varphi$) and norm $N(p, q) = p^2 + pq - q^2$. Three laws bridging number theory and pentagonal geometry fall out in three lines each:

1. **Universal Fibonacci power law**: With $F_0 = 0, F_1 = 1, F_{n+1} = F_n + F_{n-1}$, the base case reads $\varphi^1 = 0 + 1\cdot\varphi = F_0 + F_1\varphi$; assuming $\varphi^n = F_{n-1} + F_n\varphi$,

   $$
   \varphi^{n+1} \;=\; F_{n-1}\varphi + F_n(\varphi + 1) \;=\; F_n + (F_{n-1} + F_n)\varphi \;=\; F_n + F_{n+1}\varphi.
   $$

   Hence $\varphi^n = F_{n-1} + F_n\varphi$ holds universally for all $n \ge 1$.

2. **Universal Galois norm and Cassini's identity**: Since $N(\varphi) = N(0, 1) = -1$, norm multiplicativity immediately delivers

   $$
   N(\varphi^n) \;=\; N(\varphi)^n \;=\; (-1)^n \quad \Longrightarrow \quad F_{n-1}^2 + F_{n-1}F_n - F_n^2 \;=\; F_{n+1}F_{n-1} - F_n^2 \;=\; (-1)^n.
   $$

3. **Trigonometry-free pentagonal Chebyshev closure**: Bypassing $\cos(\pi/5)$ and $\cos(2\pi/5)$ completely, factor the fifth first-kind Chebyshev polynomial $T_5(x) = 16x^5 - 20x^3 + 5x$:

   $$
   T_5(x) + 1 \;=\; (x + 1)(4x^2 - 2x - 1)^2, \qquad T_5(x) - 1 \;=\; (x - 1)(4x^2 + 2x - 1)^2.
   $$

   In `QPhi`, testing $x_1 := \frac{\varphi}{2}$ gives $4(\frac{\varphi}{2})^2 - 2(\frac{\varphi}{2}) - 1 = \varphi^2 - \varphi - 1 = 0$, immediately forcing $T_5(\varphi/2) = -1$, and hence $T_{10}(\varphi/2) = 2 T_5(\varphi/2)^2 - 1 = 1$. Likewise, testing $x_2 := \frac{\varphi - 1}{2}$ gives $4(\frac{\varphi - 1}{2})^2 + 2(\frac{\varphi - 1}{2}) - 1 = (\varphi^2 - 2\varphi + 1) + (\varphi - 1) - 1 = \varphi^2 - \varphi - 1 = 0$, proving $T_5\bigl(\frac{\varphi - 1}{2}\bigr) = 1$ with zero trigonometry.

All three golden laws are proved in D5 on the strict backend (`strict_omega.axioms: []`) across `OmegaQuadraticAndSchur` and `OmegaChebyshevHecke`:

::: {.theorem #thm-ch12-zero-axiom-qphi-fibonacci-pentagon title="Golden Field QPhi Fibonacci Powers, Norm Law, and Pentagonal Chebyshev Closure" lean="D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.phi_fibonacci D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.phi_power_norm D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.pentagonal_chebyshev"}
The cited D5 declarations record `strict_omega.axioms: []`. In the golden quadratic extension `QPhi` ($b = 1, c = 1$, relation $\varphi^2 = \varphi + 1$), the following three theorems hold:

1. **Fibonacci power law** (`phi_fibonacci`): for every natural number `n : Omega.Nat`, under `QuadPoly.Equivalent`,

   $$
   \varphi^{n+1} \;\equiv\; F_n + F_{n+1}\,\varphi.
   $$

2. **Power norm law** (`phi_power_norm`): for every natural number `n : Omega.Nat`, under `Omega.FiniteRatio.Equivalent`,

   $$
   N(\varphi^n) \;\equiv\; (-1)^n.
   $$

3. **Pentagonal first-kind Chebyshev closure** (`pentagonal_chebyshev`): under `QPhi.scalarRing.eqv`, simultaneously

   $$
   T_5\!\left(\frac{\varphi}{2}\right) \;\equiv\; -1, \qquad T_{10}\!\left(\frac{\varphi}{2}\right) \;\equiv\; 1, \qquad T_5\!\left(\frac{\varphi - 1}{2}\right) \;\equiv\; 1.
   $$

:::

::: {.proof}
Item 1 proceeds by induction on $n \in \mathbb{N}$: the base case reads $\varphi^1 = (0, 1) = (F_0, F_1)$, and multiplying $\varphi^{n+1} \equiv F_n + F_{n+1}\varphi$ by $\varphi$ using $\varphi^2 = \varphi + 1$ yields $F_{n+1} + (F_n + F_{n+1})\varphi = F_{n+1} + F_{n+2}\varphi$. Item 2 follows by induction from $N(\varphi^0) = 1$ and $N(\varphi) = -1$ via norm multiplicativity in [@thm-ch12-zero-axiom-quadpoly-qsqrt2]. Item 3 evaluates the first-kind Chebyshev recurrence directly in `QPhi.scalarRing` using $\varphi^2 = \varphi + 1$ and index doubling $T_{10}(x) = 2 T_5(x)^2 - 1$, certifying all three pentagonal identities with zero trigonometry. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch12-quadpoly-ledger title="Term-by-Term Pair Arithmetic Ledger for QSqrt2 and QPhi"}
Both fields reduce to crisp hand-checkable pair operations:

- **Inversion and CHSH check in `QSqrt2`**: For $(1, 1) = 1 + \delta$, we have $N(1, 1) = 1 - 2 = -1$, so $(1, 1)^{-1} = (-1, 1)$; checking $(1, 1)(-1, 1) = (-1 + 2, 1 - 1) = (1, 0)$. The CHSH sum is $S = (0, \frac{1}{2}) + (0, \frac{1}{2}) + (0, \frac{1}{2}) - (0, -\frac{1}{2}) = (0, 2)$, whose square is $(0, 2)(0, 2) = (2\cdot 4, 0) = (8, 0)$.
- **High powers and Chebyshev orbit in `QPhi`**: At $n = 12$, $F_{11} = 89$ and $F_{12} = 144$ give $\varphi^{12} = (89, 144)$, whose norm checks as $N(89, 144) = 89^2 + 89\cdot 144 - 144^2 = 7921 + 12816 - 20736 = 1 = (-1)^{12}$. Running $T_{k+1}(x) = 2x T_k(x) - T_{k-1}(x)$ at $x_1 = (0, \frac{1}{2})$ traces the exact half-decagon orbit

  $$
  T_0(x_1) = 1, \quad T_1(x_1) = \frac{\varphi}{2}, \quad T_2(x_1) = \frac{\varphi - 1}{2}, \quad T_3(x_1) = \frac{1 - \varphi}{2}, \quad T_4(x_1) = -\frac{\varphi}{2}, \quad T_5(x_1) = -1,
  $$

  closing seamlessly back to $T_{10}(\varphi/2) = 1$ on the tenth beat.
:::

---

## 12.3 Rational Lagrange–Gram Identities and Schur Complement Positivity {#sec-ch12-lagrange-schur-positivity}

Having tamed quadratic irrationals, harmonic analysis and quantum bounds face one more foundational challenge: **how can we certify that a quadratic form or Gram matrix is positive semidefinite—and compute its exact minimum—without extracting irrational eigenvalues or appealing to compactness on $\mathbb{R}$?**

The answer resides in two razor-sharp rational algebraic identities: **sum-of-squares completion (Lagrange's identity)** and **block elimination (the Schur complement)**. Start with the clearest two-variable quadratic form: whenever $c > 0$, direct expansion verifies for arbitrary rational $a, b, c$ and variables $x, y$ that

$$
a x^2 + 2 b x y + c y^2 \;=\; \left(a - \frac{b^2}{c}\right)x^2 \;+\; c\!\left(y + \frac{b}{c}x\right)^2.
$$

This single line accomplishes two decisive tasks at once. First, it displays the quadratic form as a weighted sum of two squares, reducing **positive semidefiniteness to two rational inequalities $c > 0$ and $S := a - b^2/c \ge 0$** without ever solving a characteristic polynomial. Second, because $c > 0$ and the squared term is nonnegative, minimizing over the internal variable $y$ for any fixed boundary value $x$ attains its unique global minimum at $y^* = -\frac{b}{c}x$, where the value equals the Schur complement form $S x^2 = (a - b^2/c)x^2$.

This entire rational positivity and minimization engine—spanning the Lagrange–Gram identity and Cauchy–Schwarz inequality for arbitrary finite rational coordinate sequences, nonzero-pivot scalar Schur completion, and positive-pivot global minimization—is proved directly over `Omega.FiniteRatio` in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch12-zero-axiom-lagrange-schur title="Rational Lagrange–Gram Identity, Cauchy–Schwarz Inequality, and Scalar Schur Minimum" lean="D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_lagrange_gram D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_cauchy_schwarz D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_complete D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_schur_min"}
The cited D5 declarations record `strict_omega.axioms: []`. The following four rational positivity and minimization theorems hold:

1. **Rational Lagrange–Gram identity** (`rational_lagrange_gram`): for any finite rational coordinate-pair sequence `xs : Sequence (CoordinatePair FiniteRatio)`, under `Omega.FiniteRatio.Equivalent`,

   $$
   \operatorname{gramDet}(\mathrm{xs}) \;\equiv\; \operatorname{minorSquares}(\mathrm{xs}),
   $$

   where $\operatorname{gramDet}(\mathrm{xs}) = \operatorname{sumU2}(\mathrm{xs})\cdot\operatorname{sumV2}(\mathrm{xs}) - (\operatorname{sumUV}(\mathrm{xs}))^2$ and $\operatorname{minorSquares}(\mathrm{xs})$ is the sum of squared two-coordinate minors $(u_i v_j - u_j v_i)^2$ ($i < j$).

2. **Rational Cauchy–Schwarz inequality** (`rational_cauchy_schwarz`): for any finite rational coordinate-pair sequence `xs : Sequence (CoordinatePair FiniteRatio)`, under `FiniteRatio.Le`,

   $$
   \bigl(\operatorname{sumUV}(\mathrm{xs})\bigr)^2 \;\le\; \operatorname{sumU2}(\mathrm{xs}) \cdot \operatorname{sumV2}(\mathrm{xs}).
   $$

3. **Nonzero-pivot rational Schur completion** (`rational_schur_complete`): for any finite rationals `a b c x y : Omega.FiniteRatio` with nonzero pivot (`c.num ≠ 0`, of either sign), under `Omega.FiniteRatio.Equivalent`,

   $$
   a x^2 + 2 b x y + c y^2 \;\equiv\; \left(a - \frac{b^2}{c}\right)x^2 \;+\; c\!\left(y + \frac{b}{c}x\right)^2.
   $$

4. **Positive-pivot attained global Schur minimum** (`rational_schur_min`): for any finite rationals `a b c x : Omega.FiniteRatio` with strictly positive pivot $0 < c$ (`FiniteRatio.zero.Lt c`), simultaneously:

   - for every `y : Omega.FiniteRatio`, $(a - b^2/c)x^2 \le a x^2 + 2 b x y + c y^2$ under `FiniteRatio.Le`;
   - at the explicit minimizer $y^* = -(b/c)x$ (`schurMinPoint b c x`), the quadratic form attains the Schur value under `Omega.FiniteRatio.Equivalent`: $a x^2 + 2 b x y^* + c (y^*)^2 \equiv (a - b^2/c)x^2$.
:::

::: {.proof}
Item 1 proceeds by structural induction on the finite sequence `xs`, verifying from the commutative-ring laws that adjoining a pair `(u, v)` increments `gramDet` by the sum of its squared $2 \times 2$ minors against all preceding pairs, with no division by $2$. Item 2 follows immediately because every square in `Omega.FiniteRatio` is nonnegative, forcing `minorSquares xs ≥ 0`. Item 3 expands the right-hand side using the rational inverse of the nonzero pivot $c$ and cancels $\pm (b^2/c)x^2$ under `Omega.FiniteRatio.Equivalent`. Item 4 uses $0 < c$ to certify $c(y + (b/c)x)^2 \ge 0$ for all `y`, establishing the global lower bound, and substitutes $y^* = -(b/c)x$ to annihilate the squared term and attain $(a - b^2/c)x^2$. The full proof is checked by the Lean kernel.
:::

Alongside this zero-axiom core, the classical real and complex shadow layer provides the corresponding Lean-verified theorems over arbitrary finite index sets and block complex matrices. First, the real Lagrange–Gram identity displays the Cauchy–Schwarz defect explicitly as a double sum of wedge squares:

::: {.theorem #thm-ch12-lagrange-gram title="Lagrange–Gram Sum-of-Squares Identity" lean="D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
Let $\iota$ be any index type, $s \subseteq \iota$ a finite subset, and $u, v : \iota \to \mathbb{R}$ real-valued functions. Then the Cauchy–Schwarz defect equals the manifestly nonnegative sum of squares

$$
\left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
$$

:::

::: {.proof}
Expand $(u_i v_j - u_j v_i)^2 = u_i^2 v_j^2 + u_j^2 v_i^2 - 2 u_i v_i u_j v_j$ inside the double sum over $s \times s$. Swapping summation indices gives $\sum_{i,j} u_j^2 v_i^2 = \sum_{i,j} u_i^2 v_j^2$, so the double sum equals $2(\sum_i u_i^2)(\sum_j v_j^2) - 2(\sum_i u_i v_i)^2$; dividing by $2$ completes the identity. The full proof is checked by the Lean kernel.
:::

The arbitrary finite-dimensional matrix generalization of two-variable square completion is the block Schur minimum theorem—which will also govern observer memory-window splitting in [Chapter 18](ch18-zero-axiom-kernel-and-shadow-bridge.md). Splitting a state vector into an external boundary block $x$ and an internal block $y$, whenever the internal block $C$ is positive definite, minimizing over all internal choices $y$ collapses exactly onto the boundary Schur complement $S = A - B C^{-1} B^{\mathsf{H}}$.

::: {.theorem #thm-ch12-schur-minimum title="Block Schur Complement Quadratic Form as Exact Minimum" lean="D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least"}
Let $m, n$ be finite index types, $A \in M_m(\mathbb{C})$ a Hermitian matrix, $B \in M_{m \times n}(\mathbb{C})$ any complex matrix, and $C \in M_n(\mathbb{C})$ a positive definite matrix. Set $S := A - B C^{-1} B^{\mathsf{H}}$. Then for every boundary vector $x \in \mathbb{C}^m$, the Schur complement value $x^* S x$ is the exact least element (`IsLeast`—attained in the range and bounding every element from below) of the set of values

$$
\left\{\, \begin{pmatrix} x \\ y \end{pmatrix}^* \begin{pmatrix} A & B \\ B^{\mathsf{H}} & C \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} \;\Bigg|\; y \in \mathbb{C}^n \,\right\}
$$

as $y$ ranges over $\mathbb{C}^n$, attained at $y^* = -C^{-1} B^{\mathsf{H}} x$.
:::

::: {.proof}
Because $C$ is positive definite, it is Hermitian and invertible. Completing the square on the block quadratic form gives the exact algebraic decomposition

$$
\begin{pmatrix} x \\ y \end{pmatrix}^* \begin{pmatrix} A & B \\ B^{\mathsf{H}} & C \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} \;=\; x^* (A - B C^{-1} B^{\mathsf{H}}) x \;+\; (C^{-1} B^{\mathsf{H}} x + y)^*\,C\,(C^{-1} B^{\mathsf{H}} x + y).
$$

Evaluating at $y^* = -C^{-1} B^{\mathsf{H}} x$ annihilates the second term, showing $x^* S x$ lies in the range; for every $y \in \mathbb{C}^n$, positivity of $C$ guarantees the second term is nonnegative, bounding all values below by $x^* S x$. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch12-schur-worked title="Worked Rational Block Schur Elimination: $A = 2,\; B = 1,\; C = 3/2$"}
Consider the symmetric rational block matrix $K = \begin{pmatrix} A & B \\ B^\top & C \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 3/2 \end{pmatrix}$ with positive internal block $C = \frac{3}{2} > 0$. Pure rational arithmetic performs exact elimination:

1. **Exact rational Schur complement**: Since $C^{-1} = \frac{2}{3}$,

   $$
   S \;=\; A - B C^{-1} B^\top \;=\; 2 - 1 \cdot \frac{2}{3} \cdot 1 \;=\; \frac{4}{3} \;>\; 0.
   $$

2. **Exact internal minimizer and completion of the square**: $y^* = -C^{-1} B^\top x = -\frac{2}{3}x$, and

   $$
   2x^2 + 2xy + \frac{3}{2}y^2 \;=\; \frac{4}{3}x^2 \;+\; \frac{3}{2}\!\left(y + \frac{2}{3}x\right)^2.
   $$

3. **Determinant and positivity verification**: $\det K = AC - B^2 = 2 \cdot \frac{3}{2} - 1^2 = 2 = \frac{3}{2} \cdot \frac{4}{3} = C \cdot S > 0$. Both positivity and the exact minimum are certified in pure fractions without ever touching the irrational eigenvalues $\lambda_{\pm} = \frac{7 \pm \sqrt{17}}{4}$.
:::

The figure below pairs both zero-axiom rational tools on a single plate: the left panel maps the Fibonacci power progression, alternating Galois norm $N(\varphi^n) = (-1)^n$, and pentagonal Chebyshev closure $T_5(\varphi/2) = -1$ inside `QPhi`; the right panel charts the parabolic valley of $2x^2 + 2xy + \frac{3}{2}y^2$ over the internal variable $y$, pinning its exact rational Schur complement minimum $S = \frac{4}{3}$ at $y^* = -\frac{2}{3}x$.

::: {.figure src="ch12-quadext-schur-valley"}
**Quadratic extension `QPhi` and the rational Schur complement valley.** The left panel displays the ordered-pair Fibonacci powers $\varphi^{n+1} = F_n + F_{n+1}\varphi$, alternating Cassini norms $N(\varphi^n) = (-1)^n$, and trigonometry-free pentagonal closure $T_5(\varphi/2) = -1$ inside `QPhi` ([@thm-ch12-zero-axiom-qphi-fibonacci-pentagon], [@ex-ch12-quadpoly-ledger]). The right panel plots the parabolic cross-section over $y$ for the worked block matrix $A = 2,\; B = 1,\; C = \frac{3}{2}$, pinpointing the unique elimination point $y^* = -\frac{2}{3}x$ and the exact rational Schur valley floor $S = \frac{4}{3}$ ([@thm-ch12-zero-axiom-lagrange-schur], [@ex-ch12-schur-worked]).
:::

---

## 12.4 Gram Realizability, Isometry Rigidity, and the Bridge to Volume V {#sec-ch12-gram-realizability-and-isometry}

Rational sums of squares and Schur complements deliver **computable certificates** of positivity. In the Hilbert-space and geometric shadow layer, positivity of a bounded operator characterizes Gram factorization. Rigidity of a global isometry, in turn, comes from a permutation preserving every inner product of a spanning family. Two final Lean-verified theorems anchor this structural bridge at the close of Volume IV.

::: {.theorem #thm-ch12-gram-realizability title="Gram Factorization Equivalence for Positive Operators" lean="D5/S3/QuantumBounds/GramRealizability.gram_realizability"}
Let $V$ be a complex Hilbert space and $Q : V \to_L V$ a continuous linear operator. Then $Q$ is positive ($0 \le Q$) if and only if there exists a continuous linear operator $O : V \to_L V$ satisfying both the adjoint-square factorization $Q = O^\dagger O$ and the Gram pairing identity

$$
\forall x, y \in V, \qquad \langle Q x, y\rangle \;=\; \langle O x, O y\rangle.
$$

:::

::: {.proof}
In the forward direction, the continuous functional calculus supplies the canonical positive square root $O := \sqrt{Q}$, which is self-adjoint ($O^\dagger = O$) and satisfies $O^2 = Q$; hence $Q = O^\dagger O$, and the adjoint relation immediately yields $\langle Qx, y\rangle = \langle O^\dagger O x, y\rangle = \langle Ox, Oy\rangle$. Conversely, every operator of the form $O^\dagger O$ is manifestly positive, so $0 \le Q$. The full proof is checked by the Lean kernel.
:::

Whenever a permutation of a spanning family preserves all pairwise Gram inner products, that purely combinatorial invariance extends uniquely to a global linear isometry, leaving zero hidden degrees of freedom.

::: {.theorem #thm-ch12-gram-isometry-extension title="Unique Global Isometry Extension of Gram-Preserving Permutations" lean="D5/S3/Quantum/AURICOmega/GramIsometryExtension.existsUnique_linearIsometryEquiv_of_gram_preserving"}
Let $E$ be a real inner product space and $\varphi : \iota \to E$ a spanning family ($\operatorname{span}_{\mathbb{R}}(\operatorname{range}\varphi) = E$). If a permutation $\sigma \in \operatorname{Perm}(\iota)$ preserves all pairwise Gram inner products,

$$
\forall a, b \in \iota, \qquad \langle \varphi(\sigma a), \varphi(\sigma b)\rangle_{\mathbb{R}} \;=\; \langle \varphi a, \varphi b\rangle_{\mathbb{R}},
$$

then there exists a unique linear isometry equivalence $U : E \simeq_{\mathrm{li}} E$ satisfying $U(\varphi a) = \varphi(\sigma a)$ for all $a \in \iota$.
:::

::: {.proof}
For every finitely supported coefficient tuple $c$, bilinearity gives $\bigl\lVert \sum_a c_a \varphi(\sigma a)\bigr\rVert^2 = \sum_{a,b} c_a c_b \langle \varphi(\sigma a), \varphi(\sigma b)\rangle_{\mathbb{R}} = \sum_{a,b} c_a c_b \langle \varphi a, \varphi b\rangle_{\mathbb{R}} = \bigl\lVert \sum_a c_a \varphi a\bigr\rVert^2$. Thus the assignment $\sum_a c_a \varphi a \mapsto \sum_a c_a \varphi(\sigma a)$ is independent of representation and strictly norm-preserving. Because $\varphi$ spans $E$ and $\sigma$ is bijective, the induced linear isometry is surjective, yielding $U$; uniqueness follows immediately because two linear maps agreeing on the spanning range of $\varphi$ coincide on all of $E$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch12-rational-sos-vs-real-shadow title="Rational Positivity on the Strict Backend and the Hilbert Shadow"}
Observe the exact architectural division across all seven frozen theorem groups in this chapter. Among the frozen D5 results using `OmegaInit` and `OmegaMath` (`strict_omega.axioms: []`), [@thm-ch12-zero-axiom-quadpoly-qsqrt2], [@thm-ch12-zero-axiom-qphi-fibonacci-pentagon], and [@thm-ch12-zero-axiom-lagrange-schur] establish quadratic norm multiplicativity, exact inversion, the `QSqrt2` and `QPhi` spinor/Bell/Fibonacci/pentagonal Chebyshev identities, the rational Lagrange–Gram identity, Cauchy–Schwarz, and scalar Schur minimization directly in finite pair and `Omega.FiniteRatio` arithmetic with no real completeness and no eigenvalues. On the classical real and complex shadow layer, [@thm-ch12-lagrange-gram] and [@thm-ch12-schur-minimum] provide the parallel real-sum and arbitrary finite-dimensional complex block-matrix versions. If a rational certificate establishes positivity of a bounded operator $Q$ on a complex Hilbert space, [@thm-ch12-gram-realizability] yields $Q=O^\dagger O$. In a real inner product space, [@thm-ch12-gram-isometry-extension] gives a unique global linear isometry extending a specified permutation of a spanning family that preserves every pairwise Gram inner product.
:::

A hand calculation shows what each hypothesis does. In $\mathbb{R}^2$, $e_1,2e_2$ span the plane and have positive definite Gram matrix $\operatorname{diag}(1,4)$. Swapping them sends a vector of norm $1$ to a vector of norm $2$, so no isometry extends the swap. For the family consisting of $e_1$ alone, the identity permutation preserves its inner product, but both the identity and reflection across the $e_1$-axis extend it. Uniqueness can fail when the family does not span.

::: {.film src="a-root-as-a-pair"}
**One rule, $\alpha^2 = b\alpha + c$, turns a square root into a pair of fractions, and sums of squares turn positivity into a hand-checkable certificate (2 min 44 s).** A cyan pair $(p, q)$ reads as $p + q\alpha$, and multiplying pairs only expands and applies the amber rule; the conjugate $(p + bq, -q)$ cancels the $\alpha$-part and leaves the norm $N = p^2 + bpq - cq^2$, and in `QSqrt2` the inverse $(1, 1)^{-1} = (-1, 1)$ is checked by hand. On the spinor plane the unit spinor $u = \frac{\delta}{2}(1 + \mathbf{i})$ turns $45^\circ$ per beat, $u^2 = \mathbf{i}$, $u^4 = -1$, $u^8 = 1$, while the small adjoint dial turns through $720^\circ$; the `QPhi` ladder lists $\varphi^n = (F_{n-1}, F_n)$ up to $\varphi^{12} = (89, 144)$ with norms alternating $-1$, $+1$; and the Chebyshev recurrence run at $\varphi/2$ lands $T_5 = -1$ and $T_{10} = 1$ on the corners of a regular decagon (violet PICTURE tag: the points are placed using $\varphi \approx 1.618$ only). The pairs $(1, 2), (3, 1), (2, 5)$ then give a Gram determinant $420 - 225 = 195$ equal to the sum of the squares of the magenta signed areas $-5, 1, 13$, and two hand counterexamples, $e_1, 2e_2$ and $e_1$ alone, show what each hypothesis of isometry extension does. The green tags refer, in order, to the exact inversion and eight-beat closure of [@thm-ch12-zero-axiom-quadpoly-qsqrt2], the power norm law and pentagonal Chebyshev closure of [@thm-ch12-zero-axiom-qphi-fibonacci-pentagon], the rational Lagrange–Gram identity of [@thm-ch12-zero-axiom-lagrange-schur], and, on the classical real shadow, [@thm-ch12-gram-isometry-extension]; every number under the cyan NUM tag is exact arithmetic done on screen, not a proof.
:::

In the interactive laboratory card below, explore the three algebraic constructions of this chapter in one place: step the unit $90^\circ$ spinor in `QSqrt2` around its eight-beat cycle $u_{90}^8 = 1$ and verify the floating-point-free CHSH Tsirelson square $S_{\mathrm{CHSH}}^2 = 8$ ([@thm-ch12-zero-axiom-quadpoly-qsqrt2]); advance Fibonacci powers $\varphi^{n+1} = F_n + F_{n+1}\varphi$ and the decagonal Chebyshev orbit in `QPhi` to watch $T_5(\varphi/2) = -1$ close without trigonometry ([@thm-ch12-zero-axiom-qphi-fibonacci-pentagon]); and slide the internal variable $y$ along the rational Schur valley to confirm that the exact floor $S = \frac{4}{3}$ is attained uniquely at $y^* = -\frac{2}{3}x$ ([@thm-ch12-zero-axiom-lagrange-schur], [@thm-ch12-schur-minimum]).

::: {.viz src="dfinite-algebraic-schur-lab" preset="quadratic-ext-and-schur" height="520"}
**Quadratic extensions and rational Schur valley card (`quadratic-ext-and-schur`).** Switch between the `QSqrt2` and `QPhi` ordered-pair fields to step through the eight-beat right-angle spinor $u_{90}^8 = 1$ and exact CHSH ceiling $S_{\mathrm{CHSH}}^2 = 8$ ([@thm-ch12-zero-axiom-quadpoly-qsqrt2]), trace Fibonacci powers alongside the pentagonal Chebyshev closure $T_5(\varphi/2) = -1$ ([@thm-ch12-zero-axiom-qphi-fibonacci-pentagon]), and drag the internal probe $y$ along $2x^2 + 2xy + \frac{3}{2}y^2$ to lock onto the exact rational Schur valley floor $S = \frac{4}{3}$ at $y^* = -\frac{2}{3}x$ ([@thm-ch12-zero-axiom-lagrange-schur], [@ex-ch12-schur-worked]).
:::

Volume IV—rational harmonic analysis on the three-sphere—now stands complete. From the Peter–Weyl spin shells and even-degree Chebyshev kernels $E_n(\kappa)$ of [Chapter 10](ch10-peter-weyl-rational-spin-shells.md), through the $\pi$-free factorial Haar expectation and zero-error character orthonormality of [Chapter 11](ch11-pi-free-haar-integration.md), to the zero-axiom quadratic extensions `QuadPoly(b, c)` and rational Lagrange–Schur positivity certificates of this chapter, the full toolkit of non-abelian rational spectral theory is forged. Volume V ([Chapter 13](ch13-computable-arithmetic-horizon.md)–[Chapter 15](ch15-rational-hecke-ramanujan-spectrum.md)) now turns this toolkit directly onto prime arithmetic, the Hurwitz quaternion free group $F_3$, and the complex-free Hecke–Ramanujan rational spectral gap.
