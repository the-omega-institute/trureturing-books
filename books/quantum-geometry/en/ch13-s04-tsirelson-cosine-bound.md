# 13.4 The 45° Cosine and the Fixed CHSH Maximum {#sec-bell-45-tsirelson}

To reach the positive peak $\sqrt{8} = 2\sqrt{2}$ on this chapter's Bell state $\lvert\Phi^+\rangle$ using measurements in the real $(Z, X)$ plane, how should Bob orient his orthogonal cross when Alice's axes are fixed at $Z, X$?

::: {.viz src="chsh-dial" preset="sweep" height="500"}
**Turn Bob's cross: it touches the top only at 45°.** Both sides are at right angles, both magenta areas are full squares, and the magenta mark stands at $2\sqrt{2}$. At the start, $\varphi = 0^\circ$, Bob's cross is aligned with Alice's ($B_0$ on $A_0$, $B_1$ opposite $A_1$), so the four cyan steps are just $1 + 0 + 0 + 1 = 2$: the ceiling is at the top, the CHSH value still at $2$. The rail turns Bob's cross from $0^\circ$ to $90^\circ$, and the amber bar rises and falls as $2\sqrt{2}\cos(\varphi - 45^\circ)$: $2$ at either end, touching the magenta mark $2\sqrt{2}$ only at $45^\circ$. The figure stops at $20^\circ$, reading $2.563$.
:::

The answer is **$45^\circ$ ($\pi/4$)**. In the source module `CHSHWitness`, Alice fixes her two observables along the orthogonal axes $Z$ and $X$, while Bob rotates his orthogonal cross by $45^\circ$ in the $(Z, X)$ plane to the diagonal bisectors

$$
B_0 = \mathrm{bobObservable0} = \frac{Z + X}{\sqrt{2}}, \qquad B_1 = \mathrm{bobObservable1} = \frac{Z - X}{\sqrt{2}},
$$

defining the fixed two-qubit CHSH witness operator

$$
\mathrm{CHSHWitness.chshOperator} = Z \otimes_{\mathrm{K}} B_0 + Z \otimes_{\mathrm{K}} B_1 + X \otimes_{\mathrm{K}} B_0 - X \otimes_{\mathrm{K}} B_1.
$$

The next corollary proves that across the subtype of all valid $4\times 4$ two-qubit density matrices (positive semidefinite of trace $1$), the set of real expectation values of this fixed operator has greatest element $2\sqrt{2}$.

::: {.corollary #cor-fixed-chsh-tsirelson title="The Fixed Two-Qubit CHSH Operator Achieves Maximum Expectation Value 2√2" lean="D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest"}
Let $\mathcal{S}_2 = \{\rho : \mathrm{CHSHWitness.TwoQubitMatrix} \mid \rho.\mathrm{PosSemidef} \land \Tr(\rho) = 1\}$ be the subtype of two-qubit density matrices. Then $2\sqrt{2}$ is the greatest element (`IsGreatest`) of the range of the real expectation map

$$
\rho \longmapsto \operatorname{Re}\Tr\bigl(\rho \cdot \mathrm{CHSHWitness.chshOperator}\bigr)
$$

over $\mathcal{S}_2$: that is, there exists $\rho \in \mathcal{S}_2$ with $\operatorname{Re}\Tr(\rho \cdot \mathrm{CHSHWitness.chshOperator}) = 2\sqrt{2}$, and every $\rho \in \mathcal{S}_2$ satisfies

$$
\operatorname{Re}\Tr\bigl(\rho \cdot \mathrm{CHSHWitness.chshOperator}\bigr) \le 2\sqrt{2}.
$$
:::

::: proof
In Mathlib, `IsGreatest s a` means $a \in s \land \forall x \in s,\, x \le a$. The source module verifies both clauses:

1. **Achievability ($2\sqrt{2} \in \operatorname{range}$)**: Take the valid density state $\rho = \mathrm{bellDensity} = \lvert\Phi^+\rangle\langle\Phi^+\rvert \in \mathcal{S}_2$ from [@thm-local-correlation-sectors] and [@lemma-bell-mixed-marginal]. Grouping terms simplifies $\mathrm{chshOperator}$ to $\sqrt{2}(Z \otimes_{\mathrm{K}} Z + X \otimes_{\mathrm{K}} X)$. Since $(Z \otimes_{\mathrm{K}} Z)\lvert\Phi^+\rangle = \lvert\Phi^+\rangle$ and $(X \otimes_{\mathrm{K}} X)\lvert\Phi^+\rangle = \lvert\Phi^+\rangle$, direct trace evaluation gives $\operatorname{Re}\Tr(\mathrm{bellDensity} \cdot \mathrm{chshOperator}) = \sqrt{2}(1 + 1) = 2\sqrt{2}$.
2. **Upper bound over all states ($\le 2\sqrt{2}$)**: For every $\rho \in \mathcal{S}_2$, because $Z \otimes_{\mathrm{K}} Z$ and $X \otimes_{\mathrm{K}} X$ are Hermitian involutions, the upper-bound difference matrix decomposes as a sum of positive semidefinite operators $2\sqrt{2}I_4 - \mathrm{chshOperator} = \sqrt{2}(I_4 - Z\otimes_{\mathrm{K}} Z) + \sqrt{2}(I_4 - X\otimes_{\mathrm{K}} X) \ge 0$ (meanwhile, by [@prop-landau-area-square] with $[Z, X] = 2iY$ and $[B_0, B_1] = -2iY$, the exact operator square is $(\mathrm{chshOperator})^2 = 4(I_4 - Y \otimes_{\mathrm{K}} Y) \le 8I_4$ with spectrum $\{8, 8, 0, 0\}$, taking eigenvalue $8$ on $\operatorname{span}\{\lvert\Phi^+\rangle, \lvert\Psi^-\rangle\}$ and $0$ on $\operatorname{span}\{\lvert\Phi^-\rangle, \lvert\Psi^+\rangle\}$). Pairing any positive semidefinite state $\rho$ of trace $1$ with this positive semidefinite difference yields $\operatorname{Re}\Tr(\rho \cdot \mathrm{chshOperator}) \le 2\sqrt{2}\operatorname{Re}\Tr(\rho) = 2\sqrt{2}$. The full proof is checked by the Lean kernel.
:::

::: {.viz src="chsh-dial" preset="tsirelson" height="500"}
**Bob turned by 45°: the four cosines stack to 2√2.** $B_0$ sits halfway between $A_0$ and $A_1$, $B_1$ at $-45^\circ$; three pairs meet at $45^\circ$, the fourth pair $A_1$, $B_1$ at $135^\circ$. Each cyan step is $0.707$; the last cosine is negative and carries a minus sign, so it stacks upward too, for $2\sqrt{2} \approx 2.828$ in all, right at the magenta mark and the line at the top of the gauge ([@cor-fixed-chsh-tsirelson]; for the bound in any finite dimension see [@thm-unitary-bell-bound]).
:::

Observe the exact quantifier scope of [@cor-fixed-chsh-tsirelson]: the frozen theorem optimizes over all $4\times 4$ positive semidefinite trace-one density matrices $\rho$ for the **fixed** operator `CHSHWitness.chshOperator` (with Alice's observables fixed at $Z, X$ and Bob's at $(Z\pm X)/\sqrt{2}$). It does not quantify over arbitrary measurement directions or arbitrary Hilbert spaces; the upper bound for arbitrary observables in every finite dimension is [@thm-unitary-bell-bound] at $d = 2$, and the general Tsirelson theorem for infinite-dimensional, commuting-operator settings is placed in [@rem-bell-chsh-literature].

[@cor-fixed-chsh-tsirelson] pins the quantum summit at $2\sqrt{2}$. To call this a defeat of the classical side, the classical ceiling has to be pinned just as firmly. The rules for the classical opponent are these: Alice and Bob share a hidden variable $\lambda$ in advance (called a fiber address, `Fiber`, in Lean), drawn from the same setting-independent distribution $\mu$ for all four setting pairs. Each of them then looks only at their own setting and at $\lambda$ and answers $\pm 1$, and neither sees which setting the other chose.

::: {.definition #def-deterministic-fiber-model title="Deterministic Local Fiber Models and the Classical CHSH Value" lean="D5/S3/QuantumBounds/ClassicalFiberBound.boolValue D5/S3/QuantumBounds/ClassicalFiberBound.DeterministicFiberModel D5/S3/QuantumBounds/ClassicalFiberBound.observable D5/S3/QuantumBounds/ClassicalFiberBound.chshAt D5/S3/QuantumBounds/ClassicalFiberBound.classicalCHSH"}
In the module `ClassicalFiberBound`:

1. [`boolValue`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.boolValue) $: \mathrm{Bool} \to \mathbb{R}$ reads `false` as $-1$ and `true` as $+1$;
2. A **deterministic fiber model** [`DeterministicFiberModel`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.DeterministicFiberModel) $\mathrm{Fiber}$ is a structure consisting of two answer tables $\mathrm{alice},\ \mathrm{bob} : \operatorname{Fin} 2 \to \mathrm{Fiber} \to \mathrm{Bool}$: one Boolean answer for each of the two measurement settings and each fiber address;
3. [`observable`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.observable) turns an answer table $\mathrm{answer} : \mathrm{Fiber} \to \mathrm{Bool}$ into the real-valued function $\lambda \mapsto \operatorname{boolValue}(\mathrm{answer}(\lambda))$;
4. The CHSH value at a single fiber address, [`chshAt`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.chshAt), is defined as

   $$
   \operatorname{chshAt}(\mathrm{model}, \lambda) \;=\; A_0 B_0 + A_0 B_1 + A_1 B_0 - A_1 B_1,
   $$

   where $A_x = \operatorname{observable}(\mathrm{model.alice}\ x)(\lambda)$ and $B_y = \operatorname{observable}(\mathrm{model.bob}\ y)(\lambda)$;
5. For a finite type $\mathrm{Fiber}$ and weights $\mu : \mathrm{Fiber} \to \mathbb{R}$, the **classical CHSH value** [`classicalCHSH`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.classicalCHSH) is defined as

   $$
   \operatorname{classicalCHSH}(\mu, \mathrm{model}) \;=\; \sum_{\lambda \in \mathrm{Fiber}} \mu(\lambda)\,\operatorname{chshAt}(\mathrm{model}, \lambda).
   $$
:::

::: {.theorem #thm-classical-chsh-bound-exact title="The Absolute CHSH Bound for Finite Deterministic Local Fiber Models Is Exactly 2" lean="D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_bound_is_exact D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_abs_le_two"}
Let $\mathrm{Fiber}$ be a finite type (`[Fintype Fiber]`) and let the weights $\mu : \mathrm{Fiber} \to \mathbb{R}$ be nonnegative (`hmu_nonneg`: $0 \le \mu(\lambda)$ for every $\lambda$) and normalized (`hmu_sum`: $\sum_\lambda \mu(\lambda) = 1$). Then:

1. For every deterministic fiber model $\mathrm{model}$ ([@def-deterministic-fiber-model]),

   $$
   \bigl\lvert \operatorname{classicalCHSH}(\mu, \mathrm{model}) \bigr\rvert \;\le\; 2 ;
   $$

2. The set $\bigl\{\, \lvert\operatorname{classicalCHSH}(\mu, \mathrm{model})\rvert \;\big|\; \mathrm{model} : \operatorname{DeterministicFiberModel}\ \mathrm{Fiber} \,\bigr\}$ has greatest element $2$ (`IsGreatest`): $2$ belongs to the set, and every element of the set is at most $2$.
:::

::: proof
Start with a single fiber address. Four real numbers with values $\pm 1$ commute pairwise and square to $1$, so they satisfy Mathlib's commutative CHSH inequality `CHSH_inequality_of_comm`, which gives $\operatorname{chshAt} \le 2$. Negating both of Alice's answers flips the sign of $\operatorname{chshAt}$; applying the same inequality to the flipped model gives $-2 \le \operatorname{chshAt}$. Now multiply termwise by the nonnegative weights $\mu(\lambda)$, sum, and insert $\sum_\lambda \mu(\lambda) = 1$ to get $-2 \le \operatorname{classicalCHSH} \le 2$, which is claim 1 (`classical_chsh_abs_le_two`). For attainment, take the constant model in which Alice and Bob answer `true` for every setting and every fiber address: at each address $\operatorname{chshAt} = 1 + 1 + 1 - 1 = 2$, and the weighted sum equals $2$ (`classical_chsh_eq_two_exists`). Together these give claim 2. The full proof is checked by the Lean kernel.
:::

The step at a single address can be counted out by hand.

::: {.example #ex-sixteen-deterministic-chsh-tables title="The CHSH Value of the Sixteen Deterministic Answer Tables: Eight Give +2 and Eight Give −2"}
At one fixed fiber address, Alice's two answers $a_0, a_1$ and Bob's two answers $b_0, b_1$ each take the values $\pm 1$, for $2^4 = 16$ combinations. Rewrite the CHSH value as

$$
a_0 b_0 + a_0 b_1 + a_1 b_0 - a_1 b_1 \;=\; a_0\,(b_0 + b_1) + a_1\,(b_0 - b_1).
$$

Bob's two answers stand in one of only two relations:

| Bob's answers | $b_0 + b_1$ | $b_0 - b_1$ | CHSH value | combinations |
| :---: | :---: | :---: | :---: | :---: |
| $b_0 = b_1$ | $\pm 2$ | $0$ | $2\,a_0 b_0 = \pm 2$ | $8$ |
| $b_0 = -b_1$ | $0$ | $\pm 2$ | $2\,a_1 b_0 = \pm 2$ | $8$ |

In each row the product that decides the sign takes the values $+1$ and $-1$ in half of the combinations each, so exactly eight of the sixteen combinations give $+2$ and eight give $-2$; none lies outside $[-2, 2]$ and none lies strictly inside. Any probabilistic mixture merely takes a weighted average between $-2$ and $+2$, hence $\lvert S\rvert \le 2$, in agreement with [@thm-classical-chsh-bound-exact].
:::

::: {.viz src="chsh-dial" preset="hidden" height="500"}
**Each hidden direction gives only ±2, so the mean cannot leave 2.** The same two crosses now face a classical model of 360 equally spaced hidden directions of weight $1/360$ each (the uniform hidden-direction toy model of step 3 of [@ex-bell-chsh-45deg], with finitely many directions), a finite deterministic fiber model. Each tick on the ring is one hidden direction: cyan gives $+2$, magenta $-2$. As Bob's cross turns from $0^\circ$ to $180^\circ$, up to $90^\circ$ all 360 ticks stay cyan and the amber bar stays pinned at $2$; after that more and more ticks turn magenta and the bar sinks with them, to $-2$ at $180^\circ$, never leaving $[-2, 2]$ ([@thm-classical-chsh-bound-exact]). The figure stops at $120^\circ$: $240$ cyan ticks and $120$ magenta, and the bar at $(240 \cdot 2 - 120 \cdot 2)/360 = 2/3 \approx 0.667$. The dotted line is $\langle S\rangle$ on the Bell state: $2.828$ at $45^\circ$, $0.732$ at $120^\circ$.
:::

Both ends are now pinned: the CHSH value of a finite deterministic local model cannot leave the segment $[-2, 2]$ ([@thm-classical-chsh-bound-exact]), while the expectation of the fixed CHSH operator on quantum states reaches $2\sqrt{2}$ ([@cor-fixed-chsh-tsirelson]). Their ratio is $\sqrt{2}$, the factor by which the $45^\circ$ arc exceeds the polyline. Mind the quantifier scope of each theorem: the classical side concerns deterministic $\pm 1$ answer tables over a finite set of fibers, and on the quantum side attainment concerns one fixed two-qubit operator, while the upper bound $2\sqrt{2}$ holds for every finite-dimensional unitary strategy ([@thm-unitary-bell-bound] at $d = 2$); for the general forms see [@rem-bell-chsh-literature] at the end of the chapter.

::: {.film src="chsh-45-degrees"}
**45°: the cosine arc above the toy classical line (2 min 23 s).** Within the $Z$–$X$ plane, as the angle $\theta$ sweeps from $0^\circ$ to $180^\circ$, the cyan cosine arc and the toy model's line $1 - 2\theta/\pi$ meet at $0^\circ$, $90^\circ$ and $180^\circ$, and at $45^\circ$ the arc stands $0.207$ higher; with Bob's pair turned by $45^\circ$ the four cosines stack step by step to $2\sqrt{2}$ while the line stacks only to $2$; turning Bob's pair from $0^\circ$ to $90^\circ$, the value rises and falls as $2\sqrt{2}\cos(\varphi - 45^\circ)$. Each of the sixteen deterministic answer tables gives only $\pm 2$, and no weighted average leaves $[-2, 2]$ ([@thm-classical-chsh-bound-exact]); the extra term in $S^2$ comes from the two sides' commutators ([@prop-landau-area-square]), and with both sides at right angles and Bob turned by $45^\circ$ the Bell state reaches $2\sqrt{2}$, which no state exceeds ([@cor-fixed-chsh-tsirelson]).
:::

Why is $\theta = 45^\circ$ the symmetric CHSH working angle? In a symmetric four-setting configuration (three adjacent pairs separated by $\theta$ and one pair separated by $3\theta$), the four-correlator combination is $3\cos\theta - \cos(3\theta)$, whose derivative $-3\sin\theta + 3\sin(3\theta) = 0$ attains its global maximum $2\sqrt{2}$ at $\theta = 45^\circ$ ($\pi/4$)! (Keep this four-setting optimization distinct from maximizing the single-chord pointwise difference $g(\theta) = \cos\theta - (1 - 2\theta/\pi)$ against the linear toy model: the pointwise derivative $-\sin\theta + 2/\pi = 0$ peaks at $\theta = \arcsin(2/\pi) \approx 39.5402^\circ$ with a single-chord gap of $\approx 0.2105$, whereas at the symmetric CHSH working angle $\theta = 45^\circ$ each single-chord gap is $\frac{\sqrt{2}-1}{2} \approx 0.2071$, four of which sum to $2\sqrt{2} - 2 \approx 0.8284$.) Let us now work through the complete numerical checklist connecting $\rho_{\Phi^+}$, $\rho_{\Psi^-}$, the four $45^\circ$ CHSH correlators, and the comparison between the cosine arc and a specific linear toy model.

::: {.figure src="ch13-symmetric"}
**The symmetric four-direction combination reaches $2\sqrt{2}$ only at $45^\circ$.** The horizontal axis is the angle $\theta$ between neighbouring directions; the cyan curve is $3\cos\theta - \cos(3\theta)$ on the Bell state. It starts at $2$ at $\theta = 0^\circ$, rises to $2\sqrt{2}$ at $45^\circ$, falls back to $2$ near $68.5^\circ$ and reaches $0$ at $90^\circ$. The green dashed line is the bound $2$ for finite deterministic local models ([@thm-classical-chsh-bound-exact]); the part of the curve above it is shaded magenta. The curve is computed from the formula.
:::

::: {.example #ex-bell-chsh-45deg title="Complete Hand-Calculated Checklist for Bell Marginals, the 45° CHSH Value 2√2, and the Cosine Arc"}
This example provides a three-part verification checklist for the two-qubit Bell states and the $45^\circ$ CHSH configuration:

**Step 1: Explicit $4\times 4$ matrix, partial traces, correlation tensor $T$, and purity check for $\rho_{\Phi^+}$ and $\rho_{\Psi^-}$.**
In the standard basis $\{\lvert 00\rangle, \lvert 01\rangle, \lvert 10\rangle, \lvert 11\rangle\}$, the Bell density matrix $\rho_{\Phi^+} = \mathrm{bellDensity}$ is

$$
\rho_{\Phi^+} = \frac{1}{2}\begin{pmatrix} 1 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \\ 1 & 0 & 0 & 1 \end{pmatrix}.
$$

Both partial traces equal the maximally mixed state $\Tr_B(\rho_{\Phi^+}) = \Tr_A(\rho_{\Phi^+}) = \frac{1}{2}I_2$, so the local Bloch vectors vanish: $\vv{r} = \vv{s} = (0, 0, 0)$. Evaluating the $3\times 3$ correlation matrix $T_{ij} = \Tr\bigl(\rho(\sigma_i \otimes \sigma_j)\bigr)$ ($i, j \in \{X, Y, Z\}$) gives:

- For the triplet $\rho_{\Phi^+}$: $T_{\Phi^+} = \operatorname{diag}(+1, -1, +1)$, with Frobenius squared norm $\norm{T_{\Phi^+}}_{\mathrm{F}}^2 = \sum_{i,j} T_{ij}^2 = 1^2 + (-1)^2 + 1^2 = 3$;
- For the singlet $\rho_{\Psi^-} = \lvert\Psi^-\rangle\langle\Psi^-\rvert$ ($\lvert\Psi^-\rangle = \frac{1}{\sqrt{2}}(\lvert 01\rangle - \lvert 10\rangle)$): all three diagonal correlations are negative, $T_{\Psi^-} = -I_3 = \operatorname{diag}(-1, -1, -1)$, also with $\norm{T_{\Psi^-}}_{\mathrm{F}}^2 = (-1)^2 + (-1)^2 + (-1)^2 = 3$ (one must never copy the $+X, -Y, +Z$ signs of $\Phi^+$ onto $\Psi^-$!).

Substituting into the two-qubit purity identity $\Tr(\rho^2) = \frac{1}{4}\bigl(1 + \norm{\vv{r}}^2 + \norm{\vv{s}}^2 + \norm{T}_{\mathrm{F}}^2\bigr)$ gives

$$
\Tr(\rho^2) = \frac{1 + 0 + 0 + 3}{4} = 1,
$$

confirming that above the maximally mixed identity baseline $\frac{1}{4}$ (and with $\frac{1}{4}(\norm{\vv{r}}^2 + \norm{\vv{s}}^2) = 0$ from the vanishing local Bloch vectors), $100\%$ of the **non-identity purity excess** $\Tr(\rho^2) - \frac{1}{4} = \frac{3}{4}$ is carried by the correlation term $\frac{1}{4}\norm{T}_{\mathrm{F}}^2 = \frac{3}{4}$ ($\norm{T}_{\mathrm{F}}^2 = 3$). (Note: depicting $T_{ij}$ as a "shared correlation area" is a visualization of the $3\times 3$ correlation entries, not a general entanglement monotone across arbitrary mixed states.)

**Step 2: The four $45^\circ$ correlators and $S = 2\sqrt{2}$.**
On $\rho_{\Phi^+}$, set Alice's observables to $A_0 = Z$, $A_1 = X$ and Bob's observables to $B_0 = \frac{Z + X}{\sqrt{2}}$, $B_1 = \frac{Z - X}{\sqrt{2}}$. Using $\langle Z \otimes Z\rangle_{\Phi^+} = +1$, $\langle X \otimes X\rangle_{\Phi^+} = +1$, and $\langle Z \otimes X\rangle_{\Phi^+} = \langle X \otimes Z\rangle_{\Phi^+} = 0$, the four individual correlators $E_{ij} = \Tr\bigl(\rho_{\Phi^+}(A_i \otimes B_j)\bigr)$ are:

$$
\begin{aligned}
E_{00} &= \frac{1}{\sqrt{2}}\bigl(\langle Z\otimes Z\rangle + \langle Z\otimes X\rangle\bigr) = +\frac{1}{\sqrt{2}}, &\qquad
E_{01} &= \frac{1}{\sqrt{2}}\bigl(\langle Z\otimes Z\rangle - \langle Z\otimes X\rangle\bigr) = +\frac{1}{\sqrt{2}}, \\
E_{10} &= \frac{1}{\sqrt{2}}\bigl(\langle X\otimes Z\rangle + \langle X\otimes X\rangle\bigr) = +\frac{1}{\sqrt{2}}, &\qquad
E_{11} &= \frac{1}{\sqrt{2}}\bigl(\langle X\otimes Z\rangle - \langle X\otimes X\rangle\bigr) = -\frac{1}{\sqrt{2}}.
\end{aligned}
$$

Combining them with the minus sign on $E_{11}$ yields

$$
\langle S\rangle_{\Phi^+} = E_{00} + E_{01} + E_{10} - E_{11} = \frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}} - \Bigl(-\frac{1}{\sqrt{2}}\Bigr) = \frac{4}{\sqrt{2}} = 2\sqrt{2} \approx 2.8284271247461903,
$$

which exceeds the classical local hidden-variable bound $|S_{\mathrm{cl}}| \le 2$ by $2\sqrt{2} - 2 \approx 0.8284271247461903$.

**Step 3: Comparing the cosine curve $C_{\mathrm{q}}(\theta) = \cos\theta$ with the specific toy-model polygonal line $C_{\mathrm{cl}}(\theta) = 1 - \frac{2\theta}{\pi}$.**
In Figure 13, Panel III, we plot the positive-correlation convention $C_{\mathrm{q}}(\theta) = \cos\theta$ ($0 \le \theta \le \pi$): for $\rho_{\Phi^+}$, when Alice and Bob choose directions $\vv{a}, \vv{b}$ in the $(Z, X)$ plane separated by angle $\theta$, their correlator is directly $\langle(\vv{a}\cdot\vv{\sigma})\otimes(\vv{b}\cdot\vv{\sigma})\rangle_{\Phi^+} = \cos\theta$; for the singlet $\rho_{\Psi^-}$, the raw correlator is $E_{\Psi^-}(\theta) = -\cos\theta$, so plotting $+\cos\theta$ requires explicitly flipping Bob's outcome sign ($b \mapsto -b$).

We compare $C_{\mathrm{q}}(\theta) = \cos\theta$ against a specific uniform-direction hidden-variable toy model in which each pair carries a shared unit vector $\vv{\lambda}$ distributed uniformly on the circle (or sphere) and outputs $\operatorname{sgn}(\vv{a}\cdot\vv{\lambda})$ and $\operatorname{sgn}(\vv{b}\cdot\vv{\lambda})$. Because the two hemicircles disagree on two wedges of angle $\theta$ out of $\pi$, this specific toy model produces the piecewise-linear curve

$$
C_{\mathrm{cl}}(\theta) = \Bigl(1 - \frac{\theta}{\pi}\Bigr)(+1) + \Bigl(\frac{\theta}{\pi}\Bigr)(-1) = 1 - \frac{2\theta}{\pi} \qquad (0 \le \theta \le \pi).
$$

(We emphasize that $1 - 2\theta/\pi$ is the correlation function of this particular isotropic toy model, not the only curve attainable by general classical local models.) At the benchmark angles:

| Relative Angle $\theta$ | Quantum Cosine $C_{\mathrm{q}}(\theta) = \cos\theta$ | Toy-Model Line $C_{\mathrm{cl}}(\theta) = 1 - 2\theta/\pi$ | Gap $C_{\mathrm{q}}(\theta) - C_{\mathrm{cl}}(\theta)$ | Geometric Interpretation |
| :---: | :---: | :---: | :---: | :--- |
| $0^\circ$ ($0$) | $+1$ | $+1$ | $0$ | Collinear alignment; exact agreement |
| $45^\circ$ ($\pi/4$) | $\frac{\sqrt{2}}{2} \approx 0.7071067811865476$ | $0.5$ | $+0.2071067811865476$ | **Cosine arc bulges above the chord (CHSH point)** |
| $90^\circ$ ($\pi/2$) | $0$ | $0$ | $0$ | Orthogonal equator; zero correlation |
| $135^\circ$ ($3\pi/4$) | $-\frac{\sqrt{2}}{2} \approx -0.7071067811865476$ | $-0.5$ | $-0.2071067811865476$ | Symmetric negative bulge (gives $E_{11}$) |
| $180^\circ$ ($\pi$) | $-1$ | $-1$ | $0$ | Antipodal opposition; exact agreement |

At the cardinal angles $0^\circ, 90^\circ, 180^\circ$, both curves coincide at $+1, 0, -1$; at $\theta = 45^\circ$, the cosine arc $0.7071067811865476 > 0.5$ rises above the linear chord, and summing four such $45^\circ/135^\circ$ contributions lifts $4 \times 0.5 = 2$ to $4 \times \frac{\sqrt{2}}{2} = 2\sqrt{2}$!
:::

::: {.viz src="chsh-dial" preset="arc" height="500"}
**Four bulges add up to 2√2 − 2.** The horizontal axis is the angle between two directions. Three pairs land at $45^\circ$, where the cyan cosine arc stands $0.207$ above the dark polyline; the fourth lands at $135^\circ$, where the arc is $0.207$ below it, and with its minus sign that also counts $+0.207$. The four magenta segments add up to $2\sqrt{2} - 2 \approx 0.828$: the points on the arc stack to $2.828$, those on the line to $2$. Arc and line meet at $0^\circ$, $90^\circ$ and $180^\circ$; the polyline belongs to this toy model only.
:::

::: {.remark #rem-bell-chsh-literature title="The General Classical Local-Hidden-Variable Bound, the General Tsirelson Theorem, and No-Signaling (Literature Result, Not Formalized in This Book)"}
**Literature result, not formalized in this book.** To situate the frozen theorems of this chapter within the broader foundations literature, three classical results and physical boundaries should be kept distinct:

1. **The classical CHSH bound $|S_{\mathrm{LHV}}| \le 2$ as the convex hull of deterministic models** (J. F. Clauser, M. A. Horne, A. Shimony, and R. A. Holt, *Proposed experiment to test local hidden-variable theories*, Phys. Rev. Lett. **23**, 880–884, 1969, doi:10.1103/PhysRevLett.23.880): The linear sawtooth $C_{\mathrm{cl}}(\theta) = 1 - 2\theta/\pi$ in [@ex-bell-chsh-45deg] is a specific illustrative toy model, not Bell's theorem itself. The general CHSH inequality holds for **every** local stochastic hidden-variable model $\int \bar{A}_i(\lambda)\bar{B}_j(\lambda)\,d\mu(\lambda)$ with $\bar{A}_i(\lambda), \bar{B}_j(\lambda) \in [-1, 1]$, using the same setting-independent probability measure for all four setting pairs and a product of local responses at fixed $\lambda$: because a multilinear expression on $[-1, 1]^4$ attains its extrema at the vertices $a_0, a_1, b_0, b_1 \in \{\pm 1\}$ where one of $b_0 \pm b_1$ is $\pm 2$ and the other is $0$, every deterministic assignment satisfies $a_0(b_0 + b_1) + a_1(b_0 - b_1) = \pm 2$, and convex averaging over any probability distribution $\mu$ enforces $|S_{\mathrm{LHV}}| \le 2$. The case of a finite set of hidden variables with deterministic $\pm 1$ responses is verified by [@thm-classical-chsh-bound-exact]; the general form, with an arbitrary probability measure and stochastic response functions valued in $[-1, 1]$, remains a literature result: passing from the former to the latter requires writing stochastic responses as convex combinations of deterministic ones and replacing finite sums by integrals, and neither step is formalized in this book.
2. **The general Tsirelson bound for arbitrary Hilbert spaces and commuting observables** (B. S. Cirel'son, *Quantum generalizations of Bell's inequality*, Lett. Math. Phys. **4**, 93–100, 1980, doi:10.1007/BF00417500): The finite-dimensional tensor-product case is formalized. [@thm-unitary-bell-bound] bounds the Bell value for any finite dimensions $n, m$, any local unitary matrices (Hermitian involutions used for sharp binary measurements are a special case), and any density state; setting $d = 2$ and negating both $A_0$ and $A_1$ gives $\lvert\operatorname{Re}\Tr(\rho S)\rvert \le 2\sqrt{2}$ (these two steps are manual derivations), and [@cor-fixed-chsh-tsirelson] shows that the fixed two-qubit operator `CHSHWitness.chshOperator` reaches $2\sqrt{2}$ on the Bell state. What remains a literature result is the general form of Cirel'son's theorem: the Hilbert space $\mathcal{H}$ may be infinite-dimensional, and Alice's and Bob's observables act on the same $\mathcal{H}$, subject only to $A_i^* = A_i$, $B_j^* = B_j$, $A_i^2 = I$, $B_j^2 = I$, and $[A_i, B_j] = 0$, with no tensor-product structure. A short argument: bounding the commutator norms by $\norm{[A_0, A_1]}_{\mathrm{op}} \le 2\norm{A_0}\norm{A_1} = 2$ and $\norm{[B_0, B_1]}_{\mathrm{op}} \le 2$ in Landau's identity $S^2 = 4I - [A_0, A_1][B_0, B_1]$ gives $\norm{S^2}_{\mathrm{op}} \le 8$, hence $|\langle S\rangle| \le 2\sqrt{2}$. Neither this general form nor this argument is formalized in this book ([@prop-landau-area-square] holds only for finite-dimensional Kronecker products).
3. **No controllable superluminal signaling**: Violation of the CHSH inequality (verified across loophole-free Bell experiments) manifests in joint correlation statistics when Alice's and Bob's records are brought together afterward. [@thm-local-correlation-sectors] and [@lemma-bell-mixed-marginal] identify the static Bell-state marginal here as $\frac{1}{2}I_2$. Invariance after a measurement choice also needs the literature result for local operations (J. Watrous, *The Theory of Quantum Information*, 2018, Theorem 2.26 and §2.3.2): Alice applies a trace-preserving quantum channel locally; for a measurement, this means averaging over all outcomes without selecting a subset. The channel's dual preserves the identity, so every local readout of Bob's, and hence his unconditional marginal, stays unchanged — still $\frac{1}{2}I_2$ in this Bell example. Subensembles conditioned on Alice's outcome may have different marginals (conditional steering), but Bob needs her classical outcome records to identify those subensembles. Quantum entanglement therefore never permits controllable faster-than-light communication.
:::

::: {.viz src="chsh-dial" height="560"}
The full lab: drag the four arrows on the dial, change the two openings, and turn Bob's pair with the rail; the three scenes are the dial, the hidden directions, and the arc against the line. The dashed $\pm 2$ on the gauge and the $\pm 2\sqrt{2}$ at its top are guaranteed by [@thm-classical-chsh-bound-exact] and [@thm-unitary-bell-bound] (taking $d = 2$ is a manual step); the other numbers on the page are a numerical illustration.
:::

The Bell pure state has now shown us the first great lesson of higher-dimensional quantum geometry: local single-qubit lines can be completely drained ($\vv{r} = \vv{s} = \vv{0}$) while $100\%$ of the state's non-identity purity excess ($\Tr(\rho^2) - \frac{1}{4} = \frac{1}{4}\norm{T}_{\mathrm{F}}^2 = \frac{3}{4}$ on top of the $\frac{1}{4}I_4$ baseline) is stored in the non-local correlation tensor $T_{ij}$. That geometric fact suggests a decisive engineering strategy for fault-tolerant quantum computing: **if, in a local noise model, environmental noise attacks local lines one qubit at a time, can we intentionally evacuate fragile logical information from local lines and hide it inside higher-dimensional stabilizer correlation areas and topological braids?** Let us step into [Chapter 14](ch14-cloning-codes-and-braids.md).
