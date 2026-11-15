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
   By the Poincaré–Brouwer Hairy Ball Theorem ([@rem-hairy-ball-adams-literature]), every continuous tangent vector field on an even-dimensional sphere $S^{2n}$ vanishes at some point. As an immediate consequence, **every continuous self-map $f : S^{2n} \to S^{2n}$ has either a fixed point $f(x) = +x$ or an antipodal point $f(x) = -x$**! Indeed, if $f(x) \neq \pm x$ everywhere on $S^{2n}$, the tangential projection $v(x) = f(x) - \langle f(x), x\rangle x$ would define a nowhere-vanishing continuous tangent field on $S^{2n}$, a contradiction. Meanwhile, on the closed Bloch ball $B^{n+1}$, Brouwer's fixed-point theorem guarantees that every continuous quantum channel map $\Phi : B^{n+1} \to B^{n+1}$ admits at least one fixed state $\Phi(\vv{r}^*) = \vv{r}^*$. (Brouwer's theorem on the standard simplex is verified in Lean, see [@thm-brouwer-standard-simplex]; the closed ball is homeomorphic to a simplex, but transferring the conclusion from the simplex to the ball is not formalized in this book.)
:::

::: {.viz src="fixed-point-convergence" preset="far" height="500"}
**Another start, the same end.** Starting far out at $x_0 = 3$, the ink-coloured cobweb drops into $[-1, 1]$ on its first step and from there winds in towards the fixed point $\theta^* \approx 0.739$ in the white ring; the amber dot is the current step. The limit is independent of the start. Never hitting it at a finite step requires the separate nonfixed interval hypothesis, rather than convergence alone: $-\theta^*$ arrives in one step (full qualitative derivation in [@ex-ch33-mutual-cosine-monotonic-lock]).
:::

Pushing one step further from the number-theoretic context of [@rem-banach-dottie-hairy-ball-literature], the author's foundational notes ask: *"What are the relations among transcendental numbers? Is $\pi$ a projection of $\theta$? Is $\theta$ the ultimate transcendental number?"* In modern number theory, the algebraic independence of $\theta^*$ and $\pi$ is governed by **Schanuel's Conjecture**, which we record as an open conjecture (`OPEN`, carrying no `lean` attribute).

::: {.conjecture #conj-schanuel-dottie title="Schanuel's Conjecture Applied to the Algebraic Independence of θ* and π"}
Assuming Schanuel's conjecture (for any $\mathbb{Q}$-linearly independent complex numbers $z_1, \dots, z_m \in \mathbb{C}$, the field extension $\mathbb{Q}(z_1, \dots, z_m, e^{z_1}, \dots, e^{z_m})$ has transcendence degree at least $m$ over $\mathbb{Q}$), applying it to the $\mathbb{Q}$-linearly independent purely imaginary exponents $z_1 = i\theta^*$ and $z_2 = i\pi$ (linear independence is the statement $\theta^*/\pi \notin \mathbb{Q}$, which holds unconditionally; see [@rem-dottie-angle-incommensurable]) — where $e^{i\pi} = -1 \in \mathbb{Q}$ and $u = e^{i\theta^*}$ satisfies the quadratic relation $u^2 - 2\theta^* u + 1 = 0$ (so $e^{i\theta^*}$ is algebraic of degree $2$ over $\mathbb{Q}(\theta^*)$ and **algebraically dependent** on $\theta^*$, contributing $0$ additional transcendence degree over $\mathbb{Q}(\theta^*)$) — implies that $\mathbb{Q}(i\theta^*, i\pi, e^{i\theta^*}, e^{i\pi}) \subseteq \overline{\mathbb{Q}(\theta^*, \pi)}$ has transcendence degree at least $2$ over $\mathbb{Q}$, and hence that **the Dottie constant $\theta^*$ and $\pi$ are algebraically independent over $\mathbb{Q}$** ($\operatorname{tr.deg}_{\mathbb{Q}}\mathbb{Q}(\theta^*, \pi) = 2$).

*(This statement is **OPEN**; the block intentionally carries no `lean` attribute.)*
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
