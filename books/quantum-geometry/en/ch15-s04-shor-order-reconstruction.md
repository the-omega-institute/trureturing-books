# 15.4 Finite Period Sampling and Order Reconstruction in Shor’s Algorithm {#sec-shor-order-reconstruction}

Applying [@prop-finite-character-cancellation] to an arbitrary function $f : \mathrm{ZMod}\,m \to \mathbb{C}$ yields the **finite Poisson summation formula**.

Be careful to note the exact Fourier convention used by Mathlib's `ZMod.dft` in the source file: `ZMod.dft f` is the **unnormalized, negative-exponent** discrete Fourier transform

$$
(\mathrm{ZMod.dft}\,f)(k) = \sum_{x \in \mathrm{ZMod}\,m} \exp\Bigl(-\frac{2\pi i x k}{m}\Bigr)\,f(x) = \sum_{x \in \mathrm{ZMod}\,m} \mathrm{character}(-k)(x)\,f(x).
$$

One must never silently replace `ZMod.dft` with the physics convention $\mathcal{F}_+(f)(k) = \frac{1}{\sqrt{m}}\sum_x \exp(+2\pi i k x / m)f(x)$ without accounting for the $1/\sqrt{m}$ factor and the sign reversal $k \leftrightarrow -k$ (though because $\mathrm{annihilator}(H)$ is an additive subgroup, $k \in \mathrm{annihilator}(H) \iff -k \in \mathrm{annihilator}(H)$, leaving the sum over $\mathrm{annihilator}(H)$ invariant).

When the period $r$ divides the register size $Q$, the finite Poisson summation formula ([@cor-finite-poisson-period]) transforms a position comb $H$ of spacing $r$ into the dual frequency comb $H^\perp$ of spacing $Q/r$: every off-comb frequency cancels identically, leaving uniform probability on $r$ sharp peaks. For $Q = 32$ and $r = 8$, the position comb $H = \{0, 8, 16, 24\}$ has only $4$ cells, while its annihilator $H^\perp = \{0, 4, 8, \dots, 28\}$ holds $8$ frequencies spaced $Q/r = 4$ apart.

::: {.viz src="phase-gears" preset="dual" height="500"}
**The peaks are $Q/r$ apart, not $r$.** $Q = 32$ and period $r = 8$: the cyan comb $H = \{0, 8, 16, 24\}$ on the register has only $4$ cells, $8$ apart; after the sweep the spectrum keeps $8$ equal bars, each $\frac{1}{8}$, at $0, 4, 8, \dots, 28$, exactly the $8$ frequencies of $H^\perp$, spaced $Q/r = 4$ apart. At $k = 4$ the four cyan arrows all point right and the chain has length $4$; $\lvert H\rvert \cdot \lvert H^\perp\rvert = 4 \cdot 8 = 32$ ([@cor-finite-poisson-period]). In the example, $Q = 16$ and $r = 4$ happen to give $r = Q/r = 4$, so the two combs coincide.
:::

When $r$ does not divide $Q$, the ideal frequencies $sQ/r$ fall between integer grid points so phase cancellation is no longer exact and each peak spreads into neighboring cells; even so, most of the mass stays concentrated near $sQ/r$, allowing continued-fraction expansion of the observed ratio $k/Q$ to surface candidate periods.

::: {.viz src="phase-gears" preset="leak" height="500"}
**When the period does not divide, the peaks spread.** $Q = 64$ and period $6$: the magenta marks $sQ/r$ fall between integers at $10.67$, $21.33$ and so on, and each peak spreads over neighbouring cells — $k = 11$ has $0.115$, $k = 10$ only $0.026$, and the six cells nearest $sQ/r$ carry $0.80$ together; the continued fraction of the amber-framed $k = 11$ reads $\frac{1}{6}$. This card specifies no actual modulus and base with which to check $N^2\le Q$, so its concentration and reading remain a numerical teaching example. The conditional membership theorems in [Appendix K](appendix-k.md) do not certify this card's last-convergent rule or identify its conditioned-comb peak heights with the actual marginal probabilities.
:::

The full formal derivations for exact non-dividing counting marginals, continued-fraction observation events, and executable order-and-factor certificates are collected in [Appendix K](appendix-k.md) ([§K.1](ch15-s04-s01-phase-sampling.md)–[§K.3](ch15-s04-s03-executable-order.md)). Next, we step directly through complete hand calculations for Grover, QFT, and Shor:

- [15.4.1 Worked calculations for Grover, QFT, and Shor](ch15-s04-s04-worked-algorithms.md)
