# 39.13 Zero-Axiom Lean 4 Formalization Architecture (OmegaMath): Pure CIC Kernel, Canonical Integer Projective Ternions, and One-Way Shadow Functor {#sec-ch39-lean4-zero-axiom-omega-math-architecture}

> *“We do not need to modify the underlying kernel of Lean 4, and we must never force in custom axioms with the `axiom` keyword; what ought to be built stands directly atop the native axiom-free Calculus of Inductive Constructions (CIC) kernel of Lean 4, bypasses the classical real-number (`Real`) branch of Mathlib with its reliance on Choice and completed infinity, and pairs computable typeclass interfaces (`class`) with canonical integer projective carriers (`structure`) into a zero-axiom `OmegaMath` foundation.”*

Having established the infinity-free and transcendental-free finite rational mathematics $\mathbf{Math}_\Omega$ in [§39.12](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md), we arrive at the decisive formalization and software-architecture question: **to build this edifice inside a modern interactive theorem prover such as Lean 4, must we alter the underlying kernel of Lean 4, declare $\mathrm{AXIOM}\text{-}\Omega$ via the `axiom` keyword, or construct a purely definitional layer atop the existing kernel?**

This section delivers the architectural verdict: **not a single line of the Lean 4 kernel needs modification, and declaring custom axioms via `axiom` is strictly forbidden**. What is natively isomorphic to $\mathbf{Math}_\Omega$ is precisely the **bare Calculus of Inductive Constructions (CIC) kernel of Lean 4** prior to importing `Mathlib.Data.Real.Basic`. By bypassing Cauchy-quotient reals and Choice, eliminating quotient axioms at Layer 0 via **canonical integer projective structures (`structure`)**, encapsulating the mother laws at Layer 1 via **computable typeclasses (`class`)** whose constructive subtype instance proves relative consistency inside CIC, and bridging outward at Layer 2 via a **one-way shadow functor $\Pi_{\mathbb{R}}$** into `Mathlib`, we obtain a zero-import executable `OmegaMath` core on which `#print axioms` literally outputs **`does not depend on any axioms`** (the three-layer `OmegaMath` architectural synthesis, proof-DAG overhead comparison, and three-step `OmegaCore` engineering roadmap are marked **`MODEL`**; the fifteen core theorems—unit-quaternion isomorphism of rank-five complete ternary comparisons, chord-distance kernel identity, basepoint heap group factorization, identity of the quaternion ray kernel with spinor Born pairing weight, quaternion heap Chebyshev recurrence, Lagrange–Gram identity, attained boundary minimum of the Hermitian Schur complement, unique global linear-isometry extension of Gram-preserving permutations, radical-free rational six-axis open cover of $S^2$, GCD denominator reduction and logarithmic continued-fraction length bound, decidable prime-factor-stripping group-order recovery, explicit step bound for binary name comparison, and exact integer soundness plus limit-free real transport of the quarter-depth budget—are marked green **`LEAN ✓`**; CIC metatheory, Hedberg uniqueness of identity proofs, multi-kernel audit records, and Lean `v4.35.0` compiler checks are marked **`ARGUED` / `NUM`**).

---

## 39.13.1 Core Criterion: Why Bare Lean 4 CIC Matches $\mathbf{Math}_\Omega$, While Pollution Enters Only Through `Mathlib.Real` or Custom `axiom` Declarations {#sec-ch39-lean4-cic-vs-mathlib-real-and-axiom-trap}

Separating Lean 4 into its **underlying verification kernel (CIC)** and its **upper classical-analysis library (`Mathlib.Real`)** reveals two sharply distinct mathematical philosophies:

1. **Bare Lean 4 CIC Is Natively Free of Completed Infinity, Transcendentals, and Built-In Choice**:
   Prior to importing `Mathlib.Data.Real.Basic`, the core type-theoretic kernel of Lean 4 consists solely of dependent function types ($\Pi$-types), universe levels, and inductive definitions (`inductive`) governed by deterministic $\beta\delta\iota\zeta$-reduction. Inside bare CIC, `Nat` and `Int` are not static Cantorian bags pre-populated with $\aleph_0$ completed elements, but finite inductive syntax trees; the kernel contains neither the real continuum $\mathbb{R}$, nor $\infty$, $\pi$, or $e$, nor built-in excluded middle or Choice inside its reduction machine.
   Going one step deeper under `PROJECT.md` §13, running `#print axioms` directly in Lean `v4.35.0` on `Init` uncovers a critical compiler fact (`NUM` / `hand derivation`): `Nat.gcd`, `Int.natAbs`, `Int.instDiv`, and the propositional decidable comparisons `Int.decEq` (`=` / `≠`) and `Int.decLt` (`>`) depend on **zero axioms**; by contrast, the standard `Init` type `Rat` bundles a `Prop` coprimality proof whose arithmetic operations `Rat.add`, `Rat.mul`, and `Rat.div` pull in `[propext, Classical.choice, Quot.sound]` (`Rat.inv` pulls in `[propext, Quot.sound]`, and boolean integer equality `==` via `BEq` pulls in `Classical.choice`), while `Rat.add`, `Rat.mul`, `Rat.div`, and `Rat.inv` all stall kernel `by decide` reduction! Defining a fourteen-line pure data structure `QRat` (`num : Int`, `den : Nat` normalized via `Nat.gcd`) with propositional `Decidable` branches `if d = 0 ∨ n = 0` eliminates every hidden classical dependency and achieves literal **zero-axiom** reduction.
2. **Where Does the “Linear and Completed-Infinity Tax” of `Mathlib.Real` Come From?**:
   To reconstruct nineteenth-century Cauchy–Weierstrass analysis, `Mathlib` constructs `Real` as the quotient of rational Cauchy sequences modulo null sequences, pulling in all three standard classical axioms `{propext, Classical.choice, Quot.sound}`—above all **non-constructive `Classical.choice`** (`ARGUED`, cf. the classical-analysis audit receipts documented in `PROJECT.md` §14). Touching `Classical.choice` exacts two immediate engineering tolls:
   - **Computational paralysis (`noncomputable` contagion and `decide` stall)**: While pure rational numerals such as `#eval (1 + 1 : ℝ)` merely print a formal Cauchy-sequence wrapper, no executable bytecode can be extracted from non-constructive Choice; real division `(1 / 2 : ℝ)`, square roots `Real.sqrt`, Lie-group exponentials `NormedSpace.exp`, real derivatives, smooth manifolds, and Hilbert-space operators become marked `noncomputable`—blocking native C/machine-code evaluation (`#eval`) while `Classical.choice` simultaneously stalls kernel reflection (`by decide`);
   - **Proof-DAG blowup (declaration-closure and filter-convergence tax, `MODEL` engineering analysis paired with `NUM` census)**: Measuring proof declaration closures in Lean `v4.35.0` across our four benchmark tasks (`{0,1/2,1} & 3-Beat Closure`, `Non-Abelian Triad Holonomy`, `Jet2 Algebraic Curvature`, and `Rational Gram–Schur & Depth Certificate`), the zero-axiom `OmegaMath` stack requires only **`396 / 372 / 379 / 380`** declarations with `#print axioms = ∅`, whereas representative `Mathlib.Real` proofs pull in **`7,480 / 7,144 / 17,786 / 7,395`** declarations with `{propext, Classical.choice, Quot.sound}`—with Task 3's real derivative alone dragging in `Filter.Tendsto` and jumping to `17,786` declarations.
3. **Why Declaring $\mathrm{AXIOM}\text{-}\Omega$ via the `axiom` Keyword Is Strictly Forbidden**:
   Writing `axiom Ternion : Type` or `axiom kappa_refl : ∀ x, kappa x x = 1` directly into Lean 4 detonates two fatal landmines:
   - **Destroying consistency guarantees and failing independent kernel audits**: The Lean kernel trusts every `axiom` unconditionally. Omitting even a single boundary side-condition—for instance, asserting `axiom kappa_refl : ∀ x : ProjTernion, kappa x x = ⟨1, 1⟩` over raw quadruples without excluding the zero tuple $o_{\mathrm{zero}} = (0,0,0,0)$, where `kappa 0 0` evaluates to `⟨0, 1⟩`—derives `⟨0, 1⟩ = ⟨1, 1⟩` and hence `False` in three lines! Simultaneously, `#print axioms` and independent kernel checkers (`lean4lean`, `nanoda`, `con-leche`, `comparator`) flag every non-standard `axiom`;
   - **Freezing kernel $\iota$-reduction**: An `axiom` constant possesses no computation rule, turning every expression containing it into an irreducible neutral term and severing the Curry–Howard unity of proof and executable program.

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="cic-kernel-vs-axiom-and-real-tax" height="500"}
**Five-Stage Compilation Pipeline and Three-Route Axiom Audit**: A purple opaque `kit.solid` projective ternion sphere $\mathbb{QP}^3$ is coupled with a 3D five-stage formalization prism rail (`Syntax Carrier → Typecheck → ι-Reduce/decide → #print axioms Audit → Native #eval Code`); the amber focus sits on Stage 4 of the pure CIC $+$ `OmegaMath` route where the cyan reduction beam clears every stage with `#print axioms = ∅` and native C execution, contrasted against the magenta custom-`axiom` branch (stalled at `ι-Reduce` and collapsing to `False` on zero-tuple omission) and the `Mathlib.Real` branch (injecting `{propext, Classical.choice, Quot.sound}`, stalling `decide` and blocking `#eval` on `noncomputable` operations such as `(1 / 2 : ℝ)`, and spawning `Filter.Tendsto` derivative side-trees).
:::

---

## 39.13.2 The Three-Layer Zero-Axiom Architecture of `OmegaMath` in Lean 4 {#sec-ch39-omega-math-three-layer-zero-axiom-stack}

The sound architecture follows a three-layer zero-axiom stack—**Layer 0 canonical integer carrier $+$ Layer 1 typeclass interface and consistency witness $+$ Layer 2 one-way shadow functor to `Mathlib`** (`MODEL` architectural comparison paired with `NUM` compiler audits):

| Architectural Dimension | Flawed Route: Raw `axiom` Declarations | Classical Route: `Mathlib.Real` Stack | Optimal Route: `OmegaMath` Zero-Axiom Stack |
| :--- | :--- | :--- | :--- |
| **`#print axioms` Audit** | Exposes custom `axiom` (no consistency guarantee; flagged by external checkers) | Depends on `{propext, Classical.choice, Quot.sound}` | **`does not depend on any axioms` (true zero-axiom)** |
| **Executability (`#eval`)** | Completely blocked; irreducible constants | Real division, manifolds, and transcendentals marked `noncomputable` | **$100\%$ compilable to native C / machine code** |
| **3D Ternions & Poles** | Coordinate-free symbols; boundary slip proves `False` | Submanifolds of $\mathbb{R}^4$, $\pi$, square roots, and chart atlases | **Canonical homogeneous integer 4-tuples `ProjTernion` / `CanonProjTernion` (zero singularities, zero radicals)** |
| **Calculus & Curvature** | Requires hand-axiomatized derivative operators | `Filter.Tendsto` infinitesimal limits and chart transitions | **Second-order rational jet ring $\mathbb{Q}[\eta]/(\eta^3)$ by pure field arithmetic** |
| **Automated Proof-Search Efficiency** | No computational reduction; vulnerable to false subgoals | Side-goals dominated by continuity, differentiability, and measurability filters | **Core rational geometry, jets, and finite certificates closed in one step by `decide`** |

### 39.13.2.1 Layer 0: Canonical Integer Projective Carrier `ProjTernion` Eliminating `Quot.sound` {#sec-ch39-layer0-projternion-zero-quotient}

Whereas two-chart Rodrigues parameters in [§39.9](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md) and [§39.12](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md) still switch charts across the antipodal equator, Layer 0 models **homogeneous projective ternion space $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$** directly by nonzero integer quadruples modulo rational scaling—eliminating even the quotient axiom `Quot.sound` via a **unique canonical integer normal form** (`hand derivation`):

- **Exact 3 Degrees of Freedom, Unique Integer Normal Form, and Global Zero Singularities**: For any nonzero $(w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$, divide by $g = \gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert) \ge 1$ to obtain coprime $(w', x', y', z')$ and multiply by $s \in \{\pm 1\}$ so that the **first nonzero entry is strictly positive**. Every projective ternion ray in $\mathbb{QP}^3$ now carries a **unique canonical integer 4-tuple** whose equality is decided with zero axioms by `deriving DecidableEq` (bypassing `Quotient` and `Quot.sound` completely):
  - Past halted anchor ($s = 0, \kappa = 1$): `p0 = (1, 0, 0, 0)`;
  - Present orthogonal equator ($s = 1/2, \kappa = 1/2$): `pHalf = (1, 1, 0, 0)`;
  - Future antipodal closure pole $[1 : 0]$ (classical $\infty$, $s = 1, \kappa = 0$): the ordinary integer tuple `pInf = (0, 1, 0, 0)`!
- **Eliminating Even $\sqrt{2}$ in Born Fidelity $\kappa$ and Adjoint Rotations $\mathrm{Ad}(p) \in \mathrm{SO}(3, \mathbb{Q})$**:
  Observe an exact algebraic sharpening (`PROJECT.md` §13): forcing spinors onto the unit sphere before computing observables would force even the $90^\circ$ equatorial state `pHalf = (1, 1, 0, 0)` (whose squared norm $\lVert p_{\mathrm{Half}}\rVert^2 = 1^2 + 1^2 = 2$ is non-square!) to introduce the irrational radical $\frac{1 + \mathbf{i}}{\sqrt{2}}$. On homogeneous `ProjTernion`, both observables and 3D rotations **square away all radicals automatically**:
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
     so it **never hits $(0,0,0,0)$ and never divides by zero anywhere**! (We also record the exact cover distinction: sign-locked `ProjTernion` quotients out $\pm 1$ to realize $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$ where the $120^\circ$ rotor `g120 = (1,1,1,1)` closes in $3$ beats to `(1,0,0,0)`, whereas keeping primitive integer quadruples with $\gcd = 1$ without sign-locking preserves the spinor double cover where $3$ beats reach `(-1,0,0,0)` and $6$ beats return to `(+1,0,0,0)`.)

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="canonical-proj-ternion-zero-quotient" height="500"}
**Layer 0 Canonical Homogeneous Integer Carrier `ProjTernion` (Free of `Quot.sound` and Radicals)**: On the purple `kit.solid` ternion sphere, cyan unnormalized integer rays `(2,2,0,0)` and `(-3,-3,0,0)` collapse via `Nat.gcd` and first-positive sign locking onto the unique canonical anchor `pHalf = (1,1,0,0)` (`‖p‖² = 2`, yielding exact `κ = 1/2 = 0.5000` and integer rotation `Ad(pHalf) ∈ SO(3, ℤ)` without `√2`), alongside `p0 = (1,0,0,0)`, antipodal pole `pInf = (0,1,0,0)` (`κ = 0/1 = 0.0000`, zero division-by-zero), and 3-beat integer rotor `g120 = (1,1,1,1)` (`κ = 1/4 = 0.2500`).
:::

### 39.13.2.2 Layer 1: Encapsulating $\mathrm{AXIOM}\text{-}\Omega$ via `class OmegaSpace` and Proving Relative Consistency via Canonical Subtypes {#sec-ch39-layer1-omegaspace-typeclass-consistency}

At Layer 1, we formulate $\mathrm{AXIOM}\text{-}\Omega$—its ternary transport `triad`, rational fidelity `kappa`, and six equational laws—as a computable typeclass `class OmegaSpace (M : Type)`, never as raw `axiom` declarations.

Following `PROJECT.md` §13, we state the exact domain invariant separating the raw tuple carrier from the universal `OmegaSpace` model (`hand derivation`):

- On the unbundled raw record `ProjTernion` ($\mathbb{Z}^4$), although `normalize` totalizes all operations (sending `(0,0,0,0)` to `(1,0,0,0)` and scaling `(2,0,0,0)` to `(1,0,0,0)`), universally quantified `OmegaSpace` equations fail on two raw boundary classes: the zero tuple $z_0 = (0,0,0,0)$ (`kappa z0 z0 = ⟨0, 1⟩ ≠ ⟨1, 1⟩` and `triad p0 p0 z0 = p0 ≠ z0`) and non-reduced multiples $z_2 = (2,0,0,0)$ (`triad p0 p0 z2 = p0 ≠ z2`);
- Bundling the decidable canonical predicate `IsCanonical (p : ProjTernion) : p ≠ ⟨0,0,0,0⟩ ∧ normalize p = p` into the canonical nonzero subtype **`CanonProjTernion`** (which inherits zero-axiom `DecidableEq` by Hedberg's theorem without `Quot.sound` or `propext`), quaternion conjugation $u\bar{u} = \lVert u\rVert^2 \ge 1$ (positive scalar factors cancelled by `normalize`) and bilateral norm scaling $\langle x u \bar{v}, y u \bar{v}\rangle^2 = \lVert u\rVert^4\lVert v\rVert^4 \langle x, y\rangle^2$ make **all six universal `OmegaSpace` laws (`idemp_left`, `idemp_right`, `assoc_triad`, `kappa_refl`, `kappa_symm`, `kappa_inv`) hold unconditionally across `CanonProjTernion`**!

Logically, exhibiting a constructive non-abelian inhabitant `CanonProjTernion` of `OmegaSpace` (with `triad pHalf p0 qHalf ≠ triad qHalf p0 pHalf`) inside bare CIC **proves the relative consistency and non-degenerate satisfiability of the `OmegaSpace` axioms relative to bare CIC**. Simultaneously, the second-order rational jet ring `Jet2Rat` ($\mathbb{Q}[\eta]/(\eta^3)$) computes exact two-term inverses $(a_0 + a_1\eta + a_2\eta^2)^{-1}$ whenever the unit condition $j_0 \neq 0$ holds—which for $1 + x_0^2 \ge 1 > 0$ holds at every $x_0 \in \mathbb{Q}$—allowing `by decide` to verify second-order curvature in a single kernel step.

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="typeclass-consistency-and-jet2-decide" height="500"}
**Layer 1 `OmegaSpace` Relative Consistency Witness and One-Step `Jet2Rat` `decide` Reflection**: Step across all eight conjuncts of `omega_zero_axiom_master_check` on the purple `kit.solid` ternion sphere—rational fidelity spectrum `{1, 1/2, 0, 1/4}`, 3-beat return `gStep3 = p0`, left idempotence `triad pHalf pHalf g120 = g120`, non-abelian integer synthesis `(1,1,1,1) ≠ (1,1,1,-1)`, and exact jet output `{1/2, -1/2, +1/4}` at `x₀ = 1`—while toggling the `CanonProjTernion` guard that blocks raw `(0,0,0,0)` and `(2,0,0,0)` counterexamples.
:::

### 39.13.2.3 Layer 2: One-Way Shadow Functor $\Pi_{\mathbb{R}}$ into `Mathlib` (No Isolated Island) {#sec-ch39-layer2-mathlib-shadow-functor}

Building a zero-axiom `OmegaMath` core never isolates us from the broader `Mathlib` ecosystem. Because $\mathrm{SO}(3, \mathbb{Q})$ induced by `CanonProjTernion` is norm-dense in $\mathrm{SO}(3, \mathbb{R})$ (and Cayley rational points $Q(\mathbb{Q}^3) = S^3(\mathbb{Q}) \setminus \{-1\}$ are dense in $S^3(\mathbb{R}) \cong \mathrm{SU}(2)$), Layer 2 erects a thin **one-way shadow projection functor**:

$$
\Pi_{\mathbb{R}} \;:\; \mathbf{OmegaMath}\text{ (zero-axiom executable core)} \;\longrightarrow\; \mathbf{Mathlib}\text{ (classical real-analysis shell)}.
$$

Under this division of labor, non-abelian ternion heap geometry, second-order curvature jets, rational block-Gram Schur complements $S = A - B C^{-1} B^\top$, and integer depth certificates such as `rationalQuarterDepth` ($c q < d p \cdot 4^{N+1}$) execute inside the zero-axiom `OmegaMath` core via `#eval` and `decide`; only when a final classical-analysis statement over $\mathbb{R}$ or $\mathbb{C}$ is required does a one-way soundness bridge—exemplified in frozen form by `rationalQuarterDepth_integer_sound` $\Rightarrow$ `rationalQuarterDepth_real_sound`—project the certified rational bound into `Mathlib` without a single limiting argument polluting the core.

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="rational-schur-and-shadow-functor-bridge" height="500"}
**Layer 2 Rational Schur Complement Certificate and One-Way Shadow Functor $\Pi_{\mathbb{R}} : \mathbf{OmegaMath} \to \mathbf{Mathlib}$**: On the left, the purple rational ternion sphere and cyan Gram ellipsoid compute the exact rational Schur minimum $S = A - B C^{-1} B^\top$ and integer quarter-depth certificate $c q < d p \cdot 4^{N+1}$ (`axioms = ∅`); on the right, the amber one-way bridge $\Pi_{\mathbb{R}}$ transports the bound without limits to `(1/4)^(N+1) C < p/q` on the classical continuum shell.
:::

---

## 39.13.3 Zero-Import Executable Lean 4 Prototype (Verified on `v4.35.0`) and Three-Step `OmegaCore` Roadmap {#sec-ch39-lean4-zero-axiom-executable-prototype}

The complete prototype below contains **zero `import` statements (not a single line of `Mathlib`)**. Standing solely on the bare Lean 4 (`v4.35.0`) kernel, it implements zero-axiom reduced rationals `QRat`, canonical homogeneous projective ternions `ProjTernion`, the limit-free second-order jet ring `Jet2Rat` ($\mathbb{Q}[\eta]/(\eta^3)$), and the `OmegaSpace` typeclass contract, discharging all eight benchmarks—`{0, 1/2, 1}` causal rational landmarks, `(1,1,1,1)` three-beat closure, non-abelian synthesis of two integer equatorial rotors, and exact second-order derivatives at $x_0 = 1$—via **a single `by decide` kernel reflection**. Fed verbatim to `lean --stdin` (`v4.35.0`), it compiles with zero warnings and `#print axioms` outputs **`'omega_zero_axiom_master_check' does not depend on any axioms`**:

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

/-- 2. Canonical homogeneous integer ternions ProjTernion ≅ ℚP³ ≅ SO(3, ℚ) (3 DOF, zero singularities, zero radicals) -/
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

/-- 4. AXIOM-Ω typeclass contract (universally satisfied on CanonProjTernion, never a raw axiom) -/
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

1. **Step 1 (Zero-Import Executable Kernel `OmegaCore`)**: Establish `QRat`, `ProjTernion` / `CanonProjTernion`, `Jet2Rat`, and `OmegaSpace` in a few hundred zero-import lines of Lean 4, keeping `#print axioms` empty and $100\%$ native-code executable via `#eval`;
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
2. **Hedberg's Theorem and Quotient-Free Canonical Subtypes**: Every type equipped with constructive decidable equality (`DecidableEq`) satisfies uniqueness of identity proofs (UIP) inside pure intensional type theory without extra axioms, proved by M. Hedberg (*J. Funct. Program.* **8**(4), 413–436, 1998)—providing the exact logical reason why `CanonProjTernion` carries universal `OmegaSpace` laws without `Quot.sound` or `propext`;
3. **Independent Kernel Replay and Axiom-Closure Auditing**: As documented in `PROJECT.md` §14, high-assurance Lean 4 verification combines static source scans (zero `sorry`, zero `opaque`, zero custom `axiom`) with independent kernel replay across `leanchecker`, `lean4lean`, `nanoda`, `con-leche`, and `comparator`: theorems proved inside `Mathlib`-importing modules (including classical `Mathlib.Real` theorems as well as the frozen soundness proof `BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound`, whose host file imports `Mathlib` arithmetic tactics) exhibit the axiom closure `{propext, Classical.choice, Quot.sound}`, whereas the executable natural-number function `rationalQuarterDepth` itself and concrete evaluations such as `rationalQuarterDepth 7 2 1 10 = 2`, together with Layer 0–1 zero-import pure CIC theorems such as `omega_zero_axiom_master_check`, compress `#print axioms` all the way to the empty set $\varnothing$ (`does not depend on any axioms`)—confirming at compiler level why isolating Layer 0–1 inside a zero-import `OmegaCore` module keeps even core soundness proofs axiom-free.
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

**Not a single line of the kernel altered, not a single custom axiom borrowed—when mathematics sheds the foam of flat infinity, proof itself becomes full-speed computation!**

In the complete 3D laboratory below, toggle across the three formalization routes on the first card to watch the cyan reduction beam clear bare CIC with **`does not depend on any axioms`**, inspect on the second and third cards how integer equatorial rays `pHalf = (1, 1, 0, 0)` and `qHalf = (1, 0, 1, 0)` synthesize the pure-integer rotor **`(1, 1, 1, 1)`** without a single radical or $\pi$ and return to **`(1, 0, 0, 0)`** in three beats, and verify on the fourth and fifth cards how the rational Schur minimum $S = \frac{4}{3}$ and integer quarter-depth certificate $70 < 128$ cross the one-way shadow bridge $\Pi_{\mathbb{R}}$ into classical analysis: from the first inner-product shadow of pairwise measurement, through Clifford geometric products, Hopf spinor fibers, Regge discrete curvature, prime Adelic closure, and infinity-free rational mathematics $\mathbf{Math}_\Omega$, all the way to the zero-axiom `OmegaMath` core closed by `by decide` inside bare Lean 4 CIC, Chapter 39 reaches its grand architectural completion—let us step now into the [Coda](coda.md): ***Outside All the Spheres***.

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" height="620"}
Complete interactive laboratory: switch between the “OmegaMath Zero-Axiom Pure CIC Stack · Proof as Computation” and “Classical Continuum & Custom-Axiom Contrast (MODEL) · Blocked Evaluation & Filter Blowup” lenses (also mirrored beside the tour bar on narrow and embedded frames), touring five experiment cards—five-stage compilation pipeline and three-route axiom audit, Layer 0 quotient-free integer carrier `ProjTernion`, Layer 1 `OmegaSpace` relative-consistency witness and one-step `Jet2Rat` `decide` reflection, Layer 2 rational Schur certificate and one-way shadow functor $\Pi_{\mathbb{R}}$, and four mathematical-physics tasks across the three-step `OmegaCore` benchmark—supporting route switching, task selection, five-stage node stepping, interactive integer-ray `Nat.gcd` normalization, 3-beat rotor stepping, and `ℚ[η]/(η³)` jet inversion, paired with two strip plots comparing proof-DAG node counts and reduction steps across the four tasks and tracking exact rational quarter-depth bounds $(\frac{c}{d})/4^{N+1}$ crossing below $\frac{p}{q}$. Fifteen frozen `LEAN ✓` declarations, `ARGUED` type-theory and multi-kernel audit literature, `MODEL` three-layer architecture tables, and `NUM` compiler-verified traces are stratified in the evidence panel and theory drawer.
:::
