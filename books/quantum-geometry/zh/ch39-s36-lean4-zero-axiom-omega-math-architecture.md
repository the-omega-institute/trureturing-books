# 32.8 Lean 4 零公理形式化基座（OmegaMath）：纯 CIC 内核、规范整数三元载体与单向阴影函子 {#sec-ch39-lean4-zero-axiom-omega-math-architecture}

> *“哪条声明用了哪些公理？同一个 Lean 内核中，有限整数算例与经典实数定理可以给出不同的答案。”*

在 [§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md) 确立了无无穷、无超越数的有限有理数学体系 $\mathbf{Math}_\Omega$ 之后，一个最锋利的工程与逻辑落地问题迎面而来：**要在现代交互式定理证明器 Lean 4 中把这座大厦真正建起来，我们究竟需要改动 Lean 4 的底层内核吗？还是直接用 `axiom` 关键字把母公理 $\mathrm{AXIOM}\text{-}\Omega$ 写进头文件？抑或在现有内核之上另辟一条零公理构造路径？**

§32.8.3 的可执行原型使用 Lean 隐式导入的标准库 `Init`。有限算例定理 `omega_zero_axiom_master_check` 的公理闭包为空。代码声明了 `OmegaSpace` 类型类，构造其实例还须另行证明各字段。在所钉提交 [{commit}](trureturing:) 上，严格库重放从所选库根（如 `OmegaMath.Projective.Circle`）出发，在空内核中核对其导入闭包。实数桥接定理 `OmegaShadowBridge.cayley_circle_unit` 的官方端记录列出三条依赖，即 `propext`、`Classical.choice` 和 `Quot.sound`。§32.8.4 进一步将该架构延展至特征秩 $5$ 有号旋量载体 `PythSpinor`、零公理二次扩张域 `QSqrt2` 与 `QPhi`、模方 $5$ 的 LPS 自由生成元与球谐赫克算子及有限拉马努金图 $X^{5, 13}$，以及任意阶 D-有限微分射流环 $J_N(\mathbb{Q})$ 与无 $\pi$ 马青有理包络（将三层 `OmegaMath` 工程路线图、证明有向无环图膨胀倍率对照与 `OmegaCore` 演进规划标为 **`MODEL`**；将十五条冻结核心定理——完备三元比较四元数同构、弦距读数恒等式、定基流群分解、射影核与旋量玻恩权重同一、四元数流群切比雪夫递推、拉格朗日—格拉姆恒等式、舒尔补二次型极小值可达定理、保格拉姆线性等距唯一延拓、有理六轴无正交开覆盖、既约分母最大公约数约化与连分数收敛子对数长度界、可判定单群素因子剥离定阶、二进制名称比较显式步数界，以及整数四分深度预算完备性与无极限实数上界传递定理——标为绿色 **`LEAN ✓`**；将 CIC 类型论文献、赫德伯格可判定相等性唯一性定理、独立内核审计记录、§32.8.4 的全称书面证明与 Lean `v4.35.0` 及双工作精度 Arb 实测标为 **`ARGUED` / `NUM`**）。

::: {.remark #rem-ch39-sister-monograph-omega-math title="姊妹专著：OMEGA MATH 六卷全本、四座三维实验室与双附录索引"}
本节浓缩呈现 `OmegaMath` 零公理形式化架构与量子几何主线的衔接；独立六卷姊妹专著 **[《OMEGA MATH》（`OMEGA//MATH`）六卷目录](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/zh/SUMMARY.md)** 现已完备收录全书 **18 章**、终章及 **[附录 A](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/zh/appendix-a.md)**／**[附录 B](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/zh/appendix-b.md)**，集成 **严格端公理记录为空的 D5 冻结定理**与第 2 层 **11 条 `OmegaShadowBridge` 单向阴影函子定理**、**19 幅双语语义静态图**、四座三维交互实验室（**`OMEGA//SPIN`**、**`OMEGA//LAB`**、**`OMEGA//JET`**、**`OMEGA//ARC`**，合计 16 张实验卡）以及双语概览演示文稿 **`overview`**，系统覆盖纯 CIC 与齐次射影闭环、无原点流群与利雅三元恒常单位曲率、双卡无奇点凯莱旋转、无极限射流与凯莱—三角大一统、全阶无 $\pi$ 球面彼得—魏尔调和分析、赫维茨自由群 $F_3$ 与模方 $5$ 赫克—拉马努金有理谱论、$\Omega$-FRACTRAN 旋子机与空内核审计，并可直达收官 **[第十八章 空内核审计、单向阴影函子与六卷全息工作台](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/zh/ch18-zero-axiom-kernel-and-shadow-bridge.md)**。
:::

---

## 32.8.1 核心判据：为何 Lean 4 裸内核天生契合 $\mathbf{Math}_\Omega$，而污染源只在 `Mathlib.Real` 与自定义 `axiom`？ {#sec-ch39-lean4-cic-vs-mathlib-real-and-axiom-trap}

把 Lean 4 拆开审视，它的**底层验证内核（CIC）**与**上层标准分析库（`Mathlib.Real`）**遵循着两套截然不同的数学哲学：

1. **Lean 4 裸内核（CIC）天生“无实无穷、无超越数、无内置选择公理”**：
   在未导入 `Mathlib.Data.Real.Basic` 之前，Lean 4 的核心类型论内核只由依值函数类型（$\Pi$ 类型）、宇宙层级与归纳构造子（`inductive`）连同 $\beta\delta\iota\zeta$ 四类确定性归约规则构成。在裸内核中，自然数 `Nat` 与整数 `Int` 绝非康托尔意义上“事先装满 $\aleph_0$ 个元素的静态实无穷口袋”，而是有限步归纳生成的语法项；内核里既没有实数连续统 $\mathbb{R}$，也没有 $\infty$、$\pi$ 或 $e$，甚至连排中律与选择公理都不内置于归约引擎之中。
   更进一步，按 `PROJECT.md` §13 对 Lean `v4.35.0` 核心库 `Init` 做实机公理审计（`#print axioms`），还能揪出一处极易被忽略的工程细节（`NUM` / `手工推导`）：`Nat.gcd`、`Int.natAbs`、整数除法 `Int.instDiv` 以及命题可判定比较 `Int.decEq`（`=` / `≠`）与 `Int.decLt`（`>`）全部**零公理依赖**；反倒是 `Init` 标准库自带的 `Rat` 类型因在结构体内捆绑了互素命题证明，`Rat.add`、`Rat.mul`、`Rat.div` 暗中触发了 `[propext, Classical.choice, Quot.sound]`（`Rat.inv` 触发 `[propext, Quot.sound]`）。实测 `fun (a b : Int) => a == b` 依赖三项标准公理，`fun (a b : Rat) => a == b` 的公理闭包为空。`Rat.add`、`Rat.mul`、`Rat.div` 与 `Rat.inv` 均会在内核 `decide` 归约时卡住！因此，只要用纯数据对 `(num : Int) × (den : Nat)` 自建十余行规范既约有理数 `QRat` 并一律使用可判定命题分支 `if d = 0 ∨ n = 0`，就能在 `Init` 之上实现百分之百纯粹的**真零公理**算术。
2. **传统 `Mathlib.Real` 的“线性与实无穷展开税”从何而来？**：
   `Mathlib` 为了复现十九世纪柯西—魏尔斯特拉斯实分析，将实数 `Real` 定义为有理数柯西序列模去零极限等价关系的商集，在底层一举引入三大经典公理 `{propext, Classical.choice, Quot.sound}`——尤其是**非构造性选择公理 `Classical.choice`**（文献结果 / `ARGUED`，参见 `PROJECT.md` §14 所录经典分析形式化审计回执）。一旦触碰 `Classical.choice`，整条形式化流水线立即付出两笔沉重代价：
   - **计算瘫痪（`noncomputable` 传染与 `decide` 阻断）**：虽然像 `#eval (1 + 1 : ℝ)` 这类纯有理嵌入还能打印出形式柯西序列包装器，但编译器无法从非构造存在性公理中提取可执行字节码，一旦涉及实数除法 `(1 / 2 : ℝ)`、平方根 `Real.sqrt`、李群指数映射 `NormedSpace.exp`、实导数、经典流形或希尔伯特算子，便会大面积传染 `noncomputable` 标记而彻底阻断 `#eval` 原生 C / 机器码求值，同时 `Classical.choice` 亦使内核反射策略 `by decide` 当场停摆；
   - **证明有向无环图（DAG）膨胀（声明闭包与滤子通行证税，`MODEL` 工程剖析配 `NUM` 实测）**：在 Lean `v4.35.0` 上对四项基准任务（`{0,1/2,1} 与三拍闭合`、`非阿贝尔三元和乐`、`二阶射流曲率`、`有理舒尔补与深度证书`）实测证明声明闭包规模，零公理 `OmegaMath` 栈仅需 **`396 / 372 / 379 / 380`** 个声明且 `#print axioms = ∅`，而 `Mathlib.Real` 对照证明分别膨胀至 **`7,480 / 7,144 / 17,786 / 7,395`** 个声明并携带三大经典公理——尤其在第 3 项求导任务上，仅实导数的 `Filter.Tendsto` 极限滤子支线便将声明闭包推高至 `17,786` 个。
3. **为什么绝对禁止用 `axiom` 关键字硬写 $\mathrm{AXIOM}\text{-}\Omega$？**：
   倘若图一时省事，在 Lean 4 中直接写下 `axiom Ternion : Type` 或 `axiom kappa_refl : ∀ x, kappa x x = 1`，当场就会踩爆两颗逻辑与计算地雷：
   - **炸穿无矛盾防线与外部审计**：Lean 内核无条件采信每一条 `axiom`。一旦手工公理漏掉某个非退化边界条件——例如在未排除零四元组 $o_{\mathrm{zero}} = (0,0,0,0)$ 的原始载体上草率声明 `axiom kappa_refl : ∀ x : ProjTernion, kappa x x = ⟨1, 1⟩`，代入 $x = (0,0,0,0)$ 便会与计算值 `kappa 0 0 = ⟨0, 1⟩` 碰撞，三行之内推出 `⟨0, 1⟩ = ⟨1, 1⟩` 进而证出 `False`（空真爆炸）！同时，`#print axioms` 以及 `lean4lean`、`nanoda`、`con-leche`、`comparator` 等独立内核检查器都会对一切非标准自定义 `axiom` 亮起最高级别审计红灯；
   - **彻底阻断内核 $\iota$-归约**：`axiom` 只是没有归约规则的僵死符号常量，任何包含它的项在内核求值时都会卡在未化简的中性项上，彻底丧失“证明即程序、归约即实验”的构造性威力。

给整数坐标换一个共同的单位，射影读数应当保持原值。这个例子也说明书中“无公理”标记的含义：它取自冻结声明记录的传递公理闭包。用官方库或 OmegaMath 写出的证明都可以得到这个标记。

::: {.theorem #thm-ch32-projective-overlap-positive-scaling title="正整数缩放保持射影读数" lean="D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale"}
设 $p,q,k$ 为自然数，$s=k+1$。以 $\kappa(p,q)$ 表示分子 $q^2$、分母 $p^2+q^2$ 的读数，分母为零时取未定义值。则 $\kappa(ps,qs)$ 与 $\kappa(p,q)$ 在 `Omega.Ratio.Equivalent` 下等价。
:::

::: {.proof}
缩放使分子和分母同乘 $s^2$。分母为正时，两组分数交叉相乘相等；当 $p=q=0$ 时，缩放前后的读数都未定义，两者按定义等价。完整证明由 Lean 内核检查。
:::

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="cic-kernel-vs-axiom-and-real-tax" height="500"}
**五阶编译与审计。** 青色路线显示隐式导入标准 `Init` 的原型。第四阶执行 `#print axioms omega_zero_axiom_master_check`，这条含八个有限断言的定理返回空公理清单。其他轨道展示自定义公理的零元组反例与经典实数运算。实数圆周桥接定理在官方端依赖 `propext`、`Classical.choice` 和 `Quot.sound`。
:::

---

## 32.8.2 Lean 4 中的整数载体、模型接口与实数桥接 {#sec-ch39-omega-math-three-layer-zero-axiom-stack}

`OmegaMath` 的同一份库源码在严格后端和常规后端分别编译。严格库的空内核重放覆盖所选库根的导入闭包。D5 声明另作双端编译对照与分端公理测量。书中的定理徽章取官方端冻结记录。常规后端编译的若干 D5 定理使用 Lean 的标准命题外延公理 `propext`。 [OmegaMath 模块与验证](https://github.com/the-omega-institute/trureturing/blob/dev/src/README.md)

第 0 层提供整数载体，第 1 层列出迁移与读数的定律，第 2 层把结果映入经典实分析。下表用具名声明的测量说明这个三层架构模型。

| 架构维度 | 错误路线：硬写 `axiom` 声明 | 传统路线：`Mathlib` 经典 `Real` 栈 | 构造路线：整数原型 |
| :--- | :--- | :--- | :--- |
| **`#print axioms`** | 列出证明用到的自定义公理 | 官方端 `OmegaShadowBridge.cayley_circle_unit` 依赖 `propext`、`Classical.choice` 和 `Quot.sound` | 隐式导入标准 `Init` 的原型定理 `omega_zero_axiom_master_check` 公理清单为空 |
| **可执行性（`#eval`）** | 彻底阻断，全部沦为不可归约常量 | 实数除法、流形与超越函数传染 `noncomputable` | **$100\%$ 可编译为原生 C / 机器码高速求值** |
| **三维三元数与极点** | 抽象无坐标符号，漏边界即推 `False` | 依赖 $\mathbb{R}^4$ 子流形、$\pi$、开方与切空间图册 | **原始整数四元组 `ProjTernion` 和规范非零代表 `CanonProjTernion`（零奇点、零根号）** |
| **微积分与曲率实现** | 需手工公理化导数算子 | `Filter.Tendsto` 无穷小极限与多卡转移映射 | **二阶射流有理环 $\mathbb{Q}[\eta]/(\eta^3)$ 纯四则代数** |
| **自动形式化证明搜索效率** | 缺乏计算归约，极易掉入假命题陷阱 | 需清偿连续性、可微性与可测性滤子支线子目标 | **核心有理几何、微积分与有限证书由 `decide` 一步归约** |

### 32.8.2.1 第 0 层：免除商集公理（`Quot.sound`）的规范整数三元载体 `CanonProjTernion` {#sec-ch39-layer0-projternion-zero-quotient}

在 [§31.5](ch39-s32-holographic-arc-manifold-and-solenoid-unity.md) 与 [§32.7](ch39-s35-infinity-free-transcendental-free-rational-mathematics.md) 的罗德里格斯切参数化中，跨越对径赤道仍需切换正逆双卡；而在 Lean 4 第 0 层中，直接采用四元整数模去非零有理缩放的**齐次射影空间 $\mathbb{QP}^3 \cong \mathrm{SO}(3, \mathbb{Q})$**，可以一步构造出连商类型公理 `Quot.sound` 都完全省去的**唯一规范整数代表元**（`手工推导`）：

- **严格 $3$ 自由度、唯一整数范式与全域零奇点**：对任意非零整数四元组 $(w, x, y, z) \in \mathbb{Z}^4 \setminus \{0\}$，令 $g = \gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert) \ge 1$，先整除约分得互素四元组 $(w', x', y', z') = (w/g, x/g, y/g, z/g)$，再乘以符号因子 $s \in \{\pm 1\}$ 锁定**首个非零分量为正整数**。于是，$\mathbb{QP}^3$ 上的每一条射影三元数射线都拥有**全宇宙唯一的四元整数身份证**（直接由 `deriving DecidableEq` 零公理判定相等，完全绕开 `Quotient` 与 `Quot.sound`）：
  - 过去停机锚（$s = 0, \kappa = 1$）即 `p0 = (1, 0, 0, 0)`；
  - 现在正交赤道（$s = 1/2, \kappa = 1/2$）即 `pHalf = (1, 1, 0, 0)`；
  - 曾经令平直实数轴除零爆炸的未来对径闭合极点 $[1 : 0]$（原 $\infty$，$s = 1, \kappa = 0$）不过是一枚平平无奇的整数四元组 `pInf = (0, 1, 0, 0)`！
- **连 $\sqrt{2}$ 都彻底消去的纯有理保真度 $\kappa$ 与有理伴随旋转 $\mathrm{Ad}(p) \in \mathrm{SO}(3, \mathbb{Q})$**：
  注意一个精妙绝伦的代数事实（`PROJECT.md` §13 精确加强）：倘若强行要求四元旋量先归一化为单位向量，那么连最简单的 $90^\circ$ 正交赤道态 `pHalf = (1, 1, 0, 0)`（模方 $\lVert p_{\mathrm{Half}}\rVert^2 = 1^2 + 1^2 = 2$ 不是平方数！）都会被迫引入无理根号 $\frac{1 + \mathbf{i}}{\sqrt{2}}$。但对非零齐次代表元，物理可观测量与三维旋转**全部自动平方消根号**：
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
     因此乘积仍然非零。规范化后，`g120 = (1,1,1,1)` 的射线在三拍后返回 `(1,0,0,0)`。其有理单位提升 $(1,1,1,1)/2$ 在三拍后到达 $-1$，六拍后回到 $+1$。一条本原射线有有理单位提升，当且仅当其代表元的模方是完全平方数。

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="canonical-proj-ternion-zero-quotient" height="500"}
**第 0 层规范齐次整数三元载体 `CanonProjTernion`（免除 `Quot.sound` 与无理根号）**：紫色实体三元球面上，青色整数射线簇 `(2,2,0,0)`、`(-3,-3,0,0)` 经 `Nat.gcd` 约分与首非零正号锁定坍缩至唯一规范锚点 `pHalf = (1,1,0,0)`（模方 `‖p‖² = 2`，无需 `√2` 即给出精确 `κ = 1/2 = 0.5000` 与整系数旋转 `Ad(pHalf) ∈ SO(3, ℤ)`），同屏标出过去锚 `p0 = (1,0,0,0)`、对径闭合极点 `pInf = (0,1,0,0)`（`κ = 0/1 = 0.0000`，零除零奇点）与三拍闭合整旋子 `g120 = (1,1,1,1)`（`κ = 1/4 = 0.2500`）。
:::

### 32.8.2.2 第 1 层：`OmegaSpace` 接口与规范代表 {#sec-ch39-layer1-omegaspace-typeclass-consistency}

下文示意原型的 `OmegaSpace` 有两个运算与六个字段，分别要求两条消去律、三元结合律，以及读数的自反性、对称性与右迁移不变性。AXIOM-Ω 的其他要求，包括非交换性与任意有限格拉姆矩阵的半正定性，须另行证明。

以下推导使用每条非零有理射线的规范代表元（`手工推导`）。

- 在未加约束的原始四元整数记录 `ProjTernion`（全体 $\mathbb{Z}^4$）上，`normalize` 虽然将全体输入总化（把 `(0,0,0,0)` 映为 `(1,0,0,0)`，把未约分的 `(2,0,0,0)` 约分为 `(1,0,0,0)`），但全称量化的 `OmegaSpace` 定律在两个退化边界上并不对原始未约分元组逐字成立——对零元组 $z_0 = (0,0,0,0)$ 有 `kappa z0 z0 = ⟨0, 1⟩ ≠ ⟨1, 1⟩` 且 `triad p0 p0 z0 = p0 ≠ z0`；对未约分元组 $z_2 = (2,0,0,0)$ 有 `triad p0 p0 z2 = p0 ≠ z2`；
- 每条非零射线有唯一首非零项为正的本原整数代表元。将 $a\bar b c$ 规范化即得代表元上的三元运算。吸收律来自 $b\bar b=\lVert b\rVert^2$，结合律来自射线上的四元数结合律与代表元的唯一性。平方内积读数具有对称性与自反性。同右乘 $\bar u v$ 时，模方与内积都乘以 $\lVert u\rVert^2\lVert v\rVert^2$，故读数保持。

原型声明这六个字段，通过计算核验八个具体等式或不等式，其中包括一对不交换的元素。构造形式化实例还需对任意输入证明六个字段。二阶射流有理环 `Jet2Rat`（$\mathbb{Q}[\eta]/(\eta^3)$）在一切可逆元（即常数项 $j_0 \neq 0$，对保真度核分母 $1 + x_0^2 \ge 1 > 0$ 在全体 $x_0 \in \mathbb{Q}$ 上恒成立！）上仅凭三次有理乘法便给出精确两项求逆 $(a_0 + a_1\eta + a_2\eta^2)^{-1}$，使微积分曲率验证同样由 `by decide` 一步归约。

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="typeclass-consistency-and-jet2-decide" height="500"}
**用 `decide` 核验有限个三元数与 `Jet2Rat` 算例**：紫色实体三元球面上实时步进 `omega_zero_axiom_master_check` 的八项合取断言——`{1, 1/2, 0, 1/4}` 有理保真度谱、`g120` 三拍归位 `gStep3 = p0`、左吸收幂等 `triad pHalf pHalf g120 = g120`、两枚整正交四分之一转非对易合成 `(1,1,1,1) ≠ (1,1,1,-1)`，以及 `x₀ = 1` 处 `Jet2Rat.kappaJetAt` 输出精确 `{1/2, -1/2, +1/4}`，并支持切换查看 `CanonProjTernion` 规范子类型如何拦截原始 `(0,0,0,0)` 与 `(2,0,0,0)` 边界反例。
:::

### 32.8.2.3 第 2 层：面向 `Mathlib` 的单向阴影投影函子 $\Pi_{\mathbb{R}}$（不造封闭孤岛） {#sec-ch39-layer2-mathlib-shadow-functor}

构建零公理 `OmegaMath` 基础层，绝不意味着将自己封闭在与主流数学界隔绝的孤岛上。由于规范整数三元数诱导的有理正交群 $\mathrm{SO}(3, \mathbb{Q})$ 在实旋转群 $\mathrm{SO}(3, \mathbb{R})$ 中范数稠密（且凯莱有理点集 $Q(\mathbb{Q}^3) = S^3(\mathbb{Q}) \setminus \{-1\}$ 在单位四元数群 $S^3(\mathbb{R}) \cong \mathrm{SU}(2)$ 中处处稠密），我们只需在第 2 层架设一座极薄的**单向阴影投影函子**：

$$
\Pi_{\mathbb{R}} \;:\; \mathbf{OmegaMath}\text{（零公理可执行内核）} \;\longrightarrow\; \mathbf{Mathlib}\text{（经典实分析外层）}.
$$

在这座双层分工架构中，非阿贝尔三元流群几何、二阶射流曲率、有理分块格拉姆矩阵的舒尔补极小化 $S = A - B C^{-1} B^\top$，以及类似 `BurnolRationalDepthBudget` 的整数四分深度预算证书 $c q < d p \cdot 4^{N+1}$，**全部留在第 0–1 层的零公理可执行域内由 `#eval` 与 `decide` 高速完成**；唯有当下游定理确需表述为传统实数域 $\mathbb{R}$ 或复希尔伯特空间上的不等式时，才在最后一步调用类似 `rationalQuarterDepth_integer_sound` $\Rightarrow$ `rationalQuarterDepth_real_sound` 的无极限有理上界传递引理或有理点稠密延拓，单向投射进 `Mathlib`——既保住了核心引擎的零公理可执行性，又无缝复用 `Mathlib` 既有定理生态。

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" preset="rational-schur-and-shadow-functor-bridge" height="500"}
**第 2 层有理舒尔补证书与单向阴影函子 $\Pi_{\mathbb{R}} : \mathbf{OmegaMath} \to \mathbf{Mathlib}$**：左侧紫色有理三元球面与青色精确格拉姆椭球在零公理域内直接算出有理舒尔补极小值 $S = A - B C^{-1} B^\top$ 与整数四分深度不等式 $c q < d p \cdot 4^{N+1}$（`axioms = ∅`），右侧经单向琥珀投影桥 $\Pi_{\mathbb{R}}$ 无极限传递至外层实连续统壳层 `(1/4)^(N+1) C < p/q`，避免实分析滤子反向污染核心计算层。
:::

---

## 32.8.3 使用标准 `Init` 的 Lean 4 可执行原型（`v4.35.0` 实机核验）与三步演进路线 {#sec-ch39-lean4-zero-axiom-executable-prototype}

这段代码没有 `prelude` 指令，Lean `v4.35.0` 会自动导入标准 `Init`。原型用其中的 `Int`、`Nat` 和 `Nat.gcd` 实现既约有理数 `QRat`、原始整数四元组 `ProjTernion` 与二阶射流 `Jet2Rat`，并声明 `OmegaSpace` 的字段。另一个定理 `omega_zero_axiom_master_check` 用 `decide` 证明有限项合取，涵盖保真度读数、三拍归位、非交换见证与 $x_0=1$ 处的射流。运行 `#print axioms omega_zero_axiom_master_check` 给出 **`does not depend on any axioms`**。

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

/-- 2. 原始整数四元组。规范化为每个非零输入选取射线的唯一规范代表元。 -/
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

/-- 4. 三元搬运与保真度六条等式的示意接口。 -/
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

1. **第一步 · `OmegaCore` 的可执行算术。** 在标准 `Init` 上实现上述载体与运算，用 `decide` 核验各有限算例，读取对应定理的公理闭包。
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
2. **赫德伯格定理与免除商公理的规范子类型**：任何具备构造性可判定相等性（`DecidableEq`）的类型均无需附加公理即自动满足相等证明唯一性（UIP），见 M. Hedberg（*J. Funct. Program.* **8**(4), 413–436, 1998）。它适用于规范子类型上的相等证明，运算定律另须上文的代数推导；
3. **逐声明读取公理闭包。** 在本书所钉提交 [{commit}](trureturing:) 上，`BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound` 的冻结声明行缺少官方 `axioms` 字段。官方依赖以许可集合 `{propext, Classical.choice, Quot.sound}` 为上界，确切子集须对这条声明测量。本节的 `QRat` 原型另有独立测量，在 Lean `v4.35.0` 上，`#print axioms omega_zero_axiom_master_check` 返回空清单。
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

## 32.8.4 特征秩 5 旋量提升、有限次代数扩张、模方 5 赫克扩展子与 D-有限微分射流 {#sec-ch39-omega-math-pythspinor-algebraic-lps-dfinite}

在 §32.8.1–§32.8.3 所述的三层架构之上，四道更深一层的代数与分析边界问题紧随而来：（一）为何射影载体 `ProjTernion` 的二次射线核特征秩封顶于 $10$，而上述冻结定理第 1 组所刻画的比较系统却在所选有号核下要求特征秩 $5$ 并借旋量双覆叠保存 $720^\circ$ 符号记忆？（二）当物理可观测量确实触及无理代数数（例如把非平方模方态 `pHalf` 沿同一射线作单位归一化、达到 CHSH 齐雷尔森上界 $2\sqrt{2}$ 或闭合五角黄金比切比雪夫周期）时，如何在不退回实数连续统 $\mathbb{R}$ 的前提下以零公理有限次代数扩张精确承载？（三）受上述冻结定理中模方 $5$ 整坐标算术启发，四坐标模方 $5$ 赫维茨四元数如何在 $\mathrm{SO}(3, \mathbb{Q})$ 内自由生成 $F_3$，并在球谐空间上诱导精确有理赫克算子（矩阵、迹与特征多项式）及其认证谱与有限拉马努金凯莱图？（四）如何将二阶射流 `Jet2Rat` 推广到任意阶 D-有限微分射流环 $J_N(\mathbb{Q})$，在纯有理多项式环内打通凯莱参数化与三角恒等式，并无须预设超越常数 $\pi$ 即导出可任意收紧的马青有理双边包络？本小节将这四条结构延展统一收束进零公理、无超越数、无实无穷的 `OmegaMath` 体系（全称命题由书面证明给出，标为 `ARGUED`；有限实例、谱界与包络由精确有理、双工作精度 Arb 证书及独立零导入 Lean 辅助核验认证，标为 `NUM`，且该独立脚本不计入本仓库所钉 `trureturing` 冻结 `LEAN ✓` 定理总数）。

### 32.8.4.1 射影射线秩 10 与有号有理旋量 `PythSpinor` 秩 5 的精确分离 {#sec-ch39-pythspinor-rank5-double-cover}

对任意非零有理四元组 $p \in \mathbb{Q}^4 \setminus \{0\}$，定义秩一对称正交投影阵 $P(p) = \frac{p p^{\mathsf{T}}}{p^{\mathsf{T}} p} \in \mathrm{Sym}_4(\mathbb{Q})$。直接展开矩阵迹即得射影射线核的线性特征表示 $\kappa_{\mathrm{proj}}(p, q) = \frac{\langle p, q\rangle^2}{\lVert p\rVert^2 \lVert q\rVert^2} = \operatorname{Tr}\bigl(P(p) P(q)\bigr)$。由于对称矩阵空间 $\mathrm{Sym}_4(\mathbb{Q})$ 维数为 $10$，且迹配对 $\operatorname{Tr}(AB)$ 对应的二次型 $\operatorname{Tr}(A^2) = \sum_{i,j} A_{ij}^2$ 在非零对称阵上严格正定，任意有限射线簇的射影格拉姆矩阵 $G^{\mathrm{proj}}_{ij} = \kappa_{\mathrm{proj}}(p_i, p_j)$ 均半正定且 $\operatorname{rank}(G^{\mathrm{proj}}) \le 10$。取四条坐标轴 $e_1, e_2, e_3, e_4$ 与六条对角射线 $e_i + e_j$（$1 \le i < j \le 4$）：四枚坐标投影阵张成对角子空间，而 $2 P(e_i + e_j) - P(e_i) - P(e_j) = E_{ij} + E_{ji}$ 张成全部六枚非对角对称基元，故由这 $10$ 条射线索引的 $10$ 枚投影阵构成 $\mathrm{Sym}_4(\mathbb{Q})$ 的一组基；其精确 $10 \times 10$ 格拉姆矩阵的顺序主子式依次为 $1, 1, 1, 1, \frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{16}, \frac{1}{32}, \frac{1}{64}$（$\det G^{\mathrm{proj}}_{10} = \frac{1}{64} > 0$，严格正定），而追加第十一条射线 $(1, 1, 1, 1)$ 后秩保持 $10$ 且 $\det G^{\mathrm{proj}}_{11} = 0$。

为将所选核的特征秩从射影商空间的 $10$ 压回冻结同构定理框架下的 $5$ 并使输出载体能够区分对径单位旋量 $(p; r)$ 与 $(-p; r)$（半径恒取正整数 $r > 0$），我们采用**本原毕达哥拉斯旋量 `PythSpinor`**——即整五元组 $(w, x, y, z; r) \in \mathbb{Z}^4 \times \mathbb{Z}_{>0}$，满足 $w^2 + x^2 + y^2 + z^2 = r^2$ 且 $\gcd(\lvert w\rvert, \lvert x\rvert, \lvert y\rvert, \lvert z\rvert, r) = 1$。对任意非零整四元组 $u = (a, b, c, d)$，令 $s = b^2 + c^2 + d^2$，单位三维球面 $S^3(\mathbb{Q}) \subset \mathbb{Q}^4$ 上的有理球极—凯莱参数化定义为

$$
\Phi(a, b, c, d) \;=\; \operatorname{reduce}\bigl(a^2 - s,\; 2ab,\; 2ac,\; 2ad;\; a^2 + s\bigr),
$$

其中 $\operatorname{reduce}$ 除以五元正最大公约数。恒等式 $(a^2 - s)^2 + 4a^2 s = (a^2 + s)^2$ 保证像点恒落于有理单位三维球面 $S^3(\mathbb{Q})$；反之，对任意有理单位四元数 $(w, x, y, z)$（$w \neq -1$），取与 $(1, \frac{x}{1+w}, \frac{y}{1+w}, \frac{z}{1+w})$ 成比例的整输入即可满射覆盖，而任意满足 $a = 0$ 的非零输入（例如 $(0, 1, 0, 0)$）均映至南极 $(-1, 0, 0, 0; 1)$。注意 $\Phi(u) = \Phi(-u)$ 并不从输入射线恢复符号，真正区分对径代表元 $(p; r)$ 与 $(-p; r)$ 的是输出载体 `PythSpinor` 本身；由模方乘性 $(ab)\overline{ab} = a(b\bar{b})\bar{a}$ 与正公约数约分，本原旋量集合在四元数乘法、共轭求逆与三元流群运算 $[a, b, c] = a\bar{b}c$ 下严格封闭。

记有理单位点 $v_i = p_i / r_i \in S^3(\mathbb{Q})$，有号旋量核满足

$$
\kappa_{\mathrm{spin}}\bigl((p_i; r_i), (p_j; r_j)\bigr) \;=\; \frac{r_i r_j + \langle p_i, p_j\rangle}{2 r_i r_j} \;=\; \frac{1}{2}\bigl\langle (1, v_i), (1, v_j)\bigr\rangle_{\mathbb{Q}^5}, \qquad \kappa_{\mathrm{proj}}(p_i, p_j) \;=\; \bigl(2\kappa_{\mathrm{spin}} - 1\bigr)^2,
$$

前式经 $\mathbb{Q}^5$ 内积将一切有限旋量格拉姆矩阵的秩普遍封顶于 $5$，后式由 $p_i \cdot p_i = r_i^2$ 对全体旋量对恒等成立。以 $\Phi$ 依次提升 $(1,0,0,0), (1,1,0,0), (1,0,1,0), (1,0,0,1), (3,1,1,1)$ 得到四枚坐标单位旋量（落于仿射超平面 $\sum v_k = 1$）与 $(1, 1, 1, 1; 2)$（坐标和为 $2 \neq 1$，因而在 $\mathbb{Q}^5$ 中与前四行线性无关），其 $5 \times 5$ 旋量格拉姆矩阵的顺序主子式依次为 $1, \frac{3}{4}, \frac{1}{2}, \frac{5}{16}, \frac{1}{32}$（$\det G^{\mathrm{spin}}_5 = \frac{1}{32} > 0$）；追加第六枚提升旋量 $(-1, 1, 1, 1; 2) = \Phi(1, 1, 1, 1)$ 后秩锁定为 $5$ 且 $\det G^{\mathrm{spin}}_6 = 0$（这六枚旋量上的全部 $36$ 对乘积、$216$ 组三元流群与 $36$ 对二次核恒等式均经精确核验）。同时，记 $h = (\mathbf{i} + \mathbf{j} + \mathbf{k})/\sqrt{3}$（$h^2 = -1$），本原体对角旋子 `g120_spin = (1, 1, 1, 1; 2)`（对应 $\cos(\pi/3) + h\sin(\pi/3)$）在 `PythSpinor` 中的六拍幂次轨迹依次为 $(1,1,1,1;2) \to (-1,1,1,1;2) \to (-1,0,0,0;1) \to (-1,-1,-1,-1;2) \to (1,-1,-1,-1;2) \to (1,0,0,0;1)$，与单位元的有号保真度依次为 $\frac{3}{4}, \frac{1}{4}, 0, \frac{1}{4}, \frac{3}{4}, 1$：伴随空间每拍推进 $120^\circ$，第三拍在 $360^\circ$ 精确翻转至 $-1$（$\kappa_{\mathrm{spin}} = 0$），第六拍在 $720^\circ$ 完整归位 $+1$（$\kappa_{\mathrm{spin}} = 1$）。

### 32.8.4.2 零公理有限次代数扩张：`QSqrt2` 与 `QPhi` {#sec-ch39-finite-algebraic-rings-qsqrt2-qphi}

赤道整态 `pHalf = (1, 1, 0, 0)` 的模方 $\lVert p_{\mathrm{Half}}\rVert^2 = 2$ 非完全平方数，虽然非线性球极映射 $\Phi$ 将其映为有理点 $(0, 1, 0, 0; 1)$，但**沿同一射线作单位归一化** $p_{\mathrm{Half}} / \lVert p_{\mathrm{Half}}\rVert$ 必然离开 $\mathbb{Q}^4$；类似地，五角对称与黄金比例切比雪夫闭合需要二次方程 $t^2 - t - 1 = 0$ 的根。按有理根检验，$t^2 - 2$ 与 $t^2 - t - 1$ 在 $\mathbb{Q}$ 上均不可约；`OmegaMath` 绕开 `Mathlib` 在柯西商实数 $\mathbb{R}$ 上依赖选择公理的经典域运算（如实数求逆），直接在 `QRat` 之上以纯有序对 `(a, b)` 构造两枚零公理 $2$ 次扩张域：

1. **二次扩张域 `QSqrt2` $= \mathbb{Q}[\delta]/(\delta^2 - 2)$**：在其正实嵌入 $\delta = \sqrt{2}$ 下（$320$-位 Arb 证书证明 $\delta$ 本身严格落于有理隔离区间 $(1.414213, 1.414214)$ 内，四舍五入至六位小数为 $1.414214$），$90^\circ$ 单位旋子 $u_{90^\circ} = \frac{\delta}{2}(1 + \mathbf{i})$ 具备精确单位模方 $\frac{\delta^2}{4} + \frac{\delta^2}{4} = 1$，其精确整数次幂依次为 $u_{90^\circ}^2 = \mathbf{i}$、$u_{90^\circ}^4 = -1$、$u_{90^\circ}^8 = 1$。在贝尔态 $(\lvert 00\rangle + \lvert 11\rangle)/\sqrt{2}$（其 $Z, X$ 关联阵为单位阵）上取自伴酉可观测量 $A_0 = Z$、$A_1 = X$、$B_0 = (Z + X)/\delta$、$B_1 = (Z - X)/\delta$，四项关联在 `QSqrt2` 内精确计算为 $\frac{\delta}{2}, \frac{\delta}{2}, \frac{\delta}{2}, -\frac{\delta}{2}$，给出精确 CHSH 组合值 $S_{\mathrm{CHSH}} = 2\delta$ 与 $S_{\mathrm{CHSH}}^2 = 8$（$320$-位 Arb 证书证明 $2\delta$ 本身严格落于 $(2.828427, 2.828428)$ 内，四舍五入至六位小数为 $2.828427$）。经 $\Pi_{\mathbb{R}}$ 投射至经典希尔伯特空间框架时，任意自伴酉算符组对应的 CHSH 算符 $C = A_0 \otimes (B_0 + B_1) + A_1 \otimes (B_0 - B_1)$ 满足 $C^2 = 4I - [A_0, A_1] \otimes [B_0, B_1]$ 且每项对易子算符范数至多为 $2$，故 $\lVert C\rVert \le 2\sqrt{2}$；上述 `QSqrt2` 代数构造在投射后精确触顶齐雷尔森上界；
2. **黄金二次扩张域 `QPhi` $= \mathbb{Q}[\varphi]/(\varphi^2 - \varphi - 1)$**：记正实嵌入 $\varphi = \frac{1 + \sqrt{5}}{2}$（$320$-位 Arb 包络四舍五入至六位小数为 $1.618034$）及其伽罗瓦共轭 $\bar{\varphi} = 1 - \varphi$。由 $\varphi^2 = \varphi + 1$ 归纳即得对一切正整数 $n \ge 1$ 恒有斐波那契幂律 $\varphi^n = F_{n-1} + F_n\varphi$，且由 $\varphi\bar{\varphi} = -1$ 得精确代数范数 $N(\varphi^n) = (-1)^n$（在 Python 精确套件中核验至 $n = 20$：$\varphi^{20} = 4181 + 6765\varphi$、$N(\varphi^{20}) = 1$；在零导入 Lean 辅助脚本中核验至 $n = 12$：$\varphi^{12} = 89 + 144\varphi$、$N(\varphi^{12}) = 1$）。进一步由五阶切比雪夫多项式的精确有理分解 $T_5(x) + 1 = (x + 1)(4x^2 - 2x - 1)^2$，唯一正根即 $\frac{\varphi}{2} = \cos(\pi/5)$（四舍五入至六位小数为 $0.809017$），配倍角公式得 $\frac{\varphi - 1}{2} = \cos(2\pi/5)$（四舍五入至六位小数为 $0.309017$），切比雪夫递推在零三角函数下直接给出精确闭合等式 $T_5(\varphi/2) = -1$、$T_{10}(\varphi/2) = T_{20}(\varphi/2) = 1$ 与 $T_5((\varphi - 1)/2) = 1$。

### 32.8.4.3 模方 5 的 LPS 自由生成元、精确有理球谐赫克算子与 2184 顶点拉马努金图 $X^{5, 13}$ {#sec-ch39-lps-norm5-hecke-ramanujan}

受上述冻结定理第 3 组中模方 $5$ 整坐标算术启发，结合 A. Lubotzky、R. Phillips 与 P. Sarnak（[*Comm. Pure Appl. Math.* **39**(S1), S149–S186, 1986](https://api.crossref.org/works/10.1002/cpa.3160390710)；[*Comm. Pure Appl. Math.* **40**(4), 401–420, 1987](https://api.crossref.org/works/10.1002/cpa.3160400402)；[*Combinatorica* **8**(3), 261–277, 1988](https://api.crossref.org/works/10.1007/BF02126799)）、G. Davidoff、P. Sarnak 与 A. Valette（[*Elementary Number Theory, Group Theory and Ramanujan Graphs*, LMS Student Texts **55**, Cambridge University Press, 2003](https://www.cambridge.org/core/books/elementary-number-theory-group-theory-and-ramanujan-graphs/7932F64548F1B38B95AA2593E0B986B2)）以及 O. Parzanchevski 与 P. Sarnak（[*Adv. Math.* **327**, 869–901, 2018](https://arxiv.org/abs/1704.02106)）的经典赫克算子与拉马努金图理论，我们在 `ProjTernion` 中考察六枚模方为 $5$ 的四坐标整赫维茨四元数生成元：

$$
S_5 \;=\; \bigl\{(1, \pm 2, 0, 0),\; (1, 0, \pm 2, 0),\; (1, 0, 0, \pm 2)\bigr\} \;\subset\; \mathbb{Z}^4.
$$

**自由群 $F_3 \hookrightarrow \mathrm{SO}(3, \mathbb{Q})$ 与线性位高增长。** 每枚 $g \in S_5$ 均满足 $g\bar{g} = 5$（四元数逆元为 $\bar{g}/5$，因而在射影商群与伴随群中配成三对共轭互逆生成元），并诱导出公分母恰为 $5$ 的有理正交旋转 $\operatorname{Ad}(g) \in \mathrm{SO}(3, \mathbb{Q})$（例如 $\operatorname{Ad}(1, 2, 0, 0)$ 固定第一轴并在其余两轴上施以毕达哥拉斯旋转 $\frac{1}{5}\begin{pmatrix}-3 & -4 \\ 4 & -3\end{pmatrix}$）。在有限域 $\mathbb{F}_5$ 上取四元数代数分裂表示 $\mathbf{i} \mapsto \operatorname{diag}(2, -2)$、$\mathbf{j} \mapsto \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$，六枚生成元均映为秩一非零矩阵，其全部 $36$ 个有序两两乘积中恰有 $6$ 个为零（即三对互逆生成元按两种顺序相乘）；将每枚秩一像写作列向量与行向量外积，即知任意长度 $L \ge 1$ 的既约字在模 $5$ 下恒非零。由于其模方为 $5^L$，除 $5$ 之外无其他素数能同时整除四坐标，故每条既约字均本原（$\gcd = 1$）；它亦不可能为纯标量（奇 $L$ 时 $5^L$ 非平方数，正偶 $L$ 时候选标量 $\pm 5^{L/2}$ 被 $5$ 整除），加之 $\operatorname{Ad}$ 的核仅为标量，因此 $S_5$ 在 $\mathrm{SO}(3, \mathbb{Q})$ 内严格自由生成 $F_3$。穷举核验确认字长 $L = 0, 1, 2, 3, 4, 5$ 上分别恰有 $1, 6, 30, 150, 750, 3750$ 个互异规范伴随旋转（累计 $1, 7, 37, 187, 937, 4687$ 个），各层最大坐标绝对值为 $1, 2, 4, 11, 24, 55$（对应二进制位长 $1, 2, 3, 4, 5, 6$）。由于任意长度 $L$ 既约字的最大坐标绝对值必落于 $[5^{L/2}/2, 5^{L/2}]$，其渐近位高增长率精确锁定为 $\frac{1}{2}\log_2 5$（$320$-位 Arb 包络四舍五入至六位小数为 $1.160964$ 比特每门）。

**精确有理球谐赫克算子及其认证谱（$T_5|_{V_\ell}$，$\ell = 1, \dots, 6$）。** 对任意 $R \in \mathrm{SO}(3, \mathbb{Q})$，逆拉回作用 $\rho_\ell(R)(P)(x) = P(R^{-1} x)$ 与拉普拉斯算子 $\Delta$ 交换，从而在 $(2\ell + 1)$ 维有理 $\ell$ 次齐次调和多项式空间 $V_\ell$ 上给出纯有理矩阵表示；逆闭平均 $T_5|_{V_\ell} = \frac{1}{6}\sum_{g \in S_5}\rho_\ell(\operatorname{Ad}(g))$ 在球面 $L^2$ 内积下自伴（故特征值全实）且全阵、迹与特征多项式系数均保持在 $\mathbb{Q}$ 内。每枚 $g \in S_5$ 的半旋转角余弦平方均为 $\cos^2(\theta/2) = w^2/\lVert g\rVert^2 = \frac{1}{5}$，由旋转特征标公式 $\sum_{m=-\ell}^\ell e^{im\theta} = U_{2\ell}(\cos(\theta/2))$ 及偶指标第二类切比雪夫多项式 $U_{2\ell}$ 的偶性，立得精确有理迹恒等式 $\operatorname{Tr}(T_5|_{V_\ell}) = U_{2\ell}(1/\sqrt{5}) \in \mathbb{Q}$。对 $\ell = 1, \dots, 6$（维数 $\dim V_\ell = 2\ell + 1$ 依次为 $3, 5, 7, 9, 11, 13$），下表汇总精确有理迹 $\operatorname{Tr}(T_5|_{V_\ell})$、平方的迹 $\operatorname{Tr}\bigl((T_5|_{V_\ell})^2\bigr)$ 与特征值最大模长（末列将 $\max\lvert\lambda\rvert$ 四舍五入至六位小数）；结合精确有理特征多项式分解、斯图姆隔离与双工作精度 Arb 包络，全部六个阶数的每一个特征值均严格满足连续拉马努金不等式 $9\lambda^2 < 5$（即 $\lvert\lambda\rvert < \frac{\sqrt{5}}{3} = \frac{1}{6}(2\sqrt{5})$，四舍五入至六位小数为 $0.745356$）：

| $\ell$ | $\operatorname{Tr}(T_5)$ | $\operatorname{Tr}(T_5^2)$ | $\max\lvert\lambda\rvert$ | $\approx\max\lvert\lambda\rvert$ |
| -----: | --------------: | ----------------------: | --------------: | ---------------: |
| $1$ | $-1/5$ | $1/75$ | $1/15$ | $0.066667$ |
| $2$ | $-19/25$ | $371/375$ | $37/75$ | $0.493333$ |
| $3$ | $139/125$ | $51581/46875$ | $43/75$ | $0.573333$ |
| $4$ | $-359/625$ | $356479/234375$ | $1037/1875$ | $0.553067$ |
| $5$ | $-1321/3125$ | $20469587/9765625$ | $\lambda_5^+$ | $0.637448$ |
| $6$ | $16901/15625$ | $72048089/48828125$ | $383/625$ | $0.612800$ |

其中在 $\ell = 1$ 上 $T_5|_{V_1} = -\frac{1}{15} I_3$ 为精确纯量阵（特征多项式因子 $(15\lambda + 1)^3$）；在 $\ell = 5$ 上，除有理根 $-\frac{351}{625}$（二重）与 $-\frac{349}{1875}$（三重）外，三重二次不可约因子 $q_5(\lambda) = 17578125\lambda^2 - 7376250\lambda - 2440723$ 的正根精确为 $\lambda_5^+ = \sqrt{\frac{503552\sqrt{109}}{29296875} + \frac{19941793}{87890625}}$（四舍五入至六位小数为 $0.637448$）；在 $\ell = 6$ 上，三重二次因子 $87890625\lambda^2 - 17321250\lambda - 3753119$ 的两根模长均严格小于精确有理主根 $\lvert -\frac{383}{625}\rvert = 0.6128$。

**有限 LPS 拉马努金凯莱图 $X^{5, 13}$ 与精确正定移位证书。** 在大于 $5$ 且满足 $q \equiv 1 \pmod 4$ 的最小素数 $q = 13$ 上，因 $5^2 \equiv -1 \pmod{13}$ 且勒让德符号 $\left(\frac{5}{13}\right) = -1$，取模 $13$ 分裂表示 $\mathbf{i} \mapsto \operatorname{diag}(5, -5)$、$\mathbf{j} \mapsto \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ 将 $S_5$ 的六枚生成元映入 $\mathrm{PGL}_2(\mathbb{F}_{13})$ 中行列式模平方类为非平方元的六枚矩阵。右乘作用生成连通、简单、无向 $6$-正则二分凯莱图 $X^{5, 13}$，顶点总数 $2184$、二分两部各 $1092$ 顶点；全图广度优先枚举结合凯莱点传递性证明其精确围长为 $8$。记 $B$ 为奇部行、偶部列的 $1092 \times 1092$ 整二分邻接阵，令 $C = B^{\mathsf{T}} B$。在偶部上对单位元顶点基向量 $e_1$ 执行稀疏整系数克雷洛夫迭代 $v_j = C^j e_1$，精确整格拉姆矩阵在 $v_0, \dots, v_{27}$ 上满秩可逆，而在 $28$ 次向量 $v_{28}$ 上存在精确线性相关并逐分量验零；由于 $\mathrm{PSL}_2(\mathbb{F}_{13})$ 左平移与 $C$ 交换且将 $e_1$ 传递映至偶部每个基向量，该 $28$ 次多项式正是 $C$ 的精确极小多项式（且由 $C$ 的实对称性，其每个根均作为特征值出现）。因 $C/36$ 为随机矩阵且偶部两步转移图连通，平凡根 $36$ 为单根；精确斯图姆隔离与 $320$-位 Arb 包络证明其余 $27$ 个互异非平凡根全部严格小于 $20$，最大非平凡根 $\alpha$（四舍五入至六位小数为 $18.060127$）恰为六次不可约因子

$$
x^6 - 46x^5 + 729x^4 - 4469x^3 + 7732x^2 - 3872x + 64 \;=\; 0
$$

的最大实根，由此严格认证次大奇异值 $\sigma_2(B) = \sqrt{\alpha}$（四舍五入至六位小数为 $4.249721$）严格低于拉马努金界 $2\sqrt{5}$（四舍五入至六位小数为 $4.472136$）。记 $J_{1092} = \mathbf{1}\mathbf{1}^{\mathsf{T}}$ 为 $1092 \times 1092$ 全一矩阵：若仅作平凡移位 $20 I_{1092} - C + \frac{16}{1092} J_{1092}$，全一向量 $\mathbf{1}$ 对应特征值恰为零；而取移位系数 $\frac{17}{1092}$ 构造

$$
M \;=\; 20 I_{1092} - B^{\mathsf{T}} B + \frac{17}{1092} J_{1092},
$$

则 $M\mathbf{1} = \mathbf{1}$，而在正交补 $\mathbf{1}^\perp$ 上每个特征值均为 $20 - \lambda_i(C) > 1$（因 $\alpha < 19$），从而纯粹依靠整数克雷洛夫极小多项式与严格根界证明了 $M$ 严格正定且最小特征值精确等于 $1$。

### 32.8.4.4 D-有限微分射流环 $J_N(\mathbb{Q})$、凯莱—三角代数统一与无 $\pi$ 马青有理包络 {#sec-ch39-dfinite-jets-cayley-machin}

沿 R. P. Stanley（[*European J. Combin.* **1**(2), 175–188, 1980](https://api.crossref.org/works/10.1016/S0195-6698(80)80051-5)）的 D-有限幂级数代数框架将 `Jet2Rat`（$\mathbb{Q}[\eta]/(\eta^3)$）推广至任意截断阶 $N$：在形式幂级数环 $\mathbb{Q}[[\eta]]$ 上，常系数或多项式系数线性微分递推 $E' = E$（$E(0) = 1$）、$C'' = -C$（$C(0) = 1, C'(0) = 0$）、$S'' = -S$（$S(0) = 0, S'(0) = 1$）与 $(1 + \eta^2)A'' + 2\eta A' = 0$（$A(0) = 0, A'(0) = 1$，立即给出 $(1 + \eta^2)A' = 1$）逐项唯一确定全部有理系数。对 $\eta^{N+1}$ 取商即得有限有理多项式射流环 $J_N(\mathbb{Q}) = \mathbb{Q}[\eta]/(\eta^{N+1})$ 中的多项式 $\mathrm{Exp}_N, \mathrm{Cos}_N, \mathrm{Sin}_N, \mathrm{Atan}_N$：对任意标量 $a, b \in \mathbb{Q}$（以及 $\mathbb{Q}[a, b]$ 上符号形式），二项式系数展开直接给出加法律 $\mathrm{Exp}_N(a\eta)\,\mathrm{Exp}_N(b\eta) \equiv \mathrm{Exp}_N((a+b)\eta)$ 与求逆律 $\mathrm{Exp}_N(\eta)\,\mathrm{Exp}_N(-\eta) \equiv 1 \pmod{\eta^{N+1}}$；由 $C' = -S$、$S' = C$ 推出 $(C^2 + S^2)' = 0$ 并结合常数项 $1$ 得 $\mathrm{Cos}_N(\eta)^2 + \mathrm{Sin}_N(\eta)^2 \equiv 1 \pmod{\eta^{N+1}}$；形式求导降一阶得 $(1 + \eta^2)\,\mathrm{Atan}'_N(\eta) \equiv 1 \pmod{\eta^N}$。

**凯莱—三角代数统一。** 形式复合对 $(F, G) = (\mathrm{Cos}(2\mathrm{Atan}), \mathrm{Sin}(2\mathrm{Atan}))$ 满足一阶线性微分方程组 $F' = -\frac{2G}{1 + \eta^2}$、$G' = \frac{2F}{1 + \eta^2}$ 及初值 $(F(0), G(0)) = (1, 0)$，而有理凯莱映射 $\bigl(\frac{1 - \eta^2}{1 + \eta^2}, \frac{2\eta}{1 + \eta^2}\bigr)$ 直接求导满足完全同一方程组与初值；由形式递推系数唯一性以及零常数项幂级数复合保持模 $\eta^{N+1}$ 截断，对任意 $N \ge 1$ 均在 $J_N(\mathbb{Q})$ 中成立精确多项式恒等式

$$
\mathrm{Cos}_N\bigl(2\,\mathrm{Atan}_N(\eta)\bigr) \;\equiv\; \frac{1 - \eta^2}{1 + \eta^2} \pmod{\eta^{N+1}}, \qquad \mathrm{Sin}_N\bigl(2\,\mathrm{Atan}_N(\eta)\bigr) \;\equiv\; \frac{2\eta}{1 + \eta^2} \pmod{\eta^{N+1}}.
$$

该组恒等式在 $N = 8$ 与 $N = 12$ 处均已逐项验零（$N = 8$ 亦由零导入 Lean 辅助核验）。在有理点 $\eta = \frac{1}{2}$ 处，未截断有理凯莱映射的精确像为毕达哥拉斯有理点 $(\frac{3}{5}, \frac{4}{5})$；对上述同余式次数不超过 $N$ 的规范多项式代表元在 $\eta = \frac{1}{2}$ 处求值（非零点求值不下沉至商环 $J_N(\mathbb{Q})$），所得截断凯莱多项式在 $N = 2, 4, 6, 8, 12$ 处的精确有理余弦—正弦误差依次为 $(-\frac{1}{10}, \frac{1}{5})$、$(\frac{1}{40}, -\frac{1}{20})$、$(-\frac{1}{160}, \frac{1}{80})$、$(\frac{1}{640}, -\frac{1}{320})$ 与 $(\frac{1}{10240}, -\frac{1}{5120})$，而不作二次截断直接嵌套求值两枚截断多项式 $\bigl(\mathrm{Cos}_N(2\,\mathrm{Atan}_N(\frac{1}{2})), \mathrm{Sin}_N(2\,\mathrm{Atan}_N(\frac{1}{2}))\bigr)$ 在 $N = 12$ 处给出有号误差（四舍五入至七位有效数字）$+1.235579 \times 10^{-5}$ 与 $-9.267049 \times 10^{-6}$。

**纯有理马青切线链与无 $\pi$ 交替包络。** 对满足 $u v \neq 1$ 与 $u v \neq -1$ 的有理数分别定义正切加减法 $u \oplus v := \frac{u + v}{1 - u v}$ 与 $u \ominus v := \frac{u - v}{1 + u v}$，经典马青公式在 $\mathbb{Q}$ 内化为一条分母处处非零的有限有理等式链：

$$
t_1 = \frac{1}{5} \;\longmapsto\; t_2 = t_1 \oplus t_1 = \frac{5}{12} \;\longmapsto\; t_4 = t_2 \oplus t_2 = \frac{120}{119} \;\longmapsto\; t_4 \ominus \frac{1}{239} = \frac{28561}{28561} = 1,
$$

末步约分前分子与分母同为 $28561$，全程不出现任何 $\pi$ 或反三角函数。单向投射至经典实阴影 $\Pi_{\mathbb{R}}$ 时，在主值支上取 $a = \arctan(\frac{1}{5})$ 与 $b = \arctan(\frac{1}{239})$，因 $0 < b < a < \frac{\pi}{4}$ 且 $\tan(2a) = \frac{5}{12}$ 得 $0 < 2a < \frac{\pi}{4}$，继而 $0 < 4a - b < \frac{\pi}{2}$；代入上述有理正切链即得 $\tan(4a - b) = 1$，由 $\tan$ 在 $(0, \frac{\pi}{2})$ 上的单射性得 $4a - b = \arctan(1) = \frac{\pi}{4}$。对 $(1 + t^2)^{-1}$ 逐项积分给出的两条交错级数满足对任意正整数 $M \in \mathbb{Z}_{\ge 1}$，第 $M$ 项部分和与第 $(M + 1)$ 项部分和严格夹住真值，按 $16a - 4b$ 的符号合并上下端点即得完全由有理数生成的双边包络，夹住 $\pi$ 的精确有理宽度为

$$
W_M \;=\; \frac{16}{5^{2M+1}(2M+1)} + \frac{4}{239^{2M+1}(2M+1)}.
$$

当 $M = 1$ 时，精确有理区间 $[\frac{281476}{89625}, \frac{651864872}{204778785}]$（端点四舍五入至六位小数为 $3.140597$ 与 $3.183264$）宽度为 $\frac{218431204}{5119469625}$（四舍五入至七位有效数字为 $4.266676 \times 10^{-2}$）；随 $M = 2, 4, 6, 8$ 递增，有理包络宽度依次收缩至 $1.024000 \times 10^{-3}$、$9.102222 \times 10^{-7}$、$1.008246 \times 10^{-9}$ 与 $1.233619 \times 10^{-12}$，增至 $M = 17$ 时进一步收窄至 $1.570731 \times 10^{-25}$（以上宽度均取自 $320$-位 Arb 证书并四舍五入至七位有效数字；独立 $320$-位 Arb 计算确认 $\pi$ 严格落于每一级有理区间之内）。

**档案边界与证据分层（`ARGUED` / `NUM`）。** 本小节的全部书面论证、精确有理与双工作精度（$256$-位与 $320$-位）FLINT/Arb 证书及独立零导入 Lean 辅助核验代码归档于 [Issue #1126](https://github.com/the-omega-institute/trureturing-books/issues/1126) 对应的[固化校验档案](https://gist.github.com/loning/cc157a7795928e9ca1c7ab25c10eb333/3a3ff48ccbaf4dce3a4b23eba250e3a937880445)（提交 `3a3ff48ccbaf4dce3a4b23eba250e3a937880445`，原始 [`SHA256SUMS`](https://gist.githubusercontent.com/loning/cc157a7795928e9ca1c7ab25c10eb333/raw/3a3ff48ccbaf4dce3a4b23eba250e3a937880445/SHA256SUMS) 的 SHA-256 摘要为 `bcf6518d3eeec355ab1861ca4964d2fdfa3139cd1f1c095f69644de44113653e`）。档案三套计算套件共认证 $140$ 条精确有理/代数记录（按三套件依次为 $53 + 37 + 50$）与 $121$ 条区间包络记录（依次为 $5 + 57 + 59$），双工作精度比对零精确失配且全部 $320$-位区间严格嵌套于对应 $256$-位区间之内；随附零导入 Lean `v4.35.0` 脚本 `omega_math_extensions_check.lean`（仅隐式依赖 `Init`，以 `by decide +kernel` 归约并输出 `'cycle16_omega_math_extensions_check' does not depend on any axioms`）核验四枚有限格拉姆行列式、六枚提升见证旋量上的乘积/流群/二次核谓词、单独核验的 `g120_spin` 六拍轨迹与保真度、`QSqrt2` 旋子幂次与 $(2\delta)^2 = 8$、`QPhi` 幂律与范数（至 $n = 12$）及 $T_5(\varphi/2) = -1, T_{10}(\varphi/2) = 1, T_5((\varphi - 1)/2) = 1$、$S_5$ 生成元与 $T_5|_{V_1} = -\frac{1}{15} I_3$ 满足 $9(-\frac{1}{15})^2 < 5$、$J_8(\mathbb{Q})$ 中指数求逆/勾股/$(1+\eta^2)$ 求逆与两条凯莱—三角恒等式，以及归约结果为 $1$ 的马青有理正切链（贝尔关联、$T_{20}$、指数加法律、反正切导数同余、未约分 $28561/28561$ 与更高阶谱界由直接算术及 Python/Arb 套件核验）。该独立脚本仅作为本节档案的辅助计算核验，不计入本书所钉 `trureturing` 冻结 `LEAN ✓` 定理计数；全称结论由书面证明确立（`ARGUED`），所述有限实例、谱界与区间包络由精确有理、Arb 与独立 Lean 核验认证（`NUM`）。

---

**沙盘沿着 Lean 的求值过程展示一项有限整数计算。**

第一张卡片展示 `omega_zero_axiom_master_check` 的八个有限断言。原型隐式导入标准 `Init`，这条定理的公理清单为空。严格库的空内核重放另选 `OmegaMath.Projective.Circle` 等库根并核验其导入闭包。其余卡片展示 `pHalf` 与 `qHalf` 随次序变化的乘积、`g120` 的三拍归位、舒尔极小值 $S=4/3$ 和整数证书 $70<128$。下一章继续讨论圆弧模型。[第三十三章](ch33-unified-arc-forces-and-af-gut.md)

::: {.viz src="lean4-zero-axiom-omega-math-sandbox" height="620"}
五张卡片分别展示有限原型的公理审计、整数射线规范化、三元数与射流的八个有限断言、有理舒尔证书与单向实数桥接，以及四项证明基准。两张图给出实测证明依赖、浏览器的整数运算步数和精确四分深度界。
:::
