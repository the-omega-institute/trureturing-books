# 34.24 Orientation Parity and Positive Sagitta Composition: Gauge Cancellation, the Gravitational Analogy, and the Dynamical Boundary {#sec-ch34-interaction-sign-and-sagitta-composition}

Across [§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron), [§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave), and [§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers), the infinitesimal spherical trihedron $\Delta\mathcal{T}_\epsilon$ served simultaneously as the elementary cell for gauge holonomy and for curvature excess (`MODEL`). Placing both sectors side by side on the same cell immediately raises a foundational physical question: **why do electromagnetic and non-Abelian gauge interactions admit opposite charges ($\pm q$, color and anticolor) that screen bulk matter into macroscopic neutrality, whereas static gravitational sources never cancel with opposite sign—accumulating coherently across astronomical scales despite their extreme microscopic weakness?**

Answering that question honestly requires separating **kinematic parity identities** from **dynamical propagator assumptions** without a trace of hand-waving. Which sign cancellations and orientation-even positive residuals are already proved inside the inner-product and Clifford geometry of $\Delta\mathcal{T}_\epsilon$? Conversely, why is local sagitta positivity $d(\epsilon) \ge 0$ (together with Gram volume positivity) **insufficient** by itself to derive $3+1\mathrm{D}$ Lorentzian spin-$2$ universal attraction, masslessness ($1/r$ range), or the six-order-of-magnitude variation of gravitational-to-electrostatic force ratios across particle species? We establish both sides below through exact algebra and four explicit countermodels.

## 34.24.1 Traversal Parity Versus Step-Order Separation: Signed Holonomy Cancellation and Orientation-Even Sagitta Residuals {#sec-ch34-24-1}

Return to the unit-sphere setup $S^2 \subset \mathbb{R}^3$ of [§34.4](ch34-s04-infinitesimal-trihedron.md#sec-ch34-infinitesimal-spherical-trihedron): fix the right-angle pivot ray $\mathbf{z}_0 := \mathbf{e}_2 = (0, 1, 0)$ and, at step angle $\epsilon \in (0, \frac{\pi}{2}]$, step along the two mutually orthogonal coordinate walls $\mathbf{e}_2 \wedge \mathbf{e}_1$ and $\mathbf{e}_2 \wedge \mathbf{e}_3$ to obtain the unit rays

$$
\mathbf{z}_0 \;=\; (0, 1, 0), \qquad \mathbf{x}_\epsilon \;=\; (\sin\epsilon, \cos\epsilon, 0), \qquad \mathbf{y}_\epsilon \;=\; (0, \cos\epsilon, \sin\epsilon).
$$

On this single cell, the comparison primitive $\mathrm{CMP}(\mathbf{u}, \mathbf{v}) = \langle\mathbf{u}, \mathbf{v}\rangle\mathbf{1} + \mathbf{u}\wedge\mathbf{v}$ separates observables cleanly by both **orientation parity** and **expansion order in $\epsilon$**:

1. **Open-arc $O(\epsilon)$ signed transverse amplitude and closed-loop $O(\epsilon^2)$ Bargmann imaginary part**:
   Along a single open wall comparison $\mathbf{z}_0 \to \mathbf{x}_{\sigma\epsilon} = (\sigma\sin\epsilon, \cos\epsilon, 0)$ labeled by step sign $\sigma \in \{+1, -1\}$, expanding $\mathrm{CMP}(\mathbf{z}_0, \mathbf{x}_{\sigma\epsilon}) = \cos\epsilon\,\mathbf{1} + q_\sigma(\epsilon)\,(\mathbf{e}_2\wedge\mathbf{e}_1)$ isolates the first-order signed transverse amplitude

   $$
   q_\sigma(\epsilon) \;:=\; \sigma\sin\epsilon \;=\; \sigma\epsilon - \frac{\sigma}{6}\epsilon^3 + O(\epsilon^5), \qquad q_+(\epsilon) + q_-(\epsilon) \;=\; 0,
   $$

   which is strictly **odd** under $\sigma \mapsto -\sigma$. Next, pass to the closed three-ray pure-state projector loop formed by $P(\mathbf{r}) = \frac{1}{2}(I_2 + \mathbf{r}\cdot\boldsymbol{\sigma})$: let $\sigma = +1$ denote the right-handed cyclic traversal $(\mathbf{x}_\epsilon, \mathbf{z}_0, \mathbf{y}_\epsilon)$ and $\sigma = -1$ the opposite-traversal loop $(\mathbf{y}_\epsilon, \mathbf{z}_0, \mathbf{x}_\epsilon)$ obtained by swapping $\mathbf{x}_\epsilon \leftrightarrow \mathbf{y}_\epsilon$. Direct evaluation gives $\mathbf{x}_\epsilon\cdot\mathbf{z}_0 = \mathbf{z}_0\cdot\mathbf{y}_\epsilon = \cos\epsilon$, $\mathbf{x}_\epsilon\cdot\mathbf{y}_\epsilon = \cos^2\epsilon$, and—since $\mathbf{z}_0 \times \mathbf{y}_\epsilon = (\sin\epsilon, 0, 0)$—the scalar triple products $\mathbf{x}_\epsilon\cdot(\mathbf{z}_0 \times \mathbf{y}_\epsilon) = +\sin^2\epsilon$ versus $\mathbf{y}_\epsilon\cdot(\mathbf{z}_0 \times \mathbf{x}_\epsilon) = -\sin^2\epsilon$. Consequently, the three-state Bargmann invariant equals

   $$
   B_\sigma(\epsilon) \;=\; \frac{(1 + \cos\epsilon)^2}{4} \;+\; i\sigma\,\frac{\sin^2\epsilon}{4}, \qquad B_-(\epsilon) \;=\; \overline{B_+(\epsilon)}, \qquad \operatorname{Im} B_+(\epsilon) + \operatorname{Im} B_-(\epsilon) \;=\; 0.
   $$

2. **Crucial symmetry check: cyclic traversal reversal versus simultaneous step negation $\epsilon \mapsto -\epsilon$**:
   One algebraic subtlety must be verified explicitly. Suppose we negate $\epsilon \mapsto -\epsilon$ **simultaneously on both wall rays**, sending $(\sin\epsilon, \cos\epsilon, 0) \mapsto (-\sin\epsilon, \cos\epsilon, 0)$ and $(0, \cos\epsilon, \sin\epsilon) \mapsto (0, \cos\epsilon, -\sin\epsilon)$. That map is the $180^\circ$ **proper Euclidean rotation** $R_{\mathbf{e}_2}(\pi) = \operatorname{diag}(-1, +1, -1) \in \mathrm{SO}(3)$ ($\det R_{\mathbf{e}_2}(\pi) = +1$) around the pivot axis $\mathbf{z}_0 = \mathbf{e}_2$! Because scalar triple products are strictly $\mathrm{SO}(3)$-invariant, the two minus signs multiply to $(-\sin\epsilon)(-\sin\epsilon) = +\sin^2\epsilon$ and leave $B_\sigma(-\epsilon) = B_\sigma(\epsilon)$ **completely invariant**. Conjugating $B_+ \leftrightarrow B_-$ requires an orientation-reversing operation of determinant $-1$: either swapping the cyclic traversal order $\mathbf{x}_\epsilon \leftrightarrow \mathbf{y}_\epsilon$, or negating a **single** wall leg $(\epsilon_1, \epsilon_2) \mapsto (-\epsilon_1, +\epsilon_2)$ so that $\sin\epsilon_1\sin\epsilon_2$ changes sign.

3. **Orientation-even positive radial sagitta $d(\epsilon)$ and Gram area/volume deficits**:
   In sharp contrast to the odd $O(\epsilon)$ open amplitude $q_\sigma(\epsilon)$ and the odd $O(\epsilon^2)$ closed-loop phase $\operatorname{Im} B_\sigma(\epsilon)$, the even similarity component $S(\mathbf{z}_0, \mathbf{x}_{\sigma\epsilon}) = \cos\epsilon$ drops below unit self-similarity $S(\mathbf{z}_0, \mathbf{z}_0) = 1$ by a non-negative **radial sagitta**, accompanied by non-negative two-anchor area and three-anchor Gram volume residuals:

   $$
   d(\epsilon) \;:=\; 1 - \cos\epsilon \;=\; 2\sin^2\frac{\epsilon}{2} \;=\; \frac{\epsilon^2}{2} - \frac{\epsilon^4}{24} + O(\epsilon^6) \;\ge\; 0, \qquad \det G(\mathbf{x}_\epsilon, \mathbf{z}_0, \mathbf{y}_\epsilon) \;=\; (1 - \cos^2\epsilon)^2 \;=\; \sin^4\epsilon \;\ge\; 0.
   $$

   Under both $\sigma \mapsto -\sigma$ and $\epsilon \mapsto -\epsilon$, $d(\epsilon)$, $1 - \cos^2\epsilon = \sin^2\epsilon$, and $\det G(\epsilon) = \sin^4\epsilon$ are even squares—strictly positive on $(0, \frac{\pi}{2}]$ and invariant under orientation reversal.

::: {.remark #rem-ch34-parity-versus-order-contract title="Formal Contract Separating Orientation Parity, Simultaneous Step Negation, and Positive Gram Residuals"}
The four kinematic identities above rest on exact Lean kernel theorems, with their mathematical scope and physical modeling boundary demarcated as follows:

1. **Three-state Bargmann Bloch formula and octant orientation conjugation**: The theorem [triple_bargmann_bloch](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch) establishes $\operatorname{tripleBargmann}(\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3) = \frac{1}{4}(1 + \mathbf{r}_1\cdot\mathbf{r}_2 + \mathbf{r}_2\cdot\mathbf{r}_3 + \mathbf{r}_3\cdot\mathbf{r}_1) + \frac{i}{4}\,\mathbf{r}_1\cdot(\mathbf{r}_2 \times \mathbf{r}_3)$ for all $\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3 \in \mathbb{R}^3$, while [explicit_qubit_orientation](lean:D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.explicit_qubit_orientation) certifies at the orthogonal octant limit $\epsilon = \frac{\pi}{2}$ that flipping a single leg $(0, 1, 0) \mapsto (0, -1, 0)$ conjugates $\frac{1 + i}{4}$ into $\frac{1 - i}{4}$. Evaluating on $(\mathbf{x}_\epsilon, \mathbf{z}_0, \mathbf{y}_\epsilon)$ versus the swapped traversal $(\mathbf{y}_\epsilon, \mathbf{z}_0, \mathbf{x}_\epsilon)$ gives $B_\sigma(\epsilon) = \frac{(1+\cos\epsilon)^2}{4} + i\sigma\frac{\sin^2\epsilon}{4}$, confirming that cyclic leg swap $\sigma \mapsto -\sigma$ reverses the $O(\epsilon^2)$ imaginary part whereas simultaneous negation $\epsilon \mapsto -\epsilon$ on both legs is a proper $\mathrm{SO}(3)$ half-turn leaving $B_\sigma$ invariant.
2. **Three-anchor Gram determinant and Lagrange–Gram sum-of-squares identity**: In any real inner-product space, [three_anchor_gram_det_formula](lean:D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula) expands $\det G(u, v, w) = \lVert u\rVert^2\lVert v\rVert^2\lVert w\rVert^2 + 2\langle u, v\rangle\langle u, w\rangle\langle v, w\rangle - \lVert u\rVert^2\langle v, w\rangle^2 - \lVert v\rVert^2\langle u, w\rangle^2 - \lVert w\rVert^2\langle u, v\rangle^2$, and [lagrange_gram_identity](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity) proves $(\sum_i u_i^2)(\sum_i v_i^2) - (\sum_i u_i v_i)^2 = \frac{1}{2}\sum_{i,j}(u_i v_j - u_j v_i)^2 \ge 0$. Applied to $(\mathbf{x}_\epsilon, \mathbf{z}_0, \mathbf{y}_\epsilon)$, they lock the two-anchor area deficit $1 - \cos^2\epsilon = \sin^2\epsilon \ge 0$ and the three-anchor Gram determinant $\det G(\epsilon) = \sin^4\epsilon \ge 0$ (alongside the radial sagitta $d(\epsilon) = 1 - \cos\epsilon = 2\sin^2(\epsilon/2) \ge 0$) as orientation-even non-negative residuals (cf. [@thm-ch34-trihedron-cochain-and-moving-axis]).
3. **Concrete check at $\epsilon = \frac{\pi}{6}$ (`manual derivation`)**: At $\epsilon = \frac{\pi}{6}$ ($\sin\frac{\pi}{6} = \frac{1}{2}$, $\cos\frac{\pi}{6} = \frac{\sqrt{3}}{2}$), the orientation-odd observables give $q_\pm(\frac{\pi}{6}) = \pm\frac{1}{2} = \pm 0.5000$ ($q_+ + q_- = 0$) and $\operatorname{Im} B_\pm(\frac{\pi}{6}) = \pm\frac{1}{16} = \pm 0.0625$ ($\operatorname{Im} B_+ + \operatorname{Im} B_- = 0$, with common real part $\operatorname{Re} B_\pm(\frac{\pi}{6}) = \frac{7 + 4\sqrt{3}}{16} \approx 0.870513$), whereas the orientation-even residuals remain strictly positive: $d(\frac{\pi}{6}) = 1 - \frac{\sqrt{3}}{2} \approx 0.133975 > 0$, $1 - \cos^2\frac{\pi}{6} = \frac{1}{4} = 0.2500 > 0$, and $\det G(\frac{\pi}{6}) = \frac{1}{16} = 0.0625 > 0$. Associating odd holonomy cancellation with gauge screening and separate-cell sagitta addition with unscreened gravitational sources belongs to this book's cross-level physical interpretation (`MODEL`).
:::

## 34.24.2 Composition-Rule Bifurcation and Four Dynamical Countermodel Checks {#sec-ch34-24-2}

Because $d(\epsilon) = 2\sin^2(\epsilon/2) > 0$ and $\det G(\epsilon) = \sin^4\epsilon > 0$ never turn negative on an elementary cell, could one claim that local kinematic positivity alone already derives universal $1/r$ Newtonian or Einsteinian attraction without further assumptions? **Certainly not** (cf. [Appendix E §E.4](appendix-e-s04-metric-and-gram-curvature.md#sec-appe-geometry), [§E.6](appendix-e-s06-spacetime-gauge-and-thermodynamics.md#sec-appe-spacetime), and [§E.7](appendix-e-s07-intermediate-hypotheses-audit.md#sec-appe-audit-table)). Non-negativity of a local scalar defect is at most a kinematic prerequisite for positive source strength; conflating composition rules or omitting propagator and relativistic-stress inputs immediately fails against four explicit countermodels:

::: {.example #ex-ch34-orientation-and-composition-countermodels title="Four Countermodels Separating Kinematic Sagitta Positivity from Gravitational Dynamics"}
**Manual derivation.** Each calculation below isolates an indispensable physical bridge separating local sagitta positivity $d(\epsilon) \ge 0$ from macroscopic gravitational dynamics:

1. **Countermodel (i) Separate-cell extensive source addition versus sequential single-state gate cancellation, electric multipole fields, and non-Abelian $\mathrm{SU}(3)_c$ singlet confinement**:
   - *Two distinct composition laws*: Place opposite orientations $(\sigma_1, \sigma_2) = (+1, -1)$ at step $\epsilon > 0$ on **two spatially separate, independent cells** $\mathcal{C}_1, \mathcal{C}_2$. Summing extensive local source densities cancels the odd charges, $q_+(\epsilon) + q_-(\epsilon) = 0$ and $\operatorname{Im} B_+(\epsilon) + \operatorname{Im} B_-(\epsilon) = 0$, while adding the orientation-even sagittas to a strictly positive total:

     $$
     d_{\mathrm{sep}}(\epsilon, -\epsilon) \;=\; d(\epsilon) + d(-\epsilon) \;=\; 2(1 - \cos\epsilon) \;=\; 4\sin^2\frac{\epsilon}{2} \;>\; 0.
     $$

     By contrast, **sequentially composing inverse unitary gates on a single quantum state**, $\hat{U}(\epsilon) = \exp(-\frac{\epsilon}{2}\mathbf{e}_1\mathbf{e}_2)$ followed immediately by $\hat{U}(-\epsilon) = \exp(+\frac{\epsilon}{2}\mathbf{e}_1\mathbf{e}_2)$, yields $\hat{U}(-\epsilon)\hat{U}(\epsilon) = \mathbf{1}$ with zero net rotation angle and zero net sagitta:

     $$
     d_{\mathrm{seq}}(\epsilon, -\epsilon) \;=\; d(0) \;=\; 1 - \cos 0 \;=\; 0!
     $$

     Hence "sagittas do not cancel" holds **only** under extensive source addition across separate cells (or decohered histories), never under coherent inverse rotor multiplication on one state.
   - *Multipole remnants and non-Abelian singlet structure*: Even in Abelian electrostatics, charges $+q$ and $-q$ separated by $\mathbf{s} \neq \mathbf{0}$ cancel only the $O(r^{-2})$ monopole flux while leaving a dipole $\mathbf{p} = q\mathbf{s}$ with an $O(r^{-3})$ electric field and positive electrostatic self-energy; and in non-Abelian $\mathrm{SU}(3)_c$ chromodynamics ([§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave)), macroscopic color neutrality is not scalar $\pm$ cancellation at all, but tensor-product singlet projection (mesons $\mathbf{3}\otimes\bar{\mathbf{3}} = \mathbf{1}\oplus\mathbf{8}$ and baryons $\mathbf{3}\otimes\mathbf{3}\otimes\mathbf{3} = \mathbf{1}\oplus\mathbf{8}\oplus\mathbf{8}\oplus\mathbf{10}$) enforced by infrared color confinement ([§34.14](ch34-s14-lorentz-and-standard-model-octave.md#sec-ch34-lorentz-pseudoscalar-and-sm-octave) [@ex-ch34-lorentz-budget-and-sm-octave-benchmark])!

2. **Countermodel (ii) Double underdetermination of interaction sign and range in the Yukawa family $U_{\sigma,\mu}(r)$**:
   For two localized cells carrying strictly positive sagitta charges $d_1, d_2 > 0$ ($d_1 = d_2 = d(\epsilon) > 0$ at equal step), consider the two-parameter family of static central potentials ($\kappa > 0$):

   $$
   U_{\sigma,\mu}(r) \;=\; \sigma\,\kappa\,d_1 d_2\,\frac{e^{-\mu r}}{r}, \qquad \sigma \in \{+1, -1\}, \quad \mu \ge 0,
   $$

   reducing at equal step $d_1 = d_2 = d > 0$ to $U_{\sigma,\mu}(r) = \sigma\kappa d^2 e^{-\mu r}/r$. Strict positivity $d^2 > 0$ ensures only that all positive sources share a **uniform overall sign**, while leaving both dynamical parameters completely undetermined: (a) it **does not select attraction $\sigma = -1$**—in relativistic field theory, exchanging a spin-$1$ vector boson between identical positive charges produces universal **repulsion** ($\sigma = +1$), whereas universal **attraction** ($\sigma = -1$) requires even-spin (spin-$0$ scalar or spin-$2$ tensor) exchange; and (b) it **does not select masslessness $\mu = 0$**—any nonzero mass gap $\mu > 0$ (as for electroweak $W^\pm/Z^0$ bosons or nuclear $\pi$ mesons in [§34.16](ch34-s16-coset-breaking-and-conservation.md#sec-ch34-coset-breaking-conservation-towers) [@ex-ch34-ccwz-electroweak-skyrmion-meissner-benchmark]) exponentially screens the force to zero at astronomical distances $r \gg \mu^{-1}$ despite $d > 0$!

3. **Countermodel (iii) Both positive and negative Regge hinge deficits from regular Euclidean tetrahedra**:
   Does positive Girard excess $\Omega(\epsilon) > 0$ on a single spherical cap force every multi-cell simplicial geometry to carry positive curvature? A regular Euclidean tetrahedron in $\mathbb{R}^3$ has exact dihedral angle

   $$
   \theta_{\mathrm{tet}} \;=\; \arccos\!\left(\frac{1}{3}\right) \;\approx\; 1.230959\;\mathrm{rad} \;\approx\; 70.5288^\circ.
   $$

   Gluing $m$ congruent flat tetrahedra around a shared interior edge hinge yields the Regge deficit angle $\delta_m := 2\pi - m\,\theta_{\mathrm{tet}}$, which flips sign with coordination number $m$:
   - At valence $m = 5$: $\delta_5 = 2\pi - 5\arccos(1/3) \approx 6.283185 - 6.154797 = +0.128388\;\mathrm{rad} > 0$ (positive elliptic deficit, locally converging geodesics);
   - At valence $m = 6$: $\delta_6 = 2\pi - 6\arccos(1/3) \approx 6.283185 - 7.385756 = -1.102571\;\mathrm{rad} < 0$ (negative hyperbolic excess, locally diverging geodesics)!

   Multi-cell Regge curvature is therefore intrinsically **signed**; single-cell Gram positivity $\det G > 0$ never forces positive macroscopic curvature.

4. **Countermodel (iv) Negative-pressure cosmic acceleration in FLRW general relativity**:
   In $3+1\mathrm{D}$ general relativity, the second Friedmann (Raychaudhuri) acceleration equation for a homogeneous isotropic scale factor $a(t)$ reads

   $$
   \frac{\ddot{a}}{a} \;=\; -\frac{4\pi G}{3}\!\left(\rho + \frac{3p}{c^2}\right).
   $$

   Even with strictly positive energy density $\rho > 0$, a vacuum dark-energy equation of state $p = -\rho c^2$ yields $\rho + 3p/c^2 = -2\rho < 0$ and hence $\ddot{a}/a = +\frac{8\pi G}{3}\rho > 0$ (**accelerated cosmic expansion / effective repulsion**)! In Lorentzian spacetime, geodesic convergence is governed not by a rest-frame scalar density $\rho > 0$ alone, but by trace combinations of the full relativistic stress-energy tensor $T_{\mu\nu}$.
:::

## 34.24.3 Spin-2 Universal Attraction, the Species-Dependent Hierarchy Table, and the Open Dynamical Boundary {#sec-ch34-24-3}

Together, these four countermodels draw a razor-sharp boundary around what $\Delta\mathcal{T}_\epsilon$ proves and what remains external dynamics: kinematically, comparison geometry genuinely splits odd traversal holonomies from even quadratic sagittas and quartic Gram volumes; dynamically, bridging from that kinematic split to real-world gravity requires **Lorentzian massless spin-$2$ dynamics** coupled with **Standard Model mass generation**.

::: {.remark #rem-ch34-spin2-and-species-hierarchy title="Massless Spin-2 Universal Coupling Theorems, Horizon Thermodynamics, and the Species-Dependent Force-Ratio Table"}
**Literature result, not formalized in this book (with CODATA numerical benchmarks `NUM`).** Extending the even-sagitta analogy toward relativistic gravity must respect established theorems of quantum field theory and empirical force-ratio benchmarks:

1. **Weinberg soft theorems, Deser self-interaction, the Weinberg–Witten obstruction, Regge calculus, and Jacobson's horizon equation of state**:
   - *Spin-$1$ charge conservation versus spin-$2$ equivalence and attraction*: S. Weinberg (*Phys. Rev.* **135**, B1049, 1964, DOI `10.1103/PhysRev.135.B1049`) proved from Lorentz invariance and soft-pole gauge invariance of massless S-matrix elements that helicity-$\pm 1$ soft photons enforce global charge conservation $\sum_a q_a = 0$ (permitting opposite charges and screening), whereas helicity-$\pm 2$ massless soft gravitons must couple with **one universal constant $\kappa$** to every particle's four-momentum $p^\mu$ (deriving the equivalence principle with $\mu = 0$), while symmetric rank-$2$ tensor exchange between positive-energy states yields static attraction $\sigma = -1$; S. Deser (*Gen. Relativ. Gravit.* **1**, 9, 1970) showed that consistent self-coupling of a massless spin-$2$ field sums uniquely into the nonlinear Einstein–Hilbert action.
   - *Obstruction to flat-background composite gravitons*: S. Weinberg and E. Witten (*Phys. Lett. B* **96**, 59, 1980) proved that no $3+1\mathrm{D}$ Poincaré-covariant field theory possessing a Lorentz-covariant conserved stress-energy tensor $T^{\mu\nu}$ admits massless elementary or composite particles of helicity $\lvert h\rvert > 1$ with non-vanishing graviton matrix elements—ruling out naive models of a composite graviton propagating on a fixed flat Minkowski background unless diffeomorphism-invariant spacetime geometry itself emerges collectively.
   - *Simplicial Regge action and local causal-horizon thermodynamics*: T. Regge (*Nuovo Cimento* **19**, 558, 1961) formulated coordinate-free simplicial gravity via $S_{\mathrm{Regge}} = \frac{c^3}{8\pi G}\sum_h A_h \delta_h$ over codimension-$2$ hinges; T. Jacobson (*Phys. Rev. Lett.* **75**, 1260, 1995, DOI `10.1103/PhysRevLett.75.1260`) derived Einstein's equation $R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}$ (with $G = \frac{c^3}{4\hbar\eta}$) as a local thermodynamic equation of state $\delta Q = T\,dS$ across Rindler causal horizons assuming area-proportional entanglement entropy $\delta S = \eta\,\delta\mathcal{A}$.
2. **Species-dependent gravitational-to-electrostatic force ratios (`NUM`)**:
   For any pair of particles carrying unit elementary charge magnitude $\lvert q_1\rvert = \lvert q_2\rvert = e$ and rest masses $m_1, m_2$, the ratio of Newtonian attraction to Coulomb repulsion at common separation $r$ is distance-independent and equals

   $$
   \left\lvert\frac{F_G}{F_E}\right\rvert \;=\; \frac{G\,m_1 m_2}{e^2 / (4\pi\varepsilon_0)} \;=\; \frac{G\,m_1 m_2}{\alpha(0)\,\hbar c} \;=\; \frac{m_1 m_2}{\alpha(0)\,m_{\mathrm{Pl}}^2},
   $$

   where the CODATA 2022 zero-momentum fine-structure constant is $\alpha(0)^{-1} \approx 137.035999$ ($\alpha(0) \approx 7.297353\times 10^{-3}$), the Planck mass is $m_{\mathrm{Pl}} = \sqrt{\hbar c / G} \approx 1.220890\times 10^{19}\;\mathrm{GeV}/c^2$, the electron mass is $m_e \approx 0.510999\;\mathrm{MeV}/c^2$, and the proton mass is $m_p \approx 938.272089\;\mathrm{MeV}/c^2$ ($m_p / m_e \approx 1836.15267$). Evaluating across the three fundamental charged pairs (CODATA 2022) gives:

| Charged-Particle Pair | Electrostatic Baseline | Origin of Mass Product $m_1 m_2$ | Force Ratio $\lvert F_G / F_E\rvert = G m_1 m_2 / (\alpha(0)\hbar c)$ | Ratio Relative to $e\text{--}e$ |
| :--- | :---: | :--- | :---: | :---: |
| **Electron–electron ($e\text{--}e$)** | $\alpha(0)\hbar c$ | Electroweak Higgs–electron Yukawa coupling $y_e^2 v^2 / 2$ | $2.40 \times 10^{-43}$ | $1$ |
| **Electron–proton ($e\text{--}p$)** | $\alpha(0)\hbar c$ | Electroweak lepton Yukawa mass $\times$ non-perturbative QCD hadron binding | $4.41 \times 10^{-40}$ | $m_p / m_e \approx 1.84 \times 10^3$ |
| **Proton–proton ($p\text{--}p$)** | $\alpha(0)\hbar c$ | Nearly $99\%$ from $\mathrm{SU}(3)_c$ gluon energy and quark trace anomaly $\Lambda_{\mathrm{QCD}}^2$ | $8.09 \times 10^{-37}$ | $(m_p / m_e)^2 \approx 3.37 \times 10^6$ |

   This table rules out any attempt to extract the gravitational hierarchy from a single species-blind geometric ratio $d(\epsilon_*)/\sin\epsilon_* = \tan(\epsilon_*/2)$ at one universal step angle $\epsilon_*$: all three pairs carry **identical charge magnitude $e$**, yet $\lvert F_G / F_E\rvert$ jumps by a factor of **$3.37 \times 10^6$** because $m_e$ is set by an electroweak Yukawa eigenvalue whereas $m_p$ is generated dynamically by $\Lambda_{\mathrm{QCD}}$! Without deriving both the Planck scale $m_{\mathrm{Pl}}$ and Standard Model mass generation, kinematic cell angles alone cannot fix these ratios.
:::

We record the resulting bridge from discrete comparison geometry to relativistic gravitation as an explicit open problem:

::: {.problem #prob-ch34-gravity-dynamics-and-coupling title="Deriving 4D Lorentzian Spin-2 Gravitational Dynamics and Newton's Constant from Discrete Comparison Geometry"}
Under bridge hypotheses `H8` and `H9` of [Appendix E](appendix-e-s07-intermediate-hypotheses-audit.md#sec-appe-audit-table), without presupposing a smooth four-dimensional pseudo-Riemannian manifold or the Einstein–Hilbert action, can one derive from discrete comparison complexes, unital record-pinching entropy ([§E.6](appendix-e-s06-spacetime-gauge-and-thermodynamics.md#sec-appe-spacetime)), and local causal horizons:

1. **Lorentzian massless spin-$2$ effective dynamics evading Weinberg–Witten**: Show that a multi-cell comparison network admits a diffeomorphism-covariant $3+1\mathrm{D}$ Lorentzian continuum limit propagating massless helicity-$\pm 2$ modes consistently with the Weinberg–Witten theorem, thereby deriving both masslessness ($\mu = 0$) and static attraction ($\sigma = -1$) dynamically;
2. **Universal coupling to the full relativistic stress-energy tensor $T_{\mu\nu}$**: Establish the variational coupling between discrete matter excitations and hinge deficits or horizon entropy flux so that the gravitational source converges to the full conserved tensor $T_{\mu\nu}$, including relativistic pressure and shear stresses;
3. **First-principles normalization of $G_N$ (the Planck scale $m_{\mathrm{Pl}}$)**: Determine $G_N = \hbar c / m_{\mathrm{Pl}}^2$ quantitatively in terms of microscopic comparison-step or horizon entanglement-density invariants, and connect it to electroweak and QCD mass scales to account for the hierarchy $\lvert F_G / F_E\rvert \sim 10^{-43}\text{–}10^{-37}$?
:::

The final column of our force-ratio table points straight to the heart of particle physics: since gravitational-to-gauge force ratios depend directly on fermion masses and running couplings, do the discrete integers **`3`** and **`6`** appearing across this monograph actually select three fermion generations, and where does first-principles geometry stop before the ~20 continuous parameters of the Standard Model? We turn to that audit in the closing section of Chapter 34's six-section epistemic stress-test corridor, [§34.25](ch34-s25-generations-and-quantitative-boundary.md#sec-ch34-generations-and-quantitative-boundary).
