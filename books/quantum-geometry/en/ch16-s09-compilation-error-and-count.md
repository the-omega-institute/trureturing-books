# 16.9 Compilation Error, Query Counts, and Asymptotic Gate Length {#sec-compilation-error-and-count}

When the initial success probability $p \in (0, 1]$ in amplitude amplification is known and we are allowed an auxiliary coin rotation `coinRotation q`, we can eliminate the integer-step overshoot of [Chapter 15](ch15-grover-qft-and-period-finding.md) completely and bound the exact number of source queries.

In `CoherentUniformAmplification`, given $J \in M_{l \times s}(\mathbb{C})$, $C, P \in M_{l \times l}(\mathbb{C})$, and $q \in \mathbb{R}$, the $2l$-dimensional auxiliary-coin block matrices are

$$
\begin{aligned}
\mathrm{coinEmbed}(J) &= \begin{pmatrix} J \\ 0 \end{pmatrix}, &\qquad
\mathrm{coinLift}(C) &= \begin{pmatrix} C & 0 \\ 0 & C \end{pmatrix}, \\
\mathrm{coinRotation}(q) &= \begin{pmatrix} \sqrt{q}\,I_l & -\sqrt{1-q}\,I_l \\ \sqrt{1-q}\,I_l & \sqrt{q}\,I_l \end{pmatrix}, &\qquad
\mathrm{coinGood}(P) &= \begin{pmatrix} P & 0 \\ 0 & 0 \end{pmatrix}.
\end{aligned}
$$

The six constructors of `AmplificationGate` are `.source`, `.sourceAdjoint`, `.coin`, `.coinAdjoint`, `.initializedReflection`, and `.goodReflection`, mapped by `gateMatrix` to $\mathrm{coinLift}(C)$, $\mathrm{coinLift}(C)^*$, $\mathrm{coinRotation}(q)$, $\mathrm{coinRotation}(q)^*$, $2 K K^* - I_{2l}$ ($K = \mathrm{coinEmbed}(J)$), and $I_{2l} - 2\,\mathrm{coinGood}(P)$. `evaluateWord J C P q w` maps `gateMatrix` over $w$ and takes `List.prod` (rightmost gate acts first); `reflectionBlock` is `[.coin, .source, .initializedReflection, .sourceAdjoint, .coinAdjoint, .goodReflection]`; `amplificationWord 0` is `[.coin, .source]` and `amplificationWord (n+1)` prepends `reflectionBlock` on the left; and `sourceQueries w` counts occurrences of `.source` plus `.sourceAdjoint` (with $w = [\mathrm{.source}]$ when $p = 1$).

::: {.corollary #cor-exact-source-query-count title="Exact Coherent Amplitude Amplification and Source-Query Upper Bound" lean="D5/S3/Quantum/Recovery/CoherentUniformAmplification.exact_coherent_amplification"}
Let $s, l$ be finite index types with decidable equality, and let $J \in M_{l \times s}(\mathbb{C})$, $C, P \in M_{l \times l}(\mathbb{C})$, and $p \in \mathbb{R}$ satisfy

$$
J^* J = 1, \quad C^* C = 1, \quad P^* = P, \quad P^2 = P, \quad
\bigl(P(CJ)\bigr)^*\bigl(P(CJ)\bigr) = (p : \mathbb{C}) \bullet (1 : M_s(\mathbb{C})), \quad 0 < p \le 1.
$$

Let

$$
\begin{aligned}
n &:= \Bigl\lceil \frac{\pi}{4\arcsin(\sqrt{p})} - \frac{1}{2} \Bigr\rceil_+, &\qquad
r &:= \sin^2\Bigl(\frac{\pi}{4(n : \mathbb{R}) + 2}\Bigr), \qquad q := \frac{r}{p}, \\
w &:= \text{if } p = 1 \text{ then } [\mathrm{AmplificationGate.source}] \text{ else } \mathrm{amplificationWord}(n), \\
V &:= \mathrm{evaluateWord}(J, C, P, q, w) \cdot \mathrm{coinEmbed}(J).
\end{aligned}
$$

Then all six clauses hold:

1. **Exact target hit**: $V = \mathrm{coinEmbed}\bigl(\mathrm{success}(CJ, P, p)\bigr)$;
2. **Zero failure block**: $\bigl(1 - \mathrm{coinGood}(P)\bigr) V = 0$;
3. **Kronecker reference identity**: for every type $z$ and matrix $R \in M_z(\mathbb{C})$,

   $$
   V \otimes_{\mathrm{K}} R = \mathrm{coinEmbed}\bigl(\mathrm{success}(CJ, P, p)\bigr) \otimes_{\mathrm{K}} R;
   $$

4. **Source-query upper bound**:

   $$
   \bigl(\mathrm{sourceQueries}(w) : \mathbb{R}\bigr) \le \frac{\pi/2 + 2}{\sqrt{p}};
   $$

5. **Unitarity of the evaluated word**: $\bigl(\mathrm{evaluateWord}(J, C, P, q, w)\bigr)^* \cdot \mathrm{evaluateWord}(J, C, P, q, w) = 1$;
6. **Branch parameters**: if $p = 1$, then $\mathrm{sourceQueries}(w) = 1$; otherwise ($0 < p < 1$),

   $$
   \begin{aligned}
   &0 < r \;\land\; r \le p \;\land\; r < 1 \;\land\; 0 < q \;\land\; q \le 1 \\
   &\land\; \bigl(2(n : \mathbb{R}) + 1\bigr)\arcsin(\sqrt{r}) = \frac{\pi}{2} \;\land\; \mathrm{sourceQueries}(w) = 2n + 1 \\
   &\land\; \bigl(\mathrm{coinRotation}(q)\bigr)^* \mathrm{coinRotation}(q) = 1 \\
   &\land\; \mathrm{success}\Bigl(\bigl(\mathrm{coinRotation}(q)\cdot\mathrm{coinLift}(C)\bigr)\cdot\mathrm{coinEmbed}(J),\, \mathrm{coinGood}(P),\, r\Bigr) = \mathrm{coinEmbed}\bigl(\mathrm{success}(CJ, P, p)\bigr).
   \end{aligned}
   $$
:::

::: proof
When $p = 1$, $w = [\mathrm{.source}]$ uses $1$ source query and $\mathrm{coinLift}(C)\cdot\mathrm{coinEmbed}(J) = \mathrm{coinEmbed}(\mathrm{success}(CJ, P, 1))$. When $0 < p < 1$, choosing $n = \lceil \frac{\pi}{4\arcsin\sqrt{p}} - \frac{1}{2}\rceil_+$ ensures $0 < r = \sin^2(\frac{\pi}{4n+2}) \le p < 1$ and $0 < q = r/p \le 1$. The modified preparation $U_q = (\mathrm{coinRotation}(q)\cdot\mathrm{coinLift}(C))\cdot\mathrm{coinEmbed}(J)$ has success Gram matrix $q p I_s = r I_s$ and normalized success block $\mathrm{coinEmbed}(\mathrm{success}(CJ, P, p))$. Since $(2n + 1)\arcsin(\sqrt{r}) = \frac{\pi}{2}$, applying [@thm-grover-uniform-rotation] to $U_q$ at step $n$ gives $\sin(\pi/2) = 1$ and $\cos(\pi/2) = 0$, proving $V = \mathrm{coinEmbed}(\mathrm{success}(CJ, P, p))$ and $(1 - \mathrm{coinGood}(P))V = 0$. Finally, $\mathrm{amplificationWord}(n)$ contains $1 + 2n$ occurrences of `.source` and `.sourceAdjoint`, and $n < \frac{\pi}{4\arcsin\sqrt{p}} + \frac{1}{2}$ with $\arcsin\sqrt{p} \ge \sqrt{p}$ bounds $2n + 1 \le \frac{\pi/2 + 2}{\sqrt{p}}$. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch16-slowed-steps"}
**Slow each step a little and whole steps land exactly on the target.** For $p = 1/16$ and $n = 3$: on the left, three violet steps of the original size $\theta \approx 14.48^\circ$ carry the amber arrow past the success direction $W$, overshooting by the magenta $11.3^\circ$; on the right, the coin slows each step to $\theta_r = \pi/14 = 180^\circ/14$, and the same three steps put the amber arrow exactly on $W$, since $(2n+1)\theta_r = \pi/2$; see [@cor-exact-source-query-count].
:::

**Critical distinction (Figure 16, Panel III)**: `sourceQueries(w)` in [@cor-exact-source-query-count] counts **only** `.source` and `.sourceAdjoint` calls ($1$ for $p = 1$, $2n + 1$ for $p < 1$) using the continuous coin rotation `coinRotation q` for known $p$; it is not the total gate count and **must never be confused with the Solovay–Kitaev $\{H, T\}$ compilation gate length**.

Let us now check, in one four-step worked example, the Chebyshev values at $x = 1/2$, the exact sphere vertices of the $\{H, T\}$ gate set for $L = 0, 1, 2, 3$ together with the support gaps of the inscribed polytope, and the exact source-query counts for $p = 1/4, 1/16, 1/64$.

::: {.example #ex-finite-ht-polytope title="Chebyshev Recurrence at x=1/2, the Five-Vertex L=3 {H,T} Polytope, and Exact Source-Query Counts"}
This example provides a four-part numerical verification:

**Step 1: Chebyshev recurrence at $x = 1/2 = \cos(\pi/3)$ and $W(1/2)^3 = -I_2$.**
With $a = e^{i\pi/3}$, $b = e^{-i\pi/3}$ ($ab = 1$, $a + b = 2x = 1$), [@thm-chebyshev-trace-recurrence] gives $t_0 = 2$, $t_1 = 1$, $t_2 = 1(1) - 2 = -1$, and $t_3 = 1(-1) - 1 = -2$, matching $T_3(1/2) = 4(1/2)^3 - 3(1/2) = -1 = t_3/2$ and $W(1/2)^3 = \begin{pmatrix} 1/2 & i\sqrt{3}/2 \\ i\sqrt{3}/2 & 1/2 \end{pmatrix}^3 = -I_2$.

**Step 2: Exact $\{H, T\}$ orbit $\mathcal{S}_L$ for $L = 0, 1, 2, 3$ from $\vv{r}_0 = \vv{e}_z$.**
On $\mathbb{R}^3$, $R_H(x, y, z) = (z, -y, x)$ and $R_T(x, y, z) = \bigl(\frac{x - y}{\sqrt{2}}, \frac{x + y}{\sqrt{2}}, z\bigr)$. Starting from $\mathcal{S}_0 = \{\vv{e}_z\}$, each layer applies $R_H$ and $R_T$ to every point of the previous layer and keeps the old points ($\mathcal{S}_L = \mathcal{S}_{L-1} \cup R_H(\mathcal{S}_{L-1}) \cup R_T(\mathcal{S}_{L-1})$):

- $L = 0$ ($1$ point, a single point): $\mathcal{S}_0 = \{\vv{e}_z\}$;
- $L = 1$ ($2$ points, a segment): $R_T\vv{e}_z = \vv{e}_z$ (the North Pole is fixed by $T$), and only $R_H\vv{e}_z = (1, 0, 0) = \vv{e}_x$ is new, so $\mathcal{S}_1 = \{\vv{e}_z,\, \vv{e}_x\}$;
- $L = 2$ ($3$ points, a planar triangle): $R_H$ sends $\vv{e}_x$ back to $\vv{e}_z$, while $R_T$ produces the equatorial $45^\circ$ point $\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}} = (\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0)$, so $\mathcal{S}_2 = \{\vv{e}_z,\, \vv{e}_x,\, \frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}}\}$;
- $L = 3$ ($5$ points, first full-dimensional hull): on the new point, $R_T\bigl(\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}}\bigr) = (0, 1, 0) = \vv{e}_y$ and $R_H\bigl(\frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}}\bigr) = (0, -\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}) = \frac{\vv{e}_z - \vv{e}_y}{\sqrt{2}}$, so $\mathcal{S}_3 = \bigl\{\vv{e}_z,\, \vv{e}_x,\, \frac{\vv{e}_x + \vv{e}_y}{\sqrt{2}},\, \vv{e}_y,\, \frac{\vv{e}_z - \vv{e}_y}{\sqrt{2}}\bigr\}$.

Thus the point counts for $L = 0, 1, 2, 3$ are **$1, 2, 3, 5$**. At $L = 3$, $P_3 = \operatorname{conv}(\mathcal{S}_3)$ becomes $3$-dimensional for the first time, and $0 \notin \operatorname{int}(P_3)$ because all five vertices satisfy $x \ge 0$ and $z \ge 0$ (Figure 16, Panel II illustrates a larger-$L$ polyhedral hull rather than claiming these five points enclose the origin).

**Step 3: Support gap of $P_3$ and chordal facet gap of the reference regular octahedron.**
On $\mathcal{S}_3$, the support maximum in direction $+\vv{e}_y$ is $1$, whereas in direction $-\vv{e}_x$ it is $0$, leaving a directional support gap of $1 - 0 = 1$ against $S^2$; hence $L = 3$ is not an all-direction small-error approximation. For an independent reference octahedron $\operatorname{conv}\{\pm\vv{e}_x, \pm\vv{e}_y, \pm\vv{e}_z\}$ (not claiming all six axial poles are reached at $L = 3$), the facet normal $\vv{n} = (1, 1, 1)/\sqrt{3}$ has support height $1/\sqrt{3}$ and radial gap $1 - 1/\sqrt{3} \approx 0.4226497308103742$.

**Step 4: Exact source-query staircase for $p = 1/4, 1/16, 1/64$ from [@cor-exact-source-query-count].**

| Initial Probability $p$ | Step Count $n$ | $\mathrm{sourceQueries} = 2n+1$ | Modified $r = \sin^2\bigl(\frac{\pi}{4n+2}\bigr)$ | Coin Ratio $q = r/p \in (0, 1]$ | Bound $\dfrac{\pi/2 + 2}{\sqrt{p}}$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $1/4 = 0.25$ | $1$ | $3$ | $0.25$ | $1$ | $\approx 7.14159265$ |
| $1/16 = 0.0625$ | $3$ | $7$ | $\approx 0.049515566048790434$ | $\approx 0.7922490567806469$ | $\approx 14.28318531$ |
| $1/64 = 0.015625$ | $6$ | $13$ | $\approx 0.014529091286973985$ | $\approx 0.9298618423663351$ | $\approx 28.56637061$ |

Each row satisfies $0 < q \le 1$, $(2n+1)\arcsin\sqrt{r} = \pi/2$, and $2n + 1 \le \frac{\pi/2 + 2}{\sqrt{p}}$. This counts amplitude-amplification source queries for known $p$, not Solovay–Kitaev compilation gate counts.
:::

::: {.viz src="gate-word-polytope" preset="three" height="500"}
**Length 3: five vertices, the centre outside.** The five cyan vertices of the example enclose a solid for the first time, but all of them lie where $x \ge 0$ and $z \ge 0$. The amber target points to $-\vv{e}_x$: the nearest vertex is $90^\circ$ away, the support height is $h = 0$, and the magenta radial gap runs from the centre all the way to the sphere, a full $1$, as computed in the third step.
:::

<!-- alias: #rem-qsvt-solovay-kitaev-literature -->
::: {.remark #rem-solovay-kitaev-literature title="The Solovay–Kitaev Compilation Theorem and Polylogarithmic Gate Length (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** When compiling arbitrary single-qubit gates into words over a finite discrete gate set, the asymptotic gate length is bounded above by the **Solovay–Kitaev theorem** (see C. M. Dawson and M. A. Nielsen, *The Solovay–Kitaev algorithm*, Quantum Inf. Comput. **6**, 81–95, 2006, arXiv:quant-ph/0505030):

1. **Polylogarithmic gate length $L = O(\log^c(1/\varepsilon))$**: For any finite, inverse-closed gate set $\mathcal{G} \subset \mathrm{SU}(2)$ generating a dense subgroup of $\mathrm{SU}(2)$, every target $U \in \mathrm{SU}(2)$ and sufficiently small $\varepsilon > 0$ admit an approximating word $w \in \mathcal{G}^*$ of length $L = O(\log^c(1/\varepsilon))$ within operator error $\varepsilon$. In the Dawson–Nielsen recursion built from group commutators, each level glues $5$ approximating words of the previous level into a correction that raises the precision from $\varepsilon_{k-1}$ to $\varepsilon_k = O(\varepsilon_{k-1}^{3/2})$, which gives the exponent $c = \ln 5 / \ln(3/2) \approx 3.97$ (the hidden constants depend on the gate set and the chosen error metric). This $c$ is only the exponent of the Dawson–Nielsen construction, not the optimal order for $\{H, T\}$: for the Clifford+T gate set, number-theoretic synthesis gives word length $O(\log(1/\varepsilon))$ directly (P. Selinger, *Efficient Clifford+T approximation of single-qubit operators*, arXiv:1212.6253; N. J. Ross and P. Selinger, *Optimal ancilla-free Clifford+T approximation of z-rotations*, Quantum Inf. Comput. **16**, 901–953, 2016); and since there are only exponentially many words of length at most $L$ while covering the three-dimensional $\mathrm{SU}(2)$ takes about $\varepsilon^{-3}$ balls of radius $\varepsilon$, every finite gate set needs worst-case length $\Omega(\log(1/\varepsilon))$, so the Clifford+T order is $\Theta(\log(1/\varepsilon))$.
2. **Inverse closure of $\{H, T\}$ and projective lifts**: Because $H^{-1} = H$ and $T^{-1} = T^7$ in $\mathrm{PU}(2)$ (with unimodular $\mathrm{SU}(2)$ lifts $\tilde{H} = iH, \tilde{T} = e^{-i\pi/8}T$, for which $\tilde{H}^{-1} = -\tilde{H} = \tilde{H}^3$ and $\tilde{T}^{-1} = -\tilde{T}^7 = \tilde{T}^{15}$, the central signs $\pm I_2$ being tracked consistently), inverses cost a constant factor, so the projective compilation problem inherits the $O(\log^c(1/\varepsilon))$ scaling up to constant prefactors.
3. **Scaling of the group commutator**: In $\exp(A)\exp(B)\exp(-A)\exp(-B) = \exp([A, B] + O(\norm{A}^3 + \norm{B}^3))$, choosing $A, B = O(\sqrt{\varepsilon})$ produces a correction $[A, B]$ of order $O(\varepsilon)$ with residual $O(\varepsilon^{3/2})$ (one must never misstate the commutator as linear in an $O(\varepsilon)$ step).
4. **Nonzero worst-case finite-$L$ residual**: The Solovay–Kitaev theorem is an asymptotic scaling theorem as $\varepsilon \to 0$; while discrete gate words already belonging to $\mathcal{W}_{\le L}$ (such as $I, H, T$) trivially have zero error at depth $L$, the worst-case covering radius across the continuous group or sphere remains strictly positive ($\varepsilon_L > 0$) at every finite word length $L < \infty$, so worst-case target gates outside $\mathcal{W}_{\le L}$ always incur a nonzero compilation residual; nor does the theorem equate the single-state $S^2$ covering radius $\varepsilon_L$ with full $\mathrm{SU}(2)/\mathrm{PU}(2)$ operator compilation.
:::

::: {.viz src="gate-word-polytope" preset="shrink" height="500"}
**The largest hole shrinks step by step and never closes.** The length runs from $0$ to $20$: the cyan reachable points grow denser layer by layer, and the largest empty cap circled in dashed magenta shrinks from $180^\circ$ to $\varepsilon_{20} = 9.10^\circ$, not at all at some layers; at $L = 20$ there are $971$ points, and the hole is still there. The magenta staircase beside the sphere is the covering radius $\varepsilon_L$ the page computes for each $L$ (amber at $L = 20$), with no asymptotic rate fitted; the asymptotic word length is the literature result of [@rem-solovay-kitaev-literature].
:::

With this chapter, Part IV (*Higher-Dimensional Spheres — Entanglement, Topology, and Quantum Algorithms*) is complete. Across Chapters 13 through 16, we have traced how quantum geometry rises from single spheres to bipartite correlation sectors, stabilizer subspaces, invariant-plane rotations, Fourier annihilator lattices, and finite-word inscribed polytopes $P_L$ whose positive residual $\varepsilon_L > 0$ leaves the door open to Parts V and VI — spacetime and observer complexity, incompleteness diagonal escape, and self-referential cosine fixed points (whose classical analytic and number-theoretic properties are recorded in [Chapter 24](ch24-cosine-fixed-points-and-self-reference.md), [@rem-banach-dottie-hairy-ball-literature]).

::: {.viz src="gate-word-polytope" height="560"}
**The gate-word polytope lab.** Drag the rail to change the length $L$, drag the amber target on the sphere, or switch to the worst direction: cyan is where the $\{H, T\}$ words of length at most $L$ land, and their hull; magenta is the arc to the nearest reachable point, the radial gap and the empty cap. The green box is [@prop-two-axis-finite-word], as the continuous-axis contrast; everything else is the page's numbers.
:::
