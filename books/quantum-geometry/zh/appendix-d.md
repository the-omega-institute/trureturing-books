# 附录 D：量子力学六大经典未解问题与五大诠释几何对决

本附录系统汇编了自 1927 年第五届索尔维会议以来横亘在量子力学公理地基上的**六大经典未解难题**，并将哥本哈根诠释、多世界诠释、德布罗意—玻姆导航波、客观坍缩理论（GRW / Penrose）以及量子贝叶斯 / 关系量子力学五大历史流派与本书提出的**正交自指与开放维度几何观**置于同一联合实验舞台上进行逐项对勘。遵循与 [附录 B](appendix-b.md) 一致的形式认识论契约：凡对应 `trureturing@dev` 已冻结定理的有限维代数、拓扑或组合骨架均附有绿色 `LEAN ✓` 标记与可点击的 GID 永久链接（完整索引见第 D.4 节表与 [附录 C](appendix-c.md)）；经典物理学史、不可能性定理与显式代数算例分别标定为 `文献结果`、`手工推导` 或 `NUM`；作者的跨学科几何诠释标定为 `MODEL`；而尚未闭合的物理前沿则诚实标为红色 `OPEN`（[@prob-appendix-d-time-horizon]）。

---

## D.1 导言：为什么百年公理死结总在同一处卡住？ {#sec-appendix-d-overview}

量子力学是人类科学史上实验预测精度最高的物理理论——例如量子电动力学（QED）对电子反常磁矩 $(g - 2)/2$ 的理论计算值与实验室测量值在小数点后第 $12$ 位依然严丝合缝（`文献结果`）。然而，与这近乎神迹的工程与预测精度形成强烈反差的是，物理学家与科学哲学家对“这套数学形式究竟在描述怎样的物理实在”争论了整整一个世纪，至今未能在教科书层面达成共识。

表面上看，测量坍缩、退相干假混合、玻恩平方律与复数起源、贝尔非定域性与相对论同时性、波函数实体与认知之争以及量子引力时间冻结这六道裂痕散落在不同分支；但若沿着 [第 31 章](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)（公平、平方、测不准与时间作为正交维度扩张）、[第 37 章](ch37-dreams-quantum-eraser-and-nonlocal-observer.md#sec-ch37-dream-pre-decoherence-deja-vu) 与 [第 39 章](ch39-observer-is-ontological-universe.md#sec-ch39-pisot-clifford-rauzy) 建立的几何主线回溯，本书给出一条直指病灶的结构性诊断（`MODEL`，原文收录于 [附录 A](appendix-a.md#sec-appendix-a-verbatim-ledger) **A74**）：

> “这六大死结之所以百年未决，根源全在于传统公理体系暗中保留了‘置身事外的外部观察者（第 3 点 C）’与‘固定维度的闭合时空舞台’这两大隐含假设。”

只要暗中保留站在宇宙关系网之外俯瞰全局的**外部第 3 点 $C$**，理论就不得不在“连续幺正演化”与“瞬时绝对坍缩”之间划出一道说不清物理位置的武断切口；只要暗中假定物理演化被永久关在**固定维度的闭合容器**之内，正交余项与未追踪记录分支就只能被误读为神秘的信息毁灭或无法安放的多重平行世界。下面我们逐题拆解每一道百年裂痕的**主流物理困境**与**正交开维几何对勘**，并在每一处严格标明形式化定理与开放物理问题之间的精确边界。

---

## D.2 量子力学六大经典未解难题与正交开维几何对勘 {#sec-appendix-d-six-foundational-puzzles}

### D.2.1 测量问题与“维格纳的朋友”悖论 {#sec-appendix-d-puzzle-1}

::: {.remark #rem-appendix-d-puzzle-1 title="难题一：冯·诺依曼双过程割裂、海森堡切割与维格纳朋友自指悖论（文献结果、Lean 锚点与模型对勘）"}
**文献结果，未在本书形式化（针对量子测量史与扩展维格纳朋友定理；有限维定态、记录捏合幂等与客观公共因子骨架见下引 `LEAN ✓` 链接）。**

1. **主流物理困境（`文献结果`）**：
   - **双过程动力学割裂**：冯·诺依曼在《量子力学的数学基础》（von Neumann 1932）中将演化硬性拆为两套规则——**过程 II** 是在未被观测时严格服从线性薛定谔方程的连续幺正演化 $\rho \mapsto U_t \rho U_t^\dagger$；**过程 I** 则是在“测量发生”瞬间突变为某一本征态的非幺正投影坍缩。
   - **海森堡切割模糊**：测量仪器、光电倍增管乃至实验员大脑本身皆由服从过程 II 的原子构成——究竟聚集多少个原子才触发坍缩？这道游移不定的**海森堡切割（Heisenberg Cut）**从无精确微观定义。
   - **维格纳朋友与嵌套自指张力**：在“维格纳的朋友”思想实验（Wigner 1961）中，密封实验室内的朋友已记录下确定的单次结果，门外的维格纳却将整个实验室连同朋友描述为相干叠加纯态；Frauchiger 与 Renner（2018）进一步证明，在他们显式列出的普适量子演化、跨主体推理相容性与单次确定结果三组假设下，扩展嵌套观测链将导出逻辑矛盾（注：并非所有维格纳朋友场景都等同于 FR 协议，且放弃其中任一前提即可规避矛盾）。
2. **正交开维几何对勘（`LEAN ✓` + `MODEL`）**：
   - **孤立本征定态与局部捏合幂等**：测量悖论源于虚构了置身事外的绝对裁判点 $C$。在无外参考关系几何中，孤立归一化能量本征向量 $Hv = Ev$ 在实时间矩阵指数演化下保持秩一密度矩阵严格定态（[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary)，`LEAN ✓`，见 [第 7 章](ch07-geometric-time-and-speed-limits.md)）；而在选定正交完备记录投影族 $P : \kappa \to M_n(\mathbb{C})$ 后，非选择性未读粗粒化通道满足严格幂等律（[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)，`LEAN ✓`，见 [第 27 章](ch27-reading-frozen-proofs-i.md) 与 [第 33 章](ch33-all-beings-observers-and-mutual-attractors.md)）：

     $$
     U_t = \exp(-itH) \in U(n), \qquad U_t \rho_v U_t^* = \rho_v, \qquad \operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P).
     $$

   - **跨视角客观共识的公共因子判据**：抽象诠释不动点定理证明，不同语境参数可选出不同不动点（[`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)），而任何携带跨语境客观一致性承诺 `ObjectiveInterpretationClaim` 的声明，必然穿过一个对全体语境恒定的公共因子 `commonFactor`（[`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)，`LEAN ✓`，见 [第 33 章](ch33-all-beings-observers-and-mutual-attractors.md) [@thm-ch33-contextual-attractor-and-common-factor]）。
3. **形式化边界声明**：
   上述三条 `LEAN ✓` 定理分别刻画本征态定态、系综非选择性捏合幂等与携带不变性义务的公共因子提取；它们本身**不推导**单次实验为何涌现唯一经典结果，也**不消解** FR 协议在附加单次结果公设下的张力——将“坍缩”重构为内生观察者沿自身基底的相对投影属于本书诠释模型（`MODEL`）。
:::

在实验台的第一张专题卡中，我们可以直接对比密封实验室内部的局部记录捏合与门外维格纳掌握完整联合自由度时的幺正可逆视角：

::: {.viz src="quantum-interpretations-duel" preset="wigner-cut" height="500"}
**预设实验卡一（`wigner-cut`）**：维格纳密封实验室切割边界与内外视角对勘。联合呈现受控记录拷贝电路、维格纳相干逆转所需的联合访问域（仅凭 $SF$ 无法逆转已泄入环境 $E$ 的记录，完整掌握 $SF+E$ 方可幺正逆转）以及未读态幂等捏合通道。
:::

### D.2.2 退相干的“与—或（And-to-Or）”不完备性 {#sec-appendix-d-puzzle-2}

::: {.remark #rem-appendix-d-puzzle-2 title="难题二：环境退相干假混合态与单次结果选择的鸿沟（文献结果、Lean 锚点、手工推导与模型对勘）"}
**文献结果，未在本书形式化（针对环境诱导超选择与单一结果问题；有限维受控记录访问缺陷、丢弃相干质量与纯度勾股分解见下引 `LEAN ✓` 链接）。**

1. **主流物理困境（`文献结果`）**：
   - **环境超选择与非对角衰减**：当代许多物理教材诉诸环境退相干（Zurek 2003）化解测量问题——宏观系统与海量环境自由度纠缠并对环境求偏迹后，局部约化密度矩阵的非对角干涉项迅速趋零，看似退化为经典概率分布。
   - **假混合态与“和 $\to$ 或”鸿沟**：退相干综述早已严正指出（Schlosshauer 2005），偏迹给出的只是**假混合态（Improper Mixture）**——整个“系统 $+$ 仪器 $+$ 环境”联合纯态依然处于全球线性叠加（“既死又活”，*And*）；仅靠薛定谔演化加偏迹，在逻辑上无法推出为何单次实验呈现唯一确定的指针读数（“非死即活”，*Or*）。
2. **正交开维几何对勘（`LEAN ✓` + `手工推导` + `MODEL`）**：
   - **受控记录边缘重合与局部访问缺陷**：对任意对角元相同而非对角相干项不同的两个单比特矩阵 $\rho, \sigma$，受控拷贝幺正算符 `copyUnitary` 生成相异的联合记录态，但追踪环境后给出完全相同的约化态，故不存在单一恢复映射 `recover` 能从局部约化态同时还原两者；然而伴随幺正演化 `star copyUnitary` 在联合空间上精确无损地将两者逆转回初始态（[`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect)，典范记录包装见 [`reduced_irreversibility_is_canonical_record_access_defect`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.reduced_irreversibility_is_canonical_record_access_defect)，`LEAN ✓`，见 [第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md) [@thm-ch38-copied-address-dereference-and-access-defect]）。
   - **相干质量删除与纯度预算**：计算基捏合精确移除希尔伯特—施密特相干质量 $\lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2$（[`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)，`LEAN ✓`），而在显式纯度—范数与投影坐标假设下，纯度超出量正交分解为可见概率偏差平方和加隐藏残差质量 `residualMass`（[`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)，`LEAN ✓`）。
   - **条件预示秩二二分纯度守恒账本**：在实验台模型中（设 $p = \cos^2\theta$，说明性环境重叠律取 $\gamma(N) = \exp(-N/10^4)$，`MODEL`），约化态 $\rho_L$ 的布洛赫范数平方 $r^2$ 与有效二分纠缠度 $\tau_{L:E} := 2(1 - \operatorname{Tr}(\rho_L^2))$ 满足精确两施密特系数恒等式（`手工推导`）：

     $$
     \rho_L(\theta, N) = \begin{pmatrix} p & -c s \gamma(N) \\ -c s \gamma(N) & 1 - p \end{pmatrix}, \qquad r^2 + \tau_{L:E} = \bigl[(2p - 1)^2 + 4p(1 - p)\gamma^2\bigr] + 4p(1 - p)(1 - \gamma^2) = 1.
     $$

3. **形式化边界声明**：
   局部表观不可逆在形式上只是受限观察者未能访问环境记录分支所致的**访问缺陷**（注意：上述 $r^2 + \tau_{L:E} = 1$ 是针对该有效秩二纯二分模型的初等手工推导，并非由 `complementary_context_probability_pythagoras` 直接证出的一般多体混态单配等式）；至于为何第一人称经验只驻留于单根记忆分支（或以伪随机数 $\xi < p$ 抽样模拟单次读数），仍属经验公设或诠释模型（`MODEL`），绝不伪称为偏迹定理的逻辑推论。
:::

以标志角 $\theta = 30^\circ$（$p = 3/4$）为例，当环境完全相干（$\gamma \to 1$）时四元读数 $(r^2, \tau_{L:E}, C, V) = (1, 0, 3/8, \sqrt{3}/2)$，而当环境规模推至 $N = 10^6$（$\gamma \to 0$）时精确过渡为 $(1/4, 3/4, 0, 0)$（`手工推导` / `NUM`）：

::: {.viz src="quantum-interpretations-duel" preset="and-to-or" height="500"}
**预设实验卡二（`and-to-or`）**：环境规模 $N = 10^6$ 下的退相干“与 $\to$ 或”鸿沟。实时对照干涉受抑的约化密度矩阵与单次记录抽样假设，同步显示相干因子 $\gamma(N)$、丢弃相干质量 $C = 2p(1-p)\gamma^2$、干涉条纹可见度 $V = 2\sqrt{p(1-p)}\gamma$ 与纯度守恒账本 $r^2 + \tau_{L:E} = 1$。
:::

### D.2.3 玻恩定则 $|\psi|^2$ 与复希尔伯特空间 $\mathbb{C}$ 的起源 {#sec-appendix-d-puzzle-3}

::: {.remark #rem-appendix-d-puzzle-3 title="难题三：玻恩模平方定则与复数结构的几何起源（文献结果、Lean 锚点、手工推导与模型对勘）"}
**文献结果，未在本书形式化（针对格里森定理、约当—冯·诺依曼逆定理与实量子力学网络实验证伪；平行四边形正定理、秩一模平方、共同相位不变多项式、复结构平方与罗伯逊—薛定谔分解见下引 `LEAN ✓` 链接）。**

1. **主流物理困境（`文献结果`）**：
   - **不等幅叠加与模平方公设之谜**：为何概率偏偏等于复振幅的**二阶模平方** $\lvert\psi\rvert^2$ 而非 $\lvert\psi\rvert$ 或 $\lvert\psi\rvert^4$？在多世界诠释中，若叠加态取不等幅形式（如希尔伯特基夹角 $\theta = 30^\circ$），两分支都在演化中“100% 发生”，仅凭分支计数（$1:1$）无法解释 $3/4$ 与 $1/4$ 的统计权重偏差；格里森定理（Gleason 1957）虽从维数 $d \ge 3$ 闭子空间投影格可加性推出迹规则，却无法直接覆盖单比特 $d = 2$ 面板，且同样预设了内积空间结构（范数还原内积的充要条件来自 Jordan & von Neumann 1935 平行四边形逆定理）。
   - **复数域 $\mathbb{C}$ 的网络实验证伪边界**：为何量子态必须取复数而非纯实数振幅？2021 年 Renou 等人在独立纠缠源与标准局域张量积复合公设下提出三节点纠缠交换量子网络贝尔判据（M.-O. Renou et al., *Nature* **600**, 625–629, 2021），随后由超导与光子实验团队分别完成实验验证（M.-C. Chen et al., *Phys. Rev. Lett.* **128**, 040403, 2022；Z.-D. Li et al., *Phys. Rev. Lett.* **128**, 040402, 2022），证伪了满足该局域复合框架的标准实希尔伯特空间量子理论（注：这并不排除放弃局域张量复合公设的非定域实表示重构）。
2. **正交开维几何对勘（`LEAN ✓` + `MODEL`）**：
   - **平行四边形正定理与秩一模平方约化**：如 [第 31 章](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion) 所示，实内积空间恒满足平行四边形正定理（[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)，`LEAN ✓`），且秩一投影与纯态外积的 `recordWeight` 精确归约为重叠模平方 $\lVert\langle\varphi,\psi\rangle\rVert^2$（[`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction)，`LEAN ✓`）。
   - **共同相位不变多项式的二次厄米锁定**：在有限指标复共轭多项式代数上，消除外部全局相位零点的共同 $U(1)$ 相位不变性当且仅当每个非零单项式全纯与反全纯次数平衡（$p = q$），非常数不变可观测量的最低总次数满足 $\ge 2$，且二阶实值齐次不变可观测量唯一对应厄米二次型 $z^\dagger H z$（[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)，`LEAN ✓`，[@thm-ch31-phase-polynomial-quadratic]）。
   - **反自伴幺正复结构与测不准反弹**：任何兼具反自伴性 $R^{\mathrm{H}} = -R$ 与幺正性 $R R^{\mathrm{H}} = I$ 的有限维矩阵必满足 $R^2 = -I$（[`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)，`LEAN ✓`），而单基平方折叠相位后，对称线性算符 $A, B$ 的方差乘积精确满足四重罗伯逊—薛定谔恒等式（[`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)，`LEAN ✓`）：

     $$
     \lVert x + y\rVert^2 + \lVert x - y\rVert^2 = 2\bigl(\lVert x\rVert^2 + \lVert y\rVert^2\bigr), \qquad R^2 = -I, \qquad \lVert u\rVert^2\lVert v\rVert^2 = C^2 + \lVert K\rVert^2 + G \quad (G \ge 0).
     $$

3. **关键条件概率与无条件边缘区分（`手工推导`）**：
   在实验台联合协议 $\lvert\Psi\rangle = (\lvert u_\theta,0,u_\theta\rangle\lvert e_0\rangle^{\otimes N} + \lvert v_\theta,1,v_\theta\rangle\lvert e_1\rangle^{\otimes N})/\sqrt{2}$ 中，**无条件**追踪其余自由度后，朋友记录与远端 Bob 的单边边缘态始终严格为均匀 $\rho_F = \rho_B = \frac{1}{2}I_2$（**$50\% / 50\%$**）；唯有显式**条件化于 Bob 测得 $Z = +1$（即 $B = 0$，先验发生率 $1/2$）的预示子系综**时，在 $\theta = 30^\circ$ 标志位下方精确呈现 **$75\% / 25\%$** 的条件玻恩权重：

   $$
   \lvert\Psi_+\rangle = \cos\theta\,\lvert u_\theta, 0\rangle\lvert e_0\rangle^{\otimes N} - \sin\theta\,\lvert v_\theta, 1\rangle\lvert e_1\rangle^{\otimes N}, \qquad p\big|_{\theta = 30^\circ} = \cos^2 30^\circ = \frac{3}{4}, \quad 1 - p\big|_{\theta = 30^\circ} = \sin^2 30^\circ = \frac{1}{4}.
   $$
:::

任何滑块或诠释切换都绝不能在无经典通信下把无条件 EPR 边缘变成 $75\% / 25\%$；下方实验卡将两种分布与相位敏感读出并排呈现：

::: {.viz src="quantum-interpretations-duel" preset="born-unequal" height="500"}
**预设实验卡三（`born-unequal`）**：$\theta = 30^\circ$ 标志位下的不等幅玻恩平方律与相位盲区。并排对比预示条件下的 $75\% / 25\%$ 权重与无条件 $50\% / 50\%$ 边缘，同步演示对角读出的相对相位盲区与横向泡利 $X$ 相敏读出。
:::

### D.2.4 贝尔非定域性（$2\sqrt{2} > 2$）与相对论因果律的张力 {#sec-appendix-d-puzzle-4}

::: {.remark #rem-appendix-d-puzzle-4 title="难题四：贝尔不等式破缺、齐雷尔森极值与狭义相对论同时性的冲突（文献结果、Lean 锚点、手工推导与开放前沿）"}
**文献结果，未在本书形式化（针对贝尔定理、Eberhard 无信令定理与无漏洞贝尔实验；CHSH 紧极值、零光锥刚性与局域边缘关联盲区见下引 `LEAN ✓` 链接）。**

1. **主流物理困境（`文献结果` + `手工推导`）**：
   - **局域隐变量证伪**：爱因斯坦—波多尔斯基—罗森（EPR 1935）质疑量子力学完备性，贝尔（Bell 1964）将其转化为可检验不等式 $\lvert S\rvert \le 2$（有限确定性局域纤维模型形式化见 [第 13 章](ch13-entanglement-and-chsh.md) [@thm-classical-chsh-bound-exact]，[`classical_chsh_abs_le_two`](lean:D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_abs_le_two)），而量子纠缠态达到齐雷尔森界 $2\sqrt{2} \approx 2.8284$（Tsirelson 1980），并已由 2015 年起一系列无漏洞贝尔实验确证（Hensen et al. 2015；Giustina et al. 2015；Shalm et al. 2015）。
   - **同时性相对性与先后次序翻转**：若将贝尔关联解释为“一侧测量瞬时把远方物理波函数坍缩”，便正面撞上狭义相对论的同时性相对性——设类空分离的两次测量在实验室系位于 $A = (0, -1)$ 与 $B = (0, +1)$（单位 $c = 1, L = 1$），在沿连线速度为 $\beta \in [-0.8, 0.8]$ 的洛伦兹助推系中（如 $\beta = \pm 0.8$ 时 $\Delta t' = \mp 8/3,\; \Delta x' = 10/3$，`手工推导`），左行与右行观察者看到完全相反的时间先后次序：

     $$
     \Delta t' = -2\Gamma_\beta\beta, \qquad \Delta x' = 2\Gamma_\beta, \qquad (\Delta t')^2 - (\Delta x')^2 = -4 < 0 \qquad \bigl(\Gamma_\beta = (1 - \beta^2)^{-1/2}\bigr).
     $$

2. **正交开维几何对勘（`LEAN ✓` + `文献结果` + `OPEN`）**：
   - **齐雷尔森紧上界与零光锥度规刚性**：在全体半正定迹一双比特态上，固定 `CHSHWitness.chshOperator` 实期望值严格以 $2\sqrt{2}$ 为最大元 `IsGreatest`（[`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest)，`LEAN ✓`，[@cor-fixed-chsh-tsirelson]；实验台采用独立预记录纠缠轮 $a_0=0, a_1=\pi/2, b_0=\pi/4, b_1=-\pi/4$，绝不将不可逆退相干后的残余 $S$–$B$ 态混充为最大违背态）；同时，任何在零光锥 $t^2 = \lVert x\rVert^2$ 上恒为零的实二次型必成比例于闵可夫斯基度规 $S = S(1,0)\cdot\operatorname{minkowski}_d$（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)，`LEAN ✓`，[第 17 章](ch17-lorentz-geometry.md) [@prop-null-cone-rigidity]；空间各向同性锁见 [`null_cone_spatial_rigidity`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.null_cone_spatial_rigidity)，[@lemma-null-cone-spatial]）。
   - **局域边缘盲区与无信令保护**：无迹二分厄米空间（$m,n \ge 1,\; mn > 1$）正交直和分解为局域扇区与纯关联扇区（[`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)，`LEAN ✓`，[@thm-local-correlation-sectors]）：

     $$
     \dim_{\mathbb{R}}\mathcal{L}_{AB} = (m^2 - 1) + (n^2 - 1), \qquad \dim_{\mathbb{R}}\mathcal{C}_{AB} = (m^2 - 1)(n^2 - 1), \qquad \mathcal{L}_{AB} \perp_{\mathrm{HS}} \mathcal{C}_{AB},
     $$

     只要两侧子系统均非平凡（$m \ge 2$ 且 $n \ge 2$），就有 $\dim_{\mathbb{R}}\mathcal{C}_{AB} = (m^2 - 1)(n^2 - 1) \ge 9 > 0$（而当 $m = 1$ 或 $n = 1$ 时关联维数为 $0$）；且双比特 `bellDensity` 与经典关联态 `classicalCorrelatedDensity` 共享完全相同的最大化混合边缘 $I_2/2$（亦见 [`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)，[@lemma-bell-mixed-marginal]）却彼此相异。配合 Eberhard（1978）无信令保迹偏迹定理与 CKW 纠缠单配性（[@rem-ch31-ckw-monogamy-literature]），洛伦兹助推 $\beta$ 仅变换事件坐标而不改变任何玻恩权重、$\gamma$ 或单边边缘；完整的相对论量子场论协变态约化动力学则诚实保留为开放前沿（`OPEN`）。
:::

下方第四张实验卡默认取 $\beta = +0.6$，直观呈现类空同时面翻转与恒定无信令边缘的共存：

::: {.viz src="quantum-interpretations-duel" preset="bell-epr" height="500"}
**预设实验卡四（`bell-epr`）**：助推速度 $\beta = +0.6$ 下的类空 EPR–Bell 实验。同屏展示独立轮四组 CHSH 角度违背值 $2\sqrt{2} \approx 2.8284 > 2$、恒定均匀的 $50\% / 50\%$ 无信令单边边缘，以及洛伦兹倾斜同时面下类空事件先后次序的可逆翻转。
:::

### D.2.5 波函数的本体地位之争：$\psi$-实体 vs. $\psi$-认知与 PBR 定理 {#sec-appendix-d-puzzle-5}

::: {.remark #rem-appendix-d-puzzle-5 title="难题五：波函数实体论与认知论二分法及 PBR 定理边界（文献结果、Lean 锚点与模型对勘）"}
**文献结果，未在本书形式化（针对 Harrigan–Spekkens 本体模型分类与 PBR 定理；对角自指落点不动点、概念纤维分解与对角相位盲区见下引 `LEAN ✓` 链接）。**

1. **主流物理困境（`文献结果`）**：
   - **高维配置空间实体波之困**：在 Harrigan 与 Spekkens（2010）的本体模型分类中，**$\psi$-ontic** 指不同纯量子态对应的本体概率分布具有互不重叠的支持。若进一步采信波函数是客观物理场，则三维空间中 $N_{\mathrm{p}}$ 个粒子的位置波函数依赖 $3N_{\mathrm{p}}$ 个配置坐标，而非仅依赖三维位置（$2^{N_{\mathrm{p}}}$ 则是 $N_{\mathrm{p}}$ 个两能级子系统，即量子比特的张量积希尔伯特空间维数，与配置坐标数不同），测量瞬间高维波场如何坍缩令人生疑。
   - **PBR 不可能性定理的假设边界**：若采信波函数仅代表观察者对底层隐状态不完全了解的贝叶斯信念度（**$\psi$-epistemic**），2012 年 Pusey、Barrett 与 Rudolph 提出的 **PBR 定理**（*Nature Physics* 2012）证明：在假定存在客观底层实体态 $\lambda$ 且独立制备系统满足笛卡尔乘积**制备独立性公设（Preparation Independence Postulate）**的前提下，不同纯量子态对应的底层概率分布不能重叠——从而排除了固定底层实体态上的朴素统计无知模型（注：放弃固定底层 $\lambda$ 本体框架或制备独立性公设的关系方案不在 PBR 直接排除之列）。
2. **正交开维几何对勘（`LEAN ✓` + `MODEL`）**：
   - **对角自指落点与概念纤维等价**：“实体波 vs. 主观无知”预设了先有独立于测量关系的绝对底层颗粒 $\lambda$。在 [第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md) 与 [第 39 章](ch39-observer-is-ontological-universe.md) 的内生自指框架中，一旦表 $g : A \to A \to Y$ 在某行 $a_0$ 捕获关于 $f$ 的对角函数，其自应用格点必然成为不动点（[`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)，`LEAN ✓`，[@thm-ch38-self-mapped-diagonal-fixed-point]；二元分式自应用四重命运见 [`self_application_four_fates`](lean:D5/S0/Diagonal/SelfApplicationFates.self_application_four_fates)，[@thm-ch39-self-application-four-fates-and-diagonal-identity]），且任何读出映射 $q_C : X \to B$ 都将源空间等价分解为其观测纤维的依值直和（[`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)，`LEAN ✓`，[@thm-ch39-fiber-reconstruction-and-zeckendorf-thread]）：

     $$
     g(a_0) = \operatorname{diagonal}(f, g) \implies f\bigl(g(a_0, a_0)\bigr) = g(a_0, a_0), \qquad X \simeq \sum_{b : B} \operatorname{ConceptFiber}(q_C, b).
     $$

   - **对角可观测量相对相位盲区与横向解盲**：固定相等叠加态 $\rho_+ = \lvert +\rangle\langle +\rvert$ 与其 $Z$ 共轭态 $Z\rho_+ Z = \lvert -\rangle\langle -\rvert$ 在**一切**对角可观测量族下给出完全相同的联合迹配对读出，任何区分两者的接口必为非对角矩阵，而泡利 $X$ 给出显式分离见证（[`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase)，`LEAN ✓`，[第 31 章](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion) [@thm-ch31-diagonal-phase-blindness]）。
3. **形式化边界声明**：
   上述三条 `LEAN ✓` 定理刻画抽象自指落点、读出纤维等价与单基相对相位盲区，并非关于 PBR 隐变量测度的物理定理；在其上将量子态诠释为“内生子系统之间的客观正交关系振幅”（参见 [@rem-ch39-kant-yoneda-lemma-literature] 米田关系视角）属于本书的哲学—几何综合（`MODEL`）。
:::

由此可见，单组对角读出纤维上的不可分辨性并非关于预设隐颗粒的主观无知，而是正交投影遮蔽横向相位自由度的必然结果；这自然把我们引向第六道、也是最深邃的一道裂痕——时间与视界。

### D.2.6 时间问题、引力冻结方程与黑洞信息悖论 / AMPS 火墙 {#sec-appendix-d-puzzle-6}

::: {.remark #rem-appendix-d-puzzle-6 title="难题六：泡利时间算符阻断、惠勒—德维特冻结方程与黑洞视界信息悖论（文献结果、Lean 锚点与开放前沿）"}
**文献结果，未在本书形式化（针对泡利引理、惠勒—德维特方程与霍金—佩奇—AMPS 黑洞悖论；逐拍相对熵产恒等式、闭子空间正交余项逃逸与有限竞技场逃逸缩减判据见下引 `LEAN ✓` 链接）。**

1. **主流物理困境（`文献结果`）**：
   - **泡利自伴时间算符阻断**：在能量谱有下界的希尔伯特空间中，不存在满足强外尔正则共轭关系且具备公共不变定义域的自伴时间算符（Pauli 1933；注：这并不禁止广义 POVM 时钟观测量或条件关系时钟），使外生参数时间 $t$ 与空间算符 $\hat{x}$ 地位失衡。
   - **惠勒—德维特无时间冻结方程**：正则量子引力对微分同胚约束量子化后给出 $\hat{H}\lvert\Psi\rangle = 0$（DeWitt 1967），宇宙全局波泛函不含外生时间导数 $\partial_t$，如何从中涌现局域演化与热力学时间箭头遂成难题。
   - **黑洞蒸发信息悖论与 AMPS 火墙危机**：半经典霍金辐射看似将纯态蒸发为热混态而威胁幺正性（Hawking 1975）；若按佩奇曲线（Page 1993）要求晚期辐射与早期辐射深度纠缠以恢复全局纯度，又与光滑视界两侧的近视界真空纠缠发生尖锐的纠缠单配性冲突（Almheiri, Marolf, Polchinski & Sully 2013）。
2. **正交开维几何对勘（`LEAN ✓` + `NUM` + `MODEL`）**：
   - **逐拍相干删除相对熵产与正交余项逃逸**：沿“幺正共轭接计算基捏合”轨迹 $\rho(k+1) = \operatorname{basisPinchingState}(U\rho(k)U^\dagger)$（记 $\widetilde{\rho}_k = U\rho(k)U^\dagger$，采用自然对数冯·诺依曼熵；与实验台比特制二元熵 $h_2(x)$ 比对时乘以 $\ln 2$，如 $\theta = 30^\circ$ 处 $h_2(3/4) \approx 0.8113\,\text{bits}$），单拍熵增精确等于非负量子相对熵且有限步严格裂项累加（[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)，`LEAN ✓`）；同时，完备内积空间中任何正交补非零（$S^\perp \neq \perp$）的闭子空间 $S$ 必存在距 $S$ 距离为 $1$ 的单位正交逃逸向量 $e \in S^\perp$（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)，`LEAN ✓`，配合 [第 31 章](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion) 有限维可观测克雷洛夫链严格增长步数上界 [`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound) [@thm-ch31-krylov-growth-stability]——如 $V = \mathbb{R}^4$ 移位时钟恰经 $3$ 步严格增长后饱和——与素数新轴算术类比 [`prime_axis_escape`](lean:D5/S3/Axis/PrimeAxisEscape.prime_axis_escape) [@thm-ch31-prime-axis-escape]）：

     $$
     S_{\mathrm{vN}}\bigl(\rho(k + 1)\bigr) - S_{\mathrm{vN}}\bigl(\rho(k)\bigr) = D\bigl(\widetilde{\rho}_k \mathrel{\Vert} \operatorname{basisPinchingState}(\widetilde{\rho}_k)\bigr) \ge 0, \qquad \lVert\operatorname{id} - P_S\rVert = 1 \quad (S^\perp \neq \perp).
     $$

   - **有限竞技场观测视界与 `EscapePairs` 捕获判据**：在非退化有限竞技场上，并入新观测接口严格降低逃逸率当且仅当其有序唯一捕获对计数严格为正（[`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)，`LEAN ✓`）。在十六态竞技场 $\{0, 1\}^4$ 算例（`NUM`）中，仅读前三比特 $b_0, b_1, b_2$ 会留下 $8$ 条二元简并纤维（$16$ 个有序 `EscapePairs`，模型逃逸熵 $H_2^{\mathrm{escape}} = 1\,\text{bit}$）；并入冗余读出 $b_0 \oplus b_1$ 捕获数为 $0$，而并入全局奇偶新轴 $b_0 \oplus b_1 \oplus b_2 \oplus b_3$ 则唯一捕获全部 $16$ 对（注：该有限组合算例绝不等同于贝肯斯坦—霍金黑洞熵推导）：

     $$
     \operatorname{EscapeRate}(b_0, b_1, b_2) = \frac{16}{16 \times 15} = \frac{1}{15}, \qquad \operatorname{EscapeRate}(b_0, b_1, b_2, b_0 \oplus b_1 \oplus b_2 \oplus b_3) = 0.
     $$
:::

为了杜绝以有限维玩具模型冒充量子引力终极解答，我们将相对论协变态约化与蒸发黑洞视界幺正性正式立为开放问题：

::: {.problem #prob-appendix-d-time-horizon title="相对论协变态约化、无时间量子引力涌现时钟与蒸发黑洞视界幺正性的统一动力学"}
如何在不引入特权洛伦兹同时面或外生背景参数时钟的前提下，建立严格兼容狭义与广义相对论因果结构的测量动力学，从惠勒—德维特约束 $\hat{H}\lvert\Psi\rangle = 0$ 中严格推导出宏观热力学时间箭头，并在完整量子引力理论中无矛盾地消解晚期霍金辐射佩奇纯化与光滑视界近视界真空纠缠之间的单配性火墙张力（AMPS 悖论）？上述有限维矩阵熵产与有限竞技场逃逸定理仅提供局部代数类比骨架，真正的量子引力视界与协变坍缩理论仍属尚未解决的重大开放问题（`OPEN`）。
:::

下方第五张实验卡将粗粒化相对熵产阶梯、全局定态对比与十六态 $\{0, 1\}^4$ 观测视界集于一屏：

::: {.viz src="quantum-interpretations-duel" preset="time-horizon" height="500"}
**预设实验卡五（`time-horizon`）**：环境规模 $N = 10^4$ 下的粗粒化相对熵产账本、全局定态对比与十六态竞技场 $\{0, 1\}^4$ 观测视界（切换冗余接口 $b_0 \oplus b_1$ 与全局奇偶新轴 $b_0 \oplus b_1 \oplus b_2 \oplus b_3$ 检验 `EscapePairs` 捕获判据）。
:::

---

## D.3 主流诠释流派与正交自指开维观六方对比总表 {#sec-appendix-d-interpretations-table}

为了看清百年诠释之争为何围绕同一组公理张力反复拉锯，下表将物理学界五大主流诠释流派与本书提出的**正交自指与开放维度几何观**并列对勘，展示各自如何处置测量坍缩、波函数本体与非定域性，并诚实列出包含本书模型在内的每一套方案所付出的理论代价：

::: {.remark #rem-appendix-d-interpretations-ledger title="五大主流诠释流派与正交自指开放维度几何观六方权衡总表及数值协议（文献结果 + NUM + MODEL）"}
**文献结果，未在本书形式化（配 `ORTHO//DUEL` 统一数值协议与十六篇奠基文献边界说明）。**

| 诠释流派与代表人物 | 对“测量坍缩”的解释 | 波函数本体地位与时空定域观 | 核心理论代价 / 未解硬伤 |
| :--- | :--- | :--- | :--- |
| **哥本哈根诠释** *(Bohr, Heisenberg)* | 宏观经典仪器介入时发生瞬时非幺正投影（过程 I），直接规定单次结果按玻恩权重随机涌现 | 实用主义 / 操作主义预测工具；放弃测量前的微观客观轨道图像 | **海森堡切割模糊**与维格纳朋友自指张力；过程 I 与过程 II 双重动力学在微观层面缺乏精确物理分界 |
| **多世界诠释（MWI）** *(Everett, Deutsch, Wallace)* | **无物理坍缩**；宇宙全局永远严格遵循线性薛定谔方程，退相干使平行记录分支互不干涉地并存 | **强 $\psi$-实体论**；高维希尔伯特空间态矢量即全部物理实在，局域幺正耦合下无超距坍缩 | **本体论无限分支膨胀**；在不等幅叠加（如 $\theta = 30^\circ$ 预示条件下的 $75\% / 25\%$）中推导主观玻恩概率仍需额外决策论或自定位假设 |
| **德布罗意—玻姆导航波** *(de Broglie, Bohm, Bell)* | **无物理坍缩**；粒子始终拥有确定位置构型，测量只是粒子顺从导航场滑入某支不重叠波包通道 | **双重实在**（真实导航波 $+$ 确定粒子轨道），属于显式**非定域隐变量理论**且需假定量子平衡分布 $\lvert\psi\rvert^2$ | **洛伦兹协变性棘手**；多粒子引导方程依赖特权同时面叶状剖分，推广至相对论手性费米子量子场论面临严峻困难 |
| **客观坍缩理论（GRW / Penrose）** *(Ghirardi, Rimini, Weber; Penrose)* | **真实随机非线性坍缩**；修改薛定谔方程，引入自发定域化速率 $\lambda$ 或引力自能阈值触发物理坍缩 | **物理场实体论**；微观单粒子极难坍缩而宏观刚体因自由度数目放大迅速定域化 | **引入唯象新常数且实验尚未证实**；在典型参数 $\lambda = 10^{-16}\,\mathrm{s}^{-1}, t = 1\,\mathrm{s}$ 下，$N = 10^6$ 时触发率仅 $q \approx 10^{-10}$（需近阿伏伽德罗尺度 $N \sim 10^{23}$ 方瞬时坍缩），且有微小能量不守恒与相对论协变难题 |
| **量子贝叶斯 / 关系量子力学** *(Fuchs, Caves, Schack; Rovelli)* | **无客观全局坍缩**；状态更新只是特定主体（Agent）或物理子系统在交互后对关联记录的条件贝叶斯修正 | **极端 $\psi$-认知论或纯关系态**；不存在脱离特定观察者或交互子系统的绝对宇宙状态 | **客观共识机制受质疑**；若一切状态皆相对特定主体，需额外交互相容公设解释为何不同宏观观察者总能核对出同一份实验室记录 |
| **正交自指与开放维度几何观** *(本书模型 MODEL + 局部 LEAN ✓ 锚点)* | **内生正交投影与未追踪分支访问缺陷**；撤除外部第 3 点 $C$，以有限记录幂等捏合与公共因子刻画局部读出，单次抽样显式标为经验公设 | **内生自指关系振幅**；纠缠驻留于正交关联扇区而单边边缘恒保持 $I_2/2$ 无信令，时间被诠释为突破有限克雷洛夫饱和的正交维度扩张 | **形式锚点与物理动力学严格分界**：`LEAN ✓` 仅锁定有限维代数、多项式与组合逃逸骨架；单次结果涌现机制、相对论坍缩协变、开放维度物理动力学与黑洞蒸发仍属 `MODEL` 或 `OPEN`（[@prob-appendix-d-time-horizon]） |

在统一交互协议 `ORTHO//DUEL` 中，五种透镜（`copenhagen`、`many-worlds`、`pilot-wave`、`grw-collapse`、`ortho-open-dim`）共享同一套受控数值账本，切换透镜绝不篡改 $\theta, N, \beta$ 的客观算术读数；其中客观坍缩累积触发率 $q(N)$ 与局部捏合比特熵增 $\Delta S_{\mathrm{pinch}}$ 精确定义为（`NUM` / `手工推导`）：

$$
q(N) = 1 - \exp(-N\lambda t) = -\operatorname{expm1}(-N\lambda t), \qquad \Delta S_{\mathrm{pinch}} = h_2(p) - h_2\!\left(\frac{1 + \sqrt{r^2}}{2}\right) \ge 0.
$$

支撑上述六题与六行对照的核心奠基文献按议题归纳如下：

- **测量链与自指观察者**：von Neumann（1932）《量子力学的数学基础》过程 I/II 区分；Wigner（1961）密封实验室朋友悖论；Frauchiger & Renner（*Nat. Commun.* 9, 3711, 2018）扩展主体推理相容性不可能性定理。
- **环境诱导退相干与单一结果边界**：Zurek（*Rev. Mod. Phys.* 75, 715, 2003）环境超选择与指针基；Schlosshauer（*Rev. Mod. Phys.* 76, 1267, 2005）关于退相干本身不导出单一结果的系统评述。
- **玻恩迹规则与复希尔伯特空间实验检验**：Jordan & von Neumann（*Ann. Math.* 36, 719, 1935）平行四边形逆定理；Gleason（*J. Math. Mech.* 6, 885, 1957）$d \ge 3$ 投影测度定理；Renou et al.（*Nature* 600, 625–629, 2021）独立局域张量源三节点网络判据与 Chen et al.（*Phys. Rev. Lett.* 128, 040403, 2022）、Li et al.（*Phys. Rev. Lett.* 128, 040402, 2022）的实验检验。
- **贝尔非定域性与相对论无信令**：Einstein–Podolsky–Rosen（1935）；Bell（*Physics* 1, 195, 1964）；Tsirelson（*Lett. Math. Phys.* 4, 93, 1980）量子上界 $2\sqrt{2}$；Eberhard（*Nuovo Cimento B* 46, 392, 1978）保迹局域操作无信令定理；Hensen et al.、Giustina et al.、Shalm et al.（2015）无漏洞贝尔实验。
- **波函数本体模型与五大流派原始文献**：Harrigan & Spekkens（*Found. Phys.* 40, 125, 2010）$\psi$-ontic / $\psi$-epistemic 严格定义；Pusey–Barrett–Rudolph（*Nat. Phys.* 8, 475, 2012）制备独立性下非重叠定理；Everett（1957）、Bohm（1952）、Ghirardi–Rimini–Weber（1986）、Penrose（1996）、Rovelli（1996）与 Fuchs–Mermin–Schack（2014）。
- **时间算符、量子引力冻结与黑洞视界**：Pauli（1933）半有界谱时间算符注记；DeWitt（*Phys. Rev.* 160, 1113, 1967）$\hat{H}\lvert\Psi\rangle = 0$ 约束；Hawking（1975）、Page（*Phys. Rev. Lett.* 71, 1291 & 3743, 1993）与 Almheiri–Marolf–Polchinski–Sully（*JHEP* 2013(2), 062）火墙单配性危机。
:::

::: {.viz src="quantum-interpretations-duel" preset="five-way-duel" height="520"}
**预设实验卡六（`five-way-duel`）**：五大诠释透镜同台对决面板。固定同一联合实验协议与控制参数，并排展示共同实验预测值、各流派额外本体承诺及形式证据边界。
:::

当读者在下方的全景交互实验室中亲手拨动三枚核心滑块——将测量基角推至标志位 $\theta = 30^\circ$ 审视预示条件权重 $75\% / 25\%$ 与无条件 $50\% / 50\%$ 边缘的铁律分野，将环境耦合规模从 $N = 1$ 拉升至 $N = 10^6$ 观察布洛赫矢量收缩而全局二分纯度纹丝不动（同时对照标准 GRW 在 $N = 10^6$ 处仅 $q \approx 10^{-10}$ 的极微小自发坍缩率），再左右拉动洛伦兹速度 $\beta \in [-0.8, 0.8]$ 见证类空贝尔事件先后次序翻转而局部无信令边缘恒定如初——百年公理争论的“按下葫芦浮起瓢”结构便一目了然：传统方案之所以顾此失彼，正是因为它们试图在保留外部裁判 $C$ 或封闭固定维容器的前提下强行弥合投影裂痕。一旦认清两两公平比量如何内生出二次平方与复旋转结构、局部退相干如何源于未追踪记录的访问边界、正交逃逸余项又如何指向有限观测视界之外的新轴，已由 Lean 4 内核锁定的二十座几何基石（`LEAN ✓`）与留待未来物理学攻克的开放高峰（`OPEN`）便在同一幅清明理性的地图上各归其位。

::: {.viz src="quantum-interpretations-duel" height="660"}
**全景交互实验室（`ORTHO//DUEL`）**：量子力学六大未解难题与五大诠释流派联合实验台。集成维格纳密封实验室（量子比特 $S$、朋友记录 $F$、$N$ 模环境 $E$）与远端 Bob 的 EPR 伴侣比特 $B$，支持六张预设实验卡与五种诠释透镜无损切换，所有读数严格区分 `.lean`、`.lean.argued`、`.lean.num`、`.lean.model` 与 `.lean.open` 五级证据徽章。
:::

---

## D.4 二十条形式化几何锚点与文献边界速查表 {#sec-appendix-d-formal-anchors}

::: {.remark #rem-appendix-d-epistemic-boundary title="附录 D 二十条形式化几何锚点与认识论边界声明"}
文献结果，未在本书形式化：本附录中凡标注 `LEAN ✓` 并附有具体 GID 链接的二十条核心代数、拓扑与组合骨架（下表 D.1–D.20），均直接对应 `trureturing@dev` 提交 [{commit}](trureturing:) 下经由 Lean 4 内核验证并冻结的定理（各定理的正式环境声明分布于正文第 1–39 章，完整跨章索引见 [附录 C](appendix-c.md)）。而量子力学奠基文献中的不可能性定理与实验结果、实验台显式手算公式（下表 D.21，`文献结果` / `手工推导` / `NUM`），作者的正交自指与开放维度诠释综合（下表 D.22，`MODEL`），以及相对论协变态约化与量子引力黑洞视界幺正性问题（[@prob-appendix-d-time-horizon]，`OPEN`），均严格按各自认识论层级呈现，绝不越界混同：

| 序号 | 对应难题 | 定理 / 骨架名称 | 核心形式化结论摘要 | 认识论标签、锁定 GID 与正文锚点 |
| :---: | :---: | :--- | :--- | :--- |
| D.1 | 难题一 | 能量本征态实时间幺正定态 | $H = H^\dagger,\; Hv = Ev,\; \lVert v\rVert = 1 \implies U_t \in U(n) \land U_t \rho_v U_t^* = \rho_v$ | `LEAN ✓` ([`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary)；[第 7 章](ch07-geometric-time-and-speed-limits.md)) |
| D.2 | 难题一 | 有限记录非选择性捏合幂等律 | $\operatorname{IsRecordMeasurement}(P) \implies \operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) = \operatorname{unreadState}(P)$ | `LEAN ✓` ([`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)；[第 27 章](ch27-reading-frozen-proofs-i.md)、[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md)) |
| D.3 | 难题一 | 跨语境客观声明的不变公共因子 | `ObjectiveInterpretationClaim` 必存在跨全体语境共享的 `commonFactor` | `LEAN ✓` ([`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)；[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md)) |
| D.4 | 难题二 | 受控记录边缘重合与局部访问缺陷 | 同对角异相干态经 `copyUnitary` 偏迹重合、无单一局部恢复映射，而伴随幺正精确可逆 | `LEAN ✓` ([`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect)；[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)) |
| D.5 | 难题二 | 单比特计算基捏合丢弃相干质量 | $\langle\rho - \mathcal{P}(\rho), \rho - \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = \lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2$ | `LEAN ✓` ([`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)；[第 4 章](ch04-decoherence.md)) |
| D.6 | 难题二 | 互补语境纯度勾股与正交残差质量 | 显式纯度与可见投影坐标假设下 $\operatorname{Tr}(\rho^2) - d^{-1} = \sum_{l,j}(p_{l,j}-d^{-1})^2 + \operatorname{residualMass}$ | `LEAN ✓` ([`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)；[第 9 章](ch09-axes-and-state-addressing.md)、[第 39 章](ch39-observer-is-ontological-universe.md)) |
| D.7 | 难题三 | 实内积空间平行四边形正定理 | $\lVert x + y\rVert^2 + \lVert x - y\rVert^2 = 2(\lVert x\rVert^2 + \lVert y\rVert^2)$ | `LEAN ✓` ([`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)；[第 1 章](ch01-measurement.md)、[第 27 章](ch27-reading-frozen-proofs-i.md)) |
| D.8 | 难题三 | 秩一纯态与投影配对模平方约化 | $\operatorname{recordWeight}(P, \rho, k) = \lVert\langle\varphi, \psi\rangle\rVert^2$（秩一外积态与投影） | `LEAN ✓` ([`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction)；[第 2 章](ch02-born-rule.md)、[第 28 章](ch28-reading-frozen-proofs-ii.md)) |
| D.9 | 难题三 | 共同相位不变多项式完全定理 | 相位不变 $\iff$ 电荷平衡；非常数次数 $\ge 2$；二阶实齐次可观测量唯一表为 $z^\dagger H z$ | `LEAN ✓` ([`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)；[第 31 章](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)) |
| D.10 | 难题三 | 反自伴幺正矩阵平方反号复结构 | $R^{\mathrm{H}} = -R \land R R^{\mathrm{H}} = I \implies R^2 = -I$ | `LEAN ✓` ([`square_eq_neg_one_of_skewAdjoint_unitary`](lean:D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary)；[第 5 章](ch05-complex-phase-and-rotors.md)、[附录 B](appendix-b.md)) |
| D.11 | 难题三 | 罗伯逊—薛定谔四重方差分解恒等式 | 对称算符方差积 $\lVert u\rVert^2\lVert v\rVert^2 = C^2 + \lVert K\rVert^2 + G$，且 $G \ge 0$ | `LEAN ✓` ([`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)；[第 6 章](ch06-geometric-product.md)、[第 31 章](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)) |
| D.12 | 难题四 | 双比特固定 CHSH 算符齐雷尔森紧上界 | 半正定迹一双比特态上 $\operatorname{Re}\operatorname{Tr}(\rho \cdot \mathrm{chshOperator})$ 的最大元 `IsGreatest` 为 $2\sqrt{2}$ | `LEAN ✓` ([`bell_chsh_state_expectation_is_greatest`](lean:D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest)；[第 13 章](ch13-entanglement-and-chsh.md)) |
| D.13 | 难题四 | 闵可夫斯基零光锥实二次型刚性 | $(\forall v,\; \operatorname{minkowski}_d(v) = 0 \implies S(v) = 0) \implies S = S(1,0)\cdot\operatorname{minkowski}_d$ | `LEAN ✓` ([`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)；[第 17 章](ch17-lorentz-geometry.md)、[附录 B](appendix-b.md)) |
| D.14 | 难题四 | 二分局域边缘盲区与同边缘分离定理 | 局域扇区 $(m^2-1)+(n^2-1)$ 正交于关联扇区 $(m^2-1)(n^2-1)$；贝尔态与经典关联态同边缘而相异 | `LEAN ✓` ([`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)；[第 13 章](ch13-entanglement-and-chsh.md)) |
| D.15 | 难题五 | 对角线自指行捕获落点不动点 | $g(a_0) = \operatorname{diagonal}(f, g) \implies f(g(a_0, a_0)) = g(a_0, a_0)$ | `LEAN ✓` ([`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)；[第 21 章](ch21-diagonalization-and-escape.md)、[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)) |
| D.16 | 难题五 | 概念读出依值纤维等价分解 | $\operatorname{Nonempty}\bigl(X \simeq \sum_{b : B}\operatorname{ConceptFiber}(q_C, b)\bigr)$ | `LEAN ✓` ([`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)；[第 39 章](ch39-observer-is-ontological-universe.md)) |
| D.17 | 难题五 | 对角可观测量相对相位盲区与 $X$ 解盲 | 一切对角单比特可观测量无法区分 $\rho_+$ 与 $Z\rho_+ Z$，而泡利 $X$ 严格分离两者 | `LEAN ✓` ([`diagonal_prime_observables_cannot_recover_relative_phase`](lean:D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase)；[第 31 章](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)) |
| D.18 | 难题六 | 幺正接计算基捏合轨迹相对熵产恒等式 | $\Delta S_{\mathrm{vN}}(k) = D(\widetilde{\rho}_k \mathrel{\Vert} \mathcal{P}(\widetilde{\rho}_k)) \ge 0$ 且有限 $N$ 拍严格裂项求和 | `LEAN ✓` ([`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)；[第 8 章](ch08-erasure-and-time-arrows.md)、[第 37 章](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)) |
| D.19 | 难题六 | 闭子空间非零正交补单位逃逸定理 | $S^\perp \neq \perp \implies \exists e \in S^\perp,\; \lVert e\rVert = 1 \land P_S e = 0 \land \lVert\operatorname{id}-P_S\rVert = 1$ | `LEAN ✓` ([`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)；[第 31 章](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)) |
| D.20 | 难题六 | 有限竞技场降低逃逸率充要判据 | 非退化竞技场上 $\operatorname{LowersEscape}(\mathrm{idx}) \iff 0 < \operatorname{uniqueCaptureCount}(\mathrm{idx})$ | `LEAN ✓` ([`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)；[第 21 章](ch21-diagonalization-and-escape.md)、[第 31 章](ch31-quantum-fairness.md#sec-ch31-fairness-square-expansion)) |
| D.21 | 全部六题 | 量子基础经典文献定理与实验台显式手算 | 冯·诺依曼 / Wigner / FR、Zurek / Schlosshauer、Gleason ($d\ge 3$) / JvN / Renou et al. (2021) 与 Chen–Li (2022)、Bell / Eberhard / 2015 无漏洞实验、Harrigan–Spekkens / PBR (2012)、Pauli / Wheeler–DeWitt / Hawking–Page–AMPS；配预示条件 $75\%/25\%$、$r^2+\tau_{L:E}=1$、洛伦兹助推 $\Delta t'=-2\Gamma_\beta\beta$、GRW 放大率与 $\{0, 1\}^4$ 逃逸算例 | `文献结果` / `手工推导` / `NUM`（第 D.2–D.3 节各注记） |
| D.22 | 全附录综合 | 撤除外部第 3 点 $C$ 与开放维度时间诠释 | 将六大公理裂痕归因于外部裁判点 $C$ 与固定维闭合容器假设（**A74**），并将量子态诠释为内生关系振幅、时间诠释为正交维度扩张；协变坍缩与视界幺正性保留为开放前沿 | `MODEL` / `OPEN`（第 D.1–D.3 节、[@prob-appendix-d-time-horizon]） |

:::
