# Chapter 6 Rational Spherical Trigonometry: The Bargmann–Gram Closure Law

> *"A single projective edge carries irrational square roots in its direction cosine, yet traverse a closed three-point loop and every vertex norm appears twice, canceling every root and every sign; all of spherical trigonometry then collapses—without a single $\sin$, $\cos$, $\arccos$, or $\pi$—into one purely rational polynomial closure law."*

With origin-free heaps and Lie triple curvature in [Chapter 4](ch04-heaps-and-lie-triple-curvature.md) and rational Cayley rotations and Chebyshev harmonics in [Chapter 5](ch05-rational-cayley-rotations.md), Volume II now confronts the most entrenched transcendental fortress of classical geometry: **spherical trigonometry**. Standard expositions fill spherical triangles with $\cos c = \cos a\cos b + \sin a\sin b\cos C$, inverse cosines $\arccos$, and Girard's angular excess $\Omega = A + B + C - \pi$. Even for the simplest non-square-norm integer rays—such as `[1:0:0:0]`, `[1:1:0:0]`, and `[1:0:1:0]`—the direction cosine of a single edge immediately drops out of $\mathbb{Q}$ into $\frac{1}{\sqrt{2}}$.

This chapter proves that those irrationals and transcendentals are artifacts of tearing a closed three-point loop apart. Introducing the **scale- and sign-invariant rational Bargmann three-point loop invariant** $B(\mathbf{a}, \mathbf{b}, \mathbf{c}) \in \mathbb{Q}$ together with the normalized $3 \times 3$ **Bargmann–Gram closure determinant** $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \ge 0$ converts all of spherical trigonometry into pure polynomial algebra over $\mathbb{Q}$: inside the zero-axiom libraries `OmegaInit` and `OmegaMath` (`axioms: []`), it is proved universally nonnegative for all nonzero integer quaternions, vanishes identically on every heap geodesic-doubling triad while locking the integer-coefficient arc-doubling law, and when strictly positive measures exact rational squared curvature volume and rational vertex spreads—without a single $\sin$, $\cos$, $\arccos$, or $\pi$.

## 6.1 Beyond Sine and Cosine: The Rational Bargmann Loop Invariant

Work in any rational inner-product space $\mathbb{Q}^d$ with $d \ge 2$ (our primary arena is the four-dimensional projective ternion space $\mathbb{QP}^3$ of `ProjTernion`, while $d = 3$ recovers classical spherical geometry on $\mathbb{QP}^2$). For nonzero rays $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{Q}^d \setminus \{\mathbf{0}\}$, recall the pairwise rational fidelity and spread:

$$
\kappa(\mathbf{a}, \mathbf{b}) := \frac{\langle\mathbf{a}, \mathbf{b}\rangle^2}{\lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2} \in \mathbb{Q} \cap [0, 1], \qquad s(\mathbf{a}, \mathbf{b}) := 1 - \kappa(\mathbf{a}, \mathbf{b}) \in \mathbb{Q} \cap [0, 1].
$$

Trying to extract an individual signed cosine $\frac{\langle\mathbf{a}, \mathbf{b}\rangle}{\lVert\mathbf{a}\rVert\lVert\mathbf{b}\rVert}$ fails twice: whenever $\lVert\mathbf{a}\rVert^2$ or $\lVert\mathbf{b}\rVert^2$ is not a square it leaves $\mathbb{Q}$, and flipping $\mathbf{a} \mapsto -\mathbf{a}$ reverses its sign. Multiplying the three inner products around the closed loop $\mathbf{a} \to \mathbf{b} \to \mathbf{c} \to \mathbf{a}$ cures both defects at once: **every vertex enters once and exits once, so its norm and sign appear twice, annihilating every square root and every sign ambiguity.**

::: {.definition #def-ch06-bargmann-and-gram3 title="Rational Bargmann Three-Point Loop Invariant and Bargmann–Gram Determinant"}
For any nonzero rational vectors $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{Q}^d \setminus \{\mathbf{0}\}$:

1. Define the **Bargmann three-point loop invariant**:

   $$
   B(\mathbf{a}, \mathbf{b}, \mathbf{c}) := \frac{\langle\mathbf{a}, \mathbf{b}\rangle\langle\mathbf{b}, \mathbf{c}\rangle\langle\mathbf{c}, \mathbf{a}\rangle}{\lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2\,\lVert\mathbf{c}\rVert^2} \in \mathbb{Q}.
   $$

2. Writing the unnormalized Gram matrix as $G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) := \bigl[\langle\mathbf{u}_i, \mathbf{u}_j\rangle\bigr]_{i,j=1}^3$ with $(\mathbf{u}_1, \mathbf{u}_2, \mathbf{u}_3) = (\mathbf{a}, \mathbf{b}, \mathbf{c})$, define the normalized **Bargmann–Gram closure determinant**:

   $$
   \det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) := \frac{\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c})}{\lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2\,\lVert\mathbf{c}\rVert^2} \in \mathbb{Q}.
   $$
:::

Four purely rational structural laws follow immediately by direct inspection (manual derivation):

1. **Scale and sign invariance**: rescaling $(\mathbf{a}, \mathbf{b}, \mathbf{c}) \mapsto (\lambda\mathbf{a}, \mu\mathbf{b}, \nu\mathbf{c})$ for any $\lambda, \mu, \nu \in \mathbb{Q}^\times$ multiplies both numerator and denominator of $B$ by $\lambda^2\mu^2\nu^2 > 0$. Even sign flips cancel identically, so both $B$ and $\det\mathbf{G}_3$ descend cleanly to projective triples on $(\mathbb{QP}^{d-1})^3$.
2. **Exact rational signed square root of the fidelity product**: squaring gives

   $$
   B(\mathbf{a}, \mathbf{b}, \mathbf{c})^2 = \kappa(\mathbf{a}, \mathbf{b})\,\kappa(\mathbf{b}, \mathbf{c})\,\kappa(\mathbf{c}, \mathbf{a}).
   $$

   Even when $\sqrt{\kappa_{ab}}$, $\sqrt{\kappa_{bc}}$, and $\sqrt{\kappa_{ca}}$ are individually irrational, their loop product returns cleanly to $\mathbb{Q}$ while retaining the loop sign that the three edge fidelities alone forget.
3. **Rank-one projector Bargmann trace**: using the rank-one orthogonal projectors $P(\mathbf{v}) = \frac{\mathbf{v}\mathbf{v}^\top}{\lVert\mathbf{v}\rVert^2} \in \operatorname{Sym}_d(\mathbb{Q})$ from [Chapter 4](ch04-heaps-and-lie-triple-curvature.md), we have $\operatorname{Tr}\bigl(P(\mathbf{a})P(\mathbf{b})P(\mathbf{c})\bigr) = B(\mathbf{a}, \mathbf{b}, \mathbf{c})$.
4. **Exact closure expansion**: expanding the $3 \times 3$ determinant $\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c})$ and dividing by the strictly positive rational denominator $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 > 0$ yields—with zero vector normalization—the **Bargmann–Gram closure equation**:

$$
\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = 1 + 2B(\mathbf{a}, \mathbf{b}, \mathbf{c}) - \bigl(\kappa(\mathbf{a}, \mathbf{b}) + \kappa(\mathbf{b}, \mathbf{c}) + \kappa(\mathbf{c}, \mathbf{a})\bigr).
$$

## 6.2 Universal Nonnegativity via Lagrange–Gram and Cauchy–Binet

Why does $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \ge 0$ hold for every nonzero triple? Neither spectral theory nor real square roots are needed: a single application of the frozen **Lagrange–Gram sum-of-squares identity** settles universal nonnegativity directly.

::: {.theorem #thm-ch06-lagrange-gram-identity title="Lagrange–Gram Sum-of-Squares Identity" lean="D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
Let $\iota$ be a finite index set and let $u, v : \iota \to \mathbb{R}$. Then the polynomial sum-of-squares identity holds:

$$
\left(\sum_{i \in \iota} u_i^2\right)\left(\sum_{j \in \iota} v_j^2\right) - \left(\sum_{i \in \iota} u_i v_i\right)^2 = \frac{1}{2}\sum_{i, j \in \iota} (u_i v_j - u_j v_i)^2.
$$

In particular, the right-hand side is nonnegative, yielding the Cauchy–Schwarz inequality $\langle u, v\rangle^2 \le \lVert u\rVert^2\lVert v\rVert^2$, with equality if and only if $u_i v_j = u_j v_i$ for all $i, j$ (linear dependence).
:::

::: {.proof}
Expanding the double sum on the right gives

$$
\frac{1}{2}\sum_{i, j} (u_i^2 v_j^2 - 2 u_i v_j u_j v_i + u_j^2 v_i^2) = \left(\sum_i u_i^2\right)\left(\sum_j v_j^2\right) - \left(\sum_i u_i v_i\right)^2.
$$

Every squared term is nonnegative and the sum vanishes precisely when $u_i v_j - u_j v_i = 0$ for all $i, j$. The full proof is checked by the Lean kernel.
:::

In any dimension $d \ge 2$ over $\mathbb{Q}^d$, orthogonalizing $\mathbf{b}$ and $\mathbf{c}$ against $\mathbf{a}$ and applying [@thm-ch06-lagrange-gram-identity] yields $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \ge 0$ by pure polynomial algebra. On our four-component integer quaternion carrier `Quad4` ($\mathbb{Z}^4 \setminus \{\mathbf{0}\}$), this fundamental rational spherical closure inequality leaves the classical real continuum behind altogether and is proved directly inside the zero-axiom libraries `OmegaInit` and `OmegaMath` (`axioms: []`) under the signed rational order `Omega.IntRatio.Le`:

::: {.theorem #thm-ch06-detgram3-nonneg title="Zero-Axiom Universal Nonnegativity of the Bargmann–Gram Closure Determinant" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.detGram3_nonneg"}
Let $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{Z}^4$ be any three nonzero integer quaternions in `Quad4` ($\mathbf{a} \neq \mathbf{0}$, $\mathbf{b} \neq \mathbf{0}$, $\mathbf{c} \neq \mathbf{0}$). Under the zero-axiom signed rational type `Omega.IntRatio` and its order relation `IntRatio.Le`, the normalized $3 \times 3$ Bargmann–Gram closure determinant is universally nonnegative:

$$
0 \;\le\; \det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) \;=\; 1 + 2B(\mathbf{a}, \mathbf{b}, \mathbf{c}) - \bigl(\kappa(\mathbf{a}, \mathbf{b}) + \kappa(\mathbf{b}, \mathbf{c}) + \kappa(\mathbf{c}, \mathbf{a})\bigr).
$$
:::

::: {.proof}
Construct the two division-free integer quadruples orthogonal to $\mathbf{a}$:

$$
\mathbf{w} := \lVert\mathbf{a}\rVert^2\mathbf{b} - \langle\mathbf{a}, \mathbf{b}\rangle\mathbf{a}, \qquad \mathbf{v} := \lVert\mathbf{a}\rVert^2\mathbf{c} - \langle\mathbf{a}, \mathbf{c}\rangle\mathbf{a}.
$$

One checks $\langle\mathbf{w}, \mathbf{a}\rangle = \langle\mathbf{v}, \mathbf{a}\rangle = 0$ and evaluates the three integer inner products:

$$
\lVert\mathbf{w}\rVert^2 = \lVert\mathbf{a}\rVert^2\bigl(\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2 - \langle\mathbf{a}, \mathbf{b}\rangle^2\bigr), \qquad \lVert\mathbf{v}\rVert^2 = \lVert\mathbf{a}\rVert^2\bigl(\lVert\mathbf{a}\rVert^2\lVert\mathbf{c}\rVert^2 - \langle\mathbf{a}, \mathbf{c}\rangle^2\bigr),
$$

$$
\langle\mathbf{w}, \mathbf{v}\rangle = \lVert\mathbf{a}\rVert^2\bigl(\lVert\mathbf{a}\rVert^2\langle\mathbf{b}, \mathbf{c}\rangle - \langle\mathbf{a}, \mathbf{b}\rangle\langle\mathbf{a}, \mathbf{c}\rangle\bigr).
$$

Substituting into $\lVert\mathbf{w}\rVert^2\lVert\mathbf{v}\rVert^2 - \langle\mathbf{w}, \mathbf{v}\rangle^2$ cancels the quartic cross term $\langle\mathbf{a}, \mathbf{b}\rangle^2\langle\mathbf{a}, \mathbf{c}\rangle^2$ identically, leaving $\lVert\mathbf{a}\rVert^6\,\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c})$. Expanding the remaining difference as a sum of integer squares yields

$$
\lVert\mathbf{a}\rVert^6\,\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \lVert\mathbf{w}\rVert^2\lVert\mathbf{v}\rVert^2 - \langle\mathbf{w}, \mathbf{v}\rangle^2 = \frac{1}{2}\sum_{i, j = 1}^4 (w_i v_j - w_j v_i)^2 \ge 0.
$$

Because $\mathbf{a}, \mathbf{b}, \mathbf{c}$ are nonzero, their integer squared norms $\lVert\mathbf{a}\rVert^2, \lVert\mathbf{b}\rVert^2, \lVert\mathbf{c}\rVert^2$ are strictly positive; hence $\lVert\mathbf{a}\rVert^6 > 0$ and the common denominator $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 > 0$ are strictly positive, forcing $\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) \ge 0$ and establishing `IntRatio.Le 0 (detGram3 a b c)` with zero axioms in `OmegaInit` and `OmegaMath`. The full proof is checked by the Lean kernel.
:::

From the matrix viewpoint in any dimension $d \ge 2$ (manual derivation), setting $A = [\mathbf{a}, \mathbf{b}, \mathbf{c}] \in \mathbb{Q}^{d \times 3}$, the Cauchy–Binet formula expresses the exact same nonnegative rational quantity as a sum of squared $3 \times 3$ minors:

$$
\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \frac{\det(A^\top A)}{\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2} = \frac{\sum_{1 \le i < j < k \le d}(\det A_{ijk})^2}{\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2} \ge 0.
$$

In $d = 3$ this reduces to the single squared parallelepiped volume $\frac{(\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}))^2}{\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2}$; in $d = 4$ (`ProjTernion`) it sums the $\binom{4}{3} = 4$ squared $3 \times 3$ minors, measuring the normalized squared three-volume $\lVert\hat{\mathbf{a}} \wedge \hat{\mathbf{b}} \wedge \hat{\mathbf{c}}\rVert^2$.

::: {.figure src="ch06-bargmann-triad"}
**A doubled arc and a spherical triangle.** The cyan arc on the left doubles along one great circle and has Gram determinant zero. The orthogonal half-steps on the right enclose a magenta triangle with Gram determinant $1/4$.
:::

## 6.3 Great-Circle Collinearity and the Integer Arc-Doubling Law

The exact sum-of-squares formula reads off the equality case immediately: **$\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = 0$ if and only if $\mathbf{w}$ and $\mathbf{v}$ are linearly dependent, i.e., if and only if $\dim\operatorname{span}_{\mathbb{Q}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) \le 2$—the three rays lie in a common two-plane, meaning they are collinear on a single great circle.**

Great-circle collinearity locks the closure equation to the linear Bargmann relation

$$
1 + 2B(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \kappa(\mathbf{a}, \mathbf{b}) + \kappa(\mathbf{b}, \mathbf{c}) + \kappa(\mathbf{c}, \mathbf{a}).
$$

Isolating $2B$, squaring, and substituting $B^2 = \kappa_{ab}\kappa_{bc}\kappa_{ca}$ eliminates $B$ to give the **rational collinearity polynomial** (algebraically identical to Wildberger's triple spread formula $(s_{ab} + s_{bc} + s_{ca})^2 = 2(s_{ab}^2 + s_{bc}^2 + s_{ca}^2) + 4 s_{ab} s_{bc} s_{ca}$):

$$
\bigl(\kappa(\mathbf{a}, \mathbf{b}) + \kappa(\mathbf{b}, \mathbf{c}) + \kappa(\mathbf{c}, \mathbf{a}) - 1\bigr)^2 = 4\,\kappa(\mathbf{a}, \mathbf{b})\,\kappa(\mathbf{b}, \mathbf{c})\,\kappa(\mathbf{c}, \mathbf{a}).
$$

Crucially, the Bargmann–Gram form retaining $B$ is strictly stronger than the squared equation because the sign of $B$ distinguishes forward continuation along the great circle from folding back to the start.

Now apply this collinearity law to the equal-step heap parallel continuation from [Chapter 4](ch04-heaps-and-lie-triple-curvature.md): for any two nonzero integer quaternions $\mathbf{a}, \mathbf{b} \in \mathbb{Z}^4 \setminus \{\mathbf{0}\}$, set $\mathbf{c} := [\mathbf{b}, \mathbf{a}, \mathbf{b}] = \mathbf{b}\bar{\mathbf{a}}\mathbf{b}$ (`triad b a b`). Inside the zero-axiom libraries `OmegaInit` and `OmegaMath` (`axioms: []`), the next two frozen theorems certify first that every doubling triad sits strictly on a great circle, and second that its doubled projective fidelity obeys the exact integer-coefficient polynomial law.

::: {.theorem #thm-ch06-geodesic-doubling-detgram3-zero title="Vanishing Bargmann–Gram Determinant on Geodesic Doubling Triads" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.geodesic_doubling_detGram3_zero"}
Let $\mathbf{a}, \mathbf{b} \in \mathbb{Z}^4$ be any two nonzero integer quaternions in `Quad4` ($\mathbf{a} \neq \mathbf{0}$, $\mathbf{b} \neq \mathbf{0}$), and let $[\mathbf{b}, \mathbf{a}, \mathbf{b}] := \mathbf{b}\bar{\mathbf{a}}\mathbf{b}$ (`triad b a b`) denote the equal-step heap continuation. Then under the zero-axiom equivalence `Omega.IntRatio.Equivalent`, the Bargmann–Gram closure determinant vanishes identically:

$$
\det\mathbf{G}_3\bigl(\mathbf{a},\, \mathbf{b},\, [\mathbf{b}, \mathbf{a}, \mathbf{b}]\bigr) \;\equiv\; 0.
$$
:::

::: {.proof}
Right-multiplying the quaternion reflection identity $\mathbf{b}\bar{\mathbf{a}} + \mathbf{a}\bar{\mathbf{b}} = 2\langle\mathbf{a}, \mathbf{b}\rangle\mathbf{1}$ by $\mathbf{b}$ expresses $\mathbf{c} := [\mathbf{b}, \mathbf{a}, \mathbf{b}]$ as an explicit integer linear combination of $\mathbf{a}$ and $\mathbf{b}$:

$$
\mathbf{c} = \mathbf{b}\bar{\mathbf{a}}\mathbf{b} = 2\langle\mathbf{a}, \mathbf{b}\rangle\,\mathbf{b} - \lVert\mathbf{b}\rVert^2\,\mathbf{a}.
$$

By Euler–Lagrange four-square multiplicativity, $\lVert\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^4 > 0$, so the common denominator $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2$ is strictly positive. Meanwhile, because $\mathbf{c}$ lies in the linear span of $\mathbf{a}$ and $\mathbf{b}$, the third row of $G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c})$ is a linear combination of its first two rows, forcing $\det G_{\mathrm{raw}}(\mathbf{a}, \mathbf{b}, \mathbf{c}) = 0$. Hence $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, [\mathbf{b}, \mathbf{a}, \mathbf{b}]) \equiv 0$ in `Omega.IntRatio.Equivalent` with zero axioms. The full proof is checked by the Lean kernel.
:::

Combining [@thm-ch06-geodesic-doubling-detgram3-zero] with the collinearity quadratic, put $\kappa_1 := \kappa(\mathbf{a}, \mathbf{b})$ and $\kappa_2 := \kappa(\mathbf{a}, [\mathbf{b}, \mathbf{a}, \mathbf{b}])$. Since $\langle\mathbf{b}, \mathbf{c}\rangle = \lVert\mathbf{b}\rVert^2\langle\mathbf{a}, \mathbf{b}\rangle$ gives $\kappa(\mathbf{b}, \mathbf{c}) = \kappa_1$, the collinearity polynomial factors cleanly over $\mathbb{Z}[\kappa_1, \kappa_2]$:

$$
\bigl(2\kappa_1 + \kappa_2 - 1\bigr)^2 - 4\kappa_1^2\kappa_2 \equiv (\kappa_2 - 1)\Bigl(\kappa_2 - (2\kappa_1 - 1)^2\Bigr) = 0.
$$

Its two roots separate fold-back ($\mathbf{c} = \mathbf{a}$, $B = \kappa_1$, $\kappa_2 = 1$) from forward continuation; inserting the Bargmann invariant $B(\mathbf{a}, \mathbf{b}, [\mathbf{b}, \mathbf{a}, \mathbf{b}]) = \kappa_1(2\kappa_1 - 1)$ into the linear closure law locks the forward branch $\kappa_2 = 1 + 2\kappa_1(2\kappa_1 - 1) - 2\kappa_1 = (2\kappa_1 - 1)^2$. This integer-coefficient arc-doubling law is likewise proved directly inside the zero-axiom kernel:

::: {.theorem #thm-ch06-geodesic-doubling-kappa title="Integer-Coefficient Fidelity Law for Geodesic Arc Doubling" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.geodesic_doubling_kappa"}
Let $\mathbf{a}, \mathbf{b} \in \mathbb{Z}^4$ be any two nonzero integer quaternions in `Quad4` ($\mathbf{a} \neq \mathbf{0}$, $\mathbf{b} \neq \mathbf{0}$). Then under the zero-axiom equivalence `Omega.IntRatio.Equivalent`, the rational projective fidelity between $\mathbf{a}$ and its geodesic doubling $[\mathbf{b}, \mathbf{a}, \mathbf{b}] = \mathbf{b}\bar{\mathbf{a}}\mathbf{b}$ (`triad b a b`) satisfies

$$
\kappa\bigl(\mathbf{a},\, [\mathbf{b}, \mathbf{a}, \mathbf{b}]\bigr) \;\equiv\; \bigl(2\kappa(\mathbf{a}, \mathbf{b}) - 1\bigr)^2.
$$
:::

::: {.proof}
Taking the integer inner product of $\mathbf{c} := [\mathbf{b}, \mathbf{a}, \mathbf{b}] = 2\langle\mathbf{a}, \mathbf{b}\rangle\,\mathbf{b} - \lVert\mathbf{b}\rVert^2\,\mathbf{a}$ with $\mathbf{a}$ yields $\langle\mathbf{a}, \mathbf{c}\rangle = 2\langle\mathbf{a}, \mathbf{b}\rangle^2 - \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2$. By four-square multiplicativity, $\lVert\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^4$, so the shared denominator $\lVert\mathbf{a}\rVert^2\lVert\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^4\lVert\mathbf{b}\rVert^4 = (\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2)^2$ is strictly positive. Squaring the inner product gives

$$
\kappa(\mathbf{a}, \mathbf{c}) = \frac{\bigl(2\langle\mathbf{a}, \mathbf{b}\rangle^2 - \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\bigr)^2}{\lVert\mathbf{a}\rVert^4\lVert\mathbf{b}\rVert^4} \;\equiv\; \left(\frac{2\langle\mathbf{a}, \mathbf{b}\rangle^2}{\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2} - 1\right)^2 = \bigl(2\kappa(\mathbf{a}, \mathbf{b}) - 1\bigr)^2
$$

in `Omega.IntRatio.Equivalent` with zero axioms. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-ch06-collinear-doubling title="Great-Circle Collinear Doubling with Both Positive and Negative Bargmann Invariants"}
1. **Positive loop invariant**: take $\mathbf{a} = [1:0:0:0]$ and $\mathbf{b} = [2:1:0:0]$ ($\kappa_1 = \frac{4}{5}$). Parallel continuation produces $\mathbf{c} = (2 + \mathbf{i})\cdot 1\cdot(2 + \mathbf{i}) = [3:4:0:0]$ ($\lVert\mathbf{c}\rVert^2 = 25$). Directly $\kappa_{ab} = \frac{4}{5}$, $\kappa_{bc} = \frac{10^2}{5 \cdot 25} = \frac{4}{5}$, $\kappa_{ca} = \frac{9}{25} = (2\cdot\frac{4}{5} - 1)^2$, and $B = \frac{2 \cdot 10 \cdot 3}{1 \cdot 5 \cdot 25} = +\frac{12}{25}$; the closure determinant is $\det\mathbf{G}_3 = 1 + \frac{24}{25} - (\frac{4}{5} + \frac{4}{5} + \frac{9}{25}) = 0$.
2. **Negative loop invariant and sign invariance**: take $\mathbf{a} = [1:0:0:0]$ and $\mathbf{b} = [1:2:0:0]$ ($\kappa_1 = \frac{1}{5}$). Parallel continuation yields $(1 + 2\mathbf{i})^2 = [-3:4:0:0]$, whose canonical `ProjTernion` sign-flipped representative is $\mathbf{c}' = [3:-4:0:0]$. We compute $\langle\mathbf{a}, \mathbf{b}\rangle = 1$, $\langle\mathbf{b}, \mathbf{c}'\rangle = 3 - 8 = -5$, and $\langle\mathbf{c}', \mathbf{a}\rangle = 3$, giving $B = \frac{1 \cdot (-5) \cdot 3}{1 \cdot 5 \cdot 25} = -\frac{3}{25} < 0$ (the unflipped representative $[-3:4:0:0]$ yields the exact same $\frac{1 \cdot 5 \cdot (-3)}{125} = -\frac{3}{25}$). With $\kappa_{ab} = \kappa_{bc} = \frac{1}{5}$ and $\kappa_{ca} = \frac{9}{25} = (2\cdot\frac{1}{5} - 1)^2$, the closure equation again vanishes identically: $\det\mathbf{G}_3 = 1 - \frac{6}{25} - (\frac{1}{5} + \frac{1}{5} + \frac{9}{25}) = 0$.
:::

## 6.4 Rational Spherical Excess, Vertex Spreads, and Worked Triads

Whenever $\mathbf{a}, \mathbf{b}, \mathbf{c}$ are not collinear on any great circle (linearly independent), $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) > 0$ is a strictly positive rational number measuring the squared curvature volume spanned by the triad. Even better, this single closure determinant unifies the rational spherical sine, cosine, and Pythagorean laws.

::: {.definition #def-ch06-vertex-spread title="Rational Vertex Spread, Spherical Sine Law, and Spherical Pythagorean Law"}
For any three pairwise distinct rays $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \mathbb{Q}^d \setminus \{\mathbf{0}\}$ (so $s_{ab}, s_{bc}, s_{ca} > 0$), define the **rational vertex spread** at vertex $\mathbf{c}$ (the squared sine of the dihedral angle between the two adjacent great circles) by

$$
S_c := \frac{\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c})}{s(\mathbf{b}, \mathbf{c})\,s(\mathbf{c}, \mathbf{a})} \in \mathbb{Q},
$$

and define $S_a, S_b$ cyclically.
:::

A one-line completion of the square proves $S_c \in \mathbb{Q} \cap [0, 1]$ (manual derivation): expanding $s_{bc} s_{ca} - \det\mathbf{G}_3 = (1 - \kappa_{bc})(1 - \kappa_{ca}) - (1 + 2B - \kappa_{ab} - \kappa_{bc} - \kappa_{ca}) = \kappa_{ab} - 2B + \kappa_{bc}\kappa_{ca}$ reveals an exact rational square:

$$
s(\mathbf{b}, \mathbf{c})\,s(\mathbf{c}, \mathbf{a}) - \det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \frac{\bigl(\lVert\mathbf{c}\rVert^2\langle\mathbf{a}, \mathbf{b}\rangle - \langle\mathbf{a}, \mathbf{c}\rangle\langle\mathbf{b}, \mathbf{c}\rangle\bigr)^2}{\lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2\,\lVert\mathbf{c}\rVert^4} \ge 0.
$$

Three classical spherical laws immediately close over $\mathbb{Q}$ without transcendental functions:

1. **Rational Spherical Sine Law**: dividing $S_c$ by the opposite edge spread $s(\mathbf{a}, \mathbf{b})$ produces a cyclically symmetric ratio:

   $$
   \frac{S_a}{s(\mathbf{b}, \mathbf{c})} = \frac{S_b}{s(\mathbf{c}, \mathbf{a})} = \frac{S_c}{s(\mathbf{a}, \mathbf{b})} = \frac{\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c})}{s(\mathbf{a}, \mathbf{b})\,s(\mathbf{b}, \mathbf{c})\,s(\mathbf{c}, \mathbf{a})} \in \mathbb{Q}_{\ge 0}.
   $$

2. **Rational Spherical Cross Law**: $\det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = s(\mathbf{b}, \mathbf{c})\,s(\mathbf{c}, \mathbf{a})\,S_c$.
3. **Rational Spherical Pythagorean Theorem**: vertex $\mathbf{c}$ is a spherical right angle ($S_c = 1$) if and only if $\lVert\mathbf{c}\rVert^2\langle\mathbf{a}, \mathbf{b}\rangle = \langle\mathbf{a}, \mathbf{c}\rangle\langle\mathbf{b}, \mathbf{c}\rangle$; squaring both sides yields

   $$
   \kappa(\mathbf{a}, \mathbf{b}) = \kappa(\mathbf{a}, \mathbf{c})\,\kappa(\mathbf{b}, \mathbf{c}) \quad \Longleftrightarrow \quad s(\mathbf{a}, \mathbf{b}) = s(\mathbf{a}, \mathbf{c}) + s(\mathbf{b}, \mathbf{c}) - s(\mathbf{a}, \mathbf{c})\,s(\mathbf{b}, \mathbf{c}).
   $$

::: {.example #ex-ch06-spherical-excess-triads title="Worked Rational Spherical Excess Triads: Exact det G₃ = 1/4 for [1:0:0:0], [1:1:0:0], [1:0:1:0]"}
1. **Benchmark right spherical triad $\mathbf{a} = [1:0:0:0]$, $\mathbf{b} = [1:1:0:0]$, $\mathbf{c} = [1:0:1:0]$**:
   The integer squared norms are $\lVert\mathbf{a}\rVert^2 = 1$, $\lVert\mathbf{b}\rVert^2 = 2$, $\lVert\mathbf{c}\rVert^2 = 2$, and all three pairwise inner products equal $1$. Without taking a single square root, we read off the edge fidelities and Bargmann loop invariant:

   $$
   \kappa_{ab} = \frac{1}{2}, \qquad \kappa_{bc} = \frac{1}{4}, \qquad \kappa_{ca} = \frac{1}{2}, \qquad B(\mathbf{a}, \mathbf{b}, \mathbf{c}) = \frac{1 \cdot 1 \cdot 1}{1 \cdot 2 \cdot 2} = \frac{1}{4}.
   $$

   Substituting into the Bargmann–Gram closure law yields the exact positive rational curvature volume squared:

   $$
   \det\mathbf{G}_3(\mathbf{a}, \mathbf{b}, \mathbf{c}) = 1 + 2\left(\frac{1}{4}\right) - \left(\frac{1}{2} + \frac{1}{4} + \frac{1}{2}\right) = \frac{3}{2} - \frac{5}{4} = \frac{1}{4} > 0.
   $$

   (Checking directly from the raw Gram matrix confirms $\det\bigl(\begin{smallmatrix} 1 & 1 & 1 \\ 1 & 2 & 1 \\ 1 & 1 & 2 \end{smallmatrix}\bigr) = 1$, divided by $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 = 4$, giving $\frac{1}{4}$.) From edge spreads $(s_{ab}, s_{bc}, s_{ca}) = (\frac{1}{2}, \frac{3}{4}, \frac{1}{2})$, the three vertex spreads are

   $$
   S_a = \frac{1/4}{(1/2)(1/2)} = 1, \qquad S_b = S_c = \frac{1/4}{(1/2)(3/4)} = \frac{2}{3}.
   $$

   Vertex $\mathbf{a}$ is an exact spherical right angle (obeying the spherical Pythagorean law $\kappa_{bc} = \frac{1}{4} = \frac{1}{2}\cdot\frac{1}{2} = \kappa_{ab}\kappa_{ca}$). Whereas a flat isosceles right triangle has acute spreads $\frac{1}{2}$, spherical curvature inflates both acute spreads to $S_b = S_c = \frac{2}{3} > \frac{1}{2}$—purely rational spherical excess! All three sine ratios equal $\frac{S_a}{s_{bc}} = \frac{S_b}{s_{ca}} = \frac{S_c}{s_{ab}} = \frac{4}{3}$.
2. **Equilateral spherical triad $[1:1:0:0]$, $[1:0:1:0]$, $[1:0:0:1]$**: all edges satisfy $\kappa = \frac{1}{4}$ and $s = \frac{3}{4}$, with $B = \frac{1}{8}$, giving $\det\mathbf{G}_3 = 1 + \frac{2}{8} - \frac{3}{4} = \frac{1}{2} > 0$ and vertex spreads $S_a = S_b = S_c = \frac{1/2}{(3/4)^2} = \frac{8}{9}$, strictly exceeding the flat equilateral spread $\frac{3}{4}$ by the exact rational excess $\frac{8}{9} - \frac{3}{4} = \frac{5}{36} > 0$.
3. **Mutually orthogonal octant $[1:0:0:0]$, $[0:1:0:0]$, $[0:0:1:0]$**: all $\kappa = 0$ and $B = 0$, attaining the global maximum $\det\mathbf{G}_3 = 1$ with all three vertex spreads equal to $1$ (the tri-rectangular spherical triangle).
:::

::: {.remark #rem-ch06-classical-shadow title="Classical Trigonometry as a One-Way Real Shadow and Literature Context"}
Under the one-way shadow onto $\mathbb{R}$, writing pairwise angles $\alpha, \beta, \gamma$ and spherical vertex angle $C$ gives $\kappa_{bc} = \cos^2\alpha$, $\kappa_{ca} = \cos^2\beta$, $\kappa_{ab} = \cos^2\gamma$, and $B = \cos\alpha\cos\beta\cos\gamma$, so $\det\mathbf{G}_3 = 1 + 2\cos\alpha\cos\beta\cos\gamma - \cos^2\alpha - \cos^2\beta - \cos^2\gamma = \sin^2\alpha\sin^2\beta\sin^2 C$ and $S_c = \sin^2 C$, recovering classical spherical trigonometry as a special shadow. Replacing angles and transcendental functions with quadrances and spreads in Euclidean and spherical geometry is developed systematically by N. J. Wildberger (*Divine Proportions: Rational Trigonometry to Universal Geometry*, 2005; literature result). Inside `OmegaMath`, the Bargmann–Gram closure law needs none of those real shadows: it stands on its own as a complete transcendental-free engine of spherical geometry.
:::

## 6.5 Interactive Workbench: The Bargmann–Gram Triad

In the interactive workbench card below, fix the past anchor $\mathbf{a} = \mathbf{o} = [1:0:0:0]$ and adjust the rational ray vertices $\mathbf{b}$ and $\mathbf{c}$ directly on the sphere: toggle onto great-circle doubling to watch $\det\mathbf{G}_3$ collapse to $0$ ([@thm-ch06-geodesic-doubling-detgram3-zero]) and verify the integer arc-doubling law $\kappa_2 = (2\kappa_1 - 1)^2$ ([@thm-ch06-geodesic-doubling-kappa]), then lift $\mathbf{c}$ off the circle into the orthogonal triad `[1:0:0:0], [1:1:0:0], [1:0:1:0]` to inspect sign-invariant rational Bargmann loop values $B \in \mathbb{Q}$ alongside strictly positive curvature volume squared $\det\mathbf{G}_3 > 0$ ([@thm-ch06-detgram3-nonneg]).

Volume II has now rebuilt nonlinear spherical algebra, Lie triple curvature, rational Cayley rotations, Chebyshev harmonics, and spherical trigonometry entirely inside $\mathbb{Q}$, free of infinity and transcendentals. One challenge naturally rises next: **if algebra and trigonometry can shed infinity and transcendentals completely, can derivatives, curvature jets, and integrals also dispense with the limit $\lim_{h \to 0}$?** Carrying this spherical rational engine forward, we open Volume III in [Chapter 7 Second-Order Nilpotent Jets and Limit-Free Calculus](ch07-second-order-jet-calculus.md).

::: {.viz src="omega-math-workbench" preset="bargmann-gram-triad" height="520"}
**Interactive Bargmann–Gram Rational Spherical Triad (`bargmann-gram-triad`).** With $\mathbf{a} = \mathbf{o} = [1:0:0:0]$ fixed as the base anchor, adjust the rational ray vertices $\mathbf{b}$ and $\mathbf{c}$ on the purple sphere to inspect the square-root-free Bargmann loop invariant $B(\mathbf{a}, \mathbf{b}, \mathbf{c}) \in \mathbb{Q}$, pairwise fidelities $\kappa_{ab}, \kappa_{bc}, \kappa_{ca}$, and the closure determinant $\det\mathbf{G}_3 = 1 + 2B - (\kappa_{ab} + \kappa_{bc} + \kappa_{ca}) \ge 0$, contrasting cyan great-circle collinearity ($\det\mathbf{G}_3 = 0$) against the magenta rational spherical excess benchmark $\det\mathbf{G}_3 = 1/4$ on `[1:0:0:0], [1:1:0:0], [1:0:1:0]`.
:::
