# 24.6 "Is $\pi$ a Projection of $\theta$?": Two Mutually Inverse Series, Kepler's Equation, and Half-Time Free Fall {#sec-ch24-6}

The question in the author's notes, *"Is $\pi$ a projection of $\theta$?"*, received at [@conj-schanuel-dottie] a conditional answer in the negative direction: under Schanuel's conjecture, no polynomial relation with integer coefficients holds between $\theta^*$ and $\pi$. But "no algebraic relation" is not "no relation". The answer in the positive direction is already inside the fixed-point equation and can be read off in one step.

::: {.remark #rem-dottie-right-angle-split-literature title="The Fixed Point Cuts the Right Angle into Two Complementary Arcs (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** For $x \in [0, 1]$, the unique solution of $\cos\theta = x$ on $[0, \pi/2]$ is $\theta = \arccos x = \frac{\pi}{2} - \arcsin x$. Substituting $x = \theta = \theta^*$:

$$
\cos\theta^* = \theta^* \quad\Longleftrightarrow\quad \frac{\pi}{2} \;=\; \theta^* + \arcsin\theta^* .
$$

On the unit circle, the point $P = (\cos\theta^*, \sin\theta^*) = (\theta^*, \lambda)$ cuts the quarter arc of the first quadrant into two pieces. The lower piece, from $(1, 0)$ to $P$, has length $\theta^*$, which is exactly the abscissa of $P$; the upper piece, from $P$ to $(0, 1)$, has length $\arcsin\theta^*$. $P$ is the only point of this arc whose arc length equals its own abscissa.
:::

To express this arc as a rational power series, first expand its integral kernel.

::: {.lemma #lem-arcsin-binomial-kernel title="Normalized Central Binomial Coefficients and the Binomial Kernel" lean="D5/S3/Analytic/OriginalHalfBinomialIntegral.b_nonneg D5/S3/Analytic/OriginalHalfBinomialIntegral.b_le_one D5/S3/Analytic/OriginalHalfBinomialIntegral.binomial_hasSum"}
For every $n \in \mathbb{N}$, let $b_n = \binom{2n}{n}/4^n \in \mathbb{R}$. Then $0 \le b_n \le 1$. For every real $u$ with $0 \le u < 1$,

$$
\operatorname{HasSum}\left(n \mapsto b_n u^n,\;\frac{1}{\sqrt{1-u}}\right).
$$

Here $\operatorname{HasSum}$ specifies both convergence of the series and its sum.
:::

::: {.remark #rem-arcsin-series-derivation title="Integrating the Binomial Kernel: The Arcsine Series Including Its Endpoints (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** Set

$$
c_n = \frac{\binom{2n}{n}}{4^n(2n+1)} \in \mathbb{Q}.
$$

Below, $c_n$ denotes its image in $\mathbb{R}$. Fix any $y \in [0,1]$, and write

$$
\begin{aligned}
g(t)&=\frac{1}{\sqrt{1-t^2}},\\
F_N(t)&=\sum_{n<N}b_n t^{2n}\quad(N\in\mathbb{N}).
\end{aligned}
$$

On the open interval $0<t<y$, we have $0\le t^2<1$. Thus [@lem-arcsin-binomial-kernel] gives $F_N(t)\to g(t)$ and $0\le F_N(t)\le g(t)$. When $y=1$, the kernel has a singularity at the right endpoint. The binomial expansion is used only on the open interval; arbitrary finite values may be assigned at the endpoints, since both have Lebesgue measure zero.

Integrability follows from the primitive itself: $\arcsin$ is continuous on $[0,y]$ and has the nonnegative derivative $g(t)$ for $0<t<y$. Automatic integrability of a nonnegative derivative and the fundamental theorem of calculus therefore give[^arcsin-ftc]

$$
\int_0^y g(t)\,\mathrm{d}t=\arcsin y-\arcsin 0=\arcsin y.
$$

This includes $y=1$; for $y=0$ the integral is zero. The integrable function $g$ now dominates the nonnegative polynomial partial sums, permitting termwise integration[^arcsin-dct]:

$$
\begin{aligned}
\int_0^y F_N(t)\,\mathrm{d}t
&=\sum_{n<N}\frac{b_n}{2n+1}\,y^{2n+1}\\
&=\sum_{n<N}c_n y^{2n+1}\\
&\longrightarrow\arcsin y.
\end{aligned}
$$

Convergence at $y=1$ thus follows from the integral argument, without assuming a value for the endpoint series. Finally, $\arcsin(-y)=-\arcsin y$ (`Real.arcsin_neg`) and the oddness of every monomial cover all $x\in[-1,1]$, including $x=-1$. The complete expansion is

$$
\begin{aligned}
\arcsin x&=\sum_{n\ge0}c_n x^{2n+1}\\
&=x+\frac{x^3}{6}+\frac{3x^5}{40}\\
&\quad+\frac{5x^7}{112}+\cdots
\qquad(\lvert x\rvert\le1).
\end{aligned}
$$

Hence $\pi$ is the value at $\theta^*$ of a power series with rational coefficients:

$$
\pi \;=\; A(\theta^*), \qquad A(x) \;=\; 2x + 2\arcsin x \;=\; 4x + \frac{x^3}{3} + \frac{3x^5}{20} + \frac{5x^7}{56} + \frac{35x^9}{576} + \cdots .
$$

The fixed-point hypotheses used here are $\theta^*\in[0,1]$ and $\cos\theta^*=\theta^*$. They supply the branch conditions $0\le\theta^*\le\pi$ required by `Real.arccos_cos`. Combining it with `Real.arccos_eq_pi_div_two_sub_arcsin` gives $\theta^*=\pi/2-\arcsin\theta^*$, hence $\pi=A(\theta^*)$.
:::

[^arcsin-ftc]: Continuity and differentiation use Mathlib's `Real.continuous_arcsin` and `Real.hasDerivAt_arcsin`. The latter requires $t\ne-1$ and $t\ne1$, which hold for $0<t<y\le1$. Automatic integrability uses `intervalIntegral.intervalIntegrable_deriv_of_nonneg`, which requires continuity on the closed interval, the derivative on the open interval, and nonnegativity of that derivative. The integral identity uses `intervalIntegral.integral_eq_sub_of_hasDerivAt_of_le`, requiring $0\le y$, the same continuity and open-interval derivative, and the interval integrability established in the previous step. Neither theorem requires a derivative at an endpoint.

[^arcsin-dct]: Termwise integration uses Mathlib's `intervalIntegral.hasSum_integral_of_dominated_convergence`: each term is a measurable polynomial, bounded on the open interval by the nonnegative term $b_nt^{2n}$ itself. The sum of these bounds equals the integrable $g(t)$ almost everywhere. Integrating each finite polynomial gives the coefficient $b_n/(2n+1)=c_n$.

::: {.remark #rem-arcsin-interior-tail title="Geometric Truncation Bounds on Interior Intervals (Literature result, not formalized in this book)"}
**Literature result, not formalized in this book.** For every $N\in\mathbb{N}$, define

$$
\begin{aligned}
S_N(x)&=\sum_{n<N}c_n x^{2n+1},\\
A_N(x)&=2x+2S_N(x).
\end{aligned}
$$

By [@lem-arcsin-binomial-kernel], $0\le c_n=b_n/(2n+1)\le1$. For any real $q,x$ with $0\le q<1$ and $|x|\le q$,

$$
\begin{aligned}
\left|\arcsin x-S_N(x)\right|
&\le\sum_{n=N}^{\infty}c_n|x|^{2n+1}\\
&\le\sum_{n=N}^{\infty}q^{2n+1}
=\frac{q^{2N+1}}{1-q^2},\\
\left|A(x)-A_N(x)\right|
&\le\frac{2q^{2N+1}}{1-q^2}.
\end{aligned}
$$

These bounds include $N=0$, when the partial sum is empty, and $q=0$, when $x=0$ and both the remainder and the bound are zero. Convergence at $x=\pm1$ comes from the integral argument in [@rem-arcsin-series-derivation]; the geometric bound here applies only to $q<1$. For this chapter's $\theta^*\in(0,1)$, choose $\theta^*\le q<1$: for every tolerance $\varepsilon>0$, some $N$ makes $2q^{2N+1}/(1-q^2)<\varepsilon$, and hence $|\pi-A_N(\theta^*)|<\varepsilon$. The rational polynomial $A_N$ takes finitely many additions and multiplications to evaluate. This controls series truncation for an exact input; an actual computation also needs bounds for the input error in $\theta^*$, rounding, and computational resources.
:::

**The reverse direction: reading $\theta^*$ from $\pi$.** The prescribed inverse series converges absolutely at $y=\pi$ with the exact sum given by [@thm-dottie-rational-inverse-endpoint]; its classical expansion and numerical partial sums are presented in [@ex-dottie-pi-series].

::: {.definition #def-dottie-rational-inverse title="The Prescribed Rational Arcsine Series and Its Formal Compositional Inverse" lean="D5/S3/Analytic/PowerSeries/DottieInverseSeries.alpha D5/S3/Analytic/PowerSeries/DottieInverseSeries.arcsine D5/S3/Analytic/PowerSeries/DottieInverseSeries.forward D5/S3/Analytic/PowerSeries/DottieInverseSeries.inverse"}
For every $k\in\mathbb{N}$, define the rational coefficients

$$
\alpha(2k)=0,\qquad
\alpha(2k+1)=\frac{\binom{2k}{k}}{4^k(2k+1)}=c_k.
$$

In the formal power series ring $\mathbb{Q}[[X]]$, set

$$
\begin{aligned}
S&=\operatorname{mk}(\alpha)
  =\sum_{n\ge0}\alpha(n)X^n,\\
A&=2X+2S,\\
B&=A^{\langle-1\rangle}.
\end{aligned}
$$

Here $B$ is the formal compositional inverse specified by the fact that the linear coefficient $4$ of $A$ is a unit; it satisfies $B(0)=0$ and $A(B(X))=X$. Write $\beta_n=[X^n]B\in\mathbb{Q}$ for $n\in\mathbb{N}$. In the real series below, $\beta_n$ denotes the image of this rational number in $\mathbb{R}$.
:::

This preserves the preceding notation $A$, $B$: the formal series $A$ is the expansion of the function $2x+2\arcsin x$ at the origin, and $B$ is its formal compositional inverse. The earlier $c_k$ still denotes only the degree $2k+1$ coefficient of arcsine; $\beta_n$ indexes the inverse coefficients by every natural degree.

$B$ has an equivalent description without series: first solve $\eta + \sin\eta = y/2$, then set $B(y) = \sin\eta$. Indeed, if $x = \sin\eta$ with $\eta \in [-\pi/2, \pi/2]$, then $A(x) = 2\sin\eta + 2\eta = y$. For $y = \pi$, the equation $\eta + \sin\eta = \pi/2$ is solved by $\eta = \frac{\pi}{2} - \theta^* = \arcsin\theta^*$ (substitution gives $\frac{\pi}{2} - \theta^* + \cos\theta^* = \frac{\pi}{2}$), so $B(\pi) = \sin\eta = \cos\theta^* = \theta^*$. To read this function value as the sum of the original rational series, one must also establish convergence to it. The following theorem gives absolute convergence and the exact sum.

::: {.theorem #thm-dottie-rational-inverse-endpoint title="The Rational Compositional Inverse Converges Absolutely at π to the Unique Positive Cosine Fixed Point" lean="D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint"}
For the coefficients $\beta_n$ specified in [@def-dottie-rational-inverse], there exists a real number $\theta^*$ such that all the following hold:

1. $0<\theta^*<1$ and $\cos\theta^*=\theta^*$;
2. for every real $t$, if $0<t$ and $\cos t=t$, then $t=\theta^*$;
3. $\operatorname{Summable}\bigl(n\mapsto|\beta_n|\pi^n\bigr)$;
4. $\operatorname{HasSum}\bigl(n\mapsto\beta_n\pi^n,\;\theta^*\bigr)$.

Both series range over all $n\in\mathbb{N}$, including $n=0$. The third clause asserts absolute convergence; the fourth retains every coefficient's sign and specifies the sum.
:::

::: proof
First find one analytic function for all the coefficients. Consider the complex function $f(z)=z+\sin z$. Solving $f(z)=w$ is equivalent to finding a fixed point of

$$
\Phi_w(z)=\frac{w+z-\sin z}{2}.
$$

On the closed disk $|z|\le1$, sine and cosine remainder bounds give

$$
|\sin z-z|\le\frac15,\qquad
|\cos z-1|\le\frac35.
$$

Thus, when $|w|<7/4$, we have $|\Phi_w(z)|\le(|w|+1/5)/2<1$ and $|\Phi_w'(z)|\le3/10$. The closed disk is complete, so the Banach contraction principle gives a unique solution $G(w)$ there, with $|G(w)|<1$ and $G(w)+\sin G(w)=w$. The same cosine bound ensures $f'(G(w))=1+\cos G(w)\ne0$. The analytic local inverse agrees with this unique solution near each point, making $G$ analytic throughout $|w|<7/4$. Conjugation preserves the equation and the disk; uniqueness therefore makes $G(w)$ real for real $w$ and gives $G(0)=0$.

Set

$$
H(Y)=\sin G(Y/2).
$$

This function is analytic for $|Y|<7/2$, real-valued on its real diameter, and zero at the origin. Cauchy's formula on the circle of radius $13/4<7/2$ therefore supplies an expansion of this same $H$ at the origin.

Every coefficient must now be identified. For real $y$ with $|y|<7/2$, write $x=G(y/2)\in(-1,1)$. Then $H(y)=\sin x$, and the principal-branch identity $\arcsin(\sin x)=x$ gives

$$
2H(y)+2\arcsin H(y)=2\sin x+2x=y.
$$

Near zero, the arcsine expansion is precisely $S$. Expressing this identity as a composition of Taylor series shows that the Taylor series $T$ of the real restriction of $H$ satisfies $T(0)=0$ and $A(T)=X$. A formal series with linear coefficient $4$ has only one compositional inverse with zero constant term, so $T$ is the real image of $B$. Since $H$ is real on the real axis near zero, its real and complex Taylor coefficients agree. Hence, for every $n\ge0$,

$$
\frac{H^{(n)}(0)}{n!}=\beta_n,
$$

where the right side is now embedded in $\mathbb{C}$. This connects every original rational coefficient, including degree zero, to the same Cauchy expansion. Since $\pi<13/4$, absolute convergence inside the disk gives $\sum_{n\ge0}|\beta_n|\pi^n<\infty$. Evaluating at $Y=\pi$ and taking real parts gives the signed sum $H(\pi)$.

Finally, put $x=G(\pi/2)\in(-1,1)$. The equation $x+\sin x=\pi/2>0$ forces $x>0$: if $x\le0$, then $\sin x\le0$ on this interval as well. Thus $\theta^*=\sin x$ satisfies $0<\theta^*<x<1$ and $\theta^*=\pi/2-x$, so $\cos\theta^*=\sin x=\theta^*$. Any positive real competitor $t=\cos t$ first lies in $(0,1]$ by $\cos t\le1$; strict decrease of cosine on $[0,\pi]$ then excludes $t=1$. The same monotonicity prevents two distinct positive fixed points. Uniqueness therefore covers every positive real $t$. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-dottie-pi-series title="Two Mutually Inverse Rational Series Linking π and θ*: Numerical Check of the Partial Sums"}
**Literature result, not formalized in this book: the classical arcsine expansion, numerical partial sums, and term-ratio comparison in this example.** Because the linear coefficient of $A$ at $0$ is $4 \neq 0$, order-by-order reversion of $A$ gives the odd rational power series

$$
B(y) \;=\; \frac{y}{4} - \frac{y^3}{768} - \frac{y^5}{61440} - \frac{43\,y^7}{165150720} - \frac{223\,y^9}{47563407360} - \cdots .
$$

The series $B$ and the identity $\theta^* = B(\pi)$ are described by Kaplan (2007, *Mathematics Magazine* 80, "The Dottie Number"); [@thm-dottie-rational-inverse-endpoint] gives absolute convergence and the exact sum of this prescribed series at $\pi$. The expansion of $A$ is the classical arcsine series. The coefficients in the table were obtained by order-by-order reversion in exact rational arithmetic; the partial sums were computed at 50 digits and rounded to the digits shown. These table entries and the term ratios below remain numerical checks; the endpoint theorem does not certify their rounding accuracy or the comparison of convergence speeds.

| truncation order | partial sum of $A$ (tends to $\pi$) | difference from $\pi$ | partial sum of $B$ (tends to $\theta^*$) | difference from $\theta^*$ |
| :---: | :---: | :---: | :---: | :---: |
| $1$ | $2.9563405$ | $1.85\times10^{-1}$ | $0.7853982$ | $4.63\times10^{-2}$ |
| $3$ | $3.0909148$ | $5.07\times10^{-2}$ | $0.7450254$ | $5.94\times10^{-3}$ |
| $5$ | $3.1239947$ | $1.76\times10^{-2}$ | $0.7400446$ | $9.59\times10^{-4}$ |
| $7$ | $3.1347505$ | $6.84\times10^{-3}$ | $0.7392582$ | $1.73\times10^{-4}$ |
| $9$ | $3.1387490$ | $2.84\times10^{-3}$ | $0.7391185$ | $3.33\times10^{-5}$ |
| $11$ | $3.1403573$ | $1.24\times10^{-3}$ | $0.7390918$ | $6.70\times10^{-6}$ |
| $21$ | $3.1415655$ | $2.72\times10^{-5}$ | $0.7390851363$ | $3.10\times10^{-9}$ |

The ratio of successive terms of $A$ tends to $(\theta^*)^2 \approx 0.546$. The ratio of successive nonzero terms of $B$ rises from $0.12$ (order $5$) to $0.22$ (order $21$) and numerically approaches $1/4$: reading $\theta^*$ from $\pi$ converges faster than reading $\pi$ from $\theta^*$.
:::

So two statements hold together without contradiction: analytically, each of $\pi$ and $\theta^*$ is the value of a rational power series at the other ([@thm-dottie-rational-inverse-endpoint], [@ex-dottie-pi-series]); algebraically, under Schanuel's conjecture ([@conj-schanuel-dottie]), no polynomial relation holds between them. $A$ and $B$ are infinite series, not polynomials; the finite truncations listed in the table all leave a nonzero difference. Nonvanishing of general truncation tails, a pattern of coefficient signs, and computational resource bounds are outside the endpoint theorem.

::: {.figure src="ch24-two-series"}
**$\pi$ and $\theta^*$ are the two coordinates of one point on one curve.** The cyan curve is $A(x) = 2x + 2\arcsin x$. Going up from $\theta^*$ on the horizontal axis and then left reads off $\pi = A(\theta^*)$: the cyan arrows. Going right from $\pi$ on the vertical axis and then down reads back $\theta^* = B(\pi)$ along the same path: the dashed magenta arrows laid over the cyan ones. The absolute convergence and sum of $B$ at $\pi$ are [@thm-dottie-rational-inverse-endpoint]; the arcsine expansion behind $\pi = A(\theta^*)$ is in [@rem-arcsin-series-derivation] (literature result, not formalized in this book).
:::

**Where the fixed point lives: the half-time of a cycloid.** How the auxiliary equation $\eta + \sin\eta = \pi/2$ appears in Kepler's equation and Newtonian radial free fall is worked out in [@ex-dottie-free-fall].

::: {.example #ex-dottie-free-fall title="Half-Time Free Fall: When Half the Fall Time Has Elapsed, the Distance Remaining Is (1 + sin θ*)/2"}
**Literature result, not formalized in this book.** Substituting $E = \pi - \eta$ into $\eta + \sin\eta = \pi/2$ from [@ex-dottie-pi-series] yields Kepler's equation $E - \sin E = \frac{\pi}{2}$ at eccentricity $e = 1$ and mean anomaly $M = \pi/2$, solved by $E = \frac{\pi}{2} + \theta^* \approx 132.35^\circ$. Here we take the zero-angular-momentum limit of a bound ellipse ($e \to 1$), which degenerates into a radial segment; the motion along it is the Newtonian radial free fall from rest at distance $r_0$ in the gravitational field of a central mass $M$. Energy conservation gives $\dot{r}^2 = 2GM\left(\frac{1}{r} - \frac{1}{r_0}\right)$, whose solution is the cycloid parametrization:

$$
r(\eta) \;=\; \frac{r_0}{2}\,(1 + \cos\eta), \qquad t(\eta) \;=\; \frac{t_{\mathrm{ff}}}{\pi}\,(\eta + \sin\eta), \qquad \eta \in [0, \pi],
$$

where $t_{\mathrm{ff}} = \frac{\pi}{2}\sqrt{\frac{r_0^3}{2GM}}$ is the total time to reach the centre. Direct differentiation confirms it: $\dot{r}^2 = \frac{r_0^2\pi^2}{4\,t_{\mathrm{ff}}^2}\cdot\frac{\sin^2\eta}{(1+\cos\eta)^2}$, while $2GM\left(\frac{1}{r} - \frac{1}{r_0}\right) = \frac{2GM}{r_0}\cdot\frac{\sin^2\eta}{(1+\cos\eta)^2}$, and the two agree exactly when $t_{\mathrm{ff}}$ has the value above.

**The half-time instant.** Set $t = t_{\mathrm{ff}}/2$, that is, $\eta + \sin\eta = \pi/2$. Substituting $\eta = \frac{\pi}{2} - x$ gives $\cos x = x$, so $x = \theta^*$ and $\eta_{1/2} = \frac{\pi}{2} - \theta^* = \arcsin\theta^* \approx 47.65^\circ$. Therefore

$$
\frac{r(t_{\mathrm{ff}}/2)}{r_0} \;=\; \frac{1 + \cos\eta_{1/2}}{2} \;=\; \frac{1 + \sin\theta^*}{2} \;=\; \frac{1 + \lambda}{2} \;\approx\; 0.836806 .
$$

The infall speed at that instant, in units of the escape speed $v_0 = \sqrt{2GM/r_0}$ at $r_0$, is

$$
\frac{\lvert\dot{r}\rvert}{v_0} \;=\; \frac{\sin\eta_{1/2}}{1 + \cos\eta_{1/2}} \;=\; \frac{\theta^*}{1 + \lambda} \;\approx\; 0.441611 .
$$

**Comparison and check.** At $t/t_{\mathrm{ff}} = \frac14, \frac12, \frac34$ the ratio $r/r_0$ equals $0.960937$, $0.836806$, $0.597150$ respectively; only the middle one has a closed form in terms of $\theta^*$. Numerical integration of $t(r) = \int_r^{r_0} \frac{\mathrm{d}r'}{\sqrt{2GM\left(\frac{1}{r'} - \frac{1}{r_0}\right)}}$ gives $t(0.836806\,r_0)/t_{\mathrm{ff}} = 0.500000$, in agreement with the closed form.

The same parametric equations describe the closed dust Friedmann universe, with $r$ replaced by the scale factor and time reversed (literature result, not formalized in this book): halfway through its expansion phase in time, such a universe has already reached $83.68\%$ of its maximum size.

Half the time is spent, yet less than one sixth of the distance is covered: the fall starts slowly, and most of the distance is travelled in the second half. And "half", the plainest of all division points, lands at a position given exactly by $\theta^*$. The cosine fixed point does not live only on the cosine key of a calculator; every process governed by the cycloid law — a radial Kepler orbit, free-fall collapse, a closed dust universe — reads it at the instant when half of its time has elapsed.
:::


::: {.figure src="ch24-half-fall"}
**Half the time gone, less than a sixth of the way fallen.** The ink curve is the cycloid solution of radial free fall: $t/t_{\mathrm{ff}}$ across, $r/r_0$ up. Three points mark $\frac14, \frac12, \frac34$ of the time, at heights $0.961$, $0.837$ and $0.597$; the cyan half-time point sits at $\frac{1 + \sin\theta^*}{2}$, and the bracket on the right is the $0.163$ fallen by then. Computed from the formulas of the example above; the free-fall model itself is a literature result, not formalized in this book.
:::
