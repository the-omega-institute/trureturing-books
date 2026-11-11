# Chapter 2 Eliminating the Third Point C: Self-Referential Basis and Inner-Product Projection

> *"In truth, point $C$ is not a given input, but the projection of a compatibility point — for a single definite quantum state can determine only a line, whereas it takes a family of quantum states to correspond to an area."*

At the close of [Chapter 1](ch01-measurement.md), we liberated the single qubit from complex column vectors with two components (four real coordinates) and restored it to what it truly is: a real unit arrow $\vv{a}$ on the two-sphere $S^2 \subset \mathbb{R}^3$. Now we confront the central quantitative law of quantum mechanics: when a prepared state $\vv{a}$ meets a probing direction $\vv{b}$, why does the detector report agreement with probability equal to the squared cosine of the Hilbert-space half-angle $\cos^2(\theta/2)$ — or equivalently $\frac{1 + \cos\theta}{2}$ on the Bloch sphere?

In conventional textbooks, Born's rule ($p = |\langle\phi\mid\psi\rangle|^2$) arrives like a tablet carried down from the mountain: an independent statistical postulate bolted onto linear algebra because "experiments happen to match the modulus squared." In this chapter we take Occam's razor to the redundant "third point $C$" and show that Born's rule is no external patch — it is the **canonical basis-free trace pairing induced by pairwise inner-product projection and Pythagorean norm conservation** (with [@thm-born-probability-skeleton] establishing **sufficiency** of the trace pairing for the probability axioms, while the additional frame- or effect-additivity hypotheses required for **uniqueness** are delineated in [@rem-gleason-literature]).

::: {.figure src="ch02-overview"}
**Figure 2.** The chapter at a glance. Panel I: the grey dashed external vertical axis $C$ is struck out; the cyan arrow $A$ is its own axis, and the amber arrow $B$ is a single angle $\theta$ away from it. Panel II: the perpendicular from the amber $\vv{b}$ onto the cyan line of $\vv{a}$ lands at the foot $C$; the thick cyan segment is the shadow $\vv{c}$ and the dashed magenta segment is the perpendicular remainder. Panel III: $\lvert 0\rangle$ and $\lvert 1\rangle$, $180^\circ$ apart on the Bloch sphere, are only $90^\circ$ apart in Hilbert space.
:::

## 2.1 The Measurement Basis Under Occam's Razor {#sec-ch02-1}

Why do calculations of transition probabilities between two arbitrary states feel so clunky to beginners? Because habit bows before the idol of an **external third point $C$**: students first pick an arbitrary laboratory basis $C = \{\lvert 0\rangle, \lvert 1\rangle\}$ unrelated to the problem, expand state $A$ relative to $C$ via some unitary $U_A\lvert 0\rangle$, expand probe $B$ relative to $C$ via another unitary $U_B\lvert 0\rangle$, and finally multiply the two coordinate matrices back together as $U_B^* U_A$. That is like measuring the angle between two pencils lying on your desk by first surveying the latitude and longitude of each pencil relative to the Greenwich Royal Observatory!

Raise Occam's razor and **cut out the third point $C$**.

Compare the two routes on a concrete classroom calculation. Suppose two arrows lie on the same meridian of the sphere: state $A$ tilted at $\theta_A = 60^\circ$ from the laboratory ceiling, and probe $B$ tilted at $\theta_B = 120^\circ$ from the laboratory ceiling.

- **The redundant Point-$C$ coordinate detour**: Treating the ceiling as an external $Z$ axis, you first write $\lvert\psi_A\rangle = \binom{\cos 30^\circ}{\sin 30^\circ} = \binom{\sqrt{3}/2}{1/2}$, next write $\lvert\psi_B\rangle = \binom{\cos 60^\circ}{\sin 60^\circ} = \binom{1/2}{\sqrt{3}/2}$, multiply four components to get $\langle\psi_B\mid\psi_A\rangle = \frac{\sqrt{3}}{4} + \frac{\sqrt{3}}{4} = \frac{\sqrt{3}}{2}$, and square to obtain $\frac{3}{4}$ — and if azimuthal angles $\phi_A, \phi_B$ are nonzero as well, eight trigonometric products and complex exponentials flood the page!
- **The zero-redundancy self-referential shortcut**: What does the ceiling have to do with these two arrows? When only a known premise state $A$ and a target state $B$ exist, what deserves to serve as the principal axis? **State $A$ itself!** Align your zero-degree reference directly along $A$; then $B$ sits at the single intrinsic angle $\theta = 120^\circ - 60^\circ = 60^\circ$, and half a second of mental arithmetic gives $\cos^2(60^\circ/2) = \cos^2 30^\circ = \frac{3}{4}$!

::: {.figure src="ch02-cut-c"}
**The same pair of arrows: two angles, or one.** On the left, the grey dashed ceiling $Z$ plays the third point $C$: the cyan $A$ is $60^\circ$ from it and the amber $B$ is $120^\circ$ from it, and both angles must be turned into coordinates and multiplied out. On the right, the ceiling is gone and the cyan $A$ is its own axis: $B$ is a single angle $\theta = 60^\circ$ away, giving the weight $\cos^2 30^\circ = \frac{3}{4}$, the same number as on the left.
:::

In finite-dimensional matrix algebra, which operation natively erases every trace of an external basis $C$? Literally the **matrix trace** ($\Tr X = \sum_i X_{ii}$). By cyclicity, $\Tr(U^{-1} X U) = \Tr(X U U^{-1}) = \Tr(X)$ for every invertible basis change $U$: twist the external scaffolding $C$ however you please, and the trace pairing $\Tr(\rho P)$ between a state $\rho$ and a projector $P$ never flickers! Zero-redundancy comparison between $\rho$ and $P$ is therefore naturally expressed via the canonical basis-free trace pairing.

::: {.definition #def-born-probability title="Finite-Dimensional Born Trace Weight" lean="D5/S3/Quantum/FiniteDimensional.bornProbability"}
Let $n$ be a finite index type. For any complex square matrices $\rho, P \in M_n(\mathbb{C})$, the **Born trace weight** assigned by $\rho$ to $P$ (`bornProbability rho P` in Lean) is the trace of their matrix product:

$$
\operatorname{bornProbability}(\rho, P) = \Tr(\rho P) \in \mathbb{C}.
$$
:::

At the level of [@def-born-probability], $\Tr(\rho P)$ has codomain $\mathbb{C}$. Why does it automatically shed its imaginary part and land in $[0, 1]$ as an additive, normalized real probability whenever $\rho$ is a valid density state (positive semidefinite of trace $1$) and $P$ is a valid yes/no shutter (self-adjoint and idempotent)? The next theorem establishes this complete probability skeleton.

::: {.theorem #thm-born-probability-skeleton title="Probability-Measure Skeleton of Born Trace Pairing" lean="D5/S3/Quantum/FiniteDimensional.born_probability_skeleton"}
Let $n$ be a finite index type with decidable equality, and let $\rho \in M_n(\mathbb{C})$ be a positive semidefinite matrix with $\Tr(\rho) = 1$. Then the functional of [@def-born-probability] satisfies:

1. **Normalization**: $\operatorname{bornProbability}(\rho, I) = 1$;
2. **Finite additivity**: for all matrices $P, Q \in M_n(\mathbb{C})$,

   $$
   \operatorname{bornProbability}(\rho, P + Q) = \operatorname{bornProbability}(\rho, P) + \operatorname{bornProbability}(\rho, Q);
   $$

3. **Real nonnegativity on projections**: for every matrix $P \in M_n(\mathbb{C})$ satisfying self-adjointness $P^* = P$ and idempotence $P^2 = P$, we have in the complex partial order

   $$
   0 \le \operatorname{bornProbability}(\rho, P),
   $$

   meaning $\Tr(\rho P)$ has zero imaginary part and nonnegative real part.
:::

::: proof
Property 1 follows from $\rho I = \rho$ and $\Tr(\rho) = 1$. Property 2 follows from distributivity $\rho(P + Q) = \rho P + \rho Q$ and linearity of the trace. Property 3 rests on the interplay between idempotence $P = P^2$, self-adjointness $P^* = P$, and trace cyclicity:

$$
\Tr(\rho P) = \Tr(\rho P^2) = \Tr(\rho P P^*) = \Tr(P^* \rho P) = \Tr(P \rho P^*).
$$

Because $\rho$ is positive semidefinite, $\langle v, P \rho P^* v\rangle = \langle P^* v, \rho(P^* v)\rangle \ge 0$ for every $v \in \mathbb{C}^n$, so the sandwich compression $P \rho P^*$ is positive semidefinite (`PosSemidef.mul_mul_conjTranspose_same` in Lean). Every diagonal entry of a positive semidefinite matrix is real and nonnegative, hence so is its trace. Combined with properties 1 and 2 applied to the complementary projector $I - P$, this also bounds $\Tr(\rho P) = 1 - \Tr(\rho(I - P)) \le 1$. The full proof is checked by the Lean kernel.
:::

Watch how property 3 works under the hood: simply because a sharp shutter obeys the idempotent law $P = P^2 = P P^*$ ("asking the same question twice gives the same answer"), the seemingly asymmetric one-sided product $\rho P$ cycles inside the trace into the symmetric positive compression $P \rho P^*$! Sharp projective measurements yield real, nonnegative probabilities directly from this self-adjoint idempotent sandwich structure.

Two quick $2\times 2$ counterexamples illustrate why property 3 of [@thm-born-probability-skeleton] requires both $P^* = P$ and $P^2 = P$ as sufficient conditions for sharp projectors:

- **Drop self-adjointness ($P^* \neq P$)**: Take the oblique idempotent $Q = \begin{pmatrix} 1 & 1 \\ 0 & 0 \end{pmatrix}$ ($Q^2 = Q$, $Q^* \neq Q$) against the $+Y$ state $\rho_{+Y} = \frac{1}{2}\begin{pmatrix} 1 & -i \\ i & 1 \end{pmatrix}$; the trace immediately acquires a nonzero imaginary part:

  $$
  \Tr(\rho_{+Y} Q) = \frac{1 + i}{2} \notin \mathbb{R}!
  $$

- **Drop idempotence without maintaining positivity ($P^2 \neq P$)**: Take the self-adjoint Pauli reflection $Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ ($Z^* = Z$, $Z^2 = I \neq Z$) against the south-pole state $\rho_1 = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$; the trace plunges below zero:

  $$
  \Tr(\rho_1 Z) = -1 < 0!
  $$

::: {.remark #rem-povm-effect-converse-literature title="POVM Effect Bounds and Extreme Sharp Projectors (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** To state the exact converse boundary: for a general operator $E \in M_n(\mathbb{C})$, $\Tr(\rho E) \in [0, 1]$ holds across all density states $\rho$ if and only if $E$ is a self-adjoint **POVM effect** obeying the operator bound $0 \le E \le I$ (for instance, the unsharp fair-coin effect $E = \frac{1}{2}I$ is non-idempotent, $E^2 = \frac{1}{4}I \neq E$, yet still yields $\Tr(\rho E) = \frac{1}{2} \in [0, 1]$ for every state, as discussed in [@rem-gleason-literature]). Within the convex effect interval $\{E : 0 \le E \le I\}$, self-adjointness $P^* = P$ paired with idempotence $P^2 = P$ (restricting eigenvalues strictly to $\{0, 1\}$) both guarantees $0 \le P \le I$ and characterizes **sharp projective effects**, the extreme points free of intrinsic fuzziness. With the Lüders state update used in this book and no intervening evolution, immediate repetition confirms the same outcome; effects determine outcome probabilities without specifying the post-measurement state.
:::

## 2.2 What Is "Point C" Really? {#sec-ch02-2}

Once the external coordinate origin $C$ has been shaved away, an instructive puzzle remains: why, whenever we sketch the inner product of two unit vectors $\vv{a}$ and $\vv{b}$ on a blackboard, does our chalk still naturally label a third point $C$ — namely, the **foot of the perpendicular** dropped from the tip of $\vv{b}$ onto the line of $\vv{a}$?

Here lies the decisive turn from external metaphysics to relational geometry: **the true "point $C$" was never an independent third judge standing outside $A$ and $B$; it is the endogenous compatibility shadow cast by $B$ onto $A$!**

Take the unit vector $\vv{a}$ as principal axis. Orthogonal projection of the unit vector $\vv{b}$ onto $\vv{a}$ produces the vector

$$
\vv{c} = (\vv{a} \cdot \vv{b})\,\vv{a} = (\cos\theta)\,\vv{a}.
$$

Observe that $\vv{c}$ possesses zero degrees of freedom independent of $\vv{a}$ and $\vv{b}$: its direction is borrowed wholly from $\vv{a}$, and its signed length $\vv{a} \cdot \vv{b} = \cos\theta$ measures purely how compatible $\vv{b}$ is with $\vv{a}$ (**compatibility** in our controlled glossary). Meanwhile, the perpendicular rejection vector rising from the foot $\vv{c}$ to the tip of $\vv{b}$,

$$
\vv{b}_\perp = \vv{b} - \vv{c} = \vv{b} - (\vv{a} \cdot \vv{b})\,\vv{a},
$$

satisfies $\vv{a} \cdot \vv{b}_\perp = \vv{a}\cdot\vv{b} - (\vv{a}\cdot\vv{b})(\vv{a}\cdot\vv{a}) = 0$ with squared norm $\norm{\vv{b}_\perp}^2 = 1 - \cos^2\theta = \sin^2\theta$ (in Part II, Chapter 5, we will recognize this $\sin\theta$ rejection leg as the generator of the oriented bivector area $\vv{a} \wedge \vv{b}$). "Point $C$" is born on the spot from the encounter of $A$ and $B$. The error of classical coordinate thinking was never drawing the foot of a perpendicular — it was mistaking that relational shadow for an absolute stage existing prior to the actors!

::: {.figure src="ch02-shadow"}
**"Point $C$" is the shadow of $\vv{b}$ on $\vv{a}$.** The amber unit arrow $\vv{b}$ makes an angle $\theta$ with the cyan line of $\vv{a}$ ($50^\circ$ in the drawing); the perpendicular from its tip lands at the foot marked $C$. The thick cyan segment from the origin to $C$ is $\vv{c} = (\vv{a}\cdot\vv{b})\vv{a}$, of length $\cos\theta$; the dashed magenta segment from $C$ to the tip is $\vv{b}_\perp = \vv{b} - \vv{c}$, of length $\sin\theta$, at a right angle to $\vv{a}$.
:::

This also resolves the dimensional question posed in our opening epigraph about lines versus areas. A single pure state $A$ fixes only a one-dimensional ray $\vv{a}$. Even two non-collinear states $A$ and $B$ together span only a **planar wedge sector** inside the flat disc of their great circle (whose oriented bivector area $\vv{a} \wedge \vv{b}$ drives planar gate rotations in Part II, Chapter 5); on the spherical shell $S^2$ itself, the geodesic arc joining $A$ and $B$ remains a one-dimensional curve enclosing **zero spherical-triangle surface area** ($\Omega = 0$). A genuine **spherical surface area (solid angle $\Omega$)** emerges only when an external reference axis $C$ (such as the laboratory pole $\lvert 0\rangle$) or a third non-coplanar state direction is introduced so that three non-coplanar rays enclose a spherical triangle on $S^2$ (whose intrinsic multi-state geometry is governed by the Gram matrix in Part III, Chapter 10). That is why dragging an external axis $\lvert 0\rangle$ into a purely pairwise measurement manufactures spurious spherical-triangle phase area out of thin air!

> Seek no third judge outside the two arrows: when the first serves as ruler for the second, the shadow cast upon the ruler is itself the third point.

Let us verify how this squared projection shadow appears in arbitrary finite dimension $\mathbb{C}^n$. When a pure state is represented by the rank-one outer product $\rho = \psi\psi^* = \lvert\psi\rangle\langle\psi\rvert$ and outcome branch $k$ is represented by the rank-one projector $P_k = \phi\phi^* = \lvert\phi\rangle\langle\phi\rvert$ (`Matrix.vecMulVec u (star u)` in Lean, with branch weight [`recordWeight`](lean:D5/S3/Observer/Conditioning.recordWeight) defined as `recordWeight P rho k := bornProbability rho (P k)`), what does the coordinate-free trace $\Tr(\rho P_k)$ evaluate to?

The physical case above takes $\phi,\psi$ to be unit vectors; the algebraic identity below requires only the two outer-product equalities and also allows unnormalized and zero vectors.

::: {.theorem #thm-born-modulus-square title="Squared-Modulus Reduction of Record Weights for Outer-Product Matrices" lean="D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction"}
Let $n$ be a finite index type, $\kappa$ an outcome index type, $P : \kappa \to M_n(\mathbb{C})$ a family of matrices, $\rho \in M_n(\mathbb{C})$, $k \in \kappa$, and $\phi, \psi \in \mathbb{C}^n$ arbitrary vectors. If the matrices $P_k$ and $\rho$ satisfy

$$
P_k = \phi\phi^* = \lvert\phi\rangle\langle\phi\rvert, \qquad \rho = \psi\psi^* = \lvert\psi\rangle\langle\psi\rvert,
$$

then the record weight reduces to the squared norm of the complex inner product $\langle\phi\mid\psi\rangle = \phi^* \cdot \psi$ (coerced from $\mathbb{R}$ into $\mathbb{C}$):

$$
\operatorname{recordWeight}(P, \rho, k) = \norm{\langle\phi\mid\psi\rangle}^2.
$$
:::

::: proof
Substitute $P_k = \lvert\phi\rangle\langle\phi\rvert$ and $\rho = \lvert\psi\rangle\langle\psi\rvert$ into $\operatorname{recordWeight}(P, \rho, k) = \Tr(\rho P_k)$. Multiplying the two rank-one outer products (`Matrix.vecMulVec_mul_vecMulVec`) contracts the adjacent bra $\langle\psi\rvert$ and ket $\lvert\phi\rangle$ into the scalar $\langle\psi\mid\phi\rangle$:

$$
\rho P_k = \bigl(\lvert\psi\rangle\langle\psi\rvert\bigr)\bigl(\lvert\phi\rangle\langle\phi\rvert\bigr) = \langle\psi\mid\phi\rangle\,\lvert\psi\rangle\langle\phi\rvert.
$$

Taking the trace of the remaining outer product $\lvert\psi\rangle\langle\phi\rvert$ (`Matrix.trace_vecMulVec`) yields the reverse overlap $\Tr(\lvert\psi\rangle\langle\phi\rvert) = \langle\phi\mid\psi\rangle$. Because $\langle\psi\mid\phi\rangle = \overline{\langle\phi\mid\psi\rangle}$, their product is the conjugate square

$$
\Tr(\rho P_k) = \overline{\langle\phi\mid\psi\rangle}\,\langle\phi\mid\psi\rangle = \norm{\langle\phi\mid\psi\rangle}^2.
$$

The full proof is checked by the Lean kernel.
:::

Notice the clarity of [@thm-born-modulus-square]. In ket notation, multiplying an amplitude $\langle\phi\mid\psi\rangle$ by its complex conjugate $\overline{\langle\phi\mid\psi\rangle}$ often looks like an ad hoc trick invented to force a complex number to become real and positive. In the zero-redundancy projector picture, the "forward projection" $\langle\phi\mid\psi\rangle$ and the "return projection" $\langle\psi\mid\phi\rangle$ are simply the two halves of the closed trace loop $\Tr(\rho P_k)$!

Gauge geometry confirms why a bare open overlap $\langle\phi\mid\psi\rangle$ can never be an observable by itself: if Alice re-phases $\lvert\psi'\rangle = e^{i\alpha}\lvert\psi\rangle$ and Bob independently re-phases $\lvert\phi'\rangle = e^{i\beta}\lvert\phi\rangle$, the physical rays of [Chapter 1](ch01-measurement.md) do not budge ($\rho' = \rho$, $P_k' = P_k$), yet the one-way overlap picks up an arbitrary gauge artifact $\langle\phi'\mid\psi'\rangle = e^{i(\alpha - \beta)}\langle\phi\mid\psi\rangle$! Only by closing the round-trip loop $\lvert\psi\rangle \to \lvert\phi\rangle \to \lvert\psi\rangle$ do the outgoing phase $e^{+i(\alpha - \beta)}$ and returning phase $e^{-i(\alpha - \beta)}$ cancel identically:

$$
\langle\psi'\mid\phi'\rangle\langle\phi'\mid\psi'\rangle = e^{-i(\alpha-\beta)}e^{+i(\alpha-\beta)}\norm{\langle\phi\mid\psi\rangle}^2 = \Tr(\rho P_k).
$$

(And here is a preview worth savoring: when the round trip visits *three* rays $\psi \to \phi \to \chi \to \psi$ enclosing an oriented geodesic triangle on $S^2$, with nonzero overlaps between adjacent states, the argument of the three-point Bargmann trace $\Tr(P_\psi P_\chi P_\phi)$ equals $-\Omega/2$ modulo $2\pi$ under the spin-up and orientation conventions of [Part III, Chapter 10](ch10-gram-geometry-and-order.md#sec-spherical-order-and-berry) — the **geometric Berry phase**!)

## 2.3 The Purely Geometric Origin of Born's Rule {#sec-ch02-3}

Now place the single branch $P_k$ inside a complete family of mutually orthogonal record channels $\{P_j\}_{j \in \kappa}$ (`IsRecordMeasurement P`, formalized via [`IsRecordMeasurement`](lean:D5/S3/Observer/Conditioning.IsRecordMeasurement) and studied in full in [Chapter 3](ch03-projectors-and-duality.md)), satisfying $P_j^* = P_j$, $P_j^2 = P_j$, $P_j P_l = 0$ ($j \neq l$), and $\sum_{j \in \kappa} P_j = I$. Before the observer reads which detector clicked, the post-measurement ensemble is the unread state $\operatorname{unreadState}(P, \rho) = \sum_j P_j \rho P_j$; upon reading outcome $j$ with nonzero weight, the state updates to the normalized [`conditionalState`](lean:D5/S3/Observer/Conditioning.conditionalState) $\rho_{|j} = \operatorname{recordWeight}(P, \rho, j)^{-1} P_j \rho P_j$.

The next theorem unifies the squared transition modulus, the basis-free trace pairing, and the conditional ensemble decomposition in a single statement.

::: {.theorem #thm-rank-one-born-pairing title="Born Pairing and Conditional Ensemble for a Rank-One Branch of a Record Measurement" lean="D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight"}
Let $n$ and $\kappa$ be finite index types (with decidable equality on $n$), let $P : \kappa \to M_n(\mathbb{C})$ be a complete orthogonal record measurement (`IsRecordMeasurement P`), and let $\rho \in M_n(\mathbb{C})$ be positive semidefinite with $\Tr(\rho) = 1$. For a branch $k \in \kappa$ and vectors $\phi, \psi \in \mathbb{C}^n$, if $P_k = \lvert\phi\rangle\langle\phi\rvert$ and $\rho = \lvert\psi\rangle\langle\psi\rvert$, then all three identities hold:

1. **Squared-modulus reduction**: $\operatorname{recordWeight}(P, \rho, k) = \norm{\langle\phi\mid\psi\rangle}^2$;
2. **State–projection trace pairing**: $\operatorname{recordWeight}(P, \rho, k) = \Tr(\rho P_k)$;
3. **Weighted conditional ensemble identity**:

   $$
   \operatorname{unreadState}(P, \rho) = \sum_{j \in \kappa} \operatorname{recordWeight}(P, \rho, j)\,\operatorname{conditionalState}(P, \rho, j).
   $$

:::

::: proof
Claim 1 applies [@thm-born-modulus-square] directly; claim 2 unfolds `recordWeight` and `bornProbability` by reflexivity; claim 3 checks each summand $j \in \kappa$ by cases on $w_j = \operatorname{recordWeight}(P, \rho, j)$. When $w_j \neq 0$, scalar cancellation gives $w_j \cdot (w_j^{-1} P_j \rho P_j) = P_j \rho P_j$. When $w_j = 0$, the positive semidefinite matrix $P_j \rho P_j$ has trace $\Tr(P_j \rho P_j) = \Tr(\rho P_j) = w_j = 0$, which forces $P_j \rho P_j = 0$, so $0 \cdot \operatorname{conditionalState}(P, \rho, j) = 0 = P_j \rho P_j$ holds in this case as well. Summing over $j \in \kappa$ recovers $\operatorname{unreadState}(P, \rho)$. The full proof is checked by the Lean kernel.
:::

Let us check all three clauses of [@thm-rank-one-born-pairing] by hand on a skewed single-qubit pure state. Prepare the $60^\circ$-tilted state $\lvert\psi\rangle = \binom{\sqrt{3}/2}{1/2}$, whose outer-product density matrix is

$$
\rho = \lvert\psi\rangle\langle\psi\rvert = \begin{pmatrix} 3/4 & \sqrt{3}/4 \\ \sqrt{3}/4 & 1/4 \end{pmatrix} \qquad \bigl(\Tr\rho = \tfrac{3}{4} + \tfrac{1}{4} = 1\bigr),
$$

and probe it with the complete orthogonal East and West $X$-basis shutters $P_+ = \lvert +\rangle\langle +\rvert = \frac{1}{2}\bigl(\begin{smallmatrix} 1 & 1 \\ 1 & 1 \end{smallmatrix}\bigr)$ and $P_- = \lvert -\rangle\langle -\rvert = \frac{1}{2}\bigl(\begin{smallmatrix} 1 & -1 \\ -1 & 1 \end{smallmatrix}\bigr)$:

1. **Verifying clauses 1 and 2 (modulus squared equals trace pairing)**: The inner product $\langle +\mid\psi\rangle = \frac{\sqrt{3} + 1}{2\sqrt{2}}$ has squared modulus $\frac{4 + 2\sqrt{3}}{8} = \frac{2 + \sqrt{3}}{4}$; directly taking the matrix product trace gives $\Tr(\rho P_+) = \frac{1}{2}\bigl(\frac{3}{4} + \frac{\sqrt{3}}{4} + \frac{\sqrt{3}}{4} + \frac{1}{4}\bigr) = \frac{2 + \sqrt{3}}{4}$! Likewise $w_- = \Tr(\rho P_-) = \frac{2 - \sqrt{3}}{4}$, with $w_+ + w_- = 1$.
2. **Verifying clause 3 (unread state as weighted conditional mixture)**: The two normalized conditioned states are $\rho_{|+} = P_+$ and $\rho_{|-} = P_-$. Weighting them by $w_+$ and $w_-$ leaves off-diagonal coherence $\frac{w_+ - w_-}{2} = \frac{\sqrt{3}}{4}$ and levels the diagonals to $\frac{w_+ + w_-}{2} = \frac{1}{2}$:

   $$
   \operatorname{unreadState}(P, \rho) = w_+ P_+ + w_- P_- = \begin{pmatrix} 1/2 & \sqrt{3}/4 \\ \sqrt{3}/4 & 1/2 \end{pmatrix} = P_+ \rho P_+ + P_- \rho P_-!
   $$

Pause now to ask the deeper question every thoughtful student eventually asks: **why must nature weight orthogonal branches by the *second* power ($L^2$ norm squared) of the projection length, rather than the first power $|\cos(\theta/2)|$ or the fourth power $\cos^4(\theta/2)$?**

Glance back at the parallelogram and Pythagorean law of [Chapter 1](ch01-measurement.md) ([@thm-parallelogram-norm-law]): the answer has been sitting in Euclidean geometry for twenty-five centuries! When a unit state vector $\lvert\psi\rangle$ ($\norm{\psi} = 1$) is resolved into an aligned component $\cos(\theta/2)$ and a perpendicular component $\sin(\theta/2)$ across two orthogonal measurement ports, which power sums to $1$ at every angle?

- First powers give $\cos(\theta/2) + \sin(\theta/2) = \sqrt{2} \approx 1.414 \neq 1$ at $\theta = 90^\circ$, creating $41\%$ excess probability out of thin air;
- Fourth powers give $\cos^4(\theta/2) + \sin^4(\theta/2) = \frac{1}{4} + \frac{1}{4} = \frac{1}{2} \neq 1$ at $\theta = 90^\circ$, losing half of reality;
- **Only the second power** satisfies $\cos^2(\theta/2) + \sin^2(\theta/2) \equiv 1$ identically for every angle $\theta$!

**Born's rule unites Pythagoras's theorem with the canonical basis-free trace pairing.** Among power-law candidates $|\langle\phi\mid\psi\rangle|^p$ of the projection overlap, conservation of total weight $1$ across orthogonal channels singles out the exponent $p = 2$; at the general operator level, [@thm-born-probability-skeleton] establishes **sufficiency** (that $\Tr(\rho P)$ satisfies normalization, additivity, and nonnegativity), whereas ruling out arbitrary non-Born assignments across all frames or effects (**uniqueness**) requires the cross-basis frame- or effect-additivity hypotheses recorded in [@rem-gleason-literature].

Let us now combine [@prop-qubit-bloch-core] and [@thm-rank-one-born-pairing] to fulfill the promise made at the end of Chapter 1 and resolve the factor-of-two relation between the Bloch sphere angle $\theta$ and the Hilbert-space half-angle $\theta/2$.

::: {.figure src="ch02-half-angle"}
**Half a turn on the sphere is a quarter turn in Hilbert space.** On the left, going along the sphere from the north pole $\vv{a}$ to the south pole takes $\theta$ from $0^\circ$ to $180^\circ$; on the right, going from $\lvert\phi\rangle$ to the orthogonal $\lvert\phi_\perp\rangle$ takes $\theta/2$ from $0^\circ$ to $90^\circ$. The five cyan points on each side are the five rows of the table below, and the cyan numbers on the right are the weights $\cos^2(\theta/2)$: $1$, $\frac{3}{4}$, $\frac{1}{2}$, $\frac{1}{4}$, $0$. The amber arrows on both sides point to the row $\theta = 120^\circ$.
:::

::: {.example #ex-bloch-half-angle title="Deriving the Bloch Half-Angle Law: Why Antipodal Means Orthogonal"}
Let a single qubit be prepared along the real unit vector $\vv{a} = (a_0, a_1, a_2) \in S^2$ and probed along the real unit vector $\vv{b} = (b_0, b_1, b_2) \in S^2$ at spatial angle $\theta \in [0, \pi]$, so that their Euclidean dot product is $\vv{a} \cdot \vv{b} = a_0 b_0 + a_1 b_1 + a_2 b_2 = \cos\theta$.

By [@prop-qubit-bloch-core], their rank-one projectors are $\rho_{\vv{a}} = \frac{1}{2}(I + B(\vv{a}))$ and $P_{\vv{b}} = \frac{1}{2}(I + B(\vv{b}))$. Without touching a single complex ket, evaluate the trace pairing $\Tr(\rho_{\vv{a}} P_{\vv{b}})$ of [@thm-rank-one-born-pairing]:

$$
\Tr(\rho_{\vv{a}} P_{\vv{b}}) = \frac{1}{4}\Tr\bigl(I + B(\vv{a}) + B(\vv{b}) + B(\vv{a})B(\vv{b})\bigr).
$$

Here $\Tr(I) = 2$, while the diagonal entries $a_2$ and $-a_2$ in [@prop-qubit-bloch-core] give $\Tr(B(\vv{a})) = \Tr(B(\vv{b})) = 0$. Computing the two diagonal entries of $B(\vv{a})B(\vv{b})$ directly gives

$$
\begin{aligned}
\bigl(B(\vv{a})B(\vv{b})\bigr)_{00} &= a_2 b_2 + (a_0 - i a_1)(b_0 + i b_1) = (a_0 b_0 + a_1 b_1 + a_2 b_2) + i(a_0 b_1 - a_1 b_0), \\
\bigl(B(\vv{a})B(\vv{b})\bigr)_{11} &= (a_0 + i a_1)(b_0 - i b_1) + (-a_2)(-b_2) = (a_0 b_0 + a_1 b_1 + a_2 b_2) - i(a_0 b_1 - a_1 b_0).
\end{aligned}
$$

When we add the two diagonal entries to form the trace, the imaginary cross-product terms $\pm i(a_0 b_1 - a_1 b_0)$ cancel identically, leaving $2(\vv{a} \cdot \vv{b})$! Substituting this back and applying the half-angle identity $1 + \cos\theta = 2\cos^2(\theta/2)$ yields

$$
\Tr(\rho_{\vv{a}} P_{\vv{b}}) = \frac{1}{4}\bigl(2 + 0 + 0 + 2\,\vv{a}\cdot\vv{b}\bigr) = \frac{1 + \vv{a}\cdot\vv{b}}{2} = \frac{1 + \cos\theta}{2} = \cos^2\Bigl(\frac{\theta}{2}\Bigr).
$$

Every piece of the puzzle clicks into place:

1. **Collinear alignment ($\theta = 0^\circ$)**: $\vv{a} \cdot \vv{b} = +1$, giving probability $\frac{1 + 1}{2} = 1$ (certain passage);
2. **Spatial orthogonality ($\theta = 90^\circ$, e.g., North $\lvert 0\rangle$ tested along East $\lvert +\rangle$)**: $\vv{a} \cdot \vv{b} = 0$, zero directional bias, giving the fair-coin midpoint $\frac{1 + 0}{2} = \frac{1}{2}$;
3. **Spatial opposition ($\theta = 180^\circ$, e.g., North $\lvert 0\rangle$ tested along South $\lvert 1\rangle$)**: in three-dimensional space, two opposite outcomes point antipodally ($\theta = 180^\circ$, $\cos 180^\circ = -1$), whereas in probability and inner-product geometry, mutual exclusion requires zero overlap ($\cos 90^\circ = 0$). The affine rescaling $x \mapsto \frac{1 + x}{2}$ maps $[-1, +1]$ onto $[0, 1]$, which trigonometrically halves $\theta$ into $\cos^2(\theta/2)$!

For ready reference in later chapters, the benchmark angles across both pictures are collected below:

| Bloch Angle $\theta$ | Hilbert Half-Angle $\theta/2$ | Compatibility $\vv{a}\cdot\vv{b} = \cos\theta$ | Born Weight $\Tr(\rho_{\vv{a}} P_{\vv{b}}) = \cos^2(\theta/2)$ | Geometric Reading |
| :---: | :---: | :---: | :---: | :--- |
| $0^\circ$ | $0^\circ$ | $+1$ | $1$ | Collinear alignment; deterministic passage |
| $60^\circ$ | $30^\circ$ | $+1/2$ | $3/4$ | Acute alignment (classic Bell-test angle) |
| $90^\circ$ | $45^\circ$ | $0$ | $1/2$ | Orthogonal equator; unbiased $50:50$ split |
| $120^\circ$ | $60^\circ$ | $-1/2$ | $1/4$ | Obtuse opposition (symmetric trine angle) |
| $180^\circ$ | $90^\circ$ | $-1$ | $0$ | Antipodal on $S^2$ $\leftrightarrow$ orthogonal in $\mathbb{C}^2$ |
:::

::: {.viz src="qubit-geometry" preset="line" height="500"}
**Start with the first row of the table.** The amber arrow $B$ points along the cyan ruler $A$: the cyan line has length $1$ and the magenta area is zero, matching $\theta = 0^\circ$ and weight $1$. Drag $B$ to the equator and then to the south pole, and compare the displayed angle with the $90^\circ$ and $180^\circ$ rows above.
:::

The table above goes angle by angle. Ask a different question: if the direction of the target state $\vv{b}$ is random, uniformly distributed on the sphere, how is the compatibility weight $p = \cos^2\frac{\theta}{2}$ distributed? Intuition may guess that it favours the middle, or the two ends. Neither is right.

::: {.example #ex-uniform-born-weight title="The Born Weight in a Random Direction Is Uniformly Distributed: Archimedes' Hat-Box Theorem"}
The single-qubit part of this example is an elementary computation, and the higher-dimensional overlap density formula is a **literature result, not formalized in this book**.

**The hat-box theorem.** On the unit sphere, the band of points with height in $[z,\ z + \mathrm{d}z]$ has circumference $2\pi\sin\theta$ and width $\mathrm{d}\theta = \mathrm{d}z / \sin\theta$ along a meridian, hence area $2\pi\,\mathrm{d}z$, independent of latitude. So for a uniformly random point of the sphere, the height $z = \cos\theta$ is uniformly distributed on $[-1, 1]$.

**The Born weight.** Take the known state $\vv{a}$ to be the north pole. The half-angle formula gives $p = \cos^2\frac{\theta}{2} = \frac{1 + \cos\theta}{2} = \frac{1 + z}{2}$, an affine function of $z$, and therefore

$$
p \ \text{is uniform on}\ [0, 1], \qquad \mathbb{E}[p] = \frac{1}{2}, \qquad \operatorname{Var}[p] = \frac{1}{12}, \qquad \Pr[p \ge t] = 1 - t .
$$

| condition | equivalent range of the angle | probability |
| :---: | :---: | :---: |
| $p \ge \frac{1}{2}$ | $\theta \le 90^\circ$ | $\frac{1}{2}$ |
| $p \ge \frac{3}{4}$ | $\theta \le 60^\circ$ | $\frac{1}{4}$ |
| $p \ge 0.9$ | $\theta \le 36.87^\circ$ | $0.1$ |
| $p \ge \frac{2 + \sqrt{3}}{4} \approx 0.933$ | $\theta \le 30^\circ$ | $\frac{2 - \sqrt{3}}{4} \approx 0.067$ |

**Numerical check.** With one million uniformly random directions: sample mean $0.5001$, sample variance $0.08323$ ($\frac{1}{12} \approx 0.08333$); the frequencies of $p$ falling in $[0, 0.1)$, $[0.25, 0.75)$, $[0.9, 1]$ are $0.0996$, $0.5009$, $0.1004$.

**Comparison with higher dimensions.** For a uniformly random pure state in a $d$-dimensional Hilbert space, its overlap weight with a fixed state satisfies $\Pr[p > t] = (1 - t)^{d-1}$, with mean $\frac{1}{d}$. For $d = 2$ this is the uniform distribution above; for $d = 4$, $\Pr[p > \frac{1}{2}] = \frac{1}{8}$; for $d = 16$, $\Pr[p > \frac{1}{2}] = 2^{-15} \approx 3\times10^{-5}$. A simulation with four hundred thousand samples gives means $0.5000$, $0.2498$, $0.0626$, in agreement with $\frac{1}{d}$.
:::

::: {.figure src="ch02-hatbox"}
**For a random direction, the Born weight is uniform on $[0, 1]$.** With the known state $\vv{a}$ at the north pole, four cyan circles of latitude cut the sphere into five zones of equal height; each has the same area as the band of the grey dashed hat box at the same height, $2\pi \times 0.4$. The dashed cyan lines carry each latitude straight across to the weight scale on the right, where $p = \frac{1 + z}{2}$ turns the five zones into five intervals of length $\frac{1}{5}$ (the single-qubit part of [@ex-uniform-born-weight], an elementary computation).
:::

The single qubit is the only "fair" case: point in an arbitrary direction, and the compatibility weight is equally likely to take any value between $0$ and $1$. Once the dimension is large, a randomly chosen direction is, with overwhelming probability, nearly orthogonal to the reference state. The equatorial concentration and the barren plateaus discussed in [Chapter 12](ch12-measurement-computation-and-gradients.md) start from this fact.

So far we have always run in the forward direction: first a state $\rho$ and a shutter $P$ are given, then the weight $\Tr(\rho P)$ is computed. Now turn the question around. Suppose all we have is a family of **probes**, each a pure-state direction that can be confirmed with certainty, together with pairwise measurement itself. Can these alone split the reading of an arbitrary detector into mutually exclusive "confirmations"? And do the probes that come out line up, of their own accord, into a complete record measurement like the one in [@thm-rank-one-born-pairing]?

The key notion is **least confirmation**. For each probe $p$, among all nonnegative readings that pass $p$ with certainty and never exceed $1$ on any probe, take the stingiest one and call it $e_p$. On a qubit, $e_p(q) = \Tr(pq) = \frac{1 + \cos\theta}{2}$ (checked by hand in [@ex-qubit-confirmation-peel] below) is exactly the table of [@ex-bloch-half-angle]: $p$ is used to measure $q$, the two arrows and nothing else, with no third party as referee. The next definition carries this structure over to an arbitrary real vector space.

::: {.definition #def-confirmation-system title="Positivity on Probes and Confirmation Systems" lean="D5/S3/Quantum/Foundation/LeastConfirmationGeneration.Positive D5/S3/Quantum/Foundation/LeastConfirmationGeneration.ConfirmationSystem"}
Let $A$ be a real vector space and $P \subseteq A$ an arbitrary set of **probes**. A linear functional $f : A \to \mathbb{R}$ is **positive on $P$** (`Positive P f` in Lean) if $f(p) \ge 0$ for every $p \in P$. A **confirmation system** on $P$ (`ConfirmationSystem P`) consists of the following seven items:

1. a linear functional $u : A \to \mathbb{R}$, the unit (`unit`);
2. normalization (`normalized`): $u(p) = 1$ for every $p \in P$;
3. for each $p \in P$, a linear functional $e_p : A \to \mathbb{R}$, the confirming effect of $p$ (`effect`);
4. properness (`proper`): $0 \le e_p(q) \le 1$ for all $p, q \in P$;
5. confirmation (`confirms`): $e_p(p) = 1$ for every $p \in P$;
6. leastness (`least`): for every $p \in P$ and every linear functional $f$, if $f$ is positive on $P$, $f(q) \le 1$ for all $q \in P$, and $f(p) = 1$, then $e_p(q) \le f(q)$ for all $q \in P$;
7. maximum attainment (`maximum`): for every linear functional $f$ that is positive on $P$ and not identically zero, there is $p \in P$ with $f(p) > 0$ and $f(q) \le f(p)$ for all $q \in P$.
:::

The first five items are bookkeeping: $u$ gives every probe total mass $1$, and $e_p$ is a proper reading that passes $p$ with certainty. The content sits in the last two. Leastness says that $e_p$ gives no probe any more weight than it must: any other proper reading that passes $p$ with certainty gives every probe at least as much as $e_p$ does. Maximum attainment says that every nonzero positive reading attains its largest value at some probe; Lean makes it a field of the structure, an assumption rather than a consequence of compactness. A one-line manual derivation shows that this field forces $P$ to span $A$: otherwise a nonzero functional vanishing on $P$ would be positive on $P$, yet no probe would give it a positive value.

::: {.theorem #thm-positive-dual-generation title="Least Confirmations Generate the Positive Dual" lean="D5/S3/Quantum/Foundation/LeastConfirmationGeneration.positive_dual_generation"}
Let $A$ be a finite-dimensional real vector space, $P \subseteq A$, and fix a confirmation system on $P$ ([@def-confirmation-system]) with unit $u$ and confirming effects $p \mapsto e_p$. If a linear functional $f : A \to \mathbb{R}$ is positive on $P$, then there is a finite list $(m_1, p_1), \dots, (m_\ell, p_\ell)$ (with $\ell \ge 0$, $m_i \in \mathbb{R}$, $p_i \in P$) such that:

1. $m_i > 0$ for every $i$;
2. $f = \sum_{i=1}^{\ell} m_i\, e_{p_i}$;
3. for all $i < j$, $e_{p_j}(p_i) = 0$ and $e_{p_i}(p_j) = 0$;
4. $\sum_{i=1}^{\ell} e_{p_i}(q) \le u(q)$ for every $q \in P$;
5. $\ell \le \dim A$;
6. if $f = u$, then $m_i = 1$ for every $i$.
:::

::: proof
The proof peels $f$ layer by layer. If $f = 0$, take the empty list. Otherwise maximum attainment yields a probe $p$ at which $f$ is largest; put $m = f(p) > 0$. The functional $m^{-1}f$ is positive on $P$, at most $1$ there, and equal to $1$ at $p$, so leastness gives $e_p \le m^{-1}f$ on $P$; hence the remainder $r = f - m\,e_p$ is still positive on $P$, and $r(p) = 0$. Let $Z(f)$ be the subspace spanned by the probes that $f$ sends to zero ([`zeroSpan`](lean:D5/S3/Quantum/Foundation/LeastConfirmationGeneration.zeroSpan) in Lean). If a probe $x$ has $f(x) = 0$, then $0 \le r(x) = -m\,e_p(x) \le 0$, so $Z(f) \subseteq Z(r)$; and $p \in Z(r)$ lies outside $Z(f)$, because $Z(f) \subseteq \ker f$ while $f(p) = m > 0$. Each layer therefore raises the dimension of $Z$ by at least one; strong induction on $\dim A - \dim Z(f)$ stops the peeling after at most $\dim A$ layers and delivers the expansion together with the length bound. The remainder $r$ of each layer is the positively weighted sum of the later layers, every term is nonnegative on probes, and $r(p) = 0$, so every effect peeled later vanishes on every probe peeled earlier: $e_{p_j}(p_i) = 0$ for $i < j$. The reverse direction comes from leastness: if $e_q(p) = 0$, the functional $u - e_q$ is positive on $P$, at most $1$ there, and equal to $1$ at $p$, so $e_p(q) \le u(q) - e_q(q) = 0$, and since $e_p(q) \ge 0$, $e_p(q) = 0$. The sum bound is an induction on the list: the sum $t$ of the tail lies between $0$ and $1$ on $P$ and vanishes at the head probe $a$, so $u - t$ meets the hypotheses of leastness and gives $e_a(q) + t(q) \le 1 = u(q)$. Finally, exclusion in both directions gives $\bigl(\sum_j m_j e_{p_j}\bigr)(p_i) = m_i$; when $f = u$ the left side is $u(p_i) = 1$, so $m_i = 1$. The full proof is checked by the Lean kernel.
:::

Start with the most transparent model, an $n$-sided die (a manual derivation). Take $A = \mathbb{R}^n$, the probes the standard basis vectors $\delta_1, \dots, \delta_n$ ("face $k$ comes up for certain"), the unit $u(x) = x_1 + \cdots + x_n$, and the confirming effects the coordinate readings $e_{\delta_k}(x) = x_k$. All seven items can be read off at a glance: $e_{\delta_k}(\delta_j)$ is $1$ for $j = k$ and $0$ otherwise; if $f$ is nonnegative on the probes and $f(\delta_k) = 1$, then $f(\delta_j) \ge 0 = e_{\delta_k}(\delta_j)$ for $j \ne k$, which is leastness; a nonzero positive reading $f(x) = c_1 x_1 + \cdots + c_n x_n$ has coefficients $c_j = f(\delta_j) \ge 0$, not all zero, and the largest one is the maximum. The coordinate readings are linearly independent, and mutual exclusion rules out repeated probes, so the expansion that [@thm-positive-dual-generation] provides can only be the split into coordinates; the peeling in its proof takes the terms off one at a time, largest coefficient first. For instance, with $n = 3$ and $f(x) = 0.5\,x_1 + 0.3\,x_3$ the peeling gives $0.5\,e_{\delta_1} + 0.3\,e_{\delta_3}$, two layers, within $\dim A = 3$. A die has only $n$ probes, so there is no suspense. The probes of a qubit cover the whole sphere, and which of them get peeled off is for the reading itself to choose.

::: {.example #ex-qubit-confirmation-peel title="Peeling on the Bloch Sphere: The Spectral Decomposition of an Unsharp Effect"}
This example is a **manual derivation**: that a qubit satisfies the seven items of [@def-confirmation-system], and each layer of the peeling below, are computed with the matrices of this chapter; they are not the content of the cited Lean declarations.

**The instance.** Take $A$ to be the real vector space of Hermitian $2\times 2$ matrices (basis $I, \sigma_X, \sigma_Y, \sigma_Z$, so $\dim A = 4$), the probes all pure-state projectors $\rho_{\vv{a}} = \frac{1}{2}(I + B(\vv{a}))$ with $\vv{a} \in S^2$, the unit $u = \Tr$, and the confirming effects $e_p(X) = \Tr(pX)$, so that $e_{\rho_{\vv{a}}}(\rho_{\vv{b}}) = \frac{1 + \vv{a}\cdot\vv{b}}{2}$. Normalization, properness and confirmation hold at once: $\Tr p = 1$, $0 \le \Tr(pq) \le 1$, $\Tr(pp) = \Tr p = 1$. Every linear functional on $A$ can be written uniquely as $f(X) = \Tr(FX)$ with $F$ Hermitian; positivity on the probes means $F \ge 0$, and being at most $1$ on the probes means $F \le I$. If moreover $f(p) = 1$ with $p = \lvert\psi\rangle\langle\psi\rvert$, then $\langle\psi\rvert(I - F)\lvert\psi\rangle = 0$ with $I - F \ge 0$, which forces $F\lvert\psi\rangle = \lvert\psi\rangle$; hence $F = p + \lambda(I - p)$ with $0 \le \lambda \le 1$, and $f(q) \ge \Tr(pq) = e_p(q)$. That is leastness. Maximum attainment comes from an eigenvector of the largest eigenvalue $\lambda_{\max} > 0$ of $F$, since $f(\lvert\phi\rangle\langle\phi\rvert) = \langle\phi\rvert F\lvert\phi\rangle \le \lambda_{\max}$.

**An unsharp detector.** Let the click effect of a detector be

$$
E = \begin{pmatrix} 3/5 & 1/5 \\ 1/5 & 3/10 \end{pmatrix} = 0.45\,I + 0.2\,\sigma_X + 0.15\,\sigma_Z ,
$$

so the reading $f(q) = \Tr(Eq)$ is the probability that the pure state $q$ makes it click. Substituting $\rho_{\vv{a}}$ gives

$$
\begin{aligned}
f(\rho_{\vv{a}}) &= 0.45 + 0.2\,a_0 + 0.15\,a_2 \\
&= 0.45 + 0.25\,\vv{a}\cdot\vv{s}, \qquad \vv{s} = (0.8,\ 0,\ 0.6).
\end{aligned}
$$

On the sphere, $f$ is a "height function" tilted towards $\vv{s}$: brightest at $\vv{s}$ (polar angle $\arccos 0.6 \approx 53.13^\circ$), darkest at the antipode $-\vv{s}$.

**First layer.** The maximum sits at the pure state $p_1 = \lvert\psi_1\rangle\langle\psi_1\rvert$ belonging to $\vv{s}$, with $\lvert\psi_1\rangle = \frac{1}{\sqrt{5}}\binom{2}{1}$, and the weight is $m_1 = f(p_1) = 0.7$. Peel it off:

$$
\begin{aligned}
E - 0.7\,p_1 &= \begin{pmatrix} 3/5 & 1/5 \\ 1/5 & 3/10 \end{pmatrix} - \frac{7}{10}\begin{pmatrix} 4/5 & 2/5 \\ 2/5 & 1/5 \end{pmatrix} \\
&= \begin{pmatrix} 1/25 & -2/25 \\ -2/25 & 4/25 \end{pmatrix} = 0.2\,p_2 ,
\end{aligned}
$$

where $p_2 = \lvert\psi_2\rangle\langle\psi_2\rvert$ with $\lvert\psi_2\rangle = \frac{1}{\sqrt{5}}\binom{-1}{2}$, whose Bloch vector is $-\vv{s}$. The remainder $r_1 = f - 0.7\,e_{p_1}$ is still nonnegative and vanishes only at $p_1$. Since $f$ is at least $0.2$ on every pure state, the probes it sends to zero span $\{0\}$; the probes $r_1$ sends to zero span the line $\operatorname{span}\{p_1\}$. The dimension has gone from $0$ to $1$.

**Second layer.** The maximum of $r_1$ sits at $p_2$ with weight $m_2 = 0.2$; the remainder is zero, the probes sent to zero by the zero functional span all of $A$ (dimension $4$), and the peeling ends:

$$
\begin{aligned}
f &= 0.7\,e_{p_1} + 0.2\,e_{p_2}, \\
E &= 0.7\,p_1 + 0.2\,p_2 .
\end{aligned}
$$

| pure-state probe $q$ | Bloch vector | $f(q) = \Tr(Eq)$ | $e_{p_1}(q)$ | remainder $r_1(q)$ |
| :---: | :---: | :---: | :---: | :---: |
| $\lvert 0\rangle$ | $(0, 0, 1)$ | $0.6$ | $0.8$ | $0.04$ |
| $\lvert 1\rangle$ | $(0, 0, -1)$ | $0.3$ | $0.2$ | $0.16$ |
| $\lvert +\rangle$ | $(1, 0, 0)$ | $0.65$ | $0.9$ | $0.02$ |
| $\lvert +i\rangle$ | $(0, 1, 0)$ | $0.45$ | $0.5$ | $0.1$ |
| $\lvert\psi_1\rangle$ | $(0.8, 0, 0.6)$ | $0.7$ | $1$ | $0$ |
| $\lvert\psi_2\rangle$ | $(-0.8, 0, -0.6)$ | $0.2$ | $0$ | $0.2$ |

**Checking the six conclusions of the theorem.** The weights $0.7, 0.2$ are positive; $e_{p_2}(p_1) = e_{p_1}(p_2) = \Tr(p_1 p_2) = 0$ (antipodal Bloch vectors); $e_{p_1}(q) + e_{p_2}(q) = \Tr\bigl((p_1 + p_2)q\bigr) = \Tr q = 1 = u(q)$, so the sum bound holds with equality; the length is $2 \le \dim A = 4$. If the reading is the unit $f = \Tr$ instead, every pure state attains the maximum $1$ and the peeling may start at any $p$: $\Tr = e_p + e_{I - p}$ with both weights equal to $1$, that is, $I = p + (I - p)$ — a complete record measurement, along any axis whatever.
:::

The outcome of the peeling is precisely the spectral decomposition of $E$: the two probes are its eigendirections and the two weights its eigenvalues. Yet the peeling itself solves no eigenvalue equation and needs no external basis $\{\lvert 0\rangle, \lvert 1\rangle\}$ (the matrices above are written out only as a check). The first probe is the brightest direction of the reading, the second the brightest direction of the remainder, and every step is a pairwise measurement.

> Do not erect coordinates before you measure: the brightest direction of a reading is the axis the reading chooses for itself.

Three boundaries need to be drawn. First, the length bound of [@thm-positive-dual-generation] is $\dim A$, which is $4$ for a qubit. Only two layers appear because $\mathbb{C}^2$ holds at most two mutually orthogonal unit vectors ($\Tr(p_i p_j) = 0$ means $\langle\psi_i\mid\psi_j\rangle = 0$); this sharper bound of $2$ is a manual observation about the example, not a conclusion of the theorem. Second, that a qubit satisfies the seven items is the manual derivation above; the header of the cited Lean file states that the application to a compact normalized base and the state-side spectral bridge are separate mathematical obligations, outside this theorem. Third, the theorem decomposes readings that are positive on probes; it answers "what is a reading made of", and it does not assert that every additive probability assignment takes the trace-pairing form. That uniqueness question is the subject of Gleason's and Busch's theorems, discussed in [@rem-gleason-literature] below.

::: {.remark #rem-gleason-literature title="Gleason's Theorem and Busch's Theorem (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** In this chapter, [@thm-born-probability-skeleton] proves **sufficiency**: every positive semidefinite trace-one matrix $\rho$ defines, via the canonical basis-free trace pairing $P \mapsto \Tr(\rho P)$, a normalized, finitely additive, nonnegative measure on projections. Establishing **uniqueness** (that every probability assignment obeying suitable additivity axioms must take the trace-pairing form) requires classical converse theorems and their exact dimensional and domain hypotheses:

- **Gleason's theorem** (A. M. Gleason, *Measures on the closed subspaces of a Hilbert space*, J. Math. Mech. **6**, 885–893, 1957): Requires Hilbert-space dimension **$\dim\mathcal{H} \ge 3$**. On any separable Hilbert space of dimension $\dim\mathcal{H} \ge 3$, every countably additive probability measure $\mu$ on the lattice of orthogonal projections (reducing to finite additivity on pairwise orthogonal projections when $3 \le \dim\mathcal{H} < \infty$) has the form $\mu(P) = \Tr(\rho P)$ for a unique density operator $\rho$. **Gleason's theorem fails on the projection lattice alone when $\dim\mathcal{H} = 2$**: because each two-dimensional orthonormal basis consists solely of an antipodal pair $\{P_{\vv{n}}, P_{-\vv{n}}\}$ sharing no common rank-one projectors with other bases, non-Born frame functions on $S^2$ satisfying $\mu(P_{\vv{n}}) + \mu(P_{-\vv{n}}) = 1$ exist in abundance.
- **Busch's theorem** (P. Busch, *Quantum states and generalized observables: A simple proof of Gleason's theorem*, Phys. Rev. Lett. **91**, 120403, 2003): Extending additivity from sharp projections to positive POVM effects ($0 \le E_i \le I$ with $\mu(\sum_i E_i) = \sum_i \mu(E_i)$ whenever $\sum_i E_i \le I$) restores uniqueness for **all $\dim\mathcal{H} \ge 2$** (including a single qubit, $\dim\mathcal{H} = 2$): every generalized probability measure has the form $E \mapsto \Tr(\rho E)$ for a unique density operator $\rho$.

Our pinned repository focuses on constructive finite-dimensional matrix reductions ([@thm-born-probability-skeleton], [@thm-born-modulus-square], and [@thm-rank-one-born-pairing]) and freezes the structural decomposition by least confirmations, [@thm-positive-dual-generation]; these converse uniqueness theorems are cited from the classical literature and are not claimed in the book's Lean verification ledger.
:::

Having eliminated the external third point $C$ and derived $\cos^2(\theta/2) = \frac{1 + \cos\theta}{2}$ from pure trace geometry, we now turn the spotlight onto the ruler itself — the **idempotent projector** $P^2 = P$ that appeared in every theorem of this chapter. Why do "detecting a particle," "naming a logical concept," and "experiencing a tick of classical linear time" all reduce to the single equation $P^2 = P$? Let us step into [Chapter 3](ch03-projectors-and-duality.md).
