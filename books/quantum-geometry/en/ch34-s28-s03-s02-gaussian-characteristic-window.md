# M.2.4 From a characteristic function to a short-interval bound {#from-a-characteristic-function-to-a-short-interval-bound}

A bound on the characteristic function of a perturbed frequency difference can control the probability of a near-collision. The following estimates apply to any finite measure $\mu$ on $\mathbb R$. Write $\chi(t)=\int e^{itx}\,d\mu(x)$ and $W=\{x:|x-b|\le r\}$ for any real $r$.

::: {.theorem #thm-ch31-gaussian-characteristic-window title="Gaussian bound for a closed window" lean="D5/S3/Fourier/Concentration/GaussianCharacteristicWindow.measureReal_closedWindow_le_gaussian_charFun"}
For any smoothing scale $s>0$, define

$$
G(b,s)=\int_{\mathbb R}e^{-t^2}e^{-2itb/s}\chi(2t/s)\,dt.
$$

Then

$$
\sqrt\pi\,\mu(W)\le e^{(r/s)^2}|G(b,s)|,\qquad |G(b,s)|\le\int_{\mathbb R} e^{-t^2}|\chi(2t/s)|\,dt.
$$
:::

::: proof
The function $\exp((r/s)^2)\exp(-((x-b)/s)^2)$ is at least one on $W$ and nonnegative everywhere. Express the second factor by integrating $e^{-t^2}\exp(2it(x-b)/s)$ against $dt$ and dividing by $\sqrt\pi$. The product integrand has absolute value $e^{-t^2}$. Finiteness of $\mu$ permits Fubini. The inner $\mu$-integral is $e^{-2itb/s}\chi(2t/s)$. The triangle inequality removes the phase factor in the second bound. A unit atom at a window endpoint gives equality in the first bound. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-quadratic-characteristic-window title="Linear window bound from a reciprocal quadratic" lean="D5/S3/Fourier/Concentration/GaussianCharacteristicWindow.measureReal_closedWindow_le_of_quadratic_charFun"}
If $r>0$, $k>0$ and $|\chi(t)|\le (1+kt^2)^{-1}$ for every $t\in\mathbb R$, then

$$
\mu(W)\le \frac{e^{1/2}\sqrt\pi}{\sqrt2\sqrt k}\,r.
$$
:::

::: proof
Since $e^{-t^2}\le1$, the Gaussian integral of the modulus is at most the integral of $(1+(2\sqrt k\,t/s)^2)^{-1}$, which is $\pi s/(2\sqrt k)$. Taking $s=\sqrt2 r$ gives $(r/s)^2=1/2$ and yields the stated bound. The full proof is checked by the Lean kernel.
:::

For an independent uniform perturbation with coefficient square sum $S>0$, a reciprocal quadratic with $k=S/15$ gives a bound proportional to $r/\sqrt S$. To use it in the simultaneous collision estimates, the characteristic function and the weighting of degree-vector pairs must refer to the same product probability law. A statement about the actual ζ ordinates still needs an arithmetic estimate at the prescribed resolution.
