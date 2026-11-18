# 15.3 Finite Character Orthogonality and Nonresonant Cancellation {#sec-period-frequency-cancellation}

Once a periodic subgroup $H \le \mathrm{ZMod}\,m$ ($m \in \mathbb{N}$ with `[NeZero m]`) has been imprinted into a quantum register, why does a Fourier transform annihilate every non-resonant frequency?

The mechanism is **finite character orthogonality** (Figure 15, Panel III). In `D5/S3/Fourier/FinitePoisson.lean`, for each frequency $k \in \mathrm{ZMod}\,m$, the additive character is `character k = ZMod.stdAddChar.mulShift k`, given explicitly by

$$
\mathrm{character}(k)(x) = \chi_k(x) = \exp\Bigl(+\frac{2\pi i k x}{m}\Bigr) \qquad (x \in \mathrm{ZMod}\,m).
$$

For any additive subgroup $H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$, its **annihilator subgroup (dual resonant lattice)** is

$$
\mathrm{annihilator}(H) = H^\perp = \bigl\{k \in \mathrm{ZMod}\,m \;\big|\; \forall h \in H,\; \mathrm{character}(k)(h) = 1\bigr\}.
$$

Summing $\mathrm{character}(k.1)(x)$ over all $k \in \mathrm{annihilator}(H)$ yields exact constructive alignment on $H$ and exact destructive cancellation outside $H$.

::: {.proposition #prop-finite-character-cancellation title="Character Sum Orthogonality over the Annihilator Subgroup" lean="D5/S3/Fourier/FinitePoisson.sum_annihilator_character"}
Let $m \in \mathbb{N}$ with `[NeZero m]`, let $H : \mathrm{AddSubgroup}(\mathrm{ZMod}\,m)$ be an additive subgroup, and let $x \in \mathrm{ZMod}\,m$. Then

$$
\sum_{k : \mathrm{annihilator}(H)} \mathrm{character}(k.1)(x) = \begin{cases} \bigl(\mathrm{Fintype.card}(\mathrm{annihilator}(H)) : \mathbb{C}\bigr) & \text{if } x \in H, \\ 0 & \text{if } x \notin H. \end{cases}
$$
:::

::: proof
If $x \in H$, then $\mathrm{character}(k.1)(x) = 1$ for every $k \in \mathrm{annihilator}(H)$ by definition, so the sum of $1$ over $\mathrm{annihilator}(H)$ equals $(\mathrm{Fintype.card}(\mathrm{annihilator}(H)) : \mathbb{C})$. If $x \notin H$, Pontryagin duality for the finite cyclic group $\mathrm{ZMod}\,m$ provides $k_0 \in \mathrm{annihilator}(H)$ with $\mathrm{character}(k_0.1)(x) \neq 1$. Reindexing the finite sum by the translation bijection $k \mapsto k + k_0$ on $\mathrm{annihilator}(H)$ gives $\mathrm{character}(k_0.1)(x) \cdot S = S$, hence $(\mathrm{character}(k_0.1)(x) - 1)S = 0$ and $S = 0$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="phase-gears" preset="cancel" height="500"}
**Off-resonant arrows go round in a loop.** $Q = 16$, comb $\{0, 4, 8, 12\}$, $k = 1$: only the slowest gear is lit, and the four cyan arrows $1$, $i$, $-1$, $-i$ close into a square and return to the start; bar $1$ of the spectrum grows during the sweep and shrinks back to $0$ at the end ([@prop-finite-character-cancellation]).
:::

Note the normalization boundary in [@prop-finite-character-cancellation]: for $x \in H$, the sum equals the **unnormalized** cardinality $|\mathrm{annihilator}(H)|$, which cannot be read directly as probability $1$. The summation index here is $k \in H^\perp$: if the input is the normalized uniform superposition over the annihilator $H^\perp$, divide by the state normalization factor $\sqrt{|H^\perp|}$ and the unitary QFT factor $\sqrt{m}$ to obtain amplitude $\frac{|H^\perp|}{\sqrt{|H^\perp|}\sqrt{m}} = \frac{1}{\sqrt{|H|}}$ at each $x \in H$, and zero outside $H$, using $|H|\,|H^\perp| = m$. The Born probability is the squared modulus of the amplitude, so each position in $H$ has probability $1/|H|$, all others have zero, and the total is $1$. The adjacent lab cards run in the reverse direction: the input is uniform over the position subgroup $H$, so its state normalization factor is $\sqrt{|H|}$; the QFT then gives amplitude $1/\sqrt{|H^\perp|}$ and probability $1/|H^\perp|$ at each frequency in $H^\perp$.

::: {.viz src="phase-gears" preset="four" height="500"}
**Period 4 leaves four peaks.** $Q = 16$, comb $\{0, 4, 8, 12\}$: following $k = 4$, all four cyan arrows point right and the chain has length $4$, an unnormalized sum and not a probability $1$; after the sweep only the four bars at $0$, $4$, $8$ and $12$ remain, each $\frac{1}{4}$, right on the magenta marks $sQ/r$, and the other twelve are $0$.
:::
