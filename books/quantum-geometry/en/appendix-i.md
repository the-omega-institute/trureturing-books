# Appendix I Quantum Information Divergences, Reverse-Test Attainment, Subentropy, and Approximate Recovery Duality {#sec-appendix-i}

Across the main chapters of this monograph, several geometric threads already converged on the information ledger of irreversible quantum processes: [Chapter 4](ch04-decoherence.md) cast decoherence and quantum noise as contractions and pinchings that pull pure states on the spherical shell into truncated chords inside the ball; [Chapter 8](ch08-erasure-and-time-arrows.md) tracked the monotone dissipation of state distinguishability under erasure and coarse-graining; [Chapter 13](ch13-entanglement-and-chsh.md) separated the separable convex hull from quantum entanglement via correlation geometry; and [Chapter 14](ch14-cloning-codes-and-braids.md) together with [§14.3](ch14-s03-logical-recovery.md) constructed isometric logical recovery inside pairwise orthogonal syndrome subspaces. Once we press beyond those qualitative pictures toward sharp variational boundaries—**Can the convex divergence between two non-commuting positive normal functionals be achieved exactly by a concrete classical reverse test? How does a dual balance certificate certify the unique transport barycenter of positive-definite matrices? How much accessible information can a single measurement extract from a classical-quantum ensemble, and how tightly does it bound guessing error? How can a Kraus family supported only on a proper projector be completed into a trace-preserving quantum channel on the full space? And when a positive semidefinite bipartite operator lies outside the separable cone, how does conic projection produce an explicit separating witness without trial-and-error search?**—divergences, matrix transport geometry, subentropy bounds, channel completion, and conic residual witnesses must be audited side by side.

To keep our epistemic boundaries unmistakable, we state the scope contract of this appendix upfront. Sections I.1–I.5 establish five kernel-verified pillars in sequence: **extended-value attainment for general convex reverse tests** (`I.1`), **dual-certified Bures–Wasserstein barycenters on positive-definite matrices** (`I.2`), **conditional subentropy and guessing-probability bounds for finite classical-quantum ensembles** (`I.3`), **trace-preserving quantum-channel completion of projection-supported Kraus families** (`I.4`), and **the canonical Hilbert–Schmidt residual witness of the nearest separable cone point** (`I.5`). Conceptually, these five results trace a progression from variational attainment representations to positive-definite matrix transport, accessible ensemble information, constructive channel completion, and conic approximation obstructions. The phrase "approximate recovery duality" in the appendix title names the thematic direction juxtaposing **constructive channel completion** (`I.4`) against **dual certificates of conic non-attainability** (`I.5`); it **does not** claim that the frozen theorems proven here establish a unified approximate-recovery master bound for arbitrary quantum channels, nor that `I.4` and `I.5` form primal and dual sides of a single recovery optimization problem. Section I.6 audits the carrier types, hypotheses, total-function guards, and non-claims of all five results in a single reference table.

---

## I.1 Extended-Value Attainment for General Convex Reverse Tests {#sec-appendix-i-1}

In finite-dimensional classical probability, an $f$-divergence $D_f(p \| q) = \sum_x q(x)\,f\bigl(p(x)/q(x)\bigr)$ measures the convex curvature cost paid whenever $p$ departs from proportionality to $q$. When passing to non-commuting operators—and especially to general von Neumann algebras—one canonical variational route lifts classical likelihood ratios via a **reverse test**: one searches over measurable spaces $(X, \mu)$, $\mu$-almost-everywhere nonnegative integrable densities $(p, q)$, and positive, mass-preserving, order-normal classical-to-quantum preparation maps $\Gamma$ satisfying $\Gamma(p) = \rho$ and $\Gamma(q) = \sigma$, evaluating the classical perspective cost on the input side. The central analytical question is whether the infimum over all such reverse tests across a given universe level remains merely an unattained limiting infimum, or whether—for every function $f$ convex on the open positive half-line $(0, \infty)$—that extended-real infimum is **attained exactly** on the compact posterior interval $[0, 1]$ by a regular finite Borel measure and a contractive normal positive $L^1$ preparation.

Before stating the general $W^*$-algebraic theorem, let us work through this posterior reparameterization by hand on the simplest commutative two-point von Neumann algebra $M \cong \mathbb{C} \oplus \mathbb{C}$ acting diagonally on $H = \mathbb{C}^2$. Take the two positive normal functionals given by the diagonal weights

$$
\rho = \left(\frac{1}{3},\, \frac{2}{3}\right), \qquad \sigma = \left(\frac{2}{3},\, \frac{1}{3}\right), \qquad \rho + \sigma = (1,\, 1).
$$

Under the sum functional $\rho + \sigma$, each minimal coordinate projection carries unit mass $1$ (total mass $(\rho + \sigma)(1) = 2$), while the **posterior coordinate** $t = \frac{d\rho}{d(\rho + \sigma)} \in [0, 1]$ takes the values $t_1 = 1/3$ and $t_2 = 2/3$, with complementary density $1 - t$ taking $2/3$ and $1/3$. Consequently, the scalar Riesz measure on $[0, 1]$ is the two-atom measure $\nu = \delta_{1/3} + \delta_{2/3}$: integrating the constant $1$ recovers total mass $1 + 1 = 2$, while integrating the coordinate functions $t$ and $1 - t$ against the two minimal states prepares $\rho$ and $\sigma$ exactly. Now choose the relative-entropy generator $f(x) = x \ln x$ on $(0, \infty)$, which satisfies $f(1) = 0$, right derivative $f'_+(1) = 1$, and second-derivative curvature measure $d\kappa_f(s) = s^{-1}\,ds$ on $(0, \infty)$. To avoid undefined ratios or logarithms on singular supports where $p = 0$ or $q = 0$, the closed perspective cost writes the divergence as the affine tangent at $x = 1$ plus a two-sided positive-hinge curvature integral: when $p/q \le 1$ (as at the first point $p_1 = 1/3,\, q_1 = 2/3$), only the $(0, 1]$ hinge contributes, giving

$$
(p_1 - q_1) + \int_{p_1/q_1}^{1} \frac{s q_1 - p_1}{s}\,ds = (p_1 - q_1) + (q_1 - p_1) + p_1 \ln\frac{p_1}{q_1} = -\frac{1}{3}\ln 2;
$$

when $p/q > 1$ (as at the second point $p_2 = 2/3,\, q_2 = 1/3$), only the $(1, \infty)$ hinge contributes, giving

$$
(p_2 - q_2) + \int_{1}^{p_2/q_2} \frac{p_2 - s q_2}{s}\,ds = (p_2 - q_2) + p_2 \ln\frac{p_2}{q_2} - (p_2 - q_2) = \frac{2}{3}\ln 2.
$$

Summing the two atoms gives $-\frac{1}{3}\ln 2 + \frac{2}{3}\ln 2 = \frac{1}{3}\ln 2$. Because coarse-graining any classical preparation onto its posterior ratio $t \in [0, 1]$ can never increase the closed perspective cost by convexity, this two-atom posterior moment family achieves the exact extended-real infimum $\frac{1}{3}\ln 2 \neq \perp$.

We now spell out the exact analytical objects appearing in the frozen Lean signature:

1. **Order-Normal Functionals on a Concrete von Neumann Algebra**: Let $(H : \mathsf{Type}\;v)$ be a complete complex inner-product space, let $M$ be a concrete von Neumann algebra on $H$ (`VonNeumannAlgebra H`), and write $A := M.\mathrm{toStarSubalgebra}$ for its underlying unital $C^*$-subalgebra. A continuous linear functional $\varphi \in \operatorname{StrongDual}\;\mathbb{C}\;A$ is **order-normal** (`IsOrderNormal φ`) if for every nonempty upward-directed subset $s \subseteq A$ of positive elements ($\forall x \in s,\; 0 \le x$) with least upper bound $a$ (`IsLUB s a`) and every $\varepsilon > 0$, there exists $b \in s$ such that $\|\varphi(a - x)\| < \varepsilon$ whenever $x \in s$ satisfies $b \le x$. The theorem assumes $\rho, \sigma \in \operatorname{StrongDual}\;\mathbb{C}\;A$ are positive on positive operators ($\forall a \ge 0,\; 0 \le \rho(a)$ and $0 \le \sigma(a)$ in `ComplexOrder`) and satisfy `IsOrderNormal (ρ + σ)`.
2. **Positive-Ray Convex Generators and Extended-Real Closed Perspective Cost**: Let $f : \mathbb{R} \to \mathbb{R}$ satisfy `hf : ConvexOn ℝ (Ioi 0) f` on the open positive ray $I_{>0} := (0, \infty)$ (`Positive`; values of $f$ on $(-\infty, 0]$ never enter the construction). Its right derivative $\operatorname{rightDeriv}(f, x) := \operatorname{derivWithin}\;f\;(x, \infty)\;x$ is monotone and right-continuous on $(0, \infty)$, defining the Stieltjes function `curvatureDistribution hf` and its Borel curvature measure $\kappa_f := \operatorname{curvature}(hf)$ on $(0, \infty)$. For any $u, v \in \mathbb{R}$, the nonnegative extended-real hinge remainder (`curvatureRemainder`, valued in $\mathbb{R}_{\ge 0}^\infty$) is

   $$
   \operatorname{curvatureRemainder}(hf, u, v) := \int_{(0, 1]}^{-} \operatorname{ofReal}(t v - u)\,d\kappa_f(t) + \int_{(1, \infty)}^{-} \operatorname{ofReal}(u - t v)\,d\kappa_f(t),
   $$

   where `ofReal` truncates nonpositive reals to $0$. Given a measure $\nu$ on a measurable space $\alpha$ and real functions $p, q : \alpha \to \mathbb{R}$, the **closed perspective cost** (`closedPerspectiveCost`), valued in $\operatorname{EReal} = \mathbb{R} \cup \{\perp, \top\}$ (i.e., $[-\infty, +\infty]$), is defined by

   $$
   \operatorname{closedPerspectiveCost}(hf, \nu, p, q) := \left(\int_\alpha \bigl(f(1)\,q(x) + \operatorname{rightDeriv}(f, 1)\,(p(x) - q(x))\bigr)\,d\nu(x) : \operatorname{EReal}\right) + \int_\alpha^{-} \operatorname{curvatureRemainder}(hf, p(x), q(x))\,d\nu(x).
   $$

   Because this formula combines a real Bochner integral cast into $\operatorname{EReal}$ with an $\mathbb{R}_{\ge 0}^\infty$-valued Lebesgue hinge integral, it requires no division by zero or logarithm of nonpositive arguments at boundary points, and it legitimately takes the value $+\infty = \top \in \operatorname{EReal}$ whenever the curvature integral diverges.
3. **Posterior Moment Families and Normal $L^1$ Reverse Tests**: Write $\operatorname{Interval} := [0, 1]$ and $\operatorname{posterior} \in C(\operatorname{Interval}, \mathbb{C})$ for $t \mapsto t$. A compatible posterior moment family $F \in \operatorname{Family}(\rho, \sigma)$ is a map $F : C(\operatorname{Interval}, \mathbb{C}) \to \operatorname{WeakDual}\;\mathbb{C}\;A$ that is $\mathbb{C}$-linear, sends pointwise nonnegative functions to positive functionals on $A$, and obeys the boundary moment identities $F(1) = \rho + \sigma$ and $F(\operatorname{posterior}) = \rho$ (whence $F(1 - \operatorname{posterior}) = \sigma$). Its promoted strong-dual map is `linearMap F : C(Interval, ℂ) →ₗ[ℂ] StrongDual ℂ A`; applying Riesz–Markov–Kakutani representation to $u \mapsto \operatorname{Re}\bigl((\operatorname{linearMap}\;F\;u)(1)\bigr)$ on $C_c(\operatorname{Interval}, \mathbb{R})$ produces the Borel measure `scalarMeasure F` on $[0, 1]$, its pushforward `liftedMeasure.{u} (scalarMeasure F)` onto `ULift.{u} Interval`, and the family cost

   $$
   \operatorname{familyCost}(hf, F) := \operatorname{closedPerspectiveCost}\bigl(hf,\, \operatorname{scalarMeasure}(F),\, (t \mapsto t),\, (t \mapsto 1 - t)\bigr).
   $$

   On a measurable space $(X, \mu)$, a **normal $L^1$ preparation** `NormalL1Preparation μ` is a $\mathbb{C}$-linear map $\Gamma_0 : L^1(\mu; \mathbb{C}) \to \operatorname{StrongDual}\;\mathbb{C}\;A$ preserving positivity for $\mu$-a.e. nonnegative functions, satisfying $\Gamma_0(h)(1) = \int_X h\,d\mu$, and outputting order-normal functionals `IsOrderNormal (Γ₀ h)`. A **normal $L^1$ reverse test** `NormalL1ReverseTest ρ σ μ` pairs a normal $L^1$ preparation with measurable, $\mu$-integrable, $\mu$-a.e. nonnegative real functions $p, q : X \to \mathbb{R}$ whose complex $L^1$ classes map to $\rho$ and $\sigma$. Collecting `closedPerspectiveCost hf μ (re ∘ p) (re ∘ q)` over all measurable spaces $(X : \mathsf{Type}\;u)$, $\sigma$-finite measures $\mu$, normal $L^1$ preparations $\Gamma_0$, and $\mu$-a.e. nonnegative $p, q \in L^1(\mu; \mathbb{C})$ with $\Gamma_0(p) = \rho$ and $\Gamma_0(q) = \sigma$ yields `attainableCosts.{u} hf ρ σ : Set EReal`.

::: {.theorem #thm-appi-reverse-test-attainment lean="D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.original_reverse_test_extended_attainment" title="Extended-Value Attainment for General Convex Reverse Tests"}
Let $u, v$ be universe levels, let $(H : \mathsf{Type}\;v)$ be a complete complex inner-product space, let $M$ be a von Neumann algebra on $H$ (`VonNeumannAlgebra H`), and let $\rho, \sigma \in \operatorname{StrongDual}\;\mathbb{C}\;M.\mathrm{toStarSubalgebra}$ satisfy $0 \le \rho(a)$ and $0 \le \sigma(a)$ for all $a \ge 0$ together with `IsOrderNormal (ρ + σ)`. Then for every $f : \mathbb{R} \to \mathbb{R}$ satisfying `hf : ConvexOn ℝ (Ioi 0) f`, there exists a posterior moment family $F \in \operatorname{Family}(\rho, \sigma)$ satisfying all of the following:

1. **Attainment of the Extended-Real Infimum by Family Cost**:

   $$
   \operatorname{familyCost}(hf, F) = \inf \operatorname{attainableCosts}.\{u\}(hf, \rho, \sigma);
   $$

2. **Exclusion of $-\infty$ and Zero-State Normalization**: $\inf \operatorname{attainableCosts}.\{u\}(hf, \rho, \sigma) \neq \perp$, and if both $\rho = 0$ and $\sigma = 0$, then $\inf \operatorname{attainableCosts}.\{u\}(hf, \rho, \sigma) = 0$;
3. **Regularity and Finiteness of the Scalar Measure**: $\operatorname{scalarMeasure}(F)$ is regular (`Regular`), and its universe-lifted pushforward $\operatorname{liftedMeasure}.\{u\}(\operatorname{scalarMeasure}(F))$ is a finite measure (`IsFiniteMeasure`);
4. **Attaining Normal $L^1$ Reverse Test**: On $\mu_F := \operatorname{liftedMeasure}.\{u\}(\operatorname{scalarMeasure}(F))$, there exists $R : \operatorname{NormalL1ReverseTest}\;\rho\;\sigma\;\mu_F$ with densities $R.p(x) = x.\mathrm{down}.\mathrm{val}$ and $R.q(x) = 1 - x.\mathrm{down}.\mathrm{val}$ such that

   $$
   \operatorname{closedPerspectiveCost}(hf, \mu_F, R.p, R.q) = \inf \operatorname{attainableCosts}.\{u\}(hf, \rho, \sigma);
   $$

5. **Contractive Normal Positive $L^1$ Preparation Extension**: There exists a continuous $\mathbb{C}$-linear map

   $$
   \Gamma : L^1\bigl(\operatorname{Interval}, \operatorname{scalarMeasure}(F); \mathbb{C}\bigr) \longrightarrow_L \operatorname{StrongDual}\;\mathbb{C}\;M.\mathrm{toStarSubalgebra}
   $$

   extending `linearMap F` via $\Gamma([g]_{L^1}) = \operatorname{linearMap}\;F\;g$ for every $g \in C(\operatorname{Interval}, \mathbb{C})$, such that every output satisfies `IsOrderNormal (Γ h)` and $(\Gamma h)(1) = \int_{\operatorname{Interval}} h(t)\,d\operatorname{scalarMeasure}(F)(t)$, $\operatorname{scalarMeasure}(F)$-a.e. nonnegativity $0 \le h(t)$ implies $0 \le (\Gamma h)(a)$ for all $a \ge 0$, the operator norm obeys $\|\Gamma\| \le 1$, and

   $$
   \Gamma([\operatorname{posterior}]_{L^1}) = \rho, \qquad \Gamma([1 - \operatorname{posterior}]_{L^1}) = \sigma.
   $$

:::

::: proof
The argument combines a variational lower-bound reduction with a concrete $W^*$-algebraic realization. First, given any candidate $\sigma$-finite normal $L^1$ reverse test on $(X, \mu)$ preparing $(\rho, \sigma)$, normalizing by total source mass $m(x) = p(x)_+ + q(x)_+$ and pushing forward along the posterior ratio $p/(p+q) \in [0, 1]$ compresses the test onto $\operatorname{Interval} = [0, 1]$; by the positive-hinge curvature representation of $f$ on $(0, \infty)$ and Jensen monotonicity, this posterior reduction never increases `closedPerspectiveCost`, while integrability of the affine baseline and nonnegativity of `curvatureRemainder` rule out $\perp = -\infty$ (with zero functionals yielding cost $0$). Second, on the concrete von Neumann algebra $M$ over the complete space $H$, order normality of $\rho + \sigma$ together with maximal hockey-stick / Radon–Nikodym spectral families constructs a compatible moment family $F \in \operatorname{Family}(\rho, \sigma)$, from which Riesz representation extracts the regular finite Borel measure $\nu = \operatorname{scalarMeasure}(F)$ on $[0, 1]$. Because $C([0, 1], \mathbb{C})$ is dense in $L^1(\nu; \mathbb{C})$ and positive decomposition bounds the strong-dual norm by the $L^1(\nu)$ norm ($\|\operatorname{linearMap}\;F\;g\| \le \|g\|_{L^1(\nu)}$), `linearMap F` extends uniquely by continuity to a norm-contractive ($\|\Gamma\| \le 1$), positive, mass-preserving, order-normal operator $\Gamma$ sending $[\operatorname{posterior}]_{L^1}$ and $[1 - \operatorname{posterior}]_{L^1}$ to $\rho$ and $\sigma$. Pushing $\nu$ onto `ULift.{u} Interval` embeds this canonical test into universe $u$, matching $\inf \operatorname{attainableCosts}.\{u\}$. The full proof is checked by the Lean kernel.
:::

Three scope guardrails govern [@thm-appi-reverse-test-attainment]. First, extended-value attainment means the infimum in $\operatorname{EReal}$ is achieved by an actual reverse test and cannot be $\perp = -\infty$; it **does not** assert that the minimal divergence is finite—when $\rho$ fails appropriate domination by $\sigma$, both the infimum and `familyCost` can equal $+\infty$. Second, `scalarMeasure F` is a regular finite Borel measure on $[0, 1]$, **not** necessarily a finite sum of discrete atoms on infinite-dimensional algebras. Third, the theorem is non-constructive and supplies no numerical solver.

---

## I.2 Dual Certificate for a Bures–Wasserstein Barycenter {#sec-appendix-i-2}

Whereas Section I.1 compared two positive functionals longitudinally along scalar posterior ratios, fusing a finite collection of strictly positive-definite matrices $A_1, \dots, A_n$ under strictly positive weights $w_1, \dots, w_n$ calls for the Riemannian transport geometry of the **Bures–Wasserstein distance**. Taking a naive arithmetic average $\sum_j w_j A_j$ ignores non-commuting eigenframe rotations and inflates volume; the transport barycenter instead minimizes the weighted squared distance $\sum_j w_j\,d_{\mathrm{BW}}(X, A_j)^2$ over the positive-definite cone. Because the matrix fixed-point equation is nonlinear, what one wants in verification is a clean algebraic **dual balance certificate**: given a candidate positive-definite matrix $W$ and positive-definite transport maps $T_j$, two matrix identities alone should certify global optimality and strict uniqueness.

Let us verify this mechanism by hand in the scalar case $m = 1,\, n = 2$. Take $A_1 = [1]$, $A_2 = [9]$, and equal weights $w_1 = w_2 = 1/2$. For positive scalars $x, a > 0$, the matrix square root reduces to $\sqrt{x}$, so the Bures–Wasserstein distance becomes the Euclidean distance between square roots:

$$
d_{\mathrm{BW}}(x, a) = \sqrt{x + a - 2\sqrt{x a}} = \lvert\sqrt{x} - \sqrt{a}\rvert.
$$

Inspect the candidate barycenter $W = [4] > 0$ paired with the positive-definite transport scalars $T_1 = [1/2] > 0$ and $T_2 = [3/2] > 0$. Both dual certificate equations hold on sight:

$$
T_1 W T_1 = \frac{1}{2}\cdot 4 \cdot \frac{1}{2} = 1 = A_1, \qquad T_2 W T_2 = \frac{3}{2}\cdot 4 \cdot \frac{3}{2} = 9 = A_2, \qquad w_1 T_1 + w_2 T_2 = \frac{1}{2}\cdot\frac{1}{2} + \frac{1}{2}\cdot\frac{3}{2} = 1.
$$

Now expand the weighted squared-distance objective at an arbitrary positive scalar $x > 0$:

$$
\frac{1}{2}\bigl(\sqrt{x} - 1\bigr)^2 + \frac{1}{2}\bigl(\sqrt{x} - 3\bigr)^2 = \bigl(\sqrt{x} - 2\bigr)^2 + 1 \ge 1,
$$

which achieves its strict unique minimum $1$ on $(0, \infty)$ if and only if $\sqrt{x} = 2$, i.e., $x = 4 = W$. Notice that the arithmetic mean $X_{\mathrm{arith}} = \frac{1 + 9}{2} = 5$ incurs a strictly larger cost $(\sqrt{5} - 2)^2 + 1 = 10 - 4\sqrt{5} \approx 1.0557 > 1$; the balance identity $\sum_j w_j T_j = 1$ cancels the first-order variation in square-root coordinates and locks the minimum onto $W = 4$.

On $m \times m$ complex matrices $M_m(\mathbb{C}) := \operatorname{Matrix}\;(\operatorname{Fin}\;m)\;(\operatorname{Fin}\;m)\;\mathbb{C}$ ($m \in \mathbb{N}$), the frozen declarations use the following definitions:

1. **Spectral Power and Bures–Wasserstein Distance**: For $X \in M_m(\mathbb{C})$ and $p \in \mathbb{R}$, the spectral power is defined via continuous functional calculus as $\operatorname{mpow}(X, p) := \operatorname{cfc}(t \mapsto t^p, X)$ (abbreviated $X^{1/2}$ at $p = 1/2$). For $A, B \in M_m(\mathbb{C})$, `buresWassersteinDistance` is the total real-valued function

   $$
   d_{\mathrm{BW}}(A, B) := \sqrt{\operatorname{Re}\operatorname{Tr}(A + B) - 2\,\operatorname{Re}\operatorname{Tr}\!\left(\bigl(A^{1/2} B A^{1/2}\bigr)^{1/2}\right)},
   $$

   where `Real.sqrt` takes the nonnegative square root on positive-definite inputs (its total-function zero convention on negative reals is never triggered inside the positive-definite cone).
2. **Formal Barycenter Selector**: Given weights $w : \operatorname{Fin}\;n \to \mathbb{R}$ and matrices $A : \operatorname{Fin}\;n \to M_m(\mathbb{C})$, `wassersteinBarycenter w A` applies Hilbert's choice operator `Classical.epsilon` to select a matrix $X \in M_m(\mathbb{C})$ satisfying `X.PosDef` and

   $$
   \sum_{j \in \operatorname{Fin}\;n} w_j\,d_{\mathrm{BW}}(X, A_j)^2 \le \sum_{j \in \operatorname{Fin}\;n} w_j\,d_{\mathrm{BW}}(Y, A_j)^2
   $$

   for every $Y \in M_m(\mathbb{C})$ with `Y.PosDef`. Because `Classical.epsilon` is a total selector, its optimization semantics are fixed once existence and uniqueness of a `PosDef` minimizer are established.

::: {.theorem #thm-appi-bures-dual-barycenter lean="D5/S3/Quantum/Matrix/BuresWassersteinTransport.finite_barycenter_of_dual" title="Dual Certificate for a Bures–Wasserstein Barycenter"}
Let $m, n \in \mathbb{N}$, and let weights $w : \operatorname{Fin}\;n \to \mathbb{R}$ satisfy $0 < w_j$ for all $j$ and $\sum_{j} w_j = 1$ (which forces $n \ge 1$). Let $A, T : \operatorname{Fin}\;n \to M_m(\mathbb{C})$ and $W \in M_m(\mathbb{C})$ satisfy the following strict positive-definiteness and dual transport-balance hypotheses:

1. For every $j \in \operatorname{Fin}\;n$, `(A j).PosDef` and `(T j).PosDef` hold, together with `W.PosDef`;
2. **Transport Identities**: For every $j \in \operatorname{Fin}\;n$, $T_j W T_j = A_j$;
3. **Weighted Balance Identity**: $\sum_{j} w_j \cdot T_j = I_m$.

Then all three conclusions hold:

1. **Global Optimality Over the Positive-Definite Cone**: For every $X \in M_m(\mathbb{C})$ with `X.PosDef`,

   $$
   \sum_{j} w_j\,d_{\mathrm{BW}}(W, A_j)^2 \le \sum_{j} w_j\,d_{\mathrm{BW}}(X, A_j)^2;
   $$

2. **Strict Uniqueness Over the Positive-Definite Cone**: For every $X \in M_m(\mathbb{C})$ with `X.PosDef`,

   $$
   \sum_{j} w_j\,d_{\mathrm{BW}}(X, A_j)^2 \le \sum_{j} w_j\,d_{\mathrm{BW}}(W, A_j)^2 \iff X = W;
   $$

3. **Identification of the Barycenter Selector**: $\operatorname{wassersteinBarycenter}(w, A) = W$.
:::

::: proof
Under strict positive-definiteness, substituting $A_j = T_j W T_j$ into the fidelity root at $W$ yields $\bigl(W^{1/2} A_j W^{1/2}\bigr)^{1/2} = \bigl((W^{1/2} T_j W^{1/2})^2\bigr)^{1/2} = W^{1/2} T_j W^{1/2}$, whose real trace equals $\operatorname{Re}\operatorname{Tr}(W T_j)$. For any competitor $X$ satisfying `X.PosDef`, the operator fidelity-transport bound and Young equality rigidity (`fidelity_transport` and `fidelity_young_rigid`), gauged against the positive-definite operator $T_j$, upper-bound the cross-term via $2\,\operatorname{Re}\operatorname{Tr}\bigl((X^{1/2} A_j X^{1/2})^{1/2}\bigr) \le \operatorname{Re}\operatorname{Tr}(X T_j + T_j^{-1} A_j) = \operatorname{Re}\operatorname{Tr}(X T_j + W T_j)$. Summing over $j$ with strictly positive weights $w_j > 0$ and applying $\sum_j w_j T_j = I_m$ together with $\sum_j w_j = 1$ cancels $\sum_j w_j\,\operatorname{Re}\operatorname{Tr}(X T_j) = \operatorname{Re}\operatorname{Tr}(X)$ against $\operatorname{Re}\operatorname{Tr}(X)$ in the squared Bures–Wasserstein expansion, establishing $\sum_j w_j\,d_{\mathrm{BW}}(W, A_j)^2 \le \sum_j w_j\,d_{\mathrm{BW}}(X, A_j)^2$. Whenever the reverse inequality holds, positivity $w_j > 0$ forces equality for every $j$, and operator Young rigidity forces $X = W$. Because $W$ satisfies `W.PosDef` and uniquely minimizes the objective among all `PosDef` matrices, the `Classical.epsilon` selector `wassersteinBarycenter w A` equals $W$. The full proof is checked by the Lean kernel.
:::

Note the exact scope of [@thm-appi-bures-dual-barycenter]: it certifies optimality and uniqueness **given** a positive-definite dual witness $(W, T)$. It neither constructs an existence algorithm without a certificate nor extends unconditional uniqueness to singular positive semidefinite boundary matrices.

---

## I.3 Conditional Subentropy and Guessing-Probability Bounds {#sec-appendix-i-3}

Sections I.1 and I.2 analyzed divergences and transport centers between quantum states. Suppose now that a sender draws a classical label $x \in X$ from a finite prior $p(x)$ and prepares a quantum state $\rho_x$ on a finite-dimensional system $B$, while a receiver performs a single positive operator-valued measure (POVM) to guess $x$. Whereas von Neumann entropy governs asymptotic multi-copy coding rates (the Holevo direction), the Jozsa–Robb–Wootters **subentropy** $Q(\rho)$ captures a single-copy accessible-information lower benchmark. Here we show that the **conditional subentropy** of the classical-quantum record state relative to the marginal mixture sandwiches the single-shot guessing error $1 - p_{\mathrm{guess}}$ and its logarithmic upper bound $-\ln p_{\mathrm{guess}}$.

Let us test two opposite two-label single-qubit ensembles ($X = \{0, 1\},\, p(0) = p(1) = 1/2,\, B = \operatorname{Fin}\;2$) by hand, seeing along the way why subentropy must be defined as a determinant integral rather than by a naive divided-difference sum. For a matrix $A$, the subentropy kernel is $k_A(t) = \frac{t}{1+t} - \frac{1}{\operatorname{Re}\det(I + t^{-1} A)}$ ($t > 0$) and $Q(A) = \int_0^\infty k_A(t)\,dt$:

- For any rank-one pure state such as $|0\rangle\langle 0| = \operatorname{diag}(1, 0)$, $\det(I + t^{-1}\operatorname{diag}(1, 0)) = 1 + t^{-1} = \frac{1+t}{t}$, whose reciprocal equals $\frac{t}{1+t}$ identically, so $k_A(t) \equiv 0$ and $Q(|0\rangle\langle 0|) = 0$.
- For a doubly degenerate spectrum such as $\operatorname{diag}(1/2, 1/2)$, $\lambda_1 = \lambda_2 = 1/2$: the familiar distinct-eigenvalue formula $-\sum_i \bigl(\prod_{j \neq i}\frac{\lambda_i}{\lambda_i - \lambda_j}\bigr)\lambda_i\ln\lambda_i$ divides by zero, whereas the determinant integral remains completely smooth:

  $$
  k_{\operatorname{diag}(1/2, 1/2)}(t) = \frac{t}{1 + t} - \frac{1}{(1 + \frac{1}{2t})^2} = \frac{t}{1 + t} - \frac{4 t^2}{(2t + 1)^2}.
  $$

  Differentiating directly verifies $\frac{d}{dt}\!\left[\ln\frac{2t + 1}{t + 1} + \frac{1}{2(2t + 1)}\right] = \frac{2}{2t + 1} - \frac{1}{t + 1} - \frac{1}{(2t + 1)^2} = \frac{t}{1 + t} - \frac{4 t^2}{(2t + 1)^2}$, so integrating from $0$ to $\infty$ yields

  $$
  Q\bigl(\operatorname{diag}(1/2, 1/2)\bigr) = \left[\ln\frac{2t + 1}{t + 1} + \frac{1}{2(2t + 1)}\right]_{0}^{\infty} = \ln 2 - \frac{1}{2} \approx 0.1931.
  $$

Now evaluate the two extreme ensembles:

1. **Equal-Prior Orthogonal Pure States** $\rho_0 = |0\rangle\langle 0|$, $\rho_1 = |1\rangle\langle 1|$: The classical-quantum record state $\rho_{XB} = \frac{1}{2}|0\rangle\langle 0|\otimes |0\rangle\langle 0| + \frac{1}{2}|1\rangle\langle 1|\otimes |1\rangle\langle 1|$ has nonzero eigenvalues $(1/2, 1/2)$ (zero eigenvalues contribute factor $1$ to $\det(I + t^{-1}A)$), giving $Q(\rho_{XB}) = \ln 2 - \frac{1}{2}$; the marginal mixture $\bar{\rho}_B = \operatorname{diag}(1/2, 1/2)$ likewise has $Q(\bar{\rho}_B) = \ln 2 - \frac{1}{2}$. Subtracting gives conditional subentropy $Q(X \mid B)_{\mathrm{sub}} = 0$. Meanwhile, the projective measurement $M_0 = |0\rangle\langle 0|,\, M_1 = |1\rangle\langle 1|$ achieves $p_{\mathrm{guess}} = 1$, tightening the chain to $0 \le 0 \le 0$.
2. **Equal-Prior Identical Pure States** $\rho_0 = \rho_1 = |0\rangle\langle 0|$: The record state $\rho_{XB} = \operatorname{diag}(1/2, 1/2) \otimes |0\rangle\langle 0|$ still has nonzero spectrum $(1/2, 1/2)$, so $Q(\rho_{XB}) = \ln 2 - \frac{1}{2}$; yet the marginal mixture $\bar{\rho}_B = |0\rangle\langle 0|$ is pure with $Q(\bar{\rho}_B) = 0$, giving conditional subentropy $Q(X \mid B)_{\mathrm{sub}} = \ln 2 - \frac{1}{2} \approx 0.1931$. Every POVM obeying $M_0 + M_1 = I_2$ has success probability $\frac{1}{2}\operatorname{Re}\operatorname{Tr}((M_0 + M_1)|0\rangle\langle 0|) = \frac{1}{2}$, so $p_{\mathrm{guess}} = 1/2$ and the bound reads

   $$
   \ln 2 - \frac{1}{2} \approx 0.1931 \;\le\; 1 - \frac{1}{2} = \frac{1}{2} \;\le\; -\ln\frac{1}{2} = \ln 2 \approx 0.6931.
   $$

In the frozen modules (`[Fintype X] [DecidableEq X] [Fintype B] [DecidableEq B]`), the formal objects are defined as follows:

1. **Finite Density States and Classical-Quantum Record States**: On `CStarMatrix n n ℂ`, a density state is `DensityState n := {rho : CStarMatrix n n ℂ // 0 ≤ rho ∧ Matrix.trace rho = 1}` (converted to `Matrix n n ℂ` via `CStarMatrix.ofMatrix.symm`). Given $p : X \to \mathbb{R}$ with $\forall x,\; 0 \le p(x)$ and $\sum_x p(x) = 1$ (forcing $X$ nonempty) and $\rho : X \to \operatorname{DensityState}\;B$ (unit trace forcing $B$ nonempty), the marginal mixture is $\operatorname{mixtureState}(p, hp, hs, \rho) := \sum_{x \in X} p(x)\,\rho(x) \in \operatorname{DensityState}\;B$, and the classical-quantum record state built from orthogonal pointer states $\operatorname{pointerState}(x) = |x\rangle\langle x|$ and Kronecker products $\operatorname{productState}$ is

   $$
   \operatorname{recordState}(p, hp, hs, \rho) := \sum_{x \in X} p(x)\,\bigl(\operatorname{pointerState}(x) \otimes_k \rho(x)\bigr) \in \operatorname{DensityState}(X \times B).
   $$

2. **Matrix Subentropy and Conditional Subentropy**: For $A \in \operatorname{Matrix}\;\iota\;\iota\;\mathbb{C}$,

   $$
   \operatorname{subentropyKernel}(A, t) := \frac{t}{1 + t} - \Bigl(\operatorname{Re}\det\bigl(I + t^{-1} A\bigr)\Bigr)^{-1}, \qquad \operatorname{matrixSubentropy}(A) := \int_{(0, \infty)} \operatorname{subentropyKernel}(A, t)\,dt,
   $$

   $\operatorname{subentropy}(\sigma) := \operatorname{matrixSubentropy}(\operatorname{ofMatrix}^{-1}(\sigma.1))$, and the classical-quantum **conditional subentropy** (`conditionalSubentropy`) is

   $$
   \operatorname{conditionalSubentropy}(p, hp, hs, \rho) := \operatorname{subentropy}\bigl(\operatorname{recordState}(p, hp, hs, \rho)\bigr) - \operatorname{subentropy}\bigl(\operatorname{mixtureState}(p, hp, hs, \rho)\bigr).
   $$

3. **POVM Success Probability and `pGuess`**: For $M : X \to \operatorname{Matrix}\;B\;B\;\mathbb{C}$, define

   $$
   \operatorname{successProbability}(p, \rho, M) := \sum_{x \in X} p(x)\,\operatorname{Re}\operatorname{Tr}\!\left(M_x \cdot \operatorname{ofMatrix}^{-1}(\rho(x).1)\right),
   $$

   collect valid POVM values into $\operatorname{successProbabilitySet}(p, \rho) := \bigl\{a \in \mathbb{R} \;\big|\; \exists M,\; (\forall x,\; M_x.\mathrm{PosSemidef}) \land \sum_{x} M_x = I_B \land a = \operatorname{successProbability}(p, \rho, M)\bigr\}$, and set $\operatorname{pGuess}(p, \rho) := \operatorname{sSup}\bigl(\operatorname{successProbabilitySet}(p, \rho)\bigr)$. Assigning $I_B$ to a label with positive prior weight and $0$ elsewhere certifies a strictly positive lower bound, while completeness $\sum_x M_x = I_B$ caps every success probability at $1$; thus $0 < \operatorname{pGuess}(p, \rho) \le 1$, ensuring `Real.log (pGuess p ρ)` evaluates the genuine positive-argument natural logarithm rather than a nonpositive total-function fallback.

::: {.theorem #thm-appi-subentropy-guessing lean="D5/S3/Quantum/Subentropy/POVMGram.cq_conditional_subentropy_guessing" title="Conditional Subentropy and Guessing-Probability Bounds"}
Let $X, B$ be finite types with decidable equality (`[Fintype X] [DecidableEq X] [Fintype B] [DecidableEq B]`), let $p : X \to \mathbb{R}$ satisfy $0 \le p(x)$ for all $x \in X$ (`hp`) and $\sum_{x \in X} p(x) = 1$ (`hs`), and let $\rho : X \to \operatorname{DensityState}\;B$ be a finite ensemble of density states. Then

$$
\operatorname{conditionalSubentropy}(p, hp, hs, \rho) \;\le\; 1 - \operatorname{pGuess}(p, \rho) \;\le\; -\operatorname{Real.log}\bigl(\operatorname{pGuess}(p, \rho)\bigr).
$$

:::

::: proof
Take any valid POVM $M$ satisfying $\forall x,\; M_x.\mathrm{PosSemidef}$ and $\sum_{x \in X} M_x = I_B$. Using the classical-quantum POVM Gram representation and diagonal pinching-gap estimates (`ClassicalQuantumGram` and `PinchingGap`), one expresses the difference of determinant-kernel integrals between `recordState` and `mixtureState` across $t \in (0, \infty)$ and separates the diagonal guessing weight from the off-block remainder, proving $\operatorname{conditionalSubentropy}(p, hp, hs, \rho) \le 1 - \operatorname{successProbability}(p, \rho, M)$ for every valid POVM $M$. Because `successProbabilitySet p ρ` is nonempty (putting $I_B$ on a positive-prior label witnesses positivity) and bounded above by $\sum_x p(x) = 1$, passing to the conditional supremum `pGuess p ρ = sSup ...` yields the first inequality together with $0 < \operatorname{pGuess}(p, \rho) \le 1$. Applying the elementary tangent bound $\ln u \le u - 1$ (equivalently $1 - u \le -\ln u$) at $u = \operatorname{pGuess}(p, \rho) > 0$ gives the second inequality. The full proof is checked by the Lean kernel.
:::

Keep in mind that [@thm-appi-subentropy-guessing] bounds the integral-defined **conditional subentropy**—it must never be conflated with von Neumann conditional entropy $S(X \mid B)$ (for identical pure states, $S(X \mid B) = \ln 2 \approx 0.6931$ strictly exceeds $\ln 2 - 1/2 \approx 0.1931$), nor read as asserting general tripartite strong subadditivity for subentropy.

---

## I.4 Quantum-Channel Completion of a Projection-Supported Kraus Family {#sec-appendix-i-4}

Recall the error-correction recovery setting of [Chapter 14 §14.3](ch14-s03-logical-recovery.md): when recovery operators $K_i$ are tailored to pairwise orthogonal correctable subspaces, their completeness sum $\sum_i K_i^\dagger K_i = P$ equals a self-adjoint idempotent projector ($P^\dagger = P$, $P^2 = P$). Whenever $P \neq I$, however, the map $X \mapsto \sum_i K_i X K_i^\dagger$ is only a trace-nonincreasing completely positive subchannel on the full input space—any weight leaking into the orthogonal complement $I - P$ is lost from the trace. To embed a projection-supported Kraus family inside a valid quantum circuit, one completes it into a trace-preserving quantum channel (CPTP map) on the entire space by choosing a reference output label $v \in b$ and resetting all residual trace on $I - P$ onto $|v\rangle\langle v|$.

Check this reset completion by hand on $2 \times 2$ matrices ($a = b = \operatorname{Fin}\;2$): take $P = \operatorname{diag}(1, 0) = |0\rangle\langle 0|$, a single Kraus operator $K_0 = P$ satisfying $K_0^\dagger K_0 = P$, and reset index $v = 0 \in \operatorname{Fin}\;2$ (`Matrix.single 0 0 1 = diag(1, 0)`). For any complex matrix $X = \begin{pmatrix} x_{00} & x_{01} \\ x_{10} & x_{11} \end{pmatrix}$, the projected Kraus branch retains $P X P = \operatorname{diag}(x_{00}, 0)$, while $(I_2 - P) X = \begin{pmatrix} 0 & 0 \\ x_{10} & x_{11} \end{pmatrix}$ has complex trace $\operatorname{Tr}\bigl((I_2 - P) X\bigr) = x_{11}$. Adding the reset term produces

$$
\Phi(X) = P X P + \operatorname{Tr}\bigl((I_2 - P) X\bigr)\,E_{0,0} = \begin{pmatrix} x_{00} + x_{11} & 0 \\ 0 & 0 \end{pmatrix} = (\operatorname{Tr} X)\,|0\rangle\langle 0|,
$$

preserving complex trace $\operatorname{Tr}(\Phi(X)) = x_{00} + x_{11} = \operatorname{Tr}(X)$ identically for all $X \in M_2(\mathbb{C})$. On the diagonal density state $X = \operatorname{diag}(1/3, 2/3)$, the supported branch contributes $\operatorname{diag}(1/3, 0)$ and the leaked weight $2/3$ on $|1\rangle\langle 1|$ resets onto $|0\rangle\langle 0|$, outputting $\operatorname{diag}(1, 0)$.

In `FiniteStateChannel` and `KrausCompletion`, for finite decidable index types `[Fintype a] [DecidableEq a] [Fintype b] [DecidableEq b]`, the structure `QuantumChannel a b` packages:

1. a completely positive map `toCompletelyPositiveMap : CompletelyPositiveMap (CStarMatrix a a ℂ) (CStarMatrix b b ℂ)`; and
2. exact complex trace preservation `trace_preserving : ∀ rho : CStarMatrix a a ℂ, Matrix.trace (toCompletelyPositiveMap rho) = Matrix.trace rho`.

::: {.theorem #thm-appi-kraus-channel-completion lean="D5/S3/Quantum/Recovery/KrausCompletion.complete_quantum_channel" title="Quantum-Channel Completion of a Projection-Supported Kraus Family"}
Let $a, b$ be finite types with decidable equality (`[Fintype a] [DecidableEq a] [Fintype b] [DecidableEq b]`) and let $s$ be a finite index type (`[Fintype s]`). Given a Kraus family $K : s \to \operatorname{Matrix}\;b\;a\;\mathbb{C}$, a projector $P \in \operatorname{Matrix}\;a\;a\;\mathbb{C}$, and an explicit output index $v \in b$, suppose $P^\dagger = P$, $P \cdot P = P$, and

$$
\sum_{i \in s} K_i^\dagger K_i = P.
$$

Then there exists $\mathrm{channel} : \operatorname{QuantumChannel}\;a\;b$ such that for every matrix $X \in \operatorname{Matrix}\;a\;a\;\mathbb{C}$,

$$
\operatorname{ofMatrix}^{-1}\!\bigl(\mathrm{channel.toCompletelyPositiveMap}(\operatorname{ofMatrix}(X))\bigr) = \sum_{i \in s} K_i X K_i^\dagger + \operatorname{Matrix.trace}\bigl((I - P) X\bigr) \cdot \operatorname{Matrix.single}\;v\;v\;(1 : \mathbb{C}).
$$

:::

::: proof
Because $P^\dagger = P$ and $P^2 = P$, the complementary matrix $Q := I - P$ also satisfies $Q^\dagger = Q$ and $Q^2 = Q$. Using the given output index $v \in b$, adjoin for each input basis index $u \in a$ the rank-one reset operator $L_u := E_{v, u} Q \in \operatorname{Matrix}\;b\;a\;\mathbb{C}$, forming an extended Kraus family indexed by the finite sum type $s \oplus a$ ($K_i$ on $s$ and $L_u$ on $a$). On any $X \in \operatorname{Matrix}\;a\;a\;\mathbb{C}$, summing the reset operators gives $\sum_{u \in a} L_u X L_u^\dagger = \sum_{u \in a} E_{v,u} (Q X Q^\dagger) E_{u,v} = \operatorname{Tr}(Q X Q^\dagger)\,E_{v,v}$; cyclicity of the trace together with $Q^\dagger Q = Q^2 = Q = I - P$ yields $\operatorname{Tr}(Q X Q^\dagger) = \operatorname{Tr}((I - P) X)$, matching the stated formula. Meanwhile, completeness of the augmented Kraus family holds identically:

$$
\sum_{i \in s} K_i^\dagger K_i + \sum_{u \in a} L_u^\dagger L_u = P + \sum_{u \in a} Q^\dagger E_{u,v} E_{v,u} Q = P + Q^\dagger I_a Q = P + Q^2 = P + (I - P) = I_a.
$$

Applying the finite-dimensional Kraus channel constructor (`FiniteKrausChannel`) turns this identity-normalized Kraus family into a completely positive, trace-preserving `QuantumChannel a b`. The full proof is checked by the Lean kernel.
:::

Two subtleties deserve emphasis. First, $\operatorname{Matrix.trace}((I - P) X)$ is a complex scalar for arbitrary $X \in \operatorname{Matrix}\;a\;a\;\mathbb{C}$, acquiring a statistical interpretation as leaked probability mass only when $X$ is a density state, while the explicit parameter $v : b$ witnesses that the output carrier $b$ is nonempty. Second, sending the entire complement $I - P$ onto $|v\rangle\langle v|$ achieves **CPTP channel completion**, not noise inversion—all structure carried by $X$ outside $P$ is erased into the fixed reset state.

---

## I.5 Canonical Residual Witness of the Nearest Separable Cone Point {#sec-appendix-i-5}

Where Section I.4 constructively completed a supported subchannel into a valid CPTP map, the complementary question asks how to certify when a composite positive semidefinite operator $R$ **cannot** be synthesized inside a given convex resource cone—specifically, the **unnormalized separable cone**—and how to read off its exact approximation deficit. In finite-dimensional Hilbert–Schmidt geometry, **Moreau's conic orthogonal decomposition** gives an exact answer without heuristic search over hyperplanes: projecting $R$ onto the closed separable cone yields a unique nearest cone point $P$, an orthogonal residual $r = R - P$ ($\langle P, r\rangle = 0$), and a canonical negated residual $W = P - R = -r$ that is automatically **Hermitian and block-positive**, pairs nonnegatively with every separable operator, and evaluates on $R$ itself to $-\|R - P\|_{\mathrm{HS}}^2 < 0$ whenever $R$ is entangled.

Let us compute this decomposition explicitly on the two-qubit maximally entangled projector ($m = n = 2$), highlighting a crucial geometric lesson: **even when $R$ has unit trace, its Hilbert–Schmidt nearest point $P$ in the unnormalized separable cone need not have trace $1$!** Let $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$ and $R = |\Phi^+\rangle\langle\Phi^+|$ ($\operatorname{Tr}(R) = 1$, $R^2 = R$). Inspect the candidate cone point, residual, and witness:

$$
P = \frac{1}{2} R + \frac{1}{4} I_4, \qquad r = R - P = \frac{1}{2} R - \frac{1}{4} I_4, \qquad W = P - R = -r = \frac{1}{4} I_4 - \frac{1}{2} R.
$$

Verify all four conic properties step by step (this explicit calculation serves as a pedagogical walkthrough of the theorem's clauses rather than a separate frozen declaration):

1. **Separable-Cone Membership of $P$ (with $\operatorname{Tr}(P) = 3/2 \neq 1$)**: Expanding $R = \frac{1}{4}(I \otimes I + X \otimes X - Y \otimes Y + Z \otimes Z)$ gives $P = \frac{3}{8} I \otimes I + \frac{1}{8}(X \otimes X - Y \otimes Y + Z \otimes Z)$. Summing six rank-one product projectors—aligned along $X$ and $Z$, anti-aligned along $Y$—yields

   $$
   \bigl(|++\rangle\langle ++| + |--\rangle\langle --|\bigr) + \bigl(|00\rangle\langle 00| + |11\rangle\langle 11|\bigr) + \bigl(|+i,-i\rangle\langle +i,-i| + |-i,+i\rangle\langle -i,+i|\bigr) = \frac{3}{2} I \otimes I + \frac{1}{2}(X \otimes X - Y \otimes Y + Z \otimes Z) = 4 P.
   $$

   Dividing by $4$ expresses $P$ as $1/4$ times a sum of six positive semidefinite Kronecker products, proving $P \in \operatorname{separableCone}$! Notice that $\operatorname{Tr}(P) = \frac{1}{2}\cdot 1 + \frac{1}{4}\cdot 4 = \frac{3}{2} > 1$: relaxing unit-trace normalization distinguishes nearest **cone** approximation from nearest normalized-state approximation.
2. **Residual Orthogonality $\operatorname{Tr}(P r) = 0$**: Since $R^2 = R$ and $\operatorname{Tr}(R) = 1$, $P r = \bigl(\frac{1}{2}R + \frac{1}{4}I_4\bigr)\bigl(\frac{1}{2}R - \frac{1}{4}I_4\bigr) = \frac{1}{4}R - \frac{1}{16}I_4$, which has trace $\frac{1}{4}\cdot 1 - \frac{1}{16}\cdot 4 = 0$.
3. **Block Positivity of $W$**: For any product vector $a \otimes b \in \mathbb{C}^2 \otimes \mathbb{C}^2$, Cauchy–Schwarz gives $\lvert\langle \Phi^+ \mid a \otimes b\rangle\rvert^2 = \frac{1}{2}\lvert a_0 b_0 + a_1 b_1\rvert^2 \le \frac{1}{2}\|a\|^2\|b\|^2$, whence

   $$
   \langle a \otimes b \mid W \mid a \otimes b\rangle = \frac{1}{4}\|a\|^2\|b\|^2 - \frac{1}{2}\lvert\langle \Phi^+ \mid a \otimes b\rangle\rvert^2 \ge 0,
   $$

   so $\operatorname{Re}\operatorname{Tr}(S^\dagger W) \ge 0$ (and $\operatorname{Re}\operatorname{Tr}(S^\dagger r) \le 0$) for every $S$ in the separable cone.
4. **Variational Optimality and Strict Negative Witness Pairing**: For every $Q \in \operatorname{separableCone}$, $\|R - Q\|_{\mathrm{HS}}^2 = \|r + (P - Q)\|_{\mathrm{HS}}^2 = \|r\|_{\mathrm{HS}}^2 + \|P - Q\|_{\mathrm{HS}}^2 - 2\,\operatorname{Re}\operatorname{Tr}(Q^\dagger r) \ge \|r\|_{\mathrm{HS}}^2$, confirming $P$ is the unique nearest separable cone point; meanwhile $\|r\|_{\mathrm{HS}}^2 = \operatorname{Tr}\bigl(\frac{1}{4}R - \frac{1}{4}R + \frac{1}{16}I_4\bigr) = \frac{1}{4}$ and

   $$
   \operatorname{Tr}(R W) = \operatorname{Tr}\!\left(R\Bigl(\frac{1}{4}I_4 - \frac{1}{2}R\Bigr)\right) = \frac{1}{4} - \frac{1}{2} = -\frac{1}{4} = -\|r\|_{\mathrm{HS}}^2 < 0,
   $$

   certifying $\neg\operatorname{separableCone}(R)$ and reading off the exact squared Hilbert–Schmidt distance $1/4$.

In `CompositeCones`, `CompositeConeDuality`, and `SeparableConeResidualWitness`, for arbitrary natural dimensions $m, n \in \mathbb{N}$ (including $m = 0$ or $n = 0$), the formal objects are defined as follows:

1. **Composite Matrix Carrier, Real Hilbert–Schmidt Pairing, and Entrywise Isometry**: Set $\operatorname{CompositeMatrix}\;m\;n := \operatorname{Matrix}\;(\operatorname{Fin}\;m \times \operatorname{Fin}\;n)\;(\operatorname{Fin}\;m \times \operatorname{Fin}\;n)\;\mathbb{C}$, with real inner-product pairing

   $$
   \operatorname{pairing}(S, W) := \operatorname{Re}\operatorname{Tr}(S^\dagger W), \qquad \operatorname{distanceSq}(R, P) := \operatorname{pairing}(R - P, R - P).
   $$

   The continuous $\mathbb{R}$-linear equivalence `entryEquiv : CompositeMatrix m n ≃L[ℝ] EntrySpace m n` flattens matrices into $\operatorname{EntrySpace}\;m\;n := \operatorname{EuclideanSpace}\;\mathbb{C}\;\bigl((\operatorname{Fin}\;m \times \operatorname{Fin}\;n) \times (\operatorname{Fin}\;m \times \operatorname{Fin}\;n)\bigr)$, so $\|\operatorname{entryEquiv}(r)\|^2$ is the squared Hilbert–Schmidt coordinate norm $\sum_{i,j} \lvert r_{ij}\rvert^2 = \operatorname{pairing}(r, r)$ rather than the default operator norm on `Matrix`.
2. **Unnormalized Separable Cone, Block Positivity, and Metric Projection**: A matrix $W \in \operatorname{CompositeMatrix}\;m\;n$ belongs to `separableCone W` iff there exist $k \in \mathbb{N}$ (allowing $k = 0$ for the zero matrix) and $A : \operatorname{Fin}\;k \to M_m(\mathbb{C})$, $B : \operatorname{Fin}\;k \to M_n(\mathbb{C})$ with `(A i).PosSemidef ∧ (B i).PosSemidef` for all $i$ and $W = \sum_{i : \operatorname{Fin}\;k} A_i \otimes_k B_i$ (no unit-trace constraint is imposed). A matrix $W$ satisfies `blockPositive W` iff for all $a : \operatorname{Fin}\;m \to \mathbb{C}$ and $b : \operatorname{Fin}\;n \to \mathbb{C}$,

   $$
   0 \le \operatorname{Re}\bigl\langle a \otimes b,\, W(a \otimes b)\bigr\rangle.
   $$

   Because `separableCone` forms a closed convex cone in `EntrySpace m n` (`separableProperCone m n`), every $R \in \operatorname{CompositeMatrix}\;m\;n$ admits a unique minimizer of $\operatorname{distanceSq}(R, Q)$ over `separableCone Q`, selected as `nearestSeparable R`.

::: {.theorem #thm-appi-separable-residual-witness lean="D5/S3/Resource/SeparableConeResidualWitness.separable_cone_residual_witness" title="Canonical Residual Witness of the Nearest Separable Cone Point"}
Let $m, n \in \mathbb{N}$ and let $R \in \operatorname{CompositeMatrix}\;m\;n$ be positive semidefinite (`hR : R.PosSemidef`). Set $P := \operatorname{nearestSeparable}(R)$, $r := R - P$, and $W := P - R$. Then all of the following hold:

1. **Separable Decomposition and Hermitian Block Positivity**: $\operatorname{separableCone}(P)$, $R = P + r$, `W.IsHermitian`, and `blockPositive W`;
2. **Residual Orthogonality and Polar Cone Inequalities**: $\operatorname{pairing}(P, r) = 0$, and for every $S \in \operatorname{CompositeMatrix}\;m\;n$ satisfying $\operatorname{separableCone}(S)$,

   $$
   \operatorname{pairing}(S, r) \le 0 \quad \text{and} \quad 0 \le \operatorname{pairing}(S, W);
   $$

3. **Dual Residual-Norm Identities**:

   $$
   \operatorname{pairing}(R, W) = -\operatorname{pairing}(r, r) \quad \text{and} \quad \operatorname{pairing}(R, W) = -\bigl\|\operatorname{entryEquiv}(r)\bigr\|^2;
   $$

4. **Strict Negative Separation Certificate**: If $\neg\operatorname{separableCone}(R)$, then $\operatorname{pairing}(R, W) < 0$.
:::

::: proof
Under the real continuous linear equivalence `entryEquiv`, `CompositeMatrix m n` equipped with $\operatorname{pairing}(S, W) = \operatorname{Re}\operatorname{Tr}(S^\dagger W)$ identifies isometrically over $\mathbb{R}$ with the finite-dimensional real inner-product space `EntrySpace m n`, inside which `separableProperCone m n` is a closed convex cone (closedness follows from Carathéodory bounds on compact unit-trace slices lifted to the cone in `isClosed_separableCone`). Applying Moreau's conic orthogonal decomposition and residual-witness theorem (`MoreauDecomposition` and `ConeResidualWitness`) to $R$ produces the unique nearest cone point $P = \operatorname{nearestSeparable}(R)$ satisfying $R = P + r$, $\operatorname{pairing}(P, r) = 0$, and $\operatorname{pairing}(S, r) \le 0$—equivalently $0 \le \operatorname{pairing}(S, W)$ for $W = -r$—for every $S$ in `separableCone`. Evaluating $0 \le \operatorname{pairing}(S, W)$ on rank-one positive semidefinite product generators $S = |a\rangle\langle a| \otimes_k |b\rangle\langle b|$ yields `blockPositive W`. Because $R$ is positive semidefinite and hence Hermitian ($R^\dagger = R$), and conjugate transposition preserves both `separableCone` and `distanceSq`, uniqueness of the nearest cone point forces $P^\dagger = P$, whence $W = P - R$ satisfies `W.IsHermitian`. Expanding $\operatorname{pairing}(P + r, -r)$ with $\operatorname{pairing}(P, r) = 0$ gives $-\operatorname{pairing}(r, r) = -\|\operatorname{entryEquiv}(r)\|^2$. Finally, if $\neg\operatorname{separableCone}(R)$, membership $P \in \operatorname{separableCone}$ forces $r = R - P \neq 0$, so $\|\operatorname{entryEquiv}(r)\|^2 > 0$ and $\operatorname{pairing}(R, W) < 0$. The full proof is checked by the Lean kernel.
:::

Reading [@thm-appi-kraus-channel-completion] alongside [@thm-appi-separable-residual-witness], keep their roles cleanly separated: Section I.4 provides a **constructive CPTP completion** for projection-supported Kraus families, whereas Section I.5 provides a **canonical conic separation certificate** via Hilbert–Schmidt projection onto the unnormalized separable cone. Together they illustrate constructive realizability versus dual non-attainability witnesses, without turning `nearestSeparable` into a tractable numerical algorithm or claiming a unified primal–dual approximate-recovery theorem for general quantum channels.

---

## I.6 Scope Audit of Domains, Carrier Types, and Epistemic Boundaries Across I.1–I.5 {#sec-appendix-i-6}

To make cross-section auditing immediate, the table below summarizes the exact carrier types, hypotheses, total-function guards, verified conclusions, and excluded extrapolations for all five theorems in this appendix:

| Section & Anchor | Carrier & Dimension Scope | Key Hypotheses & Total-Function / Normalization Guards | Kernel-Verified Conclusion (`LEAN ✓`) | Excluded Extrapolations & Scope Limits |
| :--- | :--- | :--- | :--- | :--- |
| **I.1** [@thm-appi-reverse-test-attainment] | Concrete `VonNeumannAlgebra H` on complete $(H : \mathsf{Type}\;v)$ (including infinite dimensions) and universe-$u$ candidate spaces | $\rho, \sigma \ge 0$, `IsOrderNormal (ρ + σ)`, `ConvexOn ℝ (Ioi 0) f`; `closedPerspectiveCost` uses positive-hinge integrals in `EReal` to avoid division by zero or nonpositive `log` | Compatible moment family $F$, regular finite measure on $[0,1]$, contractive normal positive $L^1$ map $\Gamma$, and normal $L^1$ reverse test attaining $\inf \operatorname{attainableCosts} \neq \perp$ | Infimum may equal $+\infty$ (only $\perp = -\infty$ is excluded); does not guarantee finite-atom support in infinite dimensions or supply a solver |
| **I.2** [@thm-appi-bures-dual-barycenter] | Finite complex matrices $M_m(\mathbb{C})$, $m, n \in \mathbb{N}$ ($\sum_j w_j = 1 \implies n \ge 1$) | $\forall j,\; w_j > 0$, $\sum_j w_j = 1$; $A_j, T_j, W$ and competitors $X$ strictly `PosDef`; explicit dual certificate $T_j W T_j = A_j$ and $\sum_j w_j T_j = I_m$ | $W$ uniquely minimizes weighted $d_{\mathrm{BW}}^2$ over all `PosDef` matrices and fixes the `Classical.epsilon` selector `wassersteinBarycenter w A = W` | Does not prove certificate-free existence algorithms or unconditional uniqueness on singular positive semidefinite boundaries |
| **I.3** [@thm-appi-subentropy-guessing] | Finite decidable types `X, B` and `CStarMatrix` density states (normalization forces `X, B` nonempty) | $p \ge 0$, $\sum_x p(x) = 1$, $\rho : X \to \operatorname{DensityState}\;B$; determinant integral on $(0,\infty)$ handles repeated eigenvalues smoothly; $0 < p_{\mathrm{guess}} \le 1$ validates `Real.log` | $\operatorname{conditionalSubentropy}(p, hp, hs, \rho) \le 1 - p_{\mathrm{guess}} \le -\ln p_{\mathrm{guess}}$ | Must not replace subentropy with von Neumann conditional entropy or claim general tripartite strong subadditivity |
| **I.4** [@thm-appi-kraus-channel-completion] | Finite matrix spaces `Matrix a a ℂ → Matrix b b ℂ` with finite `a, b, s` | $P^\dagger = P$, $P^2 = P$, $\sum_{i \in s} K_i^\dagger K_i = P$, explicit reset index $v : b$; $\operatorname{Tr}((I-P)X)$ is complex in general and a probability weight only on density states | Resetting residual trace on $I - P$ onto $E_{v,v}$ yields a trace-preserving completely positive `QuantumChannel a b` on all matrices | Reset completion enforces CPTP validity only; it neither inverts noise on $I - P$ nor preserves information outside $P$ |
| **I.5** [@thm-appi-separable-residual-witness] | Finite bipartite matrices `CompositeMatrix m n`, $m, n \in \mathbb{N}$ (zero dimension permitted) | `R.PosSemidef`; distance uses `entryEquiv` real Hilbert–Schmidt norm, pairing is $\operatorname{Re}\operatorname{Tr}(S^\dagger W)$; `separableCone` allows $k = 0$ and **imposes no unit-trace constraint** | Nearest cone point $P$ yields Hermitian block-positive witness $W = P - R$ with $\langle S, W\rangle \ge 0$ on all separable $S$ and $\langle R, W\rangle = -\|R - P\|_{\mathrm{HS}}^2$ ($< 0$ if non-separable) | $P$ is the nearest unnormalized cone point (not nearest normalized state); `nearestSeparable` is non-algorithmic; not a general channel recovery theorem or optimization dual to I.4 |
