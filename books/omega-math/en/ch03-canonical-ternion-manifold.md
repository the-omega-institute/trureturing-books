# Chapter 3 Locking the Three-Dimensional Manifold and Canonical Ternions

> *"In one dimension a point can only glide around a commutative ring; in two dimensions any commutator preserving a nondegenerate invariant form sits orthogonal to both basis axes and collapses to zero. Only when a third degree of freedom stands upright does non-Abelian rotation close—and writing it as a canonical homogeneous integer quadruple $[w : x : y : z]$ wipes out both `Quot.sound` and $\sqrt{2}$ in one stroke."*

[Chapter 2](ch02-homogeneous-projective-line.md) tamed $\infty$ completely on the homogeneous projective circle $\mathbb{QP}^1$, yet uncovered an unavoidable limitation: circular composition is everywhere commutative, so it fails Law III of `AXIOM-Ω`. This chapter resolves the two foundational questions that lock the geometry of the entire monograph:

1. **Why does a Lie algebra with a positive invariant form need at least three dimensions to be non-Abelian?** And why does the cross product emerge in dimension three?
2. **How do we build this three-dimensional manifold over pure integers with zero axioms, zero square roots, and zero quotient postulates?** We construct the canonical homogeneous integer ternion manifold $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$ and draw the exact completion line separating it from its classical real shadow.

Throughout this chapter we keep our epistemic boundary razor-sharp: the **four classical shadow anchor theorems** in Sections 3.1 and 3.4 live on the `Mathlib` real/complex side (under the official backend’s permitted axiom ceiling `{propext, Classical.choice, Quot.sound}`; individual closures are unreported) and provide external rigidity benchmarks, whereas the **eight zero-axiom kernel theorems** in Sections 3.2 and 3.3 (packaged into three green theorem boxes depending solely on `OmegaInit` and `OmegaMath` with empty transitive axiom closure) directly lock down Euler–Lagrange four-square multiplicativity, the projective heap laws, the four-dimensional Lagrange identity, the unit bound $\kappa \le 1$, heap-translation invariance of projective fidelity, and the explicit projective ternary noncommutativity witness for quarter-turns about perpendicular axes over pure integers; canonical GCD reduction, the feature-rank split, and the remaining five-anchor hand calculations in Section 3.3 remain explicitly marked at their respective tiers (`ARGUED` / `NUM`).

## 3.1 Low-Dimensional Collapse and the Three-Dimensional Lock: Classical Shadow Anchors {#sec-ch03-dimension-lock}

Begin with a two-line algebraic fact (`ARGUED`): **in dimensions one and two, any nondegenerate invariant bilinear form chokes off noncommutativity completely.**

Let $L$ be a finite-dimensional Lie algebra over a field $K$ carrying a bilinear form $\Phi : L \times L \to K$ (not even assumed symmetric) that is invariant:

$$
\Phi\bigl([x, y],\, z\bigr) \;=\; -\Phi\bigl(y,\, [x, z]\bigr) \qquad (\forall\, x, y, z \in L).
$$

Skew-symmetry $[x, x] = 0$ and $[x, y] = -[y, x]$ immediately force every bracket $[x, y]$ to be left-orthogonal to both $x$ and $y$:

$$
\Phi\bigl([x, y],\, x\bigr) \;=\; -\Phi\bigl(y,\, [x, x]\bigr) \;=\; 0, \qquad \Phi\bigl([x, y],\, y\bigr) \;=\; \Phi\bigl(x,\, [y, y]\bigr) \;=\; 0.
$$

Now suppose $\dim_K L \le 2$ and assume for contradiction that $[x, y] \neq 0$. Then $x \neq 0$, and $x, y$ must be linearly independent (for if $sx + ty = 0$, bracketing with $x$ gives $t[x, y] = 0 \implies t = 0 \implies s = 0$), so $x$ and $y$ span all of $L$. Yet the linear functional $\Phi([x, y], \cdot)$ vanishes on both $x$ and $y$, hence vanishes identically on $L$. Whenever $\Phi$ is left-nondegenerate ($\forall z,\; \Phi(u, z) = 0 \implies u = 0$), this forces $[x, y] = 0$, a contradiction!

A one- or two-dimensional Lie algebra with a left-nondegenerate invariant bilinear form must therefore be Abelian. In the two-dimensional affine algebra $[H,E]=E$, invariance gives $\Phi(E,E)=\Phi([H,E],E)=\Phi(H,[E,E])=0$, ruling out a positive invariant form.

The smallest dimension capable of hosting non-Abelian invariant geometry is therefore **$3$**. Better yet, in three dimensions, positivity of an invariant bilinear form locks the Lie bracket uniquely onto a positive scalar multiple of the cross product. The next two frozen theorems sit on the classical `Mathlib` shadow side as kernel-checked rigidity benchmarks:

::: {.theorem #thm-ch03-dim3-cross-bracket title="Cross-Product Lock for Non-Abelian Three-Dimensional Lie Algebras (Classical Shadow Anchor)" lean="D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.exists_basis_bracket_eq_smul_cross"}
Let $L$ be a non-Abelian real Lie algebra of dimension $\dim_{\mathbb{R}} L = 3$, and let $\Phi : L \times L \to \mathbb{R}$ be an invariant bilinear form ($\Phi([x, y], z) = -\Phi(y, [x, z])$ for all $x, y, z$, without assuming symmetry) that is strictly positive on nonzero vectors ($\Phi(x, x) > 0$ for all $x \neq 0$). Then there exist a basis $b_0, b_1, b_2$ of $L$ and a strictly positive real constant $c > 0$ such that:

1. the basis is $\Phi$-orthonormal: $\Phi(b_i, b_j) = \delta_{ij}$ for all $i, j \in \{0, 1, 2\}$;
2. writing $v_b \in \mathbb{R}^3$ for the coordinate vector of $v \in L$ in the basis $b$, the Lie bracket equals $c$ times the Euclidean cross product for all $x, y \in L$:

   $$
   [x, y]_b \;=\; c\,(x_b \times y_b).
   $$
:::

::: {.proof}
Because $L$ is non-Abelian, choose $x, y \in L$ with $[x, y] \neq 0$. Invariance gives $\Phi([x, [x, y]], y) = -\Phi([x, y], [x, y]) < 0$, so $[x, [x, y]] \neq 0$ as well. The orthogonality calculation above shows that $x$, $[x, y]$, and $[x, [x, y]]$ are nonzero and pairwise orthogonal in both slots of $\Phi$. Scaling each by a positive factor via positivity yields $\Phi$-unit vectors $e_1, e_2, e_3$ satisfying $[e_1, e_2] = c\,e_3$ with $c > 0$. Being three pairwise orthogonal unit vectors in dimension $3$, they form a basis; invariance then fixes $\Phi([e_2, e_3], e_1) = -\Phi(e_3, [e_2, e_1]) = c\,\Phi(e_3, e_3) = c$ and $\Phi([e_3, e_1], e_2) = c$, determining every cyclic bracket, and bilinearity extends the identity to all of $L$. This declaration lives on the classical `Mathlib` shadow side; the full proof is checked by the Lean kernel.
:::

Notice how [@thm-ch03-dim3-cross-bracket] wipes out every noncompact three-dimensional competitor in one sweep (`ARGUED`): the Heisenberg algebra $H_3(\mathbb{R})$ (with central commutator $Z = [X, Y]$) has proper derived subalgebra whereas the cross product satisfies $[L, L] = L$, and $\mathfrak{sl}(2, \mathbb{R})$ has $\operatorname{ad}_H$ with real eigenvalues $\pm 2$ whereas every skew-symmetric cross-product operator has purely imaginary nonzero eigenvalues. The sole survivor in three dimensions is $\mathfrak{so}(3) \cong \mathfrak{su}(2)$.

A second frozen classical anchor arrives at the exact same oriented three-dimensional cross product from a completely independent direction—directed positivity and phase balance on a four-dimensional spin factor:

::: {.theorem #thm-ch03-spinfactor-cross-lock title="Oriented Cross-Product Classification on the Four-Dimensional Spin Factor (Classical Shadow Anchor)" lean="D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences"}
Equip the four-dimensional real spin-factor carrier $E = \mathbb{R} \times \mathbb{R}^3$ with its Jordan product $\operatorname{jordan}\bigl((s, x), (t, y)\bigr) = (st + x \cdot y,\, sy + tx)$, positive cone $\lVert x\rVert \le s$, order-unit norm $\lvert s\rvert + \lVert x\rVert$, and all positive evaluations $\alpha(s, x) = m s + v \cdot x$ ($\lVert v\rVert \le m$). If a total binary map $D : E \to E \to E$ satisfies directed two-label complex Gram positivity (`P2 D`) and $\pm 1$ phase-square balance (`PB D`), then there exists a single global orientation $\varepsilon \in \{\mathrm{plus}, \mathrm{minus}\}$ such that:

1. for all $(s, x), (t, y) \in E$, $D$ equals the oriented three-dimensional cross channel $D\bigl((s, x), (t, y)\bigr) = \bigl(0,\, \pm(x \times y)\bigr)$ (`crossD ε`);
2. the full structural package `Consequences D` (unit annihilation, translation invariance, real bilinearity, order-unit norm and difference bounds, continuity, positive semidefiniteness of all finite complex Gram tables, and Jordan–cross reassociation) and the $2 \times 2$ Hermitian Pauli matrix realization `MatrixInterfaces` hold simultaneously.
:::

::: {.proof}
Directed two-label Gram positivity `P2 D` forces skew-symmetry, proportional vanishing, and zero rows without any assumed regularity. Combining `P2 D` with phase-square balance `PB D` fixes a single global orientation $\varepsilon \in \{\mathrm{plus}, \mathrm{minus}\}$ on pure vectors and extends it across all scalar-plus-vector inputs. Realizing the two orientations by standard and opposite $2 \times 2$ Pauli matrix products then certifies every finite Gram table and matrix interface at once. This declaration lives on the classical `Mathlib` shadow side; the full proof is checked by the Lean kernel.
:::

The figure pairs the invariant-form constraint in low-dimensional Lie algebras with an integer quaternion witness to noncommutativity in three-dimensional rational rotations.

::: {.figure src="ch03-ternion-3d-lock"}
**Lie brackets in low dimensions and order in integer ternions.** On the left, a nondegenerate invariant form forces a one- or two-dimensional Lie bracket to vanish. On the right, two integer quaternions witness noncommutativity among three-dimensional rational projective rotations. See [@thm-ch03-dim3-cross-bracket] for the cross-product classification and [@thm-ch03-phalf-qhalf-noncommutative] for the ray witness.
:::

## 3.2 The Canonical Homogeneous Integer Ternion Manifold $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$: Free of Quotients and Radicals {#sec-ch03-canonical-ternions}

Our classical shadow benchmarks confirm that minimal non-Abelian geometry lives on three-dimensional rotations and quaternions. Now we return to our zero-axiom bare CIC floor: **how do we construct this three-dimensional non-Abelian manifold directly over pure integers, with zero real numbers, zero square roots, and zero `Quot.sound`?**

First see why forcing unit vectors fails on step one. Consider the simplest $90^\circ$ rotation about the first coordinate axis $p_{\mathrm{Half}} = (1, 1, 0, 0)$. Its squared norm is $1^2 + 1^2 + 0^2 + 0^2 = 2$, which is not a square integer! Normalizing it to length $1$ immediately drags in the irrational radical $\frac{1 + \mathbf{i}}{\sqrt{2}}$ and breaks rational arithmetic before we begin.

The cure is the exact three-dimensional upgrade of [Chapter 2](ch02-homogeneous-projective-line.md): lift homogeneous integer pairs $[P : Q] \in \mathbb{QP}^1$ to homogeneous integer quadruples $[w : x : y : z] \in \mathbb{QP}^3$. Four integer coordinates modulo nonzero scaling carry **strictly three degrees of freedom**, and two elementary integer operations give every projective ray a unique canonical identity—eliminating `Quot.sound` completely:

1. Compute $g = \gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert) \ge 1$ and divide all four entries by $g$ to obtain coprime $(w', x', y', z')$.
2. Multiply by $s \in \{+1, -1\}$ so that the **first nonzero entry is strictly positive**.

The resulting subtype `CanonProjTernion` is pure integer data, inherits zero-axiom `DecidableEq` (via Hedberg's theorem from [Chapter 1](ch01-axiom-omega-and-cic.md)), and automatically squares away every radical from both observable fidelities and three-dimensional rotations!

::: {.definition #def-ch03-canonical-ternion title="Canonical Homogeneous Integer Ternions, Ternary Transport, and Radical-Free Fidelity (ARGUED)"}
Define the **canonical homogeneous integer ternion manifold** $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$ (written here as the canonical subtype `CanonProjTernion`) as the set of integer quadruples satisfying $\operatorname{IsCanonical}(w, x, y, z)$: $(w, x, y, z) \neq (0, 0, 0, 0)$, $\gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert) = 1$, and the first nonzero coordinate is strictly positive. Write $\operatorname{norm}$ for this GCD-and-sign normalization operator. For integer quadruples $\mathbf{a} = (a_w, a_x, a_y, a_z)$ and $\mathbf{b} = (b_w, b_x, b_y, b_z)$, define:

1. **Pure-integer Hamilton product and conjugate**: $\bar{\mathbf{b}} := (b_w, -b_x, -b_y, -b_z)$ and

   $$
   \mathbf{a}\mathbf{b} \;:=\; \begin{pmatrix}
   a_w b_w - a_x b_x - a_y b_y - a_z b_z \\
   a_w b_x + a_x b_w + a_y b_z - a_z b_y \\
   a_w b_y - a_x b_z + a_y b_w + a_z b_x \\
   a_w b_z + a_x b_y - a_y b_x + a_z b_w
   \end{pmatrix}^{\!\top}.
   $$

2. **Origin-free ternary comparison transport**:

   $$
   [\mathbf{a}, \mathbf{b}, \mathbf{c}] \;:=\; \operatorname{norm}\bigl(\mathbf{a}\,\bar{\mathbf{b}}\,\mathbf{c}\bigr).
   $$

3. **Radical-free rational projective fidelity**: writing $\langle\mathbf{a}, \mathbf{b}\rangle := a_w b_w + a_x b_x + a_y b_y + a_z b_z$ and $\lVert\mathbf{a}\rVert^2 := \langle\mathbf{a}, \mathbf{a}\rangle \in \mathbb{Z}_{\ge 1}$, define

   $$
   \kappa_{\mathrm{proj}}(\mathbf{a}, \mathbf{b}) \;:=\; \frac{\langle\mathbf{a}, \mathbf{b}\rangle^2}{\lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2} \;\in\; \mathbb{Q} \cap [0, 1].
   $$

4. **Radical-free three-dimensional rational adjoint rotation**: for any pure vector $\mathbf{v} = (0, v_x, v_y, v_z) \in \mathbb{Q}^3$,

   $$
   \operatorname{Ad}(\mathbf{p})(\mathbf{v}) \;:=\; \frac{\mathbf{p}\,\mathbf{v}\,\bar{\mathbf{p}}}{\lVert\mathbf{p}\rVert^2} \;\in\; \mathrm{SO}(3, \mathbb{Q}).
   $$
:::

Why can ternary transport $[\mathbf{a}, \mathbf{b}, \mathbf{c}] = \operatorname{norm}(\mathbf{a}\bar{\mathbf{b}}\mathbf{c})$ never collapse three nonzero integer ternions to $(0, 0, 0, 0)$, and why do left cancellation, right cancellation, and outer associativity hold unconditionally at the projective level? Inside the zero-axiom library `OmegaMath`, we do not even need to bake GCD reduction into the core algebraic laws: working directly on integer quaternions `Quaternion` with the raw ternary product $\operatorname{triad}(\mathbf{a}, \mathbf{b}, \mathbf{c}) := (\mathbf{a}\bar{\mathbf{b}})\mathbf{c}$ and signed integer ray equivalence `RayEquiv` (completely free of `Quot.sound`), the next four zero-axiom frozen theorems seal both norm multiplicativity and the projective heap laws inside bare CIC:

::: {.theorem #thm-ch03-quaternion-norm-and-heap-laws title="Four-Square Norm Multiplicativity and Projective Ternion Heap Laws" lean="D5/S3/Quantum/AURICOmega/OmegaTernionHeap.normSq_mul D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_left_absorption D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_right_absorption D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc"}
Let `Quaternion` be the type of integer quadruples over `Omega.Int`, equipped with Hamilton multiplication $\mathbf{a}\mathbf{b}$, conjugation $\bar{\mathbf{b}}$, natural squared norm $\lVert\mathbf{a}\rVert^2 := \operatorname{normSq}(\mathbf{a}) \in \mathbb{N}$, nonzero predicate `Nonzero`, and ternary representative $\operatorname{triad}(\mathbf{a}, \mathbf{b}, \mathbf{c}) := (\mathbf{a}\bar{\mathbf{b}})\mathbf{c}$. Write $\mathbf{a} \sim_{\mathrm{ray}} \mathbf{b}$ (`RayEquiv a b`) when both $\mathbf{a}$ and $\mathbf{b}$ are nonzero and there exist nonzero integers $k, l \in \mathbb{Z} \setminus \{0\}$ such that $k\mathbf{a} = l\mathbf{b}$. Then in bare CIC (relying solely on `OmegaInit` and `OmegaMath`, with zero axioms):

1. **Euler–Lagrange four-square multiplicativity** ([`normSq_mul`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.normSq_mul)): for all $\mathbf{a}, \mathbf{b} : \mathrm{Quaternion}$,

   $$
   \lVert\mathbf{a}\mathbf{b}\rVert^2 \;=\; \lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2.
   $$

2. **Left ray absorption** ([`triad_left_absorption`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_left_absorption)): for all nonzero $\mathbf{x}, \mathbf{z} : \mathrm{Quaternion}$,

   $$
   \operatorname{triad}(\mathbf{x}, \mathbf{x}, \mathbf{z}) \;\sim_{\mathrm{ray}}\; \mathbf{z}.
   $$

3. **Right ray absorption** ([`triad_right_absorption`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_right_absorption)): for all nonzero $\mathbf{x}, \mathbf{z} : \mathrm{Quaternion}$,

   $$
   \operatorname{triad}(\mathbf{x}, \mathbf{z}, \mathbf{z}) \;\sim_{\mathrm{ray}}\; \mathbf{x}.
   $$

4. **Outer ternary associativity** ([`triad_assoc`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc)): for all nonzero $\mathbf{x}, \mathbf{y}, \mathbf{z}, \mathbf{u}, \mathbf{v} : \mathrm{Quaternion}$,

   $$
   \operatorname{triad}\bigl(\operatorname{triad}(\mathbf{x}, \mathbf{y}, \mathbf{z}),\, \mathbf{u},\, \mathbf{v}\bigr) \;\sim_{\mathrm{ray}}\; \operatorname{triad}\bigl(\mathbf{x},\, \mathbf{y},\, \operatorname{triad}(\mathbf{z}, \mathbf{u}, \mathbf{v})\bigr).
   $$
:::

::: {.proof}
For part 1, expanding the sum of the four squared integer coordinates of $\mathbf{a}\mathbf{b}$ cancels every cross term pairwise, yielding $(a_w^2 + a_x^2 + a_y^2 + a_z^2)(b_w^2 + b_x^2 + b_y^2 + b_z^2)$ and pulling back to $\mathbb{N}$ by injectivity of `Int.ofNat`; in particular, any three nonzero quaternions satisfy $\lVert\mathbf{a}\bar{\mathbf{b}}\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 \ge 1$ and therefore never vanish. For parts 2 and 3, the conjugate identities $\mathbf{x}\bar{\mathbf{x}} = \lVert\mathbf{x}\rVert^2\mathbf{1}$ and $\bar{\mathbf{z}}\mathbf{z} = \lVert\mathbf{z}\rVert^2\mathbf{1}$ give $\operatorname{triad}(\mathbf{x}, \mathbf{x}, \mathbf{z}) = \lVert\mathbf{x}\rVert^2\mathbf{z}$ and $\operatorname{triad}(\mathbf{x}, \mathbf{z}, \mathbf{z}) = \lVert\mathbf{z}\rVert^2\mathbf{x}$; nonvanishing of $\mathbf{x}$ (respectively $\mathbf{z}$) keeps the integer scale factor nonzero, witnessing `RayEquiv` directly. For part 4, associativity of integer quaternion multiplication yields exact entrywise equality $\bigl(((\mathbf{x}\bar{\mathbf{y}})\mathbf{z})\bar{\mathbf{u}}\bigr)\mathbf{v} = (\mathbf{x}\bar{\mathbf{y}})\bigl((\mathbf{z}\bar{\mathbf{u}})\mathbf{v}\bigr)$, and reflexivity of `RayEquiv` on the nonzero ternary product completes the claim. This declaration depends solely on `OmegaInit` and `OmegaMath` with empty transitive axiom closure. The full proof is checked by the Lean kernel.
:::

With four-square multiplicativity and the heap laws locked in place, we turn to the observable readout: how do we certify $\kappa(\mathbf{a}, \mathbf{b}) \le 1$ without calling real Cauchy–Schwarz, and prove that projective fidelity survives common heap translation? The key is the four-dimensional Lagrange identity: the deficit between $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2$ and $\langle\mathbf{a}, \mathbf{b}\rangle^2$ equals the exact sum of the six squared $2 \times 2$ Plücker minors. All three results below are frozen in the zero-axiom `OmegaInit` and `OmegaMath` kernel layer:

::: {.theorem #thm-ch03-lagrange-and-kappa-invariance title="Four-Dimensional Lagrange Identity, Fidelity Bound, and Heap-Translation Invariance" lean="D5/S3/Quantum/AURICOmega/OmegaTernionHeap.lagrange_identity D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_le_one D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_heap_invariant"}
For integer quaternions $\mathbf{a} = (a_w, a_x, a_y, a_z)$ and $\mathbf{b} = (b_w, b_x, b_y, b_z)$, let $\langle\mathbf{a}, \mathbf{b}\rangle := \mathbf{a}\cdot\mathbf{b} \in \mathbb{Z}$ be the Euclidean dot product, define exact rational projective fidelity in `Omega.IntRatio` by $\kappa(\mathbf{a}, \mathbf{b}) := \operatorname{IntRatio.value}\bigl(\langle\mathbf{a}, \mathbf{b}\rangle^2,\, \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\bigr)$, and define the sum of the six squared $2 \times 2$ Plücker minors by

$$
\begin{aligned}
\operatorname{minorSquares}(\mathbf{a}, \mathbf{b}) \;:=\;& (a_w b_x - a_x b_w)^2 + (a_w b_y - a_y b_w)^2 + (a_w b_z - a_z b_w)^2 \\
&+ (a_x b_y - a_y b_x)^2 + (a_x b_z - a_z b_x)^2 + (a_y b_z - a_z b_y)^2 \;\in\; \mathbb{Z}.
\end{aligned}
$$

Then in bare CIC (relying solely on `OmegaInit` and `OmegaMath`, with zero axioms):

1. **Four-dimensional Lagrange identity** ([`lagrange_identity`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.lagrange_identity)): for all $\mathbf{a}, \mathbf{b} : \mathrm{Quaternion}$,

   $$
   \lVert\mathbf{a}\rVert^2\,\lVert\mathbf{b}\rVert^2 - \langle\mathbf{a}, \mathbf{b}\rangle^2 \;=\; \operatorname{minorSquares}(\mathbf{a}, \mathbf{b}).
   $$

2. **Unit upper bound on projective fidelity** ([`kappa_le_one`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_le_one)): for all nonzero $\mathbf{a}, \mathbf{b} : \mathrm{Quaternion}$, in the rational order `IntRatio.Le`,

   $$
   \kappa(\mathbf{a}, \mathbf{b}) \;\le\; 1.
   $$

3. **Right heap-translation invariance** ([`kappa_heap_invariant`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_heap_invariant)): for all $\mathbf{a}, \mathbf{b}, \mathbf{u}, \mathbf{v} : \mathrm{Quaternion}$ with $\mathbf{u}$ and $\mathbf{v}$ nonzero, in `IntRatio.Equivalent`,

   $$
   \kappa\bigl(\operatorname{triad}(\mathbf{a}, \mathbf{u}, \mathbf{v}),\, \operatorname{triad}(\mathbf{b}, \mathbf{u}, \mathbf{v})\bigr) \;\equiv\; \kappa(\mathbf{a}, \mathbf{b}).
   $$
:::

::: {.proof}
For part 1, polynomial expansion in the eight integer coordinates cancels all four diagonal terms $a_i^2 b_i^2$ and regroups the remaining twelve terms into the six squared $2 \times 2$ minors $(a_i b_j - a_j b_i)^2$. For part 2, every squared integer minor is nonnegative, so $\operatorname{minorSquares}(\mathbf{a}, \mathbf{b}) \ge 0$, whence part 1 yields $\langle\mathbf{a}, \mathbf{b}\rangle^2 \le \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2$; because $\mathbf{a}$ and $\mathbf{b}$ are nonzero, the denominator $\lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2$ is strictly positive, directly certifying `IntRatio.Le (kappa a b) 1`. For part 3, set $\mathbf{p} := \bar{\mathbf{u}}\mathbf{v}$; nonvanishing of $\mathbf{u}$ and $\mathbf{v}$ makes $\mathbf{p}$ nonzero with positive norm $n := \lVert\mathbf{p}\rVert^2 > 0$. By associativity, $\operatorname{triad}(\mathbf{a}, \mathbf{u}, \mathbf{v}) = \mathbf{a}\mathbf{p}$. Right multiplication scales the dot product by $\langle\mathbf{a}\mathbf{p}, \mathbf{b}\mathbf{p}\rangle = \langle\mathbf{a}, \mathbf{b}\rangle\,n$ (multiplying its square by $n^2$) and, via part 1 of [@thm-ch03-quaternion-norm-and-heap-laws], scales the denominator by $\lVert\mathbf{a}\mathbf{p}\rVert^2\lVert\mathbf{b}\mathbf{p}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\,n^2$; this common nonzero natural factor $n^2$ cancels identically in `IntRatio.Equivalent` (and preserves `undefined` if either $\mathbf{a}$ or $\mathbf{b}$ is zero). This declaration depends solely on `OmegaInit` and `OmegaMath` with empty transitive axiom closure. The full proof is checked by the Lean kernel.
:::

The Lean carrier `Omega.Ternion.ProjTernion` requires only that the representative have positive squared norm. Its ternary product keeps the raw result, so $p_{\mathrm{Half}}\overline{p_{\mathrm{Half}}}\,p_0=2p_0=(2,0,0,0)$ lies on the ray of $p_0$ and has different coordinates. Right cancellation gives the same witness, $p_0\overline{p_{\mathrm{Half}}}\,p_{\mathrm{Half}}=2p_0$. Raw ternary associativity holds as an entrywise equality by `triad_assoc_eq`.

Passing to the canonical model takes a separate hand derivation (`ARGUED`). Write two primitive quadruples on the same ray as $\mathbf{b}=(m/n)\mathbf{a}$ with $m,n$ coprime and $n>0$. Then $n$ divides every entry of $\mathbf{a}$, so $n=1$, and primitivity of $\mathbf{b}$ gives $\lvert m\rvert=1$. The leading-positive condition forces $m=1$. Rescaling any slot of the ternary product changes only the overall scalar, so reducing an intermediate product leaves its ray intact. Applying $\operatorname{norm}$ to the final representatives turns ray cancellation into entrywise equality and carries raw associativity over to the canonical model.

The reading is scale-invariant. All six minors vanish exactly when the two nonzero vectors lie on the same ray, so [@thm-ch03-lagrange-and-kappa-invariance] gives separation for canonical representatives. Squaring gives nonnegativity, and $1$ and $\mathbf{i}$ give a zero reading. Common left and right multiplication both scale the inner product and squared norms by the same positive factor. The projector coordinates below give finite Gram positivity because the quadratic form equals $\sum_{i,j}(\sum_k c_k P(\mathbf{a}_k)_{ij})^2$.

The signed unit spinors give a second carrier with a different reading (hand derivation).

- **Projective quotient carrier `CanonProjTernion` ($\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$)**: first-nonzero sign locking identifies $+\mathbf{a}$ with $-\mathbf{a}$, matching three-dimensional rational rotations one-to-one; its ray kernel $\kappa_{\mathrm{proj}}(\mathbf{a}, \mathbf{b}) = \operatorname{Tr}\bigl(P(\mathbf{a})P(\mathbf{b})\bigr)$ (with rank-$1$ symmetric projectors $P(\mathbf{a}) = \frac{\mathbf{a}\mathbf{a}^\top}{\lVert\mathbf{a}\rVert^2} \in \mathrm{Sym}_4(\mathbb{Q})$) has **feature rank $10$**.
- **Signed unit spinors ($S^3(\mathbb{Q}) \subset \mathrm{Sp}(1)$)** retain the distinction between $+u$ and $-u$, with reading $\kappa_{S^3}(u,v)=(1+\langle u,v\rangle)/2$. The adjoint map has kernel $\{\pm1\}$ and covers the subgroup of rotations with rational unit lifts two-to-one. This subgroup is proper in $\mathrm{SO}(3,\mathbb{Q})$, as shown in [Chapter 5](ch05-rational-cayley-rotations.md). Chapter 4 computes the signed kernel’s feature rank of $5$ using integer quintuples.

## 3.3 Hand Calculations in Integer Ternions: Anchors, Three-Beat Closure, and Noncommutativity {#sec-ch03-worked-calculations}

Nothing beats working out the integer arithmetic by hand. Using nothing beyond integer addition, multiplication, and GCD reduction, five elementary quadruples exhibit radical-free $90^\circ$ rotation, three-beat projective closure, and noncommutativity on the spot.

::: {.example #ex-ch03-five-anchors-and-closure title="Five Integer Ternion Anchors, Three-Beat Closure, Adjoint Rotation, and Noncommutativity Witness (NUM)"}
Consider the five canonical integer ternions

$$
\begin{aligned}
p_0 &= (1, 0, 0, 0), & p_{\mathrm{Half}} &= (1, 1, 0, 0), & q_{\mathrm{Half}} &= (1, 0, 1, 0), \\
p_{\mathrm{Inf}} &= (0, 1, 0, 0), & g_{120} &= (1, 1, 1, 1).
\end{aligned}
$$

Compute every observable directly in integers:

1. **Radical-free rational fidelity spectrum**: their squared norms are $1, 2, 2, 1, 4$, yielding exact rational fidelities against the Past anchor $p_0$:

   $$
   \begin{aligned}
   \kappa_{\mathrm{proj}}(p_0, p_0) &= 1, & \kappa_{\mathrm{proj}}(p_0, p_{\mathrm{Half}}) &= \frac{1^2}{1 \cdot 2} = \frac{1}{2}, & \kappa_{\mathrm{proj}}(p_0, q_{\mathrm{Half}}) &= \frac{1}{2}, \\
   \kappa_{\mathrm{proj}}(p_0, p_{\mathrm{Inf}}) &= 0, & \kappa_{\mathrm{proj}}(p_0, g_{120}) &= \frac{1^2}{1 \cdot 4} = \frac{1}{4},
   \end{aligned}
   $$

   together with mutual equatorial overlap $\kappa_{\mathrm{proj}}(p_{\mathrm{Half}}, q_{\mathrm{Half}}) = \frac{1^2}{2 \cdot 2} = \frac{1}{4}$.

2. **Exact integer $90^\circ$ adjoint rotation without $\sqrt{2}$**: even though $\lVert p_{\mathrm{Half}}\rVert^2 = 2$ is not a square, evaluating $(1 + \mathbf{i})(x\mathbf{i} + y\mathbf{j} + z\mathbf{k})(1 - \mathbf{i}) = 2x\mathbf{i} - 2z\mathbf{j} + 2y\mathbf{k}$ and dividing by $\lVert p_{\mathrm{Half}}\rVert^2 = 2$ yields the pure integer rotation

   $$
   \operatorname{Ad}(p_{\mathrm{Half}})(x, y, z) \;=\; (x,\; -z,\; y) \;\in\; \mathrm{SO}(3, \mathbb{Z}),
   $$

   an exact right-handed quarter-turn about the $x$-axis ($\mathbf{j} \mapsto \mathbf{k}$, $\mathbf{k} \mapsto -\mathbf{j}$). Moreover, doubling Present produces $[p_{\mathrm{Half}}, p_0, p_{\mathrm{Half}}] = \operatorname{norm}\bigl((1 + \mathbf{i})\cdot 1 \cdot (1 + \mathbf{i})\bigr) = \operatorname{norm}(0, 2, 0, 0) = (0, 1, 0, 0) = p_{\mathrm{Inf}}$, embedding the antipodal circle closure of [Chapter 2](ch02-homogeneous-projective-line.md) directly inside three dimensions.

3. **Three-beat projective closure of `g120 = (1, 1, 1, 1)` and left cancellation**: iterating $g_{120}$ ($\lVert g_{120}\rVert^2 = 4$) at basepoint $p_0$:
   - Beat 2: raw square $(1 + \mathbf{i} + \mathbf{j} + \mathbf{k})^2 = (-2, 2, 2, 2)$ (norm check: $4 + 4 + 4 + 4 = 16 = 4 \times 4$); dividing by $\gcd = 2$ gives $(-1, 1, 1, 1)$, and flipping the leading negative sign yields $g_2 = (1, -1, -1, -1)$.
   - Beat 3: raw product $(1 - \mathbf{i} - \mathbf{j} - \mathbf{k})(1 + \mathbf{i} + \mathbf{j} + \mathbf{k}) = (4, 0, 0, 0)$ (norm check: $16 = 4 \times 4$); dividing by $\gcd = 4$ lands squarely back on $g_3 = (1, 0, 0, 0) = p_0$. (Without sign locking on the spinor double cover, beat 3 gives $(-1, 1, 1, 1)(1, 1, 1, 1) = (-4, 0, 0, 0) \to (-1, 0, 0, 0)$, requiring $6$ beats to return to $(+1, 0, 0, 0)$.)
   - Left cancellation check: $[p_{\mathrm{Half}}, p_{\mathrm{Half}}, g_{120}] = \operatorname{norm}\bigl((1+\mathbf{i})(1-\mathbf{i})(1+\mathbf{i}+\mathbf{j}+\mathbf{k})\bigr) = \operatorname{norm}(2, 2, 2, 2) = (1, 1, 1, 1) = g_{120}$.

4. **One-step integer noncommutativity witness**: composing $p_{\mathrm{Half}}$ and $q_{\mathrm{Half}}$ at $p_0$ in both orders yields

   $$
   \begin{aligned}
   [p_{\mathrm{Half}},\, p_0,\, q_{\mathrm{Half}}] &= \operatorname{norm}\bigl((1 + \mathbf{i})(1 + \mathbf{j})\bigr) = (1, 1, 1, 1) = g_{120}, \\
   [q_{\mathrm{Half}},\, p_0,\, p_{\mathrm{Half}}] &= \operatorname{norm}\bigl((1 + \mathbf{j})(1 + \mathbf{i})\bigr) = (1, 1, 1, -1).
   \end{aligned}
   $$

   They split explicitly in the fourth coordinate ($+1 \neq -1$), with mutual fidelity $\frac{(1 + 1 + 1 - 1)^2}{4 \cdot 4} = \frac{1}{4}$. Three lines of integer multiplication witness noncommutativity in the canonical model.
:::

Item 4 above is not merely a hand check (`NUM`): without GCD reduction or `Quot.sound`, the next zero-axiom theorem frozen in `OmegaInit` and `OmegaMath` certifies noncommutativity directly on the projective ray equivalence `Ternion.RayEquiv`:

::: {.theorem #thm-ch03-phalf-qhalf-noncommutative title="Projective Ternary Noncommutativity Witness for Quarter-Turns about Perpendicular Axes" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.phalf_qhalf_noncommutative"}
Inside the zero-axiom library `OmegaMath` (relying solely on `OmegaInit` and `OmegaMath`, with zero axioms), let $p_0 := (1, 0, 0, 0)$, $p_{\mathrm{Half}} := (1, 1, 0, 0)$, and $q_{\mathrm{Half}} := (1, 0, 1, 0)$ in `Quaternion`, with ternary representative $\operatorname{triad}(\mathbf{a}, \mathbf{b}, \mathbf{c}) := (\mathbf{a}\bar{\mathbf{b}})\mathbf{c}$ and projective ray equivalence $\sim_{\mathrm{ray}}$ (`Ternion.RayEquiv`) as in [@thm-ch03-quaternion-norm-and-heap-laws]. Then the two reversed ternary products are not ray-equivalent:

$$
\neg\Bigl(\operatorname{triad}(p_{\mathrm{Half}},\, p_0,\, q_{\mathrm{Half}}) \;\sim_{\mathrm{ray}}\; \operatorname{triad}(q_{\mathrm{Half}},\, p_0,\, p_{\mathrm{Half}})\Bigr).
$$
:::

::: {.proof}
Direct integer quaternion multiplication evaluates $\operatorname{triad}(p_{\mathrm{Half}}, p_0, q_{\mathrm{Half}}) = (1, 1, 1, 1)$ and $\operatorname{triad}(q_{\mathrm{Half}}, p_0, p_{\mathrm{Half}}) = (1, 1, 1, -1)$. Assume for contradiction that `Ternion.RayEquiv` holds, yielding nonzero integers $k, l \in \mathbb{Z} \setminus \{0\}$ such that $k(1, 1, 1, 1) = l(1, 1, 1, -1)$. Comparing the $w$-coordinates gives $k = l$, while comparing the $z$-coordinates gives $k = -l$, hence $l = -l$. Over `Omega.Int` this forces $l = 0$, contradicting $l \neq 0$. Thus the two ternary products lie on distinct projective rays, certifying Law III noncommutativity of `AXIOM-Ω` on $\mathbb{T}_3(\mathbb{Q})$ directly in bare CIC. This declaration depends solely on `OmegaInit` and `OmegaMath` with empty transitive axiom closure. The full proof is checked by the Lean kernel.
:::

## 3.4 The Real-Shadow Completion Boundary: From Rank-Five Embedding to Unit-Quaternion Isomorphism {#sec-ch03-real-shadow-completion}

Before closing Volume I, one final check ties our rational universe to classical geometry: **when our three-dimensional rational ternion skeleton is viewed inside the classical real-analytic shadow, how exactly does it meet the coordinate-free classification of `AXIOM-Ω`?**

On the classical side, `TernaryComparison` already has a real-valued reading and assumes cancellation, associativity, symmetry, separation, nonnegativity, bilateral invariance, and finite Gram positivity for real coefficients. For this carrier, noncommutativity and chain-connectedness alone force every Euclidean feature realization to have dimension at least $5$ (`five_le_of_hasFeatureRank`). Chain-connectedness means that for each $\varepsilon>0$, any two points can be joined by a finite chain with consecutive readings $>1-\varepsilon$. Zero-reaching and a feature realization in $\mathbb{R}^5$ then give the injection below.

::: {.theorem #thm-ch03-rank-five-embedding title="Unit-Quaternion Embedding of Rank-Five Ternary Comparison Systems (Classical Shadow Anchor)" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonRankFive.exists_unitQuaternion_embedding"}
Let $C=(M,\operatorname{tri},\kappa)$ be a real-valued ternary comparison structure as above. Assume it is noncommutative, chain-connected, and zero-reaching (for each $\varepsilon>0$ some pair has $\kappa(x,y)<\varepsilon$). Assume also that there exists $\varphi:M\to\mathbb{R}^5$ with $\kappa(x,y)=\langle\varphi(x),\varphi(y)\rangle$ (`HasFeatureRank 5`). Then there is an injection $u:M\to\mathrm{Sp}(1)$ such that for all $x,y,z\in M$,

$$
u\bigl(\operatorname{tri}(x, y, z)\bigr) \;=\; u(x)\,u(y)^{-1}\,u(z), \qquad \kappa(x, y) \;=\; \frac{1 + \langle u(x), u(y)\rangle_{\mathbb{R}}}{2}.
$$
:::

::: {.proof}
Pass to the span $W \subseteq \mathbb{R}^5$ of the feature map. Left translations extend to isometries of $W$ fixing the unique least-norm point $m \neq 0$ of the closed convex hull of the image. Centering in the orthogonal complement $E = (\mathbb{R} m)^\perp$ (of dimension at most $4$) yields two commuting isometry families for left and right translations; noncommutativity and chain-connectedness force $\dim_{\mathbb{R}} E = 4$ and endow $E$ with quaternionic coordinates, giving an injective map $q : M \to \mathrm{Sp}(1)$ with $\kappa(x, y) = a + (1 - a)\langle q(x), q(y)\rangle$ where $a = \lVert m\rVert^2 < 1$. Zero-reaching forces $a \le \frac{1}{2}$, while powers of unit quaternions driving real parts below $-\operatorname{Re} p$ combined with chain-connectedness force $a \ge \frac{1}{2}$, locking $a = \frac{1}{2}$. Taking $u = \bar{q}$ turns product-reversal into the required ternary homomorphism while preserving the real inner product. This declaration lives on the classical `Mathlib` shadow side; the full proof is checked by the Lean kernel.
:::

The rational unit quaternions $S^3(\mathbb{Q})$ show why the injection may have proper image (hand derivation). Use the real-valued reading $(1+\langle u,v\rangle)/2$ with feature vector $(1,u)/\sqrt{2}$. The pair $\mathbf{i},\mathbf{j}$ witnesses noncommutativity and $\pm1$ gives a zero reading. Rational stereographic parameters are dense in real parameter space, so their images are dense in the real unit sphere. Subdivide a real path joining two endpoints into short segments and approximate the subdivision points by rational unit points to obtain a finite chain at any prescribed precision. This countable group meets all hypotheses of the embedding theorem. The next result also assumes reading completeness (`ReadingComplete`). Whenever $\kappa(x_m,x_n)$ tends to $1$ as both indices tend to infinity, some $a\in M$ must satisfy $\kappa(x_n,a)\to 1$. On the unit quaternion image, this is Cauchy completeness for the chord distance $d_\kappa=2\sqrt{1-\kappa}$.

::: {.theorem #thm-ch03-rank-five-isomorphism title="Unit-Quaternion Isomorphism for Reading-Complete Rank-Five Systems (Classical Shadow Anchor)" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv"}
Under all hypotheses of [@thm-ch03-rank-five-embedding], assume additionally that $C$ is reading-complete (`ReadingComplete C`). Then for every prescribed base point $o \in M$, there exists a bijection $u : M \simeq \mathrm{Sp}(1)$ satisfying $u(o) = 1$ and, for all $x, y, z \in M$,

$$
u\bigl(\operatorname{tri}(x, y, z)\bigr) \;=\; u(x)\,u(y)^{-1}\,u(z), \qquad \kappa(x, y) \;=\; \frac{1 + \langle u(x), u(y)\rangle_{\mathbb{R}}}{2}.
$$
:::

::: {.proof}
Take the embedding of [@thm-ch03-rank-five-embedding] and left-multiply by $u(o)^{-1}$ so that $u(o) = 1$; left multiplication by a unit quaternion preserves both the real inner product and the ternary product, so the image $H$ is a noncommutative, chain-connected subgroup of $\mathrm{Sp}(1)$. By the chord-distance identity $\kappa(a, b) = 1 - \frac{1}{4}\operatorname{dist}(a, b)^2$, any sequence in $H$ converging in $\mathrm{Sp}(1)$ has preimages whose readings tend uniformly to $1$; reading completeness supplies a limit in $M$ whose image is the limit of the sequence, proving $H$ closed in $\mathrm{Sp}(1)$. Every closed, chain-connected, noncommutative subgroup of $\mathrm{Sp}(1)$ equals all of $\mathrm{Sp}(1)$, making $u$ a bijection. This declaration lives on the classical `Mathlib` shadow side; the full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch03-shadow-boundary title="The Exact Division Between Rational Skeleton and Real Shadow (MODEL)"}
Both rank-five theorems start with a real-valued comparison structure. Completeness makes the injective image closed, which yields surjectivity under the shared hypotheses. For the signed rational unit subgroup here, the chord-distance completion is the real unit sphere. Canonical integer ternions use the squared reading of rank $10$ and identify antipodes. Chapter 4 gives the quadratic relation between the two readings on rational unit spinors.
:::

The film below walks through the chapter from the dimension lock to the real-shadow boundary.

::: {.film src="four-integers-one-turn"}
**In two dimensions the bracket must vanish, three dimensions make room for order, and four integers with GCD reduction and a leading positive sign write rational rotations with no radicals and no quotients (2 min 54 s).** In the left plane, the amber candidate bracket $[x, y]$ is orthogonal to both cyan inputs $x$ and $y$ and shrinks to zero (violet, written argument, schematic); on the right, the magenta third axis carries the cross product, and the green tag refers to [@thm-ch03-dim3-cross-bracket] (classical `Mathlib` side). The quarter turn $p_{\mathrm{Half}} = (1, 1, 0, 0)$ has squared norm $2$, yet conjugating by it and dividing by $2$ gives the exact rotation $(x, y, z) \mapsto (x, -z, y)$; $(-2, 2, 2, 2)$ is reduced by $\gcd = 2$ and a sign flip to the canonical name $(1, -1, -1, -1)$ (computed on screen). The green tags for four-square multiplicativity, left ray absorption, the four-dimensional Lagrange identity, and $\kappa \le 1$ refer to [@thm-ch03-quaternion-norm-and-heap-laws] and [@thm-ch03-lagrange-and-kappa-invariance]; the worked values $\lvert(1 + \mathbf{i})(1 + \mathbf{j})\rvert^2 = 4$, $\kappa(p_0, p_{\mathrm{Half}}) = 1/2$, and the six squared minors $1 + 1 + 0 + 1 + 0 + 0 = 3$ are computed on screen. On the cyan triangle, $g_{120} = (1, 1, 1, 1)$ returns to $p_0$ in three beats, while the violet hexagon with signs kept needs six ([@ex-ch03-five-anchors-and-closure], computed on screen). The exact integer rotation matrices of both orders sit beside the quadruples $(1, 1, 1, 1) \neq (1, 1, 1, -1)$; $k = l$ and $k = -l$ force $l = 0$, and the green tag refers to [@thm-ch03-phalf-qhalf-noncommutative]. Finally, rational points of a circle stand in for the gaps left by the rational unit quaternions (hand derivation); reading completeness fills them to $\mathrm{Sp}(1)$, with the green tag referring to [@thm-ch03-rank-five-isomorphism] (classical side), and the rank-$10$ squared reading with antipodal gluing is labeled as the reading of [@rem-ch03-shadow-boundary].
:::

Before closing Volume I, test canonical integer ternion normalization and noncommutativity firsthand in the closing interactive experiment card below: vary the integer quadruple inputs to watch `gcd` reduction together with first-nonzero positive sign locking assign every ray a unique canonical representative without `Quot.sound`, and compare the reversed ternary transports $[p_{\mathrm{Half}}, p_0, q_{\mathrm{Half}}] = (1, 1, 1, 1) \neq (1, 1, 1, -1) = [q_{\mathrm{Half}}, p_0, p_{\mathrm{Half}}]$ splitting cleanly in the fourth coordinate ([@thm-ch03-phalf-qhalf-noncommutative]) with exact rational fidelity readouts.

::: {.viz src="ternion-cayley-lab" preset="canonical-ternion-noncomm" height="520"}
**Interactive canonical integer ternion normalization and noncommutativity witness.** Explore `gcd` reduction and leading-positive sign normalization (`norm`), inspect the order-sensitive split $[p_{\mathrm{Half}}, p_0, q_{\mathrm{Half}}] = (1, 1, 1, 1) \neq (1, 1, 1, -1) = [q_{\mathrm{Half}}, p_0, p_{\mathrm{Half}}]$, step through the three-beat projective closure of $g_{120} = (1, 1, 1, 1)$, and read exact rational fidelities $\kappa_{\mathrm{proj}}$; the proofs are in [@thm-ch03-quaternion-norm-and-heap-laws] and [@thm-ch03-lagrange-and-kappa-invariance], with hand calculations in [@ex-ch03-five-anchors-and-closure].
:::

Volume I is now complete: bare CIC, the observer precision contract $\varepsilon_{\mathrm{self}} = 1/M$, the model laws of AXIOM-Ω, the zero-axiom projective circle $\mathbb{QP}^1$, and the canonical integer ternion manifold $\mathbb{T}_3(\mathbb{Q}) \cong \mathbb{QP}^3$ are all in place. In Volume II, starting with [Chapter 4](ch04-heaps-and-lie-triple-curvature.md), we dissect origin-free heaps, Lie triple curvature, and the signed spinor double cover—bringing the rank-$5$ signed spinor geometry itself directly into zero-axiom integer arithmetic.
