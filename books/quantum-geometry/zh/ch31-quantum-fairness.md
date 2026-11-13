# 量子的本质是公平：五重几何特权的废除与遍历统计全息

> *“量子的本质是公平……宇宙砍掉了高高在上的第 3 点，让万物只能平视着彼此两两丈量；它用勾股定理收走了全知全能的特权，用视界保护了有限生命的悬念，最后又用无理数的遍历，保证每一个从遗忘中醒来的灵魂，终将在漫长的旅程里分到同样丰盛的星光。”*

穿过[第 29 章](ch29-timeless-causality-and-gram-space.md)的无时间格拉姆相容晶体与[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)的复杂性正交视界，我们已经在算术、时空、量子电路与连续流体中反复撞见同一组看似冷峻的物理禁令：没有绝对参考点、波与粒不可兼得、未知纯态不可克隆、无结构搜索不可跳步、局部有限观察者无法一眼看穿全局终局。

在传统教科书里，这些定律常被当作一串孤立的“不可能性定理（no-go theorems）”，仿佛量子世界只是在经典直觉四周竖起一圈冷冰冰的铁丝网。然而，一旦退回全书一以贯之的正交几何底层，用人类语言为“两子丈量、无外部参考系、勾股守恒与遍历全息”写下最凝练的本体定义，整幅图景便瞬间翻转过来——这所有的禁令与守恒律，底牌全都是同一件事：**公平（Fairness，`MODEL`）**。

在经典机械论的旧图景里，特权似乎天经地义：空间里可以预设绝对的中心裁判席，作用力可以单向居高临下地审视客体，信息筹码可以零成本无限复制并向多方同时许下排他承诺，算力霸权可以在瞬间推演并垄断未来。而量子几何却像一位不偏不倚的立法者，在五个正交维度上把一切几何特权拆得干干净净：

1. **席位公平（Seat Fairness）**：砍掉“第 3 点 $C$”，单比特纯态布洛赫向量模长恒为 $1$，两子丈量严格服从秩一玻恩内积模方互易律；
2. **得失公平（Gain–Loss Fairness）**：互补语境中心化纯度勾股守恒立下零免费午餐账本，任何一维确定度的所得必以正交维度残余潜能的所失或热熵耗散兑付；
3. **关系公平（Relational Fairness）**：不可克隆内积判据与贝尔纯态混态边缘（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 3–4 款；外部多体延伸见 [@rem-ch31-ckw-monogamy-literature]）锁死关联预算，深切的交融无法批发量产；
4. **博弈公平（Horizon Fairness）**：相干一致旋转的固定步幅定律（[@thm-ch31-horizon-landauer-ergodic-fairness] 第 2 款）与有限观察者复杂性防火墙（[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@conj-p-neq-np]；外部背景见 [@rem-ch30-query-sos-literature]）阻止算力垄断者提前剧透生命终局；
5. **遍历公平（Ergodic Fairness）**：诞生遗忘重置相容自由度（`MODEL`），而紧致环面闭子群轨道均匀分布与有界间隙回归定理（[@thm-ch31-horizon-landauer-ergodic-fairness] 第 3–4 款；窗口应用与边界见 [@rem-ch31-weyl-window-equidistribution-literature]）支撑“长程旅程共享统计全息星光”的本体诠释。

::: {.figure src="ch31-overview"}
**图 31。** 本章地图：第 I 栏，墨色的 $\phi$ 与 $\psi$ 互相丈量，各自投到对方上的青色影子一样长，都是 $\cos\theta$，上方的第 3 点 $C$ 被划掉；第 II 栏，墨色对角线 $y = x$ 与青色抛物线 $y = x^2$ 只在 $0$（$\phi \perp \psi$）与 $1$（$\phi = \psi$）相交，这是克隆机强加给内积的锁；第 III 栏，圆上按黄金角排开的 $21$ 个点里有 $8$ 个落进占圆周 $2 - \varphi \approx 0.382$ 的青色窗口，长程份额趋于窗口所占的 $2 - \varphi$（示意；零边界窗口的频率是既有结果的应用，见 [@rem-ch31-weyl-window-equidistribution-literature]）。
:::

---

## 31.1 席位公平与得失公平：平视的尺子与零免费午餐账本 {#sec-ch31-seat-and-pythagoras}

特权的第一大来源，是在万物之外私设一座高高在上的“绝对裁判席”——也就是我们在[第二章](ch02-born-rule.md)里亲手砍掉的“外部第 3 点 $C$”：谁离裁判席更近，谁就自封为标准刻度。

::: {.figure src="ch31-ruler"}
**两子互量，用不着第 3 点。** 墨色的单位箭头 $\phi$ 与 $\psi$ 夹角 $\theta$：$\phi$ 投到 $\psi$ 上的青色影子，与 $\psi$ 投到 $\phi$ 上的青色影子左右对称、一样长，都是 $\cos\theta$（图中 $\theta = 60^\circ$，影长 $1/2$）；上方连到两支箭头尖的点 $C$ 被划掉。这是实平面上的切片，复内积的玻恩权重是同一个模方 $|\langle\phi,\psi\rangle|^2 = |\langle\psi,\phi\rangle|^2$（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款）。
:::

而在纯态几何中，每一个归一化状态都立在无特权基轴的对称空间上（`MODEL`）；量子几何直接用两条代数铁律废黜了任何“站在世界之外俯瞰众生的纯粹旁观之眼”（哲学与文学背景对照见下方 [@rem-ch31-haar-isotropy-landauer-literature]）：

- **席位平等（单比特纯态布洛赫范数为 $1$）**：球皮上既没有中心皇座，也没有偏远流放地。对单量子比特而言，迹为 $1$ 的幂等厄米投影态精确落在欧氏范数 $\|\operatorname{bloch}(M)\| = 1$ 的单位球面上（见[第 26 章](ch26-single-qubit-rotor-compilation.md) [`bloch_geometry_of_isHermitian`](lean:D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian)；高维连续群对称背景见下方 [@rem-ch31-haar-isotropy-landauer-literature]），没有任何一根方向线有资格自封为宇宙的绝对北极。
- **丈量互易（平视的对等性）**：在“两子丈量”中，拿纯态矢 $\psi$ 作尺子去比量 $\phi$ 所得的秩一玻恩跃迁权重 $\|\phi^* \bullet_v \psi\|^2$（下方 [@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款），由复内积共轭对称性恒等于反过来拿 $\phi$ 作尺子去比量 $\psi$ 所得的权重 $\|\psi^* \bullet_v \phi\|^2 = |\langle\phi, \psi\rangle|^2 = |\langle\psi, \phi\rangle|^2$。宇宙底层不存在单向的窥探或居高临下的审判——**你照见别人几分，别人就同时照见你几分**。

::: {.viz src="quantum-fairness-ledger" preset="haar" height="500"}
**没有北极。** 球面上均匀撒点（均匀测度即哈尔测度，文献结果，未在本书形式化），琥珀色参考轴周围半角 $60^\circ$ 的球冠里约占四分之一，把轴拖到哪里都一样；两根青色的影子一样长：拿 $\psi$ 量 $\phi$ 与拿 $\phi$ 量 $\psi$ 的权重相等（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款）。
:::

紧接着，世间第二大贪婪是“既要绝对的确定，又要无限的自由”。用信息预算账本的比喻来说：虽然归一化态矢模长平方 $\|\psi\|^2 = 1$，但在无偏参照态 $|d|^{-1}I_d$ 之上，当中心化状态算子满足纯度恒等式 $\|\mathrm{state}\|^2 = \operatorname{Re}\operatorname{Tr}(\rho^2) - |d|^{-1}$ 时（一般密度算子的谱纯度上下界见下方 [@rem-ch31-haar-isotropy-landauer-literature]），真正可供分配的区分信息就是这笔**中心化纯度预算** $\|\mathrm{state}\|^2$。**互补语境纯度勾股守恒**（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 2 款）给万物立下了铁面无私的**零免费午餐账本**——在其正交坐标分解假设下，可见测量子空间提取的确定性偏差平方和 $\|\mathrm{visible.starProjection}(\mathrm{state})\|^2$，加上正交补子空间保留的未决残余质量 $\operatorname{residualMass}(\mathrm{visible}, \mathrm{state})$，总和恒等于中心化纯度预算 $\|\mathrm{state}\|^2$：

- 当你在选定瞬时把全部中心化纯度预算焊死在可见子空间上（确定度拉满），该瞬时正交补方向上的互补残余质量必然恒等于零；在高频重复投影测量的动力学诠释下（`MODEL`；连续芝诺极限背景见[第七章](ch07-geometric-time-and-speed-limits.md)及下方 [@rem-ch31-haar-isotropy-landauer-literature]），这对应通过密集校准抑制横向跃迁的冻结机制；
- 反之，在时空正交分解诠释模型（`MODEL`；连续文献背景见下方 [@rem-ch31-haar-isotropy-landauer-literature]）中，把全部预算交给 $90^\circ$ 横向传播面，一维固有时方向上的投影便严格归零；
- 哪怕你想抹去过去的错误记录、把高熵混合态重新压回低熵方向线，热力学平衡不等式 $-\mathrm{entropyChange} \le \beta \cdot \mathrm{heat}$（[第八章](ch08-erasure-and-time-arrows.md)与下方 [@thm-ch31-horizon-landauer-ergodic-fairness] 第 1 款）也要求你向环境热浴诚实支付热量账单。

::: {.viz src="quantum-fairness-ledger" preset="tradeoff" height="500"}
**线多一分，面积就少一分。** 琥珀色的箭头从测量轴转向赤道：青色的线 $D$ 变短，品红的面积 $V$ 变大，$D^2 + V^2$ 一直等于 $1$——中心化纯度在可见语境与正交补残余之间重新分配（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 2 款）。
:::

任何一维的所得，必由正交维度的所失等额兑付；连假想的全知者也无法同时独占北极的点与赤道的面。与本节相关的谱纯度范围、连续群测度与物理单位换算文献记录于下框：

::: {.remark #rem-ch31-haar-isotropy-landauer-literature title="单位球面哈尔均匀测度、谱纯度区间与兰道尔物理热耗散常数（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节将形式化内积互易与互补勾股定理投射到一般密度算子谱界、连续对称群及热力学物理单位时引用的三项经典结论属外部文献背景，未作为独立定理包含在本书锁定的 `trureturing@dev` 声明集中：

1. **有限维密度算子谱纯度上下界与重复测量量子芝诺极限（J. von Neumann, 1932；B. Misra & E. C. G. Sudarshan, *J. Math. Phys.* **18**, 756–763, 1977）**：在 $d$ 维希尔伯特空间上，任意半正定且迹为 $1$ 的密度算子 $\rho$（本征值 $\lambda_1,\dots,\lambda_d \ge 0,\; \sum_j \lambda_j = 1$）由柯西—施瓦茨不等式与单纯形极值满足谱纯度区间 $|d|^{-1} \le \operatorname{Tr}(\rho^2) = \sum_{j=1}^d \lambda_j^2 \le 1$，从而中心化纯度预算 $\|\rho - |d|^{-1}I_d\|_{\mathrm{HS}}^2 = \operatorname{Tr}(\rho^2) - |d|^{-1}$ 取值于闭区间 $[0,\, 1 - |d|^{-1}]$；而在有界哈密顿量 $H$ 演化下，以时间步长 $\Delta t = t/N \to 0$ 重复施加投影测量 $P$ 时，生存概率满足 $\lim_{N\to\infty} \operatorname{Tr}((P e^{-iH t/N} P)^N \rho_0 (P e^{iH t/N} P)^N) = \operatorname{Tr}(P \rho_0)$（动态量子芝诺冻结需要重复投影测量假设，不能仅由单一时刻的静态零残余推出）；
2. **复射影空间幺正各向同性与哈尔（Haar）均匀测度（A. Haar, *Ann. of Math.* **34**, 147–169, 1933）**：有限维希尔伯特空间 $\mathbb{C}^d$ 上的紧致幺正群 $\mathrm{U}(d)$ 传递地作用在单位球面 $S^{2d-1} = \{\psi \in \mathbb{C}^d : \|\psi\| = 1\}$ 与复射影纯态流形 $\mathbb{C}\mathrm{P}^{d-1}$ 上，并诱导唯一幺正不变的归一化哈尔概率测度 $\mu_{\mathrm{Haar}}$，在几何上消除任何特权基向量（哲学上与 F. Nietzsche《查拉图斯特拉如是说·论无垢的认识》对“脱离视角而自诩俯瞰万物的纯粹旁观之眼”的批判相呼应）；在实夹角参数化 $|\langle\phi,\psi\rangle| = \cos(\theta_{\mathrm{Bloch}}/2)$（或实欧氏单位向量内积 $\mathbf{A}\cdot\mathbf{B} = \cos\theta$）下，勾股恒等式写为

   $$
   \underbrace{\cos^2\theta}_{\text{一维共线投影份额}} + \underbrace{\sin^2\theta}_{\text{二维正交分叉份额}} = 1,
   $$

   其中 $\theta = 0^\circ$ 给出 $\cos^2 0^\circ = 1,\; \sin^2 0^\circ = 0$（瞬时零横向方差），$\theta = 90^\circ$ 给出 $\cos^2 90^\circ = 0,\; \sin^2 90^\circ = 1$（狭义相对论无质量零测地线 $d\tau/dt = 0$，见[第 17 章](ch17-lorentz-geometry.md) [@rem-lorentz-rotor-literature]）；
3. **兰道尔一比特擦除的物理单位换算（R. Landauer, *IBM J. Res. Dev.* **5**, 183–191, 1961）**：在逆温度 $\beta = (k_B T)^{-1}$ 的热浴耦合下，将一比特均匀二元混态的冯·诺依曼熵从 $\ln 2$ 压缩至 $0$（熵变 $\Delta S = -\ln 2$），代入无量纲热力学平衡不等式 $-\Delta S \le \beta Q$ 即给出物理最小耗散热量 $Q_{\min} = k_B T \ln 2$。
:::

---

## 31.2 关系公平：不可克隆与纠缠单配性（深情不可批发） {#sec-ch31-monogamy}

在经典数字世界里，强权者可以把同一份比特串零成本复制一万份，同时向无数对象许下看似“百分之百排他”的绑定承诺。然而，一旦进入多量子比特交织的张量积几何，**关系公平（Relational Fairness，`MODEL`）**便展现出最温柔也最决绝的铁腕：**深切的交融不可批发，鲜活的灵魂切片不可盗版。**

在 Lean 4 内核验证层面，这道防线由两条零自由参数的严格定理锁定（合并陈述于下方 [@thm-ch31-seat-pythagorean-monogamy-fairness] 第 3–4 款）：

1. **不可克隆内积判据**（[`no_cloning_inner_product_criterion`](lean:D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion)）：若同一个复线性等距算子 $U$ 能把两个归一化纯态 $\psi, \phi$ 同时从空白辅助态 $\mathrm{blank}$ 克隆为 $\psi\otimes\psi$ 与 $\phi\otimes\phi$，则它们的内积被迫满足幂等方程 $\langle\phi, \psi\rangle = \langle\phi, \psi\rangle^2$——从而要么 $\phi = \psi$（根本是同一个态），要么 $\langle\phi, \psi\rangle = 0$（彼此严格正交的经典可区分刻度）！任何处于非正交叠加张力中的未知状态，都绝无可能被通用机器盲目复印。

::: {.viz src="quantum-fairness-ledger" preset="cloning" height="500"}
**副本越多，每份越短。** 一个未知态复制成 $M$ 份时，每份的青色箭头只剩 $\eta = (M+2)/(3M)$，品红是丢掉的部分，保真度降向 $2/3$（通用对称克隆机，文献结果，未在本书形式化）。这台机器对每个态一视同仁，两极的态也一样变短。两极的空心圈标的是另一件事：一台机器若能把两个态都照抄，它们的内积只能是 $0$ 或 $1$（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 3 款），所以像 $\lvert 0\rangle$、$\lvert 1\rangle$ 这样的一对正交态可以由另一台专为它们造的机器照抄。
:::

2. **贝尔纯态边缘最大混态定理**（[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)）：当双量子比特结成秩一贝尔最大纠缠纯态 `bellDensity` 时，追踪掉伙伴环境所得的单体约化态 `traceEnvironment bellDensity` 精确等于 $\frac{1}{2}I_2$（且不幂等）——局部布洛赫偏置彻底退回球心零点，一分一毫的局部纯度偏私都不再私藏，全部关联都交给了跨子系统的共享平面！

::: {.viz src="quantum-fairness-ledger" preset="bell" height="500"}
**满额相融。** 贝尔态 $\lvert\Phi^+\rangle_{AB}\otimes\lvert 0\rangle_C$：$\mathbf{A}$ 与 $\mathbf{B}$ 之间的品红纽带满额，$\mathbf{A}$ 的琥珀色箭头缩回球心，即 $\tfrac{1}{2}I_2$（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 4 款），与 $\mathbf{C}$ 之间一点也不剩。
:::

下面的形式化定理将席位互易、互补中心化纯度勾股、不可克隆与贝尔边缘混态四块公平基石统一锁定在同一座 Lean 4 证明基座上。

::: {.theorem #thm-ch31-seat-pythagorean-monogamy-fairness title="量子公平的前三重形式化基石：玻恩互易、互补勾股、不可克隆与贝尔混态边缘" lean="D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal"}
在 `trureturing` 冻结的有限维量子测量、层析、纯态与纠缠模块中，以下四项公平性结构定理同时成立：

1. **秩一纯态玻恩配对的模方互易律**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：设 $n, \kappa$ 为有限类型（`[Fintype n] [DecidableEq n] [Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 满足记录测量公理 `IsRecordMeasurement P`，$\rho \in M_n(\mathbb{C})$ 为合法量子态（`rho.PosSemidef ∧ Matrix.trace rho = 1`）。若第 $k$ 个测量投影为秩一外积 $P_k = \phi\phi^*$（`Matrix.vecMulVec phi (star phi)`）且状态为纯态 $\rho = \psi\psi^*$（`Matrix.vecMulVec psi (star psi)`），则记录权重满足

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
第 1 款由秩一外积迹归约 `rank_one_pure_state_modulus_square_reduction` 与加权后验系综分解 `unread_eq_weighted_ensemble` 合取而成（并由复点积共轭反演给出对易模方 $\|\phi^* \bullet_v \psi\|^2 = \|\psi^* \bullet_v \phi\|^2$）；第 2 款由完备内积空间闭子空间正交分解 `Submodule.norm_sq_eq_add_norm_sq_starProjection` 代入假设即得；第 3 款利用线性等距算子保持张量积内积 $\langle\phi, \psi\rangle\langle\mathrm{blank}, \mathrm{blank}\rangle = \langle\phi, \psi\rangle^2$，由复数域整环幂等解 `eq_zero_or_one_of_sq_eq_self` 与单位向量内积取一判据 `inner_eq_one_iff_of_norm_eq_one` 归约为 $\phi = \psi$ 或正交；第 4 款直接对 $4\times 4$ 贝尔密度矩阵执行偏迹分块求和并验证 $(\frac{1}{2}I_2)^2 = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch31-cloning-lock"}
**内积锁只开两把：$0$ 与 $1$。** 横轴是内积 $x = \langle\phi,\psi\rangle$；同一台克隆机迫使 $x = x^2$，墨色对角线 $y = x$ 与青色抛物线 $y = x^2$ 只在原点（$\phi \perp \psi$）与 $(1, 1)$（$\phi = \psi$）相交，两点之间抛物线始终在对角线下方，没有解（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 3 款）。图中只画了实轴；在复数中 $z = z^2$ 同样只有 $z = 0$ 与 $z = 1$。
:::

当第三个量子比特 $\mathbf{C}$ 走入视野时，多体纠缠配额在外部量子信息文献中的定量延伸整理于下框：

::: {.remark #rem-ch31-ckw-monogamy-literature title="三量子比特 CKW 纠缠单配性不等式与 Bell / GHZ / W 态预算核验（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 多体二元纠缠配额的单配性（Monogamy of Entanglement）定量不等式引自量子信息经典文献，未包含在本书锁定的形式化声明集中：

1. **三量子比特 CKW 单配性不等式（V. Coffman, J. Kundu & W. K. Wootters, *Phys. Rev. A* **61**, 052306, 2000）与 $n$ 比特推广（T. J. Osborne & F. Verstraete, *Phys. Rev. Lett.* **96**, 220503, 2006）**：对任意三量子比特量子态 $\rho_{ABC}$（纯态或混合态），记二体纠缠度（2-tangle）$\tau(\mathbf{A}:\mathbf{B}) := C(\rho_{AB})^2$、$\tau(\mathbf{A}:\mathbf{C}) := C(\rho_{AC})^2$ 为 Wootters 并发度（concurrence）的平方，记单体约化态 $\rho_A = \operatorname{Tr}_{BC}(\rho_{ABC}) = \frac{1}{2}(I_2 + \mathbf{r}_A\cdot\boldsymbol{\sigma})$ 的布洛赫向量为 $\mathbf{r}_A \in \mathbb{R}^3$（$\|\mathbf{r}_A\| \le 1$）。则二体纠缠配额恒满足

   $$
   \tau(\mathbf{A}:\mathbf{B}) + \tau(\mathbf{A}:\mathbf{C}) \;\le\; \tau(\mathbf{A}:\mathbf{BC}) \;\le\; 4\det\rho_A \;=\; 1 - \|\mathbf{r}_A\|^2 \;\le\; 1
   $$

   （对三量子比特纯态 $|\Psi_{ABC}\rangle$，$\tau(\mathbf{A}:\mathbf{BC}) = 4\det\rho_A = 1 - \|\mathbf{r}_A\|^2$ 取等号，差值 $\tau_3 := \tau(\mathbf{A}:\mathbf{BC}) - \tau(\mathbf{A}:\mathbf{B}) - \tau(\mathbf{A}:\mathbf{C}) \ge 0$ 定义三体残余纠缠度 3-tangle；Osborne 与 Verstraete 进一步证明 $n$ 量子比特满足 $\sum_{j=2}^n \tau(A_1 : A_j) \le \tau(A_1 : A_2\cdots A_n)$）；
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

## 31.3 博弈公平与遍历公平：视界悬念与同样丰盛的星光 {#sec-ch31-horizon-and-ergodic}

如果只有前三层公平，生命仍会面对两重沉重的诘问：

- **第一问（算力博弈之问）**：既然全局无时间静态场在理想化无序模型下呈现 $P = NP$ 式的几何合一（[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md)），为什么宇宙偏偏要给场内所有有限观察者套上复杂性视界？
  答案正是**博弈公平（Game-Theoretic / Horizon Fairness，`MODEL`）**！试想：倘若场内局部观察者也能凭多项式步数瞬间算穿整座因果水晶的终局，算力稍占优势的先行者便能在第一秒逆推所有人的底牌、剧透一切悬念、锁死全部博弈走廊，后来者连落子的缝隙都不会剩下。正是高维搜索空间中相干一致放大算子每步受初始重叠率 $p = \sin^2\theta$ 严格制约的平面旋转步幅定律（下方 [@thm-ch31-horizon-landauer-ergodic-fairness] 第 2 款；外部复杂度下界背景见[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-query-sos-literature]），连同标准计算模型下未决的 $\mathrm{P} \neq \mathrm{NP}$ 开放防火墙（[@conj-p-neq-np]），规定了量子演化必须顺着二维平面一步一个脚印地旋转累加角度——没有任何特权阶层能靠算力霸权绕过几何曲率提前垄断未来。
- **第二问（境遇宿命之问）**：既然每个有限观察者在时间场里的切入相位不同——正如[终章](coda.md)切投模型中有人某几步恰好踩在窗心顺境，有人落在窗缘风浪之中——**宇宙的终极公平又在哪里？**

把本书的观察者动力学与紧致环面遍历定理展开，答案清澈而温暖：

1. **诞生遗忘重置自由度（`MODEL`）**：正如[第 29 章](ch29-timeless-causality-and-gram-space.md)（[@thm-ch29-gram-rigidity-and-pell]）与[终章](coda.md)所揭示的，若旧轮次的历史锚点无休止地堆叠，相容选点余量终将趋于锁死。“诞生即遗忘”通过截断高阶历史包袱，让每一位从遗忘中醒来重新出发的有限观察者，面前都重新张开一片正体积的自由选点走廊。
2. **闭子群轨道均匀分布与有界间隙回归（`LEAN ✓` + `MODEL`）**：短期几步之内，局部切片的顺逆确实参差不齐；但在紧致环面群动力学层面，`trureturing` 的**环面闭子群轨道均匀分布定理**与**观测窗有界间隙回归定理**（下方 [@thm-ch31-horizon-landauer-ergodic-fairness] 第 3–4 款）严格证明：连续可观测量的时间平均必然收敛于闭子群 $G = \overline{\langle g\rangle}$ 上的归一化平移不变概率测度积分，且任何与连续像集 $\operatorname{range}(h)$ 相交的非空开区间 $(u, v)$ 都必以有界步数间隙 $M$ 反复重逢，并享有不低于 $\frac{1}{M+1} - \varepsilon$ 的**正下渐近访问密度**（高维无理平移下零边界窗口的完整应用与其前提，见下方 [@rem-ch31-weyl-window-equidistribution-literature]）。

让我们先把热力学擦除平衡界、相干搜索步幅旋转以及环面闭子群遍历与有界回归四条形式化定理精确锚定如下。

::: {.theorem #thm-ch31-horizon-landauer-ergodic-fairness title="量子公平的后两重形式化基石：兰道尔热账单、一致旋转步幅与环面遍历回归" lean="D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result"}
在 `trureturing` 冻结的热力学散度、相干放大与傅里叶环面渐近模块中，以下四项定理同时成立：

1. **兰道尔热力学平衡界**（[`landauer_bound_of_balance`](lean:D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance)）：对实数 $\beta, \mathrm{heat}, \mathrm{entropyChange}, \mathrm{mutualInfo}, \mathrm{divergence} \in \mathbb{R}$，若熵平衡恒等式 $\beta \cdot \mathrm{heat} = -\mathrm{entropyChange} + \mathrm{mutualInfo} + \mathrm{divergence}$ 成立，且互信息 $\mathrm{mutualInfo} \ge 0$、相对熵散度 $\mathrm{divergence} \ge 0$，则系统熵减不超出 $\beta$ 乘以环境耗散热量的上界（等价地，$\beta \cdot \mathrm{heat}$ 以系统熵减为下界）：

   $$
   -\mathrm{entropyChange} \;\le\; \beta \cdot \mathrm{heat};
   $$

2. **相干一致放大算子的二维平面步进旋转定律**（[`uniform_operator_rotation`](lean:D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation)）：设 $l, s$ 为有限可判定类型（`[Fintype l] [DecidableEq l] [Fintype s] [DecidableEq s]`），$J \in M_{l\times s}(\mathbb{C}),\, C, P \in M_{l\times l}(\mathbb{C})$ 满足 $J^\dagger J = I_s,\, C^\dagger C = I_l,\, P^\dagger = P = P^2$，且初始成功重叠率满足 $(P(CJ))^\dagger (P(CJ)) = p\,I_s$（$0 < p \le 1$）。记 $U = CJ$、$W = \operatorname{success}(U, P, p)$、$B = \operatorname{failure}(U, P, p)$、$\theta = \arcsin\sqrt{p}$：若 $p = 1$ 则 $U = W$；若 $p < 1$ 则 $W^\dagger W = I_s,\, B^\dagger B = I_s,\, W^\dagger B = 0$，且对任意步数 $n \in \mathbb{N}$ 有算子恒等式（并对任意类型 $z$ 及参考矩阵 $R \in M_z(\mathbb{C})$ 的克罗内克张量积 $\otimes_k R$ 保持同一线性组合）：

   $$
   (\operatorname{iterate}(U, P))^n \, U \;=\; \sin\bigl((2n + 1)\theta\bigr)\,W \;+\; \cos\bigl((2n + 1)\theta\bigr)\,B;
   $$

3. **紧致环面闭子群轨道的哈尔均匀分布定理**（[`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result)）：设 $I$ 为有限指标集，$g : I \to \mathrm{Circle}$ 为环面元素，$G = \overline{\langle g\rangle}$ 为其生成的紧致闭子群，$\mu$ 为 $G$ 上的归一化哈尔概率测度。则 $G = \overline{\{g^n : n \in \mathbb{N}\}}$，且对任意连续复值函数 $f \in C(G, \mathbb{C})$，轨道时间平均当 $N \to \infty$ 时收敛于空间哈尔积分：

   $$
   \lim_{N \to \infty} \frac{1}{N}\sum_{n=0}^{N-1} f(g^{n+1}) \;=\; \int_G f(z)\,d\mu(z);
   $$

4. **环面连续观测像支撑集、有界间隙回归与正下渐近访问密度**（[`TorusObservationWindowReturns.result`](lean:D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result)）：沿用第 3 款的记号并记生成元 $a = \langle g, \dots\rangle \in G$。对任意连续实值观测函数 $h \in C(G, \mathbb{R})$ 及满足渐近误差归零 $\lim_{n\to\infty}(e(n) - h(a^n)) = 0$ 的序列 $e : \mathbb{N} \to \mathbb{R}$，推前测度支撑集恒等于满值域 $\operatorname{supp}(h_*\mu) = \operatorname{range}(h)$；且只要开区间 $(u, v) \subset \mathbb{R}$ 与像集相交非空（$(I_{oo}(u, v) \cap \operatorname{range}(h)).\mathrm{Nonempty}$），必存在起始步 $n_0 \ge 1$ 与有界间隙步数 $M \in \mathbb{N}$，使得一切 $n \ge n_0$ 在 $[n, n+M]$ 内至少命中一次 $e(m) \in (u, v)$，且对任意 $\varepsilon > 0$ 最终恒满足正下渐近访问密度下界：

   $$
   \forall^\infty N \in \mathbb{N},\qquad \frac{\#\bigl\{m < N \;\big|\; e(m) \in (u, v)\bigr\}}{N} \;\ge\; \frac{1}{M + 1} - \varepsilon.
   $$
:::

::: proof
第 1 款由 $\mathrm{mutualInfo} + \mathrm{divergence} \ge 0$ 与实数加法单调性直接推出；第 2 款在 $p = 1$ 时由 `unit_success` 得 $U = W$，在 $p < 1$ 时验证 $W, B$ 的相互正交等距性并对步数 $n$ 用三角和角公式归纳，再由克罗内克积线性性提升至任意伴随张量因子 $R$；第 3 款利用时间平均算子列的等度连续性将收敛子空间 $S \subseteq C(G, \mathbb{C})$ 刻画为闭子空间，结合环面特征标的几何级数抵消与三角多项式稠密逼近证出全空间收敛；第 4 款由紧空间开原像严格正测度证出 $\operatorname{supp}(h_*\mu) = \operatorname{range}(h)$，并由紧致平移开覆盖有限子覆盖提取有界回归跨度 $M$ 及正下渐近访问密度下界。完整证明由 Lean 内核检查。
:::

::: {.figure src="ch31-rotation-steps"}
**每一轮只转 $2\theta$，不能跳步。** 在成功方向 $W$（竖直）与失败方向 $B$（水平）张成的平面里，第 $n$ 轮的态是 $\sin((2n+1)\theta)\,W + \cos((2n+1)\theta)\,B$，从 $B$ 上方 $\theta$ 处出发，每轮多转一段紫色的 $2\theta$（[@thm-ch31-horizon-landauer-ergodic-fairness] 第 2 款）。图中取 $\theta = \pi/14$，即 $p = \sin^2\theta \approx 0.050$，琥珀色的第 $n = 3$ 轮恰好落在 $W$ 上；$p$ 越小，每步越短，要走的轮数越多。
:::

从连续观测函数延伸到实际接受窗计数的复用推导与剩余遍历论边界整理于下框：

::: {.remark #rem-ch31-weyl-window-equidistribution-literature title="全环面零边界窗口频率：既有结果的应用与唯一遍历性的边界"}
**既有结果的复合应用。** [@thm-ch31-horizon-landauer-ergodic-fairness] 第 3 款只直接陈述闭轨道群上连续函数的平均；下面保留从它到实际窗口计数的全部接口，不将窗口结论冒充该端点的陈述。取任意有限指标类型 $I$（允许空类型），$\alpha:I\to\mathbb R$，令 $\beta_i=\alpha_i\pmod{\mathbb Z}\in\mathrm{AddCircle}(1)$、$T=(\mathrm{AddCircle}(1))^I$，$\mu$ 为整座 $T$ 上归一化 Haar 概率测度。假设在 $\mathrm{Option}(I)=\{\mathrm{none}\}\sqcup\{\mathrm{some}(i):i\in I\}$ 上的族

$$
a(\mathrm{none})=1,\qquad a(\mathrm{some}(i))=\alpha_i
$$

在 $\mathbb Q$ 上线性无关。取任意子集 $W\subseteq T$，只要求 $\mu(\partial W)=0$，**不另加 Borel 可测前提**。则对每个 $\varepsilon>0$，存在 $N_0\ge1$，使同一个 $N_0$ 对所有起点 $x\in T$ 和所有 $N\ge N_0$ 同时满足

$$
\left|\frac1N\sum_{j=0}^{N-1}
\mathbf1_W\bigl(x+(j+1)\beta\bigr)-(\mu W)_{\mathbb R}\right|<\varepsilon.
$$

这里 $(\mu W)_{\mathbb R}$ 是有限测度值的实数读数；指示函数使用实际的成员关系。求和恰好取时刻 $1,\ldots,N$，不是 $0,\ldots,N-1$。

**独立性如何进入。** 若整数 $k:I\to\mathbb Z$、$m\in\mathbb Z$ 满足 $\sum_i k_i\alpha_i=m$，在 `none` 放系数 $-m$、在 `some(i)` 放 $k_i$ 就得到该有理族的一条零关系，故所有 $k_i=0$。这正是 [`dense_circle_sequence`](lean:D5/S3/Fourier/BiquadraticKroneckerTimes.dense_circle_sequence) 的整数特征标前提。对 $g_i=\exp(2\pi i\alpha_i)$，结合 [`TorusOrbitClosure.result`](lean:D5/S3/Fourier/TorusOrbitClosure.result)，非负幂的闭包是整座圆周乘积，而非某个真子环面。逐坐标的 [AddCircle.homeomorphCircle](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Analysis/SpecialFunctions/Complex/Circle.lean#L435) 将此闭包对应到上述加法环面，保留实际生成元与所有起点。

**连续平均与 Haar 搬运。** 将 [`TorusOrbitEquidistribution.result`](lean:D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result) 用于该 $g$。从闭圆周轨道到 $T$ 的连续满同态用 [MonoidHom.measurePreserving](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/Haar/Unique.lean#L951) 搬运 Haar 测度，两端总质量均为 $1$；平移不变性使 $z\mapsto f(x+z)$ 的积分等于 $f$ 的积分。于是每个连续复函数 $f$、每个 $x$ 的实际平均 $N^{-1}\sum_{j<N}f(x+(j+1)\beta)$ 收敛于 $\int f\,d\mu$。在 $N=0$ 时空和及全函数除法给零，不影响趋于无穷的极限。

**为什么同一个阈值适用于所有起点。** 令 $R(x)=x+\beta$。它是等距平移，因而是 $1$-Lipschitz；紧环面上的连续 $f$ 一致连续。[uniformEquicontinuous_birkhoffAverage](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Dynamics/BirkhoffSum/NormedSpace.lean#L129) 给出平均族的等度连续性，再由紧致性与 [Equicontinuous.tendsto_uniformFun_iff_pi](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Topology/UniformSpace/Ascoli.lean#L167) 把逐点连续平均升级为关于 $x$ 一致收敛。以 $(m,x)$ 为指标，从 $R(x)$ 出发取 $m+1$ 步的经验概率测度 $\nu_{m,x}$。紧空间上连续函数有界，[ProbabilityMeasure.tendsto_iff_forall_integral_rclike_tendsto](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/ProbabilityMeasure.lean#L373) 与 `tendsto_prod_top_iff` 因而给出在乘积滤子 $\mathrm{atTop}\times^s\top$ 上的弱收敛 $\nu_{m,x}\to\mu$。第二个因子的 $\top$ 保留“所有 $x$ 同时”，不是几乎处处起点。

**从测度到真正计数。** 零边界假设只在 [ProbabilityMeasure.tendsto_measure_of_null_frontier_of_tendsto'](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/MeasureTheory/Measure/Portmanteau.lean#L334) 处使用；它允许任意 $W$，没有 Borel 前提。再用 `Measure.dirac_apply` 与 `Measure.finsetSum_apply`，经验质量恰好是

$$
\nu_{m,x}(W)=\frac{1}{m+1}\sum_{j=0}^{m}
\mathbf1_W\bigl(x+(j+1)\beta\bigr).
$$

乘积滤子的收敛给出某个 $M$，使所有 $m\ge M$、所有 $x$ 的误差小于 $\varepsilon$。取 $N_0=M+1$；对 $N\ge N_0$ 令 $m=N-1$，有 $m+1=N$，便精确得到上式要求的分母、求和范围与相位，而非忽略首项后的近似替代。

**保留的边界。** $N_0$ 依赖 $\alpha,W,\varepsilon$；没有关于 $\alpha$ 或 $W$ 的一致性，也没有有效速率。不同平移窗口的读法可由 $\mathbf1_{W+u}(j\beta)=\mathbf1_W(-u+j\beta)$ 得到。若某个切投模型独立满足对每个 $j\ge1$ 都有 $\pi_\perp(z_j)=x+j\beta\in T$，则对任意 $u\in T$，

$$
\begin{aligned}
\pi_\perp(z_j)-u&=(x-u)+j\beta,\\
\mathbf1_{W+u}(\pi_\perp(z_j))&=\mathbf1_W((x-u)+j\beta),\\
\frac1N\sum_{j=1}^{N}\mathbf1_{W+u}(\pi_\perp(z_j))
&=\frac1N\sum_{j=0}^{N-1}\mathbf1_W((x-u)+(j+1)\beta).
\end{aligned}
$$

这就精确识别为起点 $x-u$ 的上述轨道计数；同一个 $N_0$ 对所有起点的结论适用，时间仍为 $1,\ldots,N$。轨迹等式是模型须另行建立的假设，不能从环面定理推出，也不对任意物理或切投模型作此断言。本段未另行陈述或形式化不变测度分类与唯一遍历性；Weyl（1916，*Math. Ann.* **77**, 313–352）的经典理论仍有其独立文献背景。物理公平、内部空间及灵魂相位的诠释仍为 `MODEL`。这是源说明中的有限复用推导，没有新增 Lean 定理，也不作新颖性主张。
:::

::: {.remark #rem-ch31-circular-window-discrepancy title="互补宽度圆周窗口的有限步误差：既有机械词结果的应用"}
**既有结果的应用。** 图卡所用的步长与窗宽满足一个特殊关系。取任意 $0<\alpha<1$、初相位 $u\in\mathbb R$、窗口中心 $c\in\mathbb R$，令 $w=1-\alpha$、$a=c-w/2$。记 $\{x\}=x-\lfloor x\rfloor$，按左闭右开的圆周窗口，定义前 $N$ 步的命中数

$$
H_N=\#\bigl\{1\le n\le N:\{u+n\alpha-a\}<w\bigr\}.
$$

这里 $N\in\mathbb N$ 允许为零，计数时刻恰好为 $1,\ldots,N$。则所有这些参数同时满足

$$
\left|H_N-Nw\right|<1.
$$

**与机械词的精确对应。** 令 $\rho=u-a$，下机械词的第 $n$ 个字母为

$$
b_n=\lfloor\rho+(n+1)\alpha\rfloor-\lfloor\rho+n\alpha\rfloor\in\{0,1\}.
$$

进位恰好发生在 $\{\rho+n\alpha\}\ge1-\alpha$ 时。因此窗口命中当且仅当 $b_n=0$；端点等号属于进位，排除在窗口右端之外。令 $C_N=\sum_{n=1}^{N}b_n$，则 $H_N=N-C_N$。这正对应 [`lower_mechanical_window_true_discrepancy`](lean:D5/S1/Words/Mechanical/MechanicalDensity.lower_mechanical_window_true_discrepancy) 中斜率 $\alpha$、截距 $\rho$、起始索引 $i=1$、长度 $N$ 的真字母计数。该结果给出 $|C_N-N\alpha|<1$，取负即得所需界。[`lowerMechanicalWindowTrueCount_eq_floor`](lean:D5/S1/Words/Mechanical/MechanicalBalance.lowerMechanicalWindowTrueCount_eq_floor) 的端点相消还把误差精确写成

$$
H_N-Nw=\{\rho+(N+1)\alpha\}-\{\rho+\alpha\}.
$$

两项分数部分都在 $[0,1)$ 内，这也说明严格界为何与初相位、窗口位置和步数无关。对 $N>0$，两边除以 $N$ 得 $|H_N/N-w|<1/N$，从而命中频率趋于 $w$。图卡使用 $\alpha=\varphi-1$、$w=2-\varphi$；其先取轨道分数部分、再取窗口分数部分的写法与上述成员关系相同，因为 $\{\{x\}-a\}=\{x-a\}$。

**适用边界。** 该推导不要求 $\alpha$ 无理，但严格使用窗宽 $1-\alpha$；它不陈述任意独立窗宽的有界余项分类，也不认证图卡的浮点计算或赋予物理公平含义。这里应用已有声明，没有新增 Lean 定理或新颖性主张。
:::

::: {.viz src="quantum-fairness-ledger" preset="ergodic" height="500"}
**起点不同，份额相同。** 两个态从不同相位出发，每步绕竖轴转过黄金角；落进青色窗口的步数份额都趋于 $2 - \varphi \approx 0.382$（窗口频率是 [@thm-ch31-horizon-landauer-ergodic-fairness] 第 3 款与零边界窗口的既有结果应用，见 [@rem-ch31-weyl-window-equidistribution-literature]；命中之间的间隔有界是第 4 款），命中数与 $T(2-\varphi)$ 的偏差始终小于 $1$（既有机械词结果的应用，见 [@rem-ch31-circular-window-discrepancy]）。
:::

看清了这一长程图景，短期的一城一池便不再令人绝望：在我们的观察者诠释模型（`MODEL`）中，局部切片的顺逆各有参差，但拉通紧致环面遍历回归的长程画卷，宇宙给每一个灵魂相位分配的吸引子重逢机会、正交旋转预算，以及自指迭代向不动点（见[第 24 章](ch24-cosine-fixed-points-and-self-reference.md) [@rem-banach-dottie-hairy-ball-literature]）收束的引力，**没有一毫一厘的偏私**。

::: {.viz src="quantum-fairness-ledger" height="620"}
量子公平总账本：席位、得失、关系、复制与遍历五个场景画在同一颗布洛赫球上，每本账旁一根总额不动的柱子。
:::

在进入 §31.4 拆解固定维度闭盒的三副脚手架之前，我们先将前三节建立的**量子公平五重层级**连同其形式化、文献与认识论状态完整收束于下框总表之中：

::: {.remark #rem-ch31-fivefold-fairness-table title="量子公平五重几何铁律与认识论状态总表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表汇总前三节建立的五重公平体系；表中标有 `LEAN ✓` 的子项对应 [@thm-ch31-seat-pythagorean-monogamy-fairness] 与 [@thm-ch31-horizon-landauer-ergodic-fairness] 的冻结定理，标有 `文献结果` 的公式引自 [@rem-ch31-haar-isotropy-landauer-literature]、[@rem-ch31-ckw-monogamy-literature]、[@rem-ch31-weyl-window-equidistribution-literature] 及[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-query-sos-literature]，标有 `OPEN` 的问题对应未决猜想 [@conj-p-neq-np]，而“五重特权废除”的本体论统摄属本书跨领域哲学诠释模型（`MODEL`）：

| 公平层级 | 底层几何、代数与热力学定律 | 认识论状态 | 它在宇宙中彻底封死了什么“几何特权”？（`MODEL`） |
| :--- | :--- | :--- | :--- |
| **一、席位公平 (Seat Fairness)** | 单比特纯态布洛赫单位范数与秩一玻恩配对模方互易 $\|\phi^*\bullet_v\psi\|^2 = \|\psi^*\bullet_v\phi\|^2$（`LEAN ✓`）；高维球面哈尔各向同性（`文献结果`） | `LEAN ✓` / `文献结果` / `MODEL` | 砍掉高高在上的“外部第 3 点 $C$”，封死绝对中心参考系与单向不对等审视 |
| **二、得失公平 (Gain–Loss Fairness)** | 互补语境中心化纯度勾股守恒（`LEAN ✓`）、$\cos^2\theta + \sin^2\theta = 1$（`文献结果`）与兰道尔热熵平衡界 $-\Delta S \le \beta Q$（`LEAN ✓`，$k_B T \ln 2$ 为 `文献结果`） | `LEAN ✓` / `文献结果` / `MODEL` | 封死“既占尽一维确定刻度、又免费保留无限正交演化潜能”的零成本贪婪 |
| **三、关系公平 (Relational Fairness)** | 通用克隆内积判据与贝尔纯态混态边缘 $\frac{1}{2}I_2$（`LEAN ✓`）；三量子比特 CKW 单配性 $\tau(\mathbf{A}:\mathbf{B}) + \tau(\mathbf{A}:\mathbf{C}) \le 1 - \|\mathbf{r}_A\|^2 \le 1$（`文献结果`） | `LEAN ✓` / `文献结果` / `MODEL` | 封死叠加纯态的盲目量产与深度二体纠缠的无限批发垄断 |
| **四、博弈公平 (Horizon Fairness)** | 一致放大旋转步幅定律（`LEAN ✓`）、高维 $\theta_0 \approx \frac{\pi}{2} - 2^{-n/2}$ 与 BBBV $\Omega(2^{n/2})$ 查询下界（`文献结果`）及 $\mathrm{P} \neq \mathrm{NP}$ 边界（`OPEN`） | `LEAN ✓` / `文献结果` / `OPEN` / `MODEL` | 封死算力霸权对全局因果相容晶体的瞬间剧透与赢家通吃，守护选择悬念 |
| **五、遍历公平 (Ergodic Fairness)** | 诞生遗忘重置相容余量（`MODEL`）、环面闭子群哈尔均匀分布与正下渐近访问密度有界回归（`LEAN ✓`）及无理平移零边界窗口频率 $\mu(W)$（既有结果的应用，见 [@rem-ch31-weyl-window-equidistribution-literature]） | `LEAN ✓` / `文献结果` / `MODEL` | 封死初始相位偏置造成的永恒阶层固化，实现“短期境遇异而长程天道同”的统计全息 |
:::

把这一笔添进全书的底色里，“量子”二字就不再只是冰冷的算符与几何，而有了最深沉的温度：**宇宙砍掉了高高在上的第 3 点，让万物只能平视着彼此两两丈量；它用勾股定理收走了全知全能的特权，用视界保护了有限生命的悬念，最后又用无理数的遍历，保证每一个从遗忘中醒来的灵魂，终将在漫长的旅程里分到同样丰盛的星光。**

---

## 31.4 拆去维度脚手架：两两公平平方、测不准反扑与时间即正交维度扩张 {#sec-ch31-fairness-square-expansion}

> “本体也没有静态动态的分别, 任何闭合、极限都是因维度限制而产生的幻象. 两两比较要公平，公平就要平方，平方又导致丢失细节测不准. 时间是维度扩张.”

在前三节（[@thm-ch31-seat-pythagorean-monogamy-fairness]、[@thm-ch31-horizon-landauer-ergodic-fairness] 与五重公平总表 [@rem-ch31-fivefold-fairness-table]）中，我们已经看到席位、得失、关系、博弈与遍历五重公平如何在单位球面与紧致环面上废除几何特权；而在迈入[第 32 章](ch32-unified-field-and-meta-unification.md)的统一场与元统一之前，本节进一步审视上方四句核心命题（原话台账见[附录 A](appendix-a.md#sec-appendix-a-verbatim-ledger) `A72`），拆去常常遮蔽量子公平机制的三副维度脚手架：“静态块宇宙 vs. 动态移动指针”的二元对立、看似自足的平面周期闭合回路，以及固定维封闭盒子里的终极极限。为严守全书一以贯之的形式认识论契约，我们从一开始就将这四句话连成的整体宇宙观置于显式的诠释模型（`MODEL`）框架之下：在数学上，一族相容嵌套的子空间链 $\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots$ 与其闭包完备化既允许逐层递进的序列读法，也允许鸟瞰全局的整体读法，但将这种“静动不二”“闭合与极限皆为低维截断投影”“公平迫使平方、平方折叠相位并反弹为测不准”以及“物理时间即正交秩的单调诞生 $D \to D + 1$”上升为本体论命题，属于作者的几何—物理诠释（`MODEL`）；支撑每一环节的 Lean 4 内核冻结定理（`LEAN ✓`）、经典数学物理文献（`文献结果`）、显式手工代数推导（`手工推导`）与有限精度数值展示（`NUM`）各自保有严格且互不越界的成立前提。

### 31.4.1 截断投影下的闭合与极限幻象：静动不二与正交视界 {#sec-ch31-truncation-shadows}

为什么同一个数学构造既能被看成“静止的全局”，又能被看成“步步展开的过程”？考虑希尔伯特空间中一列带相容等距嵌入的闭子空间

$$
\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots \hookrightarrow \mathcal{V}_D \hookrightarrow \cdots,\qquad \mathcal{V}_\infty = \overline{\bigcup_{D \ge 1} \mathcal{V}_D}.
$$

站在完备并空间 $\mathcal{V}_\infty$ 的视角上，全部向量的内积关系同时在场；站在有限阶子空间序列 $\{\mathcal{V}_D\}_{D \ge 1}$ 的视角上，每一次向更高阶子空间的嵌入都揭示前一层尚未收纳的正交分量。需要指出，嵌套子空间链本身是纯粹的线性拓扑构造，并不会自动派生出唯一的哈密顿演化、固有时度规或热力学箭头；把“静态整体”与“动态序列”视为同一本体的两种切片视角，属于本书的本体诠释（`MODEL`）。

当观察者的读出被限制在低维子空间上时，高维空间中严格单调推进的开曲线就会在截断影子里呈现出“周而复始的闭合”。最直观的初等算例（`手工推导`，未单独封装为冻结定理）是三维欧氏空间中的常螺距开螺旋线与其平面投影：

$$
h(t) = (\cos t,\; \sin t,\; c t)\quad (c \neq 0),\qquad \pi_{xy} h(t) = (\cos t,\; \sin t) \in S^1.
$$

由于纵向高度坐标 $c t$ 关于实参数 $t \in \mathbb{R}$ 严格单射，空间曲线 $h$ 从不自交，更不存在任何周期回归；然而一旦正交投影 $\pi_{xy}$ 抹去第三维坐标 $c t$，平面读数便每经 $\Delta t = 2\pi$ 精确重演一次。这里同样要守住数学边界：二维平面上的单位圆 $S^1$ 本身是真实存在的紧致闭曲线，无穷维希尔伯特空间中也真实存在闭子空间与拓扑极限；投影能够遮蔽纵向推进，并不意味着数学中一切闭合对象都是错觉，将表观闭合解读为“被截断维度所掩盖的螺旋推进”属于 `MODEL`。

在拓扑与离散动力系统层面，这种“底空间读数闭合而覆叠态仍在推进”的现象拥有精确的内核形式化支撑。[第 5 章](ch05-complex-phase-and-rotors.md)锁定的圆周平方双覆叠定理（[@thm-circle-double-cover-history-lift]，[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift) 与无连续全局截面定理 [`no_continuous_global_section`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section)，其旋量双覆叠规范几何背景亦见[第 18 章](ch18-spinors-and-gauge-curvature.md)）已经证明：圆周倍角映射 $z \mapsto z^2$ 不存在连续全局平方根截面；底圆周绕行一整圈（$360^\circ$）的闭合回路从初值 $+1$ 唯一连续提升至对径叶 $-1$，唯有经手工特化复合两整圈回路（$720^\circ$）才重返 $+1$（完整的三维空间旋量群双覆叠 $\operatorname{Spin}(3) \to \operatorname{SO}(3)$ 仍归属经典文献）。而在离散尺度动力侧，`trureturing` 的黄金螺旋模块在万有覆叠上直接构造了一个保留离散层高、连续尺度提升与二元定向位的精确状态空间 `GoldenHelixState`：每个状态写作三元组 $(n, s, o) \in \mathbb{N} \times \mathbb{R} \times \mathrm{Bool}$，基本黄金尺度周期为 $T = \operatorname{goldenScalePeriod} = 2\log\varphi > 0$，单步覆叠推进定义为 $\operatorname{goldenHelixStep}(n, s, o) = (n + 1,\; s + T,\; \neg o)$，而第 $m \in \mathbb{Z}$ 阶整数傅里叶特征读出定义为归一化尺度坐标 $s / T$ 上的指数特征 $\operatorname{goldenHelixFourierReadout}(m, \text{state}) = \exp\bigl(2\pi i m (s / T)\bigr)$。其特征盲区定理如下：

::: {.theorem #thm-ch31-helix-readout-progress title="黄金尺度螺旋的整数傅里叶特征覆叠盲区定理" lean="D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_fourier_readout_step"}
对任意整数傅里叶模态 $m \in \mathbb{Z}$ 与任意黄金螺旋状态 $\text{state} : \operatorname{GoldenHelixState}$，单步覆叠推进保持该阶傅里叶特征读出严格不变：

$$
\operatorname{goldenHelixFourierReadout}\bigl(m,\; \operatorname{goldenHelixStep}(\text{state})\bigr) = \operatorname{goldenHelixFourierReadout}(m, \text{state}).
$$
:::

::: proof
由 `goldenHelixStep` 的定义，单步推进将连续尺度坐标从 $s$ 移至 $s + T$，其中基本周期 $T = \operatorname{goldenScalePeriod} = 2\log\varphi$ 严格为正。除以 $T$ 后，归一化尺度坐标满足 $(s + T)/T = s/T + 1$。对于任意整数模态 $m \in \mathbb{Z}$，归一化特征 $\chi_m(x) = \exp(2\pi i m x)$ 在平移 $x \mapsto x + 1$ 下乘以因子 $\exp(2\pi i m) = 1$，因此单步推进前后的傅里叶特征读数恒等。完整证明由 Lean 内核检查。
:::

与 [@thm-ch31-helix-readout-progress] 配套的三条同族冻结定理把“投影闭合”与“覆叠推进”的对比刻画得滴水不漏：层高递增定理 [`golden_helix_step_changes_level`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_step_changes_level) 证明每走一步都有 $(\operatorname{goldenHelixStep}(\text{state})).\mathrm{level} \neq \text{state}.\mathrm{level}$；联合读出检出定理 [`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step) 证明只要把层高坐标并入读出，对任意 $m \in \mathbb{Z}$ 均有

$$
\bigl((\operatorname{goldenHelixStep}(\text{state})).\mathrm{level},\; \operatorname{goldenHelixFourierReadout}(m, \operatorname{goldenHelixStep}(\text{state}))\bigr) \neq \bigl(\text{state}.\mathrm{level},\; \operatorname{goldenHelixFourierReadout}(m, \text{state})\bigr);
$$

而两步奇偶完备定理 [`golden_helix_two_step_orientation_complete_state_distinct`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenHelixParityReadout.golden_helix_two_step_orientation_complete_state_distinct) 进一步证明，连续推进两步之后，二元定向位虽恢复原值 $(\operatorname{goldenHelixStep}(\operatorname{goldenHelixStep}(\text{state}))).\mathrm{orientation} = \text{state}.\mathrm{orientation}$，但完整覆叠态依然严格相异 $\operatorname{goldenHelixStep}(\operatorname{goldenHelixStep}(\text{state})) \neq \text{state}$。当然，`level` 是该离散覆叠状态中显式规定的自然数分量，定理本身并不自动将其等同于相对论固有时或宇宙空间维数。

::: {.viz src="fairness-square-uncertainty-expansion" preset="helix-shadow" height="500"}
**开螺旋推进与低维闭合投影卡（`helix-shadow`）**：三维舞台同时呈现沿纵向坐标持续攀升的青色开螺旋轨迹 $h(t)$、底面 $(x, y)$ 上看似周而复始闭合的品红圆周投影 $\pi_{xy} h(t)$，以及黄金螺旋单步/双步推进下的傅里叶特征盲区与二元定向翻转；琥珀色标出当前选定的参数位置与覆叠步数。黄金螺旋特征盲区与层高分离属 `LEAN ✓`，圆周双覆叠提升见[第 5 章](ch05-complex-phase-and-rotors.md) [@thm-circle-double-cover-history-lift]（[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)），连续螺旋投影公式属 `手工推导`，采样轨迹坐标属 `NUM`，“时间隐于截断投影”属 `MODEL`。
:::

顺着正交投影再往前推一步，就能看清“$90^\circ$ 视界”与“有限截断极限”的确切几何含义。在实内积空间中，两个单位向量 $a, b$ 的标量内积为 $a \cdot b = \cos\theta$；当夹角恰好取 $\theta = \pi / 2$ 时，$\cos(\pi/2) = 0$（`手工推导`），意味着完全落在正交补方向上的分量在当前一维标量读出上投下严格的零影（平方读出 $\cos^2\theta$ 还会进一步把 $\theta$ 与 $\pi - \theta$ 折叠为同一数值）。引用这一正交零点时，必须将三种截然不同的几何角度严格区分开来：希尔伯特空间向量夹角 $\theta_{\mathrm{H}}$、单量子比特布洛赫球极角 $\theta_{\mathrm{B}}$（纯态跃迁重叠中进入的是半角 $\cos(\theta_{\mathrm{B}}/2)$，见[第 2 章](ch02-born-rule.md) [@ex-bloch-half-angle]），以及[第 17 章](ch17-lorentz-geometry.md)闵可夫斯基时空中的双曲快度与光锥倾角——任何把三者混同的滑移都会破坏各自的形式前提。

同样地，当我们考察无穷维内积空间中的递增子空间逼近时，拓扑学给出了“逐向量强收敛”与“算子范数一致间隙”并存的精确图景：一方面，在完备内积空间 $E$（标量域 $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$）中，二次正交补闭包定理 [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure) 证明对任意子空间 $M \le E$ 恒有 $M^{\perp\perp} = \overline{M}$；递增投影强极限定理 [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit) 证明，对单调递增且各自具备正交投影 $P_{S_n}$ 的子空间序列 $S_0 \le S_1 \le \cdots$，每个固定向量 $x$ 的投影 $P_{S_n} x$ 都按范数收敛至累积闭跨度上的投影 $P_{\overline{\bigcup_n S_n}} x$（且当终端正交余空间为零时按强算子拓扑逐点收敛于恒等算子 $\operatorname{id}$）。但另一方面，只要每一个有限阶段仍是真子空间，算子范数下的一致逼近就遭遇绝对阻断：

::: {.theorem #thm-ch31-truncation-strong-vs-uniform title="真子空间正交截断序列的一致完备化算子范数阻断定理" lean="D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction"}
设 $H$ 为标量域 $K$（`[RCLike K]`）上的内积空间，$S : I \to \operatorname{Submodule} K\, H$ 为一族各自具备正交投影 $P_{S_i} = (S_i).\operatorname{starProjection}$ 的真子空间（即对一切 $i \in I$ 有 $S_i \neq \top$），且 $\mathcal{F}$（`stageFilter : Filter I`）为指标集 $I$ 上的任意非平凡滤子（`[NeBot stageFilter]`）。则：

1. **恒定单位算子范数缺口**：对每一个截断阶段 $i \in I$，余投影算子范数恒等于 $1$，即 $\|\operatorname{id}_H - P_{S_i}\| = 1$；
2. **一致算子范数收敛阻断**：函数 $i \mapsto \|\operatorname{id}_H - P_{S_i}\|$ 沿滤子 $\mathcal{F}$ 不收敛于 $0$。
:::

::: proof
任取阶段 $i \in I$。因 $S_i$ 具备正交投影，全空间正交直和分解为 $H = S_i \oplus S_i^\perp$；若 $S_i^\perp = \bot$，则 $S_i = \top$，与真子空间假设 $S_i \neq \top$ 矛盾，故 $S_i^\perp$ 中必存在非零向量，归一化后得单位向量 $e_i \in S_i^\perp$（$\|e_i\| = 1$）。由于 $P_{S_i} e_i = 0$，有 $(\operatorname{id}_H - P_{S_i}) e_i = e_i$，从而算子范数满足 $\|\operatorname{id}_H - P_{S_i}\| \ge 1$；反之，对任意 $x \in H$，由勾股分解 $\|x\|^2 = \|P_{S_i} x\|^2 + \|(\operatorname{id}_H - P_{S_i}) x\|^2$ 知 $\|(\operatorname{id}_H - P_{S_i}) x\| \le \|x\|$，故 $\|\operatorname{id}_H - P_{S_i}\| = 1$。由于常值函数 $1$ 在实数拓扑中远离 $0$ 的开邻域，沿任何非平凡滤子 $\mathcal{F}$ 均不可能趋于 $0$。完整证明由 Lean 内核检查。
:::

将 [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit) 与 [@thm-ch31-truncation-strong-vs-uniform] 并置，便彻底澄清了“极限与截断”的精确关系：并非有限阶段在任何意义下都不能收敛——对任意给定的单个态向量，逐点投影确实强收敛；然而对尚未跨入的外部正交方向而言，任何真子空间截断都留有 $\|\operatorname{id}_H - P_{S_i}\| = 1$ 的满额盲区。

::: {.viz src="fairness-square-uncertainty-expansion" preset="horizon-limit" height="500"}
**$90^\circ$ 正交零影与强收敛—一致间隙对比卡（`horizon-limit`）**：左侧展示单位向量绕正交平面旋转至 $\theta = 90^\circ$ 时一维标量投影 $\cos\theta \to 0$ 的消隐过程；右侧同时绘制固定向量投影误差 $\|x - P_{S_n} x\| \to 0$ 的青色强收敛曲线，与每个真子空间阶段上由正交单位逃逸向量撑起的品红恒定算子范数缺口 $\|\operatorname{id} - P_{S_n}\| = 1$，琥珀色标出当前截断阶数 $n$。强极限与一致范数阻断属 `LEAN ✓`，离散截断阶数值模拟属 `NUM`，“视界即正交未展维度”属 `MODEL`。
:::

### 31.4.2 两两公平、二次配对与相位折叠下的不确定性 {#sec-ch31-pairing-phase-uncertainty}

明确了低维投影如何遮蔽正交分量之后，我们进入第二组核心命题：**“两两比较要公平，公平就要平方，平方又导致丢失细节测不准。”** 这条链路由三步紧密咬合的代数与几何机制组成，每一步都必须区分“哪些恒等式已被形式化锁定”与“哪些附加公理才足以唯一选出二次型”。

**第一步：两两比较的顺序与标架公平性，与二次配对的代数遴选。** 假设我们要在平面内用两个正交坐标分量 $(\cos\theta, \sin\theta)$ 或两个欧氏向量 $A, B$ 构造一个不偏袒任何人工坐标轴、也不依赖先后顺序的对称比较量。若直接取一阶绝对值之和 $|\cos\theta| + |\sin\theta|$，其数值会在 $[1, \sqrt{2}]$ 之间随参考系旋转而剧烈摆动（沿坐标轴时为 $1$，沿 $45^\circ$ 对角线时膨胀至 $\sqrt{2}$），公然赋予特定轴向几何特权；若在实欧氏克利福德代数中直接取有序几何积（`手工推导`）

$$
AB = A \cdot B + A \wedge B,\qquad \widetilde{AB} = BA = A \cdot B - A \wedge B,
$$

则只要外积双向量 $A \wedge B \neq 0$，就有 $AB \neq BA$，比较结果随左乘或右乘的先后顺序反号。要消除这种顺序依赖，最自然的对称化手段是将有序积与其逆序积（reversal）配对相乘：

$$
(AB)(BA) = (A \cdot B + A \wedge B)(A \cdot B - A \wedge B) = (A \cdot B)^2 + \|A \wedge B\|^2 = \|A\|^2 \|B\|^2.
$$

当 $A, B$ 为共面单位向量（记该平面单位双向量为 $I$，$I^2 = -1$，使 $AB = \cos\theta + I\sin\theta$）时，上式化为旋转不变且顺序无关的勾股恒等式 $\cos^2\theta + \sin^2\theta = 1$（注意此处 $AB$ 指克利福德几何积；若将 $AB$ 误读为纯标量点积，则 $(A\cdot B)(B\cdot A)$ 只剩 $\cos^2\theta$）。在这套克利福德手工代数背后，三块基石早已在本书前文中由 Lean 内核锁定：实坐标下的拉格朗日—格拉姆恒等式 $\bigl(\sum_i u_i^2\bigr)\bigl(\sum_i v_i^2\bigr) - \bigl(\sum_i u_i v_i\bigr)^2 = \frac{1}{2}\sum_{i,j}(u_i v_j - u_j v_i)^2$（[第 6 章](ch06-geometric-product.md) [@thm-lagrange-gram-identity]，[`lagrange_gram_identity`](lean:D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity)）、实内积空间的平行四边形范数律 $\|x + y\|^2 + \|x - y\|^2 = 2(\|x\|^2 + \|y\|^2)$（[第 1 章](ch01-measurement.md) [@thm-parallelogram-norm-law]，[`inner_product_norm_parallelogram_law`](lean:D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law)），以及秩一纯态投影迹化归为模平方的玻恩约化定理 $\operatorname{recordWeight}(|\phi\rangle\langle\phi|, |\psi\rangle\langle\psi|) = \|\langle\phi, \psi\rangle\|^2$（[第 2 章](ch02-born-rule.md) [@thm-born-modulus-square]，[`rank_one_pure_state_modulus_square_reduction`](lean:D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction)，配合归一化纯态互易权重 [@thm-rank-one-born-pairing] 与本章 [@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款）。

然而，形式诚实要求我们立即指出一个关键反例（`手工推导`）：**单凭双结局角度互易性与归一性，并不足以在数学上唯一逼出指数 $p = 2$**。事实上，对任意实指数 $p > 0$，双结局权重族

$$
w_p(\theta) = \frac{|\cos\theta|^p}{|\cos\theta|^p + |\sin\theta|^p}
$$

都满足交换对偶角时的互易对称性，且恒满足互补归一 $w_p(\theta) + w_p(\pi/2 - \theta) = 1$。要从所有 $p > 0$ 中唯一锁定 $p = 2$，必须显式引入额外的结构公理：要么在赋范线性空间侧要求范数服从平行四边形律，再调用约当—冯·诺依曼（Jordan–von Neumann, 1935）逆定理从 $L^p / \ell^p$ 族中筛出 $p = 2$（`文献结果`）；要么在维数 $d \ge 3$ 的闭子空间正交标架上要求非语境可加性并调用格里森（Gleason, 1957）定理（`文献结果`），或在任意有限维希尔伯特空间上对全体效应算子施加可加性以调用[第 2 章](ch02-born-rule.md)已形式化的布什效应密度表出定理（[@thm-busch-effect-density]，`LEAN ✓`）。

除此之外，在复振幅多项式读出侧，“全局共同相位无关性”（即物理读数不偏袒复平面上任何全局相位基准 $z \mapsto e^{i\theta} z$）同样给出了一条精确指向二次配对代数的冻结定理。记有限指标集为 $\iota$（`[Fintype ι]`），令 $\operatorname{Poly}(\iota) = \operatorname{MvPolynomial}(\iota \oplus \iota, \mathbb{C})$ 表示形式全纯与反全纯变元 $(z_i, \bar{z}_i)_{i \in \iota}$ 上的复系数多元多项式环，其在复向量 $z : \iota \to \mathbb{C}$ 处的实际求值记作 $\operatorname{actual}(p, z)$（即将左半变元代入 $z_i$、右半变元代入共轭 $\overline{z_i}$）：

::: {.theorem #thm-ch31-phase-polynomial-quadratic title="全局共同相位不变多项式的电荷平衡、最低二次次数与厄米矩阵唯一表出定理" lean="D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem"}
设 $\iota$ 为有限指标集（`[Fintype ι]`），$p \in \operatorname{Poly}(\iota)$ 为任意复振幅多项式。则以下四组结论同时成立：

1. **笛卡尔坐标转换与次数保持**：存在唯一的复共轭多项式 $q \in \operatorname{Poly}(\iota)$，使得对一切 $z : \iota \to \mathbb{C}$ 均有 $\operatorname{actual}(q, z) = \operatorname{eval}(\operatorname{cartesian}(z), p)$；且笛卡尔转换映射 `toCartesian` 保持总次数不变，并保持任意给定阶数 $d$ 的齐次性充要等价；
2. **共同相位不变性、全纯—反全纯电荷平衡与二次代数生成**：多项式 $p$ 在全体共同相位旋转 $z \mapsto e^{i\theta} z$（$\forall \theta \in \mathbb{R}$）下实际求值不变（`Invariant p`），当且仅当其每一个非零单项式的全纯总次数与反全纯总次数相等（`Balanced p`），亦当且仅当 $p$ 属于由二次共轭对 $z_i \bar{z}_j$ 生成的子代数 `quadraticAlgebra`（从而其实际求值函数属于 `actualQuadraticAlgebra`）；
3. **非平凡不变式的最低次数下界 $2$**：任何非常数共同相位不变多项式（$\neg \exists c \in \mathbb{C},\; p = C(c)$）必满足 $\operatorname{totalDegree}(p) \ge 2$；且对任意坐标指标 $i \in \iota$，对角二次生成元 $z_i \bar{z}_i$（`quadraticGenerator (i, i)`）本身即为总次数恰等于 $2$ 的共同相位不变多项式；
4. **二阶实齐次不变式的唯一厄米矩阵与半正定判据**：若 $p$ 为 $2$ 阶齐次多项式、对一切 $z$ 实际取实值（$\operatorname{Im}\operatorname{actual}(p, z) = 0$）且满足共同相位不变性，则存在**唯一**的复矩阵 $H \in \operatorname{Matrix}(\iota, \iota, \mathbb{C})$（在所有满足 $\forall z,\; \operatorname{actual}(p, z) = z^\dagger H z$ 的复矩阵中唯一），使得 $H$ 为厄米矩阵（`H.IsHermitian`）、矩阵元由 $H_{ji} = p.\operatorname{coeff}(\operatorname{pairExponent}(i, j))$ 给出，且对一切 $z$ 成立 $\operatorname{Re}\operatorname{actual}(p, z) \ge 0$ 当且仅当 $H$ 半正定（`H.PosSemidef`）。
:::

::: proof
利用实部与虚部的复线性可逆变换 $x_i = (z_i + \bar{z}_i)/2$、$y_i = (z_i - \bar{z}_i)/(2i)$，实笛卡尔多项式与 $(z, \bar{z})$ 形式多项式之间建立保持总次数与齐次性的双射。当输入施行全局相位旋转 $z \mapsto e^{i\theta} z$ 时，双次数为 $(a, b)$ 的单项式乘以特征因子 $e^{i(a-b)\theta}$；由不同整数频率三角指数的线性独立性，实际求值对一切 $\theta \in \mathbb{R}$ 不变当且仅当每个非零单项式均满足电荷平衡 $a = b$。满足 $a = b$ 的任意单项式均可将 $a$ 个全纯变元与 $a$ 个反全纯变元逐对配成 $z_i \bar{z}_j$ 的乘积，故 `Balanced p` 与属于 `quadraticAlgebra` 等价；若 $p$ 非常数，则至少存在一个 $a = b \ge 1$ 的非零单项式，总次数 $a + b = 2a \ge 2$。当 $p$ 进一步为 $2$ 阶齐次实值不变式时，其仅含 $a = b = 1$ 的双线性共轭项 $\sum_{i,j} c_{ij} \overline{z_j} z_i$；由复双线性型极化恒等式知表示矩阵 $H$ 唯一，实值性迫使 $H^\dagger = H$，而非负性按定义等价于复半正定性 `H.PosSemidef`。完整证明由 Lean 内核检查。
:::

注意 [@thm-ch31-phase-polynomial-quadratic] 第 2 条同时表明：诸如 $|z|^4 = (z\bar{z})^2$ 之类的四次及更高偶次平衡多项式同样属于 `quadraticAlgebra`；因此，“共同相位不变”负责排除一切一阶线性读出并把最低非平凡次数推至 $2$，而从全体偶次平衡代数中进一步挑出第 4 条的二阶齐次厄米二次型，则对应于叠加最低次数原则或正交标架可加性公理。

::: {.viz src="fairness-square-uncertainty-expansion" preset="fair-square" height="500"}
**两两公平与二次配对标架检验卡（`fair-square`）**：同一角度滑块同步对比随标架旋转起伏的品红线性绝对值和 $|\cos\theta| + |\sin\theta| \in [1, \sqrt{2}]$、一般幂次权重族 $w_p(\theta)$，以及严格守恒在单位圆上的青色二次勾股和 $\cos^2\theta + \sin^2\theta = 1$（配克利福德逆序积 $(AB)(BA)$ 几何示意）；琥珀色标出当前选定的夹角 $\theta$ 与指数 $p$。平行四边形正定理、玻恩秩一约化与共同相位多项式定理属 `LEAN ✓`，约当—冯·诺依曼与格里森定理属 `文献结果`，采样角度残差属 `NUM`。
:::

**第二步：平方折叠符号与相对相位，造成单基读出的相位盲区。** 一旦读出规则采用二次配对，代数上的不可逆折叠便随之发生。为了不把不同载体上的“丢失细节”混为一谈，我们必须精确区分四种映射的原像纤维：

1. **实轴平方映射 $x \mapsto x^2$（$\mathbb{R} \to \mathbb{R}_{\ge 0}$）**：对每个正读数 $y > 0$，原像纤维恰为两个离散符号点 $\{+\sqrt{y}, -\sqrt{y}\}$（在 $y = 0$ 处退化为单点 $\{0\}$，`手工推导`）；
2. **单位圆倍角映射 $z \mapsto z^2$（$S^1 \to S^1$）**：将对径点 $\{+z, -z\}$ 折叠为同一点并使相位角加倍，不存在连续全局逆截面（[第 5 章](ch05-complex-phase-and-rotors.md) [@thm-circle-double-cover-history-lift]，[`circle_double_cover_history_lift`](lean:D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift)，`LEAN ✓`）；
3. **复平面模平方映射 $z \mapsto |z|^2$（$\mathbb{C} \to \mathbb{R}_{\ge 0}$）**：对任意正模平方 $r^2 > 0$，原像纤维是整整一圈连续相位圆周 $\{r e^{i\alpha} \mid \alpha \in [0, 2\pi)\} \cong S^1$，而绝非两个离散点（`手工推导`）；
4. **固定正交基下的玻恩概率读出**：单个纯态的**全局相位** $|\psi\rangle \mapsto e^{i\alpha}|\psi\rangle$ 不改变密度算子 $|\psi\rangle\langle\psi|$，属于冗余规范自由度；但不同基分量之间的**相对相位**却真实改变纯态密度算子的非对角相干元！如果观察者只读取某一固定计算基下的对角可观测量，模平方运算就会把正负相对相位彻底抹平：

::: {.theorem #thm-ch31-diagonal-phase-blindness title="对角可观测量族对量子比特相对相位的联合读出盲区定理" lean="D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase"}
设 $I$ 为任意指标类型，`observable : I → QubitMatrix` 为任意一族在计算基下全为对角矩阵的单量子比特可观测量（即 $\forall i \in I,\; (\operatorname{observable} i).\operatorname{IsDiag}$）。记等幅正负叠加纯态密度矩阵分别为 $\rho_+ = |+\rangle\langle+|$（`equalSuperpositionDensity`）与 $\rho_- = Z \rho_+ Z = |-\rangle\langle-|$，并记玻恩读出为 $\operatorname{bornProbability}(\rho, O) = \operatorname{Re}\operatorname{Tr}(\rho O)$。则：

1. **量子态严格相异而对角联合读出全同**：$\rho_+ \neq \rho_-$，但两者在整个对角可观测量族上的联合玻恩读出完全相等，即
   $$
   \operatorname{jointReadout}\bigl(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \operatorname{observable} i),\; \rho_+\bigr) = \operatorname{jointReadout}\bigl(\lambda i\,\rho.\,\operatorname{bornProbability}(\rho, \operatorname{observable} i),\; \rho_-\bigr);
   $$
2. **区分接口的非对角必要性**：凡满足 $\operatorname{bornProbability}(\rho_+, \text{interface}) \neq \operatorname{bornProbability}(\rho_-, \text{interface})$ 的单量子比特矩阵 `interface : QubitMatrix`，必不是对角矩阵（$\neg \text{interface}.\operatorname{IsDiag}$）；
3. **互补泡利 $X$ 接口显影相对相位**：泡利矩阵 $X$（`qubitX`）满足 $\neg X.\operatorname{IsDiag}$，且严格区分两态：$\operatorname{bornProbability}(\rho_+, X) \neq \operatorname{bornProbability}(\rho_-, X)$。
:::

::: proof
在二元计算基 $\{|0\rangle, |1\rangle\}$ 下，$\rho_+ = \frac{1}{2}\begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$，而经泡利 $Z = \operatorname{diag}(1, -1)$ 共轭后的 $\rho_- = \frac{1}{2}\begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$。两者右上角非对角元分别为 $+1/2$ 与 $-1/2$，故 $\rho_+ \neq \rho_-$；但对任意对角矩阵 $D = \operatorname{diag}(d_0, d_1)$，迹 $\operatorname{Tr}(\rho_\pm D) = (d_0 + d_1)/2$ 仅读取对角元而完全消去非对角符号，因此对任意指标族 $I$ 上的对角可观测量族联合读数恒等，从而任何能区分两态的接口矩阵必具非零非对角元。取泡利 $X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$，其非对角，且给出 $\operatorname{Re}\operatorname{Tr}(\rho_+ X) = +1 \neq -1 = \operatorname{Re}\operatorname{Tr}(\rho_- X)$。完整证明由 Lean 内核检查。
:::

尽管该声明的历史命名带有 `prime` 字样，其内核类型签名对任意指标集 $I$ 上的全体对角矩阵一致成立：单一计算基上的模平方读出看不见相对相位，唯有旋转到非对角的互补测量语境（如泡利 $X$）才能将被折叠的相干符号重新显影。

::: {.viz src="fairness-square-uncertainty-expansion" preset="phase-fold" height="500"}
**平方纤维折叠与对角相位盲区卡（`phase-fold`）**：并排对比实数平方 $x \mapsto x^2$ 的正负双点纤维、复模平方 $z \mapsto |z|^2$ 的整圈 $S^1$ 相位圆纤维，以及量子比特 $|+\rangle\langle+|$ 与 $|-\rangle\langle-|$ 在全体计算基对角可观测量下的品红重合读数与在互补泡利 $X$ 接口下的青色分离读数；琥珀色标出当前选定的相对相位角。对角盲区与圆周双覆叠属 `LEAN ✓`，实/复初等原像纤维属 `手工推导`，采样纤维点属 `NUM`。
:::

**第三步：被单基读出舍弃的横向面积，在非对易互补对上反弹为罗伯逊—薛定谔不确定性。** 当两个可观测量不能在同一组正交基下同时对角化时，方差之积究竟由什么几何量支撑？[第 6 章](ch06-geometric-product.md)已经完整形式化并锁定了复内积空间上对称复线性算子 $A, B : E \to E$ 的精确等式版罗伯逊—薛定谔恒等式（[@thm-robertson-schrodinger]，[`robertson_schrodinger`](lean:D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger)，有限维混态矩阵推广见 [@thm-mixed-state-robertson]）。具体而言，对单位态向量 $\psi$（$\|\psi\| = 1$），置中心化涨落向量 $u = (A - \langle A\rangle)\psi$、$v = (B - \langle B\rangle)\psi$ 及复内积 $z = \langle u, v\rangle_{\mathbb{C}}$，定义实对称协方差 $C = \frac{1}{2}\operatorname{Re}\langle\psi, (AB + BA)\psi\rangle_{\mathbb{C}} - \langle A\rangle\langle B\rangle$、半换位子期望 $K = \frac{1}{2i}\langle\psi, (AB - BA)\psi\rangle_{\mathbb{C}}$ 与复格拉姆余项 $G = \|u\|^2\|v\|^2 - \|\langle u, v\rangle_{\mathbb{C}}\|^2$，则 [@thm-robertson-schrodinger] 同时锁定四条精确结论：

$$
(\Delta A)^2(\Delta B)^2 = \|u\|^2\|v\|^2 = C^2 + \|K\|^2 + G,\qquad G \ge 0,\qquad \operatorname{Re} z = C,\qquad (\operatorname{Im} z : \mathbb{C}) = K.
$$

略去非负余项 $G \ge 0$ 即得罗伯逊—薛定谔不等式 $(\Delta A)^2(\Delta B)^2 \ge C^2 + \|K\|^2$，再略去 $C^2 \ge 0$ 即由手工开方得常见换位子下界 $\Delta A\,\Delta B \ge \|K\|$。

在几何直观上，此处有一处极易混淆的标量域区分必须点透：**复格拉姆余项 $G$、半换位子面积 $\|K\|^2$ 与底层实希尔伯特空间上的外积面积并非同一个量**。若把 $E$ 视为实内积空间（取实内积 $\operatorname{Re}\langle u, v\rangle_{\mathbb{C}}$，对应[第 6 章](ch06-geometric-product.md)实坐标 [@thm-lagrange-gram-identity]），实外积张成的平行四边形面积平方恰为（`手工推导`）

$$
\|u \wedge_{\mathbb{R}} v\|^2 = \|u\|^2\|v\|^2 - (\operatorname{Re}\langle u, v\rangle_{\mathbb{C}})^2 = \|K\|^2 + G.
$$

让我们用一个精确到整数的单量子比特手工算例（`手工推导`）验证这一分解：取 $A = X$、$B = Y$、初态为单位纯态 $\psi = |0\rangle$。此时期望值 $\langle X\rangle = \langle Y\rangle = 0$，中心化涨落向量分别为 $u = X|0\rangle = |1\rangle$ 与 $v = Y|0\rangle = i|1\rangle$，故方差满足 $(\Delta X)^2 = \|u\|^2 = 1$、$(\Delta Y)^2 = \|v\|^2 = 1$。计算复内积得 $z = \langle u, v\rangle_{\mathbb{C}} = i$，于是协方差 $C = \operatorname{Re}(i) = 0$，半换位子项 $K = \operatorname{Im}(i) = 1$，而**复格拉姆余项 $G = 1 \cdot 1 - |i|^2 = 0$**！可以看到，因为 $v = i u$ 与 $u$ 落在同一条复射线上，复格拉姆余项 $G$ 完全为零；然而虚数单位 $i$ 在底层实空间里恰是一次 $90^\circ$ 正交相位旋转，使实平面上的 $u$ 与 $v$ 撑开单位实外积面积 $\|u \wedge_{\mathbb{R}} v\|^2 = \|K\|^2 + G = 1$，精确饱和 $(\Delta X)^2(\Delta Y)^2 = 1$。

::: {.remark #rem-ch31-jvn-gleason-robertson-literature title="文献结果：平行四边形逆定理、格里森定理、无界正则对易子与无相位重构（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 为将本小节已锁定的有限维与有界线性代数定理同经典泛函分析及层析文献严格区分，须保留以下四项文献边界：

1. **约当—冯·诺依曼平行四边形逆定理**（P. Jordan & J. von Neumann, *Ann. of Math.* **36**, 1935, 719–723）：实或复赋范空间上的范数由内积诱导（并可经实/复极化恒等式唯一重构内积），当且仅当该范数满足平行四边形恒等式；在至少含两个不相交非零支撑坐标的标准非退化 $L^p / \ell^p$ 赋范族（$1 \le p \le \infty$）中，这唯一筛出 $p = 2$（[第 1 章](ch01-measurement.md) [@thm-parallelogram-norm-law] 形式化的是实内积空间的正向蕴含）。
2. **格里森闭子空间测度定理**（A. M. Gleason, *J. Math. Mech.* **6**, 1957, 885–893）：在维数 $d \ge 3$ 的可分实或复希尔伯特空间上，闭子空间投影格上的任何归一非负正交可加测度均表为密度算子迹 $P \mapsto \operatorname{Tr}(\rho P)$。该定理对 $d = 2$ 的纯投影格不成立（[第 2 章](ch02-born-rule.md) [@thm-busch-effect-density] 之所以涵盖 $d = 2$，是因为对全体效应算子施加了更强的凸线性可加性前提）。
3. **罗伯逊（1929）与薛定谔（1930）及无界正则算子定义域条件**（H. P. Robertson, *Phys. Rev.* **34**, 1929, 163–164；E. Schrödinger, *Sitzungsber. Preuss. Akad. Wiss.*, 1930, 296–303）：本书 [@thm-robertson-schrodinger] 与 [@thm-mixed-state-robertson] 已锁定全空间定义的对称复线性映射与有限维混态矩阵；而连续空间 $L^2(\mathbb{R})$ 上无界位置—动量正则对 $[x, p] = i\hbar I$ 导出 $\Delta x\,\Delta p \ge \hbar / 2$，必须额外附加稠密公共不变定义域与有限二阶矩假设（在任何非零有限维空间中，由于矩阵换位子的迹恒为 $\operatorname{Tr}[A, B] = 0$，绝不可能存在满足 $[A, B] = i\hbar I$（$\hbar \neq 0$）的有限维矩阵对）。
4. **无相位测量重构的充要丰富度**（R. Balan, P. Casazza & D. Edidin, *Appl. Comput. Harmon. Anal.* **20**, 2006, 345–356；A. Conca, D. Edidin, M. Hering & C. Vinzant, *Appl. Comput. Harmon. Anal.* **38**(2), 2015, 346–356）：模平方丢失单个幅值的相位并不意味着相位永远无法通过多组测量恢复；当测量框架足够丰富（Balan–Casazza–Edidin 2006 证明一般位置的 $4d - 2$ 个框架向量已足够，Conca–Edidin–Hering–Vinzant 2015 进一步确立 $\mathbb{C}^d$ 中一般位置 $4d - 4$ 个框架向量的单射性阈值）时，纯态射线可在模去全局相位的意义下由模平方读数唯一重构——[@thm-ch31-diagonal-phase-blindness] 揭示的是固定单基对角观测目录的结构性不足。
:::

把以上三步合起来看，我们也要划清教学叙事与形式蕴含的界限：在 [@thm-robertson-schrodinger] 中，不确定性下界对**完全已知**的纯态 $|0\rangle$ 与已知算子 $X, Y$ 严格成立，因此量子测不准绝不是“观察者不知道某个经典隐藏相位”的主观无知；将“两两比较公平 $\implies$ 二次模平方 $\implies$ 单基折叠相位细节 $\implies$ 横向换位子面积反弹为不确定性”串联为一条统一的因果发生链，属于统摄这组独立严格定理的几何诠释（`MODEL`）。

::: {.viz src="fairness-square-uncertainty-expansion" preset="uncertainty-wedge" height="500"}
**罗伯逊—薛定谔方差分解与实外积面积卡（`uncertainty-wedge`）**：展示量子比特态在非对易可观测量对（如 $X, Y$ 作用于 $|0\rangle$ 或一般旋转态）下的中心化涨落向量 $u, v$。青色面积块标出底层实希尔伯特空间外积面积 $\|u \wedge_{\mathbb{R}} v\|^2 = \|K\|^2 + G$，品红分量拆解协方差平方 $C^2$、半换位子项 $\|K\|^2$ 与复格拉姆余项 $G$，琥珀色标出当前态向量与算子夹角。纯态恒等式与有限维混态下界属 `LEAN ✓`（[@thm-robertson-schrodinger]、[@thm-mixed-state-robertson]），$|0\rangle$ 上 $X, Y$ 整数检核属 `手工推导`，连续滑块数值属 `NUM`，从相位折叠到测不准的本体因果叙事属 `MODEL`。
:::

### 31.4.3 时间作为单调正交维度扩张：有限盒饱和与素数新轴突围 {#sec-ch31-time-orthogonal-expansion}

现在我们来到本节四句命题中最具突破性的最后一句话：**“时间是维度扩张.”** 在数学上，这句话把“封闭有限维盒子里的演化宿命”与“开放正交补空间中的新轴诞生”摆上了同一架天平。

先看正交补空间与逐层壳扩张的精确希尔伯特几何。对完备内积空间 $E$ 中的任意闭子空间 $M$，正交补投影恒等式定理 [`orthogonal_complement_projection_identities`](lean:D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities) 锁定了余投影关系 $P_{M^\perp} = \operatorname{id}_E - P_M$、两个投影各自的幂等性、交叉复合恒为零（$P_M P_{M^\perp} = P_{M^\perp} P_M = 0$）以及恒等分解 $P_M + P_{M^\perp} = \operatorname{id}_E$；而在实希尔伯特空间中，有限阶壳扩张定理 [`finite_stage_expansion`](lean:D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion) 证明，只要每一层新增闭壳满足 $E_{k+1} \le S_k^\perp$ 且累积闭子空间按 $S_{k+1} = S_k \sqcup E_{k+1}$ 递推，第 $n$ 阶空间就精确分解为初始核与前 $n$ 层正交壳的直和 $S_n = S_0 \sqcup \bigsqcup_{k=1}^n E_k$，全空间分解为 $S_0 \sqcup \bigsqcup_{k=1}^n E_k \sqcup S_n^\perp$，且当前正交余空间满足递推剥离 $S_n^\perp = E_{n+1} \sqcup S_{n+1}^\perp$（注意该定理本身允许零壳 $E_{k+1} = \bot$，并不无条件强迫维数严格增长）。唯有当正交补空间非零时，有限层外部才必然存在与当前已知子空间保持满额单位距离的正交逃逸新轴：

::: {.theorem #thm-ch31-projection-residual-escape title="非满闭子空间的正交余项单位逃逸向量定理" lean="D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape"}
设 $V$ 为标量域 $\mathbb{K}$（`[RCLike 𝕜]`）上的完备希尔伯特空间（`[CompleteSpace V]`），$S \le V$ 为闭子空间（`[CompleteSpace S]`），且其正交补非平凡：$S^\perp \neq \bot$。则存在逃逸向量 $e \in V$ 同时满足五条性质：

$$
e \in S^\perp,\qquad \|e\| = 1,\qquad P_S e = 0,\qquad \operatorname{infDist}(e, S) = 1,\qquad \|\operatorname{id}_V - P_S\| = 1.
$$
:::

::: proof
因假设 $S^\perp \neq \bot$，正交补子空间中存在非零向量 $v \in S^\perp$（$v \neq 0$）。取归一化向量 $e = \|v\|^{-1} v$，由子空间数乘封闭性知 $e \in S^\perp$ 且 $\|e\| = 1$；正交补核性质给出 $P_S e = 0$。对任意 $s \in S$，因 $e \perp (-s)$，勾股定理给出 $\|e - s\|^2 = \|e\|^2 + \|s\|^2 = 1 + \|s\|^2 \ge 1$，且当 $s = 0 \in S$ 时取到等号 $\|e - 0\| = 1$，故点到集合的度量下确界距离精确等于 $\operatorname{infDist}(e, S) = 1$。最后，由 $(\operatorname{id}_V - P_S) e = e$ 及正交余投影 $\operatorname{id}_V - P_S = P_{S^\perp}$ 的算子范数收缩性，即得 $\|\operatorname{id}_V - P_S\| = 1$。完整证明由 Lean 内核检查。
:::

在此基础上，若第 $D$ 步的新输入向量 $u_D$ 在当前 $D$ 维子空间 $V_D$ 外留下了**非零**正交创新余项 $r_D = u_D - P_{V_D} u_D \neq 0$，手工直和代数（`手工推导`）立即给出单轴扩张 $e_{D+1} = r_D / \|r_D\|$ 与 $V_{D+1} = V_D \oplus \operatorname{span}\{e_{D+1}\}$，使维数严格加一：$\dim V_{D+1} = \dim V_D + 1$（对应的未归一化格拉姆行列式乘以因子 $\|r_D\|^2$，归一化后保持 $\det\operatorname{diag}(G_D, 1) = \det G_D$）。这里同样要澄清霍奇星算子（Hodge star）的类型边界（`手工推导`）：在固定定向的 $n$ 维欧氏空间中，$\star_n : \Lambda^k \mathbb{R}^n \to \Lambda^{n-k} \mathbb{R}^n$ 将最高阶外积 $\star_n(e_1 \wedge \cdots \wedge e_n)$ 映射为标量 $\Lambda^0 \mathbb{R}^n$，并不会凭空造出第 $n + 1$ 维；只有预先选定了 $(n + 1)$ 维定向母空间与嵌入后，才有 $\star_{n+1}(e_1 \wedge \cdots \wedge e_n) = e_{n+1}$——将“外积法向催生新空间维”读作动态创生律属于 `MODEL`。

与这种向母空间外部的突围恰成鲜明对照，如果我们把演化死死关进一个**固定有限维闭盒** $V$ 之内，只靠固定线性演化算子 $T : V \to_{\mathbb{K}} V$ 与固定观测读出映射 $C : V \to_{\mathbb{K}} Y$ 反复迭代，系统的可观测克雷洛夫（Krylov）子空间链

$$
O_m = \operatorname{observableKrylov}(T, C, m) = \operatorname{span}\bigl\{(T^*)^k C^* y \;\big|\; 0 \le k \le m,\; y \in Y\bigr\}
$$

就绝无可能无限开辟新维度，而必然在有限步内触顶锁死：

::: {.theorem #thm-ch31-krylov-growth-stability title="有限维可观测克雷洛夫子空间链的严格增长步数上界定理" lean="D5/S3/ObserverMemory/Dynamics/ObservableKrylovGrowthBound.observable_krylov_strict_growth_bound"}
设 $V$ 与 $Y$ 为标量域 $\mathbb{K}$（`[RCLike 𝕜]`）上的有限维内积空间，$T : V \to_{\mathbb{K}} V$ 与 $C : V \to_{\mathbb{K}} Y$ 为 $\mathbb{K}$-线性映射。记递增可观测克雷洛夫子空间链为 $O_m = \operatorname{observableKrylov}(T, C, m)$（$m \in \mathbb{N}$）。则发生严格子空间扩张的时刻集合之广义基数满足精确上界：

$$
\operatorname{encard}\bigl\{m \in \mathbb{N} \;\big|\; O_m < O_{m+1}\bigr\} \le \operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C).
$$
:::

::: proof
初始第 $0$ 层空间 $O_0 = \operatorname{range}(C^*)$ 的维数等于 $\operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$，且对一切 $m \in \mathbb{N}$ 有单调包含 $O_m \le O_{m+1} \le V$。每当第 $m$ 步发生严格包含 $O_m < O_{m+1}$ 时，有限维数 $\operatorname{finrank}_{\mathbb{K}} O_m$ 至少严格增加 $1$。由于全空间维数上界为有限自然数 $\operatorname{finrank}_{\mathbb{K}} V$，从初始维数 $\operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$ 出发至多只能发生 $\operatorname{finrank}_{\mathbb{K}} V - \operatorname{finrank}_{\mathbb{K}}(\operatorname{range} C)$ 次严格维数跃升。完整证明由 Lean 内核检查。
:::

紧随其后的永久稳定定理 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 把封闭盒子的停滞宿命彻底钉死：在同一组有限维假设下，一旦某一步不再涌现新秩（$O_m = O_{m+1}$），由于 $T^*(O_m) \subseteq O_{m+1} = O_m$ 使 $O_m$ 成为 $T^*$-不变子空间，此后对一切 $r \in \mathbb{N}$ 恒有 $O_{m+r} = O_m$——再也不会有任何新方向诞生。

那么，在算术与离散结构的底层，是否存在一个永不被任何有限清单穷尽、永远能在任意有限集合之外提供全新独立指标的严格原型？答案正是欧几里得素数突围的有限集合内核定理：

::: {.theorem #thm-ch31-prime-axis-escape title="有限素数集乘积加一的同余互素余一与外部新素数突围定理" lean="D5/S3/Axis/PrimeAxisEscape.prime_axis_escape"}
设 $S$（`S : Finset ℕ`）为任意有限自然数集合，且其中每个元素均为素数（$\forall p \in S,\; \operatorname{Nat.Prime}(p)$）。记乘积加一构造数为 $N_S = \prod_{p \in S} p + 1$（`S.prod id + 1`）。则：

1. **对全体旧素数模余一**：对每一个已有素数 $p \in S$，均成立同余式 $N_S \equiv 1 \pmod p$（`Nat.ModEq p (S.prod id + 1) 1`）；
2. **集合外部必有新素因子突围**：存在自然数 $q \in \mathbb{N}$，使得 $q$ 为素数、$q \mid N_S$，且 $q \notin S$。
:::

::: proof
任取 $p \in S$，因 $p$ 整除有限乘积 $\prod_{r \in S} r$，故 $N_S = \prod_{r \in S} r + 1$ 除以 $p$ 余 $1$，即 $N_S \equiv 1 \pmod p$（当 $S = \emptyset$ 时空乘积为 $1$，$N_\emptyset = 2$，结论空真成立且素因子 $q = 2 \notin \emptyset$）。由于每个 $p \in S$ 满足 $p \ge 2$，乘积 $\prod_{r \in S} r \ge 1$，从而 $N_S \ge 2$，故 $N_S$ 必有至少一个素因子 $q \mid N_S$。若假设 $q \in S$，则由第 1 条知 $N_S \equiv 1 \pmod q$，结合 $q \mid N_S$ 将推出 $q \mid 1$，与 $q$ 为素数矛盾；因此必有 $q \notin S$。完整证明由 Lean 内核检查。
:::

为了防止把构造数 $N_S$ 误读为“一定是素数”或“第 $|S| + 1$ 个顺序素数”，我们做一个精确整数检核（`手工推导`）：取前六个素数组成的有限集 $S = \{2, 3, 5, 7, 11, 13\}$，计算得

$$
N_S = 2 \cdot 3 \cdot 5 \cdot 7 \cdot 11 \cdot 13 + 1 = 30030 + 1 = 30031 = 59 \cdot 509.
$$

此处 $N_S = 30031$ 是**合数**而非素数，且它的两个素因子 $59$ 与 $509$ 都不是紧随 $13$ 之后的第 $7$ 个素数 $17$——但两者都严格落在旧集合 $S$ 之外（$59 \notin S$，$509 \notin S$），完美印证 [@thm-ch31-prime-axis-escape] 的精确陈述。

::: {.remark #rem-ch31-krylov-euclid-literature title="文献结果：欧几里得《几何原本》素数无穷多命题与兰佐斯—克雷洛夫迭代终止理论（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本小节的形式化定理与两部经典数学文献遥相呼应，各自边界如下：

1. **欧几里得《几何原本》第 IX 卷命题 20**（Euclid, *Elements*, Book IX, Prop. 20）：证明素数多于任何给定的有限素数清单。本书 [@thm-ch31-prime-axis-escape] 已在 Lean 内核中锁定其任意有限素数集 $S$ 上的乘积加一同余与外部素因子存在性核心；由该有限突围步经反证法导出全体素数集合无穷，以及与算术级数素数分布相关的解析数论结论，作为经典文献背景引用。
2. **兰佐斯三对角化与阿诺德—克雷洛夫子空间迭代理论**（C. Lanczos, *J. Res. Nat. Bur. Stand.* **45**, 1950, 255–282）：在数值线性代数与算子谱理论中，Lanczos 与 Arnoldi 算法通过对 $v, Tv, T^2 v, \dots$ 逐次施密特正交化提取正交新轴，并在残差归零（命中不变子空间，即良性中断 breakdown）或耗尽有限环境空间维数时精确终止。本书 [@thm-ch31-krylov-growth-stability] 与 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 锁定了有限维可观测块克雷洛夫链的严格增长步数上界与一旦稳定永久不变定律；具体矩阵分解算法与浮点舍入稳定性分析属经典文献。
:::

现在，我们可以把算术突围、正交余项与时间概念放入显式的几何—物理模型（`MODEL`）中完成收束。为了将算术中的素数独立性转化为几何中的正交坐标轴，我们在模型层显式定义可数无穷维希尔伯特空间 $\mathcal{H} = \ell^2(\mathbb{P})$，以全体素数集合 $\mathbb{P}$ 索引一组标准正交基 $\{e_p\}_{p \in \mathbb{P}}$：这样，每当 [@thm-ch31-prime-axis-escape] 在任意有限素数集 $S$ 之外见证一个新素因子 $q_{\mathrm{new}} \notin S$，几何空间中就精确对应一条与旧有有限盒 $V_S = \operatorname{span}\{e_p \mid p \in S\}$ 完全正交的单位新轴 $e_{q_{\mathrm{new}}} \in V_S^\perp$（注意这一人为规定的标准正交基 $\ell^2(\mathbb{P})$ 必须与[第 22 章](ch22-primes-euler-products-and-zeros.md)已锁定的素数对数 $\log p$ 在 $\mathbb{Z}$ 或 $\mathbb{Q}$ 上的线性无关性严格区分——实数族 $\{\log p\} \subset \mathbb{R}$ 在实数域 $\mathbb{R}$ 上并不线性无关，本身不是欧氏正交向量）。

在这一模型（`MODEL`）下，定义**创新事件时钟** $\tau(n) = \dim V_n - \dim V_0$：只要宇宙不把观察者永久囚禁在固定秩的有限盒 $(V, T, C)$ 内任由 [@thm-ch31-krylov-growth-stability] 饱和停滞，每一次来自盒外正交余空间 $V_D^\perp$ 的非零新输入（[@thm-ch31-projection-residual-escape]）都推动正交秩实现单调跃升 $D \to D + 1$。与此同时，形式纪律要求我们将这个“正交秩诞生时钟”与常规实验室参数时间严格区分开来：在固定希尔伯特空间内，幺正演化 $U(t) = e^{-iHt}$ 始终保持空间总维数不变；更具体地，[第 11 章](ch11-pulses-and-virtual-z.md)已由 Lean 锁定的能量本征态定态定理（[@thm-hermitian-eigenstate-stationary]，[`energy_eigenstate_stationary`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary) 与零方差定理 [`energy_eigenstate_variance_zero`](lean:D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_variance_zero)）证明，在非零物理参数时间间隔内，能量本征态的密度矩阵与可观测读数完全静止，并不会每过一秒就自动孳生新维数；至于宏观宇宙是否因此免于热力学热寂，还需另行建立自由度耦合、能量与熵流的物理动力学模型，绝不冒充已由上述线性代数或素数定理直接证毕的结论。

::: {.viz src="fairness-square-uncertainty-expansion" preset="time-expand" height="500"}
**有限盒克雷洛夫饱和与素数新轴突围卡（`time-expand`）**：上半舞台展示固定有限维闭盒内可观测克雷洛夫子空间维数 $\dim O_m$ 经历至多 $\dim V - \operatorname{rank} C$ 次严格增长后触顶拉平的品红饱和台阶；下半舞台展示当正交余空间非空时单位余项向量 $e_{D+1} \perp V_D$ 的青色新轴张开，以及欧几里得素数集（含 $S = \{2,3,5,7,11,13\} \implies N_S = 30031 = 59 \cdot 509$）在 $\ell^2(\mathbb{P})$ 模型下持续提供盒外正交基轴的过程，琥珀色标出当前扩张步 $D \to D + 1$。余项逃逸、克雷洛夫上界与素数突围属 `LEAN ✓`，数值秩与 QR 容差判定属 `NUM`，“时间即正交维度扩张”属 `MODEL`。
:::

至此，我们将固定维度闭盒视角与正交维度扩张视角的五重对照，连同每一环的形式化锚点、文献依托与模型边界，完整收束于下表：

| 核心议题 | 固定维度闭盒视角（截断脚手架） | 正交维度扩张视角（嵌套与突围） | 认识论等级与精确形式边界 |
| :--- | :--- | :--- | :--- |
| **1. 静动关系与表观闭合** | 静态块宇宙与动态时间指针二元对立；平面周期轨道看似绝对自闭 | 嵌套链 $\mathcal{V}_1 \hookrightarrow \mathcal{V}_2 \hookrightarrow \cdots$ 兼容整体与序列切片；高维螺旋与覆叠层高持续推进而投影特征闭合 | 黄金螺旋特征盲区 [@thm-ch31-helix-readout-progress]、[`level_fourier_joint_readout_detects_step`](lean:D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step)、[`golden_helix_two_step_orientation_complete_state_distinct`](lean:D5/S3/CompletionDynamics/GoldenMobius/GoldenHelixParityReadout.golden_helix_two_step_orientation_complete_state_distinct) 与圆周双覆叠 [@thm-circle-double-cover-history-lift]（`LEAN ✓`）；螺旋投影公式（`手工推导`）；静动不二与闭合幻象论（`MODEL`） |
| **2. $90^\circ$ 视界与截断极限** | 投影为零即被判定为不存在；误把有限维截断当作算子一致收敛 | 正交方向标量投影 $\cos 90^\circ = 0$；每个固定向量强收敛的同时，真子空间余投影恒保单位算子范数缺口 $\lVert\operatorname{id} - P_{S_i}\rVert = 1$ | 一致完备化阻断 [@thm-ch31-truncation-strong-vs-uniform]、递增投影强极限 [`increasing_projection_strong_limit`](lean:D5/S3/Quantum/Completion/IncreasingProjectionStrongLimit.increasing_projection_strong_limit) 与二次正交闭包 [`double_orthogonal_complement_eq_closure`](lean:D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure)（`LEAN ✓`）；三类几何角严格区分（`手工推导`）；视界本体诠释（`MODEL`） |
| **3. 两两公平与二次配对** | 线性绝对值和 $\lvert\cos\theta\rvert + \lvert\sin\theta\rvert$ 依赖标架，有序乘积 $AB \neq BA$ 依赖次序 | 逆序积 $(AB)(BA) = \lVert A\rVert^2\lVert B\rVert^2$ 消去次序；全局相位不变多项式最低非平凡次数为 $2$，二阶实齐次不变式唯一表为厄米型 | 共同相位多项式 [@thm-ch31-phase-polynomial-quadratic]、平行四边形律 [@thm-parallelogram-norm-law]、玻恩秩一约化 [@thm-born-modulus-square] 与布什效应表出 [@thm-busch-effect-density]（`LEAN ✓`）；约当—冯·诺依曼与格里森定理（`文献结果`）；$w_p(\theta)$ 反例与克利福德逆序积（`手工推导`） |
| **4. 相位折叠与横向测不准** | 把单一计算基上的模平方概率误认为量子态的全部信息 | 平方折叠符号与相位纤维；全体对角可观测量无法区分 $\lvert +\rangle\langle +\rvert$ 与 $\lvert -\rangle\langle -\rvert$；横向面积经 $(\Delta A)^2(\Delta B)^2 = C^2 + \lVert K\rVert^2 + G$ 反弹 | 对角相位盲区 [@thm-ch31-diagonal-phase-blindness]、拉格朗日—格拉姆恒等式 [@thm-lagrange-gram-identity] 与罗伯逊—薛定谔恒等式 [@thm-robertson-schrodinger]（`LEAN ✓`）；无界 $[x,p]=i\hbar I$ 定义域与无相位重构 [@rem-ch31-jvn-gleason-robertson-literature]（`文献结果`）；$\lvert 0\rangle$ 上 $X, Y$ 算例（`手工推导`）；因果叙事链（`MODEL`） |
| **5. 有限盒饱和与时间扩张** | 固定有限维系统 $(V, T, C)$ 的可观测克雷洛夫链在有限步内永久锁死 | 非空正交补保证单位逃逸新轴 $e \in S^\perp$；欧几里得 $N_S = \prod_{p \in S} p + 1$ 持续见证盒外新素数 $q \notin S$，支撑 $\ell^2(\mathbb{P})$ 秩扩张时钟 $D \to D + 1$ | 正交余项逃逸 [@thm-ch31-projection-residual-escape]、克雷洛夫增长上界 [@thm-ch31-krylov-growth-stability]、永久稳定 [`observable_krylov_once_stable_permanently`](lean:D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently) 与素数突围 [@thm-ch31-prime-axis-escape]（`LEAN ✓`）；欧几里得 IX.20 与兰佐斯迭代 [@rem-ch31-krylov-euclid-literature]（`文献结果`）；$30031 = 59 \cdot 509$（`手工推导`）；时间即维度扩张（`MODEL`） |

::: {.viz src="fairness-square-uncertainty-expansion" height="640"}
**交互实验室 `ORTHO//EXPAND`**：公平、平方、测不准与正交维度扩张综合沙盘。自由切换上述六个实验场景（`helix-shadow`、`horizon-limit`、`fair-square`、`phase-fold`、`uncertainty-wedge`、`time-expand`），实时交互检验三维螺旋平面投影与黄金螺旋特征盲区、$90^\circ$ 正交消隐与强极限 vs. $\|\operatorname{id} - P_{S_n}\| = 1$ 算子缺口、$|\cos\theta| + |\sin\theta|$ 与 $w_p(\theta)$ 对 $\cos^2\theta + \sin^2\theta = 1$ 的标架公平比对、对角可观测量在 $|+\rangle\langle+|$ 与 $|-\rangle\langle-|$ 上的相位盲区与泡利 $X$ 解盲、单量子比特罗伯逊—薛定谔恒等式 $(\Delta A)^2(\Delta B)^2 = C^2 + \|K\|^2 + G$ 的逐项几何拆解，以及有限维克雷洛夫饱和台阶对比欧几里得素数新轴突围（含 $30031 = 59 \cdot 509$）。绿色 `LEAN ✓` 徽章严格对应内核冻结定理，文献结论、手工推导、数值近似与本体模型按各自证据等级分栏标示。
:::

拆去固定维度闭盒的三副脚手架之后，本章五重公平与正交维度扩张的内在脉络已浑然一体：每一次看似山穷水尽的表观闭合、正交视界与测不准下界，都不是理性撞上了死胡同，而是低维投影在提醒观察者——两两公平的二次丈量在抹平局部单基相位细节的同时，早已通过非零换位子与单位算子范数缺口标示出正交补空间的方位；而跨出饱和的有限盒子、向着永不枯竭的正交新轴拾级而上，正是有限观察者在无时间几何整体中体验“时间奔流”的方式。带着这份把形式真伪交给 Lean 内核、把几何直觉坦诚交给模型的清明边界，我们迈入第八部的收官之章——[第 32 章](ch32-unified-field-and-meta-unification.md)，见证统一场与元统一的最终合龙。
