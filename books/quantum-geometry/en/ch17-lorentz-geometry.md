# Geometric Demystification of Special Relativity: Hyperbolic Rotors, Null Light Cones, and Spacetime Area

> *"My intuition is that a line is classical time, and area is quantum time."*

Across the four chapters of [Part I](ch01-measurement.md), we stripped away the algebraic fog of two-component complex column vectors (four real amplitude coordinates) and restored a single qubit to an honest real unit arrow on the two-sphere $S^2 \subset \mathbb{R}^3$: pairwise measurement needs no external third point $C$ ([Chapter 2](ch02-born-rule.md)), idempotent projection $P^2 = P$ slices the continuous sphere into discrete lines of existence and sequential record ticks ([Chapter 3](ch03-projectors-and-duality.md)), and tracing out environmental degrees of freedom projects a unit spear in the joint space into a shortened cosine chord inside the local ball ([Chapter 4](ch04-decoherence.md)).

Stepping into Part V, "The Spacetime Sphere," we confront a deeper geometric question. In the two-dimensional Euclidean plane $(x, y)$, rotating the coordinate axes preserves the two-dimensional sum of squares $\Delta x^2 + \Delta y^2$ around a closed circle (just as arbitrary spatial rotations in three-dimensional Euclidean space $\mathbb{R}^3$ preserve the three-dimensional norm $\Delta x^2 + \Delta y^2 + \Delta z^2$ on a sphere). Why, the moment time $t$ and space $x$ are measured together in a two-dimensional Minkowski spacetime plane $(t, x)$ — or in $(1+3)$-dimensional Minkowski spacetime $(t, x, y, z)$ — does the frame-invariant quantity switch from an additive sum of squares $t^2 + x^2$ to a subtractive quadratic form $t^2 - x^2$ (or $t^2 - \norm{w}^2$ in $1+d$ dimensions) carrying a minus sign? The opening epigraph records the author's intuitive starting point: a sequential worldline readout leaves a one-dimensional "line of classical time," whereas a two-dimensional bivector plane spanned by two directions carries the "area" of phase and frame tilting. To anchor this physical intuition on rigorous mathematical ground, this chapter separates Lean-verified hyperbolic identities and null-cone quadratic-form rigidity theorems from the spacetime Clifford-rotor formalism in the physics literature and the operational conventions required to calibrate physical scales.

::: {.figure src="ch17-overview"}
**Figure 17.** A map of the chapter. Panel I: one event $(t, x) = (5, 3)$, when rotated, runs along the magenta circle $t^2 + x^2 = 34$ and leaves the white dashed light cone; when boosted, it runs along the cyan hyperbola $t^2 - x^2 = 16$, hugging the cone without ever crossing it. Panel II: the two amber axes $t'$ and $x'$ of the frame moving at $\beta = 3/5$ close toward the white light cone like scissors, while the cone itself stays put. Panel III: from $O$ to $P = (10, 0)$, the thick white worldline at rest carries $10$ ticks, while the cyan worldline that turns at $A = (5, 3)$ carries only $4$ per leg, $8$ in all. The figure uses $c = 1$; in physical units each segment's proper time is $\Delta\tau_{\mathrm{phys}} = \sqrt{q(\Delta v)}/c$.
:::

## Circles and hyperbolas: distinguish the metrics {#sec-euclidean-and-hyperbolic}

Why do students encountering Lorentz transformations for the first time often feel that the ubiquitous square-root factor $\gamma = 1/\sqrt{1 - \beta^2}$ is an ad hoc algebraic patch? Because habit reaches for a Euclidean compass built for a positive-definite metric ($++\dots+$) to measure a Minkowski stage governed by an indefinite signature ($+-\dots-$).

Lay planar Euclidean geometry and two-dimensional spacetime geometry side by side:

- **Euclidean plane (signature $+,+$)**: The locus of points at fixed squared distance $x^2 + y^2 = R^2$ from the origin is a **closed circle**. Rotating the coordinate axes by an angle $\theta \in \mathbb{R}$ mixes coordinates via $(x, y) \mapsto (x\cos\theta - y\sin\theta,\, x\sin\theta + y\cos\theta)$, resting on the circular identity $\cos^2\theta + \sin^2\theta = 1$.
- **Minkowski plane (signature $+,-$)**: The locus of events at fixed squared spacetime interval $t^2 - x^2 = \tau^2$ is no longer a closed circle, but an open **hyperbola** extending to infinity. Boosting an inertial frame along the spatial axis by a **rapidity** parameter $r \in \mathbb{R}$ tilts time and space axes symmetrically like a pair of scissors, resting on the difference-of-squares identity for hyperbolic cosine and hyperbolic sine.

::: {.viz src="rapidity-lightcone" preset="circle" height="500"}
**A turn runs on a circle, a boost on a hyperbola.** One event $v = (5, 3)$: the magenta point is turned and runs along the magenta circle $t^2 + x^2 = 34$, soon crossing the white light cone; the cyan point is boosted and runs along the cyan hyperbola $t^2 - x^2 = 16$, hugging the cone but never crossing it ([@thm-hyperbolic-norm]).
:::

Before writing down any spacetime coordinate transformation, let us verify in the Lean module `BogoliubovNormConservation` the exact real-analytic identity that underpins both Lorentz boosts and Bogoliubov squeezing transformations.

::: {.theorem #thm-hyperbolic-norm title="Real hyperbolic norm" lean="D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation"}
For every real number $r \in \mathbb{R}$, the hyperbolic cosine $\cosh r$ and hyperbolic sine $\sinh r$ satisfy

$$
|\cosh r|^2 - |\sinh r|^2 = 1.
$$
:::

::: proof
For any real number $x \in \mathbb{R}$, the squared absolute value equals the ordinary square ($|x|^2 = x^2$), so the left-hand side reduces to $(\cosh r)^2 - (\sinh r)^2$. Substituting $\cosh r = \frac{e^r + e^{-r}}{2}$ and $\sinh r = \frac{e^r - e^{-r}}{2}$ gives

$$
(\cosh r)^2 - (\sinh r)^2 = \frac{e^{2r} + 2 + e^{-2r}}{4} - \frac{e^{2r} - 2 + e^{-2r}}{4} = 1.
$$

The Lean declaration [`bogoliubov_norm_conservation`](lean:D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation) rewrites both absolute squares via `sq_abs` and applies `Real.cosh_sq_sub_sinh_sq`. The full proof is checked by the Lean kernel.
:::

In keeping with our three-tier epistemological contract, note the exact scope of [@thm-hyperbolic-norm]: the statement retains the absolute-value bars $|\cosh r|^2 - |\sinh r|^2 = 1$ from the Lean source (matching the modulus-squared norm interface used in Bogoliubov transformations, which is equivalent on $\mathbb{R}$ to $\cosh^2 r - \sinh^2 r = 1$), and is purely a real hyperbolic identity. By itself, it does not assert the physical postulate of invariant light speed, dynamical equations of motion, or spinor double-cover topology.

Once [@thm-hyperbolic-norm] is in hand, however, the square roots of special relativity dissolve into clean rational arithmetic. Let us work through an exact rational-ratio example by hand.

::: {.figure src="ch17-unit-hyperbola"}
**$\eta = \ln 2$ lands on a rational point of the unit hyperbola.** On the cyan unit hyperbola $t^2 - x^2 = 1$, the amber point is $(t, x) = (\cosh\eta, \sinh\eta) = (5/4, 3/4)$: its two dashed legs are $5/4$ and $3/4$ long, and their squares differ by exactly $1$ ([@thm-hyperbolic-norm]). The amber ray from the origin through it moves $3$ across for every $5$ up, so $\beta = 3/5$. The white dashed lines are the light cone.
:::

::: {.example #ex-rapidity-three-fifths title="Explicit Hyperbolic Boost at Rapidity η = ln 2 and β = 3/5"}
In natural units $c = 1$, choose rapidity $\eta = \ln 2$. Since $e^\eta = 2$ and $e^{-\eta} = \frac{1}{2}$, the hyperbolic functions, dimensionless velocity $\beta$, and Lorentz factor $\gamma$ evaluate to exact rational fractions:

$$
\cosh\eta = \frac{2 + 1/2}{2} = \frac{5}{4}, \qquad
\sinh\eta = \frac{2 - 1/2}{2} = \frac{3}{4}, \qquad
\beta = \tanh\eta = \frac{\sinh\eta}{\cosh\eta} = \frac{3}{5}, \qquad
\gamma = \cosh\eta = \frac{5}{4}.
$$

First check [@thm-hyperbolic-norm]:

$$
|\cosh\eta|^2 - |\sinh\eta|^2 = \left(\frac{5}{4}\right)^2 - \left(\frac{3}{4}\right)^2 = \frac{25 - 9}{16} = \frac{16}{16} = 1.
$$

Now write down the boost matrix $B$ for a frame moving in the positive spatial direction at velocity $\beta = 3/5$, and apply it to the timelike event $v = (5, 3)^\top$:

$$
B = \begin{pmatrix} \cosh\eta & -\sinh\eta \\ -\sinh\eta & \cosh\eta \end{pmatrix} = \begin{pmatrix} 5/4 & -3/4 \\ -3/4 & 5/4 \end{pmatrix}, \qquad
Bv = \begin{pmatrix} 5/4 & -3/4 \\ -3/4 & 5/4 \end{pmatrix}\begin{pmatrix} 5 \\ 3 \end{pmatrix} = \begin{pmatrix} 16/4 \\ 0 \end{pmatrix} = \begin{pmatrix} 4 \\ 0 \end{pmatrix}.
$$

In the original laboratory coordinates, the Minkowski quadratic form on $v = (5, 3)^\top$ is $t^2 - x^2 = 5^2 - 3^2 = 25 - 9 = 16$. In the boosted coordinates $(4, 0)^\top$, the spatial displacement vanishes and the interval reduces to the squared proper time $\tau^2 = 4^2 - 0^2 = 16$, giving $\tau = 4$ directly.

One sometimes sees the auxiliary trigonometric parameterization $\sin\theta = \beta = 3/5$, which gives $\cos\theta = \sqrt{1 - \beta^2} = 1/\gamma = 4/5$. Keep in mind that this is merely a convenient algebraic reparameterization of a bounded velocity $|\beta| < 1$; it must never be mistaken for identifying a Minkowski hyperbolic boost (preserving $t^2 - x^2$) with a Euclidean circular rotation (preserving $t^2 + x^2$).
:::

::: {.viz src="rapidity-lightcone" preset="boost" height="500"}
**η = ln 2 takes (5, 3) to (4, 0).** The two amber axes are the $t'$ and $x'$ axes of a traveller moving with rapidity $\eta$; they close toward the light cone like scissors, and the grey dashed lines are the original $t$ and $x$ axes. At $\eta = \ln 2$ ($\beta = 3/5$) the $t'$ axis runs right through the original event $v = (5, 3)$ in the grey ring. The amber point $Bv$ is $v$ read in the traveller's coordinates: it slides along the cyan hyperbola $\tau = 4$ to $(4, 0)$ on the time axis, where $\cosh\eta = 5/4$ and $\sinh\eta = 3/4$.
:::

## Null light cones and spatial restrictions {#sec-null-cone-rigidity}

In [@ex-rapidity-three-fifths] we took the quadratic form $t^2 - x^2$ as given. Yet from a foundational standpoint we should ask: why must the spacetime interval take the form $t^2 - \norm{w}^2$? If nature specifies only *which displacements lie on the null light cone*, how much of the spacetime quadratic form is already locked in place?

In the Lean module `MinkowskiNullConeRigidity`, $(1 + d)$-dimensional real spacetime is modeled as the product vector space

$$
\operatorname{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d),
$$

consisting of one real time coordinate $t \in \mathbb{R}$ and $d$ Euclidean spatial coordinates $w \in \mathbb{R}^d$ (for any natural number $d \in \mathbb{N}$, including $d = 0$). The standard Minkowski quadratic form `minkowski` has signature $(1, d)$, positive on the unit time axis $e_0 = (1, 0)$:

$$
\operatorname{minkowski}_d(t, w) = t^2 - \norm{w}^2.
$$

::: {.figure src="ch17-interval-signs"}
**The light cone splits the plane into inside and outside.** Take $d = 1$: in the pale cyan wedges inside the cone, $q = \operatorname{minkowski}_1(t, x) = t^2 - x^2 > 0$; in the pale magenta wedges outside it, $q < 0$; on the white light lines, $q = 0$. The three arrows, read as $(t, x)$: cyan $(2, 1)$ gives $3$, magenta $(1, 2)$ gives $-3$, and white $(1.5, 1.5)$ along the cone gives $0$.
:::

For any real quadratic form $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$, Mathlib defines its associated polarization bilinear map (`QuadraticMap.polar`) without a factor of $\frac{1}{2}$:

$$
\operatorname{polar}_S(x, y) = S(x + y) - S(x) - S(y).
$$

Our next lemma establishes a striking rigidity property: whenever a real quadratic form $S$ vanishes everywhere on the Minkowski null cone $\{v \mid \operatorname{minkowski}_d(v) = 0\}$, its time-space cross polarization $\operatorname{polar}_S((1, 0), (0, w))$ is forced to vanish, and its spatial restriction $S(0, w)$ is uniquely determined by its single time-axis value $S(1, 0)$ and the squared Euclidean norm $-\norm{w}^2$.

::: {.lemma #lemma-null-cone-spatial title="Null-cone spatial rigidity" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity"}
Let $d \in \mathbb{N}$ be any natural number (including $d = 0$), and let $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$ be a real quadratic form on $\operatorname{Space}(d) = \mathbb{R} \times \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$. If for every spacetime vector $v \in \operatorname{Space}(d)$,

$$
\operatorname{minkowski}_d(v) = 0 \implies S(v) = 0,
$$

then for every spatial vector $w \in \operatorname{EuclideanSpace}\;\mathbb{R}\;(\operatorname{Fin} d)$, both identities hold simultaneously:

$$
S(0, w) = -S(1, 0)\norm{w}^2 \qquad\text{and}\qquad \operatorname{polar}_S\bigl((1, 0),\, (0, w)\bigr) = 0.
$$
:::

::: proof
Fix any spatial vector $w \in \mathbb{R}^d$, and form the future- and past-directed null vectors $v_+ = (\norm{w}, w)$ and $v_- = (-\norm{w}, w)$. Evaluating the Minkowski quadratic form gives

$$
\operatorname{minkowski}_d(\pm\norm{w}, w) = (\pm\norm{w})^2 - \norm{w}^2 = 0.
$$

By the null-cone hypothesis `hnull`, we have $S(v_+) = 0$ and $S(v_-) = 0$. Writing $v_{\pm} = (\pm\norm{w})(1, 0) + (0, w)$ and expanding $S(ax + y) = a^2 S(x) + S(y) + a\operatorname{polar}_S(x, y)$ yields the two equations

$$
\begin{aligned}
\norm{w}^2 S(1, 0) + S(0, w) + \norm{w}\operatorname{polar}_S\bigl((1, 0), (0, w)\bigr) &= 0, \\
\norm{w}^2 S(1, 0) + S(0, w) - \norm{w}\operatorname{polar}_S\bigl((1, 0), (0, w)\bigr) &= 0.
\end{aligned}
$$

Half their sum gives $S(0, w) = -S(1, 0)\norm{w}^2$, while their difference gives $2\norm{w}\operatorname{polar}_S((1, 0), (0, w)) = 0$. If $\norm{w} \neq 0$, cancelling $2\norm{w}$ yields $\operatorname{polar}_S((1, 0), (0, w)) = 0$; if $\norm{w} = 0$, then $w = 0$ and the polarization map vanishes at zero automatically. The full proof is checked by the Lean kernel.
:::

Notice the geometric mechanism inside the proof of [@lemma-null-cone-spatial]: why does vanishing on the null cone control purely spatial displacements $(0, w)$? Because lifting any spatial displacement $w$ by an equal forward or backward light-travel time $\pm\norm{w}$ lands directly on the future and past null rays $(\pm\norm{w}, w)$. Symmetrizing and antisymmetrizing across those two null rays acts as a two-sided caliper that clamps the time-space cross term $\operatorname{polar}_S((1, 0), (0, w))$ to zero and ties the spatial norm $-\norm{w}^2$ directly to the temporal scale $S(1, 0)$.

::: {.viz src="rapidity-lightcone" preset="caliper" height="500"}
**The null caliper.** Lift the amber spatial displacement $(0, w)$ by $|w|$ up and down, and the two white arrows $(\pm|w|, w)$ land exactly on the future and past light-cone lines, with $t^2 - x^2 = 0$; the diagonals of the dashed rhombus are $2(0, w)$ and $2|w|(1, 0)$ ([@lemma-null-cone-spatial]).
:::

## Lorentz transformations and scale normalization {#sec-lorentz-normalization}

With both the spatial restriction $S(0, w)$ and the cross polarization $\operatorname{polar}_S((1, 0), (0, w))$ pinned down by [@lemma-null-cone-spatial], the value of $S$ on any general spacetime vector $v = (t, w) = t(1, 0) + (0, w)$ has no remaining freedom except the overall scalar factor $S(1, 0)$.

::: {.proposition #prop-null-cone-rigidity title="Null-cone quadratic-form rigidity" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null"}
Let $d \in \mathbb{N}$ be any natural number, and let $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$ be a real quadratic form. If $\operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$ holds for all $v \in \operatorname{Space}(d)$, then as quadratic forms on $\operatorname{Space}(d)$,

$$
S = S(1, 0) \cdot \operatorname{minkowski}_d.
$$
:::

::: proof
Decompose any $v = (t, w) \in \operatorname{Space}(d)$ as $(t, w) = t(1, 0) + (0, w)$. Expanding $S$ via its polarization map and substituting both conclusions of [@lemma-null-cone-spatial] gives

$$
\begin{aligned}
S(t, w) &= S\bigl(t(1, 0) + (0, w)\bigr) \\
&= t^2 S(1, 0) + S(0, w) + t\operatorname{polar}_S\bigl((1, 0), (0, w)\bigr) \\
&= t^2 S(1, 0) - S(1, 0)\norm{w}^2 + t \cdot 0 \\
&= S(1, 0)\bigl(t^2 - \norm{w}^2\bigr) = S(1, 0)\operatorname{minkowski}_d(t, w).
\end{aligned}
$$

By extensionality of quadratic forms (`QuadraticForm.ext`), $S = S(1, 0) \cdot \operatorname{minkowski}_d$. The full proof is checked by the Lean kernel.
:::

When applying [@prop-null-cone-rigidity] to relativistic physics, two scope boundaries must be respected explicitly:

1. **Sign and magnitude of the scalar factor $S(1, 0)$**: [@prop-null-cone-rigidity] proves proportionality $S = S(1, 0)\cdot\operatorname{minkowski}_d$, where $S(1, 0) \in \mathbb{R}$ may be positive, zero, or negative (both $S = 0$ and $S = -\operatorname{minkowski}_d$ vanish on the null cone). Null-cone vanishing alone does not force $S(1, 0) = 1$ or $S(1, 0) > 0$, nor does the theorem encode inertial-frame axioms, spatial orientation, or time orientation.
2. **Separating null-cone preservation from scale normalization**: Given a linear transformation $B : \operatorname{Space}(d) \to \operatorname{Space}(d)$, define the pullback quadratic form $S(v) = \operatorname{minkowski}_d(Bv)$. If $B$ preserves the null cone ($\operatorname{minkowski}_d(v) = 0 \implies \operatorname{minkowski}_d(Bv) = 0$), [@prop-null-cone-rigidity] yields conformal proportionality:

$$
\operatorname{minkowski}_d(Bv) = \operatorname{minkowski}_d(Be_0)\cdot\operatorname{minkowski}_d(v).
$$

::: {.viz src="rapidity-lightcone" preset="cone" height="500"}
**The light cone stays put under a boost.** Sweep $\eta$ from $-0.6$ to $1$: the white beads only slide along the white cone, the right-hand string crowding toward the origin and the left-hand one spreading out, and none leaves the two lines; the faint hollow beads mark where they were at $\eta = -0.6$ and $\eta = 0$. The amber point runs along its cyan hyperbola.
:::

To conclude full Lorentz invariance $\operatorname{minkowski}_d(Bv) = \operatorname{minkowski}_d(v)$, one must **separately impose the scale normalization** $\operatorname{minkowski}_d(Be_0) = 1$ (physically corresponding to calibrating unit clock ticks on the boosted time axis $Be_0$ or matching transverse rods).

::: {.viz src="rapidity-lightcone" preset="scale" height="500"}
**Times k: the cone survives, the tick does not.** At $k = 1.5$ and $\eta = \ln 2$ the white beads are still on the cone, but the amber point drops off the cyan $\tau = 4$ onto the dashed cyan $\tau = 6$, and the unit tick on the $t'$ axis lands on the thin dashed cyan $\tau = 1.5$; the mismatch is exactly the factor $\operatorname{minkowski}_1(kBe_0) = k^2$ ([@prop-null-cone-rigidity]).
:::

> The null cone locks the shape of the metric up to scale; a unit clock tick fixes the single remaining factor $S(1, 0) = 1$.

::: {.remark #rem-lorentz-rotor-literature title="Hyperbolic Rotors and Spacetime Clifford Algebra (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In two-dimensional Minkowski spacetime $\mathbb{R}^{1,1}$, a rapidity parameter $\eta \in \mathbb{R}$ determines the dimensionless velocity $\beta = \tanh\eta$ (with $|\beta| < 1$) and Lorentz factor $\gamma = \cosh\eta = (1 - \beta^2)^{-1/2}$. In the spacetime Clifford algebra $\mathrm{Cl}(1, 1)$ generated by basis vectors $e_0^2 = +1$ and $e_1^2 = -1$ with $e_0 e_1 = -e_1 e_0$, the unit spacetime bivector (oriented spacetime area element) $B = e_0 \wedge e_1 = e_0 e_1$ squares to $+1$:

$$
B^2 = (e_0 e_1)(e_0 e_1) = -e_0^2 e_1^2 = +1,
$$

in sharp contrast to a Euclidean bivector, which squares to $-1$ and generates circular rotations $\cos(\theta/2) - I\sin(\theta/2)$. Because $B^2 = +1$, exponentiating the half-rapidity bivector area $-\eta B/2$ produces a hyperbolic rotor:

$$
R(\eta) = \exp\left(-\frac{\eta}{2} B\right) = \cosh\frac{\eta}{2} - B\sinh\frac{\eta}{2}, \qquad R(\eta)^{-1} = \cosh\frac{\eta}{2} + B\sinh\frac{\eta}{2}.
$$

Under the convention that a boost acts on spacetime vectors $v = t e_0 + x e_1$ via the two-sided sandwich product $v \mapsto R(\eta)^{-1} v R(\eta)$, the basis vectors anticommute with the bivector $B = e_0 e_1$:
$$
e_0 B = e_0(e_0 e_1) = e_0^2 e_1 = e_1 = -(e_0 e_1)e_0 = -B e_0, \qquad
e_1 B = e_1(e_0 e_1) = -e_0 e_1^2 = e_0 = -B e_1.
$$
Moving $R(\eta)^{-1} = \cosh(\eta/2) + B\sinh(\eta/2)$ past $e_0$ flips the sign on $B$ to give $R(\eta)^{-1} e_0 = e_0 R(\eta)$, while the hyperbolic double-angle identities $\cosh^2(\eta/2) + \sinh^2(\eta/2) = \cosh\eta$ and $2\sinh(\eta/2)\cosh(\eta/2) = \sinh\eta$ give $R(\eta)^2 = \cosh\eta - B\sinh\eta$. Keeping $e_0$ on the left of $R(\eta)^2$ then yields

$$
R(\eta)^{-1} e_0 R(\eta) = e_0 R(\eta)^2 = e_0(\cosh\eta - B\sinh\eta) = \cosh\eta\,e_0 - \sinh\eta\,(e_0 B) = \cosh\eta\,e_0 - \sinh\eta\,e_1
$$

(and similarly $R(\eta)^{-1} e_1 R(\eta) = e_1 R(\eta)^2 = e_1(\cosh\eta - B\sinh\eta) = \cosh\eta\,e_1 - \sinh\eta\,e_0$), reproducing the exact negative-sign boost matrix $\begin{pmatrix} \cosh\eta & -\sinh\eta \\ -\sinh\eta & \cosh\eta \end{pmatrix}$ used in [@ex-rapidity-three-fifths] (whose preservation of $t^2 - x^2$ follows from $\cosh^2\eta - \sinh^2\eta = 1$ in [@thm-hyperbolic-norm]).

Physically, one must also distinguish **timelike trajectories** ($\operatorname{minkowski}_d(\Delta v) > 0$) from **nonzero null rays** ($\operatorname{minkowski}_d(\Delta v) = 0$ with $\Delta w \neq 0$): in natural units $c = 1$ (or with $\Delta\tau_{\mathrm{phys}} = \sqrt{q(\Delta v)}/c$ when $t = c t_{\mathrm{phys}}$), every future-directed timelike displacement ($\Delta t > 0$ and $q(\Delta v) = \Delta t^2 - \norm{\Delta w}^2 > 0$) obeys the non-strict proper-time inequality
$$
\Delta\tau = \sqrt{q(\Delta v)} = \sqrt{\Delta t^2 - \norm{\Delta w}^2} \le \Delta t,
$$
with **strict inequality** $\Delta\tau < \Delta t$ (time dilation) whenever the spatial displacement is nonzero ($\Delta w \neq 0$, or $\Delta x \neq 0$ in $1+1$ dimensions) and **equality** $\Delta\tau = \Delta t$ along a rest worldline ($\Delta w = 0$). By contrast, a photon propagates along a nonzero null displacement $\Delta w \neq 0$ on the null cone $q(\Delta v) = 0$ (where $\Delta\tau = 0$, the singular limit $\eta \to \pm\infty$) and possesses no comoving inertial rest frame. See R. P. Feynman, R. B. Leighton & M. Sands, *The Feynman Lectures on Physics*, Vol. I, chs. 15–17 (Addison–Wesley, 1963); and D. Hestenes, *Space-Time Algebra* (Gordon and Breach, 1966).
:::

::: {.viz src="rapidity-lightcone" preset="light" height="500"}
**Along the cone, no proper time.** Drag the turning point $A$ to $(5, 5)$: both legs of the cyan path run along the edges of the white diamond with $t^2 - x^2 = 0$ and carry not a single tick, so $\tau = 0$; the thick white rest worldline carries all 10.
:::

## Worldline segments and proper time {#sec-proper-time-segments}

In axiomatic treatments of spacetime geometry, [@prop-null-cone-rigidity] is frequently packaged in existential form: any real quadratic form vanishing on the Minkowski null cone is a scalar multiple of $\operatorname{minkowski}_d$.

::: {.corollary #cor-null-cone-proportionality title="Existence of the scalar factor" lean="D5/S0/Certificates/MinkowskiNullConeRigidity.exists_smul_minkowski_of_null"}
Let $d \in \mathbb{N}$ be any natural number, and let $S : \operatorname{QuadraticForm}\;\mathbb{R}\;(\operatorname{Space}(d))$ be a real quadratic form. If $\operatorname{minkowski}_d(v) = 0 \implies S(v) = 0$ holds for all $v \in \operatorname{Space}(d)$, then there exists a real scalar $f \in \mathbb{R}$ such that

$$
S = f \cdot \operatorname{minkowski}_d.
$$
:::

::: proof
Providing the explicit witness $f = S(1, 0) \in \mathbb{R}$ and applying [@prop-null-cone-rigidity] ([`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)) immediately yields $S = f \cdot \operatorname{minkowski}_d$. The full proof is checked by the Lean kernel.
:::

As emphasized above, [@cor-null-cone-proportionality] is the existential formulation of [@prop-null-cone-rigidity]: it guarantees the existence of $f \in \mathbb{R}$ mathematically, while leaving the physical normalization $f = 1$ to operational clock calibration.

Once normalized ($f = 1$) in natural units $c = 1$ (or, in physical units with $t = c t_{\mathrm{phys}}$, dividing by $c$ via $\Delta\tau_{\mathrm{phys}} = \sqrt{q(\Delta v)}/c$ as noted in the bottom legend of the chapter figure), every future-directed causal displacement $\Delta v = (\Delta t, \Delta w)$ satisfying $\Delta t \ge 0$ and $q(\Delta v) = \operatorname{minkowski}_d(\Delta v) = \Delta t^2 - \norm{\Delta w}^2 \ge 0$ carries segment **proper time** (in $c = 1$ units)

$$
\Delta\tau(\Delta v) = \sqrt{\operatorname{minkowski}_d(\Delta v)} = \sqrt{\Delta t^2 - \norm{\Delta w}^2} \le \Delta t
$$

(with equality $\Delta\tau = \Delta t$ at rest $\Delta w = 0$, strict inequality $\Delta\tau < \Delta t$ when $\Delta w \neq 0$, and $\Delta\tau = 0$ on a strict null ray with $\Delta w \neq 0$ and $q(\Delta v) = 0$). Along a piecewise inertial worldline $\gamma = (\Delta v_1, \Delta v_2, \dots, \Delta v_m)$, total proper time in $c = 1$ units is the sum $\tau(\gamma) = \sum_{k=1}^m \sqrt{q(\Delta v_k)}$ (or $\tau_{\mathrm{phys}}(\gamma) = \sum_{k=1}^m \sqrt{q(\Delta v_k)}/c$ in physical clock units). A common pitfall is to confuse Lorentz invariance of each segment's quadratic form $q(\Delta v_k)$ with path independence of total proper time between fixed endpoints. The next concrete example resolves that confusion completely.

::: {.figure src="ch17-proper-time-budget"}
**For the same $\Delta t = 5$, the farther a segment travels in space, the less proper time it records.** The cyan curve $\Delta\tau = \sqrt{25 - \Delta x^2}$ stays everywhere below the white dashed line $\Delta t = 5$: at rest $\Delta\tau = \Delta t = 5$, the first leg $(5, 3)$ of the example gives $4$, and $(5, 5)$ along the light cone gives $0$. The curve is a quarter circle, $\Delta\tau^2 + \Delta x^2 = \Delta t^2$.
:::

::: {.example #ex-two-worldline-segments title="Proper-Time Comparison Between a Two-Segment Worldline and a Rest Worldline"}
In two-dimensional Minkowski spacetime $\operatorname{Space}(1) = \mathbb{R} \times \mathbb{R}$, compare two worldlines connecting the initial event $O = (0, 0)$ to the final event $P = (10, 0)$:

1. **Two-segment outbound-and-return worldline $\gamma_{\mathrm{bent}}$**: Composed of two future-directed timelike displacements — an outbound leg $\Delta v_1 = (5, 3)$ at velocity $\beta = 3/5$ to the turnaround event $A = (5, 3)$, followed by an inbound leg $\Delta v_2 = (5, -3)$ at velocity $\beta = -3/5$ back to $P = (5 + 5,\, 3 - 3) = (10, 0)$. On each segment, the Minkowski quadratic form and proper time are

$$
q(\Delta v_1) = 5^2 - 3^2 = 16 \implies \Delta\tau_1 = \sqrt{16} = 4, \qquad
q(\Delta v_2) = 5^2 - (-3)^2 = 16 \implies \Delta\tau_2 = \sqrt{16} = 4,
$$

giving total proper time $\tau(\gamma_{\mathrm{bent}}) = \Delta\tau_1 + \Delta\tau_2 = 4 + 4 = 8$.

2. **Single-segment rest worldline $\gamma_{\mathrm{rest}}$**: The straight displacement $\Delta v_{\mathrm{rest}} = \Delta v_1 + \Delta v_2 = (10, 0)$ between the same endpoints has

$$
q(\Delta v_{\mathrm{rest}}) = 10^2 - 0^2 = 100 \implies \tau(\gamma_{\mathrm{rest}}) = \sqrt{100} = 10.
$$

Although $q(\Delta v_1) = 16$, $q(\Delta v_2) = 16$, and $q(\Delta v_{\mathrm{rest}}) = 100$ are each frame-invariant Lorentz scalars, the functional $\Delta v \mapsto \sqrt{q(\Delta v)}$ is not linear over vector addition:

$$
\sqrt{q(\Delta v_1 + \Delta v_2)} = 10 > 4 + 4 = \sqrt{q(\Delta v_1)} + \sqrt{q(\Delta v_2)}.
$$

Segment-by-segment invariance of $q$ guarantees that every inertial frame computes $\tau(\gamma_{\mathrm{bent}}) = 8$ and $\tau(\gamma_{\mathrm{rest}}) = 10$, not that distinct worldlines sharing endpoints have equal proper time. Because spatial displacement enters $t^2 - \norm{\Delta w}^2$ with a minus sign, any spatial detour reduces total proper time. In the extreme null case $v_{\mathrm{null}} = (1, 1)$, $q(1, 1) = 1^2 - 1^2 = 0$ ($\Delta\tau = 0$), and a photon on the null cone admits no rest frame.
:::

::: {.viz src="rapidity-lightcone" preset="twins" height="500"}
**Bent 4 + 4 = 8, rest 10.** The turning point $A$ moves from $(5, 0)$ to $(5, 3)$: the ticks on the cyan path drop from 10 to 8 (4 per leg), while the thick white rest worldline keeps all 10; each tick of the outbound leg sits on one of the faint cyan hyperbolas centred at $O$.
:::

The example's remark that every inertial frame computes $8$ and $10$ can be seen directly: boost into the outbound traveller's frame and count the ticks again.

::: {.viz src="rapidity-lightcone" preset="frames" height="500"}
**Another frame, still 8 and 10.** Boost into the outbound traveller's frame ($\eta = \ln 2$): every event slides along the faint cyan hyperbolas, the outbound leg becomes the vertical $(4, 0)$ and the return leg $(8.5, -7.5)$; both worldlines lean over, yet not one tick is gained or lost.
:::

::: {.viz src="rapidity-lightcone" height="560"}
The full rapidity-and-light-cone lab: four scenes (compare, boost, caliper, worldlines) on one rail; the green boxes are reserved for the three Lean-verified results of this chapter ([@thm-hyperbolic-norm], [@lemma-null-cone-spatial], [@prop-null-cone-rigidity]).
:::

With the hyperbolic identity $|\cosh r|^2 - |\sinh r|^2 = 1$ ([@thm-hyperbolic-norm]) and the null-cone rigidity chain ([@lemma-null-cone-spatial], [@prop-null-cone-rigidity], and [@cor-null-cone-proportionality]) in place, the metric skeleton of special relativity is fully demystified.

::: {.film src="005-hyperbolic-rotation"}
**Hyperbolic rotation: the light cone stays, rapidities add (1 min 53 s).** The same event $(5, 3)$, turned, rides the magenta circle out through the light cone; boosted, it slides along the cyan hyperbola. A boost by $\eta = \ln 2$ has $\cosh\eta = 5/4$ and $\sinh\eta = 3/4$ ([@thm-hyperbolic-norm]) and carries it to $(4, 0)$. Then the white beads only slide along the light cone, and a scale $k = 3/2$ keeps the cone but moves $\tau = 4$ to $6$ ([@prop-null-cone-rigidity]); two boosts by $\ln 2$ multiply into one by $\ln 4$, the two magenta hyperbolic sectors each have area $\ln 2 / 2$, while the velocities compose to $15/17$ (for the velocity reading, see [@rem-lorentz-rotor-literature]); finally, in the outbound traveller's frame, the bent and resting worldlines still tick $8$ and $10$.
:::

In the next chapter ([Dirac Spinors and Gauge Fields](ch18-spinors-and-gauge-curvature.md)), we take the matrix square root of relativistic dispersion and trace how anticommuting Pauli operators and closed-loop phases on graphs give rise to spinor coupling and gauge holonomy.
