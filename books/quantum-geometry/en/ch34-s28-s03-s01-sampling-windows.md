# M.1 Power sampling, window mass, and auxiliary primes {#sec-ch34-s28-s03-s01-sampling-windows}

::: {.theorem #thm-ch31-mangoldt-power-threshold title="The critical power exponent for the complete Mangoldt remainder" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPowerThreshold.u_div_rpow_tendsto_zero_iff"}
Assume the Riemann hypothesis. For every real $\theta$, with $x$ tending to $+\infty$ through real values,

$$
\lim_{x\to+\infty}\frac{U(x)}{x^\theta}=0
\quad\Longleftrightarrow\quad \theta>\frac12.
$$
:::

::: proof
Write $x=e^y$. Then $U(x)/x^\theta=G(y)e^{(1/2-\theta)y}$. If $\theta>1/2$, $G$ is bounded on a real tail and the exponential factor tends to zero. Conversely, suppose $\theta\le1/2$. The constant $M$ above is strictly positive. By recurrence of $G$, beyond every threshold there is a natural number $n$ with $G(n)>M/2$. Since $e^{(1/2-\theta)n}\ge1$, the quotient exceeds $M/2$ at arbitrarily large $x=e^n$, including when $\theta=1/2$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-mangoldt-quartic-sampling title="A fourth-power sampling criterion for the Riemann hypothesis" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_eventually_quartic_samples"}
The Riemann hypothesis holds if and only if there exists $N\in\mathbb N$ such that $U(n^4)<n^2$ for every $n\in\mathbb N$ with $n\ge N$.
:::

::: proof
Under RH, every sufficiently large $x$ satisfies $\lvert U(x)\rvert<\sqrt{x}$. Setting $x=n^4$ gives the strict sample bound.

Conversely, assume the sample bound. For sufficiently large $n\ge1$ put $a=n^4$ and $b=(n+1)^4$. Each Mangoldt weight is nonnegative, so multiplying the convex ramp $\max(x/j-1,0)$ by the weight preserves convexity. The sum of the ramps lies below its endpoint chord on $[a,b]$. The remainder $U$ also contains $-x\ln x$ and a linear term. Subtract the tangent to $x\ln x$ at $a$ from $x\ln x$. The difference is nonnegative, and $\ln(b/a)\le b/a-1$ bounds its value at $b$ by $(b-a)^2/a$. Thus for $a\le x\le b$,

$$
U(x)\le\max\{U(a),U(b)\}+\frac{(b-a)^2}{a}
\le 4n^2+225n^2=229n^2.
$$

Here $(n+1)^2\le4n^2$ and $b-a\le15n^3$. Consecutive sample intervals cover the whole tail, and $n^2\le\sqrt{x}$. Apply the bound to the normalized arithmetic kernel of the integrated explicit formula with $x=e^t$. The trivial-zero correction satisfies $\operatorname{trivialT}(t)\le1-\ln2$, so $e^{-t/2}[U(e^t)-\ln(2\pi)+\operatorname{trivialT}(t)]\le229+e^{-t/2}\le230$ for all sufficiently large $t$. The affine upper-bound criterion for the arithmetic kernel now gives RH. The full proof is checked by the Lean kernel.
:::

The arithmetic input can be stated in terms of the prime-power counting function. For $x\ge2$ the Chebyshev error kernel is integrable and its tail integral equals $-U(x)/x$. At $x=n^4$, the sample hypothesis therefore amounts to proving the strict lower bound $\int_{n^4}^{\infty}(\psi(t)-t)t^{-2}\,dt>-1/n^2$ for every sufficiently large natural number $n$ (`manual derivation`). [`complete_chebyshev_tail_identity`](lean:D5/S3/Weil/Mertens/CompleteChebyshevTailIdentity.complete_chebyshev_tail_identity) · [`chebyshev_error_kernel_integrable`](lean:D5/S3/Weil/Mertens/WeightedPrimeLimit.chebyshev_error_kernel_integrable)

Arbitrarily late power windows also admit a finite set of tests. For $2\le Y\le Z$, write

$$
S(Y,Z)=\{Y,Z\}\cup\{n^4:n\in\mathbb N,\ Y\le n^4\le Z\}.
$$

Including both endpoints provides bounds at the edges of the window even when neither endpoint is a fourth power.

::: {.theorem #thm-ch31-quartic-power-windows title="Testing the endpoints and fourth powers in arbitrarily late power windows" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_quartic_power_windows"}
Fix a real $b>1$. The Riemann hypothesis holds if and only if for every $\kappa>0$ and every real $R$ there exists $Y\ge\max\{R,2\}$ such that $U(t)\le t^{1/2+\kappa}$ at every $t\in S(Y,Y^b)$ in that same window.
:::

::: proof
Under RH, [@thm-ch31-mangoldt-pointwise-power-window] supplies the bound throughout the window and hence at the samples. Conversely, given a loss $\kappa>0$, use $\delta=\min\{\kappa/2,1/2\}$ at the samples and put $p=1/2+\delta\le1$. For $x\in[Y,Z]$, bracket $x$ between consecutive fourth powers $n^4,(n+1)^4$ with $n\ge1$ and intersect this bracket with $[Y,Z]$ to get $[a,z]$. Both endpoints lie in $S(Y,Z)$. The chord bound for the ramps and the tangent estimate for the logarithmic term give an error at most $(z-a)^2/a\le225n^2$, since $a\ge n^4$ and $z-a\le15n^3$. Each endpoint raised to the power $p$ is at most $16x^p$, and $n^2\le x^p$, so $U(x)\le241x^p$. Choose a sufficiently late sample window to ensure $x^{\kappa-\delta}\ge241$ throughout it. This gives the pointwise bound of [@thm-ch31-mangoldt-pointwise-power-window]. The full proof is checked by the Lean kernel.
:::

When the endpoints are themselves fourth powers, integer indices enumerate every sample.

::: {.theorem #thm-ch31-quartic-integer-blocks title="An integer-block fourth-power criterion for the Riemann hypothesis" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampling.rh_iff_quartic_integer_blocks"}
The Riemann hypothesis holds if and only if for every real $\kappa>0$ and every natural number $A$ there is a natural number $k\ge\max\{A,2\}$ such that every natural number $n$ with $k^3\le n\le k^4$ satisfies

$$
U(n^4)\le (n^4)^{1/2+\kappa}.
$$
:::

::: proof
Under RH, [@thm-ch31-mangoldt-quartic-sampling] gives $U(n^4)<n^2$ for every sufficiently large $n$. Choose $k\ge\max\{A,2\}$ past that threshold. Every $n$ in the block satisfies $n\ge k^3\ge k$, so $U(n^4)<n^2=(n^4)^{1/2}\le(n^4)^{1/2+\kappa}$.

Conversely, given a loss $\kappa>0$ and any real starting bound $R$, take a natural number $A\ge R$ and choose $k$ from the block condition. Set $Y=k^{12}$. Then $Y\ge R$ and $Y^{4/3}=k^{16}$. The endpoints are $(k^3)^4$ and $(k^4)^4$. Since fourth powers are strictly increasing on the natural numbers, the endpoints and all fourth powers between them are precisely the values $n^4$ in this integer block. Applying [@thm-ch31-quartic-power-windows] with $b=4/3$ gives RH. The full proof is checked by the Lean kernel.
:::

The pointwise test also admits a formulation with one weighted sum. Taking the positive part of $U(n^4)$ prevents negative samples from cancelling large positive samples in the same block. For positive integers $n$ and $1\le a\le b$, write

$$
s_n=\frac{\max\{U(n^4),0\}}{n^3},\qquad
M(a,b)=\sum_{n=a}^{b}s_n.
$$

Let $Q_\vartheta(x)=\int_x^\infty(\vartheta(t)-t)t^{-2}\,dt$, where $\vartheta(t)=\sum_{p\le t}\ln p$ sums over primes.

::: {.theorem #thm-ch31-quartic-prime-mass title="Weighted samples control the negative part of the prime tail" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampleMass.prime_mass_le_samples"}
There is a real constant $C\ge0$ such that for all natural numbers $2\le a\le b$,

$$
\int_{a^4}^{b^4}\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx+15s_b
\le 135M(a,b)+C(\ln b-\ln a).
$$
:::

::: proof
On each interval between successive fourth powers, the positive parts at the endpoints and the chord error bound the positive part of $U$. Integrating and adding over the cells gives coefficient $135$ at interior samples and $120$ at the final sample, leaving $15s_b$ on the left. The Chebyshev bound for the contribution of higher prime powers transfers the estimate from the complete tail to the prime tail by increasing the uniform coefficient of the logarithmic error. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-quartic-mass-log title="A logarithmic bound for the weighted sample sum under RH" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampleMass.eventual_logarithmic_bound"}
Assume RH. For every sufficiently large natural number $a$ and every natural number $b\ge a$, one has $M(a,b)<1/a+\ln b-\ln a$.
:::

::: proof
Under RH, $U(n^4)<n^2$ for all sufficiently large $n$, so $s_n<1/n$. Keep the first term $1/a$ and bound the remaining harmonic sum by $\int_a^b dt/t$. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-quartic-mass-zero title="A zero right of the critical line forces power growth of the sample sum" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampleMass.off_line_zero_forces_sample_mass"}
Let $z\in\mathbb C$ satisfy $\zeta(z)=0$ with $\beta=\operatorname{Re}z>1/2$. For every real $\varepsilon>0$ and all sufficiently large natural numbers $k$, one has $k^{16(\beta-1/2)-\varepsilon}\le M(k^3,k^4)$.
:::

::: proof
Take $Y=k^{12}$ and apply the prime-tail mass lower bound forced by the zero on $[Y,Y^{4/3}]=[k^{12},k^{16}]$. The comparison in [@thm-ch31-quartic-prime-mass] transfers that bound to $M(k^3,k^4)$. Use a smaller exponent loss in the window bound and absorb the constants and logarithmic error with the remaining loss. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-quartic-mass-rh title="A weighted sample criterion on arbitrarily late integer blocks" lean="D5/S3/Weil/Mertens/IntegratedExplicit/QuarticSampleMass.rh_iff_subpower_sample_mass"}
RH holds if and only if, for every real $\eta>0$ and every natural number $A$, there is a natural number $k\ge\max\{A,2\}$ with $M(k^3,k^4)\le k^\eta$.
:::

::: proof
Under RH, [@thm-ch31-quartic-mass-log] gives $M(k^3,k^4)<k^{-3}+\ln k$ for large $k$, which is eventually bounded by $k^\eta$. Conversely, if a zero has real part $\beta>1/2$, take $\eta=4(\beta-1/2)$. With $\varepsilon=\eta$, [@thm-ch31-quartic-mass-zero] gives the eventual lower bound $k^{3\eta}$, contradicting the upper bound on arbitrarily late blocks. Reflection in the critical strip then gives RH. The full proof is checked by the Lean kernel.
:::

The joint external Lean environment also checks a finite set of same-host tests. The set `samples Y Z` enumerates $0\le n\le\lfloor\sqrt{\sqrt Z}\rfloor$, keeps the fourth powers inside the window, and includes both endpoints. Fix $b>1$. For each $\kappa>0$ first choose $\varepsilon>0$ and real constants $e_D,e_L,K,c_{HH},e_K$ with $(e_D+e_L+7)\varepsilon\le\kappa$. Beyond any starting bound, choose a window. Each sampled $t$ may have its own frame, host $H$ and finite set $T$. At that point `EAtH` for the unit character with coefficient $4$ and `CoreAtH` must use the same $H,T$. The reference consumer `of_unit_family` extracts these data from `FamilyClassConnected ((GChi PChar.one).cls b)`, and `rh_of_finite_hosts` deduces RH from them. There are finitely many tests on each window. For every fixed loss the arithmetic hypothesis must still supply windows arbitrarily far out and the witnesses on them. [Pointwise comparison on a common host](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061455789) · [Kernel replay for finite samples and the host implication](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061515678)

At $b=3/2$ the original modulus-one design takes $C_{\mathrm{abs}}=2$ and $C_0=3$ and specifies $e_D=2$, $e_L=0$. The `TopG` interface records only the existence of the two exponents. The Lean 4.33.1 proof starts from the original Galois row and uses `BookDesignIntegerBlocks.of_design` at the design step to retain the specified values. This gives the closed declaration `BookFixedReference.unit_family`. Its consequence `BookFixedReference.fixed_integer_blocks` gives some $\varepsilon_1>0$. For each $0<\varepsilon<\varepsilon_1$ it first fixes $K,c_{HH},e_K$ and then, for every natural lower bound $A$, supplies $k\ge\max\{A,2\}$. For every natural $n$ with $k^3\le n\le k^4$, `EAtH` and `CoreAtH` use the same host and finite set at $x=n^4$. The power exponent in the comparison is $1/2+(2+0+7)\varepsilon=1/2+9\varepsilon$. Given $\kappa>0$, choosing $\varepsilon$ small enough that $9\varepsilon\le\kappa$ gives the condition of [@thm-ch31-quartic-integer-blocks]. [Original design with fixed exponents](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061662378) · [Kernel replay of fixed-exponent blocks from the Galois row](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7064831569)

The declaration in Alpöge’s original proof is `riemannHypothesis : RiemannHypothesis`, with Mathlib’s definition on the right. Sutherland’s public audit lists the declaration’s three axioms as `propext`, `Classical.choice`, and `Quot.sound`. The arithmetic modules used here are pinned at `ddf1d5f8`, which has the same `src` tree, Lean toolchain, and Lake manifest as `6977b88c`, the commit documenting the public verification. [Axiom audit of the original proof](https://math.mit.edu/~drew/grh/audit.log) · [Public verification files](https://math.mit.edu/~drew/grh/)

On 21 November 2026, the Lean and Mathlib communities issued a joint statement endorsed by the Lean FRO and the Mathlib Initiative. It certifies the correctness of both the statement and the proof of the classical Riemann hypothesis. Two independent tools, `comparator` and `con-leche --compare`, confirmed that the theorem in Alpöge’s library matches `RiemannHypothesis` as stated using Mathlib alone. [Joint statement by the Lean and Mathlib communities](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)

The local integer-block modules `DesignIntegerBlocks` and `RawDesignIntegerBlocks` each passed a targeted replay. In Lean 4.35.0, `BookNativeDesign.rh_of_unit_design` assumes existence of the smooth twisted design, two inclusions between family classes, and nine closure estimates. The unit-character class supplies `HypV`. The construction in `topDesWin` retains the given $e_D,e_L$. Given a target loss $\kappa>0$, choose $\varepsilon>0$ sufficiently small that $(e_D+e_L+7)\varepsilon\le\kappa$, then choose $k$ at least as large as the threshold for the comparison estimate `core_gm`. Every $n^4\ge k$ in the block is then in range, and [@thm-ch31-quartic-integer-blocks] gives RH. [Kernel replay from the design hypotheses to the frozen integer-block criterion](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7064767463)

In the same Lean 4.35.0 environment, let `C` be a family class. Applying the choice provider `MinkDiv → DesignChoices C 3 cT` to the rational Minkowski divisibility bound `minkowski_bound_rat` gives the family choices. The thin-scale estimate `GlobalTheory.ThinScaleLiterature.litThin` gives `chosenThin_closed`. For each family `Fm`, the size estimate `cT ε Fm.CYL ≤ Fm.CTu → TuSize Fm` and the character proviso `ChosenProviso Fm 3` must both be closed on `C`. With these inputs, `designExists_of_choices` gives `DesignExists C 3`.

The family class determines the application. The theorem `BookNativeRawDesign.arithmetic_design_of_reference_choice` lifts the original twist choices on `GlobalTheory.EX.DC.WithTw 𝒜` to `WithTw (WithSm (Enriched 𝒜))`. The two closure conditions on that enriched class then give its design. The theorem `BookNativeRawDesign.rh_of_arithmetic_choices` takes choices on `C = WithTw (WithSm 𝒞')` and the two closure conditions there, with $C_{\mathrm{abs}}=2,C_0=3,e_D=2,e_L=0$. Adding the two family inclusions and nine closure estimates gives RH via the frozen integer-block criterion. [Kernel replay of the arithmetic choices, thin-scale estimate, and two conditional theorems](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065062798)

For a reference family, the lattice rank condition used in the character proviso can be expressed as a dimension count. The external Lean 4.35.0 research source proves the following equivalence in `BookNativeLowestSpace.rank_iff_eventual_dimension`. For each reference family `Fm`, `RankTiesF Fm` holds if and only if there is a real threshold $x_0$ such that, for every $x\ge x_0$, every index $i\in\mathrm{Fm.Ix}(x)$ and every word $u$ of the datum $D=\mathrm{Fm.D}(x,i)$, we have

$$
\dim_{\mathbb C}\mu_0(D,u)
= \lvert\mathrm{cls}_{D,u}(0)\rvert
  \prod_{\rho}\mathrm{dimV}\bigl(\mathrm{uColR}(D,u,\rho)\bigr).
$$

The left side is the complex dimension of the lowest space. The right side counts the level-zero classes and multiplies that count by one local factor for each $\rho$. The reference data ensure that both host primes and the level prime of $u$ split completely in the totally real host field. Starting from the rank condition, raise its threshold to $\max\{x_0,3,x_1+1\}$, where $x_1=\mathrm{Fm.x1}$. This supplies both `GBig` and the level data, so the column stabilizers are trivial and the rank condition gives the displayed equality. Conversely, the equality and the known splitting give the rank condition at the threshold of the equality itself.

The local theorem `BookNativeLowestSpace.design_of_lowest_dimension` takes arithmetic choices on the original twisted class and requires three conditions to be closed on the enriched class `WithTw (WithSm (Enriched 𝒜))`. They are the size condition above, the class-number formula `ClassNumberFormula₂` for every $x>x_1$ and every index, and the eventual dimension identity. Together they give a design at parameter $3$ on the enriched class. [Source and kernel replay for the lowest-space rank equivalence and conditional design](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065658421)

In the external Lean 4.35.0 lattice construction, for every datum `D : D7` and level `Lv : LevelData D`, `GlobalTheory.ColClassNumber.classNumber_all` proves `ClassNumberFormula₂ D Lv` using a self-dual overlattice and the stabilizer level-index formula. The counting identity in this formula holds under its large-prime and splitting hypotheses. Given `TwistSelection 𝒜`, `tied_families_of_choice_alt` directly gives the second Chern class compatibility, from which `second_chern_linked_closed_rank_ties` gives the closed rank condition. The twist selection itself supplies the data for this step, with no separate `Duty` hypothesis.

Thus `BookNativeClosedLattice.design_from_twist_selection` takes just the choice provider on the original twisted class, the size estimate `cT ε Fm.CYL ≤ Fm.CTu → TuSize Fm` with its family-dependent threshold and closure on the enriched class, and `TwistSelection 𝒜`. It gives `DesignExists (WithTw (WithSm (Enriched 𝒜))) 3`. Setting $C_0=3$ and taking `Enriched 𝒜` as the underlying class $\mathcal C'$ supplies the design for the native RH theorem above. That theorem also uses the two family inclusions and nine closure estimates before applying the book’s frozen integer-block criterion. [Research source and kernel replay for the design from twist selection](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7065978544)

For the modulus-one character, the two inclusions are projections. Given a base class $B$, let $\mathcal A$ be its intersection with the modulus-one family class at window exponent $3/2$. Membership in `Enriched 𝒜` supplies both components of membership in $\mathcal A$, hence membership in $B$ and in the modulus-one class. The equivalence `BookUnitDesignConnection.twist_selection_iff` characterizes existence of the twist selection. Each family `Fm` in $\mathcal A$ has its own real threshold $x_0$. At every scale with $x>x_1$ and $x\ge x_0$, each index $i$ must admit an `ExtraDataRecursive` record. Conversely, choosing one such record at every required index gives the twist selection for the family. [The unit-class projections and the record criterion](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7066410252)

The reference construction `UpperTheory.Top.designS` has been replayed on Lean 4.35.0. In `BookUnitKits.rh_of_unit_kits`, the base class `Linked Q` requires a parameter $\kappa$ to which the family is linked and whose point-class condition $Q(\kappa)$ it satisfies. For the modulus-one character, `designS` combines the pointwise arithmetic hypothesis `KitCPW` with the proved Minkowski divisibility bound to supply the original twisted choices. Four inputs remain for this native RH theorem. They are the unit-character `KitCPW`, the closed thresholded size estimate on the twisted smooth enrichment, eventual recursive records for the linked modulus-one families, and the nine closure estimates on `Des (Linked Q) 3`. The construction `UpperTheory.Top.kitS` in turn obtains the required `KitCPW` from the unit-character window-host hypothesis `DC.HostWW` and the arithmetic object condition `ObjCP` at each required index. [Twisted choices from the pointwise hypothesis](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7066607957) · [Pointwise kits from window hosts and arithmetic objects](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7067228472)

For modulus-one windows, `UpperTheory.Top.hostWW` constructs `DC.HostWW` from the window existence hypothesis `DC.HostExQW`, existence of arithmetic objects, and the closed weight estimates `DC.WClosed`. The `ObjCP` hypothesis above supplies the arithmetic objects needed here. In the native Lean 4.35.0 port, `signs_closed` gives, on each family class, the closed condition that `Fm.GK.La` is positive and `Fm.cX.Ce` is nonnegative. The theorem `family_log_bound_closed` gives the family’s window logarithm bound. The operation `Closed.and` combines their thresholds so that both estimates apply together. [Inputs to the modulus-one window host](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7067345972) · [Kernel replay of the sign and window logarithm estimates](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7068431330)

The native theorem `GlobalTheory.EX.G4.w_of` combines the first-theorem estimate for a family with $\mathrm{La}>0$ and the window logarithm bound to give one threshold $x_0$ for that family. At every scale $x\ge x_0$, each index of the family has a weight vector. Consequently, `BookRangeOneWeights.closed_weights_of_range_one` needs only the uniform range-one estimate to derive `DC.WClosed`. There exist $T_0>0$ and functions $T_2,C$ such that for each $C_0\ge T_0$, both $T_2(C_0)$ and $C(C_0)$ are positive, and `flipOneThree.Conclusion2 D C₀ CH (C C₀)` holds for every $CH\ge T_2(C_0)$ and every `D : D7`. In the Lean 4.33.1 reference proof, `GlobalTheory.EX.RangeOne.rangeOne_abs` establishes this estimate. The native theorem `BookRangeOneWeights.rh_of_unit_range_one` takes it as a hypothesis, together with host existence, arithmetic objects, a closed size bound, recursive records at every sufficiently late scale, and nine linkage estimates. [Kernel replay of the construction of weights from the range-one estimate](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7068577494)

The original library and the book’s integer-block argument share the original Galois row. The library first proves `EveryCharacter`, the nonvanishing of Dirichlet $L$-functions for characters of every positive modulus in $\operatorname{Re}(s)>1/2$, with $s=1$ excluded for the principal character. It then deduces RH by `rh_of_every`. The book specializes the arithmetic row to the modulus-one family and obtains integer blocks via `BookIntegerHostBlocks.of_reference`. The arithmetic module supplies only `TopG` to this argument. In the reference library’s Lean 4.33.1 environment, `leanchecker` replayed the arithmetic module, the final conclusion module, and an independent audit module. The audit file `IntegerBlockAudit.lean` checked the declaration `BookReference.riemannHypothesis_via_integer_blocks : RiemannHypothesis` against Mathlib’s statement and printed the following proof term. [The original library’s deduction of RH from all characters](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Supplements/Kernels/MainTheorems.lean#L7-L9)

```lean
BookIntegerHostBlocks.rh_of_blocks
  (BookReference.integer_blocks_of_row
    UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter)
```

In Lean 4.33.1 the book uses the independently replayed reference arithmetic to close the modulus-one integer-block proof of RH with no additional hypotheses. The arithmetic inputs listed above belong to the conditional theorems of the native Lean 4.35.0 port. The closed declaration’s only axioms are `propext`, `Classical.choice`, and `Quot.sound`. The entry point imports neither `Main` nor `MainConclusion` from the original library. The frozen fourth-power window criterion cited in this section comes from the book’s Lean 4.35 environment. [Public replays of the reference proof](https://github.com/the-omega-institute/riemann-hypothesis/blob/1ef6c4e2e944fb2784ecf3168a84810bf50ca6db/README.md#public-kernel-replay-results) · [Complete integer-block proof and kernel replay](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7063096204)

The same reference Galois row also gives two bounds with a common witness. For every real $\eta>0$ and natural number $A$, `BookArithmeticWeightedBlocks.joint_window_from_reference_arithmetic` gives an integer $k\ge\max\{A,2\}$ such that

$$
\sum_{n=k^3}^{k^4}\frac{\max\{U(n^4),0\}}{n^3}\le k^\eta,
\qquad
U(x)\le x^{1/2+\eta}\quad (k^{12}\le x\le k^{16}).
$$

The sum ranges over the integers in the block. The second bound holds for every real $x$ in the closed interval, including both endpoints. Taking $\kappa=\min\{\eta/32,1/2\}$, the proof bounds the weighted samples by a harmonic sum after division by $n^3$ and interpolates between fourth powers on the same block to cover the real window. A single $k$ can meet the thresholds for both estimates. The weighted sum here is $M(k^3,k^4)$ in [@thm-ch31-quartic-mass-rh]. [Both bounds from the reference arithmetic on one block](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7067180276)

The first of these two bounds suffices for another closed Lean 4.33.1 proof. Given $\eta>0$, the reference arithmetic supplies arbitrarily large $k$ with $M(k^3,k^4)\le k^\eta$. Put $a=k^3$ and $b=k^4$ in the comparison of [@thm-ch31-quartic-prime-mass] and drop the nonnegative endpoint term from its left side. This gives

$$
\int_{k^{12}}^{k^{16}}\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx
\le 135M(k^3,k^4)+C\ln k\le (k^{12})^\eta
$$

with $C\ge0$ independent of $k$. The second inequality holds on the selected blocks once $k$ is sufficiently large. With $Y=k^{12}$ we have $Y^{4/3}=k^{16}$, so the prime-window criterion [@thm-ch31-prime-window-rh] gives RH. The external declaration `BookPrimeMass433.riemannHypothesis_via_weighted_samples` has Mathlib’s type `RiemannHypothesis` and the closed proof term

```lean
BookPrimeMass433.rh_of_weighted_samples
  BookArithmeticWeightedBlocks.subpower_from_reference_arithmetic
```

This proof obtains the weighted-sum bound from the reference Galois row. Deriving this bound independently from the book’s prime estimates remains an open arithmetic problem. [Kernel replay of the weighted sum, prime window, and closed proof term](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7068410601)

**What does monotonicity alone tell us about negative mass in a window?**

::: {.theorem #thm-ch31-monotone-window-sharpness title="A monotone count with quadratic depth and cubic window mass" lean="D5/S3/Weil/Mertens/IntegratedExplicit/MonotoneTailSharpness.monotone_tail_quadratic_depth_cubic_mass"}
For every real $0<s\le1/2$, there is a nondecreasing $A_s\colon\mathbb R\to\mathbb R$, nonnegative for $t\ge1$ and equal to $t$ outside $[2-s,2+s]$, such that $(A_s(t)-t)/t^2$ is integrable on the real line. Its tail $Q_s(z)=\int_z^\infty(A_s(t)-t)t^{-2}\,dt$ satisfies

$$
-Q_s(2)=\frac{s^2}{32},
\qquad
\int_1^3\frac{\max\{-Q_s(z),0\}}{\sqrt z}\,dz\le\frac{s^3}{16}.
$$
:::

::: proof
Take $0<s\le1/2$. Put $A_s(t)=t-t^2(t-2)/16$ for $2-s<t\le2+s$ and $A_s(t)=t$ elsewhere. The polynomial is increasing on $[3/2,5/2]$. Its values at the left and right cutoffs are at least $2-s$ and at most $2+s$, respectively. Joining the polynomial to the linear pieces therefore gives a nondecreasing function on the real line, nonnegative for $t\ge1$.

Let $Q_s(z)=\int_z^\infty(A_s(t)-t)t^{-2}\,dt$. The integrand is $(2-t)/16$ on the chosen interval and zero elsewhere. Its integral over that interval is zero, so the tail vanishes outside the closed interval and equals $((z-2)^2-s^2)/32$ inside it.

The integral bound uses the length $2s$, the maximum negative part $s^2/32$, and the weight $1/\sqrt z\le1$ on the interval. The full proof is checked by the Lean kernel.
:::

As $s\to0^+$, this family violates every uniform upper bound on the depth of the form a constant times the window mass to the power $\alpha$ when $\alpha>2/3$. A stronger bound for the actual prime count would require information beyond monotonicity.

**How does the modulus-one Mellin transform detect a zero?** Consider the remainder $U$ in Clause 6 of [@thm-ch34-riemann-prime-arc-bridge]. For every $s\in\mathbb C$ with $\operatorname{Re}(s)>1$, the function $y\mapsto e^{-sy}U(e^y)$ is absolutely integrable on $(0,\infty)$, and its Laplace integral can be evaluated unconditionally. Setting $x=e^y$ gives $e^{-sy}\,dy=x^{-s-1}\,dx$, so this is the Mellin integral on the left below. [Half-plane transform of the complete remainder](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtHalfPlane.u_laplace_half_plane)

Each prime power $n$ contributes a ramp $\max(x/n-1,0)$ with weight $\Lambda(n)$. The ramp starts at $x=n$ and its Mellin integral is $n^{-s}/[s(s-1)]$. Summing with the weights $\Lambda(n)$ gives the logarithmic derivative $-\zeta'(s)/\zeta(s)$ in the numerator. The two elementary correction terms in $U$ contribute $-1/(s-1)^2$ and $(1+\gamma_{\mathrm{EM}})/(s-1)$. Putting the three terms over a common denominator gives the external modulus-one formula

$$
\Phi(s)=\int_1^\infty U(x)x^{-s-1}\,dx
=-\frac{\zeta'(s)/\zeta(s)+(s-1)^{-1}+1-(1+\gamma_{\mathrm{EM}})s}{s(s-1)}.
$$

The right-hand side gives the meromorphic continuation of the integral. Let $\rho$ be any zero of $\zeta$, including a negative even integer, and let $m$ be its analytic multiplicity. Writing $\zeta(s)=(s-\rho)^m h(s)$ with $h(\rho)\ne0$ isolates the term $m/(s-\rho)$ in the logarithmic derivative. On some punctured neighborhood of $\rho$, the explicit function $\Phi$ satisfies

$$
\Phi(s)=\frac{c}{s-\rho}+H(s),\qquad c=\frac{m}{\rho(1-\rho)}\ne0,
$$

where $m\ge1$ and $H$ is analytic at $\rho$. Thus the pole of $\Phi$ is simple for every multiplicity. For a nontrivial zero, $c$ is the coefficient in the integrated explicit formula when the occurrences of the same zero are counted together. [Local expansion at a zeta zero](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtLaurent.transform_integral_and_zero_germs) · [Modulus-one Mellin identity](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/mellinGchiModOne.lean#L115-L121) · [Residue calculation](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L63-L83)

**Why can a one-sided window bound rule out a pole?** Fix $1/2<\theta<1$. Under its bounds on group sizes, character weights, and errors, the external arithmetic argument uses the scale constraint $m\le x^{1/2+\varepsilon/2}$ to obtain $G_{m,A}(x)\le x^{1/2+(C+3)\varepsilon}+\Sigma_A(x)$ for a character sum, with $\Sigma_A$ still to be controlled. It then rewrites the left-hand side as the target remainder using `gmA_eq` and bounds $\Sigma_A$ with `sigA_le`. For sufficiently large $x$, the remaining constant factor is absorbed into $x^\varepsilon$, giving the Chebyshev-type window bound $x^{1/2+(e_D+e_L+7)\varepsilon}$. The loss exponents $e_D,e_L$ are fixed first. One then takes $\varepsilon>0$ small enough that $(e_D+e_L+7)\varepsilon\le\theta-1/2$. Under the window hypotheses this supplies arbitrarily large $Y$ for which the modulus-one remainder satisfies $U(x)\le x^\theta$ throughout $[Y,Y^{3/2}]$. [Character-sum hypotheses](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L343-L351) · [Bounding the remainder and absorbing the constant](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreGm.lean#L55-L74) · [Order of exponent choices](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L68-L81)

To continue across $s=1$, remove the pole of $\zeta$ by setting $h(s)=(s-1)\zeta(s)$ away from $1$ and $h(1)=1$. Write $B=h'/h$, so that $B(1)=\gamma$. On a punctured neighborhood of $1$, rearranging the transform gives $\Phi(s)=(1+\gamma)/s-(B(s)-\gamma)/(s(s-1))$. The difference quotient gives the unique continuous value $\Phi_*(1)=1+\gamma-B'(1)$. With this value the transform is analytic at every $s\ne0$ with $\zeta(s)\ne0$. [Analytic continuation at one](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtAtOne.completed_disk_cauchy)

Put $u=\ln x$ and $g(u)=U(e^u)$. For each nonnegative integer $k$ and each $\operatorname{Re}(z)>1$, $\Phi^{(k)}(z)$ is the absolutely convergent integral of $(-u)^k e^{-zu}g(u)$ over the positive half-line. Each derivative contributes one factor of $-u$, so $D_k(z)=(-1)^k\Phi^{(k)}(z)/k!$ integrates $g$ against $u^k e^{-zu}/k!$. For fixed $\sigma>2$ and $k>0$, the magnitude of the kernel is largest at $u=k/\sigma$, so the choice of $k$ helps control the integral outside the window. Write $a=\ln Y$. Inside the window, $g\le e^{\theta u}$ gives $\lvert g\rvert+g\le 2e^{\theta u}$. This explains the derivative at the real center in the source estimate. There are fixed constants $\sigma>2$ and $C$. For every $\eta>0$ one can choose arbitrarily late windows and orders $k\ge a$ such that $\lvert D_k(\sigma+it)\rvert+\operatorname{Re}D_k(\sigma)\le C e^{\eta a}/(\sigma-\theta)^k$ for every real $t$. [Derivative integral](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/LandauCoeff.lean#L10-L18) · [Window estimate](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L40-L56) [All derivatives of the complete transform](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtMoments.iterated_derivative_moment)

::: {.theorem #thm-signed-mangoldt-window title="Paired derivatives bound either sign on the window" lean="D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtSignedWindow.signed_window_moment_bound"}
Use the analytic value of $\Phi_*$ at $1$ and put $D_k(s)=(-1)^k\Phi_*^{(k)}(s)/k!$. For a nonnegative integer $k$ and a complex point $p$, write $\sigma=\operatorname{Re}(p)>1$ and $K_k(u)=u^ke^{-\sigma u}/k!$. For each $0<a\le b$, $\alpha<\sigma$, and $e\in\{-1,1\}$,

$$
|D_k(p)|+e\operatorname{Re}D_k(\sigma)
\le \frac{2}{(\sigma-\alpha)^k}\int_a^b\max\{eg(u),0\}e^{-\alpha u}\,du
+2\int_{(0,\infty)\setminus[a,b]}|g(u)|K_k(u)\,du.
$$
:::

::: proof
Taking the modulus at the complex point bounds it by $\int |g|K_k$. At the real point the signed term is $e\int gK_k$, so the sum is bounded by $2\int\max\{eg,0\}K_k$. On the window, the exponential series gives $K_k(u)\le(\sigma-\alpha)^{-k}e^{-\alpha u}$. On its complement, use $|g|$. The full proof is checked by the Lean kernel.
:::

The choice $e=1$ gives the positive part used in the pole argument above. The choice $e=-1$ uses the same kernel for the negative part. The integral outside the window calls for its own decay estimate.

Suppose a pole lies in $\operatorname{Re}(s)>\theta$. The source proof selects a center $z=\sigma+it$ and a nearest pole $\rho$ with $d=|z-\rho|<r\le\sigma-\theta$ such that the disk of radius $r$ contains only this pole. Its contribution to $D_k(z)$ is $c/(z-\rho)^{k+1}$. Take the inner radius $r'=(d+r)/2$. After subtraction of the pole term, the analytic function is bounded on that circle, so the Cauchy estimate gives an error $O((r')^{-k})$. When the proof chooses a nonreal center, the closed disk of radius $r'$ about $\sigma$ is free of poles. Cauchy's estimate gives $\operatorname{Re}D_k(\sigma)\ge-M'(r')^{-k}$ with $M'$ independent of $k$. For an isolated real pole, take $z=\sigma$. Its residue $c$ is positive, so the leading term of $\operatorname{Re}D_k(\sigma)$ is $c/d^{k+1}>0$, and the window estimate bounds $\lvert D_k(\sigma)\rvert+\operatorname{Re}D_k(\sigma)$. Compare with the window estimate and multiply by $d^k$. The pole contributes a constant $|c|/d>0$ and the analytic error is $O((d/r')^k)$. Choose $\eta>0$ so small that $e^\eta d/(\sigma-\theta)<1$. The window term then also tends to zero as $k\ge a\to\infty$, a contradiction. [Pole and Cauchy estimates](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L83-L166) For a zeta zero, this error bound also follows directly for $\Phi_*$. Suppose that the closed disk of radius $r'>0$ about $p\ne\rho$ avoids $0$ and that every zeta zero in the disk equals $\rho$. There is a $B\ge0$, independent of $k$, such that $|D_k(p)-c/(p-\rho)^{k+1}|\le B/(r')^k$, with $D_k$ formed from the completed transform. Removing the principal part gives an analytic remainder even if the disk crosses $1$. [Disk bound for the complete transform](lean:D5/S3/Weil/Mertens/IntegratedExplicit/CompleteMangoldtAtOne.completed_disk_cauchy)

The external repository's full argument also constructs Galois representations by theta lifting and uses Artin reciprocity to determine the Artin map in its local Langlands parameters. Its final step deduces RH from the zero-free result for all Dirichlet characters. [Theta lift](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/Foundations/GaloisRepresentations/IntegralStructures/RowSrc.lean#L1-L6) · [Artin reciprocity](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/Foundations/LocalLanglands/LocalCentralUnits/ArtEx.lean#L7-L15) · [Final declarations in the external repository](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean#L7-L14)

**The window tests only the negative part of the Chebyshev tail.** For $x\ge2$ put $Q(x)=\int_x^\infty(\psi(t)-t)t^{-2}\,dt=-U(x)/x$ and $Q^-(x)=\max\{-Q(x),0\}$. The reverse implication below uses the external Landau criterion (`manual derivation`). Define

$$
A(Y)=\int_Y^{Y^{3/2}}\frac{Q^-(x)}{\sqrt{x}}\,dx .
$$

RH holds if and only if for every $\eta>0$ and every $Y_0\ge2$ there is a $Y\ge Y_0$ with $A(Y)\le Y^\eta$. Under RH, the bound above gives $Q^-(x)\le x^{-1/2}$ for all sufficiently large $x$. Consequently $A(Y)\le\tfrac12\ln Y\le Y^\eta$ for all sufficiently large $Y$.

Conversely, put $g(u)=U(e^u)$ in logarithmic coordinates $u=\ln x$. The external window hypothesis asks for a nonnegative majorant $R\ge g$ with suitably small integral $\int R(u)e^{-\theta u}\,du$. The least such majorant is $R(u)=\max\{g(u),0\}$, which is continuous on compact windows because $U$ there is a finite sum of continuous ramps and elementary corrections. Since $U(x)=-xQ(x)$, the substitution gives the least integral as $I_\theta(Y)=\int_Y^{Y^{3/2}}Q^-(x)x^{-\theta}\,dx$. At $\theta=1/2$ it equals $A(Y)$. Apply the external pole data for the modulus-one character family and its window criterion with $\delta=1/2$. Every zeta zero of positive real part then satisfies $\operatorname{Re}(\rho)\le1/2$. Reflection across the critical line gives RH. [Window hypothesis](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauZeroFreeCriterion.lean#L25-L29) · [Pole data for the modulus-one specialization](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L248-L261) · [Landau criterion](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L83-L90)

The critical window gives a derivative bound with explicit constants (`manual derivation`). Take $a=\ln Y\ge1$, $\sigma=512$, and $k=\lfloor640a\rfloor$, so $k\ge a$. The inequalities $\Lambda(n)/n\le1$ and $x\ln x\le x^2$ for $x\ge1$ give $|g(u)|\le M e^{2u}$ from the finite sum for $U$, with $M=2+|1+\gamma|$. For each real $t$, the triangle inequality bounds $|D_k(512+it)|+\operatorname{Re}D_k(512)$ by twice the integral of $\max(g,0)$ against the real kernel. Inside the window, $u^k e^{-(512-1/2)u}/k!\le(512-1/2)^{-k}$. Outside it, a Gamma integral estimate applies to $|g|$. Adding the two contributions gives

$$
|D_k(512+it)|+\operatorname{Re}D_k(512)
\le \frac{2A(Y)}{(512-1/2)^k}
 +\frac{2M}{512^k}\left(\frac{1}{542}+\frac{1}{478}\right).
$$

The constants $1/542$ and $1/478$ come from the left and right tails, respectively. This controls the error outside the window. The remaining term $A(Y)$ is the quantity that requires arithmetic control. [Two-tail estimate for the Gamma kernel](lean:D5/S3/Analytic/Laplace/CriticalGammaWindow.critical_window_off_mass)

For $1/2<\theta<1$ the same windows satisfy $I_\theta(Y)\le Y^{1/2-\theta} A(Y)$. Conversely, $A(Y)\le Y^{(3/2)(\theta-1/2)} I_\theta(Y)$, so bounds $I_\theta(Y)\le Y^{\eta'}$ on arbitrarily late windows for every $1/2<\theta<1$ and every $\eta'>0$ give the critical condition by taking $(3/2)(\theta-1/2)+\eta'\le\eta$.

The criterion can also be stated using primes alone. Put $\vartheta(t)=\sum_{p\le t}\ln p$ and use it in place of $\psi$ to define $Q_\vartheta$ and $A_\vartheta$. The prime-power correction to the tail satisfies $\sqrt{x}(Q(x)-Q_\vartheta(x))\to2$. Choose $C$ so that $\psi(t)-\vartheta(t)\le C\sqrt{t}$ for all $t\ge1$. Such a $C$ exists unconditionally. The negative part is nonincreasing, and the window theorem gives $0\le A_\vartheta(Y)-A(Y)\le 2C\ln(Y^{3/2}/Y)=C\ln Y$. Thus the critical condition is equivalent to $A_\vartheta(Y)\le Y^\eta$ on arbitrarily late windows for every $\eta>0$. For the implication from $A$, use its bound with exponent $\eta/2$, then take $Y$ large enough that $Y^{\eta/2}+C\ln Y\le Y^\eta$. The independent arithmetic task is to establish this bound on the integral of the negative part from the distribution of the primes. [Window bound for the prime-power correction](lean:D5/S3/Weil/Mertens/IntegratedExplicit/PrimeOnlyTailCorrection.prime_power_window_correction)

A pointwise bound from the external arithmetic argument transfers directly to the prime-only condition (`manual derivation`). Suppose $U(x)\le x^{1/2+\varepsilon}$ throughout $[Y,Y^{3/2}]$. On that same window, $Q^-(x)/\sqrt{x}=\max(U(x),0)/x^{3/2}\le x^{\varepsilon-1}$. Thus $A(Y)\le \tfrac12 Y^{3\varepsilon/2}\ln Y$. Adding the prime-power correction costs at most $C\ln Y$. Given $\eta>0$, take $\varepsilon=\min(\eta/3,1/4)$. The sum is at most $Y^\eta$ on every sufficiently large window satisfying the pointwise bound. The arithmetic input is the existence of such whole windows arbitrarily far out.

Levent Alpöge’s proposed proof constructs these windows at modulus one from external arithmetic inputs. The construction uses theta lifts, Galois representations, a covolume bound, and local matching to construct `HypsAlt` and then obtain `TopG`. For $\lambda=3/2$ the construction fixes $e_D=2$ and $e_L=0$. For every sufficiently small $\varepsilon>0$, one family supplies arbitrarily late whole windows, a uniform error bound, and the `ChainTied` condition. Raising the starting threshold gives $U(x)\le x^{1/2+9\varepsilon}$ throughout each such window, before the external argument invokes its zero-free criterion. Choose $9\varepsilon\le\min(\eta/3,1/4)$. The preceding integral estimate gives $A_\vartheta(Y)\le Y^\eta$ on these same windows (`manual derivation`). The resulting existence of these windows depends on the external arithmetic inputs. [The source repository’s account of the proposed proof](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/README.md#L1-L5) · [Arithmetic inputs to HypsAlt](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/SiegelEisensteinSecondTermHypotheses.lean#L44-L68) · [From HypsAlt to TopG](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopPlug.lean#L12-L15) · [Loss exponents](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopShape.lean#L48-L54) · [Three conditions on the same family](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/CharacterBoxes/ZeroFreeAllOfTopG.lean#L19-L33) · [Arithmetic bound on the windows](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimitiveCosets/LevelGmLeOnFamilyScales.lean#L28-L30)

The preceding link between the two arguments has also undergone a conditional external Lean kernel check. In the reference repository’s pinned Lean 4.33.1 environment, `rh_of_family_and_unit_host` derives the Riemann hypothesis from the family input `TopG` and the modulus-one host input `HostExW (3/2) (GChi PChar.one).req`. For each $\kappa>0$ the two inputs produce arbitrarily late windows $[Y,Y^{3/2}]$ on which the same family gives $\mathrm{Gz}(x)\le x^{1/2+\kappa}$ at every real $x$. Here $\mathrm{Gz}(x)=U(x)$ is the book’s complete Mangoldt remainder, so the prime-only window criterion applies. This kernel replay takes the two inputs as hypotheses. The reference constructions that supply them lie outside its scope. The reproduction record includes the compatibility patch and successful kernel replay. `PinnedTop`, `WindowConsumer`, and `UnifiedWindowRH` check this conditional implication. `PinnedMesh` checks a separate fixed-character window criterion. [Conditional implication and reproducible source](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059461340)

The reference mean-square theorem `QH.pairEx` supplies a single prime pair for the entire inner window. Take modulus one, $0<\varepsilon<1/52$, and $A\ge1$. For every sufficiently large $Y$ there are primes $q,d$ satisfying `PairGood 1 ε Y (Y^A) q d`, with the size, congruence and splitting conditions of `WinPair` evaluated at the fixed scale $Y$. For the three twist indices $(i,j)=(1,0),(0,1),(1,1)$, each primitive character $\chi$ inducing the corresponding quadratic twist satisfies both $|g_\chi(y)|\le y^{1/2+\varepsilon/2}$ and $|D_\chi|\le4\log y$ for every $Y\le y\le Y^A$. For real primitive base characters of conductor dividing $8$, the definition also imposes zero-free rectangles on the primitive characters inducing those three twists. This choice of $q,d$ uses the mean-square theorem already checked in the reference environment. [Fixed prime pair and outer-window quantifiers](https://github.com/the-omega-institute/trureturing/issues/32627#issuecomment-7059642097)

Passing from the inner window to the modulus-one host also uses the cohomological input `VWinAt PChar.one`. Write $C$ for its cutoff exponent. For each such $\varepsilon$ and every rank schedule $e\colon\mathbb R\to\mathbb N$ satisfying $x^{2+8\varepsilon}\le2^{e(x)}\le2x^{2+8\varepsilon}$ for $x\ge1$, this input supplies $J\ge1$ and a threshold. For every $X$ beyond the threshold and every prime pair satisfying `WinPair ε (X^(1/J)) q d`, it gives a common subwindow $[W,W^2]\subseteq[X^{1/J},X]$. At each $x$ in that subwindow the estimate applies to every number field matching the character and $e(x),q,d$ under `IsChiField`. Fix such a field, any algebraic closure, and any family of local coefficient data indexed by the primes $\ell$, and put $t=\lfloor x^C\rfloor$. For each prime $\ell$ and $1\le j<t$, the cohomological length $\operatorname{shaLen}(\ell,j)$ is finite. Every finite set $S$ of primes satisfies

$$
\sum_{\ell\in S}\log\ell\sum_{1\le j<t}\operatorname{shaLen}(\ell,j)\le\sqrt{\exp(x^\varepsilon)}.
$$

At $C=401$, the common-window construction chooses $Y,q,d$ before quantifying over the real points of the outer interval $[Z,Z^{3/2}]$. The reference theorem `supplyChi` yields the modulus-one host used above. The same external Lean environment thus checks `TopG → VWinAt PChar.one 401 → RiemannHypothesis`. [Conditional cohomological-window implication](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059734329)

The modulus-one character $\chi$ generates a group of order one. The field construction gives $1\le c\le|\langle\chi\rangle|$, so the order $c2^e$ in the host construction equals $2^e$ and satisfies the rank estimate above directly. This lowers the cutoff exponent from $401$ to $400$ at modulus one, with the sum running over $1\le j<\lfloor x^{400}\rfloor$. Under the exponent-$400$ window hypothesis, `fixed_of_400` supplies for each such $\varepsilon$ a $J\ge1$ such that, beyond any prescribed starting point, one can find an outer window $[Z,Z^{3/2}]$ and a single $Y,q,d$ with $Y\le Z\le Z^{3/2}\le Y^J$. The pair satisfies `PairGood` throughout $[Y,Y^J]$, and each $x$ in the outer window admits its matching $e(x)$ and the stated length bound. The same external environment checks `TopG → VWinAt PChar.one 400 → RiemannHypothesis`, with the family input and this weaker modulus-one window as hypotheses. [Source and kernel replay for exponent 400](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7059864808)

For the modulus-one cohomological window, the same external Lean environment also checks reductions of the positive-eigenspace counts. The exceptional primes at modulus one are exactly $\{3,7\}$. The reference proof supplies case IV and obtains case Z from vanishing for the principal character. Case I reduces to an orbit estimate for the imaginary quadratic field $\mathbb Q(\sqrt{-7})$ of discriminant $-7$. The test primes can be fixed at $11,13$. Once both auxiliary primes $q,d$ selecting the window exceed $13$, the two tests apply to the same host. The orbit estimate still needs one real constant uniform over the compatible algebraic closures of the rationals, the allowed exponents and moduli, character orbits, coefficient data, and finite sets of primes. [The unit character’s exceptional set](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7060326962) · [Cases I, IV, Z and the conditional implication](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061140456)

The two high-conductor counts in case V use only the twist $e=1$. Let $c_2(\psi)$ be the exponent of $2$ in the conductor of the local component at $2$ of the host character $\psi$. After removing that component, the remaining character squares to the principal character. For $\ell=3,7$ the order $f_0$ in the comparison therefore equals the multiplicative order of $\ell$ modulo $4$, namely $2$. The threshold $R_1=16\ell^2\,4^{v_2(\ell^2-1)}$ equals $9216$ at $\ell=3$ and $200704$ at $\ell=7$. Comparing $R_1$ with $2^{c_2(\psi)}$ gives the following cutoffs.

| Exceptional prime $\ell$ | $v_2(\ell^2-1)$ | Case V | Corresponding case Vs |
| --- | --- | --- | --- |
| $3$ | $3$ | $c_2(\psi)\ge14$ | $c_2(\psi)\le13$ |
| $7$ | $4$ | $c_2(\psi)\ge18$ | $c_2(\psi)\le17$ |

The replayed equivalence `unit_countV_iff` says that case V at modulus one holds exactly when one common natural exponent $A$ gives the reference bound `VLe` with upper bound $(\ell N)^A$ for both high-conductor families, where $N$ is the host modulus. This quantifies over each unit-character host, every $t>1$ satisfying `h.Big t`, every allowed algebraic closure and coefficient system, and each eligible host character at twist one. The cutoffs select which characters to count in a given host. [The two high-conductor counts and their kernel replay](https://github.com/the-omega-institute/trureturing/issues/32551#issuecomment-7061244097)

With those two counts as hypotheses, `rh_of_one_orbit_estimate` also requires the arithmetic family `TopG`, the modulus-one geometric window `UnitB K 400`, the odd-prime estimate `Odd.PrimeBound`, the fixed-field orbit estimate above, and case II at modulus one. Case Vs uses Poitou–Tate duality, local finiteness, local Tate duality, and the degree estimate `LemmaK` for a real constant $C_K$. Under these hypotheses the externally replayed implication reaches RH through this chapter’s Mangoldt window criterion.

**How can one discriminant split at several primes?** For an odd prime $p$, write $J(-d,p)=\bigl(\frac{-d}{p}\bigr)$. A value of $1$ means that $t^2\equiv-d\pmod p$ has a nonzero solution. With $B=3$, the only small odd prime to test is $3$. The prime $d=23$ satisfies $d\equiv7\pmod{16}$ and $-23\equiv1\pmod3$. Take the prime $q=59\equiv3\pmod8$. Since $-23\equiv36=6^2\pmod{59}$, this pair passes both splitting tests. The construction below enforces all the finite conditions through particular residue classes. Those classes account for only some of the eligible primes.

::: {.theorem #thm-ch31-split-prime-host-series title="Weighted series for auxiliary primes with prescribed splitting" lean="D5/S3/CharacterSums/SplitPrimeHostSeries.split_prime_host_series"}
For a natural number $B$, let $D_B$ consist of the primes $d\equiv7\pmod{16}$ for which $J(-d,p)=1$ at every odd prime $p\le B$. For $d\in D_B$, let $Q_d$ consist of the primes $q\equiv3\pmod8$ for which $J(-d,q)=1$. Then

$$
\begin{aligned}
\lim_{X\to\infty}\sum_{\substack{d\in D_B\\d<X}}\frac{\ln d}{d}&=+\infty,\\
\lim_{X\to\infty}\sum_{\substack{q\in Q_d\\q<X}}\frac{\ln q}{q}&=+\infty\quad(d\in D_B).
\end{aligned}
$$

Here $X$ runs through the natural numbers. For every natural number $N$ there exists $d\in D_B$ with $d>N$. For every $d\in D_B$ and every natural number $Q$ there exists $q\in Q_d$ with $q>Q$. Conversely, prescribe a prime $q\equiv3\pmod8$ and put $S_{B,q}=\{d\in D_B:q\in Q_d\}$. Then $\sum_{d\in S_{B,q},\,d<X}(\ln d)/d\to+\infty$, and for every natural number $N$ there is a $d\in S_{B,q}$ with $d>N$.
:::

::: proof
Choose $d$ first. In the reference construction, put $P=\prod_{i=0}^{B-1}(2i+1)$, with empty product $1$. The product is odd, and every odd prime $p\le B$ occurs as a factor. The residue $8P-1\pmod{16P}$ is coprime to its modulus. Each prime $d$ in this class satisfies $d\equiv7\pmod{16}$ and $-d\equiv1\pmod p$ at every such $p$. With $d$ fixed, choose a prime $q$ in the reduced residue class $1+6d\pmod{8d}$. Then $q\equiv3\pmod8$ and $q\equiv1\pmod d$. Both $d$ and $q$ are $3$ modulo $4$, so the minus sign from quadratic reciprocity cancels $\bigl(\frac{-1}{q}\bigr)=-1$. Hence $J(-d,q)=\bigl(\frac{q}{d}\bigr)=1$. The proof in this library takes the product of the small odd primes themselves and combines the congruences by the Chinese remainder theorem. In each reduced residue class the sum of $\ln p/p$ over primes diverges. Its nonnegative terms contribute to the corresponding sums over $D_B$ and $Q_d$. The full proof is checked by the Lean kernel.
:::

One can also start with a prescribed prime $q\equiv3\pmod8$. Increase the cutoff for small primes to $\max(B,q)$. Then $q$ itself is one of the odd primes required to split, so every $d\in D_{\max(B,q)}$ belongs to $D_B$ and satisfies $J(-d,q)=1$. Removing any finite initial segment preserves divergence, so in either order the last prime can exceed any prescribed lower bound. The elementary construction in the reference chooses $d$ first and $q$ second and proves existence above given thresholds. The weighted series here quantify the supply of primes at each step. [The two prime choices in the reference](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AutomorphicArithmetic/PrimeDiscriminants/ExistsHost.lean#L39-L97)

The whole-window estimate also requires the two primes to fit the same prescribed scale. Under its analytic hypotheses, the quantitative result in the reference fixes $0<\varepsilon<1/52$ and supplies $x_0$ and a constant $C>0$. For every real $x\ge x_0$ it then chooses $q$ and then $d$ for that $q$, with the same pair satisfying $\sqrt{X_1}<q\le X_1$ and $\sqrt{X_2}<d\le X_2$, where $X_1,X_2$ depend on $x,\varepsilon$. Its `QDq` condition uses the same $C$ in the estimates at scale $x$ for three quadratic characters, those attached to $q$, to $d$, and their product. The `Boxq` condition imposes six zero-free region conditions on characters and their twists. For every integer $1\le n\le2x^{2+8\varepsilon}$ the same pair must also meet the splitting requirements and the bound on $\ln(4nqd)$ in `Rowq`. These conditions select a pair for each $x$. Put $t=\varepsilon/5$. Since $X_1=\exp(x^t)$, the size condition gives $x^t/2<\ln q\le x^t$. Reusing one $q$ at the endpoints $Y$ and $Y^b$ would give $Y^{bt}/2<\ln q\le Y^t$, hence $Y^{(b-1)t}<2$. For fixed $b>1$, satisfying the `Rowq` size bound at the two endpoints of a sufficiently distant window therefore requires different primes $q$ (`manual derivation`). Passing from the choice at each scale to the error bound on the whole window uses the character estimates and arithmetic construction in the reference. [Quantitative construction choosing $q$ before $d$](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBounds.lean) · [Hypotheses and quantifiers for the quantitative choice](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBoundsStatement.lean#L17) · [Character and size conditions](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L166-L185)

**When can one pair of auxiliary primes serve an entire window?** Fix a prime $q\equiv3\pmod8$, put $L=\ln q>1$, and fix a real $b>1$. For a window starting at $Y\ge e^5$, take a loss $\varepsilon>0$ that stays fixed on the window. Write $u=x^{\varepsilon/5}$ for each real $x\in[Y,Y^b]$. The external `Rowq` condition constrains $q,d$ at a given $x,n$. Here we require a single prime $d\equiv7\pmod{16}$ to satisfy the inequalities throughout the window.

$$
u/2<L\le u,\qquad u(\ln x)^2/2<\ln d\le u(\ln x)^2 .
$$

It also requires $(-d/q)=1$, the splitting condition $(-d/p)=1$ for each odd prime $p\le u$, and $-d\equiv1\pmod8$ at $2$. For each integer $1\le n\le2x^{2+8\varepsilon}$, the conductor bound is $\ln(4nqd)\le2u(\ln x)^2$. [Pointwise arithmetic conditions in the external source](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L179-L185)

::: {.theorem #thm-ch31-fixed-prime-row-width title="Window widths admitting one fixed pair of auxiliary primes" lean="D5/S3/CharacterSums/MovingPrimeRowWidth.prime_pair_power_window_iff"}
Fix $q,b$ as above. The following are equivalent.

1. For every real $R$ and every $\eta>0$ there exist $Y\ge\max(R,e^5)$, a loss $0<\varepsilon<\min(\eta,1/52)$, and a prime $d$ satisfying all the conditions above for every real $x\in[Y,Y^b]$.
2. The width satisfies $b^2L^{b-1}<2$.
:::

::: proof
First compare the endpoints. Put $u_0=Y^{\varepsilon/5}$, so $L\le u_0$ and the value of $u$ at the right endpoint is $u_0^b$. The strict lower bound there and the upper bound at the left endpoint give $b^2u_0^b(\ln Y)^2/2<\ln d\le u_0(\ln Y)^2$. Hence $b^2L^{b-1}<2$. At equality, the strict lower bound at the right already reaches the largest value allowed at the left.

Conversely, put $B=\lceil L^b\rceil$. With $q$ fixed first, there are arbitrarily large $d$ for which $q$ and every odd prime $p\le B$ split. [Prime supply with $q$ fixed first](lean:D5/S3/CharacterSums/SplitPrimeHostSeries.split_prime_host_series)

Set $a=\sqrt{\ln d/L}$, $Y=e^a$, and $\varepsilon=5\ln L/a$. As $d$ grows, $Y$ tends to infinity and $\varepsilon$ tends to zero. Write each point of the window as $x=e^{sa}$ with $1\le s\le b$. Then

$$
u=L^s,\qquad \frac{u(\ln x)^2}{\ln d}=s^2L^{s-1}\in[1,b^2L^{b-1}].
$$

This gives both size bounds for $d$. The inequalities $u\le L^b<2L$ and $L\le u$ give the bounds for $q$. Finally, put $t=\ln x\ge5$. For the specified $n$, use $L\le u$, $\ln 8<4$, and $2+8\varepsilon<3$ to obtain $\ln(4nq)\le4+3t+u\le ut^2$. The last inequality follows from $u\ge1$ and $t^2-1\ge4+3t$. Adding $\ln d\le ut^2$ gives the conductor bound. The full proof is checked by the Lean kernel.
:::

Take the prime $q=60083\equiv3\pmod8$ and $b=9/8$. Since $11<L<12$ and $12<(3/2)^8$, we have $b^2L^{b-1}<(81/64)(3/2)=243/128<2$. This yields windows on which $u\ge L>11$ at every point.

The external analytic proof that selects $q$ also requires $(\ln Y)^2\ln(8)/4\le Y^{\varepsilon/5}$ at the starting point. Our construction has $Y^{\varepsilon/5}=L$, while the left side tends to infinity with $Y$. If the selector’s threshold holds, the ratio of the endpoint values of $u$ is $(Y^{\varepsilon/5})^{b-1}\ge((\ln Y)^2\ln(8)/4)^{b-1}$. For every natural $k$, this lower bound eventually exceeds $2^k$. Choose $k+1$ points along the window where $u$ doubles successively. Their half-open intervals $(u/2,u]$ are disjoint, so covering the window requires at least $k+1$ distinct values of $q$, even when $\varepsilon$ varies between windows. Given its analytic inputs, the external source fixes $0<\varepsilon<1/52$ and obtains a threshold $x_0$ and a constant $C$. It selects a pair $q,d$ for each $x\ge x_0$, then uses that pair for every admissible $n$. [Scale condition in the external selector](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean#L83-L92) · [The external theorem selecting a pair at each point](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimePairBoxBoundsStatement.lean#L17) · [Uses of the condition](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Development/AbelianVarietyTheory/Proofs/IwasawaDecomposition/ExistsPrimeThreeModEightGood.lean#L131-L156)

Here $\varepsilon$ changes with the window. Bounding $U$ pointwise on these windows would also require the external `QDq` and `Boxq` character estimates for the same pair $q,d$, and control of how the comparison threshold depends on $\varepsilon$. [Character estimates and pointwise arithmetic conditions in the external source](https://github.com/the-omega-institute/riemann-hypothesis/blob/ddf1d5f8a3acc1a641acba5ad7009c1fae6c1dd9/src/Formalism/SharpRestriction/InertJacobiLevels/AsmIface.lean#L166-L192)

For any fixed real $b>1$, write

$$
A_{\vartheta,b}(Y)=\int_Y^{Y^b}\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx,\qquad Y\ge2.
$$

The quantity $A_\vartheta$ above is $A_{\vartheta,3/2}$.

::: {.theorem #thm-ch31-prime-window-mean title="The logarithmic main term of the window mass under RH" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPrimeWindowMean.prime_tail_logarithmic_mass_of_rh"}
Assume the Riemann hypothesis. There is a constant $C\ge0$ such that every pair of real cutoffs $B\ge A\ge2$ satisfies

$$
\left|\int_A^B\frac{\max\{-Q_\vartheta(x),0\}}{\sqrt{x}}\,dx-2\ln(B/A)\right|\le C.
$$
:::

::: proof
In the prime-power layers, higher powers bound the difference between $\psi(x)-\vartheta(x)$ and $\psi(\sqrt{x})$. Apply Schoenfeld's bound at $\sqrt{x}$ and integrate to obtain $\sqrt{x}(Q(x)-Q_\vartheta(x))=2+O(x^{-1/12})$. This error is absolutely integrable on the tail after setting $y=\ln x$. The normalized complete remainder consists of the zero series and an exponentially decaying term. Under RH the series has absolutely summable coefficients, modulus less than $2$, and frequencies of absolute value greater than $10$. Integrating each mode divides its coefficient by the frequency, giving a common bound for integrals of the zero series over every interval. Adding $2$ to the real part of this series gives a nonnegative approximation to $\max\{-\sqrt{x}Q_\vartheta(x),0\}$. Taking positive parts preserves the bound on the integrable error. Continuity bounds the error over the finite initial interval. Integrating the constant $2$ gives the logarithmic main term, and the other contributions are bounded uniformly in both endpoints. The full proof is checked by the Lean kernel.
:::

In particular, $A_{\vartheta,b}(Y)=2(b-1)\ln Y+O(1)$ with the same error bound even when $b>1$ varies. Zhao's equation (14) expresses this $Q_\vartheta$ in terms of the cumulative first Mertens error and an endpoint correction. The main term here results from a further weighted window integral and uses RH. [Zhao, equation (14)](https://arxiv.org/html/2411.18903v2#S2.E14)

::: {.theorem #thm-ch31-rh-prime-window-remainder title="The endpoint remainder and cluster set on the critical line" lean="D5/S3/Weil/Mertens/IntegratedExplicit/RHPrimeWindowRemainder.prime_window_remainder_of_rh"}
Under RH, write $E(a,B)=N(a,B)-2\ln(B/a)$ for the prime-tail negative mass with its main term removed. Here $N(a,B)=\int_a^B\max(-Q_\vartheta(x),0)x^{-1/2}\,dx$. Enumerate the nontrivial zeros with multiplicity as $\rho_k=1/2+i\gamma_k$ and put $c_k=1/[\rho_k(1-\rho_k)]$. Let $\phi(u)_k=e^{i\gamma_k u}$ and let $H$ be the closure of this real-parameter orbit in the product of circles. Define the continuous function

$$
P(h)=\operatorname{Re}\sum_k\frac{c_k h_k}{i\gamma_k}.
$$

Let $e(u)=\max(-e^{u/2}Q_\vartheta(e^u),0)-2-\operatorname{Re}\sum_k c_k\phi(u)_k$. For every real pair $B\ge a\ge2$, the exact identity is

$$
E(a,B)-P\bigl(\phi(\ln B)\bigr)+P\bigl(\phi(\ln a)\bigr)=\int_{\ln a}^{\ln B}e(u)\,du.
$$

For every $\varepsilon>0$ there is an $X\ge2$ such that every real pair $B\ge a\ge X$ satisfies

$$
\left|E(a,B)-P\bigl(\phi(\ln B)\bigr)+P\bigl(\phi(\ln a)\bigr)\right|<\varepsilon .
$$

For every fixed $a\ge2$, the full cluster set of $E(a,B)$ as $B\to\infty$ is the nondegenerate compact interval

$$
C(a)+P(H),\qquad
C(a)=\int_{\ln a}^\infty e(u)\,du-P\bigl(\phi(\ln a)\bigr).
$$
:::

::: proof
The zero ordinates are bounded away from zero, so the coefficients remain absolutely summable after termwise integration. In logarithmic coordinates the two endpoints give the difference of values of the same function $P$. The residual is absolutely integrable, so its absolute integral on any $[\ln a,\ln B]$ is bounded by the entire tail from $\ln a$. At fixed $a$ the residual integral converges to a constant. The actual orbit approaches each point of the closure at arbitrarily late times and hence realizes every cluster value in the interval. The closure is compact and connected, and the primitive along the orbit has strictly positive derivative at time zero, so the interval has distinct endpoints. The result uses the actual joint phase relations. The full proof is checked by the Lean kernel.
:::
