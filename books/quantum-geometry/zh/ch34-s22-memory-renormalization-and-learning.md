# 34.10 记忆重整化与预测蒸馏：八度粗粒化、充分统计与兰道尔散热 {#sec-ch34-memory-renormalization-and-learning}

在 [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 中，我们通过杨辉三角 `1—3—3—1` 的外代数维数回文与幂等记录捏合，提出了“三维饱和驻波体在更高概念层级归零为单自由度点”（$\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$，[@thm-ch34-point-volume-octave-and-particle-field]）的跨尺度八度螺旋；而在 [§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus) 中，我们又看到寄存器容量受限（阶数为 $M$）的内嵌观察者为了避免局部格拉姆窗口 $\mathcal{W}_M$ 陷入过约束芝诺—拉普拉斯死锁，必须不断释放最陈旧的历史锚点并向环境支付兰道尔擦除热。然而，若把这两节直接拼在一起，一道攸关“学习与认知何以可能”的机制缺口便暴露无遗：**单纯按时间先后丢弃最老锚点的滑动截断（FIFO 遗忘）虽然重开了当下可行走廊，却会把隐藏在早期跨步关联中的长程规律一并抹除；反过来，静态的八度代数等同 $\Lambda^3_\ell \equiv \Lambda^0_{\ell+1}$ 若不交代内部微弧自由度往何处去，又会违背有限寄存器容量上限。**

连接这两端的核心桥梁，正是受限观察者的**记忆重整化与预测蒸馏（Memory Renormalization and Predictive Distillation）**（`MODEL`）：面对即将溢出的有限格拉姆窗口 $\mathcal{W}_M$，观察者既不把过往微观轨迹原封不动地死记硬背，也不盲目斩断最老的时间切片，而是将一组已闭合的低层历史微态折叠提炼为一枚面向未来可观测目标的**预测充分统计量（Predictive Sufficient Statistic）概念锚点** $q_\star(h) \in \Lambda^0_{\ell+1}$ 留驻窗内，同时仅把对未来预测统计冗余的纤维余项 $r_\star(h)$ 通过偏迹排入热浴并支付最小兰道尔热账单。

## 34.10.1 双阶段纤维分解、兰道尔条件散热与可观测量核不变判据 {#sec-ch34-22-1}

要把“提炼概念”与“物理遗忘”的账目算清，第一步必须把**纯逻辑重编码**与**不可逆物理擦除**在算子与热力学层面上严格剥离开来。设有限观察者在某段历史窗口内积累的原始微观历史空间为 $H$（先验概率质量函数为 $\mu$），粗粒化概念读出映射为 $q : H \to Q$，待预测的未来目标变量为 $Y : H \to A$。

在逻辑与代数结构上，概念读出 $q$ 将原始历史集 $H$ 按像点 $c \in Q$ 划分为两两不相交的原像纤维 $q^{-1}(c)$。若为每条纤维选定局部纤维内坐标 $r(h)$，则单步概念蒸馏总能拆解为前后两个物理性质截然不同的阶段（`手工推导` + `MODEL`）：

1. **第一阶段：双射纤维坐标重构 $h \mapsto \bigl(q(h),\, r(h)\bigr)$（逻辑重命名，零热耗散 $\Delta Q_{\mathrm{relabel}} = 0$）**。
   只要保留完整的纤维内余项坐标 $r(h)$，原始历史 $h$ 与依值对 $\bigl(q(h), r(h)\bigr)$ 便构成严格双射（`concept_fiber_decomposition` 给出类型论纤维等价 $X \simeq \Sigma b : B,\, \operatorname{ConceptFiber}(q_C, b)$）；而将离散态嵌入为希尔伯特寄存器中的计算基矢 $\mathcal{H}_H \cong \bigoplus_{c \in Q}\mathcal{H}_{q^{-1}(c)}$，则是独立的有限维 `MODEL` + `手工推导` 实现，当各纤维等势 $\lvert q^{-1}(c)\rvert = \dim\mathcal{H}_R$（如下文均匀三比特奇偶算例，或对不等势纤维经等距辅助态补齐后）即直化为张量积空间 $\mathcal{H}_Q \otimes \mathcal{H}_R$ 内的幺正基变换 $U_{\mathrm{split}}$。由于双射重编码与幺正旋转（或等距嵌入）完全可逆，系统总熵严格守恒（$H(Q, R) = H(H)$，$\Delta S_{\mathrm{sys}} = 0$），既不丢失任何关于未来目标 $Y$ 的信息，也不向环境排放分毫热量（$\Delta Q_{\mathrm{relabel}} = 0$）；但代价是物理寄存器占用位数丝毫未减，格拉姆窗口依然满载。
2. **第二阶段：冗余纤维寄存器 $R$ 的热浴物理擦除 $(q, r) \mapsto (q, 0_R)$（释放槽位，耗散条件熵热 $\Delta Q_{\mathrm{bath}} \ge k_B T \ln 2 \cdot H(H \mid Q)$）**。
   为了真正腾出寄存器槽位以接纳后续新观测，观察者必须将承载纤维内微观细节的子寄存器 $R$ 与温度为 $T$（逆温 $\beta = (k_B T)^{-1}$）的外部热浴耦合，不可逆地重置回标准空白态 $0_R$，仅在窗口中保留高层概念坐标 $q(h) \in Q$。因 $q$ 是 $H$ 的确定性读出函数，联合熵满足 $H(H, Q) = H(H)$，擦除纤维寄存器 $R$ 后观察者记忆的净熵变（以自然对数 $\mathrm{nats}$ 计）精确等于条件香农熵的负值：

   $$
   \Delta S_{\mathrm{sys}} \;=\; S(Q) - S(H) \;=\; -S(H \mid Q) \;=\; -(\ln 2)\,H(H \mid Q) \;\le\; 0,
   $$

   其中 $H(H \mid Q) := \sum_{c \in Q} \mathbb{P}(Q = c)\,H(H \mid Q = c)$ 以 $\mathrm{bits}$ 为单位计量被折叠进概念 $Q$ 内部的平均纤维微观冗余度。将其代入热浴与双体幺正演化平衡恒等式——注意在简并记忆能级下重置 $R$ 时，达到下述条件熵界需利用留存的 $Q$ 作为边信息（`MODEL` + `手工推导`）——立即导出擦除冗余纤维所需的最小物理散热下界：

   $$
   \Delta Q_{\mathrm{bath}} \;\ge\; k_B T \ln 2 \cdot H(H \mid Q).
   $$

然而，并非任何满足容量上限的粗粒化映射 $q : H \to Q$ 都配称为“有效概念”。怎样的纤维擦除才不会误伤未来预测？若系统状态向量在有限维内积空间 $E$ 中按线性动力学算子 $T : E \to E$ 逐步推进，并在每个未来时刻 $k \ge 0$ 由即时可见读出算子 $C : E \to W$（由一组可见效应向量张成）提取观测期望值，则两条初始历史表征 $x, x' \in E$ 在**未来一切时刻**给出完全相同的观测期望序列 $(C T^k x)_{k \ge 0} = (C T^k x')_{k \ge 0}$，当且仅当差向量 $x - x'$ 落入多步**不可观测核（Unobservable Kernel）**：

$$
K \;:=\; \bigcap_{k \ge 0} \ker(C T^k).
$$

子空间 $K$ 天然满足动力学正向不变性 $T(K) \subseteq K$（因 $v \in K \implies \forall k \ge 0,\; C T^k(T v) = C T^{k+1} v = 0 \implies T v \in K$），故商映射 $\pi_K : E \to E/K$ 可在压缩后的概念商空间 $E/K$ 上诱导出零预测损失的良定粗粒演化律 $\overline{T}(x + K) := T x + K$。反之，若观察者误将一个**非 $T$-不变**的单步盲区子空间当作可擦除纤维抹去，一步演化之后潜伏在盲区内的差异分量便会旋入可见子空间，造成不可逆的预测崩塌。上述纤维分解、条件混杂度单调性、量子信道数据处理不等式、兰道尔收支恒等式、整表拷贝非预见性裁定与未来期望词正交残差的形式契约归档如下：

::: {.remark #rem-ch34-memory-distillation-contract title="记忆蒸馏的形式契约：纤维分解、混杂度单调律、兰道尔收支与不可观测核不变判据"}
本节关于有限记忆蒸馏与概念重整化的数学推演严格依托以下六条内核定理声明，并划清与多步动力学核及反例的精确边界：

1. **概念原像纤维分解（[`concept_fiber_decomposition`](lean:D5/S3/ConceptDynamics/ConceptFiberDecomposition.concept_fiber_decomposition)）**：对任意对象类型 $X$、坐标类型 $B$ 与概念读出 $q_C : \operatorname{Concept}(X, B)$，记坐标 $b \in B$ 上的依值原像纤维为 $\operatorname{ConceptFiber}(q_C, b) := \Sigma'(x : X),\; q_C(x) = b$，则存在非空类型等价 $\operatorname{Nonempty}\bigl(X \simeq \Sigma b : B,\; \operatorname{ConceptFiber}(q_C, b)\bigr)$。这为第一阶段零热耗散的双射重编码 $h \leftrightarrow \bigl(q(h), r(h)\bigr)$ 提供了类型论基础。
2. **因子加细下单调压低条件逻辑混杂度（[`refinement_impurity_monotone`](lean:D5/S3/ConceptDynamics/Information/RefinementImpurityMonotonicity.refinement_impurity_monotone)）**：对任意概率质量函数 $\mu : \operatorname{PMF} X$、粗概念 $\mathrm{coarse} : \operatorname{Concept}(X, C)$、细概念 $\mathrm{refined} : \operatorname{Concept}(X, D)$ 与目标概念 $\mathrm{target} : \operatorname{Concept}(X, A)$，只要满足因子分解加细关系 $\operatorname{Refines}(\mathrm{coarse}, \mathrm{refined})$（即存在 $\mathrm{factor} : D \to C$ 使 $\mathrm{coarse} = \mathrm{factor} \circ \mathrm{refined}$），目标相对的条件逻辑（Gini）混杂度在粗粒化下单调不减（即在因子加细下单调不增）：

   $$
   \operatorname{conditionalLogicalImpurity}(\mu, \mathrm{refined}, \mathrm{target}) \;\le\; \operatorname{conditionalLogicalImpurity}(\mu, \mathrm{coarse}, \mathrm{target}).
   $$

   因此任何盲目粗粒化都会面临推高目标混杂度的风险；区别于 `refinement_impurity_monotone` 的不等式本身，由 Gini 混杂度的严格凹性可知，粗化保持零附加 Gini 混杂度损失（上式取等）当且仅当每一粗纤维内被合并的各正概率细子纤维共享完全一致的目标后验分布（预测充分统计条件，也可由下文的精确恒等式导出）。

   **二次评分的文献与适用范围。** Gneiting–Raftery 的 [Example 1](https://sites.stat.washington.edu/raftery/Research/PDF/Gneiting2007jasa.pdf#page=5)（DOI: [10.1198/016214506000001437](https://doi.org/10.1198/016214506000001437)）将多类别二次评分的散度识别为后验概率向量之间的平方欧氏距离。Bröcker 的 [§3、式 (15) 与附录 C](https://arxiv.org/pdf/0806.0813v2#page=7)（期刊 DOI: [10.1002/qj.456](https://doi.org/10.1002/qj.456)）给出预测充分性下的期望散度分解；其 §2 明确假设目标值集合有限。这些结果解释了有限目标情形中“没有额外二次预测损失”与“后验一致”的联系，不把可靠性、充分性与确定性混为一谈。Steinwart–Ziegel 的[定理 1.1、式 (4)](https://arxiv.org/html/1712.05279#S1.Thmthm1)（期刊 DOI [10.1016/j.acha.2019.11.005](https://doi.org/10.1016/j.acha.2019.11.005)）对可测正定核，在两分布下 $\sqrt{k(x,x)}$ 均可积时，把期望评分差写成核均值嵌入距离平方的一半。对可数离散目标，取两目标相同则为 1、否则为 0 的核，均值嵌入就是各目标的概率坐标。PMF 的正质量支撑可数，其目标像也可数，因此可在这个目标像上使用该核。下文给出对应的概率质量函数恒等式。

   **粗化损失的精确大小（[`conditional_gini_exact_defect`](lean:D5/S3/ConceptDynamics/Information/ConditionalGiniDefect.conditional_gini_exact_defect)）。** 令 $r:X	o D$ 为细读出，$f:D	o C$ 为粗化，$t:X	o A$ 为目标。对同一个任意概率质量函数，记 $M(d)$ 为细纤维质量，$P_d(a)$ 与 $Q_c(a)$ 分别为细、粗纤维中的目标后验。每个后验坐标按联合质量除以对应纤维质量定义，零质量时取 $0$。若 $I(s)$ 表示读出 $s$ 的条件逻辑混杂度，则有
   $$
   I(f\circ r)=I(r)+\sum_d\sum_a M(d)\,\operatorname{ofReal}\!\left[
      \bigl(\operatorname{toReal}P_d(a)-\operatorname{toReal}Q_{f(d)}(a)\bigr)^2
   \right].
   $$

   对每个目标值，后验坐标在正质量纤维上给出目标指标函数的条件期望。粗、细条件期望的勾股分解给出这一坐标的平方损失增量。对所有目标值求和时，指标函数的条件平方损失之和恰是原定义的成对混杂度。对一个正质量纤维，令 $q_a$ 为其后验，则这个和是 $\sum_a q_a(1-q_a)=1-\sum_a q_a^2$，即两次独立按该后验取样时目标不同的概率。按细纤维分组即得到右侧加权和。

   右侧求和使用扩展非负实数，每项在取平方前先把两个后验转为实数。零质量纤维的贡献为零。对每个正质量细纤维，零损失恰要求它的后验等于所属粗纤维的后验。由于粗后验是各正质量细后验按质量加权的平均，这等价于同一个粗纤维内所有正质量细后验一致。结论适用于任意类型上的概率质量函数和确定性读出。

3. **支撑感知量子相对熵的信道数据处理不等式（[`extended_quantum_relative_entropy_channel_dpi`](lean:D5/S3/Quantum/Divergence/CanonicalChannelDPI.extended_quantum_relative_entropy_channel_dpi)）**：对非空有限可判等指标集 $a, b$、任意完全正保迹量子信道 $\Phi : \operatorname{QuantumChannel}(a, b)$ 及密度态 $\rho, \sigma : \operatorname{DensityState} a$，带支撑约定的相对熵满足 $D_{\mathrm{ext}}\bigl(\Phi(\rho) \,\|\, \Phi(\sigma)\bigr) \le D_{\mathrm{ext}}(\rho \,\|\, \sigma)$。将 `extended_quantum_relative_entropy_channel_dpi` 作用于经典—量子联合态（$\rho_{YH}$ 对照 $\rho_Y \otimes \rho_H$）上的目标保持信道 $(\mathrm{id}_Y \otimes \mathcal{E}_M)$，即导出预测互信息单调不增 $I(Y; \mathcal{E}_M(H)) \le I(Y; H)$（`手工推导`应用）：一旦第二阶段物理擦除误删了携带目标关联的纤维分量，后续任何局域算法或后处理信道均不可能凭空找回已散失的预测信息。
4. **热浴与幺正收支下的精确兰道尔恒等式（[`landauer_identity_from_balances`](lean:D5/S3/DivergenceSupport/LandauerIdentity.landauer_identity_from_balances)）**：对实数 $\beta, Q, \Delta S_{\mathrm{sys}}, \Delta S_{\mathrm{res}}, I_{\mathrm{mut}}, D_{\mathrm{res}} \in \mathbb{R}$，只要满足热浴热量—熵平衡 $\beta Q = \Delta S_{\mathrm{res}} + D_{\mathrm{res}}$ 与双体幺正熵平衡 $I_{\mathrm{mut}} = \Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{res}}$，恒有精确等式

   $$
   \beta Q \;=\; -\Delta S_{\mathrm{sys}} + I_{\mathrm{mut}} + D_{\mathrm{res}}.
   $$

   结合互信息非负 $I_{\mathrm{mut}} \ge 0$、热浴相对熵非负 $D_{\mathrm{res}} \ge 0$ 与第二阶段纤维擦除熵变 $\Delta S_{\mathrm{sys}} = -(\ln 2)\,H(H \mid Q)$（`手工推导`），在正温 $\beta = (k_B T)^{-1} > 0$ 下立得 $\Delta Q_{\mathrm{bath}} \ge k_B T \ln 2 \cdot H(H \mid Q)$，且仅当擦除后记忆—热浴零残留关联（$I_{\mathrm{mut}} = 0$）且热浴无偏离（$D_{\mathrm{res}} = 0$）时取等。
5. **整表拷贝的事后零损失与非预见性失效裁定（[`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure)）**：在有限可判等记录域 $Z$ 上，若承诺结构 $\mathrm{commitment} : \operatorname{CopyCommitment} Z$ 纳入了全表依赖（$\operatorname{IncorporatesTableCopy}(\mathrm{commitment})$，即 $Z \subseteq \mathrm{evidenceDependencies}$），则整表拷贝 $\operatorname{tableCopy}(\mathrm{comparison})$ 虽满足事后总损失归零 $\operatorname{retrospectiveLoss}(\mathrm{comparison}, \operatorname{tableCopy}(\mathrm{comparison})) = 0$，却在每一点违反非预见性（$\forall z \in Z,\; \neg\operatorname{NonAnticipating}(\mathrm{commitment}, z)$），且精确成立如下**否定全称蕴涵命题**：

   $$
   \neg\Bigl(\operatorname{retrospectiveLoss}\bigl(\mathrm{comparison}, \operatorname{tableCopy}(\mathrm{comparison})\bigr) = 0 \;\longrightarrow\; \forall R : (Z \to \mathrm{Answer}) \to \mathbb{N},\; \operatorname{PositiveProspectiveGain}\bigl(R, \operatorname{tableCopy}(\mathrm{comparison})\bigr)\Bigr).
   $$

   须严格忠实于该量词结构：定理否定的是“单凭事后零损失即可无条件担保对**一切**前瞻收益泛函 $R$ 均取得正收益 $0 < R(\operatorname{tableCopy})$”（内核证明以恒零收益泛函 $R_0 = (\_ \mapsto 0)$ 给出反例见证），而非断言所有前瞻泛函在整表拷贝上恒为零。其认识论警示在于：把待判比较答案整表偷渡进承诺（[§36.5](ch38-s04-lookup-degradation.md#sec-ch38-pnp-lookup-degradation)）会处处破坏非预见因果纪律，单凭事后查表零损失本身绝不蕴涵合法的前瞻泛化能力。
6. **有限未来期望词的正交残差刻画与双比特非不变核反例（[`future_word_orthogonal_residual`](lean:D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual) + `手工推导`）**：在标量域 $\mathbb{K}$ 上的有限维内积空间 $E$ 中，对可见效应族 $\mathrm{effect} : \operatorname{Fin}(m+1) \to E$ 与状态表示 $X : \mathrm{State} \to E$，两态 $\rho, \sigma$ 的有限未来期望词相等 $\operatorname{futureExpectationWord}(\mathrm{effect}, X, \rho) = \operatorname{futureExpectationWord}(\mathrm{effect}, X, \sigma)$ 当且仅当 $X(\rho) - X(\sigma) \in (\operatorname{span}_{\mathbb{K}}\operatorname{range}(\mathrm{effect}))^\perp$，亦当且仅当二者在可见效应子空间上的正交投影相等。由有限指标 $\operatorname{Fin}(m+1)$ 的 `future_word_orthogonal_residual` 过渡到全时间海森堡轨道 $\{(T^*)^k \mathrm{effect}_j\}_{k \ge 0}$ 依赖 $\dim E < \infty$ 下的有限维张成稳定化（有限步长即可张成整条轨道），其公共正交残差遂给出 $T$-不变不可观测核 $K = \bigcap_{k \ge 0}\ker(C T^k)$（卡尔曼可观测性分解，`手工推导` + `文献结果`）。
   **双比特非 $T$-不变反例检核（`手工推导`）**：在 $E = \mathbb{R}^2$ 上取双比特嵌入态 $(x_1, x_2) \in \{0, 1\}^2$，设单拍即时读出为 $C(x_1, x_2) = x_1$，单步移位动力学为 $T(x_1, x_2) = (x_2, 0)$。在 $k = 0$ 时刻，单步即时盲区为 $N_0 = \ker C = \{(0, x_2)\} = \operatorname{span}\{\mathbf{e}_2\}$；但 $T(0, 1) = (1, 0) \notin N_0$，故 $N_0$ **不是 $T$-不变子空间**，真正的多步不可观测核是 $K = \ker C \cap \ker(C T) = \operatorname{span}\{\mathbf{e}_2\} \cap \operatorname{span}\{\mathbf{e}_1\} = \{(0, 0)\}$！若观察者在 $k = 0$ 误把 $N_0$ 当作冗余纤维擦除（将 $(0, 0)$ 与 $(0, 1)$ 折叠为同一概念），在 $k = 0$ 虽无即时误差，到 $k = 1$ 时刻却立刻出现 $C T(0, 0) = 0 \neq 1 = C T(0, 1)$ 的预测失效。
:::

**有限目标集上的最佳总变差界。** [Lean 总变差界](lean:D5/S3/ConceptDynamics/Information/ConditionalGiniTV.weighted_posterior_totalVariation_sq_le_gini_defect) 对概率质量函数、细读出 $r$ 和确定性粗化 $f$，记 $M(d)$ 为细纤维质量，$P_d$ 与 $Q_{f(d)}$ 为细、粗目标后验。每一坐标取联合质量除以对应的纤维质量，零质量时取零。令 $I(s)$ 表示固定目标下读出 $s$ 的条件逻辑混杂度，$\Delta=I(f\circ r)-I(r)$，所有差值用实数计算。设目标值集合有 $n\ge 2$ 个元素，记 $T=\sum_d M(d)\operatorname{TV}(P_d,Q_{f(d)})$，其中 $\operatorname{TV}(u,v)=\tfrac12\sum_a|u(a)-v(a)|$。则

$$
T^2\le \frac{\lfloor n^2/4\rfloor}{n}\,\Delta.
$$

在正质量细纤维中，后验之差 $z=P_d-Q_{f(d)}$ 的坐标和为零。若 $S$ 是 $z$ 的正坐标集，$j=|S|$，则 $\operatorname{TV}=\sum_{a\in S}z(a)$。从 $S$ 的指标中减去 $j/n$，这一内积保持原值，指标的平方范数成为 $j(n-j)/n$。柯西–施瓦茨不等式给出该纤维的界，再按细纤维质量加权并使用精确混杂度增量，即得上式。零质量纤维的权重为零。

常数在每个 $n$ 都可达到。令 $k=\lfloor n/2\rfloor$，把目标集分成大小为 $k$ 和 $n-k$ 的两块，在每块内均匀分配总质量 $1/2$。细读出报告所属块，粗读出把两块合并。每个细后验与粗后验的总变差都是 $1/2$，且 $\Delta=n/[4k(n-k)]$。因此当偶数 $n$ 增大时，$\Delta=1/n$ 趋向零，$T$ 始终为 $1/2$。任何随 $\Delta$ 趋于零而趋于零的统一上界，都需要限制目标集的大小或引入额外结构。 [Lean 取等构造](lean:D5/S3/ConceptDynamics/Information/ConditionalGiniTV.conditional_gini_tv_attained)

$T$ 也等于原联合律 $(d,a)\mapsto M(d)P_d(a)$ 与替换后的联合律 $(d,a)\mapsto M(d)Q_{f(d)}(a)$ 之间的总变差。按细纤维分组半绝对差和即可得到这一解释。这是给定概率律和给定粗化的平均后验总变差，也等于联合事件概率变化的最大值。总变差的半 $\ell^1$ 约定见 Gibbs 与 Su 的[原文第 7 页](https://arxiv.org/pdf/math/0209021#page=7)。

**各纤维共用同一个重编码分布。** 若从有限个目标重编码 $h$ 中随机选择，并且每一对不同的目标值都以同一个概率 $q$ 被分开，则对固定读出 $s$，目标改用 $h\circ t$ 后的期望混杂度是 $qI(s)$。在有序对公式中，目标相同的对仍贡献零，目标不同的对则按其质量乘以 $q$。读出纤维的质量与 $h$ 无关，因此可以先对重编码取平均再累加质量，零质量纤维也包含在等式内。各混杂度均在 $[0,1]$ 内。对使用同一重编码分布的细、粗读出分别应用等式并相减，得到期望 Gini 混杂度增量 $q\Delta$。

**指定大小的二值事件。** 若目标字母表 $A$ 有 $n\ge2$ 个值，固定整数 $1\le m<n$，并令 $\Delta_S$ 表示用 $x\mapsto\mathbf1_{\{t(x)\in S\}}$ 替换目标后所得的 Gini 增量。在所有 $m$ 元子集 $S\subset A$ 中均匀抽取时，一对不同的目标值被分开的方式有 $2\binom{n-2}{m-1}$ 种。先选这两个值中的哪一个在 $S$ 中，再从其余 $n-2$ 个值选 $m-1$ 个。因此

$$
\mathbb E_{|S|=m}\Delta_S
 =\frac{2\binom{n-2}{m-1}}{\binom{n}{m}}\Delta
 =\frac{2m(n-m)}{n(n-1)}\Delta.
$$

有限平均中至少有一项达到或超过该值，所以一个大小为 $m$ 的事件即可保留这一比例的缺陷。此系数对任意给定的 $n,m$ 都是最优的。取 $X=A$ 上的均匀分布，让细读出和目标都是恒等映射，并令粗读出为常值。细读出的每个纤维是单点，两种目标的细混杂度均为零。粗纤维中，两次独立抽样的有序对共有 $n^2$ 个等可能取值。原目标有 $n(n-1)$ 个不同值对，二值目标有 $2m(n-m)$ 个跨越 $S$ 边界的对。于是 $\Delta=(n-1)/n>0$，且每个大小为 $m$ 的 $S$ 都给出 $\Delta_S=2m(n-m)/n^2$。这个保证适用于给定概率律与粗化后选出的单个事件，该事件在所有纤维中相同。当 $m$ 固定而 $n$ 增大时，保证比例趋于零。

**固定大小的二划分保留哪些信息？** [Lean 加权割方差公式](lean:D5/S3/Combinatorics/Graph/Incidence/FixedSizeCutVariance.fixed_size_cut_variance) 对每个读出 $s$，先按读出纤维的质量抽取一个纤维，再从该纤维独立抽取两次。记所得目标有序对的联合律为 $Q_s(a,b)$。对不同目标值构成的无向边 $\{a,b\}$，赋权
$w_{ab}=2\bigl(Q_{f\circ r}(a,b)-Q_r(a,b)\bigr)$。两次抽样的顺序可交换，因此把有序对按无向边分组即得 $\Delta=\sum_{a<b}w_{ab}$。同一推导给出 $\Delta_S=C_w(S)$，其中 $C_w(S)$ 是恰有一个端点在 $S$ 内的边权总和。边权允许为负。

设 $n\ge4$ 且 $2\le m\le n-2$。记 $\bar w$ 为全部无向边的平均权，令
$u_a=\sum_{b\ne a}(w_{ab}-\bar w)/(n-2)$，再令
$z_{ab}=w_{ab}-\bar w-u_a-u_b$。每个顶点的残差边权总和为零。均匀抽取大小为 $m$ 的集合 $S$ 时，

$$
\operatorname{Var}(C_w(S))
=\frac{m(n-m)(n-2m)^2}{n(n-1)(n-2)}
   \sum_{a<b}(u_a+u_b)^2
+\frac{4m(m-1)(n-m)(n-m-1)}{n(n-1)(n-2)(n-3)}
   \sum_{a<b}z_{ab}^2.
$$

两条边同时跨越 $S$ 边界的概率取决于它们重合、相交于一个顶点还是不相交。按这三类计数可将方差写成关于无向边权和顶点关联的二次型。去掉边权均值后，度数贡献与零度数残差正交，得到上式。若 $2m\ne n$，两个系数都为正，各事件的缺陷增量完全相同当且仅当边权恒定。若 $2m=n$，度数项消失，此时零度数残差为零已足够。给每个顶点加上一项 $u_a$，并将两端的贡献相加到边上，均衡二划分只读到该项的总和。这里的恢复结论针对边权。不同概率律还可能给出同一组边权。

**哪些二阶矩能来自同一个后验混合？** 若信号 $s$ 的权重为 $\lambda_s$，后验概率向量为 $v_s$，则先验与二阶矩满足
$p=\sum_s\lambda_s v_s$ 和 $M=\sum_s\lambda_s v_s v_s^{\mathsf T}$。因此 $M$ 逐项非负，行和为 $p$，且 $M-pp^{\mathsf T}$ 半正定。后一条件来自后验向量围绕 $p$ 的协方差。给定一组具有该重心的有限后验，可在状态 $(s,a)$ 上赋质量 $\lambda_s v_s(a)$，以 $s$ 为读出、$a$ 为目标实现它。这是 Kamenica 与 Gentzkow 所用的有限后验分裂构造。 [原文命题 1 与附录 A](https://web.stanford.edu/~gentzkow/research/BayesianPersuasion.pdf#page=6)

这些矩阵条件仍容许无法由有限后验混合实现的二阶矩。取五个目标，先验均为 $1/5$。令 $W$ 为五边形的邻接矩阵，置 $M=(5I+3W)/55$。每行和为 $1/5$。设 $J$ 为全一矩阵，$H=W+2I-(4/5)J$。五边形的两步计数给出 $W^2=I+J-W$ 与 $WJ=JW=2J$，于是
$M-pp^{\mathsf T}=H^{\mathsf T}H/55$。

如果 $M$ 来自有限后验混合，非边位置的矩阵项为零，而每个后验对该项的贡献都非负。因此每个正权重后验的支撑不能同时包含两个不相邻的顶点。五环没有三角形，所以该支撑要么是单个顶点，要么是一条边的两个端点。对这样的后验，坐标的平方和至少是边上乘积和的两倍。取加权平均便要求 $\operatorname{tr}M\ge2\sum_{\{a,b\}\text{ 为边}}M_{ab}$。这里两边分别为 $25/55$ 和 $30/55$，因此这个二阶矩无法由有限后验混合实现。这个例子把固定先验的后验约束接到了五阶完全正矩阵与双非负矩阵的经典区分上。 [Burer、Anstreicher 与 Dür 原文](https://doi.org/10.1016/j.laa.2009.05.021) [Lean 反例](lean:D5/S3/ConceptDynamics/ObservationOrder/PosteriorMomentObstruction.result)

**复二稀疏分解何时给出后验混合？** ([Lean 重构定理](lean:D5/S3/Quantum/Measurement/FactorWidth/NonnegativeFactorWidthTwo.nonnegative_two_sparse_gram)) 设 $X$ 是逐项非负的 $n\times n$ 实矩阵。若把 $X$ 视为复矩阵后可写成有限和 $\sum_t w_t w_t^*$，且每个 $w_t$ 最多有两个非零坐标，则存在至多 $n+\binom{n}{2}$ 个非负实向量 $b_s$，每个至多有两个非零坐标，并且 $X=\sum_s b_s b_s^{\mathsf T}$。

固定一对不同坐标 $\{i,j\}$。只有支撑恰为这一对的复向量会对 $X_{ij}$ 有贡献。在这一组内，记两个坐标的模平方和为 $A$ 和 $B$，交叉项的和为 $c=X_{ij}\ge 0$。由柯西–施瓦茨不等式，$c^2\le AB$。若 $A>0$，取新因子的两个坐标为 $\sqrt{A}$ 和 $c/\sqrt{A}$。它们的乘积正好是 $c$，平方分别为 $A$ 和 $c^2/A\le B$。若 $A=0$，则 $c=0$，这一对可用零向量。各对的分组互不相交，因此每个坐标用掉的对角质量至多为原矩阵的对角项。每个坐标再用一个单坐标因子补足差额。这一构造逐项保留 $X$，所给因子数是上界。经典比较矩阵判据及无三角形支撑图的情形见 Shaked-Monderer 第 4 节。[原文](https://arxiv.org/pdf/2009.12290v2#page=8)

Johnston、Moein 和 Plosker 的命题 2 对带符号实因子使用了同样的支撑分组。[原文](https://njohnston.ca/factor_width_rank.pdf#page=5)

若 $X$ 的总和为 $1$，令 $a_s=\sum_i b_s(i)$，对 $a_s>0$ 的因子取后验 $v_s=b_s/a_s$ 和信号权重 $\lambda_s=a_s^2$。零因子可以略去。由矩阵等式求和得 $\sum_s\lambda_s=1$，逐行求和得 $\sum_s\lambda_s v_s(i)=\sum_j X_{ij}$。因此同一矩阵可由有限后验混合实现，先验恰为其行和，而且每个后验最多支持两个目标。这个充分条件额外需要复二稀疏分解。

**五目标反例的因子宽度恰为三。** ([Lean 宽度定理](lean:D5/S3/Quantum/Measurement/FactorWidth/FiveCyclePosteriorFactorWidth.cycle_moment_width_exactly_three)) 仍取 $M=(5I+3W)/55$。把 $(1,2,1,0,0)$ 和 $(2,2,0,-1,0)$ 各循环平移五次，将两组向量各自的外积求和。第一组在对角、边、非边位置的条目分别是 $6,4,1$，第二组分别是 $9,4,-4$。两组外积和乘以 $12/1100$ 和 $3/1100$ 后相加，再加 $I/1100$。非边恰好抵消，边条目是 $60/1100=3/55$，对角条目是 $100/1100=5/55$。这给出每个向量最多三个非零坐标的实 Gram 分解。第二组的负坐标使非边抵消成为可能。

若一个复向量最多有两个非零坐标，其外积的对角和减去五条边条目实部之和的两倍，总是非负。支撑在一条边的两端时，该差值就是两坐标之差的模平方。其余支撑没有边项，只留下模平方和。对所有因子求和便得到矩阵必须满足的不等式。$M$ 的差值为 $25/55-30/55=-1/11$，所以它的复因子宽度至少为三。结合上一构造得到恰为三。同一个矩阵仍违反上文的后验可实现性条件。

**固定先验下的最近可实现后验矩。** ([Lean 距离定理](lean:D5/S3/ConceptDynamics/ObservationOrder/PosteriorMomentDistance.projected_moment_unique)) 保持均匀先验，令 $M(t)=(1/5-2t)I+tW$，并记 $\delta=20t-1$。当 $1/20\le t\le 11/160$ 时，在所有同先验的有限后验二阶矩中，$M(t)$ 的唯一最近矩阵 $P(t)$ 在对角、边及非边上的条目分别为

$$
\frac1{10}-\frac{\delta}{15},\qquad \frac1{20},\qquad \frac{\delta}{30}.
$$

这里取全部 $25$ 个有序条目的平方差之和，即平方 Frobenius 距离。最小值是 $\delta^2/24$，在原反例 $t=3/55$ 处等于 $1/2904$。竞争矩阵允许在非边上取正值。

对任意概率向量 $x$，五环的团数为二，Motzkin–Straus 定理给出 $\sum_{i\bmod 5}x_i x_{i+1}\le 1/4$。对后验外积取期望可得 $\langle N,X\rangle_F\ge-1/5$，其中 $N=(4/5)J-2W$，$\langle\cdot,\cdot\rangle_F$ 是逐项乘积之和。直接求和得 $\langle N,P(t)\rangle_F=-1/5$、$\|N\|_F^2=24$ 及 $P(t)-M(t)=(\delta/24)N$。展开平方距离可得

$$
\|X-M(t)\|_F^2=\|X-P(t)\|_F^2+\frac{\delta^2}{24}
+\frac{\delta}{12}\bigl(\langle N,X\rangle_F+1/5\bigr).
$$

后两项中的校正项非负。若达到下界，则 $\|X-P(t)\|_F^2=0$，即 $X=P(t)$。 [Motzkin–Straus，§1 定理 1](https://doi.org/10.4153/CJM-1965-053-6)

令 $w=8\delta/3$。把质量 $1-w$ 均分给 $(1/2,1/2,0,0,0)$ 的五个循环位移，把质量 $w$ 均分给 $(1/4,1/2,1/4,0,0)$ 的五个位移。两组各自的平均后验均为均匀先验，平均外积在对角、边及非边上的条目依次为 $(1/10,1/20,0)$ 和 $(3/40,1/20,1/80)$。混合后恰得 $P(t)$。所述区间保证 $0\le w\le 1$，结论允许端点处一组质量为零。区间是此构造的适用范围，距离结论不需要输入 $M(t)$ 半正定。

## 34.10.2 三比特历史空间上的四种过去记忆策略与答案整表偷渡对照：为什么耗散不等于学习？ {#sec-ch34-22-2}

为了把“原样死记过去历史”、“滑动窗口 FIFO 截断”、“盲目粗粒化散热”、“充分统计八度蒸馏”以及“非因果答案整表拷贝”五者的热力学代价、容量边界与因果合法性对比得一目了然，我们在一个完全透明的 $8$ 状态三比特历史空间上逐项手算全部信息量与散热账单：

::: {.example #ex-ch34-predictive-distillation-benchmark title="三比特历史空间（8 态，1 比特寄存器上限）上的四种过去记忆映射、答案整表偷渡对照与目标切换基准算例"}
**手工推导。** 设观察者在过去三拍依次记录三枚独立均匀随机比特 $h = (X_1, X_2, X_3) \in H = \{0, 1\}^3$，全部 $8$ 条历史等概率分布 $\mathbb{P}(h) = \frac{1}{8}$，原始历史总香农熵为 $H(H) = \log_2 8 = 3\;\mathrm{bits}$。设未来环境交互收益取决于早期两拍闭合环路的奇偶校验目标 $Y := X_1 \oplus X_2 \in \{0, 1\}$（其中 $\oplus$ 表示模 $2$ 加法），而经窗口内暂态处理并重置冗余残差坐标 $R_* = (X_1, X_3)$ 后，**跨窗口留存记忆寄存器**的容量硬上限为 $C_{\mathrm{reg}} = 1\;\mathrm{bit}$。

先核对基准目标量：$Y = 0$ 对应 $4$ 条历史 $\{(0,0,0), (0,0,1), (1,1,0), (1,1,1)\}$，$Y = 1$ 对应其余 $4$ 条历史 $\{(0,1,0), (0,1,1), (1,0,0), (1,0,1)\}$，故 $\mathbb{P}(Y = 0) = \mathbb{P}(Y = 1) = \frac{1}{2}$，$H(Y) = 1\;\mathrm{bit}$；又因 $Y$ 由 $H$ 唯一决定，$H(Y \mid H) = 0$，原始全历史所含可预测互信息为 $I(H; Y) = 1\;\mathrm{bit}$。现对比四种过去可测记忆映射 $M = q(H)$ 与一项对固定比较答案表 $T : H \to \{0, 1\}$（$T$ 本身确定、$H(T) = 0$）作按历史寻址读出的非因果对照项 $M_{\mathrm{leak}}(h) := T(h) = Y(h)$（表中预测信息损失记为 $\Delta I_{\mathrm{loss}} := I(H; Y) - I(M; Y)$，条件逻辑混杂度 $\mathcal{I}_{\mathrm{Gini}}(Y \mid M) := \sum_m \mathbb{P}(M=m)\bigl(1 - \sum_{y\in\{0,1\}}\mathbb{P}(Y=y \mid M=m)^2\bigr)$，热力学兰道尔擦除热下界以 $k_B T \ln 2$ 为单位）：

| 记忆策略 $M$ | 占用容量 $H(M)$ | 保留互信息 $I(M; Y)$ | 预测损失 $\Delta I_{\mathrm{loss}}$ | 条件混杂度 $\mathcal{I}_{\mathrm{Gini}}(Y \mid M)$ | 擦除纤维熵 $H(H \mid M)$ 及因果/兰道尔下界诊断 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **(i) 过去全历史原样保留** $M_{\mathrm{raw}} = (X_1, X_2, X_3)$ | $3\;\mathrm{bits}$（违反 $1\;\mathrm{bit}$ 留存上限） | $1\;\mathrm{bit}$ | $0\;\mathrm{bit}$ | $0$ | $0\;\mathrm{bit}$（下界 $\Delta Q \ge 0$；满足 `NonAnticipating`） |
| **(ii) 滑动 FIFO 截断** $q_{\mathrm{FIFO}}(h) = X_3$ | $1\;\mathrm{bit}$（守限） | $0\;\mathrm{bit}$ | $1\;\mathrm{bit}$ | $\frac{1}{2}$ | $2\;\mathrm{bits}$（下界 $\Delta Q \ge 2\,k_B T \ln 2$） |
| **(iii) 盲目标错误粗化** $q_{\mathrm{bad}}(h) = X_2 \oplus X_3$ | $1\;\mathrm{bit}$（守限） | $0\;\mathrm{bit}$ | $1\;\mathrm{bit}$ | $\frac{1}{2}$ | $2\;\mathrm{bits}$（下界 $\Delta Q \ge 2\,k_B T \ln 2$） |
| **(iv) 充分统计八度蒸馏** $q_\star(h) = X_1 \oplus X_2$ | $1\;\mathrm{bit}$（守限） | $1\;\mathrm{bit}$ | $0\;\mathrm{bit}$ | $0$ | $2\;\mathrm{bits}$（下界 $\Delta Q \ge 2\,k_B T \ln 2$） |
| **(v) 答案表寻址神谕读出** $M_{\mathrm{leak}}(h) = T(h)$ | $1\;\mathrm{bit}$（$H(T)=0,\; H(T(H))=1\;\mathrm{bit}$） | $1\;\mathrm{bit}$（事后寻址） | $0\;\mathrm{bit}$（事后） | $0$ | 承诺含 `IncorporatesTableCopy`（处处违反 `NonAnticipating`） |

逐行核验其代数与物理机制：

1. **策略 (i)（过去全历史原样保留 $M_{\mathrm{raw}} = (X_1, X_2, X_3)$）**：由于 $(X_1, X_2, X_3)$ 完全由已观测的过去输入构成，它严格满足过去可测因果性（`NonAnticipating` 成立，并未偷渡外部比较答案表），保留 $I(M_{\mathrm{raw}}; Y) = 1\;\mathrm{bit}$ 且热力学兰道尔下界为 $\Delta Q \ge 0$（仅在理想准静态热力学可逆极限下取等 $\Delta Q = 0$，次优物理实现仍可能产生额外耗散）；它之所以不可行，是因为 **$3\;\mathrm{bits} > 1\;\mathrm{bit}$ 直接突破了跨窗口留存记忆寄存器的容量上限 $C_{\mathrm{reg}} = 1\;\mathrm{bit}$**！
2. **策略 (ii)（滑动窗口 FIFO 截断）**：机械丢弃旧比特 $(X_1, X_2)$、仅保留最新比特 $X_3$。在 $X_3 = 0$ 与 $X_3 = 1$ 两条纤维内各有 $4$ 条等权历史，$Y = 0$ 与 $Y = 1$ 各占 $2$ 条（后验恒为 $\frac{1}{2}$），故 $H(Y \mid X_3) = 1\;\mathrm{bit}$、$I(X_3; Y) = 0\;\mathrm{bit}$、混杂度升至最大值 $\frac{1}{2}$：擦除 $2\;\mathrm{bits}$ 条件熵承受热力学兰道尔下界 $\Delta Q \ge 2\,k_B T \ln 2$（仅理想准静态可逆极限取等，次优实现耗散更高），却把跨时间步奇偶规律彻底抹除。
3. **策略 (iii)（盲目标错误粗化）**：做非局域奇偶压缩 $M = X_2 \oplus X_3$ 同样将跨窗口留存记忆压入 $1\;\mathrm{bit}$，并因擦除 $2\;\mathrm{bits}$ 条件纤维熵承受同一热力学兰道尔下界 $\Delta Q \ge 2\,k_B T \ln 2$（仅在理想准静态热力学可逆极限下取等）。然而对任意固定 $(X_2, X_3)$，翻转 $X_1 \mapsto X_1 \oplus 1$ 保持 $X_2 \oplus X_3$ 不变却翻转 $Y = X_1 \oplus X_2$，导致 $M = 0$（含 $(0,0,0),(1,0,0),(0,1,1),(1,1,1)$）与 $M = 1$（含 $(0,0,1),(1,0,1),(0,1,0),(1,1,0)$）两条纤维内依然各有 $2$ 条 $Y=0$ 与 $2$ 条 $Y=1$，结果 $I(M; Y) = 0\;\mathrm{bit}$！这铁证了**“不可逆散热绝不自动等同于有效学习”**——压缩错方向的纤维只会白交至少 $2\,k_B T \ln 2$ 的热力学学费。
4. **策略 (iv)（充分统计八度蒸馏）**：在窗口暂态处理的第一阶段作双射纤维重编码 $h \leftrightarrow \bigl(q_\star(h),\, R_*(h)\bigr)$，其中高层概念坐标 $q_\star(h) = X_1 \oplus X_2 \in \{0, 1\}$ 扮演下一层级的单自由度“点”锚点 $\Lambda^0_{\ell+1}$，而二比特残差坐标 $R_*(h) = r_\star(h) = (X_1, X_3) \in \{0, 1\}^2$ 收集不可观测残差坐标 $X_1$ 与无关比特 $X_3$（由逆映射 $X_2 = q_\star \oplus X_1$ 严格双射可逆，双射重编码兰道尔下界为 $\Delta Q \ge 0$，理想准静态可逆极限下取 $0$）。第二阶段将 $2\;\mathrm{bits}$ 残差坐标 $R_* = (X_1, X_3)$ 向热浴重置（承受热力学兰道尔下界 $\Delta Q \ge 2\,k_B T \ln 2$，仅理想准静态可逆极限取等，次优物理实现耗散更高），便在严守跨窗口留存记忆寄存器 $1\;\mathrm{bit}$ 上限的前提下实现了 **$I(q_\star(H); Y) = 1\;\mathrm{bit}$ 的零预测损失（$\Delta I_{\mathrm{loss}} = 0$，$\mathcal{I}_{\mathrm{Gini}} = 0$）**！
5. **对照项 (v)（固定答案表 $T$ 对比寻址单比特输出 $M_{\mathrm{leak}}(h) = T(h)$）**：在 $8$ 条等概率历史 $h \in H$ 上，固定比较答案表 $T : H \to \{0, 1\}$ 本身是确定性对象（$H(T) = 0$），而其按历史寻址读出的输出 $M_{\mathrm{leak}}(h) := T(h) = Y(h)$ 恰好占用 $1\;\mathrm{bit}$（$H(T(H)) = I(T(H); Y) = 1\;\mathrm{bit}$，事后损失 $\operatorname{retrospectiveLoss} = 0$）；然而由于承诺结构通过 `IncorporatesTableCopy` 直接访问整张答案表 $T$，**该策略被 [`lookup_copy_zero_loss_and_nonanticipating_failure`](lean:D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure) 处处裁定违反非预见性（$\forall z,\; \neg\operatorname{NonAnticipating}(\mathrm{commitment}, z)$）而作为非因果作弊项出局**！
6. **（a）最小充分统计量的目标依赖性与（b）序贯概念修正的次序依赖性（两条独立结论）**：**（a）固定联合分布下的目标依赖性**：在固定均匀历史分布上将目标从 $Y = X_1 \oplus X_2$ 切换为 $Y' := X_3$，因 $X_1 \oplus X_2$ 与 $X_3$ 统计独立，$q_\star(h) = X_1 \oplus X_2$ 的保留互信息从 $1\;\mathrm{bit}$ 跌至 $I(q_\star(H); Y') = 0\;\mathrm{bit}$，而 $q_{\mathrm{FIFO}}(h) = X_3$ 则从 $0\;\mathrm{bit}$ 升至 $I(q_{\mathrm{FIFO}}(H); Y') = 1\;\mathrm{bit}$（且由 [`extended_quantum_relative_entropy_channel_dpi`](lean:D5/S3/Quantum/Divergence/CanonicalChannelDPI.extended_quantum_relative_entropy_channel_dpi)，一旦 $R_* = (X_1, X_3)$ 已被物理擦除，任何仅作用在 $q_\star$ 上的后处理信道均无法恢复 $X_3$），证明最小充分统计量严格具有**目标依赖性**；**（b）独立的序贯修正次序依赖性**：与之独立地，当序贯概念修正更新逐步改写假设集时，[`revision_conflict_noncommutation`](lean:D5/S3/ConceptDynamics/Revision/RevisionConflictNoncommutation.revision_conflict_noncommutation)（`LEAN ✓`）严格证明冲突的序贯修正互不对易（$\operatorname{revision}_Q(\operatorname{revision}_P(A)) \neq \operatorname{revision}_P(\operatorname{revision}_Q(A))$）。
:::

## 34.10.3 格拉姆窗口中的三锚质心蒸馏与认知—演化模型边界 {#sec-ch34-22-3}

回到 [§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus) 的内积格拉姆窗口 $\mathcal{W}_M$，八度概念蒸馏究竟如何改变加边格拉姆矩阵的舒尔补可行裕度 $\Delta_{\mathrm{Schur}}(\mathbf{q}) = 1 - \mathbf{c}^\top G^{-1}\mathbf{c}$？这里必须破除一个极易犯下的直觉误区：在 [§34.7](ch34-s18-gram-window-and-consensus.md#sec-ch34-gram-window-and-consensus) 的纯滑动窗口 FIFO 遗忘中，直接删去旧锚点使保留子空间按包含链 $S_{\mathrm{FIFO}} \subset S_{\mathrm{full}}$ 单调缩小，因而舒尔补残差在**每一个**查询方向 $\mathbf{q}$ 上都单调不减；**但将三枚历史锚点合成为一枚八度质心概念锚点 $\mathbf{a}$ 时，虽然同样腾出了两个寄存器槽位，其舒尔补走廊却绝非在所有方向上都比 FIFO 删减更宽**——概念合成的真正几何威力在于**有方向选择性地旋转保留子空间**！下面用全有理分数的显式三维算例逐项核实：

::: {.example #ex-ch34-gram-synthesis-versus-fifo title="三维正交三锚质心概念合成对照 FIFO 删减的格拉姆—舒尔补方向选择性算例"}
**手工推导。** 在实内积空间（取 $\mathbb{R}^3$ 或嵌入更高维环境空间 $\mathbb{R}^D,\, D \ge 3$）中，设容量上限为 $M_{\max} = 3$ 的格拉姆窗口 $\mathcal{W}_3$ 当前已被三枚标准正交历史锚点 $\mathbf{e}_1 = (1, 0, 0)^\top$、$\mathbf{e}_2 = (0, 1, 0)^\top$、$\mathbf{e}_3 = (0, 0, 1)^\top$ 填满，此时窗口格拉姆矩阵为 $G_{\mathrm{full}} = I_3$，空余寄存器槽位数为 $0$，且对 $\mathbb{R}^3$ 内任意单位查询向量 $\mathbf{q} = (q_1, q_2, q_3)^\top$（$q_1^2 + q_2^2 + q_3^2 = 1$），全窗口舒尔补裕度恒为 $\Delta_{\mathrm{Schur}}^{\mathrm{full}}(\mathbf{q}) = 1 - \mathbf{q}^\top I_3^{-1}\mathbf{q} = 0$。现对比以下三种腾退槽位的压缩方案：

- **方案 S（八度质心概念合成，$\Lambda^3_\ell \mapsto \Lambda^0_{\ell+1}$）**：将正交三元组对称折叠为单位质心概念锚点

  $$
  \mathbf{a} \;:=\; \frac{\mathbf{e}_1 + \mathbf{e}_2 + \mathbf{e}_3}{\sqrt{3}}, \qquad \lVert\mathbf{a}\rVert^2 \;=\; \frac{1 + 1 + 1}{3} \;=\; 1.
  $$

  压缩后窗口仅占 **$1$ 个槽位**（**净腾出 $2$ 个寄存器槽位**），格拉姆矩阵降为 $1 \times 1$ 标量 $G_{\mathrm{syn}} = (1)$，查询重叠为 $c_{\mathrm{syn}}(\mathbf{q}) = \langle\mathbf{a}, \mathbf{q}\rangle = \frac{q_1 + q_2 + q_3}{\sqrt{3}}$，舒尔补残差为

  $$
  \Delta_{\mathrm{Schur}}^{\mathrm{syn}}(\mathbf{q}) \;=\; 1 - c_{\mathrm{syn}}(\mathbf{q})^\top G_{\mathrm{syn}}^{-1} c_{\mathrm{syn}}(\mathbf{q}) \;=\; 1 - \frac{(q_1 + q_2 + q_3)^2}{3}.
  $$

- **方案 F2（单步 FIFO 删减，丢弃最旧锚点 $\mathbf{e}_1$ 保留 $\{\mathbf{e}_2, \mathbf{e}_3\}$）**：仅腾出 **$1$ 个槽位**，$G_{\mathrm{FIFO},2} = I_2$，重叠向量 $\mathbf{c}_{\mathrm{FIFO},2}(\mathbf{q}) = (q_2, q_3)^\top$，舒尔补残差为

  $$
  \Delta_{\mathrm{Schur}}^{\mathrm{FIFO},2}(\mathbf{q}) \;=\; 1 - \mathbf{c}_{\mathrm{FIFO},2}^\top I_2^{-1}\mathbf{c}_{\mathrm{FIFO},2} \;=\; 1 - (q_2^2 + q_3^2) \;=\; q_1^2.
  $$

- **方案 F1（双步 FIFO 删减，丢弃 $\mathbf{e}_1, \mathbf{e}_2$ 仅保留最新锚点 $\{\mathbf{e}_3\}$）**：与方案 S 同样腾出 **$2$ 个槽位**，$G_{\mathrm{FIFO},1} = (1)$，$c_{\mathrm{FIFO},1}(\mathbf{q}) = q_3$，舒尔补残差为

  $$
  \Delta_{\mathrm{Schur}}^{\mathrm{FIFO},1}(\mathbf{q}) \;=\; 1 - q_3^2 \;=\; q_1^2 + q_2^2.
  $$

现在代入两枚精确有理坐标的单位查询向量 $\mathbf{q}^{(1)}, \mathbf{q}^{(2)} \in S^2$，显式检核舒尔补残差的大小反转：

1. **沿同相集体模态偏置的有理单位查询向量 $\mathbf{q}^{(1)} := \bigl(\frac{2}{3},\, \frac{2}{3},\, \frac{1}{3}\bigr)^\top$**（核验单位范数：$\lVert\mathbf{q}^{(1)}\rVert^2 = \frac{4}{9} + \frac{4}{9} + \frac{1}{9} = 1$）：
   - 质心合成方案 S：$c_{\mathrm{syn}}(\mathbf{q}^{(1)}) = \frac{2/3 + 2/3 + 1/3}{\sqrt{3}} = \frac{5}{3\sqrt{3}}$，故 $c_{\mathrm{syn}}^2 = \frac{25}{27}$，舒尔补残差为

     $$
     \Delta_{\mathrm{Schur}}^{\mathrm{syn}}\bigl(\mathbf{q}^{(1)}\bigr) \;=\; 1 - \frac{25}{27} \;=\; \frac{2}{27} \;\approx\; 0.074074;
     $$

   - 单步 FIFO 方案 F2：$\mathbf{c}_{\mathrm{FIFO},2} = \bigl(\frac{2}{3}, \frac{1}{3}\bigr)^\top$，$\mathbf{c}_{\mathrm{FIFO},2}^\top I_2^{-1}\mathbf{c}_{\mathrm{FIFO},2} = \frac{4}{9} + \frac{1}{9} = \frac{5}{9} = \frac{15}{27}$，故

     $$
     \Delta_{\mathrm{Schur}}^{\mathrm{FIFO},2}\bigl(\mathbf{q}^{(1)}\bigr) \;=\; 1 - \frac{5}{9} \;=\; \frac{4}{9} \;=\; \frac{12}{27} \;\approx\; 0.444444;
     $$

   - 双步 FIFO 方案 F1：$c_{\mathrm{FIFO},1} = \frac{1}{3}$，故

     $$
     \Delta_{\mathrm{Schur}}^{\mathrm{FIFO},1}\bigl(\mathbf{q}^{(1)}\bigr) \;=\; 1 - \frac{1}{9} \;=\; \frac{8}{9} \;=\; \frac{24}{27} \;\approx\; 0.888889.
     $$

   在此方向上严格成立 $\Delta_{\mathrm{Schur}}^{\mathrm{syn}}(\mathbf{q}^{(1)}) = \frac{2}{27} < \frac{12}{27} = \Delta_{\mathrm{Schur}}^{\mathrm{FIFO},2}(\mathbf{q}^{(1)}) < \frac{24}{27} = \Delta_{\mathrm{Schur}}^{\mathrm{FIFO},1}(\mathbf{q}^{(1)})$（若取 $\mathbf{q} = \mathbf{a}$ 本身，更有 $\Delta_{\mathrm{Schur}}^{\mathrm{syn}}(\mathbf{a}) = 0 < \frac{1}{3} < \frac{2}{3}$）！这直接证明：**质心合成的舒尔补残差绝非在所有方向上都比 FIFO 删减更宽**——因为 $\mathbf{a} \notin \operatorname{span}\{\mathbf{e}_2, \mathbf{e}_3\}$ 忠实锁住了横跨全部三拍历史的对称集体不变量 $q_1 + q_2 + q_3$，任何沿该宏观概念轴靠近的查询都会受到紧致的历史因果约束。

2. **沿零和内纤维平面偏置的有理单位查询向量 $\mathbf{q}^{(2)} := \bigl(\frac{1}{3},\, \frac{2}{3},\, -\frac{2}{3}\bigr)^\top$**（核验单位范数：$\lVert\mathbf{q}^{(2)}\rVert^2 = \frac{1}{9} + \frac{4}{9} + \frac{4}{9} = 1$）：
   - 质心合成方案 S：$c_{\mathrm{syn}}(\mathbf{q}^{(2)}) = \frac{1/3 + 2/3 - 2/3}{\sqrt{3}} = \frac{1}{3\sqrt{3}}$，$c_{\mathrm{syn}}^2 = \frac{1}{27}$，故 $\Delta_{\mathrm{Schur}}^{\mathrm{syn}}(\mathbf{q}^{(2)}) = 1 - \frac{1}{27} = \frac{26}{27} \approx 0.962963$；
   - 单步 FIFO 方案 F2：$\mathbf{c}_{\mathrm{FIFO},2} = \bigl(\frac{2}{3}, -\frac{2}{3}\bigr)^\top$，占用预算 $\frac{4}{9} + \frac{4}{9} = \frac{8}{9} = \frac{24}{27}$，故 $\Delta_{\mathrm{Schur}}^{\mathrm{FIFO},2}(\mathbf{q}^{(2)}) = \frac{1}{9} = \frac{3}{27} \approx 0.111111$；
   - 双步 FIFO 方案 F1：$c_{\mathrm{FIFO},1} = -\frac{2}{3}$，故 $\Delta_{\mathrm{Schur}}^{\mathrm{FIFO},1}(\mathbf{q}^{(2)}) = 1 - \frac{4}{9} = \frac{5}{9} = \frac{15}{27} \approx 0.555556$。

   不等号在此彻底反转：$\Delta_{\mathrm{Schur}}^{\mathrm{syn}}(\mathbf{q}^{(2)}) = \frac{26}{27} > \frac{15}{27} > \frac{3}{27}$（在纯零和纤维平面 $q_1 + q_2 + q_3 = 0$ 上，如 $\mathbf{q}_{\mathrm{fib}} = \frac{1}{\sqrt{2}}(0, 1, -1)^\top$，更有 $\Delta_{\mathrm{Schur}}^{\mathrm{syn}}(\mathbf{q}_{\mathrm{fib}}) = 1$ 而 $\Delta_{\mathrm{Schur}}^{\mathrm{FIFO},2}(\mathbf{q}_{\mathrm{fib}}) = 0$）！就单位球面 $S^2$ 上的各向同性平均值而言，同为秩 $1$ 投影的方案 S 与方案 F1 拥有完全相同的平均自由预算 $1 - \frac{1}{3} = \frac{2}{3}$；质心蒸馏的精髓不在于盲目扩大平均面积，而在于**把宝贵的单槽约束精准对准跨周期的集体信号轴 $\mathbf{a}$，同时把与之正交的整张二维零和微观纤维平面 $\mathbf{a}^\perp$ 完全释放为自由转向空间**！
:::

把 [§33.1](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field) 的跨层八度螺旋与本节的充分统计蒸馏合拢，从物理热力学、机器学习的信息瓶颈一直到大脑概念抽象与生物演化谱系记忆，便在同一套“保留预测充分锚点 + 擦除冗余纤维散热”的架构下获得了清晰定位：

::: {.remark #rem-ch34-learning-and-evolution-model title="兰道尔原理实验检验、信息瓶颈理论与认知抽象及达尔文谱系记忆边界（文献结果与 MODEL）"}
**文献结果，未在本书形式化（配物理与生命诠释 `MODEL`）。** 为严守本书认识论分层，我们将支撑本节物理诠释的四项经典文献与跨尺度模型边界明确区分如下：

1. **不可逆擦除热力学与准静态实验验证（`文献结果`）**：R. Landauer（*IBM J. Res. Dev.* **5**, 183–191, 1961, DOI: [10.1147/rd.53.0183](https://doi.org/10.1147/rd.53.0183)）首次确立逻辑不可逆多对一合并必伴随最小环境热耗散 $k_B T \ln 2$/bit；C. H. Bennett（*Stud. Hist. Philos. Mod. Phys.* **34**, 501–510, 2003）严格澄清了双射可逆计算（对应本节第一阶段 $h \mapsto (q(h), r(h))$ 零热耗散）与擦除冗余辅助寄存器（对应第二阶段抹去 $r(h)$ 支付条件熵热）之间的逻辑分水岭；A. Bérut 等人（*Nature* **483**, 187–189, 2012, DOI: [10.1038/nature10872](https://doi.org/10.1038/nature10872)）则在光镊双势阱胶体微粒实验中首次在准静态极限下定量测得擦除 $1\;\mathrm{bit}$ 记忆的热耗散渐近触及 $k_B T \ln 2$ 下界。
2. **信息瓶颈变分原理（`文献结果`）**：N. Tishby, F. C. Pereira & W. Bialek（*Proc. 37th Annual Allerton Conf. on Communication, Control, and Computing*, 368–377, 1999）提出**信息瓶颈（Information Bottleneck）**泛函 $\mathcal{L}_{\mathrm{IB}}[p(\tilde{x}\mid x)] = I(X; \tilde{X}) - \beta_{\mathrm{IB}}\,I(\tilde{X}; Y)$，在压缩历史表征位宽 $I(X; \tilde{X})$ 与保留关于目标 $Y$ 的预测互信息 $I(\tilde{X}; Y)$ 之间求解最优软/硬划分边界；本节 [@ex-ch34-predictive-distillation-benchmark] 中的策略 (iv) $q_\star(h) = X_1 \oplus X_2$ 正是该变分边界在确定性零损失端点上的精确离散极小充分统计实例。
3. **认知概念学习与达尔文演化谱系记忆的统一诠释（`MODEL`）**：在本书的模型架构中，无论是神经系统将海量感官微弧轨迹（$\Lambda^3_\ell$）在睡眠突触修剪（对照[§36.1](ch37-dreams-quantum-eraser-and-nonlocal-observer.md)）与代谢散热中蒸馏为可跨语境复用的抽象语言概念符号（$\Lambda^0_{\ell+1}$），还是达尔文生物演化在代际繁衍中通过个体躯体凋亡与基因重组向生物圈热库耗散偶然环境噪声、仅在种系基因组中浓缩关乎生态位存续的预测充分统计锚点（对照[§35.1](ch35-light-pulse-and-self-referential-table.md)），皆可视作“有限格拉姆窗口八度蒸馏”在不同时间尺度上的同构运行（`MODEL`）。须严正声明：此跨学科对应属于结构性物理哲学模型，绝不声称在本书内核中形式化证明了神经生物学或演化遗传学定理。
:::

至此，受限观察者如何在单一局部历史链上兼顾“记忆不锁死”与“规律不失忆”的机制已水落石出。然而，当我们抬起头望向浩瀚星空，一个更宏大的宇宙学追问接踵而至：**既然每一位局部观察者的记忆蒸馏都仰赖把冗余纤维熵排入周围更低关联度的环境热库，为什么可观测宇宙中亿万彼此分离的有限观察者会拥有完全一致的热力学正向时间箭头，而不是各自朝相反的时间方向擦除与升温？观察者脚下的自指视界盲点又能否直接解释宇宙加速膨胀的正曲率下界？** 让我们步入下一节 [§34.11](ch34-s23-cosmological-arrow-and-horizon-floor.md#sec-ch34-cosmological-arrow-and-horizon-floor)，接受最严苛的反例与反循环审计。
