# Chapter 11 Pi-Free Factorial Haar Integration and Character Orthonormality

> *"On the real unit quaternion group, the surface area and the four half-integer Gamma factors contribute matching powers of $\pi$. Each even monomial has a normalized Haar moment given by a finite factorial ratio."*

On the signed real unit quaternion group $\mathrm{SU}(2)\cong S^3(\mathbb R)$, [Chapter 10](ch10-peter-weyl-rational-spin-shells.md) takes Fourier coefficients against the matrix entries of $D^j(q)$. The traces $\chi_j(q)=U_{2j}(c)$, with $c=\operatorname{Re}(q)$, form an orthonormal basis for square-integrable class functions under normalized Haar measure. At integer spin $j=n$ the character equals $E_n(\kappa)$ with $\kappa=c^2$. At $j=n+\tfrac12$ the character changes sign under $q\mapsto-q$, while its square is polynomial in $\kappa$. This chapter computes normalized Haar averages of polynomial signals, including the inner products of the integer-spin characters, by finite factorial formulas.

The Gaussian argument in §11.1 identifies normalized Haar moments on the real unit three-sphere with factorial ratios. In particular, $\mathbb E_{\mathrm{SU}(2)}[\kappa^k]=C_k/4^k$ for the $k$-th Catalan number $C_k$. The four Lean declarations below prove the rational moment recurrence, the first three characters’ Gram matrix, and the all-degree mean and inner-product identities using `Omega.IntRatio.Equivalent`. Their recorded axiom lists are `[]` on the strict backend and `[propext]` on the official backend.

---

## 11.1 The $\pi$-Free Three-Sphere Miracle: Why $\pi^2$ Cancels Identically in Dimension $3$ {#sec-ch11-pi-cancellation-miracle}

Let us first uncover the mechanism through the classical shadow of $\mathbb{R}^4$, and then rebuild the entire integration functional internally with zero axioms.

Consider the four-dimensional Gaussian moment integral on $\mathbb{R}^4$ (whose unit sphere is the three-sphere $S^3 = \{q = (w, x, y, z) \in \mathbb{R}^4 \mid w^2 + x^2 + y^2 + z^2 = 1\}$), for any natural numbers $a, b, c, d \in \mathbb{N}$ with $m := a + b + c + d$:

$$
I(a, b, c, d) \;:=\; \int_{\mathbb{R}^4} w^{2a} x^{2b} y^{2c} z^{2d}\,e^{-(w^2 + x^2 + y^2 + z^2)}\,dw\,dx\,dy\,dz.
$$

Evaluate this same integral in two coordinate systems, and the cancellation strikes before our eyes.

**Route 1: Cartesian separation of variables.** The integral factors into four independent one-dimensional even Gaussian integrals. For any $k \in \mathbb{N}$, substituting $u = t^2$ produces a half-integer Gamma value:

$$
\int_{-\infty}^{+\infty} t^{2k}\,e^{-t^2}\,dt \;=\; \Gamma\!\left(k + \frac{1}{2}\right) \;=\; \frac{(2k - 1)!!}{2^k}\,\Gamma\!\left(\frac{1}{2}\right) \;=\; \frac{(2k)!}{4^k\,k!}\,\sqrt{\pi}.
$$

Multiplying all four coordinate factors pairs the four copies of $\Gamma(\frac{1}{2}) = \sqrt{\pi}$ cleanly into an exact **square $\pi^2$**, leaving no square root behind:

$$
I(a, b, c, d) \;=\; \Gamma\!\left(\frac{1}{2}\right)^4 \cdot \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^{a+b+c+d}\,a!\,b!\,c!\,d!} \;=\; \pi^2 \cdot \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^m\,a!\,b!\,c!\,d!}.
$$

**Route 2: Four-dimensional spherical polar factorization.** Write $q = r\,\omega$ ($r > 0$, $\omega \in S^3$), so the volume element becomes $r^3\,dr\,d\sigma(\omega)$. Denote the surface area of $S^3$ by $\sigma(S^3) = \frac{2\pi^2}{\Gamma(2)} = 2\pi^2$ and the normalized Haar probability measure by $d\mu(\omega) = \frac{d\sigma(\omega)}{2\pi^2}$. Then

$$
I(a, b, c, d) \;=\; \left(\int_0^{\infty} r^{2m + 3}\,e^{-r^2}\,dr\right) \cdot \sigma(S^3) \cdot \mathbb{E}_{\mathrm{SU}(2)}\!\left[\frac{w^{2a} x^{2b} y^{2c} z^{2d}}{\lVert q\rVert^{2m}}\right].
$$

Setting $u = r^2$ ($r\,dr = \frac{1}{2}\,du$) turns the radial integral into a **pure integer factorial**:

$$
\int_0^{\infty} r^{2m + 3}\,e^{-r^2}\,dr \;=\; \frac{1}{2}\int_0^{\infty} u^{m + 1}\,e^{-u}\,du \;=\; \frac{1}{2}\,\Gamma(m + 2) \;=\; \frac{(m + 1)!}{2}.
$$

Multiplying by the surface area $\sigma(S^3) = 2\pi^2$ cancels the factors $2$ and $\frac{1}{2}$, leaving exactly $\pi^2\,(m + 1)!$. Equating the two evaluations gives

$$
\pi^2 \cdot \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^m\,a!\,b!\,c!\,d!} \;=\; \pi^2\,(m + 1)! \cdot \mathbb{E}_{\mathrm{SU}(2)}\!\left[\frac{w^{2a} x^{2b} y^{2c} z^{2d}}{\lVert q\rVert^{2m}}\right].
$$

Strike $\pi^2$ from both sides—and the single most liberating formula of rational harmonic analysis stands bare:

$$
\mathbb{E}_{\mathrm{SU}(2)}\!\left[\frac{w^{2a} x^{2b} y^{2c} z^{2d}}{\lVert q\rVert^{2m}}\right] \;\equiv\; \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^m\,a!\,b!\,c!\,d!\,(m + 1)!} \;\in\; \mathbb{Q}_+, \qquad m \;=\; a + b + c + d.
$$

For the classical real unit sphere $S^3\subset\mathbb R^4$ used here, two cancellations simplify the moment formula:

- **Compared with the circle $S^1$ ($n = 2$)**: While $\sigma(S^1) = 2\pi$ cancels $\Gamma(\frac{1}{2})^2 = \pi$ and leaves $m!$, $S^1$ is abelian—every irreducible representation is one-dimensional, incapable of carrying non-commutative three-dimensional curvature or spinor double covers.
- **Compared with the two-sphere $S^2$ ($n = 3$)**: Here $\Gamma(\frac{1}{2})^3 = \pi\sqrt{\pi}$ leaves an awkward half-integer radial denominator $\Gamma(m + \frac{3}{2})$; even more fundamentally, $\chi(S^2) = 2 \neq 0$ prevents $S^2$ from being a group at all, so neither a group-invariant Haar measure nor a Peter–Weyl character algebra exists on $S^2$.
- **Uniquely on the three-sphere $S^3 \cong \mathrm{Sp}(1)$ ($n = 4$)**: It is the **only non-abelian compact Lie-group sphere**, and its four coordinates match $\Gamma(\frac{1}{2})^4 = \pi^2$ squarely against $\sigma(S^3) = 2\pi^2$ while turning $\Gamma(m + 2)/\Gamma(2)$ directly into the pure integer factorial $(m + 1)!$.

::: {.remark #rem-ch11-shadow-vs-intrinsic title="The Classical Gaussian Derivation and the Intrinsic Factorial Definition (Literature Result and Algebraic Reconstruction)"}
Evaluating polynomial integrals over spheres by equating Cartesian and polar Gaussian integrals is a classic analytic trick (see G. B. Folland, *Amer. Math. Monthly* **108**(5), 446–448, 2001; literature result). Within zero-axiom `OmegaMath`, that derivation serves solely as a **shadow alignment check**: it explains to readers trained in real analysis why $\pi$ had to vanish. Inside the zero-axiom core itself, we never construct $\mathbb{R}$, $\pi$, or Lebesgue measure; instead, we adopt the factorial ratio directly as our intrinsic rational linear functional and verify its projective homogeneity invariance, normalization, symmetry, and orthonormality by pure finite arithmetic.
:::

---

## 11.2 Intrinsic Factorial Functional, Homogeneity Invariance, and Exact Moment Recurrence {#sec-ch11-intrinsic-functional-and-recurrence}

Apply this polynomial moment formula to the projective reading $P(q)/\lVert q\rVert^{2m}$, with $P$ homogeneous of degree $2m$ and rational coefficients. On the real unit sphere the denominator is one, so linearity reduces the Haar expectation to the moments of the monomials of $P$. The reading is independent of the nonzero homogeneous representative.

::: {.definition #def-ch11-pi-free-haar title="Pi-Free Factorial Haar Expectation Functional on the Three-Sphere"}
For any tuple of natural numbers $(p, q, r, s) \in \mathbb{N}^4$ with total degree $p + q + r + s = 2m$, define the rational linear functional $\mathbb{E}_{\mathrm{SU}(2)}$ on degree-zero homogeneous monomials $w^p x^q y^r z^s / \lVert q\rVert^{p+q+r+s}$ as follows:

1. If at least one exponent among $p, q, r, s$ is odd, define the expectation to be $0$ (reflecting independent sign-flip symmetry across all four coordinates);
2. If all exponents are even, $(p, q, r, s) = (2a, 2b, 2c, 2d)$ with $m = a + b + c + d$, define

   $$
   H(a, b, c, d) \;:=\; \mathbb{E}_{\mathrm{SU}(2)}\!\left[\frac{w^{2a} x^{2b} y^{2c} z^{2d}}{\lVert q\rVert^{2m}}\right] \;:=\; \frac{(2a)!\,(2b)!\,(2c)!\,(2d)!}{4^m\,a!\,b!\,c!\,d!\,(m + 1)!} \;\in\; \mathbb{Q}_+,
   $$

   and extend by $\mathbb{Q}$-linearity to all homogeneous ratios with denominator $\lVert q\rVert^{2m}$.
:::

For this purely rational definition to be well-defined on projective rays, it must pass one sharp internal consistency test: rewriting a homogeneous ratio $P(q) / \lVert q\rVert^{2m}$ as $(w^2 + x^2 + y^2 + z^2)P(q) / \lVert q\rVert^{2m + 2}$ must leave the expectation strictly invariant.

Three lines of integer-factorial cancellation settle this without a single integral or limit. For any $(a, b, c, d) \in \mathbb{N}^4$ with $m = a + b + c + d$, incrementing $a$ by $1$ yields the exact ratio

$$
\frac{H(a + 1, b, c, d)}{H(a, b, c, d)} \;=\; \frac{(2a + 2)(2a + 1)}{4\,(a + 1)\,(m + 2)} \;=\; \frac{2a + 1}{2\,(m + 2)}.
$$

By symmetry across all four coordinates, summing the four incremented numerators gives

$$
\frac{H(a + 1, b, c, d) + H(a, b + 1, c, d) + H(a, b, c + 1, d) + H(a, b, c, d + 1)}{H(a, b, c, d)} \;=\; \frac{(2a + 1) + (2b + 1) + (2c + 1) + (2d + 1)}{2\,(m + 2)} \;=\; \frac{2m + 4}{2\,(m + 2)} \;\equiv\; 1.
$$

That single line is a gem of zero-axiom algebra: **without surface elements or polar Jacobians, the elementary sum $(2a + 1) + (2b + 1) + (2c + 1) + (2d + 1) = 2(m + 2)$ proves that $H(a, b, c, d)$ respects the sphere relation $w^2 + x^2 + y^2 + z^2 = \lVert q\rVert^2$ identically and is normalized by $H(0, 0, 0, 0) = 1$**. As an immediate sanity check on $(w^2 + x^2 + y^2 + z^2)^2$: since $H(2, 0, 0, 0) = \frac{4!}{4^2 \cdot 2! \cdot 3!} = \frac{1}{8}$ and $H(1, 1, 0, 0) = \frac{2! \cdot 2!}{4^2 \cdot 1! \cdot 1! \cdot 3!} = \frac{1}{24}$, the four quartic terms and twelve cross terms sum cleanly to $4 \times \frac{1}{8} + 12 \times \frac{1}{24} = \frac{1}{2} + \frac{1}{2} = 1$.

Specializing this step ratio to powers of the projective fidelity $\kappa = w^2 / \lVert q\rVert^2$ by setting $a = k$ and $b = c = d = 0$ ($m = k$), write $\mathbb{E}_{\mathrm{SU}(2)}[\kappa^k] = H(k, 0, 0, 0) = \frac{(2k)!}{4^k\,k!\,(k + 1)!}$ for the $k$-th $\pi$-free scalar moment (with base value $\mathbb{E}_{\mathrm{SU}(2)}[\kappa^0] = 1$ directly from the definition). The exact factorial ratio recurrence linking consecutive moments is proved for every $k \in \mathbb{N}$ on the strict backend of `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch11-haar-kappa-moment-succ title="Factorial Recurrence for Pi-Free Three-Sphere Fidelity Moments" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.haarKappaMoment_succ"}
For $k\in\mathbb N$, `haarKappaMoment k` represents $(2k)!/(4^k k!(k+1)!)$ and `haarKappaStep k` represents $(2k+1)/(2(k+2))$. In `Omega.IntRatio.Equivalent` the recurrence is

$$
\operatorname{haarKappaMoment}(k+1)\;\equiv\;\operatorname{haarKappaMoment}(k)\cdot\operatorname{haarKappaStep}(k).
$$
:::

::: {.proof}
Expanding the left-hand side by factorial recursion gives numerator $(2k + 2)! = 2(k + 1)(2k + 1)(2k)!$ over the strictly positive denominator $4^{k + 1}(k + 1)!(k + 2)! = 4(k + 1)(k + 2)\cdot 4^k\,k!\,(k + 1)!$. Multiplying the two fractions on the right-hand side yields numerator $(2k)!(2k + 1)$ over the strictly positive denominator $2(k + 2)\cdot 4^k\,k!\,(k + 1)!$. Since $4(k + 1)(k + 2) = 2(k + 1)\cdot 2(k + 2)$, cross-multiplication in `Omega.IntRatio.Equivalent` produces identical natural-number products on both sides with zero real numbers and zero axioms. The full proof is checked by the Lean kernel.
:::

Moreover, the closed form unveils an unexpected combinatorial jewel:

$$
\mathbb{E}_{\mathrm{SU}(2)}\!\left[\kappa^k\right] \;=\; H(k, 0, 0, 0) \;=\; \frac{(2k)!}{4^k\,k!\,(k + 1)!} \;=\; \frac{1}{4^k}\,\frac{1}{k + 1}\binom{2k}{k} \;=\; \frac{C_k}{4^k},
$$

where $C_k = 1, 1, 2, 5, 14, 42, \dots$ is the **$k$-th Catalan number**. Viewed from the classical shadow, this is no coincidence: the Weyl conjugacy-class weight on $\mathrm{SU}(2)$ is $\frac{2}{\pi}\sin^2\phi\,d\phi$, which pushes forward to $c = \cos\phi \in [-1, 1]$ as the Wigner semicircle law $\frac{2}{\pi}\sqrt{1 - c^2}\,dc$, whose even moments are famously $C_k / 4^k$. Inside `OmegaMath`, however, neither semicircles nor $\pi$ ever enter; multiplying repeatedly by $\frac{2k + 1}{2(k + 2)}$ generates the entire rational moment table:

| Order $k$ | Catalan Number $C_k$ | Step Multiplier $\frac{2k - 1}{2(k + 1)}$ | Exact Rational Moment $\mathbb{E}_{\mathrm{SU}(2)}[\kappa^k] = C_k / 4^k$ |
| ---: | ---: | ---: | ---: |
| $0$ | $1$ | — | $1$ |
| $1$ | $1$ | $1/4$ | $1/4$ |
| $2$ | $2$ | $1/2$ | $1/8$ |
| $3$ | $5$ | $5/8$ | $5/64$ |
| $4$ | $14$ | $7/10$ | $7/128$ |
| $5$ | $42$ | $3/4$ | $21/512$ |

::: {.figure src="ch11-haar-shells"}
**The π-free moments give Haar orthonormality.** The cyan markers on the left give the five exact fractions. The right panel plots the three characters and shows their Haar inner products.
:::

---

## 11.3 Rational Orthonormality of Peter–Weyl Character Kernels {#sec-ch11-peter-weyl-orthonormality}

With the five exact rational moments $\mathbb{E}[\kappa^0] = 1$ through $\mathbb{E}[\kappa^4] = \frac{7}{128}$ generated from $\mathbb{E}[\kappa^0] = 1$ and [@thm-ch11-haar-kappa-moment-succ], the payoff is immediate. Without trigonometric product-to-sum identities, integration by parts, or any approximation to $\pi$, define the $\pi$-free rational spherical inner product on polynomials in $\kappa$ by

$$
\langle f, g\rangle_{\mathrm{SU}(2)} \;:=\; \operatorname{haarInner}(f, g) \;:=\; \mathbb{E}_{\mathrm{SU}(2)}\!\bigl[f(\kappa)\,g(\kappa)\bigr].
$$

Before ascending to the orthonormality theorem for even characters at all integer spins, begin with the most transparent low-degree anchor: on the strict backend of `OmegaInit` and `OmegaMath`, the first three even (integer-spin) Peter–Weyl character polynomials from [Chapter 10](ch10-peter-weyl-rational-spin-shells.md)—$\chi_0(\kappa) = 1$, $\chi_1(\kappa) = 4\kappa - 1$, and $\chi_2(\kappa) = 16\kappa^2 - 12\kappa + 1$—are certified to form an exact orthonormal system:

::: {.theorem #thm-ch11-peter-weyl-chi012-orthonormal title="Haar Orthonormality of the First Three Even Peter–Weyl Characters" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.peter_weyl_chi012_orthonormal"}
Write $H_{ij}=\operatorname{haarInner}(\chi_i,\chi_j)$ for the rational pairing of the coefficient lists $\chi_0,\chi_1,\chi_2$. Under `Omega.IntRatio.Equivalent` the six entries satisfy

$$
\begin{aligned}
H_{00} &\equiv 1, & H_{01} &\equiv 0, & H_{02} &\equiv 0, \\
H_{11} &\equiv 1, & H_{12} &\equiv 0, & H_{22} &\equiv 1.
\end{aligned}
$$
:::

::: {.proof}
Expand each of the six polynomial products $\chi_i(\kappa)\chi_j(\kappa)$ ($0 \le i \le j \le 2$) into integer-coefficient monomials of degree at most $4$, and contract linearly via `haarInner` against the five exact moments $1, \frac{1}{4}, \frac{1}{8}, \frac{5}{64}, \frac{7}{128}$ generated from $\mathbb{E}[\kappa^0] = 1$ and [@thm-ch11-haar-kappa-moment-succ] (displayed line by line in [@ex-ch11-orthonormality-hand-ledger]). Direct integer cross-multiplication in `Omega.IntRatio.Equivalent` reduces all three diagonal entries to $1$ and all three off-diagonal entries to $0$, with zero $\pi$, zero real numbers, and zero axioms. The full proof is checked by the Lean kernel.
:::

The ledger below lays out all six polynomial contractions of [@thm-ch11-peter-weyl-chi012-orthonormal] term by term, together with the half-integer shell norms:

::: {.example #ex-ch11-orthonormality-hand-ledger title="Hand-Verified Rational Orthonormality Ledger for $\chi_0, \chi_1, \chi_2$ and Half-Integer Norms"}
Substituting $\mathbb{E}[\kappa^0] = 1,\; \mathbb{E}[\kappa^1] = \frac{1}{4},\; \mathbb{E}[\kappa^2] = \frac{1}{8},\; \mathbb{E}[\kappa^3] = \frac{5}{64},\; \mathbb{E}[\kappa^4] = \frac{7}{128}$ term by term:

1. **Monopole shell norm $\langle \chi_0, \chi_0\rangle$**:

   $$
   \langle \chi_0, \chi_0\rangle \;=\; \mathbb{E}[1] \;=\; 1.
   $$

2. **Orthogonality of $j = 0$ and $j = 1$ ($\langle \chi_0, \chi_1\rangle$)**:

   $$
   \langle \chi_0, \chi_1\rangle \;=\; \mathbb{E}[4\kappa - 1] \;=\; 4 \cdot \frac{1}{4} - 1 \;=\; 1 - 1 \;=\; 0.
   $$

3. **Orthogonality of $j = 0$ and $j = 2$ ($\langle \chi_0, \chi_2\rangle$)**:

   $$
   \langle \chi_0, \chi_2\rangle \;=\; \mathbb{E}[16\kappa^2 - 12\kappa + 1] \;=\; 16 \cdot \frac{1}{8} - 12 \cdot \frac{1}{4} + 1 \;=\; 2 - 3 + 1 \;=\; 0.
   $$

4. **Adjoint shell norm $\langle \chi_1, \chi_1\rangle$**: expanding $(4\kappa - 1)^2 = 16\kappa^2 - 8\kappa + 1$ gives

   $$
   \langle \chi_1, \chi_1\rangle \;=\; 16 \cdot \frac{1}{8} - 8 \cdot \frac{1}{4} + 1 \;=\; 2 - 2 + 1 \;=\; 1.
   $$

5. **Orthogonality of $j = 1$ and $j = 2$ ($\langle \chi_1, \chi_2\rangle$)**: expanding $(4\kappa - 1)(16\kappa^2 - 12\kappa + 1) = 64\kappa^3 - 64\kappa^2 + 16\kappa - 1$ gives

   $$
   \langle \chi_1, \chi_2\rangle \;=\; 64 \cdot \frac{5}{64} - 64 \cdot \frac{1}{8} + 16 \cdot \frac{1}{4} - 1 \;=\; 5 - 8 + 4 - 1 \;=\; 0.
   $$

6. **Quadrupole shell norm $\langle \chi_2, \chi_2\rangle$**: expanding $(16\kappa^2 - 12\kappa + 1)^2 = 256\kappa^4 - 384\kappa^3 + 176\kappa^2 - 24\kappa + 1$ gives

   $$
   \langle \chi_2, \chi_2\rangle \;=\; 256 \cdot \frac{7}{128} - 384 \cdot \frac{5}{64} + 176 \cdot \frac{1}{8} - 24 \cdot \frac{1}{4} + 1 \;=\; 14 - 30 + 22 - 6 + 1 \;=\; 1.
   $$

Every denominator cancels cleanly into integers! The Gram matrix of the first three integer-spin characters is identically the $3 \times 3$ identity matrix:

$$
\bigl(\langle \chi_i, \chi_j\rangle_{\mathrm{SU}(2)}\bigr)_{i, j \in \{0, 1, 2\}} \;=\; \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix} \;=\; I_3.
$$

Half-integer shell norms check out just as effortlessly: $\mathbb{E}[\chi_{1/2}^2] = \mathbb{E}[4\kappa] = 4 \cdot \frac{1}{4} = 1$, and $\mathbb{E}[\chi_{3/2}^2] = \mathbb{E}[64\kappa^3 - 64\kappa^2 + 16\kappa] = 5 - 8 + 4 = 1$. Because every odd-degree monomial has zero expectation, every integer-spin character is automatically orthogonal to every half-integer character as well.
:::

The factorial moment functional sends the constant character to one and each positive-degree even character to zero. Section 11.1 identifies this rational evaluation with the normalized real Haar mean.

::: {.theorem #thm-ch11-haar-even-char-expectation title="All-Degree Pi-Free Haar Expectation of Even Characters" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.haar_evenChar_expectation"}
For each $r\in\mathbb N$, `evenCharPoly r` is the coefficient list for $E_r$ from [@thm-ch10-even-char-product-sum]. The functional `haarKappaPoly` weights the coefficient of degree $k$ by `haarKappaMoment k`. With `zeroDelta r` equal to one at $r=0$ and zero otherwise, the declaration gives the following `Omega.IntRatio.Equivalent` identity.

$$
\operatorname{haarKappaPoly}(\operatorname{evenCharPoly}\;r)\;\equiv\;\operatorname{zeroDelta}(r).
$$
:::

::: {.proof}
Rather than stopping on the unshifted axis $j = 0$, the proof establishes simultaneously for every shift exponent $j \in \mathbb{N}$ and character degree $r \in \mathbb{N}$ the closed-form shifted mixed-moment table (`MomentTable.expected j r`):

$$
\operatorname{haarKappaPoly}\!\left(\kappa^j E_r\right) \;\equiv\; \operatorname{haarKappaMoment}(j) \cdot \frac{(2r + 1)\,\prod_{k = 0}^{r - 1}(j - k)}{\prod_{k = 0}^{r - 1}(j + k + 2)},
$$

where both empty products equal $1$ when $r = 0$. Two-step induction on $r$ (quantified over all $j$ simultaneously) closes directly: the base $r = 0$ is immediate, and $r = 1$ combines linearity of `haarKappaPoly` with the scalar moment recurrence [@thm-ch11-haar-kappa-moment-succ] to reduce $4\,\mathbb{E}[\kappa^{j+1}] - \mathbb{E}[\kappa^j]$ to $\mathbb{E}[\kappa^j]\cdot\frac{3j}{j+2}$; the inductive step inserts $E_{r+2}(\kappa) = (4\kappa - 2)E_{r+1}(\kappa) - E_r(\kappa)$ into the shifted integral, absorbs $4\,\mathbb{E}[\kappa^{j+1}]$ back into $\mathbb{E}[\kappa^j]$ via [@thm-ch11-haar-kappa-moment-succ], brings all terms over the common rising product $\prod_{k = 0}^{r + 1}(j + k + 2)$, and verifies an exact integer polynomial identity in $(j, r, \prod_{k = 0}^{r - 1}(j - k))$. Specializing to $j = 0$ yields $\mathbb{E}[\kappa^0] \equiv 1$ at $r = 0$, whereas for every $r \ge 1$ the falling product $\prod_{k = 0}^{r - 1}(0 - k)$ begins with the factor $0$, annihilating the numerator identically. The full proof is checked by the Lean kernel.
:::

Combining the [Chapter 10](ch10-peter-weyl-rational-spin-shells.md) fusion identity [@thm-ch10-even-char-product-sum] with [@thm-ch11-haar-even-char-expectation] gives the rational inner-product formula. By §11.1, its real Haar interpretation is $\langle E_m,E_n\rangle_{\mathrm{SU}(2)}=\delta_{mn}$.

::: {.theorem #thm-ch11-all-degree-peter-weyl-orthonormal title="All-Degree Peter–Weyl Even-Character Orthonormality" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.all_degree_peter_weyl_orthonormal"}
The rational pairing `haarInner` applies `haarKappaPoly` to the product of two coefficient lists. For $m,n\in\mathbb N$, `degreeDelta m n` is one when $m=n$ and zero otherwise. The declaration gives the following `Omega.IntRatio.Equivalent` identity.

$$
\operatorname{haarInner}(\operatorname{evenCharPoly}\;m,\operatorname{evenCharPoly}\;n)\;\equiv\;\operatorname{degreeDelta}(m,n).
$$
:::

::: {.proof}
By [@thm-ch10-even-char-product-sum] (`Characters.product m n` and `Poly.ratios_mul`) together with invariance of `haarKappaPoly` under coefficientwise equality including trailing zeros (`Integration.integral_congr`), the inner product $\operatorname{haarInner}(E_m,E_n)$ reduces to the $\pi$-free Haar expectation of the finite inclusive sum $\sum_{r = \lvert m - n\rvert}^{m + n} E_r(\kappa)$. Induction on the summation span using additivity of `haarKappaPoly` and [@thm-ch11-haar-even-char-expectation] sends every summand with $r \ge 1$ to $0$, leaving only the lower-endpoint indicator $\delta_{\lvert m - n\rvert, 0} = \delta_{m, n}$ (since $r = 0$ lies in $[\lvert m - n\rvert, m + n]$ if and only if $\lvert m - n\rvert = 0$, i.e., $m = n$). The full proof is checked by the Lean kernel.
:::

The concrete $3 \times 3$ identity Gram matrix of [@thm-ch11-peter-weyl-chi012-orthonormal] is thus unified inside the orthonormality theorem for even characters at all integer spins [@thm-ch11-all-degree-peter-weyl-orthonormal] across every $m, n \in \mathbb{N}$, without ever invoking real numbers, limits, or $\pi$. (Combinatorially, substituting $\mathbb{E}[\kappa^k] = \frac{1}{4^k(k + 1)}\binom{2k}{k}$ into $E_r(\kappa) = \sum_{k = 0}^{r} (-1)^{r - k}\binom{r + k}{2k} 4^k \kappa^k$ cancels $4^k$ against $4^{-k}$ and yields the vanishing $(r + 1)$-st forward difference of the degree-$r$ polynomial $\binom{r + x}{r}$, mirroring the kernel-verified shifted-moment table above.) Returning to the $5d^8$ quadrupole tensor $\mathbf{Q}_{\mathrm{phys}}(5d^8) = \diag(-\frac{4}{7}, -\frac{4}{7}, +\frac{8}{7})$ of [Chapter 10](ch10-peter-weyl-rational-spin-shells.md), rotating by $\operatorname{Ad}(q)\,\mathbf{Q}\,\operatorname{Ad}(q)^\top$ produces degree-four homogeneous polynomials divided by $\lVert q\rVert^4$; plugging in $H(2, 0, 0, 0) = \frac{1}{8}$, $H(1, 1, 0, 0) = \frac{1}{24}$, and vanishing odd monomials collapses the rotational average straight to $\frac{1}{3}(\Tr \mathbf{Q})\,I_3 = \mathbf{0}_{3\times 3}$, without ever touching $\pi$.

::: {.film src="averages-without-pi"}
**One four-dimensional Gaussian integral, computed two ways, carries exactly $\pi^2$ on both sides; strike it and a factorial ratio remains, which makes the integer-spin characters of every degree exactly orthonormal (2 min 51 s).** Under the violet ARGUED badge, the Cartesian route brings four factors $\sqrt{\pi}$ and the polar route gives $\frac{(m+1)!}{2}$ times the area $2\pi^2$; an amber stroke strikes $\pi^2$ from both sides. This is the classical derivation of §11.1 (a literature result), and the three-column comparison with the circle and the two-sphere is argued as well; the sphere pictures are schematic. Under the cyan computed badge, the ratio $H(a,b,c,d)$ becomes the definition: at $(1,0,0,0)$ the four step ratios give $\frac12+\frac16+\frac16+\frac16=1$, sixteen tiles give $4\times\frac18+12\times\frac1{24}=1$, and the moment ladder $1,\frac14,\frac18,\frac5{64},\frac7{128},\frac{21}{512}$ times $4^k$ gives the Catalan numbers $1,1,2,5,14,42$. The green LEAN ✓ badges rest on the step recurrence [@thm-ch11-haar-kappa-moment-succ], the $3\times 3$ identity Gram table [@thm-ch11-peter-weyl-chi012-orthonormal] (the ledger lines $5-8+4-1=0$ and $14-30+22-6+1=1$ are computed on screen), the vanishing averages of positive-degree even characters [@thm-ch11-haar-even-char-expectation], the product rule of Chapter 10, and [@thm-ch11-all-degree-peter-weyl-orthonormal]; the averaged runs for $(m,n)=(2,3)$ and $(3,3)$ are computed. The roots $\sqrt2$, $2\sqrt2$ and $\sqrt5$ that still force their way in at the end, and the pairs of fractions of Chapter 12, are argued.
:::

---

## 11.4 Interactive Laboratory and the Threshold of Algebraic Extensions {#sec-ch11-interactive-haar-lab}

In the interactive workbench card below, slide the amber fidelity level $\kappa$ on the purple three-sphere, and open the drawer controls to vary monomial exponents $(a, b, c, d)$ and character pairs $(\chi_i, \chi_j)$, checking the $\pi$-free factorial ratio $H(a, b, c, d)$, the Catalan recurrence $\mathbb{E}[\kappa^{k + 1}] = \frac{2k + 1}{2(k + 2)}\mathbb{E}[\kappa^k]$ of [@thm-ch11-haar-kappa-moment-succ], and the $3 \times 3$ identity Gram slice of [@thm-ch11-peter-weyl-chi012-orthonormal] and [@thm-ch11-all-degree-peter-weyl-orthonormal].

::: {.viz src="omega-math-workbench" preset="pi-free-haar-peter-weyl" height="520"}
**Pi-free factorial Haar integration and Peter–Weyl character orthonormality workbench card (`pi-free-haar-peter-weyl`).** Slide the amber $\kappa$-level ring across the purple three-sphere $\mathrm{SU}(2)$ to inspect the zonal nodal bands of the even Chebyshev characters $\chi_0 = 1,\;\chi_1 = 4\kappa - 1,\;\chi_2 = 16\kappa^2 - 12\kappa + 1$; open the drawer or full workbench to choose monomial powers $(a, b, c, d)$ and character pairs $(\chi_i, \chi_j)$, inspecting the cyan exact rational moments $\mathbb{E}[\kappa^k]$ ($1, \frac{1}{4}, \frac{1}{8}, \frac{5}{64}, \frac{7}{128}$) and the $3 \times 3$ identity Gram matrix $I_3$ produced with zero factors of $\pi$.
:::

Taking stock of the last two chapters, it may seem as if every irrational and transcendental has already been banished: $E_n(\kappa)$ eliminated $\sqrt{\kappa}$ from every integer spin shell and closed all-degree character fusion with zero axioms ([@thm-ch10-even-char-product-sum]), $H(a, b, c, d)$ eliminated $\pi$ and Riemann limits from spherical integration and verifies orthonormality of the integer-spin characters at every degree on the strict backend with zero axioms ([@thm-ch11-all-degree-peter-weyl-orthonormal]), and even the condensed-matter $5d^8$ quadrupole tensor turned out to be fractions over $7$. Yet an honest mathematician must confront one sharper boundary: **when a physical observable genuinely encounters a quadratic irrational—unit-normalizing the equatorial state `pHalf = (1, 1, 0, 0)` along its ray (requiring $\sqrt{2}$), saturating the CHSH Tsirelson ceiling $2\sqrt{2}$, or closing pentagonal golden Chebyshev cycles (requiring $\varphi = \frac{1 + \sqrt{5}}{2}$)—must we surrender and retreat to the classical continuum $\mathbb{R}$ and the axiom of choice?**

[Chapter 12](ch12-algebraic-extensions-and-schur-positivity.md) delivers an emphatic no: building zero-axiom quadratic extensions directly as ordered pairs over `QRat`, and combining them with exact rational Lagrange–Gram and Schur complement positivity, lets us capture every such algebraic extremum and positivity certificate without importing a single continuum axiom.
