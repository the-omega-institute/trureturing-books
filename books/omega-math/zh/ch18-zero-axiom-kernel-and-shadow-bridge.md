# 第十八章 空内核审计、单向阴影函子与六卷全息工作台

> *“不动 Lean 4 底层内核分毫，不借半条自定义公理；把规范整数载体与类型类相容性留在纯归纳构造演算的空内核里，把实分析放到单向阴影函子的外侧，证明本身便是零误差的可执行计算。”*

当六卷内容从齐次射影闭环一路铺展至非阿贝尔旋子机与自包含观察者之后，整部专著必须通过最后一道、也是最严苛的工程检验：**零公理数学 $\mathbf{Math}_\Omega$ 如何在 Lean 4 中落地，如何做到 `#print axioms` 字面为空且通过全新空内核重放，又如何以绝对诚实的口径区分教学原型与冻结的严格零公理栈？**

本章分三节完成全书收官。第 18.1 节确立 `OmegaInit` $+$ `OmegaMath` 的三层零公理架构——该架构现已在全书六卷落地为 **14 个零公理 D5 冻结模块、共 127 条 `axioms: []` 公开定理**（全表见 [附录 A](appendix-a.md)，构建时实时生成的全书统计见 [附录 B](appendix-b.md)）——并以六条奠基性射影圆周零公理冻结定理、两条整数四分深度预算阴影桥定理以及第 2 层单向阴影函子模块 `OmegaShadowBridge` 的全部十一条冻结定理（含诚实的分层公理审计）锚定全架构；第 18.2 节给出贯通全书六卷的可读 `OmegaMath.Core` 原型代码，并按诚实编译器审计原则精确剖明标准库 `Init.Rat`（在 Lean `v4.35.0` 中会传递引入三大经典公理）与真零公理 `QRat` / `prelude` `OmegaInit` $+$ `OmegaMath` 栈之间的硬边界；第 18.3 节导览全书压轴的四模式六卷三维全息交互工作台 **`OMEGA//LAB`**（并串联全书四座三维交互实验室、19 幅双语静态图与双语概览演示文稿 `overview`）。

## 18.1 三层零公理架构、零公理核心冻结定理与单向阴影函子 {#sec-om-ch18-three-layer-architecture}

在 Lean 4 中重建无无穷、无超越数的数学，既不需要修改编译器底层归纳构造演算（CIC）内核，也绝不能用 `axiom` 关键字硬塞自定义公理（自定义 `axiom` 不仅阻断内核 $\iota$-归约，一旦漏写零元组等边界前提还会三行推出 `False`，且必遭独立内核审计拒收）。正确的形式化工程划分为彼此隔离的三层（`MODEL` 架构分层配冻结 **`LEAN ✓`** 声明）：

1. **第 0 层：免商规范整数载体（消除 `Quot.sound`）**：
   - 在已冻结的严格零公理库 `OmegaInit` $+$ `OmegaMath` 中，每个源文件均以 `module` 与 `prelude` 开篇，彻底关闭对官方 `Init` 的隐式导入；`Omega.Nat`、`Omega.Int`、`Omega.Ratio` 与 `Omega.IntRatio` 用正分母前驱存储有限比值、以交叉相乘定义等价 `IntRatio.Equivalent` 并将零分母传递为 `undefined`，全程不触碰任何商类型公理 `Quot.sound`；
   - 在基于 `Init` 编写的可执行反射原型中，则以互素规范整数对 `QRat` 与首非零项为正的规范整数四元组 `ProjTernion` / `CanonProjTernion` 替代 `Quotient`，凭可判定相等性（赫德伯格定理）免除 `Quot.sound`。
2. **第 1 层：可计算类型类 `class OmegaSpace` 证成相对无矛盾性**：
   将母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的三元比较算子 `triad`、有理保真核 `kappa` 及六条恒等律封装为可计算类型类 `class OmegaSpace (M : Type)`，并在裸 CIC 中给出具体非阿贝尔实例（如规范非零子类型 `CanonProjTernion`），从而在 CIC 内部构造性地证成公理体系自身的相对无矛盾性与非退化可满足性。
3. **第 2 层：通往 `Mathlib` 的单向阴影函子 $\Pi_{\mathbb{R}} : \mathbf{OmegaMath} \to \mathbf{Mathlib}$**：
   一切射影闭合、流群测地、利雅三元曲率、双卡旋转、射流复合统一、全阶无 $\pi$ 哈尔正交、舒尔补、自由群 $F_3$ 伴随单射与整数深度预算证书均留在第 0–1 层零公理核心内完成；唯有当外围经典分析需要实数或复希尔伯特空间不等式时，才在最外层经单向阴影桥投射进 `Mathlib`，防止 `Classical.choice` 与极限滤子反向污染核心计算层。

作为全书 **14 个零公理 D5 冻结模块（127 条 `axioms: []` 公开定理）**的起点与缩影，以下六条射影圆周声明在 `trureturing@dev` 上均记录为 `libraries: ["OmegaInit", "OmegaMath"]`、**`axioms: []`**，直接通过空内核重放验收（涵盖利雅三元曲率、双卡分母半界、有理球面正弦／勾股律、中点凯莱驻球、任意阶凯莱—三角复合、全阶彼得—魏尔哈尔正交、自由群 $F_3$ 单射与显式停机见证在内的完整注册表见 [附录 A §A.3](appendix-a.md#sec-om-appa-frozen-registry)）。

::: {.theorem #thm-om-ch18-wave1-zero-axiom-circle title="射影圆周零公理冻结定理组：射影缩放、补和守恒、凯莱单位圆、对径闭合与模方乘性" lean="D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_scale D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure D5/S3/Quantum/AURICOmega/OmegaCircleClosure.projective_circle_mul_normSq"}
在零公理基础库 `OmegaInit` 与 `OmegaMath`（`axioms: []`）中，以下六条陈述严格成立：

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

::: {.theorem #thm-ch18-omega-shadow-bridge title="第 2 层单向阴影函子：零公理算术与射影圆周向 Mathlib 实有理域的精确传递" lean="D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdNat_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdNat_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_neg D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toStdInt_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_equivalent D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_add D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_mul D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_inv D5/S3/Quantum/AURICOmega/OmegaShadowBridge.cayley_circle_unit D5/S3/Quantum/AURICOmega/OmegaShadowBridge.kappa_unit_interval"}
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

严守诚实公理审计标准，必须明确交代 [@thm-ch18-omega-shadow-bridge] 属于**第 2 层外围单向桥接层**，而非第 0–1 层的严格零公理核心：依据其冻结状态记录，十一条定理呈现清晰的阶梯式公理剖面——`toStdNat_add` 仅依赖 `Init` 与 `OmegaInit` 且保持 `axioms: []`；`toStdNat_mul` 经 `Mathlib` 引入 `["propext"]`；`toStdInt_neg`（`Init`, `OmegaInit`）与 `toStdInt_add`、`toStdInt_mul`（`Init`, `Mathlib`, `OmegaInit`）引入 `["Quot.sound", "propext"]`；而其余六条跨越至 `ℚ` 与 `ℝ` 的定理（`toRat_equivalent`、`toRat_add`、`toRat_mul`、`toRat_inv`、`cayley_circle_unit`、`kappa_unit_interval`）导入 `Init` 与 `Mathlib`（其中五条含 `Batteries`），落入 Lean 标准经典公理闭包 `{propext, Classical.choice, Quot.sound}`。关键的工程防火墙在于**单向性**：核心库 `OmegaInit` $+$ `OmegaMath` 永不反向导入 `OmegaShadowBridge` 或 `Mathlib`，因而所有零公理核心定理始终保持字面空公理闭包 `axioms: []`。

下面的静态图全景绘出了这一三层隔离栈与单向防火墙：第 0–1 层零公理核心由 `OmegaInit`（$10$ 个模块）与 `OmegaMath`（$78$ 个模块）经空内核重放构成，并支撑 `D5` 下 $14$ 个冻结零公理模块、共计 $127$ 条严格 `axioms: []` 定理；向外则经单向阴影函子 $\Pi_{\mathbb{R}}$（`OmegaShadowBridge` 导出的 $11$ 条定理，见 [@thm-ch18-omega-shadow-bridge]）精准投射入第 2 层经典 `Mathlib` 实数域 $\mathbb{R}$，严禁任何反向依赖回流。

::: {.figure src="ch18-three-layer-shadow"}
**零公理三层形式化栈与单向阴影函子防火墙。** 第 0–1 层严格隔离于 `module` 与 `prelude` 之内，由 `OmegaInit`（$10$ 模块）与 `OmegaMath`（$78$ 模块）支撑 `D5` 层 $14$ 个零公理模块及 $127$ 条 `axioms: []` 冻结定理（以 [@thm-om-ch18-wave1-zero-axiom-circle] 为缩影，全表见 [附录 A §A.3](appendix-a.md#sec-om-appa-frozen-registry)）；单向阴影桥 $\Pi_{\mathbb{R}}$ 借 `OmegaShadowBridge` 的 $11$ 条传递定理（[@thm-ch18-omega-shadow-bridge]，配合 [@thm-om-ch18-shadow-bridge] 的无极限实数传递）将核心结果单向投射至第 2 层 `Mathlib` 实数域 $\mathbb{R}$，确保经典公理闭包 `{propext, Classical.choice, Quot.sound}` 永不反向污染空内核层。
:::

## 18.2 六卷集成原型与诚实编译器公理审计 {#sec-om-ch18-six-volume-prototype-and-honest-audit}

为使读者在一页代码内俯瞰全书六卷的统一代数骨架，下面展示一份紧凑可读的六卷集成 `OmegaMath.Core` 原型蓝图，依次涵盖齐次射影线 `QProj1`（卷 I）、规范三元数 `ProjTernion` 与球面格拉姆行列式 `detGram3`（卷 I–II）、二阶幂零射流 `Jet2`（卷 III）、无 $\pi$ 球面切比雪夫谐波 `SphericalFourier`（卷 IV）、模方 $5$ 赫克迹 `heckeT5Chi1`（卷 V）与非阿贝尔旋子整除闸门 `omegaFractranStep?`（卷 VI），并以统一合取核验 `omega_math_grand_kernel_verified` 串起六卷算例：

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

/-- 卷 I–II：规范整数三元数载体与三元流群迁移 -/
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

/-- 卷 II：巴格曼—格拉姆 3×3 球面三角行列式 -/
def detGram3 (c12 c23 c31 : Rat) : Rat :=
  1 + 2 * c12 * c23 * c31 - c12 * c12 - c23 * c23 - c31 * c31

/-- 卷 III：二阶幂零有理射流环 ℚ[η]/(η³) 与两项精确求逆 -/
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

/-- 卷 IV：无 π 球面切比雪夫自旋壳特征标与卡塔兰哈尔矩 -/
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
严守诚实编译器审计铁律，**绝不能把上面使用标准库 `Init.Rat` 的可读原型宣称为空公理（`#print axioms = ∅`）**！在 Lean `v4.35.0` 的实机公理审计中，必须清晰区分以下四层实现边界：

1. **为什么可读 `Init.Rat` 原型并非零公理**：官方 `Init` 中的 `Rat` 结构体内嵌了互素命题证明，导致 `Rat.add`、`Rat.mul`、`Rat.div` 传递依赖三大经典公理 `{propext, Classical.choice, Quot.sound}`（`Rat.inv` 依赖 `{propext, Quot.sound}`），且布尔相等运算符 `==`（`BEq`）同样引入 `Classical.choice`；同时 `Rat` 运算会在内核 `by decide` 归约时卡壳。因此，上述代码仅作为一眼看清六卷代数签名的可读蓝图；
2. **真零公理路径一（零导入 `QRat` 可执行内核）**：将 `Rat` 替换为纯数据整数对 `QRat`（`Int × Nat` 经 `Nat.gcd` 约分），并一律使用命题可判定分支 `if _h : ...`（`=` / `≠` / `>`）取代 `BEq`（`==`），即可在 Lean `v4.35.0` 上由 `by decide` 一步归约且令 `#print axioms` 字面输出 **`does not depend on any axioms`**；
3. **真零公理路径二（冻结的 `module` $+$ `prelude` 严格库 `OmegaInit` $+$ `OmegaMath`）**：仓库正式冻结的零公理栈更进一步，借 `prelude` 关闭全部隐式官方 `Init` 导入，以 `Omega.IntRatio` 与交叉相乘等价关系构造全部比值与射影圆周定理（如 [@thm-om-ch18-wave1-zero-axiom-circle]）；审计驱动 `OmegaChecks.Audit` 检查传递闭包中零 `.axiomInfo`、零 `.quotInfo`、零 `isUnsafe`、零官方 `Init`/`Mathlib` 导入，并将整座闭包放进全新的 `mkEmptyEnvironment` 空内核完成零公理重放！

| 实现层级 | 导入范围 | `#print axioms` 审计结果 | 空内核重放 | 工程角色 |
| :--- | :--- | :--- | :---: | :--- |
| **可读 `Init.Rat` 原型** | 隐式 `Init`（含 `Rat`/`BEq`） | `{propext, Classical.choice, Quot.sound}` | 否 | 教学蓝图与快速规格展示 |
| **零导入 `QRat` 原型** | 仅隐式 `Init`（绕开 `Rat`/`BEq`） | `∅`（`does not depend on any axioms`） | 仅检公理 | 原生 `#eval` 与一步 `decide` 验证 |
| **冻结 `OmegaInit` $+$ `OmegaMath`** | `module` $+$ `prelude`（严格隔离） | **`axioms: []`（真零公理）** | **通过** | 正式冻结零公理数学基础设施 |
| **第 2 层阴影桥 `OmegaShadowBridge` 与 `Mathlib.Real` 外层** | `OmegaInit`/`OmegaMath` $+$ `Init`/`Mathlib`（单向桥，见 [@thm-ch18-omega-shadow-bridge]） | 分层递进：`[]` / `propext` / `{Quot.sound, propext}` 至 `{propext, Classical.choice, Quot.sound}` | 否 | 经单向阴影函子 $\Pi_{\mathbb{R}}$ 对接传统分析 |
:::

## 18.3 四模式六卷三维全息交互工作台导览 {#sec-om-ch18-workbench-walkthrough}

为使全书六卷的每一个抽象构造都成为可拖动、可逐拍核验的几何与算术实体，全书配备了**四座交互三维实验室（`OMEGA//SPIN`、`OMEGA//LAB`、`OMEGA//JET`、`OMEGA//ARC`，合计 16 张独立实验卡）**、**19 幅双语定制静态图**与双语概览演示文稿 **`overview`**（完整索引见 [附录 B §B.3](appendix-b.md#sec-om-appb-media-map)）；而在全书收官处，压轴的**四模式六卷三维全息交互工作台 `OMEGA//LAB`** 将巴格曼—格拉姆三角、二阶射流、无 $\pi$ 哈尔积分与 $p = 5$ 赫克谱四座核心舞台收束于同一屏。建议读者按以下四步亲手走完六卷闭环：

1. **模式一 · 巴格曼—格拉姆三角与齐次射影几何（卷 I–II）**：在三维规范射影三元球 $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$ 与齐次射影闭环 $\mathbb{QP}^1$ 上拖动整数射线与球面三元组，核对对径北极 $[1 : 0]$ 的有限闭合、无原点流群三元搬运 $[a, b, c]$ 与利雅三元恒常单位曲率 $K \equiv +1$，以及巴格曼—格拉姆 $3\times 3$ 球面三角行列式 $\det G_3 = 1 + 2c_{12}c_{23}c_{31} - c_{12}^2 - c_{23}^2 - c_{31}^2 \ge 0$ 与有理球面正弦／勾股律如何无须三角表锁死球面闭合性。
2. **模式二 · 无极限二阶射流微积分（卷 III）**：在二阶幂零商环 $\mathbb{Q}[\eta]/(\eta^3)$ 中沿有理切点滑动 $x_0 \in \mathbb{Q}$，比对无 $\lim$ 两项求逆直接吐出的精确三元组（如 $x_0 = 1$ 处精确输出 $(\frac{1}{2}, -\frac{1}{2}, \frac{1}{4})$）与经典平直割线逼近，直观检验对称中点凯莱驻球守恒、任意阶凯莱—三角复合统一与流群精确伸缩。
3. **模式三 · 无 $\pi$ 哈尔积分与彼得—魏尔自旋壳（卷 IV）**：检视三维球面 $S^3$ 上整系数偶次切比雪夫自旋壳特征标 $E_n(\kappa) = U_{2n}(\sqrt{\kappa})$ 与卡塔兰阶乘有理哈尔矩 $\int_{S^3}\kappa^n\,d\mu_{\mathrm{Haar}} = \frac{(2n)!}{4^n n!(n+1)!}$，亲眼核验全阶偶次谐波壳如何在零 $\pi$、零勒贝格测度下满足 $\langle E_m, E_n\rangle_{\mathrm{Haar}} \equiv \delta_{m,n}$。
4. **模式四 · $p = 5$ 赫克谱、非阿贝尔素旋子与空内核审计（卷 V–VI）**：点亮六枚模方为 $5$ 的本原赫维茨素旋子 $S_5$，逐层核验自由群 $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ 伴随单射与非平凡自旋壳上的纯有理赫克—拉马努金半正定裕度 $20 - \lambda^2 > 0$（如 $j = 1$ 壳上裕度 $\frac{496}{25} > 0$、平均迹 $-\frac{1}{5}$），并对照同一组模方 $5$ 旋子在 $\Omega$-FRACTRAN 模 $5$ 整除闸门、观察者记忆切分与 `OmegaInit`/`OmegaMath` 14 模块 127 条零公理空内核重放中的核心角色。

请直接进入下方完整三维工作台，亲手检验六卷零公理有理数学的每一环精确闭合。

::: {.viz src="omega-math-workbench" height="620"}
六卷四模式三维全息交互工作台：在巴格曼—格拉姆三角（卷 I–II）、二阶射流（卷 III）、无 $\pi$ 哈尔积分（卷 IV）与 $p = 5$ 赫克谱（卷 V–VI）四种模式之间自由切换，实时核对全书六卷的核心有理不变量、精确分数读数与 `OmegaInit`/`OmegaMath` 零公理内核边界。
:::
