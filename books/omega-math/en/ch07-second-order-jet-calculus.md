# Chapter 7 Second-Order Nilpotent Jets and Limit-Free Calculus

> *Past, present, future; zeroth derivative, first derivative, second derivative; $0$, $1/2$, $1$.*

More than three centuries ago, when Newton and Leibniz founded classical calculus, computing an instantaneous slope required treating a step size $h$ as nonzero while dividing by it, and then setting $h = 0$ once the algebra simplified. In 1734 Bishop Berkeley famously mocked these neither-zero-nor-nonzero infinitesimals as "ghosts of departed quantities." Nineteenth-century analysis patched the logical rift with Cauchy and Weierstrass's $\epsilon\text{-}\delta$ limit $\lim_{h \to 0}$, but only at the cost of tethering the whole edifice of differentiation to the uncountable real continuum $\mathbb{R}$ and infinite limit sequences.

Having built the homogeneous rational projective circle and the origin-free rational ternion sphere $\mathbb{T}_3(\mathbb{Q})$ in Volumes I and II, we now take the decisive step: **calculus does not require approaching zero along an open line; it extracts state, connection, and curvature simultaneously inside a finite-order nilpotent algebra.** Guided by the `{0 · 1/2 · 1}` second-order completeness principle, this chapter introduces the second-order rational jet ring $\mathcal{J}_2(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^3)$, certifies its cubic nilpotency, closed-form two-term rational inverse, and first- and second-order chain rules in the zero-axiom kernel, constructs a sphere-preserving rational arc microstep for three-tier causal readout, certifies the exact derivative, curvature, and finite secant discrepancy of the fidelity kernel $\kappa(x) = \frac{1}{1+x^2}$ at every rational point without limits, and certifies inside the zero-axiom kernel the exact $\alpha$-sampling norm-drift law for arbitrary rational weights, strict unit-sphere conservation at the symmetric midpoint $\alpha = \frac{1}{2}$, and equal projective fidelity across the two half-steps of the midpoint triad, eliminating left-endpoint Itô tangent derailment at its algebraic root.

## 7.1 The Second-Order Nilpotent Jet Ring and Closed-Form Rational Inversion {#sec-ch07-jet2-ring}

To differentiate purely over $\mathbb{Q}$ without taking limits, we replace the limiting real step $h \to 0$ with a single formal algebraic step element $\eta$. Unlike the first-order dual-number ring $\mathbb{Q}[\varepsilon]/(\varepsilon^2)$, which captures only linear slope, spherical geometry lives in the second-order sagitta and curvature encoded by $\eta^2$; meanwhile, at third order, the antisymmetric covariant exterior derivative of gauge curvature closes identically via the Bianchi identity $DF \equiv 0$. We therefore impose the exact nilpotency relation $\eta^3 \equiv 0$.

::: {.definition #def-ch07-jet2-ring title="Second-order nilpotent rational jet ring"}
The **second-order nilpotent rational jet ring** is the commutative Artinian quotient ring of rational polynomials modulo the cubic ideal $(\eta^3)$:

$$
\mathcal{J}_2(\mathbb{Q}) := \mathbb{Q}[\eta]/(\eta^3) = \bigl\{\, a_0 + a_1\eta + a_2\eta^2 \mid a_0, a_1, a_2 \in \mathbb{Q} \,\bigr\}, \qquad \eta^3 \equiv 0.
$$

Writing each element as an ordered rational triple $a = (a_0, a_1, a_2)$, addition is componentwise and multiplication is the truncated Cauchy product

$$
(a_0, a_1, a_2) \cdot (b_0, b_1, b_2) = \bigl(a_0 b_0,\; a_0 b_1 + a_1 b_0,\; a_0 b_2 + a_1 b_1 + a_2 b_0\bigr).
$$

Its three components are respectively the **order-$0$ base value**, the **order-$1$ connection derivative**, and the **order-$2$ curvature Taylor coefficient** (matching $f_0$, $f'_0$, and $\frac{1}{2}f''_0$ in classical notation, so the first-derivative readout is $a' := a_1$ and the second-derivative readout is $a'' := 2a_2$).
:::

In classical real analysis, differentiating a quotient relies on continuity to keep the denominator nonzero on a neighborhood and invokes infinite geometric series. Inside $\mathcal{J}_2(\mathbb{Q})$, whenever the constant term $a_0$ is finite and nonzero, inversion requires no limit or convergence radius and **terminates exactly at order $2$**.

### 7.1.1 Finite Two-Term Rational Inversion and the Algebraic Chain Rule {#sec-ch07-jet2-inverse-chain}

Let $a = a_0 + a_1\eta + a_2\eta^2 \in \mathcal{J}_2(\mathbb{Q})$ with $a_0 \in \mathbb{Q}^\times$. Factor out $a_0$ and set the nilpotent increment $u := \frac{a_1}{a_0}\eta + \frac{a_2}{a_0}\eta^2$. Because the lowest power of $\eta$ in $u$ is $\eta^1$, we obtain immediately

$$
u^2 = \frac{a_1^2}{a_0^2}\eta^2 \pmod{\eta^3}, \qquad u^3 \equiv 0 \pmod{\eta^3}.
$$

Applying the finite polynomial identity $(1 + u)(1 - u + u^2) = 1 + u^3 \equiv 1 \pmod{\eta^3}$ and multiplying by $a_0^{-1}$ yields the **closed-form rational inverse in $\mathcal{J}_2(\mathbb{Q})$**:

$$
(a_0 + a_1\eta + a_2\eta^2)^{-1} \;=\; \frac{1}{a_0} \;-\; \frac{a_1}{a_0^2}\eta \;+\; \frac{a_1^2 - a_0 a_2}{a_0^3}\eta^2 \pmod{\eta^3}.
$$

Direct multiplication confirms every grade: the $\eta^0$ term is $a_0 \cdot \frac{1}{a_0} = 1$; the $\eta^1$ term is $a_0\bigl(-\frac{a_1}{a_0^2}\bigr) + a_1\bigl(\frac{1}{a_0}\bigr) = 0$; and the $\eta^2$ term is $a_0\bigl(\frac{a_1^2 - a_0 a_2}{a_0^3}\bigr) + a_1\bigl(-\frac{a_1}{a_0^2}\bigr) + a_2\bigl(\frac{1}{a_0}\bigr) = 0$. Conversely, if $a_0 = 0$, every product with $a$ has constant term $0 \neq 1$; hence $a$ is a unit in $\mathcal{J}_2(\mathbb{Q})$ if and only if $a_0 \neq 0$.

This finite inversion law turns evaluation of any rational function $f(x) = P(x)/Q(x) \in \mathbb{Q}(x)$ (at any rational point $x_0$ with $Q(x_0) \neq 0$) into a pure finite ring operation $f(x_0 + \eta) = f_0 + f_1\eta + f_2\eta^2 \in \mathcal{J}_2(\mathbb{Q})$. While the sum, product, and quotient rules follow immediately from the ring operations and finite inversion (manual derivation), the three algebraic pillars of $\mathcal{J}_2(\mathbb{Q})$—cubic nilpotency of $\eta$, closed-form finite inversion, and the first- and second-order chain rules at zero inner shift—are frozen with zero axioms in `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch07-jet2-algebra-and-chain title="Second-order jet nilpotency, finite inversion, and zero-shift chain rule" lean="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.var_cube D5/S3/Quantum/AURICOmega/OmegaJetCalculus.mul_inv D5/S3/Quantum/AURICOmega/OmegaJetCalculus.chain_rule"}
On the zero-axiom carrier `Omega.Jet2` (ordered triples $a = \langle a.j_0, a.j_1, a.j_2\rangle \in \mathrm{IntRatio}^3$ compared componentwise by `Jet2.Equivalent`, with formal increment $\eta := \mathrm{var} = \langle 0, 1, 0\rangle$, unit $1 := \langle 1, 0, 0\rangle$, zero $0 := \langle 0, 0, 0\rangle$, derivative readouts $f' := f.\mathrm{first} = f.j_1$ and $f'' := f.\mathrm{second} = 2 f.j_2$, and truncated composition $(g \circ f) := g.j_0 + g.j_1 f + g.j_2 f^2$), the following three zero-axiom laws hold:

1. **Cubic nilpotency of the formal increment** ([`var_cube`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.var_cube)):

   $$
   (\eta \cdot \eta) \cdot \eta \;\equiv\; 0.
   $$

2. **Closed-form finite inversion** ([`mul_inv`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.mul_inv)): for any $a \in \mathrm{Jet2}$ whose constant coefficient is invertible ($a.j_0.\mathrm{Unit}$, finite and nonzero) and whose higher coefficients are finite ($a.j_1.\mathrm{Finite}$, $a.j_2.\mathrm{Finite}$), the closed-form inverse $a.\mathrm{inv} = \langle r, -r u, r(u^2 - v)\rangle$ (with $r = a.j_0^{-1}$, $u = a.j_1 r$, $v = a.j_2 r$) satisfies

   $$
   a \cdot a.\mathrm{inv} \;\equiv\; 1.
   $$

3. **First- and second-order chain rules at zero shift** ([`chain_rule`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.chain_rule)): for any $g, f \in \mathrm{Jet2}$ with finite $g.j_1$ and $g.j_2$, all three coefficients of $f$ finite ($f.\mathrm{Finite}$), and zero constant shift ($f.j_0 \equiv 0$), the derivative readouts of $(g \circ f)$ satisfy under `IntRatio.Equivalent`

   $$
   (g \circ f)' \;\equiv\; g' \cdot f', \qquad (g \circ f)'' \;\equiv\; g'' \cdot (f')^2 + g' \cdot f''.
   $$
:::

::: {.proof}
For part 1, direct truncated multiplication yields $\eta^2 = \langle 0, 0, 1\rangle$ and $\eta^2 \cdot \eta = \langle 0, 0, 0\rangle$. For part 2, expanding $a \cdot a.\mathrm{inv}$ componentwise gives $a_0 r \equiv 1$ at order $0$, $a_0(-ru) + a_1 r \equiv -u + u \equiv 0$ at order $1$, and $a_0 r(u^2 - v) + a_1(-ru) + a_2 r \equiv (u^2 - v) - u^2 + v \equiv 0$ at order $2$, with the finiteness hypotheses preventing undefined denominators during cancellation. For part 3, substituting $f_0 \equiv 0$ into $g_0 + g_1 f + g_2 f^2$ extracts linear coefficient $g_1 f_1$ and quadratic coefficient $g_1 f_2 + g_2 f_1^2$; doubling the quadratic coefficient gives $2 g_2 f_1^2 + g_1(2 f_2) = g'' (f')^2 + g' f''$ in one algebraic step, free of any case split over vanishing inner increments. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch07-bianchi-nilpotency title="Why nilpotency closes at order two rather than order one or infinity"}
**Literature context and structural boundary.** Abolishing limits through nilpotent infinitesimals echoes synthetic differential geometry (F. W. Lawvere; A. Kock, *Synthetic Differential Geometry*, 1981) and forward-mode automatic differentiation over the dual-number ring $D_1 = \mathbb{Q}[\varepsilon]/(\varepsilon^2)$ (R. E. Wengert, 1964; literature result). However, imposing $\varepsilon^2 \equiv 0$ annihilates spherical sagitta, angular excess, and gauge curvature. Conversely, at third order, the antisymmetric covariant exterior derivative of curvature vanishes identically via the differential Bianchi identity $DF = dF + [A \wedge F] \equiv 0$ (L. Bianchi, 1902), while Ostrogradsky's theorem (M. Ostrogradsky, 1850) proves that non-degenerate higher-derivative Lagrangians lack a Hamiltonian lower bound (literature result). Setting $\eta^3 \equiv 0$ hits the exact algebraic sweet spot: full curvature survives while redundant higher-order divergence closes cleanly.
:::

## 7.2 Causal Three-Tier Synchronous Readout Along a Rational Arc Microstep {#sec-ch07-causal-readout}

In flat Euclidean coordinates one steps by addition, $x_0 + \eta v$. On the rational unit ternion sphere $\mathbb{T}_3(\mathbb{Q}) = S^3(\mathbb{Q}) \subset \mathbb{H}(\mathbb{Q})$ established in [Chapter 3](ch03-canonical-ternion-manifold.md) and [Chapter 5](ch05-rational-cayley-rotations.md), however, a bare first-order tangent step $\mathbf{x}_0(1 + \eta\mathbf{v})$ has squared norm $1 + \eta^2\lVert\mathbf{v}\rVert^2 \not\equiv 1 \pmod{\eta^3}$ and already leaves the sphere at second order. To remain faithfully on the sphere inside $\mathcal{J}_2(\mathbb{Q})$, the step must incorporate the inward second-order sagitta pullback $-\frac{1}{2}\eta^2\lVert\mathbf{v}\rVert^2$.

::: {.definition #def-ch07-arc-microstep title="Second-order rational arc microstep and causal three-tier readout"}
Let $\mathbf{x}_0 \in S^3(\mathbb{Q})$ be a rational unit ternion ($\mathbf{x}_0 \bar{\mathbf{x}}_0 = 1$) and let $\mathbf{v} \in \operatorname{Im}\mathbb{H}(\mathbb{Q})$ be a pure-imaginary rational tangent vector ($\bar{\mathbf{v}} = -\mathbf{v}$, so $\mathbf{v}^2 = -\lVert\mathbf{v}\rVert^2 \in \mathbb{Q}_{\le 0}$). The **second-order rational arc microstep** along $\mathbf{v}$ is the $\mathcal{J}_2(\mathbb{Q})$-valued quaternion

$$
\mathbf{x}(\eta) \;:=\; \mathbf{x}_0 \cdot \left(1 + \eta\mathbf{v} - \frac{1}{2}\eta^2\lVert\mathbf{v}\rVert^2\right) \;\in\; \mathbb{H}\bigl(\mathcal{J}_2(\mathbb{Q})\bigr).
$$

For any rational observable $F$ regular at $\mathbf{x}_0$, evaluating $F$ directly at $\mathbf{x}(\eta)$ inside $\mathcal{J}_2(\mathbb{Q})$ yields the **causal three-tier synchronous readout**

$$
F\bigl(\mathbf{x}(\eta)\bigr) \;\equiv\; F_0 \;+\; (D_{\mathbf{v}} F)\,\eta \;+\; \left(\frac{1}{2} D_{\mathbf{v}}^2 F\right)\eta^2 \pmod{\eta^3}.
$$
:::

Two exact algebraic properties follow immediately (manual derivation):

1. **Exact unit-sphere invariance modulo $\eta^3$**: Setting $s(\eta) := 1 - \frac{1}{2}\eta^2\lVert\mathbf{v}\rVert^2$ and using $\mathbf{v}^2 = -\lVert\mathbf{v}\rVert^2$, we compute

   $$
   \mathbf{x}(\eta)\overline{\mathbf{x}(\eta)} = \mathbf{x}_0\bigl(s(\eta) + \eta\mathbf{v}\bigr)\bigl(s(\eta) - \eta\mathbf{v}\bigr)\bar{\mathbf{x}}_0 = \mathbf{x}_0\bigl(s(\eta)^2 - \eta^2\mathbf{v}^2\bigr)\bar{\mathbf{x}}_0 \equiv 1 - \eta^2\lVert\mathbf{v}\rVert^2 + \eta^2\lVert\mathbf{v}\rVert^2 = 1 \pmod{\eta^3}.
   $$

2. **Exact second-order agreement with the rational Cayley microstep**: Applying the rational Cayley map of [Chapter 5](ch05-rational-cayley-rotations.md) to the half-parameter $\frac{1}{2}\eta\mathbf{v}$ and inverting via [@def-ch07-jet2-ring], $\bigl(1 - \frac{1}{2}\eta\mathbf{v}\bigr)^{-1} \equiv 1 + \frac{1}{2}\eta\mathbf{v} + \frac{1}{4}\eta^2\mathbf{v}^2 \pmod{\eta^3}$, we obtain

   $$
   \left(1 + \frac{1}{2}\eta\mathbf{v}\right)\left(1 - \frac{1}{2}\eta\mathbf{v}\right)^{-1} \;\equiv\; 1 + \eta\mathbf{v} + \frac{1}{2}\eta^2\mathbf{v}^2 \;=\; 1 + \eta\mathbf{v} - \frac{1}{2}\eta^2\lVert\mathbf{v}\rVert^2 \pmod{\eta^3}.
   $$

Thus the rational arc microstep is not a borrowed Taylor truncation of $\exp(\eta\mathbf{v})$: it is the native image of the rational Cayley rotor inside $\mathcal{J}_2(\mathbb{Q})$. Aligning the three jet grades with the `{0 · 1/2 · 1}` causal triad produces the core matrix of Volume III (`MODEL` causal reading paired with exact algebraic readout):

| Causal anchor | Jet order and basis | Temporal phase | Synchronous readout along $\mathbf{x}(\eta)$ | Geometric and dynamical role |
| :---: | :---: | :---: | :---: | :--- |
| **`0`** | $\eta^0$ (jet $J^0$) | Past (halted anchor) | $F_0 = F(\mathbf{x}_0)$ | Idempotent base state, zero rate freedom |
| **`1/2`** | $\eta^1$ (jet $J^1$) | Present (self-dual slice) | $D_{\mathbf{v}} F$ | Connection derivative and first-order flow |
| **`1`** | $\eta^2$ (jet $J^2$) | Future (curvature closure) | $\frac{1}{2} D_{\mathbf{v}}^2 F$ | Geodesic curvature, sagitta, and field refraction |

A single finite substitution over $\mathbb{Q}$ delivers past value, present connection velocity, and future curvature acceleration in one synchronous triple, with no nested limiting procedures.

## 7.3 Limit-Free Derivative of Fidelity and Finite Secant Discrepancy {#sec-ch07-fidelity-derivation}

We now differentiate the fundamental projective fidelity kernel $\kappa(x) = \frac{1}{1 + x^2}$ directly inside $\mathcal{J}_2(\mathbb{Q})$ at every rational point, without taking a single limit.

Fix any rational point $x_0 \in \mathbb{Q}$ and set the strictly positive rational denominator $D := 1 + x_0^2 \ge 1$. Substituting $x_0 + \eta$ expands the denominator in one line:

$$
1 + (x_0 + \eta)^2 \;=\; D + 2x_0\eta + \eta^2 \;=\; D\left(1 + \frac{2x_0}{D}\eta + \frac{1}{D}\eta^2\right).
$$

Applying the closed-form rational inverse of Section 7.1.1 with $a_0 = D$, $a_1 = 2x_0$, and $a_2 = 1$ gives $a_1^2 - a_0 a_2 = 4x_0^2 - (1 + x_0^2) = 3x_0^2 - 1$, immediately producing the exact jet triple at **every rational $x_0 \in \mathbb{Q}$**:

$$
\kappa(x_0 + \eta) \;\equiv\; \frac{1}{1 + x_0^2} \;-\; \frac{2x_0}{(1 + x_0^2)^2}\eta \;+\; \frac{3x_0^2 - 1}{(1 + x_0^2)^3}\eta^2 \pmod{\eta^3}.
$$

In particular, at the self-dual present anchor **$x_0 = 1$** ($D = 2$, $u = \eta + \frac{1}{2}\eta^2$, $u^2 \equiv \eta^2$), three elementary fraction operations yield the exact triple **`{1/2, -1/2, +1/4}`**:

$$
\kappa(1 + \eta) \;=\; \frac{1}{2}\left[1 - \left(\eta + \frac{1}{2}\eta^2\right) + \eta^2\right] \;=\; \frac{1}{2} - \frac{1}{2}\eta + \frac{1}{4}\eta^2 \pmod{\eta^3},
$$

fixing $\kappa(1) = \frac{1}{2}$, $\kappa'(1) = -\frac{1}{2}$, and $\kappa''(1) = +\frac{1}{2}$. By contrast, subtracting the exact first derivative $\kappa'(x_0)$ from the classical finite-difference secant slope $\frac{\kappa(x_0 + h) - \kappa(x_0)}{h}$ and clearing the common factor $h$ yields an exact rational discrepancy formula for every finite point and invertible step. All three identities—the global fidelity jet, the self-dual triple `{1/2, -1/2, +1/4}`, and the exact finite secant discrepancy—are frozen with zero axioms in `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch07-fidelity-jet-and-secant title="Exact fidelity jet, self-dual anchor triple, and finite secant discrepancy" lean="D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_secant_discrepancy"}
In `Omega.Jet2`, for any $x \in \mathrm{IntRatio}$ define $\operatorname{fidelityDen}(x) := 1 + x^2$, $\kappa(x) := \operatorname{fidelityDen}(x)^{-1}$, $\operatorname{fidelityDenJet}(x) := \langle 1 + x^2,\; 2x,\; 1\rangle$, and $\operatorname{kappaJetAt}(x) := \operatorname{fidelityDenJet}(x).\mathrm{inv}$. The following three zero-axiom laws hold:

1. **Global exact fidelity jet** ([`kappa_jet`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet)): for every $x \in \mathrm{IntRatio}$, under `Jet2.Equivalent`,

   $$
   \operatorname{kappaJetAt}(x) \;\equiv\; \left\langle \kappa(x),\;\; (-2x)\cdot\bigl((1 + x^2)^2\bigr)^{-1},\;\; (3x^2 - 1)\cdot\bigl((1 + x^2)^3\bigr)^{-1}\right\rangle.
   $$

2. **Self-dual equatorial anchor triple** ([`kappa_jet_one`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one)): at $x = 1$, under `Jet2.Equivalent`,

   $$
   \operatorname{kappaJetAt}(1) \;\equiv\; \left\langle \frac{1}{2},\;\; -\frac{1}{2},\;\; \frac{1}{4}\right\rangle.
   $$

3. **Exact finite secant discrepancy** ([`kappa_secant_discrepancy`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_secant_discrepancy)): for every finite $x$ ($x.\mathrm{Finite}$) and invertible step $h$ ($h.\mathrm{Unit}$, finite and nonzero), the difference between the secant slope and the linear jet derivative $\operatorname{kappaJetAt}(x).\mathrm{first}$ satisfies under `IntRatio.Equivalent`

   $$
   \bigl(\kappa(x + h) - \kappa(x)\bigr)\cdot h^{-1} - \operatorname{kappaJetAt}(x).\mathrm{first} \;\equiv\; h\bigl(3x^2 + 2xh - 1\bigr)\cdot\Bigl((1 + x^2)^2\bigl(1 + (x + h)^2\bigr)\Bigr)^{-1}.
   $$
:::

::: {.proof}
For part 1, when $x$ is undefined both sides are componentwise undefined and hence equivalent; when $x$ is finite, $1 + x^2$ is strictly positive and invertible, so substituting $a_0 = 1 + x^2$, $a_1 = 2x$, and $a_2 = 1$ into the closed-form inverse and reducing $(2x)^2 - (1 + x^2) = 3x^2 - 1$ yields all three coefficients. Part 2 evaluates the closed form at $x = 1$ directly. For part 3, writing $D_0 = 1 + x^2$ and $D_1 = 1 + (x + h)^2$, we factor $\kappa(x + h) - \kappa(x) \equiv -h(2x + h)(D_0 D_1)^{-1}$, cancel $h$ against $h^{-1}$, subtract $-2x D_0^{-2}$ over the common denominator $D_0^2 D_1$, and simplify $2x D_1 - (2x + h) D_0 = h(3x^2 + 2xh - 1)$. The full proof is checked by the Lean kernel.
:::

Part 3 of [@thm-ch07-fidelity-jet-and-secant] exposes every pathology of secant chords. Throughout the convex positive region $x_0 > 0$, $h > 0$, and $3x_0^2 \ge 1$ (including $x_0 = 1$), the discrepancy $E(x_0, h) := \frac{\kappa(x_0 + h) - \kappa(x_0)}{h} - \kappa'(x_0)$ is strictly positive: at $x_0 = 1$ with step $h = \frac{1}{4}$, the secant slope is $-\frac{18}{41}$, overshooting the true derivative $-\frac{1}{2}$ by the exact rational bias $\frac{5}{82} \approx 0.060976$. Even on the zero-bias hyperbola $3x_0^2 + 2x_0 h = 1$ (for instance $(x_0, h) = (\frac{1}{2}, \frac{1}{4})$ or $(\frac{1}{3}, 1)$), vanishing first-order bias is merely an accidental cancellation from straddling an inflection point $c = \pm 1/\sqrt{3}$, and the chord still misses the true second-order curvature $\frac{3x_0^2 - 1}{(1+x_0^2)^3}$.

::: {.figure src="ch07-jet2-midpoint"}
**The second-order jet and midpoint step.** The violet parabola on the left gives the jet, and the magenta secant to $x=3/2$ has slope $-5/13$. On the quadratic arc on the right, the violet midpoint step reaches the endpoint and the magenta left-endpoint step leaves a vertical gap.
:::

::: {.example #ex-ch07-fidelity-jet-table title="Worked jet triples at four rational anchors and secant discrepancy audit"}
Instantiating [@thm-ch07-fidelity-jet-and-secant] at four reference points yields the exact rational jet triples of $\kappa(x) = \frac{1}{1+x^2}$ in $\mathcal{J}_2(\mathbb{Q})$ below (with $x_0 = 1$ directly certified by [`kappa_jet_one`](lean:D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one) and the remaining anchor and step evaluations computed directly from the closed formulas):

| Anchor $x_0$ | Value $\kappa(x_0)$ | First derivative $\kappa'(x_0)$ | Quadratic term $\frac{1}{2}\kappa''(x_0)$ | Geometric position |
| :---: | :---: | :---: | :---: | :--- |
| $0$ | $1$ | $0$ | $-1$ | Past pole (maximum crest, negative curvature) |
| $1/2$ | $4/5$ | $-16/25$ | $-16/125$ | Left of inflection (concave downward) |
| $1$ | $1/2$ | $-1/2$ | $+1/4$ | Present self-dual equator (`{1/2, -1/2, +1/4}`) |
| $2$ | $1/5$ | $-4/25$ | $+11/125$ | Far convex tail (positive curvature) |

Auditing four finite step pairs $(x_0, h)$ for $E(x_0, h)$:

1. $(x_0, h) = (1, \frac{1}{4})$: secant slope $-\frac{18}{41}$, exact positive discrepancy $E(1, \frac{1}{4}) = +\frac{5}{82} \approx +0.060976$;
2. $(x_0, h) = (\frac{1}{2}, \frac{1}{4})$: since $3(\frac{1}{2})^2 + 2(\frac{1}{2})(\frac{1}{4}) - 1 = 0$, inflection straddling gives $E(\frac{1}{2}, \frac{1}{4}) = 0$, yet the single secant cannot detect the curvature $-\frac{16}{125}$;
3. $(x_0, h) = (\frac{1}{3}, 1)$: likewise lies on the zero-bias hyperbola $3x_0^2 + 2x_0 h = 1$, giving $E(\frac{1}{3}, 1) = 0$;
4. $(x_0, h) = (-1, 2)$: crossing the crest from the negative side yields $E(-1, 2) = -\frac{1}{2}$, demonstrating that the condition $x_0 > 0$ cannot be dropped from the positive-bias criterion.
:::

## 7.4 Midpoint Chain Conservation and Elimination of Itô Derailment {#sec-ch07-midpoint-conservation}

Once $\mathcal{J}_2(\mathbb{Q})$ captures infinitesimal curvature cleanly, we face the corresponding macroscopic question for a discrete transition $\mathbf{x}_0 \to \mathbf{x}_1$ on $S^3(\mathbb{Q})$: at which point along the step must the connection generator be evaluated so that the trajectory neither flies off the sphere nor breaks the ordinary chain rule? Once again, the unique answer is the self-dual midpoint **`1/2`**.

The cited D5 declarations record `strict_omega.axioms: []`. Rational quaternions are represented on the carrier `RationalQuaternion` by an integer numerator `num : Quaternion` over a common positive denominator `den = denPred.succ`, with squared norm `normSq` in `Omega.IntRatio` and unit predicate `IsUnit` meaning $\lVert x\rVert^2 \equiv 1$. Let $a \in \mathrm{RationalQuaternion}$ be a pure-imaginary tangent generator ($a.\mathrm{num}.w = 0$, so $\langle a.\mathrm{num}\cdot v,\, v\rangle = 0$ for every quaternion $v$), and consider the $\alpha$-weighted implicit evolution equation for any finite rational sampling weight $\alpha \in \mathrm{IntRatio}$:

$$
(1 + \alpha a)\,x \;=\; \bigl(1 - (1 - \alpha)a\bigr)\,x_0 \quad \Longleftrightarrow \quad x - x_0 \;=\; -a\bigl((1 - \alpha)x_0 + \alpha x\bigr)
$$

(under the opposite-sign convention $A := -a$, this reads $(1 - \alpha A)\,x = \bigl(1 + (1 - \alpha)A\bigr)\,x_0$). Because $a$ is pure imaginary, clearing denominators produces a left integer quaternion factor representing $1 + \alpha a$ whose scalar part is strictly positive ($q\cdot a.\mathrm{den} > 0$), hence whose squared norm is strictly nonzero; multiplying by its conjugate and dividing by that squared norm yields an explicit rational step `alphaSample α a x₀` for every finite rational weight $\alpha$. The following zero-axiom theorem governs the squared-norm drift exactly for arbitrarily large steps and arbitrary finite rational weights:

::: {.theorem #thm-ch07-alpha-sampling-norm-drift title="Exact Spherical Norm-Drift Identity Under $\alpha$-Sampling" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.alpha_sampling_norm_drift"}
Let $\alpha \in \mathrm{IntRatio}$ be any finite rational sampling weight ($\alpha.\mathrm{Finite}$), let $a \in \mathrm{RationalQuaternion}$ be a pure-imaginary rational quaternion generator ($a.\mathrm{num}.w = 0$), and let $x_0 \in \mathrm{RationalQuaternion}$ be a unit initial quaternion ($x_0.\mathrm{IsUnit}$, i.e., $\lVert x_0\rVert^2 \equiv 1$). Setting $x := \operatorname{alphaSample}(\alpha, a, x_0)$ to be the explicit rational solution of $(1 + \alpha a)\,x = \bigl(1 - (1 - \alpha)a\bigr)\,x_0$, the squared-norm drift satisfies under `Omega.IntRatio.Equivalent`

$$
\lVert x\rVert^2 - 1 \;\equiv\; (1 - 2\alpha)\,\lVert x - x_0\rVert^2.
$$
:::

::: {.proof}
Write the finite weight $\alpha$ as a fraction $p/q$ with $q = \mathrm{den} > 0$. Since $a.\mathrm{num}.w = 0$, the cleared left factor $l := q\cdot a.\mathrm{den} + p\,a.\mathrm{num}$ has strictly positive scalar part $q\cdot a.\mathrm{den} > 0$, whence $\lVert l\rVert^2 > 0$ and $\bar{l} l = l\bar{l} = \lVert l\rVert^2$. Left-multiplying by $\bar{l}$ over the extra denominator $\lVert l\rVert^2$ therefore produces an explicit solution $x$ satisfying the cleared equation $l\cdot b = r\cdot c$, where $b := x_0.\mathrm{den}\cdot x.\mathrm{num}$, $c := x.\mathrm{den}\cdot x_0.\mathrm{num}$, and $r := q\cdot a.\mathrm{den} + (p - q)\,a.\mathrm{num}$. Rearranging gives $(q\cdot a.\mathrm{den})(b - c) + a.\mathrm{num}\cdot v = 0$ with $v := p b + (q - p)c$. Taking the integer dot product with $v$ and applying pure-imaginary orthogonality $\langle a.\mathrm{num}\cdot v,\, v\rangle = a.\mathrm{num}.w\lVert v\rVert^2 = 0$ cancels $q\cdot a.\mathrm{den} \neq 0$ to yield $\langle b - c,\, v\rangle = 0$. Substituting into the integer polarization identity

$$
q\bigl(\lVert b\rVert^2 - \lVert c\rVert^2\bigr) \;=\; (q - 2p)\lVert b - c\rVert^2 + 2\langle b - c,\, v\rangle
$$

yields $\lVert x\rVert^2 - \lVert x_0\rVert^2 \equiv (1 - 2\alpha)\lVert x - x_0\rVert^2$, and substituting the unit initial condition $\lVert x_0\rVert^2 \equiv 1$ closes the proof with zero axioms. The full proof is checked by the Lean kernel.
:::

By [@thm-ch07-alpha-sampling-norm-drift], for every non-stationary step ($x \neq x_0$), the sign of $1 - 2\alpha$ completely governs geometric fidelity:

1. **Left-endpoint Itô / explicit Euler sampling ($\alpha = 0$)**: $1 - 2\alpha = +1 > 0$, so every step inflates the squared norm to $\lVert x\rVert^2 \equiv 1 + \lVert x - x_0\rVert^2 > 1$, derailing outward along the flat tangent plane;
2. **Right-endpoint implicit Euler sampling ($\alpha = 1$)**: $1 - 2\alpha = -1 < 0$, so every step dissipates inward with $\lVert x\rVert^2 < 1$, collapsing toward the origin;
3. **Symmetric midpoint sampling ($\alpha = \frac{1}{2}$)**: the drift factor $1 - 2\alpha \equiv 0$ vanishes identically.

Denoting the $\alpha = \frac{1}{2}$ step by $\operatorname{midpointStep}(a, x_0) := \operatorname{alphaSample}(\frac{1}{2}, a, x_0)$, symmetric midpoint evaluation preserves the unit sphere unconditionally for every finite step size:

::: {.theorem #thm-ch07-midpoint-unit-norm title="Strict Unit-Sphere Conservation of the Symmetric Midpoint Step" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.midpoint_unit_norm"}
For every pure-imaginary rational quaternion generator $a \in \mathrm{RationalQuaternion}$ ($a.\mathrm{num}.w = 0$) and every unit rational quaternion $x_0 \in \mathrm{RationalQuaternion}$ ($x_0.\mathrm{IsUnit}$), the symmetric midpoint step $\operatorname{midpointStep}(a, x_0)$ strictly preserves unit norm ($\operatorname{midpointStep}(a, x_0).\mathrm{IsUnit}$), that is, under `Omega.IntRatio.Equivalent`,

$$
\lVert\operatorname{midpointStep}(a, x_0)\rVert^2 \;\equiv\; 1.
$$
:::

::: {.proof}
Instantiate [@thm-ch07-alpha-sampling-norm-drift] at $\alpha = \frac{1}{2}$. The weight factor $1 - 2\cdot\frac{1}{2}$ is equivalent to $0$ in `Omega.IntRatio`, while the squared displacement norm $\lVert\operatorname{midpointStep}(a, x_0) - x_0\rVert^2$ is finite; hence the right-hand side vanishes and $\lVert\operatorname{midpointStep}(a, x_0)\rVert^2 - 1 \equiv 0$. Adding $1$ to both sides recovers $\lVert\operatorname{midpointStep}(a, x_0)\rVert^2 \equiv 1$. The full proof is checked by the Lean kernel.
:::

Setting $a = -2\boldsymbol{\sigma}$ ($\boldsymbol{\sigma} \in \mathbb{Q}^3$, matching the opposite-sign generator $A = 2\boldsymbol{\sigma}$), the midpoint update $\mathbf{x}_{1/2} = (1 - \boldsymbol{\sigma})^{-1}(1 + \boldsymbol{\sigma})\mathbf{x}_0 = Q(\boldsymbol{\sigma})\mathbf{x}_0$ is literally the one-step rational Cayley rotor. Extending from $x_0$ through the midpoint numerator $h := (\operatorname{midpointStep}(a, x_0)).\mathrm{num}$ via the origin-free ternary heap reflection $[h, x_0.\mathrm{num}, h] = h\overline{x_0.\mathrm{num}}h$ of [Chapter 4](ch04-heaps-and-lie-triple-curvature.md) locks the two half-step projective fidelities identically inside the zero-axiom kernel:

::: {.theorem #thm-ch07-midpoint-half-step-fidelity title="Equal Projective Fidelity Across the Two Half-Steps of the Midpoint Triad" lean="D5/S3/Quantum/AURICOmega/OmegaSphericalHaarMidpoint.midpoint_half_step_fidelity"}
For every pure-imaginary rational quaternion generator $a \in \mathrm{RationalQuaternion}$ ($a.\mathrm{num}.w = 0$) and every unit rational quaternion $x_0 \in \mathrm{RationalQuaternion}$ ($x_0.\mathrm{IsUnit}$), set $h := (\operatorname{midpointStep}(a, x_0)).\mathrm{num}$. Then under the zero-axiom equivalence `Omega.IntRatio.Equivalent`, the projective ray fidelity `Ternion.kappa` between the initial numerator $x_0.\mathrm{num}$ and midpoint numerator $h$ equals that between $h$ and its ternary heap extrapolation $[h, x_0.\mathrm{num}, h]$ (`Ternion.triad h x₀.num h`):

$$
\kappa\bigl(x_0.\mathrm{num},\, h\bigr) \;\equiv\; \kappa\bigl(h,\, [h, x_0.\mathrm{num}, h]\bigr).
$$
:::

::: {.proof}
From $x_0.\mathrm{IsUnit}$ and [@thm-ch07-midpoint-unit-norm], both integer numerators $u := x_0.\mathrm{num}$ and $h := (\operatorname{midpointStep}(a, x_0)).\mathrm{num}$ are nonzero. Set the nonzero quaternion $p := \bar{u} h$ and positive integer $n := \lVert u\rVert^2 > 0$. By associativity and $u\bar{u} = n$, we obtain $u p = n h$ and $h p = h\bar{u}h = [h, u, h]$. Right-multiplication invariance and left-scaling invariance of `Ternion.kappa` then yield

$$
\kappa(u, h) \;\equiv\; \kappa(u p,\, h p) \;=\; \kappa\bigl(n h,\, [h, u, h]\bigr) \;\equiv\; \kappa\bigl(h,\, [h, u, h]\bigr)
$$

with zero axioms. The full proof is checked by the Lean kernel.
:::

When $a = -2\boldsymbol{\sigma}$ (manual derivation), both projective half-step fidelities evaluate to $\bigl(\frac{1-\lVert\boldsymbol{\sigma}\rVert^2}{1+\lVert\boldsymbol{\sigma}\rVert^2}\bigr)^2$, and under the signed spinor overlap $\kappa_{\mathrm{spin}}(u, v) = \frac{1 + \langle u, v\rangle}{2}$ both likewise equal $\frac{1}{1+\lVert\boldsymbol{\sigma}\rVert^2} \in \mathbb{Q} \cap (0, 1]$. Because the two symmetric half-arcs absorb the inward sagitta evenly into the curved step, evaluating discrete transitions at the symmetric midpoint eliminates left-endpoint Itô tangent derailment and preserves the algebraic chain rule on the curved sphere.

::: {.example #ex-ch07-midpoint-drift-audit title="Five-weight spherical drift audit and midpoint chain conservation"}
Take the unit base state $\mathbf{x}_0 = (1, 0, 0, 0)$ and the rational parameter $\boldsymbol{\sigma} = \bigl(\frac{1}{2}, \frac{1}{3}, \frac{1}{6}\bigr)$, so $\lVert\boldsymbol{\sigma}\rVert^2 = \frac{7}{18}$ and the opposite-sign generator $A = -a = 2\boldsymbol{\sigma} = \bigl(0, 1, \frac{2}{3}, \frac{1}{3}\bigr)$ satisfies $\lVert a\rVert^2 = \lVert A\rVert^2 = \frac{14}{9}$. Across five weights $\alpha$, [@thm-ch07-alpha-sampling-norm-drift] yields the exact squared norm $\lVert\mathbf{x}(\alpha)\rVert^2 = \frac{1 + (1-\alpha)^2\lVert a\rVert^2}{1 + \alpha^2\lVert a\rVert^2}$:

| Weight $\alpha$ | Squared norm $\lVert\mathbf{x}(\alpha)\rVert^2$ (exact) | Decimal | Drift $(1 - 2\alpha)\lVert\Delta\mathbf{x}\rVert^2$ | Geometric behavior |
| :---: | :---: | :---: | :---: | :--- |
| $0$ | $23/9$ | $2.555556$ | $+14/9$ | Severe outward Itô tangent derailment |
| $1/4$ | $135/79$ | $1.708861$ | $+56/79$ | Left-biased outward overshoot |
| $1/2$ | $1/1$ | $1.000000$ | $0$ | Symmetric midpoint Cayley step on sphere |
| $3/4$ | $79/135$ | $0.585185$ | $-56/135$ | Right-biased inward dissipation |
| $1$ | $9/23$ | $0.391304$ | $-14/23$ | Implicit right-endpoint collapse toward center |

Uniquely at $\alpha = \frac{1}{2}$ we obtain the exact rational unit ternion $\mathbf{x}_{1/2} = \bigl(\frac{11}{25}, \frac{18}{25}, \frac{12}{25}, \frac{6}{25}\bigr)$ ($\lVert\mathbf{x}_{1/2}\rVert^2 = 1$, instantiating [@thm-ch07-midpoint-unit-norm]) and full heap step $\mathbf{x}_1 = [\mathbf{x}_{1/2}, \mathbf{x}_0, \mathbf{x}_{1/2}] = \bigl(-\frac{383}{625}, \frac{396}{625}, \frac{264}{625}, \frac{132}{625}\bigr)$ ($\lVert\mathbf{x}_1\rVert^2 = 1$). Both half-steps conserve the exact projective fidelity $\frac{121}{625}$ (instantiating [@thm-ch07-midpoint-half-step-fidelity]) and identical signed spinor fidelity $\frac{18}{25} = \frac{1}{1 + 7/18}$, while the chord orthogonality $\langle \mathbf{x}_1 - \mathbf{x}_0, \mathbf{x}_0 + \mathbf{x}_1\rangle_{\mathbb{R}} = 0$ holds identically.
:::

::: {.remark #rem-ch07-ito-stratonovich-boundary title="Rational midpoint conservation versus continuous stochastic calculus"}
**Literature result and evidence boundary.** The $\alpha$-sampling norm-drift identity ([@thm-ch07-alpha-sampling-norm-drift]), strict unit-sphere conservation of the symmetric midpoint step ([@thm-ch07-midpoint-unit-norm]), and equal half-step projective fidelity of the midpoint triad ([@thm-ch07-midpoint-half-step-fidelity]) are all certified directly inside the zero-axiom kernel libraries `OmegaInit` and `OmegaMath`, requiring neither probability measures nor limits. In continuous stochastic analysis, left-endpoint non-anticipating sums yield the Itô integral with its extra second-order drift correction (K. Itô, 1944), whereas symmetric midpoint evaluation produces the coordinate-invariant Stratonovich integral obeying the classical chain rule (R. L. Stratonovich, 1966; smooth-path approximation convergence in E. Wong and M. Zakai, 1965; literature result). The rational mechanism here pinpoints the algebraic root of Itô derailment: the exact positive chord spill $(1 - 2\alpha)\lVert\Delta\mathbf{x}\rVert^2$ at $\alpha = 0$.
:::

::: {.film src="a-symbol-whose-cube-vanishes"}
**One formal symbol whose cube vanishes turns differentiation, inversion and a step on the sphere into exact rational arithmetic (2 min 52 s).** Every quantity is three rational slots (value, slope, half the bend), and the truncated product lets a fourth slot fall off; a jet with nonzero constant slot is inverted in two terms, multiplied back grade by grade to $(1, 0, 0)$ on $a = (2, 2, 1)$, and the zero-shift chain rule is shown on $g = (1, 2, 3)$, $f = (0, \frac{1}{2}, \frac{1}{4})$ (the green tags are `mul_inv` and `chain_rule` of [@thm-ch07-jet2-algebra-and-chain]; the examples are computed on screen). On a circle drawn to scale, the magenta flat tangent step pokes out of the shell while the cyan arc step stays on it modulo $\eta^3$ (hand derivation); at a real step $\frac{1}{2}$ their squared lengths are $\frac{5}{4}$ and $\frac{65}{64}$ (computed), and the past, present and future reading of the three grades is labelled as the model. The cyan jet reads `{1/2, -1/2, +1/4}` at $x_0 = 1$, while the magenta secant overshoots by $\frac{5}{82}$ at $(1, \frac{1}{4})$ and has zero bias by accident at $(\frac{1}{2}, \frac{1}{4})$ yet never sees $-\frac{16}{125}$ (the green tags are `kappa_jet_one` and `kappa_secant_discrepancy` of [@thm-ch07-fidelity-jet-and-secant]). Finally, the squared norms $\frac{23}{9}$, $\frac{135}{79}$, $1$, $\frac{79}{135}$, $\frac{9}{23}$ of five weights $\alpha$ are recomputed by exact quaternion algebra, the amber midpoint $(11, 18, 12, 6)/25$ stays on the sphere, and both half-steps share fidelity $\frac{121}{625}$ (green tags for [@thm-ch07-alpha-sampling-norm-drift], [@thm-ch07-midpoint-unit-norm] and [@thm-ch07-midpoint-half-step-fidelity]); Itô and Stratonovich appear as literature results, as in [@rem-ch07-ito-stratonovich-boundary].
:::

In the interactive workbench card below, drag the amber anchor and sampling weight to compare on a single purple osculating ternion sphere the cyan exact jet triple `{1/2, -1/2, +1/4}` of $\mathcal{J}_2(\mathbb{Q})$, the magenta finite-secant bias, and the unit-norm $\alpha = \frac{1}{2}$ midpoint step against $\alpha = 0$ Itô tangent derailment. In the next chapter, we lift second-order jets to arbitrary truncation order $N$ in the D-finite differential jet ring $J_N(\mathbb{Q})$ and prove the algebraic unification of the rational Cayley circle with trigonometry.

::: {.viz src="omega-math-workbench" preset="jet2-osculating-sphere" height="520"}
**Second-order nilpotent jet and osculating-sphere midpoint card.** Around an opaque purple core inside the glass unit shell, drag the amber rational focus $x_0 = P/Q$ (defaulting to the self-dual midpoint $x_0 = 1$) and switch the sampling weight $\alpha \in \{0, \frac{1}{4}, \frac{1}{2}, \frac{3}{4}, 1\}$: the cyan osculating jet reads `{1/2, -1/2, +1/4}` while the $\alpha = \frac{1}{2}$ Cayley midpoint step stays identically on the unit circle, contrasting with the magenta finite-secant bias (plotted in the full workbench strip) and $\alpha = 0$ left-endpoint Itô outward derailment.
:::
