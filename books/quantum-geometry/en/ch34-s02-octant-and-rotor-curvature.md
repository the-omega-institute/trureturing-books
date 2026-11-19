# 29.2 Spherical Octant and Rotor Curvature: You Stand on the Normal of Whichever Area You Cannot See {#sec-ch34-octant-rotor-holonomy}

Moving from static vector addressing to the $90^\circ$ equatorial rotation area invisible to the polar observer in Panel II of Figure 29, and unfolding it into the **octant orthogonal-circuit model (`MODEL`)** (with the single-step vs. two-step rotor products, holonomy discrepancy, and equatorial test-vector comparison derived inside attributed example [@ex-ch34-spherical-addressing-and-octant-rotors] Part 2 below, and continuum geometric-phase literature recorded in [@rem-ch34-virtual-z-berry-relativity-literature]), elevates the comparison between single and double orthogonality from point coordinates to **readout kernels and commutator blind spots**.

::: {.viz src="spherical-degeneracy-radar" preset="hops" height="500"}
**One hop or two: the same end point, carried flags 90° apart.** The solid one hop climbs straight up through $\mathbf{e}_1\wedge\mathbf{e}_3$ to $+\mathbf{e}_3$; the dashed two hops reach $\mathbf{e}_2$ first and then $+\mathbf{e}_3$. The two flags (the images of $\mathbf{e}_2$) end a magenta $90^\circ$ apart in the $\mathbf{e}_1\wedge\mathbf{e}_2$ plane, and the violet difference rotor $\exp(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2)$ at the lower right lies wholly in that plane ([@ex-ch34-spherical-addressing-and-octant-rotors]).
:::

When two distinct evolution sequences produce distinct states in the full carrier space, how can a bounded internal observer still record identical readings for both? At the level of observation topology and ring algebra, two formal theorems pinpoint why: **every readout map induces a partition topology whose topologically inseparable pairs coincide with its readout kernel, while the commutator between an operator $U$ and an observable $f$ factors as $(\mathrm{translated} - f) \cdot U$—so whenever semiconjugation leaves $f$ unshifted ($\mathrm{translated} = f$), the commutator vanishes immediately!**

::: {.viz src="spherical-degeneracy-radar" preset="equator" height="500"}
**Different end states, and still some observers read one number.** The equator test state at $\alpha = 60^\circ$ goes to the solid great circle under the one-hop rotor and to the dashed one under the two-hop rotor; the two circles meet only at the violet $\pm\mathbf{e}_3$. The amber observer at $\mathbf{e}_2$ reads $\frac{\sqrt{3}}{2}$ and $0$, and the magenta piece is that gap; the dashed cyan circle is the blind circle $O_1 + O_2 = 0$, whose observers read the two end states as one number, the same fibre of the readout ([@thm-ch34-readout-kernel-and-covariant-commutator]).
:::

::: {.theorem #thm-ch34-readout-kernel-and-covariant-commutator title="Partition-Topology Inseparability Kernel and Covariant Commutator Factorization" lean="D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula"}
In the frozen observation-partition-topology and covariant-commutator modules of `trureturing`, the following two theorems hold simultaneously:

1. **Exact Kernel Characterization of Inseparability in a Readout Partition Topology** ([`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)): For arbitrary types $X, B$ and any readout map $\mathrm{readout} : \operatorname{Concept}\;X\;B$ ($X \to B$), equip $X$ with the induced discrete pullback topology $\operatorname{partitionTopology}(\mathrm{readout}) = \operatorname{TopologicalSpace.induced}\;\mathrm{readout}\;\bot$. Then for all states $x, y \in X$,

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \;\Longleftrightarrow\; \mathrm{readout}(x) = \mathrm{readout}(y);
   $$

2. **Right-Factored Covariant Commutator Identity** ([`covariant_commutator_formula`](lean:D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula)): Let $B$ be any ring (`[Ring B]`) and let $U, f, \mathrm{translated} \in B$ satisfy the semiconjugacy relation $\operatorname{SemiconjBy}\;U\;f\;\mathrm{translated}$ (meaning $U \cdot f = \mathrm{translated} \cdot U$). Then the commutator factors exactly as

   $$
   U \cdot f - f \cdot U \;=\; (\mathrm{translated} - f) \cdot U.
   $$
:::

::: proof
In Conjunct 1, endowing $B$ with the discrete topology $\bot$ makes the singleton fiber $\mathrm{fiber} = \mathrm{readout}^{-1}(\{\mathrm{readout}(x)\})$ open in $\operatorname{partitionTopology}(\mathrm{readout})$; if $x$ and $y$ are topologically inseparable, `Inseparable.mem_open_iff` forces $y \in \mathrm{fiber}$ and hence $\mathrm{readout}(x) = \mathrm{readout}(y)$, while conversely $\mathrm{readout}(x) = \mathrm{readout}(y)$ implies identical membership across every induced open preimage $\mathrm{readout}^{-1}(\mathrm{coordinates})$. In Conjunct 2, rewriting $U \cdot f = \mathrm{translated} \cdot U$ via `hcov.eq` and applying right distributivity `sub_mul` yields $(\mathrm{translated} - f) \cdot U$. The full proof is checked by the Lean kernel.
:::

[@thm-ch34-readout-kernel-and-covariant-commutator] strips all mystique from observational blind spots: topological inseparability of distinct states $x \neq y$ under $\operatorname{partitionTopology}(\mathrm{readout})$ directly traces the fiber kernel of `readout`, and whenever a holonomy transformation $U$ fixes the observer's observable ($\mathrm{translated} = f$), their commutator collapses to zero ($U f - f U = 0$). We now work out every sign of both the spherical addressing difference and the octant rotor holonomy in $\mathbb{R}^3$ and $\mathcal{Cl}_{3,0}^+$.

::: {.figure src="ch34-readout-fibers"}
**Two different end states on one fiber are read as the same number.** The equatorial test state at $\alpha = 60^\circ$ goes to $\mathbf{s}_{\mathrm{once}}$ (filled dot) under the one-step rotor and to $\mathbf{s}_{\mathrm{twice}}$ (hollow ring) under the two-step rotor; both have the same $\mathbf{e}_3$ component $\frac{1}{2}$, so only the $\mathbf{e}_1$–$\mathbf{e}_2$ plane is drawn. The amber observer $\mathbf{O} = (-\mathbf{e}_1 + \mathbf{e}_2)/\sqrt{2}$ has $O_1 + O_2 = 0$; the parallel cyan lines are the fibers of equal reading $\mathbf{O}\cdot\mathbf{x}$, both end states lie on one of them with the reading $\sin\alpha/\sqrt{2} \approx 0.61$, and their magenta difference runs along the fiber, in the kernel of the readout ([@thm-ch34-readout-kernel-and-covariant-commutator], item 1).
:::

::: {.example #ex-ch34-spherical-addressing-and-octant-rotors title="Complete Analytical and Numerical Derivation of Spherical Addressing Inversion and Octant Rotor Holonomy (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Part 1 below is an elementary inner-product derivation in $\mathbb{R}^3$, while Part 2 uses standard bivector-exponential rotor and duality conventions in the even subalgebra $\mathcal{Cl}_{3,0}^+$ of the real three-dimensional geometric algebra $\mathcal{Cl}_{3,0}(\mathbb{R})$ (with $\mathbf{e}_i^2 = 1$ and $\mathbf{e}_i\mathbf{e}_j = -\mathbf{e}_j\mathbf{e}_i$ for $i \neq j$, not formalized as a standalone continuum rotor module in `trureturing@dev`):

1. **Readout Difference and Polar Normal Locking in Two-Step Spherical Addressing**:
   In the orthonormal basis $\{\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3\} \subset \mathbb{R}^3$, take $\theta \in (0, \pi)$ ($\sin\theta \neq 0$) and $\phi \in [0, 2\pi)$, and compare the single-step and double-step states

   $$
   \mathbf{v}_1(\theta) = \cos\theta\,\mathbf{e}_3 + \sin\theta\,\mathbf{e}_1, \qquad
   \mathbf{v}_2(\theta, \phi) = \cos\theta\,\mathbf{e}_3 + \sin\theta\bigl(\cos\phi\,\mathbf{e}_1 + \sin\phi\,\mathbf{e}_2\bigr).
   $$

   For any unit observer vector $\mathbf{O} = O_1\mathbf{e}_1 + O_2\mathbf{e}_2 + O_3\mathbf{e}_3$ ($O_1^2 + O_2^2 + O_3^2 = 1$), the inner-product readout discrepancy is

   $$
   \Delta(\mathbf{O}) \;=\; \mathbf{O}\cdot\mathbf{v}_2(\theta, \phi) - \mathbf{O}\cdot\mathbf{v}_1(\theta) \;=\; \sin\theta\bigl[O_1(\cos\phi - 1) + O_2\sin\phi\bigr].
   $$

   Three exact localization regimes follow immediately:
   - **Single $90^\circ$ second step ($\phi = \pi/2$)**: Since $\sin\theta \neq 0$, $\Delta(\mathbf{O}) = \sin\theta(-O_1 + O_2) = 0 \iff O_1 = O_2$, confining $\mathbf{O}$ to the **great-circle symmetry meridian** passing through $\pm\mathbf{e}_3$ and $\pm(\mathbf{e}_1 + \mathbf{e}_2)/\sqrt{2}$;
   - **Full azimuthal degeneracy ($\forall \phi \in [0, 2\pi)$)**: Setting $\phi = \pi$ gives $-2\sin\theta\,O_1 = 0 \implies O_1 = 0$, and setting $\phi = \pi/2$ gives $\sin\theta\,O_2 = 0 \implies O_2 = 0$. Normalization $O_1^2 + O_2^2 + O_3^2 = 1$ then forces $O_3 = \pm 1$:

     $$
     \Delta(\mathbf{O}) \equiv 0 \;\Longleftrightarrow\; O_1 = O_2 = 0 \;\Longleftrightarrow\; \mathbf{O} = \pm\mathbf{e}_3 = \pm\star(\mathbf{e}_1 \wedge \mathbf{e}_2),
     $$

     at which both readouts collapse identically to $\mathbf{O}\cdot\mathbf{v}_1(\theta) = \mathbf{O}\cdot\mathbf{v}_2(\theta, \phi) = \pm\cos\theta$;
   - **Off-axis observer tilt ($\beta_{\mathrm{obs}} \in (0, \pi)$)**: Tilting $\mathbf{O}$ off $\pm\mathbf{e}_3$ by polar angle $\beta_{\mathrm{obs}}$ ($\sqrt{O_1^2 + O_2^2} = \sin\beta_{\mathrm{obs}} > 0$, transverse azimuth $\varphi_{\mathrm{obs}}$) yields $\Delta(\mathbf{O}) = \sin\theta\sin\beta_{\mathrm{obs}}\bigl[\cos(\phi - \varphi_{\mathrm{obs}}) - \cos\varphi_{\mathrm{obs}}\bigr]$, opening an azimuthal readout split with peak-to-peak amplitude proportional to $\lvert\sin\theta\rvert\sin\beta_{\mathrm{obs}}$.

2. **Octant Rotor Holonomy in $\mathcal{Cl}_{3,0}^+$ and Polar Blindness**:
   Under the two-sided rotor action $\mathbf{s} \mapsto R\mathbf{s}\widetilde{R}$ (where reversion satisfies $\widetilde{\mathbf{e}_i\mathbf{e}_j} = \mathbf{e}_j\mathbf{e}_i = -\mathbf{e}_i\mathbf{e}_j$), the direct $90^\circ$ rotor in $\mathbf{e}_1 \wedge \mathbf{e}_3$ carrying $\mathbf{e}_1 \to \mathbf{e}_3$ is

   $$
   R_{\mathrm{once}} \;=\; \exp\!\left(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_3\right) \;=\; \frac{1 - \mathbf{e}_1\mathbf{e}_3}{\sqrt{2}}.
   $$

   Composing the two-step $90^\circ$ transport ($\mathbf{e}_1 \to \mathbf{e}_2$ via $\frac{1 - \mathbf{e}_1\mathbf{e}_2}{\sqrt{2}}$ followed by $\mathbf{e}_2 \to \mathbf{e}_3$ via $\frac{1 - \mathbf{e}_2\mathbf{e}_3}{\sqrt{2}}$) and evaluating the bivector product $(-\mathbf{e}_2\mathbf{e}_3)(-\mathbf{e}_1\mathbf{e}_2) = \mathbf{e}_2\mathbf{e}_3\mathbf{e}_1\mathbf{e}_2 = -\mathbf{e}_2\mathbf{e}_1\mathbf{e}_3\mathbf{e}_2 = +\mathbf{e}_1\mathbf{e}_2\mathbf{e}_3\mathbf{e}_2 = -\mathbf{e}_1\mathbf{e}_2^2\mathbf{e}_3 = -\mathbf{e}_1\mathbf{e}_3 = +\mathbf{e}_3\mathbf{e}_1$ gives

   $$
   \begin{aligned}
   R_{\mathrm{twice}}
   &= \left(\frac{1 - \mathbf{e}_2\mathbf{e}_3}{\sqrt{2}}\right)\left(\frac{1 - \mathbf{e}_1\mathbf{e}_2}{\sqrt{2}}\right)
   = \frac{1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_2\mathbf{e}_3 - \mathbf{e}_1\mathbf{e}_3}{2} \\
   &= \frac{1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_2\mathbf{e}_3 + \mathbf{e}_3\mathbf{e}_1}{2}
   = \exp\!\left(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2\right) R_{\mathrm{once}} \;\neq\; R_{\mathrm{once}}
   \end{aligned}
   $$

   (since $(1 - \mathbf{e}_1\mathbf{e}_2)(1 - \mathbf{e}_1\mathbf{e}_3) = 1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_1\mathbf{e}_3 + \mathbf{e}_1\mathbf{e}_2\mathbf{e}_1\mathbf{e}_3 = 1 - \mathbf{e}_1\mathbf{e}_2 - \mathbf{e}_2\mathbf{e}_3 - \mathbf{e}_1\mathbf{e}_3$). Acting on an equatorial test vector $\mathbf{s}(\alpha) = \cos\alpha\,\mathbf{e}_1 + \sin\alpha\,\mathbf{e}_2$ yields

   $$
   \mathbf{s}_{\mathrm{once}}(\alpha) = R_{\mathrm{once}}\mathbf{s}(\alpha)\widetilde{R}_{\mathrm{once}} = \cos\alpha\,\mathbf{e}_3 + \sin\alpha\,\mathbf{e}_2,
   \qquad
   \mathbf{s}_{\mathrm{twice}}(\alpha) = R_{\mathrm{twice}}\mathbf{s}(\alpha)\widetilde{R}_{\mathrm{twice}} = \cos\alpha\,\mathbf{e}_3 - \sin\alpha\,\mathbf{e}_1
   $$

   (with $\mathbf{s}_{\mathrm{once}}(\alpha) \neq \mathbf{s}_{\mathrm{twice}}(\alpha)$ if and only if $\sin\alpha \neq 0$, coinciding at $\pm\mathbf{e}_3$ when $\sin\alpha = 0$). Requiring $\mathbf{O}\cdot\mathbf{s}_{\mathrm{once}}(\alpha) = \mathbf{O}\cdot\mathbf{s}_{\mathrm{twice}}(\alpha)$ for a single angle with $\sin\alpha \neq 0$ gives $-\sin\alpha(O_1 + O_2) = 0 \implies O_1 + O_2 = 0$; requiring invariance across rotated initial equatorial frames $(\mathbf{e}_1(\gamma), \mathbf{e}_2(\gamma))$ ($\gamma \in [0, 2\pi)$) forces $O_1 = O_2 = 0$, uniquely locking $\mathbf{O} = \pm\mathbf{e}_3$! At $\mathbf{O} = +\mathbf{e}_3$, both readouts equal $\cos\alpha$ because $\langle \mathbf{e}_3,\, \mathbf{e}_1 \wedge \mathbf{e}_2\rangle_0 = 0$ and $\langle \mathbf{e}_3(\mathbf{e}_1\wedge\mathbf{e}_2)\rangle_1 = 0$, whereas an equatorial observer at $\mathbf{O} = \mathbf{e}_2$ reads $\sin\alpha$ versus $0$!

3. **Explicit Numerical Check ($\theta = \alpha = \frac{\pi}{3},\; \phi = \frac{\pi}{2}$)**:
   With $\cos\frac{\pi}{3} = \frac{1}{2}$ and $\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}$, the four unit vectors evaluate explicitly to

   $$
   \mathbf{v}_1\!\left(\tfrac{\pi}{3}\right) = \left(\tfrac{\sqrt{3}}{2},\; 0,\; \tfrac{1}{2}\right), \qquad
   \mathbf{v}_2\!\left(\tfrac{\pi}{3}, \tfrac{\pi}{2}\right) = \left(0,\; \tfrac{\sqrt{3}}{2},\; \tfrac{1}{2}\right);
   $$

   $$
   \mathbf{s}_{\mathrm{once}}\!\left(\tfrac{\pi}{3}\right) = \left(0,\; \tfrac{\sqrt{3}}{2},\; \tfrac{1}{2}\right), \qquad
   \mathbf{s}_{\mathrm{twice}}\!\left(\tfrac{\pi}{3}\right) = \left(-\tfrac{\sqrt{3}}{2},\; 0,\; \tfrac{1}{2}\right).
   $$

   A polar observer $\mathbf{O} = (0, 0, 1)$ obtains the identical overlap $\frac{1}{2}$ (squared weight $\frac{1}{4}$) on all four vectors, whereas an equatorial observer tilted by $\beta_{\mathrm{obs}} = \frac{\pi}{2}$ to $\mathbf{O}' = (0, 1, 0)$ reads $0$ vs. $\frac{\sqrt{3}}{2}$ on $(\mathbf{v}_1, \mathbf{v}_2)$ and $\frac{\sqrt{3}}{2}$ vs. $0$ on $(\mathbf{s}_{\mathrm{once}}, \mathbf{s}_{\mathrm{twice}})$: because the octant holonomy factor $\exp\!\left(-\frac{\pi}{4}\mathbf{e}_1\mathbf{e}_2\right)$ separating $R_{\mathrm{once}}$ from $R_{\mathrm{twice}}$ lies wholly inside $\mathbf{e}_1 \wedge \mathbf{e}_2$, an equatorial observer immediately resolves $\sin\alpha$ from $0$ while only the polar observer at $\pm\mathbf{e}_3$ remains structurally blind to that plane.
:::

::: {.viz src="spherical-degeneracy-radar" preset="tilted" height="500"}
**Off the polar axis, the readings open up with the azimuth.** The amber observer is $45^\circ$ from the North Pole, in the $\mathbf{e}_2\wedge\mathbf{e}_3$ plane: the two cyan shadows part and the magenta gap opens as $\sin\theta\sin\beta_{\mathrm{obs}}\sin\phi$, with a peak-to-peak spread of $2\sin\theta\sin\beta_{\mathrm{obs}} \approx 1.22$; the figure shows $\phi = 90^\circ$, with readings of about $0.35$ and $0.97$.
:::

Stepping back from the rotor calculation in Part 2 of [@ex-ch34-spherical-addressing-and-octant-rotors], the geometric localization principle crystallizes into a single aphorism (`MODEL`): **whichever rotation plane's turning you cannot see, you are standing directly on its orthogonal normal axis.**

::: {.viz src="spherical-degeneracy-radar" preset="frames" height="500"}
**Turning the initial frame: the pole stays on the blind circle.** Turn the equatorial frame by $\gamma$ and build the two rotors again ($\alpha = 60^\circ$): the dashed cyan blind circle turns with the frame about the vertical, and the faint cyan circles are the ones already passed. The amber observer at the North Pole is on every one of them and always reads $\cos\alpha = \frac{1}{2}$ twice.
:::

---
