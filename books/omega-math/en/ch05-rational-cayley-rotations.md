# Chapter 5 Three-Dimensional Rational Cayley Rotations and Chebyshev Harmonics

> *"Pass a skew-symmetric Lie-algebra generator into the rational Cayley fraction, and a single sequence of additions, multiplications, and divisions locks onto the orthogonal sphere without summoning $e$ or $\pi$; set a heap recurrence onto its integer Chebyshev rail, and a harmonic oscillation runs for ten billion beats without a single bit of amplitude drift."*

Having established origin-free heaps, Lie triple curvature, and the signed spinor double cover in [Chapter 4](ch04-heaps-and-lie-triple-curvature.md), we now turn to spatial rotations and discrete harmonic dynamics: **how do we map skew-symmetric generators $X \in \mathfrak{so}(3, \mathbb{Q})$ into the rational rotation group $\mathrm{SO}(3, \mathbb{Q})$, invert the map cleanly, and run discrete oscillations inside $\mathbb{Q}$ with exact norm conservation?**

Classical textbooks reach at once for the matrix exponential $\exp(X) = \sum_{k=0}^\infty \frac{1}{k!} X^k$, the matrix logarithm $\ln\mathbf{R}$, and the trigonometric functions $\cos\theta$ and $\sin\theta$. Yet every finite Taylor truncation immediately leaves the orthogonal group, injecting projection drift at every step. This chapter replaces that entire transcendental scaffold with four purely rational constructions while cleanly separating the strict zero-axiom layer from its classical real shadow: the closure identity, exact orthogonality, unit determinant, and iterated norm preservation of the **rational Cayley bridge**, the normalized denominator sum, constructive $\frac{1}{2}$ floor, expanded MRP forms, and closed unit-ball lock of the **singularity-free dual-chart MRP atlas**, the inner-product invariance, scale invariance, and homomorphism of the **square-root-free adjoint action** $\operatorname{Ad}(p)$, and unit squared-norm conservation of the signed `PythSpinor` **heap recurrence** are all proved in the cited D5 proofs on the strict backend (`strict_omega.axioms: []`); we then contrast them with the classical real-shadow **heap Chebyshev closed forms**, the **continuous-ray classification theorem**, and the **six-axis rational cover of $S^2$** to pinpoint exactly where $\pi$ enters classical physics.

## 5.1 Replacing Exponential Maps: The Rational Cayley Bridge

For any rational vector $\boldsymbol{\sigma} = (\sigma_1, \sigma_2, \sigma_3)^\top \in \mathbb{Q}^3$, form its skew-symmetric cross-product matrix

$$
X = [\boldsymbol{\sigma}]_\times := \begin{pmatrix} 0 & -\sigma_3 & \sigma_2 \\ \sigma_3 & 0 & -\sigma_1 \\ -\sigma_2 & \sigma_1 & 0 \end{pmatrix} \in \mathfrak{so}(3, \mathbb{Q}),
$$

satisfying $X\mathbf{v} = \boldsymbol{\sigma} \times \mathbf{v}$ and $X^\top = -X$. By the vector triple-product identity $\boldsymbol{\sigma}\times(\boldsymbol{\sigma}\times\mathbf{v}) = (\boldsymbol{\sigma}\cdot\mathbf{v})\boldsymbol{\sigma} - \lVert\boldsymbol{\sigma}\rVert^2\mathbf{v}$, the matrix $X$ obeys three exact polynomial identities:

$$
X\boldsymbol{\sigma} = \mathbf{0}, \qquad X^2 = \boldsymbol{\sigma}\boldsymbol{\sigma}^\top - \lVert\boldsymbol{\sigma}\rVert^2\mathbf{I}, \qquad X^3 = -\lVert\boldsymbol{\sigma}\rVert^2 X.
$$

Its characteristic polynomial is therefore $\det(\lambda\mathbf{I} - X) = \lambda(\lambda^2 + \lVert\boldsymbol{\sigma}\rVert^2)$. Evaluating at $\lambda = 1$ yields $\det(\mathbf{I} - X) = 1 + \lVert\boldsymbol{\sigma}\rVert^2 \ge 1 > 0$ for every $\boldsymbol{\sigma} \in \mathbb{Q}^3$: the matrix $\mathbf{I} - X$ is unconditionally invertible over $\mathbb{Q}$. A. Cayley (1846) turned this universal invertibility into a finite rational bridge between Lie algebra and rotation group.

::: {.definition #def-ch05-rational-cayley-bridge title="Three-Dimensional Forward and Inverse Rational Cayley Transform"}
For any rational generator $\boldsymbol{\sigma} \in \mathbb{Q}^3$ with $X = [\boldsymbol{\sigma}]_\times \in \mathfrak{so}(3, \mathbb{Q})$, define the **forward rational Cayley transform**:

$$
\mathbf{R}(\boldsymbol{\sigma}) := (\mathbf{I} - X)^{-1}(\mathbf{I} + X) = \frac{\bigl(1 - \lVert\boldsymbol{\sigma}\rVert^2\bigr)\mathbf{I} + 2X + 2\boldsymbol{\sigma}\boldsymbol{\sigma}^\top}{1 + \lVert\boldsymbol{\sigma}\rVert^2} \in \mathrm{SO}(3, \mathbb{Q}).
$$

Conversely, for any rotation $\mathbf{R} \in \mathrm{SO}(3, \mathbb{Q})$ that is not a $180^\circ$ half-turn (so $\det(\mathbf{R} + \mathbf{I}) \neq 0$), define the **inverse rational Cayley transform**:

$$
X = (\mathbf{R} + \mathbf{I})^{-1}(\mathbf{R} - \mathbf{I}) \in \mathfrak{so}(3, \mathbb{Q}).
$$

:::

The cited D5 declarations record `strict_omega.axioms: []`. Neither the real continuum nor the quotient axiom `Quot.sound` is invoked: rational three-vectors are encoded as integer triples with a shared strictly positive natural denominator (`RatVec3`), rational $3 \times 3$ matrices as integer matrices with a shared strictly positive natural denominator (`RatMat3`), and rational equality is expressed by cross-multiplication equivalences `RatVec3.Equiv`, `RatMat3.Equiv`, and `Omega.IntRatio.Equivalent`. Writing `skewMinus s` for $\mathbf{I} - X$, `skewPlus s` for $\mathbf{I} + X$, `Cayley s` for the forward closed-form matrix $\mathbf{R}(\boldsymbol{\sigma})$, and `cayleyIterate s v n` for the $n$-fold iteration $\mathbf{R}(\boldsymbol{\sigma})^n \mathbf{v}$, the four core properties of the forward Cayley transform hold unconditionally in the zero-axiom kernel.

::: {.theorem #thm-ch05-rational-cayley-core title="Closure, Orthogonality, Unit Determinant, and Iterated Norm Preservation of the Rational Cayley Transform" lean="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_identity D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_det D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_iterate_norm"}
The cited D5 declarations record `strict_omega.axioms: []`. For all rational three-vectors `s, v : RatVec3` and every natural number `n : Nat`, the forward rational Cayley matrix `Cayley s` (denoted $\mathbf{R}(\boldsymbol{\sigma})$) obeys four exact identities:

1. **Denominator-cleared Cayley identity** ([`cayley_identity`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_identity)): under `RatMat3.Equiv`,

   $$
   (\mathbf{I} - X)\,\mathbf{R}(\boldsymbol{\sigma}) \;\equiv\; \mathbf{I} + X.
   $$

2. **Exact orthogonality** ([`cayley_orthogonal`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal)): under `RatMat3.Equiv`,

   $$
   \mathbf{R}(\boldsymbol{\sigma})^\top \mathbf{R}(\boldsymbol{\sigma}) \;\equiv\; \mathbf{I}.
   $$

3. **Exact unit determinant** ([`cayley_det`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_det)): under `Omega.IntRatio.Equivalent`,

   $$
   \det\mathbf{R}(\boldsymbol{\sigma}) \;\equiv\; 1.
   $$

4. **Iterated squared-norm conservation** ([`cayley_iterate_norm`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_iterate_norm)): under `Omega.IntRatio.Equivalent`, for every $n \in \mathbb{N}$,

   $$
   \bigl\langle \operatorname{cayleyIterate}(\boldsymbol{\sigma}, \mathbf{v}, n),\; \operatorname{cayleyIterate}(\boldsymbol{\sigma}, \mathbf{v}, n)\bigr\rangle \;\equiv\; \langle\mathbf{v}, \mathbf{v}\rangle.
   $$

:::

::: {.proof}
Write `s : RatVec3` as $\boldsymbol{\sigma} = \mathbf{s}_0 / d$ with integer numerator $\mathbf{s}_0 = (x, y, z) \in \mathbb{Z}^3$ and strictly positive denominator $d \ge 1$, and form the nonzero integer quaternion $q := (d, x, y, z)$ with strictly positive squared norm $N := d^2 + x^2 + y^2 + z^2 \ge 1$. Let $C(d, \mathbf{s}_0) := (d^2 - \lVert\mathbf{s}_0\rVert^2)\mathbf{I} + 2d[\mathbf{s}_0]_\times + 2\mathbf{s}_0\mathbf{s}_0^\top$ be the integer numerator of `Cayley s` (with denominator $N$), and let $S_+ := d\mathbf{I} + [\mathbf{s}_0]_\times$ and $S_- := S_+^\top = d\mathbf{I} - [\mathbf{s}_0]_\times$ be the integer numerators of `skewPlus s` and `skewMinus s` (with denominator $d$). Direct integer polynomial expansion (equivalently substituting $[\mathbf{s}_0]_\times \mathbf{s}_0 = \mathbf{0}$ and $[\mathbf{s}_0]_\times^2 = \mathbf{s}_0\mathbf{s}_0^\top - \lVert\mathbf{s}_0\rVert^2\mathbf{I}$) yields three exact integer matrix identities:

$$
S_- C(d, \mathbf{s}_0) = N S_+, \qquad C(d, \mathbf{s}_0)^\top C(d, \mathbf{s}_0) = N^2 \mathbf{I}, \qquad \det C(d, \mathbf{s}_0) = N^3.
$$

Since $N > 0$, canceling the strictly positive factors $N$, $N^2$, and $N^3$ establishes parts 1–3 under `RatMat3.Equiv` and `Omega.IntRatio.Equivalent`. For part 4, expanding the matrix-vector product entrywise shows that applying `Cayley s` to $\mathbf{v}$ coincides identically with the adjoint action $\operatorname{Ad}(q)(\mathbf{v})$ of the nonzero quaternion $q = (d, x, y, z)$, which preserves rational dot products by part 1 of [@thm-ch05-rational-adjoint-action] (`ad_dot`); natural-number induction on $n$ seeded by reflexivity at $n = 0$ yields exact squared-norm conservation at every step $n \in \mathbb{N}$ with zero axioms. The full proof is checked by the Lean kernel.
:::

Two companion algebraic properties—exact inversion and rational composition—follow immediately over $\mathbb{Q}$ by elementary matrix algebra (manual derivation):

1. **Exact inversion**: rearranging part 1 of [@thm-ch05-rational-cayley-core], $(\mathbf{I} - X)\mathbf{R} = \mathbf{I} + X$, produces $\mathbf{R} - \mathbf{I} = X(\mathbf{R} + \mathbf{I})$. Whenever $\det(\mathbf{R} + \mathbf{I}) \neq 0$, commutativity of polynomials in $\mathbf{R}$ gives $X = (\mathbf{R} - \mathbf{I})(\mathbf{R} + \mathbf{I})^{-1} = (\mathbf{R} + \mathbf{I})^{-1}(\mathbf{R} - \mathbf{I})$.
2. **Rational Rodrigues composition and half-turn factorization**: whenever $1 - \mathbf{a}\cdot\mathbf{b} \neq 0$, matrix multiplication closes in a single rational fraction:

   $$
   \mathbf{R}(\mathbf{a})\,\mathbf{R}(\mathbf{b}) = \mathbf{R}\!\left(\frac{\mathbf{a} + \mathbf{b} + \mathbf{a} \times \mathbf{b}}{1 - \mathbf{a}\cdot\mathbf{b}}\right).
   $$

   Even a $180^\circ$ half-turn $\mathbf{R}_\pi(\mathbf{n}) = \frac{2\mathbf{n}\mathbf{n}^\top}{\lVert\mathbf{n}\rVert^2} - \mathbf{I}$ ($\mathbf{n} \in \mathbb{Z}^3 \setminus \{\mathbf{0}\}$), where $\det(\mathbf{R} + \mathbf{I}) = 0$, factors exactly into two regular Cayley steps: $\mathbf{R}(\mathbf{n})\,\mathbf{R}(\mathbf{n}/\lVert\mathbf{n}\rVert^2) = \mathbf{R}_\pi(\mathbf{n})$.

By contrast, any finite-order Taylor truncation $T_k(X) = \sum_{j=0}^k \frac{1}{j!} X^j$ ($k \ge 1$, manual derivation) satisfies $X^2 = -u\mathbf{I}$ ($u := \lVert\boldsymbol{\sigma}\rVert^2$) on the plane orthogonal to $\boldsymbol{\sigma}$, so $T_k(X)^\top T_k(X)$ scales squared lengths in that plane by the non-constant polynomial $M_k(u) = \bigl\lvert\sum_{j=0}^k \frac{(i\sqrt{u})^j}{j!}\bigr\rvert^2$. Because $M_k(u) - 1$ has degree $k$ with positive leading coefficient $\frac{1}{(k!)^2}$, **no finite Taylor polynomial can preserve orthogonality on any open interval of nonzero generators**.

::: {.example #ex-ch05-cayley-vs-taylor title="Twelve-Step Rational Cayley Exactness Versus Second-Order Taylor Drift"}
Take $\boldsymbol{\sigma} = \bigl(\frac{1}{2}, \frac{1}{2}, 0\bigr)^\top \in \mathbb{Q}^3$, so $u = \lVert\boldsymbol{\sigma}\rVert^2 = \frac{1}{2}$ and $1 + u = \frac{3}{2}$. The forward Cayley formula yields in one step

$$
\mathbf{R}\!\left(\tfrac{1}{2}, \tfrac{1}{2}, 0\right) = \frac{1}{3}\begin{pmatrix} 2 & 1 & 2 \\ 1 & 2 & -2 \\ -2 & 2 & 1 \end{pmatrix} \in \mathrm{SO}(3, \mathbb{Q}), \qquad \mathbf{R}^\top\mathbf{R} = \mathbf{I}, \quad \det\mathbf{R} = 1.
$$

Applying $\mathbf{R}$ twelve times to the unit vector $\mathbf{v}_0 = (0, 0, 1)^\top \perp \boldsymbol{\sigma}$ produces an exact rational vector $\mathbf{R}^{12}\mathbf{v}_0 \in \frac{1}{3^{12}}\mathbb{Z}^3$ (denominator $3^{12} = 531{,}441$) whose squared norm remains identically $\frac{1}{1}$, concretely illustrating part 4 of [@thm-ch05-rational-cayley-core] (`cayley_iterate_norm`). Applying the second-order Taylor truncation $T_2(X) = \mathbf{I} + X + \frac{1}{2}X^2$ of the same generator $X = [\boldsymbol{\sigma}]_\times$ scales squared norms by $M_2(\frac{1}{2}) = 1 + \frac{u^2}{4} = \frac{17}{16}$ per step; after twelve steps $\lVert T_2(X)^{12}\mathbf{v}_0\rVert^2 = \bigl(\frac{17}{16}\bigr)^{12} > 2.069$, blowing clean off the unit sphere.
:::

## 5.2 Singularity-Free Dual Charts and the Denominator Bound

The single-chart Rodrigues product $\frac{\mathbf{a}+\mathbf{b}+\mathbf{a}\times\mathbf{b}}{1-\mathbf{a}\cdot\mathbf{b}}$ reaches its half-turn singularity at $\mathbf{a}\cdot\mathbf{b}=1$. Modified Rodrigues Parameters (MRP) first lift rational parameters to rational unit spinors, then switch between two denominators. The result is bounded, singularity-free rational composition on $\operatorname{Ad}(S^3(\mathbb{Q}))$.

::: {.definition #def-ch05-dual-chart-star title="Singularity-Free Dual-Chart Rational Composition"}
For any two vectors $\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B \in \mathbb{Q}^3$, define the shared numerator vector $\mathbf{N}$, the primary denominator $D_+$, and the shadow-chart denominator $D_-$:

$$
\mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B) := \bigl(1 - \lVert\boldsymbol{\sigma}_A\rVert^2\bigr)\boldsymbol{\sigma}_B + \bigl(1 - \lVert\boldsymbol{\sigma}_B\rVert^2\bigr)\boldsymbol{\sigma}_A + 2(\boldsymbol{\sigma}_A \times \boldsymbol{\sigma}_B),
$$

$$
D_+(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B) := 1 + \lVert\boldsymbol{\sigma}_A\rVert^2\lVert\boldsymbol{\sigma}_B\rVert^2 - 2(\boldsymbol{\sigma}_A \cdot \boldsymbol{\sigma}_B), \qquad D_-(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B) := \lVert\boldsymbol{\sigma}_A + \boldsymbol{\sigma}_B\rVert^2.
$$

Define the **singularity-free dual-chart product** $\star_{\mathcal{S}}$ by

$$
\boldsymbol{\sigma}_A \star_{\mathcal{S}} \boldsymbol{\sigma}_B := \begin{cases} +\dfrac{\mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B)}{D_+}, & D_+ \ge D_-, \\[8pt] -\dfrac{\mathbf{N}(\boldsymbol{\sigma}_A, \boldsymbol{\sigma}_B)}{D_-}, & D_+ < D_-. \end{cases}
$$

:::

The stereographic lift $Q(\boldsymbol{\sigma})=\frac{(1-\lVert\boldsymbol{\sigma}\rVert^2)\mathbf{1}+2\boldsymbol{\sigma}}{1+\lVert\boldsymbol{\sigma}\rVert^2}\in S^3(\mathbb{Q})$ satisfies $Q(-\boldsymbol{\sigma}/\lVert\boldsymbol{\sigma}\rVert^2)=-Q(\boldsymbol{\sigma})$ for $\boldsymbol{\sigma}\ne0$. The opposite spinors give the same adjoint rotation. If tracking the spinor sign, flip one sign bit when choosing $D_-$.

Conversely, given a rational unit spinor $(w,\mathbf{v})$, choose its sign so that $w\ge0$ and take $\boldsymbol{\sigma}=\mathbf{v}/(1+w)$. Substitution in $Q$ recovers the spinor, and $\lVert\boldsymbol{\sigma}\rVert^2=(1-w)/(1+w)\le1$. Thus rational MRP parameters in the closed unit ball cover exactly the adjoint image of the rational unit spinor group. The integer quarter-turn in the next section lies outside this image.

The cited D5 declarations record `strict_omega.axioms: []`. The entire dual-chart atlas locks directly in `PythSpinor` and `RatVec3` without real numbers or classical choice. Given two rational three-vectors `u, v : RatVec3` written $\mathbf{u} = \mathbf{x}/d$ and $\mathbf{v} = \mathbf{y}/e$ (integer numerators $\mathbf{x}, \mathbf{y} \in \mathbb{Z}^3$ and strictly positive denominators $d, e \ge 1$), form the stereographic lifts `lift u` $:= ((d^2 - \lVert\mathbf{x}\rVert^2,\, 2d\mathbf{x});\; d^2 + \lVert\mathbf{x}\rVert^2) : \mathrm{PythSpinor}$ and their quaternion product $p := \operatorname{product}(\mathbf{u}, \mathbf{v}) := (\operatorname{lift}\mathbf{u})\cdot(\operatorname{lift}\mathbf{v})$, with scalar entry $w_p := p.\mathrm{num}.w$, imaginary vector $\mathbf{v}_p := \operatorname{Vec3.imaginary}(p.\mathrm{num})$, and strictly positive radius $r_p := p.\mathrm{radius} = (d^2 + \lVert\mathbf{x}\rVert^2)(e^2 + \lVert\mathbf{y}\rVert^2) > 0$. Define the **normalized chart denominators**

$$
\operatorname{denomPlus}(\mathbf{u}, \mathbf{v}) := \frac{r_p + w_p}{2 r_p}, \qquad \operatorname{denomMinus}(\mathbf{u}, \mathbf{v}) := \frac{r_p - w_p}{2 r_p} \;\in\; \mathrm{IntRatio},
$$

the cleared-denominator **expanded MRP numerators**

$$
\operatorname{mrpPlusNum}(\mathbf{u}, \mathbf{v}) := d^2 e^2 + \lVert\mathbf{x}\rVert^2\lVert\mathbf{y}\rVert^2 - 2de(\mathbf{x}\cdot\mathbf{y}), \qquad \operatorname{mrpMinusNum}(\mathbf{u}, \mathbf{v}) := \lVert\mathbf{x}\rVert^2 e^2 + d^2\lVert\mathbf{y}\rVert^2 + 2de(\mathbf{x}\cdot\mathbf{y}),
$$

and the selected dual-chart output `output u v` $:= \operatorname{orientNumerator}(w_p, \mathbf{v}_p) / (r_p + \lvert w_p\rvert) : \mathrm{RatVec3}$, where `orientNumerator` preserves the sign of $\mathbf{v}_p$ when $w_p \ge 0$ and negates it when $w_p < 0$. The next zero-axiom theorem locks the MRP denominator identities, unit normalization, constructive $\frac{1}{2}$ floor, and closed unit-ball containment simultaneously.

::: {.theorem #thm-ch05-dual-chart-singularity-free title="Normalized Dual-Chart MRP Denominators, Constructive Half Floor, and Unit-Ball Containment" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_mrp_denominators D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_denom_sum_one D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_denom_ge_half D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_ball_containment"}
The cited D5 declarations record `strict_omega.axioms: []`. For all rational three-vectors `u, v : RatVec3`, put $r_p := (\operatorname{product}(\mathbf{u}, \mathbf{v})).\mathrm{radius}$ and $r := (\operatorname{product}(\mathbf{u}, \mathbf{v})).\mathrm{radiusPred}$ (so $r + 1 = r_p$). Then all four statements hold unconditionally:

1. **Expanded MRP forms of the normalized denominators** ([`dual_chart_mrp_denominators`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_mrp_denominators)): under `Omega.IntRatio.Equivalent`,

   $$
   \operatorname{denomPlus}(\mathbf{u}, \mathbf{v}) \;\equiv\; \frac{\operatorname{mrpPlusNum}(\mathbf{u}, \mathbf{v})}{r_p}
   \qquad \text{and} \qquad
   \operatorname{denomMinus}(\mathbf{u}, \mathbf{v}) \;\equiv\; \frac{\operatorname{mrpMinusNum}(\mathbf{u}, \mathbf{v})}{r_p}.
   $$

2. **Unit sum of normalized denominators** ([`dual_chart_denom_sum_one`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_denom_sum_one)): under `Omega.IntRatio.Equivalent`,

   $$
   \operatorname{denomPlus}(\mathbf{u}, \mathbf{v}) + \operatorname{denomMinus}(\mathbf{u}, \mathbf{v}) \;\equiv\; 1.
   $$

3. **Constructive half-floor disjunction without classical choice** ([`dual_chart_denom_ge_half`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_denom_ge_half)): in the rational order `Omega.IntRatio.Le`, the constructive disjunction holds with zero `Classical.choice`,

   $$
   \frac{1}{2} \le \operatorname{denomPlus}(\mathbf{u}, \mathbf{v})
   \quad \lor \quad
   \frac{1}{2} \le \operatorname{denomMinus}(\mathbf{u}, \mathbf{v}).
   $$

4. **Closed unit-ball containment of the selected output** ([`dual_chart_ball_containment`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.dual_chart_ball_containment)): under `Omega.IntRatio.Le`,

   $$
   \bigl\langle\operatorname{output}(\mathbf{u}, \mathbf{v}),\, \operatorname{output}(\mathbf{u}, \mathbf{v})\bigr\rangle \;\le\; 1.
   $$
:::

::: {.proof}
For part 1, expanding the product radius $r_p = (d^2 + \lVert\mathbf{x}\rVert^2)(e^2 + \lVert\mathbf{y}\rVert^2)$ and scalar component $w_p = (d^2 - \lVert\mathbf{x}\rVert^2)(e^2 - \lVert\mathbf{y}\rVert^2) - 4de(\mathbf{x}\cdot\mathbf{y})$ yields the exact integer identities $r_p + w_p = 2\,\operatorname{mrpPlusNum}(\mathbf{u}, \mathbf{v})$ and $r_p - w_p = 2\,\operatorname{mrpMinusNum}(\mathbf{u}, \mathbf{v})$; canceling the factor of $2$ establishes both equivalences in `Omega.IntRatio.Equivalent`. For part 2, summing the numerators gives $(r_p + w_p) + (r_p - w_p) = 2r_p$ over the strictly positive denominator $2r_p$, reducing identically to $1$. For part 3, integer recursion (`Int.rec`) splits directly on the sign of $w_p$: if $w_p = a \ge 0$, then $2(r_p + a) - 2r_p = 2a \ge 0$ constructs `Or.inl` ($\frac{1}{2} \le \operatorname{denomPlus}$); if $w_p = -(a + 1) < 0$, then $r_p - w_p = r_p + a + 1$ gives gap $2(a + 1) \ge 0$ and constructs `Or.inr` ($\frac{1}{2} \le \operatorname{denomMinus}$), with zero `Classical.choice`. For part 4, put $a := \lvert w_p\rvert$ and $s := \lVert\mathbf{v}_p\rVert^2$; sign orientation preserves $s$, and substituting the Pythagorean certificate $a^2 + s = r_p^2$ into $(r_p + a)^2 - s = (r_p^2 - (a^2 + s)) + 2a(r_p + a)$ leaves the nonnegative slack $2a(r_p + a) \ge 0$, certifying $\lVert\operatorname{output}(\mathbf{u}, \mathbf{v})\rVert^2 = s / (r_p + a)^2 \le 1$. This declaration depends solely on `OmegaInit` and `OmegaMath` with empty transitive axiom closure. The full proof is checked by the Lean kernel.
:::

Reconciling [@thm-ch05-dual-chart-singularity-free] with the unnormalized MRP denominators $D_+, D_-$ of [@def-ch05-dual-chart-star] is immediate (manual derivation): dividing numerator and denominator by $d^2 e^2$ gives $\operatorname{mrpPlusNum}(\mathbf{u}, \mathbf{v}) = d^2 e^2 D_+(\mathbf{u}, \mathbf{v})$, $\operatorname{mrpMinusNum}(\mathbf{u}, \mathbf{v}) = d^2 e^2 D_-(\mathbf{u}, \mathbf{v})$, and $r_p = d^2 e^2(1 + \lVert\mathbf{u}\rVert^2)(1 + \lVert\mathbf{v}\rVert^2) = d^2 e^2(D_+ + D_-)$. Thus the normalized chart denominators are precisely the fractional shares $\operatorname{denomPlus} \equiv \frac{D_+}{D_+ + D_-}$ and $\operatorname{denomMinus} \equiv \frac{D_-}{D_+ + D_-}$, while $\mathbf{v}_p = 2d^2 e^2 \mathbf{N}(\mathbf{u}, \mathbf{v})$ and $w_p \ge 0 \iff D_+ \ge D_-$ identify `output u v` entrywise with $\mathbf{u} \star_{\mathcal{S}} \mathbf{v}$. Because $D_+ + D_- = (1 + \lVert\mathbf{u}\rVert^2)(1 + \lVert\mathbf{v}\rVert^2) \ge 1$, part 3 immediately implies the unnormalized floor $\max(D_+, D_-) = (D_+ + D_-)\max(\operatorname{denomPlus}, \operatorname{denomMinus}) \ge \frac{1}{2}(1 + \lVert\mathbf{u}\rVert^2)(1 + \lVert\mathbf{v}\rVert^2) \ge \frac{1}{2}$, and the numerator factorization $\lVert\mathbf{N}\rVert^2 = D_+ D_-$ mirrors part 4's closed-ball bound $\lVert\mathbf{u} \star_{\mathcal{S}} \mathbf{v}\rVert^2 = \frac{\min(D_+, D_-)}{\max(D_+, D_-)} \le 1$. Every division therefore stays uniformly bounded away from zero, and every composed state remains trapped inside $\overline{B}_1(\mathbb{Q}^3)$ with no renormalization required.

The figure below pairs the two geometric mechanisms of Sections 5.1 and 5.2 side by side: exact spherical preservation of the rational Cayley transform ([@thm-ch05-rational-cayley-core]) versus outward drift of finite Taylor truncation, alongside the dual-chart switch certified by [@thm-ch05-dual-chart-singularity-free] that locks every composition inside the closed unit ball.

::: {.figure src="ch05-cayley-dual-chart"}
**Exact spherical locking of rational Cayley iteration versus Taylor truncation drift, paired with the dual-chart denominator floor $\max(D_+, D_-) \ge \frac{1}{2}$.** The figure contrasts exact unit-norm conservation along $\mathbf{R}(\boldsymbol{\sigma})^n \mathbf{v}_0$ against the outward radial inflation of second-order Taylor truncation $T_2(X)$, and illustrates how switching between the primary denominator $D_+$ and shadow denominator $D_-$ under $D_+ + D_- = (1 + \lVert\boldsymbol{\sigma}_A\rVert^2)(1 + \lVert\boldsymbol{\sigma}_B\rVert^2) \ge 1$ enforces both $\max(D_+, D_-) \ge \frac{1}{2}$ and automatic ball containment; see [@thm-ch05-rational-cayley-core], [@def-ch05-dual-chart-star], and [@ex-ch05-cayley-vs-taylor].
:::

## 5.3 Square-Root-Free Adjoint Rotations from Non-Square Norms

Lifting directly to homogeneous integer quaternions (`ProjTernion`) removes even chart switching. Here lies a striking algebraic fact: **even when an integer quadruple $p = (w, x, y, z) \in \mathbb{Z}^4 \setminus \{\mathbf{0}\}$ has a non-square squared norm $\lVert p\rVert^2$—so normalizing $p / \lVert p\rVert$ forces an irrational square root—its three-dimensional adjoint action still lands identically inside the rational orthogonal group $\mathrm{SO}(3, \mathbb{Q})$.**

::: {.definition #def-ch05-rational-adjoint title="Square-Root-Free Homogeneous Adjoint Action"}
For any nonzero integer (or rational) quadruple $p = (w, x, y, z) = (w, \mathbf{u}) \in \mathbb{Z}^4 \setminus \{\mathbf{0}\}$ with $N := \lVert p\rVert^2 = w^2 + x^2 + y^2 + z^2 \ge 1$, its **square-root-free adjoint action** on $\mathbb{Q}^3 \cong \operatorname{Im}\mathbb{H}(\mathbb{Q})$ is defined by

$$
\operatorname{Ad}(p)(\mathbf{v}) := \frac{p\,\mathbf{v}\,\bar{p}}{\lVert p\rVert^2} = \frac{\bigl(w^2 - \lVert\mathbf{u}\rVert^2\bigr)\mathbf{v} + 2w(\mathbf{u} \times \mathbf{v}) + 2(\mathbf{u}\cdot\mathbf{v})\mathbf{u}}{w^2 + \lVert\mathbf{u}\rVert^2}.
$$

In explicit $3 \times 3$ rational matrix form,

$$
\operatorname{Ad}(p) = \frac{1}{N}\begin{pmatrix}
w^2 + x^2 - y^2 - z^2 & 2(xy - wz) & 2(xz + wy) \\
2(xy + wz) & w^2 - x^2 + y^2 - z^2 & 2(yz - wx) \\
2(xz - wy) & 2(yz + wx) & w^2 - x^2 - y^2 + z^2
\end{pmatrix} \in \mathrm{SO}(3, \mathbb{Q}).
$$

:::

Why do all square roots cancel? Because bilateral conjugation multiplies by both $p$ and $\bar{p}$, fusing two would-be factors of $\sqrt{N}$ into the single strictly positive integer denominator $N = \lVert p\rVert^2 \in \mathbb{Z}_{>0}$. The three fundamental algebraic laws of this square-root-free action—preservation of the rational dot product, invariance under nonzero integer scaling (including sign flip $p \mapsto -p$), and the multiplicative homomorphism law—are proved by the cited D5 declarations (`strict_omega.axioms: []`).

::: {.theorem #thm-ch05-rational-adjoint-action title="Isometry, Scale Invariance, and Homomorphism of the Square-Root-Free Adjoint Action" lean="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_dot D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_scale D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_hom"}
The cited D5 declarations record `strict_omega.axioms: []`. Let `p, q : Quaternion` be integer quaternions satisfying `p.Nonzero` and `q.Nonzero`, let `k : Int` be any nonzero signed integer ($k \neq 0$), and let `u, v : RatVec3` be arbitrary rational three-vectors. Then the homogeneous adjoint action `Ad` satisfies:

1. **Rational inner-product preservation** ([`ad_dot`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_dot)): under `Omega.IntRatio.Equivalent`,

   $$
   \bigl\langle \operatorname{Ad}(p)\mathbf{u},\; \operatorname{Ad}(p)\mathbf{v}\bigr\rangle \;\equiv\; \langle\mathbf{u}, \mathbf{v}\rangle.
   $$

2. **Nonzero integer scale invariance** ([`ad_scale`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_scale)): under `RatVec3.Equiv`,

   $$
   \operatorname{Ad}(k p)\mathbf{v} \;\equiv\; \operatorname{Ad}(p)\mathbf{v}.
   $$

3. **Multiplicative homomorphism** ([`ad_hom`](lean:D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_hom)): under `RatVec3.Equiv`,

   $$
   \operatorname{Ad}(p q)\mathbf{v} \;\equiv\; \operatorname{Ad}(p)\bigl(\operatorname{Ad}(q)\mathbf{v}\bigr).
   $$

:::

::: {.proof}
For any integer vector $\mathbf{w} \in \mathbb{Z}^3$ embedded as a pure imaginary quaternion, polynomial expansion shows that the bilateral product $p\,\mathbf{w}\,\bar{p}$ has vanishing scalar part, so its imaginary part `adjointNum p w` equals $p\,\mathbf{w}\,\bar{p}$ in $\mathbb{H}(\mathbb{Z})$. Left and right norm scaling of the quaternion inner product yields the exact integer identity $\langle p\,\mathbf{u}_0\,\bar{p},\, p\,\mathbf{v}_0\,\bar{p}\rangle = \langle\mathbf{u}_0, \mathbf{v}_0\rangle \cdot \lVert p\rVert^4$; since `p.Nonzero` guarantees $\lVert p\rVert^2 > 0$, the positive factor $\lVert p\rVert^4$ cancels against the product denominator $(\lVert p\rVert^2 d_u)(\lVert p\rVert^2 d_v)$, proving part 1 in `Omega.IntRatio.Equivalent`. For part 2, replacing $p$ by $kp$ ($k \neq 0$) multiplies both the bilinear numerator `adjointNum` and the denominator $\lVert p\rVert^2$ by $k^2 = \lvert k\rvert^2 > 0$, which cancels under `RatVec3.Equiv`. For part 3, quaternion associativity, anti-multiplicativity of conjugation $\overline{pq} = \bar{q}\bar{p}$, and purity of $q\,\mathbf{v}_0\,\bar{q}$ give $(pq)\mathbf{v}_0\overline{pq} = p(q\mathbf{v}_0\bar{q})\bar{p}$, while four-square norm multiplicativity $\lVert pq\rVert^2 = \lVert p\rVert^2 \lVert q\rVert^2$ matches both denominators identically, establishing `RatVec3.Equiv` with zero axioms. The full proof is checked by the Lean kernel.
:::

Setting $k=-1$ in part 2 of [@thm-ch05-rational-adjoint-action] gives $\operatorname{Ad}(-p)\equiv\operatorname{Ad}(p)$. Direct expansion gives $\operatorname{Ad}(\bar p)=\operatorname{Ad}(p)^\top$ (hand derivation). Write $p=(w,\mathbf{u})$. For $w\ne0$, $\operatorname{Ad}(p)=\mathbf{R}(\mathbf{u}/w)$. For $w=0$, $\operatorname{Ad}(0,\mathbf{u})=2\mathbf{u}\mathbf{u}^\top/\lVert\mathbf{u}\rVert^2-\mathbf{I}$. The first formula covers every rational rotation reached by the ordinary Cayley inverse and the second covers the half-turns. A half-turn axis can be found by rational elimination in $\ker(R-\mathbf{I})$. Clear denominators in either case to get an integer quadruple.

If two nonzero rational quaternions give the same adjoint rotation, their quotient commutes with $\mathbf{i},\mathbf{j},\mathbf{k}$, so it is a nonzero rational scalar. Each rotation therefore corresponds to one rational ray. That ray has a rational unit representative exactly when the squared norm of any representative is a rational square. In that case there are exactly two unit representatives, opposite in sign.

::: {.example #ex-ch05-phalf-integer-rotation title="Exact Integer 90° Rotation from the Non-Square-Norm State pHalf = (1, 1, 0, 0)"}
Consider the equatorial integer anchor `pHalf` $= (1, 1, 0, 0)$. Its squared norm $N = 1^2 + 1^2 = 2$ is not a square, so normalizing it to a unit spinor requires the irrational factor $\frac{1}{\sqrt{2}}$. Yet substituting into $\operatorname{Ad}(p_{\mathrm{Half}})$ cancels the denominator $2$ completely and produces an exact integer $90^\circ$ rotation matrix:

$$
\operatorname{Ad}(1, 1, 0, 0) = \frac{1}{2}\begin{pmatrix} 2 & 0 & 0 \\ 0 & 0 & -2 \\ 0 & 2 & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{pmatrix} \in \mathrm{SO}(3, \mathbb{Z}),
$$

which acts as $(x, y, z) \mapsto (x, -z, y)$! Likewise, the body-diagonal state $g_{120} = (1, 1, 1, 1)$ ($N = 4$) induces the exact cyclic coordinate permutation $\operatorname{Ad}(1, 1, 1, 1)(x, y, z) = (z, x, y) \in \mathrm{SO}(3, \mathbb{Z})$, while the norm-$5$ Hurwitz prime spinor $(1, 2, 0, 0)$ (also non-square norm) yields the exact denominator-$5$ rational rotation $\frac{1}{5}\bigl(\begin{smallmatrix} 5 & 0 & 0 \\ 0 & -3 & -4 \\ 0 & 4 & -3 \end{smallmatrix}\bigr) \in \mathrm{SO}(3, \mathbb{Q})$.

The integer rotation about the first axis has trace $1$. For a unit quaternion $(w,\mathbf{v})$, the adjoint matrix has trace $4w^2-1$, so this rotation would require $w^2=1/2$. There is no rational solution. Thus $\operatorname{Ad}(p_{\mathrm{Half}})$ lies in the ordinary rational Cayley chart and has no rational MRP representation. The dual-chart denominator bound and ball containment apply to compositions of rational MRP inputs.
:::

## 5.4 Heap Chebyshev Harmonics, Continuous Rays, and Six-Axis Covers

With three-dimensional rotations freed from transcendental maps, we turn to harmonic time stepping and global sphere covers. In [Chapter 4](ch04-heaps-and-lie-triple-curvature.md), [@thm-ch04-anchored-heap-and-reflection] proved that iterated heap reflection $x_{n+2} = [x_{n+1}, x_n, x_{n+1}]$ equals anchored powers $b^n$, while [@def-ch04-pyth-spinor-and-bridge] introduced signed Pythagorean spinors `PythSpinor` (integer quadruples `num` with strictly positive radius $r > 0$ obeying $\lVert p_{\mathrm{num}}\rVert^2 = r^2$). In the cited D5 proof on the strict backend (`strict_omega.axioms: []`), this signed spinor heap recurrence locks exact rational unit squared norm at every beat $n \in \mathbb{N}$ without real numbers or square roots.

::: {.theorem #thm-ch05-spinor-heap-norm-preserved title="Unit-Norm Conservation of the Signed Pythagorean Spinor Heap Recurrence" lean="D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.heap_norm_preserved"}
The cited D5 declarations record `strict_omega.axioms: []`. Let `a, b : PythSpinor` be any two signed Pythagorean spinors, let `heapAt a b n : PythSpinor` denote the $n$-th beat of the iterated heap recurrence $x_0 = a$, $x_1 = b$, $x_{n+2} = [x_{n+1}, x_n, x_{n+1}]$, and let `spinorNormSq p` denote the rational squared norm $\lVert p_{\mathrm{num}}\rVert^2 / r^2 \in \mathrm{IntRatio}$ of a spinor $p$. Then for every natural number `n : Nat`, under `Omega.IntRatio.Equivalent`,

$$
\operatorname{spinorNormSq}\bigl(\operatorname{heapAt}(a, b, n)\bigr) \;\equiv\; 1.
$$

:::

::: {.proof}
Starting from the initial pair $(a, b)$, each step advances $(x_n, x_{n+1})$ to $(x_{n+1},\, [x_{n+1}, x_n, x_{n+1}])$. By four-square norm multiplicativity, `PythSpinor` is closed under ternary heap reflection, so every beat $p := \operatorname{heapAt}(a, b, n)$ preserves the Pythagorean equation $\lVert p_{\mathrm{num}}\rVert^2 = r^2$ with strictly positive radius $r := p_{\mathrm{radius}} > 0$. Consequently $r^2 > 0$ and `spinorNormSq p` $= r^2 / r^2 \equiv 1$ in `Omega.IntRatio.Equivalent` with zero axioms. The full proof is checked by the Lean kernel.
:::

While [@thm-ch05-spinor-heap-norm-preserved] certifies exact unit-norm conservation on `PythSpinor` purely inside the zero-axiom kernel, contrasting it with the classical real-quaternion shadow ($\mathbb{H}$ in `Mathlib`) exposes the full equivalence between the cubic heap recurrence and the integer-coefficient Chebyshev polynomials $T_n, U_n \in \mathbb{Z}[X]$.

::: {.theorem #thm-ch05-chebyshev-heap-recurrence title="Unit-Norm Conservation and Chebyshev Closed Forms of the Heap Recurrence" lean="D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev"}
Let $x : \mathbb{N} \to \mathbb{H}$ be a quaternion sequence, set $c := \langle x_0, x_1\rangle$, and let $T_n, U_n \in \mathbb{Z}[X]$ denote the Chebyshev polynomials of the first and second kinds (with the convention $U_{-1} = 0$ at $n = 0$). Then the following two statements are equivalent:

1. The first two terms have unit norm squared and the sequence obeys the origin-free heap recurrence:

   $$
   \operatorname{normSq}(x_0) = 1 \;\land\; \operatorname{normSq}(x_1) = 1 \;\land\; \forall\, n \in \mathbb{N},\; x_{n+2} = x_{n+1}\,\bar{x}_n\,x_{n+1};
   $$

2. Every term has unit norm squared and satisfies the Chebyshev closed form and inner-product law for all $n \in \mathbb{N}$:

   $$
   \operatorname{normSq}(x_n) = 1, \qquad x_{n+1} = U_n(c)\,x_1 - U_{n-1}(c)\,x_0, \qquad \langle x_0, x_n\rangle = T_n(c).
   $$

:::

::: {.proof}
In the forward direction, the quaternion reflection identity $a\bar{b}a = 2\langle a, b\rangle a - \operatorname{normSq}(a)\,b$ combined with norm multiplicativity preserves $\operatorname{normSq}(x_n) = 1$ and keeps adjacent inner products constant: $\langle x_{n+1}, x_{n+2}\rangle = \langle x_{n+1}, x_{n+1}\bar{x}_n x_{n+1}\rangle = \langle x_n, x_{n+1}\rangle = c$. The cubic recurrence therefore linearizes to $x_{n+2} = 2c\,x_{n+1} - x_n$, whose induction matches $U_{n+1}(c) = 2c\,U_n(c) - U_{n-1}(c)$; taking the inner product with $x_0$ and using $c\,U_{n-1}(c) - U_{n-2}(c) = T_n(c)$ gives $\langle x_0, x_n\rangle = T_n(c)$. Conversely, Chebyshev polynomial identities verify unit norm for $x_0, x_1$ and $x_{n+1}\bar{x}_n x_{n+1} = 2c\,x_{n+1} - x_n = x_{n+2}$. The full proof is checked by the Lean kernel.
:::

Taken together, the zero-axiom theorem [@thm-ch05-spinor-heap-norm-preserved] and the classical shadow theorem [@thm-ch05-chebyshev-heap-recurrence] show that seeding the recurrence with any rational unit states $x_0, x_1 \in S^3(\mathbb{Q})$ ($c \in \mathbb{Q}$) advances $x_{n+2} = 2c\,x_{n+1} - x_n$ using only rational arithmetic, yielding **purely rational harmonic waves** $\kappa(x_0, x_n) = \frac{1 + T_n(c)}{2} \in \mathbb{Q} \cap [0, 1]$ with zero amplitude decay.

::: {.example #ex-ch05-rational-harmonic-stepping title="First Four Beats of Rational Chebyshev Harmonic Stepping at c = 3/5"}
Seed the recurrence with $x_0 = (1, 0, 0, 0)$ and the Pythagorean Cayley point $x_1 = Q(\frac{1}{2}, 0, 0) = (\frac{3}{5}, \frac{4}{5}, 0, 0)$, so $c = \frac{3}{5}$ and $\kappa_1 = \frac{4}{5}$. Stepping $x_{n+1} = \frac{6}{5}x_n - x_{n-1}$ gives:

| Beat $n$ | Rational state $x_n \in S^3(\mathbb{Q})$ | Squared-norm check $\lVert x_n\rVert^2$ | Chebyshev value $T_n(3/5)$ | Fidelity $\kappa(x_0, x_n)$ |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $(1, 0, 0, 0)$ | $1/1$ | $1$ | $1$ |
| $1$ | $(\frac{3}{5}, \frac{4}{5}, 0, 0)$ | $\frac{9 + 16}{25} = 1$ | $\frac{3}{5}$ | $\frac{4}{5}$ |
| $2$ | $(-\frac{7}{25}, \frac{24}{25}, 0, 0)$ | $\frac{49 + 576}{625} = 1$ | $-\frac{7}{25}$ | $\frac{9}{25}$ |
| $3$ | $(-\frac{117}{125}, \frac{44}{125}, 0, 0)$ | $\frac{13689 + 1936}{15625} = 1$ | $-\frac{117}{125}$ | $\frac{4}{125}$ |
| $4$ | $(-\frac{527}{625}, -\frac{336}{625}, 0, 0)$ | $\frac{277729 + 112896}{390625} = 1$ | $-\frac{527}{625}$ | $\frac{49}{625}$ |

Notice the doubling checks $\kappa_2 = (2\cdot\frac{4}{5} - 1)^2 = \frac{9}{25}$ and $\kappa_4 = (2\cdot\frac{9}{25} - 1)^2 = \frac{49}{625}$: every beat remains an exact rational Pythagorean quadruple on $S^3(\mathbb{Q})$ without $\sin$, $\cos$, or floating-point drift.
:::

Two deep questions now converge: if the duplication law $\varphi(g^2) = (2\varphi(g) - 1)^2$ and Chebyshev stepping require no $\pi$, exactly where do $\pi$ and $\cos^2$ enter classical physics? And on the base two-sphere $S^2$, can one construct a finite open cover excluding orthogonal pairs using nothing but integer inequalities? The next frozen theorem on the classical real-shadow side answers both at once.

::: {.theorem #thm-ch05-continuous-ray-and-six-axis title="Continuous-Ray Classification of the Duplication Law and Rational Six-Axis Cover of S²" lean="D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover"}
The following two kernel-verified theorems govern continuous tangent rays and square-root-free sphere covers:

1. **Continuous-ray classification** ([`comparison_classification_of_continuous_rays`](lean:D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays)): let $A$ be a finite-dimensional real normed algebra, $L \subseteq A$ a real subspace closed under $[X, Y] = XY - YX$, and $G \le A^\times$ a subgroup with $\exp(L) \subseteq G$ and $g L g^{-1} \subseteq L$ for all $g \in G$. Suppose $\varphi : G \to [0, 1]$ satisfies faithfulness $\varphi(g) = 1 \iff g = 1$, duplication $\varphi(g^2) = (2\varphi(g) - 1)^2$, conjugation invariance $\varphi(kgk^{-1}) = \varphi(g)$, and continuity of $t \mapsto \varphi(\exp tX)$ on $\mathbb{R}$ for every $X \in L$. Then there exists a positive-definite $\operatorname{ad}$-invariant symmetric bilinear form $h$ on $L$ such that:

   - $\varphi(\exp tX) = \cos^2\bigl(t\sqrt{h(X, X)/2}\bigr)$ for all $t \in \mathbb{R}$ and $X \in L$;
   - every nonzero $X \in L$ has a minimal positive return period $T > 0$ with $\exp(tX) = 1 \iff t \in T\mathbb{Z}$ and $h(X, X) = \frac{2\pi^2}{T^2}$;
   - the centralizer of any nonzero element is one-dimensional, forcing $\dim_{\mathbb{R}} L \in \{0, 1, 3\}$; when $\dim_{\mathbb{R}} L = 3$, there exist an $h$-orthonormal basis $b_0, b_1, b_2$ and $\mu > 0$ with $[b_0, b_1] = \mu b_2$ (and cyclic permutations).

2. **Square-root-free six-axis rational cover of $S^2$** ([`rational_six_axis_open_cover`](lean:D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover)): take the six integer axes of squared norm $5$ in $\mathbb{R}^3$,

   $$
   \mathrm{axis}_i \in \bigl\{(1, \pm 2, 0),\; (0, 1, \pm 2),\; (\pm 2, 0, 1)\bigr\},
   $$

   and define the six purely rational inequality caps $U_i := \bigl\{x \in S^2 : 2\langle x, \mathrm{axis}_i\rangle^2 > 5\bigr\}$. Each $U_i$ is relatively open in $S^2$, contains no pair of orthogonal unit vectors, and together the six caps cover the entire unit two-sphere: $S^2 = \bigcup_{i=1}^6 U_i$.
:::

::: {.proof}
For part 1, fix nonzero $X \in L$ and put $p(t) := 2\varphi(\exp tX) - 1$. Faithfulness, local injectivity of $\exp$, and $p(2t) = 2p(t)^2 - 1$ produce a minimal positive period $T > 0$ and $p(t) = \cos(2\pi t/T)$. Complexifying the left-multiplication trace form $B(X, Y) = -\operatorname{Re}\operatorname{tr}(\rho(X)\rho(Y))$ locks a uniform normalized period $T_0$ across the punctured tangent space, so $h := 2(\pi/T_0)^2 B$ gives the $\operatorname{ad}$-invariant metric, one-dimensional centralizers, and $\dim_{\mathbb{R}} L \in \{0, 1, 3\}$. For part 2, strict quadratic inequalities define relatively open caps; if $x \perp y$ on $S^2$, Bessel's inequality gives $\langle x, \mathrm{axis}_i\rangle^2 + \langle y, \mathrm{axis}_i\rangle^2 \le \lVert\mathrm{axis}_i\rVert^2 = 5$, preventing both $2\langle x, \mathrm{axis}_i\rangle^2$ and $2\langle y, \mathrm{axis}_i\rangle^2$ from exceeding $5$; choosing constructive signs in the three cyclic axis pairs ensures at least one axis satisfies $2\langle x, \mathrm{axis}_i\rangle^2 > 5$ for every $x \in S^2$. The full proof is checked by the Lean kernel.
:::

The short film below runs through the chapter's four transcendental-free mechanisms in order, from the one-division Cayley bridge and the dual-chart half floor to the square-root-free adjoint action and Chebyshev beats, and ends where $\pi$ actually enters.

::: {.film src="rotation-without-exponentials"}
**One division, two charts, a square-root-free adjoint and Chebyshev beats: rotation in exact fractions throughout (DUREN).** The cyan Cayley orbit turns $(0, 0, 1)$ twelve times and stops at $(302680, -302680, -314959)/3^{12}$ with squared length exactly $1$, while the magenta second-order Taylor spiral multiplies the squared length by $\frac{17}{16}$ per step and passes $2.069$ after twelve steps (computed on screen; see [@ex-ch05-cayley-vs-taylor]); the green label is part 4 of [@thm-ch05-rational-cayley-core]. The share bars show the normalized dual-chart denominators: for the inputs $(1, 0, 0)$ and $(\frac{1}{2}, \frac{1}{2}, 0)$ the $D_+$ share is only $\frac{1}{6}$, the shadow chart takes over, and the result $(-\frac{1}{5}, 0, -\frac{2}{5})$ lies in the closed unit ball (computed on screen); the green half-floor label is part 3 of [@thm-ch05-dual-chart-singularity-free]. The adjoint matrix of $p_{\mathrm{Half}} = (1, 1, 0, 0)$ cancels its denominator $2$ into an integer $90^\circ$ turn (computed on screen; see [@ex-ch05-phalf-integer-rotation]); the green label is part 1 of [@thm-ch05-rational-adjoint-action]. The beats on the unit circle step by $x_{n+1} = \frac{6}{5}x_n - x_{n-1}$ with overlaps $T_n(\frac{3}{5})$, and beat twenty still has squared norm $1$ over $5^{20}$ (computed on screen; see [@ex-ch05-rational-harmonic-stepping]); the two green labels are [@thm-ch05-spinor-heap-norm-preserved] and, on the classical real side, [@thm-ch05-chebyshev-heap-recurrence]. In the last scene the continuous-ray formulas and the six caps on the wireframe sphere are the classical real-shadow [@thm-ch05-continuous-ray-and-six-axis]; the amber cap and the score $8 > 5$ of the point $(2, 2, 1)/3$ are computed on screen, the cosine curve is schematic, and the violet box "$\pi$ is the price of a real clock" is the reading of [@rem-ch05-where-pi-enters].
:::

Before moving on to Chapter 6, compare all three transcendental-free rotation mechanisms side by side in the interactive card below: tune the rational generator $\boldsymbol{\sigma}$ and iteration count to watch exact $\mathbf{R}(\boldsymbol{\sigma})$ and the square-root-free integer adjoint action $\operatorname{Ad}(p_{\mathrm{Half}})$ hold unit squared norm $1/1$ at every step while the second-order Taylor truncation $T_2(X)$ spirals outward off the sphere, and reuse the same coordinates as rational MRP inputs to inspect the dual-chart composition floor $\max(D_+, D_-) \ge \frac{1}{2}$ keeping the MRP product singularity-free inside the closed unit ball.

::: {.viz src="ternion-cayley-lab" preset="cayley3d-vs-taylor-drift" height="520"}
**Interactive comparison of exact rational Cayley $\mathbf{R}(\boldsymbol{\sigma})$ and $\operatorname{Ad}(p_{\mathrm{Half}})$ against Taylor drift, with dual-chart $\max(D_+, D_-) \ge \frac{1}{2}$ inspection.** Step through iterated rotations to contrast exact rational unit-norm locking with second-order Taylor inflation $T_2(X)$, inspect the integer $90^\circ$ adjoint matrix of non-square-norm `pHalf = (1, 1, 0, 0)`, and watch dual-chart switching enforce $\max(D_+, D_-) \ge \frac{1}{2}$ for rational MRP inputs; the proofs are in [@thm-ch05-rational-cayley-core] and [@thm-ch05-rational-adjoint-action], with dual-chart bounds and worked examples in [@def-ch05-dual-chart-star], [@ex-ch05-cayley-vs-taylor], and [@ex-ch05-phalf-integer-rotation].
:::

::: {.remark #rem-ch05-where-pi-enters title="Where Pi Actually Enters, and Transition to Rational Spherical Trigonometry"}
Part 1 of [@thm-ch05-continuous-ray-and-six-axis] delivers the sharpest possible diagnostic for transcendental-free mathematics: neither the duplication law $\varphi(g^2) = (2\varphi(g) - 1)^2$, nor the rational Cayley and singularity-free dual-chart rotations ([@thm-ch05-rational-cayley-core], [@thm-ch05-dual-chart-singularity-free]), nor the square-root-free adjoint action ([@thm-ch05-rational-adjoint-action]), nor the signed spinor heap recurrence ([@thm-ch05-spinor-heap-norm-preserved]) contains $\pi$; the constant $\pi$ enters only when one abandons the native heap and stretches a curved circle onto a flat real tangent line $t \mapsto \exp(tX)$, forcing the period normalization $h(X, X) = 2\pi^2/T^2$. Meanwhile, part 2 shows that even global spherical open covers require nothing beyond the integer inequality $2\langle x, \mathrm{axis}_i\rangle^2 > 5$ on six norm-$5$ axes. Continuing this complete elimination of transcendental trigonometry, [Chapter 6](ch06-bargmann-gram-spherical-trigonometry.md) establishes the capstone law of Volume II: **the Fundamental Theorem of Rational Spherical Trigonometry (the Bargmann–Gram Closure Law)**.
:::
