# 31.1.3.3 Critical Mangoldt gaps and character windows {#sec-ch34-s28-s03-s03-mangoldt-and-characters}

::: {.theorem #thm-ch31-prime-window-rh title="Small prime-tail windows and the Riemann hypothesis" lean="D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.rh_iff_frequently_small_prime_windows"}
Fix a real $b>1$. The Riemann hypothesis holds if and only if for every $\eta>0$ and every real $R\ge2$ there exists a real $Y\ge R$ such that $A_{\vartheta,b}(Y)\le Y^\eta$.
:::

::: proof
Under RH, $|U(x)|/\sqrt{x}$ is bounded for all sufficiently large $x$. Integrating this bound and the prime-power correction over $[Y,Y^b]$ gives $A_{\vartheta,b}(Y)\le C_b\ln Y$. Thus every sufficiently large $Y$ satisfies the required power bound.

Conversely, suppose $\zeta(\rho)=0$ with $\beta=\operatorname{Re}\rho>1/2$. For every $\varepsilon>0$, all sufficiently large $Y$ satisfy $A_{\vartheta,b}(Y)\ge Y^{b(\beta-1/2)-\varepsilon}$. Fix $1<h<b$ and a small $0<\delta<\beta-1/2$, then choose $\sigma$ large enough to make both Gamma tail decay rates positive. Two disks of the same radius separate the pole contribution from the error. The complex center $p$ lies at distance $d<\sigma-\beta+\delta$ from the isolated pole, where $\sigma=\operatorname{Re}p$. This pole can come from a different zero. The zero-free disk at the real center gives a Cauchy error bound. Taking the derivative order $k=\lfloor\sigma h\ln Y\rfloor$ puts the peak of the Gamma kernel near $h\ln Y$. After normalization by $d^k$, the contribution from outside the window is $O((d/\sigma)^k)$ and tends to zero as $k$ grows. The growth rate left inside is $h\sigma\ln((\sigma-1/2)/d)>h(\beta-1/2-\delta)$. Taking $h$ close enough to $b$ and $\delta$ small enough keeps the exponent loss below $\varepsilon$. [Window mass forced by an off-line zero](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeWindowPoleGrowth.off_line_zero_forces_window_mass)

Take $\varepsilon=\eta=b(\beta-1/2)/3$. The lower bound becomes $Y^{2\eta}$, in contradiction with $A_{\vartheta,b}(Y)\le Y^\eta$ on arbitrarily late windows. This excludes zeros to the right of the critical line. Reflection of the nontrivial zeros across that line gives RH. The full proof is checked by the Lean kernel.
:::

For the complete Mangoldt remainder $U(x)=-xQ(x)$, one can bound the value at each real point directly. Both criteria below use a one-sided upper bound. For fixed $b>1$ the logarithmic length of the window is $(b-1)\ln Y$, which grows with its starting point $Y$.

::: {.theorem #thm-ch31-mangoldt-pointwise-power-window title="A pointwise power-window criterion for the complete Mangoldt remainder" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtPointwiseWindows.rh_iff_pointwise_power_windows"}
Fix a real $b>1$. The Riemann hypothesis holds if and only if for every $\kappa>0$ and every real starting bound $R$ there is a $Y\ge\max\{R,2\}$ such that every real $x$ in the same closed interval $[Y,Y^b]$ satisfies

$$
U(x)\le x^{1/2+\kappa}.
$$
:::

::: proof
Under RH the absolute envelope above gives $|U(x)|\le\sqrt{x}$ for all sufficiently large $x$, so for each $\kappa>0$ every sufficiently late window works.

Conversely, given a target exponent $\eta>0$ for the prime-tail mass, take $\kappa=\eta/(2b)$. The prime-power correction satisfies $\sqrt{x}(Q(x)-Q_\vartheta(x))\to2$, so it is at most $3$ throughout sufficiently late windows. Substituting $U(x)/\sqrt{x}=-\sqrt{x}Q(x)$ into the pointwise bound and taking the positive part gives $\max\{-\sqrt{x}Q_\vartheta(x),0\}\le x^\kappa+3$. Divide by $x$ and integrate over the window to obtain

$$
A_{\vartheta,b}(Y)\le4Y^{b\kappa}(b-1)\ln Y\le Y^\eta
$$

on every sufficiently late window satisfying the pointwise bound. Such $Y$ are arbitrarily large, so [@thm-ch31-prime-window-rh] gives RH. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-mangoldt-pointwise-sqrt-window title="A fixed square-root coefficient for complete Mangoldt windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtPointwiseWindows.rh_iff_pointwise_sqrt_windows"}
Write $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$ for the first Li mass, where $\gamma_{\mathrm{EM}}$ is Euler’s constant. Fix real numbers $b>1$ and $C>M$. The Riemann hypothesis holds if and only if for every real $R$ there is a $Y\ge\max\{R,2\}$ such that every $x\in[Y,Y^b]$ satisfies

$$
U(x)\le C\sqrt{x}.
$$
:::

::: proof
Under RH, taking the positive margin $C-M$ in the absolute envelope for $U(x)/\sqrt{x}$ gives the upper bound $C\sqrt{x}$ at all sufficiently large $x$. Conversely, for each $\kappa>0$, moving the starting bound sufficiently far out ensures $C\le x^\kappa$ throughout the window. The same window then satisfies the pointwise power bound, and [@thm-ch31-mangoldt-pointwise-power-window] gives RH. The full proof is checked by the Lean kernel.
:::

At the critical coefficient $C=M$, the distance from $U(x)$ to $M\sqrt{x}$ can be measured on the original additive scale. Dividing this distance by $\sqrt{x}$ can hide a saving of any fixed size.

::: {.theorem #thm-ch31-mangoldt-critical-gap title="Divergence of the additive gap below the critical envelope" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtCriticalGap.rh_iff_critical_gap_tendsto_atTop"}
Let $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$. The Riemann hypothesis holds if and only if, along the real axis as $x\to+\infty$,

$$
M\sqrt{x}-U(x)\longrightarrow+\infty.
$$

Equivalently, for each fixed real $D$ there is an $X$ such that every real $x\ge X$ satisfies $U(x)\le M\sqrt{x}-D$.
:::

::: proof
Put $y=\ln x$. Under RH the real part of the normalized zero sum has the form $F(y)=\sum_k a_k\cos(\gamma_k y)$, where $a_k\ge0$ and $\sum_k a_k=M$. Put $d(y)=M-F(y)$. Summing the inequalities $(1-\cos(\gamma_k y))(1+\cos(\gamma_k h))\ge0$ with weights $a_k$ gives

$$
2d(h)-4d(y)\le2F(y)-F(y+h)-F(y-h).
$$

The explicit formula to the right of zero gives $d(h)/h\to+\infty$ as $h\downarrow0$. At large $y$ choose $h=e^{-y/2}$. The weighted midpoint inequality for the Mangoldt ramps, together with the explicit-formula error for the normalized remainder, bounds the right-hand side above by $O(h)$. Dividing by $h$ gives $d(y)/h\to+\infty$. Since $|e^{-y/2}U(e^y)-F(y)|=O(e^{-y/2})$, the additive gap at $x=e^y$ differs from $d(y)/h$ by a bounded amount.

Conversely, divergence of the gap gives $U(x)\le M\sqrt{x}$ on the entire tail. For each $\kappa>0$ we eventually have $M\le x^\kappa$, so the pointwise power-window condition of [@thm-ch31-mangoldt-pointwise-power-window] holds. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** Fix $b>1$. RH is equivalent to the following window condition. For every real $R$ there exists $Y\ge\max\{R,2\}$ such that every point of the same interval $[Y,Y^b]$ satisfies $U(x)\le M\sqrt{x}$. Under RH take $D=0$ in the preceding theorem. Every sufficiently late window then works. For the converse assume such windows exist arbitrarily late. Given $\kappa>0$, increase the starting bound until $x^\kappa\ge M$ throughout the tail, choose one of the windows there, and apply [@thm-ch31-mangoldt-pointwise-power-window].

::: {.theorem #thm-ch31-mangoldt-log-squared-gap title="A logarithm-squared gap below the critical Mangoldt envelope" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtLogSquareGap.rh_iff_eventually_log_squared_gap"}
Let $M=2+\gamma_{\mathrm{EM}}-\ln(4\pi)$ be the first Li mass (`firstLiMass`). The classical Riemann hypothesis holds if and only if for every real $c<1/64$ there is a real $X_c>1$ such that every real $x\ge X_c$ satisfies

$$
U(x)\le M\sqrt{x}-c(\ln x)^2.
$$
:::

::: proof
Set $y=\ln x$, $q=e^{-y/2}$ and $G(y)=qU(e^y)$. The spectral deficit $d(t)=M-F(t)$ from the preceding argument satisfies $d(t)\sim \tfrac12 t\ln(1/t)$ as $t\downarrow0$. Under RH, compare the spectral second difference with the midpoint bound for the Mangoldt ramps, now taking the step $h=yq/4$. After division by $y^2q$, the contribution $2d(h)/(y^2q)$ from the origin tends to $1/8$, since $\ln(1/h)/y\to1/2$. The arithmetic midpoint term $q^{-1}h\,2\sinh(h/2)/(y^2q)$ tends to $1/16$. All remaining terms tend to zero on this scale because $G(y)$ is eventually bounded and $|G(y)-F(y)|=O(q)$. Hence

$$
\liminf_{y\to\infty}\frac{M-G(y)}{y^2q}
\ge\frac14\left(\frac18-\frac1{16}\right)=\frac1{64}.
$$

With $x=e^y$, the ratio on the left equals $(M\sqrt{x}-U(x))/(\ln x)^2$, giving the stated tail bound for each fixed $c<1/64$. For the converse take just $c=1/128$. The gap is then eventually at least $(\ln x)^2/128$ and tends to positive infinity, so [@thm-ch31-mangoldt-critical-gap] gives RH. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-mangoldt-fejer-gap title="A finite Fejér average for the critical gap" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtFejerGap.rh_iff_eventually_fejer_gap"}
Let $M$ be the first Li mass (`firstLiMass`). The classical Riemann hypothesis holds if and only if for every real $c<1/48$ there is an $X_c>1$ such that every real $x\ge X_c$ satisfies

$$
U(x)\le M\sqrt{x}-c(\ln x)^2.
$$
:::

::: proof
Under RH the cosine terms in the sum over zeros carry nonnegative weights. Fix $N\ge2$ and form all ordered pairs of $N$ equally spaced phases. For every real $\theta$,

$$
\sum_{j,k=0}^{N-1}\cos((j-k)\theta)
=\left|\sum_{j=0}^{N-1}e^{ij\theta}\right|^2\ge0.
$$

This positivity lets us combine midpoint inequalities at different steps to bound the same central spectral deficit. Set $y=\ln x$ and $q=e^{-y/2}$. For the ordered pair $(j,k)$ take the step $b_{jk}yq$, where $b_{jk}=|j-k|/(2N)$. After normalization by $qy^2$, the contribution from the origin tends to $b_{jk}/2$, the leading term of the arithmetic midpoint bound tends to $b_{jk}^2$, and the errors tend to zero. Summing over the finitely many pairs and dividing by $2N^2$ gives the coefficient

$$
C_N=\frac{1}{2N^2}\sum_{j,k=0}^{N-1}(b_{jk}/2-b_{jk}^2)
=\frac{1-N^{-2}}{48}.
$$

Given $c<1/48$, choose one finite $N$ with $c<C_N$ before taking the real tail. For $N=3$ we have $C_3=1/54>1/64$, so the new bound includes the endpoint $c=1/64$ of the one-step estimate. For the converse, every $c<1/64$ also satisfies $c<1/48$. The stronger tail bound therefore supplies the one-step criterion in [@thm-ch31-mangoldt-log-squared-gap], which gives RH. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-mangoldt-uniform-fejer-gap title="A Fejér gap with a logarithmic correction on one real tail" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtUniformFejerGap.rh_iff_eventually_uniform_fejer_gap"}
Write $y=\ln x$ and let $M$ be the first Li mass. The classical Riemann hypothesis holds if and only if there are a constant $C\ge0$ and a real $X>e$ such that every real $x\ge X$ satisfies

$$
U(x)\le M\sqrt{x}-\frac{y^2}{48}+\frac{y\ln y}{12}+Cy.
$$
:::

::: proof
This estimate gives a single envelope with an explicit correction on the whole real tail. Set $q=e^{-y/2}$ and $t=byq$. Once $y$ is large enough, $yt\le1$ for every $b\in[0,1/2]$. This common threshold gives simultaneous control of the quadratic remainder at the origin and the error in the midpoint bound. For $N$ equally spaced phases put $b_{jk}=|j-k|/(2N)$. Over all ordered pairs, the averages of $b_{jk}/2-b_{jk}^2$ and $b_{jk}$ are $(1-N^{-2})/24$ and $(1-N^{-2})/6$, respectively. The spectral midpoint comparison supplies a further factor of $1/2$, giving coefficients $(1-N^{-2})/48$ for $y^2$ and $(1-N^{-2})/12$ for $y\ln y$.

Fix any $y$ beyond the common threshold and let $N\to\infty$ at that point. A term $Cy$ absorbs the linear and constant errors. Conversely, $(y\ln y/12+Cy)/y^2\to0$. For each $c<1/48$ the correction is therefore eventually at most $(1/48-c)y^2$, and [@thm-ch31-mangoldt-fejer-gap] gives RH. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-mangoldt-bounded-gap-peak title="Bounded gaps between returns of the normalized remainder near the critical mass" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtWindowPhase.bounded_gap_actual_G_peak"}
Assume RH and set $G(y)=e^{-y/2}U(e^y)$. For every $\delta>0$ there is a natural number $L$ such that for every natural number $n$ some natural number $k\le L$ satisfies

$$
|G(n+k)-M|<\delta.
$$
:::

::: proof
Under RH the normalized zero sum is obtained by evaluating a continuous function on a compact group of phases at integer powers of the phase element. Its value at the identity is $M$. Choose an open neighborhood of the identity on which the phase sum is within $\delta/2$ of $M$. On the closure of the cyclic subgroup generated by the phase element, a finite subcover bounds the number of forward integer steps needed to reach that neighborhood. The normalized remainder eventually differs from the real part of the zero sum by less than $\delta/2$, so a return within the bounded waiting time gives the required integer logarithmic time. Enlarging $L$ covers the finite initial segment. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-mangoldt-no-windows-below-mass title="Coefficients below the first Li mass exclude arbitrarily late good windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MangoldtWindowPhase.no_windows_below_mass"}
Fix real numbers $b>1$ and $C<M$. Unconditionally, there exists a real $R$ such that every $Y\ge\max\{R,2\}$ admits an $x\in[Y,Y^b]$ with $U(x)>C\sqrt{x}$.
:::

::: proof
Suppose arbitrarily late windows satisfy $U(x)\le C\sqrt{x}$ throughout. The same windows satisfy the upper bound with the larger coefficient $M+1$, so [@thm-ch31-mangoldt-pointwise-sqrt-window] gives RH. Take $\delta=M-C>0$ and apply [@thm-ch31-mangoldt-bounded-gap-peak] starting at $n=\lceil\ln Y\rceil$. For large $Y$ we have $(b-1)\ln Y\ge L+1$, so $n+k\in[\ln Y,b\ln Y]$. The point $x=e^{n+k}$ in that very window then satisfies $U(x)/\sqrt{x}>M-\delta=C$, contradicting the assumed bound. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** Let $P_b(Y)=\max_{Y\le x\le Y^b}U(x)/\sqrt{x}$. For $Y\ge2$ the normalized remainder is continuous and attains its maximum on the closed window. For every $a<M$, the preceding theorem gives $P_b(Y)>a$ for all sufficiently large $Y$. Under RH the absolute envelope gives $P_b(Y)<c$ eventually for every $c>M$, so $P_b(Y)\to M$. If RH fails, fix any real $T$ and take $C=\max\{T,M+1\}$. The contrapositive of [@thm-ch31-mangoldt-pointwise-sqrt-window] then gives $P_b(Y)>C\ge T$ for all sufficiently large $Y$. Thus $P_b(Y)\to+\infty$. [External kernel replay for the window maximum](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7060137372)

::: {.theorem #thm-ch31-wide-prime-window title="A lower mass bound on wide windows and uniform divergence if RH fails" lean="D5/S3/Weil/Mertens/IntegratedExplicit/WidePrimeWindowMass.prime_tail_wide_window_mass"}
For the actual prime-only tail, write the mass at real endpoints $2\le A\le B$ as

$$
N(A,B)=\int_A^B \frac{\max\{-Q_\vartheta(x),0\}}{\sqrt x}\,dx .
$$

Fix $b>1$. There is a constant $C_b\ge0$ such that $N(A,B)\ge 2\ln(B/A)-C_b$ whenever $2\le A$ and $A^b\le B$. If RH fails, for each real $K$ a single right-endpoint threshold $S$ gives $N(A,B)-2\ln(B/A)\ge K$ for every $B\ge S$ and every admissible $A$.
:::

::: proof
The threshold can be chosen independently of $A$ by setting $Y=B^{1/b}$. Since $A^b\le B$, the interval $[Y,B]=[Y,Y^b]$ lies inside $[A,B]$. Integrating the same nonnegative function over the larger interval can only increase the mass. If RH fails, symmetry supplies a zero with real part $\beta>1/2$. The fixed-power estimate allows any positive exponent loss, so choosing $b(\beta-1/2)/2$ gives $N(A,B)\ge B^{(\beta-1/2)/2}$ for every sufficiently large $B$, uniformly in admissible $A$. This power eventually exceeds $2\ln B$ plus any fixed constant. Since $2\ln(B/A)\le2\ln B$, the discrepancy diverges uniformly. Below the right-endpoint threshold the logarithmic term is bounded and the mass is nonnegative, which extends the lower bound to the whole domain. If RH holds, the bounded remainder for all $2\le A\le B$ gives the same lower bound directly. The full proof is checked by the Lean kernel.
:::

The exponent $b>1$ is fixed in advance. In logarithmic coordinates the condition $B\ge A^b$ requires the window to widen with the scale. At fixed ratio $B/A$, the inclusion used above gives no corresponding bound.

**At which scales can one choose a prime with a small character sum?** Fix $\varepsilon>0$. For each integer $k\ge1$ take the prime upper bound $X_k=2^k$ and the height $x_k=(k\ln2)^{5/\varepsilon}$, so $\exp(x_k^{\varepsilon/5})=X_k$. The block contains the primes $X_k/2\le q<X_k$ congruent to $3$ modulo $8$. Consecutive blocks are disjoint. For sufficiently large $k$ the lower endpoint exceeds $\sqrt{X_k}$, so the whole block fits the size band for $q$ in the reference.

For the second moment, define the sum for every positive odd integer $q$ in the block using the Jacobi symbol. Let $N_k=\lfloor x_k^{400}\rfloor$ and put

$$
T_k(q)=\sum_{n=1}^{N_k}\Lambda(n)\min\{1,x_k/n\}\left(\frac{n}{q}\right).
$$

Here $\Lambda(p^j)=\ln p$ for primes $p$ and integers $j\ge1$. All other positive integers have weight zero. Terms up to $x_k$ retain their full weight, while larger terms receive a factor $x_k/n$. Only primes $q$ congruent to $3$ modulo $8$ in the block receive weight. If $|T_k(q)|\le x_k^{1/2+\varepsilon}/2$, add $(\ln q)/q$ to $G_k$. Otherwise add it to $B_k$. Equality is included in $G_k$.

::: {.theorem #thm-ch31-dyadic-mangoldt-prime-supply title="Good primes for the truncated Mangoldt sum at dyadic scales" lean="D5/S3/CharacterSums/DyadicMangoldtPrimeSupply.dyadic_quadratic_mangoldt_supply"}
For each fixed real $\varepsilon>0$, the exceptional primes have finite total weight, and the partial sums of the good weight tend to positive infinity:

$$
\begin{aligned}
\sum_{k=1}^{\infty} B_k&<\infty,\\
\lim_{K\to\infty}\sum_{k=1}^K G_k&=+\infty.
\end{aligned}
$$
:::

::: proof
Sum $|T_k|^2$ over every integer in the block congruent to $3$ modulo $8$. These nonnegative terms include the contribution of the exceptional primes. The total truncated weight of higher prime powers is $O(\sqrt{x_k})$. For the cross terms at distinct odd primes, quadratic reciprocity turns the varying denominator into a periodic sum. Complete periods cancel, leaving endpoint remainders. For fixed $\varepsilon$ the full second moment is at most $(X_k/2)x_k^{1+\varepsilon}$ on sufficiently late blocks. Every exceptional prime contributes more than $x_k^{1+2\varepsilon}/4$ to the second moment. Using $(\ln q)/q\le 2\ln(X_k)/X_k$ throughout the block and substituting $x_k^\varepsilon=(k\ln 2)^5$ gives $B_k\le4/(k\ln 2)^4$ for all sufficiently large $k$. The exceptional weight is therefore summable. On the other hand the sum of $(\ln q)/q$ over primes congruent to $3$ modulo $8$ diverges. Summing over the disjoint blocks and subtracting the finite exceptional weight gives the divergence of the good weight. The full proof is checked by the Lean kernel.
:::

Thus for every starting block $K_0$ there exist a $k\ge K_0$ and a prime $q$ in that block meeting the bound. Divergence allows individual blocks to contain no good prime. The estimate concerns the finite sum for the first selection of $q$ in the reference, with the extra twist $\kappa=1$. Under the analytic, size and zero-free hypotheses in the reference, the corresponding smoothed, centered character sum satisfies $|g_\chi(x_k)+T_k(q)|\le x_k^\varepsilon$, so the approximating term is $-T_k(q)$. The first choice of $q$ must also satisfy two zero-free conditions simultaneously. In the subsequent choice of $d$, the twists and modulus vary with $q,x$. The logarithmic derivative estimates and zero-free boxes require separate arguments. [Finite sum in the reference](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/GL3MeanSquares/SmoothedRemainderRealIntegralFormula.lean#L139-L147) · [Approximation for the smoothed sum](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/GChiApproximationSumStatement.lean#L14) · [Conditions in the first prime selection](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean)

**Can the height be prescribed before choosing the prime?** Fix a real height $x$ and put $T=x^{\varepsilon/5}$. Write $T_x(q)$ for the same truncated sum evaluated at this $x$. Each term is $\Lambda(n)\min\{1,x/n\}$ times the Jacobi symbol $(n/q)$, and the sum ends at $\lfloor x^{400}\rfloor$. As the interval for $q$ moves with $x$, we allow a finite set $E\subset\mathbb N$ of integers to be avoided. Let $S_x(E)$ consist of the primes satisfying

$$
e^{T/2}<q\le e^T,\qquad q\equiv3\pmod8,\qquad
q\notin E,\qquad |T_x(q)|\le \tfrac12 x^{1/2+\varepsilon}.
$$

::: {.theorem #thm-ch31-real-scale-mangoldt-prime-supply title="Good prime weight at every sufficiently large real height" lean="D5/S3/CharacterSums/DyadicMangoldtPrimeSupply.real_scale_quadratic_mangoldt_supply"}
For every fixed $\varepsilon>0$ there exists $x_0(\varepsilon)$ such that for every real $x\ge x_0(\varepsilon)$ and every finite set $E\subset\mathbb N$ with $|E|\le e^{T/3}$,

$$
\sum_{q\in S_x(E)}\frac{\ln q}{q}\ \ge\ \frac{T}{173065984000}.
$$

:::

::: proof
Put $D=86532992000$. The primes congruent to $3$ modulo $8$ in the full interval eventually have total weight at least $T/D$. The second-moment estimate uses dyadic blocks, each at the same real height $x$ and cutoff $\lfloor x^{400}\rfloor$. The primes exceeding the threshold eventually have total weight at most $36T^2/x^\varepsilon$, which tends to zero after division by $T$. Each prime in the interval has weight at most $Te^{-T/2}$, so deleting at most $e^{T/3}$ integers costs at most $Te^{-T/6}$. For sufficiently large $x$ each loss is at most $T/(4D)$, leaving at least $T/(2D)$. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** The positive lower bound supplies a prime at every such $x$. The choice of $q$ may vary with $x$ and $E$. The single-prime weight bound $Te^{-T/2}$ also gives $|S_x(E)|\ge e^{T/2}/173065984000$. If a set $E$ of the allowed size contains every candidate failing either zero-free condition in the reference, the theorem supplies a prime meeting both conditions. Bounding that exceptional set requires an independent estimate.

**The second prime belongs to a moving residue class.** Once $q$ is chosen, the modulus $m$ for selecting $d$ can grow with the height. To discard the integers that fail a test in $(D/2,D]$, we first need a count of the actual primes in the prescribed class. An asymptotic for fixed $m$ may start at a height that depends on $m$. Here the starting condition must work for all $m$.

Fix an integer $m\ge3$ and a unit $a$ modulo $m$. In the cyclotomic field $\mathbb Q(\zeta_m)$ write $\sigma_a(\zeta_m)=\zeta_m^a$. Let $\Pi_a(t)$ count the rational primes up to $t$ that are unramified in this extension and have Frobenius $\sigma_a$. Let $Q$ be the maximum of the primitive conductors of the characters of its Galois group. Write $\operatorname{Li}(t)=\int_2^t du/\log u$.

::: {.theorem #thm-ch31-cyclotomic-tz title="Cyclotomic prime counting with an exceptional zero term" status="written-proof" proof="pf-ch31-cyclotomic-tz" doi="10.2140/ant.2019.13.1039" source="Theorems 1.4 and 3.3, pp. 1042 and 1052" request="https://github.com/the-omega-institute/trureturing-requests/issues/455"}
There exist absolute effective constants $A,c_2,c_3,s>0$. Here an exceptional zero is a real zero of the primitive Dirichlet $L$-function associated with a real character in the range $0<\lambda<1/8$, $\beta=1-\lambda/\log Q$. In the absence of an exceptional zero, put $F(t)=\operatorname{Li}(t)$. If one exists, its real character $\chi$ is unique and the zero is $\beta=1-\lambda/\log Q$ with $sQ^{-2}\le\lambda<1/8$. In this case put $F(t)=\operatorname{Li}(t)-\chi(a)\operatorname{Li}(t^\beta)$. For every $m,a$ as above and every $t\ge Q^{c_2}$,

$$
\left|\varphi(m)\Pi_a(t)-F(t)\right|
\le A\left(e^{-c_3\log t/\log Q}+e^{-\sqrt{c_3\log t}}\right)F(t).
$$

:::

::: {.proof #pf-ch31-cyclotomic-tz}
Apply Theorem 1.4 of Thorner and Zaman to $L=\mathbb Q(\zeta_m)$ over $\mathbb Q$, with the entire group $G=(\mathbb Z/m\mathbb Z)^\times$ as the abelian subgroup and $\{\sigma_a\}$ as the conjugacy class. The fixed field is $\mathbb Q$, of discriminant and degree $1$. Both conductor parameters in (1–11) and (3–1) reduce to $Q$, and the density factor is $1/\varphi(m)$. Each primitive conductor divides $m$. For $m\ge3$ the group has a nontrivial character, whose primitive conductor is at least $3$, so $3\le Q\le m$. Theorem 1.4 gives the relative error and exceptional term above, and Theorem 3.3 gives $\lambda\ge sQ^{-2}$. Both sets of constants are absolute and effective. Jesse Thorner and Asif Zaman, “A unified and improved Chebotarev density theorem,” *Algebra & Number Theory* **13**(5) (2019), 1039–1068. [10.2140/ant.2019.13.1039](https://doi.org/10.2140/ant.2019.13.1039) · [Published Theorem 1.4](https://msp.org/ant/2019/13-5/ant-v13-n5-p02-s.pdf#page=5) · [Published Theorem 3.3](https://msp.org/ant/2019/13-5/ant-v13-n5-p02-s.pdf#page=15)
:::

**Hand derivation.** There exist absolute effective constants $c,K,D_0>0$ such that for every $m\ge3$, every unit $a$ and every $D\ge\max\{D_0,(4m)^K\}$,

$$
\#\{Y<p\le2Y:p\text{ prime},\ p\equiv a\pmod m\}
\ \ge\ c\,m^{-3}\frac{Y}{\log Y},\qquad Y=D/2.
$$

First choose $K\ge2$ sufficiently large, then choose $D_0$ sufficiently large. Since $\log Y/\log Q\ge K-1$ and $Y\ge D_0/2$, these choices ensure $Y>m$, $Y\ge Q^{c_2}$ and relative errors at most $1/100$ at both $Y$ and $2Y$. Every prime in the interval is unramified since $p>m$, and its Frobenius takes $\zeta_m$ to $\zeta_m^p$. The difference of the two endpoint counts is therefore the desired prime count.

If the exceptional zero exists and $\chi(a)=1$, put $\delta=1-\beta$ and $W=1-Y^{-\delta}$. In every other case put $W=1$. On $[Y,2Y]$ we have $F'(t)\ge W/\log(2Y)$, giving $F(2Y)-F(Y)\ge WY/(2\log Y)$. In the cancellation case $\beta>1/2$, so integrating from $t^\beta$ to $t$ gives $0\le F(t)\le2t(1-t^{-\delta})/\log t$. Since $1-(2Y)^{-\delta}\le1-Y^{-2\delta}\le2W$, the sum of the two endpoints is at most $10WY/\log Y$. In the other cases $0\le F(t)\le2\operatorname{Li}(t)\le6t/\log t$ for large $t$. Hence $F(Y)+F(2Y)\le18WY/\log Y$ in every case. Subtracting the two endpoint errors leaves $\varphi(m)(\Pi_a(2Y)-\Pi_a(Y))\ge WY/(4\log Y)$.

In the cancellation case $\delta\log Y\ge s/m^2$, so $1-e^{-u}\ge(1-e^{-1})\min\{u,1\}$ gives $W\ge (1-e^{-1})\min\{s,1\}m^{-2}$. This bound also holds for $W=1$. Dividing by $\varphi(m)\le m$ proves the claim. For the second-prime parameters $y=x^{\varepsilon/5}$, $m\le e^{4y}$ and $D=e^{y(\log x)^2}$, we have $\log D/\log(4m)\ge y(\log x)^2/(\log4+4y)\to\infty$. The same threshold therefore applies at every sufficiently large $x$. If the number of integers in the class failing either test is smaller than this prime lower bound, at least one prime passes both tests. [The counting hypothesis in the reference](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Definitions/GlobalTwisting/GeneralHyps.lean#L113-L118)

**How can the same $d$ pass both tests?** Fix $\varepsilon>0$ and put $y=x^{\varepsilon/5}$, $D=\exp(y(\log x)^2)$ and $N=\lfloor x^{400}\rfloor$. Enumerate a residue class by $d_i=b+m(A+i)$ for $0\le i<L$. Write $J(n,r)$ for the product of the Legendre symbols over the prime factors of $r$, counted with multiplicity, taking the empty product $1$ at $r=0,1$. The factor at $2$ is $1$ for odd $n$ and $0$ for even $n$. On positive odd denominators this is the Jacobi symbol. Put $w_n=\Lambda(n)\min\{1,x/n\}$. At the same index $i$, form the two sums

$$
S_i=\sum_{n=1}^N w_n J(n,d_i),\qquad
S_{q,i}=\sum_{n=1}^N w_n J(n,d_i)J(n,q).
$$

Let $H$ contain exactly the indices for which $|S_i|>x^{1/2+\varepsilon}/2$ or $|S_{q,i}|>x^{1/2+\varepsilon}/2$. Thus $i\notin H$ means that both sums meet the bound.

::: {.theorem #thm-ch31-splitting-progression-power-tail title="Exceptional indices for two tests in one splitting progression" lean="D5/S3/CharacterSums/SplittingProgressionExponentialTail.splitting_progression_power_tail"}
For every fixed $\varepsilon>0$ and every sufficiently large real $x$, take any natural numbers $q,b,m,A,L$ with $b\equiv3\pmod4$ and $4\mid m$. Assume every prime divisor $p$ of $m$ satisfies $p\le x^{1/2+\varepsilon/2}$ or $p>N$. If $L\ge D/(4e^{4y})$, then

$$
|H|\le L D^{-\min\{\varepsilon,1\}/38400}.
$$

:::

::: proof
Extract from each sum the terms at odd primes that do not divide $m$. The clipped weights and the condition on the prime divisors of $m$ bound the remaining contributions from higher prime powers, $2$, and primes dividing $m$ by $x^{1/2+\varepsilon}/4$ for sufficiently large $x$. Since $d_i\equiv3\pmod4$, quadratic reciprocity expresses each $J(p,d_i)$ as a fixed sign times the quadratic character of $d_i\bmod p$. Over a full period modulo the product of the retained primes, $p\nmid m$ makes each residue coordinate uniform, and the Chinese remainder theorem makes the coordinates independent. Each character is bounded and has mean zero, so the sum of the squared coefficients controls the high even moments. Expanding the same moment on the actual interval of length $L$ leaves an endpoint remainder for each tuple of primes after its complete periods are removed. At order $2\lfloor y\log x/4800\rfloor$ the length assumption absorbs the remainders. At each failing index at least one of the two retained sums has absolute value at least $x^{1/2+\varepsilon}/4$. Summing the two nonnegative even powers therefore bounds the entire exceptional set. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** For every fixed $B>0$ we eventually have $D^{-\min\{\varepsilon,1\}/38400}\le e^{-By}$. To obtain an actual prime, enumerate just the elements of the specified class in the preceding interval $(D/2,D]$. Suppose $3\le m\le e^{4y}$, the class $a=b\bmod m$ is a unit, and the enumeration meets the hypotheses above. Then $L\le D+1$. There are at most $(D+1)D^{-\min\{\varepsilon,1\}/38400}$ failing indices. The ratio of this bound to the prime lower bound $c m^{-3}(D/2)/\log(D/2)$ tends to zero since $m^3\le e^{12y}$ and $\log D=y(\log x)^2$. At every such sufficiently large height, some prime $d$ therefore passes both tests.

For the first prime $e^{y/2}<q\le e^y$ chosen above, take $M=q\prod_{2<p\le y,\ p\text{ prime}}p$, $m=16M$ and $b=8M-1$. Then $b\equiv3\pmod4$ and $\gcd(b,m)=1$. The bound $\vartheta(y)\le y\log 4$ gives $\log m\le\log16+(1+\log4)y\le4y$ for large $x$. Every prime divisor of $m$ is at most $\max\{2,y\}$ or equals $q>e^{y/2}>N$. Enumerating this class in $(D/2,D]$ gives at least $D/(2m)-1\ge D/(4m)$ indices, meeting the length threshold. At the same $x$, the first prime $q$ and the resulting $d$ pass the first test and both tests above.

**Which conductor belongs to each of the six coefficients?** Take distinct odd primes $q,d$ and write $j_p(n)=J(n,p)$. Put $e(n)=\chi_8(n)$, which vanishes at even integers, takes the value $1$ in classes $1,7$ modulo $8$, and takes the value $-1$ in classes $3,5$. A primitive representation of $f$ at level $a$ is a Dirichlet character modulo $a$ of conductor $a$ whose value at every natural number $n$ is $f(n)$, including at nonunits.

::: {.theorem #thm-ch31-six-primitive-quadratic-levels title="Primitive representatives for six quadratic coefficients" lean="D5/S3/CharacterSums/PrimitiveQuadraticConductors.six_quadratic_levels"}
For every pair of distinct odd primes $q,d$, each function has a primitive complex Dirichlet character representing it at the indicated level:

$$
(j_q,q),\quad(ej_q,8q),\quad(j_d,d),\quad(ej_d,8d),\quad
(j_qj_d,qd),\quad(ej_qj_d,8qd).
$$

:::

::: proof
The nontrivial quadratic character modulo an odd prime is primitive at that prime. The character $e$ takes opposite values at $1$ and $5$, which are congruent modulo $4$, so it cannot descend to $4$ or any of its divisors. Lifting primitive characters of coprime moduli to their product and multiplying gives a character whose conductor is the product of their conductors. Apply this successively to $8,q,d$. If an integer shares a prime factor with the product modulus, the corresponding factor vanishes, so the coefficient identity also holds there. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-primitive-inducing-level title="Recovering a primitive conductor from values at coprime arguments" lean="D5/S3/CharacterSums/PrimitiveQuadraticConductors.inducing_level_and_values"}
Let $R$ be a commutative monoid with zero, let $r,a,M$ be positive integers, and let $\chi$ be a primitive $R$-valued Dirichlet character modulo $r$. Suppose $f:\mathbb N\to R$ has a primitive representation at level $a$, and $\chi(n)=f(n)$ for every $n$ coprime to $M$. Then $r=a$ and $\chi(n)=f(n)$ for every natural number $n$.
:::

::: proof
Lift both $\chi$ and the representative of $f$ to modulus $raM$. Every unit modulo $raM$ has a representative coprime to $M$, so the lifts agree on all units and hence are equal as characters. Lifting preserves conductors, giving equality of the two primitive levels. Lifting from this common level is injective, which gives agreement at every argument. The full proof is checked by the Lean kernel.
:::

**What bound does the character itself supply in the right half-plane?** Write $h$ for its modulus and $s=\sigma+it$. The estimate also covers imprimitive nonprincipal characters.

::: {.theorem #thm-ch31-nonprincipal-half-totient title="A strict half-totient bound for nonprincipal Dirichlet L-functions" lean="D5/S3/CharacterSums/NonprincipalCharacterGrowth.nonprincipal_growth"}
For every positive integer $h$, every nonprincipal complex Dirichlet character $\chi$ modulo $h$, and every complex $s$ with $\sigma=\operatorname{Re}s>0$,

$$
|L(s,\chi)|<\frac{\varphi(h)}{2}\frac{|s|}{\sigma}.
$$

:::

::: proof
Put $A(u)=\sum_{1\le n\le u}\chi(n)$. A complete period sums to zero, so a prefix in one period and its complementary suffix have opposite sums. They contain a total of $\varphi(h)$ units, and the smaller unit count bounds $|A(u)|$ by $\varphi(h)/2$. For $\sigma>1$, partial summation gives $L(s,\chi)=s\int_1^\infty A(u)u^{-s-1}\,du$. Since $A$ is bounded, the integral converges locally uniformly and defines a holomorphic function on $\sigma>0$. The identity theorem extends the equality with the nonprincipal $L$-function throughout that half-plane. For $h<u<h+1$, the sum $A(u)$ consists of exactly one full period and vanishes. The majorant $\varphi(h)u^{-\sigma-1}/2$ is positive on that interval. Thus the integral of the modulus is strictly smaller than the integral of the majorant. The triangle inequality for the complex integral, followed by multiplication by $|s|$, gives the claimed strict bound. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** The coefficient $ej_qj_d$ has primitive conductor $8qd>1$, whereas a principal character has conductor $1$. It therefore satisfies the nonprincipal hypothesis, and we may set $h=8qd$ in the estimate. Bounding $L'/L$ further requires control of the zeros of $L$ in the specified region.

**Controlling $L'/L$ at the same real endpoint.** Take a positive integer modulus $h$ and a nonprincipal complex Dirichlet character $\chi$ modulo $h$. Write $D_\chi=L'(1,\chi)/L(1,\chi)$. At a real $x>0$, define the ramp sum and the smoothed, centered character sum on the nonprincipal branch by

$$
R_\chi(x)=\sum_{1\le n\le\lfloor x\rfloor}\Lambda(n)\max(x/n-1,0)\chi(n),
\qquad g_\chi(x)=R_\chi(x)+xD_\chi .
$$

The sum includes prime powers. When $x$ is an integer the entering term has weight zero. Write $I(x)=\int_x^\infty(\psi(u)-u)u^{-2}\,du$, where $\psi(u)=\sum_{n\le u}\Lambda(n)$, and let $\gamma$ denote Euler’s constant.

::: {.theorem #thm-ch31-log-derivative-ramp-tail title="The character ramp and signed tail at a common endpoint" lean="D5/S3/CharacterSums/DirichletRampEndpoint.logDerivative_le_ramp_tail"}
For every positive integer modulus $h$, every nonprincipal complex Dirichlet character $\chi$ modulo $h$, and every real $x>0$,

$$
|D_\chi|\le\frac{|g_\chi(x)|}{x}+\log x-1-\gamma-I(x).
$$

:::

::: proof
Apply the triangle inequality to $xD_\chi=g_\chi(x)-R_\chi(x)$. Since $|\chi(n)|\le1$, the normalized ramp $|R_\chi(x)|/x$ is bounded by $\sum_{n\le x}\Lambda(n)/n-\psi(x)/x$. For $x\ge2$ the complete Chebyshev tail identity expresses this as $\log x-1-\gamma-I(x)$, preserving the sign of the tail. For $0<x<2$ the ramp vanishes. The integrand in $I(x)$ is $-1/u$ on $(x,2)$, giving the same formula by integration back from $2$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-uniform-log-derivative-ramp title="Uniform logarithmic derivative bound from a square-root-scale ramp" lean="D5/S3/CharacterSums/DirichletRampEndpoint.uniform_logDerivative_of_ramp"}
For all real $\varepsilon<1/2$ and $\eta>0$ there exists $X\ge2$ such that for every $x\ge X$, every positive integer modulus $h$, and every nonprincipal complex Dirichlet character $\chi$ modulo $h$,

$$
|g_\chi(x)|\le x^{1/2+\varepsilon}
\quad\Longrightarrow\quad
|D_\chi|\le\log x-1-\gamma+\eta .
$$

:::

::: proof
Dividing the bound on the centered sum $|g_\chi(x)|$ by $x$ gives $|g_\chi(x)|/x\le x^{\varepsilon-1/2}\to0$. The Chebyshev error kernel is absolutely integrable on the tail, so $I(x)\to0$. Choose $X$ so that each error has magnitude less than $\eta/2$ and apply the preceding endpoint inequality. Both errors are controlled by functions of the real endpoint and loss parameters alone, so one threshold works for all moduli and characters. The full proof is checked by the Lean kernel.
:::

**Hand derivation.** On the nonprincipal branch, the reference’s smoothed, centered sum `An.gChi` used above agrees with $g_\chi$ by definition. For each bounded host character and each nonprincipal primitive character $\chi$ inducing it, the host condition `EAtH.bdG` gives $|g_\chi(x)|\le x^{1/2+\varepsilon}$ at the same endpoint $x$. If $\varepsilon<1/2$, take $\eta=1$. Then $|D_\chi|\le\log x-\gamma\le4\log x$ for every sufficiently large $x$. This is the inequality required by `EAtH.bdL` with coefficient $4$ for that $\chi$. The principal character has a separate branch. [Definitions of the centered sum and logarithmic derivative](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Analytic.lean#L9-L27) · [The two pointwise host conditions](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L144-L151)

For the same nonprincipal character, finitely many knots also control $g_\chi$ on a whole window. Write $D_\chi=L'(1,\chi)/L(1,\chi)$ and use the same ramp formula $g_\chi(x)=R_\chi(x)+xD_\chi$ at all real $x$. Given $Y\le Z$, let $T_\chi(Y,Z)$ consist of the two endpoints and all natural numbers $Y<n<Z$ for which $\Lambda(n)\chi(n)\ne0$. The interior knots are prime powers at which the character is nonzero.

::: {.theorem #thm-ch31-character-concave-window title="Testing a concave envelope at the endpoints and active knots" lean="D5/S3/CharacterSums/DirichletRampWindow.concave_window_iff"}
Take a positive integer modulus $N$ and a nonprincipal complex Dirichlet character $\chi$ modulo $N$. For any real $Y\le Z$ and any real-valued function $B$ concave on $[Y,Z]$, the inequality $|g_\chi(x)|\le B(x)$ holds throughout $[Y,Z]$ if and only if it holds at every point of $T_\chi(Y,Z)$.
:::

::: proof
Between consecutive test points the ramps that have already started are affine, and the ramps that start later vanish. Any term entering strictly between those points has zero coefficient. Thus the complex-valued $g_\chi$ is affine on that segment. Write an interior point as a convex combination of the two ends. The triangle inequality bounds its norm by the chord of the endpoint norms, and concavity bounds the chord of the endpoint values of $B$ by $B(x)$. If the endpoints coincide there is just one inequality to check. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-character-power-log-window title="A joint finite test for a power envelope and a logarithmic derivative" lean="D5/S3/CharacterSums/DirichletRampWindow.power_log_window_iff"}
Take the same type of modulus and character. Let $0<Y\le Z$, $0\le p\le1$, and $A,c\ge0$. Both inequalities

$$
|g_\chi(x)|\le A x^p,\qquad |D_\chi|\le c\ln x
$$

hold at every $x\in[Y,Z]$ if and only if $|g_\chi(t)|\le A t^p$ for every $t\in T_\chi(Y,Z)$ and $|D_\chi|\le c\ln Y$.
:::

::: proof
For these exponents, $x\mapsto A x^p$ is concave on the positive real axis, so [@thm-ch31-character-concave-window] applies to the first bound. In the second bound the left-hand side is constant in $x$, and $c\ln x$ is nondecreasing on the window. Its value at $Y$ therefore suffices. The full proof is checked by the Lean kernel.
:::
