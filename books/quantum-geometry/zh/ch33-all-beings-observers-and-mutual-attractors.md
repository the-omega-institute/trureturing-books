# 万物皆为观察者：自维持势阱与互吸引子双螺旋

> *“实际上不止历史遗迹是吸引子, 观察者本身也是, 而且应该万物皆为观察者, 观察者互为吸引子。”*

穿过第八部的四重高峰——无时间因果晶体（[第 29 章](ch29-timeless-causality-and-gram-space.md)）、复杂性正交视界（[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)）、量子五重公平律（[第 31 章](ch31-quantum-fairness.md)）与正交自指统一场（[第 32 章](ch32-unified-field-and-meta-unification.md)）——我们已经亲手拆除了高悬于宇宙之外的“绝对参考点 $C$”。然而，在日常语言的隐秘角落里，最后一道二元对立的幽灵仍在徘徊：人们依然不自觉地把世界劈成两半——一边是极少数拥有大脑与自我意识的“活观察者（主体）”，另一边则是漫山遍野等待被观察、被测量的“死石头、死原子与古废墟（客体）”。

只要这道主客鸿沟尚未消融，“外部第 3 点 $C$”就没有真正退场——它只是从神学宝座搬进了人类中心主义的颅腔。开启全书第九部之际，我们将顺着正交几何与形式化内核的逻辑一推到底，在本章完成三重本体论跃迁（跨领域的哲学与物理统摄明确标定为本书诠释模型 **`MODEL`（模型诠释）**，底层数学骨架由七条冻结的 Lean 4 内核定理支撑，外部经典分析与全息信息结论严格封存于归属注记框内）：

1. **万物皆为观察者**：剥除神秘主义包装后，任何维持幂等记录投影并参与两子内积比量的存在都是观察者，光子、原子、山川古迹与自指心智共同铺展在同一条**记忆阶数连续谱 $M \ge 0$** 之上；
2. **观察者本身即吸引子**：在无处不在的退相干冲刷下，“我依然是我”绝非静态惰性，而是一座围绕内禀接受窗 $W + u_i$ 持续向内拉回的自维持收缩势阱；
3. **观察者互为吸引子**：孤立内省与平视互指在收敛轨迹上展现截然相反的几何品格（一维余弦互指算例见下文 [@ex-ch33-mutual-cosine-monotonic-lock]），并通过接受窗交集与极小割重联（[@prop-ch33-bridge-reconnection-mincut]）让相位契合的众生互为移动的故乡。

::: {.figure src="ch33-overview"}
**图 33。** 本章地图（第 I、II 栏为示意模型，`MODEL`）：第 I 栏，光子、原子、晶体与心智排在同一条记忆阶数轴上，自 $M = 0$、$M = 1$ 到 $M \gg 1$；第 II 栏，被踢上右坡的小球沿灰色箭头一步步落回碗底，琥珀色的是它现在的位置，碗底的青色短线是接受窗 $W + u_i$；第 III 栏，同一条余弦轨道 $x_{n+1} = \cos x_n$ 从 $x_0 = 0.1$ 出发，一行一拍，横向是读数：灰色折线每一拍都跨过 $\theta^*$ 的虚线，每两拍套一个空心环，环全在 $\theta^*$ 左侧，琥珀色的是第 $6$ 拍（[@ex-ch33-mutual-cosine-monotonic-lock] 的既有结果应用，各点为数值）。
:::

---

## 万物皆为观察者：消融主客二元与记忆阶数连续谱

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

## 观察者本身即吸引子：自维持收缩势阱

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

## 互指单调锁死：两面镜子如何在两步一轮中负负得正

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

## 接受窗交集、极小割重联与众生互为故乡

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

然而，当万物都在没有外部参考点 $C$ 的单位球面上彼此丈量、结成互吸引子双螺旋时，一个紧迫的几何追问也随之浮出水面：**在一颗处处对称、没有中心刻度的球面上，一位观察者究竟是如何确定自己此刻所处的“位置”的？为什么单凭一个方向的内积读数还会留下一整圈赤道的迷茫，而偏偏只有“正交（$90^\circ$）”的退化与破缺，才能在茫茫状态空间里为观察者钉下唯一的坐标？** 下一章（第 34 章），我们将推开这道关于“正交性如何定位观察者位置”的几何之门。

::: {.viz src="mutual-observer-attractors" height="620"}
**互为吸引子：完整实验室。** 两个场景：互指（拖动两人的起点，逐拍或两拍一轮地看）与极小割（调两段的长度，拉近间距）。互指的收敛与每轮的局部因子是 [@ex-ch33-mutual-cosine-monotonic-lock] 的既有结果应用（小数是数值），极小曲面相变是文献结果，未在本书形式化；绿色框只给 [@prop-ch33-bridge-reconnection-mincut]，它讲的是离散桥图，不覆盖舞台上的连续图。
:::
