# 31.1.3.2.1 Fourier recovery from Möbius windows {#sec-ch34-s28-s03-s02-fourier-recovery}

Logarithmic averages of the signed residual recover the arithmetic constant and the ζ zero spectrum.

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
