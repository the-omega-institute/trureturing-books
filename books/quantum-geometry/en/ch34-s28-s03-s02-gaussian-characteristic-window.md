# From a characteristic function to a short-interval bound

A bound on the characteristic function of a perturbed frequency difference can control the probability of a near-collision. The following estimates apply to any finite measure $\mu$ on $\mathbb R$. Write $\chi(t)=\int e^{itx}\,d\mu(x)$ and $W=[b-r,b+r]$ for $r>0$.

::: {.theorem #thm-ch31-gaussian-characteristic-window title="Gaussian bound for a closed window" lean="D5/S3/Fourier/Concentration/GaussianCharacteristicWindow.measureReal_closedWindow_le_gaussian_charFun"}
The mass of the window satisfies

$$
\sqrt\pi\,\mu(W)\le e\int_{\mathbb R}e^{-t^2}|\chi(2t/r)|\,dt.
$$
:::

::: proof
The function $e\exp(-((x-b)/r)^2)$ is at least one on $W$ and nonnegative everywhere. Express the Gaussian by integrating $e^{-t^2}\exp(2it(x-b)/r)$ against $dt$ and dividing by $\sqrt\pi$. The product integrand has absolute value $e^{-t^2}$. Finiteness of $\mu$ permits Fubini. The inner $\mu$-integral is $e^{-2itb/r}\chi(2t/r)$. The norm of the phase factor is one. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-quadratic-characteristic-window title="Linear window bound from a reciprocal quadratic" lean="D5/S3/Fourier/Concentration/GaussianCharacteristicWindow.measureReal_closedWindow_le_of_quadratic_charFun"}
If $k>0$ and $|\chi(t)|\le (1+kt^2)^{-1}$ for every $t\in\mathbb R$, then

$$
\mu(W)\le \frac{e\sqrt\pi}{2\sqrt k}\,r.
$$
:::

::: proof
The integral in the Gaussian bound is at most the integral of $(1+(2\sqrt k\,t/r)^2)^{-1}$, since $e^{-t^2}\le1$. The latter integral is $\pi r/(2\sqrt k)$. The full proof is checked by the Lean kernel.
:::

For an independent uniform perturbation with coefficient square sum $S>0$, a reciprocal quadratic with $k=S/15$ gives a bound proportional to $r/\sqrt S$. To use it in the simultaneous collision estimates, the characteristic function and the weighting of degree-vector pairs must refer to the same product probability law. A statement about the actual ζ ordinates still needs an arithmetic estimate at the prescribed resolution.
