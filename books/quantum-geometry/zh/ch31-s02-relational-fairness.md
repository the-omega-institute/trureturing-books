# 27.2 关系公平：不可克隆与纠缠单配性（深情不可批发） {#sec-ch31-monogamy}

在经典数字世界里，强权者可以把同一份比特串零成本复制一万份，同时向无数对象许下看似“百分之百排他”的绑定承诺。然而，一旦进入多量子比特交织的张量积几何，**关系公平（Relational Fairness，`MODEL`）**便展现出最温柔也最决绝的铁腕：**深切的交融不可批发，鲜活的灵魂切片不可盗版。**

在 Lean 4 内核验证层面，这道防线由两条零自由参数的严格定理锁定（合并陈述于下方 [@thm-ch31-seat-pythagorean-monogamy-fairness] 第 3–4 款；一般的纠缠单配性见文献注记 [@rem-ch31-ckw-monogamy-literature]）：

1. **不可克隆内积判据**（[`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)）：若同一个复线性等距算子 $U$ 能把两个归一化纯态 $\psi, \phi$ 同时从空白辅助态 $\mathrm{blank}$ 克隆为 $\psi\otimes\psi$ 与 $\phi\otimes\phi$，则它们的内积被迫满足幂等方程 $\langle\phi, \psi\rangle = \langle\phi, \psi\rangle^2$——从而要么 $\phi = \psi$（根本是同一个态），要么 $\langle\phi, \psi\rangle = 0$（彼此严格正交的经典可区分刻度）！任何处于非正交叠加张力中的未知状态，都绝无可能被通用机器盲目复印。

::: {.viz src="quantum-fairness-ledger" preset="cloning" height="500"}
**副本越多，每份越短。** 一个未知态复制成 $M$ 份时，每份的青色箭头只剩 $\eta = (M+2)/(3M)$，品红是丢掉的部分，保真度降向 $2/3$（通用对称克隆机，文献结果，未在本书形式化）。这台机器对每个态一视同仁，两极的态也一样变短。两极的空心圈标的是另一件事：一台机器若能把两个态都照抄，它们的内积只能是 $0$ 或 $1$（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 3 款），所以像 $\lvert 0\rangle$、$\lvert 1\rangle$ 这样的一对正交态可以由另一台专为它们造的机器照抄。
:::

2. **贝尔纯态边缘最大混态定理**（[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)）：当双量子比特结成秩一贝尔最大纠缠纯态 `bellDensity` 时，追踪掉伙伴环境所得的单体约化态 `traceEnvironment bellDensity` 精确等于 $\frac{1}{2}I_2$（且不幂等）——局部布洛赫偏置彻底退回球心零点，一分一毫的局部纯度偏私都不再私藏，全部关联都交给了跨子系统的共享平面！

::: {.viz src="quantum-fairness-ledger" preset="bell" height="500"}
**满额相融。** 贝尔态 $\lvert\Phi^+\rangle_{AB}\otimes\lvert 0\rangle_C$：$\mathbf{A}$ 与 $\mathbf{B}$ 之间的品红纽带满额，$\mathbf{A}$ 的琥珀色箭头缩回球心，即 $\tfrac{1}{2}I_2$（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 4 款），与 $\mathbf{C}$ 之间一点也不剩。
:::

下面的形式化定理将席位模方、互补中心化纯度勾股、不可克隆与贝尔边缘混态四块公平基石统一锁定在同一座 Lean 4 证明基座上。

::: {.theorem #thm-ch31-seat-pythagorean-monogamy-fairness title="量子公平的前三重形式化基石：玻恩模方、互补勾股、不可克隆与贝尔混态边缘" lean="D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal"}
在 `trureturing` 冻结的有限维量子测量、层析、纯态与纠缠模块中，以下四项公平性结构定理同时成立：

1. **秩一纯态玻恩配对的模方律**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：设 $n, \kappa$ 为有限类型（`[Fintype n] [DecidableEq n] [Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 满足记录测量公理 `IsRecordMeasurement P`，$\rho \in M_n(\mathbb{C})$ 为合法量子态（`rho.PosSemidef ∧ Matrix.trace rho = 1`）。若第 $k$ 个测量投影为秩一外积 $P_k = \phi\phi^*$（`Matrix.vecMulVec phi (star phi)`）且状态为纯态 $\rho = \psi\psi^*$（`Matrix.vecMulVec psi (star psi)`），则记录权重满足

   $$
   \begin{aligned}
   &\operatorname{recordWeight}(P, \rho, k) \\
   &\quad = \bigl(\|\phi^* \bullet_v \psi\|^2 : \mathbb{C}\bigr) \\
   &{}\land\; \operatorname{recordWeight}(P, \rho, k) \\
   &\quad = \operatorname{Tr}(\rho P_k) \\
   &{}\land\; \operatorname{unreadState}(P, \rho) \\
   &\quad = \sum_{j \in \kappa}\Bigl(\operatorname{recordWeight}(P, \rho, j) \\
   &\qquad \bullet \operatorname{conditionalState}(P, \rho, j)\Bigr);
   \end{aligned}
   $$
2. **互补测量语境的中心化纯度勾股守恒**（[`complementary_context_probability_pythagoras`](lean:D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras)）：设 $d, L$ 为有限类型且 $d$ 非空，$E$ 为完备实内积空间，`visible` 为 $E$ 的闭子空间。若量子态 $\rho \in M_d(\mathbb{C})$ 的中心化纯度满足 $\operatorname{Re}\operatorname{Tr}(\rho^2) - |d|^{-1} = \|\mathrm{state}\|^2$，且可见语境正交投影范数平方满足 $\|\mathrm{visible.starProjection}(\mathrm{state})\|^2 = \sum_{l \in L}\sum_{j \in d}\bigl(\mathrm{probability}(l, j) - |d|^{-1}\bigr)^2$，则中心化纯度预算严格分解为可见语境确定度与正交补残余质量之和：

   $$
   \operatorname{Re}\operatorname{Tr}(\rho^2) - |d|^{-1} \;=\; \sum_{l \in L}\sum_{j \in d}\bigl(\mathrm{probability}(l, j) - |d|^{-1}\bigr)^2 \;+\; \operatorname{residualMass}(\mathrm{visible}, \mathrm{state});
   $$

3. **通用克隆等距算子的内积幂等锁**（[`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)）：设 $H$ 为复内积空间，$U : H \otimes_{\mathbb{C}} H \simeq_{\ell i} H \otimes_{\mathbb{C}} H$ 为复线性等距同构。若单位向量 $\|\psi\| = \|\phi\| = \|\mathrm{blank}\| = 1$ 同时满足 $U(\psi \otimes \mathrm{blank}) = \psi \otimes \psi$ 与 $U(\phi \otimes \mathrm{blank}) = \phi \otimes \phi$，则必有

   $$
   \langle\phi, \psi\rangle_{\mathbb{C}} = \langle\phi, \psi\rangle_{\mathbb{C}}^2 \;\land\; \bigl(\phi = \psi \;\lor\; \langle\phi, \psi\rangle_{\mathbb{C}} = 0\bigr);
   $$

4. **贝尔最大纠缠纯态的局部最大混态边缘**（[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)）：双量子比特贝尔态矢满足归一化 $\mathrm{bellVector}^* \bullet_v \mathrm{bellVector} = 1$，其密度矩阵 $\mathrm{bellDensity}$ 为半正定、迹为 $1$、秩为 $1$ 的幂等纯态（$\mathrm{bellDensity}^2 = \mathrm{bellDensity}$），但其单体偏迹边缘精确塌缩为非幂等的二分之一单位阵：

   $$
   \operatorname{traceEnvironment}(\mathrm{bellDensity}) = \tfrac{1}{2}I_2, \qquad \operatorname{traceEnvironment}(\mathrm{bellDensity})^2 \neq \operatorname{traceEnvironment}(\mathrm{bellDensity}).
   $$
:::

::: proof
第 1 款由秩一外积迹归约 `rank_one_pure_state_modulus_square_reduction` 与加权后验系综分解 `unread_eq_weighted_ensemble` 合取而成（对易模方 $\|\phi^* \bullet_v \psi\|^2 = \|\psi^* \bullet_v \phi\|^2$ 不在第 1 款陈述之内，由复点积共轭反演在盒外手算给出）；第 2 款由完备内积空间闭子空间正交分解 `Submodule.norm_sq_eq_add_norm_sq_starProjection` 代入假设即得；第 3 款利用线性等距算子保持张量积内积 $\langle\phi, \psi\rangle\langle\mathrm{blank}, \mathrm{blank}\rangle = \langle\phi, \psi\rangle^2$，由复数域整环幂等解 `eq_zero_or_one_of_sq_eq_self` 与单位向量内积取一判据 `inner_eq_one_iff_of_norm_eq_one` 归约为 $\phi = \psi$ 或正交；第 4 款直接对 $4\times 4$ 贝尔密度矩阵执行偏迹分块求和并验证 $(\frac{1}{2}I_2)^2 = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch31-cloning-lock"}
**内积锁只开两把：$0$ 与 $1$。** 横轴是内积 $x = \langle\phi,\psi\rangle$；同一台克隆机迫使 $x = x^2$，墨色对角线 $y = x$ 与青色抛物线 $y = x^2$ 只在原点（$\phi \perp \psi$）与 $(1, 1)$（$\phi = \psi$）相交，两点之间抛物线始终在对角线下方，没有解（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 3 款）。图中只画了实轴；在复数中 $z = z^2$ 同样只有 $z = 0$ 与 $z = 1$。
:::

当第三个量子比特 $\mathbf{C}$ 走入视野时，多体纠缠配额在外部量子信息文献中的定量延伸整理于下框：

::: {.remark #rem-ch31-ckw-monogamy-literature title="三量子比特 CKW 纠缠单配性不等式与 Bell / GHZ / W 态预算核验（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 多体二元纠缠配额的单配性（Monogamy of Entanglement）定量不等式引自量子信息经典文献，未包含在本书锁定的形式化声明集中：

1. **三量子比特 CKW 单配性不等式（V. Coffman, J. Kundu & W. K. Wootters, *Phys. Rev. A* **61**, 052306, 2000）与 $n$ 比特推广（T. J. Osborne & F. Verstraete, *Phys. Rev. Lett.* **96**, 220503, 2006）**：对任意三量子比特量子态 $\rho_{ABC}$（纯态或混合态），记二体纠缠度（2-tangle）$\tau(\mathbf{A}:\mathbf{B}) := C(\rho_{AB})^2$、$\tau(\mathbf{A}:\mathbf{C}) := C(\rho_{AC})^2$ 为 Wootters 并发度（concurrence）的平方，记单体约化态 $\rho_A = \operatorname{Tr}_{BC}(\rho_{ABC}) = \frac{1}{2}(I_2 + \mathbf{r}_A\cdot\boldsymbol{\sigma})$ 的布洛赫向量为 $\mathbf{r}_A \in \mathbb{R}^3$（$\|\mathbf{r}_A\| \le 1$）。三个边缘 $\rho_{AB},\rho_{AC},\rho_A$ 均取自同一个 $\rho_{ABC}$ 的实际偏迹。

   对二比特密度矩阵 $P$，在计算基中令 $\widetilde P=(\sigma_y\otimes\sigma_y)\overline P(\sigma_y\otimes\sigma_y)$，其中 $\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix}$，横线表示逐项复共轭。Wootters 的谱公式为

   $$
   C(P)=\max\{0,\lambda_1-\lambda_2-\lambda_3-\lambda_4\},
   $$

   其中 $\lambda_1\ge\lambda_2\ge\lambda_3\ge\lambda_4\ge0$ 是 $P\widetilde P$ 的四个特征值的非负平方根，计代数重数。该乘积一般不自伴；其特征值为非负实数是谱公式的数学依据，不能仅凭矩阵名称省略。零谱、重根和低秩态均包括在内（W. K. Wootters, *Phys. Rev. Lett.* **80**, 2245–2248, 1998，[原文](https://arxiv.org/abs/quant-ph/9709029)）。

   对 $\mathbf A|\mathbf{BC}$ 切分，令 $\mathcal E(\rho_{ABC})$ 包含所有有限纯态分解 $\rho_{ABC}=\sum_jp_j|\psi_j\rangle\langle\psi_j|$，其中 $p_j\ge0$、$\sum_jp_j=1$、$\langle\psi_j|\psi_j\rangle=1$，并记 $\rho_A^{(j)}=\operatorname{Tr}_{BC}|\psi_j\rangle\langle\psi_j|$。混合态中间项按纯态预算的凸顶定义：

   $$
   \tau(\mathbf A:\mathbf{BC})
   :=\inf_{\mathcal E(\rho_{ABC})}\sum_jp_j\,4\det\rho_A^{(j)}.
   $$

   零权重允许存在，定义不要求预先选出最优分解。这是 $2\times4$ 切分的纯态代价下确界；上面的二比特谱公式只用于 $\rho_{AB}$ 与 $\rho_{AC}$。完整配额为

   $$
   \tau(\mathbf{A}:\mathbf{B}) + \tau(\mathbf{A}:\mathbf{C}) \;\le\; \tau(\mathbf{A}:\mathbf{BC}) \;\le\; 4\det\rho_A \;=\; 1 - \|\mathbf{r}_A\|^2 \;\le\; 1
   $$

   混合态左界使用二体平方并发度的凸性：对同一个有限分解的每个纯态先应用 CKW，再按同一组 $p_j$ 平均，最后取下确界。右侧中间上界来自 $4\det\rho_A=1-\|\mathbf r_A\|^2$ 对密度矩阵的凹性。这里的谱公式、凸顶连接与 CKW 均依赖文献证明，本书尚未将这条完整链形式化，详见 [CKW 原文式 (1)–(14)](https://arxiv.org/abs/quant-ph/9907047)。

   对三量子比特纯态 $|\Psi_{ABC}\rangle$，$\tau(\mathbf{A}:\mathbf{BC}) = 4\det\rho_A = 1 - \|\mathbf{r}_A\|^2$ 取等号，差值 $\tau_3 := \tau(\mathbf{A}:\mathbf{BC}) - \tau(\mathbf{A}:\mathbf{B}) - \tau(\mathbf{A}:\mathbf{C}) \ge 0$ 定义纯态三体残余纠缠度 3-tangle；混合态的三缠结需另作凸顶延拓，不能直接把这个差值当作其定义。Osborne 与 Verstraete 进一步证明 $n$ 量子比特满足 $\sum_{j=2}^n \tau(A_1 : A_j) \le \tau(A_1 : A_2\cdots A_n)$；
2. **三类标准三量子比特纯态的账本核验**：
   - **贝尔对直积孤立态 $|\Phi^+\rangle_{AB}\otimes|0\rangle_C$**：$\rho_A = \frac{1}{2}I_2$（$\|\mathbf{r}_A\| = 0$），$\mathbf{A}$ 与 $\mathbf{B}$ 倾尽预算结成最大二体纠缠 $\tau(\mathbf{A}:\mathbf{B}) = 1$，迫使 $\tau(\mathbf{A}:\mathbf{C}) = 0$——一旦与 $\mathbf{B}$ 满额相融，对任何第三方 $\mathbf{C}$ 的纠缠容量严格归零；
   - **$W$ 态 $|W\rangle = \frac{1}{\sqrt{3}}(|100\rangle + |010\rangle + |001\rangle)$**：单体边缘 $\rho_A = \operatorname{diag}(\frac{2}{3}, \frac{1}{3})$ 保留局部极化 $\|\mathbf{r}_A\| = \frac{1}{3}$，故可用纠缠上限为 $1 - \|\mathbf{r}_A\|^2 = \frac{8}{9}$，平分给两段二体纠缠 $\tau(\mathbf{A}:\mathbf{B}) = \tau(\mathbf{A}:\mathbf{C}) = \left(\frac{2}{3}\right)^2 = \frac{4}{9}$，相加恰好饱和上界 $\frac{4}{9} + \frac{4}{9} = \frac{8}{9}$（三体残余 $\tau_3 = 0$）；
   - **GHZ 态 $|\mathrm{GHZ}\rangle = \frac{1}{\sqrt{2}}(|000\rangle + |111\rangle)$**：$\|\mathbf{r}_A\| = 0$，但二体偏迹 $\rho_{AB} = \rho_{AC} = \frac{1}{2}(|00\rangle\langle 00| + |11\rangle\langle 11|)$ 为可分混态，故 $\tau(\mathbf{A}:\mathbf{B}) = \tau(\mathbf{A}:\mathbf{C}) = 0$，全部预算升维转化为不可拆解的三体全局体积纠缠 $\tau_3 = 1$。
:::

::: {.viz src="quantum-fairness-ledger" preset="wstate" height="500"}
**两份纠缠平分预算。** $W$ 型态 $(\lvert 000\rangle + \lvert 110\rangle + \lvert 101\rangle)/\sqrt{3}$（对 $\lvert W\rangle$ 的 $\mathbf{A}$ 做一次翻转，各项纠缠量不变）：$\mathbf{A}$ 的箭头剩 $1/3$，两条品红纽带各 $4/9$，右侧柱子的总额是 $1$（[@rem-ch31-ckw-monogamy-literature]）。
:::

沿同一族态再走一步，两条二体纽带便整体让位给三方共有的纠缠：

::: {.viz src="quantum-fairness-ledger" preset="ghz" height="500"}
**全部交给三方。** 从 $W$ 型态走到 GHZ 态：两条品红纽带断开，紫色的三方面撑满到 $\tau_3 = 1$，$\mathbf{A}$ 的箭头缩回球心；柱子的总额始终是 $1$（[@rem-ch31-ckw-monogamy-literature]）。
:::

---
