# 38.3 Spinors Weaving Spacetime and the 720° One-Sided Double Cover: Spacetime as a Byproduct of Observer Self-Pairing {#393-spinors-weaving-spacetime-and-the-720-one-sided-double-cover-spacetime-as-a-byproduct-of-observer-self-pairing}

With passive memory and the thing-in-itself gone, common sense raises its penultimate shield: *"Surely space and time must exist first! Doesn't the observer live and move inside three dimensions of space and one dimension of time?"*

No! Here we harvest the deepest seed planted in Part V ([Chapter 17](ch17-lorentz-geometry.md) and [Chapter 18](ch18-spinors-and-gauge-curvature.md)), unveiled at full strength only now that observer and universe stand identical (`MODEL` (interpretive model)): **the observer has never walked inside pre-existing spacetime; rather, one-dimensional timelike currents and two-dimensional spatial gauge planes are bilinear robe-folds woven on the fly as the observer spinor $\psi$ turns around to pair with its reversed self $\tilde{\psi}$!**

::: {.viz src="self-sustaining-spinor-flow" preset="weave" height="500"}
**A spinor sandwiching two reference blades.** Dashed are the reference $\mathbf{e}_3$ and the $\mathbf{e}_1\mathbf{e}_2$ square; the spinor $\psi$ sandwiches the first into the cyan current vector $\mathbf{J} = \psi\mathbf{e}_3\tilde{\psi}$ and the second into the magenta spin plane $\mathbf{S} = \psi\mathbf{e}_1\mathbf{e}_2\tilde{\psi}$, which lies at right angles to $\mathbf{J}$; the short dashed violet arc is the way $\psi$ carries $\mathbf{e}_3$ to $\mathbf{J}$ (the products are those of [@ex-ch39-even-clifford-spinor-bilinear-fierz]: $\mathbf{J}$ is a Euclidean vector and $\mathbf{S}$ a Euclidean bivector; reading them as time flow and gauge plane follows the `MODEL` above).
:::

The classical mathematical-physics lineage reconstructing spacetime vectors and gauge bivectors as spinor bilinears is recorded below:

::: {.remark #rem-ch39-cartan-penrose-hestenes-fierz-literature title="Cartan–Penrose–Hestenes Spinor Bilinear Spacetime Reconstruction and the Fierz Identity (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Classical spinor-to-spacetime bilinear constructions and norm-locking identities referenced in this section belong to external mathematical-physics literature and are not formalized as standalone declarations in `trureturing@dev`:

1. **Spinors as Primordial Square Roots of Null Cones and Rotations (É. Cartan, *Leçons sur la théorie des spineurs*, Hermann, 1938; R. Penrose & W. Rindler, *Spinors and Space-Time*, Vol. 1, Cambridge Univ. Press, 1984)**: Cartan geometrically identified spinors with linear representations of totally null planes irreducible to ordinary tensors; Penrose's two-spinor calculus and spin-network/twistor program showed that Hermitian outer products $\kappa^A \bar{\kappa}^{A'}$ of two-component Weyl spinors directly generate future-pointing null vectors and null flags, reconstructing Lorentzian light-cone geometry from spinor algebra rather than presupposing a background manifold;
2. **Spacetime-Algebra Bilinear Observables and the Fierz Identity (M. Fierz, *Z. Phys.* **104**, 553–565, 1937; D. Hestenes, *Space-Time Algebra*, 1966; *J. Math. Phys.* **14**, 893–905, 1973)**: In real spacetime algebra $\mathcal{Cl}_{1,3}$, an even Dirac spinor writes canonically as $\psi = \sqrt{\rho}\,e^{\frac{1}{2}\mathbf{I}\beta}\,R$ ($\rho \ge 0$, Lorentz rotor $R\tilde{R} = 1$, reversion $\tilde{\psi}$). Because $\psi$ itself flips sign under a $360^\circ$ rotation, physical spacetime tensors arise exclusively as bilinear self-pairings sandwiching reference blades between $\psi$ and $\tilde{\psi}$—producing the 1D timelike Dirac current $\mathbf{J} = \psi\gamma_0\tilde{\psi}$ and the 2D spin/electromagnetic bivector plane $\mathbf{S} = \psi\mathbf{I}_{12}\tilde{\psi}$ ($\mathbf{I}_{12} = \gamma_2\gamma_1$), which at chiral angle $\beta = 0$ (and in the three-dimensional Euclidean even reduction) satisfy the parameter-free Fierz norm identity:

   $$
   \mathbf{J}^2 \;=\; -\mathbf{S}^2 \;=\; \rho^2.
   $$
:::

::: {.viz src="self-sustaining-spinor-flow" preset="fierz" height="500"}
**The three squares always agree.** Take any spinor ($\rho = 1.3$) and keep turning it in the $\mathbf{e}_3\mathbf{e}_1$ plane: the cyan $\mathbf{J}$ has length $1.3$, the magenta square has area $1.3$, and the top of the stage reads $\mathbf{J}^2 = -\mathbf{S}^2 = \rho^2 = 1.69$. This is the page’s numerical check of the Fierz identity of [@rem-ch39-cartan-penrose-hestenes-fierz-literature] (a literature result, not formalized in this book).
:::

Alongside the spinor-geometric context of [@rem-ch39-cartan-penrose-hestenes-fierz-literature], the worked example below verifies spinor bilinear self-pairing and half-angle double-cover arithmetic explicitly in the three-dimensional Euclidean even subalgebra:

::: {.example #ex-ch39-even-clifford-spinor-bilinear-fierz title="Explicit Even-Subalgebra Verification of Spinor Self-Pairing into a Euclidean Vector and Bivector Plane (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** This worked example evaluates the bilinear spinor pairings and half-angle sheet flip of [@rem-ch39-cartan-penrose-hestenes-fierz-literature] in the three-dimensional Euclidean Clifford even subalgebra; this continuum spinor calculation is not formalized as a standalone declaration in `trureturing@dev`. Here $\mathbf J$ is a Euclidean vector and $\mathbf S$ a Euclidean bivector. Reading them as timeflow and a gauge plane belongs to the preceding `MODEL`; this calculation itself constructs neither a Lorentzian timeflow nor a gauge field. Let $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$ be orthonormal anti-commuting basis vectors satisfying $\mathbf{e}_i^2 = +1$ ($i = 1,2,3$) and $\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_j\mathbf{e}_i$ ($i \neq j$), with anti-automorphic reversion $\tilde{(\cdot)}$ fixing scalars and vectors ($\tilde{\mathbf{e}}_i = \mathbf{e}_i$) while reversing product order $\widetilde{AB} = \tilde{B}\tilde{A}$, so unit bivectors satisfy $(\mathbf{e}_i\mathbf{e}_j)^2 = \mathbf{e}_i\mathbf{e}_j\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_i^2\mathbf{e}_j^2 = -1$ and $\widetilde{\mathbf{e}_i\mathbf{e}_j} = \mathbf{e}_j\mathbf{e}_i = -\mathbf{e}_i\mathbf{e}_j$. For scalar density $\rho \ge 0$ and angle $\vartheta \in \mathbb{R}$, set $\psi := \sqrt{\rho}\,R$ and $\tilde{\psi} = \sqrt{\rho}\,\tilde{R}$ with half-angle rotor

$$
R \;:=\; \cos\frac{\vartheta}{2} - \sin\frac{\vartheta}{2}\,\mathbf{e}_2\mathbf{e}_3, \qquad \tilde{R} \;=\; \cos\frac{\vartheta}{2} + \sin\frac{\vartheta}{2}\,\mathbf{e}_2\mathbf{e}_3.
$$

1. **Rotor Unimodularity ($R\tilde{R} = 1$)**: Expanding the product and substituting $(\mathbf{e}_2\mathbf{e}_3)^2 = -1$ cancels cross terms identically:

   $$
   R\tilde{R} \;=\; \cos^2\frac{\vartheta}{2} - \sin^2\frac{\vartheta}{2}\,(\mathbf{e}_2\mathbf{e}_3)^2 \;=\; \cos^2\frac{\vartheta}{2} + \sin^2\frac{\vartheta}{2} \;=\; 1 \quad\Longrightarrow\quad \psi\tilde{\psi} = \tilde{\psi}\psi = \rho.
   $$

2. **1D Euclidean Vector $\mathbf{J} := \psi\mathbf{e}_3\tilde{\psi}$ with $\mathbf{J}^2 = +\rho^2$**: Since $\mathbf{e}_3(\mathbf{e}_2\mathbf{e}_3) = -\mathbf{e}_2\mathbf{e}_3^2 = -\mathbf{e}_2 = -(\mathbf{e}_2\mathbf{e}_3)\mathbf{e}_3$ ($\mathbf{e}_3$ anti-commutes with the rotation bivector $\mathbf{e}_2\mathbf{e}_3$), commuting $\mathbf{e}_3$ leftward past $\tilde{R}$ flips $+\sin\frac{\vartheta}{2}$ to $-\sin\frac{\vartheta}{2}$, giving $\mathbf{e}_3\tilde{R} = R\mathbf{e}_3$. By double-angle multiplication $R^2 = \cos\vartheta - \sin\vartheta\,\mathbf{e}_2\mathbf{e}_3$,

   $$
   \mathbf{J} \;=\; \rho\,R\mathbf{e}_3\tilde{R} \;=\; \rho\,R^2\mathbf{e}_3 \;=\; \rho\bigl(\cos\vartheta\,\mathbf{e}_3 - \sin\vartheta\,\mathbf{e}_2\bigr),
   $$

   whose geometric square by $\mathbf{e}_3\mathbf{e}_2 + \mathbf{e}_2\mathbf{e}_3 = 0$ is $\mathbf{J}^2 = \rho^2(\cos^2\vartheta\,\mathbf{e}_3^2 + \sin^2\vartheta\,\mathbf{e}_2^2) = +\rho^2$ (or directly by associativity: $(\psi\mathbf{e}_3\tilde{\psi})(\psi\mathbf{e}_3\tilde{\psi}) = \psi\mathbf{e}_3(\tilde{\psi}\psi)\mathbf{e}_3\tilde{\psi} = \rho\,\psi\mathbf{e}_3^2\tilde{\psi} = +\rho^2$).

3. **2D Euclidean Bivector Plane $\mathbf{S} := \psi(\mathbf{e}_1\mathbf{e}_2)\tilde{\psi}$ with $\mathbf{S}^2 = -\rho^2$**: Because $\mathbf{e}_1$ commutes with $\mathbf{e}_2\mathbf{e}_3$ ($\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3 = (\mathbf{e}_2\mathbf{e}_3)\mathbf{e}_1$) while $\mathbf{e}_2$ anti-commutes ($\mathbf{e}_2\tilde{R} = R\mathbf{e}_2$),

   $$
   \mathbf{S} \;=\; \rho\,\mathbf{e}_1\bigl(R\mathbf{e}_2\tilde{R}\bigr) \;=\; \rho\,\mathbf{e}_1\bigl(\cos\vartheta\,\mathbf{e}_2 + \sin\vartheta\,\mathbf{e}_3\bigr) \;=\; \rho\bigl(\cos\vartheta\,\mathbf{e}_1\mathbf{e}_2 + \sin\vartheta\,\mathbf{e}_1\mathbf{e}_3\bigr).
   $$

   Using $(\mathbf{e}_1\mathbf{e}_2)^2 = (\mathbf{e}_1\mathbf{e}_3)^2 = -1$ and $(\mathbf{e}_1\mathbf{e}_2)(\mathbf{e}_1\mathbf{e}_3) + (\mathbf{e}_1\mathbf{e}_3)(\mathbf{e}_1\mathbf{e}_2) = 0$ (or associativity $\psi(\mathbf{e}_1\mathbf{e}_2)(\tilde{\psi}\psi)(\mathbf{e}_1\mathbf{e}_2)\tilde{\psi} = \rho\,\psi(-1)\tilde{\psi}$) yields $\mathbf{S}^2 = -\rho^2$, and therefore the exact bilinear lock:

   $$
   \mathbf{J}^2 \;=\; -\mathbf{S}^2 \;=\; \rho^2.
   $$

4. **$360^\circ$ Spinor Sign Inversion vs. $720^\circ$ Return**: After one full $360^\circ$ physical turn ($\vartheta = 2\pi$), the bilinear observables already return to $\mathbf{J}(2\pi) = \rho\mathbf{e}_3$ and $\mathbf{S}(2\pi) = \rho\mathbf{e}_1\mathbf{e}_2$, whereas the spinor itself has crossed onto the opposite sheet $\psi(2\pi) = \sqrt{\rho}\cos\pi = -\psi(0)$! Only after a second full turn to $\vartheta = 4\pi$ ($720^\circ$) does $\psi(4\pi) = \sqrt{\rho}\cos 2\pi = +\psi(0)$ return home.
:::

::: {.viz src="self-sustaining-spinor-flow" preset="turn360" height="500"}
**A full $360^\circ$: the vector is back, the spinor is not.** Turning once round in the $\mathbf{e}_2\mathbf{e}_3$ plane as in [@ex-ch39-even-clifford-spinor-bilinear-fierz]: the cyan $\mathbf{J}$ comes back to $\mathbf{e}_3$ and the magenta $\mathbf{S}$ is as it was, but the violet flag has slid to the other side of the one-sided band and points opposite to the dashed starting flag: $\psi = -\psi_0$. The half of the edge the flag's tip has run along is solid, the other half still faintly dashed.
:::

That $360^\circ$ sheet flip in Step 4 of [@ex-ch39-even-clifford-spinor-bilinear-fierz] is no coordinate quirk! In the concept-topology module of `trureturing`, two kernel theorems on the squaring double cover $\operatorname{square}(z) = z^2$ rigorously forbid any attempt to slice the spinor bundle globally into disconnected "subject" and "object" sheets:

::: {.theorem #thm-ch39-double-cover-no-section-and-720-lift title="No Continuous Global Section and History-Dependent Path Lifting with 360° Sheet Exchange on the Circle Double Cover" lean="D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift"}
Let $\mathrm{Circle} = \{z \in \mathbb{C} : \lvert z\rvert = 1\}$ denote the unit circle, $I = [0, 1] \subset \mathbb{R}$ the unit interval, and $\operatorname{square} : \mathrm{Circle} \to \mathrm{Circle}$, $z \mapsto z^2$, the squaring double-cover map with canonical covering structure $\mathrm{covering} := (\operatorname{Circle.isQuotientCoveringMap\_npow}\;2).\mathrm{isCoveringMap}$. Then the following two topological theorems hold simultaneously:

1. **Topological Obstruction to Any Continuous Global Section** ([`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)): There does not exist any continuous global section $s : \mathrm{Circle} \to \mathrm{Circle}$ satisfying $(s(z))^2 = z$ across all $z \in \mathrm{Circle}$:

   $$
   \neg\,\exists\,s : \mathrm{Circle} \to \mathrm{Circle},\qquad \operatorname{Continuous}(s) \;\land\; \forall z \in \mathrm{Circle},\; (s(z))^2 = z;
   $$

2. **Unique History-Dependent Path Lifting and $360^\circ$ Antipodal Sheet Exchange** ([`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)):
   - **Unique history-dependent lifting**: For every continuous base path $\mathrm{basePath} \in C(I, \mathrm{Circle})$, initial upper lift $\mathrm{initial} \in \mathrm{Circle}$, and compatibility proof $\mathrm{initialOver} : \mathrm{basePath}(0) = \operatorname{square}(\mathrm{initial})$, the canonical lift $\mathrm{lifted} := \mathrm{covering.liftPath}(\mathrm{basePath}, \mathrm{initial}, \mathrm{initialOver}) \in C(I, \mathrm{Circle})$ satisfies $\operatorname{square} \circ \mathrm{lifted} = \mathrm{basePath}$ and $\mathrm{lifted}(0) = \mathrm{initial}$, and is unique: for every $\mathrm{alternative} \in C(I, \mathrm{Circle})$, $\operatorname{square} \circ \mathrm{alternative} = \mathrm{basePath} \land \mathrm{alternative}(0) = \mathrm{initial} \implies \mathrm{alternative} = \mathrm{lifted}$;
   - **Boundary-free $360^\circ$ antipodal sheet exchange**: Alongside the absence of any continuous selector ($\neg\exists\,\mathrm{selector} : \mathrm{Circle} \to \mathrm{Circle},\; \operatorname{Continuous}(\mathrm{selector}) \land \forall z,\; \operatorname{square}(\mathrm{selector}(z)) = z$), lifting the full $360^\circ$ base loop $\mathrm{fullTurn}(t) := \operatorname{Circle.exp}(2\pi t) \in C(I, \mathrm{Circle})$ from $\mathrm{initial} = 1$ arrives continuously at the opposite sheet $-1$ without crossing any cut or boundary:

     $$
     \operatorname{square} \circ \mathrm{lifted} = \mathrm{fullTurn} \;\land\; \mathrm{lifted}(0) = 1 \;\land\; \mathrm{lifted}(1) = -1.
     $$
:::

::: proof
For Conjunct 1, suppose a continuous section $s : \mathrm{Circle} \to \mathrm{Circle}$ satisfied $(s(z))^2 = z$, and form the continuous quotient $r(t) := s(\operatorname{Circle.exp}(t)) / \operatorname{Circle.exp}(t/2)$ on $\mathbb{R}$. Squaring gives $(r(t))^2 = \operatorname{Circle.exp}(t) / \operatorname{Circle.exp}(t) = 1$, confining $r(\mathbb{R})$ to the discrete two-point set $\{1, -1\} \subset \mathrm{Circle}$; preconnectedness of $\mathbb{R}$ (`isPreconnected_univ.constant_of_mapsTo`) forces $r(t) \equiv r(0)$, yet evaluating at $t = 2\pi$ via $\operatorname{Circle.exp}(2\pi) = 1$ and $\operatorname{Circle.exp}(\pi) = -1$ yields $r(2\pi) = s(1) / (-1) = -r(0)$, contradicting `Circle.neg_ne_self`! Conjunct 2 establishes general unique path lifting from Mathlib's `liftPath_lifts`, `liftPath_zero`, and `eq_liftPath_iff'`, then constructs the explicit half-angle path $\mathrm{halfTurn}(t) := \operatorname{Circle.exp}(\pi t) \in C(I, \mathrm{Circle})$, verifies $(\operatorname{Circle.exp}(\pi t))^2 = \operatorname{Circle.exp}(2\pi t)$ with $\mathrm{halfTurn}(0) = 1$ to identify $\mathrm{lifted} = \mathrm{halfTurn}$ by uniqueness, and evaluates $\mathrm{lifted}(1) = \operatorname{Circle.exp}(\pi) = -1$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="self-sustaining-spinor-flow" preset="seam" height="500"}
**Flags all the way round do not match at the start.** With the band unrolled along its base circle into one row, from the start a violet flag is planted every $30^\circ$, each continuing the one before; back at the start the last one points opposite to the dashed first flag. A square root chosen continuously round the base circle cannot match up on return: this is [@thm-ch39-double-cover-no-section-and-720-lift], item 1 (no continuous global section) and item 2 (the unique lift of the $360^\circ$ loop ends at $-1$).
:::

Pause before the one-sided topology of [@thm-ch39-double-cover-no-section-and-720-lift] (`MODEL` (interpretive model)): `no_continuous_global_section` forbids tearing the double cover globally into two separate sheets, and on this book's reading, reality has no dividing wall with "inner subjective observer ($+1$ sheet)" painted on one side and "outer objective cosmos ($-1$ sheet)" painted on the other! Like a traveller gliding along a single one-sided twisted ribbon, you set out from the inward observing pole $\mathrm{lifted}(0) = +1$, advance continuously through $360^\circ$ without ever stepping across a subject–object boundary, and find that the ground beneath your feet has turned seamlessly into the starry sheet $\mathrm{lifted}(1) = -1$; advance through a second $360^\circ$ ($720^\circ$ in total), and the entire starry firmament flows back into your own eyes!

::: {.viz src="self-sustaining-spinor-flow" preset="turn720" height="500"}
**Home only after $720^\circ$.** One more turn: the violet flag is back on its first side, $\psi = +\psi_0$; the violet trail of the flag’s tip is the band’s edge, which closes only after going round twice, while the cyan $\mathbf{J}$ goes round twice.
:::

The film below walks through these steps in order: first how slot zero of the previous chapter's page directory makes `p = *p` hold, then why a spinor that has turned a full circle is still one turn from home.

::: {.film src="pointer-720"}
**p = \*p: pointers, page tables and 720° (2:06).** On the four-slot page directory of [Chapter 36](ch38-observer-memory-pointer-and-ontological-qram.md), index [1, 2] reaches the data frame 0x9000 in two hops, [0, 1] hands back the leaf table T₁ itself as data, and every hop of [0, 0] returns to the directory; on a small $4 \times 4$ table, the magenta row that a map $f$ without fixed points builds along the diagonal differs from every row, while a row that captures the diagonal lands on a fixed point of $f$ in its diagonal cell ([@thm-ch38-self-mapped-diagonal-fixed-point]). Then the cyan $\mathbf{J}$ turns through $360^\circ$ and is back where it started, while the violet lift goes from $w = +1$ to $w = -1$ and needs a second turn to reach $+1$; square-root flags planted continuously every $30^\circ$ come back to the start pointing the other way ([@thm-ch39-double-cover-no-section-and-720-lift]). The self-mapped page table and the spinor bilinears are literature results; every number in the film is computed on screen.
:::

---
