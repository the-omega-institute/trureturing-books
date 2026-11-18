# 31.3 Horizon Fairness and Ergodic Fairness: Sheltered Suspense and Equal Starlight {#sec-ch31-horizon-and-ergodic}

Even with the first three tiers in place, human existence presses two deeper questions:

- **First (The Question of Computational Power)**: If the global timeless static field exhibits $P = NP$-like fixed-point immediacy under idealized timeless models ([Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md)), why did the universe surround every finite observer inside the field with an exponential search horizon?
  The answer is **Horizon Fairness (`MODEL`)**! Imagine a world where bounded observers inside the crystal could also solve NP-complete global constraints in polynomial time: whoever possessed a slightly faster processor would deduce every secret, pre-compute the endgame of every rivalry, and lock down the entire decision tree before newcomers could place a single stone. Instead, the fixed planar rotation step angle of coherent uniform amplification dictated by initial overlap $p = \sin^2\theta$ (Conjunct 2 of [@thm-ch31-horizon-landauer-ergodic-fairness] below; external complexity lower-bound context in [Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-query-sos-literature]) and the open $\mathrm{P} \neq \mathrm{NP}$ complexity firewall ([@conj-p-neq-np]) sketch quantum evolution accumulating rotation angle step by step inside a two-dimensional plane (the rotation law only fixes a $2\theta$ turn per round of this one iterated operator and gives no gate-count lower bound by itself)—no computational oligarchy can bypass curvature to pre-emptively monopolize the future.
- **Second (The Question of Unequal Circumstance)**: If finite observers enter the timeless lattice at different internal phases—some stepping near the serene center of the acceptance window over a short span, others buffeted near its boundary—**where is ultimate fairness?**

Unfolding our cut-and-project observer model alongside compact-torus ergodic theory reveals a crystalline answer:

1. **Birth-Forgetting Resets Choice Freedom (`MODEL`)**: As shown in [Chapter 29](ch29-timeless-causality-and-gram-space.md) ([@thm-ch29-gram-rigidity-and-pell]) and the [Coda](coda.md), unbounded accumulation of historical anchors would eventually drive compatible choice slack toward lockup. Birth-forgetting truncates high-order historical baggage so that every finite observer awakening anew faces a fresh corridor of positive-volume choice.
2. **Closed-Subgroup Equidistribution and Bounded-Gap Return (`LEAN ✓` + `MODEL`)**: Over a handful of local steps, disparate slices genuinely encounter different local fortunes; yet on any compact torus subgroup, `trureturing`'s **torus orbit equidistribution theorem** and **bounded-gap observation-window return theorem** (Conjuncts 3–4 of [@thm-ch31-horizon-landauer-ergodic-fairness] below) prove that Cesàro time averages of continuous observables converge strictly to the normalized translation-invariant probability integral on the closed orbit subgroup $G = \overline{\langle g\rangle}$, and every nonempty open interval $(u, v)$ intersecting $\operatorname{range}(h)$ is revisited with bounded gap $M$ and **positive lower asymptotic visit density** at least $\frac{1}{M+1} - \varepsilon$ (for the complete null-frontier window application under irrational torus translations and its hypotheses, see [@rem-ch31-weyl-window-equidistribution-literature] below).

We first anchor the four formal theorems governing Landauer heat balance, coherent amplification rotation, torus orbit equidistribution, and bounded-gap window return.

::: {.theorem #thm-ch31-horizon-landauer-ergodic-fairness title="Fourth and Fifth Formal Pillars of Quantum Fairness: Landauer Balance, Uniform Search Rotation, and Torus Ergodic Return" lean="D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result"}
Across the frozen thermodynamic-divergence, coherent-amplification, and Fourier torus-asymptotics modules of `trureturing`, the following four theorems hold simultaneously:

1. **Landauer Thermodynamic Balance Bound** ([`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)): For real quantities $\beta, \mathrm{heat}, \mathrm{entropyChange}, \mathrm{mutualInfo}, \mathrm{divergence} \in \mathbb{R}$ satisfying $\beta \cdot \mathrm{heat} = -\mathrm{entropyChange} + \mathrm{mutualInfo} + \mathrm{divergence}$ with $\mathrm{mutualInfo} \ge 0$ and $\mathrm{divergence} \ge 0$, entropy reduction is bounded above by $\beta$ times the dissipated heat (equivalently, $\beta \cdot \mathrm{heat}$ is bounded below by entropy reduction):

   $$
   -\mathrm{entropyChange} \;\le\; \beta \cdot \mathrm{heat};
   $$

2. **Two-Plane Stepwise Rotation Law of Coherent Uniform Amplification** ([`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)): Let $l, s$ be finite decidable types (`[Fintype l] [DecidableEq l] [Fintype s] [DecidableEq s]`), and let $J \in M_{l\times s}(\mathbb{C})$ and $C, P \in M_{l\times l}(\mathbb{C})$ satisfy $J^\dagger J = I_s,\, C^\dagger C = I_l,\, P^\dagger = P = P^2$, and $(P(CJ))^\dagger (P(CJ)) = p\,I_s$ with $0 < p \le 1$. Writing $U = CJ$, $W = \operatorname{success}(U, P, p)$, $B = \operatorname{failure}(U, P, p)$, and $\theta = \arcsin\sqrt{p}$: if $p = 1$ then $U = W$; if $p < 1$ then $W^\dagger W = I_s,\, B^\dagger B = I_s,\, W^\dagger B = 0$, and for every iteration count $n \in \mathbb{N}$ (preserving the identical linear combination after Kronecker tensoring $\otimes_k R$ with any reference matrix $R \in M_z(\mathbb{C})$ on any type $z$),

   $$
   (\operatorname{iterate}(U, P))^n \, U \;=\; \sin\bigl((2n + 1)\theta\bigr)\,W \;+\; \cos\bigl((2n + 1)\theta\bigr)\,B;
   $$

3. **Haar Equidistribution of Closed-Subgroup Torus Orbits** ([`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)): Let $I$ be a finite index type, $g : I \to \mathrm{Circle}$ a torus element, $G = \overline{\langle g\rangle}$ its compact closed subgroup, and $\mu$ the normalized Haar probability measure on $G$. Then $G = \overline{\{g^n : n \in \mathbb{N}\}}$ and for every continuous observable $f \in C(G, \mathbb{C})$,

   $$
   \lim_{N \to \infty} \frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1}) \;=\; \int_G f(z)\,d\mu(z);
   $$

4. **Full Image Support, Bounded-Gap Window Return, and Positive Lower Asymptotic Visit Density** ([`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)): With $G, \mu$ as in Conjunct 3 and generator $a = \langle g, \dots\rangle \in G$, for every continuous real observable $h \in C(G, \mathbb{R})$ and sequence $e : \mathbb{N} \to \mathbb{R}$ satisfying $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$, the pushforward support equals the full range $\operatorname{supp}(h_*\mu) = \operatorname{range}(h)$; moreover, whenever an open interval $(u, v) \subset \mathbb{R}$ satisfies $(I_{oo}(u, v) \cap \operatorname{range}(h)).\mathrm{Nonempty}$, there exist $n_0 \ge 1$ and a bounded gap $M \in \mathbb{N}$ such that every block $[n, n+M]$ ($n \ge n_0$) contains at least one $m$ with $e(m) \in (u, v)$, and for every $\varepsilon > 0$ the positive lower asymptotic visit density bound holds eventually:

   $$
   \forall^\infty N \in \mathbb{N},\qquad \frac{\#\bigl\{m < N \;\big|\; e(m) \in (u, v)\bigr\}}{N} \;\ge\; \frac{1}{M + 1} - \varepsilon.
   $$
:::

::: proof
Conjunct 1 follows from $\mathrm{mutualInfo} + \mathrm{divergence} \ge 0$; Conjunct 2 gives $U = W$ via `unit_success` when $p = 1$, and when $p < 1$ verifies mutual isometric orthogonality of $W$ and $B$, inducts on $n$ via angle-addition identities, and distributes Kronecker tensoring across $\otimes_k R$; Conjunct 3 uses equicontinuity of the Cesàro evaluation operators to close the convergence subspace $S \subseteq C(G, \mathbb{C})$, canceling nontrivial torus characters via geometric sums and extending by trigonometric-polynomial density; Conjunct 4 proves $\operatorname{supp}(h_*\mu) = \operatorname{range}(h)$ from strict positivity on nonempty open pullbacks and extracts the uniform return gap $M$ and positive lower asymptotic visit density bound from a finite subcover of compact orbit translates. The full proof is checked by the Lean kernel.
:::

::: {.figure src="ch31-rotation-steps"}
**Each round turns the state by exactly $2\theta$; no step can be skipped.** In the plane of the success direction $W$ (vertical) and the failure direction $B$ (horizontal), after $n$ rounds the state is $\sin((2n+1)\theta)\,W + \cos((2n+1)\theta)\,B$: it starts $\theta$ above $B$ and each round adds one violet turn of $2\theta$ (Conjunct 2 of [@thm-ch31-horizon-landauer-ergodic-fairness]). Here $\theta = \pi/14$, so $p = \sin^2\theta \approx 0.050$, and the amber round $n = 3$ lands exactly on $W$; the smaller $p$, the shorter each step and the more rounds it takes.
:::

The reuse derivation from continuous observables to actual acceptance-window counts, and its remaining ergodic boundaries, are given below:

::: {.remark #rem-ch31-weyl-window-equidistribution-literature title="Null-Frontier Window Frequencies on the Full Torus: An Application and Its Ergodic Boundaries"}
**A composite application of existing results.** Conjunct 3 of [@thm-ch31-horizon-landauer-ergodic-fairness] directly states an average for continuous functions on the closed orbit group. Here are the interfaces needed to reach actual window counts; the window conclusion is not the statement of that endpoint. Let $I$ be any finite index type, including the empty type, let $\alpha:I\to\mathbb R$, and set $\beta_i=\alpha_i\pmod{\mathbb Z}\in\mathrm{AddCircle}(1)$, $T=(\mathrm{AddCircle}(1))^I$. Let $\mu$ be normalized Haar probability on the full $T$. Assume that the family on $\mathrm{Option}(I)=\{\mathrm{none}\}\sqcup\{\mathrm{some}(i):i\in I\}$ given by

$$
a(\mathrm{none})=1,\qquad a(\mathrm{some}(i))=\alpha_i
$$

is linearly independent over $\mathbb Q$. Let $W\subseteq T$ be any set with $\mu(\partial W)=0$, **without an additional Borel measurability premise**. For every $\varepsilon>0$ there is $N_0\ge1$ such that the same $N_0$ works for every starting point $x\in T$ and every $N\ge N_0$:

$$
\left|\frac1N\sum_{j=0}^{N-1}
\mathbf1_W\bigl(x+(j+1)\beta\bigr)-(\mu W)_{\mathbb R}\right|<\varepsilon.
$$

Here $(\mu W)_{\mathbb R}$ is the real value of the finite measure, and the indicator uses actual membership in $W$. The samples are exactly times $1,\ldots,N$, rather than $0,\ldots,N-1$.

**Where independence enters.** If integers $k:I\to\mathbb Z$ and $m\in\mathbb Z$ satisfy $\sum_i k_i\alpha_i=m$, place coefficient $-m$ at `none` and $k_i$ at `some(i)`. Independence of the rational family forces every $k_i=0$. This is precisely the integer-character premise of [`dense_circle_sequence`](lean:D5/S3/Fourier/BiquadraticKroneckerTimes.dense_circle_sequence). For $g_i=\exp(2\pi i\alpha_i)$, together with [`TorusOrbitClosure.result`](lean:D5/S3/Fourier/TorusOrbitClosure.result), it identifies the closure of the nonnegative powers with the whole product of circles, rather than a proper subtorus. The coordinate maps [AddCircle.homeomorphCircle](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/SpecialFunctions/Complex/Circle.lean#L435) transport this closure to the additive torus, retaining the actual generator and every starting point.

**Continuous averages and Haar transport.** Apply [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result) to this $g$. The continuous surjective homomorphism from the closed circle orbit to $T$ transports Haar measure by [MonoidHom.measurePreserving](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/Haar/Unique.lean#L951), since both total masses are $1$. Translation invariance identifies the integral of $z\mapsto f(x+z)$ with that of $f$. Thus for every continuous complex $f$ and every $x$, the actual average $N^{-1}\sum_{j<N}f(x+(j+1)\beta)$ converges to $\int f\,d\mu$. At $N=0$ the empty sum and totalized division give zero; this does not affect the limit at infinity.

**Why the threshold is uniform in the starting point.** Write $R(x)=x+\beta$. Translation is an isometry, hence $1$-Lipschitz; continuous $f$ on the compact torus is uniformly continuous. [uniformEquicontinuous_birkhoffAverage](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Dynamics/BirkhoffSum/NormedSpace.lean#L129) gives equicontinuity of the averages, and compactness with [Equicontinuous.tendsto_uniformFun_iff_pi](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/UniformSpace/Ascoli.lean#L167) upgrades pointwise continuous averages to uniform convergence in $x$. Index empirical probabilities $\nu_{m,x}$ by $(m,x)$, taking $m+1$ steps starting at $R(x)$. Continuous functions are bounded on this compact space, so [ProbabilityMeasure.tendsto_iff_forall_integral_rclike_tendsto](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/ProbabilityMeasure.lean#L373) and `tendsto_prod_top_iff` give weak convergence $\nu_{m,x}\to\mu$ along $\mathrm{atTop}\times^s\top$. The second factor $\top$ retains all starting points simultaneously, rather than almost every starting point.

**From measures to the actual count.** The null-frontier assumption is used once, at [ProbabilityMeasure.tendsto_measure_of_null_frontier_of_tendsto'](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/Portmanteau.lean#L334), which allows arbitrary $W$ without a Borel premise. Then `Measure.dirac_apply` and `Measure.finsetSum_apply` compute the empirical mass exactly as

$$
\nu_{m,x}(W)=\frac{1}{m+1}\sum_{j=0}^{m}
\mathbf1_W\bigl(x+(j+1)\beta\bigr).
$$

Product-filter convergence supplies $M$ such that the error is below $\varepsilon$ for every $m\ge M$ and every $x$. Set $N_0=M+1$. For $N\ge N_0$, choose $m=N-1$; then $m+1=N$. This gives exactly the denominator, summation range, and phase required above, without replacing the first term by an asymptotic approximation.

**Residual boundaries.** $N_0$ depends on $\alpha,W,\varepsilon$. There is no uniformity over $\alpha$ or $W$ and no effective rate. Translated windows can be read through $\mathbf1_{W+u}(j\beta)=\mathbf1_W(-u+j\beta)$. If a cut-and-project model independently satisfies $\pi_\perp(z_j)=x+j\beta\in T$ for every $j\ge1$, then for any $u\in T$,

$$
\begin{aligned}
\pi_\perp(z_j)-u&=(x-u)+j\beta,\\
\mathbf1_{W+u}(\pi_\perp(z_j))&=\mathbf1_W((x-u)+j\beta),\\
\frac1N\sum_{j=1}^{N}\mathbf1_{W+u}(\pi_\perp(z_j))
&=\frac1N\sum_{j=0}^{N-1}\mathbf1_W((x-u)+(j+1)\beta).
\end{aligned}
$$

This identifies the count exactly with the established orbit count starting at $x-u$, so the same $N_0$ for every starting point applies, still at times $1,\ldots,N$. The trajectory equality is a hypothesis the model must establish separately; it does not follow from the torus theorem and is not asserted for arbitrary physical or cut-and-project models. This paragraph does not separately state or formalize invariant-measure classification or unique ergodicity. Weyl's classical theory (1916, *Math. Ann.* **77**, 313–352) retains its separate literature setting. Physical fairness, internal space, and soul phases remain `MODEL` interpretations. This is the finite reuse derivation in the source exposition, with no new Lean theorem or novelty claim.
:::

::: {.remark #rem-ch31-circular-window-discrepancy title="Finite-Step Error for Complementary-Width Circular Windows: A Mechanical-Word Application"}
**An application of existing results.** The card uses a special relation between rotation step and window width. Take any $0<\alpha<1$, initial phase $u\in\mathbb R$, and window centre $c\in\mathbb R$, and put $w=1-\alpha$ and $a=c-w/2$. Write $\{x\}=x-\lfloor x\rfloor$. For the left-closed, right-open circular window, define the first $N$ hits by

$$
H_N=\#\bigl\{1\le n\le N:\{u+n\alpha-a\}<w\bigr\}.
$$

Here $N\in\mathbb N$ may be zero, and the sample times are exactly $1,\ldots,N$. All these parameters satisfy

$$
\left|H_N-Nw\right|<1.
$$

**The exact mechanical-word correspondence.** Put $\rho=u-a$. The $n$th lower mechanical letter is

$$
b_n=\lfloor\rho+(n+1)\alpha\rfloor-\lfloor\rho+n\alpha\rfloor\in\{0,1\}.
$$

A carry occurs exactly when $\{\rho+n\alpha\}\ge1-\alpha$. Thus a window hit is precisely $b_n=0$: equality at the threshold causes a carry and excludes the right endpoint. With $C_N=\sum_{n=1}^{N}b_n$, we have $H_N=N-C_N$. This is the true-letter count in [`lower_mechanical_window_true_discrepancy`](lean:D5/S1/Words/Mechanical/MechanicalDensity.lower_mechanical_window_true_discrepancy), with slope $\alpha$, intercept $\rho$, start index $i=1$, and length $N$. That result gives $|C_N-N\alpha|<1$; negating the discrepancy gives the claimed bound. The endpoint telescope in [`lowerMechanicalWindowTrueCount_eq_floor`](lean:D5/S1/Words/Mechanical/MechanicalBalance.lowerMechanicalWindowTrueCount_eq_floor) also gives the exact error

$$
H_N-Nw=\{\rho+(N+1)\alpha\}-\{\rho+\alpha\}.
$$

Both fractional parts lie in $[0,1)$, explaining why the strict bound is independent of phase, window position, and sample length. For $N>0$, division gives $|H_N/N-w|<1/N$, so the hit frequency tends to $w$. The card takes $\alpha=\varphi-1$ and $w=2-\varphi$. Its nested fractional parts give the same membership predicate because $\{\{x\}-a\}=\{x-a\}$.

**Scope.** No irrationality assumption on $\alpha$ is needed, but the width must be $1-\alpha$. This application does not classify bounded remainders for arbitrary independent window widths, certify the card's floating-point computation, or establish physical fairness. It applies existing declarations and adds no Lean theorem or novelty claim.
:::

::: {.viz src="quantum-fairness-ledger" preset="ergodic" height="500"}
**Different starts, the same share.** Two states start at different phases and turn about the vertical axis by the golden angle at each step; the share of steps in the cyan window tends to $2 - \varphi \approx 0.382$ for both (the window frequency is an application of existing results to Conjunct 3 of [@thm-ch31-horizon-landauer-ergodic-fairness] and a null-frontier window, see [@rem-ch31-weyl-window-equidistribution-literature]; the bounded gaps between hits are Conjunct 4), and the gap between the hits and $T(2-\varphi)$ always stays below $1$ (an application of existing mechanical-word results, see [@rem-ch31-circular-window-discrepancy]).
:::

Seen in this long-horizon light, local disparities lose their sting: in our observer model (`MODEL`), short slices vary from smooth centers to turbulent rims, yet across compact-torus ergodic return the universe grants every soul phase impartial attractor-reunion opportunities, orthogonal rotation budgets, and self-referential fixed-point pull (cf. [Chapter 24](ch24-cosine-fixed-points-and-self-reference.md) [@rem-banach-dottie-hairy-ball-literature]), without a hair's breadth of favoritism.

::: {.viz src="quantum-fairness-ledger" height="620"}
The quantum fairness ledger: seat, gain, bonds, copies and history drawn on one Bloch sphere, each ledger beside a bar whose total does not move.
:::

Before dismantling the three scaffolds of the fixed-dimensional box in §31.4, we consolidate all five tiers of quantum fairness established across §§31.1–31.3 and their exact epistemic status in the master reference table below:

::: {.remark #rem-ch31-fivefold-fairness-table title="Master Ledger of Fivefold Quantum Fairness and Epistemic Status"}
The table below synthesizes the five fairness tiers established across §§31.1–31.3; clauses tagged `LEAN ✓` correspond to [@thm-ch31-seat-pythagorean-monogamy-fairness] and [@thm-ch31-horizon-landauer-ergodic-fairness], clauses tagged `Literature` cite [@rem-ch31-haar-isotropy-landauer-literature], [@rem-ch31-ckw-monogamy-literature], [@rem-ch31-weyl-window-equidistribution-literature], and [Chapter 30](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-query-sos-literature], `OPEN` marks [@conj-p-neq-np], and the fivefold abolition-of-privilege synthesis constitutes our cross-domain philosophical model (`MODEL`):

| Fairness Tier | Underlying Geometric, Algebraic & Thermodynamic Law | Epistemic Status | What Geometric "Privilege" Does It Abolish? (`MODEL`) |
| :--- | :--- | :--- | :--- |
| **1. Seat Fairness (席位公平)** | Unit pure-qubit Bloch norm & rank-one Born modulus-square reciprocity $\|\phi^*\bullet_v\psi\|^2 = \|\psi^*\bullet_v\phi\|^2$ (`LEAN ✓`); higher-D Haar sphere isotropy (`Literature`) | `LEAN ✓` / `Literature` / `MODEL` | Cuts away the external "third point $C$," abolishing privileged reference frames and one-way inspection |
| **2. Gain–Loss Fairness (得失公平)** | Complementary-context centered-purity Pythagoras (`LEAN ✓`), $\cos^2\theta + \sin^2\theta = 1$ (`Literature`), and Landauer balance $-\Delta S \le \beta Q$ (`LEAN ✓`; $k_B T \ln 2$ `Literature`) | `LEAN ✓` / `Literature` / `MODEL` | Abolishes the free-lunch greed of claiming $100\%$ 1D certainty while retaining $100\%$ orthogonal dynamical freedom |
| **3. Relational Fairness (关系公平)** | Cloning inner-product lock & Bell mixed marginal $\frac{1}{2}I_2$ (`LEAN ✓`); 3-qubit CKW monogamy $\tau(\mathbf{A}:\mathbf{B}) + \tau(\mathbf{A}:\mathbf{C}) \le 1 - \|\mathbf{r}_A\|^2 \le 1$ (`Literature`) | `LEAN ✓` / `Literature` / `MODEL` | Abolishes blind copying of live superpositions and wholesale monopolization of exclusive bipartite entanglement |
| **4. Horizon Fairness (博弈公平)** | Coherent amplification step-angle rotation (`LEAN ✓`), high-dimensional $\theta = \arcsin\sqrt{p} \approx 2^{-n/2}$ ($p = 2^{-n}$) & BBBV $\Omega(2^{n/2})$ lower bound (`Literature`), and $\mathrm{P} \neq \mathrm{NP}$ (`OPEN`) | `LEAN ✓` / `Literature` / `OPEN` / `MODEL` | Abolishes instant computational spoilers over the global causal crystal, sheltering the suspense of finite choice |
| **5. Ergodic Fairness (遍历公平)** | Birth-forgetting choice reset (`MODEL`), closed-subgroup torus Haar equidistribution & positive lower asymptotic visit density return (`LEAN ✓`), and null-frontier window frequency $\mu(W)$ (application of existing results, [@rem-ch31-weyl-window-equidistribution-literature]) | `LEAN ✓` / `Literature` / `MODEL` | Abolishes permanent caste lock-in from initial phase bias, realizing statistical holism across divergent local paths |
:::

Woven into the fabric of this monograph, the word *quantum* ceases to be cold operator machinery and acquires an unmistakable human warmth: **the universe cut away the lofty third point above, compelling all beings to measure one another pairwise at eye level; with the Pythagorean theorem it revoked the privilege of omniscience and omnipotence, with the horizon it sheltered the suspense of finite life, and finally with irrational ergodicity it guaranteed that every soul awakening from forgetting shall, across the long journey, receive an equally abundant share of starlight.**

---
