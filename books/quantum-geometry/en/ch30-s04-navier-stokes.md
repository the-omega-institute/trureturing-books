# 30.4 A Field Analogy Between Navier–Stokes and $P$ vs. $NP$ — Lamb Bivectors, 3D Vortex Stretching, and Arnold Geodesics {#sec-coda-navier-stokes-and-p-vs-np}

> **Author's original words**: "When both the Navier–Stokes problem and the $P$/$NP$ problem are cast into field form, they look strikingly alike."
> （“navier stokes与P/NP 问题, 都场化的话似乎很像”）

Placing **Navier–Stokes (NS) existence and smoothness** alongside **$P$ vs. $NP$** lets us compare global states, local observations, and quadratic feedback (`MODEL`). No map from fluid solutions to Boolean instances is supplied, nor any proof that such a map preserves evolution, solvability, or computational cost. This comparison supplies no mathematical isomorphism. A slender fluid core and a line drawn to represent witness checking do not identify the two problems; neither fluid blow-up nor failure of projected closure implies $P\neq NP$.

## 30.4.1 Clifford Separation of Inner-Product Potential Flow and Exterior Bivector Vorticity (`MODEL`) {#1-clifford-separation-of-inner-product-potential-flow-and-exterior-bivector-vorticity-model}

::: {.remark #rem-ch30-lamb-decomposition-literature title="Literature Note on the Incompressible Navier–Stokes Equations and Lamb's Convective Decomposition"}
**Literature result, not formalized in this book.** Both the continuum incompressible Navier–Stokes PDE system and H. Lamb's classical vector–bivector convective decomposition belong to the external mathematical-physics literature and are not formalized at the continuum PDE level in this book (the discrete 5-mode Fourier advection closure obstruction and 2D Fourier mild-path theorem verified in this book appear in [@thm-coda-quadratic-advection-no-closure] below): the incompressible Navier–Stokes equations read

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u} = -\nabla p + \nu \nabla^2 \mathbf{u}, \qquad \nabla\cdot\mathbf{u} = 0.
$$

Using the Clifford geometric derivative $\nabla \mathbf{u} = \nabla\cdot\mathbf{u} + \nabla\wedge\mathbf{u}$ splits the convective nonlinearity $(\mathbf{u}\cdot\nabla)\mathbf{u}$ into an inner-product kinetic gradient and an exterior-product vorticity bivector coupling (Lamb's classical decomposition; see also [@rem-ch30-navier-stokes-forced-literature]):

$$
(\mathbf{u}\cdot\nabla)\mathbf{u} = \underbrace{\frac{1}{2}\nabla(\|\mathbf{u}\|^2)}_{\substack{\text{Irrotational kinetic gradient} \\ \text{Absorbed directly into Bernoulli pressure } -\nabla(p + \frac{1}{2}\|\mathbf{u}\|^2)}} + \underbrace{\mathbf{u}\cdot(\nabla\wedge\mathbf{u})}_{\substack{\text{Bivector vortex coupling }(\boldsymbol{\omega}\times\mathbf{u}) \\ \text{Coupling of 1D streamline with 2D orthogonal vorticity area}}}.
$$

In classical continuum fluid mechanics, this separates two regimes: when the orthogonal exterior curl vanishes ($\nabla\wedge\mathbf{u} = 0$, irrotational potential flow), the convective nonlinearity collapses to a pure scalar potential gradient absorbed directly into Bernoulli pressure, reducing a divergence-free irrotational flow on a simply connected domain to a linear Laplace potential field $\mathbf{u} = -\nabla\Phi$; when the orthogonal exterior curl is nonzero ($\nabla\wedge\mathbf{u} \neq 0$, rotational flow), because the exterior derivative of a scalar gradient vanishes identically, scalar pressure gradients cannot cancel the exterior curl $\nabla\wedge\mathbf{u}$, coupling streamlines nonlinearly with orthogonal vorticity planes.
:::

Mapping the irrotational and rotational regimes recorded in [@rem-ch30-lamb-decomposition-literature] onto the geometric analogy (`MODEL`) of the preceding section — "$P$ as an irrotational guidance field, $NP$ as a thread in a rotational wilderness" — aligns the irrotational phase conceptually with a smooth global guidance field (analogous to a hydrodynamic $P$ state) and the rotational phase with multi-scale eddy entanglement.

::: {.viz src="navier-stokes-p-np" preset="vortex" height="500"}
**The two halves of the advection term.** Streamlines of the plane flow $\mathbf{u} = (1 - s)(x, -y) + s(-y, x)$ at $s = 0.8$, with vorticity $\omega = 2s = 1.6$. At the amber probe the white arrow is the advection term $(\mathbf{u}\cdot\nabla)\mathbf{u}$, the sum of the cyan gradient half $\nabla(\|\mathbf{u}\|^2/2)$ and the magenta Lamb half $\boldsymbol{\omega}\times\mathbf{u}$; turn $s$ back to $0$ (the irrotational stagnation flow) and the magenta arrow vanishes while the white arrow falls on the cyan one: the whole advection term is a gradient and joins the pressure. The probe can be dragged.
:::

## 30.4.2 Why Both Problems Undergo a Phase Transition at Dimension $2 \to 3$ (Geometric Analogy `MODEL` & Open-Conjecture Boundary) {#2-why-both-problems-undergo-a-phase-transition-at-dimension-23-geometric-analogy-model--open-conjecture-boundary}

::: {.remark #rem-ch30-vorticity-transport-literature title="Literature Note on the Vorticity Transport Equation, Vortex Stretching, and Slender-Tube Circulation Scaling"}
**Literature result, not formalized in this book.** Taking the exterior curl of the momentum equation in [@rem-ch30-lamb-decomposition-literature] yields the classical hydrodynamic transport equation for vorticity $\boldsymbol{\omega} = \star(\nabla\wedge\mathbf{u})$:

$$
\frac{\partial \boldsymbol{\omega}}{\partial t} + (\mathbf{u}\cdot\nabla)\boldsymbol{\omega} = \underbrace{(\boldsymbol{\omega}\cdot\nabla)\mathbf{u}}_{\text{Vortex-stretching term}} + \nu \nabla^2 \boldsymbol{\omega}.
$$

In a 2D planar flow $\mathbf{u}(x_1, x_2, t) = (u_1, u_2, 0)$, the vorticity vector $\boldsymbol{\omega} = \omega\mathbf{e}_3$ points strictly perpendicular to the velocity plane ($\partial_{x_3}\mathbf{u} = \mathbf{0}$), so the vortex-stretching term $(\boldsymbol{\omega}\cdot\nabla)\mathbf{u} \equiv \mathbf{0}$ vanishes identically; in 3D, $(\boldsymbol{\omega}\cdot\nabla)\mathbf{u}$ is generically nonzero. Combined with Kelvin's circulation scaling $\Gamma \approx A\|\boldsymbol{\omega}\|$ for a slender vortex tube of cross-section $A$, the classical **conditional collapse scenario** states that if axial stretching locally outpaces viscous diffusion $\nu\nabla^2\boldsymbol{\omega}$ and pinches $A \to 0$, local vorticity amplifies according to

$$
\text{Axial stretching outpaces viscosity with } A \to 0 \implies \|\boldsymbol{\omega}\| \approx \frac{\Gamma}{A} \to \infty.
$$
:::

::: {.viz src="navier-stokes-p-np" preset="strain" height="500"}
**Three dimensions: thinner and thinner.** Pull the tube along its axis at a steady rate, without viscosity: it grows longer and thinner, the circulation $\Gamma = \omega A$ of the cyan loop stays fixed, and so the magenta vorticity grows like $\Gamma/A$ all the way, the $\|\boldsymbol{\omega}\| \approx \Gamma/A$ of the formula above (a schematic model, `MODEL`).
:::

Comparing [@rem-ch30-vorticity-transport-literature] with the dimensional watershed of computational complexity shows that the structural transition occurs at **$2 \to 3$** in both domains (stated here as a cross-domain structural analogy, `MODEL`, rather than a formal complexity equivalence):

- **2D Planar Regime ([@rem-ch30-vorticity-transport-literature]) $\leftrightarrow$ Analogy to Binary 2-SAT (`MODEL`)**:
  Juxtaposing the 2D planar regime recorded in [@rem-ch30-vorticity-transport-literature] with binary 2-SAT (`MODEL`), in our pinned `trureturing@dev` library the frozen theorem [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path) establishes a **conditional higher-grade regularity propagation theorem** on the 2D periodic Fourier lattice: given an already-existing continuous weighted-$H^2$, zero-mean, real divergence-free mild solution path on $[0, \tau]$ whose initial data is summable at all spatial Sobolev grades $m \in \mathbb{N}$, the path satisfies the strong differential equation at every grade $m$ (for unconditional 2D global smoothness in the classical PDE literature, see [@rem-ch30-navier-stokes-forced-literature]).

::: {.viz src="navier-stokes-p-np" preset="flat" height="500"}
**Two dimensions: no stretching.** The vorticity is normal to the plane of the flow and nothing pulls on it. The tube does not thin; viscosity only widens it slowly (the cross-section $A$ grows from the $1$ of the dashed circle on its end to about $2$), the circulation $\Gamma = \omega A$ of the cyan loop stays fixed, and the magenta vorticity can only fall (a schematic model, `MODEL`).
:::

- **Conditional 3D Slender-Tube Scenario ([@rem-ch30-vorticity-transport-literature]) $\leftrightarrow$ Analogy to Three-Body 3-SAT (`MODEL`)**:
  Juxtaposing the conditional 3D slender-tube scenario recorded in [@rem-ch30-vorticity-transport-literature] with three-body 3-SAT, in our geometric analogy (`MODEL`) that conditional scenario pictures compressing a smooth 3D "field (analogous to $P$)" toward a "1D filament (analogous to an $NP$ witness thread)"!

**One specimen on the two-dimensional side that can be computed to the end: all the vorticity on finitely many points.** In a planar flow the vortex-stretching term vanishes identically ([@rem-ch30-vorticity-transport-literature]), and a straight filament perpendicular to the plane is, in the plane, just a point being carried along. Push this picture to its cleanest extreme: a planar flow that is irrotational everywhere except at $N$ points, each pierced by such a filament. In this classical picture ([@rem-ch30-point-vortex-literature]) the field has no degrees of freedom of its own; the whole dynamics is the motion of the $N$ piercing points, a system of ordinary differential equations on $\mathbb{R}^{2N}$. The pinned `trureturing@dev` library freezes the complete linear theory of one version of these equations (each vortex carries an extra precession about the origin): $2m$ vortices of alternating sign on a regular polygon, the radius at which the polygon stands still, and, for the linearization there, every eigenvalue, its multiplicity, and the number of directions along which perturbations grow.

::: {.remark #rem-ch30-point-vortex-literature title="Point-Vortex Equations and the Precession Term of Trapped Condensates (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** In a two-dimensional ideal incompressible flow, vorticity is carried along by the fluid (H. von Helmholtz, 1858). Concentrate it on $N$ points, the $k$-th with circulation $\Gamma_k$, and each point moves with the velocity that the others induce at its position (G. Kirchhoff, 1876):

$$
\begin{aligned}
\dot{x}_j &= -\frac{1}{2\pi}\sum_{k \neq j}\Gamma_k\,\frac{y_j - y_k}{d_{jk}},\\
\dot{y}_j &= \frac{1}{2\pi}\sum_{k \neq j}\Gamma_k\,\frac{x_j - x_k}{d_{jk}},\\
d_{jk} &= (x_j - x_k)^2 + (y_j - y_k)^2 .
\end{aligned}
$$

Particle models for a few quantized vortices in a trapped Bose–Einstein condensate add to each vortex a precession about the trap center whose sense is set by the sign of that vortex. The equations of [@def-ch30-alternating-vortex-polygon] and the alternating polygon are taken from A. M. Barry and P. G. Kevrekidis, *Few-particle vortex cluster equilibria in Bose–Einstein condensates: existence and stability* (arXiv:1306.1545, 2013). What is frozen below is a set of properties of this system of ordinary differential equations; how it relates to solutions of the Gross–Pitaevskii equation or of the Navier–Stokes equations lies outside what this book formalizes.
:::

::: {.definition #def-ch30-alternating-vortex-polygon title="Point-Vortex Field with Precession, Collision-Free Configurations, the Alternating Regular Polygon, and the Normalized Jacobian" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.CollisionFree D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.charge D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.polygon D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.rotate D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.regular D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.radius D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.jacobian"}
Let $N \in \mathbb{N}$ and $b, \Omega \in \mathbb{R}$.

1. A **configuration** is $z = (x_1, \dots, x_N;\, y_1, \dots, y_N) \in \mathbb{R}^{2N}$, where $(x_j, y_j)$ is the position of the $j$-th vortex (in Lean, `Fin N ⊕ Fin N → ℝ` with indices starting at $0$, so that Lean's index is $j - 1$). The **sign** of the $j$-th vortex is $s_j = (-1)^{j+1}$.
2. Write $d_{jk} = (x_j - x_k)^2 + (y_j - y_k)^2$. A configuration is **collision-free** if $d_{jk} \neq 0$ for all $j \neq k$.
3. The **field** $F_{b,\Omega} : \mathbb{R}^{2N} \to \mathbb{R}^{2N}$ has, in the coordinates $x_j$ and $y_j$, the components

   $$
   \begin{aligned}
   F_{b,\Omega}(z)_{x_j} &= -s_j\,\Omega\,y_j - \frac{b}{2}\sum_{k \neq j} s_k\,\frac{y_j - y_k}{d_{jk}},\\
   F_{b,\Omega}(z)_{y_j} &= s_j\,\Omega\,x_j + \frac{b}{2}\sum_{k \neq j} s_k\,\frac{x_j - x_k}{d_{jk}} .
   \end{aligned}
   $$

   Division in Lean is a total function (division by zero gives zero), so $F_{b,\Omega}$ is defined for every $z$; the equation of motion $\dot{z} = F_{b,\Omega}(z)$ is meaningful only on collision-free configurations, and every statement below is made at a collision-free configuration.
4. The **unit regular polygon** $P_N$ has vertices $x_j = \cos(2\pi j/N)$, $y_j = \sin(2\pi j/N)$. For $\rho, \theta \in \mathbb{R}$, $P_N(\rho, \theta)$ is the configuration obtained by rotating every vertex of $P_N$ about the origin through the angle $\theta$ and then multiplying by $\rho$. The **equilibrium radius** is $R_{b,\Omega} = \sqrt{b/(4\Omega)}$ (used below only for $b > 0$ and $\Omega > 0$).
5. The **normalized Jacobian** $J_N$ is the matrix of partial derivatives of $F_{2,1/2}$ at $P_N$: $(J_N)_{pq}$ is the derivative at $t = 0$ of the function $t \mapsto F_{2,1/2}(P_N + t\,e_q)_p$, where $e_q$ is the unit vector of the $q$-th coordinate direction (Lean writes the field with $b = 2$, $\Omega = \tfrac12$ out separately, and [`normalized_field`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.normalized_field) proves that it equals $F_{2,1/2}$).
:::

Each of the two terms has one job. The sum is the velocity blown onto vortex $j$ by the others: the $k$-th vortex induces, at distance $r$, a velocity of magnitude $\frac{b}{2r}$, perpendicular to the line joining the two, with the sense given by $s_k$; compared with [@rem-ch30-point-vortex-literature], this is the choice $\Gamma_k = \pi b\,s_k$. The first term makes each vortex circle the origin on its own, with angular velocity $s_j\Omega$: for $\Omega > 0$, positive vortices go counterclockwise and negative ones clockwise. Put an even number of vortices of alternating sign on a circle of radius $\rho$ and the two terms pull against each other along the tangent. A manual derivation (it uses the tangential readout identity quoted in the proof below): the other vortices give the $j$-th one the tangential velocity $-s_j\,\frac{b}{4\rho}$, the precession gives it $s_j\,\Omega\rho$, and the two cancel exactly when $\rho^2 = \frac{b}{4\Omega}$. On too small a circle the neighbors win; on too large a circle the precession wins; a single radius brings the whole ring to rest.

::: {.figure src="ch30-vortex-radius"}
**Only one radius brings the whole ring to rest.** Across is the radius $\rho$ of the circle carrying the alternating vortices. The violet line is the size $\Omega\rho$ of the tangential velocity the precession gives each vortex, the cyan curve the size $\frac{b}{4\rho}$ of the tangential velocity blown in by the others; the two point in opposite directions and are equal only at $\rho = R_{b,\Omega} = \sqrt{b/(4\Omega)}$ (here $b = 2$, $\Omega = \tfrac12$, so $R = 1$). Left of the crossing the neighbors win, right of it the precession wins; the condition for rest is [@lem-ch30-vortex-polygon-equilibrium].
:::

::: {.lemma #lem-ch30-vortex-polygon-equilibrium title="When a Centered Regular Polygon Is Stationary, and the Fréchet Derivative at the Equilibrium" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.regular_equilibrium_iff_radius D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.scaled_equilibrium D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalDerivative.physical_derivative"}
Let $b > 0$ and $\Omega > 0$.

1. For $N \ge 3$, $\rho > 0$ and every $\theta \in \mathbb{R}$:

   $$
   F_{b,\Omega}\bigl(P_N(\rho, \theta)\bigr) = 0 \iff N \text{ is even and } \rho = R_{b,\Omega} .
   $$

2. For every $m \ge 1$, the configuration $R_{b,\Omega}\,P_{2m}$ is collision-free and $F_{b,\Omega}(R_{b,\Omega}\,P_{2m}) = 0$.
3. For every $N \in \mathbb{N}$, $F_{b,\Omega}$ is Fréchet differentiable at $R_{b,\Omega}\,P_N$, and its derivative is the linear map represented by the matrix $2\Omega\,J_N$.
:::

::: proof
The "only if" half of item 1 comes from a tangential readout ([`angular_readout`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.angular_readout)): if all vortices of a collision-free configuration $z$ lie at the same distance $\rho$ from the origin, then for every $j$

$$
x_j\,F_{b,\Omega}(z)_{y_j} - y_j\,F_{b,\Omega}(z)_{x_j} = s_j\,\Omega\,\rho^2 + \frac{b}{4}\Bigl(\sum_{k} s_k - s_j\Bigr),
$$

because at equal distances $x_j(x_j - x_k) + y_j(y_j - y_k) = d_{jk}/2$, so that each interaction term contributes exactly $\frac{b}{4}s_k$. For odd $N$ one has $\sum_k s_k = 1$, and $j = 1$ gives the right-hand side $\Omega\rho^2 \neq 0$; for even $N$ one has $\sum_k s_k = 0$, and the right-hand side is $s_j(\Omega\rho^2 - b/4)$. The "if" half first uses the scaling identity $F_{b,\Omega}(R\,w) = 2\Omega R\,F_{2,1/2}(w)$ (for $R \neq 0$, $b = 4\Omega R^2$ and $w$ collision-free, [`field_scaling`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field_scaling)) and the covariance of the field under a common rotation to reduce to $P_{2m}$; on $P_{2m}$, pair the $k$-th vortex with its mirror image across the diameter through the $j$-th vertex: the two have the same sign, a pair contributes $s_k$ times the coordinates of the $j$-th vortex itself, and the total cancels the precession term exactly ([`equilibrium_all`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.equilibrium_all), for every $m \ge 1$). Item 3: at a collision-free point $F_{b,\Omega}$ is a rational expression with nonzero denominators, hence differentiable, and the matrix of partial derivatives is the matrix of the Fréchet derivative; differentiating the scaling identity along the coordinate directions multiplies the outer factor $2\Omega R$ by the inner factor $1/R$ and yields $2\Omega\,J_N$ ([`jacobian_scaling`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.jacobian_scaling)). The full proof is checked by the Lean kernel.
:::

Item 3 fixes what "spectrum" means from here on: the spectrum of the Fréchet derivative of the field $F_{b,\Omega}$ itself at the equilibrium, not of some matrix reduced by hand beforehand. It also separates the roles of the two parameters: $b$ appears only in the radius $R_{b,\Omega}$ and never enters the derivative; $\Omega$, besides its effect on the radius, only multiplies the derivative by $2\Omega$, which amounts to a change of the unit of time. So it is enough to study one parameter-free real $4m \times 4m$ matrix, $J_{2m}$.

::: {.theorem #thm-ch30-vortex-polygon-spectrum title="Complete Characteristic Polynomial of the Alternating Vortex Polygon and Its Stable and Unstable Spaces of Dimension $2(m-2)$" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonModes.charpoly_factored D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physicalRealOperator_eq D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_positive_eigenvalue_iff D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_negative_eigenvalue_iff D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_unstable_exhaustive D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_stable_exhaustive D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physical_real_dimensions"}
Let $m \ge 3$.

1. The characteristic polynomial $\chi_{2m}(X) = \det(X\,I - J_{2m})$ of $J_{2m}$ is

   $$
   \begin{aligned}
   \chi_{2m}(X) &= X^2\,\Bigl(X^2 + \frac{m^2}{2}\Bigr)\Bigl(X^2 + \frac{(m-1)^2}{4}\Bigr)^{2}\\
   &\quad\times \prod_{r=2}^{m-1}\Bigl(X^2 - \frac{(m-r)^2\,(r^2-2)}{4}\Bigr)^{2} .
   \end{aligned}
   $$

2. Let $b > 0$, $\Omega > 0$, and let $A_{b,\Omega}$ be the linear operator on $\mathbb{R}^{4m}$ whose matrix is the matrix of partial derivatives of $F_{b,\Omega}$ at $R_{b,\Omega}\,P_{2m}$ ([`physicalRealOperator`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalSpectrum.physicalRealOperator)). Then $A_{b,\Omega} = 2\Omega\,J_{2m}$. Write

   $$
   \lambda_r = \Omega\,(m - r)\sqrt{r^2 - 2}, \qquad r = 2, \dots, m-1 .
   $$

   For every real $\mu > 0$: $\mu$ is an eigenvalue of $A_{b,\Omega}$ if and only if $\mu = \lambda_r$ for some $r \in \{2, \dots, m-1\}$. For every real $\mu < 0$: $\mu$ is an eigenvalue of $A_{b,\Omega}$ if and only if $\mu = -\lambda_r$ for some $r \in \{2, \dots, m-1\}$.
3. Under the assumptions of item 2, let $E^{u}$ be the sum of the eigenspaces of all positive real eigenvalues of $A_{b,\Omega}$ and $E^{s}$ the sum of the eigenspaces of all negative real eigenvalues. Then

   $$
   \dim_{\mathbb{R}} E^{u} = \dim_{\mathbb{R}} E^{s} = 2(m - 2) .
   $$
:::

::: proof
Split the displacement of each vortex into its radial and its tangential component; this is an orthogonal change of coordinates. In these coordinates $J_{2m}$ becomes the block anti-diagonal matrix $\begin{pmatrix} 0 & B \\ C & 0 \end{pmatrix}$ with $B = (\delta\,I - W)\,S$ and $C = ((\delta + 1)\,I - W)\,S$, where the off-diagonal entries of $W$ are the inverse squared chord lengths $1/d_{jk}$ of $P_{2m}$, its diagonal is zero, $S = \operatorname{diag}(s_j)$ and $\delta = \frac{(2m)^2 - 1}{12} - \frac{m^2}{2}$ ([`rotated_jacobian_all`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.rotated_jacobian_all)). For $x \neq 0$ a Schur complement gives $\chi_{2m}(x) = \det(x^2 I - CB)$. The matrix $W$ is circulant, the discrete Fourier transform diagonalizes it, and its $k$-th eigenvalue is $\frac{(2m)^2 - 1}{12} - \frac{k(2m - k)}{2}$ ([`chordWeight_dft`](lean:D5/S3/FluidDynamics/Vortices/InverseChordCirculant.chordWeight_dft)); the alternating signs $S$ shift the frequency $k$ by $m$. Hence $\det(y\,I - CB) = \prod_{k=0}^{2m-1}(y - \gamma_k)$ with $\gamma_k = (m - r)^2(r^2 - 2)/4$ and $r = \min(k, 2m - k)$. Two polynomials that agree at infinitely many points are equal, so $\chi_{2m}(X) = \prod_k (X^2 - \gamma_k)$ ([`charpoly_mode_product`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.charpoly_mode_product)). The values $r = 0$ and $r = m$ each come from one $k$, every other $r$ from two; these are the exponents in item 1. One has $\gamma_k > 0$ only for $2 \le r \le m - 1$, and different $r$ give different values: $(m-k)^2(k^2-2) \neq (m-l)^2(l^2-2)$ for integers $2 \le k < l < m$ ([`distinctness_certificate`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonSpectrum.distinctness_certificate)). Each such real root has a $2$-dimensional eigenspace in $\mathbb{R}^{4m}$ ([`real_geometric_multiplicity`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonRealSpaces.real_geometric_multiplicity)), eigenspaces of different eigenvalues are linearly independent, and adding $m - 2$ spaces of dimension $2$ gives item 3. Passing to general $b$ and $\Omega$ only multiplies by $2\Omega$: the eigenspaces stay the same and every eigenvalue is multiplied by $2\Omega$. The full proof is checked by the Lean kernel.
:::

The four factors are four kinds of motion. $X^2$ is the eigenvalue zero, treated separately below. The two factors with a plus sign give the purely imaginary roots $\pm i\,m/\sqrt{2}$ and $\pm i\,(m-1)/2$: oscillations about the equilibrium that neither grow nor decay. The factors with a minus sign give pairs of real roots: the positive one grows, the negative one decays. The library holds one more frozen theorem ([`off_axis_is_real`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonRealBoundary.off_axis_is_real)): a complex eigenvalue of $J_{2m}$ with nonzero real part is real, so $E^{u}$ and $E^{s}$ already contain every growing and every decaying eigendirection. The hexagon ($m = 3$) is the first polygon with a growing direction, and each further pair of vortices adds two more.

::: {.viz src="vortex-polygon" preset="hexagon" height="500"}
**The hexagon: push it along a diverging direction and the push grows like $e^{\lambda t}$.** Six vortices of alternating sign (cyan $+$, magenta $-$) rest on the circle of radius $R = 1$ ($b = 2$, $\Omega = \tfrac12$). A push of $10^{-9}$ along an eigenvector of $\lambda = 1/\sqrt{2}$: the amber arrows are the magnified displacement, about $1177$ times its first size by $t = 10$, in line with $e^{10/\sqrt{2}}$ ([@thm-ch30-vortex-polygon-spectrum]). The motion on the stage is a numerical integration of the nonlinear equation, not a frozen statement.
:::

::: {.proposition #prop-ch30-vortex-polygon-neutral-drift title="Semisimple Nonzero Eigenvalues, a Jordan Block of Size Two at Zero, and Unbounded Linear Drift; Dipole and Square" lean="D5/S3/FluidDynamics/Vortices/AlternatingPolygonDecomposition.geometric_eq_algebraic D5/S3/FluidDynamics/Vortices/AlternatingPolygonNeutral.neutral_generalized_finrank D5/S3/FluidDynamics/Vortices/AlternatingPolygonNeutral.neutral_geometric_finrank D5/S3/FluidDynamics/Vortices/AlternatingPolygonCartesianChain.cartesian_chain D5/S3/FluidDynamics/Vortices/AlternatingPolygonCartesianChain.unbounded_linear_drift D5/S3/FluidDynamics/Vortices/AlternatingPolygonSmallCases.dipole D5/S3/FluidDynamics/Vortices/AlternatingPolygonSmallCases.square"}
Let $m \ge 1$. Items 1, 2 and 4 regard $J_{2m}$ as a linear operator on $\mathbb{C}^{4m}$.

1. For every nonzero complex number $\mu$, the complex dimension of the eigenspace of $\mu$ equals the multiplicity of $\mu$ as a root of the characteristic polynomial of $J_{2m}$.
2. The generalized eigenspace of the eigenvalue $0$ has dimension $2$, and its eigenspace has dimension $1$.
3. Let $(x_j, y_j)$ be the vertices of $P_{2m}$, let $\delta_m = 1 - m^2/2$, and take the vectors of $\mathbb{R}^{4m}$

   $$
   \begin{aligned}
   c_0 &= (-y_1, \dots, -y_{2m};\; x_1, \dots, x_{2m}),\\
   c_1 &= \frac{1}{\delta_m}\,(s_1 x_1, \dots, s_{2m} x_{2m};\; s_1 y_1, \dots, s_{2m} y_{2m}) .
   \end{aligned}
   $$

   Then $J_{2m}\,c_0 = 0$ and $J_{2m}\,c_1 = c_0$; the curve $v(t) = c_1 + t\,c_0$ satisfies $v'(t) = J_{2m}\,v(t)$ for every $t \in \mathbb{R}$, and the set $\{v(t) : t \in \mathbb{R}\}$ is unbounded.
4. The characteristic polynomial of $J_2$ is $X^2\bigl(X^2 + \tfrac12\bigr)$, and its complex eigenvalues are exactly $0$ and $\pm i/\sqrt{2}$; the characteristic polynomial of $J_4$ is $X^2\bigl(X^2 + 2\bigr)\bigl(X^2 + \tfrac14\bigr)^2$, and its complex eigenvalues are exactly $0$, $\pm i\sqrt{2}$ and $\pm i/2$.
:::

::: proof
A discrete Fourier transform on top of the radial and tangential coordinates splits $\mathbb{C}^{4m}$ into $2m$ invariant blocks of dimension two. On the $q$-th block the operator has the matrix $\begin{pmatrix} 0 & \ell_q \\ \ell_{q+m} + 1 & 0 \end{pmatrix}$, where $\ell_q = -(m - q)^2/2$ and indices are taken modulo $2m$ in $\{0, \dots, 2m-1\}$ ([`actual_normal_form`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonJordan.actual_normal_form)); the product of the two off-diagonal entries is the $\gamma_q$ of the previous proof. For nonzero $\mu$, a direct computation on each block shows that $(T - \mu)^2 v = 0$ implies $(T - \mu)v = 0$ (with $T$ this operator): a nonzero eigenvalue has no Jordan chain, its generalized eigenspace equals its eigenspace, and the dimension of a generalized eigenspace is the multiplicity of the root, which is item 1. On the $q$-th block $T^2$ is multiplication by $\gamma_q$, so the generalized eigenspace of $0$ is exactly the sum of the blocks with $\gamma_q = 0$; this happens only for $q = m$. There $\ell_m = 0$, while the other off-diagonal entry is $\ell_0 + 1 = \delta_m$, which is nonzero because $m^2 = 2$ has no integer solution. That block is a nilpotent Jordan block of size two, which is item 2. Item 3 is checked directly in radial and tangential coordinates: $c_0$ displaces every vortex tangentially by $1$ and radially by $0$, while $c_1$ displaces it radially by $s_j/\delta_m$ and tangentially by $0$; in the notation of the previous proof, the row sums $\sum_k W_{jk} = \frac{(2m)^2 - 1}{12}$ and the alternating row sums $\sum_k s_k W_{jk} = s_j\,\delta$ give $B\,\mathbf{1} = 0$ and $C\,(s/\delta_m) = \mathbf{1}$ (here $\mathbf{1}$ is the all-ones vector and $s/\delta_m$ has $j$-th component $s_j/\delta_m$), that is, $J_{2m}c_0 = 0$ and $J_{2m}c_1 = c_0$. Then $J_{2m}(c_1 + t\,c_0) = c_0 = v'(t)$, and unboundedness follows from $c_0 \neq 0$. Item 4 substitutes $m = 1, 2$ into the folded formula $\chi_{2m}(X) = X^2\bigl(X^2 + \tfrac{m^2}{2}\bigr)\prod_{r=1}^{m-1}\bigl(X^2 - \tfrac{(m-r)^2(r^2-2)}{4}\bigr)^2$, valid for every $m \ge 1$ ([`charpoly_folded`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonModes.charpoly_folded)). The full proof is checked by the Lean kernel.
:::

The vector $c_0$ is an infinitesimal rotation of the whole polygon about the origin: the field is covariant under a common rotation (as used in the proof of [@lem-ch30-vortex-polygon-equilibrium]), the rotated polygon is still at rest, and so this direction lies in the kernel of $J_{2m}$. The vector $c_1$ moves the positive vortices along their radii by $1/\delta_m$ and the negative ones by the same distance the other way. Once the two kinds of vortex sit at slightly different radii, the solution of the linearized equation does not oscillate; the whole ring turns away along $c_0$ at constant speed. The spectrum does not show this: zero and purely imaginary numbers both count as "no growth", and yet a Jordan block of size two makes the solution grow linearly in time. For the dipole ($m = 1$) and the square ($m = 2$) every eigenvalue lies on the imaginary axis, and their linearized equations have such an unbounded solution all the same. For general $b, \Omega > 0$ it suffices to divide $c_1$ by $2\Omega$ ([`physical_cartesian_chain`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonPhysicalDerivative.physical_cartesian_chain)).

::: {.viz src="vortex-polygon" preset="drift" height="500"}
**The square: an imaginary spectrum, and still the ring turns away.** The four vortices pushed $\varepsilon = 0.01$ along the Jordan chain $c_1$: the cyan positive vortices move in to radius $0.99$, the magenta negative ones out to $1.01$, and the grey rings mark where they started. The whole ring turns steadily about the centre; by $t = 100$ the amber angle is about $57^\circ$, that is $1$ radian, the $\varepsilon t$ of the linearized solution ([@prop-ch30-vortex-polygon-neutral-drift]). The angle comes from a numerical integration of the nonlinear equation.
:::

::: {.example #ex-ch30-vortex-octagon-spectrum title="The Sixteen Eigenvalues of the Regular Octagon: Computed Numerically from the Equations, Then Compared Item by Item with the Frozen Multiplicities"}
Take $m = 4$, $b = 2$, $\Omega = \tfrac12$, so that $R_{b,\Omega} = 1$: eight vortices on the unit circle, with phase space $\mathbb{R}^{16}$. The numbers below use only the equations of [@def-ch30-alternating-vortex-polygon] and no closed form: the field is typed in term by term, its $16 \times 16$ matrix of partial derivatives at $P_8$ is obtained by symbolic differentiation (it differs entrywise by at most $3 \times 10^{-24}$ from central differences with step $10^{-12}$), and the eigenvalues are computed with $40$ decimal digits; the algebraic multiplicity is the number of numerically coincident eigenvalues and the geometric multiplicity is $16 - \operatorname{rank}(J_8 - \lambda I)$. The largest component of the field at $P_8$ is $8 \times 10^{-41}$. The label $r$ is that of the proof of [@thm-ch30-vortex-polygon-spectrum]: $r = 0, 1$ belong to the two factors with a plus sign and $r = m$ to $X^2$. Eigenvalues are rounded to the digits shown:

| Label $r$ | Root given by the frozen declarations | Numerical eigenvalue | Algebraic multiplicity | Geometric multiplicity |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $\pm 2\sqrt{2}\,i$ | $\pm 2.828427\,i$ | $1$ | $1$ |
| $1$ | $\pm \tfrac32\,i$ | $\pm 1.500000\,i$ | $2$ | $2$ |
| $2$ | $\pm\sqrt{2}$ | $\pm 1.414214$ | $2$ | $2$ |
| $3$ | $\pm\tfrac12\sqrt{7}$ | $\pm 1.322876$ | $2$ | $2$ |
| $4$ | $0$ | $0$ (modulus below $2 \times 10^{-20}$) | $2$ | $1$ |

The multiplicities add up to $2 + 4 + 4 + 4 + 2 = 16$. Counted with multiplicity there are $4 = 2(m - 2)$ positive real eigenvalues and likewise $4$ negative ones. $\operatorname{rank} J_8 = 15$ and $\operatorname{rank} J_8^2 = \operatorname{rank} J_8^3 = 14$: the eigenvalue zero carries exactly one Jordan block of size two. The two positive roots $1.414214$ and $1.322876$ lie close together but do not coincide: different $r$ give different roots, so every real root has multiplicity exactly $2$ and none has more. The hexagon ($m = 3$), treated the same way, gives $\pm 0.707107$ (each double), $\pm 1.000000\,i$ (each double), $\pm 2.121320\,i$ (each simple) and a double eigenvalue zero of geometric multiplicity $1$, with $2 = 2(m - 2)$ positive real eigenvalues.

**Other parameters.** For $b = 1$, $\Omega = 1$ ($R_{b,\Omega} = 0.5$) the two positive real eigenvalues of the octagon become $2.828427$ and $2.645751$; for $b = 1.35$, $\Omega = 0.25$ ($R_{b,\Omega} = 1.161895$) they become $0.707107$ and $0.661438$. Both pairs are the table values times $2\Omega$, whatever $b$ is.

**Back to the nonlinear equations.** Everything above concerns the linearization. The following two numerical experiments integrate $\dot{z} = F_{2,1/2}(z)$ directly (fourth-order Runge–Kutta with $30$ digits; halving the step leaves the digits shown unchanged). First, the hexagon: starting from $P_6 + 10^{-9}u$, with $u$ a unit eigenvector for the eigenvalue $1/\sqrt{2}$, the distance from $P_6$ at $t = 10$ has grown to about $1177.4$ times its initial value, within a relative $10^{-6}$ of $e^{10/\sqrt{2}} = 1177.405$ (the eigenspace is two-dimensional, and this holds whichever unit vector of it is taken). Second, the square: starting from $P_4 + 10^{-3}c_1$ (positive vortices at radius $0.999$, negative ones at radius $1.001$), the four vortices have turned about the origin by $0.0100001$ radians on average at $t = 10$ and by $0.100001$ radians at $t = 100$; the linearized solution $10^{-3}(c_1 + t\,c_0)$ predicts the angle $10^{-3}t$. The linearized solution runs off along the tangent without bound; in the nonlinear equations, what one sees over this time span is the whole ring turning slowly about the origin. These two experiments are numerical observations, not frozen declarations.
:::

This specimen separates three things that are easily run together. The right-hand side of the equations is differentiable at collision-free configurations ([`field_differentiable_at`](lean:D5/S3/FluidDynamics/Vortices/AlternatingPolygonParameters.field_differentiable_at)), the equilibrium is such a configuration, and nothing is singular there; yet from the hexagon on, the linearization has growing directions spanning exactly $2(m - 2)$ dimensions; and for the spectrally neutral dipole and square the linearized equations still have an unbounded solution. Differentiable does not mean stable, and spectrally neutral does not mean bounded. Back in this chapter's analogy (`MODEL`): the "lines" here have already shrunk to points in the plane, with nothing between them to entangle, and yet the growing directions are all there; none of them needs vortex stretching. The three-dimensional question lies elsewhere: there a filament is no longer just a point being carried along; it can also be stretched.

Before stating the open unforced Clay Millennium conjecture, we strictly isolate the classical 2D regularity theorem and the **forced regime (Clay Statements C / D, with smooth external forcing $\mathbf{f} \in C^\infty$)** inside a dedicated literature remark so that the red `OPEN` conjecture box below states purely the unresolved autonomous unforced problem:

::: {.remark #rem-ch30-navier-stokes-forced-literature title="Literature Note on Lamb's Identity, 2D Global Regularity, and the 2026 Forced Blow-Up of Statements C / D"}
**Literature result, not formalized in this book.** The classical hydrodynamic identities, unconditional 2D global smoothness theorem, and 3D **forced** Navier–Stokes blow-up results referenced in this section belong to the external literature outside the `trureturing@dev` declarations locked in this book:

1. **Lamb's Identity, Helicity Hopf Invariant, and Unconditional 2D Global Regularity**: The convective decomposition $(\mathbf{u}\cdot\nabla)\mathbf{u} = \frac{1}{2}\nabla(\|\mathbf{u}\|^2) + \boldsymbol{\omega}\times\mathbf{u}$ is due to H. Lamb (*Hydrodynamics*), inviscid flux conservation to Kelvin's circulation theorem (Lord Kelvin, 1869), and the topological identification of inviscid helicity $\mathcal{H} = \int \mathbf{u}\cdot\boldsymbol{\omega}\,dV$ with Hopf linking on $S^3$ to J. J. Moreau (1961) and H. K. Moffatt (1969); unconditional global-in-time existence and smoothness for 2D incompressible Navier–Stokes was proved by O. A. Ladyzhenskaya (*The Mathematical Theory of Viscous Incompressible Flow*, 1969) (distinct from the inline conditional Fourier mild-path theorem [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path), which assumes a continuous mild path on $[0, \tau]$ as given).
2. **OpenAI's forced 3D Navier–Stokes resolution (Clay Statements C / D)**: The [official announcement](https://openai.com/index/navier-stokes-solution/), the 166-page paper [*Finite time blowup for Navier–Stokes*](https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf) (Theorem 1.1 and periodic Corollary 10.6), and the [fixed source revision](https://github.com/openai/NavierStokesAndEuler/tree/f9e8bc5b38b6e212696e8a30e3e91517af887bbd) describe the same public result. For every $\nu>0$, the construction starts from rest and uses smooth forcing to produce an incompressible 3D solution with $\sup_{t<T^*}\|\mathbf u(t)\|_{L^2}<\infty$ but $\limsup_{t\nearrow T^*}\|\mathbf u(t)\|_{L^\infty}=\infty$. The energy bound concerns the velocity field, not a supposed kinetic energy of the force. In the whole-space Statement C, all space-time derivatives of the force must decay rapidly; the paper's smooth force compactly supported in space and time meets a stronger condition. In Statement D the force is spatially periodic and decays rapidly in time: a nonzero periodic force cannot have compact spatial support throughout $\mathbb R^3$. The [official Clay formulation](https://www.claymath.org/wp-content/uploads/2022/06/navierstokes.pdf#page=2) accepts a proof of any one of A, B, C, or D, so C / D are themselves an accepted route to resolving that problem; unforced A / B remain `OPEN` below. The final source entry points are `NavierStokes.Comparator.navier_stokes_breakdown_R3` and `navier_stokes_breakdown_periodic`. This is external literature with its published formalization, outside this book's frozen ledger; the engineering research record separately reports our independent reproduction status.
3. **Distinguishing the Euler results**: The same announcement links the separate 57-page paper [*Finite time blowup for the Euler equation*](https://cdn.openai.com/pdf/315b36cd-ec98-4023-8342-93345194ece1/euler.pdf). Its Theorem 1.1 concerns $\nu=0$, **no forcing**, and smooth, compactly supported divergence-free initial data, giving finite-time gradient blow-up and divergence of the time integral of vorticity. The announcement explicitly identifies Alpöge and Buckmaster's concurrent work as **forced Euler**. These two Euler results differ in equation, data, and conclusion from the forced viscous NS construction.
:::


::: {.viz src="navier-stokes-p-np" preset="burgers" height="500"}
**Viscosity holds: the Burgers vortex.** Add viscosity to the steady stretching: the thinning core also spreads outwards, the cross-section $A$ stops shrinking near $4\pi\nu/\alpha$, the magenta vorticity levels off with it, and the circulation of the cyan loop is still $1$. Stretching and viscosity balance exactly and the tube does not pinch off (a schematic model, `MODEL`).
:::

::: {.conjecture #conj-coda-navier-stokes-regularity title="Unforced 3D Incompressible Navier–Stokes Global Regularity Conjecture (Clay Millennium Statements A / B)"}
Fix strictly positive kinematic viscosity $\nu > 0$ and **identically zero external force ($\mathbf{f} \equiv \mathbf{0}$)**, and consider the autonomous three-dimensional incompressible Navier–Stokes equations on $\mathbb{R}^3$ (Statement A) or on the three-torus $\mathbb{T}^3 = \mathbb{R}^3/\mathbb{Z}^3$ (Statement B):

$$
\frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u}\cdot\nabla)\mathbf{u} = -\nabla p + \nu \nabla^2 \mathbf{u}, \qquad \nabla\cdot\mathbf{u} = 0, \qquad \mathbf{u}(\mathbf{x}, 0) = \mathbf{u}_0(\mathbf{x}).
$$

For every smooth, divergence-free ($\nabla\cdot\mathbf{u}_0 = 0$) initial velocity field $\mathbf{u}_0$ satisfying Schwartz rapid decay on $\mathbb{R}^3$ (or smooth periodicity on $\mathbb{T}^3$), does there always exist a globally defined smooth solution $(\mathbf{u}, p) \in C^\infty$ on all of $\mathbb{R}^3 \times [0, \infty)$ (or $\mathbb{T}^3 \times [0, \infty)$) with bounded kinetic energy, or does some smooth unforced initial datum lose smoothness in finite time $T^* < \infty$ (finite-time blow-up)? This unforced 3D Navier–Stokes global regularity question remains open.
:::

::: {.viz src="navier-stokes-p-np" preset="runaway" height="500"}
**Thinner and thinner (a schematic model).** The circulation $\Gamma = \omega A$ of the cyan loop stays fixed; the faint shadow with its dashed circles is the tube as it started. Here the strain is taken proportional to the vorticity itself ($\alpha = \kappa\omega$, a schematic closure and not a solution of the Navier–Stokes equations): $\kappa\Gamma = 0.50$ exceeds $4\pi\nu = 0.151$, so by $t = 2.4$ the cross-section is down to $0.162$ and the magenta vorticity up to $6.18$, and the cross-section reaches zero at $t^* = 2.86$. Whether a real three-dimensional fluid does this is the open problem stated just above (`MODEL`).
:::

## 30.4.3 Self-Reference of the Field and the Quadratic Advection Closure Obstruction (`LEAN ✓`) {#3-self-reference-of-the-field-and-the-quadratic-advection-closure-obstruction-lean-}

Why is the quadratic convective coupling in [@rem-ch30-lamb-decomposition-literature] so formidable? Because in our geometric interpretation (`MODEL`), it is the **continuum field incarnation of Chapter 24's meta-self-reference $\psi(\psi)$** — whereas linear PDEs separate the operator from the state, in fluid advection **the velocity field $\mathbf{u}$ is simultaneously the state being transported and the differential operator performing the transport**! In Fourier space, quadratic self-coupling adds wavevectors ($\mathbf{k}_1 + \mathbf{k}_2 \to \mathbf{k}_3$), transferring energy across scales. For a finite observer restricted to an idempotent low-mode projection $P$ ($P^2 = P$), this cross-scale quadratic coupling directly shatters autonomous local closure — a fact mechanically verified in `trureturing@dev` by the **Quadratic Observation Closure Criterion and 5-Mode Fluid Advection Non-Closure Theorem**:

::: {.theorem #thm-coda-quadratic-advection-no-closure title="Quadratic Vector-Field Projection Closure Criterion and Finite-Mode Fluid Advection Non-Closure Theorem" lean="D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure"}
Let $E$ be a real module, let $L : E \to_{\mathbb{R}} E$ be a linear viscous drift operator, let $B : E \to_{\mathbb{R}} E \to_{\mathbb{R}} E$ be a bilinear advection operator defining the quadratic vector field $V(x) = L x - B(x, x)$, and let $P : E \to_{\mathbb{R}} E$ be an idempotent finite-resolution observation projection ($\forall x,\; P(P(x)) = P(x)$). Then:

1. **Necessary and Sufficient Criterion for Exact Quadratic Closure** ([`quadratic_closure_iff`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff)): An exact Markovian closure map $f : E \to E$ satisfying $\forall x \in E,\; P(V(x)) = f(P(x))$ exists if and only if three orthogonal leakage conditions vanish simultaneously:
   - **Vanishing hidden linear leakage**: $\forall b \in E,\; P(b) = 0 \implies P(L(b)) = 0$;
   - **Vanishing hidden self-advection leakage**: $\forall b \in E,\; P(b) = 0 \implies P(B(b, b)) = 0$;
   - **Vanishing visible–hidden cross-scale mixed advection**: $\forall a, b \in E,\; P(a) = a \implies P(b) = 0 \implies P(B(a, b) + B(b, a)) = 0$.
2. **No Exact Closure for the 5-Mode Fourier–Galerkin Fluid Advection Instance** ([`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)): In the 5-mode Leray-projected Fourier state space $\operatorname{State} = \operatorname{Fin} 5 \to \operatorname{Amplitude}$, the visible low-frequency wave $a = \operatorname{family}(1, 0)$ ($P(a) = a$) and the hidden high-frequency wave $b = \operatorname{family}(0, 1)$ ($P(b) = 0$) couple via quadratic advection at transverse mode index $0$ (wavevector $\mathbf{k}_0 = (0, 1)$, component $0$) to produce a **nonzero projected cross-scale mixed advection witness** ([`mixed_witness`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_witness)):

   $$
   P\bigl(B(a, b) + B(b, a)\bigr)_{0, 0} = \frac{i}{4} \neq 0,
   $$

   directly refuting the third cross-scale mixed condition ([`mixed_condition_fails`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_condition_fails)) and yielding via the minus sign in $V(x) = L_\nu x - B(x, x)$ a **nonzero observed transverse fluid acceleration difference (gap)** equal to $-i/4$ ([`fluid_gap_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.fluid_gap_from_mixed)):

   $$
   \operatorname{acceleration}_\nu(1, 1)_{(0, 1), 0} - \operatorname{acceleration}_\nu(1, 0)_{(0, 1), 0} = -\frac{i}{4} \neq 0.
   $$

   Consequently, for every viscosity $\nu \in \mathbb{R}$, **no exact autonomous closure exists** on the projected low-mode space:

   $$
   \neg \exists f : \operatorname{State} \to \operatorname{State},\quad \forall x \in \operatorname{State},\; P\bigl(\operatorname{vectorField}(L_\nu, B, x)\bigr) = f(P(x)),
   $$

   nor does there exist any exact scalar predictor of the transverse fluid acceleration from low-mode observations alone ([`no_fluid_predictor_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_fluid_predictor_from_mixed)).
:::

::: proof
Part 1 follows from the idempotent decomposition $x = P(x) + (x - P(x))$ together with the exact observed-increment identity [`observed_increment`](lean:D5/S3/Observer/Reversal/QuadraticObservationClosure.observed_increment):

$$
P(V(a + b)) - P(V(a)) = P(L(b)) - P(B(a, b) + B(b, a)) - P(B(b, b)).
$$

Necessity evaluates the increment on the opposite hidden pair $\pm b$ (isolating the odd linear term $P(L(b)) = 0$ and the even quadratic term $P(B(b, b)) = 0$) and on the sum $a + b$ with $P(a) = a, P(b) = 0$ (isolating the mixed term $P(B(a, b) + B(b, a)) = 0$); sufficiency sets $a = P(x)$ and $b = x - P(x)$ with $P(b) = 0$ to obtain $P(V(x)) = P(V(P(x)))$. Part 2 evaluates the Leray-projected convolution on the two-parameter wave family $\operatorname{family}(\alpha, \beta)$ at mode $0 = (0, 1)$, obtaining $+i/4$ for the projected mixed advection term ([`mixed_witness`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.mixed_witness)); substituting this together with kernel preservation $P(L_\nu(b)) = 0$ into the negatively signed quadratic increment identity yields the observed transverse fluid acceleration gap $-i/4 \neq 0$ ([`fluid_gap_from_mixed`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.fluid_gap_from_mixed)), refuting exact closure for every $\nu \in \mathbb{R}$ via Part 1. The full proof is checked by the Lean kernel.
:::

::: {.viz src="navier-stokes-p-np" preset="mixed" height="500"}
**The unseen variable leaks in.** An observer of $x$ alone: each curve shows, for one fixed $x$, how the seen acceleration $P(V)$ changes with the unseen $y$. With the mixed term on, the curves fan out: for the same $x = 0.5$, cyan marks the acceleration at $y = 0$, the amber point the acceleration at the current $y$, and the amber bar their difference. Where that difference is not zero there is no exact closure depending on $x$ alone (a schematic instance on $\mathbb{R}^2$; the general criterion and the five-mode instance are the theorem above). Turn all three leaks off and every curve becomes a level line, the amber point falling on the cyan one: the "if" half of the criterion.
:::

## 30.4.4 Viscous Landauer Erasure, High-Dimensional Geodesics, and the Six-Row Continuum–Discrete Analogy (`MODEL`) {#4-viscous-landauer-erasure-high-dimensional-geodesics-and-the-six-row-continuumdiscrete-analogy-model}

Three classical literature results concerning turbulent dissipation scales, averaged fluid logic-gate blow-up, and infinite-dimensional diffeomorphism geodesics are isolated in the following remark:

::: {.remark #rem-ch30-tao-arnold-literature title="Literature Note on Kolmogorov Scaling, Tao's Averaged Blow-Up, and Arnold's Geodesic Theorem"}
**Literature result, not formalized in this book.** Three classical results from fluid mechanics and geometric analysis cited in this section belong to the external literature and are not formalized in this book:

1. **Kolmogorov's Turbulent Cascade and Dissipation Microscale (A. N. Kolmogorov, *Dokl. Akad. Nauk SSSR* **30**, 1941)**: In phenomenological high-Reynolds-number isotropic turbulence, the inertial-range spectrum obeys $E(k) \propto \varepsilon^{2/3} k^{-5/3}$ down to the viscous dissipation microscale $\eta = (\nu^3/\varepsilon)^{1/4}$, requiring $N_{\mathrm{DOF}} \sim (L/\eta)^3 \sim \mathrm{Re}^{9/4}$ spatial degrees of freedom to resolve directly;
2. **Tao's Averaged 3D Navier–Stokes Finite-Time Blow-Up Theorem (Terence Tao, *J. Amer. Math. Soc.* **29**, 601–674, 2016)**: For an energy-conserving bilinearly averaged 3D Navier–Stokes system, nested vortex rings can be wired into a self-similar fluid logic-gate computer in which a parent ring passes its state to a child ring of scale $\lambda R$ ($\lambda \in (0, 1)$) whose local clock ticks $\lambda^{-2}$ times faster, completing infinitely many gate steps in finite time $T^* < \infty$ when supercritical stretching outpaces viscosity;
3. **Arnold's $\operatorname{SDiff}(M)$ Geodesic Theorem (Vladimir Arnold, *Ann. Inst. Fourier* **16**, 319–361, 1966)**: Smooth trajectories of an inviscid incompressible ideal fluid (the Euler equations, $\nu = 0$) coincide with constant-speed **geodesics** on the infinite-dimensional volume-preserving diffeomorphism group $\operatorname{SDiff}(M)$ under the right-invariant $L^2$ kinetic-energy metric (whose negative sectional curvatures in many 2-planes drive exponential divergence of nearby trajectories, whereas positive viscosity $\nu\nabla^2\mathbf{u}$ in Navier–Stokes introduces a dissipative departure from pure geodesic flow).
:::

Combining [@thm-coda-quadratic-advection-no-closure] with the literature context above yields three closing reflections in our geometric model (`MODEL`):

- **Viscous Dissipation as Landauer Erasure and Proof Threads (`MODEL`)**: Dissipation by kinematic viscosity $\nu$ invites comparison with Chapter 8's heat-bath erasure (cf. the spherical gradient dissipation theorem [`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)); energy laws in different models are not thereby identified. A written proof for Tao's averaged model or OpenAI's forced NS construction can be checked. Drawing it as a one-dimensional thread bounds neither its length, reduction cost, nor kernel runtime, and does not guarantee polynomial-length certificates for a family of problems.
- **Physical Limits of Continuum Idealization and Discrete Pairwise Measurement (`MODEL`)**: Mathematical blow-up in a continuous PDE prompts questions about the range of a continuum approximation. Compressibility, cavitation, and molecular corrections depend on the material, state, and scale; this construction establishes no inevitable physical outcome of any one kind. The author's ***"A smooth sphere is always only an approximation!"*** expresses a position about finite resolution here. It neither removes the precise mathematical meaning of continuum equations nor proves that nature must have a particular discrete ontology.
- **Six-Row Orthogonal Analogy Between Discrete Logic and Continuum Fluids (`MODEL`)**:

::: {.remark #rem-ch30-six-row-analogy-table title="Six-Row Orthogonal Analogy Between Discrete Logic and Continuum Fluids (Includes Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book (for the external complexity-theory and continuum fluid-mechanics literature cross-referenced below; verified formal theorems carry explicit GID links and unforced 3D Navier–Stokes regularity is marked `OPEN`).**

| Core Dimension | $P$ vs. $NP$ Problem (Discrete Logical Field) | Navier–Stokes Problem (Continuous Fluid Field) | Orthogonal Geometric Analogy (`MODEL`) |
| :--- | :--- | :--- | :--- |
| **Analogy for Efficient Solution** | **Guidance structures in some $P$ algorithms** ($P\subseteq NP$; zero curl is not a definition; cf. [@rem-ch30-karmarkar-kasteleyn-literature]) | **Irrotational potential flow / low-Re laminar flow** ($\nabla\wedge\mathbf{u}=0$ or viscosity-dominated; cf. [@rem-ch30-lamb-decomposition-literature]) | The author pictures efficient solution through local guidance; algorithms and cost analysis are still required |
| **Dimensional Watershed** | **2-SAT** vs. **3-SAT** (literature in [@rem-ch30-query-sos-literature]) | **2D NS** (literature in [@rem-ch30-navier-stokes-forced-literature]; conditional mild-path regularity [`all_grade_regularity_of_mild_path`](lean:D5/S3/FluidDynamics/Fourier/MildPathRegularity.all_grade_regularity_of_mild_path)) vs. **3D unforced NS** ([@conj-coda-navier-stokes-regularity], `OPEN`) | Planar 2D flow has no third-axis vortex stretching; 3D permits axial vortex stretching (cf. [@rem-ch30-vorticity-transport-literature]) |
| **Complexity Engine** | Self-referential recursion & 3-body boolean frustration loops | Quadratic convective nonlinearity & vortex stretching ([@rem-ch30-lamb-decomposition-literature], [@rem-ch30-vorticity-transport-literature]) plus mixed leakage ([`no_exact_closure`](lean:D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure)) | Operator–state self-coupling $\psi(\psi)$, cascading across modes $\mathbf{k}_1+\mathbf{k}_2\to\mathbf{k}_3$ |
| **Analogy Between Witness and Singular Filament** | An **$NP$ witness thread** pictures checking, without implying intractability | Conditional collapse of a schematic tube; increasing relative slenderness of the OpenAI core (cf. [@rem-ch30-vorticity-transport-literature]) | Similar thread imagery does not establish a mathematical equivalence between complexity and fluid singularities |
| **Physical Firewall** | Finite observer's $90^\circ$ horizon & bounded memory order | Kinematic viscosity ([@rem-ch30-lamb-decomposition-literature]; cf. [`S2_dissipation`](lean:D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation)) & microscopic cutoff | A model analogy between dissipation and erasure; no guarantee against fluid blow-up |
| **High-Dimensional View** | Timeless static field intersection (collapse literature in [@rem-ch30-postselection-ctc-literature]) | Infinite-dimensional manifold geodesic view (inviscid literature in [@rem-ch30-tao-arnold-literature]) | Simple geometric motion on a higher-dimensional manifold appears as complex nonlinear transfer under local projection |

:::

## 30.4.5 Three Hand Calculations: Energy, Feedback, and Nonclosure {#5-three-hand-calculations-energy-feedback-and-nonclosure}

::: {.example #ex-ch30-core-energy-scaling title="Unbounded Local Speed with Vanishing Core Energy: A Scaling Calculation"}
**Hand calculation, not formalized in this book.** Use the characteristic core scales from Section 2 of the NS paper, with $\tau=1-t$ and $0<h<1/100$:

$$
\begin{aligned}
\ell_r&\asymp\tau^{1/2},\\
\ell_z&\asymp\tau^{1/2-h},\\
U&\asymp\tau^{-1/2-h},\\
V_{\mathrm{core}}&\asymp\ell_r^2\ell_z\asymp\tau^{3/2-h},\\
E_{\mathrm{core}}&\asymp U^2V_{\mathrm{core}}\asymp\tau^{1/2-3h}\longrightarrow0.
\end{aligned}
$$

Meanwhile $U$ tends to infinity: an integral energy bound does not automatically bound local speed. This estimates orders of magnitude in the characteristic core, not the paper's full global energy proof, which also controls the exterior field and correction terms. Both lengths shrink; $\ell_r/\ell_z\asymp\tau^h\to0$ means increasing relative slenderness, not growing axial length or a whole curve of singular points.
:::

### 30.4.5.1 Applying the Visible–Hidden Split to a PDE: Commutation Assumptions {#sec-ch30-projected-feedback}

::: {.remark #rem-ch30-projected-feedback title="Leray Projection, Fourier Truncation, and Missing Quadratic Feedback"}
**Hand derivation, not formalized in this book.** On $\Omega=\mathbb T^3$ or $\mathbb R^3$, fix $s>5/2$. On every compact time interval $I$ before blow-up, assume divergence-free velocity $u\in C(I;H^s(\Omega;\mathbb R^3))\cap C^1(I;H^{s-2})$, original force $f\in C(I;H^{s-2})$, and the NS equation in $H^{s-2}$. Assume pressure is a distribution on $\Omega$ (periodic on the torus), with $\nabla p\in H^{s-2}$ and $\mathbb P\nabla p=0$. Let $\mathbb P$ be the Leray projection onto divergence-free fields and set $F=\mathbb P f$, $L=\nu\Delta$, and $B(v,w)=\mathbb P((v\cdot\nabla)w)$. Then $\partial_tu=Lu-B(u,u)+F$. The projected force $F$ need not inherit compact support from the original force $f$.

Take a fixed, time-independent bounded low-pass Fourier truncation $\Pi$ with $\Pi^2=\Pi$, commuting with spatial derivatives, $\Delta$, and $\mathbb P$ on the Sobolev spaces used here. For example, fix $K>0$ and multiply each component by the indicator of $\{|k|\le K\}$. Finitely many torus frequencies give a finite-dimensional projection; whole-space frequency truncation generally remains infinite-dimensional. Boundedness and time independence give $\partial_t\Pi u=\Pi\partial_tu$. The stated regularity makes the products and identities meaningful in $H^{s-2}$; these commutations are not used at the singular time.

Writing $a=\Pi u$ and $b=(1-\Pi)u$ gives

$$
\begin{aligned}
\partial_t a={}&La-\Pi B(a,a)+\Pi F\\
&-\Pi\bigl(B(a,b)+B(b,a)\bigr)\\
&-\Pi B(b,b).
\end{aligned}
$$

The last two lines contain the missing information: two visible–hidden mixed terms and one hidden square. The five-mode witness above is the mixed term $+i/4$; the minus sign in the vector field produces the acceleration gap $-i/4$. It does not witness a nonzero hidden square.

The paper's pulse mechanism emphasizes a different effect: cylindrical velocity components can have zero angular mean while their quadratic momentum flux has nonzero mean, supplying stress to the background flow and correcting its momentum residual. The simplest calculation uses $w(\theta)=A\cos(m\theta)$ for a nonzero integer $m$: its angular mean is $0$, while the mean of $w^2$ is $A^2/2$. This scalar example only shows how squared feedback can survive; it does not verify the paper's vector pulse. Angular averaging differs from this low-pass $\Pi$. The cylindrical basis depends on angle, so pressure, geometric terms, and derivative commutations require the paper's separate treatment. No formalized bridge between the constructions is supplied. A blow-up proof still requires growth across scales, competition with viscosity, residual estimates of every order, and a limiting construction.
:::

::: {.example #ex-ch30-dissipative-no-closure title="A Dissipative Quadratic System with No Closure and No Blow-Up"}
**Hand calculation, not formalized in this book.** Observe only the first coordinate $x$ of this system on $\mathbb R^2$:

$$
\begin{aligned}
\dot x&=-\nu x-y^2,\\
\dot y&=-\nu y+xy,\qquad\nu\ge0.
\end{aligned}
$$

The states $(0,0)$ and $(0,1)$ have the same visible reading $0$, but visible derivatives $0$ and $-1$. Thus no law $\dot x=g(x)$ works for all states. Yet the cross terms cancel:

$$
\begin{aligned}
\frac{d}{dt}(x^2+y^2)
&=2x(-\nu x-y^2)\\
&\quad+2y(-\nu y+xy)\\
&=-2\nu(x^2+y^2),\\
x(t)^2+y(t)^2&=(x(0)^2+y(0)^2)e^{-2\nu t}.
\end{aligned}
$$

The polynomial vector field is locally smooth, and bounded forward trajectories extend through every finite positive time. Energy decays for $\nu>0$ and is conserved for $\nu=0$; neither case has forward finite-time blow-up. This refutes the general inference that failure of closure alone forces blow-up; it is not a counterexample to NS. Nonclosure only rules out exact instantaneous prediction for all states under the chosen projection. It leaves room for approximate closure, memory terms, augmented states, or other projections, and supplies no complexity lower bound.
:::

::: {.viz src="navier-stokes-p-np" height="640"}
**Interactive laboratory `ORTHO//VORTEX`**: the three scenes of this section. The two halves of the advection term: tune $s$ between the stagnation flow and rigid rotation and watch the Lamb half appear with the vorticity; the vortex tube: no stretching in two dimensions, thinning under steady strain in three until the Burgers core $4\pi\nu/\alpha$, and a pinch in finite time under the schematic self-stretching closure; closure: when an observer of $x$ alone can predict the next step (the criterion and the five-mode instance without closure are verified in Lean). The tube scene is a schematic model, not a numerical solution of the Navier–Stokes equations.
:::

---

