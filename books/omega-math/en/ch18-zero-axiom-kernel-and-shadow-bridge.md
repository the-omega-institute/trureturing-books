# Chapter 18 Empty-Kernel Auditing, the One-Way Shadow Functor, and the Six-Volume Workbench

> *“Not a single line of the Lean 4 kernel is altered, and not a single custom axiom is smuggled in: keep canonical integer carriers and typeclass consistency inside bare CIC under empty-kernel replay, place classical real analysis beyond a one-way shadow functor, and proof becomes exact executable computation.”*

Having built six volumes from homogeneous projective closure to non-Abelian spinor machines and the self-contained observer, the monograph now faces its sharpest engineering audit: **how does $\mathbf{Math}_\Omega$ compile inside Lean 4 with a literally empty `#print axioms` closure verified by fresh empty-kernel replay, and how do we draw an honest compiler boundary between a readable teaching prototype and the frozen zero-axiom library stack?**

Section 18.1 lays out the three-layer `OmegaInit` + `OmegaMath` architecture, anchored by six Wave 1 zero-axiom (`axioms: []`) frozen theorems, two frozen quarter-depth integer-to-real bridge theorems, and all eleven frozen theorems of the Layer-2 one-way shadow functor `OmegaShadowBridge` (with an explicit layered axiom audit). Section 18.2 presents a concise six-volume `OmegaMath.Core` prototype alongside an explicit compiler audit distinguishing `Init.Rat` (which in Lean `v4.35.0` transitively imports `{propext, Classical.choice, Quot.sound}`) from the true zero-axiom `QRat` and `prelude` `OmegaInit` + `OmegaMath` (`Omega.IntRatio`) stacks. Section 18.3 guides the reader through all four modes of the six-volume 3D holographic interactive workbench.

## 18.1 Three-Layer Zero-Axiom Architecture, Wave 1 Frozen Theorems, and the Shadow Functor {#sec-om-ch18-three-layer-architecture}

Formalizing infinity-free, transcendental-free mathematics in Lean 4 neither alters the underlying Calculus of Inductive Constructions (CIC) kernel nor permits custom `axiom` declarations (which block kernel $\iota$-reduction, risk silent collapse to `False` if a zero-tuple guard is omitted, and fail independent kernel audits). Instead, the architecture separates cleanly into three layers (`MODEL` architectural division anchored by frozen **`LEAN ✓`** declarations):

1. **Layer 0: Quotient-Free Canonical Integer Carriers (Eliminating `Quot.sound`)**:
   - In the frozen strict libraries `OmegaInit` + `OmegaMath`, every file opens with `module` and `prelude`, closing off implicit official `Init` imports entirely. `Omega.Nat`, `Omega.Int`, `Omega.Ratio`, and `Omega.IntRatio` store finite fractions with positive predecessor denominators, define equivalence by cross-multiplication (`IntRatio.Equivalent`), and propagate `undefined` cleanly without touching `Quot.sound`;
   - In executable reflection prototypes over `Init`, GCD-reduced integer pairs `QRat` and first-nonzero-positive integer quadruples `ProjTernion` / `CanonProjTernion` replace `Quotient` with unique canonical normal forms equipped with constructive `DecidableEq` (Hedberg's UIP).
2. **Layer 1: Constructive Relative Consistency via `class OmegaSpace`**:
   The mother laws of $\mathrm{AXIOM}\text{-}\Omega$—ternary transport `triad`, rational fidelity `kappa`, and their six equational identities—are packaged as a computable typeclass `class OmegaSpace (M : Type)` rather than raw `axiom` declarations. Exhibiting a nontrivial non-Abelian inhabitant (such as `CanonProjTernion`) inside bare CIC proves relative consistency and non-degenerate satisfiability constructively.
3. **Layer 2: One-Way Shadow Functor $\Pi_{\mathbb{R}} : \mathbf{OmegaMath} \to \mathbf{Mathlib}$**:
   Projective closure, heap geodesics, jet curvature, rational Schur complements, and integer depth certificates remain inside the zero-axiom Layers 0–1. Only when an external classical statement over $\mathbb{R}$ or $\mathbb{C}$ is needed does a one-way soundness bridge transport the certified rational bound outward into `Mathlib`, preventing `Classical.choice` and limit filters from contaminating the computational core.

The six statements below are the Wave 1 frozen **true zero-axiom** theorems on `trureturing@dev`: every one records `libraries: ["OmegaInit", "OmegaMath"]` and **`axioms: []`**, passing fresh empty-kernel replay.

::: {.theorem #thm-om-ch18-wave1-zero-axiom-circle title="Wave 1 Zero-Axiom Frozen Theorems: Projective Scaling, Complement Closure, Cayley Unit Circle, Antipodal Pole, and Norm Multiplicativity" lean="D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_scale D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure D5/S3/Quantum/AURICOmega/OmegaCircleClosure.projective_circle_mul_normSq"}
Inside the zero-axiom strict libraries `OmegaInit` and `OmegaMath` (`axioms: []`), the following six theorems hold:

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

::: {.theorem #thm-ch18-omega-shadow-bridge title="Layer-2 One-Way Shadow Functor: Exact Transport of Zero-Axiom Arithmetic and Projective Circle Laws into Mathlib" lean="D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdNat_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdNat_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_neg D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_equivalent D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_inv D5/S3/Quantum/AURICOmega/OmegaShadowBridge.cayley_circle_unit D5/S3/Quantum/AURICOmega/OmegaShadowBridge.kappa_unit_interval"}
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

Honest axiom auditing requires distinguishing [@thm-ch18-omega-shadow-bridge] sharply from the zero-axiom Layer 0–1 core. Its frozen state records a transparent, graduated Layer-2 axiom profile: `toStdNat_add` depends only on `Init` and `OmegaInit` with `axioms: []`; `toStdNat_mul` imports `Mathlib` and uses `["propext"]`; `toStdInt_neg` (`Init`, `OmegaInit`) together with `toStdInt_add` and `toStdInt_mul` (`Init`, `Mathlib`, `OmegaInit`) use `["Quot.sound", "propext"]`; and the six rational-to-real transport theorems (`toRat_equivalent`, `toRat_add`, `toRat_mul`, `toRat_inv`, `cayley_circle_unit`, `kappa_unit_interval`) depend on `Init` and `Mathlib` (plus `Batteries` on five of them) within Lean's standard classical/quotient closure `{propext, Classical.choice, Quot.sound}`. The architectural firewall is strict **one-way isolation**: neither `OmegaInit` nor `OmegaMath` ever imports `OmegaShadowBridge` or `Mathlib`, preserving a literal empty axiom closure `axioms: []` across the entire Layer 0–1 core.

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

/-- Vols I–II: Canonical integer ternion carrier and quaternion multiplication -/
structure ProjTernion where
  w : Int; x : Int; y : Int; z : Int
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
  j0 : Rat; j1 : Rat; j2 : Rat
  deriving Repr

def Jet2.mul (a b : Jet2) : Jet2 :=
  ⟨a.j0*b.j0, a.j0*b.j1 + a.j1*b.j0, a.j0*b.j2 + a.j1*b.j1 + a.j2*b.j0⟩

def Jet2.inv (a : Jet2) : Jet2 :=
  let i0 := a.j0⁻¹
  let u1 := a.j1 * i0
  let u2 := a.j2 * i0
  ⟨i0, -(i0 * u1), i0 * (u1 * u1 - u2)⟩

/-- Vol IV: Pi-free spherical Chebyshev spin-shell characters and Catalan Haar moments -/
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
Under honest compiler auditing, **the readable `Init.Rat` prototype above must never be claimed to have an empty `#print axioms` closure**. Direct compiler audits in Lean `v4.35.0` separate four distinct implementation tiers:

1. **Why the readable `Init.Rat` prototype is not axiom-free**: standard `Init.Rat` bundles a `Prop` coprimality field whose arithmetic (`Rat.add`, `Rat.mul`, `Rat.div`) transitively imports `{propext, Classical.choice, Quot.sound}` (`Rat.inv` imports `{propext, Quot.sound}`), while boolean equality `==` (`BEq`) likewise pulls in `Classical.choice`; moreover `Rat` operations stall kernel `by decide`. The listing above serves purely as a compact six-volume specification blueprint;
2. **True zero-axiom path I (zero-import `QRat` executable core)**: replacing `Init.Rat` with a pure integer-pair carrier `QRat` (`Int × Nat` normalized via `Nat.gcd`) and using propositional `Decidable` branches (`=` / `≠` / `>`) instead of `BEq` (`==`) restores one-step `by decide` reduction in Lean `v4.35.0` with `#print axioms` literally printing **`does not depend on any axioms`**;
3. **True zero-axiom path II (frozen `module` + `prelude` `OmegaInit` + `OmegaMath` stack)**: the frozen strict library goes all the way to bare CIC, disabling even implicit official `Init` imports via `prelude` and representing ratios via `Omega.IntRatio` with cross-multiplication equivalence (as in [@thm-om-ch18-wave1-zero-axiom-circle]). Its auditor `OmegaChecks.Audit` verifies zero `.axiomInfo`, zero `.quotInfo`, zero `isUnsafe`, and zero official `Init`/`Mathlib` imports across the transitive closure, then replays every constant into a fresh `mkEmptyEnvironment` kernel!

| Implementation Tier | Import Closure | `#print axioms` Audit | Empty-Kernel Replay | Engineering Role |
| :--- | :--- | :--- | :---: | :--- |
| **Readable `Init.Rat` prototype** | Implicit `Init` (`Rat`/`BEq`) | `{propext, Classical.choice, Quot.sound}` | No | Pedagogical six-volume blueprint |
| **Zero-import `QRat` core** | Implicit `Init` (no `Rat`/`BEq`) | `∅` (`does not depend on any axioms`) | Axiom-only | Native `#eval` and one-step `decide` |
| **Frozen `OmegaInit` + `OmegaMath`** | `module` + `prelude` (strict) | **`axioms: []` (true zero-axiom)** | **Passed** | Frozen zero-axiom foundation |
| **Layer-2 `OmegaShadowBridge` and `Mathlib.Real` shell** | `OmegaInit`/`OmegaMath` + `Init`/`Mathlib` (one-way bridge, [@thm-ch18-omega-shadow-bridge]) | Graduated: `[]` / `propext` / `{Quot.sound, propext}` up to `{propext, Classical.choice, Quot.sound}` | No | Outer analysis via shadow functor $\Pi_{\mathbb{R}}$ |
:::

## 18.3 Guided Walkthrough of the Four-Mode Six-Volume Workbench {#sec-om-ch18-workbench-walkthrough}

To render every invariant across all six volumes tangible and directly inspectable, the closing section embeds the **Four-Mode Six-Volume 3D Holographic Interactive Workbench** (uniting Bargmann–Gram triads, second-order jets, $\pi$-free Haar integrals, and the $p = 5$ Hecke spectrum across Volumes I–VI). Readers are invited to tour its four modes in sequence:

1. **Mode 1 — Bargmann–Gram Triads and Homogeneous Projective Geometry (Volumes I–II)**: manipulate integer rays and spherical triads across $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$ and $\mathbb{QP}^1$ to verify finite antipodal closure at $[1 : 0]$, origin-free heap transport $[a, b, c]$, and the Bargmann–Gram $3\times 3$ determinant $\det G_3 = 1 + 2c_{12}c_{23}c_{31} - c_{12}^2 - c_{23}^2 - c_{31}^2 \ge 0$ locking spherical realizability without trigonometric tables.
2. **Mode 2 — Limit-Free Second-Order Jet Calculus (Volume III)**: sweep $x_0 \in \mathbb{Q}$ in $\mathbb{Q}[\eta]/(\eta^3)$ to observe exact two-term algebraic inversion (evaluating at $x_0 = 1$ to $(\frac{1}{2}, -\frac{1}{2}, \frac{1}{4})$ with zero $\lim_{h \to 0}$) contrasted against flat secant approximations, alongside telescoping heap arcs and osculating curvature.
3. **Mode 3 — $\pi$-Free Haar Integrals and Peter–Weyl Spin Shells (Volume IV)**: inspect integer Chebyshev spin-shell characters $\chi_j(\kappa) = U_{2j}(\sqrt{\kappa})$ on $S^3$ together with Catalan-factorial Haar moments $\int_{S^3}\kappa^n\,d\mu_{\mathrm{Haar}} = \frac{(2n)!}{4^n n!(n+1)!}$, verifying exact shell orthonormality without $\pi$ or continuum Lebesgue measure.
4. **Mode 4 — $p = 5$ Hecke Spectrum, Non-Abelian Prime Spinors, and Kernel Audit (Volumes V–VI)**: activate the six norm-$5$ Hurwitz prime spinors $S_5$ to verify positive rational Hecke–Ramanujan PSD margins $20 - \lambda^2 > 0$ on nontrivial spin shells (such as $\frac{496}{25} > 0$ and average trace $-\frac{1}{5}$ at $j = 1$), linking the same norm-$5$ spinor algebra to the modulo-$5$ $\Omega$-FRACTRAN divisibility gate, the static-canvas memory split, and `OmegaInit`/`OmegaMath` empty-kernel replay.

Launch the full interactive workbench below to verify each link of the six-volume zero-axiom edifice firsthand.

::: {.viz src="omega-math-workbench" height="620"}
Four-Mode Six-Volume 3D Holographic Interactive Workbench: switch across Bargmann–Gram triads (Vols I–II), second-order jets (Vol III), $\pi$-free Haar integrals (Vol IV), and the $p = 5$ Hecke spectrum (Vols V–VI) to inspect exact rational invariants, fraction readouts, and the `OmegaInit`/`OmegaMath` zero-axiom verification boundary live.
:::
