# 39.13 Lean 4 零公理形式化基座（OmegaMath）：纯 CIC 内核、规范整数三元载体与单向阴影函子 {#sec-ch39-lean4-zero-axiom-omega-math-architecture}

> *“不需要修改 Lean 4 的底层内核，更绝对不能用 `axiom` 关键字硬塞自定义公理；真正应当构建的，是直接站在 Lean 4 原生无公理的归纳构造演算（CIC）内核之上，绕开 Mathlib 依赖选择公理与实无穷的经典实数（Real）分支，用可计算的类型类接口（class）配规范整数射影载体（structure）建立一套零公理依赖（Zero-Axiom）的 OmegaMath 基础层。”*

在 [§39.12](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md) 确立了无无穷、无超越数的有限有理数学体系 $\mathbf{Math}_\Omega$ 之后，一个最锋利的工程与逻辑落地问题迎面而来：**要在现代交互式定理证明器 Lean 4 中把这座大厦真正建起来，我们究竟需要改动 Lean 4 的底层内核吗？还是直接用 `axiom` 关键字把母公理 $\mathrm{AXIOM}\text{-}\Omega$ 写进头文件？抑或在现有内核之上另辟一条零公理构造路径？**

本节给出终极架构裁决：**分毫不需要改动 Lean 4 坚不可摧的验证内核，更绝对禁止使用 `axiom` 关键字硬塞自定义公理**。真正与 $\mathbf{Math}_\Omega$ 天生同构的，恰恰是尚未导入 `Mathlib.Data.Real.Basic` 之前的 **Lean 4 原生归纳构造演算（Calculus of Inductive Constructions, CIC）裸内核**。只需绕开依赖选择公理与柯西商集的经典实数分支，用**纯整数规范射影结构（`structure`）**消除商公理、用**可计算类型类（`class`）**封装母公理并由实例证成相对无矛盾性、再配一层通往 `Mathlib` 的**单向阴影投影函子 $\Pi_{\mathbb{R}}$**，即可在零外部依赖下跑通 `#print axioms` 输出 **`does not depend on any axioms`** 的可执行 `OmegaMath` 内核（将三层 `OmegaMath` 工程路线图、证明有向无环图膨胀倍率对照与 `OmegaCore` 演进规划标为 **`MODEL`**；将十五条冻结核心定理——完备三元比较四元数同构、弦距读数恒等式、定基流群分解、射影核与旋量玻恩权重同一、四元数流群切比雪夫递推、拉格朗日—格拉姆恒等式、舒尔补二次型极小值可达定理、保格拉姆线性等距唯一延拓、有理六轴无正交开覆盖、既约分母最大公约数约化与连分数收敛子对数长度界、可判定单群素因子剥离定阶、二进制名称比较显式步数界，以及整数四分深度预算完备性与无极限实数上界传递定理——标为绿色 **`LEAN ✓`**；将 CIC 类型论文献、赫德伯格可判定相等性唯一性定理、独立内核审计记录与 Lean `v4.35.0` 编译器实测标为 **`ARGUED` / `NUM`**）。

---

## 39.13.1 核心判据：为何 Lean 4 裸内核天生契合 $\mathbf{Math}_\Omega$，而污染源只在 `Mathlib.Real` 与自定义 `axiom`？ {#sec-ch39-lean4-cic-vs-mathlib-real-and-axiom-trap}

把 Lean 4 拆开审视，它的**底层验证内核（CIC）**与**上层标准分析库（`Mathlib.Real`）**遵循着两套截然不同的数学哲学：

1. **Lean 4 裸内核（CIC）天生“无实无穷、无超越数、无内置选择公理”**：
   在未导入 `Mathlib.Data.Real.Basic` 之前，Lean 4 的核心类型论内核只由依值函数类型（$\Pi$ 类型）、宇宙层级与归纳构造子（`inductive`）连同 $\beta\delta\iota\zeta$ 四类确定性归约规则构成。在裸内核中，自然数 `Nat` 与整数 `Int` 绝非康托尔意义上“事先装满 $\aleph_0$ 个元素的静态实无穷口袋”，而是有限步归纳生成的语法项；内核里既没有实数连续统 $\mathbb{R}$，也没有 $\infty$、$\pi$ 或 $e$，甚至连排中律与选择公理都不内置于归约引擎之中。
   更进一步，按 `PROJECT.md` §13 对 Lean `v4.35.0` 核心库 `Init` 做实机公理审计（`#print axioms`），还能揪出一处极易被忽略的工程细节（`NUM` / `手工推导`）：`Nat.gcd`、`Int.natAbs`、整数除法 `Int.instDiv` 以及命题可判定比较 `Int.decEq`（`=` / `≠`）与 `Int.decLt`（`>`）全部**零公理依赖**；反倒是 `Init` 标准库自带的 `Rat` 类型因在结构体内捆绑了互素命题证明，`Rat.add`、`Rat.mul`、`Rat.div` 暗中触发了 `[propext, Classical.choice, Quot.sound]`（`Rat.inv` 触发 `[propext, Quot.sound]`，整数布尔相等算符 `==` 即 `BEq` 亦引入 `Classical.choice`），且 `Rat.add`、`Rat.mul`、`Rat.div` 与 `Rat.inv` 均会在内核 `decide` 归约时卡住！因此，只要用纯数据对 `(num : Int) × (den : Nat)` 自建十余行规范既约有理数 `QRat` 并一律使用可判定命题分支 `if d = 0 ∨ n = 0`，就能在 `Init` 之上实现百分之百纯粹的**真零公理**算术。
2. **传统 `Mathlib.Real` 的“线性与实无穷展开税”从何而来？**：
   `Mathlib` 为了复现十九世纪柯西—魏尔斯特拉斯实分析，将实数 `Real` 定义为有理数柯西序列模去零极限等价关系的商集，在底层一举引入三大经典公理 `{propext, Classical.choice, Quot.sound}`——尤其是**非构造性选择公理 `Classical.choice`**（文献结果 / `ARGUED`，参见 `PROJECT.md` §14 所录经典分析形式化审计回执）。一旦触碰 `Classical.choice`，整条形式化流水线立即付出两笔沉重代价：
   - **计算瘫痪（`noncomputable` 传染与 `decide` 阻断）**：虽然像 `#eval (1 + 1 : ℝ)` 这类纯有理嵌入还能打印出形式柯西序列包装器，但编译器无法从非构造存在性公理中提取可执行字节码，一旦涉及实数除法 `(1 / 2 : ℝ)`、平方根 `Real.sqrt`、李群指数映射 `NormedSpace.exp`、实导数、经典流形或希尔伯特算子，便会大面积传染 `noncomputable` 标记而彻底阻断 `#eval` 原生 C / 机器码求值，同时 `Classical.choice` 亦使内核反射策略 `by decide` 当场停摆；
   - **证明有向无环图（DAG）膨胀（声明闭包与滤子通行证税，`MODEL` 工程剖析配 `NUM` 实测）**：在 Lean `v4.35.0` 上对四项基准任务（`{0,1/2,1} 与三拍闭合`、`非阿贝尔三元和乐`、`二阶射流曲率`、`有理舒尔补与深度证书`）实测证明声明闭包规模，零公理 `OmegaMath` 栈仅需 **`396 / 372 / 379 / 380`** 个声明且 `#print axioms = ∅`，而 `Mathlib.Real` 对照证明分别膨胀至 **`7,480 / 7,144 / 17,786 / 7,395`** 个声明并携带三大经典公理——尤其在第 3 项求导任务上，仅实导数的 `Filter.Tendsto` 极限滤子支线便将声明闭包推高至 `17,786` 个。
3. **为什么绝对禁止用 `axiom` 关键字硬写 $\mathrm{AXIOM}\text{-}\Omega$？**：
   倘若图一时省事，在 Lean 4 中直接写下 `axiom Ternion : Type` 或 `axiom kappa_refl : ∀ x, kappa x x = 1`，当场就会踩爆两颗逻辑与计算地雷：
   - **炸穿无矛盾防线与外部审计**：Lean 内核无条件采信每一条 `axiom`。一旦手工公理漏掉某个非退化边界条件——例如在未排除零四元组 $o_{\mathrm{zero}} = (0,0,0,0)$ 的原始载体上草率声明 `axiom kappa_refl : ∀ x : ProjTernion, kappa x x = ⟨1, 1⟩`，代入 $x = (0,0,0,0)$ 便会与计算值 `kappa 0 0 = ⟨0, 1⟩` 碰撞，三行之内推出 `⟨0, 1⟩ = ⟨1, 1⟩` 进而证出 `False`（空真爆炸）！同时，`#print axioms` 以及 `lean4lean`、`nanoda`、`con-leche`、`comparator` 等独立内核检查器都会对一切非标准自定义 `axiom` 亮起最高级别审计红灯；
   - **彻底阻断内核 $\iota$-归约**：`axiom` 只是没有归约规则的僵死符号常量，任何包含它的项在内核求值时都会卡在未化简的中性项上，彻底丧失“证明即程序、归约即实验”的构造性威力。

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="cic-kernel-vs-axiom-and-real-tax" height="500"}
**五阶编译验证流水线与三路线公理审计对比**：中央紫色不透明实体三元数球面 $\mathbb{QP}^3$ 与上方三维五阶编译验证棱柱轨（`语法载体 → 类型检查 → ι-归约/decide → #print axioms 审计 → 原生 #eval 机器码`）同台联动；琥珀焦点停在纯 CIC $+$ `OmegaMath` 路线第 4 阶公理审计节点，青色归约束零阻碍贯通全轨并输出 `#print axioms = ∅` 与原生 C 可执行码，对比品红分叉标示的自定义 `axiom` 路线（在 `ι-归约` 处死锁并在零元漏检时塌缩至 `False`）与 `Mathlib.Real` 路线（注入 `{propext, Classical.choice, Quot.sound}`、阻断 `decide` 与 `(1 / 2 : ℝ)` 等 `noncomputable` 运算的 `#eval`，并在求导任务上长出 `Filter.Tendsto` 支线树）。
:::

---

## 39.13.2 在 Lean 4 中构建 `OmegaMath` 的三层“零公理”架构 {#sec-ch39-omega-math-three-layer-zero-axiom-stack}

正确的形式化架构采用**“第 0 层规范整数结构造实例 $+$ 第 1 层类型类抽接口证相容 $+$ 第 2 层单向阴影函子接 `Mathlib`”**的三层无公理设计（`MODEL` 架构总表结合 `NUM` 编译器核验）：

| 架构维度 | 错误路线：硬写 `axiom` 声明 | 传统路线：`Mathlib` 经典 `Real` 栈 | 最优路线：`OmegaMath` 零公理构造栈 |
| :--- | :--- | :--- | :--- |
| **`#print axioms` 审计** | 暴露自定义 `axiom`（丧失无矛盾保证，外部检查器拒收） | 依赖 `{propext, Classical.choice, Quot.sound}` 三大经典公理 | **`does not depend on any axioms`（真零公理）** |
| **可执行性（`#eval`）** | 彻底阻断，全部沦为不可归约常量 | 实数除法、流形与超越函数传染 `noncomputable` | **$100\%$ 可编译为原生 C / 机器码高速求值** |
| **三维三元数与极点** | 抽象无坐标符号，漏边界即推 `False` | 依赖 $\mathbb{R}^4$ 子流形、$\pi$、开方与切空间图册 | **规范齐次整数四元组 `ProjTernion` / `CanonProjTernion`（零奇点、零根号）** |
| **微积分与曲率实现** | 需手工公理化导数算子 | `Filter.Tendsto` 无穷小极限与多卡转移映射 | **二阶射流有理环 $\mathbb{Q}[\eta]/(\eta^3)$ 纯四则代数** |
| **自动形式化证明搜索效率** | 缺乏计算归约，极易掉入假命题陷阱 | 需清偿连续性、可微性与可测性滤子支线子目标 | **核心有理几何、微积分与有限证书由 `decide` 一步归约** |

### 39.13.2.1 第 0 层：免除商集公理（`Quot.sound`）的规范整数三元载体 `ProjTernion` {#sec-ch39-layer0-projternion-zero-quotient}

在 [§39.9](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md) 与 [§39.12](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md) 的罗德里格斯切参数化中，跨越对径赤道仍需切换正逆双卡；而在 Lean 4 第 0 层中，直接采用四元整数模去非零有理缩放的**齐次射影空间 $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$**，可以一步构造出连商类型公理 `Quot.sound` 都完全省去的**唯一规范整数代表元**（`手工推导`）：

- **严格 $3$ 自由度、唯一整数范式与全域零奇点**：对任意非零整数四元组 $(w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$，令 $g = \gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert) \ge 1$，先整除约分得互素四元组 $(w', x', y', z') = (w/g, x/g, y/g, z/g)$，再乘以符号因子 $s \in \{\pm 1\}$ 锁定**首个非零分量为正整数**。于是，$\mathbb{QP}^3$ 上的每一条射影三元数射线都拥有**全宇宙唯一的四元整数身份证**（直接由 `deriving DecidableEq` 零公理判定相等，完全绕开 `Quotient` 与 `Quot.sound`）：
  - 过去停机锚（$s = 0, \kappa = 1$）即 `p0 = (1, 0, 0, 0)`；
  - 现在正交赤道（$s = 1/2, \kappa = 1/2$）即 `pHalf = (1, 1, 0, 0)`；
  - 曾经令平直实数轴除零爆炸的未来对径闭合极点 $[1 : 0]$（原 $\infty$，$s = 1, \kappa = 0$）不过是一枚平平无奇的整数四元组 `pInf = (0, 1, 0, 0)`！
- **连 $\sqrt{2}$ 都彻底消去的纯有理保真度 $\kappa$ 与有理伴随旋转 $\mathrm{Ad}(p) \in \mathrm{SO}(3, \mathbb{Q})$**：
  注意一个精妙绝伦的代数事实（`PROJECT.md` §13 精确加强）：倘若强行要求四元旋量先归一化为单位向量，那么连最简单的 $90^\circ$ 正交赤道态 `pHalf = (1, 1, 0, 0)`（模方 $\lVert p_{\mathrm{Half}}\rVert^2 = 1^2 + 1^2 = 2$ 不是平方数！）都会被迫引入无理根号 $\frac{1 + \mathbf{i}}{\sqrt{2}}$。但在齐次射影三元载体 `ProjTernion` 中，物理可观测量与三维旋转**全部自动平方消根号**：
  1. 玻恩射线保真度是内积的平方除以模方的乘积：
     $$
     \kappa(p, q) \;=\; \frac{\langle p, q\rangle^2}{\lVert p\rVert^2\,\lVert q\rVert^2} \;\in\; \mathbb{Q} \cap [0, 1],
     $$
     对 `pHalf = (1,1,0,0)` 直接给出 $\kappa(p_0, p_{\mathrm{Half}}) = \frac{1^2}{1 \times 2} = \mathbf{\frac{1}{2}}$，全程零根号；
  2. 三维伴随旋转作用 $\mathrm{Ad}(p)(\mathbf{v}) = \frac{p\,\mathbf{v}\,\bar{p}}{\lVert p\rVert^2}$ 分母恰是一次模方 $\lVert p\rVert^2 \in \mathbb{Z}_{\ge 1}$，因此**每一枚**非零整四元组 $p \in \mathbb{Z}^4 \setminus \{0\}$（即便 $\lVert p\rVert^2 = 2$ 非平方数！）都严格诱导出一张纯有理正交矩阵 $\mathrm{Ad}(p) \in \mathrm{SO}(3, \mathbb{Q})$——例如 `pHalf = (1,1,0,0)` 直接诱导出整系数 $90^\circ$ 旋转 $(x, y, z) \mapsto (x, -z, y) \in \mathrm{SO}(3, \mathbb{Z})$！
  3. 由欧拉—拉格朗日四平方乘性恒等式 $\lVert p \cdot q\rVert^2 = \lVert p\rVert^2\,\lVert q\rVert^2$，任意三枚非零整数态的三元比较迁移 $t = a \cdot \bar{b} \cdot c$ 必满足
     $$
     \lVert a \cdot \bar{b} \cdot c\rVert^2 \;=\; \lVert a\rVert^2\,\lVert b\rVert^2\,\lVert c\rVert^2 \;\ge\; 1 \times 1 \times 1 \;=\; 1,
     $$
     在全空间范围内**永远不会落入零四元组 $(0,0,0,0)$，永远不会触发除零异常**！（同时精确区分两层拓扑覆盖：锁定首非零项正号的 `ProjTernion` 模去了全局符号 $\pm 1$，实现射影旋转群 $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$，故 $120^\circ$ 旋子 `g120 = (1,1,1,1)` 三拍即闭合回 `(1,0,0,0)`；若需保留自旋双覆叠 $720^\circ$ 符号记忆，只需只做 $\gcd = 1$ 约分而不锁定首项正负号，此时三拍抵达 `(-1,0,0,0)`、六拍回到 `(+1,0,0,0)`。）

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="canonical-proj-ternion-zero-quotient" height="500"}
**第 0 层规范齐次整数三元载体 `ProjTernion`（免除 `Quot.sound` 与无理根号）**：紫色实体三元球面上，青色整数射线簇 `(2,2,0,0)`、`(-3,-3,0,0)` 经 `Nat.gcd` 约分与首非零正号锁定坍缩至唯一规范锚点 `pHalf = (1,1,0,0)`（模方 `‖p‖² = 2`，无需 `√2` 即给出精确 `κ = 1/2 = 0.5000` 与整系数旋转 `Ad(pHalf) ∈ SO(3, ℤ)`），同屏标出过去锚 `p0 = (1,0,0,0)`、对径闭合极点 `pInf = (0,1,0,0)`（`κ = 0/1 = 0.0000`，零除零奇点）与三拍闭合整旋子 `g120 = (1,1,1,1)`（`κ = 1/4 = 0.2500`）。
:::

### 39.13.2.2 第 1 层：以 `class OmegaSpace` 封装母公理并由规范子类型实例证成相对无矛盾性 {#sec-ch39-layer1-omegaspace-typeclass-consistency}

在第 1 层中，我们将母公理 $\mathrm{AXIOM}\text{-}\Omega$ 的三元比较算子 `triad` 与保真度核 `kappa` 及其六条核心恒等律定义为可计算类型类接口 `class OmegaSpace (M : Type)`，绝不使用 `axiom`。

这里同样有一处必须按 `PROJECT.md` §13 写清的精确类型论边界（`手工推导`）：
- 在未加约束的原始四元整数记录 `ProjTernion`（全体 $\mathbb{Z}^4$）上，`normalize` 虽然将全体输入总化（把 `(0,0,0,0)` 映为 `(1,0,0,0)`，把未约分的 `(2,0,0,0)` 约分为 `(1,0,0,0)`），但全称量化的 `OmegaSpace` 定律在两个退化边界上并不对原始未约分元组逐字成立——对零元组 $z_0 = (0,0,0,0)$ 有 `kappa z0 z0 = ⟨0, 1⟩ ≠ ⟨1, 1⟩` 且 `triad p0 p0 z0 = p0 ≠ z0`；对未约分元组 $z_2 = (2,0,0,0)$ 有 `triad p0 p0 z2 = p0 ≠ z2`；
- 唯有将可判定规范谓词 `IsCanonical (p : ProjTernion) : p ≠ ⟨0,0,0,0⟩ ∧ normalize p = p` 捆绑为规范非零子类型 **`CanonProjTernion`**（因 `ProjTernion` 具零公理可判定相等性，按赫德伯格定理该子类型同样无需 `Quot.sound` 或 `Classical.choice` 即可具构造性可判定相等），由于四元数共轭满足 $u\bar{u} = \lVert u\rVert^2 \ge 1$（纯正整数标量缩放被 `normalize` 精确消去）且 $\langle x u \bar{v}, y u \bar{v}\rangle^2 = \lVert u\rVert^4\lVert v\rVert^4 \langle x, y\rangle^2$，**`OmegaSpace` 的全部六条公理（左右吸收幂等律、三元结合律、保真度自反律、对称律与双侧流群不变律）在 `CanonProjTernion` 上全称无条件成立**！

在数理逻辑上，一旦在无公理的裸 CIC 内核中构造出了 `OmegaSpace` 的非平凡具体实例 `CanonProjTernion`（其中 `pHalf` 与 `qHalf` 显式见证非交换性 `triad pHalf p0 qHalf ≠ triad qHalf p0 pHalf`），就等于**在 CIC 内部构造性地严格证明了 $\mathrm{AXIOM}\text{-}\Omega$ 公理体系自身的相对无矛盾性（Relative Consistency）与非退化可满足性**——从根本上杜绝了手工 `axiom` 隐含矛盾的一切风险。与此同时，二阶射流有理环 `Jet2Rat`（$\mathbb{Q}[\eta]/(\eta^3)$）在一切可逆元（即常数项 $j_0 \neq 0$，对保真度核分母 $1 + x_0^2 \ge 1 > 0$ 在全体 $x_0 \in \mathbb{Q}$ 上恒成立！）上仅凭三次有理乘法便给出精确两项求逆 $(a_0 + a_1\eta + a_2\eta^2)^{-1}$，使微积分曲率验证同样由 `by decide` 一步归约。

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="typeclass-consistency-and-jet2-decide" height="500"}
**第 1 层 `OmegaSpace` 相对相容性核验与 `Jet2Rat` 一步 `decide` 反射**：紫色实体三元球面上实时步进 `omega_zero_axiom_master_check` 的八项合取断言——`{1, 1/2, 0, 1/4}` 有理保真度谱、`g120` 三拍归位 `gStep3 = p0`、左吸收幂等 `triad pHalf pHalf g120 = g120`、两枚整正交半转非对易合成 `(1,1,1,1) ≠ (1,1,1,-1)`，以及 `x₀ = 1` 处 `Jet2Rat.kappaJetAt` 输出精确 `{1/2, -1/2, +1/4}`，并支持切换查看 `CanonProjTernion` 规范子类型如何拦截原始 `(0,0,0,0)` 与 `(2,0,0,0)` 边界反例。
:::

### 39.13.2.3 第 2 层：面向 `Mathlib` 的单向阴影投影函子 $\Pi_{\mathbb{R}}$（不造封闭孤岛） {#sec-ch39-layer2-mathlib-shadow-functor}

构建零公理 `OmegaMath` 基础层，绝不意味着将自己封闭在与主流数学界隔绝的孤岛上。由于规范整数三元数诱导的有理正交群 $\mathrm{SO}(3, \mathbb{Q})$ 在实旋转群 $\mathrm{SO}(3, \mathbb{R})$ 中范数稠密（且凯莱有理点集 $Q(\mathbb{Q}^3) = S^3(\mathbb{Q}) \setminus \{-1\}$ 在单位四元数群 $S^3(\mathbb{R}) \cong \mathrm{SU}(2)$ 中处处稠密），我们只需在第 2 层架设一座极薄的**单向阴影投影函子**：

$$
\Pi_{\mathbb{R}} \;:\; \mathbf{OmegaMath}\text{（零公理可执行内核）} \;\longrightarrow\; \mathbf{Mathlib}\text{（经典实分析外层）}.
$$

在这座双层分工架构中，非阿贝尔三元流群几何、二阶射流曲率、有理分块格拉姆矩阵的舒尔补极小化 $S = A - B C^{-1} B^\top$，以及类似 `BurnolRationalDepthBudget` 的整数四分深度预算证书 $c q < d p \cdot 4^{N+1}$，**全部留在第 0–1 层的零公理可执行域内由 `#eval` 与 `decide` 高速完成**；唯有当下游定理确需表述为传统实数域 $\mathbb{R}$ 或复希尔伯特空间上的不等式时，才在最后一步调用类似 `rationalQuarterDepth_integer_sound` $\Rightarrow$ `rationalQuarterDepth_real_sound` 的无极限有理上界传递引理或有理点稠密延拓，单向投射进 `Mathlib`——既保住了核心引擎的零公理可执行性，又无缝复用 `Mathlib` 既有定理生态。

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="rational-schur-and-shadow-functor-bridge" height="500"}
**第 2 层有理舒尔补证书与单向阴影函子 $\Pi_{\mathbb{R}} : \mathbf{OmegaMath} \to \mathbf{Mathlib}$**：左侧紫色有理三元球面与青色精确格拉姆椭球在零公理域内直接算出有理舒尔补极小值 $S = A - B C^{-1} B^\top$ 与整数四分深度不等式 $c q < d p \cdot 4^{N+1}$（`axioms = ∅`），右侧经单向琥珀投影桥 $\Pi_{\mathbb{R}}$ 无极限传递至外层实连续统壳层 `(1/4)^(N+1) C < p/q`，避免实分析滤子反向污染核心计算层。
:::

---

## 39.13.3 零外部依赖 Lean 4 可执行原型（`v4.35.0` 实机核验）与三步演进路线 {#sec-ch39-lean4-zero-axiom-executable-prototype}

下面这段完整代码**不导入 `Mathlib` 的任何一行代码（零 `import` 语句）**，仅凭 Lean 4（`v4.35.0`）原生裸内核，从零实现了零公理既约有理数 `QRat`、规范齐次整数三元数 `ProjTernion`、二阶无极限微积分环 `Jet2Rat`（$\mathbb{Q}[\eta]/(\eta^3)$）以及 `OmegaSpace` 类型类契约，并用**单条内核反射指令 `by decide`** 一步核验 `{0, 1/2, 1}` 因果有理锚点、`(1,1,1,1)` 三拍精确闭合、两枚整正交旋子非对易合成以及 $x_0 = 1$ 处的二阶代数导数。将本段代码原样送入 `lean --stdin`（`v4.35.0`），编译器零警告通过，末尾 `#print axioms` 逐字输出 **`'omega_zero_axiom_master_check' does not depend on any axioms`**：

```lean
/-- 1. 零公理既约有理数 QRat（纯 Int × Nat 规范代表元，绕开标准库 Rat 内嵌的经典证明项） -/
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

/-- 2. 规范齐次整数三元数 ProjTernion ≅ ℚP³ ≅ SO(3, ℚ)（严格 3 自由度，全域零除零奇点、零无理数） -/
structure ProjTernion where
  w : Int
  x : Int
  y : Int
  z : Int
  deriving Repr, DecidableEq

namespace ProjTernion

/-- 最大公约数约分并锁定首非零项为正，以唯一规范代表元免除 Quot.sound 商公理 -/
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

/-- AXIOM-Ω 无源三元比较迁移算子 [a, b, c] ≡ normalize (a · b̄ · c) -/
def triad (a b c : ProjTernion) : ProjTernion :=
  let t := qmulRaw (qmulRaw a (qconj b)) c
  normalize t.w t.x t.y t.z

def dot (a b : ProjTernion) : Int :=
  a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z

/-- 无根号纯有理玻恩保真度 κ(a, b) = ⟨a, b⟩² / (‖a‖² · ‖b‖²) ∈ ℚ ∩ [0, 1] -/
def kappa (a b : ProjTernion) : QRat :=
  QRat.mkNorm (dot a b * dot a b) (dot a a * dot b b)

end ProjTernion

/-- 3. `{0, 1/2, 1}` 二阶代数射流有理环 ℚ[η]/(η³)：零 lim 极限的精确微积分 -/
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

/-- 两项精确有理求逆 (a₀ + a₁η + a₂η²)⁻¹（当 j₀ ≠ 0 时满足 a * inv a = 1），无需无穷泰勒级数 -/
def inv (a : Jet2Rat) : Jet2Rat :=
  let i0 := QRat.inv a.j0
  let u1 := QRat.mul a.j1 i0
  let u2 := QRat.mul a.j2 i0
  ⟨i0, QRat.sub (QRat.ofInt 0) (QRat.mul i0 u1), QRat.mul i0 (QRat.sub (QRat.mul u1 u1) u2)⟩

def kappaJetAt (x0 : QRat) : Jet2Rat :=
  let x : Jet2Rat := ⟨x0, QRat.ofInt 1, QRat.ofInt 0⟩
  inv (⟨QRat.ofInt 1, QRat.ofInt 0, QRat.ofInt 0⟩ + x * x)

end Jet2Rat

/-- 4. AXIOM-Ω 类型类契约（在规范非零子类型 CanonProjTernion 上全称成立，绝非危险的 axiom 声明） -/
class OmegaSpace (M : Type) where
  triad : M → M → M → M
  kappa : M → M → QRat
  idemp_left  : ∀ x z, triad x x z = z
  idemp_right : ∀ x z, triad x z z = x
  assoc_triad : ∀ x y z u v, triad (triad x y z) u v = triad x y (triad z u v)
  kappa_refl  : ∀ x, kappa x x = ⟨1, 1⟩
  kappa_symm  : ∀ x y, kappa x y = kappa y x
  kappa_inv   : ∀ x y u v, kappa (triad x u v) (triad y u v) = kappa x y

/-- 5. 零公理内核反射验证：同时核验 {0,1/2,1} 锚点、纯整数三拍闭合、非对易自锁与无极限二阶导数 -/
theorem omega_zero_axiom_master_check :
    let p0    : ProjTernion := ⟨1, 0, 0, 0⟩   -- 过去锚 (s=0, κ=1)
    let pHalf : ProjTernion := ⟨1, 1, 0, 0⟩   -- 现在正交赤道 (s=1/2, κ=1/2)
    let pInf  : ProjTernion := ⟨0, 1, 0, 0⟩   -- 未来对径闭合极点 [1:0] (原 ∞, s=1, κ=0)
    let qHalf : ProjTernion := ⟨1, 0, 1, 0⟩   -- 第二正交轴圆弧
    let g120  : ProjTernion := ⟨1, 1, 1, 1⟩   -- 纯整数 120° 三元旋子 (κ=1/4)
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

-- 终极公理审计：实机输出 "'omega_zero_axiom_master_check' does not depend on any axioms"
#print axioms omega_zero_axiom_master_check
```

落到具体的形式化工程演进路线图上，整套 `OmegaMath` 体系分三步梯次推进（`MODEL` 工程路线）：
1. **第一步（零依赖可执行内核 `OmegaCore`）**：以数百行零导入 Lean 4 代码将 `QRat`、`ProjTernion` / `CanonProjTernion`、`Jet2Rat` 与 `OmegaSpace` 完整定型，确保核心几何与二阶微积分定理保持 `#print axioms` 为空且 $100\%$ 支持 `#eval` 原生编译；
2. **第二步（有理格拉姆舒尔补与流群测地算法层）**：在 `OmegaCore` 之上实现精确有理 Cholesky / 舒尔补正定证书、连分数收敛子与有限素因子定阶算法，让自动化形式证明器直接用高速内核归约（`decide`）替代繁琐的极限滤子搜索；
3. **第三步（单向阴影函子 $\Pi_{\mathbb{R}}$ 对接 `Mathlib`）**：通过有理旋转稠密性与整数预算传递引理（如 `rationalQuarterDepth_integer_sound` $\to$ `rationalQuarterDepth_real_sound`）单向导出经典实分析定理，实现“内核零公理可计算、外层全生态互通”。

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="three-step-omegacore-roadmap-benchmark" height="500"}
**四类典型数学物理任务与 `OmegaCore` 三步路线基准沙盘**：支持在 `{0,1/2,1} 与三拍闭合`、`非阿贝尔三元和乐`、`二阶射流微积分` 与 `有理格拉姆舒尔补与深度证书` 四项任务间切换，并在三维球面与五阶编译流水线上逐步点击流转节点，实时对比零公理 `OmegaMath` 栈（`axioms = ∅`，`decide` 一步归约，`#eval` 原生执行）与传统 `Mathlib.Real` 栈及错误 `axiom` 栈在公理数、可执行性与证明节点规模上的结构性差异。
:::

我们将支撑三层 `OmegaMath` 形式化基座、有理格拉姆—舒尔算术、显式步数可计算机器与整数到实数无极限传递桥的十五条核心冻结定理汇总之如下：

::: {.theorem #thm-ch39-lean4-zero-axiom-omega-math-foundation title="三元比较四元数模型、有理规范算术、显式可计算步数界与整数—实数无极限传递桥" lean="D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv, D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq, D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul, D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor, D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev, D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity, D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least, D5/S3/Quantum/AURICOmega/GramIsometryExtension.existsUnique_linearIsometryEquiv_of_gram_preserving, D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover, D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den, D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log, D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct, D5/S0/Computability/BinaryNameComparison.name_compare_run, D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound, D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_real_sound"}
在三元比较模型实例、有理格拉姆—舒尔正定代数、有限规范算术与整数预算向实数域单向传递四个层面上，以下结论严格成立：

1. **三元比较四元数模型、射影玻恩核与流群递推**（`exists_unitQuaternion_equiv`、`kappa_eq_one_sub_dist_sq`、`tri_eq_mul_inv_mul`、`rayKernel_eq_bornProbability_spinor`、`normSq_and_chebyshev`）：非交换、链连通、触零、特征秩 $5$ 且读数完备的三元比较系统同构于单位四元数模型 $\mathrm{Sp}(1)$，满足 $\kappa(a,b) = 1 - \frac{1}{4}\operatorname{dist}(a,b)^2$ 与定基群分解 $[x,y,z] = x \cdot_o y^{-1} \cdot_o z$；四元数射线核精确等于二维旋量内积模方与一阶投影密度矩阵的玻恩配对权重；单位四元数序列满足 $x_{n+2} = x_{n+1}\bar{x}_n x_{n+1}$ 当且仅当对一切 $n \in \mathbb{N}$ 保单位模方并沿切比雪夫多项式 $T_n, U_n$ 展开；
2. **拉格朗日—格拉姆恒等式、舒尔补极小值与保内积等距唯一延拓**（`lagrange_gram_identity`、`schur_quadratic_is_least`、`existsUnique_linearIsometryEquiv_of_gram_preserving`）：有限指标集 $s$ 上恒有 $(\sum_{i\in s} u_i^2)(\sum_{i\in s} v_i^2) - (\sum_{i\in s} u_i v_i)^2 = \frac{1}{2}\sum_{i,j\in s}(u_i v_j - u_j v_i)^2$；分块矩阵 $\begin{pmatrix} A & B \\ B^{\mathsf{H}} & C \end{pmatrix}$ 当 $A$ 厄米且内部块 $C$ 正定时，边界舒尔补二次型 $x^* (A - B C^{-1} B^{\mathsf{H}}) x$ 精确是内部变量 $y \in \mathbb{C}^n$ 变化时整体二次型值集的最小元（`IsLeast`：属于该值集且不大于其中任一元）；张成全实内积空间 $E$ 的族 $\varphi$ 上保持实内积的指标置换唯一延拓为全局线性等距同构；
3. **无根号有理六轴球面覆盖与有限规范约分算术**（`rational_six_axis_open_cover`、`reduced_den`、`convergents_length_log`、`stripFactors_correct`）：模方为 $5$ 的六根整坐标轴 $(1,\pm 2,0),(0,1,\pm 2),(\pm 2,0,1)$ 构成的开集 $\{x \in S^2 \mid 5 < 2\langle x, \mathrm{axis}_i\rangle^2\}$ 覆盖整个实单位二球面且每片内部无正交对；对 $0 < r$，既约分数 `reduced s r` 的分母等于 $r / \gcd(s, r)$，任意有理数 $x \in \mathbb{Q}$ 的连分数收敛子列表长度满足 $\operatorname{length}(\mathrm{convergents}(x)) \le 2\lfloor\log_2(\operatorname{den}(x))\rfloor + 1$；在具有可判定相等性的幺半群 $G$ 中，若 $0 < m$、$x^m = 1$ 且列表 $P$ 覆盖 $m$ 的全部素因子，则可执行素因子剥离 `M := stripFactors x P m` 满足 $0 < M$、$M \mid m$、$x^M = 1$ 且 $M = \operatorname{orderOf}(x)$；
4. **显式步数可判定比较与整数—实数无极限预算传递桥**（`name_compare_run`、`rationalQuarterDepth_integer_sound`、`rationalQuarterDepth_real_sound`）：二进制名称比较机对任意 $a, b : \mathrm{List}\;\mathrm{Bool}$ 在至多 $2(\lvert a\rvert + \lvert b\rvert) + 4$ 步内停机并输出 `decide (a = b)`；对正自然数 $d, p > 0$，由纯自然数算术定义的可执行四分深度 `rationalQuarterDepth c d p q := Nat.log 4 ((c * q) / (d * p))` 当满足 $\le N$ 时，先在精确整数上严格证出 $c q < (d p)\cdot 4^{N+1}$，继而在 $q > 0$ 且实主控常数 $C \le \frac{c}{d}$ 时无需任何极限过程直接导出实数严格误差界 $(\frac{1}{4})^{N+1} C < \frac{p}{q}$。
:::

::: proof
第 1 组由特征秩五格拉姆表示、双侧单位四元数正交作用、霍普夫—旋量迹恒等式与切比雪夫归纳给出；第 2 组由交叉平方和恒等展开、分块配方法 $\begin{pmatrix}x\\y\end{pmatrix}^* K \begin{pmatrix}x\\y\end{pmatrix} = x^* S x + (C^{-1}B^{\mathsf{H}}x + y)^* C (C^{-1}B^{\mathsf{H}}x + y)$ 结合 $C \succ 0$，以及生成元线性无关商空间诱导等距证得；第 3 组由贝塞尔不等式配平方和多项式证书、欧几里得余数两步分母折半与幂等于 $1$ 可判定分支归纳证得；第 4 组由栈状态机显式步数转移、带余除法分解 $cq = (dp)((cq)/(dp)) + (cq \bmod dp)$ 推出整数不等式 $cq < dp \cdot 4^{N+1}$，再经 `exact_mod_cast` 单向投射为实数分式不等式。完整证明由 Lean 内核检查。
:::

::: {.remark #rem-ch39-lean4-cic-consistency-and-kernel-audit title="归纳构造演算（CIC）、赫德伯格定理与多内核公理审计（文献结果）"}
**文献结果，未在本书形式化。** 为严守 `PROJECT.md` §13 与 §14 的精确证据标准，记录以下形式化与逻辑文献边界：

1. **归纳构造演算（CIC）与 Lean 4 类型论内核**：归纳构造演算源于 T. Coquand 与 C. Paulin-Mohring（*COLOG-88*, LNCS **417**, 50–66, 1990）；Lean 4 的编译与内核架构见 L. de Moura 与 S. Ullrich（*CADE-28*, LNCS **12699**, 625–635, 2021），Lean 元理论与三大标准公理 `{propext, Classical.choice, Quot.sound}` 的形式刻画见 M. Carneiro（*The Type Theory of Lean*, Master's thesis, CMU, 2019）；
2. **赫德伯格定理与免除商公理的规范子类型**：任何具备构造性可判定相等性（`DecidableEq`）的类型均无需附加公理即自动满足相等证明唯一性（UIP），见 M. Hedberg（*J. Funct. Program.* **8**(4), 413–436, 1998）。这正是第 1 层规范非零子类型 `CanonProjTernion` 能够在不引入 `Quot.sound` 与 `propext` 的前提下直接承载全称 `OmegaSpace` 定律的逻辑根基；
3. **独立内核重放与公理闭包审计标准**：如 `PROJECT.md` §14 所登记，现代高可信形式化工程通过静态源码扫描（确认零 `sorry`、零 `opaque`、零自定义 `axiom`）配合 `leanchecker`、`lean4lean`、`nanoda`、`con-leche` 与 `comparator` 等多套独立内核重放审查 `#print axioms` 闭包：在导入了 `Mathlib` 的模块中证明的定理（包括 `Mathlib.Real` 分析定理，以及宿主文件导入了 `Mathlib` 算术策略库的冻结证明 `BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound`），其公理闭包为 `{propext, Classical.choice, Quot.sound}`；而纯自然数可执行函数 `rationalQuarterDepth` 本身及其具体求值 `rationalQuarterDepth 7 2 1 10 = 2`，连同本节第 0–1 层零导入文件内的纯 CIC 构造定理 `omega_zero_axiom_master_check`，则进一步将 `#print axioms` 闭包压缩至空集 $\varnothing$（`does not depend on any axioms`）——这也从编译器层面印证了将第 0–1 层隔离在零导入 `OmegaCore` 模块中的工程必要性。
:::

::: {.example #ex-ch39-lean4-zero-axiom-step-by-step-trace title="定量核验：`omega_zero_axiom_master_check` 逐拍整数轨迹、整正交旋子非对易合成与有理舒尔补实算"}
我们将 Lean `v4.35.0` 内核在 `by decide` 中执行的每一步整数与分数归约摊开手算核对（`手工推导` / `NUM`）：

1. **`(1,1,1,1)` 三拍射影闭合与无 $\sqrt{2}$ 伴随旋转**：
   取 `p0 = (1,0,0,0)`、`g120 = (1,1,1,1)`（$\lVert g_{120}\rVert^2 = 4$，$\kappa(p_0, g_{120}) = \frac{1^2}{1 \times 4} = \mathbf{\frac{1}{4}}$）：
   - 第二拍未约分积为 $(1+\mathbf{i}+\mathbf{j}+\mathbf{k})^2 = -2 + 2\mathbf{i} + 2\mathbf{j} + 2\mathbf{k}$，经 $\gcd = 2$ 与首非零正号翻转 $s = -1$ 归一为 `gStep2 = (1, -1, -1, -1)`；
   - 第三拍未约分积为 $(1-\mathbf{i}-\mathbf{j}-\mathbf{k})(1+\mathbf{i}+\mathbf{j}+\mathbf{k}) = 1 - (-3) = 4 + 0\mathbf{i} + 0\mathbf{j} + 0\mathbf{k}$，经 $\gcd = 4$ 归一精确回到 **`gStep3 = (1, 0, 0, 0) = p0`**！
   - 对两枚模方为 $2$ 的正交赤道整态 `pHalf = (1,1,0,0)` 与 `qHalf = (1,0,1,0)`（各自 $\kappa = \mathbf{\frac{1}{2}}$），正向三元合成 $(1+\mathbf{i})\cdot 1\cdot(1+\mathbf{j}) = 1 + \mathbf{i} + \mathbf{j} + \mathbf{k}$ 一步生成 **`(1, 1, 1, 1) = g120`**，反向合成 $(1+\mathbf{j})\cdot 1\cdot(1+\mathbf{i}) = 1 + \mathbf{i} + \mathbf{j} - \mathbf{k}$ 生成 **`(1, 1, 1, -1)`**——纯整数一步见证非交换空间自锁！
2. **有理舒尔补与整数四分深度证书实算**：
   取 $2 \times 2$ 有理格拉姆分块矩阵 $A = 2,\; B = 1,\; C = \frac{3}{2} > 0$，零公理 `QRat` 四则运算直接给出边界舒尔补极小值 $S = A - B C^{-1} B^\top = 2 - \frac{2}{3} = \mathbf{\frac{4}{3}} > 0$（精确最优点 $y^* = -\frac{2}{3}x$）；对主控上界 $\frac{c}{d} = \frac{7}{2}$ 与目标误差预算 $\frac{p}{q} = \frac{1}{10}$，可执行自然数深度 `rationalQuarterDepth 7 2 1 10 = Nat.log 4 (70 / 2) = Nat.log 4 35 = 2`，代入 $N = 2$ 立即由整数乘法核验 $70 < 2 \times 4^3 = \mathbf{128}$，并单向导出实数严格界 $(\frac{1}{4})^3 C \le \frac{7}{128} < \frac{1}{10}$（无需任何极限逼近）。
:::

---

**不动底层内核一分一毫，不借半条自定义公理——当数学褪去平直无穷的泡沫，证明本身就是全速运转的计算！**

在下面这座完整三维实验室中，先在第一卡拨动三种架构路线，亲眼核对纯 CIC 内核上青色归约束如何零阻碍打出 **`does not depend on any axioms`**，再切入第二卡与第三卡拖动紫色齐次三元球面上的整数射线簇，看 `pHalf = (1, 1, 0, 0)` 与 `qHalf = (1, 0, 1, 0)` 不借半个根号与半个 $\pi$ 一步非对易合成为纯整数体对角旋子 **`(1, 1, 1, 1)`** 并在三拍后归位 **`(1, 0, 0, 0)`**，最后停在第四卡与第五卡检视有理舒尔补 $S = \frac{4}{3}$ 与整数四分深度 $70 < 128$ 如何经单向阴影函子 $\Pi_{\mathbb{R}}$ 无极限接通经典分析：从两子丈量的第一道内积投影出发，历经克利福德几何积、霍普夫旋量纤维、雷吉离散曲率、素数阿代尔闭合与无无穷有理数学 $\mathbf{Math}_\Omega$，直到落定为 Lean 4 纯 CIC 内核里一行 `by decide` 即可零公理归约的 `OmegaMath` 基座，整部三十九章在此圆满合龙——现在，让我们步入全书[终章](coda.md)：**《在所有的球之外》**。

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" height="620"}
完整实验室：在“OmegaMath 零公理纯 CIC 构造栈 · 证明即计算”与“传统实无穷与自定义公理对照（MODEL）· 计算阻断与滤子膨胀”双透镜间切换（窄屏与章节嵌入视图亦可在巡览条旁一键切换透镜），依次巡览五阶编译流水线与三路线公理审计、免除 `Quot.sound` 的第 0 层规范整数三元载体 `ProjTernion`、第 1 层 `OmegaSpace` 相容性核验与 `Jet2Rat` 一步 `decide` 反射、第 2 层有理舒尔补证书与单向阴影函子 $\Pi_{\mathbb{R}}$，以及四类数学物理任务与 `OmegaCore` 三步路线基准五张实验卡，支持切换三种形式化架构路线、四类典型任务与五阶流水线节点，交互点选整数四元数射线观察 `Nat.gcd` 规范归约、三拍闭合与 `ℚ[η]/(η³)` 射流求逆，并在底部两条对照小图中同步观察第一图四类任务下零公理 `OmegaMath` 对比 `Mathlib.Real` 的证明节点规模与归约步数，以及第二图整数四分深度 $N$ 下精确分数预算 $(\frac{c}{d})/4^{N+1}$ 单向锁入目标阈值 $\frac{p}{q}$。十五条冻结 `LEAN ✓` 声明、`ARGUED` 类型论与多内核审计文献、`MODEL` 三层架构总表及 `NUM` 实机核验在依据栏与理论抽屉中分层列出。
:::
