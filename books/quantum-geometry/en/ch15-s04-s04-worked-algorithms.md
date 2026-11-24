# 15.4.1 Worked calculations for Grover, QFT, and Shor {#sec-ch15-s04-s04-worked-algorithms}

Let us now work through the four-part calculation covering Grover search at $N = 4$ and $N = 8$, the $3$-qubit QFT phase gears at $x = 5$, Shor order finding for $N = 15$, and the finite Poisson cross-check on $\mathrm{ZMod}\,16$.

::: {.example #ex-grover-four-shor-fifteen title="Grover Search for N=4 and N=8, 3-Qubit QFT Phase Gears, and Shor Order Finding for N=15: Hand Calculations and Evidence Boundaries"}
Steps 1 and 4 instantiate [@thm-grover-uniform-rotation], [@prop-finite-character-cancellation], and [@cor-finite-poisson-period]. Step 2 expands the three-qubit phases in the positive-exponent, big-endian convention with terminal bit reversal of [@thm-qft-circuit-action]. The hand-derived tensor product explains that convention without certifying every tensor identity. The passage from the true-order Good condition to both proper $\gcd(a^{r/2} \pm 1,N)$ factors in Step 3 follows from [@ex-shor-actual-unit-factors]. Complete Shor order finding and recursive factorization retain the literature and algorithmic boundaries of [@rem-grover-qft-shor-literature].

This example provides a four-part hand-calculated verification:

**Step 1: Grover search for $N = 4$ (exact 1-step hit) versus $N = 8$ (integer-step residual).**
For $N = 4$ ($l = \mathrm{Fin}\,4, s = \mathrm{Fin}\,1$) with one marked state $|0\rangle$, set $P = |0\rangle\langle 0|$, $J = |0\rangle$, and $C = H \otimes H$, so $U = CJ = |s\rangle = \frac{1}{2}(|0\rangle + |1\rangle + |2\rangle + |3\rangle)$. Here $p = \frac{1}{4}$, $\alpha = \arcsin(\sqrt{1/4}) = \frac{\pi}{6} = 30^\circ$, $W = |0\rangle$, and $B = \frac{1}{\sqrt{3}}(|1\rangle + |2\rangle + |3\rangle)$. After $n = 1$ step of $Q = (2|s\rangle\langle s| - I_4)(I_4 - 2P)$, [@thm-grover-uniform-rotation] gives

$$
Q U = \sin(3\alpha)\,W + \cos(3\alpha)\,B = \sin\Bigl(\frac{\pi}{2}\Bigr)|0\rangle + \cos\Bigl(\frac{\pi}{2}\Bigr)B = |0\rangle,
$$

an exact hit in a single step! By contrast, for $N = 8$ with one marked state ($p = 1/8$, $\theta = \arcsin(1/\sqrt{8})$), $\sin(3\theta) = 3\sin\theta - 4\sin^3\theta = \frac{5}{\sqrt{32}}$, so after $n = 1$ step the success probability is

$$
P_{\mathrm{succ}}(N=8,\, n=1) = \sin^2\Bigl(3\arcsin\frac{1}{\sqrt{8}}\Bigr) = \frac{25}{32} = 0.78125,
$$

and after $n = 2$ steps it reaches $\sin^2(5\theta) = \frac{121}{128} = 0.9453125 < 1$, illustrating the integer-step residual when $\frac{\pi}{4\theta} - \frac{1}{2} \notin \mathbb{N}$.

**Step 2: Three-qubit QFT tensor-factor ordering and phase gears at $x = 5 = (101)_2$.**
We adopt the explicit **most-significant-bit (MSB) to least-significant-bit (LSB) output tensor order**, meaning the circuit includes the final bit-reversal SWAPs. Writing the input as $x = x_2 x_1 x_0 = 4x_2 + 2x_1 + x_0$ and binary fractions as $0.b_1 \cdots b_r = \sum_{j=1}^r b_j 2^{-j}$, the unitary QFT $\mathcal{F}_+|x\rangle = \frac{1}{\sqrt{8}}\sum_{k=0}^7 e^{+2\pi i k x / 8}|k_2 k_1 k_0\rangle$ factors as

$$
\mathcal{F}_+|x_2 x_1 x_0\rangle = \frac{|0\rangle + e^{2\pi i (0.x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_1 x_0)}|1\rangle}{\sqrt{2}} \otimes \frac{|0\rangle + e^{2\pi i (0.x_2 x_1 x_0)}|1\rangle}{\sqrt{2}}.
$$

Notice that the binary fraction grows from the least significant input bit ($0.x_0 \to 0.x_1 x_0 \to 0.x_2 x_1 x_0$), while the **first output tensor factor corresponds to the most significant output bit $k_2$** (one must never conflate pre-SWAP and post-SWAP bit orders!). At $x = 5 = (101)_2$ ($x_2 = 1, x_1 = 0, x_0 = 1$), the three equatorial phase angles are:

- First factor ($0.x_0 = 0.1_2 = 1/2$): $\phi_1 = 2\pi \cdot \frac{1}{2} = \pi$;
- Second factor ($0.x_1 x_0 = 0.01_2 = 1/4$): $\phi_2 = 2\pi \cdot \frac{1}{4} = \frac{\pi}{2}$;
- Third factor ($0.x_2 x_1 x_0 = 0.101_2 = 5/8$): $\phi_3 = 2\pi \cdot \frac{5}{8} = \frac{5\pi}{4}$;

with overall normalization factor $\frac{1}{(\sqrt{2})^3} = \frac{1}{\sqrt{8}}$.

**Step 3: Order finding for $N = 15$, $a = 2$ with $Q = 16$.**
For $N = 15$ and $a = 2$, $2^x \bmod 15$ cycles through $1, 2, 4, 8$ with period $r = 4$. With register size $Q = 16$ (an exact $r \mid Q$ example), conditioning on outcome $1$ in the second register leaves the first register in $(|0\rangle + |4\rangle + |8\rangle + |12\rangle)/2$. Applying the unitary $16$-point QFT $\mathcal{F}_+$ gives amplitude $1/2$ (probability $1/4$) on $k \in \{0, 4, 8, 12\}$ and $0$ elsewhere:

- **$k = 4$ or $k = 12$**: $k/Q = 1/4$ or $3/4$ recovers $r = 4$; then $2^{r/2} = 4$, and $\gcd(4 - 1, 15) = 3$, $\gcd(4 + 1, 15) = 5$ factors $15 = 3 \times 5$;
- **$k = 0$**: yields $k/Q = 0$ and fails to recover the order;
- **$k = 8$**: yields $k/Q = 8/16 = 1/2$ with reduced denominator $2$ (a proper divisor of $r = 4$), which must be checked via $2^2 \equiv 4 \not\equiv 1 \pmod{15}$ or repeated.

**Step 4: Character-sum and Poisson cross-check on $\mathrm{ZMod}\,16$.**
In $\mathrm{ZMod}\,16$, let $H = \{0, 4, 8, 12\}$; then $H^\perp = \mathrm{annihilator}(H) = \{0, 4, 8, 12\}$. By [@prop-finite-character-cancellation], $\sum_{k \in H^\perp} \chi_k(x) = 4$ for $x \in H$ and $0$ for $x \notin H$. For the indicator $f = \mathbf{1}_H$, the unnormalized negative-exponent DFT is $\mathrm{ZMod.dft}\,\mathbf{1}_H = 4 \cdot \mathbf{1}_H$, and both sides of [@cor-finite-poisson-period] evaluate to $4 = \frac{4}{16}(4 + 4 + 4 + 4) = 4$.
:::

Look back at Step 1 of the example: for $N = 4$ a single step puts the arrow on the target.

::: {.viz src="grover-reflections" preset="four" height="500"}
**$N = 4$: one step onto the target.** With $\theta = 30^\circ$ one step turns by $60^\circ$ and the amber arrow lands exactly on the target axis $W$: the cyan shadow has length $1$, the magenta one vanishes, and bar $1$ reaches $1$.
:::

For $N = 8$ two steps still fall short, and the success probability stops at $\frac{121}{128}$.

::: {.viz src="grover-reflections" preset="eight" height="500"}
**$N = 8$: two steps still fall short.** The success probability is $\frac{25}{32}$ after step $1$ and $\frac{121}{128}$ after step $2$: the arrow stops at $5\theta \approx 103.5^\circ$, just past the vertical axis, with a magenta shadow of $-0.234$ left.
:::

In Step 3 the periodic state, after the QFT, leaves peaks only at the four frequencies $k \in \{0, 4, 8, 12\}$.

The order is then read off a peak: $k = 4$ and $12$ give the order $4$ directly, $k = 8$ gives only its proper divisor $2$, and $k = 0$ carries no information.

::: {.viz src="phase-gears" preset="read" height="500"}
**Reading the order from a peak.** The same spectrum: $k = 4$ and $12$ give $\frac{4}{16} = \frac{1}{4}$ and $\frac{12}{16} = \frac{3}{4}$, whose denominator is the order $4$; the amber-framed $k = 8$ only gives $\frac{1}{2}$, and $2$ is a proper divisor of the order that must be checked again; $k = 0$ carries nothing.
:::

::: {.remark #rem-grover-qft-shor-literature title="Grover Query Lower Bounds, Ideal QFT Counts, and the Full Shor Algorithm: Boundaries"}
<!-- alias: #rem-shor-factoring-literature -->
The chapter cites Lean results for uniform amplitude amplification, Weyl conjugation, character cancellation, and finite Poisson summation, together with the actual QFT circuit action and native event counts ([@thm-qft-circuit-action], [@thm-qft-native-event-count]), the single-phase circular tail ([@thm-qpe-circular-tail]), the actual-input marginal and pointwise bounds, rational-list length, and conditional candidate membership. Above, combining the actual mixture, the nearest-grid bound, and candidate recovery gives the single-run list-membership bound $\frac4{\pi^2}\frac{\varphi(r)}r$ when $N^2\le Q$. With an explicit independent-reset premise, a sufficient half-density bound for jointly primitive phase pairs then gives $8/\pi^4$ for the all-pairs least-common-multiple list event from exactly two observations. The positive-exponent convention reflects both observed labels; the native positive circuit acting on the same controlled state uses this corrected event as well. Separately, [@thm-half-order-family-failure-count] counts failures in any nonempty finite cyclic family; [@ex-shor-actual-unit-factors] transports this through actual-unit CRT to a uniform Good bound and proves both proper gcd factors on the same event. The list-selection rule also returns the true order exactly when the full menu contains it, carrying the two-observation membership bound over to exact-output probability; individual returns still carry no exactness flag. Item 1 and the remaining full algorithmic claims in item 3 below remain **literature results, not formalized in this book**; item 2 summarizes the cited circuit counts and their cost boundaries.

1. **Grover's algorithm and query lower bounds** (L. K. Grover, *A fast quantum mechanical algorithm for database search*, Proc. 28th ACM STOC, 212–219, 1996, [10.1145/237814.237866](https://doi.org/10.1145/237814.237866); G. Brassard, P. Høyer, M. Mosca, and A. Tapp, *Quantum amplitude amplification and estimation*, Contemp. Math. **305**, 53–74, 2002, [arXiv:quant-ph/0005055](https://arxiv.org/abs/quant-ph/0005055)): For unstructured search among $N$ candidates with a known number $M$ of marked items and the promise $1 \le M \le N/4$, start from the uniform superposition and choose the iteration count using the known initial success probability $p = M/N$. Amplitude amplification then raises the success probability to $\ge 1 - M/N$ using $O(\sqrt{N/M})$ queries to the marking oracle. Under this sparse-solution promise, any quantum black-box algorithm finding a marked item with bounded error requires $\Omega(\sqrt{N/M})$ queries (by reduction from the single-solution black-box lower bound of Bennett, Bernstein, Brassard, and Vazirani, 1997): the quadratic speedup reaches the quantum geometric limit for this oracle task.
2. **Ideal native gate count of the same QFT circuit**: [@thm-qft-native-event-count] gives $q$ Hadamards, $q(q-1)/2$ controlled phases, and $\lfloor q/2\rfloor$ SWAPs, totaling $\frac{q(q+1)}2+\lfloor q/2\rfloor$ ideal native occurrences. The usual asymptotic count is therefore $O(q^2)=O((\log Q)^2)$ for $Q=2^q$; [@thm-qft-circuit-action] gives its exact positive-exponent action on a prepared complex vector. Loading arbitrary input data, full classical Fourier-coefficient readout, synthesis of ideal phase gates over a finite discrete gate set, and hardware performance are outside this count.
3. **Shor's factoring algorithm and the full correctness conditions for order finding** (P. W. Shor, *Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer*, SIAM J. Comput. **26**, 1484–1509, 1997, [10.1137/S0097539795293172](https://doi.org/10.1137/S0097539795293172)): For a general composite $N$ that is neither even nor a prime power, and a random coprime base $a$, the multiplicative order $r$ need not divide $Q=2^q$. The full algorithm chooses $N^2\le Q<2N^2$ and prepares the corresponding joint state using a reversible modular-exponentiation circuit with $O((\log N)^3)$ elementary gates, then samples after the QFT. The single-run candidate event and the all-pairs least-common-multiple event for two independent resets above cover their respective list-membership probabilities in the actual modular-multiplication model. They do not certify a gate implementation of modular exponentiation. The subsequent list-selection application returns the true order whenever the menu contains it and bounds that exact-output event; an arbitrary passing return may still be a larger multiple of the order. The asymptotic estimate $\varphi(r)/r=\Omega(1/\log\log r)$ remains a literature result. The counting ratio in the mixture cannot be recast as an additional random-phase experiment. The classical part is now covered by [@thm-half-order-family-failure-count] and [@ex-shor-actual-unit-factors]: for odd $N>1$, uniform sampling of the full unit group gives Good probability at least $1-2^{-(k-1)}$, and at least $1/2$ when $N$ is not a prime power, since then $k\ge2$. On that same event, every natural representative of the base gives both proper factors. All actual prime-power exponents and the sampled identity are retained. This classical probability and the quantum candidate event at a fixed base use different sampling laws; they have not been combined here into an end-to-end probability for one common experiment. Efficient unit sampling, certified exact-order selection from the full candidate least-common-multiple list, guarantees for arbitrary correlated repetitions, the exact Euler product for ideal phase sampling, a complete recursive factoring implementation, and bit and gate complexity remain outside these results. Independence of the two resets is an explicit joint sampling premise; matching marginals do not imply it. (Describing period finding as “canceling an infinite period down to $1$” is a heuristic metaphor, not a formalized mathematical claim.)
:::

::: {.viz src="phase-gears" height="560"}
The full lab of phase gears and the period: change the register size $Q$, the period $r$ and the offset, and click a bar to choose a frequency $k$ and watch its phase arrows laid head to tail; when $r$ divides $Q$ and the comb is a complete coset (offset $x_0<r$), the off-resonant chains close to zero ([@prop-finite-character-cancellation]). This page's comb does not wrap: truncating it at the boundary changes peak heights and leaves off-resonant weight. When $r$ does not divide $Q$, the spectrum is still the finite sum over the comb's actual cells: in Shor's setting (offset $x_0<r$, the comb running to the end of the register, $Q \ge N^2 > r^2$) the peaks concentrate near $sQ/r$; this aggregate concentration retains its literature status, and the page's continued-fraction reading must still be checked. [@thm-shor-nearest-candidate] guarantees only candidate membership under the actual parameter, resolution, and nearestness hypotheses; a truncated comb can lose that concentration, and a single cell gives a flat spectrum.
:::

Seeing how Grover's planar rotations and the QFT's Fourier cancellation operate, two deeper questions arise: **can we unify search, phase estimation, Hamiltonian simulation, and matrix inversion under a single Chebyshev polynomial recurrence on two-dimensional blocks (Quantum Singular Value Transformation, QSVT)? And when we compile continuous rotations into finite words over a discrete gate set $\{H, T\}$, how do finite-vertex polytopes approximate the sphere?** Let us enter the concluding chapter of Part IV — [Chapter 16](ch16-qsvt-walks-and-compilation.md).
