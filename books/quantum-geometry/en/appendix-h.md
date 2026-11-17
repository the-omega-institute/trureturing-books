# Appendix H Finite-Horizon Observers, Prediction Depth, Solenoid Memory, and History Ledgers {#sec-appendix-h}

Across [Chapter 36](ch36-hyperbolic-steps-and-quotienting-reincarnation.md) (especially generator quotienting, logarithmic-charge conservation [@thm-solenoid-log-charge], and unit-modulus characterization [@thm-solenoid-zero-charge] in [Section 36.3](ch36-s03-quotienting-generators.md), together with the golden projective-defect multiplier [@thm-golden-projective-multiplier] in [Section 36.4](ch36-s04-padic-table-expansion.md)), [Section 38.5](ch38-s05-escape-ledger-and-entropy.md) (the observer escape ledger [@thm-ch38-escape-pairs-and-structural-novelty], the readout–permutation update commutator [@thm-observer-read-update-commutator], and modular recovery uniqueness for bounded integer power traces [@thm-bounded-power-trace-crt]), and the [Coda](coda.md), three seemingly distinct threads—geometry, arithmetic, and information—repeatedly converge on the same structural tension: **When an observer inspects the world only through a coarse readout window, how much internal structure is locked down by finite-horizon future observations, what deeper fiber phases remain invisible beneath identical visible projections, and how does adjoining a history ledger strictly contract the indistinguishable kernel?**

This appendix distills that tension into a single transparent algebraic question: *Given a carrier state type $X$, a deterministic update map $F : X \to X$, and a coarse readout $q : X \to B$, how does the head of the complete future itinerary recover the current readout unconditionally, how does the finite-horizon equivalence kernel stabilize at a precisely defined completion depth on finite state spaces, how does every memory map $r : X \to M$ supporting readout and update factorization map uniquely from its actual range to the minimal predictive completion quotient, how do equal-projection lifts on `UniversalSolenoid` form an additive hidden-fiber transition cocycle, and how does intersecting a public readout kernel with an additive history-ledger kernel govern hidden-state recovery?*

Following the strict three-tier epistemic contract of [Appendix E](appendix-e.md) (verification boundaries in [Appendix C](appendix-c.md)), all five flagship theorems below correspond directly to kernel-checked Lean 4 theorems at the pinned commit and carry `LEAN ✓` in the master audit table. Companion finite-state hand calculations and the five-step unified instantiation on `UniversalSolenoid` in Section H.6 are explicitly labeled as **manual derivations**; conceptual bridges across modules are never misrepresented as automatic implications without explicit maps, nor are algebraic kernel inclusions inflated into thermodynamic arrows of time or algorithmic complexity bounds.

---

## H.1 Head of the Complete Future Itinerary and Current-Readout Recovery {#sec-appendix-h-1}

Begin at the most elementary step: at step $n = 0$ the system occupies an underlying state $x \in X$; iterating the deterministic update $F : X \to X$ carries $x$ through $(F^{[n]})(x)$, while the observer records only the coarse output $q\bigl((F^{[n]})(x)\bigr) \in B$. Before comparing finite prediction horizons, we verify that passing to the complete future itinerary never loses the immediate present readout.

A two-state flip calculation makes both the identity and its exact boundary concrete (manual derivation). Take the binary carrier $X = \{0, 1\}$ with bit-flip update $F(0) = 1,\, F(1) = 0$ and identity readout $q = \mathrm{id}_X : \{0, 1\} \to \{0, 1\}$. The infinite readout sequences from the two initial states are

$$
x = 0 \;\longmapsto\; (0, 1, 0, 1, \dots), \qquad x = 1 \;\longmapsto\; (1, 0, 1, 0, \dots).
$$

Evaluating the $0$-th entry (the head of the sequence) immediately recovers $q(0) = 0$ and $q(1) = 1$. Suppose instead we replace $q$ by the constant readout $q_0(0) = q_0(1) = 0$. Both trajectories collapse to $(0, 0, 0, \dots)$: taking the $0$-th entry still recovers the current readout $q_0(x) = 0$ identically, yet **never** recovers the underlying state $x$. Recovering the current readout from the complete itinerary is thus an exact functional factorization of $q$, not an injective reconstruction of $X$.

In the frozen formalization, for arbitrary types $Y$ and $O$, update map $\tau : Y \to Y$, and readout $q : Y \to O$, the **complete future itinerary** `completeItinerary` is defined by

$$
\operatorname{completeItinerary}(\tau, q)(y) \;:=\; \bigl(n \mapsto q\bigl((\tau^{[n]})(y)\bigr)\bigr) \quad (\mathbb{N} \to O),
$$

while the **itinerary head** operator `itineraryHead` on infinite sequences $\mathbb{N} \to B$ evaluates at $n = 0$:

$$
\operatorname{itineraryHead}(u) \;:=\; u(0) \qquad (u : \mathbb{N} \to B).
$$

Theorem [`recover_current_readout`](lean:D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.recover_current_readout) establishes their exact composition identity without any finiteness or topological assumptions:

::: {.theorem #thm-apph-current-readout title="Current Readout from the Complete Itinerary" lean="D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.recover_current_readout"}
Let $X$ and $B$ be arbitrary types, let $F : X \to X$ be an update map, and let $q : X \to B$ be a readout map. Then the functional composition identity holds:

$$
q \;=\; \operatorname{itineraryHead} \circ \operatorname{completeItinerary}(F, q).
$$
:::

::: proof
By function extensionality (`funext`), evaluate the right-hand side at an arbitrary state $x \in X$. Unfolding `Function.comp`, `itineraryHead`, and `completeItinerary` in sequence gives

$$
\bigl(\operatorname{itineraryHead} \circ \operatorname{completeItinerary}(F, q)\bigr)(x) \;=\; \operatorname{completeItinerary}(F, q)(x)(0) \;=\; q\bigl((F^{[0]})(x)\bigr).
$$

Since the zero-fold iterate $F^{[0]}$ is definitionally the identity map $\mathrm{id}_X$ on $X$, this reduces directly to $q(x)$. The full proof is checked by the Lean kernel.
:::

Epistemic boundary: [@thm-apph-current-readout] holds for completely arbitrary types $X$ and $B$ and involves neither observational noise nor statistical consistency. It proves that $q$ factors through `completeItinerary F q` via `itineraryHead`—so the complete-itinerary kernel refines the instantaneous readout kernel, $\operatorname{Setoid.ker}(\operatorname{completeItinerary}(F, q)) \le \operatorname{Setoid.ker}(q)$—and must never be inverted into the false claim that the instantaneous readout $q(x)$ alone recovers either the future itinerary or the internal state $x$.

---

## H.2 Finite-State Prediction Horizons and Stabilization at Completion Depth {#sec-appendix-h-2}

Because a single snapshot at $n = 0$ generally merges states whose futures eventually diverge, an observer naturally looks $m$ steps ahead. When the state space is finite, must the observer inspect infinitely many future steps to separate every pair of predictively distinguishable states, or does the finite-horizon partition freeze at a finite depth?

A three-state delay chain reveals the exact mechanism by hand (manual derivation). Take $Y = \{0, 1, 2\}$ with deterministic update $\tau : Y \to Y$ and binary readout $q : Y \to \{0, 1\}$ defined by

$$
\tau(0) = 1, \quad \tau(1) = 2, \quad \tau(2) = 2; \qquad q(0) = 0, \quad q(1) = 0, \quad q(2) = 1.
$$

Writing out the complete future readout trajectories of the three states gives

$$
\begin{aligned}
\operatorname{completeItinerary}(\tau, q)(0) &= (0, 0, 1, 1, 1, \dots), \\
\operatorname{completeItinerary}(\tau, q)(1) &= (0, 1, 1, 1, 1, \dots), \\
\operatorname{completeItinerary}(\tau, q)(2) &= (1, 1, 1, 1, 1, \dots).
\end{aligned}
$$

Compare the equivalence partitions induced at horizons $m = 0$ and $m = 1$:

1. **Zero-step horizon ($m = 0$, inspecting $k = 0$ only, i.e., $1$ sample)**: The readout words are $(0)$, $(0)$, and $(1)$. State $2$ is already separated from $\{0, 1\}$, whereas states $0$ and $1$ both output $0$ and remain glued together in the ambiguous fiber $\{0, 1\}$;
2. **One-step horizon ($m = 1$, inspecting $k \in \{0, 1\}$, i.e., $m + 1 = 2$ samples)**: The readout prefixes become $(0, 0)$, $(0, 1)$, and $(1, 1)$. States $0$ and $1$ split apart at $k = 1$ ($\tau(0) = 1$ still reads $0$, while $\tau(1) = 2$ reads $1$), refining the partition into the three singletons $\{\{0\}, \{1\}, \{2\}\}$—already identical to the infinite-itinerary kernel! Extending the horizon to any $m \ge 1$ produces no further refinement.

To state the general theorem faithfully, we unpack four frozen definitions from the Lean source:

- **Finite-horizon readout word `futureReadoutWord`**: For arbitrary types $Y, O$, maps $\tau : Y \to Y$ and $q : Y \to O$, and horizon index $m \in \mathbb{N}$,

  $$
  \operatorname{futureReadoutWord}(\tau, q, m)(y) \;:=\; \bigl(k \mapsto q\bigl((\tau^{[k.1]})(y)\bigr)\bigr) \quad \bigl(\operatorname{Fin}(m + 1) \to O\bigr).
  $$

  Note carefully that the index domain is $\operatorname{Fin}(m + 1)$ (integers $0 \le k \le m$), so horizon parameter $m$ collects **$m + 1$ readout samples** ($m = 0$ corresponds to the single current readout);
- **Finite-horizon equivalence kernel `finiteHorizonKernel`**: Defined as the equivalence relation (`Setoid Y`) induced by `futureReadoutWord`:

  $$
  \operatorname{finiteHorizonKernel}(\tau, q, m) \;:=\; \operatorname{Setoid.ker}\bigl(\operatorname{futureReadoutWord}(\tau, q, m)\bigr);
  $$

- **Pairwise distinguishing time `distinguishingTime`**: Classical choice is used on each pair $(y, y') \in Y \times Y$: if $h : \exists n \in \mathbb{N},\; \operatorname{completeItinerary}(\tau, q)(y)(n) \neq \operatorname{completeItinerary}(\tau, q)(y')(n)$ holds, `distinguishingTime` returns the witness $\operatorname{Classical.choose}(h) \in \mathbb{N}$; otherwise (when the two complete itineraries agree everywhere) it returns $0$. Note that the source definition invokes `Classical.choose` rather than least-witness search `Nat.find`;
- **Completion depth `completionDepth`**: Assuming a finite-type instance `[Fintype Y]`, `completionDepth` takes the natural-number supremum over the finite universal set $\operatorname{Finset.univ} \subseteq Y \times Y$ of all ordered state pairs:

  $$
  \operatorname{completionDepth}(\tau, q) \;:=\; \sup_{(y, y') \in \operatorname{Finset.univ}} \operatorname{distinguishingTime}(\tau, q, y, y').
  $$

Theorem [`finite_horizon_stabilizes_at_completionDepth`](lean:D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.finite_horizon_stabilizes_at_completionDepth) proves that on any finite state space, the finite-horizon kernel at `completionDepth` equals the full infinite-itinerary kernel:

::: {.theorem #thm-apph-finite-horizon-stability title="Finite-State Prediction-Horizon Stabilization" lean="D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.finite_horizon_stabilizes_at_completionDepth"}
Let $Y$ (in universe $u$) and $O$ (in universe $v$) be types equipped with a finite-type instance `[Fintype Y]`. Let $\tau : Y \to Y$ be an update map and let $q : Y \to O$ be a readout map. Then, as equivalence relations (`Setoid Y`) on $Y$,

$$
\operatorname{finiteHorizonKernel}\bigl(\tau, q, \operatorname{completionDepth}(\tau, q)\bigr) \;=\; \operatorname{Setoid.ker}\bigl(\operatorname{completeItinerary}(\tau, q)\bigr).
$$
:::

::: proof
By `Setoid` extensionality, it suffices to show that any two states $y, y' \in Y$ are related on the left if and only if they are related on the right. If $(y, y')$ lies in the complete-itinerary kernel on the right, then $q((\tau^{[n]})(y)) = q((\tau^{[n]})(y'))$ holds for every $n \in \mathbb{N}$, and in particular for every $k \in \operatorname{Fin}(\operatorname{completionDepth}(\tau, q) + 1)$, so `futureReadoutWord` agrees on $y$ and $y'$. Conversely, suppose $y$ and $y'$ have equal `futureReadoutWord` at horizon $D := \operatorname{completionDepth}(\tau, q)$, and assume toward a contradiction that $h : \exists n \in \mathbb{N},\; \operatorname{completeItinerary}(\tau, q)(y)(n) \neq \operatorname{completeItinerary}(\tau, q)(y')(n)$ holds. Unfolding the positive `dite` branch of `distinguishingTime` and applying `Classical.choose_spec`, the chosen witness $t_* := \operatorname{distinguishingTime}(\tau, q, y, y')$ satisfies $\operatorname{completeItinerary}(\tau, q)(y)(t_*) \neq \operatorname{completeItinerary}(\tau, q)(y')(t_*)$. Because `[Fintype Y]` places $(y, y')$ in $\operatorname{Finset.univ}$, `Finset.le_sup` yields $t_* \le D$, hence $t_* < D + 1$. Packaging $t_*$ as $\langle t_*,\, t_* < D + 1\rangle \in \operatorname{Fin}(D + 1)$ contradicts agreement of `futureReadoutWord` at horizon $D$. Therefore the complete itineraries agree at all times. The full proof is checked by the Lean kernel.
:::

Finiteness caveat: `[Fintype Y]` is strictly indispensable. On the countably infinite countdown chain $Y = \mathbb{N}$ with $\tau(0) = 0$, $\tau(n + 1) = n$, and zero-detector readout $q(0) = 1$, $q(n + 1) = 0$ (manual derivation), state $n$ first outputs $1$ at step $n$; for any fixed finite horizon $m \in \mathbb{N}$, states $m + 1$ and $m + 2$ share the all-zero word $(0, 0, \dots, 0)$ across $0 \le k \le m$, so no finite horizon ever stabilizes to the infinite-itinerary kernel. Likewise, `completionDepth` is defined nonconstructively via `Classical.choose` and carries neither probabilistic/entropic hypotheses nor any physical clock-time bound.

---

## H.3 Universal Factorization into the Predictive Completion Quotient {#sec-appendix-h-3}

Returning to an arbitrary (not necessarily finite) state carrier $X$: whenever two states $x, x' \in X$ generate identical infinite readout sequences $\operatorname{completeItinerary}(F, q)(x) = \operatorname{completeItinerary}(F, q)(x')$, distinguishing between $x$ and $x'$ adds zero predictive power for future readouts. Quotienting $X$ by complete-itinerary equivalence yields the **predictive completion quotient** `CompletedState` together with its canonical projection `completionProjection`:

$$
\operatorname{CompletedState}(F, q) \;:=\; \operatorname{Quotient}\bigl(\operatorname{Setoid.ker}(\operatorname{completeItinerary}(F, q))\bigr),
$$

$$
\operatorname{completionProjection}(F, q) : X \to \operatorname{CompletedState}(F, q), \qquad x \longmapsto [x].
$$

What makes an internal memory map $r : X \to M$ predictively valid? Exactly two algebraic closure conditions: (1) **readout factorization** (`readout_factors`), requiring a map $\mathrm{factor} : M \to B$ with $q = \mathrm{factor} \circ r$; and (2) **update factorization** (`update_factors`), requiring an autonomous memory transition $\mathrm{induced} : M \to M$ with $r \circ F = \mathrm{induced} \circ r$.

To see why the resulting universal map is defined specifically on the actual range $\operatorname{Set.range}(r)$ and why it need **not** be injective when memory is redundant, compare three candidate memories on a four-state carrier (manual derivation). Set $X' = \{0_L, 0_R, 1, 2\}$ with $F'(0_L) = F'(0_R) = 1$, $F'(1) = 2$, $F'(2) = 2$, and $q'(0_L) = q'(0_R) = q'(1) = 0$, $q'(2) = 1$. Since $0_L$ and $0_R$ share the complete itinerary $(0, 0, 1, 1, \dots)$, $\operatorname{CompletedState}(F', q')$ consists of exactly three equivalence classes $[0_L] = [0_R]$, $[1]$, and $[2]$:

1. **Faithful minimal memory**: Take $M_1 = \{s_0, s_1, s_2\}$ with $r_1(0_L) = r_1(0_R) = s_0$, $r_1(1) = s_1$, $r_1(2) = s_2$. Both factorizations hold, and the unique map $\theta_1 : \operatorname{Set.range}(r_1) \to \operatorname{CompletedState}(F', q')$ is a bijection;
2. **Redundant memory with an unreachable codomain label**: Take the five-element codomain $M_2 = \{a_0, b_0, c_1, d_2, u_{\mathrm{idle}}\}$ with $r_2(0_L) = a_0$, $r_2(0_R) = b_0$, $r_2(1) = c_1$, $r_2(2) = d_2$, induced update $a_0, b_0 \mapsto c_1 \mapsto d_2 \mapsto d_2$ and $u_{\mathrm{idle}} \mapsto u_{\mathrm{idle}}$, and readout factor $a_0, b_0, c_1 \mapsto 0$ and $d_2, u_{\mathrm{idle}} \mapsto 1$. Both `readout_factors` and `update_factors` hold! Observe two critical subtleties: (i) because $u_{\mathrm{idle}} \notin \operatorname{Set.range}(r_2)$ is never hit by $r_2$, $r_2$ places no constraint on $u_{\mathrm{idle}}$, which is why uniqueness holds on $\operatorname{Set.range}(r_2) = \{a_0, b_0, c_1, d_2\}$ rather than all of $M_2$; (ii) on $\operatorname{Set.range}(r_2)$, $\theta_2(a_0) = \theta_2(b_0) = [0_L]$ is **not injective**, because $r_2$ retains the predictively irrelevant split $a_0 \neq b_0$ that $\theta_2$ collapses onto the minimal quotient;
3. **Invalid over-coarsened memory**: Take $M_3 = \{m_{01}, m_2\}$ with $r_3(0_L) = r_3(0_R) = r_3(1) = m_{01}$ and $r_3(2) = m_2$. Instantaneous readout still factors ($m_{01} \mapsto 0,\, m_2 \mapsto 1$), but $r_3(F'(0_L)) = r_3(1) = m_{01} \neq m_2 = r_3(2) = r_3(F'(1))$ violates `update_factors`, blocking factorization into $\operatorname{CompletedState}(F', q')$.

Writing $\operatorname{Set.range}(r) := \{m \in M \mid \exists x \in X,\; r(x) = m\}$ and $\operatorname{Set.rangeFactorization}(r) : X \to \operatorname{Set.range}(r)$ for the canonical surjection $x \mapsto \langle r(x),\, \langle x, \mathrm{rfl}\rangle\rangle$, theorem [`predictive_memory_minimal_quotient`](lean:D5/S3/ObserverMemory/RefinementClosure/PredictiveMemoryMinimalQuotient.predictive_memory_minimal_quotient) establishes the universal property of `CompletedState`:

::: {.theorem #thm-apph-predictive-minimal-quotient title="Minimal Memory Factor of the Predictive Completion Quotient" lean="D5/S3/ObserverMemory/RefinementClosure/PredictiveMemoryMinimalQuotient.predictive_memory_minimal_quotient"}
Let $X, B, M$ be arbitrary types, let $F : X \to X$ be an update map, let $q : X \to B$ be a readout map, and let $r : X \to M$ be a memory map satisfying:

1. **Readout factorization** (`readout_factors`): there exists $\mathrm{factor} : M \to B$ such that $q = \mathrm{factor} \circ r$;
2. **Update factorization** (`update_factors`): there exists $\mathrm{induced} : M \to M$ such that $r \circ F = \mathrm{induced} \circ r$.

Then there exists a **unique** map $\theta : \operatorname{Set.range}(r) \to \operatorname{CompletedState}(F, q)$ such that

$$
\operatorname{completionProjection}(F, q) \;=\; \theta \circ \operatorname{Set.rangeFactorization}(r).
$$
:::

::: proof
Choose witnesses $\mathrm{factor} : M \to B$ and $\mathrm{induced} : M \to M$ from the two hypotheses. Induction on $n \in \mathbb{N}$ proves $r\bigl((F^{[n]})(x)\bigr) = (\mathrm{induced}^{[n]})(r(x))$ for every $x \in X$ (trivial at $n = 0$, and applying $r \circ F = \mathrm{induced} \circ r$ at the inductive step). Post-composing with $\mathrm{factor}$ and using $q = \mathrm{factor} \circ r$ yields, for every $n \in \mathbb{N}$,

$$
q\bigl((F^{[n]})(x)\bigr) \;=\; \mathrm{factor}\bigl((\mathrm{induced}^{[n]})(r(x))\bigr).
$$

Consequently, $r(x) = r(x')$ implies $\operatorname{completeItinerary}(F, q)(x) = \operatorname{completeItinerary}(F, q)(x')$, so $\operatorname{Setoid.ker}(r) \le \operatorname{Setoid.ker}(\operatorname{completeItinerary}(F, q))$. Because $\operatorname{Set.rangeFactorization}(r) : X \to \operatorname{Set.range}(r)$ is surjective with kernel $\operatorname{Setoid.ker}(r)$, $\operatorname{completionProjection}(F, q)$ is constant along every fiber of $\operatorname{Set.rangeFactorization}(r)$ and descends to a map $\theta : \operatorname{Set.range}(r) \to \operatorname{CompletedState}(F, q)$ satisfying the required equation. Surjectivity of $\operatorname{Set.rangeFactorization}(r)$ guarantees uniqueness: any $\theta'$ with the same composite agrees with $\theta$ on every $\operatorname{Set.rangeFactorization}(r)(x)$, hence everywhere on $\operatorname{Set.range}(r)$. The full proof is checked by the Lean kernel.
:::

Epistemic boundary: [@thm-apph-predictive-minimal-quotient] requires no finiteness on $X, B, M$ and expresses a quotient universal property rather than a state-minimization complexity bound. Above all, uniqueness of $\theta$ on $\operatorname{Set.range}(r)$ neither makes $\theta$ injective nor certifies that $r$ is already minimal; redundant memories are expressly permitted and collapse uniquely onto `CompletedState F q`.

---

## H.4 Hidden-Fiber Transition Cocycle for Equal-Projection Lifts on the Universal Solenoid {#sec-appendix-h-4}

Whereas Theorems [@thm-apph-current-readout]–[@thm-apph-predictive-minimal-quotient] characterize how predictively indistinguishable states collapse onto a minimal visible quotient, we now step **inside the fiber** of a projection to ask: what algebraic structure relates distinct underlying lifts that project to the exact same visible phase?

In [Section 36.3](ch36-s03-quotienting-generators.md), nonvanishing complex-power threads of zero logarithmic charge ([@thm-solenoid-log-charge], [@thm-solenoid-zero-charge]) have unit modulus at every level. Their pure-phase additive counterpart in the frozen dynamics library is the **universal solenoid** `UniversalSolenoid`: indexed by positive natural numbers $\mathbb{N}_+$ (`ℕ+`, where each $m = \langle m.1,\, 0 < m.1\rangle$ is strictly positive so division by zero never arises) and valued in the unit-period additive circle $\operatorname{AddCircle}(1) := \mathbb{R}/\mathbb{Z}$, it is the subtype of divisibility-compatible phase threads

$$
\operatorname{UniversalSolenoid} \;:=\; \bigl\{\theta : \mathbb{N}_+ \to \operatorname{AddCircle}(1) \;\colon\; \forall m, n \in \mathbb{N}_+,\; n.1 \cdot \theta_{\langle m.1 \cdot n.1,\; \dots\rangle} = \theta_m\bigr\},
$$

inheriting coordinatewise addition, negation, and zero from $\mathbb{N}_+ \to \operatorname{AddCircle}(1)$, where $n.1 \cdot (\cdot)$ denotes natural-number scalar multiplication (`nsmul`). Two canonical operations accompany this group:

- **Visible base-circle projection `UniversalSolenoid.projection`**: The additive group homomorphism $\operatorname{UniversalSolenoid} \to_+ \operatorname{AddCircle}(1)$ extracting the level-$1$ coordinate $\theta \mapsto \theta_{\langle 1,\, 0 < 1\rangle}$;
- **Real-line flow `UniversalSolenoid.realFlow`**: For any $t \in \mathbb{R}$, $\operatorname{realFlow}(t) \in \operatorname{UniversalSolenoid}$ assigns to each $m \in \mathbb{N}_+$ the residue class of $(t / m.1 : \mathbb{R})$ in $\operatorname{AddCircle}(1)$. Because $m.1 \ge 1 > 0$, the real quotient $t / m.1$ avoids the $x / 0 = 0$ total-function fallback, and $n \cdot \frac{t}{mn} = \frac{t}{m}$ verifies thread compatibility across all levels.

Inspecting two integer-time flow elements by hand immediately exposes the hidden fiber (manual derivation). Set $k := \operatorname{realFlow}(1)$ and $l := \operatorname{realFlow}(2)$, and read off their coordinates in $\operatorname{AddCircle}(1) = \mathbb{R}/\mathbb{Z}$:

$$
\begin{aligned}
k = \operatorname{realFlow}(1) &: \quad k_1 = \Bigl[\frac{1}{1}\Bigr] = 0, \quad k_2 = \Bigl[\frac{1}{2}\Bigr] = \frac{1}{2} \neq 0, \quad k_3 = \Bigl[\frac{1}{3}\Bigr], \quad k_6 = \Bigl[\frac{1}{6}\Bigr]; \\
l = \operatorname{realFlow}(2) &: \quad l_1 = \Bigl[\frac{2}{1}\Bigr] = 0, \quad l_2 = \Bigl[\frac{2}{2}\Bigr] = 0, \quad l_3 = \Bigl[\frac{2}{3}\Bigr] \neq 0.
\end{aligned}
$$

At the visible level $m = 1$, $\operatorname{projection}(k) = k_1 = 0$: after one full revolution around the base circle, an observer watching only level $1$ sees zero net displacement. Yet on the double-cover coordinate $m = 2$, $k_2 = \frac{1}{2}$ sits half a turn away from the identity! Choosing three constant lifts $s_\alpha(u) = 0$, $s_\beta(u) = k$, and $s_\gamma(u) = k + l = \operatorname{realFlow}(3)$ over any parameter set $U$, all three have visible projection $0$, while their unique pairwise differences in $\ker(\operatorname{projection})$ are $k_{\alpha\beta} = k$, $k_{\beta\gamma} = l$, and $k_{\alpha\gamma} = k + l$, closing as $k_{\alpha\gamma} = k_{\alpha\beta} + k_{\beta\gamma}$.

Theorem [`three_lift_difference_cocycle`](lean:D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle) establishes unique hidden-fiber differences and the additive transition cocycle law for any three equal-projection lift families over an arbitrary type $U$:

::: {.theorem #thm-apph-hidden-fiber-cocycle title="Hidden-Fiber Cocycle for Equal-Projection Lifts" lean="D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle"}
Let $U$ be an arbitrary type, and let $s_\alpha, s_\beta, s_\gamma : U \to \operatorname{UniversalSolenoid}$ be three families of solenoid elements satisfying equal visible circle projections:

$$
\operatorname{UniversalSolenoid.projection} \circ s_\alpha \;=\; \operatorname{UniversalSolenoid.projection} \circ s_\beta,
$$

$$
\operatorname{UniversalSolenoid.projection} \circ s_\beta \;=\; \operatorname{UniversalSolenoid.projection} \circ s_\gamma.
$$

Then there exist three difference maps $k_{\alpha\beta}, k_{\beta\gamma}, k_{\alpha\gamma} : U \to \operatorname{UniversalSolenoid}$ simultaneously satisfying all four clauses below:

1. **Unique $(\alpha, \beta)$ kernel-fiber difference**: For all $u \in U$, $\operatorname{UniversalSolenoid.projection}(k_{\alpha\beta}(u)) = 0$ and $s_\beta(u) = s_\alpha(u) + k_{\alpha\beta}(u)$; moreover, every map $k : U \to \operatorname{UniversalSolenoid}$ satisfying both pointwise conditions equals $k_{\alpha\beta}$;
2. **Unique $(\beta, \gamma)$ kernel-fiber difference**: For all $u \in U$, $\operatorname{UniversalSolenoid.projection}(k_{\beta\gamma}(u)) = 0$ and $s_\gamma(u) = s_\beta(u) + k_{\beta\gamma}(u)$; moreover, every map $k : U \to \operatorname{UniversalSolenoid}$ satisfying both pointwise conditions equals $k_{\beta\gamma}$;
3. **Unique $(\alpha, \gamma)$ kernel-fiber difference**: For all $u \in U$, $\operatorname{UniversalSolenoid.projection}(k_{\alpha\gamma}(u)) = 0$ and $s_\gamma(u) = s_\alpha(u) + k_{\alpha\gamma}(u)$; moreover, every map $k : U \to \operatorname{UniversalSolenoid}$ satisfying both pointwise conditions equals $k_{\alpha\gamma}$;
4. **Pointwise additive transition cocycle**: For all $u \in U$,

   $$
   k_{\alpha\gamma}(u) \;=\; k_{\alpha\beta}(u) + k_{\beta\gamma}(u).
   $$
:::

::: proof
In the commutative additive group $\operatorname{UniversalSolenoid}$, define pointwise $k_{\alpha\beta}(u) := s_\beta(u) - s_\alpha(u)$, $k_{\beta\gamma}(u) := s_\gamma(u) - s_\beta(u)$, and $k_{\alpha\gamma}(u) := s_\gamma(u) - s_\alpha(u)$ (noting $\operatorname{projection} \circ s_\alpha = \operatorname{projection} \circ s_\gamma$ by transitivity of equality). Since $\operatorname{UniversalSolenoid.projection}$ is an additive group homomorphism preserving subtraction and zero, pointwise equality $\operatorname{projection}(s_\alpha(u)) = \operatorname{projection}(s_\beta(u))$ yields $\operatorname{projection}(k_{\alpha\beta}(u)) = \operatorname{projection}(s_\beta(u)) - \operatorname{projection}(s_\alpha(u)) = 0$. Group cancellation gives $s_\alpha(u) + (s_\beta(u) - s_\alpha(u)) = s_\beta(u)$, and any $k$ satisfying $s_\beta(u) = s_\alpha(u) + k(u)$ for all $u$ satisfies $k(u) = s_\beta(u) - s_\alpha(u)$ pointwise, hence $k = k_{\alpha\beta}$ by `funext`. Clauses 2 and 3 follow identically for $(\beta, \gamma)$ and $(\alpha, \gamma)$. Finally, canceling the intermediate term $-s_\beta(u) + s_\beta(u) = 0$ at each $u \in U$ gives $(s_\beta(u) - s_\alpha(u)) + (s_\gamma(u) - s_\beta(u)) = s_\gamma(u) - s_\alpha(u)$, proving Clause 4. The full proof is checked by the Lean kernel.
:::

Epistemic boundary: The parameter type $U$ carries no topology or continuity assumption; each hidden difference $k_{\alpha\beta}(u)$ is a compatible $\mathbb{N}_+$-indexed thread in $\ker(\operatorname{UniversalSolenoid.projection})$ rather than an arbitrary real angle difference. Crucially, [@thm-apph-hidden-fiber-cocycle] underscores that hidden solenoid threads **cannot** be reconstructed from the visible circle projection alone, nor may one assert that an arbitrary predictive completion quotient $\operatorname{CompletedState}(F, q)$ automatically forms a solenoid.

---

## H.5 Additive Kernel Criterion for Public Recovery with a History Ledger {#sec-appendix-h-5}

Since visible projections alone cannot resolve nontrivial kernel fibers, when does adjoining an additive **history ledger** allow hidden information to be recovered from public data, and how does the ledger constrain the subgroup of undetectable hidden shifts even when full recovery is not yet achieved?

A planar integer-lattice calculation illustrates both regimes cleanly (manual derivation). Set $\mathrm{Control} = \mathbb{Z}^2$ and $\mathrm{Public} = \mathrm{Hidden} = \mathrm{Ledger} = \mathbb{Z}$, with additive homomorphisms

$$
H(x, y) = x, \qquad K(x, y) = y.
$$

Here $\ker H = \{0\} \times \mathbb{Z}$ whereas $\ker K = \mathbb{Z} \times \{0\}$. Because $(0, 1) \in \ker H$ has $K(0, 1) = 1 \neq 0$, the inclusion $\ker H \le \ker K$ fails—the hidden image of the public blind spot is $(\ker H).\operatorname{map}(K) = \mathbb{Z} \neq \{0\}$—so no map from the public value $x$ can recover $y$. Now adjoin an additive ledger homomorphism $L$:

- Choosing the complementary ledger $L(x, y) = y$ shrinks the joint kernel to $\ker H \cap \ker L = \{(0, 0)\}$, collapsing the undetectable hidden image to $\{0\}$ and restoring full recovery;
- Choosing a parity ledger $L_{\mathrm{par}} : \mathbb{Z}^2 \to_+ \mathbb{Z}/2\mathbb{Z}$, $L_{\mathrm{par}}(x, y) = y \bmod 2$, shrinks the joint kernel from $\{0\} \times \mathbb{Z}$ to $\{0\} \times 2\mathbb{Z}$, reducing the undetectable hidden-shift subgroup from $\mathbb{Z}$ to $2\mathbb{Z} \le \mathbb{Z}$—strictly smaller, though not yet trivial.

In the frozen agency module, theorem [`public_recovery_criterion`](lean:D5/S3/Observer/Agency/PublicRecoveryCriterion.public_recovery_criterion) formulates this exact criterion for four general (not necessarily commutative) additive groups `AddGroup` and additive homomorphisms (`→+`, `AddMonoidHom`). Here $H.\mathrm{range}$ denotes the range subgroup, $H.\mathrm{rangeRestrict} : \mathrm{Control} \to_+ H.\mathrm{range}$ the range-restricted surjection, $H.\mathrm{ker}$ the kernel subgroup, $\operatorname{map}(K)$ the subgroup image under $K$, $\sqcap$ subgroup intersection, and $\bot$ the trivial subgroup $\{0\}$:

::: {.theorem #thm-apph-ledger-recovery-kernel title="Kernel Criterion for Public Recovery with a History Ledger" lean="D5/S3/Observer/Agency/PublicRecoveryCriterion.public_recovery_criterion"}
Let $\mathrm{Control}, \mathrm{Public}, \mathrm{Hidden}, \mathrm{Ledger}$ be four types equipped with `[AddGroup ...]` instances, and let

$$
H : \mathrm{Control} \to_+ \mathrm{Public}, \qquad K : \mathrm{Control} \to_+ \mathrm{Hidden}, \qquad L : \mathrm{Control} \to_+ \mathrm{Ledger}
$$

be additive group homomorphisms. Then all four statements below hold:

1. **Equivalence between homomorphic recovery from the public range and kernel inclusion**:

   $$
   \bigl(\exists\,\mathrm{recover} : H.\mathrm{range} \to_+ \mathrm{Hidden},\; K = \mathrm{recover}.\operatorname{comp}(H.\mathrm{rangeRestrict})\bigr) \;\Longleftrightarrow\; H.\mathrm{ker} \le K.\mathrm{ker};
   $$

2. **Equivalence between kernel inclusion and triviality of the undetectable hidden subgroup**:

   $$
   H.\mathrm{ker} \le K.\mathrm{ker} \;\Longleftrightarrow\; H.\mathrm{ker}.\operatorname{map}(K) = \bot;
   $$

3. **Equivalence between triviality of the undetectable hidden subgroup and homomorphic recovery**:

   $$
   H.\mathrm{ker}.\operatorname{map}(K) = \bot \;\Longleftrightarrow\; \bigl(\exists\,\mathrm{recover} : H.\mathrm{range} \to_+ \mathrm{Hidden},\; K = \mathrm{recover}.\operatorname{comp}(H.\mathrm{rangeRestrict})\bigr);
   $$

4. **Monotonic contraction of the undetectable hidden subgroup under an added ledger**:

   $$
   (H.\mathrm{ker} \sqcap L.\mathrm{ker}).\operatorname{map}(K) \;\le\; H.\mathrm{ker}.\operatorname{map}(K).
   $$
:::

::: proof
For Clause 1, suppose $\mathrm{recover} : H.\mathrm{range} \to_+ \mathrm{Hidden}$ satisfies $K = \mathrm{recover}.\operatorname{comp}(H.\mathrm{rangeRestrict})$. If $c \in H.\mathrm{ker}$, then $H(c) = 0$, so $H.\mathrm{rangeRestrict}(c) = 0$ and homomorphism preservation of zero yields $K(c) = \mathrm{recover}(0) = 0$, proving $c \in K.\mathrm{ker}$. Conversely, assume $H.\mathrm{ker} \le K.\mathrm{ker}$. Whenever $H(c_1) = H(c_2)$ in the (not necessarily abelian) additive group, $H(-c_1 + c_2) = -H(c_1) + H(c_2) = 0$ places $-c_1 + c_2 \in H.\mathrm{ker} \le K.\mathrm{ker}$, so $-K(c_1) + K(c_2) = K(-c_1 + c_2) = 0$ and hence $K(c_1) = K(c_2)$. Sending each $y \in H.\mathrm{range}$ to $K(c_y)$ for a chosen preimage $c_y$ is therefore independent of the preimage; for $y_1 = H(c_1)$ and $y_2 = H(c_2)$, $H(c_1 + c_2) = y_1 + y_2$ gives $\mathrm{recover}(y_1 + y_2) = K(c_1 + c_2) = K(c_1) + K(c_2) = \mathrm{recover}(y_1) + \mathrm{recover}(y_2)$, yielding an additive homomorphism $\mathrm{recover} : H.\mathrm{range} \to_+ \mathrm{Hidden}$ with $K = \mathrm{recover}.\operatorname{comp}(H.\mathrm{rangeRestrict})$. For Clause 2, $H.\mathrm{ker}.\operatorname{map}(K) = \bot$ holds if and only if $K(c) = 0$ for every $c \in H.\mathrm{ker}$, which is literally $\forall c \in H.\mathrm{ker},\; c \in K.\mathrm{ker}$, i.e., $H.\mathrm{ker} \le K.\mathrm{ker}$. Clause 3 chains the symmetry of Clause 2 with Clause 1. Clause 4 applies `AddSubgroup.map_mono` to the infimum inclusion $H.\mathrm{ker} \sqcap L.\mathrm{ker} \le H.\mathrm{ker}$. The full proof is checked by the Lean kernel.
:::

Epistemic boundary: [@thm-apph-ledger-recovery-kernel] operates purely on four `AddGroup` carriers and additive homomorphisms (with $\mathrm{recover}$ itself restricted to additive homomorphisms on $H.\mathrm{range}$), carrying no norm, entropy functional, or dynamical clock. Compare [Section 38.5](ch38-s05-escape-ledger-and-entropy.md): [@thm-ch38-escape-pairs-and-structural-novelty] tracks off-diagonal escape pairs across finite set partitions, whereas [@thm-bounded-power-trace-crt] resolves modular-kernel ambiguity $M\mathbb{Z}$ via an external strict amplitude bound $\lvert\operatorname{powerTrace}(A, j)\rvert < B$ with $2B < M$. Clause 4 guarantees monotonic subgroup contraction when adjoining $L$, never that an arbitrary ledger achieves full recovery ($\bot$) or derives thermodynamic irreversibility.

---

## H.6 Unified Solenoid Synthesis and Epistemic Boundary Audit {#sec-appendix-h-6}

The five theorems of Sections H.1–H.5 reside in separate modules—trajectory head evaluation, finite-state horizon refinement, minimal predictive quotient universality, universal-solenoid transition cocycles, and additive-group recovery kernels—linked by the shared structural principle of kernel factorization rather than by automatic cross-module implication. To watch all five theorems interlock on **one concrete mathematical system** while keeping every hypothesis boundary razor-sharp, we carry out the following explicit five-step instantiation on `UniversalSolenoid`:

::: {.example #ex-apph-unified-solenoid title="Unified Walkthrough on UniversalSolenoid: Inversion Update, Four-State Predictive Memory, Hidden Cocycle, and Level-2 Ledger (Manual Derivation)"}
**Manual derivation (explicit joint instantiation of [@thm-apph-current-readout]–[@thm-apph-ledger-recovery-kernel]; not an additional frozen GID).** Take the underlying state space to be the uncountable compact abelian group $X := \operatorname{UniversalSolenoid}$, and write $\pi := \operatorname{UniversalSolenoid.projection} : X \to_+ \operatorname{AddCircle}(1)$ for the visible level-$1$ circle phase ($\pi(x) = x_1$). Equip $X$ with the following deterministic update and semicircle binary readout:

- **Inversion update $F : X \to X$**: Define $F(x) := -x$. Since group negation is an involution, $F^{[2]}(x) = -(-x) = x$, i.e., $F^2 = \mathrm{id}_X$;
- **Semicircle binary readout $q : X \to \{0, 1\}$**: Representing each phase $\pi(x) \in \operatorname{AddCircle}(1) = \mathbb{R}/\mathbb{Z}$ by its unique canonical representative $t(\pi(x)) \in [0, 1)$, set

  $$
  q(x) \;:=\; \begin{cases} 1, & \text{if } t(\pi(x)) \in [0, 1/2), \\ 0, & \text{if } t(\pi(x)) \in [1/2, 1). \end{cases}
  $$

We trace all five stages on this single system:

1. **Current-readout head recovery (instantiating [@thm-apph-current-readout])**:
   Because $F^2 = \mathrm{id}_X$, for every solenoid state $x \in X$ the complete future binary itinerary alternates with period dividing $2$:

   $$
   \operatorname{completeItinerary}(F, q)(x) \;=\; \bigl(q(x),\, q(-x),\, q(x),\, q(-x),\, \dots\bigr),
   $$

   whose $n = 0$ head `itineraryHead` recovers $q(x)$.
2. **One-step horizon stabilization on the finite four-state quotient $Y = \{0, 1\}^2$ (instantiating [@thm-apph-finite-horizon-stability])**:
   Define the two-bit memory map $r : X \to Y := \{0, 1\}^2$ by $r(x) := \bigl(q(x),\, q(-x)\bigr)$, and equip the finite four-state carrier $Y = \{0, 1\}^2$ (`[Fintype Y]`, $\lvert Y\rvert = 4$) with coordinate-swap update $\tau(a, b) := (b, a)$ and first-coordinate readout $\bar{q}(a, b) := a$. Verify first that $r$ surjects onto all four binary pairs on $\operatorname{UniversalSolenoid}$:
   - At $x^{(1,1)} = \operatorname{realFlow}(0) = 0$: $t(\pi(0)) = 0 \in [0, 1/2)$ and $t(\pi(-0)) = 0 \in [0, 1/2)$, giving $r(x^{(1,1)}) = (1, 1)$;
   - At $x^{(0,0)} = \operatorname{realFlow}(1/2)$: $t(\pi(x^{(0,0)})) = 1/2 \in [1/2, 1)$ and $-1/2 \equiv 1/2 \pmod 1$, giving $r(x^{(0,0)}) = (0, 0)$;
   - At $x^{(1,0)} = \operatorname{realFlow}(1/4)$: $t = 1/4 \in [0, 1/2)$ while $t(\pi(-x^{(1,0)})) = 3/4 \in [1/2, 1)$, giving $r(x^{(1,0)}) = (1, 0)$;
   - At $x^{(0,1)} = \operatorname{realFlow}(3/4)$: $t = 3/4 \in [1/2, 1)$ while $t(\pi(-x^{(0,1)})) = 1/4 \in [0, 1/2)$, giving $r(x^{(0,1)}) = (0, 1)$.

   Observe the exact cardinality boundary: **what satisfies `[Fintype Y]` here is the four-state readout quotient $Y = \{0, 1\}^2$, whereas the underlying `UniversalSolenoid` $X$ remains infinite!** On $(Y, \tau, \bar{q})$, zero-step horizon $m = 0$ splits $Y$ only into $\{(1,1),(1,0)\}$ and $\{(0,0),(0,1)\}$; advancing one step to $m = 1$ (two samples $k = 0, 1$) yields four distinct two-bit words $(1,1), (1,0), (0,1), (0,0)$ that determine the entire infinite periodic future, stabilizing to the complete-itinerary kernel at $\operatorname{completionDepth}(\tau, \bar{q})$.
3. **Unique factorization through $r$ into `CompletedState F q` (instantiating [@thm-apph-predictive-minimal-quotient])**:
   On $X$, $q(x) = \bar{q}(r(x))$ satisfies `readout_factors` and $r(F(x)) = (q(-x), q(x)) = \tau(r(x))$ satisfies `update_factors` (via $-(-x) = x$). By [@thm-apph-predictive-minimal-quotient], there exists a unique map $\theta : \operatorname{Set.range}(r) \to \operatorname{CompletedState}(F, q)$ with $\operatorname{completionProjection}(F, q) = \theta \circ \operatorname{Set.rangeFactorization}(r)$. Since Step 2 established $\operatorname{Set.range}(r) = \{0, 1\}^2$ with four pairwise distinct alternating trajectories, $\theta$ identifies $\operatorname{CompletedState}(F, q)$ bijectively with those $4$ predictive classes.
4. **Hidden-fiber transition cocycle inside a single predictive class (instantiating [@thm-apph-hidden-fiber-cocycle])**:
   Select the nonzero projection-kernel elements $k := \operatorname{realFlow}(1)$ and $l := \operatorname{realFlow}(2)$, and over $U = X$ consider the three lifts

   $$
   s_\alpha(x) = x, \qquad s_\beta(x) = x + k, \qquad s_\gamma(x) = x + k + l.
   $$

   Since $\pi(k) = 0$ and $\pi(l) = 0$, all three share identical visible phases both before and after inversion: $\pi(s_\alpha(x)) = \pi(s_\beta(x)) = \pi(s_\gamma(x)) = \pi(x)$ and $\pi(-s_\bullet(x)) = -\pi(x)$. Under $(F, q)$, $x$, $x + k$, and $x + k + l$ therefore produce the **exact same infinite binary readout itinerary** and merge into a single point of $\operatorname{CompletedState}(F, q)$. Inside the underlying solenoid fiber, however, [@thm-apph-hidden-fiber-cocycle] locks their unique hidden transition differences $k_{\alpha\beta}(x) = k$, $k_{\beta\gamma}(x) = l$, and $k_{\alpha\gamma}(x) = k + l = \operatorname{realFlow}(3)$, obeying $k_{\alpha\gamma}(x) = k_{\alpha\beta}(x) + k_{\beta\gamma}(x)$ while carrying nontrivial deeper thread phases ($k_2 = 1/2$, $l_3 = 2/3$).
5. **Strict kernel contraction—without full recovery—under a level-2 history ledger (instantiating [@thm-apph-ledger-recovery-kernel])**:
   Finally, instantiate the four additive groups as

   $$
   \mathrm{Control} = \mathrm{Hidden} := \operatorname{UniversalSolenoid}, \qquad \mathrm{Public} = \mathrm{Ledger} := \operatorname{AddCircle}(1),
   $$

   with public homomorphism $H(x) := \pi(x) = x_1$, target hidden homomorphism $K(x) := x$ ($\mathrm{id}_X$), and level-$2$ history-ledger homomorphism $L(x) := x_{\langle 2,\, 0 < 2\rangle}$:
   - **Before adjoining the ledger**: $k = \operatorname{realFlow}(1)$ has $H(k) = k_1 = 0$ yet $K(k) = k \neq 0$ (since $k_2 = 1/2 \neq 0$), so $k \in H.\mathrm{ker} \setminus K.\mathrm{ker}$ prevents full solenoid recovery from $H$ alone;
   - **After adjoining the level-$2$ ledger $L(x) = x_2$**: Because $L(k) = k_2 = 1/2 \neq 0$, $k$ is expelled from $H.\mathrm{ker} \sqcap L.\mathrm{ker}$, strictly shrinking the undetectable subgroup: $(H.\mathrm{ker} \sqcap L.\mathrm{ker}).\operatorname{map}(K) \subsetneq H.\mathrm{ker}.\operatorname{map}(K)$;
   - **Why full recovery still fails**: Inspect the doubled shift $2k = k + k = \operatorname{realFlow}(2) = l$ across levels $1, 2, 3$:

     $$
     (2k)_1 = \Bigl[\frac{2}{1}\Bigr] = 0 \;\Longrightarrow\; 2k \in H.\mathrm{ker}, \qquad (2k)_2 = \Bigl[\frac{2}{2}\Bigr] = 0 \;\Longrightarrow\; 2k \in L.\mathrm{ker},
     $$

     yet at level $3$,

     $$
     (2k)_3 = \Bigl[\frac{2}{3}\Bigr] = \frac{2}{3} \neq 0 \in \operatorname{AddCircle}(1) \;\Longrightarrow\; K(2k) = 2k \neq 0!
     $$

     Hence $0 \neq 2k \in (H.\mathrm{ker} \sqcap L.\mathrm{ker}).\operatorname{map}(K)$, so the joint blind spot remains nontrivial ($\neq \bot$)! More generally, any single fixed-level coordinate ledger $L_m(x) = x_m$ vanishes on $\operatorname{realFlow}(m)$ at both level $1$ and level $m$ ($[m/1] = [m/m] = 0$) while leaving a nonzero residue $\bigl[\frac{m}{m+1}\bigr] \neq 0$ at level $m + 1$. In pure group-theoretic miniature, **a finite-level ledger can genuinely contract the indistinguishable kernel, yet a single-level one leaves a residual blind spot in deeper fibers awaiting the next stage of table expansion.**
:::

The exact hypotheses, verified conclusions, and non-extrapolation guardrails for all five kernel-verified theorems of Appendix H are consolidated in the master audit table below:

::: {.remark #rem-apph-epistemic-audit title="Master Scope and Epistemic Boundary Audit for the Five Formalized Theorems of Appendix H"}
**Formal Scope and Anti-Overclaiming Ledger.**

| Theorem & Kernel Declaration | Exact Type & Algebraic Hypotheses | Verified Mathematical Conclusion | Strict Non-Extrapolation Boundary |
| :--- | :--- | :--- | :--- |
| [@thm-apph-current-readout] ([`recover_current_readout`](lean:D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.recover_current_readout), `LEAN ✓`) | Arbitrary types $X, B$ and maps $F : X \to X$, $q : X \to B$ (no finiteness assumed) | Functional identity $q = \operatorname{itineraryHead} \circ \operatorname{completeItinerary}(F, q)$ | Never claim that instantaneous readout $q(x)$ alone recovers the future itinerary or internal state $x$; involves neither noise nor statistical estimation |
| [@thm-apph-finite-horizon-stability] ([`finite_horizon_stabilizes_at_completionDepth`](lean:D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.finite_horizon_stabilizes_at_completionDepth), `LEAN ✓`) | Arbitrary types $Y, O$ with mandatory `[Fintype Y]`; horizon $m$ samples $0 \le k \le m$ ($m + 1$ readings) | At $m = \operatorname{completionDepth}(\tau, q)$, `finiteHorizonKernel` equals $\operatorname{Setoid.ker}(\operatorname{completeItinerary}(\tau, q))$ | Never drop `[Fintype Y]` for infinite state spaces, or treat the `Classical.choose`-based `completionDepth` as a physical clock bound |
| [@thm-apph-predictive-minimal-quotient] ([`predictive_memory_minimal_quotient`](lean:D5/S3/ObserverMemory/RefinementClosure/PredictiveMemoryMinimalQuotient.predictive_memory_minimal_quotient), `LEAN ✓`) | Arbitrary types $X, B, M$; memory $r : X \to M$ satisfying both `readout_factors` and `update_factors` | Unique map $\theta : \operatorname{Set.range}(r) \to \operatorname{CompletedState}(F, q)$ factoring `completionProjection F q` | $\theta$ is defined on $\operatorname{Set.range}(r)$ rather than all of $M$; never claim $\theta$ must be injective, that $r$ is minimal, or that automaton complexity is bounded |
| [@thm-apph-hidden-fiber-cocycle] ([`three_lift_difference_cocycle`](lean:D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle), `LEAN ✓`) | Arbitrary parameter type $U$; three lifts $s_\alpha, s_\beta, s_\gamma : U \to \operatorname{UniversalSolenoid}$ with equal base projection | Unique differences $k_{\alpha\beta}, k_{\beta\gamma}, k_{\alpha\gamma}$ in $\ker(\operatorname{projection})$ obeying $k_{\alpha\gamma}(u) = k_{\alpha\beta}(u) + k_{\beta\gamma}(u)$ | No continuity hypothesis on $U$; differences are $\mathbb{N}_+$-indexed threads rather than single real angles; never claim base projection recovers hidden threads or that arbitrary predictive quotients are solenoids |
| [@thm-apph-ledger-recovery-kernel] ([`public_recovery_criterion`](lean:D5/S3/Observer/Agency/PublicRecoveryCriterion.public_recovery_criterion), `LEAN ✓`) | Four `AddGroup` types and three additive homomorphisms $H, K, L$ (no commutativity, norm, or measure assumed) | Range homomorphic recovery $\Longleftrightarrow H.\mathrm{ker} \le K.\mathrm{ker} \Longleftrightarrow H.\mathrm{ker}.\operatorname{map}(K) = \bot$, and $(H.\mathrm{ker} \sqcap L.\mathrm{ker}).\operatorname{map}(K) \le H.\mathrm{ker}.\operatorname{map}(K)$ | Never claim an arbitrary history ledger achieves full recovery ($2k \neq 0$ still escapes in [@ex-apph-unified-solenoid]), or that subgroup kernel inclusion alone derives thermodynamic irreversibility |
:::

Stepping back across the five-rung algebraic ladder—from head recovery ([@thm-apph-current-readout]), finite-state horizon stabilization ([@thm-apph-finite-horizon-stability]), and minimal predictive quotient universality ([@thm-apph-predictive-minimal-quotient]) to hidden solenoid cocycles ([@thm-apph-hidden-fiber-cocycle]) and history-ledger kernel criteria ([@thm-apph-ledger-recovery-kernel])—the exact mathematical skeleton of finite-horizon observation stands plain: on the visible predictive side, quotienting compresses all future-equivalent states losslessly onto a minimal memory kernel; on the hidden-fiber side, each added history ledger squeezes the blind spot inward by subgroup kernel intersection, while deeper unrecorded fiber phases remain honestly registered as transition cocycle differences along the frontier between what is known and what still escapes.
