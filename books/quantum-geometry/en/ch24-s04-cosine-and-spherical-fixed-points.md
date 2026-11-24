# 24.4 From $\cos\theta^* = \theta^*$ to $\psi = \psi(\psi)$: Classical Analysis, Remainder Seams, and the Spherical Fixed/Antipodal Alternative {#sec-ch24-4}

Contrast the one-dimensional rational self-reference $x = 1 + 1/x$ of [@cor-golden-fixed-point-unique] (which stays inside the quadratic algebraic numbers $\overline{\mathbb{Q}}$ at $\varphi = \frac{1+\sqrt{5}}{2}$) with the two-dimensional rotational projection self-reference

$$
\cos\theta^* = \theta^*.
$$

When the self-referential operator upgrades from a one-dimensional rational fraction $1 + 1/x$ to the two-dimensional cosine projection $\cos\theta$, how do classical analysis and number theory characterize the existence, uniqueness, and arithmetic status of its real root $\theta^* \approx 0.7390851332\dots$ (the **Dottie number**)?

::: {.figure src="ch24-truncation-crack"}
**The fixed points of the truncated cosine come ever closer, and every one of them misses.** The horizontal axis is the degree $0, 2, \dots, 10$ of the even Taylor polynomial; each stem is the difference between its fixed point $q$ near $\theta^*$ and $\theta^*$, on a logarithmic scale of the size, cyan upwards for $q > \theta^*$ and magenta downwards for $q < \theta^*$. The difference shrinks from $0.26$ to $3.3 \times 10^{-11}$, alternating in sign, and no stem reaches the centre line. Each $q$ is a root of a polynomial with rational coefficients, hence algebraic; that none equals $\theta^*$ follows from the transcendence in item 2 of the literature note below (literature result, not formalized in this book). The differences are numerical results.
:::

The following literature note records four classical theorems governing $\cos\theta = \theta$ and continuous self-maps of even-dimensional spheres.

::: {.remark #rem-banach-dottie-hairy-ball-literature title="Banach Contraction on [0,1], Transcendence of the Dottie Root, Taylor Remainder Bounds, and the Hairy Ball Fixed/Antipodal Alternative (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Among the four items below, qualitative cosine dynamics follow by applying this chapter's endpoint [@thm-dottie-rational-inverse-endpoint] and existing real-analysis results; [@ex-ch33-mutual-cosine-monotonic-lock] supplies the full hypotheses, strictness exceptions, and derivation. Transcendence, numerical claims, and further topological extensions retain their respective literature boundaries:

1. **Banach contraction principle on $[0, 1]$ and global Picard convergence**:
   [@thm-finite-contracting-updates-stabilize] uses finiteness and set pruning to guarantee finite stabilization; here completeness and metric contraction give uniqueness and asymptotic convergence. The hypotheses and conclusions differ. On the real line $\mathbb{R}$, cosine sends $\mathbb{R}$ into $[-1,1]$ and sends $[-1,1]$ to $[\cos1,1]\subset[0,1]$, a compact invariant interval. On $[0,1]$, the mean value theorem gives the strict Lipschitz bound

   $$
   |\cos x - \cos y| \;\le\; (\sin 1)\,|x - y|, \qquad \sin 1 \approx 0.84147098 < 1.
   $$

   By Banach's contraction theorem on the complete metric space $[0, 1]$, $\cos$ has a **unique real fixed point** $\theta^* \approx 0.73908513321516\dots$ (the Dottie root), and Picard iteration $\theta_{k+1} = \cos\theta_k$ converges to $\theta^*$ from every real initial seed $\theta_0 \in \mathbb{R}$. After the second step it lies in $[0,1]$, giving $|\theta_k-\theta^*|\le(\sin1)^{k-2}|\theta_2-\theta^*|$ for $k\ge2$. Here $\sin 1$ is the worst-case constant over the whole interval; the asymptotic contraction rate at the fixed point is $\lvert\cos'\theta^*\rvert = \sin\theta^* \approx 0.6736$ (checked numerically in [@ex-dottie-rate-newton-rational]). (Symmetrically, the mirror equation $\cos\theta = -\theta$ has unique real root $-\theta^* \approx -0.7390851332\dots$.)
2. **Transcendence of $\theta^*$ and the nonzero algebraic residual $|\cos q - q| > 0$ (Lindemann–Weierstrass theorem)**:
   Suppose a nonzero algebraic number $q \in \overline{\mathbb{Q}} \setminus \{0\}$ satisfied $\cos q = q$. Writing $\cos q = \frac{e^{iq} + e^{-iq}}{2}$ and setting $u = e^{iq}$ yields the quadratic equation

   $$
   u^2 - 2q u + 1 = 0
   $$

   with coefficients in the algebraically closed field $\overline{\mathbb{Q}}$, which would force $u = e^{iq}$ to be algebraic! Yet since $q \in \overline{\mathbb{Q}} \setminus \{0\}$, the exponent $iq$ is a nonzero algebraic number, so the **Lindemann–Weierstrass theorem (1882)** guarantees that $e^{iq}$ is **transcendental** — a contradiction! Since $|\cos 0 - 0| = 1 > 0$ at $q = 0$ as well, it follows that:
   - **The Dottie root $\theta^*$ is transcendental over $\mathbb{Q}$** ($\theta^* \notin \overline{\mathbb{Q}}$);
   - **Every rational or algebraic reading $q \in \overline{\mathbb{Q}}$ leaves a strictly nonzero residual $|\cos q - q| > 0$!**
3. **Lagrange Taylor remainder bound for $R_{2N}(\theta)$ (`R3` approximation seam)**:
   Writing the $(2N-2)$-nd degree Taylor expansion of $\cos\theta$ with remainder $R_{2N}(\theta)$,

   $$
   \cos\theta \;=\; \sum_{k=0}^{N-1} (-1)^k \frac{\theta^{2k}}{(2k)!} + R_{2N}(\theta),
   $$

   Lagrange's remainder theorem gives $|R_{2N}(\theta)| \le \frac{|\theta|^{2N}}{(2N)!}$ on every real interval, while for $\theta \in (0, 2]$ the alternating-series property ensures $0 < |R_{2N}(\theta)| < \frac{\theta^{2N}}{(2N)!}$. Meanwhile, for the exact Picard iteration $\theta_{k+1} = \cos\theta_k$, because $\cos$ is strictly decreasing (hence injective) on the invariant interval $[0, 1]$, **for every initial seed $\theta_0 \in [0, 1] \setminus \{\theta^*\}$** (or more generally any real seed whose forward cosine orbit avoids the countable preimages of $\theta^*$; note that outside $[0, 1]$ the even-function mirror seed $\theta_0 = -\theta^* \neq \theta^*$ reaches $\theta_1 = \cos(-\theta^*) = \theta^*$ in one step), every finite iterate satisfies $\theta_k \neq \theta^*$ and leaves a nonzero Picard residual $\varepsilon_k = |\cos\theta_k - \theta_k| > 0$ for all $k \ge 0$. Together with item 2's unconditional inequality $|\cos q - q| > 0$ for every algebraic reading $q \in \overline{\mathbb{Q}}$, this confirms that no finite polynomial or algebraic reading ever seals the seam of $\cos\theta^* = \theta^*$.
4. **The Hairy Ball fixed/antipodal alternative on $S^{2n}$ and Brouwer's fixed-point theorem (`R6` spherical closure)**:
   By the Poincaré–Brouwer Hairy Ball Theorem ([@rem-hairy-ball-adams-literature]), every continuous tangent vector field on an even-dimensional sphere $S^{2n}$ vanishes at some point. As an immediate consequence, **every continuous self-map $f : S^{2n} \to S^{2n}$ has either a fixed point $f(x) = +x$ or an antipodal point $f(x) = -x$**! Indeed, if $f(x) \neq \pm x$ everywhere on $S^{2n}$, the tangential projection $v(x) = f(x) - \langle f(x), x\rangle x$ would define a nowhere-vanishing continuous tangent field on $S^{2n}$, a contradiction. Meanwhile, on the closed ball $B^{2n+1} = \{\vv{r} \in \mathbb{R}^{2n+1} \mid \|\vv{r}\| \le 1\}$ (for $n = 1$, the closed Bloch ball $B^3$), Brouwer's fixed-point theorem guarantees that every continuous quantum channel map $\Phi : B^{2n+1} \to B^{2n+1}$ admits at least one fixed state $\Phi(\vv{r}^*) = \vv{r}^*$. (Brouwer's theorem on the standard simplex is verified in Lean, see [@thm-brouwer-standard-simplex]; the closed ball is homeomorphic to a simplex, but transferring the conclusion from the simplex to the ball is not formalized in this book.)
:::

::: {.viz src="fixed-point-convergence" preset="far" height="500"}
**Another start, the same end.** Starting far out at $x_0 = 3$, the ink-coloured cobweb drops into $[-1, 1]$ on its first step and from there winds in towards the fixed point $\theta^* \approx 0.739$ in the white ring; the amber dot is the current step. The limit is independent of the start. Never hitting it at a finite step requires the separate nonfixed interval hypothesis, rather than convergence alone: $-\theta^*$ arrives in one step (full qualitative derivation in [@ex-ch33-mutual-cosine-monotonic-lock]).
:::

Pushing one step further from the number-theoretic context of [@rem-banach-dottie-hairy-ball-literature], the author's foundational notes ask: *"What are the relations among transcendental numbers? Is $\pi$ a projection of $\theta$? Is $\theta$ the ultimate transcendental number?"* In modern number theory, the algebraic independence of $\theta^*$ and $\pi$ is governed by **Schanuel's Conjecture**, which we record as an open conjecture (`OPEN`, carrying no `lean` attribute).

::: {.conjecture #conj-schanuel-dottie title="Schanuel's Conjecture Applied to the Algebraic Independence of θ* and π"}
Assuming Schanuel's conjecture (for any $\mathbb{Q}$-linearly independent complex numbers $z_1, \dots, z_m \in \mathbb{C}$, the field extension $\mathbb{Q}(z_1, \dots, z_m, e^{z_1}, \dots, e^{z_m})$ has transcendence degree at least $m$ over $\mathbb{Q}$), applying it to the $\mathbb{Q}$-linearly independent purely imaginary exponents $z_1 = i\theta^*$ and $z_2 = i\pi$ (linear independence is the statement $\theta^*/\pi \notin \mathbb{Q}$, which holds unconditionally; see [@rem-dottie-angle-incommensurable]) — where $e^{i\pi} = -1 \in \mathbb{Q}$ and $u = e^{i\theta^*}$ satisfies the quadratic relation $u^2 - 2\theta^* u + 1 = 0$ (so $e^{i\theta^*}$ is algebraic of degree $2$ over $\mathbb{Q}(\theta^*)$ and **algebraically dependent** on $\theta^*$, contributing $0$ additional transcendence degree over $\mathbb{Q}(\theta^*)$) — implies that $\mathbb{Q}(i\theta^*, i\pi, e^{i\theta^*}, e^{i\pi}) \subseteq \overline{\mathbb{Q}(\theta^*, \pi)}$ has transcendence degree at least $2$ over $\mathbb{Q}$, and hence that **the Dottie constant $\theta^*$ and $\pi$ are algebraically independent over $\mathbb{Q}$** ($\operatorname{tr.deg}_{\mathbb{Q}}\mathbb{Q}(\theta^*, \pi) = 2$).

*(What is open is Schanuel's conjecture itself and the unconditional algebraic independence. This statement is **OPEN**; the block intentionally carries no `lean` attribute.)*
:::

Let us compare the three self-referential trajectories of this chapter — discrete set contraction ([@thm-finite-contracting-updates-stabilize]), the algebraic golden continued fraction ([@cor-golden-fixed-point-unique]), and the Dottie cosine spiral ([@rem-banach-dottie-hairy-ball-literature]) — side by side in a concrete hand calculation.

::: {.example #ex-dottie-and-golden-iterations title="Hand Comparison of Three Self-Referential Loops: Finite Set Pruning, Golden Continued Fraction, and Dottie Cosine Spiral (With Literature Context, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Items 1 and 2 below instantiate this chapter's kernel-verified [@thm-finite-contracting-updates-stabilize] and [@cor-golden-fixed-point-unique], while Item 3's qualitative convergence applies the endpoint and existing real-analysis results (full derivation in [@ex-ch33-mutual-cosine-monotonic-lock]); the displayed decimals and residuals remain a separate numerical example.

Starting from the unit seed $1$ (or a three-element initial set), compare how three self-referential operators lock onto their respective fixed points:

1. **Discrete finite-set contraction ($S_{n+1} = U(S_n)$, [@thm-finite-contracting-updates-stabilize])**: On $X = \{0, 1, 2\}$ with $S_0 = \{0, 1, 2\}$ ($|S_0| = 3$), let $U$ delete the largest positive element at each step: $S_0 = \{0, 1, 2\} \to S_1 = \{0, 1\} \to S_2 = \{0\} \to S_3 = \{0\} = S_2$. The sequence stabilizes at $N = 2 \le 3$ with exactly $|\{0, 1\}| = 2 \le 3$ strict changes.
2. **One-dimensional algebraic reciprocal loop ($x_{k+1} = 1 + 1/x_k$, [@cor-golden-fixed-point-unique])**: Starting from $x_0 = 1$, rational iteration generates successive Fibonacci ratios $F_{k+2}/F_{k+1}$:

   $$
   \begin{aligned}
   x_0 &= 1,\quad x_1=2,\\
   x_2 &= \frac32,\quad x_3=\frac53\approx1.6667,\\
   x_4 &= \frac85=1.6,\\
   \lim_{k\to\infty}x_k &= \varphi=\frac{1+\sqrt5}{2}\\
   &\approx1.61803399.
   \end{aligned}
   $$

   Convergence follows directly from the known identity $1+1/\varphi=\varphi$: $|x_{k+1}-\varphi|=|x_k-\varphi|/(\varphi x_k)$. Here $x_k\ge1$, so each step multiplies the error by at most $1/\varphi<1$. For any positive initial value, $x_k>1$ from the first step onward, and the same estimate gives convergence. This is a manual derivation, not formalized in this book; [@cor-golden-fixed-point-unique] itself characterizes fixed points only. With $x_0=1$, every finite iterate is rational and differs from the irrational $\varphi$. The limit's algebraicity follows from the fixed-point equation, not merely from using rational addition and division at each finite step.
3. **Two-dimensional rotational cosine loop ($\theta_{k+1} = \cos\theta_k$, qualitative convergence applies existing results; numerics are separate; see [@ex-ch33-mutual-cosine-monotonic-lock])**: Starting from $\theta_0 = 1$ radian, repeated cosine evaluation yields

   $$
   \begin{aligned}
   \theta_0 &= 1.00000000, & |\cos\theta_0 - \theta_0| &\approx 0.45969769 > 0, \\
   \theta_1 &= \cos(1) \approx 0.54030231, & |\cos\theta_1 - \theta_1| &\approx 0.31725091 > 0, \\
   \theta_2 &\approx 0.85755322, & |\cos\theta_2 - \theta_2| &\approx 0.20326343 > 0, \\
   \theta_3 &\approx 0.65428979, & |\cos\theta_3 - \theta_3| &\approx 0.13919057 > 0, \\
   &\;\;\vdots & &\;\;\vdots \\
   \theta^* &\approx 0.73908513321516, & \cos\theta^* &= \theta^*.
   \end{aligned}
   $$

   At the fixed point $\theta^*$, the horizontal inner-product shadow equals $\cos\theta^* = \theta^* \approx 0.739085$, while the orthogonal bivector area is locked by Pythagoras's theorem at $\sin\theta^* = \sqrt{1 - (\theta^*)^2} \approx 0.67361203$!
:::

Look at the final line of [@ex-dottie-and-golden-iterations]: $\cos\theta^*=\theta^*$ is the self-consistency condition for feedback of the reading. The infinite nesting $\cos(\cos(\cos(\cdots)))$ denotes the limit of iteration from a specified initial value. It remains a scalar, without merging the types of function and number. The author interprets this loop as the ruler measuring itself:

$$
\psi = \psi(\psi).
$$

> When the ruler measures another, it is called the operator $\cos$ and the other is called the state $\theta$; when the ruler turns back to measure the angle it opens itself, operator and state become one: $\psi = \psi(\psi)$.

Section 24.7 gives a typed reading of this aphorism: the function $\psi$ acts on its own name $\ulcorner\psi\urcorner$, and, under the capture hypothesis, the resulting value is a fixed point of the twist $f$. Function, name, and value have distinct roles.

## 24.4.1 Even Taylor Truncations, Rational Contraction Certificates, Hyperoctahedral Hairy-Ball Parity, and Padé–Cayley Models {#sec-ch24-4-1-taylor-rational-pade-octahedral-hairy-ball}

The preceding section introduced the even Taylor truncation figure, the Banach contraction bound of [@rem-banach-dottie-hairy-ball-literature], and the even-dimensional sphere fixed/antipodal alternative chiefly as classical analytical and numerical background. Even when continuum completeness and transcendental estimates are stripped away, however, each phenomenon retains an exact core inside finite algebra and rational arithmetic. Below we first establish for each even Taylor fixed-point polynomial the uniqueness of its real root on $[0, 1]$, strict alternating bracketing, the exact error-ratio limit, and irreducibility for $1 \le m \le 6$, and certify invariant intervals and contraction upper bounds purely inside $\mathbb{Q}$; we then derive exact signed-cycle counts for the algebraic hairy-ball dichotomy in rational orthogonal and hyperoctahedral groups, and close by comparing Padé and Cayley rational surrogates against the finite-degree algebraic obstruction.

### 24.4.1.1 Uniqueness, Alternating Bracketing, and the Error-Ratio Law for Even Taylor Fixed-Point Polynomials $C_{2m}(x) - x$ {#sec-ch24-4-1-1-taylor-truncation-fixed-points}

For every integer $m \ge 0$, write the even cosine and odd sine Taylor truncations as $C_{2m}(x) = \sum_{k=0}^{m} (-1)^k \frac{x^{2k}}{(2k)!}$ and $S_{2m-1}(x) = \sum_{k=0}^{m-1} (-1)^k \frac{x^{2k+1}}{(2k+1)!}$ (with $S_{-1}(x) = 0$). From these we define the residual polynomial $F_m(x) = C_{2m}(x) - x$ and its cleared-denominator integer polynomial $\widetilde{F}_m(x) = (2m)!\,F_m(x) \in \mathbb{Z}[x]$.

On $(0, 1]$, the nonzero terms of both alternating series decrease strictly in magnitude: adjacent term magnitude ratios are at most $\frac{1}{2} < 1$ for cosine and at most $\frac{1}{6} < 1$ for sine. For $m \ge 1$, differentiating gives $C_{2m}'(x) = -S_{2m-1}(x)$; pairing consecutive terms of $S_{2m-1}(x)$ from $k = 2$ onward (each pair is nonnegative, any unpaired even-$k$ final term is positive, and $S_1(x) = x$) yields for every $x \in (0, 1]$ the lower bound $S_{2m-1}(x) \ge x - \frac{x^3}{6} > 0$, hence for all $m \ge 0$ and $x \in [0, 1]$ we have $F_m'(x) = -1 - S_{2m-1}(x) \le -1 < 0$.

At the endpoints, $F_m(0) = 1 > 0$ and $F_0(1) = 0$; at $m = 1$ we have $C_2(1) = \frac{1}{2} < 1$, and for $m \ge 2$ pairing terms of $C_{2m}(1)$ from $k = 3$ onward as $(3, 4), (5, 6), \dots$ (each pair is nonpositive, and any unpaired odd final term is negative) gives $C_{2m}(1) \le C_4(1) = \frac{13}{24} < 1$, so for every $m \ge 1$ we have $F_m(1) < 0$. On $[0, 1]$, each $F_m$ therefore has a unique real root $q_m$ (with $q_0 = 1$, and $q_m \in (0, 1)$ for every $m \ge 1$).

For the ordering across degrees, for every $x \in (0, 1]$ the strict alternating remainders of cosine and the difference between adjacent truncations with the same parity of $m$, namely $C_{2m+4}(x) - C_{2m}(x) = (-1)^{m+1}\frac{x^{2m+2}}{(2m+2)!}\bigl(1 - \frac{x^2}{(2m+3)(2m+4)}\bigr)$, enforce the strict nesting $C_2(x) < C_6(x) < \cdots < \cos x < \cdots < C_8(x) < C_4(x) < C_0(x)$. Because each $F_m$ is strictly decreasing on $[0, 1]$, evaluating at $\theta^*$ and at $q_m$ gives strict alternating bracketing; moreover, applying the mean value theorem to $F_m(q_m) = 0$ and $F_m(\theta^*) = C_{2m}(\theta^*) - \cos\theta^* = -R_{2m+2}(\theta^*)$ (with a point strictly between $q_m$ and $\theta^*$ denoted $\xi_m$) yields the exact error-to-remainder ratio:

$$
\begin{aligned}
q_1 < q_3 < q_5 < \cdots &< \theta^* < \cdots < q_4 < q_2 < q_0 = 1, \\
\rho_m := \frac{q_m - \theta^*}{-R_{2m+2}(\theta^*)} &= \frac{1}{1 + S_{2m-1}(\xi_m)}, \\
\lvert q_m - \theta^*\rvert &\le \lvert R_{2m+2}(\theta^*)\rvert < \frac{(\theta^*)^{2m+2}}{(2m+2)!}.
\end{aligned}
$$

The error bound on the last displayed line forces $q_m \to \theta^*$ and hence $\xi_m \to \theta^*$; uniform convergence of $S_{2m-1}$ on $[0, 1]$ to $\sin$ then implies that $\rho_m$ converges to $\frac{1}{1 + \sin\theta^*}$ (rounding to $0.597510$). Writing $A_m = \frac{(\theta^*)^{2m+2}}{(2m+2)!}$ for the leading omitted term, the relative remainder error satisfies $0 < \frac{A_m - \lvert R_{2m+2}(\theta^*)\rvert}{A_m} < \frac{(\theta^*)^2}{(2m+3)(2m+4)}$; this quantitatively explains why, in the truncation-crack figure, the stem direction gives the strictly alternating sign of $q_m - \theta^*$, the stem height encodes its magnitude on a logarithmic scale, and that magnitude is asymptotic to $\frac{(\theta^*)^{2m+2}}{(2m+2)!(1 + \sin\theta^*)}$.

At $m = 1$, $\widetilde{F}_1(x) = -x^2 - 2x + 2$ yields the exact quadratic root $q_1 = \sqrt{3} - 1$; for $m = 2, 3, 4, 5, 6$, the cleared-denominator polynomials $\widetilde{F}_m(x)$ all have coefficient content $1$ (they are already primitive, e.g., $\widetilde{F}_2(x) = x^4 - 12x^2 - 24x + 24$ and $\widetilde{F}_3(x) = -x^6 + 30x^4 - 360x^2 - 720x + 720$). For $m \ge 1$, whenever a prime $p$ not dividing the leading coefficient leaves $\widetilde{F}_m \bmod p$ irreducible in the polynomial ring $\mathbb{F}_p[x]$, the polynomial $\widetilde{F}_m$ is irreducible in $\mathbb{Q}[x]$, fixing the exact algebraic degree of $q_m$ at $2m$ (in particular, none is rational).

The table below summarizes for $m = 0, \dots, 6$ the roots, errors, and ratios $\rho_m$, and for $1 \le m \le 6$ lists a prime $p$ modulo which Rabin's test certifies each polynomial irreducible ($m = 0$ is linear and lists no prime; for $m = 1, \dots, 5$, both irreducibility modulo $p$ and rational sign-change brackets are verified by the standalone auxiliary Lean check with no explicit imports, while $m = 6$ is checked in Python):

| $m$ | Degree / prime | $q_m$ | $q_m - \theta^*$ | $\rho_m$ |
| ---: | :--- | ---: | ---: | ---: |
| $0$ | $1$ (linear) | $1$ | $+0.260915$ | $1$ |
| $1$ | $2$ / $p = 5$ | $0.732051$ | $-7.034 \times 10^{-3}$ | $0.576180$ |
| $2$ | $4$ / $p = 13$ | $0.739219$ | $+1.341 \times 10^{-4}$ | $0.598141$ |
| $3$ | $6$ / $p = 7$ | $0.7390838$ | $-1.311 \times 10^{-6}$ | $0.597502$ |
| $4$ | $8$ / $p = 13$ | $0.739085141$ | $+7.975 \times 10^{-9}$ | $0.597510$ |
| $5$ | $10$ / $p = 17$ | $0.73908513318$ | $-3.304 \times 10^{-11}$ | $0.597510$ |
| $6$ | $12$ / $p = 71$ | $0.739085133215$ | $+9.924 \times 10^{-14}$ | $0.597510$ |

### 24.4.1.2 Purely Rational Certificates for Invariant Intervals and Contraction Rates {#sec-ch24-4-1-2-purely-rational-contraction}

In [@rem-banach-dottie-hairy-ball-literature] (Item 1), applying the Banach contraction principle (S. Banach, *Sur les opérations dans les ensembles abstraits et leur application aux équations intégrales*, 1922, §2, Théorème 6, p. 160, [10.4064/fm-3-1-133-181](https://doi.org/10.4064/fm-3-1-133-181)) to cosine uses the invariant interval $[\cos 1, 1]$ with left endpoint $\cos 1$ and the $[0, 1]$ Lipschitz constant $\sin 1$ (rounding to $0.841471$), both of which are transcendental numbers. Likewise, the `trureturing` library's theorem [`cos_iterate_tendsto`](lean:D5/S3/Analytic/PowerSeries/DottieIteration.cos_iterate_tendsto) proves from every real seed a geometric error bound starting at iterate $2$ with factor $\sin 1$ and prefactor $1 - \theta^*$, alongside the asymptotic signed error ratio $-\sin\theta^*$ (whenever the orbit never passes through $\theta^*$). Using only rational evaluations of the finite polynomials $C_2, C_4, C_6, S_5$, one can certify invariant intervals and Lipschitz upper bounds wholly inside $\mathbb{Q}$, and on tighter subintervals beat the $[0, 1]$ bound $\sin 1$.

For any rational endpoints satisfying $0 \le a < b \le 1$, because $\cos$ decreases on $[0, 1]$ and alternating Taylor bounds hold, every $x \in [a, b]$ satisfies the chain $C_6(b) \le \cos b \le \cos x \le \cos a \le C_4(a)$ (with equality on the right at $a = 0$, while at $b = 1$ the simpler bound $C_2(1) = \frac{1}{2} < \cos 1$ is also available). Two purely rational inequalities, $C_6(b) \ge a$ and $C_4(a) \le b$, therefore certify $\cos([a, b]) \subseteq [a, b]$. Moreover, because $S_5'(x) = C_4(x) = 1 - \frac{x^2}{2} + \frac{x^4}{24} > 0$ throughout $[0, 1]$, every $x \in [a, b]$ satisfies $0 \le \sin x \le S_5(x) \le S_5(b)$, supplying the purely rational Lipschitz upper bound $\kappa = S_5(b) \in \mathbb{Q}$:

$$
\begin{aligned}
\bigl(C_6(b) \ge a \;\land\; C_4(a) \le b\bigr) &\implies \cos([a, b]) \subseteq [a, b], \\
\lvert\cos x - \cos y\rvert &\le S_5(b)\,\lvert x - y\rvert \quad (\forall x, y \in [a, b]).
\end{aligned}
$$

Three successively narrower rational intervals exhibit this improvement:

- Coarse interval $[\frac{1}{2}, 1]$ (width $\frac{1}{2}$): $C_2(1) = \frac{1}{2}$ and $C_4(\frac{1}{2}) = \frac{337}{384} < 1$ certify invariance, with rational Lipschitz upper bound $S_5(1) = \frac{101}{120}$ (rounding to $0.841667$);
- Medium interval $[\frac{2}{3}, \frac{4}{5}]$ (width $\frac{2}{15}$): $C_6(\frac{4}{5}) = \frac{489869}{703125} > \frac{2}{3}$ and $C_4(\frac{2}{3}) = \frac{191}{243} < \frac{4}{5}$ certify invariance, with exact rational Lipschitz upper bound $S_5(\frac{4}{5}) = \frac{33628}{46875} < \frac{18}{25}$ (rounding to $0.717397$);
- Narrow interval $[\frac{8}{11}, \frac{3}{4}]$ (width $\frac{1}{44}$): $C_6(\frac{3}{4}) = \frac{239759}{327680} > \frac{8}{11}$ and $C_4(\frac{8}{11}) = \frac{32819}{43923} < \frac{3}{4}$ certify invariance, with exact rational Lipschitz upper bound $S_5(\frac{3}{4}) = \frac{27921}{40960} < \frac{7}{10}$ (rounding to $0.681665$, exceeding the true asymptotic rate $\sin\theta^* \approx 0.673612$ by only $0.008053$).

The width-based a priori step bound drops by more than half: for any seed in $[\frac{8}{11}, \frac{3}{4}]$, the purely rational inequality $\frac{1}{44}(\frac{27921}{40960})^k < 10^{-10}$ certifies by step $k = 51$ an error below $10^{-10}$. By contrast, the width-based a priori bound using the $[0, 1]$ rate $\sin 1$ gives for the same narrow width $\frac{1}{44}$ a cap of $112$ steps, and across the full interval $[0, 1]$ a cap of $134$ steps.

### 24.4.1.3 Finite Algebraic Core of the Hairy-Ball Alternative: Rational Orthogonal Groups and Signed-Cycle Counts in $B_m$ {#sec-ch24-4-1-3-finite-algebraic-hairy-ball}

Turn now to the even-dimensional-sphere fixed/antipodal alternative in [@rem-banach-dottie-hairy-ball-literature] (Item 4; for an analytic proof of the underlying hairy-ball theorem, see J. Milnor, *Analytic proofs of the "hairy ball theorem" and the Brouwer fixed point theorem*, 1978, pp. 521–524, [10.1080/00029890.1978.11994635](https://doi.org/10.1080/00029890.1978.11994635)). On the rational orthogonal groups $O(m, \mathbb{Q})$ and their finite integer subgroups, this dimensional parity split requires neither continuous topology nor real completeness: it follows from a direct determinant identity and finite combinatorics.

For any orthogonal matrix $Q \in O(m)$ ($Q^\top Q = I$), factoring $\lambda I - Q = (-Q)(I - \lambda Q^\top)$, taking determinants, using transpose invariance, and extracting $\lambda \neq 0$ from every row yields the reciprocal characteristic identity:

$$
\begin{aligned}
\chi_Q(\lambda) &:= \det(\lambda I - Q) = (-\lambda)^m (\det Q)\,\chi_Q(\lambda^{-1}) \quad (\lambda \neq 0), \\
m = 2n + 1 &\implies \chi_Q(\det Q) = -\chi_Q(\det Q) = 0, \\
\bigl(m = 2n \;\land\; \det Q = -1\bigr) &\implies \chi_Q(+1) = \chi_Q(-1) = 0.
\end{aligned}
$$

Both consequences hold directly over $\mathbb{Q}$. In odd ambient dimension $m = 2n + 1$ (acting on the even-dimensional sphere $S^{2n}$), $\lambda = \det Q \in \{+1, -1\}$ is necessarily an eigenvalue: for $Q \in O(2n + 1, \mathbb{Q})$, rational row reduction produces a nonzero rational axis vector $v \in \mathbb{Q}^{2n+1} \setminus \{0\}$ with $Qv = (\det Q)v$, so every orientation-preserving rational rotation fixes a rational axis and every improper one reverses a rational axis (square roots enter only when normalizing $v$ to unit length).

In even ambient dimension $m = 2n$ (acting on the odd-dimensional sphere $S^{2n-1}$), $\det Q = -1$ forces both $+1$ and $-1$ to be eigenvalues simultaneously, so every improper rational orthogonal map carries both a rational fixed axis and a rational antipodal axis. Avoiding both fixed and antipodal axes therefore requires $m = 2n$ even and $\det Q = +1$ (for instance, the integer block quarter-turn $J_{2n} = \bigoplus_{j=1}^{n}\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \in SO(2n, \mathbb{Z})$ has characteristic polynomial $(\lambda^2 + 1)^n$, which at $\lambda = \pm 1$ takes the value $2^n \neq 0$).

Restricting further to the finite integer symmetry group of the $m$-dimensional cross-polytope $\lozenge^m$ yields the hyperoctahedral group $B_m = \{\pm 1\}^m \rtimes S_m$, of order $\lvert B_m\rvert = 2^m m!$. For its signed-permutation combinatorics, see A. Björner & F. Brenti, *Combinatorics of Coxeter Groups*, 2005, Chapter 8, [10.1007/3-540-27596-7](https://doi.org/10.1007/3-540-27596-7); for cycle generating functions, see R. P. Stanley, *Enumerative Combinatorics*, Volume 1, 2nd ed., 2011, Chapter 1, [10.1017/CBO9781139058520](https://doi.org/10.1017/CBO9781139058520).

Decompose any $Q \in B_m$ into disjoint signed cycles: a cycle of length $L$ with sign product $\varepsilon \in \{+1, -1\}$ contributes to $\chi_Q(\lambda)$ a factor $\lambda^L - \varepsilon$, and to $\det Q$ a factor $(-1)^{L-1}\varepsilon$. Inspecting $\lambda = \pm 1$ shows that $\lambda = +1$ is avoided if and only if every cycle has $\varepsilon = -1$, and then $\lambda = -1$ is also avoided if and only if every cycle has even length $L = 2r$ (each even negative cycle automatically contributes determinant factor $(-1)^{2r-1}(-1) = +1$). Hence in every odd dimension $m = 2n + 1$, no even-length cycle partition exists and the count of elements avoiding both $\pm 1$ vanishes identically: $a_{2n+1} = 0$. In even dimension $m = 2n$, on $2r$ labels there are $(2r - 1)!\,2^{2r-1}$ negative $2r$-cycles, so the exponential generating function of labeled cycle decompositions yields the exact closed count and fraction:

$$
\begin{aligned}
\sum_{n=0}^{\infty} a_{2n}\,\frac{z^{2n}}{(2n)!}
&= \exp\!\left(\sum_{r=1}^{\infty} \frac{2^{2r-1}}{2r}\,z^{2r}\right)
= (1 - 4z^2)^{-1/4}, \\
a_{2n} &= \prod_{j=1}^{n} 2(2j - 1)(4j - 3), \qquad
\frac{a_{2n}}{\lvert B_{2n}\rvert} = \prod_{j=1}^{n} \frac{4j - 3}{4j}.
\end{aligned}
$$

The table below reports the exact eigenvalue classification as $(\det = +1, \det = -1)$ pairs across $B_1$ through $B_6$ (all $50362$ signed permutation matrices, with $B_1$ through $B_4$—all $442$ matrices—exhaustively verified by the standalone auxiliary Lean check with no explicit imports):

| $m$ | $\lvert B_m\rvert$ | Both $\pm 1$ | Only $+1$ | Only $-1$ | Neither | Fraction |
| ---: | ---: | :---: | :---: | :---: | :---: | ---: |
| $1$ | $2$ | $(0, 0)$ | $(1, 0)$ | $(0, 1)$ | $(0, 0)$ | $0$ |
| $2$ | $8$ | $(0, 4)$ | $(1, 0)$ | $(1, 0)$ | $(2, 0)$ | $1/4$ |
| $3$ | $48$ | $(9, 9)$ | $(15, 0)$ | $(0, 15)$ | $(0, 0)$ | $0$ |
| $4$ | $384$ | $(42, 192)$ | $(45, 0)$ | $(45, 0)$ | $(60, 0)$ | $5/32$ |
| $5$ | $3840$ | $(975, 975)$ | $(945, 0)$ | $(0, 945)$ | $(0, 0)$ | $0$ |
| $6$ | $46080$ | $(7650, 23040)$ | $(4995, 0)$ | $(4995, 0)$ | $(5400, 0)$ | $15/128$ |

### 24.4.1.4 Fixed Points of Padé and Cayley Rational Surrogates and Finite-Degree Obstruction {#sec-ch24-4-1-4-pade-cayley-degree-obstruction}

Finally, place rational-function surrogates inside the same integer-polynomial setting alongside the even Taylor truncations of [§24.4.1.1](#sec-ch24-4-1-1-taylor-truncation-fixed-points) and the transcendence barrier in [@rem-banach-dottie-hairy-ball-literature] (Item 2). Diagonal Padé approximants to cosine (G. A. Baker Jr. & P. Graves-Morris, *Padé Approximants*, 2nd ed., 1996, Chapter 1, [10.1017/CBO9780511530074](https://doi.org/10.1017/CBO9780511530074)) supply two purely rational surrogate operators:

$$
\begin{aligned}
R_{2,2}(x) &= \frac{12 - 5x^2}{12 + x^2}, & \cos x - R_{2,2}(x) &= +\frac{x^6}{480} + O(x^8), \\
R_{4,4}(x) &= \frac{15120 - 6900x^2 + 313x^4}{15120 + 660x^2 + 13x^4}, & \cos x - R_{4,4}(x) &= -\frac{59\,x^{10}}{152409600} + O(x^{12}).
\end{aligned}
$$

Both denominators remain strictly positive on $[0, 1]$, so clearing denominators turns their fixed-point equations into primitive integer polynomials $P_{2,2}(x) = x^3 + 5x^2 + 12x - 12$ and $P_{4,4}(x) = 13x^5 - 313x^4 + 660x^3 + 6900x^2 + 15120x - 15120$. Each has a strictly positive derivative on $[0, 1]$ (for $P_{4,4}'$, $1980x^2 - 1252x^3 \ge 728x^2$ while all remaining terms are nonnegative and the constant term is $15120 > 0$) and opposite signs at $0$ and $1$, so in $(0, 1)$ they have unique real roots $r_{2,2}$ and $r_{4,4}$, respectively.

By Rabin's modular criterion, $P_{2,2}$ is irreducible modulo $p = 7$ and $P_{4,4}$ is irreducible modulo $p = 29$, making $r_{2,2}$ and $r_{4,4}$ exact algebraic numbers of degrees three and five. Numerically, $r_{2,2}$ (rounding to $0.738896$, error $-1.892 \times 10^{-4}$) achieves against the quadratic Taylor root $q_1$ an absolute-error ratio $\lvert q_1 - \theta^*\rvert / \lvert r_{2,2} - \theta^*\rvert > 37$, while $r_{4,4}$ (rounding to $0.739085144$, error $+1.081 \times 10^{-8}$) achieves against the degree-six Taylor root $q_3$ an absolute-error ratio $\lvert q_3 - \theta^*\rvert / \lvert r_{4,4} - \theta^*\rvert > 121$, matching the accuracy scale of degree-eight $q_4$ at degree five.

On the principal-branch domain $\theta \in (-\pi, \pi)$ (in particular $\theta \in [0, 1]$), introducing the rational half-angle parameter $t = \tan(\theta/2)$ expresses cosine as the exact Cayley rational map $\cos\theta = \frac{1 - t^2}{1 + t^2}$. At the same time, the angle itself satisfies $\theta = 2\arctan t$, giving at the fixed point $t^* = \tan(\theta^*/2)$ (rounding to $0.387337$).

Replacing $2\arctan t$ with its first-order linear approximation $2t$ at the origin turns $\frac{1 - t^2}{1 + t^2} = 2t$ into the integer cubic $2t^3 + t^2 + 2t - 1 = 0$ (irreducible modulo $p = 3$); equating the rational cosine directly to the slope parameter, $\frac{1 - t^2}{1 + t^2} = t$, yields $t^3 + t^2 + t - 1 = 0$ (irreducible modulo $p = 3$). On $[0, 1]$, their derivatives are $6t^2 + 2t + 2 > 0$ and $3t^2 + 2t + 1 > 0$, at $t = 0$ both take $-1 < 0$, and at $t = 1$ they take $+4 > 0$ and $+2 > 0$, respectively, so each has a unique real root in $(0, 1)$: the first gives $t_c$ ($0.376086$) and $2t_c \approx 0.752172$ (above $\theta^*$ by $+0.013087$), while under $t = 1/\tau$ the unique positive root of the second is the reciprocal of the Tribonacci constant $\tau > 1$ (satisfying $\tau^3 = \tau^2 + \tau + 1$, $\tau \approx 1.839287$), namely $1/\tau \approx 0.543689$.

Although the even Taylor family of [§24.4.1.1](#sec-ch24-4-1-1-taylor-truncation-fixed-points) drives the approximation error below any prescribed positive tolerance (and the two diagonal Padé models computed above sharply reduce low-degree error relative to $q_1$ and $q_3$), Lindemann's theorem (F. Lindemann, *Ueber die Zahl π*, 1882, pp. 213–225, [10.1007/BF01446522](https://doi.org/10.1007/BF01446522); for a systematic exposition, see A. Baker, *Transcendental Number Theory*, 1975, Chapter 1, [10.1017/CBO9780511565977](https://doi.org/10.1017/CBO9780511565977); for the Dottie-number background, see S. R. Kaplan, *The Dottie Number*, 2007, pp. 73–74, [10.1080/0025570X.2007.11953455](https://doi.org/10.1080/0025570X.2007.11953455)) shows that $\theta^*$ is transcendental; because $\theta^* = \frac{1 - (t^*)^2}{1 + (t^*)^2}$ is a rational function of $t^*$, the half-angle slope $t^*$ is transcendental as well. Every non-identity polynomial or rational surrogate with rational coefficients (evaluated away from poles) therefore restricts its real fixed points to algebraic numbers of bounded degree, whereas $\theta^*$ escapes every bounded algebraic degree while remaining trapped inside arbitrarily narrow purely rational sign-change brackets.

**Evidence Boundary and Companion Archive (`ARGUED` / `NUM`).** The existence, uniqueness, alternating bracketing, and error-ratio limit for even Taylor truncation roots, the purely rational invariant intervals and $S_5$ Lipschitz upper bounds, the orthogonal reciprocal characteristic identity and hyperoctahedral $B_m$ negative-even-cycle generating function, and the Padé and Cayley fixed-point isolation and $t^*$-transcendence corollary above are established by this section's written arguments (`ARGUED`). Classical analysis, transcendence, Padé-approximant, and Coxeter-group background is drawn from the literature cited above; in [§24.4.1.2](#sec-ch24-4-1-2-purely-rational-contraction), the `trureturing` declaration [`cos_iterate_tendsto`](lean:D5/S3/Analytic/PowerSeries/DottieIteration.cos_iterate_tendsto) formalizes the geometric bound from iterate $2$ onward with ratio $\sin 1$ for every real seed, together with the asymptotic ratio $-\sin\theta^*$ (for orbits that never pass through the fixed point $\theta^*$).

The companion computational evidence separates Python numerical verification from a standalone auxiliary Lean check, neither of which counts toward the theorem tally of the book's pinned `trureturing` ledger. Specifically, the Python script produces $147$ strictly nested Arb enclosures at $256$-bit and $320$-bit working precision, Rabin modular irreducibility certificates for all ten integer polynomials, and the exhaustive classification of $B_1$ through $B_6$ (all $50362$ signed permutation matrices). These outputs, together with the standalone auxiliary Lean check, are archived as `NUM` evidence by `loning` under [Issue #1220](https://github.com/the-omega-institute/trureturing-books/issues/1220) in the [pinned verification archive](https://gist.github.com/loning/d4cdcbbe2a038cb9e5604093f3a986ff/2261bcfb45d14c617134a56a8d484c2e40a36d70):

- `cycle20_dottie_taylor_octahedral_check` ([`dottie_taylor_octahedral_check.lean`](https://gist.githubusercontent.com/loning/d4cdcbbe2a038cb9e5604093f3a986ff/raw/2261bcfb45d14c617134a56a8d484c2e40a36d70/dottie_taylor_octahedral_check.lean)): standalone auxiliary Lean declaration with no explicit imports, checking the medium and narrow rational interval certificates, nine polynomial irreducibility and sign-change certificates, and $B_1$ through $B_4$ (all $442$ matrices);
- [`SHA256SUMS`](https://gist.githubusercontent.com/loning/d4cdcbbe2a038cb9e5604093f3a986ff/raw/2261bcfb45d14c617134a56a8d484c2e40a36d70/SHA256SUMS): SHA-256 `3ce7349ee4cf92ebc27b3a00f09e9dd63162f741d1e48a568606bfc906281d47`.

This completes the finite algebraic framework and purely rational contraction certificates; [§24.5](ch24-s05-convergence-and-acceleration.md#sec-ch24-5) next develops the true local contraction rate near $\theta^*$, Newton quadratic acceleration, and the residual widths of rational convergents.
