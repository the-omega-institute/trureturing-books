# 15.4 Finite Period Sampling and Order Reconstruction in Shor’s Algorithm {#sec-shor-order-reconstruction}

Applying [@prop-finite-character-cancellation] to an arbitrary function $f : \mathrm{ZMod}\,m \to \mathbb{C}$ yields the **finite Poisson summation formula**.

Be careful to note the exact Fourier convention used by Mathlib's `ZMod.dft` in the source file: `ZMod.dft f` is the **unnormalized, negative-exponent** discrete Fourier transform

$$
(\mathrm{ZMod.dft}\,f)(k) = \sum_{x \in \mathrm{ZMod}\,m} \exp\Bigl(-\frac{2\pi i x k}{m}\Bigr)\,f(x) = \sum_{x \in \mathrm{ZMod}\,m} \mathrm{character}(-k)(x)\,f(x).
$$

One must never silently replace `ZMod.dft` with the physics convention $\mathcal{F}_+(f)(k) = \frac{1}{\sqrt{m}}\sum_x \exp(+2\pi i k x / m)f(x)$ without accounting for the $1/\sqrt{m}$ factor and the sign reversal $k \leftrightarrow -k$ (though because $\mathrm{annihilator}(H)$ is an additive subgroup, $k \in \mathrm{annihilator}(H) \iff -k \in \mathrm{annihilator}(H)$, leaving the sum over $\mathrm{annihilator}(H)$ invariant).

- [15.4.1 Actual counting distributions and phase sampling](ch15-s04-s01-phase-sampling.md)
- [15.4.2 Continued-fraction candidates and observation events](ch15-s04-s02-continued-fraction-candidates.md)
- [15.4.3 Executable order recovery and factor certificates](ch15-s04-s03-executable-order.md)
- [15.4.4 Worked calculations for Grover, QFT, and Shor](ch15-s04-s04-worked-algorithms.md)
