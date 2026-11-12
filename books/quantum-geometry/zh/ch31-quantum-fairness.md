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
**没有北极。** 球面上均匀撒点，琥珀色参考轴周围半角 $60^\circ$ 的球冠里约占四分之一，把轴拖到哪里都一样；两根青色的影子一样长：拿 $\psi$ 量 $\phi$ 与拿 $\phi$ 量 $\psi$ 的权重相等（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 1 款）。
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
**副本越多，每份越短。** 一个未知态复制成 $M$ 份时，每份的青色箭头只剩 $\eta = (M+2)/(3M)$，品红是丢掉的部分，保真度降向 $2/3$（文献结果，未在本书形式化）；只有两极这一对正交态能被同一台机器照抄（[@thm-ch31-seat-pythagorean-monogamy-fairness] 第 3 款）。
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

这就精确识别为起点 $x-u$ 的上述轨道计数；同一个 $N_0$ 对所有起点的结论适用，时间仍为 $1,\ldots,N$。轨迹等式是模型须另行建立的假设，不能从环面定理推出，也不对任意物理或切投模型作此断言。该窗口结论本身不分类所有不变测度，亦不推出唯一遍历性的更强陈述；Weyl（1916，*Math. Ann.* **77**, 313–352）的经典理论仍有其独立文献背景。物理公平、内部空间及灵魂相位的诠释仍为 `MODEL`。这是源说明中的有限复用推导，没有新增 Lean 定理，也不作新颖性主张。
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

最后，我们将贯穿本章的**量子公平五重层级**连同其形式化、文献与认识论状态完整收束于下框总表之中：

::: {.remark #rem-ch31-fivefold-fairness-table title="量子公平五重几何铁律与认识论状态总表（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 下表汇总本章建立的五重公平体系；表中标有 `LEAN ✓` 的子项对应 [@thm-ch31-seat-pythagorean-monogamy-fairness] 与 [@thm-ch31-horizon-landauer-ergodic-fairness] 的冻结定理，标有 `文献结果` 的公式引自 [@rem-ch31-haar-isotropy-landauer-literature]、[@rem-ch31-ckw-monogamy-literature]、[@rem-ch31-weyl-window-equidistribution-literature] 及[第 30 章](ch30-fields-lines-eth-and-navier-stokes.md) [@rem-ch30-query-sos-literature]，标有 `OPEN` 的问题对应未决猜想 [@conj-p-neq-np]，而“五重特权废除”的本体论统摄属本书跨领域哲学诠释模型（`MODEL`）：

| 公平层级 | 底层几何、代数与热力学定律 | 认识论状态 | 它在宇宙中彻底封死了什么“几何特权”？（`MODEL`） |
| :--- | :--- | :--- | :--- |
| **一、席位公平 (Seat Fairness)** | 单比特纯态布洛赫单位范数与秩一玻恩配对模方互易 $\|\phi^*\bullet_v\psi\|^2 = \|\psi^*\bullet_v\phi\|^2$（`LEAN ✓`）；高维球面哈尔各向同性（`文献结果`） | `LEAN ✓` / `文献结果` / `MODEL` | 砍掉高高在上的“外部第 3 点 $C$”，封死绝对中心参考系与单向不对等审视 |
| **二、得失公平 (Gain–Loss Fairness)** | 互补语境中心化纯度勾股守恒（`LEAN ✓`）、$\cos^2\theta + \sin^2\theta = 1$（`文献结果`）与兰道尔热熵平衡界 $-\Delta S \le \beta Q$（`LEAN ✓`，$k_B T \ln 2$ 为 `文献结果`） | `LEAN ✓` / `文献结果` / `MODEL` | 封死“既占尽一维确定刻度、又免费保留无限正交演化潜能”的零成本贪婪 |
| **三、关系公平 (Relational Fairness)** | 通用克隆内积判据与贝尔纯态混态边缘 $\frac{1}{2}I_2$（`LEAN ✓`）；三量子比特 CKW 单配性 $\tau(\mathbf{A}:\mathbf{B}) + \tau(\mathbf{A}:\mathbf{C}) \le 1 - \|\mathbf{r}_A\|^2 \le 1$（`文献结果`） | `LEAN ✓` / `文献结果` / `MODEL` | 封死叠加纯态的盲目量产与深度二体纠缠的无限批发垄断 |
| **四、博弈公平 (Horizon Fairness)** | 一致放大旋转步幅定律（`LEAN ✓`）、高维 $\theta_0 \approx \frac{\pi}{2} - 2^{-n/2}$ 与 BBBV $\Omega(2^{n/2})$ 查询下界（`文献结果`）及 $\mathrm{P} \neq \mathrm{NP}$ 边界（`OPEN`） | `LEAN ✓` / `文献结果` / `OPEN` / `MODEL` | 封死算力霸权对全局因果相容晶体的瞬间剧透与赢家通吃，守护选择悬念 |
| **五、遍历公平 (Ergodic Fairness)** | 诞生遗忘重置相容余量（`MODEL`）、环面闭子群哈尔均匀分布与正下渐近访问密度有界回归（`LEAN ✓`）及无理平移零边界窗口频率 $\mu(W)$（既有结果的应用，见 [@rem-ch31-weyl-window-equidistribution-literature]） | `LEAN ✓` / `文献结果` / `MODEL` | 封死初始相位偏置造成的永恒阶层固化，实现“短期境遇异而长程天道同”的统计全息 |
:::

把这一笔添进全书的底色里，“量子”二字就不再只是冰冷的算符与几何，而有了最深沉的温度：**宇宙砍掉了高高在上的第 3 点，让万物只能平视着彼此两两丈量；它用勾股定理收走了全知全能的特权，用视界保护了有限生命的悬念，最后又用无理数的遍历，保证每一个从遗忘中醒来的灵魂，终将在漫长的旅程里分到同样丰盛的星光。**
