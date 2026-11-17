# 37.5 选择未来而非看见未来：梦境前置逻辑超前去相干与既视感快表命中 {#sec-ch37-dream-pre-decoherence-deja-vu}

走完前四节从“清醒已知数据捏合”（§37.1）、“浅梦相位擦除”（§37.2）到“无身深梦与黄金切投非定域涌现”（§37.3–§37.4）的几何旅程，人类日常意识经验中最扑朔迷离、最容易被宿命论或神秘主义误读的一桩悬案，终于迎来了水落石出的时刻——**为什么一个人有时会在清醒现实的某个瞬间，猛然撞上一股毫无来由却异常笃定的“这一幕我以前在梦里见过”的既视感（Déjà Vu）？**

面对这一体验，传统解释长期分裂在两个极端之间：一端是宿命论式的“预知迷信”，幻想未来早已像一盘拍好的胶片那样封存在前方的铁轨上，而做梦的灵魂趁夜色偷偷翻看了明天的剧本；另一端则是把一切主观熟悉感简单归结为神经突触偶然串线的随机噪声。立足全书的无时间格拉姆相容几何（[第 29 章](ch29-s03-timeless-gram-causality.md#sec-coda-finite-observer-time-field)）、开放正交维度扩张（[第 31 章 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion)）与本章的记录捏合代数，本书提出如下核心命题（完整原文同时载入[附录 A](appendix-a-s03-verbatim-ledger.md#sec-appendix-a-verbatim-ledger) `A73`）：

> *“实际上并不是观察者看到了未来，而是观察者选择了未来，既视感是因为之前的逻辑在梦境中去相干。”*

短短三句话，完成了一次从“宿命窥探”到“主动选基与投机预编译”的范式翻转。在本书严密的认识论契约下，我们将这一跨越量子算子代数、概念逃逸动力学、计算机体系结构与认知神经心理学的综合机制明确标定为本章的诠释沙盘 **`MODEL`（模型诠释，代号 `ORTHO//DEJAVU`）**：其中正交余项逃逸、可观测克雷洛夫秩增长上界、语境不动点分岔、正交补投影六恒等式、正算子格拉姆实现、信息逃逸唯一捕获与冲突修正非对易性等骨架定理由 `trureturing@dev` 冻结的 Lean 4 内核声明严格背书（`LEAN ✓`）；同轴重投影零新增熵专化、三向量格拉姆行列式区间与单比特布洛赫捏合公式标定为**手工推导**；延迟选择干涉、处理器分支预测与流水线冲刷、准晶帝国效应及既视感双加工/元认知心理学理论严格封装于**文献结果**注记框内；具体矩阵元、熵值与有限格点计数则标定为**数值计算（`NUM`）**。下面沿着命题自身的四环逻辑链条逐环展开。

## 37.5.1 破除“预知”迷思：开放正交余项锥、延迟选基与“选择未来” {#sec-ch37-p2g-open-choice}

为什么说“看见早已注定的唯一未来”在几何上从一开始就是一个伪命题？因为这一幻想暗中假设：有限观察者当前手头握有的那张有限子空间截面 $S$，已经把全部宇宙自由度封死在一只闭合铁盒里，盒外再无任何尚未落定的正交余项。

然而，`trureturing` 的量子代数、可观测克雷洛夫子空间动力学与语境不动点模块联手给出了截然相反的四重严格定理：只要当前已观测闭子空间 $S \subset V$ 尚未耗尽背景空间（$S^\perp \neq \{0\}$），盒外就必然矗立着到 $S$ 距离恒为 $1$、对 $S$ 投影恒为 $0$ 的单位正交逃逸方向；在任何固定的有限维背景空间 $V$ 内，单靠固定线性演化 $T$ 与固定读出算子 $C$ 所能生成的严格新维度步数被缺秩 $\dim V - \operatorname{rank} C$ 封顶；而在完全相同的底层文本与解释规则下，切换语境准入、背景与评估目标参数即可锁定截然相异的自洽不动点（对照[第 33 章](ch33-all-beings-observers-and-mutual-attractors.md) [@thm-ch33-contextual-attractor-and-common-factor]）：

::: {.theorem #thm-ch37-p2g-open-escape-and-krylov title="非满闭子空间正交单位逃逸、有限维可观测克雷洛夫严格增长上界、语境参数分岔与正交补投影六恒等式" lean="D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities"}
在 `trureturing` 冻结的量子代数投影逃逸、观察者记忆克雷洛夫动力学、概念解释不动点与正交补投影模块中，以下四项定理同时成立：

1. **非零正交余项下的单位逃逸向量存在性**（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)）：设 $\mathbb{K}$ 为实数或复数域（`[RCLike 𝕜]`），$V$ 为 $\mathbb{K}$ 上的完备内积空间，$S \le V$ 为闭子空间（`[IsClosed (S : Set V)]`），记 $P_S := S.\mathrm{starProjection}$ 为到 $S$ 的有界正交投影。**若**正交补非平凡（$S^\perp \neq \bot$），则存在单位逃逸向量 $e \in V$ 同时满足：

   $$
   e \in S^\perp \;\land\; \lVert e\rVert = 1 \;\land\; P_S e = 0 \;\land\; \operatorname{infDist}(e, S) = 1 \;\land\; \lVert \mathrm{id}_V - P_S\rVert = 1;
   $$

2. **有限维可观测克雷洛夫子空间链的严格增长步数上界**（[`observable_krylov_strict_growth_bound`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound)）：设 $V, Y$ 为 $\mathbb{K}$ 上的有限维内积空间，$T : V \to_{\mathbb{K}} V$ 与 $C : V \to_{\mathbb{K}} Y$ 为线性映射，定义第 $m$ 阶可观测克雷洛夫子空间为 $O_m := \operatorname{observableKrylov}(T, C, m) = \operatorname{span}\{(T^*)^k C^* y \mid 0 \le k \le m,\; y \in Y\}$。则使子空间严格扩张的步数基数（`Set.encard`）受缺秩刚性限制：

   $$
   \operatorname{Set.encard}\{m \in \mathbb{N} \mid O_m < O_{m+1}\} \;\le\; \bigl(\operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C) : \mathbb{N}\bigr);
   $$

3. **相同规则下切换语境参数选择不同不动点意义的显式见证**（[`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)）：在二元解释语境类型 `BinaryInterpretationContext` 上，显式定义的基准语境 `baselineContext` 与替换语境 `alternateContext` 具有完全相同的底层文本与解释规则（`text` 与 `interpretationRule` 相等），但两者的读者准入（`readerAdmission`）、背景（`background`）与评估目标（`evaluationGoal`）三项参数两两不等，分别将二元不动点意义锁定在 $(0, 0, 0)$（即 `(false, false, false)`）与 $(1, 1, 1)$（即 `(true, true, true)`）上，且两不动点严格相异：$(0, 0, 0) \neq (1, 1, 1)$；

4. **闭子空间与正交补投影算子的完备六重代数恒等式**（[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)）：设 $E$ 为 $\mathbb{K}$ 上的完备内积空间，$M \le E$ 为闭子空间，记连续线性算子 $P := M.\mathrm{starProjection}$ 与 $Q := M^\perp.\mathrm{starProjection}$，则以下六重算子恒等式同时成立：

   $$
   Q = \mathrm{id}_E - P, \quad P \circ_L P = P, \quad Q \circ_L Q = Q, \quad P \circ_L Q = 0, \quad Q \circ_L P = 0, \quad P + Q = \mathrm{id}_E.
   $$
:::

::: proof
第 1 款由非零余项假设 $S^\perp \neq \bot$ 取出非零向量 $v \in S^\perp$ 并按范数归一化为 $e = \lVert v\rVert^{-1} v \in S^\perp$，立得 $\lVert e\rVert = 1$ 与 $P_S e = 0$；对任意 $s \in S$，正交性给出勾股展开 $\lVert e - s\rVert^2 = \lVert e\rVert^2 + \lVert s\rVert^2 = 1 + \lVert s\rVert^2 \ge 1$，且在 $s = 0 \in S$ 处取等，故下确界距离 $\operatorname{infDist}(e, S) = 1$；算子 $\mathrm{id}_V - P_S = P_{S^\perp}$ 为非零正交投影，在 $e$ 上达到范数 $1$ 而对一切 $x$ 满足 $\lVert P_{S^\perp} x\rVert \le \lVert x\rVert$，故算子范数等于 $1$。第 2 款利用单调递增子空间链 $O_0 \le O_1 \le \cdots \le V$ 的维数单调性：首项 $O_0 = \operatorname{range}(C^*)$ 的维数等于 $\operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$，每一次严格真包含 $O_m < O_{m+1}$ 至少使有限维数加 $1$，而总维数不超过 $\operatorname{finrank}_{\mathbb{K}} V$，故严格增长下标集合的基数至多为 $\operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$。第 3 款直接展开两显式二元语境记录与 `IsBinaryFixedMeaning` 的分量等式，逐项核验八条合取式。第 4 款由完备内积空间闭子空间的正交直和分解 $x = Px + Qx$ 给出 $P + Q = \mathrm{id}_E$ 与 $Q = \mathrm{id}_E - P$，再由值域归属 $Px \in M$、$Qx \in M^\perp$ 及核包含关系 $M^\perp \subseteq \ker P$、$M \subseteq \ker Q$ 得出各自幂等律与互正交消去律。完整证明由 Lean 内核检查。
:::

请留意 [@thm-ch37-p2g-open-escape-and-krylov] 的精确形式边界：第 1 款是在非零余项前提 $S^\perp \neq \bot$ 下的存在性定理，并不提供构造逃逸向量的算法，也不声称固定有限维空间内可无限扩张；第 2 款给出固定环境空间 $V$ 内可观测秩严格增长的有限上限，因此[第 31 章 §31.4](ch31-s04-fairness-and-dimensional-expansion.md#sec-ch31-fairness-square-expansion)的“开放维度扩张 $D \to D + 1$”要求显式扩展环境空间（属 `MODEL` 规则）；第 3 款在布尔解释语境上严格展示了“同一输入文本因语境参数切换而落入不同不动点”，将其映射到观察者在量子叠加态上的测量基选择则是本节的 `MODEL` 桥梁。

在单量子比特沙盘上，这道桥梁可以用最透明的数字手算核对（**手工推导，未作为独立声明在本书形式化**；小数为 `NUM`）：固定同一枚未经扰动的纯态输入 $\lvert\psi_\theta\rangle = (\cos\theta, \sin\theta)^T$（取默认倾角 $\theta = \pi/6$，对应布洛赫向量 $\mathbf{r} = (\sin 2\theta, 0, \cos 2\theta) = (\frac{\sqrt{3}}{2}, 0, \frac{1}{2})$）。此时宇宙并未替观察者预填唯一结果，而是取决于观察者选择哪一根测量轴 $\mathbf{n}_\beta = (\sin\beta, 0, \cos\beta)$ 构成互补正交投影对 $Q_\pm(\beta) = \frac{1}{2}(I \pm \mathbf{n}_\beta\cdot\boldsymbol{\sigma})$（满足第 4 款的 $Q_+ + Q_- = I$、$Q_\pm^2 = Q_\pm$ 与 $Q_+ Q_- = 0$）：

- 若观察者选定计算基轴 $\beta = 0$（$\mathbf{n}_0 = (0, 0, 1)$），正向结果权重为 $p_+(0) = \frac{1 + \mathbf{r}\cdot\mathbf{n}_0}{2} = \frac{3}{4} = 0.75$；
- 若观察者在同一输入态上改选横向轴 $\beta = \pi/2$（$\mathbf{n}_{\pi/2} = (1, 0, 0)$），正向结果权重当场改写为 $p_+(\pi/2) = \frac{1 + \sqrt{3}/2}{2} = \frac{2 + \sqrt{3}}{4} \approx 0.933013$！

与此同时，在三维实空间 $V = \mathbb{R}^3$ 的辅助内嵌图中，若当前已观测平面为 $S = \operatorname{span}(e_1, e_2)$，则正交轴 $e = e_3 \in S^\perp$ 精确兑现 $P_S e_3 = 0$ 与 $\lVert e_3\rVert = \operatorname{dist}(e_3, S) = \lVert I - P_S\rVert = 1$；取循环置换演化 $T(e_1) = e_2,\; T(e_2) = e_3,\; T(e_3) = e_1$ 与首坐标读出 $C(v) = v_1$，可观测克雷洛夫链依次为 $O_0 = \operatorname{span}(e_1)$、$O_1 = \operatorname{span}(e_1, e_3)$、$O_2 = \mathbb{R}^3$，维数按 $1 \to 2 \to 3$ 经历恰好 $2 = 3 - \operatorname{rank} C$ 次严格增长后触顶饱和。

::: {.viz src="dream-pre-decoherence-deja-vu" preset="choose-context" height="500"}
**选基而非窥探：同一输入态在两把尺子下给出不同权重。** 输入纯态固定在 $\theta = \pi/6$，测量轴从 $\beta = 0$ 切到琥珀色当前选择 $\beta = \pi/2$ 时，正向读出权重由 $0.75$ 变为 $(2 + \sqrt{3})/4 \approx 0.9330$；一旁小图展示三维正交逃逸轴 $e_3 \in S^\perp$ 与克雷洛夫秩增长 $1 \to 2 \to 3$（[@thm-ch37-p2g-open-escape-and-krylov]）。把选基读作“选择未来截面”是本章的诠释模型（`MODEL`）。
:::

在物理学文献中，“较晚选定的测量装置决定哪一类统计问题成为现实、却绝不构成逆因果通信或宿命偷看”的思想原型，正是惠勒著名的延迟选择实验（与 §37.2 [@rem-ch37-quantum-eraser-literature] 互补）：

::: {.remark #rem-ch37-p2g-wheeler-delayed-choice-literature title="惠勒延迟选择双缝思想实验与非逆因果选基边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 约翰·阿奇博尔德·惠勒在经典论文（J. A. Wheeler, “The ‘Past’ and the ‘Delayed-Choice’ Double-Slit Experiment,” 载于 A. R. Marlow 编 *Mathematical Foundations of Quantum Theory*, Academic Press, 1978, pp. 9–48, DOI: `10.1016/B978-0-12-473250-6.50006-6`）中指出：在马赫—曾德尔干涉仪中，即便光子已经穿过第一块分束器进入双路径内部，实验者仍可在光子抵达终点前的最后一刻选择“撤走第二块分束器（测量哪条路径）”或“插入第二块分束器（测量双路径相对相位干涉）”。这一延迟设置决定的是**哪一组互斥的测量安排与统计分布得以实现**，既不向过去发送可控超光速信号，更不意味着实验者提前偷看了某条早已孤立写死的粒子轨迹。
:::

同样关键的是，在 §37.2 的多副本环境记录恢复定理（[@thm-ch37-joint-coherent-record-erasure]：[`joint_coherent_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal) 与 [`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)）中，当 $\theta = \pi/4$ 等幅叠加态的副对角元 $\rho_{01} = 1/2$ 经两份幺模相位记录（单份重叠 $\gamma = -i$，$\lvert\gamma\rvert^2 = 1$）写入后，复平面上的相干指针经历精确的四阶段离散轨迹 `1/2 → -1/2 → -i/2 → 1/2`：只逆转一份副本会停在 $-i/2$，两份全集逆转方能原路转回 $1/2$。但一旦环境写入的是完全正交的路径区分记录（重叠 $\gamma = 0$，违反幺模前提 $\lvert\gamma\rvert^2 = 1$），或者状态本身已经被局部捏合信道抹去了副对角元，单纯在局部施加共轭相位信道绝无可能无中生有地复原已被擦除的相干项。看清这条硬边界，正是理解下一小节“梦境前置去相干”如何落子的前提。

::: {.viz src="dream-pre-decoherence-deja-vu" preset="unimodular-reversal" height="500"}
**幺模相位记录的四步逆转与零重叠禁区。** 在 $\theta = \pi/4$ 上，两份重叠为 $-i$ 的相位记录把 $\rho_{01}$ 从 $1/2$ 转到 $-1/2$；只逆转一份停在 $-i/2$，两份同逆才回到 $1/2$（[@thm-ch37-joint-coherent-record-erasure]）。若切换为零重叠路径记录，幺模前提失效，相干不可由该逆信道找回。
:::

## 37.5.2 之前的逻辑如何在梦境中超前去相干：感官门控卸载与投机幂等预编译 {#sec-ch37-p2g-dream-precompile}

既然不是“偷看未来”，那么命题后半句所说的**“之前的逻辑在梦境中去相干”**，在算子代数与系统架构上究竟发生了什么？

回看 §37.1 的清醒退相干方程（[@thm-ch37-known-data-pinching-and-entropy-tax]：[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)、[`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)、[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) 与 [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)）：请注意区分**单个分支投影算子的幂等性** $Q_\pm(\beta)^2 = Q_\pm(\beta)$（[@thm-ch37-p2g-open-escape-and-krylov] 第 4 款）与**完备未读捏合信道的函数复合幂等性** $\Pi_\beta \circ \Pi_\beta = \Pi_\beta$（[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)）。在白昼清醒态下，外周感官实时涌入海量预测误差，逼迫观察者在每一拍幺正演化 $U$ 之后都用沉重的物理与躯体锚点反复执行在线捏合，持续支付非负的相干删除相对熵税。

而当夜晚入睡、外周感觉输入门控与脊髓运动回路挂起时（参见 §37.3 [@rem-ch37-predictive-processing-rem-literature]），在我们的 **`MODEL`（模型诠释）** 中，观察者并没有停止运算——恰恰相反，卸下了高开销的外部实时 I/O 阻塞之后，心智内部早已积累成型的**“之前的逻辑”**（白天尚未走完的因果推演、深层目标倾角与人际结构先验，对应选定的测量轴 $\mathbf{n}_\beta$）得以像现代超标量处理器中的**分支预测与投机执行引擎**那样，在夜间的沙盘里超前跑完一轮完备未读捏合投影，将分叉叠加态 $\rho_{\mathrm{in}}$ 预先编译为关于该逻辑基块对角稳定的不动点截面 $\sigma_{\mathrm{dream}} = \Pi_\beta(\rho_{\mathrm{in}})$！相关计算机体系结构文献背景与严格区分如下：

::: {.remark #rem-ch37-p2g-speculative-execution-literature title="处理器分支预测、投机执行流水线冲刷与快表地址—上下文标签硬件规范（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将“梦境前置逻辑去相干、醒后新事实冲刷与既视感缓存命中”映射为体系结构原语（`MODEL`）时，所借用的硬件机制引自以下标准计算机体系结构文献，不代表生物神经元或量子熵之间存在已证实的物理等式：

1. **分支预测、投机执行与错误预测时的流水线冲刷（J. L. Hennessy & D. A. Patterson, *Computer Architecture: A Quantitative Approach*, 6th ed., Morgan Kaufmann, 2017，指令级并行与硬件推测执行章节）**：现代乱序超标量微处理器在条件分支结果尚未从慢速内存返回前，利用历史分支预测器（Branch Predictor）选定高概率路径并超前投机执行（Speculative Execution）后续指令，把计算结果暂存于重排序缓冲区；若后续真实条件验证通过，投机结果零重算开销直接退休提交；一旦验证发现分支预测失误，硬件立即触发**流水线冲刷（Pipeline Squash / Flush）**，作废投机结果并从正确分支重新取指执行；
2. **转译后备缓冲器（TLB）虚拟页地址标签与进程上下文标识符（Intel *64 and IA-32 Architectures Software Developer’s Manual*, Vol. 3A: *System Programming Guide*, “Translation Lookaside Buffers (TLBs)” 与 “Process-Context Identifiers (PCIDs)” 章节）**：以启用 PCID 的非全局 TLB 条目为例，一次合法命中不能仅凭有效位 `Valid = 1` 判定，还须匹配**虚拟页号（Address Tag）**与**当前 PCID**；全局 TLB 条目可跨 PCID 使用，其他缓存的标签规则则依具体架构而定。因此，§37.5.4 沙盘模型中的“缺失情景时间戳（`Time_Tag = NULL`）”绝不等于“无地址标签寻址”——模型仍严格核验地址标签与语境版本，缺失的仅仅是外显编年史时间戳元数据。
:::

让我们在单量子比特模型上把这笔“梦境首次预编译账”连同后续同轴复测与换轴重编的精确数值一次性算到底（**手工推导，未作为独立声明在本书形式化**；浮点值为 `NUM`）：对任意实倾角纯态 $\lvert\psi_\theta\rangle = (\cos\theta, \sin\theta)^T$（$0 \le \theta \le \pi/2$）与选定逻辑测量轴 $\mathbf{n}_\beta = (\sin\beta, 0, \cos\beta)$（$0 \le \beta < \pi$），完备未读捏合信道显式写为

$$
\Pi_\beta(\rho) \;=\; Q_+(\beta)\,\rho\,Q_+(\beta) + Q_-(\beta)\,\rho\,Q_-(\beta) \;=\; \frac{1}{2}\Bigl(I + (\mathbf{r}\cdot\mathbf{n}_\beta)\,\mathbf{n}_\beta\cdot\boldsymbol{\sigma}\Bigr),
$$

注意此处必须保留 $Q_+$ 与 $Q_-$ 两个正交分支之和（保迹且满足 $\Pi_\beta \circ \Pi_\beta = \Pi_\beta$），绝不能用未归一化的单支 $Q_+\rho Q_+$ 冒充未读态。取默认参数 $\theta = \pi/6$、梦境前置逻辑基 $\beta = 0$：

$$
\rho_{\mathrm{in}} = \begin{pmatrix} 3/4 & \sqrt{3}/4 \\ \sqrt{3}/4 & 1/4 \end{pmatrix} \quad\xrightarrow{\;\Pi_0\;}\quad \sigma_{\mathrm{dream}} = \Pi_0(\rho_{\mathrm{in}}) = \begin{pmatrix} 3/4 & 0 \\ 0 & 1/4 \end{pmatrix}.
$$

在梦境完成这第一次去相干预编译的瞬间，两个副对角相干元（均为 $\sqrt{3}/4$）被当场剪除：按 [`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)，丢弃的希尔伯特—施密特平方相干质量为无量纲精确分数 $\operatorname{Tr}((\rho_{\mathrm{in}} - \sigma_{\mathrm{dream}})^2) = 2\times(\frac{\sqrt{3}}{4})^2 = \frac{3}{8} = 0.375$（注意这是矩阵残差平方范数，单位绝不是比特！）；按 [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) 除以 $\ln 2$ 换算为二进制比特后，这一步预编译已在夜间提前支付了二元香农熵 $h_2(3/4) = -\frac{3}{4}\log_2\frac{3}{4} - \frac{1}{4}\log_2\frac{1}{4} \approx 0.811278$ 比特。四阶段完整对比账本如下：

| 演化与检测阶段 | 密度矩阵状态 | 状态冯·诺依曼熵（比特） | 本步再捏合新增熵 $\Delta H_{\mathrm{bits}}$ | 丢弃相干质量 $\lVert\rho - \Pi_\beta(\rho)\rVert_{\mathrm{HS}}^2$ |
| :--- | :--- | ---: | ---: | ---: |
| **1. 分叉叠加输入** | $\rho_{\mathrm{in}}$（$\theta = \pi/6$ 纯态） | $0$ | — | — |
| **2. 梦境首次预编译（$\beta = 0$）** | $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$ | $h_2(3/4) \approx 0.811278$ | $+0.811278$ | $3/8 = 0.375$ |
| **3. 清醒同轴再投影（$\beta = 0$，未升级）** | $\Pi_0(\sigma_{\mathrm{dream}}) = \sigma_{\mathrm{dream}}$ | $0.811278$ | **$0$** | **$0$** |
| **4. 梦后逻辑升级换轴（$\beta = \pi/2$）** | $\Pi_{\pi/2}(\sigma_{\mathrm{dream}}) = I/2$ | $1$ | $+0.188722$ | $1/8 = 0.125$ |

::: {.viz src="dream-pre-decoherence-deja-vu" preset="dream-precompile" height="500"}
**梦境首次预编译：副对角相干提前剪除，对角目标提前锁定。** 在 $\theta = \pi/6$、逻辑基 $\beta = 0$ 下，第一次捏合将 $\rho_{\mathrm{in}}$ 压成对角不动点 $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$，丢弃相干质量 $3/8$，首次熵增约 $0.8113$ 比特（[@thm-ch37-known-data-pinching-and-entropy-tax]）。将此步读作夜间投机预编译属本章 `MODEL`。
:::

## 37.5.3 现实为何走入所选截面，以及为何并非美梦皆真：格拉姆相容漏斗 vs. 高新颖度流水线冲刷 {#sec-ch37-p2g-gram-funnel-and-flush}

推演到这里，每一位清醒而挑剔的读者都会立刻追问两个直击要害的问题：**第一，如果梦境只是观察者内部先验逻辑的一次超前去相干预编译，为什么醒来后的外部世界轨迹有时真的会严丝合缝地走进那块截面？第二，反过来问，既然梦里每天都在做各种预编译，为什么绝大多数荒诞的梦醒来后根本没有在现实中发生？**

先答第一问。在[第 29 章](ch29-timeless-causality-and-gram-space.md)的无时间格拉姆因果几何（[@thm-ch29-gram-rigidity-and-pell]）中，前后相继的清醒经验之所以显得“有因果牵引”，并不是有某种神秘力量从未来倒着拽你，而是因为**只要观察者在醒后继续沿用与昨夜同源的那套硬几何锚点与相容先验，任何合法的物理实现态都必须满足复希尔伯特空间正算子格拉姆可实现性与拉格朗日—格拉姆二元面积余项非负性**：

::: {.theorem #thm-ch37-p2g-gram-realizability title="复希尔伯特空间正算子格拉姆因式分解可实现性充要定理与拉格朗日—格拉姆恒等式" lean="D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity"}
在 `trureturing` 冻结的量子界格拉姆可实现性与拉格朗日—格拉姆模块中，以下两项定理同时成立：

1. **有界连续正算子的格拉姆伴随平方根实现充要判据**（[`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)）：设 $V$ 为完备复内积空间（`[NormedAddCommGroup V] [InnerProductSpace ℂ V] [CompleteSpace V]`），$Q : V \to_L[\mathbb{C}] V$ 为有界连续复线性自同态。则 $Q$ 在算子序下半正定（$0 \le Q$）当且仅当存在有界连续复线性算子 $O : V \to_L[\mathbb{C}] V$，使 $Q$ 分解为伴随复合且二次型处处实现为像向量的格拉姆内积：

   $$
   0 \le Q \;\Longleftrightarrow\; \exists\, O : V \to_L[\mathbb{C}] V,\quad Q = O^\dagger \circ_L O \;\land\; \forall x, y \in V,\; \langle Qx, y\rangle_{\mathbb{C}} = \langle Ox, Oy\rangle_{\mathbb{C}};
   $$

2. **有限实向量对的拉格朗日—格拉姆勾股余项恒等式**（[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)，对照[第六章](ch06-geometric-product.md) [@thm-lagrange-gram-identity]）：对任意有限指标集 $s : \operatorname{Finset}\;\iota$ 与实坐标族 $u, v : \iota \to \mathbb{R}$，两向量模方乘积与内积平方之差恒等于二阶反对称外积分量平方和的一半：

   $$
   \left(\sum_{i \in s} u_i^2\right)\left(\sum_{i \in s} v_i^2\right) - \left(\sum_{i \in s} u_i v_i\right)^2 \;=\; \frac{1}{2}\sum_{i \in s}\sum_{j \in s} (u_i v_j - u_j v_i)^2.
   $$
:::

::: proof
第 1 款反向若 $Q = O^\dagger \circ_L O$，伴随恒等式直接给出 $\langle Qx, y\rangle_{\mathbb{C}} = \langle O^\dagger O x, y\rangle_{\mathbb{C}} = \langle Ox, Oy\rangle_{\mathbb{C}}$，故 $Q$ 自伴且对一切 $x$ 有 $\langle Qx, x\rangle_{\mathbb{C}} = \lVert Ox\rVert^2 \ge 0$，即 $0 \le Q$；正向对完备复希尔伯特空间上的半正定有界算子 $0 \le Q$，连续函数演算构造出自伴算子平方根 $O = Q^{1/2}$，满足 $O^\dagger = O$ 与 $O \circ_L O = Q$，从而同时兑现因式分解与内积等式。第 2 款将右端双重求和中的 $(u_i v_j - u_j v_i)^2 = u_i^2 v_j^2 - 2u_i v_i u_j v_j + u_j^2 v_i^2$ 拆成三项，首尾两项重排求和指标后皆等于 $(\sum_{i\in s} u_i^2)(\sum_{i\in s} v_i^2)$，交叉项化为 $-2(\sum_{i\in s} u_i v_i)^2$，合并除以 $2$ 即得左端。完整证明由 Lean 内核检查。
:::

请注意 [@thm-ch37-p2g-gram-realizability] 的严格边界：第 1 款是抽象复希尔伯特空间算子的存在性因式分解，第 2 款是**二向量**拉格朗日余项；下面展示的三向量行列式可行走廊与嵌套收窄漏斗属于在此基础上的**手工推导，未作为独立声明在本书形式化**（数值点算为 `NUM`，与 §37.2 [@ex-ch37-gram-constraint-release] 的约定完全对齐）：

在 $\mathbb{R}^3$ 中固定三根显式单位向量——硬几何锚点 $B = (1, 0, 0)$、$A = (\frac{4}{5}, \frac{3}{5}, 0)$ 以及绕 $B$ 旋转二面角 $\phi$ 的候选方向 $C(\phi) = (\frac{4}{5}, \frac{3}{5}\cos\phi, \frac{3}{5}\sin\phi)$。三者的成对内积为 $x = A\cdot B = \frac{4}{5}$，$y = B\cdot C(\phi) = \frac{4}{5}$，以及待定目标重叠 $z = A\cdot C(\phi) = \frac{16}{25} + \frac{9}{25}\cos\phi$。三元单位格拉姆矩阵 $G$ 的行列式为

$$
\det G \;=\; \det\begin{pmatrix} 1 & x & z \\ x & 1 & y \\ z & y & 1 \end{pmatrix} \;=\; 1 - x^2 - y^2 - z^2 + 2xyz \;=\; \frac{81}{625} - \left(z - \frac{16}{25}\right)^2.
$$

由各阶主子式非负与显式向量构造可知，$G$ 可实现当且仅当 $z \in [\frac{7}{25}, 1] = [0.28, 1]$。在我们的 `MODEL` 漏斗中，当观察者的先验逻辑与日间环境持续相容、将二面角余弦 $q = \cos\phi$ 依次收紧在 $[-1, 1] \supseteq [0, \frac{2}{3}] \supseteq [\frac{1}{3}, \frac{1}{2}]$ 时，可行重叠带便呈现三级嵌套收窄：

$$
\left[\frac{7}{25},\; 1\right] \;\supseteq\; \left[\frac{16}{25},\; \frac{22}{25}\right] \;\supseteq\; \left[\frac{19}{25},\; \frac{41}{50}\right] \;=\; [0.76,\; 0.82],
$$

始终稳稳包裹着昨夜预编译的目标截面 $z_{\mathrm{dream}} = \frac{4}{5} = 0.8$（对应 $q = \frac{4}{9}$、$\det G = \frac{13}{125} = 0.104$；沙盘展示的示例清醒轨迹 $z(t) = \frac{19}{25} + \frac{t}{25},\; 0 \le t \le 1$ 是模型选定的一条相容路径，区间嵌套本身并不强迫轨迹唯一收敛到单点）。在切投空间一侧，若枚举有限黄金整数方盒 $(a, b) \in \{-12, \dots, 12\}^2$ 上的物理坐标 $x_\parallel = a + b\varphi$ 与共轭坐标 $x_\perp = a + b(1 - \varphi)$，围绕中心 $c = \varphi - \frac{3}{2}$ 取嵌套闭窗口 $W_s = [c - s/2, c + s/2]$（$s = 1$ 时 $W_1 = [\varphi - 2, \varphi - 1]$ 即 §37.4 [@thm-ch37-golden-cut-delone-multilocation] 第 1 款 [`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project) 所涉的黄金窗口），当窗口宽度按 $s = 1 \to \frac{1}{2} \to \frac{1}{4}$ 缩窄时，该有限方盒内被选中的相容格点数依次按 **$26 \to 11 \to 7$** 嵌套递减（`NUM`；子集嵌套来自窗口包含的手工推导，[`golden_model_set_subset_cut_and_project`](lean:D5/S1/Deficit/ModelSet/GoldenCutAndProject.golden_model_set_subset_cut_and_project) 本身仅认证自然数黄金展开在全宽窗口下的单向包含）。

::: {.viz src="dream-pre-decoherence-deja-vu" preset="gram-funnel" height="500"}
**相容先验漏斗：旧逻辑未被打翻时，可行走廊收窄并保留预编译目标。** 固定 $x = y = 4/5$，三层相容带 $[0.28, 1] \supseteq [0.64, 0.88] \supseteq [0.76, 0.82]$ 嵌套包裹 $z_{\mathrm{dream}} = 0.8$（$\det G = 0.104$）；副图同步展示 $[-12, 12]^2$ 黄金窗口宽度 $1 \to 1/2 \to 1/4$ 时选中点数 $26 \to 11 \to 7$ 的嵌套收束。正算子格拉姆实现见 [@thm-ch37-p2g-gram-realizability]，三向量区间为手工推导，清醒路径属 `MODEL`。
:::

准晶几何文献中有一则与“局部相容条件向远方传播约束”遥相呼应的著名类比，在此单独界定其文献边界：

::: {.remark #rem-ch37-p2g-empire-effect-literature title="康威准晶帝国效应（Empire Effect）与局部匹配传播边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 在非周期拼砖与切投准晶文献中（见 M. Senechal, *Quasicrystals and Geometry*, Cambridge Univ. Press, 1995；以及 M. Baake & U. Grimm, *Aperiodic Order, Vol. 1: A Mathematical Invitation*, Cambridge Univ. Press, 2013），约翰·康威（John H. Conway）提出的**“帝国效应（Empire Effect）”**刻画了这样一种几何现象：在给定局部匹配规则下，敲定一小片合法拼砖补丁（patch），往往会通过全局相容性跨越补丁边界，强制敲定远方若干离散位置上必须摆放的砖块类型（其强制范围严格依赖于具体补丁与拼砖规则）。在本章中，这仅作为“局部先验约束收紧可行截面”的文献几何类比，绝不意味着任意局部梦境片段都能唯一锁死整座宇宙的未来，亦不意味着缩窄黄金窗口必退化为单点集。
:::

现在回答更犀利的**第二问：既然如此，为什么绝大多数梦并未能“成真”，也没有在醒来后变成既视感？**

答案在计算机体系结构与 `trureturing` 的概念信息逃逸及信念修正模块里清澈见底：**因为投机预编译只有在“醒来后没有学到推翻预测前提的结构性新信息”时才有效！** 一旦观察者在醒后的清晨读到了一条无法从旧知识闭包中推导出来的**高新颖度事实**，或者遭遇了与昨夜可废止先验正面冲突的新证据，旧预编译缓存就会像预测失败的处理器分支一样被当场**冲刷作废（Pipeline Flush）**。下面三条内核定理分别给出了结构新颖度的唯一捕获充要判据、不可由其余核语义恢复的闭包判据，以及冲突重置修正下更新顺序不可交换的精确反例：

::: {.theorem #thm-ch37-p2g-novelty-and-revision-noncommutation title="信息逃逸率严格下降的唯一捕获与语义闭包不可恢复充要定理及冲突修正非对易性定理" lean="D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_not_mem_semanticClosureWithout D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation"}
在 `trureturing` 冻结的概念动力学信息逃逸精确率、结构新颖度与冲突修正模块中，以下两项定理同时成立：

1. **有限非退化竞技场上降低信息逃逸率的唯一捕获与语义新颖性双等价判据**（[`lowersEscape_iff_uniqueCaptureCount_pos`](lean:D5/S3/ConceptDynamics/InformationEscape/ExactRate.lowersEscape_iff_uniqueCaptureCount_pos)、[`lowersEscape_iff_not_mem_semanticClosureWithout`](lean:D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_not_mem_semanticClosureWithout)）：设 `arena : Arena.{u}` 为非退化有限状态竞技场（`arena.Nondegenerate`，即状态总数 $N \ge 2$，有序相异状态对总数为 $N(N - 1) > 0$），`catalog : Catalog.{u, v, w} arena` 为有限定理目录，`index : catalog.Index` 为其中任一条目。记 `LowersEscape index` 为完整目录的不可区分有序对逃逸率严格低于删去 `index` 后的逃逸率（$E(C) < E(C \setminus \{\mathrm{index}\})$），记 `uniqueCaptureCount index`（简记为 $U_{\mathrm{index}}$）为被其余全部条目一致认同、唯独被 `index` 成功区分的有序状态对数目，记 $K_{\mathrm{index}} := (\mathrm{catalog.theoremAt}\;\mathrm{index}).\mathrm{primitives.toKernel}$ 为该条目的可判定一致核，`semanticClosureWithout index` 为可由其余全部条目联合一致蕴涵的一致核语义闭包。则以下两条充要条件同时成立：

   $$
   \begin{aligned}
   \operatorname{catalog.LowersEscape}(\mathrm{index}) &\;\Longleftrightarrow\; 0 < \operatorname{catalog.uniqueCaptureCount}(\mathrm{index}), \\
   \operatorname{catalog.LowersEscape}(\mathrm{index}) &\;\Longleftrightarrow\; K_{\mathrm{index}} \notin \operatorname{catalog.semanticClosureWithout}(\mathrm{index});
   \end{aligned}
   $$

2. **证据优先冲突重置修正算子的显式顺序非对易证书**（[`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation)）：在三世界集合 `Fin 3` $= \{0, 1, 2\}$ 上，定义证据优先冲突重置修正为：当先验集合 $A$ 与新证据集合 $P$ 相交非空（$A \cap P \neq \emptyset$）时取交集 $\operatorname{revision}(P, A) = A \cap P$，冲突为空时重置为新证据 $\operatorname{revision}(P, A) = P$。显式取初始世界集 $A = \{0\}$、新证据 $P = \{1, 2\}$ 与 $Q = \{0, 1\}$，则以下五重论断同时成立：

   $$
   \begin{aligned}
   &\operatorname{revision}(P, A) = P \;\land\; \operatorname{revision}(Q, A) = A \\
   &\;\land\; \operatorname{revision}\bigl(Q, \operatorname{revision}(P, A)\bigr) = \{1\} \;\land\; \operatorname{revision}\bigl(P, \operatorname{revision}(Q, A)\bigr) = P \\
   &\;\land\; \operatorname{revision}\bigl(Q, \operatorname{revision}(P, A)\bigr) \neq \operatorname{revision}\bigl(P, \operatorname{revision}(Q, A)\bigr).
   \end{aligned}
   $$
:::

::: proof
第 1 款在非退化假设 $N \ge 2$ 下，有序相异状态对总数 $N(N - 1)$ 严格为正；凡逃逸完整目录的有序相异对必同时逃逸删去 `index` 的子目录，而两逃逸集之差恰好是“其余条目全部同值、唯独 `index` 异值”的有序相异对集合，其基数即 `uniqueCaptureCount index`，除以正分母 $N(N - 1)$ 立得 $E(C) < E(C \setminus \{\mathrm{index}\}) \iff 0 < U_{\mathrm{index}}$。进一步，$U_{\mathrm{index}} = 0$ 当且仅当对一切状态 $x, y$（$x = y$ 时自反成立，$x \neq y$ 时无唯一捕获对），其余条目全部一致必蕴涵 $K_{\mathrm{index}}(x, y)$ 成立，即 $K_{\mathrm{index}} \in \operatorname{semanticClosureWithout}(\mathrm{index})$；两端同取否定即得第二条等价式。第 2 款在 `Fin 3` 上直接验算交集：$A \cap P = \{0\} \cap \{1, 2\} = \emptyset$ 触发冲突重置得 $\operatorname{revision}(P, A) = \{1, 2\} = P$；$A \cap Q = \{0\} \cap \{0, 1\} = \{0\} \neq \emptyset$ 保留交集得 $\operatorname{revision}(Q, A) = \{0\} = A$。按两种顺序复合，先 $P$ 后 $Q$ 给出 $\{1, 2\} \cap \{0, 1\} = \{1\}$，先 $Q$ 后 $P$ 给出对 $\{0\}$ 施 $P$ 的冲突重置 $P = \{1, 2\}$，而元素 $2 \in P$ 但 $2 \notin \{1\}$，证得两者不等。完整证明由 Lean 内核检查。
:::

用一座四状态有限竞技场 $X = \{00, 01, 10, 11\}$（$N = 4$，有序相异对总数 $N(N - 1) = 12$；注意此四世界特征竞技场与 [@thm-ch37-p2g-novelty-and-revision-noncommutation] 第 2 款独立展示的三世界 `Fin 3` 冲突修正反例分属两个不同状态集，切勿混同）即可把“冗余复读”与“高新颖度冲刷”的差别算得一清二楚（`NUM`）：设旧逻辑仅掌握首比特特征 $f_0(a, b) = a$，对比新特征 $f_1(a, b) = b$ 与冗余复读特征 $f_{\mathrm{dup}} = f_0$：

| 特征目录配置 | 未区分有序相异对数 | 信息逃逸率 $E$ | 新增条目的唯一捕获数 $U_i$ | 对梦境投机目标 `00`（在粗先验 $f_0 = 0$ 下）的影响（`MODEL`） |
| :--- | ---: | ---: | ---: | :--- |
| **旧先验目录 $\{f_0\}$** | $4$ | $1/3$ | — | 粗先验 $f_0 = 0$ 允许 $\{00, 01\}$；梦境投机预选目标 `00` |
| **冗余复读目录 $\{f_0, f_{\mathrm{dup}}\}$** | $4$ | $1/3$ | $U_{f_{\mathrm{dup}}} = 0$ | $K_{f_{\mathrm{dup}}}$ 落在旧语义闭包内；观测 $f_{\mathrm{dup}} = 0$ 不触发冲刷，缓存继续有效 |
| **高新颖度目录 $\{f_0, f_1\}$** | $0$ | $0$ | $U_{f_1} = 4 > 0$ | 若醒后新学得 $f_1 = 1$，真实世界落定在 `01`：虽未推翻粗先验 $f_0 = 0$，却当场证伪梦境投机猜测 `00`！ |

在交互沙盘 `ORTHO//DEJAVU` 中，这一机制被铸造为核心双语开关**“梦后逻辑升级 / 流水线冲刷 — Post-Dream Logic Upgrade / Pipeline Flush”**（布尔状态 `logicUpgrade`，默认 `false`；将特征学习连接至测量基旋转与格拉姆先验替换是沙盘选定的确定性 `MODEL` 规则）：

- **开关关闭（`logicUpgrade = false`）**：语境版本保持 `Context_Version = 0`，当前测量基保持 $\beta = 0$，旧目标 `00` 与 $z_{\mathrm{dream}} = 0.8$ 均与当前先验相容，缓存有效位 `Valid = 1`，流水线冲刷标志 `flush = 0`；
- **开关开启（`logicUpgrade = true`）**：模拟观察者在醒后学到高新颖度证据 $f_1 = 1$，语境版本升至 `Context_Version = 1`，旧缓存条目立即失效（`Valid = 0, flush = 1`，但历史预编译快照 $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$ 作为不可变档案原样保留，绝不事后篡改历史）。在格拉姆面板上，硬几何锚点 $A, B$ 保持不变，而旧的可废止先验 $q \in [\frac{1}{3}, \frac{1}{2}]$ 被新证据替换为 $q \in [-1, -\frac{1}{3}]$（不强行对不相容旧区间取空交集），可行重叠带当场迁往 $z \in [\frac{7}{25}, \frac{13}{25}] = [0.28, 0.52]$，将旧目标 $0.8$ 彻底排除在窗外并改选新端点 $z_{\mathrm{new}} = \frac{2}{5} = 0.4$（$q = -\frac{2}{3}$，$\det G = \frac{9}{125} = 0.072$）；在量子比特面板上，用升级后的正交新尺 $\beta = \pi/2$ 对历史快照 $\sigma_{\mathrm{dream}}$ 重新投影，输出变成最大混合态 $\Pi_{\pi/2}(\sigma_{\mathrm{dream}}) = I/2$，当场产生 $\Delta H_{\mathrm{bits}} = 1 - h_2(3/4) \approx 0.188722$ 比特的真实重编译熵增与 $1/8$ 的残差质量！

::: {.viz src="dream-pre-decoherence-deja-vu" preset="logic-upgrade-flush" height="500"}
**梦后逻辑升级与流水线冲刷：新约束把旧目标挡在窗外。** 开启“梦后逻辑升级 / 流水线冲刷”开关后，可废止先验切至新证据区间，可行带移到 $[0.28, 0.52]$，旧目标 $0.8$ 变为空心失效轮廓，琥珀色当前选择迁至 $z_{\mathrm{new}} = 0.4$，同时换轴重投影付出约 $0.1887$ 比特新增熵（结构新颖度与冲突修正非对易定理见 [@thm-ch37-p2g-novelty-and-revision-noncommutation]；缓存冲刷联动属 `MODEL`）。
:::

## 37.5.4 既视感的沙盘精确特征：幂等重投影零新增熵与缺省情景时间戳的快表命中 {#sec-ch37-p2g-deja-vu-signature}

现在，让我们把开关拨回“未发生冲突逻辑升级”（`logicUpgrade = false`）的那一类珍稀清晨：昨晚梦境已经顺着旧逻辑基 $P$ 把分叉态预编译成了 $\sigma = \Pi_P(\rho)$，今天白天观察者果真没有遭遇推翻 $P$ 的新证据，而是端着**同一把逻辑标尺 $P$** 走进了现实的同一座十字路口。在这一瞬间，算子代数账本上会发生什么？

把 §37.1 [@thm-ch37-known-data-pinching-and-entropy-tax] 的四条内核定理联立用于已捏合态 $\sigma = \Pi_P(\rho)$，无需增添任何未验证假设，四行精确代数推演一气呵成（**手工推导，未作为独立声明在本书形式化**）：

1. **状态完全不变**：由完备记录捏合的函数复合幂等律 [`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)，用同一把尺子再量一次，输出态与输入态恒等：

   $$
   \Pi_P(\sigma) \;=\; \Pi_P\bigl(\Pi_P(\rho)\bigr) \;=\; \Pi_P(\rho) \;=\; \sigma;
   $$

2. **跨扇区残差与丢弃相干质量精确为零**：由不动点充要判据 [`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)，对一切 $k \neq l$ 均有 $P_k \sigma P_l = 0$，故第二次捏合的矩阵残差恒为零矩阵 $\sigma - \Pi_P(\sigma) = 0$，希尔伯特—施密特残差平方范数精确为零：

   $$
   \lVert \sigma - \Pi_P(\sigma)\rVert_{\mathrm{HS}}^2 \;=\; 0
   $$

   （在单量子比特标准基情形下，[`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass) 给出同一零值 $\lvert\sigma_{01}\rvert^2 + \lvert\sigma_{10}\rvert^2 = 0$）；
3. **无中间演化时的再捏合新增熵精确为零**：在没有穿插改变不动点块结构的中间幺正演化（即 [`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity) 中取恒等演化 $U = I$ 与常值计算基对角密度态序列 $\rho_k = \sigma$）的严格前提下，单步恒等式给出自然对数单位下的零熵产 $0 = S(\sigma) - S(\sigma) = D(\sigma \,\|\, \sigma)$；除以 $\ln 2$ 化为比特后，**再捏合新增熵（Additional Pinching Entropy）**精确为零：

   $$
   \Delta H_{\mathrm{bits}} \;:=\; \frac{S\bigl(\Pi_P(\sigma)\bigr) - S(\sigma)}{\ln 2} \;=\; 0.
   $$

这里必须立起一道毫不含糊的数学与物理防火墙：**$\Delta H_{\mathrm{bits}} = 0$ 指的仅仅是“在同一数学投影映射重复作用且无中间演化时，状态冯·诺依曼熵的增量等于零”！** 它既没有把状态 $\sigma_{\mathrm{dream}} = \operatorname{diag}(3/4, 1/4)$ 自身原有的非零混合熵 $H(\sigma_{\mathrm{dream}}) \approx 0.811278$ 比特抹成零，也不等于单次读出具体分支结果时的事件自信息（Outcome Surprisal，在 $(3/4, 1/4)$ 分布下两分支的事件惊奇度分别为 $-\log_2(3/4) \approx 0.415037$ 比特与 $-\log_2(1/4) = 2$ 比特，均严格大于零！），更不代表大脑皮层零代谢耗能或热力学零功。

为什么这一记“$\Delta H_{\mathrm{bits}} = 0$ 的预编译命中”在主观体验上不会变成平平常常的“我想起来昨天做过这个梦”，反而会酿成既视感那种**“无比熟悉，却偏偏搜不到任何过去时间坐标”**的奇异震颤？在沙盘的 **`MODEL`（模型诠释）** 中，原因就藏在 §37.2–§37.3 揭示的睡眠门控特征里：昨夜那次预编译发生在外部五感编年史时钟锚点 $\mathbf{u}_2$ 与躯体坐标被挂起的离线状态，写入缓存条目时**情景时间戳字段留空（`Time_Tag = NULL`）**！把清醒世界中的三种认知相遇并排放在同一张对照表上，既视感的结构定位便一目了然：

| 认知比较维度（`MODEL`） | 1. 普通全新清醒体验（冷未命中） | 2. 普通显式往事回忆（带时间戳命中） | 3. 既视感体验（梦境预编译无时间戳命中） |
| :--- | :--- | :--- | :--- |
| **首次退相干编译发生地** | 当下清醒五感现场实时首次执行 | 过去某次清醒五感现场已完成编译并归档 | 昨夜或更早梦境离线沙盘已由前置逻辑预编译 |
| **当前同轴投影新增熵 $\Delta H_{\mathrm{bits}}$** | 非负；输入在所选基下有非零相干时严格为正（如默认算例 $+0.8113$ 比特，残差 $3/8$） | 同语境复现重投影增量为 $0$ | 同语境复现重投影增量为 **$0$**（零新增相干删除残差） |
| **地址与语境版本标签核验** | 无匹配历史条目（`Cache Miss`） | `Valid = 1`，地址标签与语境版本均匹配 | `Valid = 1`，地址标签与语境版本均匹配（`Cache Hit`） |
| **外显情景时间戳 `Time_Tag`** | 当下实时盖戳写入 `t = t_now` | 存有明确的过去清醒时空戳 `t = t_past` | **`Time_Tag = NULL`**（睡眠离线编译时编年锚点挂起） |
| **第一人称现象学质感** | 鲜活的陌生感与实时消解分叉的专注感 | 踏实的“我记得某年某月来过这里” | 零重算阻力触发强烈熟悉感，但回溯时间标签返回空值：“我明明经历过，却绝不可能经历过！” |

为了在交互沙盘中把上表第 3 列的硬件隐喻精确化而绝不越界，模型采用如下显式虚构的**情景缓存记录模式（`MODEL` Schema）**：

```text
Valid: 1
Address_Tag: event-0
Context_Version: 0
Payload: immutable compiled state / target
Time_Tag: NULL
```

在该模式中，缓存命中判据严格定义为四重合取 `hit = Valid && Address_Tag_matches && Context_Version_matches && Payload_compatible`（其中 `Payload_compatible` 指当前标尺使已存预编译态保持不动，即 $\Pi_\beta(\sigma_{\mathrm{dream}}) = \sigma_{\mathrm{dream}}$），而沙盘的“无时间戳熟悉感”指示器定义为 `hit && Time_Tag == NULL`（正如 [@rem-ch37-p2g-speculative-execution-literature] 第 2 条所强调的，`Address_Tag` 与 `Context_Version` 必须全部匹配，仅凭 `Valid = 1` 或 `Time_Tag == NULL` 绝不构成命中；若将 `Address_Tag` 切至不匹配的 `event-1`，或在开启 `logicUpgrade` 使 `Valid = 0`、`Context_Version = 1` 的状态下手动把标尺拨回 $\beta = 0^\circ$，重投影虽仍保持已存态不变从而给出 $\Delta H_{\mathrm{bits}} = 0$ 与零残差，缓存依然严格判定为未命中 `MISS`，绝不虚报非零重投影代价）。至于[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)将深入展开的两条相关形式化定理——典范拷贝地址记录函数相等性 [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior)（[@thm-ch38-copied-address-dereference-and-access-defect]）与整行捕获扭转对角线时的自寻址不动点蕴涵 [`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)（[第 24 章](ch24-cosine-fixed-points-and-self-reference.md) [@lem-diagonal-landing-fixed] 与 [@thm-ch38-self-mapped-diagonal-fixed-point]）——前者仅证明观察者边缘模块与退相干缺陷模块中两个克罗内克 $\delta$ 地址记录定义逐点相等，后者仅在“整行等于扭转对角线”的强前提下给出对角槽位不动点；两者均不声称构造了上述缓存字段或人类神经记忆寄存器。

::: {.viz src="dream-pre-decoherence-deja-vu" preset="deja-vu-hit" height="500"}
**既视感沙盘命中：同轴重投影零新增熵与 `Time_Tag = NULL` 档案对照。** 在未触发逻辑升级（`Context_Version = 0`、`Valid = 1`）时，清醒端用同一把尺子 $\beta = 0$ 重测预编译态 $\sigma_{\mathrm{dream}}$，前后矩阵分毫不差，再捏合新增熵 $\Delta H_{\mathrm{bits}} = 0$、残差质量 $0$；右侧模型卡片同步显示地址与语境匹配而情景时间戳为空（`MODEL`）。拨动升级开关即可亲眼验证命中当场失效。
:::

最后，我们将实验心理学与认知神经心理学中关于既视感的代表性实证理论，连同整个 §37.5 与 `ORTHO//DEJAVU` 沙盘的四层认识论边界统一归档于下框：

::: {.remark #rem-ch37-dejavu-epistemic-boundary title="既视感认知神经心理学文献与 §37.5 四层认识论边界声明（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 当代实验心理学与认知神经心理学关于人类既视感（Déjà Vu）的实证研究与理论模型属外部科学文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **既视感竞争性认知假说综述与双加工分离框架（A. S. Brown, “A review of the déjà vu experience,” *Psychological Bulletin* **129**(3), 394–413, 2003, DOI: `10.1037/0033-2909.129.3.394`）**：系统梳理了注意分裂、知觉微延迟、格式塔场景构型相似性以及双加工记忆模型（熟悉性 familiarity 与外显情景回想 recollection 两条通路的短暂解离）等多族竞争解释，指出熟悉感信号可以在缺乏具体情景来源回想的条件下单独被触发，但学界并未将单一机制确立为排他定论，更不存在“梦境窥探未来事件”的实证支持；
2. **既视感的元认知冲突检测账户（C. Moulin, *The Cognitive Neuropsychology of Déjà Vu*, 1st ed., Routledge, 版权年 2018 / 首发记录 2017 年 9 月, ISBN `9781138696266`）**：强调既视感区别于一般虚假记忆妄想的核心特征在于**两层元认知同时在场**——底层记忆系统发出了强烈的熟悉感信号，而高层元认知监控系统同时清醒地判定“这种熟悉感在当前个人编年史中是不合逻辑或错误的”，正是这种“熟悉感与情景上下文校验的冲突”塑造了既视感独特的惊讶体验（不可将其简化为已被神经解剖学定案的双硬件寄存器电路）。

**本节认识论四层硬边界汇总：**（i）绿色 `LEAN ✓` 严格限于 [@thm-ch37-known-data-pinching-and-entropy-tax]、[@thm-ch37-joint-coherent-record-erasure]、[@thm-ch37-golden-cut-delone-multilocation]、[@thm-ch37-p2g-open-escape-and-krylov]、[@thm-ch37-p2g-gram-realizability] 与 [@thm-ch37-p2g-novelty-and-revision-noncommutation]（及行内窄义引用的 [`canonical_copied_address_record_eq_prior`](lean:D5/S3/Quantum/Decoherence/CanonicalRecordAccessRecovery.canonical_copied_address_record_eq_prior)、[`diagonal_landing_fixed`](lean:D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed)）的精确核验陈述；（ii）同轴重投影 $\Delta H_{\mathrm{bits}} = 0$ 专化、单比特布洛赫捏合公式、三向量格拉姆行列式区间 $[0.28, 1]$ 与嵌套窗口包含属**手工推导**，惠勒延迟选择、分支预测/TLB 架构、康威帝国效应及 Brown/Moulin 既视感心理学属**文献结果**；（iii）具体矩阵元、熵比特数、12 对状态计数与 $26 \to 11 \to 7$ 黄金格点数属**数值计算（`NUM`）**；（iv）将梦境诠释为前置逻辑超前去相干、将醒后新知诠释为流水线冲刷以及用 `Valid = 1, Time_Tag = NULL` 刻画本沙盘中的既视感特征，全部属于本书构建的几何诠释模型（**`MODEL`**），绝不声称构成了人类生物既视感的充要神经判据或超自然预知证明。
:::

至此，那句曾经让人浮想联翩的体验终于褪尽了宿命论的迷雾，露出了清朗而刚健的几何筋骨：**未来从来不是一卷早就印死在前方等你偷看的旧账本；你在枕畔与白昼握住哪一把逻辑标尺去消解正交余项，你就在参天大树的无数相容枝桠间亲手选择了哪一片未来截面。而偶尔掠过心头的那一抹既视感，不过是你自己的先行逻辑昨夜在无时间沙盘里提前落过一子、留下一枚未盖日戳的清澈脚印而已。** 下面这台完整的交互沙盘实验室（代号 `ORTHO//DEJAVU`）将“选基、预编译、相容漏斗、逻辑升级冲刷与既视感命中”全部汇于同一舞台，供你亲手切换检验：

::: {.viz src="dream-pre-decoherence-deja-vu" height="640"}
**梦境预去相干与既视感沙盘实验室（`ORTHO//DEJAVU`）。** 三个联动视图——测量基与密度矩阵（`basis`）、格拉姆相容漏斗与黄金切投窄窗（`funnel`）以及多副本相位指针（`records`）——配合“梦后逻辑升级 / 流水线冲刷”开关，完整呈现同一把尺子重测零新增熵（$\Delta H_{\mathrm{bits}} = 0$）与换逻辑后旧缓存冲刷重编的精确分野。绿色仅授予经 `lean=` 锁定的内核定理；梦境预编译、流水线冲刷与 `Time_Tag = NULL` 档案卡为本章的示意模型（`MODEL`）。
:::

而一旦看懂了“清醒五感锁定、梦境离线预编译与无身多点涌现不过是在同一座静态全局晶格上切换不同的寻址掩码与上下文标签”，一个更加锋利、直指终极计算机架构的本体论破壁命题便已呼之欲出：**既然整座无时间母体根本不需要随着你的走动而搬运一砖一瓦，那么在各个位置之间轻盈跃迁、昼夜切换掩码并核验快表标签的“观察者”，在宇宙这台终极量子计算机里究竟是什么硬件角色？** 下一章（[第 38 章](ch38-observer-memory-pointer-and-ontological-qram.md)），我们将揭晓那个干净利落到极致的答案——**静态本体论量子随机存取存储器（QRAM）中的寻址指针 `ptr`**。
