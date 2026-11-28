# Chapter 18 Empty-Kernel Auditing, the One-Way Shadow Functor, and the Six-Volume Workbench

> *“Select a strict library root, follow its imports, and replay that closure in a fresh Lean kernel. Then follow a single circle identity across the bridge and read which axioms its real proof uses.”*

From homogeneous projective closure to non-Abelian spinor machines and the self-contained observer, the six volumes lead to two questions we can put to Lean 4. Which strict library import closures can replay in an empty kernel? Which axioms do the theorems cited in the book use on each backend?

Section 18.1 starts with six projective-circle theorems and reaches the classical real layer through the quarter-depth budget and `OmegaShadowBridge`. Section 18.2 compares the teaching prototype built on `Init.Rat` with the strict libraries and explains the evidence for library replay and for D5 on both backends. Section 18.3 returns to the four-mode `OMEGA//LAB` workbench.

## 18.1 Three-Layer Architecture, Strict Core Theorems, and the Shadow Functor {#sec-om-ch18-three-layer-architecture}

Formalizing infinity-free, transcendental-free mathematics in Lean 4 neither alters the underlying Calculus of Inductive Constructions (CIC) kernel nor permits custom `axiom` declarations (which block kernel $\iota$-reduction, risk silent collapse to `False` if a zero-tuple guard is omitted, and fail independent kernel audits). Instead, the architecture separates cleanly into three layers (`MODEL` architectural division anchored by frozen **`LEAN ✓`** declarations):

1. **Layer 0: Quotient-Free Canonical Integer Carriers (Eliminating `Quot.sound`)**:
   - In the strict backend’s `OmegaInit` + `OmegaMath`, every file opens with `module` and `prelude`, closing off implicit official `Init` imports entirely. `Omega.Nat`, `Omega.Int`, `Omega.Ratio`, and `Omega.IntRatio` store finite fractions with positive predecessor denominators, define equivalence by cross-multiplication (`IntRatio.Equivalent`), and propagate `undefined` cleanly without touching `Quot.sound`;
   - The `Init` reflection examples reduce `QRat` integer pairs by their GCD. The `ProjTernion` structure below stores four raw integers, including the zero tuple and scalar multiples. On nonzero rays, Chapter 3 obtains `CanonProjTernion` by dividing by the common GCD and choosing the first nonzero coordinate positive.
2. **Layer 1. Model laws as typeclass fields**
   Chapter 1’s schematic `OmegaSpace` packages ternary cancellation and associativity with reflexivity, symmetry and two-sided invariance of the reading. A full model of AXIOM-Ω also needs reading separation, nonnegativity, Gram positivity, zero-reaching, a noncommutative witness and a specified comparison class for minimality. Chapter 3 gives a hand argument on normalized representatives. The companion `QRat` prototype checks a finite conjunction of examples. Constructing an `OmegaSpace` instance would require proofs of its universally quantified fields.
3. **Layer 2: One-Way Shadow Functor $\Pi_{\mathbb{R}} : \mathbf{OmegaMath} \to \mathbf{Mathlib}$**:
   For example, the strict circle theorem certifies an identity of integer ratios. `OmegaShadowBridge` transports it to the real numbers. Appendix A lists the strict and official dependencies of the core theorems and the official dependencies of the bridge.

At the pinned commit [{commit}](trureturing:), the `strict_omega` records for these six projective-circle theorems list only `OmegaInit` and `OmegaMath` and give `[]` for the axioms of each. The official record for antipodal closure, `cayley_antipodal_closure`, lists `propext` alone. For both sets of records, see [Appendix A §A.3](appendix-a.md#sec-om-appa-frozen-registry).

::: {.theorem #thm-om-ch18-wave1-zero-axiom-circle title="Projective-Circle Theorems: Projective Scaling, Complement Closure, Cayley Unit Circle, Antipodal Pole, and Norm Multiplicativity" lean="D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_scale D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure D5/S3/Quantum/AURICOmega/OmegaCircleClosure.projective_circle_mul_normSq"}
The six D5 theorems below use the `OmegaInit` and `OmegaMath` interfaces.

1. **Positive natural scaling invariance** (`ProjectiveOverlapScaling.kappa_scale`): for all `p q k : Omega.Nat`, `Omega.Projective.kappa (p.mul k.succ) (q.mul k.succ)` is equivalent to `Omega.Projective.kappa p q` under `Omega.Ratio.Equivalent`, including the case $p = q = 0$ where both readings are undefined;
2. **Nonzero signed integer scaling invariance** (`OmegaCircleClosure.kappa_scale`): for all `p q k : Omega.Int` with `hk : Not (Eq k Int.zero)`, `IntRatio.Equivalent (kappa (k.mul p) (k.mul q)) (kappa p q)`;
3. **Overlap-plus-spread unit sum** (`OmegaCircleClosure.kappa_add_spread_eq_one`): for all `p q : Omega.Int` satisfying `Nonzero p q`, `IntRatio.Equivalent ((kappa p q).add (spread p q)) (IntRatio.ofInt Int.one)`;
4. **Cayley unit-circle closure** (`OmegaCircleClosure.cayley_circle_unit`): for every `Nonzero p q`, the squared coordinates of `(cayleyX p q, cayleyY p q)` sum to `IntRatio.ofInt Int.one` under `IntRatio.Equivalent`;
5. **Finite antipodal closure at infinity** (`OmegaCircleClosure.cayley_antipodal_closure`): for every nonzero `p : Omega.Int`, the point $[p : 0]$ simultaneously satisfies `kappa p 0 ≈ 0`, `spread p 0 ≈ 1`, `cayleyX p 0 ≈ -1`, and `cayleyY p 0 ≈ 0` under `IntRatio.Equivalent`;
6. **Homogeneous multiplication norm multiplicativity** (`OmegaCircleClosure.projective_circle_mul_normSq`): for all `p₁ q₁ p₂ q₂ : Omega.Int`, `(normSq p₁ q₁).mul (normSq p₂ q₂) = (projectiveMul p₁ q₁ p₂ q₂).normSq`.
:::

::: {.proof}
All six theorems are proved directly inside `module` + `prelude` files from inductive arithmetic lemmas in `Omega.Nat`, `Omega.Int`, and `Omega.IntRatio`: scaling follows by cancelling the nonzero squared factor (and matching undefined cases at zero), complement sum and Cayley unit length follow from the pure integer ring identity $(q^2 - p^2)^2 + (2pq)^2 = (p^2 + q^2)^2$, antipodal closure evaluates directly at $q = 0$ cancelling $p^2 \neq 0$, and norm multiplicativity is the Brahmagupta–Fibonacci two-square identity. The full proof is checked by the Lean kernel.
:::

Layer 2's one-way shadow bridge $\Pi_{\mathbb{R}}$ is exemplified by the frozen quarter-depth soundness pair below.

::: {.theorem #thm-om-ch18-shadow-bridge title="Exact Integer Soundness and Limit-Free Real Transport of the Quarter-Depth Budget" lean="D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_real_sound"}
Define `rationalQuarterDepth c d p q := Nat.log 4 ((c * q) / (d * p))`. For natural numbers $c, d, p, q, N \in \mathbb{N}$ with $0 < d$, $0 < p$, and `rationalQuarterDepth c d p q ≤ N`:

1. **Core exact integer certificate** (`rationalQuarterDepth_integer_sound`): $c \cdot q < (d \cdot p) \cdot 4^{N + 1}$;
2. **Outer limit-free real transport** (`rationalQuarterDepth_real_sound`): if additionally $0 < q$ and a real majorant $C \in \mathbb{R}$ satisfies $C \le \frac{c}{d}$, then without any limiting argument $(\frac{1}{4})^{N+1} C < \frac{p}{q}$.
:::

::: {.proof}
By definition of `Nat.log 4`, the integer quotient $(cq)/(dp)$ is strictly less than $4^{N+1}$; Euclidean division $cq = (dp)((cq)/(dp)) + (cq \bmod dp)$ with remainder $< dp$ immediately yields $cq < (dp) \cdot 4^{N+1}$ in $\mathbb{N}$. A one-way order-preserving cast into $\mathbb{R}$ then gives $\frac{c/d}{4^{N+1}} < \frac{p}{q}$, and monotonicity against $C \le \frac{c}{d}$ concludes the real bound. The full proof is checked by the Lean kernel.
:::

To transport the Layer 0–1 zero-axiom carriers `Omega.Nat`, `Omega.Int`, `Omega.IntRatio`, and `Omega.Projective.Circle` directly and one-way outward into standard `Mathlib` arithmetic over $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$, the Layer-2 bridge module `OmegaShadowBridge` exports all eleven frozen theorems below:

::: {.theorem #thm-ch18-omega-shadow-bridge title="Layer-2 One-Way Shadow Functor: Exact Transport of Arithmetic and Projective Circle Laws into Mathlib" lean="D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdNat_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdNat_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_neg D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_equivalent D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_inv D5/S3/Quantum/AURICOmega/OmegaShadowBridge.cayley_circle_unit D5/S3/Quantum/AURICOmega/OmegaShadowBridge.kappa_unit_interval"}
In the Layer-2 bridge module `D5/S3/Quantum/AURICOmega/OmegaShadowBridge`, define structural readings `toStdNat : Omega.Nat → ℕ` and `toStdInt : Omega.Int → ℤ`, define `toRat : Omega.IntRatio → ℚ` sending every finite fraction `IntRatio.fraction a d` to `(toStdInt a : ℚ) / (toStdInt (IntRatio.denominator d) : ℚ)` and `IntRatio.undefined` to `0`, and set the real shadow `toReal (x : IntRatio) : ℝ := (toRat x : ℝ)`. Then all eleven exact transport laws hold simultaneously:

1. **Natural and integer homomorphisms** (`toStdNat_add`, `toStdNat_mul`, `toStdInt_neg`, `toStdInt_add`, `toStdInt_mul`): for all `a, b : Omega.Nat`, `toStdNat (a.add b) = toStdNat a + toStdNat b` and `toStdNat (a.mul b) = toStdNat a * toStdNat b`; for all `a, b : Omega.Int`, `toStdInt a.neg = -toStdInt a`, `toStdInt (a.add b) = toStdInt a + toStdInt b`, and `toStdInt (a.mul b) = toStdInt a * toStdInt b`;
2. **Rational equivalence collapse and operation transport** (`toRat_equivalent`, `toRat_add`, `toRat_mul`, `toRat_inv`): for all `x, y : IntRatio`, `IntRatio.Equivalent x y` implies `toRat x = toRat y`; for all finite fractions `IntRatio.fraction a b` and `IntRatio.fraction c d`, `toRat ((fraction a b).add (fraction c d)) = toRat (fraction a b) + toRat (fraction c d)`; and for all `x, y : IntRatio` (including `undefined`, sent to `0`), `toRat (x.mul y) = toRat x * toRat y` and `toRat x.inv = (toRat x)⁻¹`;
3. **Real Cayley unit-circle and overlap-interval transport** (`cayley_circle_unit`, `kappa_unit_interval`): for all `p, q : Omega.Int` with `Nonzero p q`, the real Cayley image satisfies

   $$
   \mathrm{toReal}(\mathrm{cayleyX}\;p\;q)^2 + \mathrm{toReal}(\mathrm{cayleyY}\;p\;q)^2 = 1;
   $$

   and for all `p, q : Omega.Int` (including the origin $(0, 0)$, where `kappa 0 0 = undefined` maps to `0`),

   $$
   0 \le \mathrm{toReal}(\mathrm{kappa}\;p\;q) \le 1.
   $$

:::

::: {.proof}
The natural and integer homomorphisms follow by structural induction on `Omega.Nat` and `Omega.Int`, using helper lemmas `toStdInt_negOfNat` and `toStdInt_subNatNat` to match the `ofNat`/`negSucc` branches with standard `ℤ` arithmetic. For rational transport, positivity of `IntRatio.denominator d = d + 1` lets cross-multiplication equivalence descend via `div_eq_div_iff` (`toRat_equivalent`), while `div_add_div` and denominator multiplicativity establish `toRat_add` on finite fractions; splitting on `undefined` versus `fraction` and using `0 * q = 0` and `0⁻¹ = 0` in `Mathlib`'s `ℚ` closes `toRat_mul` and `toRat_inv` globally. Finally, the zero-axiom core laws `Omega.Projective.Circle.cayley_circle_unit` and `kappa_spread_unit_interval` pass through `toRat_equivalent`, `toRat_le`, and the order-preserving ring cast `Rat.cast : ℚ → ℝ`, with the origin case `p = q = 0` checked directly since `0 ∈ [0, 1]`. The full proof is checked by the Lean kernel.
:::

The theorems in [@thm-ch18-omega-shadow-bridge] connect the constructions in Layers 0–1 to Layer 2. At the pinned commit, their official axiom records fall into four groups. `toStdNat_add` has `[]`, `toStdNat_mul` depends on `propext` alone, `toStdInt_neg`, `toStdInt_add`, and `toStdInt_mul` depend on `Quot.sound` and `propext`, and the six rational and real readout theorems depend on `Classical.choice`, `Quot.sound`, and `propext`. The bridge imports core libraries, and the strict core’s import closure stays within the strict library layers.

The diagram places empty-kernel replay of the strict library alongside the paired D5 records and the one-way bridge to the real layer.

::: {.figure src="ch18-three-layer-shadow"}
**The three-layer stack and its one-way shadow bridge.** The blue frame marks the selected import closure used for strict library replay. The box below shows the two D5 axiom records. The violet arrows lead through `OmegaShadowBridge` to the `Mathlib` real layer.
:::

## 18.2 Six-Volume Core Prototype and Honest Compiler Axiom Audit {#sec-om-ch18-six-volume-prototype-and-honest-audit}

To display the algebraic skeleton spanning all six volumes on a single page, we present a compact, human-readable `OmegaMath.Core` prototype uniting `QProj1` (Vol I), `ProjTernion` and `detGram3` (Vols I–II), `Jet2` (Vol III), `SphericalFourier` (Vol IV), `heckeT5Chi1` (Vol V), and `omegaFractranStep?` (Vol VI) in one unified check `omega_math_grand_kernel_verified`:

```lean
-- Human-readable prototype using standard Init.Rat to expose the six-volume skeleton;
-- see the Honest Compiler Audit remark below separating Init.Rat from true zero-axiom stacks!
namespace OmegaMath.Core

/-- Vol I: Homogeneous projective line ℚP¹ (including the antipodal pole [1 : 0]) -/
structure QProj1 where
  p : Int
  q : Int
  deriving Repr

def QProj1.kappa (x : QProj1) : Rat :=
  let d : Int := x.p * x.p + x.q * x.q
  if d = 0 then 0 else (x.q * x.q : Rat) / (d : Rat)

def QProj1.spread (x : QProj1) : Rat :=
  let d : Int := x.p * x.p + x.q * x.q
  if d = 0 then 0 else (x.p * x.p : Rat) / (d : Rat)

/-- Vols I–II: Raw integer quadruples and quaternion multiplication -/
structure ProjTernion where
  w : Int
  x : Int
  y : Int
  z : Int
  deriving Repr, DecidableEq

def ProjTernion.qmul (a b : ProjTernion) : ProjTernion :=
  ⟨a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z,
   a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y,
   a.w*b.y - a.x*b.z + a.y*b.w + a.z*b.x,
   a.w*b.z + a.x*b.y - a.y*b.x + a.z*b.w⟩

def ProjTernion.normSq (a : ProjTernion) : Int :=
  a.w*a.w + a.x*a.x + a.y*a.y + a.z*a.z

/-- Vol II: Bargmann–Gram 3×3 spherical triangle determinant -/
def detGram3 (c12 c23 c31 : Rat) : Rat :=
  1 + 2 * c12 * c23 * c31 - c12 * c12 - c23 * c23 - c31 * c31

/-- Vol III: Second-order nilpotent jet ring ℚ[η]/(η³) with exact two-term inverse -/
structure Jet2 where
  j0 : Rat
  j1 : Rat
  j2 : Rat
  deriving Repr

def Jet2.mul (a b : Jet2) : Jet2 :=
  ⟨a.j0*b.j0, a.j0*b.j1 + a.j1*b.j0, a.j0*b.j2 + a.j1*b.j1 + a.j2*b.j0⟩

def Jet2.inv (a : Jet2) : Jet2 :=
  let i0 := a.j0⁻¹
  let u1 := a.j1 * i0
  let u2 := a.j2 * i0
  ⟨i0, -(i0 * u1), i0 * (u1 * u1 - u2)⟩

/- Vol IV: Pi-free spherical Chebyshev spin-shell characters and Catalan Haar moments -/
namespace SphericalFourier
def chi1 (k : Rat) : Rat := 4 * k - 1
def chi2 (k : Rat) : Rat := 16 * k * k - 12 * k + 1
def haarMoment : Nat → Rat
  | 0 => 1 | 1 => 1 / 4 | 2 => 1 / 8 | 3 => 5 / 64 | _ => 0
end SphericalFourier

/-- Vol V: Norm-5 Hurwitz Hecke spin-1 rational trace (at κ = 1/5) -/
def heckeT5Chi1 : Rat := SphericalFourier.chi1 (1 / 5)

/-- Vol VI: Non-Abelian Ω-FRACTRAN exact divisibility gate -/
def omegaFractranStep? (psi gate : ProjTernion) (d : Int) : Option ProjTernion :=
  let prod := ProjTernion.qmul psi gate
  if d ≠ 0 ∧ prod.w % d = 0 ∧ prod.x % d = 0 ∧ prod.y % d = 0 ∧ prod.z % d = 0 then
    some ⟨prod.w / d, prod.x / d, prod.y / d, prod.z / d⟩
  else none

/-- Unified six-volume rational invariant check (readable prototype; see audit table below) -/
def omega_math_grand_kernel_verified : Prop :=
  let pole : QProj1 := ⟨1, 0⟩
  let psiXY : ProjTernion := ⟨1, 2, 2, 4⟩
  let psiYX : ProjTernion := ⟨1, 2, 2, -4⟩
  let gateUnwindY : ProjTernion := ⟨1, 0, -2, 0⟩
  pole.kappa = 0 ∧ pole.spread = 1 ∧
  detGram3 (1 / 2) (1 / 2) (1 / 2) = 1 / 2 ∧
  (Jet2.inv ⟨2, 2, 1⟩).j2 = 1 / 4 ∧
  SphericalFourier.chi1 (1 / 4) = 0 ∧
  heckeT5Chi1 = -(1 / 5) ∧
  omegaFractranStep? psiXY gateUnwindY 5 = some ⟨1, 2, 0, 0⟩ ∧
  omegaFractranStep? psiYX gateUnwindY 5 = none

end OmegaMath.Core
```

::: {.remark #rem-om-ch18-honest-compiler-audit title="Honest Compiler Axiom Audit: Init.Rat Prototype vs. True Zero-Axiom QRat and OmegaInit Stacks"}
The `Init.Rat` teaching prototype, the executable `QRat` prototype, the strict libraries, the paired D5 consumers, and the real bridge each have their own verification evidence.

1. **The `Init.Rat` teaching prototype.** In Lean `v4.35.0`, `Rat.add`, `Rat.mul`, and `Rat.div` depend on `propext`, `Classical.choice`, and `Quot.sound`. `Rat.inv` depends on `propext` and `Quot.sound`. The standalone function `fun (a b : Rat) => a == b` has an empty axiom closure. For `(1 : Rat) + 1 = 2`, `by decide` gets stuck reducing `Rat.add`.
2. **The `QRat` prototype using `Init`.** Section 32.8 of the companion book uses `Nat.gcd` to normalize integer pairs. Lean checks the finite example `omega_zero_axiom_master_check` by `decide`, and `#print axioms` reports an empty dependency list.
3. **Strict library replay and paired D5 checks.** The strict libraries use `prelude` to disable implicit official `Init` imports. `OmegaChecks.Audit` inspects the axioms and declaration kinds in the transitive import closure of selected library roots, then replays that closure in `mkEmptyEnvironment`. D5 consumers are compiled separately and their exports compared. On each measured declaration row, `strict_omega.axioms` gives the strict dependencies and `axioms` gives the official ones. For the commands, see [Appendix A §A.6](appendix-a.md#sec-om-appa-audit-checklist).

| Implementation Tier | Import Closure | Axiom Evidence | Verification | Engineering Role |
| :--- | :--- | :--- | :---: | :--- |
| **Readable `Init.Rat` prototype** | Implicit `Init` (`Rat`/`BEq`) | `{propext, Classical.choice, Quot.sound}` | No | Pedagogical six-volume blueprint |
| **`QRat` prototype** | Implicit `Init` (uses `QRat`) | `∅` (`does not depend on any axioms`) | Axiom-only | Native `#eval` and one-step `decide` |
| **Strict libraries** | Selected import closure in `OmegaInit`, `OmegaMathlib`, and `OmegaMath` | Empty transitive axiom dependencies for every declaration in the closure | Empty-kernel replay | Constructive foundation |
| **D5 consumers on both backends** | The same sources built with strict and official interfaces | On a paired declaration row, `strict_omega.axioms` for strict and `axioms` for official | Paired builds, export comparison, and per-backend measurement | Frozen theorems cited in the book |
| **Layer-2 `OmegaShadowBridge` and `Mathlib.Real` shell** | `OmegaInit`/`OmegaMath` + `Init`/`Mathlib` (one-way bridge, [@thm-ch18-omega-shadow-bridge]) | Graduated: `[]` / `propext` / `{Quot.sound, propext}` up to `{propext, Classical.choice, Quot.sound}` | No | Outer analysis via shadow functor $\Pi_{\mathbb{R}}$ |
:::

The film below walks through the chapter's audit from start to finish: the two records of the strict circle theorems, empty-kernel replay of the strict libraries, the one-way bridge to the reals, and the axiom boundary of the teaching prototype.

::: {.film src="auditing-the-empty-kernel"}
**One circle theorem carries one axiom record for the strict backend and another for the official one, selected strict import closures replay in an empty kernel, and the reals sit on the far side of a one-way bridge (2 min 47 s).** The film opens with the three-layer architecture (a model division, violet) and the equivalence $2/4 \sim 1/2$ given by cross multiplication, $2 \times 2 = 4 \times 1$ (computed on screen). The integer pair $(1, 2)$ has squared norm $5$ and the amber Cayley image $(3/5, 4/5)$; the magenta pole $[1 : 0]$ lands at $(-1, 0)$; and $(1, 2) \cdot (1, 2) = (4, 3)$ has squared norm $25 = 5 \times 5$ (computed on screen). The small cyan dots are all Cayley images with $\lvert p \rvert, \lvert q \rvert \le 7$, and the green tags refer to [@thm-om-ch18-wave1-zero-axiom-circle]. In the table of frozen records, the strict records of the six projective-circle theorems list `OmegaInit`, `OmegaMath` and the empty axiom list `[]`, the official records list `propext`, and the antipodal-closure row is marked in amber. The import closure, the declaration checks of `OmegaChecks.Audit` and the replay in `mkEmptyEnvironment` follow the chapter's description of the audit, and the import graph is schematic (violet). Across the bridge, $2/4$ and $1/2$ both read $1/2$ and $(3/5, 4/5)$ lies on the real unit circle; the two green tags refer to `toRat_equivalent` and `cayley_circle_unit` in [@thm-ch18-omega-shadow-bridge], and the magenta boxes sort the official records of the eleven bridge theorems into four groups: `[]`, `propext`, `Quot.sound, propext`, and `Classical.choice, Quot.sound, propext`. Finally, the eight clauses of the `Init.Rat` teaching prototype are recomputed exactly on screen, and the gate passes $\langle 1, 2, 0, 0 \rangle$ and blocks the other product; the prototype's axiom dependencies and the evidence for each tier are stated in [@rem-om-ch18-honest-compiler-audit] (violet).
:::

## 18.3 Guided Walkthrough of the Four-Mode Six-Volume Workbench {#sec-om-ch18-workbench-walkthrough}

To render every invariant across all six volumes tangible and directly inspectable, the monograph pairs with **four 3D interactive laboratories (`OMEGA//SPIN`, `OMEGA//LAB`, `OMEGA//JET`, and `OMEGA//ARC`, totaling 16 experimental cards)**, **19 bespoke bilingual static figures**, and the bilingual **`overview`** slide deck (full index in [Appendix B §B.3](appendix-b.md#sec-om-appb-media-map)); here at the close of Volume VI, the culminating **Four-Mode Six-Volume 3D Holographic Interactive Workbench `OMEGA//LAB`** unites Bargmann–Gram triads, second-order jets, $\pi$-free Haar integrals, and the $p = 5$ Hecke spectrum on one stage. Readers are invited to tour its four modes in sequence:

1. **Mode 1 — Bargmann–Gram Triads and Homogeneous Projective Geometry (Volumes I–II)**: manipulate integer rays and spherical triads across $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$ and $\mathbb{QP}^1$ to verify finite antipodal closure at $[1 : 0]$, origin-free heap transport $[a, b, c]$ with constant unit Lie triple curvature $K \equiv +1$, and the Bargmann–Gram $3\times 3$ determinant $\det G_3 = 1 + 2c_{12}c_{23}c_{31} - c_{12}^2 - c_{23}^2 - c_{31}^2 \ge 0$ alongside rational spherical sine and Pythagorean laws without trigonometric tables.
2. **Mode 2 — Limit-Free Second-Order Jet Calculus (Volume III)**: sweep $x_0 \in \mathbb{Q}$ in $\mathbb{Q}[\eta]/(\eta^3)$ to observe exact two-term algebraic inversion (evaluating at $x_0 = 1$ to $(\frac{1}{2}, -\frac{1}{2}, \frac{1}{4})$ with zero $\lim_{h \to 0}$) contrasted against flat secant approximations, alongside symmetric midpoint Cayley conservation, all-order Cayley–trigonometric composition, and telescoping heap arcs.
3. **Mode 3 — $\pi$-Free Haar Integrals and Peter–Weyl Spin Shells (Volume IV)**: inspect integer even Chebyshev spin-shell characters $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$ on $S^3$ together with Catalan-factorial Haar moments $\int_{S^3}\kappa^n\,d\mu_{\mathrm{Haar}} = \frac{(2n)!}{4^n n!(n+1)!}$, verifying all-degree shell orthonormality $\langle E_m, E_n\rangle_{\mathrm{Haar}} \equiv \delta_{m,n}$ without $\pi$ or continuum Lebesgue measure.
4. **Mode 4 — The $p = 5$ Hecke spectrum and non-Abelian spinors (Volumes V–VI).** Add the norm-$5$ Hurwitz spinors one at a time to see how the six jumps multiply the $\chi_1$ reading by $-\frac{2}{5}$, with a spectral margin of $\frac{496}{25}$. For the axiom records of the corresponding frozen declarations on both backends, see [Appendix A §A.3](appendix-a.md#sec-om-appa-frozen-registry).

Switch among the four modes below to explore the constructions and their exact arithmetic readouts.

::: {.viz src="omega-math-workbench" height="620"}
**Four-mode 3D workbench.** The four cards show rational readouts for Bargmann–Gram triads, second-order jets, $\pi$-free Haar moments, and the $p=5$ Hecke spectrum.
:::
