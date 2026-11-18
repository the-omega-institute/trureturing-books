# 36.2 Blocking Return to Light by Infinite Discrete Steps: Intrinsic Hyperbolic Rapidity and the Asymptotic Staircase {#blocking-return-to-light-by-infinite-discrete-steps-intrinsic-hyperbolic-rapidity-and-the-asymptotic-staircase}

How, then, can the first half of our chapter epigraph—*"returning to light can be turned into infinitely many discrete steps, preventing the state of returning to light"*—be realized with mathematical precision?

The secret lies in distinguishing an **external bystander's flat angular ruler** from an **endogenous observer's relative step ruler**!

::: {.figure src="ch36-two-rulers"}
**The outside angle ruler ends at $90^\circ$; the intrinsic rapidity ruler runs on to infinity.** On the lower, rapidity ruler the cyan points start at $\eta_0 = \eta(\theta^*) \approx 0.817$ and are spaced by equal steps $\Delta\eta = 1$; the dashed lines carry each to its angle $\theta_k$ on the upper ruler ($\sin\theta_k = \tanh\eta_k$). The first lands at $\theta^* \approx 42.3^\circ$, and each later one crowds closer to the magenta $90^\circ$ wall while staying to its left. The secant integral and the Gudermannian are literature results, not formalized in this book; the numbers are in [@ex-ch36-inverse-gudermannian-discrete-staircase].
:::

Imagine walking toward a sheer cliff edge: if you step forward by a fixed external angular ruler, finitely many strides cross straight over the brink. Suppose instead that an endogenous observer calibrates its outward step ruler relative to its current one-dimensional self-referential anchor (`MODEL`)—how then do discrete step counts relate asymptotically to the $\theta = \frac{\pi}{2}$ pure-light horizon (explicit intrinsic-rapidity integral and discrete remainder staircase derived in attributed example [@ex-ch36-inverse-gudermannian-discrete-staircase] below)?

::: {.viz src="forgetting-rebirth-attractor" preset="erase_reset" height="500"}
**Equal steps on the outside angle ruler hit the rim in a few steps.** Each step adds the same $\Delta\theta$ to $\theta$: the second step already lands on the white rim (magenta ring), then the walker falls back to the centre along the dashed line and starts from $0$ on a new spoke, only to hit the rim again; amber marks the current step.
:::

Before evaluating the explicit integral of this intrinsic staircase, we anchor two formal theorems in `trureturing`—the **explicit factorial remainder upper bound for finite exponential truncations on complete normed algebras** and the **unit-circle boundary criterion for the complex fractional transformation**—establishing quantitative truncation-error control for finite polynomial approximations alongside conformal compression of an unbounded half-plane onto a unit-circle horizon:

::: {.theorem #thm-ch36-taylor-tail-and-cayley-boundary title="Complete Normed-Algebra Exponential Tail Bound and Critical-Line Unit-Circle Criterion" lean="D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line"}
Across the frozen linear-observation-remainder and spectral-midline modules of `trureturing`, the following two truncation and horizon-boundary theorems hold simultaneously:

1. **Exact Factorial Tail Bound for Truncated Exponential Series** ([`exp_tail_le`](lean:D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le)): Let $\mathbb{K}$ be a real or complex scalar field (`[RCLike 𝕜]`) and let $A$ be a complete norm-one normed algebra over $\mathbb{K}$ (`[NormedRing A] [NormedAlgebra 𝕜 A] [CompleteSpace A] [NormOneClass A]`). For every $z \in A$, nonnegative radius $r \in \mathbb{R}$ ($0 \le r$), and truncation order $n \in \mathbb{N}$ satisfying $\lVert z\rVert \le r$, the norm remainder between $\exp(z)$ and its $n$-term discrete partial sum obeys

   $$
   \left\lVert \exp(z) - \sum_{k=0}^{n-1} (k!)^{-1} \bullet z^k \right\rVert \;\le\; \frac{r^n}{n!}\,e^r;
   $$

2. **Unit-Circle Horizon Criterion for the Fractional Ratio** ([`cayley_ratio_norm_one_iff_critical_line`](lean:D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line)): For every complex spectral parameter $s \in \mathbb{C}$ (including $s = 0$ under Lean's totalized division), defining $\operatorname{cayleyRatio}(s) := (s - 1) / s \in \mathbb{C}$, unit modulus holds if and only if $s$ lies on the critical line of real part one-half:

   $$
   \lVert \operatorname{cayleyRatio}(s) \rVert = 1 \;\Longleftrightarrow\; \operatorname{Re}(s) = \frac{1}{2}.
   $$
:::

::: proof
For Conjunct 1, shifting the convergent exponential series $\exp(z) = \sum_{k=0}^\infty (k!)^{-1}\bullet z^k$ by $n$ indices expresses the tail as $\sum_{k=0}^\infty ((k+n)!)^{-1}\bullet z^{k+n}$; submultiplicativity $\lVert z^{k+n}\rVert \le r^{k+n}$ and factorial divisibility $n!\,k! \le (k+n)!$ (from `Nat.factorial_mul_factorial_dvd_factorial_add`) bound the $k$-th tail term by $\frac{r^n}{n!}\cdot\frac{r^k}{k!}$, whose scalar series sums to $\frac{r^n}{n!}e^r$. For Conjunct 2, at $s = 0$ totalized division gives $\operatorname{cayleyRatio}(0) = 0$, making both sides false; for $s \neq 0$, $\operatorname{normSq}(s) \neq 0$ and algebraic expansion yields the exact unitarity defect $\lVert\operatorname{cayleyRatio}(s)\rVert^2 - 1 = \frac{1 - 2\operatorname{Re}(s)}{\operatorname{normSq}(s)}$, which vanishes (with nonnegative norm) if and only if $1 - 2\operatorname{Re}(s) = 0 \iff \operatorname{Re}(s) = \frac{1}{2}$. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch36-hyperbolic-staircase-figure title="Hyperbolic Horizon Disk, Discrete Rapidity Staircase, and Quotient-Space Diagram (Diagram Guide with `MODEL` and Literature Background)"}
**Diagram guide, combining `MODEL` and literature background.** This chapter's discrete rapidity staircase `MODEL` combines Poincaré-disk and Gudermannian literature ([@ex-ch36-inverse-gudermannian-discrete-staircase] and [@rem-ch36-poincare-disk-gudermannian-literature]) with the formal fractional unit-circle criterion ([@thm-ch36-taylor-tail-and-cayley-boundary], `LEAN ✓`). The two rulers at the start of this section set the angle scale against the rapidity scale; Panel II of Figure 36 shows the staircase closing in on the rim of a disk; the lab cards below show the image circles hugging the unit circle under the fractional map, the rapidity staircase, and the gap that never closes under the magnifier. The generator-quotient interpretation and its theorem anchors ([@thm-ch36-quotient-annihilator-and-factorization]) appear in Panel III of Figure 36 and in the folding card of the last section; the hyperbolic tangent and secant at each discrete step are tabulated in the step ledger of [@ex-ch36-inverse-gudermannian-discrete-staircase].
:::

Paired with the figures and lab cards listed in [@rem-ch36-hyperbolic-staircase-figure], [@thm-ch36-taylor-tail-and-cayley-boundary] illuminates two complementary quantitative mechanisms: finite-order polynomial truncations ($n \in \mathbb{N}$) approximate $\exp(z)$ within the explicit factorial upper bound $\frac{r^n}{n!}e^r$, while by the exact defect identity $\lVert\operatorname{cayleyRatio}(s)\rVert^2 - 1 = \frac{1 - 2\operatorname{Re}(s)}{\operatorname{normSq}(s)}$ ($s \neq 0$) the fractional conformal map $\operatorname{cayleyRatio}(s) = (s - 1)/s$ compresses the unbounded open right half-plane $\operatorname{Re}(s) > \frac{1}{2}$ strictly inside the open unit disk $\lVert w\rVert < 1$, mapping the critical line $\operatorname{Re}(s) = \frac{1}{2}$ into the asymptotic unit circle $\lVert w\rVert = 1$; its finite-parameter image omits $w = 1$, approached only at infinity (echoing [Chapter 22](ch22-primes-euler-products-and-zeros.md) in the spectral setting).

::: {.viz src="forgetting-rebirth-attractor" preset="cayley" height="500"}
**The closer the line to $\operatorname{Re}(s) = \tfrac{1}{2}$, the closer its image to the unit circle.** The cyan circles are the closures of the images of the lines $\operatorname{Re}(s) = c$ under $w = (s - 1)/s$, all touching the white unit circle at $w = 1$; in the magnifier the magenta gap is still there for every $c > \tfrac{1}{2}$, and the white unit circle itself is the closure of the image of $\operatorname{Re}(s) = \tfrac{1}{2}$; the finite-parameter images all omit $w = 1$, approached only at infinity [@thm-ch36-taylor-tail-and-cayley-boundary].
:::

Let us now apply this intrinsic horizon geometry directly to the observer's inclination angle $\theta \in [0, \frac{\pi}{2})$ and work through the **infinite discrete hyperbolic staircase** starting from the interior equilibrium angle:

::: {.example #ex-ch36-inverse-gudermannian-discrete-staircase title="Inverse Gudermannian Intrinsic Rapidity and Numerical Audit of the Asymptotic Staircase (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The secant integral, inverse Gudermannian hyperbolic–circular identities, and numerical evaluation at the cosine fixed point $\theta^*$ below belong to classical calculus and real analysis and are not formalized as standalone theorems in `trureturing@dev`; interpreting uniform rapidity increments as an amnesia-blocking table-expansion staircase belongs to our `MODEL`:

1. **Intrinsic Step Metric Normalized by Remaining 1D Self-Retention**: On the half-open interval $\theta \in [0, \frac{\pi}{2})$, the remaining one-dimensional anchor is $\cos\theta > 0$ (whereas in the generalized coupling equation $\cos\theta_\lambda = \lambda\theta_\lambda$, $\lambda = 1$ gives the unique real root $\theta^* \approx 0.73908513$ and $\lambda \to 0^+$ degenerates to $\theta_0 = \frac{\pi}{2}$). Measuring each infinitesimal expansion $d\theta$ relative to the current anchor $\cos\theta$ defines the **intrinsic rapidity differential**:

   $$
   d\eta \;=\; \frac{d\theta}{\cos\theta} \;=\; \sec\theta\,d\theta, \qquad \theta \in \left[0, \frac{\pi}{2}\right).
   $$

2. **Inverse Gudermannian Bijection Pushing $90^\circ$ to Infinity**: Integrating from $0$ to $\theta \in [0, \frac{\pi}{2})$ yields a strictly increasing real-analytic bijection $[0, \frac{\pi}{2}) \xrightarrow{\sim} [0, +\infty)$ onto the infinite nonnegative rapidity half-line:

   $$
   \eta(\theta) \;=\; \int_0^\theta \sec\alpha\,d\alpha \;=\; \ln\tan\!\left(\frac{\theta}{2} + \frac{\pi}{4}\right) \;\Longleftrightarrow\; \sin\theta = \tanh\eta,\quad \cos\theta = \operatorname{sech}\eta.
   $$

   At the lucid self-referential fixed point $\theta_0 = \theta^* \approx 0.73908513\text{ rad}$ ($42.3465^\circ$), initial rapidity is $\eta_0 = \eta(\theta^*) \approx 0.81732635$; as $\theta \to (\frac{\pi}{2})^-$, $\tan(\frac{\theta}{2} + \frac{\pi}{4}) \to +\infty$ and hence $\eta(\theta) \to +\infty$—**the $90^\circ$ pure-light cliff that looks finitely reachable on a flat protractor sits at $+\infty$ in intrinsic rapidity!**

3. **Dual Asymptotic Guarantee Under Uniform Discrete Steps**: Advancing from $\eta_0 = \eta(\theta^*)$ in uniform discrete rapidity steps $\eta_k = \eta_0 + k\,\Delta\eta$ ($k \in \mathbb{N},\; \Delta\eta > 0$), the inclination $\theta_k = 2\arctan(e^{\eta_k}) - \frac{\pi}{2}$ satisfies at once:
   - **Exponential approach to $100\%$ global transverse reach**: $\sin\theta_k = \tanh\eta_k = 1 - \frac{2}{e^{2\eta_k} + 1} \xrightarrow{k \to \infty} 1^-$;
   - **Strictly positive 1D idempotent anchor at every finite step**: $\cos\theta_k = \operatorname{sech}\eta_k = \frac{2}{e^{\eta_k} + e^{-\eta_k}} > 0$ for every $k \in \mathbb{N}$, keeping the polyhedral remainder gap $\delta_k := \frac{\pi}{2} - \theta_k > 0$ **strictly open forever**!

4. **Concrete Numerical Audit ($\eta_0 = \eta(\theta^*) \approx 0.817326$, Unit Step $\Delta\eta = 1$)**:

| Discrete Step $k$ | Intrinsic Rapidity $\eta_k$ | Inclination $\theta_k$ (rad / deg) | Transverse Reach $\sin\theta_k = \tanh\eta_k$ | 1D Self-Anchor $\cos\theta_k = \operatorname{sech}\eta_k$ | Polytope Firewall Gap $\delta_k = \frac{\pi}{2} - \theta_k$ | Pythagoras $\sin^2\theta_k + \cos^2\theta_k$ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| $k = 0$ | $0.8173$ | $0.739085\text{ rad}$ ($42.3465^\circ$) | $0.673612$ | $0.739085$ | $0.831711\text{ rad}$ ($47.6535^\circ$) | $1.000000$ |
| $k = 1$ | $1.8173$ | $1.248691\text{ rad}$ ($71.5447^\circ$) | $0.948571$ | $0.316564$ | $0.322105\text{ rad}$ ($18.4553^\circ$) | $1.000000$ |
| $k = 2$ | $2.8173$ | $1.451407\text{ rad}$ ($83.1595^\circ$) | $0.992882$ | $0.119106$ | $0.119389\text{ rad}$ ($6.8405^\circ$) | $1.000000$ |
| $k = 4$ | $4.8173$ | $1.554620\text{ rad}$ ($89.0732^\circ$) | $0.999869$ | $0.016176$ | $0.016176\text{ rad}$ ($0.9268^\circ$) | $1.000000$ |
| $k = 8$ | $8.8173$ | $1.570500\text{ rad}$ ($89.9830^\circ$) | $0.99999996$ | $0.000296$ | $0.000296\text{ rad}$ ($0.0170^\circ$) | $1.000000$ |

By step $k = 8$, transverse field reach $\sin\theta_8$ already climbs to $99.999996\%$ while the one-dimensional self-anchor remains strictly positive at $\cos\theta_8 \approx 0.000296 > 0$.
:::

::: {.viz src="forgetting-rebirth-attractor" preset="staircase" height="500"}
**Equal rapidity steps creep toward the rim.** From $\theta^*$ with $\Delta\eta = 1$: the cyan points and the chord through each step crowd ever closer to the white rim, with step $8$ in amber; in the magnifier on the right the magenta gap $1 - \tanh\eta_8 \approx 4.4 \times 10^{-8}$ is still open. Raise the step to $\Delta\eta = 1.5$ and walk to step $10$: the magnifier narrows its field more than tenfold at every step, and the gap $1 - \tanh\eta_{10} \approx 3.6 \times 10^{-14}$ is still not $0$.
:::

Under the stated exact real-valued update law, positive hyperbolic secant at finite steps means the geometric anchor has not vanished; preserving actual memory still depends on its encoding and channel. Stepping back from [@ex-ch36-inverse-gudermannian-discrete-staircase], the polyhedral motif running through our entire monograph reveals its deepest existential meaning (`MODEL`): **a smooth sphere is forever only an approximation; that unclosed polyhedral seam is the very geometric firewall that moors the self-referential table $T$ and guards lucid awareness from plunging into amnesiac reincarnation.**

The classical geometric and artistic lineage of this hyperbolic–circular bridge and conformal disk horizon is recorded below:

::: {.remark #rem-ch36-poincare-disk-gudermannian-literature title="The Lambert–Gudermann Bridge, the Poincaré Conformal Disk Metric, and Escher's Circle Limit Tessellations (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The hyperbolic–circular bridge of [@ex-ch36-inverse-gudermannian-discrete-staircase] and the disk geometry in Panel II of Figure 36 and in the rapidity-staircase lab cards correspond to three classic landmarks in geometry and visual art not formalized as standalone theorems in `trureturing@dev`:

1. **Lambert's Transcendent Angle and the Gudermannian Function (J. H. Lambert, *Hist. Acad. Roy. Sci. Belles-Lettres Berlin*, 1768; C. Gudermann, *J. Reine Angew. Math.* **6**, 1830)**: Lambert and Gudermann established the real-analytic bridge $\theta = \operatorname{gd}(\eta) := 2\arctan(e^\eta) - \frac{\pi}{2} = \arcsin(\tanh\eta)$ ($\eta \in \mathbb{R},\; \theta \in (-\frac{\pi}{2}, \frac{\pi}{2})$) linking hyperbolic and circular functions without imaginary units via $\sinh\eta = \tan\theta$, $\cosh\eta = \sec\theta$, and $\tanh(\eta/2) = \tan(\theta/2)$, with inverse $\operatorname{gd}^{-1}(\theta) = \int_0^\theta \sec\alpha\,d\alpha$ shared by Mercator projection and hyperbolic rapidity;
2. **Poincaré's Conformal Unit-Disk Metric and Horizon at Infinity (H. Poincaré, *Acta Math.* **1**, 1–62, 1882)**: Equipping the open unit disk $\mathbb{D} = \{z \in \mathbb{C} : \lvert z\rvert < 1\}$ with the constant-negative-curvature ($K = -1$) conformal Riemannian metric

   $$
   ds^2 \;=\; \frac{4\,\lvert dz\rvert^2}{\bigl(1 - \lvert z\rvert^2\bigr)^2}
   $$

   and setting Euclidean radius $r = \lvert z\rvert = \tanh(\eta / 2) = \tan(\theta / 2) \in [0, 1)$ gives radial geodesic distance $\int_0^r \frac{2\,du}{1 - u^2} = 2\operatorname{artanh}(r) = \eta$ from $z = 0$. As $r \to 1^-$ ($\theta \to (\frac{\pi}{2})^-$), intrinsic distance $\eta \to +\infty$: the unit circle $\lvert z\rvert = 1$ lies at infinite geodesic distance, unreachable by any finite sequence of bounded intrinsic steps;
3. **Escher's *Circle Limit* Hyperbolic Woodcuts (M. C. Escher, *Circle Limit I–IV*, 1958–1960; cf. H. S. M. Coxeter, *Leonardo* **12**, 19–25, 1979)**: Inspired by correspondence with geometer H. S. M. Coxeter, Escher's *Circle Limit* woodcuts tile the Poincaré disk with congruent figures of identical intrinsic hyperbolic area arranged along circular arcs—shrinking visually into infinitely many discrete rings toward the outer boundary circle without ever touching or crossing the rim.
:::

::: {.viz src="forgetting-rebirth-attractor" preset="klein_vs_poincare" height="500"}
**One staircase, two disks.** Stopping at step $3$, swap the Beltrami–Klein disk (radius $\tanh\eta$, geodesics the straight chords shown as grey dashes) for the Poincaré disk (radius $\tanh(\eta/2)$): the cyan chords bend into arcs meeting the white rim at right angles, and in the readouts both proper-time rates equal $\operatorname{sech}\eta$.
:::

The staircase of this section starts at the same $\theta^*$ that the mutual reference of Chapter 33 locks into; the film below joins the two, step by step.

::: {.film src="rapidity-staircase"}
**From the mutual lock to the rapidity staircase (2:53).** Checking itself by $x \mapsto \cos x$, a lone observer's readings cross $\theta^* \approx 0.739$ at every step; two observers reading each other, sampled two beats to a round, approach it from below only, with a local asymptotic error factor of about $0.454 = 0.674^2$ per round (clauses 14, 17, 20, 21 and 24 of [@ex-ch33-mutual-cosine-monotonic-lock], an application of existing results). From $\theta^*$, steps of $29.2^\circ$ on the outside angle ruler hit $90^\circ$ on the second step; steps of $1$ in the rapidity $\eta$ give $42.3^\circ$, $71.5^\circ$, $83.2^\circ$, $87.5^\circ$, … crowding toward the wall, and at step $8$ the gap $1 - \tanh\eta_8 \approx 4.4 \times 10^{-8}$ is still open ([@ex-ch36-inverse-gudermannian-discrete-staircase], a literature result). Finally, the image circles of the lines $\operatorname{Re}(s) = c$ under $w = (s - 1)/s$ close in on the unit circle as $c \to \tfrac{1}{2}$, and the modulus is $1$ exactly when $\operatorname{Re}(s) = \tfrac{1}{2}$, by Conjunct 2 of [@thm-ch36-taylor-tail-and-cayley-boundary]; every other number in the film is computed on screen.
:::

---
