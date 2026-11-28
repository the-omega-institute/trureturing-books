# Chapter 16 Ω-FRACTRAN Non-Abelian Spinor Machines and 2×2 Matrix Algebra

> *“When every state, fidelity reading, and jet evolution of an observer is purely rational, self-referential computation needs neither flat byte arrays nor an external program counter: prime windings serve as orthogonal registers, and integer quaternion spinors serve as a native non-Abelian causal stack.”*

Across Volumes I–V, starting from the bare Calculus of Inductive Constructions (CIC) and homogeneous projective closure, we constructed canonical three-dimensional ternions, origin-free heaps, limit-free jet calculus, $\pi$-free spherical harmonic analysis, Adelic product closure, and the norm-$5$ rational Hecke–Ramanujan spectral gap without once borrowing from the real continuum $\mathbb{R}$ or transcendental constants. Opening Volume VI, a sharp foundational question follows: **inside an all-rational, background-free geometric universe, what is the native instruction set architecture (ISA) of computation itself?**

This chapter develops the answer in three steps. Section 16.1 introduces John H. Conway's scalar rational machine FRACTRAN, anchors its orthogonal prime registers, explicit step-bounded computability, and the zero-axiom scalar FRACTRAN exact semantics, determinism, positivity, halting stability, and exact 15-transition trace of the four-gate program $P_\Omega$ from $2^{17} = 131{,}072$ first halting at $22$ (`strict_omega.axioms: []`, `OmegaInit` $+$ `OmegaMath`) in frozen **`LEAN ✓`** theorems (accompanied by a hand-checked five-prime exponent table). Section 16.2 diagnoses the Abelian word-order tax of commutative multiplication, lifts the state carrier to the integer quaternion spinor lattice $\mathbb{Z}^4 \subset \mathcal{H}(\mathbb{Z})$ to formulate the non-Abelian $\Omega$-FRACTRAN machine with exact divisibility gates enforcing `Output(1) ≡ Input(0')` (**`MODEL`**), verifies coordinate by coordinate how `psiXY` and `psiYX` separate modulo $5$, and anchors both general transition determinism and this modulo-$5$ word-order separation in a zero-axiom frozen **`LEAN ✓`** theorem (`strict_omega.axioms: []`, `OmegaInit` $+$ `OmegaMath`). Section 16.3 constructs the zero-axiom $2\times 2$ integer matrix ring `Mat2`, first exhibits all four core matrix polynomial identities explicitly, and then anchors all four—trace cyclicity, determinant multiplicativity $\det(AB) = \det(A)\det(B)$, bilateral adjugate identities, and the universal Cayley–Hamilton identity $A^2 - \operatorname{tr}(A)A + \det(A)I = 0$—in a zero-axiom frozen **`LEAN ✓`** theorem (`strict_omega.axioms: []`), bridging spinor execution directly to matrix algebra.

## 16.1 Classical Scalar FRACTRAN, Orthogonal Prime Registers, and a 16-State Halting Trace {#sec-om-ch16-scalar-fractran}

Conventional von Neumann architectures split flat byte arrays, external addresses, and a program counter (`PC`) into separate external devices, permitting arbitrary bit overwrites without checking global structural compatibility. Conway's 1987 language **FRACTRAN** (`literature result`) compresses an entire universal computer into three minimal ingredients:

- **Machine state**: a single positive integer $N \in \mathbb{Z}_+$;
- **Program**: an ordered finite list of reduced positive rationals $P = \bigl(\frac{a_1}{b_1}, \frac{a_2}{b_2}, \dots, \frac{a_k}{b_k}\bigr) \in (\mathbb{Q}_{>0})^k$;
- **Single-beat transition**: scan $P$ from left to right, pick the **first** fraction whose product $N' = N \cdot \frac{a_i}{b_i}$ remains an integer (i.e., passing the divisibility guard $b_i \mid N$), update $N \leftarrow N'$, and return to the head of $P$; if no denominator divides $N$, halt idempotently.

This single-rule machine achieves unbounded multi-register computation because unique prime factorization identifies positive rationals with finitely supported signed exponent ledgers, while explicit step-bounded machines formalize decidable symbolic transitions without external oracles. Two frozen theorems anchor both sides.

::: {.theorem #thm-om-ch16-signed-prime-ledger title="Isomorphism Between Signed Prime Ledgers and Positive Rationals" lean="D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals"}
Let $\mathrm{SignedPrimeLedger} := (\mathrm{Nat.Primes} \to_0 \mathbb{Z})$ be the additive group of finitely supported signed prime-exponent ledgers and $\mathrm{PositiveRational} := \mathbb{Q}_{\ge 0}^\times$ the multiplicative group of positive rationals. Then the canonical additive equivalence `primeExponentEquivPositiveRational : (Nat.Primes →₀ Int) ≃+ Additive NNRatˣ` is bijective (`Function.Bijective`), identifying coordinatewise addition of prime exponents with multiplication of positive rationals.
:::

::: {.proof}
Unique prime factorization first gives an equivalence between positive natural numbers under multiplication and finitely supported natural prime-exponent ledgers. Passing on both sides to the Grothendieck group localization yields the additive-to-multiplicative group equivalence `primeExponentEquivPositiveRational`, whose underlying map is therefore bijective. The full proof is checked by the Lean kernel.
:::

::: {.theorem #thm-om-ch16-binary-name-compare title="Explicit Linear Step-Bounded Halting for Binary Name Comparison" lean="D5/S0/Computability/BinaryNameComparison.name_compare_run"}
For all binary words $a, b, \mathrm{output}, \mathrm{frame} : \mathrm{List}\;\mathrm{Bool}$, the machine transition `compareMachine.step` evaluates from `compareCfg (some .compare) ⟨none, none, true⟩ a b [] [] output frame` to `some (compareCfg none ⟨none, none, true⟩ a b [] [] (decide (a = b) :: output) frame)` in at most $2(\lvert a\rvert + \lvert b\rvert) + 4$ steps: outputting `decide (a = b)`, restoring both unbounded operands $a$ and $b$, emptying both backup stacks, and preserving the caller frame and prior output.
:::

::: {.proof}
The transition trace decomposes into four explicit phases—bitwise comparison with backup pushing, length-mismatch draining, stack restoration of both operands, and final output emission—whose step counts sum by list induction to at most $2(\lvert a\rvert + \lvert b\rvert) + 4$ without any external halting certificate. The full proof is checked by the Lean kernel.
:::

By [@thm-om-ch16-signed-prime-ledger], each positive integer $N = \prod_p p^{v_p(N)}$ encodes an orthogonal register vector $\mathbf{r}(N) = (v_2(N), v_3(N), v_5(N), \dots) \in \mathbb{N}^{(\mathbb{P})}$, while each rational gate $\frac{a_i}{b_i}$ encodes a signed register update $\Delta\mathbf{r}_i = \mathbf{r}(a_i) - \mathbf{r}(b_i) \in \mathbb{Z}^{(\mathbb{P})}$. The divisibility guard $b_i \mid N$ is equivalent to $\forall p,\, v_p(N) + \Delta r_i(p) \ge 0$: any transition that would create a negative prime exponent (a fractional tear) is silently blocked, while every clean transition feeds `Output(1)` directly back as the next `Input(0')`.

Furthermore, the exact equivalence between the executable scalar FRACTRAN evaluator and first-enabled-denominator relational semantics, together with determinism, positivity preservation, and idempotent halting stability, is frozen in D5 with strict measurements (`strict_omega.axioms: []`):

::: {.theorem #thm-ch16-scalar-fractran-semantics title="Scalar FRACTRAN Exact Semantics, Determinism, Positivity, and Halting Stability" lean="D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_step_iff D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_deterministic D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_positive D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_stable"}
In the `Omega.Fractran` namespace used by the D5 theorems (`strict_omega.axioms: []`), each `Rule` stores positive entries via predecessors (`numerator := numeratorPred.succ`, `denominator := denominatorPred.succ`) and an ordered `Fractran.Program` is an inductive list of rules; each rule tests divisibility of the input by its stored denominator (coinciding with the ordinary integral-product guard for reduced fractions). Write `Fractran.step prog n` for the left-to-right evaluator, `Fractran.Step prog n m` for the relational first-enabled-rule transition, `Fractran.Halts prog n` for the condition that every denominator fails to divide `n`, and `Fractran.run prog k n` for the $k$-step iteration of `advance prog` (which holds `n` fixed on `.none`). Then for all `prog : Fractran.Program` and `n, m, m₁, m₂, k, extra : Omega.Nat`:

1. **Evaluator–relation equivalence** (`fractran_step_iff`): `Fractran.step prog n = .some m ↔ Fractran.Step prog n m`;
2. **Transition determinism** (`fractran_deterministic`): `Fractran.Step prog n m₁` and `Fractran.Step prog n m₂` imply `m₁ = m₂`;
3. **Positivity invariance** (`fractran_positive`): $0 < n$ implies $0 < \mathrm{Fractran.run}\;\mathrm{prog}\;k\;n$ for every step count $k$;
4. **Idempotent halting stability** (`fractran_stable`): `Fractran.Halts prog (Fractran.run prog k n)` implies `Fractran.run prog (k + extra) n = Fractran.run prog k n` for all additional steps `extra`.
:::

::: {.proof}
The first claim proceeds by structural induction on `prog`: using the exact specification of `exactQuotient` (returning `.some q` iff `denominator * q = n` and `.none` iff `¬ Divides rule n`), each list branch aligns the executable scan `step` with the relational `fire` and `skip` cases in both directions. The second claim sends both relational derivations through the first claim into `.some m₁ = step prog n = .some m₂`, whence injectivity of `Result.some` yields `m₁ = m₂`. The third claim inducts on `k`: a halted step leaves the positive state unchanged, while a fired rule with `denominator * q = s > 0` forces `q > 0` and multiplies by `numerator = numeratorPred.succ > 0` to yield `q * numerator > 0`. The fourth claim rewrites `run prog (k + extra) n = run prog extra (run prog k n)` by induction on `extra`; since `halts_iff` gives `step = .none` and therefore `advance s = s`, iterating `extra` additional steps leaves the halted state fixed. Every step lives strictly in `OmegaInit` and `OmegaMath`. The full proof is checked by the Lean kernel.
:::

We first lay out the five-prime register ledger of a concrete four-gate program step by step, and then lock its full 15-transition trace and first-halting property inside a zero-axiom kernel-verified theorem.

::: {.example #ex-om-ch16-sixteen-state-fractran-trace title="Complete 16-State Trace of $P_\Omega$ from $2^{17}$ Halting at $22$"}
Consider the four-gate rational program acting on the five orthogonal prime registers $\{2, 3, 5, 7, 11\}$ (the five-prime exponent column below is a `hand derivation` ledger; the exact 15-transition trace and first halting at $22$ are formally certified in [@thm-ch16-p-omega-halts-at-22] below):

$$
P_\Omega \;=\; \left[\frac{11}{49},\; \frac{7}{25},\; \frac{5}{9},\; \frac{3}{4}\right] \;=\; \left[\frac{11}{7^2},\; \frac{7}{5^2},\; \frac{5}{3^2},\; \frac{3}{2^2}\right].
$$

Starting from the single power-of-two seed $N_0 = 2^{17} = 131{,}072$ with exponent vector $(17, 0, 0, 0, 0)$, the program repeatedly trades two units of a lower prime for one unit of the next prime across $15$ active transitions (visiting $16$ states $M_1$–$M_{16}$), then halts on the 16th scan when none of the four denominators divides $22 = 2^1 \cdot 11^1$:

| Step / Milestone | Rule Fired | State $N$ | Prime Exponents $(v_2, v_3, v_5, v_7, v_{11})$ |
| :---: | :---: | ---: | :---: |
| $0$ ($M_1$) | Initial seed | $131{,}072$ | $(17, 0, 0, 0, 0)$ |
| $1$ ($M_2$) | Rule 4 ($3/4$) | $98{,}304$ | $(15, 1, 0, 0, 0)$ |
| $2$ ($M_3$) | Rule 4 ($3/4$) | $73{,}728$ | $(13, 2, 0, 0, 0)$ |
| $3$ ($M_4$) | Rule 3 ($5/9$) | $40{,}960$ | $(13, 0, 1, 0, 0)$ |
| $4$ ($M_5$) | Rule 4 ($3/4$) | $30{,}720$ | $(11, 1, 1, 0, 0)$ |
| $5$ ($M_6$) | Rule 4 ($3/4$) | $23{,}040$ | $(9, 2, 1, 0, 0)$ |
| $6$ ($M_7$) | Rule 3 ($5/9$) | $12{,}800$ | $(9, 0, 2, 0, 0)$ |
| $7$ ($M_8$) | Rule 2 ($7/25$) | $3{,}584$ | $(9, 0, 0, 1, 0)$ |
| $8$ ($M_9$) | Rule 4 ($3/4$) | $2{,}688$ | $(7, 1, 0, 1, 0)$ |
| $9$ ($M_{10}$) | Rule 4 ($3/4$) | $2{,}016$ | $(5, 2, 0, 1, 0)$ |
| $10$ ($M_{11}$) | Rule 3 ($5/9$) | $1{,}120$ | $(5, 0, 1, 1, 0)$ |
| $11$ ($M_{12}$) | Rule 4 ($3/4$) | $840$ | $(3, 1, 1, 1, 0)$ |
| $12$ ($M_{13}$) | Rule 4 ($3/4$) | $630$ | $(1, 2, 1, 1, 0)$ |
| $13$ ($M_{14}$) | Rule 3 ($5/9$) | $350$ | $(1, 0, 2, 1, 0)$ |
| $14$ ($M_{15}$) | Rule 2 ($7/25$) | $98$ | $(1, 0, 0, 2, 0)$ |
| $15$ ($M_{16}$) | Rule 1 ($11/49$) | $22$ | $(1, 0, 0, 0, 1)$ |
| $16$ (Halt check) | None ($49, 25, 9, 4 \nmid 22$) | $22$ | $(1, 0, 0, 0, 1)$ |

Because $17 = 1 + 2^4$, exactly sixteen factors of $2$ cascade upward into one factor of $11$, leaving one irreducible factor of $2$ and locking at $22 = 2 \cdot 11$.
:::

The full 15-transition trace tabulated above—together with the exact assertion that step $15$ is the first time the program reaches a halting state at $22$—is no longer merely a hand calculation, but a zero-axiom frozen witness theorem certified directly by the Lean kernel in D5 on the strict backend (`strict_omega.axioms: []`):

::: {.theorem #thm-ch16-p-omega-halts-at-22 title="Exact 15-Transition Trace of $P_\Omega$ from $2^{17}$ First Halting at $22$" lean="D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.p_omega_halts_at_22"}
In the `Omega.Fractran` namespace used by the D5 theorems (`strict_omega.axioms: []`), let `pOmega` $= [\frac{11}{49}, \frac{7}{25}, \frac{5}{9}, \frac{3}{4}]$ be the ordered four-gate program, `pOmegaStart` $= 131{,}072$ ($= 2^{17}$) the decimal-encoded initial state, `pOmegaFinal` $= 22$ the terminal state, and `pOmegaTrace` $= [98{,}304,\, 73{,}728,\, 40{,}960,\, 30{,}720,\, 23{,}040,\, 12{,}800,\, 3{,}584,\, 2{,}688,\, 2{,}016,\, 1{,}120,\, 840,\, 630,\, 350,\, 98,\, 22]$ the list of fifteen successor states from steps $1$–$15$ of [@ex-om-ch16-sixteen-state-fractran-trace]. Writing `Follows` for the inductive chain predicate asserting that every consecutive pair satisfies the first-enabled-rule relation `Fractran.Step`, the following fourfold conjunction holds:

$$
\begin{aligned}
&\mathrm{Follows}\;\mathrm{pOmega}\;\mathrm{pOmegaTrace}\;\mathrm{pOmegaStart} \\
&\land\; \mathrm{run}\;\mathrm{pOmega}\;15\;\mathrm{pOmegaStart} = \mathrm{pOmegaFinal} \\
&\land\; \mathrm{Halts}\;\mathrm{pOmega}\;\mathrm{pOmegaFinal} \\
&\land\; \forall k < 15,\; \neg\,\mathrm{Halts}\;\mathrm{pOmega}\;(\mathrm{run}\;\mathrm{pOmega}\;k\;\mathrm{pOmegaStart}).
\end{aligned}
$$

That is, starting from $131{,}072$, `pOmega` executes the exact 15-transition trace `pOmegaTrace`, reaches the halting state $22$ at step $15$, and never halts at any earlier step $k < 15$.
:::

::: {.proof}
Large natural numbers are encoded as least-significant-digit-first decimal lists (`decimalValue`), paired with a digit-by-digit Euclidean division routine `divideDigits` satisfying `d * quotient + remainder = decimalValue digits` (`divideDigits_sound`). Whenever a rule's denominator leaves remainder $0$ and the target state yields the same exact quotient upon division by its numerator, `fire_decimal` builds the relational `Step` firing witness; whenever a nonzero remainder satisfies $0 < r < d$, uniqueness of Euclidean remainders (`skip_decimal`) refutes divisibility and certifies skipping that rule. Composing the fifteen step witnesses establishes `Follows pOmega pOmegaTrace pOmegaStart`; induction along the `Follows` chain (`run_follows`) via `Step.sound` proves `run pOmega 15 pOmegaStart = pOmegaFinal`; applying `skip_decimal` to all four denominators ($49, 25, 9, 4$) at `d22` proves `Halts pOmega pOmegaFinal`. Finally, induction along any valid trace (`running_before_trace_end`) shows that every iterate $k < 15$ admits an active outgoing `Step`, so by `Step.sound` and `halts_iff` ([@thm-ch16-scalar-fractran-semantics]) `step` returns `.some` rather than `.none`, yielding `¬ Halts pOmega (run pOmega k pOmegaStart)`. Every step stays strictly within `OmegaInit` and `OmegaMath`. The full proof is checked by the Lean kernel.
:::

## 16.2 Non-Abelian $\Omega$-FRACTRAN Spinor Machines and Exact Divisibility Gates {#sec-om-ch16-omega-fractran-spinor-gate}

Although scalar FRACTRAN is Turing-complete, it pays a steep algebraic penalty: **scalar rational multiplication is commutative**, $\frac{a}{b}\cdot\frac{c}{d} = \frac{c}{d}\cdot\frac{a}{b}$. A single positive integer $N$ remembers how many times each prime axis turned, yet erases the causal order in which operations were applied. Simulating call stacks or branching histories therefore forces scalar programs to waste auxiliary flag primes as artificial traffic lights.

Within the three-dimensional spherical geometry of $\mathbf{Math}_\Omega$, lifting the state carrier from $\mathbb{Z}_+$ to an integer quaternion spinor $\mathbf{\Psi} = (w, x, y, z) \in \mathbb{Z}^4 \subset \mathcal{H}(\mathbb{Z})$ (the Lipschitz ring $\mathbb{Z}[\mathbf{i},\mathbf{j},\mathbf{k}] \cong \mathbb{Z}^4$ embedded inside the maximal Hurwitz order $\mathcal{H}(\mathbb{Z}) = \mathbb{Z}[\mathbf{i},\mathbf{j},\mathbf{k}, \frac{1+\mathbf{i}+\mathbf{j}+\mathbf{k}}{2}]$) eliminates this Abelian tax through a **dual encoding** (`MODEL`):

1. **Scalar squared norm encodes orthogonal prime registers**: by four-square norm multiplicativity $\|\mathbf{\Psi}_1\mathbf{\Psi}_2\|^2 = \|\mathbf{\Psi}_1\|^2 \|\mathbf{\Psi}_2\|^2$, the radial scalar $\|\mathbf{\Psi}\|^2 = w^2 + x^2 + y^2 + z^2 = \prod_p p^{v_p}$ preserves the entire classical FRACTRAN prime-register ledger;
2. **Spherical orientation encodes a native non-Abelian word-order stack**: because quaternion multiplication does not commute, distinct operation orders sharing the same squared norm land at distinct spherical orientations, inscribing causal history directly into geometry without external stack pointers or flag primes.

::: {.definition #def-om-ch16-omega-fractran-machine title="Non-Abelian Ω-FRACTRAN Spinor Machine and Exact Divisibility Gate"}
On the integer quaternion lattice $\mathbb{Z}^4 \subset \mathcal{H}(\mathbb{Z})$, a **non-Abelian $\Omega$-FRACTRAN spinor machine** (`MODEL`) consists of a nonzero initial spinor $\mathbf{\Psi}_0 \in \mathbb{Z}^4 \setminus \{0\}$ and an ordered gate list $\mathcal{G} = \bigl((A_1, p_1), (A_2, p_2), \dots, (A_k, p_k)\bigr)$ with $A_i \in \mathbb{Z}^4 \setminus \{0\}$ and positive integer divisor $p_i \in \mathbb{Z}_{>0}$ (typically the prime squared norm of $A_i$). On each beat, the machine scans $\mathcal{G}$ in order for the first gate passing the **coordinatewise exact divisibility gate**

$$
\frac{\mathbf{\Psi}\cdot A_i}{p_i} \;\in\; \mathbb{Z}^4 \qquad \Longleftrightarrow \qquad \mathbf{\Psi}\cdot A_i \;\equiv\; (0, 0, 0, 0) \pmod{p_i},
$$

emits $\mathbf{\Psi}' := \mathbf{\Psi}\cdot A_i / p_i$, and feeds `Output(1)` directly back as the next `Input(0')`. Any nonzero remainder modulo $p_i$ silently blocks the gate; if every gate is blocked, the machine halts idempotently at $\mathbf{\Psi}$. In particular, when an unwinding gate takes the conjugate spinor $A_i = \overline{B_i}$ with $p_i = \|B_i\|^2$, the identity $\mathbf{\Psi}'\cdot B_i = \frac{\mathbf{\Psi}\overline{B_i}B_i}{\|B_i\|^2} = \mathbf{\Psi}$ guarantees **zero-remainder reversible unwinding**.
:::

Multiplying two norm-$5$ primitive spinors $X = (1, 2, 0, 0)$ and $Y = (1, 0, 2, 0)$ in opposite orders produces two states `psiXY` and `psiYX` with identical squared norm $25$ but opposite chirality. Passing both through the same modulo-$5$ unwinding gate `gateUnwindY = (1, 0, -2, 0)` separates their history automatically.

::: {.figure src="ch16-omega-fractran-gate"}
**Multiplication order determines whether the non-Abelian divisibility gate opens.** Both input states `psiXY = (1, 2, 2, 4)` and `psiYX = (1, 2, 2, −4)` have squared norm $25$ and pass through the same violet right-multiplication gate `gateUnwindY = (1, 0, −2, 0)`. Along the cyan chain on the left, all four coordinates of $(5, 10, 0, 0)$ are divisible by $5$, yielding a clean transition to $(1, 2, 0, 0)$; along the magenta chain on the right, $(5, −6, 0, −8)$ leaves nonzero residues $(0, 4, 0, 2)$ modulo $5$, blocking the gate.
:::

::: {.example #ex-om-ch16-nonabelian-stack-proof title="Hand Separation of psiXY and psiYX Under the Mod-5 Divisibility Gate"}
With quaternion units $\mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{i}\mathbf{j}\mathbf{k} = -1$ (so $\mathbf{i}\mathbf{j} = \mathbf{k}$, $\mathbf{j}\mathbf{i} = -\mathbf{k}$, $\mathbf{k}\mathbf{j} = -\mathbf{i}$), set $X = (1, 2, 0, 0) = 1 + 2\mathbf{i}$, $Y = (1, 0, 2, 0) = 1 + 2\mathbf{j}$, and `gateUnwindY` $= \overline{Y} = (1, 0, -2, 0) = 1 - 2\mathbf{j}$ with divisor $p = 5$ (`hand derivation`):

1. **Two states sharing squared norm $25$ with opposite word order**:

   $$
   \begin{aligned}
   \mathrm{psiXY} &= X\cdot Y = (1 + 2\mathbf{i})(1 + 2\mathbf{j}) = 1 + 2\mathbf{i} + 2\mathbf{j} + 4\mathbf{k} = (1, 2, 2, 4), \\
   \mathrm{psiYX} &= Y\cdot X = (1 + 2\mathbf{j})(1 + 2\mathbf{i}) = 1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k} = (1, 2, 2, -4).
   \end{aligned}
   $$

   Both have $\|\mathbf{\Psi}\|^2 = 1^2 + 2^2 + 2^2 + (\pm 4)^2 = \mathbf{25} = 5^2$, collapsing to the same number in scalar FRACTRAN.
2. **Clean zero-remainder pass and reversible unwinding for `psiXY`**:

   $$
   \begin{aligned}
   \mathrm{psiXY}\cdot\mathrm{gateUnwindY}
   &= (1 + 2\mathbf{i} + 2\mathbf{j} + 4\mathbf{k})(1 - 2\mathbf{j}) \\
   &= (1 + 4) + (2 + 8)\mathbf{i} + (2 - 2)\mathbf{j} + (4 - 4)\mathbf{k} = (5, 10, 0, 0).
   \end{aligned}
   $$

   Every coordinate is divisible by $5$, transitioning cleanly to $(1, 2, 0, 0) = X \in \mathbb{Z}^4$, and right-multiplying back by $Y$ recovers $(1, 2, 2, 4)$ reversibly.
3. **Non-Abelian remainder blocking `psiYX`**:

   $$
   \begin{aligned}
   \mathrm{psiYX}\cdot\mathrm{gateUnwindY}
   &= (1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k})(1 - 2\mathbf{j}) \\
   &= (1 + 4) + (2 - 8)\mathbf{i} + (2 - 2)\mathbf{j} + (-4 - 4)\mathbf{k} = (5, -6, 0, -8).
   \end{aligned}
   $$

   Since $-6 \equiv 4 \pmod 5$ and $-8 \equiv 2 \pmod 5$, the nonnegative residue vector modulo $5$ is $(0, 4, 0, 2) \neq (0, 0, 0, 0)$, slamming the gate shut. Passing `psiYX` instead to a subsequent gate `gateUnwindX` $= (1, -2, 0, 0)$ yields $(1 + 2\mathbf{i} + 2\mathbf{j} - 4\mathbf{k})(1 - 2\mathbf{i}) = (5, 0, 10, 0)$, dividing by $5$ to give $(1, 0, 2, 0) = Y$. The two gates execute a strict last-in-first-out (LIFO) causal stack without spending a single flag prime.
:::

This hand calculation is not merely an isolated illustration: both the general transition determinism of integer quaternion gates (for any state, rotor, and nonzero integer denominator, a valid divisibility transition fixes a unique next state) and the exact modulo-$5$ separation of the equal-norm words `psiXY` and `psiYX` under `gateUnwindY` are formally anchored in the cited D5 proofs on the strict backend (`strict_omega.axioms: []`) in the frozen module `OmegaBargmannHaarHecke`.

::: {.theorem #thm-ch16-quaternion-fractran-gate title="Determinism and Mod-5 Word-Order Separation of Non-Abelian Quaternion Ω-FRACTRAN Gates" lean="D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_deterministic, D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_order_separation"}
Over the integer quaternion type `Quad4` used by the cited D5 results (`strict_omega.axioms: []`), write `Step psi A p q` for the exact divisibility transition relation sending state `psi` via rotor `A` and nonzero integer denominator `p` to next state `q`, and write `Enabled psi A p` for the existence of a valid target state `q : Quad4`. Then both statements hold:

1. **Determinism of single-step divisibility transitions** (`quaternion_fractran_deterministic`): for all `psi, A, q₁, q₂ : Quad4` and `p : Int`, if `p ≠ 0`, `psi * A = p • q₁`, and `psi * A = p • q₂`, then `q₁ = q₂`.
2. **Mod-5 word-order separation at equal squared norm** (`quaternion_fractran_order_separation`): for `psiX = (1, 2, 0, 0)`, `psiXY = (1, 2, 2, 4)`, `psiYX = (1, 2, 2, -4)`, and the $Y$-unwind gate `gateUnwindY = (1, 0, -2, 0)` with denominator $5$,

   $$
   \begin{aligned}
   &\mathrm{psiXY}.\mathrm{normSq} = 5^2 \;\land\; \mathrm{psiYX}.\mathrm{normSq} = 5^2 \\
   &\land\; \mathrm{Step}\;\mathrm{psiXY}\;\mathrm{gateUnwindY}\;5\;\mathrm{psiX} \\
   &\land\; \neg\,\mathrm{Enabled}\;\mathrm{psiYX}\;\mathrm{gateUnwindY}\;5,
   \end{aligned}
   $$

   so the two opposite-order words share identical squared norm $5^2 = 25$, while `gateUnwindY` with denominator $5$ cleanly transitions `psiXY` to `psiX` and rejects `psiYX`.
:::

::: {.proof}
For the first statement, `psi * A = p • q₁` and `psi * A = p • q₂` yield `p • q₁ = p • q₂` by transitivity. Expanding coordinatewise over the zero-axiom integer ring `Omega.Int` gives four equations $p a_1 = p a_2$, i.e., $p(a_1 - a_2) = 0$; since `p ≠ 0` and `Omega.Int` has no zero divisors, cancelling `p` in each coordinate proves `q₁ = q₂`.

For the second statement, direct evaluation gives `psiXY.normSq` $= 1^2 + 2^2 + 2^2 + 4^2 = 25 = 5^2$ and `psiYX.normSq` $= 1^2 + 2^2 + 2^2 + (-4)^2 = 25 = 5^2$. Expanding the quaternion product for `psiXY` yields `psiXY * gateUnwindY` $= (5, 10, 0, 0) = 5 \cdot (1, 2, 0, 0) = 5 \cdot \mathrm{psiX}$ with $5 \neq 0$, establishing `Step psiXY gateUnwindY 5 psiX`. For `psiYX`, the product is `psiYX * gateUnwindY` $= (5, -6, 0, -8)$; if `Enabled psiYX gateUnwindY 5` held, some integer quaternion $q = (w, x, y, z) : \mathrm{Quad4}$ would satisfy $5 \cdot q = (5, -6, 0, -8)$ and in particular $5x = -6$. Because every integer satisfies either $x \le -2$ (giving $5x \le -10 < -6$) or $x \ge -1$ (giving $5x \ge -5 > -6$), no such integer exists, proving `¬ Enabled psiYX gateUnwindY 5`. Every step relies solely on zero-axiom integer arithmetic in `OmegaInit` and `OmegaMath`. The full proof is checked by the Lean kernel.
:::

Consequently, while interpreting non-Abelian $\Omega$-FRACTRAN as a flag-prime-free native LIFO causal stack remains an architectural **`MODEL`**, its core transition determinism and modulo-$5$ word-order separation stand as zero-axiom kernel-verified theorems.

## 16.3 $2\times 2$ Integer Matrix Ring and Universal Cayley–Hamilton {#sec-om-ch16-mat2-cayley-hamilton}

To link quaternion spinor computation directly with linear algebra and finite-field matrix representations, we define the zero-axiom $2\times 2$ integer matrix ring $\mathrm{Mat}_2(\mathbb{Z})$ by four integer coordinates. For

$$
A \;=\; \begin{pmatrix} a & b \\ c & d \end{pmatrix}, \qquad B \;=\; \begin{pmatrix} e & f \\ g & h \end{pmatrix} \;\in\; \mathrm{Mat}_2(\mathbb{Z}),
$$

define the trace $\operatorname{tr}(A) := a + d$, determinant $\det(A) := ad - bc$, identity $I := \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$, and adjugate $\operatorname{adj}(A) := \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$. Without appealing to eigenvalues, algebraic closure, or basis selection, pure integer polynomial expansion exhibits four universal identities over $\mathbb{Z}$:

1. **Trace cyclicity**:

   $$
   \operatorname{tr}(AB) \;=\; (ae + bg) + (cf + dh) \;=\; (ea + fc) + (gb + hd) \;=\; \operatorname{tr}(BA);
   $$

2. **Determinant multiplicativity**:

   $$
   \begin{aligned}
   \det(AB) &= (ae + bg)(cf + dh) - (af + bh)(ce + dg) \\
            &= ad(eh - fg) - bc(eh - fg) \;=\; (ad - bc)(eh - fg) \;=\; \det(A)\det(B);
   \end{aligned}
   $$

3. **Bilateral adjugate identity**: entrywise expansion cancels the off-diagonal terms $bd - bd = 0$ and $ca - ca = 0$ and leaves $ad - bc$ on the diagonal, giving

   $$
   A\,\operatorname{adj}(A) \;=\; \operatorname{adj}(A)\,A \;=\; \det(A)\,I;
   $$

4. **Universal Cayley–Hamilton identity**: observing $A + \operatorname{adj}(A) = \begin{pmatrix} a+d & 0 \\ 0 & a+d \end{pmatrix} = \operatorname{tr}(A)\,I$ and multiplying on the left by $A$ immediately yields

   $$
   A^2 - \operatorname{tr}(A)\,A + \det(A)\,I \;=\; A\bigl(A + \operatorname{adj}(A) - \operatorname{tr}(A)\,I\bigr) \;=\; \mathbf{0}.
   $$

This two-line polynomial identity connects integer quaternion spinors directly to matrix computation. First, any integer quaternion $q = w + x\mathbf{i} + y\mathbf{j} + z\mathbf{k}$ and its conjugate $\bar{q} = w - x\mathbf{i} - y\mathbf{j} - z\mathbf{k}$ obey $q + \bar{q} = 2w$ and $q\bar{q} = \|q\|^2$, satisfying the exact mirror characteristic equation $q^2 - 2w\,q + \|q\|^2 = 0$: the matrix adjugate $\operatorname{adj}(A)$ is the exact $2\times 2$ twin of quaternion conjugation $\bar{q}$. Second, as formally frozen modulo $5$ in [@thm-ch14-hurwitz-mod5-splitting] of Chapter 14 (where $2^2 \equiv -1 \pmod 5$), the splitting map $\mathbf{i} \mapsto \begin{pmatrix} 2 & 0 \\ 0 & -2 \end{pmatrix}$, $\mathbf{j} \mapsto \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ sends integer quaternions homomorphically into $\mathrm{Mat}_2(\mathbb{F}_5)$, matching squared norm with determinant and $2w$ with trace, and translating the modulo-$5$ divisibility gate on `psiXY` versus `psiYX` directly into a $2\times 2$ zero-matrix test.

All four $2\times 2$ integer matrix laws above—trace cyclicity, determinant multiplicativity, the bilateral adjugate identities, and the universal Cayley–Hamilton identity—are frozen as D5 declarations with strict measurements (`strict_omega.axioms: []`):

::: {.theorem #thm-ch16-mat2-cayley-hamilton title="Trace Cyclicity, Determinant Multiplicativity, Adjugate Identities, and Cayley–Hamilton for 2×2 Integer Matrices" lean="D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.trace_mul_comm D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.mat2_det_mul D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.adjugate_identities D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.cayley_hamilton"}
Over the $2\times 2$ integer matrix structure `Omega.Mat2` used by the cited D5 results (`strict_omega.axioms: []`), with product `A.mul B`, scalar multiplication `Mat2.scale`, identity `Mat2.one`, zero matrix `Mat2.zero`, trace `A.trace := a + d`, determinant `A.det := ad - bc`, and adjugate `A.adj := ⟨d, -b, -c, a⟩`, all four identities hold universally for all `A, B : Mat2`:

1. **Trace cyclicity** (`trace_mul_comm`):

   $$
   (A.\mathrm{mul}\;B).\mathrm{trace} = (B.\mathrm{mul}\;A).\mathrm{trace};
   $$

2. **Determinant multiplicativity** (`mat2_det_mul`):

   $$
   (A.\mathrm{mul}\;B).\mathrm{det} = A.\mathrm{det}.\mathrm{mul}\;B.\mathrm{det};
   $$

3. **Bilateral adjugate identities** (`adjugate_identities`):

   $$
   A.\mathrm{mul}\;A.\mathrm{adj} = \mathrm{Mat2.scale}\;A.\mathrm{det}\;\mathrm{Mat2.one}
   \qquad \text{and} \qquad
   A.\mathrm{adj}.\mathrm{mul}\;A = \mathrm{Mat2.scale}\;A.\mathrm{det}\;\mathrm{Mat2.one};
   $$

4. **Universal Cayley–Hamilton identity** (`cayley_hamilton`):

   $$
   \bigl((A.\mathrm{mul}\;A).\mathrm{sub}\;(\mathrm{Mat2.scale}\;A.\mathrm{trace}\;A)\bigr).\mathrm{add}\;(\mathrm{Mat2.scale}\;A.\mathrm{det}\;\mathrm{Mat2.one}) = \mathrm{Mat2.zero}.
   $$

:::

::: {.proof}
For the first identity, expanding both traces to $(ae + bg) + (cf + dh)$ and $(ea + fc) + (gb + hd)$ matches immediately by integer commutativity and associativity (`Int.add_add_add_comm` and `Int.mul_comm`). For the second identity, expanding both $(ae + bg)(cf + dh)$ and $(af + bh)(ce + dg)$ via the four-term distributive lemma `expand`, cancelling the shared cross term $(ac)(ef) + (bd)(gh)$ via `sub_common_left`, and factoring the remaining four terms $(ad)(eh) + (bc)(fg) - \bigl((ad)(fg) + (bc)(eh)\bigr)$ into $(ad - bc)(eh - fg) = A.\mathrm{det}\cdot B.\mathrm{det}$ completes the proof purely in integer ring arithmetic. For the third identity, matrix extensionality `Mat2.ext` checks all four coordinates of both $A\operatorname{adj}(A)$ and $\operatorname{adj}(A)A$: off-diagonal entries cancel by additive inverses to $0 = \det(A)\cdot 0$, and diagonal entries reduce to $ad - bc = \det(A)\cdot 1$. For the fourth identity, `Mat2.ext` reduces the off-diagonal coordinates via $(ab + bd) - (a + d)b + \det(A)\cdot 0 = 0$ and the diagonal coordinates via $((a^2 + bc) - (a + d)a) + (ad - bc) = 0$ (and symmetrically with $a, d$ swapped) using only integer distributivity and additive inverses in `OmegaInit` and `OmegaMath`. The full proof is checked by the Lean kernel.
:::

::: {.example #ex-om-ch16-mat2-numeric-audit title="Explicit Integer Check of the Four Mat2 Ring Laws"}
Take $A = \begin{pmatrix} 2 & 3 \\ 1 & 4 \end{pmatrix}$ and $B = \begin{pmatrix} 1 & -2 \\ 5 & 3 \end{pmatrix}$ (`hand derivation`):

- $\operatorname{tr}(A) = 6$, $\det(A) = 8 - 3 = 5$; $\operatorname{tr}(B) = 4$, $\det(B) = 3 - (-10) = 13$;
- The products $AB = \begin{pmatrix} 17 & 5 \\ 21 & 10 \end{pmatrix}$ and $BA = \begin{pmatrix} 0 & -5 \\ 13 & 27 \end{pmatrix}$ share $\operatorname{tr}(AB) = \operatorname{tr}(BA) = 27$ and satisfy $\det(AB) = 170 - 105 = 65 = 5 \times 13 = \det(A)\det(B)$;
- With $A^2 = \begin{pmatrix} 7 & 18 \\ 6 & 19 \end{pmatrix}$, Cayley–Hamilton gives $A^2 - 6A + 5I = \begin{pmatrix} 7-12+5 & 18-18 \\ 6-6 & 19-24+5 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$ with zero division, zero radicals, and zero axioms.
:::

::: {.remark #rem-om-ch16-literature-boundaries title="Literature Results and Epistemic Boundaries"}
**Literature results, not formalized in this book.** Classical scalar FRACTRAN and its Turing completeness via two-counter machines are due to J. H. Conway ("FRACTRAN: A Simple Universal Programming Language for Arithmetic," in *Open Problems in Communication and Computation*, Springer, 1987, pp. 4–26) and M. L. Minsky (*Ann. of Math.* **74**, 437–455, 1961); arithmetic factorization in the maximal Hurwitz order $\mathcal{H}(\mathbb{Z})$ originates with A. Hurwitz (*Nachr. Ges. Wiss. Göttingen*, 313–340, 1896). Within this chapter, [@thm-om-ch16-signed-prime-ledger] and [@thm-om-ch16-binary-name-compare] are frozen **`LEAN ✓`** declarations on `trureturing@dev`, while [@thm-ch16-scalar-fractran-semantics], [@thm-ch16-p-omega-halts-at-22], [@thm-ch16-quaternion-fractran-gate], and [@thm-ch16-mat2-cayley-hamilton] anchor scalar FRACTRAN exact semantics and halting stability, the exact 15-transition trace of $P_\Omega$ from $2^{17}$ first halting at $22$, non-Abelian quaternion gate determinism and modulo-$5$ `psiXY`/`psiYX` word-order separation, and all four `Mat2` laws (trace cyclicity, determinant multiplicativity, bilateral adjugate identities, and Cayley–Hamilton) as zero-axiom frozen **`LEAN ✓`** D5 declarations using `OmegaInit` and `OmegaMath` (`strict_omega.axioms: []`); the five-prime exponent decomposition in [@ex-om-ch16-sixteen-state-fractran-trace], the coordinatewise expansion and companion `gateUnwindX` check in [@ex-om-ch16-nonabelian-stack-proof], and the concrete numerical check [@ex-om-ch16-mat2-numeric-audit] are exact integer **`hand derivations`**; and interpreting non-Abelian $\Omega$-FRACTRAN as the observer's native ISA is marked **`MODEL`**.
:::

The short film below runs the chapter's three machines in turn: scalar FRACTRAN, the non-Abelian divisibility gate, and the $2\times 2$ integer matrix ring.

::: {.film src="the-spinor-machine"}
**A number remembers how much; an integer quaternion spinor also remembers which came first (2 min 49 s).** Scalar FRACTRAN keeps one positive integer and multiplies it by the first fraction that keeps it whole; factored, the five prime registers $2, 3, 5, 7, 11$ appear as cyan columns of cells, the update vector $(-2, +1, 0, 0, 0)$ of $\frac{3}{4}$ takes two cells from column 2 and adds one to column 3, and the divisibility guard says no register may drop below zero (the magenta dashed cell). A sixteen-row ledger steps beside the registers: $P_\Omega$ runs from $2^{17} = 131{,}072$ through $15$ transitions to $22 = 2 \cdot 11$, with $17 = 16 + 1$ (computed on screen, row for row as in [@ex-om-ch16-sixteen-state-fractran-trace]); the green tags refer to [@thm-ch16-p-omega-halts-at-22] and to halting stability in [@thm-ch16-scalar-fractran-semantics]. $3 \cdot 5 = 5 \cdot 3$ erases order, the flag primes are schematic, and the double encoding of the integer quaternion state is a `MODEL` (violet). $X = 1 + 2\mathbf{i}$ and $Y = 1 + 2\mathbf{j}$ give $XY = (1, 2, 2, 4)$ and $YX = (1, 2, 2, -4)$, drawn as a cyan and a magenta imaginary-part arrow of equal squared length $25$; the gate multiplies on the right by $1 - 2\mathbf{j}$ and divides by $5$: the cyan lane gives $(5, 10, 0, 0)$, all remainders zero, and passes back to $X$, while the magenta lane gives $(5, -6, 0, -8)$ with remainders $(0, 4, 0, 2)$ and is stamped BLOCKED; the gate $1 - 2\mathbf{i}$ unwinds $YX$ to $Y$ ([@ex-om-ch16-nonabelian-stack-proof]; the last-in-first-out reading is a `MODEL`), and the green tag refers to [@thm-ch16-quaternion-fractran-gate]. Finally, for $A = \begin{pmatrix} 2 & 3 \\ 1 & 4 \end{pmatrix}$ and $B = \begin{pmatrix} 1 & -2 \\ 5 & 3 \end{pmatrix}$, $AB$ and $BA$ share trace $27$, $\det(AB) = 65 = 5 \times 13$, and $A^2 - 6A + 5I$ is the amber zero matrix ([@ex-om-ch16-mat2-numeric-audit], computed on screen); the green tags refer to [@thm-ch16-mat2-cayley-hamilton].
:::

Test the chapter's scalar rational execution and $2\times 2$ integer matrix algebra side by side in the interactive lab card below: step through all $15$ active divisibility transitions of Conway's four-gate program $P_\Omega$ from $2^{17} = 131{,}072$ to its halting state $22$, and edit integer entries of $A, B \in \mathrm{Mat}_2(\mathbb{Z})$ live to verify trace cyclicity, determinant multiplicativity, bilateral adjugate identities, and universal Cayley–Hamilton cancellation $A^2 - \operatorname{tr}(A)A + \det(A)I = 0$.

::: {.viz src="adelic-arithmetic-observer-lab" preset="scalar-fractran-and-mat2" height="520"}
**Scalar FRACTRAN trace and `Mat2` Cayley–Hamilton lab card (`scalar-fractran-and-mat2`).** Step beat by beat through the $15$ active divisibility transitions of $P_\Omega = [\frac{11}{49}, \frac{7}{25}, \frac{5}{9}, \frac{3}{4}]$ carrying $131{,}072 = 2^{17}$ to its first idempotent halting state $22 = 2 \cdot 11$ across the five prime registers ([@thm-ch16-scalar-fractran-semantics], [@thm-ch16-p-omega-halts-at-22], [@ex-om-ch16-sixteen-state-fractran-trace]), and adjust integer entries of $A, B \in \mathrm{Mat}_2(\mathbb{Z})$ live to verify trace cyclicity $\operatorname{tr}(AB) = \operatorname{tr}(BA)$, determinant multiplicativity $\det(AB) = \det(A)\det(B)$, bilateral adjugate identities $A\operatorname{adj}(A) = \det(A)I$, and the Cayley–Hamilton identity $A^2 - \operatorname{tr}(A)A + \det(A)I = \mathbf{0}$ ([@thm-ch16-mat2-cayley-hamilton], [@ex-om-ch16-mat2-numeric-audit]).
:::

Equipped with a native computational language that fuses orthogonal prime registers with a non-Abelian spinor stack, we now step from the instruction set to the self-contained observer as a whole: when every receivable signal lies inside a boundaryless totality, time, space, gravitational gradients, and inference emerge from a single rational fidelity gradient.
