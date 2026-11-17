# 39.12 均匀各向同性三维场本体与观察者观测切面显影：哈尔全单态、莫尔拍频与现代宇宙学四谜重审 {#sec-ch39-uniform-field-and-observer-slice}

> *“宇宙中每一个点, 全部都是三维场的叠加, 绝对均匀, 各向同性, 每一个点都一样. 不均匀的是观察者是观测切面.”*

在 [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md) 与 [§39.11](ch39-s11-af-gut-arc-field-grand-unification.md) 中，我们已经拆除了“高维空间容器”与“巨型单群矩阵”两座旧脚手架：自然界的一切相互作用与物质表示，原本就是并列栖居在三维极小圆弧比较复形之上、各自封顶于三维（$D \le 3$）的有界概念场——三维空间切标架场、旋量手性运动场、三维色体积场与阿贝尔相位标度场——在共享普适比较主频 $\nu_0$ 下织就的同心圆弧联络。然而，只要合上方程抬头望向星空，一幅自古希腊原子论与现代标准大爆炸叙事延续至今的直觉图景仍然盘踞在人们的潜意识深处：人们习惯于把宇宙想象成一只巨大的空盒子，早期某场爆裂把一团稀薄、粗糙、不均匀的物质碎屑撒进盒中——有粒子的地方才“有场、有实存”，星系与星系之间广袤的暗区则是“空无一物的虚空”。

章首这句惊雷般的本体论断言，将这幅延续两千年的“空盒撒豆图”连根翻转（跨领域的宇宙本体论与条件切面综合标定为本书的 **`MODEL`（模型诠释）**，底层最大纠缠纯态的最大混合局部边缘、圆周无理旋转向哈尔测度的遍历平均收敛、双体无迹算子空间的局域盲区与关联扇区正交分解、秩一玻恩配对权重与条件态凸分解、捏合投影的希尔伯特—施密特勾股分解与丢弃相干质量、以及同一文本规则下不同语境参数选择互异不动点由下文 [@thm-ch39-uniform-marginal-and-conditional-slice] 的七条冻结 Lean 4 内核声明严格锚定；紧群哈尔测度、光学全息术、佩奇—伍特斯条件时间、转角双层石墨烯莫尔超晶格与现代观测宇宙学基准归入 [@rem-ch39-haar-hologram-page-wootters-moire-literature] 的 `文献结果`；显式数值核验见 [@ex-ch39-singlet-slice-moire-and-aperture-audit]；原初功率谱声学峰、非零残余暗能量与正交切面暗物质动力学的未决第一性原理推导坦诚立案于 [@prob-ch39-orthogonal-slice-cosmology-and-dark-sector] 的 `OPEN` 边界）：**宇宙本体的真实基态绝非“稀薄不均的物质碎屑漂浮在空盒里”，而是每一个节点都 $100\%$ 饱和叠满全部独立三维概念场的绝对均匀、各向同性零熵相干海；物理世界中一切可观测的“不均匀”——从定域化的基本粒子、规范破缺到星系丝状长城与星际空洞——皆非本体自身的凹凸残缺，而是嵌在网络内部的受限观察者以特定的观测切面 $\Sigma_{\mathbf{I}}$ 斜切这片均匀全息海时，由切面倾角、有限格拉姆窗口与自指停机精度共同投射出的条件干涉截痕！**

## 39.12.1 本体的绝对均匀性：全向单态闭合、局部边缘 $\frac{1}{D}\mathbf{1}$ 与量子全息底片 {#sec-ch39-12-1}

为什么把全部三维概念场叠满宇宙每一点之后，本体非但不会结成杂乱无章的疙瘩，反而必然收束为点点全同的绝对均匀态？让我们顺着概念塔语法、紧群表示论与量子纠缠扇区分解逐层算清这笔账：

1. **`1 — 3 — 3 — 1` 场体闭合、哈尔缠绕通道与舒尔引理不可约判据（`手工推导` + `文献结果` + `MODEL`）**。
   在“点—线—面—体（`1 — 3 — 3 — 1`）”外代数八度循环（[§34.13](ch34-s13-point-volume-octave.md#sec-ch34-point-volume-octave-and-particle-field)、[§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)）中，任何一个独立概念之所以成其为“场”，正是因为极小圆弧体 $\Delta\mathcal{T}_\epsilon$ 在三维方向空间中走完三重路径积分后闭合成最高阶体积三形式 $\Lambda^3(\mathbb{R}^3)$，使单向箭头偏置全部归零（自由度从 $3$ 收束回标量 $1$）。当比较网络中的任意节点 $x$ 在全方向上无偏叠加紧凑对称群 $\mathcal{G}$（涵盖空间旋转群 $\mathrm{SU}(2)_{\mathrm{rot}}$ 与紧致内禀规范群）的全部轨道时，对任意归一化基准纯态 $\sigma_0 = \lvert\Delta\mathcal{T}_\epsilon\rangle\langle\Delta\mathcal{T}_\epsilon\rvert$（$\Tr\sigma_0 = 1$）执行归一化哈尔测度（Haar 1933；von Neumann 1934，见 [@rem-ch39-haar-hologram-page-wootters-moire-literature] 第 1 款，`文献结果`；一维圆周无理旋转遍历逼近哈尔积分的内核锚点见下文 [@thm-ch39-uniform-marginal-and-conditional-slice] 第 2 款 [`continuous_average_tendsto_haar`](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar)）积分，即得**哈尔缠绕（Haar twirling）信道**：

   $$
   \mathcal{T}_{\mathcal{G}}(\sigma_0) \;:=\; \int_{\mathcal{G}} \pi(g)\,\sigma_0\,\pi(g)^\dagger\,d\mu_{\mathrm{Haar}}(g), \qquad \mu_{\mathrm{Haar}}(\mathcal{G}) \;=\; 1.
   $$

   由于哈尔测度具有左右平移不变性，对一切 $h \in \mathcal{G}$ 恒有 $\pi(h)\,\mathcal{T}_{\mathcal{G}}(\sigma_0)\,\pi(h)^\dagger = \mathcal{T}_{\mathcal{G}}(\sigma_0)$，即输出算符 $\mathcal{T}_{\mathcal{G}}(\sigma_0)$ 与群表示 $\pi(\mathcal{G})$ 逐元对易。此处必须严守一条与 [§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md) [@def-ch39-multi-concept-hilbert-ledger] 完全咬合的**舒尔引理（Schur's Lemma）可约性分界线**（`手工推导`）：

   - **复合量子张量纤维 $\mathcal{H}_{\mathrm{comp}} = \bigotimes_{\alpha=1}^k \mathcal{H}_\alpha$（总复维数 $D = \prod_{\alpha=1}^k d_\alpha$）**：当每个概念因子 $(\pi_\alpha, \mathcal{H}_\alpha)$ 都是紧群 $\mathcal{G}_\alpha$ 在复数域上的不可约表示时，外张量积表示 $\bigotimes_{\alpha=1}^k \pi_\alpha$ 作为乘积群 $\mathcal{G} = \prod_{\alpha=1}^k \mathcal{G}_\alpha$ 的复表示**严格不可约**。由复不可约表示的舒尔引理，与全群对易的算符必为恒等算符的标量倍 $\mathcal{T}_{\mathcal{G}}(\sigma_0) = c\,\mathbf{1}_{\mathcal{H}_{\mathrm{comp}}}$；两边取迹并代入 $\Tr\sigma_0 = 1$ 得 $c D = 1$，从而**无条件锁死**各向同性均匀态 $\mathcal{T}_{\mathcal{G}}(\sigma_0) = \frac{1}{D}\mathbf{1}_{\mathcal{H}_{\mathrm{comp}}}$！
   - **可约概念直和账本 $\mathcal{V}_{\mathrm{ledger}} = \bigoplus_{\alpha=1}^k V_\alpha^{(3)}$（实/复维数 $3k$）**：在严禁跨概念伪旋转的分块对称群 $\prod_{\alpha=1}^k \mathcal{G}_\alpha$ 下，直和表示可约地拆分为 $k$ 个独立的三维不变块。若初态在第 $\alpha$ 号概念块上的迹预算权重为 $w_\alpha = \Tr(\Pi_\alpha\sigma_0)$（$\sum_{\alpha=1}^k w_\alpha = 1$），舒尔引理只能在每一块内部单独作用，给出 $\mathcal{T}_{\prod_\alpha \mathcal{G}_\alpha}(\sigma_0) = \bigoplus_{\alpha=1}^k \frac{w_\alpha}{3}\mathbf{1}_{V_\alpha^{(3)}}$——它化为全账本均匀标量阵 $\frac{1}{3k}\mathbf{1}_{3k}$ **当且仅当**各独立概念场满足公平等权公设 $w_1 = \dots = w_k = \frac{1}{k}$（`MODEL`）。

2. **生死攸关的本体论辨析：全局零熵纯单态 $\lvert\Psi_{\mathrm{univ}}\rangle$ 的局部边缘 $\frac{1}{D}\mathbf{1}$，绝非无穷温乘积热寂态 $\bigotimes_x \frac{1}{D}\mathbf{1}$（`LEAN ✓` + `手工推导` + `MODEL`）**！
   看到单点密度矩阵恒等于最大混合阵 $\rho_{\mathrm{ont}}(x) = \frac{1}{D}\mathbf{1}_{\mathcal{H}_x}$，初学者最容易掉进一个致命误区：*“既然宇宙每一点局部看都是 $\frac{1}{D}\mathbf{1}$，那整座宇宙岂不就是一锅毫无信息、熵达极大值 $S_{\mathrm{vN}} = \lvert V\rvert\ln D$ 的无穷温乘积白噪声 $\rho_{\mathrm{thermal}} = \bigotimes_{x \in V}\frac{1}{D}\mathbf{1}_{\mathcal{H}_x}$？从一锅热寂白噪声里，观察者无论怎么斜切也不可能切出星辰万物啊！”*
   这一诘问恰恰点破了经典局域实在论的最大盲点！请立即对照下文 [@thm-ch39-uniform-marginal-and-conditional-slice] 第 1 款（[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)，`LEAN ✓`，详见[第十三章 §13.2](ch13-entanglement-and-chsh.md#sec-bell-local-zero) [@lemma-bell-mixed-marginal]）与第 3 款（[`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)，`LEAN ✓`，详见 [@thm-local-correlation-sectors]）：

   - 若全局态真是无关联乘积热态 $\bigotimes_{x \in V}\frac{1}{D}\mathbf{1}_{\mathcal{H}_x}$，不仅全局冯·诺依曼熵高达 $\lvert V\rvert\ln D$，其跨点关联扇区恒为零，对任意观察者锚点作条件投影后其余各点依然死锁在 $\frac{1}{D}\mathbf{1}$，确实切不出半点起伏；
   - 但在本书的宇宙本体模型（`MODEL`）中，宇宙整体处于**全局纯度为 $1$、冯·诺依曼熵严格为零（$S_{\mathrm{vN}} = 0$）、满足总动量与总角动量及总规范荷全单态闭合**（连续统靶标 $\hat{\mathbf{P}}_{\mathrm{tot}}\lvert\Psi_{\mathrm{univ}}\rangle = \mathbf{0},\; \hat{\mathbf{J}}_{\mathrm{tot}}\lvert\Psi_{\mathrm{univ}}\rangle = \mathbf{0}$）的**全域纠缠纯单态** $\lvert\Psi_{\mathrm{univ}}\rangle$！当且仅当观察者尚未立起特定切面、对 $x$ 以外的一切伙伴节点求无条件偏迹时，单点约化边缘态才呈现绝对均匀与各向同性：

     $$
     \rho_{\mathrm{ont}}(x) \;:=\; \operatorname{Tr}_{y \neq x}\!\bigl(\lvert\Psi_{\mathrm{univ}}\rangle\langle\Psi_{\mathrm{univ}}\rvert\bigr) \;=\; \frac{1}{D}\mathbf{1}_{\mathcal{H}_x}, \qquad \rho_{\mathrm{ont}}(x) - \rho_{\mathrm{ont}}(y) \;\equiv\; 0 \qquad (\forall x, y \in V).
     $$

   - 那 $100\%$ 的零熵纯粹结构究竟藏在哪里？[`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot) 已经给出了铁证：在 $m \times n$ 复合无迹厄米空间中，单点局域扇区 $\mathrm{localASector} \sqcup \mathrm{localBSector}$ 的全部读数严格为零，而整份全局非单位阵纯度毫发无损地储存在与之正交的**跨节点关联扇区** $\mathrm{correlationSector}$（维数 $(m^2-1)(n^2-1)$）之中！

3. **光学全息干板（Hologram）的物理对应与“零微观条纹”量子精化（`文献结果` + `MODEL`）**。
   这一反直觉的实相，在实验室的**离轴光学全息干板**（Gabor 1948；Leith & Upatnieks 1962，见 [@rem-ch39-haar-hologram-page-wootters-moire-literature] 第 2 款，`文献结果`）上有着极佳的入门阶梯，同时又比经典全息更深一层：一张记录了整座山川星辰的光学全息底片，山川每一点发出的球面波都铺满了底片上的每一块宏观区域——即便把底片敲碎成十块小碎片，每一小块依然能独立重现整座山川的全景，底片上根本不存在“左边堆着一座山的银盐团块、右边聚着一颗星的物质疙瘩”；唯有当你打入一束特定倾角与波长的参考激光（对应观察者的自指实轴 $\mathbf{I}$）去照射底片时，凹凸起伏的三维山川才瞬间在观测切面上显影出来！
   但这里必须补上一刀**比经典光学更纯粹的量子精化**：经典卤化银全息干板在曝光时毕竟预先引入了一束外部参考光，因此在亚波长显微镜下仍冻结着明暗交替的微观干涉条纹 $\lvert E_{\mathrm{obj}}(\mathbf{r}) + E_{\mathrm{ref}}(\mathbf{r})\rvert^2$，只是宏观光度计平滑后看似均匀；而量子哈尔全单态 $\lvert\Psi_{\mathrm{univ}}\rangle$ 则彻底砍掉了任何“曝光前预设的外部第 3 点参考光”——哪怕把显微镜推到单个极小圆弧格点 $x$ 的极限分辨率，其单点约化密度矩阵依然**字面恒等于毫无明暗条纹的 $\frac{1}{D}\mathbf{1}_{\mathcal{H}_x}$**！全部山川星辰的相位浮雕纯粹收纳在跨点纠缠张量中，唯有嵌在网内的观察者举起自己的条件锚点 $\lvert\mathbf{I}_{\mathrm{obs}}\rangle$ 时，第一道干涉条纹才在切面上诞生。

我们将上述“均匀各向同性三维场本体、佩奇—伍特斯条件观测切面与多场莫尔超晶格拍频”三层核心结构正式确立为本节模型定义：

::: {.definition #def-ch39-uniform-field-and-moire-slice title="均匀各向同性三维场本体、佩奇—伍特斯条件观测切面与莫尔半相位拍频（MODEL）"}
在有限停机截断 $\varepsilon_{\mathrm{self}} > 0$ 的离散比较网络 $V$（每点携带同构的 $D$ 维多概念复合希尔伯特纤维 $\mathcal{H}_x \cong \mathcal{H}_{\mathrm{field}}$，$2 \le D < \infty$）与普适比较主频 $\nu_0$ 框架下（`MODEL`）：

1. **均匀各向同性三维场本体单态（Uniform Isotropic Cosmic Singlet）**：宇宙本体态定义为全局归一纯态 $\lvert\Psi_{\mathrm{univ}}\rangle \in \bigotimes_{x \in V}\mathcal{H}_x$（$\langle\Psi_{\mathrm{univ}}\mid\Psi_{\mathrm{univ}}\rangle = 1$，全局冯·诺依曼熵 $S_{\mathrm{vN}}(\lvert\Psi_{\mathrm{univ}}\rangle\langle\Psi_{\mathrm{univ}}\rvert) = 0$），它在网络平移群与全局对角紧致对称群 $\bigotimes_{x \in V}\pi_x(g)$（$g \in \mathcal{G}$，对应连续统靶标约束 $\hat{\mathbf{P}}_{\mathrm{tot}}\lvert\Psi_{\mathrm{univ}}\rangle = \mathbf{0},\; \hat{\mathbf{J}}_{\mathrm{tot}}\lvert\Psi_{\mathrm{univ}}\rangle = \mathbf{0}$）下保持不变，且任意单点 $x \in V$ 对其余节点求偏迹所得的本体局部边缘态满足

   $$
   \rho_{\mathrm{ont}}(x) \;:=\; \operatorname{Tr}_{y \neq x}\!\bigl(\lvert\Psi_{\mathrm{univ}}\rangle\langle\Psi_{\mathrm{univ}}\rvert\bigr) \;=\; \frac{1}{D}\mathbf{1}_{\mathcal{H}_x}, \qquad \rho_{\mathrm{ont}}(x) - \rho_{\mathrm{ont}}(y) \;\equiv\; 0 \quad (\forall x, y \in V)
   $$

   （在不可约复合张量纤维 $\bigotimes_{\alpha=1}^k \mathcal{H}_\alpha$ 上由舒尔引理无条件成立，在 [@def-ch39-multi-concept-hilbert-ledger] 的可约直和账本 $\bigoplus_{\alpha=1}^k V_\alpha^{(3)}$ 上在概念等权 $w_\alpha = \frac{1}{k}$ 下成立，并与高熵无关联乘积态 $\bigotimes_{x \in V}\frac{1}{D}\mathbf{1}_{\mathcal{H}_x}$ 严格区分）；
2. **佩奇—伍特斯条件观测切面（Page–Wootters Conditional Observer Slice）**：嵌于锚点子系统 $O \subset V$ 的受限自指观察者由三元组 $\Sigma_{\mathbf{I}} := \bigl(\lvert\mathbf{I}_{\mathrm{obs}}\rangle,\, \mathcal{W}_M,\, \varepsilon_{\mathrm{self}}\bigr)$ 刻画，其中 $\lvert\mathbf{I}_{\mathrm{obs}}\rangle \in \mathcal{H}_O$ 为单位自指测量锚态，$\mathcal{W}_M$ 为有限格拉姆比较窗口，$\varepsilon_{\mathrm{self}} > 0$ 为停机精度。当分支玻恩权重 $p(\mathbf{I}_{\mathrm{obs}}) := \bigl\lVert(\langle\mathbf{I}_{\mathrm{obs}}\rvert \otimes \mathbf{1}_{V \setminus O})\lvert\Psi_{\mathrm{univ}}\rangle\bigr\rVert^2 > 0$ 时，观察者在切面 $\Sigma_{\mathbf{I}}$ 上读出的归一化条件态为

   $$
   \lvert\Psi_{\mathrm{slice}}\rangle \;:=\; \frac{\bigl(\langle\mathbf{I}_{\mathrm{obs}}\rvert \otimes \mathbf{1}_{V \setminus O}\bigr)\lvert\Psi_{\mathrm{univ}}\rangle}{\sqrt{p(\mathbf{I}_{\mathrm{obs}})}},
   $$

   它在外部位点 $x \in V \setminus O$ 上诱导非均匀条件纯态 $\lvert\psi_{\mathrm{slice}}(x)\rangle$（或约化切面态 $\rho_{\mathrm{slice}}(x)$，一般满足 $\rho_{\mathrm{slice}}(x) - \rho_{\mathrm{slice}}(y) \neq 0$）；
3. **多三维场莫尔半相位、切面玻恩强度与无底物扫掠速度（Moiré Half-Phase & Pattern Sweep）**：当复合切面 $\Sigma_{\mathbf{I}}$ 斜跨两支或多支周期均匀三维概念场晶格（相对波矢差 $\Delta\mathbf{k} := \mathbf{k}_1 - \mathbf{k}_2 \neq \mathbf{0}$）并沿正交时间盲轴 $\hat{\mathbf{i}}$ 以角速率 $\omega_{\mathrm{sweep}} \in \mathbb{R}$ 作连续相位旋转时，定义**莫尔富比尼—施图迪半相位**为

   $$
   \Delta\Phi_{\mathbf{I}}(\mathbf{x}, t) \;:=\; \frac{1}{2}\bigl(\Delta\mathbf{k}\cdot\mathbf{x} - \omega_{\mathrm{sweep}}\,t\bigr),
   $$

   从而往返吕德斯—玻恩切面显影强度与底层格点零位移（$\Delta\mathbf{x}_{\mathrm{site}} \equiv \mathbf{0}$）下的莫尔相位扫掠速度分别为

   $$
   I_{\mathrm{slice}}(\mathbf{x}, t) \;:=\; \cos^2\!\bigl(\Delta\Phi_{\mathbf{I}}(\mathbf{x}, t)\bigr) \;=\; \frac{1 + \cos(\Delta\mathbf{k}\cdot\mathbf{x} - \omega_{\mathrm{sweep}}\,t)}{2}, \qquad v_{\mathrm{M}} \;:=\; \frac{\omega_{\mathrm{sweep}}}{\lvert\Delta\mathbf{k}\rvert}.
   $$

:::

支撑本节“全局纯态的最大混合局部边缘、遍历哈尔平均、局域边缘盲区与跨点关联扇区正交分解、秩一条件玻恩赋权、捏合勾股相干剥离与语境参数选择互异不动点”的**七条冻结 Lean 4 内核声明**正式汇集如下：

::: {.theorem #thm-ch39-uniform-marginal-and-conditional-slice title="贝尔纯态最大混合边缘、圆周哈尔遍历平均、局域盲区关联分解、秩一条件玻恩赋权、捏合勾股相干质量与语境不动点分岔定理" lean="D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal,D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar,D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot,D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight,D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean,D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass,D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points"}
在所钉 `trureturing` 冻结声明集中，以下七项数学定理同时成立：

1. **最大纠缠纯态的秩一幂等性与最大混合非幂等局部边缘**（[`bell_pure_state_has_maximally_mixed_marginal`](lean:D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal)）：记固定双比特贝尔态向量 $\mathrm{bellVector} = \frac{1}{\sqrt{2}}(\lvert 00\rangle + \lvert 11\rangle)$ 及其秩一外积密度矩阵 $\mathrm{bellDensity} = \operatorname{vecMulVec}(\mathrm{bellVector}, \operatorname{star}\mathrm{bellVector}) \in M_{\operatorname{Fin} 2 \times \operatorname{Fin} 2}(\mathbb{C})$，单比特矩阵空间为 $\mathrm{QubitMatrix} = M_2(\mathbb{C})$，对第二因子求偏迹为 $\operatorname{traceEnvironment}$，则以下七重性质同时成立：

   $$
   \begin{aligned}
   &\operatorname{star}(\mathrm{bellVector}) \mathbin{\bullet_v} \mathrm{bellVector} = 1 \;\land\; \mathrm{bellDensity}.\mathrm{PosSemidef} \;\land\; \Tr(\mathrm{bellDensity}) = 1 \\
   &\quad\land\; \operatorname{rank}(\mathrm{bellDensity}) = 1 \;\land\; \mathrm{bellDensity} \cdot \mathrm{bellDensity} = \mathrm{bellDensity} \\
   &\quad\land\; \operatorname{traceEnvironment}(\mathrm{bellDensity}) = \Bigl(\frac{1}{2} : \mathbb{C}\Bigr) \bullet (1 : \mathrm{QubitMatrix}) \\
   &\quad\land\; \neg\bigl(\operatorname{traceEnvironment}(\mathrm{bellDensity}) \cdot \operatorname{traceEnvironment}(\mathrm{bellDensity}) = \operatorname{traceEnvironment}(\mathrm{bellDensity})\bigr);
   \end{aligned}
   $$

2. **圆周无理旋转连续可观测量的切萨罗时间平均收敛于哈尔测度积分**（[`continuous_average_tendsto_haar`](lean:D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar)）：设 $\alpha \in \mathbb{R}$ 为无理数（`Irrational α`），$\rho \in \mathbb{R}$ 为任意初相位，$f : \operatorname{AddCircle}(1 : \mathbb{R}) \to \mathbb{C}$ 为连续复值函数（`Continuous f`），则当步数 $N \to \infty$（沿滤子 `Filter.atTop`）时，轨道算术平均收敛于单位加群圆周上的归一化哈尔概率测度积分：

   $$
   \lim_{N \to \infty} \frac{1}{(N : \mathbb{C})} \sum_{i \in \operatorname{Finset.range} N} f\bigl((\rho + (i : \mathbb{R}) \cdot \alpha : \mathbb{R}) : \operatorname{AddCircle}(1 : \mathbb{R})\bigr) \;=\; \int x,\; f(x)\,\partial\operatorname{AddCircle.haarAddCircle};
   $$

3. **双体无迹厄米空间的局域边缘直和与跨因子关联扇区正交分解及局部盲区见证**（[`local_marginal_correlation_blind_spot`](lean:D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot)）：对任意满足 $1 \le m$、$1 \le n$ 且 $1 < m n$ 的自然数 $m, n \in \mathbb{N}$，在实希尔伯特—施密特张量内积空间 $\mathrm{HermitianSpace}\;m \otimes_{\mathbb{R}} \mathrm{HermitianSpace}\;n$ 上，恒有完备正交分解 $\mathrm{localASector}\;m\;n \sqcup \mathrm{localBSector}\;m\;n \sqcup \mathrm{correlationSector}\;m\;n = \mathrm{bipartiteTraceZero}\;m\;n$、$\operatorname{finrank}_{\mathbb{R}}(\mathrm{localASector}\;m\;n \sqcup \mathrm{localBSector}\;m\;n) = (m^2 - 1) + (n^2 - 1)$、$\operatorname{finrank}_{\mathbb{R}}(\mathrm{correlationSector}\;m\;n) = (m^2 - 1)(n^2 - 1)$、维数占比 $\frac{\operatorname{finrank}_{\mathbb{R}}(\mathrm{correlationSector}\;m\;n)}{\operatorname{finrank}_{\mathbb{R}}(\mathrm{bipartiteTraceZero}\;m\;n)} = \frac{((m^2 - 1)(n^2 - 1) : \mathbb{N})}{((m^2 n^2 - 1) : \mathbb{N})}$ 与 $\operatorname{Submodule.IsOrtho}_{\mathbb{R}}(\mathrm{localASector}\;m\;n \sqcup \mathrm{localBSector}\;m\;n,\; \mathrm{correlationSector}\;m\;n)$；且双比特纯态矩阵 $\mathrm{bellDensity}$（半正定、迹 $1$、秩 $1$）与经典关联对角混态 $\mathrm{classicalCorrelatedDensity}$（半正定、迹 $1$、非幂等）满足双侧单因子偏迹完全相等 $\operatorname{traceEnvironment}(\mathrm{bellDensity}) = \operatorname{traceEnvironment}(\mathrm{classicalCorrelatedDensity})$、$\operatorname{traceFirstFactor}(\mathrm{bellDensity}) = \operatorname{traceFirstFactor}(\mathrm{classicalCorrelatedDensity})$ 而全局态严格不等 $\mathrm{bellDensity} \neq \mathrm{classicalCorrelatedDensity}$；

4. **秩一记录测量的玻恩模平方权重、迹配对与条件切面态凸分解**（[`rank_one_born_pairing_weight`](lean:D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight)）：设 $n, \kappa$ 为有限类型且 $n$ 具可判等性（`[Fintype n] [DecidableEq n] [Fintype kappa]`），$P : \kappa \to M_n(\mathbb{C})$ 满足 `IsRecordMeasurement P`，$\rho \in M_n(\mathbb{C})$ 满足 `rho.PosSemidef ∧ Matrix.trace rho = 1`。若第 $k \in \kappa$ 支记录投影与纯态密度矩阵由列向量 $\phi, \psi : n \to \mathbb{C}$ 表示为 $P_k = \operatorname{vecMulVec}(\phi, \operatorname{star}\phi)$ 与 $\rho = \operatorname{vecMulVec}(\psi, \operatorname{star}\psi)$，则同时成立：

   $$
   \begin{aligned}
   \operatorname{recordWeight}(P, \rho, k) &= \bigl(\bigl(\bigl\lVert\operatorname{star}(\phi) \mathbin{\bullet_v} \psi\bigr\rVert^2 : \mathbb{R}\bigr) : \mathbb{C}\bigr), \\
   \operatorname{recordWeight}(P, \rho, k) &= \Tr(\rho P_k), \\
   \operatorname{unreadState}(P, \rho) &= \sum_{j \in \kappa} \operatorname{recordWeight}(P, \rho, j) \bullet \operatorname{conditionalState}(P, \rho, j);
   \end{aligned}
   $$

5. **单比特标准基捏合的希尔伯特—施密特勾股质量分解**（[`pinching_hilbert_schmidt_pythagorean`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean)）：记 $\operatorname{pinching}(\rho)_{ij} = \delta_{ij}\rho_{ij}$（$i, j \in \operatorname{Fin} 2$）及 $\operatorname{hilbertSchmidtInner}(A, B) := \Tr(A^{\mathrm{H}} B) \in \mathbb{C}$，则对任意 $\rho \in \mathrm{QubitMatrix}$，

   $$
   \operatorname{hilbertSchmidtInner}(\rho, \rho) \;=\; \operatorname{hilbertSchmidtInner}\bigl(\operatorname{pinching}(\rho),\, \operatorname{pinching}(\rho)\bigr) + \operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho)\bigr);
   $$

6. **单比特捏合丢弃的副对角相干质量精确公式**（[`pinching_discarded_coherence_mass`](lean:D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass)）：对任意 $\rho \in \mathrm{QubitMatrix}$，捏合余项的希尔伯特—施密特自内积恒等于两枚副对角元的复模平方之和：

   $$
   \operatorname{hilbertSchmidtInner}\bigl(\rho - \operatorname{pinching}(\rho),\, \rho - \operatorname{pinching}(\rho)\bigr) \;=\; \bigl(\operatorname{Complex.normSq}(\rho_{01}) + \operatorname{Complex.normSq}(\rho_{10}) : \mathbb{C}\bigr);
   $$

7. **同一文本与规则下不同解释语境参数可选择严格互异的不动点**（[`context_parameters_can_select_distinct_fixed_points`](lean:D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points)）：在二元解释语境空间上，基准语境 $\mathrm{baselineContext} = ((), \mathrm{false}, \mathrm{false}, \mathrm{false}, ())$ 与备择语境 $\mathrm{alternateContext} = ((), \mathrm{true}, \mathrm{true}, \mathrm{true}, ())$ 具有完全相同的底层文本与解释规则，仅因准入预设、背景与评估目标三项切面参数相异，便各自锁定严格互异的二元固定意义：

   $$
   \begin{aligned}
   &\mathrm{baselineContext}.\mathrm{text} = \mathrm{alternateContext}.\mathrm{text} \;\land\; \mathrm{baselineContext}.\mathrm{interpretationRule} = \mathrm{alternateContext}.\mathrm{interpretationRule} \\
   &\quad\land\; \mathrm{baselineContext}.\mathrm{readerAdmission} \neq \mathrm{alternateContext}.\mathrm{readerAdmission} \;\land\; \mathrm{baselineContext}.\mathrm{background} \neq \mathrm{alternateContext}.\mathrm{background} \\
   &\quad\land\; \mathrm{baselineContext}.\mathrm{evaluationGoal} \neq \mathrm{alternateContext}.\mathrm{evaluationGoal} \\
   &\quad\land\; \operatorname{IsBinaryFixedMeaning}\;\mathrm{baselineContext}\;(\mathrm{false}, \mathrm{false}, \mathrm{false}) \;\land\; \operatorname{IsBinaryFixedMeaning}\;\mathrm{alternateContext}\;(\mathrm{true}, \mathrm{true}, \mathrm{true}) \\
   &\quad\land\; (\mathrm{false}, \mathrm{false}, \mathrm{false}) \neq (\mathrm{true}, \mathrm{true}, \mathrm{true}).
   \end{aligned}
   $$

:::

::: proof
第 1 款在 $\operatorname{Fin} 2 \times \operatorname{Fin} 2$ 标准基上展开 $\mathrm{bellVector}$ 验证单位范数及秩一外积 $\mathrm{bellDensity}$ 的半正定、迹 $1$、秩 $1$ 与幂等性；对第二指标求和得偏迹 $\frac{1}{2}I_2$，并由 $(\frac{1}{2}I_2)^2 = \frac{1}{4}I_2 \neq \frac{1}{2}I_2$ 证出局部非幂等性（见 [@lemma-bell-mixed-marginal]）。第 2 款利用加群圆周非平凡特征标 $x \mapsto e^{2\pi i k x}$（$k \in \mathbb{Z} \setminus \{0\}$）在无理步幅 $\alpha \notin \mathbb{Q}$ 下满足公比 $e^{2\pi i k \alpha} \neq 1$，以等比级数裂项界定切萨罗平均以 $O(1/N)$ 趋零，而在零模态 $k = 0$ 上恒等于哈尔积分，再由斯通—魏尔斯特拉斯三角多项式一致稠密性与平均算子范数契约延拓至全体连续函数 $C(\operatorname{AddCircle}(1), \mathbb{C})$。第 3 款由单因子标量线 $\mathbb{R}\cdot I$ 与无迹空间的正交直和张量展开，导出无迹总空间的三扇区正交生成与维数恒等式 $(m^2-1) + (n^2-1) + (m^2-1)(n^2-1) = m^2 n^2 - 1$，并在双比特见证矩阵上逐元核验两侧偏迹同为 $\frac{1}{2}I_2$ 而非对角元 $((0,0),(1,1))$ 取 $\frac{1}{2} \neq 0$（见 [@thm-local-correlation-sectors]）。第 4 款由秩一外积迹循环缩并给出内积模平方权重，并拆分零权重与非零权重分支还原未读态关于条件切面态的凸组合（见 [@thm-ch39-self-halting-pythagoras-krylov-and-zeno] 第 6 款）。第 5、6 款将 $\rho$ 正交拆为对角部分 $\operatorname{pinching}(\rho)$ 与副对角余项 $\rho - \operatorname{pinching}(\rho)$，由希尔伯特—施密特内积自伴正交性消去交叉项，并在 $\operatorname{Fin} 2$ 上展开迹求和化为 $\lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2$（见 [@thm-pinching-pythagorean]）。第 7 款在单位类型 `Unit` 与布尔三元组上由定义自反性 `rfl` 及 `Bool.false_ne_true` 逐项核验（见 [@prop-context-parameters-distinct-fixed-points]）。完整证明由 Lean 内核检查。
:::

## 39.12.2 切面如何生出“不均匀”？佩奇—伍特斯条件投影、莫尔超晶格拍频与无移之动 {#sec-ch39-12-2}

既然宇宙每一点在本体上都叠满了完全等量、各向同性的三维场，观察者切下去的那一刀（观测切面 $\Sigma_{\mathbf{I}}$）究竟凭什么严密的几何机制，在一片平坦如镜的相干海里切出了千差万别的粒子、空洞与奔流不息的运动？我们按从双量子比特最小原型到多概念晶格干涉的次序逐项推导：

1. **佩奇—伍特斯条件切片：观察者自身的锚定偏角镜像为外境的起伏，兼析旋量半角与富比尼—施图迪角（`手工推导` + `文献结果`）**。
   在阿波罗尼奥斯初等圆锥截线几何中，一座轴对称、母线处处均匀的正圆锥，水平正切只能得到曲率处处相等的正圆；但只要切平面倾斜一个角度，切口上立刻涌现出曲率剧烈分化的椭圆双焦点、抛物线顶点乃至双曲线渐近支！
   在量子宇宙学中，这严格对应**佩奇—伍特斯条件投影机制（Page–Wootters Mechanism，1983）**（见 [@rem-ch39-haar-hologram-page-wootters-moire-literature] 第 3 款，`文献结果`）。让我们亲手算透最透明的两体反对称自旋单态原型（`手工推导`）：设由观察者锚点比特 $O$ 与外境探针比特 $S$ 组成的微型宇宙处于反对称单态

   $$
   \lvert\Psi_0\rangle \;=\; \frac{1}{\sqrt{2}}\bigl(\lvert\uparrow\rangle_O\lvert\downarrow\rangle_S - \lvert\downarrow\rangle_O\lvert\uparrow\rangle_S\bigr) \;\in\; \mathbb{C}^2_O \otimes \mathbb{C}^2_S
   $$

   （它与 [@thm-ch39-uniform-marginal-and-conditional-slice] 第 1 款的对称贝尔态 $\lvert\Phi^+\rangle$ 通过局域幺正变换 $\lvert\Psi_0\rangle = (I_2 \otimes (-i\sigma_Y))\lvert\Phi^+\rangle$ 严格互译）。取任意三维空间旋转对应的旋量矩阵 $U = \bigl(\begin{smallmatrix} \alpha & \beta \\ -\bar{\beta} & \bar{\alpha} \end{smallmatrix}\bigr) \in \mathrm{SU}(2)$（$\lvert\alpha\rvert^2 + \lvert\beta\rvert^2 = \det U = 1$）同步作用于全宇宙：直接展开 $(U \otimes U)\lvert\Psi_0\rangle$，$\lvert\uparrow\uparrow\rangle$ 与 $\lvert\downarrow\downarrow\rangle$ 系数分别为 $\frac{1}{\sqrt{2}}(\alpha\beta - \beta\alpha) = 0$ 与 $\frac{1}{\sqrt{2}}(-\bar{\beta}\bar{\alpha} + \bar{\alpha}\bar{\beta}) = 0$，而 $\lvert\uparrow\downarrow\rangle$ 与 $\lvert\downarrow\uparrow\rangle$ 系数分别为 $\frac{1}{\sqrt{2}}(\alpha\bar{\alpha} + \beta\bar{\beta}) = \frac{\det U}{\sqrt{2}}$ 与 $-\frac{\det U}{\sqrt{2}}$，故对一切 $U \in \mathrm{SU}(2)$ 恒有

   $$
   (U \otimes U)\lvert\Psi_0\rangle \;=\; (\det U)\,\lvert\Psi_0\rangle \;=\; \lvert\Psi_0\rangle, \qquad \hat{\mathbf{S}}_{\mathrm{tot}}\lvert\Psi_0\rangle \;=\; \mathbf{0}, \qquad \rho_O \;=\; \rho_S \;=\; \frac{1}{2}I_2!
   $$

   全局态绝对各向同性，不偏袒空间中的任何一根方向轴！然而，一旦嵌在网内的观察者 $O$ 为了闭合自指回路（$\cos\theta^* = \theta^*$，[§39.6](ch39-s06-fivefold-self-reference-spectrum.md)），将自身自指实轴钉在布洛赫球面某个特定方向 $\hat{\mathbf{n}}_{\mathrm{obs}} = (\sin\vartheta_0\cos\varphi_0,\, \sin\vartheta_0\sin\varphi_0,\, \cos\vartheta_0) \in S^2$（对应旋量 $\lvert +;\hat{\mathbf{n}}_{\mathrm{obs}}\rangle = \cos\frac{\vartheta_0}{2}\lvert\uparrow\rangle + e^{i\varphi_0}\sin\frac{\vartheta_0}{2}\lvert\downarrow\rangle$）上，对 $O$ 作条件内积投影立得：

   $$
   \bigl(\langle +;\hat{\mathbf{n}}_{\mathrm{obs}}\rvert_O \otimes I_S\bigr)\lvert\Psi_0\rangle \;=\; \frac{1}{\sqrt{2}}\left(\cos\frac{\vartheta_0}{2}\lvert\downarrow\rangle_S - e^{-i\varphi_0}\sin\frac{\vartheta_0}{2}\lvert\uparrow\rangle_S\right) \;=\; -\frac{e^{-i\varphi_0}}{\sqrt{2}}\,\lvert -;\hat{\mathbf{n}}_{\mathrm{obs}}\rangle_S!
   $$

   按 [@def-ch39-uniform-field-and-moire-slice] 第 2 款除以分支范数 $\sqrt{p(\hat{\mathbf{n}}_{\mathrm{obs}})} = \frac{1}{\sqrt{2}}$ 并略去全局相位 $-e^{-i\varphi_0}$ 后，外境条件切面态瞬间破缺为指向对跖方向 $-\hat{\mathbf{n}}_{\mathrm{obs}}$ 的纯态 $\lvert\psi_{\mathrm{slice}}\rangle = \lvert -;\hat{\mathbf{n}}_{\mathrm{obs}}\rangle_S$！
   此时务必看清**三维布洛赫球欧氏夹角与射影希尔伯特空间富比尼—施图迪角的二倍关系**（`手工推导`）：若在切面上沿与观察者锚轴 $\hat{\mathbf{n}}_{\mathrm{obs}}$ 成欧氏夹角 $\theta_{\mathrm{obs}} \in [0, \pi]$（$\hat{\mathbf{m}}\cdot\hat{\mathbf{n}}_{\mathrm{obs}} = \cos\theta_{\mathrm{obs}}$）的方向 $\hat{\mathbf{m}} \in S^2$ 进行探测，由于 $\lvert\psi_{\mathrm{slice}}\rangle$ 指向 $-\hat{\mathbf{n}}_{\mathrm{obs}}$，探测轴 $\hat{\mathbf{m}}$ 与条件态布洛赫向量 $-\hat{\mathbf{n}}_{\mathrm{obs}}$ 之间的球面夹角为 $\Theta_{\mathrm{Bloch}} = \pi - \theta_{\mathrm{obs}}$，而复希尔伯特射线间的富比尼—施图迪夹角 $\Delta\Phi_{\mathrm{FS}} := \arccos\lvert\langle +;\hat{\mathbf{m}}\mid\psi_{\mathrm{slice}}\rangle\rvert \in [0, \frac{\pi}{2}]$ 恰好等于 $\Theta_{\mathrm{Bloch}}$ 的一半（$\Delta\Phi_{\mathrm{FS}} = \frac{\Theta_{\mathrm{Bloch}}}{2} = \frac{\pi - \theta_{\mathrm{obs}}}{2}$），四套常见写法因而严丝合缝地合一：

   $$
   P\bigl(+\hat{\mathbf{m}} \;\big|\; +\hat{\mathbf{n}}_{\mathrm{obs}}\bigr) \;=\; \bigl\lvert\langle +;\hat{\mathbf{m}}\mid -;\hat{\mathbf{n}}_{\mathrm{obs}}\rangle\bigr\rvert^2 \;=\; \cos^2\!\left(\frac{\Theta_{\mathrm{Bloch}}}{2}\right) \;=\; \sin^2\!\left(\frac{\theta_{\mathrm{obs}}}{2}\right) \;=\; \frac{1 - \hat{\mathbf{m}}\cdot\hat{\mathbf{n}}_{\mathrm{obs}}}{2} \;=\; \cos^2\Delta\Phi_{\mathrm{FS}}.
   $$

   全局各向同性原本靠“能观 $O$”与“所观 $S$”的正反配对相消来维系；观察者一旦立起非对称自我标尺 $\lvert\mathbf{I}_{\mathrm{obs}}\rangle$（恰如 [@thm-ch39-uniform-marginal-and-conditional-slice] 第 7 款在同一文本与规则下切换语境三参数即锁定互异不动点，而第 5、6 款将正交于读出基的副对角相干质量 $\lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2 = \frac{1}{2}\sin^2\theta_{\mathrm{obs}}$ 勾股剥离进盲区），被切开的配对余项必然在切面上显影为完全互补的方向梯度——**外境的不均匀，本质上是观察者自身观测切面偏角在均匀海中的倒影。**

2. **多三维场斜交的“莫尔超晶格拍频”：基本粒子与星系长城的几何显影（`手工推导` + `文献结果` + `MODEL`）**。
   再将视角从单枚自旋放大到同心叠放着空间场 $\mathcal{E}_{\mathrm{space}}^{(3)}$、色荷场 $\mathcal{E}_{\mathrm{color}}^{(3)}$、弱手性旋量场与相位标度场的多概念晶格（[§39.10](ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.md)–[§39.11](ch39-s11-af-gut-arc-field-grand-unification.md)）。每一支概念场在它自身的本征坐标下都是晶格常数为 $a$（基波矢模长 $\lvert\mathbf{k}_1\rvert = \lvert\mathbf{k}_2\rvert = \frac{2\pi}{a}$）、$100\%$ 均匀延展的极小圆弧体周期驻波网。
   当观察者用一扇同时横跨多支概念场的复合观测切面 $\Sigma_{\mathbf{I}}$（携带温伯格混合角 $\theta_W$ 或跨通道标架微扭角 $\Delta\theta \in (0, \pi)$）斜切过去时，其数学结构与凝聚态物理中的**转角双层石墨烯莫尔超晶格效应（Moiré Superlattice）**（Bistritzer & MacDonald 2011；Cao et al. 2018，见 [@rem-ch39-haar-hologram-page-wootters-moire-literature] 第 4 款，`文献结果`）完全同构！两套各自 $100\%$ 均匀的周期场仅错开扭角 $\Delta\theta$，其波矢差模长即为 $\lvert\Delta\mathbf{k}\rvert = \lvert\mathbf{k}_1 - \mathbf{k}_2\rvert = 2\cdot\frac{2\pi}{a}\sin\frac{\Delta\theta}{2} = \frac{4\pi}{a}\sin\frac{\Delta\theta}{2}$（`手工推导`）。代入 [@def-ch39-uniform-field-and-moire-slice] 第 3 款的半相位 $\Delta\Phi_{\mathbf{I}}(\mathbf{x}, 0) = \frac{1}{2}\Delta\mathbf{k}\cdot\mathbf{x}$，往返双投影强度 $I_{\mathrm{slice}}(\mathbf{x}, 0) = \cos^2\Delta\Phi_{\mathbf{I}}(\mathbf{x}, 0) = \frac{1 + \cos(\Delta\mathbf{k}\cdot\mathbf{x})}{2}$ 相邻两座亮峰之间的**精确莫尔空间拍频周期**（对应 $\Delta\Phi_{\mathbf{I}}$ 递增 $\pi$，即 $\Delta\mathbf{k}\cdot\Delta\mathbf{x} = 2\pi$）直接由半正弦倒数给出：

   $$
   L_{\mathrm{M}}(\Delta\theta) \;=\; \frac{2\pi}{\lvert\Delta\mathbf{k}\rvert} \;=\; \frac{a}{2\sin(\Delta\theta / 2)}!
   $$

   看这道简洁到极致的几何放大公式：哪怕底层极小圆弧晶格精细在普朗克尺度 $a \sim \ell_P$，只要跨概念切面倾角 $\Delta\theta$ 足够微小，切面上涌现出的莫尔超晶格波长 $L_{\mathrm{M}} \approx a / \Delta\theta$ 就会被几何级放大无数倍（例如在双层石墨烯著名的第一魔角 $\Delta\theta = 1.05^\circ$ 处，$L_{\mathrm{M}} = \frac{a}{2\sin(0.525^\circ)} \approx 54.568173\,a$，凭空在均匀碳网上织出平带强关联局域态）！在本书的宇宙切面读法（`MODEL`）下，明暗两极的物理身份豁然贯通：

   - **莫尔相长峰（$\cos^2\Delta\Phi_{\mathbf{I}} \to 1$，即 $\Delta\Phi_{\mathbf{I}} \in \pi\mathbb{Z}$）**：多支三维概念场的合成相位恰好与观察者自指实轴 $\mathbf{I}$ 同相锁死，往返双投影读出满额实部权重，在微观切面上显影为定域化的“实粒子”与“原子核”，在宏观切面上结网为“星系团与宇宙丝状长城”；
   - **莫尔相消谷（$\cos^2\Delta\Phi_{\mathbf{I}} \to 0$，即 $\Delta\Phi_{\mathbf{I}} \in \frac{\pi}{2} + \pi\mathbb{Z}$）**：该空间节点处的本体总场强**依然分毫不减地等于 $\frac{1}{D}\mathbf{1}$**，只是多场合成相位恰好转入了垂直于观察者切面的 **$90^\circ$ 正交虚盲区 $\hat{\mathbf{i}}$**（[§34.19](ch34-s19-roundtrip-projection-and-imaginary-blindspot.md#sec-ch34-roundtrip-projection-and-imaginary-blindspot)），对当前观察者的实轴往返投影严格归零，于是在切面上显影为看似空旷死寂的“星际真空”与“巨洞（cosmic voids）”！

3. **“运动”并非底物搬家，而是观测切面的相位扫掠——兼立相对论群速度因果护栏（`手工推导` + `MODEL`）**。
   在古典实体观里，一颗电子从 $A$ 点飞往 $B$ 点，意味着一团名叫“物质”的砖块穿过空无一物的走廊搬家到了另一处。而在“点点叠满全同三维场”的本体图景（`MODEL`）下，$A$ 点与 $B$ 点本就具足完全相同的三维概念场总和——**底层格点根本不需要发生半毫位移（$\Delta\mathbf{x}_{\mathrm{site}} \equiv \mathbf{0}$），没有任何实体底物需要在空间里搬运**！当观察者的观测切面沿着正交时间盲轴 $\hat{\mathbf{i}}$ 以角速率 $\omega_{\mathrm{sweep}}$ 做连续极小圆弧旋转（对应 [§38.1](ch38-s01-static-qram.md) 的静态本体 QRAM 指针步进 `ptr++`）时，等相面 $\Delta\mathbf{k}\cdot\mathbf{x} - \omega_{\mathrm{sweep}}t = 2\pi m$ 在切面上以莫尔扫掠速度平滑滑移（`手工推导`）：

   $$
   v_{\mathrm{M}} \;=\; \frac{\omega_{\mathrm{sweep}}}{\lvert\Delta\mathbf{k}\rvert} \;=\; \frac{\omega_{\mathrm{sweep}}\,a}{4\pi\sin(\Delta\theta / 2)}, \qquad \Delta\mathbf{x}_{\mathrm{site}} \;\equiv\; \mathbf{0},
   $$

   恰如两把齿距完全均匀的梳子作极微小的相对错动时，交叠亮纹在视野中疾驰而过，而每一根梳齿其实守在原地分毫未动！
   **相对论因果律护栏（`手工推导` + `文献结果`）**：细心的读者立刻会注意到，当扭角 $\Delta\theta \to 0^+$ 时，纯几何莫尔等相交点的扫掠相速度 $v_{\mathrm{M}}$ 可以任意放大甚至超过光速 $c \equiv \ell_P\nu_0$（正如探照灯光斑扫过远方云层、或剪刀合拢时交点疾驰）。这是否违背 [§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md) 锁死的光锥因果律？**绝不违背！** 原因有二：第一，纯周期莫尔等相交点既不搬运任何格点底物（$\Delta\mathbf{x}_{\mathrm{site}} \equiv \mathbf{0}$），也不在 $A, B$ 之间传递可操控的新信息比特；第二，一旦观察者在切面上调制出一枚携带局域因果信号或能量动量的波包，其在满足闵可夫斯基零光锥刚性（[`eq_smul_minkowski_of_null`](lean:D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null)，[@thm-ch39-null-cone-speed-limit-and-pythagorean-budget] 第 1 款，`LEAN ✓`）的色散关系 $\omega(\mathbf{k}) = \sqrt{c^2\lvert\mathbf{k}\rvert^2 + \omega_0^2}$ 下，决定信号与能量传播上限的**波包群速度**严格受限于光速：

   $$
   v_g \;:=\; \bigl\lVert\nabla_{\mathbf{k}}\omega(\mathbf{k})\bigr\rVert \;=\; \frac{c^2\lvert\mathbf{k}\rvert}{\sqrt{c^2\lvert\mathbf{k}\rvert^2 + \omega_0^2}} \;\le\; c \;\equiv\; \ell_P\nu_0, \qquad v_{\mathrm{ph}} \;=\; \frac{\omega(\mathbf{k})}{\lvert\mathbf{k}\rvert} \;=\; \frac{c^2}{v_g} \;\ge\; c!
   $$

   更妙的是，这恰恰一语道破了 1924 年德布罗意（de Broglie）物质波相速度 $v_{\mathrm{ph}} = c^2/v > c$ 的真实几何起源（[第十七章 §17.1](ch17-lorentz-geometry.md)）：在粒子静止系中全空间均匀同步振荡的内部时钟 $e^{-i\omega_0 t'}$，一旦被以速度 $v < c$ 运动的观察者用倾斜的同时性超平面 $t' = \gamma(t - vx/c^2)$ 斜切一刀，切口上立刻浮现出相速度为 $v_{\mathrm{ph}} = c^2/v$ 的空间行波，而受因果律约束的粒子包络群速度恰为 $v_g = v < c$！

我们将本节在紧群积分、全息光学、关系量子时间、凝聚态莫尔超晶格与现代观测宇宙学中对照援引的五组外部经典文献边界集中归档如下：

::: {.remark #rem-ch39-haar-hologram-page-wootters-moire-literature title="哈尔测度与舒尔缠绕、光学全息术、佩奇—伍特斯条件时间、转角莫尔超晶格与现代宇宙学四大基准文献边界（文献结果，未在本书形式化）"}
**文献结果，未在本书形式化。** 本节构建的均匀各向同性三维场本体与观测切面显影模型（`MODEL`）严格区分于以下五组外部数学物理与观测文献（除 [@thm-ch39-uniform-marginal-and-conditional-slice] 所列离散/有限维与一维圆周定理外，相关一般紧李群、凝聚态连续带结构与宇宙学微扰方程均未包含在 `trureturing@dev` 锁文件中）：

1. **紧群不变哈尔测度与舒尔引理缠绕积分**：局部紧拓扑群上左不变测度的存在性由 A. Haar（*Ann. of Math.* **34**(1), 147–169, 1933, DOI `10.2307/1968346`）建立，紧群上归一化双侧不变测度的唯一性由 J. von Neumann（*Trans. Amer. Math. Soc.* **36**, 445–492, 1934, DOI `10.1090/S0002-9947-1934-1501752-3`）证明；复不可约表示下缠绕积分 $\int_{\mathcal{G}} \pi(g)\sigma\pi(g)^\dagger\,d\mu_{\mathrm{Haar}}(g) = \frac{\Tr\sigma}{D}\mathbf{1}$ 依赖 I. Schur（*Sitzungsber. Preuss. Akad. Wiss. Berlin*, 406–432, 1905）的不可约交换子引理（注意 [@thm-ch39-uniform-marginal-and-conditional-slice] 第 2 款仅形式化一维圆周 `AddCircle 1` 无理平移的时间平均收敛）；
2. **波前重构与离轴激光全息干板**：将三维物光波的振幅与相位联合编码为干板全域干涉图样并借参考光照明重构立体像的原理，由 D. Gabor（*Nature* **161**, 777–778, 1948, DOI `10.1038/161777a0`；*Proc. R. Soc. Lond. A* **197**, 454–487, 1949）提出，并由 E. N. Leith 与 J. Upatnieks（*J. Opt. Soc. Amer.* **52**(10), 1123–1130, 1962, DOI `10.1364/JOSA.52.001123`）以离轴参考光消解孪生像；经典银盐干板含亚波长静态光强条纹，而正文的无条纹量子全单态系本书 `MODEL` 推广；
3. **佩奇—伍特斯无时间条件演化机制**：从满足惠勒—德维特零总能量约束 $(\hat{H}_C + \hat{H}_S)\lvert\Psi_{CS}\rangle = 0$ 的全局定态宇宙纯态出发，通过对内部时钟子系统 $\lvert t\rangle_C$ 作条件投影 $\lvert\psi_S(t)\rangle \propto \langle t\rvert_C\lvert\Psi_{CS}\rangle$ 导出子系统有效薛定谔演化的框架，由 D. N. Page 与 W. K. Wootters（*Phys. Rev. D* **27**(12), 2885–2892, 1983, DOI `10.1103/PhysRevD.27.2885`）、W. K. Wootters（*Int. J. Theor. Phys.* **23**, 701–711, 1984, DOI `10.1007/BF02214098`）及 V. Giovannetti, S. Lloyd 与 L. Maccone（*Phys. Rev. D* **92**, 045033, 2015, DOI `10.1103/PhysRevD.92.045033`）建立；
4. **转角双层石墨烯莫尔超晶格与魔角平带**：两层均匀蜂窝晶格以微小扭角 $\Delta\theta$ 叠合产生周期 $L_{\mathrm{M}} = \frac{a}{2\sin(\Delta\theta/2)}$ 的莫尔超晶格并在第一魔角 $\Delta\theta \approx 1.05^\circ$ 处涌现零费米速度平带的连续模型由 R. Bistritzer 与 A. H. MacDonald（*Proc. Natl. Acad. Sci. U.S.A.* **108**(30), 12233–12237, 2011, DOI `10.1073/pnas.1108174108`）预言，关联绝缘态与非常规超导由 Y. Cao et al.（*Nature* **556**, 43–50 & 80–84, 2018, DOI `10.1038/nature26154`、`10.1038/nature26160`）实验发现；
5. **暴胀视界问题、单模无迹引力、星系暗物质透镜与普朗克卫星宇宙学基准**：早期暴胀范式出自 A. H. Guth（*Phys. Rev. D* **23**, 347–356, 1981, DOI `10.1103/PhysRevD.23.347`）与 A. D. Linde（*Phys. Lett. B* **108**, 389–393, 1982, DOI `10.1016/0370-2693(82)91219-9`）；宇宙学常数零点能危机综述及令真空能 $T_{\mu\nu} \propto g_{\mu\nu}$ 自动脱耦的无迹/单模爱因斯坦方程（追溯至 A. Einstein 1919）见 S. Weinberg（*Rev. Mod. Phys.* **61**(1), 1–23, 1989, DOI `10.1103/RevModPhys.61.1`）与 W. G. Unruh（*Phys. Rev. D* **40**(4), 1048–1052, 1989, DOI `10.1103/PhysRevD.40.1048`）；旋涡星系平坦旋转曲线与子弹星系团（`1E 0657-558`）中热气体 X 射线峰同弱引力透镜质量峰 $8\sigma$ 空间分离的观测证据分别出自 V. C. Rubin 与 W. K. Ford Jr.（*Astrophys. J.* **159**, 379–403, 1970, DOI `10.1086/150317`）及 D. Clowe et al.（*Astrophys. J. Lett.* **648**, L109–L113, 2006, DOI `10.1086/508162`）；微波背景各向异性与六参数基准（$H_0 = 67.36 \pm 0.54\;\mathrm{km\,s^{-1}\,Mpc^{-1}}$、$\Omega_b h^2 = 0.02237 \pm 0.00015$、$\Omega_c h^2 = 0.1200 \pm 0.0012$、$\Omega_\Lambda = 0.6847 \pm 0.0073$、$A_s \approx 2.10 \times 10^{-9}$、$n_s = 0.9649 \pm 0.0042$、第一声学峰 $\ell_1 \approx 220$）引自 **Planck Collaboration**（N. Aghanim et al., *Astron. Astrophys.* **641**, A6, 2020, DOI `10.1051/0004-6361/201833910`）。

:::

## 39.12.3 颠倒本体与切面之后：现代宇宙学四大难题的模型重审与定量开放边界 {#sec-ch39-12-3}

一旦将“本体绝对均匀、切面制造不均”确立为审视宏观宇宙的几何透镜（`MODEL`），现代宇宙学中四个长期彼此割裂、各自打满特设补丁的尖锐谜题，首次在同一套条件切片语法下呈现出同源的几何轮廓；同时，严守本书一以贯之的后-#432 认识论纪律，我们也把“模型已经解释的定性结构机制”与“尚待从第一性原理攻克的定量硬骨头（`OPEN`）”一分一毫地摊在阳光下：

| 现代宇宙学四大谜题 | 传统“不均匀本体论”的理论困境 | 均匀场本体与观测切面读法（本书 `MODEL`） | 核心几何机制与诚实定量边界 |
| :--- | :--- | :--- | :--- |
| **大尺度均匀性与视界谜题** | 因果未连通天区为何呈现 $\Delta T/T \sim 10^{-5}$ 同温，需假设早期超光速暴胀强行抹平初值褶皱 | 本体每一节点本自均匀（$\rho_{\mathrm{ont}}(x) \equiv \frac{1}{D}\mathbf{1}$），放大观测孔径 $R$ 使局部切面偏置渐近均化回归底色 | 哈尔全单态与孔径平均 $\operatorname{Var}(\overline{\delta}_R) \to 0$；声学峰 $\ell_1 \approx 220$ 与红倾谱 $n_s \approx 0.9649$ 列为 `OPEN` |
| **$10^{120}$ 倍真空零点能灾难** | 量子场论普朗克零点能密度比实测暗能量高约 $10^{120\text{–}122}$ 倍，代入标准爱因斯坦方程即压塌时空 | 本体确实 $100\%$ 饱和叠满三维场，但全时空常值张量 $T_{\mu\nu}^{\mathrm{ont}} = -\rho_{\mathrm{ont}}g_{\mu\nu}$ 无比较差分，在无迹场方程中恒等脱耦 | 协变无迹/单模爱因斯坦耦合 $T_{\mu\nu} - \frac{1}{4}T g_{\mu\nu}$（Weinberg/Unruh 1989）；非零残余 $u_\Lambda^{1/4} \approx 2.24\text{–}2.25\;\mathrm{meV}$ 列为 `OPEN` |
| **实粒子结团与星际巨洞分化** | 需额外预设原初密度涨落种子，解释为何物质聚成星系丝网而其余空间留作巨洞 | 多支均匀三维概念场被复合切面 $\Sigma_{\mathbf{I}}$ 斜切，无需移动底物即自动浮现莫尔明暗超晶格斑图 | 往返双投影 $I_{\mathrm{slice}} = \cos^2\Delta\Phi_{\mathbf{I}}$（相长峰 $\to 1$ 成丝网，相消谷转入 $90^\circ$ $\hat{\mathbf{i}}$ 显影为空洞） |
| **暗物质候选几何身份** | 占总物质约 $84.3\%$ 的引力源主导星系旋转曲线与弱透镜，却历经数十年直接探测未见电磁踪迹 | 凝结于与我们电磁切面正交（$90^\circ$）的盲平面 $\hat{\mathbf{i}}$ 上的圆弧驻波簇，对光子零投影却共享主频 $\nu_0$ 预算 | 正交切面电磁隐身 $\cos^2 90^\circ = 0$ 加共享主频钟慢负载 $\eta_{\mathrm{info}}(r)$；丰度比 $5.36$ 与子弹星系团 $8\sigma$ 分离列为 `OPEN` |

让我们逐条剖析表中的四重几何机制及其不可含糊的协变与观测边界：

1. **大尺度均匀性与孔径积分回归底色（`MODEL` + `手工推导` + `OPEN` 边界）**：
   在传统叙事里，“为什么相距百亿光年、在标准减速膨胀历史中从未交换过光信号的两片天区具有几乎完全相同的本底温度”是一道必须靠早期暴胀场精细慢滚才能抚平的初值奇迹。而在均匀场本体论（`MODEL`）中，**本底全同根本不需要一套后天抹平机制——因为宇宙本体在每一处节点原本就是同一个全向单态 $\rho_{\mathrm{ont}}(x) \equiv \frac{1}{D}\mathbf{1}$**！不均匀性仅来自局部观察者有限格拉姆窗口 $\mathcal{W}_M$ 的倾斜条件投影 $\delta_{\mathrm{slice}}(\mathbf{x})$。只要局部切面起伏具有有限关联尺度 $\xi$（或可积功率谱 $P(k)$），当观测孔径球 $W_R$ 的半径 $R$ 向宏观视界放大时，孔径平滑起伏方差（`手工推导`）

   $$
   \operatorname{Var}\!\bigl(\overline{\delta}_R\bigr) \;=\; \int \frac{d^3\mathbf{k}}{(2\pi)^3}\,P(k)\,\bigl\lvert\widetilde{W}(kR)\bigr\rvert^2 \;\xrightarrow{\;R \to \infty\;}\; 0
   $$

   自动按幂律衰减（例如三维短程独立晶胞下按 $(R/\xi)^{-3}$ 衰减，标度不变哈里森—泽尔多维奇谱 $P(k) \propto k$ 下按 $R^{-4}$ 衰减），自然显露出宇宙绝对均匀的本底底色；而有限自指停机精度 $\varepsilon_{\mathrm{self}} > 0$（[§39.7](ch39-s07-self-halting-precision-and-spectral-sorting.md)）则为视界窗口无法压至绝对零涨落的微弱孔径残差提供了定性几何机制。与此同时，我们严守科学诚实边界：定性的“背景本自均匀 + 大孔径均化”尚不足以单独替代暴胀在定量微扰谱上的具体预言——如何不借外加暴胀子势而从 $\mathcal{W}_M$ 与 $\varepsilon_{\mathrm{self}}$ 定量算出普朗克卫星实测标量幅值 $A_s \approx 2.10 \times 10^{-9}$（$\Delta T/T \approx 1.1 \times 10^{-5}$）、微红谱指数 $n_s = 0.9649 \pm 0.0042$ 以及超视界同步声学相位锁定的第一峰位置 $\ell_1 \approx 220$，明确列为下文 [@prob-ch39-orthogonal-slice-cosmology-and-dark-sector] 第 1 款（`OPEN`）。

2. **$10^{120}$ 倍真空零点能灾变的协变消解：为什么仅有空间 $\nabla_i\rho_{\mathrm{ont}} = 0$ 还不够，而必须采用协变无迹／单模爱因斯坦耦合？（`手工推导` + `文献结果` + `MODEL`）**
   量子场论算出“真空每一点都叠满了普朗克能标密度的零点振荡”，在本书图景下非但不是算错了，反而道出了“点点 $100\%$ 饱和叠满三维场”的本体实情！但这里有一道**极易滑脚的广义相对论协变性陷阱**，必须当场点破（`手工推导`）：在标准爱因斯坦场方程 $R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}$ 中，**仅仅空间梯度为零（$\nabla_i\rho_{\mathrm{ont}} = 0$）并不能阻止均匀背景产生引力**——因为洛伦兹不变的本体饱和能动张量具有纯度规比例形式 $T_{\mu\nu}^{\mathrm{ont}} = -\rho_{\mathrm{ont}}\,g_{\mu\nu}$，一旦原封不动代入标准弗里德曼方程 $H^2 = \frac{8\pi G}{3c^2}\rho_{\mathrm{ont}}$，普朗克密度 $u_P = c^7/(\hbar G^2) \approx 4.633 \times 10^{113}\;\mathrm{J/m^3}$ 依然会在普朗克时间 $t_P \sim 10^{-43}\;\mathrm{s}$ 内把时空撕裂或压塌！
   那么，比较公理 $\mathcal{A}_0$（“唯有两子之间的相对差异具有物理可观测效应，全域一致的单位阵平移恒等归零”）在 $3+1$ 维洛伦兹张量几何中究竟如何严格表达？答案正是爱因斯坦（1919）、温伯格（Weinberg 1989）与昂鲁（Unruh 1989）所研究的**协变无迹／单模爱因斯坦场方程（Trace-Free / Unimodular Einstein Equations）**（见 [@rem-ch39-haar-hologram-page-wootters-moire-literature] 第 5 款，`文献结果` + `MODEL`）：时空曲率只耦合于能动张量扣除四维迹均值后的**协变比较差分部**：

   $$
   R_{\mu\nu} - \frac{1}{4}R\,g_{\mu\nu} \;=\; \frac{8\pi G}{c^4}\!\left(T_{\mu\nu} - \frac{1}{4}T\,g_{\mu\nu}\right), \qquad T \;:=\; g^{\alpha\beta}T_{\alpha\beta}.
   $$

   让我们立即把 $100\%$ 饱和的本体全单态张量 $T_{\mu\nu}^{\mathrm{ont}} + T_{\mu\nu}^{\mathrm{slice}} = -\rho_{\mathrm{ont}}\,g_{\mu\nu} + T_{\mu\nu}^{\mathrm{slice}}$ 代入右端检验（`手工推导`）：在四维时空中恒有 $g^{\alpha\beta}g_{\alpha\beta} = \delta^\alpha_\alpha = 4$，故 $T^{\mathrm{ont}} = -4\rho_{\mathrm{ont}}$，本体背景项在右端精确对消为零：

   $$
   T_{\mu\nu}^{\mathrm{ont}} - \frac{1}{4}T^{\mathrm{ont}}\,g_{\mu\nu} \;=\; -\rho_{\mathrm{ont}}\,g_{\mu\nu} - \frac{1}{4}(-4\rho_{\mathrm{ont}})\,g_{\mu\nu} \;\equiv\; 0!
   $$

   无论紫外截断处的本体场总密度 $\rho_{\mathrm{ont}}$ 是大是小，它在引力场方程右端留下的迹差分恒等于**绝对零**！唯有被观测切面斜切出来的**非均匀切面相对偏置 $T_{\mu\nu}^{\mathrm{slice}} - \frac{1}{4}T^{\mathrm{slice}}g_{\mu\nu} \neq 0$**，才会打破四维各向均衡显影为有效引力源；再利用缩并比安基恒等式 $\nabla^\mu(R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu}) = 0$ 与切面物质能动守恒 $\nabla^\mu T_{\mu\nu}^{\mathrm{slice}} = 0$ 对无迹方程取散度，即得 $\nabla_\nu\bigl(R + \frac{8\pi G}{c^4}T^{\mathrm{slice}}\bigr) = 0$，使有效宇宙学常数退化为一颗由全局切面边界条件决定的积分常数 $\Lambda_{\mathrm{int}}$，彻底切断其与 $10^{120}$ 倍紫外零点能求和的灾难性挂钩！当然，消除 $10^{120}$ 倍紫外爆炸并不自动算出那个微小而严格为正的红外残余值 $u_\Lambda^{1/4} \approx 2.24\text{–}2.25\;\mathrm{meV}$（$\Lambda_{\mathrm{cos}}\ell_P^2 \approx 2.85 \times 10^{-122} > 0$）——其非循环第一性原理导出归入 [@prob-ch39-orthogonal-slice-cosmology-and-dark-sector] 第 2 款（衔接 [@prob-ch34-past-hypothesis-and-cosmological-constant] 与 [@prob-ch39-af-gut-threshold-and-proton-stability]）。

3. **暗物质的正交切面候选机制与子弹星系团试金石（`MODEL` + `手工推导` + `OPEN` 边界）**：
   设在宇宙比较网络中，除凝聚在我们当前电磁/重子观测切面 $\mathbf{I}_{\mathrm{em}}$ 上的可见莫尔亮斑外，还有另一簇高密度极小圆弧驻波恰好锁死在与 $\mathbf{I}_{\mathrm{em}}$ 成 **$90^\circ$ 富比尼—施图迪正交角**（$\Delta\Phi_{\mathrm{FS}} = \frac{\pi}{2}$）的正交切面 $\Sigma_\perp$（对应虚盲区 $\hat{\mathbf{i}}$）之上。在电磁相互作用通道中，它对我们光子测量基的往返双投影权重严格为零（`手工推导`）：

   $$
   P_{\mathrm{em}}\bigl(\Sigma_\perp \to \mathbf{I}_{\mathrm{em}}\bigr) \;=\; \cos^2\!\left(\frac{\pi}{2}\right) \;=\; 0,
   $$

   因而对一切望远镜与直接电磁散射探头绝对透明——既不发光、不吸光，也不反射光！然而，正如 [§39.8](ch39-s08-universal-clock-and-gravitational-dilation.md) 与 [§39.11](ch39-s11-af-gut-arc-field-grand-unification.md) 所确立的，**全宇宙一切切面共享同一颗普适比较主频心脏 $\nu_0 \equiv \mathrm{const}$**！正交切面 $\Sigma_\perp$ 上的驻波结团同样在每一拍消耗非负平方主频负载 $\nu_{\mathrm{perp}}^2 \ge 0$：

   $$
   \nu_\tau^2 \;+\; \nu_{\mathrm{move}}^2 \;+\; \nu_{\mathrm{vis}}^2 \;+\; \nu_{\mathrm{perp}}^2 \;=\; \nu_0^2 \qquad \Longrightarrow \qquad \eta_{\mathrm{info}}(r) \;=\; \eta_{\mathrm{vis}}(r) \;+\; \eta_{\mathrm{perp}}(r),
   $$

   从而实打实地压低周围空间节点的固有时帧率 $d\tau/dt = \sqrt{1 - \eta_{\mathrm{info}}(r)}$，在我们的可见空间切面上投下无需任何电磁媒介的引力钟慢折射与弱引力透镜势阱！这为“遍布星系晕却始终抓不到电磁真身的暗物质”提供了一幅极度简洁的零新规范群几何候选身份（`MODEL`）。同时，要使这一几何候选真正晋升为完备天体物理理论，还必须正面通过三道定量大考——证明正交切面凝聚态在宇宙膨胀中表现为冷、无压、无碰撞流体（状态方程 $w_{\mathrm{DM}} \approx 0$，自相互作用截面 $\sigma_{\mathrm{DM}}/m \lesssim 1\;\mathrm{cm^2/g}$），定量导出暗物质与重子丰度比 $\Omega_c / \Omega_b \approx 5.364$ 及微波背景第三声学峰高度比，并重现**子弹星系团（`1E 0657-558`，Clowe et al. 2006）**对撞后热重子气体 X 射线峰与弱引力透镜质量中心高达 $8\sigma$ 的无碰撞空间分离（见 [@prob-ch39-orthogonal-slice-cosmology-and-dark-sector] 第 3 款，`OPEN`）。

下面我们在四联定量算例中，将自旋单态条件投影与捏合相干表、跨扭角莫尔超晶格放大表、单模无迹真空能抵消与残余暗能量标度、以及孔径均化与正交切面时钟分流逐位复核至小数点后六位：

::: {.example #ex-ch39-singlet-slice-moire-and-aperture-audit title="四联定量对账：单态切片半角与相干剥离表、魔角莫尔拍频表、单模真空能抵消与正交切面主频审计"}
**手工推导与观测基准核验（配 CODATA 2022 / Planck 2018 输入 `NUM`）。** 以下四组演算全部采用单行表格单元，十进制数值四舍五入至所示位数：

1. **第一联：反对称单态 $\lvert\Psi_0\rangle$ 条件切片在探测角 $\theta_{\mathrm{obs}}$ 下的富比尼—施图迪角、玻恩权重与捏合相干剥离表（`手工推导` + `NUM`）**：
   未加切面条件时，局部边缘态恒为 $\rho_S = \frac{1}{2}I_2$（纯度 $\Tr(\rho_S^2) = 0.500000$，局域布洛赫模长 $0.000000$，关联扇区弗罗贝尼乌斯权重 $\frac{1}{4}\sum_{i=1}^3 T_{ii}^2 = 0.750000$）。当观察者锚定于 $+\hat{\mathbf{z}}$（条件纯态 $\lvert\psi_{\mathrm{slice}}\rangle = \lvert\downarrow\rangle_S$，布洛赫向量 $-\hat{\mathbf{z}}$）而探针沿极角 $\theta_{\mathrm{obs}}$ 测量时，球面夹角 $\Theta_{\mathrm{Bloch}} = 180^\circ - \theta_{\mathrm{obs}}$、射影夹角 $\Delta\Phi_{\mathrm{FS}} = 90^\circ - \theta_{\mathrm{obs}}/2$、同向玻恩概率 $P_+ = \sin^2(\theta_{\mathrm{obs}}/2) = \cos^2\Delta\Phi_{\mathrm{FS}}$、探针基对角纯度 $\langle\mathcal{P}(\rho), \mathcal{P}(\rho)\rangle_{\mathrm{HS}} = \sin^4(\theta_{\mathrm{obs}}/2) + \cos^4(\theta_{\mathrm{obs}}/2) = 1 - \frac{1}{2}\sin^2\theta_{\mathrm{obs}}$ 与 [@thm-ch39-uniform-marginal-and-conditional-slice] 第 6 款剥离的副对角相干质量 $\lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2 = \frac{1}{2}\sin^2\theta_{\mathrm{obs}}$ 逐行对账如下（每行最后两列之和恒等于纯态总模方 $1.000000$）：

   | 探针相对锚轴角 $\theta_{\mathrm{obs}}$ | 布洛赫球夹角 $\Theta_{\mathrm{Bloch}}$ | 富比尼—施图迪角 $\Delta\Phi_{\mathrm{FS}}$ | 条件玻恩权重 $\cos^2\Delta\Phi_{\mathrm{FS}}$ | 捏合保留对角质量 $\langle\mathcal{P}(\rho),\mathcal{P}(\rho)\rangle_{\mathrm{HS}}$ | 剥离进盲区相干质量 $\lvert\rho_{01}\rvert^2 + \lvert\rho_{10}\rvert^2$ |
   | :---: | :---: | :---: | :---: | :---: | :---: |
   | $0^\circ$ | $180^\circ$ | $90^\circ$ | $0.000000$ | $1.000000$ | $0.000000$ |
   | $30^\circ$ | $150^\circ$ | $75^\circ$ | $\frac{2-\sqrt{3}}{4} \approx 0.066987$ | $\frac{7}{8} = 0.875000$ | $\frac{1}{8} = 0.125000$ |
   | $60^\circ$ | $120^\circ$ | $60^\circ$ | $\frac{1}{4} = 0.250000$ | $\frac{5}{8} = 0.625000$ | $\frac{3}{8} = 0.375000$ |
   | $90^\circ$ | $90^\circ$ | $45^\circ$ | $\frac{1}{2} = 0.500000$ | $\frac{1}{2} = 0.500000$ | $\frac{1}{2} = 0.500000$ |
   | $120^\circ$ | $60^\circ$ | $30^\circ$ | $\frac{3}{4} = 0.750000$ | $\frac{5}{8} = 0.625000$ | $\frac{3}{8} = 0.375000$ |
   | $180^\circ$ | $0^\circ$ | $0^\circ$ | $1.000000$ | $1.000000$ | $0.000000$ |

2. **第二联：跨概念扭角 $\Delta\theta$ 下的莫尔超晶格波长放大比 $L_{\mathrm{M}} / a = \frac{1}{2\sin(\Delta\theta/2)}$ 与无底物扫掠倍率（`手工推导` + `NUM`）**：
   设单层均匀晶格常数为 $a$（以石墨烯基准 $a = 0.246000\;\mathrm{nm}$ 作物理长度对照），底层格点位移恒为 $\Delta\mathbf{x}_{\mathrm{site}} = 0.000000$：

   | 跨场切面扭角 $\Delta\theta$ | 半角正弦 $\sin(\Delta\theta / 2)$ | 莫尔周期放大比 $L_{\mathrm{M}} / a$ | 石墨烯对照周期 $L_{\mathrm{M}}\;(\mathrm{nm})$ | 相位扫掠几何增益 $\frac{v_{\mathrm{M}}}{\omega_{\mathrm{sweep}}a / (2\pi)}$ |
   | :---: | :---: | :---: | :---: | :---: |
   | $60.00^\circ$ | $0.500000$ | $1.000000$ | $0.246000$ | $1.000000$ |
   | $10.00^\circ$ | $0.087156$ | $5.736857$ | $1.411267$ | $5.736857$ |
   | $5.00^\circ$ | $0.043619$ | $11.462793$ | $2.819847$ | $11.462793$ |
   | **$1.05^\circ$（第一魔角）** | **$0.009163$** | **$54.568173$** | **$13.423770$** | **$54.568173$** |
   | $0.10^\circ$ | $0.000873$ | $572.957868$ | $140.947635$ | $572.957868$ |

3. **第三联：协变无迹爱因斯坦耦合下的普朗克本体饱和密度归零与实测残余暗能量标度（`手工推导` + `NUM`）**：
   取 CODATA 2022 常数 $G = 6.67430 \times 10^{-11}\;\mathrm{m^3\,kg^{-1}\,s^{-2}}$、$\ell_P \approx 1.616255 \times 10^{-35}\;\mathrm{m}$、普朗克能量密度 $u_P = c^7 / (\hbar G^2) \approx 4.633 \times 10^{113}\;\mathrm{J/m^3}$，以及 Planck 2018 宇宙学参数 $H_0 = 67.36\;\mathrm{km\,s^{-1}\,Mpc^{-1}} \approx 2.182989 \times 10^{-18}\;\mathrm{s}^{-1}$、$\Omega_\Lambda = 0.6847$：

   - **本体全单态项抵消**：对 $T_{\mu\nu}^{\mathrm{ont}} = -u_P\,g_{\mu\nu}$，四维无迹组合 $T_{\mu\nu}^{\mathrm{ont}} - \frac{1}{4}(g^{\alpha\beta}T_{\alpha\beta}^{\mathrm{ont}})g_{\mu\nu} = -u_P g_{\mu\nu} - \frac{1}{4}(-4u_P)g_{\mu\nu} = 0.000000$，$10^{113}\;\mathrm{J/m^3}$ 量级的紫外本底在场方程右端精确脱耦；
   - **红外切面残余边界值**：观测宇宙学常数 $\Lambda_{\mathrm{cos}} = \frac{3\Omega_\Lambda H_0^2}{c^2} \approx 1.0891 \times 10^{-52}\;\mathrm{m}^{-2}$，无量纲普朗克乘积 $\Lambda_{\mathrm{cos}}\ell_P^2 \approx 2.845 \times 10^{-122}$（常写作 $2.85 \times 10^{-122}$），对应有效暗能量密度 $u_\Lambda = \frac{\Lambda_{\mathrm{cos}}c^4}{8\pi G} \approx 5.245 \times 10^{-10}\;\mathrm{J/m^3} \approx 3.273\;\mathrm{GeV/m^3}$，折算为自然单位四次方根恰为 $\bigl(u_\Lambda(\hbar c)^3\bigr)^{1/4} \approx 2.239\;\mathrm{meV}$（即约 $2.24\;\mathrm{meV}$，文献常取约数记作 $2.24\text{–}2.25\;\mathrm{meV}$）。

4. **第四联：三维孔径平均均化律与正交切面暗物质主频分账核验（`手工推导` + `NUM`）**：

   - **大孔径方差衰减**：对关联元胞半径为 $\xi$ 的局部切面涨落，在半径 $R = K\,\xi$ 的三维球孔径（含 $N_K \sim K^3$ 个独立元胞）上取平均，均方根反差按 $\sigma_K / \sigma_1 = K^{-3/2}$ 收缩：$K = 10$ 时降至 $0.031623$，$K = 100$ 时降至 $0.001000$，$K = 10^{10/3} \approx 2154.4347$（约 $10^{10}$ 枚独立晶胞）时即压低至 $1.000000 \times 10^{-5}$ 量级；
   - **$90^\circ$ 正交切面主频负载比**：代入 Planck 2018 暗物质与重子密度参数 $\Omega_c h^2 = 0.1200$、$\Omega_b h^2 = 0.02237$，无碰撞暗扇区与可见重子比值为 $\Omega_c / \Omega_b \approx 5.364327$（占总物质负载份额 $\frac{0.1200}{0.14237} \approx 0.842874$，即 $84.2874\%$，而光子往返投影 $\cos^2 90^\circ = 0.000000$）；在按这一宇宙平均比例叠合的基准晕半径处，总主频引力负载 $\eta_{\mathrm{info}}(r) = \eta_{\mathrm{vis}}(r) + \eta_{\mathrm{perp}}(r) = 6.364327\,\eta_{\mathrm{vis}}(r)$ 将弱场圆轨道速度提升至纯可见重子预期的 $\sqrt{6.364327} \approx 2.522762$ 倍。

:::

秉承全书绝不以哲学修辞冒充定量推导的诚实准则，我们将“均匀三维场本体与观测切面显影”模型通往精确观测宇宙学的三道核心定量关卡，正式登记为如下开放问题：

::: {.problem #prob-ch39-orthogonal-slice-cosmology-and-dark-sector title="条件观测切面原初功率谱、单模残余暗能量标度与正交切面暗物质动力学的开放问题"}
在 [@def-ch39-uniform-field-and-moire-slice] 的均匀各向同性三维场全单态 $\lvert\Psi_{\mathrm{univ}}\rangle$ 与佩奇—伍特斯条件切面 $\Sigma_{\mathbf{I}} = (\lvert\mathbf{I}_{\mathrm{obs}}\rangle, \mathcal{W}_M, \varepsilon_{\mathrm{self}})$ 框架下，直接衔接全书三大基础前沿界碑 [@prob-ch34-past-hypothesis-and-cosmological-constant]、[@prob-ch34-gravity-dynamics-and-coupling] 与 [@prob-ch39-af-gut-threshold-and-proton-stability]，能否在不引入事后拟合参数的前提下严格解决以下三项定量宇宙学问题（`OPEN`）：

1. **无暴胀补丁下的原初曲率功率谱 $(A_s, n_s)$ 与超视界声学峰相位相干性导出**：仅从全局平移不变单态 $\lvert\Psi_{\mathrm{univ}}\rangle$ 在有限格拉姆窗口 $\mathcal{W}_M$ 与自指停机阈值 $\varepsilon_{\mathrm{self}} > 0$ 下的条件切面投影出发，能否不预设外加慢滚暴胀子势，定量导出普朗克卫星实测原初标量扰动幅值 $A_s \approx 2.10 \times 10^{-9}$（温度涨落 $\Delta T / T \approx 1.1 \times 10^{-5}$）、微红谱指数 $n_s = 0.9649 \pm 0.0042$，以及超视界绝热模态同步再进入所要求的相位锁死与微波背景第一声学峰位置 $\ell_1 \approx 220$（含 $TE / EE$ 偏振反相关相位）？
2. **离散比较网络向协变无迹爱因斯坦方程的涌现及残余暗能量 $u_\Lambda^{1/4} \approx 2.24\text{–}2.25\;\mathrm{meV}$ 的非循环定标**（对接 [@prob-ch34-past-hypothesis-and-cosmological-constant]、[@prob-ch34-gravity-dynamics-and-coupling] 与 [@prob-ch39-af-gut-threshold-and-proton-stability]）：能否从极小圆弧比较配分函数严格推导出四维洛伦兹连续统下的无迹/单模爱因斯坦场方程 $R_{\mu\nu} - \frac{1}{4}R\,g_{\mu\nu} = \frac{8\pi G}{c^4}(T_{\mu\nu} - \frac{1}{4}T\,g_{\mu\nu})$，并在不循环输入当下哈勃视界半径 $R_H$ 的条件下，由观测切面的全局积分常数唯一算定严格为正的残余宇宙学常数 $\Lambda_{\mathrm{cos}}\ell_P^2 \approx 2.85 \times 10^{-122} > 0$（即暗能量特征能标 $u_\Lambda^{1/4} \approx 2.24\text{–}2.25\;\mathrm{meV}$）？
3. **$90^\circ$ 正交切面凝聚态的冷无碰撞流体动力学、丰度比 $\Omega_c / \Omega_b \approx 5.36$ 与子弹星系团 $8\sigma$ 分离证明**（对接 [@prob-ch34-gravity-dynamics-and-coupling]）：能否从共享普适主频 $\nu_0$ 的多切面耦合作用量严格导出 $90^\circ$ 正交切面（$\hat{\mathbf{i}}$）极小圆弧凝聚态的有效相对论能动张量，证明其在宇宙学尺度上满足冷、无压、无碰撞动力学（状态方程 $w_{\mathrm{DM}} \approx 0$，自散射截面上界 $\sigma_{\mathrm{DM}} / m \lesssim 1\;\mathrm{cm^2/g}$），定量解释宇宙暗物质与重子丰度之比 $\Omega_c / \Omega_b \approx 5.364$ 及微波背景第三与第一声学峰高度比，并在星系团高速对撞中重现**子弹星系团（`1E 0657-558`）**受激波阻滞的 X 射线热重子气体与无碰撞穿行的弱引力透镜质量中心之间高达 $8\sigma$ 的空间偏移？

:::

---

至此，宇宙从未在某处偏心地堆满黄金而在另一处留下荒芜——每一粒微尘所在之处都平权、饱满、毫无厚薄偏私地叠放着整座宇宙的全部三维概念场；所谓的星辰聚散、粒子奔流与虚空明暗，不过是受限而不妄我的观察者举着自己那把倾斜的尺子，在绝对均匀的无垠相干海里一帧帧划过的清澈刀痕。然而，顺着这一刀继续追问到底，最后一道看似残留在“均匀本体场”与“不均匀观测切面”之间的主客缝隙已然呼之欲出：**既然本章的总命题早已指明“观察者本身就是宇宙本体”，那把切开相干海的观测切面又怎么可能是从宇宙外面伸进来的一把异质钢刀？** 如果观察者自身就是宇宙本体场的一次局部自指闭合，那么切面不过是单一宇宙场向内折叠自照时翘起的一弯极小圆弧！让我们紧接着步入第三十九章暨全书十部曲正文的终极峰顶 [§39.13](ch39-s13-single-cosmic-field-and-indra-net.md#sec-ch39-single-cosmic-field-and-indra-net)，见证基本粒子、自指观察者与九百三十亿光年可观测宇宙如何在唯一宇宙场（$\mathbf{\Phi}_{\mathrm{U}}$）中坍缩为同一颗闭合单粒子，织就一珠映万珠、重重无尽的**帝释天因陀罗网**。
