# 32.8 Zero-Axiom Lean 4 Formalization Architecture (OmegaMath): Pure CIC Kernel, Canonical Integer Projective Ternions, and One-Way Shadow Functor {#sec-ch39-lean4-zero-axiom-omega-math-architecture}

> *“Which declaration uses which axioms? A finite integer check and its classical real counterpart can give different answers in the same Lean kernel.”*

Having established the infinity-free and transcendental-free finite rational mathematics $\mathbf{Math}_\Omega$ in [§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md), we arrive at the decisive formalization and software-architecture question: **to build this edifice inside a modern interactive theorem prover such as Lean 4, must we alter the underlying kernel of Lean 4, declare $\mathrm{AXIOM}\text{-}\Omega$ via the `axiom` keyword, or construct a purely definitional layer atop the existing kernel?**

The executable prototype in §32.8.3 uses Lean’s implicit standard `Init` import. Its finite theorem `omega_zero_axiom_master_check` has an empty axiom closure. The code declares the `OmegaSpace` class and leaves construction of an instance to a separate proof. At the pinned commit [{commit}](trureturing:), strict library replay starts from a selected root such as `OmegaMath.Projective.Circle` and checks its import closure in an empty kernel. On the official backend the real bridge theorem `OmegaShadowBridge.cayley_circle_unit` has three recorded dependencies, `propext`, `Classical.choice` and `Quot.sound`. §32.8.4 extends the framework to the feature-rank-$5$ signed spinor carrier `PythSpinor`, the zero-axiom quadratic extension fields `QSqrt2` and `QPhi`, norm-$5$ LPS free generators with spherical-harmonic Hecke operators and the finite Ramanujan graph $X^{5, 13}$, and arbitrary-order D-finite differential jet rings $J_N(\mathbb{Q})$ with $\pi$-free rational Machin brackets (the three-layer `OmegaMath` architectural synthesis, proof-DAG overhead comparison, and three-step `OmegaCore` engineering roadmap are marked **`MODEL`**; the fifteen core theorems—unit-quaternion isomorphism of rank-five complete ternary comparisons, chord-distance kernel identity, basepoint heap group factorization, identity of the quaternion ray kernel with spinor Born pairing weight, quaternion heap Chebyshev recurrence, Lagrange–Gram identity, attained boundary minimum of the Hermitian Schur complement, unique global linear-isometry extension of Gram-preserving permutations, radical-free rational six-axis open cover of $S^2$, GCD denominator reduction and logarithmic continued-fraction length bound, decidable prime-factor-stripping group-order recovery, explicit step bound for binary name comparison, and exact integer soundness plus limit-free real transport of the quarter-depth budget—are marked green **`LEAN ✓`**; CIC metatheory, Hedberg uniqueness of identity proofs, multi-kernel audit records, the universal written proofs of §32.8.4, and Lean `v4.35.0` together with two-working-precision Arb checks are marked **`ARGUED` / `NUM`**).

::: {.remark #rem-ch39-sister-monograph-omega-math title="Companion Monograph: Complete Six-Volume Omega Math, Four 3D Laboratories, and Reference Appendices"}
This section condenses the `OmegaMath` zero-axiom formalization bridge inside the quantum-geometry narrative. The standalone six-volume companion monograph **[Omega Math (`OMEGA//MATH`) Six-Volume Contents](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/en/SUMMARY.md)** now carries all **18 chapters**, the Coda, and **[Appendix A](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/en/appendix-a.md)** / **[Appendix B](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/en/appendix-b.md)**, integrating **frozen D5 theorems with empty strict axiom records** plus the **11-theorem Layer-2 `OmegaShadowBridge` functor**, **19 bespoke bilingual static figures**, four 3D interactive laboratories (**`OMEGA//SPIN`**, **`OMEGA//LAB`**, **`OMEGA//JET`**, and **`OMEGA//ARC`**, totaling 16 experimental cards), and the bilingual **`overview`** slide deck—spanning bare CIC and homogeneous projective closure, origin-free heaps and constant unit Lie triple curvature, singularity-free dual-chart Cayley rotations, limit-free jets and all-order Cayley–trigonometric unification, all-degree $\pi$-free Peter–Weyl spherical harmonics, the Hurwitz free group $F_3$ and norm-$5$ rational Hecke–Ramanujan spectra, $\Omega$-FRACTRAN spinor machines, and empty-kernel auditing—culminating in **[Chapter 18 Empty-Kernel Auditing, the One-Way Shadow Functor, and the Six-Volume Workbench](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/en/ch18-zero-axiom-kernel-and-shadow-bridge.md)**.
:::

---

## 32.8.1 Core Criterion: Why Bare Lean 4 CIC Matches $\mathbf{Math}_\Omega$, While Pollution Enters Only Through `Mathlib.Real` or Custom `axiom` Declarations {#sec-ch39-lean4-cic-vs-mathlib-real-and-axiom-trap}

Separating Lean 4 into its **underlying verification kernel (CIC)** and its **upper classical-analysis library (`Mathlib.Real`)** reveals two sharply distinct mathematical philosophies:

1. **Bare Lean 4 CIC Is Natively Free of Completed Infinity, Transcendentals, and Built-In Choice**:
   Prior to importing `Mathlib.Data.Real.Basic`, the core type-theoretic kernel of Lean 4 consists solely of dependent function types ($\Pi$-types), universe levels, and inductive definitions (`inductive`) governed by deterministic $\beta\delta\iota\zeta$-reduction. Inside bare CIC, `Nat` and `Int` are not static Cantorian bags pre-populated with $\aleph_0$ completed elements, but finite inductive syntax trees; the kernel contains neither the real continuum $\mathbb{R}$, nor $\infty$, $\pi$, or $e$, nor built-in excluded middle or Choice inside its reduction machine.
   Going one step deeper under `PROJECT.md` §13, running `#print axioms` directly in Lean `v4.35.0` on `Init` uncovers a critical compiler fact (`NUM` / `hand derivation`): `Nat.gcd`, `Int.natAbs`, `Int.instDiv`, and the propositional decidable comparisons `Int.decEq` (`=` / `≠`) and `Int.decLt` (`>`) depend on **zero axioms**; by contrast, the standard `Init` type `Rat` bundles a `Prop` coprimality proof whose arithmetic operations `Rat.add`, `Rat.mul`, and `Rat.div` pull in `[propext, Classical.choice, Quot.sound]` (`Rat.inv` pulls in `[propext, Quot.sound]`). The function `fun (a b : Int) => a == b` depends on the three standard axioms. The function `fun (a b : Rat) => a == b` has an empty axiom closure. `Rat.add`, `Rat.mul`, `Rat.div`, and `Rat.inv` all stall kernel `by decide` reduction! Defining a fourteen-line pure data structure `QRat` (`num : Int`, `den : Nat` normalized via `Nat.gcd`) with propositional `Decidable` branches `if d = 0 ∨ n = 0` eliminates every hidden classical dependency and achieves literal **zero-axiom** reduction.
2. **Where Does the “Linear and Completed-Infinity Tax” of `Mathlib.Real` Come From?**:
   To reconstruct nineteenth-century Cauchy–Weierstrass analysis, `Mathlib` constructs `Real` as the quotient of rational Cauchy sequences modulo null sequences, pulling in all three standard classical axioms `{propext, Classical.choice, Quot.sound}`—above all **non-constructive `Classical.choice`** (`ARGUED`, cf. the classical-analysis audit receipts documented in `PROJECT.md` §14). Touching `Classical.choice` exacts two immediate engineering tolls:
   - **Computational paralysis (`noncomputable` contagion and `decide` stall)**: While pure rational numerals such as `#eval (1 + 1 : ℝ)` merely print a formal Cauchy-sequence wrapper, no executable bytecode can be extracted from non-constructive Choice; real division `(1 / 2 : ℝ)`, square roots `Real.sqrt`, Lie-group exponentials `NormedSpace.exp`, real derivatives, smooth manifolds, and Hilbert-space operators become marked `noncomputable`—blocking native C/machine-code evaluation (`#eval`) while `Classical.choice` simultaneously stalls kernel reflection (`by decide`);
   - **Proof-DAG blowup (declaration-closure and filter-convergence tax, `MODEL` engineering analysis paired with `NUM` census)**: Measuring proof declaration closures in Lean `v4.35.0` across our four benchmark tasks (`{0,1/2,1} & 3-Beat Closure`, `Non-Abelian Triad Holonomy`, `Jet2 Algebraic Curvature`, and `Rational Gram–Schur & Depth Certificate`), the zero-axiom `OmegaMath` stack requires only **`396 / 372 / 379 / 380`** declarations with `#print axioms = ∅`, whereas representative `Mathlib.Real` proofs pull in **`7,480 / 7,144 / 17,786 / 7,395`** declarations with `{propext, Classical.choice, Quot.sound}`—with Task 3's real derivative alone dragging in `Filter.Tendsto` and jumping to `17,786` declarations.
3. **Why Declaring $\mathrm{AXIOM}\text{-}\Omega$ via the `axiom` Keyword Is Strictly Forbidden**:
   Writing `axiom Ternion : Type` or `axiom kappa_refl : ∀ x, kappa x x = 1` directly into Lean 4 detonates two fatal landmines:
   - **Destroying consistency guarantees and failing independent kernel audits**: The Lean kernel trusts every `axiom` unconditionally. Omitting even a single boundary side-condition—for instance, asserting `axiom kappa_refl : ∀ x : ProjTernion, kappa x x = ⟨1, 1⟩` over raw quadruples without excluding the zero tuple $o_{\mathrm{zero}} = (0,0,0,0)$, where `kappa 0 0` evaluates to `⟨0, 1⟩`—derives `⟨0, 1⟩ = ⟨1, 1⟩` and hence `False` in three lines! Simultaneously, `#print axioms` and independent kernel checkers (`lean4lean`, `nanoda`, `con-leche`, `comparator`) flag every non-standard `axiom`;
   - **Freezing kernel $\iota$-reduction**: An `axiom` constant possesses no computation rule, turning every expression containing it into an irreducible neutral term and severing the Curry–Howard unity of proof and executable program.

Changing the common unit for two integer coordinates should preserve their projective readout. This example illustrates the book’s “Axiom-free” label. It records an empty transitive axiom closure for the frozen declaration. Proofs using either the official libraries or OmegaMath can carry this label.

::: {.theorem #thm-ch32-projective-overlap-positive-scaling title="Positive integer scaling preserves projective overlap" lean="D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale"}
Let $p,q,k$ be natural numbers and $s=k+1$. Write $\kappa(p,q)$ for the ratio with numerator $q^2$ and denominator $p^2+q^2$, taking the undefined value when the denominator is zero. Then $\kappa(ps,qs)$ and $\kappa(p,q)$ are equivalent under `Omega.Ratio.Equivalent`.
:::

::: {.proof}
Scaling multiplies both numerator and denominator by $s^2$. When the denominator is positive, the two cross products are equal. When $p=q=0$, both readings are undefined and hence equivalent by definition. The full proof is checked by the Lean kernel.
:::

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="cic-kernel-vs-axiom-and-real-tax" height="500"}
**Five-stage compilation and audit.** On the cyan route, the prototype uses implicit standard `Init`. At stage four, `#print axioms omega_zero_axiom_master_check` reports an empty list for the theorem covering eight finite assertions. The other lanes illustrate a custom axiom with a zero-tuple counterexample and classical real arithmetic. The official real circle bridge uses `propext`, `Classical.choice` and `Quot.sound`.
:::

---

## 32.8.2 Integer Carriers, Model Interfaces and the Real Bridge in Lean 4 {#sec-ch39-omega-math-three-layer-zero-axiom-stack}

The same `OmegaMath` library source compiles against the strict and standard backends. Empty-kernel replay covers the import closure of selected strict library roots. D5 declarations are checked by paired builds, interface comparison, and per-backend measurements. The book’s theorem badges use the official frozen records. Several D5 theorems compiled against the standard backend use Lean's standard propositional extensionality axiom, `propext`. [OmegaMath modules and verification](https://github.com/the-omega-institute/trureturing/blob/dev/src/README.md)

Layer 0 supplies integer carriers, Layer 1 specifies transport and reading laws, and Layer 2 maps results into classical real analysis. The table compares this architectural model with measurements for the named declarations.

| Architectural Dimension | Flawed Route: Raw `axiom` Declarations | Classical Route: `Mathlib.Real` Stack | Constructive Route: Integer Prototype |
| :--- | :--- | :--- | :--- |
| **`#print axioms`** | Lists any custom axiom used by the proof | Official `OmegaShadowBridge.cayley_circle_unit` uses `propext`, `Classical.choice` and `Quot.sound` | `omega_zero_axiom_master_check` uses implicit standard `Init` and has an empty axiom list |
| **Executability (`#eval`)** | Completely blocked; irreducible constants | Real division, manifolds, and transcendentals marked `noncomputable` | **$100\%$ compilable to native C / machine code** |
| **3D Ternions & Poles** | Coordinate-free symbols; boundary slip proves `False` | Submanifolds of $\mathbb{R}^4$, $\pi$, square roots, and chart atlases | **Raw integer quadruples `ProjTernion` and normalized nonzero representatives `CanonProjTernion` (zero singularities, zero radicals)** |
| **Calculus & Curvature** | Requires hand-axiomatized derivative operators | `Filter.Tendsto` infinitesimal limits and chart transitions | **Second-order rational jet ring $\mathbb{Q}[\eta]/(\eta^3)$ by pure field arithmetic** |
| **Automated Proof-Search Efficiency** | No computational reduction; vulnerable to false subgoals | Side-goals dominated by continuity, differentiability, and measurability filters | **Core rational geometry, jets, and finite certificates closed in one step by `decide`** |

### 32.8.2.1 Layer 0: Canonical Integer Projective Carrier `CanonProjTernion` Eliminating `Quot.sound` {#sec-ch39-layer0-projternion-zero-quotient}

Whereas two-chart Rodrigues parameters in [§31.5](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md) and [§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md) still switch charts across the antipodal equator, Layer 0 models **homogeneous projective ternion space $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$** directly by nonzero integer quadruples modulo rational scaling—eliminating even the quotient axiom `Quot.sound` via a **unique canonical integer normal form** (`hand derivation`):

- **Exact 3 Degrees of Freedom, Unique Integer Normal Form, and Global Zero Singularities**: For any nonzero $(w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$, divide by $g = \gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert) \ge 1$ to obtain coprime $(w', x', y', z')$ and multiply by $s \in \{\pm 1\}$ so that the **first nonzero entry is strictly positive**. Every projective ternion ray in $\mathbb{QP}^3$ now carries a **unique canonical integer 4-tuple** whose equality is decided with zero axioms by `deriving DecidableEq` (bypassing `Quotient` and `Quot.sound` completely):
  - Past halted anchor ($s = 0, \kappa = 1$): `p0 = (1, 0, 0, 0)`;
  - Present orthogonal equator ($s = 1/2, \kappa = 1/2$): `pHalf = (1, 1, 0, 0)`;
  - Future antipodal closure pole $[1 : 0]$ (classical $\infty$, $s = 1, \kappa = 0$): the ordinary integer tuple `pInf = (0, 1, 0, 0)`!
- **Eliminating Even $\sqrt{2}$ in Born Fidelity $\kappa$ and Adjoint Rotations $\mathrm{Ad}(p) \in \mathrm{SO}(3, \mathbb{Q})$**:
  Observe an exact algebraic sharpening (`PROJECT.md` §13): forcing spinors onto the unit sphere before computing observables would force even the $90^\circ$ equatorial state `pHalf = (1, 1, 0, 0)` (whose squared norm $\lVert p_{\mathrm{Half}}\rVert^2 = 1^2 + 1^2 = 2$ is non-square!) to introduce the irrational radical $\frac{1 + \mathbf{i}}{\sqrt{2}}$. On nonzero homogeneous representatives, both observables and 3D rotations **square away all radicals automatically**:
  1. Born ray fidelity divides squared inner product by the product of squared norms:
     $$
     \kappa(p, q) \;=\; \frac{\langle p, q\rangle^2}{\lVert p\rVert^2\,\lVert q\rVert^2} \;\in\; \mathbb{Q} \cap [0, 1],
     $$
     giving $\kappa(p_0, p_{\mathrm{Half}}) = \frac{1^2}{1 \times 2} = \mathbf{\frac{1}{2}}$ with zero radicals;
  2. The 3D adjoint rotation $\mathrm{Ad}(p)(\mathbf{v}) = \frac{p\,\mathbf{v}\,\bar{p}}{\lVert p\rVert^2}$ divides by the unsquared integer $\lVert p\rVert^2 \in \mathbb{Z}_{\ge 1}$, so **every** nonzero integer quadruple $p \in \mathbb{Z}^4 \setminus \{0\}$ (even when $\lVert p\rVert^2 = 2$ is not a square!) induces an exact rational rotation matrix $\mathrm{Ad}(p) \in \mathrm{SO}(3, \mathbb{Q})$—for `pHalf = (1,1,0,0)`, the integer $90^\circ$ rotation $(x, y, z) \mapsto (x, -z, y) \in \mathrm{SO}(3, \mathbb{Z})$!
  3. By Euler–Lagrange four-square norm multiplicativity $\lVert p \cdot q\rVert^2 = \lVert p\rVert^2\,\lVert q\rVert^2$, the ternary transport $t = a \cdot \bar{b} \cdot c$ of any three nonzero integer states satisfies
     $$
     \lVert a \cdot \bar{b} \cdot c\rVert^2 \;=\; \lVert a\rVert^2\,\lVert b\rVert^2\,\lVert c\rVert^2 \;\ge\; 1 \times 1 \times 1 \;=\; 1,
     $$
     so the product stays nonzero. After normalization, the `g120 = (1,1,1,1)` ray returns to `(1,0,0,0)` after three beats. Its rational unit lift $(1,1,1,1)/2$ reaches $-1$ after three beats and $+1$ after six. A primitive ray has a rational unit lift exactly when its squared norm is a square.

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="canonical-proj-ternion-zero-quotient" height="500"}
**Layer 0 Canonical Homogeneous Integer Carrier `CanonProjTernion` (Free of `Quot.sound` and Radicals)**: On the purple `kit.solid` ternion sphere, cyan unnormalized integer rays `(2,2,0,0)` and `(-3,-3,0,0)` collapse via `Nat.gcd` and first-positive sign locking onto the unique canonical anchor `pHalf = (1,1,0,0)` (`‖p‖² = 2`, yielding exact `κ = 1/2 = 0.5000` and integer rotation `Ad(pHalf) ∈ SO(3, ℤ)` without `√2`), alongside `p0 = (1,0,0,0)`, antipodal pole `pInf = (0,1,0,0)` (`κ = 0/1 = 0.0000`, zero division-by-zero), and 3-beat integer rotor `g120 = (1,1,1,1)` (`κ = 1/4 = 0.2500`).
:::

### 32.8.2.2 Layer 1: The `OmegaSpace` Interface and Canonical Representatives {#sec-ch39-layer1-omegaspace-typeclass-consistency}

The illustrative prototype below gives `OmegaSpace` two operations and six fields: two cancellation laws, ternary associativity, reading reflexivity, symmetry and right-transport invariance. Other requirements of AXIOM-Ω, including noncommutativity and positive semidefiniteness of every finite Gram matrix, need separate proofs.

The derivation uses a canonical representative on each nonzero rational ray (`hand derivation`).

- On the unbundled raw record `ProjTernion` ($\mathbb{Z}^4$), although `normalize` totalizes all operations (sending `(0,0,0,0)` to `(1,0,0,0)` and scaling `(2,0,0,0)` to `(1,0,0,0)`), universally quantified `OmegaSpace` equations fail on two raw boundary classes: the zero tuple $z_0 = (0,0,0,0)$ (`kappa z0 z0 = ⟨0, 1⟩ ≠ ⟨1, 1⟩` and `triad p0 p0 z0 = p0 ≠ z0`) and non-reduced multiples $z_2 = (2,0,0,0)$ (`triad p0 p0 z2 = p0 ≠ z2`);
- Each nonzero ray has a unique primitive representative with first nonzero coordinate positive. Define the product on these representatives by normalizing $a\bar b c$. Absorption follows from $b\bar b=\lVert b\rVert^2$, and associativity follows from quaternion associativity on rays and uniqueness of the representative. The squared inner-product reading is symmetric and reflexive. Common right multiplication by $\bar u v$ scales each squared norm and the inner product by the same factor $\lVert u\rVert^2\lVert v\rVert^2$, preserving the reading.

The prototype declares the six fields and checks eight concrete equalities or inequalities by computation, including a noncommuting pair. A formal instance would also require proofs of the six fields for all inputs. The second-order rational jet ring `Jet2Rat` ($\mathbb{Q}[\eta]/(\eta^3)$) computes exact two-term inverses $(a_0 + a_1\eta + a_2\eta^2)^{-1}$ whenever the unit condition $j_0 \neq 0$ holds—which for $1 + x_0^2 \ge 1 > 0$ holds at every $x_0 \in \mathbb{Q}$—allowing `by decide` to verify second-order curvature in a single kernel step.

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="typeclass-consistency-and-jet2-decide" height="500"}
**Finite ternion and `Jet2Rat` checks by `decide`**: Step across all eight conjuncts of `omega_zero_axiom_master_check` on the purple `kit.solid` ternion sphere—rational fidelity spectrum `{1, 1/2, 0, 1/4}`, 3-beat return `gStep3 = p0`, left idempotence `triad pHalf pHalf g120 = g120`, non-abelian integer synthesis `(1,1,1,1) ≠ (1,1,1,-1)`, and exact jet output `{1/2, -1/2, +1/4}` at `x₀ = 1`—while toggling the `CanonProjTernion` guard that blocks raw `(0,0,0,0)` and `(2,0,0,0)` counterexamples.
:::

### 32.8.2.3 Layer 2: One-Way Shadow Functor $\Pi_{\mathbb{R}}$ into `Mathlib` (No Isolated Island) {#sec-ch39-layer2-mathlib-shadow-functor}

Building a zero-axiom `OmegaMath` core never isolates us from the broader `Mathlib` ecosystem. Because $\mathrm{SO}(3, \mathbb{Q})$ induced by `CanonProjTernion` is norm-dense in $\mathrm{SO}(3, \mathbb{R})$ (and Cayley rational points $Q(\mathbb{Q}^3) = S^3(\mathbb{Q}) \setminus \{-1\}$ are dense in $S^3(\mathbb{R}) \cong \mathrm{SU}(2)$), Layer 2 erects a thin **one-way shadow projection functor**:

$$
\Pi_{\mathbb{R}} \;:\; \mathbf{OmegaMath}\text{ (zero-axiom executable core)} \;\longrightarrow\; \mathbf{Mathlib}\text{ (classical real-analysis shell)}.
$$

Under this division of labor, non-abelian ternion heap geometry, second-order curvature jets, rational block-Gram Schur complements $S = A - B C^{-1} B^\top$, and integer depth certificates such as `rationalQuarterDepth` ($c q < d p \cdot 4^{N+1}$) execute inside the zero-axiom `OmegaMath` core via `#eval` and `decide`; only when a final classical-analysis statement over $\mathbb{R}$ or $\mathbb{C}$ is required does a one-way soundness bridge—exemplified in frozen form by `rationalQuarterDepth_integer_sound` $\Rightarrow$ `rationalQuarterDepth_real_sound`—project the certified rational bound into `Mathlib` without a single limiting argument polluting the core.

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="rational-schur-and-shadow-functor-bridge" height="500"}
**Layer 2 Rational Schur Complement Certificate and One-Way Shadow Functor $\Pi_{\mathbb{R}} : \mathbf{OmegaMath} \to \mathbf{Mathlib}$**: On the left, the purple rational ternion sphere and cyan Gram ellipsoid compute the exact rational Schur minimum $S = A - B C^{-1} B^\top$ and integer quarter-depth certificate $c q < d p \cdot 4^{N+1}$ (`axioms = ∅`); on the right, the amber one-way bridge $\Pi_{\mathbb{R}}$ transports the bound without limits to `(1/4)^(N+1) C < p/q` on the classical continuum shell.
:::

---

## 32.8.3 Executable Lean 4 Prototype with Standard `Init` (Verified on `v4.35.0`) and Three-Step `OmegaCore` Roadmap {#sec-ch39-lean4-zero-axiom-executable-prototype}

Lean `v4.35.0` automatically imports standard `Init` because this file has no `prelude` directive. The code uses its `Int`, `Nat` and `Nat.gcd` to implement `QRat`, raw integer quadruples `ProjTernion` and second-order jets `Jet2Rat`. It also declares the fields of `OmegaSpace`. The separate theorem `omega_zero_axiom_master_check` proves a finite conjunction by `decide`, including the fidelity values, three-beat return, noncommuting pair and jet at $x_0=1$. Running `#print axioms omega_zero_axiom_master_check` reports **`does not depend on any axioms`**.

```lean
/-- 1. Zero-axiom reduced rationals QRat (pure Int × Nat normal form, bypassing classical proofs inside Init Rat) -/
structure QRat where
  num : Int
  den : Nat
  deriving Repr, DecidableEq

namespace QRat

def mkNorm (n d : Int) : QRat :=
  if d = 0 ∨ n = 0 then ⟨0, 1⟩
  else
    let dn : Nat := d.natAbs
    let g : Nat := Nat.gcd n.natAbs dn
    let s : Int := if d > 0 then n else -n
    ⟨s / (g : Int), dn / g⟩

def ofInt (n : Int) : QRat := ⟨n, 1⟩
def add (a b : QRat) : QRat := mkNorm (a.num * b.den + b.num * a.den) (a.den * b.den)
def sub (a b : QRat) : QRat := mkNorm (a.num * b.den - b.num * a.den) (a.den * b.den)
def mul (a b : QRat) : QRat := mkNorm (a.num * b.num) (a.den * b.den)
def inv (a : QRat) : QRat := mkNorm a.den a.num

end QRat

/-- 2. Raw integer tuples. Normalizing a nonzero tuple selects its canonical ray representative. -/
structure ProjTernion where
  w : Int
  x : Int
  y : Int
  z : Int
  deriving Repr, DecidableEq

namespace ProjTernion

/-- GCD reduction with first nonzero coordinate positive, eliminating Quot.sound via unique normal form -/
def normalize (w x y z : Int) : ProjTernion :=
  let g : Nat := Nat.gcd (Nat.gcd w.natAbs x.natAbs) (Nat.gcd y.natAbs z.natAbs)
  if g = 0 then ⟨1, 0, 0, 0⟩
  else
    let gc : Int := g
    let (w', x', y', z') := (w / gc, x / gc, y / gc, z / gc)
    let s : Int :=
      if w' ≠ 0 then (if w' > 0 then 1 else -1)
      else if x' ≠ 0 then (if x' > 0 then 1 else -1)
      else if y' ≠ 0 then (if y' > 0 then 1 else -1)
      else (if z' > 0 then 1 else -1)
    ⟨s * w', s * x', s * y', s * z'⟩

def qmulRaw (a b : ProjTernion) : ProjTernion :=
  ⟨a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
   a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
   a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
   a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w⟩

def qconj (a : ProjTernion) : ProjTernion := ⟨a.w, -a.x, -a.y, -a.z⟩

/-- Origin-free ternary comparison transport [a, b, c] ≡ normalize (a · b̄ · c) -/
def triad (a b c : ProjTernion) : ProjTernion :=
  let t := qmulRaw (qmulRaw a (qconj b)) c
  normalize t.w t.x t.y t.z

def dot (a b : ProjTernion) : Int :=
  a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z

/-- Radical-free rational Born fidelity κ(a, b) = ⟨a, b⟩² / (‖a‖² · ‖b‖²) ∈ ℚ ∩ [0, 1] -/
def kappa (a b : ProjTernion) : QRat :=
  QRat.mkNorm (dot a b * dot a b) (dot a a * dot b b)

end ProjTernion

/-- 3. `{0, 1/2, 1}` second-order algebraic jet ring ℚ[η]/(η³): exact limit-free calculus -/
structure Jet2Rat where
  j0 : QRat
  j1 : QRat
  j2 : QRat
  deriving Repr, DecidableEq

namespace Jet2Rat

instance : Add Jet2Rat where
  add a b := ⟨QRat.add a.j0 b.j0, QRat.add a.j1 b.j1, QRat.add a.j2 b.j2⟩

instance : Mul Jet2Rat where
  mul a b := ⟨QRat.mul a.j0 b.j0,
              QRat.add (QRat.mul a.j0 b.j1) (QRat.mul a.j1 b.j0),
              QRat.add (QRat.add (QRat.mul a.j0 b.j2) (QRat.mul a.j1 b.j1)) (QRat.mul a.j2 b.j0)⟩

/-- Exact two-term rational inverse (a₀ + a₁η + a₂η²)⁻¹ (satisfying a * inv a = 1 whenever j₀ ≠ 0) -/
def inv (a : Jet2Rat) : Jet2Rat :=
  let i0 := QRat.inv a.j0
  let u1 := QRat.mul a.j1 i0
  let u2 := QRat.mul a.j2 i0
  ⟨i0, QRat.sub (QRat.ofInt 0) (QRat.mul i0 u1), QRat.mul i0 (QRat.sub (QRat.mul u1 u1) u2)⟩

def kappaJetAt (x0 : QRat) : Jet2Rat :=
  let x : Jet2Rat := ⟨x0, QRat.ofInt 1, QRat.ofInt 0⟩
  inv (⟨QRat.ofInt 1, QRat.ofInt 0, QRat.ofInt 0⟩ + x * x)

end Jet2Rat

/-- 4. Illustrative interface for six equations on ternary transport and fidelity. -/
class OmegaSpace (M : Type) where
  triad : M → M → M → M
  kappa : M → M → QRat
  idemp_left  : ∀ x z, triad x x z = z
  idemp_right : ∀ x z, triad x z z = x
  assoc_triad : ∀ x y z u v, triad (triad x y z) u v = triad x y (triad z u v)
  kappa_refl  : ∀ x, kappa x x = ⟨1, 1⟩
  kappa_symm  : ∀ x y, kappa x y = kappa y x
  kappa_inv   : ∀ x y u v, kappa (triad x u v) (triad y u v) = kappa x y

/-- 5. Zero-axiom kernel reflection check: {0,1/2,1} landmarks, 3-beat closure, non-commutativity, and 2-jet calculus -/
theorem omega_zero_axiom_master_check :
    let p0    : ProjTernion := ⟨1, 0, 0, 0⟩   -- Past anchor (s=0, κ=1)
    let pHalf : ProjTernion := ⟨1, 1, 0, 0⟩   -- Present orthogonal equator (s=1/2, κ=1/2)
    let pInf  : ProjTernion := ⟨0, 1, 0, 0⟩   -- Future antipodal pole [1:0] (classical ∞, s=1, κ=0)
    let qHalf : ProjTernion := ⟨1, 0, 1, 0⟩   -- Second orthogonal arc
    let g120  : ProjTernion := ⟨1, 1, 1, 1⟩   -- Pure-integer 120° rotor (κ=1/4)
    let gStep2 := ProjTernion.triad g120 p0 g120
    let gStep3 := ProjTernion.triad gStep2 p0 g120
    ProjTernion.kappa p0 p0 = ⟨1, 1⟩ ∧
    ProjTernion.kappa p0 pHalf = ⟨1, 2⟩ ∧
    ProjTernion.kappa p0 pInf = ⟨0, 1⟩ ∧
    ProjTernion.kappa p0 g120 = ⟨1, 4⟩ ∧
    gStep3 = p0 ∧
    ProjTernion.triad pHalf pHalf g120 = g120 ∧
    ProjTernion.triad pHalf p0 qHalf ≠ ProjTernion.triad qHalf p0 pHalf ∧
    Jet2Rat.kappaJetAt ⟨1, 1⟩ = ⟨⟨1, 2⟩, ⟨-1, 2⟩, ⟨1, 4⟩⟩ := by
  decide

-- Ultimate axiom audit: outputs "'omega_zero_axiom_master_check' does not depend on any axioms"
#print axioms omega_zero_axiom_master_check
```

In concrete formalization engineering, the `OmegaMath` program advances in three disciplined steps (`MODEL` roadmap):

1. **Step 1. Executable arithmetic in `OmegaCore`.** Build the carriers and operations exemplified above with standard `Init`. Check each finite benchmark with `decide` and read the axiom closure of the resulting theorem.
2. **Step 2 (Rational Gram–Schur & Heap Geodesic Layer)**: Implement exact rational Cholesky / Schur-complement positivity certificates, continued-fraction convergents, and prime-factor order stripping atop `OmegaCore`, replacing limit-filter proof search with high-speed kernel reduction (`decide`);
3. **Step 3 (One-Way Shadow Bridge $\Pi_{\mathbb{R}}$ into `Mathlib`)**: Export classical real-analysis corollaries at the outer boundary via rational rotation density and exact integer-to-real soundness theorems (`rationalQuarterDepth_integer_sound` $\to$ `rationalQuarterDepth_real_sound`).

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="three-step-omegacore-roadmap-benchmark" height="500"}
**Four Mathematical-Physics Tasks and `OmegaCore` Three-Step Benchmark**: Switch across four canonical tasks (`{0,1/2,1} & 3-Beat Closure`, `Non-Abelian Triad Holonomy`, `Jet2 Algebraic Curvature`, and `Rational Gram–Schur & Depth Certificate`) and step through the five pipeline stages on the 3D sphere and prism rail, comparing the zero-axiom `OmegaMath` stack (`axioms = ∅`, one-step `decide`, native `#eval`) against `Mathlib.Real` and custom `axiom` routes in axiom count, executability, and proof-DAG nodes.
:::

We now assemble the fifteen frozen theorems anchoring the three-layer `OmegaMath` architecture—ternary quaternion models, rational Gram–Schur algebra, canonical finite arithmetic, explicit step-bounded comparison, and the limit-free integer-to-real soundness bridge:

::: {.theorem #thm-ch39-lean4-zero-axiom-omega-math-foundation title="Quaternion Ternary Model, Rational Canonical Arithmetic, Explicit Step-Bounded Computability, and Limit-Free Integer-to-Real Soundness Bridge" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv, D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq, D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul, D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor, D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev, D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity, D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least, D5/S3/Quantum/AURICOmega/GramIsometryExtension.existsUnique_linearIsometryEquiv_of_gram_preserving, D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover, D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den, D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log, D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct, D5/S0/Computability/BinaryNameComparison.name_compare_run, D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound, D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_real_sound"}
Across ternary comparison model realization, rational Gram–Schur positivity, finite canonical arithmetic, and one-way integer-to-real transport, the following statements hold:

1. **Quaternion Ternary Realization, Ray Born Kernel, and Heap Recurrence** (`exists_unitQuaternion_equiv`, `kappa_eq_one_sub_dist_sq`, `tri_eq_mul_inv_mul`, `rayKernel_eq_bornProbability_spinor`, `normSq_and_chebyshev`): Every noncommutative, chain-connected, zero-touching, feature-rank-$5$, reading-complete ternary comparison system is isomorphic to $\mathrm{Sp}(1)$ with $\kappa(a,b) = 1 - \frac{1}{4}\operatorname{dist}(a,b)^2$ and $[x,y,z] = x \cdot_o y^{-1} \cdot_o z$; the quaternion ray kernel equals both the squared inner-product modulus of two-component spinors and the Born pairing weight of their rank-one density matrices; and a sequence in $\mathbb{H}$ satisfies $x_{n+2} = x_{n+1}\bar{x}_n x_{n+1}$ with unit initial norms if and only if every $x_n$ has unit norm and evolves by Chebyshev polynomials $T_n, U_n$;
2. **Lagrange–Gram Identity, Attained Schur Minimum, and Unique Gram-Preserving Isometry Extension** (`lagrange_gram_identity`, `schur_quadratic_is_least`, `existsUnique_linearIsometryEquiv_of_gram_preserving`): Over any finite index set $s$, $(\sum_{i\in s} u_i^2)(\sum_{i\in s} v_i^2) - (\sum_{i\in s} u_i v_i)^2 = \frac{1}{2}\sum_{i,j\in s}(u_i v_j - u_j v_i)^2$; for any block matrix $\begin{pmatrix} A & B \\ B^{\mathsf{H}} & C \end{pmatrix}$ with $A$ Hermitian and $C$ positive definite, the Schur quadratic form $x^* (A - B C^{-1} B^{\mathsf{H}}) x$ is the least element (`IsLeast`: belonging to the set and at most every element of it) of the set of full quadratic-form values as the internal vector $y \in \mathbb{C}^n$ varies; and any real-inner-product-preserving permutation of a spanning family $\varphi$ in $E$ extends uniquely to a global linear isometric equivalence;
3. **Radical-Free Rational Six-Axis Cover and Finite Canonical Arithmetic** (`rational_six_axis_open_cover`, `reduced_den`, `convergents_length_log`, `stripFactors_correct`): The six squared-norm-$5$ integer axes $(1,\pm 2,0),(0,1,\pm 2),(\pm 2,0,1)$ define open sets $\{x \in S^2 \mid 5 < 2\langle x, \mathrm{axis}_i\rangle^2\}$ covering the real unit two-sphere without orthogonal pairs inside any patch; for $0 < r$, `(reduced s r).den = r / Nat.gcd s r`, and every $x \in \mathbb{Q}$ satisfies $\operatorname{length}(\mathrm{convergents}(x)) \le 2\lfloor\log_2(\operatorname{den}(x))\rfloor + 1$; in any monoid $G$ with decidable equality, if $0 < m$, $x^m = 1$, and $P$ covers all prime divisors of $m$, executable `M := stripFactors x P m` satisfies $0 < M$, $M \mid m$, $x^M = 1$, and $M = \operatorname{orderOf}(x)$;
4. **Explicit Step-Bounded Decidable Comparison and Limit-Free Integer-to-Real Soundness Bridge** (`name_compare_run`, `rationalQuarterDepth_integer_sound`, `rationalQuarterDepth_real_sound`): The binary name-comparison machine halts on any $a, b : \mathrm{List}\;\mathrm{Bool}$ within at most $2(\lvert a\rvert + \lvert b\rvert) + 4$ steps outputting `decide (a = b)`; and for $d, p > 0$, the natural-arithmetic depth `rationalQuarterDepth c d p q := Nat.log 4 ((c * q) / (d * p))` when $\le N$ first certifies the exact integer inequality $c q < (d p)\cdot 4^{N+1}$ and then, for $q > 0$ and any real majorant $C \le \frac{c}{d}$, transports directly without any limiting argument to the strict real error bound $(\frac{1}{4})^{N+1} C < \frac{p}{q}$.
:::

::: proof
Group 1 follows from rank-five Gram representation, bilateral unit-quaternion isometries, Hopf–spinor trace identities, and Chebyshev induction; Group 2 expands cross-difference squares, completes the block Hermitian square $\begin{pmatrix}x\\y\end{pmatrix}^* K \begin{pmatrix}x\\y\end{pmatrix} = x^* S x + (C^{-1}B^{\mathsf{H}}x + y)^* C (C^{-1}B^{\mathsf{H}}x + y)$ using $C \succ 0$, and extends Gram-preserving permutations across spanning quotients; Group 3 combines Bessel's inequality with a sum-of-squares polynomial certificate, two-step Euclidean denominator halving, and decidable power-one induction; Group 4 tracks explicit stack-machine steps, uses Euclidean division $cq = (dp)((cq)/(dp)) + (cq \bmod dp)$ to establish $cq < dp \cdot 4^{N+1}$ in $\mathbb{N}$, and casts one-way into $\mathbb{R}$ via `exact_mod_cast`. The full proof is checked by the Lean kernel.
:::

::: {.remark #rem-ch39-lean4-cic-consistency-and-kernel-audit title="Calculus of Inductive Constructions, Hedberg's Theorem, and Multi-Kernel Axiom Audits (Literature Results)"}
**Literature results, not formalized in this book.** Following `PROJECT.md` §13 and §14, we record three foundational references and audit boundaries:

1. **Calculus of Inductive Constructions (CIC) and Lean 4 Metatheory**: CIC originates with T. Coquand and C. Paulin-Mohring (*COLOG-88*, LNCS **417**, 50–66, 1990); the Lean 4 kernel and compiler are presented by L. de Moura and S. Ullrich (*CADE-28*, LNCS **12699**, 625–635, 2021), and the formal metatheory of Lean together with its three standard axioms `{propext, Classical.choice, Quot.sound}` is analyzed by M. Carneiro (*The Type Theory of Lean*, Master's thesis, CMU, 2019);
2. **Hedberg's Theorem and Quotient-Free Canonical Subtypes**: Every type equipped with constructive decidable equality (`DecidableEq`) satisfies uniqueness of identity proofs (UIP) inside pure intensional type theory without extra axioms, proved by M. Hedberg (*J. Funct. Program.* **8**(4), 413–436, 1998). This applies to equality proofs in the decidable canonical subtype. The operation laws require the algebraic arguments above;
3. **Reading the axiom closure of a declaration.** At the book’s pinned commit [{commit}](trureturing:), the frozen entry for `BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound` has no official `axioms` field. Its dependencies lie within the permitted set `{propext, Classical.choice, Quot.sound}`. The exact subset requires a measurement of that declaration. The `QRat` prototype in this section supplies a separate measurement. In Lean `v4.35.0`, `#print axioms omega_zero_axiom_master_check` reports an empty list.
:::

::: {.example #ex-ch39-lean4-zero-axiom-step-by-step-trace title="Quantitative Audit: Step-by-Step Integer Trace of `omega_zero_axiom_master_check`, Non-Abelian Integer Rotor Synthesis, and Rational Schur Certificate"}
We verify by hand every integer and rational reduction executed inside `by decide` by Lean `v4.35.0` (`hand derivation` / `NUM`):

1. **Three-Beat Projective Closure of `(1,1,1,1)` and Radical-Free Non-Abelian Synthesis**:
   For `p0 = (1,0,0,0)` and `g120 = (1,1,1,1)` ($\lVert g_{120}\rVert^2 = 4$, $\kappa(p_0, g_{120}) = \frac{1^2}{1 \times 4} = \mathbf{\frac{1}{4}}$):
   - Beat 2 raw product $(1+\mathbf{i}+\mathbf{j}+\mathbf{k})^2 = -2 + 2\mathbf{i} + 2\mathbf{j} + 2\mathbf{k}$ normalizes via $\gcd = 2$ and sign flip $s = -1$ to `gStep2 = (1, -1, -1, -1)`;
   - Beat 3 raw product $(1-\mathbf{i}-\mathbf{j}-\mathbf{k})(1+\mathbf{i}+\mathbf{j}+\mathbf{k}) = 1 - (-3) = 4$ normalizes via $\gcd = 4$ back to **`gStep3 = (1, 0, 0, 0) = p0`**!
   - For the two squared-norm-$2$ equatorial integer states `pHalf = (1,1,0,0)` and `qHalf = (1,0,1,0)` (each $\kappa = \mathbf{\frac{1}{2}}$), forward ternary transport $(1+\mathbf{i})\cdot 1\cdot(1+\mathbf{j}) = 1 + \mathbf{i} + \mathbf{j} + \mathbf{k}$ synthesizes **`(1, 1, 1, 1) = g120`**, whereas reversed transport $(1+\mathbf{j})\cdot 1\cdot(1+\mathbf{i}) = 1 + \mathbf{i} + \mathbf{j} - \mathbf{k}$ yields **`(1, 1, 1, -1)`**—witnessing non-abelian spatial locking in pure integers!
2. **Rational Schur Complement and Integer Quarter-Depth Certificate**:
   For the $2 \times 2$ rational Hermitian block $A = 2,\; B = 1,\; C = \frac{3}{2} > 0$, zero-axiom `QRat` arithmetic yields exact Schur minimum $S = A - B C^{-1} B^\top = 2 - \frac{2}{3} = \mathbf{\frac{4}{3}} > 0$ (attained at $y^* = -\frac{2}{3}x$); for majorant bound $\frac{c}{d} = \frac{7}{2}$ and target error $\frac{p}{q} = \frac{1}{10}$, executable `rationalQuarterDepth 7 2 1 10 = Nat.log 4 35 = 2` certifies at $N = 2$ the exact integer inequality $70 < 2 \times 4^3 = \mathbf{128}$, projecting one-way to $(\frac{1}{4})^3 C \le \frac{7}{128} < \frac{1}{10}$ over $\mathbb{R}$ with zero limits.
:::

---

## 32.8.4 Feature-Rank-5 Spinor Lift, Finite-Degree Algebraic Extensions, Norm-5 Hecke Expanders, and D-Finite Differential Jets {#sec-ch39-omega-math-pythspinor-algebraic-lps-dfinite}

Building on the three-layer architecture built in §32.8.1–§32.8.3, four deeper algebraic and analytic boundary questions arise immediately: (i) why does the quadratic ray kernel of the projective carrier `ProjTernion` cap its feature rank at $10$, whereas the comparison system characterized in Group 1 of the frozen theorem above requires feature rank $5$ under its chosen signed kernel and retains $720^\circ$ double-cover sign memory? (ii) when physical observables genuinely require algebraic irrationals—such as normalizing the non-square-norm state `pHalf` to unit length along the same ray, attaining the CHSH Tsirelson bound $2\sqrt{2}$, or closing pentagonal golden-ratio Chebyshev cycles—how can zero-axiom finite-degree algebraic extensions encode them without retreating to the real continuum $\mathbb{R}$? (iii) inspired by the squared-norm-$5$ integer coordinate arithmetic of the frozen theorem, how do four-coordinate squared-norm-$5$ Hurwitz quaternions generate inside $\mathrm{SO}(3, \mathbb{Q})$ a free group $F_3$, induce exact rational Hecke operators (matrices, traces, and characteristic polynomials) with certified spectra on spherical harmonics, and yield finite Ramanujan Cayley graphs? (iv) how does the second-order jet ring `Jet2Rat` generalize to arbitrary-order D-finite differential jet rings $J_N(\mathbb{Q})$, unifying Cayley parametrization with trigonometric identities inside finite polynomial rings and yielding arbitrarily tight rational Machin brackets without presupposing the transcendental constant $\pi$? This subsection integrates all four extensions into the zero-axiom, transcendental-free, infinity-free `OmegaMath` architecture (universal statements are established by written proof, marked `ARGUED`; finite instances, spectral bounds, and enclosures are certified by exact rational, two-working-precision Arb certificates and the standalone zero-import Lean auxiliary check, marked `NUM`, and that standalone script is not counted toward the pinned `trureturing` frozen `LEAN ✓` theorem tally).

### 32.8.4.1 Exact Rank-10 vs. Rank-5 Separation Between Projective Rays and Signed Rational Spinors `PythSpinor` {#sec-ch39-pythspinor-rank5-double-cover}

For any nonzero rational quadruple $p \in \mathbb{Q}^4 \setminus \{0\}$, define the rank-one symmetric orthogonal projector $P(p) = \frac{p p^{\mathsf{T}}}{p^{\mathsf{T}} p} \in \mathrm{Sym}_4(\mathbb{Q})$. Expanding the matrix trace immediately yields the linear feature factorization $\kappa_{\mathrm{proj}}(p, q) = \frac{\langle p, q\rangle^2}{\lVert p\rVert^2 \lVert q\rVert^2} = \operatorname{Tr}\bigl(P(p) P(q)\bigr)$. Because $\mathrm{Sym}_4(\mathbb{Q})$ has dimension $10$ and the trace pairing $\operatorname{Tr}(AB)$ has quadratic form $\operatorname{Tr}(A^2) = \sum_{i,j} A_{ij}^2$ strictly positive definite on nonzero symmetric matrices, every finite projective Gram matrix $G^{\mathrm{proj}}_{ij} = \kappa_{\mathrm{proj}}(p_i, p_j)$ is positive semidefinite with $\operatorname{rank}(G^{\mathrm{proj}}) \le 10$. Choosing the four coordinate axes $e_1, e_2, e_3, e_4$ and six pairwise diagonals $e_i + e_j$ ($1 \le i < j \le 4$), the four coordinate projectors span the diagonal subspace while $2 P(e_i + e_j) - P(e_i) - P(e_j) = E_{ij} + E_{ji}$ spans all six off-diagonal symmetric basis matrices, so the $10$ projectors indexed by these $10$ rays form a basis of $\mathrm{Sym}_4(\mathbb{Q})$; their exact $10 \times 10$ Gram matrix has leading principal minors $1, 1, 1, 1, \frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{16}, \frac{1}{32}, \frac{1}{64}$ ($\det G^{\mathrm{proj}}_{10} = \frac{1}{64} > 0$, strictly positive definite), and appending the eleventh ray $(1, 1, 1, 1)$ keeps rank $10$ while driving $\det G^{\mathrm{proj}}_{11} = 0$.

To bring the chosen kernel's feature rank down from the projective quotient's $10$ to the $5$ of the frozen isomorphism setting while enabling the output carrier to distinguish antipodal unit spinors $(p; r)$ and $(-p; r)$ (with strictly positive integer radius $r > 0$), we adopt **primitive Pythagorean spinors `PythSpinor`**—integer quintuples $(w, x, y, z; r) \in \mathbb{Z}^4 \times \mathbb{Z}_{>0}$ satisfying $w^2 + x^2 + y^2 + z^2 = r^2$ and $\gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert, r) = 1$. For any nonzero integer quadruple $u = (a, b, c, d)$ with $s = b^2 + c^2 + d^2$, the rational stereographic–Cayley parametrization of the unit three-sphere $S^3(\mathbb{Q}) \subset \mathbb{Q}^4$ is defined by

$$
\Phi(a, b, c, d) \;=\; \operatorname{reduce}\bigl(a^2 - s,\; 2ab,\; 2ac,\; 2ad;\; a^2 + s\bigr),
$$

where $\operatorname{reduce}$ divides by the positive five-entry greatest common divisor. The identity $(a^2 - s)^2 + 4a^2 s = (a^2 + s)^2$ places every image on the rational unit three-sphere $S^3(\mathbb{Q})$; conversely, every rational unit quaternion $(w, x, y, z)$ with $w \neq -1$ is hit by an integer multiple of $(1, \frac{x}{1+w}, \frac{y}{1+w}, \frac{z}{1+w})$, while every nonzero input with $a = 0$ (such as $(0, 1, 0, 0)$) maps to the south pole $(-1, 0, 0, 0; 1)$. Note that $\Phi(u) = \Phi(-u)$ does not recover an input ray's sign; it is the output carrier `PythSpinor` itself that distinguishes antipodal representatives $(p; r)$ and $(-p; r)$, and by norm multiplicativity $(ab)\overline{ab} = a(b\bar{b})\bar{a}$ together with positive GCD reduction, primitive spinors are strictly closed under quaternion multiplication, conjugation inverse, and the ternary heap operation $[a, b, c] = a\bar{b}c$.

Writing rational unit points as $v_i = p_i / r_i \in S^3(\mathbb{Q})$, the signed spinor kernel satisfies

$$
\kappa_{\mathrm{spin}}\bigl((p_i; r_i), (p_j; r_j)\bigr) \;=\; \frac{r_i r_j + \langle p_i, p_j\rangle}{2 r_i r_j} \;=\; \frac{1}{2}\bigl\langle (1, v_i), (1, v_j)\bigr\rangle_{\mathbb{Q}^5}, \qquad \kappa_{\mathrm{proj}}(p_i, p_j) \;=\; \bigl(2\kappa_{\mathrm{spin}} - 1\bigr)^2,
$$

the first equality factoring through $\mathbb{Q}^5$ to cap every finite spinor Gram rank universally at $5$, and the second following identically for all spinor pairs from $p_i \cdot p_i = r_i^2$. Applying $\Phi$ to $(1,0,0,0), (1,1,0,0), (1,0,1,0), (1,0,0,1), (3,1,1,1)$ yields the four coordinate unit spinors (lying in the affine hyperplane $\sum v_k = 1$) plus $(1, 1, 1, 1; 2)$ (whose coordinate sum is $2 \neq 1$, giving linear independence in $\mathbb{Q}^5$); their $5 \times 5$ spinor Gram matrix has exact leading principal minors $1, \frac{3}{4}, \frac{1}{2}, \frac{5}{16}, \frac{1}{32}$ ($\det G^{\mathrm{spin}}_5 = \frac{1}{32} > 0$), while appending the sixth lifted spinor $(-1, 1, 1, 1; 2) = \Phi(1, 1, 1, 1)$ fixes rank $5$ with $\det G^{\mathrm{spin}}_6 = 0$ (all $36$ ordered products, $216$ ternary heaps, and $36$ quadratic kernel identities on these six spinors are verified exact). Furthermore, writing $h = (\mathbf{i} + \mathbf{j} + \mathbf{k})/\sqrt{3}$ ($h^2 = -1$), the primitive body-diagonal rotor `g120_spin = (1, 1, 1, 1; 2)` (corresponding to $\cos(\pi/3) + h\sin(\pi/3)$) traces the exact six-beat orbit $(1,1,1,1;2) \to (-1,1,1,1;2) \to (-1,0,0,0;1) \to (-1,-1,-1,-1;2) \to (1,-1,-1,-1;2) \to (1,0,0,0;1)$ inside `PythSpinor`, with signed identity fidelities $\frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$: spatial rotation advances $120^\circ$ per beat, hitting at $360^\circ$ the exact sign flip $-1$ on beat three ($\kappa_{\mathrm{spin}} = 0$) and returning at $720^\circ$ with full sign $+1$ on beat six ($\kappa_{\mathrm{spin}} = 1$).

### 32.8.4.2 Zero-Axiom Finite-Degree Algebraic Extensions: `QSqrt2` and `QPhi` {#sec-ch39-finite-algebraic-rings-qsqrt2-qphi}

Because the equatorial integer state `pHalf = (1, 1, 0, 0)` has non-square norm $\lVert p_{\mathrm{Half}}\rVert^2 = 2$, even though the nonlinear stereographic map $\Phi$ sends it to the rational point $(0, 1, 0, 0; 1)$, **unit normalization along the same ray** $p_{\mathrm{Half}} / \lVert p_{\mathrm{Half}}\rVert$ necessarily leaves $\mathbb{Q}^4$; likewise, pentagonal symmetry and golden-ratio Chebyshev closure require a root of $t^2 - t - 1 = 0$. By the rational root test, both $t^2 - 2$ and $t^2 - t - 1$ are irreducible over $\mathbb{Q}$; `OmegaMath` avoids `Mathlib`'s Choice-dependent classical field operations over the Cauchy-quotient reals $\mathbb{R}$ (such as real inversion) and constructs directly over `QRat` as pure ordered pairs `(a, b)` two zero-axiom degree-$2$ extension fields:

1. **Quadratic Extension Field `QSqrt2` $= \mathbb{Q}[\delta]/(\delta^2 - 2)$**: Under its positive real embedding $\delta = \sqrt{2}$ (the $320$-bit Arb certificate proves $\delta$ itself lies strictly inside the rational isolating interval $(1.414213, 1.414214)$, rounding to six decimal places as $1.414214$), the lifted $90^\circ$ unit spinor $u_{90^\circ} = \frac{\delta}{2}(1 + \mathbf{i})$ has exact unit squared norm $\frac{\delta^2}{4} + \frac{\delta^2}{4} = 1$, with exact integer powers $u_{90^\circ}^2 = \mathbf{i}$, $u_{90^\circ}^4 = -1$, and $u_{90^\circ}^8 = 1$. On the Bell state $(\lvert 00\rangle + \lvert 11\rangle)/\sqrt{2}$ (whose $Z, X$ correlation matrix is the identity), the self-adjoint unitary observables $A_0 = Z$, $A_1 = X$, $B_0 = (Z + X)/\delta$, and $B_1 = (Z - X)/\delta$ evaluate inside `QSqrt2` to exact correlations $\frac{\delta}{2}, \frac{\delta}{2}, \frac{\delta}{2}, -\frac{\delta}{2}$, giving exact CHSH value $S_{\mathrm{CHSH}} = 2\delta$ and $S_{\mathrm{CHSH}}^2 = 8$ (the $320$-bit Arb certificate proves $2\delta$ itself lies strictly inside $(2.828427, 2.828428)$, rounding to six decimal places as $2.828427$). Projected via $\Pi_{\mathbb{R}}$ into the classical Hilbert-space setting, the CHSH operator $C = A_0 \otimes (B_0 + B_1) + A_1 \otimes (B_0 - B_1)$ of any self-adjoint unitary observables satisfies $C^2 = 4I - [A_0, A_1] \otimes [B_0, B_1]$ with each commutator having operator norm at most $2$, hence $\lVert C\rVert \le 2\sqrt{2}$; the `QSqrt2` algebraic construction thus attains the exact Tsirelson upper bound upon projection;
2. **Golden Quadratic Extension Field `QPhi` $= \mathbb{Q}[\varphi]/(\varphi^2 - \varphi - 1)$**: Writing the positive real embedding $\varphi = \frac{1 + \sqrt{5}}{2}$ ($320$-bit Arb enclosure rounding to six decimal places as $1.618034$) and its Galois conjugate $\bar{\varphi} = 1 - \varphi$, induction from $\varphi^2 = \varphi + 1$ proves that for every integer $n \ge 1$ the exact Fibonacci power law $\varphi^n = F_{n-1} + F_n\varphi$ holds, while $\varphi\bar{\varphi} = -1$ gives exact algebraic norm $N(\varphi^n) = (-1)^n$ (verified through $n = 20$ in the exact Python suite, where $\varphi^{20} = 4181 + 6765\varphi$ and $N(\varphi^{20}) = 1$, and through $n = 12$ in the zero-import Lean auxiliary script, where $\varphi^{12} = 89 + 144\varphi$ and $N(\varphi^{12}) = 1$). Moreover, the exact rational factorization $T_5(x) + 1 = (x + 1)(4x^2 - 2x - 1)^2$ identifies the unique positive root $\frac{\varphi}{2} = \cos(\pi/5)$ (rounding to six decimal places as $0.809017$), and the double-angle formula yields $\frac{\varphi - 1}{2} = \cos(2\pi/5)$ (rounding to six decimal places as $0.309017$), whereupon the Chebyshev recurrence proves the zero-trigonometry closures $T_5(\varphi/2) = -1$, $T_{10}(\varphi/2) = T_{20}(\varphi/2) = 1$, and $T_5((\varphi - 1)/2) = 1$.

### 32.8.4.3 Norm-5 LPS Free Generators, Exact Rational Spherical-Harmonic Hecke Operators, and the 2184-Vertex Ramanujan Graph $X^{5, 13}$ {#sec-ch39-lps-norm5-hecke-ramanujan}

Inspired by the Group 3 squared-norm-$5$ integer coordinate arithmetic of the frozen theorem above, and following the classical Hecke-operator and Ramanujan-graph theory of A. Lubotzky, R. Phillips, and P. Sarnak ([*Comm. Pure Appl. Math.* **39**(S1), S149–S186, 1986](https://api.crossref.org/works/10.1002/cpa.3160390710); [*Comm. Pure Appl. Math.* **40**(4), 401–420, 1987](https://api.crossref.org/works/10.1002/cpa.3160400402); [*Combinatorica* **8**(3), 261–277, 1988](https://api.crossref.org/works/10.1007/BF02126799)), G. Davidoff, P. Sarnak, and A. Valette ([*Elementary Number Theory, Group Theory and Ramanujan Graphs*, LMS Student Texts **55**, Cambridge University Press, 2003](https://www.cambridge.org/core/books/elementary-number-theory-group-theory-and-ramanujan-graphs/7932F64548F1B38B95AA2593E0B986B2)), and O. Parzanchevski and P. Sarnak ([*Adv. Math.* **327**, 869–901, 2018](https://arxiv.org/abs/1704.02106)), we examine the six four-coordinate squared-norm-$5$ integer Hurwitz generators inside `ProjTernion`:

$$
S_5 \;=\; \bigl\{(1, \pm 2, 0, 0),\; (1, 0, \pm 2, 0),\; (1, 0, 0, \pm 2)\bigr\} \;\subset\; \mathbb{Z}^4.
$$

**Free Group $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ and Linear Bit-Height Growth.** Each $g \in S_5$ satisfies $g\bar{g} = 5$ (so its quaternion inverse is $\bar{g}/5$, making the conjugates three mutually inverse pairs in the projective and adjoint groups) and induces an exact denominator-$5$ rational rotation $\operatorname{Ad}(g) \in \mathrm{SO}(3, \mathbb{Q})$ (for instance, $\operatorname{Ad}(1, 2, 0, 0)$ fixes the first axis and acts on the remaining two axes by the Pythagorean rotation $\frac{1}{5}\begin{pmatrix}-3 & -4 \\ 4 & -3\end{pmatrix}$). Splitting the quaternion algebra over $\mathbb{F}_5$ via $\mathbf{i} \mapsto \operatorname{diag}(2, -2)$ and $\mathbf{j} \mapsto \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ maps all six generators to nonzero rank-one matrices among whose $36$ ordered pairwise products exactly $6$ vanish (namely the three inverse pairs in either order); factoring each rank-one image as a column times a row shows that every reduced word of length $L \ge 1$ stays nonzero modulo $5$. Since its squared norm is $5^L$, no prime other than $5$ can divide all four coordinates, so every reduced word is primitive ($\gcd = 1$); neither can a nonempty reduced word be scalar (for odd $L$, $5^L$ is nonsquare, and for positive even $L$, $\pm 5^{L/2}$ is divisible by $5$), and because the kernel of $\operatorname{Ad}$ consists solely of scalars, $S_5$ freely generates inside $\mathrm{SO}(3, \mathbb{Q})$ the group $F_3$. Exhaustive enumeration confirms that at lengths $L = 0, 1, 2, 3, 4, 5$ there are respectively $1, 6, 30, 150, 750, 3750$ distinct canonical adjoint rotations ($1, 7, 37, 187, 937, 4687$ cumulative), with exact largest coordinate magnitudes $1, 2, 4, 11, 24, 55$ (binary bit lengths $1, 2, 3, 4, 5, 6$). Because the largest coordinate magnitude of every length-$L$ reduced word lies in $[5^{L/2}/2, 5^{L/2}]$, its asymptotic bit-height growth rate locks exactly to $\frac{1}{2}\log_2 5$ ($320$-bit Arb enclosure rounding to six decimal places as $1.160964$ bits per gate).

**Exact Rational Spherical-Harmonic Hecke Operators and Certified Spectra ($T_5|_{V_\ell}$, $\ell = 1, \dots, 6$).** For every $R \in \mathrm{SO}(3, \mathbb{Q})$, inverse pullback $\rho_\ell(R)(P)(x) = P(R^{-1} x)$ commutes with the Laplacian $\Delta$, furnishing a purely rational matrix representation on the $(2\ell + 1)$-dimensional rational space of harmonic homogeneous degree-$\ell$ polynomials $V_\ell$; the inverse-closed average $T_5|_{V_\ell} = \frac{1}{6}\sum_{g \in S_5}\rho_\ell(\operatorname{Ad}(g))$ is self-adjoint for the spherical $L^2$ inner product (hence real-spectrum) while its matrix, traces, and characteristic-polynomial coefficients remain entirely over $\mathbb{Q}$. Every $g \in S_5$ satisfies $\cos^2(\theta/2) = w^2/\lVert g\rVert^2 = \frac{1}{5}$, so the rotation character $\sum_{m=-\ell}^\ell e^{im\theta} = U_{2\ell}(\cos(\theta/2))$ and even parity of $U_{2\ell}$ imply the exact rational trace law $\operatorname{Tr}(T_5|_{V_\ell}) = U_{2\ell}(1/\sqrt{5}) \in \mathbb{Q}$. For $\ell = 1, \dots, 6$ (with dimensions $\dim V_\ell = 2\ell + 1$ equal to $3, 5, 7, 9, 11, 13$), the table below records the exact rational traces $\operatorname{Tr}(T_5|_{V_\ell})$, traces of squares $\operatorname{Tr}\bigl((T_5|_{V_\ell})^2\bigr)$, and largest eigenvalue magnitudes (with the final column rounding $\max\lvert\lambda\rvert$ to six decimal places); exact rational characteristic-polynomial factorization, Sturm root isolation, and two-working-precision Arb enclosures certify that every eigenvalue across all six degrees satisfies the strict continuous Ramanujan inequality $9\lambda^2 < 5$ (i.e., $\lvert\lambda\rvert < \frac{\sqrt{5}}{3} = \frac{1}{6}(2\sqrt{5})$, rounding to six decimal places as $0.745356$):

| $\ell$ | $\operatorname{Tr}(T_5)$ | $\operatorname{Tr}(T_5^2)$ | $\max\lvert\lambda\rvert$ | $\approx\max\lvert\lambda\rvert$ |
| -----: | --------------: | ----------------------: | --------------: | ---------------: |
| $1$ | $-1/5$ | $1/75$ | $1/15$ | $0.066667$ |
| $2$ | $-19/25$ | $371/375$ | $37/75$ | $0.493333$ |
| $3$ | $139/125$ | $51581/46875$ | $43/75$ | $0.573333$ |
| $4$ | $-359/625$ | $356479/234375$ | $1037/1875$ | $0.553067$ |
| $5$ | $-1321/3125$ | $20469587/9765625$ | $\lambda_5^+$ | $0.637448$ |
| $6$ | $16901/15625$ | $72048089/48828125$ | $383/625$ | $0.612800$ |

Specifically, at $\ell = 1$, $T_5|_{V_1} = -\frac{1}{15} I_3$ is an exact scalar operator (characteristic factor $(15\lambda + 1)^3$); at $\ell = 5$, besides the rational eigenvalues $-\frac{351}{625}$ (multiplicity two) and $-\frac{349}{1875}$ (multiplicity three), the multiplicity-three irreducible quadratic factor $q_5(\lambda) = 17578125\lambda^2 - 7376250\lambda - 2440723$ contributes the exact positive root $\lambda_5^+ = \sqrt{\frac{503552\sqrt{109}}{29296875} + \frac{19941793}{87890625}}$ (rounding to six decimal places as $0.637448$); and at $\ell = 6$, both roots of the multiplicity-three quadratic factor $87890625\lambda^2 - 17321250\lambda - 3753119$ have absolute values strictly below the exact rational dominant magnitude $\lvert -\frac{383}{625}\rvert = 0.6128$.

**Finite LPS Ramanujan Cayley Graph $X^{5, 13}$ and Exact Positive-Definite Shift Certificate.** At the smallest prime exceeding $5$ with $q \equiv 1 \pmod 4$, namely $q = 13$, we have $5^2 \equiv -1 \pmod{13}$ and Legendre symbol $\left(\frac{5}{13}\right) = -1$, so the modulo-$13$ splitting $\mathbf{i} \mapsto \operatorname{diag}(5, -5)$ and $\mathbf{j} \mapsto \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ maps the six generators of $S_5$ to six non-square-determinant elements of $\mathrm{PGL}_2(\mathbb{F}_{13})$. Right multiplication generates the connected, simple, undirected, bipartite $6$-regular Cayley graph $X^{5, 13}$ on $2184$ vertices ($1092$ per part); full breadth-first enumeration together with Cayley vertex transitivity proves its exact girth is $8$. Let $B$ be the $1092 \times 1092$ integer biadjacency matrix (odd rows, even columns) and set $C = B^{\mathsf{T}} B$. Starting from the identity-vertex basis vector $e_1$ on the even part, sparse exact integer Krylov iteration $v_j = C^j e_1$ yields invertible integer Gram matrices through $v_0, \dots, v_{27}$ and an exact degree-$28$ linear relation verified entrywise on $v_{28}$; since left translations by $\mathrm{PSL}_2(\mathbb{F}_{13})$ commute with $C$ and map $e_1$ transitively to every even basis vector, this degree-$28$ polynomial is the exact minimal polynomial of $C$ (and by real symmetry of $C$, every root occurs as an eigenvalue). Because $C/36$ is stochastic with a connected two-step graph on the even part, the trivial root $36$ is simple; exact Sturm isolation and $320$-bit Arb enclosures prove that all $27$ remaining distinct nontrivial roots lie strictly below $20$, with largest nontrivial root $\alpha$ (rounding to six decimal places as $18.060127$) equal to the largest real root of the irreducible sextic factor

$$
x^6 - 46x^5 + 729x^4 - 4469x^3 + 7732x^2 - 3872x + 64 \;=\; 0
$$

certifying the second-largest singular value $\sigma_2(B) = \sqrt{\alpha}$ (rounding to six decimal places as $4.249721$) strictly below the Ramanujan threshold $2\sqrt{5}$ (rounding to six decimal places as $4.472136$). Write $J_{1092} = \mathbf{1}\mathbf{1}^{\mathsf{T}}$ for the $1092 \times 1092$ all-ones matrix: whereas the naive shift $20 I_{1092} - C + \frac{16}{1092} J_{1092}$ leaves eigenvalue zero on the all-ones vector $\mathbf{1}$, choosing the shift coefficient $\frac{17}{1092}$ yields

$$
M \;=\; 20 I_{1092} - B^{\mathsf{T}} B + \frac{17}{1092} J_{1092},
$$

which satisfies $M\mathbf{1} = \mathbf{1}$, while on the orthogonal complement $\mathbf{1}^\perp$ every eigenvalue is $20 - \lambda_i(C) > 1$ (since $\alpha < 19$), establishing purely via the integer Krylov minimal polynomial and exact root bounds that $M$ is strictly positive definite with exact smallest eigenvalue $1$.

### 32.8.4.4 D-Finite Differential Jet Rings $J_N(\mathbb{Q})$, Cayley–Trigonometry Algebraic Unification, and $\pi$-Free Rational Machin Brackets {#sec-ch39-dfinite-jets-cayley-machin}

Following the D-finite power-series framework of R. P. Stanley ([*European J. Combin.* **1**(2), 175–188, 1980](https://api.crossref.org/works/10.1016/S0195-6698(80)80051-5)), we generalize `Jet2Rat` ($\mathbb{Q}[\eta]/(\eta^3)$) to any truncation order $N$: over the formal power-series ring $\mathbb{Q}[[\eta]]$, linear differential recurrences with constant or polynomial coefficients—$E' = E$ ($E(0) = 1$), $C'' = -C$ ($C(0) = 1, C'(0) = 0$), $S'' = -S$ ($S(0) = 0, S'(0) = 1$), and $(1 + \eta^2)A'' + 2\eta A' = 0$ ($A(0) = 0, A'(0) = 1$, immediately implying $(1 + \eta^2)A' = 1$)—determine every rational coefficient uniquely term by term. Quotienting by $\eta^{N+1}$ produces in the finite rational polynomial jet ring $J_N(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^{N+1})$ the polynomials $\mathrm{Exp}_N, \mathrm{Cos}_N, \mathrm{Sin}_N, \mathrm{Atan}_N$: for arbitrary scalars $a, b \in \mathbb{Q}$ (as well as symbolically over $\mathbb{Q}[a, b]$), the binomial formula yields the addition law $\mathrm{Exp}_N(a\eta)\,\mathrm{Exp}_N(b\eta) \equiv \mathrm{Exp}_N((a+b)\eta)$ and inverse identity $\mathrm{Exp}_N(\eta)\,\mathrm{Exp}_N(-\eta) \equiv 1 \pmod{\eta^{N+1}}$; from $C' = -S$ and $S' = C$ we obtain $(C^2 + S^2)' = 0$, which with constant term $1$ gives $\mathrm{Cos}_N(\eta)^2 + \mathrm{Sin}_N(\eta)^2 \equiv 1 \pmod{\eta^{N+1}}$; and formal differentiation drops one order to yield $(1 + \eta^2)\,\mathrm{Atan}'_N(\eta) \equiv 1 \pmod{\eta^N}$.

**Cayley–Trigonometry Algebraic Unification.** The formal composition pair $(F, G) = (\mathrm{Cos}(2\mathrm{Atan}), \mathrm{Sin}(2\mathrm{Atan}))$ satisfies the first-order linear differential system $F' = -\frac{2G}{1 + \eta^2}$, $G' = \frac{2F}{1 + \eta^2}$ with initial values $(F(0), G(0)) = (1, 0)$, and direct differentiation shows that the rational Cayley parametrization $\bigl(\frac{1 - \eta^2}{1 + \eta^2}, \frac{2\eta}{1 + \eta^2}\bigr)$ solves the exact same system and initial condition; by coefficient uniqueness and the fact that substitution of a zero-constant-term series respects truncation modulo $\eta^{N+1}$, every order $N \ge 1$ satisfies in $J_N(\mathbb{Q})$ the exact polynomial ring identities

$$
\mathrm{Cos}_N\bigl(2\,\mathrm{Atan}_N(\eta)\bigr) \;\equiv\; \frac{1 - \eta^2}{1 + \eta^2} \pmod{\eta^{N+1}}, \qquad \mathrm{Sin}_N\bigl(2\,\mathrm{Atan}_N(\eta)\bigr) \;\equiv\; \frac{2\eta}{1 + \eta^2} \pmod{\eta^{N+1}}.
$$

These identities are verified to zero remainder at both $N = 8$ and $N = 12$ (with $N = 8$ also checked by the zero-import Lean auxiliary script). At the rational point $\eta = \frac{1}{2}$, the exact value of the untruncated rational Cayley map is the Pythagorean pair $(\frac{3}{5}, \frac{4}{5})$; when the canonical polynomial representatives of degree at most $N$ for these congruences are evaluated at $\eta = \frac{1}{2}$ (as evaluation at a nonzero point does not descend to the quotient ring $J_N(\mathbb{Q})$), those truncated Cayley polynomials at $N = 2, 4, 6, 8, 12$ exhibit exact rational cosine–sine signed errors $(-\frac{1}{10}, \frac{1}{5})$, $(\frac{1}{40}, -\frac{1}{20})$, $(-\frac{1}{160}, \frac{1}{80})$, $(\frac{1}{640}, -\frac{1}{320})$, and $(\frac{1}{10240}, -\frac{1}{5120})$, while evaluating the nested composition of the two truncated polynomials $\bigl(\mathrm{Cos}_N(2\,\mathrm{Atan}_N(\frac{1}{2})), \mathrm{Sin}_N(2\,\mathrm{Atan}_N(\frac{1}{2}))\bigr)$ without re-truncating yields at $N = 12$ signed errors (rounded to seven significant figures) $+1.235579 \times 10^{-5}$ and $-9.267049 \times 10^{-6}$.

**Purely Rational Machin Tangent Chain and $\pi$-Free Alternating Brackets.** Defining rational tangent addition and subtraction for rationals satisfying $u v \neq 1$ and $u v \neq -1$ respectively by $u \oplus v := \frac{u + v}{1 - u v}$ and $u \ominus v := \frac{u - v}{1 + u v}$, Machin's classical formula becomes a finite rational identity chain inside $\mathbb{Q}$ with every denominator nonzero:

$$
t_1 = \frac{1}{5} \;\longmapsto\; t_2 = t_1 \oplus t_1 = \frac{5}{12} \;\longmapsto\; t_4 = t_2 \oplus t_2 = \frac{120}{119} \;\longmapsto\; t_4 \ominus \frac{1}{239} = \frac{28561}{28561} = 1,
$$

whose unreduced final numerator and denominator are both $28561$, invoking neither $\pi$ nor inverse trigonometry. Projecting one-way to the classical real shadow $\Pi_{\mathbb{R}}$, let $a = \arctan(\frac{1}{5})$ and $b = \arctan(\frac{1}{239})$ on the principal branch; since $0 < b < a < \frac{\pi}{4}$ and $\tan(2a) = \frac{5}{12}$, we obtain $0 < 2a < \frac{\pi}{4}$ and hence $0 < 4a - b < \frac{\pi}{2}$; substituting the rational tangent chain yields $\tan(4a - b) = 1$, so injectivity of $\tan$ on $(0, \frac{\pi}{2})$ gives $4a - b = \arctan(1) = \frac{\pi}{4}$. Termwise integration of $(1 + t^2)^{-1}$ yields alternating series on both intervals, so for every positive integer $M \in \mathbb{Z}_{\ge 1}$ the true value lies strictly between the $M$-th and $(M + 1)$-th partial sums; combining the rational endpoints with the signs in $16a - 4b$ yields purely rational brackets enclosing $\pi$ with exact rational width

$$
W_M \;=\; \frac{16}{5^{2M+1}(2M+1)} + \frac{4}{239^{2M+1}(2M+1)}.
$$

At $M = 1$, the exact rational bracket $[\frac{281476}{89625}, \frac{651864872}{204778785}]$ (endpoints rounding to six decimal places as $3.140597$ and $3.183264$) has exact width $\frac{218431204}{5119469625}$ (rounding to seven significant figures as $4.266676 \times 10^{-2}$); advancing through $M = 2, 4, 6, 8$ contracts the rational bracket width to $1.024000 \times 10^{-3}$, $9.102222 \times 10^{-7}$, $1.008246 \times 10^{-9}$, and $1.233619 \times 10^{-12}$, and $M = 17$ tightens it to $1.570731 \times 10^{-25}$ (all widths taken from the $320$-bit Arb certificates and rounded to seven significant figures; independent $320$-bit Arb evaluation confirms $\pi$ lies strictly inside every rational bracket).

**Archival Scope and Epistemic Stratification (`ARGUED` / `NUM`).** The complete written proofs, exact rational and two-working-precision ($256$-bit and $320$-bit) FLINT/Arb certificates, and standalone zero-import Lean auxiliary script for this subsection are archived under [Issue #1126](https://github.com/the-omega-institute/trureturing-books/issues/1126) in the [pinned verification archive](https://gist.github.com/loning/cc157a7795928e9ca1c7ab25c10eb333/3a3ff48ccbaf4dce3a4b23eba250e3a937880445) (commit `3a3ff48ccbaf4dce3a4b23eba250e3a937880445`, raw [`SHA256SUMS`](https://gist.githubusercontent.com/loning/cc157a7795928e9ca1c7ab25c10eb333/raw/3a3ff48ccbaf4dce3a4b23eba250e3a937880445/SHA256SUMS) SHA-256 digest `bcf6518d3eeec355ab1861ca4964d2fdfa3139cd1f1c095f69644de44113653e`). Across three computation suites, the archive certifies $140$ exact rational/algebraic records ($53 + 37 + 50$ by suite) and $121$ interval enclosures ($5 + 57 + 59$), with zero exact mismatches and strict containment of every $320$-bit interval inside its $256$-bit counterpart; the accompanying zero-import Lean `v4.35.0` script `omega_math_extensions_check.lean` (relying only on implicit `Init`, reduced via `by decide +kernel`, and printing `'cycle16_omega_math_extensions_check' does not depend on any axioms`) checks the four finite Gram determinants, the product/heap/quadratic-kernel predicates on the six lifted witnesses, separately the six-beat orbit and fidelities of `g120_spin`, the `QSqrt2` rotor powers and $(2\delta)^2 = 8$, the `QPhi` Fibonacci powers and norms (through $n = 12$) plus $T_5(\varphi/2) = -1, T_{10}(\varphi/2) = 1, T_5((\varphi - 1)/2) = 1$, the $S_5$ generators and $T_5|_{V_1} = -\frac{1}{15} I_3$ with $9(-\frac{1}{15})^2 < 5$, the $J_8(\mathbb{Q})$ exponential-inverse/Pythagorean/$(1+\eta^2)$-inverse and two Cayley–trigonometry identities, and the Machin rational tangent chain reducing to $1$ (while Bell correlations, $T_{20}$, exponential addition, arctangent derivative congruence, unreduced $28561/28561$, and higher-degree spectra are verified by direct arithmetic and the Python/Arb suites). This standalone script serves solely as an auxiliary archival verification and is not counted toward the pinned `trureturing` frozen `LEAN ✓` theorem tally; universal statements are established by the written proofs (`ARGUED`), while the stated finite instances, spectral bounds, and interval enclosures are certified by the exact rational, Arb, and standalone Lean checks (`NUM`).

---

**The laboratory follows a finite integer calculation through Lean’s evaluator.**

The first card traces the eight finite assertions of `omega_zero_axiom_master_check` using implicit standard `Init`. Its empty axiom list belongs to that theorem. Empty-kernel replay instead selects a strict library root such as `OmegaMath.Projective.Circle` and checks its import closure. Other cards show the order-sensitive products of `pHalf` and `qHalf`, the three-beat return of `g120`, the Schur minimum $S=4/3$ and the integer certificate $70<128$. The next chapter develops the circular-arc model. [Chapter 33](ch33-unified-arc-forces-and-af-gut.md)

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" height="620"}
Explore five cards covering the finite prototype and its axiom audit, integer-ray normalization, the eight finite ternion and jet assertions, the rational Schur certificate and the one-way real bridge, and four proof benchmarks. The two plots show measured proof dependencies, the browser’s integer-operation counts and the exact quarter-depth bounds.
:::
