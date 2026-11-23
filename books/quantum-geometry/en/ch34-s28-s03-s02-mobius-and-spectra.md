# 31.1.3.2 Möbius truncation and zero-spectrum recovery {#sec-ch34-s28-s03-s02-mobius-and-spectra}


**The cube term and half phase of the square cutoff.** Keep $E(a,B)=N(a,B)-2\ln(B/a)$. Enumerate all actual nontrivial zeros $\rho_k$ with multiplicity, put $\gamma_k=\operatorname{Im}\rho_k$ and $c_k=1/[\rho_k(1-\rho_k)]$, use the preceding series to define $P$, and set $\phi(u)_k=e^{i\gamma_k u}$. For $x>0$, define

$$
A_2(x)=4\operatorname{Re}\sum_\rho
\frac{x^{(\rho-1)/2}}{\rho(1-\rho)(2-\rho)}.
$$

::: {.theorem #thm-ch31-prime-window-cube-square title="The cube term, square spectrum, and the Riemann hypothesis" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHRootCorrection.rh_iff_prime_window_cube_and_square"}
The Riemann hypothesis holds if and only if there exist $a_0\ge2$ and $K>0$ such that every real pair $B\ge a\ge a_0$ satisfies

$$
\begin{aligned}
\bigl|E(a,B)&-P(\phi(\ln B))+P(\phi(\ln a))\\
 &-9(a^{-1/6}-B^{-1/6})-A_2(B)+A_2(a)\bigr|
 \le K(a^{-3/10}-B^{-3/10}).
\end{aligned}
$$
:::

::: proof
Under RH, Costa Pereira's inequalities isolate the square-root and cube-root cutoffs of $\psi$ in $\psi-\vartheta$, leaving a remainder bounded by $\psi(x^{1/5})$. After integration and normalization, the cube main term contributes $(3/2)x^{-1/6}$ to the density. Integration over the log window gives the coefficient $9$. Writing $y=\sqrt{x}$ gives the centered square-cutoff correction $2Q(y)-2y\int_y^\infty Q(s)s^{-2}\,ds$. Substituting the integrated explicit formula for the complete tail gives the coefficient $-2/[\rho(2-\rho)]$ at each zero. Integrating the modes gives $A_2(B)-A_2(a)$.

The square-cutoff term uses phase $e^{i\gamma_\rho\ln(x)/2}$, whose square is the phase of the same zero in $\phi(\ln x)$. The remaining log density is bounded by a constant times $x^{-3/10}$. Integrating over the actual window keeps both endpoints, so the error bound also vanishes as the window shrinks. [Restatement of Costa Pereira's inequalities](https://arxiv.org/html/2002.11068v2#S3.E16)

The same estimate also implies RH. Both endpoint primitives are uniformly bounded for positive cutoffs at least one by absolute convergence and the known critical-strip bounds. The cube term and the power error are bounded as well. If the estimate holds uniformly, then $E(a,B)$ stays bounded at a fixed admissible $a$ as $B$ grows. If RH fails, the wide-window theorem gives arbitrarily large excess over $2\ln(B/a)$ for sufficiently large $B\ge a^2$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-rh-prime-fifth-window title="The fifth prime-power term in the actual prime window" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHFifthWindow.prime_window_fifth_of_rh"}
Under RH let $R(a,B)$ be the signed expression inside the absolute value in the cube and square estimate above. Write $D_s(a,B)=a^{-s}-B^{-s}$. There exist $a_0\ge2$ and $K>0$ such that for every real $B\ge a\ge a_0$,
$$
\left|R(a,B)-\frac{25}{6}D_{3/10}(a,B)\right|\le K D_{1/3}(a,B).
$$
:::

::: proof

The finite Chebyshev decomposition writes each $\psi(t^{1/d})$ as the sum of $\vartheta(t^{1/k})$ over exponents $k$ divisible by $d$, including multiplicities of prime powers through the same cutoff $t$. In $\psi(t)-\vartheta(t)-\psi(t^{1/2})-\psi(t^{1/3})-\psi(t^{1/5})$, the coefficients at exponents 2 through 5 vanish, and the coefficient at 6 is $-1$. The remaining terms have total absolute value at most $4\ln(t)t^{1/7}$ for $t\ge2$. The sixth root and this tail give an $O(t^{1/6})$ bound. This arithmetic estimate is unconditional.

Integrating the uncentered fifth root against $dt/t^2$ and multiplying by $\sqrt{x}$ gives the log-density term $(5/4)x^{-3/10}$. Under RH the centered fifth-root tail is of order $x^{-2/5}$, while the arithmetic bound gives order $x^{-1/3}$ after the same integration and scaling. Over $[\ln a,\ln B]$ the fifth-root term contributes $(25/6)D_{3/10}(a,B)$ and the integrated error is bounded by a constant times $D_{1/3}(a,B)$. Both terms vanish for $B=a$. The full and half-logarithmic phases still use the same actual zeros. The full proof is checked by the Lean kernel.
:::

For $B>a$, one has $D_{1/3}(a,B)\le(10/9)a^{-1/30}D_{3/10}(a,B)$ by comparing the two power derivatives over $[a,B]$. Thus $R(a,B)/D_{3/10}(a,B)$ tends to $25/6$ as $a\to\infty$, uniformly in all $B>a$, including windows whose length tends to zero.

For the same signed residual $R(a,B)$, keep the fifth term and define

$$
A_3(x)=18\operatorname{Re}\sum_\rho
\frac{x^{\rho/3-1/2}}{\rho(3-\rho)(3-2\rho)}.
$$

The sum runs over the same actual zeros with multiplicity as in the ordinary and square-root primitives.

::: {.theorem #thm-ch31-prime-window-seventh title="The sixth and seventh powers and the cube-root spectrum" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHSeventhWindow.prime_window_seventh_of_rh"}
Under RH, there exist $a_0\ge2$ and $K>0$ such that all real $B\ge a\ge a_0$ satisfy

$$
\left|R(a,B)-\frac{25}{6}D_{3/10}(a,B)
+\frac{18}{5}D_{1/3}(a,B)-A_3(B)+A_3(a)
-\frac{49}{15}D_{5/14}(a,B)\right|
\le K D_{3/8}(a,B).
$$
:::

::: proof
The finite Chebyshev decomposition gives coefficients $-1$ and $+1$ at degrees six and seven, and degree eight cancels. The absolute remainder from degree nine onward is at most $4\ln(t)t^{1/9}$. Under RH, replacing the two Chebyshev values $\vartheta(t^{1/n})$ by $t^{1/n}$ and adding that remainder gives an $O(t^{1/8})$ error. The normalized tail integral gives the main densities $-(6/5)x^{-1/3}$ and $(7/6)x^{-5/14}$ with an arithmetic error density of order $x^{-3/8}$. [Normalized sixth- and seventh-power estimate](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SeventhCutoff.sixth_seventh_normalized)

The cube-root spectral modes have coefficients $-3/[\rho(3-\rho)]$ and phases $e^{i\gamma_\rho\ln(x)/3}$. They decay as $x^{-1/3}$, the order of the sixth-power main term. Each of the centered square- and cube-root tails differs from its spectral density by $O(x^{-1/2})$. The complete-tail explicit formula has an error of the same order, and the centered fifth-root tail is $O(x^{-2/5})$. A common left cutoff makes $-Q_\vartheta(x)$ positive throughout the window, so the negative-part mass becomes a signed integral in log coordinates. Integrating the spectrum term by term gives $A_3(B)-A_3(a)$, and integrating the sixth- and seventh-power densities gives coefficients $-18/5$ and $49/15$. Integrating the error density on the same interval $[\ln a,\ln B]$ gives a constant times $D_{3/8}(a,B)$, including $B=a$.

The reference repository’s `FormBAt.mono` uses monotonicity in the exponent to restrict a pointwise bound to a shorter window with the same left endpoint. Here we compare decay rates at each point of the original window and retain both endpoints. [Window restriction in the reference project](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Window.lean#L37-L44)

The full proof is checked by the Lean kernel.
:::

Let $N(a,B)$ denote the actual prime-only negative tail mass. Write $P(u)$ for the ordinary spectral primitive evaluated on the joint log-phase orbit. For an integer $n\ge2$ and cutoff $x>0$, set
$$
A_n(x)=2n^2\operatorname{Re}\sum_\rho
\frac{x^{\rho/n-1/2}}{\rho(n-\rho)(n-2\rho)}.
$$
The sum runs over all actual nontrivial zeros with multiplicity. Each root spectrum uses the corresponding phase $e^{i\gamma_\rho\ln(x)/n}$ on the same log coordinate. Write $s_m=1/2-1/(m+1)$ and $D_s(a,B)=a^{-s}-B^{-s}$.

::: {.theorem #thm-ch31-prime-window-mobius title="One threshold for every truncation order" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHMobiusWindow.prime_window_mobius_of_rh"}
Assume RH. There are constants $a_0\ge2$ and $K>0$ such that for every integer $m\ge2$ and every pair of real cutoffs $B\ge a\ge a_0$,

$$
\begin{aligned}
&\Bigg|N(a,B)-2\ln(B/a)-P(\ln B)+P(\ln a)\\
&\quad+\sum_{n=3}^{m}\frac{2\mu(n)n^2}{(n-1)(n-2)}D_{1/2-1/n}(a,B)
+\sum_{\substack{2\le n\le m\\2n<m+1}}\mu(n)\bigl(A_n(B)-A_n(a)\bigr)\Bigg|
\le K m(1+\ln m)^2 D_{s_m}(a,B).
\end{aligned}
$$
:::

::: proof
The finite Chebyshev identity for $\vartheta-\psi$ weights $\psi(t^{1/n})$ by $\mu(n)$. The terms of degree $n$ vanish for $t<2^n$. The global linear bound for $\psi$ gives a geometric bound for the remaining tail, with a constant growing linearly in $m$.

The centered transform of the complete tail sends the coefficient of the $j$th trivial zero to $n/[2j(n+2j)]$. Its absolute sum is bounded by a harmonic number. This yields an $O((1+\ln n)x^{-1/2})$ bound even at rooted argument one. Split the actual nontrivial zero occurrences at $|\operatorname{Im}\rho|=n$, keeping their multiplicities. The resulting bound for each spectral density is $O((1+\ln n)^2x^{1/(2n)-1/2})$. When $2n\ge m+1$, this decay fits the target exponent. Sum over $n\le m$. Choose one threshold for all $m$ so that $-Q_\vartheta(x)>0$ throughout the window. Then $N(a,B)=\int_a^B[-Q_\vartheta(x)]\,dx/\sqrt{x}$, with density $-e^{u/2}Q_\vartheta(e^u)$ in the log coordinate $u=\ln x$. Integrate on $[\ln a,\ln B]$. Since $s_m\ge1/6$, the integration factor $1/s_m$ is at most six. Both sides vanish at $B=a$. The full proof is checked by the Lean kernel.
:::

At $m=9$, the Möbius coefficients at degrees eight and nine vanish and the retained spectra are the same as in the sixth- and seventh-power result. The same residual therefore has a bound of order $D_{2/5}(a,B)$.

At order ten the eighth and ninth coefficients vanish. The tenth main term is $-(25/9)D_{2/5}(a,B)$ and the fifth-root primitive contributes at the same decay rate. Including both leaves a bound with exponent $9/22$. The statement concerns a finite truncation at every order with a uniform estimate. The same constants apply when the order varies with the endpoints. The size of the error still depends on the endpoint power difference. [Möbius inversion, DLMF 27.5.6](https://dlmf.nist.gov/27.5.E6) · [Suzuki, equation (36)](https://arxiv.org/html/2411.07436v3#S2.E36) · [Zhao, equation (14) and Lemma 7](https://arxiv.org/html/2411.18903v2)

::: {.theorem #thm-ch31-prime-window-mobius-single-log title="A single-logarithm remainder for every truncation order" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/RHMobiusSingleLog.prime_window_mobius_one_log_of_rh"}
Assume RH. Let $E_m(a,B)$ be the signed expression inside the absolute value in [@thm-ch31-prime-window-mobius]. There are constants $a_0\ge2$ and $K>0$ such that for every integer $m\ge2$ and all real cutoffs $B\ge a\ge a_0$,

$$
|E_m(a,B)|\le K m(1+\ln m)\bigl(a^{-s_m}-B^{-s_m}\bigr),
\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$

:::

::: proof
At log coordinate $u=\ln x$, set $q=m+1$ and $\lambda=u/q$. For the same centered root tail whose spectrum is omitted, the actual-zero coefficient estimate supplies a factor of order $(1+\ln n)^2$. Integrating the Chebyshev error under RH supplies a factor of order $(1+u/n)^2$. The latter uses the global linear bound for $\psi$ when the rooted argument is near one. Since the omitted degrees satisfy $2n\ge q$, take the smaller of $(1+2\lambda)^2$ and $(1+\ln m)^2$.

After factoring out the target decay, each term carries the weight $\exp[-u(1/q-1/(2n))]$. Starting at the first omitted degree $\lceil q/2\rceil$, these weights are bounded by a geometric sequence. Their sum is at most $m$ and at most $1+q/\lambda$ when $\lambda>0$. Multiplying the two bounds in the ranges $\lambda\le1$, $1<\lambda\le1+\ln m$, and $\lambda>1+\ln m$ gives a constant times $m(1+\ln m)$. The trivial-zero error at retained degrees fits the same bound. Integrate over the original log window. The integration factor is at most six because $s_m\ge1/6$. The full proof is checked by the Lean kernel.
:::

The bound includes $B=a$, where both sides vanish.

<a id="prob-ch31-prime-window-linear-remainder"></a>

::: {.theorem #thm-ch31-prime-window-linear-remainder title="A linear remainder in the truncation order" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/LinearOrder/RHMobiusLinear.prime_window_mobius_linear_of_rh"}
Assume RH. There exist constants $a_0\ge2$ and $K>0$ such that for every integer $m\ge2$ and all real cutoffs $B\ge a\ge a_0$, the signed residual $E_m(a,B)$ from [@thm-ch31-prime-window-mobius] satisfies

$$
|E_m(a,B)|\le K m D_{s_m}(a,B),\qquad
s_m=\tfrac12-\tfrac1{m+1},\qquad D_s(a,B)=a^{-s}-B^{-s}.
$$

:::

::: proof
The signed Möbius weights control the trivial-zero contribution. The identity $\mu(n)\ln n=-(\mu*\Lambda)(n)$, the Chebyshev error under RH, and the bounded reciprocal Möbius sum give a logarithmic saving in the partial sums of $\mu$. At fixed $u=\ln x\ge0$, the positive trivial-zero response increases with the degree and is at most $(1+\ln n)/2$. Abel summation combines this growth with the partial-sum saving and bounds the signed response through degree $m$ by a constant times $m$ after the factor $e^{-u/2}$ is extracted.

Put $q=m+1$. If $u\le q$, each omitted centered root term has the required decay bound because $u/n\le2$. If $u\ge q$, the log-root samples $u/n$ are separated by at least $1/q$. Partition the omitted degrees into unit bands of $2u/q-u/n$. On each band, use the local Gaussian mean-square bound for the finite zero sums and their log-coordinate derivatives. The squared bin masses are summable by the signed unit-window zero count, with analytic multiplicity. Adjacent-degree differences control the variation in the coefficients. Each band contributes at most a constant times $q$ before its weight $\exp[-(2u/q-u/n)/2]$ is applied. The geometric sum includes the band where that weight can equal one. Absolute convergence at each sample gives the same bound for the full value series.

The Möbius truncation error and the error from the complete Mangoldt tail satisfy the same decay bound. The eventual sign of the prime-only tail fixes a common left threshold. Integrate the resulting density estimate over $[\ln a,\ln B]$. Since $s_m\ge1/6$, the integration factor is uniformly bounded. Both sides vanish at $B=a$. The full proof is checked by the Lean kernel.
:::

The estimate holds for every finite order and permits the choice of order to depend on the cutoffs. The exponent, endpoint gap and retained root spectra are the same as in the previous bounds. [Weighted mean-square method, Coppola and Laporta, §1](https://arxiv.org/abs/1411.1739v1)

<a id="prob-ch31-prime-window-sublinear-remainder"></a>

::: {.theorem #thm-ch31-prime-window-sublinear-remainder title="A uniformly sublinear prime-window remainder" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusSublinear.prime_window_mobius_sublinear_of_rh"}
Assume RH. There is a real cutoff $a_0\ge2$ such that for every $\varepsilon>0$ there is an integer $m_0\ge2$ for which

$$
|E_m(a,B)|\le\varepsilon m D_{s_m}(a,B)
$$

for all integers $m\ge m_0$ and real cutoffs $B\ge a\ge a_0$, including $B=a$. Here $E_m(a,B)$ is the same signed residual as in [@thm-ch31-prime-window-mobius], with $s_m=\tfrac12-\tfrac1{m+1}$.
:::

::: proof
Write $u=\ln x$ and $q=m+1$. The convolution of the Chebyshev function with the Möbius weights, combined with the exact floor cancellation, makes the Möbius prefix sum times $\ln m$ uniformly $o(m)$ for all prefixes through $m$. Abel summation uses this bound for the signed trivial-zero response. A separate signed Abel estimate on the decreasing Chebyshev root weights gives a logarithmic saving for the truncation tail.

Choose a finite set of unit frequency bins so that the sum of squared masses in the complementary bins is as small as desired. For $u\ge Lq$, the sum of geometric weights of the omitted degrees is at most $1+q^2/u$. The finite bins have bounded amplitudes and thus contribute arbitrarily little after division by $m$ when $L$ and then $m$ are large. The local Gaussian estimate bounds the complementary bins by their small square mass after taking its square root. This estimate counts each actual zero with its analytic multiplicity. For $u\le Lq$, write each omitted centered root term as the difference of an integrated Chebyshev term and a power term. The two sequences are decreasing in the degree, so signed Abel summation gives the required saving at this fixed $L$.

The eventual sign of the prime-only tail fixes $a_0$ before the choice of accuracy. Integration over $[\ln a,\ln B]$ leaves the original power gap because $s_m\ge1/6$. The full proof is checked by the Lean kernel.
:::

<a id="prob-ch31-prime-window-quantitative-sublinear-remainder"></a>

::: {.theorem #thm-ch31-prime-window-quantitative-sublinear-remainder title="An inverse double-logarithmic bound for the prime-window remainder" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusSpacing.prime_window_mobius_spacing_of_rh"}
Assume RH. There are real constants $a_0\ge2$ and $C>0$ such that for every integer $m\ge2$ and all real cutoffs $B\ge a\ge a_0$,

$$
|E_m(a,B)|\le \frac{C m}{1+\ln\ln(m+1)}D_{s_m}(a,B).
$$

Here $E_m(a,B)$ is the signed residual in [@thm-ch31-prime-window-mobius], with $s_m=\tfrac12-\tfrac1{m+1}$. The bound includes $B=a$.

:::

::: proof
Write $q=m+1$ and $u=\ln x$. In the signed Möbius convolution, subtract the Chebyshev term from the floor term and choose the quotient cutoff as the four-fifths power of $\ln m$. Balancing the two errors bounds every Möbius prefix through $m$, multiplied by $\ln m$, by a constant times $m/(\ln m)^{1/5}$. Abel summation carries this estimate to the weighted trivial-zero response.

For sufficiently large $m$, let $J_m=1+\ln\ln q$ and $L=J_m/8$. When $u\le Lq$, signed summation of the two decreasing root weights costs at most a constant times $e^{2L}m/\ln m$ after extracting the target exponential decay.

For $u\ge Lq$, distinct coordinates $u/n$ are at least $u/q^2$ apart. The local sampling inequality weights the value integral by $1/\min(1,u/q^2)$ and adds a phase derivative integral. Interpolating two bounds for that derivative gives a square-summable profile across the unit frequency bins, with cost at most a constant times $q^{7/8}$ after the degree increments are included. Summing the weighted unit windows then costs at most a constant times $1+q^2/u+q^{7/8}$, bounded by a constant times $m/J_m$ in this range. The bin masses count zeros with their analytic multiplicities.

Integrate the density estimate on the original window to keep the endpoint power difference. The linear bound in [@thm-ch31-prime-window-linear-remainder] absorbs the finitely many smaller orders into the same constant. The full proof is checked by the Lean kernel.
:::

::: {.lemma #lem-ch31-mobius-energy-prefix title="Ordinary Möbius prefixes from weighted energy" lean="D5/S3/Weil/ZetaPntBounds/MobiusEnergyPointwise.unweighted_mobius_prefix_power_bound"}
Let $1/2\le\theta<1$ and $2\theta-1<\alpha<1$. Suppose $\zeta(z)\ne0$ whenever $\operatorname{Re}z>\theta$ and $z\ne1$. There is a real $C>0$ such that, for each integer $N\ge1$,
$$
\left|\sum_{1\le n\le N}\mu(n)\right| \le C N^{(2+\alpha)/3}.
$$
:::

::: proof
For the reciprocal-weighted prefix $S(x)=\sum_{1\le n\le x}\mu(n)/n$, the zero-free hypothesis gives finite energy $\int_1^\infty S(x)^2 x^{-\alpha}\,dx$. Put $H=|S(N)|$ at an integer $N\ge2$. Each subsequent step changes $S$ by at most $1/N$, so $|S(x)|\ge H/2$ on the real interval $N<x\le N+HN/2$. The energy on this interval controls $H^3N^{1-\alpha}$. Partial summation carries the resulting pointwise bound to the ordinary prefix. The case $N=1$ is absorbed into the constant.
:::

Under RH, take $\theta=1/2$ and $\alpha=1/4$. The resulting $N^{3/4}$ bound supplies cancellation in the near range of the prime-window proof. The inverse-logarithmic window bound also requires a far-range spectral estimate and the transfer to the two real endpoints. [Inverse-logarithmic window question](https://github.com/the-omega-institute/trureturing/issues/33096)

::: {.theorem #thm-ch31-mobius-short-average title="Pointwise Möbius prefixes from a zero-free half-plane" lean="D5/S3/Weil/ZetaPntBounds/MobiusShortAverage.ordinary_mobius_prefix_of_zero_free"}
Let $\tfrac12\le\theta<1$ and suppose $\zeta(z)\ne0$ whenever $\operatorname{Re}z>\theta$ and $z\ne1$. For every $\varepsilon>0$ there is $C>0$ such that every integer $N\ge1$ satisfies

$$
\left|\sum_{1\le n\le N}\mu(n)\right|\le C N^{\theta+\varepsilon}.
$$

Under RH one can take $\theta=1/2$, giving Littlewood’s classical prefix bound. [Soundararajan, p. 1, equation (1)](https://arxiv.org/pdf/0705.0723v2)
:::

::: proof
Set $x=N$ and $h=\sqrt{x}$. Write $R(y)=\sum_{n\le y}\mu(n)(y-n)$. In the short average $(R(x+h)-R(x))/h$, the terms with $n\le N$ give the ordinary prefix. Each remaining weight lies in $[0,1]$, and at most $\lfloor h\rfloor$ integers contribute. The error is therefore at most $h$.

Take the difference of the two first-order Riesz kernels in the Perron integral. Differentiating the complex power along the positive real axis gives a bound with a single vertical denominator. Estimating the two endpoints separately gives a bound with a quadratic denominator. Together with subpower growth of reciprocal zeta, these bounds give an integrable majorant proportional to $(1+|\operatorname{Im}s|)^{-1-\delta}$ and permit shifting to $\operatorname{Re}s=\theta+\delta$. The short average is $O(x^{\theta+2\delta})$ for $\delta=\min(\varepsilon/3,1/4)$. Adding the error $h$ gives the ordinary prefix estimate. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-prime-window-inverse-log title="Inverse-logarithmic prime-window bound" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusInverseLog.prime_window_mobius_inverse_log_of_rh"}
Assume the Riemann hypothesis. There are real constants $a_0\ge2$ and $C>0$ such that every integer $m\ge2$ and all real $B\ge a\ge a_0$ satisfy
$$
|E_m(a,B)|\le \frac{Cm}{\ln(m+1)}D_{s_m}(a,B),
\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$
The residual $E_m$ is the one in [@thm-ch31-prime-window-mobius], with its signed arithmetic corrections and root modes selected by $2n<m+1$ and counted with analytic multiplicity.
:::

::: proof
Put $q=m+1$, $u=\ln x$ and $L=1+\ln q/16$. For $u\le Lq$, apply finite Abel summation to the omitted degree weights. The $m^{3/4}$ prefix bound from [@lem-ch31-mobius-energy-prefix] gives a coefficient of order $e^{2L}m^{3/4}$. Since $e^{2L}=e^2 q^{1/8}$, this is bounded by a constant times $m/\ln q$. The same prefix estimate bounds the trivial-zero response by a constant times $m^{3/4}(1+\ln m)$.

For $u\ge Lq$, the actual coordinates $u/n$ have spacing at least $u/q^2$. The separated sampling bound for the omitted spectrum costs $1+q^2/u+q^{7/8}$, which is at most a constant times $m/\ln q$ in this range. The signed arithmetic tail obeys the same bound. Each estimate uses the density factor $e^{-s_m u}$. Integration between $\ln a$ and $\ln B$ yields the endpoint difference $D_{s_m}(a,B)$, which vanishes at $B=a$. The threshold and constant are uniform in the truncation order.
:::

::: {.theorem #thm-ch31-prime-window-power title="Power saving in the prime-window truncation order" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusPower.prime_window_mobius_power_of_rh"}
Assume RH. There are constants $a_0\ge2$ and $C>0$ such that for every integer $m\ge2$ and all real $B\ge a\ge a_0$,
$$
|E_m(a,B)|\le C m^{27/28}D_{s_m}(a,B),\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$
The residual is the one in [@thm-ch31-prime-window-mobius]. It includes the signed arithmetic corrections and retains exactly the degrees $2n<m+1$, with zeros counted by analytic multiplicity.
:::

::: proof
Put $q=m+1$ and $u=\ln x$. For $u\le q$, use the ordinary Möbius prefix bound of order $q^{3/4}$ from [@lem-ch31-mobius-energy-prefix]. On the omitted degrees $n\ge\lceil q/2\rceil$, finite Abel summation gives a normalized near-range coefficient of order $q^{3/4}$.

For $q\le u\le q^{29/28}$, split the unit bins of the actual zero ordinates at $H=\lfloor q^{1/7}\rfloor$. In the low bins, the normalized degree weight of one zero $\rho$ has total variation bounded by a constant times $(1+|\operatorname{Im}\rho|u/q)/|\rho|$. Complex Abel summation applies the Möbius prefix bound to that variation. Summing over the low bins costs at most a constant times $q^{3/4}(H+1)^{1/4}(1+(H+1)u/q)$. The high-bin square mass is $O(H^{-1/2})$, so separated sampling costs $O(qH^{-1/4})$. Both are $O(q^{27/28})$. For $u\ge q^{29/28}$, use the whole-spectrum bound of order $1+q^2/u+q^{7/8}$.

The signed trivial-root term costs $O(q^{3/4}(1+\ln q))$. For the arithmetic tail, the difference of the Möbius prefixes at $q+j$ and $q-1$ is $O(q^{-1/4}(q+j))$. Abel summation against the decreasing Chebyshev weights bounds that tail by $O(q^{3/4})$ after normalization. Integrate the resulting density bound between $\ln a$ and $\ln B$ to obtain the power difference in the statement. It vanishes at $B=a$.
:::

::: {.theorem #thm-ch31-prime-window-three-quarters title="A three-quarter exponent for the signed prime window" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusThreeQuarters.prime_window_mobius_three_quarters_of_rh"}
Assume the Riemann hypothesis. For each $\varepsilon>0$ there are real constants $a_0\ge2$ and $C>0$ such that every integer $m\ge2$ and all real $B\ge a\ge a_0$ satisfy
$$
|E_m(a,B)|\le C m^{3/4+\varepsilon}D_{s_m}(a,B),\qquad
s_m=\tfrac12-\tfrac1{m+1}.
$$
The residual $E_m$ uses the original signed corrections. The spectral series count zeros with analytic multiplicity, and the retained root primitives satisfy the strict inequality $2n<m+1$.
:::

::: proof
Put $q=m+1$ and $u=\ln x$. For each omitted degree set $v_n=u/n-2u/q\le0$. Split the actual root coefficient as $-1/\rho-1/(n-\rho)$. Write $\rho=\tfrac12+i\gamma$ and extract the common unit phase $\exp(2i\gamma u/q)$. The reciprocal $\rho^{-1}$ in the first term comes from integrating $e^{\rho t}$ up to $v_n$. Moving the degree sum inside the integral gives a signed Möbius prefix multiplied by $e^{t/2}$ and a low-frequency phase sum. Since $v_n$ decreases with $n$, the degrees satisfying $t\le v_n$ form an interval whose sum is a difference of two ordinary prefixes.

Partition $t\le0$ into unit intervals. The local spectral integral is controlled by the square mass of the frequency bins, and the exponential weight makes the interval bounds sum geometrically. Counting the actual low-bin occurrences gives a cost of $O(q^{1/2+\eta}(H+1)^{1/2+\eta})$ for the first term. The second term costs $O((H+1)^{1+\eta})$ because each coefficient is at most $3/q$ in modulus. The high-bin square mass gives the tail cost $O(qH^{\eta-1/2})$.

At $H=\lfloor\sqrt q\rfloor$ all three costs are $O(q^{3/4+2\eta})$. The pointwise Möbius prefix controls the near range and the arithmetic corrections. Choose $\eta>0$ small enough and integrate from $\ln a$ to $\ln B$ to recover the original power difference. Both sides vanish at $a=B$. The full proof is checked by the Lean kernel.
:::

This gives a uniform upper bound under RH. The optimal order of the signed residual remains open.


::: {.theorem #thm-ch31-prime-window-eight-ninths title="An eight-ninths order bound for the signed prime window" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEightNinths.prime_window_mobius_eight_ninths_of_rh"}
Assume RH. For each real $\varepsilon>0$ there are constants $a_0\ge2$ and $C>0$ such that every integer $m\ge2$ and every pair of real endpoints $B\ge a\ge a_0$ satisfy

$$
|E_m(a,B)|\le C m^{8/9+\varepsilon}D_{s_m}(a,B),\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$

This is the signed residual of [@thm-ch31-prime-window-mobius], with the original arithmetic signs and exactly the retained degrees $2n<m+1$. The zero sums count analytic multiplicities. Both sides vanish at coincident endpoints.
:::

::: proof
Put $q=m+1$, $u=\ln x$, $v_n=u/n$, and $W(v)=e^{-u/q+v/2}$. In the difference of adjacent modes, the phase increment carries the factor $W(v_{n+1})$. The inequality $e^t-1\ge t$ gives

$$
W(v_{n+1})(v_n-v_{n+1})\le 2\bigl(W(v_n)-W(v_{n+1})\bigr).
$$

The right-hand side telescopes over the omitted degrees. Together with the adjacent root-coefficient bound, it controls the total variation of each zero's mode by $O((1+|\operatorname{Im}\rho|)/|\rho|)$ uniformly in $u$. For the low-frequency zeros, complex Abel summation takes the signed degree sum before adding the zero occurrences. Use $0<\eta\le\min(\varepsilon/2,1/36)$ and the ordinary Möbius prefix bound $O(q^{2/3+\eta})$. The normalized low-frequency contribution is $O(q^{2/3+\eta}(H+1)^{1+\eta})$. The local zero count bounds the squared inverse-root bin masses above height $H$ by $O(H^{2\eta-1})$ in total. Separated sampling of the degrees therefore costs $O(qH^{\eta-1/2})$.

The single choice $H=\lfloor q^{2/9}\rfloor$ gives $O(q^{8/9+2\eta})$ throughout $u\ge q$. The same prefix bound controls the near range, trivial-zero correction, and arithmetic tail. The extra factor $1+\ln q$ in the trivial-zero term is absorbed by the gap between exponents. Integrating the uniform density bound between $\ln a$ and $\ln B$ yields the original endpoint power difference. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-prime-window-power-prefix title="A signed prime-window bound from a Möbius prefix exponent" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/PowerPrefixWindow.prime_window_mobius_of_power_prefix"}
Assume the Riemann hypothesis. Fix $0\le\beta<1$, $P>0$, and $\varepsilon>0$, and suppose every integer $N\ge1$ satisfies
$$
\left|\sum_{1\le n\le N}\mu(n)\right|\le P N^\beta.
$$
There are real constants $a_0\ge2$ and $C>0$ such that every integer $m\ge2$ and all real $B\ge a\ge a_0$ satisfy
$$
|E_m(a,B)|\le C m^{(2+\beta)/3+\varepsilon}D_{s_m}(a,B),\qquad
s_m=\tfrac12-\tfrac1{m+1}.
$$
Here $E_m$ uses the two signed corrections above. The spectral sums count zeros with analytic multiplicity, and the retained terms satisfy the strict inequality $2n<m+1$.
:::

::: proof
Put $q=m+1$ and $u=\ln x$. For $u\ge q$, the two sides of the integer frequency cutoff $H$ cost $O(Pq^\beta(H+1)^{1+\eta})$ and $O(qH^{\eta-1/2})$, with $0<\eta<1/2$. Set $\gamma=2(1-\beta)/3$ and take $H=\lfloor q^\gamma\rfloor$. Use $H+1\le2q^\gamma$ in the low bins and $H\ge q^\gamma/2$ in the high bins, where the exponent of $H$ is negative. Both powers of $q$ become $(2+\beta)/3+\gamma\eta$. The same cutoff works throughout the far range because it is independent of $u$.

The same prefix estimate controls the near range and the arithmetic tail. The positive gap between $\beta$ and $(2+\beta)/3$ absorbs the factor $1+\ln q$ from the trivial zeros. Choose $\eta$ small enough for the prescribed slack and integrate the density to recover the original endpoint gap. Both sides vanish at $B=a$. The full proof is checked by the Lean kernel.
:::

Under RH the pointwise Möbius prefix estimate permits $\beta=1/2+\delta$ for arbitrarily small $0<\delta<1/2$. For a prescribed final slack $\varepsilon>0$, take $\delta=\min(\varepsilon,1/4)$ and leave $\varepsilon-\delta/3$ for the window estimate. This yields $|E_m(a,B)|\le C m^{5/6+\varepsilon}D_{s_m}(a,B)$ uniformly over the allowed endpoints. Whether the residual attains this order remains open.


::: {.theorem #thm-ch31-prime-window-late-spacing title="A smaller exponent on late signed prime windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusLateSpacing.prime_window_mobius_late_spacing_of_rh"}
Assume RH and fix $0\le d\le1/2$ and $\varepsilon>0$. There are constants $a_0\ge2$ and $C>0$ such that for all integers $m\ge2$ and all real $B\ge a\ge a_0$ with $\ln a\ge(m+1)^{1+d}$,
$$
|E_m(a,B)|\le C m^{3/4-d/2+\varepsilon}D_{s_m}(a,B),\qquad
s_m=\tfrac12-\tfrac1{m+1}.
$$
The two signed corrections retain their signs. The zero sums count analytic multiplicity, with root primitives retained exactly when $2n<m+1$.
:::

::: proof
Write $q=m+1$ and $u=\ln x$. For omitted degrees, the samples $u/n$ are separated by at least $u/q^2$. The factor $e^{-u/q+u/(2n)}$ allows the estimates on unit intervals to be summed geometrically. The local integral of the high-frequency mode contributes $O_\eta(H^{\eta-1/2})$. The phase derivative has bin envelope $O_\eta(\min(q,1+|k|)(1+|k|)^{\eta-1})$, for $0<\eta<1/2$. The square sum of the envelope is $O_\eta(q^{1+2\eta})$, by splitting at $1+|k|=q$. The local sampling estimate therefore gives high-frequency cost $O_\eta((1+q^2/u)H^{\eta-1/2}+q^{1/2+\eta})$.

The signed Möbius prefix gives low-frequency cost $O_\eta(q^{1/2+\eta}(H+1)^{1/2+\eta}+(H+1)^{1+\eta})$. Throughout the integration interval $u\ge q^{1+d}$. Taking $H=\lfloor q^{1/2-d}\rfloor$ bounds both frequency costs by $O_\eta(q^{3/4-d/2+2\eta})$. The arithmetic and trivial-root terms also fit this bound. Integrating on $[\ln a,\ln B]$ supplies $D_{s_m}(a,B)$ and includes $B=a$, when both sides vanish.
:::

At $d=1/2$, the starting condition is $\ln a\ge(m+1)^{3/2}$ and the exponent is $1/2+\varepsilon$. This estimate applies throughout that later range. The least exponent attainable uniformly as the starting point varies remains open.


::: {.theorem #thm-ch31-prime-window-very-late title="The signed residual at very late starting points" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusVeryLate.prime_window_mobius_very_late_of_rh"}
Assume RH. For each $1/2\le d\le1$ and $\varepsilon>0$, there are constants $a_0\ge2$ and $C>0$ such that every integer $m\ge2$ and all real $B\ge a\ge a_0$ with $\ln a\ge(m+1)^{1+d}$ satisfy
$$
|E_m(a,B)|\le C m^{1-d+\varepsilon}D_{s_m}(a,B),
\qquad s_m=\tfrac12-\tfrac1{m+1}.
$$
The original signed corrections and actual zero multiplicities are retained. The root primitives use exactly the degrees $2n<m+1$.
:::

::: proof
Put $q=m+1$. At each logarithmic coordinate $u\ge q^{3/2}$, the arithmetic tail separates into degrees $q$ through $2q-1$ and the remainder after degree $2q-1$. The first range has geometric weight sum $O(1+q^2/u)$. In the remainder, the existing truncation bound gains the factor $e^{-u/(2q)}$ relative to the endpoint rate. Since $q e^{-u/(2q)}\le8$, the normalized arithmetic tail has the same $O(1+q^2/u)$ bound.

The actual root coefficients cost $O((1+\ln q)^2)$ at each omitted degree. Their exponentially damped weights also sum to at most $1+q^2/u$. The trivial roots have an additional factor $e^{-u/q}$ after normalization. Consequently the total log-density cost is $O((1+\ln q)^2(1+q^2/u))$. Over the given window, $1+q^2/u\le2q^{1-d}$. Absorb the logarithms in $\varepsilon$ and integrate over $[\ln a,\ln B]$. Both sides vanish at $B=a$.
:::

At $\ln a\ge(m+1)^2$, the factor in the theorem is $m^\varepsilon$ for every $\varepsilon>0$. The odd-cutoff leading term and the lower bound on a uniform exponent are given below.


::: {.theorem #thm-ch31-prime-window-odd-cutoff title="The first omitted term at an odd cutoff" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusOddCutoff.signed_window_odd_cutoff_expansion"}
Assume RH. There are real constants $a_0\ge2$ and $K>0$ such that the following holds for every integer $m\ge2$ with $q=m+1$ odd and all $B\ge a\ge a_0$. Set $s_m=1/2-1/q$, $\delta_m=1/q-1/(q+1)$, and $W_m=Kq(1+\ln q)^2$.

$$
\left|E_m(a,B)+\frac{\mu(q)q}{(q-1)s_m}D_{s_m}(a,B)\right|
\le W_m D_{s_m+\delta_m}(a,B)\le W_m\frac{s_m+\delta_m}{s_m}a^{-\delta_m}D_{s_m}(a,B).
$$

Here $D_s(a,B)=a^{-s}-B^{-s}$, and $E_m$ uses the two signed corrections in [@thm-ch31-prime-window-mobius]. The spectral sums count zeros with their analytic multiplicities and retain root degrees satisfying $2n<m+1$.
:::

::: proof
When the truncation order increases from $m$ to $q$, the root selection can change only at $2n=q$. Since $q$ is odd, the root terms agree at both orders. The only new arithmetic term has degree $q$ and coefficient $-\mu(q)q/((q-1)s_m)$. Removing that term leaves exactly $E_q(a,B)$.

Apply the all-order estimate to $E_q$. Its endpoint power difference has rate $s_m+\delta_m$. Over the logarithmic interval $[\ln a,\ln B]$ we have $e^{-\delta_m u}\le a^{-\delta_m}$. Using the integral representations of the two power differences gives

$$
D_{s_m+\delta_m}(a,B)\le
\frac{s_m+\delta_m}{s_m}a^{-\delta_m}D_{s_m}(a,B).
$$

The comparison includes $B=a$, when both power differences vanish.
:::

::: {.theorem #thm-ch31-prime-window-no-negative-order title="A lower bound for the order exponent in arbitrarily late windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusOddCutoff.signed_window_no_negative_order_exponent"}
Assume RH. For every $\gamma>0$, every real $K$, every start threshold $A:\mathbb N\to\mathbb R$, and every natural number $N$, there is an integer $M\ge\max(2,N)$. For each $m\ge M$ with $m+1$ prime there is a real $S\ge\max(2,A(m))$ such that for all $B>a\ge S$,

$$
E_m(a,B)>K m^{-\gamma}D_{s_m}(a,B).
$$
:::

::: proof
Choose $M\ge\max(2,N)$ so that $K m^{-\gamma}<1$ for all $m\ge M$. At a prime $q=m+1$, we have $\mu(q)=-1$ and $q/((q-1)s_m)=2q^2/((q-1)(q-2))>2$. Fix that order and raise the start threshold until the normalized expansion error is below $1$. The power difference is positive for every $B>a$, so the signed residual exceeds that power difference. Since primes are unbounded, the lower bound rules out every uniform negative order exponent even at a prescribed positive logarithmic width.
:::

When odd $q$ has a square divisor greater than one, $\mu(q)=0$ and the estimate gives the faster bound $O_m(a^{-\delta_m}D_{s_m})$. For even $q$, increasing the order also admits the spectral term of degree $n=q/2$, which has the same decay rate as the degree-$q$ arithmetic term. The following expansion keeps both contributions.

::: {.theorem #thm-ch31-prime-window-even-cutoff title="Arithmetic and zero terms at an even cutoff" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoff.signed_window_even_cutoff_expansion"}
Assume RH. There are common constants $a_0\ge2$ and $K>0$ such that the following estimate holds for every integer $m\ge2$ with $q=m+1=2r$ and all $B\ge a\ge a_0$. Set $s_m=1/2-1/q$, $\delta_m=1/q-1/(q+1)$, and $W_m=Kq(1+\ln q)^2$. Use the same signed residual $E_m$ and power difference $D_s$. Write $P_r$ for the degree-$r$ root primitive over actual zeta zeros counted with analytic multiplicity. Then

$$
\begin{aligned}
&\left| E_m(a,B)+\frac{\mu(q)q}{(q-1)s_m}D_{s_m}(a,B)
          +\mu(r)\bigl(P_r(B)-P_r(a)\bigr)\right|\\
&\quad\le W_m D_{s_m+\delta_m}(a,B)
 \le W_m\frac{s_m+\delta_m}{s_m}a^{-\delta_m}D_{s_m}(a,B).
\end{aligned}
$$
:::

::: proof
Increasing the order to $q$ adds exactly the arithmetic term of degree $q$. The strict spectral rule changes from $2n<q$ to $2n<q+1$, admitting degree $r$. The corrected residual in the displayed formula is $E_q$ at the same endpoints. The all-order estimate gives the faster decay rate $s_m+\delta_m$. Comparing the two exponential integrals in logarithmic coordinates gives the second inequality, including $B=a$.
:::

::: {.theorem #thm-ch31-prime-window-shrinking-width title="The root spectrum on shrinking logarithmic windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffShrinkingWidth.signed_window_even_cutoff_shrinking_width"}

Assume RH. As in [@thm-ch31-prime-window-even-cutoff], put $q=m+1=2r$ with $m\ge2$, $s=1/2-1/q$, $\delta_m=1/q-1/(q+1)$, and $c_m=\mu(q)q/(ms)$. Define

$$
 F_L(u)=\frac{E_m(e^u,e^{u+L})}{D_s(e^u,e^{u+L})},
 \qquad
 S_r(u)=\frac{1}{s}\operatorname{Re}\sum_k
 a_{r,k}\exp\!\left(\frac{\rho_k-1/2}{r}u\right),
 \qquad a_{r,k}=\frac{-r}{\rho_k(r-\rho_k)}.
$$

The sum includes all actual nontrivial zeros with analytic multiplicity. For every real $u$ and every $L>0$, the normalized root increment is exactly a weighted average of $S_r$:

$$
 \frac{P_r(e^{u+L})-P_r(e^u)}{D_s(e^u,e^{u+L})}
 =\frac{\int_0^L e^{-st}S_r(u+t)\,dt}{\int_0^L e^{-st}\,dt}.
$$

There is a common threshold $U_0>0$. For each admissible cutoff there is a $K_m>0$ such that for every $\varepsilon>0$ one can choose $L_0>0$ with

$$
 \left|F_L(u)+c_m+\mu(r)S_r(u)\right|
 \le \varepsilon+K_m e^{-\delta_m u}
 \qquad (u\ge U_0,\quad 0<L<L_0).
$$
:::

::: proof
In logarithmic coordinates, the root primitive integrates the root density $s e^{-su}S_r(u)$. Write the increment as this integral over $[u,u+L]$ and use $D_s=e^{-su}(1-e^{-sL})$. The normalized mass identity follows from $1-e^{-sL}=s\int_0^L e^{-st}\,dt$.

Under RH, each centered zero mode is uniformly continuous because its exponent is purely imaginary. The coefficient norms are summable, so the finite sums converge uniformly on the real line. This is the same uniform tail control used in the comparison repository's extraction of exponential coefficients. Uniform continuity of $S_r$ makes the weighted average close to $S_r(u)$ with a width threshold independent of $u$. Dividing the even-cutoff expansion by $D_s$ bounds the remaining error by $K_m e^{-\delta_m u}$. [Comparison proof](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L124-L143)
:::

For each fixed admissible cutoff, the approximation error tends uniformly to zero as the width tends to zero and the lower bound on the starting point tends to infinity. The term $K_m e^{-\delta_m u}$ still contributes at a fixed starting point.

::: {.theorem #thm-ch31-prime-window-shrinking-rate title="An explicit width error for the centered spectrum" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffShrinkingRate.signed_window_even_cutoff_shrinking_rate"}

Assume RH and use $F_L$, $c_m$, $\delta_m$, and $S_r$ from [@thm-ch31-prime-window-shrinking-width]. There is a common threshold $U_0>0$. For each admissible cutoff $q=m+1=2r$ with $m\ge2$, there are $C_m,K_m>0$ such that

$$
 \left| F_L(u)+c_m+\mu(r)S_r(u) \right|
 \le C_m L\bigl(1+\log(1/L)\bigr)^2 + K_m e^{-\delta_m u}
 \qquad (u\ge U_0,\quad 0<L\le 1/4).
$$
:::

::: proof
A shift of size at most $L$ changes the phase of an occurrence with ordinate $\gamma$ by a factor whose distance from one is at most $\min(2,|\gamma|L/r)$. For $|\gamma|\le1/L$, the factor $|\gamma|$ cancels one denominator factor in the root coefficient estimate, leaving $L/|\rho|$. Its truncated sum is bounded by a constant times $L(1+\log(1/L))^2$. Above $1/L$, the distance bound of two and the inverse-square tail give a bound proportional to $L(1+\log(1/L))$. These counts include multiplicity and both signs of the ordinate.

The weighted mean value theorem for interval integrals identifies the normalized root increment with $S_r(u+t)$ for some $0\le t\le L$. Apply the same phase estimates to this shift and use the even-cutoff remainder bound. [Pinned weighted mean value theorem](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Integral/IntervalIntegral/MeanValue.lean#L101) · [Zero-count source, Corollary 1.2](https://arxiv.org/pdf/2107.06506v1)
:::

The inequality supplies an explicit upper rate. The optimal width dependence for the signed series remains open.

::: {.theorem #thm-ch31-centered-root-log-cusp title="The logarithmic cusp of the centered root spectrum" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHRootSignalCusp.root_signal_symmetric_cusp"}
Assume RH. For each real $r>1$, put $s=1/2-1/(2r)$ and define $S_r$ by the series in [@thm-ch31-prime-window-shrinking-width]. Here $r$ can be any real number in the stated range, and the series includes every nontrivial zero according to its analytic multiplicity. With Euler's constant $\gamma_{\mathrm{EM}}$, let $c=(\gamma_{\mathrm{EM}}-1+\log(2\pi))/2$. There is a $C_r>0$ such that for every $0<h\le r/2$,

$$
\begin{aligned}
 \biggl|S_r(h)+S_r(-h)-2S_r(0)
 &-\frac{h}{s}\bigl(\log(1/h)+\log r-2c\bigr)\biggr|
 \le C_r h^2.
\end{aligned}
$$
:::

::: proof
Write $\gamma=\operatorname{Im}\rho$ and $w_\rho=(1/4+\gamma^2)^{-1}$. The symmetric difference cancels the sine component of each term and multiplies its cosine coefficient by $2(\cos(\gamma h/r)-1)$. The real part of the root coefficient differs from the reference coefficient $-rw_\rho$ by

$$
\frac{r(r-1)(r-1/2)w_\rho}{(r-1/2)^2+\gamma^2}.
$$

The bound $2|1-\cos x|\le x^2$ controls the correction series by a constant times $h^2$, since $\sum_\rho w_\rho$ is finite. The reference coefficients contribute $-2r(K(h/r)-K(0))/s$, where $K$ is the weighted cosine kernel of the actual zeros. Substituting the expansion of $K$ at the origin gives both coefficients. The argument uses termwise control of exponential modes and their absolutely summable tails. [Exponential-series method](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L109-L143) · [Remainder estimate for the actual cosine kernel](lean:D5/S3/Weil/Mertens/IntegratedExplicit/ActualKernelCusp.cusp_remainder_bound)
:::

The symmetric difference at the origin has leading scale $h\log(1/h)$. First differences at arbitrarily late starts and their optimal uniform modulus require further estimates.

::: {.theorem #thm-ch31-late-root-log-increments title="A lower scale for arbitrarily late forward increments" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHRootLateIncrement.root_signal_late_increment_lower"}
Assume RH. For every real $r>1$ and the full centered spectrum $S_r$ of [@thm-ch31-centered-root-log-cusp], there are constants $d_r>0$ and $0<H_r<1$. For every $0<h<H_r$ and every real $U$, there exists a real $u\ge U$ such that

$$
|S_r(u+h)-S_r(u)|\ge d_r h\log(1/h).
$$
:::

::: proof
The origin cusp gives a positive lower bound of order $h\log(1/h)$ for the symmetric difference. For fixed shifts, the full series is a continuous function of the coordinate phases because the root coefficients have summable absolute values. The actual phase orbit returns arbitrarily late to neighborhoods of its initial phase vector, so the symmetric difference retains a positive fraction of the origin bound at some time $t\ge U+h$. Write that difference as the forward increment from $t$ minus the forward increment from $t-h$. At least one increment has magnitude at least half the transported bound. Both starts are at least $U$. [Actual-phase recurrence](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimePhaseCluster.phaseOrbit_cluster_iff)
:::

The start can depend on the shift and the prescribed threshold. This controls the worst forward increment on every late tail. The matching upper rate for those increments remains open.

::: {.theorem #thm-ch31-root-symmetric-tail-modulus title="The symmetric root-spectrum modulus on each tail" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHRootTailModulus.root_signal_symmetric_tail_modulus"}
Assume RH and use $S_r$, $s$ and $c$ from [@thm-ch31-centered-root-log-cusp]. Fix any real $r>1$. For real $U$ and $0<h\le r/2$, the set of values of $|S_r(u+h)+S_r(u-h)-2S_r(u)|$ for $u\ge U$ is nonempty and bounded above. Write $M_r(U,h)$ for its supremum. There is a $C_r>0$ that works for every such $U,h$ and satisfies

$$
\left|M_r(U,h)-\frac{h}{s}\bigl(\log(1/h)+\log r-2c\bigr)\right|
 \le C_r h^2.
$$
:::

::: proof
The symmetric difference multiplies the mode with ordinate $\gamma$ by $2(\cos(\gamma h/r)-1)$. Take the absolute value of each term. Its root coefficient has norm at most $r/(1/4+\gamma^2)$. The sum of these majorants equals $2r(K(0)-K(h/r))/s$ and bounds every starting point. For the lower bound, recurrence places values arbitrarily close to the signed symmetric difference at zero in each tail. The supremum therefore lies above that origin value. The two bounding expressions have the same logarithmic and linear coefficients, with quadratic errors.
:::

This determines the two terms of the symmetric modulus uniformly over tails. The corresponding sharp upper rate for forward increments remains open.

::: {.theorem #thm-ch31-signed-shrinking-lower title="A lower error scale for arbitrarily late signed shrinking windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSignedShrinkingLower.signed_window_even_cutoff_shrinking_lower"}
Assume RH. Take natural numbers $m,r$ with $m\ge2$, $m+1=2r$, and $\mu(r)\ne0$. Use $F_L$, $c_m$, and $S_r$ from [@thm-ch31-prime-window-shrinking-width]. There is a width threshold $0<H_m<1$ such that for every $0<d<e^{-s}/(8s)$, every $0<L<H_m$, and every real $U$, there is a real $u\ge U$ satisfying

$$
-\mu(r)\bigl(F_L(u)+c_m+\mu(r)S_r(u)\bigr)\ge dL\log(1/L).
$$
:::

::: proof
The imaginary parts of the root coefficients decay by an extra power of the ordinate. Consequently the root-spectrum values on opposite sides of the origin differ by at most a constant times the shift. Combine this estimate with the symmetric cusp in [@thm-ch31-centered-root-log-cusp] to obtain a one-sided logarithmic lower bound. Averaging with the original positive exponential weight preserves the scale $L\log(1/L)$. At a fixed width, absolute summability makes the weighted average and the endpoint value continuous functions of the actual phases. Put $C=e^{-s}/(8s)$ and $T=L\log(1/L)$. The averaged spectral gap at the origin is at least $CT$. For each $d<C$, phase recurrence transfers a level above $(C+d)T/2$ to an arbitrarily late start. Choose the start past the threshold where the normalized arithmetic remainder is smaller than $(C-d)T/2$. Their difference gives the stated signed bound. The full proof is checked by the Lean kernel.
:::

Since $\mu(r)\in\{-1,1\}$, the inequality gives both the sign of the discrepancy and a lower bound for its magnitude. The starting point may depend on both the width and the prescribed threshold. The upper bound in [@thm-ch31-prime-window-shrinking-rate] and this lower bound for the same signed window still differ by a logarithmic factor in the width.

::: {.theorem #thm-ch31-signed-left-limsup title="The sharp left-endpoint error under quarter-phase recurrence" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffLeftLimsup.signed_window_even_cutoff_left_limsup"}
Assume RH. Assume also that the constant phase $i$ on the distinct positive zeta zero ordinates belongs to the product-topology closure of the vectors $(e^{i\gamma t})_{\gamma>0}$ for real $t$. This means that one common time can bring all phases in any prescribed finite list as close to $i$ as desired.

Take natural numbers $m,r$ with $m\ge2$ and $m+1=2r$. Use $s,F_L,c_m,S_r$ from [@thm-ch31-prime-window-shrinking-width]. For every sufficiently small $L>0$, the absolute discrepancy defining the following limsup is bounded on a late tail. The limiting coefficient is
$$
Q_m^{\mathrm{left}}(L)=\limsup_{u\to+\infty}|F_L(u)+c_m+\mu(r)S_r(u)|,
\qquad
\lim_{L\downarrow0}\frac{Q_m^{\mathrm{left}}(L)}{L\log^2(1/L)}
=\frac{|\mu(r)|}{4\pi s}.
$$
:::

::: proof
The change from midpoint to left-endpoint correction subtracts $\mu(r)$ times the forward root increment of length $L/2$. The midpoint discrepancy from [@thm-ch31-signed-midpoint-limsup] has lower order. In the root increment, replacing the coefficient at ordinate $\gamma$ by $-r/(\tfrac14+\gamma^2)$ costs a quantity bounded by a constant times $L$, uniformly over starting phases. At the prescribed phase, conjugate zeros then contribute the same signed sine term. Regrouping the occurrences retains the analytic multiplicity of every zero and identifies the leading sum with $r$ times the positive-ordinate phase slope at displacement $L/(2r)$. The root normalization gives a factor $r/s$ multiplying that slope. Since the slope at $t$ has leading term $t\log^2(1/t)/(2\pi)$, substituting $t=L/(2r)$ yields $L\log^2(2r/L)/(4\pi s)$. A uniform modal upper bound and a cofinal return to the prescribed phase give the two limsup bounds. If $\mu(r)=0$, the corrections at the two sample locations coincide and the late limsup vanishes.
:::

The phase condition applies to a common time on each finite list of ordinates. The proof uses its membership in the closure of the actual orbit to control the full absolutely summable series. Whether RH alone suffices for the same left-endpoint asymptotic remains open.

::: {.theorem #thm-ch31-signed-midpoint-limsup title="The prime-window error with logarithmic midpoint correction" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffMidpoint.signed_window_even_cutoff_midpoint_limsup"}
Assume RH. Take natural numbers $m,r$ with $m\ge2$ and $m+1=2r$. Use $s,F_L,c_m,S_r$ from [@thm-ch31-prime-window-shrinking-width] and $c$ from [@thm-ch31-centered-root-log-cusp]. For each $0<L\le1/4$, define

$$
Q_m(L)=\limsup_{u\to+\infty}
\left| F_L(u)+c_m+\mu(r)S_r(u+L/2)\right|.
$$

The absolute discrepancy is bounded on a sufficiently late tail. There is a constant $C_m>0$ that works for every such width and satisfies

$$
\begin{aligned}
G_r(L)&=\frac{L}{8s}\bigl(\log(1/L)+\log(2r)-2c+\tfrac12\bigr),\\
\left|Q_m(L)-|\mu(r)|G_r(L)\right|
  &\le |\mu(r)|C_m L^2(1+\log(1/L))^2 .
\end{aligned}
$$
:::

::: proof
Pair points at equal distances on either side of the logarithmic midpoint in the flat average. This gives the integral of the symmetric second difference over $[0,L/2]$, divided by $L$. The upper estimate from [@thm-ch31-root-symmetric-tail-modulus] holds at every center. The signed cusp gives the matching lower comparison at center zero. Integrating $h\log(1/h)$ gives the logarithmic and linear terms. The two normalized weights have equal mass, so subtract the midpoint value before applying the first-difference bound to the density perturbation. Absolute summability of the zero modes makes the whole window a continuous readout of the same phase vector. One common late return restores the lower comparison and the normalized arithmetic remainder tends to zero. The full proof is checked by the Lean kernel.
:::

When $\mu(r)=0$, the limsup is zero. For $\mu(r)\ne0$, the late worst-case error has leading order $L\log(1/L)$ with the midpoint correction. Whether the left-endpoint error attains its full leading coefficient is governed by the weighted phase deficit in [@thm-ch31-weighted-phase-limsup].

::: {.theorem #thm-ch31-signed-quadratic-midpoint title="A quadratic remainder for logarithmic midpoint correction" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffQuadraticMidpoint.signed_window_even_cutoff_midpoint_limsup_quadratic"}
Assume RH. Take natural numbers $m,r$ with $m\ge2$ and $m+1=2r$. Use the original signed prime window, the midpoint correction and the quantities $Q_m(L)$ and $G_r(L)$ from [@thm-ch31-signed-midpoint-limsup]. The absolute error is bounded on a sufficiently late tail. There is a constant $C_m>0$ such that for every $0<L\le1/4$,

$$
\left| Q_m(L)-|\mu(r)|G_r(L)\right|
\le |\mu(r)|C_mL^2 .
$$
:::

::: proof
For each frequency $\omega$, pair the modes at distance $h$ on either side of the midpoint. Put $q=1-\cos(\omega h)$. After subtracting the midpoint value, the half-pair multiplier is $-\cosh(sh)q-i\sinh(sh)\sin(\omega h)$. Its squared norm is $q^2+2q\sinh^2(sh)$, so its norm is at most $q+\sinh^2(sh)$. Absolute summability of the full zero coefficients keeps the extra term quadratic after summation. At center zero, the linear bound on the odd difference controls the odd part of the exponential weight. A common phase return transports the lower comparison to arbitrarily late starts, where the normalized arithmetic remainder vanishes in the limsup. The full proof is checked by the Lean kernel.
:::

The quadratic remainder applies to the original exponential weight and includes $\mu(r)=0$. Correction at the left endpoint still depends on a uniform bound for first differences.

::: {.theorem #thm-ch31-weighted-phase-limsup title="A weighted phase criterion for the left-endpoint error" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHWeightedPhaseLimsup.signed_window_even_cutoff_weighted_phase"}
Assume RH. For each distinct positive zeta zero ordinate $\gamma$, let $m_\gamma$ be its analytic multiplicity. For $T$ sufficiently large, put
$$
w_\gamma=\frac{m_\gamma\gamma}{1/4+\gamma^2},\qquad
W(T)=\sum_{0<\gamma\le T}w_\gamma,\qquad
D(T)=1-\frac{\displaystyle\sup_{v\in\mathbb R}\sum_{0<\gamma\le T}w_\gamma\sin(\gamma v)}{W(T)}.
$$

Take natural numbers $m,r$ with $m\ge2$ and $m+1=2r$, and use $s,F_L,c_m,S_r$ from [@thm-ch31-prime-window-shrinking-width]. For every sufficiently small $L>0$ the absolute error $|F_L(u)+c_m+\mu(r)S_r(u)|$ is bounded on a late tail. Write $Q_m^{\mathrm{left}}(L)$ for its limsup as $u\to+\infty$. Then
$$
\frac{Q_m^{\mathrm{left}}(L)}{L\log^2(1/L)}
-\frac{|\mu(r)|}{4\pi s}\bigl(1-D(2r/L)\bigr)\longrightarrow 0
\qquad (L\downarrow0).
$$

For $\mu(r)\ne0$, the normalized limsup tends to $|\mu(r)|/(4\pi s)$ exactly when $D(T)\to0$ as $T\to+\infty$.
:::

::: proof
Set $h=L/2$. Subtracting $\mu(r)(S_r(u+h)-S_r(u))$ from the signed midpoint error gives the signed left-endpoint error. Linearizing the root modes up to $\gamma\le r/h$ and bounding their remaining tail approximates the root increment by $(2h/s)\sum_{0<\gamma\le r/h}w_\gamma\sin(\gamma u/r)$ with an error of order $h\log(1/h)$ uniform in $u$. Oddness makes the supremum of the sine polynomial equal to the supremum of its absolute value. A common phase return recovers values arbitrarily close to that supremum at arbitrarily late starts. The midpoint error has lower order, and $W(T)/\log^2 T\to1/(4\pi)$. Substitution of $T=2r/L$ gives the formula and the equivalence. When $\mu(r)=0$, the two corrections agree and the late limsup is zero for small widths.
:::

The remaining question under RH alone is whether the actual zeros satisfy $D(T)\to0$. At each cutoff, $D(T)$ is the smallest weighted mean of $1-\sin(\gamma v)$ attainable to arbitrary accuracy with one common time $v$.

::: {.theorem #thm-ch31-sparse-zero-phase title="Sparse omissions give the full left-endpoint coefficient" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSparseZeroPhaseAlignment.omittedMass_tendsto_zero D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSparseZeroPhaseAlignment.weightedPhaseDefect_le_omittedMass D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSparseZeroPhaseAlignment.weightedPhaseDefect_tendsto_zero D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHSparseZeroPhaseAlignment.signed_window_even_cutoff_full_coefficient_of_sparse_count"}
Assume RH and use the positive zero ordinates and weights of [@thm-ch31-weighted-phase-limsup]. For a set $S$ of ordinates, define the omitted count $B_S(T)$ and mass $W_{\mathrm{omit},S}(T)$ by summing over $0<\gamma\le T$.

$$
B_S(T)=\sum_{\gamma\notin S}m_\gamma,\qquad
W_{\mathrm{omit},S}(T)=\sum_{\gamma\notin S}\frac{m_\gamma\gamma}{1/4+\gamma^2}.
$$

If $B_S(T)=o(T\log T)$, then $W_{\mathrm{omit},S}(T)=o(\log^2 T)$. The retained coordinates at a cutoff are compatible with the quarter phase when the coefficient sum of every integer relation among them is divisible by $4$. Every compatible cutoff with $W(T)>0$ satisfies

$$
0\le D(T)\le \min\!\left(1,\frac{2W_{\mathrm{omit},S}(T)}{W(T)}\right).
$$

If every sufficiently large cutoff is compatible and $W_{\mathrm{omit},S}(T)=o(\log^2 T)$, then $D(T)\to0$. Take $m\ge2$ with $m+1=2r$. Suppose $\mu(r)=0$ or that $S$ is linearly independent over $\mathbb Q$ and $B_S(T)=o(T\log T)$. Then the absolute left-endpoint error in the weighted phase criterion is bounded on a late $u$-tail for each sufficiently small fixed $L>0$, and

$$
\frac{Q_m^{\mathrm{left}}(L)}{L\log^2(1/L)}\longrightarrow\frac{|\mu(r)|}{4\pi s_m}
\qquad (L\downarrow0).
$$
:::

::: proof
The weight per occurrence of a zero is at most $1/\gamma$. In a dyadic shell $2^k<\gamma\le 2^{k+1}$, the omitted mass is at most $2^{-k}B_S(2^{k+1})$. For any $\varepsilon>0$, all sufficiently late shells satisfy $B_S(2^{k+1})\le\varepsilon\,2^{k+1}\log(2^{k+1})$. After summation and division by $\log^2 T$, the late shells contribute at most a constant times $\varepsilon$. The fixed initial segment contributes a quantity tending to zero.

Compatibility lets the common-time orbit approach the phase with every retained angle equal to $\pi/2$. Every omitted coordinate has sine at least $-1$, so it can cost at most twice its weight. The sine sum is zero at time zero and never exceeds $W(T)$, giving $0\le D(T)\le1$. Rational linear independence leaves only the zero relation and hence gives compatibility at every cutoff. Since $W(T)/\log^2 T\to1/(4\pi)$, the fraction of omitted mass tends to zero and the weighted phase criterion gives the coefficient. If $\mu(r)=0$, the same criterion gives a zero coefficient directly.
:::

Whether the actual zeta zeros contain a rationally independent set satisfying the omitted-count condition remains open.

::: {.theorem #thm-ch31-relation-phase-deficit title="Integer relations bound the weighted phase deficit from below" lean="D5/S3/Fourier/WeightedIntegerRelations.weighted_phase_deficit D5/S3/Fourier/WeightedIntegerRelations.weighted_phase_deficit_disjoint"}
Take a finite set $J$ of real frequencies $\gamma_j$ with positive weights $w_j$. Put $W=\sum_{j\in J}w_j$. When $W>0$, define the deficit $D$ for this finite sine sum as in [@thm-ch31-weighted-phase-limsup]. Let $A$ index a finite family of integer relations, with $\sum_{j\in J}k_{aj}\gamma_j=0$ for each row. Write $\delta_a=|1-i^{\sum_{j\in J}k_{aj}}|$. For nonnegative multipliers $\lambda_a$, if $\sum_{j\in J}(\sum_{a\in A}\lambda_a|k_{aj}|)^2/w_j>0$, then $J$ is nonempty and $W>0$. In this case,

$$
D\ge
\frac{(\sum_{a\in A}\lambda_a\delta_a)^2}
{2W\sum_{j\in J}(\sum_{a\in A}\lambda_a|k_{aj}|)^2/w_j}.
$$

If $W>0$ and all rows are nonzero with pairwise disjoint supports,

$$
D\ge \frac{1}{2W}\sum_{a\in A}
\frac{\delta_a^2}{\sum_{j\in J}k_{aj}^2/w_j}.
$$
:::

::: proof
At any common time $v$, the product of unit phases specified by an integer relation equals $1$. Replacing every phase by $i$ gives $i^{\sum_j k_{aj}}$. Telescoping the difference of products and using $|z^k-i^k|\le |k|\,|z-i|$ gives $\delta_a\le\sum_j |k_{aj}|\,|e^{i\gamma_jv}-i|$. Sum with the multipliers $\lambda_a$, then apply weighted Cauchy–Schwarz and $|e^{i\gamma_jv}-i|^2=2(1-\sin(\gamma_jv))$. Take the supremum in $v$. For disjoint supports each column square has no cross terms. Choose $\lambda_a=\delta_a/(\sum_j k_{aj}^2/w_j)$. If all $\delta_a$ vanish, the second bound follows from $D\ge0$.
:::

::: {.corollary #cor-ch31-relation-left-limsup title="A positive phase deficit lowers the left-endpoint coefficient" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHWeightedRelationLimsup.signed_window_limsup_le_of_eventually_disjoint_relations"}
Use the RH hypothesis and actual zero weights of [@thm-ch31-weighted-phase-limsup], and suppose $\mu(r)\ne0$. If there exists $\varepsilon>0$ such that, for every sufficiently large $T$, there is a family of nonzero integer relations with disjoint supports for which the second bound in [@thm-ch31-relation-phase-deficit] is at least $\varepsilon$, then

$$
\limsup_{L\downarrow0}
\frac{Q_m^{\mathrm{left}}(L)}{L\log^2(1/L)}
\le \frac{|\mu(r)|}{4\pi s}(1-\varepsilon)
< \frac{|\mu(r)|}{4\pi s}.
$$
:::

::: proof
At $T=2r/L$ use $D(T)\ge\varepsilon$ in the moving-coefficient formula and pass to the upper limit as its remainder tends to zero.
:::

Whether the actual zeta zeros admit a family giving this positive lower bound remains open. A fixed incompatible relation supported at finite height gives a lower bound that tends to zero as $W(T)$ grows.

::: {.theorem #thm-ch31-phase-relation-lattice title="The complete relation lattice controls the phase deficit" lean="D5/S3/Fourier/WeightedPhaseRelationLattice.weighted_phase_deficit_bounds"}
Take finitely many real frequencies $\gamma_j$ and positive weights $w_j$ with total weight $W=\sum_j w_j>0$. Define the deficit $D$ as in [@thm-ch31-weighted-phase-limsup]. Let $K$ be an integer matrix with real-linearly independent rows whose integer span equals the lattice of vectors $k$ satisfying $\sum_j k_j\gamma_j=0$. Write $M=\operatorname{diag}(w_j)$ and $G=KM^{-1}K^{\mathsf{T}}$. For each integer vector $z$, put $b(z)=2\pi z-(\pi/2)K\mathbf{1}$, where $\mathbf{1}$ is the all-ones vector. Define

$$
E=\inf_z b(z)^{\mathsf{T}}G^{-1}b(z).
$$

Then

$$
\frac{2E}{\pi^2W}\le D\le\frac{E}{2W}.
$$

When $K$ has no rows, $E=0$. Also, $D=0$ if and only if some integer vector $z$ satisfies $b(z)=0$, or equivalently, every row sum of $K$ is divisible by $4$.
:::

::: proof
The closure of the common-time orbit is exactly the set of phases on which every integer relation has character value $1$. For any real $a$, the times $t\ge a$ and the times $t>a$ each give the same closure. Write each angle as $\pi/2+x_j$. The resulting phase belongs to that closure exactly when $Kx=b(z)$ for some integer vector $z$. On each such affine set, $x_0=M^{-1}K^{\mathsf{T}}G^{-1}b(z)$ attains the minimum $b(z)^{\mathsf{T}}G^{-1}b(z)$ of the weighted square $x^{\mathsf{T}}Mx$. Since $K(x-x_0)=0$, the cross term in that square vanishes.

The weighted phase cost is $\sum_j w_j(1-\cos x_j)$. Applying $1-\cos x\le x^2/2$ to each minimizing lift $x_0$ and taking the infimum over $z$ gives the upper bound. Every admissible phase also has angle offsets satisfying $|x_j|\le\pi$. On these offsets $1-\cos x_j\ge 2x_j^2/\pi^2$, and the weighted square is at least $E$. This gives the lower bound. By continuity the phase cost has the same infimum on the orbit and its closure.

The orbit closure is compact, so a phase of minimum cost exists. If $D=0$, the positive weights and the cosine lower bound force every angle offset of this phase to be zero. The congruence $Kx=b(z)$ gives $b(z)=0$. Conversely, $b(z)=0$ makes the zero offset feasible, giving a phase of zero cost.
:::

Assume RH. For the actual zero cutoffs in [@thm-ch31-weighted-phase-limsup], compute $E(T)$ with the analytic multiplicity weights and a full relation matrix satisfying the theorem's hypotheses. The two constants are uniform across cutoffs, so $D(T)\to0$ is equivalent to $E(T)/W(T)\to0$. Whether this normalized lattice distance tends to zero for the actual zeta zeros remains open.

::: {.theorem #thm-ch31-short-relation-deletion title="Short integer relations control the weight omitted for phase compatibility" lean="D5/S3/Fourier/ShortPhaseRelations.weighted_deletion_bounds"}
Take finitely many real frequencies $\gamma_j$ with nonnegative weights $w_j$ of total weight $W>0$. A subset is compatible if the coefficient sum of every integer relation among its frequencies is divisible by $4$. Let $P$ be the least fraction of total weight that must be omitted to leave a compatible subset. For a set of times $\mathcal T$, put

$$
D_{\mathcal T}=1-\sup_{v\in\mathcal T}\frac{\sum_j w_j\sin(\gamma_jv)}{W}.
$$

Suppose $\mathcal T$ is nonempty, $H>0$, and every incompatible subset contains an incompatible integer relation with coefficient $\ell^1$ norm at most $H$. Then $P/H^2\le D_{\mathcal T}$. If $\mathcal T$ contains an upper ray, then $D_{\mathcal T}\le2P$.
:::

::: proof
Fix a common time. If a relation $\sum_j k_j\gamma_j=0$ has coefficient sum nonzero modulo $4$, its unit-circle character is $1$ at the actual phases and $i^{\sum_j k_j}$ at the quarter phase. The squared chord distance between these values is at least $2$. A finite product changes by at most the sum of the coordinate chord distances weighted by $|k_j|$, and each squared coordinate distance equals $2(1-\sin(\gamma_jv))$. Thus the coordinates of loss strictly below $1/H^2$ form a compatible subset. Its complement weighs at least $PW$, and every omitted coordinate has loss at least $1/H^2$. Taking the infimum over common times gives the lower bound.

On a compatible subset of minimum omitted weight, the orbit closure contains the point with retained phases all equal to $\pi/2$. A time set containing an upper ray allows arbitrarily close approaches to that point. Each omitted coordinate costs at most twice its weight, giving the upper bound.
:::

::: {.theorem #thm-ch31-consecutive-phase-separation title="Consecutive integer frequencies give the inverse-square scale" lean="D5/S3/Fourier/ShortPhaseRelations.consecutive_pair_separation"}
For any natural $n$, take frequencies $(n,n+1)$ with equal positive weights. Then $P=1/2$, and every incompatible subset contains an incompatible relation of coefficient $\ell^1$ norm at most $H=2n+1$. Every nonempty $\mathcal T$ satisfies $1/(H^2+1)\le D_{\mathcal T}$. If $\mathcal T$ contains an upper ray, then

$$
D_{\mathcal T}\le1-\cos\!\left(\frac{\pi}{2H}\right)\le\frac{\pi^2}{8H^2}.
$$

In the upper-ray case, $n=0$ gives $D_{\mathcal T}=1/2$ exactly.
:::

::: proof
For $n>0$, the relation $(n+1,-n)$ has coefficient sum $1$, and both singletons are compatible. For $n=0$, the zero frequency has an incompatible length-one relation and frequency $1$ can be retained. In both cases one coordinate must be omitted and one suffices. In the single-row bound of [@thm-ch31-relation-phase-deficit], the relation $(n+1,-n)$ gives the denominator $H^2+1=2((n+1)^2+n^2)$ after the equal weights cancel.

At time $\pi/H$, the two angles are $\pi/2\pm\pi/(2H)$. Adding integer multiples of $2\pi$ puts this time in any upper ray while preserving both sine values. For $n=0$, the frequency-one term is the only nonzero sine term, and it reaches $1$ on every upper ray. The normalized score therefore has supremum $1/2$.
:::

For each fixed finite system there are finitely many subsets, so one can choose a witness per incompatible subset and bound their coefficient norms jointly. For the actual zeta ordinates, the open question is how this bound grows with the cutoff.

::: {.theorem #thm-ch31-aggregate-phase-obstructions title="Combining phase obstructions across coefficient lengths" lean="D5/S3/Fourier/PhaseObstructionLengths.omissionFraction_isLeast D5/S3/Fourier/PhaseObstructionLengths.simultaneous_bound D5/S3/Fourier/PhaseObstructionLengths.aggregate_bounds"}
For finitely many real frequencies, let $P_h$ be the minimum fraction of weight omitted so that every integer relation on the retained coordinates with coefficient $\ell^1$ norm at most $h$ has coefficient sum divisible by $4$. Here $h$ is a nonnegative integer. A retained subset attains this minimum. For the phase estimates take nonnegative weights with total weight $W$. Write $A(v)$ for the weighted sine average at a common time $v$, with denominator $W$. When $W=0$, both the average and the omitted fraction are zero by convention. For a set of times $\mathcal T$, put $D_{\mathcal T}=1-\sup_{v\in\mathcal T}A(v)$, with $D_{\varnothing}=1$.

Write

$$
S_N=\sum_{h=1}^{N}\left(\frac1{h^2}-\frac1{(h+1)^2}\right)P_h.
$$

For every common time $v$ and natural $N$, one has $S_N+P_{N+1}/(N+1)^2\le1-A(v)$. The limit $L=\lim_{N\to\infty}S_N$ exists and satisfies

$$
\sup_{h\ge1}\frac{P_h}{h^2}\le L\le D_{\mathcal T},
\qquad
\frac{P_{N+1}}{(N+1)^2}\le L-S_N\le\frac1{(N+1)^2}.
$$
:::

::: proof
Fix a common time $v$. Each incompatible relation of length at most $h$ forces some coordinate in its support to have loss $1-\sin(\gamma_jv)$ of at least $h^{-2}$. Thus the coordinates with loss at least $h^{-2}$ carry a fraction of weight at least $P_h$. For each coordinate, sum the increments for the thresholds at or below its loss. These increments telescope, and their sum with the final threshold term is at most the coordinate's loss. Summing over coordinates with their weights gives the estimate at the same time.

The terms are nonnegative and the partial sums are bounded, so the limit exists. The fractions $P_h$ are nondecreasing and bounded above by $1$. The increments starting at $N+1$ sum to $(N+1)^{-2}$. Bounding that tail with the endpoint fractions gives the remainder estimates and the comparison with every single length.
:::

::: {.theorem #thm-ch31-aggregate-phase-example title="Combining lengths gives a strictly stronger bound for three frequencies" lean="D5/S3/Fourier/PhaseObstructionLengths.strict_three_frequency_example"}
Take frequencies $(0,1,2)$ and weights $(1/2,1/4,1/4)$. Then $P_1=P_2=1/2$ and $P_h=3/4$ for every $h\ge3$. The strongest single-length bound is $1/2$, while $L=19/36$. For $N\ge2$,

$$
S_N=\frac{19}{36}-\frac{3}{4(N+1)^2}.
$$

The fifth partial sum $S_5=73/144$ is the first to exceed $1/2$.
:::

::: proof
The length-one relation at frequency zero forces omission of that coordinate with weight $1/2$. Every relation on the remaining frequencies $1,2$ is an integer multiple of $(2,-1)$. At length three, one of the two remaining coordinates must also be omitted, adding $1/4$. Substitute these fractions and telescope to obtain the partial sums and the limit.
:::

Applying the estimate to actual zeta cutoffs still requires information about which integer relations hold and their supports.

::: {.theorem #thm-ch31-exact-fourth-root-gaps title="Fourth-root chord distances bound the phase deficit" lean="D5/S3/Fourier/ExactFourthRootGaps.supportMaximum_zero_or_attained D5/S3/Fourier/ExactFourthRootGaps.breakpoint_partition D5/S3/Fourier/ExactFourthRootGaps.finite_step_integral D5/S3/Fourier/ExactFourthRootGaps.integrated_Q_le_deficit D5/S3/Fourier/ExactFourthRootGaps.length_series_le_integral"}
For a finite real frequency system, an integer relation $k$ is incompatible if its coefficient sum is nonzero modulo $4$. Define

$$
\tau(k)=\frac{|1-i^{\sum_j k_j}|^2}{2\left(\sum_j|k_j|\right)^2}.
$$

For $u>0$, let $Q(u)$ be the least fraction of weight that must be omitted to meet the support of every incompatible relation with $\tau(k)\ge u$. On each support with an incompatible relation, $\tau$ attains a positive maximum over all incompatible relations with that support. Assign maximum zero to the other supports. The support maxima together with $0$ and $2$ give a finite partition of $(0,2]$ into intervals $(a,b]$ with $Q=Q(b)$ on each interval. The integral is the finite sum $\sum_{(a,b]}(b-a)Q(b)$.

Use nonnegative weights. When their total is zero, the normalized averages and omitted fractions are zero. For any time set $\mathcal T$, the coefficient-length series $L$ and phase deficit satisfy

$$
L\le\int_0^2 Q(u)\,du\le D_{\mathcal T}.
$$
:::

::: proof
On a fixed support and within a residue class of the coefficient sum modulo $4$, the numerator is constant. Choose a relation of least length for each occupied residue class, then take the largest threshold among these choices. There are finitely many supports, so the constraints on the omitted subset change only at finitely many breakpoints. The constraint at the breakpoint still applies, giving right-closed intervals.

Fix a common time $v$. The character-product chord estimate forces a coordinate loss $1-\sin(\gamma_jv)$ of at least $\tau(k)$ on the support of each incompatible relation. The coordinates of loss at least $u$ therefore give an admissible omitted set. Integrating its weight fraction bounds the integral of $Q$ by the average loss at that time. Every incompatible relation of length at most $h$ has $\tau(k)\ge h^{-2}$, so $Q(u)\ge P_h$ on $(1/(h+1)^2,1/h^2]$. Integrating over these intervals and passing to the limit gives the other inequality. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-exact-fourth-root-pair title="The exact chord improves the bound for frequencies one and three" lean="D5/S3/Fourier/ExactFourthRootGaps.pair_exact_Q D5/S3/Fourier/ExactFourthRootGaps.pair_strict"}
Take frequencies $(1,3)$ and equal positive weights. Then $Q(u)=1/2$ for $0<u\le1/8$, and $Q(u)=0$ for $u>1/8$. The integral is $1/16$, exceeding the coefficient-length series value $1/32$.
:::

::: proof
Every relation is an integer multiple of $(3,-1)$. The length-four relation has coefficient sum $2$, squared chord distance $4$, and threshold $1/8$. Every incompatible relation uses both coordinates, has length at least $4$, and has threshold at most $1/8$. Omitting either coordinate suffices. The length-only omission fraction is $1/2$ from $h=4$ onwards, giving the tail sum $(1/2)/4^2=1/32$. The full proof is checked by the Lean kernel.
:::

For actual zeta cutoffs, the incompatible relations and their supports still require independent determination.

::: {.theorem #thm-ch31-signed-phase-margin title="The signed contribution of resonant modes" lean="D5/S3/Fourier/WeightedPhaseRecurrence.weighted_phase_recurrence_of_margin"}
Let $J$ be finite. Take real frequencies $\gamma_j$, target angles $\theta_j$, nonnegative weights $p_j$ summing to one, an integer $N>0$, and $\varepsilon>1/N$. For independent phase variables $x_j$, denote by $c_k$ the Fourier coefficients of

$$
\left(\varepsilon-\sum_{j\in J}p_j(1-\cos x_j)\right)\prod_{j\in J}F_N(x_j),
\qquad F_N(x)=\frac{1}{N}\left|\sum_{\ell=0}^{N-1}e^{i\ell x}\right|^2.
$$

The coefficients are nonnegative and supported on $|k_j|\le N$. Write $\xi(k)=\sum_j k_j\gamma_j$ and $b(k)=\sum_j k_j\theta_j$. For $R>0$ put

$$
\begin{aligned}
A&=\sum_{\xi(k)=0} c_k\cos b(k),\\
B(R)&=\sum_{\xi(k)\ne0}\frac{2c_k|\sin(R\xi(k)/2)|}{|\xi(k)|},\qquad M(R)=RA-B(R).
\end{aligned}
$$

If $M(R)>0$, then every interval $[a,a+R]$ contains a time $t$ satisfying

$$
\sum_j p_j(1-\cos(\gamma_jt-\theta_j))\le\varepsilon-\frac{M(R)}{RN^{|J|}}.
$$
:::

::: proof
The Fejér identity $(1-\cos x)F_N(x)=(1-\cos(Nx))/N$ reduces the expansion to the product of triangular Fourier coefficients and terms that replace one factor by $F_N(x)-1+\cos(Nx)$. The replacement removes its constant mode and has nonnegative coefficients. At $x_j=\gamma_jt-\theta_j$, the zero frequencies contribute exactly $RA$ to the integral. Integrating each other cosine over the window gives a term whose magnitude is bounded by its contribution to $B(R)$. Thus the maximum of the loss-weighted product on the interval is at least $M(R)/R$. The product of Fejér factors lies between zero and $N^{|J|}$, giving the stated loss at a maximizer. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-finite-phase-recurrence title="Weighted phase recurrence within a finite interval" lean="D5/S3/Fourier/WeightedPhaseRecurrence.weighted_phase_recurrence"}
Let $J$ be finite, with real frequencies $\gamma_j$, target angles $\theta_j$ and nonnegative weights $p_j$ summing to one. Put $\xi(k)=\sum_{j\in J}k_j\gamma_j$ and $b(k)=\sum_{j\in J}k_j\theta_j$. Fix a positive integer $N$ and a number $\delta>0$. For each integer vector satisfying $|k_j|\le N$, assume that $\cos b(k)=1$ if $\xi(k)=0$, and that $|\xi(k)|\ge\delta$ otherwise.

If $\varepsilon>1/N$ and $R$ satisfy

$$
R\delta(\varepsilon-1/N)>2\bigl(\varepsilon N^{|J|}-(\varepsilon-1/N)\bigr),
$$

then every interval $[a,a+R]$ contains a time $t$ for which $\sum_j p_j(1-\cos(\gamma_jt-\theta_j))<\varepsilon$.
:::

::: proof
The Fejér kernel $F_N(x)=|\sum_{r=0}^{N-1}e^{irx}|^2/N$ has nonnegative Fourier coefficients with total mass $N$. Its constant coefficient is $1$. The identity $(1-\cos x)F_N(x)=(1-\cos(Nx))/N$ yields a nonnegative-coefficient cosine expansion of the Fejér product multiplied by the difference between $\varepsilon$ and the weighted loss. Its total coefficient mass is $\varepsilon N^{|J|}$ and the coefficient at the zero vector is $\varepsilon-1/N$. Zero-frequency terms contribute nonnegatively, and each other cosine has integral of magnitude at most $2/\delta$ over the entire interval. The assumed inequality makes the integral of the product positive. At a point where the product is positive, the loss is below $\varepsilon$. The full proof is checked by the Lean kernel.
:::

For the quarter phase, set $\theta_j=\pi/2$. For an actual zeta cutoff with positive harmonic mass, take $p_j$ proportional to the analytic-multiplicity weights and $\gamma_j$ equal to the rescaled ordinates. The estimate is conditional on the finite-band assumptions for that cutoff. The nonzero frequency separation is a quantitative input distinct from the phase congruences for exact relations. [Bohr–Jessen's Fejér argument](https://arxiv.org/html/2411.14221#S4) · [Finite exponential averages in the RH repository](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L62)

::: {.theorem #thm-ch31-prime-window-even-cesaro title="Fixed-width logarithmic averages recover the arithmetic coefficient" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoff.signed_window_even_cutoff_cesaro"}
Assume RH. There is a common $U_0>0$ such that for every integer $m\ge2$ with $q=m+1=2r$ there is a constant $C>0$ that works for every logarithmic width $L>0$. For all $U\ge U_0$ and $T>0$ the function

$$
F(u)=\frac{E_m(e^u,e^{u+L})}{D_{s_m}(e^u,e^{u+L})}
$$

is Lebesgue integrable on $[U,U+T]$ and satisfies

$$
\left|\frac1T\int_U^{U+T}F(u)\,du+\frac{\mu(q)q}{(q-1)s_m}\right|\le\frac{C}{T}.
$$
:::

::: proof
The denominator is $e^{-s_m u}(1-e^{-s_m L})>0$. Under RH the normalized increment of the degree-$r$ primitive is an absolutely summable series with frequencies $\operatorname{Im}(\rho)/r$. The endpoint terms use the same zero, with a factor determined by the fixed width. The verified lower bound on zero heights bounds every exponential integral by a common constant. Termwise integration gives a bounded primitive. Subtracting the shifted integrals leaves two boundary intervals of length $L$. The bound $e^{-s_m L}L/(1-e^{-s_m L})\le 1/s_m$ gives a spectral integral bound independent of $U,T,L$. The normalized $E_q$ decays as $e^{-\delta_m u}$ and has an integral bound independent of $U,T$ as well. Dividing the two bounds by $T$ leaves the arithmetic constant $-\mu(q)q/((q-1)s_m)$.
:::

For squareful $q$ the arithmetic mean vanishes. The degree-$r$ spectral term depends on $\mu(r)$ and can still contribute at individual windows. The error constant can depend on the order $m$.

::: {.theorem #thm-ch31-prime-window-even-fourier title="Fourier coefficients recover the zero frequencies and multiplicities" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffFourier.signed_window_even_cutoff_fourier"}
Assume RH. Use $q=m+1=2r$ with $m\ge2$ and fix a logarithmic width $L>0$. Use the same $s=s_m$ and normalized residual $F$ as in [@thm-ch31-prime-window-even-cesaro]. For a nontrivial zero $\rho$, put $\omega_\rho=\operatorname{Im}(\rho)/r$ and define

$$
b_{r,L}(\rho)=
\frac{2r^2}{\rho(r-\rho)(r-2\rho)}
\frac{e^{(-s+i\omega_\rho)L}-1}{1-e^{-sL}}.
$$

Let $A(0)=-\mu(q)q/((q-1)s)$. For $\omega\ne0$, define

$$
A(\omega)=-\mu(r)\sum_{k:\,\omega_{\rho_k}=\omega} b_{r,L}(\rho_k),
$$

where $\rho_k$ lists the actual nontrivial zeros with analytic multiplicity. There is a common $U_0>0$ and, for every fixed $m,L,\omega$, a constant $C>0$ such that for all $U\ge U_0$ and $T>0$, the modulated residual is Lebesgue integrable on $[U,U+T]$ and

$$
\left|\frac{1}{T}\int_U^{U+T} F(u)e^{-i\omega u}\,du-A(\omega)\right|
\le \frac{C}{T}.
$$

For every nontrivial zero $\rho$ with analytic multiplicity $n_\rho$, we have $A(\omega_\rho)=-\mu(r)n_\rho b_{r,L}(\rho)$ and $b_{r,L}(\rho)\ne0$.
:::

::: proof
In the even-cutoff expansion, dividing by the power gap gives an arithmetic constant, the normalized root-primitive increment, and a remainder bounded by a constant times $e^{-\delta_m u}$. The normalized increment has an absolutely summable exponential expansion. Conjugation pairs the actual zero occurrences, so this expansion is real. Its coefficient at each occurrence includes the change between the two endpoints, which gives the width factor in $b_{r,L}$.

Multiplication by $e^{-i\omega u}$ shifts each frequency by $-\omega$. Each matching occurrence then contributes its coefficient times $T$. The zeta zero set is closed and discrete. Deleting the point $1/2+ir\omega$ leaves a closed set at positive distance from that point. Under RH this gives positive separation from all nonmatching frequencies. Thus each nonmatching exponential has an integral of modulus at most twice the reciprocal of the separation, uniformly in $U,T$. Absolute summability gives a uniform bound for their combined integral. The exponential remainder also has a bounded integral. At frequency zero no zero occurrence matches, and at a nonzero frequency the arithmetic constant has a bounded oscillatory integral. The single-frequency bound and modulation follow the frequency test in the comparison repository. [Frequency test](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L62) · [Coefficient extraction](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L109-L143)

Under RH, a given ordinate identifies a single point on the critical line. The matching occurrences contribute the same factor exactly $n_\rho$ times. The exponential in the numerator of the width factor has modulus $e^{-sL}<1$, and all denominators are nonzero.
:::

If $\mu(r)\ne0$, a nonzero tested frequency has a nonzero coefficient exactly when $1/2+ir\omega$ is an actual zero. In that case division by $-\mu(r)b_{r,L}(1/2+ir\omega)$ gives its analytic multiplicity. For squareful $r$, all nonzero-frequency coefficients vanish. The error estimate allows dependence on the tested frequency and the fixed width. The bound uniform over all positive widths at frequency zero is [@thm-ch31-prime-window-even-cesaro].

::: {.theorem #thm-ch31-prime-window-fourier-uniform-width title="Fourier recovery is uniform over positive window widths" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffUniformWidth.signed_window_even_cutoff_fourier_uniform_width"}
Assume RH. Use the same even cutoff, normalized residual $F$, and width-dependent target $A$ as in [@thm-ch31-prime-window-even-fourier]. There is a common threshold $U_0>0$. For each admissible order $m$ and each real tested frequency $\omega$, there is a $C>0$ such that for every $L>0$, $U\ge U_0$ and $T>0$, the modulated residual is Lebesgue integrable on $[U,U+T]$ and

$$
\left|\frac{1}{T}\int_U^{U+T}F(u)e^{-i\omega u}\,du-A(\omega)\right|
\le \frac{C}{T}.
$$

At every positive width the zero-frequency coefficient equals $-\mu(q)q/((q-1)s)$. For each actual nontrivial zero $\rho$ the coefficient at $\omega_\rho$ equals $-\mu(r)n_\rho b_{r,L}(\rho)$, with $b_{r,L}(\rho)\ne0$.
:::

::: proof
For a mode $\lambda$, put $t=e^{-sL}$. Split $te^{i\lambda L}-1$ into $t(e^{i\lambda L}-1)-(1-t)$. The estimate $|e^{i\lambda L}-1|\le|\lambda|L$ and $tL/(1-t)\le 1/s$ give

$$
\left|\frac{e^{(-s+i\lambda)L}-1}{1-e^{-sL}}\right|\le 1+\frac{|\lambda|}{s}.
$$

The root primitive divides each coefficient by its complex exponent. For an occurrence $\rho_k$, $\lambda=\operatorname{Im}(\rho_k)/r$ is the imaginary part of that exponent, so $|\lambda|$ is bounded by the exponent's modulus. The new factor of $|\lambda|$ cancels against the inverse exponent in the norm estimate. The resulting coefficient majorant is summable and independent of $L$. The Fourier error uses the sum of these norms multiplied by the reciprocal of the separation from the other frequencies. The arithmetic and remainder bounds already allow every positive $L$. The identities for the coefficients follow from [@thm-ch31-prime-window-even-fourier].
:::

The error constant can depend on $\omega$. The coefficient being recovered still depends on the width at nonzero frequencies.

::: {.theorem #thm-ch31-prime-window-detuned-fourier title="The finite-time response near a tested frequency" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimePower/SublinearOrder/RHMobiusEvenCutoffFourierResolution.signed_window_even_cutoff_detuned_fourier"}
Assume RH. Use the even cutoff, normalized signed residual $F_L$, and coefficient $A_L(\omega)$ from [@thm-ch31-prime-window-fourier-uniform-width], with the subscript recording the width. Write $K(v)=\int_0^1 e^{-ivt}\,dt$. There is a common threshold $U_0>0$. For each admissible cutoff $m$ and real reference frequency $\omega$, there is $C>0$ such that for every $L>0$, $U\ge U_0$, $T>0$, $R\ge0$, and real $|v|\le R$, the integrand below is Lebesgue integrable and

$$
\left|\frac{1}{T}\int_U^{U+T}F_L(u)e^{-i\omega u}e^{-iv(u-U)/T}\,du
-A_L(\omega)K(v)\right|\le\frac{C(1+R)}{T}.
$$

For each positive width, $A_L(0)=-\mu(q)q/((q-1)s)$. At a nontrivial zero $\rho$ of analytic multiplicity $n_\rho$, $A_L(\omega_\rho)=-\mu(r)n_\rho b_{r,L}(\rho)$, with $b_{r,L}(\rho)\ne0$.
:::

::: proof
The uniform-width estimate bounds the primitive $\int_U^x(F_L(u)e^{-i\omega u}-A_L(\omega))\,du$ by the same constant on every prefix of the averaging interval. Apply integration by parts to the real and imaginary coordinate products against the extra phase. Its modulus is one and its derivative has modulus $|v|/T$, so the endpoint contribution is bounded independently of $T$, and the derivative contributes at most a constant times $|v|$. Divide by $T$. The substitution $u=U+Tt$ gives the response $K(v)$ for the constant coefficient, the same exponential average used in the single-frequency test. [Exponential average](https://github.com/the-omega-institute/riemann-hypothesis/blob/b8864ecd5798c6030a03d756fab95f0b89a12754/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/ExpSumCoeffEqZeroOfVanishing.lean#L32-L62)
:::

The extra phase corresponds to the frequency $\omega+v/T$, with the phase correction $e^{ivU/T}$ referencing the offset to the left endpoint. For $v\ne0$, $K(v)=e^{-iv/2}\sin(v/2)/(v/2)$, with $K(0)=1$. The bound gives convergence to $A_L(\omega)K(v)$ uniformly in bounded offsets $v$, positive widths, and late starts. The constant can depend on the reference frequency.
