# 2026-11-15 冻结声明补充与附录采用规格

本规格供后续中英文写作采用，记录精确声明、对象定义、教学算例和不可越过的认识论边界。它不新增数学证明，也不把尚未写入正文的候选计入书稿验证账本。主配环境在中英两版复用同一 ID；其他章节只作交叉引用。所有源码和冻结状态均读取下列同一提交。

## 1. 分支、钉版与既有声明审计

- 分支：`feat/trureturing-supplements-and-appendices`，从 `origin/main` 创建并跟踪它；分支点 `f139808b`。开始时本地 `main` 工作区干净。
- 实际分支点的旧钉版：`f754db1698cc41acde0508e8b261477b708e2095`；本次钉到已 fetch 的 `origin/dev`：`2733dd6bcf63b9a68e9b0dad2fc783460d2f854f`。本地未提交内容和未合并提交均未作为来源。
- 基线澄清：本地旧 `main` 是 664 条、钉版 `ccaf12043b8eaa43581decc99f584528f3564871`；最新 `origin/main` 已有 667 条。原有 664 条全部仍存在；另外 3 条是分支点已经合入的引用，不是本规格推荐新增的 33 条。
- 本次从实际分支点钉版：667 条记录的 `module`、`name`、`kind`、`statement_id`、`line`、`signature` 全部逐字段相同；新增 0、删除 0、摘要变化 0、行号变化 0。只有提交和钉版时间变化。
- `statement_id` 是模块级冻结状态摘要，不能当成单条定理类型的散列。保护页面 `ch38-s01*` 的 57 条引用逐条拆分检查；对应源模块在实际旧钉版和本次钉版之间逐字节相同，公开定理陈述与前提不变。

为避免把较早的变动漏记，另将本地旧 `main` 的 664 条同本次提交比较：有 23 条记录的模块摘要不同，分属下表四个模块。逐字比对四个完整 `.lean` 文件后，唯一文本差异均为移除辅助声明的 `private` 修饰；原先公开且被书稿引用的定理签名、定义、类型与证明体未改。这个历史差异已经包含在 `origin/main` 的旧钉版中，不属于本次新增变化。

| 模块 | 旧 `statement_id` | 新 `statement_id` | 历史变化 |
| --- | --- | --- | --- |
| `D5/S1/Words/TribonacciAlignedWindows` | `sha256:ed51a299e4851d6b91bf6c9e9f6b769b68e9a7c06631da9b4c59cab82676709c` | `sha256:114922f5456de1bf2641fe038c678bea692fbd9bb8260247f474229db7f9e81b` | 仅辅助声明公开可见性变化；已有公开陈述不变。 |
| `D5/S3/Arith/Robin/PrimeFiberPropagation` | `sha256:b248b6a9786eb684c74b1cf5c1a4415c8327fd1bdfdab8d38211a92e95bc0c63` | `sha256:09b57a4ff5f4eafa7ec9e6e74be0d0775e883f7b8ae5a3e08a9676955b4989a4` | 仅辅助声明公开可见性变化；已有公开陈述不变。 |
| `D5/S3/Quantum/Dynamics/OddSquareGreenMass` | `sha256:8665a3799dac04c9e1ce83abcf91b59041dacf5e126238d51475356374cbcca0` | `sha256:4762d6e1af2e745be63d29650ab3d5ea0c5d6f901bb66b682d4134bc085c24e2` | 仅辅助声明公开可见性变化；已有公开陈述不变。 |
| `D5/S3/Quantum/Routing/HannSignedCertificate` | `sha256:071bb36c1145008575e9dc18547dacb74f94aebac25cc4f661c4ea1b5c2057a1` | `sha256:90914d9e2ff8f043202c79c7b7b4386c72b893cf18700459253d9cc027d0a552` | 仅辅助声明公开可见性变化；已有公开陈述不变。 |

实际执行了钉版预检、正式 `./tbook pin` 和限定书籍的结构检查。初次检查唯一错误是钉版使声明地图的静帧输入摘要过期；通过标准静帧生成命令刷新后，15 张图片字节全部相同，只有 `.stills.json` 改变。复检为 **0 错误、9 警告**；警告为既有未引用图件一项和八段视频的历史 `subject_commit`，不是冻结声明失效。地图回归测试为 **583/583 通过**。

本规格不更改正文、目录、附录 C 模板、根 README、保护页面或可视化 HTML/CSS/JS。正文采用后，再运行 `./tbook pin --refresh` 与统计同步，才会把本规格的新增引用纳入锁文件。

## 2. 共用写作契约与 Gleason 补证指引

### 2.1 总函数与适用域

以下约束适用于每条声明，其中特有陷阱还在各条目单独标注。源码区段的 `variable` 按原样保留；只有声明实际使用或由 `include` 指定的区段变量才进入最终隐式参数，不能把同一文件里尚在作用域内却未使用的变量加成额外定理前提。

| 操作 | 必须保留的边界 |
| --- | --- |
| 实数、复数除法 | Lean 中 `x / 0 = 0`。没有非零分母前提的代数总函数，不自动具有比值、条件概率或射影坐标的解释。 |
| `Real.log` | `Real.log 0 = 0`；对负数使用绝对值的总函数延拓，不能将非正输入解释为概率对数。涉及素数、密度态谱、猜测概率的正性须分别说明。 |
| 自然数减法 | `Nat` 减法截断，例如 `2 - 3 = 0`；只有在足够下界下才可当作整数差。尤其不得把秩亏或链长差直接当带符号量。 |
| `tsum`、积分、上下确界 | 无 `Summable` 的 `tsum` 仍有总函数值，不能默认级数收敛；非可积函数的积分也不能冒充解析等式。有限和与无限和不混写。`sSup`/`sInf` 的存在、非空、有界、可达和有限是不同性质。 |
| 复矩阵迹 | 区分复数 `Matrix.trace` 和 `.re`。只有验证迹实值后才可在实概率式中省去 `Re`；不由迹为实推出矩阵乘积自伴。 |
| 复内积 | Mathlib 的 `⟪x, y⟫_ℂ` **第一变量共轭线性、第二变量线性**，对应 `x* y`。变更 bra/ket 次序会改变相位或共轭，不能沿实内积习惯交换。 |
| 维数和类型类 | `Fintype`、`Nonempty`、`DecidableEq`、`FiniteDimensional`、`CompleteSpace`、`Nontrivial`、具体标量域和维数界均按原文保留。有限矩阵结论不自动覆盖无限维算子；完整 Hilbert 空间结论也不自动覆盖无界算子。 |
| 模型与物理解释 | 已冻结代数关系不自行证明动力学实现、热力学假设、实验拟合、算法复杂度或量子引力解释。手算例只展示明确计算，不新增定理级断言。 |

### 2.2 既有有限复投影定理的证明块

`ch02-born-rule.md` 的既有 `#thm-gleason-finite-projection` 在中英两版均缺少证明块。本次仅记录修订规格，保留原环境与引用；不另创一个同义主配。

证明采用顺序：从 `ProjectionPackage` 的四个字段出发，先把单位向量读数组织为跨正交标架一致的赋值；源码中已给出的实三维核心 `coreLemma` 经复实归约得到厄米二次型，再由 `polarMatrix` 得到矩阵。正性与单位归一给出半正定和迹一；秩一投影读数确定厄米二次型，从而确定矩阵，最后扩展到所有星投影。说明这些步骤的目的，不把下列辅助结果重新包装成新增引用。完整原始证明位于目标声明及其调用链；不能只说“显然”或把 `hcore` 当未完成义务：目标是已消去该外部参数的公开版本。

证明块紧接原定理环境，以 `::: proof` 开始、`:::` 结束，沿用本章其他 Lean 结果的写法；两版同一位置，先写中文再同步英文。中文以“完整证明由 Lean 内核检查。”收束，英文采用项目规定的对应结语。说明 `∃!` 唯一的是代表全部投影的密度矩阵，不是总函数 `p` 在非投影矩阵上的任意延拓。矩阵乘积保持 `ρ * P` 的顺序，结论是 `((ρ * P).trace).re`。

### 2.3 四处边界文字的精确修订口径

这些是后续正文修改指引，本规格不修改所列文件；英文版按相同数学范围自然表达。

| 位置 | 应采用的边界文字 |
| --- | --- |
| `appendix-d.md` | “有限复维 $N\ge3$ 的星投影赋值表示已由第 2 章的有限复投影格里森定理验证；该定理预设同一赋值在全部星投影上的非负性、单位归一与正交可加性。二维纯投影格不在其范围内；二维效应域应引用布施效应表出定理。这里讨论的更广实空间与无限维形式，不能由这个有限矩阵声明代替。”不得继续把有限版本也整包标为未形式化文献结果。 |
| `appendix-e.md` | “有限复维 $d\ge3$ 的投影路线使用第 2 章已验证的有限复投影格里森定理；有限维效应路线使用布施定理，并保留全效应可加性。两者不从两两公平直接推出内积结构及赋值公理；更广空间需另列精确声明与额外前提。”同时更新涉及该范围的分类表、H5 与引用注记，不能将投影可加性替换为任意函数可加性。 |
| `ch31-s04-fairness-and-dimensional-expansion.md` | “互易对称与互补归一并不唯一决定二次权重。有限复维 $N\ge3$、全部星投影上的非负归一正交可加赋值，才由已验证格里森定理唯一表为密度矩阵迹配对；二维效应路线另需全效应可加。平行四边形逆定理和更广空间形式分别按自身证据分级。”卡片说明、正文与汇总表采用同一边界。 |
| 根 `README.md` | “本书已验证有限复矩阵 $N\ge3$、全部星投影上的格里森密度表示与唯一性；二维效应概率的唯一性另有布施表出。这里的有限声明不等同覆盖所有实/复无限维情形，也不由两两公平或三阶干涉消失单独推出玻恩定则。”不得使用不加定义域的‘格里森定理全部已验证’。 |

另需区分：仓库在旧 `main` 之后已经收录若干可分空间相关引用，不能把“本条有限声明没有覆盖”偷换成“整个冻结库不存在任何无限维相关结果”。如需陈述那条更长链，先查对应规格与精确类型，本次不扩大其采用范围。

## 3. 甲部分：现有章节的唯一主配

以下 15 条包括 1 条既有补证与 14 条新增候选；各目标只采用 1–2 条高信号结果。所有保护页面均不新增主配。`coda-s02-spatial-attractors.md` 只交叉引用第 38 章的两条边界，不重复分配主配环境。

### 3.1 有限复维投影赋值的格里森表示

主配：`ch02-born-rule.md`；环境：`#thm-gleason-finite-projection`；引用：`lean="D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation"`。

标题：`zh=有限复维投影赋值的格里森表示`；`en=Finite-Complex Gleason Representation for Projection Assignments`。

源定位：`D5/S3/Quantum/GleasonComplexRepresentation.lean:899`；模块摘要：`sha256:dd9874dc790ed4367402ce8fce42837ee0c9f1b2ff1ccb61b47c1769440a4326`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/GleasonComplexRepresentation.lean.json`；全名：`Gleason.ProjectionPackage.gleason_representation`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
@[expose] public section
open Matrix
open scoped ComplexConjugate
open Matrix
open scoped ComplexConjugate ComplexOrder InnerProductSpace
open Matrix
open scoped ComplexConjugate ComplexOrder InnerProductSpace
open Matrix
open scoped ComplexOrder
open Matrix
open scoped ComplexOrder
namespace Gleason
variable {N : ℕ}
theorem ProjectionPackage.gleason_representation (OP : ProjectionPackage N) (hN : 3 ≤ N) :
    ∃! ρ : Matrix (Fin N) (Fin N) ℂ, ρ.PosSemidef ∧ ρ.trace = 1 ∧
      ∀ P, IsStarProjection P → OP.p P = ((ρ * P).trace).re
```

对象定义：[对象 111](#obj-111)。

手算入口：取 N=3、ρ=diag(1/2,1/3,1/6)，标准秩一投影的读数分别为 1/2、1/3、1/6；另取 v=(1,1,0)/√2，读数为 5/12。

总函数与维数陷阱：结论是 Re Tr(ρP)，不要求 ρP 自伴或 ρP=Pρ；p 在非投影矩阵上的延拓自由。有限 N，不含无限维可数可加或迹类假设。

允许表述与严禁夸大：允许：在全部星投影上非负、单位归一且正交可加的同一赋值，在有限复维 N≥3 唯一由密度矩阵表示。严禁：由单一基的归一化、两两公平或 I₃=0 单独推出 Born 唯一性；不得覆盖 N=2 的纯投影赋值或无限维。

### 3.2 二次振幅权重的三阶干涉消去

主配：`ch02-born-rule.md`；环境：`#thm-sorkin-quadratic-cancellation`；引用：`lean="D5/S3/Quantum/SorkinThirdOrder.sorkin_third_order_cancellation"`。

标题：`zh=二次振幅权重的三阶干涉消去`；`en=Third-Order Cancellation of Quadratic Amplitude Weights`。

源定位：`D5/S3/Quantum/SorkinThirdOrder.lean:26`；模块摘要：`sha256:c94f4874e555b783efb4ad198b4982a94d87d7982fd171732c71c1d3234a293e`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/SorkinThirdOrder.lean.json`；全名：`D5.S3.Quantum.SorkinThirdOrder.sorkin_third_order_cancellation`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.SorkinThirdOrder
variable {α R : Type*} [DecidableEq α] [CommRing R] [StarRing R]
theorem sorkin_third_order_cancellation (v : α → R) (A B C : Finset α)
    (hAB : Disjoint A B) (hAC : Disjoint A C) (hBC : Disjoint B C) :
    amplitudeWeight v (A ∪ B ∪ C) - amplitudeWeight v (A ∪ B) -
        amplitudeWeight v (A ∪ C) - amplitudeWeight v (B ∪ C) +
        amplitudeWeight v A + amplitudeWeight v B + amplitudeWeight v C = 0
```

对象定义：[对象 167](#obj-167)。

手算入口：取三个单元狭缝振幅均为 1：9−4−4−4+1+1+1=0。

总函数与维数陷阱：环值代数恒等式；复数特例是 |∑v|²。未假设正性、归一化或实验狭缝的独立性。

允许表述与严禁夸大：允许：在两两不交分支集合上，给定二次权重必有 I₃=0。严禁：倒推出唯一 Born 规则；签名的交换星环也并未自动给出实数概率或归一化。

### 3.3 有限 Kraus 仪器的玻恩边缘权重

主配：`ch03-projectors-and-duality.md`；环境：`#thm-kraus-born-marginal`；引用：`lean="D5/S3/Quantum/Measurement/FiniteKrausInstrumentBornMarginal.finite_kraus_instrument_born_marginal"`。

标题：`zh=有限 Kraus 仪器的玻恩边缘权重`；`en=Born Marginal of a Finite Kraus Instrument`。

源定位：`D5/S3/Quantum/Measurement/FiniteKrausInstrumentBornMarginal.lean:36`；模块摘要：`sha256:4c75756d5a0d7a9a8cedfa976c4bd2cf0294014a82782dbf959e4185ddf89661`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Measurement/FiniteKrausInstrumentBornMarginal.lean.json`；全名：`D5.S3.Quantum.Measurement.FiniteKrausInstrumentBornMarginal.finite_kraus_instrument_born_marginal`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
noncomputable section
open scoped BigOperators
namespace D5.S3.Quantum.Measurement.FiniteKrausInstrumentBornMarginal
open D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open D5.S3.Quantum.FiniteDimensional
set_option autoImplicit false
set_option relaxedAutoImplicit false
theorem finite_kraus_instrument_born_marginal
    {n Setting Outcome Kraus : Type*}
    [Fintype n] [Nonempty n] [DecidableEq n]
    [Fintype Outcome] [Fintype Kraus]
    (instrumentKraus :
      {K : Setting -> Outcome -> Kraus -> Matrix n n ℂ //
        ∀ x, ∑ a, ∑ k, star (K x a k) * K x a k = 1})
    (rho : DensityState n) :
    ∀ x a,
      let state : Matrix n n ℂ := CStarMatrix.ofMatrix.symm rho.1
      let branch : Matrix n n ℂ :=
        ∑ k, instrumentKraus.1 x a k * state * star (instrumentKraus.1 x a k)
      let effect : Matrix n n ℂ :=
        ∑ k, star (instrumentKraus.1 x a k) * instrumentKraus.1 x a k
      Matrix.trace branch = bornProbability state effect
```

对象定义：[对象 076](#obj-076)、[对象 089](#obj-089)。

手算入口：取两个 Kraus 算子 K₀=diag(1,0)、K₁=diag(0,1)，ρ=diag(1/3,2/3)；第一分支迹与 Tr(ρK₀* K₀) 同为 1/3。

总函数与维数陷阱：state、branch、effect 三个 let 必须完整展开；这里 trace 和 bornProbability 都取复数，不擅自加 .re；branch 未除以概率，零概率时不得归一。有限矩阵与有限分支。

允许表述与严禁夸大：允许：归一有限 Kraus 族的各分支迹等于相应效应的 Born 配对。严禁：将未归一分支当作条件态，或将此迹恒等式称为 Born 唯一性推导。

### 3.4 傅里叶指针基的相位阻尼不动点

主配：`ch04-s02-quantum-noise.md`；环境：`#thm-fourier-pointer-fixed`；引用：`lean="D5/S3/Quantum/PointerBasis.fourier_phase_damping_fixed_iff"`。

标题：`zh=傅里叶指针基的相位阻尼不动点`；`en=Fixed Points of Fourier Pointer-Basis Damping`。

源定位：`D5/S3/Quantum/PointerBasis.lean:57`；模块摘要：`sha256:61fd6d3805dfd0f4d09e70de984b976a1a83cb0a390091d6762ae40f261700ad`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/PointerBasis.lean.json`；全名：`D5.S3.Quantum.PointerBasis.fourier_phase_damping_fixed_iff`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
namespace D5.S3.Quantum.PointerBasis
open D5.S3.Quantum.Decoherence
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.QubitWitnesses
theorem fourier_phase_damping_fixed_iff (c : DampingCoefficient)
    (hCoefficient : (c : Real) ≠ 1) (rho : QubitMatrix) :
    fourierPhaseDamping c rho = rho ↔
      ∀ i j, i ≠ j -> hadamardCoordinates rho i j = 0
```

对象定义：[对象 086](#obj-086)、[对象 163](#obj-163)、[对象 162](#obj-162)、[对象 161](#obj-161)、[对象 160](#obj-160)、[对象 164](#obj-164)、[对象 165](#obj-165)。

手算入口：取 c=0、ρ=|+⟩⟨+|=1/2·[[1,1],[1,1]]；Hadamard 变换得到 diag(1,0)，所以 ρ 被固定；|0⟩⟨0| 则被送到 I/2。

总函数与维数陷阱：DampingCoefficient 的范围见原定义；hCoefficient≠1 不可省，c=1 是恒等映射。有限 2×2 矩阵；除数 2 非零。

允许表述与严禁夸大：允许：c≠1 时不动点恰为 Hadamard 坐标下的对角矩阵。严禁：把任意集合等价都称为物理幺正通道，或将此单比特模型说成所有噪声的唯一指针基。

### 3.5 非零生成使账本长度严格增长

主配：`ch08-erasure-and-time-arrows.md`；环境：`#thm-ledger-generation-arrow`；引用：`lean="D5/S1/Ledger/GenerationArrowOfTime.length_strictly_increases_under_generation"`。

标题：`zh=非零生成使账本长度严格增长`；`en=Strict Ledger-Length Growth under Nonzero Generation`。

源定位：`D5/S1/Ledger/GenerationArrowOfTime.lean:70`；模块摘要：`sha256:5eec49e020552ad9785cc9dd842de09c844721fa23508246e3f87592c62da6bf`。

冻结路径：`Golden/Frozen/state/D5/S1/Ledger/GenerationArrowOfTime.lean.json`；全名：`D5.S1.Ledger.GenerationArrowOfTime.length_strictly_increases_under_generation`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S1.Ledger.GenerationArrowOfTime
theorem length_strictly_increases_under_generation (a u : PrimeExponent) :
    u ≠ 0 → length (a + u) > length a
```

对象定义：[对象 007](#obj-007)、[对象 009](#obj-009)、[对象 008](#obj-008)。

手算入口：取零账本 a=0，在素数 2 的指数上加入一次 u，则长度由 0 增到 log 2；继续加入一次增到 2 log 2。

总函数与维数陷阱：PrimeExponent 是有限支撑自然数函数；不能加入负指数。log 的输入 generatedNumber 为正整数；此处无 log≤0 的物理含义。

允许表述与严禁夸大：允许：自然数指数账本在非零加法生成下严格增大，因而不能以同类正向生成返回原账本。严禁：等同热力学第二定律、Landauer 下界或所有物理时间箭头。

### 3.6 线性 doily 的负线奇偶阻碍

主配：`ch10-gram-geometry-and-order.md`；环境：`#thm-doily-negative-line-parity`；引用：`lean="D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.result"`。

标题：`zh=线性 doily 的负线奇偶阻碍`；`en=Negative-Line Parity Obstruction in a Linear Doily`。

源定位：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:685`；模块摘要：`sha256:7d56c905a27cf62bb239a83a20cc0d7006510038eca08b18b38ca683b669d5f9`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean.json`；全名：`D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.result`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
theorem result : claim
```

对象定义：[对象 059](#obj-059)、[对象 060](#obj-060)、[对象 057](#obj-057)、[对象 065](#obj-065)、[对象 063](#obj-063)、[对象 062](#obj-062)、[对象 064](#obj-064)、[对象 058](#obj-058)、[对象 061](#obj-061)、[对象 086](#obj-086)、[对象 087](#obj-087)、[对象 088](#obj-088)、[对象 117](#obj-117)、[对象 118](#obj-118)、[对象 119](#obj-119)、[对象 120](#obj-120)。

手算入口：两比特 Pauli 方阵取行 XI,IX,XX；IZ,ZI,ZZ；XZ,ZX,YY：三行乘积均为 +I，而三列有且仅有第三列为 −I。将每个格点赋 ±1 会使总行积与总列积矛盾。

总函数与维数陷阱：N 个比特的有限 Pauli 表示；IsLinearDoily 要求二元维数 4 与 B 的非退化性。15 点完整图每点出现 3 次，不能直接套每点偶数次的整图乘积反证；九点方阵每点出现两次，其手算身份须明确。

允许表述与严禁夸大：允许：claim 中每个嵌入的非退化四维二元辛子空间有奇数条负线。九点 Pauli 方阵的非语境赋值矛盾由上面的独立手算给出。严禁：只用全图负线总数为奇数就声称已经形式化完整的非语境赋值不存在定理；也不能将任意 Gram 不相容等同语境性。

### 3.7 两项张量和的部分转置秩饱和分类

主配：`ch13-entanglement-and-chsh.md`；环境：`#thm-partial-transpose-rank-saturation`；引用：`lean="D5/S3/Quantum/Entanglement/PartialTransposeSaturation/Classification.result"`。

标题：`zh=两项张量和的部分转置秩饱和分类`；`en=Partial-Transpose Rank Saturation for Two-Term Tensor Sums`。

源定位：`D5/S3/Quantum/Entanglement/PartialTransposeSaturation/Classification.lean:669`；模块摘要：`sha256:f1c84f5114a4fbf5bb0f96821cf9a0c6a41b526618660d5e0c8158897fe58e93`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Entanglement/PartialTransposeSaturation/Classification.lean.json`；全名：`D5.S3.Quantum.Entanglement.PartialTransposeSaturation.result`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option backward.isDefEq.respectTransparency false
noncomputable section
namespace D5.S3.Quantum.Entanglement.PartialTransposeSaturation
open Matrix Module LinearMap
open scoped Kronecker TensorProduct
open ChainSplitting.FinitePair
variable {m₁ n₁ m₂ n₂ : ℕ}
theorem result (A₁ A₂ : Matrix (Fin m₁) (Fin n₁) ℂ)
    (B₁ B₂ : Matrix (Fin m₂) (Fin n₂) ℂ)
    (hA : LinearIndependent ℂ ![A₁, A₂])
    (hB : LinearIndependent ℂ ![B₁, B₂]) :
    (partialTranspose A₁ A₂ B₁ B₂).rank = 2 * (tensorSum A₁ A₂ B₁ B₂).rank ↔
      (vRank A₁ A₂ = 2 * hRank A₁ A₂ ∧ vRank B₁ B₂ = 2 * hRank B₁ B₂) ∨
      (hRank A₁ A₂ = 2 * vRank A₁ A₂ ∧ hRank B₁ B₂ = 2 * vRank B₁ B₂)
```

对象定义：[对象 079](#obj-079)、[对象 078](#obj-078)、[对象 077](#obj-077)、[对象 080](#obj-080)。

手算入口：令 A₁=B₁=(1,0)ᵀ，A₂=B₂=(0,1)ᵀ，为 2×1 列。tensorSum 是秩 1 的列向量，转置 A 因子后是 I₂，秩 2；竖拼秩 1、横拼秩 2。

总函数与维数陷阱：m₁,n₁,m₂,n₂ 的外层变量必须保留；partialTranspose 是对 A 因子的普通转置，非共轭转置。秩属于 ℕ，结构中差值可能截断，不能按整数差外推。

允许表述与严禁夸大：允许：复矩形矩阵两项且两侧系数分别线性独立时，二倍秩饱和与所列两类拼接秩比等价。严禁：推广到任意 Schmidt 秩、方阵密度态或由秩直接判定 CHSH 违背。

### 3.8 可观测图表内的 MPS 相位恢复

主配：`ch19-tensor-networks-and-holography.md`；环境：`#thm-mps-observable-phase-recovery`；引用：`lean="D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery"`。

标题：`zh=可观测图表内的 MPS 相位恢复`；`en=MPS Phase Recovery in an Observable Chart`。

源定位：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.lean:241`；模块摘要：`sha256:52929273732380a55e32c58e68b23f1f1a4b342aa1015e6688c605a09cb6be07`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.lean.json`；全名：`D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery
open scoped BigOperators Matrix
open Matrix
open OpenBoundaryMPSMarginalBirationality
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
noncomputable section
theorem observable_chart_phase_recovery (m : ℕ) (ψ φ : Word (3 + m) → ℂ)
    (hψ : ψ ∈ openBoundaryMPS (3 + m)) (hφ : φ ∈ openBoundaryMPS (3 + m))
    (hc : ObservableChart m ψ) :
    rawPrefix 3 m φ = rawPrefix 3 m ψ ↔ ∃ z : ℂ, ‖z‖ = 1 ∧ φ = z • ψ
```

对象定义：[对象 226](#obj-226)、[对象 222](#obj-222)、[对象 225](#obj-225)、[对象 223](#obj-223)、[对象 224](#obj-224)、[对象 241](#obj-241)、[对象 244](#obj-244)、[对象 234](#obj-234)、[对象 238](#obj-238)、[对象 235](#obj-235)、[对象 236](#obj-236)、[对象 239](#obj-239)、[对象 242](#obj-242)、[对象 237](#obj-237)、[对象 232](#obj-232)、[对象 233](#obj-233)、[对象 246](#obj-246)、[对象 247](#obj-247)、[对象 240](#obj-240)、[对象 243](#obj-243)、[对象 276](#obj-276)、[对象 277](#obj-277)。

手算入口：用 A₀=I₂、A₁=diag(1,2)，l=r=(1,1) 做小链收缩：字 010 的振幅是 3；全态乘 i 后 rawPrefix 不变。此对角例只演示相位不可见，不声称满足 ObservableChart。

总函数与维数陷阱：rawPrefix 未归一；chartPoly≠0 与支撑上的单射条件不能省；重建定义有除法，退化图表上的总函数值不是恢复结果。

允许表述与严禁夸大：允许：指定开边界 bond=2、物理维数 2 的 MPS，ψ 满足 ObservableChart 时，三站点 rawPrefix 相同当且仅当全态仅差单位相位。严禁：任意 MPS 均可恢复、归一化约化密度即本 rawPrefix，或给出有效数值稳定算法。

### 3.9 MPS 内部恢复的内禀一般性

主配：`ch19-tensor-networks-and-holography.md`；环境：`#thm-mps-generic-interior-recovery`；引用：`lean="D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorGenericity.intrinsic_interior_recovery"`。

标题：`zh=MPS 内部恢复的内禀一般性`；`en=Intrinsic Genericity of Interior MPS Recovery`。

源定位：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorGenericity.lean:303`；模块摘要：`sha256:550ab75617893dab561028cf5ea59e782ec32af3dc1bc3dfc30dcf852626c431`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorGenericity.lean.json`；全名：`D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorGenericity.intrinsic_interior_recovery`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology ComplexOrder
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorGenericity
open PeriodicMPSParentIntersection (Bond Word TwoSiteSpanning)
open OpenBoundaryMPSMarginalBirationality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSIntrinsicQ2Fiber
open OpenBoundaryMPSInteriorCommonCore
open OpenBoundaryMPSQuotient hiding coreCoordinates
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval realCoordinates fixedTensor recoveryPolynomial
    recoveryPolynomial_ne_zero)
set_option maxHeartbeats 1200000 in
theorem intrinsic_interior_recovery (m : ℕ) (hm : 2 ≤ m) : intrinsicInteriorRecovery m
```

对象定义：[对象 221](#obj-221)、[对象 219](#obj-219)、[对象 220](#obj-220)、[对象 222](#obj-222)、[对象 225](#obj-225)、[对象 223](#obj-223)、[对象 224](#obj-224)、[对象 229](#obj-229)、[对象 227](#obj-227)、[对象 228](#obj-228)、[对象 230](#obj-230)、[对象 231](#obj-231)、[对象 241](#obj-241)、[对象 234](#obj-234)、[对象 238](#obj-238)、[对象 235](#obj-235)、[对象 236](#obj-236)、[对象 239](#obj-239)、[对象 242](#obj-242)、[对象 237](#obj-237)、[对象 232](#obj-232)、[对象 233](#obj-233)、[对象 246](#obj-246)、[对象 245](#obj-245)、[对象 247](#obj-247)、[对象 240](#obj-240)、[对象 248](#obj-248)、[对象 256](#obj-256)、[对象 253](#obj-253)、[对象 257](#obj-257)、[对象 249](#obj-249)、[对象 251](#obj-251)、[对象 252](#obj-252)、[对象 255](#obj-255)、[对象 254](#obj-254)、[对象 250](#obj-250)、[对象 266](#obj-266)、[对象 267](#obj-267)、[对象 269](#obj-269)、[对象 265](#obj-265)、[对象 259](#obj-259)、[对象 258](#obj-258)、[对象 264](#obj-264)、[对象 263](#obj-263)、[对象 260](#obj-260)、[对象 262](#obj-262)、[对象 268](#obj-268)、[对象 270](#obj-270)、[对象 261](#obj-261)、[对象 271](#obj-271)、[对象 273](#obj-273)、[对象 272](#obj-272)、[对象 274](#obj-274)、[对象 275](#obj-275)、[对象 276](#obj-276)、[对象 278](#obj-278)、[对象 277](#obj-277)。

手算入口：对长度 5（m=2）的二元链，写出 2⁵=32 个振幅及一个 8×8 的前三站点 rawPrefix；这是最小允许长度，逐项检验定义里的非消失条件后才调用结论。

总函数与维数陷阱：完整展开 intrinsicInteriorRecovery 及其拓扑、参数映射；m 为自然数，m−2 等差在定义中按截断减法解读。长度阈值与复参数域不能省。

允许表述与严禁夸大：允许：m≥2 时 intrinsicInteriorRecovery 精确定义的稠密开集、内禀恢复与例外集合结论。严禁：用一般性排除所有奇异点，或把稠密开误说成具有给定抽样概率 1。

### 3.10 复幂相容线程的对数荷守恒

主配：`ch36-s03-quotienting-generators.md`；环境：`#thm-solenoid-log-charge`；引用：`lean="D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmic_charge_conservation"`。

标题：`zh=复幂相容线程的对数荷守恒`；`en=Logarithmic-Charge Conservation in Complex-Power Threads`。

源定位：`D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.lean:75`；模块摘要：`sha256:6c65730e898dfecaf1713b801e9071c7d8bb4550c73083a266c87b4e84c5ccbd`。

冻结路径：`Golden/Frozen/state/D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.lean.json`；全名：`D5.S1.Solenoid.ComplexPowerSolenoidDecomposition.logarithmic_charge_conservation`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
namespace D5.S1.Solenoid.ComplexPowerSolenoidDecomposition
open D5.S1.Dynamics
theorem logarithmic_charge_conservation (z : ComplexPowerThread) (m : ℕ+) :
    (m.1 : ℝ) * Real.log ‖z.coord m‖ = logarithmicCharge z
```

对象定义：[对象 012](#obj-012)、[对象 013](#obj-013)、[对象 010](#obj-010)、[对象 011](#obj-011)。

手算入口：取正实线程 zₘ=exp(2/m)，则 m log|zₘ|=2；对 m=1,2 可手算为 log e²=2、2 log e=2。

总函数与维数陷阱：m:ℕ+，分母不为零；coord_ne_zero 保证范数正，避免 Real.log 0=0 的退化值。

允许表述与严禁夸大：允许：非零复幂相容线程的各坐标具有同一对数荷。严禁：把不同复对数分支的辐角相同、或所有线程均在单位圆上当作推论。

### 3.11 零对数荷等价于全坐标单位模

主配：`ch36-s03-quotienting-generators.md`；环境：`#thm-solenoid-zero-charge`；引用：`lean="D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff"`。

标题：`zh=零对数荷等价于全坐标单位模`；`en=Zero Logarithmic Charge and Unit-Modulus Coordinates`。

源定位：`D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.lean:205`；模块摘要：`sha256:6c65730e898dfecaf1713b801e9071c7d8bb4550c73083a266c87b4e84c5ccbd`。

冻结路径：`Golden/Frozen/state/D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.lean.json`；全名：`D5.S1.Solenoid.ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
namespace D5.S1.Solenoid.ComplexPowerSolenoidDecomposition
open D5.S1.Dynamics
theorem logarithmicCharge_eq_zero_iff (z : ComplexPowerThread) :
    logarithmicCharge z = 0 ↔ ∀ m, ‖z.coord m‖ = 1
```

对象定义：[对象 012](#obj-012)、[对象 013](#obj-013)、[对象 010](#obj-010)、[对象 011](#obj-011)。

手算入口：取单位线程 zₘ=1，则每坐标模为 1、荷为 0；zₘ=exp(1/m) 给荷 1，展示逆方向的必要性。

总函数与维数陷阱：Real.log 的零点等价必须借助非零坐标；零荷保留辐角自由，不是唯一线程。

允许表述与严禁夸大：允许：相容非零线程中，零荷恰好等价于所有坐标单位模。严禁：零荷等价所有坐标等于 1，或宣称此定理给出完整拓扑直积分解。

### 3.12 黄金模态步的射影缺陷倍率

主配：`ch36-s04-padic-table-expansion.md`；环境：`#thm-golden-projective-multiplier`；引用：`lean="D5/S3/PrimeObserver/ProjectiveMemory/GoldenProjectiveMultiplier.projective_defect_modal_step"`。

标题：`zh=黄金模态步的射影缺陷倍率`；`en=Golden Projective-Defect Multiplier`。

源定位：`D5/S3/PrimeObserver/ProjectiveMemory/GoldenProjectiveMultiplier.lean:47`；模块摘要：`sha256:6057ce29d0a124d81534e28cce7200c9c272d737efc28bf3b8d9c3bd64f75b10`。

冻结路径：`Golden/Frozen/state/D5/S3/PrimeObserver/ProjectiveMemory/GoldenProjectiveMultiplier.lean.json`；全名：`D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier.projective_defect_modal_step`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier
open scoped goldenRatio
open D5.S3.CompletionDynamics.GoldenMobius.GoldenMobiusMap
theorem projective_defect_modal_step {A D : ℝ} (hA : A ≠ 0) :
    projectiveDefect (goldenModalStep (A, D)) =
      goldenProjectiveMultiplier * projectiveDefect (A, D)
```

对象定义：[对象 024](#obj-024)、[对象 044](#obj-044)、[对象 042](#obj-042)、[对象 043](#obj-043)。

手算入口：令 A=1、D=1，θ=D/A=1；模态更新后 θ′=goldenConj/goldenRatio=−φ⁻²≈−0.382，而 D 的环境倍率是 −φ⁻¹≈−0.618。

总函数与维数陷阱：A≠0 必须显式；Lean 的 D/0=0 无射影意义。forcedProjectiveStep 的零缺陷保持要求 forcing=0；强迫式 θ′=−φ⁻²θ+forcing。

允许表述与严禁夸大：允许：A≠0 的无强迫模态步使比值 D/A 乘 −φ⁻²。严禁：把环境稳定根 −φ⁻¹ 与射影倍率混同，或说非零强迫也保持零缺陷。

### 3.13 素数观察语言的三种完备化边界

主配：`ch36-s04-padic-table-expansion.md`；环境：`#thm-prime-three-completions`；引用：`lean="D5/S3/PrimeObserver/ThreeCompletionFinalProposition.prime_observer_three_completion_final_proposition"`。

标题：`zh=素数观察语言的三种完备化边界`；`en=Three Completion Boundaries for Prime-Observer Languages`。

源定位：`D5/S3/PrimeObserver/ThreeCompletionFinalProposition.lean:39`；模块摘要：`sha256:1038cc2679ff5b079be6f116fc7e197edfe47719d6b724af0b76b8be8d9cb106`。

冻结路径：`Golden/Frozen/state/D5/S3/PrimeObserver/ThreeCompletionFinalProposition.lean.json`；全名：`D5.S3.PrimeObserver.ThreeCompletionFinalProposition.prime_observer_three_completion_final_proposition`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.PrimeObserver.ThreeCompletionFinalProposition
open D5.S3.Analytic.PrimeProducts.GlobalPrimeExponentRealizability
open D5.S3.ConceptDynamics.ConceptJoinUniversal
open D5.S3.ConceptDynamics.ObservationOrder.TypedPrimeLanguageHierarchy
open D5.S3.Factorization.ExponentCoordinates.PrimeExponentBijection
theorem prime_observer_three_completion_final_proposition (s : Real) :
    Function.Bijective primeExponentLanguageEquiv ∧
      ((∃ q : PMF Nat, RealizesPrimeExponentLaw s q) ↔ 1 < s) ∧
      (relativePhaseDensityWitness.1 ≠ relativePhaseDensityWitness.2 ∧
        qubitPrimeDiagonalLanguage relativePhaseDensityWitness.1 =
          qubitPrimeDiagonalLanguage relativePhaseDensityWitness.2 ∧
        qubitOperatorLanguage relativePhaseDensityWitness.1 ≠
          qubitOperatorLanguage relativePhaseDensityWitness.2) ∧
      (Refines qubitPrimeDiagonalLanguage qubitOperatorLanguage ∧
        ¬Refines qubitOperatorLanguage qubitPrimeDiagonalLanguage)
```

对象定义：[对象 003](#obj-003)、[对象 023](#obj-023)、[对象 021](#obj-021)、[对象 022](#obj-022)、[对象 025](#obj-025)、[对象 026](#obj-026)、[对象 029](#obj-029)、[对象 028](#obj-028)、[对象 027](#obj-027)、[对象 030](#obj-030)、[对象 031](#obj-031)、[对象 076](#obj-076)、[对象 086](#obj-086)、[对象 088](#obj-088)、[对象 092](#obj-092)、[对象 093](#obj-093)、[对象 091](#obj-091)、[对象 090](#obj-090)、[对象 095](#obj-095)、[对象 094](#obj-094)、[对象 166](#obj-166)。

手算入口：二能级 ψ=(1,1)/√2、φ=(1,i)/√2 的对角概率都为 (1/2,1/2)，但秩一密度矩阵的非对角元不同；这只是相位不可由对角语言恢复的手算模型。

总函数与维数陷阱：s>1 是存在 PMF 实现的准确范围；不能将总函数的 zeta/log/倒数在其他 s 上的值称为概率模型。必须展开 Refines 的方向。

允许表述与严禁夸大：允许：素指数语言的双射、概率实现 iff s>1，以及指定对角语言与算子语言严格细化的合取。严禁：称三种完备化互相等价，或由对角记录重建全部量子相位。

### 3.14 读出与置换更新的交换子

主配：`ch38-s05-escape-ledger-and-entropy.md`；环境：`#thm-observer-read-update-commutator`；引用：`lean="D5/S3/Quantum/ObserverCommutator.observer_read_update_commutator_formula"`。

标题：`zh=读出与置换更新的交换子`；`en=Commutator of Readout and Permutation Update`。

源定位：`D5/S3/Quantum/ObserverCommutator.lean:16`；模块摘要：`sha256:64adf72ef394f71ee3b349cfaac0f75e831d9009d6ca5ef3ad4f9085b1a6212f`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/ObserverCommutator.lean.json`；全名：`D5.S3.Quantum.ObserverCommutator.observer_read_update_commutator_formula`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
namespace D5.S3.Quantum.ObserverCommutator
open D5.S3.Quantum.ObserverAlgebra
theorem observer_read_update_commutator_formula {index : Type*}
    (tau : Equiv.Perm index) (f : index -> Complex) (psi : Register index) :
    observerUpdate tau (readObservable f psi) -
        readObservable f (observerUpdate tau psi) =
      fun i => (f (tau.symm i) - f i) * psi (tau.symm i)
```

对象定义：[对象 157](#obj-157)、[对象 159](#obj-159)、[对象 158](#obj-158)。

手算入口：两坐标交换 τ=(01)，f=(0,1)、ψ=(a,b)，交换子得到 (b,−a)，与 (f(τ⁻¹i)−f(i))ψ(τ⁻¹i) 一致。

总函数与维数陷阱：index 不必有限；Register 是函数空间，不自动属于 ℓ² 或有界算子域；没有求和或 Summable 前提，不能转写为无限维迹公式。

允许表述与严禁夸大：允许：逐坐标读出与可逆置换更新的代数差。严禁：从非零交换子推出热耗散、不可逆性或所有观察者动力学。coda-s02 只交叉引用此定理，不再主配同一 GID。

### 3.15 有界整数幂迹的模恢复唯一性

主配：`ch38-s05-escape-ledger-and-entropy.md`；环境：`#thm-bounded-power-trace-crt`；引用：`lean="D5/S0/Observation/BoundedPowerTraceCRTRecovery.power_trace_unique_of_crt_image"`。

标题：`zh=有界整数幂迹的模恢复唯一性`；`en=Uniqueness of Bounded Integer Power Traces from Modular Images`。

源定位：`D5/S0/Observation/BoundedPowerTraceCRTRecovery.lean:53`；模块摘要：`sha256:d4a16c9f62cd38eb6925515bd61b9cdb26de05163aca6b4d8ed26b667a011b36`。

冻结路径：`Golden/Frozen/state/D5/S0/Observation/BoundedPowerTraceCRTRecovery.lean.json`；全名：`D5.S0.Observation.BoundedPowerTraceCRTRecovery.power_trace_unique_of_crt_image`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S0.Observation.BoundedPowerTraceCRTRecovery
theorem power_trace_unique_of_crt_image {d : Type*} [Fintype d] [DecidableEq d]
    (M B : ℕ) (hM : 2 * B < M) (A C : Matrix d d ℤ) (j : ℕ)
    (hA : |powerTrace A j| < B) (hC : |powerTrace C j| < B)
    (himage : crtImage M (powerTrace A j) = crtImage M (powerTrace C j)) :
    powerTrace A j = powerTrace C j
```

对象定义：[对象 001](#obj-001)、[对象 002](#obj-002)。

手算入口：取 M=11、B=5，满足 2B<M；A=diag(1,2)，j=1 时迹 3。任何 |Tr(C)|<5 且同余于 3 mod 11 的整数迹只能为 3。

总函数与维数陷阱：矩阵为有限整数方阵；j=0 给维数而非动力数据；模数界及两边绝对值严格界都必须保留。

允许表述与严禁夸大：允许：相同模像与严格幅度界确定指定幂迹。严禁：仅由一个模像恢复整矩阵、取消 2B<M 或声称已给出 CRT 算法复杂度。coda-s02 可引用此界，不新增环境。

## 4. 乙部分：四个独立附录

每个附录按下面顺序组织 4–5 个旗舰结果。箭头表示阅读与构造顺序；跨模块的概念联系不冒充后一结果由前一结果直接推导。尤其不把任意锥当作量子态空间，不把任意预测商当作螺线管，也不把可分锥分离证书当作一般量子恢复。

### 4.F 附录 F 排除球、面极性与自旋因子态锥重构

英文书名：`Appendix F Exclusion Balls, Face Polarity, and Spin-Factor State-Cone Reconstruction`。

数学链：平移圆盘约束 → 抽象排除球与面极性 → qutrit 排除面的实三维球图表 → 指定四维自旋因子关系的定向分类与矩阵接口。抽象锥必须满足各自公理；两个具体量子实现之间的联系逐步说明。

### 4.F.1 二次排除约束的球心平移

主配：`appendix-f.md`；环境：`#thm-appf-recentered-ball`；引用：`lean="D5/S3/Quantum/OriginExclusionSegmentRigidity.b_constraint_recenter"`。

标题：`zh=二次排除约束的球心平移`；`en=Recentering a Quadratic Exclusion Constraint`。

源定位：`D5/S3/Quantum/OriginExclusionSegmentRigidity.lean:25`；模块摘要：`sha256:d36c95af2e609979c46fc7f9443cec420f3d4b192f523d3a50911169c06312f9`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/OriginExclusionSegmentRigidity.lean.json`；全名：`D5.S3.Quantum.OriginExclusionSegmentRigidity.b_constraint_recenter`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.OriginExclusionSegmentRigidity
theorem b_constraint_recenter
    (t b : ℝ) :
    b ^ 2 ≤ t * (1 - t) ↔
      (t - (1 / 2 : ℝ)) ^ 2 + b ^ 2 ≤ (1 / 2 : ℝ) ^ 2
```

对象定义：签名未使用项目自定义对象；标准库对象按原类型解读。

手算入口：取 t=1/2，约束是 b²≤1/4；取 t=0，则 b=0。

总函数与维数陷阱：常数除数 2 非零；定理没有额外物理假设，也不涉及无限维。

允许表述与严禁夸大：允许：实平面二次不等式与半径 1/2 的平移圆盘等价。严禁：凭文件名宣布原点排除公理已重建全部量子理论。

### 4.F.2 排除球的面极性分类

主配：`appendix-f.md`；环境：`#thm-appf-exclusion-face-polarity`；引用：`lean="D5/S3/Quantum/Foundation/ExclusionBallFaces.exclusion_ball_faces"`。

标题：`zh=排除球的面极性分类`；`en=Face Polarity for Exclusion Balls`。

源定位：`D5/S3/Quantum/Foundation/ExclusionBallFaces.lean:245`；模块摘要：`sha256:6f9c2a4cdc70cabd08f25618679d45a12dbe0a47484f78de06e174a907c55da7`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Foundation/ExclusionBallFaces.lean.json`；全名：`D5.S3.Quantum.Foundation.ExclusionBallFaces.exclusion_ball_faces`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
noncomputable section
open Set
namespace D5.S3.Quantum.Foundation.ExclusionBallFaces
open CircuitBalancedConfirmation WeightedRelationConfirmation FacetZeroGluing
open WholePairBallConfirmation
variable {V : Type*} [NormedAddCommGroup V] [NormedSpace ℝ V]
  [FiniteDimensional ℝ V]
theorem exclusion_ball_faces {C : PointedCone ℝ V} {u : V →ₗ[ℝ] ℝ}
    (hclosed : IsClosed (C : Set V))
    (hstrict : ∀ x ∈ C, x ≠ 0 → 0 < u x)
    (hgen : Submodule.span ℝ (C : Set V) = ⊤) (hB : exclusionBalls C u) :
    (∀ p : pure C u,
      (exclusion C u p).Nontrivial ∧ IsCompact (exclusion C u p) ∧
      Convex ℝ (exclusion C u p) ∧ IsExposed ℝ (base C u) (exclusion C u p) ∧
      IsExtreme ℝ (base C u) (exclusion C u p) ∧ exclusion C u p ≠ base C u ∧
      ∃ f, confirms C u p f ∧ exclusion C u p = {x | x ∈ base C u ∧ f x = 0}) ∧
    (∀ F : Set V, F.Nonempty → Convex ℝ F → IsExtreme ℝ (base C u) F →
      F ≠ base C u →
      (∃ p : pure C u, F = {(p : V)}) ∨ ∃ p : pure C u, F = exclusion C u p) ∧
    (pairProper C u →
      (∀ p q : pure C u, p ≠ q → ∃ r : pure C u,
        pairBase C u p q = exclusion C u r) ∧ wholePairBalls C u)
```

对象定义：[对象 096](#obj-096)、[对象 099](#obj-099)、[对象 098](#obj-098)、[对象 097](#obj-097)、[对象 100](#obj-100)、[对象 101](#obj-101)、[对象 102](#obj-102)、[对象 103](#obj-103)、[对象 109](#obj-109)、[对象 108](#obj-108)、[对象 110](#obj-110)。

手算入口：在三维复态空间中，取纯态 |0⟩；排除面是在 span{|1⟩,|2⟩} 上的 2×2 密度矩阵球。两正交纯态的组合给一条线段，不能直接把它当作完整排除面。

总函数与维数陷阱：必须完整保留 V 的范数、有限维假设；pure、confirms、exclusionBalls、pairProper 均见原定义。不能将有限维紧性外推。

允许表述与严禁夸大：允许：闭、严格正归一化、生成的实有限维尖锥加 exclusionBalls 前提推出给定面分类；最后的整对球结论还需 pairProper。严禁：省略排除球公理或宣称任意凸态空间均是量子态锥。

### 4.F.3 三阶厄米态锥的纯态排除图表

主配：`appendix-f.md`；环境：`#thm-appf-hermitian-exclusion-chart`；引用：`lean="D5/S3/Quantum/Foundation/HermitianExclusionBall.all_pure_charts"`。

标题：`zh=三阶厄米态锥的纯态排除图表`；`en=Pure-State Exclusion Charts in the Qutrit Hermitian Cone`。

源定位：`D5/S3/Quantum/Foundation/HermitianExclusionBall.lean:186`；模块摘要：`sha256:7b2152b3d4663c26d2363d08187fb1068595c5dcbad85ccad511ceb42ac45dd6`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Foundation/HermitianExclusionBall.lean.json`；全名：`D5.S3.Quantum.Foundation.HermitianExclusionBall.all_pure_charts`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
noncomputable section
open scoped Matrix ComplexOrder InnerProductSpace RealInnerProductSpace
namespace D5.S3.Quantum.Foundation.HermitianExclusionBall
open CircuitBalancedConfirmation FacetZeroGluing ExclusionBallFaces
open SectionROGFrame HermitianExclusionKernel
open D5.S3.Quantum.Information.ActualPureQubitCostInfimum
open D5.S3.Quantum.Measurement.FourQubitParentConstruction
theorem all_pure_charts (p : pure (cone : PointedCone ℝ (HermitianMat (Fin 3) ℂ)) unit) :
    ∃ a : ExclusionChart cone unit (p : HermitianMat (Fin 3) ℂ), a.dim = 3
```

对象定义：[对象 096](#obj-096)、[对象 099](#obj-099)、[对象 098](#obj-098)、[对象 097](#obj-097)、[对象 100](#obj-100)、[对象 103](#obj-103)、[对象 106](#obj-106)、[对象 107](#obj-107)、[对象 121](#obj-121)、[对象 122](#obj-122)、[对象 123](#obj-123)。

手算入口：p=|0⟩⟨0|，排除态由 [[(1+z)/2,(x−iy)/2],[(x+iy)/2,(1−z)/2]] 嵌入其余两维给出；正性等价 x²+y²+z²≤1。

总函数与维数陷阱：固定 Fin 3 与实仿射坐标；图表内的 2×2 Bloch 球不是整个 qutrit 态空间。

允许表述与严禁夸大：允许：3×3 复厄米正锥中每个纯态的排除面有维数为 3 的 ExclusionChart。严禁：把图表维数 3 混作 Hilbert 维数，或覆盖任意矩阵阶数。

### 4.F.4 自旋因子关系的定向分类及矩阵接口

主配：`appendix-f.md`；环境：`#thm-appf-spin-factor-classification`；引用：`lean="D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences"`。

标题：`zh=自旋因子关系的定向分类及矩阵接口`；`en=Oriented Spin-Factor Classification and Matrix Interfaces`。

源定位：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:798`；模块摘要：`sha256:e0e691141d161e5e7575e0f5b7aadb7ef0bdeb68d4a3fb861adf3096fe71e524`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/SpinFactor/OriginalClassification.lean.json`；全名：`D5.S3.Quantum.SpinFactor.OriginalClassification.complete_consequences`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
noncomputable section
namespace D5.S3.Quantum.SpinFactor.OriginalClassification
open OriginalDContract
open OriginalPureRigidity (global_pure)
open OriginalResidual (all_inputs_of_pure)
open _root_.D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
  (Consequences MatrixInterfaces same_D_consequences)
theorem complete_consequences (D : Relation) (hP : P2 D) (hPB : PB D) :
    ∃ ε : Orientation,
      (ε = .plus ∨ ε = .minus) ∧
      (∀ a b : E, D a b = crossD ε a b) ∧
      (Consequences D ∧ MatrixInterfaces (orientationBool ε) D)
```

对象定义：[对象 086](#obj-086)、[对象 087](#obj-087)、[对象 088](#obj-088)、[对象 117](#obj-117)、[对象 118](#obj-118)、[对象 155](#obj-155)、[对象 156](#obj-156)、[对象 188](#obj-188)、[对象 169](#obj-169)、[对象 171](#obj-171)、[对象 189](#obj-189)、[对象 187](#obj-187)、[对象 185](#obj-185)、[对象 186](#obj-186)、[对象 179](#obj-179)、[对象 172](#obj-172)、[对象 168](#obj-168)、[对象 177](#obj-177)、[对象 182](#obj-182)、[对象 173](#obj-173)、[对象 178](#obj-178)、[对象 180](#obj-180)、[对象 184](#obj-184)、[对象 175](#obj-175)、[对象 176](#obj-176)、[对象 181](#obj-181)、[对象 183](#obj-183)、[对象 174](#obj-174)、[对象 170](#obj-170)、[对象 190](#obj-190)、[对象 191](#obj-191)、[对象 193](#obj-193)、[对象 200](#obj-200)、[对象 203](#obj-203)、[对象 207](#obj-207)、[对象 211](#obj-211)、[对象 192](#obj-192)、[对象 198](#obj-198)、[对象 202](#obj-202)、[对象 204](#obj-204)、[对象 195](#obj-195)、[对象 201](#obj-201)、[对象 206](#obj-206)、[对象 197](#obj-197)、[对象 199](#obj-199)、[对象 209](#obj-209)、[对象 210](#obj-210)、[对象 205](#obj-205)、[对象 208](#obj-208)、[对象 194](#obj-194)、[对象 196](#obj-196)。

手算入口：E=ℝ×ℝ³ 中取空间基 e₁,e₂；两种 crossD 的空间结果分别为 ±e₃。归一态 ρ=(I+r·σ)/2 在 r=(0,0,1) 时是 diag(1,0)。

总函数与维数陷阱：原始空间、方向枚举、vnorm、cone 及各谓词需逐项展开；正锥条件 ‖v‖≤m 不自动含 trace=1，归一化另加。

允许表述与严禁夸大：允许：给定 P2、PB 的关系 D 只能是两种定向之一，并具有 Consequences 与 MatrixInterfaces 精确定义的性质。严禁：从一个叉积图直接推出 P2/PB，或声称所有维数自旋因子都等同复量子态。

### 4.G 附录 G 稳定子多面体之外：马约拉纳编码、克利福德魔性与转向语境性

英文书名：`Appendix G Beyond the Stabilizer Polytope: Majorana Codes, Clifford Magic, and Steering Contextuality`。

数学链：稳定子二元子空间与低重逻辑障碍 → 双赤道 Wigner 张量距离 → 一般缺额因式分解的反例 → 十一维三阶矩正性界的反例 → 双比特三设置转向的尖锐中心阈值。共同问题是有限表征的可达边界，不声称五种资源量互为充要条件。

### 4.G.1 十四模以内马约拉纳码的低重逻辑算子

主配：`appendix-g.md`；环境：`#thm-appg-majorana-fourteen-bound`；引用：`lean="D5/S3/Quantum/Codes/MajoranaFourteenModeDistanceFour.result"`。

标题：`zh=十四模以内马约拉纳码的低重逻辑算子`；`en=Low-Weight Logical Operators for Majorana Codes up to Fourteen Modes`。

源定位：`D5/S3/Quantum/Codes/MajoranaFourteenModeDistanceFour.lean:653`；模块摘要：`sha256:cc72752a1b62a31a8ede6d6574229b47109dba96701e607ef3a8baed4ddaa1da`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Codes/MajoranaFourteenModeDistanceFour.lean.json`；全名：`D5.S3.Quantum.Codes.MajoranaFourteenModeDistanceFour.result`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
open scoped BigOperators
open Matrix
open D5.S3.Fourier.CharacterSelection.BinaryCharacterCodeDuality
  (characterOrthogonalComplement)
noncomputable section
namespace D5.S3.Quantum.Codes.MajoranaFourteenModeDistanceFour
theorem result : claim
```

对象定义：[对象 033](#obj-033)、[对象 032](#obj-032)、[对象 055](#obj-055)、[对象 056](#obj-056)。

手算入口：取 n=4、c=span{1111}：c 自正交、含全 1 且 2 dim c<4；v=1100 在 c⊥中而不在 c，重为 2<4。

总函数与维数陷阱：claim 还要求全 1∈c、2·finrank c<n；是有限二元代数编码，不自动给连续费米动力学或实验容错阈值。

允许表述与严禁夸大：允许：n≤14 且满足 claim 的二元自正交子空间必有重<4 的非稳定子交换算子。严禁：说已构造十四模距离四编码；结论实际排除该假设族的距离≥4。

### 4.G.2 赤道态的 Wigner 距离张量规则

主配：`appendix-g.md`；环境：`#thm-appg-wigner-equatorial-tensor`；引用：`lean="D5/S3/Quantum/Magic/QubitWignerDistanceTensorRules.resultEquatorial"`。

标题：`zh=赤道态的 Wigner 距离张量规则`；`en=Equatorial-State Tensor Rules for Wigner Distance`。

源定位：`D5/S3/Quantum/Magic/QubitWignerDistanceTensorRules.lean:637`；模块摘要：`sha256:68dfd52df42ebafdaeceedcb71a1cff2a125a14956cf6cc0df2ba1c90156b060`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Magic/QubitWignerDistanceTensorRules.lean.json`；全名：`D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules.resultEquatorial`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules
open Matrix Complex
open D5.S3.Quantum.Magic.WignerSimplexNearestEdge (edgeVertex freeEdges nearest_edge_point)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity)
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.Magic.WignerDistanceMinimum
  (PhasePoint phasePoint phasePointTwo Wigner WignerOne WignerTwo pauliTwo Stab Wfree COne CTwo
    spectral eigenVector spectral_stabilizer spectral_product_stabilizer)
theorem resultEquatorial : claimEquatorial
```

对象定义：[对象 086](#obj-086)、[对象 087](#obj-087)、[对象 088](#obj-088)、[对象 112](#obj-112)、[对象 117](#obj-117)、[对象 118](#obj-118)、[对象 139](#obj-139)、[对象 140](#obj-140)、[对象 150](#obj-150)、[对象 151](#obj-151)、[对象 141](#obj-141)、[对象 148](#obj-148)、[对象 149](#obj-149)、[对象 144](#obj-144)、[对象 145](#obj-145)、[对象 146](#obj-146)、[对象 147](#obj-147)、[对象 142](#obj-142)、[对象 143](#obj-143)、[对象 279](#obj-279)、[对象 284](#obj-284)、[对象 280](#obj-280)、[对象 283](#obj-283)、[对象 281](#obj-281)、[对象 282](#obj-282)、[对象 285](#obj-285)、[对象 286](#obj-286)、[对象 287](#obj-287)、[对象 290](#obj-290)。

手算入口：赤道纯态 Bloch 向量 (3/5,4/5,0) 给 2×2 矩阵 [[1/2,3/10−2i/5],[3/10+2i/5,1/2]]；先依 phasePoint 定义列四个 Wigner 权，再代入 claimEquatorial。

总函数与维数陷阱：COne、CTwo 为指定 ℓ¹ 距离到 Wfree；不是迹距离或任意资源单调量，分支符号和密度态前提不可删。

允许表述与严禁夸大：允许：两个因子都是密度态且 Bloch 的 Z 分量都为 0 时，CTwo(ρ⊗σ)=COne(ρ)+COne(σ)+COne(ρ)COne(σ)。严禁：把双赤道等式推广到所有态，或暗加原签名没有的纯态条件。

### 4.G.3 Wigner 张量缺额的单因子分解反例

主配：`appendix-g.md`；环境：`#thm-appg-wigner-deficit-nonfactorization`；引用：`lean="D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.result"`。

标题：`zh=Wigner 张量缺额的单因子分解反例`；`en=Refutation of a Single-Factor Wigner Deficit Formula`。

源定位：`D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.lean:335`；模块摘要：`sha256:b8affea68dafd1592007a09ae2baa1ac21aef4cdc342d199859bf92c5c67cd53`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.lean.json`；全名：`D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation.result`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity)
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet)
open D5.S3.Quantum.Magic.WignerDistanceMinimum
open D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules
open scoped Kronecker ComplexOrder
theorem result : ¬ claim
```

对象定义：[对象 086](#obj-086)、[对象 087](#obj-087)、[对象 088](#obj-088)、[对象 112](#obj-112)、[对象 117](#obj-117)、[对象 118](#obj-118)、[对象 135](#obj-135)、[对象 134](#obj-134)、[对象 136](#obj-136)、[对象 137](#obj-137)、[对象 138](#obj-138)、[对象 139](#obj-139)、[对象 150](#obj-150)、[对象 151](#obj-151)、[对象 141](#obj-141)、[对象 148](#obj-148)、[对象 149](#obj-149)、[对象 144](#obj-144)、[对象 145](#obj-145)、[对象 146](#obj-146)、[对象 147](#obj-147)、[对象 142](#obj-142)、[对象 143](#obj-143)、[对象 279](#obj-279)、[对象 284](#obj-284)、[对象 280](#obj-280)、[对象 283](#obj-283)、[对象 281](#obj-281)、[对象 282](#obj-282)、[对象 285](#obj-285)、[对象 286](#obj-286)、[对象 287](#obj-287)、[对象 290](#obj-290)。

手算入口：取源码 rhoA、rhoB、sigma 的三个有理 2×2 矩阵；rhoA 的 Bloch 向量是 (3/5,4/5,0)，rhoB 为 (5/13,12/13,0)，以同一 sigma 比较 deficit/COne。

总函数与维数陷阱：反例只能否定所给普遍因式分解；比值只在 COne>0 时作教学计算，不能利用除零总函数延拓。

允许表述与严禁夸大：允许：不存在 claim 中对所有指定输入通用的单个函数 f，使 deficit(ρ,σ)=COne(ρ)f(σ)。严禁：将否定存在命题说成所有输入均不分解，或说任意张量距离规则已被否定。

### 4.G.4 十一维克利福德三阶矩的负期望反例

主配：`appendix-g.md`；环境：`#thm-appg-clifford-third-moment-negative`；引用：`lean="D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.result"`。

标题：`zh=十一维克利福德三阶矩的负期望反例`；`en=Negative Clifford Third-Moment Expectation in Dimension Eleven`。

源定位：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:148`；模块摘要：`sha256:8532a0ef00a289544d8e4740ee71c4efe03920036ea636be7b7dca2fd58c007b`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean.json`；全名：`D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.result`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
theorem result : ¬ claim
```

对象定义：[对象 124](#obj-124)、[对象 129](#obj-129)、[对象 125](#obj-125)、[对象 131](#obj-131)、[对象 128](#obj-128)、[对象 130](#obj-130)、[对象 127](#obj-127)、[对象 133](#obj-133)、[对象 126](#obj-126)、[对象 132](#obj-132)。

手算入口：源码 d=11、n=1 的归一态与拉格朗日子空间给 κ=−1196/64000<0；用 3×3 模 11 矩阵 O=[[7,8,8],[8,7,8],[8,8,7]] 检查 OᵀO=I 及 O1=1。

总函数与维数陷阱：κ 是复数 trace，ComplexOrder 同时约束虚部；不要擅自用 .re 替换原 claim。见证是十一维而非最小维反例。

允许表述与严禁夸大：允许：¬claim 否定所有奇素数维、所有归一态和随机拉格朗日子空间的逐点 0≤κ≤1 界；源码给 d=11 见证。严禁：改写成正性定理、所有维数均负或原猜想的聚合不等式也被反驳。

### 4.G.5 三设置转向的椭球中心尖锐阈值

主配：`appendix-g.md`；环境：`#thm-appg-steering-fthree-threshold`；引用：`lean="D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.result"`。

标题：`zh=三设置转向的椭球中心尖锐阈值`；`en=Sharp Ellipsoid-Centre Threshold for Three-Setting Steering`。

源定位：`D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.lean:327`；模块摘要：`sha256:0cf456207eda24e675e01d1e4ca95ccd412159c00cc4bace39ce40af9a0873b5`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.lean.json`；全名：`D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold.result`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
  (pauli blochA blochB corr vlen centre vlen_eq_norm vlen_nonneg)
open D5.S3.Quantum.Entanglement.SteeringEllipsoidCHSH
  (vlen_sq normalized_unit delta flipped
    flip_purity_identity bob_radius_le delta_le_centre tightState tight_psd tight_readouts
    tight_centre bell bell_trace_real_expansion unit_dot_le)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  (trace_flip)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  renaming flip → partySwap
open D5.S3.QuantumChannels.PauliThreeWeightBayesianInverseUniqueness (spin)
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
namespace D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold
theorem result : claim
```

对象定义：[对象 066](#obj-066)、[对象 069](#obj-069)、[对象 068](#obj-068)、[对象 067](#obj-067)、[对象 082](#obj-082)、[对象 083](#obj-083)、[对象 084](#obj-084)、[对象 081](#obj-081)、[对象 085](#obj-085)、[对象 086](#obj-086)、[对象 087](#obj-087)、[对象 088](#obj-088)、[对象 117](#obj-117)、[对象 118](#obj-118)、[对象 288](#obj-288)、[对象 289](#obj-289)。

手算入口：Bell 态中心 t=0 且 F₃=√3；t=2/3 时统一上界 max(√(3(1−t)),1)=1。

总函数与维数陷阱：centreB 在 Alice 纯边缘 vlen=1 时有显式分支；否则分母 1−‖a‖²。sSup 依赖有界非空实测量集合，不能外推任意非密度矩阵；Real.sqrt 负输入取 0。

允许表述与严禁夸大：允许：任意双比特密度态的所列上界，及每个 0≤t<2/3 都有 F₃>1 的态。严禁：中心长度<2/3 的每个态都违背，或将三设置转向判据等同全部非局域性。

### 4.H 附录 H 有限视界观察者、预测深度、螺线管记忆与历史账本

英文书名：`Appendix H Finite-Horizon Observers, Prediction Depth, Solenoid Memory, and History Ledgers`。

数学链：当前读出是完整未来轨迹的首坐标 → 有限状态的预测视界稳定 → 支持更新与读出的记忆唯一映到预测商 → 同可见投影的螺线管提升差满足隐藏余循环 → 公开读出和账本的核控制隐藏信息恢复。后三者共同使用“在读出核上是否可区分”的因子化原则；实例化到同一系统还需给出实际映射。

目录检索边界：本提交存在 `D5/S3/Observer/`、`D5/S3/ObserverMemory/` 与 `D5/S1/Solenoid/`；`D5/S3/PredictionDepth/`、`D5/S3/History/` 两个路径在该提交中无文件。预测深度与历史账本从现存的精确模块选择，不虚构路径或冻结声明。所选均未在既有章节锁定，也与第 36 章及第 38 章本批候选不同。

同一系统的贯穿算例：取 `UniversalSolenoid` 上的更新 $F(x)=-x$，记可见相位为 $\pi(x)$。圆周相位取代表元 $t\in[0,1)$，二值读出 $q(x)$ 在 $t\in[0,1/2)$ 时为 1，其余为 0。记忆 $r(x)=(q(x),q(-x))$ 取值于四状态集合 $Y=\{0,1\}^2$，其更新为交换两个坐标，读出为第一坐标。因为 $F^2=\mathrm{id}$，完整轨迹交替重复这两个读数；一步视界即确定全部未来。于是前三条可依次解释：首坐标恢复、有限 $Y$ 的视界稳定，以及 $r$ 支持读出和更新因子化后通往预测商的唯一映射。这里有限的是读出商 $Y$，底层螺线管并未变成有限空间。

继续取隐藏差 $k=\operatorname{realFlow}(1)$、$l=\operatorname{realFlow}(2)$，令三组提升为 $x$、$x+k$、$x+k+l$。它们可见投影相同，因而在上述更新下具有相同完整二值读出；三段隐藏差分别是 $k,l,k+l$。最后实例化群准则：`Control=Hidden=UniversalSolenoid`，`Public=Ledger=AddCircle (1 : ℝ)`，$H=\pi$、$K=\mathrm{id}$、$L(x)=x_2$。公开核包含非零的 $k$；账本第二坐标为 $k_2=1/2$，所以它排除这条遗漏，却仍漏掉 $2k$，因为 $(2k)_1=(2k)_2=0$ 而 $(2k)_3=2/3$。这逐项展示了隐藏差、预测不可区分及添加账本后核的严格缩小；并不声称账本已经完全恢复。上述具体实例是教学推演，须在正文写出映射与计算，不作为额外冻结 GID。

### 4.H.1 完整未来轨迹包含当前读出

主配：`appendix-h.md`；环境：`#thm-apph-current-readout`；引用：`lean="D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.recover_current_readout"`。

标题：`zh=完整未来轨迹包含当前读出`；`en=Current Readout from the Complete Itinerary`。

源定位：`D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.lean:35`；模块摘要：`sha256:df142707c3bb819813cd285c35dea2867e6367534d85c5116e2340887673336e`。

冻结路径：`Golden/Frozen/state/D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.lean.json`；全名：`D5.S3.ObserverMemory.Trajectories.CurrentReadoutRecovery.recover_current_readout`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
namespace D5.S3.ObserverMemory.Trajectories.CurrentReadoutRecovery
open D5.S3.ObserverMemory.Prediction.ItineraryCompletion
set_option autoImplicit false
set_option relaxedAutoImplicit false
theorem recover_current_readout {X B : Type*}
    (F : X -> X) (q : X -> B) :
    q = itineraryHead ∘ completeItinerary F q
```

对象定义：[对象 035](#obj-035)、[对象 041](#obj-041)。

手算入口：两状态 X={0,1}、F 交换、q=id；轨迹分别 0101… 与 1010…，取第零项还原当前状态。

总函数与维数陷阱：类型 X、B 任意，不要求有限；这是函数恒等式，不是观测误差或统计一致性定理。

允许表述与严禁夸大：允许：q 通过完整读出轨迹的首坐标分解。严禁：仅凭当前读出恢复完整轨迹或内部状态。

### 4.H.2 有限状态的预测视界稳定

主配：`appendix-h.md`；环境：`#thm-apph-finite-horizon-stability`；引用：`lean="D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.finite_horizon_stabilizes_at_completionDepth"`。

标题：`zh=有限状态的预测视界稳定`；`en=Finite-State Prediction-Horizon Stabilization`。

源定位：`D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.lean:100`；模块摘要：`sha256:7fe54be78f1d82a5b5d6169cea48e8626f0a26901386548ca24d5b9fb5e12dea`。

冻结路径：`Golden/Frozen/state/D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.lean.json`；全名：`D5.S3.ObserverMemory.RefinementClosure.FiniteHorizonKernelRecurrence.finite_horizon_stabilizes_at_completionDepth`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.ObserverMemory.RefinementClosure.FiniteHorizonKernelRecurrence
open D5.S3.ObserverMemory.Prediction.ConditionalEntropyStability
open D5.S3.ObserverMemory.Prediction.ItineraryCompletion
universe u v
theorem finite_horizon_stabilizes_at_completionDepth
    {Y : Type u} {O : Type v} [Fintype Y]
    (tau : Y -> Y) (q : Y -> O) :
    finiteHorizonKernel tau q (completionDepth tau q) =
      Setoid.ker (completeItinerary tau q)
```

对象定义：[对象 034](#obj-034)、[对象 035](#obj-035)、[对象 037](#obj-037)、[对象 036](#obj-036)、[对象 040](#obj-040)。

手算入口：三状态 F(0)=1,F(1)=2,F(2)=2，q(0)=q(1)=0,q(2)=1；当前读出不能分开 0、1，增加一步后轨迹前缀为 00 与 01，全部等价类稳定。

总函数与维数陷阱：Fintype Y 必需；finiteHorizonKernel 的 m 包含 t≤m，即 m+1 个读数。无概率、连续性或无穷求和假设。

允许表述与严禁夸大：允许：有限 X 的精确定义 completionDepth 处，有限视界核等于完整未来轨迹核。严禁：任意无限状态系统有有限视界，或 completionDepth 是物理钟表时间上界。

### 4.H.3 预测完备商的最小记忆因子

主配：`appendix-h.md`；环境：`#thm-apph-predictive-minimal-quotient`；引用：`lean="D5/S3/ObserverMemory/RefinementClosure/PredictiveMemoryMinimalQuotient.predictive_memory_minimal_quotient"`。

标题：`zh=预测完备商的最小记忆因子`；`en=Minimal Memory Factor of the Predictive Completion Quotient`。

源定位：`D5/S3/ObserverMemory/RefinementClosure/PredictiveMemoryMinimalQuotient.lean:38`；模块摘要：`sha256:32eff58d40c4b153a53aaf92fdcc908f550ea4cf1172f8bbd904470027c09f25`。

冻结路径：`Golden/Frozen/state/D5/S3/ObserverMemory/RefinementClosure/PredictiveMemoryMinimalQuotient.lean.json`；全名：`D5.S3.ObserverMemory.RefinementClosure.PredictiveMemoryMinimalQuotient.predictive_memory_minimal_quotient`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.ObserverMemory.RefinementClosure.PredictiveMemoryMinimalQuotient
open D5.S3.ObserverMemory.Prediction.ItineraryCompletion
open D5.S3.ObserverMemory.PredictionFactors.PredictionCompletionUniversality
open D5.S3.ObserverMemory.Refinement.PredictionCompletion
theorem predictive_memory_minimal_quotient
    {X B M : Type*} (F : X -> X) (q : X -> B) (r : X -> M)
    (readout_factors : ∃ factor : M -> B, q = factor ∘ r)
    (update_factors : ∃ induced : M -> M, r ∘ F = induced ∘ r) :
    ∃! theta : Set.range r -> CompletedState F q,
      completionProjection F q = theta ∘ Set.rangeFactorization r
```

对象定义：[对象 035](#obj-035)、[对象 038](#obj-038)、[对象 039](#obj-039)。

手算入口：在上述三状态例取 r=id，q 与更新都能因子化；唯一 θ 把状态映至其未来读出等价类。把两个未来可区分状态合并的 r 则不满足前提。

总函数与维数陷阱：X 不要求有限；theta 定义在 Set.range r 而不是整个 M；存在唯一是商泛性质，不给计算复杂度。

允许表述与严禁夸大：允许：任何同时支持读出和更新因子化的记忆 r，其实际像唯一映到预测完备商。严禁：说 θ 必为单射，或说 r 已是最小记忆；允许冗余记忆。

### 4.H.4 同可见投影提升的隐藏纤维余循环

主配：`appendix-h.md`；环境：`#thm-apph-hidden-fiber-cocycle`；引用：`lean="D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle"`。

标题：`zh=同可见投影提升的隐藏纤维余循环`；`en=Hidden-Fiber Cocycle for Equal-Projection Lifts`。

源定位：`D5/S1/Solenoid/ThroatTransitionCocycle.lean:19`；模块摘要：`sha256:14243135706bf0bd3412b243b45d2ec46ce3ba16d1342b8569f2b2b50ff4fc12`。

冻结路径：`Golden/Frozen/state/D5/S1/Solenoid/ThroatTransitionCocycle.lean.json`；全名：`D5.S1.Solenoid.ThroatTransitionCocycle.three_lift_difference_cocycle`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
namespace D5.S1.Solenoid.ThroatTransitionCocycle
open D5.S1.Dynamics
theorem three_lift_difference_cocycle
    {U : Type*}
    (sAlpha sBeta sGamma : U → UniversalSolenoid)
    (hAlphaBeta : UniversalSolenoid.projection ∘ sAlpha =
      UniversalSolenoid.projection ∘ sBeta)
    (hBetaGamma : UniversalSolenoid.projection ∘ sBeta =
      UniversalSolenoid.projection ∘ sGamma) :
    ∃ kAlphaBeta kBetaGamma kAlphaGamma : U → UniversalSolenoid,
      ((∀ u, UniversalSolenoid.projection (kAlphaBeta u) = 0) ∧
        (∀ u, sBeta u = sAlpha u + kAlphaBeta u) ∧
        ∀ k : U → UniversalSolenoid,
          ((∀ u, UniversalSolenoid.projection (k u) = 0) ∧
            (∀ u, sBeta u = sAlpha u + k u)) → k = kAlphaBeta) ∧
      ((∀ u, UniversalSolenoid.projection (kBetaGamma u) = 0) ∧
        (∀ u, sGamma u = sBeta u + kBetaGamma u) ∧
        ∀ k : U → UniversalSolenoid,
          ((∀ u, UniversalSolenoid.projection (k u) = 0) ∧
            (∀ u, sGamma u = sBeta u + k u)) → k = kBetaGamma) ∧
      ((∀ u, UniversalSolenoid.projection (kAlphaGamma u) = 0) ∧
        (∀ u, sGamma u = sAlpha u + kAlphaGamma u) ∧
        ∀ k : U → UniversalSolenoid,
          ((∀ u, UniversalSolenoid.projection (k u) = 0) ∧
            (∀ u, sGamma u = sAlpha u + k u)) → k = kAlphaGamma) ∧
      ∀ u, kAlphaGamma u = kAlphaBeta u + kBetaGamma u
```

对象定义：[对象 004](#obj-004)、[对象 005](#obj-005)、[对象 006](#obj-006)。

手算入口：令 sα=0、sβ=k、sγ=k+l，其中 k,l 在投影核中，则三段差为 k、l、k+l。可取 k=realFlow(1)：可见投影为 0，但线程第二坐标为半圈。

总函数与维数陷阱：U 任意，不含连续性假设；隐藏差是群元，不是任取实数辐角差；分母坐标为 ℕ+。

允许表述与严禁夸大：允许：三组同可见投影提升存在唯一隐藏差，并满足加法余循环。严禁：凭同一圆周投影恢复隐藏线程，或声称任意预测商自动就是螺线管。

### 4.H.5 公开读出与历史账本的核恢复准则

主配：`appendix-h.md`；环境：`#thm-apph-ledger-recovery-kernel`；引用：`lean="D5/S3/Observer/Agency/PublicRecoveryCriterion.public_recovery_criterion"`。

标题：`zh=公开读出与历史账本的核恢复准则`；`en=Kernel Criterion for Public Recovery with a History Ledger`。

源定位：`D5/S3/Observer/Agency/PublicRecoveryCriterion.lean:38`；模块摘要：`sha256:40cb9fdeed44141497d16177da25f6a264d884298090e06956ce865c70271fe4`。

冻结路径：`Golden/Frozen/state/D5/S3/Observer/Agency/PublicRecoveryCriterion.lean.json`；全名：`D5.S3.Observer.Agency.PublicRecoveryCriterion.public_recovery_criterion`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.Observer.Agency.PublicRecoveryCriterion
theorem public_recovery_criterion
    {Control Public Hidden Ledger : Type*}
    [AddGroup Control] [AddGroup Public] [AddGroup Hidden] [AddGroup Ledger]
    (H : Control →+ Public) (K : Control →+ Hidden) (L : Control →+ Ledger) :
    ((∃ recover : H.range →+ Hidden, K = recover.comp H.rangeRestrict) ↔
        H.ker ≤ K.ker) ∧
      (H.ker ≤ K.ker ↔ H.ker.map K = ⊥) ∧
      (H.ker.map K = ⊥ ↔
        ∃ recover : H.range →+ Hidden, K = recover.comp H.rangeRestrict) ∧
      (H.ker ⊓ L.ker).map K ≤ H.ker.map K
```

对象定义：签名未使用项目自定义对象；标准库对象按原类型解读。

手算入口：取 Control=ℤ²、H(x,y)=x、K(x,y)=y；ker H⊄ker K，所以不能由公开值恢复隐藏值。再取 L(x,y)=y，则 ker H∩ker L={0}，账本消除该遗漏。

总函数与维数陷阱：签名要求四个 AddGroup；无范数、熵或时序模型。与预测商的连接是核因子化这一共同结构，须另指定系统才能实例化。

允许表述与严禁夸大：允许：加法群同态上的精确因子化 iff 核包含，以及添加账本后不可见隐藏位移子群只会缩小。严禁：宣称任意历史记录都会完全恢复、或此群代数已推出热力学不可逆。

### 4.I 附录 I 量子信息散度、逆测试可达性、子熵与近似恢复对偶

英文书名：`Appendix I Quantum Information Divergences, Reverse-Test Attainment, Subentropy, and Approximate Recovery Duality`。

数学链：扩展值凸逆测试的可达性 → 正定矩阵运输的重心证书 → 子熵与猜测误差界 → 投影支撑 Kraus 族的通道补全 → 可分锥的最近点与规范残差分离证书。主线是可达表示、矩阵几何、可读信息、通道构造和逼近障碍；最后两条分别给出可实现构造与不可达证书，尚未证明它们构成同一恢复优化问题的原始与对偶。

五条均来自指定候选范围。末条取自 `D5/S3/Resource/SeparableConeResidualWitness`，用 Hilbert–Schmidt 逼近的规范负残差给出对偶见证。附录标题中的“近似恢复对偶”只能作为问题方向：本组冻结结果未给出任意量子通道的统一近似恢复界，不能将章节组织上的联系写成一个已经验证的总定理。

### 4.I.1 一般凸逆测试的扩展值最小代价可达性

主配：`appendix-i.md`；环境：`#thm-appi-reverse-test-attainment`；引用：`lean="D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.original_reverse_test_extended_attainment"`。

标题：`zh=一般凸逆测试的扩展值最小代价可达性`；`en=Extended-Value Attainment for General Convex Reverse Tests`。

源定位：`D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.lean:383`；模块摘要：`sha256:f7c4aefd9d133682c286911ab58791b10d4da0fe8125854f5148a0cab2ae45f7`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.lean.json`；全名：`D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment.original_reverse_test_extended_attainment`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
noncomputable section
universe u v
open Set MeasureTheory Filter
open scoped ComplexOrder ENNReal NNReal Topology
open D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open D5.S3.Analytic.Convexity.PosteriorCurvatureCost
open D5.S3.Quantum.Analysis.NormalFunctionals
open D5.S3.Quantum.Analysis.NormalMomentFamily
open D5.S3.Quantum.Divergence.PosteriorSourceNormalization
open D5.S3.Quantum.Divergence.MaximalHockeyStickL1ReverseTest
namespace D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment
set_option maxHeartbeats 1200000
set_option backward.isDefEq.respectTransparency false
variable {A : Type v} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
section Concrete
variable {H : Type v} [NormedAddCommGroup H] [InnerProductSpace ℂ H] [CompleteSpace H]
    (M : VonNeumannAlgebra H) (ρ σ : StrongDual ℂ M.toStarSubalgebra)
    (hρ : ∀ a, 0 ≤ a → 0 ≤ ρ a) (hσ : ∀ a, 0 ≤ a → 0 ≤ σ a)
    (hn : IsOrderNormal (ρ + σ))
include hρ hσ hn
theorem original_reverse_test_extended_attainment
    {f : ℝ → ℝ} (hf : ConvexOn ℝ (Ioi 0) f) :
    ∃ F : Family ρ σ,
      familyCost hf F = sInf (attainableCosts.{u} hf ρ σ) ∧
      sInf (attainableCosts.{u} hf ρ σ) ≠ ⊥ ∧
      (ρ = 0 → σ = 0 → sInf (attainableCosts.{u} hf ρ σ) = 0) ∧
      (scalarMeasure F).Regular ∧
      IsFiniteMeasure (liftedMeasure.{u} (scalarMeasure F)) ∧
      (∃ R : NormalL1ReverseTest ρ σ (liftedMeasure.{u} (scalarMeasure F)),
        R.p = (fun x => x.down.val) ∧ R.q = (fun x => 1 - x.down.val) ∧
        closedPerspectiveCost hf (liftedMeasure (scalarMeasure F)) R.p R.q =
          sInf (attainableCosts.{u} hf ρ σ)) ∧
      ∃ Γ : (Interval →₁[scalarMeasure F] ℂ) →L[ℂ] StrongDual ℂ M.toStarSubalgebra,
        (∀ g : C(Interval, ℂ), Γ (ContinuousMap.toLp 1 (scalarMeasure F) ℂ g) = linearMap F g) ∧
        (∀ h, IsOrderNormal (Γ h)) ∧
        (∀ h, (∀ᵐ t ∂scalarMeasure F, 0 ≤ h t) → ∀ a : M.toStarSubalgebra, 0 ≤ a → 0 ≤ Γ h a) ∧
        (∀ h, Γ h 1 = ∫ t, h t ∂scalarMeasure F) ∧ ‖Γ‖ ≤ 1 ∧
        Γ (ContinuousMap.toLp 1 (scalarMeasure F) ℂ posterior) = ρ ∧
        Γ (ContinuousMap.toLp 1 (scalarMeasure F) ℂ (1 - posterior)) = σ
```

对象定义：[对象 014](#obj-014)、[对象 017](#obj-017)、[对象 016](#obj-016)、[对象 015](#obj-015)、[对象 020](#obj-020)、[对象 019](#obj-019)、[对象 018](#obj-018)、[对象 045](#obj-045)、[对象 048](#obj-048)、[对象 049](#obj-049)、[对象 050](#obj-050)、[对象 046](#obj-046)、[对象 051](#obj-051)、[对象 053](#obj-053)、[对象 047](#obj-047)、[对象 052](#obj-052)、[对象 054](#obj-054)、[对象 070](#obj-070)、[对象 071](#obj-071)、[对象 072](#obj-072)、[对象 073](#obj-073)、[对象 074](#obj-074)、[对象 075](#obj-075)。

手算入口：在交换的两点代数中取 ρ=(1/3,2/3)、σ=(2/3,1/3)，后验坐标为 1/3、2/3；f(x)=x log x 时可先手算两点成本，再按 Family 的矩条件组织测度。

总函数与维数陷阱：保留 universe、CompleteSpace、star 结构及 M 的全部假设；代价可为 +∞，排除的是 ⊥。f 仅在 Ioi 0 凸；端点用闭透视定义，不随意取 log≤0 或 0·∞。

允许表述与严禁夸大：允许：给定完整复内积空间 H 上的具体 von Neumann 代数 M，ρ、σ 为正的连续线性泛函且 ρ+σ 序正规，f 在正半轴凸时，存在 Family 和 L¹ 逆测试达到 EReal 下确界，并有签名所列正规正映射实现。严禁：把扩展值可达说成必有有限散度、有限个原子或有效求解算法。

### 4.I.2 Bures–Wasserstein 重心的对偶证书

主配：`appendix-i.md`；环境：`#thm-appi-bures-dual-barycenter`；引用：`lean="D5/S3/Quantum/Matrix/BuresWassersteinTransport.finite_barycenter_of_dual"`。

标题：`zh=Bures–Wasserstein 重心的对偶证书`；`en=Dual Certificate for a Bures–Wasserstein Barycenter`。

源定位：`D5/S3/Quantum/Matrix/BuresWassersteinTransport.lean:41`；模块摘要：`sha256:f251722bf20e2a48a7c1c20d4b0e66f72f46ed81f918482d6b78463a545292a2`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Matrix/BuresWassersteinTransport.lean.json`；全名：`D5.S3.Quantum.Matrix.BuresWassersteinTransport.finite_barycenter_of_dual`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
noncomputable section
open Matrix
open scoped MatrixOrder ComplexOrder
open D5.S3.Quantum.Matrix.HwangKimNearOrderRefutation
open D5.S3.Quantum.Foundation.FiniteTraceDistance (traceNorm)
open private fidelity_young_rigid fidelity_transport bures_sq
  from D5.S3.Quantum.Matrix.HwangKimNearOrderRefutation
namespace D5.S3.Quantum.Matrix.BuresWassersteinTransport
theorem finite_barycenter_of_dual {m n : ℕ} (w : Fin n → ℝ)
    (A T : Fin n → Matrix (Fin m) (Fin m) ℂ)
    {W : Matrix (Fin m) (Fin m) ℂ}
    (hw : ∀ j, 0 < w j) (hws : ∑ j, w j = 1)
    (hA : ∀ j, (A j).PosDef) (hW : W.PosDef)
    (hT : ∀ j, (T j).PosDef)
    (htransport : ∀ j, T j * W * T j = A j)
    (hbalance : ∑ j, w j • T j = 1) :
    (∀ X : Matrix (Fin m) (Fin m) ℂ, X.PosDef →
      (∑ j, w j * buresWassersteinDistance W (A j) ^ 2) ≤
        ∑ j, w j * buresWassersteinDistance X (A j) ^ 2) ∧
    (∀ X : Matrix (Fin m) (Fin m) ℂ, X.PosDef →
      (((∑ j, w j * buresWassersteinDistance X (A j) ^ 2) ≤
        ∑ j, w j * buresWassersteinDistance W (A j) ^ 2) ↔ X = W)) ∧
    wassersteinBarycenter w A = W
```

对象定义：[对象 152](#obj-152)、[对象 153](#obj-153)、[对象 154](#obj-154)。

手算入口：取一维 A₁=1,A₂=9、w₁=w₂=1/2；W=4，T₁=1/2,T₂=3/2，满足 TⱼWTⱼ=Aⱼ 与平均 T=1。距离平方的加权和在 W=4 取最小值 1。

总函数与维数陷阱：所有 PosDef 条件保留；矩阵逆、平方根与重心选择都是总函数，退化输入不继承此最优化语义。m,n 可零的形式边界由前提管束。

允许表述与严禁夸大：允许：严格正权、正定矩阵和给定运输平衡证书推出正定域内唯一最小化及定义的重心等式。严禁：无证书的存在算法、奇异半正定边界的无条件唯一性。

### 4.I.3 条件子熵与猜测概率的界

主配：`appendix-i.md`；环境：`#thm-appi-subentropy-guessing`；引用：`lean="D5/S3/Quantum/Subentropy/POVMGram.cq_conditional_subentropy_guessing"`。

标题：`zh=条件子熵与猜测概率的界`；`en=Conditional Subentropy and Guessing-Probability Bounds`。

源定位：`D5/S3/Quantum/Subentropy/POVMGram.lean:223`；模块摘要：`sha256:446a6e6924249aa0a4b61bec8d29f4b5a16a76547c60c1faa9456be7e32c17e5`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Subentropy/POVMGram.lean.json`；全名：`D5.S3.Quantum.Subentropy.POVMGram.cq_conditional_subentropy_guessing`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
noncomputable section
set_option autoImplicit false
set_option backward.isDefEq.respectTransparency false
open Matrix
open scoped BigOperators ComplexOrder MatrixOrder CStarAlgebra
namespace D5.S3.Quantum.Subentropy.POVMGram
open _root_.D5.S3.Quantum.Foundation.FiniteStateChannel
open _root_.D5.S3.Quantum.Information.PartialTraceMutualInformation
open _root_.D5.S3.Quantum.Subentropy.ClassicalQuantumGram
open _root_.D5.S3.Quantum.Subentropy.GuessingProbability
open _root_.D5.S3.Quantum.Subentropy.Basic
open _root_.D5.S3.Quantum.Subentropy.PinchingGap
variable {X B : Type*} [Fintype X] [DecidableEq X] [Fintype B] [DecidableEq B]
theorem cq_conditional_subentropy_guessing
    (p : X → ℝ) (hp : ∀ x, 0 ≤ p x) (hs : ∑ x, p x = 1)
    (ρ : X → DensityState B) :
    conditionalSubentropy p hp hs ρ ≤ 1 - pGuess p ρ ∧
      1 - pGuess p ρ ≤ -Real.log (pGuess p ρ)
```

对象定义：[对象 076](#obj-076)、[对象 104](#obj-104)、[对象 113](#obj-113)、[对象 114](#obj-114)、[对象 115](#obj-115)、[对象 116](#obj-116)、[对象 213](#obj-213)、[对象 214](#obj-214)、[对象 212](#obj-212)、[对象 215](#obj-215)、[对象 218](#obj-218)、[对象 216](#obj-216)、[对象 217](#obj-217)。

手算入口：等概率两标签、互相正交纯态时 pGuess=1，条件子熵为 0，界成为 0≤0≤0；标签态完全相同时 pGuess=1/2，右端界为 1/2≤log 2。

总函数与维数陷阱：保留 X、B 的 Fintype、Nonempty、DecidableEq。pGuess 定义为 sSup，需要已证明 0<pGuess≤1 才能按实对数解释；matrixSubentropy 采用积分定义，重根不能硬套分母差公式。

允许表述与严禁夸大：允许：有限经典量子系综的条件子熵≤1−pGuess≤−log pGuess。严禁：将子熵替换为 von Neumann 条件熵，或宣称一般强次可加性。

### 4.I.4 投影支撑 Kraus 族的量子通道补全

主配：`appendix-i.md`；环境：`#thm-appi-kraus-channel-completion`；引用：`lean="D5/S3/Quantum/Recovery/KrausCompletion.complete_quantum_channel"`。

标题：`zh=投影支撑 Kraus 族的量子通道补全`；`en=Quantum-Channel Completion of a Projection-Supported Kraus Family`。

源定位：`D5/S3/Quantum/Recovery/KrausCompletion.lean:90`；模块摘要：`sha256:2909ef65010735ed4ca29ba011f64369fe2438d906d77a2deab5a2e1fba79a09`。

冻结路径：`Golden/Frozen/state/D5/S3/Quantum/Recovery/KrausCompletion.lean.json`；全名：`D5.S3.Quantum.Recovery.KrausCompletion.complete_quantum_channel`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
noncomputable section
open scoped Matrix BigOperators
namespace D5.S3.Quantum.Recovery.KrausCompletion
set_option autoImplicit false
set_option relaxedAutoImplicit false
open D5.S3.Quantum.Foundation.FiniteKrausChannel
open D5.S3.Quantum.Foundation.FiniteStateChannel
open D5.S3.Quantum.Reduction.IsometricCompression
variable {a b c s : Type*}
  [Fintype a] [DecidableEq a] [Fintype b] [DecidableEq b]
  [Fintype c] [DecidableEq c] [Fintype s]
theorem complete_quantum_channel (K : s → Matrix b a ℂ) (P : Matrix a a ℂ)
    (v : b) (hP : Pᴴ = P) (hPP : P * P = P)
    (hK : (∑ i, (K i)ᴴ * K i) = P) :
    ∃ channel : QuantumChannel a b, ∀ X : Matrix a a ℂ,
      CStarMatrix.ofMatrix.symm
        (channel.toCompletelyPositiveMap (CStarMatrix.ofMatrix X)) =
      (∑ i, K i * X * (K i)ᴴ) +
        Matrix.trace ((1 - P) * X) • Matrix.single v v (1 : ℂ)
```

对象定义：[对象 105](#obj-105)。

手算入口：取 P=diag(1,0)、K=P、v=0；补全通道将 X 的右下角质量重置到 |0⟩，对 X=diag(1/3,2/3) 输出 diag(1,0)。

总函数与维数陷阱：trace((1−P)X) 为复数；对任意 X 公式成立，对密度态才有概率解释。v:b 是显式重置输出，保证 b 非空。有限维指标与外层假设不可删。

允许表述与严禁夸大：允许：∑K* K=P 且 P 为自伴投影时，以丢失质量重置项构成迹保持完全正映射。严禁：说此补全本身逆转原噪声或保留所有输入信息。

### 4.I.5 可分锥最近点的规范残差见证

主配：`appendix-i.md`；环境：`#thm-appi-separable-residual-witness`；引用：`lean="D5/S3/Resource/SeparableConeResidualWitness.separable_cone_residual_witness"`。

标题：`zh=可分锥最近点的规范残差见证`；`en=Canonical Residual Witness of the Nearest Separable Cone Point`。

源定位：`D5/S3/Resource/SeparableConeResidualWitness.lean:259`；模块摘要：`sha256:39bcfa26c19a9b2e02629b0d2cfac639d73a751e262b2e279fdc6550c39d3fdf`。

冻结路径：`Golden/Frozen/state/D5/S3/Resource/SeparableConeResidualWitness.lean.json`；全名：`D5.S3.Resource.SeparableConeResidualWitness.separable_cone_residual_witness`；`kind=theorem`、`is_private=False`。

原始语境与完整声明头如下；仅略去证明体。语境命令按源码中仍生效的区段提取，重复的 `open` 沿原文保留，临时 `in` 命令只属于其紧随的声明。此代码为源码摘录，不声称它本身是不带导入的独立文件。

```lean
namespace D5.S3.Resource.SeparableConeResidualWitness
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness (separableCone_zero separableCone_add separableCone_smul)
open D5.S3.Resource.SeparableConeClosed (isClosed_separableCone)
open D5.S3.Observer.Separation.ConeResidualWitness
open D5.S3.Observer.Separation.MoreauDecomposition
open scoped RealInnerProductSpace Kronecker ComplexOrder
noncomputable section
variable {m n : ℕ}
theorem separable_cone_residual_witness {R : CompositeMatrix m n} (hR : R.PosSemidef) :
    let P := nearestSeparable R
    let r := R - P
    let W := P - R
    separableCone P ∧ R = P + r ∧ W.IsHermitian ∧ blockPositive W ∧
      pairing P r = 0 ∧
      (∀ S, separableCone S → pairing S r ≤ 0 ∧ 0 ≤ pairing S W) ∧
      pairing R W = -pairing r r ∧ pairing R W = -‖entryEquiv r‖ ^ 2 ∧
      (¬separableCone R → pairing R W < 0)
```

对象定义：[对象 291](#obj-291)、[对象 292](#obj-292)、[对象 294](#obj-294)、[对象 293](#obj-293)、[对象 295](#obj-295)、[对象 302](#obj-302)、[对象 296](#obj-296)、[对象 299](#obj-299)、[对象 298](#obj-298)、[对象 297](#obj-297)、[对象 303](#obj-303)、[对象 301](#obj-301)、[对象 300](#obj-300)。

手算入口：取双比特 Bell 投影 R=|Φ⁺⟩⟨Φ⁺|，其中 |Φ⁺⟩=(|00⟩+|11⟩)/√2。手算候选 P=R/2+I₄/4、r=R/2−I₄/4、W=−r，得 Tr(Pr)=0、Tr(RW)=−1/4=−‖r‖²_HS。P 等于六个乘积态投影之和的 1/4：X 与 Z 轴取同号，Y 轴取异号；因此 P 在可分锥中。归一乘积向量对 R 的期望至多 1/2，故 W 块正。由正交分解的变分条件可检验 P 确为最近点。这里 Tr(P)=3/2，特别展示锥最近点可以不归一；本算例是教学核算，不另计冻结声明。

总函数与维数陷阱：m、n 是任意自然数，允许零维；这是有限复矩阵空间。距离采用 entryEquiv 的实 Hilbert–Schmidt 坐标范数，不是默认 Matrix 范数；pairing 是 Tr(SᴴW) 的实部，不可删去共轭转置或 .re。输入须正半定才有此处的 Hermitian 见证；严格负值还需非可分。nearestSeparable 由唯一最小点选择，未给出可执行算法。可分锥允许 k=0，不要求迹为 1；无除零、Real.log 或无 Summable 的 tsum。

允许表述与严禁夸大：允许：对任意有限复正半定 R，最近可分锥点 P 的负残差 W=P−R 块正，对所有可分 S 配对非负，且 ⟨R,W⟩=−‖R−P‖²_HS；非可分时严格为负。严禁：将最近锥点称为最近归一可分态，将存在性称为数值算法，或把该分离对偶证书称为任意量子通道的近似恢复定理。与前一条 Kraus 补全之间是“可实现构造与不可达证书”的阅读联系，未证明二者互为对偶优化问题。

## 5. 签名所用自定义对象的逐字源码

下列定义按来源模块与行号排列。每项保留自身命名空间、作用域变量、打开项、局部实例与完整定义体；私有辅助定义只用于解释公开对象，不成为候选 GID，也不另分配主配环境。标准库的 `Matrix`、`PointedCone`、`IsStarProjection`、`VonNeumannAlgebra`、`StrongDual`、`FiniteDimensional` 等保留其原类型，不在此复制标准库。对象定义中的辅助定理调用也不构成新增推荐引用。

这些摘录均从上述提交的归档提取，并核对来源模块的 Git blob 身份；不能用工作区中的同名文件代替。不同模块的同名定义按全名和作用域区分，禁止只凭 `claim`、`P2`、`DensityState`、`cone` 或 `phase` 的短名猜测。

<a id="obj-001"></a>

### 对象 001 `D5.S0.Observation.BoundedPowerTraceCRTRecovery.crtImage`

来源：`D5/S0/Observation/BoundedPowerTraceCRTRecovery.lean:33`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S0.Observation.BoundedPowerTraceCRTRecovery
def crtImage (M : ℕ) (x : ℤ) : ZMod M :=
  x
```

<a id="obj-002"></a>

### 对象 002 `D5.S0.Observation.BoundedPowerTraceCRTRecovery.powerTrace`

来源：`D5/S0/Observation/BoundedPowerTraceCRTRecovery.lean:37`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S0.Observation.BoundedPowerTraceCRTRecovery
def powerTrace {d : Type*} [Fintype d] [DecidableEq d]
    (A : Matrix d d ℤ) (j : ℕ) : ℤ :=
  Matrix.trace (A ^ j)
```

<a id="obj-003"></a>

### 对象 003 `D5.S1.Digit.PrimeExponentTable`

来源：`D5/S1/Digit/PrimeAxisEncoding.lean:84`。

```lean
namespace D5.S1.Digit
open D5.S0.Conventions
abbrev PrimeExponentTable :=
  {f : ℕ →₀ ℕ // ∀ p ∈ f.support, Nat.Prime p}
```

<a id="obj-004"></a>

### 对象 004 `D5.S1.Dynamics.UniversalSolenoid`

来源：`D5/S1/Dynamics/UniversalSolenoid.lean:16`。

```lean
namespace D5.S1.Dynamics
abbrev UniversalSolenoid :=
  {theta : ℕ+ → AddCircle (1 : ℝ) //
    ∀ m n : ℕ+, n.1 • theta ⟨m.1 * n.1, Nat.mul_pos m.2 n.2⟩ = theta m}
```

<a id="obj-005"></a>

### 对象 005 `D5.S1.Dynamics.UniversalSolenoid.projection`

来源：`D5/S1/Dynamics/UniversalSolenoid.lean:65`。

```lean
namespace D5.S1.Dynamics
namespace UniversalSolenoid
def projection : UniversalSolenoid →+ AddCircle (1 : ℝ) where
  toFun theta := theta.1 ⟨1, Nat.zero_lt_one⟩
  map_zero' := rfl
  map_add' _ _ := rfl
```

<a id="obj-006"></a>

### 对象 006 `D5.S1.Dynamics.UniversalSolenoid.realFlow`

来源：`D5/S1/Dynamics/UniversalSolenoid.lean:76`。

```lean
namespace D5.S1.Dynamics
namespace UniversalSolenoid
noncomputable def realFlow (t : ℝ) : UniversalSolenoid :=
  ⟨fun m => ((t / m.1 : ℝ) : AddCircle (1 : ℝ)), by
    intro m n
    rw [← AddCircle.coe_nsmul]
    apply congrArg (fun x : ℝ => (x : AddCircle (1 : ℝ)))
    change n.1 • (t / ((m.1 * n.1 : ℕ) : ℝ)) = t / m.1
    rw [nsmul_eq_mul]
    push_cast
    field_simp [Nat.ne_of_gt m.2, Nat.ne_of_gt n.2]⟩
```

<a id="obj-007"></a>

### 对象 007 `D5.S1.Ledger.GenerationArrowOfTime.PrimeExponent`

来源：`D5/S1/Ledger/GenerationArrowOfTime.lean:30`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S1.Ledger.GenerationArrowOfTime
abbrev PrimeExponent := Nat.Primes →₀ ℕ
```

<a id="obj-008"></a>

### 对象 008 `D5.S1.Ledger.GenerationArrowOfTime.length`

来源：`D5/S1/Ledger/GenerationArrowOfTime.lean:33`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S1.Ledger.GenerationArrowOfTime
noncomputable def length (a : PrimeExponent) : ℝ :=
  a.sum fun p exponent => (exponent : ℝ) * Real.log p.1
```

<a id="obj-009"></a>

### 对象 009 `D5.S1.Ledger.GenerationArrowOfTime.generatedNumber`

来源：`D5/S1/Ledger/GenerationArrowOfTime.lean:37`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S1.Ledger.GenerationArrowOfTime
def generatedNumber (a : PrimeExponent) : ℕ :=
  a.prod fun p exponent => p.1 ^ exponent
```

<a id="obj-010"></a>

### 对象 010 `D5.S1.Solenoid.ComplexPowerSolenoidDecomposition.oneIndex`

来源：`D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.lean:31`。

```lean
namespace D5.S1.Solenoid.ComplexPowerSolenoidDecomposition
open D5.S1.Dynamics
private def oneIndex : ℕ+ := ⟨1, Nat.zero_lt_one⟩
```

<a id="obj-011"></a>

### 对象 011 `D5.S1.Solenoid.ComplexPowerSolenoidDecomposition.productIndex`

来源：`D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.lean:33`。

```lean
namespace D5.S1.Solenoid.ComplexPowerSolenoidDecomposition
open D5.S1.Dynamics
private def productIndex (m n : ℕ+) : ℕ+ :=
  ⟨m.1 * n.1, Nat.mul_pos m.2 n.2⟩
```

<a id="obj-012"></a>

### 对象 012 `D5.S1.Solenoid.ComplexPowerSolenoidDecomposition.ComplexPowerThread`

来源：`D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.lean:37`。

```lean
namespace D5.S1.Solenoid.ComplexPowerSolenoidDecomposition
open D5.S1.Dynamics
structure ComplexPowerThread where
  coord : ℕ+ → ℂ
  coord_ne_zero : ∀ m, coord m ≠ 0
  pow_compatible : ∀ m n, coord (productIndex m n) ^ n.1 = coord m
```

<a id="obj-013"></a>

### 对象 013 `D5.S1.Solenoid.ComplexPowerSolenoidDecomposition.logarithmicCharge`

来源：`D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.lean:50`。

```lean
namespace D5.S1.Solenoid.ComplexPowerSolenoidDecomposition
open D5.S1.Dynamics
noncomputable def logarithmicCharge (z : ComplexPowerThread) : ℝ :=
  Real.log ‖z.coord oneIndex‖
```

<a id="obj-014"></a>

### 对象 014 `D5.S3.Analytic.Convexity.CurvatureHingeRepresentation.Positive`

来源：`D5/S3/Analytic/Convexity/CurvatureHingeRepresentation.lean:28`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open Set Filter MeasureTheory
open scoped Topology
abbrev Positive := Ioi (0 : ℝ)
```

<a id="obj-015"></a>

### 对象 015 `D5.S3.Analytic.Convexity.CurvatureHingeRepresentation.rightDeriv`

来源：`D5/S3/Analytic/Convexity/CurvatureHingeRepresentation.lean:31`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open Set Filter MeasureTheory
open scoped Topology
def rightDeriv (f : ℝ → ℝ) (x : ℝ) : ℝ := derivWithin f (Ioi x) x
```

<a id="obj-016"></a>

### 对象 016 `D5.S3.Analytic.Convexity.CurvatureHingeRepresentation.curvatureDistribution`

来源：`D5/S3/Analytic/Convexity/CurvatureHingeRepresentation.lean:87`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open Set Filter MeasureTheory
open scoped Topology
variable {f : ℝ → ℝ}
def curvatureDistribution (hf : ConvexOn ℝ (Ioi 0) f) : StieltjesFunction Positive where
  toFun x := rightDeriv f x
  mono' x y hxy := rightDeriv_monotoneOn hf x.property y.property hxy
  right_continuous' x := (rightDeriv_right_continuous hf x.property).comp
    continuous_subtype_val.continuousWithinAt (fun _ hy => hy)
```

<a id="obj-017"></a>

### 对象 017 `D5.S3.Analytic.Convexity.CurvatureHingeRepresentation.curvature`

来源：`D5/S3/Analytic/Convexity/CurvatureHingeRepresentation.lean:94`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open Set Filter MeasureTheory
open scoped Topology
variable {f : ℝ → ℝ}
def curvature (hf : ConvexOn ℝ (Ioi 0) f) : Measure Positive :=
  (curvatureDistribution hf).measure
```

<a id="obj-018"></a>

### 对象 018 `D5.S3.Analytic.Convexity.CurvatureHingeRepresentation.one`

来源：`D5/S3/Analytic/Convexity/CurvaturePerspectiveEndpoints.lean:26`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open Set Filter MeasureTheory
open scoped Topology ENNReal
variable {f : ℝ → ℝ}
private def one : Positive := ⟨1, by norm_num⟩
```

<a id="obj-019"></a>

### 对象 019 `D5.S3.Analytic.Convexity.CurvatureHingeRepresentation.curvatureRemainder`

来源：`D5/S3/Analytic/Convexity/CurvaturePerspectiveEndpoints.lean:265`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open Set Filter MeasureTheory
open scoped Topology ENNReal
variable {f : ℝ → ℝ}
def curvatureRemainder (hf : ConvexOn ℝ (Ioi 0) f) (u v : ℝ) : ℝ≥0∞ :=
  (∫⁻ t in Iic one, ENNReal.ofReal ((t : ℝ) * v - u) ∂curvature hf) +
    ∫⁻ t in Ioi one, ENNReal.ofReal (u - (t : ℝ) * v) ∂curvature hf
```

<a id="obj-020"></a>

### 对象 020 `D5.S3.Analytic.Convexity.CurvatureHingeRepresentation.closedPerspectiveCost`

来源：`D5/S3/Analytic/Convexity/CurvaturePerspectiveEndpoints.lean:394`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open Set Filter MeasureTheory
open scoped Topology ENNReal
variable {f : ℝ → ℝ}
def closedPerspectiveCost (hf : ConvexOn ℝ (Ioi 0) f)
    {α : Type*} [MeasurableSpace α] (ν : Measure α) (p q : α → ℝ) : EReal :=
  ((∫ x, f 1 * q x + rightDeriv f 1 * (p x - q x) ∂ν : ℝ) : EReal) +
    (∫⁻ x, curvatureRemainder hf (p x) (q x) ∂ν : ℝ≥0∞)
```

<a id="obj-021"></a>

### 对象 021 `D5.S3.Analytic.PrimeProducts.GlobalPrimeExponentRealizability.geometricPrimeMass`

来源：`D5/S3/Analytic/PrimeProducts/GlobalPrimeExponentRealizability.lean:47`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Analytic.PrimeProducts.GlobalPrimeExponentRealizability
open scoped ENNReal
open MeasureTheory ProbabilityTheory
open D5.S3.Analytic.PrimeProducts.FiniteMarginalGlobalSupportContrast
open D5.S3.Analytic.ZetaGibbs
open D5.S3.Analytic.Zeta.PrimeExponentLaw
open D5.S3.Analytic.Zeta.ZetaEntropy
open D5.S3.Analytic.Zeta.ZetaPrimeIndependence
open D5.S3.Analytic.Zeta.ZetaRenyiEntropy
noncomputable section
def geometricPrimeMass (s : Real) (p : Nat.Primes) (k : Nat) : ENNReal :=
  ENNReal.ofReal
    ((1 - (p.1 : Real) ^ (-s)) * (p.1 : Real) ^ (-(k : Real) * s))
```

<a id="obj-022"></a>

### 对象 022 `D5.S3.Analytic.PrimeProducts.GlobalPrimeExponentRealizability.primeExponentCode`

来源：`D5/S3/Analytic/PrimeProducts/GlobalPrimeExponentRealizability.lean:52`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Analytic.PrimeProducts.GlobalPrimeExponentRealizability
open scoped ENNReal
open MeasureTheory ProbabilityTheory
open D5.S3.Analytic.PrimeProducts.FiniteMarginalGlobalSupportContrast
open D5.S3.Analytic.ZetaGibbs
open D5.S3.Analytic.Zeta.PrimeExponentLaw
open D5.S3.Analytic.Zeta.ZetaEntropy
open D5.S3.Analytic.Zeta.ZetaPrimeIndependence
open D5.S3.Analytic.Zeta.ZetaRenyiEntropy
noncomputable section
def primeExponentCode (n : Nat) (p : Nat.Primes) : Nat :=
  n.factorization p.1
```

<a id="obj-023"></a>

### 对象 023 `D5.S3.Analytic.PrimeProducts.GlobalPrimeExponentRealizability.RealizesPrimeExponentLaw`

来源：`D5/S3/Analytic/PrimeProducts/GlobalPrimeExponentRealizability.lean:56`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Analytic.PrimeProducts.GlobalPrimeExponentRealizability
open scoped ENNReal
open MeasureTheory ProbabilityTheory
open D5.S3.Analytic.PrimeProducts.FiniteMarginalGlobalSupportContrast
open D5.S3.Analytic.ZetaGibbs
open D5.S3.Analytic.Zeta.PrimeExponentLaw
open D5.S3.Analytic.Zeta.ZetaEntropy
open D5.S3.Analytic.Zeta.ZetaPrimeIndependence
open D5.S3.Analytic.Zeta.ZetaRenyiEntropy
noncomputable section
def RealizesPrimeExponentLaw (s : Real) (q : PMF Nat) : Prop :=
  q 0 = 0 ∧
    iIndepFun (fun p : Nat.Primes => fun n : Nat => primeExponentCode n p)
      q.toMeasure ∧
    ∀ (p : Nat.Primes) (k : Nat),
      q.toMeasure {n : Nat | primeExponentCode n p = k} =
        geometricPrimeMass s p k
```

<a id="obj-024"></a>

### 对象 024 `D5.S3.CompletionDynamics.GoldenMobius.GoldenMobiusMap.goldenProjectiveMultiplier`

来源：`D5/S3/CompletionDynamics/GoldenMobius/GoldenMobiusMap.lean:32`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.CompletionDynamics.GoldenMobius.GoldenMobiusMap
open scoped goldenRatio
def goldenProjectiveMultiplier : ℝ :=
  -(Real.goldenRatio⁻¹) ^ 2
```

<a id="obj-025"></a>

### 对象 025 `D5.S3.ConceptDynamics.ConceptFiberDecomposition.Concept`

来源：`D5/S3/ConceptDynamics/ConceptFiberDecomposition.lean:27`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.ConceptDynamics.ConceptFiberDecomposition
def Concept (X B : Type _) := X → B
```

<a id="obj-026"></a>

### 对象 026 `D5.S3.ConceptDynamics.ConceptJoinUniversal.Refines`

来源：`D5/S3/ConceptDynamics/ConceptJoinUniversal.lean:28`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.ConceptDynamics.ConceptJoinUniversal
open D5.S3.ConceptDynamics.ConceptFiberDecomposition
def Refines {X C D : Type _} (q_C : Concept X C) (q_D : Concept X D) : Prop :=
  ∃ factor : D → C, q_C = factor ∘ q_D
```

<a id="obj-027"></a>

### 对象 027 `D5.S3.ConceptDynamics.ObservationOrder.TypedPrimeLanguageHierarchy.qubitPrimeValuation`

来源：`D5/S3/ConceptDynamics/ObservationOrder/TypedPrimeLanguageHierarchy.lean:109`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.ConceptDynamics.ObservationOrder.TypedPrimeLanguageHierarchy
open D5.S3.ConceptDynamics.ConceptFiberDecomposition
open D5.S3.ConceptDynamics.ConceptJoinUniversal
open D5.S3.Factorization.PrimePowers.PrimeExponentLanguageComplete
open D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption
open D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
open D5.S3.Quantum.QubitWitnesses
open UniqueFactorizationMonoid
open scoped CStarAlgebra ComplexOrder MatrixOrder
def qubitPrimeValuation : Fin 2 → Unit → Fin 2 :=
  fun i _ => i
```

<a id="obj-028"></a>

### 对象 028 `D5.S3.ConceptDynamics.ObservationOrder.TypedPrimeLanguageHierarchy.qubitPrimeDiagonalLanguage`

来源：`D5/S3/ConceptDynamics/ObservationOrder/TypedPrimeLanguageHierarchy.lean:113`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.ConceptDynamics.ObservationOrder.TypedPrimeLanguageHierarchy
open D5.S3.ConceptDynamics.ConceptFiberDecomposition
open D5.S3.ConceptDynamics.ConceptJoinUniversal
open D5.S3.Factorization.PrimePowers.PrimeExponentLanguageComplete
open D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption
open D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
open D5.S3.Quantum.QubitWitnesses
open UniqueFactorizationMonoid
open scoped CStarAlgebra ComplexOrder MatrixOrder
def qubitPrimeDiagonalLanguage (rho : DensityState (Fin 2)) : QubitMatrix :=
  primeDephasing ({()} : Finset Unit) qubitPrimeValuation rho.1
```

<a id="obj-029"></a>

### 对象 029 `D5.S3.ConceptDynamics.ObservationOrder.TypedPrimeLanguageHierarchy.qubitOperatorLanguage`

来源：`D5/S3/ConceptDynamics/ObservationOrder/TypedPrimeLanguageHierarchy.lean:117`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.ConceptDynamics.ObservationOrder.TypedPrimeLanguageHierarchy
open D5.S3.ConceptDynamics.ConceptFiberDecomposition
open D5.S3.ConceptDynamics.ConceptJoinUniversal
open D5.S3.Factorization.PrimePowers.PrimeExponentLanguageComplete
open D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption
open D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
open D5.S3.Quantum.QubitWitnesses
open UniqueFactorizationMonoid
open scoped CStarAlgebra ComplexOrder MatrixOrder
def qubitOperatorLanguage (rho : DensityState (Fin 2)) : QubitMatrix :=
  rho.1
```

<a id="obj-030"></a>

### 对象 030 `D5.S3.ConceptDynamics.ObservationOrder.TypedPrimeLanguageHierarchy.relativePhaseDensityWitness`

来源：`D5/S3/ConceptDynamics/ObservationOrder/TypedPrimeLanguageHierarchy.lean:175`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.ConceptDynamics.ObservationOrder.TypedPrimeLanguageHierarchy
open D5.S3.ConceptDynamics.ConceptFiberDecomposition
open D5.S3.ConceptDynamics.ConceptJoinUniversal
open D5.S3.Factorization.PrimePowers.PrimeExponentLanguageComplete
open D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption
open D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
open D5.S3.Quantum.QubitWitnesses
open UniqueFactorizationMonoid
open scoped CStarAlgebra ComplexOrder MatrixOrder
def relativePhaseDensityWitness : DensityState (Fin 2) × DensityState (Fin 2) := by
  refine (⟨CStarMatrix.ofMatrixStarAlgEquiv equalSuperpositionDensity, ?_, ?_⟩,
    ⟨CStarMatrix.ofMatrixStarAlgEquiv
      (qubitZ * equalSuperpositionDensity * qubitZ), ?_, ?_⟩)
  · exact map_nonneg CStarMatrix.ofMatrixStarAlgEquiv equal_superposition_posSemidef.nonneg
  · change Matrix.trace equalSuperpositionDensity = 1
    norm_num [equalSuperpositionDensity, Matrix.trace, Fin.sum_univ_two]
  · exact map_nonneg CStarMatrix.ofMatrixStarAlgEquiv phase_flip_posSemidef.nonneg
  · change Matrix.trace (qubitZ * equalSuperpositionDensity * qubitZ) = 1
    norm_num [equalSuperpositionDensity, qubitZ, Matrix.trace, Matrix.mul_apply,
      Fin.sum_univ_two]
```

<a id="obj-031"></a>

### 对象 031 `D5.S3.Factorization.ExponentCoordinates.PrimeExponentBijection.primeExponentLanguageEquiv`

来源：`D5/S3/Factorization/ExponentCoordinates/PrimeExponentBijection.lean:31`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Factorization.ExponentCoordinates.PrimeExponentBijection
open D5.S1.Digit
open D5.S3.Factorization.PrimePowers.PrimeExponentLanguageComplete
def primeExponentLanguageEquiv : ℕ+ ≃ PrimeExponentTable :=
  Nat.factorizationEquiv
```

<a id="obj-032"></a>

### 对象 032 `D5.S3.Fourier.CharacterSelection.BinaryCharacterCodeDuality.standardCoordinatePairing`

来源：`D5/S3/Fourier/CharacterSelection/BinaryCharacterCodeDuality.lean:29`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Fourier.CharacterSelection.BinaryCharacterCodeDuality
open Matrix Module
def standardCoordinatePairing (K I : Type*) [CommSemiring K] [Fintype I] :
    LinearMap.BilinForm K (I -> K) :=
  dotProductBilin K K
```

<a id="obj-033"></a>

### 对象 033 `D5.S3.Fourier.CharacterSelection.BinaryCharacterCodeDuality.characterOrthogonalComplement`

来源：`D5/S3/Fourier/CharacterSelection/BinaryCharacterCodeDuality.lean:50`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Fourier.CharacterSelection.BinaryCharacterCodeDuality
open Matrix Module
def characterOrthogonalComplement
    (K : Type*) [CommSemiring K]
    {I : Type*} [Fintype I]
    (space : Submodule K (I -> K)) : Submodule K (I -> K) :=
  (standardCoordinatePairing K I).orthogonal space
```

<a id="obj-034"></a>

### 对象 034 `D5.S3.ObserverMemory.Prediction.ConditionalEntropyStability.futureReadoutWord`

来源：`D5/S3/ObserverMemory/Prediction/ConditionalEntropyStability.lean:34`。

```lean
namespace D5.S3.ObserverMemory.Prediction.ConditionalEntropyStability
open D5.S3.Divergence.ChainRule
open D5.S3.Entropy.ConditionalEntropy
open D5.S3.Entropy.ConditionalEntropyEquality
open D5.S3.Entropy.Forgetting.CapacityMonotone
def futureReadoutWord {Y O : Type*} (tau : Y -> Y) (q : Y -> O)
    (m : Nat) (y : Y) : Fin (m + 1) -> O :=
  fun k => q ((tau^[k]) y)
```

<a id="obj-035"></a>

### 对象 035 `D5.S3.ObserverMemory.Prediction.ItineraryCompletion.completeItinerary`

来源：`D5/S3/ObserverMemory/Prediction/ItineraryCompletion.lean:31`。

```lean
namespace D5.S3.ObserverMemory.Prediction.ItineraryCompletion
open D5.S3.ObserverMemory.Prediction.ConditionalEntropyStability
def completeItinerary {Y O : Type*} (tau : Y -> Y) (q : Y -> O)
    (y : Y) : Nat -> O :=
  fun n => q ((tau^[n]) y)
```

<a id="obj-036"></a>

### 对象 036 `D5.S3.ObserverMemory.Prediction.ItineraryCompletion.distinguishingTime`

来源：`D5/S3/ObserverMemory/Prediction/ItineraryCompletion.lean:69`。

```lean
namespace D5.S3.ObserverMemory.Prediction.ItineraryCompletion
open D5.S3.ObserverMemory.Prediction.ConditionalEntropyStability
noncomputable def distinguishingTime {Y O : Type*}
    (tau : Y -> Y) (q : Y -> O) (y y' : Y) : Nat := by
  classical
  exact if h : exists n, completeItinerary tau q y n ≠
    completeItinerary tau q y' n then Classical.choose h else 0
```

<a id="obj-037"></a>

### 对象 037 `D5.S3.ObserverMemory.Prediction.ItineraryCompletion.completionDepth`

来源：`D5/S3/ObserverMemory/Prediction/ItineraryCompletion.lean:86`。

```lean
namespace D5.S3.ObserverMemory.Prediction.ItineraryCompletion
open D5.S3.ObserverMemory.Prediction.ConditionalEntropyStability
noncomputable def completionDepth {Y O : Type*} [Fintype Y]
    (tau : Y -> Y) (q : Y -> O) : Nat :=
  Finset.univ.sup fun pair : Y × Y =>
    distinguishingTime tau q pair.1 pair.2
```

<a id="obj-038"></a>

### 对象 038 `D5.S3.ObserverMemory.Refinement.PredictionCompletion.CompletedState`

来源：`D5/S3/ObserverMemory/Refinement/PredictionCompletion.lean:21`。

```lean
namespace D5.S3.ObserverMemory.Refinement.PredictionCompletion
open D5.S0.Rewriting.Quotients.RelativeIdentityRefinement
open D5.S3.ObserverMemory.Prediction.ItineraryCompletion
abbrev CompletedState {Y O : Type*} (update : Y -> Y) (readout : Y -> O) :=
  Quotient (Setoid.ker (completeItinerary update readout))
```

<a id="obj-039"></a>

### 对象 039 `D5.S3.ObserverMemory.Refinement.PredictionCompletion.completionProjection`

来源：`D5/S3/ObserverMemory/Refinement/PredictionCompletion.lean:25`。

```lean
namespace D5.S3.ObserverMemory.Refinement.PredictionCompletion
open D5.S0.Rewriting.Quotients.RelativeIdentityRefinement
open D5.S3.ObserverMemory.Prediction.ItineraryCompletion
def completionProjection {Y O : Type*} (update : Y -> Y) (readout : Y -> O) :
    Y -> CompletedState update readout :=
  Quotient.mk _
```

<a id="obj-040"></a>

### 对象 040 `D5.S3.ObserverMemory.RefinementClosure.FiniteHorizonKernelRecurrence.finiteHorizonKernel`

来源：`D5/S3/ObserverMemory/RefinementClosure/FiniteHorizonKernelRecurrence.lean:29`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.ObserverMemory.RefinementClosure.FiniteHorizonKernelRecurrence
open D5.S3.ObserverMemory.Prediction.ConditionalEntropyStability
open D5.S3.ObserverMemory.Prediction.ItineraryCompletion
universe u v
abbrev finiteHorizonKernel
    {Y : Type u} {O : Type v}
    (tau : Y -> Y) (q : Y -> O) (m : Nat) : Setoid Y :=
  Setoid.ker (futureReadoutWord tau q m)
```

<a id="obj-041"></a>

### 对象 041 `D5.S3.ObserverMemory.Trajectories.CurrentReadoutRecovery.itineraryHead`

来源：`D5/S3/ObserverMemory/Trajectories/CurrentReadoutRecovery.lean:31`。

```lean
namespace D5.S3.ObserverMemory.Trajectories.CurrentReadoutRecovery
open D5.S3.ObserverMemory.Prediction.ItineraryCompletion
set_option autoImplicit false
set_option relaxedAutoImplicit false
def itineraryHead {B : Type*} (u : Nat -> B) : B := u 0
```

<a id="obj-042"></a>

### 对象 042 `D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier.goldenModalStep`

来源：`D5/S3/PrimeObserver/ProjectiveMemory/GoldenProjectiveMultiplier.lean:22`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier
open scoped goldenRatio
open D5.S3.CompletionDynamics.GoldenMobius.GoldenMobiusMap
def goldenModalStep (state : ℝ × ℝ) : ℝ × ℝ :=
  (Real.goldenRatio * state.1, Real.goldenConj * state.2)
```

<a id="obj-043"></a>

### 对象 043 `D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier.projectiveDefect`

来源：`D5/S3/PrimeObserver/ProjectiveMemory/GoldenProjectiveMultiplier.lean:26`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier
open scoped goldenRatio
open D5.S3.CompletionDynamics.GoldenMobius.GoldenMobiusMap
def projectiveDefect (state : ℝ × ℝ) : ℝ :=
  state.2 / state.1
```

<a id="obj-044"></a>

### 对象 044 `D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier.forcedProjectiveStep`

来源：`D5/S3/PrimeObserver/ProjectiveMemory/GoldenProjectiveMultiplier.lean:70`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.PrimeObserver.ProjectiveMemory.GoldenProjectiveMultiplier
open scoped goldenRatio
open D5.S3.CompletionDynamics.GoldenMobius.GoldenMobiusMap
def forcedProjectiveStep (theta forcing : ℝ) : ℝ :=
  goldenProjectiveMultiplier * theta + forcing
```

<a id="obj-045"></a>

### 对象 045 `D5.S3.Quantum.Analysis.NormalFunctionals.IsOrderNormal`

来源：`D5/S3/Quantum/Analysis/NormalFunctionals.lean:39`。

```lean
noncomputable section
open Set
open scoped ComplexOrder
namespace D5.S3.Quantum.Analysis.NormalFunctionals
variable {A : Type*} [CStarAlgebra A] [PartialOrder A]
def IsOrderNormal (φ : StrongDual ℂ A) : Prop :=
  ∀ (s : Set A) (a : A), s.Nonempty → DirectedOn (· ≤ ·) s →
    (∀ x ∈ s, 0 ≤ x) → IsLUB s a →
    ∀ ε : ℝ, 0 < ε → ∃ b ∈ s, ∀ x ∈ s, b ≤ x → ‖φ (a - x)‖ < ε
```

<a id="obj-046"></a>

### 对象 046 `D5.S3.Quantum.Analysis.NormalMomentFamily.Interval`

来源：`D5/S3/Quantum/Analysis/NormalMomentFamily.lean:43`。

```lean
noncomputable section
open Set MeasureTheory
open scoped ComplexOrder Topology CompactlySupported
namespace D5.S3.Quantum.Analysis.NormalMomentFamily
open NormalFunctionals NormalL1Realization
abbrev Interval := Set.Icc (0 : ℝ) 1
```

<a id="obj-047"></a>

### 对象 047 `D5.S3.Quantum.Analysis.NormalMomentFamily.posterior`

来源：`D5/S3/Quantum/Analysis/NormalMomentFamily.lean:46`。

```lean
noncomputable section
open Set MeasureTheory
open scoped ComplexOrder Topology CompactlySupported
namespace D5.S3.Quantum.Analysis.NormalMomentFamily
open NormalFunctionals NormalL1Realization
def posterior : C(Interval, ℂ) := ⟨fun t => (t.val : ℂ), by fun_prop⟩
```

<a id="obj-048"></a>

### 对象 048 `D5.S3.Quantum.Analysis.NormalMomentFamily.Ambient`

来源：`D5/S3/Quantum/Analysis/NormalMomentFamily.lean:51`。

```lean
noncomputable section
open Set MeasureTheory
open scoped ComplexOrder Topology CompactlySupported
namespace D5.S3.Quantum.Analysis.NormalMomentFamily
open NormalFunctionals NormalL1Realization
variable {A : Type*} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
abbrev Ambient (A : Type*) [CStarAlgebra A] := C(Interval, ℂ) → WeakDual ℂ A
```

<a id="obj-049"></a>

### 对象 049 `D5.S3.Quantum.Analysis.NormalMomentFamily.Compatible`

来源：`D5/S3/Quantum/Analysis/NormalMomentFamily.lean:54`。

```lean
noncomputable section
open Set MeasureTheory
open scoped ComplexOrder Topology CompactlySupported
namespace D5.S3.Quantum.Analysis.NormalMomentFamily
open NormalFunctionals NormalL1Realization
variable {A : Type*} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
def Compatible (ρ σ : StrongDual ℂ A) (F : Ambient A) : Prop :=
  (∀ g h a, F (g + h) a = F g a + F h a) ∧
  (∀ (z : ℂ) g a, F (z • g) a = z * F g a) ∧
  (∀ g, (∀ t, 0 ≤ g t) → ∀ a : A, 0 ≤ a → 0 ≤ F g a) ∧
  (∀ a, F 1 a = (ρ + σ) a) ∧ (∀ a, F posterior a = ρ a)
```

<a id="obj-050"></a>

### 对象 050 `D5.S3.Quantum.Analysis.NormalMomentFamily.Family`

来源：`D5/S3/Quantum/Analysis/NormalMomentFamily.lean:61`。

```lean
noncomputable section
open Set MeasureTheory
open scoped ComplexOrder Topology CompactlySupported
namespace D5.S3.Quantum.Analysis.NormalMomentFamily
open NormalFunctionals NormalL1Realization
variable {A : Type*} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
def Family (ρ σ : StrongDual ℂ A) := {F : Ambient A // Compatible ρ σ F}
```

<a id="obj-051"></a>

### 对象 051 `D5.S3.Quantum.Analysis.NormalMomentFamily.linearMap`

来源：`D5/S3/Quantum/Analysis/NormalMomentFamily.lean:79`。

```lean
noncomputable section
open Set MeasureTheory
open scoped ComplexOrder Topology CompactlySupported
namespace D5.S3.Quantum.Analysis.NormalMomentFamily
open NormalFunctionals NormalL1Realization
variable {A : Type*} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
def linearMap {ρ σ : StrongDual ℂ A} (F : Family ρ σ) :
    C(Interval, ℂ) →ₗ[ℂ] StrongDual ℂ A where
  toFun g := (F.val g).toStrongDual
  map_add' g h := by ext a; exact F.property.1 g h a
  map_smul' z g := by ext a; exact F.property.2.1 z g a
```

<a id="obj-052"></a>

### 对象 052 `D5.S3.Quantum.Analysis.NormalMomentFamily.realMap`

来源：`D5/S3/Quantum/Analysis/NormalMomentFamily.lean:98`。

```lean
noncomputable section
open Set MeasureTheory
open scoped ComplexOrder Topology CompactlySupported
namespace D5.S3.Quantum.Analysis.NormalMomentFamily
open NormalFunctionals NormalL1Realization
variable {A : Type*} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
private def realMap (u : C(Interval, ℝ)) : C(Interval, ℂ) :=
  ⟨fun t => (u t : ℂ), by fun_prop⟩
```

<a id="obj-053"></a>

### 对象 053 `D5.S3.Quantum.Analysis.NormalMomentFamily.massFunctional`

来源：`D5/S3/Quantum/Analysis/NormalMomentFamily.lean:204`。

```lean
noncomputable section
open Set MeasureTheory
open scoped ComplexOrder Topology CompactlySupported
namespace D5.S3.Quantum.Analysis.NormalMomentFamily
open NormalFunctionals NormalL1Realization
variable {A : Type*} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
private def massFunctional {ρ σ : StrongDual ℂ A} (F : Family ρ σ) :
    C_c(Interval, ℝ) →ₚ[ℝ] ℝ :=
  PositiveLinearMap.mk₀
    { toFun f := (linearMap F (realMap f.toContinuousMap) 1).re
      map_add' f g := by
        have he : realMap (f + g).toContinuousMap =
            realMap f.toContinuousMap + realMap g.toContinuousMap := by ext x; simp [realMap]
        simp only [he, map_add, add_apply, Complex.add_re]
      map_smul' r f := by
        have he : realMap (r • f).toContinuousMap =
            (r : ℂ) • realMap f.toContinuousMap := by ext x; simp [realMap]
        simp only [he, map_smul, smul_apply, smul_eq_mul,
          Complex.mul_re, Complex.ofReal_re, Complex.ofReal_im, zero_mul, sub_zero,
          RingHom.id_apply] }
    (by
      intro f hf
      exact (Complex.nonneg_iff.mp (positive F _ (fun x => by
        change (0 : ℂ) ≤ (f x : ℂ)
        exact_mod_cast hf x) 1 zero_le_one)).1)
```

<a id="obj-054"></a>

### 对象 054 `D5.S3.Quantum.Analysis.NormalMomentFamily.scalarMeasure`

来源：`D5/S3/Quantum/Analysis/NormalMomentFamily.lean:225`。

```lean
noncomputable section
open Set MeasureTheory
open scoped ComplexOrder Topology CompactlySupported
namespace D5.S3.Quantum.Analysis.NormalMomentFamily
open NormalFunctionals NormalL1Realization
variable {A : Type*} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
def scalarMeasure {ρ σ : StrongDual ℂ A} (F : Family ρ σ) : Measure Interval :=
  RealRMK.rieszMeasure (massFunctional F)
```

<a id="obj-055"></a>

### 对象 055 `D5.S3.Quantum.Codes.MajoranaFourteenModeDistanceFour.IsSelfOrthogonal`

来源：`D5/S3/Quantum/Codes/MajoranaFourteenModeDistanceFour.lean:35`。

```lean
open scoped BigOperators
open Matrix
open D5.S3.Fourier.CharacterSelection.BinaryCharacterCodeDuality
  (characterOrthogonalComplement)
noncomputable section
namespace D5.S3.Quantum.Codes.MajoranaFourteenModeDistanceFour
def IsSelfOrthogonal {ι : Type*} [Fintype ι]
    (c : Submodule (ZMod 2) (ι → ZMod 2)) : Prop :=
  ∀ x ∈ c, ∀ y ∈ c, x ⬝ᵥ y = 0
```

<a id="obj-056"></a>

### 对象 056 `D5.S3.Quantum.Codes.MajoranaFourteenModeDistanceFour.claim`

来源：`D5/S3/Quantum/Codes/MajoranaFourteenModeDistanceFour.lean:43`。

```lean
open scoped BigOperators
open Matrix
open D5.S3.Fourier.CharacterSelection.BinaryCharacterCodeDuality
  (characterOrthogonalComplement)
noncomputable section
namespace D5.S3.Quantum.Codes.MajoranaFourteenModeDistanceFour
def claim : Prop :=
  ∀ n : ℕ, n ≤ 14 → ∀ c : Submodule (ZMod 2) (Fin n → ZMod 2),
    IsSelfOrthogonal c → (fun _ => 1) ∈ c →
    2 * Module.finrank (ZMod 2) c < n →
    ∃ v ∈ characterOrthogonalComplement (ZMod 2) c, v ∉ c ∧ hammingNorm v < 4
```

<a id="obj-057"></a>

### 对象 057 `D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.canonicalLabel`

来源：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:40`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
def canonicalLabel (p : ZMod 2 × ZMod 2) : Pauli :=
  if p.1 = 0 then (if p.2 = 0 then .I else .Z)
  else (if p.2 = 0 then .X else .Y)
```

<a id="obj-058"></a>

### 对象 058 `D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.observable`

来源：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:45`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
def observable {N : ℕ} (v : Fin N → ZMod 2 × ZMod 2) :
    Matrix (Fin N → Fin 2) (Fin N → Fin 2) ℂ :=
  wordOp fun j => canonicalLabel (v j)
```

<a id="obj-059"></a>

### 对象 059 `D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.B`

来源：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:50`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
def B {N : ℕ} (v w : Fin N → ZMod 2 × ZMod 2) : ZMod 2 :=
  ∑ j, ((v j).1 * (w j).2 + (v j).2 * (w j).1)
```

<a id="obj-060"></a>

### 对象 060 `D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.IsLinearDoily`

来源：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:54`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
def IsLinearDoily {N : ℕ} (U : Submodule (ZMod 2) (Fin N → ZMod 2 × ZMod 2)) : Prop :=
  Module.finrank (ZMod 2) U = 4 ∧
    ∀ u ∈ U, (∀ w ∈ U, B u w = 0) → u = 0
```

<a id="obj-061"></a>

### 对象 061 `D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.points`

来源：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:59`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
def points {N : ℕ} (U : Submodule (ZMod 2) (Fin N → ZMod 2 × ZMod 2)) :
    Finset (Fin N → ZMod 2 × ZMod 2) := by
  classical
  exact Finset.univ.filter fun v => v ∈ U ∧ v ≠ 0
```

<a id="obj-062"></a>

### 对象 062 `D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.lines`

来源：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:65`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
def lines {N : ℕ} (U : Submodule (ZMod 2) (Fin N → ZMod 2 × ZMod 2)) :
    Finset (Finset (Fin N → ZMod 2 × ZMod 2)) := by
  classical
  exact (points U).powerset.filter fun l =>
    l.card = 3 ∧ ∀ u ∈ l, ∀ v ∈ l, u ≠ v → u + v ∈ l ∧ B u v = 0
```

<a id="obj-063"></a>

### 对象 063 `D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.lineProduct`

来源：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:72`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
def lineProduct {N : ℕ} (l : Finset (Fin N → ZMod 2 × ZMod 2)) :
    Matrix (Fin N → Fin 2) (Fin N → Fin 2) ℂ :=
  (l.toList.map observable).prod
```

<a id="obj-064"></a>

### 对象 064 `D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.negativeLines`

来源：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:77`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
def negativeLines {N : ℕ} (U : Submodule (ZMod 2) (Fin N → ZMod 2 × ZMod 2)) :
    Finset (Finset (Fin N → ZMod 2 × ZMod 2)) := by
  classical
  exact (lines U).filter fun l => lineProduct l = -1
```

<a id="obj-065"></a>

### 对象 065 `D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity.claim`

来源：`D5/S3/Quantum/Contextuality/LinearDoilyNegativeLineParity.lean:83`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option maxSynthPendingDepth 32
open scoped BigOperators
open Module
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerGraphNormalForm (tensor_smul)
open D5.S3.Quantum.Measurement.StabilizerPovmMaximalEntanglementRefutation
  (letterProduct letterPhase letter_mul letter_comm word_mul word_comm_sign wordUnit)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization (sign_sum)
open D5.S3.VertexAlgebra.LatticeTwistedGroundRealization.SignQuotient (complexSign)
namespace D5.S3.Quantum.Contextuality.LinearDoilyNegativeLineParity
noncomputable section
def claim : Prop :=
  ∀ (N : ℕ), 2 ≤ N →
    ∀ U : Submodule (ZMod 2) (Fin N → ZMod 2 × ZMod 2),
      IsLinearDoily U → Odd (negativeLines U).card
```

<a id="obj-066"></a>

### 对象 066 `D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold.centreB`

来源：`D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.lean:35`。

```lean
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
  (pauli blochA blochB corr vlen centre vlen_eq_norm vlen_nonneg)
open D5.S3.Quantum.Entanglement.SteeringEllipsoidCHSH
  (vlen_sq normalized_unit delta flipped
    flip_purity_identity bob_radius_le delta_le_centre tightState tight_psd tight_readouts
    tight_centre bell bell_trace_real_expansion unit_dot_le)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  (trace_flip)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  renaming flip → partySwap
open D5.S3.QuantumChannels.PauliThreeWeightBayesianInverseUniqueness (spin)
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
namespace D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold
def centreB (ρ : TwoQubit) : Fin 3 → ℝ :=
  if vlen (blochA ρ) = 1 then blochB ρ
  else fun j => (blochB ρ j - ∑ i, corr ρ i j * blochA ρ i) / (1 - vlen (blochA ρ) ^ 2)
```

<a id="obj-067"></a>

### 对象 067 `D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold.fThreeValues`

来源：`D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.lean:40`。

```lean
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
  (pauli blochA blochB corr vlen centre vlen_eq_norm vlen_nonneg)
open D5.S3.Quantum.Entanglement.SteeringEllipsoidCHSH
  (vlen_sq normalized_unit delta flipped
    flip_purity_identity bob_radius_le delta_le_centre tightState tight_psd tight_readouts
    tight_centre bell bell_trace_real_expansion unit_dot_le)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  (trace_flip)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  renaming flip → partySwap
open D5.S3.QuantumChannels.PauliThreeWeightBayesianInverseUniqueness (spin)
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
namespace D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold
def fThreeValues (ρ : TwoQubit) : Set ℝ :=
  {r | ∃ α β : Fin 3 → Fin 3 → ℝ,
    (∀ i, vlen (α i) = 1) ∧
    (∀ i j, β i ⬝ᵥ β j = if i = j then 1 else 0) ∧
    r = ‖∑ i, trace (ρ * (spin (α i) ⊗ₖ spin (β i)))‖ / Real.sqrt 3}
```

<a id="obj-068"></a>

### 对象 068 `D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold.fThree`

来源：`D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.lean:47`。

```lean
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
  (pauli blochA blochB corr vlen centre vlen_eq_norm vlen_nonneg)
open D5.S3.Quantum.Entanglement.SteeringEllipsoidCHSH
  (vlen_sq normalized_unit delta flipped
    flip_purity_identity bob_radius_le delta_le_centre tightState tight_psd tight_readouts
    tight_centre bell bell_trace_real_expansion unit_dot_le)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  (trace_flip)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  renaming flip → partySwap
open D5.S3.QuantumChannels.PauliThreeWeightBayesianInverseUniqueness (spin)
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
namespace D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold
def fThree (ρ : TwoQubit) : ℝ := sSup (fThreeValues ρ)
```

<a id="obj-069"></a>

### 对象 069 `D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold.claim`

来源：`D5/S3/Quantum/Contextuality/SteeringEllipsoidFThreeThreshold.lean:49`。

```lean
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
  (pauli blochA blochB corr vlen centre vlen_eq_norm vlen_nonneg)
open D5.S3.Quantum.Entanglement.SteeringEllipsoidCHSH
  (vlen_sq normalized_unit delta flipped
    flip_purity_identity bob_radius_le delta_le_centre tightState tight_psd tight_readouts
    tight_centre bell bell_trace_real_expansion unit_dot_le)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  (trace_flip)
open D5.S3.Quantum.Entanglement.AbsoluteSeparability.GurvitsBarnumBall
  renaming flip → partySwap
open D5.S3.QuantumChannels.PauliThreeWeightBayesianInverseUniqueness (spin)
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
namespace D5.S3.Quantum.Contextuality.SteeringEllipsoidFThreeThreshold
def claim : Prop :=
  (∀ ρ : TwoQubit, ρ.PosSemidef → trace ρ = 1 →
    fThree ρ ≤ max (Real.sqrt (3 * (1 - vlen (centreB ρ)))) 1) ∧
  (∀ t : ℝ, 0 ≤ t → t < 2 / 3 → ∃ ρ : TwoQubit,
    ρ.PosSemidef ∧ trace ρ = 1 ∧ vlen (centreB ρ) = t ∧ 1 < fThree ρ)
```

<a id="obj-070"></a>

### 对象 070 `D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment.NormalL1Preparation`

来源：`D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.lean:39`。

```lean
noncomputable section
universe u v
open Set MeasureTheory Filter
open scoped ComplexOrder ENNReal NNReal Topology
open D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open D5.S3.Analytic.Convexity.PosteriorCurvatureCost
open D5.S3.Quantum.Analysis.NormalFunctionals
open D5.S3.Quantum.Analysis.NormalMomentFamily
open D5.S3.Quantum.Divergence.PosteriorSourceNormalization
open D5.S3.Quantum.Divergence.MaximalHockeyStickL1ReverseTest
namespace D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment
set_option maxHeartbeats 1200000
set_option backward.isDefEq.respectTransparency false
variable {A : Type v} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
structure NormalL1Preparation {X : Type*} [MeasurableSpace X] (μ : Measure X) where
  toLinearMap : (X →₁[μ] ℂ) →ₗ[ℂ] StrongDual ℂ A
  positive : ∀ h, (∀ᵐ x ∂μ, 0 ≤ h x) → ∀ a : A, 0 ≤ a → 0 ≤ toLinearMap h a
  mass : ∀ h, toLinearMap h 1 = ∫ x, h x ∂μ
  normal : ∀ h, IsOrderNormal (toLinearMap h)
```

<a id="obj-071"></a>

### 对象 071 `D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment.NormalL1ReverseTest`

来源：`D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.lean:46`。

```lean
noncomputable section
universe u v
open Set MeasureTheory Filter
open scoped ComplexOrder ENNReal NNReal Topology
open D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open D5.S3.Analytic.Convexity.PosteriorCurvatureCost
open D5.S3.Quantum.Analysis.NormalFunctionals
open D5.S3.Quantum.Analysis.NormalMomentFamily
open D5.S3.Quantum.Divergence.PosteriorSourceNormalization
open D5.S3.Quantum.Divergence.MaximalHockeyStickL1ReverseTest
namespace D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment
set_option maxHeartbeats 1200000
set_option backward.isDefEq.respectTransparency false
variable {A : Type v} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
structure NormalL1ReverseTest (ρ σ : StrongDual ℂ A)
    {X : Type*} [MeasurableSpace X] (μ : Measure X) where
  preparation : NormalL1Preparation (A := A) μ
  p : X → ℝ
  q : X → ℝ
  p_measurable : Measurable p
  q_measurable : Measurable q
  p_integrable : Integrable p μ
  q_integrable : Integrable q μ
  p_nonneg : ∀ᵐ x ∂μ, 0 ≤ p x
  q_nonneg : ∀ᵐ x ∂μ, 0 ≤ q x
  prepares_left : preparation.toLinearMap (p_integrable.ofReal.toL1 (fun x => (p x : ℂ))) = ρ
  prepares_right : preparation.toLinearMap (q_integrable.ofReal.toL1 (fun x => (q x : ℂ))) = σ
```

<a id="obj-072"></a>

### 对象 072 `D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment.attainableCosts`

来源：`D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.lean:87`。

```lean
noncomputable section
universe u v
open Set MeasureTheory Filter
open scoped ComplexOrder ENNReal NNReal Topology
open D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open D5.S3.Analytic.Convexity.PosteriorCurvatureCost
open D5.S3.Quantum.Analysis.NormalFunctionals
open D5.S3.Quantum.Analysis.NormalMomentFamily
open D5.S3.Quantum.Divergence.PosteriorSourceNormalization
open D5.S3.Quantum.Divergence.MaximalHockeyStickL1ReverseTest
namespace D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment
set_option maxHeartbeats 1200000
set_option backward.isDefEq.respectTransparency false
variable {A : Type v} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
def attainableCosts {f : ℝ → ℝ} (hf : ConvexOn ℝ (Ioi 0) f)
    (ρ σ : StrongDual ℂ A) : Set EReal :=
  {z | ∃ (X : Type u) (m : MeasurableSpace X),
    letI := m
    ∃ μ : Measure X, SigmaFinite μ ∧ ∃ Γ : NormalL1Preparation (A := A) μ,
      ∃ p q : X →₁[μ] ℂ,
        (∀ᵐ x ∂μ, 0 ≤ p x) ∧ (∀ᵐ x ∂μ, 0 ≤ q x) ∧
        Γ.toLinearMap p = ρ ∧ Γ.toLinearMap q = σ ∧
        z = closedPerspectiveCost hf μ (fun x => (p x).re) (fun x => (q x).re)}
```

<a id="obj-073"></a>

### 对象 073 `D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment.familyCost`

来源：`D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.lean:134`。

```lean
noncomputable section
universe u v
open Set MeasureTheory Filter
open scoped ComplexOrder ENNReal NNReal Topology
open D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open D5.S3.Analytic.Convexity.PosteriorCurvatureCost
open D5.S3.Quantum.Analysis.NormalFunctionals
open D5.S3.Quantum.Analysis.NormalMomentFamily
open D5.S3.Quantum.Divergence.PosteriorSourceNormalization
open D5.S3.Quantum.Divergence.MaximalHockeyStickL1ReverseTest
namespace D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment
set_option maxHeartbeats 1200000
set_option backward.isDefEq.respectTransparency false
variable {A : Type v} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
def familyCost {f : ℝ → ℝ} (hf : ConvexOn ℝ (Ioi 0) f)
    {ρ σ : StrongDual ℂ A} (F : Family ρ σ) : EReal :=
  closedPerspectiveCost hf (scalarMeasure F) (fun t => t.val) (fun t => 1 - t.val)
```

<a id="obj-074"></a>

### 对象 074 `D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment.liftedMeasure`

来源：`D5/S3/Quantum/Divergence/GeneralConvexReverseTestAttainment.lean:203`。

```lean
noncomputable section
universe u v
open Set MeasureTheory Filter
open scoped ComplexOrder ENNReal NNReal Topology
open D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open D5.S3.Analytic.Convexity.PosteriorCurvatureCost
open D5.S3.Quantum.Analysis.NormalFunctionals
open D5.S3.Quantum.Analysis.NormalMomentFamily
open D5.S3.Quantum.Divergence.PosteriorSourceNormalization
open D5.S3.Quantum.Divergence.MaximalHockeyStickL1ReverseTest
namespace D5.S3.Quantum.Divergence.GeneralConvexReverseTestAttainment
set_option maxHeartbeats 1200000
set_option backward.isDefEq.respectTransparency false
variable {A : Type v} [CStarAlgebra A] [PartialOrder A] [StarOrderedRing A]
def liftedMeasure (ν : Measure Interval) : Measure (ULift.{u} Interval) :=
  ν.map ULift.up
```

<a id="obj-075"></a>

### 对象 075 `D5.S3.Quantum.Divergence.PosteriorSourceNormalization.mass`

来源：`D5/S3/Quantum/Divergence/PosteriorSourceNormalization.lean:34`。

```lean
noncomputable section
open MeasureTheory Set Filter
open scoped ComplexOrder ENNReal NNReal
open D5.S3.Analytic.Convexity.CurvatureHingeRepresentation
open D5.S3.Quantum.Divergence.MaximalHockeyStickReverseTest
open D5.S3.Quantum.Divergence.MaximalHockeyStickL1Preparation
namespace D5.S3.Quantum.Divergence.PosteriorSourceNormalization
set_option backward.isDefEq.respectTransparency false
variable {X : Type*} [MeasurableSpace X]
def mass (p q : X → ℝ) (x : X) : ℝ≥0 := (p x).toNNReal + (q x).toNNReal
```

<a id="obj-076"></a>

### 对象 076 `D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition.DensityState`

来源：`D5/S3/Quantum/Divergence/QuantumRelativeEntropyDefectComposition.lean:36`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open scoped ComplexOrder CStarAlgebra MatrixOrder
def DensityState (n : Type*) [Fintype n] [DecidableEq n] :=
  {rho : CStarMatrix n n ℂ // 0 ≤ rho ∧ Matrix.trace rho = 1}
```

<a id="obj-077"></a>

### 对象 077 `D5.S3.Quantum.Entanglement.PartialTransposeSaturation.tensorSum`

来源：`D5/S3/Quantum/Entanglement/PartialTransposeSaturation/Sufficiency.lean:44`。

```lean
set_option autoImplicit false
set_option backward.isDefEq.respectTransparency false
noncomputable section
namespace D5.S3.Quantum.Entanglement.PartialTransposeSaturation
open Matrix
open scoped Kronecker
variable {m n p q : Type*}
def tensorSum (A₁ A₂ : Matrix m n ℂ) (B₁ B₂ : Matrix p q ℂ) :
    Matrix (m × p) (n × q) ℂ := A₁ ⊗ₖ B₁ + A₂ ⊗ₖ B₂
```

<a id="obj-078"></a>

### 对象 078 `D5.S3.Quantum.Entanglement.PartialTransposeSaturation.partialTranspose`

来源：`D5/S3/Quantum/Entanglement/PartialTransposeSaturation/Sufficiency.lean:48`。

```lean
set_option autoImplicit false
set_option backward.isDefEq.respectTransparency false
noncomputable section
namespace D5.S3.Quantum.Entanglement.PartialTransposeSaturation
open Matrix
open scoped Kronecker
variable {m n p q : Type*}
def partialTranspose (A₁ A₂ : Matrix m n ℂ) (B₁ B₂ : Matrix p q ℂ) :
    Matrix (n × p) (m × q) ℂ := tensorSum A₁ᵀ A₂ᵀ B₁ B₂
```

<a id="obj-079"></a>

### 对象 079 `D5.S3.Quantum.Entanglement.PartialTransposeSaturation.hRank`

来源：`D5/S3/Quantum/Entanglement/PartialTransposeSaturation/Sufficiency.lean:52`。

```lean
set_option autoImplicit false
set_option backward.isDefEq.respectTransparency false
noncomputable section
namespace D5.S3.Quantum.Entanglement.PartialTransposeSaturation
open Matrix
open scoped Kronecker
variable {m n p q : Type*}
def hRank [Fintype n] (A₁ A₂ : Matrix m n ℂ) : ℕ :=
  (Matrix.fromCols A₁ A₂).rank
```

<a id="obj-080"></a>

### 对象 080 `D5.S3.Quantum.Entanglement.PartialTransposeSaturation.vRank`

来源：`D5/S3/Quantum/Entanglement/PartialTransposeSaturation/Sufficiency.lean:56`。

```lean
set_option autoImplicit false
set_option backward.isDefEq.respectTransparency false
noncomputable section
namespace D5.S3.Quantum.Entanglement.PartialTransposeSaturation
open Matrix
open scoped Kronecker
variable {m n p q : Type*}
def vRank [Fintype n] (A₁ A₂ : Matrix m n ℂ) : ℕ :=
  (Matrix.fromRows A₁ A₂).rank
```

<a id="obj-081"></a>

### 对象 081 `D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction.pauli`

来源：`D5/S3/Quantum/Entanglement/SteeringEllipsoidFullyEntangledFraction.lean:125`。

```lean
open D5.S3.Quantum.Divergence.ConditionalHockeyStickOrthogonalReduction
  (partialTraceRight_smul)
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.PartialTraceMutualInformation
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence (Pauli pauliMatrix)
namespace D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
def pauli (i : Fin 3) : Matrix (Fin 2) (Fin 2) ℂ := pauliMatrix (![Pauli.X, Pauli.Y, Pauli.Z] i)
```

<a id="obj-082"></a>

### 对象 082 `D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction.blochA`

来源：`D5/S3/Quantum/Entanglement/SteeringEllipsoidFullyEntangledFraction.lean:128`。

```lean
open D5.S3.Quantum.Divergence.ConditionalHockeyStickOrthogonalReduction
  (partialTraceRight_smul)
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.PartialTraceMutualInformation
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence (Pauli pauliMatrix)
namespace D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
def blochA (ρ : TwoQubit) (i : Fin 3) : ℝ :=
  (trace (ρ * (pauli i ⊗ₖ (1 : Matrix (Fin 2) (Fin 2) ℂ)))).re
```

<a id="obj-083"></a>

### 对象 083 `D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction.blochB`

来源：`D5/S3/Quantum/Entanglement/SteeringEllipsoidFullyEntangledFraction.lean:132`。

```lean
open D5.S3.Quantum.Divergence.ConditionalHockeyStickOrthogonalReduction
  (partialTraceRight_smul)
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.PartialTraceMutualInformation
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence (Pauli pauliMatrix)
namespace D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
def blochB (ρ : TwoQubit) (j : Fin 3) : ℝ :=
  (trace (ρ * ((1 : Matrix (Fin 2) (Fin 2) ℂ) ⊗ₖ pauli j))).re
```

<a id="obj-084"></a>

### 对象 084 `D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction.corr`

来源：`D5/S3/Quantum/Entanglement/SteeringEllipsoidFullyEntangledFraction.lean:136`。

```lean
open D5.S3.Quantum.Divergence.ConditionalHockeyStickOrthogonalReduction
  (partialTraceRight_smul)
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.PartialTraceMutualInformation
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence (Pauli pauliMatrix)
namespace D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
def corr (ρ : TwoQubit) (i j : Fin 3) : ℝ := (trace (ρ * (pauli i ⊗ₖ pauli j))).re
```

<a id="obj-085"></a>

### 对象 085 `D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction.vlen`

来源：`D5/S3/Quantum/Entanglement/SteeringEllipsoidFullyEntangledFraction.lean:139`。

```lean
open D5.S3.Quantum.Divergence.ConditionalHockeyStickOrthogonalReduction
  (partialTraceRight_smul)
set_option autoImplicit false
noncomputable section
open Matrix
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.PartialTraceMutualInformation
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence (Pauli pauliMatrix)
namespace D5.S3.Quantum.Entanglement.SteeringEllipsoidFullyEntangledFraction
open D5.S3.QuantumBounds.CHSHWitness renaming TwoQubitMatrix → TwoQubit
def vlen (v : Fin 3 → ℝ) : ℝ := Real.sqrt (∑ i, v i ^ 2)
```

<a id="obj-086"></a>

### 对象 086 `D5.S3.Quantum.FiniteDimensional.QubitMatrix`

来源：`D5/S3/Quantum/FiniteDimensional.lean:15`。

```lean
namespace D5.S3.Quantum.FiniteDimensional
open scoped ComplexOrder
abbrev QubitMatrix := Matrix (Fin 2) (Fin 2) ℂ
```

<a id="obj-087"></a>

### 对象 087 `D5.S3.Quantum.FiniteDimensional.qubitX`

来源：`D5/S3/Quantum/FiniteDimensional.lean:18`。

```lean
namespace D5.S3.Quantum.FiniteDimensional
open scoped ComplexOrder
def qubitX : QubitMatrix := !![0, 1; 1, 0]
```

<a id="obj-088"></a>

### 对象 088 `D5.S3.Quantum.FiniteDimensional.qubitZ`

来源：`D5/S3/Quantum/FiniteDimensional.lean:21`。

```lean
namespace D5.S3.Quantum.FiniteDimensional
open scoped ComplexOrder
def qubitZ : QubitMatrix := !![1, 0; 0, -1]
```

<a id="obj-089"></a>

### 对象 089 `D5.S3.Quantum.FiniteDimensional.bornProbability`

来源：`D5/S3/Quantum/FiniteDimensional.lean:73`。

```lean
namespace D5.S3.Quantum.FiniteDimensional
open scoped ComplexOrder
noncomputable def bornProbability {n : Type*} [Fintype n]
    (rho P : Matrix n n ℂ) : ℂ :=
  Matrix.trace (rho * P)
```

<a id="obj-090"></a>

### 对象 090 `D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption.restrictedPrimeProfile`

来源：`D5/S3/Quantum/FixedAlgebra/PrimeDephasingRefinementAbsorption.lean:28`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption
open D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
def restrictedPrimeProfile {d : Nat} {Prime Value : Type*} [DecidableEq Prime]
    (S : Finset Prime) (valuation : Fin d -> Prime -> Value) (i : Fin d) :
    {p : Prime // p ∈ S} -> Value :=
  fun p => valuation i p.1
```

<a id="obj-091"></a>

### 对象 091 `D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption.profileClassRepresentative`

来源：`D5/S3/Quantum/FixedAlgebra/PrimeDephasingRefinementAbsorption.lean:34`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption
open D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
noncomputable def profileClassRepresentative {d : Nat} {Profile : Type*}
    (classOf : Fin d -> Profile) (i : Fin d) : Fin d := by
  classical
  have nonempty : (Finset.univ.filter fun j => classOf j = classOf i).Nonempty :=
    ⟨i, by simp⟩
  exact (Finset.univ.filter fun j => classOf j = classOf i).min' nonempty
```

<a id="obj-092"></a>

### 对象 092 `D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption.orthogonalProfileRecord`

来源：`D5/S3/Quantum/FixedAlgebra/PrimeDephasingRefinementAbsorption.lean:42`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption
open D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
noncomputable def orthogonalProfileRecord {d : Nat} {Profile : Type*}
    (classOf : Fin d -> Profile) : Fin d -> Fin d -> ℂ :=
  fun i a => if a = profileClassRepresentative classOf i then 1 else 0
```

<a id="obj-093"></a>

### 对象 093 `D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption.primeDephasing`

来源：`D5/S3/Quantum/FixedAlgebra/PrimeDephasingRefinementAbsorption.lean:47`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.FixedAlgebra.PrimeDephasingRefinementAbsorption
open D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
noncomputable def primeDephasing {d : Nat} {Prime Value : Type*} [DecidableEq Prime]
    (S : Finset Prime) (valuation : Fin d -> Prime -> Value) :
    Matrix (Fin d) (Fin d) ℂ -> Matrix (Fin d) (Fin d) ℂ :=
  recordChannel (orthogonalProfileRecord (restrictedPrimeProfile S valuation))
```

<a id="obj-094"></a>

### 对象 094 `D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality.recordGram`

来源：`D5/S3/Quantum/FixedAlgebra/SingletonRecordClassicality.lean:19`。

```lean
namespace D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder
def recordGram {d e : Nat} (record : Fin d → Fin e → ℂ) (i j : Fin d) : ℂ :=
  ∑ a, record i a * star (record j a)
```

<a id="obj-095"></a>

### 对象 095 `D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality.recordChannel`

来源：`D5/S3/Quantum/FixedAlgebra/SingletonRecordClassicality.lean:22`。

```lean
namespace D5.S3.Quantum.FixedAlgebra.SingletonRecordClassicality
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder
def recordChannel {d e : Nat} (record : Fin d → Fin e → ℂ)
    (rho : Matrix (Fin d) (Fin d) ℂ) : Matrix (Fin d) (Fin d) ℂ :=
  fun i j => recordGram record i j * rho i j
```

<a id="obj-096"></a>

### 对象 096 `D5.S3.Quantum.Foundation.CircuitBalancedConfirmation.base`

来源：`D5/S3/Quantum/Foundation/CircuitBalancedConfirmation.lean:47`。

```lean
noncomputable section
open scoped BigOperators Matrix NNReal
namespace D5.S3.Quantum.Foundation.CircuitBalancedConfirmation
open D5.S3.Quantum.Entanglement.AbsolutePPT.NonnegativeKernelCircuit.OrderedField
variable {A : Type*} [NormedAddCommGroup A] [NormedSpace ℝ A]
  [FiniteDimensional ℝ A]
def base (C : PointedCone ℝ A) (u : A →ₗ[ℝ] ℝ) : Set A :=
  {x | x ∈ C ∧ u x = 1}
```

<a id="obj-097"></a>

### 对象 097 `D5.S3.Quantum.Foundation.CircuitBalancedConfirmation.pure`

来源：`D5/S3/Quantum/Foundation/CircuitBalancedConfirmation.lean:51`。

```lean
noncomputable section
open scoped BigOperators Matrix NNReal
namespace D5.S3.Quantum.Foundation.CircuitBalancedConfirmation
open D5.S3.Quantum.Entanglement.AbsolutePPT.NonnegativeKernelCircuit.OrderedField
variable {A : Type*} [NormedAddCommGroup A] [NormedSpace ℝ A]
  [FiniteDimensional ℝ A]
def pure (C : PointedCone ℝ A) (u : A →ₗ[ℝ] ℝ) : Set A :=
  (base C u).extremePoints ℝ
```

<a id="obj-098"></a>

### 对象 098 `D5.S3.Quantum.Foundation.CircuitBalancedConfirmation.proper`

来源：`D5/S3/Quantum/Foundation/CircuitBalancedConfirmation.lean:71`。

```lean
noncomputable section
open scoped BigOperators Matrix NNReal
namespace D5.S3.Quantum.Foundation.CircuitBalancedConfirmation
open D5.S3.Quantum.Entanglement.AbsolutePPT.NonnegativeKernelCircuit.OrderedField
variable {A : Type*} [NormedAddCommGroup A] [NormedSpace ℝ A]
  [FiniteDimensional ℝ A]
def proper (C : PointedCone ℝ A) (u : A →ₗ[ℝ] ℝ) (f : A →ₗ[ℝ] ℝ) : Prop :=
  ∀ x ∈ C, 0 ≤ f x ∧ f x ≤ u x
```

<a id="obj-099"></a>

### 对象 099 `D5.S3.Quantum.Foundation.CircuitBalancedConfirmation.confirms`

来源：`D5/S3/Quantum/Foundation/CircuitBalancedConfirmation.lean:75`。

```lean
noncomputable section
open scoped BigOperators Matrix NNReal
namespace D5.S3.Quantum.Foundation.CircuitBalancedConfirmation
open D5.S3.Quantum.Entanglement.AbsolutePPT.NonnegativeKernelCircuit.OrderedField
variable {A : Type*} [NormedAddCommGroup A] [NormedSpace ℝ A]
  [FiniteDimensional ℝ A]
def confirms (C : PointedCone ℝ A) (u : A →ₗ[ℝ] ℝ) (p : A)
    (f : A →ₗ[ℝ] ℝ) : Prop := proper C u f ∧ f p = 1
```

<a id="obj-100"></a>

### 对象 100 `D5.S3.Quantum.Foundation.ExclusionBallFaces.ExclusionChart`

来源：`D5/S3/Quantum/Foundation/ExclusionBallFaces.lean:27`。

```lean
noncomputable section
open Set
namespace D5.S3.Quantum.Foundation.ExclusionBallFaces
open CircuitBalancedConfirmation WeightedRelationConfirmation FacetZeroGluing
open WholePairBallConfirmation
variable {V : Type*} [NormedAddCommGroup V] [NormedSpace ℝ V]
  [FiniteDimensional ℝ V]
structure ExclusionChart (C : PointedCone ℝ V) (u : V →ₗ[ℝ] ℝ) (p : V) where
  dim : ℕ
  dim_pos : 0 < dim
  param : EuclideanSpace ℝ (Fin dim) →ᵃ[ℝ] V
  injective : Function.Injective param
  whole : param '' Metric.closedBall 0 1 = exclusion C u p
```

<a id="obj-101"></a>

### 对象 101 `D5.S3.Quantum.Foundation.ExclusionBallFaces.exclusionBalls`

来源：`D5/S3/Quantum/Foundation/ExclusionBallFaces.lean:35`。

```lean
noncomputable section
open Set
namespace D5.S3.Quantum.Foundation.ExclusionBallFaces
open CircuitBalancedConfirmation WeightedRelationConfirmation FacetZeroGluing
open WholePairBallConfirmation
variable {V : Type*} [NormedAddCommGroup V] [NormedSpace ℝ V]
  [FiniteDimensional ℝ V]
def exclusionBalls (C : PointedCone ℝ V) (u : V →ₗ[ℝ] ℝ) : Prop :=
  ∀ p : pure C u, Nonempty (ExclusionChart C u p)
```

<a id="obj-102"></a>

### 对象 102 `D5.S3.Quantum.Foundation.ExclusionBallFaces.pairProper`

来源：`D5/S3/Quantum/Foundation/ExclusionBallFaces.lean:39`。

```lean
noncomputable section
open Set
namespace D5.S3.Quantum.Foundation.ExclusionBallFaces
open CircuitBalancedConfirmation WeightedRelationConfirmation FacetZeroGluing
open WholePairBallConfirmation
variable {V : Type*} [NormedAddCommGroup V] [NormedSpace ℝ V]
  [FiniteDimensional ℝ V]
def pairProper (C : PointedCone ℝ V) (u : V →ₗ[ℝ] ℝ) : Prop :=
  ∀ p q : pure C u, p ≠ q → pairBase C u p q ≠ base C u
```

<a id="obj-103"></a>

### 对象 103 `D5.S3.Quantum.Foundation.FacetZeroGluing.exclusion`

来源：`D5/S3/Quantum/Foundation/FacetZeroGluing.lean:28`。

```lean
noncomputable section
namespace D5.S3.Quantum.Foundation.FacetZeroGluing
open CircuitBalancedConfirmation WeightedRelationConfirmation
variable {A : Type*} [NormedAddCommGroup A] [NormedSpace ℝ A]
  [FiniteDimensional ℝ A]
def exclusion (C : PointedCone ℝ A) (u : A →ₗ[ℝ] ℝ) (p : A) : Set A :=
  {x | x ∈ base C u ∧ ∃ f, confirms C u p f ∧ f x = 0}
```

<a id="obj-104"></a>

### 对象 104 `D5.S3.Quantum.Foundation.FiniteStateChannel.DensityState`

来源：`D5/S3/Quantum/Foundation/FiniteStateChannel.lean:33`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.Quantum.Foundation.FiniteStateChannel
open scoped CStarAlgebra ComplexOrder MatrixOrder
def DensityState (n : Type*) [Fintype n] [DecidableEq n] :=
  {rho : CStarMatrix n n ℂ // 0 <= rho /\ Matrix.trace rho = 1}
```

<a id="obj-105"></a>

### 对象 105 `D5.S3.Quantum.Foundation.FiniteStateChannel.QuantumChannel`

来源：`D5/S3/Quantum/Foundation/FiniteStateChannel.lean:54`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.Quantum.Foundation.FiniteStateChannel
open scoped CStarAlgebra ComplexOrder MatrixOrder
structure QuantumChannel (a b : Type*)
    [Fintype a] [DecidableEq a] [Fintype b] [DecidableEq b] where
  toCompletelyPositiveMap :
    CompletelyPositiveMap (CStarMatrix a a ℂ) (CStarMatrix b b ℂ)
  trace_preserving : forall rho : CStarMatrix a a ℂ,
    Matrix.trace (toCompletelyPositiveMap rho) = Matrix.trace rho
```

<a id="obj-106"></a>

### 对象 106 `D5.S3.Quantum.Foundation.HermitianExclusionKernel.cone`

来源：`D5/S3/Quantum/Foundation/HermitianExclusionKernel.lean:25`。

```lean
noncomputable section
open scoped Matrix ComplexOrder InnerProductSpace RealInnerProductSpace
namespace D5.S3.Quantum.Foundation.HermitianExclusionKernel
open CircuitBalancedConfirmation FacetZeroGluing SectionROGFrame
variable {ι : Type*} [Fintype ι] [DecidableEq ι]
def cone : PointedCone ℝ (HermitianMat ι ℂ) := PointedCone.positive ℝ _
```

<a id="obj-107"></a>

### 对象 107 `D5.S3.Quantum.Foundation.HermitianExclusionKernel.unit`

来源：`D5/S3/Quantum/Foundation/HermitianExclusionKernel.lean:28`。

```lean
noncomputable section
open scoped Matrix ComplexOrder InnerProductSpace RealInnerProductSpace
namespace D5.S3.Quantum.Foundation.HermitianExclusionKernel
open CircuitBalancedConfirmation FacetZeroGluing SectionROGFrame
variable {ι : Type*} [Fintype ι] [DecidableEq ι]
def unit : HermitianMat ι ℂ →ₗ[ℝ] ℝ where
  toFun := HermitianMat.trace
  map_add' := HermitianMat.trace_add
  map_smul' r X := HermitianMat.trace_smul X r
```

<a id="obj-108"></a>

### 对象 108 `D5.S3.Quantum.Foundation.WholePairBallConfirmation.pairBase`

来源：`D5/S3/Quantum/Foundation/WholePairBallConfirmation.lean:34`。

```lean
noncomputable section
open scoped RealInnerProductSpace
namespace D5.S3.Quantum.Foundation.WholePairBallConfirmation
open CircuitBalancedConfirmation
variable {V : Type*} [NormedAddCommGroup V] [NormedSpace ℝ V]
  [FiniteDimensional ℝ V]
def pairBase (C : PointedCone ℝ V) (u : V →ₗ[ℝ] ℝ) (p q : V) : Set V :=
  {x | x ∈ base C u ∧ ∀ F : C.Face, p ∈ F → q ∈ F → x ∈ F}
```

<a id="obj-109"></a>

### 对象 109 `D5.S3.Quantum.Foundation.WholePairBallConfirmation.BallChart`

来源：`D5/S3/Quantum/Foundation/WholePairBallConfirmation.lean:38`。

```lean
noncomputable section
open scoped RealInnerProductSpace
namespace D5.S3.Quantum.Foundation.WholePairBallConfirmation
open CircuitBalancedConfirmation
variable {V : Type*} [NormedAddCommGroup V] [NormedSpace ℝ V]
  [FiniteDimensional ℝ V]
structure BallChart (C : PointedCone ℝ V) (u : V →ₗ[ℝ] ℝ) (p q : V) where
  dim : ℕ
  dim_pos : 0 < dim
  param : EuclideanSpace ℝ (Fin dim) →ᵃ[ℝ] V
  injective : Function.Injective param
  whole : param '' Metric.closedBall 0 1 = pairBase C u p q
```

<a id="obj-110"></a>

### 对象 110 `D5.S3.Quantum.Foundation.WholePairBallConfirmation.wholePairBalls`

来源：`D5/S3/Quantum/Foundation/WholePairBallConfirmation.lean:46`。

```lean
noncomputable section
open scoped RealInnerProductSpace
namespace D5.S3.Quantum.Foundation.WholePairBallConfirmation
open CircuitBalancedConfirmation
variable {V : Type*} [NormedAddCommGroup V] [NormedSpace ℝ V]
  [FiniteDimensional ℝ V]
def wholePairBalls (C : PointedCone ℝ V) (u : V →ₗ[ℝ] ℝ) : Prop :=
  ∀ p q : pure C u, p ≠ q → Nonempty (BallChart C u p q)
```

<a id="obj-111"></a>

### 对象 111 `Gleason.ProjectionPackage`

来源：`D5/S3/Quantum/GleasonFrameGeometry.lean:102`。

```lean
@[expose] public section
open Matrix
open scoped ComplexConjugate ComplexOrder InnerProductSpace
namespace Gleason
variable {N : ℕ}
structure ProjectionPackage (N : ℕ) where
  p : Matrix (Fin N) (Fin N) ℂ → ℝ
  nonneg : ∀ P, IsStarProjection P → 0 ≤ p P
  total_one : p 1 = 1
  additive : ∀ P Q, IsStarProjection P → IsStarProjection Q → P * Q = 0 → p (P + Q) = p P + p Q
```

<a id="obj-112"></a>

### 对象 112 `D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence.pauliSet`

来源：`D5/S3/Quantum/Information/BinaryStabilizerLocalInequivalence.lean:61`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
namespace D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence
open Complex Matrix D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open scoped Kronecker
def pauliSet : Set (Matrix (Fin 2) (Fin 2) ℂ) :=
  {A | ∃ c ∈ ({1, -1, I, -I} : Set ℂ), ∃ p, A = c • pauliMatrix p}
```

<a id="obj-113"></a>

### 对象 113 `D5.S3.Quantum.Information.OrthogonalRecordEntropy.mixtureState`

来源：`D5/S3/Quantum/Information/OrthogonalRecordEntropy.lean:114`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option backward.isDefEq.respectTransparency false
open scoped BigOperators ComplexOrder CStarAlgebra MatrixOrder Kronecker
open D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open D5.S3.Quantum.Divergence.VonNeumannEntropyPinching
open D5.S3.Entropy.MaxEntropy
open D5.S3.Quantum.Information.PartialTraceMutualInformation
namespace D5.S3.Quantum.Information.OrthogonalRecordEntropy
variable {n : Type*} [Fintype n] [DecidableEq n]
local instance : ContinuousFunctionalCalculus ℝ (CStarMatrix n n ℂ) IsSelfAdjoint :=
  IsSelfAdjoint.instContinuousFunctionalCalculus
noncomputable def mixtureState {ι : Type*} [Fintype ι]
    (p : ι → ℝ) (hp : ∀ i, 0 ≤ p i) (hs : ∑ i, p i = 1)
    (rho : ι → DensityState n) : DensityState n := by
  refine ⟨∑ i, p i • (rho i).1, Finset.sum_nonneg (fun i _ => ?_), ?_⟩
  · exact smul_nonneg (hp i) (rho i).2.1
  · have ht (i : ι) : Matrix.trace (CStarMatrix.ofMatrix.symm (rho i).1) = 1 :=
      (rho i).2.2
    change Matrix.trace (∑ i, p i • (CStarMatrix.ofMatrix.symm (rho i).1)) = 1
    rw [Matrix.trace_sum]
    simp only [Matrix.trace_smul, ht, Complex.real_smul, mul_one]
    change (∑ i, (p i : ℂ)) = 1
    exact_mod_cast hs
```

<a id="obj-114"></a>

### 对象 114 `D5.S3.Quantum.Information.OrthogonalRecordEntropy.pointerState`

来源：`D5/S3/Quantum/Information/OrthogonalRecordEntropy.lean:168`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option backward.isDefEq.respectTransparency false
open scoped BigOperators ComplexOrder CStarAlgebra MatrixOrder Kronecker
open D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open D5.S3.Quantum.Divergence.VonNeumannEntropyPinching
open D5.S3.Entropy.MaxEntropy
open D5.S3.Quantum.Information.PartialTraceMutualInformation
namespace D5.S3.Quantum.Information.OrthogonalRecordEntropy
variable {n : Type*} [Fintype n] [DecidableEq n]
local instance : ContinuousFunctionalCalculus ℝ (CStarMatrix n n ℂ) IsSelfAdjoint :=
  IsSelfAdjoint.instContinuousFunctionalCalculus
noncomputable def pointerState (i : n) : DensityState n := by
  refine ⟨CStarMatrix.ofMatrix (Matrix.diagonal (fun j => if j = i then 1 else 0)), ?_, ?_⟩
  · apply map_nonneg CStarMatrix.ofMatrixStarAlgEquiv
    apply Matrix.PosSemidef.nonneg
    rw [Matrix.posSemidef_diagonal_iff]
    intro j
    split_ifs <;> simp
  · change Matrix.trace (Matrix.diagonal (fun j : n => if j = i then (1 : ℂ) else 0)) = 1
    simp
```

<a id="obj-115"></a>

### 对象 115 `D5.S3.Quantum.Information.OrthogonalRecordEntropy.recordState`

来源：`D5/S3/Quantum/Information/OrthogonalRecordEntropy.lean:222`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option backward.isDefEq.respectTransparency false
open scoped BigOperators ComplexOrder CStarAlgebra MatrixOrder Kronecker
open D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open D5.S3.Quantum.Divergence.VonNeumannEntropyPinching
open D5.S3.Entropy.MaxEntropy
open D5.S3.Quantum.Information.PartialTraceMutualInformation
namespace D5.S3.Quantum.Information.OrthogonalRecordEntropy
variable {n : Type*} [Fintype n] [DecidableEq n]
local instance : ContinuousFunctionalCalculus ℝ (CStarMatrix n n ℂ) IsSelfAdjoint :=
  IsSelfAdjoint.instContinuousFunctionalCalculus
noncomputable def recordState {ι : Type*} [Fintype ι] [DecidableEq ι]
    (p : ι → ℝ) (hp : ∀ i, 0 ≤ p i) (hs : ∑ i, p i = 1)
    (rho : ι → DensityState n) : DensityState (ι × n) :=
  mixtureState p hp hs (fun i => productState (pointerState i) (rho i))
```

<a id="obj-116"></a>

### 对象 116 `D5.S3.Quantum.Information.PartialTraceMutualInformation.productState`

来源：`D5/S3/Quantum/Information/PartialTraceMutualInformation.lean:137`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.Information.PartialTraceMutualInformation
open scoped BigOperators ComplexOrder Kronecker Matrix
open scoped MatrixOrder
open D5.S3.Quantum.Divergence.QuantumRelativeEntropyDefectComposition
open D5.S3.Quantum.Divergence.VonNeumannEntropyPinching
noncomputable def productState
    {A B : Type*} [Fintype A] [DecidableEq A] [Fintype B] [DecidableEq B]
    (rho : DensityState A) (sigma : DensityState B) : DensityState (A × B) := by
  refine ⟨CStarMatrix.ofMatrix (rho.1 ⊗ₖ sigma.1), ?_, ?_⟩
  · exact map_nonneg CStarMatrix.ofMatrixStarAlgEquiv
      ((density_posSemidef rho).kronecker (density_posSemidef sigma)).nonneg
  · exact (Matrix.trace_kronecker rho.1 sigma.1).trans (by rw [rho.2.2, sigma.2.2, mul_one])
```

<a id="obj-117"></a>

### 对象 117 `D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence.Pauli`

来源：`D5/S3/Quantum/Information/Pauli/PauliMatrix.lean:25`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.FiniteDimensional
inductive Pauli
  | I | X | Y | Z
  deriving DecidableEq
```

<a id="obj-118"></a>

### 对象 118 `D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence.pauliMatrix`

来源：`D5/S3/Quantum/Information/Pauli/PauliMatrix.lean:33`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.FiniteDimensional
noncomputable def pauliMatrix : Pauli → Matrix (Fin 2) (Fin 2) ℂ
  | .I => 1
  | .X => qubitX
  | .Y => Complex.I • (qubitX * qubitZ)
  | .Z => qubitZ
```

<a id="obj-119"></a>

### 对象 119 `D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence.tensorOp`

来源：`D5/S3/Quantum/Information/StabilizerPairLocalUnitaryInequivalence.lean:48`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open Matrix D5.S3.Quantum.FiniteDimensional
def tensorOp {n : ℕ} (M : Fin n → Matrix (Fin 2) (Fin 2) ℂ) :
    Matrix (Fin n → Fin 2) (Fin n → Fin 2) ℂ :=
  Matrix.of fun x y => ∏ i, M i (x i) (y i)
```

<a id="obj-120"></a>

### 对象 120 `D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence.wordOp`

来源：`D5/S3/Quantum/Information/StabilizerPairLocalUnitaryInequivalence.lean:53`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open Matrix D5.S3.Quantum.FiniteDimensional
noncomputable def wordOp {n : ℕ} (g : Fin n → Pauli) :
    Matrix (Fin n → Fin 2) (Fin n → Fin 2) ℂ :=
  tensorOp fun i => pauliMatrix (g i)
```

<a id="obj-121"></a>

### 对象 121 `HermitianMat`

来源：`D5/S3/Quantum/Information/StrongSubadditivity/Physlib/ForMathlib/HermitianMat/Basic.lean:32`。

```lean
@[expose] public section
set_option relaxedAutoImplicit true
def HermitianMat (n : Type*) (α : Type*) [AddGroup α] [StarAddMonoid α] :=
  (selfAdjoint (Matrix n n α) : Type (max u_1 u_2))
```

<a id="obj-122"></a>

### 对象 122 `HermitianMat.trace`

来源：`D5/S3/Quantum/Information/StrongSubadditivity/Physlib/ForMathlib/HermitianMat/Trace.lean:54`。

```lean
@[expose] public section
set_option relaxedAutoImplicit true
namespace HermitianMat
variable {R n m α : Type*} [Star R] [TrivialStar R] [Fintype n] [Fintype m]
section star
variable [Ring α] [StarAddMonoid α] [CommSemiring R] [Algebra R α] [IsMaximalSelfAdjoint R α]
def trace (A : HermitianMat n α) : R :=
  IsMaximalSelfAdjoint.selfadjMap (A.mat.trace)
```

<a id="obj-123"></a>

### 对象 123 `IsMaximalSelfAdjoint`

来源：`D5/S3/Quantum/Information/StrongSubadditivity/Physlib/ForMathlib/IsMaximalSelfAdjoint.lean:42`。

```lean
@[expose] public section
set_option relaxedAutoImplicit true
class IsMaximalSelfAdjoint (R : outParam Type*) (α : Type*) [Star α] [Star R] [CommSemiring R]
    [Semiring α] [TrivialStar R] [Algebra R α] where
  /-- The additive map sending an element of `α` to its self-adjoint part in `R`. -/
  selfadjMap : α →+ R
  /-- `selfadjMap` pulls scalar multiplication by `R` out of its argument. -/
  selfadj_smul : ∀ (r : R) (a : α), selfadjMap (r • a) = r * (selfadjMap a)
  /-- On self-adjoint elements, `selfadjMap` is a section of `algebraMap R α`. -/
  selfadj_algebra : ∀ {a : α}, IsSelfAdjoint a → algebraMap _ _ (selfadjMap a) = a
```

<a id="obj-124"></a>

### 对象 124 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.IsStochasticLagrangian`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:33`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
def IsStochasticLagrangian (d : ℕ)
    (T : Submodule (ZMod d) ((Fin 3 → ZMod d) × (Fin 3 → ZMod d))) : Prop :=
  (∀ p ∈ T, ∑ k, p.1 k * p.1 k - ∑ k, p.2 k * p.2 k = 0) ∧
    Module.finrank (ZMod d) T = 3 ∧ (fun _ => 1, fun _ => 1) ∈ T
```

<a id="obj-125"></a>

### 对象 125 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.R`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:39`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
noncomputable def R (d n : ℕ)
    (T : Submodule (ZMod d) ((Fin 3 → ZMod d) × (Fin 3 → ZMod d))) :
    Matrix (Fin 3 → Fin n → ZMod d) (Fin 3 → Fin n → ZMod d) ℂ := by
  classical
  exact fun X Y => ∏ j, if ((fun k => X k j), (fun k => Y k j)) ∈ T then 1 else 0
```

<a id="obj-126"></a>

### 对象 126 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.stateCube`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:46`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
def stateCube {d n : ℕ} (Psi : (Fin n → ZMod d) → ℂ) :
    Matrix (Fin 3 → Fin n → ZMod d) (Fin 3 → Fin n → ZMod d) ℂ :=
  fun X Y => ∏ k, Psi (X k) * star (Psi (Y k))
```

<a id="obj-127"></a>

### 对象 127 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.kappa`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:51`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
noncomputable def kappa (d n : ℕ) [NeZero d] (Psi : (Fin n → ZMod d) → ℂ)
    (T : Submodule (ZMod d) ((Fin 3 → ZMod d) × (Fin 3 → ZMod d))) : ℂ :=
  (R d n T * stateCube Psi).trace
```

<a id="obj-128"></a>

### 对象 128 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.claim`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:56`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
def claim : Prop :=
  ∀ (d : ℕ) [Fact d.Prime], d ≠ 2 →
    ∀ (n : ℕ) (Psi : (Fin n → ZMod d) → ℂ), ∑ x, ‖Psi x‖ ^ 2 = 1 →
      ∀ T, IsStochasticLagrangian d T → 0 ≤ kappa d n Psi T ∧ kappa d n Psi T ≤ 1
```

<a id="obj-129"></a>

### 对象 129 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.O`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:61`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
private def O : Matrix (Fin 3) (Fin 3) (ZMod 11) := !![7,8,8;8,7,8;8,8,7]
```

<a id="obj-130"></a>

### 对象 130 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.graphMap`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:63`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
private def graphMap : (Fin 3 → ZMod 11) →ₗ[ZMod 11]
    ((Fin 3 → ZMod 11) × (Fin 3 → ZMod 11)) :=
  (Matrix.mulVecLin O).prod LinearMap.id
```

<a id="obj-131"></a>

### 对象 131 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.T`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:67`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
private def T : Submodule (ZMod 11) ((Fin 3 → ZMod 11) × (Fin 3 → ZMod 11)) :=
  LinearMap.range graphMap
```

<a id="obj-132"></a>

### 对象 132 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.v`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:94`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
private def v (a : ZMod 11) : GaussianInt :=
  ![⟨-2,0⟩, ⟨0,0⟩, ⟨0,-2⟩, ⟨1,-2⟩, ⟨-1,-1⟩, ⟨1,2⟩,
    ⟨-1,-2⟩, ⟨-2,0⟩, ⟨0,-2⟩, ⟨2,-1⟩, ⟨1,-1⟩] ⟨a.val, ZMod.val_lt a⟩
```

<a id="obj-133"></a>

### 对象 133 `D5.S3.Quantum.Magic.CliffordThirdMomentNegativity.psi`

来源：`D5/S3/Quantum/Magic/CliffordThirdMomentNegativity.lean:98`。

```lean
namespace D5.S3.Quantum.Magic.CliffordThirdMomentNegativity
open Matrix
open scoped ComplexOrder
private noncomputable def psi (x : Fin 1 → ZMod 11) : ℂ :=
  GaussianInt.toComplex (v (x 0)) / (Real.sqrt 40 : ℂ)
```

<a id="obj-134"></a>

### 对象 134 `D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation.deficit`

来源：`D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.lean:30`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity)
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet)
open D5.S3.Quantum.Magic.WignerDistanceMinimum
open D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules
open scoped Kronecker ComplexOrder
def deficit (ρ σ : QubitMatrix) : ℝ :=
  (1 + COne ρ) * (1 + COne σ) - 1 - CTwo (ρ ⊗ₖ σ)
```

<a id="obj-135"></a>

### 对象 135 `D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation.claim`

来源：`D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.lean:32`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity)
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet)
open D5.S3.Quantum.Magic.WignerDistanceMinimum
open D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules
open scoped Kronecker ComplexOrder
def claim : Prop := ∃ f : QubitMatrix → ℝ, ∀ ρ σ : QubitMatrix,
  IsDensity ρ → bloch ρ .Z = 0 → 0 < COne ρ → IsDensity σ →
  0 < bloch σ .X * bloch σ .Y * bloch σ .Z → deficit ρ σ = COne ρ * f σ
```

<a id="obj-136"></a>

### 对象 136 `D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation.rhoA`

来源：`D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.lean:36`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity)
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet)
open D5.S3.Quantum.Magic.WignerDistanceMinimum
open D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules
open scoped Kronecker ComplexOrder
private def rhoA : QubitMatrix := !![1/2, 3/10 - 2/5*Complex.I; 3/10 + 2/5*Complex.I, 1/2]
```

<a id="obj-137"></a>

### 对象 137 `D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation.rhoB`

来源：`D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.lean:37`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity)
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet)
open D5.S3.Quantum.Magic.WignerDistanceMinimum
open D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules
open scoped Kronecker ComplexOrder
private def rhoB : QubitMatrix := !![1/2, 5/26 - 6/13*Complex.I; 5/26 + 6/13*Complex.I, 1/2]
```

<a id="obj-138"></a>

### 对象 138 `D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation.sigma`

来源：`D5/S3/Quantum/Magic/QubitWignerDeficitFactorRefutation.lean:38`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.QubitWignerDeficitFactorRefutation
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity)
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet)
open D5.S3.Quantum.Magic.WignerDistanceMinimum
open D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules
open scoped Kronecker ComplexOrder
private def sigma : QubitMatrix := !![17/18, 1/18 - 2/9*Complex.I; 1/18 + 2/9*Complex.I, 1/18]
```

<a id="obj-139"></a>

### 对象 139 `D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules.bloch`

来源：`D5/S3/Quantum/Magic/QubitWignerDistanceTensorRules.lean:70`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules
open Matrix Complex
open D5.S3.Quantum.Magic.WignerSimplexNearestEdge (edgeVertex freeEdges nearest_edge_point)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity)
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.Magic.WignerDistanceMinimum
  (PhasePoint phasePoint phasePointTwo Wigner WignerOne WignerTwo pauliTwo Stab Wfree COne CTwo
    spectral eigenVector spectral_stabilizer spectral_product_stabilizer)
def bloch (ρ : QubitMatrix) (p : Pauli) : ℝ := (ρ * pauliMatrix p).trace.re
```

<a id="obj-140"></a>

### 对象 140 `D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules.claimEquatorial`

来源：`D5/S3/Quantum/Magic/QubitWignerDistanceTensorRules.lean:71`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.QubitWignerDistanceTensorRules
open Matrix Complex
open D5.S3.Quantum.Magic.WignerSimplexNearestEdge (edgeVertex freeEdges nearest_edge_point)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity)
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open scoped Kronecker ComplexOrder
open D5.S3.Quantum.Magic.WignerDistanceMinimum
  (PhasePoint phasePoint phasePointTwo Wigner WignerOne WignerTwo pauliTwo Stab Wfree COne CTwo
    spectral eigenVector spectral_stabilizer spectral_product_stabilizer)
def claimEquatorial : Prop := ∀ ρ σ : QubitMatrix,
  IsDensity ρ → IsDensity σ → bloch ρ .Z = 0 → bloch σ .Z = 0 →
  CTwo (ρ ⊗ₖ σ) = COne ρ + COne σ + COne ρ * COne σ
```

<a id="obj-141"></a>

### 对象 141 `D5.S3.Quantum.Magic.WignerDistanceMinimum.PhasePoint`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:36`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
abbrev PhasePoint := Fin 2 × Fin 2
```

<a id="obj-142"></a>

### 对象 142 `D5.S3.Quantum.Magic.WignerDistanceMinimum.phasePoint`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:37`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def phasePoint (a : PhasePoint) : QubitMatrix :=
  (1 / 2 : ℂ) • (1 + ((-1 : ℂ) ^ (a.2 : ℕ)) • pauliMatrix .X +
    ((-1 : ℂ) ^ ((a.1 : ℕ) + (a.2 : ℕ))) • pauliMatrix .Y +
    ((-1 : ℂ) ^ (a.1 : ℕ)) • pauliMatrix .Z)
```

<a id="obj-143"></a>

### 对象 143 `D5.S3.Quantum.Magic.WignerDistanceMinimum.phasePointTwo`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:41`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def phasePointTwo (a : PhasePoint × PhasePoint) : TwoQubitMatrix :=
  phasePoint a.1 ⊗ₖ phasePoint a.2
```

<a id="obj-144"></a>

### 对象 144 `D5.S3.Quantum.Magic.WignerDistanceMinimum.Wigner`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:43`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def Wigner {ι α : Type*} [Fintype ι] (A : α → Matrix ι ι ℂ) (ρ : Matrix ι ι ℂ) : α → ℝ :=
  fun a => (ρ * A a).trace.re / Fintype.card ι
```

<a id="obj-145"></a>

### 对象 145 `D5.S3.Quantum.Magic.WignerDistanceMinimum.WignerOne`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:45`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def WignerOne (ρ : QubitMatrix) : PhasePoint → ℝ := Wigner phasePoint ρ
```

<a id="obj-146"></a>

### 对象 146 `D5.S3.Quantum.Magic.WignerDistanceMinimum.WignerTwo`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:46`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def WignerTwo (ρ : TwoQubitMatrix) : PhasePoint × PhasePoint → ℝ :=
  Wigner phasePointTwo ρ
```

<a id="obj-147"></a>

### 对象 147 `D5.S3.Quantum.Magic.WignerDistanceMinimum.pauliTwo`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:48`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def pauliTwo : Set TwoQubitMatrix :=
  {P | ∃ c ∈ ({1, -1, Complex.I, -Complex.I} : Set ℂ), ∃ p q : Pauli,
    P = c • (pauliMatrix p ⊗ₖ pauliMatrix q)}
```

<a id="obj-148"></a>

### 对象 148 `D5.S3.Quantum.Magic.WignerDistanceMinimum.Stab`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:54`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def Stab {ι : Type*} [Fintype ι] [DecidableEq ι] (P : Set (Matrix ι ι ℂ)) : Set (Matrix ι ι ℂ) :=
  {ρ | ∃ (S : Subgroup (Matrix.unitaryGroup ι ℂ)) (ψ : ι → ℂ),
    (∀ g : S, (g.val.val : Matrix ι ι ℂ) ∈ P) ∧
    Nat.card S = Fintype.card ι ∧
    (∀ g h : S, g * h = h * g) ∧
    (∑ i, ‖ψ i‖ ^ 2) = 1 ∧
    (∀ v : ι → ℂ, (∀ g : S, (g.val.val : Matrix ι ι ℂ) *ᵥ v = v) ↔
      ∃ c : ℂ, v = c • ψ) ∧
    ρ = Matrix.vecMulVec ψ (star ψ)}
```

<a id="obj-149"></a>

### 对象 149 `D5.S3.Quantum.Magic.WignerDistanceMinimum.Wfree`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:63`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def Wfree {ι α : Type*} [Fintype ι] [DecidableEq ι] (A : α → Matrix ι ι ℂ) (P : Set (Matrix ι ι ℂ)) : Set (α → ℝ) :=
  convexHull ℝ (Wigner A '' Stab P)
```

<a id="obj-150"></a>

### 对象 150 `D5.S3.Quantum.Magic.WignerDistanceMinimum.COne`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:65`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def COne (ρ : QubitMatrix) : ℝ := Metric.infDist (WithLp.toLp 1 (WignerOne ρ)) (WithLp.toLp 1 '' Wfree phasePoint pauliSet)
```

<a id="obj-151"></a>

### 对象 151 `D5.S3.Quantum.Magic.WignerDistanceMinimum.CTwo`

来源：`D5/S3/Quantum/Magic/WignerDistanceMinimum.lean:66`。

```lean
set_option autoImplicit false
set_option maxHeartbeats 12000000
set_option maxRecDepth 100000
noncomputable section
namespace D5.S3.Quantum.Magic.WignerDistanceMinimum
open Matrix Complex
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence
open D5.S3.Quantum.Information.BinaryStabilizerLocalInequivalence (pauliSet plab)
open D5.S3.QuantumBounds.CHSHWitness (TwoQubitMatrix)
open scoped Kronecker ComplexOrder
def CTwo (ρ : TwoQubitMatrix) : ℝ :=
  Metric.infDist (WithLp.toLp 1 (WignerTwo ρ)) (WithLp.toLp 1 '' Wfree phasePointTwo pauliTwo)
```

<a id="obj-152"></a>

### 对象 152 `D5.S3.Quantum.Matrix.HwangKimNearOrderRefutation.buresWassersteinDistance`

来源：`D5/S3/Quantum/Matrix/HwangKimNearOrderRefutation.lean:133`。

```lean
noncomputable section
open Matrix
open scoped MatrixOrder ComplexOrder
namespace D5.S3.Quantum.Matrix.HwangKimNearOrderRefutation
open D5.S3.Quantum.Matrix.SpectralPower (mpow)
open D5.S3.Quantum.Hiai.PsiMeanTraceConcavity (geometricMean)
def buresWassersteinDistance {m : ℕ} (A B : Matrix (Fin m) (Fin m) ℂ) : ℝ :=
  Real.sqrt ((Matrix.trace (A + B)).re -
    2 * (Matrix.trace (mpow (mpow A (1 / 2) * B * mpow A (1 / 2)) (1 / 2))).re)
```

<a id="obj-153"></a>

### 对象 153 `D5.S3.Quantum.Matrix.HwangKimNearOrderRefutation.wassersteinBarycenter`

来源：`D5/S3/Quantum/Matrix/HwangKimNearOrderRefutation.lean:139`。

```lean
noncomputable section
open Matrix
open scoped MatrixOrder ComplexOrder
namespace D5.S3.Quantum.Matrix.HwangKimNearOrderRefutation
open D5.S3.Quantum.Matrix.SpectralPower (mpow)
open D5.S3.Quantum.Hiai.PsiMeanTraceConcavity (geometricMean)
def wassersteinBarycenter {m n : ℕ} (w : Fin n → ℝ)
    (A : Fin n → Matrix (Fin m) (Fin m) ℂ) : Matrix (Fin m) (Fin m) ℂ :=
  Classical.epsilon (fun X : Matrix (Fin m) (Fin m) ℂ =>
    X.PosDef ∧ ∀ Y : Matrix (Fin m) (Fin m) ℂ, Y.PosDef →
      (∑ j : Fin n, w j * buresWassersteinDistance X (A j) ^ 2) ≤
        ∑ j : Fin n, w j * buresWassersteinDistance Y (A j) ^ 2)
```

<a id="obj-154"></a>

### 对象 154 `D5.S3.Quantum.Matrix.SpectralPower.mpow`

来源：`D5/S3/Quantum/Matrix/SpectralPower.lean:22`。

```lean
noncomputable section
open Matrix
open scoped ComplexOrder MatrixOrder
namespace D5.S3.Quantum.Matrix.SpectralPower
open D5.S3.Quantum.FiniteDimensional (QubitMatrix)
variable {n : Type*} [Fintype n] [DecidableEq n]
noncomputable def mpow (X : Matrix n n ℂ) (p : ℝ) : Matrix n n ℂ := cfc (fun t : ℝ => t ^ p) X
```

<a id="obj-155"></a>

### 对象 155 `D5.S3.Quantum.Measurement.FourQubitParentConstruction.B`

来源：`D5/S3/Quantum/Measurement/Bloch/QubitBloch.lean:27`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence (pauliMatrix)
open D5.S3.Quantum.FiniteDimensional
namespace D5.S3.Quantum.Measurement.FourQubitParentConstruction
def B (a : EuclideanSpace ℝ (Fin 3)) : Matrix (Fin 2) (Fin 2) ℂ :=
  (a 0 : ℂ) • pauliMatrix .X + (a 1 : ℂ) • pauliMatrix .Y +
    (a 2 : ℂ) • pauliMatrix .Z
```

<a id="obj-156"></a>

### 对象 156 `D5.S3.Quantum.Measurement.FourQubitParentConstruction.scalarB`

来源：`D5/S3/Quantum/Measurement/Bloch/QubitBloch.lean:39`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence (pauliMatrix)
open D5.S3.Quantum.FiniteDimensional
namespace D5.S3.Quantum.Measurement.FourQubitParentConstruction
def scalarB (t : ℝ) (a : EuclideanSpace ℝ (Fin 3)) : Matrix (Fin 2) (Fin 2) ℂ :=
  (t : ℂ) • (1 : Matrix (Fin 2) (Fin 2) ℂ) + B a
```

<a id="obj-157"></a>

### 对象 157 `D5.S3.Quantum.ObserverAlgebra.Register`

来源：`D5/S3/Quantum/ObserverAlgebra.lean:13`。

```lean
namespace D5.S3.Quantum.ObserverAlgebra
abbrev Register (index : Type*) := index -> Complex
```

<a id="obj-158"></a>

### 对象 158 `D5.S3.Quantum.ObserverAlgebra.readObservable`

来源：`D5/S3/Quantum/ObserverAlgebra.lean:16`。

```lean
namespace D5.S3.Quantum.ObserverAlgebra
def readObservable {index : Type*} (f : index -> Complex) (psi : Register index) :
    Register index :=
  fun i => f i * psi i
```

<a id="obj-159"></a>

### 对象 159 `D5.S3.Quantum.ObserverAlgebra.observerUpdate`

来源：`D5/S3/Quantum/ObserverAlgebra.lean:21`。

```lean
namespace D5.S3.Quantum.ObserverAlgebra
def observerUpdate {index : Type*} (tau : Equiv.Perm index) (psi : Register index) :
    Register index :=
  fun i => psi (tau.symm i)
```

<a id="obj-160"></a>

### 对象 160 `D5.S3.Quantum.PointerBasis.phaseDampingInBasis`

来源：`D5/S3/Quantum/PointerBasis.lean:17`。

```lean
namespace D5.S3.Quantum.PointerBasis
open D5.S3.Quantum.Decoherence
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.QubitWitnesses
def phaseDampingInBasis (coordinates : QubitMatrix ≃ QubitMatrix)
    (c : DampingCoefficient) (rho : QubitMatrix) : QubitMatrix :=
  coordinates.symm (phaseDamping c (coordinates rho))
```

<a id="obj-161"></a>

### 对象 161 `D5.S3.Quantum.PointerBasis.hadamardCoordinates`

来源：`D5/S3/Quantum/PointerBasis.lean:32`。

```lean
namespace D5.S3.Quantum.PointerBasis
open D5.S3.Quantum.Decoherence
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.QubitWitnesses
noncomputable def hadamardCoordinates (rho : QubitMatrix) : QubitMatrix :=
  !![(rho 0 0 + rho 0 1 + rho 1 0 + rho 1 1) / 2,
      (rho 0 0 - rho 0 1 + rho 1 0 - rho 1 1) / 2;
     (rho 0 0 + rho 0 1 - rho 1 0 - rho 1 1) / 2,
      (rho 0 0 - rho 0 1 - rho 1 0 + rho 1 1) / 2]
```

<a id="obj-162"></a>

### 对象 162 `D5.S3.Quantum.PointerBasis.hadamardCoordinateEquiv`

来源：`D5/S3/Quantum/PointerBasis.lean:45`。

```lean
namespace D5.S3.Quantum.PointerBasis
open D5.S3.Quantum.Decoherence
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.QubitWitnesses
noncomputable def hadamardCoordinateEquiv : QubitMatrix ≃ QubitMatrix where
  toFun := hadamardCoordinates
  invFun := hadamardCoordinates
  left_inv := hadamard_coordinates_involutive
  right_inv := hadamard_coordinates_involutive
```

<a id="obj-163"></a>

### 对象 163 `D5.S3.Quantum.PointerBasis.fourierPhaseDamping`

来源：`D5/S3/Quantum/PointerBasis.lean:52`。

```lean
namespace D5.S3.Quantum.PointerBasis
open D5.S3.Quantum.Decoherence
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.QubitWitnesses
noncomputable def fourierPhaseDamping (c : DampingCoefficient)
    (rho : QubitMatrix) : QubitMatrix :=
  phaseDampingInBasis hadamardCoordinateEquiv c rho
```

<a id="obj-164"></a>

### 对象 164 `D5.S3.Quantum.QubitWitnesses.DampingCoefficient`

来源：`D5/S3/Quantum/QubitWitnesses.lean:83`。

```lean
namespace D5.S3.Quantum.QubitWitnesses
open D5.S3.Quantum.FiniteDimensional
abbrev DampingCoefficient := Set.Icc (0 : ℝ) 1
```

<a id="obj-165"></a>

### 对象 165 `D5.S3.Quantum.QubitWitnesses.phaseDamping`

来源：`D5/S3/Quantum/QubitWitnesses.lean:86`。

```lean
namespace D5.S3.Quantum.QubitWitnesses
open D5.S3.Quantum.FiniteDimensional
def phaseDamping (c : DampingCoefficient) (rho : QubitMatrix) : QubitMatrix :=
  fun i j => if i = j then rho i j else (((c : ℝ) : ℂ) * rho i j)
```

<a id="obj-166"></a>

### 对象 166 `D5.S3.Quantum.QubitWitnesses.equalSuperpositionDensity`

来源：`D5/S3/Quantum/QubitWitnesses.lean:111`。

```lean
namespace D5.S3.Quantum.QubitWitnesses
open D5.S3.Quantum.FiniteDimensional
noncomputable def equalSuperpositionDensity : QubitMatrix :=
  !![(1 : ℂ) / 2, (1 : ℂ) / 2; (1 : ℂ) / 2, (1 : ℂ) / 2]
```

<a id="obj-167"></a>

### 对象 167 `D5.S3.Quantum.SorkinThirdOrder.amplitudeWeight`

来源：`D5/S3/Quantum/SorkinThirdOrder.lean:22`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
namespace D5.S3.Quantum.SorkinThirdOrder
variable {α R : Type*} [DecidableEq α] [CommRing R] [StarRing R]
def amplitudeWeight (v : α → R) (A : Finset α) : R :=
  (Finset.sum A v) * starRingEnd R (Finset.sum A v)
```

<a id="obj-168"></a>

### 对象 168 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.Vec`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:30`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev Vec := _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.Vec
```

<a id="obj-169"></a>

### 对象 169 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.E`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:31`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev E := _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.E
```

<a id="obj-170"></a>

### 对象 170 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.vnorm`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:32`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev vnorm : Vec → ℝ :=
  _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.vnorm
```

<a id="obj-171"></a>

### 对象 171 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.Mat`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:34`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev Mat := Matrix (Fin 2) (Fin 2) ℂ
```

<a id="obj-172"></a>

### 对象 172 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.Relation`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:35`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev Relation := E → E → E
```

<a id="obj-173"></a>

### 对象 173 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.euclideanVec`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:37`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
private def euclideanVec (v : Vec) : EuclideanSpace ℝ (Fin 3) := toLp 2 v
```

<a id="obj-174"></a>

### 对象 174 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.unit`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:52`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev unit : E := _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.unit
```

<a id="obj-175"></a>

### 对象 175 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.jordan`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:72`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def jordan (a b : E) : E := _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.jordan a b
```

<a id="obj-176"></a>

### 对象 176 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.originalNorm`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:92`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev originalNorm : E → ℝ :=
  _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.originalNorm
```

<a id="obj-177"></a>

### 对象 177 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.cone`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:95`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev cone : E → Prop :=
  _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.cone
```

<a id="obj-178"></a>

### 对象 178 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.evaluate`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:99`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def evaluate (m : ℝ) (v : Vec) (a : E) : ℝ :=
  m * a.1 + _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.dot v a.2
```

<a id="obj-179"></a>

### 对象 179 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.PositiveEvaluation`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:103`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def PositiveEvaluation (α : E →ₗ[ℝ] ℝ) : Prop := ∀ a, cone a → 0 ≤ α a
```

<a id="obj-180"></a>

### 对象 180 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.evaluationLinear`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:105`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def evaluationLinear (m : ℝ) (v : Vec) : E →ₗ[ℝ] ℝ where
  toFun := evaluate m v
  map_add' a b := by simp [evaluate,
    _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.dot, dotProduct, Fin.sum_univ_three]; ring
  map_smul' r a := by simp [evaluate,
    _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.dot, dotProduct, Fin.sum_univ_three]; ring
```

<a id="obj-181"></a>

### 对象 181 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.phi`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:112`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def phi (a : E) : Mat :=
  _root_.D5.S3.Quantum.Measurement.FourQubitParentConstruction.scalarB a.1
    (euclideanVec a.2)
```

<a id="obj-182"></a>

### 对象 182 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.density`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:115`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def density (m : ℝ) (v : Vec) : Mat :=
  (1 / 2 : ℂ) • _root_.D5.S3.Quantum.Measurement.FourQubitParentConstruction.scalarB m
    (euclideanVec v)
```

<a id="obj-183"></a>

### 对象 183 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.product`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:120`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def product (opposite : Bool) (A B : Mat) : Mat := if opposite then B * A else A * B
```

<a id="obj-184"></a>

### 对象 184 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.gram`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:123`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def gram {ι : Type*} (D : Relation) (m : ℝ) (v : Vec) (a : ι → E) : Matrix ι ι ℂ :=
  fun i j => (evaluate m v (jordan (a i) (a j)) : ℂ) -
    Complex.I * (evaluate m v (D (a i) (a j)) : ℂ)
```

<a id="obj-185"></a>

### 对象 185 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.P2`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:127`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev P2 : (Relation → Prop) :=
  _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.P2
```

<a id="obj-186"></a>

### 对象 186 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.PB`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:130`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
abbrev PB : (Relation → Prop) :=
  _root_.D5.S3.Quantum.SpinFactor.OriginalDContract.PB
```

<a id="obj-187"></a>

### 对象 187 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.OriginalContinuous`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:133`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def OriginalContinuous (D : Relation) : Prop :=
  ∀ a b : E, ∀ η : ℝ, 0 < η → ∃ δ : ℝ, 0 < δ ∧
    ∀ a' b' : E, originalNorm (a' - a) < δ → originalNorm (b' - b) < δ →
      originalNorm (D a' b' - D a b) < η
```

<a id="obj-188"></a>

### 对象 188 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.Consequences`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:643`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
structure Consequences (D : Relation) : Prop where
  p2 : P2 D
  pb : PB D
  unit_left : ∀ (r : ℝ) (b : E), D (r • unit) b = 0
  unit_right : ∀ (r : ℝ) (a : E), D a (r • unit) = 0
  translation : ∀ (r q : ℝ) (a b : E), D (a + r • unit) (b + q • unit) = D a b
  add_left : ∀ a b c, D (a + b) c = D a c + D b c
  add_right : ∀ a b c, D a (b + c) = D a b + D a c
  smul_left : ∀ (r : ℝ) (a b : E), D (r • a) b = r • D a b
  smul_right : ∀ (r : ℝ) (a b : E), D a (r • b) = r • D a b
  bound : ∀ a b, originalNorm (D a b) ≤ originalNorm a * originalNorm b
  difference_bound : ∀ a b a' b', originalNorm (D a b - D a' b') ≤
    originalNorm (a - a') * originalNorm b + originalNorm a' * originalNorm (b - b')
  continuous : OriginalContinuous D
  finite_gram : ∀ (n : ℕ) (m : ℝ) (v : Vec), vnorm v ≤ m →
    ∀ a : Fin n → E, (gram D m v a).PosSemidef
  reassociation : ∀ a b c, jordan (jordan a b) c - jordan a (jordan b c) =
    D (D a b) c - D a (D b c)
```

<a id="obj-189"></a>

### 对象 189 `D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers.MatrixInterfaces`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:663`。

```lean
section
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open Matrix WithLp
open scoped BigOperators ComplexOrder
namespace D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
def MatrixInterfaces (opposite : Bool) (D : Relation) : Prop :=
      (∀ m v, (density m v).PosSemidef ↔ vnorm v ≤ m) ∧
      (∀ m v, (density m v).trace = (m : ℂ)) ∧
      (∀ m v, PositiveEvaluation (evaluationLinear m v) ↔ vnorm v ≤ m) ∧
      (∀ α : E →ₗ[ℝ] ℝ, PositiveEvaluation α →
        ∃ m : ℝ, ∃ v : Vec, vnorm v ≤ m ∧ ∀ a, α a = evaluate m v a) ∧
      (∀ m v a, (density m v * phi a).trace = (evaluate m v a : ℂ)) ∧
      (∀ a, (phi a).PosSemidef ↔ cone a) ∧
      (∀ (a : E) (r : ℝ), (((r : ℂ) • (1 : Mat) - phi a).PosSemidef ∧
        ((r : ℂ) • (1 : Mat) + phi a).PosSemidef) ↔ originalNorm a ≤ r) ∧
      (∀ ρ : Mat, ρ.PosSemidef → ∃ m : ℝ, ∃ v : Vec, vnorm v ≤ m ∧ ρ = density m v) ∧
      (∀ a b, product opposite (phi a) (phi b) =
        phi (jordan a b) - Complex.I • phi (D a b))
```

<a id="obj-190"></a>

### 对象 190 `D5.S3.Quantum.SpinFactor.OriginalClassification.Relation`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:746`。

```lean
noncomputable section
namespace D5.S3.Quantum.SpinFactor.OriginalClassification
open OriginalDContract
open OriginalPureRigidity (global_pure)
open OriginalResidual (all_inputs_of_pure)
open _root_.D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
  (Consequences MatrixInterfaces same_D_consequences)
abbrev Relation := E → E → E
```

<a id="obj-191"></a>

### 对象 191 `D5.S3.Quantum.SpinFactor.OriginalClassification.orientationBool`

来源：`D5/S3/Quantum/SpinFactor/OriginalClassification.lean:750`。

```lean
noncomputable section
namespace D5.S3.Quantum.SpinFactor.OriginalClassification
open OriginalDContract
open OriginalPureRigidity (global_pure)
open OriginalResidual (all_inputs_of_pure)
open _root_.D5.S3.Quantum.Information.Pauli.OriginalSpinConsumers
  (Consequences MatrixInterfaces same_D_consequences)
def orientationBool : Orientation → Bool
  | .plus => true
  | .minus => false
```

<a id="obj-192"></a>

### 对象 192 `D5.S3.Quantum.SpinFactor.OriginalDContract.Vec`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:28`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
abbrev Vec := Fin 3 → ℝ
```

<a id="obj-193"></a>

### 对象 193 `D5.S3.Quantum.SpinFactor.OriginalDContract.E`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:29`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
abbrev E := ℝ × Vec
```

<a id="obj-194"></a>

### 对象 194 `D5.S3.Quantum.SpinFactor.OriginalDContract.unit`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:31`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def unit : E := (1, 0)
```

<a id="obj-195"></a>

### 对象 195 `D5.S3.Quantum.SpinFactor.OriginalDContract.dot`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:33`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def dot (x y : Vec) : ℝ := x ⬝ᵥ y
```

<a id="obj-196"></a>

### 对象 196 `D5.S3.Quantum.SpinFactor.OriginalDContract.vnorm`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:35`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def vnorm (x : Vec) : ℝ := Real.sqrt (dot x x)
```

<a id="obj-197"></a>

### 对象 197 `D5.S3.Quantum.SpinFactor.OriginalDContract.jordan`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:37`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def jordan (a b : E) : E :=
  (a.1 * b.1 + dot a.2 b.2, a.1 • b.2 + b.1 • a.2)
```

<a id="obj-198"></a>

### 对象 198 `D5.S3.Quantum.SpinFactor.OriginalDContract.cone`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:40`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def cone (a : E) : Prop := vnorm a.2 ≤ a.1
```

<a id="obj-199"></a>

### 对象 199 `D5.S3.Quantum.SpinFactor.OriginalDContract.originalNorm`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:42`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def originalNorm (a : E) : ℝ := |a.1| + vnorm a.2
```

<a id="obj-200"></a>

### 对象 200 `D5.S3.Quantum.SpinFactor.OriginalDContract.Evaluation`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:44`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
structure Evaluation where
  mass : ℝ
  vector : Vec
  positive : vnorm vector ≤ mass
```

<a id="obj-201"></a>

### 对象 201 `D5.S3.Quantum.SpinFactor.OriginalDContract.evaluate`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:49`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def evaluate (α : Evaluation) (a : E) : ℝ :=
  α.mass * a.1 + dot α.vector a.2
```

<a id="obj-202"></a>

### 对象 202 `D5.S3.Quantum.SpinFactor.OriginalDContract.cross`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:52`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def cross (x y : Vec) : Vec :=
  ![x 1 * y 2 - x 2 * y 1,
    x 2 * y 0 - x 0 * y 2,
    x 0 * y 1 - x 1 * y 0]
```

<a id="obj-203"></a>

### 对象 203 `D5.S3.Quantum.SpinFactor.OriginalDContract.Orientation`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:57`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
inductive Orientation where
  | plus
  | minus
```

<a id="obj-204"></a>

### 对象 204 `D5.S3.Quantum.SpinFactor.OriginalDContract.crossD`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:61`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def crossD (ε : Orientation) (a b : E) : E :=
  (0, match ε with | .plus => cross a.2 b.2 | .minus => -(cross a.2 b.2))
```

<a id="obj-205"></a>

### 对象 205 `D5.S3.Quantum.SpinFactor.OriginalDContract.readout`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:64`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def readout (D : E → E → E) (α : Evaluation) (a b : E) : ℂ :=
  (evaluate α (jordan a b) : ℂ) - Complex.I * (evaluate α (D a b) : ℂ)
```

<a id="obj-206"></a>

### 对象 206 `D5.S3.Quantum.SpinFactor.OriginalDContract.gram2`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:67`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def gram2 (D : E → E → E) (α : Evaluation) (a b : E) : Matrix (Fin 2) (Fin 2) ℂ :=
  !![readout D α a a, readout D α a b;
     readout D α b a, readout D α b b]
```

<a id="obj-207"></a>

### 对象 207 `D5.S3.Quantum.SpinFactor.OriginalDContract.P2`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:73`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def P2 (D : E → E → E) : Prop :=
  ∀ (α : Evaluation) (a b : E), (gram2 D α a b).PosSemidef
```

<a id="obj-208"></a>

### 对象 208 `D5.S3.Quantum.SpinFactor.OriginalDContract.squareReadout`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:76`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def squareReadout (D : E → E → E) (α : Evaluation) (b c : E) : ℝ :=
  evaluate α (jordan b b) + evaluate α (jordan c c) +
    2 * evaluate α (D b c)
```

<a id="obj-209"></a>

### 对象 209 `D5.S3.Quantum.SpinFactor.OriginalDContract.phaseR`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:80`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def phaseR (D : E → E → E) (a b c : E) : E :=
  b + D a b - jordan a c
```

<a id="obj-210"></a>

### 对象 210 `D5.S3.Quantum.SpinFactor.OriginalDContract.phaseS`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:83`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def phaseS (D : E → E → E) (a b c : E) : E :=
  c + jordan a b + D a c
```

<a id="obj-211"></a>

### 对象 211 `D5.S3.Quantum.SpinFactor.OriginalDContract.PB`

来源：`D5/S3/Quantum/SpinFactor/OriginalDContract.lean:87`。

```lean
noncomputable section
open scoped BigOperators Matrix ComplexOrder
namespace D5.S3.Quantum.SpinFactor.OriginalDContract
def PB (D : E → E → E) : Prop :=
  ∀ (α : Evaluation) (a b c : E),
    squareReadout D α (phaseR D a b c) (phaseS D a b c) =
      squareReadout D α (b - D a b + jordan a c) (c - jordan a b - D a c)
```

<a id="obj-212"></a>

### 对象 212 `D5.S3.Quantum.Subentropy.Basic.subentropyKernel`

来源：`D5/S3/Quantum/Subentropy/Basic.lean:27`。

```lean
noncomputable section
set_option autoImplicit false
open Matrix MeasureTheory Set
open scoped BigOperators ComplexConjugate
namespace D5.S3.Quantum.Subentropy.Basic
open _root_.D5.S3.Quantum.Foundation.FiniteStateChannel
def subentropyKernel {ι : Type*} [Fintype ι] [DecidableEq ι]
    (A : Matrix ι ι ℂ) (t : ℝ) : ℝ :=
  t / (1 + t) - ((Matrix.det (1 + (t⁻¹ : ℝ) • A)).re)⁻¹
```

<a id="obj-213"></a>

### 对象 213 `D5.S3.Quantum.Subentropy.Basic.matrixSubentropy`

来源：`D5/S3/Quantum/Subentropy/Basic.lean:32`。

```lean
noncomputable section
set_option autoImplicit false
open Matrix MeasureTheory Set
open scoped BigOperators ComplexConjugate
namespace D5.S3.Quantum.Subentropy.Basic
open _root_.D5.S3.Quantum.Foundation.FiniteStateChannel
def matrixSubentropy {ι : Type*} [Fintype ι] [DecidableEq ι]
    (A : Matrix ι ι ℂ) : ℝ :=
  ∫ t in Set.Ioi (0 : ℝ), subentropyKernel A t
```

<a id="obj-214"></a>

### 对象 214 `D5.S3.Quantum.Subentropy.Basic.subentropy`

来源：`D5/S3/Quantum/Subentropy/Basic.lean:37`。

```lean
noncomputable section
set_option autoImplicit false
open Matrix MeasureTheory Set
open scoped BigOperators ComplexConjugate
namespace D5.S3.Quantum.Subentropy.Basic
open _root_.D5.S3.Quantum.Foundation.FiniteStateChannel
def subentropy {ι : Type*} [Fintype ι] [DecidableEq ι]
    (ρ : DensityState ι) : ℝ :=
  matrixSubentropy (CStarMatrix.ofMatrix.symm ρ.1)
```

<a id="obj-215"></a>

### 对象 215 `D5.S3.Quantum.Subentropy.ClassicalQuantumGram.conditionalSubentropy`

来源：`D5/S3/Quantum/Subentropy/ClassicalQuantumGram.lean:89`。

```lean
noncomputable section
set_option autoImplicit false
set_option backward.isDefEq.respectTransparency false
open Matrix
open scoped BigOperators ComplexOrder MatrixOrder CStarAlgebra Kronecker
namespace D5.S3.Quantum.Subentropy.ClassicalQuantumGram
open _root_.D5.S3.Quantum.Foundation.FiniteStateChannel
open _root_.D5.S3.Quantum.Information.PartialTraceMutualInformation
open _root_.D5.S3.Quantum.Information.OrthogonalRecordEntropy
open _root_.D5.S3.Quantum.Subentropy.Basic
open _root_.D5.S3.Quantum.Subentropy.DensityKernel
open _root_.D5.S3.Quantum.Subentropy.KernelBounds
open _root_.D5.S3.Quantum.Subentropy.UniformIntegrals
variable {X B : Type*} [Fintype X] [DecidableEq X] [Fintype B] [DecidableEq B]
def conditionalSubentropy (p : X → ℝ) (hp : ∀ x, 0 ≤ p x)
    (hs : ∑ x, p x = 1) (ρ : X → DensityState B) : ℝ :=
  subentropy (recordState p hp hs ρ) - subentropy (mixtureState p hp hs ρ)
```

<a id="obj-216"></a>

### 对象 216 `D5.S3.Quantum.Subentropy.GuessingProbability.successProbability`

来源：`D5/S3/Quantum/Subentropy/GuessingProbability.lean:28`。

```lean
noncomputable section
set_option autoImplicit false
open Matrix Set
open scoped BigOperators ComplexOrder MatrixOrder
namespace D5.S3.Quantum.Subentropy.GuessingProbability
open _root_.D5.S3.Quantum.Foundation.FiniteStateChannel
open _root_.D5.S3.Quantum.Information.PartialTraceMutualInformation
variable {X B : Type*} [Fintype X] [Fintype B] [DecidableEq B]
def successProbability (p : X → ℝ) (rho : X → DensityState B)
    (M : X → Matrix B B ℂ) : ℝ :=
  ∑ x, p x * (trace (M x * CStarMatrix.ofMatrix.symm (rho x).1)).re
```

<a id="obj-217"></a>

### 对象 217 `D5.S3.Quantum.Subentropy.GuessingProbability.successProbabilitySet`

来源：`D5/S3/Quantum/Subentropy/GuessingProbability.lean:33`。

```lean
noncomputable section
set_option autoImplicit false
open Matrix Set
open scoped BigOperators ComplexOrder MatrixOrder
namespace D5.S3.Quantum.Subentropy.GuessingProbability
open _root_.D5.S3.Quantum.Foundation.FiniteStateChannel
open _root_.D5.S3.Quantum.Information.PartialTraceMutualInformation
variable {X B : Type*} [Fintype X] [Fintype B] [DecidableEq B]
def successProbabilitySet (p : X → ℝ) (rho : X → DensityState B) : Set ℝ :=
  {a | ∃ M : X → Matrix B B ℂ,
    (∀ x, (M x).PosSemidef) ∧ ∑ x, M x = 1 ∧ a = successProbability p rho M}
```

<a id="obj-218"></a>

### 对象 218 `D5.S3.Quantum.Subentropy.GuessingProbability.pGuess`

来源：`D5/S3/Quantum/Subentropy/GuessingProbability.lean:38`。

```lean
noncomputable section
set_option autoImplicit false
open Matrix Set
open scoped BigOperators ComplexOrder MatrixOrder
namespace D5.S3.Quantum.Subentropy.GuessingProbability
open _root_.D5.S3.Quantum.Foundation.FiniteStateChannel
open _root_.D5.S3.Quantum.Information.PartialTraceMutualInformation
variable {X B : Type*} [Fintype X] [Fintype B] [DecidableEq B]
def pGuess (p : X → ℝ) (rho : X → DensityState B) : ℝ :=
  sSup (successProbabilitySet p rho)
```

<a id="obj-219"></a>

### 对象 219 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityGenericity.realCoordinates`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityGenericity.lean:65`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityGenericity
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word)
open D5.S3.Quantum.Algebra
open OpenBoundaryMPSTwoSiteMinimality (originalCore original_chart)
def realCoordinates {ι : Type*} (z : ι → ℂ) : ι ⊕ ι → ℝ :=
  Sum.elim (fun i => (z i).re) (fun i => (z i).im)
```

<a id="obj-220"></a>

### 对象 220 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityGenericity.transferMatrix`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityGenericity.lean:79`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityGenericity
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word)
open D5.S3.Quantum.Algebra
open OpenBoundaryMPSTwoSiteMinimality (originalCore original_chart)
def transferMatrix (A : Fin 2 → Bond) :
    Matrix (Fin 2 × Fin 2) (Fin 2 × Fin 2) ℂ :=
  fun ij kl => ∑ s : Fin 2, A s ij.1 kl.1 * star (A s ij.2 kl.2)
```

<a id="obj-221"></a>

### 对象 221 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityGenericity.fixedTensor`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityGenericity.lean:182`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityGenericity
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word)
open D5.S3.Quantum.Algebra
open OpenBoundaryMPSTwoSiteMinimality (originalCore original_chart)
def fixedTensor (Q : Matrix (Word 3) (Word 3) ℂ) : Word 3 → ℂ :=
  fun u => Q u (fun _ => 0)
```

<a id="obj-222"></a>

### 对象 222 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery.amplitudeColumns`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.lean:28`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery
open scoped BigOperators Matrix
open Matrix
open OpenBoundaryMPSMarginalBirationality
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
noncomputable section
def amplitudeColumns (k m : ℕ) (ψ : Word (k + m) → ℂ) :
    Matrix (Word k) (Word m) ℂ := fun u b => ψ (Fin.append u b)
```

<a id="obj-223"></a>

### 对象 223 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery.rawPrefix`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.lean:32`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery
open scoped BigOperators Matrix
open Matrix
open OpenBoundaryMPSMarginalBirationality
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
noncomputable section
def rawPrefix (k m : ℕ) (ψ : Word (k + m) → ℂ) :
    Matrix (Word k) (Word k) ℂ :=
  amplitudeColumns k m ψ * (amplitudeColumns k m ψ)ᴴ
```

<a id="obj-224"></a>

### 对象 224 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery.transfer`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.lean:45`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery
open scoped BigOperators Matrix
open Matrix
open OpenBoundaryMPSMarginalBirationality
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
noncomputable section
def transfer (A : Fin 2 → Bond) (X : Bond) : Bond :=
  ∑ i : Fin 2, A i * X * (A i)ᴴ
```

<a id="obj-225"></a>

### 对象 225 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery.canonicalCore`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.lean:49`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery
open scoped BigOperators Matrix
open Matrix
open OpenBoundaryMPSMarginalBirationality
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
noncomputable section
def canonicalCore (t : Word 3 → ℂ) : Fin 2 → Bond := reconstructedMatrix t
```

<a id="obj-226"></a>

### 对象 226 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery.ObservableChart`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.lean:232`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSDensityRecovery
open scoped BigOperators Matrix
open Matrix
open OpenBoundaryMPSMarginalBirationality
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
noncomputable section
def ObservableChart (m : ℕ) (ψ : Word (3 + m) → ℂ) : Prop :=
  ∃ v : Word 3 → ℂ,
    let t := rawPrefix 3 m ψ *ᵥ v
    MvPolynomial.eval t chartPoly ≠ 0 ∧ Function.Injective (transfer (canonicalCore t))
```

<a id="obj-227"></a>

### 对象 227 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorCommonCore.interiorColumns`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorCommonCore.lean:32`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorCommonCore
open scoped BigOperators Matrix ComplexOrder Kronecker
open Matrix
open PeriodicMPSParentIntersection
open OpenBoundaryMPSMarginalBirationality (mpsState)
open OpenBoundaryMPSDensityRecovery
noncomputable section
def interiorColumns (p k q : ℕ) (ψ : Word ((p + k) + q) → ℂ) :
    Matrix (Word k) (Word p × Word q) ℂ :=
  fun u ab => ψ (Fin.append (Fin.append ab.1 u) ab.2)
```

<a id="obj-228"></a>

### 对象 228 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorCommonCore.rawInterior`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorCommonCore.lean:37`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorCommonCore
open scoped BigOperators Matrix ComplexOrder Kronecker
open Matrix
open PeriodicMPSParentIntersection
open OpenBoundaryMPSMarginalBirationality (mpsState)
open OpenBoundaryMPSDensityRecovery
noncomputable section
def rawInterior (p k q : ℕ) (ψ : Word ((p + k) + q) → ℂ) :
    Matrix (Word k) (Word k) ℂ :=
  interiorColumns p k q ψ * (interiorColumns p k q ψ)ᴴ
```

<a id="obj-229"></a>

### 对象 229 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorCommonCore.dualTransfer`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorCommonCore.lean:51`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorCommonCore
open scoped BigOperators Matrix ComplexOrder Kronecker
open Matrix
open PeriodicMPSParentIntersection
open OpenBoundaryMPSMarginalBirationality (mpsState)
open OpenBoundaryMPSDensityRecovery
noncomputable section
def dualTransfer (A : Fin 2 → Bond) (X : Bond) : Bond :=
  ∑ i : Fin 2, (A i)ᴴ * X * A i
```

<a id="obj-230"></a>

### 对象 230 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorGenericity.castState`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorGenericity.lean:238`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology ComplexOrder
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorGenericity
open PeriodicMPSParentIntersection (Bond Word TwoSiteSpanning)
open OpenBoundaryMPSMarginalBirationality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSIntrinsicQ2Fiber
open OpenBoundaryMPSInteriorCommonCore
open OpenBoundaryMPSQuotient hiding coreCoordinates
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval realCoordinates fixedTensor recoveryPolynomial
    recoveryPolynomial_ne_zero)
def castState {n n' : ℕ} (h : n = n') (f : Word n' → ℂ) : Word n → ℂ :=
  fun w => f (fun i => w (Fin.cast h.symm i))
```

<a id="obj-231"></a>

### 对象 231 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorGenericity.intrinsicInteriorRecovery`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSInteriorGenericity.lean:278`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology ComplexOrder
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSInteriorGenericity
open PeriodicMPSParentIntersection (Bond Word TwoSiteSpanning)
open OpenBoundaryMPSMarginalBirationality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSIntrinsicQ2Fiber
open OpenBoundaryMPSInteriorCommonCore
open OpenBoundaryMPSQuotient hiding coreCoordinates
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval realCoordinates fixedTensor recoveryPolynomial
    recoveryPolynomial_ne_zero)
def intrinsicInteriorRecovery (m : ℕ) : Prop :=
  ∃ R : MvPolynomial (ObsIndex ⊕ ObsIndex) ℝ, R ≠ 0 ∧
    (actualPrincipalLocus m R).Nonempty ∧ IsOpen (actualPrincipalLocus m R) ∧
    Dense (actualPrincipalLocus m R) ∧
    (∀ (ψ : openBoundaryMPS (3 + m)) (z : ℂ), ‖z‖ = 1 →
      ∃ hz : z • (ψ : Word (3 + m) → ℂ) ∈ openBoundaryMPS (3 + m),
        (⟨z • (ψ : Word (3 + m) → ℂ), hz⟩ ∈ actualPrincipalLocus m R ↔
          ψ ∈ actualPrincipalLocus m R)) ∧
    ∀ ψ : openBoundaryMPS (3 + m), ψ ∈ actualPrincipalLocus m R →
      let x := quotientCoordinates13 (quotientCoordinates m (rawPrefix 3 m ψ))
      let θ := positiveRepresentative x
      0 < sigma x ∧
      (∃ z : ℂ, ‖z‖ = 1 ∧ (ψ : Word (3 + m) → ℂ) = z • state (3 + m) θ) ∧
      TwoSiteSpanning (core θ) ∧ Function.Injective (transfer (core θ)) ∧
      (∀ k : ℕ, 1 ≤ k →
        ((dualTransfer (core θ))^[k] (vecMulVec (star (left θ)) (left θ))).PosDef ∧
        ((transfer (core θ))^[k] (vecMulVec (right θ) (star (right θ)))).PosDef) ∧
      ∀ p q : ℕ, 1 ≤ p → 1 ≤ q → p + q = m →
        ∀ h : ((p + 3) + q) = 3 + m, ∀ φ : openBoundaryMPS (3 + m),
          rawInterior p 3 q (castState h φ) = rawInterior p 3 q (castState h ψ) ↔
            ∃ z : ℂ, ‖z‖ = 1 ∧ (φ : Word (3 + m) → ℂ) = z • (ψ : Word (3 + m) → ℂ)
```

<a id="obj-232"></a>

### 对象 232 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.mpsState`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:22`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def mpsState (n : ℕ) (a₀ a₁ : Matrix (Fin 2) (Fin 2) ℂ)
    (b₀ b₁ : Fin 2 → ℂ) : (Fin n → Fin 2) → ℂ :=
  fun w => dotProduct b₀
    ((List.ofFn fun j => (![a₀, a₁] : Fin 2 → Matrix (Fin 2) (Fin 2) ℂ) (w j)).prod
      *ᵥ b₁)
```

<a id="obj-233"></a>

### 对象 233 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.openBoundaryMPS`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:29`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def openBoundaryMPS (n : ℕ) : Set ((Fin n → Fin 2) → ℂ) :=
  {ψ | ∃ a₀ a₁ b₀ b₁, ψ = mpsState n a₀ a₁ b₀ b₁}
```

<a id="obj-234"></a>

### 对象 234 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.coordinate`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:162`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def coordinate (i j k : Fin 2) : MvPolynomial (Fin 3 → Fin 2) ℂ :=
  MvPolynomial.X ![i, j, k]
```

<a id="obj-235"></a>

### 对象 235 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.kernelMatrix`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:164`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def kernelMatrix : Matrix (Fin 4) (Fin 4) (MvPolynomial (Fin 3 → Fin 2) ℂ) :=
  !![coordinate 0 0 0, coordinate 0 0 1, -coordinate 0 0 0, -coordinate 1 0 0;
     coordinate 0 1 0, coordinate 0 1 1, -coordinate 0 0 1, -coordinate 1 0 1;
     coordinate 1 0 0, coordinate 1 0 1, -coordinate 0 1 0, -coordinate 1 1 0;
     coordinate 1 1 0, coordinate 1 1 1, -coordinate 0 1 1, -coordinate 1 1 1]
```

<a id="obj-236"></a>

### 对象 236 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.kernelMinor`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:169`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def kernelMinor : Matrix (Fin 3) (Fin 3) (MvPolynomial (Fin 3 → Fin 2) ℂ) :=
  kernelMatrix.submatrix (Fin.castLE (by omega)) (Fin.castLE (by omega))
```

<a id="obj-237"></a>

### 对象 237 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.minorPoly`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:171`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def minorPoly : MvPolynomial (Fin 3 → Fin 2) ℂ := kernelMinor.det
```

<a id="obj-238"></a>

### 对象 238 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.cramerNumerator`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:172`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def cramerNumerator : Fin 3 → MvPolynomial (Fin 3 → Fin 2) ℂ :=
  kernelMinor.cramer (fun i => -kernelMatrix (Fin.castLE (by omega) i) 3)
```

<a id="obj-239"></a>

### 对象 239 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.leftNumerator`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:174`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def leftNumerator : Fin 2 → MvPolynomial (Fin 3 → Fin 2) ℂ :=
  ![cramerNumerator 2, minorPoly]
```

<a id="obj-240"></a>

### 对象 240 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.slicePoly`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:178`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def slicePoly (j : Fin 2) :
    Matrix (Fin 2) (Fin 2) (MvPolynomial (Fin 3 → Fin 2) ℂ) :=
  fun i k => coordinate i j k
```

<a id="obj-241"></a>

### 对象 241 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.basisNumerator`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:181`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def basisNumerator :
    Matrix (Fin 2) (Fin 2) (MvPolynomial (Fin 3 → Fin 2) ℂ) :=
  fun i k => dotProduct leftNumerator (fun j => coordinate j i k)
```

<a id="obj-242"></a>

### 对象 242 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.matrixNumerator`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:184`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def matrixNumerator (j : Fin 2) :
    Matrix (Fin 2) (Fin 2) (MvPolynomial (Fin 3 → Fin 2) ℂ) :=
  slicePoly j * basisNumerator.adjugate
```

<a id="obj-243"></a>

### 对象 243 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.sumNumerator`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:187`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def sumNumerator :
    Matrix (Fin 2) (Fin 2) (MvPolynomial (Fin 3 → Fin 2) ℂ) :=
  matrixNumerator 0 + matrixNumerator 1
```

<a id="obj-244"></a>

### 对象 244 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.chartPoly`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:192`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def chartPoly : MvPolynomial (Fin 3 → Fin 2) ℂ :=
  minorPoly * basisNumerator.det * sumNumerator.det *
    (coordinate 0 0 0 * coordinate 1 0 1 - coordinate 0 0 1 * coordinate 1 0 0) *
    (coordinate 0 0 0 * coordinate 0 1 1 - coordinate 0 0 1 * coordinate 0 1 0)
```

<a id="obj-245"></a>

### 对象 245 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.reconstructedLeft`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:207`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def reconstructedLeft (t : (Fin 3 → Fin 2) → ℂ) : Fin 2 → ℂ :=
  fun i => MvPolynomial.eval t (leftNumerator i) / MvPolynomial.eval t minorPoly
```

<a id="obj-246"></a>

### 对象 246 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.reconstructedBasis`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:211`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
private def reconstructedBasis (t : (Fin 3 → Fin 2) → ℂ) : Matrix (Fin 2) (Fin 2) ℂ :=
  fun i k => MvPolynomial.eval t (basisNumerator i k) / MvPolynomial.eval t minorPoly
```

<a id="obj-247"></a>

### 对象 247 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality.reconstructedMatrix`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSMarginalBirationality.lean:213`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSMarginalBirationality
open scoped BigOperators Matrix
noncomputable section
def reconstructedMatrix (t : (Fin 3 → Fin 2) → ℂ) (j : Fin 2) :
    Matrix (Fin 2) (Fin 2) ℂ :=
  Matrix.of (fun i k => t ![i, j, k]) * (reconstructedBasis t)⁻¹
```

<a id="obj-248"></a>

### 对象 248 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.Coordinates`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:35`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
abbrev Coordinates := Fin 13 → ℝ
```

<a id="obj-249"></a>

### 对象 249 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.coreCoordinates`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:39`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
def coreCoordinates (x : Coordinates) (i : Fin 5) : ℂ :=
  ⟨x ⟨i.val, by omega⟩, x ⟨i.val + 5, by omega⟩⟩
```

<a id="obj-250"></a>

### 对象 250 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.sigma`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:42`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
def sigma (x : Coordinates) : ℝ := x 10
```

<a id="obj-251"></a>

### 对象 251 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.eta`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:43`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
def eta (x : Coordinates) : ℂ := ⟨x 11, x 12⟩
```

<a id="obj-252"></a>

### 对象 252 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.positiveRepresentative`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:46`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
def positiveRepresentative (x : Coordinates) : Parameter :=
  (coreCoordinates x, Real.sqrt (sigma x), (Real.sqrt (sigma x) : ℂ) * eta x)
```

<a id="obj-253"></a>

### 对象 253 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.QuotientIndex`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:400`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
abbrev QuotientIndex := OpenBoundaryMPSQuotient.QuotientRealIndex
```

<a id="obj-254"></a>

### 对象 254 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.quotientIndexEquiv`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:402`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
def quotientIndexEquiv : QuotientIndex ≃ Fin 13 :=
  (Equiv.sumCongr (Equiv.refl (Fin 5)) (finSumFinEquiv (m := 5) (n := 3))).trans
    (finSumFinEquiv (m := 5) (n := 8))
```

<a id="obj-255"></a>

### 对象 255 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.quotientCoordinates13`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:406`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
def quotientCoordinates13 (p : OpenBoundaryMPSQuotient.Quotient) : Coordinates :=
  fun j => OpenBoundaryMPSQuotient.quotientRealCoordinates p (quotientIndexEquiv.symm j)
```

<a id="obj-256"></a>

### 对象 256 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.ObsIndex`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:512`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
abbrev ObsIndex := OpenBoundaryMPSQuotient.ObservationIndex
```

<a id="obj-257"></a>

### 对象 257 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber.actualPrincipalLocus`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQ2PolynomialFiber.lean:622`。

```lean
noncomputable section
open Set Matrix MvPolynomial
open scoped BigOperators Matrix Topology
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQ2PolynomialFiber
open OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSDensityRecovery
open OpenBoundaryMPSDensityGenericity
  (realCoeff imagCoeff coefficient_eval polynomial_nonzero_dense)
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open OpenBoundaryMPSQuotient
open OpenBoundaryMPSMarginalBirationality
def actualPrincipalLocus (m : ℕ) (R : MvPolynomial (ObsIndex ⊕ ObsIndex) ℝ) :
    Set (OpenBoundaryMPSMarginalBirationality.openBoundaryMPS (3 + m)) :=
  {ψ | eval (OpenBoundaryMPSDensityGenericity.realCoordinates
      (fun ij => OpenBoundaryMPSDensityRecovery.rawPrefix 3 m
        (ψ : Word (3 + m) → ℂ) ij.1 ij.2)) R ≠ 0}
```

<a id="obj-258"></a>

### 对象 258 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.coreCoordinates`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:27`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def coreCoordinates (t : Word 3 → ℂ) : Fin 5 → ℂ :=
  ![reconstructedLeft t 0, canonicalCore t 0 0 0, canonicalCore t 0 0 1,
    canonicalCore t 1 0 0, canonicalCore t 1 0 1]
```

<a id="obj-259"></a>

### 对象 259 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.boundaryLeft`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:61`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def boundaryLeft (l : Fin 2 → ℂ) : Matrix (Fin 2) (Word 3) ℂ :=
  fun k w => if w 2 = k then l (w 0) * l (w 1) else 0
```

<a id="obj-260"></a>

### 对象 260 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.leftNumeratorMap`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:117`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def leftNumeratorMap (t : Word 3 → ℂ) : Matrix (Fin 2) (Word 3) ℂ :=
  boundaryLeft (eval t ∘ leftNumerator)
```

<a id="obj-261"></a>

### 对象 261 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.transferNumerator`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:128`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def transferNumerator (t : Word 3 → ℂ) :
    Matrix (Fin 2 × Fin 2) (Fin 2 × Fin 2) ℂ :=
  OpenBoundaryMPSDensityGenericity.transferMatrix (fun i => (eval t).mapMatrix (matrixNumerator i))
```

<a id="obj-262"></a>

### 对象 262 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.modulus`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:133`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def modulus (z : ℂ) : ℂ := z * star z
```

<a id="obj-263"></a>

### 对象 263 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.gramNumerator`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:136`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def gramNumerator (m : ℕ) (Q : Matrix (Word 3) (Word 3) ℂ) : Bond :=
  let t := OpenBoundaryMPSDensityGenericity.fixedTensor Q
  let B := leftNumeratorMap t * Q * (leftNumeratorMap t)ᴴ
  modulus (eval t basisNumerator.det) ^ m •
    (fun i j => ((transferNumerator t).adjugate ^ m *ᵥ (fun kl => B kl.1 kl.2)) (i, j))
```

<a id="obj-264"></a>

### 对象 264 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.gramDenominator`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:143`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def gramDenominator (m : ℕ) (Q : Matrix (Word 3) (Word 3) ℂ) : ℂ :=
  let t := OpenBoundaryMPSDensityGenericity.fixedTensor Q
  modulus (eval t minorPoly) ^ (m + 2) * (transferNumerator t).det ^ m
```

<a id="obj-265"></a>

### 对象 265 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.boundaryGram`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:148`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def boundaryGram (m : ℕ) (Q : Matrix (Word 3) (Word 3) ℂ) : Bond :=
  (gramDenominator m Q)⁻¹ • gramNumerator m Q
```

<a id="obj-266"></a>

### 对象 266 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.ObservationIndex`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:273`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
abbrev ObservationIndex := Word 3 × Word 3
```

<a id="obj-267"></a>

### 对象 267 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.Quotient`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:388`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
abbrev Quotient := OpenBoundaryMPSTwoSiteMinimality.Parameter
```

<a id="obj-268"></a>

### 对象 268 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.quotientCoordinates`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:389`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def quotientCoordinates (m : ℕ) (Q : Matrix (Word 3) (Word 3) ℂ) : Quotient :=
  (coreCoordinates (OpenBoundaryMPSDensityGenericity.fixedTensor Q),
    (boundaryGram m Q 0 0).re, boundaryGram m Q 1 0 / boundaryGram m Q 0 0)
```

<a id="obj-269"></a>

### 对象 269 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.QuotientRealIndex`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:689`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
abbrev QuotientRealIndex := Fin 5 ⊕ (Fin 5 ⊕ Fin 3)
```

<a id="obj-270"></a>

### 对象 270 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient.quotientRealCoordinates`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSQuotient.lean:690`。

```lean
set_option autoImplicit false
noncomputable section
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSQuotient
open Matrix MvPolynomial
open scoped BigOperators Matrix
open OpenBoundaryMPSMarginalBirationality OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word wordMatrix)
open D5.S3.Quantum.Algebra
def quotientRealCoordinates (p : Quotient) : QuotientRealIndex → ℝ :=
  Sum.elim (fun i => (p.1 i).re)
    (Sum.elim (fun i => (p.1 i).im) (fun i => ![p.2.1, p.2.2.re, p.2.2.im] i))
```

<a id="obj-271"></a>

### 对象 271 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality.Parameter`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSTwoSiteMinimality.lean:36`。

```lean
noncomputable section
open Matrix Set
open scoped BigOperators Matrix Matrix.Norms.Elementwise ComplexOrder
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSMarginalBirationality
open OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word)
abbrev Parameter := (Fin 5 → ℂ) × ℝ × ℂ
```

<a id="obj-272"></a>

### 对象 272 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality.left`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSTwoSiteMinimality.lean:41`。

```lean
noncomputable section
open Matrix Set
open scoped BigOperators Matrix Matrix.Norms.Elementwise ComplexOrder
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSMarginalBirationality
open OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word)
def left (θ : Parameter) : Fin 2 → ℂ := ![θ.1 0, 1]
```

<a id="obj-273"></a>

### 对象 273 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality.core`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSTwoSiteMinimality.lean:43`。

```lean
noncomputable section
open Matrix Set
open scoped BigOperators Matrix Matrix.Norms.Elementwise ComplexOrder
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSMarginalBirationality
open OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word)
def core (θ : Parameter) : Fin 2 → Bond :=
  ![!![θ.1 1, θ.1 2; 1 - θ.1 0 * θ.1 1, -θ.1 0 * θ.1 2],
    !![θ.1 3, θ.1 4; -θ.1 0 * θ.1 3, 1 - θ.1 0 * θ.1 4]]
```

<a id="obj-274"></a>

### 对象 274 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality.right`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSTwoSiteMinimality.lean:47`。

```lean
noncomputable section
open Matrix Set
open scoped BigOperators Matrix Matrix.Norms.Elementwise ComplexOrder
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSMarginalBirationality
open OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word)
def right (θ : Parameter) : Fin 2 → ℂ := ![(θ.2.1 : ℂ), θ.2.2]
```

<a id="obj-275"></a>

### 对象 275 `D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality.state`

来源：`D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSTwoSiteMinimality.lean:49`。

```lean
noncomputable section
open Matrix Set
open scoped BigOperators Matrix Matrix.Norms.Elementwise ComplexOrder
namespace D5.S3.Quantum.TensorNetworks.OpenBoundaryMPSTwoSiteMinimality
open OpenBoundaryMPSMarginalBirationality
open OpenBoundaryMPSDensityRecovery
open PeriodicMPSParentIntersection (Bond Word)
def state (n : ℕ) (θ : Parameter) : Word n → ℂ :=
  mpsState n (core θ 0) (core θ 1) (left θ) (right θ)
```

<a id="obj-276"></a>

### 对象 276 `D5.S3.Quantum.TensorNetworks.PeriodicMPSParentIntersection.Bond`

来源：`D5/S3/Quantum/TensorNetworks/PeriodicMPSParentIntersection.lean:31`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.PeriodicMPSParentIntersection
open scoped BigOperators Matrix
noncomputable section
abbrev Bond := Matrix (Fin 2) (Fin 2) ℂ
```

<a id="obj-277"></a>

### 对象 277 `D5.S3.Quantum.TensorNetworks.PeriodicMPSParentIntersection.Word`

来源：`D5/S3/Quantum/TensorNetworks/PeriodicMPSParentIntersection.lean:32`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.PeriodicMPSParentIntersection
open scoped BigOperators Matrix
noncomputable section
abbrev Word (n : ℕ) := Fin n → Fin 2
```

<a id="obj-278"></a>

### 对象 278 `D5.S3.Quantum.TensorNetworks.PeriodicMPSParentIntersection.TwoSiteSpanning`

来源：`D5/S3/Quantum/TensorNetworks/PeriodicMPSParentIntersection.lean:40`。

```lean
set_option autoImplicit false
namespace D5.S3.Quantum.TensorNetworks.PeriodicMPSParentIntersection
open scoped BigOperators Matrix
noncomputable section
def TwoSiteSpanning (A : Fin 2 → Bond) : Prop :=
  Submodule.span ℂ (Set.range fun p : Fin 2 × Fin 2 => A p.1 * A p.2) = ⊤
```

<a id="obj-279"></a>

### 对象 279 `D5.S3.QuantumBounds.CHSHWitness.TwoQubitMatrix`

来源：`D5/S3/QuantumBounds/CHSHWitness.lean:32`。

```lean
namespace D5.S3.QuantumBounds.CHSHWitness
open D5.S3.Quantum.FiniteDimensional
open D5.S3.Quantum.QubitWitnesses
open scoped ComplexOrder
open scoped Kronecker
abbrev TwoQubitMatrix := Matrix (Fin 2 × Fin 2) (Fin 2 × Fin 2) ℂ
```

<a id="obj-280"></a>

### 对象 280 `D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation.Mat`

来源：`D5/S3/QuantumChannels/CoPRelativeQuantumnessRefutation.lean:48`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
noncomputable section
namespace D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation
private abbrev Mat (d : ℕ) := Matrix (Fin d) (Fin d) ℂ
```

<a id="obj-281"></a>

### 对象 281 `D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation.pauli`

来源：`D5/S3/QuantumChannels/CoPRelativeQuantumnessRefutation.lean:73`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
noncomputable section
namespace D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation
def pauli (z x : ℝ) : Mat 2 := !![(z : ℂ), (x : ℂ); (x : ℂ), -(z : ℂ)]
```

<a id="obj-282"></a>

### 对象 282 `D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation.t`

来源：`D5/S3/QuantumChannels/CoPRelativeQuantumnessRefutation.lean:75`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
noncomputable section
namespace D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation
private def t (n : ℕ) : ℝ := (4^n-1)/(4^n+1)
```

<a id="obj-283"></a>

### 对象 283 `D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation.Z`

来源：`D5/S3/QuantumChannels/CoPRelativeQuantumnessRefutation.lean:79`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
noncomputable section
namespace D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation
private def Z : Mat 2 := pauli 1 0
```

<a id="obj-284"></a>

### 对象 284 `D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation.H`

来源：`D5/S3/QuantumChannels/CoPRelativeQuantumnessRefutation.lean:81`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
noncomputable section
namespace D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation
private def H : Mat 2 := pauli (11/14) (5*Real.sqrt 3/14)
```

<a id="obj-285"></a>

### 对象 285 `D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation.ε`

来源：`D5/S3/QuantumChannels/CoPRelativeQuantumnessRefutation.lean:130`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
noncomputable section
namespace D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation
private def ε : ℝ := 1/65537
```

<a id="obj-286"></a>

### 对象 286 `D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation.ρ`

来源：`D5/S3/QuantumChannels/CoPRelativeQuantumnessRefutation.lean:132`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
noncomputable section
namespace D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation
private def ρ : Mat 2 := (1/2:ℝ) • 1 + (t 7/(2*(1-ε))) • Z
```

<a id="obj-287"></a>

### 对象 287 `D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation.σ`

来源：`D5/S3/QuantumChannels/CoPRelativeQuantumnessRefutation.lean:134`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
noncomputable section
namespace D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation
private def σ : Mat 2 := (1/2:ℝ) • 1 + (t 8/(2*(1-ε))) • H
```

<a id="obj-288"></a>

### 对象 288 `D5.S3.QuantumChannels.PauliThreeWeightBayesianInverseUniqueness.sigma`

来源：`D5/S3/QuantumChannels/PauliThreeWeightBayesianInverseUniqueness.lean:28`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option linter.style.longLine false
open scoped BigOperators ComplexOrder MatrixOrder
open Matrix
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity IsCPTP)
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence (Pauli pauliMatrix)
open D5.S3.Quantum.FiniteDimensional (qubitX qubitZ qubit_weyl_star)
noncomputable section
namespace D5.S3.QuantumChannels.PauliThreeWeightBayesianInverseUniqueness
def sigma : Fin 4 → Matrix (Fin 2) (Fin 2) ℂ :=
  ![pauliMatrix .I, pauliMatrix .X, pauliMatrix .Y, pauliMatrix .Z]
```

<a id="obj-289"></a>

### 对象 289 `D5.S3.QuantumChannels.PauliThreeWeightBayesianInverseUniqueness.spin`

来源：`D5/S3/QuantumChannels/PauliThreeWeightBayesianInverseUniqueness.lean:134`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
set_option linter.style.longLine false
open scoped BigOperators ComplexOrder MatrixOrder
open Matrix
open D5.S3.Quantum.Foundation.FiniteKrausChannel.PhyslibLeaf
open D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation (IsDensity IsCPTP)
open D5.S3.Quantum.Information.StabilizerPairLocalUnitaryInequivalence (Pauli pauliMatrix)
open D5.S3.Quantum.FiniteDimensional (qubitX qubitZ qubit_weyl_star)
noncomputable section
namespace D5.S3.QuantumChannels.PauliThreeWeightBayesianInverseUniqueness
def spin (r : Fin 3 → ℝ) : Matrix (Fin 2) (Fin 2) ℂ :=
  ∑ i, (r i : ℂ) • sigma i.succ
```

<a id="obj-290"></a>

### 对象 290 `D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation.IsDensity`

来源：`D5/S3/QuantumStates/DensitySpan.lean:27`。

```lean
set_option autoImplicit false
set_option relaxedAutoImplicit false
noncomputable section
open scoped BigOperators ComplexOrder MatrixOrder Matrix.Norms.L2Operator
open Matrix
open D5.S3.Quantum.Measurement.BasisMeasurementProjection (HermitianSpace)
namespace D5.S3.QuantumChannels.CoPRelativeQuantumnessRefutation
def IsDensity {d : ℕ} (A : Matrix (Fin d) (Fin d) ℂ) : Prop :=
  A.PosSemidef ∧ Matrix.trace A = 1
```

<a id="obj-291"></a>

### 对象 291 `D5.S3.Resource.CompositeConeDuality.CompositeMatrix`

来源：`D5/S3/Resource/CompositeConeDuality.lean:28`。

```lean
namespace D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.CompositeCones
open scoped Kronecker
open scoped ComplexOrder
variable {m n : ℕ}
abbrev CompositeMatrix (m n : ℕ) := Matrix (Fin m × Fin n) (Fin m × Fin n) ℂ
```

<a id="obj-292"></a>

### 对象 292 `D5.S3.Resource.CompositeConeDuality.pairing`

来源：`D5/S3/Resource/CompositeConeDuality.lean:31`。

```lean
namespace D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.CompositeCones
open scoped Kronecker
open scoped ComplexOrder
variable {m n : ℕ}
noncomputable def pairing (S W : CompositeMatrix m n) : ℝ :=
  RCLike.re (Matrix.trace (Matrix.conjTranspose S * W))
```

<a id="obj-293"></a>

### 对象 293 `D5.S3.Resource.CompositeCones.separableCone`

来源：`D5/S3/Resource/CompositeCones.lean:35`。

```lean
namespace D5.S3.Resource.CompositeCones
open scoped Kronecker
open scoped ComplexOrder
def separableCone {m n : ℕ} (W : Matrix (Fin m × Fin n) (Fin m × Fin n) ℂ) : Prop :=
  ∃ k : ℕ,
    ∃ A : Fin k → Matrix (Fin m) (Fin m) ℂ,
      ∃ B : Fin k → Matrix (Fin n) (Fin n) ℂ,
        (∀ i, (A i).PosSemidef ∧ (B i).PosSemidef) ∧
          W = ∑ i : Fin k, A i ⊗ₖ B i
```

<a id="obj-294"></a>

### 对象 294 `D5.S3.Resource.CompositeCones.blockPositive`

来源：`D5/S3/Resource/CompositeCones.lean:43`。

```lean
namespace D5.S3.Resource.CompositeCones
open scoped Kronecker
open scoped ComplexOrder
def blockPositive {m n : ℕ} (W : Matrix (Fin m × Fin n) (Fin m × Fin n) ℂ) : Prop :=
  ∀ (a : Fin m → ℂ) (b : Fin n → ℂ),
    0 ≤ RCLike.re
      (dotProduct (star (fun ij : Fin m × Fin n => a ij.1 * b ij.2))
        (Matrix.mulVec W (fun ij : Fin m × Fin n => a ij.1 * b ij.2)))
```

<a id="obj-295"></a>

### 对象 295 `D5.S3.Resource.SeparableConeClosed.CompositeMatrix`

来源：`D5/S3/Resource/SeparableConeClosed.lean:34`。

```lean
namespace D5.S3.Resource.SeparableConeClosed
noncomputable section
set_option maxHeartbeats 0
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness
open scoped Kronecker ComplexOrder InnerProductSpace
variable {m n : ℕ}
abbrev CompositeMatrix (m n : ℕ) := Matrix (Fin m × Fin n) (Fin m × Fin n) ℂ
```

<a id="obj-296"></a>

### 对象 296 `D5.S3.Resource.SeparableConeResidualWitness.EntrySpace`

来源：`D5/S3/Resource/SeparableConeResidualWitness.lean:33`。

```lean
namespace D5.S3.Resource.SeparableConeResidualWitness
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness (separableCone_zero separableCone_add separableCone_smul)
open D5.S3.Resource.SeparableConeClosed (isClosed_separableCone)
open D5.S3.Observer.Separation.ConeResidualWitness
open D5.S3.Observer.Separation.MoreauDecomposition
open scoped RealInnerProductSpace Kronecker ComplexOrder
noncomputable section
variable {m n : ℕ}
abbrev EntrySpace (m n : ℕ) :=
  EuclideanSpace ℂ ((Fin m × Fin n) × (Fin m × Fin n))
```

<a id="obj-297"></a>

### 对象 297 `D5.S3.Resource.SeparableConeResidualWitness.entryLinear`

来源：`D5/S3/Resource/SeparableConeResidualWitness.lean:36`。

```lean
namespace D5.S3.Resource.SeparableConeResidualWitness
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness (separableCone_zero separableCone_add separableCone_smul)
open D5.S3.Resource.SeparableConeClosed (isClosed_separableCone)
open D5.S3.Observer.Separation.ConeResidualWitness
open D5.S3.Observer.Separation.MoreauDecomposition
open scoped RealInnerProductSpace Kronecker ComplexOrder
noncomputable section
variable {m n : ℕ}
private def entryLinear : CompositeMatrix m n ≃ₗ[ℝ]
    (((Fin m × Fin n) × (Fin m × Fin n)) → ℂ) where
  toFun A ij := A ij.1 ij.2
  invFun v i j := v (i, j)
  left_inv _ := rfl
  right_inv _ := rfl
  map_add' _ _ := rfl
  map_smul' _ _ := rfl
```

<a id="obj-298"></a>

### 对象 298 `D5.S3.Resource.SeparableConeResidualWitness.entryEquiv`

来源：`D5/S3/Resource/SeparableConeResidualWitness.lean:46`。

```lean
namespace D5.S3.Resource.SeparableConeResidualWitness
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness (separableCone_zero separableCone_add separableCone_smul)
open D5.S3.Resource.SeparableConeClosed (isClosed_separableCone)
open D5.S3.Observer.Separation.ConeResidualWitness
open D5.S3.Observer.Separation.MoreauDecomposition
open scoped RealInnerProductSpace Kronecker ComplexOrder
noncomputable section
variable {m n : ℕ}
def entryEquiv : CompositeMatrix m n ≃L[ℝ] EntrySpace m n :=
  entryLinear.toContinuousLinearEquiv.trans
    (((EuclideanSpace.equiv _ _).toLinearEquiv.restrictScalars ℝ).toContinuousLinearEquiv).symm
```

<a id="obj-299"></a>

### 对象 299 `D5.S3.Resource.SeparableConeResidualWitness.distanceSq`

来源：`D5/S3/Resource/SeparableConeResidualWitness.lean:68`。

```lean
namespace D5.S3.Resource.SeparableConeResidualWitness
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness (separableCone_zero separableCone_add separableCone_smul)
open D5.S3.Resource.SeparableConeClosed (isClosed_separableCone)
open D5.S3.Observer.Separation.ConeResidualWitness
open D5.S3.Observer.Separation.MoreauDecomposition
open scoped RealInnerProductSpace Kronecker ComplexOrder
noncomputable section
variable {m n : ℕ}
def distanceSq (R P : CompositeMatrix m n) : ℝ := pairing (R - P) (R - P)
```

<a id="obj-300"></a>

### 对象 300 `D5.S3.Resource.SeparableConeResidualWitness.sourceGenerators`

来源：`D5/S3/Resource/SeparableConeResidualWitness.lean:75`。

```lean
namespace D5.S3.Resource.SeparableConeResidualWitness
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness (separableCone_zero separableCone_add separableCone_smul)
open D5.S3.Resource.SeparableConeClosed (isClosed_separableCone)
open D5.S3.Observer.Separation.ConeResidualWitness
open D5.S3.Observer.Separation.MoreauDecomposition
open scoped RealInnerProductSpace Kronecker ComplexOrder
noncomputable section
variable {m n : ℕ}
def sourceGenerators (m n : ℕ) : Set (CompositeMatrix m n) :=
  {S | ∃ A : Matrix (Fin m) (Fin m) ℂ, ∃ B : Matrix (Fin n) (Fin n) ℂ,
    A.PosSemidef ∧ B.PosSemidef ∧ S = A ⊗ₖ B}
```

<a id="obj-301"></a>

### 对象 301 `D5.S3.Resource.SeparableConeResidualWitness.separableProperCone`

来源：`D5/S3/Resource/SeparableConeResidualWitness.lean:108`。

```lean
namespace D5.S3.Resource.SeparableConeResidualWitness
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness (separableCone_zero separableCone_add separableCone_smul)
open D5.S3.Resource.SeparableConeClosed (isClosed_separableCone)
open D5.S3.Observer.Separation.ConeResidualWitness
open D5.S3.Observer.Separation.MoreauDecomposition
open scoped RealInnerProductSpace Kronecker ComplexOrder
noncomputable section
variable {m n : ℕ}
def separableProperCone (m n : ℕ) : ProperCone ℝ (EntrySpace m n) where
  carrier := {v | separableCone ((entryEquiv (m := m) (n := n)).symm v)}
  zero_mem' := by simpa using (separableCone_zero (m := m) (n := n))
  add_mem' := by
    intro x y hx hy
    simpa using separableCone_add hx hy
  smul_mem' := by
    intro c x hx
    change separableCone ((entryEquiv (m := m) (n := n)).symm ((c : ℝ) • x))
    rw [map_smul]
    exact separableCone_smul c.2 hx
  isClosed' := isClosed_separableCone.preimage
    (entryEquiv (m := m) (n := n)).symm.continuous
```

<a id="obj-302"></a>

### 对象 302 `D5.S3.Resource.SeparableConeResidualWitness.Argmin`

来源：`D5/S3/Resource/SeparableConeResidualWitness.lean:142`。

```lean
namespace D5.S3.Resource.SeparableConeResidualWitness
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness (separableCone_zero separableCone_add separableCone_smul)
open D5.S3.Resource.SeparableConeClosed (isClosed_separableCone)
open D5.S3.Observer.Separation.ConeResidualWitness
open D5.S3.Observer.Separation.MoreauDecomposition
open scoped RealInnerProductSpace Kronecker ComplexOrder
noncomputable section
variable {m n : ℕ}
def Argmin (R P : CompositeMatrix m n) : Prop :=
  separableCone P ∧ ∀ Q, separableCone Q → distanceSq R P ≤ distanceSq R Q
```

<a id="obj-303"></a>

### 对象 303 `D5.S3.Resource.SeparableConeResidualWitness.nearestSeparable`

来源：`D5/S3/Resource/SeparableConeResidualWitness.lean:211`。

```lean
namespace D5.S3.Resource.SeparableConeResidualWitness
open D5.S3.Resource.CompositeCones
open D5.S3.Resource.CompositeConeDuality
open D5.S3.Resource.EntanglementWitness (separableCone_zero separableCone_add separableCone_smul)
open D5.S3.Resource.SeparableConeClosed (isClosed_separableCone)
open D5.S3.Observer.Separation.ConeResidualWitness
open D5.S3.Observer.Separation.MoreauDecomposition
open scoped RealInnerProductSpace Kronecker ComplexOrder
noncomputable section
variable {m n : ℕ}
def nearestSeparable (R : CompositeMatrix m n) : CompositeMatrix m n :=
  (existsUnique_argmin R).exists.choose
```

## 6. 程序化门与验收

本规格的唯一主配行就是清单来源。下列脚本须在书库根目录运行；它直接导入 `tools/tbook/lean.py`，通过本地上游的 `git show` 读取固定提交，不采用工作区源码。它检查每条 GID 唯一解析、公开定理种类、冻结名称键、准确行号与模块摘要；同时按完整 Lean 名称检查旧锁的别名，避免换一个后缀就误算成新增。每条候选只分配一个主配，中英两版共享同一环境身份。

```python
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path.cwd() / "tools"))
from tbook import lean

sha = "2733dd6bcf63b9a68e9b0dad2fc783460d2f854f"
upstream = Path("/Users/auricstudio/trureturing")
spec = Path("docs/project/spec-batch-trureturing-20261115.md").read_text()
lock = lean.Lock.load()
assert lock and lock.commit == sha
ledger = lean.Ledger(lock.repo, offline=True, checkout=upstream)
assert ledger.branch_contains(sha, "dev").on_branch is True
pattern = r'^主配：`([^`]+)`；环境：`#([^`]+)`；引用：`lean="([^"\n]+)"`。'
entries = list(re.finditer(pattern, spec, re.M))
assert len(entries) == 34
allowed_existing = "D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation"
old_names = {(d["module"], d["name"]) for d in lock.declarations.values()}
seen_gids, seen_names, seen_ids = set(), set(), set()
for index, match in enumerate(entries):
    file, env_id, gid = match.groups()
    end = entries[index + 1].start() if index + 1 < len(entries) else spec.index("## 5.")
    block = spec[match.end():end]
    assert gid not in seen_gids and env_id not in seen_ids
    seen_gids.add(gid)
    seen_ids.add(env_id)
    result = lean.resolve(ledger, sha, gid)
    lean.locate(ledger, sha, result)
    assert result.kind == "theorem" and result.line > 0
    state = ledger.state(sha, result.module)
    same = [d for d in state["declarations"]
            if lean.name_to_str(lean.parse_name_key(d["declaration_name_key"])) == result.name]
    assert len(same) == 1
    assert not lean.is_private(lean.parse_name_key(same[0]["declaration_name_key"]))
    identity = (result.module, result.name)
    assert identity not in seen_names
    seen_names.add(identity)
    if gid == allowed_existing:
        assert env_id == "thm-gleason-finite-projection" and gid in lock.declarations
    else:
        assert gid not in lock.declarations and identity not in old_names
    assert f"源定位：`{result.module}.lean:{result.line}`" in block
    assert f"模块摘要：`{result.statement_id}`" in block
    assert not re.match(r"ch(?:06|09|15)|ch38-s01|ch39-observer-is-ontological-universe|ch39-s05-s07", file)
print("34 条公开冻结定理；33 条新增，1 条仅补证；重复主配 0；旧锁冲突 0。")
```

实际门结果：**34 条全部唯一解析，33 条不在既有锁中，1 条既有且仅补证；非定理 0，私有声明 0，重复 GID、完整名与环境 ID 均为 0。** 共核对 94 个来源模块的 Git blob；逐条摘录对象 303 项。脚本的身份检查不替代正文陈述审查，也不代表本规格里的教学例已经作为独立定理冻结。

工程检查：

```bash
TRURETURING_DIR=/Users/auricstudio/trureturing ./tbook pin 2733dd6bcf63b9a68e9b0dad2fc783460d2f854f
TRURETURING_DIR=/Users/auricstudio/trureturing ./tbook check --book quantum-geometry
node books/quantum-geometry/viz/tests/lean-declaration-map.test.mjs
```

正式钉版成功；结构检查 0 错误、9 条既有警告；地图测试 583/583 通过。末栏检查使用 `COLS2.at(-1)` 和 `COLS2.length - 1`，并检查末文件为附录；`ArrowLeft`、`End` 与琥珀连线检查作用于真正末栏。附录 E 不是末栏时，仍单独核对它的全部引用与环境筛选。

另按项目规则先运行 `./tbook test --list` 再运行 `./tbook test`。本次锁文件变化触发现行选择器的较宽单元测试范围：共 1141 项，1032 项通过、107 项跳过、2 项因本地缺少 `zopfli` 依赖出错，后续浏览器阶段未启动。随后仅向临时目录安装 `zopfli==0.4.3`，用以下命令复验这两个压缩用例，2/2 通过；仓库的依赖文件未改。因此默认命令的原始运行结果仍记录为环境依赖失败，不能据此宣称整套默认流程已经通过。声明地图的直接浏览器测试已独立通过，未重跑无关媒体套件。

```bash
PYTHONPATH=/tmp/trureturing-5a/python-packages:tools:tools/tests \
  python3 -m unittest test_export_layout.PageCompressionTest -v
```
