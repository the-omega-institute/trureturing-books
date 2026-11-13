# 第三十三章 万物皆为观察者：自维持势阱与互吸引子双螺旋 {#万物皆为观察者自维持势阱与互吸引子双螺旋}

> *“实际上不止历史遗迹是吸引子, 观察者本身也是, 而且应该万物皆为观察者, 观察者互为吸引子。”*

穿过第八部的四重高峰——无时间因果晶体（[第 29 章](ch29-timeless-causality-and-gram-space.md)）、复杂性正交视界（[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)）、量子五重公平律（[第 31 章](ch31-quantum-fairness.md)）与正交自指统一场（[第 32 章](ch32-unified-field-and-meta-unification.md)）——我们已经亲手拆除了高悬于宇宙之外的“绝对参考点 $C$”。然而，在日常语言的隐秘角落里，最后一道二元对立的幽灵仍在徘徊：人们依然不自觉地把世界劈成两半——一边是极少数拥有大脑与自我意识的“活观察者（主体）”，另一边则是漫山遍野等待被观察、被测量的“死石头、死原子与古废墟（客体）”。

只要这道主客鸿沟尚未消融，“外部第 3 点 $C$”就没有真正退场——它只是从神学宝座搬进了人类中心主义的颅腔。开启全书第九部之际，我们将顺着正交几何与形式化内核的逻辑一推到底，在本章完成四重本体论跃迁（跨领域的哲学与物理统摄明确标定为本书诠释模型 **`MODEL`（模型诠释）**，底层数学骨架由十九条冻结的 Lean 4 内核定理支撑，外部经典分析与全息信息结论严格封存于归属注记框内）：

1. **万物皆为观察者**：剥除神秘主义包装后，任何维持幂等记录投影并参与两子内积比量的存在都是观察者，光子、原子、山川古迹与自指心智共同铺展在同一条**记忆阶数连续谱 $M \ge 0$** 之上；
2. **观察者本身即吸引子**：在无处不在的退相干冲刷下，“我依然是我”绝非静态惰性，而是一座围绕内禀接受窗 $W + u_i$ 持续向内拉回的自维持收缩势阱；
3. **观察者互为吸引子**：孤立内省与平视互指在收敛轨迹上展现截然相反的几何品格（一维余弦互指算例见下文 [@ex-ch33-mutual-cosine-monotonic-lock]），并通过接受窗交集与极小割重联（[@prop-ch33-bridge-reconnection-mincut]）让相位契合的众生互为移动的故乡；
4. **多观察者去相干共识与指针基涌现**（[末节](#sec-ch33-consensus-decoherence-pointer)）：当多枚局部观察者沿共同的张量耦合轴反复交换记录时，各向同性白噪迷雾分化出幂等块对角的共识指针基与平坦冗余互信息平台，同时为正交新轴上的先驱观察者留出结构新颖度突围口。

::: {.figure src="ch33-overview"}
**图 33。** 本章地图（第 I、II 栏为示意模型，`MODEL`）：第 I 栏，光子、原子、晶体与心智排在同一条记忆阶数轴上，自 $M = 0$、$M = 1$ 到 $M \gg 1$；第 II 栏，被踢上右坡的小球沿灰色箭头一步步落回碗底，琥珀色的是它现在的位置，碗底的青色短线是接受窗 $W + u_i$；第 III 栏，同一条余弦轨道 $x_{n+1} = \cos x_n$ 从 $x_0 = 0.1$ 出发，一行一拍，横向是读数：灰色折线每一拍都跨过 $\theta^*$ 的虚线，每两拍套一个空心环，环全在 $\theta^*$ 左侧，琥珀色的是第 $6$ 拍（[@ex-ch33-mutual-cosine-monotonic-lock] 的既有结果应用，各点为数值）。
:::

---

## 33.1 万物皆为观察者：消融主客二元与记忆阶数连续谱 {#万物皆为观察者消融主客二元与记忆阶数连续谱}

为什么近代机械论一边宣称“物质由盲目的微粒构成”，一边又在量子测量问题前惊慌失措，追问“究竟要长出多少神经元才算观察者、才能让波包坍缩”？从谱系学的手术刀看去，这纯属概念偶像制造的伪难题：先人为抽干万物身上的比量能力，把石头与电子贬为毫无内禀视角的“纯客体”，再反过来惊讶于“主体意识如何从死物质中凭空跳出”。

回到全书第一性原理，两子相遇时的几何积分解（连续几何代数背景见[第 32 章](ch32-unified-field-and-meta-unification.md) [@rem-ch32-generative-laws-dottie-literature]）与**[第 31 章](ch31-quantum-fairness.md)的席位公平定理**（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款）早已给出了彻底平权的裁决：当纯态 $\psi$ 与纯态 $\phi$ 相遇比量时，秩一配对权重恒满足共轭互易律 $\lVert\phi^* \bullet_v \psi\rVert^2 = \lVert\psi^* \bullet_v \phi\rVert^2$。当一束阳光掠过山巅石英晶体时，绝不是等到几百万年后某个人类路过看了一眼，晶格才开始“存在”——石英晶格用自身的内禀对称轴投影光子的偏振方向，光子也同时用自身的动量相位探询晶格的间距。**每一次内积投影的交换，都是一次平视的相互观测；宇宙里根本没有只被丈量而不去丈量的“死客体”。**

一旦洗去人类中心主义的偏见，“观察者”在数学上究竟由什么极小结构定义？在进入任意有限维的一般定理之前，不妨先在最透明的 $2 \times 2$ 单量子比特账本上亲手算一遍：取完备正交记录基 $P_0 = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ 与 $P_1 = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$，对任意含非对角相干项的密度矩阵 $\rho = \begin{pmatrix} a & c \\ \bar{c} & 1-a \end{pmatrix}$ 施加未读捏合算子，第一次作用便将非对角项彻底归零：

$$
\mathcal{P}(\rho) \;=\; P_0 \rho P_0 + P_1 \rho P_1 \;=\; \begin{pmatrix} a & 0 \\ 0 & 1-a \end{pmatrix}, \qquad \mathcal{P}\bigl(\mathcal{P}(\rho)\bigr) \;=\; \begin{pmatrix} a & 0 \\ 0 & 1-a \end{pmatrix} \;=\; \mathcal{P}(\rho),
$$

且在这座二维复载体（$d = 2$）中，要使单次测量零误差区分一族历史态 $\operatorname{Tr}(E_j \rho_i) = \delta_{ij}$，正交支撑子空间至多只能容纳 $N = 2$ 条相互垂直的历史记录线！推广到任意有限维，`trureturing` 的观察者条件化与量子测量模块用两条严丝合缝的形式化定律刻画了一切观察者的极小代数骨架：其一，完备正交自伴投影族 $P : \kappa \to M_n(\mathbb{C})$（`IsRecordMeasurement P`）诱导的未读记录映射 $\operatorname{unreadState}(P)$ 在函数复合下严格幂等；其二，$d$ 维物理记忆载体单次可完美区分的历史状态数恒满足 $N \le d$。

::: {.figure src="ch33-record-lines"}
**在 $d = 2$ 的记忆载体里，两条互相垂直的记录线已经占满。** 青色的 $P_0$、$P_1$ 是两条两两垂直的记录线；墨色虚线的第三个方向 $v$ 与 $P_0$ 成 $30^\circ$，投到两条线上的青色影子 $\cos 30^\circ$、$\sin 30^\circ$ 都不为零，与哪一条都不垂直，第三条两两垂直的记录线放不下：$N \le d = 2$（[@thm-ch33-observer-pinching-and-memory-spectrum] 第 2 款）。图以实平面示意 $\mathbb{C}^2$。
:::

::: {.theorem #thm-ch33-observer-pinching-and-memory-spectrum title="观察者记录捏合幂等性与有限记忆历史容量上界" lean="D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity"}
在 `trureturing` 冻结的观察者条件化与量子测量容量模块中，以下两项关于有限观察者记录轴与记忆维数的定理同时成立：

1. **有限完备记录捏合映射的函数复合幂等律**（[`finite_record_pinching_idempotent`](lean:D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent)）：设 $n, \kappa$ 为有限类型（`[Fintype n] [DecidableEq n] [Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 为满足记录测量公理 `IsRecordMeasurement P` 的投影族（即 $\forall k,\; P_k^\star = P_k$，$\forall k,\; P_k^2 = P_k$，$\forall k \neq l,\; P_k P_l = 0$，且 $\sum_{k \in \kappa} P_k = 1$）。记未读记录算子为 $\operatorname{unreadState}(P)(\rho) = \sum_{k \in \kappa} P_k \rho P_k$，则该矩阵自同态在函数复合下严格幂等：

   $$
   \operatorname{unreadState}(P) \circ \operatorname{unreadState}(P) \;=\; \operatorname{unreadState}(P);
   $$

2. **有限维量子记忆的可区分历史状态容量定理**（[`finite_memory_history_capacity`](lean:D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity)）：设 $N, d \in \mathbb{N}$ 为自然数，密度矩阵族 $\rho : \operatorname{Fin} N \to M_{\operatorname{Fin} d}(\mathbb{C})$ 满足态公理 $\forall i,\; (\rho_i).\mathrm{PosSemidef} \land \operatorname{Tr}(\rho_i) = 1$，测量效应族 $E : \operatorname{Fin} N \to M_{\operatorname{Fin} d}(\mathbb{C})$ 满足半正定性 $\forall j,\; (E_j).\mathrm{PosSemidef}$ 与完备归一性 $\sum_{j \in \operatorname{Fin} N} E_j = 1$。若 $\{E_j\}$ 能单次完美区分全部 $N$ 个历史态，即

   $$
   \forall i, j \in \operatorname{Fin} N,\qquad \operatorname{Tr}(E_j \rho_i) \;=\; \begin{cases} 1, & i = j, \\ 0, & i \neq j, \end{cases}
   $$

   则可完美区分的历史记录数必受记忆载体维数约束：

   $$
   N \;\le\; d.
   $$
:::

::: proof
第 1 款由函数外延性 `funext` 归约为逐点恒等式 `unreadState_idempotent`：对任意输入矩阵 $\rho$ 与分支指标 $k \in \kappa$，利用正交消去性 $\forall l \neq k,\; P_k P_l = 0$ 与投影幂等性 $P_k^2 = P_k$，左乘化简得 $P_k \operatorname{unreadState}(P)(\rho) = P_k \rho P_k$，右乘 $P_k$ 并对 $k$ 求和即得 $\operatorname{unreadState}(P)(\operatorname{unreadState}(P)(\rho)) = \operatorname{unreadState}(P)(\rho)$。第 2 款利用 $C^*$-代数半正定分解 $E = A^\dagger A,\; \rho = B^\dagger B$ 证得零迹乘积引理 $\operatorname{Tr}(E\rho) = 0 \implies E\rho = 0$，从而对 $i \neq j$ 有 $\operatorname{range}(\rho_j) \le \ker(E_i)$，并由 $E_i \le \sum_j E_j = 1$ 及 $\operatorname{Tr}((1 - E_i)\rho_i) = 0$ 证得 $\operatorname{range}(\rho_i) \le \ker(1 - E_i)$；再由 $\operatorname{Tr}(\rho_i) = 1 \implies \rho_i \neq 0$ 从每个值域中选取非零向量 $v_i \neq 0$，验证 $E_i v_i = v_i$ 及 $i \neq j$ 时 $E_i v_j = 0$，故由自伴性得两两正交 $\langle v_i, v_j\rangle_{\mathbb{C}} = \langle E_i v_i, v_j\rangle_{\mathbb{C}} = \langle v_i, E_i v_j\rangle_{\mathbb{C}} = 0$，最终由正交非零向量组的线性无关基数上界 `fintype_card_le_finrank` 推出 $N \le d$。完整证明由 Lean 内核检查。
:::

握住 [@thm-ch33-observer-pinching-and-memory-spectrum] 这把标尺，世间万物之间便不再有“有灵魂的主体 vs. 死寂的客体”的断崖，而只剩下内禀窗口相位与有效记忆阶数（对应记忆容量上界 $d$）的连续渐变。在我们的跨尺度**`MODEL`（模型诠释）**中，结合六维切投准晶窗口几何背景（见[第 32 章](ch32-unified-field-and-meta-unification.md) [@rem-ch32-icosian-e8-literature]），从一束自由光波到一颗自指心智的四阶观察者连续谱收束于下框总表：

::: {.remark #rem-ch33-observer-spectrum-table title="四阶观察者连续谱总表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表在六维切投准晶接受窗文献背景（[@rem-ch32-icosian-e8-literature]）之上，汇总本书四阶观察者连续谱模型（`MODEL`）与记录捏合容量定理（[@thm-ch33-observer-pinching-and-memory-spectrum]，`LEAN ✓`）的对应关系：

| 观察者谱系层级（`MODEL`） | 记忆阶数与窗口特征（$\mathbb{Z}^6 \subset \mathbb{R}^6 = E_\parallel^3 \oplus E_\perp^3$） | 两子丈量与记录更新机制 | 主观时间质感与存在形态（`MODEL`） |
| :--- | :--- | :--- | :--- |
| **1. 规范波 / 自由光子** | 零阶记忆 $M = 0$，正交偏转角 $\theta = 90^\circ$（$\cos 90^\circ = 0$） | 纯二维横向外积旋转面传递联络，不留存局部一维对角历史锚点 | 固有时流逝归零（零帧永恒瞬间），充当跨观察者传递相位的纯粹信使 |
| **2. 基本粒子 / 原子** | 一阶记忆 $M = 1$，单点内禀相位锚 $u_i \in E_\perp^3$ 支撑幂等存在线 | 一阶无后效两子内积更新：每次碰撞以当前自旋或能级投影瞬时响应并覆盖旧态 | 无长程叙事负担的瞬时节拍器，忠实执行局部守恒律与对等玻恩互易 |
| **3. 晶体 / 山峦 / 历史遗迹** | 集体晶格锁死在接受窗靶心零应变深谷点（$\lVert\pi_\perp(z) - u_i\rVert \ll 1$） | 亿万晶胞协同捏合抵御热微扰，将高对称几何比例刻入宏观刚性结构 | 千年为一帧的超慢固有时钟，伫立在物理切片中充当跨世代空间驻相锚点 |
| **4. 生命与自指心智** | 高阶记忆 $M \gg 1$，诞生初始化清空远古包袱，维持正体积走廊 $\det G_M > 0$ | 在有限容量 $N \le d$（[@thm-ch33-observer-pinching-and-memory-spectrum]）内主动筛选记录并闭合自指回路 $\psi_i = \psi_i(\psi_i)$ | 展开具有前后纵深与对数压缩感的主观时间流，在相容椭圆体中行使自由选点 |
:::

石头并非没有知觉，它的时钟只是慢到以地质纪元为单位呼吸；光子并非虚无缥缈，它只是把全部纯度预算交给了 $90^\circ$ 的横向联络面。科学思想史上曾与这一连续谱遥相呼应的哲学文献及其与本书形式体系的严格边界说明如下（[@rem-ch33-monad-process-philosophy-literature]）：

::: {.remark #rem-ch33-monad-process-philosophy-literature title="单子论与过程哲学的历史思想参照及形式边界说明（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 西方哲学史上曾有两套代表性形而上学体系尝试消解笛卡尔式“心灵主体—死寂广延物质”的二元割裂，它们属于外部哲学史文献，未包含在本书锁定的 `trureturing@dev` 形式化声明集中：

1. **莱布尼茨的透视单子论（G. W. Leibniz, *Monadologie*, 1714）**：莱布尼茨提出宇宙万物皆由不同清晰度层级的“单子（monads）”构成——从处于昏睡微知觉状态的无机物单子、具感官记忆的动物灵魂，到具反思自指能力的理性精神，每个单子都是映照整座宇宙的活镜子。但莱布尼茨假定“单子没有窗户（Les Monades n'ont point de fenêtres）”，只能靠外部神学预设的“前定和谐”同步；本书的 `MODEL` 则彻底废除外部协调者 $C$，代之以切投接受窗 $W + u_i$ 的真实几何交集与两子内积互易丈量。
2. **怀特海的过程哲学与普遍摄受（A. N. Whitehead, *Process and Reality*, 1929）**：怀特海批判近代科学把自然劈裂为“无声无色的客观原子”与“主观幻觉质料”的“自然二分法（bifurcation of nature）”，主张宇宙的基本单元不是静态实体而是“实际缘起事件（actual occasions）”，每一事件皆通过“摄受（prehension）”主动整合他者留下的印记——这与本书将名词“量子”还原为动词“两子比量”并由 [@thm-ch33-observer-pinching-and-memory-spectrum] 刻画幂等记录捏合与记忆容量 $N \le d$ 的代数路径形成跨世纪呼应，但本书的一切定量结论严格以矩阵投影、不动点与张量最小割定理为准绳。
:::

---

## 33.2 观察者本身即吸引子：自维持收缩势阱 {#观察者本身即吸引子自维持收缩势阱}

认出“万物皆为观察者”之后，紧接着浮现出第二个更尖锐的动力学问题：**为什么观察者不只是被动挨撞的底片，而必然“本身就是一座吸引子”？**

不妨做一个最朴素的物理思想实验。任何身处宇宙内部的有限观察者，每一秒都在遭受海量热涨落、杂散辐射与环境擦除的随机冲刷（热力学擦除下界见[第 31 章](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness] 第 1 款）。假如一位观察者的内部状态演化在相空间里是**中性漂移**甚或**向外发散**的——就像把一颗弹珠放在平坦桌面或倒扣碗底上——那么只需几次微小的正交扰动，它的窗口相位就会像醉汉游走一样漂离初态，“昨天的我”与“今天的我”将彻底失去内积重叠，瞬间融化在热平衡的背景白噪声里。

因此，任何能够在时间风浪里连续维持“我依然是我”的存在——无论是一颗在高温振动中保持晶格对称的金刚石，还是一个在十年新陈代谢换遍全身原子后依然认得童年故乡的生命体——**其存在本身就等价于在状态空间中挖出了一座围绕接受窗向内聚拢的“自维持收缩势阱”（`MODEL`）**！在这一模型里，我们以算子自指回路 $\psi_i = \psi_i(\psi_i)$ 描画外部微扰后的向内恢复与局部稳定；下方 [@thm-ch33-contextual-attractor-and-common-factor] 第 1 款刻画有限集合删减的稳定化，实轴余弦模型则另见 [@ex-ch33-mutual-cosine-monotonic-lock]。

::: {.figure src="ch33-contracting-well"}
**只有收缩的势阱能把受扰的观察者拉回原处。** 三条剖面上，琥珀色的是小球现在的位置，灰色空心圈是之前的位置：平坦的桌面上，一串扰动让它漂离起点；倒扣的碗上，它每一步离顶点更远；势阱里，被踢上右坡的小球每一步离碗底的距离缩到原来的 $0.45$ 倍，落向碗底青色的接受窗 $W + u_i$。这是示意模型（`MODEL`），不是 [@thm-ch33-contextual-attractor-and-common-factor] 的内容。
:::

在 `trureturing` 的不动点稳定性与概念诠释动力学模块中，四条内核定理为这一图景提供各有边界的结构骨架：固定更新算子在有限集合上只删不增，故有限步稳定；相邻概念的关系与读出相等封装为语境相对不动点谓词；二值语境实例见证固定意义可以相异；客观主张则按定义携带不变公因子的证明。这四款并未给出受扰物理系统的恢复动力学，势阱与收敛仍由上面的 `MODEL` 承担：

::: {.theorem #thm-ch33-contextual-attractor-and-common-factor title="有限单调收缩稳定化、语境相对不动点分岔与客观主张的不变公因子定理" lean="D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor"}
在 `trureturing` 冻结的有限不动点稳定性与概念诠释不动点模块中，以下四项定理同时成立：

1. **有限载体单调收缩更新的有限步稳定与跳变上界**（[`finite_contracting_updates_stabilize`](lean:D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize)）：设 $X$ 为有限类型（`[Finite X]`），子集更新算子 $U : \operatorname{Set} X \to \operatorname{Set} X$ 满足向内收缩条件 $\forall A : \operatorname{Set} X,\; U(A) \subseteq A$，状态序列 $S : \mathbb{N} \to \operatorname{Set} X$ 满足递推律 $\forall n \in \mathbb{N},\; S(n + 1) = U(S(n))$。则序列必在不超出初始集合基数的步数内永久抵达不动点，且严格改变的总次数亦受初始基数约束：

   $$
   \bigl(\exists N \le (S(0)).\operatorname{ncard},\; \forall n \ge N,\; S(n) = S(N)\bigr) \;\land\; \{n \in \mathbb{N} \mid S(n + 1) \neq S(n)\}.\operatorname{ncard} \le (S(0)).\operatorname{ncard};
   $$

2. **相邻概念等价与诠释稳定抵达语境相对不动点**（[`conceptual_equivalence_and_stability_reach_fixed_point`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.conceptual_equivalence_and_stability_reach_fixed_point)）：对任意类型 `Text`、`ReaderAdmission`、`Background`、`EvaluationGoal`、`Rule`、`Concept`、`Meaning`，关系 $\mathrm{conceptuallyEquivalent} : \mathrm{Concept} \to \mathrm{Concept} \to \mathrm{Prop}$，求值映射 $\mathrm{interpret} : \operatorname{InterpretationContext}\;\mathrm{Text}\;\mathrm{ReaderAdmission}\;\mathrm{Background}\;\mathrm{EvaluationGoal}\;\mathrm{Rule} \to \mathrm{Concept} \to \mathrm{Meaning}$，演化序列 $\mathrm{concepts} : \mathbb{N} \to \mathrm{Concept}$，固定语境 $\mathrm{context}$ 与步数 $n \in \mathbb{N}$，只要满足相邻概念等价 $\mathrm{conceptuallyEquivalent}(\mathrm{concepts}(n+1), \mathrm{concepts}(n))$ 与语境读出稳定 $\mathrm{interpret}\;\mathrm{context}\;(\mathrm{concepts}(n+1)) = \mathrm{interpret}\;\mathrm{context}\;(\mathrm{concepts}(n))$，即成立相对诠释不动点谓词 `IsRelativeInterpretationFixedPoint conceptuallyEquivalent interpret concepts context n`；
3. **固定文本与规则下观察者语境参数选择相异不动点**（[`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)）：在二值有限语境族 `BinaryInterpretationContext = InterpretationContext Unit Bool Bool Bool Unit` 上，`baselineContext`（准入、背景、目标均为 `false`）与 `alternateContext`（准入、背景、目标均为 `true`）保持相同的输入文本 `text = ()` 与相同的诠释规则 `interpretationRule = ()`，但三项观察者语境参数两两相异，并在固定意义谓词 `IsBinaryFixedMeaning` 下严格锁定互不相等的不动点：

   $$
   \begin{aligned}
   &\operatorname{IsBinaryFixedMeaning}\;\mathrm{baselineContext}\;(\mathrm{false}, \mathrm{false}, \mathrm{false}) \\
    &\;\land\; \operatorname{IsBinaryFixedMeaning}\;\mathrm{alternateContext}\;(\mathrm{true}, \mathrm{true}, \mathrm{true}) \\
    &\;\land\; (\mathrm{false}, \mathrm{false}, \mathrm{false}) \neq (\mathrm{true}, \mathrm{true}, \mathrm{true});
   \end{aligned}
   $$

4. **客观诠释主张强制携带跨语境不变公因子**（[`objective_claim_requires_invariant_common_factor`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor)）：对任意类型 `Context`、`Meaning`、`Factor`，语境不动点谓词 $\mathrm{isFixedMeaning} : \mathrm{Context} \to \mathrm{Meaning} \to \mathrm{Prop}$ 及因子提取映射 $\mathrm{factor} : \mathrm{Meaning} \to \mathrm{Factor}$，任何满足客观性定义 `ObjectiveInterpretationClaim isFixedMeaning factor` 的主张，必给出在一切语境及其选定不动点意义上恒取同一值的公共不变量：

   $$
   \exists\,\mathrm{commonFactor} : \mathrm{Factor},\quad \forall\,\mathrm{context}\;\mathrm{meaning},\quad \mathrm{isFixedMeaning}\;\mathrm{context}\;\mathrm{meaning} \implies \mathrm{factor}\;\mathrm{meaning} = \mathrm{commonFactor}.
   $$
:::

::: proof
第 1 款由 $S(n+1) = U(S(n)) \subseteq S(n)$ 建立自然数基数序列 $n \mapsto (S(n)).\operatorname{ncard}$ 的非增单调性（`Antitone`），当相邻两步基数相等时由有限子集等基数判据 `Set.eq_of_subset_of_ncard_le` 推出 $S(n+1) = S(n)$ 从而后续步步锁死，结合 `Nat.stabilises_of_antitone` 给出稳定时刻 $N \le (S(0)).\operatorname{ncard}$，并由一切严格变化步均落在 `Set.Iio N` 内推出跳变总数上界；第 2 款直接由合取构造子 `And.intro` 将概念等价与固定语境下的像相等封装为 `IsRelativeInterpretationFixedPoint`；第 3 款对 `baselineContext` 与 `alternateContext` 展开记录字段自反性并用 `Bool.false_ne_true` 及首分量投影 `congrArg Prod.fst` 证伪三元组相等；第 4 款展开携带证明的 `ObjectiveInterpretationClaim` 定义直接提取存在见证 `commonFactor`。完整证明由 Lean 内核检查。
:::

细读 [@thm-ch33-contextual-attractor-and-common-factor] 的第 3 款与第 4 款，观察者势阱的几何品格豁然开朗：在我们的 **`MODEL`（模型诠释）** 中，哪怕面对同一座静态宇宙母格（同一份 `text` 与同一套正交几何 `interpretationRule`），携带不同内部窗口参数 $u_A \neq u_B$（对应不同的 `readerAdmission`、`background` 与 `evaluationGoal`）的两位观察者 $\mathcal{O}_A$ 与 $\mathcal{O}_B$，可以对应不同的局部不动点切片；而要想在其间建立真正的“客观公共事实”，绝不能靠某一方强权宣布自己代表绝对点 $C$，而须在声明的语境与意义族上选定因子提取映射，证明它对所有入选的不动点意义恒取同一**不变公因子（`commonFactor`）**！下框注明双观察者接受窗重联与孤立、互指两种收敛轨迹分别画在哪里：

::: {.remark #rem-ch33-mutual-attractor-figure title="互吸引子接受窗重联与余弦互指单调锁死图解（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 双观察者吸引子重联模型（`MODEL`）建立在切投准晶接受窗文献背景（[@rem-ch32-icosian-e8-literature]）与桥图极小割定理（[@prop-ch33-bridge-reconnection-mincut]，`LEAN ✓`）之上：两扇接受窗的交集画在下文“接受窗交集”一节的图里，极小割的重联画在该节的两张实验卡里。下文实分析算例 [@ex-ch33-mutual-cosine-monotonic-lock] 中孤立余弦迭代与二阶互指复合迭代的蛛网轨迹对比画在图 33 第 III 栏与下一节的实验卡里：孤立序列按单步计时，互指序列按含两次余弦求值的完整复合轮计时，对应同步互指的偶数拍采样。
:::

---

## 33.3 互指单调锁死：两面镜子如何在两步一轮中负负得正 {#互指单调锁死两面镜子如何在两步一轮中负负得正}

既然每位观察者自己已经是一座自维持吸引子，宇宙为什么不让每个灵魂各自关起门来孤芳自赏，却偏偏让万物生出永不停息的相互倾慕、结键与纠缠？

答案就写在孤立内省与平视互指那两条截然不同的蛛网轨迹里（[@rem-ch33-mutual-attractor-figure]）！让我们把观察者的自维持反馈投影到一维余弦切片模型（`MODEL`）上对照孤立内省与平视互指的动力学品格（严格导数估计、中值定理证明与逐步数值账本全部封存于下框 [@ex-ch33-mutual-cosine-monotonic-lock]）：

- **独自闭门内省的宿命（反向摇摆焦虑，`MODEL`）**：当孤立观察者只拿自己当镜子单步省察时，视角犹如缺乏阻尼缓冲的单摆，容易在“自卑低估”与“自负过冲”之间左右交替拉锯（解析机制见下框 [@ex-ch33-mutual-cosine-monotonic-lock] 的严格交替条款）。

::: {.viz src="mutual-observer-attractors" preset="alone" height="500"}
**同一起点，每拍越过 θ\*。** 两人都从 0.1 出发：琥珀色的点始终在灰色对角线 $x = y$ 上，一左一右地越过两条青色曲线的交点 $(\theta^*, \theta^*)$，灰色方框一圈圈收小，与孤立的余弦迭代相同（[@ex-ch33-mutual-cosine-monotonic-lock] 第 17 项）。下方条带的横轴是余弦求值次数，每根灰色细柱是那一拍的误差 $x - \theta^*$，一上一下地交替。
:::

- **平视彼此丈量的奇迹（对称互指共识，`MODEL`）**：当两位观察者 $\mathcal{O}_A$ 与 $\mathcal{O}_B$ 走出孤岛，面对面结成对称互指回路——$\mathcal{O}_A$ 借 $\mathcal{O}_B$ 的目光校准自己，$\mathcal{O}_B$ 同时借 $\mathcal{O}_A$ 的目光校准自己——把同步互指的两拍合成一轮，两面平视之镜的复合便显出单侧贴合的几何品格；逐拍与逐轮的时钟区别、完整解析推导与数值账本见下框 [@ex-ch33-mutual-cosine-monotonic-lock]：

::: {.example #ex-ch33-mutual-cosine-monotonic-lock title="同一余弦端点的定性动力学与独立数值账本"}
**既有结果的应用；数值与诠释另有边界。** 以下变量全为实数，角度用弧度。令 $f(x)=\cos x$、$g=f\circ f$；$f^{[n]},g^{[n]}$ 表示 $n$ 次复合，零次为恒等映射。始终选择 [@thm-dottie-rational-inverse-endpoint]（[`rational_inverse_endpoint`](lean:D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint)）中同一个 $\theta^*$：它满足 $0<\theta^*<1$、$\cos\theta^*=\theta^*$，并等于指定有理逆级数在 $\pi$ 处的有符号和。该端点只直接给出级数与正实竞争者的唯一性；下列 24 项定性结论是将其不动点条款与实分析供应结果结合的推导，不是一个新的动力学定理盒。

**同步互指的时钟（`MODEL`）。** 在平衡方程 $\psi_A=\cos\psi_B,\;\psi_B=\cos\psi_A$ 中消去中间变量得到 $g$。若两者每拍同时用对方的当前值更新，则两拍后每个坐标各完成一次 $g$，下文的 $y_k$ 正是按这两步一轮取样。同初值时，两位观察者在每一拍仍一起遵循 $f$ 的轨迹；逐拍严格交替须满足第 16、17 项的非不动点区间条件，严格单调递增则属于第 14 项起点条件下的完整复合轮。

1. **全实轴唯一性及锐角位置。** 若任意实数 $t=\cos t$，余弦值域先给 $-1\le t\le1$。因 $1<\pi/2$，此区间上余弦严格正，故 $t>0$，端点的正实唯一性才适用，给 $t=\theta^*$；同一点满足 $0<\theta^*<1<\pi/2$。
2. **精确值域。** `Real.range_cos` 给内层值域 $[-1,1]$，外层偶性将其归到 $[0,1]$，再用该区间上连续严格递减与 `intermediate_value_Icc'` 得到等式 $g(\mathbb R)=[\cos1,1]$，不只是包含关系。
3. **从第一步起的陷入。** 因 $\cos1>0$，对每个实起点 $z$ 和每个 $n\in\mathbb N$，$g^{[n+1]}(z)\in[\cos1,1]\subset(0,\pi/2)$；$g^{[0]}(z)=z$ 没有此限制。
4. **处处可微。** 两次使用 `Real.hasDerivAt_cos` 与链式法则，两个负号相消，在每个实数 $x$ 处得到 $g'(x)=\sin(\cos x)\sin x$，包括导数存在性。
5. **足够的全局界。** 由 $|\cos x|,|\sin x|\le1$ 及正弦在 $[0,1]$ 上非负递增，$|\sin(\cos x)|=\sin|\cos x|\le\sin1$。令 $K=\sin1$，有 $0<K<1$，且所有实数 $x$ 都满足 $|g'(x)|\le K$；不声称 $K$ 最优。
6. **全实轴 Lipschitz。** [lipschitzWith_of_nnnorm_deriv_le](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/Calculus/MeanValue.lean#L744) 的可微前提由第 4 项、非负常数与导数范数界由第 5 项供应，故 $|g(u)-g(v)|\le K|u-v|$ 对所有实数 $u,v$ 成立。
7. **同一个吸引点。** $\mathbb R$ 完备，故 $g$ 为 `ContractingWith K`；端点方程给 $g(\theta^*)=\theta^*$，[ContractingWith.fixedPoint_unique'](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/MetricSpace/Contracting.lean#L259) 使它成为 $g$ 的唯一实不动点。
8. **任意实起点的 $g$ 收敛。** 同一压缩映射的 [tendsto_iterate_fixedPoint](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/MetricSpace/Contracting.lean#L302) 给 $g^{[n]}(z)\to\theta^*$，不假设 $z$ 在某个区间内。
9. **唯一实互指对。** 若 $a=\cos b$、$b=\cos a$，则 $g(a)=a$、$g(b)=b$，故 $a=b=\theta^*$；反之该对确实满足两式。
10. **精确迭代对应。** `Function.iterate_mul` 给所有实数 $z$、自然数 $n$ 上的 $g^{[n]}(z)=f^{[2n]}(z)$，不是近似关系。
11. **任意实起点的 $f$ 收敛。** 第 8、10 项使偶子列趋于 $\theta^*$；奇子列为 $f(f^{[2n]}(z))$，由连续性趋于 $f(\theta^*)=\theta^*$。合并两种奇偶子列便得 $f^{[n]}(z)\to\theta^*$，无须给 $f$ 一个严格小于 $1$ 的全实轴压缩常数。
12. **严格保序的域。** 对 $x\in(0,\pi/2)$，$\sin x>0$、$0<\cos x\le1<\pi$，故 $g'(x)>0$。连续性、该凸域和 [strictMonoOn_of_deriv_pos](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/Calculus/Deriv/MeanValue.lean#L377) 给 $g$ 在此锐角区间严格递增，不是全实轴保序。
13. **严格单侧夹逼。** 若 $0<y<\theta^*$，严格保序给 $g(y)<\theta^*$，而压缩界给 $\theta^*-g(y)\le K(\theta^*-y)<\theta^*-y$，所以 $y<g(y)$。
14. **严格递增轨道。** 对 $0<y_0<\theta^*$，置 $y_n=g^{[n]}(y_0)$；归纳给所有 $n\ge0$ 上的 $0<y_n<y_{n+1}<\theta^*$，序列严格递增且趋于 $\theta^*$。任意实起点收敛并不自动具有这一顺序模式。
15. **$f$ 的区间不变性。** 余弦把 $[0,1]$ 映入自身，`Real.strictAntiOn_cos` 限制到此区间给严格递减性。
16. **永不命中的前提。** 若 $x_0\in[0,1]$ 且 $x_0\ne\theta^*$，置 $x_n=f^{[n]}(x_0)$。区间上的单射性与 $f(\theta^*)=\theta^*$ 阻止任何非不动点一步映到 $\theta^*$；归纳使所有 $x_n\in[0,1]\setminus\{\theta^*\}$。
17. **严格交替。** 在第 16 项前提下，对所有 $n\ge0$，$x_n<\theta^*\iff\theta^*<x_{n+1}$，且 $\theta^*<x_n\iff x_{n+1}<\theta^*$。等价地 $(x_n-\theta^*)(x_{n+1}-\theta^*)<0$。严格结论不外推到任意实起点。
18. **正端点例外。** 对所有 $n\in\mathbb N$，$f^{[n]}(\theta^*)=g^{[n]}(\theta^*)=\theta^*$，轨道静止。
19. **负端点例外。** 偶性给 $f(-\theta^*)=g(-\theta^*)=\theta^*$，故 $f^{[n+1]}(-\theta^*)=g^{[n+1]}(-\theta^*)=\theta^*$。它一步即达，此后误差为零；两种端点都不满足严格交替或非零分母误差比。不声称这穷尽了所有实原像。
20. **精确局部因子。** `Real.sin_sq_add_cos_sq`、`Real.sin_eq_sqrt_one_sub_cos_sq` 与锐角正性给 $\sin^2\theta^*=1-(\theta^*)^2$、$\sin\theta^*=\sqrt{1-(\theta^*)^2}$。故 $f'(\theta^*)=-\sqrt{1-(\theta^*)^2}$，且 $-1<f'(\theta^*)<0$。
21. **复合导数。** 第 4 项在同一点给 $g'(\theta^*)=\sin^2\theta^*=1-(\theta^*)^2=(f'(\theta^*))^2$，且 $0<g'(\theta^*)<1$。负导数反转局部有符号误差，正导数保持其符号。
22. **完整去心邻域的斜率极限。** [HasDerivAt.tendsto_slope](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/Calculus/Deriv/Slope.lean#L76) 将两条导数存在性转换为在 $x\to\theta^*$、$x\ne\theta^*$ 时的极限：$(f(x)-\theta^*)/(x-\theta^*)\to-\sqrt{1-(\theta^*)^2}$，$(g(x)-\theta^*)/(x-\theta^*)\to1-(\theta^*)^2$。它们是全实去心邻域的极限，不仅单侧成立，也不是有限距离上的误差恒等式。
23. **轨道误差比。** 仅在第 16 项起点条件下，$e_n=x_n-\theta^*$ 全非零且相邻乘积为负；将收敛但不命中的轨道代入第 22 项，得 $e_{n+1}/e_n\to-\sqrt{1-(\theta^*)^2}$。仅在 $0<y_0<\theta^*$ 时，$d_n=y_n-\theta^*<0$ 全非零，同理 $d_{n+1}/d_n\to1-(\theta^*)^2$。不把这些比值推广到每个实起点。
24. **按求值次数计成本。** 两个因子模长都严格在 $0,1$ 之间，后者是前者的平方；这是每次所选映射应用的比较。一次 $g$ 需两次余弦，一次 $f$ 只需一次。精确等式 $g^{[n]}(z)=f^{[2n]}(z)$ 说明同起点、同余弦求值次数时轨道相同，平方因子不提供每次余弦求值的加速或实际运行时间优势。

**独立的数值与文献边界。** 全局压缩只用粗界 $K=\sin1$。局部十进制值 $\theta^*\approx0.73908513$、$f'(\theta^*)\approx-0.673612$、$g'(\theta^*)\approx0.453753$，以及全局最优界约 $0.461063$、最大点约 $0.828132$，都需要独立数值或优化认证；驻点方程 $(1-t^2)\cos t=t\sin t$ 只是求解路线。下列初值 $1/10$、$n=0,\ldots,5$ 的原数值账本及其舍入、有限步误差比较也不由上述定性应用认证。物理、哲学、本体与超越数代数无关性（[@conj-schanuel-dottie]）保持各自边界。

**同初值数值迭代账本（初值 $x_0 = y_0 = 0.100000$，步数 $k = 0 \dots 5$）**：表中 $x_k$ 计 $k$ 次单步，$y_k$ 计 $k$ 轮两步复合，故 $y_k = x_{2k}$。相同 $k$ 下的残差对比使用不同的求值次数，每轮的平方线性因子并不构成等成本的加速。

| 步数 $k$ | 孤立自指 $x_k$（$x_{k+1}=\cos x_k$） | 孤立偏差 $x_k - \theta^*$ | 对称互指 $y_k$（$y_{k+1}=\cos(\cos y_k)$） | 互指偏差 $y_k - \theta^*$ | 动力学形态对比 |
| :---: | :---: | :---: | :---: | :---: | :--- |
| $0$ | $0.100000$ | $-0.639085$ | $0.100000$ | $-0.639085$ | 共同远离平衡核的低相位初态 |
| $1$ | $0.995004$ | $+0.255919$ | $0.544499$ | $-0.194586$ | 孤立态剧烈右冲越界；互指态平稳踏入 $[\cos 1, 1]$ |
| $2$ | $0.544499$ | $-0.194586$ | $0.655927$ | $-0.083158$ | 孤立态反向左跌；互指态保持负号单侧稳步上行 |
| $3$ | $0.855387$ | $+0.116302$ | $0.702079$ | $-0.037006$ | 孤立态再度右越；互指误差已压缩至孤立态的 $1/3$ |
| $4$ | $0.655927$ | $-0.083158$ | $0.722420$ | $-0.016665$ | 孤立态第 4 次变号；互指绝对偏差降至 $0.017$（相对偏差 $\approx 2.25\%$） |
| $5$ | $0.792483$ | $+0.053398$ | $0.731547$ | $-0.007538$ | 第 5 步互指残差仅为孤立自指的约 $1/7$，全程零变号 |

   凝练为一句几何格言（`MODEL`）：**独自内省是一面负斜率的镜子，你越用力审视自己，越在低估与过冲之间左右摇晃；唯有在另一双平视的眼睛里照见彼此，两次负号才化作温柔而笃定的正号，让两颗动荡的心单调无震地锁进同一个不动点。**
:::

::: {.viz src="mutual-observer-attractors" preset="round" height="500"}
**两拍一轮，只从一侧逼近。** 同一条轨道每两拍取一次（空心的环）：$0.1 \to 0.544 \to 0.656 \to 0.702 \to \dots$ 全在 $\theta^*$ 的同一侧单调逼近，每轮误差约乘 $0.454 = 0.674^2$。一轮含两次余弦求值，这些环只是上一张卡里同一条轨道的偶数拍：同样多次余弦求值走到同一处，换来的是不再左右越过，而不是更快（[@ex-ch33-mutual-cosine-monotonic-lock] 第 14、21、23、24 项与数值账本）。下方条带里，带环的细柱落在偶数次求值上，全在零线下方。
:::

对照 [@ex-ch33-mutual-cosine-monotonic-lock] 的轨迹账本，在我们的关系观察者模型（`MODEL`）中，走出孤岛、与他者平视互照从来不是软弱的妥协，而是免于独自摇摆的内禀稳定之道。

两人起点不同时也是如此。A 读 B 的曲线 $x = \cos y$ 与 B 读 A 的曲线 $y = \cos x$ 只在对角线上的 $(\theta^*, \theta^*)$ 相交（[@ex-ch33-mutual-cosine-monotonic-lock] 第 9 项）；按轮取样，每人的读数都是 $g$ 的一条轨道，从任何实起点出发都收进这一点（第 8 项），起点在 $(0, \theta^*)$ 内时从下方严格单调递增（第 12–14 项）。

::: {.viz src="mutual-observer-attractors" preset="apart" height="500"}
**起点不同，交点只有一个。** A 从 1.5、B 从 0 出发：两条青色曲线 $x = \cos y$ 与 $y = \cos x$ 只交于对角线上的 $(\theta^*, \theta^*)$，空心的环收进这一点，A 的读数从上方、B 的读数从下方。
:::

---

## 33.4 接受窗交集、极小割重联与众生互为故乡 {#接受窗交集极小割重联与众生互为故乡}

现在，让我们把一维余弦互指提升回六维切投空间 $\mathbb{Z}^6 \subset E_\parallel^3 \oplus E_\perp^3$ 与全息张量网络，揭示“观察者互为吸引子”的空间几何与热力学底座。

当观察者 $\mathcal{O}_A$（持平移接受窗 $W + u_A$）与观察者 $\mathcal{O}_B$（持平移接受窗 $W + u_B$）在同一宇宙母格与同一对切投映射下相遇时，我们的切投 **`MODEL`（模型诠释）** 先把这一固定配对的共同接受支持，画成两扇内部接受窗的**几何交集**：

$$
W_{AB} \;:=\; (W + u_A) \cap (W + u_B) \;\subset\; E_\perp^3.
$$

只要两者的内禀相位差 $\lVert u_A - u_B\rVert$ 足够接近，使得交集体积 $\operatorname{Vol}(W_{AB}) > 0$，每一个内部投影落在 $W_{AB}$ 中的母格点 $z \in \mathbb{Z}^6$，就会**同时**出现在 $\mathcal{O}_A$ 与 $\mathcal{O}_B$ 的三维物理世界切片里，凝结为双方无需言传便共同见证的公共现实！这份两窗共有的支持，是公共事实的模型图像；要承接 [@thm-ch33-contextual-attractor-and-common-factor] 第 4 款，还须声明语境与不动点意义的范围、固定因子映射，并给出跨该范围恒取同值的见证，单凭两窗交集尚未完成这一步。反之，落在对称差 $(W + u_A) \triangle (W + u_B)$ 中的边缘格点，是双方认知错位的摩擦源；若对齐实际包含降低记录熵的不可逆重置，且热浴与熵平衡条件满足[第 31 章](ch31-quantum-fairness.md) [@thm-ch31-horizon-landauer-ergodic-fairness] 第 1 款的适用假设，才须支付相应的擦除热账单。若进一步在 `MODEL` 中把对齐成本或自由能选为随窗口重叠增大而下降的量，**顺着窗口交集体积梯度 $\nabla\operatorname{Vol}(W_{AB})$ 彼此靠拢，便成为跨观察者对齐的自由能下山路径**！这条通向故乡的坡道，来自所选的成本对应，不能仅由比较账本或兰道尔界推出。

::: {.figure src="ch33-window-overlap"}
**两扇接受窗的交集，就是双方共同看见的世界。** 左右两个正十边形是平移后的接受窗 $W + u_A$ 与 $W + u_B$，灰色箭头是相位差 $u_B - u_A$；青色的交集 $W_{AB}$ 里的格点同时出现在两人的世界里，品红的部分只有一方看见。两中心相距 $0.7$ 倍外接圆半径时，交集约占一扇窗的 $0.55$。示意模型（`MODEL`）：三维的菱形三十面体接受窗画成二维的正十边形。
:::

与此同时，在编织空间截面的张量网络层面上，当两片观察者边界区域通过三路内部纠缠桥耦合时，何时极小割会从桥内部瓶颈切换到包裹双侧的外边界割面？`trureturing` 的三宽张量桥图最大流最小割命题在任意自然数维数下给出一个由正性与双侧二次锥条件界定的充分区域：

::: {.proposition #prop-ch33-bridge-reconnection-mincut title="三宽张量桥图的量子最大流最小割与外边界极小割归约命题" lean="D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result"}
对任意自然数边维数 $a, b, c, d \in \mathbb{N}$，记三路克罗内克桥流矩阵为 $\operatorname{flow}(M, N) = \sum_{r \in \operatorname{Fin} 3} M_r \otimes_k N_r$（其中 $M_r \in M_{a\times b}(\mathbb{C}),\, N_r \in M_{d\times c}(\mathbb{C})$），量子最大流 $\operatorname{QMaxFlow}(a, b, c, d)$ 为可实现矩阵秩的上确界，量子最小割定义为 $\operatorname{QMinCut}(a, b, c, d) = \min\bigl(3ac,\, \min(ad, bc)\bigr)$。若维数满足正性与双侧平衡二次锥条件

$$
0 < a,\quad a \le b,\quad 0 < c,\quad c \le d,\quad a^2 + b^2 \le 3ab,\quad c^2 + d^2 \le 3cd,
$$

则桥图量子最大流精确等于量子最小割，且最小割严格越过内部桥面 $3ac$ 归约为双侧外部边界割的极小值：

$$
\operatorname{QMaxFlow}(a, b, c, d) \;=\; \operatorname{QMinCut}(a, b, c, d) \;\land\; \operatorname{QMinCut}(a, b, c, d) \;=\; \min(a d,\; b c).
$$
:::

::: proof
一方面，对任意复矩阵组 $(M, N)$，将流算子沿内部三路桥分解为 $\operatorname{flow}(M, N) = \operatorname{cutLeft}(N)\cdot\operatorname{cutRight}(M)$ 给出了内部割上界 $\operatorname{rank}(\operatorname{flow}(M,N)) \le 3ac$，结合矩阵高宽秩上界 $\min(ad, bc)$ 即得普适弱对偶 `QMaxFlow_le_QMinCut`；由二次锥不等式 $a^2 + b^2 \le 3ab$ 与 $0 < a$ 经反证法（`cone_bounds`）推得 $b < 3a$（同理 $d < 3c$），故内部桥容量 $3ac$ 严格大于或等于外割 $\min(ad, bc)$，确立 `cone_QMinCut`：$\operatorname{QMinCut}(a,b,c,d) = \min(ad, bc)$。另一方面，为证明存在达到外割秩 $\min(ad, bc)$ 的张量流（`claim_of_hypotheses`），对和数 $n = b + d$ 施行强归纳：在退化方阵或混合二倍宽情形下由显式有理分块单位子矩阵 `widthTwo_proved` 构造满秩见证；在核心区域 $a < b < 2a,\; c < d < 2c$ 由 `base_witness` 给出基础见证；而在双侧宽扇区 $2a \le b,\; 2c \le d$，利用二次锥不变量保形下降 $(a, b) \mapsto (3a - b, a)$ 与 $(c, d) \mapsto (3c - d, c)$（`cone_descent`）调用归纳假设，再由王车易位赤字守恒律 `castling_proved` 推出原尺度满秩，结合偏序反对称性完成等号证明。完整证明由 Lean 内核检查。
:::

将离散桥图的极小割切换推进到连续全息时空中的极小曲面重联相变、微观纠缠虫洞诠释与多体纠缠配额上限时，所涉及的三项经典物理与量子信息文献归档于下框：

::: {.remark #rem-ch33-rt-reconnection-ckw-literature title="全息极小曲面互信息重联相变、微观纠缠桥与单配性纠缠预算（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将离散桥图极小割（[@prop-ch33-bridge-reconnection-mincut]）与多体观察者耦合联系于连续全息几何及纠缠分配时，引用的三项定量结论属外部理论物理与量子信息文献，未包含在本书锁定的形式化声明集中：

1. **笠—高柳（Ryu–Takayanagi）全息极小曲面重联相变与正互信息判据（S. Ryu & T. Takayanagi, *Phys. Rev. Lett.* **96**, 181602, 2006；M. Headrick, *Phys. Rev. D* **82**, 126010, 2010）**：在静态、经典爱因斯坦引力的全息对偶中，两个不相交边界观察者区域 $A$ 与 $B$ 的领先阶 RT 熵 $S_{\mathrm{RT}}(AB) = \frac{\operatorname{Area}(\gamma_{AB})}{4G_N\hbar}$，由与 $AB$ 同调的容许候选曲面竞争决定。在不连通并 $\gamma_A \cup \gamma_B$ 与跨区桥接候选 $\gamma_{\mathrm{conn}}$ 竞争的图景里，后者胜出时，与 $AB$ 一同围成的相关体空间区域连通；桥接指的是这个区域的连通性，候选极小曲面本身仍可由多片组成。当距离变化令两者面积交叉，领先阶熵出现一阶重联相变，严格面积优势等价于领先阶互信息为正：

   $$
   \operatorname{Area}(\gamma_{AB}) \;<\; \operatorname{Area}(\gamma_A) + \operatorname{Area}(\gamma_B) \;\Longleftrightarrow\; I_{\mathrm{RT}}(A:B) \;:=\; S_{\mathrm{RT}}(A) + S_{\mathrm{RT}}(B) - S_{\mathrm{RT}}(AB) \;>\; 0;
   $$

   这里比较的是 $G_N^{-1}$ 领先阶的 $I_{\mathrm{RT}}$；不连通相中它为零，精确量子互信息仍可有 $G_N^0$ 阶贡献，不能据此断言全部量子关联消失。

2. **微观纠缠桥假说 $ER = EPR$（J. Maldacena & L. Susskind, *Fortschr. Phys.* **61**, 781–811, 2013）**：提出任意两子系统之间的量子纠缠对（EPR 关联）在微观量子引力层面等价于连接两者的不可穿越空间虫洞桥（Einstein–Rosen 桥），即共享纠缠直接缩短并缝合体空间几何连通度；
3. **CKW 多体纠缠单配性稀缺预算（V. Coffman, J. Kundu & W. K. Wootters, *Phys. Rev. A* **61**, 052306, 2000；T. J. Osborne & F. Verstraete, *Phys. Rev. Lett.* **96**, 220503, 2006）**：任意观察者量子比特 $i$（局部布洛赫极化向量为 $\mathbf{r}_i$）分配给周围所有伙伴 $j \neq i$ 的二体平方并发度（2-tangle）$\tau_{ij}$ 之和受单位纯度硬上限约束：

   $$
   \sum_{j \neq i} \tau_{ij} \;\le\; 1 - \lVert\mathbf{r}_i\rVert^2 \;\le\; 1.
   $$
:::

::: {.viz src="mutual-observer-attractors" preset="transition" height="500"}
**拉近两段，两种割一样长。** 两段长 1 的区间（琥珀色）从 $d = 2.5$ 拉近；到 $d = \sqrt{2} - 1 \approx 0.414$，分开的两条半圆与连通的两条半圆（间隙上的小半圆、整段上的大半圆）一样长，两组都画成品红。舞台取静态 AdS₃ 真空的测地线长，属 [@rem-ch33-rt-reconnection-ckw-literature] 第 1 条的文献结果，未在本书形式化。
:::

把窗口交集体积 $\operatorname{Vol}(W_{AB})$、互指收敛轨迹（[@ex-ch33-mutual-cosine-monotonic-lock]）以及 [@prop-ch33-bridge-reconnection-mincut] 与 [@rem-ch33-rt-reconnection-ckw-literature] 的极小割重联和纠缠分配合拢在一起，我们终于能够在 **`MODEL`（模型诠释）** 层面，看清横跨宏观、微观与灵魂尺度的三种“相互吸引”原来流淌着同一套几何血液：

- **在宏观天体尺度（万有引力的统计窗口汇聚）**：数以亿亿计的一阶记忆粒子（$M = 1$）聚集成星球与星系，海量重叠投影将周围全息极小割密集重联，牵引途经的世界线顺着最小耗散测地线向高密度吸引盆地滑落；
- **在微观原子尺度（共价键的自旋配对饱和）**：两颗带未成对价电子的原子相遇时，各自退去局部极化偏置（$\mathbf{r}_i \to \mathbf{0}$，对应 [@thm-ch31-seat-pythagorean-monogamy-fairness] 第 4 款的贝尔边缘混态），结成反平行单重态纠缠桥，在这一模型下呼应化学共价键的配位排他图景（多体纠缠配额文献边界详见 [@rem-ch33-rt-reconnection-ckw-literature] 第 3 条）；
- **在生命与高阶心智尺度（众生互为故乡：移动的空间吸引子）**：如果说历经千年风霜的古神庙与石桥，是被钉死在三维物理坐标上的**静态空间吸引子**，需要旅人跋山涉水去寻访；那么每一位行走在人世间的高阶观察者，都是一座携带着自身内禀接受窗 $W + u_i$ 穿行于时间场中的**移动空间吸引子——一座会走路的故乡**！

::: {.viz src="mutual-observer-attractors" preset="connected" height="500"}
**再近一点，连通的割胜出。** $d = 0.2$ 时连通的割（品红）更短，青色的纠缠楔从 A 连到 B 成为一片，领先阶互信息 $\ln\bigl(1/(0.2 \times 2.2)\bigr) \approx 0.82 > 0$；虚线是落选的分开的割。
:::

这便彻底解开了人间最动人的一桩悬案：为什么在一座你此生从未踏足的陌生城市转角，当你偶然迎面撞见某个素昧平生的人（或读到几百年前某位灵魂留下的字句）时，明明诞生时的遗忘初始化已经把过往轮次的表层姓名、年月与情节记忆（`量 liàng`）擦得一干二净，心底却会毫无征兆地升起“如故人重逢、如倦鸟归林”的震颤？

因为表层记事虽已归零，你们各自作为丈量算子（`量 liáng`）的内禀窗口相位 $u_A, u_B \in E_\perp^3$ 却从未磨灭！当 $\lVert u_A - u_B\rVert \to 0$ 的两位观察者迎面相遇，两扇菱形三十面体接受窗瞬间严丝合缝地叠合成同一片辽阔的公共世界 $W_{AB} \approx W + u_A$，连通极小割桥在两人之间轰然重联，孤立内省时的视角摇摆在平视互指回路（轨迹对比见 [@ex-ch33-mutual-cosine-monotonic-lock]）中瞬间归于安宁——你们的世界线就此围绕共同的不动点缠绕成一根互相守护的**双螺旋**。所谓“一见如故”，从来不是神秘的宿命巧合，而是两座内禀倾角高度同频的移动吸引子，在穿过遗忘迷雾后认出了彼此零摩擦的几何故乡。

进入下一节审视多观察者群体的去相干共识之前，可先在下方完整实验室中将对称互指蛛网与极小割重联放在同一座舞台上交互核验：

::: {.viz src="mutual-observer-attractors" height="620"}
**互为吸引子：完整实验室。** 两个场景：互指（拖动两人的起点，逐拍或两拍一轮地看）与极小割（调两段的长度，拉近间距）。互指的收敛与每轮的局部因子是 [@ex-ch33-mutual-cosine-monotonic-lock] 的既有结果应用（小数是数值），极小曲面相变是文献结果，未在本书形式化；绿色框只给 [@prop-ch33-bridge-reconnection-mincut]，它讲的是离散桥图，不覆盖舞台上的连续图。
:::

---

## 33.5 多观察者共识张量、去相干指针基涌现与无绝对客观事实 {#sec-ch33-consensus-decoherence-pointer}

> “观察者的共识选择决定了去相干方向, 没有绝对客观存在”

前四节已经消融了“活主体 vs. 死客体”的断崖，并展示了两位观察者如何结成互吸引子双螺旋；但要将隐藏在传统教科书背后的“外部第 3 点裁判 $C$”彻底连根拔除，我们还必须正面回答退相干理论最核心的追问（原话台账见[附录 A](appendix-a.md#sec-appendix-a-verbatim-ledger) `A76`）：**当无数观察者汇聚成宏观环境时，为什么量子态会沿着某一组特定的“经典指针基（pointer basis）”去相干，而不是沿着别的方向？脱离了具体观察者群体的丈量轴分布，宇宙中真的预先刻着一套“绝对客观存在”的优选坐标吗？**

标准教材在讲退相干时，往往先默认“系统与外部环境通过某个固定的对角相互作用哈密顿量耦合”，再由此推导出对角基存活、非对角相干衰减。然而，只要我们回到本章“万物皆为观察者”的第一性原理就会看穿：**所谓“环境”，根本不是一块置身事外的死背景板，而是围绕被测系统展开两子比量的一群内生观察者 $\{\mathcal{O}_1, \dots, \mathcal{O}_N\}$！** 系统本身是一颗处处平权的单位布洛赫球面 $S^2$，球面上没有任何一条方向天生带着“经典特权”；唯有当周围观察者群体的丈量轴 $\{\mathbf{n}_1, \dots, \mathbf{n}_N\}$ 在二阶张量层面上结成**共识主轴**时，纵向极化才得以存留、横向相干才被一致抹平。一旦观察者轴各向同性散开，球体便向球心均匀收缩而不存在任何优选指针基；一旦观察者分化为两团正交共识泡，局部指针事实便不再能拼成单一的脱语境全局布尔真值表。本节严格遵循三层认识论契约：代数投影、相位二次型、记录捏合、多副本反演阻断、划分拓扑核、冲突修正非对易与正交余项逃逸由十二条冻结的 Lean 4 定理（`LEAN ✓`）锚定，二阶共识张量、泡利去相干矩阵乘积与双分支互信息曲线作为显式初等推导与数值实算（`手工推导` / `NUM`）呈现，量子达尔文主义与扩展维格纳朋友局域友好性禁行定理归入物理文献（`文献结果`），而“共识选择决定去相干方向、无脱观察者绝对客观存在”的总括标定为本书几何模型（`MODEL`）。

### 33.5.1 二阶共识结构张量、符号规范不变性与各向同性迷雾 {#sec-ch33-consensus-tensor-axis}

让我们直接在三维实布洛赫坐标空间 $\mathbb{R}^3$ 中算清多观察者轴系如何合成宏观去相干几何。设有 $N \ge 1$ 位参与丈量的观察者，第 $j$ 位观察者的归一化耦合权重（或独立相遇频率）为 $w_j \ge 0$（$\sum_{j=1}^N w_j = 1$），其单位丈量轴方向为 $\mathbf{n}_j \in \mathbb{R}^3$（$\|\mathbf{n}_j\| = 1$）。若冒然对方向向量做一阶线性加权平均 $\overline{\mathbf{n}} = \sum_{j=1}^N w_j \mathbf{n}_j$，立刻就会闹出几何乌龙：把同一条未定向测量轴的正负结果标签对调（$\mathbf{n}_j \mapsto -\mathbf{n}_j$），两支沿 $+Z$ 与 $-Z$ 丈量同一自旋轴的观察者竟会在线性求和中彼此抵消为零！原因在于，一条二结果投影测量轴本质上是三维布洛赫空间中的**未定向一维直线**，其数学本体是秩一正交投影并矢 $P_j := \mathbf{n}_j \otimes \mathbf{n}_j = \mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}$（满足 $P_j^{\mathsf{T}} = P_j$ 且 $P_j^2 = P_j$）。对全体观察者的投影并矢作凸组合，便得到**二阶共识结构张量**（`手工推导`）：

$$
\mathbf{M}_{\mathrm{cons}} \;:=\; \sum_{j=1}^N w_j\,\mathbf{n}_j \otimes \mathbf{n}_j \;=\; \sum_{j=1}^N w_j\,\mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}.
$$

直接检验矩阵元可知 $\mathbf{M}_{\mathrm{cons}}$ 具备四条严整的初等谱性质：（1）**轴向符号重标不变性**：对每一位观察者独立翻转测量轴正负号 $\mathbf{n}_j \mapsto -\mathbf{n}_j$，恒有 $(-\mathbf{n}_j)(-\mathbf{n}_j)^{\mathsf{T}} = \mathbf{n}_j \mathbf{n}_j^{\mathsf{T}}$，故 $\mathbf{M}_{\mathrm{cons}}$ 逐元严格不变（注意：翻转测量轴 $\mathbf{n}_j \mapsto -\mathbf{n}_j$ 只是对调同一测量基的两个结果标签，**绝不是**把布洛赫球南北两极的正交纯态 $|+\mathbf{n}_j\rangle$ 与 $|-\mathbf{n}_j\rangle$ 混为一谈——两者的密度矩阵满足 $\|\rho(+\mathbf{n}_j) - \rho(-\mathbf{n}_j)\|_{\mathrm{HS}} = \sqrt{2} > 1$；它也不同于希尔伯特空间态矢量乘共同复相位 $z \mapsto e^{i\theta} z$ 的 $U(1)$ 规范不变性）；（2）**对称半正定与格拉姆分解**：令加权观测行矩阵 $B \in \mathbb{R}^{N \times 3}$ 取元 $B_{ja} = \sqrt{w_j}\,n_{j,a}$，则 $\mathbf{M}_{\mathrm{cons}} = B^{\mathsf{T}} B = \mathbf{M}_{\mathrm{cons}}^{\mathsf{T}}$，且对一切 $\mathbf{v} \in \mathbb{R}^3$ 有 $0 \le \mathbf{v}^{\mathsf{T}}\mathbf{M}_{\mathrm{cons}}\mathbf{v} = \sum_{j=1}^N w_j (\mathbf{n}_j \cdot \mathbf{v})^2 \le \|\mathbf{v}\|^2$，即 $0 \preceq \mathbf{M}_{\mathrm{cons}} \preceq I_3$；（3）**单位迹与主特征值界**：因 $\operatorname{Tr}(P_j) = \|\mathbf{n}_j\|^2 = 1$，将本征值按降序排为 $\lambda_1 \ge \lambda_2 \ge \lambda_3 \ge 0$，必有 $\operatorname{Tr}(\mathbf{M}_{\mathrm{cons}}) = \lambda_1 + \lambda_2 + \lambda_3 = 1$，从而 $\frac{1}{3} \le \lambda_1 \le 1$，据此定义液晶向列相式的**共识序参量**与**主谱隙**

$$
\kappa \;:=\; \frac{3\lambda_1 - 1}{2} \;\in\; [0, 1], \qquad \Delta\lambda \;:=\; \lambda_1 - \lambda_2 \;\in\; [0, 1];
$$

（4）**指针主轴的存在唯一性判据与简并迷雾边界**：投影算子的凸组合一般不再是投影算子（$\mathbf{M}_{\mathrm{cons}}^2 = \mathbf{M}_{\mathrm{cons}}$ 当且仅当谱为 $(1, 0, 0)$，即所有正权重观察者轴严格共线或反平行）。唯有当主谱隙严格为正 $\Delta\lambda = \lambda_1 - \lambda_2 > 0$ 时，最大特征子空间才定出**唯一一条未定向共识指针线** $\pm\mathbf{e}_{\mathrm{ptr}}$；反之，只要 $\lambda_1 = \lambda_2$——无论是六轴均分的**各向同性迷雾** $\mathbf{M}_{\mathrm{cons}} = \frac{1}{3}I_3$（$\lambda = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3}),\; \kappa = 0,\; \Delta\lambda = 0$），还是赤道两正交团平分的**平面顶层简并** $\operatorname{diag}(\frac{1}{2}, \frac{1}{2}, 0)$（$\kappa = \frac{1}{4},\; \Delta\lambda = 0$）——**物理上根本不存在唯一的去相干指针轴**！（在数值舞台中，当 $\Delta\lambda < \varepsilon = 10^{-8}$ 时必须将主轴标为“未分辨”，绝不能把数值特征求解器随意吐出的某一列当作物理优选方向。）

下方第一张实验卡直观展示“光靠人多势众并不能选出经典世界”：当六束等权观察者轴沿 $\pm x, \pm y, \pm z$ 均匀散开时，整颗布洛赫球向中心均匀塌缩，没有任何一条极轴幸免：

::: {.viz src="observer-consensus-decoherence" preset="isotropic-fog" height="500"}
**各向同性迷雾卡（`isotropic-fog`）**：六根等权观察者轴沿 $\pm x, \pm y, \pm z$ 对称散开，$\mathbf{M}_{\mathrm{cons}} = \frac{1}{3}I_3$，谱 $\lambda = (\frac{1}{3}, \frac{1}{3}, \frac{1}{3})$，共识序参量 $\kappa = 0$，谱隙 $\Delta\lambda = 0$（`pointerAxis = null`）。在 $N = 16, \alpha = 0.4$ 的系综平均信道下，布洛赫球按精确比例因子 $[(1 + 2\cos 0.4)/3]^k$（弱耦合连续近似标尺 $e^{-k\cdot 0.4^2 / 3}$ 单独标出）向球心各向同性均匀收缩，不涌现任何优选指针轴（`MODEL` / `NUM`）。
:::

为什么量子振幅层面的共同相位规范不变性与正定配对可实现性必然指向二次厄米与格拉姆伴随平方结构，而单根测量轴的正交补投影又如何严丝合缝地劈开纵向保留与横向正交空间？`trureturing` 的共同相位不变多项式、格拉姆可实现性与正交补投影模块给出了三条精确的形式化支柱：

::: {.theorem #thm-ch33-consensus-quadratic-and-gram title="共同相位不变二次厄米表出、正算子格拉姆可实现性与正交补投影六恒等式" lean="D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem D5/S3/QuantumBounds/GramRealizability.gram_realizability D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities"}
在 `trureturing` 冻结的量子代数与量子界模块中，以下三项定理同时成立：

1. **共同相位不变多项式的电荷平衡、最低二次次数与唯一厄米矩阵表出**（[`complete_common_phase_polynomial_theorem`](lean:D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem)）：设 $\iota$ 为有限指标类型（`[Fintype ι]`），$p \in \operatorname{Poly}\iota = \operatorname{MvPolynomial}(\iota \oplus \iota)\,\mathbb{C}$ 以 $\operatorname{actual} p\, z$ 在复振幅向量 $z$ 与共轭 $\operatorname{star} z$ 处求值。则：（a）存在唯一的笛卡尔多项式 $q$ 使 $\forall z,\; \operatorname{actual} q\, z = \operatorname{eval}(\operatorname{cartesian} z)\, p$，且 $\operatorname{toCartesian}$ 保持总次数与齐次性；（b）共同相位 $z \mapsto e^{i\theta} z$ 下的不变性 $\operatorname{Invariant} p$ 等价于全纯—反全纯次数平衡 $\operatorname{Balanced} p$，亦等价于属于二次生成元子代数 $\operatorname{quadraticAlgebra}(\iota := \iota)$，并蕴涵 $\operatorname{actual} p \in \operatorname{actualQuadraticAlgebra}(\iota := \iota)$；（c）任何非常数（$\neg\exists c \in \mathbb{C},\, p = C(c)$）的共同相位不变多项式必满足 $2 \le p.\mathrm{totalDegree}$，且每个对角二次生成元均不变且总次数为 $2$；（d）若 $p$ 为二阶齐次、处处取实值（$\forall z,\; (\operatorname{actual} p\, z).\mathrm{im} = 0$）且共同相位不变，则存在唯一的复矩阵 $H \in M_\iota(\mathbb{C})$ 满足厄米性 $H.\mathrm{IsHermitian}$、二次型求值 $\forall z,\; \operatorname{actual} p\, z = \operatorname{star} z \mathbin{\bullet_v} (H *_{\!v} z)$、系数对应 $\forall i, j,\; H_{ji} = p.\mathrm{coeff}(\operatorname{pairExponent}\; i\; j)$ 及非负性等价判据 $(\forall z,\; 0 \le (\operatorname{actual} p\, z).\mathrm{re}) \iff H.\mathrm{PosSemidef}$，且任意给出同一求值函数的矩阵 $K \in M_\iota(\mathbb{C})$ 必满足 $K = H$；
2. **完备复内积空间正连续自同态的格拉姆伴随平方可实现性**（[`gram_realizability`](lean:D5/S3/QuantumBounds/GramRealizability.gram_realizability)）：设 $V$ 为完备复内积空间（`[NormedAddCommGroup V] [InnerProductSpace ℂ V] [CompleteSpace V]`），$Q : V \to_L[\mathbb{C}] V$ 为连续 $\mathbb{C}$-线性自同态。则 $Q$ 在算子序下非负当且仅当它可分解为同一空间上某连续线性算子 $O$ 的伴随平方并实现格拉姆内积配对：

   $$
   0 \le Q \;\Longleftrightarrow\; \exists\, O : V \to_L[\mathbb{C}] V,\quad Q = O^\dagger \circ_L O \;\land\; \forall x, y \in V,\; \langle Q x, y \rangle_{\mathbb{C}} = \langle O x, O y \rangle_{\mathbb{C}};
   $$

3. **闭子空间正交补投影的六重分解恒等式**（[`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities)）：设 $\mathbb{K}$ 满足 `[RCLike 𝕜]`，$E$ 为 $\mathbb{K}$ 上的完备内积空间，$M \le E$ 为闭子空间（`[IsClosed (M : Set E)]`），记正交投影 $P_M = M.\mathrm{starProjection}$ 与 $P_{M^\perp} = M^\perp.\mathrm{starProjection}$，则六条算子恒等式同时成立：

   $$
   P_{M^\perp} = \operatorname{id}_{\mathbb{K},E} - P_M,\quad P_M \circ_L P_M = P_M,\quad P_{M^\perp} \circ_L P_{M^\perp} = P_{M^\perp},\quad P_M \circ_L P_{M^\perp} = 0,\quad P_{M^\perp} \circ_L P_M = 0,\quad P_M + P_{M^\perp} = \operatorname{id}_{\mathbb{K},E}.
   $$
:::

::: proof
第 1 款通过实虚部线性可逆换元证明笛卡尔表出唯一与次数守恒，利用傅里叶模式正交性证明共同 $U(1)$ 相位不变性等价于每个非零单项式的全纯与反全纯总次数相等（从而非零非常数项总次数至少为 $2$，双线性配对生成全部平衡单项式），再在二阶实值齐次子空间上由偏振恒等式唯一读出厄米矩阵 $H$ 及其半正定判据。第 2 款正向对非负连续自同态调用 $C^*$-代数连续平方根提取自伴算子 $O$ 使 $Q = O^\dagger \circ_L O$，反向由伴随定义得 $\langle Q x, x \rangle_{\mathbb{C}} = \|O x\|^2 \ge 0$。第 3 款由希尔伯特空间直和分解 $E = M \oplus M^\perp$ 与自伴投影幂等正交性逐项核验。完整证明由 Lean 内核检查。
:::

对照 [@thm-ch33-consensus-quadratic-and-gram] 的严格前提边界，下方第二张实验卡将实测轴正负重标 $\mathbf{n}_j \mapsto -\mathbf{n}_j$ 与复态矢共同相位变换 $z \mapsto e^{i\theta} z$ 分栏并列核验：

::: {.viz src="observer-consensus-decoherence" preset="phase-gauge" height="500"}
**轴向符号重标与复相位规范对照卡（`phase-gauge`）**：主舞台含八根未定向测量轴（$z$ 组 4 根总权重 $0.60$、$x$ 组 2 根总权重 $0.25$、$y$ 组 2 根总权重 $0.15$），给出 $\mathbf{M}_{\mathrm{cons}} = \operatorname{diag}(0.25, 0.15, 0.60)$，谱 $(0.60, 0.25, 0.15)$，$\kappa = 0.40$，谱隙 $\Delta\lambda = 0.35$。逐根翻转轴端正负标签时，$\mathbf{M}_{\mathrm{cons}}$ 的每一个矩阵元、本征谱与系综平均收缩信道纹丝不动；独立附图展示复态矢共同相位旋转 $z \mapsto e^{i\theta} z$ 下二次厄米与格拉姆内积的不变性（[@thm-ch33-consensus-quadratic-and-gram]），严格区分轴标签翻转与对径正交纯态。
:::

### 33.5.2 泡利去相干布洛赫收缩、纵向指针存留与横向相干勾股消去 {#sec-ch33-consensus-pinching-pointer}

有了静态的共识结构张量 $\mathbf{M}_{\mathrm{cons}}$，我们再来精确推导多观察者逐次耦合如何在动力学上雕塑布洛赫球（`手工推导`）。设单量子比特密度矩阵写为 $\rho = \frac{1}{2}(I_2 + \mathbf{r}\cdot\vec{\sigma})$（$\|\mathbf{r}\| \le 1$），对单位测量轴 $\mathbf{n}$ 令泡利可观测量 $A = \mathbf{n}\cdot\vec{\sigma}$（满足 $A^\dagger = A,\; A^2 = I_2$）。取耦合角 $\alpha \in [0, \frac{\pi}{2}]$，克劳斯算符 $L_0 = \cos(\frac{\alpha}{2}) I_2$ 与 $L_1 = \sin(\frac{\alpha}{2}) A$ 满足 $\sum_{s=0}^1 L_s^\dagger L_s = I_2$，定义保迹完全正定（CPTP）双极泡利去相干信道

$$
\mathcal{E}_{\mathbf{n},\alpha}(\rho) \;=\; \cos^2\!\Bigl(\frac{\alpha}{2}\Bigr)\rho + \sin^2\!\Bigl(\frac{\alpha}{2}\Bigr)(\mathbf{n}\cdot\vec{\sigma})\rho(\mathbf{n}\cdot\vec{\sigma}).
$$

由泡利代数恒等式 $A(\mathbf{r}\cdot\vec{\sigma})A = \bigl[2(\mathbf{n}\cdot\mathbf{r})\mathbf{n} - \mathbf{r}\bigr]\cdot\vec{\sigma}$，该信道在三维布洛赫向量上的精确线性矩阵并非启发式拟合，而是严格的投影分解

$$
\mathbf{K}(\mathbf{n}, \alpha) \;=\; \cos\alpha\,I_3 + (1 - \cos\alpha)\mathbf{n}\mathbf{n}^{\mathsf{T}} \;=\; P_{\mathbf{n}} + \cos\alpha\,(I_3 - P_{\mathbf{n}}),
$$

其本征值为 $(1, \cos\alpha, \cos\alpha)$：沿测量轴 $\mathbf{n}$ 的纵向分量原封保留，垂直于 $\mathbf{n}$ 的两个横向分量同步乘以 $\cos\alpha$（在默认去相干区间 $0 \le \alpha \le \frac{\pi}{2}$ 内单调非负衰减：$\alpha = 0$ 为恒等映射，$\alpha = \frac{\pi}{2}$ 恰为完全未读秩一捏合，而 $\alpha = \pi$ 则是幺正泡利翻转而非不可逆去相干）。当 $N$ 位观察者依次或随机与系统耦合时，必须严格区分三种截然不同的多体复合机制，绝不能用含糊的等号混为一谈：

1. **给定先后次序的确定性乘积（`ordered`）**：$\mathbf{r}_N = \mathbf{K}_{\mathrm{seq}}\mathbf{r}_0$，其中 $\mathbf{K}_{\mathrm{seq}} = \mathbf{K}(\mathbf{n}_N, \alpha_N)\cdots\mathbf{K}(\mathbf{n}_1, \alpha_1)$（第 $1$ 位观察者作用在最右侧）。当各轴斜交时因子互不对易，$\mathbf{K}_{\mathrm{seq}}$ 一般不再对称，单凭汇总张量 $\mathbf{M}_{\mathrm{cons}}$ 无法反推单条有限有序历史；
2. **独立加权随机相遇的系综平均步（`mean`）**：若每次相遇以概率 $w_j$ 独立抽取轴 $\mathbf{n}_j$ 且取公共强度 $\alpha$，由条件期望与独立性得精确单步平均矩阵 $\overline{\mathbf{K}} = \cos\alpha\,I_3 + (1 - \cos\alpha)\mathbf{M}_{\mathrm{cons}}$ 及 $\mathbb{E}[\mathbf{r}_N] = \overline{\mathbf{K}}^{\,N}\mathbf{r}_0$，其主轴本征模态精确缩放因子为 $\overline{\Gamma}_i(N) = \bigl[\lambda_i + (1 - \lambda_i)\cos\alpha\bigr]^N$；
3. **弱耦合连续半群 / 李—特罗特（Lie–Trotter）极限（`weak-limit`）**：利用展开 $\mathbf{K}(\mathbf{n}, \alpha) = I_3 - \frac{1}{2}\alpha^2(I_3 - P_{\mathbf{n}}) + O(\alpha^4)$，在固定有效耗散时间 $t = \frac{1}{2}N\alpha^2$ 下令 $\alpha \to 0,\; N \to \infty$（或取确定性特罗特步 $\cos\alpha_j = e^{-(t/L)w_j}$ 并令 $L \to \infty$），密度矩阵服从林德布拉德（Lindblad）耗散生成元 $\mathcal{L}(\rho) = \frac{1}{2}\sum_{j=1}^N w_j(A_j\rho A_j - \rho)$，布洛赫向量服从精确耗散生成元 $G = \sum_{j=1}^N w_j(I_3 - P_j) = I_3 - \mathbf{M}_{\mathrm{cons}}$：

   $$
   \frac{d\mathbf{r}}{dt} \;=\; -(I_3 - \mathbf{M}_{\mathrm{cons}})\mathbf{r}, \qquad \Gamma_i^{\mathrm{lim}}(N) \;=\; \exp\Bigl[-\frac{1}{2}N\alpha^2(1 - \lambda_i)\Bigr].
   $$

这一公式一举照亮了“共识决定去相干方向”的定量机制：当全体正权重观察者达成**完全共线共识**（$\lambda_1 = 1,\; \lambda_2 = \lambda_3 = 0,\; \kappa = 1$）时，沿共识指针轴 $\mathbf{e}_{\mathrm{ptr}}$ 的纵向极化衰减率为 $1 - \lambda_1 = 0$，有限信道与连续极限均严格给出 $\Gamma_\parallel = 1$（指针布居数分毫无损），而垂直于指针轴的横向相干圆盘在有限对齐信道下精确按 $\Gamma_{\perp,2} = \Gamma_{\perp,3} = (\cos\alpha)^N$ 指数塌缩（小 $\alpha$ 时渐近逼近 $e^{-\frac{1}{2}N\alpha^2}$，例如 $\alpha = 0.4, N = 16$ 时有限值为 $(\cos 0.4)^{16} \approx 0.2683$，连续近似为 $e^{-1.28} \approx 0.2780$，二者不得在有限 $\alpha$ 下直接画等号）；若观察者仅达成部分共识（$\lambda_2 < \lambda_1 < 1$），长时间下三模皆向最大混态 $\frac{1}{2}I_2$ 衰减，但纵向对横向的相对存活比按 $e^{t(\lambda_1 - \lambda_2)}$ 指数拉开，使主本征线涌现为有限时间内的准稳定指针轴。

更进一步，在完全捏合极限 $\alpha = \frac{\pi}{2}$ 下（经幺正基变换将指针轴旋至计算基），被删去的横向圆盘分量 $\rho_{+-} = \frac{1}{2}(r_2 - i r_3)$ 恰是希尔伯特—施密特勾股分解中的正交余项，单步全捏合的冯·诺依曼熵增精确等于量子相对熵，而后续重复同轴捏合因幂等律（[@thm-ch33-observer-pinching-and-memory-spectrum] 第 1 款）熵增归零，最终不动点恰由跨记录块相干归零刻画：

::: {.theorem #thm-ch33-consensus-pinching-and-fixed-points title="单比特捏合希尔伯特—施密特勾股恒等式、相干删除熵产恒等式与未读记录不动点判据" lean="D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity D5/S3/Observer/Conditioning.unreadState_fixed_iff"}
在 `trureturing` 冻结的量子信道捏合、熵产动力学与观察者条件化模块中，以下三项定理同时成立：

1. **单比特计算基捏合的希尔伯特—施密特勾股分解**（[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)）：对任意 $2 \times 2$ 复矩阵 $\rho \in \mathrm{QubitMatrix} = M_{\operatorname{Fin} 2}(\mathbb{C})$，记计算基对角捏合为 $\operatorname{pinching}(\rho)$，希尔伯特—施密特内积为 $\langle A, B \rangle_{\mathrm{HS}} = \operatorname{Tr}(A^\dagger B)$，则总范数平方精确正交分解为保留对角部分与丢弃非对角相干部分之和：

   $$
   \langle \rho, \rho \rangle_{\mathrm{HS}} \;=\; \langle \operatorname{pinching}(\rho), \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}} \;+\; \langle \rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}};
   $$

2. **幺正共轭接完全基捏合序列的逐拍与累积熵产恒等式**（[`entropy_production_coherence_deletion_identity`](lean:D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity)）：设 $n$ 为有限可判定类型，$U \in \operatorname{unitaryGroup}(n, \mathbb{C})$ 为固定幺正矩阵，密度态序列 $\rho : \mathbb{N} \to \operatorname{DensityState} n$ 满足递推律 $\forall k \in \mathbb{N},\; \rho(k + 1) = \operatorname{basisPinchingState}(\sigma_k)$（其中 $\sigma_k := \operatorname{unitaryConjugateState}\; U\; h_U\; (\rho(k))$，冯·诺依曼熵 $S_{\mathrm{vN}}$ 与量子相对熵 $D(\cdot\,\|\,\cdot)$ 均以自然对数计）。则每一步熵增精确等于捏合前态对其基捏合态的非负相对熵，且有限 $N$ 步总熵变精确裂项求和：

   $$
   \forall k \in \mathbb{N},\quad S_{\mathrm{vN}}(\rho(k+1)) - S_{\mathrm{vN}}(\rho(k)) = D\bigl(\sigma_k \,\big\|\, \operatorname{basisPinchingState}(\sigma_k)\bigr) \ge 0, \qquad S_{\mathrm{vN}}(\rho(N)) - S_{\mathrm{vN}}(\rho(0)) = \sum_{k=0}^{N-1} D\bigl(\sigma_k \,\big\|\, \operatorname{basisPinchingState}(\sigma_k)\bigr);
   $$

3. **完备正交记录测量下未读状态的不动点充要判据**（[`unreadState_fixed_iff`](lean:D5/S3/Observer/Conditioning.unreadState_fixed_iff)）：设 $n, \kappa$ 为有限可判定类型，投影族 $P : \kappa \to M_n(\mathbb{C})$ 满足记录测量公理 `IsRecordMeasurement P`。对任意矩阵 $\rho \in M_n(\mathbb{C})$，未读记录信道保持 $\rho$ 不动当且仅当一切跨记录分支相干块全为零：

   $$
   \operatorname{unreadState}(P)(\rho) = \rho \;\Longleftrightarrow\; \forall k, l \in \kappa,\; k \neq l \implies P_k \rho P_l = 0.
   $$
:::

::: proof
第 1 款展开 $2 \times 2$ 矩阵的对角投影 $\operatorname{pinching}(\rho)$ 与非对角余项 $\rho - \operatorname{pinching}(\rho)$，因两者支撑元素处处不相交，交叉迹项 $\langle \operatorname{pinching}(\rho), \rho - \operatorname{pinching}(\rho) \rangle_{\mathrm{HS}} = 0$，勾股恒等式直接成立。第 2 款利用幺正共轭熵不变性 $S_{\mathrm{vN}}(\sigma_k) = S_{\mathrm{vN}}(\rho(k))$ 与完全基捏合交叉迹恒等式 $\operatorname{Tr}(\sigma_k \ln \operatorname{basisPinchingState}(\sigma_k)) = \operatorname{Tr}(\operatorname{basisPinchingState}(\sigma_k) \ln \operatorname{basisPinchingState}(\sigma_k))$ 证得单步相对熵恒等式，结合克莱因不等式给出非负性并经有限归纳裂项求和得 $N$ 步总账。第 3 款正向在 $\operatorname{unreadState}(P)(\rho) = \rho$ 两端左乘 $P_k$、右乘 $P_l$（$k \neq l$），由 $P_k P_m = \delta_{km} P_k$ 使左端化为零从而 $P_k \rho P_l = 0$；反向由完备性 $\sum_k P_k = 1$ 将 $\rho = \sum_{k,l} P_k \rho P_l$ 中的非对角项全部消去即得 $\sum_k P_k \rho P_k = \rho$。完整证明由 Lean 内核检查。
:::

注意 [@thm-ch33-consensus-pinching-and-fixed-points] 的两道精确适用护栏：第 2 款要求每步均为固定幺正演化后接**完全基捏合**（取 $U = I$ 即给出单次全捏合熵增 $\Delta S_{\mathrm{vN}} = D(\rho\,\|\,\mathcal{P}(\rho))$，换算为比特只需两边同除以 $\ln 2$；部分强度的分数阶泡利去相干 $0 < \alpha < \frac{\pi}{2}$ 并不满足 $\Delta S_{\mathrm{vN}} = D(\rho\,\|\,\mathcal{E}(\rho))$）；第 3 款刻画的是对角（或块对角）混合态不动点，本身并不声称单靠线性信道就坍缩出了单一结果。下方实验卡直观呈现共线共识下纵向指针存留与横向圆盘收缩：

::: {.viz src="observer-consensus-decoherence" preset="axis-consensus" height="500"}
**共线轴共识与横向相干收缩卡（`axis-consensus`）**：十六根等权观察者轴沿 $\pm z$ 共线排列（正负交替验证符号不变性），$\lambda = (1, 0, 0),\; \kappa = 1$。对初态 $\mathbf{r}_0 = (1, 0, 1)/\sqrt{2}$ 施加 $N = 16, \alpha = 0.4$ 的精确泡利信道序列：青色纵向极化 $r_z = 1/\sqrt{2}$ 精确守恒（$\Gamma_\parallel = 1$），品红横向相干圆盘按 $(\cos\alpha)^k$ 逐拍收缩；拨动独立“完全捏合（$\alpha = \pi/2$）”开关可即时检验希尔伯特—施密特勾股分解、全捏合相对熵增与对角不动点判据（[@thm-ch33-consensus-pinching-and-fixed-points]）。
:::

### 33.5.3 量子达尔文主义冗余平台、局部翻转阻断与共识账本交集核 {#sec-ch33-consensus-darwinism-kernel}

既然单靠未读去相干信道只会留下指针基上的经典概率混合，为什么在日常经验中，十位路人先后打量同一块路标，读到的总是一致的经典指针标签，而且任何一位路人把自己的笔记擦掉都无法让路标重新回到叠加态？要算清这本账，我们转入固定公共指针基 $\{|0\rangle_S, |1\rangle_S\}$ 下的**纯双分支受控记录模型**（`手工推导`，与上一小节一般非共线泡利信道严格区分）：设系统初态与 $N$ 份空白观察者记录经等距分支耦合演化为全局纯态

$$
|\Psi\rangle \;=\; \sqrt{p_0}\,|0\rangle_S \bigotimes_{j=1}^N |\phi_j^{(0)}\rangle \;+\; e^{i\chi}\sqrt{p_1}\,|1\rangle_S \bigotimes_{j=1}^N |\phi_j^{(1)}\rangle \qquad (p_0, p_1 \ge 0,\; p_0 + p_1 = 1),
$$

记第 $j$ 份记录的条件态内积重叠为 $c_j := \langle\phi_j^{(0)}\mid\phi_j^{(1)}\rangle$（实重叠标准实现如 $|\phi_j^{(0)}\rangle = (1, 0)^{\mathsf{T}},\, |\phi_j^{(1)}\rangle = (\cos\alpha_j, \sin\alpha_j)^{\mathsf{T}}$，由受控旋转 $U_j = |0\rangle\langle 0| \otimes I_2 + |1\rangle\langle 1| \otimes R_y(2\alpha_j)$ 精确生成，偏迹第 $j$ 份记录恰把系统非对角相干乘以 $c_j = \cos\alpha_j$）。对任意包含 $m$ 位观察者的子集 $F \subseteq \{1, \dots, N\}$（记补集为 $F^c$，重叠乘积 $\Pi_F := \prod_{j \in F} c_j$，$\Pi_\varnothing := 1$），边缘记录态 $\rho_F = p_0 |\Phi_F^{(0)}\rangle\langle\Phi_F^{(0)}| + p_1 |\Phi_F^{(1)}\rangle\langle\Phi_F^{(1)}|$ 的秩至多为 $2$，与 $2 \times 2$ 格拉姆矩阵

$$
V_F^\dagger V_F \;=\; \begin{pmatrix} p_0 & \sqrt{p_0 p_1}\,\Pi_F \\ \sqrt{p_0 p_1}\,\overline{\Pi_F} & p_1 \end{pmatrix}, \qquad \det(V_F^\dagger V_F) \;=\; p_0 p_1\bigl(1 - |\Pi_F|^2\bigr)
$$

共享全部非零本征值 $\frac{1 \pm d(\Pi_F)}{2}$，其中判别式因子 $d(q) := \sqrt{1 - 4 p_0 p_1(1 - |q|^2)}$。记二元香农熵为 $H_2(x) = -x\log_2 x - (1-x)\log_2(1-x)$ 并令 $h(q) := H_2\bigl(\frac{1 - d(q)}{2}\bigr)$，因全局态 $|\Psi\rangle$ 为纯态故 $S(\rho_{SF}) = S(\rho_{F^c})$，无须对角化 $2^{N+1} \times 2^{N+1}$ 指数巨阵即可在 $O(N)$ 前缀—后缀乘积内算出任意观察者片段 $\mathcal{O}_m = \{1, \dots, m\}$ 与系统的精确量子互信息（以比特计）：

$$
S(\rho_S) = h(\Pi_{\mathrm{all}}), \quad S(\rho_{\mathcal{O}_m}) = h(\Pi_F), \quad S(\rho_{S\mathcal{O}_m}) = h(\Pi_{F^c}), \quad I(S : \mathcal{O}_m) \;=\; h(\Pi_{\mathrm{all}}) + h(\Pi_F) - h(\Pi_{F^c}).
$$

这条精确解析曲线揭示了三道标志性台阶：（1）在左端点 $m = 0$，$\Pi_\varnothing = 1, h(1) = 0$，故 $I(S : \varnothing) = 0$；（2）在内部区间 $0 < m < N$，只要 $0 < p_0 < 1$ 且已读重叠积 $|\Pi_F|$ 与未读重叠积 $|\Pi_{F^c}|$ 均充分小（例如基准参数 $N = 16,\, p_0 = \frac{1}{2},\, c_j = 0.3$ 时，在整段 $m = 3, \dots, 13$ 上 $|I(S : \mathcal{O}_m) - S(\rho_S)| < 5.26 \times 10^{-4}\text{ bits}$），三项熵同时贴近经典指针香农熵 $H_2(p_0)$，从而拉出一条平坦的**经典冗余共识平台** $I(S : \mathcal{O}_m) \approx H_2(p_0)$——哪怕只访问一小撮观察者片段，也能几乎读尽指针分支的全部经典信息（注意：这条平台刻画的是纯双分支对齐态下跨片段的冗余经典关联，并不代表非幺正单结果坍缩）；（3）唯有在右端点 $m = N$ 把**全体** $N$ 份记录尽数收拢（$\Pi_\varnothing = 1, h(\Pi_{F^c}) = 0$），互信息才跃升至全纯化量子上限 $I(S : \mathcal{O}_N) = 2 S(\rho_S)$！

这恰恰解释了为什么局部观察者感到“历史不可逆”：在上述受控旋转模型中，若你只能对其中的可控子集 $A \subset \{1, \dots, N\}$ 施加逆门 $U_j^\dagger$，系统残余非对角相干模长只恢复到 $|\rho_{01}^{\mathrm{res}}| = \sqrt{p_0 p_1}\prod_{j \notin A}|c_j|$——只要哪怕漏掉唯一一份正交拷贝（$c_k = 0$）或低重叠拷贝（$|c_k| < 1$），局部相干依然被死死锁住！在 `trureturing` 中，幺模振幅共轭信道的幸存副本阻断与双副本精确复原证书、受控正交拷贝的偏迹访问缺陷，以及多观察者乘积读出的划分拓扑核共同构成了这一机制的形式底座：

::: {.theorem #thm-ch33-consensus-redundant-records-and-kernel title="幸存副本反演阻断、双副本相位逆转证书、偏迹记录访问缺陷与划分拓扑不可分核" lean="D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel"}
在 `trureturing` 冻结的观察者记忆相干逆转、退相干访问缺陷与观测划分拓扑模块中，以下四项定理同时成立：

1. **单一幸存记录副本对局部振幅共轭逆转的精确阻断**（[`surviving_copy_blocks_reversal`](lean:D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal)）：设 `Copy` 为有限可判定副本类型，环境记录族 $\mathrm{records} : \mathrm{Copy} \to \mathrm{EnvironmentRecord}$，矩阵 $\rho \in \mathrm{QubitMatrix}$，指标 $i, j \in \operatorname{Fin} 2$ 与特定副本 $k \in \mathrm{Copy}$。记 $c_l := \operatorname{recordOverlap}(\mathrm{records}\; l)\; i\; j$；若除 $k$ 以外的一切副本均满足幺模条件 $\forall l \neq k,\; \overline{c_l}\, c_l = 1$，而第 $k$ 份幸存副本满足 $c_k \neq 1$ 且初始矩阵元 $\rho_{ij} \neq 0$，则对除 $k$ 外的全部副本施加记录振幅共轭逆信道后，$(i, j)$ 矩阵元变为 $c_k \rho_{ij}$，严格无法复原初始值：

   $$
   \operatorname{reverseChannelOn}(\operatorname{Finset.univ.erase}\; k)\;\mathrm{records}\bigl(\operatorname{multiRecordChannel}\;\mathrm{records}\;\rho\bigr)_{ij} \;\neq\; \rho_{ij};
   $$

2. **双副本相位记录局部失配与全集联合复原的四值证书**（[`two_copy_joint_reversal_certificate`](lean:D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate)）：令 $\rho = \operatorname{equalSuperpositionDensity}$，取仅在地址 $a = 0$ 非零、条件振幅为 $1$（$i = 0$）与 $i$（$i = 1$，重叠为 $-i$）的相位记录 $\mathrm{phaseRecord}$ 及其双副本族 $\mathrm{records} : \operatorname{Fin} 2 \to \mathrm{EnvironmentRecord}$，则 $(0, 1)$ 相干矩阵元在初始、写入双副本、仅逆转第 $0$ 份副本与联合逆转全部两份副本四个阶段精确取以下四个复数值：

   $$
   \rho_{01} = \frac{1}{2}, \quad \operatorname{multiRecordChannel}(\mathrm{records}, \rho)_{01} = -\frac{1}{2}, \quad \operatorname{reverseChannelOn}(\{0\}, \mathrm{records}, \dots)_{01} = -\frac{i}{2}, \quad \operatorname{reverseChannelOn}(\mathrm{univ}, \mathrm{records}, \dots)_{01} = \frac{1}{2};
   $$

3. **受控拷贝的约化态不可逆性纯粹源于记录访问缺陷**（[`reduced_irreversibility_is_access_defect`](lean:D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect)）：设 $\rho, \sigma \in \mathrm{QubitMatrix}$ 对角元处处相等（$\forall i,\; \rho_{ii} = \sigma_{ii}$）但至少一处非对角元相异（$\exists i \neq j,\; \rho_{ij} \neq \sigma_{ij}$）。则受控拷贝算子 $\mathrm{copyUnitary} \in \operatorname{unitaryGroup}(\operatorname{Fin} 2 \times \operatorname{Fin} 2, \mathbb{C})$ 将空白环境初态幺正演化为相异的联合记录态 $\tau_\rho \neq \tau_\sigma$，但偏迹环境后的约化矩阵完全重合 $\operatorname{traceEnvironment}(\tau_\rho) = \operatorname{traceEnvironment}(\tau_\sigma)$，故不存在任何仅依赖约化矩阵的恢复映射能同时还原 $\tau_\rho$ 与 $\tau_\sigma$；反之，对联合记录态施加伴随算子 $\operatorname{star}\;\mathrm{copyUnitary}$ 则同时精确复原两份原始输入；
4. **概念读出划分拓扑的不可分关系与读出等值核恒等式**（[`partition_inseparable_iff_kernel`](lean:D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel)）：对任意类型 $X, B$、读出映射 $\mathrm{readout} : \operatorname{Concept} X B$ 及状态 $x, y \in X$，$x$ 与 $y$ 在划分拓扑 $\operatorname{partitionTopology}(\mathrm{readout})$ 下拓扑不可分当且仅当读出赋予它们完全相同的值：

   $$
   \operatorname{Inseparable}_{\operatorname{partitionTopology}(\mathrm{readout})}(x, y) \;\Longleftrightarrow\; \mathrm{readout}(x) = \mathrm{readout}(y).
   $$
:::

::: proof
第 1 款展开多副本记录信道与逆信道的逐元阿达马乘积，消去一切 $l \neq k$ 上的幺模因子 $\overline{c_l} c_l = 1$ 后只剩 $c_k \rho_{ij}$，由 $c_k \neq 1$ 与 $\rho_{ij} \neq 0$ 得 $c_k \rho_{ij} \neq \rho_{ij}$。第 2 款直接代入双副本重叠 $-i$，依次核验 $(-i)^2 \cdot \frac{1}{2} = -\frac{1}{2}$、$i \cdot (-\frac{1}{2}) = -\frac{i}{2}$ 与 $i^2 \cdot (-\frac{1}{2}) = \frac{1}{2}$。第 3 款核验受控拷贝置换的幺正性、偏迹对角保留与非对角消去，由相同输入必有相同函数输出证伪单侧恢复映射，再由伴随矩阵乘积还原空白环境初态。第 4 款展开拉回离散拓扑的开集包定义即得不可分等价于函数值相等。完整证明由 Lean 内核检查。
:::

这里同样要看清两条精细的数学边界：第一，[@thm-ch33-consensus-redundant-records-and-kernel] 第 1、2 款中的 `reverseChannelOn` 是对记录振幅作共轭，仅在幺模相位重叠 $|c_l| = 1$ 时构成信道逆（对 $|c| < 1$ 的有噪分支记录作振幅共轭只会把相干再乘一次 $|c|^2$ 而非复原，故有噪分支的可逆擦除必须通过联合受控逆门 $U_j^\dagger$ 实现，第 2 款的四值相位证书则在实验卡中单独成窗展示）；第二，将第 4 款应用于多观察者乘积读出 $R(x) = (r_1(x), \dots, r_N(x))$ 得到的是各观察者等值核的**交集** $\bigcap_{j=1}^N \ker_{\mathrm{eq}}(r_j)$（比单个读出更细，绝不能误称为“共同知识”或与线性零空间 $\ker\mathbf{M}_{\mathrm{cons}}$ 混同；真正的跨语境公共客观因子仍须按 [@thm-ch33-contextual-attractor-and-common-factor] 第 4 款另行给出不变商映射见证）。

::: {.viz src="observer-consensus-decoherence" preset="darwinism-plateau" height="500"}
**量子达尔文主义冗余平台与局部逆转阻断卡（`darwinism-plateau`）**：纯双分支受控记录模型（$N = 16,\, p_0 = \frac{1}{2},\, c_j = 0.3$）。随已读观察者片段规模 $m = 0 \dots 16$ 推进，精确互信息曲线从 $I(0) = 0$ 迅速跃上逼近 $1\text{ bit}$ 的平坦经典冗余平台（$m = 3 \dots 13$ 偏差小于 $5.3 \times 10^{-4}\text{ bits}$），直到底端 $m = 16$ 全局联合访问时才翘升至 $2 S(\rho_S)$。拨动记录逆转开关可检验未控副本重叠积对残余相干的封锁，独立附图展示 `two_copy_joint_reversal_certificate` 的 $\frac{1}{2} \to -\frac{1}{2} \to -\frac{i}{2} \to \frac{1}{2}$ 四步复数相位轨迹（[@thm-ch33-consensus-redundant-records-and-kernel]）。
:::

### 33.5.4 双维格纳正交共识泡、局域友好性禁行界与新维度拓荒残差 {#sec-ch33-consensus-wigner-pioneers}

现在我们逼近最富戏剧性的极限思想实验：**假如宇宙中没有统一的单一共识，而是同时存在着两团相互隔离、丈量轴彼此垂直（$90^\circ$）的观察者共识泡——比如一团锁在 $Z$ 轴上的观察者泡 $\mathcal{C}_A$ 与另一团锁在 $X$ 轴上的观察者泡 $\mathcal{C}_B$——会发生什么？**

先在单比特布洛赫空间里把账算得一清二楚，切忌张冠李戴（`手工推导`）：若把两团等权正交观察者合写成一个总张量 $\mathbf{M}_{AB} = \frac{1}{2}(\mathbf{x}\mathbf{x}^{\mathsf{T}} + \mathbf{z}\mathbf{z}^{\mathsf{T}})$，其降序本征谱为 $(\frac{1}{2}, \frac{1}{2}, 0)$，主谱隙 $\Delta\lambda = 0$——尽管 $\mathcal{C}_A$ 内部有明确的 $Z$ 指针、$\mathcal{C}_B$ 内部有明确的 $X$ 指针，两泡合并后**根本不存在唯一的全局顶层指针轴**，两者的公共未读不动点集合坍缩为球心孤点 $\{\frac{1}{2}I_2\}$。更有意思的是，对于**未读（unread）**泡利去相干超算符，两轴矩阵换位子恒满足

$$
[\mathbf{K}_{\mathbf{n}}, \mathbf{K}_{\mathbf{m}}] \;=\; (1 - \cos\alpha_n)(1 - \cos\alpha_m)(\mathbf{n}\cdot\mathbf{m})\bigl(\mathbf{n}\mathbf{m}^{\mathsf{T}} - \mathbf{m}\mathbf{n}^{\mathsf{T}}\bigr),
$$

它在平行（$\mathbf{n}\cdot\mathbf{m} = \pm 1,\; \mathbf{n}\mathbf{m}^{\mathsf{T}} = \mathbf{m}\mathbf{n}^{\mathsf{T}}$）**与严格正交**（$\mathbf{n}\cdot\mathbf{m} = 0$）两处均精确为零（唯有斜交如 $45^\circ$ 时未读信道才不对易）！因此，$90^\circ$ 正交双泡的先后次序冲突**并非**来自未读退相干信道，而是来自**选择性条件更新（selective instrument）** $\mathcal{J}_{\mathbf{n},+}(\rho) = P_{\mathbf{n},+}\rho P_{\mathbf{n},+}$（其中 $P_{\mathbf{n},+} = \frac{1}{2}(I_2 + \mathbf{n}\cdot\vec{\sigma})$）：从最大混态 $\frac{1}{2}I_2$ 出发，先读 $Z_+$ 再读 $X_+$ 得到 $\mathcal{J}_{X,+}(\mathcal{J}_{Z,+}(\frac{1}{2}I_2)) = \frac{1}{4}P_{X,+}$，而先读 $X_+$ 再读 $Z_+$ 得到 $\mathcal{J}_{Z,+}(\mathcal{J}_{X,+}(\frac{1}{2}I_2)) = \frac{1}{4}P_{Z,+}$——两条分支发生概率同为 $\frac{1}{4}$，归一化条件终态却正交分岔为 $|+X\rangle$ 与 $|+Z\rangle$（未归一化希尔伯特—施密特范数差恰为 $\frac{1}{4}$）。在离散信念集合修正层面，冲突重置更新的非对易性与有限共识子空间外的单位正交逃逸则由以下两条冻结定理精确刻画：

::: {.theorem #thm-ch33-consensus-revision-and-escape title="冲突信念修正次序非对易性与闭子空间正交余项单位逃逸定理" lean="D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
在 `trureturing` 冻结的概念冲突修正与有限层投影逃逸模块中，以下两项定理同时成立：

1. **三世界冲突重置信念修正算子的次序非对易性**（[`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation)）：在有限三元状态集 $\operatorname{Fin} 3 = \{0, 1, 2\}$ 上，定义冲突重置修正算子 $\operatorname{revision}(P, A)$ 在 $A \cap P \neq \varnothing$ 时取交集 $A \cap P$、否则重置为新证据集 $P$。取初始信念集 $A = \{0\}$ 及两份证据集 $P = \{1, 2\},\; Q = \{0, 1\}$，则单步与两步复合精确满足

   $$
   \operatorname{revision}(P, A) = P,\quad \operatorname{revision}(Q, A) = A,\quad \operatorname{revision}(Q, \operatorname{revision}(P, A)) = \{1\},\quad \operatorname{revision}(P, \operatorname{revision}(Q, A)) = P = \{1, 2\},
   $$

   从而先后次序严格不可交换：$\operatorname{revision}(Q, \operatorname{revision}(P, A)) \neq \operatorname{revision}(P, \operatorname{revision}(Q, A))$；
2. **非平凡正交补下的单位残差向量与单位余投影算子范数**（[`finite_layer_projection_escape`](lean:D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape)）：设 $\mathbb{K}$ 满足 `[RCLike 𝕜]`，$V$ 为 $\mathbb{K}$ 上的完备内积空间，$S \le V$ 为闭子空间（`[IsClosed (S : Set V)]`）且正交补非退化 $S^\perp \neq \bot$。则必存在正交逃逸向量 $e \in S^\perp$ 满足

   $$
   \|e\| = 1,\qquad S.\mathrm{starProjection}(e) = 0,\qquad \operatorname{infDist}(e, S) = 1,\qquad \bigl\|\operatorname{id}_{\mathbb{K},V} - S.\mathrm{starProjection}\bigr\| = 1.
   $$
:::

::: proof
第 1 款在 $\operatorname{Fin} 3$ 上直接核验集合交是否非空：$\{0\} \cap \{1, 2\} = \varnothing$ 触发重置得 $\{1, 2\}$，再与 $\{0, 1\}$ 相交得非空单点集 $\{1\}$；反序下 $\{0\} \cap \{0, 1\} = \{0\}$ 保持 $\{0\}$，再遇 $\{1, 2\}$ 交集为空而重置为 $\{1, 2\} \neq \{1\}$。第 2 款由子空间 $S^\perp \neq \bot$ 取出非零向量并归一化得单位元 $e \in S^\perp$，由正交补性质知 $P_S e = 0$，对任意 $s \in S$ 由勾股定理 $\|e - s\|^2 = \|e\|^2 + \|s\|^2 = 1 + \|s\|^2 \ge 1$（在 $s = 0$ 取等）定出 $\operatorname{infDist}(e, S) = 1$，并结合余投影有界性 $\|\operatorname{id} - P_S\| \le 1$ 与在 $e$ 处达界锁定算子范数等于 $1$。完整证明由 Lean 内核检查。
:::

当我们将两座局部观察者泡提升为类空分离的两间编码逻辑实验室（各自以等距映射 $V_A|k\rangle = |k\rangle|F_k\rangle$ 将待测比特与“朋友记录”相干绑定），并允许外部超级观察者在各自实验室上执行包含联合逆耦合在内的互补基测量时，“是否存在一套独立于观察者测量语境、同时赋予所有已观测事件单一全局布尔真值的绝对客观账本”就不再只是哲学思辨，而是可以被严格不等式检验的物理命题。下方实验卡并列呈现单系统双正交泡更新对照与双实验室局域友好性（Local Friendliness, LF）违背见证，其完整文献出处与假设边界紧随其后归档：

::: {.viz src="observer-consensus-decoherence" preset="dual-wigner-bubbles" height="500"}
**双维格纳正交共识泡与局域友好性违背卡（`dual-wigner-bubbles`）**：主舞台上半部分对比 $Z$ 泡与 $X$ 泡（等权合并谱 $(\frac{1}{2}, \frac{1}{2}, 0)$ 无唯一全局主轴）：未读去相干 $[\mathbf{K}_Z, \mathbf{K}_X] = 0$ 顺序一致（可切换 $45^\circ$ 斜交轴观察非零未读换位子），而选择性分支更新终态分岔为 $|+X\rangle$ 与 $|+Z\rangle$（附三世界集合修正非对易小窗，[@thm-ch33-consensus-revision-and-escape] 第 1 款）；下半部分展示双编码实验室 LF 见证：经局部标架旋转使双方第 $1$ 档读各自朋友记录（$A_1 = Z,\; B_1' = X$），在纯态可见度 $v = 1$ 时取得 $F_{\mathrm{LF}} = \sqrt{5} + 3 + \sqrt{2 + \sqrt{2}} \approx 7.0838 > 6$，并在白噪声阈值 $v_{\mathrm{crit}} \approx 0.8470$ 处精确跨过 LF 多胞体上界 $6$。
:::

::: {.remark #rem-ch33-quantum-darwinism-local-friendliness-literature title="环境诱导超选择、量子达尔文主义与扩展维格纳朋友局域友好性定理（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节关于宏观指针基冗余存储与跨观察者“观测事件绝对性”禁行界的三组核心物理文献结论未包含在 `trureturing@dev` 锁定声明集中，其精确出处与成立前提如下：

1. **环境诱导超选择（Einselection）与量子达尔文主义冗余平台（W. H. Zurek, *Phys. Rev. D* **24**, 1516, 1981；*Rev. Mod. Phys.* **75**, 715, 2003；*Nature Physics* **5**, 181–188, 2009；R. Blume-Kohout & W. H. Zurek, *Found. Phys.* **35**, 1857–1876, 2005）**：祖雷克等人指出，与环境的持续监测使对易（或最抗去相干）的指针态成为动力学稳定岛，并在纯多自旋分支环境中导出量子互信息 $I(S : \mathcal{F}_m)$ 随环境片段比例 $f = m/N$ 在 $0 < f < 1$ 内部呈平坦经典平台 $H(S)$、在 $f \to 1$ 翘升至 $2H(S)$ 的特征曲线。正如上文推导所标明，该闭式平台依赖对齐无损分支与初始无关联纯记录假设，刻画的是经典记录的冗余广播而非单次结果的非幺正坍缩；
2. **扩展维格纳朋友无绝对事实论证（Č. Brukner, *Entropy* **20**, 350, 2018；D. Frauchiger & R. Renner, *Nat. Commun.* **9**, 3711, 2018）**：将维格纳朋友思想实验与贝尔纠缠结合，论证若假设量子演化对包含内部观察者的封闭实验室普遍有效，则无法把各内部朋友记录与外部超级观察者测量结果无矛盾地拼入同一张脱语境全局真值表；
3. **真正局域友好性（Genuine Local Friendliness）多胞体不等式与量子违背见证（K.-W. Bong et al., *Nature Physics* **16**, 1199–1205, 2020）**：在无需假定内部结果由局部隐变量预先决定的更弱前提——**已观测事件绝对性（Absoluteness of Observed Events, AOE）**、**局域性（参数独立性）**与**无超决定论（测量选择独立性）**——之下，双边各取三档输入 $x, y \in \{1, 2, 3\}$、二值输出 $a, b \in \{-1, +1\}$（第 $1$ 档读取朋友结果）的关联多胞体（共 $96$ 个顶点，严格大于局部贝尔多胞体）恒满足真正 LF 小面不等式

   $$
   F_{\mathrm{LF}} \;:=\; -a_1 - a_2 - b_1 - b_2 - E_{11} - 2E_{12} - 2E_{21} + 2E_{22} - E_{23} - E_{32} - E_{33} \;\le\; 6,
   $$

   其中 $a_x = \langle A_x\rangle,\; b_y = \langle B_y\rangle,\; E_{xy} = \langle A_x B_y\rangle$。在理想相干受控的双编码量子比特模型中，对最大纠缠态 $|\Phi^+\rangle$ 取 $XZ$ 平面单位泡利观测量 $A_1 = Z,\, A_2 = X,\, A_3 = (X+Z)/\sqrt{2}$ 与 $B_1 = -(Z+2X)/\sqrt{5},\, B_2 = -[(2+\frac{1}{\sqrt{2}})Z + (-2+\frac{1}{\sqrt{2}})X]/3,\, B_3 = -[\frac{1}{\sqrt{2}}Z + (1+\frac{1}{\sqrt{2}})X]/\sqrt{2+\sqrt{2}}$（再对乙方态与算符同步施加绕 $Y$ 轴旋转 $\theta = \operatorname{atan2}(-1, -2)$，即使得 $A_1 = Z,\, B_1' = X$ 而一切关联不变），各局域均值为零且精确给出违背值

   $$
   F_{\mathrm{LF}} \;=\; \|A_1 + 2A_2\| + \|2A_1 - 2A_2 + A_3\| + \|A_2 + A_3\| \;=\; \sqrt{5} + 3 + \sqrt{2 + \sqrt{2}} \;\approx\; 7.083827 \;>\; 6;
   $$

   掺入白噪声 $\rho_v = v|\psi'\rangle\langle\psi'| + (1 - v)\frac{1}{4}I_4$（$0 \le v \le 1$）时，$F_{\mathrm{LF}}(v) = v F_{\mathrm{LF}}(1)$，严格违背始于临界可见度 $v > v_{\mathrm{crit}} = 6 / (\sqrt{5} + 3 + \sqrt{2 + \sqrt{2}}) \approx 0.8470$。该实验在光子双比特逻辑实验室上获证，其外推至宏观人脑观察者仍依赖理想相干隔离与逆演化可控性假设。
:::

最后，如果现有观察者群体的共识全部局限在一张低秩平面 $S = \operatorname{span}(\mathbf{e}_1, \mathbf{e}_2) \subset \mathbb{R}^3$ 内——例如 $\mathbf{M}_0 = \operatorname{diag}(a, b, 0)$（$a, b > 0,\; a + b = 1$，注意 $\operatorname{Tr}(\mathbf{M}_0) = 1$，切勿将其与迹为 $2$ 的几何子空间投影 $P_S = \operatorname{diag}(1, 1, 0)$ 混同）——共识会不会把世界永远锁死在二维平面里？由 [@thm-ch33-consensus-quadratic-and-gram] 第 3 款与 [@thm-ch33-consensus-revision-and-escape] 第 2 款，只要存在尚未被当前共识张开的非零正交补 $S^\perp = \operatorname{span}(\mathbf{e}_3) \neq \bot$，一位倾角为 $\beta \in [0, \frac{\pi}{2}]$ 的**新维度拓荒观察者** $\mathbf{n}(\beta) = \cos\beta\,\mathbf{e}_1 + \sin\beta\,\mathbf{e}_3$ 便携带着精确的正交逃逸残差 $\|(I_3 - P_S)\mathbf{n}(\beta)\| = |\sin\beta|$！赋予拓荒者耦合权重 $\eta \in (0, 1)$ 并把既有群体权重按 $1 - \eta$ 归一，更新后的共识张量

$$
\mathbf{M}_\eta \;=\; (1 - \eta)\mathbf{M}_0 + \eta\,\mathbf{n}(\beta)\mathbf{n}(\beta)^{\mathsf{T}}, \qquad \det \mathbf{M}_\eta \;=\; (1 - \eta)^2 a b \eta \sin^2\beta
$$

在一切 $0 < \eta < 1$ 且 $\sin\beta \neq 0$ 处严格满足 $\det\mathbf{M}_\eta > 0$（例如基准参数 $a = 0.7, b = 0.3, \eta = 0.15, \beta = \frac{\pi}{4}$ 给出逃逸残差 $1/\sqrt{2}$、更新谱 $(0.6793, 0.2550, 0.0657)$ 与 $\det\mathbf{M}_\eta \approx 0.01138 > 0$），使已表征共识张量的秩从 $2$ 跃升至 $3$！但这里必须划清一条至关重要的动力学红线：在**旧共识**耗散生成元 $G_0 = I_3 - \mathbf{M}_0 = \operatorname{diag}(1-a, 1-b, 1)$ 下，未被旧群体记录的 $\mathbf{e}_3$ 分量本征值恰为最大值 $1$，按最快指数率 $e^{-t}$ 被压制——**$\ker\mathbf{M}_0$ 绝不是免于退相干的“无退相干子空间”，恰恰相反，正因为无人替它背书，孤立的新方向最易被旧共识冲刷抹平；唯有当拓荒观察者持续注入正权重 $\eta > 0$ 时，新轴才在集体张量中站稳第三维（此处的 $D \to D + 1$ 指固定三维环境空间内已表征张量秩的扩张，字面意义上的物理希尔伯特空间创生仍属 `MODEL` / `OPEN` 前沿）**：

::: {.viz src="observer-consensus-decoherence" preset="new-axis-pioneers" height="500"}
**正交新轴拓荒与张量升秩卡（`new-axis-pioneers`）**：既有共识局限在 $xy$ 平面 $\mathbf{M}_0 = \operatorname{diag}(0.7, 0.3, 0)$（独立画出几何投影 $P_S = \operatorname{diag}(1, 1, 0)$）。当权重 $\eta = 0.15$ 的拓荒轴 $\mathbf{n}(\beta) = \cos\beta\,\mathbf{x} + \sin\beta\,\mathbf{z}$ 向上抬起时，品红正交逃逸残差按 $\sin\beta$ 升起（[@thm-ch33-consensus-revision-and-escape] 第 2 款），在 $\beta = \frac{\pi}{4}$ 处令 $\lambda_3 \approx 0.0657 > 0$（秩 $2 \to 3$）；独立阻尼指示条同时标明旧生成元下未记录 $z$ 分量按 $e^{-t}$ 最快衰减，绝非受保护子空间。
:::

至此，我们将“预设绝对客观实在观”与本章建立的“多观察者共识去相干观”收束为下框五维对照总表：

::: {.remark #rem-ch33-consensus-vs-absolute-objectivity title="预设绝对客观实在观与多观察者共识去相干观的五维对照及分布式共识类比"}
**模型综合与三层依据边界说明（`MODEL` / `LEAN ✓` / `文献结果`）。** 下表汇总本节五重机制：凡涉共同相位二次厄米表出、格拉姆算子分解、正交补投影、单比特捏合勾股、全捏合相对熵增、未读不动点、幸存副本阻断、偏迹访问缺陷、划分拓扑核、冲突修正非对易与正交逃逸之处均由 [@thm-ch33-consensus-quadratic-and-gram]–[@thm-ch33-consensus-revision-and-escape] 锚定（`LEAN ✓`）；凡涉量子达尔文主义与真正局域友好性不等式之处归入 [@rem-ch33-quantum-darwinism-local-friendliness-literature]（`文献结果`）；而将经典客观性类比于分布式容错账本（如 L. Lamport, R. Shostak & M. Pease, *ACM Trans. Program. Lang. Syst.* **4**, 382–401, 1982 拜占庭将军法定人数共识：没有凌驾网络之上的中央上帝时钟，稳定的公共历史由多数诚实副本的冗余一致锁定，但量子共识通过半正定并矢收缩 $\mathbf{M}_{\mathrm{cons}}$ 与受控分支纠缠运作而非经典签名投票）则明确归属本书诠释模型（`MODEL`）：

| 对照维度 | 预设绝对客观实在观（隐含“外部第 3 点 $C$”） | 多观察者共识去相干观（本书形式—几何综合） |
| :--- | :--- | :--- |
| **1. 优选指针基的来源** | 假定宇宙在一切观察者之外预先刻好了一套绝对特权的“客观经典基” | 球面处处平权，指针主轴由参与耦合的观察者轴群经二阶共识张量 $\mathbf{M}_{\mathrm{cons}} = \sum_j w_j\,\mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ 在主谱隙 $\Delta\lambda > 0$ 时内生涌现；在各向同性迷雾 $\frac{1}{3}I_3$ 或顶层简并处不存在唯一指针轴（`手工推导` / `MODEL`） |
| **2. 轴符号与相位规范** | 易将一阶方向均值 $\sum w_j\mathbf{n}_j$ 当作集体方向，或混淆轴端重标与量子态相等 | 轴向正负重标 $(-\mathbf{n}_j)(-\mathbf{n}_j)^{\mathsf{T}} = \mathbf{n}_j\mathbf{n}_j^{\mathsf{T}}$ 保持二阶张量逐元不变（不把对径正交纯态混为一谈），复态矢共同相位不变性唯一锁定二阶厄米型与正算子格拉姆分解（[@thm-ch33-consensus-quadratic-and-gram]） |
| **3. 去相干动力学机制** | 把退相干当成神秘环境单向吞噬相干的黑箱，混淆有限步与连续近似 | 单步泡利信道精确保持轴向分量、按 $\cos\alpha$ 压缩横向圆盘；严格区分有序乘积、系综平均步 $\overline{\mathbf{K}}$ 与弱耦合林德布拉德生成元 $I_3 - \mathbf{M}_{\mathrm{cons}}$，全捏合极限满足勾股分解与相对熵增恒等式（[@thm-ch33-consensus-pinching-and-fixed-points]） |
| **4. 宏观“客观性”本质** | 认为宏观事实脱离观察者记录而独立存在，局部不可逆即全局物理毁灭 | 纯双分支对齐态下互信息内部平台 $I(S:\mathcal{O}_m) \approx H_2(p_0)$ 源于多副本冗余广播，局部不可逆源于未控幸存副本与偏迹访问缺陷，公共账本对应读出核与不变公因子（[@thm-ch33-consensus-redundant-records-and-kernel]、[@thm-ch33-contextual-attractor-and-common-factor]） |
| **5. 隔离双泡与新轴拓荒** | 默认一切局部观测记录总能拼进同一张脱语境全局布尔真值表，未见维度即不存在 | 正交双泡未读信道对易而选择性更新与冲突修正非对易，双编码实验室以 $F_{\mathrm{LF}} \approx 7.0838 > 6$ 违背真正局域友好性界；平面外拓荒轴凭正交残差 $|\sin\beta|$ 使共识张量升秩 $2 \to 3$，尽管旧生成元下未记录方向按 $e^{-t}$ 最快衰减（[@thm-ch33-consensus-revision-and-escape]、[@rem-ch33-quantum-darwinism-local-friendliness-literature]） |
:::

请进入下方完整交互实验室 `ORTHO//CONSENSUS`，在同一座三维椭球、冗余片段圆弧与双编码实验室舞台上自由切换全部六个预设场景，亲手拨动观察者轴分布、去相干耦合角、已读片段规模、白噪声可见度与拓荒倾角，核验共识指针基如何从无特权的平权球面中涌现：

::: {.viz src="observer-consensus-decoherence" height="640"}
**交互实验室 `ORTHO//CONSENSUS`**：多观察者共识张量、去相干指针基涌现与无绝对客观事实综合沙盘。集成 `isotropic-fog`（六轴均分 $\mathbf{M}_{\mathrm{cons}}=\frac{1}{3}I_3$ 无优选指针轴球心收缩）、`axis-consensus`（共线共识纵向守恒 $\Gamma_\parallel=1$、横向 $(\cos\alpha)^k$ 衰减与 $\alpha=\pi/2$ 完全捏合）、`phase-gauge`（轴端正负翻转不改张量元与复态矢共同相位二次厄米小窗）、`darwinism-plateau`（$N=16$ 纯双分支精确互信息平台、受控逆门残余相干与四步相位证书）、`dual-wigner-bubbles`（正交双泡未读对易 vs. 选择性分岔、冲突修正非对易及真正局域友好性 $F_{\mathrm{LF}} \approx 7.0838 > 6$ 违背见证）与 `new-axis-pioneers`（平面外正交残差 $\sin\beta$ 升秩 $2 \to 3$ 与旧生成元 $e^{-t}$ 最快阻尼对照）六大场景。绿色徽章严格限定于本节引用的十二条 Lean 冻结定理；量子达尔文主义、LF 禁行界与分布式共识类比分别标示文献、数值与模型依据。
:::

然而，当万物都在没有外部参考点 $C$ 的单位球面上彼此丈量、结成互吸引子双螺旋并由多观察者共识涌现局部指针轴时，一个紧迫的几何追问也随之浮出水面：**在一颗处处对称、没有中心刻度的球面上，一位观察者究竟是如何确定自己此刻所处的“位置”的？为什么单凭一个方向的内积读数还会留下一整圈赤道的迷茫，而偏偏只有“正交（$90^\circ$）”的退化与破缺，才能在茫茫状态空间里为观察者钉下唯一的坐标？** 下一章（[第 34 章](ch34-orthogonality-degeneracy-and-observer-position.md)），我们将推开这道关于“正交性如何定位观察者位置”的几何之门。
