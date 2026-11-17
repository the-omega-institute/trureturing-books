# 24.5 Carrying the Loop Through: True Convergence Rate, Derivative Speed-Up, and the Width of the Rational Seam {#sec-ch24-5}

The aphorism is stated; now let us do the arithmetic. The cosine table in [@ex-dottie-and-golden-iterations] lists only four rows, and the contraction constant $\sin 1 \approx 0.8415$ of [@rem-banach-dottie-hairy-ball-literature] is the worst case over the whole interval $[0, 1]$. Three questions are still open:

1. Close to $\theta^*$, by how much does one press of the cosine key actually shrink the error?

::: {.viz src="fixed-point-convergence" preset="rate" height="500"}
**Near the fixed point, the error ratio tends to about −0.674.** Taking the cosine again and again from $\theta_0 = 1$ while the view zooms with the error: zoomed in, the cyan curve lies on the magenta tangent, every turn has the same shape, and the ratio of successive turns tends to the slope of the tangent, $-\sin\theta^* \approx -0.674$, gentler than the global constant $-\sin 1 \approx -0.84$ of the dashed grey line; every step is closer, yet no step lands exactly on $\theta^*$ ($\theta_0 = 1$ lies in $[0, 1]$ and is not $\theta^*$, so the error ratio tends to $-\sqrt{1 - (\theta^*)^2}$, an application of existing results, clauses 22–23 of [@ex-ch33-mutual-cosine-monotonic-lock]; the decimals are numerical).
:::

2. If the ruler reads not only the projection $\cos\theta$ but also the orthogonal component $\sin\theta$, how much faster does the loop close?

::: {.viz src="fixed-point-convergence" preset="newton" height="500"}
**Follow the tangent: near the fixed point, digits double asymptotically.** Again from $\theta_0 = 1$, each step reads the height of the curve and then follows the magenta tangent to the grey line $y = x$. Once it is near the fixed point, the view zooms along and stops at step $2$, about $10^{-4}$ wide. The amber $x_2$ has just come down the magenta tangent of the previous step onto the grey line, $2.78\times10^{-5}$ from the white ring $\theta^*$; at this magnification the cyan curve is already too straight to tell from its tangent. The correct decimal digits run $0$, $1$, $4$, with the error asymptotically squared at each step; the plain iteration needs $24$ steps to match this step (numerical check in [@ex-dottie-rate-newton-rational]).
:::

3. How close to $\cos q = q$ can a ruler with finitely many rational tick marks get?

::: {.figure src="ch24-three-speeds"}
**The three questions, answered numerically side by side.** Left, by step: the cyan points, repeated cosine, go down one equal notch per step along the dashed line of slope $\lg\lambda$ ($\lambda \approx 0.674$) and pass $10^{-10}$ only at step $55$; the magenta points, Newton's method, reach $10^{-21}$ in four steps. Right, by denominator: seven points are the residuals $\lvert\cos q - q\rvert$ of the convergents of $\theta^*$, all under the dashed bound $(1 + \sin 1)/b^2$, falling but never zero. All are numerical results; the asymptotic factor of the cosine iteration is an application of existing results in [@ex-ch33-mutual-cosine-monotonic-lock], while the Newton rate and the residual bound are literature results in the note below, not formalized in this book.
:::

::: {.remark #rem-dottie-convergent-residual-literature title="Asymptotic Contraction Rate, Newton's Quadratic Speed-Up, and Continued-Fraction Convergent Residual Bounds for θ* (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The exact asymptotic factor and conditional error ratio are applications of existing results in [@ex-ch33-mutual-cosine-monotonic-lock]. The higher-order expansion, Newton method, continued-fraction bounds, and decimals below retain their separate literature or numerical status.

**First question: position and rate lie on one unit circle.** Write the error as $\delta_k = \theta_k - \theta^*$, expand $\cos$ about $\theta^*$, and cancel the zeroth-order term with $\cos\theta^* = \theta^*$:

$$
\delta_{k+1} \;=\; \cos(\theta^* + \delta_k) - \theta^* \;=\; -\sin\theta^*\,\delta_k \;-\; \frac{\theta^*}{2}\,\delta_k^2 \;+\; O(\delta_k^3).
$$

Strict alternation requires $\theta_0\in[0,1]\setminus\{\theta^*\}$; under that hypothesis the order argument in Chapter 33 makes the iterates straddle $\theta^*$ alternately from the right and from the left, which is the square spiral of the cobweb diagram. Its modulus

$$
\lambda \;=\; \lvert\cos'\theta^*\rvert \;=\; \sin\theta^* \;=\; \sqrt{1 - (\theta^*)^2} \;\approx\; 0.6736120292
$$

is exactly the orthogonal bivector area in the last line of [@ex-dottie-and-golden-iterations]. The **position** $\theta^* = \cos\theta^*$ of the fixed point and its **asymptotic contraction rate** $\lambda = \sin\theta^*$ are therefore the two components of a single unit vector:

$$
(\theta^*)^2 + \lambda^2 = 1.
$$

The line component says where the loop comes to rest; the area component says how fast it closes. Each press of the cosine key multiplies the error by about $0.6736$, not by the global bound $0.8415$; each further decimal digit costs $\ln 10 / \lvert\ln\lambda\rvert \approx 5.83$ steps, not $\ln 10 / \lvert\ln\sin 1\rvert \approx 13.34$.

**Second question: let the ruler read both line and area.** Picard iteration uses only the projection reading $\cos\theta_k$ at each step. Writing the equation as $F(\theta) = \theta - \cos\theta = 0$, Newton's iteration

$$
\theta_{k+1} \;=\; \theta_k - \frac{\theta_k - \cos\theta_k}{1 + \sin\theta_k}
$$

reads one more quantity per step: the orthogonal component $\sin\theta_k$. Since $F'(\theta^*) = 1 + \sin\theta^* = 1 + \lambda$ and $F''(\theta^*) = \cos\theta^* = \theta^*$, the error recursion turns from linear into quadratic:

$$
\delta_{k+1} \;=\; \frac{\theta^*}{2\,(1 + \lambda)}\,\delta_k^2 + O(\delta_k^3), \qquad \frac{\theta^*}{2\,(1 + \lambda)} \approx 0.2208054 .
$$

Picard iteration adds a fixed number of digits per step; once it is near the fixed point, Newton's iteration asymptotically doubles the number of correct digits.

**Third question: the residual is the distance to the fixed point.** For $q \in [0, 1]$, apply the mean value theorem to $F$ and use $F(\theta^*) = 0$: there is some $\xi$ between $q$ and $\theta^*$ with

$$
\cos q - q \;=\; -\bigl(F(q) - F(\theta^*)\bigr) \;=\; -(1 + \sin\xi)\,(q - \theta^*).
$$

Because $1 \le 1 + \sin\xi \le 1 + \sin 1$ for $\xi \in [0, 1]$, we obtain the two-sided bound

$$
\lvert q - \theta^*\rvert \;\le\; \lvert\cos q - q\rvert \;\le\; (1 + \sin 1)\,\lvert q - \theta^*\rvert, \qquad 1 + \sin 1 \approx 1.8414710,
$$

and the ratio $\lvert\cos q - q\rvert / \lvert q - \theta^*\rvert$ tends to $1 + \sin\theta^* = 1 + \lambda \approx 1.6736120$ as $q \to \theta^*$. So "how small can the residual of a finite-precision reading be" and "how well can rationals approximate $\theta^*$" are the same question. Furthermore, because $\theta^*$ is irrational (item 2 of [@rem-banach-dottie-hairy-ball-literature], by the Lindemann–Weierstrass theorem), standard Diophantine approximation guarantees that every continued-fraction convergent $a/b$ of $\theta^*$ satisfies $0 < \lvert\theta^* - a/b\rvert < 1/b^2$, and combining this with the mean-value bound above yields

$$
0 \;<\; \Bigl\lvert\cos\frac{a}{b} - \frac{a}{b}\Bigr\rvert \;<\; \frac{1 + \sin 1}{b^2}
$$

for infinitely many denominators $b$: the seam narrows like the square of the denominator, yet never closes.
:::

Back to the answer to the first question: where the fixed point sits and how fast the loop closes are the two coordinates of one point $(\theta^*, \lambda)$ on the unit circle.

::: {.viz src="fixed-point-convergence" preset="circle" height="500"}
**Where it stops, and how fast it closes.** The same cobweb with the unit circle added. On the circle sits $P = (\theta^*, \sin\theta^*)$: its cyan abscissa $\theta^*$ is where the cobweb closes in, and its magenta height $\lambda = \sin\theta^* \approx 0.674$ is the ratio by which each step shrinks the error, the size of the slope of the magenta tangent; $(\theta^*)^2 + \lambda^2 = 1$. For the existence and uniqueness of $\theta^*$ see [@thm-dottie-rational-inverse-endpoint].
:::

::: {.example #ex-dottie-rate-newton-rational title="Numerical Check of the True Contraction Rate, Newton's Quadratic Closure, and the Residuals of the Best Rational Readings"}
**Literature result, not formalized in this book (all values below were recomputed at 50 decimal digits and rounded to the digits shown; the partial quotients of the continued fraction are numerical observations, not theorems).**

**Successive error ratios tend to $-\sin\theta^*$.** Starting from $\theta_0 = 1$, with $\delta_k = \theta_k - \theta^*$:

| $k$ | $\theta_k$ | $\delta_k$ | $\delta_{k+1}/\delta_k$ | second-order prediction $-\lambda - \frac{\theta^*}{2}\delta_k$ |
| :---: | :---: | :---: | :---: | :---: |
| $0$ | $1.0000000000$ | $+0.2609149$ | $-0.761869$ | $-0.770031$ |
| $1$ | $0.5403023059$ | $-0.1987828$ | $-0.595967$ | $-0.600153$ |
| $2$ | $0.8575532158$ | $+0.1184681$ | $-0.715765$ | $-0.717391$ |
| $3$ | $0.6542897905$ | $-0.0847953$ | $-0.641488$ | $-0.642277$ |
| $4$ | $0.7934803587$ | $+0.0543952$ | $-0.693376$ | $-0.693713$ |
| $8$ | $0.7504177618$ | $+0.0113326$ | $-0.677785$ | $-0.677800$ |
| $12$ | $0.7414250866$ | $+0.0023400$ | $-0.674476$ | $-0.674477$ |
| $20$ | $0.7391843998$ | $+0.0000993$ | $-0.673649$ | $-0.673649$ |

The ratios oscillate on either side of the limit $-\lambda \approx -0.673612$, with an amplitude given by the second-order term. Actual counts: $\lvert\delta_k\rvert$ first drops below $10^{-10}$ at $k = 55$ and below $10^{-15}$ at $k = 85$.

**Newton's iteration.** Same seed $\theta_0 = 1$:

| $k$ | $\theta_k$ | $\lvert\delta_k\rvert$ | $\lvert\delta_{k+1}\rvert / \delta_k^2$ |
| :---: | :---: | :---: | :---: |
| $0$ | $1.000000000000000000000$ | $2.61\times10^{-1}$ | $0.165677$ |
| $1$ | $0.750363867840243893035$ | $1.13\times10^{-2}$ | $0.218204$ |
| $2$ | $0.739112890911361670361$ | $2.78\times10^{-5}$ | $0.220799$ |
| $3$ | $0.739085133385283969760$ | $1.70\times10^{-10}$ | $0.220805$ |
| $4$ | $0.739085133215160641662$ | $6.39\times10^{-21}$ | $0.220805$ |

Picard iteration needs $54$ steps to match the accuracy of Newton's step $3$, and $115$ steps to match step $4$.

**Best rational readings.** $\theta^* = [0; 1, 2, 1, 4, 1, 40, 1, 9, 4, 2, 1, \dots]$; the convergents $a/b$ and their residuals are:

| $a/b$ | decimal value | $\lvert a/b - \theta^*\rvert$ | residual $\lvert\cos(a/b) - a/b\rvert$ | $b^2 \times$ residual |
| :---: | :---: | :---: | :---: | :---: |
| $2/3$ | $0.6666666667$ | $7.24\times10^{-2}$ | $1.19\times10^{-1}$ | $1.07$ |
| $3/4$ | $0.7500000000$ | $1.09\times10^{-2}$ | $1.83\times10^{-2}$ | $0.293$ |
| $14/19$ | $0.7368421053$ | $2.24\times10^{-3}$ | $3.75\times10^{-3}$ | $1.35$ |
| $17/23$ | $0.7391304348$ | $4.53\times10^{-5}$ | $7.58\times10^{-5}$ | $0.0401$ |
| $694/939$ | $0.7390841321$ | $1.00\times10^{-6}$ | $1.68\times10^{-6}$ | $1.48$ |
| $711/962$ | $0.7390852391$ | $1.06\times10^{-7}$ | $1.77\times10^{-7}$ | $0.164$ |
| $7093/9597$ | $0.7390851308$ | $2.45\times10^{-9}$ | $4.09\times10^{-9}$ | $0.377$ |

Every entry of the last column is below $1 + \sin 1 \approx 1.84$, in agreement with the upper bound above. The unusually large partial quotient $40$ makes $17/23$ an exceptionally good reading: an exhaustive search shows that no fraction with denominator below $502$ is closer to $\theta^*$, and the first one to beat it is $371/502$. The reading $739/1000$ of a three-decimal ruler leaves a residual of $1.42\times10^{-4}$, nearly twice that of $17/23$.
:::

::: {.viz src="fixed-point-convergence" preset="rational" height="500"}
**The seam narrows but never closes.** The convergents $2/3, 3/4, 14/19, 17/23, 694/939, \dots$ of $\theta^*$ land one by one on the grey line (amber marks the current one), and the magenta upright is the drop from there to the cosine curve, the residual $\lvert\cos q - q\rvert$. Its endpoint on the cosine curve always stays inside the wedge of the two dashed grey lines (slopes $0$ and $-\sin 1$); with the view magnified ten million times, it is still there.
:::

The last table of [@ex-dottie-rate-newton-rational] shows that refining the tick marks does not automatically buy a better reading. What sets the width of the seam is not the size of the denominator but its arithmetic relation to $\theta^*$: a ruler with twenty-three divisions happens to line up almost exactly at its seventeenth mark, and a ruler with a thousand divisions does not.

::: {.viz src="fixed-point-convergence" preset="ruler" height="500"}
**Twenty-three divisions beat a thousand.** The amber $17/23$ next to the dashed ruler reading $739/1000$: the tick nearest $\theta^*$ on a thousandths ruler leaves about twice the residual of $17/23$ ($1.42\times10^{-4}$ against $7.58\times10^{-5}$).
:::

Rational readings never line up. What about a different kind of closure: instead of asking the projection to return to itself, ask a rotation to return to its starting point? The answer is again no, and this time no conjecture is needed.

::: {.remark #rem-dottie-angle-incommensurable title="θ* and π Are Incommensurable: Rotation by the Fixed-Point Angle Never Closes (Corollary of a Literature Result, Not Formalized in This Book)"}
**Corollary of a literature result, not formalized in this book.** The hypothesis used in [@conj-schanuel-dottie], that $i\theta^*$ and $i\pi$ are linearly independent over $\mathbb{Q}$, is equivalent to $\theta^*/\pi \notin \mathbb{Q}$. This holds without any conjecture:

Suppose $\theta^* = \frac{m}{n}\pi$ with integers $m, n$ and $n \ge 1$. Put $\zeta = e^{i m\pi/n}$. Then $\zeta^{2n} = 1$, so $\zeta$ is a root of unity and hence algebraic, and therefore $\cos\frac{m\pi}{n} = \frac{\zeta + \zeta^{-1}}{2}$ is algebraic as well. But $\cos\theta^* = \theta^*$, so $\theta^*$ would be algebraic, contradicting the transcendence obtained from the Lindemann–Weierstrass theorem in item 2 of [@rem-banach-dottie-hairy-ball-literature]. Hence $\theta^*/\pi$ is irrational (numerically $\theta^*/\pi \approx 0.2352581$, that is, $\theta^* \approx 42.3465^\circ$).

Two consequences follow:

1. **The rotation has infinite order.** The plane rotation $R(\theta^*)$ by the angle $\theta^*$ satisfies $R(\theta^*)^n \ne \mathrm{id}$ for every integer $n \ge 1$, because $R(\theta^*)^n = \mathrm{id}$ if and only if $n\theta^* \in 2\pi\mathbb{Z}$. Correspondingly, no positive integer power of the unit rotor $U(\theta^*) = \cos(\theta^*/2) - \hat{I}\sin(\theta^*/2)$ equals $\pm 1$.
2. **The orbit is dense and equidistributed.** The sequence $\{n\theta^* \bmod 2\pi\}_{n \ge 0}$ is dense and equidistributed on the circle. The step "orbits of an irrational rotation are equidistributed" has a frozen Lean proof, see [@lem-irrational-rotation-equidistribution] below; the irrationality needed to apply it to $\theta^*$ is the first half of this remark.

Whether $\theta^*/\pi$ is transcendental is not settled by this argument; it holds under Schanuel's conjecture, since it follows from the conclusion of [@conj-schanuel-dottie] (algebraic independence of $\theta^*$ and $\pi$).
:::

Put the two facts side by side: the cosine projection closes in one step at $\theta^*$ ($\cos\theta^* = \theta^*$), while the rotation with step $\theta^*$ never returns to its starting point. The same angle is a fixed point for projection and an open helix for rotation.

"Never returns to its starting point" can be made more precise: the orbit not only fails to close, it also visits the whole circle uniformly. This step needs no citation from the literature; the pinned repository holds a frozen theorem.

::: {.lemma #lem-irrational-rotation-equidistribution title="Under an Irrational Rotation, Orbit Averages of Continuous Observables Tend to the Haar Average" lean="D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar"}
Let $\alpha \in \mathbb{R}$ be irrational (`hα : Irrational α`), let $\rho \in \mathbb{R}$ be an arbitrary initial phase, and let $f : \mathbb{R}/\mathbb{Z} \to \mathbb{C}$ be continuous (in Lean, $\mathbb{R}/\mathbb{Z}$ is `AddCircle (1 : ℝ)` and the hypothesis is `hf : Continuous f`). Then, as $N \to \infty$,

$$
\frac{1}{N}\sum_{i=0}^{N-1} f\bigl(\rho + i\,\alpha\bigr) \;\longrightarrow\; \int_{\mathbb{R}/\mathbb{Z}} f(x)\,\mathrm{d}\mu(x),
$$

where $\rho + i\alpha$ stands for its image in $\mathbb{R}/\mathbb{Z}$ and $\mu$ is the normalized Haar measure on $\mathbb{R}/\mathbb{Z}$ (`AddCircle.haarAddCircle`).
:::

::: proof
The continuous functions for which the conclusion holds form a complex linear subspace $S$. First, every character $x \mapsto e^{2\pi i m x}$ lies in $S$: for $m = 0$ both sides equal $1$; for $m \neq 0$ the orbit average is a geometric sum with ratio $e^{2\pi i m\alpha}$ divided by $N$, and since $\alpha$ is irrational the ratio is not $1$, the geometric sum is bounded, the average tends to $0$, and the Haar integral of the character is $0$ as well (`fourier_average_tendsto`). Second, $S$ is closed under uniform convergence: the averaging functionals have norm at most $\lVert f\rVert_\infty$, so they form an equicontinuous family of linear functionals and pointwise limits are preserved on closed sets. Third, the linear span of the characters is dense in the space of continuous functions (`span_fourier_closure_eq_top`). Together the three steps show that $S$ consists of all continuous functions. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-dottie-orbit-seventeen title="The Orbit with Step θ*: Seventeen Steps Nearly Close It, Yet It Eventually Covers the Circle"}
(When instantiating [@lem-irrational-rotation-equidistribution] at $\alpha = \frac{\theta^*}{2\pi}$, the equidistribution theorem itself is kernel-verified, whereas the irrationality input $\alpha \notin \mathbb{Q}$ from [@rem-dottie-angle-incommensurable] is a **literature result, not formalized in this book**.) The values below were computed from closed-form geometric sums and checked by direct summation; the partial quotients of the continued fraction are numerical observations.

**The near-closure after seventeen steps.** The continued fraction of $\frac{\theta^*}{2\pi} \approx 0.1176290523$ is $[0; 8, 1, 1, 191, 1, 1, \dots]$. The unusually large partial quotient $191$ makes the convergent $\frac{2}{17}$ exceptionally accurate:

$$
17\,\theta^* \;=\; 4\pi - 0.0019233\ldots \quad(\text{radians}),
$$

that is, after seventeen steps and two full turns the orbit is only $0.1102^\circ$ away from its starting point. The next closer approach has to wait until step $3256$ (gap $0.0012211$ radians).

**Orbit averages of two observables.** With initial phase $\rho = 0$, compare $f_1(x) = \cos(2\pi x)$ and $f_{17}(x) = \cos(2\pi\cdot 17x)$, both of Haar average $0$:

| steps $N$ | orbit average of $f_1$ | orbit average of $f_{17}$ | orbit average of $f_{17}$ when the angle is replaced by $2\pi\cdot\frac{2}{17}$ |
| :---: | :---: | :---: | :---: |
| $10$ | $+0.143151$ | $+0.999947$ | $1$ |
| $10^2$ | $-0.008271$ | $+0.993938$ | $1$ |
| $10^3$ | $-0.000091$ | $+0.488620$ | $1$ |
| $10^4$ | $+0.000188$ | $+0.019479$ | $1$ |
| $10^5$ | $-0.000006$ | $-0.003332$ | $1$ |

The average of $f_1$ tends to $0$ quickly: the geometric sum gives the bound $\frac{1}{N\lvert\sin(\theta^*/2)\rvert} \approx \frac{2.77}{N}$. The average of $f_{17}$ hardly moves for a long time: it is sensitive exactly to the seventeen-step near-closure, the corresponding bound is $\frac{1}{N\lvert\sin(17\theta^*/2)\rvert} \approx \frac{1040}{N}$, and only for $N$ much larger than $1040$ does the average come close to the Haar average $0$. If the angle is replaced by $2\pi\cdot\frac{2}{17}$, which is commensurable with $\pi$, the orbit has only seventeen points and the average of $f_{17}$ is $1$ forever, not the Haar average: the irrationality hypothesis of [@lem-irrational-rotation-equidistribution] cannot be dropped.
:::

::: {.figure src="ch24-seventeen-steps"}
**Turning by $\theta^*$: seventeen steps almost close, and only a long time covers the circle.** Left: $17$ points joined in order go round twice and almost close into a seventeen-pointed star; the start and step $17$ differ by only $0.11^\circ$ (magnified in the magenta box). Middle and right: step $k$ is drawn at $0.3 + 0.7k/N$ of the radius, later steps further out; after $100$ steps the points still form $17$ spokes, and after $3256$ steps the spokes have turned round into every direction. Equidistribution is [@lem-irrational-rotation-equidistribution], whose hypothesis $\theta^*/2\pi \notin \mathbb{Q}$ is a literature result ([@rem-dottie-angle-incommensurable]); the positions of the points are numerical.
:::

Within a hundred steps, the orbit with step $\theta^*$ looks almost indistinguishable from a regular heptadecagon; equidistribution shows itself only on a longer time scale. An observer with finitely many steps sees a closed polygon; the whole circle appears only in the limit of infinitely many.

::: {.viz src="fixed-point-convergence" height="560"}
**How fixed points close in: the full lab.** Three scenes on one cobweb plane: iteration ($\cos x$ or $1 + 1/x$, with a draggable start and three cameras), Newton's method, and rational readings (with an adjustable ruler). Qualitative cosine convergence and conditional asymptotic factors follow from the reuse derivation in [@ex-ch33-mutual-cosine-monotonic-lock]; Newton's method, numerical values, and residual bounds retain their literature or numerical boundaries; the green boxes cite only [@cor-golden-fixed-point-unique] and [@thm-dottie-rational-inverse-endpoint].
:::

## 24.5.1 Twin-Spiral Correspondence: From the One-Dimensional Golden Continued Fraction to Two-Dimensional Cosine Whirling Squares {#sec-ch24-dottie-fibonacci-spirals}

Looking back at the two tables computed side by side in [@ex-dottie-and-golden-iterations] — the golden reciprocal continued-fraction iteration and the cosine fixed-point iteration — the author recorded an observation in the manuscript that goes straight to the geometric core: *"Approaching $\theta$ is very much like a Fibonacci spiral."*（“逼近 $\theta$ 的过程很像斐波那契螺旋。”） Far from a loose visual metaphor, this expresses a structural correspondence and continuous spiral interpolation model (`MODEL`) of the same negative-slope turning mechanism acting first on a flat one-dimensional ruler and then on a curved two-dimensional circular arc.

Why does a recurrence that takes values purely on a one-dimensional real interval wind into an inward spiral as soon as it is plotted in the plane? Place the two recurrences side by side: on one hand, the golden inverse branch $x_{k+1} = \frac{1}{1 + x_k}$ starting from $x_0 = 1$ steps through the Fibonacci convergents $1/1,\; 1/2,\; 2/3,\; 3/5,\; 5/8,\; 8/13,\; \dots \to \varphi^{-1} \approx 0.6180339887$ (whose unique positive fixed point is locked in `trureturing` by [@lem-golden-inverse-branch-fixed-point] `golden_inverse_branch_positive_fixed_point_iff`, while the alternating sign $(-1)^{k+1}$ and the strict rational-approximation lower bound $\lvert\varphi - q\rvert > \frac{1}{\sqrt{5}\,b^2 + b}$ for every $q = a/b \in \mathbb{Q}$ are proved in the [Coda](coda.md) at [@thm-coda-golden-cut-observer-cassini] and [@thm-coda-golden-hurwitz]; that the all-ones continued fraction $[1; 1, 1, \dots]$ achieves asymptotic Hurwitz extremality among all irrationals is a classical number-theoretic theorem, Hurwitz 1891); on the other hand, the cosine iteration $\theta_{k+1} = \cos\theta_k$ starting from $\theta_0 = 0$ steps through $0 \to 1 \to 0.5403 \to 0.8576 \to 0.6543 \to 0.7935 \to \dots \to \theta^* \approx 0.7390851332$ (whose unique positive fixed point is locked by [@thm-dottie-rational-inverse-endpoint] `rational_inverse_endpoint`, with qualitative convergence and strict alternation hypotheses derived in [@ex-ch33-mutual-cosine-monotonic-lock]). In real analysis, neither orbit creeps monotonically from one side because both maps are strictly decreasing on their invariant intervals (their first derivatives at the fixed point are also strictly negative; item 1 of [@rem-dottie-fibonacci-spiral-literature] below). In our Clifford orthogonal geometric model (`MODEL`, whose discrete operator prototype is the skew-adjoint unitary squaring law $R^2 = -I_n$ of [Chapter 5](ch05-complex-phase-and-rotors.md), [`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)), the minus sign $-1 = \hat{\mathbf{I}}^2$ is not a discontinuous leap along a line, but **two consecutive same-handed $90^\circ$ right-angle turns** in a two-dimensional bivector plane: left-right oscillation on the real axis is the edge-on shadow of an inward spiral. Unfolded onto the cobweb plane $(x_k, x_{k+1})$, each Picard update splits into a vertical read $A_k(x_k, x_k) \to B_k(x_k, x_{k+1})$ and a horizontal return $B_k(x_k, x_{k+1}) \to A_{k+1}(x_{k+1}, x_{k+1})$ of strictly equal length (winding $2 \times 90^\circ = 180^\circ$ around the fixed point per step): starting below the fixed point ($x_0 < x^*$, such as $\theta_0 = 0 < \theta^*$) enters the clockwise cycle at **North ($+\mathbf{e}_2$) $\to$ East ($+\mathbf{e}_1$) $\to$ South ($-\mathbf{e}_2$) $\to$ West ($-\mathbf{e}_1$)**, whereas starting above it ($x_0 > x^*$, such as $x_0 = 1$) enters the same clockwise cycle shifted by two quarter-turns (**South $\to$ West $\to$ North $\to$ East**), with vanishing step $s_k = 0$ when $x_0 = x^*$. Each step bounds a nested square whose inscribed **piecewise quarter-circle guide** (whose tangents meet perpendicularly at every diagonal vertex $A_{k+1}$ even under zoom) parallels the Fibonacci whirling-square diagram: the diagonal vertices and square side lengths contract asymptotically at the geometric rate $\lambda = \lvert f'(x^*)\rvert$, while on the polar stage a separate smooth equiangular logarithmic spiral $R(\phi) = R_0 e^{-b\phi}$ (`MODEL`) continuously interpolates that discrete geometric contraction.

::: {.viz src="dottie-fibonacci-spirals" preset="whirl" height="500"}
**Every cobweb step frames a whirling square.** Iterating the cyan curve $y = \cos\theta$ from $\theta_0 = 0$, each vertical step to the curve and horizontal return to the grey diagonal $y = x$ have equal length $\lvert\cos\theta_k - \theta_k\rvert$, winding clockwise North $\to$ East $\to$ South $\to$ West to nest squares and piecewise $90^\circ$ cyan quarter-circle guides around the cyan fixed-point ring $(\theta^*, \theta^*)$ on the grey coordinate crosshair; at step index $k = 5$ (after five completed updates $Q_0 \dots Q_4$), amber marks only the active update $Q_5$ and its South $\to$ West arms and square (equal-arm and turn properties in [@rem-dottie-fibonacci-spiral-literature]; uniqueness of the positive fixed point in [@thm-dottie-rational-inverse-endpoint]).
:::

::: {.remark #rem-dottie-fibonacci-spiral-literature title="Twin-Spiral Contraction Factors, Pythagorean Conservation Duality, and Equiangular Spiral Inward-Radial Tangent Angles (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** The following properties of cobweb whirling squares, flat-versus-curved golden conservation laws, and equiangular logarithmic spiral tangent angles belong to classical calculus and plane differential geometry (with qualitative cosine convergence and strict alternation reusing the derivation in [@ex-ch33-mutual-cosine-monotonic-lock], while decimal values and plane-geometric formulas retain their literature or numerical boundaries):

1. **Negative fixed-point derivatives, equal-arm cobweb polylines, and piecewise whirling-square arcs.** At the positive fixed points $x^* = \varphi^{-1} = \frac{\sqrt{5}-1}{2}$ of $g(x) = \frac{1}{1+x}$ and $\theta^*$ of $f(\theta) = \cos\theta$, the first derivatives are

   $$
   g'(\varphi^{-1}) \;=\; -\frac{1}{(1 + \varphi^{-1})^2} \;=\; -\varphi^{-2} \;\approx\; -0.3819660113 < 0, \qquad f'(\theta^*) \;=\; -\sin\theta^* \;\approx\; -0.6736120292 < 0.
   $$

   For any one-dimensional map $h$ with cobweb vertices $A_k = (x_k, x_k)$ and $B_k = (x_k, x_{k+1})$ ($x_{k+1} = h(x_k)$), the vertical displacement $(0, x_{k+1} - x_k)$ and horizontal displacement $(x_{k+1} - x_k, 0)$ have identical Euclidean length

   $$
   \lvert B_k - A_k\rvert \;=\; \lvert A_{k+1} - B_k\rvert \;=\; s_k \;=\; \lvert h(x_k) - x_k\rvert.
   $$

   Each Picard update traverses two perpendicular arms ($180^\circ$ around $(x^*, x^*)$): whenever the signed residual alternates strictly across $x^*$ (guaranteed for cosine iteration on $\theta_0 \in [0, 1] \setminus \{\theta^*\}$ by the order argument in [@ex-ch33-mutual-cosine-monotonic-lock]), starting below $x^*$ ($x_0 < x^*$) enters the clockwise cycle at $+\mathbf{e}_2$ (North) $\to +\mathbf{e}_1$ (East) $\to -\mathbf{e}_2$ (South) $\to -\mathbf{e}_1$ (West), whereas starting above $x^*$ ($x_0 > x^*$) enters the same clockwise cycle shifted by two quarter-turns (South $\to$ West $\to$ North $\to$ East), with $s_k = 0$ at $x_0 = x^*$. Each step bounds the square $[\min(x_k, x_{k+1}),\, \max(x_k, x_{k+1})]^2$ of side $s_k$ enclosing $(x^*, x^*)$; the quarter-circle arcs of radius $s_k$ centered at $(x_{k+1}, x_k)$ from $A_k$ to $A_{k+1}$ form **piecewise quarter-circle guides** (retaining perpendicular tangents at every diagonal junction $A_{k+1}$ even under exact linear scaling, and never converging in curve shape to a smooth logarithmic spiral); rather, in the asymptotic linear regime $\delta_{k+1} \approx h'(x^*)\,\delta_k$ the diagonal vertices and square side lengths contract geometrically at rate $\lambda = \lvert h'(x^*)\rvert$, which item 3 below continuously interpolates on the polar plane via a separate smooth equiangular logarithmic spiral $R(\phi) = R_0 e^{-b\phi}$.

2. **One-dimensional linear additive conservation versus two-dimensional Pythagorean square conservation.**
   - **One-dimensional flat golden section ($\varphi^{-1}$)**: For $x > 0$, $x = \frac{1}{1+x}$ is equivalent to $x + x^2 = 1$, locking the fixed point $x^* = \varphi^{-1} \approx 0.6180339887$ and the single-step contraction modulus $\lambda_\varphi = \lvert g'(\varphi^{-1})\rvert = \varphi^{-2} \approx 0.3819660113$ (factoring the sign reversal into two equal $90^\circ$ turns gives a per-quarter-turn radial scaling of $\sqrt{\lambda_\varphi} = \varphi^{-1} \approx 0.618034$). Fixed-point position and single-step contraction obey **one-dimensional linear additive conservation**:

     $$
     \varphi^{-1} + \varphi^{-2} \;=\; 0.6180339887\ldots + 0.3819660113\ldots \;=\; 1.
     $$

   - **Two-dimensional curved cosine fixed point ($\theta^*$)**: Bending the unit ruler into a circular arc, $\cos\theta = \theta$ locks the fixed point $\theta^* \approx 0.7390851332$ and the orthogonal contraction modulus $\lambda_\theta = \lvert f'(\theta^*)\rvert = \sin\theta^* \approx 0.6736120292$. Relative to $\varphi^{-1} \approx 0.6180339887$, $\lambda_\theta$ is shifted upward by only

     $$
     \lambda_\theta - \varphi^{-1} \;=\; \sin\theta^* - \varphi^{-1} \;\approx\; +0.055578 \quad\text{($+5.56$ percentage points, or $\approx 9.0\%$ relative to $\varphi^{-1}$)},
     $$

     while fixed-point position and contraction modulus now obey **two-dimensional Pythagorean square conservation** on the unit circle:

     $$
     (\theta^*)^2 + \lambda_\theta^2 \;=\; \cos^2\theta^* + \sin^2\theta^* \;=\; 0.5462468341\ldots + 0.4537531659\ldots \;=\; 1.
     $$

3. **Jakob Bernoulli's equiangular logarithmic spiral and inward-radial tangent angle.** Jakob Bernoulli (*Acta Eruditorum*, 1692) studied the polar logarithmic spiral $R(\phi) = R_0 e^{-b\phi}$ ($R_0 > 0,\; b \ge 0$), naming it *spira mirabilis* (*"Eadem mutata resurgo"*, "Though changed, I arise the same") for its exact self-similarity under rescaling. Writing $\kappa = e^{-b\pi/2} \in (0, 1]$ for the radial scaling per clockwise $90^\circ$ quarter-turn gives damping rate $b = -\frac{2}{\pi}\ln\kappa$ and $360^\circ$ full-turn scaling $\kappa^4 = e^{-2\pi b}$. Parametrizing clockwise from North $+\mathbf{e}_2$ as $\mathbf{r}(\phi) = R(\phi)(\sin\phi, \cos\phi)$, with outward radial unit vector $\hat{\mathbf{r}}(\phi) = (\sin\phi, \cos\phi)$ and clockwise circle-tangent unit vector $\hat{\boldsymbol{\phi}}(\phi) = (\cos\phi, -\sin\phi)$, differentiation yields $\mathbf{r}'(\phi) = R(\phi)\bigl(-b\,\hat{\mathbf{r}}(\phi) + \hat{\boldsymbol{\phi}}(\phi)\bigr)$ and $\lvert\mathbf{r}'(\phi)\rvert = R(\phi)\sqrt{1 + b^2}$. Because $\hat{\mathbf{r}}(\phi)\cdot\hat{\mathbf{t}}(\phi) = -b/\sqrt{1 + b^2} \le 0$ makes an obtuse angle $\pi - \alpha$ with the outward ray when $b > 0$, $(-\hat{\mathbf{r}}(\phi))\cdot\hat{\mathbf{t}}(\phi) = b/\sqrt{1 + b^2} \ge 0$ defines the constant **acute angle $\alpha \in (0, \frac{\pi}{2}]$ between the inward radial unit ray $-\hat{\mathbf{r}}(\phi)$ (pointing toward the fixed-point center) and the forward unit tangent $\hat{\mathbf{t}}(\phi)$**:

   $$
   \alpha \;=\; \arctan\!\left(\frac{1}{b}\right) \;=\; \frac{\pi}{2} - \arctan b \qquad (\alpha = 90^\circ \text{ when } b = 0),
   $$

   with constant inward deflection $90^\circ - \alpha = \arctan b$ relative to the $90^\circ$ circle tangent $\hat{\boldsymbol{\phi}}$; conversely, integrating $R'(\phi)/R(\phi) = -\cot\alpha$ shows that logarithmic spirals are the unique smooth polar curves $R(\phi) > 0$ of constant inward-radial tangent angle $\alpha \in (0, \frac{\pi}{2})$. The four smooth model trajectories compare as follows:

   | Smooth spiral model | Per-$90^\circ$ scaling $\kappa$ | Damping $b = -\frac{2}{\pi}\ln\kappa$ | Inward-radial tangent angle $\alpha = \arctan(1/b)$ | Inward tilt $90^\circ - \alpha$ | Per-$360^\circ$ scaling $\kappa^4$ |
   | :--- | :---: | :---: | :---: | :---: | :---: |
   | **Ideal closed circle** | $1.0000$ | $0$ | $\mathbf{90.00^\circ}$ | $0.00^\circ$ | $1.0000$ |
   | **$\theta^*$ cobweb two-step spiral** ($90^\circ$ per arm, $180^\circ$ per iterate) | $\sqrt{\sin\theta^*} \approx 0.8207$ | $0.1258$ | $\mathbf{82.83^\circ}$ | $7.17^\circ$ | $\sin^2\theta^* \approx 0.4538$ |
   | **$\theta^*$ Clifford orthogonal spiral** ($\sin\theta^*$ per $90^\circ$) | $\sin\theta^* \approx \mathbf{0.6736}$ | $0.2515$ | $\mathbf{75.88^\circ}$ | $14.12^\circ$ | $\sin^4\theta^* \approx 0.2059$ |
   | **Fibonacci golden spiral** ($\varphi^{-1}$ per $90^\circ$) | $\varphi^{-1} \approx \mathbf{0.6180}$ | $0.3063$ | $\mathbf{72.97^\circ}$ | $17.03^\circ$ | $\varphi^{-4} \approx 0.1459$ |
:::

Setting the two conservation laws of item 2 in [@rem-dottie-fibonacci-spiral-literature] side by side lays bare the geometric transition from $\varphi^{-1}$ to $\theta^*$. On a flat one-dimensional ruler, "whole is to longer part as longer is to shorter" cuts the unit bar into $\varphi^{-1} + \varphi^{-2} = 1$, scaling by $\varphi^{-1} \approx 0.6180$ per quarter-turn; the moment that unit ruler is bent into a unit circular arc whose arc length equals its own cosine projection $\cos\theta = \theta$, linear additive conservation lifts into Pythagorean square conservation $(\theta^*)^2 + \sin^2\theta^* = 1$, and the orthogonal contraction factor shifts from the flat $0.6180$ to the curved $\sin\theta^* \approx 0.6736$ — a difference of $\approx 0.0556$ ($5.56$ percentage points, or an $\approx 9.0\%$ relative curvature shift). Within our four-tier number-and-sphere hierarchy (`MODEL`, detailed in [Chapter 29](ch29-timeless-causality-and-gram-space.md) [@rem-ch29-four-tier-sphere-table]), $\varphi^{-1} \approx 0.6180$ is the **one-dimensional flat algebraic golden ratio** (Tier 2, quadratic algebraic extensions), whereas $\theta^* \approx 0.7391$ is the **two-dimensional orthogonal transcendental golden ratio** born from bending self-similarity onto the unit circle (Tier 4, self-referential cosine fixed point).

::: {.viz src="dottie-fibonacci-spirals" preset="pythagoras" height="500"}
**A flat ruler adds; a bent arc squares.** Left: the four smooth polar trajectories. Right: at top, the flat unit bar divided at the ink tick into cyan $\varphi^{-1} \approx 0.6180$ and magenta $\varphi^{-2} \approx 0.3820$ (1D additive conservation $\varphi^{-1} + \varphi^{-2} = 1$); below, the quarter unit circle with its cyan-ringed fixed point $P(\theta^*, \sin\theta^*)$ splitting hypotenuse $1$ into cyan base $\cos\theta^* = \theta^* \approx 0.7391$ and magenta height $\sin\theta^* \approx 0.6736$ (2D Pythagorean conservation $(\theta^*)^2 + \sin^2\theta^* = 1$, with amber marking only the live $k = 8$ iterates $x_8, \theta_8$; item 2 of [@rem-dottie-fibonacci-spiral-literature]).
:::

Item 3 of [@rem-dottie-fibonacci-spiral-literature] likewise gives a sharp plane-geometric measure of our recurring motif (`MODEL`) that every apparent sphere is locally an arc yet globally an inward-refining spiral. Only at inward-radial tangent angle $\alpha = 90.00^\circ$ does a trajectory close onto itself with zero scale refinement; on the $\theta^*$ cobweb two-step spiral ($\alpha \approx 82.83^\circ$), local arcs look nearly circular, yet one full $360^\circ$ revolution (two cosine updates, four $90^\circ$ arms) shrinks the radius to $\sin^2\theta^* \approx 0.4538$; and on the $\theta^*$ Clifford orthogonal spiral, the inward-radial tangent angle $\alpha \approx 75.88^\circ$ — just $2.91^\circ$ gentler than the Fibonacci golden spiral's $72.97^\circ$ — tilts inward by $14.12^\circ$ from the circle tangent at every $90^\circ$ turn, uniting phase rotation and scale refinement in a single motion.

::: {.viz src="dottie-fibonacci-spirals" preset="tilt" height="500"}
**Fourteen degrees inward turns a circle into a contracting spiral.** Directly at polar step $k = 1$ ($\phi_1 = \pi/2$, radius $r = \sin\theta^* \approx 0.6736$) on the cyan $\theta^*$ orthogonal spiral, the left panel draws both the amber inward radial vector (pointing toward the center) and the cyan forward tangent: the cyan acute sector between them is the inward-radial tangent angle $\alpha \approx 75.88^\circ$, opening a $14.12^\circ$ magenta inward-tilt wedge from the $90.00^\circ$ dashed grey circle tangent, flanked by the violet cobweb spiral ($82.83^\circ$) and the magenta Fibonacci spiral ($72.97^\circ$) (literature result, item 3 of [@rem-dottie-fibonacci-spiral-literature]).
:::

Because $\cos\theta$ hugs its tangent line of slope $-\sin\theta^*$ ever more closely as $\theta_k \to \theta^*$, the cobweb whirling squares exhibit **asymptotic self-similarity** in the spirit of Bernoulli's *Eadem mutata resurgo*: starting from $\theta_0 = 0$, the residual ratio $\lvert\delta_4/\delta_{12}\rvert \approx 24.36$ between step indices $k = 4$ and $k = 12$ is already close to the asymptotic factor $(\sin\theta^*)^{-8} \approx 23.59$, so magnifying around $(\theta^*, \theta^*)$ makes the square $Q_{12}$ at $k = 12$ visually nearly indistinguishable from $Q_4$ at $k = 4$.

::: {.viz src="dottie-fibonacci-spirals" preset="zoom" height="500"}
**Magnified about twenty-fourfold, square $Q_{12}$ at $k = 12$ visually reproduces the proportions of $Q_4$ at $k = 4$.** Locking onto the cyan fixed-point ring $(\theta^*, \theta^*)$ and rescaling with the current error (at step index $k = 12$, after twelve completed updates $Q_0 \dots Q_{11}$, active amber square $Q_{12}$ has side $s_{12} \approx 5.8\times 10^{-3}$ and residual $\lvert\delta_{12}\rvert \approx 3.5\times 10^{-3}$), the cyan cosine curve lies flat along the dashed magenta tangent while the amber update $Q_{12}$ and piecewise $90^\circ$ square guides visually repeat the proportions of $Q_4$ at $k = 4$ (literature result, [@rem-dottie-fibonacci-spiral-literature]).
:::

Placing the piecewise cobweb whirling squares on the left and the smooth polar spiral models on the right along one shared step index $k$ (where each Picard update winds $180^\circ$ across two perpendicular cobweb arms on the left, while on the right each index $k$ advances one $90^\circ$ quarter-turn of scaling $\sin\theta^*$ vs. $\varphi^{-1}$, alongside the per-arm $\sqrt{\sin\theta^*}$ cobweb spiral) makes visible how approaching $\theta^*$ parallels the inward contraction of the Fibonacci golden spiral (their horizontal-versus-vertical division of labor in the unified-field model returns in [Chapter 32 §32.4](ch32-s04-generative-laws.md#sec-ch32-generative-laws)).

::: {.viz src="dottie-fibonacci-spirals" preset="twin" height="500"}
**Cobweb whirling squares on the left, smooth twin-spiral models indexed by step on the right.** At the shared step index $k = 8$: on the left, eight completed historical Picard updates $Q_0 \dots Q_7$ from $\theta_0 = 0$ ($180^\circ$ across two arms per step, four full cobweb turns) plus the active amber step-$8$ update $Q_8$ display nine updates ($4.5$ cobweb turns) of nested squares and piecewise $90^\circ$ quarter-circle guides; on the right, at polar step $k = 8$ ($\phi_8 = 4\pi$, two full polar turns at $90^\circ$ per step, amber ray and dots), the dashed grey circle, violet per-arm cobweb spiral ($0.8207$ per $90^\circ$), cyan $\theta^*$ orthogonal spiral ($0.6736$), and magenta Fibonacci golden spiral ($0.6180$) wind concentrically inward.
:::
