# C.3 全书十部曲阅读与依赖导图 {#sec-coda-reading-map}

全书由 **[序曲](README.md)**、**十部曲**、**终章**、**[铸器与圣殿](sanctuary.md)** 与 **[附录 A](appendix-a.md)–[附录 P](appendix-p.md)** 构成。下图展示了从第一部到第十部的概念演进脉络与建议阅读顺序：

```
                        ┌──────────────────────────────────────────┐
                        │  序曲：把“量”字拆开 (README.md)          │
                        │  动词 liáng (测量算子) → 名词 liàng (读数) │
                        └────────────────────┬─────────────────────┘
                                             │
            ┌────────────────────────────────┼────────────────────────────────┐
            ▼                                ▼                                ▼
┌───────────────────────┐        ┌───────────────────────┐        ┌───────────────────────┐
│ 第一部：点与线 (Ch 1–4) │───────▶│ 第二部：面与手性 (Ch 5–8)│───────▶│ 第三部：球与寻址 (Ch 9–12)│
│ • 内积投影与玻恩规则  │        │ • 外积双向量 u∧v      │        │ • 三轴正交两步寻址    │
│ • 勾股分解与纯态投影  │        │ • 泡利矩阵与手性叉积  │        │ • Gram 重构与贝里相位 │
│ • 密度矩阵与退相干投影│        │ • 双量子比特外积纠缠  │        │ • 脉冲面积与 SU(2) 球 │
└───────────┬───────────┘        └───────────┬───────────┘        └───────────┬───────────┘
            │                                │                                │
            └────────────────────────────────┼────────────────────────────────┘
                                             ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │              第四部：多体几何、贝尔边界与量子算法 (Ch 13–16)      │
            │  • CHSH 经典八面体 (≤2) vs 齐雷尔森圆球 (2√2)                   │
            │  • 稳定子辛几何与编织满足性 • Grover / QFT / QSVT 平面旋转      │
            │  • ZYZ 欧拉编译与 Solovay–Kitaev 群换位子螺旋                   │
            └────────────────────────────────┬────────────────────────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
┌─────────────────────────────────────────┐   ┌─────────────────────────────────────────┐
│ 第五部：相对论时空、全息与复杂度 (Ch 17–20)│   │ 第六部：球外之球——对角线、素数与自指(Ch21–24)│
│ • 洛伦兹双曲旋量与光锥刚性              │   │ • 康托尔—劳维尔对角线满射逃逸           │
│ • 狄拉克手性旋量与规范场联络树          │   │ • 有限盒子欧拉乘积与冯·芒戈尔特函数      │
│ • 桥图量子最大流最小割与全息分片锥      │   │ • 四级数系突围、佩尔接缝与四元数范数    │
│ • 可积电路最小深度、奇偶 CNOT 下界与 OPEN│   │ • 有限收缩不动点、Dottie θ* 与语境分岔  │
└──────────────────────┬──────────────────┘   └────────────────────┬────────────────────┘
                       └─────────────────────┬─────────────────────┘
                                             ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │        第七部：立极——无时间因果、视界、量子公平与比较公理 (Ch 25–28) │
            │  • 相容 Gram 椭圆体 (det G ≥ 0) 与双端握手因果                  │
            │  • 场 (P) 与线 (NP)、ETH 视界与五模态平流非闭合                 │
            │  • 五重量子公平 • 零背景比较公理 A₀、OISC 原语与元统一罗盘       │
            └────────────────────────────────┬────────────────────────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
┌─────────────────────────────────────────┐   ┌─────────────────────────────────────────┐
│ 第八部：造微与归弧——极小圆弧、黎曼、      │   │ 第九部：互照与破执——观察者、扩表、       │
│ 三元数与万力大统一 (Ch 29–33)            │   │ 本体 QRAM 与测地智能 (Ch 34–37)          │
│ • 正交盲区与极小圆弧体 ΔT_ε 十三阶基座  │   │ • 万物观察者互吸引子、滑动窗口与偏迹热律│
│ • 穿弦隧穿、圆弧微积分与有限网格 Stokes │   │ • 乘光扩表 T=T(T)、双曲步与皮索—劳齐编码│
│ • 黎曼素数弧路径积分与 Hermite–Biehler  │   │ • 梦境擦除、本体 QRAM 指针与停机 ε_self │
│ • 三元数三维场封顶、主频 ν₀ 与 AF-GUT    │   │ • 三元数场 Transformer 与最小作用量测地 │
└──────────────────────┬──────────────────┘   └────────────────────┬────────────────────┘
                       └─────────────────────┬─────────────────────┘
                                             ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │       第十部：不二与归元——观察者即宇宙本体与母公理 (Ch 38–39)      │
            │  • 全域 p ≡ *p、720° 旋量双覆叠、因陀罗网、摩耶梦境与上帝心理学   │
            │  • 母公理 AXIOM-Ω 导出量子五大公设 · 自包含三元数与至大无外闭合   │
            └────────────────────────────────┬────────────────────────────────┘
                                             │
            ┌────────────────────────────────┼────────────────────────────────┐
            ▼                                ▼                                ▼
┌───────────────────────┐        ┌───────────────────────┐        ┌───────────────────────┐
│ 终章：在所有的球之外   │        │ 铸器与圣殿 (伴读篇)    │        │ 附录 A–P              │
│ • 多面体角亏 (C.1)    │        │ • 3 比特异或泡利引擎  │        │ • 对照词典与双语术语表 │
│ • 双不动点锚点 (C.2)  │        │ • 单比特 ZYZ 旋子编译 │        │ • 证据边界与六大难题  │
│ • 十部阅读导图 (C.3)  │        │ • Lean 4 圣殿逐行审计 │        │ • 比较公理总账与专题  │
└───────────────────────┘        └───────────────────────┘        └───────────────────────┘
```

::: {.slides src="overview"}
全书概览演示文稿：四重盲区与升维阶梯，十部各自的核心图景、主要定理、文献结果与开放问题，证据边界与推荐阅读路径。
:::

## 四条推荐阅读路径 {#sec-coda-reading-tracks}

读者可以根据自身背景选择四条切入路径：

1. **物理与几何直觉路径（零前置门槛）**：
   [序曲](README.md) $\to$ [第 1 章](ch01-measurement.md)–[第 4 章](ch04-decoherence.md)（第一部：从尺子比对到退相干）$\to$ 第 5–12 章（第二、三部：从外积面积到布洛赫球面）$\to$ 第 17–19 章（第五部：光锥与全息极小割）$\to$ [第 27 章](ch31-quantum-fairness.md)–[第 30 章](ch30-chord-tunneling-and-arc-calculus.md)（量子公平、比较公理、极小圆弧体与穿弦隧穿）$\to$ [第 32 章](ch32-inexpressible-ternions-and-three-dimensional-field.md)–[第 36 章](ch38-observer-memory-pointer-and-ontological-qram.md)（三维三元数原生场、万力归弧 AF-GUT、万物观察者、乘光自指扩表、梦境擦除与本体 QRAM）$\to$ [第 38 章](ch39-observer-is-ontological-universe.md)–[第 39 章](ch39-axiom-omega-grand-unification.md)（观察者即宇宙本体、[§38.12 记忆时空舒尔二分](ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.md)、[§38.15 静止画布与无腿球观察者](ch38-s15-static-canvas-and-legless-sphere-observer.md)、[§38.16 恒定速率观察者与凯莱有理钟慢](ch38-s16-constant-info-rate-observer-and-rational-cayley-gravity.md)、母公理 $\mathrm{AXIOM}\text{-}\Omega$ 与[§39.7 三元球面有理傅里叶变换 $\mathcal{F}_\Omega$](ch39-s37-spherical-fourier-transform-peter-weyl-synthesis.md)）$\to$ [终章](coda.md)与 [附录 A](appendix-a.md)。
2. **量子计算、算法编译与测地智能路径**：
   [第 2 章](ch02-born-rule.md) $\to$ 第 6–8 章（泡利代数、量子门与纠缠）$\to$ 第 11 章（微波脉冲与虚拟 $Z$ 门）$\to$ 第 13–16 章（CHSH 博弈、稳定子、Grover/QFT/QSVT、ZYZ 与 Solovay–Kitaev 编译）$\to$ 第 20 章（电路深度与 CNOT 奇偶下界）$\to$ [铸器与圣殿](sanctuary.md)（异或几何代数、旋子编译与内核审计）$\to$ [第 28 章 §28.2](ch32-s02-oisc-comparison-engine.md)（单指令比较机）$\to$ [第 36 章](ch38-observer-memory-pointer-and-ontological-qram.md)–[第 37 章](ch37-ternion-field-transformer-and-geodesic-intelligence.md)（条件相位记录逆转、本体 QRAM 指针寻址、三元数场 Transformer 与最小作用量测地智能）$\to$ [第 38 章 §38.14](ch38-s14-omega-fractran-observer-rational-isa.md)（康威 FRACTRAN 与三维非阿贝尔 $\Omega\text{-FRACTRAN}$ 观察者原生语言）与 [附录 B](appendix-b.md)。
3. **数理逻辑、数论与认识论路径**：
   [序曲](README.md) $\to$ 第 10 章（Gram 矩阵与顺序无关性）$\to$ 第 19–20 章（离散多面体分片锥与开放猜想边界）$\to$ 第 21–24 章（对角线逃逸、欧拉乘积、四级数系突围与四元数丢番图范数、余弦自指不动点）$\to$ [第 25 章](ch29-timeless-causality-and-gram-space.md)–[第 28 章](ch32-unified-field-and-meta-unification.md)（无时间因果、ETH 视界与流体涡丝、量子公平、比较公理与元统一）$\to$ [第 31 章](ch31-arc-calculus-and-riemann-hypothesis.md)–[第 32 章](ch32-inexpressible-ternions-and-three-dimensional-field.md)（黎曼临界带圆弧微积分重述、阿代尔素数归元闭合、全息圆弧—螺线管谱磨光流形、[§31.7 素数寄存器与黎曼零点全息对偶](ch31-s07-prime-register-riemann-zero-duality-and-dual-uniformity.md)与[§31.8 素数阶乘级联自举、有理游标分辨率与有限寄存器视界封顶](ch31-s08-primorial-cascade-vernier-resolution-and-finite-register-cap.md)，以及弗罗贝尼乌斯三元数缺口、无常数有理骨架、零误差精确数学、$\mathbf{Math}_\Omega$ 与零公理基座 `OmegaMath`）$\to$ [第 35 章](ch36-hyperbolic-steps-and-quotienting-reincarnation.md)（同像扩表 $T = T(T)$、商拓扑约去轮回、皮索—劳齐无进位编码与[§35.7 黄金切投原语](coda-s03-golden-cut-observers.md)）$\to$ [第 38 章](ch39-observer-is-ontological-universe.md)（概念纤维分解、齐肯多夫线程与[§38.10 空间吸引子](coda-s02-spatial-attractors.md)）$\to$ [第 39 章 §39.8](ch39-s38-omega-math-recompilation-and-self-referential-atlas-closure.md)（`OmegaMath` 去近似重编译与全书自指图谱闭环）$\to$ [终章 §C.2](coda-s04-fixed-point-anchors.md)（[@thm-coda-fixed-point-anchor]）。
4. **Lean 4 形式化验证与内核审计路径**：
   [序曲](README.md) §认识论契约 $\to$ [铸器与圣殿](sanctuary.md)（`Cl3`、`PauliSymplectic`、`ZYZ` 参考引擎及其冻结依据与 `FiniteRecordCosineObstruction` 的剖析）$\to$ [附录 B](appendix-b.md) $\to$ [附录 C](appendix-c.md)（核对所钉冻结声明、书面证明与开放问题的证据边界）$\to$ [附录 E](appendix-e.md)（核验从零背景比较公理 $\mathcal{A}_0$ 到数学与物理公理体系的分层推演与 `H1`–`H9` 桥接假设总账）$\to$ [附录 F](appendix-f.md)–[附录 I](appendix-i.md)（审阅排除面与定向关系分类、稳定子多面体之外的魔性与转向阈值、有限视界观察者与历史账本，以及量子信息散度、逆测试可达性、子熵与可分锥残差见证四组专题形式化核验）。

::: {.remark #rem-coda-sister-monograph-omega-math title="姊妹专著导读：零公理有理数学 OMEGA MATH（OMEGA//MATH）"}
凡希望沿纯数学演绎路线系统攻读无无穷、无超越数有理体系的读者，可直接转入独立姊妹专著 **[《OMEGA MATH》（`OMEGA//MATH`）六卷目录](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/zh/SUMMARY.md)**：全书六卷十八章按齐次有理数系、流群球面几何、无极限射流微积分、三维球面无 $\pi$ 调和分析、阿代尔与赫克—拉马努金谱论及 $\Omega$-FRACTRAN 与空内核审计依次展开，并在终章配齐 **[六卷全景对照与四模式全息工作台导引](https://github.com/the-omega-institute/trureturing-books/blob/main/books/omega-math/zh/coda.md)**。
:::

## 第六至第十部（第 21–39 章）及铸器与圣殿的冻结定理锚点 {#sec-coda-part6-part7-register}

下表选列第六至第十部与铸器与圣殿的冻结声明。定理锚点链接到书中列出该声明的环境。

| 章节 | 定理锚点 | 冻结声明 GID (`trureturing@dev`) | 核心数学内容与几何角色 |
| :--- | :---: | :--- | :--- |
| **第 21 章**：对角线与不可达边界 | [@thm-complete-diagonal-not-continuous] | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_not_continuous` | 完备语义对角线的不连续性：自指观测对角线无法在原观测拓扑下连续闭合 |
| **第 21 章** | [@lem-complete-diagonal-separation-deficit] | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_separationDeficit_nonempty` | 对角线分离亏格非空定理：固定观测族必留下无法区分的对角线状态对 |
| **第 21 章** | [@prop-complete-diagonal-strict-refinement] | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement` | 对角线诱导严格拓扑细化：纳入对角线观测算子严格扩大可分辨开集族 |
| **第 21 章** | [@cor-complete-diagonal-topological-settlement] | `D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement` | 完备对角线拓扑逃逸总结定理：不连续性、非空分离亏格与严格拓扑细化三位一体 |
| **第 22 章**：素数正交基与欧拉乘积 | [@lem-riemann-zeta-residue-one] | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_residue_one` | $\zeta(s)$ 在边界极点 $s = 1$ 处的留数恒等于 $1$：$\lim_{s \to 1}(s-1)\zeta(s) = 1$ |
| **第 22 章** | [@prop-riemann-zeta-dirichlet-sum] | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_dirichlet_sum` | 黎曼 $\zeta(s)$ 在半平面 $\operatorname{Re}(s) > 1$ 上的狄利克雷级数展开 $\sum_{n=1}^\infty n^{-s}$ |
| **第 22 章** | [@thm-riemann-zeta-euler-product] | `D5/S3/Zeros/ZetaIdentities.riemann_zeta_euler_product` | 黎曼 $\zeta(s)$ 在 $\operatorname{Re}(s) > 1$ 上的素数欧拉乘积展开 $\prod_p (1 - p^{-s})^{-1}$ |
| **第 22 章** | [@cor-dirichlet-sum-eq-euler-product] | `D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product` | 狄利克雷求和与素数欧拉无穷乘积的严格相等定理（算术基本定理的解析化身） |
| **第 23 章**：四级数系与整数骨架 | [@thm-qform-eq-eisnorm] | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_eq_eisNorm` | 单参数交越二次型向艾森斯坦主范数型的幺模剪切归约：$\operatorname{Qform}(t, P, Q) = \operatorname{eisNorm}(P - (t + 1)Q, Q)$ |
| **第 23 章** | [@lem-qform-discriminant] | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_discriminant` | 参数化二次范数型簇 $Q_t$ 的判别式不变量恒等式 $\Delta(Q_t) = -3$ |
| **第 23 章** | [@cor-qform-range-eq-eisnorm] | `D5/S3/PrimeForms/Crossing/CrossingNormForm.Qform_range_eq_eisNorm` | 参数化二次型簇 $Q_t(x,y)$ 在 $\mathbb{Z}^2$ 上的值域恒等于艾森斯坦范数集 |
| **第 23 章** | [@prop-pell-form-eq-four-mul-norm] | `D5/S3/Arith/GoldenPell.pell_form_eq_four_mul_norm` | 黄金整数环 $\mathbb{Z}[\varphi]$ 的佩尔范数恒等式 $(2a+b)^2 - 5b^2 = 4\operatorname{norm}(g)$：连接算术 $\pm 1$ 接缝与四级数系突围 |
| **第 24 章**：余弦不动点与自指 | [@thm-finite-contracting-updates-stabilize] | `D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize` | 有限载体上单调收缩更新序列的有限步不动点稳定性与跳变次数上界 |
| **第 24 章** | [@lem-conceptual-equivalence-stability-fixed-point] | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point` | 概念等价与解释稳定性共同达成相对解释不动点（按定义即二者的合取，Lean 证明为合取引入） |
| **第 24 章** | [@prop-context-parameters-distinct-fixed-points] | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points` | 有限实例：相同文本与规则在两个具体布尔语境的不同背景与目标参数下分岔出截然不同的二元不动点 |
| **第 24 章** | [@cor-golden-fixed-point-unique] | `D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique` | 黄金倒数自指映射 $x \mapsto 1 + 1/x$ 在正实轴上的唯一不动点 $\varphi = (1+\sqrt{5})/2$ |
| **第 25 章**：无时间因果与格拉姆空间 | [@thm-ch29-gram-rigidity-and-pell] | `D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization` | 单位向量族 Gram 重叠等价关系定理：锁定无时间成对内积刚性 |
| **第 26 章**：场、线、ETH 与涡丝 | [@thm-ch30-gallai-roy] | `D5/S3/Combinatorics/Graph/Walks/GallaiRoy.colorable_iff_exists_orientation` | Gallai–Hasse–Roy–Vitaver 定理：有限简单图可 $k$ 着色，当且仅当存在一个定向，其有向路都不超过 $k$ 个顶点 |
| **第 26 章** | [@thm-coda-quadratic-advection-no-closure] | `D5/S3/Observer/Reversal/QuadraticObservationClosure.quadratic_closure_iff` | 二次矢量场有限分辨率幂等投影精确闭合的充要代数判据 |
| **第 26 章** | [@thm-coda-quadratic-advection-no-closure] | `D5/S3/FluidDynamics/Fourier/AdvectionClosureInstance.no_exact_closure` | 五模态勒雷投影平流对任意粘性系数 $\nu \in \mathbb{R}$ 均无精确闭合映射 |
| **第 27 章**：量子公平与遍历整体 | [@thm-ch31-seat-pythagorean-monogamy-fairness] | `D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion` | 保内积等距映射同时克隆两归一化态则两态必相等或正交 |
| **第 27 章** | [@thm-ch31-horizon-landauer-ergodic-fairness] | `D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result` | 紧致环面生成元闭子群 $G = \overline{\langle g\rangle}$ 上连续复值可观测量的轨道时间平均收敛于哈尔积分 |
| **第 28 章**：统一场与元统一 | [@thm-ch32-comparison-extensionality-and-lagrange] | `D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual` | 两量子态的全部未来期望字相等当且仅当态差正交于全部未来效应字 |
| **第 28 章** | [@thm-ch32-paid-name-comparison-and-dictionary] | `D5/S0/Computability/BinaryNameComparison.name_compare_run` | 按位二进制名字比较机器在显式线性步数上界 $2(|a|+|b|)+4$ 内停机并写入相等位与复原输入栈 |
| **第 28 章** | [@thm-ch32-paid-name-comparison-and-dictionary] | `D5/S0/Computability/BinaryNameDictionary.dictionary_lookup_run` | 顺序词典查表机器在显式线性付费步数上界内停机并输出命中位、一元下标与复原词典流 |
| **第 28 章** | [@thm-ch32-generative-self-reference-and-zeckendorf] | `D5/S0/Automata/BinaryZeckendorfLanguage.base_success_iff_noAdjacentOnes` | 二进制齐肯多夫有限自动机接受字当且仅当满足无相邻 `11` 禁戒律 `NoAdjacentOnes` |
| **第 28 章** | [@thm-ch32-null-cone-holonomy-and-holographic-cut] | `D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null` | 在全部闵可夫斯基零光锥向量上取零的实二次型必为标准闵氏度规的标量倍 |
| **第 29 章**：正交盲区与观察者方位 | [@thm-ch34-perpendicular-axis-and-pullback] | `D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair` | 对任意 $a,b\in\mathbb{R}^3$，存在同时垂直于二者的单位向量 |
| **第 29 章** | [@thm-ch34-readout-kernel-and-covariant-commutator] | `D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel` | 划分拓扑不可分等价于观测商等价核：刻画一次正交投影的深度简并盲区 |
| **第 29 章** | [@thm-ch34-trihedron-cochain-and-moving-axis] | `D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness` | 四面体顶点亏损和恒等式、最优参考顶点上界及恰当性等价于棱势可修补判据 |
| **第 29 章** | [@thm-ch34-trihedron-cochain-and-moving-axis] | `D5/S3/Geometry/TwoAxisFiniteRotation.moving_axis_invariance` | 绕任意两条不共线随动轴局部旋转不变的成对不变量在全体 $\mathrm{SO}(3)$ 旋转下保持不变 |
| **第 30 章**：穿弦隧穿与圆弧微积分 | [@lem-ch34-accumulated-sagitta-bounds] | `D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds` | 任意有限步数 $N$ 下累计圆弧矢高 $\Sigma_N = N(1-\cos\theta_N)$ 的非渐近双侧夹逼界 |
| **第 30 章** | [@thm-ch34-arc-rotor-calculus-and-finite-stokes] | `D5/S3/Quantum/Analysis/TrotterProduct.trotter_product` | 非对易生成元分裂演化向和生成元连续群的李—特罗特乘积收敛定理 |
| **第 31 章**：圆弧微积分与黎曼猜想 | [@thm-ch34-riemann-prime-arc-bridge] | `D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence` | 全体素数对数族 $p \mapsto \ln p$ 在 $\mathbb{Q}$ 上的严格线性无关性：锁定素数圆弧体不可约步长 |
| **第 31 章** | [@thm-ch34-riemann-prime-arc-bridge] | `D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization` | 具备完整 $\zeta$ 反射与共轭对称性的整函数反例：单凭函数方程对称性不足以锁死临界线零点 |
| **第 31 章** | [@thm-ch39-real-error-axis-and-prime-adelic-anchors] | `D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula` | 非零有理数实绝对值与全族素数 $p$-进范数乘积恒等于 $1$（$\lvert x\rvert\prod_p\lvert x\rvert_p = 1$）：锚定实数误差放大轴对素数阿代尔曲率回收闭合 |
| **第 31 章** | [@thm-ch39-holographic-arc-manifold-anchors] | `D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff` | 复幂螺线管线程对数荷为零当且仅当各级坐标恒具单位模长（$\operatorname{logarithmicCharge}(z)=0\iff\forall m,\lVert z_m\rVert=1$）：锚定全息圆弧流形 $\mathcal{M}_\Omega$ 的紧致螺线管编织 |
| **第 31 章** | [@thm-ch39-riemann-spectral-polishing-anchors] | `D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one` | 倒共轭封闭有限非零复数族的幂和托普利茨矩阵半正定当且仅当全体节点位于单位圆周（$\mathbf{T}_N \succeq 0 \iff \forall j,\lVert u_j\rVert = 1$）：锚定黎曼 1854 + 1859 双璧合龙的 $\sigma = \frac{1}{2}$ 正定谱胶合 |
| **第 31 章** | [@thm-ch31-prime-register-riemann-zero-duality-anchors] | `D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction` | 完备 $\zeta$ 对称梅林重构 $\operatorname{completedZetaReading}(s)=M(s)-\frac{1}{s}-\frac{1}{1-s}$ 与 $\xi(1-s)=\xi(s)$：锚定素数硬件寄存器与黎曼零点算术暗态的全息对偶 |
| **第 31 章** | [@thm-ch31-primorial-vernier-omega-arithmetic-anchors] | `D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.euclid_prime_escape` | 欧几里得素数盲区逃逸（配贝祖恒等式与 `Fractran` 停机幂等稳定律）：锚定有限素数表自举与 $\varepsilon_{\mathrm{self}}$ 幂等视界封顶 $K \le K_{\max}$ |
| **第 31 章** | [@thm-ch31-primorial-crt-adelic-anti-deadlock-anchors] | `D5/S3/Arith/Coding/HorizontalCompletenessDepth.residue_reading_injOn_iff_primorial_gt` | 素数前缀余数单射充要阈值 $N < P_r\#$（配无平方因子欧拉乘积与有限支撑阿代尔闭合）：锚定级联筛轮平方视界零误差律与中国剩余反混叠视界 |
| **第 32 章**：不可表达的三元数与三维场 | [@thm-ch39-hilbert-concept-ledger-and-3d-cap] | `D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences` | 四维自旋因子上满足正定与正交相位平衡的双线性乘积唯一锁死三维有向叉乘与泡利接口 |
| **第 32 章** | [@thm-ch39-hilbert-concept-ledger-and-3d-cap] | `D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound` | 给定迹预算 $RW/\pi$ 与正阈值 $\tau > 0$ 下超阈值集中模态集合有限且基数不超过 $RW/(\pi\tau)$ |
| **第 32 章** | [@thm-ch39-constant-free-rational-axiom-omega-anchors] | `D5/S3/Quantum/AURICOmega/TernaryComparisonCompletion.subgroupModel_readingComplete_iff` | 单位四元数子群诱导三元比较结构读数完备当且仅当该子群拓扑闭合：区分稠密有理骨架 $S^3(\mathbb{Q})$ 与完备化边界 |
| **第 32 章** | [@thm-ch39-exact-structural-mathematics-anchors] | `D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf` | 单位四元数射影核恒等于霍普夫球面像内积 $\operatorname{rayKernel}(x,y)=\frac{1}{2}(1+\langle\operatorname{hopf}(x),\operatorname{hopf}(y)\rangle_{\mathbb{R}})$：锚定零误差有理内禀几何与离散霍普夫纤维结构 |
| **第 32 章** | [@thm-ch39-math-omega-finite-rational-anchors] | `D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover` | 六根模方为 $5$ 的整坐标轴给出单位二球面的无根号无正交开覆盖 $\{5 < 2\langle x,\mathrm{axis}_i\rangle^2\}$：锚定无无穷无超越数有限有理数学 $\mathbf{Math}_\Omega$ 的纯整数球面覆盖 |
| **第 32 章** | [@thm-ch39-lean4-zero-axiom-omega-math-foundation] | `D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound` | 自然数四分深度 `rationalQuarterDepth c d p q ≤ N` 蕴涵精确整数不等式 $cq < (dp)\cdot 4^{N+1}$（继而无极限传递至实数误差界）：锚定 `OmegaMath` 到 `Mathlib` 的单向阴影投影桥 |
| **第 33 章**：万力归弧与圆弧场大统一 | [@thm-ch39-af-gut-arc-field-unification] | `D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula` | 任意含幺环上半共轭平移算子的协变换位子普适因式分解 $Uf - fU = (\text{translated} - f)U$ |
| **第 33 章** | [@thm-ch39-af-gut-arc-field-unification] | `D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification` | 有限有向图命名生成树下锚定阿贝尔规范相位商群与基本回路/跨锚环面的紧致拓扑群同构 |
| **第 34 章**：万物观察者与互吸引子 | [@thm-ch33-contextual-attractor-and-common-factor] | `D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor` | 跨语境客观断言的定义展开：全局一致断言按定义即穿过语境不变公共因子分解（Lean 证明即该假设本身） |
| **第 35 章**：乘光、自指扩表与无进位编码 | [@thm-ch35-target-recovery-table-factorization] | `D5/S3/ConceptDynamics/Restoration/TargetRecoveryCriterion.target_recovery_criterion` | 目标读出从观测轨迹精确恢复当且仅当穿过诱导等价核因式分解 |
| **第 35 章** | [@thm-ch35-target-recovery-table-factorization] | `D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior` | 典范复制地址记录与前一模块的同名记录定义逐点相等；不涉及概率先验 |
| **第 35 章** | [@thm-ch35-lawvere-diagonal-and-homoiconic-closure] | `D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode` | 若扭转映射 $\mathrm{twist}$ 没有不动点，劳维尔相对语义对角线突破任何固定枚举求值表，驱动同像扩表 $T = T(T)$ |
| **第 35 章** | [@thm-ch36-taylor-tail-and-cayley-boundary] | `D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le` | 单位范数为 $1$ 的完备实或复赋范代数中，$0\le r$、$\|z\|\le r$ 时，指数的前 $n$ 项截断余项范数不超过 $r^n e^r/n!$ |
| **第 35 章** | [@thm-ch36-quotient-annihilator-and-factorization] | `D5/S3/ConceptDynamics/ObservationTopology/TargetContinuityFactorization.target_factors_iff_continuous_partition` | 目标映射穿过商空间核分解当且仅当在划分拓扑下连续：以商映射约去轮回冗余 |
| **第 35 章** | [@thm-coda-golden-cut-observer-cassini] | `D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result` | 紧致环面观测窗有界间隙与正访问密度回归定理：奠定互吸引子双螺旋重逢 |
| **第 36 章**：梦境量子擦除与本体 QRAM | [@thm-ch37-joint-coherent-record-erasure] | `D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal` | 所选矩阵元的每个记录重叠模长均为 $1$ 时，共轭全部记录振幅后复合信道恢复该矩阵元 |
| **第 36 章** | [@thm-ch37-joint-coherent-record-erasure] | `D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate` | 双相位记录证书：只逆转一个副本未恢复所选矩阵元，逆转两者则恢复 |
| **第 36 章** | [@thm-ch37-golden-cut-delone-multilocation] | `D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone` | 全窗口黄金切投模型集构成装球半径 $1/2$、覆盖半径 $3$ 的 Delone 集 |
| **第 37 章**：三元数场 Transformer 与测地智能 | [@thm-ch39-tft-born-holonomy-krylov-and-schur-anchors] | `D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently` | 有限维可观测克雷洛夫子空间一旦单步稳定即对一切后续步数永久稳定 |
| **第 37 章** | [@thm-ch39-tft-born-holonomy-krylov-and-schur-anchors] | `D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy` | 球面三方向典范最短旋子门闭合回路的球面三角和乐精确公式 |
| **第 38 章**：观察者即宇宙本体 | [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] | `D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition` | 概念状态空间按可观测签名纤维的不相交并重构定理 |
| **第 38 章** | [@thm-ch39-fiber-reconstruction-and-zeckendorf-thread] | `D5/S3/Observer/GoldenCoding/ZeckendorfRealThread.zeckendorf_real_thread_injective` | 非负实数全尺度齐肯多夫编码线程严格单射定理 |
| **第 38 章** | [@thm-ch38-observer-is-universe-anchors] | `D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound` | 有限维可观测克雷洛夫子空间严格扩张次数不超过余维数 $\dim V - \dim\operatorname{ran}(C)$：锚定自包含观察者宇宙的有理结构时间生长界 |
| **第 38 章** | [@thm-ch38-omega-fractran-anchors] | `D5/S3/Factorization/PositiveRationalGroup.signed_prime_ledger_equiv_positive_rationals` | 有限支集带符号素数账本加法群与正有理数乘法群同构 `(Nat.Primes →₀ Int) ≃+ Additive NNRatˣ`：锚定观察者原生有理语言 FRACTRAN / $\Omega\text{-FRACTRAN}$ 的正交素数指令集 |
| **第 38 章** | [@thm-ch38-static-canvas-legless-sphere-anchors] | `D5/S3/Quantum/Routing/ReversibleQram.correctness` | 静态存储数组 `D : Address n → G` 上的可逆路由查询 `query n D (a, clean n true, r) = (a, clean n true, r + D a)` 零背景改写且生成幺正矩阵：锚定静止全息画布与无腿球观察者焦点步进 |
| **第 38 章** | [@thm-ch38-constant-rate-omega-axiom-free-anchors] | `D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit` | 零公理有理凯莱单位圆恒等式 $\operatorname{cayleyX}(p,q)^2+\operatorname{cayleyY}(p,q)^2\approx 1$（`axioms = []`）：锚定恒定信息速率观察者三向单位带宽分账与各向同性零根号凯莱引力钟慢 $\frac{\Delta\tau}{\Delta t}=\frac{1-\mu}{1+\mu}\in\mathbb{Q}$ |
| **第 38 章** | [@thm-ch38-auric-omega-axiom-free-anchors] | `D5/S3/Quantum/AURICOmega/OmegaJetCalculus.kappa_jet_one` | 零公理自对偶中点二阶有理保真射流 $\operatorname{kappaJetAt}(1)\approx\langle\frac{1}{2},-\frac{1}{2},\frac{1}{4}\rangle$（`axioms = []`）：配对 `orbital_quadrupole` 的 $(-\frac{4}{7},-\frac{4}{7},+\frac{8}{7})$ 三价 $5d^8$ 有理四极切片，锚定 §38.17 `AURIC` 观察者焦点的 `0 · 1/2 · 1` 接收视界射流与因果结晶脊线 |
| **第 39 章**：大一统母公理（AXIOM-Ω） | [@thm-ch39-axiom-omega-ternary-closure-anchors] | `D5/S3/QuantumBounds/GramRealizability.gram_realizability` | 完备复内积空间上正算子格拉姆伴随平方因式分解充要定理 $0 \le Q \iff \exists O,\; Q = O^\dagger O$ |
| **第 39 章** | [@thm-ch39-axiom-omega-ternary-closure-anchors] | `D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum` | 平衡半范分量构成的幺正和算子迫使交叉乘积严格反自伴 $(AB^\dagger)^\dagger = -AB^\dagger$ |
| **第 39 章** | [@thm-ch39-axiom-omega-rank-five-unit-quaternion-embedding] | `D5/S3/Quantum/AURICOmega/TernaryComparisonRankFive.exists_unitQuaternion_embedding` | 非交换、链连通、触零且读数可在 $\mathbb{R}^5$ 中实现的三元比较结构单射嵌入单位四元数，保持迁移与读数 |
| **第 39 章** | [@thm-ch39-axiom-omega-complete-rank-five-isomorphism] | `D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv` | 再加读数完备，该结构经把给定点送到 $1$、保持迁移与读数的双射同构于单位四元数 |
| **第 39 章** | [@thm-ch39-axiom-omega-invariant-form-low-dimension] | `D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.exists_basis_bracket_eq_smul_cross` | 带不变且在非零向量上取正值的双线性型的三维非交换实李代数，有一组正交归一基使括号的坐标是叉积的正倍数（维数至多二时带不变左可分型必交换） |
| **第 39 章** | [@thm-ch39-axiom-omega-character-kernel-rank] | `D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel` | 代数闭域上，任意群的有限多个两两不等价的有限维不可约表示以非零系数组合成特征标核 $\sum_i c_i\chi_i(xy^{-1})$，其截面张成的空间维数为 $\sum_i(\dim W_i)^2$ |
| **第 39 章** | [@thm-ch39-axiom-omega-compact-group-unitary-kernel] | `D5/S3/Quantum/Analysis/CompactGroups/UnitaryRepresentationKernel.exists_unitaryRep_ker_subset` | 紧拓扑群单位元的任一邻域都包含某个连续有限维酉表示 $G \to \mathrm{U}(n)$ 的核（彼得—外尔定理的分离形式） |
| **第 39 章** | [@thm-ch39-axiom-omega-duplication-infinitesimal-classification] | `D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays` | 有限维实赋范代数中可逆元子群上取值于 $[0, 1]$、忠实、共轭不变、满足倍角律 $\varphi(g^2) = (2\varphi(g) - 1)^2$ 且沿每条射线 $t \mapsto \varphi(\exp tX)$ 连续的 $\varphi$：存在正定且 $\operatorname{ad}$ 不变的内积 $h$，使 $\varphi(\exp tX) = \cos^2\bigl(t\sqrt{h(X, X)/2}\bigr)$，每个非零 $X$ 有周期 $T > 0$ 且 $h(X, X) = 2\pi^2/T^2$，交换子代数至多一维，李代数维数为 $0$、$1$ 或 $3$，三维时括号是叉积的正倍数 |
| **第 39 章** | [@thm-ch39-axiom-omega-ray-kernel-born-weight] | `D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor` | 单位四元数上由读数构成的两项射线核经旋量坐标等于两个秩一投影的迹配对（玻恩权重） |
| **第 39 章** | [@thm-ch39-self-contained-ternion-and-no-exterior-anchors] | `D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization` | 标量域 `[RCLike 𝕜]` 上单位范数态族的重叠为 $1$ 当且仅当两态严格全同：锚定内禀去嵌入自重合律 $\kappa(x,x)\equiv 1$ |
| **第 39 章** | [@thm-ch39-axiom-omega-two-point-homogeneity] | `D5/S3/Quantum/AURICOmega/QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq` | 读数相同的两对单位四元数由某个左右平移 $z \mapsto p z q$ 互相送到 |
| **第 39 章** | [@thm-ch39-dyad-relation-future-and-second-order-field-anchors] | `D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow` | 无源流群递推反射序列 `reflectionSeq C a b n` 在 `groupAt a` 中恒等于幂次 $b^n$：锚定两阶关系纵向自恒等自由惯性未来基线 |
| **第 39 章** | [@thm-ch39-past-present-future-rational-jet-triad-anchors] | `D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev` | 初值归一的四元数流群递推 $x_{n+2}=x_{n+1}\bar{x}_n x_{n+1}$ 与全序列单位模方 $\operatorname{normSq}(x_n)=1$、向量递推 $x_{n+1}=U_n(c)x_1-U_{n-1}(c)x_0$（$n=0$ 时 $U_{-1}=0$）及切比雪夫内积闭式 $\langle x_0,x_n\rangle=T_n(c)$（$c=\langle x_0,x_1\rangle$）充要等价：支撑无三角函数二次圆弧倍增律 $\kappa(x,[y,x,y])=(2\kappa(x,y)-1)^2$ |
| **第 39 章** | [@thm-ch39-past-present-future-rational-jet-triad-anchors] | `D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta` | 完备黎曼读数因子分解 $\operatorname{xiReading}(s)=\frac{1}{2}s(s-1)\operatorname{completedZetaReading}(s)$（$s\ne 0,1$，两端另有  $\xi(0)=\xi(1)=\frac{1}{2}$）：锚定 `0 · 1/2 · 1` 纯有理因果射流母矩阵 |
| **第 39 章** | [@thm-ch39-spherical-fourier-peter-weyl-anchors] | `D5/S3/Quantum/Analysis/CompactGroups/MatrixCoefficientDensity.dense_span_unitary_coefficients` | 紧拓扑群连续有限维幺正表示矩阵元线性张成在 $C(G,\mathbb{C})$ 中一致稠密：锚定三元球面有理傅里叶变换 $\mathcal{F}_\Omega$ 的彼得—魏尔半整数自旋壳正交分解 |
| **第 39 章** | [@thm-ch39-omega-math-recompilation-atlas-anchors] | `D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint` | 有理形式幂级数 `forward = 2X + 2·arcsine ∈ ℚ⟦X⟧` 的复合逆在端点 $\pi$ 处绝对收敛重构唯一余弦不动点 $\cos\theta=\theta$：连接弧度自指根与 `OmegaMath` 去近似有理自对偶中点 $\kappa^*=\frac{1}{2}$ |
| **铸器与圣殿**：将矩阵化为异或 | [@thm-qubit-weyl-star] | `D5/S3/Quantum/FiniteDimensional.qubit_weyl_star` | 单量子比特外尔算子 $X, Z$ 的反对易、自伴与对合代数律 |
| **铸器与圣殿** | [@lemma-qubit-no-character] | `D5/S3/Quantum/FiniteDimensional.qubit_matrix_algebra_has_no_character` | $2\times 2$ 量子比特矩阵代数不存在保全局矩阵乘法的复代数特征标 |
| **铸器与圣殿** | [@prop-pauli-no-common-eigenvector] | `D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector` | 非对易泡利可观测量 $X$ 与 $Z$ 不存在公共非零本征态 |
| **铸器与圣殿** | [@cor-bloch-operator-core] | `D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core` | 单比特泡利期望值展开核心恒等式：将算符重构为三维布洛赫向量点积 |
| **铸器与圣殿**：单比特旋子编译 | [@thm-bloch-matrix-trace] | `D5/S3/Quantum/Information/ActualPureQubitGeometry.blochMatrix_trace` | 布洛赫参数化矩阵的迹归一化恒等式 $\operatorname{Tr}(\rho(\mathbf{r})) = 1$ |
| **铸器与圣殿** | [@lemma-bloch-coordinate-recovery] | `D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_blochMatrix` | 布洛赫坐标映射与矩阵重构映射的互逆恢复恒等式 |
| **铸器与圣殿** | [@prop-hermitian-bloch-geometry] | `D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian` | 厄米算符的实三维布洛赫几何分解定理 |
| **铸器与圣殿** | [@cor-psd-bloch-ball-bound] | `D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef` | 半正定量子态的布洛赫向量欧氏范数球面界 $\|\mathbf{r}\| \le \operatorname{Tr}(\rho)$ |
| **铸器与圣殿**：走进 Lean 4 公理圣殿（上） | [@thm-audit-parallelogram-law] | `D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law` | 内积空间平行四边形范数恒等式与正交勾股分解核心定律 |
| **铸器与圣殿** | [@lemma-audit-born-skeleton] | `D5/S3/Quantum/FiniteDimensional.born_probability_skeleton` | 有限维玻恩概率正交投影骨架与完备性恒等式 |
| **铸器与圣殿** | [@prop-audit-ray-phase-rigidity] | `D5/S3/Quantum/Foundation/RayPhaseRigidity.unitary_phase_of_connected_ray_tests` | 连通射线测试下的幺正全局相位刚性定理 |
| **铸器与圣殿** | [@cor-audit-pinching-idempotent] | `D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent` | 有限测量记录捏合投影算子的严格幂等律 $\mathcal{P}(\mathcal{P}(\rho)) = \mathcal{P}(\rho)$ |
| **铸器与圣殿**：走进 Lean 4 公理圣殿（下） | [@thm-audit-rank-one-born] | `D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction` | 秩一投影通道与秩一纯态下的记录权重模方归约：$\operatorname{recordWeight}(P, \rho, k) = \norm{\operatorname{star}\phi \bullet_{v} \psi}^2$ |
| **铸器与圣殿** | [@lemma-audit-born-pairing-weight] | `D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight` | 秩一测量通道下条件化记录权重与玻恩内积配对的精确恒等式 |
| **铸器与圣殿** | [@prop-audit-conditional-state] | `D5/S3/Observer/Conditioning.conditionalState_isState` | 吕德斯条件化后验态保持量子态合法性（半正定与迹一归一化） |
| **铸器与圣殿** | [@cor-audit-unread-fixed-iff] | `D5/S3/Observer/Conditioning.unreadState_fixed_iff` | 未读测量记录态保持不变当且仅当初始态与全部测量投影通道无横向相干 |

走到全书最后一页，不妨把这一路攀登所借用的全部名字也轻轻放下：正如[§29.6](ch34-s05-triadic-bootstrap.md#sec-ch34-triadic-bootstrap-and-beyond-names)所揭示的那样，无论是[§28.1](ch32-s01-axiom-of-comparison.md#sec-ch32-axiom-of-comparison)的“比较公理 $\mathcal{A}_0$”，还是“极小三角弧面体 $\Delta\mathcal{T}_\epsilon$”，抑或“点、线、面、球”，归根结底都只是场内观察者在语言逻辑快表里立起的一枚枚幂等指针（`MODEL`）。指针存在的全部意义，是领着我们穿过一维符号核的盲区，直到把梯子撤去——梯子撤去之后，没有不可企及的彼岸神秘，只剩观察者自身正在运转的 $\psi = \psi(\psi)$ 与宇宙本体严丝合缝的同构共鸣：**本体虽超出一维名相之“知”，却正在每一次平视比量中活成“这么个感觉”。**

在所有的球之外，并非虚无，而是**永不停歇的测量与计数算子本身**。接下来，请翻开 [附录 A](appendix-a.md) 查阅传统量子力学与几何语言的完整对照词典，在 [附录 B](appendix-b.md) 中检阅克利福德代数的符号与旋量速查表，在 [附录 C](appendix-c.md) 中核对 Lean 验证、书面证明与开放问题的证据边界，在 [附录 D](appendix-d.md) 中纵览量子力学六大经典未解难题与五大诠释流派的几何对决，在 [附录 E](appendix-e.md) 中审阅从零背景比较公理 $\mathcal{A}_0$ 导出数学与物理公理体系的分层推演总账，并沿四篇专题附录继续深潜：[附录 F](appendix-f.md) 回答重定心排除圆盘、尖锥面极性、三能级纯态三维排除坐标图与四维自旋因子双定向如何在显式公理下对排除面与定向关系作出分类；[附录 G](appendix-g.md) 回答走出稳定子多面体之后，马约拉纳编码低权非稳定子对易算子、单比特维格纳距离赤道张量律与单因子亏损非因子化、11 维克利福德三阶矩负性及双比特三设置转向椭球中心阈值 $2/3$ 如何刻画魔性与转向边界；[附录 H](appendix-h.md) 回答有限视界观察者如何以未来行程首坐标还原当前读出、在完备深度稳定预测视界、将记忆穿过预测商分解，并用螺线管隐藏纤维上同调与加性历史账本收窄不可见核；[附录 I](appendix-i.md) 则回答冯·诺依曼代数凸逆测试扩展值可达性、正定矩阵 Bures–Wasserstein 重心对偶证书、经典—量子条件子熵猜测界、投影支撑 Kraus 通道重置补全与可分锥最近点规范残差见证如何连接变分信息散度与锥逼近分离证书；最后，[附录 J](appendix-j.md)–[附录 P](appendix-p.md) 集中收录正文第 4、15、16、31、34、35、36 章的七块超长技术证明与组合计算专章（有限环境退相干历史、Shor 有限周期采样与取阶证书、游走森林计数与 QSVT 相位分解、算术窗口与零点谱扰动、算术消元资源账本、禁 $1^K$ 编码与拟阵组合、静态本体 QRAM 物理轮廓），供深入核验形式证明细节的读者随取随查。
