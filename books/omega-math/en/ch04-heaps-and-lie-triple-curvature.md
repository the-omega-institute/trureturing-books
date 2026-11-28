# Chapter 4 Origin-Free Heaps, Lie Triple Curvature, and Signed Spinor Double Covers

> *"What a curved sphere rejects is never algebraic rigor, but the flat obsession with a privileged origin and parallelogram addition; once binary addition yields to origin-free ternary transport, and unsigned overlap yields to the signed spinor cover, curvature and spin cease to be coordinate patches and emerge as the native skeleton of algebra itself."*

In Volume I ([Chapter 1](ch01-axiom-omega-and-cic.md) through [Chapter 3](ch03-canonical-ternion-manifold.md)), we built a zero-axiom, infinity-free, transcendental-free arithmetic from bare CIC using homogeneous projective pairs and canonical integer quaternions. Yet the moment one tries to do algebra directly on this curved three-dimensional carrier, two habits inherited from flat linear algebra break down. First, vector addition $\mathbf{a} + \mathbf{b}$ silently presupposes a privileged origin $\mathbf{0}$ and flat tangent superposition: adding two points on the unit sphere immediately pierces the shell. Second, the projective reading on integer quaternions identifies $p$ and $-p$. It therefore loses the $720^\circ$ period of a signed spinor.

This chapter resolves both obstructions and lays the nonlinear rational foundation of Volume II. We abolish origin-dependent flat addition in favor of origin-free heaps and their anchored group decompositions; we pass from first-order commutators to the second-order "relation of relations"—the Lie triple system bracket—locking its three algebraic axioms (antisymmetry, Jacobi/Bianchi, and ternary derivation) and constant unit sectional curvature $K \equiv +1$ via zero-axiom kernel theorems in `OmegaInit` and `OmegaMath` without Christoffel symbols or charts; we establish the exact algebraic separation between projective ray feature rank $10$ and signed primitive Pythagorean spinor (`PythSpinor`) feature rank $5$, certifying the Pythagorean norm closure of the stereographic Cayley lift, the universal quadratic kernel bridge, and the six-beat $720^\circ$ double-cover orbit witness of `g120_spin` as zero-axiom kernel theorems; and we close by anchoring the spinor ray kernel, Hopf projection, and bilateral two-point homogeneity to frozen classical-shadow kernel theorems.

## 4.1 Abolishing Flat Addition: Origin-Free Heaps and Anchored Groups

In flat Euclidean space $\mathbb{R}^n$, binary addition $\mathbf{a} + \mathbf{b}$ is treated as primitive. Yet without first pinning down an external origin $\mathbf{0}$, the sum $\mathbf{a} + \mathbf{b}$ has no geometric meaning: shifting the origin by $\mathbf{t}$ shifts the sum by $2\mathbf{t}$. Only the ternary affine combination $\mathbf{a} - \mathbf{b} + \mathbf{c}$ is invariant under arbitrary translation, because it extracts the relative displacement from $\mathbf{b}$ to $\mathbf{a}$ and transports it onto $\mathbf{c}$.

On a curved noncommutative three-sphere, flat subtraction and addition disappear, replaced by the **origin-free heap** (or torsor) developed by H. Prüfer (1924), R. Baer (1929), and J. Certaine (1943). Without any external base point, the primitive operation is ternary comparison transport $[\mathbf{a}, \mathbf{b}, \mathbf{c}]$: taking $\mathbf{b}$ as a local relay bridge, it transfers the curved relation of $\mathbf{a}$ relative to $\mathbf{b}$ losslessly onto $\mathbf{c}$.

::: {.definition #def-ch04-origin-free-heap title="Origin-Free Heap and Ternary Comparison Structure"}
Let $\mathcal{M}$ be a nonempty set. A ternary operation $[-, -, -] : \mathcal{M}^3 \to \mathcal{M}$ is a **heap** operation if it satisfies the left and right Mal'cev cancellation laws and outer associativity for all $x, y, z, u, v \in \mathcal{M}$:

$$
[x, x, z] = z, \qquad [x, z, z] = x, \qquad \bigl[[x, y, z],\, u,\, v\bigr] = \bigl[x,\, y,\, [z, u, v]\bigr].
$$

If $\mathcal{M}$ is further equipped with a symmetric map $\kappa : \mathcal{M}^2 \to \mathbb{R}$ satisfying extensional separation $\kappa(x, y) = 1 \iff x = y$, nonnegativity $\kappa(x, y) \ge 0$, bilateral transport invariance $\kappa([x, u, v], [y, u, v]) = \kappa([u, v, x], [u, v, y]) = \kappa(x, y)$, and Gram positive semidefiniteness $\sum_{i,j} c_i c_j \kappa(x_i, x_j) \ge 0$ for all finite tuples and real coefficients, then $(\mathcal{M}, [-, -, -], \kappa)$ is called a **ternary comparison structure**.
:::

This ternary syntax eliminates every privilege attached to an identity element $\mathbf{1}$: all points of $\mathcal{M}$ stand on equal footing. Only when an observer designates a temporary anchor $o \in \mathcal{M}$ does the heap induce an ordinary group `groupAt o`, in which both the ternary operation and iterated heap reflections collapse into exact algebraic identities.

::: {.theorem #thm-ch04-anchored-heap-and-reflection title="Anchored Group Decomposition and Iterated Heap Reflection Powers" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow"}
Let $(\mathcal{M}, [-, -, -], \kappa)$ be a ternary comparison structure and choose any anchor $o \in \mathcal{M}$. Define $x \star_o z := [x, o, z]$ and $x^{-1_o} := [o, x, o]$. Then $(\mathcal{M}, \star_o, o)$ is a group with identity $o$ (denoted `groupAt o`), and two identities hold unconditionally:

1. **Anchored group decomposition** ([`tri_eq_mul_inv_mul`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul)): for all $x, y, z \in \mathcal{M}$,

   $$
   [x, y, z] = x \star_o y^{-1_o} \star_o z.
   $$

2. **Iterated reflection equals anchored powers** ([`reflectionSeq_eq_pow`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow)): for any $a, b \in \mathcal{M}$, define $x_0 := a$, $x_1 := b$, and $x_{n+2} := [x_{n+1}, x_n, x_{n+1}]$ for $n \in \mathbb{N}$. Then in the anchored group `groupAt a`, for every $n \in \mathbb{N}$,

   $$
   x_n = b^n.
   $$
:::

::: {.proof}
First verify the group axioms for `groupAt o`: identity laws are $[o, o, z] = z$ and $[x, o, o] = x$; associativity is outer associativity $[[x, o, y], o, z] = [x, o, [y, o, z]]$; right and left inverses follow from

$$
x \star_o x^{-1_o} = \bigl[x, o, [o, x, o]\bigr] = \bigl[[x, o, o], x, o\bigr] = [x, x, o] = o,
$$

$$
x^{-1_o} \star_o x = \bigl[[o, x, o], o, x\bigr] = \bigl[o, x, [o, o, x]\bigr] = [o, x, x] = o.
$$

The anchored decomposition follows immediately:

$$
x \star_o y^{-1_o} \star_o z = \bigl[x, o, [[o, y, o], o, z]\bigr] = \bigl[x, o, [o, y, [o, o, z]]\bigr] = \bigl[x, o, [o, y, z]\bigr] = \bigl[[x, o, o], y, z\bigr] = [x, y, z].
$$

For part 2, induct on $n$ in `groupAt a`: $x_0 = a = b^0$ and $x_1 = b = b^1$; assuming the claim for $n$ and $n + 1$, part 1 yields

$$
x_{n+2} = [x_{n+1}, x_n, x_{n+1}] = b^{n+1} \star_a (b^n)^{-1_a} \star_a b^{n+1} = b^{n+2}.
$$

The full proof is checked by the Lean kernel.
:::

Look at the geometric force of part 2 of [@thm-ch04-anchored-heap-and-reflection]: the recurrence $x_{n+1} = [x_n, x_{n-1}, x_n]$ uses no coordinates, angles, derivatives, or external origin, yet propagates a single step into an entire equally spaced geodesic orbit $b^0, b^1, b^2, \dots$. On integer quaternions, $[\mathbf{a}, \mathbf{b}, \mathbf{c}] = \mathbf{a}\bar{\mathbf{b}}\mathbf{c}$ involves only integer arithmetic, and multiplicativity of the four-square norm guarantees $\lVert\mathbf{a}\bar{\mathbf{b}}\mathbf{c}\rVert^2 = \lVert\mathbf{a}\rVert^2\lVert\mathbf{b}\rVert^2\lVert\mathbf{c}\rVert^2 \ge 1$, so transport never collapses to zero. Origin-freedom does not mean commutativity: for $\mathbf{i} = (0, 1, 0, 0)$, $\mathbf{j} = (0, 0, 1, 0)$, and $\mathbf{1} = (1, 0, 0, 0)$, we have $[\mathbf{i}, \mathbf{1}, \mathbf{j}] = +\mathbf{k} \neq -\mathbf{k} = [\mathbf{j}, \mathbf{1}, \mathbf{i}]$, preserving non-abelian handedness completely.

## 4.2 From First-Order Commutators to Lie Triple Curvature

Fixing any local base point on the heap exposes its tangent space as the three-dimensional pure imaginary rational space $\operatorname{Im}\mathbb{H}(\mathbb{Q}) \cong \mathbb{Q}^3$. Multiplying two pure imaginary elements $\mathbf{u}, \mathbf{v} \in \mathbb{Q}^3$ fuses their symmetric inner product with their antisymmetric cross product:

$$
\mathbf{u}\mathbf{v} = -\langle\mathbf{u}, \mathbf{v}\rangle\,\mathbf{1} + \mathbf{u} \times \mathbf{v}.
$$

Pure imaginary vectors are not closed under ordinary multiplication because the scalar part $-\langle\mathbf{u}, \mathbf{v}\rangle$ escapes the tangent space. Taking the antisymmetric difference cancels the scalar part identically and yields the closed **first-order commutator**:

$$
[\mathbf{u}, \mathbf{v}] := \mathbf{u}\mathbf{v} - \mathbf{v}\mathbf{u} = 2(\mathbf{u} \times \mathbf{v}) \in \mathbb{Q}^3.
$$

Geometrically, $[\mathbf{u}, \mathbf{v}]$ is strictly orthogonal to both $\mathbf{u}$ and $\mathbf{v}$ ($\langle[\mathbf{u}, \mathbf{v}], \mathbf{u}\rangle = \langle[\mathbf{u}, \mathbf{v}], \mathbf{v}\rangle = 0$), encoding the oriented third-axis area relation generated by reversing the order of two non-collinear directions. Yet a single first-order commutator records only the bivector twist between $\mathbf{u}$ and $\mathbf{v}$; it has not yet acted back on a third tangent vector $\mathbf{w}$.

Comparing the first-order relation $[\mathbf{u}, \mathbf{v}]$ once more with a third direction $\mathbf{w}$—forming a second-order **"relation of relations"**—directly produces the **Lie triple system bracket** of É. Cartan (1926) and N. Jacobson (1949).

::: {.definition #def-ch04-lie-triple-bracket title="Lie Triple System Curvature Bracket"}
On the three-dimensional rational tangent space $\mathbb{Q}^3$ with standard inner product $\langle\cdot, \cdot\rangle$ and cross product $\times$, define the ternary bracket $\{\cdot, \cdot, \cdot\} : (\mathbb{Q}^3)^3 \to \mathbb{Q}^3$ as the normalized iterated commutator:

$$
\{\mathbf{u}, \mathbf{v}, \mathbf{w}\} := \frac{1}{4}\bigl[[\mathbf{u}, \mathbf{v}],\, \mathbf{w}\bigr] = (\mathbf{u} \times \mathbf{v}) \times \mathbf{w} = \langle\mathbf{u}, \mathbf{w}\rangle\,\mathbf{v} - \langle\mathbf{v}, \mathbf{w}\rangle\,\mathbf{u}.
$$
:::

The cited D5 declarations record `strict_omega.axioms: []`. Pure imaginary tangent directions are represented by integer three-vectors `Vec3` ($\mathbb{Z}^3$), with the first-order commutator written `commutator u v` $= 2(\mathbf{u} \times \mathbf{v})$ and the Lie triple bracket defined purely polynomially by `lieTriple u v w` $:= \langle\mathbf{u}, \mathbf{w}\rangle\mathbf{v} - \langle\mathbf{v}, \mathbf{w}\rangle\mathbf{u}$. Without a single analytic or real-number axiom, all three Cartan–Jacobson axioms defining a Lie triple system close directly in bare CIC.

::: {.theorem #thm-ch04-lie-triple-axioms title="Lie Triple System Axioms for the Curvature Bracket" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_antisymm D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_jacobi D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_derivation"}
The cited D5 declarations record `strict_omega.axioms: []`. Write $\{\mathbf{u}, \mathbf{v}, \mathbf{w}\} := \operatorname{lieTriple}(\mathbf{u}, \mathbf{v}, \mathbf{w}) = \langle\mathbf{u}, \mathbf{w}\rangle\,\mathbf{v} - \langle\mathbf{v}, \mathbf{w}\rangle\,\mathbf{u}$ on the integer three-vector carrier `Vec3`. Then for all $\mathbf{x}, \mathbf{y}, \mathbf{u}, \mathbf{v}, \mathbf{w} : \mathrm{Vec3}$, three exact identities hold unconditionally:

1. **Antisymmetry in the first two slots** ([`lieTriple_antisymm`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_antisymm)):

   $$
   \{\mathbf{u}, \mathbf{v}, \mathbf{w}\} = -\{\mathbf{v}, \mathbf{u}, \mathbf{w}\}.
   $$

2. **Cyclic Jacobi–Bianchi identity** ([`lieTriple_jacobi`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_jacobi)):

   $$
   \{\mathbf{u}, \mathbf{v}, \mathbf{w}\} + \{\mathbf{v}, \mathbf{w}, \mathbf{u}\} + \{\mathbf{w}, \mathbf{u}, \mathbf{v}\} = \mathbf{0}.
   $$

3. **Ternary derivation law** ([`lieTriple_derivation`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_derivation)):

   $$
   \bigl\{\mathbf{x}, \mathbf{y}, \{\mathbf{u}, \mathbf{v}, \mathbf{w}\}\bigr\}
   = \bigl\{\{\mathbf{x}, \mathbf{y}, \mathbf{u}\}, \mathbf{v}, \mathbf{w}\bigr\}
   + \bigl\{\mathbf{u}, \{\mathbf{x}, \mathbf{y}, \mathbf{v}\}, \mathbf{w}\bigr\}
   + \bigl\{\mathbf{u}, \mathbf{v}, \{\mathbf{x}, \mathbf{y}, \mathbf{w}\}\bigr\}.
   $$
:::

::: {.proof}
Geometrically, fixing $(\mathbf{x}, \mathbf{y})$ defines the linear endomorphism $D_{\mathbf{x}, \mathbf{y}}(\mathbf{w}) := \{\mathbf{x}, \mathbf{y}, \mathbf{w}\}$, which is skew-symmetric with respect to the inner product because $\langle D_{\mathbf{x}, \mathbf{y}}\mathbf{a}, \mathbf{b}\rangle = \langle\mathbf{x}, \mathbf{a}\rangle\langle\mathbf{y}, \mathbf{b}\rangle - \langle\mathbf{y}, \mathbf{a}\rangle\langle\mathbf{x}, \mathbf{b}\rangle = -\langle\mathbf{a}, D_{\mathbf{x}, \mathbf{y}}\mathbf{b}\rangle$; hence $D_{\mathbf{x}, \mathbf{y}} \in \mathfrak{so}(3)$ preserves the inner product infinitesimally and acts as a derivation on every bracket built from it. Inside the zero-axiom `OmegaMath` kernel, all three identities are certified componentwise by multivariate integer polynomial normalization (`PolyVec` and `Expr.sound`) reducing to `Eq.refl`, with empty transitive axiom closure. The full proof is checked by the Lean kernel.
:::

This purely polynomial bracket reproduces the bi-invariant Riemannian curvature tensor of the unit three-sphere verbatim (manual derivation): on $S^3 \cong \mathrm{SU}(2)$, the bi-invariant Levi-Civita connection on left-invariant vector fields is $\nabla_X Y = \frac{1}{2}[X, Y]$. Under the convention $R(X, Y)Z := \nabla_{[X, Y]}Z - [\nabla_X, \nabla_Y]Z$, expanding and applying the Jacobi identity $-[X, [Y, Z]] + [Y, [X, Z]] = -[[X, Y], Z]$ gives

$$
R(X, Y)Z = \frac{1}{2}\bigl[[X, Y], Z\bigr] - \frac{1}{4}\bigl[X, [Y, Z]\bigr] + \frac{1}{4}\bigl[Y, [X, Z]\bigr] = \frac{1}{4}\bigl[[X, Y], Z\bigr] = \{X, Y, Z\}.
$$

Under the opposite sign convention also common in differential geometry, $R_{\mathrm{alt}}(X, Y)Z := [\nabla_X, \nabla_Y]Z - \nabla_{[X, Y]}Z = -\{X, Y, Z\}$, the sectional curvature numerator swaps the last two arguments and reverses sign: $\langle R_{\mathrm{alt}}(X, Y)Y, X\rangle = -\langle\{X, Y, Y\}, X\rangle = \langle\{X, Y, X\}, Y\rangle$. The next zero-axiom theorem locks both contraction signs on `Vec3` and certifies exact unit sectional curvature $K \equiv +1$ on every nondegenerate rational two-plane in `RatVec3` without charts or Christoffel symbols.

::: {.theorem #thm-ch04-lie-triple-sectional-curvature title="Constant Unit Sectional Curvature and Reversed-Slot Sign Law" lean="D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_sectional_curvature_reversed D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_sectional_ratio"}
The cited D5 declarations record `strict_omega.axioms: []`. Define the integer squared Gram area $\operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v}) := \langle\mathbf{u}, \mathbf{u}\rangle\langle\mathbf{v}, \mathbf{v}\rangle - \langle\mathbf{u}, \mathbf{v}\rangle^2 \in \mathbb{Z}$ for $\mathbf{u}, \mathbf{v} : \mathrm{Vec3}$. For rational three-vectors `u, v : RatVec3` with integer numerators `u.num, v.num : Vec3` and strictly positive denominators `u.den, v.den`, define in `Omega.IntRatio` the squared Gram area $\operatorname{rationalGramAreaSq}(\mathbf{u}, \mathbf{v})$ and curvature numerator $\operatorname{rationalCurvatureNumerator}(\mathbf{u}, \mathbf{v}) := \langle\{\mathbf{u}.\mathrm{num}, \mathbf{v}.\mathrm{num}, \mathbf{u}.\mathrm{num}\}, \mathbf{v}.\mathrm{num}\rangle / (u.\mathrm{den}\cdot v.\mathrm{den})^2$ over the shared denominator $(u.\mathrm{den}\cdot v.\mathrm{den})^2$. Then three exact laws hold unconditionally:

1. **Positive unit sectional curvature contraction** ([`lieTriple_unit_sectional_curvature`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_unit_sectional_curvature)): for all $\mathbf{u}, \mathbf{v} : \mathrm{Vec3}$,

   $$
   \bigl\langle\{\mathbf{u}, \mathbf{v}, \mathbf{u}\},\, \mathbf{v}\bigr\rangle = \operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v}).
   $$

2. **Reversed-slot sign negation** ([`lieTriple_sectional_curvature_reversed`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_sectional_curvature_reversed)): for all $\mathbf{u}, \mathbf{v} : \mathrm{Vec3}$,

   $$
   \bigl\langle\{\mathbf{u}, \mathbf{v}, \mathbf{v}\},\, \mathbf{u}\bigr\rangle = -\operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v}).
   $$

3. **Constant unit sectional curvature on every nondegenerate rational plane** ([`lieTriple_sectional_ratio`](lean:D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.lieTriple_sectional_ratio)): for all `u, v : RatVec3` satisfying $\operatorname{gramAreaSq}(u.\mathrm{num}, v.\mathrm{num}) \neq 0$, under `Omega.IntRatio.Equivalent`,

   $$
   \operatorname{rationalCurvatureNumerator}(\mathbf{u}, \mathbf{v}) \cdot \bigl(\operatorname{rationalGramAreaSq}(\mathbf{u}, \mathbf{v})\bigr)^{-1} \;\equiv\; 1.
   $$
:::

::: {.proof}
Expanding the bracket directly gives $\langle\{\mathbf{u}, \mathbf{v}, \mathbf{u}\}, \mathbf{v}\rangle = \langle\langle\mathbf{u}, \mathbf{u}\rangle\mathbf{v} - \langle\mathbf{v}, \mathbf{u}\rangle\mathbf{u},\, \mathbf{v}\rangle = \langle\mathbf{u}, \mathbf{u}\rangle\langle\mathbf{v}, \mathbf{v}\rangle - \langle\mathbf{u}, \mathbf{v}\rangle^2 = \operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v})$, while swapping the last two slots gives $\langle\{\mathbf{u}, \mathbf{v}, \mathbf{v}\}, \mathbf{u}\rangle = \langle\mathbf{u}, \mathbf{v}\rangle^2 - \langle\mathbf{v}, \mathbf{v}\rangle\langle\mathbf{u}, \mathbf{u}\rangle = -\operatorname{gramAreaSq}(\mathbf{u}, \mathbf{v})$; both integer identities close in one step by multivariate polynomial normalization (`PolyVec.sound` and `Eq.refl`). For part 3, both the curvature contraction and the squared Gram area are quadratic in each input and share the strictly positive denominator $(u.\mathrm{den}\cdot v.\mathrm{den})^2$; substituting part 1 identifies the numerator of `rationalCurvatureNumerator u v` with `gramAreaSq u.num v.num`, and the nondegeneracy hypothesis $\operatorname{gramAreaSq}(u.\mathrm{num}, v.\mathrm{num}) \neq 0$ triggers `IntRatio.mul_inv_cancel` to conclude equivalence with $1$ in `Omega.IntRatio.Equivalent` with zero axioms. The full proof is checked by the Lean kernel.
:::

Geometrically, setting $\mathbf{w} = \mathbf{u}$ produces $\{\mathbf{u}, \mathbf{v}, \mathbf{u}\} = \lVert\mathbf{u}\rVert^2\mathbf{v} - \langle\mathbf{u}, \mathbf{v}\rangle\mathbf{u}$, projecting out the component collinear with $\mathbf{u}$ to isolate the pure transverse geodesic deflection; the next example audits [@thm-ch04-lie-triple-axioms] and [@thm-ch04-lie-triple-sectional-curvature] explicitly on two non-orthogonal integer vectors.

::: {.example #ex-ch04-lie-triple-sectional-curvature title="Purely Rational Hand Check of the Lie Triple Bracket and K = +1"}
Take two non-orthogonal integer tangent vectors $\mathbf{u} = (1, 1, 0)$ and $\mathbf{v} = (1, 0, 2)$ in $\mathbb{Q}^3$, together with a test vector $\mathbf{w} = (0, 1, 1)$:

1. **First-order commutator**: $\mathbf{u} \times \mathbf{v} = (2, -2, -1)$, so $[\mathbf{u}, \mathbf{v}] = (4, -4, -2)$, which satisfies $\langle[\mathbf{u}, \mathbf{v}], \mathbf{u}\rangle = 4 - 4 = 0$ and $\langle[\mathbf{u}, \mathbf{v}], \mathbf{v}\rangle = 4 - 4 = 0$.
2. **Second-order Lie triple bracket**: from $\langle\mathbf{u}, \mathbf{w}\rangle = 1$ and $\langle\mathbf{v}, \mathbf{w}\rangle = 2$,

   $$
   \{\mathbf{u}, \mathbf{v}, \mathbf{w}\} = 1\cdot(1, 0, 2) - 2\cdot(1, 1, 0) = (-1, -2, 2),
   $$

   matching direct cross multiplication $(\mathbf{u}\times\mathbf{v})\times\mathbf{w} = (2, -2, -1)\times(0, 1, 1) = (-1, -2, 2)$ entry by entry.
3. **Algebraic Bianchi cancellation**: computing $\{\mathbf{v}, \mathbf{w}, \mathbf{u}\} = 1\cdot(0, 1, 1) - 1\cdot(1, 0, 2) = (-1, 1, -1)$ and $\{\mathbf{w}, \mathbf{u}, \mathbf{v}\} = 2\cdot(1, 1, 0) - 1\cdot(0, 1, 1) = (2, 1, -1)$, the cyclic sum is $(-1-1+2, -2+1+1, 2-1-1) = (0, 0, 0)$.
4. **Rational sectional curvature**: $\{\mathbf{u}, \mathbf{v}, \mathbf{u}\} = 2(1, 0, 2) - 1(1, 1, 0) = (1, -1, 4)$, whose inner product with $\mathbf{v}$ is $1 + 0 + 8 = 9$, while the squared area is $\lVert\mathbf{u}\rVert^2\lVert\mathbf{v}\rVert^2 - \langle\mathbf{u}, \mathbf{v}\rangle^2 = 2\cdot 5 - 1^2 = 9$; their ratio is identically $K(\mathbf{u}, \mathbf{v}) = \frac{9}{9} = 1$, with neither charts nor Christoffel symbols anywhere in sight.
:::

## 4.3 Exact Separation of Projective Rank 10 and Signed Spinor Rank 5

Moving from the local tangent space back to the global spherical carrier reveals a sharp structural split inside zero-axiom rational geometry: **the projective ray carrier `ProjTernion` has feature rank $10$, whereas the signed double-cover spinor carrier preserving $720^\circ$ sign memory has feature rank exactly $5$.** Understanding this exact factor of two clarifies how canonical integer rays from [Chapter 3](ch03-canonical-ternion-manifold.md) relate to the minimal-rank lock of the mother axiom.

### 4.3.1 The Projective Ray Kernel and Its 10×10 Gram Witness

For nonzero rational quadruples $p, q \in \mathbb{Q}^4 \setminus \{\mathbf{0}\}$ modulo nonzero scaling (hence modulo $p \sim -p$), the rational projective fidelity is

$$
\kappa_{\mathrm{proj}}(p, q) := \frac{\langle p, q\rangle^2}{\lVert p\rVert^2\,\lVert q\rVert^2} \in \mathbb{Q} \cap [0, 1].
$$

To determine its exact feature rank, assign to each nonzero ray its rank-one symmetric orthogonal projector $P(p) := \frac{p p^\top}{\lVert p\rVert^2} \in \operatorname{Sym}_4(\mathbb{Q})$. Expanding the matrix trace gives a linear feature representation:

$$
\kappa_{\mathrm{proj}}(p, q) = \operatorname{Tr}\bigl(P(p)\,P(q)\bigr).
$$

Because the space $\operatorname{Sym}_4(\mathbb{Q})$ of $4 \times 4$ symmetric matrices has $4$ diagonal slots and $\binom{4}{2} = 6$ off-diagonal slots, its dimension is $4 + 6 = 10$, and the trace pairing $\operatorname{Tr}(AB)$ is strictly positive definite ($\operatorname{Tr}(A^2) = \sum_{i,j} A_{ij}^2 > 0$ for every $A \neq 0$). Consequently, every finite projective Gram matrix $G^{\mathrm{proj}}_{ij} = \kappa_{\mathrm{proj}}(p_i, p_j)$ satisfies $\operatorname{rank}(G^{\mathrm{proj}}) \le 10$.

This upper bound of $10$ is attained explicitly by ten integer rays: the four coordinate axes $e_1, e_2, e_3, e_4$ and the six pairwise diagonals $e_i + e_j$ ($1 \le i < j \le 4$). In the orthonormal basis $\{E_{ii}\}_{i=1}^4 \cup \bigl\{\frac{E_{ij}+E_{ji}}{\sqrt{2}}\bigr\}_{1 \le i < j \le 4}$ of $\operatorname{Sym}_4(\mathbb{Q})$, the first four projectors are $E_{11}, E_{22}, E_{33}, E_{44}$, while the remaining six take the form

$$
P(e_i + e_j) = \frac{1}{2}E_{ii} + \frac{1}{2}E_{jj} + \frac{1}{\sqrt{2}}\cdot\frac{E_{ij} + E_{ji}}{\sqrt{2}}.
$$

Collecting these ten coordinate columns forms the block upper-triangular matrix $M = \bigl(\begin{smallmatrix} I_4 & A \\ 0 & 2^{-1/2} I_6 \end{smallmatrix}\bigr)$. The leading principal minors of $G^{\mathrm{proj}}_{10} = M^\top M$ are simply the squared leading minors of $M$, namely $1, 1, 1, 1, \frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{16}, \frac{1}{32}, \frac{1}{64}$, yielding the exact positive determinant

$$
\det G^{\mathrm{proj}}_{10} = (\det M)^2 = \left(\frac{1}{8}\right)^2 = \frac{1}{64} > 0.
$$

Appending an eleventh ray $p_{11} = (1, 1, 1, 1)$ satisfies the exact rational linear relation $P(p_{11}) = \frac{1}{2}\sum_{1 \le i < j \le 4} P(e_i + e_j) - \frac{1}{2}\sum_{i=1}^4 P(e_i)$, forcing $\det G^{\mathrm{proj}}_{11} = 0$. The projective ray kernel therefore has exact feature rank $10$.

### 4.3.2 Primitive Pythagorean Spinors, Stereographic Cayley Lift, and Rank 5

The projective kernel has rank $10$ because $\kappa_{\mathrm{proj}}$ is quadratic in the inner product and reads $p$ and $-p$ as one ray. The signed reading on $S^3(\mathbb{Q})$ keeps the two antipodes distinct and has rank $5$. Rational unit spinors double-cover the rotations that admit rational unit lifts. A Pythagorean spinor stores a numerator and positive denominator so that arithmetic on this layer stays integral.

::: {.definition #def-ch04-pyth-spinor-and-bridge title="Primitive Pythagorean Spinors PythSpinor, Stereographic Cayley Lift, and Quadratic Bridge"}
1. **Carrier `PythSpinor`**: the set of signed integer quintuples

   $$
   (w, x, y, z;\, r) \in \mathbb{Z}^4 \times \mathbb{Z}_{>0}, \qquad w^2 + x^2 + y^2 + z^2 = r^2, \qquad \gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert, r) = 1.
   $$

   Each quintuple uniquely encodes the signed rational unit quaternion $v = \frac{1}{r}(w, x, y, z) \in S^3(\mathbb{Q})$, strictly separating $(p;\, r)$ from its antipode $(-p;\, r)$ while keeping $r > 0$. The carrier is closed under quaternion multiplication, conjugation, and heap transport $[a, b, c] = a\bar{b}c$ followed by division by the five-entry positive greatest common divisor.
2. **Stereographic Cayley lift $\Phi$**: for any nonzero integer quadruple $(a, b, c, d) \in \mathbb{Z}^4 \setminus \{\mathbf{0}\}$ with $s := b^2 + c^2 + d^2$, define

   $$
   \Phi(a, b, c, d) := \operatorname{reduce}\bigl(a^2 - s,\; 2ab,\; 2ac,\; 2ad;\; a^2 + s\bigr) \in \mathrm{PythSpinor},
   $$

   where $\operatorname{reduce}$ divides all five entries by their positive greatest common divisor.
3. **Signed spinor kernel and quadratic bridge**: for $u_1 = (p_1;\, r_1)$ and $u_2 = (p_2;\, r_2)$ in `PythSpinor`, define

   $$
   \kappa_{\mathrm{spin}}(u_1, u_2) := \frac{r_1 r_2 + \langle p_1, p_2\rangle}{2 r_1 r_2} \in \mathbb{Q} \cap [0, 1].
   $$
:::

The polynomial identity $(a^2 - s)^2 + 4a^2(b^2 + c^2 + d^2) = (a^2 - s)^2 + 4a^2 s = (a^2 + s)^2$ guarantees that every image $\Phi(a, b, c, d)$ lies on $S^3(\mathbb{Q})$. Conversely, any spinor $(w, x, y, z;\, r)$ other than the south pole $(-1, 0, 0, 0;\, 1)$ has $r + w > 0$; feeding $(a, b, c, d) = (r + w, x, y, z)$ gives $s = r^2 - w^2 = (r - w)(r + w)$, hence $a^2 - s = 2w(r + w)$ and $a^2 + s = 2r(r + w)$, which reduces back to $(w, x, y, z;\, r)$. Every nonzero input with $a = 0$ maps to the south pole $(-1, 0, 0, 0;\, 1)$, so $\Phi$ surjects onto all of $S^3(\mathbb{Q})$.

Writing $v_i = p_i / r_i \in S^3(\mathbb{Q})$, the signed spinor kernel is immediately a linear inner product in five-dimensional rational space $\mathbb{Q}^5$:

$$
\kappa_{\mathrm{spin}}(u_1, u_2) = \frac{1}{2}\bigl\langle (1, v_1),\, (1, v_2)\bigr\rangle_{\mathbb{Q}^5},
$$

capping the rank of every finite spinor Gram matrix universally at **$5$**. Because $p_i \cdot p_i = r_i^2$, the linear rescale $2\kappa_{\mathrm{spin}}(u_1, u_2) - 1 = \frac{\langle p_1, p_2\rangle}{r_1 r_2}$ squares directly to the projective kernel without square roots, establishing the **universal quadratic kernel bridge**:

$$
\kappa_{\mathrm{proj}}(p_1, p_2) = \frac{\langle p_1, p_2\rangle^2}{r_1^2 r_2^2} = \bigl(2\kappa_{\mathrm{spin}}(u_1, u_2) - 1\bigr)^2.
$$

When $u_2 = -u_1$, the signed spinor kernel drops cleanly to $\kappa_{\mathrm{spin}} = 0$, whereas the quadratic bridge maps it to $(2\cdot 0 - 1)^2 = 1$, explaining algebraically why the projective quotient merges antipodal spinors.

Neither the norm closure of the stereographic Cayley lift nor the universal quadratic kernel bridge requires a single real-analytic postulate: inside the zero-axiom library `OmegaMath`, formalizing `PythSpinor` as a signed integer quintuple $(\mathbf{p};\, r)$ carrying a strictly positive radius and the Pythagorean norm certificate (without needing GCD coprimality inside the underlying structure), the next two zero-axiom frozen theorems lock both identities directly in bare CIC:

::: {.theorem #thm-ch04-pythspinor-lift-and-quadratic-bridge title="Pythagorean Norm Closure of the Stereographic Cayley Lift and the Universal Quadratic Kernel Bridge" lean="D5/S3/Quantum/AURICOmega/OmegaTernionHeap.lift_normSq D5/S3/Quantum/AURICOmega/OmegaTernionHeap.quadratic_kernel"}
Inside the zero-axiom library `OmegaMath` (relying solely on `OmegaInit` and `OmegaMath`, with zero axioms), represent a signed Pythagorean spinor $p = (\mathbf{p};\, r_p) : \mathrm{PythSpinor}$ by an integer quaternion numerator $\mathbf{p} = p.\mathrm{num} : \mathrm{Quaternion}$, a strictly positive natural radius $r_p = p.\mathrm{radius} \in \mathbb{N}_{>0}$, and the norm certificate $\lVert\mathbf{p}\rVert^2 = r_p^2$. For arbitrary integers $a, b, c, d \in \mathbb{Z}$, set $s := b^2 + c^2 + d^2$ and define the unreduced stereographic Cayley numerator and natural radius

$$
\operatorname{liftNum}(a, b, c, d) \;:=\; \bigl(a^2 - s,\; 2ab,\; 2ac,\; 2ad\bigr), \qquad \operatorname{liftRadius}(a, b, c, d) \;:=\; \lvert a\rvert^2 + \lvert b\rvert^2 + \lvert c\rvert^2 + \lvert d\rvert^2 \;\in\; \mathbb{N}.
$$

For $p = (\mathbf{p};\, r_p)$ and $q = (\mathbf{q};\, r_q) : \mathrm{PythSpinor}$, define the `Omega.IntRatio`-valued signed spinor kernel $\kappa_{\mathrm{spin}}(p, q) := \operatorname{IntRatio.value}\bigl(r_p r_q + \langle\mathbf{p}, \mathbf{q}\rangle,\, 2 r_p r_q\bigr)$ and projective ray kernel $\kappa_{\mathrm{proj}}(p, q) := \kappa(\mathbf{p}, \mathbf{q}) = \operatorname{IntRatio.value}\bigl(\langle\mathbf{p}, \mathbf{q}\rangle^2,\, \lVert\mathbf{p}\rVert^2\lVert\mathbf{q}\rVert^2\bigr)$. Then both identities hold unconditionally:

1. **Pythagorean norm closure of the stereographic Cayley lift** ([`lift_normSq`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.lift_normSq)): for all $a, b, c, d \in \mathbb{Z}$, identically in $\mathbb{N}$,

   $$
   \bigl\lVert\operatorname{liftNum}(a, b, c, d)\bigr\rVert^2 \;=\; \bigl(\operatorname{liftRadius}(a, b, c, d)\bigr)^2.
   $$

2. **Universal quadratic kernel bridge** ([`quadratic_kernel`](lean:D5/S3/Quantum/AURICOmega/OmegaTernionHeap.quadratic_kernel)): for all $p, q : \mathrm{PythSpinor}$, in `Omega.IntRatio.Equivalent`,

   $$
   \kappa_{\mathrm{proj}}(p, q) \;\equiv\; \bigl(2\,\kappa_{\mathrm{spin}}(p, q) - 1\bigr)^2.
   $$
:::

::: {.proof}
For part 1, factoring the three imaginary squares yields $(2ab)^2 + (2ac)^2 + (2ad)^2 = 4a^2(b^2 + c^2 + d^2) = 4a^2 s$, and integer polynomial normalization proves $(a^2 - s)^2 + 4a^2 s = (a^2 + s)^2$; because the squared absolute value of every integer casts to its square in $\mathbb{Z}$, injectivity of `Int.ofNat` transfers the equality to $\lVert\operatorname{liftNum}(a, b, c, d)\rVert^2 = (\operatorname{liftRadius}(a, b, c, d))^2$ in $\mathbb{N}$. For part 2, put $r := r_p r_q > 0$ and $d := \langle\mathbf{p}, \mathbf{q}\rangle$: doubling $\kappa_{\mathrm{spin}}(p, q) = (r + d)/(2r)$ and subtracting $1 = 2r/(2r)$ cancels the common factor $2$ in `IntRatio.Equivalent` to give $2\kappa_{\mathrm{spin}}(p, q) - 1 \equiv d/r$. Substituting the Pythagorean certificates $\lVert\mathbf{p}\rVert^2 = r_p^2$ and $\lVert\mathbf{q}\rVert^2 = r_q^2$ gives $\lVert\mathbf{p}\rVert^2\lVert\mathbf{q}\rVert^2 = (r_p r_q)^2 = r^2$, hence $\kappa_{\mathrm{proj}}(p, q) = d^2/r^2 = (d/r)^2 \equiv (2\kappa_{\mathrm{spin}}(p, q) - 1)^2$. This declaration depends solely on `OmegaInit` and `OmegaMath` with empty transitive axiom closure. The full proof is checked by the Lean kernel.
:::

In particular, whenever $(a, b, c, d)$ is nonzero, $\operatorname{liftRadius}(a, b, c, d)$ is strictly positive, so part 1 of [@thm-ch04-pythspinor-lift-and-quadratic-bridge] guarantees directly that the stereographic Cayley lift $\Phi(a, b, c, d)$ lands identically on $S^3(\mathbb{Q})$, while part 2 links the signed rank-$5$ spinor kernel to the projective rank-$10$ ray kernel without touching a single classical axiom.

::: {.example #ex-ch04-rank10-rank5-and-720-orbit title="Rank-5 Spinor Gram Witness (det = 1/32) and the Six-Beat 720° Orbit of $g_{120}$"}
Exact integer arithmetic verifies both the rank-$5$ ceiling of `PythSpinor` and its $720^\circ$ double-cover periodicity:

1. **Five lifted spinors attaining rank $5$ ($\det G^{\mathrm{spin}}_5 = \frac{1}{32}$)**: applying $\Phi$ to $(1,0,0,0)$, $(1,1,0,0)$, $(1,0,1,0)$, $(1,0,0,1)$, and $(3,1,1,1)$ produces the four coordinate unit spinors $u_1 = (1,0,0,0;\,1)$, $u_2 = (0,1,0,0;\,1)$, $u_3 = (0,0,1,0;\,1)$, $u_4 = (0,0,0,1;\,1)$ together with $u_5 = \operatorname{reduce}(6,6,6,6;\,12) = (1,1,1,1;\,2)$. Form the $5 \times 5$ matrix $V$ with rows $(1, v_i)$:

   $$
   V = \begin{pmatrix} 1 & 1 & 0 & 0 & 0 \\ 1 & 0 & 1 & 0 & 0 \\ 1 & 0 & 0 & 1 & 0 \\ 1 & 0 & 0 & 0 & 1 \\ 1 & \frac{1}{2} & \frac{1}{2} & \frac{1}{2} & \frac{1}{2} \end{pmatrix}.
   $$

   Subtracting half the sum of the first four rows from the fifth reduces the last row to $(-1, 0, 0, 0, 0)$, giving $\det V = -1$. Hence $G^{\mathrm{spin}}_5 = \frac{1}{2} V V^\top$ has determinant

   $$
   \det G^{\mathrm{spin}}_5 = \frac{(\det V)^2}{2^5} = \frac{1}{32} > 0,
   $$

   with leading principal minors $1,\; \frac{3}{4},\; \frac{1}{2},\; \frac{5}{16},\; \frac{1}{32}$. Appending a sixth lifted spinor $u_6 = \Phi(1, 1, 1, 1) = (-1, 1, 1, 1;\, 2)$ satisfies $(1, v_6) = \frac{1}{2}\bigl(-(1, v_1) + (1, v_2) + (1, v_3) + (1, v_4)\bigr)$, forcing $\det G^{\mathrm{spin}}_6 = 0$.
2. **The six-beat $720^\circ$ orbit of `g120_spin = (1, 1, 1, 1; 2)`**: starting from $e = (1, 0, 0, 0;\, 1)$ and $g = (1, 1, 1, 1;\, 2)$, repeated primitive multiplication yields $\kappa_{\mathrm{spin}}(e, g^n) = \frac{r_n + w_n}{2 r_n}$ and $\kappa_{\mathrm{proj}} = (2\kappa_{\mathrm{spin}} - 1)^2$:

| Beat $n$ | Spatial angle | `PythSpinor` power $g^n$ | Signed kernel $\kappa_{\mathrm{spin}}(e, g^n)$ | Projective kernel $\kappa_{\mathrm{proj}}(e, g^n)$ |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $120^\circ$ | $(1, 1, 1, 1;\, 2)$ | $\frac{3}{4}$ | $\frac{1}{4}$ |
| $2$ | $240^\circ$ | $(-1, 1, 1, 1;\, 2)$ | $\frac{1}{4}$ | $\frac{1}{4}$ |
| $3$ | $360^\circ$ | $(-1, 0, 0, 0;\, 1)$ | $0$ | $1$ |
| $4$ | $480^\circ$ | $(-1, -1, -1, -1;\, 2)$ | $\frac{1}{4}$ | $\frac{1}{4}$ |
| $5$ | $600^\circ$ | $(1, -1, -1, -1;\, 2)$ | $\frac{3}{4}$ | $\frac{1}{4}$ |
| $6$ | $720^\circ$ | $(1, 0, 0, 0;\, 1)$ | $1$ | $1$ |

At beat $3$ (a full $360^\circ$ spatial rotation), the projective kernel already reads $\kappa_{\mathrm{proj}} = 1$, whereas `PythSpinor` lands at the antipode $(-1, 0, 0, 0;\, 1)$ with $\kappa_{\mathrm{spin}} = 0$. Only at beat $6$ ($720^\circ$) does the signed spinor orbit close back onto $+1$, tracing the exact rational sequence $\frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$.
:::

Moreover, all six signed homogeneous spinor beats of `g120_spin = (1, 1, 1, 1; 2)` in item 2 above, together with the antipodal zero readout $\kappa_{\mathrm{spin}}(e, g^3) \equiv 0$ at beat $3$ and exact closure $\kappa_{\mathrm{spin}}(e, g^6) \equiv 1$ at beat $6$, are certified verbatim as the zero-axiom witness `PythSpinor.SixBeatOrbit` frozen in `OmegaInit` and `OmegaMath`:

::: {.theorem #thm-ch04-g120-spin-six-beat-orbit title="Six-Beat Signed Spinor Double-Cover Orbit Witness" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.g120_spin_six_beat_orbit"}
Inside the zero-axiom library `OmegaMath` (relying solely on `OmegaInit` and `OmegaMath`, with zero axioms), write $p \sim_{\mathrm{spin}} q$ for the signed homogeneous equivalence `PythSpinor.Equivalent` ($r_q\,\mathbf{p} = r_p\,\mathbf{q}$, which keeps $+p$ and $-p$ strictly distinct because $r_p, r_q > 0$). Let $e := (1, 0, 0, 0;\, 1)$ (`one`), $-e := (-1, 0, 0, 0;\, 1)$ (`antipode`), and $g := (1, 1, 1, 1;\, 2)$ (`g120_spin`), with recursive powers $g^0 := e$ and $g^{n+1} := g^n \cdot g$ (`g120_spin.pow n`). Then all eight conjuncts of `PythSpinor.SixBeatOrbit` hold simultaneously:

1. the six signed homogeneous spinor powers satisfy

   $$
   \begin{aligned}
   g^1 &\sim_{\mathrm{spin}} (1, 1, 1, 1;\, 2), & g^2 &\sim_{\mathrm{spin}} (-1, 1, 1, 1;\, 2), & g^3 &\sim_{\mathrm{spin}} (-1, 0, 0, 0;\, 1), \\
   g^4 &\sim_{\mathrm{spin}} (-1, -1, -1, -1;\, 2), & g^5 &\sim_{\mathrm{spin}} (1, -1, -1, -1;\, 2), & g^6 &\sim_{\mathrm{spin}} (1, 0, 0, 0;\, 1);
   \end{aligned}
   $$

2. the signed spinor kernel readouts at beat $3$ ($360^\circ$ antipode) and beat $6$ ($720^\circ$ closure) satisfy, in `Omega.IntRatio.Equivalent`,

   $$
   \kappa_{\mathrm{spin}}(e, g^3) \;\equiv\; 0, \qquad \kappa_{\mathrm{spin}}(e, g^6) \;\equiv\; 1.
   $$
:::

::: {.proof}
Iterating unreduced `PythSpinor.mul` yields the six exact representatives $(1, 1, 1, 1;\, 2)$, $(-2, 2, 2, 2;\, 4)$, $(-8, 0, 0, 0;\, 8)$, $(-8, -8, -8, -8;\, 16)$, $(16, -16, -16, -16;\, 32)$, and $(64, 0, 0, 0;\, 64)$. Cross-multiplying by the positive radii reduces all six `PythSpinor.Equivalent` equations definitionally by `Eq.refl`. Evaluating $\kappa_{\mathrm{spin}}(e, p) = \operatorname{IntRatio.value}(r_p + w_p,\, 2 r_p)$ gives $\frac{8 + (-8)}{16} = \frac{0}{16} \equiv 0$ at beat $3$ and $\frac{64 + 64}{128} = \frac{128}{128} \equiv 1$ at beat $6$; since both denominators are strictly positive, both equivalences hold in `Omega.IntRatio.Equivalent` with zero axioms. This declaration depends solely on `OmegaInit` and `OmegaMath` with empty transitive axiom closure. The full proof is checked by the Lean kernel.
:::

The static figure below contrasts the rank-$5$ linear spinor layer `PythSpinor` against the rank-$10$ projective ray kernel, plotting the full six-beat $720^\circ$ double-cover orbit of `g120_spin = (1, 1, 1, 1; 2)` alongside the quadratic kernel bridge.

::: {.figure src="ch04-pythspinor-720-orbit"}
**Signed rank-$5$ `PythSpinor` versus projective rank-$10$ ray quotients and the six-beat $720^\circ$ double-cover orbit.** The figure traces `g120_spin = (1, 1, 1, 1; 2)` across all six beats with $\kappa_{\mathrm{spin}} = \frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$, hitting the antipode $(-1, 0, 0, 0;\, 1)$ at beat $3$ ($360^\circ$) while the quadratic kernel bridge $\kappa_{\mathrm{proj}} = (2\kappa_{\mathrm{spin}} - 1)^2$ already collapses back to $1$; the proofs are in [@thm-ch04-pythspinor-lift-and-quadratic-bridge] and the exact arithmetic table in [@ex-ch04-rank10-rank5-and-720-orbit].
:::

## 4.4 The Spinor Ray Kernel, Hopf Projection, and Bilateral Homogeneity

Embedding `PythSpinor` into the continuous unit quaternion group $\mathrm{Sp}(1) = \{q \in \mathbb{H} : \lVert q\rVert = 1\}$ links these rational structures directly to complex two-component spinors, the Hopf map onto the Bloch sphere, and the full bilateral isometry group of $S^3$. The next frozen theorem locks all three bridges inside the kernel.

::: {.theorem #thm-ch04-ray-kernel-hopf-and-homogeneity title="Spinor Born Weight, Hopf Inner Product, and Bilateral Two-Point Homogeneity" lean="D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf D5/S3/Quantum/AURICOmega/QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq"}
On the unit quaternion group $\mathrm{Sp}(1) \subset \mathbb{H}$ with standard real inner product $\langle -, -\rangle$ and spinor comparison readout $\kappa(x, y) := \frac{1 + \langle x, y\rangle}{2}$, define the Hopf image $h(x) := x\,\mathbf{i}\,\bar{x}$, the two-term ray kernel

$$
R(x, y) := \bigl(2\kappa(x, y) - 1\bigr)^2 + \bigl(2\kappa(x, y\,\mathbf{i}) - 1\bigr)^2,
$$

and the real-linear isometric bijection $s : \mathbb{H} \to \mathbb{C}^2$ by $s(q_0 + q_1\mathbf{i} + q_2\mathbf{j} + q_3\mathbf{k}) := (q_0 + q_1\hat{\mathbf{i}},\; -q_2 + q_3\hat{\mathbf{i}})$ (where $\hat{\mathbf{i}}$ is the complex imaginary unit), with rank-one projector $P_v := v v^*$. Then for all $x, y, x', y' \in \mathrm{Sp}(1)$:

1. **Spinor Born weight identity** ([`rayKernel_eq_bornProbability_spinor`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor)): $s(q\,\mathbf{i}) = \hat{\mathbf{i}}\,s(q)$ for every $q \in \mathbb{H}$, the Bloch vector of $P_{s(x)}$ equals $\bigl(h(x)_{\mathbf{k}},\, h(x)_{\mathbf{j}},\, h(x)_{\mathbf{i}}\bigr)$, the ray kernel satisfies $R(x, y) = \lvert\langle s(x), s(y)\rangle_{\mathbb{C}}\rvert^2$, and under complex embedding it equals the Born pairing weight $\operatorname{Tr}(P_{s(y)} P_{s(x)})$.
2. **Hopf sphere inner-product identity** ([`rayKernel_eq_hopf`](lean:D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf)):

   $$
   R(x, y) = \frac{1 + \langle h(x), h(y)\rangle}{2}.
   $$

3. **Bilateral two-point homogeneity** ([`exists_mul_mul_eq_of_kappa_eq`](lean:D5/S3/Quantum/AURICOmega/QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq)): whenever $\kappa(x, y) = \kappa(x', y')$, there exist unit quaternions $p, q \in \mathrm{Sp}(1)$ whose bilateral translation $z \mapsto p z q$ carries the pair $(x, y)$ onto $(x', y')$:

   $$
   p x q = x', \qquad p y q = y'.
   $$
:::

::: {.proof}
Parts 1 and 2 follow from direct polynomial expansion in quaternion coordinates. Since $2\kappa(x, y) - 1 = \langle x, y\rangle$, we have $R(x, y) = \langle x, y\rangle^2 + \langle x, y\mathbf{i}\rangle^2$; checking components verifies $s(q\mathbf{i}) = \hat{\mathbf{i}}\,s(q)$, $\lvert\langle s(x), s(y)\rangle_{\mathbb{C}}\rvert^2 = \langle x, y\rangle^2 + \langle x, y\mathbf{i}\rangle^2 = \operatorname{Tr}(P_{s(y)} P_{s(x)})$, and the homogeneous identity $\langle x, y\rangle^2 + \langle x, y\mathbf{i}\rangle^2 = \frac{1}{2}(\lVert x\rVert^2\lVert y\rVert^2 + \langle x\mathbf{i}\bar{x}, y\mathbf{i}\bar{y}\rangle)$, which yields the Hopf formula on unit norm. For part 3, set $u := \bar{x}y$ and $u' := \bar{x}'y'$. Equal $\kappa$ gives $\operatorname{Re}(u) = \langle x, y\rangle = \langle x', y'\rangle = \operatorname{Re}(u')$, hence $\lVert\operatorname{Im}(u)\rVert = \lVert\operatorname{Im}(u')\rVert$. Transitivity of the adjoint rotation action on spheres in $\operatorname{Im}\mathbb{H}$ provides $c \in \mathrm{Sp}(1)$ with $c u \bar{c} = u'$; setting $p := x' c \bar{x}$ and $q := \bar{c}$ gives $p x q = x' c \bar{c} = x'$ and $p y q = x' c u \bar{c} = x' u' = y'$. The full proof is checked by the Lean kernel.
:::

Explore the stereographic Cayley lift $\Phi(a, b, c, d)$ and the full six-beat $720^\circ$ double-cover orbit of `g120_spin = (1, 1, 1, 1; 2)` ([@thm-ch04-g120-spin-six-beat-orbit]) live in the interactive card below: tune the integer inputs $(a, b, c, d)$ to watch every lifted spinor satisfy $w^2 + x^2 + y^2 + z^2 = r^2$ identically, then step beat by beat through $g^n$ to see $\kappa_{\mathrm{spin}}$ drop to $0$ at beat $3$ ($360^\circ$) even as the quadratic bridge $\kappa_{\mathrm{proj}} = (2\kappa_{\mathrm{spin}} - 1)^2$ snaps back to $1$, closing genuinely at beat $6$ ($720^\circ$).

::: {.viz src="ternion-cayley-lab" preset="pythspinor-720-double-cover" height="520"}
**Interactive stereographic Cayley lift $\Phi(a, b, c, d)$ and six-beat $720^\circ$ orbit of `g120_spin = (1, 1, 1, 1; 2)`.** Vary integer inputs $(a, b, c, d)$ to verify exact Pythagorean closure on $S^3(\mathbb{Q})$, and step along `g120_spin` to compare the signed spinor kernel sequence $\kappa_{\mathrm{spin}} = \frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$ against the quadratic projective bridge $\kappa_{\mathrm{proj}} = (2\kappa_{\mathrm{spin}} - 1)^2$; the proofs are in [@thm-ch04-pythspinor-lift-and-quadratic-bridge] and the worked orbit table in [@ex-ch04-rank10-rank5-and-720-orbit].
:::

::: {.remark #rem-ch04-double-cover-summary title="Three Nested Kernels and Bridge to Chapter 5"}
The signed kernel $\kappa_{\mathrm{spin}}=(1+\langle v_1,v_2\rangle)/2$ distinguishes $+v$ from $-v$ and has rank $5$ on rational unit spinors. The squared kernel $\kappa_{\mathrm{proj}}=(2\kappa_{\mathrm{spin}}-1)^2$ identifies the rays of the spinors and extends to all rational projective rotations, with rank $10$. The Hopf projection and bilateral two-point homogeneity in this section use real unit quaternions. On that carrier, summing the two phase-shifted squares gives the Hopf–Born kernel on $S^2$. Chapter 5 returns to rational coordinates to develop the ordinary Cayley chart and the dual-chart product for rational unit spinors. See [Chapter 5](ch05-rational-cayley-rotations.md).
:::

Finally, the short film below retraces the chapter's route: from origin-free ternary transport, through Lie triple curvature and the separation of rank $10$ from rank $5$, to the $720^\circ$ double cover and the Hopf projection.

::: {.film src="addition-without-an-origin"}
**Flat addition needs an origin, the ternary bracket $[a, b, c] = a\bar{b}c$ does not, and its reflection walk traces the six-beat $720^\circ$ orbit (2 min 45 s).** On a flat grid, the magenta point $a + b$ measured from a hopping amber origin $O$ moves with it, while the cyan point $a - b + c = (1, 4)$ stays put; $\lvert i + j\rvert^2 = 2$ pokes out of the unit circle, $[1 + i, 1 + j, k] = (1, -1, -1, 1)$ has squared norm $4 = 2 \cdot 2 \cdot 1$, and $[i, 1, j] = k$ while $[j, 1, i] = -k$ (computed on screen); the green label is the anchored decomposition of [@thm-ch04-anchored-heap-and-reflection]. For $\mathbf{u} = (1, 1, 0)$, $\mathbf{v} = (1, 0, 2)$, $\mathbf{w} = (0, 1, 1)$, the magenta $\frac{1}{2}[\mathbf{u}, \mathbf{v}]$ is perpendicular to both, the amber $\{\mathbf{u}, \mathbf{v}, \mathbf{w}\} = (-1, -2, 2)$, the cyclic sum vanishes, and $\langle\{\mathbf{u}, \mathbf{v}, \mathbf{u}\}, \mathbf{v}\rangle = 9$ equals the squared area ([@ex-ch04-lie-triple-sectional-curvature]); the green labels are the Bianchi identity of [@thm-ch04-lie-triple-axioms] and $K \equiv 1$ from [@thm-ch04-lie-triple-sectional-curvature]. The cyan tile matrix gives $\det G^{\mathrm{proj}}_{10} = \frac{1}{64}$, the magenta one $\det G^{\mathrm{spin}}_5 = \frac{1}{32}$, and the amber eleventh ray and sixth spinor send the determinants to zero (computed on screen); the green label is the quadratic kernel bridge of [@thm-ch04-pythspinor-lift-and-quadratic-bridge]. On a great circle the reflection walk $x_{n+2} = [x_{n+1}, x_n, x_{n+1}]$ runs from $e$ through $g = (1, 1, 1, 1;\, 2)$ to $g^0, \dots, g^6$, with the magenta antipode $x_3 = (-1, 0, 0, 0;\, 1)$; a cube turns $120^\circ$ per beat about its diagonal while magenta bars $\kappa_{\mathrm{spin}} = \frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$ stand beside cyan bars $\kappa_{\mathrm{proj}} = \frac{1}{4}, \frac{1}{4}, 1, \frac{1}{4}, \frac{1}{4}, 1$ ([@ex-ch04-rank10-rank5-and-720-orbit]); the green labels are the reflection power law of [@thm-ch04-anchored-heap-and-reflection] and [@thm-ch04-g120-spin-six-beat-orbit]. Finally, on real unit quaternions the ray kernel of $e$ and $g$ is $\frac{1}{2}$ both ways, the Hopf images $i$ and the amber $j$ are perpendicular, and $p = i$, $q = -i$ carry $(e, g)$ onto $(e, \frac{1}{2}(1, 1, -1, -1))$ (computed on screen); the green labels are [@thm-ch04-ray-kernel-hopf-and-homogeneity], and "no point is special" is a reading of homogeneity (violet).
:::
