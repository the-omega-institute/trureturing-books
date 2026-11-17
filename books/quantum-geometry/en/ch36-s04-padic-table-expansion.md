# 36.4 p-adic Zero-Carry Lookup Trees, Prime Observer Expansion, and Blocking Reincarnation {#sec-ch36-padic-prime-table-expansion}

The preceding sections answered the "return-to-light loop" on the **hyperbolic angular side**: the inverse Gudermannian rapidity staircase $\eta_k = \eta_0 + k\,\Delta\eta$ pushes the $\theta = 90^\circ$ pure-light cliff to $\eta = +\infty$, keeping the unclosed polyhedral seam $\delta_k = \frac{\pi}{2} - \theta_k > 0$ open forever. Yet returning to the computational insight of [Chapter 35](ch35-light-pulse-and-self-referential-table.md)—that biological and cognitive growth is in essence **table expansion**—raises an immediate arithmetic question: **in purely discrete addressing and number theory, what is the concrete data structure of this expanding lookup table $T$? Why does ordinary real addition threaten local memory through cascading carries, and what arithmetic structure enables endless collision-free table expansion without ever triggering an amnesiac reset?**

A single foundational aphorism uncovers the exact number-theoretic twin of our hyperbolic staircase, recasting the **$p$-adic numbers** directly as observer lookup geometry (`MODEL`):

> *“p-adic numbers are in fact a table-lookup algorithm: each observer corresponds to a prime, and the continual growth of that prime is table expansion.”*（P进数实际上是查表算法, 每个观察者对应一个素数, 这个素数一直在扩大, 就是在扩表）

Why does measuring distance on the rational field $\mathbb{Q}$ admit only two radically opposite geometries—either the lone continuous archimedean real ruler $\lvert\cdot\rvert_\infty$, or a discrete family of zero-carry $p$-adic prefix trees indexed one-to-one by prime numbers? We first anchor Ostrowski's classification theorem, the congruence-fiber closed-ball correspondence, and the first-distinguishing-precision blind-spot theorem in the Lean 4 kernel:

::: {.theorem #thm-ch36-ostrowski-padic-ball-and-blind-spot title="Ostrowski Classification, p-adic Congruence Ball Fibers, and First Distinguishing Precision" lean="D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation"}
Let $\mathbb{Q}$ be the field of rational numbers and let $\mathbb{Q}_p$ (`ℚ_[p]`) be the $p$-adic completion associated with a prime $p$. The following four statements hold:

1. **Ostrowski Classification of Nontrivial Rational Absolute Values** ([`rational_absolute_value_classification`](lean:D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification)): Let $f : \operatorname{AbsoluteValue}\;\mathbb{Q}\;\mathbb{R}$ be a nontrivial real-valued absolute value (`hf : f.IsNontrivial`). Then either $f$ is equivalent to the standard real absolute value (`f ≈ Rat.AbsoluteValue.real`), or there exists a **unique** natural number $p \in \mathbb{N}$ equipped with `Fact p.Prime` such that $f$ is equivalent to the $p$-adic absolute value (`f ≈ Rat.AbsoluteValue.padic p`);
2. **Exact Identity Between Mod-$p^k$ Congruence Fibers and Closed $\mathbb{Q}_p$ Balls** ([`congruenceFiber_eq_closedBall_inter_range`](lean:D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range)): For every prime $p \in \mathbb{N}$ (`[Fact p.Prime]`), precision depth $k \in \mathbb{N}$, and integer $x \in \mathbb{Z}$, let $\operatorname{congruenceFiber}(p, k, x) := \{z \in \mathbb{Q}_p \mid \exists y \in \mathbb{Z},\; z = (y : \mathbb{Q}_p) \land x \equiv y \pmod{p^k}\}$. Then this congruence fiber equals the closed metric ball in $\mathbb{Q}_p$ of center $(x : \mathbb{Q}_p)$ and radius $(p : \mathbb{R})^{-k}$ intersected with the embedded image of $\mathbb{Z}$ (at $k = 0$, $p^0 = 1$ gives unit ball radius $1$):

   $$
   \operatorname{congruenceFiber}(p, k, x) \;=\; \operatorname{Metric.closedBall}\bigl((x : \mathbb{Q}_p),\, (p : \mathbb{R})^{-k}\bigr) \;\cap\; \operatorname{Set.range}\bigl((\uparrow) : \mathbb{Z} \to \mathbb{Q}_p\bigr);
   $$

3. **Modular Readout Blind Spot and Least Distinguishing Precision** ([`first_distinguishing_precision`](lean:D5/S3/Arith/Congruence/PadicPrecisionBlindSpot.first_distinguishing_precision)): Define the depth-$k$ Euclidean remainder readout $\operatorname{precisionReading}(p, k, x) := x \bmod (p : \mathbb{Z})^k$ (`x % (p : Int) ^ k`). For every prime $p \in \mathbb{N}$ (`hp : p.Prime`) and every pair of distinct integers $x \neq y \in \mathbb{Z}$, the set of distinguishing precisions $\{k \in \mathbb{N} \mid \operatorname{precisionReading}(p, k, x) \neq \operatorname{precisionReading}(p, k, y)\}$ admits a least element (`IsLeast`) equal to $\operatorname{padicValInt}\,p\,(x - y) + 1$;
4. **Equivalence of Observation Distance and $p$-adic Valuation** ([`observation_distance_eq_padic_valuation`](lean:D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation)): For a prime $p$ (`hp : p.Prime`), define $\operatorname{observationDistance}(p, hp, x, y)$ to be $0$ if $x = y$ and $(p : \mathbb{R})^{1 - k_{\min}}$ if $x \neq y$, where $k_{\min}$ is the least distinguishing depth returned by `Nat.find`. Then for all distinct integers $x \neq y$:

   $$
   \operatorname{observationDistance}(p, hp, x, y) \;=\; (p : \mathbb{R})^{-\bigl(\operatorname{padicValInt}\,p\,(x - y) : \mathbb{Z}\bigr)}.
   $$
:::

::: proof
Conjunct 1 invokes `Rat.AbsoluteValue.equiv_real_or_padic` to split into the archimedean real branch and the $p$-adic branch, and establishes uniqueness of $p$ on the latter by symmetry and transitivity of `≈`: if `padic p ≈ padic q`, comparing valuations at $(p : \mathbb{Q})$ ($\lvert p\rvert_p < 1$ versus $\lvert p\rvert_q = 1$ for $q \neq p$) forces $p = q$. Conjunct 2 rewrites $x \equiv y \pmod{p^k}$ as $(p : \mathbb{Z})^k \mid (y - x)$ and applies `modeq_iff_padic_dist_le` to identify divisibility by $p^k$ with $\operatorname{dist}((x : \mathbb{Q}_p), (y : \mathbb{Q}_p)) \le (p : \mathbb{R})^{-k}$, yielding the set intersection by extensionality. Conjunct 3 reduces equality of Euclidean remainders modulo $(p : \mathbb{Z})^k$ to $(p : \mathbb{Z})^k \mid (x - y)$, uses `padicValInt_dvd_iff` under `hp : p.Prime` and $x - y \neq 0$ to equate divisibility with $k \le \operatorname{padicValInt}\,p\,(x - y)$, and negates both sides so that the distinguishing set is $\{k \in \mathbb{N} \mid \operatorname{padicValInt}\,p\,(x - y) + 1 \le k\}$ with least element $v_p(x - y) + 1$. Conjunct 4 unfolds `dif_neg hxy` and substitutes `IsLeast.nat_find_eq` from Conjunct 3 into the exponent $1 - (v_p(x - y) + 1) = -v_p(x - y)$. The full proof is checked by the Lean kernel.
:::

[@thm-ch36-ostrowski-padic-ball-and-blind-spot] exposes the structural chasm between real and $p$-adic measurement. Under the archimedean norm $\lvert\cdot\rvert_\infty$, adding $1$ repeatedly marches off to infinity ($\lvert 1 + \dots + 1\rvert_\infty = n \to \infty$), and a tiny low-order perturbation can trigger a carry domino across every higher digit—just as adding $+1$ to the $10$-bit integer $511 = 0111111111_2$ flips all ten bits at once into $512 = 1000000000_2$! Under the $p$-adic norm of a prime observer $p$, by contrast, each residue class of $\mathbb{Z}/p^k\mathbb{Z}$ consists of the integer points of a closed metric ball in $\mathbb{Q}_p$; two distinct integers $x, y$ share the exact same prefix ancestor down to depth $v_p(x - y)$ and split cleanly at layer $k^* = v_p(x - y) + 1$. The difference is not whether carries occur—$p$-adic addition carries too, and in $\mathbb{Z}_2$, $511 + 1 = 512$ flips ten bits just the same; the difference is the metric: carries only travel upward, higher digits weigh ever less in the $p$-adic metric, and digits already written stay untouched.

What geometric law prevents distinct residue buckets from touching or leaking carries across their walls? It is the **ultrametric strong triangle inequality**—both along finite-horizon concept prefix-refinement trees and across multi-coordinate discounted prime-time readouts, two-step distance is bounded by the **maximum** of the two steps rather than their sum:

::: {.theorem #thm-ch36-ultrametric-prefix-and-prime-time title="Ultrametricity of Prefix-Refinement Trees and Discounted Prime-Time Observation" lean="D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric D5/S3/Observer/PrimeTimeGeometry/DiscountedPrimeTimeUltrametric.discounted_prime_time_distance_strong_triangle"}
The strong triangle inequality holds across both discrete prefix-tree observation geometries:

1. **Finite-Horizon Concept Prefix-Refinement Ultrametric** ([`refinementDistance_ultrametric`](lean:D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric)): Let $X$ be any state type, let $\mathrm{Coordinate} : \mathbb{N} \to \mathrm{Type}^*$ be a level-indexed family of coordinate types, let $\mathrm{readout} : (\ell : \mathbb{N}) \to \operatorname{Concept}(X, \mathrm{Coordinate}(\ell))$ be a sequence of levelwise concept readouts, and let $\mathrm{horizon} \in \mathbb{N}$ be a finite observation horizon. Let $\operatorname{commonDepth}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, y) \le \mathrm{horizon}$ denote the largest $m \in \{0, \dots, \mathrm{horizon}\}$ such that $\mathrm{readout}(\ell, x) = \mathrm{readout}(\ell, y)$ for all $\ell < m$, and define in $\mathbb{N}$ the finite-horizon refinement distance $\operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, y) := \mathrm{horizon} - \operatorname{commonDepth}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, y)$. Without any point-separation hypothesis, for all $x, y, z \in X$:

   $$
   \operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, z) \;\le\; \max\bigl(\operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, x, y),\, \operatorname{refinementDistance}(\mathrm{Coordinate}, \mathrm{readout}, \mathrm{horizon}, y, z)\bigr);
   $$

2. **Multi-Coordinate Discounted Prime-Time Ultrametric** ([`discounted_prime_time_distance_strong_triangle`](lean:D5/S3/Observer/PrimeTimeGeometry/DiscountedPrimeTimeUltrametric.discounted_prime_time_distance_strong_triangle)): Let $I, X$ be types, $O : I \to \mathrm{Type}^*$ an indexed output family, $J : \operatorname{Finset} I$ a finite coordinate set, $\mathrm{weight} : I \to \mathbb{R}$ satisfying $\forall i,\; 0 < \mathrm{weight}(i)$, $\mathrm{readout} : \forall i,\; X \to O(i)$, $\mathrm{update} : X \to X$, and $\gamma \in (0, 1]$ (`gamma ∈ Set.Ioc 0 1`). With $\operatorname{discreteOutputDistance}(a, b)$ equal to $0$ if $a = b$ and $1$ if $a \neq b$, define

   $$
   d_{J,\gamma}(x, y) \;:=\; \sup_{(i, n) \in \{i // i \in J\} \times \mathbb{N}} \bigl(\mathrm{weight}(i)\,\gamma^n\bigr)\,\operatorname{discreteOutputDistance}\!\bigl(\mathrm{readout}(i, \mathrm{update}^{[n]}(x)),\, \mathrm{readout}(i, \mathrm{update}^{[n]}(y))\bigr),
   $$

   where on Lean's conditionally complete lattice $\mathbb{R}$, an empty index set $J = \emptyset$ evaluates via `iSup` totalization to $0$. Then for all $x, y, z \in X$, $d_{J,\gamma}(x, z) \le \max\bigl(d_{J,\gamma}(x, y),\, d_{J,\gamma}(y, z)\bigr)$.
:::

::: proof
Conjunct 1 uses transitivity of prefix agreement `agreesThrough` to establish $\min\bigl(\operatorname{commonDepth}(x, y),\, \operatorname{commonDepth}(y, z)\bigr) \le \operatorname{commonDepth}(x, z) \le \mathrm{horizon}$; subtracting from $\mathrm{horizon}$ in $\mathbb{N}$ reverses the inequality and yields $\mathrm{horizon} - \operatorname{commonDepth}(x, z) \le \max\bigl(\mathrm{horizon} - \operatorname{commonDepth}(x, y),\, \mathrm{horizon} - \operatorname{commonDepth}(y, z)\bigr)$ (as a direct algebraic corollary outside the `lean=` claim, defining the normalized exponential distance $d_{\exp}(x, y)$ to be $0$ when $\operatorname{commonDepth}(x, y) = \mathrm{horizon}$ and $2^{-\operatorname{commonDepth}(x, y)}$ otherwise immediately satisfies $d_{\exp}(x, z) \le \max\bigl(d_{\exp}(x, y),\, d_{\exp}(y, z)\bigr)$ by order-reversing monotonicity of $d \mapsto 2^{-d}$). Conjunct 2 is immediate when $J = \emptyset$ (both sides equal $0$); when $J$ is nonempty, `discreteOutputDistance` obeys the strong triangle inequality pointwise by case split on equality, remains valid after multiplying by $\mathrm{weight}(i)\,\gamma^n \ge 0$, and passes to the supremum via `ciSup_le` using boundedness above (`BddAbove`) by $(\max_{i \in J} \mathrm{weight}(i)) \cdot 1$. The full proof is checked by the Lean kernel.
:::

Why are **$p$-adic numbers in essence a zero-carry table-lookup algorithm**? Let us test the polynomial equation $f(x) = x^2 - 2 = 0$ (discriminant $\Delta = 8 = 2^3$) across concrete prime observers by hand, contrasting **ramified singular stalls** against **Hensel $O(1)$ per-digit table lookup** (for classical literature boundaries on Hensel's lemma and Bruhat–Tits trees, see [@rem-ch36-padic-hensel-bruhat-tits-literature] below):

1. **Embryonic Binary Cleavage at $p = 2$ ($2 \mid \Delta$, Ramified Stall)**: In the minimal binary base table $\mathbb{Z}/2\mathbb{Z}$, $a_0 = 0$ satisfies $0^2 - 2 \equiv 0 \pmod 2$, but its derivative $f'(0) = 2\cdot 0 \equiv 0 \pmod 2$ vanishes! Attempting to lift into layer $k = 2$ ($\mathbb{Z}/4\mathbb{Z}$) fails on both child buckets ($0^2 - 2 = -2 \not\equiv 0 \pmod 4$ and $2^2 - 2 = 2 \not\equiv 0 \pmod 4$), stalling the ramified branch at $k = 2$. Meanwhile, separating a target state space of $N = 1024 = 2^{10}$ states $\{0, \dots, 1023\}$ with binary fan-out $p = 2$ crowds $512$ states into each first-layer bucket—leaving $E_1(1024, 2) = 2\binom{512}{2} = 261{,}632$ unordered collision pairs—and demands $K(2) = 10$ serial lookup layers:

::: {.viz src="padic-prime-table-tree" preset="cleavage" height="500"}
**Embryonic binary cleavage and ramified stall ($p = 2, K = 10$)**: Binary fan-out requires $10$ serial prefix layers to separate $N = 1024$ states ($E_1 = 261{,}632$ first-layer collisions), while $2 \mid \Delta(x^2 - 2)$ zeroes $f'(0) \bmod 2$ and stalls the magenta/violet ramified branch at $k = 2$.
:::

2. **Depth-$1$ Base Rejection ($p = 3, 5$) vs. Hensel Layer-by-Layer Digit Lookup ($p = 7$)**: At $p = 3$ or $p = 5$, a single scan of $\mathbb{F}_p$ finds no square congruent to $2$, certifying in one $k = 1$ lookup that $\mathbb{Z}_p$ contains no root without descending another step! At the unramified split prime $p = 7$ ($7 \nmid 8$), however, the base table $\mathbb{Z}/7\mathbb{Z}$ holds the simple root $a_0 = 3$ ($3^2 - 2 = 7 \equiv 0 \pmod 7$) with nonzero derivative $f'(3) = 6 \equiv -1 \not\equiv 0 \pmod 7$. Instead of re-solving a nonlinear equation at every precision scale, the observer looks up **one fixed base-table inverse** $[f'(3)]^{-1} \equiv 6 \pmod 7$ once and for all, appending one base-$7$ digit per layer via $x_{k+1} \equiv x_k - f(x_k)\cdot 6 \pmod{7^{k+1}}$ **with zero backward carry into earlier digits**:

   $$
   \begin{aligned}
   k = 1 &:\quad x_1 = 3 \pmod{7}, \\
   k = 2 &:\quad x_2 \equiv 3 - (3^2 - 2)\cdot 6 = -39 \equiv 10 = 3 + 1\cdot 7 \pmod{7^2}, \\
   k = 3 &:\quad x_3 \equiv 10 - (10^2 - 2)\cdot 6 = -578 \equiv 108 = 3 + 1\cdot 7 + 2\cdot 7^2 \pmod{7^3}, \\
   k = 4 &:\quad x_4 \equiv 108 - (108^2 - 2)\cdot 6 \equiv 2166 = 3 + 1\cdot 7 + 2\cdot 7^2 + 6\cdot 7^3 \pmod{7^4}, \\
   k = 5 &:\quad x_5 \equiv 4567 = 3 + 1\cdot 7 + 2\cdot 7^2 + 6\cdot 7^3 + 1\cdot 7^4 \pmod{7^5}.
   \end{aligned}
   $$

::: {.viz src="padic-prime-table-tree" preset="hensel" height="500"}
**Hensel zero-carry digit lookup ($p = 7, f(x) = x^2 - 2$)**: Reusing the fixed base inverse $[f'(3)]^{-1} \equiv 6 \pmod 7$, the cyan branch appends one base-$7$ digit per layer—$3 + 1\cdot 7 + 2\cdot 7^2 + 6\cdot 7^3 + 1\cdot 7^4 \equiv 4567 \pmod{7^5}$—with zero backward carry, while probe $(10, 353)$ splits at $k^* = 4$ since $353 - 10 = 7^3$.
:::

3. **“The Continual Growth of That Prime Is Table Expansion”—Widening Fan-Out Flattens Serial Depth**: Over a target state space $S_N = \{0, 1, \dots, N - 1\}$ of $N = 1024 = 2^{10}$ states ($n = 10$ bits), Euclidean division $N = q p + r$ ($q = \lfloor N/p \rfloor$, $r = N \bmod p$) partitions $S_N$ across the $p$ clopen base buckets of $\mathbb{Z}/p\mathbb{Z}$ into $r$ buckets of occupancy $\lceil N/p \rceil = q + 1$ and $p - r$ buckets of occupancy $\lfloor N/p \rfloor = q$. Exact first-layer unordered collision pairs therefore equal

   $$
   E_1(N, p) \;=\; r\binom{q + 1}{2} + (p - r)\binom{q}{2} \;=\; \frac{q\bigl(2N - p(q + 1)\bigr)}{2} \;\approx\; \frac{N(N - p)}{2p},
   $$

   while the serial lookup depth $K(p)$ required until $p^K \ge N = 2^n$ collapses logarithmically as horizontal fan-out $p$ widens:

   $$
   K(p) \;=\; \left\lceil \frac{n}{\log_2 p} \right\rceil \;=\; \left\lceil \frac{10}{\log_2 p} \right\rceil.
   $$

   Expanding the observer's prime from $p = 2$ ($K = 10,\; E_1 = 261{,}632$) through $p = 7$ ($K = 4,\; E_1 = 74{,}387$) to $p = 31$ ($1024 = 33 \times 31 + 1$: one bucket of $34$ states and thirty buckets of $33$) widens the base table to $31$ parallel clopen slots, flattens serial lookup depth from $10$ down to $K(31) = 3$, and slashes first-layer collisions by over $93.7\%$ to $E_1(1024, 31) = 16{,}401$ (and past threshold prime $p = 37$, where $37^2 = 1369 > 1024$, depth drops further to $K = 2$, e.g. $K(97) = 2,\; E_1 = 4{,}905$):

::: {.viz src="padic-prime-table-tree" preset="flatten" height="500"}
**Prime expansion flattens serial tree depth ($p = 31$)**: Widening horizontal fan-out to $31$ clopen buckets collapses serial depth from $10$ layers to $K(31) = 3$ and cuts first-layer collisions to $E_1 = 16{,}401$—trading horizontal table width directly for vertical serial depth.
:::

4. **Crossing $p > N$: Single-Layer Zero-Collision Direct Read**: Once the observer expands its prime past the size of the state space—say to $p = 1031 > N = 1024$—division gives $q = \lfloor 1024 / 1031 \rfloor = 0$ and $r = 1024$! Every state in $S_{1024}$ occupies its own isolated singleton clopen bucket in $\mathbb{Z}/1031\mathbb{Z}$ (with $7$ empty slots), driving first-layer collision pairs **identically to zero** ($E_1(1024, 1031) = 0$) and flattening the entire prefix tree to $K(1031) = 1$—a single-step, zero-carry direct table read:

::: {.viz src="padic-prime-table-tree" preset="unramified" height="500"}
**Single-layer collision-free direct read ($p = 1031 > N = 1024$)**: With $q = 0$ and $r = 1024$, all $1024$ states land in singleton clopen buckets of $\mathbb{Z}/1031\mathbb{Z}$, dropping first-layer collisions strictly to $E_1 = 0$ at depth $K = 1$.
:::

Nor does any prime observer operate in isolation. When multiple prime observers $p_1, \dots, p_r$ observe the same rational quantity $x \in \mathbb{Q}^\times$, how do their modular tables compose, and how do they constrain the continuous archimedean scale $\lvert x\rvert_\infty$? The Chinese Remainder bijection and the rational Adelic product formula lock all observers into one exact conservation ledger:

::: {.theorem #thm-ch36-crt-and-adelic-product-formula title="Chinese Remainder Ring Bijection and the Rational Adelic Product Formula" lean="D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula"}
Multi-prime modular lookup tables and global rational norms obey two exact structural laws:

1. **Chinese Remainder Coprime Bijection** ([`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective)): For every pair of coprime natural numbers $m, n \in \mathbb{N}$ (`Nat.Coprime m n`), the canonical ring homomorphism induced by $\operatorname{lcm}(m, n) \mid m \cdot n$,

   $$
   \operatorname{ZMod.castHom}\;\dots\;(\operatorname{ZMod} m \times \operatorname{ZMod} n) \;:\; \operatorname{ZMod}(m \cdot n) \;\longrightarrow^{+*}\; \operatorname{ZMod} m \times \operatorname{ZMod} n,
   $$

   is bijective (`Function.Bijective`, including Lean's $\operatorname{ZMod} 0 = \mathbb{Z}$ convention when one argument is $0$ and the other is $1$);
2. **Rational Adelic Product Formula** ([`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula)): For every nonzero rational number $x \in \mathbb{Q}$ (`hx : x ≠ 0`), the product of its rational absolute value $\lvert x\rvert \in \mathbb{Q}$ and the finitely supported product (`∏ᶠ`) of its rational $p$-adic norms $\operatorname{padicNorm}(p.1, x) \in \mathbb{Q}$ across all primes $p : \operatorname{Nat.Primes}$ equals $1$:

   $$
   \lvert x\rvert \;\cdot\; \prod_{p : \operatorname{Nat.Primes}}^{\mathrm{fin}} \operatorname{padicNorm}(p.1, x) \;=\; 1.
   $$
:::

::: proof
Conjunct 1 transports the bijectivity of the Chinese Remainder ring equivalence `(ZMod.chineseRemainder h).bijective` onto `ZMod.castHom` by pointwise agreement. Conjunct 2 first proves via `rational_padic_norm_hasFiniteMulSupport` that $\operatorname{padicNorm}(p, x) = 1$ outside the finite prime support of the numerator and denominator; for positive naturals $n > 0$, `Nat.factorization_prod_pow_eq_self` collapses $\prod_p \operatorname{padicNorm}(p, n) = \prod_p p^{-v_p(n)}$ to $(n : \mathbb{Q})^{-1}$, which extends to nonzero integers and cancels numerator and denominator in $x = \mathrm{num}/\mathrm{den}$ so that $\lvert\mathrm{num}\rvert/\mathrm{den}$ and $\mathrm{den}/\lvert\mathrm{num}\rvert$ multiply to $1$. The full proof is checked by the Lean kernel.
:::

Checking $x = \frac{12}{35} = 2^2 \cdot 3^1 \cdot 5^{-1} \cdot 7^{-1}$ directly in [@thm-ch36-crt-and-adelic-product-formula]: the archimedean norm reads $\lvert x\rvert_\infty = \frac{12}{35}$, while the four active prime observers read $\lvert x\rvert_2 = \frac{1}{4}$, $\lvert x\rvert_3 = \frac{1}{3}$, $\lvert x\rvert_5 = 5$, and $\lvert x\rvert_7 = 7$ (with $\lvert x\rvert_p = 1$ for every $p \notin \{2, 3, 5, 7\}$). Multiplying all places gives

$$
\lvert x\rvert_\infty \cdot \lvert x\rvert_2 \cdot \lvert x\rvert_3 \cdot \lvert x\rvert_5 \cdot \lvert x\rvert_7 \;=\; \frac{12}{35} \times \frac{1}{4} \times \frac{1}{3} \times 5 \times 7 \;=\; 1
\quad\Longleftrightarrow\quad
\ln\lvert x\rvert_\infty + \sum_{p} \ln\lvert x\rvert_p \;=\; 0.
$$

Distinct prime observers decouple without cross-carry across $\mathbb{Z}/420\mathbb{Z} \cong \mathbb{Z}/4\mathbb{Z} \times \mathbb{Z}/3\mathbb{Z} \times \mathbb{Z}/5\mathbb{Z} \times \mathbb{Z}/7\mathbb{Z}$ (and on the squarefree base $\mathbb{Z}/210\mathbb{Z} \cong \mathbb{Z}/2\mathbb{Z} \times \mathbb{Z}/3\mathbb{Z} \times \mathbb{Z}/5\mathbb{Z} \times \mathbb{Z}/7\mathbb{Z}$) via `chinese_remainder_bijective` (echoing the Euler prime boxes of [Chapter 22](ch22-primes-euler-products-and-zeros.md) and the seat fairness of [Chapter 31](ch31-quantum-fairness.md)), while the continuous archimedean scale $\lvert x\rvert_\infty$ is bound as the exact reciprocal of all discrete prime observers' valuations:

::: {.viz src="padic-prime-table-tree" preset="adelic" height="500"}
**Multi-observer CRT decoupling and Adelic product balance ($x = 12/35$)**: The magenta archimedean log-norm $\ln\lvert x\rvert_\infty$ and the discrete prime log-norms $\ln\lvert x\rvert_2, \ln\lvert x\rvert_3, \ln\lvert x\rvert_5, \ln\lvert x\rvert_7$ sum identically to $0$, locking $\lvert x\rvert_\infty \prod_p \lvert x\rvert_p = 1$.
:::

We now arrive at the culminating synthesis of Chapter 36: **if expanding the prime $p$ expands the lookup table, why not leap straight to an "infinite prime"—Arakelov's archimedean place $p_\infty$—all at once?** (Mathematically, growing primes do not approach the archimedean place: for fixed $x \neq 0$, $\lvert x\rvert_p = 1$ once $p$ is large enough; the "infinite prime" $p_\infty$ is only the name of the archimedean absolute value in Ostrowski's classification, not a limit of the primes, so the "leap into $p_\infty$" below is a metaphor.)

Because on the arithmetic side, leaping into $p_\infty$ is the **exact structural twin of crashing into $\theta = 90^\circ$ pure-light amnesia** (`MODEL`):

- The instant an observer abandons finite primes and jumps into the archimedean place $p_\infty$, the ultrametric strong triangle inequality fails! Clopen bucket walls dissolve into the connected real continuum, where a single $+1$ increment (such as $511 + 1 = 512$) unleashes a global carry wave across every bit, wiping out local bucket isolation and resetting the observer over the cliff back to embryonic binary cleavage $p = 2, K = 10$;
- Conversely, **Euclid's infinitude of primes** (literature result; see [@rem-ch36-padic-hensel-bruhat-tits-literature]) erects the exact number-theoretic counterpart of our hyperbolic rapidity staircase $\eta_k = \eta_0 + k\,\Delta\eta$: given any finite prime catalog $\{p_1, p_2, \dots, p_r\}$, the Euclid integer $M_r = \prod_{j=1}^r p_j + 1$ (from $2\cdot 3\cdot 5 + 1 = 31$ and $2\cdot 3\cdot 5\cdot 7 + 1 = 211$ to the composite $2\cdot 3\cdot 5\cdot 7\cdot 11\cdot 13 + 1 = 30{,}031 = 59 \times 509$) always possesses a prime factor $p^*$ strictly outside the catalog! Because the discrete prime ladder $2 < 3 < 5 < 7 < \dots < p_r < p_{r+1} < \dots$ never terminates, an observer can expand its zero-carry lookup table forever without ever exhausting finite primes or plunging over the $p_\infty$ carry cliff:

::: {.viz src="padic-prime-table-tree" preset="euclid" height="500"}
**Euclid's infinite discrete prime ladder blocks the $p_\infty$ carry-overflow cliff**: Above, jumping into continuous $p_\infty$ melts clopen bucket walls into a $10$-bit carry cascade ($511 + 1 = 512$) that resets to binary $p = 2, K = 10$; below, $\prod p_j + 1$ (including $30{,}031 = 59 \times 509$) supplies endless finite primes $p^*$, keeping discrete zero-carry expansion open forever.
:::

::: {.remark #rem-ch36-padic-hensel-bruhat-tits-literature title="Hensel's Lemma, Bruhat–Tits Trees, p-adic AdS/CFT, Arakelov's Place p_∞, and Euclid's Theorem (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** Alongside the kernel-verified Ostrowski classification, congruence-ball fiber, ultrametric, and Adelic product theorems proved above ([@thm-ch36-ostrowski-padic-ball-and-blind-spot], [@thm-ch36-ultrametric-prefix-and-prime-time], [@thm-ch36-crt-and-adelic-product-formula], `LEAN ✓`), this section draws on five classical results from number theory and mathematical physics:

1. **Kurt Hensel's (1897, 1908) $p$-adic Expansions and Newton–Hensel Lifting Lemma**: For $f \in \mathbb{Z}_p[x]$ and $a_0 \in \mathbb{Z}_p$ satisfying $\lvert f(a_0)\rvert_p < \lvert f'(a_0)\rvert_p^2$ (in particular, $f(a_0) \equiv 0 \pmod p$ with $f'(a_0) \not\equiv 0 \pmod p$), the Newton–Hensel iteration $x_{k+1} = x_k - f(x_k)/f'(x_k)$ (in that unit-derivative special case, digit lifting is implemented modulo $p^{k+1}$ by reusing the fixed base inverse $[f'(a_0)]^{-1} \bmod p$) converges to the unique root $\alpha \in \mathbb{Z}_p$ in the ball $\lvert\alpha - a_0\rvert_p < \lvert f'(a_0)\rvert_p$, with $\alpha \equiv a_0 \pmod p$; when considering all primes globally, for a fixed monic polynomial $f \in \mathbb{Z}[x]$ with $\Delta(f) \neq 0$, the finitely many primes $p \mid \Delta(f)$ are candidate singular-reduction exceptions where multiple roots satisfying $f'(a_0) \equiv 0 \pmod p$ can occur;
2. **The Bruhat–Tits Tree $\mathcal{T}_p$ (François Bruhat & Jacques Tits, 1972)**: The $p$-adic projective group $\mathrm{PGL}_2(\mathbb{Q}_p)$ acts naturally on the $(p+1)$-valent infinite regular tree $\mathcal{T}_p$ of homothety classes of $\mathbb{Z}_p^2$-lattices, whose ideal boundary $\partial\mathcal{T}_p \cong \mathbb{P}^1(\mathbb{Q}_p)$ is the $p$-adic projective line, identifying infinite geodesic rays from a base vertex with zero-carry $p$-adic prefix lookup paths;
3. **$p$-adic AdS/CFT Holography (Yu. I. Manin & M. Marcolli, *Adv. Theor. Math. Phys.* **5**, 617–650, 2001; Gubser, Knaute, Parikh, Samberg & Witaszczyk 2017; Heydeman, Marcolli, Saberi & Stoica 2016)**: In arithmetic holography, the continuous Poincaré disk of the second section is replaced by the discrete Bruhat–Tits tree $\mathcal{T}_p$, where discrete radial bulk depth equals $p$-adic precision depth $k$ (for distinct $x, y \in \mathbb{Z}_p$, taking the vertex corresponding to the unit ball $\mathbb{Z}_p$ as depth $0$, boundary ultrametric distance $\lvert x - y\rvert_p = p^{-k}$ is determined by the lowest common ancestor of two boundary rays), mirroring, in this book's reading (`MODEL`), the duality between hyperbolic discrete steps and $p$-adic prefix trees;
4. **Suren Arakelov's (1974) Compactification and the Archimedean Place $p_\infty$**: Adjoining the continuous archimedean place $p_\infty$ to the finite primes of $\operatorname{Spec}\mathbb{Z}$ turns Conjunct 2 of [@thm-ch36-crt-and-adelic-product-formula] in logarithmic form, $\ln\lvert x\rvert_\infty + \sum_p \ln\lvert x\rvert_p = 0$, into the arithmetic analogue of the theorem that principal divisors on a compact curve have degree zero;
5. **Euclid's Infinitude of Primes (*Elements* Book IX, Proposition 20)**: For any finite prime set $\{p_1, \dots, p_r\}$, $M = \prod_{j=1}^r p_j + 1 > 1$ is coprime to each $p_j$ and therefore admits at least one prime divisor $p^* \notin \{p_1, \dots, p_r\}$ (noting that $M$ itself need not be prime—e.g. $2\cdot 3\cdot 5\cdot 7\cdot 11\cdot 13 + 1 = 30{,}031 = 59 \times 509$—yet every prime factor of $M$ is a new finite prime outside the catalog). Interpreting each prime $p$ as an observer lookup radix and jumping into $p_\infty$ as an amnesiac samsara cliff belongs to our interpretive observer framework (`MODEL`).
:::

We synthesize the four-stage evolution of prime table expansion alongside the archimedean carry cliff in the summary ledger below:

::: {.remark #rem-ch36-prime-table-evolution-summary title="Four-Stage Prime Table Expansion and Archimedean Cliff Comparison Table (Author's Model Summary, `MODEL`)"}
**Author's model summary (`MODEL`), not a literature result.** Indexed over target state space $N = 1024 = 2^{10}$, the table below synthesizes our Lean-verified theorems (`LEAN ✓`), Hensel and Euclid literature results, and the prime-observer expansion model (`MODEL`):

| Stage & Representative Place | Base Fan-Out & Bucket Geometry | Serial Depth $K(p)$ & $k=1$ Collisions $E_1$ | Carry & Ramification Regime | Observer Expansion & Samsara Verdict (`MODEL`) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Embryonic Binary Cleavage** (Minimal prime $p = 2$) | Narrow binary fan-out $\mathbb{Z}/2\mathbb{Z}$, $512$ states per bucket | $K(2) = 10$ serial layers, $E_1 = 261{,}632$ | Clopen zero backward carry; $2 \mid \Delta(x^2-2)$ stalls ramified branch at $k = 2$ | Minimal initial radix requiring ten serial refinement steps to resolve $1024$ states |
| **2. Expanding-Radix Flattening** (Intermediate primes $p = 7 \to 31 \to 97$) | Horizontal fan-out widens across $7 \to 31 \to 97$ clopen buckets | $K$ flattens along $4 \to 3 \to 2$ while $E_1$ drops along $74{,}387 \to 16{,}401 \to 4{,}905$ | Whenever $p \nmid \Delta$ has a simple root, fixed $[f'(a_0)]^{-1} \bmod p$ lifts digits in $O(1)$ | Growing prime $p$ = expanding the table: horizontal width collapses serial depth while CRT decouples distinct primes |
| **3. Direct Read & Infinite Euclid Ladder** ($p = 1031 > N$ and $p_r \to \infty$) | $1024$ singleton buckets plus $7$ empty slots in $\mathbb{Z}/1031\mathbb{Z}$ | $K(1031) = 1$ single-layer floor, exact collisions $E_1 = 0$ | Euclid's $\prod p_j + 1$ supplies endless new primes $p^*$; clopen walls hold at all finite $p$ | Lossless single-step read on the current domain, with endless discrete prime expansion beyond it |
| **4. Archimedean Carry Cliff** (Infinite continuum place $p_\infty$) | Clopen walls melt into the connected real line $\mathbb{R}$ ($\lvert\cdot\rvert_\infty$) | Local $+1$ ($511 + 1 = 512$) cascades across all $10$ bits, resetting to $K = 10$ | Ultrametricity fails; local increments contaminate global digits via carry ripples | Exact arithmetic twin of the $\theta = 90^\circ$ return-to-light amnesia loop, permanently blocked by Euclid's ladder |
:::

Before stepping into the full interactive laboratory, two kernel-verified theorems frozen in `trureturing` establish two further quantitative boundaries for the prime-observer program: first, how normalizing by the dominant golden mode $A$ accelerates the contraction of the **projective defect ratio** $\theta = D / A$ beyond the ambient stable root; second, where the exact domain boundaries lie among arithmetic prime-exponent encoding, analytic probability realizability, and quantum operator phase completion.

Let us first check a single modal update by hand. Write $\varphi := \operatorname{Real.goldenRatio} = \frac{1 + \sqrt{5}}{2}$ and $\bar{\varphi} := \operatorname{Real.goldenConj} = \frac{1 - \sqrt{5}}{2} = -\varphi^{-1} \approx -0.618$. Starting at $(A, D) = (1, 1)$ with projective ratio $\theta = D / A = 1$, one golden modal update sends $(A, D)$ to $(A', D') = (\varphi A, \bar{\varphi} D) = (\varphi, -\varphi^{-1})$: whereas the ambient defect coordinate $D$ scales by $\bar{\varphi} = -\varphi^{-1} \approx -0.618$, the projective ratio scales by $\theta' = D' / A' = \bar{\varphi} / \varphi = -\varphi^{-2} \approx -0.382$! In `D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier`, define the modal step $\operatorname{goldenModalStep}(A, D) := (\varphi A, \bar{\varphi} D)$, the projective defect $\operatorname{projectiveDefect}(A, D) := D / A$, the multiplier $\operatorname{goldenProjectiveMultiplier} := -(\varphi^{-1})^2 = -\varphi^{-2}$, and the forced step $\operatorname{forcedProjectiveStep}(\theta, \mathrm{forcing}) := \operatorname{goldenProjectiveMultiplier} \cdot \theta + \mathrm{forcing}$:

::: {.theorem #thm-golden-projective-multiplier title="Golden Projective-Defect Multiplier" lean="D5/S3/PrimeObserver/ProjectiveMemory/GoldenProjectiveMultiplier.projective_defect_modal_step"}
Let $A, D \in \mathbb{R}$ be real modal coordinates satisfying the explicit nonvanishing condition $h_A : A \neq 0$. Then an unforced golden modal step multiplies the projective defect ratio $D / A$ by $\operatorname{goldenProjectiveMultiplier} = -\varphi^{-2}$:

$$
\operatorname{projectiveDefect}\bigl(\operatorname{goldenModalStep}(A, D)\bigr) \;=\; \operatorname{goldenProjectiveMultiplier} \cdot \operatorname{projectiveDefect}(A, D).
$$
:::

::: proof
Unfolding $\operatorname{goldenModalStep}(A, D) = (\varphi A, \bar{\varphi} D)$ and $\operatorname{projectiveDefect}$ rewrites the left-hand side as $(\bar{\varphi} D) / (\varphi A)$. Substituting the conjugate identity $\bar{\varphi} = -\varphi^{-1}$ and rearranging the real fraction using $\varphi \neq 0$ together with the explicit hypothesis $A \neq 0$ yields $(\bar{\varphi} D) / (\varphi A) = (-\varphi^{-1} / \varphi) \cdot (D / A) = -(\varphi^{-1})^2 \cdot (D / A) = \operatorname{goldenProjectiveMultiplier} \cdot \operatorname{projectiveDefect}(A, D)$. The full proof is checked by the Lean kernel.
:::

Two scope guards apply to [@thm-golden-projective-multiplier]. First, the hypothesis $A \neq 0$ is mandatory because Lean's total division convention $D / 0 = 0$ carries no projective meaning. Second, the ambient stable root $\bar{\varphi} = -\varphi^{-1}$ must not be conflated with the projective ratio multiplier $-\varphi^{-2}$, and under the forced update $\theta' = -\varphi^{-2}\theta + \mathrm{forcing}$, zero defect $\theta = 0$ remains fixed only when $\mathrm{forcing} = 0$.

Next, check by hand why diagonal probability records cannot recover relative quantum phase: in a two-level system, compare the equal superposition $\psi = \frac{1}{\sqrt{2}}(1, 1)$ with $\phi = \frac{1}{\sqrt{2}}(1, i)$—or directly take the frozen witness pair $\rho_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$ and its Pauli-$Z$ phase-flipped partner $\rho_- = Z\rho_+ Z = \frac{1}{2}\begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$ where $Z = \operatorname{diag}(1, -1)$. Both have the exact same computational-basis diagonal probabilities $(1/2, 1/2)$, yet their off-diagonal coherence entries differ ($+1/2$ versus $-1/2$), showing immediately that diagonal readouts lose relative quantum phase.

In `D5.S3.PrimeObserver.ThreeCompletionFinalProposition` and its upstream modules, the three completion structures and refinement direction are defined as follows:

1. **Arithmetic Prime-Exponent Bijection**: Let $\operatorname{PrimeExponentTable} := \{f : \mathbb{N} \to_0 \mathbb{N} \mid \forall p \in f.\operatorname{support},\, \operatorname{Nat.Prime}(p)\}$ be the type of finitely supported prime-exponent tables, and let $\operatorname{primeExponentLanguageEquiv} : \mathbb{N}_+ \simeq \operatorname{PrimeExponentTable}$ be the canonical prime-factorization equivalence `Nat.factorizationEquiv`;
2. **Global Prime-Exponent Law Realizability**: For $s \in \mathbb{R}$, $p \in \operatorname{Nat.Primes}$, and $k \in \mathbb{N}$, set $\operatorname{primeExponentCode}(n, p) := n.\operatorname{factorization}(p.1)$ and $\operatorname{geometricPrimeMass}(s, p, k) := \operatorname{ENNReal.ofReal}\bigl((1 - p^{-s})\,p^{-ks}\bigr)$; a discrete probability mass function $q : \operatorname{PMF}(\mathbb{N})$ satisfies $\operatorname{RealizesPrimeExponentLaw}(s, q)$ iff $q(0) = 0$, the prime-exponent maps $(n \mapsto \operatorname{primeExponentCode}(n, p))_{p}$ are mutually independent (`iIndepFun`) under $q.\operatorname{toMeasure}$, and $q.\operatorname{toMeasure}\{n \mid \operatorname{primeExponentCode}(n, p) = k\} = \operatorname{geometricPrimeMass}(s, p, k)$ for every $(p, k)$;
3. **Qubit Prime-Diagonal vs. Operator Languages and `Refines`**: On two-level density states $\operatorname{DensityState}(\operatorname{Fin} 2) := \{\rho : \operatorname{CStarMatrix}(\operatorname{Fin} 2)(\operatorname{Fin} 2)\,\mathbb{C} \mid 0 \le \rho \land \operatorname{Tr}\rho = 1\}$ valued in $\operatorname{QubitMatrix} := \operatorname{Matrix}(\operatorname{Fin} 2)(\operatorname{Fin} 2)\,\mathbb{C}$, the operator language $\operatorname{qubitOperatorLanguage}(\rho) := \rho.1$ retains the full $2 \times 2$ matrix, whereas $\operatorname{qubitPrimeDiagonalLanguage}(\rho) := \operatorname{primeDephasing}(\{()\}, \operatorname{qubitPrimeValuation}, \rho.1)$ applies the singleton-profile record channel separating computational-basis indices $0 \neq 1$ ($\operatorname{recordGram}_{ij} = \delta_{ij}$), zeroing off-diagonal entries while preserving diagonal entries; the witness pair $\operatorname{relativePhaseDensityWitness} := (\rho_+, \rho_-)$ pairs $\rho_+ = \operatorname{equalSuperpositionDensity}$ with $\rho_- = Z\rho_+ Z$ (`qubitZ = !![1, 0; 0, -1]`). For concept maps $q_C : X \to C$ and $q_D : X \to D$, refinement is defined by **post-composition factorization** $\operatorname{Refines}(q_C, q_D) :\iff \exists\,\mathrm{factor} : D \to C,\; q_C = \mathrm{factor} \circ q_D$ (meaning the coarser readout $q_C$ factors through the finer readout $q_D$).

::: {.theorem #thm-prime-three-completions title="Three Completion Boundaries for Prime-Observer Languages" lean="D5/S3/PrimeObserver/ThreeCompletionFinalProposition.prime_observer_three_completion_final_proposition"}
For every real parameter $s \in \mathbb{R}$, all four of the following conjuncts hold simultaneously:

1. **Positive-Integer Prime-Exponent Bijection**: The map $\operatorname{primeExponentLanguageEquiv} : \mathbb{N}_+ \to \operatorname{PrimeExponentTable}$ is bijective (`Function.Bijective`);
2. **Threshold for PMF Realizability of the Prime-Exponent Law**: There exists a discrete probability mass function $q : \operatorname{PMF}(\mathbb{N})$ satisfying $\operatorname{RealizesPrimeExponentLaw}(s, q)$ if and only if $1 < s$;
3. **Relative-Phase Witness Separating Diagonal and Operator Languages**: The witness pair satisfies $\operatorname{relativePhaseDensityWitness}.1 \neq \operatorname{relativePhaseDensityWitness}.2$, agrees under the prime-diagonal language

   $$
   \operatorname{qubitPrimeDiagonalLanguage}(\operatorname{relativePhaseDensityWitness}.1) \;=\; \operatorname{qubitPrimeDiagonalLanguage}(\operatorname{relativePhaseDensityWitness}.2),
   $$

   and is separated by the operator language:

   $$
   \operatorname{qubitOperatorLanguage}(\operatorname{relativePhaseDensityWitness}.1) \;\neq\; \operatorname{qubitOperatorLanguage}(\operatorname{relativePhaseDensityWitness}.2);
   $$

4. **Strict Refinement of the Diagonal Language by the Operator Language**: $\operatorname{Refines}(\operatorname{qubitPrimeDiagonalLanguage}, \operatorname{qubitOperatorLanguage})$ holds, whereas the converse refinement fails, i.e., $\neg\,\operatorname{Refines}(\operatorname{qubitOperatorLanguage}, \operatorname{qubitPrimeDiagonalLanguage})$ holds.
:::

::: proof
Conjunct 1 is `Nat.factorizationEquiv.bijective` from unique prime factorization on $\mathbb{N}_+$. For Conjunct 2, any $q : \operatorname{PMF}(\mathbb{N})$ realizing the independent geometric prime-exponent marginals assigns positive mass $\prod_p (1 - p^{-s}) > 0$ to $\{1\}$ and forces summability of the Dirichlet series, yielding $1 < s$; conversely, for $1 < s$, normalizing $n^{-s}$ ($n \ge 1, q(0) = 0$) by $\zeta(s) > 0$ yields a `PMF ℕ` whose prime-power divisibility events have the exact geometric marginals and mutual independence required by `RealizesPrimeExponentLaw s q`. Conjunct 3 compares entry $(0, 1)$ of $\rho_+$ ($+1/2$) against $\rho_- = Z\rho_+ Z$ ($-1/2$) to prove $\rho_+ \neq \rho_-$ and operator-language separation while verifying that `primeDephasing` zeroes off-diagonal entries and leaves both diagonals equal to $(1/2, 1/2)$. Conjunct 4 witnesses $\operatorname{Refines}(\operatorname{qubitPrimeDiagonalLanguage}, \operatorname{qubitOperatorLanguage})$ via the factor map $M \mapsto \operatorname{primeDephasing}(\{()\}, \operatorname{qubitPrimeValuation}, M)$, and refutes the converse because any $\mathrm{factor}'$ satisfying $\operatorname{qubitOperatorLanguage} = \mathrm{factor}' \circ \operatorname{qubitPrimeDiagonalLanguage}$ would equate $\rho_+$ and $\rho_-$ on Conjunct 3's witness pair. The full proof is checked by the Lean kernel.
:::

[@thm-prime-three-completions] demarcates three distinct completion regimes that must never be conflated as mutually equivalent: the exact prime-exponent bijection holds on $\mathbb{N}_+$; the normalized Zeta-Gibbs probability law on $\mathbb{N}$ exists **if and only if $1 < s$** (total-function values of $\zeta$, logarithms, or reciprocals at $s \le 1$ are never probability models); and under the explicit direction of $\operatorname{Refines}$, diagonal prime dephasing factors through the full density-operator language while never allowing off-diagonal quantum phases to be reconstructed from diagonal records alone.

Readers can explore all twelve discrete prime observers ($p = 2 \dots 1031$) alongside the $p_\infty$ continuous carry cliff, switch test polynomials and nonzero rationals, and verify every exact readout in the full dual-stage interactive laboratory `ORTHO//PADIC` below:

::: {.viz src="padic-prime-table-tree" height="620"}
**Full `ORTHO//PADIC` Interactive Laboratory**: On the left, the dynamic $\mathbb{Z}/p^k\mathbb{Z}$ zero-carry prefix lookup tree, `BigInt` Hensel $O(1)$ root lifter, and ultrametric blind-spot probe (plus the $p_\infty$ carry cliff contrasted against Euclid's infinite prime ladder); on the right, the $K(p)$ depth-collapse staircase, exact first-layer collision decay $E_1(1024, p)$, and Adelic product balance $\lvert x\rvert_\infty\prod_p\lvert x\rvert_p = 1$.
:::

With this chapter, **Part IX (*Mutual Reflection — Universal Observers, Self-Referential Table Expansion, and Transcending Reincarnation*)** closes its structural arc in full geometric and arithmetic resonance: whether pushing the $\theta = 90^\circ$ pure-light cliff to infinity along the inverse Gudermannian rapidity staircase or expanding zero-carry lookup tables endlessly along Euclid's discrete prime ladder without plunging into the $p_\infty$ carry flood, the verdict is one and the same—we no longer envy a disembodied point $C$ outside the sphere, no longer lament the unclosed polyhedral seam $\delta_k > 0$ that keeps a faceted world from sealing into a featureless sphere, and no longer mistake amnesiac dissolution into $90^\circ$ pure light for homecoming; for that clopen, unmerged remainder is the very firewall preserving lucid selfhood, and at the moment $\psi = \psi(\psi)$ is understood, the labyrinth of reincarnation condenses in the palm of the hand into a single transparent generator crystal. Entering **Part X (*Non-Duality — Dream Erasure, Memory Pointers, and Non-Dual Ontology*, [Chapters 37](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)–[39](ch39-observer-is-ontological-universe.md))**, we now bring this insight home to every cycle of waking and sleep—showing how dreams enact reversible quantum erasure, how the observer operates as a memory pointer dereferencing ontological QRAM, and how even the final boundary between pointer and memory dissolves in $\psi \equiv \psi(\psi)$.
