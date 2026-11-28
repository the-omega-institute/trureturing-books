# 第十八章 空内核审计、单向阴影函子与六卷全息工作台

> *“选定一个严格库根，沿导入关系取闭包，在新的 Lean 空内核中重放。再沿着一条圆周恒等式走过桥，看看它的实数证明究竟用了哪些公理。”*

六卷从齐次射影闭环铺展到非阿贝尔旋子机与自包含观察者，最后回到两个可以在 Lean 4 中核对的问题。严格库的哪些导入闭包能在空内核中重放？依赖这些库的书用定理在两种后端各用了哪些公理？

第 18.1 节从六条射影圆周定理出发，经整数四分深度预算与 `OmegaShadowBridge` 读到经典实数层。第 18.2 节用 `Init.Rat` 教学原型对照严格库，并分清库重放与 D5 双端证据。第 18.3 节回到四模式三维工作台 `OMEGA//LAB`。

## 18.1 三层架构、严格后端的核心定理与单向阴影函子 {#sec-om-ch18-three-layer-architecture}

在 Lean 4 中重建无无穷、无超越数的数学，既不需要修改编译器底层归纳构造演算（CIC）内核，也绝不能用 `axiom` 关键字硬塞自定义公理（自定义 `axiom` 不仅阻断内核 $\iota$-归约，一旦漏写零元组等边界前提还会三行推出 `False`，且必遭独立内核审计拒收）。正确的形式化工程划分为彼此隔离的三层（`MODEL` 架构分层配冻结 **`LEAN ✓`** 声明）：

1. **第 0 层：免商规范整数载体（消除 `Quot.sound`）**：
   - 在严格后端的 `OmegaInit` $+$ `OmegaMath` 中，每个源文件均以 `module` 与 `prelude` 开篇，彻底关闭对官方 `Init` 的隐式导入；`Omega.Nat`、`Omega.Int`、`Omega.Ratio` 与 `Omega.IntRatio` 用正分母前驱存储有限比值、以交叉相乘定义等价 `IntRatio.Equivalent` 并将零分母传递为 `undefined`，全程不触碰任何商类型公理 `Quot.sound`；
   - 基于 `Init` 的反射算例用最大公约数约分 `QRat` 整数对。本节原型的 `ProjTernion` 存储四个原始整数，包含零元组和未约分的倍数。第 3 章对非零射线除去公因子并令首个非零分量为正，由此取得 `CanonProjTernion` 的规范代表。
2. **第 1 层 · 用类型类字段表达模型定律**
   第 1 章的 `OmegaSpace` 示意接口列出三元消去律、结合律，以及读数的自反性、对称性和左右不变性。完整的 AXIOM-Ω 模型还须给出读数分离性、非负性、格拉姆正性、可趋零性与非交换见证，并指定判断最小性的比较类。第 3 章在规范代表上给出手工推导。姊妹卷的 `QRat` 原型核验有限个算例的合取。要构造 `OmegaSpace` 实例，还须给出各全称字段的证明。
3. **第 2 层：通往 `Mathlib` 的单向阴影函子 $\Pi_{\mathbb{R}} : \mathbf{OmegaMath} \to \mathbf{Mathlib}$**：
   例如，严格端的圆周定理证明整数比值的恒等式，`OmegaShadowBridge` 再将其传递到实数上。附录 A 给出核心定理的严格端与官方端公理记录，以及桥接定理的官方端记录。

下面六条射影圆周定理在所钉提交 [{commit}](trureturing:) 的 `strict_omega` 记录中只依赖 `OmegaInit` 和 `OmegaMath`，公理均为 `[]`。例如对径闭合 `cayley_antipodal_closure` 的官方记录仅依赖 `propext`。双端记录见 [附录 A §A.3](appendix-a.md#sec-om-appa-frozen-registry)。

::: {.theorem #thm-om-ch18-wave1-zero-axiom-circle title="射影圆周冻结定理组：射影缩放、补和守恒、凯莱单位圆、对径闭合与模方乘性" lean="D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_scale D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure D5/S3/Quantum/AURICOmega/OmegaCircleClosure.projective_circle_mul_normSq"}
以下六条 D5 定理使用 `OmegaInit` 与 `OmegaMath` 接口。

1. **自然数正倍缩放不变性**（`ProjectiveOverlapScaling.kappa_scale`）：对任意 `p q k : Omega.Nat`，缩放后读数与原读数在 `Omega.Ratio.Equivalent` 下等价，包括 $p = q = 0$ 时两端同取未定义值的情形；
2. **有号非零整数缩放不变性**（`OmegaCircleClosure.kappa_scale`）：对任意 `p q k : Omega.Int` 及 `hk : Not (Eq k Int.zero)`，有 `IntRatio.Equivalent (kappa (k.mul p) (k.mul q)) (kappa p q)`；
3. **保真度与失准度补和恒一**（`OmegaCircleClosure.kappa_add_spread_eq_one`）：对任意满足 `Nonzero p q` 的整数对 $(p, q)$，有 `IntRatio.Equivalent ((kappa p q).add (spread p q)) (IntRatio.ofInt Int.one)`；
4. **凯莱圆周单位性**（`OmegaCircleClosure.cayley_circle_unit`）：对任意 `Nonzero p q`，有理凯莱像 `(cayleyX p q, cayleyY p q)` 满足平方和在 `IntRatio.Equivalent` 下等价于 `IntRatio.ofInt Int.one`；
5. **无穷远对径极点有限闭合**（`OmegaCircleClosure.cayley_antipodal_closure`）：对任意非零整数 `p`，对径点 $[p : 0]$ 同时满足 `kappa p 0 ≈ 0`、`spread p 0 ≈ 1`、`cayleyX p 0 ≈ -1` 与 `cayleyY p 0 ≈ 0`（均在 `IntRatio.Equivalent` 下）；
6. **齐次乘法模方乘性**（`OmegaCircleClosure.projective_circle_mul_normSq`）：对任意整数 `p₁ q₁ p₂ q₂`，有 `(normSq p₁ q₁).mul (normSq p₂ q₂) = (projectiveMul p₁ q₁ p₂ q₂).normSq`。
:::

::: {.proof}
六条结论均在 `module` $+$ `prelude` 隔离环境中直接由 `Omega.Nat`、`Omega.Int` 与 `Omega.IntRatio` 的归纳算术恒等式构造证明：缩放恒等式由平方因子约去与零元分支分类给出，补和与凯莱单位圆由 $(q^2 - p^2)^2 + (2pq)^2 = (p^2 + q^2)^2$ 的纯整环展开导出，对径点直接代入 $q = 0$ 约去非零 $p^2$，模方乘性则由婆罗摩笈多—斐波那契两平方恒等式直接证毕。完整证明由 Lean 内核检查。
:::

而第 2 层单向阴影函子 $\Pi_{\mathbb{R}}$ 的标准范式，由如下冻结的整数四分深度预算定理与无极限实数传递桥示范。

::: {.theorem #thm-om-ch18-shadow-bridge title="整数四分深度预算的精确整数可靠与无极限实数单向传递桥" lean="D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_real_sound"}
设 `rationalQuarterDepth c d p q := Nat.log 4 ((c * q) / (d * p))`。对自然数 $c, d, p, q, N \in \mathbb{N}$，若 $0 < d$、$0 < p$ 且 `rationalQuarterDepth c d p q ≤ N`，则：

1. **核心层精确整数不等式**（`rationalQuarterDepth_integer_sound`）：严格成立 $c \cdot q < (d \cdot p) \cdot 4^{N + 1}$；
2. **外层单向无极限实数传递**（`rationalQuarterDepth_real_sound`）：若进一步有 $0 < q$ 且实主控常数 $C \in \mathbb{R}$ 满足 $C \le \frac{c}{d}$，则无需任何极限或收敛滤子即严格成立 $(\frac{1}{4})^{N+1} C < \frac{p}{q}$。
:::

::: {.proof}
先由 `Nat.log 4` 的定义得到整数商严格小于 $4^{N+1}$，结合带余除法分解 $cq = (dp)((cq)/(dp)) + (cq \bmod dp)$ 与余数严格小于 $dp$ 推出精确自然数不等式 $cq < (dp) \cdot 4^{N+1}$；随后在单向实数投影步中经由有序域保序嵌入将该整数不等式转为 $\frac{c/d}{4^{N+1}} < \frac{p}{q}$，并由 $C \le \frac{c}{d}$ 一步收束。完整证明由 Lean 内核检查。
:::

为了把第 0–1 层零公理核心中的 `Omega.Nat`、`Omega.Int`、`Omega.IntRatio` 与射影圆周 `Omega.Projective.Circle` 直接、精确且单向地投射入标准 `Mathlib` 域 $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$，第 2 层阴影桥模块 `OmegaShadowBridge` 导出如下十一条冻结定理：

::: {.theorem #thm-ch18-omega-shadow-bridge title="第 2 层单向阴影函子：算术与射影圆周向 Mathlib 实有理域的精确传递" lean="D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdNat_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdNat_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_neg D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_equivalent D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_inv D5/S3/Quantum/AURICOmega/OmegaShadowBridge.cayley_circle_unit D5/S3/Quantum/AURICOmega/OmegaShadowBridge.kappa_unit_interval"}
在第 2 层单向阴影桥模块 `D5/S3/Quantum/AURICOmega/OmegaShadowBridge` 中，定义结构递归读出映射 `toStdNat : Omega.Nat → ℕ` 与 `toStdInt : Omega.Int → ℤ`，定义有理读出 `toRat : Omega.IntRatio → ℚ`（将有限分数 `IntRatio.fraction a d` 映为 `(toStdInt a : ℚ) / (toStdInt (IntRatio.denominator d) : ℚ)`，将未定义元 `IntRatio.undefined` 映为 `0`），并令实阴影 `toReal (x : IntRatio) : ℝ := (toRat x : ℝ)`。则以下十一条精确传递律同时成立：

1. **自然数与整数环同态**（`toStdNat_add`、`toStdNat_mul`、`toStdInt_neg`、`toStdInt_add`、`toStdInt_mul`）：对任意 `a, b : Omega.Nat`，有 `toStdNat (a.add b) = toStdNat a + toStdNat b` 与 `toStdNat (a.mul b) = toStdNat a * toStdNat b`；对任意 `a, b : Omega.Int`，有 `toStdInt a.neg = -toStdInt a`、`toStdInt (a.add b) = toStdInt a + toStdInt b` 与 `toStdInt (a.mul b) = toStdInt a * toStdInt b`；
2. **有理商坍缩与四则保结构传递**（`toRat_equivalent`、`toRat_add`、`toRat_mul`、`toRat_inv`）：对任意 `x, y : IntRatio`，交叉相乘等价 `IntRatio.Equivalent x y` 蕴含 `toRat x = toRat y`；对任意有限分数 `IntRatio.fraction a b` 与 `IntRatio.fraction c d`，有 `toRat ((fraction a b).add (fraction c d)) = toRat (fraction a b) + toRat (fraction c d)`；对全体 `x, y : IntRatio`（含被映为 `0` 的 `undefined`），恒有 `toRat (x.mul y) = toRat x * toRat y` 与 `toRat x.inv = (toRat x)⁻¹`；
3. **射影凯莱单位圆与保真度闭区间实阴影**（`cayley_circle_unit`、`kappa_unit_interval`）：对任意满足 `Nonzero p q` 的 `p, q : Omega.Int`，成立实单位圆等式

   $$
   \mathrm{toReal}(\mathrm{cayleyX}\;p\;q)^2 + \mathrm{toReal}(\mathrm{cayleyY}\;p\;q)^2 = 1;
   $$

   且对全体 `p, q : Omega.Int`（包括使 `kappa 0 0 = undefined` 映为 `0` 的原点情形），恒有

   $$
   0 \le \mathrm{toReal}(\mathrm{kappa}\;p\;q) \le 1.
   $$

:::

::: {.proof}
自然数与整数部分由 `Omega.Nat` 与 `Omega.Int` 的构造子结构归纳证明，其中整数加减法经辅助引理 `toStdInt_negOfNat`、`toStdInt_subNatNat` 将 `Omega.Int.ofNat`/`negSucc` 精确对齐至标准 `ℤ` 算术。有理读出部分利用 `IntRatio.denominator d = d + 1 > 0` 的严格正分母性，由交叉相乘等式与 `div_eq_div_iff` 推出 `toRat_equivalent`；对有限分数由 `div_add_div` 与分母乘性推出 `toRat_add`；对全体 `IntRatio` 分 `undefined`/`fraction` 讨论，利用 `Mathlib` 中 `0 * q = 0` 与 `0⁻¹ = 0` 闭合 `toRat_mul` 与 `toRat_inv`。最后两项将零公理核心定理 `Omega.Projective.Circle.cayley_circle_unit` 与 `kappa_spread_unit_interval` 经 `toRat_equivalent`、`toRat_le` 与有理数到实数的保序环嵌入 `Rat.cast` 投射至 `ℝ`，并在 `kappa_unit_interval` 中单独检核原点 `p = q = 0` 处 `0 ∈ [0, 1]`。完整证明由 Lean 内核检查。
:::

[@thm-ch18-omega-shadow-bridge] 把第 0–1 层的构造接到第 2 层。所钉提交上，十一条桥接定理的官方公理记录分为四组。`toStdNat_add` 记录 `[]`，`toStdNat_mul` 仅依赖 `propext`，`toStdInt_neg`、`toStdInt_add`、`toStdInt_mul` 依赖 `Quot.sound` 和 `propext`，其余六条有理数与实数读出定理依赖 `Classical.choice`、`Quot.sound` 和 `propext`。桥接模块依赖核心库，严格核心的导入闭包止于严格库层。

下图把严格库的空内核重放、D5 的双端记录和通往实数层的单向桥放在一起。

::: {.figure src="ch18-three-layer-shadow"}
**三层形式化栈与单向阴影桥。** 蓝框标出严格库重放所覆盖的选定导入闭包，下方是 D5 的两套公理记录。紫色箭头经 `OmegaShadowBridge` 通往 `Mathlib` 实数层。
:::

## 18.2 六卷集成原型与诚实编译器公理审计 {#sec-om-ch18-six-volume-prototype-and-honest-audit}

为使读者在一页代码内俯瞰全书六卷的统一代数骨架，下面展示一份紧凑可读的六卷集成 `OmegaMath.Core` 原型蓝图，依次涵盖齐次射影线 `QProj1`（卷 I）、原始整数四元组 `ProjTernion` 与球面格拉姆行列式 `detGram3`（卷 I–II）、二阶幂零射流 `Jet2`（卷 III）、无 $\pi$ 球面切比雪夫谐波 `SphericalFourier`（卷 IV）、模方 $5$ 赫克迹 `heckeT5Chi1`（卷 V）与非阿贝尔旋子整除闸门 `omegaFractranStep?`（卷 VI），并以统一合取核验 `omega_math_grand_kernel_verified` 串起六卷算例：

```lean
-- 可读教学原型（使用标准库 Init.Rat 以便直览六卷代数骨架；
-- 请务必阅读下文“诚实编译器公理审计”注记，严格区分 Init.Rat 原型与真零公理栈！）
namespace OmegaMath.Core

/-- 卷 I：齐次射影闭环 ℚP¹（含对径极点 [1 : 0]） -/
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

/-- 卷 I–II：原始整数四元组与四元数乘法 -/
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

/-- 卷 II：巴格曼—格拉姆 3×3 球面三角行列式 -/
def detGram3 (c12 c23 c31 : Rat) : Rat :=
  1 + 2 * c12 * c23 * c31 - c12 * c12 - c23 * c23 - c31 * c31

/-- 卷 III：二阶幂零有理射流环 ℚ[η]/(η³) 与两项精确求逆 -/
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

/- 卷 IV：无 π 球面切比雪夫自旋壳特征标与卡塔兰哈尔矩 -/
namespace SphericalFourier
def chi1 (k : Rat) : Rat := 4 * k - 1
def chi2 (k : Rat) : Rat := 16 * k * k - 12 * k + 1
def haarMoment : Nat → Rat
  | 0 => 1 | 1 => 1 / 4 | 2 => 1 / 8 | 3 => 5 / 64 | _ => 0
end SphericalFourier

/-- 卷 V：模方 5 赫维茨旋子在 j = 1 壳上的有理赫克迹（κ = 1/5） -/
def heckeT5Chi1 : Rat := SphericalFourier.chi1 (1 / 5)

/-- 卷 VI：非阿贝尔 Ω-FRACTRAN 精确整除闸门 -/
def omegaFractranStep? (psi gate : ProjTernion) (d : Int) : Option ProjTernion :=
  let prod := ProjTernion.qmul psi gate
  if d ≠ 0 ∧ prod.w % d = 0 ∧ prod.x % d = 0 ∧ prod.y % d = 0 ∧ prod.z % d = 0 then
    some ⟨prod.w / d, prod.x / d, prod.y / d, prod.z / d⟩
  else none

/-- 六卷核心有理不变量统一校验（可读原型命题；公理闭包详见下方审计表） -/
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

::: {.remark #rem-om-ch18-honest-compiler-audit title="诚实编译器公理审计：Init.Rat 原型与真零公理 QRat / OmegaInit 栈的硬边界"}
上面的 `Init.Rat` 教学原型、`QRat` 可执行原型、严格库、双端 D5 消费模块与实数桥接各有相应的核验证据。

1. **`Init.Rat` 教学原型。** 在 Lean `v4.35.0` 中，`Rat.add`、`Rat.mul`、`Rat.div` 依赖 `propext`、`Classical.choice` 和 `Quot.sound`，`Rat.inv` 只依赖 `propext` 和 `Quot.sound`。单独定义 `fun (a b : Rat) => a == b` 的公理依赖为空。对等式 `(1 : Rat) + 1 = 2`，`by decide` 在 `Rat.add` 的归约处停住。
2. **基于 `Init` 的 `QRat` 原型。** 姊妹专著 §32.8 的 `QRat` 用 `Nat.gcd` 约分整数对。有限例证 `omega_zero_axiom_master_check` 由 `by decide` 检查，`#print axioms` 给出空依赖。
3. **严格库重放与 D5 双端核对**。严格库以 `prelude` 关闭隐式官方 `Init` 导入。`OmegaChecks.Audit` 对选定库根的传递导入闭包检查公理与声明种类，再在 `mkEmptyEnvironment` 中重放。D5 消费端分别编译并核对导出，在有成对测量的声明行中，`strict_omega.axioms` 给出严格端依赖，`axioms` 给出官方端依赖。复现入口见 [附录 A §A.6](appendix-a.md#sec-om-appa-audit-checklist)。

| 实现层级 | 导入范围 | 公理证据 | 核验方式 | 工程角色 |
| :--- | :--- | :--- | :---: | :--- |
| **可读 `Init.Rat` 原型** | 隐式 `Init`（含 `Rat`/`BEq`） | `{propext, Classical.choice, Quot.sound}` | 否 | 教学蓝图与快速规格展示 |
| **无显式导入的 `QRat` 原型** | 仅隐式 `Init`（使用 `QRat`） | `∅`（`does not depend on any axioms`） | 仅检公理 | 原生 `#eval` 与一步 `decide` 验证 |
| **严格库** | `OmegaInit`、`OmegaMathlib`、`OmegaMath` 的选定导入闭包 | 每条声明的传递公理依赖均为空 | 空内核重放 | 构造数学基础 |
| **双端 D5 消费模块** | 同一源码分别用严格接口和官方接口构建 | 成对声明行的 `strict_omega.axioms` 为严格端，`axioms` 为官方端 | 双端编译、导出对照与分端测量 | 书中引用的冻结定理 |
| **第 2 层阴影桥 `OmegaShadowBridge` 与 `Mathlib.Real` 外层** | `OmegaInit`/`OmegaMath` $+$ `Init`/`Mathlib`（单向桥，见 [@thm-ch18-omega-shadow-bridge]） | 分层递进：`[]` / `propext` / `{Quot.sound, propext}` 至 `{propext, Classical.choice, Quot.sound}` | 否 | 经单向阴影函子 $\Pi_{\mathbb{R}}$ 对接传统分析 |
:::

下面的视频把本章的审计从头走一遍：严格圆周定理的两份记录、严格库的空内核重放、通往实数的单向桥，以及教学原型的公理边界。

::: {.film src="auditing-the-empty-kernel"}
**同一条圆周定理在严格端与官方端各有一份公理记录，严格库的选定导入闭包在空内核中重放，实数只在单向桥的另一侧（2 分 47 秒）。** 画面先列出三层架构（模型分层，紫色）与交叉相乘 $2 \times 2 = 4 \times 1$ 给出的 $2/4 \sim 1/2$（屏幕计算）。整数对 $(1, 2)$ 的模方为 $5$，凯莱像为琥珀色的 $(3/5, 4/5)$，品红的极点 $[1 : 0]$ 落在 $(-1, 0)$，$(1, 2) \cdot (1, 2) = (4, 3)$、模方 $25 = 5 \times 5$（屏幕计算）；青色小点是 $\lvert p \rvert, \lvert q \rvert \le 7$ 的全部凯莱像，绿色标签对应 [@thm-om-ch18-wave1-zero-axiom-circle]。冻结记录表中，六条射影圆周定理的严格端记录列出 `OmegaInit`、`OmegaMath` 与空公理列表 `[]`，官方端记录为 `propext`，对径闭合一行以琥珀色标出。导入闭包、`OmegaChecks.Audit` 的逐条检查与 `mkEmptyEnvironment` 中的重放是本章对审计流程的说明，导入图为示意（紫色）。过桥后 $2/4$ 与 $1/2$ 都读作 $1/2$，$(3/5, 4/5)$ 落在实数单位圆上，两枚绿色标签对应 [@thm-ch18-omega-shadow-bridge] 中的 `toRat_equivalent` 与 `cayley_circle_unit`；品红方框把十一条桥接定理的官方记录分为 `[]`、`propext`、`Quot.sound, propext` 与 `Classical.choice, Quot.sound, propext` 四组。最后，`Init.Rat` 教学原型的八项合取在屏幕上精确重算，闸门放行 $\langle 1, 2, 0, 0 \rangle$、拦下另一乘积；该原型的公理依赖与各层证据按 [@rem-om-ch18-honest-compiler-audit] 写明（紫色）。
:::

## 18.3 四模式六卷三维全息交互工作台导览 {#sec-om-ch18-workbench-walkthrough}

为使全书六卷的每一个抽象构造都成为可拖动、可逐拍核验的几何与算术实体，全书配备了**四座交互三维实验室（`OMEGA//SPIN`、`OMEGA//LAB`、`OMEGA//JET`、`OMEGA//ARC`，合计 16 张独立实验卡）**、**19 幅双语定制静态图**与双语概览演示文稿 **`overview`**（完整索引见 [附录 B §B.3](appendix-b.md#sec-om-appb-media-map)）；而在全书收官处，压轴的**四模式六卷三维全息交互工作台 `OMEGA//LAB`** 将巴格曼—格拉姆三角、二阶射流、无 $\pi$ 哈尔积分与 $p = 5$ 赫克谱四座核心舞台收束于同一屏。建议读者按以下四步亲手走完六卷闭环：

1. **模式一 · 巴格曼—格拉姆三角与齐次射影几何（卷 I–II）**：在三维规范射影三元球 $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$ 与齐次射影闭环 $\mathbb{QP}^1$ 上拖动整数射线与球面三元组，核对对径北极 $[1 : 0]$ 的有限闭合、无原点流群三元搬运 $[a, b, c]$ 与利雅三元恒常单位曲率 $K \equiv +1$，以及巴格曼—格拉姆 $3\times 3$ 球面三角行列式 $\det G_3 = 1 + 2c_{12}c_{23}c_{31} - c_{12}^2 - c_{23}^2 - c_{31}^2 \ge 0$ 与有理球面正弦／勾股律如何无须三角表锁死球面闭合性。
2. **模式二 · 无极限二阶射流微积分（卷 III）**：在二阶幂零商环 $\mathbb{Q}[\eta]/(\eta^3)$ 中沿有理切点滑动 $x_0 \in \mathbb{Q}$，比对无 $\lim$ 两项求逆直接吐出的精确三元组（如 $x_0 = 1$ 处精确输出 $(\frac{1}{2}, -\frac{1}{2}, \frac{1}{4})$）与经典平直割线逼近，直观检验对称中点凯莱驻球守恒、任意阶凯莱—三角复合统一与流群精确伸缩。
3. **模式三 · 无 $\pi$ 哈尔积分与彼得—魏尔自旋壳（卷 IV）**：检视三维球面 $S^3$ 上整系数偶次切比雪夫自旋壳特征标 $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$ 与卡塔兰阶乘有理哈尔矩 $\int_{S^3}\kappa^n\,d\mu_{\mathrm{Haar}} = \frac{(2n)!}{4^n n!(n+1)!}$，亲眼核验全阶偶次谐波壳如何在零 $\pi$、零勒贝格测度下满足 $\langle E_m, E_n\rangle_{\mathrm{Haar}} \equiv \delta_{m,n}$。
4. **模式四 · $p = 5$ 赫克谱与非阿贝尔旋子（卷 V–VI）**。逐个加入模方 $5$ 的赫维茨旋子，查看六次跳跃如何把 $\chi_1$ 的读数乘以 $-\frac{2}{5}$，以及对应的谱裕度 $\frac{496}{25}$。相应冻结声明的两端公理记录可在 [附录 A §A.3](appendix-a.md#sec-om-appa-frozen-registry) 查阅。

在下方工作台切换四种模式，查看几何构造与精确算术读数。

::: {.viz src="omega-math-workbench" height="620"}
**六卷四模式三维工作台。** 四张实验卡分别显示巴格曼—格拉姆三角、二阶射流、无 $\pi$ 哈尔矩与 $p=5$ 赫克谱的有理读数。
:::
