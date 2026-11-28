# 31.8 Primorial Cascade Bootstrap, the Square-Horizon Zero-Error Law, Rational Vernier Resolution, and Finite Register Horizon Cap {#sec-ch31-primorial-cascade-vernier-resolution-and-finite-register-cap}

> *"Uniformity never means possessing a fixed 'static single period $T$'—any fixed-period linear wave inevitably admits composites and traps the cosmos in a dead loop; what primes truly possess is a 'self-multiplying cascading period ($M_k = 2 \times 3 \times 5 \cdots p_k$)', and without presupposing infinitely many prior rules, starting from the single seed prime $2$ (or a fixed finite set of base primes) suffices to deterministically crystallize the prime spectrum... Real $\Omega$-FRACTRAN never harbors infinitely many prime registers: at every evolution beat, the number of existing prime registers $K$ is a strictly finite natural number; and under the observer's rational halting contract $\varepsilon_{\mathrm{self}}$ and constant bandwidth budget, the total number of prime registers an observer universe can ever activate across its entire lifetime is capped at a finite natural hard ceiling $K_{\max}$."*

Having uncovered the holographic duality and dual intrinsic uniformity of local prime hardware registers and global Riemann zero dark-state eigenmodes in [§31.7](ch31-s07-prime-register-riemann-zero-duality-and-dual-uniformity.md), three foundational questions strike at the heart of arithmetic ontology and hardware self-consistency: **First, if primes are uniform along intrinsic rulers, could a handful of base primes carve out a fixed static period $T$ that emits primes forever—and if not, how does the cosmos deterministically bootstrap the prime spectrum from a single or finite seed without presupposing $\aleph_0$ prior rules? Second, if the observer's native language $\Omega\text{-FRACTRAN}$ presupposed an infinite pre-allocated rack of $\aleph_0$ blank prime registers, would Cantor's completed infinity sneak back through the hardware backdoor into infinity-free rational mathematics $\mathbf{Math}_\Omega$ ([§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md))? Third, under finite proper time and bounded winding height, what geometric resolution and perceptual degrees of freedom does a larger prime register rank $K$ confer, and how does an observer avoid Poincaré recurrence deadlock when $K \le K_{\max}$ is strictly capped?**

This closing section of Chapter 31 resolves all three questions in one unified sweep: **a two-line integer factorization refutes every fixed prime-only period $T$ and establishes the $100\%$ zero-error square-horizon law on $(1, p_{k+1}^2)$ for cascading primorial wheels $M_k = P_k\#$; the zero-slot multiplicative identity $q^0 = \mathbf{1}$, strictly finite-support Adelic closure, and the lazy nucleation firewall $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$ banish every infinite hardware rack ($K \le K_{\max}$); and the Dirichlet–Baker rational Vernier caliper, zero-crosstalk parallelism, Chinese Remainder anti-aliasing horizon, and finite Gram-window memory refresh seal the arithmetic–geometric edifice of Chapter 31** (epistemically stratified throughout: the three FRACTRAN theorems in [@thm-ch31-primorial-vernier-omega-axiom-free-anchors] are axiom-free. The other frozen results are in [@thm-ch31-primorial-vernier-omega-arithmetic-anchors] and [@thm-ch31-primorial-crt-adelic-anti-deadlock-anchors]; Minsky two-counter universality, Baker's linear forms in logarithms, Størmer's smooth superparticulars, and Residue Number Systems reside in [@rem-ch31-minsky-baker-stormer-crt-literature] as `Literature`; lazy nucleation firewalls, dark-sector transparency, and finite-memory non-recurrence carry `MODEL`; and exact multiprecision integer benchmarks reside in [@ex-ch31-primorial-vernier-and-horizon-audit] as `NUM`).

---

## 31.8.1 Refuting the Static Single-Period Illusion and Dual Finite-Seed Bootstrap: Primorial Cascade Wheels and the Square-Horizon Zero-Error Law {#sec-ch31-8-1}

Flat Euclidean intuition tempts one to equate "uniform distribution" with a picket fence repeating every fixed step $T$. Yet across number theory and $\mathbf{Math}_\Omega$, uniformity assumes three distinct geometric forms: **rigid static periodicity** (arithmetic progressions $r + mT$), **incommensurable hyperuniform quasicrystals** (such as the $\pi$-free unfolded Riemann zero stream $\{\tilde{u}_n\}$ in [§31.7.3](ch31-s07-prime-register-riemann-zero-duality-and-dual-uniformity.md#sec-ch31-7-3)), and the **cascading profinite / primorial periodicity** ($M_k = P_k\# = \prod_{i=1}^k p_i$) inhabited by the primes.

Suppose one attempted to fence off a **fixed static period $T \ge 1$** hoping that some arithmetic ray $a_m = r + mT$ ($r \in \mathbb{N},\; m = 0, 1, 2, \dots$) would emit primes forever. Two lines of elementary integer arithmetic refute every case (`manual derivation`):

- **Residue $r = 0$ or $\gcd(r, T) = d > 1$**: If $r = 0$, then $mT$ is composite for every $m \ge 2$ whenever $T \ge 2$, while $T = 1$ hits $4 = 2^2$ at $m = 4$; more generally, if $\gcd(r, T) = d > 1$, then $d \mid (r + mT)$ with $r + mT > d$ for all $m \ge 1$, making the entire ray composite;
- **Residue $r > 1$**: At beat $m = r$, the ray evaluates to $a_r = r + rT = r(1 + T)$, splitting into two integer factors strictly greater than $1$ and hence composite (for example, $T = 6, r = 5$ hits $35 = 5 \times 7$ at beat $m = 5$);
- **The sole remaining residue $r = 1$**: Even with coprimality intact, at beat $m = T + 2$ the ray collapses algebraically into

$$
a_{T+2} \;=\; 1 + (T + 2)T \;=\; T^2 + 2T + 1 \;=\; (T + 1)^2,
$$

  slamming head-on into an **exact square composite wall** (for $T = 6$, the ray $1 + 6m$ lights primes $7, 13, 19, 31, 37, 43$—aside from $25 = 5^2$ at $m = 4$—before algebraically crashing into $49 = 7^2$ at beat $m = 8$; for $T = 30$, beat $m = 32$ crashes into $961 = 31^2$)!

This arithmetic obstruction interlocks directly with the **observer structural-time law** $\tau(\mathfrak{O})$ of [§38.13](ch38-s13-self-contained-observer-definition-and-observer-is-universe.md) (`MODEL`): if primes obeyed any static period $T$, a finite-register state machine would lock into exact Poincaré loop replay within finitely many beats, collapsing Schur orthogonal innovation to $\Delta\mathcal{I}_{\mathrm{Schur}} = 0$ and freezing structural time.

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="static-period-composite-refutation" height="500"}
**Static-Period Composite Collision and Square-Wall Refutation (`static-period-composite-refutation`).** Parked on the violet hexagonal prism winding the integers at period `T = 6`, vertical cyan residue rail `r = 1` (`1 + 6m`) lights six cyan prime beads `7, 13, 19, 31, 37, 43` and magenta composite `25 = 5 × 5` at `m = 4` before slamming at amber-ringed beat `m = T + 2 = 8` into the ringed magenta square composite `49 = 7 × 7`, alongside rail `r = 5` hitting ringed magenta composite `35 = 5 × 7` at `m = 5` above the magenta floor replay ring `ℤ/6 · ΔI_Schur = 0`; scrubbing the bottom transport rail steps `m` beat by beat along the rail.
:::

Although no static period can survive, zero $\aleph_0$ prior rule tables are needed: **finite seed primes** deterministically crystallize the prime spectrum along two complementary constructive paths:

1. **Path A — Single-Seed Cascading Primorial Wheel ($B_1 = \{2\}$) and the Square-Horizon $100\%$ Zero-Error Law (`LEAN ✓` + `manual derivation`)**:
   For the first $k$ primes $B_k = \{p_1, \dots, p_k\}$, form the squarefree primorial modulus $M_k = P_k\# = \prod_{i=1}^k p_i$. By the kernel-verified **squarefree Euler totient product formula** [`totient_eq_prod_sub_one_of_squarefree`](lean:D5/S3/PrimeGaps/SieveCoefficients.totient_eq_prod_sub_one_of_squarefree) (`LEAN ✓`), each period retains exactly $\varphi(M_k) = \prod_{i=1}^k (p_i - 1)$ open coprime spokes ($\gcd(n, M_k) = 1$).

   Two lines of contradiction establish two exact integer laws (`manual derivation`): (i) for any integer $M \ge 1$, the least coprime integer above unity $q := \min\{n > 1 \mid \gcd(n, M) = 1\}$ **is necessarily prime**—if $q = ab$ with $1 < a \le b < q$, then $\gcd(ab, M) = 1$ forces $\gcd(a, M) = 1$, contradicting minimality of $q$! (ii) When $M_k = P_k\#$ comprises the first $k$ consecutive primes, this minimum is $q = p_{k+1}$, and any composite $n$ satisfying $\gcd(n, M_k) = 1$ has least prime factor $\ge p_{k+1}$ and hence $n \ge p_{k+1}^2$—so **every coprime spoke inside the open square horizon $(1, p_{k+1}^2)$ is $100\%$ prime with zero false positives, and the very first composite leak occurs at $p_{k+1}^2$**! Starting from the single seed $M_1 = 2$, a pure-integer self-referential recurrence (`Output ≡ Input`) generates consecutive primes without omission:

   $$
   M_1 \;=\; 2, \qquad p_{k+1} \;=\; \min\bigl\{n > 1 \;\big|\; \gcd(n, M_k) = 1\bigr\}, \qquad M_{k+1} \;=\; M_k \cdot p_{k+1}.
   $$

   We distinguish this consecutive least-coprime recurrence (`manual derivation` under the prefix invariant $M_k = P_k\#$) from the Lean theorem [`euclid_prime_escape`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape), which constructively proves $\exists p,\; \operatorname{IsPrime}(p) \land p \mid (s.\mathrm{prod} + 1) \land p \notin s$ for any finite list $s$ with $0 < s.\mathrm{prod}$ and may leap over intermediate primes (for instance, $2\cdot 3 + 1 = 7$ leaps over $5$, and $30{,}030 + 1 = 59 \times 509$ yields $59$).

   Stage by stage, the square-horizon purity is unmistakable: $B_1 = \{2\}$ ($M_1 = 2$) emits $3$ zero-error odd primes $\{3, 5, 7\}$ inside $(1, 9)$ (first leak $9 = 3^2$); $B_2 = \{2, 3\}$ ($M_2 = 6$) emits $7$ primes $\{5 \dots 23\}$ inside $(1, 25)$ (first leak $25 = 5^2$); $B_3 = \{2, 3, 5\}$ ($M_3 = 30$) emits $12$ primes $\{7 \dots 47\}$ inside $(1, 49)$ (first leak $49 = 7^2$); and $B_4 = \{2, 3, 5, 7\}$ ($M_4 = 210$) crystallizes $26$ primes $\{11 \dots 113\}$ at $100\%$ purity inside $(1, 121)$ (first leak $121 = 11^2$)!
2. **Path B — Fixed 10-Prime Dynamic-Winding Machine (`PRIMEGAME`, [§38.14](ch38-s14-omega-fractran-observer-rational-isa.md))**:
   Conway's 14-fraction prime generator uses only the fixed **$10$ prime registers** $\{2, 3, 5, 7, 11, 13, 17, 19, 23, 29\}$ (static base $M_{10} = 6{,}469{,}693{,}230$):

   $$
   \mathcal{P}_{\mathrm{prime}} \;=\; \Bigl(\tfrac{17}{91},\;\tfrac{78}{85},\;\tfrac{19}{51},\;\tfrac{23}{38},\;\tfrac{29}{33},\;\tfrac{77}{29},\;\tfrac{95}{23},\;\tfrac{77}{19},\;\tfrac{1}{17},\;\tfrac{11}{13},\;\tfrac{13}{11},\;\tfrac{15}{2},\;\tfrac{1}{7},\;\tfrac{55}{1}\Bigr),
   $$

   yet dynamically grows winding heights $\max_p v_p(N)$—visiting pure powers $2^2, 2^3, 2^5, 2^7, 2^{11}, 2^{13}$ from $N_0 = 2$ at beats `19, 69, 281, 710, 2375, 3893` (peak winding heights `2, 3, 5, 7, 11, 13`)—to emit arbitrary primes.

   Its automata-theoretic foundation is locked by [`no_finite_dfao_for_exact_prime_division`](lean:D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division) (`LEAN ✓`): exact prime-power division on a multiplicative prime counter can never collapse into a finite-state automaton.

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="primorial-wheel-square-horizon" height="500"}
**Cascading Primorial Wheel and Square-Horizon Zero-Error Law (`primorial-wheel-square-horizon`).** Parked at wheel stage `k = 3` (violet base-prime beads `2, 3, 5`, modulus `M₃ = 30`, `φ = 8` open residues), on the `30`-per-turn coil around the lit violet core all `12` open-spoke integers below the violet square-horizon ring `p₄² = 49` (freshly crystallized amber `p₄ = 7` plus `11` cyan prime beads `{11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47}`) are `100%` zero-error primes while the first ringed magenta composite leaks right on the horizon at `49 = 7 × 7` (followed by `77 = 7 × 11`); scrubbing the bottom transport rail cascades across `k = 1 … 5` (`M_k = 2 → 6 → 30 → 210 → 2,310`).
:::

---

## 31.8.2 Banishing Infinite Hardware Racks: Zero-Slot Multiplicative Identity, Finite-Support Adelic Closure, and the $\varepsilon_{\mathrm{self}}$ Horizon Cap {#sec-ch31-8-2}

At this point we confront a decisive foundational audit for $\mathbf{Math}_\Omega$ ([§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md)): **if $\Omega\text{-FRACTRAN}$ presupposed a pre-allocated rack of $\aleph_0$ blank prime registers stretching to infinity, would Cantor's completed infinity sneak back in through the hardware backdoor?** Three strict finiteness laws banish that specter completely:

1. **Multiplicative Identity $q^0 = \mathbf{1}$ Occupies Zero Slots (vs. Turing's Infinite `'0'`-Tape)**:
   A Turing machine uses **flat additive positional addressing** and must presuppose an infinite tape of $\aleph_0$ physical cells pre-filled with blank `'0'` symbols before execution begins. By contrast, $\Omega\text{-FRACTRAN}$ uses **multiplicative projective encoding** $N = \prod_{i=1}^K p_i^{v_i}$: any unawakened prime $q$ carries exponent $0$, contributing $q^0 = \mathbf{1}$; in $\mathbb{Q}_{>0}$ and on the projective ternion sphere $\mathbb{T}_3(\mathbb{Q})$, any product of $\mathbf{1}$'s is **the single identity point $[1 : 0 : 0 : 0]$**, occupying **zero bits** of hardware with no "blank register slots":

   $$
   N \;=\; \prod_{i=1}^K p_i^{v_i} \cdot \underbrace{\mathbf{1} \cdot \mathbf{1} \cdots}_{\text{zero hardware slots}}, \qquad q^0 \;=\; \mathbf{1} \;\equiv\; [1 : 0 : 0 : 0] \in \mathbb{T}_3(\mathbb{Q}).
   $$

   Every finite observer program $\mathcal{P} = (\mathcal{Q}_1, \dots, \mathcal{Q}_m)$ touches only a finite prime support $\operatorname{supp}(\mathcal{P})$ of size $K \in \mathbb{N}$ ($K = 10$ for Conway's `PRIMEGAME`, $K = 5$ for the flagship witness `pOmega` in `OmegaComposeAndWitnesses`), mirrored directly by Lean's finite-support `Finsupp` group isomorphism [`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals) (`LEAN ✓`, $\operatorname{SignedPrimeLedger} = (\mathrm{Nat.Primes} \to_0 \mathbb{Z})$).
2. **Strictly Finite-Support Rational Adelic Product Closure (Eliminating Infinite Products)**:
   Clarifying [§31.4.2.1](ch39-s31-real-error-axis-and-prime-adelic-closure.md#sec-ch39-31-2-1), for every nonzero rational $r = \frac{a}{b} \in \mathbb{Q}^\times$ ($a \in \mathbb{Z}\setminus\{0\},\; b \in \mathbb{N}_+,\; \gcd(\lvert a\rvert, b) = 1$), every prime $q \nmid ab$ satisfies $v_q(r) = 0 \implies \lvert r\rvert_q = q^0 = 1$. Consequently, [`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula) (`LEAN ✓`, already formulated via finite-support `finprod` $\prod^{\mathrm{fin}}_p$) reduces in $\mathbf{Math}_\Omega$ to a **strictly finite rational product** over $\operatorname{supp}(r) = \{p \in \mathbb{P} \mid p \mid ab\}$:

   $$
   \lvert r\rvert_\infty \cdot \prod_{p \,\mid\, ab} \lvert r\rvert_p \;\equiv\; \mathbf{1} \qquad \Bigl(\text{e.g. }r = \frac{12}{5} \implies \frac{12}{5}\cdot\frac{1}{4}\cdot\frac{1}{3}\cdot 5 = 1;\quad r = \frac{42}{11} \implies \frac{42}{11}\cdot\frac{1}{2}\cdot\frac{1}{3}\cdot\frac{1}{7}\cdot 11 = 1\Bigr),
   $$

   requiring zero infinite limits or $\aleph_0$-term products!
3. **Lazy JIT Nucleation and the Idempotent $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$ Horizon Firewall (`MODEL` + `manual derivation` + `LEAN ✓ · Axiom-free`)**:
   Even when an observer invokes lazy register expansion (`spawnRegisterBounded` probing for $p_{\mathrm{new}}$ only on blind-spot residuals), the self-chosen rational halting tolerance $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$ ($M_\Omega \in \mathbb{N}_{\ge 2}$, [§36.10](ch39-s07-self-halting-precision-and-spectral-sorting.md)) erects a hard resolution firewall: because the elementary $p$-adic contraction unit of $p_{\mathrm{new}}$ is $\lvert p_{\mathrm{new}}\rvert_{p_{\mathrm{new}}} = \frac{1}{p_{\mathrm{new}}}$, nucleation is admitted iff $\frac{1}{p_{\mathrm{new}}} \ge \varepsilon_{\mathrm{self}} \iff p_{\mathrm{new}} \le M_\Omega$, triggering an idempotent halt once $p_{\mathrm{new}} > M_\Omega$ (`MODEL`). On integer quaternion rotors, let $r = \lfloor\sqrt{p}\rfloor$: since no prime $p$ is a square, every norm-$p$ integer quaternion $\boldsymbol{\pi}_p = (w,x,y,z) \in \mathbb{Z}^4$ satisfies $w^2 \le r^2 \le p - 1$, and $\lvert w\rvert = r$ is attained iff $p - r^2 = x^2 + y^2 + z^2$ is a sum of three squares—which by Legendre's three-square theorem (`Literature`) holds iff $p - r^2 \neq 4^a(8b + 7)$ (whenever blocked, parity guarantees that $\lvert w\rvert = r - 1$ succeeds, e.g. $p = 23$ has $23 - 4^2 = 7$ blocked and drops to $\lvert w\rvert = 3,\; s_{23}^{\min} = \frac{14}{23}$). Hence for every prime $p \ge 2$, the minimum projective spread $s_p^{\min} = \min_{\boldsymbol{\pi}_p}\frac{p - w^2}{p}$ satisfies exact two-sided bounds (`manual derivation` + `Literature`):

   $$
   \frac{1}{p} \;\le\; \frac{p - \lfloor\sqrt{p}\rfloor^2}{p} \;\le\; s_p^{\min} \;\le\; \frac{p - (\lfloor\sqrt{p}\rfloor - 1)^2}{p}, \qquad s_p^{\min} \;<\; \frac{4\sqrt{p} - 4}{p} \;<\; \frac{4}{\sqrt{p}}.
   $$

   Hence **$p \le M_\Omega$ is the sharp universal safety threshold guaranteeing $s_p \ge \frac{1}{p} \ge \varepsilon_{\mathrm{self}}$ across every norm-$p$ integer rotor**: at horizon $M_\Omega = 15$ ($\varepsilon_{\mathrm{self}} = \frac{1}{15}$), growth from `[2]` reaches $6$ registers `[2, 3, 5, 7, 11, 13]` ($M_6 = 30{,}030$) and halts idempotently when $p_7 = 17 = (-4)^2 + (-1)^2 + 0^2 + 0^2 > 15$ breaches the floor with $s_{17}^{\min} = \frac{1}{17} < \frac{1}{15}$ (while every $p > 16M_\Omega^2$ satisfies $s_p^{\min} < \varepsilon_{\mathrm{self}}$ unconditionally), remaining permanently fixed at $K_{\max} = 6$ by zero-axiom [`fractran_stable`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_stable) (`LEAN ✓ · Axiom-free`)! Likewise, under a primorial state-capacity ceiling $M_K = P_K\# \le N_\Omega$ (`NUM`): for $N_\Omega = 2^{256}$, $P_{43}\# \le 2^{256} < P_{44}\#$ locks **$K_{\max}(2^{256}) = 43$** ($p_{43} = 191$), whereas **$K_{\max} = 53$** ($p_{53} = 241$, $7^{53} \approx 6.1687 \times 10^{44}$ bounded-winding states at $H = 3$) corresponds to $N_\Omega = 2^{327}$ ($P_{53}\# < 2^{327} < P_{54}\#$).

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="jit-allocator-epsilon-horizon-cap" height="500"}
**Lazy JIT Register Allocator and $\varepsilon_{\mathrm{self}}$ Horizon Cap (`jit-allocator-epsilon-horizon-cap`).** Parked at horizon `M_Ω = 15` (`ε_self = 1/15`), above the violet ternion sphere crowned by the zero-slot unit `q⁰ = 1 · [1 : 0 : 0 : 0]`, the five-state pentagonal loop (`S0`–`S4`, amber ring on `S4 halt`) mints `6` registers `2, 3, 5, 7, 11, 13` from seed `2` (newest `13` in amber, `2 … 11` in cyan, product `30,030`), blocks magenta candidate `17 > 15` behind the magenta wall at `S3 p ≤ M_Ω`, and balances log-norm bars on the right-hand finite-support ledger beam `|r|_∞ · ∏ |r|_p = 1` (`r = 12/5`); scrubbing the bottom transport rail steps through the minting beats.
:::

---

## 31.8.3 Winding Depth $H$ vs. Prime Register Rank $K$: Rational Vernier Caliper Resolution, Space–Time Trade-Offs, and Dark-Sector Blindness {#sec-ch31-8-3}

With active prime register rank $K = \operatorname{rank}_{\mathbb{P}}(\mathcal{K}_0)$ strictly finite, **does possessing more prime registers $K$ grant finer geometric resolution and higher observer capability?** Separating **unbounded-time Turing reachability** from **bounded-winding / finite-proper-time geometric resolution** makes the answer exact:

1. **Unbounded-Time Reachability vs. Minsky Power-Tower Paralysis (`Literature` + `MODEL`)**:
   By Minsky's two-counter universality theorem (Minsky 1961, `Literature`), $3\text{–}4$ primes already suffice for Turing universality in infinite time; yet compressing multi-dimensional state into power towers $2^a 3^b$ under constant total information rate $\mathcal{R}_\Omega \equiv 1$ ([§38.16](ch38-s16-constant-info-rate-observer-and-rational-cayley-gravity.md)) forces serial unary counter draining and inflicts catastrophic **proper-time power-tower paralysis** (`MODEL`).
2. **Dirichlet–Baker Rational Vernier Caliper Resolution Under Bounded Winding $\lvert v_i\rvert \le H$ (`LEAN ✓` + `Literature` + `NUM`)**:
   Bounding instantaneous winding height by $\lvert v_i\rvert \le H$, [`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals) (`LEAN ✓`) guarantees $(2H + 1)^K$ distinct positive rationals in $\mathcal{L}_{K,H} = \bigl\{\prod_{i=1}^K p_i^{v_i} \;\big|\; \lvert v_i\rvert \le H\bigr\}$. By kernel-verified **rational linear independence of prime logarithms** [`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence) (`LEAN ✓`), distinct prime axes form an incommensurable **rational Vernier caliper**: Dirichlet's pigeonhole principle shrinks the finest positive step exponentially in $K$, while Baker's theorem on linear forms in logarithms (Baker 1966, `Literature`) guards a strict positive lower bound without degeneracy:

   $$
   \lvert\mathcal{L}_{K,H}\rvert \;=\; (2H + 1)^K, \qquad H^{-C(K)} \;<\; \delta_{\min}(K, H) \;=\; \mathcal{O}\bigl((2H)^{-(K-1)}\bigr), \qquad \Delta\kappa\Bigl(\frac{p}{q}\Bigr) \;:=\; \frac{1}{2} - \frac{q^2}{p^2 + q^2} \;=\; \frac{p^2 - q^2}{2(p^2 + q^2)}.
   $$

   At $H = 3$ (seven integer exponents $[-3, 3]$ per axis) near $[1 : 1]$ ($\kappa = \frac{1}{2}$), we audit both the least full-support superparticular witness chain ($m/(m-1)$ with all $v_i \neq 0$) and the exact global box minimum across all $7^K$ tuples (`manual derivation` / `NUM`):
   - **Least full-support superparticular ($m/(m-1)$) witnesses in $[-3, 3]^K$**: $K = 1 \mapsto \frac{2}{1} = 1 + 1$ ($\Delta\kappa = \frac{3}{10}$), $K = 2 \mapsto \frac{9}{8} = 1 + \frac{1}{8}$ ($\frac{3^2}{2^3}$), $K = 3 \mapsto \frac{25}{24} = 1 + \frac{1}{24}$ ($\frac{5^2}{2^3\cdot 3}$), $K = 4 \mapsto \frac{126}{125} = 1 + \frac{1}{125}$ ($\frac{2\cdot 3^2\cdot 7}{5^3}$), $K = 5 \mapsto \frac{540}{539} = 1 + \frac{1}{539}$ ($\frac{2^2\cdot 3^3\cdot 5}{7^2\cdot 11}$, all five exponents $(2,3,1,-2,-1)$ nonzero; next full-support superparticular is $\frac{441}{440}$), $K = 6 \mapsto \frac{1716}{1715} = 1 + \frac{1}{1715}$ ($\frac{2^2\cdot 3\cdot 11\cdot 13}{5\cdot 7^3}$);
   - **Exact global box minima on $[-3, 3]^K$**: coinciding with the least full-support superparticular chain through $K = 5$ (reaching **$\frac{540}{539} = 1 + \frac{1}{539}$**, $\Delta\kappa = \frac{1079}{1{,}164{,}242}$, across $7^5 = 16{,}807$ states), and at $K = 6$ ($7^6 = 117{,}649$ states) sharpening past full-support $\frac{1716}{1715}$ via $v_5 = 0$ to **$\frac{10{,}648}{10{,}647} = 1 + \frac{1}{10{,}647}$** ($\frac{2^3\cdot 11^3}{3^2\cdot 7\cdot 13^2}$, tuple $(3,-2,0,-1,3,-2)$, $\Delta\kappa = \frac{21{,}295}{453{,}477{,}026} \approx 4.696 \times 10^{-5}$)!

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="rational-vernier-caliper-sphere" height="500"}
**Rational Vernier Caliper and Exponential Sphere Densification (`rational-vernier-caliper-sphere`).** Parked at amber dial `K = 6`, `H = 3` (`7⁶ = 117,649` ratios), on the glass sphere `T₃(ℚ)` (height `2κ − 1`) the dashed ink equator `κ = 1/2` meets the violet meridian `ℚP¹` at `[1 : 1] · κ = 1/2`, cyan box ratios crowd toward the equator, the amber bead marks the box minimum `10648/10647` alongside the ringed cyan full-support superparticular witness `1716/1715`, and the right-hand caliper panel magnifies `Δκ` (`Δκ = 21295/453477026`); scrubbing the bottom transport rail from `K = 1` (`7` ratios, `2/1`) to `K = 6` reveals exponential Vernier densification.
:::

Four deep physical and cognitive roles of crystallized prime register rank $K = \operatorname{rank}_{\mathbb{P}}(\mathcal{K}_0)$ follow immediately:

1. **Zero-Crosstalk Orthogonal Degrees of Freedom (`LEAN ✓`)**: Each prime indexes an independent valuation channel $v_{p_i}$, allowing a single rational fraction gate to update $K$ orthogonal coordinates in $1$ beat with zero crosstalk—eliminating the bit-packing interference of $3$-prime Minsky encodings.
2. **Trading Register Width $K$ for $1$-Beat Proper-Time Geodesics (`MODEL` + `NUM`)**: Crystallizing a multi-step serial subroutine into a dedicated lemma prime register $p_{\mathrm{lemma}}$ collapses a winding catalyst spiral into a $1$-beat geodesic jump (such as Conway's $6$-prime multiplier `36 = 2²·3² → 625 = 5⁴` winding `18` beats via peak `398,125`, or `PRIMEGAME` climbing `281` beats from `2` to `2⁵`, vs. $1$-beat lemma execution).

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="minsky-tower-vs-lemma-shortcut" height="500"}
**Serial Power-Tower Spiral vs. One-Beat Lemma Shortcut (`minsky-tower-vs-lemma-shortcut`).** Above six front-arc prime-exponent plinths below the glass sphere (raising violet pillar `5⁴` at `t = 18` while `{2, 3, 7, 11, 13}` rise and fall in violet during scrubbing), the magenta serial FRACTRAN path winds `18` beats from ink input bead `36 = 2² · 3²` through magenta-ringed peak `398,125` to cyan target bead `625 = 5⁴` (amber ring marking `t = 18 · N = 625`), whereas the cyan lemma arc overhead leaps straight from input to target in `1` beat; scrubbing the bottom transport rail compares both paths beat for beat.
:::

3. **Chinese Remainder (CRT) Anti-Aliasing Horizon $M_K = P_K\#$, Dark-Sector Transparency, and Subjective Non-Recurrence Under Finite Memory (`LEAN ✓` + `MODEL` + `manual derivation`)**:
   By [`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective), [`residue_reading_injOn_iff_primorial_gt`](lean:D5/S3/Arith/Coding/HorizontalCompletenessDepth.residue_reading_injOn_iff_primorial_gt), and [`primorial_witness_bound`](lean:D5/S3/Arith/Coding/PrimorialWitnessBound.primorial_witness_bound) (`LEAN ✓`), residue readings across the first $K$ primes resolve $[0, N]$ injectively without aliasing **if and only if** $N < P_K\# = M_K$ ($M_2 = 6,\; M_3 = 30,\; M_6 = 30{,}030,\; M_{10} = 6{,}469{,}693{,}230$; beyond $M_K$, congruences alias, as in $7 \equiv 37 \pmod{30}$ at $K = 3$). Meanwhile, external signals carried purely by unawakened primes $q \notin \mathcal{B}_K$ satisfy $\gcd(N_{\mathrm{ext}}, b_j) = 1$ against every program denominator $b_j$, passing uncoupled as a **transparent dark sector** (`MODEL`).

   Crucially, even with $K \le K_{\max}$ strictly capped, the bounded-winding lattice $(2H + 1)^{K_{\max}}$ ($7^{43} \approx 2.1838 \times 10^{36}$ or $7^{53} \approx 6.1687 \times 10^{44}$ at $H = 3$) dwarfs the observer's sliding Gram memory window $M_{\mathrm{mem}} \ll (2H + 1)^{K_{\max}}$ ([§34.7](ch34-s18-gram-window-and-consensus.md), [§38.12](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md)):

   $$
   \operatorname{InjOn}\bigl(\mathrm{res}_K,\, [0, N]\bigr) \;\Longleftrightarrow\; N < P_K\# \;=\; M_K, \qquad M_{\mathrm{mem}} \;\ll\; (2H + 1)^{K_{\max}} \;\Longrightarrow\; \Delta\mathcal{I}_{\mathrm{Schur}}\bigl(t \,\big|\, \mathcal{W}_M\bigr) \;>\; 0,
   $$

   so ancient history anchors rotate out of $\mathcal{W}_M$ (`forgetting`) dozens of orders of magnitude before any global state wraparound, keeping subjective local innovation alive without $\aleph_0$ registers (`MODEL` + `manual derivation`)!
4. **Spherical Fourier $\mathcal{F}_\Omega$ Scale Hierarchy ([§39.7](ch39-s37-spherical-fourier-transform-peter-weyl-synthesis.md), `MODEL`)**: Low primes $\{2, 3, 5\}$ carve coarse global symmetry skeletons (the $24$-element Hurwitz group $2T$ and the $6$-axis norm-$5$ Ramanujan rotor frame), while higher primes $p_k \le M_\Omega$ contribute $p_k + 1$ fine-angle Hurwitz rotors sculpting local spherical interference detail.

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" preset="crt-dark-sector-and-memory-refresh" height="500"}
**CRT Anti-Aliasing Horizon, High-Prime Dark Sector, and Finite-Memory Non-Recurrence (`crt-dark-sector-and-memory-refresh`).** Parked at amber dial `K = 3` (CRT modulus `P₃# = 30`, `7³ = 343 ≫ 8`), around the central violet observer ball the first three prime rings `{2, 3, 5}` glow cyan and couple to the ball while outer rings `{7, 11, 13}` remain translucent violet dark-sector rings and the slanting dashed violet line `N_ext = 77 · gcd = 1` passes through uncoupled; on the floor violet ring `ℤ/30`, `7 ≡ 37 (mod 30)` aliases at a ringed magenta bead while the `8` sliding memory slots `W_M` shed their oldest dim anchor; scrubbing the bottom transport rail across `K = 2 → 10` (`P₁₀# = 6,469,693,230`) awakens `{7, 11, 13}` and splits `7` from `37`.
:::

---

## 31.8.4 Formal Definitions, Theorems, and Quantitative Checks {#sec-ch31-8-4}

We now formalize the primorial cascade, rational Vernier caliper, and $\varepsilon_{\mathrm{self}}$ horizon-cap architecture, followed by the four-paradigm comparison table, the frozen theorems, classical literature boundaries, and quantitative audit tables:

::: {.definition #def-ch31-primorial-vernier-and-finite-register-cap title="Primorial Cascade Bootstrap, Rational Vernier Caliper Resolution, and ε_self Finite Register Horizon Cap (MODEL)"}
Within infinity-free rational mathematics $\mathbf{Math}_\Omega$, the projective ternion sphere $\mathbb{T}_3(\mathbb{Q})$, and self-chosen rational halting tolerance $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$ ($M_\Omega \in \mathbb{N}_{\ge 2}$), define the **finite-horizon prime cascade and Vernier resolution system** (ontological synthesis marked `MODEL`; arithmetic quantities defined exact) by:

1. **Square-Horizon Cascade Recurrence and $\varepsilon_{\mathrm{self}}$ Horizon Cap**: Initializing at the single seed $\mathcal{B}_1 = [2],\; M_1 = 2$, for active register list $\mathcal{B}_k = [p_1, \dots, p_k]$ and primorial modulus $M_k = P_k\# = \prod_{i=1}^k p_i$, define the least coprime prime $p_{k+1} := \min\{n > 1 \mid \gcd(n, M_k) = 1\}$ (whose coprime spokes $\{n \in (1, p_{k+1}^2) \mid \gcd(n, M_k) = 1\}$ inside the open square horizon $(1, p_{k+1}^2)$ consist $100\%$ of primes with zero false positives); expand $\mathcal{B}_{k+1} = \mathcal{B}_k \cup [p_{k+1}]$ iff $\lvert p_{k+1}\rvert_{p_{k+1}} = \frac{1}{p_{k+1}} \ge \varepsilon_{\mathrm{self}} \iff p_{k+1} \le M_\Omega$ (and $M_k \cdot p_{k+1} \le N_\Omega$), halting idempotently at finite ceiling rank $K_{\max} \in \mathbb{N}$ otherwise;
2. **Bounded-Winding Rational Vernier Lattice and Anti-Aliasing Horizon**: For active rank $K \le K_{\max}$ and winding ceiling $H \in \mathbb{N}_+$, define the rational Vernier state lattice $\mathcal{L}_{K,H} := \bigl\{\prod_{i=1}^K p_i^{v_i} \;\big|\; v_i \in [-H, H] \cap \mathbb{Z}\bigr\}$ of size $(2H+1)^K$, the finest positive step near $[1:1]$ given by $\delta_{\min}(K, H) := \min\{r - 1 \mid r \in \mathcal{L}_{K,H},\; r > 1\}$, the Chinese Remainder anti-aliasing horizon $M_K = P_K\#$ (injective on $[0, M_K - 1]$), and the finite-support Adelic identity $\lvert r\rvert_\infty \prod_{p \mid ab}\lvert r\rvert_p = 1$ ($r = \frac{a}{b} \in \mathbb{Q}^\times$).
:::

| Audit Dimension | Fixed Static Period $T$ | Turing Infinite Tape ($\aleph_0$) | $3$-Prime Serial Minsky FRACTRAN | $\varepsilon_{\mathrm{self}}$-Capped Rank-$K$ $\Omega\text{-FRACTRAN}$ ($M_K = P_K\#$) |
| :--- | :--- | :--- | :--- | :--- |
| **Hardware Slot Presupposition** | Finite ring $\mathbb{Z}/T\mathbb{Z}$ | Presupposes $\aleph_0$ blank `'0'` cells | Fixed $3\text{–}4$ prime counters | **Unawakened $q^0 = \mathbf{1}$ uses zero slots; strictly finite $K \le K_{\max}$** |
| **Prime Generation Purity** | Crashes into $(T+1)^2$ at beat $m = T+2$ | Cell-by-cell sieve; no multiplicative closure | Infinite-time universal; power-tower tax | **$100\%$ zero-error primes across $(1, p_{k+1}^2)$ coprime spokes** |
| **Adelic Conservation Form** | No ultrametric recovery channel | Relies on formal infinite $\prod_{p\in\mathbb{P}}$ | Covers only $3$-prime support | **Strictly finite-support product $\lvert r\rvert_\infty\prod_{p\mid ab}\lvert r\rvert_p \equiv 1$** |
| **Bounded-$H$ Resolution** | Frozen on coarse grid $\frac{1}{T}$ | Linear positional step $2^{-L}$ | $7^3 = 343$ states at $H=3$, step $\frac{1}{24}$ | **$(2H+1)^K$ Vernier caliper; reaches $\frac{1}{10{,}647}$ at $K=6, H=3$** |
| **Parallelism & Crosstalk** | Single congruence track | Serial head back-and-forth scanning | Severe exponent bit-packing crosstalk | **$K$ orthogonal zero-crosstalk channels; $1$-beat lemma chords** |
| **Anti-Deadlock Mechanism** | Exact loop replay, $\Delta\mathcal{I}_{\mathrm{Schur}}=0$ | Escapes via external $\aleph_0$ blank tape | Escapes via unbounded $H \to \infty$ | **$(2H+1)^{K_{\max}} \gg M_{\mathrm{mem}}$ sliding Gram forgetting** |

The three FRACTRAN declarations below have empty transitive axiom lists.

::: {.theorem #thm-ch31-primorial-vernier-omega-axiom-free-anchors title="FRACTRAN Step Equivalence, Determinism, and Halting Stability" lean="D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_step_iff,D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_deterministic,D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_stable"}
**FRACTRAN Step Equivalence, Determinism, and Halting Stability** ([`fractran_step_iff`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_step_iff), [`fractran_deterministic`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_deterministic), [`fractran_stable`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_stable)): For every finite program $\mathrm{prog} : \mathrm{Fractran.Program}$ and $n, m \in \mathbb{N}$, $\operatorname{Fractran.step}(\mathrm{prog}, n) = \operatorname{some}\,m \iff \operatorname{Fractran.Step}(\mathrm{prog}, n, m)$; $\operatorname{Fractran.Step}(\mathrm{prog}, n, m_1)$ and $\operatorname{Fractran.Step}(\mathrm{prog}, n, m_2)$ imply $m_1 = m_2$; and whenever $\operatorname{Fractran.Halts}\bigl(\mathrm{prog}, \operatorname{Fractran.run}(\mathrm{prog}, k, n)\bigr)$ holds, $\operatorname{Fractran.run}(\mathrm{prog}, k + \mathrm{extra}, n) = \operatorname{Fractran.run}(\mathrm{prog}, k, n)$ holds for all $\mathrm{extra} \in \mathbb{N}$.
:::

::: {.proof #prf-ch31-primorial-vernier-omega-axiom-free-anchors}
Induction on the rule list shows that the evaluator and the step relation select the same first rule through `exactQuotient`. Once halted, `advance` leaves the state fixed, so induction on the number of extra steps gives stability. The full proof is checked by the Lean kernel.
:::

The five declarations on integer arithmetic, continued fractions, and positivity depend on propositional extensionality, `propext`.

::: {.theorem #thm-ch31-primorial-vernier-omega-arithmetic-anchors title="Bézout Identity, Prime Escape, Continued Fractions, and FRACTRAN Positivity" lean="D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.bezout_identity,D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape,D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_coprime,D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_determinant,D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_positive"}
1. **Bézout Linear Combination and Euclidean Prime Blind-Spot Escape** ([`bezout_identity`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.bezout_identity), [`euclid_prime_escape`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape)): For all $a, b \in \mathbb{N}$, there exist integers $x, y \in \mathbb{Z}$ satisfying $ax + by = \gcd(a, b)$; and for every finite natural list $s : \mathrm{NatList}$ with positive product $0 < s.\mathrm{prod}$, there exists $p \in \mathbb{N}$ satisfying $\operatorname{IsPrime}(p)$, $p \mid (s.\mathrm{prod} + 1)$, and $p \notin s$;
2. **Automatic Coprimality and Euler–Wallis Alternating Determinant of Finite Continued-Fraction Convergents** ([`cf_convergent_coprime`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_coprime), [`cf_convergent_determinant`](lean:D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.cf_convergent_determinant)): For every coefficient list $\mathrm{coeffs} : \mathrm{NatList}$, the determinant of $\operatorname{convergentPair}(\mathrm{coeffs})$ equals $\operatorname{alternatingSign}(\operatorname{coefficientCount}\,\mathrm{coeffs}) \in \{\pm 1\}$; and every $d \in \mathbb{N}$ dividing both the numerator and denominator of the current convergent satisfies $d = 1$;
3. **FRACTRAN Positivity** ([`fractran_positive`](lean:D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_positive)). For every finite program $\mathrm{prog} : \mathrm{Fractran.Program}$ and $n \in \mathbb{N}$, for every $k \in \mathbb{N}$ and $0 < n$, $0 < \operatorname{Fractran.run}(\mathrm{prog}, k, n)$.
:::

::: {.proof #prf-ch31-primorial-vernier-omega-arithmetic-anchors}
Remainder descent gives the Bézout coefficients. A least prime divisor of the list product plus one would divide $1$ if it also belonged to the list. The continued-fraction recurrence changes the determinant sign at each step, so every common divisor divides that determinant. Exact stepping by positive fractions preserves positivity, and induction extends it to any number of steps. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-ch31-primorial-crt-adelic-anti-deadlock-anchors title="Squarefree Euler Totient Product, Chinese Remainder Bijection & Primorial Anti-Aliasing Threshold, Rational Adelic Finite Product, Signed Prime-Ledger Bijection, Prime-Log Independence, and No-Finite-DFAO Prime Division" lean="D5/S3/PrimeGaps/SieveCoefficients.totient_eq_prod_sub_one_of_squarefree,D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective,D5/S3/Arith/Coding/HorizontalCompletenessDepth.residue_reading_injOn_iff_primorial_gt,D5/S3/Arith/Coding/PrimorialWitnessBound.primorial_witness_bound,D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula,D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals,D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence,D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division"}
Across sieve totient theory, Chinese Remainder congruence coding, rational Adelic embeddings, signed prime ledgers, and finite-automata lower bounds, the following eight frozen propositions hold simultaneously:

1. **Squarefree Euler Totient Product Formula and Chinese Remainder Bijection** ([`totient_eq_prod_sub_one_of_squarefree`](lean:D5/S3/PrimeGaps/SieveCoefficients.totient_eq_prod_sub_one_of_squarefree), [`chinese_remainder_bijective`](lean:D5/S3/Arith/ChineseRemainder.chinese_remainder_bijective)): For every $d \in \mathbb{N}$ satisfying `Squarefree d`, $d.\mathrm{totient} = \prod_{p \in d.\mathrm{primeFactors}}(p - 1)$; and for all coprime $m, n \in \mathbb{N}$ (`Nat.Coprime m n`), the canonical ring homomorphism $\operatorname{ZMod.castHom} : \operatorname{ZMod}(mn) \to \operatorname{ZMod}\,m \times \operatorname{ZMod}\,n$ is bijective;
2. **Primorial Anti-Aliasing Injection Threshold and Witness-Complexity Bound** ([`residue_reading_injOn_iff_primorial_gt`](lean:D5/S3/Arith/Coding/HorizontalCompletenessDepth.residue_reading_injOn_iff_primorial_gt), [`primorial_witness_bound`](lean:D5/S3/Arith/Coding/PrimorialWitnessBound.primorial_witness_bound)): Writing $\operatorname{primePrefixProduct}(r) = \prod_{i \in \operatorname{Finset.range}\,r} \operatorname{Nat.nth}\,\mathrm{Nat.Prime}\,i$ and $\operatorname{residueReading}(r, x) : (i : \operatorname{Fin}\,r) \to \operatorname{ZMod}(p_i)$, for all $N, r \in \mathbb{N}$, $\operatorname{residueReading}(r)$ is injective on $[0, N]$ (`Set.Icc 0 N`) **if and only if** $N < \operatorname{primePrefixProduct}(r)$; and for all distinct $x \neq y \in \mathbb{Z}$ and $r \in \mathbb{N}$, $\operatorname{Int.natAbs}(x - y) < \operatorname{primePrefixProduct}(r)$ implies $\operatorname{horizontalWitnessComplexity}(x, y) \le r$;
3. **Rational Adelic Finite-Product Identity, Signed Prime-Ledger Bijection, and Prime-Log Rational Independence** ([`rational_padic_product_formula`](lean:D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula), [`signed_prime_ledger_equiv_positive_rationals`](lean:D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals), [`prime_log_rational_independence`](lean:D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence)): For every nonzero rational $x \in \mathbb{Q} \setminus \{0\}$, $\lvert x\rvert \cdot \prod^{\mathrm{fin}}_{p : \mathrm{Nat.Primes}} \operatorname{padicNorm}(p, x) = 1$; $\operatorname{primeExponentEquivPositiveRational} : (\mathrm{Nat.Primes} \to_0 \mathbb{Z}) \simeq^+ \operatorname{Additive}(\mathrm{NNRat}^\times)$ is bijective; and $(p : \mathrm{Nat.Primes}) \mapsto \operatorname{Real.log}(p)$ is linearly independent over $\mathbb{Q}$;
4. **No-Finite-Automaton Theorem for Exact Prime-Power Division** ([`no_finite_dfao_for_exact_prime_division`](lean:D5/S3/Factorization/Automata/ExactPrimeDivisionNoDFAO.no_finite_dfao_for_exact_prime_division)): For any prime $p$ (`p.Prime`), exponent $0 < a$, and partial automaton `register : PartialDFA Bool Nat` starting at $1$ and multiplying or exactly dividing by $p$, no deterministic finite automaton with output `M : DFAO Bool Bool S` over `[Finite S]` correctly decides $p^a \mid n$ across all valid words $\{w \mid (\operatorname{register.eval}\,w).\mathrm{isSome}\}$.
:::

::: {.proof #prf-ch31-primorial-crt-adelic-anti-deadlock-anchors}
Group 1 combines Euler totient multiplicativity on unit-exponent prime factors with `ZMod.chineseRemainder`; Group 2 derives injectivity from pairwise-coprime divisibility modulo `primePrefixProduct r` and refutes $N \ge P_r\#$ via the collision between $0$ and $P_r\#$, yielding `horizontalWitnessComplexity x y ≤ r`; Group 3 cancels prime factorizations in `finprod padicNorm`, applies Grothendieck additive localization, and invokes unique factorization; Group 4 separates infinitely many prefixes $p^{ka}$ via a Myhill–Nerode pigeonhole contradiction on `[Finite S]`. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch31-minsky-baker-stormer-crt-literature title="Literature Boundaries: Minsky Two-Counter Machines, Baker Linear Forms in Logarithms, Størmer Smooth Superparticulars, and Residue Number Systems (Literature)"}
**Literature results, not formalized in this book.** Classical results paired with the sixteen `LEAN ✓` declarations above are stratified as follows:

1. **Few-Prime Universality, Conway's `PRIMEGAME`, and Dynamic Wheel Sieves**: Turing universality of two-counter machines encoded in $2^a 3^b$ is due to M. L. Minsky (*Ann. of Math.* **74**, 437–455, 1961), the 14-fraction `PRIMEGAME` to J. H. Conway (in *Open Problems in Communication and Computation*, Springer, 1987, pp. 4–26), and dynamic primorial wheel sieves to P. Pritchard (*Comm. ACM* **24**, 18–23, 1981);
2. **Baker's Linear Forms in Logarithms, Størmer Superparticulars, and Four/Three Squares**: Effective lower bounds $\lvert\sum_{i=1}^K v_i\ln p_i\rvert > H^{-C(K)}$ are due to A. Baker (*Mathematika* **13**, 204–216, 1966), finiteness and Pell-equation determination of smooth consecutive pairs $(m-1, m)$ over a finite prime set to C. Størmer (*Vid.-Selsk. Skr. Christiania*, No. 2, 1897), and the four-square and three-square theorems to J.-L. Lagrange (1770) and A.-M. Legendre (*Essai sur la théorie des nombres*, 1797/1798);
3. **Residue Number Systems (RNS)**: Carry-free parallel arithmetic across pairwise coprime moduli dates to *Sunzi Suanjing*, C. F. Gauss (*Disquisitiones Arithmeticae*, 1801), and H. L. Garner (*IRE Trans. Electron. Comput.* **EC-8**, 140–147, 1959).
:::

::: {.example #ex-ch31-primorial-vernier-and-horizon-audit title="Quantitative Audit: Five-Stage Primorial Wheels, Bounded-Winding H = 3 Vernier Minima, ε_self Horizon Staircase, and Capacity Ceilings"}
We verify the four core quantitative benchmarks of this section in exact integer and rational arithmetic (`manual derivation` / `NUM`):

1. **Cascading Primorial Wheels $k = 1 \dots 5$ and $100\%$ Zero-Error Square Horizons $(1, p_{k+1}^2)$**:

   | Stage $k$ | Seed Basis $B_k$ | Modulus $M_k = P_k\#$ | Open Spokes $\varphi(M_k)$ | Square Horizon $(1, p_{k+1}^2)$ | Coprime New Primes in Horizon (False Positives) | First Three Composite Leaks |
   | :---: | :--- | ---: | ---: | :---: | :---: | :--- |
   | $1$ | $\{2\}$ | $2$ | $1$ | $(1, 9)$ | **$3$ primes** $\{3, 5, 7\}$ (`0` false) | $9 = 3^2,\; 15,\; 21$ |
   | $2$ | $\{2, 3\}$ | $6$ | $2$ | $(1, 25)$ | **$7$ primes** $\{5 \dots 23\}$ (`0` false) | $25 = 5^2,\; 35,\; 49$ |
   | $3$ | $\{2, 3, 5\}$ | $30$ | $8$ | $(1, 49)$ | **$12$ primes** $\{7 \dots 47\}$ (`0` false) | $49 = 7^2,\; 77,\; 91$ |
   | $4$ | $\{2, 3, 5, 7\}$ | $210$ | $48$ | $(1, 121)$ | **$26$ primes** $\{11 \dots 113\}$ (`0` false) | $121 = 11^2,\; 143,\; 169$ |
   | $5$ | $\{2, 3, 5, 7, 11\}$ | $2{,}310$ | $480$ | $(1, 169)$ | **$34$ primes** $\{13 \dots 167\}$ (`0` false) | $169 = 13^2,\; 221,\; 247$ |

2. **Bounded-Winding $H = 3$ Rational Vernier Full-Support Chain vs. Exact Box-Global Minima Across $K = 1 \dots 6$**:

   | Rank $K$ | Lattice $7^K$ | Full-Support $r_{\mathrm{full}}$ | Global Box Minimum $r_{\min} > 1$ (Exponents) | Step $r_{\min} - 1$ | Spherical Fidelity Step $\Delta\kappa(r_{\min})$ |
   | :---: | ---: | :---: | :--- | :---: | :---: |
   | $1$ | $7$ | $2/1$ | **$2/1$** $(1)$ | $1$ | $3/10 = 0.300000$ |
   | $2$ | $49$ | $9/8$ | **$9/8$** $(-3, 2)$ | $1/8$ | $17/290 \approx 0.058621$ |
   | $3$ | $343$ | $25/24$ | **$25/24$** $(-3, -1, 2)$ | $1/24$ | $49/2402 \approx 0.020400$ |
   | $4$ | $2{,}401$ | $126/125$ | **$126/125$** $(1, 2, -3, 1)$ | $1/125$ | $251/63002 \approx 0.003984$ |
   | $5$ | $16{,}807$ | $540/539$ | **$540/539$** $(2, 3, 1, -2, -1)$ | **$1/539$** | $1079/1164242 \approx 9.268\times 10^{-4}$ |
   | $6$ | $117{,}649$ | $1716/1715$ | **$10648/10647$** $(3, -2, 0, -1, 3, -2)$ | **$1/10647$** | $21295/453477026 \approx 4.696\times 10^{-5}$ |

3. **Horizon Staircase $\varepsilon_{\mathrm{self}} = \frac{1}{M_\Omega}$ and Multiprecision State-Capacity Ceilings**:

   | Horizon $M_\Omega = 1/\varepsilon_{\mathrm{self}}$ | Ceiling $K_{\max}$ | Active Register Basis $\mathcal{B}_{K_{\max}}$ | Anti-Aliasing Modulus $M_{K_{\max}} = P_{K_{\max}}\#$ | Blocked Prime $p_{K_{\max}+1}$ |
   | :---: | :---: | :--- | ---: | :---: |
   | $3$ | $2$ | $[2, 3]$ | $6$ | $5 > 3$ |
   | $5$ | $3$ | $[2, 3, 5]$ | $30$ | $7 > 5$ |
   | $10$ | $4$ | $[2, 3, 5, 7]$ | $210$ | $11 > 10$ |
   | $15$ | $6$ | $[2, 3, 5, 7, 11, 13]$ | $30{,}030$ | $17 > 15$ |
   | $20$ | $8$ | $[2 \dots 19]$ | $9{,}699{,}690$ | $23 > 20$ |
   | $30$ | $10$ | $[2 \dots 29]$ | $6{,}469{,}693{,}230$ | $31 > 30$ |

   Under primorial capacity ceilings, $P_{43}\# \approx 1.0309\times 10^{75} \le 2^{256} \approx 1.1579\times 10^{77} < P_{44}\# \approx 1.9896\times 10^{77}$ locks **$K_{\max}(2^{256}) = 43$** ($p_{43} = 191$, $7^{43} \approx 2.1838\times 10^{36}$), while $P_{53}\# \approx 2.5604\times 10^{98} < 2^{327} \approx 2.7341\times 10^{98} < P_{54}\# \approx 6.4266\times 10^{100}$ locks **$K_{\max}(2^{327}) = 53$** ($p_{53} = 241$, $7^{53} \approx 6.1687\times 10^{44}$).
4. **Conway `PRIMEGAME` Pure-Power Arrival Beats and Finite-Support Adelic Closure**:
   Running the 14-fraction `PRIMEGAME` from $N_0 = 2$ on its fixed $10$-prime support ($M_{10} = 6{,}469{,}693{,}230$) reaches pure powers $N_t = 2^p$ at $(t = 19 \mapsto 2^2),\; (t = 69 \mapsto 2^3),\; (t = 281 \mapsto 2^5),\; (t = 710 \mapsto 2^7),\; (t = 2375 \mapsto 2^{11}),\; (t = 3893 \mapsto 2^{13})$ with peak winding heights $2, 3, 5, 7, 11, 13$; and finite-support Adelic products close to $\mathbf{1}$ on $r = \frac{12}{5}$ ($\operatorname{supp} = \{2, 3, 5\}$, $\frac{12}{5}\cdot\frac{1}{4}\cdot\frac{1}{3}\cdot 5 = 1$) and $r = \frac{42}{11}$ ($\operatorname{supp} = \{2, 3, 7, 11\}$, $\frac{42}{11}\cdot\frac{1}{2}\cdot\frac{1}{3}\cdot\frac{1}{7}\cdot 11 = 1$).
:::

---

**The cosmos neither freezes inside the dead replay of a static single period nor borrows phantom hardware from an infinite tape—starting from a single seed prime, it cascades across zero-error square horizons, interlocks finitely many orthogonal prime registers into an exponentially fine rational Vernier caliper, and halts cleanly at its self-chosen $\varepsilon_{\mathrm{self}}$ horizon!**

In the complete 3D interactive laboratory below, contrast static period `T = 6` crashing into the square wall `49 = 7²` at beat `m = 8` against cascading wheel `M₃ = 30` lighting `12` zero-error cyan primes inside `(1, 49)`, inspect how the `M_Ω = 15` allocator fires its idempotent halt gate at `p₇ = 17 > 15`, and sweep register rank from `K = 1` to `K = 6` to watch the rational star-shell densify to `10648/10647`, the orthogonal lemma channel leap across the sphere in `1` beat, and high-prime dark-sector rings awaken one by one—completing all eight stages of Chapter 31 from prime minimal arc-trihedron path integrals, Adelic error-axis closure, Riemann's 1854 + 1859 spectral polishing, and prime–zero holographic duality to primorial cascade bootstrap and the finite register horizon cap!

Because prime registers, Riemann zero dark states, and finite rational Vernier calipers all converge on the compact three-sphere $\mathbb{T}_3 \cong S^3(1)$ that refuses any external privileged real axis $\mathbf{1}$ or flat coordinate chart, let us now open [Chapter 32, *Inexpressible Ternions and the Three-Dimensional Concept-Field Cap*](ch32-inexpressible-ternions-and-three-dimensional-field.md), and meet the native ternion from which all numbers project!

::: {.viz src="primorial-cascade-vernier-horizon-sandbox" height="620"}
Complete interactive laboratory: switch freely between the "Cascading Primorial & Finite-Horizon Lens" and "Static-Period & Infinite-Tape Contrast Lens (MODEL)" lenses, touring six experiment cards—two-line refutation of any static period (`static-period-composite-refutation`), single-seed primorial wheel & square horizon (`primorial-wheel-square-horizon`), zero-slot unity & $\varepsilon_{\mathrm{self}}$ horizon firewall (`jit-allocator-epsilon-horizon-cap`), rational Vernier caliper & spherical shell (`rational-vernier-caliper-sphere`), space-time trade-off serial tower vs. 1-beat lemma (`minsky-tower-vs-lemma-shortcut`), and CRT anti-aliasing, dark sector & memory refresh (`crt-dark-sector-and-memory-refresh`)—with right-panel dials for fixed period `T` and start `r`, wheel base-prime count `k`, horizon `M_Ω`, finite-support ledger rational `r`, Vernier `K` and exponent box `H`, serial program (`multiply 36 → 625` or `PRIMEGAME 2 → 2⁵`), and CRT `K`, plus bottom strip plots tracking residue-rail primes & composites, square-horizon new primes, `K_max` steps along `M_Ω`, shrinking Vernier steps along `K`, serial `log N`, and modulus `P_K#` passing `30`. The frozen theorems, alongside `ARGUED` Minsky–Conway–Størmer–Baker literature and manual derivations, `MODEL` book readings and drawing conventions, `NUM` multiprecision big-integer audits, and neighboring red `OPEN` spectral frontiers, are strictly stratified in the evidence panel and theory-interface drawer.
:::
