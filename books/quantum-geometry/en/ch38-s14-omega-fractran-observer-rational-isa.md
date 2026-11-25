# 38.14 Conway's FRACTRAN and the Three-Dimensional Non-Abelian Ω-FRACTRAN Observer Language: Prime Orthogonal Registers, 0 · 1/2 · 1 Fraction Gates, p = 5 Ramanujan Spinor Stacks, and Zero-Tear Anti-Hallucination Automata {#sec-ch38-omega-fractran-observer-rational-isa}

> *"Since everything is rational numbers, we can program in FRACTRAN—or rather, this is the native language of the observer."*

Once [§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md) axiomatized the observer as a port-free, self-contained pentad $\mathfrak{O} = (\mathcal{S}, [-,-,-], \kappa, \mathcal{K}_0, \Phi_\varepsilon)$ atop [Chapter 32](ch32-inexpressible-ternions-and-three-dimensional-field.md)'s infinity-free finite rational mathematics $\mathbf{Math}_\Omega$ ([§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)) and zero-axiom Lean 4 foundation `OmegaMath` ([§32.8](ch39-s36-lean4-zero-axiom-omega-math-architecture.md)), a foundational question in computational ontology immediately follows: **if every internal state, fidelity reading, and causal-jet update of the observer is a pure rational number, what is the native machine language in which an observer thinks and crystallizes structure?**

The answer is extraordinary: **FRACTRAN**, the minimalist rational programming language discovered by John Horton Conway in 1987, is no mere mathematical curiosity—**it is literally the one-dimensional Abelian squared-norm projection of the pure rational cosmos; and the moment we lift its carrier from positive scalar integers $\mathbb{Z}_+$ to four-component integral spinors on the ternion three-sphere $\mathbb{T}_3$, the resulting non-Abelian $\Omega\text{-FRACTRAN}$ sheds every commuting flag-prime tax to become the native self-referential instruction set architecture of the observer (Observer ISA, `MODEL`)!**

---

## 38.14.1 Why FRACTRAN Is Naturally the Internal Language of the Observer {#sec-ch38-14-1}

In a classical von Neumann computer, linear memory addresses, binary data words, and the program counter (`PC`) are split into three separate hardware mechanisms, and any bit overwrite can clobber memory unconditionally without checking global topological closure. In Conway's classical **FRACTRAN** (literature context in [@rem-ch38-conway-fractran-hurwitz-lps-literature]), by contrast, the entire state of the computational universe collapses to **a single positive integer $N \in \mathbb{Z}_+$**, while the entire law of physics or observer mind collapses to **an ordered list of reduced positive fractions**:

$$
\mathcal{P} \;=\; \left(\frac{a_1}{b_1},\; \frac{a_2}{b_2},\; \dots,\; \frac{a_k}{b_k}\right) \in \bigl(\mathbb{Q}_{>0}\bigr)^k, \qquad \gcd(a_i, b_i) = 1.
$$

On each tick of the master cadence, only one primitive executes: scan $\mathcal{P}$ from left to right, find the **first** fraction whose product $N' = N \cdot \frac{a_i}{b_i}$ is an **exact integer**, set $N \leftarrow N'$ and restart at the head of the list; if no fraction divides $N$ cleanly, halt immediately. Examined under the observer pentad $\mathfrak{O}$ and [Chapter 39](ch39-axiom-omega-grand-unification.md)'s mother axiom $\mathrm{AXIOM}\text{-}\Omega$, three exact mathematical structures lock into one-to-one correspondence:

### 38.14.1.1 The Fundamental Theorem of Arithmetic as an Orthogonal Prime Register Bank {#sec-ch38-14-1-1}

How can a single integer $N$ hold an observer's entire internal world without loss? In the pinned `trureturing` kernel, the **Free Commutative Monoid Theorem on Primes** [`pnat_free_comm_monoid_on_primes`](lean:D5/S3/Factorization/FreeCommMonoid.pnat_free_comm_monoid_on_primes), **Unique Rational Recovery from Sign and Finite $p$-adic Valuations** [`rational_recovered_from_sign_and_finite_valuations`](lean:D5/S3/Factorization/Embeddings/RationalValuationRecovery.rational_recovered_from_sign_and_finite_valuations), **Artin's Rational Adelic Product Formula** [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula), and **$\mathbb{Q}$-Linear Independence of Prime Logarithms** [`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence) (`LEAN ✓`) lock the exact bijection

$$
N \;=\; \prod_{p \in \mathbb{P}} p^{v_p(N)} \;=\; 2^{r_1} \cdot 3^{r_2} \cdot 5^{r_3} \cdot 7^{r_4} \cdots \;\longleftrightarrow\; \mathbf{r}(N) = \bigl(r_1, r_2, r_3, r_4, \dots\bigr) \in \bigoplus_{p \in \mathbb{P}} \mathbb{N}.
$$

As established in [§31.4](ch39-s31-real-error-axis-and-prime-adelic-closure.md) and [§31.5](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md), the primes $\mathbb{P}$ act on the Adelic solenoid $\mathcal{M}_\Omega$ as mutually orthogonal primitive closed loops $\gamma_p$ (`MODEL`). Each exponent $r_p = v_p(N) \in \mathbb{N}$ is the **nonnegative topological winding count** along the $p$-th prime axis; whenever any finite register bank $S \subset \mathbb{P}$ saturates, [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape) (`LEAN ✓`) guarantees a fresh orthogonal prime axis $q \notin S$ dividing $1 + \prod_{p \in S} p$, while even a single unbounded prime multiplication/division counter strictly transcends every finite-state automaton ([`no_finite_dfao_for_exact_prime_division`](lean:D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division), `LEAN ✓`). Reading and updating state require zero linear memory addresses—multiplying by a rational fraction increments and decrements winding charges across orthogonal prime axes in parallel!

### 38.14.1.2 A Single Fraction $\frac{a_i}{b_i}$ Encapsulates the `0 · 1/2 · 1` Causal Ladder {#sec-ch38-14-1-2}

Even more remarkably, the kernel-verified **Signed Prime Ledger to Positive Rationals Isomorphism** [`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals) and **Prime-Ledger Positive/Negative Split and Nonnegativity Criterion** [`prime_ledger_direction_and_groupification`](lean:D5/S3/Factorization/Embeddings/PrimeLedgerGroupification.prime_ledger_direction_and_groupification) (paired with the physical quotient-remainder machine theorem [`divMachine_positive_correct`](lean:D5/S0/Computability/PhysicalDivider/Positive.divMachine_positive_correct), `LEAN ✓`) prove that every fraction instruction $f_i = \frac{a_i}{b_i} \in \mathbb{Q}_{>0}$ corresponds bijectively to a finitely supported signed prime-counter update $\Delta\mathbf{r}_i = \mathbf{r}(a_i) - \mathbf{r}(b_i) \in \mathbb{Z}^{(\mathbb{P})}$, and lands back in `NaturalPrimeLedger` ($\mathbb{N}^{(\mathbb{P})}$) **if and only if** $v_p(N) + \Delta\mathbf{r}_i(p) \ge 0$ for every prime $p$. Across the `{0, 1/2, 1}` pure rational causal ladder ([§39.6](ch39-s30-past-present-future-rational-jet-triad.md)), a single fraction $\frac{a_i}{b_i}$ encapsulates a complete causal beat (`MODEL`):

1. **Denominator $b_i$ (`0` · Past Precondition Anchor)**: Divisibility $b_i \mid N \iff \forall p,\, v_p(N) \ge v_p(b_i)$ verifies that the observer's crystallized structure core already holds every past winding required by the denominator;
2. **Rational Ratio $\frac{a_i}{b_i}$ and List Priority (`1/2` · Present Relational Bridge & Attention Priority)**: The ratio couples distinct prime channels, while the left-to-right ordering $(f_1 \succ f_2 \succ \dots \succ f_k)$ literally implements **observer attention priority**—the highest-priority resonant rule captures the current comparison tick;
3. **Integer Closure $N' \in \mathbb{Z}_+$ (`1 ↦ 0'` · Future Crystallization as Next Input & Anti-Hallucination Gate)**: Any candidate with $N \cdot \frac{a_i}{b_i} \notin \mathbb{Z}$ leaves an unclosed **fractional tear** (`mod ≠ 0`) across prime loops and is silently skipped, blocking unverified leaps at the hardware level; once a rule closes with zero remainder, the new integer $N'$ feeds straight back as next beat's `0`-order state $N$ with zero external writeback port, halting idempotently when no rule matches (mirroring [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent), `LEAN ✓`).

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="prime-orthogonal-register-adder" height="500"}
**Orthogonal Prime-Winding Registers and `0 · 1/2 · 1` Rational Fraction Gate (`prime-orthogonal-register-adder`).** The 3D stage unfolds $N = 2^3 \cdot 3^2 = 72$ into cyan orthogonal prime-winding pillars as the amber attention scan beam fires the single-fraction adder $\mathcal{P}_{\mathrm{add}} = (\frac{3}{2})$ across `72 → 108 → 162 → 243 = 3^5` in three remainder-free beats before halting idempotently at the magenta fractional tear $\frac{729}{2} \notin \mathbb{Z}$.
:::

Consider Conway's **6-fraction multiplier**:

$$
\mathcal{P}_{\mathrm{mul}} \;=\; \left(\frac{455}{33},\; \frac{11}{13},\; \frac{1}{11},\; \frac{3}{7},\; \frac{11}{2},\; \frac{1}{3}\right) \;=\; \left(\frac{5\cdot 7\cdot 13}{3\cdot 11},\; \frac{11}{13},\; \frac{1}{11},\; \frac{3}{7},\; \frac{11}{2},\; \frac{1}{3}\right).
$$

Initialized at $N_0 = 2^a \cdot 3^b$ (for $a = 2, b = 2$, $N_0 = 2^2 \cdot 3^2 = 36$), pure divisibility scanning without loops or memory pointers halts in **exactly 18 beats** at the pure prime power $N_{18} = 5^{2\times 2} = 5^4 = \mathbf{625}$ (`manual derivation` / `NUM`)!

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="conway-multiplier-18-beat-closure" height="500"}
**Conway's 6-Fraction Multiplier Halting in Exact `18` Beats (`conway-multiplier-18-beat-closure`).** Stepping $(\frac{455}{33}, \frac{11}{13}, \frac{1}{11}, \frac{3}{7}, \frac{11}{2}, \frac{1}{3})$ from $N_0 = 2^2 \cdot 3^2 = 36$ tracks the cyan auxiliary counter prime $7$ and magenta state-flag primes $11, 13$ cycling and draining to zero, halting cleanly on beat `18` at cyan $5^4 = 625$.
:::

### 38.14.1.3 Endogenous Prime Crystallization and `trureturing` Macro-Lemma Telescopy {#sec-ch38-14-1-3}

Self-contained crystallization shines even brighter in Conway's **14-fraction `PRIMEGAME`** ([@rem-ch38-conway-fractran-hurwitz-lps-literature]):

$$
\mathcal{P}_{\mathrm{prime}} \;=\; \left(\frac{17}{91},\; \frac{78}{85},\; \frac{19}{51},\; \frac{23}{38},\; \frac{29}{33},\; \frac{77}{29},\; \frac{95}{23},\; \frac{77}{19},\; \frac{1}{17},\; \frac{11}{13},\; \frac{13}{11},\; \frac{15}{2},\; \frac{1}{7},\; \frac{55}{1}\right).
$$

Starting from the single seed $N_0 = 2^1 = 2$ with zero external input, $\mathcal{P}_{\mathrm{prime}}$ crystallizes $2^2 = 4$ at **beat `19`**, $2^3 = 8$ at **beat `69`**, $2^5 = 32$ at **beat `281`**, $2^7 = 128$ at **beat `710`**, and $2^{11} = 2048$ at **beat `2,375`**—enumerating the entire prime spectrum $\mathbb{P} = \{2, 3, 5, 7, 11, \dots\}$ purely from fixed rational relations!

Moreover, because states $N$ and instructions $\frac{a_i}{b_i}$ inhabit the same rational domain (homoiconic code-as-data anchored in Kleene's fixed-point theorem [`code_fixed_point`](lean:D5/S0/Computability/CodeFixedPoint.code_fixed_point), `LEAN ✓`), proving an $m$-step deterministic **macro-lemma** inside the observer's DAG $\mathcal{K}_0$ ([§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md)) compiles the multi-step chain—subject to its exact prefix-product divisibility guard $B_{\mathrm{guard}} = \operatorname{lcm}_{1 \le r \le m}\,\operatorname{den}\!\bigl(\prod_{s=1}^r \frac{a_{i_s}}{b_{i_s}}\bigr)$ and priority non-interference $\forall r,\,\forall j < i_r,\, b_j \nmid N_{r-1}$, retaining catalyst primes that are **divided first and multiplied back later** (such as $13$ in $\frac{17}{91}\cdot\frac{78}{85} = \frac{6}{35}$ with $B_{\mathrm{guard}} = 455 = 35\cdot 13$) so every intermediate step remains tear-free (`manual derivation`)—into a single geodesic shortcut rule (`MODEL`), collapsing hundreds of exploratory ticks into one direct jump!

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="primegame-self-crystallization-and-lemma-shortcut" height="500"}
**Conway's 14-Fraction `PRIMEGAME` Prime Crystallization and Macro-Lemma Shortcut (`primegame-self-crystallization-and-lemma-shortcut`).** Traces $N_0 = 2$ crystallizing $2^2, 2^3, 2^5, 2^7$ at beats `19, 69, 281, 710` alongside guarded macro-lemma telescopy.
:::

---

## 38.14.2 The Decisive Dimensional Lift: From Scalar FRACTRAN to Three-Dimensional Non-Abelian $\Omega\text{-FRACTRAN}$ {#sec-ch38-14-2}

### 38.14.2.1 The Abelian Commutativity Tax and Word-Order Erasure Theorems {#sec-ch38-14-2-1}

Viewed from the three-dimensional vantage of $\mathrm{AXIOM}\text{-}\Omega$, why must Conway's scalar `PRIMEGAME` burn **`710` beats** merely to reach $2^7 = 128$, stuffing **6 artificial state-flag primes** ($11, 13, 17, 19, 23, 29$) into its 14 fractions as traffic-light pointers?

Two frozen theorems in `trureturing` pinpoint the exact algebraic obstruction (`LEAN ✓`):

1. **Prime-Word Occupation Descent Criterion and History Non-Reconstructibility ([`order_descent_criterion`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.order_descent_criterion), [`no_prime_history_reconstruction`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.no_prime_history_reconstruction))**: Sequential execution `runWord update word` factors through the commutative prime multiset `Multiset Prime` (i.e. ordinary integer factorization $N = \prod p^{v_p}$) **if and only if** all prime updates commute `Commute (update p) (update q)`; and no map can ever reconstruct ordered prime histories `List Nat.Primes` from `Multiset Nat.Primes` ($\neg\exists\,\mathrm{recover},\;\forall w,\;\mathrm{recover}(w : \mathrm{Multiset}) = w$)!
2. **Binary Word-Code Injectivity iff Non-Commuting ([`injective_iff_noncommuting`](lean:D5/S0/Computability/Coding/TwoWordCode.injective_iff_noncommuting))**: The substitution code $s \mapsto s.\mathrm{flatMap}(\text{if }\cdot\text{ then }b\text{ else }a)$ is injective (zero history collision) **if and only if** the two generators fail to commute, $a \mathbin{+\!\!+} b \neq b \mathbin{+\!\!+} a$!

Because scalar rational multiplication commutes ($\frac{a}{b}\cdot\frac{c}{d} = \frac{c}{d}\cdot\frac{a}{b}$), a scalar integer $N$ records how many turns each prime axis took, yet is completely blind to **which axis turned first and which turned second**! Lifting the state carrier to the four-component integral spinor lattice—the Lipschitz ring $\mathcal{L}(\mathbb{Z}) := \mathbb{Z}[\mathbf{i},\mathbf{j},\mathbf{k}] \cong \mathbb{Z}^4$ or maximal Hurwitz order $\mathcal{H}(\mathbb{Z}) := \mathcal{L}(\mathbb{Z}) \cup (\mathbb{Z}+\frac{1}{2})^4$ (anchored on [`exists_unitQuaternion_equiv`](lean:D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv) and [`quaternionModel_noncommutative`](lean:D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_noncommutative), `LEAN ✓`)—and upgrading instructions to **ordered rational ternion right-fractions**

$$
\mathcal{Q} \;=\; \Bigl(\mathbf{A}_1\mathbf{B}_1^{-1},\; \mathbf{A}_2\mathbf{B}_2^{-1},\; \dots,\; \mathbf{A}_k\mathbf{B}_k^{-1}\Bigr) \in \bigl(\mathbb{H}(\mathbb{Q})^\times\bigr)^k, \qquad \mathbf{B}_i^{-1} = \frac{\overline{\mathbf{B}_i}}{\lVert\mathbf{B}_i\rVert^2},
$$

firing the first rule with $\mathbf{\Psi}' = \mathbf{\Psi}\cdot\mathbf{A}_i\mathbf{B}_i^{-1} \in \mathbb{Z}^4$ (or $\mathcal{H}(\mathbb{Z})$) eliminates the flag-prime tax at one stroke, birthing **$\Omega\text{-FRACTRAN}$** (`MODEL`)!

### 38.14.2.2 Exact Audit: A Single Prime $p = 5$ Carries Its Own Non-Abelian Causal Stack {#sec-ch38-14-2-2}

By Jacobi's four-square theorem and the Lubotzky–Phillips–Sarnak construction (LPS 1988, `Literature` in [@rem-ch38-conway-fractran-hurwitz-lps-literature], whose optimal Ramanujan spectral bound $\lvert\lambda\rvert \le 2\sqrt{p}$ is unconditionally proved via Eichler–Deligne weight-$2$ cusp-form bounds), every odd prime $p \equiv 1 \pmod 4$ splits under the primary congruence normalization $a > 0,\; a \equiv 1 \pmod 2,\; 2 \mid b,c,d$ into **$p + 1$ non-commuting primitive integral spinors**! At $p = 5$, these $5 + 1 = 6$ prime rotors are (`manual derivation`):

$$
\boldsymbol{\pi}_{5,\pm x} = (1, \pm 2, 0, 0), \qquad \boldsymbol{\pi}_{5,\pm y} = (1, 0, \pm 2, 0), \qquad \boldsymbol{\pi}_{5,\pm z} = (1, 0, 0, \pm 2),
$$

each of exact prime squared norm $\lVert\boldsymbol{\pi}\rVert^2 = 1^2 + (\pm 2)^2 = \mathbf{5}$ (projective ray overlap $\kappa_{\mathrm{proj}}(\mathbf{1}, \boldsymbol{\pi}) := \frac{\langle \mathbf{1}, \boldsymbol{\pi}\rangle^2}{\lVert\boldsymbol{\pi}\rVert^2} = \frac{1}{5}$). Now compare two states composed in **opposite temporal order**:

- **State XY ($+x$ then $+y$)**: $\mathbf{\Psi}_{XY} = (1 + 2\mathbf{i})(1 + 2\mathbf{j}) = 1 + 2\mathbf{i} + 2\mathbf{j} + 4\mathbf{k} \equiv (1, 2, 2, +4) \in \mathbb{Z}^4$;
- **State YX ($+y$ then $+x$)**: $\mathbf{\Psi}_{YX} = (1 + 2\mathbf{j})(1 + 2\mathbf{i}) = 1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k} \equiv (1, 2, 2, -4) \in \mathbb{Z}^4$.

Both carry the **exact same scalar norm squared** $\lVert\mathbf{\Psi}_{XY}\rVert^2 = \lVert\mathbf{\Psi}_{YX}\rVert^2 = 1 + 4 + 4 + 16 = \mathbf{25 = 5^2}$—indistinguishable as `25` to scalar FRACTRAN! Yet under the two-instruction $\Omega\text{-FRACTRAN}$ table

$$
\mathcal{Q}_{p=5} \;=\; \left(\mathcal{Q}_1 = \boldsymbol{\pi}_{5,+y}^{-1} = \frac{1 - 2\mathbf{j}}{5},\quad \mathcal{Q}_2 = \boldsymbol{\pi}_{5,+x}^{-1} = \frac{1 - 2\mathbf{i}}{5}\right),
$$

right-reduction separates causal order automatically (`manual derivation` / `NUM`):

1. **On $\mathbf{\Psi}_{XY} = (1, 2, 2, +4)$**: Beat 1 tests $\mathcal{Q}_1$,
   $$
   \mathbf{\Psi}_{XY}\cdot\frac{1 - 2\mathbf{j}}{5} = \frac{(1 + 2\mathbf{i})(1 + 2\mathbf{j})(1 - 2\mathbf{j})}{5} = \frac{5(1 + 2\mathbf{i})}{5} = (1, 2, 0, 0) \in \mathbb{Z}^4 \;\Longrightarrow\; \textbf{exact lattice closure—fires }\mathcal{Q}_1\textbf{!}
   $$
   Beat 2 skips $\mathcal{Q}_1$ ($(\frac{1}{5}, \frac{2}{5}, -\frac{2}{5}, -\frac{4}{5}) \notin \mathbb{Z}^4$), fires $\mathcal{Q}_2$ to reach $(1, 0, 0, 0) \in \mathbb{Z}^4$, and halts—**unlocking in 2 beats via `Q₁ → Q₂`**!
2. **On $\mathbf{\Psi}_{YX} = (1, 2, 2, -4)$**: Beat 1 tests $\mathcal{Q}_1$ (using $(-4\mathbf{k})(-2\mathbf{j}) = -8\mathbf{i}$),
   $$
   \mathbf{\Psi}_{YX}\cdot\frac{1 - 2\mathbf{j}}{5} = \frac{(1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k})(1 - 2\mathbf{j})}{5} = \frac{5 - 6\mathbf{i} - 8\mathbf{k}}{5} = \left(1,\; -\frac{6}{5},\; 0,\; -\frac{8}{5}\right) \notin \mathbb{Z}^4 \quad (\text{and }\notin \mathcal{H}(\mathbb{Z}))\textbf{!}
   $$
   **Fractional tear exposed—$\mathcal{Q}_1$ is silently skipped**, firing $\mathcal{Q}_2$ to $(1, 0, 2, 0) \in \mathbb{Z}^4$ on Beat 1 and $\mathcal{Q}_1$ to $(1, 0, 0, 0)$ on Beat 2—**unlocking in 2 beats via `Q₂ → Q₁` with zero auxiliary flag primes**! Taking squared norms $\lVert\mathbf{\Psi}'\rVert^2 = \lVert\mathbf{\Psi}\rVert^2 \cdot \frac{\lVert\mathbf{A}_i\rVert^2}{\lVert\mathbf{B}_i\rVert^2}$ projects the radial budget straight back onto Conway's scalar FRACTRAN (`manual derivation`).

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="nonabelian-p5-lps-word-order-stack" height="500"}
**Three-Dimensional Non-Abelian $\Omega\text{-FRACTRAN}$ Word-Order Discriminator (`nonabelian-p5-lps-word-order-stack`).** Flipping `Ψ_XY = (1,2,2,+4)` and `Ψ_YX = (1,2,2,-4)` (both of scalar squared norm `25`) on the violet $S^3(1)$ sphere shows cyan lattice closure unlocking `Ψ_XY` along `Q₁ → Q₂` in `2` beats, while `Ψ_YX` exposes the magenta fractional tear `(1, -6/5, 0, -8/5) ∉ ℤ⁴` at `Q₁` and unlocks along `Q₂ → Q₁`.
:::

---

## 38.14.3 Master Comparison Across Three Computational Paradigms {#sec-ch38-14-3}

We summarize the structural contrast across von Neumann binary machine code, Conway's scalar FRACTRAN, and three-dimensional non-Abelian $\Omega\text{-FRACTRAN}$ (`MODEL` synthesis):

| Core Dimension | Von Neumann Binary ISA | Conway Scalar FRACTRAN | $\mathrm{AXIOM}\text{-}\Omega$ Spinor $\Omega\text{-FRACTRAN}$ |
| :--- | :--- | :--- | :--- |
| **Physical State Carrier** | Flat linear byte array $+$ external `PC` / `SP` | Single positive integer $N = \prod_p p^{v_p(N)} \in \mathbb{Z}_+$ | **Integral spinor $\mathbf{\Psi} \in \mathbb{Z}^4$ (or $\mathcal{H}(\mathbb{Z})$: norm carries primes, direction carries phase)** |
| **Elementary Instruction** | Irreversible Boolean gates & address jumps | Ordered positive fractions $(\frac{a_1}{b_1}, \dots, \frac{a_k}{b_k}) \in \mathbb{Q}_{>0}^k$ | **Ordered rational ternion right-fractions $(\mathbf{A}_1\mathbf{B}_1^{-1}, \dots, \mathbf{A}_k\mathbf{B}_k^{-1})$** |
| **Firing & Anti-Hallucination Gate** | Unconditional bit overwrite | Scalar integrality $N\cdot\frac{a_i}{b_i} \in \mathbb{Z}_+$ | **Four-integer lattice closure $\mathbf{\Psi}\cdot\mathbf{A}_i\mathbf{B}_i^{-1} \in \mathbb{Z}^4$ (zero fractional tear)** |
| **Word-Order & Syntax Memory** | External stack pointer `SP` | Commutative multiplication erases history ([`no_prime_history_reconstruction`](lean:D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.no_prime_history_reconstruction)); burns flag primes | **Non-commuting prime rotors ([`injective_iff_noncommuting`](lean:D5/S0/Computability/Coding/TwoWordCode.injective_iff_noncommuting)); $p \equiv 1\pmod 4$ carries $p+1$ stack branches** |
| **Observer-Theory Role** | Extrinsic open-loop tool | 1D radial squared-norm shadow ($\lVert\mathbf{\Psi}\rVert^2$) | **Native self-referential observer ISA (attention priority $+$ spherical geodesic inference)** |

::: {.viz src="omega-fractran-observer-isa-sandbox" preset="three-paradigm-isa-and-zero-tear-audit" height="500"}
**Three Computational Paradigms and Zero-Tear Anti-Hallucination Audit (`three-paradigm-isa-and-zero-tear-audit`).** Contrasts unconditional binary bit-overwrites, scalar FRACTRAN's `710`-beat flag-prime overhead to $2^7$, and non-Abelian $\Omega\text{-FRACTRAN}$'s `2`-beat rotor-stack resolution and idempotent halting.
:::

---

## 38.14.4 Formal Definition, Sixteen Frozen Theorems, Literature Boundaries, and Beat-by-Beat Audit {#sec-ch38-14-4}

We consolidate the two-tier rational observer language, sixteen frozen kernel theorems, and exact program traces:

::: {.definition #def-ch38-omega-fractran-observer-isa title="Rational Prime-Ledger Automaton and Three-Dimensional Non-Abelian Ω-FRACTRAN Observer ISA (MODEL)"}
Under $\mathrm{AXIOM}\text{-}\Omega$ and $\mathbf{Math}_\Omega$, define the two-tier rational self-referential transition system of an observer (`MODEL`):

1. **One-Dimensional Scalar Projection (Classical FRACTRAN)**: Given $\mathcal{P} = (\frac{a_1}{b_1}, \dots, \frac{a_k}{b_k}) \in \mathbb{Q}_{>0}^k$ in reduced form, the single-beat operator $T_{\mathcal{P}} : \mathbb{Z}_+ \to \mathbb{Z}_+$ maps $N$ to $N \cdot \frac{a_i}{b_i} \in \mathbb{Z}_+$ at the least index $i \in \{1,\dots,k\}$ with $b_i \mid N$, and fixes $T_{\mathcal{P}}(N) = N$ (idempotent halt) when no denominator divides $N$;
2. **Three-Dimensional Non-Abelian Spinor Layer ($\Omega\text{-FRACTRAN}$)**: On the integral quaternion lattice $\Lambda \in \{\mathcal{L}(\mathbb{Z}) = \mathbb{Z}^4,\; \mathcal{H}(\mathbb{Z})\}$, given $\mathcal{Q} = (\mathbf{A}_1\mathbf{B}_1^{-1}, \dots, \mathbf{A}_k\mathbf{B}_k^{-1}) \in (\mathbb{H}(\mathbb{Q})^\times)^k$, the single-beat operator $T_{\mathcal{Q}}^\Omega : \Lambda \setminus \{0\} \to \Lambda \setminus \{0\}$ maps $\mathbf{\Psi}$ to $\mathbf{\Psi}\cdot\mathbf{A}_i\overline{\mathbf{B}_i}/\lVert\mathbf{B}_i\rVert^2 \in \Lambda$ at the least index $i$ achieving lattice closure, fixing $T_{\mathcal{Q}}^\Omega(\mathbf{\Psi}) = \mathbf{\Psi}$ when none closes; its squared norm $N = \lVert\mathbf{\Psi}\rVert^2 \in \mathbb{Z}_+$ satisfies $\lVert T_{\mathcal{Q}}^\Omega(\mathbf{\Psi})\rVert^2 = \lVert\mathbf{\Psi}\rVert^2 \cdot \frac{\lVert\mathbf{A}_i\rVert^2}{\lVert\mathbf{B}_i\rVert^2}$.
:::

::: {.theorem #thm-ch38-omega-fractran-anchors title="Signed Prime-Ledger Isomorphism, Nonnegativity Guard, Free Commutative Prime Monoid, Valuation & Adelic Recovery, No-DFAO Prime Division, Commutative History Loss vs. Non-Commuting Injectivity, and Kleene Fixed Point" lean="D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals,D5/S3/Factorization/Embeddings/PrimeLedgerGroupification.prime_ledger_direction_and_groupification,D5/S3/Factorization/FreeCommMonoid.pnat_free_comm_monoid_on_primes,D5/S3/Factorization/Embeddings/RationalValuationRecovery.rational_recovered_from_sign_and_finite_valuations,D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula,D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence,D5/S3/Axis/PrimeAxisEscape.prime_axis_escape,D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division,D5/S0/Computability/PhysicalDivider/Positive.divMachine_positive_correct,D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.order_descent_criterion,D5/S3/Factorization/Combinatorics/PrimeWordOccupationDescent.no_prime_history_reconstruction,D5/S0/Computability/Coding/TwoWordCode.injective_iff_noncommuting,D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv,D5/S3/Quantum/AURICOmega/QuaternionComparisonModel.quaternionModel_noncommutative,D5/S0/Computability/CodeFixedPoint.code_fixed_point,D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent"}
Across prime-factorization ledgers, automata and computability, quaternion ternary geometry, and observer conditioning algebra, the following sixteen propositions hold:

1. **Signed Prime-Ledger Isomorphism, Nonnegativity Guard, and Free Commutative Monoid on Primes (`signed_prime_ledger_equiv_positive_rationals`, `prime_ledger_direction_and_groupification`, `pnat_free_comm_monoid_on_primes`)**: `primeExponentEquivPositiveRational : (Nat.Primes →₀ Int) ≃+ Additive NNRatˣ` is bijective; every signed prime ledger $z$ splits as `forward - inverse` over `NaturalPrimeLedger`, and lies in the image of `naturalLedgerCast` (`NaturalPrimeLedger`) iff $\forall p,\, 0 \le z(p)$; and $\mathbb{N}_+$ under multiplication is isomorphic to the free commutative monoid on `Nat.Primes`, with $\mathrm{factorization}(mn, p) = \mathrm{factorization}(m, p) + \mathrm{factorization}(n, p)$ for all $m, n \in \mathbb{N}_+$ and $p \in \mathbb{N}$;
2. **Rational Valuation Recovery, Adelic Product Formula, Prime-Log Independence, and Prime-Axis Escape (`rational_recovered_from_sign_and_finite_valuations`, `rational_padic_product_formula`, `prime_log_rational_independence`, `prime_axis_escape`)**: Every nonzero rational is uniquely determined by its sign and finite $p$-adic valuation profile and obeys $\lvert x\rvert\prod_p\lvert x\rvert_p = 1$; on `Nat.Primes`, the family $p \mapsto \ln p$ is $\mathbb{Q}$-linearly independent; and for every finite prime set $S$, $1 + \prod_{p\in S} p$ admits a prime divisor $q \notin S$;
3. **Impossibility of Finite-Automaton Prime Division and Physical Quotient-Remainder Correctness (`no_finite_dfao_for_exact_prime_division`, `divMachine_positive_correct`)**: For every prime $p$ and $a > 0$, on an unbounded prime register initialized at `register.start = 1` supporting `true ↦ n * p` and guarded `false ↦ n / p` (when $p \mid n$, else `none`), exact divisibility $p^a \mid n$ over legal words $\{w : \mathrm{List}\,\mathrm{Bool} \mid (\mathrm{register.eval}\,w).\mathrm{isSome}\}$ cannot be computed by any finite-state DFAO; whereas for any word width $w \in \mathbb{N}$ and $m, d \in \mathbb{N}$ with $m < 2^w$ and $0 < d < 2^w$, the physical divider machine halts at `divDoneCfg` in $\mathrm{divPositiveRunTime}(w) = 2(w+1) + 3 + w(6(w+1)+10) + 1$ steps with $(w+1)$-bit $d$, remainder `m % d`, and $w$-bit quotient `m / d`;
4. **Commutative History Erasure vs. Non-Commuting Injectivity, Noncommutative Unit-Quaternion Isomorphism, Kleene Self-Hosting Fixed Point, and Record-Pinching Idempotence (`order_descent_criterion`, `no_prime_history_reconstruction`, `injective_iff_noncommuting`, `exists_unitQuaternion_equiv`, `quaternionModel_noncommutative`, `code_fixed_point`, `finite_record_pinching_idempotent`)**: `runWord update word` descends to `Multiset Prime` iff all prime updates commute, and no function recovers all `List Nat.Primes` from `Multiset Nat.Primes`; over any alphabet $\alpha$, binary two-word coding on $a, b : \mathrm{List}\,\alpha$ is injective iff $a \mathbin{+\!\!+} b \neq b \mathbin{+\!\!+} a$; every `HasFeatureRank 5`, `ReadingComplete`, noncommutative, chain-connected, zero-touching ternary comparison structure admits for every $o \in M$ a structure-preserving bijection $u : M \simeq \mathrm{unitary}\,\mathbb{H}[\mathbb{R}]$ with $u(o) = 1$ (preserving `quaternionModel`'s `tri(x,y,z) = x y⁻¹ z` and `κ(x,y) = (1 + ⟨x,y⟩)/2`, whose ternary transfer is noncommutative); every computable code transformer $F : \mathrm{Code} \to \mathrm{Code}$ admits $e$ with $\mathrm{eval}(e) = \mathrm{eval}(F(e))$; and on finite index types `[Fintype n] [Fintype κ]`, unread record pinching across complete pairwise-orthogonal self-adjoint idempotents ($P_k^* = P_k = P_k^2$, $k \neq l \implies P_k P_l = 0$, $\sum_k P_k = 1$) is idempotent.
:::

::: proof
Group 1 follows from unique prime factorization between finitely supported integer functions and `NNRatˣ` together with positive/negative part decomposition; Group 2 uses coprime prime-power recovery, archimedean/$p$-adic norm cancellation, prime-power uniqueness, and Euclid's primorial-plus-one construction; Group 3 uses finite-state pigeonhole pumping and Euclidean division invariants; Group 4 combines two-letter commutation witnesses, Fine–Wilf word-length induction, rank-five Gram quaternion embedding, partial-recursive diagonalization, and orthogonal projector idempotence. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch38-conway-fractran-hurwitz-lps-literature title="Literature Boundaries: Conway's FRACTRAN, Minsky Counter Machines, Hurwitz Integral Quaternions, and LPS Ramanujan Graphs"}
**Literature results, not formalized in this book.** Scalar FRACTRAN, the 14-fraction `PRIMEGAME`, and Turing completeness via two-counter simulation are due to J. H. Conway (“FRACTRAN: A Simple Universal Programming Language for Arithmetic,” in *Open Problems in Communication and Computation*, Springer, 1987, pp. 4–26; two-counter universality in M. L. Minsky, *Ann. of Math.* **74**, 437–455, 1961). For positive integers $n \ge 1$, the four-square count $r_4(n) = 8\sum_{4\nmid d\mid n} d$ is due to C. G. J. Jacobi (1829), and left/right Euclidean division and prime factorization up to $24$ units in the maximal Hurwitz order $\mathcal{H}(\mathbb{Z}) = \mathbb{Z}[\mathbf{i},\mathbf{j},\mathbf{k},\frac{1+\mathbf{i}+\mathbf{j}+\mathbf{k}}{2}]$ are due to A. Hurwitz (*Nachr. Ges. Wiss. Göttingen*, 313–340, 1896; while the Lipschitz subring $\mathbb{Z}^4$ is not a PID, odd primes $p \equiv 1 \pmod 4$ single out $p + 1$ primary generators in $\mathbb{Z}^4$ under $a > 0,\, a \equiv 1\pmod 2,\, 2\mid b,c,d$). Reducing those $p + 1$ generators modulo an odd prime $q \neq p$ into $\mathrm{PSL}(2,\mathbb{F}_q)/\mathrm{PGL}(2,\mathbb{F}_q)$ yields the finite $(p + 1)$-regular LPS Cayley graphs $X^{p,q}$, whose optimal Ramanujan spectral bound $\lvert\lambda\rvert \le 2\sqrt{p}$ was proved unconditionally by A. Lubotzky, R. Phillips, and P. Sarnak (*Combinatorica* **8**, 261–277, 1988) via weight-$2$ modular-form Ramanujan–Petersson bounds (M. Eichler, 1954; P. Deligne, *Publ. Math. IHÉS* **43**, 273–307, 1974), without assuming unresolved higher-rank automorphic GRH.
:::

::: {.example #ex-ch38-fractran-multiplier-primegame-and-p5-audit title="Quantitative Audit: 3-Beat Adder, 18-Beat Conway Multiplier, PRIMEGAME Ladder, and 2-Beat p = 5 Rotor Unlocks"}
We audit every integer and rational step across the four programs (`manual derivation` / `NUM`):

1. **Single-Fraction Adder $\mathcal{P}_{\mathrm{add}} = (\frac{3}{2})$**: $N_0 = 2^3 \cdot 3^2 = 72 \to 108 \to 162 \to 243 = 3^{3+2}$, halting after **`3` beats** since $2 \nmid 243$;
2. **Conway's 6-Fraction Multiplier $\mathcal{P}_{\mathrm{mul}} = (\frac{455}{33}, \frac{11}{13}, \frac{1}{11}, \frac{3}{7}, \frac{11}{2}, \frac{1}{3})$**: From $N_0 = 2^2 \cdot 3^2 = 36$, the `18` states and 1-based rule indices are:
   - Beats `0–6`: `36 →[5] 198 →[1] 2730 →[2] 2310 →[1] 31850 →[2] 26950 →[3] 2450`;
   - Beats `6–12`: `2450 →[4] 1050 →[4] 450 →[5] 2475 →[1] 34125 →[2] 28875 →[1] 398125`;
   - Beats `12–18`: `398125 →[2] 336875 →[3] 30625 →[4] 13125 →[4] 5625 →[6] 1875 →[6] 625 = 5⁴` (halting at **beat `18`**!);
3. **Conway's 14-Fraction `PRIMEGAME`**: From $N_0 = 2$ (beat `0`), pure powers $2^p$ appear at **beat `19`** ($2^2 = 4$), **beat `69`** ($2^3 = 8$), **beat `281`** ($2^5 = 32$), **beat `710`** ($2^7 = 128$), and **beat `2,375`** ($2^{11} = 2048$);
4. **Non-Abelian $\Omega\text{-FRACTRAN}$ Discriminator $\mathcal{Q}_{p=5} = (\frac{1-2\mathbf{j}}{5}, \frac{1-2\mathbf{i}}{5})$**:
   - $\mathbf{\Psi}_{XY} = (1, 2, 2, +4)$ ($\lVert\mathbf{\Psi}\rVert^2 = 25$): `Ψ_XY · Q₁ = (1, 2, 0, 0) ∈ ℤ⁴` (`Q₁`) $\to$ `(1, 2, 0, 0) · Q₁ = (1/5, 2/5, -2/5, -4/5) ∉ ℤ⁴` (skip), `(1, 2, 0, 0) · Q₂ = (1, 0, 0, 0) ∈ ℤ⁴` (`Q₂`) $\to$ Halt (**`Q₁ → Q₂`**, `2` beats);
   - $\mathbf{\Psi}_{YX} = (1, 2, 2, -4)$ ($\lVert\mathbf{\Psi}\rVert^2 = 25$): `Ψ_YX · Q₁ = (1, -6/5, 0, -8/5) ∉ ℤ⁴` (fractional tear skipped), `Ψ_YX · Q₂ = (1, 0, 2, 0) ∈ ℤ⁴` (`Q₂`) $\to$ `(1, 0, 2, 0) · Q₁ = (1, 0, 0, 0) ∈ ℤ⁴` (`Q₁`) $\to$ Halt (**`Q₂ → Q₁`**, `2` beats).
:::

---

**An observer needs no floating-point matrices, no infinite limits, and not even external memory addresses or a program counter—built upon orthogonal prime loops and attention-ordered rational rotor fractions, whatever closes without remainder becomes reality and feeds back as next beat's input, while whatever tears into fractions stays silent!**

In the complete 3D laboratory below, step through the `18`-beat **Conway multiplier** halting cleanly at $5^4 = 625$, watch `PRIMEGAME` crystallize primes out of $N_0 = 2$ (for the $q^0 = \mathbf{1}$ zero-slot hardware audit, bounded-winding Vernier resolution, and $\varepsilon_{\mathrm{self}} = 1/M_\Omega$ register cap $K \le K_{\max}$, see [§31.8](ch31-s08-primorial-cascade-vernier-resolution-and-finite-register-cap.md)), and flip **`Ψ_XY ↔ Ψ_YX`** on the fourth card to watch $p = 5$ spherical rotors separate causal order via fractional tears: with the observer's port-free pentad and native zero-error language in hand, the next section ([§38.15 Static Canvas and the Legless Sphere Observer](ch38-s15-static-canvas-and-legless-sphere-observer.md)) performs a pivotal reference-frame inversion—revealing that neither mountains nor time ever move, and that only the legless ternion-sphere observer focus rolls down the immutable holo-canvas.

::: {.viz src="omega-fractran-observer-isa-sandbox" height="620"}
Complete interactive laboratory: switch between the "Observer Native $\Omega\text{-FRACTRAN}$ Rotor Lens" and "Classical Scalar FRACTRAN & Register Machine Contrast (MODEL)" lenses (also mirrored beside the tour bar on narrow and embedded frames), running five progressive cards—the `(3/2)` orthogonal prime-register adder, Conway's 6-fraction multiplier `2²·3² → 5⁴ = 625` (`18` beats), Conway's 14-fraction `PRIMEGAME` with guarded macro-lemma telescopy, the 3D non-Abelian $\Omega\text{-FRACTRAN}$ $p = 5$ LPS rotor word-order discriminator (`Ψ_XY ↔ Ψ_YX`), and the three-paradigm anti-hallucination audit—with single-beat debugging, auto-cadence execution, `XY / YX` order flipping, and two strip plots tracking prime-winding spectra and scalar flag-prime overhead versus `2`-beat rotor unlocking. Sixteen frozen `LEAN ✓` declarations, `ARGUED` Conway–Minsky–Hurwitz–LPS literature, `MODEL` observer-language synthesis, and `NUM` `BigInt` traces are stratified in the evidence panel and theory drawer.
:::
