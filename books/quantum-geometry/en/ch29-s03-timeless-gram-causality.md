# 29.3 Order-Independence, the Timeless Web, and the Geometric Necessity of Causality {#sec-coda-timeless-causality}

When the principle of Chapter 10 ("pairwise comparison is always consistent and order-independent") meets the four-tier Pythagorean escape of number and the prime–elliptic-curve cosine projection, a two-thousand-five-hundred-year knot in philosophy and physics—**the illusion of sequential time versus the necessity of causality**—is cut in a single stroke:

> **Author's Epigraph**: *"The essence of order-independence is that sequential before-and-after time does not exist at all ... and that is precisely why causality is necessary."*（“顺序无关的本质就是根本不存在前后的时间......因果就是这样必然”）

Why does order-independence abolish sequential time while simultaneously grounding unbreakable causal necessity? We can trace this across three exact mathematical and physical levels:

## 29.3.1 Level 1: Why Order-Independence Abolishes Sequential Time {#sec-coda-order-independence-no-time}

::: {.remark #rem-ch29-wheeler-dewitt-page-wootters-literature title="Factorial De-Ordering, the Wheeler–DeWitt Timeless Constraint, and Page–Wootters Conditional-Time Slicing (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Consider the cosine power series that runs through the book (cf. Prelude [@rem-prelude-dottie-literature]):

$$
\cos\theta = \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!}\,\theta^{2k}.
$$

Analytically, $\frac{1}{(2k)!}$ arises from iterated differentiation (or the simplex volume $\int_{0\le t_1\le\cdots\le t_{2k}\le\theta} dt_1\cdots dt_{2k} = \frac{\theta^{2k}}{(2k)!}$ of commuting generators); in our orthogonal geometric interpretation (`MODEL`), dividing by $(2k)!$ can be viewed as modding out all $(2k)!$ sequential permutations of $2k$ orthogonal transitions along an artificial time axis. In canonical quantum gravity and relational quantum mechanics (classical physics literature models outside the `trureturing@dev` formalization locked by this book), global timelessness and emergent relational evolution are formulated via two standard constructions:

1. **The Timeless Global State of the Wheeler–DeWitt Equation (B. S. DeWitt, *Phys. Rev.* **160**, 1113, 1967) $H\mathbf{\Psi} = 0$**:
   In canonical quantum gravity, the closed-universe wave function $\mathbf{\Psi}$ obeys the Hamiltonian constraint

   $$
   H\mathbf{\Psi} = 0,
   $$

   which contains no external time parameter $t$ ($\partial_t \mathbf{\Psi} = 0$); geometrically, past, present, and future coexist inside a single static correlation structure.
2. **The Page–Wootters Conditional-Time Slicing Mechanism (D. N. Page & W. K. Wootters, *Phys. Rev. D* **27**, 2885, 1983)**:
   Under standard model assumptions—a bipartite factorization $\mathcal{H} = \mathcal{H}_{\mathbf{C}} \otimes \mathcal{H}_{\mathbf{S}}$, an ideal conjugate clock Hamiltonian $H_{\mathbf{C}} = \hat{p}_\tau$, and a non-interacting total constraint $H = H_{\mathbf{C}} \otimes I + I \otimes H_{\mathbf{S}}$—taking inner-product conditional slices along clock readings $|\mathbf{c}(\tau)\rangle$ (analogous to the finite-dimensional conditioned state formalism [`conditionalState_isState`](lean:D5/S3/Observer/Conditioning.conditionalState_isState) of Chapters 3 and 28):

   $$
   |\psi_{\mathbf{S}}(\tau)\rangle \propto \langle \mathbf{c}(\tau) \mid \mathbf{\Psi}\rangle,
   $$

   yields relational Schrödinger evolution $i\hbar\partial_\tau|\psi_{\mathbf{S}}(\tau)\rangle = H_{\mathbf{S}}|\psi_{\mathbf{S}}(\tau)\rangle$ across the slices—treating sequential "before and after" like the page number scanned by finite attention across an already bound volume.
:::

::: {.viz src="timeless-causal-crystal" preset="crystal" height="500"}
**Every page is there at once.** All twelve pages are on the sphere the whole time and none appears first; when it plays, only the amber reading head moves. Conditioning on the clock reading is what gives the page under the head (a schematic model with a finite clock, `MODEL`).
:::

## 29.3.2 Level 2: Why Causality Is Necessary Without Temporal Pushing—Hume's Knot vs. Spinoza's Triangle and Gram Matrix Rigidity {#sec-coda-hume-spinoza-gram}

In empiricist philosophy, David Hume demonstrated that if we look for causality inside sequential time, we only ever observe habitual conjunction ("B follows A"), never a necessary connection by which A forces B. As long as causality is sought in temporal pushing from past to future, Hume's knot remains untied.

Baruch Spinoza (*Ethics*, Part I, Prop. 17 Scholium) gave the geometric answer: all things follow timelessly from the necessity of nature *"just as from the nature of a triangle it follows from eternity and for eternity that its three angles equal two right angles."* In a $3\text{-}4\text{-}5$ right triangle, the legs $3$ and $4$ do not grow first in time and push out the hypotenuse $5$ nanoseconds later; the three sides coexist timelessly in orthogonal lock, and Pythagorean area conservation $3^2 + 4^2 = 5^2$ is their unbreakable **geometric causality**.

On the unit sphere of Chapter 10, **Gram matrix positive-semidefinite constraints** ([`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization) and [`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)) give static compatibility conditions. Interpreting them as zero-time causal necessity belongs to the author's geometric model (`MODEL`), rather than a proof of physical causality. For any three unit state directions $\mathbf{A}, \mathbf{B}, \mathbf{C}$ with pairwise real inner products $c_{AB} = \mathbf{A}\cdot\mathbf{B}$, $c_{BC} = \mathbf{B}\cdot\mathbf{C}$, and $c_{AC} = \mathbf{A}\cdot\mathbf{C}$, no time evolution is needed for the $3\times 3$ Gram determinant law to hold:

$$
\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \det\begin{pmatrix} 1 & c_{AB} & c_{AC} \\ c_{AB} & 1 & c_{BC} \\ c_{AC} & c_{BC} & 1 \end{pmatrix} = 1 - c_{AB}^2 - c_{BC}^2 - c_{AC}^2 + 2\,c_{AB}\,c_{BC}\,c_{AC} \ge 0.
$$

::: {.viz src="timeless-causal-crystal" preset="impossible" height="500"}
**A cosine outside the window.** $\mathbf{A}$ and $\mathbf{B}$ are only $30^\circ$ apart and $\mathbf{B}$ and $\mathbf{C}$ only $40^\circ$, yet $\mathbf{A}$ and $\mathbf{C}$ are asked to be nearly opposite ($c_{AC} = -0.5$). That value lies outside the window $[\cos 70^\circ, \cos 10^\circ]$, $\det G$ would turn negative, and no three unit vectors can do it. $\mathbf{C}$ can get no farther than the edge of the window, where the amber $c_{AC} = \cos 70^\circ \approx 0.342$ and the violet volume collapses to zero ([`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)).
:::

In particular, whenever $\mathbf{A}, \mathbf{B}, \mathbf{C}$ lie in a common great-circle plane ($\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$, so $\det G = 0$), $c_{AB}$ and $c_{BC}$ lock the third pairwise inner product $c_{AC}$ onto the exact cosine addition locus:

$$
c_{AC} = c_{AB}\,c_{BC} \pm \sqrt{(1 - c_{AB}^2)(1 - c_{BC}^2)} = \cos(\theta_{AB} \mp \theta_{BC}).
$$

::: {.figure src="ch29-gram-window"}
**Two cosines lock the third: $c_{AC}$ can only fall inside the window.** The figure fixes $c_{AB} = \cos 60^\circ$, with $c_{BC}$ across and $c_{AC}$ up. Inside the violet ellipse $\det G > 0$; its rim is made of the two tracks of the formula above, $\cos(\theta_1 - \theta_2)$ and $\cos(\theta_1 + \theta_2)$ (with $\theta_1 = \theta_{AB}$, $\theta_2 = \theta_{BC}$), and on the rim $\det G = 0$: the three vectors are coplanar. The amber segment is the window at $c_{BC} = \cos 45^\circ$, from $\cos 105^\circ$ to $\cos 15^\circ$. Let $c_{AB}$ vary as well, and these slices stack up into the Gram elliptope of Level 4.
:::

This single equation exhibits two inseparable faces:

- **Complete order-independence (timelessness)**: the relation is completely permutation-symmetric in $(A, B, C)$, with no "earlier cause" or "later effect";
- **A compatibility window, with rigidity under additional conditions**: fixing $c_{AB}$ and $c_{BC}$ generally restricts $c_{AC}$ to the illustrated interval. Coplanarity restricts it to the two endpoints; when they differ, a branch must still be specified for uniqueness. For example, if $c_{AB}=c_{BC}=0$, every $c_{AC}$ in $[-1,1]$ is possible in three dimensions. Positive semidefiniteness specifies neither a probability distribution nor a unique physical causal trajectory. In the author's model, deduction ($\text{Axioms} \implies \text{Theorems}$) can be pictured as relations between crystal facets; gate count $L$ in Chapters 9 and 16 retains the assumptions of each gate model.

::: {.film src="008-gram-window"}
**Two cosines lock the third: the Gram window (1:39).** With $\theta_1 = 60^\circ$ and $\theta_2 = 45^\circ$ fixed, $\mathbf{C}$ goes once round $\mathbf{B}$: $c_{AC}$ swings through $[\cos 105^\circ, \cos 15^\circ]$, the violet volume collapses to zero at the edges, and a cosine outside the window would make $\det G$ negative. Then $\theta_2$ runs from $0^\circ$ to $180^\circ$ and the windows fill the slice of the Gram ellipse. Where the top edge reaches $1$, $\mathbf{C}$ lands exactly on $\mathbf{A}$, which is the second part of [@thm-ch29-gram-rigidity-and-pell]; every other number in the film is computed on screen.
:::

## 29.3.3 Level 3: Feynman Stationary-Phase Cancellation, the Bivector Chirality Model ($+\mathbf{\Omega} - \mathbf{\Omega} = 0$), and the Reconciliation of Determinism and Teleology in $\psi = \psi(\psi)$ {#sec-coda-stationary-phase-reconciliation}

From the standpoint of path integrals and the bivector chirality model, why does nature display only the causally necessary trajectory?

::: {.remark #rem-ch29-feynman-stationary-phase-literature title="Feynman Path-Integral Stationary Phase and the Bivector Chirality Interpretation (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In the standard Feynman path-integral formulation of quantum mechanics (R. P. Feynman, *Rev. Mod. Phys.* **20**, 367, 1948; not formalized in `trureturing@dev`), in the semiclassical stationary-phase approximation, rapid oscillations of $\exp(iS[x]/\hbar)$ suppress contributions away from stationary paths, and neighborhoods of paths satisfying $\delta S = 0$ dominate. In our Clifford geometric interpretation (`MODEL`), where the unit imaginary $i$ is realized as a grade-2 bivector generator $\hat{\mathbf{I}}$, an order-independent sum over configurations pairs off-shell trajectories into opposite-chirality bivector partners ($+\hat{\mathbf{I}}$ and $-\hat{\mathbf{I}}$) whose oriented area elements cancel:

$$
+\mathbf{\Omega} - \mathbf{\Omega} = 0.
$$

Only the self-consistent stationary configuration ($\delta S = 0$) lacks an opposite-chirality partner to cancel it, surviving orthogonal projection as the macroscopic trajectory.
:::

This picture simultaneously reconciles the age-old rivalry between **mechanical determinism** and **teleology**:

- Reading the page numbers **left to right** along the Picard iteration $\theta_{k+1} = \cos(\theta_k)$ from an initial state $\theta_0$ looks like **determinism** ("the past pushes the present step by step");
- Reading the convergence **right to left** from the unique attractor $\theta^* \approx 0.7390851332$ looks like **teleology** ("the future fixed point pulls every trajectory toward itself");
- Viewed from outside the sphere, in the timeless self-referential equation

  $$
  \cos(\theta^*) = \theta^* \qquad \bigl(\text{the real projection of }\psi = \psi(\psi)\bigr),
  $$

  there is neither a push from the past nor a pull from the future—only the unique self-consistent fixed point where the measuring operator and the measured state close into one.

## 29.3.4 Level 4: The Finite Observer, the Causally Compatible Space (Gram Elliptope), and Continuously Picking Points in the Time Field {#sec-coda-finite-observer-time-field}

> **Author's Epigraph**: *"Because the observer is finite, the causality experienced is finite; the observer's choice is made within the causally compatible space, continuously picking points in the time field."*（“因为观察者是有限的, 所以经历的因果是有限的, 观察者的选择是在因果的相容空间中做选择, 不断在时间场中选点”）

If the global time field is a timeless geometric crystal and local causality possesses the unbreakable rigidity of the Gram determinant, where does a **finite observer's freedom of choice** reside? This fourth insight completes the geometric synthesis of causal necessity and observer agency:

1. **Why Observer Finiteness Opens the Causally Compatible Space (`因果相容空间` / Gram Elliptope)**:
   Return to the three-state Gram determinant $\det G(\mathbf{A}, \mathbf{B}, \mathbf{C}) = \|\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C}\|^2 \ge 0$ on the unit sphere. Writing the two known historical inner-product projections as $c_{AB} = \cos\theta_1$ and $c_{BC} = \cos\theta_2$ and completing the square in the third inner product $c_{AC}$ yields:

   $$
   \det G = (1 - c_{AB}^2)(1 - c_{BC}^2) - \bigl(c_{AC} - c_{AB}c_{BC}\bigr)^2 = \sin^2\theta_1\sin^2\theta_2 - \bigl(c_{AC} - \cos\theta_1\cos\theta_2\bigr)^2 \ge 0.
   $$

   Assume $0 < \theta_1, \theta_2 < \pi$ so that both rotation planes are nondegenerate. Denoting by $\phi \in [0, 2\pi)$ the dihedral angle between the two bivector planes $(\mathbf{A}\wedge\mathbf{B})$ and $(\mathbf{B}\wedge\mathbf{C})$, the spherical law of cosines parameterizes the causally compatible interval as:

   $$
   c_{AC} = \underbrace{\cos\theta_1\cos\theta_2}_{\text{locked 1D historical backbone}} + \underbrace{\cos\phi}_{\text{observer's choice degree of freedom }\in [-1, +1]} \cdot \underbrace{\sin\theta_1\sin\theta_2}_{\text{uncollapsed orthogonal area radius}}.
   $$

   In the correlation coordinates $(x, y, z) = (c_{AB}, c_{BC}, c_{AC})$, the inequality $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$ carves out the convex **Gram elliptope**:
   - **Boundary shell ($\cos\phi = \pm 1 \iff \det G = 0$)**: the three vectors lie in a single great-circle plane ($\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} = 0$), representing coplanar inertial sliding with zero free volume ($c_{AC} = \cos(\theta_1 \mp \theta_2)$ is completely locked);
   - **Interior compatible space ($|\cos\phi| < 1 \iff \det G > 0$)**: as long as the previous transitions retain uncollapsed orthogonal area ($\sin\theta_1 > 0$ and $\sin\theta_2 > 0$), the observer can fold a dihedral angle $\phi \in (0, \pi)$ into a new orthogonal dimension ($\mathbf{A}\wedge\mathbf{B}\wedge\mathbf{C} \neq 0$), opening a genuine causal branch!

::: {.viz src="gram-causal-elliptope" preset="elliptope" height="500"}
**Two steps remembered: a slice of the swollen tetrahedron.** The violet swollen tetrahedron is every $(x, y, z)$ with $1 - x^2 - y^2 - z^2 + 2xyz \ge 0$. In the picture $\mathbf{P}_0$ is the current point and $\mathbf{Q}$ the candidate next one; the history fixes $x = \mathbf{P}_0\cdot\mathbf{P}_{-1}$, so $\mathbf{Q}$ can only put $(y, z) = (\mathbf{Q}\cdot\mathbf{P}_{-1},\, \mathbf{Q}\cdot\mathbf{P}_0)$ in the slice at $x$ (the picture cuts the solid open there, with the slice facing you), whose edge is the magenta ellipse ($\det G = 0$). The cyan segment running vertically through the amber $\mathbf{Q}$ is the window for $z$, $[xy - \sqrt{(1-x^2)(1-y^2)},\, xy + \sqrt{(1-x^2)(1-y^2)}]$. This description of the elliptope is a literature result, not formalized in this book.
:::

2. **Continuously Picking Points in the Time Field (`不断在时间场中选点`) as PSD Matrix Completion**:
   The global time field is a static photographic plate of potential state points obeying pairwise consistency and order-independence. Yet any physical observer is **finite** in compute, lifetime, and memory capacity (corresponding to the finite gate count $L$ of Chapter 20 and the finite record algebra of Chapter 28):
   - Unable to swallow the entire timeless sphere at once, a finite observer traces a finite polygonal chain of gate count $L = k$:

     $$
     \mathbf{P}_0 \longrightarrow \mathbf{P}_1 \longrightarrow \mathbf{P}_2 \longrightarrow \cdots \longrightarrow \mathbf{P}_k;
     $$

   - Carrying $M$ finite historical memory anchors at $\mathbf{P}_k$, picking the next point $\mathbf{P}_{k+1}$ is mathematically a **Positive-Semidefinite (PSD) Matrix Completion ($G_{M+1} \succeq 0$)** inside the green compatible bubble carved out by those $M$ anchors;
   - Once $\mathbf{P}_{k+1}^*$ is chosen, the dihedral angle $\phi_k$ solidifies into a new 1D inner-product coordinate (the verb `liáng` crystallizing into the noun `liàng`), immediately framing the compatible bubble for step $k + 2$.

::: {.viz src="gram-causal-elliptope" preset="narrow" height="500"}
**One more step remembered, one ring narrower.** The rail adds history from $M = 1$ to $M = 5$: each older anchor adds a magenta ellipse to the slice, nested inside the last, and the cyan window through the amber $\mathbf{Q}$ narrows with it, from all of $[-1, 1]$ to about a quarter of that, with $\mathbf{Q}$ inside throughout. The events live in $\mathbb{R}^6$, so every depth keeps an inside; reading the compatible space as a finite observer's room for choice is this book's interpretation (`MODEL`).
:::

Conversely, if the new inner-product coordinates are forced outside the bubble, the Gram table stops being positive semidefinite and fits in no inner-product space:

::: {.viz src="gram-causal-elliptope" preset="violate" height="500"}
**Filled in outside the bubble: the fifth minor turns negative first.** Five steps are remembered, but $z$ is placed inside the third ring and outside the fourth, so the amber $\mathbf{Q}$ becomes a hollow ring. In the order $\mathbf{Q}, \mathbf{P}_0, \mathbf{P}_{-1}, \dots$ the first four leading principal minors are still nonnegative and $D_5$ turns negative first: the thickened fourth ring is the one that refuses it (Sylvester's criterion, a literature result not formalized in this book).
:::

3. **Omniscient Deadlock, Forgetting-as-Renewal, and the Golden Breath of $\theta^* \approx 0.739$**:
   The interplay between historical memory and orthogonal slack across three observer regimes is summarized below:

| Observer Regime | Historical Backbone $\cos\theta$ & Orthogonal Area $\sin\theta$ | Gram Determinant $\det G$ & Compatible Radius | Geometric & Epistemological Fate |
| :--- | :--- | :--- | :--- |
| **Infinite Omniscient Observer**<br/>（无限全知观察者） | Orthogonal slack exhausted: $\sin\theta \to 0$, $M \to \infty$ | $\det G = 0$, compatible radius collapses to $0$ | **Omniscient Deadlock**: welded into the timeless static crystal (cf. [@rem-ch29-wheeler-dewitt-page-wootters-literature]) with zero room for choice or motion |
| **Zero-Memory Instantaneous Observer**<br/>（零记忆瞬时观察者） | Historical backbone lost: $\cos\theta \to 0$, $M = 0$ | Compatible radius $\sin\theta = 1$ unconstrained | **Maximum Sphere Noise**: devoid of causal continuity, every step degenerates into memoryless random drift |
| **Finite Self-Referential Prototype**<br/>（有限自指观察者原型，`MODEL`） | Modeled by the 1D Dottie fixed point $\cos\theta^* = \theta^* \approx 0.7391$, $\sin\theta^* \approx 0.6736$ | $\det G > 0$, open corridor radius $(\sin\theta^*)^2 \approx 0.4538 > 0$ | **Golden Breath (`MODEL`)**: a geometric metaphor balancing a $\approx 73.9\%$ causal backbone with $\approx 67.4\%$ orthogonal slack for renewal |

At the other end of the table stands the zero-memory instantaneous observer, with the window wide open:

::: {.viz src="timeless-causal-crystal" preset="right" height="500"}
**Two right angles: the window is wide open.** With $\theta_1 = \theta_2 = 90^\circ$ the cyan and magenta cosines are both $0$ and put no constraint on the third: the window is all of $[-1, 1]$, $\mathbf{C}$ can travel anywhere along the equator, and the amber $c_{AC}$ runs from $-1$ to $1$. Reading this as the "Zero-Memory Instantaneous Observer" row of the table above is this book's interpretation (`MODEL`).
:::

   This seals the book's synthesis of time, causality, and agency in a single aphorism: ***"Globally timeless, hence eternal; finitely observed, hence new at every step."*** (**“全局无时间，故万古长存；观察者有限，故步步皆新。”**) (In the **[Coda](coda.md)**, we will pair the Lean-verified **`trureturing` Cut-and-Project Golden Model Set and Zeckendorf Observer Route theorems** with an explicit authorial geometric interpretation (`MODEL`): viewing cross-round invariant operator parameters as internal conjugate-window phase anchors and historical ruins as low-dissipation **spatial attractors**, to illuminate why a finite observer experiences déjà-vu resonance across Cassini's $(-1)^{n+1}$ norm seam and strange-attractor fractal sheets.)

::: {.theorem #thm-ch29-gram-rigidity-and-pell title="Golden-Integer Pell Norm Identity and Unit-Vector Gram Overlap Equivalence" lean="D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm, D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization"}
Across arithmetic quadratic lattices and inner-product spaces, discrete seam norms and unit-vector overlap equivalence are established by two Lean-4-verified theorems:

1. **Pell-Type Norm Identity in the Golden-Integer Ring** ([`pell_form_eq_four_mul_norm`](lean:D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm)): For every golden integer $g = a + b\varphi \in \mathbb{Z}[\varphi]$ (where $\varphi^2 = \varphi + 1$), its quadratic norm $\operatorname{norm}(g) = a^2 + ab - b^2$ satisfies the exact Pell difference-of-squares identity

   $$
   (2a + b)^2 - 5b^2 = 4\,\operatorname{norm}(g).
   $$

2. **Unit Gram Overlap Criterion and Equivalence Relation** ([`unit_gram_overlap_characterization`](lean:D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization)): Let $E$ be an inner-product space over $\mathbb{K}$ (`RCLike`) and $\operatorname{record} : \mathrm{Index} \to E$ a normalized family of vectors ($\forall i,\, \|\operatorname{record}(i)\| = 1$). Then for all indices $i, j \in \mathrm{Index}$, unit inner-product overlap characterizes exact vector equality:

   $$
   \forall i, j,\quad \langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \iff \operatorname{record}(i) = \operatorname{record}(j),
   $$

   and unit-Gram indistinguishability $(i, j) \mapsto \bigl(\langle \operatorname{record}(i),\, \operatorname{record}(j)\rangle_{\mathbb{K}} = 1\bigr)$ forms an equivalence relation (`Equivalence`) on $\mathrm{Index}$.
:::

::: proof
Part 1 expands $(2a + b)^2 - 5b^2 = 4a^2 + 4ab + b^2 - 5b^2 = 4(a^2 + ab - b^2) = 4\,\operatorname{norm}(g)$ directly in ring arithmetic. Part 2 applies the Cauchy–Schwarz equality characterization for unit vectors (`inner_eq_one_iff_of_norm_eq_one`) to obtain $\langle \operatorname{record}(i), \operatorname{record}(j)\rangle_{\mathbb{K}} = 1 \iff \operatorname{record}(i) = \operatorname{record}(j)$ and lifts reflexivity, symmetry, and transitivity of equality to prove `Equivalence`. The full proof is checked by the Lean kernel.
:::

---
