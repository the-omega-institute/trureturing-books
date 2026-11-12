# Chapter 5 Farewell to the Mysterious $i$: Complex Phase Is a Planar Rotation Generator {#ch05-complex-phase-and-rotors}

As the author of this monograph observes:

> *"A quantum state is a direction, and a quantum gate turns a quantum state — so it can be understood as a geometric structure possessing area."*
>
> *"In truth, point C is not a given input, but the projection of a compatibility point — for a single definite quantum state can determine only a line, whereas it takes a family of quantum states to correspond to an area."*

Across Part I ([Chapter 1](ch01-measurement.md) through [Chapter 4](ch04-decoherence.md)), we completed the first stage of our geometric reconstruction: stripping away isolated monads and the external reference point $C$, restoring the single qubit to a real unit ray $\vv{a}$ on the two-sphere $S^2$, and explaining Born's rule, idempotent existence lines $P^2 = P$, and decoherence foreshortening through the pairwise inner-product projection $\vv{a} \cdot \vv{b} = \cos\theta$.

As long as our gaze remains confined to static one-dimensional line segments, however, the second great stumbling block of introductory quantum mechanics looms ahead: **if every laboratory measurement reading and every probability is a real number, why do quantum state evolution and quantum logic gates insist on invoking the imaginary unit $i = \sqrt{-1}$?** In conventional textbooks, $i$ is often treated as an irreducible piece of algebraic mysticism — as though microscopic particles inhabited an unvisualizable "imaginary realm" divorced from spatial geometry.

Opening Part II (*Unfolding Wings — From Line to Plane*), this chapter removes the mystique surrounding $i$ once and for all. We will establish a transparent geometric principle: **a single definite quantum state can determine only a one-dimensional directional line; a quantum gate turns states because a pair of non-collinear states (or a balanced pair of orthogonal operator components) spans a two-dimensional oriented area (a bivector)!** What textbooks write as the imaginary unit $i$ is not an "imaginary number" at all — it is the algebraic signature of a **planar $90^\circ$ quarter-turn generator**, because applying two successive $90^\circ$ turns in the same plane ($90^\circ + 90^\circ = 180^\circ$) inevitably reverses every vector in that plane!

::: {.figure src="ch05-overview"}
**Figure 5.** The chapter at a glance. Panel I: the small magenta square is the unit bivector $\vv{I}$; the amber $\vv{e}_1$, multiplied twice on the right by $\vv{I}$, follows the two violet arcs through $\vv{e}_2$ to $-\vv{e}_1$. Panel II (schematic): two perpendicular arrows $A$ and $B$ of length $\frac{1}{\sqrt{2}}$ add up to the violet diagonal $S = A + B$, which ends on the dashed unit circle; the magenta square they span is $J = 2AB^*$. Panel III: the rotor on the left, the rotation on the right, and squaring $z \mapsto z^2$ carries the left circle onto the right one; as the angle runs from $0^\circ$ to $360^\circ$, the right circle is gone round once, back to the amber starting dot, while the violet arc on the left goes only half way from $1$ and stops at the amber $-1$ ([@thm-circle-double-cover-history-lift]).
:::

## 5.1 Why $i^2 = -1$? The Geometric Inevitability of Two Successive $90^\circ$ Quarter-Turns by a Unit Bivector $I = \vv{e}_1 \wedge \vv{e}_2$ {#sec-unit-bivector-square}

Begin with the author's own question upon first confronting the geometry of states and gates on the sphere:

> *"Why is it an area on the sphere, rather than the area of the included angle? Two quantum states can only be connected by a line on the surface of the sphere A B."*

That question pierces straight to the heart of the matter. When only a single quantum state $\vv{a}$ is given, it defines nothing more than a one-dimensional ray from the origin — without a second vector, there is no plane of rotation and no notion of turning left or right. Only when a **second**, non-collinear direction $\vv{b}$ enters — so that we hold a pair (or family) of quantum states $\vv{a}$ and $\vv{b}$ — do the two radial arrows span a unique **two-dimensional plane** through the origin of $\mathbb{R}^3$, enclosing an oriented parallelogram wedge area:

$$
\vv{a} \wedge \vv{b} = \sin\theta\,\vv{I}, \qquad \vv{I} := \vv{e}_1 \wedge \vv{e}_2.
$$

Here $\{\vv{e}_1, \vv{e}_2\}$ is an orthonormal basis of the plane ($\vv{e}_1 \cdot \vv{e}_1 = \vv{e}_2 \cdot \vv{e}_2 = 1$, $\vv{e}_1 \cdot \vv{e}_2 = 0$), and the exterior product $\vv{I} = \vv{e}_1 \wedge \vv{e}_2 = -\vv{e}_2 \wedge \vv{e}_1$ is the **unit bivector** representing a unit oriented area element in that plane.

Now watch how the unit bivector $\vv{I}$ acts as a planar rotation gear. In Clifford's geometric algebra (developed systematically in [Chapter 6](ch06-geometric-product.md)), orthogonal basis vectors anticommute under the geometric product ($\vv{e}_1 \vv{e}_2 = \vv{e}_1 \wedge \vv{e}_2 = -\vv{e}_2 \vv{e}_1$) while squaring to unity ($\vv{e}_1^2 = \vv{e}_2^2 = 1$). Multiply the horizontal basis vector $\vv{e}_1$ on the right by the unit bivector $\vv{I}$:

$$
\vv{e}_1 \vv{I} = \vv{e}_1 (\vv{e}_1 \vv{e}_2) = (\vv{e}_1^2)\vv{e}_2 = \vv{e}_2.
$$

Multiplying once by $\vv{I}$ rotates $\vv{e}_1$ counterclockwise by $90^\circ$ into the vertical basis vector $\vv{e}_2$! What happens if we immediately multiply by $\vv{I}$ a **second** time — executing a second $90^\circ$ turn in the same plane?

$$
(\vv{e}_1 \vv{I})\vv{I} = \vv{e}_2 (\vv{e}_1 \vv{e}_2) = -\vv{e}_2 (\vv{e}_2 \vv{e}_1) = -(\vv{e}_2^2)\vv{e}_1 = -\vv{e}_1!
$$

For every vector $\vv{v} = x\vv{e}_1 + y\vv{e}_2$ lying in the plane, two successive applications of $\vv{I}$ rotate it by $90^\circ + 90^\circ = 180^\circ$ into $-\vv{v}$. Abstracting the operator itself gives the fundamental identity

::: {.figure src="ch05-quarter-turns"}
**Multiply by $\vv{I}$ twice and the vector turns around.** One right multiplication by $\vv{I}$ carries the amber $\vv{v}$ along a violet arc, $90^\circ$ counter-clockwise, to the grey $\vv{v}\vv{I}$; a second carries it another $90^\circ$ to $-\vv{v}$. All three arrows have the same length and end on the dashed unit circle; the small magenta square at the origin is the unit bivector $\vv{I} = \vv{e}_1 \wedge \vv{e}_2$.
:::

$$
\vv{I}^2 = (\vv{e}_1 \vv{e}_2)(\vv{e}_1 \vv{e}_2) = -\vv{e}_1 \vv{e}_1 \vv{e}_2 \vv{e}_2 = -1!
$$

The mystery dissolves on the spot. What algebraists christened the "imaginary unit" $i$ is not imaginary at all: **whenever an operator represents a norm-preserving $90^\circ$ quarter-turn in a plane (captured in matrix algebra by combining skew-adjointness $R^* = -R$ with right-unitarity $R R^* = I$), applying it twice in succession must yield the inversion $-I$**.

In the Lean 4 formalization module `Quantum/Algebra/Unitary`, we do not even need to postulate an external geometric algebra in advance; instead, we prove directly within $n \times n$ matrix algebra how a planar rotation generator emerges whenever a right-unitary operator $S$ ($S S^* = I$) is decomposed as a **balanced sum** $S = A + B$ of two half-norm components ($A A^* = \frac{1}{2}I$ and $B B^* = \frac{1}{2}I$, denoted [`halfIdentity`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.halfIdentity) in Lean). Unitarity of $S$ forces the symmetric cross-term $A B^* + B A^*$ to vanish, making the cross-product $A B^*$ automatically skew-adjoint!

::: {.theorem #thm-balanced-sum-skew-adjoint title="Orthogonal Cross-Term Cancellation and Skew-Adjoint Cross-Product of a Balanced Unitary Sum" lean="D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum"}
Let $n$ be a finite index type with decidable equality, and let $S, A, B \in M_n(\mathbb{C})$ be $n \times n$ complex matrices. Write $H_{1/2} := \frac{1}{2}I_n$ ([`halfIdentity`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.halfIdentity)). Suppose $S, A, B$ satisfy:

1. **Balanced sum decomposition**: $S = A + B$;
2. **Right-unitarity of the sum**: $S S^* = I_n$;
3. **Half-identity component norms**: $A A^* = \frac{1}{2}I_n$ and $B B^* = \frac{1}{2}I_n$.

Then the symmetric cross-term vanishes ($A B^* + B A^* = 0$, [`crossTerms_eq_zero`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossTerms_eq_zero), equivalently $B A^* = -A B^*$, [`secondCross_eq_neg_first`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.secondCross_eq_neg_first)), and the cross-product $A B^*$ is skew-adjoint ([`crossProduct_is_skewAdjoint`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint)):

$$
(A B^*)^* = -A B^*.
$$
:::

::: proof
Substitute $S = A + B$ into the right-unitarity identity $S S^* = I_n$ and expand by distributivity:

$$
I_n = (A + B)(A^* + B^*) = A A^* + A B^* + B A^* + B B^*.
$$

Inserting the balanced half-identity hypotheses $A A^* = \frac{1}{2}I_n$ and $B B^* = \frac{1}{2}I_n$ sums the two diagonal norm terms to $\frac{1}{2}I_n + \frac{1}{2}I_n = I_n$. Subtracting $I_n$ from both sides yields $A B^* + B A^* = 0$ ([`crossTerms_eq_zero`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossTerms_eq_zero)), or equivalently $B A^* = -A B^*$ ([`secondCross_eq_neg_first`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.secondCross_eq_neg_first)). Taking the conjugate transpose of $A B^*$ then gives $(A B^*)^* = (B^*)^* A^* = B A^* = -A B^*$. The full proof is checked by the Lean kernel.
:::

Next, whenever a matrix $R$ is both skew-adjoint ($R^* = -R$, encoding a $90^\circ$ turn without scaling) and right-unitary ($R R^* = I_n$, encoding unit area norm), its square is guaranteed to equal $-I_n$ without invoking a single complex scalar!

::: {.lemma #lemma-skew-adjoint-unitary-square title="Square of a Skew-Adjoint Right-Unitary Matrix Equals Minus the Identity" lean="D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary"}
Let $n$ be a finite index type with decidable equality. For any complex matrix $R \in M_n(\mathbb{C})$ satisfying both skew-adjointness $R^* = -R$ and right-unitarity $R R^* = I_n$, its square is minus the identity matrix:

$$
R^2 = -I_n.
$$
:::

::: proof
Substituting the skew-adjoint relation $R^* = -R$ directly into the right-unitarity condition $R R^* = I_n$ gives $R(-R) = -R^2 = I_n$; negating both sides yields $R^2 = -I_n$. The full proof is checked by the Lean kernel.
:::

Combining [@thm-balanced-sum-skew-adjoint] and [@lemma-skew-adjoint-unitary-square] constructs an intrinsic **relative complex structure** $J := 2 A B^*$ ([`relativeComplexStructure`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure) in Lean) directly from the pair $(A, B)$. Why the factor of $2$? Because when $A$ has right half-identity norm $A A^* = \frac{1}{2}I_n$ and $B$ has left half-identity norm $B^* B = \frac{1}{2}I_n$, the product $A B^*$ has right squared norm $\frac{1}{2} \times \frac{1}{2} = \frac{1}{4}I_n$; multiplying by $2$ restores right-unitarity $J J^* = 4 \cdot \frac{1}{4}I_n = I_n$ ([`relativeComplexStructure_mul_conjTranspose`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_mul_conjTranspose)), ensuring $J^2 = -I_n$ (while under the dual half-norm conditions $A^* A = \frac{1}{2}I_n$ and $B B^* = \frac{1}{2}I_n$, one also has left-unitarity $J^* J = I_n$, [`relativeComplexStructure_conjTranspose_mul`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_conjTranspose_mul))!

::: {.theorem #thm-relative-complex-structure-square title="Square Identity $J^2 = -I$ of the Relative Complex Structure" lean="D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square"}
Let $n$ be a finite index type with decidable equality, and let $A, B \in M_n(\mathbb{C})$. Define the relative complex structure matrix by

$$
J := 2 A B^*.
$$

If $A, B$ satisfy the orthogonal cross-term relation $A B^* + B A^* = 0$ together with the half-identity norm conditions $A A^* = \frac{1}{2}I_n$ and $B^* B = \frac{1}{2}I_n$, then $J$ is skew-adjoint ($J^* = -J$ under $A B^* + B A^* = 0$ alone, [`relativeComplexStructure_is_skewAdjoint`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_is_skewAdjoint)), right-unitary ($J J^* = I_n$ under $A A^* = \frac{1}{2}I_n$ and $B^* B = \frac{1}{2}I_n$, [`relativeComplexStructure_mul_conjTranspose`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_mul_conjTranspose)), and squares to minus the identity:

$$
J^2 = -I_n.
$$
:::

::: proof
First, $A B^* + B A^* = 0$ implies $(A B^*)^* = -A B^*$, so scaling by $2$ preserves skew-adjointness: $J^* = (2 A B^*)^* = -2 A B^* = -J$ ([`relativeComplexStructure_is_skewAdjoint`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_is_skewAdjoint)). Next, evaluate $J J^*$ by associativity using $B^* B = \frac{1}{2}I_n$ and $A A^* = \frac{1}{2}I_n$:

$$
J J^* = (2 A B^*)(2 B A^*) = 4 A (B^* B) A^* = 4 A \Bigl(\frac{1}{2}I_n\Bigr) A^* = 2 A A^* = 2\Bigl(\frac{1}{2}I_n\Bigr) = I_n
$$

([`relativeComplexStructure_mul_conjTranspose`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_mul_conjTranspose); dually, if $A^* A = \frac{1}{2}I_n$ and $B B^* = \frac{1}{2}I_n$, then $J^* J = 4 B(A^* A)B^* = 2 B B^* = I_n$, [`relativeComplexStructure_conjTranspose_mul`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_conjTranspose_mul)). Since $J$ is both skew-adjoint and right-unitary, [@lemma-skew-adjoint-unitary-square] immediately gives $J^2 = -I_n$. The full proof is checked by the Lean kernel.
:::

Moreover, multiplying the skew-adjoint relative complex structure $J$ by $i$ produces the companion **relative involution** $K := iJ$ ([`relativeInvolution`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeInvolution)): because both $i$ and $J$ change sign under conjugate transposition ($(-i)(-J) = iJ$) and both square to $-1$ ($i^2 J^2 = (-1)(-I_n) = I_n$), $K = iJ$ is automatically a Hermitian involution satisfying $K^* = K$ ([`relativeInvolution_isHermitian`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeInvolution_isHermitian)) and $K^2 = I_n$ ([`relativeInvolution_square`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeInvolution_square)). Once again, Hodge duality shines through: every rotation plane $J$ squaring to $-I$ is paired with a Hermitian observable axis $iJ$ squaring to $+I$.

## 5.2 From Euler's Formula $e^{i\theta}$ to the Clifford Rotor $R(\theta) = \cos(\theta/2) - \vv{B}\sin(\theta/2)$ {#sec-euler-to-rotor}

Once we recognize that a unit bivector $\vv{B}$ (or the relative complex structure $J$ in matrix form) obeys the exact same square law $\vv{B}^2 = -1$ as the complex unit $i$, replacing $i$ in Euler's formula $e^{i\alpha} = \cos\alpha + i\sin\alpha$ with a concrete geometric rotation plane $-\vv{B}$ produces the basis-free **Clifford rotor**:

$$
R(\theta) := \exp\Bigl(-\vv{B}\,\frac{\theta}{2}\Bigr) = \sum_{k=0}^\infty \frac{(-\vv{B}\,\theta/2)^k}{k!} = \cos\frac{\theta}{2} - \vv{B}\sin\frac{\theta}{2}.
$$

Every student who meets this rotor formula for the first time asks the same two questions: **why does the rotor carry the half-angle $\theta/2$ rather than the full angle $\theta$? And why must a rotor act on a three-dimensional Bloch vector $\vv{v}$ through the two-sided "sandwich product" $\vv{v}' = R(\theta)\,\vv{v}\,R(\theta)^\dagger$ rather than one-sided multiplication?**

Bivector geometry answers both questions in two transparent steps:

1. **Why one-sided multiplication fails in three dimensions**: Inside a single two-dimensional plane $\vv{B} = \vv{e}_1 \wedge \vv{e}_2$, every vector lies in the plane and therefore **anticommutes** with $\vv{B}$: $\vv{v}_\parallel \vv{B} = -\vv{B} \vv{v}_\parallel$. In three-dimensional space $\mathbb{R}^3$, however, a general vector $\vv{v} = \vv{v}_\parallel + \vv{v}_\perp$ also has a normal component $\vv{v}_\perp$ perpendicular to the rotation plane (along the rotation axis $\vv{e}_3$). Because $\vv{e}_3$ is orthogonal to both $\vv{e}_1$ and $\vv{e}_2$, passing $\vv{e}_3$ across $\vv{B} = \vv{e}_1 \vv{e}_2$ flips two signs ($(-1)^2 = +1$), so the normal vector **commutes** with the bivector plane: $\vv{v}_\perp \vv{B} = +\vv{B}\vv{v}_\perp$. If you multiplied on the left alone by $e^{-\vv{B}\theta}$, the parallel component $\vv{v}_\parallel$ would rotate in the plane, but the axial component $\vv{v}_\perp$ would pick up a trivector (pseudoscalar) term $\vv{v}_\perp \vv{B}$ pointing outside the space of vectors!
2. **Why the two-sided sandwich product fixes the rotation axis and doubles $\theta/2$ to $\theta$**: Surround $\vv{v} = \vv{v}_\parallel + \vv{v}_\perp$ on the left by the half-angle rotor $R(\theta) = e^{-\vv{B}\theta/2}$ and on the right by its reverse $R(\theta)^\dagger = e^{+\vv{B}\theta/2}$:
   - On the **normal component $\vv{v}_\perp$ along the rotation axis**: since $\vv{v}_\perp$ commutes with $\vv{B}$, $R(\theta)^\dagger$ slides straight through $\vv{v}_\perp$ and cancels $R(\theta)$:
     $$
     R(\theta)\,\vv{v}_\perp\,R(\theta)^\dagger = R(\theta)R(\theta)^\dagger\,\vv{v}_\perp = e^{-\vv{B}\theta/2}e^{+\vv{B}\theta/2}\vv{v}_\perp = \vv{v}_\perp!
     $$
     The rotation axis remains completely invariant!
   - On the **in-plane component $\vv{v}_\parallel$**: since $\vv{v}_\parallel$ anticommutes with $\vv{B}$ ($\vv{v}_\parallel \vv{B} = -\vv{B}\vv{v}_\parallel$), sliding $R(\theta)^\dagger = \cos(\theta/2) + \vv{B}\sin(\theta/2)$ across $\vv{v}_\parallel$ flips the sign of $\vv{B}$, turning $R(\theta)^\dagger$ into a second forward rotor $R(\theta)$:
     $$
     R(\theta)\,\vv{v}_\parallel\,R(\theta)^\dagger = R(\theta)R(\theta)\,\vv{v}_\parallel = e^{-\vv{B}\theta/2}e^{-\vv{B}\theta/2}\vv{v}_\parallel = e^{-\vv{B}\theta}\vv{v}_\parallel = \bigl(\cos\theta - \vv{B}\sin\theta\bigr)\vv{v}_\parallel!
     $$
     The left half-angle $\theta/2$ and the right half-angle $\theta/2$ reinforce each other to rotate the in-plane vector by the full angle $\theta$!

::: {.viz src="zyz-compile" preset="sandwich" height="500"}
**Two half angles make one whole turn.** The amber arrow $\vv{v}$ turns $90^\circ$ about the violet $z$ axis: the cyan segment is its shadow on the axis, $\vv{v}_\perp$, and it does not move; the magenta sector is the area swept by the part in the plane, $\vv{v}_\parallel$, and a dashed line splits it into $45^\circ + 45^\circ$, one $\theta/2$ from each side. The three-dimensional sandwich action is a literature result, not formalized in this book ([@rem-clifford-rotor-literature]).
:::

To maintain strict formal boundaries: [@lemma-skew-adjoint-unitary-square] and [@thm-relative-complex-structure-square] verify the matrix-level identities $R^2 = -I_n$ and $J^2 = -I_n$ in the Lean kernel, whereas the identification of the full three-dimensional Clifford algebra with the Pauli matrix algebra $\mathrm{Cl}_{3,0}(\mathbb{R}) \cong M_2(\mathbb{C})$ (real dimension $8$), its **even subalgebra** with the quaternion algebra $\mathrm{Cl}^+_{3,0}(\mathbb{R}) \cong \mathbb{H}$ (real dimension $4$, whose unit sphere $S^3 \cong \mathrm{SU}(2)$ consists of rotors), and the full three-dimensional Rodrigues sandwich formula are documented as classical background in [@rem-clifford-rotor-literature].

::: {.film src="001-qubit-bloch-rotor"}
**Half-angle rotors and the Bloch sphere (50 seconds).** An arrow on the sphere is a pure state; the geometric product splits its relation to the ruler into $\cos\theta$ along the line and $\sin\theta$ spanning an area; a rotor turns by half the angle from each side, so that after $360^\circ$ the arrow is back while the rotor is off by a sign, and only $720^\circ$ brings the rotor back.
:::

The half angle leaves one question open. $R(2\pi) = \cos\pi - \vv{B}\sin\pi = -1$: the object is back where it started, yet the rotor is not. Is this a blemish of the notation $\theta/2$ that a cleverer parametrization would remove, or is it unavoidable? For a fixed plane of rotation $\vv{B}$ the question has a complete answer. The rotors $\cos\alpha - \vv{B}\sin\alpha$ about that plane form a circle under multiplication, and the sandwich computation above, $R\,\vv{v}_\parallel R^\dagger = R^2\,\vv{v}_\parallel$, shows that the in-plane rotation induced by a rotor $R$ is $R^2$. So within a fixed plane, "rotor $\mapsto$ rotation" is exactly the squaring map $z \mapsto z^2$ of the unit circle, and its topology is frozen at the pinned commit in the module `D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift`.

::: {.figure src="ch05-double-cover"}
**One full turn of the rotation is half a turn of the rotor.** The violet circle on the left is the rotor $R(\theta)$, the circle on the right the rotation; squaring a point on the left ($z \mapsto z^2$) lands it on the right. Each time the angle grows by $90^\circ$, the right-hand point moves $90^\circ$ and the left-hand one only $45^\circ$: during the first turn (solid) the right goes all the way round while the left covers only the upper half; only during the second turn (dashed) does the left finish the lower half. The amber dots mark $\theta = 360^\circ$: back at the start on the right, at $-1$ on the left. The points are the rows of the table in [@ex-rotor-two-turns]; the topological statement is [@thm-circle-double-cover-history-lift].
:::

::: {.theorem #thm-circle-double-cover-history-lift title="The Double Cover of the Circle: Unique Path Lifting, No Continuous Global Section, and One Full Turn Swaps the Two Preimages" lean="D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section"}
Let $S^1$ be the unit circle in the complex plane (Mathlib's `Circle`) and let $\operatorname{sq} : S^1 \to S^1$ be the squaring map $z \mapsto z^2$, which is a covering map (Mathlib's `Circle.isQuotientCoveringMap_npow 2`); write $I = [0, 1]$. Then:

1. **Path lifts exist and are unique.** For every continuous path $\gamma : I \to S^1$ and every $z_0 \in S^1$ with $\gamma(0) = z_0^2$, the lift $\widetilde{\gamma} : I \to S^1$ supplied by the covering map (`IsCoveringMap.liftPath`) is a continuous path with $\operatorname{sq}\circ\widetilde{\gamma} = \gamma$ and $\widetilde{\gamma}(0) = z_0$; and every continuous path $\beta : I \to S^1$ with $\operatorname{sq}\circ\beta = \gamma$ and $\beta(0) = z_0$ equals $\widetilde{\gamma}$.
2. **There is no continuous global section.** No continuous map $s : S^1 \to S^1$ satisfies $s(z)^2 = z$ for all $z \in S^1$.
3. **A full turn swaps the two preimages.** For the full-turn loop $\gamma_\circ(t) = e^{2\pi i t}$ (`Circle.exp (2 * π * t)`), the lift $\widetilde{\gamma_\circ}$ starting at $z_0 = 1$ satisfies $\operatorname{sq}\circ\widetilde{\gamma_\circ} = \gamma_\circ$, $\widetilde{\gamma_\circ}(0) = 1$ and $\widetilde{\gamma_\circ}(1) = -1$.
:::

::: proof
Claim 1 is the path-lifting property of covering maps (Mathlib's `liftPath_lifts`, `liftPath_zero` and `eq_liftPath_iff'`). Claim 2: suppose $s$ is continuous with $s(z)^2 = z$, and for real $t$ put $r(t) = s(e^{it})\,/\,e^{it/2}$. Then $r$ is continuous and $r(t)^2 = e^{it}/e^{it} = 1$, so $r$ takes only the values $\pm 1$; the real line is connected, so $r$ is constant. But $t = 0$ and $t = 2\pi$ name the same point of the circle, so the numerators agree, while the denominator changes from $1$ to $e^{i\pi} = -1$; hence $r(2\pi) = -r(0)$, a contradiction. Claim 3: the half-angle path $t \mapsto e^{i\pi t}$ is continuous, squares to $\gamma_\circ$ and starts at $1$, so by the uniqueness in Claim 1 it is the lift, and it ends at $e^{i\pi} = -1$. The full proof is checked by the Lean kernel.
:::

Translated back into the language of rotors (the dictionary below is a manual derivation):

- **Claim 3.** Turning an object continuously through one full turn about a fixed axis carries the rotor from $1$ to $-1$. This agrees with $R(2\pi) = -1$ but says more: by the uniqueness in Claim 1, any continuous rotor history with the same starting point that induces the same rotation history is the same history. A rotor is determined by the **history** of the rotation, not by where the rotation ends.
- **Claim 2.** There is no global formula converting a rotation (the angle taken modulo $360^\circ$) into a rotor continuously. Any rule that assigns one rotor to each rotation must jump somewhere on the circle. The half angle is not a blemish of notation.
- **Two full turns.** The loop $t \mapsto e^{4\pi i t}$ lifts to $t \mapsto e^{2\pi i t}$ (it is continuous, squares correctly and starts at $1$, so uniqueness in Claim 1 applies), which ends at $+1$. Only after $720^\circ$ is the rotor restored.

::: {.viz src="qubit-geometry" preset="turn2" height="500"}
**Two turns to come back.** The amber state vector $B$ turns twice about $\hat{x}$ (four legs of $180^\circ$ each). The frame stops at the end of the second full turn: $B$ is back where it started, and the rotor's scalar part read out at the top left is back at $w = +1$; at the end of the first turn $B$ was back there too, but $w$ was $-1$. One turn for the vector, two for the rotor (the fixed-plane case is [@thm-circle-double-cover-history-lift]).
:::

::: {.example #ex-rotor-two-turns title="Angles from 0° to 720°: the Rotation Goes Around Twice, the Rotor Only Once"}
Take $\vv{B} = \vv{e}_1 \wedge \vv{e}_2$. The rotation through the angle $\theta$ sends $\vv{e}_1$ to $\cos\theta\,\vv{e}_1 + \sin\theta\,\vv{e}_2$; the corresponding rotor is $R(\theta) = \cos\frac{\theta}{2} - \vv{B}\sin\frac{\theta}{2}$. The table lists the coordinates $(\cos\theta, \sin\theta)$ of the rotation and $\bigl(\cos\frac{\theta}{2}, \sin\frac{\theta}{2}\bigr)$ of the rotor, rounded to the digits shown:

| Angle $\theta$ | Rotation $(\cos\theta,\ \sin\theta)$ | Rotor $\bigl(\cos\frac{\theta}{2},\ \sin\frac{\theta}{2}\bigr)$ |
| :---: | :---: | :---: |
| $0^\circ$ | $(1,\ 0)$ | $(1,\ 0)$ |
| $90^\circ$ | $(0,\ 1)$ | $(0.7071,\ 0.7071)$ |
| $180^\circ$ | $(-1,\ 0)$ | $(0,\ 1)$ |
| $270^\circ$ | $(0,\ -1)$ | $(-0.7071,\ 0.7071)$ |
| $360^\circ$ | $(1,\ 0)$ | $(-1,\ 0)$ |
| $450^\circ$ | $(0,\ 1)$ | $(-0.7071,\ -0.7071)$ |
| $540^\circ$ | $(-1,\ 0)$ | $(0,\ -1)$ |
| $630^\circ$ | $(0,\ -1)$ | $(0.7071,\ -0.7071)$ |
| $720^\circ$ | $(1,\ 0)$ | $(1,\ 0)$ |

The second column is back at its starting point at $360^\circ$, when the third column has reached exactly the opposite point; any two rows $360^\circ$ apart (such as $90^\circ$ and $450^\circ$) have the same rotation and opposite rotors. Squaring each point of the third column (doubling its argument) gives the second column.

**One direct check.** $R(90^\circ) = \frac{1}{\sqrt{2}}(1 - \vv{B})$, and with $\vv{B}^2 = -1$: $R(90^\circ)^2 = \frac{1}{2}(1 - 2\vv{B} + \vv{B}^2) = -\vv{B} = R(180^\circ)$; squaring again, $R(180^\circ)^2 = \vv{B}^2 = -1 = R(360^\circ)$. In neutron interferometry the fringes are inverted when the spin has precessed through $360^\circ$ and restored at $720^\circ$ (a literature result, not formalized in this book: H. Rauch et al., *Phys. Lett. A* **54**, 425, 1975; S. A. Werner et al., *Phys. Rev. Lett.* **35**, 1053, 1975).
:::

::: {.viz src="qubit-geometry" preset="turn1" height="500"}
**One full turn flips the rotor.** The amber state vector goes $360^\circ$ about $\hat{x}$ and returns to where it started, and so do the line and the area; the scalar part of the accumulated rotor, read out at the top left, has run from $+1$ to $w = -1$. Only after two full turns is it back at $+1$; see the card “Two turns to come back” above.
:::

A lone $-1$ is an overall sign, and by the discussion of the next section it changes no single-branch measurement reading; only when a branch that has been turned through a full turn is brought back together with a branch that has not (as in the interferometric setting at the end of [@ex-rotor-two-turns]) does the sign become an observable relative phase.

## 5.3 Global Phase versus Relative Phase: Why Spinning a Single Line Is Invisible, and Only a Pair of Lines Spans an Area {#sec-global-vs-relative-phase}

Understanding complex phase as a planar rotation angle immediately resolves one of the most persistent puzzles of beginner quantum mechanics: **why is a global phase factor $e^{i\alpha}\lvert\psi\rangle$ physically unobservable, whereas a relative phase $\lvert 0\rangle + e^{i\phi}\lvert 1\rangle$ between two branches controls interference completely?**

Recall the author's observation from the chapter epigraph: *"a single definite quantum state can determine only a line, whereas it takes a family of quantum states to correspond to an area."*

- When only a **single** state $\lvert\psi\rangle$ is present, it determines only a one-dimensional ray on the sphere. Multiplying that lone state by a global phase factor $\lvert\psi\rangle \mapsto u\lvert\psi\rangle$ ($|u| = 1$) tries to spin a thickness-free line around its own axis — in both the ray-rigidity theorem [@thm-ray-phase-rigidity] of [Chapter 1](ch01-measurement.md) and the rank-one Born projector $\lvert\psi\rangle\langle\psi\rvert$ of [Chapter 2](ch02-born-rule.md), $u\overline{u} = |u|^2 = 1$ cancels out identically, leaving the ray's direction on $S^2$ unchanged;
- By contrast, when **two or more** states interact, relative coefficient phase in a fixed basis controls interference on recombination. The argument of a general overlap amplitude $z = \langle\phi\mid\psi\rangle \in \mathbb{C}$ requires a chosen phase reference, while the projective angle between rays is determined by the overlap modulus.

::: {.viz src="qubit-geometry" preset="phase" height="500"}
**The relative phase turns; the shadow stays put.** During playback, the amber arrow $B$ travels along the equator about the cyan ruler $A$, keeping their angle at $90^\circ$. The cyan line stays at zero, while the magenta area keeps its size and changes orientation. This card varies the relative phase between the two branches.
:::

Going one step further, in a phase-locked interferometer where a unit phase reference $u \in \mathbb{C}$ ($\|u\| = 1$) calibrates the overlap amplitude $z \in \mathbb{C}$ between two paths, when does the complex overlap $z$ reduce to a **real** signed amplitude $r \in \mathbb{R}$ carried along $u$?

In the Lean module `QuantumStates/PhaseLockedOverlap`, the following proposition proves that whenever $\overline{z} = (u^{-1})^2 z$, the transverse imaginary component vanishes and $z$ factors as $z = u \cdot r$ with $r = \operatorname{Re}(u^{-1}z) \in \mathbb{R}$.

::: {.proposition #prop-phase-locked-overlap title="Real-Amplitude Factorization of a Phase-Locked Complex Overlap" lean="D5/S3/QuantumStates/PhaseLockedOverlap.phase_locked_overlap_is_rotated_real"}
Let $u, z \in \mathbb{C}$ be complex numbers where $u$ has unit modulus ($\|u\| = 1$) and $z$ satisfies the phase-locking conjugation identity

$$
\overline{z} = (u^{-1})^2 z.
$$

Then there exists a real amplitude $r \in \mathbb{R}$ (given explicitly by $r = \operatorname{Re}(u^{-1} z)$) such that

$$
z = u \cdot r.
$$
:::

::: proof
Set $w := u^{-1} z \in \mathbb{C}$ and $r := \operatorname{Re}(w) \in \mathbb{R}$. Because $\|u\| = 1$, we have $\overline{u} u = \|u\|^2 = 1$, so $u^{-1} = \overline{u}$ and $\overline{u^{-1}} = u$. Taking the complex conjugate of $w$ and substituting the phase-locking condition $\overline{z} = (u^{-1})^2 z$ yields

$$
\overline{w} = \overline{u^{-1} z} = \overline{u^{-1}}\,\overline{z} = u \cdot (u^{-1})^2 z = (u u^{-1}) u^{-1} z = u^{-1} z = w.
$$

Since $\overline{w} = w$, the imaginary part of $w$ is zero and $u^{-1} z = w = \operatorname{Re}(w) = r$. Multiplying both sides of $u^{-1} z = r$ on the left by $u$ and using $u u^{-1} = 1$ (as $\|u\| = 1 \implies u \neq 0$) gives $z = u \cdot r$. The full proof is checked by the Lean kernel.
:::

Geometrically, [@prop-phase-locked-overlap] says that multiplying by $u^{-1}$ rotates the complex plane to align the real axis with $u$; the reflection symmetry $\overline{z} = (u^{-1})^2 z$ means $\overline{u^{-1}z} = u^{-1}z$, so $z$ is collinear with $u$ (spanning zero wedge area $u \wedge z = 0$) and differs from $u$ only by the real signed projection $r = \operatorname{Re}(u^{-1}z)$.

::: {.figure src="ch05-phase-locked"}
**A phase-locked overlap lies on the line of $u$.** The cyan line runs through the origin and the unit phase $u$. The amber $z = u \cdot r$ lies on it: its mirror image in the line is itself, which is $\overline{z} = (u^{-1})^2 z$, and the area it spans with $u$ is zero ([@prop-phase-locked-overlap]). The grey $z'$ is off the line: its mirror image (the dashed arrow) is a different point, and with $u$ it spans a magenta parallelogram.
:::

## 5.4 Pure Geometric Rotor Atlas of Standard Single-Qubit Gates ($X, Y, Z, H, S, T$) {#sec-single-qubit-gates-as-rotors}

We are now ready to bring the six workhorse single-qubit gates of quantum computing — the Pauli gates $X, Y, Z$, the Hadamard gate $H$, the phase gate $S$, and the $\pi/8$ gate $T$ — down from their abstract matrix pedestal and assemble their **three-dimensional Bloch rotor atlas**.

Whenever you read a quantum circuit diagram, keep a single dictionary entry in mind: if a single-qubit unitary gate is written in $\mathrm{SU}(2)$ rotor form (up to a physically unobservable global phase $e^{i\alpha}$),

$$
U = e^{i\alpha} R_{\hat{\vv{n}}}(\theta) = e^{i\alpha}\left(\cos\frac{\theta}{2}\,I_2 - i\sin\frac{\theta}{2}\,(\hat{\vv{n}}\cdot\vv{\sigma})\right),
$$

its sole geometric action in three-space is to **rotate the Bloch sphere rigidly by angle $\theta$ (right-hand rule) about the unit axis $\hat{\vv{n}} \in S^2$ — that is, within the Hodge-dual bivector plane $\vv{B} = \star\hat{\vv{n}}$**!

::: {.figure src="ch05-gate-atlas"}
**Six gates, each one turn about one axis.** On each sphere the violet line is the axis $\hat{\vv{n}}$ and the amber arc is the path of the turn, from the grey dot to the amber one. $X$ and $Y$ each turn by $180^\circ$ and both send the north pole $\lvert 0\rangle$ to the south pole $\lvert 1\rangle$, by different routes; $Z$ turns by $180^\circ$ and sends $\lvert +\rangle$ on the equator to the opposite side; $H$ turns by $180^\circ$ about the axis halfway between $x$ and $z$ and sends the north pole to $\lvert +\rangle$; $S$ and $T$ turn about the same vertical axis by $90^\circ$ and $45^\circ$. Axes and angles are those of the table in [@ex-single-qubit-gate-atlas] below.
:::

First watch Hadamard carry the north-pole state to the equator, then read through the rotor parameters in the table below.

::: {.viz src="qubit-geometry" preset="hadamard" height="500"}
**A half-turn about a tilted axis.** Starting at the north pole $\lvert 0\rangle$, the amber arrow $B$ turns about the violet axis $\hat h = (\vv{e}_1 + \vv{e}_3)/\sqrt{2}$ and ends at $\lvert +\rangle$ on the equator. The cyan line shrinks from $1$ to zero as the magenta area grows from zero to $1$. The frame stops at the end: line $0$, area $1$, and the half-turn travelled drawn solid (during playback the dashed path is the part still ahead).
:::

::: {.example #ex-single-qubit-gate-atlas title="Rotor Atlas of the Six Standard Single-Qubit Gates and Explicit Balanced-Sum Verification for Hadamard"}
The table below compiles the matrix form, $\mathrm{SU}(2)$ rotor decomposition, rotation bivector plane $\vv{B}$, Bloch rotation axis $\hat{\vv{n}}$, and Bloch rotation angle $\theta$ (with spinor half-angle $\theta/2$) for $\{X, Y, Z, H, S, T\}$, followed by an explicit matrix verification of [@thm-balanced-sum-skew-adjoint] and [@thm-relative-complex-structure-square] on the Hadamard gate $H$:

| Gate | Matrix Form | $\mathrm{SU}(2)$ Rotor Form $e^{i\alpha}R_{\hat{\vv{n}}}(\theta)$ | Rotation Bivector Plane $\vv{B}$ | Bloch Rotation Axis $\hat{\vv{n}}$ | Bloch Angle $\theta$ (Half-Angle $\theta/2$) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **$X$** | $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ | $i\bigl(\cos\frac{\pi}{2}I - i\sin\frac{\pi}{2}\sigma_x\bigr)$ | $\vv{e}_2 \wedge \vv{e}_3$ ($YZ$ plane) | $+\vv{e}_1 = (1, 0, 0)$ | $\pi = 180^\circ$ ($\frac{\pi}{2} = 90^\circ$) |
| **$Y$** | $\begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}$ | $i\bigl(\cos\frac{\pi}{2}I - i\sin\frac{\pi}{2}\sigma_y\bigr)$ | $\vv{e}_3 \wedge \vv{e}_1$ ($ZX$ plane) | $+\vv{e}_2 = (0, 1, 0)$ | $\pi = 180^\circ$ ($\frac{\pi}{2} = 90^\circ$) |
| **$Z$** | $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ | $i\bigl(\cos\frac{\pi}{2}I - i\sin\frac{\pi}{2}\sigma_z\bigr)$ | $\vv{e}_1 \wedge \vv{e}_2$ ($XY$ equator) | $+\vv{e}_3 = (0, 0, 1)$ | $\pi = 180^\circ$ ($\frac{\pi}{2} = 90^\circ$) |
| **$H$** | $\frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$ | $i\left(\cos\frac{\pi}{2}I - i\sin\frac{\pi}{2}\frac{\sigma_x + \sigma_z}{\sqrt{2}}\right)$ | $\frac{\vv{e}_2 \wedge \vv{e}_3 + \vv{e}_1 \wedge \vv{e}_2}{\sqrt{2}}$ | $\frac{\vv{e}_1 + \vv{e}_3}{\sqrt{2}}$ ($45^\circ$ diagonal) | $\pi = 180^\circ$ ($\frac{\pi}{2} = 90^\circ$) |
| **$S$** | $\begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}$ | $e^{i\pi/4}\bigl(\cos\frac{\pi}{4}I - i\sin\frac{\pi}{4}\sigma_z\bigr)$ | $\vv{e}_1 \wedge \vv{e}_2$ ($XY$ equator) | $+\vv{e}_3 = (0, 0, 1)$ | $\frac{\pi}{2} = 90^\circ$ ($\frac{\pi}{4} = 45^\circ$) |
| **$T$** | $\begin{pmatrix} 1 & 0 \\ 0 & e^{i\pi/4} \end{pmatrix}$ | $e^{i\pi/8}\bigl(\cos\frac{\pi}{8}I - i\sin\frac{\pi}{8}\sigma_z\bigr)$ | $\vv{e}_1 \wedge \vv{e}_2$ ($XY$ equator) | $+\vv{e}_3 = (0, 0, 1)$ | $\frac{\pi}{4} = 45^\circ$ ($\frac{\pi}{8} = 22.5^\circ$) |

Now let us check [@thm-balanced-sum-skew-adjoint] and [@thm-relative-complex-structure-square] explicitly on the **Hadamard gate** $H = \frac{1}{\sqrt{2}}(X + Z)$:

1. **Balanced unitary decomposition**: Set $A := \frac{1}{\sqrt{2}}X$ and $B := \frac{1}{\sqrt{2}}Z$, so that $H = A + B$. Because $X^* = X, Z^* = Z$ and $X^2 = Z^2 = I_2$, each summand has half-identity norm:
   $$
   A A^* = \frac{1}{2}X^2 = \frac{1}{2}I_2, \qquad B B^* = B^* B = \frac{1}{2}Z^2 = \frac{1}{2}I_2.
   $$
2. **Orthogonal anticommutation cancels the cross-term**: Since $H H^* = \frac{1}{2}(X+Z)^2 = I_2$, [@thm-balanced-sum-skew-adjoint] guarantees that the symmetric cross-term vanishes:
   $$
   A B^* + B A^* = \frac{1}{2}(XZ + ZX) = 0,
   $$
   reflecting the orthogonality (anticommutation $XZ = -ZX$) between the horizontal $X$ axis and the vertical $Z$ axis!
3. **Relative complex structure generates the $-iY$ rotation plane**: By [@thm-relative-complex-structure-square], the relative complex structure $J := 2 A B^*$ is
   $$
   J = 2\Bigl(\frac{1}{\sqrt{2}}X\Bigr)\Bigl(\frac{1}{\sqrt{2}}Z\Bigr) = XZ = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} = -iY!
   $$
   Indeed, $J^* = (-iY)^* = +iY = -J$ (skew-adjoint) and $J^2 = (-iY)^2 = -Y^2 = -I_2$! Even better, the companion Hermitian involution $K = iJ = i(-iY) = +Y$ is literally the **third Pauli axis $Y$** perpendicular to the $XZ$ plane ($Y^* = Y$, $Y^2 = I_2$)! Note both angles explicitly so the spinor half-angle and the Bloch rotation angle are never conflated: blending the two orthogonal components $X$ and $Z$ in a balanced sum spans the oriented area $J = XZ = -iY = \bigl(\begin{smallmatrix} 0 & -1 \\ 1 & 0 \end{smallmatrix}\bigr)$, which is a **$90^\circ$ ($\pi/2$) quarter-turn on the real two-component state-amplitude plane** $(\psi_0, \psi_1)^{\mathsf{T}}$ and equals the spinor rotor $R_y(\pi) = \exp(-i\frac{\pi}{2}Y)$; when acting via the two-sided sandwich product $J\,\vv{v}\,J^\dagger$ on the **Bloch sphere $S^2$**, the two half-angles add up to a **$180^\circ$ ($\pi$) half-turn about the $Y$ axis** (flipping the north pole $\lvert 0\rangle$ to the south pole $\lvert 1\rangle$)!
:::

Once a single gate is clear, connect $H$, $Z$, and $H$ in that order. A shared timeline lets you examine the three turns one segment at a time.

::: {.viz src="qubit-geometry" preset="hzh" height="500"}
**Three gates, three turns.** The amber arrow $B$ turns about the axes of $H$, $Z$, and $H$ in sequence. The violet dashed line marks the axis of the current turn; the upper left shows the current gate, the angle travelled, and the rotor's scalar part $w$. Drag the timeline to pause within each segment and compare the cyan line with the magenta area.
:::

::: {.remark #rem-clifford-rotor-literature title="Quaternions, Rodrigues's Half-Angle Formula, and the Clifford Spinor Double Cover (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** In this chapter, [@thm-balanced-sum-skew-adjoint], [@lemma-skew-adjoint-unitary-square], and [@thm-relative-complex-structure-square] formalize the matrix-algebraic construction of the skew-adjoint relative complex structure $J^2 = -I_n$ from a balanced unitary sum, while [@prop-phase-locked-overlap] formalizes the real-amplitude factorization of phase-locked overlaps. The historical lineage and three-dimensional Clifford rotor formulas belong to the classical mathematical-physics literature:

1. **Rodrigues's half-angle composition law (O. Rodrigues, 1840) and Hamilton's quaternions (W. R. Hamilton, 1843)**: Olinde Rodrigues (*Des lois géométriques qui régissent les déplacements d'un système solide dans l'espace*, J. Math. Pures Appl. **5**, 380–440, 1840) first derived the half-angle tangent law for composing three-dimensional rotations from pairs of reflections; three years later, William Rowan Hamilton carved $\mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{i}\mathbf{j}\mathbf{k} = -1$ into Brougham Bridge. Seen through modern exterior algebra, Hamilton's $\mathbf{i}, \mathbf{j}, \mathbf{k}$ are not vectors at all, but the three orthonormal **unit bivectors (rotation planes)** of $\mathbb{R}^3$: $\mathbf{i} = -\vv{e}_2 \wedge \vv{e}_3 = -i\sigma_x$, $\mathbf{j} = -\vv{e}_3 \wedge \vv{e}_1 = -i\sigma_y$, and $\mathbf{k} = -\vv{e}_1 \wedge \vv{e}_2 = -i\sigma_z$.
2. **Clifford's geometric algebra and the Pauli isomorphism (W. K. Clifford, 1878)**: William Kingdon Clifford (*Applications of Grassmann's extensive algebra*, Amer. J. Math. **1**, 350–358, 1878) united Grassmann's exterior product $\vv{a}\wedge\vv{b}$ (1844) and the inner product $\vv{a}\cdot\vv{b}$ into the associative geometric product $\vv{a}\vv{b} = \vv{a}\cdot\vv{b} + \vv{a}\wedge\vv{b}$. Within the full Clifford algebra $\mathrm{Cl}_{3,0}(\mathbb{R}) \cong M_2(\mathbb{C})$ (real dimension $8$), the even subalgebra $\mathrm{Cl}^+_{3,0}(\mathbb{R}) = \mathbb{R} \oplus \Lambda^2(\mathbb{R}^3) \cong \mathbb{H}$ (real dimension $4$) is spanned by scalars and bivectors, with every unit bivector $\vv{B}$ satisfying $\vv{B}^2 = -1$.
3. **Spinor double cover $\mathrm{Spin}(3) \cong \mathrm{SU}(2) \xrightarrow{2:1} \mathrm{SO}(3)$ and Rodrigues's formula**: For any unit bivector $\vv{B} = \star\hat{\vv{n}}$ and angle $\theta \in \mathbb{R}$, the rotor $R(\theta) = \cos(\theta/2) - \vv{B}\sin(\theta/2) \in \mathrm{Spin}(3)$ acts on $\vv{v} \in \mathbb{R}^3$ via the two-sided sandwich product to yield Rodrigues's rotation formula:
   $$
   \vv{v}' = R(\theta)\vv{v}R(\theta)^\dagger = \vv{v}\cos\theta + (\hat{\vv{n}}\times\vv{v})\sin\theta + \hat{\vv{n}}(\hat{\vv{n}}\cdot\vv{v})(1 - \cos\theta).
   $$
   Because advancing $\theta \mapsto \theta + 2\pi$ negates the half-angle rotor $R(\theta + 2\pi) = -R(\theta)$ while $(-R)\vv{v}(-R)^\dagger = R\vv{v}R^\dagger$, the rotor group $\mathrm{Spin}(3) \cong \mathrm{SU}(2) \cong S^3$ forms the universal $2:1$ double cover of $\mathrm{SO}(3) \cong \mathbb{RP}^3$ (a spinor reverses sign under a $360^\circ$ turn and returns to itself only after $720^\circ$). The case of a fixed plane of rotation — the squaring map from the circle of rotors to the circle of rotations — is verified by [@thm-circle-double-cover-history-lift]: path lifts are unique, there is no continuous global section, and a full turn negates the rotor; the full cover $\mathrm{Spin}(3) \to \mathrm{SO}(3)$, the Rodrigues formula and $\mathrm{SO}(3) \cong \mathbb{RP}^3$ remain literature results.

These classical Clifford-algebraic and historical results provide geometric context and are not claimed in the book's Lean verification ledger.
:::

::: {.viz src="qubit-geometry" height="560"}
**Full laboratory.** Switch experiment cards, drag $B$, or append gates to compare the turns on the sphere with the detector weights, fringes, and rotor curves below.
:::

Having demystified $i$ and seen how oriented bivector area $\vv{A} \wedge \vv{B}$ drives every single-qubit gate, a grand synthesis now beckons: if the inner product $\vv{A}\cdot\vv{B}$ of Part I governs particle projection and the exterior product $\vv{A}\wedge\vv{B}$ of this chapter governs wave rotation and interference, what happens when we weld both halves back together into the single geometric product $\vv{A}\vv{B} = \vv{A}\cdot\vv{B} + \vv{A}\wedge\vv{B}$? Turn to [Chapter 6](ch06-geometric-product.md).
