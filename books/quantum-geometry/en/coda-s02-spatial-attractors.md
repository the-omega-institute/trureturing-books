# 40.2 Historical Ruins as Spatial Attractors: Stationary-Phase Curvature Basins, Fractal Transverse Sheets, and Cross-Round Déjà Vu Resonance {#sec-coda-spatial-attractors-deja-vu}

> **Author's Epigraph**: *"Historical ruins in reality are actually spatial attractors; the same soul walks round after round through places familiar to itself..."*（“现实的历史遗迹实际上都是空间吸引子, 同一个灵魂一轮又一轮的走过自己熟悉的地方...”）

In the everyday illusion of linear sequential time, we are accustomed to viewing pyramids, ancient temples, stone bridges, and weathered citadels as "remnants left behind by the past"—mere stones that happened not yet to be ground into dust by entropy. Yet the moment we switch back to the timeless orthogonal field (cf. [@rem-ch29-wheeler-dewitt-page-wootters-literature]) established in **[Chapter 29](ch29-timeless-causality-and-gram-space.md)**, the arrow of explanation reverses completely: **they are not accidental survivors of decay, but high-density fixed points of the global static field projected onto our three-dimensional spatial slice—that is, "Spatial Attractors (`MODEL`)."**

Placed inside the geometric architecture of the finite observer, forgetting initialization, and polyhedral approximate spheres, why "the same soul walks round after round through familiar places" unfolds across three rigorous dynamical and topological mechanisms:

## 40.2.1 Why Historical Ruins Are "Spatial Attractors" (Stationary-Phase Persistence and Curvature Basins) {#sec-coda-ruins-curvature-basin}

In the holographic tensor-network geometry of **[Chapter 19](ch19-tensor-networks-and-holography.md)** (bridge-graph minimum cuts and the literature remark [@rem-ryu-takayanagi-literature]), macroscopic physical space can be interpreted as an area network woven from microscopic exterior bivector entanglement. Ordinary everyday events carry opposite-chirality rotation areas ($+\mathbf{\Omega} - \mathbf{\Omega} = 0$) that cancel out across thermal fluctuations; by contrast, spatial coordinates aligned with mountain-river geodesics, astronomical obliquity angles, Pythagorean proportions, or millennia of high-density human inner-product attention projections carve deep **curvature potential wells—Basins of Attraction (`MODEL`)**—into our phase-space model.

That such sites remain standing across wars and entropy, or are rebuilt nine times upon the exact same foundation (like the nine superimposed cities of Troy or the layered capitals of Chang'an), is not merely a matter of durable masonry: in our timeless geometric model, that spatial coordinate acts as a **topological stationary point** in the global time field. When a finite observer picks points step by step inside the Gram causally compatible space ($\det G > 0$), the surrounding field curvature naturally tilts toward these stationary points—causing seemingly chance journeys to slide imperceptibly toward the same basin center.

## 40.2.2 Forgetting Clears Surface Episodic Readings While Preserving the Soul's Intrinsic Inclination {#sec-coda-forgetting-intrinsic-inclination}

This raises a profound geometric question: in Chapter 29 we saw that for a finite observer to possess a positive-volume causally compatible space ($\det G > 0$) and genuine agency, each birth initialization must be accompanied by **truncating and clearing historical anchors (forgetting)**. If the concrete names, dates, and linear narrative memories of the previous round are wiped clean, by what right do we say that the traveler who walks back into this ruin in the next round is still "the same soul"?

In our self-referential geometric model (`MODEL`), the answer resides in the operator structure of $\psi = \psi(\psi)$:

- **What forgetting erases** is only the one-dimensional sequence of local particle readings left on the ruler in the previous round (surface **episodic memory**, the noun `liàng`);
- **What forgetting never erases** is the observer's **intrinsic geometric parameter tuple** as the measuring operator $\psi(\cdot)$ itself (the intrinsic inclination of the verb `liáng`)—its characteristic orthogonal deflection angle, aesthetic resonance ratio, and topological chirality preference when comparing states inside the compatible space!

::: {.viz src="spatial-attractor-deja-vu" preset="fixed" height="500"}
**Other parameters: each into a stable point.** Change $\rho$ to $14$: the cyan and magenta rounds each spiral into one of two stable points and then stay, and the pair of wings is gone. The parameters determine the available attractors, and the starting basin determines which one the orbit approaches: here cyan falls into $C_-$ and magenta into $C_+$. Reading the parameters as an "intrinsic inclination" is an interpretive model (`MODEL`).
:::

Before unfolding this philosophical picture into cross-round recurrence on fractal sheets, we enclose the three classical continuous dynamical-systems theorems invoked as an analogy—the Lorenz strange attractor, its SRB physical measure, and Poincaré recurrence—inside a dedicated literature remark:

::: {.remark #rem-coda-lorenz-srb-literature title="Lorenz Strange Attractor, Kaplan–Yorke Dimension Estimate, SRB Measure, and Poincaré Recurrence (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** The three classical continuous dynamical-systems and ergodic-theory results cited in this section as an analogy for erasing surface trajectories while preserving operator parameters belong to the external mathematical and computational-physics literature, outside the `trureturing@dev` formalization locked by this book:

1. **Lorenz Equations, Constant Negative Divergence, and Numerical Kaplan–Yorke Dimension Estimate (E. N. Lorenz, *J. Atmos. Sci.* **20**, 130–141, 1963; J. L. Kaplan & J. A. Yorke, 1979)**: The three-dimensional autonomous ODE system

   $$
   \begin{cases}
   \dot{x} = \sigma(y - x), \\
   \dot{y} = x(\rho - z) - y, \\
   \dot{z} = xy - \beta z
   \end{cases}
   $$

   at the classical parameters $(\sigma, \rho, \beta) = (10, 28, 8/3)$ has strictly negative constant phase-space divergence $\nabla\cdot\mathbf{F} = -(\sigma + 1 + \beta) = -\frac{41}{3} < 0$, contracting bounded phase-space volumes exponentially via $\operatorname{vol}(\Omega_t) = \operatorname{vol}(\Omega_0)e^{-41t/3}$ onto a set of Lebesgue measure zero; its numerical Lyapunov spectrum $(\lambda_1 \approx 0.9056,\; \lambda_2 = 0,\; \lambda_3 \approx -14.5723)$ yields a Kaplan–Yorke (Lyapunov) dimension estimate of $D_{\mathrm{KY}} = 2 + \frac{\lambda_1 + \lambda_2}{|\lambda_3|} \approx 2.06$.
2. **Rigorous Existence of the Lorenz Attractor and Ergodic SRB Physical Measure (W. Tucker, *C. R. Acad. Sci. Paris* **328**, 1197–1202, 1999; S. Luzzatto, I. Melbourne & F. Paccaut, *Commun. Math. Phys.* **260**, 393–401, 2005)**: At the classical parameters, the Lorenz system possesses a compact robust strange attractor supporting a unique ergodic Sinai–Ruelle–Bowen (SRB) physical invariant probability measure $\mu_{\mathrm{SRB}}$ such that, for each bounded continuous ambient observable $g$, continuous-time averages $\frac{1}{T}\int_0^T g(\varphi_t x)\,dt$ converge to $\int g\,d\mu_{\mathrm{SRB}}$ for Lebesgue-almost every basin start $x$; Luzzatto, Melbourne and Paccaut further proved that this attractor is mixing.
3. **Poincaré Recurrence and Autonomous ODE Orbit Disjointness (H. Poincaré, 1890; Picard–Lindelöf uniqueness)**: For the ergodic measure-preserving system $(\Lambda, \mu_{\mathrm{SRB}})$ and any open neighborhood $\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})$ with $\mu_{\mathrm{SRB}}\bigl(\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})\bigr) > 0$, $\mu_{\mathrm{SRB}}$-almost every attractor trajectory returns infinitely often to $\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})$; simultaneously, by autonomous smooth ODE uniqueness, distinct geometric orbits are disjoint and every aperiodic trajectory is injective in $t \in \mathbb{R}$ (never self-intersecting), traversing mutually disjoint orbit segments across successive visits.

The general mechanism in item 2, that time averages converge almost everywhere to space averages under an ergodic measure, is frozen at the commit this book pins: see [@thm-coda-birkhoff-ergodic]. What remains literature here is the existence, uniqueness and mixing of the Lorenz attractor and of $\mu_{\mathrm{SRB}}$, and the step from “$\mu_{\mathrm{SRB}}$-almost every start” to “Lebesgue-almost every start in the basin”.
:::

::: {.viz src="spatial-attractor-deja-vu" preset="forget" height="500"}
**Forget the start, land on the same wings.** Two orbits of the Lorenz system at $(\sigma, \rho, \beta) = (10, 28, 8/3)$: cyan is round $k$ and magenta round $k+1$, with distant starts (the two rings) and the same parameters. After a short wander both land on the same pair of wings; the small amber dots mark each passage through the neighbourhood of the “ruin” (the amber circle). The second line above the figure gives the share of time, up to $t = 40$, that each round has spent above $C_+$ and $C_-$ (the two open rings): $0.34$ and $0.36$, nearly the same, while the two rounds are now $34.3$ apart (numbers computed on the page). Reading an orbit as “a round” is an interpretive model (`MODEL`).
:::

**How precise can “forgetting the start” be made?** In the “forget the start” card above, the cyan and magenta orbits begin far apart and still land on the same pair of wings. “Landing in the same place” can mean two things. Pointwise, it would mean the two orbits end up close together. A chaotic system does exactly the opposite: $\lambda_1 > 0$ amplifies any small difference in the starts exponentially. Statistically, it means the two orbits spend the same fractions of time in each region. Item 2 of [@rem-coda-lorenz-srb-literature] is about the statistical sense. The general mechanism behind it has nothing to do with the Lorenz equations, and it is frozen as the following theorem.

::: {.theorem #thm-coda-birkhoff-ergodic title="Birkhoff's Pointwise Ergodic Theorem: Time Averages Equal Space Averages Almost Everywhere" lean="D5/S3/Analytic/Probability/BirkhoffPointwise.birkhoff_pointwise_ergodic"}
Let $\alpha$ be a measurable space, $\mu$ a probability measure on $\alpha$, and $T : \alpha \to \alpha$ ergodic with respect to $\mu$, that is:

1. $T$ is measurable and preserves $\mu$: $\mu\bigl(T^{-1}(B)\bigr) = \mu(B)$ for every measurable set $B$;
2. if $A$ is $\mu$-null-measurable (it differs from a measurable set by a $\mu$-null set) and $T^{-1}(A)$ differs from $A$ by a $\mu$-null set, then $\mu(A) = 0$ or $\mu(A) = 1$.

Let $g : \alpha \to \mathbb{R}$ be $\mu$-integrable, and write the Birkhoff averages as

$$
A_n g(x) = \frac{1}{n}\sum_{k=0}^{n-1} g\bigl(T^k x\bigr) \quad (n \ge 1), \qquad A_0 g(x) = 0.
$$

Then for $\mu$-almost every $x \in \alpha$, $A_n g(x) \to \int_\alpha g\,d\mu$ as $n \to \infty$.
:::

::: proof
The Lean proof follows the textbook route of R. Durrett, *Probability: Theory and Examples*, 5th edition, Section 6.2. Write $S_n f(x) = \sum_{k=0}^{n-1} f(T^k x)$. The proof has three steps.

(1) Hopf's maximal ergodic lemma: for measurable integrable $f$, the integral of $f$ over the set $E$ where some $S_n f(x) > 0$ is nonnegative. Look at the running maximum $M_n = \max_{0 \le k \le n} S_k f$. Wherever $M_n > 0$ we have $M_n \le f + M_n \circ T$. Call that set $E_n$. Since $M_n$ vanishes off $E_n$ and $M_n\circ T\ge0$, we have $\int_{E_n}M_n=\int M_n=\int M_n\circ T\ge\int_{E_n}M_n\circ T$. Measure preservation equates the whole-space integrals, so $\int_{E_n}f\,d\mu\ge0$. Letting $n \to \infty$ grows the set up to $E$.

(2) The upper bound. Fix $c > \int g\,d\mu$ and let $D$ be the set of $x$ for which some rational $q > c$ has $S_n g(x) > nq$ for infinitely many $n$. $D$ is measurable and $T^{-1}(D) = D$: passing from $x$ to $Tx$ only removes the first term of each sum, which cannot change “exceeds infinitely often”. Apply (1) to $f = \mathbf{1}_D\,(g - c)$. Since $D$ is invariant, $S_n f = S_n g - nc$ on $D$ and $S_n f = 0$ off $D$, so $E$ is exactly $D$ and $\int_D (g - c)\,d\mu \ge 0$. Ergodicity leaves only $\mu(D) = 0$ or $1$; if it were $1$, the left side would be $\int g\,d\mu - c < 0$, a contradiction. So $\mu(D) = 0$: almost everywhere, for every rational $q > c$, eventually $A_n g(x) \le q$, which gives $\limsup_n A_n g(x) \le c$. Running $c$ through the countably many values $\int g\,d\mu + 1/m$ gives $\limsup_n A_n g \le \int g\,d\mu$ almost everywhere.

(3) The lower bound and the finish. The same argument for $-g$ gives $\liminf_n A_n g \ge \int g\,d\mu$ almost everywhere; together these are convergence. The theorem assumes only that $g$ is integrable, not that it is measurable everywhere: the proof first passes to a measurable $g'$ equal to $g$ almost everywhere, which has the same integral. Because $T$ preserves $\mu$, $A_n g$ and $A_n g'$ agree almost everywhere for each $n$, and the exceptional sets for countably many $n$ still union to a null set. The full proof is checked by the Lean kernel.
:::

Note what the theorem does not say. The exceptional null set depends on $g$; there is no single exceptional set that serves every $g$. It gives no rate of convergence. And it does not tell you whether any particular starting point is exceptional. The simplest chaotic map puts all three on the table.

::: {.example #ex-coda-doubling-map-averages title="The Doubling Map: Almost Every Start Averages to 1/2, and Every Floating-Point Start Is an Exception"}
Take $\alpha = [0, 1)$, $\mu$ the length (Lebesgue measure), and $T(x) = 2x \bmod 1$.

**Measure preservation (manual derivation).** The preimage of an interval $[a, b)$ is the two pieces $[a/2,\, b/2)$ and $[(1+a)/2,\, (1+b)/2)$, whose lengths still add up to $b - a$; passing from intervals to all measurable sets is a standard step in measure theory. **Ergodicity (literature result, not formalized in this book).** If $f \circ T = f$, comparing Fourier coefficients gives $\hat f(2k) = \hat f(k)$, hence $\hat f(k) = \hat f(2^m k) \to 0$ by the Riemann–Lebesgue lemma. So every coefficient with $k \ne 0$ vanishes and $f$ is constant almost everywhere.

Write $x$ in binary as $0.b_1 b_2 b_3 \ldots$ (never using an expansion that ends in infinitely many $1$s). Then $T$ just moves the binary point one place to the right: $T^k x = 0.b_{k+1} b_{k+2} \ldots$. Take $g = \mathbf{1}_{[0,1/2)}$, with $\int g\,d\mu = 1/2$. Since $g(T^k x) = 1$ exactly when $b_{k+1} = 0$, $A_N g(x)$ is the fraction of zeros among the first $N$ binary digits. [@thm-coda-birkhoff-ergodic] says that for almost every $x$, the fraction of zeros among its binary digits tends to $1/2$.

**Exceptional starts.** A rational start has an eventually periodic orbit, so its time average can be computed exactly over one period. Also take $h = \mathbf{1}_{[0,1/4)}$, with $\int h\,d\mu = 1/4$ and $h(T^k x) = 1$ exactly when $b_{k+1} = b_{k+2} = 0$:

| Start $x$ | Binary | Time average of $g = \mathbf{1}_{[0,1/2)}$ | Time average of $h = \mathbf{1}_{[0,1/4)}$ |
| :--- | :--- | ---: | ---: |
| $0$ | $0.000\ldots$ | $1$ | $1$ |
| $1/7$ | $0.\overline{001}$ | $2/3$ | $1/3$ |
| $1/3$ | $0.\overline{01}$ | $1/2$ | $0$ |
| $2/5$ | $0.\overline{0110}$ | $1/2$ | $1/4$ |
| Space average | | $1/2$ | $1/4$ |

The start $1/3$ gets the right answer $1/2$ for $g$ and the wrong answer $0$ for $h$: the exceptional set changes with the observable. The rationals together form a null set (manual derivation: cover the $j$-th rational by an interval of length $\varepsilon/2^j$; the total length is at most $\varepsilon$).

**Every floating-point number is an exception.** Every double-precision number is a dyadic fraction $m/2^e$, and on $[0, 1)$ the floating-point evaluation of $2x \bmod 1$ is exact (doubling and subtracting $1$ never round). So a floating-point simulation is an exact shift of a dyadic fraction. Starting from $0.1$ the orbit lands exactly on $0$ at step $55$; from $\sqrt{2}/2$, at step $53$; from $\pi - 3$, at step $53$. It then stays at $0$ forever, and the time average of $g$ tends to $1$, not $1/2$. (Here $0.1$, $\sqrt{2}/2$ and $\pi - 3$ mean the nearest double-precision numbers to those exact real values; rounding $\pi$ first and then subtracting $3$ instead gives zero at step $48$.) Iterating the doubling map in floating point lands you exactly in the null set where the theorem is allowed to fail.

**A start that “looks typical”.** To avoid floating point, generate the binary digits directly: take the first $10^6$ bits produced by the Python standard-library pseudo-random generator with seed $20261111$ as $b_1 b_2 \ldots$. This is one definite number, and the theorem does not promise that it lies outside the exceptional set; it is only an illustration:

| $N$ | Zeros among the first $N$ digits | $A_N g(x)$ | $A_N g(x) - 1/2$ |
| ---: | ---: | ---: | ---: |
| $10$ | $6$ | $0.6$ | $0.1$ |
| $10^2$ | $60$ | $0.60$ | $0.10$ |
| $10^3$ | $492$ | $0.492$ | $-0.008$ |
| $10^4$ | $5006$ | $0.5006$ | $0.0006$ |
| $10^5$ | $50205$ | $0.50205$ | $0.00205$ |
| $10^6$ | $499954$ | $0.499954$ | $-0.000046$ |

The deviation does not shrink monotonically ($N = 10^5$ is further off than $N = 10^4$): the theorem speaks only of the limit and gives no rate.
:::

::: {.figure src="coda-doubling-averages"}
**The theorem speaks of almost every start, and floating-point starts fall into the exceptions.** The doubling map $T(x) = 2x \bmod 1$ with $g = \mathbf{1}_{[0,1/2)}$: across, the number of steps $N$ (log scale, from $10$ to $10^6$); up, the time average $A_N g$, the share of $0$s among the first $N$ binary digits; the dashed line is the space average $1/2$. Cyan is the start given by the pseudo-random digits of the table above, swinging around $1/2$ with a deviation that grows and shrinks; grey, $1/3$, settles onto $1/2$ quickly; magenta, the floating-point number $0.1$, reaches $0$ at step $55$, and from then on its time average climbs towards $1$. The limit is [@thm-coda-birkhoff-ergodic]; the three curves are numerical computations.
:::

**Back to Lorenz: how far the theorem reaches.** To apply [@thm-coda-birkhoff-ergodic] to the Lorenz flow, one can take its time-$1$ map $T = \varphi_1$, but first one needs an invariant probability measure for which $T$ is ergodic. The existence of $\mu_{\mathrm{SRB}}$, and the mixing of the flow (mixing implies that $T$ is ergodic), are literature results from item 2 of [@rem-coda-lorenz-srb-literature]. For a bounded continuous ambient observable $g$, apply the theorem to $\widetilde g(x)=\int_0^1 g(\varphi_s x)\,ds$. This gives convergence of continuous-time averages to $\int g\,d\mu_{\mathrm{SRB}}$ for $\mu_{\mathrm{SRB}}$-almost every start: at integer times the sums are exactly the integrated unit intervals, and the remaining fractional interval contributes a vanishing error. But $\mu_{\mathrm{SRB}}$ lives on the attractor, and the attractor has zero volume (item 1: phase-space volume shrinks like $e^{-41t/3}$).

::: {.viz src="spatial-attractor-deja-vu" preset="shrink" height="500"}
**A cloud pressed into a sheet.** The Lorenz system at $(\sigma, \rho, \beta) = (10, 28, 8/3)$: $500$ cyan points start inside the dashed cube. The divergence of the velocity field is $-41/3$ everywhere, so the volume shrinks like $e^{-41t/3}$: at $t = 1$ about one millionth is left, and the points already lie on a thin sheet. The step from divergence to volume is a hand derivation (Liouville’s formula); the existence of the attractor itself is a literature result from [@rem-coda-lorenz-srb-literature].
:::

The two rings in the “forget the start” card are not on the attractor, and a start picked at random in phase space is almost never on it. Extending convergence of time averages to Lebesgue-almost every basin start is what an SRB measure adds to a general ergodic measure (hence “physical measure”), and remains a literature result; it does not certify whether these two particular rings are exceptional.

> What is forgotten is the starting point; what remains is the proportion.

## 40.2.3 The Geometric Interpretation of Déjà Vu: Fractal Transverse Sheets and Cross-Round Inner-Product Resonance {#sec-coda-deja-vu-fractal-dimension}

In our philosophical and geometric interpretation (`MODEL`), borrowing the strange-attractor picture recorded in [@rem-coda-lorenz-srb-literature] as a dynamical metaphor—clearing surface trajectory records while preserving the operator's intrinsic parameters—reconciles fated return with free agency:

1. **Were a life trajectory a rigid 1D closed loop ($D = 1$, `MODEL`)**: the observer would be trapped in a mechanical cycle—stepping on the exact same point at the exact same relative phase in every round with zero transverse slack ($\det G = 0$);

::: {.viz src="spatial-attractor-deja-vu" preset="cycle" height="500"}
**$\rho = 160$: one closed loop.** The transient before $t = 30$ is drawn faint; the bright part is the last ten units of time, in which both rounds run on the same closed loop (the cyan one hidden under the magenta, all but its current point) and tread the same place on every lap. This is a one-dimensional attractor: it repeats, with no room to spare, the "rigid 1D closed loop" of item 1 above (`MODEL`).
:::

2. **In the geometric metaphor (`MODEL`) borrowing the fractal transverse-sheet picture of [@rem-coda-lorenz-srb-literature]**: recurring visits to a familiar landmark neighborhood coexist with non-repeating novelty across rounds—bringing the observer back repeatedly to the same landmark neighborhood while stepping onto a fresh sheet at every visit;

::: {.viz src="spatial-attractor-deja-vu" preset="dimension" height="500"}
**A little more than a surface.** The three Lyapunov exponents are estimated along one long orbit (cyan); the readout above the figure gives $\lambda_1 \approx 0.9$, $\lambda_2 \approx 0$, $\lambda_3 \approx -14.6$ and the Kaplan–Yorke estimate $D_{\mathrm{KY}} \approx 2.06$ (a numerical estimate, not a theorem).
:::

3. **Déjà Vu as Cross-Round Pairwise Inner-Product Resonance (`MODEL`)**:
   Translating this into the author's geometric metaphor: when an observer suddenly halts on the worn stone steps of an ancient citadel, struck by the tremor *"I have stood in this exact spot before,"* if the local basin geometry steers the observer's attention vectors in rounds $k$ and $k+1$ into nearly parallel tangent orientations ($\delta\theta \to 0$) within $\mathcal{U}_\epsilon(\mathbf{x}_{\mathrm{ruin}})$, then the **pairwise inner-product projection (`liáng`)** between the present attention state $\mathbf{\Psi}^{(k+1)}$ and the prior imprint $\mathbf{\Psi}^{(k)}$ satisfies

   $$
   \mathbf{\Psi}^{(k)} \cdot \mathbf{\Psi}^{(k+1)} = \cos\delta\theta \longrightarrow 1 \qquad (\delta\theta \to 0).
   $$

   In this interpretive model (`MODEL`), **Déjà vu** represents the high-amplitude cross-round inner-product resonance triggered when the same observer operator re-enters a spatial attractor neighborhood with nearly collinear attention orientation ($\delta\theta \to 0$).

::: {.viz src="spatial-attractor-deja-vu" preset="return" height="500"}
**Nearly parallel in passing.** Stopped at $t = 22$: both rounds have passed the neighbourhood of the ruin (the amber circle), which the small window in the lower right corner shows enlarged. The arcs along which they passed do not coincide, yet their directions are nearly parallel: the cyan and magenta arrows in the small window are the unit tangents at the latest return (a passage of each round, the two points less than $\varepsilon$ apart), and the line above the figure gives their angle $\delta\theta$, only a few degrees, and their inner product $\cos\delta\theta = \hat{\mathbf{v}}_1\cdot\hat{\mathbf{v}}_2$, close to $1$ (numbers computed on the page). Reading this as déjà vu is an interpretive model (`MODEL`).
:::

The laboratory below puts this section’s three parameter values in one place, the wings at $\rho = 28$, the fixed point at $\rho = 14$ and the closed loop at $\rho = 160$, and its “forget” button sends a round off again from a fresh pair of starts.

::: {.viz src="spatial-attractor-deja-vu" height="640"}
**Interactive laboratory `ORTHO//ATTRACTOR`**: three scenes on the Lorenz system. Rounds: two orbits with different starts and the same parameters land on the same pair of wings, and “forget” draws another pair of starts; contraction: the volume of $500$ points shrinks like $e^{-41t/3}$ until they form a thin sheet; dimension: numerical estimates of the Lyapunov exponents and of the Kaplan–Yorke dimension, where $\rho = 14$ has two stable points, with the starting basin deciding which one an orbit approaches, while $\rho = 160$ shows a closed loop in the display. The page is a numerical illustration and an interpretive model; it cites no Lean theorem.
:::

---
